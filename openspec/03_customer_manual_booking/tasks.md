# Customer Manual Booking Tasks

## Frontend Tasks

### F-MBOOK-01: Build Page Layout
- [x] Two-column layout: form (left) + sidebar (right, 300px)
- [x] Navigation bar with authenticated user display
- [x] Step progress bar component

### F-MBOOK-02: Build Service Selection Grid
- [x] 4-column grid of service cards
- [x] Selectable cards with green highlight state
- [x] Store selected service in form state

### F-MBOOK-03: Build Location Form
- [x] City dropdown (Islamabad, Karachi, Lahore)
- [x] Area dropdown — dynamically filter options based on selected city
- [x] Optional street address text input

### F-MBOOK-04: Build Date & Time Picker
- [x] Date input field
- [x] Preferred time dropdown
- [x] Time slot grid (8 slots)
- [x] Busy slot detection — mark unavailable times (from API)
- [x] Selected slot highlighting

### F-MBOOK-05: Build Provider Selection List
- [x] Fetch providers from API based on service + area
- [x] Render provider rows: avatar, name, rating, distance, jobs, price
- [x] Radio-button selection pattern
- [x] Sort by relevance (distance + rating)

### F-MBOOK-06: Build Sidebar Components
- [x] AI booking banner (link to `/book`)
- [x] Booking summary card — updates reactively as user fills form
- [x] Price estimate card — calculates from selected provider's min/max price + platform fee
- [x] Confirm booking button

### F-MBOOK-07: Step Validation & Navigation
- [x] Validate each step before allowing progression
- [x] Step indicator updates (done → active → waiting)
- [x] Scroll to next section on completion

### F-MBOOK-08: Submit Booking
- [x] Collect all form data
- [x] Call `POST /api/bookings` with form payload
- [x] Handle loading + error states
- [x] On success → redirect to `/booking/{booking_id}`

---

## Backend Tasks

### B-MBOOK-01: Area Lookup API
- [x] `GET /api/areas?city={city}`
- [x] Returns list of areas/sectors for the given city
- [x] Query distinct `area` from `providers` WHERE `city = ?`

### B-MBOOK-02: Provider Search API
- [x] `GET /api/providers/search?service={category}&area={area}&city={city}`
- [x] Filter by: `category`, `area`, `city`, `is_available = true`
- [x] Calculate distance using haversine (if user lat/lng provided)
- [x] Return: `id, name, category, area, city, rating, total_jobs, is_available, price_min, price_max, distance`
- [x] Sort by distance then rating

### B-MBOOK-03: Time Slot Availability API
- [x] `GET /api/providers/{id}/slots?date={date}`
- [x] Check existing bookings for the provider on the given date
- [x] Return list of time slots with `available: true/false`
- [x] Busy slots = times that have confirmed bookings

### B-MBOOK-04: Create Booking Endpoint
- [x] `POST /api/bookings`
- [x] Request body:
```json
{
  "user_id": "uuid",
  "service_type": "AC Technician",
  "provider_id": "uuid",
  "area": "G-13",
  "city": "Islamabad",
  "address": "House 12, Street 4",
  "scheduled_date": "2026-05-21",
  "scheduled_time": "10:00",
  "notes": "AC not cooling"
}
```
- [x] Generate booking ref: `BK-{YYYYMMDD}-{random 3 digits}`
- [x] Insert into `bookings` table
- [x] Update provider `is_available = false` (if single-booking model)
- [x] Calculate price estimate from provider's min/max
- [x] Return: booking object with `id`, `booking_ref`, `status: CONFIRMED`

### B-MBOOK-05: Schedule Reminder
- [x] After booking creation, automatically create reminder
- [x] `POST /api/reminders` (called internally)
- [x] Set `trigger_at` = `scheduled_time - 1 hour`
- [x] Insert into `reminders` table
- [x] Return reminder confirmation

### B-MBOOK-06: Platform Fee Calculation
- [x] Utility function: `calculate_price_estimate(provider_id)`
- [x] Returns: `{ service_fee_min, service_fee_max, platform_fee, total_min, total_max }`
- [x] Platform fee: fixed PKR 50 for MVP
