"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  className?: string;
}

export function StatCard({ label, value, icon, trend, className }: StatCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -8, rotateX: -5, rotateY: 5 }}
      className={cn(
        "relative glass-card rounded-[2rem] p-8 overflow-hidden group preserve-3d transition-all duration-500",
        className
      )}
    >
      {/* Background Accent Glow */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/5 blur-[50px] rounded-full group-hover:bg-accent/10 transition-all duration-700" />
      
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-accent shadow-inner group-hover:scale-110 transition-all duration-500">
            {icon}
          </div>
          {trend && (
            <div className="px-3 py-1 rounded-full bg-success/10 border border-success/20 text-[9px] font-bold text-success uppercase tracking-widest">
              {trend}
            </div>
          )}
        </div>
        
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold mb-2">
            {label}
          </p>
          <h3 className="text-4xl font-display italic text-white group-hover:text-accent transition-colors">
            {value}
          </h3>
        </div>
      </div>

      {/* Glass Reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
