// The maritime glossary is shared between the web app, the build-time i18n
// scripts AND the Supabase `translate` edge function. Supabase only bundles
// files under supabase/functions/, so the canonical module lives in
// supabase/functions/_shared/ and this shim re-exports it for `@/utils/...`
// imports.
export * from '../../supabase/functions/_shared/maritimeGlossary.ts';
