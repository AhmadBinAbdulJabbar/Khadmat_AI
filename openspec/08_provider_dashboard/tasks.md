# Provider Dashboard Tasks

## Frontend Tasks

### F-PDASH-01: Build Provider Layout Shell
- [ ] Create shared layout `app/provider/layout.tsx`
- [ ] Top nav bar with logo, "Provider" badge, notification bell, avatar
- [ ] Sidebar with profile card, availability toggle, nav items
- [ ] Active nav item highlighting based on current route
- [ ] Responsive: sidebar collapses on mobile

### F-PDASH-02: Build Availability Toggle
- [ ] `AvailabilityToggle.tsx`
- [ ] Green (on) / gray (off) track with thumb
- [ ] Text updates: "Available" ↔ "Offline"
- [ ] On toggle → `PATCH /api/providers/{id}/availability`

### F-PDASH-03: Build Dashboard Stats Row
- [ ] 4-column responsive grid
- [ ] Fetch from dashboard API
- [ ] Color-coded values (green for earnings, etc.)

### F-PDASH-04: Build Job Request Cards
- [ ] `JobCard.tsx` — reusable across dashboard and my-jobs page
- [ ] Variants: new request (amber border), confirmed, completed
- [ ] New request includes Accept + Decline buttons
- [ ] Accept → `PATCH /api/bookings/{id}/status` → `CONFIRMED`
- [ ] Decline → `PATCH /api/bookings/{id}/status` → `DECLINED`

### F-PDASH-05: Build Profile Summary Section
- [ ] Key-value row list
- [ ] "Edit profile" link → navigate to `/provider/profile`
- [ ] "Change" link on phone → inline edit or modal

### F-PDASH-06: Notification Bell
- [ ] Red dot indicator for unread notifications
- [ ] Click → dropdown or navigate to notifications page
- [ ] Fetch unread count from API

---

## Backend Tasks

### B-PDASH-01: Provider Dashboard Summary
- [ ] `GET /api/provider/dashboard?provider_id={id}`
- [ ] Returns:
```json
{
  "today_jobs": { "total": 3, "pending": 1, "confirmed": 2 },
  "month_earnings": 38400,
  "rating": 4.7,
  "total_reviews": 212,
  "total_completed": 212
}
```
- [ ] Aggregated from `bookings` + `providers` tables
- [ ] Today's jobs: WHERE `provider_id = ?` AND `scheduled_time::date = today`

### B-PDASH-02: List Incoming Requests
- [ ] `GET /api/provider/jobs?provider_id={id}&status=new,confirmed&limit=5`
- [ ] Return recent job requests assigned to this provider
- [ ] Include: customer name, service type, location, time, price, status
- [ ] Sort: new requests first, then by time

### B-PDASH-03: Accept/Decline Job
- [ ] `PATCH /api/bookings/{id}/status`
- [ ] Accept: status → `CONFIRMED`, send notification to customer
- [ ] Decline: status → `DECLINED`, trigger re-assignment or notify customer
- [ ] Validate: only the assigned provider can accept/decline

### B-PDASH-04: Toggle Provider Availability
- [ ] `PATCH /api/providers/{id}/availability`
- [ ] Request: `{ "is_available": true/false }`
- [ ] Update `providers.is_available`
- [ ] Return updated provider object

### B-PDASH-05: Notification Count
- [ ] `GET /api/provider/notifications/count?provider_id={id}`
- [ ] Count unread notifications (new bookings, reviews, payments)
- [ ] Returns: `{ "unread": 3 }`
