"use client";

import { useState } from "react";
import { Star, MessageSquare, ThumbsUp, Wind, CornerDownRight } from "lucide-react";

export default function ProviderFullReviewsPage() {
  const [filter, setFilter] = useState("All (212)");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const filters = ["All (212)", "5★ (165)", "4★ (30)", "3★ (11)", "Unanswered (8)"];

  const reviews = [
    {
      id: "r1",
      customer: "Ahmed Usman",
      initials: "AU",
      bg: "#EEEDFE",
      fg: "#3C3489",
      service: "AC filter clean",
      dateLabel: "21 May 2026",
      stars: 5,
      timeAgo: "2 hours ago",
      text: "Bahut acha kaam kiya! Bilkul waqt par aaya, kaam professionally kiya aur AC ekdum theek ho gaya. Highly recommend karunga Ali bhai ko. Dobara zaroor bulaun ga.",
      tags: ["Punctual", "Professional", "Fair price"],
      helpful: 12,
      reply: null,
      highlighted: true
    },
    {
      id: "r2",
      customer: "Sara Khan",
      initials: "SK",
      bg: "#E1F5EE",
      fg: "#085041",
      service: "AC gas refill",
      dateLabel: "20 May 2026",
      stars: 5,
      timeAgo: "Yesterday",
      text: "Very professional service. Came on time, explained the issue clearly before starting work. The price was exactly what was quoted. Will definitely book again!",
      tags: ["On time", "Transparent pricing"],
      helpful: 8,
      reply: "Shukria Sara ji! It was a pleasure serving you. Looking forward to helping again whenever needed.",
      highlighted: false
    },
    {
      id: "r3",
      customer: "Bilal Ahmed",
      initials: "BA",
      bg: "#FAEEDA",
      fg: "#633806",
      service: "AC installation",
      dateLabel: "19 May 2026",
      stars: 4,
      timeAgo: "2 days ago",
      text: "Good work overall. Took a bit longer than expected for the installation but the end result was solid. No complaints about quality. Would recommend.",
      tags: ["Quality work", "Slightly slow"],
      helpful: 5,
      reply: null,
      highlighted: false
    },
    {
      id: "r4",
      customer: "Omar Rehman",
      initials: "OR",
      bg: "#FCEBEB",
      fg: "#791F1F",
      service: "AC service",
      dateLabel: "15 May 2026",
      stars: 3,
      timeAgo: "6 days ago",
      text: "The work was okay but he arrived 45 minutes late without calling. The AC is working now but I expected better communication. Price was fine.",
      tags: ["Late arrival", "Work done"],
      helpful: 3,
      reply: null,
      highlighted: false,
      lowRating: true
    }
  ];

  const handleSendReply = (id: string) => {
    alert("Reply sent!");
    setReplyingTo(null);
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < rating ? "text-[#EF9F27]" : "text-[var(--border-secondary)]"}>★</span>
    ));
  };

  return (
    <div className="p-5 max-w-4xl">
      <div className="mb-4">
        <div className="text-base font-medium text-[var(--text-primary)]">Reviews</div>
        <div className="text-xs text-[var(--text-secondary)] mt-0.5">What your customers say about your work</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-5 bg-[var(--bg-secondary)] rounded-xl p-5 mb-4 border border-[var(--border-tertiary)] items-center">
        <div className="text-center">
          <div className="text-[42px] font-medium text-[var(--text-primary)] leading-none">4.7</div>
          <div className="text-lg tracking-[2px] my-1.5 flex justify-center">
            {renderStars(5)}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">212 total reviews</div>
          <div className="text-[11px] text-[var(--text-tertiary)] mt-1">Top 5% of providers</div>
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { label: "5", width: "78%", count: 165 },
            { label: "4", width: "14%", count: 30 },
            { label: "3", width: "5%", count: 11 },
            { label: "2", width: "2%", count: 4 },
            { label: "1", width: "1%", count: 2 },
          ].map(r => (
            <div key={r.label} className="flex items-center gap-2">
              <div className="w-6 text-xs text-[var(--text-secondary)] text-right shrink-0">{r.label}</div>
              <div className="text-[11px] text-[#EF9F27] shrink-0">★</div>
              <div className="flex-1 h-2 bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-full overflow-hidden">
                <div className="h-full bg-[#EF9F27] rounded-full" style={{ width: r.width }}></div>
              </div>
              <div className="w-7 text-[11px] text-[var(--text-secondary)] text-right shrink-0">{r.count}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5 mb-4">
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3 text-center">
          <div className="text-lg font-medium text-[#1D9E75]">96%</div>
          <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Would recommend</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3 text-center">
          <div className="text-lg font-medium text-[var(--text-primary)]">4.9</div>
          <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Punctuality score</div>
        </div>
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3 text-center">
          <div className="text-lg font-medium text-[var(--text-primary)]">4.8</div>
          <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Value for money</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`border rounded-full px-3 py-1 text-xs transition-colors cursor-pointer ${
              filter === f
                ? "bg-[#E1F5EE] border-[#1D9E75] text-[#085041] font-medium"
                : "bg-[var(--bg-primary)] border-[var(--border-tertiary)] text-[var(--text-secondary)] hover:border-[#1D9E75] hover:text-[#1D9E75]"
            }`}
          >
            {f}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1 text-xs text-[var(--text-secondary)]">
          Sort: 
          <select className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-md px-2 py-1 text-xs text-[var(--text-primary)] outline-none cursor-pointer">
            <option>Newest first</option>
            <option>Oldest first</option>
            <option>Lowest rating</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {reviews.map(r => (
          <div key={r.id} className={`bg-[var(--bg-primary)] border rounded-xl p-4 ${r.highlighted ? 'border-[#EF9F27]' : r.lowRating ? 'border-[#F09595]' : 'border-[var(--border-tertiary)]'}`}>
            <div className="flex items-start justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-xs font-medium shrink-0" style={{ backgroundColor: r.bg, color: r.fg }}>
                  {r.initials}
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[var(--text-primary)]">{r.customer}</div>
                  <div className="text-[11px] text-[var(--text-secondary)] mt-0.5 flex items-center gap-1">
                    <Wind size={12} /> {r.service} · {r.dateLabel}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[14px] tracking-[1px]">{renderStars(r.stars)}</div>
                <div className="text-[11px] text-[var(--text-tertiary)] mt-0.5">{r.stars}.0 · {r.timeAgo}</div>
              </div>
            </div>

            <div className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-2.5">
              {r.text}
            </div>

            {r.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {r.tags.map(t => (
                  <span key={t} className="text-[11px] bg-[var(--bg-secondary)] text-[var(--text-secondary)] px-2.5 py-0.5 rounded-full border border-[var(--border-tertiary)]">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-2.5 border-t border-[var(--border-tertiary)]">
              <div className="text-[11px] text-[var(--text-secondary)] flex items-center gap-1.5">
                <ThumbsUp size={13} /> {r.helpful} found helpful
              </div>
              <button 
                onClick={() => setReplyingTo(replyingTo === r.id ? null : r.id)}
                className="text-[11px] text-[#1D9E75] bg-transparent border border-[#9FE1CB] rounded-md px-2.5 py-1 flex items-center gap-1 cursor-pointer hover:bg-[#E1F5EE] transition-colors font-medium"
              >
                <MessageSquare size={12} /> Reply
              </button>
            </div>

            {/* Existing Reply */}
            {r.reply && (
              <div className="bg-[#E1F5EE] border border-[#9FE1CB] rounded-md px-3 py-2.5 mt-2">
                <div className="text-[11px] text-[#0F6E56] font-medium mb-1 flex items-center gap-1">
                  <CornerDownRight size={12} /> Your reply
                </div>
                <div className="text-xs text-[#085041] leading-relaxed">
                  {r.reply}
                </div>
              </div>
            )}

            {/* Reply Input Form */}
            {replyingTo === r.id && !r.reply && (
              <div className="mt-2 flex flex-col gap-1.5 animate-fade-in">
                <textarea 
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-md px-2.5 py-2 text-xs text-[var(--text-primary)] outline-none resize-none focus:border-[#1D9E75]" 
                  rows={2} 
                  placeholder={r.lowRating ? "Apologise and address the concern..." : "Write a thank you or address their feedback..."}
                ></textarea>
                <button 
                  onClick={() => handleSendReply(r.id)}
                  className="self-end bg-[#1D9E75] text-white border-none px-3 py-1.5 rounded-md text-[11px] font-medium cursor-pointer hover:bg-[#0F6E56] transition-colors"
                >
                  Send reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
