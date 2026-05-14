import type { Workout } from '@/data/workouts';

export interface PrepBlock {
  title: string;
  durationMin: number;
  steps: string[];
}

export interface WarmupCooldownPack {
  warmup: PrepBlock[];
  cooldown: PrepBlock[];
}

const genericUpper: WarmupCooldownPack = {
  warmup: [
    {
      title: 'General pulse (4 min)',
      durationMin: 4,
      steps: [
        'Easy row, bike, or brisk walk until you feel warm',
        'Shoulder rolls × 10 each direction',
        'Arm circles × 10 each size',
      ],
    },
    {
      title: 'Shoulder & T-spine (4 min)',
      durationMin: 4,
      steps: [
        'Band pull-aparts × 15',
        'Wall slides × 12',
        'Cat-cow on bench or floor × 10',
      ],
    },
    {
      title: 'Pattern prep (3 min)',
      durationMin: 3,
      steps: [
        'Empty bar or light DB presses × 12–15',
        'Gradually add load for 2–3 warm-up sets before working sets',
      ],
    },
  ],
  cooldown: [
    {
      title: 'Upper cooldown (6 min)',
      durationMin: 6,
      steps: [
        'Light walking 2 min',
        'Cross-body shoulder stretch 45s each',
        'Triceps overhead stretch 45s each',
        'Doorway pec stretch 45s each',
      ],
    },
  ],
};

const lower: WarmupCooldownPack = {
  warmup: [
    {
      title: 'Pulse & hips (5 min)',
      durationMin: 5,
      steps: [
        'Bike or walk until lightly sweating',
        'Leg swings × 10 each leg',
        'Bodyweight squats × 15',
      ],
    },
    {
      title: 'Activation (5 min)',
      durationMin: 5,
      steps: [
        'Glute bridge × 15',
        'Mini-band lateral walks × 12 each way',
        'Split squat hold 30s each leg',
      ],
    },
    {
      title: 'Squat pattern (4 min)',
      durationMin: 4,
      steps: [
        'Goblet squat with light weight × 12',
        'Add load across 2–3 ramp-up sets before work sets',
      ],
    },
  ],
  cooldown: [
    {
      title: 'Lower cooldown (8 min)',
      durationMin: 8,
      steps: [
        'Easy bike or walk 3 min',
        'Couch stretch 60s each quad',
        'Seated hamstring fold 60s each',
        'Pigeon pose 60s each glute',
      ],
    },
  ],
};

const fullBody: WarmupCooldownPack = {
  warmup: [
    {
      title: 'Full-body pulse (5 min)',
      durationMin: 5,
      steps: ['Row, ski, or jog until warm', 'Jumping jacks or line hops × 20'],
    },
    {
      title: 'Hinge + push prep (6 min)',
      durationMin: 6,
      steps: [
        'Hip hinge with PVC × 12',
        'Scap push-ups × 12',
        'Lunge with twist × 8 each leg',
      ],
    },
    {
      title: 'Specific ramps (5 min)',
      durationMin: 5,
      steps: [
        'Practice today’s main lifts with 40–60% load for higher reps',
        'Stop before fatigue — save energy for work sets',
      ],
    },
  ],
  cooldown: [
    {
      title: 'Full-body flush (7 min)',
      durationMin: 7,
      steps: [
        'Light movement 3 min',
        'World’s greatest stretch × 5 each side',
        'Child’s pose breathing 90s',
      ],
    },
  ],
};

const bro: WarmupCooldownPack = {
  warmup: [
    {
      title: 'Muscle focus (6 min)',
      durationMin: 6,
      steps: [
        'Light cardio 3 min for the muscle you train first',
        'High-rep isolation with light weight for target muscle × 20',
      ],
    },
    {
      title: 'Joint prep (4 min)',
      durationMin: 4,
      steps: ['Dynamic stretches for the joints used today', 'Band work for shoulders or hips as needed'],
    },
  ],
  cooldown: [
    {
      title: 'Bro split cooldown (5 min)',
      durationMin: 5,
      steps: ['Light pump-down sets or walking', 'Stretch the muscles trained today 45–60s each'],
    },
  ],
};

const specialty: WarmupCooldownPack = {
  warmup: [
    {
      title: 'Prep (5 min)',
      durationMin: 5,
      steps: ['Easy cardio', 'Dynamic mobility for the session focus'],
    },
  ],
  cooldown: [
    {
      title: 'Cooldown (5 min)',
      durationMin: 5,
      steps: ['Easy walking', 'Gentle static stretches for worked areas'],
    },
  ],
};

export function getWarmupCooldownForWorkout(workout: Workout): WarmupCooldownPack {
  switch (workout.category) {
    case 'PPL':
      if (workout.name.toLowerCase().includes('leg')) return lower;
      if (workout.name.toLowerCase().includes('pull') || workout.name.toLowerCase().includes('push'))
        return genericUpper;
      return fullBody;
    case 'Upper/Lower':
      if (workout.name.toLowerCase().includes('lower')) return lower;
      return genericUpper;
    case 'Full Body':
      return fullBody;
    case 'Bro Split':
      return bro;
    default:
      return specialty;
  }
}
