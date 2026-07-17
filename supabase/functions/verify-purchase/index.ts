// Google Play satın alma doğrulama ucu.
//
// İstemci (Capacitor PlayBilling eklentisi) satın alma tamamlanınca veya
// "satın alımları geri yükle" akışında purchaseToken'ları buraya gönderir.
// Sunucu her token'ı Google Play Developer API ile doğrular, sonucu
// user_entitlements tablosunda oturumdaki kullanıcıya bağlar ve gerekiyorsa
// satın almayı onaylar (acknowledge). İstemciden gelen hiçbir "Pro" iddiasına
// doğrudan güvenilmez.
//
// İstek gövdesi:
//   { purchases: [{ productId, purchaseToken, type: 'subs' | 'inapp' }] }
// Yanıt:
//   { tier, results: [{ productId, status, active, expiresAt, error? }] }

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "../_shared/cors.ts";
import { validateAuth, unauthorizedResponse, errorResponse, logError, GENERIC_ERRORS } from "../_shared/auth.ts";
import {
  isPlayApiConfigured,
  verifySubscription,
  verifyProduct,
  acknowledgeSubscription,
  acknowledgeProduct,
  type SubscriptionState,
} from "../_shared/googlePlay.ts";
import {
  createServiceClient,
  getUserTier,
  getSubscriptionProductIds,
  getLifetimeProductIds,
} from "../_shared/entitlements.ts";

interface PurchaseInput {
  productId: string;
  purchaseToken: string;
  type: 'subs' | 'inapp';
}

interface PurchaseResult {
  productId: string;
  status: string;
  active: boolean;
  expiresAt: string | null;
  error?: string;
}

