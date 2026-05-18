"use client";

import { CreditCard, Landmark, Smartphone, Receipt, Download, Snowflake, Plug, Droplet, Home } from "lucide-react";

export default function CustomerBillingPage() {
  return (
    <div className="p-5 max-w-4xl">
      <div className="mb-5">
        <h1 className="text-[16px] font-medium text-[var(--text-primary)]">Billing & payments</h1>
        <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">Your transaction history and payment methods</p>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-xl overflow-hidden mb-4">
        <div className="px-4 py-3 border-b border-[var(--border-secondary)] flex items-center justify-between">
          <span className="text-[13px] font-medium text-[var(--text-primary)] flex items-center gap-1.5">
            <CreditCard size={16} className="text-[#1D9E75]" /> Payment methods saved
          </span>
          <button className="bg-[#E1F5EE] dark:bg-[#1a2e26] text-[#1D9E75] border border-[#1D9E75] rounded-md px-3 py-1.5 text-[12px] cursor-pointer hover:bg-[#1D9E75] hover:text-white transition-colors">
            Add method
          </button>
        </div>
        
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-secondary)]">
          <span className="text-[12px] text-[var(--text-secondary)] flex items-center gap-2">
            <Landmark size={16} /> Meezan Bank — saved
          </span>
          <span className="text-[13px] font-medium text-[var(--text-primary)] flex items-center">
            ••••4521 
            <span className="text-[10px] bg-[#E1F5EE] dark:bg-[#0d2e1e] text-[#1D9E75] px-2 py-0.5 rounded-full ml-2">Default</span>
          </span>
        </div>
        
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-[12px] text-[var(--text-secondary)] flex items-center gap-2">
            <Smartphone size={16} /> Easypaisa
          </span>
          <span className="text-[13px] font-medium text-[var(--text-primary)]">
            0300-1234567
          </span>
        </div>
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border-secondary)] flex items-center justify-between">
          <span className="text-[13px] font-medium text-[var(--text-primary)] flex items-center gap-1.5">
            <Receipt size={16} className="text-[#1D9E75]" /> Transaction history
          </span>
          <button className="bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-tertiary)] rounded-md px-3 py-1.5 text-[12px] cursor-pointer hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
            <Download size={14} /> Export
          </button>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-secondary)] hover:bg-[var(--bg-primary)] transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#E1F5EE] dark:bg-[#0d2e1e] shrink-0">
              <Snowflake size={16} className="text-[#1D9E75]" />
            </div>
            <div>
              <div className="text-[12px] font-medium text-[var(--text-primary)]">AC Technician</div>
              <div className="text-[11px] text-[var(--text-secondary)]">Ali AC Services</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[13px] font-medium text-[#1D9E75]">PKR 1,200</div>
            <span className="text-[10px] bg-[#FAEEDA] dark:bg-[#2a1e0d] text-[#EF9F27] border border-[#854F0B]/30 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">Pending payment</span>
          </div>
          <div className="text-[11px] text-[var(--text-secondary)] text-right min-w-[60px] ml-3">
            21 May
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-secondary)] hover:bg-[var(--bg-primary)] transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#EEEDFE] dark:bg-[#1a1e2e] shrink-0">
              <Plug size={16} className="text-[#7F77DD]" />
            </div>
            <div>
              <div className="text-[12px] font-medium text-[var(--text-primary)]">Electrician</div>
              <div className="text-[11px] text-[var(--text-secondary)]">Rehman Electricals</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[13px] font-medium text-[#1D9E75]">PKR 900</div>
            <span className="text-[10px] bg-[#EAF3DE] dark:bg-[#0d2e1e] text-[#1D9E75] border border-[#1D9E75]/30 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">Paid</span>
          </div>
          <div className="text-[11px] text-[var(--text-secondary)] text-right min-w-[60px] ml-3">
            12 May
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-secondary)] hover:bg-[var(--bg-primary)] transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#FAEEDA] dark:bg-[#1e1a0d] shrink-0">
              <Droplet size={16} className="text-[#EF9F27]" />
            </div>
            <div>
              <div className="text-[12px] font-medium text-[var(--text-primary)]">Plumber</div>
              <div className="text-[11px] text-[var(--text-secondary)]">Master Plumbers</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[13px] font-medium text-[#1D9E75]">PKR 650</div>
            <span className="text-[10px] bg-[#EAF3DE] dark:bg-[#0d2e1e] text-[#1D9E75] border border-[#1D9E75]/30 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">Paid</span>
          </div>
          <div className="text-[11px] text-[var(--text-secondary)] text-right min-w-[60px] ml-3">
            9 May
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-3 hover:bg-[var(--bg-primary)] transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-primary)] dark:bg-[#222] shrink-0">
              <Home size={16} className="text-[var(--text-secondary)]" />
            </div>
            <div>
              <div className="text-[12px] font-medium text-[var(--text-primary)]">Cleaner</div>
              <div className="text-[11px] text-[var(--text-secondary)]">HomeClean Pro</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[13px] font-medium text-[var(--text-tertiary)]">PKR 0</div>
            <span className="text-[10px] bg-[var(--bg-primary)] dark:bg-[#222] text-[var(--text-secondary)] border border-[var(--border-tertiary)] px-2 py-0.5 rounded-full font-medium mt-1 inline-block">Refunded</span>
          </div>
          <div className="text-[11px] text-[var(--text-secondary)] text-right min-w-[60px] ml-3">
            6 May
          </div>
        </div>
      </div>
    </div>
  );
}
