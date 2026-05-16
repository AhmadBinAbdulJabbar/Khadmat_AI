# Booking Receipt Tasks

## Frontend Tasks

### F-RCPT-01: Build Receipt Page Layout
- [x] Create `app/booking/[id]/page.tsx`
- [x] Dynamic route using booking ID
- [x] Breadcrumb navigation
- [x] Max-width centered layout (640px)

### F-RCPT-02: Build Success Banner
- [x] Green circle checkmark icon
- [x] Dynamic text: provider name, date/time, reminder time
- [x] Fetch booking data from API on mount

### F-RCPT-03: Build Receipt Card Component
- [x] `BookingReceipt.tsx` — full-page version
- [x] Receipt header: title + booking ref (monospace)
- [x] Row items: Service, Date & time, Location, Price, Status
- [x] Status pill component (confirmed/completed/cancelled)

### F-RCPT-04: Build Provider Card
- [x] Provider avatar with initials
- [x] Name, category, location
- [x] 3-column stats grid: rating, distance, contact

### F-RCPT-05: Build State Change Card
- [x] `StateChangeBadge.tsx`
- [x] Two-column layout: BEFORE → AFTER
- [x] Each column shows field key (mono) + value
- [x] "After" values highlighted in green
- [x] Arrow icon between columns

### F-RCPT-06: Build Reminder Card
- [x] Bell icon in amber circle
- [x] Reminder title + scheduled time
- [x] Time badge pill

### F-RCPT-07: Build Action Buttons
- [x] "View my bookings" → `/dashboard`
- [x] "Book another service" → `/book`
- [x] "Download receipt" → trigger PDF generation

### F-RCPT-08: Download Receipt as PDF
- [x] Client-side PDF generation (using `html2canvas` + `jsPDF` or similar)
- [x] Capture receipt card as image → embed in PDF
- [x] Download with filename: `Khadmat_AI_Receipt_{booking_ref}.pdf`

---

## Backend Tasks

### B-RCPT-01: Get Booking by ID
- [x] `GET /api/bookings/{id}`
- [x] Join with `providers` table to get provider details
- [x] Join with `reminders` table to get reminder info
- [x] Return:
```json
{
  "id": "uuid",
  "booking_ref": "BK-20250521-001",
  "service_type": "AC Technician",
  "provider": {
    "id": "uuid",
    "name": "Ali AC Services",
    "category": "AC Technician",
    "area": "G-13",
    "city": "Islamabad",
    "rating": 4.7,
    "phone": "0300-1234567",
    "distance": 2.1
  },
  "scheduled_time": "2026-05-21T10:00:00",
  "area": "G-13",
  "status": "CONFIRMED",
  "price_estimate": "PKR 800 – 1,500",
  "state_change": {
    "before": { "is_available": true, "booking_ref": null, "status": null },
    "after": { "is_available": false, "booking_ref": "BK-20250521-001", "status": "CONFIRMED" }
  },
  "reminder": {
    "trigger_at": "2026-05-21T09:00:00",
    "message": "Your AC technician appointment is in 1 hour"
  },
  "created_at": "2026-05-20T..."
}
```

### B-RCPT-02: Update Booking Status
- [x] `PATCH /api/bookings/{id}/status`
- [x] Request: `{ "status": "COMPLETED" | "CANCELLED" }`
- [x] Update `bookings.status`
- [x] If cancelled → set provider `is_available = true`
- [x] Return updated booking

### B-RCPT-03: Store State Change Log
- [x] During booking creation (B-MBOOK-04), capture before/after state
- [x] Store in booking record or separate `state_changes` column (JSONB)
- [x] Return with booking details for receipt display
