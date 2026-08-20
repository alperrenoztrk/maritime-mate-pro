import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEntitlement } from "@/contexts/useEntitlement";

interface ProGateProps {
  children: ReactNode;
  /** Kilit kartında gösterilecek özellik adı (örn. "3D Gemi Sistemleri"). */
  feature?: string;
  /** Kilitliyken varsayılan kart yerine gösterilecek özel içerik. */
  fallback?: ReactNode;
}

/**
 * Pro içerik kapısı. Paket hakkı olanlara çocukları, olmayanlara /pro
 * sayfasına yönlendiren bir kilit kartı gösterir.
 *
 * Erişim kararı EntitlementContext'ten gelir: çevrimdışıyken son eşitlenmiş
 * hak OFFLINE_GRACE_DAYS boyunca korunur, bu yüzden gemide internet yokken
 * Pro içerik kilitlenmez. Hak yükleme sürerken içerik kilitli GÖSTERİLMEZ
 * (yanıp sönmeyi önlemek için boş durum döner).
 */
export const ProGate = ({ children, feature, fallback }: ProGateProps) => {
  const { hasProAccess, loading } = useEntitlement();
  const navigate = useNavigate();

  if (hasProAccess) return <>{children}</>;
  if (loading) return null;
  if (fallback) return <>{fallback}</>;

  return (
    <Card className="border-amber-400/40 bg-amber-500/5">
      <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
        <div className="flex items-center gap-2 text-amber-400">
          <Lock className="w-5 h-5" />
          <Crown className="w-6 h-6" />
        </div>
        <p className="text-sm text-muted-foreground max-w-sm">
          {feature ? (
            <span data-translatable>{`${feature} Pro paketine dahildir.`}</span>
          ) : (
            <span data-translatable>This content is included in the Pro package.</span>
          )}
        </p>
        <Button size="sm" className="gap-2 bg-amber-500 text-black hover:bg-amber-400" onClick={() => navigate("/pro")}>
          <Crown className="w-4 h-4" />
          <span data-translatable>Switch to Pro</span>
        </Button>
      </CardContent>
    </Card>
  );
};
