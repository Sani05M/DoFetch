"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useCertificates } from "@/hooks/useCertificates";
import { CertificateCard } from "@/components/CertificateCard";
import { Grid, List as ListIcon, Search, Filter, ShieldCheck, Zap, Download, MoreVertical } from "lucide-react";

export default function StudentVault() {
  const { certificates } = useCertificates();
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <DashboardLayout allowedRole="student">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
            CREDENTIAL<br/>
            <span className="text-accent">VAULT</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search artifacts..." 
                className="input-field pl-12 w-full md:w-96"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            </div>
            <button className="h-[60px] px-6 bg-white border-4 border-zinc-200 rounded-xl hover:border-bg-dark transition-colors flex items-center justify-center">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white border-4 border-zinc-200 p-1.5 rounded-xl">
          <button 
            onClick={() => setView("grid")}
            className={`p-3 rounded-lg transition-all ${view === "grid" ? "bg-bg-dark text-white" : "text-zinc-500 hover:bg-zinc-100"}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setView("list")}
            className={`p-3 rounded-lg transition-all ${view === "list" ? "bg-bg-dark text-white" : "text-zinc-500 hover:bg-zinc-100"}`}
          >
            <ListIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      ) : (
        <div className="bento-card p-0 overflow-hidden bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-4 border-zinc-200 bg-zinc-50">
                <th className="px-6 py-4 text-sm font-black uppercase tracking-widest text-zinc-500">Title</th>
                <th className="px-6 py-4 text-sm font-black uppercase tracking-widest text-zinc-500">Status</th>
                <th className="px-6 py-4 text-sm font-black uppercase tracking-widest text-zinc-500">Date</th>
                <th className="px-6 py-4 text-sm font-black uppercase tracking-widest text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-zinc-100">
              {certificates.map((cert) => {
                const isVerified = cert.status === "verified" || cert.status === "approved";
                return (
                  <tr key={cert.id} className="group hover:bg-accent hover:border-bg-dark transition-colors cursor-pointer">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-bg-dark flex items-center justify-center text-accent group-hover:bg-white border-2 border-bg-dark">
                          <Zap className="w-5 h-5 fill-current" />
                        </div>
                        <span className="font-black text-lg text-bg-dark uppercase tracking-tight">{cert.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`inline-flex items-center px-3 py-1.5 rounded-full border-2 text-xs font-black uppercase tracking-widest ${isVerified ? "bg-green-100 text-green-700 border-green-700" : "bg-yellow-100 text-yellow-700 border-yellow-500"}`}>
                        {isVerified ? "VERIFIED" : "PENDING"}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm font-bold uppercase tracking-widest text-zinc-500 group-hover:text-bg-dark">{cert.issueDate}</td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-white rounded-lg transition-colors text-bg-dark border-2 border-transparent hover:border-bg-dark">
                          <Download className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-white rounded-lg transition-colors text-bg-dark border-2 border-transparent hover:border-bg-dark">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
