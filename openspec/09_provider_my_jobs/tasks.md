# Provider My Jobs Tasks

## Frontend Tasks

### F-PJOB-01: Build My Jobs Page
- [x] Create `app/provider/jobs/page.tsx`
- [x] Uses shared provider layout (sidebar)
- [x] Page header with title and subtitle

### F-PJOB-02: Build Summary Row
- [x] 3-column stat cards
- [x] Fetch from provider jobs stats API
- [x] Color-coded values (amber for new, green for confirmed)

### F-PJOB-03: Build Filter & Search
- [x] Pill filter buttons with active state toggle
- [x] Search input with debounced customer name search
- [x] On filter/search change → re-fetch or client-side filter

### F-PJOB-04: Build Job Card Component
- [x] Reuse `JobCard.tsx` from dashboard (F-PDASH-04)
- [x] Extended variant with footer row (customer info + actions)
- [x] Status-specific action buttons
- [x] Amber border for "New" requests

### F-PJOB-05: Accept/Decline Handlers
- [x] Accept button → `PATCH /api/bookings/{id}/status` with `CONFIRMED`
- [x] Decline button → confirmation dialog → `PATCH /api/bookings/{id}/status` with `DECLINED`
- [x] Optimistic UI update: change card status immediately
- [x] Rollback on API error

### F-PJOB-06: View Job Details
- [x] "View details" → navigate to job detail page or open modal
- [x] Show: full customer info, service description, notes, booking ref, map

### F-PJOB-07: Request Review
- [x] "Request review" → `POST /api/provider/jobs/{id}/request-review`
- [x] Sends notification to customer
- [x] Button changes to "Review requested" (disabled)

---

## Backend Tasks

### B-PJOB-01: List Provider Jobs
- [x] `GET /api/provider/jobs?provider_id={id}&status={filter}&search={q}`
- [x] Filter by provider_id (from JWT)
- [x] Optional status filter: `new`, `confirmed`, `completed`, `cancelled`
- [x] Optional search on customer name
- [x] Return job list with customer info, service details, price, status
- [x] Sort: new first → confirmed by time → completed by date DESC

### B-PJOB-02: Provider Jobs Stats
- [x] `GET /api/provider/jobs/stats?provider_id={id}`
- [x] Returns:
```json
{
  "new_requests": 2,
  "confirmed_today": 3,
  "total_completed": 212
}
```

### B-PJOB-03: Accept Job
- [x] `PATCH /api/bookings/{id}/status` with `CONFIRMED`
- [x] Validate: provider_id matches booking's assigned provider
- [x] Send push notification / in-app notification to customer
- [x] Update booking status in Supabase

### B-PJOB-04: Decline Job
- [x] `PATCH /api/bookings/{id}/status` with `DECLINED`
- [x] Notify customer that provider declined
- [x] Optionally trigger re-assignment logic (find next best provider)
- [x] Update booking status

### B-PJOB-05: Request Review from Customer
- [x] `POST /api/provider/jobs/{id}/request-review`
- [x] Create notification for customer to leave a review
- [x] Insert into notifications table: `{ user_id: customer_id, type: "review_request", booking_id }`
- [x] Return success
