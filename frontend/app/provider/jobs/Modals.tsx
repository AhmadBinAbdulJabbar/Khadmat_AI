"use client";

import { useState } from "react";
import { 
  Star, X, Check, Bell, MessageSquare, Edit2, 
  Clock, Download, RefreshCw, MapPin, Phone, Heart, ArrowRight, MessageCircle
} from "lucide-react";

// --- REQUEST REVIEW MODAL ---
export function RequestReviewModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [channel, setChannel] = useState("wa");
  const [timing, setTiming] = useState("now");
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center p-4 min-h-screen overflow-y-auto">
      <div className="bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-2xl w-full max-w-[480px] overflow-hidden my-auto">
        <div className="flex items-center justify-between px-[18px] py-[14px] border-b border-[var(--border-tertiary)] bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#FAEEDA] flex items-center justify-center shrink-0">
              <Star size={18} color="#EF9F27" />
            </div>
            <div>
              <div className="text-[15px] font-medium text-[var(--text-primary)]">Request a review</div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">Ask Bilal Ahmed to rate your service</div>
            </div>
          </div>
          <button onClick={onClose} className="w-[30px] h-[30px] border border-[var(--border-tertiary)] rounded-md flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] cursor-pointer">
            <X size={16} />
          </button>
        </div>

        {!sent ? (
          <>
            <div className="p-[18px]">
              <div className="flex items-center gap-3 bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-3 mb-4">
                <div className="w-[34px] h-[34px] rounded-lg bg-[#EAF3DE] flex items-center justify-center text-[#3B6D11] shrink-0">
                  <Check size={17} />
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-medium text-[var(--text-primary)]">AC installation (split unit)</div>
                  <div className="text-[11px] text-[var(--text-secondary)] mt-0.5 flex gap-2">
                    <span>Bilal Ahmed</span>
                    <span>F-10/1</span>
                    <span>Yesterday 11:00 AM</span>
                  </div>
                </div>
                <div className="text-[13px] font-medium text-[#1D9E75] text-right">PKR 2,090</div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 mb-4">
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-2 text-center">
                  <div className="text-[14px] font-medium text-[#EF9F27]">4.7</div>
                  <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Your avg rating</div>
                </div>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-2 text-center">
                  <div className="text-[14px] font-medium text-[var(--text-primary)]">212</div>
                  <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Total reviews</div>
                </div>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-2 text-center">
                  <div className="text-[14px] font-medium text-[#1D9E75]">+0.1</div>
                  <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">5★ adds to avg</div>
                </div>
              </div>

              <div className="bg-[#FAEEDA] border border-[#EF9F27] rounded-lg p-2.5 mb-4 flex items-start gap-2 text-[12px] text-[#854F0B] leading-relaxed">
                <Star size={14} className="mt-0.5 shrink-0" />
                <span>Providers with 50+ reviews get <strong className="text-[#633806]">2× more booking requests</strong>. A 5★ from Bilal would raise your average to 4.71.</span>
              </div>

              <div className="text-[11px] text-[var(--text-secondary)] tracking-wide mb-2">SEND REVIEW REQUEST VIA</div>
              <div className="grid grid-cols-3 gap-1.5 mb-4">
                <div onClick={() => setChannel('wa')} className={`border rounded-lg p-2.5 text-center cursor-pointer transition-colors ${channel === 'wa' ? 'border-[#1D9E75] bg-[#E1F5EE]' : 'border-[var(--border-tertiary)] bg-[var(--bg-secondary)] hover:border-[#1D9E75]'}`}>
                  <MessageCircle size={20} className={`mx-auto mb-1.5 ${channel === 'wa' ? 'text-[#1D9E75]' : 'text-[var(--text-secondary)]'}`} />
                  <div className={`text-[11px] font-medium ${channel === 'wa' ? 'text-[#1D9E75]' : 'text-[var(--text-secondary)]'}`}>WhatsApp</div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">0300-xxx-xxxx</div>
                </div>
                <div onClick={() => setChannel('sms')} className={`border rounded-lg p-2.5 text-center cursor-pointer transition-colors ${channel === 'sms' ? 'border-[#1D9E75] bg-[#E1F5EE]' : 'border-[var(--border-tertiary)] bg-[var(--bg-secondary)] hover:border-[#1D9E75]'}`}>
                  <MessageSquare size={20} className={`mx-auto mb-1.5 ${channel === 'sms' ? 'text-[#1D9E75]' : 'text-[var(--text-secondary)]'}`} />
                  <div className={`text-[11px] font-medium ${channel === 'sms' ? 'text-[#1D9E75]' : 'text-[var(--text-secondary)]'}`}>SMS</div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Text message</div>
                </div>
                <div onClick={() => setChannel('app')} className={`border rounded-lg p-2.5 text-center cursor-pointer transition-colors ${channel === 'app' ? 'border-[#1D9E75] bg-[#E1F5EE]' : 'border-[var(--border-tertiary)] bg-[var(--bg-secondary)] hover:border-[#1D9E75]'}`}>
                  <Bell size={20} className={`mx-auto mb-1.5 ${channel === 'app' ? 'text-[#1D9E75]' : 'text-[var(--text-secondary)]'}`} />
                  <div className={`text-[11px] font-medium ${channel === 'app' ? 'text-[#1D9E75]' : 'text-[var(--text-secondary)]'}`}>In-app</div>
                  <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Push notification</div>
                </div>
              </div>

              <div className="text-[11px] text-[var(--text-secondary)] tracking-wide mb-2">MESSAGE PREVIEW</div>
              <div className="bg-[var(--bg-secondary)] border border-[#1D9E75] rounded-lg p-3.5 mb-4 relative">
                <div className="absolute top-0 left-3.5 text-[10px] bg-[#1D9E75] text-white px-2 py-0.5 rounded-b-md font-medium">
                  {channel === 'wa' ? 'WhatsApp' : channel === 'sms' ? 'SMS' : 'In-app'} preview
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#1D9E75] mb-2 mt-3 font-medium">
                  {channel === 'wa' ? <MessageCircle size={14}/> : channel === 'sms' ? <MessageSquare size={14}/> : <Bell size={14}/>}
                  Message from Khadmat AI
                </div>
                <div className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                  Assalam alaikum <span className="text-[#1D9E75] font-medium">Bilal bhai</span>! Kal <span className="text-[#1D9E75] font-medium">AC installation</span> ka kaam complete hua. Agar service aapko pasand aayi ho toh 2 minute mein review dein — isse Ali bhai ko future customers milnay mein madad hogi.<br/><br/>
                  Review dein yahan: <span className="text-[#1D9E75] font-medium">khadmat.ai/review/BK-20250520</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)] mt-2 cursor-pointer hover:text-[#1D9E75]">
                  <Edit2 size={12} /> Personalise message
                </div>
              </div>

              <div className="text-[11px] text-[var(--text-secondary)] tracking-wide mb-2">WHEN TO SEND</div>
              <div className="flex gap-1.5">
                {[
                  { id: 'now', label: 'Now', sub: 'Send immediately' },
                  { id: '1h', label: 'In 1 hour', sub: '3:00 PM today' },
                  { id: 'tmrw', label: 'Tomorrow 9 AM', sub: 'Morning reminder' }
                ].map(t => (
                  <div key={t.id} onClick={() => setTiming(t.id)} className={`flex-1 border rounded-lg p-2 text-center cursor-pointer transition-colors ${timing === t.id ? 'border-[#1D9E75] bg-[#E1F5EE]' : 'border-[var(--border-tertiary)] bg-[var(--bg-secondary)] hover:border-[#1D9E75]'}`}>
                    <div className={`text-[12px] font-medium ${timing === t.id ? 'text-[#1D9E75]' : 'text-[var(--text-secondary)]'}`}>{t.label}</div>
                    <div className={`text-[10px] mt-0.5 ${timing === t.id ? 'text-[#0F6E56]' : 'text-[var(--text-tertiary)]'}`}>{t.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 p-3.5 border-t border-[var(--border-tertiary)] bg-[var(--bg-secondary)]">
              <button onClick={onClose} className="flex-1 bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-tertiary)] p-2.5 rounded-lg text-[13px] hover:text-[var(--text-primary)] transition-colors">Skip for now</button>
              <button onClick={() => setSent(true)} className="flex-[2] bg-[#1D9E75] text-white border-none p-2.5 rounded-lg text-[13px] font-medium hover:bg-[#0F6E56] transition-colors flex items-center justify-center gap-1.5">
                Send review request
              </button>
            </div>
          </>
        ) : (
          <div className="p-6 text-center">
            <div className="w-14 h-14 bg-[#E1F5EE] border border-[#1D9E75] rounded-full flex items-center justify-center text-[#1D9E75] mx-auto mb-3">
              <Check size={24} />
            </div>
            <div className="text-[15px] font-medium text-[var(--text-primary)] mb-1">Review request sent!</div>
            <div className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">
              Bilal Ahmed will receive your message shortly. You'll be notified when they leave a review.
            </div>
            
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-3 text-[12px] text-left text-[var(--text-secondary)]">
              <div className="font-medium text-[var(--text-primary)] mb-1.5">What happens next?</div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2"><Clock size={13} className="text-[#1D9E75]" /> Bilal receives message now</div>
                <div className="flex items-center gap-2"><Star size={13} className="text-[#EF9F27]" /> They tap the link to rate you</div>
                <div className="flex items-center gap-2"><Bell size={13} className="text-[#1D9E75]" /> You get notified when review is posted</div>
              </div>
            </div>

            <button onClick={onClose} className="w-full bg-[#1D9E75] text-white border-none p-2.5 rounded-lg text-[13px] font-medium hover:bg-[#0F6E56] transition-colors mt-4">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- VIEW COMPLETED JOB MODAL ---
export function ViewCompletedJobModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center p-4 min-h-screen overflow-y-auto">
      <div className="bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-2xl w-full max-w-[500px] overflow-hidden my-auto">
        <div className="flex items-center justify-between px-[18px] py-[14px] border-b border-[var(--border-tertiary)] bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#EAF3DE] flex items-center justify-center shrink-0">
              <Check size={18} className="text-[#3B6D11]" />
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-[15px] font-medium text-[var(--text-primary)]">AC installation (split unit)</span>
                <span className="text-[10px] bg-[#EAF3DE] text-[#3B6D11] border border-[#9FE1CB] px-2 py-0.5 rounded-full font-medium ml-2">Completed</span>
              </div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">BK-20250520-011 · Bilal Ahmed · Yesterday 11:00 AM</div>
            </div>
          </div>
          <button onClick={onClose} className="w-[30px] h-[30px] border border-[var(--border-tertiary)] rounded-md flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] cursor-pointer">
            <X size={16} />
          </button>
        </div>

        <div className="p-[18px]">
          <div className="bg-[#E1F5EE] border border-[#9FE1CB] rounded-lg p-3 flex items-center gap-3 mb-4">
            <div className="w-[38px] h-[38px] bg-[#1D9E75] rounded-full flex items-center justify-center text-white shrink-0">
              <Check size={18} />
            </div>
            <div>
              <div className="text-[13px] font-medium text-[#085041] mb-0.5">Job completed successfully</div>
              <div className="text-[11px] text-[#0F6E56]">Bilal Ahmed · Yesterday 11:00 AM → 1:30 PM · 2.5 hours</div>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-xl overflow-hidden mb-3.5">
            <div className="px-3.5 py-2.5 border-b border-[var(--border-tertiary)] text-[12px] font-medium text-[var(--text-primary)] flex justify-between items-center bg-[var(--bg-primary)]">
              <span className="flex items-center gap-1.5"><Check size={13} className="text-[#1D9E75]" /> Earnings receipt</span>
              <span className="text-[10px] text-[var(--text-tertiary)] font-mono">BK-20250520-011</span>
            </div>
            <div className="p-1">
              {[
                { l: "Service", v: "AC installation (split unit)" },
                { l: "Customer", v: "Bilal Ahmed" },
                { l: "Location", v: "F-10/1, Islamabad" },
                { l: "Date", v: "20 May 2026" },
                { l: "Duration", v: "2.5 hours" },
                { l: "Customer paid", v: "PKR 2,200" },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center px-3 py-2 border-b border-[var(--border-tertiary)] last:border-0">
                  <span className="text-[12px] text-[var(--text-secondary)]">{row.l}</span>
                  <span className="text-[12px] font-medium text-[var(--text-primary)]">{row.v}</span>
                </div>
              ))}
              <div className="flex justify-between items-center px-3 py-2 border-b border-[var(--border-tertiary)]">
                <span className="text-[12px] text-[var(--text-secondary)]">Platform fee (5%)</span>
                <span className="text-[12px] font-medium text-[#E24B4A]">− PKR 110</span>
              </div>
              <div className="flex justify-between items-center px-3 py-2 bg-[#E1F5EE] rounded-md m-1">
                <span className="text-[12px] text-[#085041] font-medium">Your net earning</span>
                <span className="text-[13px] font-medium text-[#1D9E75]">PKR 2,090</span>
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-3 mb-3.5">
            <div className="text-[10px] text-[var(--text-secondary)] tracking-wide mb-2">PAYMENT PROOF RECEIVED</div>
            <div className="flex items-center gap-2.5 p-2 bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-md">
              <div className="w-8 h-8 rounded-md bg-[#E1F5EE] flex items-center justify-center text-[#1D9E75] shrink-0">
                <MessageSquare size={16} />
              </div>
              <div>
                <div className="text-[12px] font-medium text-[var(--text-primary)]">Easypaisa screenshot</div>
                <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Uploaded by Bilal Ahmed · 20 May 10:47 AM</div>
              </div>
              <span className="text-[10px] bg-[#E1F5EE] text-[#1D9E75] border border-[#9FE1CB] px-2 py-0.5 rounded-full font-medium ml-auto flex items-center gap-1">
                <Check size={10} /> Verified
              </span>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-3 mb-3.5">
            <div className="text-[10px] text-[var(--text-secondary)] tracking-wide mb-2">CUSTOMER REVIEW</div>
            <div className="flex items-center gap-3">
              <div className="text-[28px] font-medium text-[#EF9F27]">5.0</div>
              <div>
                <div className="text-[18px] text-[#EF9F27] tracking-widest leading-none">★★★★★</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-1">Rated by Bilal Ahmed</div>
              </div>
            </div>
            <div className="text-[12px] text-[var(--text-secondary)] leading-relaxed mt-2 pt-2 border-t border-[var(--border-tertiary)] italic">
              "Bilal bhai AC installation professionally ki. Waqt par aaye, kaam clean kiya, aur puri setting explain ki. Highly recommended!"
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] gap-2">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-2.5">
              <div className="text-[10px] text-[var(--text-secondary)] tracking-wide mb-1.5">BEFORE</div>
              <div className="text-[11px] text-[var(--text-tertiary)] mb-0.5">provider_status: <span className="text-[var(--text-secondary)] line-through">busy</span></div>
              <div className="text-[11px] text-[var(--text-tertiary)] mb-0.5">booking_status: <span className="text-[var(--text-secondary)] line-through">CONFIRMED</span></div>
              <div className="text-[11px] text-[var(--text-tertiary)]">payment: <span className="text-[var(--text-secondary)] line-through">pending</span></div>
            </div>
            <div className="flex items-center text-[var(--text-tertiary)]"><ArrowRight size={16} /></div>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-2.5">
              <div className="text-[10px] text-[var(--text-secondary)] tracking-wide mb-1.5">AFTER</div>
              <div className="text-[11px] text-[var(--text-tertiary)] mb-0.5">provider_status: <span className="text-[#1D9E75] font-medium">available</span></div>
              <div className="text-[11px] text-[var(--text-tertiary)] mb-0.5">booking_status: <span className="text-[#1D9E75] font-medium">COMPLETED</span></div>
              <div className="text-[11px] text-[var(--text-tertiary)]">payment: <span className="text-[#1D9E75] font-medium">PKR 2,090 paid</span></div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 p-3.5 border-t border-[var(--border-tertiary)] bg-[var(--bg-secondary)]">
          <button onClick={onClose} className="flex-1 bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-tertiary)] p-2.5 rounded-lg text-[13px] hover:text-[var(--text-primary)] transition-colors flex justify-center items-center gap-1.5">
            <Download size={14} /> Download receipt
          </button>
          <button className="flex-[2] bg-[#1D9E75] text-white border-none p-2.5 rounded-lg text-[13px] font-medium hover:bg-[#0F6E56] transition-colors flex items-center justify-center gap-1.5">
            <RefreshCw size={14} /> Rebook this customer
          </button>
        </div>
      </div>
    </div>
  );
}

// --- VIEW DETAILS CONFIRMED MODAL ---
export function ViewDetailsConfirmedModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [tab, setTab] = useState("t1");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center p-4 min-h-screen overflow-y-auto">
      <div className="bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-2xl w-full max-w-[520px] overflow-hidden my-auto">
        <div className="flex items-center justify-between px-[18px] py-[14px] border-b border-[var(--border-tertiary)] bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#E1F5EE] flex items-center justify-center shrink-0">
              <Check size={18} className="text-[#1D9E75]" />
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-[15px] font-medium text-[var(--text-primary)]">AC service — filter clean</span>
                <span className="text-[10px] bg-[#E1F5EE] text-[#085041] border border-[#9FE1CB] px-2 py-0.5 rounded-full font-medium ml-2">Confirmed</span>
              </div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">BK-20250521-003 · Sara Khan</div>
            </div>
          </div>
          <button onClick={onClose} className="w-[30px] h-[30px] border border-[var(--border-tertiary)] rounded-md flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] cursor-pointer">
            <X size={16} />
          </button>
        </div>
        
        <div className="flex border-b border-[var(--border-tertiary)] bg-[var(--bg-secondary)] px-2">
          {["t1", "t2", "t3"].map((t, i) => (
            <div 
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-[13px] cursor-pointer border-b-2 transition-colors ${tab === t ? 'text-[#1D9E75] border-[#1D9E75] font-medium' : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'}`}
            >
              {i === 0 ? "Job details" : i === 1 ? "Customer" : "Timeline"}
            </div>
          ))}
        </div>

        <div className="p-[18px]">
          {tab === "t1" && (
            <div>
              <div className="grid grid-cols-2 gap-2 mb-3.5">
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-2.5">
                  <div className="text-[10px] text-[var(--text-secondary)] tracking-wide mb-1 flex items-center gap-1"><Check size={11}/> SERVICE</div>
                  <div className="text-[13px] font-medium text-[var(--text-primary)]">AC filter clean</div>
                </div>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-2.5">
                  <div className="text-[10px] text-[var(--text-secondary)] tracking-wide mb-1 flex items-center gap-1"><Clock size={11}/> DATE & TIME</div>
                  <div className="text-[13px] font-medium text-[var(--text-primary)]">Today · 2:00 PM</div>
                </div>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-2.5">
                  <div className="text-[10px] text-[var(--text-secondary)] tracking-wide mb-1 flex items-center gap-1"><MapPin size={11}/> LOCATION</div>
                  <div className="text-[13px] font-medium text-[var(--text-primary)]">G-13/4, Islamabad</div>
                </div>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-2.5">
                  <div className="text-[10px] text-[var(--text-secondary)] tracking-wide mb-1 flex items-center gap-1"><MapPin size={11}/> DISTANCE</div>
                  <div className="text-[13px] font-medium text-[#1D9E75]">1.4 km from you</div>
                </div>
              </div>
              
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg h-[90px] flex items-center justify-center relative overflow-hidden mb-3.5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                <MapPin size={24} className="text-[#E24B4A] absolute" style={{ top: '30%', left: '50%', transform: 'translateX(-50%)' }} />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] bg-[var(--bg-primary)] border border-[var(--border-tertiary)] px-2.5 py-1 rounded-md text-[var(--text-secondary)] whitespace-nowrap shadow-sm">
                  <span className="text-[#E24B4A] mr-1">📍</span>G-13/4, Street 7 — tap to open in Maps
                </div>
              </div>

              <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-2.5 mb-3.5">
                <div className="text-[10px] text-[var(--text-secondary)] tracking-wide mb-1">CUSTOMER NOTES</div>
                <div className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
                  AC filter needs cleaning. Has been 6 months since last service. The AC cools fine but airflow seems reduced. Please also check for any dust buildup in the unit.
                </div>
              </div>

              <div className="bg-[#E1F5EE] border border-[#9FE1CB] rounded-lg p-3 flex justify-between items-center">
                <div>
                  <div className="text-[12px] text-[#085041]">Your earnings</div>
                  <div className="text-[10px] text-[#0F6E56] mt-0.5">PKR 1,500 − 5% platform fee</div>
                </div>
                <div className="text-[18px] font-medium text-[#1D9E75]">PKR 1,425</div>
              </div>
            </div>
          )}

          {tab === "t2" && (
            <div>
              <div className="flex items-center gap-3 bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#EEEDFE] flex items-center justify-center text-[12px] font-medium text-[#3C3489] shrink-0">SK</div>
                <div>
                  <div className="text-[13px] font-medium text-[var(--text-primary)]">Sara Khan</div>
                  <div className="text-[11px] text-[var(--text-secondary)] mt-0.5 flex gap-2">
                    <span className="flex items-center gap-0.5 text-[#EF9F27]"><Star size={10} fill="currentColor"/> 4.9 rating</span>
                    <span>7 bookings</span>
                  </div>
                </div>
                <button className="ml-auto bg-[#E1F5EE] text-[#1D9E75] border border-[#9FE1CB] px-3 py-1.5 rounded-md text-[11px] font-medium flex items-center gap-1 hover:bg-[#1D9E75] hover:text-white transition-colors">
                  <Phone size={12} /> Call
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-2 text-center">
                  <div className="text-[16px] font-medium text-[var(--text-primary)]">7</div>
                  <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Total bookings</div>
                </div>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-2 text-center">
                  <div className="text-[16px] font-medium text-[#1D9E75]">0</div>
                  <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Cancellations</div>
                </div>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-2 text-center">
                  <div className="text-[16px] font-medium text-[#EF9F27]">4.9</div>
                  <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Avg rating given</div>
                </div>
              </div>

              <div className="text-[11px] text-[var(--text-secondary)] tracking-wide mb-2 mt-4">YOUR HISTORY WITH SARA KHAN</div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5 p-2 bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-[#1D9E75] shrink-0"></div>
                  <div className="flex-1">
                    <div className="text-[12px] font-medium text-[var(--text-primary)]">AC filter clean — Completed</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">PKR 1,200 · Rated you ⭐ 5.0</div>
                  </div>
                  <div className="text-[10px] text-[var(--text-tertiary)]">4 mos ago</div>
                </div>
                <div className="flex items-center gap-2.5 p-2 bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-[#1D9E75] shrink-0"></div>
                  <div className="flex-1">
                    <div className="text-[12px] font-medium text-[var(--text-primary)]">AC gas refill — Completed</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">PKR 1,500 · Rated you ⭐ 5.0</div>
                  </div>
                  <div className="text-[10px] text-[var(--text-tertiary)]">8 mos ago</div>
                </div>
              </div>

              <div className="bg-[#E1F5EE] text-[#0F6E56] rounded-lg p-2.5 text-[12px] text-center mt-3 flex items-center justify-center gap-1.5 font-medium border border-[#9FE1CB]">
                <Heart size={14} className="fill-current"/> Repeat customer — always rates 5 stars!
              </div>
            </div>
          )}

          {tab === "t3" && (
            <div className="flex flex-col relative pl-2">
              {[
                { title: "Request received", sub: "Customer sent booking request", time: "Today · 8:30 AM", status: "done" },
                { title: "You accepted", sub: "Booking confirmed by you", time: "Today · 8:35 AM", status: "done" },
                { title: "Payment received", sub: "Customer paid PKR 1,500 via Easypaisa", time: "Today · 9:10 AM", status: "done" },
                { title: "Job starts soon", sub: "Reminder sent to both parties", time: "Today · 2:00 PM — 1 hr away", status: "now" },
                { title: "Mark as complete", sub: "Mark job done when finished", time: "After completion", status: "future" },
                { title: "Customer leaves review", sub: "Rating appears on your profile", time: "After completion", status: "future" },
              ].map((item, i, arr) => (
                <div key={i} className="flex gap-3 pb-4 relative">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 z-10 ${
                      item.status === 'done' ? 'bg-[#1D9E75]' : 
                      item.status === 'now' ? 'bg-[#EF9F27] shadow-[0_0_0_3px_rgba(239,159,39,0.2)]' : 
                      'bg-[var(--bg-secondary)] border border-[var(--text-tertiary)]'
                    }`}></div>
                    {i !== arr.length - 1 && (
                      <div className={`w-px flex-1 mt-1 ${item.status === 'done' ? 'bg-[#1D9E75]' : 'bg-[var(--border-tertiary)]'}`}></div>
                    )}
                  </div>
                  <div className="flex-1 pb-1">
                    <div className={`text-[12px] font-medium ${
                      item.status === 'done' ? 'text-[var(--text-primary)]' : 
                      item.status === 'now' ? 'text-[#EF9F27]' : 
                      'text-[var(--text-secondary)]'
                    }`}>{item.title}</div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">{item.sub}</div>
                    <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5 font-mono">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 p-3.5 border-t border-[var(--border-tertiary)] bg-[var(--bg-secondary)]">
          <button className="flex-1 bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-tertiary)] p-2.5 rounded-lg text-[13px] hover:text-[var(--text-primary)] transition-colors">
            Get directions
          </button>
          <button className="flex-[2] bg-[#1D9E75] text-white border-none p-2.5 rounded-lg text-[13px] font-medium hover:bg-[#0F6E56] transition-colors flex items-center justify-center gap-1.5">
            <Check size={16} /> Mark as completed
          </button>
          <button className="flex-1 bg-[var(--bg-primary)] text-[#E24B4A] border border-[#E24B4A] p-2.5 rounded-lg text-[13px] hover:bg-[#FCEBEB] transition-colors">
            Cancel job
          </button>
        </div>
      </div>
    </div>
  );
}
