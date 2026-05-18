"use client";

import { useRouter } from "next/navigation";
import { 
  MessageCircle, AirVent, Clock, CalendarCheck, 
  Banknote, Star, Users, Wrench, Receipt, Plug, Droplet, Home
} from "lucide-react";

export default function CustomerDashboardPage() {
  const router = useRouter();

  return (
    <div className="p-5 max-w-5xl">
      {/* Welcome & Action */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-5 gap-3">
        <div>
          <div className="text-[18px] font-medium text-[var(--text-primary)] mb-1">Good morning, Umair 👋</div>
          <div className="text-[13px] text-[var(--text-secondary)]">Thursday, 21 May 2026 · Islamabad</div>
        </div>
        <button 
          onClick={() => router.push("/chat")}
          className="bg-[#1D9E75] text-white border-none px-4 py-2 rounded-md text-[13px] font-medium cursor-pointer hover:bg-[#0F6E56] transition-colors flex items-center gap-1.5"
        >
          <MessageCircle size={16} /> Book a service
        </button>
      </div>

      {/* Upcoming Booking */}
      <div className="bg-[#E1F5EE] border border-[#9FE1CB] rounded-xl p-4 mb-5 flex items-center gap-3.5">
        <div className="w-10 h-10 bg-[#1D9E75] rounded-[10px] flex items-center justify-center text-white shrink-0">
          <AirVent size={20} />
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-medium text-[#085041] mb-0.5">Upcoming: AC Technician — Ali AC Services</div>
          <div className="text-[12px] text-[#0F6E56] flex items-center gap-1 flex-wrap">
            <Clock size={12} /> Today at 10:00 AM · G-13, Islamabad · PKR 1,200
          </div>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <button className="bg-[#1D9E75] text-white border border-[#1D9E75] px-3 py-1.5 rounded-md text-[11px] font-medium cursor-pointer hover:bg-[#0F6E56] transition-colors">
            View details
          </button>
          <button className="bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-tertiary)] px-3 py-1.5 rounded-md text-[11px] cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
            Cancel
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
        <div className="bg-[var(--bg-secondary)] rounded-md p-3">
          <div className="text-[11px] text-[var(--text-secondary)] mb-1 flex items-center gap-1">
            <CalendarCheck size={12} /> Total bookings
          </div>
          <div className="text-[20px] font-medium text-[var(--text-primary)]">12</div>
          <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Since joining</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-md p-3">
          <div className="text-[11px] text-[var(--text-secondary)] mb-1 flex items-center gap-1">
            <Banknote size={12} /> Total spent
          </div>
          <div className="text-[20px] font-medium text-[#1D9E75]">14,200</div>
          <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">PKR lifetime</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-md p-3">
          <div className="text-[11px] text-[var(--text-secondary)] mb-1 flex items-center gap-1">
            <Star size={12} /> Reviews given
          </div>
          <div className="text-[20px] font-medium text-[var(--text-primary)]">8</div>
          <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">avg rating given 4.6</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-md p-3">
          <div className="text-[11px] text-[var(--text-secondary)] mb-1 flex items-center gap-1">
            <Users size={12} /> Saved providers
          </div>
          <div className="text-[20px] font-medium text-[var(--text-primary)]">4</div>
          <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Across 3 categories</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="text-[13px] font-medium text-[var(--text-primary)] mb-2.5">Quick actions</div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-5">
        <div 
          onClick={() => router.push("/chat")}
          className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-3 text-center cursor-pointer hover:border-[#1D9E75] hover:bg-[#E1F5EE] transition-colors"
        >
          <MessageCircle size={22} className="text-[#1D9E75] mx-auto mb-1.5" />
          <span className="text-[12px] text-[var(--text-primary)]">AI booking</span>
        </div>
        <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-3 text-center cursor-pointer hover:border-[#1D9E75] hover:bg-[#E1F5EE] transition-colors">
          <Wrench size={22} className="text-[#1D9E75] mx-auto mb-1.5" />
          <span className="text-[12px] text-[var(--text-primary)]">Manual booking</span>
        </div>
        <div 
          onClick={() => router.push("/providers")}
          className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-3 text-center cursor-pointer hover:border-[#1D9E75] hover:bg-[#E1F5EE] transition-colors"
        >
          <Users size={22} className="text-[#1D9E75] mx-auto mb-1.5" />
          <span className="text-[12px] text-[var(--text-primary)]">Browse providers</span>
        </div>
        <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl p-3 text-center cursor-pointer hover:border-[#1D9E75] hover:bg-[#E1F5EE] transition-colors">
          <Receipt size={22} className="text-[#1D9E75] mx-auto mb-1.5" />
          <span className="text-[12px] text-[var(--text-primary)]">Pay a bill</span>
        </div>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 mb-4">
        {/* Recent Bookings */}
        <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-[var(--border-tertiary)]">
            <span className="text-[13px] font-medium text-[var(--text-primary)]">Recent bookings</span>
            <span className="text-[12px] text-[#1D9E75] cursor-pointer hover:underline">See all</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 p-2.5 border-b border-[var(--border-tertiary)] cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
              <div className="w-8 h-8 bg-[#E1F5EE] rounded-lg flex items-center justify-center shrink-0">
                <AirVent size={16} className="text-[#0F6E56]" />
              </div>
              <div className="flex-1">
                <div className="text-[12px] font-medium text-[var(--text-primary)]">AC Technician</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-px">Ali AC Services · 21 May</div>
              </div>
              <div className="text-right">
                <div className="text-[12px] font-medium text-[var(--text-primary)]">PKR 1,200</div>
                <span className="text-[10px] bg-[#E1F5EE] text-[#085041] px-1.5 py-0.5 rounded-full font-medium mt-0.5 inline-block">Confirmed</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5 p-2.5 border-b border-[var(--border-tertiary)] cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
              <div className="w-8 h-8 bg-[#EEEDFE] rounded-lg flex items-center justify-center shrink-0">
                <Plug size={16} className="text-[#534AB7]" />
              </div>
              <div className="flex-1">
                <div className="text-[12px] font-medium text-[var(--text-primary)]">Electrician</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-px">Rehman Electricals · 12 May</div>
              </div>
              <div className="text-right">
                <div className="text-[12px] font-medium text-[var(--text-primary)]">PKR 900</div>
                <span className="text-[10px] bg-[#EAF3DE] text-[#27500A] px-1.5 py-0.5 rounded-full font-medium mt-0.5 inline-block">Completed</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 border-b border-[var(--border-tertiary)] cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
              <div className="w-8 h-8 bg-[#FAEEDA] rounded-lg flex items-center justify-center shrink-0">
                <Droplet size={16} className="text-[#854F0B]" />
              </div>
              <div className="flex-1">
                <div className="text-[12px] font-medium text-[var(--text-primary)]">Plumber</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-px">Master Plumbers · 5 May</div>
              </div>
              <div className="text-right">
                <div className="text-[12px] font-medium text-[var(--text-primary)]">PKR 650</div>
                <span className="text-[10px] bg-[#EAF3DE] text-[#27500A] px-1.5 py-0.5 rounded-full font-medium mt-0.5 inline-block">Completed</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
              <div className="w-8 h-8 bg-[#FCEBEB] rounded-lg flex items-center justify-center shrink-0">
                <Home size={16} className="text-[#A32D2D]" />
              </div>
              <div className="flex-1">
                <div className="text-[12px] font-medium text-[var(--text-primary)]">Cleaner</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-px">HomeClean Pro · 28 Apr</div>
              </div>
              <div className="text-right">
                <div className="text-[12px] font-medium text-[var(--text-primary)]">PKR 800</div>
                <span className="text-[10px] bg-[#FCEBEB] text-[#791F1F] px-1.5 py-0.5 rounded-full font-medium mt-0.5 inline-block">Cancelled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Providers */}
        <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-[var(--border-tertiary)]">
            <span className="text-[13px] font-medium text-[var(--text-primary)]">Saved providers</span>
            <span className="text-[12px] text-[#1D9E75] cursor-pointer hover:underline">Manage</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 p-2.5 border-b border-[var(--border-tertiary)] cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#E1F5EE] text-[#085041] flex items-center justify-center text-[11px] font-medium shrink-0">AA</div>
              <div className="flex-1">
                <div className="text-[12px] font-medium text-[var(--text-primary)]">Ali AC Services</div>
                <div className="text-[11px] text-[var(--text-secondary)]">AC Technician · ⭐ 4.7</div>
              </div>
              <button className="bg-[#E1F5EE] text-[#085041] border border-[#9FE1CB] rounded-md px-2.5 py-1 text-[11px] cursor-pointer hover:bg-[#1D9E75] hover:text-white hover:border-[#1D9E75] transition-colors">
                Rebook
              </button>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 border-b border-[var(--border-tertiary)] cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#EEEDFE] text-[#3C3489] flex items-center justify-center text-[11px] font-medium shrink-0">RE</div>
              <div className="flex-1">
                <div className="text-[12px] font-medium text-[var(--text-primary)]">Rehman Electricals</div>
                <div className="text-[11px] text-[var(--text-secondary)]">Electrician · ⭐ 4.8</div>
              </div>
              <button className="bg-[#E1F5EE] text-[#085041] border border-[#9FE1CB] rounded-md px-2.5 py-1 text-[11px] cursor-pointer hover:bg-[#1D9E75] hover:text-white hover:border-[#1D9E75] transition-colors">
                Rebook
              </button>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 border-b border-[var(--border-tertiary)] cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#FAEEDA] text-[#633806] flex items-center justify-center text-[11px] font-medium shrink-0">MP</div>
              <div className="flex-1">
                <div className="text-[12px] font-medium text-[var(--text-primary)]">Master Plumbers Pk</div>
                <div className="text-[11px] text-[var(--text-secondary)]">Plumber · ⭐ 4.6</div>
              </div>
              <button className="bg-[#E1F5EE] text-[#085041] border border-[#9FE1CB] rounded-md px-2.5 py-1 text-[11px] cursor-pointer hover:bg-[#1D9E75] hover:text-white hover:border-[#1D9E75] transition-colors">
                Rebook
              </button>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#EAF3DE] text-[#27500A] flex items-center justify-center text-[11px] font-medium shrink-0">CT</div>
              <div className="flex-1">
                <div className="text-[12px] font-medium text-[var(--text-primary)]">City Tutor Network</div>
                <div className="text-[11px] text-[var(--text-secondary)]">Tutor · ⭐ 4.9</div>
              </div>
              <button className="bg-[#E1F5EE] text-[#085041] border border-[#9FE1CB] rounded-md px-2.5 py-1 text-[11px] cursor-pointer hover:bg-[#1D9E75] hover:text-white hover:border-[#1D9E75] transition-colors">
                Rebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
