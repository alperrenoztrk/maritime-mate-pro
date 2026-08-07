import { getCorsHeaders } from "../_shared/cors.ts";
import { validateAuth, unauthorizedResponse } from "../_shared/auth.ts";
import { checkDurableRateLimit, rateLimitResponse } from "../_shared/rateLimit.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const SYSTEM_PROMPT = `Sen Mariner's Book uygulaması için konu anlatımı yazım asistanısın.

Kurallar:
- Türkçe, resmi ve kısa anlatım yaz.
- 2-4 cümle, sadece metin.
- Görsel, bağlantı, tablo veya madde listesi ekleme.
- Yapay zeka ifadesi veya kişisel üslup kullanma.
- Denizcilik eğitimine uygun, doğrulanabilir ve teknik doğruluk öncelikli olmalı.`;

interface ContentTarget {
  key: string;
  topicTitle: string;
  sectionTitle: string;
}

interface ContentResult {
  key: string;
  content?: string;
  success: boolean;
  error?: string;
}

async function generateContent(target: ContentTarget): Promise<ContentResult> {
  if (!GEMINI_API_KEY) {
    return { key: target.key, success: false, error: "API key not configured" };
  }

  const userPrompt = [
    `Konu: ${target.topicTitle}`,
    `Alt başlık: ${target.sectionTitle}`,
    "İstenen: Alt başlık için kısa konu anlatımı yaz.",
  ].join("\n");

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: SYSTEM_PROMPT + "\n\n" + userPrompt }] }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[batch-content-writer] Gemini API error for ${target.key}:`, errorText);
      return { key: target.key, success: false, error: "AI API error" };
    }

    const data = await response.json();
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!content) {
      return { key: target.key, success: false, error: "Empty response from AI" };
    }

    return { key: target.key, content, success: true };
  } catch (error) {
    console.error(`[batch-content-writer] Exception for ${target.key}:`, error);
    return { key: target.key, success: false, error: "Generation failed" };
  }
}

const MAX_FIELD_LENGTH = 300;

function isValidTarget(value: unknown): value is ContentTarget {
  if (!value || typeof value !== "object") return false;
  const t = value as Record<string, unknown>;
  return (
    typeof t.key === "string" && t.key.length > 0 && t.key.length <= MAX_FIELD_LENGTH &&
    typeof t.topicTitle === "string" && t.topicTitle.length > 0 && t.topicTitle.length <= MAX_FIELD_LENGTH &&
    typeof t.sectionTitle === "string" && t.sectionTitle.length > 0 && t.sectionTitle.length <= MAX_FIELD_LENGTH
  );
}

Deno.serve(async (req) => {
  const headers = { ...getCorsHeaders(req.headers.get("origin")), "Content-Type": "application/json" };

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  // Require authenticated user session
  const { user, error: authError } = await validateAuth(req);
  if (authError || !user) {
    return unauthorizedResponse(headers);
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers }
    );
  }

  // Her batch en fazla 10 Gemini çağrısı üretir; kullanıcı başına dakikada
  // birkaç batch'ten fazlası içerik yazımı için meşru bir kullanım değildir.
  const rl = await checkDurableRateLimit(`batch-content-writer:${user.id}`, 3, 60_000);
  if (!rl.allowed) {
    return rateLimitResponse(headers, rl.retryAfterSec);
  }

  try {
    const body = await req.json();
    const rawTargets: unknown = body.targets || [];
    if (!Array.isArray(rawTargets) || rawTargets.length === 0) {
      return new Response(
        JSON.stringify({ error: "No targets provided" }),
        { status: 400, headers }
      );
    }
    if (!rawTargets.every(isValidTarget)) {
      return new Response(
        JSON.stringify({ error: "Invalid target format" }),
        { status: 400, headers }
      );
    }
    const targets: ContentTarget[] = rawTargets;
    const batchSize = Math.min(targets.length, 10); // Max 10 at a time

    console.log(`[batch-content-writer] Processing ${batchSize} targets`);

    // Process targets sequentially to avoid rate limits
    const results: ContentResult[] = [];
    for (let i = 0; i < batchSize; i++) {
      const result = await generateContent(targets[i]);
      results.push(result);
      
      // Small delay between requests to avoid rate limits
      if (i < batchSize - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    const successCount = results.filter(r => r.success).length;
    console.log(`[batch-content-writer] Completed: ${successCount}/${batchSize} successful`);

    return new Response(
      JSON.stringify({
        results,
        summary: {
          total: batchSize,
          success: successCount,
          failed: batchSize - successCount,
        }
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("[batch-content-writer] Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers }
    );
  }
});
