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
      whileHover={{ translateY: -4 }}
      whileTap={{ x: 6, y: 6 }}
      onClick={onClick}
      className={cn(
        "bento-3d group hover:bg-accent cursor-pointer flex flex-col justify-between h-full p-8",
        className
      )}
    >
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
          <p className="text-sm font-bold uppercase tracking-widest text-text-secondary group-hover:text-bg-dark/70">Issued by {certificate.issuer}</p>
          <p className="text-xs font-black uppercase tracking-widest text-text-primary group-hover:text-bg-dark transition-colors">{certificate.issueDate}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-border group-hover:border-bg-dark/20 transition-colors">
        <NeoButton 
          variant="secondary"
          className="flex-1 py-3 text-xs"
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
        >
          <Download className="w-4 h-4" />
          Download
        </NeoButton>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            window.open(`/student/certificates/${certificate.id}`, '_blank');
          }}
          className="p-3 border-2 border-border rounded-xl hover:bg-bg-base transition-all text-text-primary bg-bg-surface group-hover:border-bg-dark/20"
        >
          <ExternalLink className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}

