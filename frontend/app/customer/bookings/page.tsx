"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, Search, Calendar, Clock, MapPin, Star, 
  Eye, CreditCard, RefreshCw, Check, X,
  ArrowLeft, ArrowRight, Loader2
} from "lucide-react";
import {
  Snowflake, Droplet, Plug, Home
} from "lucide-react";

// Helper for mapping service names to icons
const getServiceIcon = (service: string, size = 20) => {
  switch (service.toLowerCase()) {
    case "ac technician": return <Snowflake size={size} />;
    case "plumber": return <Droplet size={size} />;
    case "electrician": return <Plug size={size} />;
    case "cleaner": return <Home size={size} />;
    default: return <Star size={size} />;
  }
};

const getServiceIconColor = (service: string) => {
  switch (service.toLowerCase()) {
    case "ac technician": return "text-[#1D9E75] bg-[#E1F5EE] dark:bg-[#0d2e1e]";
    case "electrician": return "text-[#7F77DD] bg-[#EEEDFE] dark:bg-[#1a1e2e]";
    case "plumber": return "text-[#EF9F27] bg-[#FAEEDA] dark:bg-[#1e1a0d]";
    case "cleaner": return "text-[#E24B4A] bg-[#FCEBEB] dark:bg-[#2a1515]";
    default: return "text-[#555] bg-[#eee] dark:bg-[#333]";
  }
};

