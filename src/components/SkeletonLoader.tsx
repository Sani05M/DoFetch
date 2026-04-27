"use client";

import React from "react";
import { motion } from "framer-motion";

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded-lg ${className}`} />
);

export const CertificateSkeleton = () => (
  <div className="bento-card bg-bg-surface border-4 border-border p-6 md:p-8 h-full flex flex-col justify-between">
    <div className="flex justify-between items-start mb-8">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="w-24 h-3" />
          <Skeleton className="w-32 h-4" />
        </div>
      </div>
      <Skeleton className="w-20 h-8 rounded-full" />
    </div>
    
    <div className="space-y-4">
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-2/3 h-4" />
    </div>

    <div className="mt-8 pt-8 border-t-2 border-border flex justify-between items-center">
      <Skeleton className="w-24 h-4" />
      <Skeleton className="w-10 h-10 rounded-lg" />
    </div>
  </div>
);

export const TableRowSkeleton = () => (
  <tr className="border-b-2 border-border animate-pulse">
    <td className="px-6 py-6"><Skeleton className="w-20 h-4" /></td>
    <td className="px-6 py-6"><Skeleton className="w-48 h-5" /></td>
    <td className="px-6 py-6"><Skeleton className="w-24 h-4 rounded-md" /></td>
    <td className="px-6 py-6"><Skeleton className="w-16 h-4" /></td>
    <td className="px-6 py-6 text-right"><Skeleton className="w-8 h-8 rounded-lg ml-auto" /></td>
  </tr>
);
