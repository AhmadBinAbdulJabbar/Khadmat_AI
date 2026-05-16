# Khadmat AI — Full Submission Package
### Google Antigravity Hackathon — Challenge 2: AI Service Orchestrator for Informal Economy

---

## 1. ELEVATOR PITCH

**Khadmat AI** is an agentic AI platform that automates the entire lifecycle of a home services request — from a single chat message in Urdu, Roman Urdu, or English, to a fully confirmed booking with reminders — powered by Google Antigravity.

No phone calls. No WhatsApp back-and-forth. Just say what you need, and the system handles the rest.

---

## 2. PROBLEM STATEMENT

Pakistan's informal service economy — plumbers, electricians, AC technicians, tutors, beauticians — operates entirely through:
- WhatsApp messages and phone calls
- Personal referrals ("mera bhai karta hai yeh kaam")
- No real-time availability, no reviews, no automated scheduling

**For users**: Finding a reliable service provider is slow, unpredictable, and trust-based.
**For providers**: They miss jobs because they're unreachable or unknown outside their circle.

---

## 3. SOLUTION — KHADMAT AI

An Agentic AI system with 5 specialized agents orchestrated through Google Antigravity:

| Agent | Role |
|---|---|
| Intent Agent | Understands natural language requests (Urdu/Roman Urdu/English) and extracts service type, location, and timing |
| Discovery Agent | Queries Supabase via FastAPI for nearby providers, filtered by service and location |
| Decision Agent | Ranks providers by distance, availability, and rating with clear reasoning |
| Booking Agent | Simulates end-to-end booking: assigns provider, writes to Supabase, generates receipt |
| Follow-Up Agent | Schedules reminder 1 hour before, sends status updates, closes the loop post-service |

**Google Antigravity** is the central orchestration brain — it routes inputs between agents, calls FastAPI endpoints as tools, and streams traceable reasoning logs back to the Next.js UI.

---

## 4. BUSINESS MODEL

### 4.1 Value Proposition

**For users (homeowners/renters):**
- Book any home service in seconds, in their own language
- Trusted, rated providers — no more asking around
- Real-time confirmation and reminders

**For service providers:**
- Get discovered by more customers automatically
- No tech skills needed — Khadmat reaches them through existing channels
- Steady bookings replace unpredictable hustle

### 4.2 Target Segments

| Segment | Size | Pain |
|---|---|---|
| Urban homeowners in Karachi, Lahore, Islamabad | ~5M households | Can't find reliable help quickly |
| Informal service providers (plumbers, electricians, etc.) | ~2M workers | No digital presence, miss bookings |
| Property management companies | ~500 firms | No centralized service request system |

### 4.3 Revenue Model (Post-Hackathon Vision)

| Stream | How It Works | Revenue Type |
|---|---|---|
| Transaction fee | 5–8% commission per completed booking | Scales with volume |
| Provider subscription | Featured listing / priority ranking — PKR 500–1500/month | Predictable MRR |
| B2B SaaS | White-label platform for property managers / real estate firms | High LTV |
| Premium users | Faster matching, priority providers — PKR 299/month | Consumer tier |

### 4.4 Competitive Advantage

| vs. Existing Apps | Khadmat AI |
|---|---|
| Form-based booking, English-only | Natural language, Urdu-first |
| Static listing/search | Agentic: AI makes the decision, not the user |
| No follow-up automation | Full lifecycle from request to completion |
| No reasoning trace | Full Antigravity logs visible in UI |

---

## 5. CORE FEATURES (MVP FOR HACKATHON)

### Feature 1 — Natural Language Input
- Accept text in English, Urdu, or Roman Urdu via Next.js chat interface
- Example: "Kal subah G-13 mein AC technician chahiye"
- FastAPI receives the message → passes to Antigravity Intent Agent
- Agent extracts: `service=AC technician`, `location=G-13`, `time=tomorrow morning`

### Feature 2 — Provider Discovery
- FastAPI `/api/providers/search` queries Supabase `providers` table
- Filters by service category + location area + availability
- Returns list with distance calculated server-side

