"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Calendar,
  Clock,
  Banknote,
  Eye,
  Bell,
  X,
  Star,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  Loader2
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  
  const [stats, setStats] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const statsRes = await fetch("http://localhost:8001/api/bookings/stats");
      const statsData = await statsRes.json();
      setStats(statsData);

      const qs = new URLSearchParams({
        page: page.toString(),
        limit: "4"
      });
      if (filter !== "All") qs.append("status", filter.toUpperCase());
      if (search) qs.append("search", search);

      const listRes = await fetch(`http://localhost:8001/api/bookings?${qs.toString()}`);
      const listData = await listRes.json();
      
      setBookings(listData.bookings);
      setTotalPages(listData.pages);
      setTotalItems(listData.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDashboardData();
    }, 300);
    return () => clearTimeout(timer);
  }, [filter, search, page]);

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await fetch(`http://localhost:8001/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" })
      });
      fetchDashboardData();
    } catch (err) {
      alert("Failed to cancel booking.");
    }
  };

  const handleRate = async (id: string) => {
    const rating = prompt("Rate provider (1-5):", "5");
    if (!rating) return;
    try {
      await fetch(`http://localhost:8001/api/bookings/${id}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: parseInt(rating), review_text: "Good" })
      });
      alert("Thanks for your rating!");
    } catch (err) {
      alert("Failed to submit rating.");
    }
  };

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
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[var(--feat-purple)] border border-[#CECBF6] flex items-center justify-center text-[10px] font-medium text-[#3C3489]">
            AU
          </div>
          <span className="text-xs text-[var(--text-secondary)] hidden sm:block">
            Ahmed Usman
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 max-w-3xl mx-auto mt-4">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-medium text-[var(--text-primary)]">My bookings</h1>
            <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">All your service bookings in one place</p>
          </div>
          <Link href="/book" className="bg-[#1D9E75] text-white px-4 py-2 rounded-lg text-[13px] font-medium hover:bg-[#0F6E56] transition-colors flex items-center gap-1.5 no-underline">
            <Plus size={16} /> New booking
          </Link>
        </div>

        {/* Stats Row */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
            <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
              <div className="text-[11px] text-[var(--text-secondary)] mb-1">Total bookings</div>
              <div className="text-xl font-medium text-[var(--text-primary)]">{stats.total}</div>
            </div>
            <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
              <div className="text-[11px] text-[var(--text-secondary)] mb-1">Confirmed</div>
              <div className="text-xl font-medium text-[#1D9E75]">{stats.confirmed}</div>
            </div>
            <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
              <div className="text-[11px] text-[var(--text-secondary)] mb-1">Completed</div>
              <div className="text-xl font-medium text-[#3B6D11]">{stats.completed}</div>
            </div>
            <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
              <div className="text-[11px] text-[var(--text-secondary)] mb-1">Cancelled</div>
              <div className="text-xl font-medium text-[#A32D2D]">{stats.cancelled}</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-5">
          <div className="flex flex-wrap gap-2">
            {["All", "Confirmed", "Completed", "Cancelled"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`border rounded-full px-3.5 py-1.5 text-xs transition-colors ${
                  filter === f 
                    ? "bg-[#E1F5EE] border-[#5DCAA5] text-[#0F6E56] font-medium" 
                    : "bg-[var(--bg-primary)] border-[var(--border-tertiary)] text-[var(--text-secondary)] hover:border-[var(--border-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg px-3 py-1.5 sm:ml-auto focus-within:border-[var(--border-secondary)] transition-colors">
            <Search size={14} className="text-[var(--text-tertiary)]" />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-[var(--text-primary)] w-full sm:w-32 placeholder:text-[var(--text-tertiary)]"
            />
          </div>
        </div>

        {/* Bookings List */}
        <div className="flex flex-col gap-3">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="animate-spin text-[var(--accent)]" size={24} />
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-10 text-[var(--text-secondary)]">
              No bookings found.
            </div>
          ) : (
            bookings.map((b) => (
              <div key={b.id} className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-4 sm:p-5 hover:border-[var(--border-secondary)] transition-colors">
                <div className="flex items-start justify-between mb-2.5">
                  <div>
                    <div className="text-sm font-medium text-[var(--text-primary)]">{b.service_type}</div>
                    <div className="text-xs text-[var(--text-secondary)] mt-0.5">{b.provider_name} · {b.area}, {b.city}</div>
                  </div>
                  <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${
                    b.status === 'CONFIRMED' ? 'bg-[#E1F5EE] text-[#0F6E56]' :
                    b.status === 'COMPLETED' ? 'bg-[#EAF3DE] text-[#3B6D11]' :
                    b.status === 'CANCELLED' ? 'bg-[#FCEBEB] text-[#A32D2D]' :
                    'bg-[#FAEEDA] text-[#854F0B]'
                  }`}>
                    {b.status === 'CONFIRMED' ? 'Confirmed' : b.status === 'COMPLETED' ? 'Completed' : b.status === 'CANCELLED' ? 'Cancelled' : 'Pending'}
                  </span>
                </div>
                
                <div className="flex gap-4 flex-wrap mb-1.5">
                  <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1.5"><Calendar size={13} /> {b.scheduled_time.split(' ').slice(0,4).join(' ')}</span>
                  <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1.5"><Clock size={13} /> {b.scheduled_time.split(' ').slice(4).join(' ')}</span>
                  <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1.5"><Banknote size={13} /> {b.price_estimate}</span>
                </div>
                <div className="font-mono text-[11px] text-[var(--text-tertiary)] mt-1.5">{b.booking_ref}</div>
                
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[var(--border-tertiary)] flex-wrap">
                  <Link href={`/booking/${b.id}`} className="text-xs text-[#1D9E75] flex items-center gap-1.5 hover:text-[#0F6E56] no-underline">
                    <Eye size={14} /> View receipt
                  </Link>
                  
                  {b.status === "CONFIRMED" && (
                    <>
                      <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1.5">
                        <Bell size={14} /> {b.reminder || "Reminder set"}
                      </span>
                      <button onClick={() => handleCancel(b.id)} className="text-xs text-[#A32D2D] flex items-center gap-1.5 hover:text-[#7A2121] ml-auto">
                        <X size={14} /> Cancel
                      </button>
                    </>
                  )}
                  
                  {b.status === "COMPLETED" && (
                    <>
                      <button onClick={() => handleRate(b.id)} className="text-xs text-[var(--text-primary)] flex items-center gap-1.5 hover:text-[#F59E0B]">
                        <Star size={14} /> Rate provider
                      </button>
                      <Link href={`/book?service=${encodeURIComponent(b.service_type)}`} className="text-xs text-[var(--text-secondary)] flex items-center gap-1.5 hover:text-[var(--text-primary)] ml-auto no-underline">
                        <RefreshCw size={14} /> Book again
                      </Link>
                    </>
                  )}
                  
                  {b.status === "CANCELLED" && (
                    <Link href={`/book?service=${encodeURIComponent(b.service_type)}`} className="text-xs text-[var(--text-secondary)] flex items-center gap-1.5 hover:text-[var(--text-primary)] ml-auto no-underline">
                      <RefreshCw size={14} /> Rebook
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && bookings.length > 0 && (
          <div className="flex items-center justify-between mt-6 pt-5 border-t border-[var(--border-tertiary)]">
            <span className="text-xs text-[var(--text-secondary)]">Showing {bookings.length} of {totalItems} bookings</span>
            <div className="flex gap-1">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="w-7 h-7 border border-[var(--border-tertiary)] rounded-md flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--border-secondary)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={14} />
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-7 h-7 border rounded-md flex items-center justify-center text-xs transition-colors ${
                    page === i + 1 
                      ? "bg-[#E1F5EE] border-[#5DCAA5] text-[#0F6E56] font-medium" 
                      : "bg-[var(--bg-primary)] border-[var(--border-tertiary)] text-[var(--text-secondary)] hover:border-[var(--border-secondary)]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="w-7 h-7 border border-[var(--border-tertiary)] rounded-md flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--border-secondary)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
