"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Mic,
  ArrowUp,
  Activity,
  MapPin,
  Star,
  Clock,
  CheckCircle2,
  Loader2
} from "lucide-react";

interface TraceStep {
  agent_name: string;
  status: string;
  detail: string;
  tool_called: string;
}

interface Message {
  role: "ai" | "user";
  text?: string;
  providers?: any[];
  booking?: any;
  reminder?: any;
  loading?: boolean;
}

function ChatInterface() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [input, setInput] = useState(initialQuery);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Assalam alaikum! Aap kya service chahte hain? Urdu, Roman Urdu, ya English mein likh saktay hain." }
  ]);
  const [traceSteps, setTraceSteps] = useState<TraceStep[]>([]);
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || processing) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setProcessing(true);
    setTraceSteps([]);
    setSessionInfo(null);

    // Add loading AI message
    setMessages((prev) => [...prev, { role: "ai", loading: true }]);

    try {
      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      
      // Remove loading message and add actual response
      setMessages((prev) => {
        const newMsgs = prev.filter(m => !m.loading);
        
        let aiMsg: Message = { role: "ai", text: data.ai_response_text };
        
        // Show providers if they exist
        if (data.providers && data.providers.length > 0 && !data.booking?.booking_ref) {
          aiMsg.providers = data.providers;
        }
        
        // Show booking if exists
        if (data.booking && data.booking.booking_ref) {
           aiMsg.booking = data.booking;
           aiMsg.reminder = data.reminder;
        }

        return [...newMsgs, aiMsg];
      });

      setTraceSteps(data.trace_steps || []);
      setSessionInfo({
        id: data.session_id,
        duration: "1.2s",
        model: "gemini-1.5-pro",
        status: "All agents complete"
      });

    } catch (err) {
      setMessages((prev) => {
        const newMsgs = prev.filter(m => !m.loading);
        return [...newMsgs, { role: "ai", text: "Sorry, I encountered an error. Please try again." }];
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="bg-[var(--bg-primary)] p-4 sm:p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-4">
          <Link href="/" className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] flex items-center gap-1 transition-colors no-underline">
            <ArrowLeft size={13} /> Home
          </Link>
          <span className="text-xs text-[var(--text-tertiary)]">/</span>
          <Link href="/book" className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors no-underline">
            Book a service
          </Link>
          <span className="text-xs text-[var(--text-tertiary)]">/</span>
          <span className="text-xs text-[var(--text-secondary)]">AI Agent</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] border border-[var(--border-tertiary)] rounded-xl overflow-hidden bg-[var(--bg-primary)] min-h-[600px] shadow-sm">
          
          {/* Chat Column */}
          <div className="flex flex-col border-r border-[var(--border-tertiary)]">
            <div className="px-4 py-3.5 border-b border-[var(--border-tertiary)] flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center text-white text-sm font-semibold shrink-0">
                K
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--text-primary)]">Khadmat AI</div>
                <div className="text-xs text-[var(--text-secondary)]">5 agents ready</div>
              </div>
              <div className="w-2 h-2 bg-[var(--accent)] rounded-full ml-auto animate-pulse"></div>
            </div>

            <div className="flex-1 p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto min-h-[400px] bg-[var(--bg-primary)] max-h-[60vh]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 items-end ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium shrink-0 border ${
                    msg.role === 'ai' 
                      ? 'bg-[var(--accent-light)] text-[var(--accent-dark)] border-[var(--accent-border)]' 
                      : 'bg-[var(--feat-purple)] text-[var(--feat-purple-text)] border-[#CECBF6]'
                  }`}>
                    {msg.role === 'ai' ? 'K' : 'U'}
                  </div>
                  <div className="max-w-[85%]">
                    {msg.role === 'ai' && <div className="text-[11px] text-[var(--text-tertiary)] mb-1 px-1">Khadmat AI</div>}
                    
                    {msg.loading ? (
                      <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-xl rounded-bl-sm p-3 text-[13px] text-[var(--text-primary)] flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin text-[var(--accent)]" /> 
                        <span className="text-[var(--text-secondary)]">Agents are thinking...</span>
                      </div>
                    ) : (
                      <div className={`${
                        msg.role === 'ai' 
                          ? 'bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-xl rounded-bl-sm text-[var(--text-primary)]' 
                          : 'bg-[var(--accent)] text-white rounded-xl rounded-br-sm'
                      } p-3 text-[13px] leading-relaxed`}>
                        {msg.text && <div className="mb-2 whitespace-pre-wrap">{msg.text}</div>}
                        
                        {/* Render Providers */}
                        {msg.providers && (
                          <div className="flex flex-col gap-2 mt-2">
                            {msg.providers.map((p: any, idx: number) => (
                              <div key={p.id} className={`bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-lg p-2.5 cursor-pointer hover:bg-[var(--bg-secondary)] transition-colors ${idx === 0 ? 'border-[var(--accent)] border-[1.5px]' : ''}`}>
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-[13px] font-medium text-[var(--text-primary)]">{p.name}</span>
                                  {idx === 0 && <span className="text-[10px] bg-[var(--accent-light)] text-[var(--accent-dark)] px-2 py-0.5 rounded-full font-medium">#1 best match</span>}
                                  {idx !== 0 && <span className="text-[10px] bg-[var(--feat-lime)] text-[var(--feat-lime-text)] px-2 py-0.5 rounded-full font-medium">available</span>}
                                </div>
                                <div className="flex gap-2.5 text-[11px] text-[var(--text-secondary)] flex-wrap">
                                  <span className="flex items-center gap-1"><MapPin size={10} /> {p.distance}</span>
                                  <span className="flex items-center gap-1"><Star size={10} className="fill-current" /> {p.rating}</span>
                                  <span className="flex items-center gap-1"><Clock size={10} /> {p.time}</span>
                                  <span className="font-medium text-[var(--text-primary)]">{p.price}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Render Booking Confirmation */}
                        {msg.booking && (
                          <div className="mt-2">
                            <div className="flex items-center gap-1.5 mb-2.5 text-[var(--accent-dark)] font-medium text-[13px]">
                              <CheckCircle2 size={16} className="text-[var(--accent)]" /> Booking confirmed!
                            </div>
                            <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-lg p-3 text-xs space-y-1.5 text-[var(--text-primary)]">
                              <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Ref</span><span className="font-mono">{msg.booking.booking_ref}</span></div>
                              <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Provider</span><span>{msg.booking.provider_name}</span></div>
                              <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Time</span><span>{msg.booking.scheduled_time}</span></div>
                              {msg.reminder && <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Reminder</span><span className="text-[var(--accent)] font-medium">{msg.reminder.trigger_at}</span></div>}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 py-3 border-t border-[var(--border-tertiary)] flex items-center gap-2 bg-[var(--bg-primary)]">
              <button className="w-9 h-9 flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-full transition-colors shrink-0">
                <Mic size={18} />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type in Urdu, Roman Urdu, or English..." 
                className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-full px-4 py-2 text-[13px] outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-tertiary)]"
                disabled={processing}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || processing}
                className="w-9 h-9 bg-[var(--accent)] text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--accent-dark)] transition-colors shrink-0"
              >
                {processing ? <Loader2 size={16} className="animate-spin" /> : <ArrowUp size={16} />}
              </button>
            </div>
          </div>

          {/* Trace Column */}
          <div className="bg-[var(--bg-secondary)] flex flex-col lg:border-l-0 border-t lg:border-t-0 border-[var(--border-tertiary)] hidden md:flex">
            <div className="px-4 py-3.5 border-b border-[var(--border-tertiary)] bg-[var(--bg-primary)]">
              <div className="text-[13px] font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <Activity size={14} className="text-[var(--accent)]" /> Agent trace
              </div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Real-time Antigravity log</div>
            </div>

            <div className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto">
              {traceSteps.length > 0 ? traceSteps.map((step, idx) => (
                <div key={idx} className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-lg p-2.5 animate-fade-in">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0"></div>
                    <span className="text-xs font-medium text-[var(--text-primary)]">{step.agent_name}</span>
                    <span className="text-[10px] bg-[var(--accent-light)] text-[var(--accent-dark)] px-2 py-0.5 rounded-full ml-auto font-medium">{step.status}</span>
                  </div>
                  <div className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                    {step.detail}
                  </div>
                  <div className="text-[10px] text-[var(--text-tertiary)] font-mono mt-1.5">
                    tool: {step.tool_called}
                  </div>
                </div>
              )) : (
                <div className="flex flex-col items-center justify-center h-full text-[var(--text-tertiary)]">
                  <Activity size={24} className="mb-2 opacity-50" />
                  <div className="text-xs">Waiting for chat input...</div>
                </div>
              )}
            </div>

            {sessionInfo && (
              <div className="p-3 border-t border-[var(--border-tertiary)] bg-[var(--bg-secondary)] mt-auto">
                <div className="flex justify-between text-[11px] mb-1"><span className="text-[var(--text-tertiary)]">Session</span><span className="text-[var(--text-secondary)] font-mono">{sessionInfo.id}</span></div>
                <div className="flex justify-between text-[11px] mb-1"><span className="text-[var(--text-tertiary)]">Duration</span><span className="text-[var(--text-secondary)] font-mono">{sessionInfo.duration}</span></div>
                <div className="flex justify-between text-[11px] mb-1"><span className="text-[var(--text-tertiary)]">Model</span><span className="text-[var(--text-secondary)] font-mono">{sessionInfo.model}</span></div>
                <div className="flex justify-between text-[11px]"><span className="text-[var(--text-tertiary)]">Status</span><span className="text-[var(--accent)] font-medium">{sessionInfo.status}</span></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatBookingPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[var(--bg-primary)]">
        <Loader2 className="animate-spin text-[var(--accent)]" size={32} />
      </div>
    }>
      <ChatInterface />
    </Suspense>
  );
}
