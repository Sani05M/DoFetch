"use client";

import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { 
  User, 
  Mail, 
  Shield, 
  Layers, 
  LogOut,
  Camera,
  Settings
} from "lucide-react";

export default function FacultyProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout allowedRole="faculty">
      <div className="max-w-3xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-display italic text-text-primary">Faculty Profile</h1>
          <p className="text-text-secondary mt-1">Manage your academic credentials and sections.</p>
        </div>

        <div className="bg-bg-surface border border-border rounded-2xl overflow-hidden">
          {/* Header/Cover */}
          <div className="h-32 bg-accent/10 border-b border-border relative">
            <div className="absolute -bottom-12 left-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl bg-bg-surface border-4 border-bg-base flex items-center justify-center text-accent text-3xl font-bold shadow-xl">
                  {user.name.charAt(0)}
                </div>
                <button className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-16 pb-8 px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-xl font-medium text-text-primary">{user.name}</h2>
                <p className="text-sm text-text-muted mt-1">{user.email}</p>
              </div>
              <button 
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded-lg text-sm hover:bg-accent/20 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="space-y-6">
                <ProfileItem icon={<Shield className="w-4 h-4" />} label="Faculty ID" value={user.facultyId || "N/A"} />
                <ProfileItem icon={<Mail className="w-4 h-4" />} label="Official Email" value={user.email} />
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-2 bg-bg-elevated border border-border rounded-lg text-text-muted shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-text-muted mb-2">Managed Sections</p>
                    <div className="flex flex-wrap gap-2">
                      {user.sectionsManaged?.map(s => (
                        <span key={s} className="px-2 py-0.5 rounded bg-bg-elevated border border-border text-[10px] font-mono text-text-primary">
                          Section {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Settings */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-bg-surface border border-border rounded-2xl">
            <h3 className="text-sm font-medium text-text-primary mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4 text-text-muted" />
              Administrative Controls
            </h3>
            <p className="text-xs text-text-muted mb-6">Manage how you interact with student submissions.</p>
            <div className="space-y-4">
              <Toggle label="Auto-approve lower tier certs" />
              <Toggle label="Enable AI rating assistance" checked />
              <Toggle label="Daily summary email" checked />
            </div>
          </div>
          <div className="p-6 bg-bg-surface border border-border rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center text-accent">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-text-primary">Request Section Access</h3>
              <p className="text-[11px] text-text-muted mt-1">Need to manage a new section? Submit a request to the admin office.</p>
            </div>
            <button className="px-4 py-2 bg-bg-elevated border border-border rounded-lg text-xs hover:border-accent/30 hover:text-accent transition-all">
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ProfileItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex gap-4">
      <div className="p-2 bg-bg-elevated border border-border rounded-lg text-text-muted shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-text-muted mb-1">{label}</p>
        <p className="text-sm text-text-primary font-mono">{value}</p>
      </div>
    </div>
  );
}

function Toggle({ label, checked = false }: { label: string, checked?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-text-secondary">{label}</span>
      <div className={`w-10 h-5 rounded-full p-1 transition-colors ${checked ? 'bg-accent' : 'bg-bg-elevated'}`}>
        <div className={`w-3 h-3 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </div>
    </div>
  );
}
