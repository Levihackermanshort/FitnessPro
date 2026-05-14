import { useCallback, useEffect, useState } from 'react';
import { getActiveProfileId, getProfileData } from '@/lib/fitness-storage';
import type { ProfileData } from '@/lib/fitness-storage';

export function useFitnessProfileData(): readonly [ProfileData, () => void] {
  const [data, setData] = useState(() => getProfileData(getActiveProfileId()));
  const refresh = useCallback(() => {
    setData(getProfileData(getActiveProfileId()));
  }, []);

  useEffect(() => {
    window.addEventListener('fitnesspro:data', refresh);
    window.addEventListener('fitnesspro:profile', refresh);
    return () => {
      window.removeEventListener('fitnesspro:data', refresh);
      window.removeEventListener('fitnesspro:profile', refresh);
    };
  }, [refresh]);

  return [data, refresh] as const;
}
