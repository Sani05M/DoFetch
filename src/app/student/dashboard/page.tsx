"use client";

import React from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useCertificates } from "@/hooks/useCertificates";
import { CertificateCard } from "@/components/CertificateCard";
import { LayoutGrid, CheckCircle2, Clock, Plus, Zap, ArrowUpRight } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function StudentDashboard() {
  const { certificates } = useCertificates();
  const { user } = useAuth();

  const verifiedCount = certificates.filter(c => c.status === "verified" || c.status === "approved").length;
  const pendingCount = certificates.filter(c => c.status === "pending").length;

  const stats = [
    { label: "Total Artifacts", count: certificates.length, icon: <LayoutGrid />, color: "bg-zinc-100 border-zinc-200" },
    { label: "Verified Syncs", count: verifiedCount, icon: <CheckCircle2 />, color: "bg-accent border-yellow-400" },
    { label: "Pending Nodes", count: pendingCount, icon: <Clock />, color: "bg-bg-dark text-white border-bg-dark" },
  ];

  return (
    <DashboardLayout allowedRole="student">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-xs font-bold mb-4 border border-zinc-200">
            <Zap className="w-3 h-3 text-accent fill-current" />
            <span>Institutional Mesh Active</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
            WELCOME BACK,<br/>
            <span className="text-accent">{user?.name || "STUDENT"}</span>
          </h1>
        </div>
        <Link href="/student/upload" className="btn-primary shrink-0">
          <Plus className="w-5 h-5" />
          Sync Credential
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

      {/* Recent Activity */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-black uppercase tracking-tighter">RECENTLY SYNCED</h2>
        <Link href="/student/certificates" className="text-sm font-black uppercase tracking-widest border-b-4 border-accent pb-1 hover:text-accent transition-colors">
          View Full Vault
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.slice(0, 6).map((cert) => (
          <CertificateCard key={cert.id} certificate={cert} />
        ))}
      </div>
    </DashboardLayout>
  );
}
