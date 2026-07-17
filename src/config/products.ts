/**
 * Para kazanma modeli: ücretsiz indirme + freemium.
 *
 * Ürün kimlikleri Google Play Console → Monetize → Products altında birebir
 * bu adlarla tanımlanmalıdır (bkz. MONETIZATION_SETUP.md). Fiyatlar Play
 * Console'da bölgesel olarak belirlenir; uygulama fiyatı her zaman mağazadan
 * canlı okur, burada fiyat SAKLANMAZ.
 */

export type ProPlan = 'monthly' | 'yearly' | 'lifetime';

export const PRODUCT_IDS = {
  /** Aylık Pro aboneliği (subs). */
  monthly: 'pro_monthly',
  /** Yıllık Pro aboneliği (subs) — ana teklif. */
  yearly: 'pro_yearly',
  /** Ömür boyu satın alma (inapp) — çevrimdışı içerik, sınırsız AI hariç. */
  lifetime: 'pro_lifetime',
} as const;

export const SUBSCRIPTION_PRODUCT_IDS = [PRODUCT_IDS.monthly, PRODUCT_IDS.yearly];
export const LIFETIME_PRODUCT_IDS = [PRODUCT_IDS.lifetime];

/**
 * Son başarılı sunucu eşitlemesinden sonra Pro erişiminin çevrimdışı
 * korunacağı süre (gün). Denizciler aylarca çevrimdışı kalabildiği için
 * cömert tutulur; ömür boyu paket çevrimdışında süresiz tanınır.
 */
export const OFFLINE_GRACE_DAYS = 45;

/** Play aboneliğini yönetme sayfası (iptal/duraklatma kullanıcıya aittir). */
export function getPlaySubscriptionManagementUrl(productId?: string): string {
  const base = 'https://play.google.com/store/account/subscriptions';
  if (!productId) return base;
  return `${base}?sku=${encodeURIComponent(productId)}&package=com.marinersbook.app`;
}
