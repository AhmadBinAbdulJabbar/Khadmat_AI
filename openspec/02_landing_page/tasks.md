# Landing Page Tasks

## Frontend Tasks

### F-LAND-01: Build Page Layout & Navigation
- Create `app/page.tsx` with full-width layout
- Build sticky navigation bar with logo, links, and CTA
- Add mobile hamburger menu for responsive design

### F-LAND-02: Build Hero Section
- "Powered by Google Antigravity" badge with sparkle animation
- Headline with green accent color on "your language"
- Two CTA buttons linking to `/book` and `/providers`
- Demo input preview with example query text
- Language pills row

### F-LAND-03: Build Stats Bar
- 3-column grid with stat counters
- Static values for MVP (5,000+, 200+, 3 cities)

### F-LAND-04: Build Features Grid
- 6 feature cards in responsive auto-fit grid
- Each card: colored icon container, title, description
- Subtle hover effect on cards

### F-LAND-05: Build How It Works Section
- 4 numbered steps with arrows between them
- Step circles, titles, and descriptions
- Alternative background color for visual separation

### F-LAND-06: Build Services Grid
- 8 service chips in responsive grid
- Each chip: service icon + label
- Click handler → navigate to `/book` with service pre-selected as query param

### F-LAND-07: Build CTA & Footer
- Final call-to-action section with headline + button
- Footer with copyright and link placeholders

---

## Backend Tasks

### B-LAND-01: Stats API (Optional Enhancement)
- `GET /api/stats/overview`
- Returns `{ total_bookings, total_providers, cities_count }`
- Query from `bookings` and `providers` tables
- For MVP: return hardcoded values

### B-LAND-02: Services List API (Optional)
- `GET /api/services`
- Returns list of available service categories
- Query `SELECT DISTINCT category FROM providers`
- Used for dynamic rendering of services grid
