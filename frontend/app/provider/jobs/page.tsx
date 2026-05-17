"use client";

import { useState } from "react";
import { Search, MapPin, Clock, Check, Wind } from "lucide-react";

export default function ProviderMyJobsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([
    {
      id: "req_1",
      title: "AC service request",
      type: "new",
      customer: "Ahmed Usman",
      customerInitials: "AU",
      phone: "0300-xxx-xxxx",
      location: "G-13/2, Islamabad",
      time: "Today 10:00 AM",
      price: "PKR 1,200",
      dateLabel: "Est. price",
      avatarBg: "#EEEDFE",
      avatarColor: "#3C3489"
    },
    {
      id: "req_2",
      title: "AC gas refill",
      type: "new",
      customer: "Zara Hassan",
      customerInitials: "ZH",
      phone: "0301-xxx-xxxx",
      location: "F-8/3, Islamabad",
      time: "Tomorrow 9:00 AM",
      price: "PKR 1,500",
      dateLabel: "Est. price",
      avatarBg: "#E1F5EE",
      avatarColor: "#085041"
    },
    {
      id: "req_3",
      title: "AC service — filter clean",
      type: "confirmed",
      customer: "Sara Khan",
      customerInitials: "SK",
      phone: "0302-xxx-xxxx",
      location: "G-13/4, Islamabad",
      time: "Today 2:00 PM",
      price: "PKR 1,500",
      dateLabel: "Confirmed",
      avatarBg: "#FAEEDA",
      avatarColor: "#633806"
    },
    {
      id: "req_4",
      title: "AC installation (split unit)",
      type: "completed",
      customer: "Bilal Ahmed",
      customerInitials: "BA",
      phone: "completed",
      location: "F-10/1, Islamabad",
      time: "Yesterday 11:00 AM",
      price: "PKR 2,200",
      dateLabel: "Paid",
      avatarBg: "#E6F1FB",
      avatarColor: "#185FA5"
    }
  ]);

  const handleAccept = (id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, type: "confirmed", dateLabel: "Confirmed" } : j));
  };

  const handleDecline = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  const handleRequestReview = (id: string) => {
    // API logic to request review
    alert("Review requested!");
  };

  const filteredJobs = jobs.filter(j => {
    if (filter !== "All" && j.type !== filter.toLowerCase()) return false;
    if (search && !j.customer.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-5 max-w-4xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-base font-medium text-[var(--text-primary)]">My jobs</div>
          <div className="text-xs text-[var(--text-secondary)] mt-0.5">All service requests assigned to you</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5 mb-4">
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3 text-center">
          <div className="text-lg font-medium" style={{ color: "#EF9F27" }}>2</div>
          <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">New requests</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3 text-center">
          <div className="text-lg font-medium" style={{ color: "#1D9E75" }}>3</div>
          <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Confirmed today</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3 text-center">
          <div className="text-lg font-medium text-[var(--text-primary)]">212</div>
          <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Total completed</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 items-center">
        {["All", "New", "Confirmed", "Completed", "Cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`border rounded-full px-3 py-1 text-xs transition-colors cursor-pointer ${
              filter === f
                ? "bg-[#E1F5EE] border-[#1D9E75] text-[#085041] font-medium"
                : "bg-[var(--bg-primary)] border-[var(--border-tertiary)] text-[var(--text-secondary)] hover:border-[#1D9E75] hover:text-[#1D9E75]"
            }`}
          >
            {f}
          </button>
        ))}
        
        <div className="ml-auto flex items-center gap-1.5 bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-md px-2.5 py-1.5">
          <Search size={13} className="text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Search by customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-xs text-[var(--text-primary)] w-[140px] placeholder:text-[var(--text-tertiary)]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {filteredJobs.length === 0 && (
          <div className="text-center py-10 text-[var(--text-secondary)] text-sm">
            No jobs found.
          </div>
        )}
        {filteredJobs.map((job) => (
          <div key={job.id} className={`bg-[var(--bg-primary)] border rounded-xl p-3.5 ${job.type === 'new' ? 'border-[#EF9F27] bg-[#FAEEDA]' : 'border-[var(--border-tertiary)]'}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  job.type === 'new' ? 'bg-[#F3D7B1] text-[#854F0B]' : 
                  job.type === 'confirmed' ? 'bg-[#E1F5EE] text-[#0F6E56]' : 
                  'bg-[#EAF3DE] text-[#3B6D11]'
                }`}>
                  <Wind size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[13px] font-medium text-[var(--text-primary)]">{job.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      job.type === 'new' ? 'bg-[#FAEEDA] text-[#633806]' : 
                      job.type === 'confirmed' ? 'bg-[#E1F5EE] text-[#085041]' : 
                      'bg-[#EAF3DE] text-[#27500A]'
                    }`}>
                      {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] text-[var(--text-secondary)] mt-1">
                    <span className="flex items-center gap-1"><MapPin size={11}/> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock size={11}/> {job.time}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right shrink-0">
                <div className={`text-sm font-medium ${job.type === 'completed' ? 'text-[#1D9E75]' : 'text-[var(--text-primary)]'}`}>
                  {job.price}
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">{job.dateLabel}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[var(--border-tertiary)]">
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-medium shrink-0"
                     style={{ backgroundColor: job.avatarBg, color: job.avatarColor }}>
                  {job.customerInitials}
                </div>
                {job.customer} · {job.phone}
              </div>
              
              <div className="flex gap-1.5">
                {job.type === 'new' && (
                  <>
                    <button onClick={() => handleAccept(job.id)} className="bg-[#1D9E75] text-white px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1 hover:bg-[#0F6E56] transition-colors border border-[#1D9E75] cursor-pointer"><Check size={11}/> Accept</button>
                    <button onClick={() => handleDecline(job.id)} className="bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-tertiary)] px-2.5 py-1 rounded text-[11px] font-medium hover:text-[#A32D2D] hover:border-[#E24B4A] transition-colors cursor-pointer">Decline</button>
                  </>
                )}
                {job.type === 'confirmed' && (
                  <button className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-tertiary)] px-2.5 py-1 rounded text-[11px] font-medium hover:text-[var(--text-primary)] transition-colors cursor-pointer">View details</button>
                )}
                {job.type === 'completed' && (
                  <>
                    <button className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-tertiary)] px-2.5 py-1 rounded text-[11px] font-medium hover:text-[var(--text-primary)] transition-colors cursor-pointer">View</button>
                    <button onClick={() => handleRequestReview(job.id)} className="bg-[#EEEDFE] text-[#3C3489] border border-[#CECBF6] px-2.5 py-1 rounded text-[11px] font-medium hover:bg-[#E0DEFA] transition-colors cursor-pointer">Request review</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
