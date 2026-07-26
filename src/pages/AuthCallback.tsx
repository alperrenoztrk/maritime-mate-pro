import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/safeClient";

const sanitizeReturnPath = (raw?: string | null) => {
  if (!raw) return "/";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
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
      let stored: string | null = null;
      try {
        stored = sessionStorage.getItem("postAuthReturn");
        sessionStorage.removeItem("postAuthReturn");
      } catch {}
      return sanitizeReturnPath(stored);
    };

    const finish = () => {
      if (cancelled) return;
      navigate(readReturn(), { replace: true });
    };

    // If session is already available, redirect immediately.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) finish();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === "SIGNED_IN" || event === "INITIAL_SESSION" || event === "TOKEN_REFRESHED")) {
        finish();
      }
    });

    // Safety fallback: if nothing happens in 6s, bounce to home.
    const timeout = window.setTimeout(() => {
      if (!cancelled) navigate("/", { replace: true });
    }, 6000);

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
