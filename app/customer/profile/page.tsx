"use client";

import { User, Upload, Check } from "lucide-react";
import { useState } from "react";

export default function CustomerProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "Muhammad",
    lastName: "Umair",
    phone: "0300-0000000",
    email: "umairbwp202@gmail.com",
    city: "Islamabad",
    area: "G-13"
  });

  return (
    <div className="p-5 max-w-4xl">
      <div className="mb-5">
        <h1 className="text-[16px] font-medium text-[var(--text-primary)]">My profile</h1>
        <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">Manage your personal information</p>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border-secondary)] flex items-center justify-between">
          <span className="text-[13px] font-medium text-[var(--text-primary)] flex items-center gap-1.5">
            <User size={16} className="text-[#1D9E75]" /> Personal info
          </span>
          <button className="bg-[#E1F5EE] dark:bg-[#1a2e26] text-[#1D9E75] border border-[#1D9E75] rounded-md px-3 py-1.5 text-[12px] cursor-pointer hover:bg-[#1D9E75] hover:text-white transition-colors">
            Edit
          </button>
        </div>
        
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-3 sm:gap-4 mb-5">
            <div className="w-12 h-12 rounded-full bg-[#7F77DD] flex items-center justify-center text-[16px] font-medium text-white shrink-0">
              MU
            </div>
            <div>
              <div className="text-[14px] font-medium text-[var(--text-primary)]">Muhammad Umair</div>
              <div className="text-[12px] text-[var(--text-secondary)]">Customer since Jan 2025</div>
            </div>
            <div className="ml-auto">
              <button className="bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-tertiary)] rounded-md px-3 py-1.5 text-[11px] cursor-pointer hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
                <Upload size={12} /> Photo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <div>
              <label className="block text-[11px] text-[var(--text-secondary)] mb-1">First name</label>
              <input 
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] transition-colors"
                value={formData.firstName}
                onChange={e => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[var(--text-secondary)] mb-1">Last name</label>
              <input 
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] transition-colors"
                value={formData.lastName}
                onChange={e => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[var(--text-secondary)] mb-1">Phone</label>
              <input 
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] transition-colors"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[var(--text-secondary)] mb-1">Email</label>
              <input 
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] transition-colors"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[var(--text-secondary)] mb-1">City</label>
              <select 
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] transition-colors cursor-pointer"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              >
                <option>Islamabad</option>
                <option>Karachi</option>
                <option>Lahore</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-[var(--text-secondary)] mb-1">Area</label>
              <input 
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] transition-colors"
                value={formData.area}
                onChange={e => setFormData({...formData, area: e.target.value})}
              />
            </div>
          </div>

          <button className="bg-[#1D9E75] text-white border-none rounded-md px-4 py-2 text-[13px] font-medium cursor-pointer hover:bg-[#0F6E56] transition-colors flex items-center gap-1.5">
            <Check size={16} /> Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
