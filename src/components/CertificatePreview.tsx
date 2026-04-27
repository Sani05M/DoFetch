import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X, Zap, ShieldCheck, Calendar, User, Building2, Download, Loader2, CheckCircle2 } from "lucide-react";
import { Certificate } from "./CertificateCard";
import { NeoButton } from "./NeoButton";

interface CertificatePreviewProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

const AsciiOverlay = () => {
  const [chars, setChars] = useState<string[]>([]);
  
  useEffect(() => {
    const symbols = "01010101XX77$$##@@%%&&**//\\\\==++--__  ";
    const rows = 35;
    const cols = 60;
    
    const generateGrid = () => 
      Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => symbols[Math.floor(Math.random() * symbols.length)]).join("")
      );

    setChars(generateGrid());

    const interval = setInterval(() => {
      setChars(prev => prev.map(line => {
        const lineArr = line.split("");
        // Smooth jitter: only update a few chars per row
        for(let i=0; i<4; i++) {
          const idx = Math.floor(Math.random() * lineArr.length);
          lineArr[idx] = symbols[Math.floor(Math.random() * symbols.length)];
        }
        return lineArr.join("");
      }));
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-lg md:rounded-xl">
       {/* Background Noise/ASCII */}
       <div className="absolute inset-0 opacity-20 font-mono text-[5px] md:text-[7px] leading-none text-accent flex flex-col justify-between select-none p-1">
        {chars.map((line, i) => (
          <div key={i} className="whitespace-nowrap overflow-hidden">{line}{line}</div>
        ))}
      </div>
      
      {/* High-Contrast Laser Line */}
      <motion.div 
        initial={{ top: "-5%" }}
        animate={{ top: "105%" }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[3px] bg-accent shadow-[0_0_25px_rgba(253,224,71,1)] z-40"
      >
        <div className="absolute inset-0 bg-accent/40 blur-sm scale-y-[15]" />
      </motion.div>

      {/* Data Scan Highlight Area */}
      <motion.div
        initial={{ top: "-30%" }}
        animate={{ top: "105%" }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[30%] bg-gradient-to-b from-transparent via-accent/15 to-transparent z-30"
      />
    </div>
  );
};

export function CertificatePreview({ certificate, isOpen, onClose }: CertificatePreviewProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasVerified, setHasVerified] = useState(false);

  useEffect(() => {
    if (isVerifying) {
      const timer = setTimeout(() => {
        setIsVerifying(false);
        setHasVerified(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVerifying]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

  // Shine/Glare position
  const glareOpacity = useSpring(useTransform(x, [-0.5, 0.5], [0.3, 0.6]), { stiffness: 300, damping: 30 });
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
            className="relative w-full max-w-5xl bg-bg-surface backdrop-blur-2xl border-3 md:border-4 border-bg-dark rounded-xl md:rounded-2xl overflow-hidden shadow-[8px_8px_0_#09090b] mx-4"
          >
            {/* Close Button */}
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 md:top-8 md:right-8 p-2 md:p-3 rounded-lg bg-bg-surface border-2 border-bg-dark hover:bg-accent transition-colors z-50 shadow-[2px_2px_0_#09090b]"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>

            <div className="flex flex-col lg:flex-row h-full max-h-[90vh] overflow-y-auto lg:overflow-hidden no-scrollbar">
              {/* 3D Glass Slab Visualization */}
              <div 
                className="lg:flex-[1.2] bg-zinc-950 p-4 md:p-12 flex items-center justify-center border-b-3 lg:border-b-0 lg:border-r-4 border-border relative overflow-hidden perspective-1000 min-h-[220px] md:min-h-[500px]"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                  <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-accent blur-[120px]" />
                  <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-accent blur-[120px]" />
                </div>
                <div className="w-full flex items-center justify-center perspective-1000">
                  <motion.div 
                    style={{ 
                      rotateX: isMobile ? 0 : rotateX, 
                      rotateY: isMobile ? 0 : rotateY, 
                      transformStyle: "preserve-3d" 
                    }}
                    className="w-full max-w-[280px] xs:max-w-[320px] md:max-w-[450px] aspect-[1.586/1] bg-zinc-950 rounded-lg md:rounded-xl p-4 md:p-10 border border-white/20 flex flex-col justify-between relative group overflow-hidden shadow-2xl"
                  >
                    {/* Interactive Glare / Shine Effect */}
                    {!isMobile && (
                      <motion.div 
                        style={{ 
                          left: glareX, 
                          top: glareY, 
                          opacity: glareOpacity 
                        }}
                        className="absolute w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white/20 to-transparent blur-3xl pointer-events-none z-10"
                      />
                    )}
                    {isVerifying && <AsciiOverlay />}

                    <div className="flex justify-between items-start relative z-20" style={{ transform: "translateZ(30px)" }}>
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-12 md:h-12 bg-accent rounded-lg flex items-center justify-center transform rotate-12 border-2 border-black">
                          <Zap className="w-4 h-4 md:w-6 md:h-6 text-black fill-current" />
                        </div>
                        <div>
                          <div className="text-[5px] md:text-[7px] font-black uppercase tracking-[0.3em] text-white/30">ISSUER</div>
                          <div className="text-[8px] md:text-xs font-black text-accent uppercase leading-none">{certificate.issuer}</div>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-20" style={{ transform: "translateZ(50px)" }}>
                      <div className="text-[6px] md:text-[8px] font-black uppercase tracking-[0.4em] text-accent/60 mb-0.5">OFFICIAL CREDENTIAL</div>
                      <h3 className="text-sm xs:text-base md:text-3xl font-black uppercase tracking-tighter leading-tight text-white">
                        {certificate.title}
                      </h3>
                    </div>

                    <div className="flex justify-between items-end relative z-20" style={{ transform: "translateZ(40px)" }}>
                      <div className="text-left">
                        <div className="text-[5px] md:text-[7px] font-black uppercase tracking-[0.3em] text-white/30">HOLDER</div>
                        <div className="text-xs md:text-lg font-black uppercase tracking-tight text-white leading-none">
                          {certificate.studentName}
                        </div>
                      </div>
                      <div className="text-right">
                         <div className="text-[8px] md:text-sm font-black text-white tabular-nums leading-none">{certificate.issueDate}</div>
                         <div className="mt-1 md:mt-2 inline-flex items-center px-1.5 py-0.5 bg-green-500 text-bg-dark rounded text-[5px] md:text-[7px] font-black uppercase">
                            VERIFIED
                         </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Details Pane */}
              <div className="flex-1 p-6 md:p-12 flex flex-col justify-between bg-bg-surface relative min-h-[400px]">

                <div className="space-y-6 md:space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent text-[#09090b] rounded-lg text-[10px] md:text-xs font-black uppercase tracking-widest border-2 border-black shadow-[2px_2px_0_#000]">
                    <ShieldCheck className="w-4 h-4" />
                    Registry Validated
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:space-y-8 md:block">
                    <div className="flex items-center gap-4 md:gap-5">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-base border-2 border-bg-dark rounded-xl flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0_#000]">
                        <Building2 className="w-5 h-5 md:w-6 md:h-6 text-text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Issuer Institution</div>
                        <div className="font-black text-sm md:text-xl uppercase tracking-tight truncate">{certificate.issuer}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-5">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-base border-2 border-bg-dark rounded-xl flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0_#000]">
                        <Calendar className="w-5 h-5 md:w-6 md:h-6 text-text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Issuance Date</div>
                        <div className="font-black text-sm md:text-xl uppercase tracking-tight truncate">{certificate.issueDate}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-5">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-base border-2 border-bg-dark rounded-xl flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0_#000]">
                        <User className="w-5 h-5 md:w-6 md:h-6 text-text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Credential Holder</div>
                        <div className="font-black text-sm md:text-xl uppercase tracking-tight truncate">{certificate.studentName}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 md:pt-10 border-t-2 border-border mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <button className="relative group overflow-hidden bg-accent text-bg-dark py-4 px-6 rounded-xl border-4 border-bg-dark shadow-[6px_6px_0_#000] transition-all hover:translate-y-[-2px] hover:shadow-[8px_8px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[10px] md:text-xs">
                    <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Download PDF
                  </button>

                  <button 
                    className={`relative group overflow-hidden py-4 px-6 rounded-xl border-4 transition-all flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[10px] md:text-xs ${
                      isVerifying 
                        ? 'bg-green-500/10 text-green-500 border-green-500 shadow-none animate-pulse cursor-wait' 
                        : hasVerified
                          ? 'bg-green-500 text-bg-dark border-bg-dark shadow-[6px_6px_0_#000] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none'
                          : 'bg-bg-surface text-text-primary border-bg-dark shadow-[6px_6px_0_#000] hover:bg-bg-base hover:translate-y-[-2px] hover:shadow-[8px_8px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none'
                    }`}
                    onClick={() => {
                      if (!isVerifying && !hasVerified) setIsVerifying(true);
                    }}
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Scanning Chain...
                      </>
                    ) : hasVerified ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Authenticity Confirmed
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Verify Authenticity
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

