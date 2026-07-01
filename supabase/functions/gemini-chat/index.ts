import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "../_shared/cors.ts";
import { errorResponse, logError, GENERIC_ERRORS } from "../_shared/auth.ts";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const LOVABLE_GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
const MAX_TOKENS = 1500;

async function callLovableGateway(
  apiKey: string,
  messages: ChatMessage[],
): Promise<{ text: string } | { errorStatus: number }> {
  const resp = await fetch(LOVABLE_GATEWAY_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages,
      max_tokens: MAX_TOKENS,
    }),
  });

  if (!resp.ok) {
    logError("gemini-chat", `AI Gateway returned ${resp.status}`);
    return { errorStatus: resp.status };
  }

  const data = await resp.json();
  return { text: data.choices?.[0]?.message?.content || "" };
}

async function callGeminiDirect(
  apiKey: string,
  messages: ChatMessage[],
): Promise<{ text: string } | { errorStatus: number }> {
  // Convert OpenAI-style messages to the Gemini REST format:
  // system messages become systemInstruction, assistant becomes "model".
  const systemText = messages
    .filter((m) => m.role === "system")
    .map((m) => m.content)
    .join("\n\n");

  const contents = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  const resp = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...(systemText
        ? { systemInstruction: { parts: [{ text: systemText }] } }
        : {}),
      contents,
      generationConfig: { maxOutputTokens: MAX_TOKENS },
    }),
  });

  if (!resp.ok) {
    logError("gemini-chat", `Gemini API returned ${resp.status}`);
    return { errorStatus: resp.status };
  }

  const data = await resp.json();
  const text =
    data.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text || "")
      .join("") || "";
  return { text };
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get("origin"));

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Public endpoint - no authentication required

  try {
    const body = await req.json();

    const lovableKey = Deno.env.get("LOVABLE_API_KEY");
    const geminiKey = Deno.env.get("GEMINI_API_KEY");

    // Health check request (allow without full auth for monitoring)
    if (body.test === true) {
      return new Response(
        JSON.stringify({
          status: lovableKey || geminiKey ? "configured" : "not_configured",
          providers: {
            lovable: Boolean(lovableKey),
            gemini: Boolean(geminiKey),
          },
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { messages } = body;
    if (!Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: GENERIC_ERRORS.INVALID_INPUT }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!lovableKey && !geminiKey) {
      logError("gemini-chat", "No AI API key configured (LOVABLE_API_KEY or GEMINI_API_KEY)");
      return errorResponse(corsHeaders, 503, GENERIC_ERRORS.NOT_CONFIGURED);
    }

    let lastErrorStatus = 0;

    // 1) Primary: Lovable AI Gateway (workspace credits)
    if (lovableKey) {
      const result = await callLovableGateway(lovableKey, messages);
      if ("text" in result) {
        return new Response(JSON.stringify({ text: result.text }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      lastErrorStatus = result.errorStatus;
    }

    // 2) Fallback: direct Google Gemini API (works when Lovable credits run out)
    if (geminiKey) {
      const result = await callGeminiDirect(geminiKey, messages);
      if ("text" in result) {
        return new Response(JSON.stringify({ text: result.text }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      lastErrorStatus = result.errorStatus;
    }

    if (lastErrorStatus === 429) {
      return errorResponse(corsHeaders, 429, GENERIC_ERRORS.RATE_LIMIT);
    }
    if (lastErrorStatus === 402) {
      return errorResponse(corsHeaders, 402, "Kredi limitiniz doldu.");
    }

    return errorResponse(corsHeaders, 500, GENERIC_ERRORS.SERVICE_ERROR);
  } catch (error) {
    logError("gemini-chat", error);
    return errorResponse(corsHeaders);
  }
});
