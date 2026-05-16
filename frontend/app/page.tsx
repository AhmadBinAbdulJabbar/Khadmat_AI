"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  MessageCircle,
  ArrowUp,
  Languages,
  MapPin,
  Star,
  CalendarCheck,
  Bell,
  Activity,
  ArrowRight,
  Wind,
  Droplets,
  Zap,
  BookOpen,
  Home,
  Shield,
  Wrench,
  Paintbrush,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

/* ─────────────── data ─────────────── */

const FEATURES = [
  {
    icon: Languages,
    title: "Multilingual",
    desc: "Understands Urdu, Roman Urdu, and English naturally",
    bg: "var(--accent-light)",
    color: "var(--accent-dark)",
  },
  {
    icon: MapPin,
    title: "Location aware",
    desc: "Finds closest available providers in your area",
    bg: "var(--feat-purple)",
    color: "var(--feat-purple-text)",
  },
  {
    icon: Star,
    title: "Smart ranking",
    desc: "Ranks by distance, rating, and availability",
    bg: "var(--feat-yellow)",
    color: "var(--feat-yellow-text)",
  },
  {
    icon: CalendarCheck,
    title: "Instant booking",
    desc: "Confirmed booking with receipt in seconds",
    bg: "var(--feat-blue)",
    color: "var(--feat-blue-text)",
  },
  {
    icon: Bell,
    title: "Auto reminders",
    desc: "AI schedules follow-ups and sends reminders",
    bg: "var(--feat-lime)",
    color: "var(--feat-lime-text)",
  },
  {
    icon: Activity,
    title: "Agent trace",
    desc: "See every AI reasoning step in real time",
    bg: "var(--feat-coral)",
    color: "var(--feat-coral-text)",
  },
];

const STEPS = [
  { num: 1, title: "Describe your need", desc: "Type in any language — Urdu, Roman Urdu, or English" },
  { num: 2, title: "AI finds providers", desc: "Agents search nearby verified providers instantly" },
  { num: 3, title: "Best match selected", desc: "Ranked by distance, rating, and availability" },
  { num: 4, title: "Booking confirmed", desc: "Receipt generated, reminder set automatically" },
];

const SERVICES = [
  { name: "AC Technician", icon: Wind },
  { name: "Plumber", icon: Droplets },
  { name: "Electrician", icon: Zap },
  { name: "Tutor", icon: BookOpen },
  { name: "Cleaner", icon: Home },
  { name: "Security", icon: Shield },
  { name: "Carpenter", icon: Wrench },
  { name: "Painter", icon: Paintbrush },
];

const STATS = [
  { value: "5,000+", label: "Bookings completed" },
  { value: "200+", label: "Verified providers" },
  { value: "3 cities", label: "Karachi · Lahore · Islamabad" },
];

