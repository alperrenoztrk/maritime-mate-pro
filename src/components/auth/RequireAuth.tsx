import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Anchor } from "lucide-react";
import { useAuth } from "@/hooks/useAuthContext";
import { buildAuthRedirect, isPublicPath } from "@/lib/authFlow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MfaChallengeForm } from "@/components/auth/MfaChallengeForm";

/**
 * Uygulama geneli giriş kapısı. Yalnızca oturum akışının kendi sayfaları
 * oturumsuz açılır; ana sayfa dahil diğer her rota oturum ister. Giriş yapmamış
 * ziyaretçi /auth ekranına gider ve `next` parametresi sayesinde girişten sonra
 * gitmek istediği sayfaya döner (bkz. Auth.tsx ve AuthCallback.tsx).
 *
 * Kapı <Routes> ağacının dışında durduğu için korumalı sayfa hiç mount olmaz:
 * ne içerik bir kare görünür, ne de sayfanın veri çekme effect'leri çalışır.
 */
export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { user, loading, mfaChallengeRequired, signOut } = useAuth();
  const { pathname, search } = useLocation();

  if (isPublicPath(pathname)) return <>{children}</>;
  // Oturum okunurken bekle: aksi halde giriş ekranı bir an yanıp söner.
  if (loading) return null;
  if (user) {
    // 2FA açık ama oturum hâlâ aal1: korumalı sayfa mount edilmemeli.
    // Veritabanı tarafı da bu jetonu reddeder (RESTRICTIVE RLS politikaları),
    // buradaki kapı sayfanın boş veri ile açılmasını önler.
    if (mfaChallengeRequired) return <MfaGateScreen onCancel={signOut} />;
    return <>{children}</>;
  }

  return <Navigate to={buildAuthRedirect(pathname, search)} replace />;
};

/**
 * Uygulama yeniden açıldığında ya da kullanıcı doğrudan korumalı bir bağlantıya
 * geldiğinde görünen kod ekranı. Giriş ekranındaki adımın (Auth.tsx) aynısı;
 * oturum `aal2`ye yükselince AuthProvider bayrağı düşer ve sayfa açılır.
 */
const MfaGateScreen = ({ onCancel }: { onCancel: () => void }) => (
  <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
    <Card className="w-full max-w-md border-border/50 shadow-2xl">
      <CardHeader className="space-y-3 text-center">
        <div className="flex justify-center">
          <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3">
            <Anchor className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-xl">Doğrulama gerekiyor</CardTitle>
      </CardHeader>
      <CardContent>
        <MfaChallengeForm onCancel={onCancel} />
      </CardContent>
    </Card>
  </div>
);
