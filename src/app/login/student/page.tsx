"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { CustomSelect } from "@/components/CustomSelect";

const BATCH_OPTIONS = [
  { label: "2021 - 2025", value: "2021-2025" },
  { label: "2022 - 2026", value: "2022-2026" },
  { label: "2023 - 2027", value: "2023-2027" },
  { label: "2024 - 2028", value: "2024-2028" },
];

const DEPT_OPTIONS = [
  { label: "Computer Science (CSE)", value: "CSE" },
  { label: "Electronics (ECE)", value: "ECE" },
  { label: "Mechanical Eng.", value: "MECH" },
  { label: "Civil Eng.", value: "CIVIL" },
  { label: "Business Admin (BBA)", value: "BBA" },
  { label: "School of Law", value: "LAW" },
];

export default function StudentLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [batch, setBatch] = useState("");
  const [dept, setDept] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [section, setSection] = useState("");
  const [regNo, setRegNo] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: "STU2024" + Math.floor(Math.random() * 1000),
      name: fullName || "Student",
      email: email || "name@adamas.edu",
      role: "student",
      rollNo: rollNo || "CS24" + Math.floor(Math.random() * 100),
      regNo: regNo || "AD2024CS" + Math.floor(Math.random() * 100),
      section: section || "CS-A",
    });
    router.push("/student/dashboard");
  };

  return (
    <div className="h-screen bg-bg-surface flex flex-col md:flex-row font-sans selection:bg-accent selection:text-bg-dark overflow-hidden">
      {/* Left side: Form */}
      <div className="w-full md:w-[45%] bg-bg-surface p-4 sm:p-6 md:p-8 flex flex-col justify-center border-b-4 md:border-b-0 md:border-r-4 border-border h-full">
        <div className="max-w-md w-full mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 md:mb-6">
            <div className="w-6 h-6 md:w-7 md:h-7 bg-accent rounded-lg flex items-center justify-center transform rotate-45">
              <Zap className="w-3 h-3 md:w-3.5 md:h-3.5 text-bg-dark -rotate-45 fill-current" />
            </div>
            <span className="font-black text-lg md:text-xl tracking-tighter uppercase text-text-primary">ADAMAS REGISTRY</span>
          </Link>

          <h1 className="text-2xl xs:text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-2 text-text-primary">
            STUDENT<br />
            <span className="text-text-secondary">PORTAL</span>
          </h1>
          <p className="text-text-secondary font-bold mb-4 md:mb-6 text-[9px] md:text-xs uppercase tracking-widest leading-none">
            Enter your credentials to access your vault
          </p>

          <form onSubmit={handleLogin} className="space-y-3 md:space-y-4">
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary ml-2">Full Name</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-field"
                placeholder="Abhishek Singh"
                required
              />
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary ml-2">University Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="name@adamas.edu"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary ml-2">Batch</label>
                <CustomSelect 
                  options={BATCH_OPTIONS}
                  value={batch}
                  onChange={setBatch}
                  placeholder="Select Batch"
                />
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary ml-2">Department</label>
                <CustomSelect 
                  options={DEPT_OPTIONS}
                  value={dept}
                  onChange={setDept}
                  placeholder="Select Dept"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary ml-2">Roll Number</label>
                <input 
                  type="text" 
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="input-field"
                  placeholder="e.g. 22CS001"
                  required
                />
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary ml-2">Section</label>
                <input 
                  type="text" 
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="input-field"
                  placeholder="e.g. A"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary ml-2">Registration Number</label>
              <input 
                type="text" 
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                className="input-field"
                placeholder="e.g. AU/2022/01234"
                required
              />
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary ml-2">Secure Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="w-full btn-primary py-4 text-base md:text-lg mt-4 shadow-[4px_4px_0_#09090b] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#09090b] transition-all">
              Authenticate
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 md:mt-12 text-center">
            <p className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest">
              Secured by <span className="text-text-primary font-black">Adamas Cryptography</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Branding/Visual */}
      <div className="hidden md:flex w-[55%] p-12 items-center justify-center relative overflow-hidden bg-accent">
        <div className="absolute inset-0 bg-dot-pattern opacity-10 mix-blend-overlay" />
        
        <div className="relative z-10 max-w-lg w-full">
          <div className="bento-card bg-bg-surface text-text-primary p-12 text-center shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="w-16 h-16 bg-bg-dark text-text-on-dark rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">
              YOUR RECORDS, SECURED.
            </h2>
            <p className="text-text-secondary font-bold text-sm uppercase tracking-widest mb-8">
              Access your digital transcripts, verify artifacts, and manage your academic portfolio in one secure vault.
            </p>
            
            <div className="flex flex-col gap-3">
              {[
                "Instant Registry Access",
                "Cryptographic Verification",
                "Global Sharing Links"
              ].map((item, i) => (
                <div key={i} className="bg-bg-base border-2 border-border rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="font-black text-sm uppercase tracking-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
