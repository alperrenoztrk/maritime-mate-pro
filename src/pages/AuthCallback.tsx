import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/safeClient";

const sanitizeReturnPath = (raw?: string | null) => {
  if (!raw) return "/";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
};

const readParams = () => {
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const search = new URLSearchParams(window.location.search);
  return { hash, search };
};

const clearOAuthParams = () => {
  window.history.replaceState(null, document.title, window.location.pathname + window.location.search.replace(/[?&](code|access_token|refresh_token|token_type|expires_in|expires_at|provider_token|provider_refresh_token|state)=[^&]*/g, ""));
};

/**
 * OAuth return page. Supabase's detectSessionInUrl consumes the URL fragment
 * automatically; we wait for the session to be present, then send the user
 * back to the page they were on before signing in.
 */
const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const readReturn = () => {
      const { search } = readParams();
      const fromUrl = search.get("next");
      if (fromUrl) return sanitizeReturnPath(fromUrl);

      let stored: string | null = null;
      try {
        stored = sessionStorage.getItem("postAuthReturn");
        sessionStorage.removeItem("postAuthReturn");
      } catch {}
      return sanitizeReturnPath(stored);
    };

    const finish = () => {
      if (cancelled) return;
      clearOAuthParams();
      navigate(readReturn(), { replace: true });
    };

    const completeSession = async () => {
      const { hash, search } = readParams();
      const accessToken = hash.get("access_token") || search.get("access_token");
      const refreshToken = hash.get("refresh_token") || search.get("refresh_token");
      const code = search.get("code");

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (!error) finish();
        return;
      }

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) finish();
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (data.session) finish();
    };

    completeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === "SIGNED_IN" || event === "INITIAL_SESSION" || event === "TOKEN_REFRESHED")) {
        finish();
      }
    });

    // Safety fallback: if nothing happens in 10s, bounce to home.
    const timeout = window.setTimeout(() => {
      if (!cancelled) navigate("/", { replace: true });
    }, 10000);

    return () => {
      cancelled = true;
      subscription.unsubscribe();
      window.clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Oturum tamamlanıyor…</p>
      </div>
    </div>
  );
};

export default AuthCallback;
