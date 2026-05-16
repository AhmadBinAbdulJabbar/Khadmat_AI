"use client";

import { useEffect, useState, useRef } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronRight,
  Check,
  Wrench,
  Calendar,
  MapPin,
  Banknote,
  CheckCircle2,
  Bell,
  LayoutDashboard,
  Plus,
  Download,
  Loader2,
  Star
} from "lucide-react";

export default function BookingReceiptPage() {
  const params = useParams();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`http://localhost:8001/api/bookings/${params.id}`);
        if (!res.ok) throw new Error("Failed to load booking details");
        const data = await res.json();
        setBooking(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBooking();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--bg-primary)]">
        <Loader2 className="animate-spin text-[var(--accent)]" size={32} />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-primary)]">
        <p className="text-red-500 mb-4">{error || "Booking not found"}</p>
        <Link href="/" className="text-[var(--accent)] hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  const handleDownload = async () => {
    if (!receiptRef.current || downloading) return;
    
    setDownloading(true);
    try {
      const imgData = await toPng(receiptRef.current, {
        quality: 1.0,
        backgroundColor: "#ffffff",
        pixelRatio: 2
      });
      
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Khadmat_AI_Receipt_${booking?.booking_ref || "download"}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF", err);
      alert("Failed to download receipt. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-[var(--bg-primary)] min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 mb-5 text-xs text-[var(--text-tertiary)]">
        <Link href="/" className="hover:text-[var(--text-secondary)] transition-colors no-underline text-inherit">Home</Link>
        <ChevronRight size={12} />
        <Link href="/book" className="hover:text-[var(--text-secondary)] transition-colors no-underline text-inherit">Book a service</Link>
        <ChevronRight size={12} />
        <span className="text-[var(--text-primary)]">Confirmation</span>
      </div>

      <div ref={receiptRef} className="bg-[var(--bg-primary)] p-4 -mx-4 sm:-mx-6 sm:px-6 rounded-xl">
        {/* Success Banner */}
        <div className="bg-[#E1F5EE] border border-[#5DCAA5] rounded-xl p-4 sm:p-5 flex items-center gap-3.5 mb-6">
        <div className="w-10 h-10 bg-[#1D9E75] rounded-full flex items-center justify-center shrink-0 text-white shadow-sm">
          <Check size={20} />
        </div>
        <div>
          <div className="text-[15px] font-medium text-[#085041] mb-0.5">
            Booking confirmed!
          </div>
          <div className="text-xs text-[#0F6E56]">
            {booking.provider.name} has been booked for {booking.scheduled_time}. A reminder will be sent at {booking.reminder.trigger_at}.
          </div>
        </div>
      </div>

      {/* Receipt Card */}
      <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl overflow-hidden mb-4 shadow-sm">
        <div className="p-4 sm:px-5 border-b border-[var(--border-tertiary)] flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--text-primary)]">Booking receipt</span>
          <span className="text-xs text-[var(--text-secondary)] font-mono">{booking.booking_ref}</span>
        </div>
        <div className="py-1">
          <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 border-b border-[var(--border-tertiary)]">
            <span className="text-[13px] text-[var(--text-secondary)] flex items-center gap-2">
              <Wrench size={15} /> Service
            </span>
            <span className="text-[13px] text-[var(--text-primary)] font-medium text-right">
              {booking.service_type}
            </span>
          </div>
          <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 border-b border-[var(--border-tertiary)]">
            <span className="text-[13px] text-[var(--text-secondary)] flex items-center gap-2">
              <Calendar size={15} /> Date & time
            </span>
            <span className="text-[13px] text-[var(--text-primary)] font-medium text-right">
              {booking.scheduled_time}
            </span>
          </div>
          <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 border-b border-[var(--border-tertiary)]">
            <span className="text-[13px] text-[var(--text-secondary)] flex items-center gap-2">
              <MapPin size={15} /> Location
            </span>
            <span className="text-[13px] text-[var(--text-primary)] font-medium text-right">
              {booking.area}, {booking.provider.city}
            </span>
          </div>
          <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 border-b border-[var(--border-tertiary)]">
            <span className="text-[13px] text-[var(--text-secondary)] flex items-center gap-2">
              <Banknote size={15} /> Price estimate
            </span>
            <span className="text-[13px] text-[var(--text-primary)] font-medium text-right">
              {booking.price_estimate}
            </span>
          </div>
          <div className="flex items-center justify-between px-4 sm:px-5 py-2.5">
            <span className="text-[13px] text-[var(--text-secondary)] flex items-center gap-2">
              <CheckCircle2 size={15} /> Status
            </span>
            <span className="text-[13px] font-medium text-right">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#E1F5EE] text-[#0F6E56]">
                {booking.status}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Provider Card */}
      <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-4 sm:px-5 mb-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#E1F5EE] border border-[#9FE1CB] text-[#0F6E56] rounded-xl flex items-center justify-center text-[13px] font-medium shrink-0">
            {booking.provider.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-medium text-[var(--text-primary)]">{booking.provider.name}</div>
            <div className="text-xs text-[var(--text-secondary)]">
              {booking.provider.category} · {booking.provider.area}, {booking.provider.city}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center bg-[var(--bg-secondary)] rounded-lg p-2">
            <div className="text-[13px] font-medium text-[var(--text-primary)] flex items-center justify-center gap-1">
              {booking.provider.rating} <Star size={12} className="fill-current text-yellow-500" />
            </div>
            <div className="text-[11px] text-[var(--text-secondary)]">Rating</div>
          </div>
          <div className="text-center bg-[var(--bg-secondary)] rounded-lg p-2">
            <div className="text-[13px] font-medium text-[var(--text-primary)]">{booking.provider.distance} km</div>
            <div className="text-[11px] text-[var(--text-secondary)]">Distance</div>
          </div>
          <div className="text-center bg-[var(--bg-secondary)] rounded-lg p-2">
            <div className="text-[13px] font-medium text-[var(--text-primary)]">{booking.provider.phone}</div>
            <div className="text-[11px] text-[var(--text-secondary)]">Contact</div>
          </div>
        </div>
      </div>

      {/* Reminder Card */}
      <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-4 sm:px-5 mb-5 flex items-center gap-3 shadow-sm">
        <div className="w-9 h-9 bg-[#FAEEDA] rounded-lg flex items-center justify-center text-[#854F0B] shrink-0">
          <Bell size={18} />
        </div>
        <div>
          <div className="text-[13px] font-medium text-[var(--text-primary)] mb-0.5">
            Reminder scheduled
          </div>
          <div className="text-xs text-[var(--text-secondary)]">
            You'll be notified at {booking.reminder.trigger_at}
          </div>
        </div>
        <span className="ml-auto text-[11px] bg-[#FAEEDA] text-[#854F0B] px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
          {booking.reminder.trigger_at.split("T").pop() || "9:00 AM"}
        </span>
      </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2.5 flex-wrap">
        <Link href="/dashboard" className="bg-[#1D9E75] text-white px-4 py-2.5 rounded-lg text-[13px] font-medium hover:bg-[#0F6E56] transition-colors flex items-center gap-1.5 no-underline">
          <LayoutDashboard size={16} /> View my bookings
        </Link>
        <Link href="/book" className="bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-secondary)] px-4 py-2.5 rounded-lg text-[13px] hover:bg-[var(--bg-secondary)] transition-colors flex items-center gap-1.5 no-underline">
          <Plus size={16} /> Book another service
        </Link>
        <button onClick={handleDownload} disabled={downloading} className="bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-secondary)] px-4 py-2.5 rounded-lg text-[13px] hover:bg-[var(--bg-secondary)] transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed">
          {downloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
          {downloading ? "Downloading..." : "Download receipt"}
        </button>
      </div>
    </div>
  );
}
