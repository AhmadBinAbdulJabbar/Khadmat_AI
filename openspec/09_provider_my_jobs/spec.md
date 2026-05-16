# Provider My Jobs Page Spec

## Page Route
`/provider/jobs` → `app/provider/jobs/page.tsx`

## Purpose
Comprehensive job management page where providers can view all their assigned service requests, filter by status, search by customer, and take action (accept, decline, view details, request review).

## UI Sections

### Sidebar (shared provider layout)
- Dark background (#1a1a1a)
- Profile card: avatar, name, category, availability toggle
- Nav items — "My jobs" highlighted with badge count (e.g., "4")

### Summary Row (3 columns)
| Stat | Value | Color |
|---|---|---|
| New requests | 2 | amber |
| Confirmed today | 3 | green |
| Total completed | 212 | default |

### Filter Row
- Pill buttons: All (active), New, Confirmed, Completed, Cancelled
- Search box: "Search by customer..."

### Job List
Each job card includes:

#### Top Row
- Service icon in colored circle
- Job title + status pill (New/Confirmed/Completed/Cancelled)
- Location + time meta
- Price + date (right-aligned)

#### Footer Row (with border-top separator)
- Customer info: avatar initials + name + phone (masked: 0300-xxx-xxxx)
- Action buttons vary by status:

| Status | Actions |
|---|---|
| New (amber highlight) | ✅ Accept + Decline |
| Confirmed | View details |
| Completed | View + Request review |
| Cancelled | — |

### Status Pill Colors
| Status | Background | Text |
|---|---|---|
| New | #FAEEDA | #633806 |
| Confirmed | #E1F5EE | #085041 |
| Completed | #EAF3DE | #27500A |
| Cancelled | #FCEBEB | #791F1F |

## States
- **Loading**: Skeleton job cards
- **Empty**: "No jobs found for this filter"
- **New request highlight**: Card has amber border (1.5px)
- **After accept**: Card transitions from "New" to "Confirmed" (animate)
