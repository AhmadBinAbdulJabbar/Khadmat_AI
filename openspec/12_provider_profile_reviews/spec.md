# Provider Profile & Reviews Page Spec

## Page Route
`/provider/profile` → `app/provider/profile/page.tsx`

## Purpose
Combined profile edit and reviews viewing page for service providers. Uses tab navigation to switch between Profile editing and Reviews viewing. Profile section allows editing personal info, professions, pricing, and service areas. Reviews tab shows rating breakdown and individual customer reviews.

## UI Sections

### Page Tabs
Two tabs: **Profile** (active default) | **Reviews (212)**

---

### Profile Tab

#### Personal Info Card
- Profile photo: avatar circle (56px) with "Upload photo" link
- Photo format: "JPG or PNG, max 2MB"
- Two-column form:
  | Field | Type | Default Value |
  |---|---|---|
  | Full name | text | Ali Hassan |
  | Phone number | text | 0300-1234567 |
  | Email | text | ali@example.com |
  | City | select | Islamabad |

#### Profession Details Card
- Profession chips (multi-select toggle):
  AC Technician (selected), Plumber, Electrician, Carpenter, Painter, Cleaner, Other
- Three-column row:
  | Field | Type | Default |
  |---|---|---|
  | Experience | select | 5–10 years |
  | Min price (PKR) | text | 800 |
  | Max price (PKR) | text | 1500 |
- Bio/description textarea

#### Service Areas Card
- Area chips with remove (X) button: G-13, G-10, F-10, F-8
- "Add area" button (+ icon)

#### Save Button
- "Save changes" — green primary button

---

### Reviews Tab

#### Rating Overview (2 columns)
- Left: Large rating number (4.7), 5 stars, "212 reviews"
- Right: Rating breakdown bars
  | Stars | Bar Width | Count |
  |---|---|---|
  | 5★ | 78% | 165 |
  | 4★ | 14% | 30 |
  | 3★ | 5% | 11 |
  | 2★ | 2% | 4 |
  | 1★ | 1% | 2 |

#### Review List
Each review card:
- Customer avatar + name
- Service type + date
- Star rating + numeric score
- Review text (the comment)
- Reviews are read-only on this page (see full reviews page for reply)

## States
- **Profile tab active**: Profile edit form visible
- **Reviews tab active**: Reviews read-only visible
- **Saving profile**: Button shows spinner, form disabled
- **Save success**: Green toast notification
- **Photo uploading**: Progress indicator on avatar
