"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Mic, ArrowUp, User as UserIcon, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { ViewDetailsConfirmedModal } from "../jobs/Modals";

interface Message {
  id: string;
  sender: "ai" | "user";
  text?: string;
  time: string;
  type?: "text" | "jobs" | "earnings" | "accepted";
}

export default function ProviderAIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Assalam alaikum Ali bhai! Main aapka Khadmat AI assistant hoon. Aap mujhse kuch bhi pooch saktay hain — new requests, earnings, schedule, ya koi bhi job ko accept/decline karna ho.",
      time: "9:00 AM",
      type: "text",
    }
  ]);
  const [input, setInput] = useState("");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const shortcuts = [
    { label: "📋 New requests", text: "Aaj ki nayi requests dikhao" },
    { label: "💰 Today earnings", text: "Is hafte ki total kamai batao" },
    { label: "📅 Tomorrow schedule", text: "Tomorrow schedule" },
    { label: "⏸ Go offline", text: "Go offline for 2 hours" },
    { label: "✅ Accept all", text: "Accept all pending requests" },
  ];

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      let aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "text",
        text: "Processing aapki request... Please ek second ruko.",
      };

      if (text.toLowerCase().includes("requests") || text.toLowerCase().includes("nayi requests")) {
        aiResponse.type = "jobs";
        aiResponse.text = "Aaj aapke paas **2 nayi requests** hain:";
      } else if (text.toLowerCase().includes("kamai") || text.toLowerCase().includes("earnings")) {
        aiResponse.type = "earnings";
        aiResponse.text = "Is hafte (19–25 May) ki kamai:";
      } else if (text.toLowerCase().includes("accept")) {
        aiResponse.type = "accepted";
      } else {
        aiResponse.text = "Main samajh nahi paya. Kya aap tafseel se bta sakte hain?";
      }

      setMessages((prev) => {
        // remove "processing" if we added it, but here we just append directly
        return [...prev, aiResponse];
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-52px)] bg-[var(--bg-primary)] relative">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-tertiary)] bg-[var(--bg-primary)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1D9E75] rounded-lg flex items-center justify-center text-white shrink-0">
            <Sparkles size={16} />
          </div>
          <div>
            <div className="text-[14px] font-medium text-[var(--text-primary)]">Khadmat AI Assistant</div>
            <div className="text-[11px] text-[var(--text-secondary)]">Manage your jobs, earnings and schedule by chat</div>
          </div>
        </div>
        <div className="text-[11px] bg-[#E1F5EE] text-[#085041] px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5 shrink-0">
          <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full"></span>Online
        </div>
      </div>

      <div className="flex gap-1.5 px-4 py-2.5 border-b border-[var(--border-tertiary)] flex-wrap bg-[var(--bg-secondary)] overflow-x-auto no-scrollbar">
        <span className="text-[11px] text-[var(--text-tertiary)] self-center whitespace-nowrap">Quick:</span>
        {shortcuts.map((sc, i) => (
          <button 
            key={i} 
            onClick={() => handleSend(sc.text)}
            className="border border-[var(--border-tertiary)] rounded-full px-3 py-1 text-[11px] cursor-pointer text-[var(--text-secondary)] bg-[var(--bg-primary)] whitespace-nowrap hover:border-[#1D9E75] hover:text-[#0F6E56] hover:bg-[#E1F5EE] transition-colors"
          >
            {sc.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2.5 items-end ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[10px] font-medium shrink-0 border ${
              msg.sender === "ai" 
                ? "bg-[#E1F5EE] text-[#085041] border-[#9FE1CB]" 
                : "bg-[#1D9E75] text-white border-[#1D9E75]"
            }`}>
              {msg.sender === "ai" ? "K" : "AA"}
            </div>
            <div className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
              <div className={`px-3 py-2.5 rounded-xl text-[13px] leading-relaxed max-w-[88%] sm:max-w-[75%] ${
                msg.sender === "ai" 
                  ? "bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-bl-[3px] text-[var(--text-primary)]" 
                  : "bg-[#1D9E75] text-white rounded-br-[3px]"
              }`}>
                {msg.type === "text" && <span>{msg.text}</span>}
                
                {msg.type === "jobs" && (
                  <div>
                    Aaj aapke paas <strong>2 nayi requests</strong> hain:
                    
                    <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-lg p-2.5 mt-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[12px] font-medium text-[var(--text-primary)]">AC service request</span>
                        <span className="text-[10px] bg-[#FAEEDA] text-[#633806] px-2 py-0.5 rounded-full font-medium">New</span>
                      </div>
                      <div className="text-[11px] text-[var(--text-secondary)] flex gap-2 flex-wrap mb-2">
                        <span className="flex items-center gap-1"><UserIcon size={12}/> Ahmed Usman</span>
                        <span className="flex items-center gap-1"><MapPin size={12}/> G-13/2 · 2.1 km</span>
                        <span className="flex items-center gap-1"><Clock size={12}/> Today 10:00 AM</span>
                        <span className="text-[#1D9E75] font-medium">PKR 1,200</span>
                      </div>
                      <div className="flex gap-1.5">
                        <button className="bg-[#1D9E75] text-white border-none px-3 py-1.5 rounded-md text-[11px] font-medium cursor-pointer hover:bg-[#0F6E56]">✓ Accept</button>
                        <button onClick={() => setIsDetailsOpen(true)} className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-tertiary)] px-3 py-1.5 rounded-md text-[11px] cursor-pointer hover:bg-[var(--bg-primary)]">View details</button>
                      </div>
                    </div>

                    <div className="bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-lg p-2.5 mt-1.5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[12px] font-medium text-[var(--text-primary)]">AC gas refill</span>
                        <span className="text-[10px] bg-[#FAEEDA] text-[#633806] px-2 py-0.5 rounded-full font-medium">New</span>
                      </div>
                      <div className="text-[11px] text-[var(--text-secondary)] flex gap-2 flex-wrap mb-2">
                        <span className="flex items-center gap-1"><UserIcon size={12}/> Zara Hassan</span>
                        <span className="flex items-center gap-1"><MapPin size={12}/> F-8/3 · 4.2 km</span>
                        <span className="flex items-center gap-1"><Clock size={12}/> Tomorrow 9:00 AM</span>
                        <span className="text-[#1D9E75] font-medium">PKR 1,500</span>
                      </div>
                      <div className="flex gap-1.5">
                        <button className="bg-[#1D9E75] text-white border-none px-3 py-1.5 rounded-md text-[11px] font-medium cursor-pointer hover:bg-[#0F6E56]">✓ Accept</button>
                        <button onClick={() => setIsDetailsOpen(true)} className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-tertiary)] px-3 py-1.5 rounded-md text-[11px] cursor-pointer hover:bg-[var(--bg-primary)]">View details</button>
                      </div>
                    </div>
                  </div>
                )}

                {msg.type === "earnings" && (
                  <div>
                    Is hafte (19–25 May) ki kamai:
                    <div className="bg-[#E1F5EE] border border-[#9FE1CB] rounded-lg p-2.5 mt-2 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-[14px] font-medium text-[#085041]">PKR 8,400</div>
                        <div className="text-[10px] text-[#0F6E56] mt-0.5">Total earned</div>
                      </div>
                      <div>
                        <div className="text-[14px] font-medium text-[#085041]">7</div>
                        <div className="text-[10px] text-[#0F6E56] mt-0.5">Jobs done</div>
                      </div>
                      <div>
                        <div className="text-[14px] font-medium text-[#085041]">PKR 1,200</div>
                        <div className="text-[10px] text-[#0F6E56] mt-0.5">Today pending</div>
                      </div>
                    </div>
                    <div className="mt-2 text-[12px] text-[var(--text-secondary)]">Pichle hafte se <span className="text-[#1D9E75] font-medium">+18% zyada</span> kamai! 🎉</div>
                  </div>
                )}

                {msg.type === "accepted" && (
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5 text-[#0F6E56]">
                      <CheckCircle2 size={16} />
                      <span className="font-medium">Request accepted!</span>
                    </div>
                    Ahmed Usman ki AC service request accept ho gayi. Booking confirm ho gaya:<br/><br/>
                    <span className="font-mono text-[11px] text-[var(--text-tertiary)]">BK-20250521-001 · Today 10:00 AM · G-13/2</span>
                    <div className="mt-2 text-[12px] text-[var(--text-secondary)]">Customer ko notification ja raha hai. Kuch aur chahiye?</div>
                  </div>
                )}

              </div>
              <div className="text-[10px] text-[var(--text-tertiary)] mt-1 px-0.5">
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-[var(--border-tertiary)] bg-[var(--bg-primary)] flex items-center gap-2 sticky bottom-0">
        <Mic size={20} className="text-[var(--text-tertiary)] cursor-pointer hover:text-[var(--text-secondary)] shrink-0" />
        <div className="flex-1 flex items-center gap-2 bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-full px-3 py-2">
          <input 
            type="text" 
            placeholder="Request accept karo, earnings pocho, schedule dekhao..." 
            className="bg-transparent border-none outline-none text-[13px] text-[var(--text-primary)] w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend(input);
            }}
          />
        </div>
        <button 
          onClick={() => handleSend(input)}
          className="w-9 h-9 bg-[#1D9E75] rounded-full flex items-center justify-center text-white shrink-0 hover:bg-[#0F6E56] transition-colors"
        >
          <ArrowUp size={18} />
        </button>
      </div>
      <ViewDetailsConfirmedModal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} />
    </div>
  );
}
