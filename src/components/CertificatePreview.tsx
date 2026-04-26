"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, ShieldCheck, Calendar, User, Building2, Download } from "lucide-react";
import { Certificate } from "./CertificateCard";

import { NeoButton } from "./NeoButton";

interface CertificatePreviewProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificatePreview({ certificate, isOpen, onClose }: CertificatePreviewProps) {
  if (!certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-dark/40 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-bg-surface backdrop-blur-2xl border-4 border-bg-dark dark:border-bg-base rounded-[2.5rem] shadow-[12px_12px_0px_#09090b] dark:shadow-[12px_12px_0px_#fafafa] overflow-hidden"
          >
            {/* Close Button */}
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-8 right-8 p-3 rounded-full bg-bg-surface border-2 border-bg-dark dark:border-bg-base hover:bg-accent transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <div className="flex flex-col md:flex-row h-full min-h-[500px]">
              {/* Card Visualization */}
              <div className="flex-1 bg-gradient-to-br from-accent/20 to-transparent p-12 flex items-center justify-center border-b md:border-b-0 md:border-r-4 border-border relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent blur-[100px]" />
                  <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent blur-[100px]" />
                </div>

                <motion.div 
                  initial={{ rotateY: 15 }}
                  animate={{ rotateY: 0 }}
                  whileHover={{ rotateY: -10, rotateX: 5 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="w-full max-w-[400px] aspect-[1.586/1] bg-bg-dark text-accent rounded-3xl p-8 border-4 border-accent shadow-[0_20px_50px_rgba(253,224,71,0.2)] flex flex-col justify-between relative group cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center transform rotate-45 border-2 border-accent shadow-[0_0_15px_rgba(253,224,71,0.5)]">
                      <Zap className="w-6 h-6 text-bg-dark -rotate-45 fill-current" />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">REGISTRY ID</div>
                      <div className="text-xs font-mono font-bold tracking-tighter">{certificate.id}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2 break-words">
                      {certificate.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">OFFICIALLY VERIFIED</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[8px] font-black uppercase tracking-[0.2em] opacity-60">SCHOLAR</div>
                      <div className="text-sm font-black uppercase tracking-tight">{certificate.studentName}</div>
                    </div>
                    <div className="w-16 h-10 bg-accent/10 border border-accent/30 rounded flex items-center justify-center">
                       <span className="text-[8px] font-black opacity-40">AU REGISTRY</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Details Pane */}
              <div className="flex-1 p-12 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Authenticity Guaranteed
                  </div>

                  <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 leading-none">
                    Certificate<br />Details
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-bg-base border-2 border-border rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-text-secondary" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Issuer Institution</div>
                        <div className="font-bold text-lg">{certificate.issuer}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-bg-base border-2 border-border rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-text-secondary" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Issue Date</div>
                        <div className="font-bold text-lg">{certificate.issueDate}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-bg-base border-2 border-border rounded-xl flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-text-secondary" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Recipient</div>
                        <div className="font-bold text-lg uppercase tracking-tight">{certificate.studentName}</div>
                        <div className="text-xs font-mono opacity-50">{certificate.studentId}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-border mt-8 flex flex-col sm:flex-row gap-4">
                  <NeoButton variant="primary" className="flex-1">
                    <Download className="w-5 h-5" />
                    Download High-Res
                  </NeoButton>
                  <NeoButton variant="outline" className="flex-1">
                    Verify Link
                  </NeoButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

