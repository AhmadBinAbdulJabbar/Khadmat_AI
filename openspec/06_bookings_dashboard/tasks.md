# Bookings Dashboard Tasks

## Frontend Tasks

### F-DASH-01: Build Dashboard Layout
- [x] Create `app/dashboard/page.tsx`
- [x] Max-width centered layout (680px)
- [x] Page header with title + "New booking" button
- [x] Protected route — redirect to `/auth` if not logged in

### F-DASH-02: Build Stats Row
- [x] 4-column grid of stat cards
- [x] Fetch counts from API
- [x] Color-coded values: green (confirmed), dark-green (completed), red (cancelled)

### F-DASH-03: Build Filter System
- [x] Filter pill buttons: All, Confirmed, Completed, Cancelled
- [x] Active state toggle (only one active at a time)
- [x] Filter booking list on click (client-side filter or API query param)
- [x] Search box: debounced text search on service name, provider name, booking ref

### F-DASH-04: Build Booking Item Cards
- [x] Card component: `BookingCard.tsx`
- [x] Top row: service name + status pill
- [x] Provider + location subtitle
- [x] Meta row: date, time, price (with icons)
- [x] Booking ref (monospace)
- [x] Action buttons row (varies by status)

### F-DASH-05: Build Action Handlers
- [x] "View receipt" → navigate to `/booking/{id}`
- [x] "Rate provider" → open rating modal or navigate to rating page
- [x] "Cancel" → confirmation dialog → `PATCH /api/bookings/{id}/status` with `CANCELLED`
- [x] "Rebook" / "Book again" → navigate to `/book` with service pre-filled
- [x] "Reminder set" → display only, shows reminder time

### F-DASH-06: Build Pagination
- [x] Client-side pagination (4 items per page)
- [x] Page number buttons with active state
- [x] Previous/next arrows
- [x] "Showing X of Y" text

### F-DASH-07: Empty & Error States
- [x] Empty state illustration + message + CTA button
- [x] API error with retry button
- [x] Loading skeleton cards (3 placeholder cards)

---

## Backend Tasks

### B-DASH-01: List User Bookings
- [x] `GET /api/bookings?user_id={id}&status={filter}&page={n}&limit={n}&search={q}`
- [x] Filter by user_id (from JWT)
- [x] Optional status filter
- [x] Optional text search on `service_type`, `provider_name`, `booking_ref`
- [x] Paginated response:
```json
{
  "bookings": [ ... ],
  "total": 12,
  "page": 1,
  "limit": 4,
  "pages": 3
}
```
- [x] Each booking includes: id, booking_ref, service_type, provider_name, area, city, scheduled_time, status, price_estimate, reminder info

### B-DASH-02: Booking Stats Summary
- [x] `GET /api/bookings/stats?user_id={id}`
- [x] Returns:
```json
{
  "total": 12,
  "confirmed": 3,
  "completed": 8,
  "cancelled": 1,
  "pending": 0
}
```
- [x] Count by status from `bookings` table WHERE `user_id = ?`

### B-DASH-03: Cancel Booking
- [x] `PATCH /api/bookings/{id}/status`
- [x] Request: `{ "status": "CANCELLED" }`
- [x] Validate: only bookings with status = CONFIRMED can be cancelled
- [x] Validate: cancellation is 2+ hours before scheduled time
- [x] Update booking status
- [x] Set provider `is_available = true`
- [x] Delete associated reminder
- [x] Return updated booking

### B-DASH-04: Submit Rating
- [x] `POST /api/bookings/{id}/rate`
- [x] Request: `{ "rating": 5, "review_text": "Great service!" }`
- [x] Only allowed for COMPLETED bookings
- [x] Insert into `reviews` table (new table needed)
- [x] Update provider's average `rating` and increment review count
- [x] Return success
