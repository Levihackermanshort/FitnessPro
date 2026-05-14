import { motion } from 'framer-motion';
import type { WarmupCooldownPack } from '@/data/warmup-cooldown';
import { Button } from '@/components/ui/button';
import { Flame, Snowflake, X } from 'lucide-react';

export function WarmupPrepSheet({
  title,
  pack,
  onClose,
  onStart,
}: {
  title: string;
  pack: WarmupCooldownPack;
  onClose: () => void;
  onStart: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl max-w-lg w-full max-h-[88vh] overflow-y-auto p-6 relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-accent transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-5 h-5 text-orange-400" />
          <h2 className="text-xl font-bold text-white">Before you lift</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">{title}</p>

        <h3 className="text-sm font-semibold text-primary mb-3">Suggested warm-up</h3>
        <ul className="space-y-4 mb-8">
          {pack.warmup.map((block, i) => (
            <li key={i} className="rounded-lg border border-border bg-secondary/40 p-4">
              <div className="flex justify-between gap-2 mb-2">
                <span className="font-medium text-foreground">{block.title}</span>
                <span className="text-xs text-muted-foreground shrink-0">~{block.durationMin} min</span>
              </div>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                {block.steps.map((s, j) => (
                  <li key={j}>{s}</li>
                ))}
              </ol>
            </li>
          ))}
        </ul>

        <h3 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
          <Snowflake className="w-4 h-4" />
          After training (cooldown)
        </h3>
        <ul className="space-y-3 mb-8 text-sm text-muted-foreground">
          {pack.cooldown.flatMap((b) => b.steps).map((s, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-primary">•</span>
              {s}
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={onStart}>
            Start session timer
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
