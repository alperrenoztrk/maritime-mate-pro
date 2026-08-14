import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "../_shared/cors.ts";
import { validateAuth, unauthorizedResponse, errorResponse, logError, GENERIC_ERRORS } from "../_shared/auth.ts";
import {
  getMaritimeTranslationOverride,
  applyMaritimeCorrections,
} from "../_shared/maritimeGlossary.ts";
import {
  maskTechnicalTokens,
  unmaskTechnicalTokens,
  fixCalculationNoun,
  isTechnicalString,
} from "../_shared/technicalText.ts";
import {
  isAbbreviationOnly,
  maskProtectedTokens,
  renderAbbreviationOnly,
  unmaskProtectedTokens,
} from "../_shared/protectedTerms.ts";
import { repairEnglishMaritimeTerminology } from "../_shared/englishMaritimeTerminology.ts";

// Google Cloud Translation API v2
// Docs: https://cloud.google.com/translate/docs/reference/rest/v2/translate
const GOOGLE_TRANSLATE_ENDPOINT = "https://translation.googleapis.com/language/translate/v2";

// Google Translate is a GENERIC engine: without help it mistranslates maritime
// Turkish ("Viya" → licking, "Funda" → heather, "Sancak" → banner) and
// "corrects" abbreviations it does not know ("DP" → "XP"). Every text therefore
// goes through the same pipeline the app's other translation paths use:
//   1) exact whole-string glossary override → answered locally, no API call;
//   2) the Turkish SOURCE is scanned for protected abbreviations and curated
//      glossary terms, which are replaced by sentinels the engine leaves alone;
//      unmasking then forces the curated term into the output — whatever Google
//      produced. A sentinel that does not survive sends the string back through
//      unprotected instead of leaking the sentinel to the client;
//   3) applyMaritimeCorrections sweeps the final text for leftover Turkish
//      terms and known-bad renderings.
// Glossary steps only apply when translating FROM Turkish (the glossary's
// source language).

interface TranslationJob {
  /** Index into the original texts array. */
  index: number;
  /** Query actually sent to Google (masked HTML or plain text). */
  q: string;
  /** Curated abbreviations and glossary terms to substitute back, per sentinel. */
  termSlots: string[] | null;
  /** Math function names to substitute back, one per sentinel. */
  mathSlots: string[] | null;
}

async function googleTranslate(
  apiKey: string,
  jobs: TranslationJob[],
  sourceLanguage: string,
  targetLanguage: string,
  format: 'text' | 'html',
): Promise<string[] | Response> {
  const params = new URLSearchParams();
  params.append('key', apiKey);
  params.append('source', sourceLanguage);
  params.append('target', targetLanguage);
  params.append('format', format);
  for (const job of jobs) params.append('q', job.q);

  const response = await fetch(GOOGLE_TRANSLATE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!response.ok) {
    const errText = await response.text();
    logError('translate', `Google Translate ${response.status}: ${errText.slice(0, 200)}`);
    return response;
  }

  const data = await response.json();
  return (data?.data?.translations ?? []).map(
    (t: { translatedText: string }) => t.translatedText ?? ''
  );
}

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

    const glossaryActive = sourceLanguage === 'tr' && targetLanguage !== 'tr';
    const results: string[] = new Array(texts.length);
    const plainJobs: TranslationJob[] = [];

    for (let i = 0; i < texts.length; i++) {
      const source = texts[i];
      // Pure formulas and bare abbreviations ("SOLAS V") are language
      // independent — return them untouched.
      if (isTechnicalString(source)) { results[i] = source; continue; }
      if (isAbbreviationOnly(source)) {
        results[i] = renderAbbreviationOnly(source, targetLanguage);
        continue;
      }
      if (glossaryActive) {
        const override = getMaritimeTranslationOverride(source, targetLanguage);
        if (override) { results[i] = override; continue; }
      }
      // Abbreviations and curated glossary terms both go behind sentinels. This
      // replaces the earlier <span translate="no"> masking: the sentinels work
      // on plain text, so they hold on every engine this app talks to rather
      // than only on the ones that honour the HTML attribute.
      const termMask = glossaryActive ? maskProtectedTokens(source, targetLanguage) : null;
      const working = termMask?.masked ?? source;
      // Protect math function names inside mixed prose.
      const mathMask = maskTechnicalTokens(working);
      plainJobs.push({
        index: i,
        q: mathMask?.masked ?? working,
        termSlots: termMask?.slots ?? null,
        mathSlots: mathMask?.slots ?? null,
      });
    }

    {
      const jobs = plainJobs;
      const translated = jobs.length
        ? await googleTranslate(apiKey, jobs, sourceLanguage, targetLanguage, 'text')
        : [];
      if (translated instanceof Response) {
        if (translated.status === 429) {
          return errorResponse(corsHeaders, 429, GENERIC_ERRORS.RATE_LIMIT);
        }
        if (translated.status === 403) {
          return errorResponse(corsHeaders, 403, 'Translate API erişimi reddedildi. API anahtarı veya kotayı kontrol edin.');
        }
        return errorResponse(corsHeaders, 500, GENERIC_ERRORS.SERVICE_ERROR);
      }
      // Jobs whose abbreviation sentinels did not survive; retried below without
      // protection rather than leaking "TKN0" to the client.
      const unresolved: TranslationJob[] = [];
      jobs.forEach((job, j) => {
        const raw = translated[j];
        if (raw === undefined || raw === '') {
          // Missing segment: fall back to the source string rather than ''.
          results[job.index] = texts[job.index];
          return;
        }
        const originalSource = texts[job.index];
        let out = raw;
        if (job.mathSlots) out = unmaskTechnicalTokens(out, job.mathSlots);
        if (job.termSlots) {
          const restored = unmaskProtectedTokens(out, job.termSlots);
          if (restored === null) { unresolved.push(job); return; }
          out = restored;
        }
        if (glossaryActive) out = applyMaritimeCorrections(out, targetLanguage);
        out = fixCalculationNoun(originalSource, out, targetLanguage);
        if (targetLanguage === 'en') out = repairEnglishMaritimeTerminology(originalSource, out);
        results[job.index] = out;
      });

      if (unresolved.length > 0) {
        const retryJobs: TranslationJob[] = unresolved.map((job) => ({
          index: job.index,
          q: texts[job.index],
          termSlots: null,
          mathSlots: null,
        }));
        const retried = await googleTranslate(apiKey, retryJobs, sourceLanguage, targetLanguage, 'text');
        retryJobs.forEach((job, j) => {
          const raw = retried instanceof Response ? '' : retried[j];
          const originalSource = texts[job.index];
          if (!raw) { results[job.index] = originalSource; return; }
          let out = glossaryActive ? applyMaritimeCorrections(raw, targetLanguage) : raw;
          out = fixCalculationNoun(originalSource, out, targetLanguage);
          if (targetLanguage === 'en') out = repairEnglishMaritimeTerminology(originalSource, out);
          results[job.index] = out;
        });
      }
    }

    // Return same shape as input: string in -> string out; array in -> array out.
    if (Array.isArray(text)) {
      return new Response(
        JSON.stringify({ translations: results }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    return new Response(
      JSON.stringify({ translatedText: results[0] ?? text }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    logError('translate', error);
    return errorResponse(corsHeaders);
  }
});
