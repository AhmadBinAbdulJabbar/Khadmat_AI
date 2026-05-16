# Provider My Jobs Tasks

## Frontend Tasks

### F-PJOB-01: Build My Jobs Page
- Create `app/provider/jobs/page.tsx`
- Uses shared provider layout (sidebar)
- Page header with title and subtitle

### F-PJOB-02: Build Summary Row
- 3-column stat cards
- Fetch from provider jobs stats API
- Color-coded values (amber for new, green for confirmed)

### F-PJOB-03: Build Filter & Search
- Pill filter buttons with active state toggle
- Search input with debounced customer name search
- On filter/search change → re-fetch or client-side filter

### F-PJOB-04: Build Job Card Component
- Reuse `JobCard.tsx` from dashboard (F-PDASH-04)
- Extended variant with footer row (customer info + actions)
- Status-specific action buttons
- Amber border for "New" requests

### F-PJOB-05: Accept/Decline Handlers
- Accept button → `PATCH /api/bookings/{id}/status` with `CONFIRMED`
- Decline button → confirmation dialog → `PATCH /api/bookings/{id}/status` with `DECLINED`
- Optimistic UI update: change card status immediately
- Rollback on API error

### F-PJOB-06: View Job Details
- "View details" → navigate to job detail page or open modal
- Show: full customer info, service description, notes, booking ref, map

### F-PJOB-07: Request Review
- "Request review" → `POST /api/provider/jobs/{id}/request-review`
- Sends notification to customer
- Button changes to "Review requested" (disabled)

---

## Backend Tasks

### B-PJOB-01: List Provider Jobs
- `GET /api/provider/jobs?provider_id={id}&status={filter}&search={q}`
- Filter by provider_id (from JWT)
- Optional status filter: `new`, `confirmed`, `completed`, `cancelled`
- Optional search on customer name
- Return job list with customer info, service details, price, status
- Sort: new first → confirmed by time → completed by date DESC

### B-PJOB-02: Provider Jobs Stats
- `GET /api/provider/jobs/stats?provider_id={id}`
- Returns:
```json
{
  "new_requests": 2,
  "confirmed_today": 3,
  "total_completed": 212
}
```

### B-PJOB-03: Accept Job
- `PATCH /api/bookings/{id}/status` with `CONFIRMED`
- Validate: provider_id matches booking's assigned provider
- Send push notification / in-app notification to customer
- Update booking status in Supabase

### B-PJOB-04: Decline Job
- `PATCH /api/bookings/{id}/status` with `DECLINED`
- Notify customer that provider declined
- Optionally trigger re-assignment logic (find next best provider)
- Update booking status

### B-PJOB-05: Request Review from Customer
- `POST /api/provider/jobs/{id}/request-review`
- Create notification for customer to leave a review
- Insert into notifications table: `{ user_id: customer_id, type: "review_request", booking_id }`
- Return success
