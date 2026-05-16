# Booking Receipt Page Spec

## Page Route
`/booking/{id}` → `app/booking/[id]/page.tsx`

## Purpose
Post-booking confirmation page showing the full receipt, assigned provider details, database state change (before/after), and scheduled reminder. Serves as proof of booking for the customer and is linked from chat confirmations and the bookings dashboard.

## UI Sections

### Breadcrumb
`Home / Book a service / Confirmation`

### Success Banner
- Large green circle with checkmark icon
- Title: "Booking confirmed!"
- Subtitle: "{Provider name} has been booked for {date/time}. A reminder will be sent at {reminder_time}."

### Booking Receipt Card
| Field | Icon | Value |
|---|---|---|
| Service | tool | AC Technician |
| Date & time | calendar | Thu 21 May 2026 · 10:00 AM |
| Location | map-pin | G-13, Islamabad |
| Price estimate | currency-rupee | PKR 800 – 1,500 |
| Status | circle-check | Confirmed (green pill) |
- Header: "Booking receipt" + Booking ref (monospace: `BK-20250521-001`)

### Provider Card
- Avatar initials (circle, green)
- Name: "Ali AC Services"
- Category + location: "AC Technician · G-13, Islamabad"
- Stats grid (3 columns): Rating (4.7 ⭐), Distance (2.1 km), Contact (0300-123)

### Database State Change Card
- Header: "Database state change" (with database icon)
- Two columns: BEFORE | → arrow | AFTER

| Field | Before | After |
|---|---|---|
| `is_available` | `true` | **`false`** (green) |
| `booking_ref` | `null` (gray) | **`BK-20250521-001`** (green, mono) |
| `status` | `—` (gray) | **`CONFIRMED`** (green) |

### Reminder Card
- Bell icon in amber circle
- Title: "Reminder scheduled"
- Subtitle: "You'll be notified tomorrow at 9:00 AM — 1 hour before your booking"
- Time badge: "9:00 AM" (amber)

### Action Buttons
| Button | Style | Action |
|---|---|---|
| View my bookings | Primary (green) | Navigate to `/dashboard` |
| Book another service | Secondary (outline) | Navigate to `/book` |
| Download receipt | Secondary (outline) | Generate PDF receipt |

## States
- **Loading**: Skeleton cards while fetching booking data
- **Confirmed**: All sections visible (default)
- **Cancelled**: Status pill shows "Cancelled" (red), action buttons change
- **Error**: Booking not found → 404 message
