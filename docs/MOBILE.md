# Native app (Capacitor) and Apple Health

This repo includes **Capacitor** (`ios/`, `android/`) so you can ship the same UI as a store app.

## Commands

```bash
npm run build
npx cap sync
```

Open native projects:

- **iOS** (macOS + Xcode): `npx cap open ios`
- **Android**: `npx cap open android`

Package scripts:

- `npm run mobile:sync` — `build` + `cap sync` for both platforms

## Apple Watch / Health app

Safari and a plain web view **cannot** read **HealthKit** data. To ingest Apple Watch or **Health** app metrics (sleep, steps, workouts, heart rate):

1. Use the **Capacitor iOS** project and add a **HealthKit** integration in native Swift (or a maintained Capacitor community plugin that wraps HealthKit).
2. Request read permissions for the quantity types you need, then either:
   - write summarized daily documents to **Firestore** under `users/{uid}/healthDaily/{date}`, or
   - call a **Cloud Function** that validates and stores aggregates.
3. In the React app, read those Firestore docs the same way you sync fitness profiles (keep types in `fitness-types.ts` and extend with e.g. `HealthDailySummary`).

**Bluetooth** from arbitrary watches is not a practical cross-platform web API; prefer HealthKit on iOS and **Health Connect** on Android via native modules.

## Firebase

Deploy `firestore.rules` in the Firebase console so only `request.auth.uid` can read/write `users/{userId}/**`.
