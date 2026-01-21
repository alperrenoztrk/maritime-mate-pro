import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "../_shared/cors.ts";
import { logError, GENERIC_ERRORS } from "../_shared/auth.ts";

// Helper function for error responses
function errorResponse(
  corsHeaders: Record<string, string>, 
  status: number = 500, 
  message?: string
): Response {
  return new Response(
    JSON.stringify({ error: message || GENERIC_ERRORS.SERVICE_ERROR }),
    { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get('origin'));

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Public AI chat endpoint - no authentication required

  try {
    const body = await req.json();
    
    // Health check request (allow without full auth for monitoring)
    if (body.test === true) {
      const apiKey = Deno.env.get("LOVABLE_API_KEY");
      return new Response(
        JSON.stringify({ status: apiKey ? "configured" : "not_configured" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { messages } = body;
    if (!Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: GENERIC_ERRORS.INVALID_INPUT }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      logError('gemini-chat', 'API key not configured');
      return errorResponse(corsHeaders, 503, GENERIC_ERRORS.NOT_CONFIGURED);
    }

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        max_tokens: 1500,
      }),
    });

    if (!resp.ok) {
      logError('gemini-chat', `AI Gateway returned ${resp.status}`);
      
      if (resp.status === 429) {
        return errorResponse(corsHeaders, 429, GENERIC_ERRORS.RATE_LIMIT);
      }
      if (resp.status === 402) {
        return errorResponse(corsHeaders, 402, 'Kredi limitiniz doldu.');
      }

      return errorResponse(corsHeaders, 500, GENERIC_ERRORS.SERVICE_ERROR);
    }

    const data = await resp.json();
    const text = data.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    logError('gemini-chat', error);
    return errorResponse(corsHeaders);
  }
});
