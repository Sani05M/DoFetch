"use client";

import React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useCertificates } from "@/hooks/useCertificates";
import { ShieldCheck, Users, FileCheck, AlertCircle, ArrowUpRight, Layers } from "lucide-react";

export default function FacultyDashboard() {
  const { certificates } = useCertificates();

  const pendingCount = certificates.filter(c => c.status === "pending").length;
  const verifiedCount = certificates.filter(c => c.status === "verified" || c.status === "approved").length;

  const stats = [
    { label: "Pending Audits", count: pendingCount, icon: <AlertCircle />, color: "bg-red-500 text-white border-red-600" },
    { label: "Active Scholars", count: 1240, icon: <Users />, color: "bg-zinc-100 border-zinc-200" },
    { label: "Total Issuance", count: verifiedCount + 840, icon: <FileCheck />, color: "bg-accent border-yellow-400" },
  ];

  return (
    <DashboardLayout allowedRole="faculty">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-xs font-bold mb-4 border border-zinc-200">
            <ShieldCheck className="w-3 h-3 text-red-500" />
            <span>Auth Level 4 Active</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
            FACULTY<br/>
            <span className="text-bg-dark">COMMAND CENTER</span>
          </h1>
        </div>
        <Link href="/faculty/certificates" className="btn-primary shrink-0 bg-red-500 text-white hover:shadow-[0_8px_30px_rgba(239,68,68,0.5)]">
          <Layers className="w-5 h-5" />
          Review Pending Queue
        </Link>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {stats.map((stat, i) => (
          <div key={i} className={`bento-card flex flex-col justify-between h-48 border-3 hover:-translate-y-1 hover:shadow-[6px_6px_0_#09090b] shadow-[4px_4px_0_#09090b] ${stat.color}`}>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-bg-dark shadow-sm border-2 border-zinc-200">
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

      {/* Quick Links / Clusters */}
      <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">REGISTRY CLUSTERS</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Engineering", count: 450, icon: "E" },
          { label: "Humanities", count: 280, icon: "H" },
          { label: "Sciences", count: 310, icon: "S" },
          { label: "Business", count: 200, icon: "B" }
        ].map((cluster, i) => (
          <Link href="/faculty/sections" key={i}>
            <div className="bento-card p-8 flex flex-col items-center text-center group cursor-pointer hover:bg-accent hover:border-bg-dark transition-all border-4 border-zinc-200">
              <div className="w-20 h-20 rounded-2xl bg-bg-dark text-white flex items-center justify-center text-4xl font-black mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                {cluster.icon}
              </div>
              <h4 className="text-xl font-black uppercase tracking-tight mb-2">{cluster.label}</h4>
              <div className="flex items-center gap-2 text-sm font-bold text-zinc-500 group-hover:text-bg-dark">
                <span>{cluster.count} Students</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
