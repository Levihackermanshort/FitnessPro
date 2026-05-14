import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  addProfile,
  buildExportPayload,
  deleteProfile,
  getActiveProfileId,
  getProfiles,
  importPayload,
  renameProfile,
  setActiveProfileId,
  setReminders,
} from '@/lib/fitness-storage';
import type { FitnessExportPayload, ReminderConfig } from '@/lib/fitness-types';
import { FirebaseAuthPanel } from '@/components/FirebaseAuthPanel';
import { useFitnessProfileData } from '@/hooks/use-fitness-data';
import { computeTrainingStreak, getWeekStartMonday, sessionsInWeekStarting, weeklySetVolume } from '@/lib/workout-log-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Download,
  Moon,
  Sun,
  Upload,
  Bell,
  User,
  Printer,
  Image as ImageIcon,
  Cloud,
} from 'lucide-react';

const defaultReminders: ReminderConfig[] = [
  { id: 'w1', label: 'Water check', time: '10:00', days: [1, 2, 3, 4, 5], enabled: false, kind: 'water' },
  { id: 'w2', label: 'Pre-workout', time: '17:30', days: [1, 3, 5], enabled: false, kind: 'workout' },
  { id: 'm1', label: 'Meal prep Sunday', time: '10:00', days: [0], enabled: false, kind: 'meal_prep' },
];

