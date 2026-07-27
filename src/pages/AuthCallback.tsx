import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/safeClient";
import { Button } from "@/components/ui/button";
import { consumeReturnPath, finishOAuthFromUrl, sanitizeReturnPath } from "@/lib/authFlow";

const clearOAuthParams = () => {
  const url = new URL(window.location.href);
  const hash = new URLSearchParams(url.hash.replace(/^#/, ""));
  [
    "code",
    "access_token",
    "refresh_token",
    "token_type",
    "expires_in",
    "expires_at",
    "provider_token",
    "provider_refresh_token",
    "state",
  ].forEach((key) => {
    url.searchParams.delete(key);
    hash.delete(key);
  });
  const nextHash = hash.toString();
  window.history.replaceState(null, document.title, `${url.pathname}${url.search}${nextHash ? `#${nextHash}` : ""}`);
};

/**
 * OAuth return page. Supabase's detectSessionInUrl consumes the URL fragment
 * automatically; we wait for the session to be present, then send the user
 * back to the page they were on before signing in.
 */
const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const readReturn = () => {
      const fromUrl = new URLSearchParams(window.location.search).get("next");
      if (fromUrl) return sanitizeReturnPath(fromUrl);
      return consumeReturnPath();
    };

    const finish = () => {
      if (cancelled) return;
      clearOAuthParams();
      navigate(readReturn(), { replace: true });
    };

    const fail = (message: string) => {
      if (cancelled) return;
      clearOAuthParams();
      setError(message);
    };

    const completeSession = async () => {
      try {
        const { handled, error: oauthError } = await finishOAuthFromUrl(window.location.href);
        if (oauthError) {
          fail(`Google oturumu doğrulanamadı: ${oauthError.message}`);
          return;
        }
        if (handled) {
          finish();
          return;
        }

        // No OAuth payload in the URL — the client may already have picked the
        // session up through detectSessionInUrl.
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          fail(`Oturum okunamadı: ${error.message}`);
          return;
        }
        if (data.session) finish();
      } catch (err) {
        fail(err instanceof Error ? err.message : "Google oturumu tamamlanamadı.");
      }
    };

    completeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === "SIGNED_IN" || event === "INITIAL_SESSION" || event === "TOKEN_REFRESHED")) {
        finish();
      }
    });

    // Safety fallback: if nothing happens in 10s, show a visible failure
    // instead of silently returning home as if login had succeeded.
    const timeout = window.setTimeout(() => {
      fail("Google dönüşü tamamlandı ancak uygulama oturumu kuramadı. Lütfen tekrar deneyin.");
    }, 10000);

    return () => {
      cancelled = true;
      subscription.unsubscribe();
      window.clearTimeout(timeout);
    };
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
        <div className="w-full max-w-sm rounded-lg border border-border/60 bg-card/95 p-5 text-center shadow-xl">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h1 className="text-lg font-semibold">Google girişi tamamlanamadı</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          <div className="mt-5 grid gap-2">
            <Button onClick={() => navigate("/auth", { replace: true })}>Tekrar dene</Button>
            <Button variant="outline" onClick={() => navigate("/", { replace: true })}>Ana sayfaya dön</Button>
          </div>
        </div>
      </div>
    );
  }

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
