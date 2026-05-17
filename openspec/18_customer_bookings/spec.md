# Customer Bookings Page

## Feature Overview
The Customer Bookings page provides customers with a detailed list of all their service requests. It includes:
- Summary statistics (Total, Confirmed, Completed, Cancelled).
- Filters by booking status (All, Confirmed, Completed, Cancelled, Pending payment).
- Search functionality.
- Paginated list of bookings.
- Each booking card shows service details, provider info, status, schedule, location, price, and actions.
- Action buttons: View details, Pay, Cancel, Leave review, Rebook.

## Components
- `CustomerBookingsPage`: The main page component displaying the bookings list and filters.
- Uses the `CustomerLayout` for the sidebar and navbar.

## API Endpoints
- `GET /api/customer/bookings`: Fetches the list of bookings with pagination and filtering support.
