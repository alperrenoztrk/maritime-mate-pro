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
import { PlayBilling } from '@/plugins/playBilling';
import {
  normalizePurchases,
  isVerifiedResponse,
  planBackgroundSync,
  type BackgroundSyncReason,
  type VerificationInput,
} from './playPurchaseSafety';
import { loadProOffers, selectSubscriptionOffer, getProductPrice, type ProOffers } from './billingOffers';
export type { ProOffers } from './billingOffers';
import {
  PRODUCT_IDS,
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
  return loadProOffers((options) => PlayBilling.getProducts(options));
}

/** Satın alımları sunucuda doğrulatır ve güncel paketi döndürür. */
async function verifyOnServer(purchases: VerificationInput[]): Promise<VerifyResult> {
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
  if (!isVerifiedResponse(data)) throw new Error('Purchase verification service returned invalid results. No Pro access was granted.');
  return data;
}

/** functions.invoke hatasından HTTP durum kodunu okur (FunctionsHttpError.context). */
function readStatus(error: unknown): number | null {
  const context = (error as { context?: { status?: unknown } } | null)?.context;
  return typeof context?.status === 'number' ? context.status : null;
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
    // Refresh ProductDetails and select the same offer used for price display.
    const { products } = await PlayBilling.getProducts({ productIds: [productId], type });
    const product = products.find((item) => item.productId === productId) ?? null;
    if (!getProductPrice(product)) throw new Error('This plan is unavailable on Google Play');
    const offerToken = type === 'subs' ? selectSubscriptionOffer(product)?.offerToken : undefined;
    const { purchases } = await PlayBilling.purchase({
      productId,
      type,
      offerToken,
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
    const checked = normalizePurchases(completed, type, [productId]);
    if (checked.inputs.length === 0) throw new Error('Google Play did not return a valid, matching purchased product.');
    try {
      return await verifyOnServer(checked.inputs);
    } catch (verifyError) {
      // Google Play has already taken the payment at this point. A network
      // failure here (often: no connection on board) must not read as
      // "purchase failed, try again" — the background sync in
      // EntitlementContext finishes the verification when the app is online.
      if (verifyError instanceof BillingNotConfiguredError) throw verifyError;
      throw new BillingVerificationDeferredError();
    }
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
    ...normalizePurchases(subs.purchases, 'subs', [PRODUCT_IDS.monthly, PRODUCT_IDS.yearly]).inputs,
    ...normalizePurchases(inapp.purchases, 'inapp', [PRODUCT_IDS.lifetime]).inputs,
  ];

  if (inputs.length === 0) {
    return { tier: 'free', results: [] };
  }
  return verifyOnServer(inputs);
}

/**
 * Arka plan eşitlemesi: uygulama açılınca ve ön plana dönünce çağrılır
 * (EntitlementContext). Google'ın önerdiği akış budur — onPurchasesUpdated
 * her zaman gelmez (bekleyen ödeme sonradan onaylanır, uygulama doğrulamadan
 * önce kapanır, gemide internet yoktur). Onaylanmamış satın alma 3 gün içinde
 * otomatik iade edildiği için burada sunucuya doğrulatılır.
 *
 * `allowRelink` false ise yalnızca onaylanmamış satın almalar gönderilir;
 * "sunucuda Pro yok ama Play'de ürün var" kontrolü çağıran tarafından
 * seyreltilir (başka hesaba bağlı bir satın alma her açılışta istek atmasın).
 */
export async function syncOwnedPurchases(
  serverHasAccess: boolean,
  allowRelink: boolean,
): Promise<{ reason: BackgroundSyncReason; result: VerifyResult } | null> {
  if (!(await isBillingAvailable())) return null;
  const [subs, inapp] = await Promise.all([
    PlayBilling.restorePurchases({ type: 'subs' }),
    PlayBilling.restorePurchases({ type: 'inapp' }),
  ]);
  const plan = planBackgroundSync(
    subs.purchases,
    inapp.purchases,
    { subs: [PRODUCT_IDS.monthly, PRODUCT_IDS.yearly], inapp: [PRODUCT_IDS.lifetime] },
    serverHasAccess,
  );
  if (!plan.reason) return null;
  if (plan.reason === 'not_on_server' && !allowRelink) return null;
  return { reason: plan.reason, result: await verifyOnServer(plan.inputs) };
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
 * Ödeme Google Play'de tamamlandı ama sunucu doğrulaması şu an yapılamadı
 * (çoğunlukla bağlantı yok). Pro, uygulama bir sonraki çevrimiçi açılışta
 * arka plan eşitlemesiyle açılır.
 */
export class BillingVerificationDeferredError extends Error {
  constructor() {
    super(
      'Google Play completed the payment, but it could not be verified yet. ' +
      'Your Pro access opens automatically when the app is back online, or tap Restore purchases.',
    );
    this.name = 'BillingVerificationDeferredError';
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
      'The purchase verification service is not currently configured. If the fee has been collected, ' +
      'Google automatically refunds it within 3 days. Please contact support.',
    );
    this.name = 'BillingNotConfiguredError';
  }
}

function isBillingErrorCode(e: unknown, code: string): boolean {
  return typeof e === 'object' && e !== null && (e as { code?: string }).code === code;
}
