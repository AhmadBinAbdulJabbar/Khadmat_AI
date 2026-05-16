# Landing Page Tasks

## Frontend Tasks

### F-LAND-01: Build Page Layout & Navigation
- [x] Create `app/page.tsx` with full-width layout
- [x] Build sticky navigation bar with logo, links, and CTA
- [x] Add mobile hamburger menu for responsive design

### F-LAND-02: Build Hero Section
- [x] "Powered by Google Antigravity" badge with sparkle animation
- [x] Headline with green accent color on "your language"
- [x] Two CTA buttons linking to `/book` and `/providers`
- [x] Demo input preview with example query text
- [x] Language pills row

### F-LAND-03: Build Stats Bar
- [x] 3-column grid with stat counters
- [x] Static values for MVP (5,000+, 200+, 3 cities)

### F-LAND-04: Build Features Grid
- [x] 6 feature cards in responsive auto-fit grid
- [x] Each card: colored icon container, title, description
- [x] Subtle hover effect on cards

### F-LAND-05: Build How It Works Section
- [x] 4 numbered steps with arrows between them
- [x] Step circles, titles, and descriptions
- [x] Alternative background color for visual separation

### F-LAND-06: Build Services Grid
- [x] 8 service chips in responsive grid
- [x] Each chip: service icon + label
- [x] Click handler → navigate to `/book` with service pre-selected as query param

### F-LAND-07: Build CTA & Footer
- [x] Final call-to-action section with headline + button
- [x] Footer with copyright and link placeholders

---

## Backend Tasks

### B-LAND-01: Stats API (Optional Enhancement)
- [x] `GET /api/stats/overview`
- [x] Returns `{ total_bookings, total_providers, cities_count }`
- [x] Query from `bookings` and `providers` tables
- [x] For MVP: return hardcoded values

### B-LAND-02: Services List API (Optional)
- [x] `GET /api/services`
- [x] Returns list of available service categories
- [x] Query `SELECT DISTINCT category FROM providers`
- [x] Used for dynamic rendering of services grid
