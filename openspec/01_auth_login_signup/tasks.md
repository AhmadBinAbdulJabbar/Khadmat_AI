# Auth — Login & Signup Tasks

## Frontend Tasks

### F-AUTH-01: Build Login/Signup Page Layout
- Create `app/auth/page.tsx`
- Implement two-column layout (branding left, form right)
- Build tab switcher (Sign in / Create account)
- Wire up `showTab()` toggle logic

### F-AUTH-02: Build Login Form
- Email/phone input with validation
- Password input with show/hide toggle
- "Forgot password?" link (placeholder route)
- Submit button with loading state
- Google OAuth button UI

### F-AUTH-03: Build Signup Form
- Role selector (Customer / Service Provider) card UI
- Conditional rendering of worker-specific fields
- Profession chip multi-select component
- Experience and price range dropdowns
- Dynamic button text based on role

### F-AUTH-04: Form Validation (Client-side)
- Email format validation (regex)
- Pakistan phone number format validation (`03XX-XXXXXXX`)
- Password minimum 8 characters
- Required field checks on all inputs
- Inline error message display

### F-AUTH-05: Connect Auth API
- Wire login form to `POST /api/auth/login`
- Wire signup form to `POST /api/auth/register`
- Handle JWT token storage (localStorage / cookie)
- Redirect on success: customer → `/`, provider → `/provider/dashboard`
- Display API error messages

---

## Backend Tasks

### B-AUTH-01: Create Users Table in Supabase
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('customer', 'provider', 'admin')),
  city TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### B-AUTH-02: Create Provider Profiles Table
```sql
CREATE TABLE provider_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  professions TEXT[] NOT NULL,
  experience TEXT,
  price_min INT,
  price_max INT,
  bio TEXT,
  service_areas TEXT[],
  is_available BOOLEAN DEFAULT true,
  rating FLOAT DEFAULT 0.0,
  total_jobs INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### B-AUTH-03: Build Registration Endpoint
- `POST /api/auth/register`
- Request body: `{ first_name, last_name, email, phone, password, role, city, professions?, experience?, price_range? }`
- Hash password with bcrypt
- Insert into `users` table
- If role = provider → also insert into `provider_profiles`
- Return JWT token + user object
- Handle duplicate email/phone errors (409)

### B-AUTH-04: Build Login Endpoint
- `POST /api/auth/login`
- Request body: `{ email_or_phone, password }`
- Lookup user by email OR phone
- Verify bcrypt password hash
- Return JWT token + user object + role
- Handle: user not found (404), wrong password (401)

### B-AUTH-05: JWT Auth Middleware
- Create `middleware/auth.py`
- Verify JWT on protected routes
- Extract `user_id` and `role` from token
- Attach to request context
- Return 401 for invalid/expired tokens

### B-AUTH-06: Google OAuth Integration (Optional)
- `POST /api/auth/google`
- Verify Google ID token
- Create or find user by email
- Return JWT token
- If new user → set role as customer by default

### B-AUTH-07: Forgot Password Flow (Optional)
- `POST /api/auth/forgot-password` — send reset email/OTP
- `POST /api/auth/reset-password` — verify OTP, update password hash
