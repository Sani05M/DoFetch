"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useCertificates } from "@/hooks/useCertificates";
import { CertificateCard, Certificate } from "@/components/CertificateCard";
import { CertificatePreview } from "@/components/CertificatePreview";
import { AnimatedSection, containerVariants, itemVariants } from "@/components/AnimatedSection";
import { LayoutGrid, CheckCircle2, Clock, Plus, Zap, ArrowUpRight } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function StudentDashboard() {
  const { certificates } = useCertificates();
  const { user } = useAuth();

  const verifiedCount = certificates.filter(c => c.status === "verified" || c.status === "approved").length;
  const pendingCount = certificates.filter(c => c.status === "pending").length;
  
  // Modal state
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = (cert: Certificate) => {
    setSelectedCert(cert);
    setIsPreviewOpen(true);
  };

  const stats = [
    { label: "Total Artifacts", count: certificates.length, icon: <LayoutGrid />, color: "bg-bg-surface border-border shadow-[4px_4px_0_#e4e4e7] dark:shadow-[4px_4px_0_#27272a]" },
    { label: "Verified Syncs", count: verifiedCount, icon: <CheckCircle2 />, color: "bg-accent border-bg-dark shadow-[4px_4px_0_#09090b] text-[#09090b]" },
    { label: "Pending Nodes", count: pendingCount, icon: <Clock />, color: "bg-bg-dark text-text-on-dark border-text-primary shadow-[4px_4px_0_#fafafa]" },
  ];

  return (
    <DashboardLayout allowedRole="student">
      {/* Hero Header */}
      <AnimatedSection>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-bg-surface rounded-full text-xs font-bold mb-4 border border-border">
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
      </AnimatedSection>

      {/* Grid Stats */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
      >
        {stats.map((stat, i) => {
          const href = stat.label === "Total Artifacts" 
            ? "/student/certificates" 
            : stat.label === "Verified Syncs" 
              ? "/student/certificates?filter=verified" 
              : "/student/certificates?filter=pending";
              
          return (
            <motion.div key={i} variants={itemVariants}>
              <Link href={href} className={`bento-card flex flex-col justify-between h-48 border-3 hover:-translate-y-1 hover:shadow-lg transition-all cursor-pointer ${stat.color}`}>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-bg-surface rounded-xl flex items-center justify-center text-text-primary shadow-sm border-2 border-border">
                    {React.cloneElement(stat.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                  </div>
                  <ArrowUpRight className="w-6 h-6 opacity-30 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <span className="text-6xl font-black tracking-tighter">{stat.count}</span>
                  <p className="text-sm font-bold uppercase tracking-tight mt-1 opacity-80">{stat.label}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Activity */}
      <AnimatedSection delay={0.4}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-black uppercase tracking-tighter">RECENTLY SYNCED</h2>
          <Link href="/student/certificates" className="text-sm font-black uppercase tracking-widest border-b-4 border-accent pb-1 hover:text-accent transition-colors">
            View Full Vault
          </Link>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificates.slice(0, 6).map((cert) => (
            <motion.div key={cert.id} variants={itemVariants}>
              <CertificateCard 
                certificate={cert} 
                onClick={() => handlePreview(cert)}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>

      <CertificatePreview 
        certificate={selectedCert}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </DashboardLayout>
  );
}
