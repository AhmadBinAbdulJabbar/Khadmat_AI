"use client";

import { User, Upload, Check, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getCustomerProfile, updateCustomerProfile } from "@/lib/api";

const CITIES = ["Islamabad", "Karachi", "Lahore"];

export default function CustomerProfilePage() {
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "Islamabad",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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
        const data = await getCustomerProfile(id || undefined);
        setFormData({
          firstName: data.user.first_name ?? "",
          lastName: data.user.last_name ?? "",
          phone: data.user.phone ?? "",
          email: data.user.email ?? "",
          city: data.user.city ?? "Islamabad",
        });
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

  const handleSave = async () => {
    if (!userId) { setError("User not identified — please log out and sign in again."); return; }
    try {
      setSaving(true);
      await updateCustomerProfile(userId, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        city: formData.city,
      });
      // Update localStorage so navbar reflects changes immediately
      const stored = localStorage.getItem("khadmat_user");
      if (stored) {
        try {
          const u = JSON.parse(stored);
          u.name = `${formData.firstName} ${formData.lastName}`.trim();
          u.city = formData.city;
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

  const initials = (formData.firstName.charAt(0) + formData.lastName.charAt(0)).toUpperCase() || "?";

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
        <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">Manage your personal information</p>
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

      <div className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border-secondary)] flex items-center justify-between">
          <span className="text-[13px] font-medium text-[var(--text-primary)] flex items-center gap-1.5">
            <User size={16} className="text-[#1D9E75]" /> Personal info
          </span>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#E1F5EE] text-[#1D9E75] border border-[#1D9E75] rounded-md px-3 py-1.5 text-[12px] cursor-pointer hover:bg-[#1D9E75] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-3 sm:gap-4 mb-5">
            <div className="w-12 h-12 rounded-full bg-[#7F77DD] flex items-center justify-center text-[16px] font-medium text-white shrink-0">
              {initials}
            </div>
            <div>
              <div className="text-[14px] font-medium text-[var(--text-primary)]">{formData.firstName} {formData.lastName}</div>
              <div className="text-[12px] text-[var(--text-secondary)]">{formData.email}</div>
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
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[var(--text-secondary)] mb-1">Last name</label>
              <input
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] transition-colors"
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[var(--text-secondary)] mb-1">Phone</label>
              <input
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] transition-colors"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[var(--text-secondary)] mb-1">Email</label>
              <input
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md px-3 py-2 text-[13px] text-[var(--text-tertiary)] outline-none cursor-not-allowed"
                value={formData.email}
                readOnly
              />
            </div>
            <div>
              <label className="block text-[11px] text-[var(--text-secondary)] mb-1">City</label>
              <select
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md px-3 py-2 text-[13px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] transition-colors cursor-pointer"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
              >
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#1D9E75] text-white border-none rounded-md px-4 py-2 text-[13px] font-medium cursor-pointer hover:bg-[#0F6E56] transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check size={16} /> {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
