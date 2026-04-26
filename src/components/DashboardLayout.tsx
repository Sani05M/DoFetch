"use client";

import React, { useEffect } from "react";
import { useAuth, Role } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, LogOut, LayoutGrid, Plus, ShieldCheck } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  allowedRole: Role;
}

export function DashboardLayout({ children, allowedRole }: DashboardLayoutProps) {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    } else if (!isLoading && user && user.role !== allowedRole) {
      router.push(user.role === "student" ? "/student/dashboard" : "/faculty/dashboard");
    }
  }, [user, isLoading, allowedRole, router]);

  if (isLoading || !user || user.role !== allowedRole) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-8 border-zinc-100 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-bg-dark font-sans selection:bg-accent selection:text-bg-dark pb-20">
      {/* Same Navbar as Landing Page but for Dashboards */}
      <nav className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={user.role === "student" ? "/student/dashboard" : "/faculty/dashboard"} className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-accent rounded-md flex items-center justify-center transform rotate-45 group-hover:bg-bg-dark transition-colors">
              <Zap className="w-3.5 h-3.5 text-bg-dark -rotate-45 fill-current group-hover:text-accent" />
            </div>
            <span className="font-black text-xl tracking-tighter">ADAMAS REGISTRY</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold">
            {user.role === "student" ? (
              <>
                <Link href="/student/dashboard" className="hover:text-accent transition-colors flex items-center gap-2"><LayoutGrid className="w-4 h-4"/> Dashboard</Link>
                <Link href="/student/certificates" className="hover:text-accent transition-colors flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> My Vault</Link>
                <Link href="/student/upload" className="hover:text-accent transition-colors flex items-center gap-2"><Plus className="w-4 h-4"/> Sync Artifact</Link>
              </>
            ) : (
              <>
                <Link href="/faculty/dashboard" className="hover:text-accent transition-colors flex items-center gap-2"><LayoutGrid className="w-4 h-4"/> Command Center</Link>
                <Link href="/faculty/certificates" className="hover:text-accent transition-colors flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Audit Queue</Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-black uppercase tracking-widest border border-zinc-200">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              {user.role === "faculty" ? "Authority Active" : "Student Node"}
            </div>
            <button onClick={handleLogout} className="bg-bg-dark text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:-translate-y-0.5 hover:shadow-lg transition-all flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      <main className="max-w-6xl mx-auto px-6 pt-12">
        {children}
      </main>
    </div>
  );
}
