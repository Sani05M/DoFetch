"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  ExternalLink,
  CheckCircle2,
  XCircle,
  Clock,
  Zap
} from "lucide-react";

interface GlobalCert {
  id: string;
  studentName: string;
  rollNo: string;
  section: string;
  certName: string;
  issuer: string;
  status: "verified" | "pending" | "rejected";
  date: string;
}

const MOCK_GLOBAL_CERTS: GlobalCert[] = [
  { id: "C1", studentName: "Abhishek Singh", rollNo: "22CS001", section: "A", certName: "Google Cloud Prof.", issuer: "Google", status: "verified", date: "2024-09-15" },
  { id: "C2", studentName: "Priya Sharma", rollNo: "22CS042", section: "B", certName: "AWS Developer", issuer: "AWS", status: "verified", date: "2024-09-10" },
  { id: "C3", studentName: "Rahul Verma", rollNo: "22CS055", section: "A", certName: "React Advanced", issuer: "Coursera", status: "pending", date: "2024-09-12" },
  { id: "C4", studentName: "Ananya Das", rollNo: "22CS024", section: "C", certName: "UI/UX Design", issuer: "Udemy", status: "verified", date: "2024-09-08" },
  { id: "C5", studentName: "Vikram Raj", rollNo: "22CS031", section: "B", certName: "Python for DS", issuer: "IBM", status: "rejected", date: "2024-09-05" },
];

export default function FacultyCertificatesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = MOCK_GLOBAL_CERTS.filter(c => 
    (c.studentName.toLowerCase().includes(search.toLowerCase()) || c.certName.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === "All" || c.status === statusFilter.toLowerCase())
  );

  return (
    <DashboardLayout allowedRole="faculty">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
            AUDIT<br/>
            <span className="text-red-500">QUEUE</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search students..." 
                className="input-field pl-12 w-full md:w-96"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white border-4 border-zinc-200 p-1.5 rounded-xl">
          {["All", "Verified", "Pending", "Rejected"].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-lg transition-all font-black uppercase tracking-widest text-xs ${
                statusFilter === s 
                  ? "bg-bg-dark text-white" 
                  : "text-zinc-500 hover:bg-zinc-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="border-3 border-bg-dark rounded-2xl p-0 overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-4 border-zinc-200 bg-zinc-50">
              <th className="px-6 py-4 text-sm font-black uppercase tracking-widest text-zinc-500">Student</th>
              <th className="px-6 py-4 text-sm font-black uppercase tracking-widest text-zinc-500">Certificate</th>
              <th className="px-6 py-4 text-sm font-black uppercase tracking-widest text-zinc-500">Status</th>
              <th className="px-6 py-4 text-sm font-black uppercase tracking-widest text-zinc-500 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-zinc-100">
            {filtered.map((cert) => {
              const isVerified = cert.status === "verified";
              const isPending = cert.status === "pending";
              return (
                <tr key={cert.id} className="group hover:bg-zinc-50 transition-colors cursor-pointer">
                  <td className="px-6 py-5">
                    <p className="font-black text-lg text-bg-dark uppercase tracking-tight group-hover:underline decoration-3 underline-offset-4">{cert.studentName}</p>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{cert.rollNo} • Sec {cert.section}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-black text-lg text-bg-dark uppercase tracking-tight group-hover:underline decoration-3 underline-offset-4">{cert.certName}</p>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{cert.issuer}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full border-2 text-xs font-black uppercase tracking-widest ${
                      isVerified ? "bg-green-100 text-green-700 border-green-700" :
                      isPending ? "bg-yellow-100 text-yellow-700 border-yellow-500" :
                      "bg-red-100 text-red-700 border-red-700"
                    }`}>
                      {cert.status}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Link href={`/faculty/certificates/${cert.id}`} className="inline-flex p-3 border-2 border-zinc-200 rounded-xl hover:bg-bg-dark hover:border-bg-dark hover:text-white transition-all text-bg-dark bg-white">
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
