import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { nutritionPlans, type NutritionPlan, type MealOption } from '@/data/nutrition';
import { cn } from '@/lib/utils';
import {
  Shuffle,
  Clock,
  ChefHat,
  Calculator,
  Info,
  X,
  ChevronRight,
  Beef,
  Wheat,
  Droplets,
  Dumbbell,
  TrendingDown,
  Minus,
  Check,
  Search,
  ShoppingCart,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { deleteSavedMeal, saveSavedMeal, setShoppingListExtra, uid } from '@/lib/fitness-storage';
import { useFitnessProfileData } from '@/hooks/use-fitness-data';

/* ─── Meal Detail Modal ─── */
function MealModal({ meal, category, onClose }: { meal: MealOption; category: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-accent transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <Badge variant="outline" className="mb-3 text-blue-400 bg-blue-400/10 border-blue-400/20">
            {category}
          </Badge>
          <h2 className="text-2xl font-bold text-white mb-4">{meal.name}</h2>

          {/* Macros */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="bg-secondary/50 rounded-lg p-3 text-center border border-border">
              <p className="text-lg font-bold text-white">{meal.calories}</p>
              <p className="text-xs text-muted-foreground">Calories</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3 text-center border border-border">
              <p className="text-lg font-bold text-blue-400">{meal.protein}g</p>
              <p className="text-xs text-muted-foreground">Protein</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3 text-center border border-border">
              <p className="text-lg font-bold text-emerald-400">{meal.carbs}g</p>
              <p className="text-xs text-muted-foreground">Carbs</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3 text-center border border-border">
              <p className="text-lg font-bold text-amber-400">{meal.fats}g</p>
              <p className="text-xs text-muted-foreground">Fats</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {meal.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium border border-primary/20"
              >
                {tag}
              </span>
            ))}
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-secondary text-muted-foreground text-xs border border-border">
              <Clock className="w-3 h-3" /> {meal.prepTime} min prep
            </span>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
              <ChefHat className="w-4 h-4 text-primary" /> Ingredients
            </h3>
            <ul className="space-y-2">
              {meal.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          {meal.instructions && (
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                <ChefHat className="w-4 h-4 text-primary" /> Instructions
              </h3>
              <ol className="space-y-2.5">
                {meal.instructions.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Saved meals (local) ─── */
function SavedMealsPanel() {
  const [data, refresh] = useFitnessProfileData();
  const [q, setQ] = useState('');
  const [name, setName] = useState('');
  const [cal, setCal] = useState('');
  const [p, setP] = useState('');
  const [c, setC] = useState('');
  const [f, setF] = useState('');

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return data.savedMeals;
    return data.savedMeals.filter((m) => m.name.toLowerCase().includes(t));
  }, [data.savedMeals, q]);

  const add = () => {
    const meal = {
      id: uid('meal'),
      name: name.trim() || 'Custom meal',
      calories: parseInt(cal, 10) || 0,
      protein: parseFloat(p) || 0,
      carbs: parseFloat(c) || 0,
      fats: parseFloat(f) || 0,
      createdAt: new Date().toISOString(),
    };
    saveSavedMeal(meal);
    setName('');
    setCal('');
    setP('');
    setC('');
    setF('');
    refresh();
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl border border-border p-6">
        <h2 className="text-xl font-bold text-white mb-4">Save a meal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <Label className="text-muted-foreground">Name</Label>
            <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Post-workout bowl" />
          </div>
          <div>
            <Label className="text-muted-foreground">Calories</Label>
            <Input className="mt-1" type="number" value={cal} onChange={(e) => setCal(e.target.value)} />
          </div>
          <div>
            <Label className="text-muted-foreground">Protein (g)</Label>
            <Input className="mt-1" type="number" value={p} onChange={(e) => setP(e.target.value)} />
          </div>
          <div>
            <Label className="text-muted-foreground">Carbs (g)</Label>
            <Input className="mt-1" type="number" value={c} onChange={(e) => setC(e.target.value)} />
          </div>
          <div>
            <Label className="text-muted-foreground">Fats (g)</Label>
            <Input className="mt-1" type="number" value={f} onChange={(e) => setF(e.target.value)} />
          </div>
        </div>
        <Button onClick={add}>Save meal</Button>
      </div>

      <div className="glass rounded-xl border border-border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">My library</h2>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2 max-h-[420px] overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">No saved meals yet.</p>
          ) : (
            filtered.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between gap-2 border border-border rounded-lg px-3 py-2 bg-secondary/30"
              >
                <div>
                  <p className="font-medium text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {m.calories} kcal · P{m.protein} C{m.carbs} F{m.fats}
                  </p>
                </div>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-red-400 p-1"
                  onClick={() => {
                    deleteSavedMeal(m.id);
                    refresh();
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Shopping list from planner snapshot ─── */
function ShoppingListPanel() {
  const [data, refresh] = useFitnessProfileData();
  const [baseLines, setBaseLines] = useState<string[]>([]);
  const [extraInput, setExtraInput] = useState(data.shoppingListExtra.join('\n'));

  const mergedLines = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const line of baseLines) {
      const k = line.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(line);
    }
    for (const line of data.shoppingListExtra) {
      const k = line.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(line);
    }
    return out.sort((a, b) => a.localeCompare(b));
  }, [baseLines, data.shoppingListExtra]);

  useEffect(() => {
    setExtraInput(data.shoppingListExtra.join('\n'));
  }, [data.shoppingListExtra]);

  useEffect(() => {
    const load = () => {
      try {
        const raw = sessionStorage.getItem('fitnesspro:nutritionSnapshot');
        if (!raw) {
          setBaseLines([]);
          return;
        }
        const parsed = JSON.parse(raw) as { meals: MealOption[] };
        const bag = new Map<string, string>();
        for (const meal of parsed.meals ?? []) {
          for (const ing of meal.ingredients) {
            const key = ing.trim().toLowerCase();
            if (!bag.has(key)) bag.set(key, ing.trim());
          }
        }
        setBaseLines([...bag.values()]);
      } catch {
        setBaseLines([]);
      }
    };
    load();
    const id = window.setInterval(load, 1200);
    return () => clearInterval(id);
  }, []);

  const saveExtras = () => {
    const items = extraInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    setShoppingListExtra(items);
    refresh();
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl border border-border p-6">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary" />
          Shopping list
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Combines ingredients from your current planner day with your saved “always buy” lines.
        </p>
        {mergedLines.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Open Planner and pick meals, or add lines under “Always buy” below.
          </p>
        ) : (
          <ul className="space-y-2">
            {mergedLines.map((line) => (
              <li key={line} className="flex gap-2 text-sm text-foreground">
                <span className="text-primary">•</span>
                {line}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="glass rounded-xl border border-border p-6">
        <h2 className="text-xl font-bold text-white mb-2">Always buy (per profile)</h2>
        <p className="text-xs text-muted-foreground mb-3">One item per line — saved with your profile data.</p>
        <textarea
          className="w-full min-h-[120px] bg-secondary border border-border rounded-lg p-3 text-sm text-foreground"
          value={extraInput}
          onChange={(e) => setExtraInput(e.target.value)}
        />
        <Button className="mt-2" variant="secondary" onClick={saveExtras}>
          Save extras
        </Button>
      </div>
    </div>
  );
}

/* ─── Meal Planner ─── */
function MealPlanner() {
  const [selectedPlan, setSelectedPlan] = useState<NutritionPlan>(nutritionPlans[0]);
  const [meals, setMeals] = useState<MealOption[]>(
    selectedPlan.slots.map((slot) => slot.options[0])
  );
  const [selectedMeal, setSelectedMeal] = useState<{ meal: MealOption; category: string } | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        'fitnesspro:nutritionSnapshot',
        JSON.stringify({ planId: selectedPlan.id, meals })
      );
    } catch {
      /* storage full */
    }
  }, [selectedPlan.id, meals]);

  const handleShuffle = useCallback(() => {
    setIsShuffling(true);
    setTimeout(() => {
      const newMeals = selectedPlan.slots.map((slot) => {
        const randomIndex = Math.floor(Math.random() * slot.options.length);
        return slot.options[randomIndex];
      });
      setMeals(newMeals);
      setIsShuffling(false);
    }, 300);
  }, [selectedPlan]);

  const handlePlanChange = (plan: NutritionPlan) => {
    setSelectedPlan(plan);
    setMeals(plan.slots.map((slot) => slot.options[0]));
  };

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFats = meals.reduce((sum, m) => sum + m.fats, 0);
  const totalFiber = meals.reduce((sum, m) => sum + m.fiber, 0);

  const proteinPct = Math.round(((totalProtein * 4) / totalCalories) * 100) || 0;
  const carbsPct = Math.round(((totalCarbs * 4) / totalCalories) * 100) || 0;
  const fatsPct = Math.round(((totalFats * 9) / totalCalories) * 100) || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Meal Planner</h2>
          <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
        </div>
        <Button
          onClick={handleShuffle}
          disabled={isShuffling}
          className="gap-2 shrink-0"
          variant="secondary"
        >
          <Shuffle className={cn('w-4 h-4', isShuffling && 'animate-spin')} /> Shuffle Meals
        </Button>
      </div>

      {/* Plan Selector */}
      <div className="flex flex-wrap gap-2">
        {nutritionPlans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => handlePlanChange(plan)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium border transition-all',
              selectedPlan.id === plan.id
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-primary/30'
            )}
          >
            {plan.name}
          </button>
        ))}
      </div>

      {/* Plan Tips */}
      <div className="bg-secondary/50 rounded-xl border border-border p-4">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <div className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Target: {selectedPlan.targetCalories}</span>
            {' • '}
            Protein {selectedPlan.macroSplit.protein} • Carbs {selectedPlan.macroSplit.carbs} • Fats{' '}
            {selectedPlan.macroSplit.fats}
          </div>
        </div>
      </div>

      {/* Macro Summary */}
      <motion.div
        key={selectedPlan.id + meals.map((m) => m.id).join('-')}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl border border-border p-5"
      >
        <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
          Daily Macro Summary
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{totalCalories}</p>
            <p className="text-xs text-muted-foreground">Calories</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">{totalProtein}g</p>
            <p className="text-xs text-muted-foreground">Protein</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400">{totalCarbs}g</p>
            <p className="text-xs text-muted-foreground">Carbs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-400">{totalFats}g</p>
            <p className="text-xs text-muted-foreground">Fats</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">{totalFiber}g</p>
            <p className="text-xs text-muted-foreground">Fiber</p>
          </div>
        </div>

        {/* Macro Bar */}
        <div className="h-4 bg-secondary rounded-full overflow-hidden flex">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${proteinPct}%` }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="h-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${carbsPct}%` }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <motion.div
            className="h-full bg-amber-500"
            initial={{ width: 0 }}
            animate={{ width: `${fatsPct}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
        <div className="flex gap-4 mt-2 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Protein {proteinPct}%
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Carbs {carbsPct}%
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Fats {fatsPct}%
          </span>
        </div>
      </motion.div>

      {/* Meals */}
      <div ref={containerRef} className="space-y-3">
        <AnimatePresence mode="popLayout">
          {meals.map((meal, index) => {
            const slot = selectedPlan.slots[index];
            return (
              <motion.div
                key={`${slot.category}-${meal.id}`}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                className="glass rounded-xl border border-border p-4 card-hover cursor-pointer"
                onClick={() => setSelectedMeal({ meal, category: slot.category })}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-blue-400 bg-blue-400/10 border-blue-400/20">
                      {slot.category}
                    </Badge>
                    <h3 className="font-semibold text-foreground">{meal.name}</h3>
                  </div>
                  <span className="text-sm text-muted-foreground flex items-center gap-1 shrink-0">
                    <Clock className="w-3.5 h-3.5" /> {meal.prepTime}m
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-3">
                  <span className="text-muted-foreground">{meal.calories} cal</span>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="text-blue-400">{meal.protein}g protein</span>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="text-emerald-400">{meal.carbs}g carbs</span>
                  <span className="text-muted-foreground/30">•</span>
                  <span className="text-amber-400">{meal.fats}g fats</span>
                </div>

                <div className="bg-secondary/50 rounded-lg p-2.5 border border-border">
                  <div className="flex flex-wrap gap-1.5">
                    {meal.ingredients.slice(0, 5).map((ing, i) => (
                      <span
                        key={i}
                        className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded border border-border"
                      >
                        {ing}
                      </span>
                    ))}
                    {meal.ingredients.length > 5 && (
                      <span className="text-xs text-muted-foreground px-1">
                        +{meal.ingredients.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                  View full recipe <ChevronRight className="w-3 h-3" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Tips */}
      <div className="bg-secondary/50 rounded-xl border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          {selectedPlan.name} Tips
        </h3>
        <ul className="space-y-2">
          {selectedPlan.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Meal Modal */}
      <AnimatePresence>
        {selectedMeal && (
          <MealModal
            meal={selectedMeal.meal}
            category={selectedMeal.category}
            onClose={() => setSelectedMeal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Macro Calculator ─── */
function MacroCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState(1.55);
  const [goal, setGoal] = useState<'cut' | 'maintain' | 'bulk'>('maintain');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  const results = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (!w || !h || !a) return null;

    const weightKg = unit === 'metric' ? w : w * 0.453592;
    const heightCm = unit === 'metric' ? h : h * 2.54;

    let bmr = 10 * weightKg + 6.25 * heightCm - 5 * a + (gender === 'male' ? 5 : -161);
    let tdee = bmr * activity;

    if (goal === 'cut') tdee -= 500;
    if (goal === 'bulk') tdee += 500;

    const protein = goal === 'cut' ? weightKg * 2.2 : weightKg * 2.0;
    const fats = weightKg * 0.9;
    const proteinCal = protein * 4;
    const fatCal = fats * 9;
    const carbCal = Math.max(0, tdee - proteinCal - fatCal);
    const carbs = carbCal / 4;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
      proteinPct: Math.round((proteinCal / tdee) * 100),
      carbsPct: Math.round((carbCal / tdee) * 100),
      fatsPct: Math.round((fatCal / tdee) * 100),
    };
  }, [weight, height, age, gender, activity, goal, unit]);

  const goals = [
    { key: 'cut' as const, label: 'Cut (-500)', icon: TrendingDown, color: 'bg-red-500/10 border-red-500/30 text-red-400' },
    { key: 'maintain' as const, label: 'Maintain', icon: Minus, color: 'bg-blue-500/10 border-blue-500/30 text-blue-400' },
    { key: 'bulk' as const, label: 'Bulk (+500)', icon: Dumbbell, color: 'bg-primary/10 border-primary/30 text-primary' },
  ];

  return (
    <div className="glass rounded-xl border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-white">Macro Calculator</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Uses the Mifflin-St Jeor equation to estimate your BMR and TDEE, then calculates
        personalized macros based on your goal.
      </p>

      <div className="space-y-4 mb-6">
        {/* Unit Toggle */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Unit System</label>
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

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Gender</label>
            <div className="flex bg-secondary rounded-lg p-1 border border-border">
              {(['male', 'female'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={cn(
                    'flex-1 py-1.5 text-sm rounded-md font-medium transition-colors capitalize',
                    gender === g ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
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
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder={unit === 'metric' ? '180' : '70'}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              placeholder="25"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Activity Level</label>
            <select
              value={activity}
              onChange={(e) => setActivity(parseFloat(e.target.value))}
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-foreground focus:border-primary outline-none"
            >
              <option value={1.2}>Sedentary (desk job)</option>
              <option value={1.375}>Lightly Active (1-3 days/week)</option>
              <option value={1.55}>Moderately Active (3-5 days/week)</option>
              <option value={1.725}>Very Active (6-7 days/week)</option>
              <option value={1.9}>Extremely Active (physical job)</option>
            </select>
          </div>
        </div>

        {/* Goal Selector */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Goal</label>
          <div className="grid grid-cols-3 gap-2">
            {goals.map((g) => {
              const Icon = g.icon;
              return (
                <button
                  key={g.key}
                  onClick={() => setGoal(g.key)}
                  className={cn(
                    'py-2.5 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-1.5',
                    goal === g.key ? g.color : 'bg-secondary border-border text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="w-4 h-4" /> {g.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary/50 rounded-lg p-4 border border-border text-center">
                <p className="text-xs text-muted-foreground mb-1">BMR</p>
                <p className="text-2xl font-bold text-white">{results.bmr}</p>
                <p className="text-xs text-muted-foreground">calories/day</p>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 border border-primary/20 text-center">
                <p className="text-xs text-primary mb-1">TDEE Target</p>
                <p className="text-2xl font-bold text-primary">{results.tdee}</p>
                <p className="text-xs text-primary/60">calories/day</p>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 border border-border">
              <h4 className="text-sm font-semibold text-foreground mb-4">Daily Macro Targets</h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="flex items-center gap-1.5 text-blue-400">
                      <Beef className="w-4 h-4" /> Protein
                    </span>
                    <span className="text-foreground font-medium">
                      {results.protein}g ({results.proteinPct}%)
                    </span>
                  </div>
                  <div className="h-2.5 bg-background rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${results.proteinPct}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <Wheat className="w-4 h-4" /> Carbs
                    </span>
                    <span className="text-foreground font-medium">
                      {results.carbs}g ({results.carbsPct}%)
                    </span>
                  </div>
                  <div className="h-2.5 bg-background rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${results.carbsPct}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <Droplets className="w-4 h-4" /> Fats
                    </span>
                    <span className="text-foreground font-medium">
                      {results.fats}g ({results.fatsPct}%)
                    </span>
                  </div>
                  <div className="h-2.5 bg-background rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-amber-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${results.fatsPct}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!results && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          Enter your stats above to calculate your personalized macro targets
        </div>
      )}
    </div>
  );
}

export function NutritionPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Nutrition Center</h1>
        <p className="text-muted-foreground">
          Calculate your macros, generate shuffling meal plans, save your own meals, and build a
          shopping list from your planner.
        </p>
      </div>

      <Tabs defaultValue="planner" className="mb-12">
        <TabsList className="bg-secondary border border-border flex-wrap h-auto gap-1 p-1 mb-6">
          <TabsTrigger value="planner">Planner</TabsTrigger>
          <TabsTrigger value="saved">My meals</TabsTrigger>
          <TabsTrigger value="shop">Shopping list</TabsTrigger>
        </TabsList>

        <TabsContent value="planner" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <MacroCalculator />
            </div>
            <div className="lg:col-span-2">
              <MealPlanner />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-0">
          <SavedMealsPanel />
        </TabsContent>

        <TabsContent value="shop" className="mt-0">
          <ShoppingListPanel />
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: Beef,
            color: 'text-blue-400',
            bg: 'bg-blue-400/10 border-blue-400/20',
            title: 'Protein Priority',
            desc: 'Aim for 1.6-2.2g per kg bodyweight daily. Distribute across 4-5 meals for optimal muscle protein synthesis stimulation every 3-4 hours.',
          },
          {
            icon: Wheat,
            color: 'text-emerald-400',
            bg: 'bg-emerald-400/10 border-emerald-400/20',
            title: 'Carb Timing',
            desc: 'Place carbs around workouts for performance. Fiber-rich carbs support satiety during cuts. Simple carbs post-workout aid glycogen replenishment.',
          },
          {
            icon: Droplets,
            color: 'text-amber-400',
            bg: 'bg-amber-400/10 border-amber-400/20',
            title: 'Healthy Fats',
            desc: 'Essential for hormone production including testosterone. Prioritize omega-3s from fish, nuts, and seeds. Keep saturated fats to ~10% of calories.',
          },
        ].map((tip) => {
          const Icon = tip.icon;
          return (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn('glass rounded-xl border p-5', tip.bg)}
            >
              <Icon className={cn('w-6 h-6 mb-3', tip.color)} />
              <h3 className={cn('font-semibold mb-2', tip.color)}>{tip.title}</h3>
              <p className="text-sm text-muted-foreground">{tip.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
