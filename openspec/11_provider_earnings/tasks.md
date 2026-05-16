# Provider Earnings Tasks

## Frontend Tasks

### F-EARN-01: Build Earnings Page
- [ ] Create `app/provider/earnings/page.tsx`
- [ ] Uses shared provider layout
- [ ] Page title: "Earnings" + subtitle

### F-EARN-02: Build Earnings Hero Card
- [ ] Green background banner
- [ ] Available balance (large text)
- [ ] Last payout info
- [ ] Withdraw button → opens withdrawal flow

### F-EARN-03: Build Stats Row
- [ ] 3-column stats grid
- [ ] This month, last month, this year
- [ ] Fetch from earnings API

### F-EARN-04: Build Bar Chart Component
- [ ] `EarningsChart.tsx`
- [ ] CSS-based bar chart (no external library for MVP)
- [ ] Each bar: percentage height relative to max value
- [ ] Current month highlighted in solid green
- [ ] Value labels above bars
- [ ] Month labels below
- [ ] Period tabs: 6 months / 1 year → re-render chart

### F-EARN-05: Build Transaction History Table
- [ ] Table with headers: Service, Customer, Date, Amount
- [ ] Each row: service name + status pill, customer name, date, amount
- [ ] "Download PDF" link → trigger transaction report download

### F-EARN-06: Withdrawal Flow (Optional)
- [ ] "Withdraw" button → modal with bank account info
- [ ] Confirm withdrawal → `POST /api/provider/earnings/withdraw`
- [ ] Show confirmation after success

---

## Backend Tasks

### B-EARN-01: Earnings Summary
- [ ] `GET /api/provider/earnings/summary?provider_id={id}`
- [ ] Returns:
```json
{
  "available_balance": 12800,
  "last_payout": { "amount": 25600, "date": "2026-05-15" },
  "this_month": { "total": 38400, "jobs": 32 },
  "last_month": { "total": 31200, "jobs": 27 },
  "this_year": { "total": 214000, "jobs": 212 }
}
```
- [ ] Aggregate from `bookings` WHERE `provider_id = ?` AND `status = 'COMPLETED'`
- [ ] Group by month for monthly totals

### B-EARN-02: Monthly Earnings Chart Data
- [ ] `GET /api/provider/earnings/chart?provider_id={id}&months={6|12}`
- [ ] Returns array of monthly earnings:
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
- [ ] Aggregate booking prices by month

### B-EARN-03: Transaction History
- [ ] `GET /api/provider/earnings/transactions?provider_id={id}&page={n}&limit={n}`
- [ ] Returns paginated list:
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
- [ ] From `bookings` WHERE `provider_id = ?` AND `status IN ('COMPLETED', 'CONFIRMED')`

### B-EARN-04: Withdraw Request (Optional)
- [ ] `POST /api/provider/earnings/withdraw`
- [ ] Request: `{ "provider_id", "amount", "bank_account_id" }`
- [ ] Validate: amount ≤ available balance
- [ ] Create payout record in `payouts` table
- [ ] Deduct from available balance
- [ ] Return confirmation

### B-EARN-05: Download Transaction Report
- [ ] `GET /api/provider/earnings/report?provider_id={id}&format=pdf`
- [ ] Generate PDF with transaction history
- [ ] Return file download
