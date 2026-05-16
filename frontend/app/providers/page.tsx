"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Map as MapIcon,
  ChevronDown,
  LayoutGrid,
  Snowflake,
  Droplet,
  Plug,
  Book,
  Home,
  Star,
  Briefcase,
  Banknote,
  ExternalLink,
  Loader2
} from "lucide-react";

export default function ProvidersPage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [city, setCity] = useState("All cities");
  const [area, setArea] = useState("All areas");
  const [service, setService] = useState("All");
  const [sort, setSort] = useState("Rating");

  const [cities, setCities] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch cities and areas
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const cRes = await fetch("http://localhost:8001/api/providers/cities");
        setCities(await cRes.json());
      } catch (err) {
        console.error("Failed to load cities", err);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const qs = city !== "All cities" ? `?city=${encodeURIComponent(city)}` : "";
        const aRes = await fetch(`http://localhost:8001/api/providers/areas${qs}`);
        setAreas(await aRes.json());
      } catch (err) {
        console.error("Failed to load areas", err);
      }
    };
    fetchAreas();
  }, [city]);

  // Fetch providers
  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      try {
        const qs = new URLSearchParams();
        if (service !== "All") qs.append("service", service);
        if (city !== "All cities") qs.append("city", city);
        if (area !== "All areas") qs.append("area", area);
        if (debouncedSearch) qs.append("q", debouncedSearch);
        qs.append("sort", sort);

        const res = await fetch(`http://localhost:8001/api/providers/search?${qs.toString()}`);
        setProviders(await res.json());
      } catch (err) {
        console.error("Failed to load providers", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, [service, city, area, debouncedSearch, sort]);

  const handleBook = (category: string) => {
    router.push(`/book?service=${encodeURIComponent(category)}`);
  };

  const services = [
    { name: "All", icon: <LayoutGrid size={13} /> },
    { name: "AC Technician", icon: <Snowflake size={13} /> },
    { name: "Plumber", icon: <Droplet size={13} /> },
    { name: "Electrician", icon: <Plug size={13} /> },
    { name: "Tutor", icon: <Book size={13} /> },
    { name: "Cleaner", icon: <Home size={13} /> }
  ];

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen pb-12">
      {/* Navbar Minimal */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border-tertiary)] sticky top-0 z-10 bg-[var(--bg-primary)]/95 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 no-underline group">
          <div className="w-6 h-6 bg-[var(--accent)] rounded flex items-center justify-center text-white text-xs font-semibold group-hover:scale-105 transition-transform">
            K
          </div>
          <span className="text-[13px] font-medium text-[var(--text-primary)]">
            Khadmat AI
          </span>
        </Link>
        <Link href="/dashboard" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline">
          My bookings
        </Link>
      </div>

      <div className="p-5 sm:p-6 max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-lg font-medium text-[var(--text-primary)]">Browse providers</h1>
          <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">Find verified service providers across Karachi, Lahore, and Islamabad</p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="flex-1 flex items-center gap-2 bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 focus-within:border-[var(--text-primary)] transition-colors">
            <Search size={15} className="text-[var(--text-tertiary)]" />
            <input 
              type="text" 
              placeholder="Search providers by name or service..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-[13px] text-[var(--text-primary)] w-full placeholder:text-[var(--text-tertiary)]"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <select 
                value={city} 
                onChange={(e) => {
                  setCity(e.target.value);
                  setArea("All areas");
                }}
                className="appearance-none bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-lg pl-8 pr-8 py-2 text-[13px] text-[var(--text-secondary)] outline-none cursor-pointer hover:border-[var(--text-primary)] h-full"
              >
                <option>All cities</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <MapPin size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-secondary)]" />
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-secondary)]" />
            </div>

            <div className="relative">
              <select 
                value={area} 
                onChange={(e) => setArea(e.target.value)}
                className="appearance-none bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-lg pl-8 pr-8 py-2 text-[13px] text-[var(--text-secondary)] outline-none cursor-pointer hover:border-[var(--text-primary)] h-full"
              >
                <option>All areas</option>
                {areas.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <MapIcon size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-secondary)]" />
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-secondary)]" />
            </div>
          </div>
        </div>

        {/* Service Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {services.map(s => (
            <button
              key={s.name}
              onClick={() => setService(s.name)}
              className={`flex items-center gap-1.5 border rounded-full px-3 py-1.5 text-xs transition-colors ${
                service === s.name 
                  ? "bg-[#E1F5EE] border-[#5DCAA5] text-[#0F6E56] font-medium" 
                  : "bg-[var(--bg-primary)] border-[var(--border-tertiary)] text-[var(--text-secondary)] hover:border-[var(--border-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {s.icon} {s.name}
            </button>
          ))}
        </div>

        {/* Results Info & Sort */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <span className="text-[13px] text-[var(--text-secondary)]">{providers.length} providers found</span>
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
            Sort by:
            {["Rating", "Distance", "Price"].map(opt => (
              <button
                key={opt}
                onClick={() => setSort(opt)}
                className={`px-2 py-1 rounded-md transition-colors ${
                  sort === opt ? "text-[#1D9E75] font-medium bg-[#E1F5EE]" : "hover:bg-[var(--bg-secondary)]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-[var(--accent)]" size={32} />
            </div>
          ) : providers.length === 0 ? (
            <div className="col-span-full text-center py-20 text-[var(--text-secondary)]">
              No providers match your search criteria.
            </div>
          ) : (
            providers.map((p) => (
              <div 
                key={p.id} 
                className={`bg-[var(--bg-primary)] rounded-xl p-4 transition-colors cursor-pointer group ${
                  p.featured ? "border-2 border-[#1D9E75]" : "border border-[var(--border-tertiary)] hover:border-[var(--border-secondary)]"
                }`}
              >
                {p.featured && (
                  <div className="text-[10px] bg-[#E1F5EE] text-[#0F6E56] px-2 py-0.5 rounded-full font-medium mb-2.5 inline-block">
                    Top rated
                  </div>
                )}
                
                <div className="flex items-start gap-3 mb-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[13px] font-medium shrink-0"
                    style={{ backgroundColor: p.color_bg, color: p.color_text }}
                  >
                    {p.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[var(--text-primary)] truncate">{p.name}</div>
                    <div className="text-xs text-[var(--text-secondary)] truncate">{p.category} · {p.area}, {p.city}</div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${
                    p.is_available ? "bg-[#E1F5EE] text-[#0F6E56]" : "bg-[#F1EFE8] text-[#5F5E5A]"
                  }`}>
                    {p.is_available ? "Available" : "Busy"}
                  </span>
                </div>

                <div className="flex gap-3 mb-3">
                  <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                    <Star size={13} className="text-yellow-500 fill-current" /> {p.rating}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                    <MapPin size={13} /> {p.distance} km
                  </span>
                  <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1">
                    <Briefcase size={13} /> {p.total_jobs} jobs
                  </span>
                </div>

                <div className="text-xs text-[var(--text-secondary)] mb-3 flex items-center gap-1.5">
                  <Banknote size={14} /> PKR {p.price_min.toLocaleString()} – {p.price_max.toLocaleString()} {p.price_unit}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (p.is_available) handleBook(p.category);
                    }}
                    disabled={!p.is_available}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      p.is_available 
                        ? "bg-[#1D9E75] text-white hover:bg-[#0F6E56]" 
                        : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] cursor-not-allowed"
                    }`}
                  >
                    {p.is_available ? "Book now" : "Unavailable"}
                  </button>
                  <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1 group-hover:text-[var(--text-primary)] transition-colors">
                    <ExternalLink size={12} /> View profile
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
