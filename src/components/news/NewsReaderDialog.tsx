import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAnonKey, getFunctionUrls, type MaritimeNewsItem } from "@/services/maritimeNews";
import { useLanguage } from "@/contexts/useLanguage";
import { useArticleBackGuard } from "@/hooks/useArticleBackGuard";

function formatDate(iso: string | undefined, locale: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(locale || "en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function stripHtml(text?: string): string {
  if (!text) return "";
  return text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function estimateReadingTime(text: string): string {
  if (!text) return "";
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

/**
 * Gerçek gazetede iç sayfaların numarası vardır. Bağlantıdan türetilen sabit bir
 * sayı kullanılıyor: aynı haber her açılışta aynı sayfada çıkar.
 */
export function innerPageNo(link?: string): number {
  if (!link) return 2;
  let hash = 0;
  for (let i = 0; i < link.length; i++) hash = (hash * 31 + link.charCodeAt(i)) | 0;
  return 2 + (Math.abs(hash) % 10);
}

function normalizeImageUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = url.startsWith("//") ? new URL(`https:${url}`) : new URL(url);
    if (!parsed.protocol.startsWith("http")) return undefined;
    return parsed.toString();
  } catch {
    return undefined;
  }
}

function toProxyImageUrl(url?: string): string | undefined {
  const normalized = normalizeImageUrl(url);
  if (!normalized) return undefined;
  try {
    const parsed = new URL(normalized);
    const sanitized = `${parsed.hostname}${parsed.pathname}${parsed.search}`.replace(/^\/+/, "");
    if (!sanitized) return undefined;
    return `https://images.weserv.nl/?url=${encodeURIComponent(sanitized)}&w=1600&h=900&fit=cover&q=88&we&il&dpr=2`;
  } catch {
    return undefined;
  }
}

async function fetchArticleContent(url: string): Promise<{
  title: string;
  content: string;
  author?: string;
  publishedAt?: string;
  warning?: string;
}> {
  // Env vars can be missing in some preview/webview builds; getAnonKey/getFunctionUrls
  // fall back to the bundled Supabase client config, mirroring the news list fetch.
  const key = getAnonKey();
  const candidateUrls = getFunctionUrls("fetch-article");
  let lastError = "";

  for (const endpoint of candidateUrls) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);
    let res: Response;
    try {
      res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          apikey: key,
          authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      });
    } catch (err) {
      // Network-level failure (offline, DNS, CORS, timeout) — try the next endpoint.
      lastError =
        err instanceof DOMException && err.name === "AbortError"
          ? "Timeout — the server did not respond."
          : err instanceof Error
            ? err.message
            : String(err);
      continue;
    } finally {
      clearTimeout(timeout);
    }

    if (!res.ok) {
      // The server was reached but the article itself is unavailable; retrying
      // another endpoint of the same function won't help.
      const text = await res.text().catch(() => "");
      let errorMsg = `Article could not be retrieved (${res.status})`;
      try {
        const parsed = JSON.parse(text);
        if (parsed.error) errorMsg = parsed.error;
      } catch { /* ignore */ }
      throw new Error(errorMsg);
    }

    return res.json();
  }

  throw new Error(lastError || "The article could not be retrieved.");
}

