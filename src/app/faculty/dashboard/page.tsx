"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useCertificates } from "@/hooks/useCertificates";
import { ShieldCheck, Users, FileCheck, AlertCircle, ArrowUpRight, Layers, Download, X, FileText, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import * as XLSX from "xlsx";
import { AnimatePresence, motion } from "framer-motion";

const LEADERBOARD = [
  { id: "22CS001", name: "Abhishek Singh", section: "A", certCount: 8, weightage: 950 },
  { id: "22CS042", name: "Priya Sharma", section: "B", certCount: 6, weightage: 820 },
  { id: "22CS024", name: "Ananya Das", section: "C", certCount: 5, weightage: 710 },
  { id: "22CS055", name: "Rahul Verma", section: "A", certCount: 4, weightage: 600 },
];

const BAR_DATA = [
  { name: "Jan", certs: 40 },
  { name: "Feb", certs: 30 },
  { name: "Mar", certs: 65 },
  { name: "Apr", certs: 85 },
  { name: "May", certs: 120 },
];

const PIE_DATA = [
  { name: "Verified", value: 400, color: "#10b981" },
  { name: "Pending", value: 150, color: "#facc15" },
  { name: "Rejected", value: 50, color: "#ef4444" },
];

export default function FacultyDashboard() {
  const { certificates } = useCertificates();
  const [selectedStudent, setSelectedStudent] = useState<typeof LEADERBOARD[0] | null>(null);

  const pendingCount = certificates.filter(c => c.status === "pending").length;
  const verifiedCount = certificates.filter(c => c.status === "verified" || c.status === "approved").length;

  const stats = [
    { label: "Pending Audits", count: pendingCount, icon: <AlertCircle />, color: "bg-red-500 text-[#09090b] border-red-600" },
    { label: "Active Scholars", count: 1240, icon: <Users />, color: "bg-bg-surface border-border" },
    { label: "Total Issuance", count: verifiedCount + 840, icon: <FileCheck />, color: "bg-accent border-yellow-400" },
  ];

  const handleDownloadSection = (sectionName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Export logic for the entire section
    const exportData = [
      { RollNo: "22CS001", Name: "Abhishek Singh", Section: sectionName, Certificates: 8, Weightage: 950, Status: "Active" },
      { RollNo: "22CS042", Name: "Priya Sharma", Section: sectionName, Certificates: 6, Weightage: 820, Status: "Active" },
      { RollNo: "22CS024", Name: "Ananya Das", Section: sectionName, Certificates: 5, Weightage: 710, Status: "Active" },
      { RollNo: "22CS055", Name: "Rahul Verma", Section: sectionName, Certificates: 4, Weightage: 600, Status: "Active" },
    ];
    
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Section_${sectionName}`);
    XLSX.writeFile(workbook, `Adamas_Section_${sectionName}_Report.xlsx`);
  };

  return (
    <DashboardLayout allowedRole="faculty">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-bg-surface rounded-full text-xs font-bold mb-4 border border-border">
            <ShieldCheck className="w-3 h-3 text-red-500" />
            <span>Auth Level 4 Active</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
            FACULTY<br/>
            <span className="text-bg-dark">COMMAND CENTER</span>
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <button 
            onClick={(e) => handleDownloadSection("Global", e)}
            className="btn-primary shrink-0 bg-bg-surface text-text-primary border-3 border-text-primary hover:shadow-[4px_4px_0_var(--color-text-primary)] transition-all"
          >
            <Download className="w-5 h-5" />
            Export Global Data
          </button>
          <Link href="/faculty/certificates" className="btn-primary shrink-0">
            <Layers className="w-5 h-5" />
            Review Pending Queue
          </Link>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {stats.map((stat, i) => (
          <div key={i} className={`bento-card flex flex-col justify-between h-48 border-3 hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-text-primary)] shadow-[4px_4px_0_var(--color-text-primary)] transition-all ${stat.color}`}>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-bg-surface rounded-xl flex items-center justify-center text-text-primary shadow-sm border-2 border-border">
                {React.cloneElement(stat.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
              </div>
              <ArrowUpRight className="w-6 h-6 opacity-30" />
            </div>
            <div>
              <span className="text-6xl font-black tracking-tighter">{stat.count}</span>
              <p className="text-sm font-bold uppercase tracking-tight mt-1 opacity-80">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics & Leaderboard Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
        {/* Charts Section */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bento-card border-3 border-text-primary shadow-[4px_4px_0_var(--color-text-primary)] p-8 flex-1">
            <h3 className="text-xl font-black uppercase tracking-widest mb-6 text-text-primary">Ingestion Velocity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BAR_DATA}>
                  <XAxis dataKey="name" tick={{ fontSize: 12, fontWeight: 800 }} stroke="#52525b" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fontWeight: 800 }} stroke="#52525b" axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#f4f4f5' }}
                    contentStyle={{ borderRadius: '12px', border: '3px solid #09090b', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="certs" fill="#ffc107" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bento-card border-3 border-text-primary shadow-[4px_4px_0_var(--color-text-primary)] p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 w-full">
              <h3 className="text-xl font-black uppercase tracking-widest mb-2 text-text-primary">Audit Distribution</h3>
              <p className="text-sm font-bold text-text-secondary mb-6 uppercase tracking-widest">Global Registry Status</p>
              <div className="space-y-3">
                {PIE_DATA.map((entry, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-sm font-black text-text-primary uppercase">{entry.name}</span>
                    </div>
                    <span className="text-sm font-bold text-text-secondary">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-48 w-48 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {PIE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '3px solid #09090b', fontWeight: 'bold' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="bento-card border-3 border-text-primary shadow-[4px_4px_0_var(--color-text-primary)] p-0 overflow-hidden flex flex-col">
          <div className="p-8 border-b-3 border-text-primary bg-bg-surface">
            <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3 text-text-primary">
              <Award className="w-6 h-6 text-accent" />
              Top Scholars
            </h3>
            <p className="text-xs font-bold text-text-secondary mt-2 uppercase tracking-widest">Highest Weightage & Certs</p>
          </div>
          <div className="flex-1 divide-y-2 divide-border overflow-y-auto">
            {LEADERBOARD.map((student, idx) => (
              <div 
                key={student.id} 
                onClick={() => setSelectedStudent(student)}
                className="p-6 hover:bg-bg-base transition-colors cursor-pointer group flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-bg-surface border-2 border-border flex items-center justify-center font-black text-xs text-text-secondary">
                    #{idx + 1}
                  </div>
                  <div>
                    <p className="font-black text-text-primary uppercase tracking-tight group-hover:underline decoration-2 underline-offset-4">{student.name}</p>
                    <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">{student.id} • SEC {student.section}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-accent">{student.weightage} pts</p>
                  <p className="text-xs font-bold text-text-secondary">{student.certCount} certs</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links / Clusters */}
      <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">REGISTRY SECTIONS</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Section A", count: 60, icon: "A" },
          { label: "Section B", count: 62, icon: "B" },
          { label: "Section C", count: 58, icon: "C" },
          { label: "Section D", count: 61, icon: "D" }
        ].map((cluster, i) => (
          <div key={i} className="bento-card p-6 flex flex-col items-center text-center group transition-all border-4 border-border relative overflow-hidden">
            <button 
              onClick={(e) => handleDownloadSection(cluster.label, e)}
              className="absolute top-4 right-4 w-10 h-10 bg-bg-surface border-2 border-border rounded-xl flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-primary hover:shadow-[2px_2px_0_var(--color-text-primary)] transition-all z-10 cursor-pointer"
              title="Download Section Data"
            >
              <Download className="w-4 h-4 stroke-[3px]" />
            </button>

            <Link href="/faculty/sections" className="w-full flex flex-col items-center cursor-pointer pt-6">
              <div className="w-20 h-20 rounded-2xl bg-bg-dark text-text-on-dark flex items-center justify-center text-4xl font-black mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                {cluster.icon}
              </div>
              <h4 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-accent transition-colors">{cluster.label}</h4>
              <div className="flex items-center gap-2 text-sm font-bold text-text-secondary group-hover:text-text-primary transition-colors">
                <span>{cluster.count} Students</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Student Detail Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
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
              className="relative w-full max-w-4xl bg-bg-surface border-4 border-border rounded-[2rem] shadow-[12px_12px_0_var(--color-text-primary)] overflow-hidden flex flex-col max-h-[90vh] z-10"
            >
              {/* Modal Header */}
              <div className="p-8 border-b-4 border-border bg-bg-base flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-accent border-3 border-bg-dark flex items-center justify-center text-4xl font-black text-[#09090b] shadow-[4px_4px_0_var(--color-text-primary)]">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-text-primary mb-1">{selectedStudent.name}</h2>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-bg-surface border-2 border-border rounded-lg text-xs font-black text-text-secondary uppercase tracking-widest">
                        Section {selectedStudent.section}
                      </span>
                      <span className="text-text-secondary font-bold text-xs uppercase tracking-widest">
                        ID: {selectedStudent.id}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="w-12 h-12 rounded-xl bg-bg-surface border-3 border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-primary hover:shadow-[4px_4px_0_var(--color-text-primary)] transition-all"
                >
                  <X className="w-6 h-6 stroke-[3px]" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 bg-bg-surface">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bento-card p-6 border-3 border-text-primary bg-accent shadow-[4px_4px_0_var(--color-text-primary)] text-[#09090b]">
                    <p className="text-sm font-black uppercase tracking-widest opacity-70 mb-2">Total Weightage</p>
                    <p className="text-5xl font-black tracking-tighter">{selectedStudent.weightage}</p>
                  </div>
                  <div className="bento-card p-6 border-3 border-text-primary bg-bg-base shadow-[4px_4px_0_var(--color-text-primary)]">
                    <p className="text-sm font-black uppercase tracking-widest text-text-secondary mb-2">Verified Certificates</p>
                    <p className="text-5xl font-black tracking-tighter text-text-primary">{selectedStudent.certCount}</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-black uppercase tracking-widest text-text-secondary mb-4">Recent Submissions</h3>
                <div className="space-y-4">
                  {/* Mock Certificates in Profile */}
                  {[
                    { id: "c1", name: "Google Cloud Professional", issuer: "Google", date: "2024-09-15" },
                    { id: "c2", name: "AWS Solutions Architect", issuer: "AWS", date: "2024-08-20" }
                  ].map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-6 border-3 border-border rounded-2xl hover:border-text-primary transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-bg-base flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-black text-text-primary uppercase tracking-tight text-lg">{cert.name}</p>
                          <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">{cert.issuer} • {cert.date}</p>
                        </div>
                      </div>
                      <Link href={`/faculty/certificates/${cert.id}`} className="px-6 py-3 bg-bg-surface border-2 border-border text-xs font-black uppercase tracking-widest text-text-secondary rounded-xl hover:bg-bg-dark hover:border-bg-dark hover:text-text-on-dark transition-all">
                        View Audit
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
