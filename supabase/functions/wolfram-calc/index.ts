import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "../_shared/cors.ts";
import { validateAuth, unauthorizedResponse, errorResponse, logError, GENERIC_ERRORS } from "../_shared/auth.ts";

interface WolframPod {
  id?: string;
  title?: string;
  primary?: boolean;
  subpods?: Array<{ plaintext?: string }>;
}

interface WolframResponse {
  queryresult?: { pods?: WolframPod[] };
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get('origin'));

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Validate authentication
  const { user, error: authError } = await validateAuth(req);
  if (authError || !user) {
    return unauthorizedResponse(corsHeaders);
  }

  try {
    const { query } = await req.json();
    
    if (!query || typeof query !== "string") {
      return new Response(
        JSON.stringify({ error: GENERIC_ERRORS.INVALID_INPUT }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("WOLFRAM_API_KEY");
    if (!apiKey) {
      logError('wolfram-calc', 'API key not configured');
      return errorResponse(corsHeaders, 503, GENERIC_ERRORS.NOT_CONFIGURED);
    }

    const response = await fetch(
      `https://api.wolframalpha.com/v2/query?appid=${apiKey}&input=${encodeURIComponent(query)}&format=plaintext&output=json`
    );

    if (!response.ok) {
      logError('wolfram-calc', `Wolfram API returned ${response.status}`);
      return errorResponse(corsHeaders, 500, GENERIC_ERRORS.SERVICE_ERROR);
    }

    const data = await response.json() as WolframResponse;

    if (data.queryresult && data.queryresult.pods) {
      const resultPod = data.queryresult.pods.find(
        (pod) => pod.id === "Result" || pod.title === "Result" || pod.primary
      );

      if (resultPod && resultPod.subpods && resultPod.subpods[0]) {
        const result = resultPod.subpods[0].plaintext;
        return new Response(JSON.stringify({ result }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    return new Response(
      JSON.stringify({ error: "Hesaplama sonucu bulunamadı" }),
      { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    logError('wolfram-calc', error);
    return errorResponse(corsHeaders);
  }
});
