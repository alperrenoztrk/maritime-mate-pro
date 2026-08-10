-- Make the AAL check self-contained so RLS no longer needs a public-executable
-- helper, and it only ever reports on the CALLER's own session.
CREATE OR REPLACE FUNCTION public.has_sufficient_aal()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO ''
AS $$
  SELECT CASE
    WHEN EXISTS (
      SELECT 1 FROM auth.mfa_factors
      WHERE user_id = (SELECT auth.uid()) AND status = 'verified'
    ) THEN COALESCE((SELECT auth.jwt() ->> 'aal'), 'aal1') = 'aal2'
    ELSE true
  END;
$$;

-- Lock down every SECURITY DEFINER helper to the roles that actually need it.
REVOKE ALL ON FUNCTION public.has_sufficient_aal() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_sufficient_aal() TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.acceptable_aal_levels() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.acceptable_aal_levels() TO service_role;

REVOKE ALL ON FUNCTION public.consume_ai_credit(uuid, text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_ai_credit(uuid, text, integer) TO service_role;

REVOKE ALL ON FUNCTION public.consume_rate_limit(text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_rate_limit(text, integer, integer) TO service_role;

REVOKE ALL ON FUNCTION public.prune_rate_limits(interval) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.prune_rate_limits(interval) TO service_role;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;