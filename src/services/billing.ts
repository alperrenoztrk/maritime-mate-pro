/**
 * Satın alma orkestrasyonu.
 *
 * Akış: PlayBilling eklentisi mağaza ekranını açar → dönen purchaseToken
 * `verify-purchase` edge function'a gönderilir → sunucu Google Play Developer
 * API ile doğrular, entitlement'ı Supabase kullanıcısına bağlar ve onaylar.
 * Pro hakkı YALNIZCA sunucu doğrulaması sonucunda açılır.
 */
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/safeClient';
import { PlayBilling, type PlayProduct, type PlayPurchase } from '@/plugins/playBilling';
import {
  PRODUCT_IDS,
  SUBSCRIPTION_PRODUCT_IDS,
  LIFETIME_PRODUCT_IDS,
  type ProPlan,
} from '@/config/products';

export type Tier = 'free' | 'pro' | 'lifetime';

export interface VerifyResult {
  tier: Tier;
  results: Array<{
    productId: string;
    status: string;
    active: boolean;
    expiresAt: string | null;
    error?: string;
  }>;
}

export interface ProOffers {
  monthly: PlayProduct | null;
  yearly: PlayProduct | null;
  lifetime: PlayProduct | null;
}

export async function isBillingAvailable(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;
  try {
    const { available } = await PlayBilling.isAvailable();
    return available;
  } catch {
    return false;
  }
}

/** Mağazadan güncel (kullanıcının bölgesine göre) fiyatları çeker. */
export async function fetchProOffers(): Promise<ProOffers> {
  const [subs, inapp] = await Promise.all([
    PlayBilling.getProducts({ productIds: SUBSCRIPTION_PRODUCT_IDS, type: 'subs' }),
    PlayBilling.getProducts({ productIds: LIFETIME_PRODUCT_IDS, type: 'inapp' }),
  ]);
  const find = (list: PlayProduct[], id: string) =>
    list.find((p) => p.productId === id) ?? null;
  return {
    monthly: find(subs.products, PRODUCT_IDS.monthly),
    yearly: find(subs.products, PRODUCT_IDS.yearly),
    lifetime: find(inapp.products, PRODUCT_IDS.lifetime),
  };
}

/** Satın alımları sunucuda doğrulatır ve güncel paketi döndürür. */
async function verifyOnServer(purchases: Array<{ productId: string; purchaseToken: string; type: 'subs' | 'inapp' }>): Promise<VerifyResult> {
  const { data, error } = await supabase.functions.invoke('verify-purchase', {
    body: { purchases },
  });
  if (error) {
    // 503 = sunucuda GOOGLE_PLAY_SERVICE_ACCOUNT_JSON tanımlı değil. Bu bir
    // ağ hatası değil, dağıtım hatasıdır: tekrar denemek düzeltmez ve
    // kullanıcıya "try again" demek yanıltıcı olur. Ayrı bir hata
    // tipiyle yüzeye çıkarılır (bkz. scripts/check-play-billing-config.mjs).
    if (readStatus(error) === 503) throw new BillingNotConfiguredError();
    throw error;
  }
  return data as VerifyResult;
}

/** functions.invoke hatasından HTTP durum kodunu okur (FunctionsHttpError.context). */
function readStatus(error: unknown): number | null {
  const context = (error as { context?: { status?: unknown } } | null)?.context;
  return typeof context?.status === 'number' ? context.status : null;
}

function toVerifyInput(purchase: PlayPurchase, type: 'subs' | 'inapp') {
  return purchase.productIds.map((productId) => ({
    productId,
    purchaseToken: purchase.purchaseToken,
    type,
  }));
}

/**
 * Bir Pro planı satın alır. `userId` (Supabase auth id) satın almaya
 * obfuscatedAccountId olarak iliştirilir. "Zaten sahip" hatasında otomatik
 * geri yükleme yapılır.
 */
export async function purchasePlan(plan: ProPlan, userId: string): Promise<VerifyResult> {
  const type: 'subs' | 'inapp' = plan === 'lifetime' ? 'inapp' : 'subs';
  const productId = PRODUCT_IDS[plan];

  try {
    const { purchases } = await PlayBilling.purchase({
      productId,
      type,
      obfuscatedAccountId: userId,
    });
    const pending = purchases.filter((p) => p.purchaseState === 2);
    const completed = purchases.filter((p) => p.purchaseState === 1);
    if (completed.length === 0) {
      if (pending.length > 0) {
        // Bekleyen ödeme (ör. banka onayı): tamamlanınca geri yükleme ile bağlanır.
        throw new BillingPendingError();
      }
      throw new Error('The purchase could not be completed');
    }
    return await verifyOnServer(completed.flatMap((p) => toVerifyInput(p, type)));
  } catch (e) {
    if (isBillingErrorCode(e, 'ITEM_ALREADY_OWNED')) {
      // Ürün bu Google hesabında zaten var: doğrulayıp bu Supabase
      // kullanıcısına bağlamayı dene (cihaz değişikliği / yeniden kurulum).
      return await restorePurchases();
    }
    throw e;
  }
}

/**
 * Satın alımları geri yükler: Google hesabındaki tüm abonelik ve tek seferlik
 * satın alımlar sunucuya doğrulatılır. Yeni cihazda veya uygulama yeniden
 * kurulduğunda Pro erişimini geri getirir.
 */
export async function restorePurchases(): Promise<VerifyResult> {
  const [subs, inapp] = await Promise.all([
    PlayBilling.restorePurchases({ type: 'subs' }),
    PlayBilling.restorePurchases({ type: 'inapp' }),
  ]);

  const inputs = [
    ...subs.purchases.filter((p) => p.purchaseState === 1).flatMap((p) => toVerifyInput(p, 'subs' as const)),
    ...inapp.purchases.filter((p) => p.purchaseState === 1).flatMap((p) => toVerifyInput(p, 'inapp' as const)),
  ];

  if (inputs.length === 0) {
    return { tier: 'free', results: [] };
  }
  return verifyOnServer(inputs);
}

/** Kullanıcı satın almayı kendisi iptal ettiğinde fırlatılan durum. */
export function isUserCanceled(e: unknown): boolean {
  return isBillingErrorCode(e, 'USER_CANCELED');
}

export class BillingPendingError extends Error {
  constructor() {
    super('Your payment is pending. Once approved, your Pro access will be opened automatically.');
    this.name = 'BillingPendingError';
  }
}

/**
 * Sunucuda Play Developer API kimlik bilgisi yok: satın alma doğrulanamaz.
 *
 * Google, onaylanmayan (acknowledge edilmeyen) satın almayı 3 gün içinde
 * otomatik iade eder; kullanıcıya bunu söylemek "try again" demekten
 * hem doğru hem de dürüsttür.
 */
export class BillingNotConfiguredError extends Error {
  constructor() {
    super(
      'The purchase verification service is not currently configured. If the fee has been collected' +
      'Google automatically returns it within 3 days. Please contact support.',
    );
    this.name = 'BillingNotConfiguredError';
  }
}

function isBillingErrorCode(e: unknown, code: string): boolean {
  return typeof e === 'object' && e !== null && (e as { code?: string }).code === code;
}
