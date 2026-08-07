-- Kalıcı (isolate'ler arası paylaşılan) rate limit sayacı.
--
-- _shared/rateLimit.ts'teki bellek içi sayaç isolate başına tutulduğu için
-- yalnızca "best-effort fren"di: soğuk başlatmada sıfırlanıyor ve paralel
-- isolate'ler arasında paylaşılmadığı için gerçek limit, yapılandırılan
-- limitin isolate sayısı katı kadar oluyordu. Bu tablo sayacı Postgres'e
-- taşır. Bellekteki sayaç ucuz ilk kademe olarak korunur: aynı isolate'te
-- dönen bir bot döngüsünü DB'ye hiç gitmeden keser.
--
-- Yazma yalnızca service_role (edge function) üzerinden yapılır.

CREATE TABLE IF NOT EXISTS public.rate_limits (
  -- "<fonksiyon>:<ip veya kullanıcı kimliği>" biçiminde kova anahtarı.
  bucket TEXT PRIMARY KEY,
  -- İçinde bulunulan sabit pencerenin başlangıcı.
  window_start TIMESTAMPTZ NOT NULL,
  count INTEGER NOT NULL DEFAULT 0 CHECK (count >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Terk edilmiş kovaların süpürülmesi için (bkz. prune_rate_limits).
CREATE INDEX IF NOT EXISTS idx_rate_limits_updated_at ON public.rate_limits(updated_at);

GRANT ALL ON public.rate_limits TO service_role;

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
-- Politika bilinçli olarak yok: tabloya yalnızca service_role erişir.
-- İstemcinin kendi rate limit sayacını okuması ya da yazması gerekmez.

-- Atomik sabit pencere sayacı.
--
-- Tek UPSERT ile yarış koşullarına karşı güvenlidir (consume_ai_credit ile
-- aynı desen). Pencere dolduğunda satır güncellenmez; bu sayede sayaç
-- sınırsız büyümez ve saldırgan istek göndermeye devam ederek pencereyi
-- uzatamaz.
--
-- Her kova için tablodaki satır sayısı SABİTTİR (pencere yenilenince aynı
-- satır güncellenir), böylece tablo pencere başına şişmez.
CREATE OR REPLACE FUNCTION public.consume_rate_limit(
  p_bucket TEXT,
  p_limit INTEGER,
  p_window_sec INTEGER
)
RETURNS TABLE (allowed BOOLEAN, retry_after_sec INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_now TIMESTAMPTZ := now();
  v_window_sec INTEGER := GREATEST(1, COALESCE(p_window_sec, 60));
  v_window_start TIMESTAMPTZ;
  v_row_window TIMESTAMPTZ;
  v_count INTEGER;
BEGIN
  -- Sabit pencere: epoch'u pencere boyuna yuvarla.
  v_window_start := to_timestamp(
    floor(extract(epoch FROM v_now) / v_window_sec) * v_window_sec
  );

  INSERT INTO public.rate_limits AS r (bucket, window_start, count, updated_at)
  VALUES (p_bucket, v_window_start, 1, v_now)
  ON CONFLICT (bucket) DO UPDATE
    SET count = CASE WHEN r.window_start < v_window_start THEN 1 ELSE r.count + 1 END,
        -- Saat geri kayarsa pencereyi geriye almamak için GREATEST.
        window_start = GREATEST(r.window_start, v_window_start),
        updated_at = v_now
    -- Pencere yenilendiyse her zaman; aynı pencerede yalnızca limit
    -- dolmadıysa güncelle. Koşul tutmazsa RETURNING boş döner → allowed=false.
    WHERE r.window_start < v_window_start OR r.count < p_limit
  RETURNING r.count, r.window_start INTO v_count, v_row_window;

  IF v_count IS NULL THEN
    -- Limit bu pencerede dolu: mevcut pencerenin bitişine kadar bekletilir.
    SELECT r2.window_start INTO v_row_window
      FROM public.rate_limits r2 WHERE r2.bucket = p_bucket;
    RETURN QUERY SELECT
      false,
      GREATEST(1, CEIL(EXTRACT(epoch FROM
        (COALESCE(v_row_window, v_window_start) + make_interval(secs => v_window_sec)) - v_now
      ))::INTEGER);
  ELSE
    -- p_limit = 0 gibi uç bir yapılandırmada taze INSERT de reddedilmelidir.
    RETURN QUERY SELECT
      v_count <= p_limit,
      GREATEST(1, CEIL(EXTRACT(epoch FROM
        (v_row_window + make_interval(secs => v_window_sec)) - v_now
      ))::INTEGER);
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.consume_rate_limit(TEXT, INTEGER, INTEGER) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.consume_rate_limit(TEXT, INTEGER, INTEGER) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_rate_limit(TEXT, INTEGER, INTEGER) TO service_role;

-- Uzun süre dokunulmamış kovaları temizler. Kova başına tek satır tutulduğu
-- için tablo yalnızca bir daha hiç görülmeyen IP'lerle büyür; günlük süpürme
-- fazlasıyla yeterlidir. pg_cron varsa:
--   SELECT cron.schedule('prune-rate-limits', '0 4 * * *',
--                        $$SELECT public.prune_rate_limits()$$);
CREATE OR REPLACE FUNCTION public.prune_rate_limits(
  p_older_than INTERVAL DEFAULT INTERVAL '1 day'
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_deleted INTEGER;
BEGIN
  DELETE FROM public.rate_limits WHERE updated_at < now() - p_older_than;
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  RETURN v_deleted;
END;
$$;

REVOKE ALL ON FUNCTION public.prune_rate_limits(INTERVAL) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.prune_rate_limits(INTERVAL) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.prune_rate_limits(INTERVAL) TO service_role;
