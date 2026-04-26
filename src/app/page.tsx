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

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-bg-dark font-sans selection:bg-yellow-300 selection:text-bg-dark">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-300 rounded flex items-center justify-center transform rotate-45">
              <Zap className="w-3 h-3 text-bg-dark -rotate-45 fill-current" />
            </div>
            <span className="font-black text-xl tracking-tighter">ADAMAS UNIVERSITY</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold">
            <Link href="#" className="hover:text-yellow-500 transition-colors">Academics</Link>
            <Link href="#" className="hover:text-yellow-500 transition-colors">Registry</Link>
            <Link href="#" className="hover:text-yellow-500 transition-colors">Verification</Link>
            <Link href="#" className="hover:text-yellow-500 transition-colors">Support</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login/faculty" className="text-sm font-bold hover:text-yellow-500 transition-colors hidden md:block">
              Faculty Login
            </Link>
            <Link href="/login/student" className="bg-yellow-300 text-bg-dark px-5 py-2 rounded-full text-sm font-black hover:scale-105 transition-transform shadow-[0_4px_14px_0_rgba(253,224,71,0.5)]">
              Access Vault
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-xs font-bold mb-8">
          <ShieldCheck className="w-3 h-3 text-yellow-500 fill-current" />
          <span>Official Digital Credential Registry</span>
        </div>
        
        <h1 className="text-6xl md:text-[5.5rem] font-black leading-[0.85] tracking-tighter uppercase mb-6 mx-auto">
          YOUR SECURE ACADEMIC<br />CREDENTIAL VAULT
        </h1>
        
        <p className="text-sm md:text-base text-zinc-500 font-medium mb-8 max-w-2xl mx-auto">
          Access, verify, and share your Adamas University transcripts and certificates instantly with our state-of-the-art cryptographic registry.
        </p>

        <Link href="/login/student" className="bg-yellow-300 text-bg-dark px-8 py-4 rounded-full text-lg font-black inline-flex items-center gap-3 hover:scale-105 transition-transform shadow-[0_8px_30px_rgba(253,224,71,0.5)] mb-8">
          Enter Student Portal
          <ArrowRight className="w-5 h-5" />
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold mt-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-200">
            <Lock className="w-4 h-4 text-green-600" /> End-to-End Encrypted
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-full border border-zinc-200">
            <ShieldCheck className="w-4 h-4 text-blue-600" /> Universally Verified
          </div>
        </div>
      </section>

      {/* Floating Dashboard Mockup */}
      <section className="max-w-5xl mx-auto px-6 mb-24 perspective-[2000px]">
        <div className="w-full aspect-[16/9] bg-zinc-100 rounded-2xl border-4 border-zinc-200 shadow-2xl overflow-hidden transform rotate-x-[5deg] hover:rotate-x-0 transition-transform duration-700 ease-out">
          <div className="h-10 bg-zinc-200 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="ml-4 flex-1 bg-white rounded-md h-6" />
          </div>
          <div className="p-8 bg-zinc-50 h-full flex items-center justify-center">
            <div className="w-full max-w-2xl h-full bg-white rounded-xl shadow-sm border border-zinc-200 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="h-8 w-48 bg-zinc-100 rounded" />
                <div className="h-8 w-8 bg-yellow-300 rounded-full" />
              </div>
              <div className="flex-1 grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-zinc-50 rounded-lg p-4 border border-zinc-100">
                  <div className="h-4 w-1/4 bg-green-200 rounded mb-4" />
                  <div className="h-6 w-3/4 bg-zinc-200 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-zinc-200 rounded" />
                </div>
                <div className="bg-yellow-300/20 rounded-lg border border-yellow-300/30 p-4" />
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
        <div className="bg-bg-dark text-white rounded-[2rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
          <div className="flex-1 z-10">
            <h3 className="text-5xl md:text-6xl font-black text-yellow-300 uppercase leading-[0.9] tracking-tighter mb-6">
              PROVE YOUR<br />ACHIEVEMENTS
            </h3>
            <p className="text-zinc-400 font-medium max-w-sm">
              Instantly generate cryptographically secure verification links for employers, ensuring zero friction in your hiring process.
            </p>
          </div>
          <div className="flex-1 w-full bg-white text-bg-dark rounded-2xl border-4 border-yellow-300 p-6 z-10 shadow-[0_0_50px_rgba(253,224,71,0.2)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="font-black text-lg">Verification Portal</span>
            </div>
            <div className="space-y-3">
              <div className="h-10 bg-zinc-100 rounded-lg w-full flex items-center px-4">
                <span className="w-20 h-3 bg-zinc-300 rounded-full" />
              </div>
              <div className="h-20 bg-zinc-100 rounded-lg w-full p-4 flex flex-col justify-center gap-2">
                <span className="w-32 h-4 bg-zinc-300 rounded-full" />
                <span className="w-48 h-3 bg-zinc-200 rounded-full" />
              </div>
              <div className="h-12 bg-green-50 border border-green-200 rounded-lg w-full flex items-center px-4 text-green-700 text-sm font-bold">
                <ShieldCheck className="w-4 h-4 mr-2" /> Official Transcript Verified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="max-w-6xl mx-auto px-6 mb-32 text-center">
        <div className="w-12 h-12 bg-yellow-300 rounded-xl flex items-center justify-center mx-auto mb-6 transform rotate-45">
          <LayoutGrid className="w-6 h-6 -rotate-45" />
        </div>
        <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">
          TAKE A DEEPER DIVE INTO ADAMAS
        </h3>
        <p className="text-zinc-500 font-medium mb-12">Discover all the registry technology you need in one place.</p>
        
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
            <div key={i} className="bg-zinc-100 rounded-2xl p-6 flex items-center justify-between group hover:bg-yellow-300 transition-colors cursor-pointer">
              <span className="font-black text-sm uppercase tracking-tight">{item.label}</span>
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:text-bg-dark">
                {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5" })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Section */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="bg-bg-dark rounded-[2rem] p-12 text-center text-white">
          <div className="w-12 h-12 bg-yellow-300 rounded-xl flex items-center justify-center mx-auto mb-6 text-bg-dark">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-yellow-300 mb-4">
            YOUR DATA IS HIGHLY SECURED
          </h3>
          <p className="text-zinc-400 font-medium mb-12">Adamas University employs banking-grade encryption for all academic records.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { icon: <Lock />, title: "SECURE STORAGE", desc: "All your credentials are encrypted at rest and in transit." },
              { icon: <ShieldCheck />, title: "FACULTY AUTHORIZED", desc: "Only authorized Adamas faculty can issue or amend academic records." },
              { icon: <FileText />, title: "YOUR CONTROL", desc: "You decide who sees your records via time-limited sharing links." },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-yellow-300 transition-colors">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-yellow-300 mb-6">
                  {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                </div>
                <h4 className="font-black text-lg uppercase tracking-tight mb-2">{item.title}</h4>
                <p className="text-sm text-zinc-400 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wall of Love */}
      <section className="max-w-6xl mx-auto px-6 mb-32 text-center">
        <div className="w-12 h-12 text-yellow-400 mx-auto mb-4">
          <Heart className="w-12 h-12 fill-current" />
        </div>
        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">
          STUDENT EXPERIENCES
        </h3>
        <p className="text-zinc-500 font-medium mb-12">See what Adamas scholars say about the digital vault.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            { name: "INCREDIBLY FAST", desc: "Sharing my verified transcript with recruiters took literally 10 seconds. No more waiting for paper copies!" },
            { name: "EASY TO USE", desc: "The vault interface is beautiful. I can see all my semester results and certificates in one place." },
            { name: "RECRUITERS LOVE IT", desc: "When I shared my secure link during an interview, they were blown away by the instant verification." },
            { name: "NO MORE PAPERWORK", desc: "Applying for my Master's abroad was seamless because my degree was instantly verifiable online." },
            { name: "BEAUTIFUL DESIGN", desc: "I didn't expect a university portal to look this good. It feels like a premium app." },
            { name: "SECURE & PRIVATE", desc: "I feel safe knowing my academic data is heavily encrypted and only shared when I choose." },
          ].map((item, i) => (
            <div key={i} className="bg-yellow-300 rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <h4 className="font-black text-xl uppercase tracking-tighter mb-4">{item.name}</h4>
                <p className="text-sm font-medium mb-6">"{item.desc}"</p>
              </div>
              <div className="flex items-center gap-1 text-bg-dark">
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
        <div className="w-12 h-12 border-4 border-bg-dark rounded-full mx-auto mb-6" />
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
            <div key={i} className="bg-zinc-50 hover:bg-zinc-100 transition-colors rounded-xl p-6 flex items-center justify-between cursor-pointer border border-zinc-200">
              <span className="font-black text-sm uppercase tracking-tight">{q}</span>
              <Plus className="w-5 h-5" />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-dark text-white rounded-t-[3rem] pt-20 pb-10 px-6 mt-20">
        <div className="max-w-6xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-yellow-300 uppercase tracking-tighter mb-8">
            OWN YOUR ACADEMIC<br />FUTURE
          </h2>
          <Link href="/login/student" className="bg-yellow-300 text-bg-dark px-8 py-4 rounded-full text-lg font-black hover:scale-105 transition-transform inline-block">
            Access Vault
          </Link>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-yellow-300 rounded flex items-center justify-center transform rotate-45">
                <Zap className="w-3 h-3 text-bg-dark -rotate-45 fill-current" />
              </div>
              <span className="font-black text-xl tracking-tighter">ADAMAS</span>
            </div>
            <p className="text-zinc-500 mb-4 text-xs font-bold uppercase tracking-widest">
              The intelligent credential manager for Adamas Scholars.
            </p>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest mb-4">Portals</h4>
            <div className="flex flex-col gap-3 text-zinc-400 font-medium">
              <Link href="/login/student" className="hover:text-yellow-300">Student Vault</Link>
              <Link href="/login/faculty" className="hover:text-yellow-300">Faculty Login</Link>
              <Link href="#" className="hover:text-yellow-300">Alumni Access</Link>
            </div>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest mb-4">University</h4>
            <div className="flex flex-col gap-3 text-zinc-400 font-medium">
              <Link href="#" className="hover:text-yellow-300">Admissions</Link>
              <Link href="#" className="hover:text-yellow-300">Departments</Link>
              <Link href="#" className="hover:text-yellow-300">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest mb-4">Legal</h4>
            <div className="flex flex-col gap-3 text-zinc-400 font-medium">
              <Link href="#" className="hover:text-yellow-300">Privacy Policy</Link>
              <Link href="#" className="hover:text-yellow-300">Data Guidelines</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
