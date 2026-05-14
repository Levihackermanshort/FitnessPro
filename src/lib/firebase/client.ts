import { type FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { type Auth, browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { type Firestore, getFirestore } from 'firebase/firestore';
import { readFirebaseWebConfig } from '@/lib/firebase/config';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  const cfg = readFirebaseWebConfig();
  if (!cfg) return null;
  if (!app) {
    app = getApps().length > 0 ? getApps()[0]! : initializeApp(cfg);
  }
  return app;
}

let persistenceDone = false;

export function getFirebaseAuth(): Auth | null {
  const a = getFirebaseApp();
  if (!a) return null;
  const auth = getAuth(a);
  if (!persistenceDone) {
    persistenceDone = true;
    setPersistence(auth, browserLocalPersistence).catch(() => {
      /* ignore */
    });
  }
  return auth;
}

export function getFirebaseDb(): Firestore | null {
  const a = getFirebaseApp();
  if (!a) return null;
  if (!db) {
    db = getFirestore(a);
  }
  return db;
}
