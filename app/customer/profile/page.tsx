"use client";

import { User, Check, Loader2, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { getCustomerProfile, updateCustomerProfile } from "@/lib/api";

const CITIES = ["Islamabad", "Karachi", "Lahore"];

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
};

export default function CustomerProfilePage() {
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState<FormData>({
    firstName: "", lastName: "", phone: "", email: "", city: "Islamabad",
  });
  const [snapshot, setSnapshot] = useState<FormData | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const stored = localStorage.getItem("khadmat_user");
      if (!stored) { setError("User not logged in"); setLoading(false); return; }
      let id = "";
      try { const u = JSON.parse(stored); id = u.id; } catch { setError("Invalid user data"); setLoading(false); return; }
      if (!id) { setError("User ID not found"); setLoading(false); return; }
      setUserId(id);
      try {
        const data = await getCustomerProfile(id);
        setFormData({
          firstName: data.user.first_name ?? "",
          lastName: data.user.last_name ?? "",
          phone: data.user.phone ?? "",
          email: data.user.email ?? "",
          city: data.user.city ?? "Islamabad",
        });
        setError("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setSnapshot({ ...formData });
    setEditing(true);
    setSaved(false);
  };

  const handleCancel = () => {
    if (snapshot) setFormData(snapshot);
    setSnapshot(null);
    setEditing(false);
    setError("");
  };

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
      setSnapshot(null);
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const field = (className: string) =>
    `w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md px-3 py-2 text-[13px] outline-none transition-colors ${className}`;

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
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-[13px] text-red-600">{error}</div>
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
          {!editing && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-1.5 bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-secondary)] rounded-md px-3 py-1.5 text-[12px] cursor-pointer hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Pencil size={12} /> Edit
            </button>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-3 sm:gap-4 mb-5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center text-[16px] font-bold text-white shadow-md shrink-0">
              {initials}
            </div>
            <div>
              <div className="text-[14px] font-medium text-[var(--text-primary)]">{formData.firstName} {formData.lastName}</div>
              <div className="text-[12px] text-[var(--text-secondary)]">{formData.email}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <div>
              <label className="block text-[11px] text-[var(--text-secondary)] mb-1">First name</label>
              <input
                disabled={!editing}
                className={field(editing ? "text-[var(--text-primary)] focus:border-[#1D9E75]" : "text-[var(--text-primary)] cursor-default opacity-70")}
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[var(--text-secondary)] mb-1">Last name</label>
              <input
                disabled={!editing}
                className={field(editing ? "text-[var(--text-primary)] focus:border-[#1D9E75]" : "text-[var(--text-primary)] cursor-default opacity-70")}
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[var(--text-secondary)] mb-1">Phone</label>
              <input
                disabled={!editing}
                className={field(editing ? "text-[var(--text-primary)] focus:border-[#1D9E75]" : "text-[var(--text-primary)] cursor-default opacity-70")}
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[var(--text-secondary)] mb-1">Email</label>
              <input
                readOnly
                className={field("text-[var(--text-tertiary)] cursor-not-allowed opacity-70")}
                value={formData.email}
              />
            </div>
            <div>
              <label className="block text-[11px] text-[var(--text-secondary)] mb-1">City</label>
              <select
                disabled={!editing}
                className={field(editing ? "text-[var(--text-primary)] focus:border-[#1D9E75] cursor-pointer" : "text-[var(--text-primary)] cursor-default opacity-70")}
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
              >
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {editing && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#1D9E75] text-white border-none rounded-md px-4 py-2 text-[13px] font-medium cursor-pointer hover:bg-[#0F6E56] transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check size={16} /> {saving ? "Saving..." : "Save changes"}
              </button>
              <button
                onClick={handleCancel}
                disabled={saving}
                className="bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-secondary)] rounded-md px-4 py-2 text-[13px] cursor-pointer hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
