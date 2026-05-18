"use client";

import { useState, useEffect } from "react";
import { User, Upload, Check, Briefcase, MapPin, Plus, X, Loader2 } from "lucide-react";
import { getProviderProfile, updateProviderProfile } from "@/lib/api";

const CITIES = ["Islamabad", "Karachi", "Lahore"];
const PRICE_RANGES = ["Under 500", "500–1000", "1000–2000", "2000+"];
const ALL_PROFESSIONS = ["AC Technician", "Plumber", "Electrician", "Carpenter", "Painter", "Cleaner", "Tutor", "Security", "Other"];
const EXPERIENCE_OPTIONS = ["1–2 years", "3–5 years", "5–10 years", "10+ years"];

export default function ProviderProfilePage() {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "Islamabad",
    experience: "1–2 years",
    priceRange: "500–1000",
    bio: "",
  });
  const [professions, setProfessions] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [newArea, setNewArea] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("khadmat_user");
    let id = "";
    if (stored) {
      try {
        const u = JSON.parse(stored);
        id = u.id ?? "";
        setUserId(id);
      } catch {}
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getProviderProfile(id || undefined);
        setFormData({
          firstName: data.user.first_name ?? "",
          lastName: data.user.last_name ?? "",
          phone: data.user.phone ?? "",
          email: data.user.email ?? "",
          city: data.user.city ?? "Islamabad",
          experience: data.profile.experience ?? "1–2 years",
          priceRange: data.profile.price_range ?? "500–1000",
          bio: data.profile.bio ?? "",
        });
        setProfessions(data.profile.professions ?? []);
        setAreas(data.profile.service_areas ?? []);
        setError("");
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const toggleProfession = (prof: string) => {
    setProfessions((prev) =>
      prev.includes(prof) ? prev.filter((p) => p !== prof) : [...prev, prof]
    );
  };

  const removeArea = (area: string) => setAreas((prev) => prev.filter((a) => a !== area));

  const handleAddArea = () => {
    const trimmed = newArea.trim();
    if (trimmed && !areas.includes(trimmed)) {
      setAreas((prev) => [...prev, trimmed]);
      setNewArea("");
    }
  };

  const handleSave = async () => {
    if (!userId) { setError("User not identified — please log out and sign in again."); return; }
    try {
      setSaving(true);
      await updateProviderProfile(userId, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        city: formData.city,
        professions,
        experience: formData.experience,
        price_range: formData.priceRange,
        bio: formData.bio,
        service_areas: areas,
      });
      const stored = localStorage.getItem("khadmat_user");
      if (stored) {
        try {
          const u = JSON.parse(stored);
          u.name = `${formData.firstName} ${formData.lastName}`.trim();
          u.city = formData.city;
          u.professions = professions;
          localStorage.setItem("khadmat_user", JSON.stringify(u));
        } catch {}
      }
      setError("");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save profile:", err);
      setError("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const initials = (formData.firstName.charAt(0) + formData.lastName.charAt(0)).toUpperCase() || "??";

  if (loading) {
    return (
      <div className="p-5 flex items-center gap-2 text-[var(--text-secondary)]">
        <Loader2 size={16} className="animate-spin" /> Loading profile...
      </div>
    );
  }

  return (
    <div className="p-5 max-w-4xl">
      <div className="mb-5">
        <h1 className="text-[16px] font-medium text-[var(--text-primary)]">My profile</h1>
        <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">Manage your service provider information</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-[13px] text-red-600">
          {error}
        </div>
      )}
      {saved && (
        <div className="mb-4 p-3 bg-[#E1F5EE] border border-[#9FE1CB] rounded-md text-[13px] text-[#085041]">
          Profile updated successfully!
        </div>
      )}

      <div className="flex flex-col gap-3.5">
        {/* Personal Info */}
        <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-4">
          <div className="text-[13px] font-medium text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
            <User size={15} className="text-[var(--text-secondary)]" /> Personal info
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full bg-[#E1F5EE] border border-[#9FE1CB] flex items-center justify-center text-[18px] font-medium text-[#085041] shrink-0">
              {initials}
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
              <label className="text-[12px] text-[var(--text-secondary)] mb-1 block">First name</label>
              <input
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75]"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[12px] text-[var(--text-secondary)] mb-1 block">Last name</label>
              <input
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75]"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[12px] text-[var(--text-secondary)] mb-1 block">Phone number</label>
              <input
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75]"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[12px] text-[var(--text-secondary)] mb-1 block">Email</label>
              <input
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-tertiary)] outline-none cursor-not-allowed"
                value={formData.email}
                readOnly
              />
            </div>
            <div>
              <label className="text-[12px] text-[var(--text-secondary)] mb-1 block">City</label>
              <select
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] cursor-pointer"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              >
                {CITIES.map((c) => <option key={c}>{c}</option>)}
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
            {ALL_PROFESSIONS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => toggleProfession(p)}
                className={`px-3 py-1 rounded-full text-[11px] transition-colors cursor-pointer border ${
                  professions.includes(p)
                    ? "bg-[#E1F5EE] border-[#1D9E75] text-[#085041] font-medium"
                    : "bg-[var(--bg-primary)] border-[var(--border-tertiary)] text-[var(--text-secondary)] hover:border-[var(--border-secondary)]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[12px] text-[var(--text-secondary)] mb-1 block">Experience</label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] cursor-pointer"
              >
                {EXPERIENCE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[12px] text-[var(--text-secondary)] mb-1 block">Price range (PKR/visit)</label>
              <select
                value={formData.priceRange}
                onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] cursor-pointer"
              >
                {PRICE_RANGES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <label className="text-[12px] text-[var(--text-secondary)] mb-1 block">Bio / description</label>
          <textarea
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] resize-none"
            rows={3}
            placeholder="Describe your experience and specialisations..."
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>

        {/* Service Areas */}
        <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-4">
          <div className="text-[13px] font-medium text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
            <MapPin size={15} className="text-[var(--text-secondary)]" /> Service areas
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {areas.map((area) => (
              <div key={area} className="bg-[#E1F5EE] border border-[#9FE1CB] text-[#085041] text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1">
                {area}
                <X size={12} className="opacity-70 hover:opacity-100 cursor-pointer" onClick={() => removeArea(area)} />
              </div>
            ))}
            <div className="flex gap-1">
              <input
                type="text"
                placeholder="Add area (e.g. G-13)"
                value={newArea}
                onChange={(e) => setNewArea(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddArea())}
                className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] text-[var(--text-secondary)] text-[11px] px-2.5 py-1 rounded-full outline-none focus:border-[#1D9E75] focus:text-[var(--text-primary)]"
              />
              <button
                type="button"
                onClick={handleAddArea}
                className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] text-[var(--text-secondary)] text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 hover:border-[#1D9E75] hover:text-[#1D9E75] cursor-pointer transition-colors"
              >
                <Plus size={12} /> Add
              </button>
            </div>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="bg-[#1D9E75] text-white border-none px-5 py-2.5 rounded-lg text-[13px] font-medium cursor-pointer hover:bg-[#0F6E56] transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check size={14} /> {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
