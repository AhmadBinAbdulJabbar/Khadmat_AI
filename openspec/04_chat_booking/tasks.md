# AI Chat Booking Tasks

## Frontend Tasks

### F-CHAT-01: Build Chat Layout
- [ ] Two-column layout: chat (left) + trace panel (right, 300px)
- [ ] Breadcrumb navigation
- [ ] Responsive: trace panel collapses to modal on mobile

### F-CHAT-02: Build Chat Header & Message Thread
- [ ] Chat header with logo, title, subtitle, online dot
- [ ] Scrollable message container with auto-scroll on new message
- [ ] AI welcome message rendered on mount

### F-CHAT-03: Build Message Bubble Components
- [ ] `MessageBubble.tsx` — renders AI or user messages
- [ ] AI bubble: gray background, left-aligned with K avatar
- [ ] User bubble: green background, white text, right-aligned with U avatar
- [ ] Timestamp display (optional)
- [ ] Typing indicator: animated dots while processing

### F-CHAT-04: Build Provider Card Component
- [ ] `ProviderCard.tsx` — embedded in AI response
- [ ] Shows: name, badge (#1 best match / available), distance, rating, time, price
- [ ] Best match card has green border
- [ ] Clickable → sends "Book {name}" message automatically

### F-CHAT-05: Build Booking Receipt Component (Inline)
- [ ] `BookingReceipt.tsx` (inline version for chat)
- [ ] Checkmark + "Booking confirmed!" header
- [ ] Details grid: Ref, Provider, Time, Reminder
- [ ] Link to full receipt page

### F-CHAT-06: Build Chat Input Component
- [ ] `ChatInput.tsx`
- [ ] Microphone icon (UI placeholder for voice)
- [ ] Text input with placeholder
- [ ] Send button (disabled when empty)
- [ ] Submit on Enter key
- [ ] Clear input after send

### F-CHAT-07: Build Agent Trace Panel
- [ ] `TracePanel.tsx`
- [ ] 5 trace step slots (one per agent)
- [ ] Each step: status dot (green/yellow/gray), agent name, status badge, detail text, tool name
- [ ] Steps animate in sequence: pending → running → done
- [ ] Poll `GET /api/trace/{session_id}` every 1 second during processing

### F-CHAT-08: Build Session Info Footer
- [ ] Session ID, duration, model name, overall status
- [ ] Updates when all agents complete

### F-CHAT-09: Wire Chat to API
- [ ] On user message send → `POST /api/process` with `{ message, session_id }`
- [ ] Parse response: extract intent, providers, booking, reminder
- [ ] Render appropriate components in chat thread
- [ ] Trigger trace panel polling

### F-CHAT-10: Error & Edge Case Handling
- [ ] "No providers found" message rendering
- [ ] Network error message
- [ ] Agent failure indicator in trace panel
- [ ] Retry button in chat

---

## Backend Tasks

### B-CHAT-01: Main Process Pipeline
- [ ] `POST /api/process`
- [ ] Request: `{ message: string, session_id: string, user_id?: string }`
- [ ] Generate `session_id` if not provided
- [ ] Run 5 agents in sequence via Google Antigravity orchestrator
- [ ] Return complete response:
```json
{
  "session_id": "sess_xxx",
  "intent": { "service_type", "location", "time", "language" },
  "providers": [ ... ],
  "selected_provider": { ... },
  "booking": { "booking_ref", "status", "receipt" },
  "reminder": { "trigger_at", "message" },
  "trace_steps": [ ... ],
  "ai_response_text": "..."
}
```

### B-CHAT-02: Intent Agent
- [ ] `agents/intent_agent.py`
- [ ] Input: raw message string
- [ ] Uses Gemini 1.5 Flash via Antigravity
- [ ] Extract: `service_type`, `location` (area, city), `time` (date/time), `language` (en/ur/roman)
- [ ] Handle Urdu script, Roman Urdu transliteration, English
- [ ] Output structured JSON
- [ ] Log trace step to `agent_traces` table

### B-CHAT-03: Discovery Agent
- [ ] `agents/discovery_agent.py`
- [ ] Input: `{ service_type, area, city }`
- [ ] Tool call: `GET /api/providers/search?service={}&area={}&city={}`
- [ ] Filter available providers
- [ ] Calculate haversine distance from user location (or area center)
- [ ] Output: list of matching providers
- [ ] Log trace step

### B-CHAT-04: Decision Agent
- [ ] `agents/decision_agent.py`
- [ ] Input: list of providers
- [ ] Scoring formula: `distance (40%) + rating (40%) + availability (20%)`
- [ ] Normalize scores to 0–100
- [ ] Generate natural language reasoning (Gemini)
- [ ] Output: ranked list with scores + reasoning text
- [ ] Log trace step

### B-CHAT-05: Booking Agent
- [ ] `agents/booking_agent.py`
- [ ] Input: selected provider + booking details
- [ ] Tool call: `POST /api/bookings`
- [ ] Capture before/after state of provider `is_available`
- [ ] Generate booking receipt
- [ ] Output: booking confirmation with ref
- [ ] Log trace step

### B-CHAT-06: Follow-Up Agent
- [ ] `agents/followup_agent.py`
- [ ] Input: booking details
- [ ] Tool call: `POST /api/reminders`
- [ ] Schedule reminder 1 hour before appointment
- [ ] Generate follow-up message text
- [ ] Output: reminder confirmation
- [ ] Log trace step

### B-CHAT-07: Antigravity Orchestrator
- [ ] `agents/orchestrator.py`
- [ ] Register all 5 agents with Antigravity
- [ ] Register FastAPI tools: `search_providers`, `create_booking`, `schedule_reminder`, `log_trace_step`
- [ ] Define agent workflow sequence
- [ ] Handle errors: retry logic, fallback messages
- [ ] Workplan generation at session start

### B-CHAT-08: Trace Logging API
- [ ] `POST /api/trace` — log a single agent trace step
- [ ] `GET /api/trace/{session_id}` — return all trace steps for a session, ordered by `step_order`
- [ ] Each step: `agent_name, step_order, action, input, output, reasoning, tool_called`

### B-CHAT-09: Language Detection Utility
- [ ] `utils/language.py`
- [ ] Detect if input is Urdu script, Roman Urdu, or English
- [ ] Uses character set analysis (Arabic script vs Latin)
- [ ] Returns language code for Intent Agent context
