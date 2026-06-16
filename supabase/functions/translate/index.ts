import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "../_shared/cors.ts";
import { validateAuth, unauthorizedResponse, errorResponse, logError, GENERIC_ERRORS } from "../_shared/auth.ts";

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get('origin'));

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Validate authentication
  const { user, error: authError } = await validateAuth(req);
  if (authError || !user) {
    return unauthorizedResponse(corsHeaders);
  }

  try {
    const { text, targetLanguage, sourceLanguage = 'tr' } = await req.json();

    if (!text || !targetLanguage) {
      return new Response(
        JSON.stringify({ error: GENERIC_ERRORS.INVALID_INPUT }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      logError('translate', 'API key not configured');
      return errorResponse(corsHeaders, 503, GENERIC_ERRORS.NOT_CONFIGURED);
    }

    const languageNames: Record<string, string> = {
      'en': 'English', 'tr': 'Turkish', 'es': 'Spanish', 'de': 'German',
      'fr': 'French', 'it': 'Italian', 'pt': 'Portuguese', 'ru': 'Russian',
      'ja': 'Japanese', 'ko': 'Korean', 'zh-CN': 'Chinese (Simplified)',
      'ar': 'Arabic', 'hi': 'Hindi', 'nl': 'Dutch', 'sv': 'Swedish',
      'no': 'Norwegian', 'da': 'Danish', 'fi': 'Finnish', 'pl': 'Polish',
      'cs': 'Czech', 'hu': 'Hungarian', 'ro': 'Romanian', 'el': 'Greek',
      'bg': 'Bulgarian', 'uk': 'Ukrainian'
    };

    const sourceLangName = languageNames[sourceLanguage] || sourceLanguage;
    const targetLangName = languageNames[targetLanguage] || targetLanguage;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a professional maritime translator specialised in nautical, navigation, ship stability and marine engineering terminology. Translate the given text from ${sourceLangName} to ${targetLangName}. Only return the translated text, nothing else. Preserve formatting, punctuation, and special characters.\n\nAlways use the standard, professional maritime terminology of the target language — never a literal or generic word. For example, Turkish "Sancak Tarafı" must become the nautical term for "Starboard side" (not "banner/flag"), "İskele Tarafı" the term for "Port side" (not "pier"), "Kıç" the term for "Stern", "Pruva" for "Bow", "Vardiya" for "Watch", "Su Çekimi" for "Draft", "Çapa/Demir" for "Anchor", "Dümen" for "Rudder", "Pervane" for "Propeller", "Köprüüstü" for "Bridge", "Sintine" for "Bilge", "Fribord" for "Freeboard". Apply the equivalent established maritime term in the target language for all such concepts.`
          },
          { role: 'user', content: text }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      logError('translate', `AI Gateway returned ${response.status}`);
      
      if (response.status === 429) {
        return errorResponse(corsHeaders, 429, GENERIC_ERRORS.RATE_LIMIT);
      }
      if (response.status === 402) {
        return errorResponse(corsHeaders, 402, 'Kredi limitiniz doldu.');
      }

      return errorResponse(corsHeaders, 500, GENERIC_ERRORS.SERVICE_ERROR);
    }

    const data = await response.json();
    const translatedText = data.choices?.[0]?.message?.content?.trim() || text;

    return new Response(
      JSON.stringify({ translatedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    logError('translate', error);
    return errorResponse(corsHeaders);
  }
});
