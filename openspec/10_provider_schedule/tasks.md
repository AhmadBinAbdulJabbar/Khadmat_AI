# Provider Schedule Tasks

## Frontend Tasks

### F-SCHED-01: Build Schedule Page
- [ ] Create `app/provider/schedule/page.tsx`
- [ ] Uses shared provider layout
- [ ] Page header with week navigation controls

### F-SCHED-02: Build Week Navigation
- [ ] Previous/next week buttons
- [ ] Display current week range: "19 – 25 May"
- [ ] "Today" button → jump to current week
- [ ] State management for selected week start date

### F-SCHED-03: Build Calendar Grid
- [ ] `WeekCalendar.tsx`
- [ ] 8-column grid: time labels + 7 days
- [ ] Day headers: day name + number, today highlighted with green circle
- [ ] Time rows: 8 AM, 9 AM, 10 AM, 11 AM, 12 PM, 2 PM, 4 PM
- [ ] Weekend columns dimmed

### F-SCHED-04: Build Event Blocks
- [ ] Color-coded event blocks based on booking status
- [ ] Show: service name + customer name (abbreviated)
- [ ] Event positioned in correct day + time cell
- [ ] Click event → view job detail

### F-SCHED-05: Build Availability Settings
- [ ] Day toggle buttons: Mon–Sun
- [ ] On state = green background, off = default
- [ ] Toggle on click
- [ ] Save to API on change

### F-SCHED-06: Wire Calendar Data
- [ ] Fetch bookings for selected week: `GET /api/provider/schedule?week_start={date}`
- [ ] Map bookings to calendar cells by day + time
- [ ] Re-fetch on week change

---

## Backend Tasks

### B-SCHED-01: Get Provider Weekly Schedule
- [ ] `GET /api/provider/schedule?provider_id={id}&week_start={date}`
- [ ] Return all bookings for the provider within the week (Mon–Sun)
- [ ] Each booking includes: id, service_type, customer_name, scheduled_time, status, duration
- [ ] Group by day for easier frontend rendering:
```json
{
  "week_start": "2026-05-19",
  "days": {
    "2026-05-19": [ { "time": "09:00", "service": "AC repair", "status": "completed", ... } ],
    "2026-05-21": [ { "time": "08:00", ... }, { "time": "10:00", ... } ]
  }
}
```

### B-SCHED-02: Get/Set Working Days
- [ ] `GET /api/provider/settings/working-days?provider_id={id}`
- [ ] Returns: `{ "working_days": ["Mon", "Tue", "Wed", "Thu", "Fri"] }`
- [ ] `PATCH /api/provider/settings/working-days`
- [ ] Request: `{ "working_days": ["Mon", "Tue", "Wed", "Thu", "Fri"] }`
- [ ] Update in provider profile / settings

### B-SCHED-03: Block Time Slot
- [ ] `POST /api/provider/schedule/block`
- [ ] Request: `{ "provider_id", "date", "time_start", "time_end", "reason"? }`
- [ ] Insert into schedule_blocks table
- [ ] Return confirmation

### B-SCHED-04: Check Schedule Conflicts
- [ ] Utility function used during booking creation
- [ ] Check if the provider has any existing booking at the requested time
- [ ] Consider working days and blocked times
- [ ] Return: `{ "available": true/false, "conflict_reason"?: "..." }`