function mapSubscriptionState(state: SubscriptionState): string {
  switch (state) {
    case 'SUBSCRIPTION_STATE_ACTIVE': return 'active';
    case 'SUBSCRIPTION_STATE_IN_GRACE_PERIOD': return 'grace_period';
    case 'SUBSCRIPTION_STATE_ON_HOLD': return 'on_hold';
    case 'SUBSCRIPTION_STATE_PAUSED': return 'paused';
    case 'SUBSCRIPTION_STATE_CANCELED': return 'canceled';
    case 'SUBSCRIPTION_STATE_EXPIRED': return 'expired';
    default: return 'expired';
  }
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get('origin'));

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return errorResponse(corsHeaders, 405, GENERIC_ERRORS.INVALID_INPUT);
  }

  const { user, error: authError } = await validateAuth(req);
  if (authError || !user) {
    return unauthorizedResponse(corsHeaders);
  }

  try {
    const body = await req.json().catch(() => ({}));

    // Sağlık kontrolü: Play API yapılandırması hazır mı?
    if (body.test === true) {
      return new Response(
        JSON.stringify({ status: isPlayApiConfigured() ? 'configured' : 'not_configured' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const purchases = Array.isArray(body.purchases) ? body.purchases as PurchaseInput[] : null;
    if (!purchases || purchases.length === 0 || purchases.length > 20) {
      return errorResponse(corsHeaders, 400, GENERIC_ERRORS.INVALID_INPUT);
    }

    if (!isPlayApiConfigured()) {
      return errorResponse(corsHeaders, 503, GENERIC_ERRORS.NOT_CONFIGURED);
    }

    const subsIds = getSubscriptionProductIds();
    const lifetimeIds = getLifetimeProductIds();
    const service = createServiceClient();
    const results: PurchaseResult[] = [];

    for (const p of purchases) {
      if (!p || typeof p.productId !== 'string' || typeof p.purchaseToken !== 'string') {
        results.push({ productId: String(p?.productId ?? ''), status: 'invalid', active: false, expiresAt: null, error: GENERIC_ERRORS.INVALID_INPUT });
        continue;
      }

      const isSub = subsIds.includes(p.productId);
      const isLifetime = lifetimeIds.includes(p.productId);
      if (!isSub && !isLifetime) {
        results.push({ productId: p.productId, status: 'unknown_product', active: false, expiresAt: null, error: 'Bilinmeyen ürün' });
        continue;
      }

      // Token daha önce başka bir kullanıcıya bağlandıysa reddet
      // (token paylaşarak Pro açma girişimini engeller).
      const { data: existing, error: existingError } = await service
        .from('user_entitlements')
        .select('user_id')
        .eq('platform', 'google_play')
        .eq('purchase_token', p.purchaseToken)
        .maybeSingle();
      if (existingError) throw new Error(existingError.message);
      if (existing && existing.user_id !== user.id) {
        results.push({ productId: p.productId, status: 'token_in_use', active: false, expiresAt: null, error: 'Bu satın alma başka bir hesaba bağlı' });
        continue;
      }

      try {
        if (isSub) {
          const verified = await verifySubscription(p.purchaseToken);
          if (!verified) {
            results.push({ productId: p.productId, status: 'not_found', active: false, expiresAt: null, error: 'Satın alma doğrulanamadı' });
            continue;
          }
          // subscriptionsv2 gerçek productId'yi döndürür; istemcinin
          // bildirdiğiyle çelişiyorsa Google'ınkini esas al.
          const productId = verified.productId || p.productId;
          if (!subsIds.includes(productId)) {
            results.push({ productId, status: 'unknown_product', active: false, expiresAt: null, error: 'Bilinmeyen ürün' });
            continue;
          }
          const status = mapSubscriptionState(verified.state);

          const { error: upsertError } = await service.from('user_entitlements').upsert({
            user_id: user.id,
            platform: 'google_play',
            product_id: productId,
            product_type: 'subscription',
            purchase_token: p.purchaseToken,
            order_id: verified.orderId,
            status,
            auto_renewing: verified.autoRenewing,
            expires_at: verified.expiresAt,
            acknowledged: verified.acknowledged,
            raw_payload: verified.raw,
          }, { onConflict: 'platform,purchase_token' });
          if (upsertError) throw new Error(upsertError.message);

          // Onaylanmamış satın alma 3 gün içinde onaylanmazsa Google iade eder.
          if (!verified.acknowledged && (status === 'active' || status === 'grace_period')) {
            await acknowledgeSubscription(productId, p.purchaseToken);
            await service.from('user_entitlements')
              .update({ acknowledged: true })
              .eq('platform', 'google_play')
              .eq('purchase_token', p.purchaseToken);
          }

          const active = (status === 'active' || status === 'grace_period' || status === 'canceled')
            && !!verified.expiresAt && new Date(verified.expiresAt).getTime() > Date.now();
          results.push({ productId, status, active, expiresAt: verified.expiresAt });
        } else {
          const verified = await verifyProduct(p.productId, p.purchaseToken);
          if (!verified) {
            results.push({ productId: p.productId, status: 'not_found', active: false, expiresAt: null, error: 'Satın alma doğrulanamadı' });
            continue;
          }
          // purchaseState: 0 satın alındı, 1 iptal/iade, 2 beklemede
          const status = verified.purchaseState === 0 ? 'active'
            : verified.purchaseState === 2 ? 'on_hold'
            : 'revoked';

          const { error: upsertError } = await service.from('user_entitlements').upsert({
            user_id: user.id,
            platform: 'google_play',
            product_id: p.productId,
            product_type: 'lifetime',
            purchase_token: p.purchaseToken,
            order_id: verified.orderId,
            status,
            auto_renewing: false,
            expires_at: null,
            acknowledged: verified.acknowledged,
            raw_payload: verified.raw,
          }, { onConflict: 'platform,purchase_token' });
          if (upsertError) throw new Error(upsertError.message);

          if (!verified.acknowledged && status === 'active') {
            await acknowledgeProduct(p.productId, p.purchaseToken);
            await service.from('user_entitlements')
              .update({ acknowledged: true })
              .eq('platform', 'google_play')
              .eq('purchase_token', p.purchaseToken);
          }

          results.push({ productId: p.productId, status, active: status === 'active', expiresAt: null });
        }
      } catch (e) {
        logError('verify-purchase:item', e);
        results.push({ productId: p.productId, status: 'error', active: false, expiresAt: null, error: GENERIC_ERRORS.SERVICE_ERROR });
      }
    }

    const tier = await getUserTier(service, user.id);
    return new Response(
      JSON.stringify({ tier, results }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    logError('verify-purchase', error);
    return errorResponse(corsHeaders);
  }
});
