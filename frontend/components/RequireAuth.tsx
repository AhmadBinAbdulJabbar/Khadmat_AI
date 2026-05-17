"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // 1. Check local storage
      const stored = localStorage.getItem("khadmat_user");
      if (stored) {
        setAuthenticated(true);
        setLoading(false);
        return;
      }

      // 2. Check Supabase session
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setAuthenticated(true);
        } else {
          const next = encodeURIComponent(window.location.pathname + window.location.search);
          router.replace(`/auth?next=${next}`);
        }
      } catch {
        const next = encodeURIComponent(window.location.pathname + window.location.search);
        router.replace(`/auth?next=${next}`);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <Loader2 className="animate-spin text-[var(--accent)]" size={32} />
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}
