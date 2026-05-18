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
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-all cursor-pointer active:scale-[0.98] group"
        aria-label="User menu"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover border border-[var(--border-secondary)] group-hover:border-[var(--accent)]"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center text-white text-xs font-bold shadow-md group-hover:shadow-lg transition-shadow">
            {user.initials}
          </div>
        )}
        <div className="hidden sm:flex flex-col items-start max-w-[120px]">
          <div className="text-xs font-semibold text-[var(--text-primary)] leading-tight truncate">
            {user.name.split(" ")[0]}
          </div>
          <div className="text-[10px] text-[var(--text-tertiary)] leading-tight">
            {user.role === "worker" ? "Provider" : "Customer"}
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`text-[var(--text-tertiary)] transition-transform duration-200 hidden sm:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-60 bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
          <div className="px-4 py-4 bg-gradient-to-r from-[var(--accent-light)] to-[var(--bg-primary)] border-b border-[var(--border-tertiary)]">
            <div className="flex items-center gap-3 mb-3">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border 2 border-[var(--accent)]"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center text-white text-sm font-bold shadow-md">
                  {user.initials}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[var(--text-primary)] truncate">{user.name}</div>
                <div className="text-xs text-[var(--text-tertiary)] truncate">{user.email}</div>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-primary)] border border-[var(--border-tertiary)]">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-[11px] font-medium text-[var(--text-secondary)]">
                {user.role === "worker" ? "Service Provider" : "Customer"}
              </span>
            </div>
          </div>
          <div className="py-2">
            <Link
              href={dashboardHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent)] transition-colors no-underline font-medium"
            >
              <LayoutDashboard size={16} />
              <span>My Dashboard</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer border-none bg-transparent font-medium"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
