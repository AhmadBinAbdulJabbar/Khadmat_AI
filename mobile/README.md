# Khadmat AI Mobile App

Standalone Expo mobile prototype for Challenge 2.

## Run

```bash
cd mobile
npm install
npm run start
```

Scan the QR code with Expo Go, or run:

```bash
npm run android
```

## Demo Scenario

Use:

```text
Mujhe kal subah G-13 mein AC technician chahiye
```

The app shows:

- multilingual intent extraction
- provider discovery and ranking
- simulated booking receipt
- reminder and completion follow-up
- full agent trace/logs

The mobile app imports the shared orchestrator from `../lib/agentic.ts`, so the mobile and optional web demos use the same decision logic.
