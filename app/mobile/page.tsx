"use client";

import { type ReactNode, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowUp,
  Bell,
  CalendarCheck2,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Sparkles,
  Star,
} from "lucide-react";
import { OrchestratorResult, runServiceOrchestration } from "@/lib/agentic";

const EXAMPLES = [
  "Mujhe kal subah G-13 mein AC technician chahiye",
  "Tomorrow evening Clifton mein tutor chahiye",
  "مجھے کل صبح جی تیرہ میں اے سی ٹیکنیشن چاہیے",
];

export default function MobileAppDemo() {
  const [input, setInput] = useState(EXAMPLES[0]);
  const [result, setResult] = useState<OrchestratorResult>(() =>
    runServiceOrchestration(EXAMPLES[0], {
      sessionId: "sess_demo_ac_g13",
      now: new Date("2026-05-20T10:00:00+05:00"),
      bookingRef: "BK-20260520-DEMO",
    }),
  );
  const [history, setHistory] = useState<string[]>([EXAMPLES[0]]);
  const [isThinking, setIsThinking] = useState(false);

  const topProviders = useMemo(() => result.providers.slice(0, 3), [result.providers]);

  const submit = async (message = input) => {
    if (!message.trim()) return;
    setIsThinking(true);
    setInput(message);
    setHistory((prev) => [message, ...prev.filter((item) => item !== message)].slice(0, 4));

    window.setTimeout(() => {
      setResult(runServiceOrchestration(message));
      setIsThinking(false);
    }, 450);
  };

  return (
    <main className="min-h-screen bg-[#eef3f1] text-[#17211f]">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-[#fbfdfc] shadow-2xl">
        <header className="sticky top-0 z-10 border-b border-[#dfe7e3] bg-[#fbfdfc]/95 px-4 pb-3 pt-4 backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dfe7e3] text-[#53635e] no-underline"
              aria-label="Back to home"
            >
              <ArrowLeft size={17} />
            </Link>
            <div className="text-center">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1d9e75]">
                Mobile app
              </div>
              <div className="text-base font-semibold text-[#14231f]">Khadmat AI</div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1d9e75] text-white">
              K
            </div>
          </div>

          <div className="rounded-[22px] border border-[#cfe4dc] bg-[#e9f7f2] p-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#0f6e56]">
              <Sparkles size={15} />
              Google Antigravity workflow
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                submit();
              }}
              className="flex items-center gap-2 rounded-2xl border border-[#b9d9ce] bg-white px-3 py-2"
            >
              <MessageCircle size={18} className="shrink-0 text-[#1d9e75]" />
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[13px] text-[#17211f] outline-none placeholder:text-[#7d8b86]"
                placeholder="Urdu, Roman Urdu, or English"
              />
              <button
                type="submit"
                disabled={isThinking}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1d9e75] text-white disabled:opacity-60"
                aria-label="Send request"
              >
                <ArrowUp size={16} />
              </button>
            </form>
          </div>
        </header>

        <section className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                onClick={() => submit(example)}
                className="rounded-full border border-[#dfe7e3] bg-white px-3 py-1.5 text-left text-[11px] text-[#53635e]"
              >
                {example}
              </button>
            ))}
          </div>

          <div className="rounded-[22px] border border-[#dfe7e3] bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7d8b86]">
                  Service request
                </div>
                <div className="mt-1 text-xl font-semibold text-[#14231f]">
                  {result.intent.service_type}
                </div>
              </div>
              <span className="rounded-full bg-[#e9f7f2] px-3 py-1 text-xs font-semibold text-[#0f6e56]">
                {result.intent.language}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <InfoTile icon={<MapPin size={15} />} label="Location" value={result.intent.location} />
              <InfoTile icon={<Clock size={15} />} label="Time" value={result.intent.time} />
            </div>
          </div>

          <div className="rounded-[22px] border border-[#b9d9ce] bg-[#f4fbf8] p-4 shadow-sm">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1d9e75]">
                  Recommended
                </div>
                <div className="mt-1 text-xl font-semibold text-[#14231f]">
                  {result.selected_provider.name}
                </div>
              </div>
              <div className="rounded-2xl bg-white px-3 py-2 text-center shadow-sm">
                <div className="text-[10px] font-semibold uppercase text-[#7d8b86]">Score</div>
                <div className="text-lg font-semibold text-[#0f6e56]">{result.selected_provider.score}</div>
              </div>
            </div>

            <div className="mb-3 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[#53635e]">
                <MapPin size={12} /> {result.selected_provider.distance}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[#53635e]">
                <Star size={12} /> {result.selected_provider.rating}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[#53635e]">
                <Clock size={12} /> {result.selected_provider.time}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-[#34423d]">{result.reasoning}</p>
          </div>

          <div className="rounded-[22px] border border-[#dfe7e3] bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#14231f]">
              <CalendarCheck2 size={18} className="text-[#1d9e75]" />
              Booking receipt
            </div>
            <div className="space-y-2 text-sm">
              <ReceiptRow label="Reference" value={result.booking.booking_ref} mono />
              <ReceiptRow label="Status" value={result.booking.status} accent />
              <ReceiptRow label="Slot" value={result.booking.scheduled_time} />
              <ReceiptRow label="Price" value={result.booking.price_estimate} />
            </div>
          </div>

          <div className="rounded-[22px] border border-[#dfe7e3] bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#14231f]">
              <Bell size={18} className="text-[#1d9e75]" />
              Follow-up automation
            </div>
            <p className="text-sm leading-relaxed text-[#34423d]">{result.reminder.message}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#34423d]">{result.follow_up.completion_check}</p>
          </div>

          <div className="rounded-[22px] border border-[#dfe7e3] bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#14231f]">
              <Activity size={18} className="text-[#1d9e75]" />
              Agent trace
            </div>
            <div className="space-y-2">
              {result.trace_steps.map((step) => (
                <div key={`${step.agent_name}-${step.tool_called}`} className="rounded-2xl bg-[#f6f8f7] p-3">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#14231f]">{step.agent_name}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#e9f7f2] px-2 py-0.5 text-[10px] font-semibold text-[#0f6e56]">
                      <CheckCircle2 size={10} /> {step.status}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#53635e]">{step.detail}</p>
                  <div className="mt-1 font-mono text-[10px] text-[#7d8b86]">{step.tool_called}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-[#dfe7e3] bg-white p-4 shadow-sm">
            <div className="mb-3 text-sm font-semibold text-[#14231f]">Top provider options</div>
            <div className="space-y-2">
              {topProviders.map((provider, index) => (
                <div key={provider.id} className="flex items-center justify-between gap-3 rounded-2xl bg-[#f6f8f7] p-3">
                  <div>
                    <div className="text-sm font-semibold text-[#14231f]">
                      {index + 1}. {provider.name}
                    </div>
                    <div className="text-xs text-[#53635e]">
                      {provider.distance} | {provider.rating}/5 | {provider.time}
                    </div>
                  </div>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[#0f6e56]">
                    {provider.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {history.length > 1 && (
            <div className="pb-5">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7d8b86]">
                Recent
              </div>
              <div className="flex flex-wrap gap-2">
                {history.slice(1).map((item) => (
                  <button
                    key={item}
                    onClick={() => submit(item)}
                    className="rounded-full border border-[#dfe7e3] bg-white px-3 py-1.5 text-[11px] text-[#53635e]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function InfoTile({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#f6f8f7] p-3">
      <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase text-[#7d8b86]">
        {icon}
        {label}
      </div>
      <div className="text-sm font-semibold text-[#14231f]">{value}</div>
    </div>
  );
}

function ReceiptRow({
  label,
  value,
  mono,
  accent,
}: {
  label: string;
  value: string;
  mono?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#edf1ef] pb-2 last:border-b-0 last:pb-0">
      <span className="text-[#7d8b86]">{label}</span>
      <span className={`${mono ? "font-mono" : ""} ${accent ? "font-semibold text-[#0f6e56]" : "text-[#14231f]"}`}>
        {value}
      </span>
    </div>
  );
}
