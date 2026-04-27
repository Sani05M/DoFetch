"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useCertificates } from "@/hooks/useCertificates";
import { Upload, Zap, CheckCircle2, Loader2, FileText, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentUpload() {
  const { addCertificate } = useCertificates();
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    type: "Academic Artifact",
    issueDate: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate mesh synchronization
    setTimeout(() => {
      addCertificate({
        ...formData,
        studentId: "STU2024001",
        studentName: "Abhishek Singh",
      });
      router.push("/student/dashboard");
    }, 2500);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <DashboardLayout allowedRole="student">
      <div className="max-w-5xl mx-auto space-y-10 md:space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-bg-surface rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-border">
            <Zap className="w-3 h-3 text-accent fill-current" />
            <span>Secure Ingest Protocol</span>
          </div>
          <h1 className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-text-primary">
            SYNCHRONIZE<br />
            <span className="text-accent">ARTIFACT</span>
          </h1>
          <p className="text-sm md:text-lg text-text-secondary font-bold uppercase tracking-widest opacity-70 max-w-2xl mx-auto px-4">
            Ingest your academic achievements into the registry. Artifacts undergo a high-fidelity audit by the university before appearing verified in your vault.
          </p>
        </div>

        {/* Upload Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Metadata Form */}
          <div className="lg:col-span-3 bento-card bg-bg-surface p-6 xs:p-8 md:p-12 border-3 md:border-4 border-border shadow-[4px_4px_0_#000]">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-6 md:mb-8 text-text-primary">ARTIFACT METADATA</h2>
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary">Artifact Title</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. B.Tech in Computer Science"
                  className="input-field w-full bg-bg-base border-2 border-border p-4 rounded-xl font-bold text-sm"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary">Issuing Authority</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Adamas University"
                    className="input-field w-full bg-bg-base border-2 border-border p-4 rounded-xl font-bold text-sm"
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary">Academic Cluster</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Engineering"
                    className="input-field w-full bg-bg-base border-2 border-border p-4 rounded-xl font-bold text-sm"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary">Certification Date</label>
                  <input 
                    required
                    type="date" 
                    className="input-field w-full bg-bg-base border-2 border-border p-4 rounded-xl font-bold text-sm"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-4 md:pt-8">
                <button 
                  disabled={isUploading}
                  type="submit"
                  className="w-full btn-primary bg-accent text-bg-dark py-4 md:py-5 rounded-xl md:rounded-2xl text-base md:text-lg font-black uppercase tracking-widest shadow-[4px_4px_0_#09090b] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#09090b] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" />
                      SYNCHRONIZING...
                    </>
                  ) : (
                    <>
                      INITIATE SYNC
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Ingest Zone / Info */}
          <div className="lg:col-span-2 space-y-6 md:gap-8">
            <div 
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`bento-card border-3 border-border p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[250px] md:min-h-[300px] border-dashed cursor-pointer transition-all shadow-[4px_4px_0_#000] rounded-2xl md:rounded-[2.5rem] ${
                isDragging ? "bg-bg-dark text-accent border-accent" : "bg-accent hover:bg-accent/90 text-[#09090b]"
              }`}
            >
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              />
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl border-3 flex items-center justify-center mb-4 md:mb-6 transition-colors ${
                isDragging ? "bg-accent text-bg-dark border-accent" : "bg-bg-surface border-bg-dark text-bg-dark"
              }`}>
                <Upload className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter">
                {selectedFile ? "ARTIFACT SECURED" : "DROP ARTIFACT"}
              </h2>
              {selectedFile ? (
                <p className="mt-2 md:mt-4 text-[10px] md:text-xs font-black uppercase tracking-widest opacity-80 truncate max-w-full px-4">
                  {selectedFile.name}
                </p>
              ) : (
                <p className="mt-2 md:mt-4 text-[10px] md:text-xs font-black uppercase tracking-widest opacity-60">
                  PDF, DOCX, IMAGES
                </p>
              )}
            </div>

            <div className="bento-card bg-bg-dark text-white p-8 md:p-10 border-3 md:border-4 border-border rounded-2xl md:rounded-[2.5rem] shadow-[4px_4px_0_#000]">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-bg-surface border-2 border-border flex items-center justify-center text-bg-dark">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-accent">AUDIT PROTOCOL</h3>
                  <ul className="space-y-2 md:space-y-3">
                    {[
                      "Metadata verification",
                      "Registry sync check",
                      "Visual integrity scan",
                      "Signature validation"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
