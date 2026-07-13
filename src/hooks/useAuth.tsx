import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createLovableAuth } from "@lovable.dev/cloud-auth-js";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { supabase } from "@/integrations/supabase/safeClient";

const cloudAuth = createLovableAuth();

type SocialProvider = "google" | "apple";

// Native (Capacitor) OAuth dönüşü için derin bağlantı adresi.
// AndroidManifest.xml'deki intent-filter ve Supabase'in
// "Redirect URLs" izin listesi ile birebir aynı olmalı.
const NATIVE_OAUTH_REDIRECT = "com.marinersbook.app://auth/callback";

// Lovable'ın /~oauth/initiate OAuth broker'ı yalnızca Lovable
// barındırmasında mevcut; diğer origin'lerde bu yol 404'e düşer.
const isLovableHost = () =>
  /(^|\.)(lovable\.app|lovableproject\.com)$/.test(window.location.hostname);

const sanitizeReturnPath = (raw?: string | null) => {
  if (!raw) return "/";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
};

const signInWithSocialProvider = async (provider: SocialProvider, returnPath = "/") => {
  const safeReturn = sanitizeReturnPath(returnPath);
  try {
    if (Capacitor.isNativePlatform()) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: NATIVE_OAUTH_REDIRECT, skipBrowserRedirect: true },
      });
      if (error) return { error: error as Error };
      await Browser.open({ url: data.url });
      return { error: null };
    }

    const webReturnUrl = `${window.location.origin}${safeReturn}`;

    if (isLovableHost()) {
      const result = await cloudAuth.signInWithOAuth(provider, { redirect_uri: webReturnUrl });
      if (result.redirected || result.error) {
        return { error: (result.error as Error | undefined) ?? null };
      }
      const { error } = await supabase.auth.setSession(result.tokens);
      return { error: error as Error | null };
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeReturn)}` },
    });
    return { error: error as Error | null };
  } catch (error) {
    return { error: error instanceof Error ? error : new Error(String(error)) };
  }
};

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, returnPath?: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: (returnPath?: string) => Promise<{ error: Error | null }>;
  signInWithApple: (returnPath?: string) => Promise<{ error: Error | null }>;
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

  // Native OAuth dönüşü: sistem tarayıcısı deep link ile geri döner,
  // token'lar URL fragment'ında gelir ve oturum burada kurulur.
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const listenerPromise = CapacitorApp.addListener("appUrlOpen", async ({ url }) => {
      if (!url.startsWith(NATIVE_OAUTH_REDIRECT)) return;

      try {
        await Browser.close();
      } catch {
        // Android Custom Tabs programatik kapatmayı desteklemeyebilir.
      }

      const fragment = url.split("#")[1] ?? "";
      const hashParams = new URLSearchParams(fragment);
      const access_token = hashParams.get("access_token");
      const refresh_token = hashParams.get("refresh_token");

      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({ access_token, refresh_token });
        if (error) console.error("Native OAuth setSession hatası:", error);
        return;
      }

      const query = (url.split("#")[0].split("?")[1] ?? "");
      const queryParams = new URLSearchParams(query);
      const code = queryParams.get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) console.error("Native OAuth code exchange hatası:", error);
        return;
      }

      const errorDescription = queryParams.get("error_description") ?? hashParams.get("error_description");
      if (errorDescription) console.error("Native OAuth sağlayıcı hatası:", errorDescription);
    });

    return () => {
      listenerPromise.then((listener) => listener.remove());
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
    return signInWithSocialProvider("google", returnPath);
  };

  const signInWithApple = async (returnPath = "/") => {
    return signInWithSocialProvider("apple", returnPath);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user, session, loading, signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithApple, signOut }}
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
