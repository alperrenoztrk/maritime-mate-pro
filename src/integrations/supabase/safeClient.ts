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

type SupabaseClientInternals = SupabaseClient & {
  supabaseUrl?: string;
  supabaseKey?: string;
  anonKey?: string;
};

const client = typedSupabase as unknown as SupabaseClientInternals;

export const backendUrl = (import.meta.env.VITE_SUPABASE_URL || client.supabaseUrl) as string;
export const backendPublishableKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || client.supabaseKey || client.anonKey) as string;
