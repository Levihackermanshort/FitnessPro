import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { exercises } from '@/data/exercises';
import { getWarmupCooldownForWorkout } from '@/data/warmup-cooldown';
import type { Workout } from '@/data/workouts';
import type { CustomProgram, CustomProgramExercise } from '@/lib/fitness-types';
import {
  appendWorkoutSession,
  deleteCustomProgram,
  saveCustomProgram,
  uid,
} from '@/lib/fitness-storage';
import { useFitnessProfileData } from '@/hooks/use-fitness-data';
import { WarmupPrepSheet } from '@/components/WarmupPrepSheet';
import { WorkoutSessionTimer } from '@/components/WorkoutSessionTimer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ListPlus, Play, Plus, Search, Trash2, Dumbbell, Pencil } from 'lucide-react';

function customToRunnable(cp: CustomProgram): Pick<Workout, 'id' | 'name' | 'exercises'> {
  return {
    id: cp.id,
    name: cp.name,
    exercises: cp.exercises.map((e) => ({
      exerciseId: e.exerciseId,
      name: e.name,
      sets: e.sets,
      reps: e.reps,
      rest: e.rest,
      notes: e.notes,
    })),
  };
}

export function ProgramsPage() {
  const [data, refresh] = useFitnessProfileData();
  const programs = data.customPrograms;
  const [name, setName] = useState('My split');
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState<CustomProgramExercise[]>([]);
  const [timerOpen, setTimerOpen] = useState(false);
  const [prepOpen, setPrepOpen] = useState(false);
  const [activeRunnable, setActiveRunnable] = useState<ReturnType<typeof customToRunnable> | null>(
    null
  );

  const filteredExercises = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return exercises.slice(0, 40);
    return exercises
      .filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.equipment.some((x) => x.toLowerCase().includes(q))
      )
      .slice(0, 60);
  }, [query]);

  const addExercise = (id: string) => {
    const ex = exercises.find((e) => e.id === id);
    if (!ex) return;
    setRows((r) => [
      ...r,
      {
        exerciseId: ex.id,
        name: ex.name,
        sets: 3,
        reps: '8-12',
        rest: 90,
      },
    ]);
  };

  const updateRow = (index: number, patch: Partial<CustomProgramExercise>) => {
    setRows((r) => r.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  };

  const removeRow = (index: number) => setRows((r) => r.filter((_, i) => i !== index));

  const saveTemplate = () => {
    const cp: CustomProgram = {
      id: uid('prog'),
      name: name.trim() || 'Custom program',
      createdAt: new Date().toISOString(),
      exercises: rows,
    };
    saveCustomProgram(cp);
    refresh();
  };

  const startProgram = (cp: CustomProgram) => {
    const run = customToRunnable(cp);
    setActiveRunnable(run);
    const pseudo: Workout = {
      id: run.id,
      name: run.name,
      exercises: run.exercises,
      description: '',
      category: 'Specialty',
      duration: '',
      difficulty: 'Intermediate',
      frequency: '',
    };
    setPrepPack(getWarmupCooldownForWorkout(pseudo));
    setPrepOpen(true);
  };

  const [prepPack, setPrepPack] = useState(() =>
    getWarmupCooldownForWorkout({
      id: 'tmp',
      name: 'Custom',
      description: '',
      category: 'Full Body',
      duration: '',
      difficulty: 'Intermediate',
      frequency: '',
      exercises: [],
    })
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-2">
          <ListPlus className="w-8 h-8 text-primary" />
          Custom programs
        </h1>
        <p className="text-muted-foreground">
          Build a template from the exercise library, save it locally, and run it with the same timer
          and logging as preset workouts.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="glass rounded-xl border border-border p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Pencil className="w-4 h-4 text-primary" />
            Builder
          </h2>
          <div>
            <Label className="text-muted-foreground">Program name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label className="text-muted-foreground">Search exercises</Label>
            <div className="relative mt-1.5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Bench, legs, cable…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border border-border bg-secondary/30 divide-y divide-border">
              {filteredExercises.map((ex) => (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => addExercise(ex.id)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent/50 flex justify-between gap-2"
                >
                  <span className="text-foreground">{ex.name}</span>
                  <Plus className="w-4 h-4 text-primary shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-muted-foreground">Session ({rows.length} moves)</Label>
            {rows.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center border border-dashed border-border rounded-lg">
                Add exercises from the list above.
              </p>
            ) : (
              rows.map((row, i) => (
                <div
                  key={`${row.exerciseId}-${i}`}
                  className="rounded-lg border border-border p-3 bg-secondary/20 space-y-2"
                >
                  <div className="flex justify-between gap-2">
                    <span className="font-medium text-sm text-white">{row.name}</span>
                    <button
                      type="button"
                      onClick={() => removeRow(i)}
                      className="text-muted-foreground hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[10px] text-muted-foreground">Sets</span>
                      <Input
                        type="number"
                        min={1}
                        value={row.sets}
                        onChange={(e) => updateRow(i, { sets: parseInt(e.target.value, 10) || 1 })}
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground">Reps</span>
                      <Input
                        value={row.reps}
                        onChange={(e) => updateRow(i, { reps: e.target.value })}
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground">Rest (s)</span>
                      <Input
                        type="number"
                        min={0}
                        value={row.rest}
                        onChange={(e) => updateRow(i, { rest: parseInt(e.target.value, 10) || 0 })}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <Button className="w-full" onClick={saveTemplate} disabled={rows.length === 0}>
            Save template
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-primary" />
            Saved templates
          </h2>
          {programs.length === 0 ? (
            <p className="text-sm text-muted-foreground glass rounded-xl border border-border p-6">
              No saved programs yet. Build one on the left and click Save template.
            </p>
          ) : (
            <div className="space-y-3">
              {programs.map((cp) => (
                <div
                  key={cp.id}
                  className="glass rounded-xl border border-border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold text-white">{cp.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {cp.exercises.length} exercises • saved{' '}
                      {new Date(cp.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="gap-1"
                      onClick={() => startProgram(cp)}
                    >
                      <Play className="w-3.5 h-3.5" />
                      Start
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        deleteCustomProgram(cp.id);
                        refresh();
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {prepOpen && activeRunnable && (
          <WarmupPrepSheet
            title={activeRunnable.name}
            pack={prepPack}
            onClose={() => {
              setPrepOpen(false);
              setActiveRunnable(null);
            }}
            onStart={() => {
              setPrepOpen(false);
              setTimerOpen(true);
            }}
          />
        )}
        {timerOpen && activeRunnable && (
          <WorkoutSessionTimer
            workout={activeRunnable}
            source="custom"
            onClose={() => {
              setTimerOpen(false);
              setActiveRunnable(null);
            }}
            onSessionLogged={(session) => appendWorkoutSession(session)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
