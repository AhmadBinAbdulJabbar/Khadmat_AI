"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell, LayoutDashboard, Calendar, MessageCircle, Users,
  Receipt, User, Star, Settings, LogOut, Menu, X, MapPin, ChevronDown
} from "lucide-react";
import RequireAuth from "@/components/RequireAuth";
import { createClient } from "@/lib/supabase";

type UserInfo = { name: string; email: string; initials: string; city?: string };

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    setMobileMenu(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const stored = localStorage.getItem("khadmat_user");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        if (u.role === "worker") {
          router.replace("/provider/dashboard");
          return;
        }
        const name = u.name || u.email || "User";
        setUser({
          name,
          email: u.email ?? "",
          city: u.city ?? "",
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
        if (u.user_metadata?.role === "worker") {
          router.replace("/provider/dashboard");
          return;
        }
        const name = u.user_metadata?.full_name ||
          `${u.user_metadata?.first_name ?? ""} ${u.user_metadata?.last_name ?? ""}`.trim() ||
          u.email || "User";
        setUser({
          name,
          email: u.email ?? "",
          city: u.user_metadata?.city ?? "",
          initials: name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase(),
        });
      }
    };
    load();
  }, [router]);

  const handleLogout = async () => {
    localStorage.removeItem("khadmat_token");
    localStorage.removeItem("khadmat_user");
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const navItems = [
    { name: "Dashboard", href: "/customer/dashboard", icon: LayoutDashboard },
    { name: "My bookings", href: "/customer/bookings", icon: Calendar, badge: 1 },
    { name: "AI booking", href: "/chat", icon: MessageCircle },
    { name: "Browse providers", href: "/providers", icon: Users },
    { name: "Billing & payments", href: "/customer/billing", icon: Receipt },
  ];

  const accountItems = [
    { name: "Profile", href: "/customer/profile", icon: User },
    { name: "My reviews", href: "/customer/reviews", icon: Star },
    { name: "Settings", href: "/customer/settings", icon: Settings },
  ];

  const displayName = user?.name ?? "Loading...";
  const displayInitials = user?.initials ?? "??";
  const displayEmail = user?.email ?? "";

  return (
    <RequireAuth>
      <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
        {/* Top Navbar */}
        <nav className="flex items-center justify-between px-5 py-2.5 border-b border-[var(--border-tertiary)] sticky top-0 z-50 bg-[var(--bg-primary)]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="md:hidden p-1 -ml-1 text-[var(--text-secondary)]" onClick={() => setMobileMenu(!mobileMenu)}>
                {mobileMenu ? <X size={20} /> : <Menu size={20} />}
              </button>
              <Link href="/" className="flex items-center gap-2 no-underline text-[14px] font-medium text-[var(--text-primary)]">
                <div className="w-[26px] h-[26px] bg-[#1D9E75] rounded-[7px] flex items-center justify-center text-white text-xs font-medium">
                  K
                </div>
                <span className="hidden sm:block">Khadmat AI</span>
                <span className="text-[10px] bg-[#E1F5EE] text-[#085041] px-2 py-0.5 rounded-full font-medium">Customer</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 relative">
            <button className="w-[30px] h-[30px] border border-[var(--border-tertiary)] rounded-md flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] relative cursor-pointer">
              <Bell size={15} />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#E24B4A] rounded-full" />
            </button>
            <div
              className="flex items-center gap-1.5 cursor-pointer px-2 py-1 rounded-md hover:bg-[var(--bg-secondary)] transition-colors"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center text-white text-[11px] font-bold shadow-md shrink-0">
                {displayInitials}
              </div>
              <span className="text-[13px] font-medium text-[var(--text-primary)] hidden sm:block">{displayName}</span>
              <ChevronDown size={13} className="text-[var(--text-tertiary)] hidden sm:block" />
            </div>

            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>
                <div className="absolute top-[44px] right-0 bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-1.5 min-w-[200px] z-50 shadow-sm">
                  <div className="p-2 border-b border-[var(--border-tertiary)] mb-1">
                    <div className="text-[13px] font-medium text-[var(--text-primary)]">{displayName}</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">{displayEmail}</div>
                  </div>
                  <Link href="/customer/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-2.5 py-1.5 text-[13px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] rounded-md transition-colors no-underline">
                    <LayoutDashboard size={15} /> My Dashboard
                  </Link>
                  <Link href="/customer/bookings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-2.5 py-1.5 text-[13px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] rounded-md transition-colors no-underline">
                    <Calendar size={15} /> My Bookings
                  </Link>
                  <Link href="/customer/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-2.5 py-1.5 text-[13px] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] rounded-md transition-colors no-underline">
                    <Settings size={15} /> Settings
                  </Link>
                  <div className="h-px bg-[var(--border-tertiary)] my-1"></div>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[13px] text-[#A32D2D] hover:bg-[#FCEBEB] rounded-md transition-colors cursor-pointer border-none text-left bg-transparent">
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </nav>

        <div className="flex flex-1 overflow-hidden relative">
          {mobileMenu && (
            <div className="fixed inset-0 bg-black/20 z-30 md:hidden" onClick={() => setMobileMenu(false)} />
          )}

          <aside className={`absolute md:static top-0 bottom-0 left-0 z-40 w-[220px] bg-[var(--bg-secondary)] border-r border-[var(--border-tertiary)] transition-transform duration-300 transform ${mobileMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="py-5 flex flex-col h-full overflow-y-auto">
              <div className="px-4 pb-4 mb-2.5 border-b border-[var(--border-tertiary)]">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center text-sm font-bold text-white shadow-md mb-2">
                  {displayInitials}
                </div>
                <div className="text-[13px] font-medium text-[var(--text-primary)]">{displayName}</div>
                <div className="text-[11px] text-[var(--text-secondary)]">{displayEmail}</div>
                {user?.city && (
                  <div className="text-[11px] text-[var(--text-tertiary)] mt-0.5 flex items-center gap-1">
                    <MapPin size={12} /> {user.city}, Pakistan
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href} className={`flex items-center gap-2 px-4 py-2 text-[13px] no-underline transition-colors ${isActive ? 'bg-[var(--bg-primary)] text-[#1D9E75] font-medium border-r-2 border-[#1D9E75]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'}`}>
                      <item.icon size={16} />
                      {item.name}
                      {item.badge && <span className="ml-auto bg-[#E24B4A] text-white text-[10px] px-1.5 py-0.5 rounded-full leading-none">{item.badge}</span>}
                    </Link>
                  );
                })}

                <div className="text-[10px] text-[var(--text-tertiary)] px-4 pt-2.5 pb-1 tracking-wider mt-1">ACCOUNT</div>
                {accountItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href} className={`flex items-center gap-2 px-4 py-2 text-[13px] no-underline transition-colors ${isActive ? 'bg-[var(--bg-primary)] text-[#1D9E75] font-medium border-r-2 border-[#1D9E75]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'}`}>
                      <item.icon size={16} /> {item.name}
                    </Link>
                  );
                })}
                <div className="h-px bg-[var(--border-tertiary)] my-2 mx-4"></div>
                <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-[13px] text-[#A32D2D] hover:bg-[var(--bg-primary)] transition-colors cursor-pointer border-none text-left bg-transparent w-full">
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
