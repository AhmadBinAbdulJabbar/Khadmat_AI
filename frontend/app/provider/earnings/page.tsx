"use client";

import { useState } from "react";
import { ArrowUp, Download } from "lucide-react";

export default function ProviderEarningsPage() {
  const [period, setPeriod] = useState("6 months");
  const [showWithdraw, setShowWithdraw] = useState(false);

  const chartData = [
    { month: "Dec", val: "22k", height: "58%" },
    { month: "Jan", val: "18k", height: "47%" },
    { month: "Feb", val: "28k", height: "73%" },
    { month: "Mar", val: "31k", height: "81%" },
    { month: "Apr", val: "31k", height: "81%" },
    { month: "May", val: "38k", height: "100%", isCurrent: true },
  ];

  const transactions = [
    { id: 1, service: "AC filter clean", status: "Pending", customer: "Ahmed Usman", date: "21 May", amount: "PKR 1,200" },
    { id: 2, service: "AC gas refill", status: "Paid", customer: "Sara Khan", date: "20 May", amount: "PKR 1,500" },
    { id: 3, service: "AC installation", status: "Paid", customer: "Bilal Ahmed", date: "19 May", amount: "PKR 2,200" },
    { id: 4, service: "AC repair", status: "Paid", customer: "Omar Siddiqui", date: "17 May", amount: "PKR 900" },
    { id: 5, service: "Filter replace", status: "Paid", customer: "Zara Hassan", date: "16 May", amount: "PKR 800" },
  ];

  const handleWithdraw = async () => {
    // API Call to withdraw
    alert("Withdrawal requested successfully!");
    setShowWithdraw(false);
  };

  return (
    <div className="p-5 max-w-4xl relative">
      <div className="mb-4">
        <div className="text-base font-medium text-[var(--text-primary)]">Earnings</div>
        <div className="text-xs text-[var(--text-secondary)] mt-0.5">Track your income and payouts</div>
      </div>

      <div className="bg-[#E1F5EE] border border-[#9FE1CB] rounded-xl p-5 flex items-center justify-between mb-4">
        <div>
          <div className="text-xs text-[#0F6E56] mb-1">Available balance</div>
          <div className="text-[28px] font-medium text-[#085041] leading-none mb-1.5">PKR 12,800</div>
          <div className="text-[11px] text-[#0F6E56]">Last payout: PKR 25,600 on 15 May 2026</div>
        </div>
        <button 
          onClick={() => setShowWithdraw(true)}
          className="bg-[#1D9E75] text-white border-none px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-[#0F6E56] transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <ArrowUp size={16} /> Withdraw
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2.5 mb-5">
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
          <div className="text-[11px] text-[var(--text-secondary)] mb-1">This month</div>
          <div className="text-[18px] font-medium text-[#1D9E75]">38,400</div>
          <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">PKR · 32 jobs</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
          <div className="text-[11px] text-[var(--text-secondary)] mb-1">Last month</div>
          <div className="text-[18px] font-medium text-[var(--text-primary)]">31,200</div>
          <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">PKR · 27 jobs</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
          <div className="text-[11px] text-[var(--text-secondary)] mb-1">This year</div>
          <div className="text-[18px] font-medium text-[var(--text-primary)]">2,14,000</div>
          <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">PKR · 212 jobs</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="text-[13px] font-medium text-[var(--text-primary)]">Monthly earnings</div>
        <div className="flex border border-[var(--border-tertiary)] rounded-md overflow-hidden bg-[var(--bg-secondary)]">
          {["6 months", "1 year"].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 text-[11px] cursor-pointer transition-colors ${
                period === p ? "bg-[var(--bg-primary)] text-[var(--text-primary)] font-medium shadow-sm" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-end gap-1.5 h-[100px] pb-1 border-b border-[var(--border-tertiary)]">
          {chartData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
              <span className="text-[9px] text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity">{d.val}</span>
              <div 
                className={`w-full rounded-t-[3px] transition-all duration-500 ease-out ${d.isCurrent ? 'bg-[#1D9E75] border-t-2 border-[#0F6E56]' : 'bg-[#E1F5EE] border-t-2 border-[#1D9E75] opacity-80 hover:opacity-100'}`} 
                style={{ height: d.height }}
              ></div>
            </div>
          ))}
        </div>
        <div className="flex gap-1.5 mt-1.5">
          {chartData.map((d, i) => (
            <div key={i} className="flex-1 text-center text-[9px] text-[var(--text-tertiary)]">
              {d.month}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="text-[13px] font-medium text-[var(--text-primary)]">Transaction history</div>
        <button className="text-[12px] text-[#1D9E75] cursor-pointer hover:underline flex items-center gap-1 border-none bg-transparent font-medium">
          <Download size={13} /> Download PDF
        </button>
      </div>

      <div className="border border-[var(--border-tertiary)] rounded-xl overflow-hidden bg-[var(--bg-primary)] text-left">
        <div className="grid grid-cols-[1fr_1fr_80px_80px] gap-2 px-3.5 py-2.5 bg-[var(--bg-secondary)] border-b border-[var(--border-tertiary)] text-[11px] font-medium text-[var(--text-secondary)]">
          <div>Service</div>
          <div>Customer</div>
          <div>Date</div>
          <div className="text-right">Amount</div>
        </div>
        <div className="flex flex-col">
          {transactions.map((t, i) => (
            <div key={t.id} className="grid grid-cols-[1fr_1fr_80px_80px] gap-2 px-3.5 py-2.5 border-b border-[var(--border-tertiary)] last:border-b-0 items-center hover:bg-[var(--bg-secondary)] transition-colors">
              <div>
                <div className="text-xs font-medium text-[var(--text-primary)] mb-0.5">{t.service}</div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${t.status === 'Paid' ? 'bg-[#E1F5EE] text-[#085041]' : 'bg-[#FAEEDA] text-[#633806]'}`}>
                  {t.status}
                </span>
              </div>
              <div className="text-[11px] text-[var(--text-secondary)] truncate">{t.customer}</div>
              <div className="text-[11px] text-[var(--text-secondary)]">{t.date}</div>
              <div className="text-[13px] font-medium text-[#1D9E75] text-right">{t.amount}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdrawal Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--bg-primary)] rounded-xl p-5 w-full max-w-sm shadow-xl animate-fade-in">
            <div className="text-lg font-medium text-[var(--text-primary)] mb-1">Withdraw Funds</div>
            <div className="text-sm text-[var(--text-secondary)] mb-4">You have PKR 12,800 available to withdraw.</div>
            
            <div className="mb-4">
              <label className="text-xs text-[var(--text-secondary)] mb-1 block">Amount (PKR)</label>
              <input type="number" defaultValue={12800} max={12800} className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 outline-none focus:border-[var(--accent)] text-sm text-[var(--text-primary)]" />
            </div>
            
            <div className="mb-5">
              <label className="text-xs text-[var(--text-secondary)] mb-1 block">Bank Account</label>
              <select className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 outline-none focus:border-[var(--accent)] text-sm text-[var(--text-primary)] cursor-pointer">
                <option>HBL ending in 3412</option>
                <option>Meezan ending in 9982</option>
              </select>
            </div>
            
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowWithdraw(false)} className="px-4 py-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-secondary)] hover:bg-[var(--border-tertiary)] rounded-lg transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleWithdraw} className="px-4 py-2 text-sm text-white bg-[#1D9E75] hover:bg-[#0F6E56] rounded-lg transition-colors cursor-pointer font-medium">Confirm Withdrawal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
