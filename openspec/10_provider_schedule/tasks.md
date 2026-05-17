# Provider Schedule Tasks

## Frontend Tasks

### F-SCHED-01: Build Schedule Page
- [x] Create `app/provider/schedule/page.tsx`
- [x] Uses shared provider layout
- [x] Page header with week navigation controls

### F-SCHED-02: Build Week Navigation
- [x] Previous/next week buttons
- [x] Display current week range: "19 – 25 May"
- [x] "Today" button → jump to current week
- [x] State management for selected week start date

### F-SCHED-03: Build Calendar Grid
- [x] `WeekCalendar.tsx`
- [x] 8-column grid: time labels + 7 days
- [x] Day headers: day name + number, today highlighted with green circle
- [x] Time rows: 8 AM, 9 AM, 10 AM, 11 AM, 12 PM, 2 PM, 4 PM
- [x] Weekend columns dimmed

### F-SCHED-04: Build Event Blocks
- [x] Color-coded event blocks based on booking status
- [x] Show: service name + customer name (abbreviated)
- [x] Event positioned in correct day + time cell
- [x] Click event → view job detail

### F-SCHED-05: Build Availability Settings
- [x] Day toggle buttons: Mon–Sun
- [x] On state = green background, off = default
- [x] Toggle on click
- [x] Save to API on change

### F-SCHED-06: Wire Calendar Data
- [x] Fetch bookings for selected week: `GET /api/provider/schedule?week_start={date}`
- [x] Map bookings to calendar cells by day + time
- [x] Re-fetch on week change

---

## Backend Tasks

### B-SCHED-01: Get Provider Weekly Schedule
- [x] `GET /api/provider/schedule?provider_id={id}&week_start={date}`
- [x] Return all bookings for the provider within the week (Mon–Sun)
- [x] Each booking includes: id, service_type, customer_name, scheduled_time, status, duration
- [x] Group by day for easier frontend rendering:
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
- [x] `GET /api/provider/settings/working-days?provider_id={id}`
- [x] Returns: `{ "working_days": ["Mon", "Tue", "Wed", "Thu", "Fri"] }`
- [x] `PATCH /api/provider/settings/working-days`
- [x] Request: `{ "working_days": ["Mon", "Tue", "Wed", "Thu", "Fri"] }`
- [x] Update in provider profile / settings

### B-SCHED-03: Block Time Slot
- [x] `POST /api/provider/schedule/block`
- [x] Request: `{ "provider_id", "date", "time_start", "time_end", "reason"? }`
- [x] Insert into schedule_blocks table
- [x] Return confirmation

### B-SCHED-04: Check Schedule Conflicts
- [x] Utility function used during booking creation
- [x] Check if the provider has any existing booking at the requested time
- [x] Consider working days and blocked times
- [x] Return: `{ "available": true/false, "conflict_reason"?: "..." }`
