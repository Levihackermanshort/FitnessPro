export type CardioType = 'HIIT' | 'LISS' | 'MISS' | 'Circuit';

export interface CardioOption {
  id: string;
  name: string;
  type: CardioType;
  duration: string;
  durationMinutes: number;
  intensity: string;
  rpe: number;
  caloriesPerHour: number;
  heartRateZone: string;
  heartRateRange: string;
  benefits: string[];
  description: string;
  frequency: string;
  protocols: {
    name: string;
    work: string;
    rest: string;
    rounds: number;
    notes: string;
  }[];
  bestFor: string[];
  equipment: string[];
}

export const cardioOptions: CardioOption[] = [
  {
    id: 'hiit-sprints',
    name: 'HIIT Treadmill Sprints',
    type: 'HIIT',
    duration: '15-20 min',
    durationMinutes: 20,
    intensity: 'Very High',
    rpe: 9,
    caloriesPerHour: 800,
    heartRateZone: 'Zone 4-5 (85-95%)',
    heartRateRange: '85-95% of max HR',
    description: 'Alternate short all-out sprints with recovery walks. Maximum calorie burn in minimum time with extended afterburn effect.',
    frequency: '2-3x per week',
    benefits: [
      'EPOC effect burns calories for 24-48 hours post-workout',
      'Dramatically improves VO2 max',
      'Preserves muscle mass during cuts',
      'Time efficient - 15 min equals 45 min steady state',
      'Boosts growth hormone and testosterone'
    ],
    protocols: [
      {
        name: 'Standard Intervals',
        work: '30 sec all-out sprint',
        rest: '60 sec walking recovery',
        rounds: 10,
        notes: 'Best for beginners to HIIT. 1:2 work-to-rest ratio.'
      },
      {
        name: 'Advanced Protocol',
        work: '45 sec sprint at 12% incline',
        rest: '30 sec rest',
        rounds: 12,
        notes: '1.5:1 work-to-rest. Very demanding. Build up gradually.'
      },
      {
        name: 'Peak Output',
        work: '20 sec maximum sprint',
        rest: '10 sec complete rest',
        rounds: 8,
        notes: 'Tabata-style protocol. True maximum effort required.'
      }
    ],
    bestFor: ['Fat loss', 'Athletic performance', 'Breaking plateaus', 'Time-constrained individuals'],
    equipment: ['Treadmill']
  },
  {
    id: 'tabata',
    name: 'Tabata Protocol',
    type: 'HIIT',
    duration: '4-8 min',
    durationMinutes: 8,
    intensity: 'Maximum',
    rpe: 10,
    caloriesPerHour: 900,
    heartRateZone: 'Zone 5 (90-100%)',
    heartRateRange: '90-100% of max HR',
    description: 'The original Tabata protocol: 20 seconds of ultra-intense effort followed by 10 seconds rest, repeated 8 times. Brutally effective.',
    frequency: '2-3x per week',
    benefits: [
      'Drastic anaerobic capacity improvement',
      'Shortest effective cardio format in existence',
      'Massive metabolic boost for hours after',
      'Improves both aerobic and anaerobic systems simultaneously',
      'Preserves and can even build muscle'
    ],
    protocols: [
      {
        name: 'Classic Tabata',
        work: '20 sec maximum effort',
        rest: '10 sec complete rest',
        rounds: 8,
        notes: 'Original protocol by Dr. Izumi Tabata. Any exercise works.'
      },
      {
        name: 'Double Tabata',
        work: '20 sec max effort',
        rest: '10 sec rest',
        rounds: 16,
        notes: 'Two exercises alternated (e.g., sprints + burpees). 8 min total.'
      }
    ],
    bestFor: ['Advanced athletes', 'Maximum fat loss', 'Performance enhancement', 'Metabolic conditioning'],
    equipment: ['Any - bike, rower, treadmill, or bodyweight']
  },
  {
    id: 'steady-state-run',
    name: 'Steady-State Running',
    type: 'LISS',
    duration: '30-45 min',
    durationMinutes: 45,
    intensity: 'Low-Moderate',
    rpe: 4,
    caloriesPerHour: 500,
    heartRateZone: 'Zone 2 (60-70%)',
    heartRateRange: '60-70% of max HR',
    description: 'Consistent moderate pace jog maintaining conversational breathing. The foundation of cardiovascular health and endurance.',
    frequency: '3-5x per week',
    benefits: [
      'Maximizes fat oxidation as fuel source',
      'Active recovery between hard training days',
      'Builds aerobic base and capillary density',
      'Low joint impact when done on appropriate surfaces',
      'Mental clarity and stress reduction',
      'Improves sleep quality'
    ],
    protocols: [
      {
        name: 'Recovery Run',
        work: '30 min easy pace',
        rest: 'N/A',
        rounds: 1,
        notes: 'You should be able to hold a conversation. Focus on enjoyment.'
      },
      {
        name: 'Long Slow Distance',
        work: '45-60 min steady pace',
        rest: 'N/A',
        rounds: 1,
        notes: 'Slightly faster than recovery but still conversational. Weekly staple.'
      }
    ],
    bestFor: ['Beginners', 'Recovery between intense sessions', 'Marathon training base', 'Stress relief'],
    equipment: ['Running shoes', 'Optional: heart rate monitor']
  },
  {
    id: 'incline-walk',
    name: 'Incline Treadmill Walk',
    type: 'LISS',
    duration: '30-45 min',
    durationMinutes: 45,
    intensity: 'Moderate',
    rpe: 5,
    caloriesPerHour: 550,
    heartRateZone: 'Zone 2-3 (65-75%)',
    heartRateRange: '65-75% of max HR',
    description: 'Walk at 8-15% incline at moderate pace. Excellent glute activation with minimal joint stress.',
    frequency: '3-5x per week',
    benefits: [
      'Superior glute and hamstring engagement vs flat walking',
      'Very low impact on joints',
      'Burns significantly more calories than flat walking',
      'Builds posterior chain endurance',
      'Can read or watch content while doing it',
      'Excellent for bodybuilders during contest prep'
    ],
    protocols: [
      {
        name: 'Steady Incline',
        work: '30 min at 10% incline, 3.5 mph',
        rest: 'N/A',
        rounds: 1,
        notes: 'Find a pace that keeps heart rate in Zone 2-3.'
      },
      {
        name: 'Progressive Incline',
        work: 'Start 6%, increase 2% every 5 min up to 15%',
        rest: 'N/A',
        rounds: 1,
        notes: 'Gradually increases difficulty. Great for building endurance.'
      }
    ],
    bestFor: ['Glute development', 'Low-impact cardio', 'Beginners', 'Bodybuilding contest prep'],
    equipment: ['Treadmill']
  },
  {
    id: 'rowing',
    name: 'Rowing Machine',
    type: 'HIIT',
    duration: '20-30 min',
    durationMinutes: 30,
    intensity: 'High',
    rpe: 8,
    caloriesPerHour: 700,
    heartRateZone: 'Zone 3-4 (80-90%)',
    heartRateRange: '80-90% of max HR',
    description: 'Full-body cardio using rowing machine. Combines strength and cardio in one efficient movement.',
    frequency: '2-4x per week',
    benefits: [
      'Full-body engagement - 86% of muscles activated',
      'Zero impact on joints',
      'Builds back and leg endurance simultaneously',
      'Improves posture and pulling strength',
      'Highly scalable for all fitness levels',
      'Excellent cross-training for runners'
    ],
    protocols: [
      {
        name: 'Sprint Intervals',
        work: '250m sprint',
        rest: '60 sec easy rowing',
        rounds: 10,
        notes: 'Focus on power per stroke, not stroke rate.'
      },
      {
        name: 'Pyramid',
        work: '100m, 200m, 300m, 400m, 500m sprints',
        rest: 'Equal rest to work time',
        rounds: 1,
        notes: 'Build up then back down. Pacing is key.'
      }
    ],
    bestFor: ['Full-body conditioning', 'Cross-training', 'Low-impact option', 'Building back endurance'],
    equipment: ['Rowing machine (Concept2 preferred)']
  },
  {
    id: 'cycling',
    name: 'Cycling / Spinning',
    type: 'MISS',
    duration: '30-45 min',
    durationMinutes: 45,
    intensity: 'Moderate-High',
    rpe: 6,
    caloriesPerHour: 600,
    heartRateZone: 'Zone 3 (70-80%)',
    heartRateRange: '70-80% of max HR',
    description: 'Stationary bike or outdoor cycling. Joint-friendly cardio that builds leg endurance and power.',
    frequency: '3-5x per week',
    benefits: [
      'Extremely knee and hip friendly',
      'Builds leg power and muscular endurance',
      'Great for active recovery between leg days',
      'Highly scalable resistance',
      'Low injury risk',
      'Can be done indoors year-round'
    ],
    protocols: [
      {
        name: 'Steady State',
        work: '40 min at moderate resistance',
        rest: 'N/A',
        rounds: 1,
        notes: 'Maintain 80-90 RPM cadence. conversational pace.'
      },
      {
        name: 'Hill Intervals',
        work: '2 min hard resistance climb',
        rest: '2 min easy spin',
        rounds: 8,
        notes: 'Increase resistance to simulate hill. Stand if needed.'
      }
    ],
    bestFor: ['Knee rehabilitation', 'Low-impact option', 'Leg day recovery', 'Building cycling fitness'],
    equipment: ['Stationary bike', 'Road bike', 'Spin bike']
  },
  {
    id: 'jump-rope',
    name: 'Jump Rope',
    type: 'Circuit',
    duration: '15-25 min',
    durationMinutes: 25,
    intensity: 'Moderate-High',
    rpe: 7,
    caloriesPerHour: 700,
    heartRateZone: 'Zone 3-4 (75-85%)',
    heartRateRange: '75-85% of max HR',
    description: 'Various jump styles for a portable, cheap, and incredibly effective cardio workout.',
    frequency: '3-4x per week',
    benefits: [
      'Dramatically improves coordination and timing',
      'Extremely portable and inexpensive',
      'Very high calorie burn per minute',
      'Improves bone density through impact',
      'Develops ankle stability and calf strength',
      'Fun and skill-based - keeps you engaged'
    ],
    protocols: [
      {
        name: 'Interval Training',
        work: '1 min jump (various styles)',
        rest: '30 sec rest',
        rounds: 15,
        notes: 'Mix basic bounce, alternate foot, and double-unders.'
      },
      {
        name: 'Endurance Skip',
        work: '20 min continuous jumping',
        rest: 'Brief rest as needed',
        rounds: 1,
        notes: 'Rotate through different styles to prevent fatigue.'
      }
    ],
    bestFor: ['Athletic development', 'Travel workouts', 'Quick cardio sessions', 'Coordination training'],
    equipment: ['Jump rope (weighted for extra challenge)']
  },
  {
    id: 'stairmaster',
    name: 'StairMaster',
    type: 'MISS',
    duration: '20-35 min',
    durationMinutes: 35,
    intensity: 'Moderate',
    rpe: 6,
    caloriesPerHour: 550,
    heartRateZone: 'Zone 3 (70-80%)',
    heartRateRange: '70-80% of max HR',
    description: 'Continuous stepping on rotating stairs. Functional movement pattern with incredible lower body activation.',
    frequency: '3-4x per week',
    benefits: [
      'Extreme glute and quad activation',
      'Functional movement pattern (climbing)',
      'High calorie expenditure per minute',
      'Low impact when done with full steps',
      'Builds real-world strength',
      'Excellent for bodybuilders pre-contest'
    ],
    protocols: [
      {
        name: 'Steady Climb',
        work: '30 min at moderate pace',
        rest: 'N/A',
        rounds: 1,
        notes: 'Take full steps, dont short-step. Stand tall.'
      },
      {
        name: 'Interval Climb',
        work: '2 min fast / 1 min moderate',
        rest: 'N/A',
        rounds: 10,
        notes: 'Alternate between high and moderate intensity.'
      }
    ],
    bestFor: ['Glute development', 'Low-impact cardio', 'Bodybuilding prep', 'Building climbing endurance'],
    equipment: ['StairMaster machine']
  },
  {
    id: 'battle-ropes',
    name: 'Battle Ropes',
    type: 'HIIT',
    duration: '15-20 min',
    durationMinutes: 20,
    intensity: 'Very High',
    rpe: 9,
    caloriesPerHour: 750,
    heartRateZone: 'Zone 4-5 (85-95%)',
    heartRateRange: '85-95% of max HR',
    description: 'High-intensity rope training that develops power, endurance, and grip strength simultaneously.',
    frequency: '2-3x per week',
    benefits: [
      'Develops explosive power and strength endurance',
      'Intense grip and forearm training',
      'Zero impact on lower body joints',
      'Engages core throughout',
      'Highly metabolic - burns calories fast',
      'Athletic carryover to sports'
    ],
    protocols: [
      {
        name: 'Waves',
        work: '30 sec alternating waves',
        rest: '30 sec rest',
        rounds: 15,
        notes: 'Maintain consistent wave pattern throughout.'
      },
      {
        name: 'Slams',
        work: '20 sec double rope slams',
        rest: '40 sec rest',
        rounds: 12,
        notes: 'Maximum power on each slam. Full body engagement.'
      }
    ],
    bestFor: ['Athletic performance', 'Upper body cardio', 'Grip strength', 'High-intensity training'],
    equipment: ['Battle ropes (1.5" or 2" diameter, 50 feet)']
  }
];

export const heartRateZones = [
  { zone: 'Zone 1', range: '50-60%', name: 'Recovery', color: 'bg-slate-500', description: 'Very light effort. Active recovery and blood flow enhancement.' },
  { zone: 'Zone 2', range: '60-70%', name: 'Aerobic Base', color: 'bg-emerald-500', description: 'LISS range. Maximum fat oxidation and endurance building.' },
  { zone: 'Zone 3', range: '70-80%', name: 'Tempo', color: 'bg-blue-500', description: 'MISS range. Sustainable moderate effort. Marathon pace.' },
  { zone: 'Zone 4', range: '80-90%', name: 'Threshold', color: 'bg-amber-500', description: 'Hard effort. Lactate threshold training. 10K race pace.' },
  { zone: 'Zone 5', range: '90-100%', name: 'VO2 Max', color: 'bg-red-500', description: 'Maximum effort. HIIT and sprint intervals. Unsustainable for long.' }
];

export const getCardioByType = (type: CardioType) => cardioOptions.filter(c => c.type === type);
