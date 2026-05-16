# Khadmat AI — OpenSpec Directory

Complete page-by-page specifications and task breakdowns for the Khadmat AI platform.
Each folder contains a `spec.md` (UI/UX specification) and `tasks.md` (frontend + backend task list).

---

## Customer / Main Pages

| # | Page | Route | Spec | Tasks |
|---|---|---|---|---|
| 01 | Auth — Login & Signup | `/auth` | [spec](./01_auth_login_signup/spec.md) | [tasks](./01_auth_login_signup/tasks.md) |
| 02 | Landing Page | `/` | [spec](./02_landing_page/spec.md) | [tasks](./02_landing_page/tasks.md) |
| 03 | Manual Booking | `/book/manual` | [spec](./03_customer_manual_booking/spec.md) | [tasks](./03_customer_manual_booking/tasks.md) |
| 04 | AI Chat Booking | `/book` | [spec](./04_chat_booking/spec.md) | [tasks](./04_chat_booking/tasks.md) |
| 05 | Booking Receipt | `/booking/{id}` | [spec](./05_booking_receipt/spec.md) | [tasks](./05_booking_receipt/tasks.md) |
| 06 | Bookings Dashboard | `/dashboard` | [spec](./06_bookings_dashboard/spec.md) | [tasks](./06_bookings_dashboard/tasks.md) |
| 07 | Browse Providers | `/providers` | [spec](./07_browse_providers/spec.md) | [tasks](./07_browse_providers/tasks.md) |

## Service Provider Pages

| # | Page | Route | Spec | Tasks |
|---|---|---|---|---|
| 08 | Provider Dashboard | `/provider/dashboard` | [spec](./08_provider_dashboard/spec.md) | [tasks](./08_provider_dashboard/tasks.md) |
| 09 | My Jobs | `/provider/jobs` | [spec](./09_provider_my_jobs/spec.md) | [tasks](./09_provider_my_jobs/tasks.md) |
| 10 | Schedule | `/provider/schedule` | [spec](./10_provider_schedule/spec.md) | [tasks](./10_provider_schedule/tasks.md) |
| 11 | Earnings | `/provider/earnings` | [spec](./11_provider_earnings/spec.md) | [tasks](./11_provider_earnings/tasks.md) |
| 12 | Profile & Reviews | `/provider/profile` | [spec](./12_provider_profile_reviews/spec.md) | [tasks](./12_provider_profile_reviews/tasks.md) |
| 13 | Reviews (Full) | `/provider/reviews` | [spec](./13_provider_reviews_full/spec.md) | [tasks](./13_provider_reviews_full/tasks.md) |
| 14 | Settings | `/provider/settings` | [spec](./14_provider_settings/spec.md) | [tasks](./14_provider_settings/tasks.md) |

---

## Task ID Convention
- **F-XXX-##** — Frontend tasks
- **B-XXX-##** — Backend tasks

## Tech Stack Reference
- **Frontend**: Next.js 14 (App Router)
- **Backend**: Python FastAPI
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Antigravity + Gemini 1.5 Flash
