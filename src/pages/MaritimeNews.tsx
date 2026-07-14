import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchMaritimeNews, type MaritimeNewsItem } from "@/services/maritimeNews";
import { ChevronRight, Globe2, Newspaper } from "lucide-react";
import { NewsReaderDialog } from "@/components/news/NewsReaderDialog";
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

function toProxyImageUrl(url?: string, size: "small" | "medium" | "large" = "large"): string | undefined {
  const normalized = normalizeImageUrl(url);
  if (!normalized) return undefined;
  const sizeConfig = {
    small: { w: 720, h: 405 },
    medium: { w: 1280, h: 720 },
    large: { w: 2000, h: 1125 },
  };
  const { w, h } = sizeConfig[size];
  try {
    const parsed = new URL(normalized);
    const sanitized = `${parsed.hostname}${parsed.pathname}${parsed.search}${parsed.hash}`.replace(/^\/+/, "");
    if (!sanitized) return undefined;
    return `https://images.weserv.nl/?url=${encodeURIComponent(sanitized)}&w=${w}&h=${h}&fit=cover&q=90&we&il&dpr=2`;
  } catch {
    return undefined;
  }
}

const MaritimeNews = () => {
  const navigate = useNavigate();
  const { currentLanguage, isLoading: isLanguageLoading } = useLanguage();
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const [readerOpen, setReaderOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MaritimeNewsItem | null>(null);

  const query = useQuery({
    queryKey: ["maritime-news", currentLanguage],
    queryFn: () => fetchMaritimeNews({ language: currentLanguage, perSourceLimit: 12 }),
    enabled: !isLanguageLoading,
    staleTime: 10 * 60 * 1000,
    refetchInterval: (q) => (q.state.data?.items?.length ? false : 60 * 1000),
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const items = query.data?.items ?? [];

  useEffect(() => {
    // Never leave an article from the previous language open while the new
    // regional edition is loading.
    setReaderOpen(false);
    setSelectedItem(null);
  }, [currentLanguage]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchEndX.current - touchStartX.current;
    if (distance < -100) navigate("/");
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="min-h-[100svh] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-foreground px-4 py-6 touch-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Helmet>
        <title>Denizcilik Haberleri | Güncel</title>
        <meta
          name="description"
          content="Denizcilik dünyasından en önemli ve güncel haberleri tek bir akışta uygulama içinde okuyun."
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-30">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <ChevronRight className="w-6 h-6 text-white drop-shadow-lg" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Denizcilik Haberleri</h1>
            <p className="mt-1 text-sm text-white/55">Haber akışı uygulama diline göre otomatik yenilenir.</p>
          </div>
          {query.data?.locale ? (
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1.5 text-xs font-medium text-sky-200">
              <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>
                {query.data.locale.countryName}
                {query.data.locale.mode === "regional-and-global" ? " ve küresel kaynaklar" : " kaynakları"}
              </span>
            </div>
          ) : null}
        </div>

        <Separator className="bg-white/10" />

        {isLanguageLoading || query.isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} className="border-white/10 bg-white/5 p-0 overflow-hidden">
                <Skeleton className="h-44 w-full" />
                <div className="space-y-2 p-4">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        ) : query.isError ? (
          <Card className="border-red-500/30 bg-red-500/10 p-4">
            <div className="text-sm text-red-200">Haberler alınamadı. Biraz sonra tekrar deneyin.</div>
            <div className="mt-2 text-xs text-red-200/80 break-words">
              {query.error instanceof Error ? query.error.message : "Bilinmeyen hata"}
            </div>
          </Card>
        ) : items.length === 0 ? (
          <Card className="border-white/10 bg-white/5 p-4">
            <div className="text-sm text-white/80">Şu anda listelenecek haber bulunamadı.</div>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it, idx) => {
              const small = toProxyImageUrl(it.imageUrl, "small");
              const medium = toProxyImageUrl(it.imageUrl, "medium");
              const large = toProxyImageUrl(it.imageUrl, "large");
              const fallback = normalizeImageUrl(it.imageUrl);
              const display = large ?? fallback;
              const eager = idx < 3;

              return (
                <button
                  key={`${it.source}-${it.link}`}
                  type="button"
                  onClick={() => {
                    setSelectedItem(it);
                    setReaderOpen(true);
                  }}
                  className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left transition-all hover:border-white/20 hover:bg-white/10"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-slate-800">
                    {display ? (
                      <img
                        src={display}
                        srcSet={small && medium && large ? `${small} 720w, ${medium} 1280w, ${large} 2000w` : undefined}
                        sizes="(max-width: 720px) 720px, (max-width: 1280px) 1280px, 2000px"
                        alt={it.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading={eager ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={eager ? "high" : "auto"}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          if (t.dataset.fallbackTried !== "true" && fallback && t.src !== fallback) {
                            t.dataset.fallbackTried = "true";
                            t.src = fallback;
                          }
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-700 to-slate-900 px-4 text-center">
                        <Newspaper className="h-8 w-8 text-sky-300/60" aria-hidden="true" />
                        <span className="line-clamp-2 text-xs font-medium text-white/55">{it.source}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-2 flex items-center justify-between gap-2 text-[11px]">
                      <span className="min-w-0 truncate rounded-full bg-sky-400/10 px-2 py-1 font-medium text-sky-200/90">
                        {it.source}
                      </span>
                      {it.publishedAt ? (
                        <span className="shrink-0 text-white/45">{formatDate(it.publishedAt, currentLanguage)}</span>
                      ) : null}
                    </div>
                    <h3 className="line-clamp-3 text-sm font-semibold leading-snug text-white group-hover:text-blue-300">
                      {it.title}
                    </h3>
                    {it.summary && (
                      <p className="mt-2 line-clamp-2 text-xs text-white/60">{it.summary}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <NewsReaderDialog
        open={readerOpen}
        onOpenChange={(o) => {
          setReaderOpen(o);
          if (!o) setSelectedItem(null);
        }}
        item={selectedItem}
      />
    </div>
  );
};

export default MaritimeNews;
