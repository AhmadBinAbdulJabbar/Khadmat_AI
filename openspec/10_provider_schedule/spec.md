# Provider Schedule Page Spec

## Page Route
`/provider/schedule` → `app/provider/schedule/page.tsx`

## Purpose
Weekly calendar view showing the provider's booked appointments, pending requests, and blocked time. Allows the provider to see their availability at a glance and toggle working days.

## UI Sections

### Page Header
- Title: "Schedule"
- Subtitle: "Week of 19–25 May 2026"
- Right controls:
  - Week navigation: ← "19 – 25 May" →
  - "Today" button — jumps to current week

### Weekly Calendar Grid
#### Day Headers (8 columns: time label + 7 days)
- Day name (Mon, Tue, Wed, Thu, Fri, Sat, Sun)
- Day number (19–25)
- Today highlighted: day number in green circle
- Weekend days dimmed (opacity 0.5)

#### Time Grid (rows: 8 AM → 4 PM)
- Time label column (right-aligned)
- 7 day columns
- Each cell can contain an event block

#### Event Types
| Type | Color | Border | Example |
|---|---|---|---|
| Confirmed | #E1F5EE bg, #085041 text | left 2px #1D9E75 | "AC filter clean · Ahmed U." |
| New/Pending | #FAEEDA bg, #633806 text | left 2px #EF9F27 | "Request · Ahmed U." |
| Completed | #EAF3DE bg, #27500A text | left 2px #639922 | "AC repair · Completed" |
| Blocked | gray bg | left 2px gray | (weekend/off hours) |

### Availability Settings
- Below calendar
- Title: "Working days — click to toggle"
- Day toggle buttons: Mon, Tue, Wed, Thu, Fri (on), Sat (off), Sun (off)
- Click to toggle on/off

## States
- **Loading**: Calendar grid skeleton
- **Empty week**: No events, blank cells
- **Event click**: Opens job detail (modal or navigation)
- **Today**: Current day column highlighted
- **Weekend**: Cells show blocked styling
