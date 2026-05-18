# Landing Page Spec

## Page Route
`/` → `app/page.tsx`

## Purpose
Public-facing marketing page that introduces Khadmat AI, showcases platform features, explains how it works, and drives unauthenticated users to sign up. Automatically redirects authenticated users to their dashboard.

## Authentication Behavior
- **Not logged in**: Shows full landing page with marketing content
- **Logged in as customer**: Redirects to `/customer/dashboard`
- **Logged in as provider**: Redirects to `/provider/dashboard`

## UI Sections

### 1. Navigation Bar (sticky)
- **Left**: Logo "K" badge + "Khadmat AI" text
- **Center** (desktop only): Navigation links "How it works", "Services", "Cities", "About" (anchor links)
- **Right**: "Get started" button → `/auth?role=customer`
- **Mobile**: Hamburger menu with all navigation items + "Get started" button
- **Note**: Profile icon hidden on landing page (only shown when authenticated)

### 2. Hero Section (id="hero")
- Badge: "Powered by Google Antigravity" with Sparkles icon (animated pulse)
- Headline: "Pakistan's smartest home services platform"
- Subtext: "Find trusted plumbers, electricians, AC technicians, tutors and more — in your language, in your city, instantly."
- Two buttons:
  - "Book a service" (primary, green) → `/auth?role=customer`
  - "Join as a provider" (secondary, outlined) → `/auth?role=worker`
- Demo search box with example query: "Mujhe kal subah G-13 mein AC technician chahiye"
- Language pills: Urdu, Roman Urdu, English
- Search submit → navigates to `/chat?q={query}`

### 3. Stats Section (3 columns, bordered grid)
| Stat | Value |
|---|---|
| Bookings completed | 5,000+ |
| Verified providers | 200+ |
| Cities | 3 cities (Karachi · Lahore · Islamabad) |

### 4. How It Works Section (id="how")
- Section label: "HOW IT WORKS"
- Headline: "From message to booking in 4 steps"
- 4-step grid with numbered circles
- Each step: title and description

### 5. Services Section (id="services")
- Section label: "SERVICES"
- Headline: "What can we help with?"
- 8 service chips: AC technician, Plumber, Electrician, Tutor, Cleaner, Carpenter, Painter, Security
- Each with icon + label, hover effect

### 6. Tech Strip
- Text: "Powered by Google Antigravity — 5 AI agents working together"
- 5 agent pills: Intent Agent, Discovery Agent, Decision Agent, Booking Agent, Follow-up Agent

### 7. Who Is It For Section (id="about")
- Headline: "Built for everyone"
- 2 large cards:
  - **Customer** (green border, clickable → `/auth?role=customer`): "Create customer account" button
  - **Provider** (gray border, clickable → `/auth?role=worker`): "Join as a provider" button
- Each with icon, title, description, 5 feature checkmarks

### 8. Trust & Safety Section
- Headline: "Why customers trust Khadmat AI"
- 4 trust pillars: Verified providers, Real reviews, Transparent pricing, 24/7 support

### 9. Reviews Section
- Headline: "What people are saying"
- 3 review cards with rating, quote, user avatar + name

### 10. Cities Section (id="cities")
- Headline: "Now live in 3 cities"
- 3 city cards with provider count + progress bar

### 11. CTA Section
- Headline: "Ready to get started?"
- Two buttons: "Create customer account" → `/auth?role=customer`, "Join as a provider" → `/auth?role=worker`

### 12. Global Footer
- Copyright + links (GitHub, Docs, About)

## Styling
- **Theme**: Light (white bg, dark text #1a1a1a)
- **Accent**: #1D9E75 (teal)
- **Borders**: #e0e0e0 (light gray)
- **Typography**: Responsive, clear hierarchy

## Button URLs
- All CTA buttons pass role parameter to `/auth?role=customer` or `/auth?role=worker`
- Auth page pre-selects role based on parameter
