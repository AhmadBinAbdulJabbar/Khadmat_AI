# Customer Manual Booking Tasks

## Frontend Tasks

### F-MBOOK-01: Build Page Layout
- Two-column layout: form (left) + sidebar (right, 300px)
- Navigation bar with authenticated user display
- Step progress bar component

### F-MBOOK-02: Build Service Selection Grid
- 4-column grid of service cards
- Selectable cards with green highlight state
- Store selected service in form state

### F-MBOOK-03: Build Location Form
- City dropdown (Islamabad, Karachi, Lahore)
- Area dropdown — dynamically filter options based on selected city
- Optional street address text input

### F-MBOOK-04: Build Date & Time Picker
- Date input field
- Preferred time dropdown
- Time slot grid (8 slots)
- Busy slot detection — mark unavailable times (from API)
- Selected slot highlighting

### F-MBOOK-05: Build Provider Selection List
- Fetch providers from API based on service + area
- Render provider rows: avatar, name, rating, distance, jobs, price
- Radio-button selection pattern
- Sort by relevance (distance + rating)

### F-MBOOK-06: Build Sidebar Components
- AI booking banner (link to `/book`)
- Booking summary card — updates reactively as user fills form
- Price estimate card — calculates from selected provider's min/max price + platform fee
- Confirm booking button

### F-MBOOK-07: Step Validation & Navigation
- Validate each step before allowing progression
- Step indicator updates (done → active → waiting)
- Scroll to next section on completion

### F-MBOOK-08: Submit Booking
- Collect all form data
- Call `POST /api/bookings` with form payload
- Handle loading + error states
- On success → redirect to `/booking/{booking_id}`

---

## Backend Tasks

### B-MBOOK-01: Area Lookup API
- `GET /api/areas?city={city}`
- Returns list of areas/sectors for the given city
- Query distinct `area` from `providers` WHERE `city = ?`

### B-MBOOK-02: Provider Search API
- `GET /api/providers/search?service={category}&area={area}&city={city}`
- Filter by: `category`, `area`, `city`, `is_available = true`
- Calculate distance using haversine (if user lat/lng provided)
- Return: `id, name, category, area, city, rating, total_jobs, is_available, price_min, price_max, distance`
- Sort by distance then rating

### B-MBOOK-03: Time Slot Availability API
- `GET /api/providers/{id}/slots?date={date}`
- Check existing bookings for the provider on the given date
- Return list of time slots with `available: true/false`
- Busy slots = times that have confirmed bookings

### B-MBOOK-04: Create Booking Endpoint
- `POST /api/bookings`
- Request body:
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
- Generate booking ref: `BK-{YYYYMMDD}-{random 3 digits}`
- Insert into `bookings` table
- Update provider `is_available = false` (if single-booking model)
- Calculate price estimate from provider's min/max
- Return: booking object with `id`, `booking_ref`, `status: CONFIRMED`

### B-MBOOK-05: Schedule Reminder
- After booking creation, automatically create reminder
- `POST /api/reminders` (called internally)
- Set `trigger_at` = `scheduled_time - 1 hour`
- Insert into `reminders` table
- Return reminder confirmation

### B-MBOOK-06: Platform Fee Calculation
- Utility function: `calculate_price_estimate(provider_id)`
- Returns: `{ service_fee_min, service_fee_max, platform_fee, total_min, total_max }`
- Platform fee: fixed PKR 50 for MVP
