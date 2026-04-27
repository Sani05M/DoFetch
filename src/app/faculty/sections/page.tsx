"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { 
  Search, 
  ExternalLink,
  ChevronDown,
  X,
  Check,
  FileText,
  ExternalLink as ExternalLinkIcon,
  ShieldCheck,
  Layers,
  ArrowRight,
  Download,
  FileSpreadsheet
} from "lucide-react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { RatingBadge, Rating } from "@/components/RatingBadge";
import { useCertificates } from "@/hooks/useCertificates";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Student {
  rollNo: string;
  name: string;
  section: string;
}

const MOCK_STUDENTS: Student[] = [
  { rollNo: "22CS001", name: "Abhishek Singh", section: "A" },
  { rollNo: "22CS002", name: "Aditi Verma", section: "A" },
  { rollNo: "22CS015", name: "Ishan Sharma", section: "B" },
  { rollNo: "22CS024", name: "Kavya Das", section: "C" },
  { rollNo: "22CS031", name: "Manish Raj", section: "A" },
  { rollNo: "22CS042", name: "Pooja Hegde", section: "B" },
  { rollNo: "22CS055", name: "Rohan Gupta", section: "A" },
  { rollNo: "22CS068", name: "Sanya Malhotra", section: "C" },
];

export default function FacultySectionsPage() {
  const { certificates, updateStatus, loading } = useCertificates();
  const [activeSection, setActiveSection] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);

  const sections = ["All", "A", "B", "C", "D", "E", "F"];

  const filteredStudents = MOCK_STUDENTS.filter(s => {
    const matchesSection = activeSection === "All" || s.section === activeSection;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.rollNo.toLowerCase().includes(search.toLowerCase());
    return matchesSection && matchesSearch;
  });

  const handleExport = (format: "CSV" | "Excel") => {
    const dataToExport = filteredStudents;
    const fileName = `adamos_students_${activeSection === "All" ? "global" : `section_${activeSection}`}`;

    if (format === "CSV") {
      const csv = Papa.unparse(dataToExport);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${fileName}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
      XLSX.writeFile(workbook, `${fileName}.xlsx`);
    }
    setExportMenuOpen(false);
  };

  // Get certificates for a specific student (mock logic: matching by name char for demo)
  const getStudentCerts = (rollNo: string) => {
    // In a real app, certs would have a studentRollNo field
    // For this mock demo, we'll just show all certs for every student so we can test the UI
    return certificates; 
  };

  if (loading) return null;

  return (
    <DashboardLayout allowedRole="faculty">
      <div className="space-y-12">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-accent font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4"
          >
            <Layers className="w-4 h-4" />
            Registry Management
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-text-primary leading-none">Institutional Sections</h1>
          <p className="text-text-secondary mt-2 text-sm md:text-lg font-bold uppercase tracking-widest opacity-70">Manage student credentials across academic clusters.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8">
          <div className="flex items-center gap-2 p-1.5 bg-bg-surface border-2 border-border rounded-xl md:rounded-2xl overflow-x-auto no-scrollbar shadow-[4px_4px_0_#000] md:shadow-none">
            {sections.map(s => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={cn(
                  "px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black transition-all whitespace-nowrap uppercase tracking-widest",
                  activeSection === s 
                    ? "bg-accent text-[#09090b] shadow-[2px_2px_0_#09090b]" 
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-base"
                )}
              >
                {s === "All" ? "Global" : `Sec ${s}`}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="relative w-full sm:flex-1 lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input 
                type="text"
                placeholder="Filter by name or ID..."
                className="w-full bg-bg-surface border-2 border-border pl-12 pr-6 py-3.5 md:py-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold text-text-primary focus:outline-none focus:border-accent transition-all shadow-[4px_4px_0_#000]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="relative z-20 w-full sm:w-auto">
              <button 
                onClick={() => setExportMenuOpen(!exportMenuOpen)}
                className="w-full h-12 md:h-14 px-6 bg-accent hover:bg-accent/90 text-[#09090b] rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0_#09090b] active:translate-y-[2px] active:shadow-[2px_2px_0_#09090b]"
              >
                <Download className="w-4 h-4" />
                Export Data
              </button>
              
              <AnimatePresence>
                {exportMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setExportMenuOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-[calc(100%+0.5rem)] w-full sm:w-48 bg-bg-surface border-3 border-border rounded-xl md:rounded-2xl shadow-[8px_8px_0_#09090b] p-2 z-50 overflow-hidden"
                    >
                      <button 
                        onClick={() => handleExport("CSV")}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-bg-base rounded-lg md:rounded-xl text-left transition-colors"
                      >
                        <FileText className="w-4 h-4 text-accent" />
                        <div>
                          <p className="text-[10px] md:text-xs font-black text-text-primary uppercase tracking-widest">CSV</p>
                          <p className="text-[8px] md:text-[10px] font-bold text-text-secondary uppercase">Plain text format</p>
                        </div>
                      </button>
                      <button 
                        onClick={() => handleExport("Excel")}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-bg-base rounded-lg md:rounded-xl text-left transition-colors mt-1"
                      >
                        <FileSpreadsheet className="w-4 h-4 text-accent" />
                        <div>
                          <p className="text-[10px] md:text-xs font-black text-text-primary uppercase tracking-widest">Excel</p>
                          <p className="text-[8px] md:text-[10px] font-bold text-text-secondary uppercase">Rich data format</p>
                        </div>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bento-card border-3 border-border rounded-2xl p-0 overflow-hidden bg-bg-surface shadow-[4px_4px_0_#000]">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="border-b-3 border-border bg-bg-base">
                  <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary">Roll No</th>
                  <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary">Student Identity</th>
                  <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary">Cluster</th>
                  <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary">Status</th>
                  <th className="px-6 md:px-8 py-4 md:py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-border">
                {filteredStudents.map((student) => (
                  <tr 
                    key={student.rollNo} 
                    onClick={() => setSelectedStudent(student)}
                    className="group hover:bg-bg-base transition-colors cursor-pointer"
                  >
                    <td className="px-6 md:px-8 py-5 md:py-6 text-[10px] md:text-xs font-black text-text-secondary group-hover:text-text-primary transition-colors">
                      {student.rollNo}
                    </td>
                    <td className="px-6 md:px-8 py-5 md:py-6">
                      <p className="text-xs md:text-sm font-black text-text-primary uppercase tracking-tight">{student.name}</p>
                    </td>
                    <td className="px-6 md:px-8 py-5 md:py-6">
                      <span className="px-2 md:px-3 py-1 rounded-md bg-bg-surface border-2 border-border text-[8px] md:text-[10px] font-black text-text-secondary uppercase tracking-widest">
                        Section {student.section}
                      </span>
                    </td>
                    <td className="px-6 md:px-8 py-5 md:py-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-text-secondary">Active</span>
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-5 md:py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-accent">Review</span>
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-accent" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStudent(null)}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-5xl bg-bg-surface border-3 md:border-4 border-border rounded-[1.5rem] md:rounded-[2.5rem] shadow-[12px_12px_0_var(--color-text-primary)] overflow-hidden flex flex-col max-h-[90vh] z-10"
            >
              {/* Modal Header */}
              <div className="p-6 md:p-10 border-b-3 md:border-b-4 border-border bg-bg-base flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] bg-accent border-3 border-bg-dark flex items-center justify-center text-3xl md:text-4xl font-black text-[#09090b] shadow-[4px_4px_0_var(--color-text-primary)] shrink-0">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4 mb-1 md:mb-2">
                      <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-text-primary truncate">{selectedStudent.name}</h2>
                      <div className="inline-flex px-3 py-1 bg-accent border-2 border-bg-dark rounded-lg text-[8px] md:text-[10px] font-black text-[#09090b] uppercase tracking-widest w-fit">
                        Section {selectedStudent.section}
                      </div>
                    </div>
                    <p className="text-text-secondary font-bold text-[10px] md:text-xs tracking-widest uppercase opacity-70 truncate">
                      ID: {selectedStudent.rollNo}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-bg-surface border-2 md:border-3 border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-primary hover:shadow-[4px_4px_0_var(--color-text-primary)] transition-all self-end sm:self-center"
                >
                  <X className="w-5 h-5 md:w-7 md:h-7 stroke-[3px]" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-bg-surface">
                <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.3em] text-text-secondary mb-6 md:mb-8 ml-1">Submitted Artifacts</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  {getStudentCerts(selectedStudent.rollNo).map((cert) => (
                    <motion.div 
                      layoutId={cert.id}
                      key={cert.id} 
                      className="bg-bg-base border-3 border-border rounded-2xl md:rounded-[2rem] p-6 md:p-8 flex flex-col justify-between hover:border-text-primary transition-colors group"
                    >
                      <div className="space-y-6 md:space-y-8">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-4 md:gap-5">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-bg-surface border-2 md:border-3 border-border flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:border-accent transition-colors shrink-0">
                              <FileText className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-base md:text-xl font-black text-text-primary leading-tight uppercase tracking-tight truncate">{cert.title}</h4>
                              <p className="text-[10px] md:text-xs text-text-secondary mt-1 uppercase tracking-widest font-black opacity-60 truncate">{cert.issuer}</p>
                            </div>
                          </div>
                          <div className="shrink-0 scale-90 md:scale-100">
                            <RatingBadge rating={cert.status === "pending" ? "Pending" : cert.rating as Rating} />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:gap-4 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-text-secondary">
                          <div className="px-3 md:px-4 py-2 bg-bg-surface border-2 border-border rounded-lg md:rounded-xl">
                            Type: <span className="text-text-primary ml-1">{cert.fileType}</span>
                          </div>
                          <div className="px-3 md:px-4 py-2 bg-bg-surface border-2 border-border rounded-lg md:rounded-xl">
                            Date: <span className="text-text-primary ml-1">{cert.issueDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 md:gap-4 pt-6 md:pt-8 mt-6 md:mt-8 border-t-2 md:border-t-3 border-border">
                        {cert.status === "pending" ? (
                          <>
                            <button 
                              onClick={() => updateStatus(cert.id, "verified", "Platinum")}
                              className="flex-1 bg-green-500 text-bg-dark py-3 md:py-4 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all hover:translate-y-[-2px] hover:shadow-[4px_4px_0_#09090b] active:translate-y-[1px] active:shadow-none flex items-center justify-center gap-2"
                            >
                              <Check className="w-4 h-4 stroke-[4px]" /> Accept
                            </button>
                            <button 
                              onClick={() => updateStatus(cert.id, "rejected")}
                              className="flex-1 bg-bg-surface text-text-primary border-2 border-border py-3 md:py-4 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all hover:bg-zinc-100 flex items-center justify-center gap-2"
                            >
                              <X className="w-4 h-4 stroke-[4px]" /> Reject
                            </button>
                          </>
                        ) : (
                          <div className={cn(
                            "w-full py-3 md:py-4 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 border-2 md:border-3",
                            cert.status === "verified" ? "bg-green-500/10 border-green-500 text-green-600" : "bg-red-500/10 border-red-500 text-red-600"
                          )}>
                            {cert.status === "verified" ? (
                              <><Check className="w-4 h-4 stroke-[4px]" /> Audit Passed</>
                            ) : (
                              <><X className="w-4 h-4 stroke-[4px]" /> Entry Rejected</>
                            )}
                          </div>
                        )}
                        <button className="w-12 h-12 md:w-16 md:h-16 bg-bg-surface border-2 md:border-3 border-border rounded-lg md:rounded-xl flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-primary transition-all shrink-0">
                          <ExternalLinkIcon className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 md:p-10 border-t-3 md:border-t-4 border-border bg-bg-base flex justify-end">
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="w-full sm:w-auto px-8 md:px-12 py-3.5 md:py-4 bg-accent text-bg-dark rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#09090b] transition-all shadow-[4px_4px_0_#09090b] active:translate-y-[1px] active:shadow-none"
                >
                  Close Session
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
