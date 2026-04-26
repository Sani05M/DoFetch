import React from "react";
import Link from "next/link";
import { 
  Zap, 
  ShieldCheck, 
  Star, 
  LayoutGrid, 
  CheckCircle2,
  Lock,
  Search,
  Globe,
  Plus,
  Play,
  Apple,
  MessageCircle,
  FileText,
  Bookmark,
  Video,
  Image as ImageIcon,
  Heart,
  ArrowRight
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary font-sans selection:bg-accent selection:text-bg-dark">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded flex items-center justify-center transform rotate-45">
              <Zap className="w-3 h-3 text-bg-dark -rotate-45 fill-current" />
            </div>
            <span className="font-black text-xl tracking-tighter text-text-primary">ADAMAS UNIVERSITY</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold">
            <Link href="#" className="hover:text-accent transition-colors">Academics</Link>
            <Link href="#" className="hover:text-accent transition-colors">Registry</Link>
            <Link href="#" className="hover:text-accent transition-colors">Verification</Link>
            <Link href="#" className="hover:text-accent transition-colors">Support</Link>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <ThemeToggle />
            <Link href="/login/faculty" className="text-sm font-bold hover:text-accent transition-colors hidden md:block">
              Faculty Login
            </Link>
            <Link href="/login/student" className="bg-accent text-[#09090b] px-5 py-2 rounded-full text-sm font-black hover:scale-105 transition-transform shadow-[0_4px_14px_0_rgba(253,224,71,0.5)]">
              Access Vault
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {/* Hero Section */}
          <section className="pt-40 pb-20 px-6 text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-bg-surface rounded-full text-xs font-bold mb-8 border border-border">
              <ShieldCheck className="w-3 h-3 text-accent fill-current" />
              <span>Official Digital Credential Registry</span>
            </div>
            
            <h1 className="text-6xl md:text-[5.5rem] font-black leading-[0.85] tracking-tighter uppercase mb-6 mx-auto">
              YOUR SECURE ACADEMIC<br />CREDENTIAL VAULT
            </h1>
            
            <p className="text-sm md:text-base text-text-secondary font-medium mb-8 max-w-2xl mx-auto">
              Access, verify, and share your Adamas University transcripts and certificates instantly with our state-of-the-art cryptographic registry.
            </p>

            <Link href="/login/student" className="bg-accent text-[#09090b] px-8 py-4 rounded-full text-lg font-black inline-flex items-center gap-3 hover:scale-105 transition-transform shadow-[0_8px_30px_rgba(253,224,71,0.5)] mb-8">
              Enter Student Portal
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold mt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-bg-surface rounded-full border border-border">
                <Lock className="w-4 h-4 text-green-500" /> End-to-End Encrypted
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-bg-surface rounded-full border border-border">
                <ShieldCheck className="w-4 h-4 text-blue-500" /> Universally Verified
              </div>
            </div>
          </section>

          {/* Floating Dashboard Mockup */}
          <section className="max-w-5xl mx-auto px-6 mb-24 perspective-[2000px]">
            <div className="w-full aspect-[16/9] bg-bg-surface rounded-2xl border-4 border-border shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden transform rotate-x-[5deg] hover:rotate-x-0 transition-transform duration-700 ease-out">
              <div className="h-10 bg-bg-base border-b border-border flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-4 flex-1 bg-bg-surface rounded-md h-6 border border-border" />
              </div>
              <div className="p-8 bg-bg-base h-full flex items-center justify-center">
                <div className="w-full max-w-2xl h-full bg-bg-surface rounded-xl shadow-sm border border-border p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-8 w-48 bg-bg-base rounded" />
                    <div className="h-8 w-8 bg-accent rounded-full" />
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div className="col-span-2 bg-bg-base rounded-lg p-4 border border-border">
                      <div className="h-4 w-1/4 bg-green-200 rounded mb-4" />
                      <div className="h-6 w-3/4 bg-bg-surface border border-border rounded mb-2" />
                      <div className="h-4 w-1/2 bg-bg-surface border border-border rounded" />
                    </div>
                    <div className="bg-accent/20 rounded-lg border border-accent/30 p-4" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trusted By */}
          <section className="text-center mb-32 opacity-50">
            <p className="text-xs font-bold uppercase tracking-widest mb-6">Certificates recognized globally by</p>
            <div className="flex flex-wrap items-center justify-center gap-12 grayscale">
              <span className="font-black text-xl">Google</span>
              <span className="font-black text-xl">Microsoft</span>
              <span className="font-black text-xl">Deloitte</span>
              <span className="font-black text-xl">Amazon</span>
              <span className="font-black text-xl">TCS</span>
            </div>
          </section>

          <h2 className="text-center text-4xl font-black uppercase tracking-tighter mb-16">
            WITH ADAMAS REGISTRY, YOU CAN
          </h2>

          {/* Dark Feature Section */}
          <section className="max-w-6xl mx-auto px-6 mb-16">
            <div className="bg-bg-dark text-text-on-dark rounded-[2rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
              <div className="flex-1 z-10">
                <h3 className="text-5xl md:text-6xl font-black text-accent uppercase leading-[0.9] tracking-tighter mb-6">
                  PROVE YOUR<br />ACHIEVEMENTS
                </h3>
                <p className="opacity-80 font-medium max-w-sm">
                  Instantly generate cryptographically secure verification links for employers, ensuring zero friction in your hiring process.
                </p>
              </div>
              <div className="flex-1 w-full bg-bg-surface text-text-primary rounded-2xl border-4 border-accent p-6 z-10 shadow-[0_0_50px_rgba(253,224,71,0.2)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-[#09090b]" />
                  </div>
                  <span className="font-black text-lg">Verification Portal</span>
                </div>
                <div className="space-y-3">
                  <div className="h-10 bg-bg-base border border-border rounded-lg w-full flex items-center px-4">
                    <span className="w-20 h-3 bg-text-secondary/50 rounded-full" />
                  </div>
                  <div className="h-20 bg-bg-base border border-border rounded-lg w-full p-4 flex flex-col justify-center gap-2">
                    <span className="w-32 h-4 bg-text-secondary/50 rounded-full" />
                    <span className="w-48 h-3 bg-text-secondary/30 rounded-full" />
                  </div>
                  <div className="h-12 bg-green-500/10 border border-green-500/20 rounded-lg w-full flex items-center px-4 text-green-600 dark:text-green-400 text-sm font-bold">
                    <ShieldCheck className="w-4 h-4 mr-2" /> Official Transcript Verified
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Grid Features */}
          <section className="max-w-6xl mx-auto px-6 mb-32 text-center">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-6 transform rotate-45 border-2 border-border">
              <LayoutGrid className="w-6 h-6 -rotate-45 text-[#09090b]" />
            </div>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">
              TAKE A DEEPER DIVE INTO ADAMAS
            </h3>
            <p className="text-text-secondary font-medium mb-12">Discover all the registry technology you need in one place.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <ShieldCheck />, label: "Instant Verification" },
                { icon: <FileText />, label: "Digital Transcripts" },
                { icon: <Bookmark />, label: "Degree Portfolios" },
                { icon: <Lock />, label: "Privacy First" },
                { icon: <ImageIcon />, label: "ID Integration" },
                { icon: <CheckCircle2 />, label: "Tamper-Proof" },
                { icon: <Globe />, label: "Global Access" },
                { icon: <Zap />, label: "Fast Sync" },
              ].map((item, i) => (
                <div key={i} className="bg-bg-surface border-2 border-border rounded-2xl p-6 flex items-center justify-between group hover:bg-accent hover:border-accent transition-colors cursor-pointer text-text-primary hover:text-[#09090b]">
                  <span className="font-black text-sm uppercase tracking-tight">{item.label}</span>
                  <div className="w-10 h-10 bg-bg-base border border-border rounded-lg flex items-center justify-center shadow-sm text-text-secondary group-hover:text-[#09090b] group-hover:bg-white group-hover:border-transparent">
                    {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5" })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Privacy Section */}
          <section className="max-w-6xl mx-auto px-6 mb-16">
            <div className="bg-bg-dark rounded-[2rem] p-12 text-center text-text-on-dark">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-6 text-bg-dark">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-accent mb-4">
                YOUR DATA IS HIGHLY SECURED
              </h3>
              <p className="opacity-80 font-medium mb-12">Adamas University employs banking-grade encryption for all academic records.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {[
                  { icon: <Lock />, title: "SECURE STORAGE", desc: "All your credentials are encrypted at rest and in transit." },
                  { icon: <ShieldCheck />, title: "FACULTY AUTHORIZED", desc: "Only authorized Adamas faculty can issue or amend academic records." },
                  { icon: <FileText />, title: "YOUR CONTROL", desc: "You decide who sees your records via time-limited sharing links." },
                ].map((item, i) => (
                  <div key={i} className="bg-text-on-dark/5 rounded-2xl p-8 border border-text-on-dark/10 hover:border-accent transition-colors">
                    <div className="w-12 h-12 bg-text-on-dark/10 rounded-full flex items-center justify-center text-accent mb-6">
                      {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                    </div>
                    <h4 className="font-black text-lg uppercase tracking-tight mb-2">{item.title}</h4>
                    <p className="text-sm opacity-60 font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Wall of Love */}
          <section className="max-w-6xl mx-auto px-6 mb-32 text-center">
            <div className="w-12 h-12 text-accent mx-auto mb-4">
              <Heart className="w-12 h-12 fill-current" />
            </div>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">
              STUDENT EXPERIENCES
            </h3>
            <p className="text-text-secondary font-medium mb-12">See what Adamas scholars say about the digital vault.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { name: "INCREDIBLY FAST", desc: "Sharing my verified transcript with recruiters took literally 10 seconds. No more waiting for paper copies!" },
                { name: "EASY TO USE", desc: "The vault interface is beautiful. I can see all my semester results and certificates in one place." },
                { name: "RECRUITERS LOVE IT", desc: "When I shared my secure link during an interview, they were blown away by the instant verification." },
                { name: "NO MORE PAPERWORK", desc: "Applying for my Master's abroad was seamless because my degree was instantly verifiable online." },
                { name: "BEAUTIFUL DESIGN", desc: "I didn't expect a university portal to look this good. It feels like a premium app." },
                { name: "SECURE & PRIVATE", desc: "I feel safe knowing my academic data is heavily encrypted and only shared when I choose." },
              ].map((item, i) => (
                <div key={i} className="bg-accent rounded-2xl p-8 flex flex-col justify-between text-[#09090b]">
                  <div>
                    <h4 className="font-black text-xl uppercase tracking-tighter mb-4">{item.name}</h4>
                    <p className="text-sm font-medium mb-6">"{item.desc}"</p>
                  </div>
                  <div className="flex items-center gap-1 text-[#09090b]">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="max-w-3xl mx-auto px-6 mb-32 text-center">
            <div className="w-12 h-12 border-4 border-text-primary rounded-full mx-auto mb-6" />
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">
              FREQUENTLY ASKED QUESTIONS
            </h3>
            
            <div className="space-y-4 text-left">
              {[
                "HOW DO I ACCESS MY DIGITAL VAULT?",
                "ARE DIGITAL CERTIFICATES VALID FOR JOBS?",
                "WHAT HAPPENS IF I LOSE MY LOGIN?",
                "CAN ALUMNI ACCESS THE REGISTRY?"
              ].map((q, i) => (
                <div key={i} className="bg-bg-surface hover:bg-bg-base transition-colors rounded-xl p-6 flex items-center justify-between cursor-pointer border border-border">
                  <span className="font-black text-sm uppercase tracking-tight">{q}</span>
                  <Plus className="w-5 h-5" />
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-bg-dark text-text-on-dark rounded-t-[3rem] pt-20 pb-10 px-6 mt-20">
            <div className="max-w-6xl mx-auto text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black text-accent uppercase tracking-tighter mb-8">
                OWN YOUR ACADEMIC<br />FUTURE
              </h2>
              <Link href="/login/student" className="bg-accent text-[#09090b] px-8 py-4 rounded-full text-lg font-black hover:scale-105 transition-transform inline-block">
                Access Vault
              </Link>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-accent rounded flex items-center justify-center transform rotate-45">
                    <Zap className="w-3 h-3 text-[#09090b] -rotate-45 fill-current" />
                  </div>
                  <span className="font-black text-xl tracking-tighter">ADAMAS</span>
                </div>
                <p className="text-text-secondary mb-4 text-xs font-bold uppercase tracking-widest">
                  The intelligent credential manager for Adamas Scholars.
                </p>
              </div>
              <div>
                <h4 className="font-black uppercase tracking-widest mb-4">Portals</h4>
                <div className="flex flex-col gap-3 text-text-secondary font-medium">
                  <Link href="/login/student" className="hover:text-accent">Student Vault</Link>
                  <Link href="/login/faculty" className="hover:text-accent">Faculty Login</Link>
                  <Link href="#" className="hover:text-accent">Alumni Access</Link>
                </div>
              </div>
              <div>
                <h4 className="font-black uppercase tracking-widest mb-4">University</h4>
                <div className="flex flex-col gap-3 text-text-secondary font-medium">
                  <Link href="#" className="hover:text-accent">Admissions</Link>
                  <Link href="#" className="hover:text-accent">Departments</Link>
                  <Link href="#" className="hover:text-accent">Contact</Link>
                </div>
              </div>
              <div>
                <h4 className="font-black uppercase tracking-widest mb-4">Legal</h4>
                <div className="flex flex-col gap-3 text-text-secondary font-medium">
                  <Link href="#" className="hover:text-accent">Privacy Policy</Link>
                  <Link href="#" className="hover:text-accent">Data Guidelines</Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
    </div>
  );
}
