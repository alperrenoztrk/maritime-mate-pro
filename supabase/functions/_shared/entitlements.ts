// Entitlement (paket hakkı) ve AI kota yardımcıları.
//
// Tüm okuma/yazma service_role istemcisiyle yapılır; istemci tarafı yalnızca
// kendi satırlarını RLS ile okuyabilir. Paket kuralları:
//  - lifetime: aktif ömür boyu satın alma → tüm çevrimdışı Pro içerik,
//    AI kotası ücretsiz pakete yakın tutulur (sürekli maliyet aboneliğe ait).
//  - pro: aktif/ek süredeki abonelik → tüm içerik + geniş AI kotası.
//  - free: diğer herkes → sınırlı AI kotası.

import type { SupabaseClient } from './serviceClient.ts';

// Tanım serviceClient.ts'e taşındı (rateLimit.ts de kullanıyor); mevcut
// çağıranlar bozulmasın diye buradan yeniden dışa aktarılıyor.
export { createServiceClient } from './serviceClient.ts';

export type Tier = 'free' | 'pro' | 'lifetime';

// Play Console'da tanımlanması gereken ürün kimlikleri.
// Ortam değişkeniyle geçersiz kılınabilir (virgülle ayrılmış liste).
export function getSubscriptionProductIds(): string[] {
  return (Deno.env.get('PLAY_SUBSCRIPTION_IDS') || 'pro_monthly,pro_yearly')
    .split(',').map((s) => s.trim()).filter(Boolean);
}

export function getLifetimeProductIds(): string[] {
  return (Deno.env.get('PLAY_LIFETIME_IDS') || 'pro_lifetime')
    .split(',').map((s) => s.trim()).filter(Boolean);
}

interface EntitlementRow {
  product_id: string;
  product_type: 'subscription' | 'lifetime';
  status: string;
  expires_at: string | null;
}

// Erişim veren durumlar. 'canceled' yenilemenin kapandığı anlamına gelir;
// Google politikası gereği expires_at'e kadar erişim sürer. on_hold/paused
// erişim vermez.
const ACCESS_STATUSES = new Set(['active', 'grace_period', 'canceled']);

export function isRowActive(row: EntitlementRow, now: Date = new Date()): boolean {
  if (!ACCESS_STATUSES.has(row.status)) return false;
  if (row.product_type === 'lifetime') return row.status === 'active';
  if (!row.expires_at) return false;
  return new Date(row.expires_at).getTime() > now.getTime();
}

export async function getUserTier(client: SupabaseClient, userId: string): Promise<Tier> {
  const { data, error } = await client
    .from('user_entitlements')
    .select('product_id, product_type, status, expires_at')
    .eq('user_id', userId);
  if (error) throw new Error(`entitlement lookup failed: ${error.message}`);

  const rows = (data ?? []) as EntitlementRow[];
  const now = new Date();
  if (rows.some((r) => r.product_type === 'subscription' && isRowActive(r, now))) return 'pro';
  if (rows.some((r) => r.product_type === 'lifetime' && isRowActive(r, now))) return 'lifetime';
  return 'free';
}

// --- AI kota ---

export interface QuotaResult {
  allowed: boolean;
  tier: Tier;
  used: number;
  limit: number;
  remaining: number;
  period: string;
}

function quotaForTier(tier: Tier): number {
  const env = (name: string, fallback: number) => {
    const v = parseInt(Deno.env.get(name) ?? '', 10);
    return Number.isFinite(v) && v > 0 ? v : fallback;
  };
  switch (tier) {
    case 'pro': return env('AI_QUOTA_PRO', 300);
    case 'lifetime': return env('AI_QUOTA_LIFETIME', 30);
    default: return env('AI_QUOTA_FREE', 10);
  }
}

export function currentPeriod(now: Date = new Date()): string {
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
}

/**
 * Bir AI isteği için kota düşer. allowed=false dönerse istek AI'a
 * iletilmemeli, istemciye kota-doldu yanıtı verilmelidir.
 */
export async function consumeAiQuota(client: SupabaseClient, userId: string): Promise<QuotaResult> {
  const tier = await getUserTier(client, userId);
  const limit = quotaForTier(tier);
  const period = currentPeriod();

  const { data, error } = await client.rpc('consume_ai_credit', {
    p_user_id: userId,
    p_period: period,
    p_limit: limit,
  });
  if (error) throw new Error(`consume_ai_credit failed: ${error.message}`);

  const row = Array.isArray(data) ? data[0] : data;
  const used = row?.used ?? 0;
  const allowed = row?.allowed === true;
  return { allowed, tier, used, limit, remaining: Math.max(0, limit - used), period };
}

/** Kota düşmeden mevcut durumu döndürür (arayüzde göstermek için). */
export async function getAiQuotaStatus(client: SupabaseClient, userId: string): Promise<QuotaResult> {
  const tier = await getUserTier(client, userId);
  const limit = quotaForTier(tier);
  const period = currentPeriod();

  const { data, error } = await client
    .from('ai_usage')
    .select('used')
    .eq('user_id', userId)
    .eq('period', period)
    .maybeSingle();
  if (error) throw new Error(`ai_usage lookup failed: ${error.message}`);

  const used = data?.used ?? 0;
  return { allowed: used < limit, tier, used, limit, remaining: Math.max(0, limit - used), period };
}

/** Kota-doldu için standart 429 yanıtı. */
export function quotaExceededResponse(
  corsHeaders: Record<string, string>,
  quota: QuotaResult,
): Response {
  return new Response(
    JSON.stringify({
      error: 'Your monthly artificial intelligence usage allowance has expired.',
      code: 'AI_QUOTA_EXCEEDED',
      quota: { tier: quota.tier, used: quota.used, limit: quota.limit, remaining: quota.remaining, period: quota.period },
    }),
    { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  );
}
