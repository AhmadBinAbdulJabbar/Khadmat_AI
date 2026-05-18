"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import NavUser from "./NavUser";

interface GlobalNavbarProps {
  hideProfile?: boolean;
}

export default function GlobalNavbar({ hideProfile = false }: GlobalNavbarProps) {
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
        {/* Left: Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 no-underline group">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center text-white text-sm font-semibold group-hover:scale-105 transition-transform">
              K
            </div>
            <span className="text-base font-semibold text-[var(--text-primary)]">
              Khadmat AI
            </span>
          </Link>
        </div>

        {/* Center: Desktop links */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          <Link
            href="/#how"
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
            href="/#cities"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline"
          >
            Cities
          </Link>
          <Link
            href="/#about"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline"
          >
            About
          </Link>
        </div>

        {/* Right: Desktop buttons and profile */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <Link
            href={hideProfile ? "/auth?role=customer" : "/book"}
            className="text-sm font-medium px-5 py-2 rounded-lg text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all no-underline"
          >
            Get started
          </Link>
          {!hideProfile && <NavUser />}
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors border-none bg-transparent cursor-pointer ml-auto"
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
              href="/#how"
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
              href="/#cities"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base py-3 px-4 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-all no-underline"
            >
              Cities
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base py-3 px-4 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-all no-underline"
            >
              About
            </Link>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href={hideProfile ? "/auth?role=customer" : "/book"}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base py-3 px-4 rounded-lg bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-dark)] transition-all no-underline text-center"
              >
                Get started
              </Link>
              {!hideProfile && (
                <div className="flex justify-center">
                  <NavUser />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
