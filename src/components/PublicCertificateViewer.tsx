"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  User,
  ShieldAlert,
  RefreshCw,
  FileText,
  Download
} from "lucide-react";

interface PublicCertificateViewerProps {
  certificate: any;
}

export function PublicCertificateViewer({ certificate }: PublicCertificateViewerProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (certificate?.telegram_file_id) {
      loadPreview();
    }
  }, [certificate?.telegram_file_id]);

  const loadPreview = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/view/${certificate.telegram_file_id}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    } catch (err) {
      console.error("Preview error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!previewUrl) return;
    const link = document.createElement('a');
    link.href = previewUrl;
    link.setAttribute('download', `${certificate.title.replace(/\s+/g, '_')}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-8">
      {/* Action Bar */}
      <div className="flex justify-between items-center bg-black/5 p-4 rounded-2xl border-2 border-black/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-accent">
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Visual Evidence</span>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-4 py-2 bg-white border-2 border-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0_#000] hover:bg-accent transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center gap-2"
          >
            <RefreshCw className={`w-3 h-3 ${isFlipped ? 'rotate-180' : ''} transition-transform duration-500`} />
            {isFlipped ? 'View Card' : 'View Artifact'}
          </button>
          <button 
            onClick={handleDownload}
            disabled={!previewUrl}
            className="px-4 py-2 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0_#70e2a4] hover:bg-zinc-800 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center gap-2 disabled:opacity-50"
          >
            <Download className="w-3 h-3" />
            Download
          </button>
        </div>
      </div>

      {/* Viewer Area */}
      <div className="relative aspect-[4/3] md:aspect-[16/9] w-full perspective-2000">
        <motion.div
          className="w-full h-full relative"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT: 3D CARD */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden flex items-center justify-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-black rounded-[2rem] p-8 md:p-12 border-4 border-black flex flex-col justify-between relative overflow-hidden shadow-[20px_20px_0_#000]">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-accent blur-[150px]" />
              </div>
              
              <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-bg-dark border-2 border-black">
                    <Zap className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <div className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-1">OFFICIAL ISSUER</div>
                    <div className="text-xs font-black text-white uppercase">{certificate.issuer || 'Institutional Authority'}</div>
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-[8px] font-black uppercase tracking-[0.5em] text-accent/60 mb-2">CREDENTIAL ARTIFACT</div>
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white">
                  {certificate.title}
                </h3>
              </div>

              <div className="flex justify-between items-end relative z-10">
                <div>
                  <div className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-1">HOLDER</div>
                  <div className="text-lg md:text-2xl font-black uppercase tracking-tight text-white">
                    {certificate.profiles?.full_name || 'Verified Scholar'}
                  </div>
                </div>
                <div className="text-right">
                   <div className="text-sm font-black text-white">{certificate.issue_date || certificate.created_at.split('T')[0]}</div>
                   <div className="mt-2 inline-flex items-center px-2 py-1 bg-accent text-bg-dark rounded-lg text-[8px] font-black uppercase tracking-widest">
                      AUTHENTIC
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* BACK: ARTIFACT PREVIEW */}
          <motion.div
            className="absolute inset-0 w-full h-full bg-zinc-900 flex items-center justify-center"
            style={{ 
              backfaceVisibility: "hidden",
              rotateY: 180
            }}
          >
            <div className="w-full h-full rounded-[2rem] overflow-hidden border-4 border-black shadow-2xl bg-white relative">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 bg-zinc-900">
                  <div className="w-12 h-12 border-4 border-zinc-700 border-t-accent rounded-full animate-spin" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Decrypting Artifact...</p>
                </div>
              ) : previewUrl ? (
                certificate.type === 'IMG' ? (
                  <img src={previewUrl} alt="Source" className="w-full h-full object-contain" />
                ) : (
                  <iframe 
                    src={`${previewUrl}#toolbar=0&navpanes=0`} 
                    className="w-full h-full border-none" 
                    title="Secure Document"
                  />
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-full bg-zinc-900 p-8 text-center">
                  <ShieldAlert className="w-16 h-16 text-zinc-700 mb-4" />
                  <p className="text-zinc-600 font-black uppercase tracking-widest text-xs">Artifact Visibility Restricted</p>
                  <p className="text-zinc-500 text-[10px] mt-2">Only accessible via the official verification mesh.</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