### Feature 3 — Intelligent Matching & Ranking
- Score: distance (40%) + rating (40%) + availability (20%)
- Antigravity Decision Agent explains the ranking in plain language
- Next.js displays top 3 ranked providers with reasoning text

### Feature 4 — Booking Simulation (CRITICAL)
- FastAPI `POST /api/bookings` writes confirmed booking to Supabase
- Provider `is_available` flipped false — real state change
- Next.js shows BEFORE (available) → AFTER (booked)
- Supabase dashboard shown in demo to prove real DB write

### Feature 5 — Follow-Up Automation
- Supabase `reminders` table stores scheduled follow-up with trigger timestamp
- FastAPI logs simulated notification send
- Booking status updatable to COMPLETED, rating prompt generated

### Feature 6 — Live Agent Trace Panel
- Every Antigravity step stored in Supabase `agent_traces` table
- FastAPI `GET /api/trace/{session_id}` streams steps to Next.js
- Trace panel animates each step: agent → action → tool → decision

---

## 6. TECHNICAL ARCHITECTURE

### Stack

| Layer | Technology | Hosting | Cost |
|---|---|---|---|
| Frontend | Next.js 14 (App Router) | Vercel | Free |
| Backend API | Python FastAPI | Railway | Free (500 hrs/month) |
| AI Orchestration | Google Antigravity | Google Cloud | Credits redeemed |
| LLM | Gemini 1.5 Flash | Google Cloud | Credits redeemed |
| Database | Supabase (PostgreSQL) | Supabase free tier | Free (500MB) |
| Maps (optional) | Google Maps / Places API | Google Cloud | Credits redeemed |

**Total out-of-pocket cost: PKR 0**

### Why This Stack

- **Next.js on Vercel**: Zero-config deploy, perfect for React chat UI, instant CDN globally
- **FastAPI on Railway**: Python-native async framework, ideal for AI agent calls; Railway gives 500 free hours/month with no card required
- **Supabase**: Hosted Postgres with a visual dashboard (great for live demo), built-in REST API, real-time support, free 500MB, no card needed
- **Antigravity calls FastAPI as tools**: Clean separation — Antigravity does the reasoning, FastAPI does the DB operations

### Project Folder Structure

```
khadmat-ai/
│
├── frontend/                      # Next.js → deploys to Vercel
│   ├── app/
│   │   ├── page.tsx               # Chat screen (main UI)
│   │   ├── booking/page.tsx       # Booking receipt screen
│   │   └── trace/page.tsx         # Agent trace log screen
│   ├── components/
│   │   ├── ChatInput.tsx
│   │   ├── ProviderCard.tsx
│   │   ├── BookingReceipt.tsx
│   │   └── AgentTrace.tsx
│   ├── .env.local
│   └── package.json
│
├── backend/                       # FastAPI → deploys to Railway
│   ├── main.py                    # FastAPI entry point
│   ├── agents/
│   │   ├── intent_agent.py
│   │   ├── discovery_agent.py
│   │   ├── decision_agent.py
│   │   ├── booking_agent.py
│   │   └── followup_agent.py
│   ├── routers/
│   │   ├── process.py             # POST /api/process (main pipeline)
│   │   ├── bookings.py
│   │   └── providers.py
│   ├── db/
│   │   ├── supabase_client.py
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── requirements.txt
│   └── .env
│
└── README.md
```

### API Endpoints (FastAPI)

| Method | Endpoint | What It Does |
|---|---|---|
| POST | `/api/process` | Main pipeline — runs all 5 agents, returns full result |
| GET | `/api/providers` | List all providers |
| GET | `/api/providers/search` | Search by `?service=&area=` |
| POST | `/api/bookings` | Create booking in Supabase |
| GET | `/api/bookings/{id}` | Get booking + status |
| PATCH | `/api/bookings/{id}/status` | Update booking status |
| POST | `/api/reminders` | Schedule a follow-up reminder |
| GET | `/api/trace/{session_id}` | Get agent trace steps for a session |

### Agent Workflow

