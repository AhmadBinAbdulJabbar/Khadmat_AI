"use client";

import { useState, useEffect } from "react";
import {
  CalendarCheck, Banknote, Star, Check,
  MapPin, Clock, User, Loader2
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type DashboardStats = {
  today_jobs: { total: number; pending: number; confirmed: number };
  month_earnings: number;
  rating: number;
  total_reviews: number;
  total_completed: number;
};

type Job = {
  id: string;
  title: string;
  type: string;
  customer: string;
  location: string;
  time: string;
  price: string;
};

export default function ProviderDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/api/provider/dashboard?provider_id=me`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      setJobsLoading(true);
      try {
        const res = await fetch(`${API}/api/provider/jobs?provider_id=me&limit=5`);
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setJobsLoading(false);
      }
    };
    load();
  }, []);

  const handleAccept = async (id: string) => {
    setJobs((prev) => prev.map((j) => j.id === id ? { ...j, type: "confirmed" } : j));
    try {
      await fetch(`${API}/api/provider/jobs/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "confirmed" }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecline = async (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    try {
      await fetch(`${API}/api/provider/jobs/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "declined" }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="p-5 max-w-4xl">
      <div className="text-base font-medium text-[var(--text-primary)] mb-1">Dashboard</div>
      <div className="text-xs text-[var(--text-secondary)] mb-4">{today}</div>

      {/* Stats row */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin text-[var(--accent)]" size={24} />
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
          <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
            <div className="text-[11px] text-[var(--text-secondary)] mb-1 flex items-center gap-1">
              <CalendarCheck size={12} /> Today&apos;s jobs
            </div>
            <div className="text-xl font-medium text-[var(--text-primary)]">{stats.today_jobs.total}</div>
            <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">
              {stats.today_jobs.pending} pending · {stats.today_jobs.confirmed} confirmed
            </div>
          </div>
          <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
            <div className="text-[11px] text-[var(--text-secondary)] mb-1 flex items-center gap-1">
              <Banknote size={12} /> This month
            </div>
            <div className="text-xl font-medium text-[#1D9E75]">{stats.month_earnings.toLocaleString()}</div>
            <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">PKR earned</div>
          </div>
          <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
            <div className="text-[11px] text-[var(--text-secondary)] mb-1 flex items-center gap-1">
              <Star size={12} /> Rating
            </div>
            <div className="text-xl font-medium text-[var(--text-primary)]">{stats.rating}</div>
            <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">from {stats.total_reviews} reviews</div>
          </div>
          <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
            <div className="text-[11px] text-[var(--text-secondary)] mb-1 flex items-center gap-1">
              <Check size={12} /> Completed
            </div>
            <div className="text-xl font-medium text-[var(--text-primary)]">{stats.total_completed}</div>
            <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">total jobs</div>
          </div>
        </div>
      ) : null}

      {/* Incoming Requests */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-[var(--text-primary)]">Incoming requests</div>
      </div>

      {jobsLoading ? (
        <div className="flex justify-center py-6">
          <Loader2 className="animate-spin text-[var(--accent)]" size={20} />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-sm text-[var(--text-secondary)] text-center py-8">No jobs at the moment.</div>
      ) : (
        <div className="flex flex-col gap-2.5 mb-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`bg-[var(--bg-primary)] border rounded-xl p-3 flex gap-3 ${job.type === 'new' ? 'border-[#EF9F27] bg-[#FAEEDA]' : 'border-[var(--border-tertiary)]'}`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                job.type === 'new' ? 'bg-[#F3D7B1] text-[#854F0B]' :
                job.type === 'confirmed' ? 'bg-[#E1F5EE] text-[#0F6E56]' :
                'bg-[#EAF3DE] text-[#3B6D11]'
              }`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12h14"/><path d="M2 8h10"/><path d="M2 16h10"/>
                  <path d="M16 12a2 2 0 1 1 0 4h-4"/><path d="M12 8a2 2 0 1 0 0-4h-4"/>
                  <path d="M12 16a2 2 0 1 0 0 4h-4"/>
                </svg>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[13px] font-medium text-[var(--text-primary)]">{job.title}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    job.type === 'new' ? 'bg-[#FAEEDA] text-[#633806]' :
                    job.type === 'confirmed' ? 'bg-[#E1F5EE] text-[#085041]' :
                    'bg-[#EAF3DE] text-[#27500A]'
                  }`}>
                    {job.type === 'new' ? 'New' : job.type === 'confirmed' ? 'Confirmed' : 'Completed'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 text-[11px] text-[var(--text-secondary)] mb-2">
                  <span className="flex items-center gap-1"><User size={11} /> {job.customer}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {job.time}</span>
                </div>

                {job.type === 'new' && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleAccept(job.id)}
                      className="bg-[#1D9E75] text-white px-2.5 py-1 rounded text-[11px] flex items-center gap-1 hover:bg-[#0F6E56] transition-colors"
                    >
                      <Check size={11} /> Accept
                    </button>
                    <button
                      onClick={() => handleDecline(job.id)}
                      className="bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-tertiary)] px-2.5 py-1 rounded text-[11px] hover:text-[#A32D2D] hover:border-[#E24B4A] transition-colors"
                    >
                      Decline
                    </button>
                    <span className="text-[11px] text-[var(--text-secondary)] ml-1">{job.price}</span>
                  </div>
                )}
              </div>

              {job.type !== 'new' && (
                <div className={`text-[13px] font-medium ${job.type === 'completed' ? 'text-[#1D9E75]' : 'text-[var(--text-primary)]'}`}>
                  {job.price}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
