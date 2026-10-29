import type { PlayBillingPlugin, PlayProduct, PlaySubscriptionOffer } from '../plugins/playBilling';
import { PRODUCT_IDS, SUBSCRIPTION_PRODUCT_IDS, LIFETIME_PRODUCT_IDS } from '../config/products';

export interface ProOffers {
  monthly: PlayProduct | null;
  yearly: PlayProduct | null;
  lifetime: PlayProduct | null;
}

/** Prefer the standard base plan; never depend on Google's offer ordering. */
export function selectSubscriptionOffer(product: PlayProduct | null): PlaySubscriptionOffer | null {
  const eligible = product?.offers.filter((offer) =>
    offer.offerToken && offer.pricingPhases.some((phase) => phase.formattedPrice.trim()),
  ) ?? [];
  return eligible.find((offer) => !offer.offerId) ?? eligible[0] ?? null;
}

export function getProductPrice(product: PlayProduct | null): string | null {
  if (!product) return null;
  if (product.type === 'inapp') return product.formattedPrice?.trim() || null;
  const phases = selectSubscriptionOffer(product)?.pricingPhases ?? [];
  return [...phases].reverse().find((phase) => phase.formattedPrice.trim())?.formattedPrice ?? null;
}

/** A failed lifetime query must not discard successfully loaded subscriptions. */
export async function loadProOffers(getProducts: PlayBillingPlugin['getProducts']): Promise<ProOffers> {
  const results = await Promise.allSettled([
    getProducts({ productIds: SUBSCRIPTION_PRODUCT_IDS, type: 'subs' }),
    getProducts({ productIds: LIFETIME_PRODUCT_IDS, type: 'inapp' }),
  ]);
  if (results.every((result) => result.status === 'rejected')) {
    throw new Error('Google Play prices could not be loaded');
  }
  const products = results.flatMap((result) => result.status === 'fulfilled' ? result.value.products : []);
  const find = (id: string) => products.find((product) => product.productId === id) ?? null;
  return { monthly: find(PRODUCT_IDS.monthly), yearly: find(PRODUCT_IDS.yearly), lifetime: find(PRODUCT_IDS.lifetime) };
}