# Browse Providers Tasks

## Frontend Tasks

### F-PROV-01: Build Provider Browse Layout
- [ ] Create `app/providers/page.tsx`
- [ ] Page header, search bar, filter pills, results info, provider grid
- [ ] Responsive layout

### F-PROV-02: Build Search Bar
- [ ] Full-width search input with search icon
- [ ] City dropdown (All cities, Islamabad, Karachi, Lahore)
- [ ] Area dropdown — dynamically populate based on selected city
- [ ] Debounced search (300ms delay)

### F-PROV-03: Build Service Filter Pills
- [ ] Horizontal scrollable row
- [ ] Buttons: All, AC Technician, Plumber, Electrician, Tutor, Cleaner
- [ ] Active state toggle (single selection)
- [ ] On filter change → re-fetch providers

### F-PROV-04: Build Sort Controls
- [ ] Results count text (updates with filter)
- [ ] Sort options: Rating (default), Distance, Price
- [ ] Active sort option highlighted
- [ ] On sort change → re-order provider list

### F-PROV-05: Build Provider Card Component
- [ ] `ProviderCard.tsx` (reusable)
- [ ] Avatar initials with colored background
- [ ] Name, category, area/city
- [ ] Availability badge (green "Available" or gray "Busy")
- [ ] Stats row: rating, distance, jobs count
- [ ] Price range text
- [ ] "Book now" button (or "Unavailable" when busy)
- [ ] "View profile" link
- [ ] Featured variant: green border + "Top rated" tag

### F-PROV-06: Build Provider Grid
- [ ] Responsive CSS grid (auto-fill, minmax 280px)
- [ ] Loading skeleton state (6 placeholder cards)
- [ ] Empty state message for no results

### F-PROV-07: Wire API Integration
- [ ] Fetch on mount: `GET /api/providers`
- [ ] On filter/search/sort change: `GET /api/providers/search?service=&city=&area=&sort=&q=`
- [ ] Client-side fallback sorting if API doesn't support sort param

---

## Backend Tasks

### B-PROV-01: List All Providers
- [ ] `GET /api/providers`
- [ ] Returns all providers from `providers` table
- [ ] Include: id, name, category, area, city, rating, total_jobs, is_available, price_min, price_max
- [ ] Default sort: rating DESC

### B-PROV-02: Search & Filter Providers
- [ ] `GET /api/providers/search`
- [ ] Query params:
  - `service` — filter by category
  - `city` — filter by city
  - `area` — filter by area
  - `q` — text search on name
  - `sort` — `rating` (default), `distance`, `price`
  - `available_only` — boolean, default false
- [ ] Build dynamic query with Supabase filters
- [ ] If sort=distance, calculate haversine distance (requires user lat/lng or area center)
- [ ] Return provider list

### B-PROV-03: Get Provider Detail
- [ ] `GET /api/providers/{id}`
- [ ] Returns full provider profile including:
  - All base fields
  - Reviews summary (avg rating, review count)
  - Service areas list
  - Bio/description
  - Recent reviews (last 3)

### B-PROV-04: Get Distinct Cities & Areas
- [ ] `GET /api/providers/cities` — distinct cities
- [ ] `GET /api/providers/areas?city={city}` — distinct areas for a city
- [ ] Used to populate dropdown filters
