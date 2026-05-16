# Bookings Dashboard Tasks

## Frontend Tasks

### F-DASH-01: Build Dashboard Layout
- [ ] Create `app/dashboard/page.tsx`
- [ ] Max-width centered layout (680px)
- [ ] Page header with title + "New booking" button
- [ ] Protected route — redirect to `/auth` if not logged in

### F-DASH-02: Build Stats Row
- [ ] 4-column grid of stat cards
- [ ] Fetch counts from API
- [ ] Color-coded values: green (confirmed), dark-green (completed), red (cancelled)

### F-DASH-03: Build Filter System
- [ ] Filter pill buttons: All, Confirmed, Completed, Cancelled
- [ ] Active state toggle (only one active at a time)
- [ ] Filter booking list on click (client-side filter or API query param)
- [ ] Search box: debounced text search on service name, provider name, booking ref

### F-DASH-04: Build Booking Item Cards
- [ ] Card component: `BookingCard.tsx`
- [ ] Top row: service name + status pill
- [ ] Provider + location subtitle
- [ ] Meta row: date, time, price (with icons)
- [ ] Booking ref (monospace)
- [ ] Action buttons row (varies by status)

### F-DASH-05: Build Action Handlers
- [ ] "View receipt" → navigate to `/booking/{id}`
- [ ] "Rate provider" → open rating modal or navigate to rating page
- [ ] "Cancel" → confirmation dialog → `PATCH /api/bookings/{id}/status` with `CANCELLED`
- [ ] "Rebook" / "Book again" → navigate to `/book` with service pre-filled
- [ ] "Reminder set" → display only, shows reminder time

### F-DASH-06: Build Pagination
- [ ] Client-side pagination (4 items per page)
- [ ] Page number buttons with active state
- [ ] Previous/next arrows
- [ ] "Showing X of Y" text

### F-DASH-07: Empty & Error States
- [ ] Empty state illustration + message + CTA button
- [ ] API error with retry button
- [ ] Loading skeleton cards (3 placeholder cards)

---

## Backend Tasks

### B-DASH-01: List User Bookings
- [ ] `GET /api/bookings?user_id={id}&status={filter}&page={n}&limit={n}&search={q}`
- [ ] Filter by user_id (from JWT)
- [ ] Optional status filter
- [ ] Optional text search on `service_type`, `provider_name`, `booking_ref`
- [ ] Paginated response:
```json
{
  "bookings": [ ... ],
  "total": 12,
  "page": 1,
  "limit": 4,
  "pages": 3
}
```
- [ ] Each booking includes: id, booking_ref, service_type, provider_name, area, city, scheduled_time, status, price_estimate, reminder info

### B-DASH-02: Booking Stats Summary
- [ ] `GET /api/bookings/stats?user_id={id}`
- [ ] Returns:
```json
{
  "total": 12,
  "confirmed": 3,
  "completed": 8,
  "cancelled": 1,
  "pending": 0
}
```
- [ ] Count by status from `bookings` table WHERE `user_id = ?`

### B-DASH-03: Cancel Booking
- [ ] `PATCH /api/bookings/{id}/status`
- [ ] Request: `{ "status": "CANCELLED" }`
- [ ] Validate: only bookings with status = CONFIRMED can be cancelled
- [ ] Validate: cancellation is 2+ hours before scheduled time
- [ ] Update booking status
- [ ] Set provider `is_available = true`
- [ ] Delete associated reminder
- [ ] Return updated booking

### B-DASH-04: Submit Rating
- [ ] `POST /api/bookings/{id}/rate`
- [ ] Request: `{ "rating": 5, "review_text": "Great service!" }`
- [ ] Only allowed for COMPLETED bookings
- [ ] Insert into `reviews` table (new table needed)
- [ ] Update provider's average `rating` and increment review count
- [ ] Return success
