import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import { safeLocalStorage } from "@/lib/safeStorage";

export const backendUrl = import.meta.env.VITE_SUPABASE_URL as string;
export const backendPublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    // New opaque API keys must be sent as `apikey` only. Keeping this here
    // preserves the generated client's runtime behavior without importing it.
    if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) {
      headers.delete("Authorization");
    }

    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

// The app must use exactly one auth client. It is created here instead of
// re-exporting the generated client so Google OAuth can use PKCE consistently
// on web and native deep-link callbacks.
export const supabase = createClient<Database>(backendUrl, backendPublishableKey, {
  global: {
    fetch: createSupabaseFetch(backendPublishableKey),
  },
  auth: {
    storage: safeLocalStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
  },
}) as unknown as SupabaseClient;