```
User Message (Next.js UI)
         ↓
   POST /api/process  (FastAPI)
         ↓
   [Google Antigravity Orchestrator]
         ↓
   Intent Agent
   → output: { service_type, location, time, language }
         ↓
   Discovery Agent
   → tool call: GET /api/providers/search
   → output: { provider_list[] }
         ↓
   Decision Agent
   → scores + ranks providers
   → output: { top_provider, reasoning, alternatives[] }
         ↓
   Booking Agent
   → tool call: POST /api/bookings  →  Supabase write
   → output: { booking_id, receipt, before_state, after_state }
         ↓
   Follow-Up Agent
   → tool call: POST /api/reminders  →  Supabase write
   → output: { reminder_time, follow_up_messages[] }
         ↓
   Full response streamed back to Next.js
   → chat reply + provider cards + receipt + trace log
```

### Supabase Database Schema

**Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query):**

```sql
-- Providers table
create table providers (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  category     text not null,
  area         text not null,
  city         text not null,
  lat          float,
  lng          float,
  rating       float default 4.0,
  total_jobs   int default 0,
  is_available boolean default true,
  price_min    int,
  price_max    int,
  phone        text,
  created_at   timestamptz default now()
);

-- Bookings table
create table bookings (
  id              uuid primary key default gen_random_uuid(),
  booking_ref     text unique not null,
  user_request    text not null,
  service_type    text not null,
  provider_id     uuid references providers(id),
  provider_name   text,
  scheduled_time  timestamptz,
  area            text,
  status          text default 'CONFIRMED',
  price_estimate  text,
  reminder_set    boolean default false,
  created_at      timestamptz default now()
);

-- Reminders table
create table reminders (
  id          uuid primary key default gen_random_uuid(),
  booking_id  uuid references bookings(id),
  trigger_at  timestamptz not null,
  message     text,
  sent        boolean default false,
  created_at  timestamptz default now()
);

-- Agent traces table
create table agent_traces (
  id          uuid primary key default gen_random_uuid(),
  session_id  text not null,
  agent_name  text not null,
  step_order  int not null,
  action      text,
  input       jsonb,
  output      jsonb,
  reasoning   text,
  tool_called text,
  created_at  timestamptz default now()
);
```

**Seed data — run this after schema:**

```sql
insert into providers (name, category, area, city, lat, lng, rating, is_available, price_min, price_max, phone) values
('Ali AC Services',       'AC Technician', 'G-13',    'Islamabad', 33.67, 73.05, 4.7, true,  800,  1500, '0300-1234567'),
('Hassan Cooling Co.',    'AC Technician', 'G-10',    'Islamabad', 33.68, 73.03, 4.3, true,  700,  1200, '0301-2345678'),
('Karim AC Repair',       'AC Technician', 'F-10',    'Islamabad', 33.70, 73.02, 4.5, false, 900,  1800, '0302-3456789'),
('Master Plumbers Pk',    'Plumber',       'DHA',     'Karachi',   24.82, 67.07, 4.6, true,  500,  1000, '0303-4567890'),
('Quick Fix Plumbing',    'Plumber',       'Gulshan', 'Karachi',   24.93, 67.09, 4.1, true,  400,  800,  '0304-5678901'),
('Rehman Electricals',    'Electrician',   'G-13',    'Islamabad', 33.67, 73.06, 4.8, true,  600,  1200, '0305-6789012'),
('Spark Electric',        'Electrician',   'F-8',     'Islamabad', 33.72, 73.04, 4.2, true,  500,  1100, '0306-7890123'),
('City Tutor Network',    'Tutor',         'Clifton', 'Karachi',   24.81, 67.03, 4.9, true,  800,  2000, '0307-8901234'),
('HomeClean Pro',         'Cleaner',       'DHA',     'Lahore',    31.47, 74.40, 4.4, true,  600,  1200, '0308-9012345'),
('SafeGuard Security',    'Security',      'Bahria',  'Islamabad', 33.53, 72.97, 4.3, false, 1500, 3000, '0309-0123456'),
('Ahmed Plumbing Works',  'Plumber',       'G-13',    'Islamabad', 33.66, 73.05, 4.5, true,  550,  950,  '0310-1234567'),
('Cool Breeze AC',        'AC Technician', 'DHA',     'Karachi',   24.80, 67.06, 4.6, true,  750,  1400, '0311-2345678'),
('BrightSpark Electric',  'Electrician',   'Gulshan', 'Karachi',   24.92, 67.10, 4.0, true,  450,  900,  '0312-3456789'),
('TopTutor Academy',      'Tutor',         'F-8',     'Islamabad', 33.71, 73.03, 4.8, true,  900,  2500, '0313-4567890'),
('CleanHome Services',    'Cleaner',       'G-10',    'Islamabad', 33.69, 73.04, 4.2, true,  500,  1000, '0314-5678901');
```

