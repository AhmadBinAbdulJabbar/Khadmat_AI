"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Check,
  ChevronDown,
  LayoutGrid,
  MapPin,
  Calendar as CalendarIcon,
  Users,
  FileText,
  Sparkles,
  Receipt,
  Banknote,
  Star,
  Wind,
  Droplets,
  Zap,
  BookOpen,
  Home,
  Wrench,
  Paintbrush,
  Shield,
  Loader2,
  CheckCircle2
} from "lucide-react";

// Mock Data
const SERVICES = [
  { name: "AC Technician", icon: Wind },
  { name: "Plumber", icon: Droplets },
  { name: "Electrician", icon: Zap },
  { name: "Tutor", icon: BookOpen },
  { name: "Cleaner", icon: Home },
  { name: "Carpenter", icon: Wrench },
  { name: "Painter", icon: Paintbrush },
  { name: "Security", icon: Shield },
];

const TIME_SLOTS = [
  { time: "8:00 AM", busy: true },
  { time: "9:00 AM", busy: true },
  { time: "10:00 AM", busy: false },
  { time: "11:00 AM", busy: false },
  { time: "12:00 PM", busy: false },
  { time: "1:00 PM", busy: false },
  { time: "2:00 PM", busy: true },
  { time: "3:00 PM", busy: false },
];

const PROVIDERS = [
  {
    id: "p1",
    name: "Ali AC Services",
    initials: "AA",
    bg: "var(--accent-light)",
    color: "var(--accent-dark)",
    rating: 4.7,
    distance: "2.1 km",
    jobs: 212,
    priceRange: "PKR 800–1500",
  },
  {
    id: "p2",
    name: "Hassan Cooling Co.",
    initials: "HC",
    bg: "var(--feat-blue)",
    color: "var(--feat-blue-text)",
    rating: 4.3,
    distance: "3.4 km",
    jobs: 98,
    priceRange: "PKR 700–1200",
  },
  {
    id: "p3",
    name: "Cool Breeze AC",
    initials: "CB",
    bg: "var(--feat-yellow)",
    color: "var(--feat-yellow-text)",
    rating: 4.1,
    distance: "4.8 km",
    jobs: 54,
    priceRange: "PKR 750–1400",
  },
];

