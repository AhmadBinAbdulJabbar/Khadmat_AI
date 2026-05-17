# Provider Settings Tasks

## Frontend Tasks

### F-SET-01: Build Settings Page Layout
- [x] Create `app/provider/settings/page.tsx`
- [x] Uses shared provider layout
- [x] Settings sub-navigation (left, 180px) + content area (right)
- [x] Section switching on nav click

### F-SET-02: Build Settings Navigation
- [x] 7 nav items: Notifications, Availability, Payout, Security, Privacy, App, Account
- [x] Active state highlighting
- [x] Separator before Account (danger zone)
- [x] Account item in red text

### F-SET-03: Build Toggle Component
- [x] Reusable `Toggle.tsx` — on/off states with animation
- [x] Green (on) / gray (off) track with knob
- [x] On click → toggle state + call API

### F-SET-04: Build Notifications Section
- [x] Groups: Job Requests, Reviews & Payments, Channels
- [x] Each setting: icon, label, sub-label, toggle
- [x] 9 toggle rows total

### F-SET-05: Build Availability Section
- [x] Online status toggle + badge
- [x] Auto go-offline toggle
- [x] Working hours start/end dropdowns
- [x] Max jobs/day dropdown
- [x] Vacation/leave → expandable date picker
- [x] Save button

### F-SET-06: Build Payout Section
- [x] Bank account card: name, masked number, Change + Verified badge
- [x] Payout schedule dropdown
- [x] Min payout amount input
- [x] Next payout date display
- [x] Save button

### F-SET-07: Build Security Section
- [x] Change password: button → opens password change form/modal
- [x] 2FA toggle with status badge
- [x] Active sessions count + "Sign out all" button
- [x] Login history → expandable list

### F-SET-08: Build Privacy Section
- [x] 4 privacy toggles with descriptions

### F-SET-09: Build App Preferences Section
- [x] Dark mode toggle
- [x] Language dropdown
- [x] Currency dropdown
- [x] Sound alerts toggle

### F-SET-10: Build Account (Danger Zone)
- [x] Download data → trigger export
- [x] Pause account → confirmation dialog
- [x] Sign out → clear session, redirect to `/auth`
- [x] Delete account → confirmation dialog with password

---

## Backend Tasks

### B-SET-01: Get Provider Settings
- [x] `GET /api/provider/settings?provider_id={id}`
- [x] Returns all settings as JSON object grouped by section

### B-SET-02: Update Provider Settings
- [x] `PATCH /api/provider/settings`
- [x] Request: partial settings update (any section)
- [x] Merge with existing settings
- [x] Return updated settings

### B-SET-03: Settings Table Schema
- [x] Schema designed and documented
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
- [x] `POST /api/auth/change-password`
- [x] Request: `{ current_password, new_password }`
- [x] Verify current password, hash new password, update

### B-SET-05: Toggle 2FA
- [x] `POST /api/auth/2fa/enable` / `POST /api/auth/2fa/disable`
- [x] Send OTP to phone, verify, enable/disable

### B-SET-06: Active Sessions
- [x] `GET /api/auth/sessions` — list active sessions
- [x] `DELETE /api/auth/sessions` — sign out all other sessions

### B-SET-07: Payout Bank Account
- [x] `PUT /api/provider/payout/bank`
- [x] Request: `{ bank_name, account_number, account_title }`
- [x] Update/create bank account record

### B-SET-08: Account Actions
- [x] `POST /api/account/export` — queue data export job
- [x] `POST /api/account/pause` — set account paused state
- [x] `DELETE /api/account` — soft delete (requires password)
- [x] `POST /api/auth/logout` — invalidate session/JWT
