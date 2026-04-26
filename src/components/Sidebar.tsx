"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Upload, 
  User, 
  LogOut, 
  Users, 
  Download,
  Zap,
  ChevronRight,
  Settings,
  HelpCircle,
  MoreVertical,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (!user) return null;

  const studentNav: NavItem[] = [
    { label: "Overview", href: "/student/dashboard", icon: LayoutDashboard },
    { label: "Vault", href: "/student/certificates", icon: FileText },
    { label: "Issue", href: "/student/upload", icon: Upload },
    { label: "Identity", href: "/student/profile", icon: User },
  ];

  const facultyNav: NavItem[] = [
    { label: "Registry", href: "/faculty/dashboard", icon: LayoutDashboard },
    { label: "Clusters", href: "/faculty/sections", icon: Users },
    { label: "Audit Log", href: "/faculty/certificates", icon: FileText },
    { label: "Export", href: "/faculty/export", icon: Download },
  ];

  const navItems = user.role === "student" ? studentNav : facultyNav;

  return (
    <aside className="fixed left-8 top-8 w-[280px] z-50 hidden lg:flex flex-col gap-6">
      {/* Main Terminal Dock */}
      <div className="glass-island rounded-[2.5rem] flex flex-col overflow-hidden border border-white/[0.05] p-2">
        {/* Brand */}
        <div className="p-6 pb-4">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-2xl flex items-center justify-center text-white shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="block font-display italic text-lg text-white leading-tight">Adamos</span>
              <span className="block text-[8px] uppercase tracking-[0.3em] text-accent font-bold">Credential OS</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[11px] font-bold transition-all group relative overflow-hidden",
                  isActive 
                    ? "text-white bg-white/[0.05] shadow-inner" 
                    : "text-text-muted hover:text-white hover:bg-white/[0.02]"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active-glow"
                    className="absolute left-0 w-1 h-6 bg-accent rounded-full"
                  />
                )}
                
                <item.icon className={cn(
                  "w-4 h-4 transition-colors",
                  isActive ? "text-accent" : "text-text-muted group-hover:text-text-secondary"
                )} />
                
                <span className="uppercase tracking-[0.15em]">{item.label}</span>
                
                {isActive && (
                  <div className="ml-auto w-1 h-1 rounded-full bg-accent animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Identity Section - Now Integrated at the Bottom of the Dock */}
        <div className="mt-4 p-2 border-t border-white/[0.05]">
          <div className="p-3 rounded-[1.8rem] bg-white/[0.02] border border-white/[0.03] flex items-center gap-3 group/profile">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xs font-black shadow-[0_0_15px_rgba(255,62,62,0.1)]">
                {user.name.charAt(0)}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-bg-base rounded-full" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black text-white truncate">{user.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-2.5 h-2.5 text-accent" />
                <span className="text-[8px] text-text-muted uppercase tracking-widest font-black">Verified</span>
              </div>
            </div>
            
            <button 
              onClick={logout}
              className="p-2 hover:bg-accent/10 text-text-muted hover:text-accent rounded-xl transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Config Dock (Optional, but adds to the look) */}
      <div className="glass-island rounded-[2rem] p-2 flex flex-col gap-1 border border-white/[0.05]">
        <Link href="#" className="flex items-center gap-3 px-5 py-3 rounded-xl text-[10px] font-bold text-text-muted hover:text-white hover:bg-white/[0.02] transition-all uppercase tracking-widest">
          <Settings className="w-3.5 h-3.5" />
          Config
        </Link>
        <Link href="#" className="flex items-center gap-3 px-5 py-3 rounded-xl text-[10px] font-bold text-text-muted hover:text-white hover:bg-white/[0.02] transition-all uppercase tracking-widest">
          <HelpCircle className="w-3.5 h-3.5" />
          Support
        </Link>
      </div>
    </aside>
  );
}
