-- Para kazanma altyapısı: Google Play satın alımlarını Supabase kullanıcısına
-- eşleyen entitlement tablosu + aylık AI kullanım kotası.
--
-- Yazma işlemleri YALNIZCA edge function'lar (service_role) üzerinden yapılır;
-- istemci kendi satırlarını sadece okuyabilir. Böylece Pro hakkı istemciden
-- sahtelenemez, sunucuda Google Play Developer API doğrulaması zorunlu olur.

CREATE TABLE public.user_entitlements (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  -- Şimdilik yalnızca google_play; ileride app_store / stripe eklenebilir.
  platform TEXT NOT NULL DEFAULT 'google_play'
    CHECK (platform IN ('google_play', 'app_store', 'stripe')),
  -- Play Console'daki ürün kimliği (pro_monthly / pro_yearly / pro_lifetime).
  product_id TEXT NOT NULL,
  product_type TEXT NOT NULL CHECK (product_type IN ('subscription', 'lifetime')),
  -- Google Play purchaseToken; bir token yalnızca tek kullanıcıya bağlanabilir.
  purchase_token TEXT NOT NULL,
  order_id TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN (
    'active',        -- geçerli (abonelik yenileniyor veya ömür boyu)
    'grace_period',  -- ödeme sorunu, Google'ın tanıdığı ek süre
    'on_hold',       -- ödeme alınamadı, erişim durdurulur
    'paused',        -- kullanıcı aboneliği duraklattı
    'canceled',      -- yenileme kapalı; expires_at'e kadar erişim sürer
    'expired',       -- süresi doldu
    'revoked'        -- iade / Google tarafından iptal
  )),
  auto_renewing BOOLEAN NOT NULL DEFAULT false,
  -- Abonelikler için bitiş anı; ömür boyu satın almada NULL.
  expires_at TIMESTAMPTZ,
  acknowledged BOOLEAN NOT NULL DEFAULT false,
  -- Play API yanıtının özeti (denetim/destek için).
  raw_payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (platform, purchase_token)
);

CREATE INDEX idx_user_entitlements_user_id ON public.user_entitlements(user_id);

GRANT SELECT ON public.user_entitlements TO authenticated;
GRANT ALL ON public.user_entitlements TO service_role;

ALTER TABLE public.user_entitlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own entitlements" ON public.user_entitlements
  FOR SELECT USING (auth.uid() = user_id);
-- INSERT/UPDATE/DELETE politikası bilinçli olarak yok: yalnızca service_role yazar.

CREATE TRIGGER update_user_entitlements_updated_at
  BEFORE UPDATE ON public.user_entitlements
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Aylık AI kullanım sayacı. period = 'YYYY-MM' (UTC).
CREATE TABLE public.ai_usage (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  period TEXT NOT NULL CHECK (period ~ '^\d{4}-\d{2}$'),
  used INTEGER NOT NULL DEFAULT 0 CHECK (used >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, period)
);

GRANT SELECT ON public.ai_usage TO authenticated;
GRANT ALL ON public.ai_usage TO service_role;

ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own ai usage" ON public.ai_usage
  FOR SELECT USING (auth.uid() = user_id);

-- Atomik kota tüketimi: limit dolmadıysa sayacı artırır ve allowed=true döner.
-- Tek UPSERT ile yarış koşullarına (aynı anda iki AI isteği) karşı güvenlidir.
-- Yalnızca service_role çağırabilir; edge function kullanıcı kimliğini JWT'den alır.
CREATE OR REPLACE FUNCTION public.consume_ai_credit(
  p_user_id UUID,
  p_period TEXT,
  p_limit INTEGER
)
RETURNS TABLE (allowed BOOLEAN, used INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_used INTEGER;
BEGIN
  INSERT INTO public.ai_usage AS u (user_id, period, used)
  VALUES (p_user_id, p_period, 1)
  ON CONFLICT (user_id, period) DO UPDATE
    SET used = u.used + 1, updated_at = now()
    WHERE u.used < p_limit
  RETURNING u.used INTO v_used;

  IF v_used IS NULL THEN
    -- UPDATE'in WHERE koşulu tutmadı: limit zaten dolu.
    SELECT u2.used INTO v_used FROM public.ai_usage u2
      WHERE u2.user_id = p_user_id AND u2.period = p_period;
    RETURN QUERY SELECT false, COALESCE(v_used, p_limit);
  ELSE
    RETURN QUERY SELECT true, v_used;
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.consume_ai_credit(UUID, TEXT, INTEGER) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.consume_ai_credit(UUID, TEXT, INTEGER) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_ai_credit(UUID, TEXT, INTEGER) TO service_role;