function BookingForm() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "AC Technician";

  // Form State
  const [selectedService, setSelectedService] = useState(initialService);
  const [city, setCity] = useState("Islamabad");
  const [area, setArea] = useState("G-13");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("2026-05-21");
  const [timeOfDay, setTimeOfDay] = useState("Morning (10AM)");
  const [timeSlot, setTimeSlot] = useState("10:00 AM");
  const [selectedProvider, setSelectedProvider] = useState<string>("p1");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [error, setError] = useState("");

  const providerObj = PROVIDERS.find((p) => p.id === selectedProvider);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8001/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_type: selectedService,
          description: notes || "No additional notes",
          location: `${address ? address + ", " : ""}${area}, ${city}`,
          date: date,
          time: timeSlot,
          phone: "0300-0000000", // Defaulting for mock
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to submit booking");

      setSuccessData(data.booking);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-md bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-2xl p-8 text-center shadow-sm animate-fade-in-up">
          <div className="w-16 h-16 bg-[var(--accent-light)] text-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-[var(--text-secondary)] mb-6 text-sm">
            {successData.message}
          </p>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Booking ID:</span>
              <span className="font-medium text-[var(--text-primary)] truncate max-w-[150px]">
                {successData.id}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Service:</span>
              <span className="font-medium text-[var(--text-primary)]">
                {successData.service_type}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Status:</span>
              <span className="font-medium text-[var(--accent)] capitalize">
                {successData.status}
              </span>
            </div>
          </div>
          <Link
            href="/"
            className="block w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-secondary)] font-medium py-3 rounded-lg hover:bg-[var(--border-tertiary)] transition-all no-underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-0 min-h-[calc(100vh-57px)]">
      {/* Left Column: Form Details */}
      <div className="p-5 md:p-8 border-r border-[var(--border-tertiary)] bg-[var(--bg-primary)]">
        
        {/* Step Bar */}
        <div className="flex items-center mb-8 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 flex-1 min-w-max">
            <div className="w-6 h-6 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-[11px] font-medium shrink-0">
              <Check size={14} />
            </div>
            <span className="text-[11px] text-[var(--text-secondary)] whitespace-nowrap">Service</span>
          </div>
          <div className="h-[1px] flex-1 bg-[var(--border-tertiary)] mx-2 min-w-[20px]"></div>
          
          <div className="flex items-center gap-2 flex-1 min-w-max">
            <div className="w-6 h-6 rounded-full bg-[var(--accent-light)] text-[var(--accent-dark)] border border-[var(--accent)] flex items-center justify-center text-[11px] font-medium shrink-0">
              2
            </div>
            <span className="text-[11px] text-[var(--accent-dark)] font-medium whitespace-nowrap">Details</span>
          </div>
          <div className="h-[1px] flex-1 bg-[var(--border-tertiary)] mx-2 min-w-[20px]"></div>
          
          <div className="flex items-center gap-2 flex-1 min-w-max">
            <div className="w-6 h-6 rounded-full bg-[var(--bg-secondary)] text-[var(--text-tertiary)] border border-[var(--border-tertiary)] flex items-center justify-center text-[11px] font-medium shrink-0">
              3
            </div>
            <span className="text-[11px] text-[var(--text-secondary)] whitespace-nowrap">Provider</span>
          </div>
          <div className="h-[1px] flex-1 bg-[var(--border-tertiary)] mx-2 min-w-[20px]"></div>
          
          <div className="flex items-center gap-2 flex-1 min-w-max">
            <div className="w-6 h-6 rounded-full bg-[var(--bg-secondary)] text-[var(--text-tertiary)] border border-[var(--border-tertiary)] flex items-center justify-center text-[11px] font-medium shrink-0">
              4
            </div>
            <span className="text-[11px] text-[var(--text-secondary)] whitespace-nowrap">Confirm</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Services Grid */}
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
          <LayoutGrid size={16} className="text-[var(--accent)]" />
          Choose a service
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          {SERVICES.map((svc) => {
            const Icon = svc.icon;
            const isSel = selectedService === svc.name;
            return (
              <div
                key={svc.name}
                onClick={() => setSelectedService(svc.name)}
                className={`border rounded-lg p-3 text-center cursor-pointer transition-all ${
                  isSel
                    ? "border-[var(--accent)] bg-[var(--accent-light)] border-[1.5px]"
                    : "border-[var(--border-tertiary)] bg-[var(--bg-primary)] hover:border-[var(--accent)]"
                }`}
              >
                <Icon
                  size={20}
                  className={`mx-auto mb-1.5 ${
                    isSel ? "text-[var(--accent-dark)]" : "text-[var(--text-secondary)]"
                  }`}
                />
                <span className={`text-[11px] ${isSel ? "text-[var(--text-primary)] font-medium" : "text-[var(--text-primary)]"}`}>
                  {svc.name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="h-[1px] bg-[var(--border-tertiary)] my-6" />

        {/* Location */}
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
          <MapPin size={16} className="text-[var(--accent)]" />
          Location
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs text-[var(--text-secondary)] mb-1">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] transition-all cursor-pointer"
            >
              <option>Islamabad</option>
              <option>Karachi</option>
              <option>Lahore</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-[var(--text-secondary)] mb-1">Area / Sector</label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] transition-all cursor-pointer"
            >
              <option>G-13</option>
              <option>G-10</option>
              <option>F-8</option>
              <option>F-10</option>
              <option>DHA</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs text-[var(--text-secondary)] mb-1">Street address (optional)</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="House 12, Street 4, G-13/2"
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] transition-all placeholder:text-[var(--text-tertiary)]"
          />
        </div>

        <div className="h-[1px] bg-[var(--border-tertiary)] my-6" />

        {/* Date & Time */}
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
          <CalendarIcon size={16} className="text-[var(--accent)]" />
          Date & time
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs text-[var(--text-secondary)] mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs text-[var(--text-secondary)] mb-1">Preferred time</label>
            <select
              value={timeOfDay}
              onChange={(e) => setTimeOfDay(e.target.value)}
              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] transition-all cursor-pointer"
            >
              <option>Morning (8AM–12PM)</option>
              <option>Morning (10AM)</option>
              <option>Afternoon (12–4PM)</option>
              <option>Evening (4–8PM)</option>
            </select>
          </div>
        </div>
        
        <label className="block text-xs text-[var(--text-secondary)] mb-1.5">Pick a time slot</label>
        <div className="grid grid-cols-4 gap-1.5 mb-6">
          {TIME_SLOTS.map((ts) => {
            const isSel = timeSlot === ts.time && !ts.busy;
            return (
              <div
                key={ts.time}
                onClick={() => !ts.busy && setTimeSlot(ts.time)}
                className={`border rounded-lg py-1.5 px-1 text-center text-[11px] transition-all ${
                  ts.busy
                    ? "bg-[var(--bg-secondary)] text-[var(--text-tertiary)] cursor-not-allowed line-through border-[var(--border-tertiary)]"
                    : isSel
                    ? "bg-[var(--accent-light)] text-[var(--accent-dark)] border-[var(--accent)] font-medium cursor-pointer"
                    : "bg-[var(--bg-primary)] text-[var(--text-secondary)] border-[var(--border-tertiary)] hover:border-[var(--accent)] hover:text-[var(--accent-dark)] cursor-pointer"
                }`}
              >
                {ts.time}
              </div>
            );
          })}
        </div>

        <div className="h-[1px] bg-[var(--border-tertiary)] my-6" />

        {/* Choose a provider */}
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
          <Users size={16} className="text-[var(--accent)]" />
          Choose a provider
        </div>
        <div className="flex flex-col gap-2 mb-6">
          {PROVIDERS.map((p) => {
            const isSel = selectedProvider === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedProvider(p.id)}
                className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                  isSel
                    ? "border-[var(--accent)] border-[1.5px] bg-[var(--accent-light)]"
                    : "border-[var(--border-tertiary)] bg-[var(--bg-primary)] hover:border-[var(--accent)]"
                }`}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-medium shrink-0"
                  style={{ background: p.bg, color: p.color }}
                >
                  {p.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-[var(--text-primary)] truncate">
                    {p.name}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] mt-0.5">
                    <span className="flex items-center gap-0.5">
                      <Star size={10} className="fill-current" /> {p.rating}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <MapPin size={10} /> {p.distance}
                    </span>
                    <span>{p.jobs} jobs</span>
                  </div>
                </div>
                <div className="text-[12px] text-[var(--text-secondary)] whitespace-nowrap hidden sm:block">
                  {p.priceRange}
                </div>
                <div
                  className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center ${
                    isSel
                      ? "border-[var(--accent)] bg-[var(--accent)]"
                      : "border-[var(--border-secondary)] bg-transparent"
                  }`}
                >
                  {isSel && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-[1px] bg-[var(--border-tertiary)] my-6" />

        {/* Additional notes */}
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
          <FileText size={16} className="text-[var(--accent)]" />
          Additional notes
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Describe the issue — e.g. AC is not cooling, making noise, needs gas refill..."
          className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg p-3 text-[13px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] transition-all resize-none placeholder:text-[var(--text-tertiary)]"
        />

      </div>

      {/* Right Column: Sidebar */}
      <div className="p-5 md:p-6 bg-[var(--bg-secondary)] border-l border-[var(--border-tertiary)] lg:border-l-0 lg:border-r-0 border-t lg:border-t-0">
        
        {/* AI Banner */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-2.5 mb-4 flex items-center gap-2 cursor-pointer hover:border-[var(--accent)] group transition-all">
          <Sparkles size={16} className="text-[var(--accent)] shrink-0" />
          <div>
            <div className="text-xs font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-dark)] transition-colors">
              Let AI book for you
            </div>
            <div className="text-[11px] text-[var(--text-secondary)]">
              Just describe in Urdu or English ↗
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-3.5 mb-3">
          <div className="text-[13px] font-medium text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
            <Receipt size={14} className="text-[var(--text-secondary)]" />
            Booking summary
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs border-b border-[var(--border-tertiary)] pb-1.5">
              <span className="text-[var(--text-secondary)]">Service</span>
              <span className="font-medium text-[var(--text-primary)] text-right">{selectedService}</span>
            </div>
            <div className="flex justify-between text-xs border-b border-[var(--border-tertiary)] pb-1.5">
              <span className="text-[var(--text-secondary)]">Provider</span>
              <span className="font-medium text-[var(--text-primary)] text-right">{providerObj?.name || "—"}</span>
            </div>
            <div className="flex justify-between text-xs border-b border-[var(--border-tertiary)] pb-1.5">
              <span className="text-[var(--text-secondary)]">Date</span>
              <span className="font-medium text-[var(--text-primary)] text-right">{date}</span>
            </div>
            <div className="flex justify-between text-xs border-b border-[var(--border-tertiary)] pb-1.5">
              <span className="text-[var(--text-secondary)]">Time</span>
              <span className="font-medium text-[var(--text-primary)] text-right">{timeSlot}</span>
            </div>
            <div className="flex justify-between text-xs border-b border-[var(--border-tertiary)] pb-1.5">
              <span className="text-[var(--text-secondary)]">Location</span>
              <span className="font-medium text-[var(--text-primary)] text-right">{area}, {city}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-secondary)]">Rating</span>
              <span className="font-medium text-[var(--accent)] text-right flex items-center gap-0.5 justify-end">
                <Star size={10} className="fill-current" /> {providerObj?.rating || "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Price Card */}
        <div className="bg-[var(--accent-light)] border border-[var(--accent-border)] rounded-xl p-3.5 mb-4">
          <div className="text-[13px] font-medium text-[var(--accent-text)] mb-3 flex items-center gap-1.5">
            <Banknote size={14} />
            Price estimate
          </div>
          <div className="space-y-1.5 text-xs text-[var(--accent-text)]">
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>{providerObj?.priceRange || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span>Platform fee</span>
              <span>PKR 50</span>
            </div>
            <div className="flex justify-between font-medium pt-2 mt-1 border-t border-[var(--accent-border)] text-sm">
              <span>Total estimate</span>
              <span>{providerObj ? `PKR ${providerObj.priceRange.split(" ")[1]} + 50` : "—"}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--accent)] text-white text-[13px] font-medium py-2.5 rounded-lg flex items-center justify-center gap-1.5 hover:bg-[var(--accent-dark)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              Confirm booking
            </>
          )}
        </button>
        <div className="text-[11px] text-[var(--text-tertiary)] text-center mt-2.5">
          You can cancel up to 2 hours before the appointment
        </div>
      </div>
    </form>
  );
}

