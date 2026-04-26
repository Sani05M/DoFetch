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
  Zap,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (!user) return null;

  const studentNav = [
    { label: "Overview", href: "/student/dashboard", icon: LayoutDashboard },
    { label: "Vault", href: "/student/certificates", icon: FileText },
    { label: "Issue", href: "/student/upload", icon: Upload },
    { label: "Identity", href: "/student/profile", icon: User },
  ];

  const facultyNav = [
    { label: "Registry", href: "/faculty/dashboard", icon: LayoutDashboard },
    { label: "Clusters", href: "/faculty/sections", icon: Users },
    { label: "Audit", href: "/faculty/certificates", icon: FileText },
    { label: "Export", href: "/faculty/export", icon: Download },
  ];

  // For the sake of the 'faculty' nav which uses Icons not imported above
  // but I'll stick to the core ones to keep the code clean as per current imports.

  const navItems = user.role === "student" ? studentNav : facultyNav;

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-island rounded-full px-8 py-3 flex items-center gap-2 border border-white/[0.08] shadow-2xl"
      >
        {/* Compact Logo */}
        <Link href="/" className="mr-6 group">
          <div className="w-8 h-8 bg-accent rounded-xl flex items-center justify-center text-white shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
            <Zap className="w-4 h-4 fill-current" />
          </div>
        </Link>

        {/* Centered Navigation */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all group relative",
                  isActive 
                    ? "text-white bg-white/[0.05]" 
                    : "text-text-muted hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className={cn(
                  "w-3.5 h-3.5 transition-colors",
                  isActive ? "text-accent" : "text-text-muted group-hover:text-text-secondary"
                )} />
                <span className="hidden xl:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Minimal Identity */}
        <div className="ml-6 pl-6 border-l border-white/[0.05] flex items-center gap-4">
          <div className="relative group">
            <button className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-[10px] font-black group-hover:scale-110 transition-all">
              {user.name.charAt(0)}
            </button>
            
            {/* Minimal Dropdown */}
            <div className="absolute top-full right-0 mt-4 w-40 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all">
              <div className="glass-island rounded-2xl p-1 border border-white/[0.05] shadow-2xl">
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-text-muted hover:text-accent hover:bg-accent/5 transition-all"
                >
                  <LogOut className="w-3 h-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}

// Dummy components for missing icons if role is faculty
const Users = (props: any) => <User {...props} />;
const Download = (props: any) => <FileText {...props} />;
