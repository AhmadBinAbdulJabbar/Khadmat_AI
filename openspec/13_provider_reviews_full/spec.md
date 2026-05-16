# Provider Reviews (Full) Page Spec

## Page Route
`/provider/reviews` → `app/provider/reviews/page.tsx`

## Purpose
Dedicated full reviews management page where providers can see their complete rating overview, filter reviews by star rating, sort by date, read detailed customer feedback with tags, and reply to reviews. Separate from the profile tab for deeper review management.

## UI Sections

### Page Header
- Title: "Reviews"
- Subtitle: "What your customers say about your work"

### Rating Overview (2-column)
- **Left**: Large rating (4.7), 5 stars, "212 total reviews", "Top 5% of providers" badge
- **Right**: Star distribution bars (5★ to 1★) with counts

### Metrics Row (3 columns)
| Metric | Value | Label |
|---|---|---|
| Would recommend | 96% (green) | — |
| Punctuality score | 4.9 | — |
| Value for money | 4.8 | — |

### Filter Row
- Pills: All (212), 5★ (165), 4★ (30), 3★ (11), Unanswered (8)
- Sort dropdown: Newest first, Oldest first, Lowest rating

### Review List

#### Review Card — Full Version
| Element | Description |
|---|---|
| Customer avatar | Initials in colored circle (34px) |
| Customer name | Bold |
| Service type + date | "AC filter clean · 21 May 2026" with service icon |
| Star rating | ★ symbols + numeric (e.g., 5.0) |
| Time ago | "2 hours ago" |
| Review text | Full paragraph |
| Tags | Pill tags: "Punctual", "Professional", "Fair price" |
| Helpful count | 👍 "12 found helpful" |
| Reply button | "Reply" — toggles reply input |

#### Review with Existing Reply
- Green reply box below review
- Label: "Your reply"
- Reply text displayed

#### Review Reply Form (Toggled)
- Textarea: "Write a thank you or address their feedback..."
- "Send reply" button (green)

#### Low-Rating Review
- Red border on 1–3 star reviews
- Tags might include "Late arrival", etc.
- Reply placeholder: "Apologise and address the concern..."

#### Highlighted Review
- Gold/amber border for recent reviews (e.g., "2 hours ago")

## States
- **All reviews**: Default view showing all reviews
- **Filtered**: Only reviews matching star filter shown
- **Sorted**: Reviews re-ordered
- **Reply open**: Reply textarea visible under specific review
- **Reply sent**: Reply box changes to "Your reply" display
- **Loading**: Review card skeletons