export default function BookServicePage() {
  return (
    <div className="bg-[var(--bg-primary)]">
      {/* Navbar overlay similar to the one in page.tsx */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border-tertiary)] sticky top-0 z-10 bg-[var(--bg-primary)]/95 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 no-underline group">
          <div className="w-6 h-6 bg-[var(--accent)] rounded flex items-center justify-center text-white text-xs font-semibold group-hover:scale-105 transition-transform">
            K
          </div>
          <span className="text-[13px] font-medium text-[var(--text-primary)]">
            Khadmat AI
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[var(--feat-purple)] border border-[#CECBF6] flex items-center justify-center text-[10px] font-medium text-[#3C3489]">
            AU
          </div>
          <span className="text-xs text-[var(--text-secondary)] hidden sm:block">
            Ahmed Usman
          </span>
          <ChevronDown size={14} className="text-[var(--text-tertiary)]" />
        </div>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[70vh]">
            <Loader2 className="animate-spin text-[var(--accent)]" size={32} />
          </div>
        }
      >
        <BookingForm />
      </Suspense>

      {/* Floating AI Button */}
      <Link href="/chat" className="fixed bottom-6 right-6 w-14 h-14 bg-[var(--accent)] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[var(--accent-dark)] hover:scale-105 transition-all z-50 group no-underline">
        <Sparkles size={24} className="group-hover:animate-pulse" />
      </Link>
    </div>
  );
}
