# Provider Settings Tasks

## Frontend Tasks

### F-SET-01: Build Settings Page Layout
- Create `app/provider/settings/page.tsx`
- Uses shared provider layout
- Settings sub-navigation (left, 180px) + content area (right)
- Section switching on nav click

### F-SET-02: Build Settings Navigation
- 7 nav items: Notifications, Availability, Payout, Security, Privacy, App, Account
- Active state highlighting
- Separator before Account (danger zone)
- Account item in red text

### F-SET-03: Build Toggle Component
- Reusable `Toggle.tsx` — on/off states with animation
- Green (on) / gray (off) track with knob
- On click → toggle state + call API

### F-SET-04: Build Notifications Section
- Groups: Job Requests, Reviews & Payments, Channels
- Each setting: icon, label, sub-label, toggle
- 9 toggle rows total

### F-SET-05: Build Availability Section
- Online status toggle + badge
- Auto go-offline toggle
- Working hours start/end dropdowns
- Max jobs/day dropdown
- Vacation/leave → expandable date picker
- Save button

### F-SET-06: Build Payout Section
- Bank account card: name, masked number, Change + Verified badge
- Payout schedule dropdown
- Min payout amount input
- Next payout date display
- Save button

### F-SET-07: Build Security Section
- Change password: button → opens password change form/modal
- 2FA toggle with status badge
- Active sessions count + "Sign out all" button
- Login history → expandable list

### F-SET-08: Build Privacy Section
- 4 privacy toggles with descriptions

### F-SET-09: Build App Preferences Section
- Dark mode toggle
- Language dropdown
- Currency dropdown
- Sound alerts toggle

### F-SET-10: Build Account (Danger Zone)
- Download data → trigger export
- Pause account → confirmation dialog
- Sign out → clear session, redirect to `/auth`
- Delete account → confirmation dialog with password

---

## Backend Tasks

### B-SET-01: Get Provider Settings
- `GET /api/provider/settings?provider_id={id}`
- Returns all settings as JSON object grouped by section

### B-SET-02: Update Provider Settings
- `PATCH /api/provider/settings`
- Request: partial settings update (any section)
- Merge with existing settings
- Return updated settings

### B-SET-03: Settings Table Schema
```sql
CREATE TABLE provider_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES users(id),
  notifications JSONB DEFAULT '{}',
  availability JSONB DEFAULT '{}',
  payout JSONB DEFAULT '{}',
  privacy JSONB DEFAULT '{}',
  app_preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### B-SET-04: Change Password
- `POST /api/auth/change-password`
- Request: `{ current_password, new_password }`
- Verify current password, hash new password, update

### B-SET-05: Toggle 2FA
- `POST /api/auth/2fa/enable` / `POST /api/auth/2fa/disable`
- Send OTP to phone, verify, enable/disable

### B-SET-06: Active Sessions
- `GET /api/auth/sessions` — list active sessions
- `DELETE /api/auth/sessions` — sign out all other sessions

### B-SET-07: Payout Bank Account
- `PUT /api/provider/payout/bank`
- Request: `{ bank_name, account_number, account_title }`
- Update/create bank account record

### B-SET-08: Account Actions
- `POST /api/account/export` — queue data export job
- `POST /api/account/pause` — set account paused state
- `DELETE /api/account` — soft delete (requires password)
- `POST /api/auth/logout` — invalidate session/JWT
