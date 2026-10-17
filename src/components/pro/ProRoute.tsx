import { ReactNode } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useEntitlement } from "@/contexts/useEntitlement";
import { PRO_GATING_ENABLED, isFreeLibraryKey } from "@/config/proGating";

interface ProRouteProps {
  children: ReactNode;
  /** Kilit ekranında ve /pro sayfasında bağlam için kullanılan özellik adı. */
  feature: string;
}

/**
 * Rota düzeyinde Pro kapısı. Erişim yoksa kullanıcıyı /pro sayfasına
 * yönlendirir ve hangi özellikten geldiğini query paramı olarak taşır.
 * Yükleme sürerken boş durum döner (yanıp sönmeyi önlemek için).
 *
 * Kilitler build-time anahtara bağlıdır (bkz. src/config/proGating.ts);
 * anahtar kapalıyken kapı hiçbir şeyi kilitlemez.
 */
export const ProRoute = ({ children, feature }: ProRouteProps) => {
  const { hasProAccess, loading } = useEntitlement();
  const location = useLocation();

  if (!PRO_GATING_ENABLED) return <>{children}</>;
  if (loading) return null;
  if (hasProAccess) return <>{children}</>;

  const params = new URLSearchParams({
    feature,
    from: location.pathname,
  });
  return <Navigate to={`/pro?${params.toString()}`} replace />;
};

/**
 * Kitaplık kitapları için kapı: FREE_LIBRARY_KEYS içindeki kitaplar herkese
 * açık, diğerleri Pro. Kitap anahtarı rotadan okunur
 * (`/lessons/:categoryId/...`, `/lessons/:topicKey/...`,
 * `/machine/:topicSlug/...`) ya da `bookKey` ile açıkça verilir.
 */
export const LibraryBookRoute = ({ children, bookKey }: { children: ReactNode; bookKey?: string }) => {
  const params = useParams();
  const key =
    bookKey ??
    params.categoryId ??
    params.topicKey ??
    (params.topicSlug ? `machine-${params.topicSlug}` : undefined);

  if (isFreeLibraryKey(key)) return <>{children}</>;
  return <ProRoute feature="This book">{children}</ProRoute>;
};
