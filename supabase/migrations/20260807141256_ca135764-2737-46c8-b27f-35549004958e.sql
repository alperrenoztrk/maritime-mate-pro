-- 20260806120000_ai_content_reports.sql
CREATE TABLE IF NOT EXISTS public.ai_content_reports (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  surface TEXT NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN ('inaccurate','offensive','unsafe','other')),
  reported_content TEXT NOT NULL CHECK (char_length(reported_content) <= 8000),
  user_prompt TEXT CHECK (char_length(user_prompt) <= 4000),
  note TEXT CHECK (char_length(note) <= 1000),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','reviewed','actioned','dismissed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_content_reports_status ON public.ai_content_reports(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_content_reports_user_id ON public.ai_content_reports(user_id);

GRANT SELECT, INSERT ON public.ai_content_reports TO authenticated;
GRANT ALL ON public.ai_content_reports TO service_role;

ALTER TABLE public.ai_content_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can file own AI reports" ON public.ai_content_reports;
CREATE POLICY "Users can file own AI reports" ON public.ai_content_reports
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own AI reports" ON public.ai_content_reports;
CREATE POLICY "Users can view own AI reports" ON public.ai_content_reports
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- 20260807120000_durable_rate_limits.sql
CREATE TABLE IF NOT EXISTS public.rate_limits (
  bucket TEXT PRIMARY KEY,
  window_start TIMESTAMPTZ NOT NULL,
  count INTEGER NOT NULL DEFAULT 0 CHECK (count >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_updated_at ON public.rate_limits(updated_at);

GRANT ALL ON public.rate_limits TO service_role;

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

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
  v_window_start := to_timestamp(
    floor(extract(epoch FROM v_now) / v_window_sec) * v_window_sec
  );

  INSERT INTO public.rate_limits AS r (bucket, window_start, count, updated_at)
  VALUES (p_bucket, v_window_start, 1, v_now)
  ON CONFLICT (bucket) DO UPDATE
    SET count = CASE WHEN r.window_start < v_window_start THEN 1 ELSE r.count + 1 END,
        window_start = GREATEST(r.window_start, v_window_start),
        updated_at = v_now
    WHERE r.window_start < v_window_start OR r.count < p_limit
  RETURNING r.count, r.window_start INTO v_count, v_row_window;

  IF v_count IS NULL THEN
    SELECT r2.window_start INTO v_row_window
      FROM public.rate_limits r2 WHERE r2.bucket = p_bucket;
    RETURN QUERY SELECT
      false,
      GREATEST(1, CEIL(EXTRACT(epoch FROM
        (COALESCE(v_row_window, v_window_start) + make_interval(secs => v_window_sec)) - v_now
      ))::INTEGER);
  ELSE
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

-- 20260807120000_drop_stripe_platform_check.sql
DO $$
DECLARE
  v_stripe_rows BIGINT;
  v_constraint  TEXT;
BEGIN
  SELECT count(*) INTO v_stripe_rows
    FROM public.user_entitlements
    WHERE platform = 'stripe';

  IF v_stripe_rows > 0 THEN
    RAISE EXCEPTION
      'user_entitlements tablosunda platform=''stripe'' olan % satir var.',
      v_stripe_rows;
  END IF;

  FOR v_constraint IN
    SELECT conname
      FROM pg_constraint
      WHERE conrelid = 'public.user_entitlements'::regclass
        AND contype = 'c'
        AND pg_get_constraintdef(oid) ILIKE '%platform%'
  LOOP
    EXECUTE format(
      'ALTER TABLE public.user_entitlements DROP CONSTRAINT %I',
      v_constraint
    );
  END LOOP;
END $$;

ALTER TABLE public.user_entitlements
  ADD CONSTRAINT user_entitlements_platform_check
  CHECK (platform IN ('google_play', 'app_store'));