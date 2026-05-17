# Provider Earnings Tasks

## Frontend Tasks

### F-EARN-01: Build Earnings Page
- [x] Create `app/provider/earnings/page.tsx`
- [x] Uses shared provider layout
- [x] Page title: "Earnings" + subtitle

### F-EARN-02: Build Earnings Hero Card
- [x] Green background banner
- [x] Available balance (large text)
- [x] Last payout info
- [x] Withdraw button → opens withdrawal flow

### F-EARN-03: Build Stats Row
- [x] 3-column stats grid
- [x] This month, last month, this year
- [x] Fetch from earnings API

### F-EARN-04: Build Bar Chart Component
- [x] `EarningsChart.tsx`
- [x] CSS-based bar chart (no external library for MVP)
- [x] Each bar: percentage height relative to max value
- [x] Current month highlighted in solid green
- [x] Value labels above bars
- [x] Month labels below
- [x] Period tabs: 6 months / 1 year → re-render chart

### F-EARN-05: Build Transaction History Table
- [x] Table with headers: Service, Customer, Date, Amount
- [x] Each row: service name + status pill, customer name, date, amount
- [x] "Download PDF" link → trigger transaction report download

### F-EARN-06: Withdrawal Flow (Optional)
- [x] "Withdraw" button → modal with bank account info
- [x] Confirm withdrawal → `POST /api/provider/earnings/withdraw`
- [x] Show confirmation after success

---

## Backend Tasks

### B-EARN-01: Earnings Summary
- [x] `GET /api/provider/earnings/summary?provider_id={id}`
- [x] Returns:
```json
{
  "available_balance": 12800,
  "last_payout": { "amount": 25600, "date": "2026-05-15" },
  "this_month": { "total": 38400, "jobs": 32 },
  "last_month": { "total": 31200, "jobs": 27 },
  "this_year": { "total": 214000, "jobs": 212 }
}
```
- [x] Aggregate from `bookings` WHERE `provider_id = ?` AND `status = 'COMPLETED'`
- [x] Group by month for monthly totals

### B-EARN-02: Monthly Earnings Chart Data
- [x] `GET /api/provider/earnings/chart?provider_id={id}&months={6|12}`
- [x] Returns array of monthly earnings:
```json
{
  "chart": [
    { "month": "Dec", "total": 22000 },
    { "month": "Jan", "total": 18000 },
    ...
    { "month": "May", "total": 38400 }
  ]
}
```
- [x] Aggregate booking prices by month

### B-EARN-03: Transaction History
- [x] `GET /api/provider/earnings/transactions?provider_id={id}&page={n}&limit={n}`
- [x] Returns paginated list:
```json
{
  "transactions": [
    {
      "id": "uuid",
      "service": "AC filter clean",
      "customer_name": "Ahmed Usman",
      "date": "2026-05-21",
      "amount": 1200,
      "status": "pending"
    }
  ],
  "total": 32,
  "page": 1
}
```
- [x] From `bookings` WHERE `provider_id = ?` AND `status IN ('COMPLETED', 'CONFIRMED')`

### B-EARN-04: Withdraw Request (Optional)
- [x] `POST /api/provider/earnings/withdraw`
- [x] Request: `{ "provider_id", "amount", "bank_account_id" }`
- [x] Validate: amount ≤ available balance
- [x] Create payout record in `payouts` table
- [x] Deduct from available balance
- [x] Return confirmation

### B-EARN-05: Download Transaction Report
- [x] `GET /api/provider/earnings/report?provider_id={id}&format=pdf`
- [x] Generate PDF with transaction history
- [x] Return file download
