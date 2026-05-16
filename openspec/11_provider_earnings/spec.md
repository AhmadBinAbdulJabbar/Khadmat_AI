# Provider Earnings Page Spec

## Page Route
`/provider/earnings` → `app/provider/earnings/page.tsx`

## Purpose
Financial dashboard for service providers showing available balance, monthly earnings breakdown, bar chart visualization, and full transaction history with payout management.

## UI Sections

### Earnings Hero Card (Green banner)
- Label: "Available balance"
- Value: "PKR 12,800" (large text)
- Sub-label: "Last payout: PKR 25,600 on 15 May 2026"
- "Withdraw" button (right-aligned, green)

### Stats Row (3 columns)
| Stat | Value | Sub |
|---|---|---|
| This month | 38,400 (green) | PKR · 32 jobs |
| Last month | 31,200 | PKR · 27 jobs |
| This year | 2,14,000 | PKR · 212 jobs |

### Monthly Earnings Bar Chart
- Header: "Monthly earnings" + Period tabs: "6 months" (active) / "1 year"
- Bar chart: 6 vertical bars (Dec–May)
- Current month bar highlighted in solid green
- Other bars in light green fill
- Value labels above each bar (22k, 18k, 28k, 31k, 31k, 38k)
- Month labels below (Dec, Jan, Feb, Mar, Apr, May)

### Transaction History Table
- Header: "Transaction history" + "Download PDF" link (green)
- Table columns: Service | Customer | Date | Amount
- Each row:
  - Service name + status pill (Paid green / Pending amber)
  - Customer name
  - Date (day + month)
  - Amount (green text, right-aligned): PKR X,XXX

## States
- **Loading**: Skeleton for hero card, stats, chart, and table
- **Empty**: "No transactions yet"
- **Withdraw**: Opens withdrawal modal/flow
- **Period switch**: Chart re-renders with 6-month or 12-month data
