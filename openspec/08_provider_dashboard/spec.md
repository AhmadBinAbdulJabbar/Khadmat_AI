# Provider Dashboard Page Spec

## Page Route
`/provider/dashboard` → `app/provider/dashboard/page.tsx`

## Purpose
Main landing page for service providers after login. Shows today's stats (jobs, earnings, rating), incoming job requests with accept/decline actions, and a quick profile summary. Uses a persistent sidebar navigation for all provider pages.

## UI Sections

### Top Navigation Bar
- Logo: K badge + "Khadmat AI" + "Provider" badge (green pill)
- Right: notification bell (with red dot for unread), avatar, provider name

### Sidebar (Persistent across all provider pages)
#### Profile Card
- Avatar (44px, circle)
- Name: "Ali AC Services"
- Category + area: "AC Technician · G-13, Islamabad"
- Availability toggle: green track + "Available" / "Offline" text

#### Navigation Items
| Section | Items | Icon |
|---|---|---|
| Main | Dashboard (active), My jobs, Schedule, Earnings | layout-dashboard, calendar, clock, currency-rupee |
| Account | Profile, Reviews, Settings | user, star, settings |

### Main Content

#### Stats Row (4 columns)
| Stat | Value | Sub-label |
|---|---|---|
| Today's jobs | 3 | 1 pending · 2 confirmed |
| This month (PKR) | 38,400 | PKR earned |
| Rating | 4.7 | from 212 reviews |
| Completed | 212 | total jobs |

#### Incoming Requests Section
- Section header: "Incoming requests" + "See all" link

##### New Request Card (highlighted with amber border)
- Service icon in amber circle
- "AC service request" + "New" status pill (amber)
- Meta: customer name, location, time
- Action buttons: "Accept" (green) + "Decline" (outline)
- Estimated price

##### Confirmed Job Card
- Service icon in green circle
- "AC gas refill" + "Confirmed" pill (green)
- Meta: customer name, location, time
- Price

##### Completed Job Card
- Service icon in green-light circle
- "AC installation" + "Completed" pill
- Meta: customer name, location, time
- Price (green = paid)

#### My Profile Section
- Section header: "My profile" + "Edit profile" link
- Key-value rows:

| Field | Value |
|---|---|
| Profession | AC Technician |
| Experience | 7 years |
| Price range | PKR 800–1,500 |
| Service areas | G-13, G-10, F-10 |
| Phone | 0300-1234567 (with "change" link) |
| Availability | ✅ Online now (green) |

## States
- **Loading**: Skeleton stats + skeleton job rows
- **No incoming requests**: "No new requests right now. You'll be notified!"
- **Offline**: Toggle switched off, status shows "Offline", stats still visible
- **New notification**: Red dot on bell icon
