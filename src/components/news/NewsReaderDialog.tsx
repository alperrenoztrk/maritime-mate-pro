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
import { NewspaperStyles } from "@/components/news/NewspaperStyles";
import { softHyphenate } from "@/components/news/hyphenate";
import { useLanguage } from "@/contexts/useLanguage";

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

/**
 * Gerçek gazetede iç sayfaların numarası vardır. Bağlantıdan türetilen sabit bir
 * sayı kullanılıyor: aynı haber her açılışta aynı sayfada çıkar.
 */
function innerPageNo(link?: string): number {
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
  let dropCapUsed = false;

  return (
    /* Gerçek gazete dizgisi: geniş ekranda çift sütun, saç teli sütun cetveliyle.
       Tek geniş sütun "gazete değil" hissinin en büyük nedeniydi. */
    <div
      className="gz-cols gz-cols--wide text-[12.5px] leading-[1.62]"
      style={{ color: "var(--gz-ink-soft)" }}
    >
      {paragraphs.map((para, i) => {
        const trimmed = para.trim();
        const headingMatch = trimmed.match(/^#{1,6} +(.*)$/);
        if (headingMatch) {
          return (
            <h3
              key={i}
              className="mb-1.5 mt-5 border-b pb-1 text-[13px] font-bold uppercase tracking-[.12em]"
              style={{
                color: "var(--gz-ink)",
                borderColor: "var(--gz-rule)",
                fontFamily: "var(--gz-face-display)",
              }}
            >
              {headingMatch[1]}
            </h3>
          );
        }
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote
              key={i}
              className="mb-3 pl-3 italic"
              style={{ borderLeft: "3px double var(--gz-rule)" }}
            >
              {trimmed.replace(/^> /, "")}
            </blockquote>
          );
        }
        const bulletRe = /^(?:•|[-*]) +/;
        if (bulletRe.test(trimmed)) {
          const items = trimmed.split("\n").filter((l) => bulletRe.test(l.trim()));
          return (
            <ul key={i} className="mb-3 list-inside list-[square] space-y-1">
              {items.map((item, j) => (
                <li key={j}>{item.trim().replace(bulletRe, "")}</li>
              ))}
            </ul>
          );
        }
        const formatted = softHyphenate(trimmed)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold">$1</strong>')
          .replace(/_([^_]+)_/g, "<em>$1</em>");
        const isFirstParagraph = !dropCapUsed;
        dropCapUsed = true;
        return (
          <p
            key={i}
            className={"gz-just mb-3" + (isFirstParagraph ? " gz-dropcap" : "")}
            dangerouslySetInnerHTML={{ __html: formatted }}
          />
        );
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

  const summary = softHyphenate(stripHtml(item?.summary));
  const heroImage = toProxyImageUrl(item?.imageUrl) ?? normalizeImageUrl(item?.imageUrl);
  const pageDate = new Date().toLocaleDateString(currentLanguage || "tr", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[calc(100vw-1.25rem)] max-h-[94svh] overflow-hidden border-0 bg-transparent p-0 shadow-none text-[#241d10]">
        <NewspaperStyles />
        {/* Gazete iç sayfası — makale kağıdın üzerine basılı */}
        <article className="gz-sheet overflow-hidden">
          <div className="gz-showthrough" aria-hidden="true" />
          <div className="gz-grain" aria-hidden="true" />
          <ScrollArea className="max-h-[94svh]">
            <div className="px-5 pb-8 pt-4 sm:px-9 sm:pt-5">
              {/* İç sayfanın üst şeridi (running head): sayfa no — logo — tarih */}
              <div className="gz-rule-thin" aria-hidden="true" />
              {/* Sağdaki boşluk, Dialog'un kendi kapatma çarpısının tarihin
                  üstüne binmemesi için. */}
              <div
                className="mt-1.5 flex items-baseline justify-between gap-3 pr-10 text-[8.5px]"
                style={{ fontVariant: "small-caps", letterSpacing: ".13em", color: "var(--gz-ink-soft)" }}
              >
                <span>Sayfa {innerPageNo(item?.link)}</span>
                <span
                  className="notranslate text-[17px] leading-none"
                  translate="no"
                  lang="en"
                  style={{ color: "var(--gz-ink)", fontFamily: "var(--gz-face-mast)" }}
                >
                  Mariner&rsquo;s Post
                </span>
                <span className="notranslate" translate="no">{pageDate}</span>
              </div>
              <div className="gz-rule-double mt-1.5" aria-hidden="true" />

              <DialogHeader className="mt-3 space-y-2 text-left">
                <DialogTitle className="gz-headline text-[clamp(1.35rem,5.6vw,1.9rem)] leading-[1.12]">
                  {item?.title ?? "Haber"}
                </DialogTitle>
                <DialogDescription className="sr-only">Haber detayı</DialogDescription>
                {/* Byline satırı */}
                <div
                  className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-y py-1.5 text-[9px]"
                  style={{
                    fontVariant: "small-caps",
                    letterSpacing: ".12em",
                    color: "var(--gz-ink-faint)",
                    borderColor: "var(--gz-rule)",
                  }}
                >
                  {item?.source ? (
                    <span className="font-bold" style={{ color: "var(--gz-ink-soft)" }}>
                      {item.source}
                    </span>
                  ) : null}
                  {item?.publishedAt ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="notranslate" translate="no">{formatDate(item.publishedAt, currentLanguage)}</span>
                    </>
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

              {/* Basılı fotoğraf + altyazı */}
              {heroImage ? (
                <figure className="mt-3">
                  <span className="gz-photo-wrap block aspect-[16/9] w-full">
                    <img
                      src={heroImage}
                      alt={item?.title ?? "Haber"}
                      className="gz-photo"
                      loading="eager"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </span>
                  <figcaption className="gz-caption">
                    {item?.source ? `Fotoğraf: ${item.source}` : "Arşiv fotoğrafı"}
                  </figcaption>
                </figure>
              ) : null}

              <div className="mt-4">
                {articleQuery.isLoading ? (
                  <div
                    className="flex flex-col items-center gap-3 py-14"
                    style={{ color: "var(--gz-ink-faint)" }}
                  >
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span className="text-sm italic">Dizgi hazırlanıyor…</span>
                  </div>
                ) : articleQuery.isError ? (
                  summary ? (
                    <div className="space-y-3">
                      <p
                        className="gz-cols gz-cols--wide gz-just gz-dropcap text-[12.5px] leading-[1.62]"
                        style={{ color: "var(--gz-ink-soft)" }}
                      >
                        {summary}
                      </p>
                      <div className="gz-notice">
                        <p>Tam metin baskıya yetişmedi; özet dizgisi gösteriliyor.</p>
                        {articleQuery.error instanceof Error && articleQuery.error.message ? (
                          <p className="mt-1 break-words text-[9px] opacity-75">{articleQuery.error.message}</p>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <div className="gz-notice">İçerik şu an dizilemiyor. Daha sonra tekrar deneyin.</div>
                  )
                ) : articleQuery.data?.content ? (
                  <div className="space-y-4">
                    {articleQuery.data.warning && <div className="gz-notice">{articleQuery.data.warning}</div>}
                    <ArticleRenderer content={articleQuery.data.content} />
                  </div>
                ) : summary ? (
                  <p
                    className="gz-cols gz-cols--wide gz-just gz-dropcap text-[12.5px] leading-[1.62]"
                    style={{ color: "var(--gz-ink-soft)" }}
                  >
                    {summary}
                  </p>
                ) : null}
              </div>

              <div className="gz-end mt-7 notranslate" translate="no">
                SON
              </div>

              {/* Modern düğme yerine dizgiye ait tipografik satır */}
              <div className="mt-6 flex items-center justify-center">
                <button
                  type="button"
                  className="border-y px-5 py-1.5 text-[11px] uppercase tracking-[.2em] active:bg-[rgba(35,28,15,.07)]"
                  style={{
                    borderColor: "var(--gz-rule)",
                    color: "var(--gz-ink-soft)",
                    fontVariant: "small-caps",
                  }}
                  onClick={() => onOpenChange(false)}
                >
                  ‹ Gazeteye dön
                </button>
              </div>
            </div>
          </ScrollArea>
        </article>
      </DialogContent>
    </Dialog>
  );
}
