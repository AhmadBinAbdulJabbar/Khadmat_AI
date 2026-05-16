# Browse Providers Tasks

## Frontend Tasks

### F-PROV-01: Build Provider Browse Layout
- [x] Create `app/providers/page.tsx`
- [x] Page header, search bar, filter pills, results info, provider grid
- [x] Responsive layout

### F-PROV-02: Build Search Bar
- [x] Full-width search input with search icon
- [x] City dropdown (All cities, Islamabad, Karachi, Lahore)
- [x] Area dropdown — dynamically populate based on selected city
- [x] Debounced search (300ms delay)

### F-PROV-03: Build Service Filter Pills
- [x] Horizontal scrollable row
- [x] Buttons: All, AC Technician, Plumber, Electrician, Tutor, Cleaner
- [x] Active state toggle (single selection)
- [x] On filter change → re-fetch providers

### F-PROV-04: Build Sort Controls
- [x] Results count text (updates with filter)
- [x] Sort options: Rating (default), Distance, Price
- [x] Active sort option highlighted
- [x] On sort change → re-order provider list

### F-PROV-05: Build Provider Card Component
- [x] `ProviderCard.tsx` (reusable)
- [x] Avatar initials with colored background
- [x] Name, category, area/city
- [x] Availability badge (green "Available" or gray "Busy")
- [x] Stats row: rating, distance, jobs count
- [x] Price range text
- [x] "Book now" button (or "Unavailable" when busy)
- [x] "View profile" link
- [x] Featured variant: green border + "Top rated" tag

### F-PROV-06: Build Provider Grid
- [x] Responsive CSS grid (auto-fill, minmax 280px)
- [x] Loading skeleton state (6 placeholder cards)
- [x] Empty state message for no results

### F-PROV-07: Wire API Integration
- [x] Fetch on mount: `GET /api/providers`
- [x] On filter/search/sort change: `GET /api/providers/search?service=&city=&area=&sort=&q=`
- [x] Client-side fallback sorting if API doesn't support sort param

---

## Backend Tasks

### B-PROV-01: List All Providers
- [x] `GET /api/providers`
- [x] Returns all providers from `providers` table
- [x] Include: id, name, category, area, city, rating, total_jobs, is_available, price_min, price_max
- [x] Default sort: rating DESC

### B-PROV-02: Search & Filter Providers
- [x] `GET /api/providers/search`
- [x] Query params:
  - `service` — filter by category
  - `city` — filter by city
  - `area` — filter by area
  - `q` — text search on name
  - `sort` — `rating` (default), `distance`, `price`
  - `available_only` — boolean, default false
- [x] Build dynamic query with Supabase filters
- [x] If sort=distance, calculate haversine distance (requires user lat/lng or area center)
- [x] Return provider list

### B-PROV-03: Get Provider Detail
- [x] `GET /api/providers/{id}`
- [x] Returns full provider profile including:
  - All base fields
  - Reviews summary (avg rating, review count)
  - Service areas list
  - Bio/description
  - Recent reviews (last 3)

### B-PROV-04: Get Distinct Cities & Areas
- [x] `GET /api/providers/cities` — distinct cities
- [x] `GET /api/providers/areas?city={city}` — distinct areas for a city
- [x] Used to populate dropdown filters
