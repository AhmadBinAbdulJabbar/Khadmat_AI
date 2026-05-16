# Provider Profile & Reviews Tasks

## Frontend Tasks

### F-PROF-01: Build Profile Page with Tabs
- [ ] Create `app/provider/profile/page.tsx`
- [ ] Tab navigation: Profile | Reviews (count)
- [ ] Tab content switching (show/hide)
- [ ] Fetch profile data and reviews on mount

### F-PROF-02: Build Personal Info Form
- [ ] Profile photo section: avatar + upload button
- [ ] Two-column form: name, phone, email, city
- [ ] Pre-populate with current user data from API

### F-PROF-03: Build Profession Details Form
- [ ] Profession chip multi-select component
- [ ] Toggle chips on/off (green selected, gray default)
- [ ] Experience dropdown
- [ ] Min/max price inputs
- [ ] Bio textarea

### F-PROF-04: Build Service Areas Section
- [ ] Area chips with X (remove) button
- [ ] "Add area" button → dropdown or modal to select new area
- [ ] Area options based on city

### F-PROF-05: Build Photo Upload
- [ ] Click "Upload photo" → file picker
- [ ] Validate: JPG/PNG, max 2MB
- [ ] Upload to Supabase Storage or server
- [ ] Show preview after upload

### F-PROF-06: Save Profile
- [ ] "Save changes" → `PUT /api/provider/profile`
- [ ] Validate required fields
- [ ] Show loading spinner during save
- [ ] Toast on success/error

### F-PROF-07: Build Reviews Tab (Read-only)
- [ ] Rating overview: large number + star visualization + breakdown bars
- [ ] Review cards: avatar, name, service, date, stars, text
- [ ] Paginated review list

---

## Backend Tasks

### B-PROF-01: Get Provider Profile
- [ ] `GET /api/provider/profile?provider_id={id}`
- [ ] Returns full profile:
```json
{
  "user": { "first_name", "last_name", "email", "phone", "city" },
  "profile": {
    "professions": ["AC Technician"],
    "experience": "5-10 years",
    "price_min": 800,
    "price_max": 1500,
    "bio": "...",
    "service_areas": ["G-13", "G-10", "F-10", "F-8"],
    "photo_url": null
  }
}
```

### B-PROF-02: Update Provider Profile
- [ ] `PUT /api/provider/profile`
- [ ] Request: full profile object (same as GET response structure)
- [ ] Update `users` table (name, phone, email, city)
- [ ] Update `provider_profiles` table (professions, experience, prices, bio, areas)
- [ ] Return updated profile

### B-PROF-03: Upload Profile Photo
- [ ] `POST /api/provider/profile/photo`
- [ ] Accept multipart form data (image file)
- [ ] Validate: JPG/PNG, max 2MB
- [ ] Upload to Supabase Storage bucket
- [ ] Save URL in `provider_profiles.photo_url`
- [ ] Return photo URL

### B-PROF-04: Get Provider Reviews (Summary)
- [ ] `GET /api/provider/reviews?provider_id={id}&page={n}&limit={n}`
- [ ] Returns:
```json
{
  "summary": {
    "average": 4.7,
    "total": 212,
    "breakdown": { "5": 165, "4": 30, "3": 11, "2": 4, "1": 2 }
  },
  "reviews": [
    {
      "id": "uuid",
      "customer_name": "Ahmed Usman",
      "customer_initials": "AU",
      "service_type": "AC filter clean",
      "date": "2026-05-21",
      "rating": 5,
      "text": "Bahut acha kaam kiya!...",
      "provider_reply": null
    }
  ],
  "total": 212,
  "page": 1
}
```

### B-PROF-05: Reviews Table Schema
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  provider_id UUID REFERENCES providers(id),
  customer_id UUID REFERENCES users(id),
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text TEXT,
  tags TEXT[],
  provider_reply TEXT,
  replied_at TIMESTAMPTZ,
  helpful_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```
