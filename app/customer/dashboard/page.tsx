"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MessageCircle, Clock, CalendarCheck,
  Banknote, Star, Users, Wrench, Receipt, Loader2
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Stats = { total: number; confirmed: number; completed: number; cancelled: number; pending: number };
type Booking = {
  id: string; booking_ref: string; service_type: string; provider_name: string;
  area: string; city: string; scheduled_time: string; status: string; price_estimate: string;
};

export default function CustomerDashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("there");
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [upcomingBooking, setUpcomingBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("khadmat_user");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        const first = (u.name || u.email || "").split(" ")[0];
        if (first) setUserName(first);
      } catch {}
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [statsRes, bookingsRes] = await Promise.all([
          fetch(`${API}/api/bookings/stats`),
          fetch(`${API}/api/bookings?limit=4`),
        ]);
        const statsData = await statsRes.json();
        const bookingsData = await bookingsRes.json();
        setStats(statsData);
        const bookings: Booking[] = bookingsData.bookings ?? [];
        setRecentBookings(bookings);
        const upcoming = bookings.find((b) => b.status === "CONFIRMED");
        setUpcomingBooking(upcoming ?? null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED": return "bg-[#E1F5EE] text-[#085041]";
      case "COMPLETED": return "bg-[#EAF3DE] text-[#27500A]";
      case "CANCELLED": return "bg-[#FCEBEB] text-[#791F1F]";
      default: return "bg-[#FAEEDA] text-[#633806]";
    }
  };

  const statusLabel = (status: string) => {
    const map: Record<string, string> = {
      CONFIRMED: "Confirmed", COMPLETED: "Completed",
      CANCELLED: "Cancelled", PENDING: "Pending",
    };
    return map[status] ?? status;
  };

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="p-5 max-w-5xl">
      {/* Welcome & Action */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-5 gap-3">
        <div>
          <div className="text-[18px] font-medium text-[var(--text-primary)] mb-1">
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"}, {userName}
          </div>
          <div className="text-[13px] text-[var(--text-secondary)]">{today}</div>
        </div>
        <button
          onClick={() => router.push("/chat")}
          className="bg-[#1D9E75] text-white border-none px-4 py-2 rounded-md text-[13px] font-medium cursor-pointer hover:bg-[#0F6E56] transition-colors flex items-center gap-1.5"
        >
          <MessageCircle size={16} /> Book a service
        </button>
      </div>

      {/* Upcoming Booking */}
      {upcomingBooking && (
        <div className="bg-[#E1F5EE] border border-[#9FE1CB] rounded-xl p-4 mb-5 flex items-center gap-3.5">
          <div className="w-10 h-10 bg-[#1D9E75] rounded-[10px] flex items-center justify-center text-white shrink-0">
            <Clock size={20} />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-medium text-[#085041] mb-0.5">
              Upcoming: {upcomingBooking.service_type} — {upcomingBooking.provider_name}
            </div>
            <div className="text-[12px] text-[#0F6E56] flex items-center gap-1 flex-wrap">
              <Clock size={12} /> {upcomingBooking.scheduled_time} · {upcomingBooking.area}, {upcomingBooking.city} · {upcomingBooking.price_estimate}
            </div>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={() => router.push(`/booking/${upcomingBooking.id}`)}
              className="bg-[#1D9E75] text-white border border-[#1D9E75] px-3 py-1.5 rounded-md text-[11px] font-medium cursor-pointer hover:bg-[#0F6E56] transition-colors"
            >
              View details
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin text-[var(--accent)]" size={24} />
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
          <div className="bg-[var(--bg-secondary)] rounded-md p-3">
            <div className="text-[11px] text-[var(--text-secondary)] mb-1 flex items-center gap-1">
              <CalendarCheck size={12} /> Total bookings
            </div>
            <div className="text-[20px] font-medium text-[var(--text-primary)]">{stats.total}</div>
            <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Since joining</div>
          </div>
          <div className="bg-[var(--bg-secondary)] rounded-md p-3">
            <div className="text-[11px] text-[var(--text-secondary)] mb-1 flex items-center gap-1">
              <Banknote size={12} /> Confirmed
            </div>
            <div className="text-[20px] font-medium text-[#1D9E75]">{stats.confirmed}</div>
            <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Active bookings</div>
          </div>
          <div className="bg-[var(--bg-secondary)] rounded-md p-3">
            <div className="text-[11px] text-[var(--text-secondary)] mb-1 flex items-center gap-1">
              <Star size={12} /> Completed
            </div>
            <div className="text-[20px] font-medium text-[var(--text-primary)]">{stats.completed}</div>
            <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Jobs done</div>
          </div>
          <div className="bg-[var(--bg-secondary)] rounded-md p-3">
            <div className="text-[11px] text-[var(--text-secondary)] mb-1 flex items-center gap-1">
              <Users size={12} /> Cancelled
            </div>
            <div className="text-[20px] font-medium text-[var(--text-primary)]">{stats.cancelled}</div>
            <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Total cancelled</div>
          </div>
        </div>
      ) : null}

      {/* Quick Actions */}
      <div className="text-[13px] font-medium text-[var(--text-primary)] mb-2.5">Quick actions</div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-5">
        <div
          onClick={() => router.push("/chat")}
          className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-3 text-center cursor-pointer hover:border-[#1D9E75] hover:bg-[#E1F5EE] transition-colors"
        >
          <MessageCircle size={22} className="text-[#1D9E75] mx-auto mb-1.5" />
          <span className="text-[12px] text-[var(--text-primary)]">AI booking</span>
        </div>
        <div
          onClick={() => router.push("/book")}
          className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-3 text-center cursor-pointer hover:border-[#1D9E75] hover:bg-[#E1F5EE] transition-colors"
        >
          <Wrench size={22} className="text-[#1D9E75] mx-auto mb-1.5" />
          <span className="text-[12px] text-[var(--text-primary)]">Manual booking</span>
        </div>
        <div
          onClick={() => router.push("/providers")}
          className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-3 text-center cursor-pointer hover:border-[#1D9E75] hover:bg-[#E1F5EE] transition-colors"
        >
          <Users size={22} className="text-[#1D9E75] mx-auto mb-1.5" />
          <span className="text-[12px] text-[var(--text-primary)]">Browse providers</span>
        </div>
        <div
          onClick={() => router.push("/customer/billing")}
          className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-3 text-center cursor-pointer hover:border-[#1D9E75] hover:bg-[#E1F5EE] transition-colors"
        >
          <Receipt size={22} className="text-[#1D9E75] mx-auto mb-1.5" />
          <span className="text-[12px] text-[var(--text-primary)]">Billing</span>
        </div>
      </div>

      {/* Recent Bookings */}
      {recentBookings.length > 0 && (
        <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-[var(--border-tertiary)]">
            <span className="text-[13px] font-medium text-[var(--text-primary)]">Recent bookings</span>
            <span
              onClick={() => router.push("/customer/bookings")}
              className="text-[12px] text-[#1D9E75] cursor-pointer hover:underline"
            >
              See all
            </span>
          </div>
          <div className="flex flex-col">
            {recentBookings.map((b, i) => (
              <div
                key={b.id}
                onClick={() => router.push(`/booking/${b.id}`)}
                className={`flex items-center gap-2.5 p-2.5 cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors ${i < recentBookings.length - 1 ? "border-b border-[var(--border-tertiary)]" : ""}`}
              >
                <div className="w-8 h-8 bg-[#E1F5EE] rounded-lg flex items-center justify-center shrink-0 text-[11px] font-medium text-[#0F6E56]">
                  {b.service_type.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="text-[12px] font-medium text-[var(--text-primary)]">{b.service_type}</div>
                  <div className="text-[11px] text-[var(--text-secondary)] mt-px">{b.provider_name} · {b.scheduled_time.split(" ").slice(0, 3).join(" ")}</div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] font-medium text-[var(--text-primary)]">{b.price_estimate}</div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium mt-0.5 inline-block ${statusBadge(b.status)}`}>
                    {statusLabel(b.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