---

## 7. GOOGLE ANTIGRAVITY — HOW IT'S USED (DETAILED)

Antigravity is the **core brain**, not a wrapper. Every decision goes through it.

| Antigravity Feature | How Khadmat Uses It |
|---|---|
| Agent Orchestration | Sequences all 5 agents; decides what runs next based on output of previous |
| Tool Registration | FastAPI endpoints registered as callable tools in Antigravity |
| Structured Reasoning | Every agent outputs a reasoning chain before acting |
| Workplan Generation | At session start, Antigravity generates a full workplan for the request |
| Task Plan | Each agent has a task plan with inputs, expected outputs, and success criteria |
| Retry Logic | If a tool call fails, Antigravity retries or picks an alternative |
| Trace Logging | Every reasoning step written to Supabase `agent_traces` via FastAPI |

**The tool registration pattern:**
- `search_providers` → calls `GET /api/providers/search`
- `create_booking` → calls `POST /api/bookings`
- `schedule_reminder` → calls `POST /api/reminders`
- `log_trace_step` → calls `POST /api/trace`

This means Antigravity is doing real tool use — not just generating text about it.

---

## 8. EVALUATION CRITERIA — HOW KHADMAT SCORES

| Criterion | Weight | Coverage |
|---|---|---|
| Google Antigravity Usage | 25% | All 5 agents run through Antigravity; FastAPI endpoints are registered tools; full trace logs in Supabase and visible in Next.js |
| Agentic Reasoning & Workflow | 20% | Multi-agent pipeline; structured reasoning at each step; autonomous decisions; trace panel shows every step |
| Matching Quality & Decision Logic | 20% | Weighted scoring shown in UI; natural language explanation from Decision Agent; top 3 alternatives shown |
| Action Simulation & Execution | 15% | Real Supabase write (demo-able live); before/after state shown; booking receipt generated |
| Technical Implementation | 10% | Clean Next.js + FastAPI + Supabase; async FastAPI; error handling; deployed live |
| Innovation & UX | 10% | Urdu-first NLP; animated live trace panel; before/after DB visualization; live deployed URL |

**Projected score: 95%+ if built as described.**

---

## 9. DAY-BY-DAY BUILD PLAN (May 16–20)

### Day 1 — Saturday May 16: Setup Everything
**Goal:** All services connected, Intent Agent working

- [ ] Go to supabase.com → New Project (free, no card)
  - Run schema SQL (4 tables from Section 6)
  - Run seed SQL (15 providers)
  - Copy `SUPABASE_URL` and `SUPABASE_ANON_KEY` from Settings → API
- [ ] Go to railway.app → New Project → "Deploy from GitHub" (free, no card)
- [ ] `npx create-next-app@latest frontend --typescript --tailwind --app`
- [ ] Create FastAPI backend:
  ```bash
  mkdir backend && cd backend
  python -m venv venv && source venv/bin/activate
  pip install fastapi uvicorn supabase python-dotenv httpx
  ```
- [ ] Write `main.py` with basic FastAPI app + CORS for Next.js
- [ ] Write `db/supabase_client.py` — connect to Supabase
- [ ] Build `GET /api/providers` — fetch all from Supabase, test in browser
- [ ] Set up Antigravity project in Google Cloud Console
- [ ] Build **Intent Agent** — input: message string → output: `{service_type, location, time}`
- [ ] Test with 5 sample inputs in all 3 languages

**End of Day 1 Checkpoint:** `POST /api/process` with a message → Intent Agent returns structured JSON ✅

---

