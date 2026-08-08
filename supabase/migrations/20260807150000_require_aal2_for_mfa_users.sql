-- İki adımlı doğrulamanın sunucu tarafındaki zorlaması.
--
-- İstemcideki kod ekranı (src/components/auth/MfaChallengeForm.tsx) tek başına
-- güvenlik değildir: çalınmış bir `aal1` jetonu PostgREST'e doğrudan konuşup
-- kullanıcının bütün verisini okuyabilir. Asıl kapı burada.
--
-- Politika RESTRICTIVE'dir: mevcut PERMISSIVE politikalarla VE'lenir, yani
-- onları gevşetmez, yalnızca üzerine ek şart koyar. Satır sahipliği kontrolü
-- (auth.uid() = user_id) olduğu gibi kalır.
--
-- Şart şu: kullanıcının doğrulanmış bir MFA faktörü VARSA jetonun `aal`
-- iddiası 'aal2' olmalı. Faktör kaydetmemiş kullanıcı için 'aal1' de kabul
-- edilir — yani 2FA'yı açmamış hiç kimse dışarıda kalmaz. Bu, Supabase'in
-- resmî MFA zorlama kalıbıdır.
--
-- service_role bu politikalardan etkilenmez (RLS'i baypas eder), dolayısıyla
-- edge function'lar (delete-account, verify-purchase, play-rtdn…) çalışmaya
-- devam eder.

-- Kullanıcının 2FA açıp açmadığına göre kabul edilebilir AAL kümesi.
-- STABLE + SECURITY DEFINER: auth.mfa_factors tablosu authenticated rolüne
-- kapalıdır, okuma yetkisini fonksiyon sahibi üzerinden alırız.
CREATE OR REPLACE FUNCTION public.acceptable_aal_levels()
RETURNS TEXT[]
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT CASE
    WHEN EXISTS (
      SELECT 1 FROM auth.mfa_factors
      WHERE user_id = (SELECT auth.uid()) AND status = 'verified'
    ) THEN ARRAY['aal2']
    ELSE ARRAY['aal1', 'aal2']
  END;
$$;

REVOKE ALL ON FUNCTION public.acceptable_aal_levels() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.acceptable_aal_levels() TO authenticated;

COMMENT ON FUNCTION public.acceptable_aal_levels() IS
  'MFA faktörü kayıtlı kullanıcılar için yalnızca aal2, diğerleri için aal1+aal2.';

-- Jetondaki AAL iddiası kabul edilebilir kümede mi?
CREATE OR REPLACE FUNCTION public.has_sufficient_aal()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SET search_path = ''
AS $$
  SELECT COALESCE(
    (SELECT auth.jwt() ->> 'aal'),
    'aal1'
  ) = ANY (public.acceptable_aal_levels());
$$;

REVOKE ALL ON FUNCTION public.has_sufficient_aal() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_sufficient_aal() TO authenticated;

-- Kullanıcı verisi tutan her tabloya tek bir RESTRICTIVE politika.
--
-- Fonksiyon çağrısı skaler alt sorguya sarılır: `(SELECT f())` biçimi
-- Postgres'in ifadeyi InitPlan olarak bir kez hesaplamasını sağlar. Çıplak
-- `f()` satır başına yeniden değerlendirilir ve büyük tablolarda RLS'i
-- gözle görülür biçimde yavaşlatır (Supabase'in RLS performans önerisi).
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'profiles',
    'quiz_results',
    'user_category_stats',
    'user_entitlements',
    'user_generated_components',
    'ai_usage',
    'ai_content_reports'
  ]
  LOOP
    EXECUTE format(
      'DROP POLICY IF EXISTS "Require MFA when enrolled" ON public.%I',
      tbl
    );
    EXECUTE format(
      'CREATE POLICY "Require MFA when enrolled" ON public.%I '
      'AS RESTRICTIVE TO authenticated '
      'USING ((SELECT public.has_sufficient_aal())) '
      'WITH CHECK ((SELECT public.has_sufficient_aal()))',
      tbl
    );
  END LOOP;
END $$;

-- Yüklenen belgeler ve dosyalar da aynı kapının arkasında olmalı; jeton
-- çalındığında pasaport/sertifika görselleri en hassas veridir.
--
-- Politika yalnızca uygulamanın kendi bucket'larını kapsar. Her ikisi de
-- private'tır ve authenticated rolüne bağlıdır; anon erişimi etkilenmez.
DROP POLICY IF EXISTS "Require MFA when enrolled" ON storage.objects;
CREATE POLICY "Require MFA when enrolled" ON storage.objects
  AS RESTRICTIVE
  TO authenticated
  USING (
    bucket_id NOT IN ('maritime-documents', 'agent-uploads')
    OR (SELECT public.has_sufficient_aal())
  )
  WITH CHECK (
    bucket_id NOT IN ('maritime-documents', 'agent-uploads')
    OR (SELECT public.has_sufficient_aal())
  );
