# Provider Settings Page Spec

## Page Route
`/provider/settings` → `app/provider/settings/page.tsx`

## Purpose
Comprehensive settings management for providers with 7 sections: Notifications, Availability, Payout, Security, Privacy, App Preferences, and Account (danger zone).

## Layout
- Provider sidebar (shared) + Main area split: Settings nav (180px left) + Content (right)

## Settings Navigation
Notifications, Availability, Payout, Security, Privacy, App, Account (red/danger)

---

## Sections

### 1. Notifications
**Groups:** Job Requests, Reviews & Payments, Channels

| Setting | Toggle |
|---|---|
| New booking request | ON |
| Booking reminder (1hr before) | ON |
| Booking cancelled | ON |
| New review received | ON |
| Payment received | ON |
| Payout sent | ON |
| Push notifications | ON |
| Email notifications | OFF |
| WhatsApp alerts | ON |

### 2. Availability
| Setting | Control |
|---|---|
| Online status | Toggle ON + "Online" badge |
| Auto go offline | Toggle ON |
| Working hours start | Select: 8:00 AM |
| Working hours end | Select: 6:00 PM |
| Max jobs per day | Select: 4 jobs |
| Vacation/leave | "No dates blocked" → date picker |

### 3. Payout
- Linked bank: Meezan Bank, masked account, Verified badge
- Payout schedule: Bi-weekly (select)
- Min payout amount: PKR 5000 (input)
- Next payout: 30 May 2026 (badge)

### 4. Security
| Setting | Control |
|---|---|
| Change password | Button |
| Two-factor auth | Toggle OFF + "Off" badge |
| Active sessions (2) | "Sign out all" button |
| Login history | Chevron → detail |

### 5. Privacy
| Setting | Toggle |
|---|---|
| Show full name | ON |
| Show phone (after booking) | ON |
| Show exact location | OFF |
| Show reviews publicly | ON |

### 6. App Preferences
| Setting | Control |
|---|---|
| Dark mode | Toggle ON |
| Language | Select: English |
| Currency | Select: PKR |
| Sound alerts | Toggle ON |

### 7. Account (Danger Zone)
- Download my data → Request export
- Pause account → Pause
- Sign out → Sign out (red)
- Delete account → Delete (red, confirmation required)
