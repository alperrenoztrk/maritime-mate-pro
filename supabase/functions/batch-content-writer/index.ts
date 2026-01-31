import { corsHeaders } from "../_shared/cors.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const SYSTEM_PROMPT = `Sen Marine Expert uygulaması için konu anlatımı yazım asistanısın.

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

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const headers = { ...corsHeaders, "Content-Type": "application/json" };
  
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers }
    );
  }

  try {
    const body = await req.json();
    const targets: ContentTarget[] = body.targets || [];
    const batchSize = Math.min(targets.length, 10); // Max 10 at a time

    if (targets.length === 0) {
      return new Response(
        JSON.stringify({ error: "No targets provided" }),
        { status: 400, headers }
      );
    }

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
