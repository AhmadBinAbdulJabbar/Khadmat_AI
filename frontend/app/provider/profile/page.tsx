"use client";

import { useState } from "react";
import { User, Star, Upload, UserCircle, Briefcase, MapPin, Check, Plus, X } from "lucide-react";

export default function ProviderProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "reviews">("profile");

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
      <div className="flex border-b border-[var(--border-tertiary)] bg-[var(--bg-secondary)] shrink-0">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-5 py-3 text-[13px] flex items-center gap-1.5 transition-colors cursor-pointer border-b-2 ${
            activeTab === "profile" ? "text-[#1D9E75] border-[#1D9E75] font-medium bg-[var(--bg-primary)]" : "text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]"
          }`}
        >
          <User size={14} /> Profile
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-5 py-3 text-[13px] flex items-center gap-1.5 transition-colors cursor-pointer border-b-2 ${
            activeTab === "reviews" ? "text-[#1D9E75] border-[#1D9E75] font-medium bg-[var(--bg-primary)]" : "text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]"
          }`}
        >
          <Star size={14} /> Reviews (212)
        </button>
      </div>

      <div className="p-5 flex-1 overflow-auto max-w-4xl">
        {activeTab === "profile" && (
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
                  <select className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] cursor-pointer">
                    <option>1–2 years</option>
                    <option>3–5 years</option>
                    <option selected>5–10 years</option>
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
        )}

        {activeTab === "reviews" && (
          <div>
            <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[140px_1fr] gap-5 bg-[var(--bg-secondary)] rounded-xl p-5 mb-4 border border-[var(--border-tertiary)] items-center">
              <div className="text-center">
                <div className="text-4xl font-medium text-[var(--text-primary)] leading-tight">4.7</div>
                <div className="text-[#EF9F27] text-sm tracking-widest my-0.5">★★★★★</div>
                <div className="text-[11px] text-[var(--text-secondary)]">212 reviews</div>
              </div>
              <div className="flex flex-col gap-1.5 justify-center w-full max-w-[200px]">
                {[
                  { star: "5", width: "78%", count: 165 },
                  { star: "4", width: "14%", count: 30 },
                  { star: "3", width: "5%", count: 11 },
                  { star: "2", width: "2%", count: 4 },
                  { star: "1", width: "1%", count: 2 },
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-2 text-[11px]">
                    <span className="w-5 text-[var(--text-secondary)] text-right">{row.star}★</span>
                    <div className="flex-1 h-1.5 bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-full overflow-hidden">
                      <div className="h-full bg-[#EF9F27] rounded-full" style={{ width: row.width }}></div>
                    </div>
                    <span className="w-6 text-[var(--text-secondary)]">{row.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                { name: "Ahmed Usman", ini: "AU", bg: "#EEEDFE", fg: "#3C3489", service: "AC filter clean", date: "21 May", text: "Bahut acha kaam kiya! Punctual tha aur AC bilkul theek ho gaya. Definitely recommend karunga.", stars: "★★★★★", rate: "5.0" },
                { name: "Sara Khan", ini: "SK", bg: "#E1F5EE", fg: "#085041", service: "AC gas refill", date: "20 May", text: "Very professional. Came on time, explained everything clearly. Price was fair. Will book again.", stars: "★★★★★", rate: "5.0" },
                { name: "Bilal Ahmed", ini: "BA", bg: "#FAEEDA", fg: "#633806", service: "AC installation", date: "19 May", text: "Good work overall. Took a bit longer than expected but the quality was solid. No complaints.", stars: "★★★★☆", rate: "4.0" },
              ].map((r, i) => (
                <div key={i} className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[11px] font-medium shrink-0" style={{ backgroundColor: r.bg, color: r.fg }}>{r.ini}</div>
                      <div>
                        <div className="text-[13px] font-medium text-[var(--text-primary)]">{r.name}</div>
                        <div className="text-[11px] text-[var(--text-secondary)]">{r.service} · {r.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] text-[#EF9F27] tracking-widest">{r.stars}</div>
                      <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">{r.rate}</div>
                    </div>
                  </div>
                  <div className="text-[12px] text-[var(--text-secondary)] leading-relaxed">{r.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
