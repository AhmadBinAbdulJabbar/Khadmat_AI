# Demo Video Script

Target length: 3-5 minutes.

## 0:00-0:25 - Intro

Say:

> This is Khadmat AI, an agentic AI service orchestrator for Pakistan's informal economy. It automates the full lifecycle of a home service request: intent understanding, provider discovery, ranking, booking simulation, and follow-up.

Show the mobile app home screen.

## 0:25-1:05 - User Input

Use the default request:

```text
Mujhe kal subah G-13 mein AC technician chahiye
```

Say:

> The user can type in Roman Urdu, Urdu, or English. In this example, the request is in Roman Urdu.

## 1:05-1:45 - Intent Understanding

Show:

- Service Request: AC Technician
- Location: G-13, Islamabad
- Time: Tomorrow morning
- Language: Roman Urdu

Say:

> The Intent Agent extracts service type, location, time, and language from natural text.

## 1:45-2:35 - Matching And Ranking

Show Ali AC Services recommendation and score.

Say:

> The Discovery Agent searches a mock Maps/Places provider dataset. The Decision Agent ranks providers using service match, distance, availability, rating, preferred slot, and completed jobs.

Show:

- Ali AC Services
- 2.1 km
- 4.7 rating
- 10:00 AM
- score

## 2:35-3:20 - Action Simulation

Show booking receipt.

Say:

> The Booking Agent simulates a real state change by creating a booking reference, confirming the slot, assigning a provider, and generating a receipt.

Show:

- booking reference
- confirmed status
- scheduled slot
- price estimate

## 3:20-4:10 - Follow-Up Automation

Show reminder/follow-up card.

Say:

> The Follow-up Agent schedules a reminder one hour before the appointment and a post-job completion confirmation with rating request.

## 4:10-5:00 - Agent Trace

Scroll through Agent Trace.

Say:

> Every step is traceable: Planner, Intent, Discovery, Decision, Booking, and Follow-up agents. The trace logs show decisions, tool usage, and action execution.

End with:

> This demonstrates an end-to-end agentic workflow, not just a listing app.
