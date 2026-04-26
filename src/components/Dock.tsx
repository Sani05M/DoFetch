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
  MoreVertical,
  Settings
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Dock() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (!user) return null;

  const studentNav = [
    { label: "Home", href: "/student/dashboard", icon: LayoutDashboard },
    { label: "Vault", href: "/student/certificates", icon: FileText },
    { label: "Issue", href: "/student/upload", icon: Upload },
    { label: "Identity", href: "/student/profile", icon: User },
  ];

  const facultyNav = [
    { label: "Admin", href: "/faculty/dashboard", icon: LayoutDashboard },
    { label: "Clusters", href: "/faculty/sections", icon: Users },
    { label: "Audit", href: "/faculty/certificates", icon: FileText },
    { label: "Export", href: "/faculty/export", icon: Download },
  ];

  const navItems = user.role === "student" ? studentNav : facultyNav;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="glass rounded-full px-4 py-3 flex items-center gap-2 border border-white/[0.08] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)]"
      >
        {/* Brand Trigger */}
        <Link href="/" className="group px-4 border-r border-white/10 mr-2">
          <div className="w-8 h-8 bg-accent rounded-xl flex items-center justify-center text-white shadow-lg shadow-accent/20 transition-transform active:scale-90">
            <Zap className="w-4 h-4 fill-current" />
          </div>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-5 py-3 rounded-2xl transition-all duration-500 group",
                  isActive ? "text-white" : "text-text-muted hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="dock-pill"
                    className="absolute inset-0 bg-white/[0.05] rounded-2xl -z-10 border border-white/[0.05]"
                  />
                )}
                <item.icon className={cn(
                  "w-4 h-4 transition-all duration-500",
                  isActive ? "text-accent scale-110" : "group-hover:scale-110"
                )} />
                <span className="text-[8px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Identity & Exit */}
        <div className="ml-2 pl-4 border-l border-white/10 flex items-center gap-4">
          <div className="group relative">
            <button className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-accent text-xs font-black transition-all hover:scale-110">
              {user.name.charAt(0)}
            </button>
            
            <div className="absolute bottom-full right-0 mb-4 w-48 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-500">
              <div className="glass rounded-[2rem] p-3 border border-white/[0.08] shadow-2xl">
                <div className="px-4 py-3 mb-2 border-b border-white/5">
                  <p className="text-[10px] font-black text-white">{user.name}</p>
                  <p className="text-[8px] text-text-muted mt-1">{user.email}</p>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-text-muted hover:text-white hover:bg-white/5 transition-all">
                  <Settings className="w-3.5 h-3.5" />
                  Preferences
                </button>
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-text-muted hover:text-accent hover:bg-accent/5 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
