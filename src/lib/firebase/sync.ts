import { doc, getDoc, serverTimestamp, writeBatch, type Timestamp } from 'firebase/firestore';
import type { FitnessProfile } from '@/lib/fitness-types';
import { getFirebaseDb } from '@/lib/firebase/client';
import type { ProfileData, SerializedFullState } from '@/lib/fitness-storage';
import { serializeFullLocalState } from '@/lib/fitness-storage';

const EMPTY_PD: ProfileData = {
  workoutSessions: [],
  customPrograms: [],
  savedMeals: [],
  recoveryDays: [],
  reminders: [],
  shoppingListExtra: [],
};

function metaDoc(uid: string) {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore not configured');
  return doc(db, 'users', uid, 'settings', 'meta');
}

function profileDoc(uid: string, profileId: string) {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore not configured');
  return doc(db, 'users', uid, 'profiles', profileId);
}

/** Remove undefined (Firestore rejects undefined). */
function sanitize<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

export type RemoteMeta = {
  activeProfileId: string;
  profiles: FitnessProfile[];
  progressTracker: string | null;
  waterTracker: string | null;
  updatedAt?: Timestamp;
};

export async function uploadUserFitnessData(uid: string): Promise<void> {
  const state = serializeFullLocalState();
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore not configured');

  const batch = writeBatch(db);
  batch.set(metaDoc(uid), {
    ...sanitize({
      activeProfileId: state.activeProfileId,
      profiles: state.profiles,
      progressTracker: state.progressTracker ?? null,
      waterTracker: state.waterTracker ?? null,
    }),
    updatedAt: serverTimestamp(),
  });

  for (const p of state.profiles) {
    const pdata = state.profileDataById[p.id] ?? EMPTY_PD;
    batch.set(profileDoc(uid, p.id), {
      ...sanitize(pdata),
      _updatedAt: serverTimestamp(),
    });
  }

  await batch.commit();
}

export async function downloadUserFitnessData(uid: string): Promise<SerializedFullState | null> {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore not configured');

  const metaSnap = await getDoc(metaDoc(uid));
  if (!metaSnap.exists()) return null;

  const m = metaSnap.data() as RemoteMeta;
  const profiles = (m.profiles ?? []) as FitnessProfile[];
  const profileDataById: Record<string, ProfileData> = {};

  for (const p of profiles) {
    const ps = await getDoc(profileDoc(uid, p.id));
    if (ps.exists()) {
      const raw = { ...ps.data() } as ProfileData & { _updatedAt?: unknown };
      delete raw._updatedAt;
      profileDataById[p.id] = raw as ProfileData;
    } else {
      profileDataById[p.id] = { ...EMPTY_PD };
    }
  }

  return {
    activeProfileId: m.activeProfileId,
    profiles,
    profileDataById,
    progressTracker: m.progressTracker ?? null,
    waterTracker: m.waterTracker ?? null,
  };
}
