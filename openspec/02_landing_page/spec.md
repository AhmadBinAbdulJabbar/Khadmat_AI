# Landing Page Spec

## Page Route
`/` → `app/page.tsx`

## Purpose
Public-facing marketing page that introduces Khadmat AI, explains how it works, showcases features and available services, and drives users to either book via AI chat or browse providers.

## UI Sections

### 1. Navigation Bar
- Logo: K badge + "Khadmat AI"
- Links: "How it works", "Services", "Providers"
- CTA button: "Try now" → navigates to `/book`

### 2. Hero Section
- Badge pill: "Powered by Google Antigravity" (with sparkle icon)
- Headline: "Book any home service in **your language**"
- Subtext describing Urdu/Roman Urdu/English support
- Two buttons: "Book a service" (primary → `/book`) | "Browse providers" (secondary → `/providers`)
- Demo input preview showing example query: "Mujhe kal subah G-13 mein AC technician chahiye"
- Send button (visual only on landing, navigates to chat on click)
- Language pills: Urdu, Roman Urdu, English

### 3. Stats Bar (3 columns)
| Stat | Value |
|---|---|
| Bookings completed | 5,000+ |
| Verified providers | 200+ |
| Cities | 3 cities (Karachi · Lahore · Islamabad) |

### 4. Features Grid (6 cards)
| Feature | Icon | Description |
|---|---|---|
| Multilingual | language | Urdu, Roman Urdu, English |
| Location aware | map-pin | Finds closest providers |
| Smart ranking | stars | Distance + rating + availability |
| Instant booking | calendar-check | Confirmed in seconds |
| Auto reminders | bell | AI schedules follow-ups |
| Agent trace | activity | Real-time reasoning visibility |

### 5. How It Works (4 steps with arrows)
1. Describe your need → 2. AI finds providers → 3. Best match selected → 4. Booking confirmed

### 6. Services Grid (8 service chips)
AC Technician, Plumber, Electrician, Tutor, Cleaner, Security, Carpenter, Painter — each clickable → navigates to `/book`

### 7. CTA Section
- Headline: "Ready to try Khadmat AI?"
- Subtext + "Start booking" button → `/book`

### 8. Footer
- Left: "© 2026 Khadmat AI · Google Antigravity Hackathon"
- Right links: GitHub, Docs, About

## States
- **Default**: Static content, all stats hardcoded (MVP)
- **Responsive**: Single column on mobile, grid collapses
- **Authenticated user**: Navigation shows user avatar + name instead of "Try now"
