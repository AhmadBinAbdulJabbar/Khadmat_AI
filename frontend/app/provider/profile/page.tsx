"use client";

import { useState } from "react";
import { User, Star, Upload, UserCircle, Briefcase, MapPin, Check, Plus, X } from "lucide-react";

export default function ProviderProfilePage() {
  const [professions, setProfessions] = useState(["AC Technician"]);
  const allProfessions = ["AC Technician", "Plumber", "Electrician", "Carpenter", "Painter", "Cleaner", "Other"];

  const [areas, setAreas] = useState(["G-13", "G-10", "F-10", "F-8"]);

  const toggleProfession = (prof: string) => {
    if (professions.includes(prof)) {
      setProfessions(professions.filter((p) => p !== prof));
    } else {
      setProfessions([...professions, prof]);
    }
  };

  const removeArea = (area: string) => {
    setAreas(areas.filter((a) => a !== area));
  };

  const handleSave = () => {
    alert("Profile saved successfully!");
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      <div className="p-5 flex-1 overflow-auto max-w-4xl">
          <div className="flex flex-col gap-3.5">
            {/* Personal Info */}
            <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-4">
              <div className="text-[13px] font-medium text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
                <UserCircle size={15} className="text-[var(--text-secondary)]" /> Personal info
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-[#E1F5EE] border border-[#9FE1CB] flex items-center justify-center text-[18px] font-medium text-[#085041] shrink-0">
                  AA
                </div>
                <div className="flex flex-col gap-1">
                  <button className="text-[12px] text-[#1D9E75] cursor-pointer bg-transparent border-none flex items-center gap-1 hover:underline font-medium p-0 text-left">
                    <Upload size={12} /> Upload photo
                  </button>
                  <span className="text-[11px] text-[var(--text-tertiary)]">JPG or PNG, max 2MB</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] text-[var(--text-secondary)] mb-1 block">Full name</label>
                  <input className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75]" defaultValue="Ali Hassan" />
                </div>
                <div>
                  <label className="text-[12px] text-[var(--text-secondary)] mb-1 block">Phone number</label>
                  <input className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75]" defaultValue="0300-1234567" />
                </div>
                <div>
                  <label className="text-[12px] text-[var(--text-secondary)] mb-1 block">Email</label>
                  <input className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75]" defaultValue="ali@example.com" />
                </div>
                <div>
                  <label className="text-[12px] text-[var(--text-secondary)] mb-1 block">City</label>
                  <select className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] cursor-pointer">
                    <option>Islamabad</option>
                    <option>Karachi</option>
                    <option>Lahore</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Profession Details */}
            <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-4">
              <div className="text-[13px] font-medium text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
                <Briefcase size={15} className="text-[var(--text-secondary)]" /> Profession details
              </div>
              <label className="text-[12px] text-[var(--text-secondary)] mb-2 block">Professions (select all that apply)</label>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {allProfessions.map((p) => (
                  <button
                    key={p}
                    onClick={() => toggleProfession(p)}
                    className={`px-3 py-1 rounded-full text-[11px] transition-colors cursor-pointer border ${
                      professions.includes(p) ? "bg-[#E1F5EE] border-[#1D9E75] text-[#085041] font-medium" : "bg-[var(--bg-primary)] border-[var(--border-tertiary)] text-[var(--text-secondary)] hover:border-[var(--border-secondary)]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div>
                  <label className="text-[12px] text-[var(--text-secondary)] mb-1 block">Experience</label>
                  <select defaultValue="5–10 years" className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] cursor-pointer">
                    <option>1–2 years</option>
                    <option>3–5 years</option>
                    <option>5–10 years</option>
                    <option>10+ years</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] text-[var(--text-secondary)] mb-1 block">Min price (PKR)</label>
                  <input className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75]" defaultValue="800" />
                </div>
                <div>
                  <label className="text-[12px] text-[var(--text-secondary)] mb-1 block">Max price (PKR)</label>
                  <input className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75]" defaultValue="1500" />
                </div>
              </div>
              <label className="text-[12px] text-[var(--text-secondary)] mb-1 block">Bio / description</label>
              <textarea className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] resize-none" rows={3} defaultValue="Experienced AC technician with 7+ years. Specialise in installation, gas refill, and servicing all major brands." />
            </div>

            {/* Service Areas */}
            <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-4">
              <div className="text-[13px] font-medium text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
                <MapPin size={15} className="text-[var(--text-secondary)]" /> Service areas
              </div>
              <div className="flex flex-wrap gap-1.5">
                {areas.map((area) => (
                  <div key={area} className="bg-[#E1F5EE] border border-[#9FE1CB] text-[#085041] text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer">
                    {area} <X size={12} className="opacity-70 hover:opacity-100" onClick={() => removeArea(area)} />
                  </div>
                ))}
                <button className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] text-[var(--text-secondary)] text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 hover:border-[#1D9E75] hover:text-[#1D9E75] cursor-pointer transition-colors">
                  <Plus size={12} /> Add area
                </button>
              </div>
            </div>

            <div className="mt-2">
              <button onClick={handleSave} className="bg-[#1D9E75] text-white border-none px-5 py-2.5 rounded-lg text-[13px] font-medium cursor-pointer hover:bg-[#0F6E56] transition-colors flex items-center gap-1.5">
                <Check size={14} /> Save changes
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}
