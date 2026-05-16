# Provider Reviews (Full) Tasks

## Frontend Tasks

### F-REV-01: Build Reviews Page
- Create `app/provider/reviews/page.tsx`
- Uses shared provider layout
- Page header with title and subtitle

### F-REV-02: Build Rating Overview
- Two-column layout: big rating (left) + bar chart (right)
- Large rating number with star icons
- Total count + "Top X% of providers" badge
- Star distribution bars with counts

### F-REV-03: Build Metrics Row
- 3-column grid
- "Would recommend" percentage, punctuality score, value for money
- Fetch from reviews summary API

### F-REV-04: Build Filter & Sort
- Star filter pills: All, 5★, 4★, 3★, Unanswered
- Active state toggle
- Sort dropdown: Newest first, Oldest first, Lowest rating
- On change → re-fetch or re-filter reviews

### F-REV-05: Build Review Card Component
- `ReviewCard.tsx` — full version with all elements
- Customer avatar + name + service + date
- Star rating display
- Review body text
- Tags as pills
- Helpful count
- Reply button

### F-REV-06: Build Reply System
- Toggle reply textarea on "Reply" button click
- Textarea input with placeholder
- "Send reply" button → `POST /api/provider/reviews/{id}/reply`
- After send: replace input with "Your reply" display box
- Existing replies shown as green reply boxes

### F-REV-07: Review Highlighting
- Recent reviews (< 24 hours): gold/amber border
- Low-rating reviews (≤ 3 stars): red border
- Unanswered filter: show reviews without `provider_reply`

---

## Backend Tasks

### B-REV-01: Get Reviews with Filters
- `GET /api/provider/reviews?provider_id={id}&rating={1-5}&filter={unanswered}&sort={newest|oldest|lowest}&page={n}`
- Returns paginated reviews with summary
- "Unanswered" filter: WHERE `provider_reply IS NULL`
- Include summary stats in response

### B-REV-02: Review Metrics
- `GET /api/provider/reviews/metrics?provider_id={id}`
- Returns:
```json
{
  "would_recommend": 96,
  "punctuality": 4.9,
  "value_for_money": 4.8
}
```
- Calculated from reviews with specific tags or sub-ratings
- For MVP: derived from overall ratings

### B-REV-03: Reply to Review
- `POST /api/provider/reviews/{review_id}/reply`
- Request: `{ "reply_text": "..." }`
- Validate: review belongs to this provider
- Update `reviews.provider_reply` and `reviews.replied_at`
- Send notification to customer that provider replied
- Return updated review

### B-REV-04: Mark Review as Helpful (Customer-facing)
- `POST /api/reviews/{review_id}/helpful`
- Increment `reviews.helpful_count`
- Prevent duplicate votes (track by user_id or IP)

### B-REV-05: Provider Ranking Badge
- Calculate provider's percentile ranking by rating
- "Top 5% of providers" = provider's rating is ≥ 95th percentile
- Calculate from all providers' average ratings
- Return with review summary
