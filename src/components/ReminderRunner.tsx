import { useEffect } from 'react';
import { getActiveProfileId, getProfileData } from '@/lib/fitness-storage';

/** Fires browser notifications for enabled reminders (foreground / PWA). */
export function ReminderRunner() {
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const reminders = getProfileData(getActiveProfileId()).reminders;
      const day = now.getDay();
      const h = now.getHours();
      const m = now.getMinutes();
      const slot = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${h}-${m}`;

      for (const r of reminders) {
        if (!r.enabled || !r.days.includes(day)) continue;
        const [rh, rm] = r.time.split(':').map((x) => parseInt(x, 10));
        if (rh !== h || rm !== m) continue;
        const key = `fitnesspro:notified:${r.id}:${slot}`;
        if (sessionStorage.getItem(key)) continue;
        sessionStorage.setItem(key, '1');
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
          new Notification('Fitness Pro', { body: r.label });
        }
      }
    };

    const id = window.setInterval(tick, 20000);
    tick();
    return () => window.clearInterval(id);
  }, []);

  return null;
}
