import { Metadata } from 'next';
import { createClient } from "@supabase/supabase-js";
import { Zap, ShieldCheck, Building2, Calendar, User, CheckCircle2, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { PublicCertificateViewer } from "@/components/PublicCertificateViewer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  const { data: cert } = await supabase
    .from("certificates")
    .select("title, profiles!inner(full_name)")
    .eq("id", id)
    .single();

  const profile = cert ? (Array.isArray(cert.profiles) ? cert.profiles[0] : cert.profiles) : null;
  const title = cert ? `${cert.title} - Verified Artifact` : 'Credential Registry';
  const description = cert ? `Official institutional record for ${profile?.full_name}. Verified by Adamas University Audit Mesh.` : 'Academic credential verification system.';
  
  // Robust URL detection for OG images
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  const ogImage = `${baseUrl}/api/og/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function VerifyPage({ params }: Props) {
  const { id } = await params;

  const { data: cert } = await supabase
    .from("certificates")
    .select("*, profiles!inner(*)")
    .eq("id", id)
    .single();

  if (!cert) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-24 h-24 text-red-500 mb-8" />
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Registry Error</h1>
        <p className="text-zinc-500 max-w-md mb-8">The requested artifact ID could not be found in the institutional mesh. It may have been pruned or the link is invalid.</p>
        <Link href="/" className="btn-primary px-8 py-4">Return to Portal</Link>
      </div>
    );
  }

  const isApproved = cert.status === 'approved' || cert.status === 'verified';

  return (
    <div className="min-h-screen bg-bg-base py-12 px-6 flex flex-col items-center">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] overflow-hidden select-none z-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap font-mono text-[8px] leading-none">
            {Array.from({ length: 150 }).map(() => Math.random() > 0.5 ? "1" : "0").join("")}
          </div>
        ))}
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Zap className="w-4 h-4 fill-current" />
              Official Registry Artifact
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-4">
              {isApproved ? 'VERIFIED' : 'PENDING'}<br/>
              <span className={isApproved ? 'text-accent' : 'text-zinc-400'}>CREDENTIAL</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">ARTIFACT ID</span>
              <span className="block font-mono text-xs font-bold text-zinc-600">#{id}</span>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white border-4 border-black p-8 md:p-16 rounded-[3rem] shadow-[24px_24px_0_#000] relative overflow-hidden">
          {/* Status Badge */}
          <div className="absolute top-8 right-8">
            <div className={`px-6 py-3 rounded-2xl border-4 border-black text-sm font-black uppercase tracking-widest shadow-[8px_8px_0_#000] ${isApproved ? 'bg-accent text-bg-dark' : 'bg-zinc-100 text-zinc-400'}`}>
              {isApproved ? 'AUTHENTICATED' : 'IN REVIEW'}
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-4">
              <span className="block text-[12px] font-black uppercase tracking-[0.4em] text-zinc-400">CREDENTIAL TITLE</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-black">
                {cert.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t-4 border-zinc-50">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-zinc-50 border-2 border-zinc-100 rounded-2xl flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">CREDENTIAL HOLDER</span>
                    <span className="text-xl font-black uppercase text-black">
                      {(cert.profiles as any)?.full_name || 'Verified Scholar'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-zinc-50 border-2 border-zinc-100 rounded-2xl flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">ISSUER</span>
                    <span className="text-xl font-black uppercase text-black">{cert.issuer || 'Institutional Authority'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-zinc-50 border-2 border-zinc-100 rounded-2xl flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">ISSUE DATE</span>
                    <span className="text-xl font-black uppercase text-black">{cert.issue_date || cert.created_at.split('T')[0]}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-zinc-50 border-2 border-zinc-100 rounded-2xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">VERIFICATION STATUS</span>
                    <div className="flex items-center gap-2">
                       <span className={`text-xl font-black uppercase ${isApproved ? 'text-green-500' : 'text-zinc-400'}`}>
                        {isApproved ? 'VALIDATED' : 'NOT VERIFIED'}
                      </span>
                      {isApproved && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isApproved && cert.extracted_text?.ai_reasoning && (
              <div className="p-8 bg-accent/5 border-4 border-accent/20 rounded-[2rem] relative">
                <div className="absolute -top-4 -left-4 bg-accent text-bg-dark px-4 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-black">
                  Registry Audit Log
                </div>
                <p className="text-zinc-600 font-medium italic leading-relaxed">
                  "{cert.extracted_text.ai_reasoning}"
                </p>
              </div>
            )}

            {/* SOPHISTICATED LIVE PREVIEW */}
            <div className="pt-12 border-t-4 border-zinc-50">
              <PublicCertificateViewer certificate={cert} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-zinc-400">Security Guarantee</p>
            <p className="text-xs text-zinc-500 max-w-sm">This artifact is cryptographically linked to the Adamas University Mesh and cannot be altered or forged.</p>
          </div>
          <Link href="/" className="btn-secondary px-8 py-4 text-xs">Access Official Portal</Link>
        </div>
      </div>
    </div>
  );
}
