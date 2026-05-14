/** Shared types for local-first fitness data (per browser profile). */

export interface FitnessProfile {
  id: string;
  name: string;
  createdAt: string;
}

export interface LoggedSet {
  completed?: boolean;
  reps?: number;
  weight?: number;
  rpe?: number;
}

export interface LoggedExercise {
  exerciseId?: string;
  name: string;
  sets: LoggedSet[];
}

export interface WorkoutSession {
  id: string;
  startedAt: string;
  completedAt: string;
  source: 'preset' | 'custom' | 'manual';
  workoutId?: string;
  workoutName: string;
  exercises: LoggedExercise[];
  notes?: string;
}

export interface CustomProgramExercise {
  exerciseId: string;
  name: string;
  sets: number;
  reps: string;
  rest: number;
  notes?: string;
}

export interface CustomProgram {
  id: string;
  name: string;
  createdAt: string;
  exercises: CustomProgramExercise[];
}

export interface DailyRecovery {
  date: string; // YYYY-MM-DD
  sleepHours?: number;
  steps?: number;
  notes?: string;
}

export interface SavedMeal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients?: string[];
  createdAt: string;
}

export interface ReminderConfig {
  id: string;
  label: string;
  time: string; // HH:mm 24h
  days: number[]; // 0 Sun .. 6 Sat
  enabled: boolean;
  kind: 'water' | 'workout' | 'meal_prep' | 'custom';
}

export interface FitnessExportPayload {
  version: 1;
  exportedAt: string;
  profile: FitnessProfile;
  workoutSessions: WorkoutSession[];
  customPrograms: CustomProgram[];
  savedMeals: SavedMeal[];
  recoveryDays: DailyRecovery[];
  reminders: ReminderConfig[];
  shoppingListExtra: string[];
  progressEntries?: { date: string; weight: number; bodyfat?: number }[];
  waterGlassesByDate?: Record<string, number>;
}
