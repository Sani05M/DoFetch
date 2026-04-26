"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { UserCircle, Save, Mail, Briefcase, Shield, Layers, Settings } from "lucide-react";

export default function FacultyProfilePage() {
  const { user } = useAuth();
  
  // Local state for editing profile
  const [name, setName] = useState(user?.name || "Faculty Name");
  const [email, setEmail] = useState(user?.email || "faculty@adamas.edu");
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <DashboardLayout allowedRole="faculty">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center transform -rotate-3 border-2 border-bg-dark shadow-[4px_4px_0_#09090b]">
            <Shield className="w-8 h-8 text-bg-dark" />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">FACULTY PROFILE</h1>
            <p className="text-text-secondary font-bold text-sm uppercase tracking-widest">
              Manage authority details and preferences
            </p>
          </div>
        </div>

        <div className="bento-card mb-8">
          <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
            <Shield className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-black uppercase tracking-tight text-text-primary">Authority Identity</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-1">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Faculty ID</span>
              <p className="font-mono font-bold text-text-primary">{user?.facultyId || "FAC-2024-001"}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Department</span>
              <p className="font-bold flex items-center gap-2 text-text-primary"><Briefcase className="w-4 h-4"/> Computer Science</p>
            </div>
            <div className="space-y-1 md:col-span-2">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Managed Sections</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {(user?.sectionsManaged || ["A", "B"]).map(s => (
                  <span key={s} className="px-3 py-1 rounded bg-bg-dark text-text-on-dark text-xs font-black uppercase tracking-widest border-2 border-transparent">
                    Section {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bento-card">
          <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
            <Settings className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-black uppercase tracking-tight text-text-primary">Profile Details</h2>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-text-secondary ml-2">Full Name & Title</label>
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
                <Mail className="w-3 h-3"/> Official Email
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
                {isSaving ? "Updating..." : "Save Preferences"}
                <Save className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
