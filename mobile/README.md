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

If you are in the repository root, use:

```bash
npm run mobile:tunnel
```

Do not run `npx expo ...` from the repository root. The Expo app lives in `mobile/`.

To verify the Android bundle from the repository root:

```bash
npm run mobile:export:android
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
