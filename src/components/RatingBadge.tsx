import React from "react";
import { cn } from "@/lib/utils";

export type Rating = "Platinum" | "Gold" | "Silver" | "Bronze" | "Generic" | "Pending";

interface RatingBadgeProps {
  rating: Rating;
  className?: string;
}

export function RatingBadge({ rating, className }: RatingBadgeProps) {
  const styles: Record<Rating, string> = {
    Platinum: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    Gold: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Silver: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    Bronze: "bg-orange-900/10 text-orange-400 border-orange-900/20",
    Generic: "bg-red-500/10 text-red-400 border-red-500/20",
    Pending: "bg-text-muted/10 text-text-muted border-text-muted/20",
  };

  const icons: Record<Rating, string> = {
    Platinum: "🏆",
    Gold: "🥇",
    Silver: "🥈",
    Bronze: "🥉",
    Generic: "⚠️",
    Pending: "⏳",
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border",
      styles[rating],
      className
    )}>
      <span>{icons[rating]}</span>
      {rating}
    </span>
  );
}
