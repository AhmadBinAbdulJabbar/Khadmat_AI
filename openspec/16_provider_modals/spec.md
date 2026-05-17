# Provider Modals

## Feature Overview
Three distinct modals for the Service Provider's "My Jobs" page to manage job lifecycle events:
1. **Request Review**: Allows a provider to send a review request to a customer for a completed job via WhatsApp, SMS, or In-App.
2. **View Completed Job**: Displays the final receipt, payment proof, customer review (if any), and state changes for a finished job.
3. **View Details (Confirmed)**: Shows comprehensive info for an upcoming job, including a map, customer history, timeline, and actions (Mark Complete, Cancel).

## Components
- `RequestReviewModal`: Contains channel selector, timing selector, and a "sent" success state.
- `ViewCompletedJobModal`: Shows earnings receipt, payment proof card, review score, and before/after states.
- `ViewDetailsConfirmedModal`: Has tabs for "Job details", "Customer", and "Timeline". Includes a map view, customer stats, and history.

## Database
- Interacts with `jobs`, `reviews`, `users`.

## API Endpoints
- `POST /api/provider/jobs/{job_id}/request-review`: Triggers notification sending.
- `GET /api/provider/jobs/{job_id}/details`: Fetches full job metadata for modals.
