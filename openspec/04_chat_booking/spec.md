# AI Chat Booking Page Spec

## Page Route
`/book` → `app/book/page.tsx`

## Purpose
The core feature of Khadmat AI — a conversational AI chat interface where the user types their service request in natural language (Urdu, Roman Urdu, or English), and the system's 5 AI agents process the request end-to-end, returning ranked providers, making a booking, and scheduling follow-ups. The Agent Trace panel shows real-time reasoning steps.

## UI Sections

### Layout
- Two-column: Chat column (left, wider) + Agent Trace panel (right, 300px)

### Breadcrumb
`Home / Book a service`

### Chat Column

#### Chat Header
- Khadmat AI logo (K badge)
- Title: "Khadmat AI"
- Subtitle: "5 agents ready"
- Green online dot (right-aligned)

#### Message Thread
- Scrollable container, auto-scrolls to bottom on new message
- **AI welcome message**: "Assalam alaikum! Aap kya service chahte hain? Urdu, Roman Urdu, ya English mein likh saktay hain."
- **User message bubble**: Green background, white text, right-aligned
- **AI response bubble**: Gray background, left-aligned
  - Can contain: plain text, provider cards, booking receipt inline

#### Provider Cards (Embedded in AI response)
- Card with green border = "#1 best match"
- Each card shows: name, distance, rating, time slot, price range
- Second card shows "available" badge
- Clickable — user can say "Book this one"

#### Booking Confirmation (Embedded in AI response)
- Checkmark + "Booking confirmed!" header
- Details box: Ref, Provider, Time, Reminder time
- Green accent on key values

#### Chat Input Area
- Microphone icon (future: voice input)
- Text input: "Type in Urdu, Roman Urdu, or English..."
- Send button (green circle with up arrow)

### Agent Trace Panel (Right)

#### Trace Header
- Activity icon + "Agent trace"
- Subtitle: "Real-time Antigravity log"

#### Trace Steps (5 agents)
Each step shows:
| Element | Description |
|---|---|
| Status dot | Green (done) / Yellow (active) / Gray (pending) |
| Agent name | Intent Agent, Discovery Agent, etc. |
| Status badge | "done" / "running" / "pending" |
| Detail text | What the agent found/did |
| Tool called | Monospace: `tool: parse_intent()`, etc. |

**Agent sequence:**
1. **Intent Agent** → Extracted: AC Technician · G-13 · Tomorrow morning → `parse_intent()`
2. **Discovery Agent** → Found 3 providers in G-13, filtered 2 available → `search_providers()`
3. **Decision Agent** → Ali AC: score 91 · Hassan: score 74. Ali selected → `rank_providers()`
4. **Booking Agent** → BK-20250521-001 written to Supabase → `create_booking()`
5. **Follow-up Agent** → Reminder scheduled for tomorrow 9:00 AM → `schedule_reminder()`

#### Session Info (Bottom)
| Label | Value |
|---|---|
| Session | `sess_a1b2c3` |
| Duration | `3.2s` |
| Model | `gemini-1.5-flash` |
| Status | "All agents complete" (green) |

## States
- **Initial**: Welcome message shown, input focused
- **Processing**: Animated dots on AI bubble, trace steps light up one by one
- **Provider results**: Provider cards rendered in chat
- **Booking done**: Receipt shown in chat, all trace steps green
- **Error**: Error bubble in chat, trace shows which agent failed
- **Empty/No match**: "No providers found in this area" message