function ArticleRenderer({ content, title }: { content: string; title?: string }) {
  // Jina Reader markdown: drop images, unwrap links, strip escaped heading marks.
  const cleaned = content
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\\#/g, "#");
  const norm = (t: string) => t.replace(/[^a-z0-9]/gi, "").toLowerCase();
  const titleKey = title ? norm(title) : "";
  const paragraphs = cleaned
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p && !(titleKey && norm(p.replace(/^#{1,6}\s*/, "")) === titleKey));

  return (
    <div className="space-y-4 text-[15px] leading-[1.7] text-foreground/85">
      {paragraphs.map((trimmed, i) => {
        const headingMatch = trimmed.match(/^#{1,6}\s*(.*)$/);
        if (headingMatch) {
          return (
            <h3 key={i} className="pt-2 text-lg font-semibold tracking-tight text-foreground">
              {headingMatch[1]}
            </h3>
          );
        }
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote key={i} className="border-l-2 border-primary pl-4 italic text-foreground/75">
              {trimmed.replace(/^> /, "")}
            </blockquote>
          );
        }
        const bulletRe = /^(?:•|[-*]) +/;
        if (bulletRe.test(trimmed)) {
          const items = trimmed.split("\n").filter((l) => bulletRe.test(l.trim()));
          return (
            <ul key={i} className="list-disc space-y-1 pl-5 marker:text-primary">
              {items.map((item, j) => (
                <li key={j}>{item.trim().replace(bulletRe, "")}</li>
              ))}
            </ul>
          );
        }
        const formatted = trimmed
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
          .replace(/_([^_]+)_/g, "<em>$1</em>");
        return <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />;
      })}
    </div>
  );
}

export interface NewsReaderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: MaritimeNewsItem | null;
}

function HeroImage({ url, alt }: { url?: string; alt: string }) {
  const proxied = toProxyImageUrl(url);
  const direct = normalizeImageUrl(url);
  const [stage, setStage] = useState(0);
  useEffect(() => setStage(0), [url]);
  const src = stage === 0 ? proxied ?? direct : stage === 1 ? direct : undefined;
  if (!src) return null;
  return (
    <figure className="mt-5 overflow-hidden rounded-2xl bg-muted">
      <img
        src={src}
        alt={alt}
        className="aspect-[16/9] w-full object-cover"
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setStage((s) => (s === 0 && proxied && direct && proxied !== direct ? 1 : 2))}
      />
    </figure>
  );
}

export function NewsReaderDialog({ open, onOpenChange, item }: NewsReaderDialogProps) {
  const { currentLanguage } = useLanguage();
  useArticleBackGuard(open);
  const articleQuery = useQuery({
    queryKey: ["article-content", item?.link],
    queryFn: () => fetchArticleContent(item!.link),
    enabled: open && !!item?.link,
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });

  const summary = stripHtml(item?.summary);
  const summaryBlock = summary ? (
    <p className="text-[15px] leading-[1.7] text-foreground/85">{summary}</p>
  ) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[calc(100vw-1.25rem)] max-h-[94svh] overflow-hidden rounded-3xl border border-border/60 bg-card p-0 text-foreground">
        <ScrollArea className="max-h-[94svh]">
          <article className="px-5 pb-8 pt-6 sm:px-8">
            <DialogHeader className="space-y-3 pr-8 text-left">
              {item?.source ? (
                <span className="text-xs font-semibold uppercase tracking-[.14em] text-primary">
                  {item.source}
                </span>
              ) : null}
              <DialogTitle className="text-[clamp(1.4rem,5.8vw,2rem)] font-bold leading-[1.15] tracking-tight">
                {item?.title ?? "News"}
              </DialogTitle>
              <DialogDescription className="sr-only">News detail</DialogDescription>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                {item?.publishedAt ? (
                  <span className="notranslate" translate="no">{formatDate(item.publishedAt, currentLanguage)}</span>
                ) : null}
                {articleQuery.data?.author ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{articleQuery.data.author}</span>
                  </>
                ) : null}
                {articleQuery.data?.content ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{estimateReadingTime(articleQuery.data.content)}</span>
                  </>
                ) : null}
              </div>
            </DialogHeader>

            <HeroImage url={item?.imageUrl} alt={item?.title ?? "News"} />

            <div className="mt-6">
              {articleQuery.isLoading ? (
                <div className="flex flex-col items-center gap-3 py-14 text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="text-sm">Loading article…</span>
                </div>
              ) : articleQuery.isError ? (
                <div className="space-y-4">
                  {summaryBlock}
                  <div className="rounded-xl bg-muted/60 p-3 text-sm text-muted-foreground">
                    {summary ? "The full article could not be loaded; showing the summary." : "The article cannot be loaded right now. Try again later."}
                  </div>
                </div>
              ) : articleQuery.data?.content ? (
                <div className="space-y-4">
                  {articleQuery.data.warning && (
                    <div className="rounded-xl bg-muted/60 p-3 text-sm text-muted-foreground">{articleQuery.data.warning}</div>
                  )}
                  <ArticleRenderer content={articleQuery.data.content} title={item?.title} />
                </div>
              ) : (
                summaryBlock
              )}
            </div>
          </article>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
