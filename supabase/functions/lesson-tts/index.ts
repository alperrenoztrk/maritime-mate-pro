import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "../_shared/cors.ts";
import {
  validateAuth,
  unauthorizedResponse,
  errorResponse,
  logError,
  GENERIC_ERRORS,
} from "../_shared/auth.ts";

/**
 * Ders slaytları için bulut seslendirme (yedek yol).
 *
 * İstemci ÖNCE cihazın kendi TTS'ini (Web Speech API) dener; bu fonksiyon
 * yalnızca cihazda o dil için ses bulunmadığında çağrılır. Google Cloud
 * Text-to-Speech kullanılır ve her dil için ERKEK ses seçilir.
 *
 * `translate` fonksiyonu ile aynı GOOGLE_TRANSLATE_API_KEY secret'ı kullanılır
 * (aynı Google Cloud projesi); ayrı bir anahtar isteniyorsa
 * GOOGLE_TTS_API_KEY tanımlanması yeterlidir.
 */

const MAX_TEXT_LENGTH = 2000;

/** Dil → Google Cloud TTS erkek sesi. Listede olmayan diller için jenerik yol kullanılır. */
const MALE_VOICES: Record<string, { name: string; languageCode: string }> = {
  tr: { name: "tr-TR-Wavenet-B", languageCode: "tr-TR" },
  en: { name: "en-US-Neural2-D", languageCode: "en-US" },
  de: { name: "de-DE-Neural2-B", languageCode: "de-DE" },
  fr: { name: "fr-FR-Neural2-B", languageCode: "fr-FR" },
  es: { name: "es-ES-Neural2-B", languageCode: "es-ES" },
  it: { name: "it-IT-Neural2-C", languageCode: "it-IT" },
  pt: { name: "pt-PT-Wavenet-B", languageCode: "pt-PT" },
  nl: { name: "nl-NL-Wavenet-B", languageCode: "nl-NL" },
  pl: { name: "pl-PL-Wavenet-B", languageCode: "pl-PL" },
  ru: { name: "ru-RU-Wavenet-B", languageCode: "ru-RU" },
  ja: { name: "ja-JP-Neural2-C", languageCode: "ja-JP" },
  ko: { name: "ko-KR-Neural2-C", languageCode: "ko-KR" },
  zh: { name: "cmn-CN-Wavenet-B", languageCode: "cmn-CN" },
  ar: { name: "ar-XA-Wavenet-B", languageCode: "ar-XA" },
  hi: { name: "hi-IN-Neural2-B", languageCode: "hi-IN" },
  sv: { name: "sv-SE-Wavenet-C", languageCode: "sv-SE" },
  da: { name: "da-DK-Wavenet-C", languageCode: "da-DK" },
  no: { name: "nb-NO-Wavenet-B", languageCode: "nb-NO" },
  fi: { name: "fi-FI-Wavenet-A", languageCode: "fi-FI" },
  cs: { name: "cs-CZ-Wavenet-A", languageCode: "cs-CZ" },
  hu: { name: "hu-HU-Wavenet-A", languageCode: "hu-HU" },
  ro: { name: "ro-RO-Wavenet-A", languageCode: "ro-RO" },
  el: { name: "el-GR-Wavenet-A", languageCode: "el-GR" },
  uk: { name: "uk-UA-Wavenet-A", languageCode: "uk-UA" },
  id: { name: "id-ID-Wavenet-B", languageCode: "id-ID" },
};

const resolveVoice = (lang: string) => {
  const normalized = (lang || "tr").toLowerCase();
  const base = normalized.split(/[-_]/)[0];
  const mapped = MALE_VOICES[base];
  if (mapped) return { ...mapped, useName: true };
  // Bilinmeyen dil: ses adı vermeden yalnızca dil kodu + MALE cinsiyeti isteriz.
  return {
    name: "",
    languageCode: normalized.includes("-") ? lang : `${base}-${base.toUpperCase()}`,
    useName: false,
  };
};

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get("origin"));

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const { user } = await validateAuth(req);
  if (!user) {
    return unauthorizedResponse(corsHeaders);
  }

  try {
    const body = await req.json();
    const { text, lang } = body as { text?: unknown; lang?: unknown };

    if (
      typeof text !== "string" ||
      text.trim().length === 0 ||
      text.length > MAX_TEXT_LENGTH ||
      (lang !== undefined && typeof lang !== "string")
    ) {
      return new Response(
        JSON.stringify({ error: GENERIC_ERRORS.INVALID_INPUT }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const apiKey = Deno.env.get("GOOGLE_TTS_API_KEY") ?? Deno.env.get("GOOGLE_TRANSLATE_API_KEY");
    if (!apiKey) {
      logError("lesson-tts", "GOOGLE_TTS_API_KEY/GOOGLE_TRANSLATE_API_KEY not configured");
      return errorResponse(corsHeaders, 503, GENERIC_ERRORS.NOT_CONFIGURED);
    }

    const voice = resolveVoice(typeof lang === "string" ? lang : "tr");

    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode: voice.languageCode,
            ...(voice.useName ? { name: voice.name } : {}),
            ssmlGender: "MALE",
          },
          audioConfig: { audioEncoding: "MP3", speakingRate: 1.0, pitch: -1.0 },
        }),
      },
    );

    if (!response.ok) {
      logError("lesson-tts", `Google TTS ${response.status}: ${await response.text()}`);
      return errorResponse(corsHeaders, 502, GENERIC_ERRORS.SERVICE_ERROR);
    }

    const data = await response.json();
    if (typeof data?.audioContent !== "string") {
      logError("lesson-tts", "Google TTS response missing audioContent");
      return errorResponse(corsHeaders, 502, GENERIC_ERRORS.SERVICE_ERROR);
    }

    return new Response(
      JSON.stringify({ audio: data.audioContent, mimeType: "audio/mpeg" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    logError("lesson-tts", error);
    return errorResponse(corsHeaders, 500);
  }
});
