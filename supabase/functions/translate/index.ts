import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "../_shared/cors.ts";
import { validateAuth, unauthorizedResponse, errorResponse, logError, GENERIC_ERRORS } from "../_shared/auth.ts";

// Google Cloud Translation API v2
// Docs: https://cloud.google.com/translate/docs/reference/rest/v2/translate
const GOOGLE_TRANSLATE_ENDPOINT = "https://translation.googleapis.com/language/translate/v2";

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get('origin'));

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const { user, error: authError } = await validateAuth(req);
  if (authError || !user) {
    return unauthorizedResponse(corsHeaders);
  }

  try {
    const body = await req.json();
    const { text, targetLanguage, sourceLanguage = 'tr' } = body;

    // Accept either a single string or an array of strings for batch translation.
    const texts: string[] = Array.isArray(text) ? text : [text];
    if (!texts.length || !targetLanguage || texts.some((t) => typeof t !== 'string')) {
      return new Response(
        JSON.stringify({ error: GENERIC_ERRORS.INVALID_INPUT }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('GOOGLE_TRANSLATE_API_KEY');
    if (!apiKey) {
      logError('translate', 'GOOGLE_TRANSLATE_API_KEY not configured');
      return errorResponse(corsHeaders, 503, GENERIC_ERRORS.NOT_CONFIGURED);
    }

    // Google Translate expects zh-CN as "zh-CN" or "zh"; passthrough is fine.
    const params = new URLSearchParams();
    params.append('key', apiKey);
    params.append('source', sourceLanguage);
    params.append('target', targetLanguage);
    params.append('format', 'text');
    for (const t of texts) params.append('q', t);

    const response = await fetch(GOOGLE_TRANSLATE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (!response.ok) {
      const errText = await response.text();
      logError('translate', `Google Translate ${response.status}: ${errText.slice(0, 200)}`);
      if (response.status === 429) {
        return errorResponse(corsHeaders, 429, GENERIC_ERRORS.RATE_LIMIT);
      }
      if (response.status === 403) {
        return errorResponse(corsHeaders, 403, 'Translate API erişimi reddedildi. API anahtarı veya kotayı kontrol edin.');
      }
      return errorResponse(corsHeaders, 500, GENERIC_ERRORS.SERVICE_ERROR);
    }

    const data = await response.json();
    const translations: string[] = (data?.data?.translations ?? []).map(
      (t: { translatedText: string }) => t.translatedText ?? ''
    );

    // Return same shape as input: string in -> string out; array in -> array out.
    if (Array.isArray(text)) {
      return new Response(
        JSON.stringify({ translations }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    return new Response(
      JSON.stringify({ translatedText: translations[0] ?? text }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    logError('translate', error);
    return errorResponse(corsHeaders);
  }
});
