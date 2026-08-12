import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useEntitlement } from "@/contexts/useEntitlement";
import { isAdFreeRoute } from "@/config/ads";
import {
  areAdsSupported,
  hideBanner,
  initializeAds,
  maybeShowInterstitial,
  registerNavigation,
  removeBanner,
  showBanner,
} from "@/services/ads";

/**
 * Reklam orkestrasyonu. Görsel çıktısı yoktur.
 *
 * Tek karar noktası: reklam **kime** ve **nerede** gösterilir.
 *  - Yalnızca ücretsiz pakette. `hasProAccess` true olduğu anda banner kalkar
 *    ("ad-free use" Pro vaadi — bkz. MONETIZATION_SETUP.md).
 *  - Yalnızca native platformda (web'The service layer is already no-op'tur).
 *  - `AD_FREE_ROUTES` dışındaki sayfalarda (ana sayfa, giriş akışı ve /pro
 *    ödeme ekranı reklamsız kalır).
 *
 * `useLocation()` gerektirdiği için App içinde <BrowserRouter> altına
 * yerleştirilir.
 */
export const AdsController = () => {
  const { hasProAccess, loading } = useEntitlement();
  const { pathname } = useLocation();

  // Paket bilgisi sunucudan gelene kadar reklam gösterme: yeni Pro kullanıcıya
  // bir anlık banner çakması kötü bir ilk izlenim olurdu.
  const adsAllowed = areAdsSupported() && !loading && !hasProAccess;
  const bannerAllowed = adsAllowed && !isAdFreeRoute(pathname);

  useEffect(() => {
    if (!bannerAllowed) {
      void hideBanner();
      return;
    }
    void showBanner();
  }, [bannerAllowed]);

  // Pro'ya geçildiğinde bannerı tamamen yok et; gizlemek yetmez çünkü
  // görünmeyen banner da gösterim (impression) isteği yapmaya devam edebilir.
  useEffect(() => {
    if (!loading && hasProAccess) void removeBanner();
  }, [hasProAccess, loading]);

  // Geçiş reklamı: rota değişimlerini say, frekans kapıları açıksa göster.
  // İlk render sayılmaz — uygulama açılışında reklam çıkmamalı.
  const isFirstRoute = useRef(true);
  useEffect(() => {
    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }
    if (!adsAllowed) return;
    registerNavigation();
    // Reklamsız bir sayfaya girerken tam ekran reklam açılmamalı: /pro ödeme
    // ekranının üstünü kapatmak AdMob politikasına aykırı, giriş akışını
    // bölmek ise dönüşüm kaybı olurdu. Sayaç yine de işler, reklam bir
    // sonraki uygun geçişe ertelenir.
    if (isAdFreeRoute(pathname)) return;
    void maybeShowInterstitial();
  }, [pathname, adsAllowed]);

  // SDK'yı (ve onay formunu) yalnızca reklam gerçekten gösterilecekse başlat.
  useEffect(() => {
    if (adsAllowed) void initializeAds();
  }, [adsAllowed]);

  return null;
};
