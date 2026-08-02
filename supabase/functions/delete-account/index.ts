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

const PAGE_SIZE = 100;

/**
 * Bucket bu ortamda hiç tanımlı değil mi? (silinecek veri yok demektir)
 * Storage istemcisi hatayı Error yerine düz nesne olarak da döndürebildiği
 * için mesaj her iki biçimden de okunur.
 */
function isMissingBucket(error: unknown): boolean {
  const raw = error as { message?: unknown } | null;
  const message = typeof raw?.message === 'string' ? raw.message : String(error ?? '');
  return /bucket not found/i.test(message);
}

/**
 * Kullanıcının bucket klasörünü sayfa sayfa, alt klasörlere inerek boşaltır.
 *
 * Tek `list()` çağrısı en fazla bir sayfa döndürür; sayfalamadan silmek
 * eşiğin üzerindeki dosyaları geride bırakır ve "tüm verileriniz silindi"
 * beyanını ihlal eder. Silinen dosyalar listeden düştüğü için her turda ilk
 * sayfayı istemek yeterlidir.
 *
 * `id === null` olan kayıtlar gerçek nesne değil, alt klasör yer tutucusudur;
 * `remove()` bunları silemez, o yüzden içlerine inilir. Bir turda ne dosya
 * silinir ne de klasöre inilirse liste ilerlemiyor demektir ve döngü sonlanır
 * (aksi halde sonsuza kadar aynı sayfayı okurduk).
 *
 * Hata durumunda çağırana fırlatır: sessizce dönmek, silme başarısızken
 * kullanıcıya başarı mesajı gösterilmesine yol açar.
 */
async function purgeBucket(
  admin: ReturnType<typeof createClient>,
  bucket: string,
  prefix: string,
) {
  for (;;) {
    const { data, error } = await admin.storage.from(bucket).list(prefix, { limit: PAGE_SIZE });
    if (error) throw error;
    if (!data?.length) return;

    const filePaths: string[] = [];
    let descendedIntoFolder = false;

    for (const entry of data) {
      if (entry.id === null) {
        await purgeBucket(admin, bucket, `${prefix}/${entry.name}`);
        descendedIntoFolder = true;
      } else {
        filePaths.push(`${prefix}/${entry.name}`);
      }
    }

    if (filePaths.length) {
      const { error: removeError } = await admin.storage.from(bucket).remove(filePaths);
      if (removeError) throw removeError;
    }

    if (!filePaths.length && !descendedIntoFolder) return;
  }
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
      } catch (e) {
        // Bucket bu ortamda tanımlı değilse silinecek bir şey de yoktur.
        // Diğer hatalar yutulmamalı: storage'da auth silmeye bağlı bir
        // cascade yok, yani sessizce geçmek belge fotoğraflarını geride
        // bırakıp kullanıcıya "silindi" demek olur.
        if (!isMissingBucket(e)) throw e;
      }
    }

    for (const table of USER_TABLES) {
      const { error } = await admin.from(table).delete().eq('user_id', user.id);
      // Tablo bu ortamda yoksa (42P01) atla; gerçek hatalarda isteği
      // başarısız say, çünkü kısmi silmeyi başarı olarak raporlayamayız.
      if (error && error.code !== '42P01') {
        console.error('[delete-account] table cleanup failed', table, error.code);
        return errorResponse(corsHeaders, 500, GENERIC_ERRORS.SERVICE_ERROR);
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
