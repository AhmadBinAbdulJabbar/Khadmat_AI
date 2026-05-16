# Browse Providers Page Spec

## Page Route
`/providers` → `app/providers/page.tsx`

## Purpose
Public-facing provider directory where customers can search, filter, and browse all verified service providers. Allows sorting by rating, distance, or price and provides direct booking access.

## UI Sections

### Page Header
- Title: "Browse providers"
- Subtitle: "Find verified service providers across Karachi, Lahore, and Islamabad"

### Search Bar
| Element | Type | Description |
|---|---|---|
| Search input | text | "Search providers by name or service..." (full width, icon) |
| City dropdown | select-box | "All cities" with map-pin icon |
| Area dropdown | select-box | "All areas" with map icon |

### Service Filter Pills
Scrollable row of filter buttons:
All (active), AC Technician, Plumber, Electrician, Tutor, Cleaner — each with icon

### Results Info Row
- Left: "15 providers found"
- Right: Sort by: **Rating** (active) | Distance | Price

### Provider Grid
Responsive auto-fill grid (min 280px per card):

#### Provider Card
| Element | Description |
|---|---|
| Featured tag | "Top rated" badge (only for top provider) |
| Avatar | Initials in colored circle |
| Name | Bold text |
| Category + location | "AC Technician · G-13, Islamabad" |
| Availability badge | "Available" (green) or "Busy" (gray) |
| Stats row | Rating (⭐), Distance (km), Total jobs |
| Price | "PKR 800 – 1,500 per visit" |
| Book now button | Green (enabled) or gray "Unavailable" (disabled for busy) |
| View profile link | "View profile" with external link icon |

#### Featured Card
- Green border (1.5px)
- "Top rated" badge at top

## States
- **Loading**: Skeleton grid of 6 placeholder cards
- **Empty search**: "No providers match your search"
- **Filter active**: Service pill highlighted, grid filtered
- **Sort changed**: Grid re-ordered
- **All providers**: Full list with no filters
