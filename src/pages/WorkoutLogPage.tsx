import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  appendWorkoutSession,
  removeWorkoutSession,
  updateWorkoutSession,
} from '@/lib/fitness-storage';
import type { LoggedExercise, LoggedSet, WorkoutSession } from '@/lib/fitness-types';
import {
  computeTrainingStreak,
  getWeekStartMonday,
  sessionsInWeekStarting,
  weeklySetVolume,
} from '@/lib/workout-log-utils';
import { useFitnessProfileData } from '@/hooks/use-fitness-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Calendar,
  Flame,
  History,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Dumbbell,
} from 'lucide-react';

function dayLabel(d: Date) {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()];
}

function setsForDay(sessions: WorkoutSession[], ymd: string): number {
  return sessions
    .filter((s) => s.completedAt.slice(0, 10) === ymd)
    .reduce(
      (acc, s) =>
        acc +
        s.exercises.reduce(
          (a, ex) => a + ex.sets.filter((st) => st.completed !== false).length,
          0
        ),
      0
    );
}

function SessionEditor({
  session,
  onUpdate,
}: {
  session: WorkoutSession;
  onUpdate: (s: WorkoutSession) => void;
}) {
  const updateSet = (exIdx: number, setIdx: number, patch: Partial<LoggedSet>) => {
    const exercises = session.exercises.map((ex, i) => {
      if (i !== exIdx) return ex;
      const sets = ex.sets.map((st, j) => (j === setIdx ? { ...st, ...patch } : st));
      return { ...ex, sets };
    });
    onUpdate({ ...session, exercises });
  };

  return (
    <div className="space-y-4 mt-3">
      {session.exercises.map((ex, ei) => (
        <div key={ei} className="rounded-lg border border-border bg-secondary/30 p-3">
          <p className="text-sm font-medium text-foreground mb-2">{ex.name}</p>
          <div className="grid gap-2">
            {ex.sets.map((st, si) => (
              <div
                key={si}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs items-center"
              >
                <span className="text-muted-foreground">Set {si + 1}</span>
                <label className="flex items-center gap-1">
                  <span className="text-muted-foreground shrink-0">Reps</span>
                  <input
                    type="number"
                    className="w-full bg-background border border-border rounded px-2 py-1 text-foreground"
                    value={st.reps ?? ''}
                    placeholder="—"
                    onChange={(e) =>
                      updateSet(ei, si, {
                        reps: e.target.value ? parseInt(e.target.value, 10) : undefined,
                      })
                    }
                  />
                </label>
                <label className="flex items-center gap-1">
                  <span className="text-muted-foreground shrink-0">Wt</span>
                  <input
                    type="number"
                    className="w-full bg-background border border-border rounded px-2 py-1 text-foreground"
                    value={st.weight ?? ''}
                    placeholder="—"
                    onChange={(e) =>
                      updateSet(ei, si, {
                        weight: e.target.value ? parseFloat(e.target.value) : undefined,
                      })
                    }
                  />
                </label>
                <label className="flex items-center gap-1">
                  <span className="text-muted-foreground shrink-0">RPE</span>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="10"
                    className="w-full bg-background border border-border rounded px-2 py-1 text-foreground"
                    value={st.rpe ?? ''}
                    placeholder="—"
                    onChange={(e) =>
                      updateSet(ei, si, {
                        rpe: e.target.value ? parseFloat(e.target.value) : undefined,
                      })
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function WorkoutLogPage() {
  const [data] = useFitnessProfileData();
  const sessions = data.workoutSessions;
  const streak = useMemo(() => computeTrainingStreak(sessions), [sessions]);
  const weekStart = useMemo(() => getWeekStartMonday(), []);
  const thisWeekSessions = useMemo(
    () => sessionsInWeekStarting(sessions, weekStart),
    [sessions, weekStart]
  );
  const weekVolume = useMemo(() => weeklySetVolume(thisWeekSessions), [thisWeekSessions]);

  const chartData = useMemo(() => {
    const out: { label: string; sets: string; ymd: string }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const ymd = d.toISOString().slice(0, 10);
      out.push({
        label: dayLabel(d),
        ymd,
        sets: String(setsForDay(sessions, ymd)),
      });
    }
    return out;
  }, [sessions]);

  const [expanded, setExpanded] = useState<string | null>(null);
  const [manualOpen, setManualOpen] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualSets, setManualSets] = useState('3');

  const addManual = () => {
    const n = parseInt(manualSets, 10) || 3;
    const ex: LoggedExercise = {
      name: manualName.trim() || 'Custom exercise',
      sets: Array.from({ length: n }, () => ({ completed: true, reps: undefined })),
    };
    appendWorkoutSession({
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      source: 'manual',
      workoutName: 'Manual entry',
      exercises: [ex],
    });
    setManualName('');
    setManualSets('3');
    setManualOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-2">
            <History className="w-8 h-8 text-primary" />
            Workout log
          </h1>
          <p className="text-muted-foreground">
            This week’s volume, training streak, and full session history — stored locally in your
            browser.
          </p>
        </div>
        <Button onClick={() => setManualOpen((v) => !v)} variant="secondary" className="gap-2 shrink-0">
          <Plus className="w-4 h-4" />
          {manualOpen ? 'Close form' : 'Manual entry'}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <Flame className="w-4 h-4 text-orange-400" />
            Training streak
          </div>
          <p className="text-3xl font-bold text-white">{streak}</p>
          <p className="text-xs text-muted-foreground mt-1">Consecutive days with a logged session</p>
        </div>
        <div className="glass rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <Dumbbell className="w-4 h-4 text-primary" />
            This week (sets)
          </div>
          <p className="text-3xl font-bold text-primary">{weekVolume}</p>
          <p className="text-xs text-muted-foreground mt-1">Week starts Monday</p>
        </div>
        <div className="glass rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <Calendar className="w-4 h-4 text-blue-400" />
            Sessions (7d chart)
          </div>
          <p className="text-3xl font-bold text-white">{thisWeekSessions.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Completed workouts this week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 glass rounded-xl border border-border p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Sets logged (last 7 days)</h2>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelFormatter={(_, p) => String((p?.[0]?.payload as { ymd?: string })?.ymd ?? '')}
                />
                <Bar dataKey="sets" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} name="Sets" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {manualOpen && (
          <div className="glass rounded-xl border border-border p-5 h-fit">
            <h2 className="text-lg font-semibold text-white mb-3">Quick manual log</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Log a single movement when you trained outside the app timer.
            </p>
            <label className="block text-xs text-muted-foreground mb-1">Exercise name</label>
            <input
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm mb-3 text-foreground"
              value={manualName}
              onChange={(e) => setManualName(e.target.value)}
              placeholder="e.g. Trap bar deadlift"
            />
            <label className="block text-xs text-muted-foreground mb-1">Number of sets</label>
            <input
              type="number"
              min={1}
              max={20}
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm mb-4 text-foreground"
              value={manualSets}
              onChange={(e) => setManualSets(e.target.value)}
            />
            <Button className="w-full" onClick={addManual}>
              Save entry
            </Button>
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold text-white mb-4">Session history</h2>
      <div className="space-y-3">
        {sessions.length === 0 ? (
          <p className="text-muted-foreground text-sm py-8 text-center border border-dashed border-border rounded-xl">
            No sessions yet. Finish a program workout or add a manual entry.
          </p>
        ) : (
          sessions.map((s) => {
            const open = expanded === s.id;
            return (
              <div key={s.id} className="glass rounded-xl border border-border overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpanded(open ? null : s.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-accent/30 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-white">{s.workoutName}</span>
                      <Badge variant="outline" className="text-xs">
                        {s.source}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(s.completedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground hidden sm:inline">
                      {s.exercises.reduce((a, e) => a + e.sets.length, 0)} sets
                    </span>
                    {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>
                {open && (
                  <div className="px-4 pb-4 border-t border-border pt-3">
                    <SessionEditor
                      session={s}
                      onUpdate={(next) => {
                        updateWorkoutSession(s.id, next);
                      }}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-4 gap-2"
                      onClick={() => {
                        removeWorkoutSession(s.id);
                        setExpanded(null);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete session
                    </Button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
