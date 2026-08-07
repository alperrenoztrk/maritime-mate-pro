// service_role Supabase istemcisi.
//
// Ayrı bir modülde durur çünkü hem faturalama (entitlements.ts) hem de
// altyapı katmanı (rateLimit.ts) buna ihtiyaç duyar; rate limit'in
// faturalama modülünü import etmesi yanlış bir bağımlılık yönü olurdu.
//
// service_role anahtarı RLS'i atlar ve yalnızca edge function ortamında
// yaşar; istemciye asla gönderilmez.

import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';

export type { SupabaseClient };

export function createServiceClient(): SupabaseClient {
  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !key) throw new Error('Supabase service role configuration missing');
  return createClient(url, key, { auth: { persistSession: false } });
}

// İstek başına yeni istemci kurmamak için süreç içi tekil.
let shared: SupabaseClient | null = null;

/** Paylaşılan service_role istemcisi (isolate ömrü boyunca tek örnek). */
export function getServiceClient(): SupabaseClient {
  if (!shared) shared = createServiceClient();
  return shared;
}
