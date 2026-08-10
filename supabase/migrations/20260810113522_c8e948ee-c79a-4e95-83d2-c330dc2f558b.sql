CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

ALTER FUNCTION public.has_sufficient_aal() SET SCHEMA private;
REVOKE ALL ON FUNCTION private.has_sufficient_aal() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_sufficient_aal() TO authenticated, service_role;