### Day 2 — Sunday May 17: Discovery + Ranking
**Goal:** Full provider matching pipeline

- [ ] Build `GET /api/providers/search?service=&area=` in FastAPI
  - Query Supabase with `.eq('category', service).eq('area', area).eq('is_available', True)`
  - Add haversine distance calculation
- [ ] Register `search_providers` as a tool in Antigravity
- [ ] Build **Discovery Agent** — calls the tool, gets provider list
- [ ] Build **Decision Agent** — scores providers, generates reasoning text
- [ ] Wire Intent → Discovery → Decision in Antigravity orchestrator
- [ ] Test full flow: "Mujhe G-13 mein plumber chahiye" → ranked providers with reasoning

**End of Day 2 Checkpoint:** User message → top 3 ranked providers with explanation ✅

---

### Day 3 — Monday May 18: Booking + Follow-Up + Traces
**Goal:** Real DB writes, follow-up working, traces stored

- [ ] Build `POST /api/bookings` in FastAPI
  - Generate booking ref: `BK-{date}-{random}`
  - Insert into `bookings` table
  - Update provider `is_available = false`
  - Return receipt + before/after state
- [ ] Register `create_booking` as Antigravity tool
- [ ] Build **Booking Agent** in Antigravity
- [ ] Build `POST /api/reminders` in FastAPI → insert into `reminders` table
- [ ] Register `schedule_reminder` as Antigravity tool
- [ ] Build **Follow-Up Agent** in Antigravity
- [ ] Build `POST /api/trace` to store each agent step in `agent_traces`
- [ ] Build `GET /api/trace/{session_id}` to retrieve trace steps
- [ ] Full pipeline test: message → booking in Supabase → reminder in Supabase

**End of Day 3 Checkpoint:** Supabase shows booking row + reminder row after a request ✅

---

### Day 4 — Tuesday May 19: Next.js UI
**Goal:** Polished deployed web app

- [ ] **Chat Screen** (`app/page.tsx`)
  - Text input with send button
  - Message thread (user bubble + AI response bubble)
  - Loading state: "Agents running..." with animated dots
- [ ] **Provider Cards** component
  - Name, category badge, ⭐ rating, area, price range PKR
  - Green "AVAILABLE" / gray "BUSY" badge
  - #1 card highlighted with border
- [ ] **Booking Receipt** component
  - Booking Ref, Provider, Time, Price, CONFIRMED ✅ badge
  - Before/After state row: `is_available: true → false`
- [ ] **Agent Trace Panel** component
  - Fetches from `GET /api/trace/{session_id}` every 1 second during processing
  - Animates each step appearing: Intent Agent ✅ → Discovery Agent ✅ → ...
- [ ] Add Tailwind styling — clean, professional look
- [ ] Deploy to Vercel: `npx vercel --prod`
- [ ] Deploy FastAPI to Railway (connect GitHub, set env vars)
- [ ] Update `NEXT_PUBLIC_API_URL` in Vercel env vars to Railway URL

**End of Day 4 Checkpoint:** Live URL working end-to-end on Vercel ✅

---

### Day 5 — Wednesday May 20: Polish, Video, Submit
**Goal:** Submitted before midnight

**Morning (2 hours):**
- [ ] Fix any bugs from Day 4 testing
- [ ] Add error states: "No providers found in this area", "Invalid request"
- [ ] Add loading skeleton to provider cards
- [ ] Final test on live URL

**Afternoon (2–3 hours) — Record Demo Video:**
1. Screen record the live Vercel URL
2. Type: "Mujhe kal subah G-13 mein AC technician chahiye"
3. Walk through every step narrating in Urdu/English
4. Show Supabase dashboard at the end — live booking row
5. Show agent trace panel with all 5 steps completed

**Evening (2 hours):**
- [ ] Write README (template in Section 13)
- [ ] Screenshot Antigravity workplan + task plan
- [ ] Export agent trace log as JSON/screenshot
- [ ] Fill submission form with: GitHub link, Vercel URL, video link, README
- [ ] Submit ✅

---

## 10. DEMO SCRIPT

