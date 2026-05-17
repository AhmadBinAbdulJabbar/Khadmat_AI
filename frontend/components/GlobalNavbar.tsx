"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import NavUser from "./NavUser";

export default function GlobalNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        id="navbar"
        className={`sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 border-b transition-all duration-300 ${
          scrolled
            ? "bg-[var(--bg-primary)]/95 backdrop-blur-md border-[var(--border-primary)] shadow-sm"
            : "bg-[var(--bg-primary)] border-[var(--border-tertiary)]"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 no-underline group">
          <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center text-white text-sm font-semibold group-hover:scale-105 transition-transform">
            K
          </div>
          <span className="text-base font-semibold text-[var(--text-primary)]">
            Khadmat AI
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/#how-it-works"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline"
          >
            How it works
          </Link>
          <Link
            href="/#services"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline"
          >
            Services
          </Link>
          <Link
            href="/providers"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline"
          >
            Providers
          </Link>
          <NavUser />
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors border-none bg-transparent cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X size={20} className="text-[var(--text-primary)]" />
          ) : (
            <Menu size={20} className="text-[var(--text-primary)]" />
          )}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 top-[57px] z-40 bg-[var(--bg-primary)] border-t border-[var(--border-tertiary)] animate-fade-in"
        >
          <div className="flex flex-col p-6 gap-2">
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base py-3 px-4 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-all no-underline"
            >
              How it works
            </Link>
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base py-3 px-4 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-all no-underline"
            >
              Services
            </Link>
            <Link
              href="/providers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base py-3 px-4 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-all no-underline"
            >
              Providers
            </Link>
            <div className="mt-4 flex justify-center">
              <NavUser />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
