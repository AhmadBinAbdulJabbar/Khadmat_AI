# Provider Reviews (Full) Tasks

## Frontend Tasks

### F-REV-01: Build Reviews Page
- [x] Create `app/provider/reviews/page.tsx`
- [x] Uses shared provider layout
- [x] Page header with title and subtitle

### F-REV-02: Build Rating Overview
- [x] Two-column layout: big rating (left) + bar chart (right)
- [x] Large rating number with star icons
- [x] Total count + "Top X% of providers" badge
- [x] Star distribution bars with counts

### F-REV-03: Build Metrics Row
- [x] 3-column grid
- [x] "Would recommend" percentage, punctuality score, value for money
- [x] Fetch from reviews summary API

### F-REV-04: Build Filter & Sort
- [x] Star filter pills: All, 5★, 4★, 3★, Unanswered
- [x] Active state toggle
- [x] Sort dropdown: Newest first, Oldest first, Lowest rating
- [x] On change → re-fetch or re-filter reviews

### F-REV-05: Build Review Card Component
- [x] `ReviewCard.tsx` — full version with all elements
- [x] Customer avatar + name + service + date
- [x] Star rating display
- [x] Review body text
- [x] Tags as pills
- [x] Helpful count
- [x] Reply button

### F-REV-06: Build Reply System
- [x] Toggle reply textarea on "Reply" button click
- [x] Textarea input with placeholder
- [x] "Send reply" button → `POST /api/provider/reviews/{id}/reply`
- [x] After send: replace input with "Your reply" display box
- [x] Existing replies shown as green reply boxes

### F-REV-07: Review Highlighting
- [x] Recent reviews (< 24 hours): gold/amber border
- [x] Low-rating reviews (≤ 3 stars): red border
- [x] Unanswered filter: show reviews without `provider_reply`

---

## Backend Tasks

### B-REV-01: Get Reviews with Filters
- [x] `GET /api/provider/reviews?provider_id={id}&rating={1-5}&filter={unanswered}&sort={newest|oldest|lowest}&page={n}`
- [x] Returns paginated reviews with summary
- [x] "Unanswered" filter: WHERE `provider_reply IS NULL`
- [x] Include summary stats in response

### B-REV-02: Review Metrics
- [x] `GET /api/provider/reviews/metrics?provider_id={id}`
- [x] Returns:
```json
{
  "would_recommend": 96,
  "punctuality": 4.9,
  "value_for_money": 4.8
}
```
- [x] Calculated from reviews with specific tags or sub-ratings
- [x] For MVP: derived from overall ratings

### B-REV-03: Reply to Review
- [x] `POST /api/provider/reviews/{review_id}/reply`
- [x] Request: `{ "reply_text": "..." }`
- [x] Validate: review belongs to this provider
- [x] Update `reviews.provider_reply` and `reviews.replied_at`
- [x] Send notification to customer that provider replied
- [x] Return updated review

### B-REV-04: Mark Review as Helpful (Customer-facing)
- [x] `POST /api/reviews/{review_id}/helpful`
- [x] Increment `reviews.helpful_count`
- [x] Prevent duplicate votes (track by user_id or IP)

### B-REV-05: Provider Ranking Badge
- [x] Calculate provider's percentile ranking by rating
- [x] "Top 5% of providers" = provider's rating is ≥ 95th percentile
- [x] Calculate from all providers' average ratings
- [x] Return with review summary