**Opening (30 sec):**
"Pakistan mein ghar ka koi kaam karwana ho — AC theek karwani, plumber bulana — ghanton WhatsApp pe lag jaate hain. Khadmat AI iss problem solve karta hai. Ek message, apni zuban mein, aur kaam ho jata hai."

**Live demo (3 min):**
1. Open live app at khadmat-ai.vercel.app
2. Type: "Mujhe kal subah G-13 mein AC technician chahiye"
3. Show trace panel lighting up — "Intent Agent: extracting service, location, time..."
4. Show extracted: `AC Technician | G-13 | Tomorrow morning`
5. "Discovery Agent querying database..." → 3 providers found
6. "Decision Agent ranking..." → scoring shown
7. "Ali AC Services — 2.1km, ⭐4.7, available tomorrow — SELECTED"
8. "Booking Agent writing to database..."
9. Show receipt: BK-20250520-001 — CONFIRMED ✅
10. Switch tab: open Supabase dashboard → booking row visible live
11. Show provider row: `is_available` changed to `false`
12. "Follow-Up Agent: reminder set for tomorrow 9:00 AM"
13. Show reminders table row in Supabase
14. Scroll through full 5-step trace log

**Close:**
"Yeh hai Khadmat AI — Google Antigravity orchestration, FastAPI backend, Supabase database, Next.js frontend. Ek message se complete booking. Shukriya."

---

## 11. ENVIRONMENT VARIABLES

**`backend/.env`**
```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key
GOOGLE_CLOUD_PROJECT=your-project-id
GEMINI_API_KEY=your-gemini-key
ANTIGRAVITY_API_KEY=your-key
```

**`frontend/.env.local`**
```
NEXT_PUBLIC_API_URL=https://your-app.up.railway.app
```

---

## 12. ASSUMPTIONS & LIMITATIONS

- Provider data is seeded mock data (15 providers across 3 cities)
- Distance uses haversine formula on lat/lng — not Google Maps routing
- Notifications are simulated — stored in Supabase, not actually sent via SMS
- No real user authentication — demo uses a fixed test session ID
- Railway free tier: 500 hours/month — sufficient for demo period
- Antigravity used for all 5 agents — not superficially for just one step

---

## 13. README TEMPLATE

```markdown
# Khadmat AI
### AI Service Orchestrator for Pakistan's Informal Economy
Google Antigravity Hackathon 2026 — Challenge 2

## Live Links
- Frontend: https://khadmat-ai.vercel.app
- Backend API Docs: https://khadmat-ai.up.railway.app/docs

## Tech Stack
| Layer | Technology | Hosting |
|---|---|---|
| Frontend | Next.js 14 | Vercel (free) |
| Backend | Python FastAPI | Railway (free) |
| Database | Supabase PostgreSQL | Supabase (free) |
| AI | Google Antigravity + Gemini | Google Cloud |

## The 5 Agents
1. Intent Agent — Extracts service, location, time from Urdu/Roman Urdu/English
2. Discovery Agent — Queries Supabase for matching nearby providers
3. Decision Agent — Ranks by distance (40%) + rating (40%) + availability (20%)
4. Booking Agent — Writes booking to Supabase, generates receipt
5. Follow-Up Agent — Schedules reminder, handles status updates

## How Antigravity Is Used
Antigravity is the central orchestrator. FastAPI endpoints are
registered as callable tools. All agent reasoning is stored in
Supabase and displayed live in the Next.js Trace panel.

## Local Setup
# Backend
cd backend && python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # add your keys
uvicorn main:app --reload --port 8000

# Frontend
cd frontend && npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev

## Database Setup
Run backend/db/schema.sql then backend/db/seed.sql in Supabase SQL Editor.

## Assumptions
- Provider data is seeded mock data
- Notifications are simulated (stored in DB)
- No auth in MVP demo
```

---

*Built for Google Antigravity Hackathon 2026 — Challenge 2*
*Deadline: May 20, 2026 (midnight)*
*Stack: Next.js · FastAPI · Supabase · Google Antigravity · Gemini 1.5 Flash*
*Deployment: Vercel (frontend) · Railway (backend) · Supabase (database)*
*Total cost: PKR 0*
