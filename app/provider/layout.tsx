"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell, LayoutDashboard, Calendar, Clock, Banknote,
  User, Star, Settings, Menu, X, CheckCircle2, Sparkles, LogOut
} from "lucide-react";
import RequireAuth from "@/components/RequireAuth";
import { createClient } from "@/lib/supabase";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type UserInfo = { name: string; email: string; initials: string; professions?: string[]; city?: string };

function AvailabilityToggle({ providerId }: { providerId: string }) {
  const [isAvailable, setIsAvailable] = useState(true);

  const toggle = async () => {
    const newVal = !isAvailable;
    setIsAvailable(newVal);
    try {
      await fetch(`${API}/api/providers/${providerId}/availability`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_available: newVal }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)] cursor-pointer" onClick={toggle}>
      <div className={`w-8 h-[18px] rounded-full relative transition-colors ${isAvailable ? 'bg-[#1D9E75]' : 'bg-[var(--border-tertiary)]'}`}>
        <div className={`absolute top-0.5 w-[14px] h-[14px] bg-white rounded-full transition-transform ${isAvailable ? 'right-0.5' : 'left-0.5'}`} />
      </div>
      <span className={isAvailable ? "text-[#1D9E75] font-medium" : ""}>
        {isAvailable ? "Available" : "Offline"}
      </span>
    </div>
  );
}

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  useEffect(() => {
    const stored = localStorage.getItem("khadmat_user");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        const name = u.name || u.email || "Provider";
        setUser({
          name,
          email: u.email ?? "",
          city: u.city ?? "",
          professions: u.professions ?? [],
          initials: name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
        });
        return;
      } catch {}
    }
    const load = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const u = session.user;
        const name = u.user_metadata?.full_name ||
          `${u.user_metadata?.first_name ?? ""} ${u.user_metadata?.last_name ?? ""}`.trim() ||
          u.email || "Provider";
        setUser({
          name,
          email: u.email ?? "",
          city: u.user_metadata?.city ?? "",
          professions: u.user_metadata?.professions ?? [],
          initials: name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
        });
      }
    };
    load();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("khadmat_token");
    localStorage.removeItem("khadmat_user");
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const navItems = [
    { name: "Dashboard", href: "/provider/dashboard", icon: LayoutDashboard },
    { name: "My jobs", href: "/provider/jobs", icon: Calendar },
    { name: "Schedule", href: "/provider/schedule", icon: Clock },
    { name: "Earnings", href: "/provider/earnings", icon: Banknote },
  ];

  const accountItems = [
    { name: "Profile", href: "/provider/profile", icon: User },
    { name: "Reviews", href: "/provider/reviews", icon: Star },
    { name: "Settings", href: "/provider/settings", icon: Settings },
  ];

  const displayName = user?.name ?? "Loading...";
  const displayInitials = user?.initials ?? "??";
  const profession = user?.professions?.[0] ?? "Service Provider";
  const cityLabel = user?.city ? `${user.city}` : "";

  return (
    <RequireAuth>
      <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
        {/* Top Navbar */}
        <nav className="flex items-center justify-between px-5 py-2.5 border-b border-[var(--border-tertiary)] sticky top-0 z-50 bg-[var(--bg-primary)]">
          <div className="flex items-center gap-2">
            <button className="md:hidden p-1 mr-2" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/" className="flex items-center gap-2 no-underline">
              <div className="w-[26px] h-[26px] bg-[#1D9E75] rounded-[7px] flex items-center justify-center text-white text-xs font-medium">
                K
              </div>
              <span className="text-sm font-medium text-[var(--text-primary)] hidden sm:block">Khadmat AI</span>
              <span className="text-[10px] bg-[#E1F5EE] text-[#085041] px-2 py-0.5 rounded-full font-medium">Provider</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button className="relative w-[30px] h-[30px] border border-[var(--border-tertiary)] rounded-md flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]">
              <Bell size={15} />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#E24B4A] rounded-full" />
            </button>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-all cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center text-white text-xs font-bold shadow-md group-hover:shadow-lg transition-shadow">
                {displayInitials}
              </div>
              <div className="hidden sm:flex flex-col items-start max-w-[100px]">
                <div className="text-xs font-semibold text-[var(--text-primary)] leading-tight truncate">
                  {displayName.split(" ")[0]}
                </div>
                <div className="text-[10px] text-[var(--text-tertiary)] leading-tight">
                  Provider
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex flex-1 overflow-hidden relative">
          {mobileMenu && (
            <div className="fixed inset-0 bg-black/20 z-30 md:hidden" onClick={() => setMobileMenu(false)} />
          )}

          <aside className={`absolute md:static top-0 bottom-0 left-0 z-40 w-[200px] bg-[var(--bg-secondary)] border-r border-[var(--border-tertiary)] transition-transform duration-300 transform ${mobileMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="py-4">
              <div className="px-3.5 pb-3.5 mb-2.5 border-b border-[var(--border-tertiary)]">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center text-sm font-bold text-white shadow-md mb-2">
                  {displayInitials}
                </div>
                <div className="text-[13px] font-medium text-[var(--text-primary)]">{displayName}</div>
                <div className="text-[11px] text-[var(--text-secondary)] mb-1.5">
                  {profession}{cityLabel ? ` · ${cityLabel}` : ""}
                </div>
                <AvailabilityToggle providerId="me" />
              </div>

              <div className="flex flex-col">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href} className={`flex items-center gap-2 px-3.5 py-2 text-[13px] no-underline transition-colors ${isActive ? 'bg-[var(--bg-primary)] text-[#1D9E75] font-medium border-r-2 border-[#1D9E75]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'}`}>
                      <item.icon size={16} /> {item.name}
                    </Link>
                  );
                })}

                <div className="text-[10px] text-[var(--text-tertiary)] px-3.5 pt-2.5 pb-1 tracking-wider mt-1">AI ASSISTANT</div>
                <Link href="/provider/ai-chat" className={`flex items-center gap-2 px-3.5 py-2 text-[13px] no-underline transition-colors ${pathname === '/provider/ai-chat' ? 'bg-[rgba(29,158,117,0.1)] text-[#1D9E75] font-medium' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'}`}>
                  <Sparkles size={16} /> AI assistant
                </Link>

                <div className="text-[10px] text-[var(--text-tertiary)] px-3.5 pt-2.5 pb-1 tracking-wider mt-1">ACCOUNT</div>
                {accountItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href} className={`flex items-center gap-2 px-3.5 py-2 text-[13px] no-underline transition-colors ${isActive ? 'bg-[var(--bg-primary)] text-[#1D9E75] font-medium border-r-2 border-[#1D9E75]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'}`}>
                      <item.icon size={16} /> {item.name}
                    </Link>
                  );
                })}
                <div className="h-px bg-[var(--border-tertiary)] my-2 mx-3.5"></div>
                <button onClick={handleLogout} className="flex items-center gap-2 px-3.5 py-2 text-[13px] text-[#A32D2D] hover:bg-[var(--bg-primary)] transition-colors cursor-pointer border-none text-left bg-transparent w-full">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </aside>

          <main className="flex-1 bg-[var(--bg-primary)] overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
