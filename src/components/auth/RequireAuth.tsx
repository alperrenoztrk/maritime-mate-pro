import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuthContext";
import { buildAuthRedirect, isPublicPath } from "@/lib/authFlow";

/**
 * Uygulama geneli giriş kapısı. Ana sayfa ve oturum akışının kendi sayfaları
 * dışındaki her rota oturum ister; giriş yapmamış ziyaretçi /auth ekranına
 * gider ve `next` parametresi sayesinde girişten sonra gitmek istediği sayfaya
 * döner (bkz. Auth.tsx ve AuthCallback.tsx).
 *
 * Kapı <Routes> ağacının dışında durduğu için korumalı sayfa hiç mount olmaz:
 * ne içerik bir kare görünür, ne de sayfanın veri çekme effect'leri çalışır.
 */
export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const { pathname, search } = useLocation();

  if (isPublicPath(pathname)) return <>{children}</>;
  // Oturum okunurken bekle: aksi halde giriş ekranı bir an yanıp söner.
  if (loading) return null;
  if (user) return <>{children}</>;

  return <Navigate to={buildAuthRedirect(pathname, search)} replace />;
};
