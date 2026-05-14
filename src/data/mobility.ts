export interface MobilityFlow {
  id: string;
  title: string;
  goal: string;
  durationMin: number;
  equipment: string[];
  steps: { name: string; durationSec: number; detail: string }[];
}

export const mobilityFlows: MobilityFlow[] = [
  {
    id: 'desk-reset',
    title: 'Desk reset (12 min)',
    goal: 'Neck, upper back, and hips after sitting',
    durationMin: 12,
    equipment: ['Chair optional', 'Wall'],
    steps: [
      { name: 'Chin tucks', durationSec: 60, detail: 'Slow nod — 2s hold, 12 reps' },
      { name: 'Upper trap stretch', durationSec: 90, detail: 'Each side, ear to shoulder gently' },
      { name: 'Doorway pec stretch', durationSec: 90, detail: 'Elbow at 90°, slight step-through' },
      { name: 'Seated thoracic rotation', durationSec: 120, detail: '10 each side, pause at end range' },
      { name: 'Hip flexor lunge stretch', durationSec: 120, detail: '60s each side, tuck pelvis' },
      { name: 'Figure-4 glute stretch', durationSec: 120, detail: '60s each side, seated or lying' },
    ],
  },
  {
    id: 'pre-squat',
    title: 'Pre-squat primer (14 min)',
    goal: 'Hips, ankles, and spine before leg day',
    durationMin: 14,
    equipment: ['Band optional', 'Wall'],
    steps: [
      { name: 'Cat-cow', durationSec: 90, detail: '10 slow cycles, match breath' },
      { name: '90/90 hip switches', durationSec: 120, detail: '8 each direction, no rush' },
      { name: 'Ankle rocks (knee-to-wall)', durationSec: 120, detail: '12 each side, heel down' },
      { name: 'Goblet squat hold', durationSec: 90, detail: 'Light DB or bodyweight, 3 pauses at bottom' },
      { name: 'Cossack shifts', durationSec: 120, detail: '8 each side, keep heel down when possible' },
      { name: 'Bodyweight squat + reach', durationSec: 120, detail: '10 reps, arms overhead at top' },
    ],
  },
  {
    id: 'post-run',
    title: 'Post-run flush (10 min)',
    goal: 'Calves, quads, and breathing downshift',
    durationMin: 10,
    equipment: ['Mat optional'],
    steps: [
      { name: 'Easy walk', durationSec: 120, detail: 'Bring heart rate down' },
      { name: 'Standing calf wall stretch', durationSec: 90, detail: '45s each leg, straight knee' },
      { name: 'Standing quad stretch', durationSec: 90, detail: '45s each side, knees together' },
      { name: 'Forward fold ragdoll', durationSec: 60, detail: 'Soft knees, gentle sway' },
      { name: 'Pigeon pose', durationSec: 180, detail: '90s each side, use pillow if needed' },
      { name: 'Box breathing', durationSec: 120, detail: '4-4-4-4 pattern, eyes closed' },
    ],
  },
];
