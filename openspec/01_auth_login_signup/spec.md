# Auth — Login & Signup Page Spec

## Page Route
`/auth` → `app/auth/page.tsx`

## Purpose
Unified authentication page that handles both customer and service-provider registration, as well as returning-user login. This is the single entry point for all user types.

## UI Sections

### Left Panel (Branding)
- Khadmat AI logo (K badge + name)
- Hero headline: "Pakistan's smartest home services platform"
- Subtext about connection value
- Three role preview cards: Customer, Service Provider, Admin — each with icon, title, subtitle

### Right Panel (Forms)
- **Tab row**: "Sign in" | "Create account" — toggles between login and signup forms

#### Login Form
| Field | Type | Placeholder | Validation |
|---|---|---|---|
| Email or phone | text | `you@example.com or 0300-0000000` | Required, valid email or PK phone format |
| Password | password | `Enter your password` | Required, min 8 chars |
- Show/hide password toggle (eye icon)
- "Forgot password?" link
- Submit button: "Sign in"
- Divider: "or"
- Google OAuth button: "Continue with Google"
- Footer link: "Don't have an account? Create one"

#### Signup Form
| Field | Type | Placeholder | Validation |
|---|---|---|---|
| Role selector | card-select | Customer / Service provider | Required |
| First name | text | `Ali` | Required |
| Last name | text | `Hassan` | Required |
| Phone number | text | `0300-0000000` | Required, PK phone format |
| Email | text | `you@example.com` | Required, valid email |
| City | select | Karachi, Lahore, Islamabad | Required |
| Password | password | `Min. 8 characters` | Required, min 8 chars |

#### Worker-Only Fields (shown when "Service provider" role selected)
| Field | Type | Options |
|---|---|---|
| Profession chips | multi-select | AC Technician, Plumber, Electrician, Tutor, Cleaner, Carpenter, Painter, Security, Other |
| Experience | select | 1–2 years, 3–5 years, 5–10 years, 10+ years |
| Price range (PKR/visit) | select | Under 500, 500–1000, 1000–2000, 2000+ |

- Submit button text changes: "Create account" (customer) → "Join as provider" (worker)
- Footer link: "Already have an account? Sign in"

## States
- **Default**: Login tab active
- **Signup selected**: Signup form visible, login hidden
- **Worker role selected**: Worker-specific fields expand below city
- **Loading**: Submit button shows spinner, inputs disabled
- **Error**: Red border on invalid fields, error message below field
- **Success**: Redirect to landing page (customer) or provider dashboard (worker)