function downloadJson(obj: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function drawSummaryPng(lines: string[]) {
  const w = 880;
  const h = 120 + lines.length * 36;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.fillStyle = '#0c0f14';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 28px system-ui, sans-serif';
  ctx.fillText('Fitness Pro — summary', 40, 52);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '20px system-ui, sans-serif';
  lines.forEach((line, i) => {
    ctx.fillText(line, 40, 96 + i * 36);
  });
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitness-pro-summary-${new Date().toISOString().slice(0, 10)}.png`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

export function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [data, refresh] = useFitnessProfileData();
  const profiles = getProfiles();
  const activeId = getActiveProfileId();
  const [newProfileName, setNewProfileName] = useState('');
  const [importText, setImportText] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  const reminders = useMemo((): ReminderConfig[] => {
    const cur = data.reminders;
    if (cur?.length) return cur;
    return defaultReminders;
  }, [data.reminders]);

  const updateReminder = (id: string, patch: Partial<ReminderConfig>) => {
    const next = reminders.map((r) => (r.id === id ? { ...r, ...patch } : r));
    setReminders(next);
    refresh();
  };

  const requestNotifyPermission = async () => {
    if (!('Notification' in window)) return;
    await Notification.requestPermission();
  };

  const streak = computeTrainingStreak(data.workoutSessions);
  const weekVol = weeklySetVolume(
    sessionsInWeekStarting(data.workoutSessions, getWeekStartMonday())
  );

  const printWeek = () => {
    window.print();
  };

  const exportPng = () => {
    drawSummaryPng([
      `Training streak: ${streak} day(s)`,
      `This week logged sets: ${weekVol}`,
      `Profiles / data: local browser only (export JSON for backup).`,
      `Generated ${new Date().toLocaleString()}`,
    ]);
  };

  const doExport = () => downloadJson(buildExportPayload(), `fitness-pro-backup-${activeId}.json`);

  const doImport = (merge: boolean) => {
    try {
      const parsed = JSON.parse(importText) as FitnessExportPayload;
      if (parsed.version !== 1 || !parsed.profile) throw new Error('Invalid file');
      importPayload(parsed, merge ? 'merge' : 'replace');
      setImportText('');
      refresh();
    } catch {
      alert('Could not import. Paste a valid Fitness Pro export JSON.');
    }
  };

  const onFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        setImportText(String(reader.result ?? ''));
      };
      reader.readAsText(f);
      e.target.value = '';
    },
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto px-4 py-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-muted-foreground mb-6">
          Appearance, local profiles, backup, reminders, and quick exports.
        </p>
        <FirebaseAuthPanel />
      </div>

      <section className="glass rounded-xl border border-border p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          {mounted && theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          Theme
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Light mode uses higher contrast backgrounds; dark mode matches the default gym UI.
        </p>
        <div className="flex gap-2">
          {(['light', 'dark', 'system'] as const).map((t) => (
            <Button
              key={t}
              variant={mounted && theme === t ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setTheme(t)}
            >
              {t}
            </Button>
          ))}
        </div>
      </section>

      <section className="glass rounded-xl border border-border p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Profiles (local)
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Separate saved workouts, logs, and meals per profile. This is not a cloud account — use
          export/import to move data between browsers or keep backups.
        </p>
        <div className="space-y-2 mb-4">
          {profiles.map((p) => (
            <div
              key={p.id}
              className="flex flex-wrap items-center gap-2 justify-between border border-border rounded-lg px-3 py-2 bg-secondary/30"
            >
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={p.id === activeId ? 'default' : 'ghost'}
                  onClick={() => {
                    setActiveProfileId(p.id);
                    refresh();
                  }}
                >
                  {p.name}
                </Button>
                {p.id === activeId && (
                  <span className="text-xs text-primary">active</span>
                )}
              </div>
              <div className="flex gap-1">
                <Input
                  className="h-8 w-36"
                  placeholder="Rename"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      renameProfile(p.id, (e.target as HTMLInputElement).value);
                      refresh();
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={profiles.length <= 1}
                  onClick={() => {
                    deleteProfile(p.id);
                    refresh();
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="New profile name"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
          />
          <Button
            onClick={() => {
              addProfile(newProfileName);
              setNewProfileName('');
              refresh();
            }}
          >
            Add profile
          </Button>
        </div>
      </section>

      <section className="glass rounded-xl border border-border p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Cloud className="w-5 h-5 text-blue-400" />
          Backup & sync
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Download a JSON snapshot of the active profile. Restore with merge (keeps existing IDs
          where possible) or replace (overwrites app data for this profile).
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant="secondary" className="gap-2" onClick={doExport}>
            <Download className="w-4 h-4" />
            Export JSON
          </Button>
          <Button variant="secondary" className="gap-2" onClick={() => fileRef.current?.click()}>
            <Upload className="w-4 h-4" />
            Choose file
          </Button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={onFile} />
        </div>
        <textarea
          className="w-full min-h-[120px] bg-secondary border border-border rounded-lg p-3 text-sm text-foreground font-mono"
          placeholder="Paste export JSON here…"
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
        />
        <div className="flex gap-2 mt-2">
          <Button size="sm" variant="secondary" onClick={() => doImport(true)}>
            Merge import
          </Button>
          <Button size="sm" variant="destructive" onClick={() => doImport(false)}>
            Replace import
          </Button>
        </div>
      </section>

      <section className="glass rounded-xl border border-border p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Printer className="w-5 h-5 text-muted-foreground" />
          Print & image
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Print-friendly summary for coaches or notes. PNG is a simple graphic you can share.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" className="gap-2" onClick={printWeek}>
            <Printer className="w-4 h-4" />
            Print summary
          </Button>
          <Button variant="secondary" className="gap-2" onClick={exportPng}>
            <ImageIcon className="w-4 h-4" />
            Download PNG summary
          </Button>
        </div>
        <div
          id="print-week-summary"
          className="hidden print:block print:fixed print:inset-4 print:z-[9999] mt-6 p-6 border border-black text-black bg-white rounded-lg"
        >
          <h3 className="text-xl font-bold mb-2">Fitness Pro — week snapshot</h3>
          <p>Streak: {streak} days</p>
          <p>Sets logged this week: {weekVol}</p>
          <p className="text-sm mt-4 text-gray-600">{new Date().toLocaleString()}</p>
        </div>
      </section>

      <section className="glass rounded-xl border border-border p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-400" />
          Reminders
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Browser notifications when this tab is open (or PWA foreground). Enable OS permission
          below; times use your local clock.
        </p>
        <Button size="sm" variant="outline" className="mb-4" onClick={requestNotifyPermission}>
          Enable notification permission
        </Button>
        <div className="space-y-4">
          {reminders.map((r) => (
            <div key={r.id} className="flex flex-col sm:flex-row sm:items-center gap-3 border border-border rounded-lg p-3">
              <div className="flex items-center gap-3 flex-1">
                <Switch
                  checked={r.enabled}
                  onCheckedChange={(v) => updateReminder(r.id, { enabled: v })}
                />
                <span className="text-sm text-white font-medium">{r.label}</span>
              </div>
              <Input
                type="time"
                className="w-36"
                value={r.time}
                onChange={(e) => updateReminder(r.id, { time: e.target.value })}
              />
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
