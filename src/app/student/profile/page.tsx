"use client";

import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { 
  User, 
  Mail, 
  Hash, 
  CreditCard, 
  Layout, 
  LogOut,
  Camera
} from "lucide-react";

export default function StudentProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout allowedRole="student">
      <div className="max-w-3xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-display italic text-text-primary">Your Profile</h1>
          <p className="text-text-secondary mt-1">Manage your identity and preferences.</p>
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
                <ProfileItem icon={<Hash className="w-4 h-4" />} label="Roll Number" value={user.rollNo || "N/A"} />
                <ProfileItem icon={<CreditCard className="w-4 h-4" />} label="Registration No" value={user.regNo || "N/A"} />
              </div>
              <div className="space-y-6">
                <ProfileItem icon={<Layout className="w-4 h-4" />} label="Section" value={`Section ${user.section || "N/A"}`} />
                <ProfileItem icon={<Mail className="w-4 h-4" />} label="Primary Email" value={user.email} />
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-bg-surface border border-border rounded-2xl">
            <h3 className="text-sm font-medium text-text-primary mb-4">Notification Preferences</h3>
            <p className="text-xs text-text-muted mb-6">Receive alerts when your certificates are validated.</p>
            <div className="space-y-4">
              <Toggle label="Email notifications" checked />
              <Toggle label="Validation alerts" checked />
            </div>
          </div>
          <div className="p-6 bg-bg-surface border border-border rounded-2xl">
            <h3 className="text-sm font-medium text-text-primary mb-4">Privacy</h3>
            <p className="text-xs text-text-muted mb-6">Control who can view your validated certificates.</p>
            <div className="space-y-4">
              <Toggle label="Public profile" />
              <Toggle label="Share with recruiters" checked />
            </div>
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
