import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  TrendingUp,
  RotateCcw,
  Info,
  Plus,
  Minus,
  GlassWater,
  Scale,
  Dumbbell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/* ─── 1RM Calculator ─── */
function OneRepMaxCalculator() {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  const oneRM = useMemo(() => {
    const w = parseFloat(weight);
    const r = parseFloat(reps);
    if (!w || !r || r < 1 || r > 30) return null;

    // Epley formula: weight × (1 + reps/30)
    const epley = Math.round(w * (1 + r / 30));
    // Brzycki formula: weight / (1.0278 - 0.0278 × reps)
    const brzycki = Math.round(w / (1.0278 - 0.0278 * r));
    // Lombardi formula: weight × reps^0.10
    const lombardi = Math.round(w * Math.pow(r, 0.10));
    // Average
    const average = Math.round((epley + brzycki + lombardi) / 3);

    // Percentage table
    const percentages = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50];
    const table = percentages.map((pct) => ({
      pct,
      weight: Math.round(average * (pct / 100)),
    }));

    return { epley, brzycki, lombardi, average, table };
  }, [weight, reps]);

  return (
    <div className="glass rounded-xl border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Dumbbell className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-white">1RM Calculator</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Estimate your one-rep max using three proven formulas. Enter a weight you can lift for
        multiple reps.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Weight Lifted (kg/lbs)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary outline-none"
            placeholder="100"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Reps Performed (1-30)</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            min="1"
            max="30"
            className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary outline-none"
            placeholder="5"
          />
        </div>
      </div>

      {oneRM && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Average */}
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/20 text-center">
            <p className="text-xs text-primary mb-1">Estimated 1RM (Average)</p>
            <p className="text-4xl font-bold text-primary">{oneRM.average}</p>
            <p className="text-xs text-primary/60">{weight.includes('kg') || parseFloat(weight) > 300 ? 'kg' : 'lbs'}</p>
          </div>

          {/* Formula Breakdown */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-secondary/50 rounded-lg p-3 text-center border border-border">
              <p className="text-xs text-muted-foreground mb-1">Epley</p>
              <p className="text-lg font-bold text-white">{oneRM.epley}</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3 text-center border border-border">
              <p className="text-xs text-muted-foreground mb-1">Brzycki</p>
              <p className="text-lg font-bold text-white">{oneRM.brzycki}</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3 text-center border border-border">
              <p className="text-xs text-muted-foreground mb-1">Lombardi</p>
              <p className="text-lg font-bold text-white">{oneRM.lombardi}</p>
            </div>
          </div>

          {/* Percentage Table */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Percentage Table</h4>
            <div className="grid grid-cols-2 gap-2">
              {oneRM.table.map((row) => (
                <div
                  key={row.pct}
                  className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2 border border-border"
                >
                  <span className="text-sm text-muted-foreground">{row.pct}%</span>
                  <span className="text-sm font-semibold text-foreground">{row.weight}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {!oneRM && (
        <div className="text-center py-6 text-muted-foreground text-sm">
          Enter weight and reps to calculate your estimated one-rep max
        </div>
      )}
    </div>
  );
}

/* ─── BMI Calculator ─── */
function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  const bmi = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h) return null;

    let weightKg = unit === 'metric' ? w : w * 0.453592;
    let heightM = unit === 'metric' ? h / 100 : h * 0.0254;

    const value = weightKg / (heightM * heightM);
    return Math.round(value * 10) / 10;
  }, [weight, height, unit]);

  const getCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' };
    if (val < 25) return { label: 'Normal', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' };
    if (val < 30) return { label: 'Overweight', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' };
    return { label: 'Obese', color: 'text-red-400 bg-red-400/10 border-red-400/20' };
  };

  const category = bmi ? getCategory(bmi) : null;

  return (
    <div className="glass rounded-xl border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Scale className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-white">BMI Calculator</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Unit</label>
          <div className="flex bg-secondary rounded-lg p-1 border border-border">
            {(['metric', 'imperial'] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={cn(
                  'flex-1 py-1.5 text-sm rounded-md font-medium transition-colors capitalize',
                  unit === u ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary outline-none"
              placeholder={unit === 'metric' ? '80' : '175'}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Height {unit === 'metric' ? '(cm)' : '(inches)'}
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary outline-none"
              placeholder={unit === 'metric' ? '180' : '70'}
            />
          </div>
        </div>
      </div>

      {bmi && category && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-xs text-muted-foreground mb-1">Your BMI</p>
          <p className="text-5xl font-bold text-white mb-2">{bmi}</p>
          <Badge variant="outline" className={category.color}>
            {category.label}
          </Badge>

          {/* BMI Scale */}
          <div className="mt-6 relative">
            <div className="h-3 rounded-full overflow-hidden flex">
              <div className="w-[18.5%] h-full bg-blue-500" />
              <div className="w-[16.5%] h-full bg-emerald-500" />
              <div className="w-[20%] h-full bg-amber-500" />
              <div className="flex-1 h-full bg-red-500" />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>16</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
            {/* Marker */}
            <div
              className="absolute top-0 w-0.5 h-5 bg-white -mt-1"
              style={{ left: `${Math.min(Math.max(((bmi - 16) / 24) * 100, 0), 100)}%` }}
            />
          </div>
        </motion.div>
      )}

      {!bmi && (
        <div className="text-center py-6 text-muted-foreground text-sm">
          Enter your weight and height to calculate BMI
        </div>
      )}
    </div>
  );
}

/* ─── Water Tracker ─── */
function WaterTracker() {
  const [glasses, setGlasses] = useState(() => {
    const saved = localStorage.getItem('water-tracker');
    return saved ? parseInt(saved) : 0;
  });
  const goal = 8;

  const updateGlasses = (newVal: number) => {
    const clamped = Math.max(0, Math.min(newVal, 20));
    setGlasses(clamped);
    localStorage.setItem('water-tracker', clamped.toString());
  };

  const percentage = Math.min((glasses / goal) * 100, 100);

  return (
    <div className="glass rounded-xl border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <GlassWater className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-bold text-white">Water Tracker</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Track your daily water intake. Aim for at least 8 glasses (2 liters) per day for optimal
        hydration and performance.
      </p>

      {/* Progress */}
      <div className="text-center mb-6">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(220 15% 16%)" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="hsl(217 91% 60%)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 2.64} 264`}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{glasses}</span>
            <span className="text-xs text-muted-foreground">/ {goal}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {glasses >= goal ? (
            <span className="text-emerald-400 font-medium">Goal reached! Great job!</span>
          ) : (
            `${goal - glasses} more glasses to reach your goal`
          )}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => updateGlasses(glasses - 1)}
          className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
        >
          <Minus className="w-5 h-5" />
        </button>
        <button
          onClick={() => updateGlasses(glasses + 1)}
          className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
        <button
          onClick={() => updateGlasses(0)}
          className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Glasses Grid */}
      <div className="grid grid-cols-8 gap-1.5 mt-6">
        {Array.from({ length: goal }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'aspect-square rounded-md flex items-center justify-center transition-all',
              i < glasses
                ? 'bg-blue-500/20 border border-blue-500/40'
                : 'bg-secondary border border-border'
            )}
          >
            <GlassWater
              className={cn('w-4 h-4', i < glasses ? 'text-blue-400' : 'text-muted-foreground/30')}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Progress Tracker ─── */
function ProgressTracker() {
  const [entries, setEntries] = useState<{ date: string; weight: string; bodyfat?: string }[]>(() => {
    const saved = localStorage.getItem('progress-tracker');
    return saved ? JSON.parse(saved) : [];
  });
  const [newWeight, setNewWeight] = useState('');
  const [newBodyfat, setNewBodyfat] = useState('');

  const addEntry = () => {
    if (!newWeight) return;
    const entry = {
      date: new Date().toISOString().split('T')[0],
      weight: newWeight,
      bodyfat: newBodyfat || undefined,
    };
    const updated = [entry, ...entries].slice(0, 20);
    setEntries(updated);
    localStorage.setItem('progress-tracker', JSON.stringify(updated));
    setNewWeight('');
    setNewBodyfat('');
  };

  const deleteEntry = (index: number) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
    localStorage.setItem('progress-tracker', JSON.stringify(updated));
  };

  const weightChange = entries.length >= 2
    ? (parseFloat(entries[0].weight) - parseFloat(entries[entries.length - 1].weight)).toFixed(1)
    : null;

  return (
    <div className="glass rounded-xl border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-white">Progress Tracker</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Log your weight and body fat percentage to track changes over time. Data is saved locally
        in your browser.
      </p>

      {/* Add Entry */}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={newWeight}
          onChange={(e) => setNewWeight(e.target.value)}
          placeholder="Weight (kg/lbs)"
          className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary outline-none"
        />
        <input
          type="number"
          value={newBodyfat}
          onChange={(e) => setNewBodyfat(e.target.value)}
          placeholder="Body fat % (opt)"
          className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary outline-none"
        />
        <Button onClick={addEntry} size="sm" className="gap-1">
          <Plus className="w-4 h-4" /> Add
        </Button>
      </div>

      {/* Summary */}
      {weightChange && (
        <div className="bg-secondary/50 rounded-lg p-3 border border-border mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Change</span>
            <span
              className={cn(
                'font-semibold',
                parseFloat(weightChange) < 0 ? 'text-emerald-400' : parseFloat(weightChange) > 0 ? 'text-amber-400' : 'text-foreground'
              )}
            >
              {parseFloat(weightChange) > 0 ? '+' : ''}
              {weightChange}
            </span>
          </div>
        </div>
      )}

      {/* Entries */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {entries.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-4">
            No entries yet. Add your first weigh-in above.
          </p>
        ) : (
          entries.map((entry, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2 border border-border"
            >
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground text-xs">{entry.date}</span>
                <span className="font-semibold text-foreground">{entry.weight}</span>
                {entry.bodyfat && (
                  <Badge variant="outline" className="text-xs">
                    {entry.bodyfat}% BF
                  </Badge>
                )}
              </div>
              <button
                onClick={() => deleteEntry(i)}
                className="text-muted-foreground hover:text-red-400 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ─── Main Tools Page ─── */
export function ToolsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Fitness Tools</h1>
        <p className="text-muted-foreground">
          Calculators, trackers, and utilities to support your fitness journey.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OneRepMaxCalculator />
        <BMICalculator />
        <WaterTracker />
        <ProgressTracker />
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 glass rounded-2xl border border-border p-6 md:p-8"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" /> How to Use These Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
              <Dumbbell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">1RM Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Enter a weight you can lift for multiple reps. The calculator uses three formulas
                (Epley, Brzycki, Lombardi) and averages them for a more accurate estimate. Use this
                to set training percentages.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-400/10 flex items-center justify-center shrink-0 border border-blue-400/20">
              <Scale className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">BMI Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Body Mass Index is a screening tool, not a diagnosis. Athletes with higher muscle
                mass may register as overweight. Combine with body fat percentage for better
                assessment.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
              <GlassWater className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Water Tracker</h3>
              <p className="text-sm text-muted-foreground">
                Hydration affects performance, recovery, and appetite. The 8-glass target is a
                baseline - active individuals may need 10-12 glasses. Your data saves automatically.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Progress Tracker</h3>
              <p className="text-sm text-muted-foreground">
                Weigh yourself at the same time daily (morning, after bathroom, before eating) for
                consistent data. Look for weekly trends, not daily fluctuations. Data persists in
                your browser.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