export default function CustomerBookingsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = ["All", "Confirmed", "Completed", "Cancelled", "Pending payment"];

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8000/api/customer/bookings");
        const data = await res.json();
        setBookings(data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(b => {
    if (filter !== "All" && filter !== "Pending payment" && b.status.toLowerCase() !== filter.toLowerCase()) return false;
    // For pending payment, we might check if price is unpaid, assuming completed=paid for now
    if (filter === "Pending payment" && b.payment_status === "Paid") return false;
    
    if (search && !b.service_type.toLowerCase().includes(search.toLowerCase()) && !b.provider_name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="p-5 max-w-5xl">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-[16px] font-medium text-[var(--text-primary)]">My bookings</h1>
          <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">All your service requests in one place</p>
        </div>
        <button 
          onClick={() => router.push("/chat")}
          className="bg-[#1D9E75] hover:bg-[#0F6E56] text-white border-none px-4 py-2 rounded-md text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus size={16} /> New booking
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md p-3">
          <div className="text-[11px] text-[var(--text-secondary)] mb-1">Total bookings</div>
          <div className="text-[18px] font-medium text-[var(--text-primary)]">12</div>
          <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">All time</div>
        </div>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md p-3">
          <div className="text-[11px] text-[var(--text-secondary)] mb-1">Confirmed</div>
          <div className="text-[18px] font-medium text-[#1D9E75]">1</div>
          <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Upcoming</div>
        </div>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md p-3">
          <div className="text-[11px] text-[var(--text-secondary)] mb-1">Completed</div>
          <div className="text-[18px] font-medium text-[#639922]">9</div>
          <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Finished</div>
        </div>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md p-3">
          <div className="text-[11px] text-[var(--text-secondary)] mb-1">Cancelled</div>
          <div className="text-[18px] font-medium text-[#E24B4A]">2</div>
          <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Refundable</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`border rounded-full px-3.5 py-1.5 text-[12px] transition-colors cursor-pointer ${
              filter === f 
                ? "bg-[#E1F5EE] dark:bg-[#1a2e26] border-[#1D9E75] text-[#1D9E75] font-medium" 
                : "bg-[var(--bg-secondary)] border-[var(--border-secondary)] text-[var(--text-secondary)] hover:border-[#1D9E75] hover:text-[#1D9E75]"
            }`}
          >
            {f} {f === "All" && "(12)"}
          </button>
        ))}
        
        <div className="ml-auto flex items-center gap-1.5 bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md px-2.5 py-1.5 min-w-[160px]">
          <Search size={14} className="text-[var(--text-tertiary)]" />
          <input 
            type="text" 
            placeholder="Search bookings..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-[12px] text-[var(--text-primary)] w-full placeholder:text-[var(--text-tertiary)]"
          />
        </div>
      </div>

      {/* Bookings List */}
      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin text-[var(--accent)]" size={24} />
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-secondary)] text-[13px]">
            No bookings found matching your criteria.
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div 
              key={b.id} 
              className={`bg-[var(--bg-secondary)] border rounded-xl p-4 transition-colors hover:border-[var(--border-hover)] ${
                b.status === "Confirmed" ? "border-[#1D9E75]" : "border-[var(--border-secondary)]"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${getServiceIconColor(b.service_type)}`}>
                    {getServiceIcon(b.service_type, 18)}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="text-[13px] font-medium text-[var(--text-primary)]">{b.service_type}</span>
                      {b.status === "Confirmed" && <span className="text-[10px] bg-[#1D9E75] text-white px-2 py-0.5 rounded-full font-medium ml-2">Today</span>}
                    </div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">{b.provider_name} · {b.area}, {b.city}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-[14px] font-medium ${b.status === "Completed" ? "text-[#639922]" : "text-[var(--text-primary)]"}`}>
                    {b.price}
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${
                    b.status === "Confirmed" ? "bg-[#E1F5EE] dark:bg-[#0d2e1e] text-[#1D9E75] border border-[#1D9E75]/30" :
                    b.status === "Completed" ? "bg-[#EAF3DE] dark:bg-[#1a2a0d] text-[#639922] border border-[#3B6D11]/30" :
                    "bg-[#FCEBEB] dark:bg-[#2a0d0d] text-[#E24B4A] border border-[#791F1F]/30"
                  }`}>
                    {b.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-[11px] text-[var(--text-secondary)] my-3">
                <span className="flex items-center gap-1"><Calendar size={13} /> {b.date}</span>
                <span className="flex items-center gap-1"><Clock size={13} /> {b.time}</span>
                {b.status === "Confirmed" ? (
                  <>
                    <span className="flex items-center gap-1"><MapPin size={13} /> {b.full_address}</span>
                    <span className="flex items-center gap-1"><Star size={13} className="text-[#EF9F27]" /> {b.provider_rating} provider</span>
                  </>
                ) : b.status === "Completed" ? (
                  <span className="flex items-center gap-1 text-[#1D9E75]"><Check size={13} /> Paid</span>
                ) : (
                  <span className="flex items-center gap-1 text-[#E24B4A]"><X size={13} /> Refund pending</span>
                )}
              </div>

              <div className="text-[10px] text-[var(--text-tertiary)] font-mono mt-1">
                {b.booking_ref}
              </div>

              <div className="flex gap-2 mt-3 pt-3 border-t border-[var(--border-secondary)]">
                <button className="bg-[var(--bg-primary)] dark:bg-[#1a2e26] text-[#1D9E75] border border-[#1D9E75] px-3 py-1.5 rounded-md text-[11px] hover:bg-[#1D9E75] hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
                  {b.status === "Confirmed" ? <><Eye size={12} /> View details</> : "View"}
                </button>
                
                {b.status === "Confirmed" && (
                  <button className="bg-[var(--bg-primary)] dark:bg-[#1a2e26] text-[#1D9E75] border border-[#1D9E75] px-3 py-1.5 rounded-md text-[11px] hover:bg-[#1D9E75] hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
                    <CreditCard size={12} /> Pay {b.price}
                  </button>
                )}

                {b.status === "Completed" && (
                  <button className="bg-[var(--bg-primary)] dark:bg-[#2a2010] text-[#EF9F27] border border-[#854F0B] px-3 py-1.5 rounded-md text-[11px] hover:bg-[#854F0B] hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
                    <Star size={12} /> Leave review
                  </button>
                )}

                {b.status === "Confirmed" ? (
                  <button className="ml-auto bg-transparent text-[var(--text-secondary)] border border-[var(--border-tertiary)] px-3 py-1.5 rounded-md text-[11px] hover:text-[#E24B4A] hover:border-[#791F1F] transition-colors cursor-pointer">
                    Cancel
                  </button>
                ) : (
                  <button className="ml-auto bg-[var(--bg-primary)] dark:bg-[#1a2420] text-[var(--text-secondary)] border border-[var(--border-tertiary)] px-3 py-1.5 rounded-md text-[11px] hover:text-[#1D9E75] hover:border-[#1D9E75] transition-colors flex items-center gap-1 cursor-pointer">
                    {b.status === "Completed" ? <RefreshCw size={12} /> : null} Rebook
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--border-secondary)]">
        <span className="text-[12px] text-[var(--text-secondary)]">Showing {filteredBookings.length} of 12 bookings</span>
        <div className="flex gap-1.5">
          <button className="w-7 h-7 flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] cursor-pointer transition-colors">
            <ArrowLeft size={14} />
          </button>
          <button className="w-7 h-7 flex items-center justify-center bg-[#E1F5EE] dark:bg-[#1a2e26] border border-[#1D9E75] rounded-md text-[#1D9E75] font-medium cursor-pointer transition-colors">
            1
          </button>
          <button className="w-7 h-7 flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] cursor-pointer transition-colors">
            2
          </button>
          <button className="w-7 h-7 flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] cursor-pointer transition-colors">
            3
          </button>
          <button className="w-7 h-7 flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] cursor-pointer transition-colors">
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
