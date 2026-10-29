import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { MaritimeNewsItem } from "@/services/maritimeNews";
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

/**
 * The feed's own summary, kept short. Some feeds put the whole article into the
 * description field; showing all of it would republish the publisher's text.
 * The reader therefore shows at most SUMMARY_MAX_CHARS, cut at a sentence or
 * word boundary, and sends the reader to the publisher for the full story.
 */
const SUMMARY_MAX_CHARS = 320;

function shortSummary(text: string, max = SUMMARY_MAX_CHARS): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const sentenceEnd = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("! "), slice.lastIndexOf("? "));
  if (sentenceEnd >= max * 0.5) return slice.slice(0, sentenceEnd + 1);
  const wordEnd = slice.lastIndexOf(" ");
  return `${slice.slice(0, wordEnd > 0 ? wordEnd : max).trimEnd()}…`;
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

/**
 * News detail. Shows what the feed itself publishes for syndication — headline,
 * source, date, image and a short summary — and links to the publisher for the
 * full article. The app no longer fetches and re-renders the full text of
 * third-party articles: that copied the publisher's work into the app (a
 * copyright risk, FSEK) and sent every opened article through a third-party
 * reader service.
 */
export function NewsReaderDialog({ open, onOpenChange, item }: NewsReaderDialogProps) {
  const { currentLanguage } = useLanguage();
  useArticleBackGuard(open);

  const summary = shortSummary(stripHtml(item?.summary));
  const sourceUrl = item?.link && /^https?:\/\//i.test(item.link) ? item.link : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="mx-auto max-w-2xl w-[calc(100vw-1.25rem)] max-h-[94svh] overflow-hidden rounded-3xl border border-border/60 bg-card p-0 text-foreground">
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
              <DialogDescription className="sr-only">News summary</DialogDescription>
              {item?.publishedAt ? (
                <div className="text-xs text-muted-foreground">
                  <span className="notranslate" translate="no">{formatDate(item.publishedAt, currentLanguage)}</span>
                </div>
              ) : null}
            </DialogHeader>

            <HeroImage url={item?.imageUrl} alt={item?.title ?? "News"} />

            <div className="mt-6 space-y-5">
              {summary ? (
                <p className="text-[15px] leading-[1.7] text-foreground/85">{summary}</p>
              ) : null}

              {sourceUrl ? (
                <div className="space-y-2">
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
                  >
                    Read the full article
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <p className="text-center text-xs text-muted-foreground">
                    Opens the publisher's website. The article belongs to its publisher.
                  </p>
                </div>
              ) : null}
            </div>
          </article>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
