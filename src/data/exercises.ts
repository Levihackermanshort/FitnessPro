export type MuscleGroup = 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type Equipment = 'Barbell' | 'Dumbbell' | 'Cable' | 'Machine' | 'Bodyweight' | 'Kettlebell' | 'Resistance Band';

export interface Exercise {
  id: string;
  name: string;
  category: MuscleGroup;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: Equipment[];
  difficulty: Difficulty;
  description: string;
  instructions: string[];
  variations: string[];
  tips: string[];
  commonMistakes: string[];
}

export const exercises: Exercise[] = [
  // CHEST - 8 exercises
  {
    id: 'bench-press',
    name: 'Barbell Bench Press',
    category: 'Chest',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Anterior Deltoids', 'Triceps'],
    equipment: ['Barbell'],
    difficulty: 'Intermediate',
    description: 'The foundational compound movement for building upper body pressing strength and chest mass.',
    instructions: [
      'Lie flat on bench with eyes directly under the bar',
      'Grip the bar slightly wider than shoulder-width apart',
      'Retract shoulder blades and arch lower back slightly',
      'Unrack the bar and hold at arms length',
      'Lower the bar to mid-chest with control (2-3 seconds)',
      'Press up in a slight arc until arms lock out',
      'Repeat for target reps'
    ],
    variations: ['Incline Bench Press', 'Close-Grip Bench Press', 'Floor Press', 'Paused Bench Press'],
    tips: ['Keep feet planted for stability', 'Tuck elbows at 45-75 degrees', 'Think about pushing yourself away from the bar'],
    commonMistakes: ['Bouncing the bar off chest', 'Flaring elbows to 90 degrees', 'Lifting hips off the bench']
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    category: 'Chest',
    primaryMuscles: ['Upper Chest (Clavicular Head)'],
    secondaryMuscles: ['Front Delts', 'Triceps'],
    equipment: ['Dumbbell'],
    difficulty: 'Intermediate',
    description: 'Targets the clavicular head of the pecs for a fuller, more developed upper chest.',
    instructions: [
      'Set bench to 30-45 degree incline',
      'Start with dumbbells at shoulder height, palms facing forward',
      'Press the dumbbells up and slightly inward at the top',
      'Lower with control feeling the chest stretch',
      'Keep core tight throughout the movement'
    ],
    variations: ['Incline Barbell Press', 'Low-to-High Cable Fly', 'Landmine Press', 'Svend Press'],
    tips: ['30 degrees hits upper chest best; 45+ engages more front delts', 'Drive dumbbells together at top for peak contraction', 'Control the eccentric for 2-3 seconds'],
    commonMistakes: ['Setting bench too steep (becomes a shoulder press)', 'Letting dumbbells drift outward', 'Using momentum to press']
  },
  {
    id: 'cable-flyes',
    name: 'Cable Flyes',
    category: 'Chest',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Front Delts'],
    equipment: ['Cable'],
    difficulty: 'Beginner',
    description: 'Constant tension isolation movement perfect for chest definition and peak contraction.',
    instructions: [
      'Set pulleys at shoulder height',
      'Step forward with staggered stance for stability',
      'Squeeze chest to bring hands together in an arc',
      'Keep slight bend in elbows throughout',
      'Slowly return to stretch position feeling the chest open'
    ],
    variations: ['Low-to-High Fly (upper chest)', 'High-to-Low Fly (lower chest)', 'Single-Arm Fly', 'Standing Squeeze Press'],
    tips: ['Imagine hugging a tree', 'Focus on chest squeeze, not hand position', 'Keep constant tension - dont let stacks touch'],
    commonMistakes: ['Bending elbows too much (becomes a press)', 'Using too much weight', 'Not controlling the return phase']
  },
  {
    id: 'push-ups',
    name: 'Push-ups',
    category: 'Chest',
    primaryMuscles: ['Chest'],
    secondaryMuscles: ['Triceps', 'Core', 'Front Delts'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    description: 'The ultimate bodyweight chest builder that can be done anywhere with endless variations.',
    instructions: [
      'Start in plank position, hands slightly wider than shoulders',
      'Keep body in a straight line from head to heels',
      'Lower until chest nearly touches the floor',
      'Push back up explosively',
      'Lock out arms at the top'
    ],
    variations: ['Diamond Push-up', 'Decline Push-up', 'Archer Push-up', 'Spiderman Push-up', 'Plyometric Push-up', 'Weighted Push-up'],
    tips: ['Keep core tight - no sagging hips', 'Full range of motion beats partial reps', 'Experiment with hand positions to target different areas'],
    commonMistakes: ['Partial range of motion', 'Flaring elbows excessively', 'Sagging hips or piking']
  },
  {
    id: 'dumbbell-flyes',
    name: 'Dumbbell Flyes',
    category: 'Chest',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Front Delts'],
    equipment: ['Dumbbell'],
    difficulty: 'Beginner',
    description: 'Classic stretch-focused chest isolation performed on a flat bench.',
    instructions: [
      'Lie on flat bench holding dumbbells above chest',
      'Slight bend in elbows, palms facing each other',
      'Open arms wide feeling chest stretch',
      'Squeeze chest to bring dumbbells back together',
      'Maintain the same elbow angle throughout'
    ],
    variations: ['Incline Dumbbell Fly', 'Decline Dumbbell Fly', 'Floor Fly', 'Cable Fly'],
    tips: ['Think of hugging a barrel, not pressing', 'Deep stretch at bottom triggers hypertrophy', 'Use lighter weight than you think'],
    commonMistakes: ['Bending and straightening elbows (turns into press)', 'Going too deep and risking shoulder injury', 'Using excessive weight']
  },
  {
    id: 'dips',
    name: 'Chest Dips',
    category: 'Chest',
    primaryMuscles: ['Lower Chest'],
    secondaryMuscles: ['Triceps', 'Front Delts'],
    equipment: ['Bodyweight'],
    difficulty: 'Intermediate',
    description: 'Compound bodyweight exercise that emphasizes the lower chest when performed with forward lean.',
    instructions: [
      'Grip parallel bars and lift body',
      'Lean forward to target chest (upright targets triceps)',
      'Lower until shoulders feel a stretch',
      'Press back up locking out at top',
      'Add weight with dip belt when bodyweight becomes easy'
    ],
    variations: ['Weighted Dips', 'Bench Dips', 'Ring Dips', 'Assisted Dips'],
    tips: ['Forward lean = more chest; upright = more triceps', 'Go deep for full range of motion', 'Use assisted machine if cannot do 8 reps'],
    commonMistakes: ['Not going deep enough', 'Shrugging shoulders', 'Doing them too upright for chest focus']
  },
  {
    id: 'pec-deck',
    name: 'Pec Deck Fly',
    category: 'Chest',
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Front Delts'],
    equipment: ['Machine'],
    difficulty: 'Beginner',
    description: 'Machine-based chest isolation that provides consistent resistance throughout the range of motion.',
    instructions: [
      'Adjust seat so handles align with mid-chest',
      'Sit with back flat against pad',
      'Grip handles and bring together in front of chest',
      'Squeeze hard for 1-2 seconds',
      'Return slowly to stretched position'
    ],
    variations: ['Single-Arm Pec Deck', 'Reverse Pec Deck (rear delts)', 'Standing Cable Crossover'],
    tips: ['Perfect for beginners learning chest activation', 'Hold the squeeze at peak contraction', 'Dont let weights slam down'],
    commonMistakes: ['Using momentum', 'Not adjusting seat height properly', 'Partial range of motion']
  },
  {
    id: 'svend-press',
    name: 'Svend Press',
    category: 'Chest',
    primaryMuscles: ['Inner Chest'],
    secondaryMuscles: ['Front Delts'],
    equipment: ['Dumbbell'],
    difficulty: 'Beginner',
    description: 'Plate squeeze press that creates intense inner chest activation and mind-muscle connection.',
    instructions: [
      'Hold a single dumbbell or weight plate at chest level',
      'Squeeze the weight between your palms',
      'Press forward while maintaining squeeze',
      'Hold at extension for 2 seconds',
      'Return to chest and repeat'
    ],
    variations: ['Standing Svend Press', 'Floor Svend Press', 'Cable Squeeze Press'],
    tips: ['Light weight - focus is on squeeze, not load', 'Great finisher exercise', 'Exhale as you press forward'],
    commonMistakes: ['Using too heavy a weight', 'Losing the squeeze halfway through', 'Rounding shoulders forward']
  },
  // BACK - 8 exercises
  {
    id: 'deadlift',
    name: 'Conventional Deadlift',
    category: 'Back',
    primaryMuscles: ['Posterior Chain', 'Latissimus Dorsi'],
    secondaryMuscles: ['Traps', 'Forearms', 'Core', 'Hamstrings', 'Glutes'],
    equipment: ['Barbell'],
    difficulty: 'Advanced',
    description: 'The king of all exercises. Builds total body strength, muscle mass, and functional power.',
    instructions: [
      'Stand with feet hip-width apart, bar over mid-foot',
      'Grip just outside legs (double overhand or mixed)',
      'Drop hips, keep back flat, chest up',
      'Take slack out of the bar before pulling',
      'Drive through heels and extend hips forward',
      'Lock out at top with shoulders back',
      'Hinge at hips to lower with control'
    ],
    variations: ['Sumo Deadlift', 'Romanian Deadlift', 'Trap Bar Deadlift', 'Deficit Deadlift', 'Stiff-Leg Deadlift'],
    tips: ['Brace core like someone is about to punch you', 'Keep bar close to body throughout', 'Dont hyperextend at the top', 'Reset each rep for form practice'],
    commonMistakes: ['Rounding the lower back', 'Starting with hips too low (squatting the weight)', 'Bending arms then pulling (bicep tear risk)', 'Letting bar drift away from body']
  },
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    category: 'Back',
    primaryMuscles: ['Latissimus Dorsi'],
    secondaryMuscles: ['Biceps', 'Rear Delts', 'Core', 'Rhomboids'],
    equipment: ['Bodyweight'],
    difficulty: 'Intermediate',
    description: 'The best bodyweight back builder for width, V-taper development, and relative strength.',
    instructions: [
      'Hang from bar with pronated grip slightly wider than shoulders',
      'Initiate by depressing and retracting shoulder blades',
      'Pull chin over the bar driving elbows down and back',
      'Squeeze lats at the top',
      'Lower with control to full arm extension'
    ],
    variations: ['Chin-ups (supinated grip)', 'Neutral Grip Pull-up', 'Weighted Pull-up', 'Around-the-World', 'Commando Pull-ups', 'Muscle-ups'],
    tips: ['Full dead hang at bottom for complete range', 'Imagine pulling elbows into pockets', 'Add weight when you can do 12+ clean reps', 'Use assisted machine or bands if needed'],
    commonMistakes: ['Half reps (not going to full extension)', 'Using momentum/kipping', 'Shrugging shoulders', 'Not engaging lats first']
  },
  {
    id: 'barbell-row',
    name: 'Barbell Row',
    category: 'Back',
    primaryMuscles: ['Lats', 'Rhomboids'],
    secondaryMuscles: ['Biceps', 'Rear Delts', 'Erector Spinae', 'Traps'],
    equipment: ['Barbell'],
    difficulty: 'Intermediate',
    description: 'Heavy compound row for back thickness, pulling power, and posterior chain development.',
    instructions: [
      'Bend at hips until torso is nearly parallel to floor',
      'Grip bar with pronated grip slightly wider than shoulder-width',
      'Brace core and maintain neutral spine',
      'Pull bar to lower chest/upper abs',
      'Squeeze shoulder blades together at top',
      'Lower with control and repeat'
    ],
    variations: ['Pendlay Row', 'Yates Row (underhand)', 'Dumbbell Row', 'Seal Row', 'T-Bar Row', 'Meadows Row'],
    tips: ['Start light to master the hinge position', 'Pull to lower chest for lat emphasis, upper abs for rhomboid emphasis', 'Keep hips high - its a row, not a squat'],
    commonMistakes: ['Standing too upright', 'Using momentum and heaving the weight', 'Rounding lower back', 'Hitting knees on the way down']
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'Back',
    primaryMuscles: ['Latissimus Dorsi'],
    secondaryMuscles: ['Biceps', 'Rear Delts', 'Rhomboids'],
    equipment: ['Machine'],
    difficulty: 'Beginner',
    description: 'Machine alternative to pull-ups for lat width with adjustable resistance and controlled form.',
    instructions: [
      'Sit with thighs secured under pads',
      'Grip bar slightly wider than shoulder-width',
      'Lean back slightly (10-15 degrees)',
      'Pull bar to upper chest driving elbows down and back',
      'Squeeze lats at bottom',
      'Control the weight back up to full extension'
    ],
    variations: ['Close-Grip Pulldown', 'Single-Arm Pulldown', 'Behind-the-Neck Pulldown', 'V-Bar Pulldown', 'Straight-Arm Pulldown'],
    tips: ['Dont pull behind the neck (shoulder impingement risk)', 'Focus on elbow drive, not hand pull', 'Full stretch at top is crucial'],
    commonMistakes: ['Using momentum and swinging', 'Pulling behind the neck', 'Not going to full extension', 'Leaning back too far']
  },
  {
    id: 'seated-cable-row',
    name: 'Seated Cable Row',
    category: 'Back',
    primaryMuscles: ['Lats', 'Rhomboids', 'Middle Trapezius'],
    secondaryMuscles: ['Biceps', 'Rear Delts', 'Erector Spinae'],
    equipment: ['Cable'],
    difficulty: 'Beginner',
    description: 'Excellent mid-back builder that targets thickness and scapular retraction strength.',
    instructions: [
      'Sit on bench with feet on platforms, knees slightly bent',
      'Grip attachment (V-grip, straight bar, or rope)',
      'Sit upright with arms fully extended',
      'Pull handle to lower abdomen/upper hips',
      'Squeeze shoulder blades together',
      'Return to stretch with control'
    ],
    variations: ['Wide-Grip Row', 'Single-Arm Cable Row', 'Rope Face Pull Row', 'Chest-Supported Row'],
    tips: ['Keep torso mostly still - isolate the back', 'Squeeze scapulae together at contraction', 'Dont lean back excessively'],
    commonMistakes: ['Excessive torso swinging', 'Pulling with biceps instead of back', 'Not retracting scapulae', 'Jerky reps']
  },
  {
    id: 't-bar-row',
    name: 'T-Bar Row',
    category: 'Back',
    primaryMuscles: ['Lats', 'Rhomboids'],
    secondaryMuscles: ['Traps', 'Biceps', 'Rear Delts', 'Erector Spinae'],
    equipment: ['Barbell'],
    difficulty: 'Intermediate',
    description: 'Old-school back thickness exercise that allows heavy loading with a neutral grip.',
    instructions: [
      'Straddle the T-bar with feet shoulder-width apart',
      'Bend at hips until torso is 45 degrees',
      'Grip handles with neutral grip',
      'Pull weight to chest squeezing shoulder blades',
      'Lower with control maintaining back position'
    ],
    variations: ['Landmine Row', 'Chest-Supported T-Bar Row', 'Single-Arm Landmine Row'],
    tips: ['Great for those with limited shoulder mobility', 'Neutral grip reduces shoulder strain', 'Keep chest supported if using a pad'],
    commonMistakes: ['Standing too upright', 'Using arm strength over back', 'Losing neutral spine position']
  },
  {
    id: 'face-pulls',
    name: 'Face Pulls',
    category: 'Back',
    primaryMuscles: ['Rear Deltoids', 'Rhomboids'],
    secondaryMuscles: ['Rotator Cuff', 'Traps'],
    equipment: ['Cable'],
    difficulty: 'Beginner',
    description: 'Critical for shoulder health, posture correction, and completing the 3D delt look.',
    instructions: [
      'Set cable at upper chest height with rope attachment',
      'Pull rope toward face separating the ends',
      'Externally rotate at the end so knuckles face back',
      'Squeeze rear delts and upper back hard',
      'Return slowly maintaining tension'
    ],
    variations: ['Band Pull-Apart', 'Reverse Pec Deck', 'Prone Y-Raise', 'Cable External Rotation'],
    tips: ['Do these every workout for shoulder health', 'High reps (15-20) work best', 'Focus on external rotation at the end', 'Light weight, perfect form'],
    commonMistakes: ['Using too much weight', 'Not externally rotating', 'Pulling too low (targets lats instead)', 'Rushing the reps']
  },
  {
    id: 'hyperextensions',
    name: 'Back Hyperextensions',
    category: 'Back',
    primaryMuscles: ['Erector Spinae', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Core'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    description: 'Isolation exercise for the lower back that strengthens the posterior chain and prevents injury.',
    instructions: [
      'Position hips on pad with ankles secured',
      'Cross arms over chest or hold weight',
      'Lower torso down feeling hamstring stretch',
      'Raise back to neutral position (not hyperextension)',
      'Squeeze glutes and lower back at top'
    ],
    variations: ['Weighted Hyperextension', 'Reverse Hyperextension', '45-Degree Hyperextension', 'Glute-Ham Raise'],
    tips: ['Dont over-arch at the top', 'Hold weight close to chest for added resistance', 'Great warm-up before deadlifts'],
    commonMistakes: ['Hyperextending past neutral (spinal compression)', 'Going too fast', 'Not engaging glutes']
  },
  // LEGS - 8 exercises
  {
    id: 'squat',
    name: 'Barbell Back Squat',
    category: 'Legs',
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Core', 'Adductors', 'Erector Spinae'],
    equipment: ['Barbell'],
    difficulty: 'Intermediate',
    description: 'The cornerstone of leg development and lower body strength. The ultimate compound lower body movement.',
    instructions: [
      'Position bar on upper traps/rear delts (high bar) or mid-traps (low bar)',
      'Stand with feet shoulder-width or slightly wider',
      'Brace core tight, take a deep breath',
      'Break at hips and knees simultaneously',
      'Descend until hip crease breaks parallel to floor',
      'Drive through heels to stand, exhaling at the top'
    ],
    variations: ['Front Squat', 'Box Squat', 'Pause Squat', 'Safety Bar Squat', 'Bulgarian Split Squat', 'Hack Squat', 'Goblet Squat'],
    tips: ['High bar = more quad dominant; Low bar = more posterior chain', 'Knees tracking over toes is normal and safe', 'Drive through mid-foot, not just heels', 'Use a belt at 80%+ of one rep max'],
    commonMistakes: ['Not hitting depth (quarter squats)', 'Knees caving inward (valgus collapse)', 'Rising hips first (good morning squat)', 'Heels lifting off floor']
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    category: 'Legs',
    primaryMuscles: ['Hamstrings', 'Glutes'],
    secondaryMuscles: ['Lower Back', 'Forearms', 'Traps'],
    equipment: ['Barbell'],
    difficulty: 'Intermediate',
    description: 'Hamstring-focused hinge pattern that builds posterior chain flexibility, strength, and muscle mass.',
    instructions: [
      'Start standing holding bar at hip height with slight knee bend (15-20 degrees)',
      'Push hips back while keeping bar close to body',
      'Lower until you feel maximal hamstring stretch (usually mid-shin)',
      'Keep back flat and shoulders back',
      'Squeeze glutes and drive hips forward to return to standing'
    ],
    variations: ['Dumbbell RDL', 'Single-Leg RDL', 'Stiff-Leg Deadlift', 'Good Morning', 'B-Stance RDL'],
    tips: ['The stretch in hamstrings is your depth guide', 'Keep bar grazing your thighs', 'Slight knee bend stays constant', 'Great for hypertrophy - use moderate to high reps'],
    commonMistakes: ['Squatting the weight down (too much knee bend)', 'Rounding the lower back', 'Letting bar drift away from body', 'Bending knees excessively']
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    category: 'Legs',
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Calves'],
    equipment: ['Machine'],
    difficulty: 'Beginner',
    description: 'Machine-based compound leg movement allowing heavy loads with spinal safety and stability.',
    instructions: [
      'Sit with back and head flat against pad',
      'Place feet shoulder-width on platform',
      'Release safety handles',
      'Lower sled until knees hit approximately 90 degrees',
      'Do not let lower back round or hips lift off pad',
      'Press through full foot to extend legs (dont lock knees)'
    ],
    variations: ['Narrow Stance Press (more quads)', 'High Foot Placement (more glutes/hams)', 'Wide Stance Press', 'Single-Leg Press', 'Calf Press'],
    tips: ['Foot position changes muscle emphasis', 'High/wide = more glutes and hams; Low/narrow = more quads', 'Dont lock knees at the top', 'Great for high volume without spinal loading'],
    commonMistakes: ['Lowering too deep (hips round off pad)', 'Locking knees at top', 'Placing hands on knees', 'Using partial range of motion']
  },
  {
    id: 'walking-lunges',
    name: 'Walking Lunges',
    category: 'Legs',
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Calves', 'Core'],
    equipment: ['Dumbbell', 'Bodyweight'],
    difficulty: 'Beginner',
    description: 'Unilateral leg builder that improves balance, coordination, and functional strength.',
    instructions: [
      'Stand holding dumbbells at sides (or bodyweight)',
      'Step forward into lunge position',
      'Lower back knee toward ground',
      'Keep torso upright and front knee over ankle',
      'Drive through front heel to step forward into next lunge',
      'Continue walking forward alternating legs'
    ],
    variations: ['Reverse Lunge', 'Bulgarian Split Squat', 'Lateral Lunge', 'Curtsy Lunge', 'Deficit Lunge', 'Overhead Lunge'],
    tips: ['Keep torso vertical throughout', 'Front knee should not go far past toes', 'Short steps = more quads; Long steps = more glutes', 'Great finisher for leg day'],
    commonMistakes: ['Torso leaning too far forward', 'Front knee caving inward', 'Short stepping (knee goes past toes excessively)', 'Not lowering back knee enough']
  },
  {
    id: 'leg-curl',
    name: 'Lying Leg Curl',
    category: 'Legs',
    primaryMuscles: ['Hamstrings'],
    secondaryMuscles: ['Calves'],
    equipment: ['Machine'],
    difficulty: 'Beginner',
    description: 'Isolation exercise for the hamstrings that complements quad-dominant movements.',
    instructions: [
      'Lie face down on machine with pad just above heels',
      'Grip handles for stability',
      'Curl heels toward glutes squeezing hamstrings',
      'Hold contraction for 1 second',
      'Lower with control to starting position'
    ],
    variations: ['Seated Leg Curl', 'Standing Leg Curl', 'Nordic Hamstring Curl', 'Swiss Ball Leg Curl', 'Slider Leg Curl'],
    tips: ['Dont lift hips off the pad', 'Point toes for more hamstring isolation', 'Control the eccentric (lowering phase)', 'Pause at peak contraction'],
    commonMistakes: ['Lifting hips to assist the curl', 'Using momentum', 'Partial range of motion', 'Going too heavy and losing control']
  },
  {
    id: 'leg-extension',
    name: 'Leg Extension',
    category: 'Legs',
    primaryMuscles: ['Quadriceps'],
    secondaryMuscles: [],
    equipment: ['Machine'],
    difficulty: 'Beginner',
    description: 'Quad isolation exercise that targets all four quadriceps heads for definition and peak contraction.',
    instructions: [
      'Sit with back against pad',
      'Place shins behind lower pad, knees at edge of seat',
      'Extend legs until knees are nearly straight',
      'Squeeze quadriceps at the top for 1-2 seconds',
      'Lower with control to starting position'
    ],
    variations: ['Single-Leg Extension', 'Partial reps (top half)', 'Slow Eccentric Extension', 'Drop Set Extensions'],
    tips: ['Great for quad detail and separation', 'Point toes slightly inward for vastus lateralis emphasis', 'Dont use this as your primary quad builder', 'Control the weight - no swinging'],
    commonMistakes: ['Using too much weight', 'Not controlling the lowering phase', 'Locking knees forcefully', 'Lifting hips off seat']
  },
  {
    id: 'calf-raise',
    name: 'Standing Calf Raise',
    category: 'Legs',
    primaryMuscles: ['Gastrocnemius'],
    secondaryMuscles: ['Soleus'],
    equipment: ['Machine'],
    difficulty: 'Beginner',
    description: 'Primary calf builder that targets the gastrocnemius muscle for size and definition.',
    instructions: [
      'Stand on platform with balls of feet on edge',
      'Lower heels below platform level feeling stretch',
      'Press up through balls of feet rising onto toes',
      'Hold contraction at top for 2 seconds',
      'Lower slowly back to stretch position'
    ],
    variations: ['Seated Calf Raise (targets soleus)', 'Donkey Calf Raise', 'Single-Leg Calf Raise', 'Smith Machine Calf Raise'],
    tips: ['Full stretch at bottom is essential for growth', 'Hold the peak contraction', 'Train calves 2-3x per week for best results', 'High reps (15-20+) work well'],
    commonMistakes: ['Bouncing reps', 'Not getting full stretch', 'Using momentum', 'Neglecting seated calf raises for soleus']
  },
  {
    id: 'hip-thrust',
    name: 'Barbell Hip Thrust',
    category: 'Legs',
    primaryMuscles: ['Glutes'],
    secondaryMuscles: ['Hamstrings', 'Core'],
    equipment: ['Barbell'],
    difficulty: 'Intermediate',
    description: 'The best glute isolation exercise that allows heavy loading with peak contraction at the top.',
    instructions: [
      'Sit with upper back against bench, barbell across hips',
      'Feet flat on floor, knees bent 90 degrees',
      'Drive through heels thrusting hips upward',
      'Squeeze glutes hard at top (body forms straight line)',
      'Lower with control and repeat'
    ],
    variations: ['Single-Leg Hip Thrust', 'B-Stance Hip Thrust', 'Frog Pump', 'Glute Bridge', 'Machine Hip Thrust'],
    tips: ['Use a pad to protect hips from bar', 'Chin stays tucked, eyes look forward', 'Dont hyperextend the lower back at top', 'Pause at top for maximum glute activation'],
    commonMistakes: ['Hyperextending lumbar spine', 'Pushing through toes instead of heels', 'Not achieving full hip extension', 'Looking up (extends neck)']
  },
  // SHOULDERS - 7 exercises
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    category: 'Shoulders',
    primaryMuscles: ['Anterior Deltoids'],
    secondaryMuscles: ['Triceps', 'Upper Chest', 'Core', 'Traps'],
    equipment: ['Barbell'],
    difficulty: 'Intermediate',
    description: 'The fundamental shoulder press for building overhead strength, capped delts, and pressing power.',
    instructions: [
      'Start with bar at upper chest/shoulder height in rack',
      'Grip slightly wider than shoulder-width',
      'Unrack and step back, brace core and squeeze glutes',
      'Press bar straight up moving head back slightly',
      'Lock out overhead with biceps by ears',
      'Lower under control to starting position'
    ],
    variations: ['Push Press', 'Seated Dumbbell Press', 'Arnold Press', 'Landmine Press', 'Viking Press', 'Z-Press'],
    tips: ['Squeeze glutes and brace core to protect lower back', 'Dont lean back excessively', 'Full range of motion beats partial reps', 'Great for overall upper body strength'],
    commonMistakes: ['Excessive back arch (hyperextension)', 'Using leg drive (thats a push press)', 'Not pressing in a straight line', 'Grip too wide or too narrow']
  },
  {
    id: 'lateral-raise',
    name: 'Lateral Raises',
    category: 'Shoulders',
    primaryMuscles: ['Lateral Deltoids'],
    secondaryMuscles: ['Traps'],
    equipment: ['Dumbbell', 'Cable'],
    difficulty: 'Beginner',
    description: 'Isolation movement essential for shoulder width, V-taper, and the capped delt look.',
    instructions: [
      'Stand with dumbbells at sides, slight bend in elbows',
      'Raise arms out to sides until parallel with floor',
      'Lead with elbows, not hands',
      'Tilt pinkies slightly upward (pouring water motion)',
      'Lower slowly resisting gravity'
    ],
    variations: ['Cable Lateral Raise', 'Leaning Away Raise', 'Machine Lateral Raise', 'Around-the-World', 'Partial Lateral Raises'],
    tips: ['Light weight, perfect form - ego check this exercise', 'Leaning away increases range of motion', 'Cable provides more tension at top', 'Try rest-pause sets for shoulder burnout'],
    commonMistakes: ['Using too much weight and swinging', 'Raising above parallel (engages traps too much)', 'Straight arms (keep slight bend)', 'Shrugging shoulders']
  },
  {
    id: 'rear-delt-fly',
    name: 'Rear Delt Fly',
    category: 'Shoulders',
    primaryMuscles: ['Rear Deltoids'],
    secondaryMuscles: ['Rhomboids', 'Traps'],
    equipment: ['Dumbbell'],
    difficulty: 'Beginner',
    description: 'Targets the often-neglected rear delts for balanced shoulder development and posture.',
    instructions: [
      'Bend at hips until torso is nearly parallel to floor',
      'Hold dumbbells with neutral grip, arms hanging',
      'Raise arms out to sides squeezing rear delts',
      'Keep slight bend in elbows throughout',
      'Lower with control and repeat'
    ],
    variations: ['Chest-Supported Rear Delt Fly', 'Cable Rear Delt Fly', 'Reverse Pec Deck', 'Bent-Over Rear Delt Row', 'Face Pulls'],
    tips: ['Use light weight - form is everything', 'Squeeze rear delts at top for 1-2 seconds', 'Chest-supported version reduces cheating', 'High reps (15-20) work well'],
    commonMistakes: ['Using momentum', 'Going too heavy', 'Not squeezing rear delts', 'Letting shoulders round forward']
  },
  {
    id: 'arnold-press',
    name: 'Arnold Press',
    category: 'Shoulders',
    primaryMuscles: ['All Deltoid Heads'],
    secondaryMuscles: ['Triceps', 'Upper Chest'],
    equipment: ['Dumbbell'],
    difficulty: 'Intermediate',
    description: 'Named after Arnold Schwarzenegger, this press hits all three deltoid heads through a unique rotation pattern.',
    instructions: [
      'Sit with back supported, dumbbells in front of chest',
      'Palms facing you (supinated), elbows bent',
      'Open elbows out to sides while pressing up',
      'Rotate palms to face forward at top',
      'Reverse the motion on the way down'
    ],
    variations: ['Seated Arnold Press', 'Single-Arm Arnold Press', 'Cable Arnold Press', 'Standing Arnold Press'],
    tips: ['Great warm-up before heavy pressing', 'The rotation recruits more deltoid fibers', 'Control the rotation - dont just spin the weights', 'Moderate weight works best'],
    commonMistakes: ['Using excessive weight', 'Not controlling the rotation', 'Arching lower back excessively', 'Going too fast']
  },
  {
    id: 'upright-row',
    name: 'Upright Row',
    category: 'Shoulders',
    primaryMuscles: ['Lateral Deltoids', 'Traps'],
    secondaryMuscles: ['Biceps', 'Front Delts'],
    equipment: ['Barbell', 'Dumbbell', 'Cable'],
    difficulty: 'Beginner',
    description: 'Compound movement for trap and lateral delt development. Controversial for some shoulder types.',
    instructions: [
      'Hold barbell with narrow grip (6-8 inches apart)',
      'Pull bar straight up toward chin',
      'Lead with elbows keeping them higher than hands',
      'Lower with control to starting position'
    ],
    variations: ['Dumbbell Upright Row', 'Cable Upright Row', 'Wide-Grip Upright Row', 'Single-Arm Upright Row'],
    tips: ['Skip this if you have shoulder impingement issues', 'Keep bar close to body', 'Dont pull higher than chest level', 'Dumbbell version allows more natural wrist movement'],
    commonMistakes: ['Pulling too high (shoulder impingement risk)', 'Using too wide a grip', 'Leaning back excessively', 'Letting elbows drop below wrists']
  },
  {
    id: 'shrugs',
    name: 'Barbell Shrugs',
    category: 'Shoulders',
    primaryMuscles: ['Upper Trapezius'],
    secondaryMuscles: ['Middle Traps', 'Rhomboids'],
    equipment: ['Barbell', 'Dumbbell'],
    difficulty: 'Beginner',
    description: 'Direct trap builder that creates the impressive upper back and neck development.',
    instructions: [
      'Hold barbell in front of thighs with overhand grip',
      'Shrug shoulders straight up toward ears',
      'Hold contraction at top for 1-2 seconds',
      'Lower with control feeling stretch',
      'Keep arms straight throughout'
    ],
    variations: ['Dumbbell Shrugs', 'Behind-the-Back Shrugs', 'Smith Machine Shrugs', 'Kirk Shrugs', 'Power Shrugs'],
    tips: ['Heavy weight works well for shrugs', 'Focus on the squeeze, not the weight moved', 'Dont roll shoulders (up and back is fine, but rolling is unnecessary)', 'Hold at top for maximum contraction'],
    commonMistakes: ['Rolling shoulders in circles', 'Using momentum', 'Not getting full range of motion', 'Bending arms to assist']
  },
  {
    id: 'landmine-press',
    name: 'Landmine Press',
    category: 'Shoulders',
    primaryMuscles: ['Anterior Deltoids'],
    secondaryMuscles: ['Upper Chest', 'Triceps', 'Core'],
    equipment: ['Barbell'],
    difficulty: 'Beginner',
    description: 'Shoulder-friendly pressing variation that follows a natural arc and reduces shoulder strain.',
    instructions: [
      'Place one end of barbell in landmine attachment or corner',
      'Hold other end at shoulder height with both hands',
      'Press bar up and forward at a 45-degree angle',
      'Extend arms fully at top',
      'Lower with control to shoulder'
    ],
    variations: ['Single-Arm Landmine Press', 'Kneeling Landmine Press', 'Landmine Push Press', 'Landmine Arc Press'],
    tips: ['Great for those with shoulder pain during regular pressing', 'The arc motion is very natural', 'Can load heavier than you think', 'Engages core for anti-rotation'],
    commonMistakes: ['Not using full range of motion', 'Leaning back too much', 'Using only arms (not engaging shoulders)', 'Letting bar drift to one side']
  },
  // ARMS - 7 exercises
  {
    id: 'barbell-curl',
    name: 'Barbell Curl',
    category: 'Arms',
    primaryMuscles: ['Biceps Brachii'],
    secondaryMuscles: ['Forearms', 'Brachialis'],
    equipment: ['Barbell'],
    difficulty: 'Beginner',
    description: 'The mass-building staple for bicep peak and overall arm thickness.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Grip bar at shoulder width with supinated (palms-up) grip',
      'Keep elbows pinned to sides throughout',
      'Curl bar toward upper chest',
      'Squeeze biceps hard at top',
      'Lower slowly without swinging'
    ],
    variations: ['EZ Bar Curl', 'Drag Curl', 'Wide-Grip Curl', 'Close-Grip Curl', '21s', ' preacher Curl'],
    tips: ['EZ bar is easier on wrists', 'Keep elbows stationary - they shouldnt move forward', 'Full range of motion: full extension to peak contraction', 'Squeeze at top for 1 second'],
    commonMistakes: ['Swinging body to curl (cheating too early)', 'Elbows drifting forward', 'Not lowering to full extension', 'Using too much weight']
  },
  {
    id: 'tricep-dips',
    name: 'Tricep Dips',
    category: 'Arms',
    primaryMuscles: ['Triceps'],
    secondaryMuscles: ['Chest', 'Front Delts'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    description: 'Compound bodyweight movement for tricep mass, lockout strength, and pressing power.',
    instructions: [
      'Grip parallel bars and lift body with arms extended',
      'Keep torso upright for maximum tricep focus',
      'Lower until shoulders hit elbow height or slightly below',
      'Press back up locking out at top',
      'Keep elbows tucked, dont let them flare'
    ],
    variations: ['Bench Dips', 'Weighted Dips', 'Ring Dips', 'Straight Bar Dip', 'Assisted Dips'],
    tips: ['Upright torso = more triceps; lean forward = more chest', 'Full range of motion with control', 'Add weight with dip belt when ready', 'Lock out at top for full tricep contraction'],
    commonMistakes: ['Not going deep enough', 'Flaring elbows excessively', 'Shrugging shoulders', 'Partial reps']
  },
  {
    id: 'hammer-curls',
    name: 'Hammer Curls',
    category: 'Arms',
    primaryMuscles: ['Brachialis', 'Brachioradialis'],
    secondaryMuscles: ['Biceps', 'Forearms'],
    equipment: ['Dumbbell'],
    difficulty: 'Beginner',
    description: 'Neutral grip curl that builds forearm thickness, bicep width, and overall arm development.',
    instructions: [
      'Stand holding dumbbells with neutral grip (palms facing each other)',
      'Keep elbows at sides throughout movement',
      'Curl one dumbbell up toward opposite shoulder',
      'Lower with control and alternate sides',
      'Or curl both simultaneously'
    ],
    variations: ['Cross-Body Hammer Curl', 'Rope Hammer Curl', 'Incline Hammer Curl', 'Waiter Curls', 'Zottman Curls'],
    tips: ['Neutral grip targets brachialis (pushes bicep up for peak)', 'Great for forearm development too', 'Can go heavier than regular curls', 'Cross-body version hits brachialis even more'],
    commonMistakes: ['Swinging the dumbbells', 'Letting elbows drift behind body', 'Not controlling the lowering phase', 'Gripping too tight']
  },
  {
    id: 'tricep-pushdown',
    name: 'Tricep Pushdowns',
    category: 'Arms',
    primaryMuscles: ['Triceps (Lateral & Medial Heads)'],
    secondaryMuscles: ['Forearms'],
    equipment: ['Cable'],
    difficulty: 'Beginner',
    description: 'Isolation staple for tricep definition, horseshoe development, and lockout strength.',
    instructions: [
      'Set cable at upper chest height',
      'Use straight bar, V-bar, or rope attachment',
      'Start with elbows at 90 degrees tucked to sides',
      'Press down until arms fully extended',
      'Squeeze triceps hard at bottom for 1-2 seconds',
      'Return to start without moving upper arms'
    ],
    variations: ['Rope Pushdown', 'V-Bar Pushdown', 'Overhead Extension', 'Kickback', 'Reverse-Grip Pushdown'],
    tips: ['Try different attachments for varied stimulus', 'Overhead extensions target long head', 'Keep elbows stationary - dont let them flare', 'Full extension with squeeze at bottom'],
    commonMistakes: ['Using body momentum', 'Elbows flaring outward', 'Not achieving full extension', 'Going too heavy and losing form']
  },
  {
    id: 'preacher-curl',
    name: 'Preacher Curl',
    category: 'Arms',
    primaryMuscles: ['Biceps Brachii (Short Head)'],
    secondaryMuscles: ['Brachialis', 'Forearms'],
    equipment: ['Barbell', 'Dumbbell'],
    difficulty: 'Intermediate',
    description: 'Isolation curl performed on a preacher bench that eliminates cheating and builds bicep peak.',
    instructions: [
      'Sit at preacher bench with upper arms flat on pad',
      'Grip bar or dumbbell with supinated grip',
      'Curl weight up squeezing biceps',
      'Lower to full extension on pad',
      'Keep upper arms in contact with pad throughout'
    ],
    variations: ['EZ Bar Preacher Curl', 'Dumbbell Preacher Curl', 'Single-Arm Preacher Curl', 'Spider Curl'],
    tips: ['The pad prevents swinging - pure isolation', 'Great for developing bicep peak', 'Use EZ bar to reduce wrist strain', 'Full stretch at bottom promotes growth'],
    commonMistakes: ['Lifting elbows off the pad', 'Using too much weight', 'Partial range of motion', 'Rounding shoulders forward']
  },
  {
    id: 'skullcrushers',
    name: 'Skullcrushers',
    category: 'Arms',
    primaryMuscles: ['Triceps (Long Head)'],
    secondaryMuscles: ['Forearms'],
    equipment: ['Barbell', 'Dumbbell'],
    difficulty: 'Intermediate',
    description: 'Lying tricep extension that stretches the long head and builds overall tricep mass.',
    instructions: [
      'Lie on flat bench holding barbell or EZ bar',
      'Arms extended above chest, shoulder-width grip',
      'Bend elbows lowering bar toward forehead',
      'Keep upper arms perpendicular to floor',
      'Extend arms back to starting position'
    ],
    variations: ['Incline Skullcrusher', 'Decline Skullcrusher', 'Dumbbell Skullcrusher', 'Cable Skullcrusher', 'Rolling Tricep Extension'],
    tips: ['EZ bar is easier on wrists and elbows', 'Keep elbows tucked, dont let them flare', 'Lower behind head slightly for more stretch', 'The name is descriptive - be careful!'],
    commonMistakes: ['Flaring elbows outward', 'Moving upper arms (should stay still)', 'Going too heavy', 'Hitting yourself in the forehead']
  },
  {
    id: 'concentration-curl',
    name: 'Concentration Curl',
    category: 'Arms',
    primaryMuscles: ['Biceps Brachii (Short Head)'],
    secondaryMuscles: ['Brachialis'],
    equipment: ['Dumbbell'],
    difficulty: 'Beginner',
    description: 'Single-arm isolation curl that maximizes mind-muscle connection and peak contraction.',
    instructions: [
      'Sit on bench with legs spread',
      'Hold dumbbell in one hand, arm extended between legs',
      'Rest elbow against inner thigh for stability',
      'Curl dumbbell toward opposite shoulder',
      'Squeeze bicep at top and lower slowly'
    ],
    variations: ['Standing Concentration Curl', 'Cable Concentration Curl', 'Incline Concentration Curl'],
    tips: ['Excellent for mind-muscle connection', 'Great finisher exercise', 'Squeeze hard at top for 2 seconds', 'Use light weight and perfect form'],
    commonMistakes: ['Using momentum from torso', 'Not getting full extension at bottom', 'Going too heavy', 'Moving elbow off thigh']
  },
  // CORE - 7 exercises
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg Raises',
    category: 'Core',
    primaryMuscles: ['Lower Abs', 'Hip Flexors'],
    secondaryMuscles: ['Forearms', 'Lats'],
    equipment: ['Bodyweight'],
    difficulty: 'Intermediate',
    description: 'The ultimate lower ab builder that also improves grip strength and lat stability.',
    instructions: [
      'Hang from pull-up bar with straight arms, shoulder-width grip',
      'Initiate by posteriorly tilting pelvis (tuck tailbone)',
      'Raise legs until parallel to floor or higher',
      'Control the lowering phase preventing swing',
      'Repeat without swinging between reps'
    ],
    variations: ['Lying Leg Raise', "Captains Chair", 'Toes-to-Bar', 'Windshield Wipers', 'Hanging Knee Raise', 'Dragon Flags'],
    tips: ['The pelvis tuck is key - thats what engages lower abs', 'Dont just lift legs, lift hips', 'Control the eccentric to prevent swinging', 'Build up: knee raises → leg raises → toes to bar'],
    commonMistakes: ['Just lifting legs without hip tilt', 'Swinging excessively', 'Bending arms to assist', 'Not controlling the lowering']
  },
  {
    id: 'ab-wheel',
    name: 'Ab Wheel Rollout',
    category: 'Core',
    primaryMuscles: ['Rectus Abdominis'],
    secondaryMuscles: ['Obliques', 'Lats', 'Hip Flexors', 'Shoulders'],
    equipment: ['Bodyweight'],
    difficulty: 'Advanced',
    description: 'Anti-extension core exercise that builds insane core stability, strength, and six-pack development.',
    instructions: [
      'Kneel with ab wheel directly under shoulders',
      'Brace core as if doing a plank (hollow body position)',
      'Roll forward extending body while maintaining hollow position',
      'Go as far as you can without arching lower back',
      'Pull back to starting position using core, not hips'
    ],
    variations: ['Standing Rollout (advanced)', 'Wheel Pike', 'Single-Arm Rollout', 'Barbell Rollout', 'Stability Ball Rollout'],
    tips: ['This is harder than it looks - start with small rollouts', 'The moment your back arches, youve gone too far', 'Great for building plank strength progression', 'Quality over distance'],
    commonMistakes: ['Arching lower back (spinal extension)', 'Using hips to pull back', 'Going too far too soon', 'Not bracing core before rolling']
  },
  {
    id: 'russian-twist',
    name: 'Russian Twists',
    category: 'Core',
    primaryMuscles: ['Obliques'],
    secondaryMuscles: ['Rectus Abdominis', 'Hip Flexors'],
    equipment: ['Bodyweight', 'Dumbbell', 'Kettlebell'],
    difficulty: 'Beginner',
    description: 'Rotational core movement for oblique definition, trunk stability, and athletic performance.',
    instructions: [
      'Sit with knees bent and feet elevated (or on floor for beginners)',
      'Lean back to 45 degrees keeping back straight',
      'Hold weight or clasp hands together',
      'Rotate torso touching weight or hands to floor each side',
      'Move slowly with control, following hands with eyes'
    ],
    variations: ['Weighted Russian Twist', 'Cable Woodchop', 'Side Plank Rotation', 'Pallof Press', 'Bicycle Crunch'],
    tips: ['Feet on floor = easier; feet elevated = harder', 'Lean back further to increase difficulty', 'Control the rotation - dont just fling side to side', 'Exhale on each twist'],
    commonMistakes: ['Rotating only arms (not torso)', 'Rounding lower back', 'Going too fast', 'Not getting full rotation']
  },
  {
    id: 'plank',
    name: 'Front Plank',
    category: 'Core',
    primaryMuscles: ['Transverse Abdominis', 'Rectus Abdominis'],
    secondaryMuscles: ['Glutes', 'Shoulders', 'Back', 'Obliques'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    description: 'Isometric core hold that builds foundational stability for all lifts and daily movement.',
    instructions: [
      'Start in push-up position on forearms',
      'Elbows directly under shoulders',
      'Body in straight line from head to heels',
      'Brace core and squeeze glutes',
      'Breathe normally without holding breath',
      'Hold for prescribed time'
    ],
    variations: ['Side Plank', 'Plank with Leg Raise', 'Plank to Push-up', 'Weighted Plank', 'Long Lever Plank', 'Suspension Trainer Plank'],
    tips: ['Quality over duration - 30s perfect plank > 2min sloppy plank', 'Squeeze everything - glutes, quads, core', 'Dont let hips sag or pike up', 'Great to do every day'],
    commonMistakes: ['Sagging hips (lower back arches)', 'Piking hips too high', 'Holding breath', 'Looking up or letting head drop']
  },
  {
    id: 'crunches',
    name: 'Crunches',
    category: 'Core',
    primaryMuscles: ['Rectus Abdominis (Upper)'],
    secondaryMuscles: ['Obliques'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    description: 'Classic upper ab exercise that isolates the rectus abdominis through spinal flexion.',
    instructions: [
      'Lie on back with knees bent, feet flat on floor',
      'Place hands lightly behind head (dont pull on neck)',
      'Curl shoulder blades off floor using abs',
      'Hold contraction for 1 second at top',
      'Lower with control but dont fully relax at bottom'
    ],
    variations: ['Reverse Crunch', 'Bicycle Crunch', 'Cable Crunch', 'Swiss Ball Crunch', 'Decline Crunch'],
    tips: ['Lift shoulder blades, not your whole back', 'Look at ceiling to keep neck neutral', 'Exhale as you crunch up', 'Feel the abs doing the work, not neck'],
    commonMistakes: ['Pulling on neck with hands', 'Using momentum to sit up', 'Not getting shoulder blades off floor', 'Going too fast']
  },
  {
    id: 'dead-bug',
    name: 'Dead Bug',
    category: 'Core',
    primaryMuscles: ['Transverse Abdominis', 'Rectus Abdominis'],
    secondaryMuscles: ['Hip Flexors', 'Obliques'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    description: 'Anti-extension core exercise that teaches proper bracing and protects the lower back.',
    instructions: [
      'Lie on back with arms extended toward ceiling',
      'Lift legs with knees bent at 90 degrees',
      'Press lower back firmly into floor (imprinted spine)',
      'Slowly lower one arm and opposite leg',
      'Return to start and repeat on other side',
      'Never let lower back arch off the floor'
    ],
    variations: ['Hollow Body Hold', 'Bird Dog', 'Ab Wheel Rollout', 'Plank', 'Pallof Press'],
    tips: ['The back imprint is the key to this exercise', 'Move slowly and with control', 'Exhale as you extend', 'Great for beginners and back pain sufferers'],
    commonMistakes: ['Letting lower back arch (losing imprint)', 'Moving too fast', 'Not breathing properly', 'Bending arms or legs unevenly']
  },
  {
    id: 'side-plank',
    name: 'Side Plank',
    category: 'Core',
    primaryMuscles: ['Obliques', 'Quadratus Lumborum'],
    secondaryMuscles: ['Glutes', 'Shoulders', 'Adductors'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    description: 'Lateral core stability exercise that targets obliques and improves anti-lateral flexion strength.',
    instructions: [
      'Lie on side with elbow directly under shoulder',
      'Stack feet on top of each other',
      'Lift hips off floor forming straight line',
      'Hold position without letting hips sag',
      'Breathe normally throughout'
    ],
    variations: ['Side Plank with Hip Dip', 'Side Plank with Leg Raise', 'Side Plank Reach-Through', 'Copenhagen Plank'],
    tips: ['Stack hips vertically - dont let them rotate', 'Keep head in line with spine', 'Modifications: stagger feet or bend bottom knee', 'Great for oblique strength and side stability'],
    commonMistakes: ['Letting hips sag toward floor', 'Hips rotating forward or back', 'Holding breath', 'Elbow not under shoulder (should be uncomfortable)']
  }
];

export const muscleGroups: MuscleGroup[] = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];
export const equipmentTypes: Equipment[] = ['Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight', 'Kettlebell', 'Resistance Band'];
export const difficulties: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

export const getExercisesByMuscle = (muscle: MuscleGroup) => exercises.filter(e => e.category === muscle);
export const getExerciseById = (id: string) => exercises.find(e => e.id === id);
export const getExercisesByEquipment = (equipment: Equipment) => exercises.filter(e => e.equipment.includes(equipment));
