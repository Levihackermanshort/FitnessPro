export interface WorkoutExercise {
  exerciseId: string;
  name: string;
  sets: number;
  reps: string;
  rest: number; // seconds
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  category: 'PPL' | 'Upper/Lower' | 'Full Body' | 'Bro Split' | 'Specialty';
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  frequency: string;
  exercises: WorkoutExercise[];
  schedule?: string[];
}

export const workouts: Workout[] = [
  // PPL SPLIT
  {
    id: 'push-day',
    name: 'Push Day - Hypertrophy',
    category: 'PPL',
    description: 'Chest, shoulders, and triceps focused hypertrophy session with emphasis on compound movements followed by isolation.',
    duration: '65-80 min',
    difficulty: 'Intermediate',
    frequency: '2x per week',
    schedule: ['Mon: Push A', 'Thu: Push B'],
    exercises: [
      { exerciseId: 'bench-press', name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: 120, notes: 'Progressive overload - add 2.5kg when you hit top of range' },
      { exerciseId: 'overhead-press', name: 'Overhead Press', sets: 3, reps: '8-12', rest: 120, notes: 'Standing, strict form' },
      { exerciseId: 'incline-dumbbell-press', name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: 90, notes: '30-degree incline' },
      { exerciseId: 'lateral-raise', name: 'Lateral Raises', sets: 4, reps: '12-15', rest: 60, notes: 'Controlled tempo, squeeze at top' },
      { exerciseId: 'cable-flyes', name: 'Cable Flyes', sets: 3, reps: '12-15', rest: 60, notes: 'Mid-chest height, deep stretch' },
      { exerciseId: 'tricep-pushdown', name: 'Tricep Pushdowns', sets: 4, reps: '12-15', rest: 60, notes: 'Rope attachment for peak contraction' },
      { exerciseId: 'tricep-dips', name: 'Tricep Dips', sets: 3, reps: '10-12', rest: 90, notes: 'Bodyweight or add weight belt' }
    ]
  },
  {
    id: 'pull-day',
    name: 'Pull Day - Hypertrophy',
    category: 'PPL',
    description: 'Back thickness and width, rear delts, and biceps for a complete posterior chain workout.',
    duration: '65-80 min',
    difficulty: 'Intermediate',
    frequency: '2x per week',
    schedule: ['Tue: Pull A', 'Fri: Pull B'],
    exercises: [
      { exerciseId: 'deadlift', name: 'Deadlift', sets: 3, reps: '5-6', rest: 180, notes: 'Conventional, reset each rep' },
      { exerciseId: 'pull-ups', name: 'Pull-ups', sets: 4, reps: '8-12', rest: 120, notes: 'Add weight when 12 reps achieved' },
      { exerciseId: 'barbell-row', name: 'Barbell Row', sets: 4, reps: '8-10', rest: 120, notes: 'Pendlay style or controlled' },
      { exerciseId: 'face-pulls', name: 'Face Pulls', sets: 4, reps: '15-20', rest: 60, notes: 'External rotation at end, light weight' },
      { exerciseId: 'lat-pulldown', name: 'Lat Pulldown', sets: 3, reps: '10-12', rest: 90, notes: 'Squeeze lats at bottom' },
      { exerciseId: 'barbell-curl', name: 'Barbell Curl', sets: 4, reps: '10-12', rest: 60, notes: 'EZ bar preferred for wrist health' },
      { exerciseId: 'hammer-curls', name: 'Hammer Curls', sets: 3, reps: '12-15', rest: 60, notes: 'Alternate arms or simultaneous' }
    ]
  },
  {
    id: 'leg-day',
    name: 'Leg Day - Hypertrophy',
    category: 'PPL',
    description: 'Complete lower body development targeting quads, hamstrings, glutes, and calves with high volume.',
    duration: '75-90 min',
    difficulty: 'Intermediate',
    frequency: '2x per week',
    schedule: ['Wed: Legs A', 'Sat: Legs B'],
    exercises: [
      { exerciseId: 'squat', name: 'Barbell Back Squat', sets: 4, reps: '6-8', rest: 180, notes: 'ATG or parallel based on mobility' },
      { exerciseId: 'romanian-deadlift', name: 'Romanian Deadlift', sets: 4, reps: '8-10', rest: 120, notes: 'Hamstring stretch is your depth guide' },
      { exerciseId: 'leg-press', name: 'Leg Press', sets: 4, reps: '10-12', rest: 120, notes: 'High/wide foot placement' },
      { exerciseId: 'walking-lunges', name: 'Walking Lunges', sets: 3, reps: '12 each', rest: 90, notes: 'Dumbbells at sides' },
      { exerciseId: 'leg-curl', name: 'Lying Leg Curl', sets: 3, reps: '12-15', rest: 60, notes: 'Squeeze at peak contraction' },
      { exerciseId: 'calf-raise', name: 'Standing Calf Raise', sets: 5, reps: '15-20', rest: 60, notes: 'Full stretch at bottom, 2s hold at top' },
      { exerciseId: 'hanging-leg-raise', name: 'Hanging Leg Raises', sets: 4, reps: '12-15', rest: 60, notes: 'Pelvis tuck for lower ab activation' }
    ]
  },
  // UPPER/LOWER SPLIT
  {
    id: 'upper-power',
    name: 'Upper Body - Power',
    category: 'Upper/Lower',
    description: 'Strength-focused upper session with lower rep ranges and longer rest periods for power development.',
    duration: '60-75 min',
    difficulty: 'Intermediate',
    frequency: '2x per week',
    schedule: ['Mon: Upper Power', 'Thu: Upper Hypertrophy'],
    exercises: [
      { exerciseId: 'bench-press', name: 'Barbell Bench Press', sets: 5, reps: '4-6', rest: 180, notes: '85% 1RM, explosive concentric' },
      { exerciseId: 'barbell-row', name: 'Barbell Row', sets: 5, reps: '5-6', rest: 150, notes: 'Heavy and controlled' },
      { exerciseId: 'overhead-press', name: 'Overhead Press', sets: 4, reps: '5-6', rest: 150, notes: 'Strict form, no leg drive' },
      { exerciseId: 'pull-ups', name: 'Weighted Pull-ups', sets: 4, reps: '5-8', rest: 150, notes: 'Add weight belt when ready' },
      { exerciseId: 'dips', name: 'Weighted Dips', sets: 3, reps: '6-8', rest: 120, notes: 'Forward lean for chest focus' }
    ]
  },
  {
    id: 'upper-hypertrophy',
    name: 'Upper Body - Hypertrophy',
    category: 'Upper/Lower',
    description: 'Volume-focused upper session for muscle growth with higher reps and shorter rest.',
    duration: '65-80 min',
    difficulty: 'Intermediate',
    frequency: '2x per week',
    schedule: ['Tue: Lower Power', 'Fri: Lower Hypertrophy'],
    exercises: [
      { exerciseId: 'incline-dumbbell-press', name: 'Incline Dumbbell Press', sets: 4, reps: '10-12', rest: 90, notes: '45-degree incline' },
      { exerciseId: 'lat-pulldown', name: 'Lat Pulldown', sets: 4, reps: '10-12', rest: 90, notes: 'Wide grip, drive elbows down' },
      { exerciseId: 'lateral-raise', name: 'Lateral Raises', sets: 4, reps: '15', rest: 60, notes: 'Light weight, perfect form' },
      { exerciseId: 'cable-flyes', name: 'Cable Flyes', sets: 3, reps: '12-15', rest: 60, notes: 'Squeeze at peak' },
      { exerciseId: 'face-pulls', name: 'Face Pulls', sets: 4, reps: '15-20', rest: 60, notes: 'Rear delt and rotator cuff health' },
      { exerciseId: 'barbell-curl', name: 'Barbell Curl', sets: 4, reps: '10-12', rest: 60, notes: 'Full range of motion' },
      { exerciseId: 'tricep-pushdown', name: 'Tricep Pushdowns', sets: 4, reps: '12-15', rest: 60, notes: 'Rope or straight bar' }
    ]
  },
  {
    id: 'lower-power',
    name: 'Lower Body - Power',
    category: 'Upper/Lower',
    description: 'Strength-focused lower session for building squat and deadlift numbers.',
    duration: '60-75 min',
    difficulty: 'Intermediate',
    frequency: '2x per week',
    exercises: [
      { exerciseId: 'squat', name: 'Barbell Squat', sets: 5, reps: '4-6', rest: 180, notes: 'Low bar position preferred' },
      { exerciseId: 'deadlift', name: 'Deadlift', sets: 3, reps: '3-5', rest: 240, notes: 'Conventional, heavy' },
      { exerciseId: 'leg-press', name: 'Leg Press', sets: 4, reps: '8-10', rest: 120, notes: 'High foot placement for glutes' },
      { exerciseId: 'calf-raise', name: 'Standing Calf Raise', sets: 5, reps: '8-10', rest: 90, notes: 'Heavy, controlled' }
    ]
  },
  {
    id: 'lower-hypertrophy',
    name: 'Lower Body - Hypertrophy',
    category: 'Upper/Lower',
    description: 'Volume-focused leg day for size and muscular development.',
    duration: '65-80 min',
    difficulty: 'Intermediate',
    frequency: '2x per week',
    exercises: [
      { exerciseId: 'romanian-deadlift', name: 'Romanian Deadlift', sets: 4, reps: '10-12', rest: 120, notes: 'Feel the hamstring stretch' },
      { exerciseId: 'walking-lunges', name: 'Walking Lunges', sets: 3, reps: '15 each', rest: 90, notes: 'Dumbbells at sides' },
      { exerciseId: 'leg-extension', name: 'Leg Extension', sets: 4, reps: '15-20', rest: 60, notes: 'Quad isolation, squeeze at top' },
      { exerciseId: 'leg-curl', name: 'Lying Leg Curl', sets: 4, reps: '12-15', rest: 60, notes: 'Control the lowering phase' },
      { exerciseId: 'hip-thrust', name: 'Barbell Hip Thrust', sets: 4, reps: '12-15', rest: 90, notes: 'Squeeze glutes hard at top' },
      { exerciseId: 'calf-raise', name: 'Seated Calf Raise', sets: 5, reps: '15-20', rest: 60, notes: 'Targets soleus muscle' }
    ]
  },
  // FULL BODY
  {
    id: 'full-body-a',
    name: 'Full Body A',
    category: 'Full Body',
    description: 'Efficient full-body routine perfect for beginners or those with limited training days.',
    duration: '50-65 min',
    difficulty: 'Beginner',
    frequency: '3x per week',
    schedule: ['Mon: Full Body A', 'Wed: Full Body B', 'Fri: Full Body C'],
    exercises: [
      { exerciseId: 'squat', name: 'Barbell Squat', sets: 3, reps: '8-10', rest: 120, notes: 'Focus on depth and form' },
      { exerciseId: 'bench-press', name: 'Barbell Bench Press', sets: 3, reps: '8-10', rest: 120, notes: 'Control the eccentric' },
      { exerciseId: 'barbell-row', name: 'Barbell Row', sets: 3, reps: '8-10', rest: 120, notes: 'Squeeze shoulder blades' },
      { exerciseId: 'overhead-press', name: 'Overhead Press', sets: 3, reps: '10-12', rest: 90, notes: 'Strict form, no leg drive' },
      { exerciseId: 'lat-pulldown', name: 'Lat Pulldown', sets: 3, reps: '10-12', rest: 90, notes: 'Focus on lat contraction' },
      { exerciseId: 'plank', name: 'Front Plank', sets: 3, reps: '45-60s', rest: 60, notes: 'Core braced, straight line' }
    ]
  },
  {
    id: 'full-body-b',
    name: 'Full Body B',
    category: 'Full Body',
    description: 'Variation B with different exercise selection to ensure balanced development.',
    duration: '50-65 min',
    difficulty: 'Beginner',
    frequency: '3x per week',
    schedule: ['Mon: Full Body A', 'Wed: Full Body B', 'Fri: Full Body C'],
    exercises: [
      { exerciseId: 'deadlift', name: 'Conventional Deadlift', sets: 3, reps: '6-8', rest: 150, notes: 'Reset each rep, flat back' },
      { exerciseId: 'incline-dumbbell-press', name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: 90, notes: '30-degree incline' },
      { exerciseId: 'pull-ups', name: 'Pull-ups', sets: 3, reps: '8-12', rest: 90, notes: 'Use assisted if needed' },
      { exerciseId: 'walking-lunges', name: 'Walking Lunges', sets: 3, reps: '12 each', rest: 90, notes: 'Bodyweight or light dumbbells' },
      { exerciseId: 'lateral-raise', name: 'Lateral Raises', sets: 3, reps: '12-15', rest: 60, notes: 'Light weight, controlled' },
      { exerciseId: 'hanging-leg-raise', name: 'Hanging Leg Raises', sets: 3, reps: '10-12', rest: 60, notes: 'Knee raises if needed' }
    ]
  },
  // BRO SPLIT
  {
    id: 'chest-day',
    name: 'Chest Day',
    category: 'Bro Split',
    description: 'Dedicated chest session for maximum pec stimulation and growth.',
    duration: '60-75 min',
    difficulty: 'Intermediate',
    frequency: '1x per week',
    schedule: ['Mon: Chest', 'Tue: Back', 'Wed: Legs', 'Thu: Shoulders', 'Fri: Arms'],
    exercises: [
      { exerciseId: 'bench-press', name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: 120, notes: 'Heavy compound starter' },
      { exerciseId: 'incline-dumbbell-press', name: 'Incline Dumbbell Press', sets: 4, reps: '10-12', rest: 90, notes: 'Upper chest focus' },
      { exerciseId: 'dumbbell-flyes', name: 'Dumbbell Flyes', sets: 3, reps: '12-15', rest: 60, notes: 'Deep stretch at bottom' },
      { exerciseId: 'cable-flyes', name: 'Cable Flyes', sets: 3, reps: '15', rest: 60, notes: 'High-to-low for lower chest' },
      { exerciseId: 'dips', name: 'Chest Dips', sets: 3, reps: '10-12', rest: 90, notes: 'Forward lean' },
      { exerciseId: 'push-ups', name: 'Push-ups', sets: 3, reps: 'To failure', rest: 60, notes: 'Burnout finisher' }
    ]
  },
  {
    id: 'arm-day',
    name: 'Arm Day',
    category: 'Bro Split',
    description: 'Dedicated arm session for maximum bicep and tricep pump and growth.',
    duration: '55-70 min',
    difficulty: 'Intermediate',
    frequency: '1x per week',
    schedule: ['Mon: Chest', 'Tue: Back', 'Wed: Legs', 'Thu: Shoulders', 'Fri: Arms'],
    exercises: [
      { exerciseId: 'barbell-curl', name: 'Barbell Curl', sets: 4, reps: '10-12', rest: 60, notes: 'EZ bar for wrist comfort' },
      { exerciseId: 'hammer-curls', name: 'Hammer Curls', sets: 4, reps: '12', rest: 60, notes: 'Brachialis focus' },
      { exerciseId: 'preacher-curl', name: 'Preacher Curl', sets: 3, reps: '10-12', rest: 60, notes: 'Strict isolation' },
      { exerciseId: 'concentration-curl', name: 'Concentration Curl', sets: 3, reps: '12 each', rest: 60, notes: 'Peak contraction focus' },
      { exerciseId: 'tricep-pushdown', name: 'Tricep Pushdowns', sets: 4, reps: '12-15', rest: 60, notes: 'Rope attachment' },
      { exerciseId: 'skullcrushers', name: 'Skullcrushers', sets: 3, reps: '10-12', rest: 60, notes: 'EZ bar, control the eccentric' },
      { exerciseId: 'tricep-dips', name: 'Tricep Dips', sets: 3, reps: '10-12', rest: 90, notes: 'Add weight if needed' }
    ]
  }
];

export const workoutCategories = ['PPL', 'Upper/Lower', 'Full Body', 'Bro Split', 'Specialty'] as const;

export const getWorkoutsByCategory = (category: Workout['category']) =>
  workouts.filter(w => w.category === category);

export const getWorkoutById = (id: string) => workouts.find(w => w.id === id);
