import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { User } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { toast } from 'sonner';
import { getFirebaseAuth } from '@/lib/firebase/client';
import { readFirebaseWebConfig } from '@/lib/firebase/config';
import { downloadUserFitnessData, uploadUserFitnessData } from '@/lib/firebase/sync';
import { mergeRemoteFullState } from '@/lib/fitness-storage';

type SyncStatus = 'idle' | 'syncing' | 'error';

export type AuthContextValue = {
  user: User | null;
  loading: boolean;
  firebaseReady: boolean;
  syncStatus: SyncStatus;
  lastError: string | null;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (email: string, password: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  pullAndMergeFromCloud: () => Promise<void>;
  pushToCloud: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const firebaseReady = !!readFirebaseWebConfig();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [lastError, setLastError] = useState<string | null>(null);
  const initialSyncDone = useRef<string | null>(null);

  useEffect(() => {
    if (!firebaseReady) {
      setLoading(false);
      return;
    }
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, [firebaseReady]);

  useEffect(() => {
    if (!user || !firebaseReady) {
      if (!user) initialSyncDone.current = null;
      return;
    }
    if (initialSyncDone.current === user.uid) return;

    let cancelled = false;
    (async () => {
      try {
        setSyncStatus('syncing');
        setLastError(null);
        const remote = await downloadUserFitnessData(user.uid);
        if (cancelled) return;
        if (!remote) {
          await uploadUserFitnessData(user.uid);
        } else {
          sessionStorage.setItem('fitnesspro:skipCloudPush', '1');
          mergeRemoteFullState(remote);
          sessionStorage.removeItem('fitnesspro:skipCloudPush');
          await uploadUserFitnessData(user.uid);
        }
        initialSyncDone.current = user.uid;
        setSyncStatus('idle');
      } catch (e) {
        if (cancelled) return;
        setSyncStatus('error');
        const msg = e instanceof Error ? e.message : String(e);
        setLastError(msg);
        toast.error(`Cloud sync failed: ${msg}`);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, firebaseReady]);

  useEffect(() => {
    if (!user || !firebaseReady) return;
    let t: ReturnType<typeof setTimeout>;
    const debouncedPush = () => {
      if (sessionStorage.getItem('fitnesspro:skipCloudPush')) return;
      clearTimeout(t);
      t = setTimeout(() => {
        uploadUserFitnessData(user.uid).catch((e) => {
          setLastError(e instanceof Error ? e.message : String(e));
        });
      }, 5000);
    };
    window.addEventListener('fitnesspro:data', debouncedPush);
    window.addEventListener('fitnesspro:profile', debouncedPush);
    return () => {
      window.removeEventListener('fitnesspro:data', debouncedPush);
      window.removeEventListener('fitnesspro:profile', debouncedPush);
      clearTimeout(t);
    };
  }, [user, firebaseReady]);

  const signInEmail = useCallback(async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error('Firebase is not configured');
    await signInWithEmailAndPassword(auth, email.trim(), password);
  }, []);

  const signUpEmail = useCallback(async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error('Firebase is not configured');
    await createUserWithEmailAndPassword(auth, email.trim(), password);
  }, []);

  const signInGoogle = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error('Firebase is not configured');
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }, []);

  const signOutUser = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    initialSyncDone.current = null;
    await signOut(auth);
  }, []);

  const pullAndMergeFromCloud = useCallback(async () => {
    if (!user) return;
    setSyncStatus('syncing');
    setLastError(null);
    try {
      const remote = await downloadUserFitnessData(user.uid);
      if (remote) {
        sessionStorage.setItem('fitnesspro:skipCloudPush', '1');
        mergeRemoteFullState(remote);
        sessionStorage.removeItem('fitnesspro:skipCloudPush');
      }
      await uploadUserFitnessData(user.uid);
      setSyncStatus('idle');
      toast.success('Merged with cloud and saved.');
    } catch (e) {
      setSyncStatus('error');
      const msg = e instanceof Error ? e.message : String(e);
      setLastError(msg);
      toast.error(msg);
      throw e;
    }
  }, [user]);

  const pushToCloud = useCallback(async () => {
    if (!user) return;
    setLastError(null);
    try {
      await uploadUserFitnessData(user.uid);
      toast.success('Uploaded to cloud.');
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setLastError(msg);
      toast.error(msg);
      throw e;
    }
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      firebaseReady,
      syncStatus,
      lastError,
      signInEmail,
      signUpEmail,
      signInGoogle,
      signOutUser,
      pullAndMergeFromCloud,
      pushToCloud,
    }),
    [
      user,
      loading,
      firebaseReady,
      syncStatus,
      lastError,
      signInEmail,
      signUpEmail,
      signInGoogle,
      signOutUser,
      pullAndMergeFromCloud,
      pushToCloud,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
