"use client";

import { Bell, IndianRupee, MessageCircle, Moon, Globe, Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";

const Toggle = ({ active, onChange }: { active: boolean, onChange: () => void }) => (
  <button 
    onClick={onChange}
    className={`w-[34px] h-[18px] rounded-full relative cursor-pointer shrink-0 transition-colors border-none ${
      active ? "bg-[#1D9E75]" : "bg-[var(--border-secondary)]"
    }`}
  >
    <div className={`absolute top-[2px] w-[14px] h-[14px] bg-white rounded-full transition-all ${
      active ? "left-[18px]" : "left-[2px]"
    }`} />
  </button>
);

export default function CustomerSettingsPage() {
  const [settings, setSettings] = useState({
    bookingReminders: true,
    paymentConf: true,
    whatsappAlerts: false,
    darkMode: true,
    twoFactor: false
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-5 max-w-4xl">
      <div className="mb-5">
        <h1 className="text-[16px] font-medium text-[var(--text-primary)]">Settings</h1>
        <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">Manage your account preferences</p>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-xl overflow-hidden mb-5">
        <div className="text-[10px] text-[var(--text-tertiary)] tracking-wide px-4 pt-3 pb-1 border-b border-[var(--border-secondary)]">
          NOTIFICATIONS
        </div>
        
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-secondary)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#E1F5EE] dark:bg-[#0d2e1e] shrink-0">
              <Bell size={16} className="text-[#1D9E75]" />
            </div>
            <div>
              <div className="text-[13px] font-medium text-[var(--text-primary)]">Booking reminders</div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">1 hour before each appointment</div>
            </div>
          </div>
          <Toggle active={settings.bookingReminders} onChange={() => toggle("bookingReminders")} />
        </div>
        
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-secondary)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#E1F5EE] dark:bg-[#0d2e1e] shrink-0">
              <IndianRupee size={16} className="text-[#1D9E75]" />
            </div>
            <div>
              <div className="text-[13px] font-medium text-[var(--text-primary)]">Payment confirmations</div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">When a payment is processed</div>
            </div>
          </div>
          <Toggle active={settings.paymentConf} onChange={() => toggle("paymentConf")} />
        </div>

        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#EEEDFE] dark:bg-[#1a1e2e] shrink-0">
              <MessageCircle size={16} className="text-[#7F77DD]" />
            </div>
            <div>
              <div className="text-[13px] font-medium text-[var(--text-primary)]">WhatsApp alerts</div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Updates via WhatsApp</div>
            </div>
          </div>
          <Toggle active={settings.whatsappAlerts} onChange={() => toggle("whatsappAlerts")} />
        </div>

        <div className="text-[10px] text-[var(--text-tertiary)] tracking-wide px-4 pt-3 pb-1 border-b border-t border-[var(--border-secondary)]">
          APPEARANCE
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-secondary)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-primary)] dark:bg-[#111] shrink-0">
              <Moon size={16} className="text-[var(--text-primary)]" />
            </div>
            <div>
              <div className="text-[13px] font-medium text-[var(--text-primary)]">Dark mode</div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Currently enabled</div>
            </div>
          </div>
          <Toggle active={settings.darkMode} onChange={() => toggle("darkMode")} />
        </div>

        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#EEEDFE] dark:bg-[#1a1e2e] shrink-0">
              <Globe size={16} className="text-[#7F77DD]" />
            </div>
            <div>
              <div className="text-[13px] font-medium text-[var(--text-primary)]">Language</div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">App display language</div>
            </div>
          </div>
          <select className="bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md px-2 py-1 text-[12px] text-[var(--text-primary)] cursor-pointer outline-none focus:border-[#1D9E75]">
            <option>English</option>
            <option>اردو</option>
            <option>Roman Urdu</option>
          </select>
        </div>

        <div className="text-[10px] text-[var(--text-tertiary)] tracking-wide px-4 pt-3 pb-1 border-b border-t border-[var(--border-secondary)]">
          SECURITY
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-secondary)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#EEEDFE] dark:bg-[#1a1e2e] shrink-0">
              <Lock size={16} className="text-[#7F77DD]" />
            </div>
            <div>
              <div className="text-[13px] font-medium text-[var(--text-primary)]">Change password</div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Last changed 3 months ago</div>
            </div>
          </div>
          <button className="bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-tertiary)] rounded-md px-3 py-1.5 text-[12px] cursor-pointer hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Change
          </button>
        </div>

        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#EEEDFE] dark:bg-[#1a1e2e] shrink-0">
              <ShieldCheck size={16} className="text-[#7F77DD]" />
            </div>
            <div>
              <div className="text-[13px] font-medium text-[var(--text-primary)]">Two-factor auth</div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Extra security via SMS OTP</div>
            </div>
          </div>
          <Toggle active={settings.twoFactor} onChange={() => toggle("twoFactor")} />
        </div>
      </div>

      <div className="bg-[#FCEBEB] dark:bg-[#2a1515] border border-[#E24B4A]/30 dark:border-[#791F1F] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E24B4A]/10 dark:border-[#2a1515]">
          <div>
            <div className="text-[13px] font-medium text-[#E24B4A]">Sign out</div>
            <div className="text-[11px] text-[#E24B4A]/70 mt-0.5">Sign out of this device</div>
          </div>
          <button className="bg-transparent text-[#E24B4A] border border-[#E24B4A]/50 rounded-md px-3 py-1.5 text-[12px] cursor-pointer hover:bg-[#E24B4A]/10 transition-colors">
            Sign out
          </button>
        </div>
        
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <div className="text-[13px] font-medium text-[#E24B4A]">Delete account</div>
            <div className="text-[11px] text-[#E24B4A]/70 mt-0.5">Permanently remove all your data</div>
          </div>
          <button className="bg-transparent text-[#E24B4A] border border-[#E24B4A]/50 rounded-md px-3 py-1.5 text-[12px] cursor-pointer hover:bg-[#E24B4A]/10 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
