import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { workouts, type Workout } from '@/data/workouts';
import { cn } from '@/lib/utils';
import {
  Clock,
  BarChart3,
  Dumbbell,
  ChevronDown,
  ChevronUp,
  Play,
  X,
  Pause,
  RotateCcw,
  SkipForward,
  CheckCircle2,
  Zap,
  Timer,
  Trophy,
  TrendingUp,
  Flame,
  Calendar
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const difficultyConfig = {
  Beginner: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Advanced: 'text-red-400 bg-red-400/10 border-red-400/20',
};

const categoryConfig: Record<string, string> = {
  'PPL': 'from-blue-500/20 to-blue-600/5 border-blue-500/20',
  'Upper/Lower': 'from-purple-500/20 to-purple-600/5 border-purple-500/20',
  'Full Body': 'from-primary/20 to-primary/5 border-primary/20',
  'Bro Split': 'from-amber-500/20 to-amber-600/5 border-amber-500/20',
  'Specialty': 'from-red-500/20 to-red-600/5 border-red-500/20',
};

/* ─── Workout Timer Modal ─── */
function WorkoutTimer({ workout, onClose }: { workout: Workout; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedSets, setCompletedSets] = useState<Record<number, boolean[]>>({});
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
          className="bg-card border border-border rounded-2xl max-w-md w-full p-8 text-center"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Workout Complete!</h2>
          <p className="text-muted-foreground mb-6">
            You crushed {workout.name}. {totalSetsCompleted} sets completed across{' '}
            {workout.exercises.length} exercises.
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
            Back to Workouts
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
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-accent transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
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

        {/* Progress Bar */}
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

        {/* Rest Timer or Set Tracker */}
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
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setTimerActive(!timerActive)}
              >
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

        {/* Navigation */}
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

        {/* Exercise Preview (up next) */}
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

/* ─── Workout Card ─── */
function WorkoutCard({ workout }: { workout: Workout }) {
  const [expanded, setExpanded] = useState(false);
  const [timerOpen, setTimerOpen] = useState(false);

  return (
    <>
      <motion.div
        layout
        className={cn(
          'glass rounded-xl border p-5 card-hover bg-gradient-to-br',
          categoryConfig[workout.category] || 'from-primary/20 to-primary/5 border-primary/20'
        )}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <Badge variant="outline" className="mb-2 text-blue-400 bg-blue-400/10 border-blue-400/20">
              {workout.category}
            </Badge>
            <h3 className="text-xl font-bold text-white">{workout.name}</h3>
          </div>
          <Badge variant="outline" className={difficultyConfig[workout.difficulty]}>
            {workout.difficulty}
          </Badge>
        </div>

        <p className="text-muted-foreground text-sm mb-4">{workout.description}</p>

        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {workout.duration}
          </span>
          <span className="flex items-center gap-1">
            <BarChart3 className="w-4 h-4" /> {workout.exercises.length} exercises
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {workout.frequency}
          </span>
        </div>

        {/* Weekly Schedule */}
        {workout.schedule && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {workout.schedule.map((s, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground border border-border"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-muted-foreground text-sm hover:text-foreground transition-colors mb-3"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {expanded ? 'Hide exercises' : `View ${workout.exercises.length} exercises`}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 mb-4">
                {workout.exercises.map((ex, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{ex.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {ex.sets} sets × {ex.reps} • Rest {formatTime(ex.rest)}
                          {ex.notes && ` • ${ex.notes}`}
                        </p>
                      </div>
                    </div>
                    <Dumbbell className="w-4 h-4 text-muted-foreground/40" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button onClick={() => setTimerOpen(true)} className="w-full gap-2">
          <Play className="w-4 h-4" /> Start Workout
        </Button>
      </motion.div>

      <AnimatePresence>
        {timerOpen && <WorkoutTimer workout={workout} onClose={() => setTimerOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function WorkoutsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'PPL', 'Upper/Lower', 'Full Body', 'Bro Split'];

  const filtered =
    selectedCategory === 'All'
      ? workouts
      : workouts.filter((w) => w.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Workout Programs</h1>
        <p className="text-muted-foreground">
          Ready-made routines with set/rep schemes, rest periods, and built-in workout timers.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium border transition-all',
              selectedCategory === cat
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-primary/30'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Workouts Grid */}
      <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence>
          {filtered.map((workout) => (
            <motion.div
              key={workout.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <WorkoutCard workout={workout} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Weekly Schedule Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 glass rounded-2xl border border-border p-6 md:p-8"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" /> Weekly Schedule Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-secondary/50 rounded-xl p-5 border border-border">
            <h3 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" /> PPL 6-Day Split
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {['Mon: Push (Chest/Shoulders/Triceps)', 'Tue: Pull (Back/Biceps)', 'Wed: Legs (Quads/Hams/Calves)', 'Thu: Push (Volume)', 'Fri: Pull (Volume)', 'Sat: Legs (Volume)', 'Sun: Rest'].map((day, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  {day}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-secondary/50 rounded-xl p-5 border border-border">
            <h3 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Upper/Lower 4-Day
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {['Mon: Upper Power', 'Tue: Lower Power', 'Wed: Rest/Cardio', 'Thu: Upper Hypertrophy', 'Fri: Lower Hypertrophy', 'Sat: Active Recovery', 'Sun: Rest'].map((day, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  {day}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-secondary/50 rounded-xl p-5 border border-border">
            <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
              <Flame className="w-4 h-4" /> Full Body 3-Day
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {['Mon: Full Body A (Squat/Bench/Row)', 'Tue: Rest/Cardio', 'Wed: Full Body B (Deadlift/Press/Pull-ups)', 'Thu: Rest', 'Fri: Full Body C (Variation Day)', 'Sat: Active Recovery', 'Sun: Rest'].map((day, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {day}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
