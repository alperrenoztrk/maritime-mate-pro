import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "../_shared/cors.ts";
import { validateAuth, unauthorizedResponse, errorResponse, logError, GENERIC_ERRORS } from "../_shared/auth.ts";
import {
  createServiceClient,
  consumeAiQuota,
  getAiQuotaStatus,
  quotaExceededResponse,
} from "../_shared/entitlements.ts";

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get('origin'));

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

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

    // Kimlik doğrulama zorunlu: AI kredisi herkese açık olmamalı.
    const { user } = await validateAuth(req);
    if (!user) {
      return unauthorizedResponse(corsHeaders);
    }
    const service = createServiceClient();

    // Arayüz kota göstermek istediğinde: kota düşmeden mevcut durumu döndür.
    if (body.quotaOnly === true) {
      const quota = await getAiQuotaStatus(service, user.id);
      return new Response(
        JSON.stringify({ quota }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Girdi doğrulama: rol beyaz listesi + mesaj sayısı ve boyut sınırları.
    // Kota kullanıcı başına sayıldığı için tek istekte devasa içerik göndererek
    // maliyeti şişirmek de engellenmeli.
    const MAX_MESSAGES = 40;
    const MAX_CONTENT_LENGTH = 16_000;
    const ALLOWED_ROLES = new Set(["system", "user", "assistant"]);
    const { messages } = body;
    const messagesValid = Array.isArray(messages) &&
      messages.length > 0 &&
      messages.length <= MAX_MESSAGES &&
      messages.every((m: unknown) => {
        if (!m || typeof m !== "object") return false;
        const msg = m as Record<string, unknown>;
        return typeof msg.role === "string" && ALLOWED_ROLES.has(msg.role) &&
          typeof msg.content === "string" && msg.content.length <= MAX_CONTENT_LENGTH;
      });
    if (!messagesValid) {
      return new Response(
        JSON.stringify({ error: GENERIC_ERRORS.INVALID_INPUT }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Aylık pakete göre kota düş.
    const quota = await consumeAiQuota(service, user.id);
    if (!quota.allowed) {
      return quotaExceededResponse(corsHeaders, quota);
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

    return new Response(JSON.stringify({
      text,
      quota: { tier: quota.tier, used: quota.used, limit: quota.limit, remaining: quota.remaining },
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    logError('gemini-chat', error);
    return errorResponse(corsHeaders);
  }
});
