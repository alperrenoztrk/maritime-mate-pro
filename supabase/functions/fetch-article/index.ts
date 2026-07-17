import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "../_shared/cors.ts";
import { validateAuth, unauthorizedResponse } from "../_shared/auth.ts";
import { assertSafeUrl } from "../_shared/ssrf.ts";

/**
 * Extract readable article content from HTML.
 * Uses heuristics to find the main content block.
 */
function extractArticleContent(html: string, url: string): {
  title: string;
  content: string;
  author?: string;
  publishedAt?: string;
} {
  // Try to extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const ogTitleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i);
  const title = ogTitleMatch?.[1] || titleMatch?.[1]?.trim() || "";

  // Try to extract author
  const authorMatch =
    html.match(/<meta[^>]*name="author"[^>]*content="([^"]+)"/i) ||
    html.match(/<meta[^>]*property="article:author"[^>]*content="([^"]+)"/i);
  const author = authorMatch?.[1];

  // Try to extract publish date
  const dateMatch =
    html.match(/<meta[^>]*property="article:published_time"[^>]*content="([^"]+)"/i) ||
    html.match(/<time[^>]*datetime="([^"]+)"/i);
  const publishedAt = dateMatch?.[1];

  // Remove scripts, styles, nav, footer, header, aside, comments
  let cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<aside[\s\S]*?<\/aside>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<form[\s\S]*?<\/form>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "");

  // Try to find article content using common selectors
  const articlePatterns = [
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /<div[^>]*class="[^"]*(?:article-body|article-content|post-content|entry-content|story-body|article__body|content-body|field--name-body)[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class="[^"]*(?:post-text|article-text|story-text|body-text)[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<main[^>]*>([\s\S]*?)<\/main>/i,
    /<div[^>]*id="[^"]*(?:content|article|post|story|main)[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*role="main"[^>]*>([\s\S]*?)<\/div>/i,
  ];

  let articleHtml = "";
  for (const pattern of articlePatterns) {
    const match = cleaned.match(pattern);
    if (match?.[1] && match[1].length > 200) {
      articleHtml = match[1];
      break;
    }
  }

  // Fallback: find the largest text block
  if (!articleHtml) {
    const paragraphs = cleaned.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
    if (paragraphs.length > 0) {
      articleHtml = paragraphs.join("\n");
    }
  }

  if (!articleHtml) {
    articleHtml = cleaned;
  }

  // Convert HTML to clean readable text with preserved structure
  const content = htmlToReadableText(articleHtml);

  return { title, content, author, publishedAt };
}

/**
 * Convert HTML to clean readable text preserving paragraphs and headings
 */
function htmlToReadableText(html: string): string {
  let text = html
    // Preserve headings with markdown-like markers
    .replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, "\n\n## $1\n\n")
    // Preserve paragraphs
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<p[^>]*>/gi, "")
    // Preserve line breaks
    .replace(/<br\s*\/?>/gi, "\n")
    // Preserve list items
    .replace(/<li[^>]*>/gi, "\n• ")
    .replace(/<\/li>/gi, "")
    // Preserve blockquotes
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '\n> $1\n')
    // Bold/strong
    .replace(/<(?:b|strong)[^>]*>([\s\S]*?)<\/(?:b|strong)>/gi, "**$1**")
    // Italic/em
    .replace(/<(?:i|em)[^>]*>([\s\S]*?)<\/(?:i|em)>/gi, "_$1_")
    // Strip remaining tags
    .replace(/<[^>]+>/g, "")
    // Decode HTML entities
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)))
    // Clean up whitespace
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Remove very short content (likely nav remnants)
  const lines = text.split("\n").filter((line) => {
    const trimmed = line.trim();
    if (!trimmed) return true; // Keep empty lines for paragraph spacing
    // Filter out very short lines that are likely menu items
    if (trimmed.length < 15 && !trimmed.startsWith("##") && !trimmed.startsWith("•") && !trimmed.startsWith(">")) {
      return false;
    }
    return true;
  });

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

/**
 * Clean Jina Reader markdown: drop images, unwrap links, remove nav-like
 * boilerplate lines, and start from the article headline when we can find it.
 */
