import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

type NodeData = {
  id: string;
  label: string;
  type: "root" | "hub" | "leaf";
  x: number; // Percentage
  y: number; // Percentage
  parent?: string;
};

// Symmetrical, perfectly aligned hierarchical grid showing Mentor's network
const NODES: NodeData[] = [
  // Tier 1: Root (The Faculty/Mentor)
  { id: "FACULTY", label: "My Mentorship", type: "root", x: 50, y: 15 },
  
  // Tier 2: Hubs (Batches managed by the mentor)
  { id: "BATCH_24", label: "Batch 2024", type: "hub", x: 25, y: 45, parent: "FACULTY" },
  { id: "BATCH_25", label: "Batch 2025", type: "hub", x: 75, y: 45, parent: "FACULTY" },
  
  // Tier 3: Leaves (Sections within those batches)
  // Batch 24 Sections
  { id: "SEC_24_A", label: "CS - Sec A", type: "leaf", x: 10, y: 80, parent: "BATCH_24" },
  { id: "SEC_24_B", label: "CS - Sec B", type: "leaf", x: 25, y: 80, parent: "BATCH_24" },
  { id: "SEC_24_C", label: "EC - Sec A", type: "leaf", x: 40, y: 80, parent: "BATCH_24" },
  // Batch 25 Sections
  { id: "SEC_25_A", label: "CS - Sec C", type: "leaf", x: 60, y: 80, parent: "BATCH_25" },
  { id: "SEC_25_B", label: "EC - Sec B", type: "leaf", x: 75, y: 80, parent: "BATCH_25" },
  { id: "SEC_25_C", label: "ME - Sec A", type: "leaf", x: 90, y: 80, parent: "BATCH_25" },
];

export const RegistryGraph = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 500 }); // Default fallback

  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    
    // Initial measurement
    setDimensions({
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });

    return () => resizeObserver.disconnect();
  }, []);

  // Helper to convert percentage to absolute pixels
  const getAbsPos = (pctX: number, pctY: number) => ({
    x: (pctX / 100) * dimensions.width,
    y: (pctY / 100) * dimensions.height,
  });

  // Helper to generate smooth Bezier curves between absolute coordinates
  const createBezierPath = (startX: number, startY: number, endX: number, endY: number) => {
    const midY = (startY + endY) / 2;
    return `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
  };

  return (
    <div ref={containerRef} className="relative w-full h-[500px] bg-[#020617] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] group">
      {/* Antigravity Spatial Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: "linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_60%)]" />

      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Data-Links (Edges) */}
        {NODES.filter(n => n.parent).map((node, i) => {
          const parent = NODES.find(p => p.id === node.parent);
          if (!parent) return null;

          const isHighlighted = hoveredNode === node.id || hoveredNode === parent.id || hoveredNode === "FACULTY";
          
          const start = getAbsPos(parent.x, parent.y);
          const end = getAbsPos(node.x, node.y);
          const path = createBezierPath(start.x, start.y, end.x, end.y);

          return (
            <motion.path
              key={`edge-${i}`}
              d={path}
              fill="none"
              stroke={isHighlighted ? "url(#lineGrad)" : "rgba(255, 255, 255, 0.1)"}
              strokeWidth={isHighlighted ? 2 : 1}
              strokeDasharray="4 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: isHighlighted ? 1 : 0.4 }}
              transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
            />
          );
        })}
      </svg>

      {/* Nodes Layer */}
      {NODES.map((node, i) => {
        const isHighlighted = hoveredNode === node.id || 
                             (node.parent && hoveredNode === node.parent) || 
                             (node.id === "FACULTY" && hoveredNode !== null);
        
        const pos = getAbsPos(node.x, node.y);

        return (
          <motion.div
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: isHighlighted ? 1.05 : 1,
              zIndex: isHighlighted ? 50 : 10
            }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
            style={{ left: pos.x, top: pos.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center"
          >
            {/* Glassmorphic Node Card */}
            <div className={`px-4 py-2.5 rounded-xl backdrop-blur-xl border transition-all duration-300 flex items-center gap-3 ${
              isHighlighted 
                ? "bg-white/10 border-accent/50 shadow-[0_10px_30px_rgba(99,102,241,0.2)]" 
                : "bg-white/5 border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:bg-white/10"
            }`}>
              <div className={`w-2.5 h-2.5 rounded-full ${
                node.type === "root" ? "bg-accent shadow-[0_0_10px_var(--color-accent)]" :
                node.type === "hub" ? "bg-indigo-400" : "bg-zinc-400"
              }`} />
              <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${
                isHighlighted ? "text-white" : "text-zinc-300"
              }`}>
                {node.label}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* Top Overlay Badge */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <div className="px-3 py-1.5 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 text-[9px] font-black uppercase text-white/50 tracking-[0.2em] shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
          Mentorship Topology
        </div>
      </div>
    </div>
  );
};

