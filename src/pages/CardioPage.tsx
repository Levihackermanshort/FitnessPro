import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cardioOptions, heartRateZones, type CardioOption } from '@/data/cardio';
import { cn } from '@/lib/utils';
import {
  Clock,
  Flame,
  Heart,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  Timer,
  Info,
  X,
  ChevronDown,
  ChevronUp,
  Target
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const typeColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  HIIT: { bg: 'from-red-500/20 to-red-600/5', border: 'border-red-500/20', text: 'text-red-400', badge: 'text-red-400 bg-red-400/10 border-red-400/20' },
  LISS: { bg: 'from-emerald-500/20 to-emerald-600/5', border: 'border-emerald-500/20', text: 'text-emerald-400', badge: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  MISS: { bg: 'from-blue-500/20 to-blue-600/5', border: 'border-blue-500/20', text: 'text-blue-400', badge: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  Circuit: { bg: 'from-amber-500/20 to-amber-600/5', border: 'border-amber-500/20', text: 'text-amber-400', badge: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
};

/* ─── Session Timer ─── */
function SessionTimer({ cardio, onClose }: { cardio: CardioOption; onClose: () => void }) {
  const [timeLeft, setTimeLeft] = useState(cardio.durationMinutes * 60);
  const [active, setActive] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const protocol = cardio.protocols[selectedProtocol];

  useEffect(() => {
    if (active && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setActive(false);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, timeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((cardio.durationMinutes * 60 - timeLeft) / (cardio.durationMinutes * 60)) * 100;

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-2xl max-w-md w-full p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-accent transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-1">{cardio.name}</h2>
          <p className="text-sm text-muted-foreground">{cardio.type} Protocol</p>
        </div>

        {/* Protocol Selector */}
        {cardio.protocols.length > 1 && (
          <div className="flex gap-2 mb-6 justify-center">
            {cardio.protocols.map((p, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedProtocol(i);
                  setActive(false);
                  setTimeLeft(cardio.durationMinutes * 60);
                }}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
                  selectedProtocol === i
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'bg-secondary border-border text-muted-foreground hover:text-foreground'
                )}
              >
                {p.name}
              </button>
            ))}
          </div>
        )}

        {/* Protocol Details */}
        <div className="bg-secondary/50 rounded-lg p-4 mb-6 border border-border text-sm">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-muted-foreground text-xs mb-1">Work</p>
              <p className="font-semibold text-foreground">{protocol.work}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Rest</p>
              <p className="font-semibold text-foreground">{protocol.rest}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Rounds</p>
              <p className="font-semibold text-foreground">{protocol.rounds}</p>
            </div>
          </div>
          <p className="text-muted-foreground text-xs mt-3 text-center">{protocol.notes}</p>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-6">
          <div
            className={cn(
              'text-6xl font-mono font-bold mb-4',
              timeLeft < 60 ? 'text-red-400' : 'text-white'
            )}
          >
            {formatTime(timeLeft)}
          </div>
          <div className="w-full bg-secondary rounded-full h-3 mb-2">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">{Math.round(progress)}% complete</p>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            variant={active ? 'secondary' : 'default'}
            onClick={() => setActive(!active)}
            className="flex-1 gap-2"
          >
            {active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {active ? 'Pause' : 'Start'}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setActive(false);
              setTimeLeft(cardio.durationMinutes * 60);
            }}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Cardio Card ─── */
function CardioCard({ cardio }: { cardio: CardioOption }) {
  const [expanded, setExpanded] = useState(false);
  const [timerOpen, setTimerOpen] = useState(false);
  const colors = typeColors[cardio.type];

  return (
    <>
      <motion.div
        layout
        className={cn(
          'glass rounded-xl border p-5 card-hover bg-gradient-to-br',
          colors.bg,
          colors.border
        )}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <Badge variant="outline" className={colors.badge}>
              {cardio.type}
            </Badge>
            <h3 className="text-lg font-bold text-white mt-2">{cardio.name}</h3>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">
              {cardio.rpe}
              <span className="text-sm text-muted-foreground font-normal">/10</span>
            </div>
            <p className="text-xs text-muted-foreground">RPE</p>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4">{cardio.description}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-secondary/50 rounded-lg p-3 border border-border">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Clock className="w-3.5 h-3.5" /> Duration
            </div>
            <p className="text-sm font-semibold text-foreground">{cardio.duration}</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3 border border-border">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Flame className="w-3.5 h-3.5" /> Calories/hr
            </div>
            <p className="text-sm font-semibold text-foreground">~{cardio.caloriesPerHour}</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3 border border-border">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Heart className="w-3.5 h-3.5" /> HR Zone
            </div>
            <p className="text-sm font-semibold text-foreground">{cardio.heartRateZone}</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3 border border-border">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Target className="w-3.5 h-3.5" /> Frequency
            </div>
            <p className="text-sm font-semibold text-foreground">{cardio.frequency}</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {cardio.benefits.slice(0, 3).map((b) => (
              <span
                key={b}
                className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md border border-border"
              >
                <CheckCircle2 className="w-3 h-3 text-primary" /> {b}
              </span>
            ))}
          </div>
        </div>

        {/* Protocols Preview */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-muted-foreground text-sm hover:text-foreground transition-colors mb-3"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {expanded ? 'Hide protocols' : `View ${cardio.protocols.length} protocols`}
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
                {cardio.protocols.map((p, i) => (
                  <div
                    key={i}
                    className="bg-secondary/50 rounded-lg p-3 border border-border text-sm"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground">{p.name}</span>
                      <span className="text-xs text-muted-foreground">{p.rounds} rounds</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Work: {p.work} • Rest: {p.rest}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{p.notes}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button onClick={() => setTimerOpen(true)} className="w-full gap-2">
          <Timer className="w-4 h-4" /> Start Session Timer
        </Button>
      </motion.div>

      <AnimatePresence>
        {timerOpen && <SessionTimer cardio={cardio} onClose={() => setTimerOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export function CardioPage() {
  const [selectedType, setSelectedType] = useState<string>('All');
  const types = ['All', 'HIIT', 'LISS', 'MISS', 'Circuit'];

  const filtered =
    selectedType === 'All' ? cardioOptions : cardioOptions.filter((c) => c.type === selectedType);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Cardio Protocols</h1>
        <p className="text-muted-foreground">
          Heart-rate-zone based cardio options with session timers, calorie estimates, and
          progressive protocols.
        </p>
      </div>

      {/* Cardio Types Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl border border-border p-6 mb-8"
      >
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" /> Understanding Cardio Types
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { type: 'HIIT', color: 'text-red-400', desc: 'High Intensity Interval Training. Short bursts of maximum effort with recovery periods. Best for time efficiency and EPOC (afterburn).' },
            { type: 'LISS', color: 'text-emerald-400', desc: 'Low Intensity Steady State. Sustained moderate effort where you can hold a conversation. Best for fat oxidation and recovery.' },
            { type: 'MISS', color: 'text-blue-400', desc: 'Moderate Intensity Steady State. Challenging but sustainable pace. Good balance of calorie burn and recovery cost.' },
            { type: 'Circuit', color: 'text-amber-400', desc: 'Rotating exercises with minimal rest. Combines cardio and resistance benefits for overall conditioning.' },
          ].map((item) => (
            <div key={item.type} className="bg-secondary/50 rounded-lg p-4 border border-border">
              <h3 className={cn('font-semibold mb-1', item.color)}>{item.type}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Type Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium border transition-all',
              selectedType === type
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-primary/30'
            )}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Cardio Cards */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filtered.map((cardio) => (
            <motion.div
              key={cardio.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <CardioCard cardio={cardio} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Heart Rate Zones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 glass rounded-2xl border border-border p-6 md:p-8"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-400" /> Heart Rate Zones
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Calculate your maximum heart rate: 220 - your age. Then use the percentages below to
          determine your target zones.
        </p>
        <div className="space-y-3">
          {heartRateZones.map((z) => (
            <div key={z.zone} className="flex items-center gap-4">
              <div className={cn('w-4 h-14 rounded-full shrink-0', z.color)} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">
                    {z.zone} — {z.name}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">{z.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
