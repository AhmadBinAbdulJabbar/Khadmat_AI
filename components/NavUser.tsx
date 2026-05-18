"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase";

interface UserInfo {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  initials: string;
}

export default function NavUser() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const stored = localStorage.getItem("khadmat_user");
      if (stored) {
        try {
          const u = JSON.parse(stored);
          const name = u.name || u.email || "User";
          setUser({
            name,
            email: u.email ?? "",
            role: u.role ?? "customer",
            initials: name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
          });
          return;
        } catch {}
      }

      // Supabase session fallback (Google OAuth)
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const u = session.user;
        const name = u.user_metadata?.full_name || u.email || "User";
        setUser({
          name,
          email: u.email ?? "",
          role: u.user_metadata?.role ?? "customer",
          avatar: u.user_metadata?.avatar_url,
          initials: name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
        });
      }
    };
    load();
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("khadmat_token");
    localStorage.removeItem("khadmat_user");
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  if (!user) {
    return (
      <Link
        href="/auth"
        className="inline-flex items-center gap-2 bg-[var(--accent)] text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-[var(--accent-dark)] transition-all active:scale-[0.97] shadow-sm hover:shadow-md no-underline"
      >
        Sign in
      </Link>
    );
  }

  const dashboardHref = user.role === "worker" ? "/provider/dashboard" : "/customer/dashboard";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 cursor-pointer"
        aria-label="User menu"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover border border-[var(--border-secondary)]"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-xs font-semibold">
            {user.initials}
          </div>
        )}
        <ChevronDown
          size={14}
          className={`text-[var(--text-tertiary)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-xl shadow-lg z-50 overflow-hidden animate-fade-in">
          <div className="px-4 py-3 border-b border-[var(--border-tertiary)]">
            <div className="text-xs font-medium text-[var(--text-primary)] truncate">{user.name}</div>
            <div className="text-[11px] text-[var(--text-tertiary)] truncate">{user.email}</div>
            <div className="text-[10px] mt-0.5 font-medium text-[var(--accent)]">
              {user.role === "worker" ? "Service Provider" : "Customer"}
            </div>
          </div>
          <div className="py-1">
            <Link
              href={dashboardHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline"
            >
              <LayoutDashboard size={15} />
              My Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer border-none bg-transparent"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
