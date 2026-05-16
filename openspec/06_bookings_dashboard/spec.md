# Bookings Dashboard Page Spec

## Page Route
`/dashboard` → `app/dashboard/page.tsx`

## Purpose
Customer's central hub for viewing all their past and upcoming bookings. Provides filtering, search, status stats, and quick actions (view receipt, rate, cancel, rebook).

## UI Sections

### Page Header
- Title: "My bookings"
- Subtitle: "All your service bookings in one place"
- "New booking" button (green, primary) → navigates to `/book`

### Stats Row (4 columns)
| Stat | Value | Color |
|---|---|---|
| Total bookings | 12 | default |
| Confirmed | 3 | green |
| Completed | 8 | green-dark |
| Cancelled | 1 | red |

### Filter Row
- Pill buttons: All (active), Confirmed, Completed, Cancelled
- Search box: icon + text input "Search bookings..."

### Booking List
Each booking item card:
| Element | Details |
|---|---|
| Service name | e.g., "AC Technician" (bold) |
| Provider + location | "Ali AC Services · G-13, Islamabad" |
| Status pill | Confirmed (green) / Completed (green-dark) / Cancelled (red) / Pending (amber) |
| Meta row | Date icon + date, Clock icon + time, Rupee icon + price |
| Booking ref | Monospace, gray: `BK-20250521-001` |
| Actions row | View receipt, Reminder info / Rate provider / Cancel / Rebook |

#### Action variants by status:
| Status | Actions |
|---|---|
| Confirmed | View receipt, Reminder set time, Cancel (red) |
| Completed | View receipt, Rate provider, Book again |
| Cancelled | Rebook |
| Pending | View details, Cancel |

### Pagination
- "Showing X of Y bookings"
- Page buttons: ← 1 2 3 →
- Active page highlighted in green

## States
- **Loading**: Skeleton card list
- **Empty**: "No bookings yet. Book your first service!"
- **Filtered empty**: "No {status} bookings found"
- **Error**: API error message with retry
