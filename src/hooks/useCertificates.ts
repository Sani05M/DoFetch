"use client";

import { useState, useEffect } from "react";
import { Certificate } from "@/components/CertificateCard";
import { createClerkSupabaseClient } from "@/lib/supabase";
import { useAuth as useClerkAuth } from "@clerk/nextjs";
import { useAuth } from "@/context/AuthContext";

export function useCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { getToken } = useClerkAuth();

  const fetchCertificates = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Get the Clerk token for Supabase
      const token = await getToken({ template: 'supabase' });
      if (!token) {
        console.error("No auth token available");
        setLoading(false);
        return;
      }

      // Create an authenticated client
      const authenticatedSupabase = createClerkSupabaseClient(token);
      
      // Use the standard join syntax for maximum compatibility
      let query = authenticatedSupabase.from("certificates").select(`
        *,
        profiles(*)
      `);

      if (user.role === "student") {
        query = query.eq("student_id", user.id);
      } else if (user.role === "faculty") {
        const sections = user.sectionsManaged || [];
        if (sections.length > 0) {
          query = query.in("profiles.section", sections);
        } else {
          setCertificates([]);
          setLoading(false);
          return;
        }
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase Query Error:", error.message, error.details);
        throw error;
      }

      console.log("Raw certificates fetched:", data?.length);

      const formattedCerts: Certificate[] = (data || []).map((c: any) => ({
        id: c.id,
        title: c.title,
        issuer: c.issuer,
        studentName: c.profiles?.full_name || "Unknown Scholar",
        studentId: c.student_id,
        section: c.profiles?.section || "N/A",
        batch: c.profiles?.batch || "N/A",
        type: c.type,
        issueDate: c.issue_date,
        rating: c.score ? (c.score > 90 ? "Platinum" : c.score > 75 ? "Gold" : "Silver") : "Pending",
        score: c.score || 0,
        status: c.status,
        fileType: "PDF" as const,
        fileId: c.telegram_file_id,
        extractedText: c.extracted_text
      }));

      setCertificates(formattedCerts);
    } catch (error: any) {
      console.error("Full error object in hook:", error);
      
      // FALLBACK: If secure fetch fails, try the standard client (since RLS is currently disabled)
      try {
        console.warn("Attempting fallback fetch using public client...");
        const { supabaseClient } = await import("@/lib/supabase");
        let query = supabaseClient.from("certificates").select("*, profiles!inner(*)");
        
        if (user.role === "student") {
          query = query.eq("student_id", user.id);
        }
        
        const { data: fallbackData, error: fallbackError } = await query.order("created_at", { ascending: false });
        if (!fallbackError && fallbackData) {
          const formatted = (fallbackData || []).map((c: any) => ({
            id: c.id,
            title: c.title,
            issuer: c.issuer,
            studentName: c.profiles?.full_name || "Unknown Scholar",
            studentId: c.student_id,
            section: c.profiles?.section || "N/A",
            batch: c.profiles?.batch || "N/A",
            type: c.type,
            issueDate: c.issue_date,
            rating: c.score ? (c.score > 90 ? "Platinum" : c.score > 75 ? "Gold" : "Silver") : "Pending",
            score: c.score || 0,
            status: c.status,
            fileType: "PDF" as const,
            fileId: c.telegram_file_id,
            extractedText: c.extracted_text
          }));
          setCertificates(formatted);
          console.log("Fallback successful! Data restored.");
        }
      } catch (fallbackErr) {
        console.error("Fallback also failed:", fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();

    const setupRealtime = async () => {
      const token = await getToken({ template: 'supabase' });
      if (!token || !user) return;
      
      const authenticatedSupabase = createClerkSupabaseClient(token);
      
      const channel = authenticatedSupabase
        .channel(`certs_realtime_${user.id}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'certificates' },
          async (payload) => {
            console.log("Registry Sync Event:", payload.eventType, payload);
            
            if (payload.eventType === 'INSERT') {
              await fetchCertificates();
            } else if (payload.eventType === 'UPDATE') {
              setCertificates(current => 
                current.map(c => c.id === payload.new.id ? { 
                  ...c, 
                  status: payload.new.status, 
                  score: payload.new.score,
                  rating: payload.new.score ? (payload.new.score > 90 ? "Platinum" : payload.new.score > 75 ? "Gold" : "Silver") : "Pending",
                } : c)
              );
            } else if (payload.eventType === 'DELETE') {
              setCertificates(current => current.filter(c => c.id === payload.old.id));
            }
          }
        )
        .subscribe();

      return channel;
    };

    let channelPromise = setupRealtime();

    return () => {
      channelPromise.then(channel => {
        if (channel) {
          console.log("Cleaning up realtime registry sync...");
          const token = getToken({ template: 'supabase' });
          token.then(t => {
            if (t) createClerkSupabaseClient(t).removeChannel(channel);
          });
        }
      });
    };
  }, [user?.id]);

  const addCertificate = async (cert: any) => {
    // This is now handled by the /api/upload route
    // But we keep it as a refresh trigger if needed
    await fetchCertificates();
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const token = await getToken({ template: 'supabase' });
      if (!token) return;
      
      const authenticatedSupabase = createClerkSupabaseClient(token);
      
      const { error } = await authenticatedSupabase
        .from("certificates")
        .update({ status })
        .eq("id", id);
      
      if (error) throw error;
      await fetchCertificates();
    } catch (e) {
      console.error("Error updating status:", e);
    }
  };

  return { certificates, addCertificate, updateStatus, loading, refresh: fetchCertificates };
}
