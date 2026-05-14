import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useFitnessProfileData } from '@/hooks/use-fitness-data';
import { deleteRecoveryDay, upsertRecoveryDay } from '@/lib/fitness-storage';
import type { DailyRecovery } from '@/lib/fitness-types';
import { mobilityFlows } from '@/data/mobility';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Moon, Footprints, Sparkles, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function todayYmd() {
  return new Date().toISOString().slice(0, 10);
}

export function WellnessPage() {
  const [data, refresh] = useFitnessProfileData();
  const days = data.recoveryDays;
  const [date, setDate] = useState(todayYmd());
  const [sleep, setSleep] = useState('');
  const [steps, setSteps] = useState('');

  const chartRows = useMemo(() => {
    const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date)).slice(-14);
    return sorted.map((d) => ({
      label: d.date.slice(5),
      sleep: d.sleepHours ?? null,
      steps: d.steps ?? null,
    }));
  }, [days]);

  const saveDay = () => {
    const row: DailyRecovery = {
      date,
      sleepHours: sleep ? parseFloat(sleep) : undefined,
      steps: steps ? parseInt(steps, 10) : undefined,
    };
    upsertRecoveryDay(row);
    refresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Wellness</h1>
        <p className="text-muted-foreground">
          Manual sleep and step check-ins plus guided mobility flows. Data stays on this device.
        </p>
      </div>

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="bg-secondary border border-border">
          <TabsTrigger value="activity" className="gap-2">
            <Moon className="w-4 h-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="mobility" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Mobility
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass rounded-xl border border-border p-6 lg:col-span-1 space-y-4">
              <h2 className="text-lg font-semibold text-white">Log day</h2>
              <div>
                <Label className="text-muted-foreground">Date</Label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="text-muted-foreground">Sleep (hours)</Label>
                <Input
                  type="number"
                  step="0.25"
                  min={0}
                  max={24}
                  value={sleep}
                  onChange={(e) => setSleep(e.target.value)}
                  placeholder="7.5"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-muted-foreground">Steps</Label>
                <Input
                  type="number"
                  min={0}
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  placeholder="8000"
                  className="mt-1"
                />
              </div>
              <Button className="w-full" onClick={saveDay}>
                Save entry
              </Button>
            </div>

            <div className="glass rounded-xl border border-border p-6 lg:col-span-2">
              <h2 className="text-lg font-semibold text-white mb-4">Last 14 days</h2>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartRows}>
                    <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <YAxis yAxisId="l" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <YAxis yAxisId="r" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        background: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      yAxisId="l"
                      type="monotone"
                      dataKey="sleep"
                      name="Sleep h"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                      connectNulls
                    />
                    <Line
                      yAxisId="r"
                      type="monotone"
                      dataKey="steps"
                      name="Steps"
                      stroke="hsl(217 91% 60%)"
                      strokeWidth={2}
                      dot={false}
                      connectNulls
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Green axis: sleep hours. Blue axis: steps (scaled on the right).
              </p>
            </div>
          </div>

          <div className="glass rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Footprints className="w-5 h-5 text-primary" />
              History
            </h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {days.length === 0 ? (
                <p className="text-sm text-muted-foreground">No entries yet.</p>
              ) : (
                days.map((d) => (
                  <div
                    key={d.date}
                    className="flex items-center justify-between text-sm border border-border rounded-lg px-3 py-2 bg-secondary/30"
                  >
                    <span className="text-muted-foreground">{d.date}</span>
                    <span className="text-foreground">
                      {d.sleepHours != null ? `${d.sleepHours}h sleep` : '—'}
                      {' · '}
                      {d.steps != null ? `${d.steps} steps` : '—'}
                    </span>
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-red-400 p-1"
                      onClick={() => {
                        deleteRecoveryDay(d.date);
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
        </TabsContent>

        <TabsContent value="mobility" className="space-y-4">
          {mobilityFlows.map((flow) => (
            <div key={flow.id} className="glass rounded-xl border border-border p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{flow.title}</h3>
                  <p className="text-sm text-muted-foreground">{flow.goal}</p>
                  <p className="text-xs text-primary mt-1">~{flow.durationMin} min</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {flow.equipment.map((eq) => (
                    <span
                      key={eq}
                      className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border"
                    >
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
              <ol className="space-y-3">
                {flow.steps.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{s.name}</p>
                      <p className="text-muted-foreground">{s.detail}</p>
                      <p className="text-xs text-muted-foreground/80 mt-0.5">{Math.round(s.durationSec / 60)} min</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