function cleanJinaMarkdown(md: string, title: string): string {
  let text = md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^[=*_-]{3,}\s*$/gm, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // If the article headline appears as a markdown heading, cut the preamble
  // (site nav, cookie banners) that Jina includes before it.
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const target = normalize(title).slice(0, 30);
  if (target.length >= 15) {
    const lines = text.split("\n");
    const headingIdx = lines.findIndex(
      (l) => /^#{1,3}\s/.test(l.trim()) && normalize(l).includes(target)
    );
    if (headingIdx > 0) {
      text = lines.slice(headingIdx).join("\n");
    }
  }

  // Filter out very short lines that are likely leftover menu items.
  const lines = text.split("\n").filter((line) => {
    const trimmed = line.trim();
    if (!trimmed) return true;
    if (trimmed.length < 15 && !/^(#|•|>|\d+\.|[-*] )/.test(trimmed)) return false;
    return true;
  });

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

serve(async (req: Request) => {
  const corsHeaders = getCorsHeaders(req.headers.get("origin"));
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Public endpoint: news reader is available to anonymous users.

  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return new Response(
        JSON.stringify({ error: "URL parametresi gerekli." }),
        { status: 400, headers: { ...corsHeaders, "content-type": "application/json" } }
      );
    }

    // Validate URL (SSRF protection: blocks non-http(s), private, loopback, link-local hosts)
    try {
      await assertSafeUrl(url);
    } catch {
      return new Response(
        JSON.stringify({ error: "Geçersiz veya izin verilmeyen URL." }),
        { status: 400, headers: { ...corsHeaders, "content-type": "application/json" } }
      );
    }

    // Fetch the article (with Jina Reader fallback for blocked sources)
    const fetchWithTimeout = async (target: string, ms: number) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), ms);
      try {
        return await fetch(target, {
          signal: controller.signal,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Upgrade-Insecure-Requests": "1",
          },
          redirect: "follow",
        });
      } finally {
        clearTimeout(timeout);
      }
    };

    let response = await fetchWithTimeout(url, 15000);

    // If the source blocks us (403/451/406/429) or fails, try Jina Reader proxy
    if (!response.ok && [401, 403, 406, 429, 451, 503].includes(response.status)) {
      const proxied = `https://r.jina.ai/${url}`;
      const proxyRes = await fetchWithTimeout(proxied, 20000);
      if (proxyRes.ok) {
        const text = await proxyRes.text();
        // Jina returns markdown-like text with "Title:" / "URL Source:" / "Markdown Content:" preamble
        const titleMatch = text.match(/^Title:\s*(.+)$/m);
        const jinaTitle = titleMatch?.[1]?.trim() || "";
        const contentSplit = text.split(/Markdown Content:\s*/);
        const content = cleanJinaMarkdown((contentSplit[1] || text).trim(), jinaTitle);
        return new Response(
          JSON.stringify({
            title: jinaTitle,
            content,
          }),
          { headers: { ...corsHeaders, "content-type": "application/json" } }
        );
      }
    }

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Kaynak yanıt vermedi (${response.status}).` }),
        { status: 502, headers: { ...corsHeaders, "content-type": "application/json" } }
      );
    }

    const html = await response.text();

    if (!html || html.length < 100) {
      return new Response(
        JSON.stringify({ error: "İçerik alınamadı." }),
        { status: 502, headers: { ...corsHeaders, "content-type": "application/json" } }
      );
    }


    const article = extractArticleContent(html, url);

    // Minimum content check
    if (article.content.length < 50) {
      return new Response(
        JSON.stringify({
          ...article,
          warning: "İçerik çok kısa, kaynak site içerik çıkarmayı engelliyor olabilir.",
        }),
        { headers: { ...corsHeaders, "content-type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(article), {
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const isTimeout = err instanceof DOMException && err.name === "AbortError";

    return new Response(
      JSON.stringify({ error: isTimeout ? "Zaman aşımı — kaynak çok yavaş yanıt veriyor." : message }),
      { status: 500, headers: { ...corsHeaders, "content-type": "application/json" } }
    );
  }
});
