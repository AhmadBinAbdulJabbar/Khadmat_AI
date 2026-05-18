"use client";

import { useState } from "react";
import { 
  CalendarCheck, Banknote, Star, Check, 
  MapPin, Clock, User, CheckCircle2 
} from "lucide-react";

export default function ProviderDashboardPage() {
  const [jobs, setJobs] = useState([
    {
      id: "req_1",
      title: "AC service request",
      type: "new",
      customer: "Ahmed Usman",
      location: "G-13/2",
      time: "Today 10:00 AM",
      price: "PKR 1,200 est."
    },
    {
      id: "req_2",
      title: "AC gas refill",
      type: "confirmed",
      customer: "Sara Khan",
      location: "G-13/4",
      time: "Today 2:00 PM",
      price: "PKR 1,500"
    },
    {
      id: "req_3",
      title: "AC installation",
      type: "completed",
      customer: "Bilal Ahmed",
      location: "F-10/1",
      time: "Yesterday 11:00 AM",
      price: "PKR 2,200"
    }
  ]);

  const handleAccept = (id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, type: "confirmed" } : j));
  };

  const handleDecline = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  return (
    <div className="p-5 max-w-4xl">
      <div className="text-base font-medium text-[var(--text-primary)] mb-1">Dashboard</div>
      <div className="text-xs text-[var(--text-secondary)] mb-4">Thursday, 21 May 2026</div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
          <div className="text-[11px] text-[var(--text-secondary)] mb-1 flex items-center gap-1"><CalendarCheck size={12}/> Today's jobs</div>
          <div className="text-xl font-medium text-[var(--text-primary)]">3</div>
          <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">1 pending · 2 confirmed</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
          <div className="text-[11px] text-[var(--text-secondary)] mb-1 flex items-center gap-1"><Banknote size={12}/> This month</div>
          <div className="text-xl font-medium text-[#1D9E75]">38,400</div>
          <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">PKR earned</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
          <div className="text-[11px] text-[var(--text-secondary)] mb-1 flex items-center gap-1"><Star size={12}/> Rating</div>
          <div className="text-xl font-medium text-[var(--text-primary)]">4.7</div>
          <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">from 212 reviews</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
          <div className="text-[11px] text-[var(--text-secondary)] mb-1 flex items-center gap-1"><Check size={12}/> Completed</div>
          <div className="text-xl font-medium text-[var(--text-primary)]">212</div>
          <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">total jobs</div>
        </div>
      </div>

      {/* Incoming Requests */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-[var(--text-primary)]">Incoming requests</div>
        <div className="text-xs text-[#1D9E75] cursor-pointer hover:underline">See all</div>
      </div>

      <div className="flex flex-col gap-2.5 mb-6">
        {jobs.map((job) => (
          <div key={job.id} className={`bg-[var(--bg-primary)] border rounded-xl p-3 flex gap-3 ${job.type === 'new' ? 'border-[#EF9F27] bg-[#FAEEDA]' : 'border-[var(--border-tertiary)]'}`}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${job.type === 'new' ? 'bg-[#F3D7B1] text-[#854F0B]' : job.type === 'confirmed' ? 'bg-[#E1F5EE] text-[#0F6E56]' : 'bg-[#EAF3DE] text-[#3B6D11]'}`}>
              {/* using wind icon for AC */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h14"/><path d="M2 8h10"/><path d="M2 16h10"/><path d="M16 12a2 2 0 1 1 0 4h-4"/><path d="M12 8a2 2 0 1 0 0-4h-4"/><path d="M12 16a2 2 0 1 0 0 4h-4"/></svg>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[13px] font-medium text-[var(--text-primary)]">{job.title}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${job.type === 'new' ? 'bg-[#FAEEDA] text-[#633806]' : job.type === 'confirmed' ? 'bg-[#E1F5EE] text-[#085041]' : 'bg-[#EAF3DE] text-[#27500A]'}`}>
                  {job.type === 'new' ? 'New' : job.type === 'confirmed' ? 'Confirmed' : 'Completed'}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 text-[11px] text-[var(--text-secondary)] mb-2">
                <span className="flex items-center gap-1"><User size={11}/> {job.customer}</span>
                <span className="flex items-center gap-1"><MapPin size={11}/> {job.location}</span>
                <span className="flex items-center gap-1"><Clock size={11}/> {job.time}</span>
              </div>

              {job.type === 'new' && (
                <div className="flex items-center gap-1.5">
                  <button onClick={() => handleAccept(job.id)} className="bg-[#1D9E75] text-white px-2.5 py-1 rounded text-[11px] flex items-center gap-1 hover:bg-[#0F6E56] transition-colors"><Check size={11}/> Accept</button>
                  <button onClick={() => handleDecline(job.id)} className="bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-tertiary)] px-2.5 py-1 rounded text-[11px] hover:text-[#A32D2D] hover:border-[#E24B4A] transition-colors">Decline</button>
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

      {/* Profile summary */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-[var(--text-primary)]">My profile</div>
        <div className="text-xs text-[#1D9E75] cursor-pointer hover:underline">Edit profile</div>
      </div>
      
      <div className="bg-[var(--bg-secondary)] rounded-lg p-3.5">
        <div className="flex justify-between items-center py-1.5 border-b border-[var(--border-tertiary)]">
          <span className="text-xs text-[var(--text-secondary)]">Profession</span>
          <span className="text-xs font-medium text-[var(--text-primary)]">AC Technician</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-[var(--border-tertiary)]">
          <span className="text-xs text-[var(--text-secondary)]">Experience</span>
          <span className="text-xs font-medium text-[var(--text-primary)]">7 years</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-[var(--border-tertiary)]">
          <span className="text-xs text-[var(--text-secondary)]">Price range</span>
          <span className="text-xs font-medium text-[var(--text-primary)]">PKR 800–1,500</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-[var(--border-tertiary)]">
          <span className="text-xs text-[var(--text-secondary)]">Service areas</span>
          <span className="text-xs font-medium text-[var(--text-primary)]">G-13, G-10, F-10</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-[var(--border-tertiary)]">
          <span className="text-xs text-[var(--text-secondary)]">Phone</span>
          <span className="text-xs font-medium text-[var(--text-primary)]">0300-1234567 <span className="text-[#1D9E75] ml-1 cursor-pointer hover:underline text-[11px] font-normal">change</span></span>
        </div>
        <div className="flex justify-between items-center pt-1.5">
          <span className="text-xs text-[var(--text-secondary)]">Availability</span>
          <span className="text-xs font-medium text-[#1D9E75] flex items-center gap-1"><CheckCircle2 size={13}/> Online now</span>
        </div>
      </div>
    </div>
  );
}
