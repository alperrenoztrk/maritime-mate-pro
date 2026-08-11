import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/safeClient";
import {
  buildMagicLinkRedirect,
  consumeReturnPath,
  finishOAuthFromUrl,
  isNativePlatform,
  rememberReturnPath,
  sanitizeReturnPath,
  startGoogleSignIn,
} from "@/lib/authFlow";
import { deriveMfaStatus } from "@/lib/mfa";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Oturum nesnesinden senkron türetilir: girişten sonraki ilk render'da bile
  // doğru olduğu için kod ekranı atlanamaz (bkz. src/lib/mfa.ts).
  const mfaChallengeRequired = useMemo(() => deriveMfaStatus(session).challengeRequired, [session]);

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

    const completeNativeOAuth = async (url: string) => {
      const { handled, error } = await finishOAuthFromUrl(url);
      if (!handled) return;

      try {
        const { Browser } = await import("@capacitor/browser");
        await Browser.close();
      } catch {
        // The in-app browser may already be gone; nothing to clean up.
      }

      if (error) {
        toast.error(error.message || "Google ile giriş tamamlanamadı");
        return;
      }

      const safeReturn = consumeReturnPath();
      window.history.replaceState(null, document.title, safeReturn);
      window.dispatchEvent(new PopStateEvent("popstate"));
    };

    (async () => {
      const { App } = await import("@capacitor/app");
      const launch = await App.getLaunchUrl();

      if (!cancelled && launch?.url) {
        await completeNativeOAuth(launch.url);
      }

      const handle = await App.addListener("appUrlOpen", async ({ url }) => {
        await completeNativeOAuth(url);
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

  // Şifresiz giriş: kullanıcı e-postasına tek kullanımlık bağlantı gider.
  // Kayıtlı olmayan adres için hesap otomatik açılır (profil tetikleyicisi
  // profili yazar); dönüş adresi Google akışıyla aynı /auth/callback'tir.
  const signInWithMagicLink = async (email: string, returnPath = "/") => {
    const safeReturn = sanitizeReturnPath(returnPath);
    rememberReturnPath(safeReturn);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: buildMagicLinkRedirect(safeReturn) },
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
      value={{
        user,
        session,
        loading,
        mfaChallengeRequired,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
