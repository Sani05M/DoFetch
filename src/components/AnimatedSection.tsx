"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedSection({ children, delay = 0, className }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.2, 
        delay: delay * 0.5, // halve all delays for snappier feel
        ease: [0.23, 1, 0.32, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04, // was 0.1 — much faster stagger
      when: "beforeChildren"
    }
  }
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.18,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};
