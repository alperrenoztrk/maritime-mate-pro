import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "../_shared/cors.ts";
import { logError, GENERIC_ERRORS } from "../_shared/auth.ts";

// Public endpoint — no auth required for translation
// This allows both logged-in and guest users to use translations

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get('origin'));

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { texts, targetLanguage, sourceLanguage = 'tr' } = await req.json();

    // Support both single text and batch texts
    if ((!texts || !Array.isArray(texts) || texts.length === 0) || !targetLanguage) {
      return new Response(
        JSON.stringify({ error: GENERIC_ERRORS.INVALID_INPUT }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If source and target are the same, return as-is
    if (sourceLanguage === targetLanguage) {
      return new Response(
        JSON.stringify({ translations: texts }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      logError('translate', 'API key not configured');
      return new Response(
        JSON.stringify({ error: GENERIC_ERRORS.NOT_CONFIGURED }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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

    // Build batch translation prompt
    const numberedTexts = texts.map((t: string, i: number) => `[${i}] ${t}`).join('\n');

    const systemPrompt = `You are a professional maritime translator specializing in nautical and shipping terminology.

CRITICAL RULES:
1. Translate from ${sourceLangName} to ${targetLangName}.
2. Use the official maritime terminology recognized by IMO for the target language.
3. For nautical terms, use the standard terminology of the target language's maritime tradition:
   - English: starboard, port, bow, stern, draft, freeboard, bulkhead, bollard, fairlead, hawser
   - French: tribord, bâbord, proue, poupe, tirant d'eau, franc-bord, cloison, bollard, chaumard, aussière
   - German: Steuerbord, Backbord, Bug, Heck, Tiefgang, Freibord, Schott, Poller, Klüse, Trosse
   - Spanish: estribor, babor, proa, popa, calado, francobordo, mamparo, bolardo, guía, estacha
   - Italian: tribordo, babordo, prua, poppa, pescaggio, bordo libero, paratia, bitta, passacavo, cavo d'ormeggio
   - Portuguese: estibordo, bombordo, proa, popa, calado, borda-livre, antepara, cabeço, buzina, espía
   - Russian: правый борт, левый борт, нос, корма, осадка, надводный борт, переборка, кнехт, киповая планка, швартовный трос
4. Keep ALL technical abbreviations UNCHANGED: SOLAS, MARPOL, ISM, ISPS, EPIRB, SART, EEBD, SCBA, LSA, FFE, PSC, PMS, VHF, DSC, GMDSS, AIS, ECDIS, COLREG, STCW, MLC, BWT, OWS, IGS, COW, FSC, GM, GZ, KG, KM, KN, TPC, MTC, FWA, DWT, GT, NT, LOA, LBP, GRT, NRT, IMO, ROT, RPM, UMS, ETO, SOPEP, SMPEP, DOC, SMC, ISSC, CSR, IMDG, IMSBC
5. Preserve formatting, punctuation, and special characters exactly.
6. Each input line starts with [N] where N is the index. Return ONLY the translations in the same [N] format.
7. Do NOT add explanations, notes, or any extra text.

OUTPUT FORMAT:
[0] translated text for item 0
[1] translated text for item 1
...`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-lite',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: numberedTexts }
        ],
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      logError('translate', `AI Gateway returned ${response.status}`);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: GENERIC_ERRORS.RATE_LIMIT }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Kredi limitiniz doldu.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: GENERIC_ERRORS.SERVICE_ERROR }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const rawOutput = data.choices?.[0]?.message?.content?.trim() || '';

    // Parse numbered output back into array
    const translations: string[] = [...texts]; // fallback to originals
    const lines = rawOutput.split('\n');
    for (const line of lines) {
      const match = line.match(/^\[(\d+)\]\s*(.+)$/);
      if (match) {
        const idx = parseInt(match[1], 10);
        if (idx >= 0 && idx < texts.length) {
          translations[idx] = match[2].trim();
        }
      }
    }

    return new Response(
      JSON.stringify({ translations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    logError('translate', error);
    return new Response(
      JSON.stringify({ error: GENERIC_ERRORS.SERVICE_ERROR }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
