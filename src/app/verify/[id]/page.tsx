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
    <div className="min-h-[100dvh] bg-[#09090b] p-4 md:p-8 flex flex-col items-center justify-center overflow-hidden selection:bg-accent selection:text-bg-dark">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] mix-blend-screen opacity-50" />
      </div>

      <div className="w-full max-w-5xl relative z-10 flex flex-col h-full justify-center">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 text-accent rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-2">
              <Zap className="w-3 h-3 fill-current" />
              Official Registry Artifact
            </div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-[0.85] text-white">
              {isApproved ? 'VERIFIED' : 'PENDING'} <span className={isApproved ? 'text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400' : 'text-zinc-600'}>CREDENTIAL</span>
            </h1>
          </div>
        </div>

        {/* Main Content Component */}
        <PublicCertificateViewer certificate={cert} />

        {/* Footer */}
        <div className="mt-4 mb-2 flex flex-col items-center text-center gap-1">
          <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Security Guarantee</p>
          <p className="text-[10px] text-zinc-600 max-w-sm">This artifact is cryptographically linked to the Adamas University Mesh and cannot be altered or forged.</p>
        </div>
      </div>
    </div>
  );
}
