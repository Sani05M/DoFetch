"use client";

import React, { useState, use } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft,
  CheckCircle2,
  XCircle,
  FileText,
  ShieldAlert,
  User,
  Calendar
} from "lucide-react";

export default function AuditDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const unwrappedParams = use(params);

  // In a real app, you would fetch the specific certificate by ID.
  const certId = unwrappedParams.id;

  const handleAudit = (action: "approve" | "reject") => {
    setIsProcessing(true);
    setTimeout(() => {
      // Simulate API call to update status
      router.push("/faculty/certificates");
    }, 1500);
  };

  return (
    <DashboardLayout allowedRole="faculty">
      <div className="max-w-5xl mx-auto">
        <Link href="/faculty/certificates" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-500 hover:text-bg-dark mb-8 border-b-2 border-transparent hover:border-bg-dark pb-1 transition-all">
          <ArrowLeft className="w-4 h-4" />
          Back to Queue
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 rounded-full text-xs font-bold border-2 border-yellow-500 mb-4 text-yellow-700">
              <ShieldAlert className="w-3 h-3" />
              <span>PENDING AUDIT</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
              ARTIFACT<br/>
              <span className="text-accent">#{certId}</span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document Preview Panel */}
          <div className="lg:col-span-2 bento-card bg-zinc-100 p-8 flex flex-col items-center justify-center min-h-[500px] border-dashed">
            <div className="w-24 h-24 rounded-2xl bg-white border-4 border-zinc-300 flex items-center justify-center text-zinc-300 mb-6">
              <FileText className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-zinc-400">DOCUMENT PREVIEW</h2>
            <p className="mt-2 text-xs font-black uppercase tracking-widest text-zinc-400">SECURE VIEWER LOADED</p>
          </div>

          {/* Metadata & Actions Panel */}
          <div className="space-y-8">
            <div className="bento-card p-8 bg-white space-y-6">
              <h3 className="text-xl font-black uppercase tracking-tighter border-b-4 border-zinc-100 pb-4">METADATA</h3>
              
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2"><User className="w-3 h-3"/> STUDENT</p>
                <p className="font-bold text-lg text-bg-dark">Abhishek Singh</p>
                <p className="text-xs font-bold text-zinc-400 uppercase">22CS001 • Sec A</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2"><FileText className="w-3 h-3"/> CERTIFICATE</p>
                <p className="font-bold text-lg text-bg-dark">Google Cloud Prof.</p>
                <p className="text-xs font-bold text-zinc-400 uppercase">Issued by Google</p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2"><Calendar className="w-3 h-3"/> DATE ISSUED</p>
                <p className="font-bold text-lg text-bg-dark">2024-09-15</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => handleAudit("approve")}
                disabled={isProcessing}
                className="w-full bg-green-500 text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest border-4 border-green-600 hover:bg-green-400 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_8px_0_rgb(22,163,74)] hover:shadow-[0_4px_0_rgb(22,163,74)] hover:translate-y-1 disabled:opacity-50"
              >
                <CheckCircle2 className="w-6 h-6" />
                VERIFY
              </button>
              
              <button 
                onClick={() => handleAudit("reject")}
                disabled={isProcessing}
                className="w-full bg-white text-red-500 py-5 rounded-2xl font-black text-lg uppercase tracking-widest border-4 border-zinc-200 hover:border-red-500 hover:bg-red-50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <XCircle className="w-6 h-6" />
                REJECT
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
