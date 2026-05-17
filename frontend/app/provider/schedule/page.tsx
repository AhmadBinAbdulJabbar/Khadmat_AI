"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CalendarOff } from "lucide-react";

export default function ProviderSchedulePage() {
  const [workingDays, setWorkingDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri"]);

  const toggleDay = (day: string) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter(d => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  const days = [
    { name: "Mon", num: 19, isToday: false },
    { name: "Tue", num: 20, isToday: false },
    { name: "Wed", num: 21, isToday: true },
    { name: "Thu", num: 22, isToday: false },
    { name: "Fri", num: 23, isToday: false },
    { name: "Sat", num: 24, isToday: false },
    { name: "Sun", num: 25, isToday: false },
  ];

  const times = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "2 PM", "4 PM"];

  // Mock events grid [timeIndex][dayIndex]
  const events = {
    "0": { "2": { type: "confirmed", title: "AC filter clean", customer: "Ahmed U." } },
    "1": { "0": { type: "completed", title: "AC repair", customer: "Completed" }, "3": { type: "new", title: "AC check", customer: "Pending" } },
    "2": { "1": { type: "completed", title: "Gas refill", customer: "Completed" }, "2": { type: "new", title: "Request", customer: "Ahmed U." }, "4": { type: "confirmed", title: "AC install", customer: "Maryam K." } },
    "4": { "3": { type: "confirmed", title: "AC service", customer: "Sara K." } },
    "5": { "1": { type: "confirmed", title: "Filter replace", customer: "Omar S." }, "2": { type: "confirmed", title: "Gas refill", customer: "Sara K." } },
    "6": { "4": { type: "confirmed", title: "AC unit check", customer: "Bilal A." } }
  } as Record<string, Record<string, { type: string, title: string, customer: string }>>;

  return (
    <div className="p-5 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <div>
          <div className="text-base font-medium text-[var(--text-primary)]">Schedule</div>
          <div className="text-xs text-[var(--text-secondary)] mt-0.5">Week of 19–25 May 2026</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-[13px] text-[var(--text-primary)]">
            <button className="w-7 h-7 border border-[var(--border-tertiary)] rounded-md flex items-center justify-center cursor-pointer text-[var(--text-secondary)] bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] transition-colors">
              <ArrowLeft size={14} />
            </button>
            <span className="text-xs font-medium w-[80px] text-center">19 – 25 May</span>
            <button className="w-7 h-7 border border-[var(--border-tertiary)] rounded-md flex items-center justify-center cursor-pointer text-[var(--text-secondary)] bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] transition-colors">
              <ArrowRight size={14} />
            </button>
          </div>
          <button className="text-xs px-3 py-1.5 border border-[var(--border-secondary)] rounded-md cursor-pointer text-[var(--text-secondary)] bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] transition-colors font-medium ml-1">
            Today
          </button>
        </div>
      </div>

      <div className="border border-[var(--border-tertiary)] rounded-xl overflow-x-auto bg-[var(--bg-primary)] shadow-sm mb-4">
        <div className="min-w-[700px]">
          {/* Day Headers */}
          <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-[var(--border-tertiary)] bg-[var(--bg-secondary)]">
            <div className="border-r border-[var(--border-tertiary)]"></div>
            {days.map((day, i) => (
              <div key={day.name} className={`px-1.5 py-2 text-center border-r border-[var(--border-tertiary)] last:border-r-0 ${!workingDays.includes(day.name) ? 'opacity-50' : ''}`}>
                <div className={`text-[11px] ${day.isToday ? 'text-[#1D9E75] font-medium' : 'text-[var(--text-secondary)]'}`}>
                  {day.name}
                </div>
                {day.isToday ? (
                  <div className="text-sm font-medium text-white bg-[#1D9E75] w-6 h-6 rounded-full flex items-center justify-center mx-auto mt-0.5">
                    {day.num}
                  </div>
                ) : (
                  <div className="text-sm font-medium text-[var(--text-primary)] mt-0.5">
                    {day.num}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Time Grid */}
          <div className="grid grid-cols-[60px_repeat(7,1fr)] bg-[var(--bg-primary)]">
            {times.map((time, rowIdx) => (
              <div key={time} className="contents">
                <div className="text-[10px] text-[var(--text-tertiary)] text-right px-1.5 py-2 border-r border-b border-[var(--border-tertiary)] bg-[var(--bg-secondary)] font-medium">
                  {time}
                </div>
                {days.map((day, colIdx) => {
                  const event = events[rowIdx.toString()]?.[colIdx.toString()];
                  const isBlocked = !workingDays.includes(day.name);
                  
                  return (
                    <div key={`${rowIdx}-${colIdx}`} className={`border-r border-b border-[var(--border-tertiary)] p-0.5 last:border-r-0 min-h-[44px] relative ${isBlocked ? 'bg-[var(--bg-secondary)]' : ''}`}>
                      {isBlocked && !event && (
                        <div className="absolute inset-0 bg-[var(--bg-secondary)] border-l-2 border-[var(--border-secondary)] m-0.5 rounded-sm opacity-50 pointer-events-none"></div>
                      )}
                      {event && (
                        <div className={`rounded text-[10px] p-1 font-medium leading-tight cursor-pointer shadow-sm hover:brightness-95 transition-all
                          ${event.type === 'confirmed' ? 'bg-[#E1F5EE] text-[#085041] border-l-2 border-[#1D9E75]' :
                            event.type === 'new' ? 'bg-[#FAEEDA] text-[#633806] border-l-2 border-[#EF9F27]' :
                            'bg-[#EAF3DE] text-[#27500A] border-l-2 border-[#639922]'
                          }
                        `}>
                          <div className="truncate">{event.title}</div>
                          <div className="font-normal opacity-90 truncate">{event.customer}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg-secondary)] rounded-xl p-4 shadow-sm border border-[var(--border-tertiary)]">
        <div className="text-[13px] font-medium text-[var(--text-primary)] mb-2.5 flex items-center gap-1.5">
          <CalendarOff size={14} className="text-[var(--text-secondary)]" />
          Working days — click to toggle
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
            const isOn = workingDays.includes(day);
            return (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer min-w-[60px] font-medium ${
                  isOn
                    ? "bg-[#E1F5EE] border border-[#1D9E75] text-[#085041]"
                    : "bg-[var(--bg-primary)] border border-[var(--border-tertiary)] text-[var(--text-secondary)] hover:border-[var(--border-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
