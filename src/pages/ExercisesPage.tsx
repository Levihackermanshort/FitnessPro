import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  exercises,
  muscleGroups,
  equipmentTypes,
  difficulties,
  type MuscleGroup,
  type Equipment,
  type Difficulty,
} from '@/data/exercises';
import { cn } from '@/lib/utils';
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  ListOrdered,
  RefreshCcw,
  AlertTriangle,
  Lightbulb,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const difficultyConfig = {
  Beginner: { variant: 'default' as const, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  Intermediate: { variant: 'secondary' as const, color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
  Advanced: { variant: 'destructive' as const, color: 'text-red-400 bg-red-400/10 border-red-400/20' },
};

function ExerciseCard({ exercise }: { exercise: typeof exercises[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="glass rounded-xl overflow-hidden card-hover"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant="outline" className={difficultyConfig[exercise.difficulty].color}>
                {exercise.difficulty}
              </Badge>
              <Badge variant="outline" className="text-blue-400 bg-blue-400/10 border-blue-400/20">
                {exercise.category}
              </Badge>
            </div>
            <h3 className="font-semibold text-lg text-white">{exercise.name}</h3>
          </div>
        </div>

        {/* Equipment Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {exercise.equipment.map((eq) => (
            <span key={eq} className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground">
              {eq}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4">{exercise.description}</p>

        {/* Muscles */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs mb-4">
          <span>
            <span className="text-primary font-medium">Primary:</span>{' '}
            <span className="text-muted-foreground">{exercise.primaryMuscles.join(', ')}</span>
          </span>
          <span>
            <span className="text-blue-400 font-medium">Secondary:</span>{' '}
            <span className="text-muted-foreground">{exercise.secondaryMuscles.join(', ')}</span>
          </span>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-primary text-sm font-medium hover:text-primary/80 transition-colors w-full justify-center py-2.5 rounded-lg hover:bg-primary/5"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {expanded ? 'Show Less' : 'Instructions, Tips & Variations'}
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-border space-y-5">
                {/* Instructions */}
                <div>
                  <h4 className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-3">
                    <ListOrdered className="w-4 h-4 text-primary" /> Step-by-Step Instructions
                  </h4>
                  <ol className="space-y-2.5">
                    {exercise.instructions.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Tips */}
                <div>
                  <h4 className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-3">
                    <Lightbulb className="w-4 h-4 text-amber-400" /> Pro Tips
                  </h4>
                  <ul className="space-y-2">
                    {exercise.tips.map((tip, i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-amber-400 mt-1">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Common Mistakes */}
                <div>
                  <h4 className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-3">
                    <AlertTriangle className="w-4 h-4 text-red-400" /> Common Mistakes to Avoid
                  </h4>
                  <ul className="space-y-2">
                    {exercise.commonMistakes.map((mistake, i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-red-400 mt-1">✗</span>
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Variations */}
                <div>
                  <h4 className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-3">
                    <RefreshCcw className="w-4 h-4 text-blue-400" /> Variations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exercise.variations.map((v) => (
                      <span
                        key={v}
                        className="px-3 py-1.5 bg-secondary rounded-lg text-xs text-muted-foreground border border-border"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function ExercisesPage() {
  const [search, setSearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | 'All'>('All');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return exercises.filter((ex) => {
      const matchesSearch =
        search === '' ||
        ex.name.toLowerCase().includes(search.toLowerCase()) ||
        ex.primaryMuscles.some((m) => m.toLowerCase().includes(search.toLowerCase())) ||
        ex.description.toLowerCase().includes(search.toLowerCase());
      const matchesMuscle = selectedMuscle === 'All' || ex.category === selectedMuscle;
      const matchesEquip = selectedEquipment === 'All' || ex.equipment.includes(selectedEquipment);
      const matchesDiff = selectedDifficulty === 'All' || ex.difficulty === selectedDifficulty;
      return matchesSearch && matchesMuscle && matchesEquip && matchesDiff;
    });
  }, [search, selectedMuscle, selectedEquipment, selectedDifficulty]);

  const activeFilters = [
    selectedMuscle !== 'All' ? { type: 'Muscle', value: selectedMuscle, clear: () => setSelectedMuscle('All') } : null,
    selectedEquipment !== 'All' ? { type: 'Equipment', value: selectedEquipment, clear: () => setSelectedEquipment('All') } : null,
    selectedDifficulty !== 'All' ? { type: 'Level', value: selectedDifficulty, clear: () => setSelectedDifficulty('All') } : null,
  ].filter(Boolean) as { type: string; value: string; clear: () => void }[];

  const clearAll = () => {
    setSelectedMuscle('All');
    setSelectedEquipment('All');
    setSelectedDifficulty('All');
    setSearch('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Exercise Library</h1>
        <p className="text-muted-foreground">
          Browse {exercises.length} exercises across {muscleGroups.length} muscle groups with
          professional instructions, tips, and variations.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-xl py-4 mb-6 border-b border-border -mx-4 px-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search exercises, muscles, or descriptions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors',
              showFilters || activeFilters.length > 0
                ? 'bg-primary/10 border-primary/30 text-primary'
                : 'bg-secondary border-border text-muted-foreground hover:text-foreground'
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilters.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {activeFilters.length}
              </span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pb-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Muscle Group</label>
                  <select
                    value={selectedMuscle}
                    onChange={(e) => setSelectedMuscle(e.target.value as MuscleGroup | 'All')}
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                  >
                    <option value="All">All Muscles</option>
                    {muscleGroups.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Equipment</label>
                  <select
                    value={selectedEquipment}
                    onChange={(e) => setSelectedEquipment(e.target.value as Equipment | 'All')}
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                  >
                    <option value="All">All Equipment</option>
                    {equipmentTypes.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | 'All')}
                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                  >
                    <option value="All">All Levels</option>
                    {difficulties.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filter Tags */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {activeFilters.map((filter, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium border border-primary/20"
              >
                {filter.type}: {filter.value}
                <button onClick={filter.clear} className="hover:text-primary/70">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-foreground underline">
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filtered.length} of {exercises.length} exercises
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <AnimatePresence>
          {filtered.map((exercise) => (
            <motion.div
              key={exercise.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ExerciseCard exercise={exercise} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <SlidersHorizontal className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
          <p className="text-lg font-medium">No exercises match your filters</p>
          <p className="text-sm">Try adjusting your search or filter criteria</p>
          <button onClick={clearAll} className="mt-4 text-primary hover:underline">
            Clear all filters
          </button>
        </div>
      )}
    </motion.div>
  );
}
