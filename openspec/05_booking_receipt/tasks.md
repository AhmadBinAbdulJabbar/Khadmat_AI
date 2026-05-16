# Booking Receipt Tasks

## Frontend Tasks

### F-RCPT-01: Build Receipt Page Layout
- [ ] Create `app/booking/[id]/page.tsx`
- [ ] Dynamic route using booking ID
- [ ] Breadcrumb navigation
- [ ] Max-width centered layout (640px)

### F-RCPT-02: Build Success Banner
- [ ] Green circle checkmark icon
- [ ] Dynamic text: provider name, date/time, reminder time
- [ ] Fetch booking data from API on mount

### F-RCPT-03: Build Receipt Card Component
- [ ] `BookingReceipt.tsx` — full-page version
- [ ] Receipt header: title + booking ref (monospace)
- [ ] Row items: Service, Date & time, Location, Price, Status
- [ ] Status pill component (confirmed/completed/cancelled)

### F-RCPT-04: Build Provider Card
- [ ] Provider avatar with initials
- [ ] Name, category, location
- [ ] 3-column stats grid: rating, distance, contact

### F-RCPT-05: Build State Change Card
- [ ] `StateChangeBadge.tsx`
- [ ] Two-column layout: BEFORE → AFTER
- [ ] Each column shows field key (mono) + value
- [ ] "After" values highlighted in green
- [ ] Arrow icon between columns

### F-RCPT-06: Build Reminder Card
- [ ] Bell icon in amber circle
- [ ] Reminder title + scheduled time
- [ ] Time badge pill

### F-RCPT-07: Build Action Buttons
- [ ] "View my bookings" → `/dashboard`
- [ ] "Book another service" → `/book`
- [ ] "Download receipt" → trigger PDF generation

### F-RCPT-08: Download Receipt as PDF
- [ ] Client-side PDF generation (using `html2canvas` + `jsPDF` or similar)
- [ ] Capture receipt card as image → embed in PDF
- [ ] Download with filename: `Khadmat_AI_Receipt_{booking_ref}.pdf`

---

## Backend Tasks

### B-RCPT-01: Get Booking by ID
- [ ] `GET /api/bookings/{id}`
- [ ] Join with `providers` table to get provider details
- [ ] Join with `reminders` table to get reminder info
- [ ] Return:
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
- [ ] `PATCH /api/bookings/{id}/status`
- [ ] Request: `{ "status": "COMPLETED" | "CANCELLED" }`
- [ ] Update `bookings.status`
- [ ] If cancelled → set provider `is_available = true`
- [ ] Return updated booking

### B-RCPT-03: Store State Change Log
- [ ] During booking creation (B-MBOOK-04), capture before/after state
- [ ] Store in booking record or separate `state_changes` column (JSONB)
- [ ] Return with booking details for receipt display
