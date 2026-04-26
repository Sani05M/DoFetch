"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { UserCircle, Save, Mail, Briefcase, BadgeCheck, BookOpen } from "lucide-react";

export default function StudentProfilePage() {
  const { user } = useAuth();
  
  // Local state for editing profile
  const [name, setName] = useState(user?.name || "Student Name");
  const [email, setEmail] = useState(user?.email || "student@adamas.edu");
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // Ideally, update the global auth context user object here
    }, 1000);
  };

  return (
    <DashboardLayout allowedRole="student">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center transform rotate-3 border-2 border-bg-dark shadow-[4px_4px_0_#09090b]">
            <UserCircle className="w-8 h-8 text-bg-dark" />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">STUDENT PROFILE</h1>
            <p className="text-text-secondary font-bold text-sm uppercase tracking-widest">
              Manage your personal and academic details
            </p>
          </div>
        </div>

        <div className="bento-card mb-8">
          <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
            <BadgeCheck className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-black uppercase tracking-tight text-text-primary">Academic Identity</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-1">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Registration No.</span>
              <p className="font-mono font-bold text-text-primary">{user?.regNo || "AU/2022/01234"}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Roll Number</span>
              <p className="font-mono font-bold text-text-primary">{user?.rollNo || "22CS001"}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Department</span>
              <p className="font-bold flex items-center gap-2 text-text-primary"><Briefcase className="w-4 h-4"/> Computer Science</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Section</span>
              <p className="font-bold flex items-center gap-2 text-text-primary"><BookOpen className="w-4 h-4"/> {user?.section || "A"}</p>
            </div>
          </div>
        </div>

        <div className="bento-card">
          <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
            <UserCircle className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-black uppercase tracking-tight text-text-primary">Personal Details</h2>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-2">Full Legal Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-2 flex items-center gap-2">
                <Mail className="w-3 h-3"/> University Email
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="flex justify-end pt-4">
              <button 
                type="submit" 
                disabled={isSaving}
                className="btn-primary"
              >
                {isSaving ? "Saving..." : "Save Changes"}
                <Save className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
