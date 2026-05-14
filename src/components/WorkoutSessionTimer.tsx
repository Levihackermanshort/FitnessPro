import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import type { WorkoutExercise } from '@/data/workouts';
import type { WorkoutSession } from '@/lib/fitness-types';
import { buildSessionFromTimer } from '@/lib/workout-session-builder';
import { cn } from '@/lib/utils';
import {
  X,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  CheckCircle2,
  Timer,
  Trophy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export type RunnableWorkout = {
  id: string;
  name: string;
  exercises: WorkoutExercise[];
};

type Source = 'preset' | 'custom';

export function WorkoutSessionTimer({
  workout,
  source = 'preset',
  onClose,
  onSessionLogged,
}: {
  workout: RunnableWorkout;
  source?: Source;
  onClose: () => void;
  onSessionLogged?: (session: Omit<WorkoutSession, 'id'>) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedSets, setCompletedSets] = useState<Record<number, boolean[]>>({});
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const loggedRef = useRef(false);
  const completedSetsRef = useRef(completedSets);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  completedSetsRef.current = completedSets;

  const currentExercise = workout.exercises[currentIndex];
  const restDuration = currentExercise?.rest || 60;

  useEffect(() => {
    if (isResting && timerActive && restTime > 0) {
      intervalRef.current = setInterval(() => setRestTime((t) => t - 1), 1000);
    } else if (restTime === 0 && isResting) {
      setIsResting(false);
      setTimerActive(false);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isResting, timerActive, restTime]);

  const startRest = useCallback(() => {
    setRestTime(restDuration);
    setIsResting(true);
    setTimerActive(true);
  }, [restDuration]);

  const toggleSetComplete = (setIndex: number) => {
    const sets = completedSets[currentIndex] || new Array(currentExercise.sets).fill(false);
    sets[setIndex] = !sets[setIndex];
    setCompletedSets((prev) => ({ ...prev, [currentIndex]: sets }));

    if (sets[setIndex] && setIndex < currentExercise.sets - 1) {
      startRest();
    }
  };

  const nextExercise = () => {
    if (currentIndex < workout.exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsResting(false);
      setTimerActive(false);
    } else {
      if (!loggedRef.current && onSessionLogged) {
        loggedRef.current = true;
        const session = buildSessionFromTimer(workout, completedSetsRef.current, source);
        onSessionLogged(session);
      }
      setWorkoutComplete(true);
    }
  };

  const prevExercise = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsResting(false);
      setTimerActive(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const sets = completedSets[currentIndex] || new Array(currentExercise?.sets || 0).fill(false);
  const allComplete = sets.every(Boolean);
  const totalSetsCompleted = Object.values(completedSets).reduce(
    (acc, curr) => acc + curr.filter(Boolean).length,
    0
  );
  const totalSets = workout.exercises.reduce((acc, ex) => acc + ex.sets, 0);

  if (workoutComplete) {
    return (
      <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border rounded-2xl max-w-md w-full p-8 text-center max-h-[90vh] overflow-y-auto"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Workout Complete!</h2>
          <p className="text-muted-foreground mb-4">
            You crushed {workout.name}. {totalSetsCompleted} sets completed across{' '}
            {workout.exercises.length} exercises.
          </p>
          <p className="text-xs text-muted-foreground mb-6 text-left glass rounded-lg p-3 border border-border">
            Session saved to your Workout log. Add weights, reps, and RPE there anytime. Take 5–10
            minutes for light cooldown stretching before you leave the gym.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-secondary rounded-lg p-3">
              <div className="text-2xl font-bold text-white">{totalSetsCompleted}</div>
              <div className="text-xs text-muted-foreground">Sets Done</div>
            </div>
            <div className="bg-secondary rounded-lg p-3">
              <div className="text-2xl font-bold text-primary">{workout.exercises.length}</div>
              <div className="text-xs text-muted-foreground">Exercises</div>
            </div>
          </div>
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </motion.div>
      </div>
    );
  }

  if (!currentExercise) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-accent transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-primary font-semibold">
              Exercise {currentIndex + 1} of {workout.exercises.length}
            </span>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">
              {workout.name}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{currentExercise.name}</h2>
          <p className="text-muted-foreground text-sm">
            {currentExercise.sets} sets × {currentExercise.reps} • Rest {formatTime(currentExercise.rest)}
            {currentExercise.notes && ` • ${currentExercise.notes}`}
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Workout Progress</span>
            <span>
              {totalSetsCompleted}/{totalSets} sets
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(totalSetsCompleted / totalSets) * 100}%` }}
            />
          </div>
        </div>

        {isResting ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-primary text-sm font-semibold mb-3">
              <Timer className="w-4 h-4" /> REST PERIOD
            </div>
            <div
              className={cn(
                'text-6xl font-bold font-mono mb-4',
                restTime < 10 ? 'text-red-400' : 'text-white'
              )}
            >
              {formatTime(restTime)}
            </div>
            <div className="flex justify-center gap-2">
              <Button size="sm" variant="secondary" onClick={() => setTimerActive(!timerActive)}>
                {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="secondary" onClick={startRest}>
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="default"
                onClick={() => {
                  setIsResting(false);
                  setTimerActive(false);
                }}
              >
                Skip Rest
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
            {sets.map((complete, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleSetComplete(i)}
                className={cn(
                  'p-3 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2',
                  complete
                    ? 'bg-primary/20 border-primary/50 text-primary'
                    : 'bg-secondary border-border text-muted-foreground hover:border-primary/30'
                )}
              >
                {complete && <CheckCircle2 className="w-4 h-4" />}
                Set {i + 1}
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={prevExercise} disabled={currentIndex === 0} size="sm">
            Previous
          </Button>
          {allComplete && !isResting && (
            <Button onClick={nextExercise} className="gap-2" size="sm">
              {currentIndex < workout.exercises.length - 1 ? (
                <>
                  Next Exercise <SkipForward className="w-4 h-4" />
                </>
              ) : (
                <>
                  Finish <Trophy className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </div>

        {currentIndex < workout.exercises.length - 1 && (
          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1">Up Next</p>
            <p className="text-sm font-medium text-foreground">
              {workout.exercises[currentIndex + 1].name}
            </p>
            <p className="text-xs text-muted-foreground">
              {workout.exercises[currentIndex + 1].sets} sets ×{' '}
              {workout.exercises[currentIndex + 1].reps}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
