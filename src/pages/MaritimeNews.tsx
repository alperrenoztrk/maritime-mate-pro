import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Capacitor } from "@capacitor/core";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchMaritimeNews, type MaritimeNewsItem } from "@/services/maritimeNews";
import { ChevronRight, ExternalLink, RefreshCw, Loader2 } from "lucide-react";

function formatDateTR(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("tr-TR", {
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

function toHighResImageUrl(url?: string): string | undefined {
  const normalized = normalizeImageUrl(url);
  if (!normalized) return undefined;

  try {
    const parsed = new URL(normalized);
    parsed.pathname = parsed.pathname.replace(/([_-])\d{2,4}x\d{2,4}(?=\.[a-z0-9]+$)/i, "");

    if (parsed.hostname.includes("marinelink.com")) {
      parsed.pathname = parsed.pathname
        .replace(/\/\d{2,4}x\d{2,4}(?=\/)/i, "")
        .replace(/\/\d{2,4}(?=\/)/, "")
        .replace(/([_-])(thumb|thumbnail|small|medium|low)(?=\.[a-z0-9]+$)/i, "");
    }

    const paramsToStrip = ["w", "h", "width", "height", "resize", "fit", "crop", "quality", "q"];
    paramsToStrip.forEach((param) => parsed.searchParams.delete(param));

    return parsed.toString();
  } catch {
    return normalized;
  }
}

function toProxyImageUrl(url?: string, size: 'small' | 'medium' | 'large' = 'large'): string | undefined {
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
    const sanitized = `${parsed.hostname}${parsed.pathname}${parsed.search}${parsed.hash}`.replace(/^[\/]+/, "");
    if (!sanitized) return undefined;

    // Yüksek kalite parametreleri:
    // q=90: Kalite seviyesi
    // we: WebP formatı (daha küçük dosya, aynı kalite)
    // il: Progressive yükleme
    // dpr=2: Retina ekran desteği
    return `https://images.weserv.nl/?url=${encodeURIComponent(sanitized)}&w=${w}&h=${h}&fit=cover&q=90&we&il&dpr=2`;
  } catch {
    return undefined;
  }
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

/* ─── Article fetcher service ─── */
async function fetchArticleContent(url: string): Promise<{
  title: string;
  content: string;
  author?: string;
  publishedAt?: string;
  warning?: string;
}> {
  const baseUrl = (import.meta.env.VITE_SUPABASE_URL as string || "").replace(/\/+$/, "");
  const key = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY) as string;

  if (!baseUrl || !key) throw new Error("Backend yapılandırması eksik.");

  const res = await fetch(`${baseUrl}/functions/v1/fetch-article`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: key,
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
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

/* ─── Render article content with basic formatting ─── */
function ArticleRenderer({ content }: { content: string }) {
  const paragraphs = content.split("\n\n").filter(Boolean);

  return (
    <div className="space-y-4 text-sm leading-relaxed text-white/85">
      {paragraphs.map((para, i) => {
        const trimmed = para.trim();
        if (trimmed.startsWith("## ")) {
          return (
            <h3 key={i} className="text-base font-bold text-white mt-6 mb-2">
              {trimmed.replace(/^## /, "")}
            </h3>
          );
        }
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote key={i} className="border-l-2 border-blue-400/40 pl-4 italic text-white/70">
              {trimmed.replace(/^> /, "")}
            </blockquote>
          );
        }
        if (trimmed.startsWith("• ")) {
          const items = trimmed.split("\n").filter(l => l.trim().startsWith("• "));
          return (
            <ul key={i} className="list-disc list-inside space-y-1 text-white/80">
              {items.map((item, j) => (
                <li key={j}>{item.replace(/^• /, "")}</li>
              ))}
            </ul>
          );
        }
        // Handle bold and italic markers
        const formatted = trimmed
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
          .replace(/_([^_]+)_/g, '<em>$1</em>');

        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />
        );
      })}
    </div>
  );
}

const MaritimeNews = () => {
  const navigate = useNavigate();
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  

  const [readerOpen, setReaderOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MaritimeNewsItem | null>(null);

  // Full article fetch query
  const articleQuery = useQuery({
    queryKey: ["article-content", selectedItem?.link],
    queryFn: () => fetchArticleContent(selectedItem!.link),
    enabled: readerOpen && !!selectedItem?.link,
    staleTime: 30 * 60 * 1000, // cache for 30 min
    retry: 1,
  });

  const openExternal = async (url: string) => {
    try {
      if (Capacitor.isNativePlatform()) {
        const { Browser } = await import("@capacitor/browser");
        await Browser.open({ url });
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    } catch {
      window.location.href = url;
    }
  };

  const query = useQuery({
    queryKey: ["maritime-news"],
    queryFn: () => fetchMaritimeNews({ perSourceLimit: 10 }),
    // Avoid "empty list cached all day" when upstream feeds temporarily fail.
    staleTime: 10 * 60 * 1000,
    refetchInterval: (q) => (q.state.data?.items?.length ? false : 60 * 1000),
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const items = query.data?.items ?? [];
  const sourceErrors = query.data?.errors ?? [];
  const fetchedAt = query.data?.fetchedAt;
  const sources = query.data?.sources ?? [];
  const perSourceLimit = 10;

  const errorBySource = useMemo(() => {
    const map = new Map<string, string>();
    sourceErrors.forEach((e) => map.set(e.source, e.error));
    return map;
  }, [sourceErrors]);

  // Only include items with images
  const itemsWithImages = useMemo(() => items.filter((it) => Boolean(it.imageUrl)), [items]);

  const groupedItems = useMemo(() => {
    const bySource = new Map<string, typeof itemsWithImages>();
    itemsWithImages.forEach((it) => {
      const list = bySource.get(it.source) ?? [];
      if (list.length < perSourceLimit) {
        list.push(it);
        bySource.set(it.source, list);
      }
    });

    const definedSources = sources.map((src) => ({
      id: src.id,
      name: src.name,
      url: src.url,
      items: (bySource.get(src.name) ?? []).slice(0, perSourceLimit),
    }));

    const unknownSources = Array.from(bySource.entries())
      .filter(([source]) => !sources.find((s) => s.name === source))
      .map(([source, list]) => ({ id: source, name: source, url: "", items: list.slice(0, perSourceLimit) }));

    return [...definedSources, ...unknownSources].filter((group) => group.items.length > 0 || errorBySource.has(group.name));
  }, [itemsWithImages, sources, perSourceLimit, errorBySource]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchEndX.current - touchStartX.current;
    const isLeftSwipe = distance < -100;
    if (isLeftSwipe) {
      navigate("/");
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const selectedSummary = stripHtml(selectedItem?.summary);
  const selectedReadingTime = estimateReadingTime(selectedSummary);
  const selectedHighResImage = toHighResImageUrl(selectedItem?.imageUrl);
  const selectedImageUrl =
    toProxyImageUrl(selectedHighResImage, "large") ??
    normalizeImageUrl(selectedItem?.imageUrl);

  return (
    <div
      className="min-h-[100svh] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-foreground px-4 py-6 touch-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Helmet>
        <title>Denizcilik Haberleri | Güncel RSS</title>
        <meta
          name="description"
          content="Denizcilik haberleri: gCaptain, MarineLink ve diğer kaynaklardan güncel RSS başlıklarını uygulama içinde okuyun."
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      {/* Right arrow indicator - back to home */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-30">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <ChevronRight className="w-6 h-6 text-white drop-shadow-lg" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-white">Denizcilik Haberleri</h1>
            <p className="mt-1 text-sm text-white/70">
              Güncel denizcilik haberleri (RSS). Sola kaydırarak ana sayfaya dönebilirsiniz.
            </p>
            {fetchedAt ? (
              <p className="mt-1 text-xs text-white/50">Son güncelleme: {formatDateTR(fetchedAt)}</p>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="secondary"
              className="bg-white/10 hover:bg-white/15"
              onClick={() => query.refetch()}
              disabled={query.isFetching}
            >
              <RefreshCw className={"mr-2 h-4 w-4 " + (query.isFetching ? "animate-spin" : "")} />
              Yenile
            </Button>
            <Button
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
              onClick={() => navigate("/")}
            >
              Ana Sayfa
            </Button>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {query.isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="border-white/10 bg-white/5 p-4">
                <div className="flex gap-4">
                  <Skeleton className="h-24 w-32 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                  </div>
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
        ) : groupedItems.length === 0 ? (
          <Card className="border-white/10 bg-white/5 p-4">
            <div className="text-sm text-white/80">
              Şu anda listelenecek haber bulunamadı.
              {sourceErrors.length ? (
                <div className="mt-3 text-xs text-white/60">
                  Bazı kaynaklara erişilemedi. Yenile’ye basarak tekrar deneyin.
                </div>
              ) : null}
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {groupedItems.map((group) => (
              <Card key={group.id} className="border-white/10 bg-white/5 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-white">{group.name}</h2>
                    <p className="text-sm text-white/70">
                      Her kaynaktan {perSourceLimit} güncel haber. Görseller otomatik olarak çekilir.
                    </p>
                    {errorBySource.has(group.name) ? (
                      <p className="text-xs text-amber-200/80">
                        Bu kaynak için uyarı: {errorBySource.get(group.name)}
                      </p>
                    ) : null}
                  </div>
                  {group.url ? (
                    <Button
                      asChild
                      variant="outline"
                      className="border-white/20 bg-transparent text-white hover:bg-white/10"
                    >
                      <a href={group.url} target="_blank" rel="noreferrer">
                        Kaynağa Git
                      </a>
                    </Button>
                  ) : null}
                </div>

                <Separator className="my-3 bg-white/10" />

                {group.items.length === 0 ? (
                  <div className="rounded-md border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                    Bu kaynaktan haber alınamadı.
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((it, itemIndex) => {
                      // Responsive srcset için farklı boyutlarda URL'ler
                      const highResImageUrl = toHighResImageUrl(it.imageUrl);
                      const smallImageUrl = toProxyImageUrl(highResImageUrl, 'small');
                      const mediumImageUrl = toProxyImageUrl(highResImageUrl, 'medium');
                      const largeImageUrl = toProxyImageUrl(highResImageUrl, 'large');
                      const fallbackImageUrl = normalizeImageUrl(it.imageUrl);
                      const displayImageUrl = largeImageUrl ?? fallbackImageUrl;

                      // İlk 3 görsel için eager loading
                      const isEagerLoad = itemIndex < 3;

                      return (
                        <button
                          key={it.link}
                          type="button"
                          onClick={() => {
                            setSelectedItem(it);
                            setReaderOpen(true);
                          }}
                          className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left transition-all hover:border-white/20 hover:bg-white/10"
                        >
                          {/* Görsel */}
                          <div className="relative h-44 w-full overflow-hidden bg-slate-800">
                            {displayImageUrl ? (
                              <>
                                <img
                                  src={displayImageUrl}
                                  srcSet={smallImageUrl && mediumImageUrl && largeImageUrl 
                                    ? `${smallImageUrl} 720w, ${mediumImageUrl} 1280w, ${largeImageUrl} 2000w`
                                    : undefined
                                  }
                                  sizes="(max-width: 720px) 720px, (max-width: 1280px) 1280px, 2000px"
                                  alt={it.title}
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  loading={isEagerLoad ? "eager" : "lazy"}
                                  decoding="async"
                                  fetchPriority={isEagerLoad ? "high" : "auto"}
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    const fallbackTried = target.dataset.fallbackTried === "true";
                                    const fallbackSrc = fallbackImageUrl;

                                    if (!fallbackTried && fallbackSrc && target.src !== fallbackSrc) {
                                      target.dataset.fallbackTried = "true";
                                      target.src = fallbackSrc;
                                      target.style.display = "";
                                      if (target.nextElementSibling) {
                                        target.nextElementSibling.classList.add("hidden");
                                      }
                                      return;
                                    }

                                    target.style.display = "none";
                                    if (target.nextElementSibling) {
                                      target.nextElementSibling.classList.remove("hidden");
                                    }
                                  }}
                                />
                                <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
                                  <span className="text-xs text-white/40">Görsel yüklenemedi</span>
                                </div>
                              </>
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
                                <span className="text-xs text-white/40">Görsel yok</span>
                              </div>
                            )}
                            {/* Kaynak etiketi */}
                            <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                              {it.source}
                            </div>
                          </div>

                          {/* İçerik */}
                          <div className="flex flex-1 flex-col p-4">
                            {it.publishedAt && (
                              <span className="mb-2 text-xs text-white/50">{formatDateTR(it.publishedAt)}</span>
                            )}
                            <h3 className="line-clamp-3 text-sm font-semibold leading-snug text-white group-hover:text-blue-300">
                              {it.title}
                            </h3>
                            {it.summary && (
                              <p className="mt-2 line-clamp-2 text-xs text-white/60">{it.summary}</p>
                            )}
                            <div className="mt-auto flex items-center gap-1 pt-3 text-xs text-blue-400">
                              <span>Uygulamada oku</span>
                              <ChevronRight className="h-3 w-3" />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={readerOpen}
        onOpenChange={(open) => {
          setReaderOpen(open);
          if (!open) setSelectedItem(null);
        }}
      >
        <DialogContent className="max-w-3xl max-h-[92svh] border-white/10 bg-slate-950 text-white p-0 overflow-hidden">
          <ScrollArea className="max-h-[92svh]">
            {/* Hero image */}
            <div className="relative h-52 sm:h-64 w-full bg-slate-900">
              {selectedImageUrl ? (
                <img
                  src={selectedImageUrl}
                  alt={selectedItem?.title ?? "Haber görseli"}
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

            <div className="px-5 pb-6 -mt-16 relative">
              <DialogHeader className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                  {selectedItem?.source ? (
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80 backdrop-blur-sm">
                      {selectedItem.source}
                    </span>
                  ) : null}
                  {articleQuery.data?.author && (
                    <span className="text-white/60">{articleQuery.data.author}</span>
                  )}
                  {selectedItem?.publishedAt ? <span>{formatDateTR(selectedItem.publishedAt)}</span> : null}
                  {articleQuery.data?.content && (
                    <span>• {estimateReadingTime(articleQuery.data.content)}</span>
                  )}
                </div>
                <DialogTitle className="text-lg text-white leading-snug">
                  {selectedItem?.title ?? "Haber"}
                </DialogTitle>
                <DialogDescription className="sr-only">Haber detayı</DialogDescription>
              </DialogHeader>

              {/* Article content */}
              <div className="mt-5">
                {articleQuery.isLoading ? (
                  <div className="flex flex-col items-center gap-3 py-12 text-white/60">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span className="text-sm">Makale yükleniyor...</span>
                  </div>
                ) : articleQuery.isError ? (
                  <div className="space-y-4">
                    {/* Show RSS summary as fallback */}
                    {selectedSummary ? (
                      <div className="space-y-3">
                        <p className="text-sm leading-relaxed text-white/85">{selectedSummary}</p>
                        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs text-amber-200/80">
                          Tam metin yüklenemedi. RSS özeti gösteriliyor.
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white/60">
                        İçerik yüklenemedi. Haberi tarayıcıda açabilirsiniz.
                      </div>
                    )}
                  </div>
                ) : articleQuery.data?.content ? (
                  <div className="space-y-4">
                    {articleQuery.data.warning && (
                      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs text-amber-200/80">
                        {articleQuery.data.warning}
                      </div>
                    )}
                    <ArticleRenderer content={articleQuery.data.content} />
                  </div>
                ) : selectedSummary ? (
                  <p className="text-sm leading-relaxed text-white/85">{selectedSummary}</p>
                ) : (
                  <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white/60">
                    Bu haber için içerik bulunamadı.
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
                <Button
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/15"
                  onClick={() => {
                    if (selectedItem?.link) openExternal(selectedItem.link);
                  }}
                  disabled={!selectedItem?.link}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Kaynakta aç
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10"
                  onClick={() => setReaderOpen(false)}
                >
                  Kapat
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MaritimeNews;
