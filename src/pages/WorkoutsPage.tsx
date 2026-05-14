import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { workouts, type Workout } from '@/data/workouts';
import { getWarmupCooldownForWorkout } from '@/data/warmup-cooldown';
import { appendWorkoutSession } from '@/lib/fitness-storage';
import { WarmupPrepSheet } from '@/components/WarmupPrepSheet';
import { WorkoutSessionTimer } from '@/components/WorkoutSessionTimer';
import { cn } from '@/lib/utils';
import {
  Clock,
  BarChart3,
  Dumbbell,
  ChevronDown,
  ChevronUp,
  Play,
  Zap,
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

/* ─── Workout Card ─── */
function WorkoutCard({ workout }: { workout: Workout }) {
  const [expanded, setExpanded] = useState(false);
  const [timerOpen, setTimerOpen] = useState(false);
  const [prepOpen, setPrepOpen] = useState(false);
  const prepPack = getWarmupCooldownForWorkout(workout);

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

        <Button
          onClick={() => setPrepOpen(true)}
          className="w-full gap-2"
        >
          <Play className="w-4 h-4" /> Start Workout
        </Button>
      </motion.div>

      <AnimatePresence>
        {prepOpen && (
          <WarmupPrepSheet
            title={workout.name}
            pack={prepPack}
            onClose={() => setPrepOpen(false)}
            onStart={() => {
              setPrepOpen(false);
              setTimerOpen(true);
            }}
          />
        )}
        {timerOpen && (
          <WorkoutSessionTimer
            workout={workout}
            source="preset"
            onClose={() => setTimerOpen(false)}
            onSessionLogged={(session) => appendWorkoutSession(session)}
          />
        )}
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
