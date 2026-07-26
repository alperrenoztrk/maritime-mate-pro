// Re-export the single generated Supabase client to avoid instantiating
// multiple GoTrueClient instances against the same storage key. When two
// clients coexist, sessions set by one (e.g. the Lovable OAuth helper) are
// not observed by the other's onAuthStateChange listener, which breaks the
// signed-in UI after Google login.
import { supabase as typedSupabase } from "./client";
import type { SupabaseClient } from "@supabase/supabase-js";

// Re-export untyped to preserve prior behavior for tables not in generated types
// (e.g. maritime_documents). Same underlying instance = one GoTrueClient.
export const supabase = typedSupabase as unknown as SupabaseClient;

const FALLBACK_SUPABASE_URL = "https://vrpbhguztsqakvjcezeb.supabase.co";
const FALLBACK_SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZycGJoZ3V6dHNxYWt2amNlemViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyOTczNzcsImV4cCI6MjA4MTg3MzM3N30._RMAZAKoGsk9xmHAXCvITf8BW4f52WyHYdhJq4IEW4Y";

export const backendUrl = (import.meta.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL) as string;
export const backendPublishableKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_SUPABASE_PUBLISHABLE_KEY) as string;
