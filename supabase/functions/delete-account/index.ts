// Hesap silme: kullanıcının tüm verilerini (tablolar + storage) temizler ve
// auth kaydını kaldırır. Yalnızca kendi hesabını silebilir.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { getCorsHeaders } from '../_shared/cors.ts';
import { validateAuth, unauthorizedResponse, errorResponse, GENERIC_ERRORS } from '../_shared/auth.ts';

// user_id sütunu olan ve hesapla birlikte silinmesi gereken tablolar.
const USER_TABLES = [
  'quiz_results',
  'user_category_stats',
  'user_generated_components',
  'ai_usage',
  'user_entitlements',
  'maritime_documents',
];

const USER_BUCKETS = ['maritime-documents', 'agent-uploads'];

async function purgeBucket(admin: ReturnType<typeof createClient>, bucket: string, userId: string) {
  const { data, error } = await admin.storage.from(bucket).list(userId, { limit: 1000 });
  if (error || !data?.length) return;
  const paths = data.map((entry) => `${userId}/${entry.name}`);
  await admin.storage.from(bucket).remove(paths);
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get('origin'));

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return errorResponse(corsHeaders, 405, GENERIC_ERRORS.INVALID_INPUT);
  }

  const { user, error: authError } = await validateAuth(req);
  if (!user) return unauthorizedResponse(corsHeaders, authError ?? undefined);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceKey) {
    return errorResponse(corsHeaders, 500, GENERIC_ERRORS.NOT_CONFIGURED);
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    for (const bucket of USER_BUCKETS) {
      try {
        await purgeBucket(admin, bucket, user.id);
      } catch (_e) {
        // Bucket yoksa veya boşsa devam et.
      }
    }

    for (const table of USER_TABLES) {
      const { error } = await admin.from(table).delete().eq('user_id', user.id);
      // Tablo bu ortamda yoksa (42P01) atla; diğer hatalar loglanır.
      if (error && error.code !== '42P01') {
        console.error('[delete-account] table cleanup failed', table, error.code);
      }
    }

    await admin.from('profiles').delete().eq('id', user.id);

    const { error: deleteError } = await admin.auth.admin.deleteUser(user.id);
    if (deleteError) {
      console.error('[delete-account] auth deletion failed');
      return errorResponse(corsHeaders, 500, GENERIC_ERRORS.SERVICE_ERROR);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (_e) {
    console.error('[delete-account] unexpected failure');
    return errorResponse(corsHeaders, 500, GENERIC_ERRORS.SERVICE_ERROR);
  }
});
