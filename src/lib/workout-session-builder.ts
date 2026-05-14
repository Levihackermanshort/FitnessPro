import type { WorkoutExercise } from '@/data/workouts';
import type { WorkoutSession } from '@/lib/fitness-types';

/**
 * Build a log entry from the in-app timer. Per-set completion is preserved;
 * reps/weight/RPE can be filled later on the Log page.
 */
export function buildSessionFromTimer(
  workout: { id: string; name: string; exercises: WorkoutExercise[] },
  completedSets: Record<number, boolean[]>,
  source: 'preset' | 'custom' = 'preset'
): Omit<WorkoutSession, 'id'> {
  const now = new Date().toISOString();
  const exercises = workout.exercises.map((ex, idx) => {
    const flags = completedSets[idx] ?? Array(ex.sets).fill(false);
    const sets = flags.map((done) => ({
      completed: done,
    }));
    return {
      exerciseId: ex.exerciseId,
      name: ex.name,
      sets,
    };
  });

  return {
    startedAt: now,
    completedAt: now,
    source,
    workoutId: workout.id,
    workoutName: workout.name,
    exercises,
  };
}
