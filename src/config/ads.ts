/**
 * AdMob yapılandırması — reklamla ilgili tüm sabitlerin tek kaynağı.
 *
 * Reklam, para kazanma modelinde ikincil gelirdir (bkz. MONETIZATION_SETUP.md):
 * yalnızca ÜCRETSİZ pakette gösterilir, Pro/ömür boyu kullanıcıda hiç
 * gösterilmez ("reklamsız kullanım" Pro vaadidir).
 *
 * Reklamların tamamı `VITE_ADS_ENABLED` build-time anahtarına bağlıdır ve
 * anahtar **varsayılan olarak kapalıdır** (bkz. `areAdsEnabled()`).
 *
 * Gerçek reklam birimi kimlikleri koda YAZILMAZ; `.env` üzerinden verilir.
 * Anahtar açık ama kimlikler boşsa Google'ın resmi TEST birimlerine düşülür,
 * böylece geliştirme ve CI derlemeleri gerçek envanteri kirletmeden çalışır.
 */

import { Capacitor } from '@capacitor/core';

/**
 * Google'ın resmi test reklam birimleri.
 * https://developers.google.com/admob/android/test-ads
 * https://developers.google.com/admob/ios/test-ads
 */
const TEST_AD_UNITS = {
  android: {
    banner: 'ca-app-pub-3940256099942544/6300978111',
    interstitial: 'ca-app-pub-3940256099942544/1033173712',
  },
  ios: {
    banner: 'ca-app-pub-3940256099942544/2934735716',
    interstitial: 'ca-app-pub-3940256099942544/4411468910',
  },
} as const;

export type AdFormat = keyof (typeof TEST_AD_UNITS)['android'];
export type AdPlatform = keyof typeof TEST_AD_UNITS;

/** Boş / yalnızca boşluk içeren env değerlerini yok sayar. */
function env(key: string): string | undefined {
  const raw = (import.meta.env as Record<string, string | undefined>)[key];
  const trimmed = raw?.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * Reklamlar bu derlemede etkin mi? (build-time ana anahtar)
 *
 * **Varsayılan kapalıdır**: yalnızca `VITE_ADS_ENABLED` değeri açıkça `true`
 * ise reklamlar etkin sayılır; tanımsız, boş veya başka her değer reklamları
 * tamamen kapatır.
 *
 * "Kimlik yok" ile "reklam yok" bilinçli olarak ayrı kararlardır: kimlikler
 * boş bırakıldığında TEST reklamına düşmek geliştirmede doğru, ancak mağaza
 * sürümünde AdMob politikası ihlalidir. Reklamsız yayınlanacak bir sürümde bu
 * anahtar kapalı bırakılır ve `areAdsSupported()` üzerinden tüm reklam yolları
 * (SDK başlatma, UMP onay formu, banner, geçiş reklamı) kapanır.
 *
 * Reklam açılacaksa anahtarı `true` yapmak yeterli değildir; aşağıdaki dört
 * birim kimliğinin de doldurulması gerekir, aksi hâlde yayınlanan sürüm
 * Google'ın TEST reklamlarını gösterir.
 */
export function areAdsEnabled(): boolean {
  return env('VITE_ADS_ENABLED')?.toLowerCase() === 'true';
}

const CONFIGURED_AD_UNITS: Record<AdPlatform, Record<AdFormat, string | undefined>> = {
  android: {
    banner: env('VITE_ADMOB_BANNER_ID_ANDROID'),
    interstitial: env('VITE_ADMOB_INTERSTITIAL_ID_ANDROID'),
  },
  ios: {
    banner: env('VITE_ADMOB_BANNER_ID_IOS'),
    interstitial: env('VITE_ADMOB_INTERSTITIAL_ID_IOS'),
  },
};

/** Çalışılan native platform; web'de (ve bilinmeyen platformda) null. */
export function getAdPlatform(): AdPlatform | null {
  const platform = Capacitor.getPlatform();
  return platform === 'android' || platform === 'ios' ? platform : null;
}

/**
 * Gerçek (canlı) reklam kimlikleri yapılandırılmış mı?
 *
 * `isTesting` bayrağı buradan türetilir: gerçek bir birim kimliğini
 * `isTesting: true` ile istemek AdMob politikasına aykırıdır, bu yüzden
 * "test birimi kullan" ve "test modunda çalış" kararı tek yerde birleştirilir.
 */
export function isUsingTestAds(): boolean {
  const platform = getAdPlatform();
  if (!platform) return true;
  const configured = CONFIGURED_AD_UNITS[platform];
  return !configured.banner && !configured.interstitial;
}

/** Verilen format için kullanılacak reklam birimi kimliği. */
export function getAdUnitId(format: AdFormat): string {
  const platform = getAdPlatform() ?? 'android';
  return CONFIGURED_AD_UNITS[platform][format] ?? TEST_AD_UNITS[platform][format];
}

/**
 * Reklam gösterilmeyecek yollar.
 *
 * - `/` ana sayfa: ürün kararı, ilk izlenim reklamsız kalır.
 * - `/auth*`, `/oauth-consent`: kimlik doğrulama akışı bölünmemeli.
 * - `/pro`: ödeme ekranında reklam göstermek AdMob politikasına aykırıdır.
 * - `/settings`: reklam tercihleri buradan yönetiliyor.
 */
export const AD_FREE_ROUTES: readonly string[] = [
  '/',
  '/auth',
  '/auth/callback',
  '/oauth-consent',
  '/pro',
  '/settings',
];

/** Verilen yolda reklam gösterilebilir mi? */
export function isAdFreeRoute(pathname: string): boolean {
  const normalized =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return AD_FREE_ROUTES.includes(normalized);
}

/**
 * Geçiş (interstitial) reklamı frekans kuralları.
 *
 * Denizciler uygulamayı vardiya arasında kısa kısa kullanıyor; agresif geçiş
 * reklamı hem mağaza puanını hem de Pro dönüşümünü düşürür. Bu yüzden üç kapı
 * birden sağlanmadan reklam gösterilmez.
 */

/** İki geçiş reklamı arasındaki en kısa süre. */
export const INTERSTITIAL_MIN_INTERVAL_MS = 3 * 60 * 1000;

/** Bir geçiş reklamı için gereken en az sayfa geçişi. */
export const INTERSTITIAL_MIN_NAVIGATIONS = 8;

/** Uygulama açıldıktan sonra geçiş reklamının susturulduğu süre. */
export const INTERSTITIAL_SESSION_WARMUP_MS = 60 * 1000;

/** Banner yüksekliğinin yazıldığı CSS değişkeni (bkz. src/index.css). */
export const BANNER_HEIGHT_CSS_VAR = '--ad-banner-height';
