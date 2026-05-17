"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Bell, LayoutDashboard, Calendar, Clock, Banknote, 
  User, Star, Settings, Menu, X, CheckCircle2 
} from "lucide-react";
import RequireAuth from "@/components/RequireAuth";

function AvailabilityToggle() {
  const [isAvailable, setIsAvailable] = useState(true);

  const toggle = async () => {
    const newVal = !isAvailable;
    setIsAvailable(newVal);
    try {
      // Mock API call
      // await fetch(`/api/providers/id/availability`, { method: "PATCH", ... })
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)] cursor-pointer" onClick={toggle}>
      <div className={`w-8 h-[18px] rounded-full relative transition-colors ${isAvailable ? 'bg-[#1D9E75]' : 'bg-[var(--border-tertiary)]'}`}>
        <div className={`absolute top-0.5 w-[14px] h-[14px] bg-white rounded-full transition-transform ${isAvailable ? 'right-0.5 translate-x-0' : 'left-0.5 translate-x-0'}`} />
      </div>
      <span className={isAvailable ? "text-[#1D9E75] font-medium" : ""}>
        {isAvailable ? "Available" : "Offline"}
      </span>
    </div>
  );
}

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

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
            <div className="w-[30px] h-[30px] rounded-full bg-[#E1F5EE] border border-[#9FE1CB] flex items-center justify-center text-[11px] font-medium text-[#085041]">
              AA
            </div>
            <span className="text-[13px] text-[var(--text-secondary)] hidden sm:block">Ali</span>
          </div>
        </nav>

        <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar overlay for mobile */}
          {mobileMenu && (
            <div className="fixed inset-0 bg-black/20 z-30 md:hidden" onClick={() => setMobileMenu(false)} />
          )}
          
          {/* Sidebar */}
          <aside className={`absolute md:static top-0 bottom-0 left-0 z-40 w-[200px] bg-[var(--bg-secondary)] border-r border-[var(--border-tertiary)] transition-transform duration-300 transform ${mobileMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="py-4">
              <div className="px-3.5 pb-3.5 mb-2.5 border-b border-[var(--border-tertiary)]">
                <div className="w-11 h-11 rounded-full bg-[#E1F5EE] border border-[#9FE1CB] flex items-center justify-center text-sm font-medium text-[#085041] mb-2">
                  AA
                </div>
                <div className="text-[13px] font-medium text-[var(--text-primary)]">Ali AC Services</div>
                <div className="text-[11px] text-[var(--text-secondary)] mb-1.5">AC Technician · G-13, Islamabad</div>
                <AvailabilityToggle />
              </div>

              <div className="flex flex-col">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href} className={`flex items-center gap-2 px-3.5 py-2 text-[13px] no-underline transition-colors ${isActive ? 'bg-[var(--bg-primary)] text-[#1D9E75] font-medium border-r-2 border-[#1D9E75]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'}`}>
                      <item.icon size={16} /> {item.name}
                    </Link>
                  )
                })}

                <div className="text-[10px] text-[var(--text-tertiary)] px-3.5 pt-2.5 pb-1 tracking-wider mt-1">ACCOUNT</div>
                {accountItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href} className={`flex items-center gap-2 px-3.5 py-2 text-[13px] no-underline transition-colors ${isActive ? 'bg-[var(--bg-primary)] text-[#1D9E75] font-medium border-r-2 border-[#1D9E75]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'}`}>
                      <item.icon size={16} /> {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 bg-[var(--bg-primary)] overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
