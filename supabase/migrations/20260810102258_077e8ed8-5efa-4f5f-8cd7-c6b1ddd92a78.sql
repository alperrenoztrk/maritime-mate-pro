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

CREATE OR REPLACE FUNCTION public.has_sufficient_aal()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SET search_path = ''
AS $$
  SELECT COALESCE((SELECT auth.jwt() ->> 'aal'), 'aal1') = ANY (public.acceptable_aal_levels());
$$;

REVOKE ALL ON FUNCTION public.has_sufficient_aal() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_sufficient_aal() TO authenticated;

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
    'ai_content_reports',
    'maritime_documents'
  ]
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Require MFA when enrolled" ON public.%I', tbl);
    EXECUTE format(
      'CREATE POLICY "Require MFA when enrolled" ON public.%I '
      'AS RESTRICTIVE TO authenticated '
      'USING ((SELECT public.has_sufficient_aal())) '
      'WITH CHECK ((SELECT public.has_sufficient_aal()))',
      tbl
    );
  END LOOP;
END $$;

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