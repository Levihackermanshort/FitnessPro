import type { WorkoutSession } from '@/lib/fitness-types';

function dateKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** Days with at least one session (YYYY-MM-DD), sorted desc */
export function sessionDatesDesc(sessions: WorkoutSession[]): string[] {
  const set = new Set<string>();
  for (const s of sessions) {
    const day = s.completedAt.slice(0, 10);
    set.add(day);
  }
  return [...set].sort((a, b) => b.localeCompare(a));
}

/** Current streak: consecutive calendar days ending today or yesterday */
export function computeTrainingStreak(sessions: WorkoutSession[]): number {
  const dates = sessionDatesDesc(sessions);
  if (dates.length === 0) return 0;
  const today = dateKey(new Date());
  const y = new Date();
  y.setDate(y.getDate() - 1);
  const yesterday = dateKey(y);

  let anchor = dates[0] === today ? today : dates[0] === yesterday ? yesterday : null;
  if (!anchor) return 0;

  let streak = 0;
  let cursor = new Date(anchor + 'T12:00:00');
  const dateSet = new Set(dates);

  while (dateSet.has(dateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function sessionsInWeekStarting(sessions: WorkoutSession[], weekStart: Date): WorkoutSession[] {
  const start = new Date(weekStart);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return sessions.filter((s) => {
    const t = new Date(s.completedAt).getTime();
    return t >= start.getTime() && t < end.getTime();
  });
}

/** Monday as week start */
export function getWeekStartMonday(d = new Date()) {
  const x = new Date(d);
  const day = x.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  x.setDate(x.getDate() + diff);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function weeklySetVolume(sessions: WorkoutSession[]): number {
  return sessions.reduce(
    (acc, s) =>
      acc +
      s.exercises.reduce(
        (eacc, ex) => eacc + ex.sets.filter((st) => st.completed !== false).length,
        0
      ),
    0
  );
}
