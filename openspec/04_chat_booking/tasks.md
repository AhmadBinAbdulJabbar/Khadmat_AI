# AI Chat Booking Tasks

## Frontend Tasks

### F-CHAT-01: Build Chat Layout
- [x] Two-column layout: chat (left) + trace panel (right, 300px)
- [x] Breadcrumb navigation
- [x] Responsive: trace panel collapses to modal on mobile

### F-CHAT-02: Build Chat Header & Message Thread
- [x] Chat header with logo, title, subtitle, online dot
- [x] Scrollable message container with auto-scroll on new message
- [x] AI welcome message rendered on mount

### F-CHAT-03: Build Message Bubble Components
- [x] `MessageBubble.tsx` — renders AI or user messages
- [x] AI bubble: gray background, left-aligned with K avatar
- [x] User bubble: green background, white text, right-aligned with U avatar
- [x] Timestamp display (optional)
- [x] Typing indicator: animated dots while processing

### F-CHAT-04: Build Provider Card Component
- [x] `ProviderCard.tsx` — embedded in AI response
- [x] Shows: name, badge (#1 best match / available), distance, rating, time, price
- [x] Best match card has green border
- [x] Clickable → sends "Book {name}" message automatically

### F-CHAT-05: Build Booking Receipt Component (Inline)
- [x] `BookingReceipt.tsx` (inline version for chat)
- [x] Checkmark + "Booking confirmed!" header
- [x] Details grid: Ref, Provider, Time, Reminder
- [x] Link to full receipt page

### F-CHAT-06: Build Chat Input Component
- [x] `ChatInput.tsx`
- [x] Microphone icon (UI placeholder for voice)
- [x] Text input with placeholder
- [x] Send button (disabled when empty)
- [x] Submit on Enter key
- [x] Clear input after send

### F-CHAT-07: Build Agent Trace Panel
- [x] `TracePanel.tsx`
- [x] 5 trace step slots (one per agent)
- [x] Each step: status dot (green/yellow/gray), agent name, status badge, detail text, tool name
- [x] Steps animate in sequence: pending → running → done
- [x] Poll `GET /api/trace/{session_id}` every 1 second during processing

### F-CHAT-08: Build Session Info Footer
- [x] Session ID, duration, model name, overall status
- [x] Updates when all agents complete

### F-CHAT-09: Wire Chat to API
- [x] On user message send → `POST /api/process` with `{ message, session_id }`
- [x] Parse response: extract intent, providers, booking, reminder
- [x] Render appropriate components in chat thread
- [x] Trigger trace panel polling

### F-CHAT-10: Error & Edge Case Handling
- [x] "No providers found" message rendering
- [x] Network error message
- [x] Agent failure indicator in trace panel
- [x] Retry button in chat

---

## Backend Tasks

### B-CHAT-01: Main Process Pipeline
- [x] `POST /api/process`
- [x] Request: `{ message: string, session_id: string, user_id?: string }`
- [x] Generate `session_id` if not provided
- [x] Run 5 agents in sequence via Google Antigravity orchestrator
- [x] Return complete response:
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
- [x] `agents/intent_agent.py`
- [x] Input: raw message string
- [x] Uses Gemini 1.5 Flash via Antigravity
- [x] Extract: `service_type`, `location` (area, city), `time` (date/time), `language` (en/ur/roman)
- [x] Handle Urdu script, Roman Urdu transliteration, English
- [x] Output structured JSON
- [x] Log trace step to `agent_traces` table

### B-CHAT-03: Discovery Agent
- [x] `agents/discovery_agent.py`
- [x] Input: `{ service_type, area, city }`
- [x] Tool call: `GET /api/providers/search?service={}&area={}&city={}`
- [x] Filter available providers
- [x] Calculate haversine distance from user location (or area center)
- [x] Output: list of matching providers
- [x] Log trace step

### B-CHAT-04: Decision Agent
- [x] `agents/decision_agent.py`
- [x] Input: list of providers
- [x] Scoring formula: `distance (40%) + rating (40%) + availability (20%)`
- [x] Normalize scores to 0–100
- [x] Generate natural language reasoning (Gemini)
- [x] Output: ranked list with scores + reasoning text
- [x] Log trace step

### B-CHAT-05: Booking Agent
- [x] `agents/booking_agent.py`
- [x] Input: selected provider + booking details
- [x] Tool call: `POST /api/bookings`
- [x] Capture before/after state of provider `is_available`
- [x] Generate booking receipt
- [x] Output: booking confirmation with ref
- [x] Log trace step

### B-CHAT-06: Follow-Up Agent
- [x] `agents/followup_agent.py`
- [x] Input: booking details
- [x] Tool call: `POST /api/reminders`
- [x] Schedule reminder 1 hour before appointment
- [x] Generate follow-up message text
- [x] Output: reminder confirmation
- [x] Log trace step

### B-CHAT-07: Antigravity Orchestrator
- [x] `agents/orchestrator.py`
- [x] Register all 5 agents with Antigravity
- [x] Register FastAPI tools: `search_providers`, `create_booking`, `schedule_reminder`, `log_trace_step`
- [x] Define agent workflow sequence
- [x] Handle errors: retry logic, fallback messages
- [x] Workplan generation at session start

### B-CHAT-08: Trace Logging API
- [x] `POST /api/trace` — log a single agent trace step
- [x] `GET /api/trace/{session_id}` — return all trace steps for a session, ordered by `step_order`
- [x] Each step: `agent_name, step_order, action, input, output, reasoning, tool_called`

### B-CHAT-09: Language Detection Utility
- [x] `utils/language.py`
- [x] Detect if input is Urdu script, Roman Urdu, or English
- [x] Uses character set analysis (Arabic script vs Latin)
- [x] Returns language code for Intent Agent context
