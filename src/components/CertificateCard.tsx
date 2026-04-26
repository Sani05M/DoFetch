"use client";

import React from "react";
import { Zap, Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  studentName: string;
  studentId: string;
  type: string;
  issueDate: string;
  rating: string;
  status: "verified" | "pending" | "rejected" | "approved";
  fileType: "PDF" | "IMG";
}

interface CertificateCardProps {
  certificate: Certificate;
  className?: string;
}

export function CertificateCard({ certificate, className }: CertificateCardProps) {
  const isVerified = certificate.status === "verified" || certificate.status === "approved";

  return (
    <div className={cn(
      "bento-card group hover:border-bg-dark hover:bg-accent cursor-pointer flex flex-col justify-between h-full",
      className
    )}>
      <div>
        <div className="flex justify-between items-start mb-8">
          <div className="w-16 h-16 bg-bg-dark rounded-2xl flex items-center justify-center text-accent group-hover:bg-white group-hover:text-bg-dark transition-colors border-2 border-bg-dark">
            <Zap className="w-8 h-8 fill-current" />
          </div>
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border-2",
            isVerified 
              ? "bg-green-100 text-green-700 border-green-700" 
              : "bg-yellow-100 text-yellow-700 border-yellow-500"
          )}>
            {isVerified ? "VERIFIED" : "PENDING"}
          </div>
        </div>

        <h3 className="text-3xl font-black uppercase tracking-tight leading-tight mb-4 group-hover:text-bg-dark transition-colors">
          {certificate.title}
        </h3>
        
        <div className="space-y-2 mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-zinc-500 group-hover:text-bg-dark/70">Issued by {certificate.issuer}</p>
          <p className="text-xs font-black uppercase tracking-widest text-bg-dark">{certificate.issueDate}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-zinc-200 group-hover:border-zinc-300 transition-colors">
        <button className="flex-1 bg-bg-dark text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-zinc-800 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Download
        </button>
        <button className="p-3 border-2 border-zinc-200 rounded-xl hover:bg-zinc-50 hover:shadow-md hover:-translate-y-0.5 transition-all text-bg-dark bg-white group-hover:border-zinc-300">
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
