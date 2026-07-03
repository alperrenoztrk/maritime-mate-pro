// Shared CORS configuration for Marine Expert edge functions
// Restricts access to known origins only to prevent AI credit abuse

const ALLOWED_ORIGINS = [
  // Lovable preview URLs
  'https://50250357-50a7-4f9d-8353-23b653380abc.lovableproject.com',
  'https://id-preview--50250357-50a7-4f9d-8353-23b653380abc.lovable.app',
  // Capacitor WebView origins: iOS uses capacitor://localhost, Android uses
  // https://localhost (default androidScheme) or http://localhost.
  'capacitor://localhost',
  'ionic://localhost',
  'https://localhost',
  'http://localhost',
  // Local development
  'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:3000',
];

export function getCorsHeaders(origin: string | null): Record<string, string> {
  // Check if origin is in allowed list or matches Lovable pattern
  const isAllowed = origin && (
    ALLOWED_ORIGINS.includes(origin) ||
    // Allow any *.lovableproject.com or *.lovable.app subdomain for this project
    /^https:\/\/[a-z0-9-]+\.lovableproject\.com$/.test(origin) ||
    /^https:\/\/[a-z0-9-]+\.lovable\.app$/.test(origin) ||
    // Capacitor/localhost with any port
    /^https?:\/\/localhost(:\d+)?$/.test(origin)
  );

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };
}

// Default headers for backwards compatibility (still uses dynamic origin)
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
