"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Home, Wrench, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase";

const PROFESSIONS = ["AC Technician","Plumber","Electrician","Tutor","Cleaner","Carpenter","Painter","Security","Other"];
const CITIES = ["Karachi","Lahore","Islamabad"];

function AuthPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [nextUrl, setNextUrl] = useState("/");

  useEffect(() => {
    const next = searchParams.get("next");
    if (next) setNextUrl(decodeURIComponent(next));
  }, [searchParams]);

  const [tab, setTab] = useState<"login"|"signup">("login");
  const [role, setRole] = useState<"customer"|"worker">("customer");
  const [showPw, setShowPw] = useState(false);
  const [selectedProfs, setSelectedProfs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [city, setCity] = useState("Karachi");
  const [signupPassword, setSignupPassword] = useState("");
  const [experience, setExperience] = useState("1–2 years");
  const [priceRange, setPriceRange] = useState("Under 500");

  const toggleProf = (p: string) =>
    setSelectedProfs((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );

  const switchTab = (t: "login" | "signup") => {
    setTab(t);
    setError("");
    setSuccess("");
  };

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error: sbError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (sbError) throw new Error(sbError.message);
      const user = data.user!;
      const name = `${user.user_metadata?.first_name ?? ""} ${user.user_metadata?.last_name ?? ""}`.trim() || user.email || "";
      localStorage.setItem("khadmat_token", data.session!.access_token);
      localStorage.setItem("khadmat_user", JSON.stringify({
        id: user.id,
        email: user.email,
        name,
        role: user.user_metadata?.role ?? "customer",
      }));
      router.push(nextUrl);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    try {
      // Step 1: Create user via backend admin API (pre-confirmed, no email sent)
      const res = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: signupEmail,
          phone,
          city,
          password: signupPassword,
          role,
          professions: selectedProfs.length ? selectedProfs : null,
          experience: role === "worker" ? experience : null,
          price_range: role === "worker" ? priceRange : null,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Signup failed");
      }

      // Step 2: Sign in immediately — account is already confirmed
      const supabase = createClient();
      const { data, error: sbError } = await supabase.auth.signInWithPassword({
        email: signupEmail,
        password: signupPassword,
      });
      if (sbError) throw new Error(sbError.message);

      const name = `${firstName} ${lastName}`.trim();
      localStorage.setItem("khadmat_token", data.session!.access_token);
      localStorage.setItem("khadmat_user", JSON.stringify({
        id: data.user!.id,
        email: data.user!.email,
        name,
        role,
      }));
      router.push(nextUrl);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextUrl)}`,
      },
    });
    if (oauthError) setError(oauthError.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-secondary)]">
      <div className="w-full max-w-[900px] grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-[var(--border-tertiary)] shadow-xl">
        {/* ── Left Panel ── */}
        <div className="bg-[#0F6E56] p-8 flex-col justify-between text-white hidden md:flex">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#0F6E56] text-sm font-semibold">K</div>
            <span className="text-[15px] font-medium text-white">Khadmat AI</span>
          </Link>
          <div className="flex-1 flex flex-col justify-center py-8">
            <h2 className="text-[22px] font-medium leading-snug mb-3">Pakistan&apos;s smartest home services platform</h2>
            <p className="text-sm text-[#9FE1CB] leading-relaxed">Whether you need a service or provide one — Khadmat AI connects you instantly.</p>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { icon: Home, title: "Customer", sub: "Book any home service in your language" },
              { icon: Wrench, title: "Service provider", sub: "Get discovered and grow your bookings" },
              { icon: ShieldCheck, title: "Admin", sub: "Manage platform, users and analytics" },
            ].map((r) => (
              <div key={r.title} className="flex items-center gap-3 bg-white/10 rounded-lg px-3 py-2.5">
                <r.icon size={18} className="text-[#9FE1CB]" />
                <div>
                  <div className="text-xs font-medium text-[#E1F5EE]">{r.title}</div>
                  <div className="text-[11px] text-[#9FE1CB]">{r.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="bg-[var(--bg-primary)] p-7 flex flex-col">
          {/* Mobile logo */}
          <Link href="/" className="md:hidden flex items-center gap-2 mb-5 no-underline">
            <div className="w-7 h-7 bg-[var(--accent)] rounded-lg flex items-center justify-center text-white text-xs font-semibold">K</div>
            <span className="text-sm font-semibold text-[var(--text-primary)]">Khadmat AI</span>
          </Link>

          {/* Tabs */}
          <div className="flex border border-[var(--border-tertiary)] rounded-lg overflow-hidden mb-6">
            {(["login","signup"] as const).map((t) => (
              <button key={t} onClick={() => switchTab(t)}
                className={`flex-1 py-2 text-sm text-center transition-colors cursor-pointer ${
                  tab === t ? "bg-[var(--bg-primary)] text-[var(--text-primary)] font-medium" : "bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                }`}
              >
                {t === "login" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          {/* Error / Success banners */}
          {error && (
            <div className="mb-4 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 px-3 py-2.5 rounded-lg bg-green-50 border border-green-200 text-xs text-green-700">
              {success}
            </div>
          )}

          {/* ── Login Form ── */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="flex flex-col flex-1">
              <div className="text-base font-medium text-[var(--text-primary)] mb-1">Welcome back</div>
              <div className="text-xs text-[var(--text-secondary)] mb-5">Sign in to your Khadmat AI account</div>

              <label className="text-xs text-[var(--text-secondary)] mb-1">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] mb-3 placeholder:text-[var(--text-tertiary)]"
                placeholder="you@example.com"
                required
              />

              <label className="text-xs text-[var(--text-secondary)] mb-1">Password</label>
              <div className="relative mb-1">
                <input
                  type={showPw ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 pr-10 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] placeholder:text-[var(--text-tertiary)]"
                  placeholder="Enter your password"
                  required
                  minLength={8}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] cursor-pointer">
                  {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
              <div className="flex justify-end mb-4">
                <a className="text-xs text-[var(--accent)] cursor-pointer hover:underline">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--accent)] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[var(--accent-dark)] transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading
                  ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : "Sign in"
                }
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-[var(--border-tertiary)]" />
                <span className="text-[11px] text-[var(--text-tertiary)]">or</span>
                <div className="flex-1 h-px bg-[var(--border-tertiary)]" />
              </div>

              <button
                type="button"
                onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-2 bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-lg py-2.5 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <div className="text-xs text-[var(--text-secondary)] text-center mt-4">
                Don&apos;t have an account?{" "}
                <button type="button" onClick={() => switchTab("signup")} className="text-[var(--accent)] font-medium cursor-pointer hover:underline bg-transparent border-none">Create one</button>
              </div>
            </form>
          )}

          {/* ── Signup Form ── */}
          {tab === "signup" && (
            <form onSubmit={handleSignup} className="flex flex-col flex-1 overflow-y-auto max-h-[520px] pr-1">
              <div className="text-base font-medium text-[var(--text-primary)] mb-1">Create your account</div>
              <div className="text-xs text-[var(--text-secondary)] mb-4">Choose your role to get started</div>

              {/* Role selector */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {(["customer","worker"] as const).map((r) => (
                  <button key={r} type="button" onClick={() => setRole(r)}
                    className={`flex flex-col items-start p-3 rounded-lg border cursor-pointer transition-all text-left ${
                      role === r ? "border-[var(--accent)] border-[1.5px] bg-[var(--accent-light)]" : "border-[var(--border-tertiary)] bg-[var(--bg-primary)] hover:border-[var(--accent)]"
                    }`}
                  >
                    {r === "customer"
                      ? <Home size={20} className={role===r?"text-[var(--accent-dark)]":"text-[var(--text-secondary)]"} />
                      : <Wrench size={20} className={role===r?"text-[var(--accent-dark)]":"text-[var(--text-secondary)]"} />
                    }
                    <div className="text-xs font-medium text-[var(--text-primary)] mt-1.5">{r === "customer" ? "Customer" : "Service provider"}</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">{r === "customer" ? "I need home services" : "I offer services"}</div>
                  </button>
                ))}
              </div>

              {/* Name row */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <label className="text-xs text-[var(--text-secondary)] mb-1 block">First name</label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] placeholder:text-[var(--text-tertiary)] text-[var(--text-primary)]"
                    placeholder="Ali"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-[var(--text-secondary)] mb-1 block">Last name</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] placeholder:text-[var(--text-tertiary)] text-[var(--text-primary)]"
                    placeholder="Hassan"
                    required
                  />
                </div>
              </div>

              <label className="text-xs text-[var(--text-secondary)] mb-1">Phone number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] mb-3 placeholder:text-[var(--text-tertiary)] text-[var(--text-primary)]"
                placeholder="0300-0000000"
                required
              />

              <label className="text-xs text-[var(--text-secondary)] mb-1">Email</label>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] mb-3 placeholder:text-[var(--text-tertiary)] text-[var(--text-primary)]"
                placeholder="you@example.com"
                required
              />

              <label className="text-xs text-[var(--text-secondary)] mb-1">City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] mb-3 text-[var(--text-primary)] cursor-pointer"
              >
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>

              {/* Worker extra fields */}
              {role === "worker" && (
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-tertiary)] rounded-lg p-3 mb-3 animate-fade-in">
                  <div className="text-[11px] text-[var(--text-secondary)] mb-2 flex items-center gap-1.5">
                    <Wrench size={12} /> Your profession (select all that apply)
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 mb-3">
                    {PROFESSIONS.map((p) => (
                      <button key={p} type="button" onClick={() => toggleProf(p)}
                        className={`text-[11px] py-1 px-2 rounded-full border text-center cursor-pointer transition-all ${
                          selectedProfs.includes(p)
                            ? "bg-[var(--accent-light)] border-[var(--accent-border)] text-[var(--accent-text)] font-medium"
                            : "border-[var(--border-tertiary)] text-[var(--text-secondary)] bg-[var(--bg-primary)] hover:border-[var(--accent)] hover:text-[var(--accent-dark)]"
                        }`}
                      >{p}</button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-[var(--text-secondary)] mb-1 block">Experience</label>
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-lg px-2 py-1.5 text-xs outline-none text-[var(--text-primary)] cursor-pointer"
                      >
                        <option>1–2 years</option>
                        <option>3–5 years</option>
                        <option>5–10 years</option>
                        <option>10+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-[var(--text-secondary)] mb-1 block">Price range (PKR/visit)</label>
                      <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-tertiary)] rounded-lg px-2 py-1.5 text-xs outline-none text-[var(--text-primary)] cursor-pointer"
                      >
                        <option>Under 500</option>
                        <option>500–1000</option>
                        <option>1000–2000</option>
                        <option>2000+</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <label className="text-xs text-[var(--text-secondary)] mb-1">Password</label>
              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] mb-3 placeholder:text-[var(--text-tertiary)] text-[var(--text-primary)]"
                placeholder="Min. 8 characters"
                required
                minLength={8}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--accent)] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[var(--accent-dark)] transition-all disabled:opacity-50 mt-1 cursor-pointer"
              >
                {loading
                  ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : role === "worker" ? "Join as provider" : "Create account"
                }
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-[var(--border-tertiary)]" />
                <span className="text-[11px] text-[var(--text-tertiary)]">or</span>
                <div className="flex-1 h-px bg-[var(--border-tertiary)]" />
              </div>

              <button
                type="button"
                onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-2 bg-[var(--bg-primary)] border border-[var(--border-secondary)] rounded-lg py-2.5 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <div className="text-xs text-[var(--text-secondary)] text-center mt-3">
                Already have an account?{" "}
                <button type="button" onClick={() => switchTab("login")} className="text-[var(--accent)] font-medium cursor-pointer hover:underline bg-transparent border-none">Sign in</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthPageInner />
    </Suspense>
  );
}
