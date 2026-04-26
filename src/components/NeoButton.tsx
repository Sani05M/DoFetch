"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeoButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
  className?: string;
}

export function NeoButton({ 
  variant = "primary", 
  children, 
  className, 
  ...props 
}: NeoButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-colors duration-200 border-3";
  
  const variants = {
    primary: "bg-accent text-bg-dark border-bg-dark dark:border-bg-base shadow-[4px_4px_0px_#09090b] dark:shadow-[4px_4px_0px_#fafafa] hover:bg-accent-hover",
    secondary: "bg-bg-dark text-bg-base border-bg-dark dark:bg-bg-base dark:text-bg-dark dark:border-bg-base shadow-[4px_4px_0px_rgba(0,0,0,0.2)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.2)]",
    outline: "bg-bg-surface text-text-primary border-bg-dark dark:border-bg-base shadow-[4px_4px_0px_#09090b] dark:shadow-[4px_4px_0px_#fafafa] hover:bg-bg-base",
  };

  return (
    <motion.button
      whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0px var(--tw-shadow-color, #09090b)" }}
      whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px var(--tw-shadow-color, #09090b)" }}
      transition={{ type: "spring", stiffness: 500, damping: 15 }}
      className={cn(
        baseStyles,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
