import type {
  CustomProgram,
  DailyRecovery,
  FitnessExportPayload,
  FitnessProfile,
  ReminderConfig,
  SavedMeal,
  WorkoutSession,
} from '@/lib/fitness-types';

const PROFILES_KEY = 'fitnesspro:profiles';
const ACTIVE_KEY = 'fitnesspro:activeProfileId';
const DATA_PREFIX = 'fitnesspro:data:';
const SHOPPING_EXTRA_KEY = 'fitnesspro:shoppingExtra'; // legacy single; migrate into profile data

export interface ProfileData {
  workoutSessions: WorkoutSession[];
  customPrograms: CustomProgram[];
  savedMeals: SavedMeal[];
  recoveryDays: DailyRecovery[];
  reminders: ReminderConfig[];
  shoppingListExtra: string[];
}

const emptyProfileData = (): ProfileData => ({
  workoutSessions: [],
  customPrograms: [],
  savedMeals: [],
  recoveryDays: [],
  reminders: [],
  shoppingListExtra: [],
});

function dataKey(profileId: string) {
  return `${DATA_PREFIX}${profileId}`;
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function uid(prefix: string) {
  return `${prefix}_${crypto.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`}`;
}

export function getProfiles(): FitnessProfile[] {
  const list = safeParse<FitnessProfile[]>(localStorage.getItem(PROFILES_KEY), []);
  if (list.length === 0) {
    const def: FitnessProfile = {
      id: uid('prof'),
      name: 'Default',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(PROFILES_KEY, JSON.stringify([def]));
    localStorage.setItem(ACTIVE_KEY, def.id);
    localStorage.setItem(dataKey(def.id), JSON.stringify(emptyProfileData()));
    return [def];
  }
  return list;
}

export function getActiveProfileId(): string {
  const profiles = getProfiles();
  const active = localStorage.getItem(ACTIVE_KEY);
  if (active && profiles.some((p) => p.id === active)) return active;
  const first = profiles[0].id;
  localStorage.setItem(ACTIVE_KEY, first);
  return first;
}

export function setActiveProfileId(id: string) {
  localStorage.setItem(ACTIVE_KEY, id);
  window.dispatchEvent(new CustomEvent('fitnesspro:profile'));
}

export function addProfile(name: string): FitnessProfile {
  const profiles = getProfiles();
  const p: FitnessProfile = {
    id: uid('prof'),
    name: name.trim() || 'Profile',
    createdAt: new Date().toISOString(),
  };
  profiles.push(p);
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  localStorage.setItem(dataKey(p.id), JSON.stringify(emptyProfileData()));
  setActiveProfileId(p.id);
  window.dispatchEvent(new CustomEvent('fitnesspro:profile'));
  return p;
}

export function renameProfile(id: string, name: string) {
  const profiles = getProfiles().map((p) => (p.id === id ? { ...p, name: name.trim() || p.name } : p));
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  window.dispatchEvent(new CustomEvent('fitnesspro:profile'));
}

export function deleteProfile(id: string) {
  let profiles = getProfiles().filter((p) => p.id !== id);
  if (profiles.length === 0) {
    const p: FitnessProfile = {
      id: uid('prof'),
      name: 'Default',
      createdAt: new Date().toISOString(),
    };
    profiles = [p];
    localStorage.setItem(dataKey(p.id), JSON.stringify(emptyProfileData()));
  }
  localStorage.removeItem(dataKey(id));
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  if (getActiveProfileId() === id) {
    setActiveProfileId(profiles[0].id);
  }
  window.dispatchEvent(new CustomEvent('fitnesspro:profile'));
}

export function getProfileData(profileId = getActiveProfileId()): ProfileData {
  const raw = localStorage.getItem(dataKey(profileId));
  const parsed = safeParse<ProfileData | null>(raw, null);
  if (!parsed) {
    const empty = emptyProfileData();
    localStorage.setItem(dataKey(profileId), JSON.stringify(empty));
    return empty;
  }
  return {
    ...emptyProfileData(),
    ...parsed,
    workoutSessions: parsed.workoutSessions ?? [],
    customPrograms: parsed.customPrograms ?? [],
    savedMeals: parsed.savedMeals ?? [],
    recoveryDays: parsed.recoveryDays ?? [],
    reminders: parsed.reminders ?? [],
    shoppingListExtra: parsed.shoppingListExtra ?? [],
  };
}

export function setProfileData(profileId: string, data: ProfileData) {
  localStorage.setItem(dataKey(profileId), JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('fitnesspro:data'));
}

export function patchProfileData(profileId: string, partial: Partial<ProfileData>) {
  const cur = getProfileData(profileId);
  setProfileData(profileId, { ...cur, ...partial });
}

/* ─── Sessions ─── */
export function appendWorkoutSession(session: Omit<WorkoutSession, 'id'> & { id?: string }) {
  const pid = getActiveProfileId();
  const data = getProfileData(pid);
  const full: WorkoutSession = {
    ...session,
    id: session.id ?? uid('sess'),
  };
  data.workoutSessions = [full, ...data.workoutSessions].slice(0, 500);
  setProfileData(pid, data);
}

export function updateWorkoutSession(id: string, patch: Partial<WorkoutSession>) {
  const pid = getActiveProfileId();
  const data = getProfileData(pid);
  data.workoutSessions = data.workoutSessions.map((s) => (s.id === id ? { ...s, ...patch } : s));
  setProfileData(pid, data);
}

export function removeWorkoutSession(id: string) {
  const pid = getActiveProfileId();
  const data = getProfileData(pid);
  data.workoutSessions = data.workoutSessions.filter((s) => s.id !== id);
  setProfileData(pid, data);
}

/* ─── Custom programs ─── */
export function saveCustomProgram(program: CustomProgram) {
  const pid = getActiveProfileId();
  const data = getProfileData(pid);
  const idx = data.customPrograms.findIndex((p) => p.id === program.id);
  if (idx >= 0) data.customPrograms[idx] = program;
  else data.customPrograms = [program, ...data.customPrograms];
  setProfileData(pid, data);
}

export function deleteCustomProgram(id: string) {
  const pid = getActiveProfileId();
  const data = getProfileData(pid);
  data.customPrograms = data.customPrograms.filter((p) => p.id !== id);
  setProfileData(pid, data);
}

/* ─── Saved meals ─── */
export function saveSavedMeal(meal: SavedMeal) {
  const pid = getActiveProfileId();
  const data = getProfileData(pid);
  const idx = data.savedMeals.findIndex((m) => m.id === meal.id);
  if (idx >= 0) data.savedMeals[idx] = meal;
  else data.savedMeals = [meal, ...data.savedMeals];
  setProfileData(pid, data);
}

export function deleteSavedMeal(id: string) {
  const pid = getActiveProfileId();
  const data = getProfileData(pid);
  data.savedMeals = data.savedMeals.filter((m) => m.id !== id);
  setProfileData(pid, data);
}

/* ─── Recovery ─── */
export function upsertRecoveryDay(day: DailyRecovery) {
  const pid = getActiveProfileId();
  const data = getProfileData(pid);
  const rest = data.recoveryDays.filter((d) => d.date !== day.date);
  data.recoveryDays = [day, ...rest].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 400);
  setProfileData(pid, data);
}

export function deleteRecoveryDay(date: string) {
  const pid = getActiveProfileId();
  const data = getProfileData(pid);
  data.recoveryDays = data.recoveryDays.filter((d) => d.date !== date);
  setProfileData(pid, data);
}

/* ─── Reminders ─── */
export function setReminders(reminders: ReminderConfig[]) {
  const pid = getActiveProfileId();
  const data = getProfileData(pid);
  data.reminders = reminders;
  setProfileData(pid, data);
}

/* ─── Shopping extras ─── */
export function setShoppingListExtra(items: string[]) {
  const pid = getActiveProfileId();
  const data = getProfileData(pid);
  data.shoppingListExtra = items;
  setProfileData(pid, data);
  try {
    localStorage.setItem(SHOPPING_EXTRA_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

/* ─── Export / import ─── */
export function buildExportPayload(): FitnessExportPayload {
  const pid = getActiveProfileId();
  const profiles = getProfiles();
  const profile = profiles.find((p) => p.id === pid) ?? profiles[0];
  const d = getProfileData(pid);
  const progressRaw = localStorage.getItem('progress-tracker');
  const waterRaw = localStorage.getItem('water-tracker');
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    profile,
    workoutSessions: d.workoutSessions,
    customPrograms: d.customPrograms,
    savedMeals: d.savedMeals,
    recoveryDays: d.recoveryDays,
    reminders: d.reminders,
    shoppingListExtra: d.shoppingListExtra,
    progressEntries: progressRaw ? safeParse(progressRaw, undefined) : undefined,
    waterGlassesByDate: waterRaw ? { today: parseInt(waterRaw, 10) || 0 } : undefined,
  };
}

export function importPayload(payload: FitnessExportPayload, mode: 'merge' | 'replace') {
  const pid = getActiveProfileId();
  const cur = getProfileData(pid);
  if (mode === 'replace') {
    setProfileData(pid, {
      workoutSessions: payload.workoutSessions,
      customPrograms: payload.customPrograms,
      savedMeals: payload.savedMeals,
      recoveryDays: payload.recoveryDays,
      reminders: payload.reminders,
      shoppingListExtra: payload.shoppingListExtra ?? [],
    });
  } else {
    const mergeSessions = [...payload.workoutSessions, ...cur.workoutSessions];
    const seen = new Set<string>();
    const dedup = mergeSessions.filter((s) => {
      if (seen.has(s.id)) return false;
      seen.add(s.id);
      return true;
    });
    setProfileData(pid, {
      ...cur,
      workoutSessions: dedup.slice(0, 500),
      customPrograms: [...payload.customPrograms, ...cur.customPrograms].filter(
        (p, i, arr) => arr.findIndex((x) => x.id === p.id) === i
      ),
      savedMeals: [...payload.savedMeals, ...cur.savedMeals].filter(
        (m, i, arr) => arr.findIndex((x) => x.id === m.id) === i
      ),
      recoveryDays: [...payload.recoveryDays, ...cur.recoveryDays]
        .filter((d, i, arr) => arr.findIndex((x) => x.date === d.date) === i)
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 400),
      reminders: payload.reminders?.length ? payload.reminders : cur.reminders,
      shoppingListExtra: [...new Set([...(payload.shoppingListExtra ?? []), ...cur.shoppingListExtra])],
    });
  }
  if (payload.progressEntries?.length) {
    localStorage.setItem('progress-tracker', JSON.stringify(payload.progressEntries));
  }
  window.dispatchEvent(new CustomEvent('fitnesspro:data'));
}

export { uid };
