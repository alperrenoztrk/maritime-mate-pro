import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "../_shared/cors.ts";

/**
 * Retired full-article reader.
 *
 * This function used to download third-party news pages (directly or through
 * r.jina.ai) and return their full text, which the app then showed and
 * translated. Republishing a publisher's article inside the app is a copyright
 * risk (FSEK), so the news reader now shows only the feed's own headline,
 * summary and image and links to the publisher for the full story
 * (src/components/news/NewsReaderDialog.tsx).
 *
 * The endpoint stays deployed but answers 410 Gone, so older app builds fall
 * back to the summary they already show on error and nothing proxies article
 * text any more.
 */
serve((req: Request) => {
  const corsHeaders = getCorsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  return new Response(
    JSON.stringify({
      error: "Full articles are no longer shown in the app. Open the article on the publisher's website.",
    }),
    { status: 410, headers: { ...corsHeaders, "content-type": "application/json" } },
  );
});
