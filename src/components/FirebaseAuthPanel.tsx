import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Cloud, Loader2, LogOut, Mail } from 'lucide-react';

export function FirebaseAuthPanel() {
  const {
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
  } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  if (!firebaseReady) {
    return (
      <section className="glass rounded-xl border border-border p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <Cloud className="w-5 h-5 text-blue-400" />
          Cloud account (Firebase)
        </h2>
        <p className="text-sm text-muted-foreground">
          Add Firebase web keys to <code className="text-primary">.env</code> (see{' '}
          <code className="text-primary">.env.example</code>) with the{' '}
          <code className="text-primary">VITE_FIREBASE_*</code> variables, then restart the dev
          server. Enable Email/Password and Google sign-in in the Firebase console.
        </p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="glass rounded-xl border border-border p-6 mb-6 flex items-center gap-2 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin" />
        Checking session…
      </section>
    );
  }

  if (user) {
    return (
      <section className="glass rounded-xl border border-border p-6 mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Cloud className="w-5 h-5 text-blue-400" />
              Signed in
            </h2>
            <p className="text-sm text-muted-foreground">{user.email ?? user.uid}</p>
            {syncStatus === 'syncing' && (
              <p className="text-xs text-primary mt-1 flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Syncing…
              </p>
            )}
            {lastError && <p className="text-xs text-red-400 mt-1">{lastError}</p>}
          </div>
          <Button variant="secondary" className="gap-2 shrink-0" onClick={() => signOutUser()}>
            <LogOut className="w-4 h-4" />
            Sign out
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Data merges on sign-in, then uploads after local changes (debounced). Use the buttons if
          you switch devices or need a forced refresh.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={busy || syncStatus === 'syncing'}
            onClick={async () => {
              setBusy(true);
              try {
                await pullAndMergeFromCloud();
              } finally {
                setBusy(false);
              }
            }}
          >
            Pull & merge from cloud
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await pushToCloud();
              } finally {
                setBusy(false);
              }
            }}
          >
            Push to cloud now
          </Button>
        </div>
      </section>
    );
  }

  const run = async (mode: 'in' | 'up') => {
    setBusy(true);
    try {
      if (mode === 'in') await signInEmail(email, password);
      else await signUpEmail(email, password);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="glass rounded-xl border border-border p-6 mb-6 space-y-4">
      <h2 className="text-lg font-semibold text-white flex items-center gap-2">
        <Cloud className="w-5 h-5 text-blue-400" />
        Cloud account (Firebase)
      </h2>
      <p className="text-sm text-muted-foreground">
        Sign in to sync profiles, workout logs, programs, and nutrition data to your Firebase
        project. Firestore rules must restrict access to the signed-in user only (see{' '}
        <code className="text-primary">firestore.rules</code>).
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label className="text-muted-foreground">Email</Label>
          <Input
            type="email"
            className="mt-1"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label className="text-muted-foreground">Password</Label>
          <Input
            type="password"
            className="mt-1"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button className="gap-2" disabled={busy} onClick={() => run('in')}>
          <Mail className="w-4 h-4" />
          Sign in
        </Button>
        <Button variant="secondary" disabled={busy} onClick={() => run('up')}>
          Create account
        </Button>
        <Button variant="outline" disabled={busy} onClick={() => signInGoogle().catch((e) => toast.error(e instanceof Error ? e.message : String(e)))}>
          Google
        </Button>
      </div>
    </section>
  );
}
