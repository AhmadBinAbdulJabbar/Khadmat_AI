# Customer Dashboard

## Feature Overview
The Customer Dashboard is the central hub for customers after they log in. It provides an overview of:
- Upcoming bookings (with quick actions like View details, Cancel).
- Lifetime stats (total bookings, spent, reviews given, saved providers).
- Quick actions (AI booking, Manual booking, Browse providers, Pay a bill).
- Two columns showing recent bookings (mini-list) and saved providers (mini-list with Rebook actions).

## Components
- `CustomerLayout`: A unified layout containing a top navbar and a sidebar specific to customers.
- `CustomerDashboardPage`: The main dashboard page with stats, upcoming bookings, quick actions, recent bookings, and saved providers.

## API Endpoints
- `GET /api/customer/dashboard`: Fetches the combined dashboard data (stats, upcoming, recent, saved providers).
