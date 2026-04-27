import { motion } from "framer-motion";
import { Zap, Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { NeoButton } from "./NeoButton";

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
  onClick?: () => void;
}

export function CertificateCard({ certificate, className, onClick }: CertificateCardProps) {
  const isVerified = certificate.status === "verified" || certificate.status === "approved";

  return (
    <motion.div 
      whileHover={{ x: -1, y: -1 }}
      whileTap={{ x: 3, y: 3 }}
      onClick={onClick}
      className={cn(
        "bento-3d group hover:bg-accent flex flex-col justify-between h-full p-6 md:p-8 transition-all active:shadow-none",
        className
      )}
    >
      <div>
        <div className="flex justify-between items-start mb-6 md:mb-8">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-bg-dark rounded-xl md:rounded-2xl flex items-center justify-center text-accent group-hover:bg-bg-surface group-hover:text-bg-dark transition-colors border-2 border-bg-dark">
            <Zap className="w-6 h-6 md:w-8 md:h-8 fill-current" />
          </div>
          <div className={cn(
            "px-2 md:px-3 py-1 rounded-lg text-[8px] md:text-[10px] font-black uppercase tracking-widest border-2",
            isVerified 
              ? "bg-green-500/10 text-green-600 border-green-600/20 group-hover:bg-bg-dark group-hover:text-green-400 group-hover:border-bg-dark" 
              : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 group-hover:bg-bg-dark group-hover:text-yellow-400 group-hover:border-bg-dark"
          )}>
            {isVerified ? "VERIFIED" : "PENDING"}
          </div>
        </div>

        <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight leading-tight mb-3 md:mb-4 group-hover:text-bg-dark transition-colors">
          {certificate.title}
        </h3>
        
        <div className="space-y-1 md:space-y-2 mb-6 md:mb-8">
          <p className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-text-secondary group-hover:text-bg-dark/70">Issued by {certificate.issuer}</p>
          <p className="text-[8px] md:text-xs font-black uppercase tracking-widest text-text-primary group-hover:text-bg-dark transition-colors">{certificate.issueDate}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4 pt-6 border-t-2 border-border group-hover:border-bg-dark/20 transition-colors">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            const content = `Certificate: ${certificate.title}\nIssuer: ${certificate.issuer}\nDate: ${certificate.issueDate}\nStatus: ${certificate.status}`;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const safeTitle = (certificate.title || "Certificate").replace(/\s+/g, '_');
            a.download = `${safeTitle}_Certificate.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }}
          className="flex-1 bg-bg-surface border-2 border-border py-2.5 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest text-text-primary group-hover:bg-bg-dark group-hover:text-text-on-dark group-hover:border-bg-dark transition-all flex items-center justify-center gap-2"
        >
          <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
          Download
        </button>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            window.open(`/student/certificates/${certificate.id}`, '_blank');
          }}
          className="p-2.5 md:p-3 border-2 border-border rounded-lg md:rounded-xl hover:bg-bg-dark hover:border-bg-dark hover:text-text-on-dark transition-all text-text-primary bg-bg-surface group-hover:border-bg-dark/20"
        >
          <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}

