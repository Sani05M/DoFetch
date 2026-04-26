"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Check,
  ChevronDown,
  Info
} from "lucide-react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { cn } from "@/lib/utils";

const MOCK_DATA = [
  { rollNo: "22CS001", name: "Abhishek Singh", section: "A", certCount: 8, bestRating: "Platinum", bestCert: "Google Cloud Prof." },
  { rollNo: "22CS002", name: "Aditi Verma", section: "A", certCount: 5, bestRating: "Gold", bestCert: "React Advanced" },
  { rollNo: "22CS015", name: "Ishan Sharma", section: "B", certCount: 3, bestRating: "Silver", bestCert: "SQL Foundations" },
  { rollNo: "22CS024", name: "Kavya Das", section: "C", certCount: 12, bestRating: "Platinum", bestCert: "AWS Solutions Arch." },
  { rollNo: "22CS031", name: "Manish Raj", section: "A", certCount: 2, bestRating: "Bronze", bestCert: "Intro to Python" },
];

export default function FacultyExportPage() {
  const [format, setFormat] = useState<"CSV" | "Excel">("CSV");
  const [section, setSection] = useState("All");
  const [isExporting, setIsExporting] = useState(false);

  const sections = ["All", "A", "B", "C", "D", "E", "F"];

  const handleExport = () => {
    setIsExporting(true);
    
    const dataToExport = section === "All" 
      ? MOCK_DATA 
      : MOCK_DATA.filter(d => d.section === section);

    if (format === "CSV") {
      const csv = Papa.unparse(dataToExport);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `adamos_certs_section_${section}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Certificates");
      XLSX.writeFile(workbook, `adamos_certs_section_${section}.xlsx`);
    }

    setTimeout(() => setIsExporting(false), 1000);
  };

  return (
    <DashboardLayout allowedRole="faculty">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-display italic text-text-primary">Export Data</h1>
          <p className="text-text-secondary mt-1">Generate and download certificate reports.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="bg-bg-surface border border-border p-8 rounded-2xl space-y-8">
            <div className="space-y-4">
              <label className="text-xs uppercase tracking-widest text-text-muted font-medium">Select Section</label>
              <div className="grid grid-cols-3 gap-2">
                {sections.map(s => (
                  <button
                    key={s}
                    onClick={() => setSection(s)}
                    className={cn(
                      "py-2 rounded-lg border text-xs font-medium transition-all",
                      section === s 
                        ? "bg-accent/10 border-accent text-accent" 
                        : "bg-bg-base border-border text-text-muted hover:text-text-primary"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs uppercase tracking-widest text-text-muted font-medium">Export Format</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setFormat("CSV")}
                  className={cn(
                    "flex flex-col items-center gap-3 p-6 rounded-xl border transition-all text-center",
                    format === "CSV" 
                      ? "bg-accent/5 border-accent text-accent" 
                      : "bg-bg-base border-border text-text-muted hover:border-border-active"
                  )}
                >
                  <FileText className="w-8 h-8" />
                  <div>
                    <p className="text-sm font-medium">CSV</p>
                    <p className="text-[10px] mt-1 opacity-60">Universal plain text</p>
                  </div>
                  {format === "CSV" && <Check className="w-4 h-4 mt-2" />}
                </button>
                <button
                  onClick={() => setFormat("Excel")}
                  className={cn(
                    "flex flex-col items-center gap-3 p-6 rounded-xl border transition-all text-center",
                    format === "Excel" 
                      ? "bg-accent/5 border-accent text-accent" 
                      : "bg-bg-base border-border text-text-muted hover:border-border-active"
                  )}
                >
                  <FileSpreadsheet className="w-8 h-8" />
                  <div>
                    <p className="text-sm font-medium">Excel</p>
                    <p className="text-[10px] mt-1 opacity-60">Rich data format</p>
                  </div>
                  {format === "Excel" && <Check className="w-4 h-4 mt-2" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full bg-accent hover:bg-accent-hover text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isExporting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Export to {format}
                </>
              )}
            </button>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-text-primary">Data Preview</h3>
              <span className="text-[10px] uppercase tracking-widest text-text-muted">Showing first 5 rows</span>
            </div>
            <div className="bg-bg-surface border border-border rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-border bg-bg-elevated/50">
                      <th className="px-4 py-3 text-text-muted font-bold">Roll No</th>
                      <th className="px-4 py-3 text-text-muted font-bold">Name</th>
                      <th className="px-4 py-3 text-text-muted font-bold">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {MOCK_DATA.map((row) => (
                      <tr key={row.rollNo}>
                        <td className="px-4 py-3 font-mono text-text-secondary">{row.rollNo}</td>
                        <td className="px-4 py-3 text-text-primary">{row.name}</td>
                        <td className="px-4 py-3 text-accent">{row.bestRating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4 bg-info/5 border border-info/20 rounded-xl flex gap-3">
              <Info className="w-4 h-4 text-info shrink-0 mt-0.5" />
              <p className="text-[11px] text-text-secondary leading-relaxed">
                Export will include full details: Roll No, Name, Section, Certificate Count, Best Rating, and Top Credential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
