# Provider Dashboard Tasks

## Frontend Tasks

### F-PDASH-01: Build Provider Layout Shell
- [x] Create shared layout `app/provider/layout.tsx`
- [x] Top nav bar with logo, "Provider" badge, notification bell, avatar
- [x] Sidebar with profile card, availability toggle, nav items
- [x] Active nav item highlighting based on current route
- [x] Responsive: sidebar collapses on mobile

### F-PDASH-02: Build Availability Toggle
- [x] `AvailabilityToggle.tsx`
- [x] Green (on) / gray (off) track with thumb
- [x] Text updates: "Available" ↔ "Offline"
- [x] On toggle → `PATCH /api/providers/{id}/availability`

### F-PDASH-03: Build Dashboard Stats Row
- [x] 4-column responsive grid
- [x] Fetch from dashboard API
- [x] Color-coded values (green for earnings, etc.)

### F-PDASH-04: Build Job Request Cards
- [x] `JobCard.tsx` — reusable across dashboard and my-jobs page
- [x] Variants: new request (amber border), confirmed, completed
- [x] New request includes Accept + Decline buttons
- [x] Accept → `PATCH /api/bookings/{id}/status` → `CONFIRMED`
- [x] Decline → `PATCH /api/bookings/{id}/status` → `DECLINED`

### F-PDASH-05: Build Profile Summary Section
- [x] Key-value row list
- [x] "Edit profile" link → navigate to `/provider/profile`
- [x] "Change" link on phone → inline edit or modal

### F-PDASH-06: Notification Bell
- [x] Red dot indicator for unread notifications
- [x] Click → dropdown or navigate to notifications page
- [x] Fetch unread count from API

---

## Backend Tasks

### B-PDASH-01: Provider Dashboard Summary
- [x] `GET /api/provider/dashboard?provider_id={id}`
- [x] Returns:
```json
{
  "today_jobs": { "total": 3, "pending": 1, "confirmed": 2 },
  "month_earnings": 38400,
  "rating": 4.7,
  "total_reviews": 212,
  "total_completed": 212
}
```
- [x] Aggregated from `bookings` + `providers` tables
- [x] Today's jobs: WHERE `provider_id = ?` AND `scheduled_time::date = today`

### B-PDASH-02: List Incoming Requests
- [x] `GET /api/provider/jobs?provider_id={id}&status=new,confirmed&limit=5`
- [x] Return recent job requests assigned to this provider
- [x] Include: customer name, service type, location, time, price, status
- [x] Sort: new requests first, then by time

### B-PDASH-03: Accept/Decline Job
- [x] `PATCH /api/bookings/{id}/status`
- [x] Accept: status → `CONFIRMED`, send notification to customer
- [x] Decline: status → `DECLINED`, trigger re-assignment or notify customer
- [x] Validate: only the assigned provider can accept/decline

### B-PDASH-04: Toggle Provider Availability
- [x] `PATCH /api/providers/{id}/availability`
- [x] Request: `{ "is_available": true/false }`
- [x] Update `providers.is_available`
- [x] Return updated provider object

### B-PDASH-05: Notification Count
- [x] `GET /api/provider/notifications/count?provider_id={id}`
- [x] Count unread notifications (new bookings, reviews, payments)
- [x] Returns: `{ "unread": 3 }`
