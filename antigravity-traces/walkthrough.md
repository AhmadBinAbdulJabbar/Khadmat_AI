# Demo Walkthrough

## 1. Open Mobile App

Launch the Expo app from `mobile/`, or open the optional PWA route:

```text
http://localhost:3000/mobile
```

## 2. Submit Request

Use the default request:

```text
Mujhe kal subah G-13 mein AC technician chahiye
```

## 3. Intent Understanding

The Intent Agent extracts:

- Service type: AC Technician
- Location: G-13, Islamabad
- Time: Tomorrow morning
- Language: Roman Urdu

## 4. Provider Discovery

The Discovery Agent searches the mock provider dataset and finds AC providers near G-13.

## 5. Matching and Ranking

The Decision Agent scores providers using:

- service match
- availability
- distance
- rating
- preferred time slot
- completed job history

Ali AC Services is selected because it is available at 10:00 AM, 2.1 km away, rated 4.7, and has 212 completed jobs.

## 6. Action Simulation

The Booking Agent creates:

- booking reference
- confirmed status
- provider assignment
- scheduled slot
- price estimate

## 7. Follow-Up

The Follow-up Agent schedules:

- reminder 1 hour before appointment
- provider notification
- completion confirmation and rating request
