import assert from 'node:assert/strict';
import test from 'node:test';
import { getProductPrice, loadProOffers, selectSubscriptionOffer } from './billingOffers';
import type { PlayProduct, PlaySubscriptionOffer } from '../plugins/playBilling';

const base: PlaySubscriptionOffer = {
  basePlanId: 'monthly', offerId: null, offerToken: 'base-token',
  pricingPhases: [{ formattedPrice: '₺99,99', priceAmountMicros: 99990000, currencyCode: 'TRY', billingPeriod: 'P1M' }],
};
const monthly: PlayProduct = { productId: 'pro_monthly', type: 'subs', title: 'Monthly', description: '', offers: [base] };

test('a failed lifetime query preserves subscription prices', async () => {
  const offers = await loadProOffers(async ({ type }) => {
    if (type === 'inapp') throw new Error('Unavailable');
    return { products: [monthly] };
  });
  assert.equal(getProductPrice(offers.monthly), '₺99,99');
  assert.equal(offers.lifetime, null);
});

test('base plan price and purchase token do not depend on offer order', () => {
  const promotion = { ...base, offerId: 'trial', offerToken: 'trial-token', pricingPhases: [{ ...base.pricingPhases[0], formattedPrice: 'Free' }] };
  const product = { ...monthly, offers: [promotion, base] };
  assert.equal(getProductPrice(product), '₺99,99');
  assert.equal(selectSubscriptionOffer(product)?.offerToken, 'base-token');
});

test('empty offers are skipped instead of hiding a valid price', () => {
  assert.equal(getProductPrice({ ...monthly, offers: [{ ...base, pricingPhases: [] }, base] }), '₺99,99');
});

test('missing products and empty results have no invented prices', async () => {
  const offers = await loadProOffers(async () => ({ products: [] }));
  assert.deepEqual(offers, { monthly: null, yearly: null, lifetime: null });
  assert.equal(getProductPrice(null), null);
});

test('both query failures report an error instead of a successful empty load', async () => {
  await assert.rejects(loadProOffers(async () => { throw new Error('Offline'); }));
});

test('one-time price remains exactly the price returned by Google Play', () => {
  assert.equal(getProductPrice({ ...monthly, type: 'inapp', formattedPrice: '$199.99', offers: [] }), '$199.99');
});