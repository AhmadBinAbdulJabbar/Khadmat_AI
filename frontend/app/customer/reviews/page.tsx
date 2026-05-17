"use client";

import { Clock, Plug, Star, Check, Snowflake, Home } from "lucide-react";
import { useState } from "react";

export default function CustomerReviewsPage() {
  const [rating, setRating] = useState(4);
  const [aspects, setAspects] = useState<string[]>(["Punctual", "Fair price"]);

  const toggleAspect = (a: string) => {
    if (aspects.includes(a)) setAspects(aspects.filter(x => x !== a));
    else setAspects([...aspects, a]);
  };

  return (
    <div className="p-5 max-w-4xl">
      <div className="mb-5">
        <h1 className="text-[16px] font-medium text-[var(--text-primary)]">My reviews</h1>
        <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">Rate completed services and view your review history</p>
      </div>

      <div className="bg-[#FAEEDA] dark:bg-[#2a1e0d] border border-[#854F0B] rounded-xl p-3 flex items-center gap-2 mb-4 text-[12px] text-[#EF9F27]">
        <Clock size={16} className="shrink-0" />
        2 services are waiting for your review — your feedback helps other customers!
      </div>

      <div className="text-[12px] font-medium text-[var(--text-primary)] mb-2 flex items-center gap-1.5">
        <Clock size={14} className="text-[#EF9F27]" /> Pending review
      </div>

      <div className="bg-[var(--bg-secondary)] border-[1.5px] border-[#EF9F27] rounded-xl p-4 mb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#EEEDFE] dark:bg-[#1a1e2e] shrink-0">
              <Plug size={16} className="text-[#7F77DD]" />
            </div>
            <div>
              <div className="text-[13px] font-medium text-[var(--text-primary)]">Electrician — wiring repair</div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Rehman Electricals · 12 May</div>
            </div>
          </div>
          <div className="text-[11px] text-[var(--text-secondary)]">
            9 days ago
          </div>
        </div>

        <div className="flex gap-1 mb-2">
          {[1, 2, 3, 4, 5].map(star => (
            <Star 
              key={star} 
              size={24} 
              onClick={() => setRating(star)}
              className={`cursor-pointer transition-colors ${
                star <= rating ? "text-[#EF9F27] fill-current" : "text-[var(--text-tertiary)]"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-2">
          {["Punctual", "Professional", "Fair price", "Would recommend", "Late arrival"].map(a => (
            <button
              key={a}
              onClick={() => toggleAspect(a)}
              className={`border rounded-full px-3 py-1 text-[11px] cursor-pointer transition-colors ${
                aspects.includes(a)
                  ? "bg-[#E1F5EE] dark:bg-[#1a2e26] border-[#1D9E75] text-[#1D9E75] font-medium"
                  : "bg-[var(--bg-primary)] border-[var(--border-tertiary)] text-[var(--text-secondary)] hover:border-[#1D9E75] hover:text-[#1D9E75]"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        <textarea 
          className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md p-2 text-[12px] text-[var(--text-primary)] outline-none focus:border-[#1D9E75] transition-colors resize-none placeholder:text-[var(--text-tertiary)]"
          rows={2}
          placeholder="Share your experience..."
        ></textarea>

        <div className="flex items-center justify-between mt-2">
          <button className="text-[11px] text-[var(--text-secondary)] bg-transparent border-none cursor-pointer p-1.5 hover:text-[var(--text-primary)]">
            Skip
          </button>
          <button className="bg-[#1D9E75] text-white border-none rounded-md px-4 py-1.5 text-[12px] font-medium cursor-pointer hover:bg-[#0F6E56] transition-colors">
            Submit review
          </button>
        </div>
      </div>

      <div className="text-[12px] font-medium text-[var(--text-primary)] mb-2 mt-5 flex items-center gap-1.5">
        <Check size={14} className="text-[#1D9E75]" /> Reviews given (8)
      </div>

      <div className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-xl overflow-hidden">
        <div className="p-1">
          <div className="p-3 sm:p-4 border-b border-[var(--border-secondary)]">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#E1F5EE] dark:bg-[#0d2e1e] shrink-0">
                    <Snowflake size={14} className="text-[#1D9E75]" />
                  </div>
                  <div>
                    <div className="text-[12px] font-medium text-[var(--text-primary)]">AC Technician · Ali AC Services</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">21 May 2026</div>
                  </div>
                </div>
                <div className="text-[12px] text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                  Bahut acha kaam kiya! Punctual tha aur AC bilkul theek ho gaya.
                </div>
              </div>
              <div className="flex gap-0.5 text-[#EF9F27]">
                <Star size={13} className="fill-current" />
                <Star size={13} className="fill-current" />
                <Star size={13} className="fill-current" />
                <Star size={13} className="fill-current" />
                <Star size={13} className="fill-current" />
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#FAEEDA] dark:bg-[#1e1a0d] shrink-0">
                    <Home size={14} className="text-[#EF9F27]" />
                  </div>
                  <div>
                    <div className="text-[12px] font-medium text-[var(--text-primary)]">Cleaner · HomeClean Pro</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">2 May 2026</div>
                  </div>
                </div>
                <div className="text-[12px] text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                  Good work, a bit slow but quality was solid.
                </div>
              </div>
              <div className="flex gap-0.5 text-[#EF9F27]">
                <Star size={13} className="fill-current" />
                <Star size={13} className="fill-current" />
                <Star size={13} className="fill-current" />
                <Star size={13} className="fill-current" />
                <Star size={13} className="text-[var(--border-secondary)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
