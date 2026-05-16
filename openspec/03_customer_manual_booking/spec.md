# Customer Manual Booking Page Spec

## Page Route
`/book/manual` → `app/book/manual/page.tsx`

## Purpose
Step-by-step manual booking form for customers who prefer to select their own service, location, date/time, and provider rather than using the AI chat. Requires authentication.

## UI Sections

### Navigation Bar
- Logo + "Khadmat AI"
- User avatar + name + dropdown chevron (authenticated user)

### Layout
- Two-column: Form column (left, wider) + Sidebar (right, 300px)

### Step Progress Bar
4 steps with connecting lines:
1. ✅ Service (done) 
2. 🟢 Details (active) 
3. ⚪ Provider (waiting) 
4. ⚪ Confirm (waiting)

### Step 1: Choose a Service (Grid)
| Service | Icon |
|---|---|
| AC Technician | air-conditioning |
| Plumber | droplet |
| Electrician | plug |
| Tutor | book |
| Cleaner | home |
| Carpenter | tool |
| Painter | brush |
| Security | shield |
- Grid: 4 columns
- Selected state: green border + green background

### Step 2: Location
| Field | Type | Options |
|---|---|---|
| City | select | Islamabad, Karachi, Lahore |
| Area / Sector | select | Dynamic based on city (G-13, G-10, F-8, F-10, DHA...) |
| Street address | text input | Optional |

### Step 3: Date & Time
| Field | Type |
|---|---|
| Date | date picker |
| Preferred time | select (Morning 8AM–12PM, Afternoon 12–4PM, Evening 4–8PM) |
| Time slot grid | 8 slots (8AM–3PM), some marked "busy" |

- Busy slots: strikethrough, gray, non-clickable
- Selected slot: green highlight

### Step 4: Choose a Provider
- Provider list with radio-button selection
- Each row shows: avatar initials, name, rating (⭐), distance (km), total jobs, price range (PKR)
- Selected row: green border + filled radio dot

### Additional Notes
- Textarea for describing the issue

### Sidebar

#### AI Banner
- "Let AI book for you" — click to navigate to `/book` (AI chat)

#### Booking Summary Card
| Field | Value |
|---|---|
| Service | AC Technician |
| Provider | Ali AC Services |
| Date | Thu 21 May |
| Time | 10:00 AM |
| Location | G-13, Islamabad |
| Rating | ⭐ 4.7 |

#### Price Estimate Card
| Line | Amount |
|---|---|
| Service fee | PKR 800–1,500 |
| Platform fee | PKR 50 |
| **Total estimate** | **PKR 850–1,550** |

#### Confirm Button
- "Confirm booking" — primary green button
- Disclaimer: "You can cancel up to 2 hours before the appointment"

## States
- **Step progression**: As user completes each section, step indicator advances
- **Loading providers**: Skeleton cards while fetching
- **No providers found**: Empty state message
- **Confirm loading**: Button shows spinner during API call
- **Success**: Redirect to `/booking/{id}` (receipt page)
