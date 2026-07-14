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
import { Button } from "@/components/ui/button";
import { getAnonKey, getFunctionUrls, type MaritimeNewsItem } from "@/services/maritimeNews";
import { useLanguage } from "@/contexts/LanguageContext";

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
  return `${minutes} dk okuma`;
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
          ? "Zaman aşımı — sunucu yanıt vermedi."
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
      let errorMsg = `Makale alınamadı (${res.status})`;
      try {
        const parsed = JSON.parse(text);
        if (parsed.error) errorMsg = parsed.error;
      } catch { /* ignore */ }
      throw new Error(errorMsg);
    }

    return res.json();
  }

  throw new Error(lastError || "Makale alınamadı.");
}

function ArticleRenderer({ content }: { content: string }) {
  // The content may come from the Jina Reader fallback as raw markdown:
  // drop images and unwrap [text](url) links before rendering.
  const cleaned = content
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
  const paragraphs = cleaned.split("\n\n").filter((p) => p.trim());
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-white/90">
      {paragraphs.map((para, i) => {
        const trimmed = para.trim();
        const headingMatch = trimmed.match(/^#{1,6} +(.*)$/);
        if (headingMatch) {
          return (
            <h3 key={i} className="mt-6 mb-2 text-lg font-bold text-white">
              {headingMatch[1]}
            </h3>
          );
        }
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote key={i} className="border-l-2 border-blue-400/40 pl-4 italic text-white/75">
              {trimmed.replace(/^> /, "")}
            </blockquote>
          );
        }
        const bulletRe = /^(?:•|[-*]) +/;
        if (bulletRe.test(trimmed)) {
          const items = trimmed.split("\n").filter((l) => bulletRe.test(l.trim()));
          return (
            <ul key={i} className="list-inside list-disc space-y-1 text-white/85">
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
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
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

export function NewsReaderDialog({ open, onOpenChange, item }: NewsReaderDialogProps) {
  const { currentLanguage } = useLanguage();
  const articleQuery = useQuery({
    queryKey: ["article-content", item?.link],
    queryFn: () => fetchArticleContent(item!.link),
    enabled: open && !!item?.link,
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });

  const summary = stripHtml(item?.summary);
  const heroImage = toProxyImageUrl(item?.imageUrl) ?? normalizeImageUrl(item?.imageUrl);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[95svh] border-white/10 bg-slate-950 text-white p-0 overflow-hidden">
        <ScrollArea className="max-h-[95svh]">
          <div className="relative h-56 sm:h-72 w-full bg-slate-900">
            {heroImage ? (
              <img
                src={heroImage}
                alt={item?.title ?? "Haber"}
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-white/40">
                Görsel bulunamadı
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          </div>

          <div className="relative -mt-16 px-5 pb-8">
            <DialogHeader className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                {item?.source ? <span className="font-medium text-sky-300">{item.source}</span> : null}
                {item?.publishedAt ? (
                  <>
                    <span>·</span>
                    <span>{formatDate(item.publishedAt, currentLanguage)}</span>
                  </>
                ) : null}
                {articleQuery.data?.author && (
                  <>
                    <span>·</span>
                    <span className="text-white/60">{articleQuery.data.author}</span>
                  </>
                )}
                {articleQuery.data?.content && (
                  <>
                    <span>·</span>
                    <span>{estimateReadingTime(articleQuery.data.content)}</span>
                  </>
                )}
              </div>
              <DialogTitle className="text-xl leading-snug text-white">
                {item?.title ?? "Haber"}
              </DialogTitle>
              <DialogDescription className="sr-only">Haber detayı</DialogDescription>
            </DialogHeader>

            <div className="mt-5">
              {articleQuery.isLoading ? (
                <div className="flex flex-col items-center gap-3 py-14 text-white/60">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="text-sm">Makale yükleniyor...</span>
                </div>
              ) : articleQuery.isError ? (
                summary ? (
                  <div className="space-y-3">
                    <p className="text-[15px] leading-relaxed text-white/90">{summary}</p>
                    <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs text-amber-200/80">
                      <p>Tam metin yüklenemedi, özet gösteriliyor.</p>
                      {articleQuery.error instanceof Error && articleQuery.error.message ? (
                        <p className="mt-1 text-[10px] text-amber-200/50 break-words">
                          {articleQuery.error.message}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white/60">
                    İçerik şu an yüklenemiyor. Daha sonra tekrar deneyin.
                  </div>
                )
              ) : articleQuery.data?.content ? (
                <div className="space-y-4">
                  {articleQuery.data.warning && (
                    <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs text-amber-200/80">
                      {articleQuery.data.warning}
                    </div>
                  )}
                  <ArticleRenderer content={articleQuery.data.content} />
                </div>
              ) : summary ? (
                <p className="text-[15px] leading-relaxed text-white/90">{summary}</p>
              ) : null}
            </div>

            <div className="mt-8 flex items-center justify-end border-t border-white/10 pt-4">
              <Button
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10"
                onClick={() => onOpenChange(false)}
              >
                Kapat
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
