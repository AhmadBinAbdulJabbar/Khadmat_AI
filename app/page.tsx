"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  MessageCircle,
  ArrowUp,
  Wind,
  Droplets,
  Zap,
  BookOpen,
  Home,
  Shield,
  Wrench,
  Paintbrush,
  Check,
  ShieldCheck,
  Star,
  Headset,
  Cpu,
  Brain,
  Search,
  Award,
  Calendar,
  Bell,
} from "lucide-react";
import GlobalNavbar from "@/components/GlobalNavbar";


export default function LandingPage() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const stored = localStorage.getItem("khadmat_user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        setIsLoggedIn(true);
        // Redirect based on role
        const dashboardUrl = user.role === "worker" ? "/provider/dashboard" : "/customer/dashboard";
        router.push(dashboardUrl);
      } catch {}
    }
  }, [router]);

  const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/chat?q=${encodeURIComponent(query)}`);
    } else {
      router.push(`/chat?q=Mujhe%20kal%20subah%20G-13%20mein%20AC%20technician%20chahiye`);
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoggedIn) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="bg-white font-sans text-[#333]">
      {/* ── Navbar ── */}
      <GlobalNavbar hideProfile={true} />

      {/* ── Hero ── */}
      <section id="hero" className="px-6 py-20 md:py-24 text-center border-b border-[#e0e0e0]">
        <div className="inline-flex items-center gap-2 bg-[#e8f5f0] border border-[#1D9E75] text-[#1D9E75] text-xs px-3.5 py-1.5 rounded-full mb-6 font-medium">
          <Sparkles size={14} className="animate-pulse" />
          Powered by Google Antigravity
        </div>

        <h1 className="text-4xl md:text-5xl font-medium text-[#1a1a1a] mb-3 leading-tight max-w-3xl mx-auto">
          Pakistan's smartest home services platform
        </h1>

        <p className="text-base text-[#666] max-w-lg mx-auto mb-8 leading-relaxed">
          Find trusted plumbers, electricians, AC technicians, tutors and more — in your language, in your city, instantly.
        </p>

        <div className="flex items-center justify-center gap-2.5 flex-wrap mb-10">
          <Link
            href="/auth?role=customer"
            className="inline-flex items-center gap-2 bg-[#1D9E75] text-white text-sm font-medium px-7 py-3 rounded-lg hover:bg-[#0F6E56] transition-all no-underline"
          >
            <MessageCircle size={16} />
            Book a service
          </Link>
          <Link
            href="/auth?role=worker"
            className="inline-flex items-center gap-2 bg-transparent text-[#666] text-sm font-medium px-6 py-3 rounded-lg border border-[#e0e0e0] hover:border-[#1D9E75] hover:text-[#1D9E75] transition-all no-underline"
          >
            Join as a provider
          </Link>
        </div>

        <div className="max-w-lg mx-auto bg-[#f8f9fa] border border-[#e0e0e0] rounded-xl p-5 text-left">
          <div className="text-[11px] text-[#666] mb-2 tracking-widest font-medium uppercase">Try an example</div>
          <form onSubmit={handleSearch} className="flex items-center gap-2.5 bg-white border border-[#d0d0d0] rounded-lg px-3.5 py-2.5">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mujhe kal subah G-13 mein AC technician chahiye"
              className="flex-1 text-sm text-[#333] bg-transparent outline-none placeholder:text-[#999]"
            />
            <button
              type="submit"
              className="w-8 h-8 bg-[#1D9E75] text-white rounded flex items-center justify-center hover:bg-[#0F6E56] transition-all cursor-pointer border-none flex-shrink-0"
            >
              <ArrowUp size={16} />
            </button>
          </form>
          <div className="flex gap-1.5 mt-2.5">
            {["Urdu", "Roman Urdu", "English"].map((lang) => (
              <span key={lang} className="text-[11px] px-2.5 py-0.5 rounded-full border border-[#e0e0e0] text-[#666] bg-white">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 border-b border-[#e0e0e0]">
        <div className="py-7 px-5 text-center border-r border-[#e0e0e0] md:border-b-0 border-b">
          <div className="text-3xl font-medium text-[#1D9E75] mb-1">5,000+</div>
          <div className="text-sm text-[#666]">Bookings completed</div>
        </div>
        <div className="py-7 px-5 text-center border-r border-[#e0e0e0] md:border-b-0 border-b">
          <div className="text-3xl font-medium text-[#1D9E75] mb-1">200+</div>
          <div className="text-sm text-[#666]">Verified providers</div>
        </div>
        <div className="py-7 px-5 text-center md:border-r-0">
          <div className="text-3xl font-medium text-[#1D9E75] mb-1">3 cities</div>
          <div className="text-sm text-[#666]">Karachi · Lahore · Islamabad</div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" className="px-6 py-16 md:py-20 border-b border-[#e0e0e0]">
        <div className="max-w-5xl mx-auto">
          <div className="text-[11px] text-[#1D9E75] font-semibold tracking-wider mb-1.5 uppercase">HOW IT WORKS</div>
          <h2 className="text-2xl md:text-3xl font-medium text-[#1a1a1a] mb-2">From message to booking in 4 steps</h2>
          <p className="text-sm text-[#666] mb-8">No forms, no phone calls. Just describe what you need in any language.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 border border-[#e0e0e0] rounded-2xl overflow-hidden">
            {[
              { num: 1, title: "Describe your need", sub: "Type in Urdu, Roman Urdu, or English — our AI understands all three" },
              { num: 2, title: "AI finds providers", sub: "5 agents search, rank, and select the best available provider near you" },
              { num: 3, title: "Booking confirmed", sub: "Receipt generated, provider notified, reminder set — all automatically" },
              { num: 4, title: "Rate your experience", sub: "Leave a review to help others and give providers the recognition they deserve" },
            ].map((step, i) => (
              <div
                key={i}
                className={`px-4 py-5 border-r border-[#e0e0e0] ${i === 3 ? "border-r-0" : ""} ${i >= 2 ? "border-t border-[#e0e0e0]" : ""}`}
              >
                <div className="w-7 h-7 rounded-full bg-[#e8f5f0] border border-[#1D9E75] text-[#1D9E75] text-xs font-medium flex items-center justify-center mb-3 mx-auto">
                  {step.num}
                </div>
                <div className="text-sm font-medium text-[#333] mb-1.5">
                  {step.title}
                </div>
                <div className="text-[12px] text-[#666] leading-snug">
                  {step.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="px-6 py-16 md:py-20 border-b border-[#e0e0e0]">
        <div className="max-w-5xl mx-auto">
          <div className="text-[11px] text-[#1D9E75] font-semibold tracking-wider mb-1.5 uppercase">SERVICES</div>
          <h2 className="text-2xl md:text-3xl font-medium text-[#1a1a1a] mb-2">What can we help with?</h2>
          <p className="text-sm text-[#666] mb-8">From fixing a leaking pipe to finding a math tutor — Khadmat AI covers it all.</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {[
              { name: "AC technician", icon: Wind },
              { name: "Plumber", icon: Droplets },
              { name: "Electrician", icon: Zap },
              { name: "Tutor", icon: BookOpen },
              { name: "Cleaner", icon: Home },
              { name: "Carpenter", icon: Wrench },
              { name: "Painter", icon: Paintbrush },
              { name: "Security", icon: Shield },
            ].map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={i}
                  className="bg-white border border-[#e0e0e0] rounded-xl p-4 text-center hover:border-[#1D9E75] hover:bg-[#e8f5f0] transition-all cursor-pointer"
                >
                  <Icon size={24} className="text-[#1D9E75] mx-auto mb-2" />
                  <div className="text-xs text-[#666]">{svc.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Tech Strip ── */}
      <section className="bg-[#f8f9fa] border-y border-[#e0e0e0] px-6 py-4 md:py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          <div className="text-xs text-[#1D9E75] font-medium flex items-center gap-2">
            <Cpu size={16} />
            Powered by Google Antigravity — 5 AI agents working together
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { name: "Intent Agent", icon: Brain },
              { name: "Discovery Agent", icon: Search },
              { name: "Decision Agent", icon: Award },
              { name: "Booking Agent", icon: Calendar },
              { name: "Follow-up Agent", icon: Bell },
            ].map((agent, i) => {
              const Icon = agent.icon;
              return (
                <div key={i} className="bg-white border border-[#1D9E75] rounded-full px-3 py-1 text-[11px] text-[#1D9E75] font-medium flex items-center gap-1">
                  <Icon size={12} />
                  {agent.name}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Who Is It For ── */}
      <section id="about" className="px-6 py-16 md:py-20 border-b border-[#e0e0e0]">
        <div className="max-w-5xl mx-auto">
          <div className="text-[11px] text-[#1D9E75] font-semibold tracking-wider mb-1.5 uppercase">WHO IS IT FOR</div>
          <h2 className="text-2xl md:text-3xl font-medium text-[#1a1a1a] mb-2">Built for everyone</h2>
          <p className="text-sm text-[#666] mb-8">Whether you need a service or provide one, Khadmat AI works for you.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Customer Card */}
            <Link
              href="/auth?role=customer"
              className="bg-white border-2 border-[#1D9E75] rounded-2xl p-6 no-underline hover:bg-[#e8f5f0] transition-all"
            >
              <div className="w-11 h-11 rounded-lg bg-[#e8f5f0] flex items-center justify-center mb-3.5">
                <Home size={22} className="text-[#1D9E75]" />
              </div>
              <h3 className="text-base font-medium text-[#1a1a1a] mb-1.5">For customers</h3>
              <p className="text-sm text-[#666] mb-3.5 leading-relaxed">
                Book any home service in seconds without making a single phone call.
              </p>
              <div className="space-y-1.5 mb-4">
                {[
                  "Natural language — Urdu, Roman Urdu, English",
                  "AI finds and books the best provider for you",
                  "Pay via bank, Easypaisa, JazzCash or card",
                  "Automatic reminders and follow-ups",
                  "Rate and review after every job",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#666]">
                    <Check size={14} className="text-[#1D9E75] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <button className="w-full bg-[#1D9E75] text-white border-none rounded-lg px-4 py-2.5 text-sm font-medium cursor-pointer hover:bg-[#0F6E56] transition-all" type="button">
                Create customer account
              </button>
            </Link>

            {/* Provider Card */}
            <Link
              href="/auth?role=worker"
              className="bg-white border border-[#e0e0e0] rounded-2xl p-6 no-underline hover:border-[#1D9E75] hover:bg-[#f8f9fa] transition-all"
            >
              <div className="w-11 h-11 rounded-lg bg-[#f0f9f7] flex items-center justify-center mb-3.5">
                <Wrench size={22} className="text-[#1D9E75]" />
              </div>
              <h3 className="text-base font-medium text-[#1a1a1a] mb-1.5">For service providers</h3>
              <p className="text-sm text-[#666] mb-3.5 leading-relaxed">
                Get discovered by more customers and manage all your bookings in one place.
              </p>
              <div className="space-y-1.5 mb-4">
                {[
                  "Create a verified profile with your profession",
                  "Receive job requests and accept via AI chat",
                  "Set your availability and working hours",
                  "Track earnings and request reviews",
                  "Grow your rating and get more bookings",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#666]">
                    <Check size={14} className="text-[#1D9E75] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <button className="w-full bg-transparent text-[#666] border border-[#e0e0e0] rounded-lg px-4 py-2.5 text-sm cursor-pointer hover:border-[#1D9E75] hover:text-[#1D9E75] transition-all" type="button">
                Join as a provider
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust & Safety ── */}
      <section className="px-6 py-16 md:py-20 border-b border-[#e0e0e0]">
        <div className="max-w-5xl mx-auto">
          <div className="text-[11px] text-[#1D9E75] font-semibold tracking-wider mb-1.5 uppercase">TRUST & SAFETY</div>
          <h2 className="text-2xl md:text-3xl font-medium text-[#1a1a1a] mb-2">Why customers trust Khadmat AI</h2>
          <p className="text-sm text-[#666] mb-8">Every provider is verified. Every booking is tracked.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
            {[
              { icon: ShieldCheck, title: "Verified providers", sub: "Every provider goes through identity and skill verification before joining", bg: "#e8f5f0", color: "#1D9E75" },
              { icon: Star, title: "Real reviews", sub: "All ratings come from verified completed bookings — never fake", bg: "#f3e8ff", color: "#7F77DD" },
              { icon: Droplets, title: "Transparent pricing", sub: "See estimated price before booking. No hidden fees. Pay what was agreed.", bg: "#f0fdf4", color: "#639922" },
              { icon: Headset, title: "24/7 support", sub: "Issues with a booking? Our team resolves complaints within 2 hours", bg: "#fef3c7", color: "#EF9F27" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white border border-[#e0e0e0] rounded-xl p-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-2.5"
                    style={{ background: item.bg }}
                  >
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <div className="text-sm font-medium text-[#333] mb-1.5">{item.title}</div>
                  <div className="text-xs text-[#666] leading-relaxed">{item.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="px-6 py-16 md:py-20 border-b border-[#e0e0e0]">
        <div className="max-w-5xl mx-auto">
          <div className="text-[11px] text-[#1D9E75] font-semibold tracking-wider mb-1.5 uppercase">REVIEWS</div>
          <h2 className="text-2xl md:text-3xl font-medium text-[#1a1a1a] mb-2">What people are saying</h2>
          <p className="text-sm text-[#666] mb-8">From customers and providers across Pakistan.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {[
              { stars: "★★★★★", text: '"Sirf ek message mein AC technician book ho gaya. Koi call nahi, koi wait nahi. Zabardast service!"', name: "Ahmed Usman", role: "Customer · Islamabad", bg: "#f3e8ff", text_color: "#534AB7" },
              { stars: "★★★★★", text: '"Pehle WhatsApp pe dhundhna parta tha. Ab Khadmat se booking aati hai seedha — kaam barhta ja raha hai."', name: "Ali AC Services", role: "Provider · Islamabad", bg: "#e8f5f0", text_color: "#1D9E75" },
              { stars: "★★★★★", text: '"The AI understood my Roman Urdu perfectly. Got a plumber in under 10 minutes. Highly recommend."', name: "Sara Khan", role: "Customer · Karachi", bg: "#f0f4ff", text_color: "#7F77DD" },
            ].map((review, i) => (
              <div key={i} className="bg-white border border-[#e0e0e0] rounded-xl p-3.5">
                <div className="text-sm text-[#EF9F27] mb-2 tracking-widest">{review.stars}</div>
                <p className="text-xs text-[#666] leading-relaxed mb-2.5">{review.text}</p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0"
                    style={{ background: review.bg, color: review.text_color }}
                  >
                    {review.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#333]">{review.name}</div>
                    <div className="text-[11px] text-[#666]">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cities ── */}
      <section id="cities" className="px-6 py-16 md:py-20 border-b border-[#e0e0e0]">
        <div className="max-w-5xl mx-auto">
          <div className="text-[11px] text-[#1D9E75] font-semibold tracking-wider mb-1.5 uppercase">COVERAGE</div>
          <h2 className="text-2xl md:text-3xl font-medium text-[#1a1a1a] mb-2">Now live in 3 cities</h2>
          <p className="text-sm text-[#666] mb-8">Expanding to more cities soon.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {[
              { city: "Islamabad", count: "86 providers · 2,100+ bookings", width: "90%" },
              { city: "Karachi", count: "74 providers · 1,800+ bookings", width: "75%" },
              { city: "Lahore", count: "52 providers · 1,100+ bookings", width: "52%" },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#e0e0e0] rounded-xl p-4 text-center">
                <div className="text-sm font-medium text-[#1a1a1a] mb-0.5">{item.city}</div>
                <div className="text-[12px] text-[#666] mb-2.5">{item.count}</div>
                <div className="h-1 bg-[#e0e0e0] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1D9E75] rounded-full" style={{ width: item.width }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-20 md:py-24 text-center border-b border-[#e0e0e0]">
        <h2 className="text-3xl md:text-4xl font-medium text-[#1a1a1a] mb-2.5 max-w-xl mx-auto">Ready to get started?</h2>
        <p className="text-base text-[#666] mb-7 max-w-md mx-auto leading-relaxed">
          Join thousands of customers and providers already using Khadmat AI.
        </p>
        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          <Link
            href="/auth?role=customer"
            className="inline-flex items-center gap-2 bg-[#1D9E75] text-white text-sm font-medium px-7 py-3 rounded-lg hover:bg-[#0F6E56] transition-all no-underline"
          >
            <MessageCircle size={16} />
            Create customer account
          </Link>
          <Link
            href="/auth?role=worker"
            className="inline-flex items-center gap-2 bg-transparent text-[#666] text-sm font-medium px-6 py-3 rounded-lg border border-[#e0e0e0] hover:border-[#1D9E75] hover:text-[#1D9E75] transition-all no-underline"
          >
            Join as a provider
          </Link>
        </div>
      </section>
    </div>
  );
}
