import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase as untypedSupabase } from "@/integrations/supabase/safeClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Anchor, Loader2 } from "lucide-react";

// Beta auth.oauth namespace typed wrapper.
type AuthorizationDetails = {
  client?: { name?: string; client_uri?: string; redirect_uris?: string[] };
  scopes?: string[];
  redirect_url?: string;
  redirect_to?: string;
};

type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
};

const oauthApi = (untypedSupabase.auth as unknown as { oauth: OAuthApi }).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Yetkilendirme kimliği eksik.");
        return;
      }
      const { data: sess } = await untypedSupabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = `/auth?next=${encodeURIComponent(next)}`;
        return;
      }
      try {
        const { data, error } = await oauthApi.getAuthorizationDetails(authorizationId);
        if (!active) return;
        if (error) {
          setError(error.message);
          return;
        }
        const immediate = data?.redirect_url ?? data?.redirect_to;
        if (immediate && !data?.client) {
          window.location.href = immediate;
          return;
        }
        setDetails(data);
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    try {
      const { data, error } = approve
        ? await oauthApi.approveAuthorization(authorizationId)
        : await oauthApi.denyAuthorization(authorizationId);
      if (error) {
        setError(error.message);
        setBusy(false);
        return;
      }
      const target = data?.redirect_url ?? data?.redirect_to;
      if (!target) {
        setError("Sağlayıcı bir yönlendirme adresi döndürmedi.");
        setBusy(false);
        return;
      }
      window.location.href = target;
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
              <Anchor className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-xl">
            {details?.client?.name
              ? `Approve the connection to ${details.client.name}`
              : "Bağlantıyı onaylayın"}
          </CardTitle>
          <CardDescription className="text-sm">
            Bu uygulamanın Mariner's Book hesabınızı sizin adınıza kullanmasına izin verirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="text-sm text-destructive text-center">
              {error}
            </div>
          )}
          {!details && !error && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" /> Yükleniyor…
            </div>
          )}
          {details && (
            <>
              <div className="rounded-md border border-border/50 p-3 text-sm space-y-1">
                <div className="font-medium">İstemci</div>
                <div className="text-muted-foreground">
                  {details.client?.name ?? "Bilinmeyen istemci"}
                </div>
                {details.client?.redirect_uris?.[0] && (
                  <div className="text-xs text-muted-foreground break-all">
                    {details.client.redirect_uris[0]}
                  </div>
                )}
              </div>
              <div className="rounded-md border border-border/50 p-3 text-sm">
                <div className="font-medium mb-1">Verilen erişim</div>
                <ul className="text-muted-foreground text-xs space-y-1 list-disc list-inside">
                  <li>Uygulamanın etkin araçlarını hesabınız adına çağırabilir.</li>
                  <li>Uygulama izinleri ve arka uç politikaları geçerli olmaya devam eder.</li>
                </ul>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  className="flex-1"
                  disabled={busy}
                  onClick={() => decide(true)}
                >
                  Onayla
                </Button>
                <Button
                  className="flex-1"
                  variant="outline"
                  disabled={busy}
                  onClick={() => decide(false)}
                >
                  Reddet
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OAuthConsent;
