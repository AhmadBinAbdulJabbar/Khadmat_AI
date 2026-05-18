"use client";

import { useState } from "react";
import { 
  Bell, Clock, Landmark, Lock, Eye, Smartphone, AlertCircle,
  CalendarPlus, X, Star, CurrencyIcon as CurrencyRupee, ArrowUp, Mail, 
  ToggleRight, Moon, CalendarOff, ChevronRight, Key, ShieldCheck, Laptop, History,
  User, Phone, MapPin, Download, Pause, LogOut, Trash2
} from "lucide-react";

const Toggle = ({ isOn, onToggle }: { isOn: boolean, onToggle: () => void }) => {
  return (
    <div 
      className={`w-9 h-5 rounded-full relative cursor-pointer flex-shrink-0 transition-colors ${isOn ? 'bg-[#1D9E75]' : 'bg-[var(--border-secondary)]'}`}
      onClick={onToggle}
    >
      <div className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-all ${isOn ? 'left-[18px]' : 'left-[2px]'}`}></div>
    </div>
  );
};

export default function ProviderSettingsPage() {
  const [activeSection, setActiveSection] = useState("notif");

  // State maps
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    bookingRequest: true,
    bookingReminder: true,
    bookingCancelled: true,
    reviewReceived: true,
    paymentReceived: true,
    payoutSent: true,
    pushNotif: true,
    emailNotif: false,
    whatsapp: true,
    onlineStatus: true,
    autoOffline: true,
    twoFactor: false,
    showFullName: true,
    showPhone: true,
    showLocation: false,
    showReviews: true,
    darkMode: true,
    soundAlerts: true
  });

  const handleToggle = (key: string) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navItems = [
    { id: "notif", icon: Bell, label: "Notifications" },
    { id: "avail", icon: Clock, label: "Availability" },
    { id: "payout", icon: Landmark, label: "Payout" },
    { id: "security", icon: Lock, label: "Security" },
    { id: "privacy", icon: Eye, label: "Privacy" },
    { id: "app", icon: Smartphone, label: "App" },
    { id: "sep", sep: true },
    { id: "account", icon: AlertCircle, label: "Account", danger: true },
  ];

  const SettingRow = ({ icon: Icon, iconBg, iconColor, label, sub, right }: any) => (
    <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-tertiary)] last:border-b-0">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0`} style={{ backgroundColor: iconBg, color: iconColor }}>
          <Icon size={16} />
        </div>
        <div>
          <div className="text-[13px] font-medium text-[var(--text-primary)] leading-tight">{label}</div>
          <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">{sub}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {right}
      </div>
    </div>
  );

  return (
    <div className="flex h-full max-w-5xl">
      <div className="w-[180px] border-r border-[var(--border-tertiary)] bg-[var(--bg-secondary)] py-4 flex flex-col shrink-0">
        {navItems.map((item, i) => (
          item.sep ? (
            <div key={i} className="h-[1px] bg-[var(--border-tertiary)] mx-3.5 my-2"></div>
          ) : (
            <div
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-[13px] cursor-pointer border-r-2 ${
                activeSection === item.id 
                  ? "bg-[var(--bg-primary)] border-[#1D9E75] text-[#1D9E75] font-medium" 
                  : "border-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]"
              } ${item.danger ? "text-[#A32D2D] hover:text-[#A32D2D]" : ""}`}
            >
              {item.icon && <item.icon size={15} />} {item.label}
            </div>
          )
        ))}
      </div>

      <div className="flex-1 p-5 overflow-auto">
        {/* Notifications Section */}
        {activeSection === "notif" && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 text-[14px] font-medium text-[var(--text-primary)] mb-1">
              <Bell size={15} className="text-[var(--text-secondary)]" /> Notifications
            </div>
            <div className="text-[12px] text-[var(--text-secondary)] mb-4">Choose how and when you receive alerts</div>
            
            <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl overflow-hidden mb-3">
              <div className="text-[10px] tracking-wider text-[var(--text-tertiary)] px-4 py-2 border-b border-[var(--border-tertiary)] bg-[var(--bg-secondary)] font-medium">JOB REQUESTS</div>
              <SettingRow icon={CalendarPlus} iconBg="#E1F5EE" iconColor="#0F6E56" label="New booking request" sub="Alert when a customer sends you a request" right={<Toggle isOn={toggles.bookingRequest} onToggle={() => handleToggle('bookingRequest')} />} />
              <SettingRow icon={Clock} iconBg="#E1F5EE" iconColor="#0F6E56" label="Booking reminder" sub="1 hour before each scheduled job" right={<Toggle isOn={toggles.bookingReminder} onToggle={() => handleToggle('bookingReminder')} />} />
              <SettingRow icon={X} iconBg="#FAEEDA" iconColor="#854F0B" label="Booking cancelled" sub="When a customer cancels their booking" right={<Toggle isOn={toggles.bookingCancelled} onToggle={() => handleToggle('bookingCancelled')} />} />
              
              <div className="text-[10px] tracking-wider text-[var(--text-tertiary)] px-4 py-2 border-y border-[var(--border-tertiary)] bg-[var(--bg-secondary)] font-medium mt-1">REVIEWS & PAYMENTS</div>
              <SettingRow icon={Star} iconBg="#FAEEDA" iconColor="#854F0B" label="New review received" sub="When a customer leaves a rating" right={<Toggle isOn={toggles.reviewReceived} onToggle={() => handleToggle('reviewReceived')} />} />
              <SettingRow icon={CurrencyRupee} iconBg="#EAF3DE" iconColor="#3B6D11" label="Payment received" sub="Confirmation when PKR is credited" right={<Toggle isOn={toggles.paymentReceived} onToggle={() => handleToggle('paymentReceived')} />} />
              <SettingRow icon={ArrowUp} iconBg="#EAF3DE" iconColor="#3B6D11" label="Payout sent" sub="When your weekly payout is processed" right={<Toggle isOn={toggles.payoutSent} onToggle={() => handleToggle('payoutSent')} />} />
              
              <div className="text-[10px] tracking-wider text-[var(--text-tertiary)] px-4 py-2 border-y border-[var(--border-tertiary)] bg-[var(--bg-secondary)] font-medium mt-1">CHANNELS</div>
              <SettingRow icon={Smartphone} iconBg="#E6F1FB" iconColor="#185FA5" label="Push notifications" sub="On this device" right={<Toggle isOn={toggles.pushNotif} onToggle={() => handleToggle('pushNotif')} />} />
              <SettingRow icon={Mail} iconBg="#E6F1FB" iconColor="#185FA5" label="Email notifications" sub="ali@example.com" right={<Toggle isOn={toggles.emailNotif} onToggle={() => handleToggle('emailNotif')} />} />
              <SettingRow icon={Phone} iconBg="#EAF3DE" iconColor="#3B6D11" label="WhatsApp alerts" sub="0300-1234567" right={<Toggle isOn={toggles.whatsapp} onToggle={() => handleToggle('whatsapp')} />} />
            </div>
            <button className="bg-[#1D9E75] text-white px-4 py-2 rounded-md text-[12px] font-medium cursor-pointer hover:bg-[#0F6E56]">Save notification settings</button>
          </div>
        )}

        {/* Availability Section */}
        {activeSection === "avail" && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 text-[14px] font-medium text-[var(--text-primary)] mb-1">
              <Clock size={15} className="text-[var(--text-secondary)]" /> Availability settings
            </div>
            <div className="text-[12px] text-[var(--text-secondary)] mb-4">Control when you accept bookings</div>
            
            <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl overflow-hidden mb-3">
              <SettingRow 
                icon={ToggleRight} iconBg="#E1F5EE" iconColor="#0F6E56" 
                label="Online status" sub="You are currently visible to customers" 
                right={<><span className="text-[11px] bg-[#E1F5EE] text-[#085041] px-2 py-0.5 rounded-full font-medium">Online</span><Toggle isOn={toggles.onlineStatus} onToggle={() => handleToggle('onlineStatus')} /></>} 
              />
              <SettingRow 
                icon={Moon} iconBg="#FAEEDA" iconColor="#854F0B" 
                label="Auto go offline" sub="After working hours (set below)" 
                right={<Toggle isOn={toggles.autoOffline} onToggle={() => handleToggle('autoOffline')} />} 
              />
              <div className="grid grid-cols-2 gap-3 px-4 py-3 border-b border-[var(--border-tertiary)]">
                <div>
                  <label className="text-[11px] text-[var(--text-secondary)] mb-1 block">Working hours start</label>
                  <select defaultValue="8:00 AM" className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md px-3 py-2 text-[13px] outline-none"><option>7:00 AM</option><option>8:00 AM</option></select>
                </div>
                <div>
                  <label className="text-[11px] text-[var(--text-secondary)] mb-1 block">Working hours end</label>
                  <select defaultValue="6:00 PM" className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md px-3 py-2 text-[13px] outline-none"><option>6:00 PM</option><option>8:00 PM</option></select>
                </div>
              </div>
              <div className="px-4 py-3 border-b border-[var(--border-tertiary)]">
                <label className="text-[11px] text-[var(--text-secondary)] mb-1 block">Max jobs per day</label>
                <select defaultValue="4 jobs" className="w-full max-w-[200px] bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md px-3 py-2 text-[13px] outline-none"><option>3 jobs</option><option>4 jobs</option><option>Unlimited</option></select>
              </div>
              <SettingRow 
                icon={CalendarOff} iconBg="#FCEBEB" iconColor="#A32D2D" 
                label="Set vacation / leave" sub="Block dates when you are unavailable" 
                right={<><span className="text-[11px] bg-[var(--bg-secondary)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full">No dates blocked</span><ChevronRight size={14} className="text-[var(--text-tertiary)]" /></>} 
              />
            </div>
            <button className="bg-[#1D9E75] text-white px-4 py-2 rounded-md text-[12px] font-medium cursor-pointer hover:bg-[#0F6E56]">Save availability settings</button>
          </div>
        )}

        {/* Payout Section */}
        {activeSection === "payout" && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 text-[14px] font-medium text-[var(--text-primary)] mb-1">
              <Landmark size={15} className="text-[var(--text-secondary)]" /> Payout settings
            </div>
            <div className="text-[12px] text-[var(--text-secondary)] mb-4">Manage your bank account and payout schedule</div>
            
            <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl overflow-hidden mb-3">
              <div className="text-[10px] tracking-wider text-[var(--text-tertiary)] px-4 py-2 border-b border-[var(--border-tertiary)] bg-[var(--bg-secondary)] font-medium">LINKED BANK ACCOUNT</div>
              <div className="bg-[var(--bg-secondary)] rounded-md p-3 mx-4 my-3 flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-medium text-[var(--text-primary)]">Meezan Bank — Savings Account</div>
                  <div className="text-[12px] text-[var(--text-secondary)]">••••  ••••  ••••  4521</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="border border-[var(--border-secondary)] bg-[var(--bg-primary)] text-[var(--text-secondary)] text-[11px] px-2.5 py-1 rounded-md hover:bg-[var(--bg-secondary)] cursor-pointer">Change</button>
                  <span className="text-[11px] bg-[#E1F5EE] text-[#085041] px-2 py-0.5 rounded-full font-medium">Verified</span>
                </div>
              </div>
              
              <SettingRow 
                icon={CalendarPlus} iconBg="#EAF3DE" iconColor="#3B6D11" 
                label="Payout schedule" sub="How often earnings are transferred" 
                right={<select defaultValue="Bi-weekly" className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md px-2 py-1 text-xs outline-none"><option>Weekly</option><option>Bi-weekly</option></select>} 
              />
              <SettingRow 
                icon={CurrencyRupee} iconBg="#E1F5EE" iconColor="#0F6E56" 
                label="Minimum payout amount" sub="Transfer only when balance exceeds this" 
                right={<div className="flex items-center gap-1 text-[13px] text-[var(--text-secondary)]">PKR <input className="w-20 bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md px-2 py-1 text-xs outline-none" defaultValue="5000"/></div>} 
              />
              <SettingRow 
                icon={ArrowUp} iconBg="#E1F5EE" iconColor="#0F6E56" 
                label="Next payout" sub="Estimated transfer date" 
                right={<span className="text-[11px] bg-[#E1F5EE] text-[#085041] px-2 py-0.5 rounded-full font-medium">30 May 2026</span>} 
              />
            </div>
            <button className="bg-[#1D9E75] text-white px-4 py-2 rounded-md text-[12px] font-medium cursor-pointer hover:bg-[#0F6E56]">Save payout settings</button>
          </div>
        )}

        {/* Security Section */}
        {activeSection === "security" && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 text-[14px] font-medium text-[var(--text-primary)] mb-1">
              <Lock size={15} className="text-[var(--text-secondary)]" /> Security
            </div>
            <div className="text-[12px] text-[var(--text-secondary)] mb-4">Keep your account safe</div>
            
            <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl overflow-hidden">
              <SettingRow 
                icon={Key} iconBg="#EEEDFE" iconColor="#534AB7" 
                label="Change password" sub="Last changed 3 months ago" 
                right={<button className="border border-[var(--border-secondary)] bg-[var(--bg-primary)] text-[var(--text-secondary)] text-[11px] px-3 py-1 rounded-md hover:bg-[var(--bg-secondary)] cursor-pointer">Change</button>} 
              />
              <SettingRow 
                icon={ShieldCheck} iconBg="#EEEDFE" iconColor="#534AB7" 
                label="Two-factor authentication" sub="Extra security via SMS OTP" 
                right={<><span className="text-[11px] bg-[#FAEEDA] text-[#633806] px-2 py-0.5 rounded-full font-medium">Off</span><Toggle isOn={toggles.twoFactor} onToggle={() => handleToggle('twoFactor')} /></>} 
              />
              <SettingRow 
                icon={Laptop} iconBg="#E6F1FB" iconColor="#185FA5" 
                label="Active sessions" sub="2 devices logged in" 
                right={<button className="border border-[#F09595] bg-[var(--bg-primary)] text-[#A32D2D] text-[11px] px-3 py-1 rounded-md hover:bg-[#FCEBEB] cursor-pointer">Sign out all</button>} 
              />
              <SettingRow 
                icon={History} iconBg="#E1F5EE" iconColor="#0F6E56" 
                label="Login history" sub="Last login: Today 8:32 AM · Islamabad" 
                right={<ChevronRight size={14} className="text-[var(--text-tertiary)]" />} 
              />
            </div>
          </div>
        )}

        {/* Privacy Section */}
        {activeSection === "privacy" && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 text-[14px] font-medium text-[var(--text-primary)] mb-1">
              <Eye size={15} className="text-[var(--text-secondary)]" /> Privacy
            </div>
            <div className="text-[12px] text-[var(--text-secondary)] mb-4">Control what customers can see</div>
            
            <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl overflow-hidden">
              <SettingRow 
                icon={User} iconBg="#E1F5EE" iconColor="#0F6E56" 
                label="Show full name on profile" sub='Customers see "Ali Hassan"' 
                right={<Toggle isOn={toggles.showFullName} onToggle={() => handleToggle('showFullName')} />} 
              />
              <SettingRow 
                icon={Phone} iconBg="#E6F1FB" iconColor="#185FA5" 
                label="Show phone number" sub="Only after booking is confirmed" 
                right={<Toggle isOn={toggles.showPhone} onToggle={() => handleToggle('showPhone')} />} 
              />
              <SettingRow 
                icon={MapPin} iconBg="#FAEEDA" iconColor="#854F0B" 
                label="Show exact location" sub="Show area only (e.g. G-13) not full address" 
                right={<Toggle isOn={toggles.showLocation} onToggle={() => handleToggle('showLocation')} />} 
              />
              <SettingRow 
                icon={Star} iconBg="#EAF3DE" iconColor="#3B6D11" 
                label="Show reviews publicly" sub="All ratings visible on your profile" 
                right={<Toggle isOn={toggles.showReviews} onToggle={() => handleToggle('showReviews')} />} 
              />
            </div>
          </div>
        )}

        {/* App Preferences */}
        {activeSection === "app" && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 text-[14px] font-medium text-[var(--text-primary)] mb-1">
              <Smartphone size={15} className="text-[var(--text-secondary)]" /> App preferences
            </div>
            <div className="text-[12px] text-[var(--text-secondary)] mb-4">Customise your experience</div>
            
            <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl overflow-hidden">
              <SettingRow 
                icon={Moon} iconBg="#1a1a1a" iconColor="#fff" 
                label="Dark mode" sub="Use dark theme across all pages" 
                right={<Toggle isOn={toggles.darkMode} onToggle={() => handleToggle('darkMode')} />} 
              />
              <SettingRow 
                icon={Smartphone} iconBg="#E6F1FB" iconColor="#185FA5" 
                label="Language" sub="App display language" 
                right={<select defaultValue="English" className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md px-2 py-1 text-xs outline-none"><option>English</option><option>اردو</option></select>} 
              />
              <SettingRow 
                icon={CurrencyRupee} iconBg="#EAF3DE" iconColor="#3B6D11" 
                label="Currency display" sub="How prices are shown" 
                right={<select defaultValue="PKR" className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-md px-2 py-1 text-xs outline-none"><option>PKR</option><option>USD</option></select>} 
              />
              <SettingRow 
                icon={Bell} iconBg="#FAEEDA" iconColor="#854F0B" 
                label="Sound alerts" sub="Play sound on new job request" 
                right={<Toggle isOn={toggles.soundAlerts} onToggle={() => handleToggle('soundAlerts')} />} 
              />
            </div>
          </div>
        )}

        {/* Account (Danger Zone) */}
        {activeSection === "account" && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 text-[14px] font-medium text-[#A32D2D] mb-1">
              <AlertCircle size={15} /> Account
            </div>
            <div className="text-[12px] text-[var(--text-secondary)] mb-4">Manage or remove your Khadmat AI account</div>
            
            <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl overflow-hidden mb-3">
              <SettingRow 
                icon={Download} iconBg="#FAEEDA" iconColor="#854F0B" 
                label="Download my data" sub="Get a copy of all your bookings and earnings" 
                right={<button className="border border-[var(--border-secondary)] bg-[var(--bg-primary)] text-[var(--text-secondary)] text-[11px] px-3 py-1 rounded-md hover:bg-[var(--bg-secondary)] cursor-pointer">Request export</button>} 
              />
              <SettingRow 
                icon={Pause} iconBg="#FAEEDA" iconColor="#854F0B" 
                label="Pause account" sub="Temporarily stop receiving bookings" 
                right={<button className="border border-[var(--border-secondary)] bg-[var(--bg-primary)] text-[var(--text-secondary)] text-[11px] px-3 py-1 rounded-md hover:bg-[var(--bg-secondary)] cursor-pointer">Pause</button>} 
              />
            </div>

            <div className="bg-[#FCEBEB] border border-[#F09595] rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#F09595]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#FCEBEB] text-[#A32D2D]">
                    <LogOut size={16} />
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-[#A32D2D] leading-tight">Sign out</div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Sign out of this device</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="border border-[#F09595] bg-[var(--bg-primary)] text-[#A32D2D] text-[11px] px-3 py-1 rounded-md hover:bg-[#FCEBEB] cursor-pointer">Sign out</button>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3 border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#FCEBEB] text-[#A32D2D]">
                    <Trash2 size={16} />
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-[#A32D2D] leading-tight">Delete account</div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Permanently remove all data. Cannot be undone.</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="border border-[#F09595] bg-[var(--bg-primary)] text-[#A32D2D] text-[11px] px-3 py-1 rounded-md hover:bg-[#FCEBEB] cursor-pointer">Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
