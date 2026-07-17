// Google Play Gerçek Zamanlı Geliştirici Bildirimleri (RTDN) ucu.
//
// Play Console → Monetization setup → Real-time developer notifications ile
// bir Cloud Pub/Sub konusu tanımlanır; o konunun push aboneliği bu fonksiyona
// yönlendirilir:
//   https://<proje>.supabase.co/functions/v1/play-rtdn?secret=<PLAY_RTDN_SECRET>
//
// Böylece yenileme, iptal, ödeme sorunu (on hold / grace), duraklatma ve
// iade olayları kullanıcı uygulamayı açmasa bile entitlement tablosuna işlenir.
//
// Güvenlik: uç, verify_jwt=false ile açılır (Pub/Sub JWT gönderemez);
// bunun yerine URL'deki paylaşılan sır doğrulanır ve bildirim içeriğine asla
// güvenilmez — purchaseToken alınır, gerçek durum Play API'den yeniden okunur.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { logError } from "../_shared/auth.ts";
import { isPlayApiConfigured, verifySubscription, type SubscriptionState } from "../_shared/googlePlay.ts";
import { createServiceClient } from "../_shared/entitlements.ts";

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

function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

// Pub/Sub, 2xx dışı yanıtları yeniden dener. Kalıcı hatalarda (bilinmeyen
// token vb.) 200 dönerek gereksiz tekrar teslimi önlüyoruz; yalnızca geçici
// hatalarda 500 dönüyoruz.
const ok = () => new Response(JSON.stringify({ ok: true }), {
  status: 200, headers: { 'Content-Type': 'application/json' },
});

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const secret = Deno.env.get('PLAY_RTDN_SECRET');
  const provided = new URL(req.url).searchParams.get('secret') ?? '';
  if (!secret || !timingSafeEqual(provided, secret)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const envelope = await req.json().catch(() => null);
    const dataB64 = envelope?.message?.data;
    if (typeof dataB64 !== 'string') return ok();

    let notification: Record<string, unknown>;
    try {
      notification = JSON.parse(atob(dataB64));
    } catch {
      return ok();
    }

    // Play Console'daki "Send test notification" doğrulaması.
    if (notification.testNotification) return ok();

    if (!isPlayApiConfigured()) {
      logError('play-rtdn', 'Play API not configured, dropping notification');
      return ok();
    }

    const service = createServiceClient();

    const subNotification = notification.subscriptionNotification as
      | { purchaseToken?: string; subscriptionId?: string }
      | undefined;
    if (subNotification?.purchaseToken) {
      const token = subNotification.purchaseToken;

      // Token bize daha önce verify-purchase ile bağlanmadıysa hangi
      // kullanıcıya ait olduğunu bilemeyiz; kullanıcı uygulamayı açınca
      // geri yükleme akışı bağlayacaktır. Sessizce geç.
      const { data: row, error } = await service
        .from('user_entitlements')
        .select('id')
        .eq('platform', 'google_play')
        .eq('purchase_token', token)
        .maybeSingle();
      if (error) throw new Error(error.message);
      if (!row) return ok();

      const verified = await verifySubscription(token);
      if (!verified) {
        await service.from('user_entitlements')
          .update({ status: 'expired' })
          .eq('id', row.id);
        return ok();
      }

      const { error: updateError } = await service.from('user_entitlements').update({
        product_id: verified.productId || undefined,
        status: mapSubscriptionState(verified.state),
        auto_renewing: verified.autoRenewing,
        expires_at: verified.expiresAt,
        acknowledged: verified.acknowledged,
        raw_payload: verified.raw,
      }).eq('id', row.id);
      if (updateError) throw new Error(updateError.message);
      return ok();
    }

    const voided = notification.voidedPurchaseNotification as
      | { purchaseToken?: string }
      | undefined;
    if (voided?.purchaseToken) {
      // İade / geri alma: erişimi kapat (abonelik veya ömür boyu).
      const { error } = await service.from('user_entitlements')
        .update({ status: 'revoked', auto_renewing: false })
        .eq('platform', 'google_play')
        .eq('purchase_token', voided.purchaseToken);
      if (error) throw new Error(error.message);
      return ok();
    }

    // oneTimeProductNotification vb. diğer türler: doğrulama satın alma
    // sırasında verify-purchase ile yapıldığı için ek işlem gerekmez.
    return ok();
  } catch (error) {
    logError('play-rtdn', error);
    // Geçici hata: Pub/Sub yeniden denesin.
    return new Response('Internal error', { status: 500 });
  }
});
