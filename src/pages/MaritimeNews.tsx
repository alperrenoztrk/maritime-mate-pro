import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { ChevronRight } from "lucide-react";
import { fetchMaritimeNews, type MaritimeNewsItem } from "@/services/maritimeNews";
import { NewsReaderDialog } from "@/components/news/NewsReaderDialog";
import { NewspaperStyles } from "@/components/news/NewspaperStyles";
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

/** Byline için kısa baskı tarihi: bugünse SS:DD, değilse GG Ay. */
function formatShort(iso: string | undefined, locale: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const now = new Date();
  const sameDay =
    d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  if (sameDay) return d.toLocaleTimeString(locale || "en", { hour: "2-digit", minute: "2-digit", hour12: false });
  return d.toLocaleDateString(locale || "en", { day: "2-digit", month: "short" });
}

function stripHtml(text?: string): string {
  if (!text) return "";
  return text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
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

/** Sepya yarım ton tramlı, mürekkep çerçeveli basılı gazete fotoğrafı. */
function PrintedPhoto({
  item,
  size,
  eager,
  className,
}: {
  item: MaritimeNewsItem;
  size: "small" | "medium" | "large";
  eager?: boolean;
  className?: string;
}) {
  const proxied = toProxyImageUrl(item.imageUrl, size);
  const fallback = normalizeImageUrl(item.imageUrl);
  const display = proxied ?? fallback;

  if (!display) {
    return (
      <span className={`gz-photo-wrap gz-photo-none ${className ?? ""}`} aria-hidden="true">
        <span style={{ fontSize: 20, opacity: 0.7 }}>⚓</span>
        <span>{item.source}</span>
      </span>
    );
  }
  return (
    <span className={`gz-photo-wrap ${className ?? ""}`}>
      <img
        src={display}
        alt={item.title}
        className="gz-photo"
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
    </span>
  );
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

  const openItem = (item: MaritimeNewsItem) => {
    setSelectedItem(item);
    setReaderOpen(true);
  };

  const today = new Date();
  const dateline = today.toLocaleDateString(currentLanguage || "tr", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  // Yılın günü = sayı numarası; her gün yeni bir "baskı".
  const issueNo = Math.max(
    1,
    Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86_400_000),
  );
  const coverage = query.data?.locale
    ? `${query.data.locale.countryName}${query.data.locale.mode === "regional-and-global" ? " ve Küresel" : ""} Kaynakları`
    : "Bölgesel Kaynaklar";
  const pressTime = query.data?.fetchedAt
    ? new Date(query.data.fetchedAt).toLocaleTimeString(currentLanguage || "tr", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : null;

  const [lead, ...rest] = items;
  const secondaries = rest.slice(0, 6);
  const briefs = rest.slice(6, 18);
  const leadSummary = stripHtml(lead?.summary).slice(0, 420);

  return (
    <div
      className="gzp-desk min-h-[100svh] px-3 py-6 touch-auto sm:px-6"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Helmet>
        <title>Denizcilik Haberleri | Güncel</title>
        <meta
          name="description"
          content="Denizcilik dünyasından en önemli ve güncel haberleri gerçek bir gazete sayfasında uygulama içinde okuyun."
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <NewspaperStyles />

      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-25">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <ChevronRight className="w-6 h-6 text-white drop-shadow-lg" />
        </div>
      </div>

      {/* Masanın üzerindeki gazete destesi */}
      <div className="relative mx-auto w-full max-w-3xl">
        <div className="gzp-under" aria-hidden="true" />
        <div className="gzp-under gzp-under--2" aria-hidden="true" />

        <article className="gz-sheet overflow-hidden">
          <div className="gz-grain" aria-hidden="true" />
          <div className="gz-curl" aria-hidden="true" />

          {/* ── Manşet bloğu ── */}
          <header className="relative px-4 pt-4 sm:px-8 sm:pt-6">
            <div className="gz-rule-thin" aria-hidden="true" />
            <div className="mt-2 flex items-center justify-center gap-3">
              <div className="gz-ear hidden sm:block">
                Sabah
                <br />
                Baskısı
              </div>
              <div className="min-w-0 flex-1 text-center">
                <h1 className="gz-masthead notranslate" translate="no" lang="en">
                  MARINER&rsquo;S POST<span className="sr-only"> — Denizcilik Haberleri</span>
                </h1>
                <div className="gz-masthead-sub">DENİZCİLİK DÜNYASININ HAVADİSLERİ</div>
              </div>
              <div className="gz-ear hidden sm:block">
                Ücretsiz
                <br />
                Nüsha
              </div>
            </div>
            <div className="gz-rule-double mt-2" aria-hidden="true" />
            <div className="gz-dateline">
              <span>{dateline}</span>
              <span className="hidden sm:inline">Sayı No. {issueNo}</span>
              <span>{coverage}</span>
            </div>
            <div className="gz-rule-thick" aria-hidden="true" />

            {pressTime ? (
              <div className="gz-stamp" style={{ right: 10, bottom: -30 }}>
                Son Baskı
                <br />
                {pressTime}
              </div>
            ) : null}
          </header>

          {/* ── Sayfa gövdesi ── */}
          <div className="px-4 pb-5 pt-3 sm:px-8">
            {isLanguageLoading || query.isLoading ? (
              /* Dizgi hazırlanıyor — soluk mürekkep satırları */
              <div className="space-y-3 py-2" aria-busy="true">
                <div className="gz-skel h-7 w-11/12 animate-pulse" />
                <div className="gz-skel h-7 w-3/5 animate-pulse" />
                <div className="gz-skel mt-2 aspect-[16/9] w-full animate-pulse" />
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="gz-skel h-3 animate-pulse" style={{ width: `${88 - (i % 3) * 14}%` }} />
                  ))}
                </div>
                <p className="pt-3 text-center text-[10px] italic" style={{ color: "var(--gz-ink-faint)" }}>
                  Baskı makinesi çalışıyor…
                </p>
              </div>
            ) : query.isError ? (
              <div className="space-y-3 py-4">
                <div className="gz-kicker">Matbaadan Duyuru</div>
                <h2 className="gz-headline text-xl">Bugünkü baskı gecikti</h2>
                <div className="gz-notice">
                  Haberler alınamadı; hatlar onarılır onarılmaz baskıya devam edilecektir. Biraz sonra tekrar deneyin.
                  <div className="mt-1 break-words text-[9px] not-italic opacity-80">
                    {query.error instanceof Error ? query.error.message : "Bilinmeyen hata"}
                  </div>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="space-y-3 py-4">
                <div className="gz-kicker">Matbaadan Duyuru</div>
                <div className="gz-notice">Şu anda dizilecek havadis bulunamadı. Telgraf hattı sessiz.</div>
              </div>
            ) : (
              <>
                {/* Manşet haber */}
                {lead ? (
                  <section aria-label="Manşet haber">
                    <div className="gz-kicker">Günün Manşeti</div>
                    <button type="button" className="gz-tap mt-2" onClick={() => openItem(lead)}>
                      <h2 className="gz-headline text-[clamp(1.45rem,6.4vw,2.2rem)]">{lead.title}</h2>
                      <PrintedPhoto item={lead} size="large" eager className="mt-3 block aspect-[16/9] w-full" />
                      <div className="gz-caption">
                        {lead.source}
                        {lead.publishedAt ? ` — ${formatDate(lead.publishedAt, currentLanguage)}` : ""}
                      </div>
                      {leadSummary ? (
                        <p
                          className="gz-just mt-2 text-[11.5px] leading-[1.55]"
                          style={{
                            columns: 2,
                            columnGap: 16,
                            columnRule: "1px solid rgba(36,29,16,.28)",
                            color: "var(--gz-ink-soft)",
                          }}
                        >
                          {leadSummary}
                          {stripHtml(lead.summary).length > 420 ? "…" : ""}
                        </p>
                      ) : null}
                      <div className="gz-readmore mt-2">Haberin tamamı için dokunun ⟶</div>
                    </button>
                  </section>
                ) : null}

                <div className="gz-foldline" aria-hidden="true" />

                {/* İkinci sıra haberler — sütun cetvelli dizgi */}
                {secondaries.length > 0 ? (
                  <section aria-label="Diğer haberler">
                    <div className="gz-kicker">Denizden Havadisler</div>
                    <div
                      className="mt-2 grid grid-cols-2 gap-x-4 gap-y-4
                        [&>*:nth-child(even)]:border-l [&>*:nth-child(even)]:border-[rgba(36,29,16,.28)] [&>*:nth-child(even)]:pl-4
                        [&>*:nth-child(n+3)]:border-t [&>*:nth-child(n+3)]:border-t-[rgba(36,29,16,.2)] [&>*:nth-child(n+3)]:pt-3"
                    >
                      {secondaries.map((it) => (
                        <button
                          key={`${it.source}-${it.link}`}
                          type="button"
                          className="gz-tap min-w-0"
                          onClick={() => openItem(it)}
                        >
                          <PrintedPhoto item={it} size="small" className="block aspect-[3/2] w-full" />
                          <h3 className="gz-headline mt-1.5 line-clamp-3 text-[13px] leading-[1.22]">{it.title}</h3>
                          {stripHtml(it.summary) ? (
                            <p
                              className="gz-just mt-1 line-clamp-3 text-[10.5px] leading-[1.5]"
                              style={{ color: "var(--gz-ink-soft)" }}
                            >
                              {stripHtml(it.summary)}
                            </p>
                          ) : null}
                          <div className="gz-byline mt-1.5">
                            <span className="gz-src">{it.source}</span>
                            {it.publishedAt ? <span>· {formatShort(it.publishedAt, currentLanguage)}</span> : null}
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>
                ) : null}

                {/* Kısa havadisler — çift sütun dizgi */}
                {briefs.length > 0 ? (
                  <section className="mt-4" aria-label="Kısa haberler">
                    <div className="gz-kicker">Kısa Havadisler</div>
                    <ul className="mt-1 columns-2 gap-4">
                      {briefs.map((it) => (
                        <li
                          key={`${it.source}-${it.link}`}
                          className="break-inside-avoid border-b border-dotted border-[rgba(36,29,16,.35)] py-1.5"
                        >
                          <button type="button" className="gz-tap" onClick={() => openItem(it)}>
                            <span className="line-clamp-3 text-[11px] font-semibold leading-[1.3]">
                              <span aria-hidden="true" style={{ color: "var(--gz-ink-faint)" }}>
                                ■{" "}
                              </span>
                              {it.title}
                            </span>
                            <span className="gz-byline mt-0.5">
                              <span className="gz-src">{it.source}</span>
                              {it.publishedAt ? <span>· {formatShort(it.publishedAt, currentLanguage)}</span> : null}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {/* Sayfa altı */}
                <div className="gz-rule-thick mt-5" aria-hidden="true" />
                <div className="gz-dateline" style={{ justifyContent: "center", gap: 14 }}>
                  <span className="notranslate" translate="no" lang="en">
                    Mariner&rsquo;s Post
                  </span>
                  <span>·</span>
                  <span>Sayfa 1</span>
                  <span>·</span>
                  <span>{today.getFullYear()}</span>
                </div>
              </>
            )}
          </div>
        </article>
      </div>

      <NewsReaderDialog
        open={readerOpen}
        onOpenChange={(o) => {
          setReaderOpen(o);
          if (!o) setSelectedItem(null);
        }}
        item={selectedItem}
      />

      {/* Sayfaya özel sahne: koyu ahşap masa + alttaki yapraklar */}
      <style>{`
        .gzp-desk{
          background:
            radial-gradient(120% 70% at 50% 0%, rgba(214,178,110,.07), transparent 58%),
            radial-gradient(130% 100% at 50% 108%, rgba(0,0,0,.5), transparent 60%),
            repeating-linear-gradient(91deg, rgba(0,0,0,.16) 0 2px, transparent 2px 7px, rgba(255,255,255,.015) 7px 9px, transparent 9px 14px),
            linear-gradient(180deg, #33261a 0%, #291e13 52%, #1c150d 100%);
        }
        .gzp-under{
          position: absolute;
          inset: 0;
          border-radius: 3px;
          background: linear-gradient(180deg, #e9dcba 0%, #d9c89e 100%);
          box-shadow: 0 14px 26px rgba(0,0,0,.5), inset 0 0 0 1px rgba(120,90,36,.2);
          transform: rotate(-1.15deg) translateY(5px);
        }
        .gzp-under--2{
          background: linear-gradient(180deg, #e4d5b0 0%, #d2c095 100%);
          transform: rotate(.85deg) translateY(9px);
        }
      `}</style>
    </div>
  );
};

export default MaritimeNews;
