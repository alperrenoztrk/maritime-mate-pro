import { registerPlugin } from '@capacitor/core';

/**
 * Google Play Billing eklentisi (JS köprüsü).
 *
 * Native taraf: `android/.../PlayBillingPlugin.java`. Yalnızca mağaza
 * akışlarını yürütür (ürün sorgulama, satın alma ekranı, geri yükleme).
 * Satın alma doğrulaması ve Pro hakkının açılması sunucudadır
 * (`verify-purchase` edge function) — istemcideki hiçbir sonuç tek başına
 * Pro erişimi vermez.
 *
 * Platform davranışı:
 *  - **Android:** Play Billing Library 7 üzerinden gerçek akış.
 *  - **Web / iOS:** kullanılamaz; `isAvailable()` false döner, diğer
 *    çağrılar hata fırlatır. (iOS için ileride StoreKit eklenecek.)
 */
export type PlayProductType = 'subs' | 'inapp';

export interface PlayPricingPhase {
  formattedPrice: string;
  priceAmountMicros: number;
  currencyCode: string;
  /** ISO-8601 süre (örn. P1M = aylık, P1Y = yıllık). */
  billingPeriod: string;
}

export interface PlaySubscriptionOffer {
  offerToken: string;
  basePlanId: string;
  offerId: string | null;
  pricingPhases: PlayPricingPhase[];
}

export interface PlayProduct {
  productId: string;
  type: PlayProductType;
  title: string;
  description: string;
  /** Tek seferlik ürünlerde dolu; aboneliklerde fiyat offers içindedir. */
  formattedPrice?: string;
  priceAmountMicros?: number;
  currencyCode?: string;
  offers: PlaySubscriptionOffer[];
}

export interface PlayPurchase {
  productIds: string[];
  purchaseToken: string;
  orderId: string | null;
  /** 1 = satın alındı, 2 = beklemede (Pro açılmaz). */
  purchaseState: number;
  acknowledged: boolean;
}

export interface PlayBillingPlugin {
  /** Google Play Faturalandırma bu cihazda kullanılabilir mi? */
  isAvailable(): Promise<{ available: boolean }>;

  /** Play Console'da tanımlı ürünlerin güncel (bölgesel) fiyat bilgisi. */
  getProducts(options: {
    productIds: string[];
    type: PlayProductType;
  }): Promise<{ products: PlayProduct[] }>;

  /**
   * Satın alma ekranını açar. `obfuscatedAccountId` olarak Supabase kullanıcı
   * kimliği gönderilir; sunucu doğrulamada token-hesap eşleşmesini denetler.
   * Hata kodları: USER_CANCELED, ITEM_ALREADY_OWNED (geri yükleme başlat).
   */
  purchase(options: {
    productId: string;
    type: PlayProductType;
    offerToken?: string;
    obfuscatedAccountId?: string;
  }): Promise<{ purchases: PlayPurchase[] }>;

  /** Hesaptaki mevcut satın alımları döndürür (satın alımları geri yükle). */
  restorePurchases(options: { type: PlayProductType }): Promise<{ purchases: PlayPurchase[] }>;
}

const PlayBilling = registerPlugin<PlayBillingPlugin>('PlayBilling', {
  web: () => import('./playBilling.web').then((m) => new m.PlayBillingWeb()),
});

export { PlayBilling };
