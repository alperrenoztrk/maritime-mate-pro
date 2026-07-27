import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/safeClient";
import {
  finishOAuthFromUrl,
  isNativePlatform,
  sanitizeReturnPath,
  startGoogleSignIn,
} from "@/lib/authFlow";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, returnPath?: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: (returnPath?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Register listener FIRST, then fetch session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session: existing } }) => {
      setSession(existing);
      setUser(existing?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Native shells never reach /auth/callback: Google returns to the custom URL
  // scheme, which Capacitor surfaces as an appUrlOpen event instead.
  useEffect(() => {
    if (!isNativePlatform()) return;

    let cancelled = false;
    let remove: (() => void) | undefined;

    (async () => {
      const { App } = await import("@capacitor/app");
      const handle = await App.addListener("appUrlOpen", async ({ url }) => {
        const { handled, error } = await finishOAuthFromUrl(url);
        if (!handled) return;

        try {
          const { Browser } = await import("@capacitor/browser");
          await Browser.close();
        } catch {
          // The in-app browser may already be gone; nothing to clean up.
        }

        if (error) toast.error(error.message || "Google ile giriş tamamlanamadı");
      });

      if (cancelled) handle.remove();
      else remove = () => handle.remove();
    })();

    return () => {
      cancelled = true;
      remove?.();
    };
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signUpWithEmail = async (email: string, password: string, returnPath = "/") => {
    const safeReturn = sanitizeReturnPath(returnPath);
    const redirectUrl = `${window.location.origin}${safeReturn}`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl },
    });
    return { error: error as Error | null };
  };

  const signInWithGoogle = async (returnPath = "/") => {
    try {
      return await startGoogleSignIn(returnPath);
    } catch (err) {
      return { error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
