import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useEntitlement } from "@/contexts/EntitlementContext";

interface ProRouteProps {
  children: ReactNode;
  /** Kilit ekranında ve /pro sayfasında bağlam için kullanılan özellik adı. */
  feature: string;
}

/**
 * Rota düzeyinde Pro kapısı. Erişim yoksa kullanıcıyı /pro sayfasına
 * yönlendirir ve hangi özellikten geldiğini query paramı olarak taşır.
 * Yükleme sürerken boş durum döner (yanıp sönmeyi önlemek için).
 */
export const ProRoute = ({ children, feature }: ProRouteProps) => {
  const { hasProAccess, loading } = useEntitlement();
  const location = useLocation();

  if (loading) return null;
  if (hasProAccess) return <>{children}</>;

  const params = new URLSearchParams({
    feature,
    from: location.pathname,
  });
  return <Navigate to={`/pro?${params.toString()}`} replace />;
};