/* ─────────────── page ─────────────── */

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/chat?q=${encodeURIComponent(query)}`);
    } else {
      router.push(`/chat?q=Mujhe%20kal%20subah%20G-13%20mein%20AC%20technician%20chahiye`);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Navbar ── */}
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
          <a
            href="#how-it-works"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline"
          >
            How it works
          </a>
          <a
            href="#services"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline"
          >
            Services
          </a>
          <Link
            href="/providers"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline"
          >
            Providers
          </Link>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 bg-[var(--accent)] text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-[var(--accent-dark)] transition-all active:scale-[0.97] shadow-sm hover:shadow-md no-underline"
          >
            Sign in
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
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
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base py-3 px-4 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-all no-underline"
            >
              How it works
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base py-3 px-4 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-all no-underline"
            >
              Services
            </a>
            <Link
              href="/providers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base py-3 px-4 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-all no-underline"
            >
              Providers
            </Link>
            <Link
              href="/auth"
              className="mt-4 flex items-center justify-center gap-2 bg-[var(--accent)] text-white text-base font-medium py-3 rounded-lg hover:bg-[var(--accent-dark)] transition-all no-underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <section id="hero" className="px-6 pt-16 pb-12 md:pt-20 md:pb-16 text-center border-b border-[var(--border-tertiary)]">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 bg-[var(--accent-light)] text-[var(--accent-dark)] text-xs font-medium px-4 py-1.5 rounded-full border border-[var(--accent-border)] mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <Sparkles size={14} className="animate-pulse" />
          Powered by Google Antigravity
        </div>

        {/* Headline */}
        <h1
          className="text-3xl md:text-5xl font-semibold text-[var(--text-primary)] leading-tight mb-4 max-w-2xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Book any home service in{" "}
          <span className="text-[var(--accent)] relative">
            your language
            <svg
              className="absolute -bottom-1 left-0 w-full"
              height="6"
              viewBox="0 0 200 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4.5C40 1.5 80 1 100 2.5C120 4 160 3.5 199 1.5"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="text-base md:text-lg text-[var(--text-secondary)] max-w-lg mx-auto mb-8 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          Plumbers, electricians, AC technicians, tutors — just describe what
          you need in Urdu, Roman Urdu, or English. Our AI handles everything.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex items-center justify-center gap-3 flex-wrap mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[var(--accent)] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-[var(--accent-dark)] transition-all active:scale-[0.97] shadow-md hover:shadow-lg no-underline"
          >
            <MessageCircle size={16} />
            Book a service
          </Link>
          <Link
            href="/providers"
            className="inline-flex items-center gap-2 bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm font-medium px-6 py-3 rounded-lg border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] hover:border-[var(--border-secondary)] transition-all no-underline"
          >
            Browse providers
          </Link>
        </div>

        {/* Demo input */}
        <div
          className="max-w-xl mx-auto bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-xl p-5 text-left animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="text-[11px] tracking-wider text-[var(--text-tertiary)] font-medium mb-2 uppercase">
            Try an example
          </div>
          <form onSubmit={handleSearch} className="flex items-center gap-3 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg px-4 py-3 group hover:border-[var(--accent-border)] transition-colors focus-within:border-[var(--accent)] focus-within:ring-2 focus-within:ring-[var(--accent-light)]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mujhe kal subah G-13 mein AC technician chahiye"
              className="flex-1 text-sm text-[var(--text-primary)] bg-transparent outline-none placeholder:text-[var(--text-tertiary)]"
            />
            <button
              type="submit"
              className="flex-shrink-0 w-9 h-9 bg-[var(--accent)] text-white rounded-lg flex items-center justify-center hover:bg-[var(--accent-dark)] transition-all active:scale-90 shadow-sm animate-pulse-glow no-underline cursor-pointer border-none"
            >
              <ArrowUp size={16} />
            </button>
          </form>
          <div className="flex gap-2 mt-3">
            {["Urdu", "Roman Urdu", "English"].map((lang) => (
              <span
                key={lang}
                className="text-[11px] px-3 py-1 rounded-full border border-[var(--border-tertiary)] text-[var(--text-secondary)] bg-[var(--bg-primary)] hover:border-[var(--accent-border)] hover:text-[var(--accent-dark)] transition-colors cursor-default"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section id="stats" className="grid grid-cols-1 md:grid-cols-3 border-b border-[var(--border-tertiary)]">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className={`py-8 px-6 text-center ${
              i < STATS.length - 1
                ? "md:border-r md:border-[var(--border-tertiary)]"
                : ""
            } ${i < STATS.length - 1 ? "border-b md:border-b-0 border-[var(--border-tertiary)]" : ""}`}
          >
            <div className="text-2xl md:text-3xl font-semibold text-[var(--accent)] mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-[var(--text-secondary)]">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* ── Features ── */}
      <section id="features" className="px-6 py-12 md:py-16 border-b border-[var(--border-tertiary)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs text-[var(--accent)] font-semibold tracking-wider uppercase mb-2">
            Features
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] mb-8">
            Everything handled by AI agents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="group bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-5 hover:border-[var(--border-secondary)] hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                    style={{ background: feat.bg }}
                  >
                    <Icon size={20} style={{ color: feat.color }} />
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        id="how-it-works"
        className="px-6 py-12 md:py-16 bg-[var(--bg-secondary)] border-b border-[var(--border-tertiary)]"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-xs text-[var(--accent)] font-semibold tracking-wider uppercase mb-2">
            How it works
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] mb-10">
            From message to booking in 4 steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6 md:gap-0 items-start">
            {STEPS.map((step, i) => (
              <div key={i} className="contents">
                {/* Step */}
                <div className="text-center md:col-span-1">
                  <div className="w-11 h-11 rounded-full bg-[var(--accent-light)] border border-[var(--accent-border)] text-[var(--accent-dark)] text-sm font-semibold flex items-center justify-center mx-auto mb-3">
                    {step.num}
                  </div>
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-[160px] mx-auto">
                    {step.desc}
                  </p>
                </div>
                {/* Arrow divider (not after last) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:flex items-center justify-center md:col-span-1 pt-3 text-[var(--text-tertiary)]">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="px-6 py-12 md:py-16 border-b border-[var(--border-tertiary)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-xs text-[var(--accent)] font-semibold tracking-wider uppercase mb-2">
            Services
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] mb-8">
            What can we help you with?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.name}
                  href={`/book?service=${encodeURIComponent(svc.name)}`}
                  className="group flex flex-col items-center gap-2 bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl py-5 px-3 text-center hover:border-[var(--accent-border)] hover:bg-[var(--accent-light)]/30 hover:shadow-sm transition-all duration-300 cursor-pointer no-underline"
                >
                  <Icon
                    size={26}
                    className="text-[var(--accent)] group-hover:scale-110 transition-transform"
                  />
                  <span className="text-xs font-medium text-[var(--text-primary)]">
                    {svc.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" className="px-6 py-14 md:py-20 text-center border-b border-[var(--border-tertiary)] relative overflow-hidden">
        {/* Background gradient decoration */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            }}
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-3 relative z-10">
          Ready to try Khadmat AI?
        </h2>
        <p className="text-sm md:text-base text-[var(--text-secondary)] mb-8 relative z-10">
          Just type what you need. Our agents do the rest.
        </p>
        <Link
          href="/book"
          className="relative z-10 inline-flex items-center gap-2 bg-[var(--accent)] text-white text-base font-medium px-8 py-3.5 rounded-lg hover:bg-[var(--accent-dark)] transition-all active:scale-[0.97] shadow-lg hover:shadow-xl no-underline"
        >
          <MessageCircle size={18} />
          Start booking
        </Link>
      </section>

    </div>
  );
}
