import { createClient } from "@supabase/supabase-js";

/**
 * SECURITY: Fallback credentials are only used in development mode.
 * In production, environment variables MUST be configured.
 */
const DEV_FALLBACK_URL = import.meta.env.DEV 
  ? "https://vrpbhguztsqakvjcezeb.supabase.co" 
  : undefined;
const DEV_FALLBACK_KEY = import.meta.env.DEV 
  ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZycGJoZ3V6dHNxYWt2amNlemViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyOTczNzcsImV4cCI6MjA4MTg3MzM3N30._RMAZAKoGsk9xmHAXCvITf8BW4f52WyHYdhJq4IEW4Y" 
  : undefined;

export const backendUrl = (import.meta.env.VITE_SUPABASE_URL || DEV_FALLBACK_URL) as string;
export const backendPublishableKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || DEV_FALLBACK_KEY) as string;

// Fail fast in production if credentials are missing
if (!backendUrl || !backendPublishableKey) {
  throw new Error('VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY must be configured in production');
}

// NOTE: We intentionally use an untyped client here because this project does not ship
// database table types (Database.public.Tables is `never`).
export const supabase = createClient(backendUrl, backendPublishableKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
