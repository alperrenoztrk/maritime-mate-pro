import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { ChevronRight } from "lucide-react";
import { fetchMaritimeNews, type MaritimeNewsItem } from "@/services/maritimeNews";
import { NewsReaderDialog } from "@/components/news/NewsReaderDialog";
import { NewspaperStyles } from "@/components/news/NewspaperStyles";
import { softHyphenate } from "@/components/news/hyphenate";
import { useLanguage } from "@/contexts/useLanguage";

/** Gazetenin kuruluş yılı — cilt numarası bundan türetiliyor. */
const FOUNDED_YEAR = 1888;

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

/** Künyedeki cilt numarası için roma rakamı. */
function toRoman(value: number): string {
  const table: Array<[number, string]> = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
    [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  let rest = Math.max(1, value);
  for (const [n, sym] of table) {
    while (rest >= n) {
      out += sym;
      rest -= n;
    }
  }
  return out;
}

/**
 * Manşet özetini gerçek gazete dizgisindeki gibi ikiye ayırır: ilk cümle italik
 * ara başlık (deck), kalanı sütunlara akan gövde olur.
 */
function splitDeck(summary?: string): { deck: string; body: string } {
  const text = stripHtml(summary);
  if (!text) return { deck: "", body: "" };
  const match = text.match(/^(.{40,180}?[.!?])\s+(.+)$/);
  if (!match) return { deck: "", body: text };
  return { deck: match[1], body: match[2] };
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

/**
 * 45° tramlı, mürekkep çerçeveli basılı gazete fotoğrafı.
 *
 * Yalnızca haberin gerçek bir görseli varken render edilir; görsel çalışma
 * anında da yüklenemezse çerçeve tamamen gizlenir. Gerçek gazetede klişesi
 * olmayan haber düz metin dizilir — boş kutu bırakılmaz.
 */
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
  const [failed, setFailed] = useState(false);
  const proxied = toProxyImageUrl(item.imageUrl, size);
  const fallback = normalizeImageUrl(item.imageUrl);
  const display = proxied ?? fallback;

  if (!display || failed) return null;

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
            return;
          }
          setFailed(true);
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
  // Yılın günü = o yılın kaçıncı baskısı; kuruluştan beri süren sayı numarası.
  const dayOfYear = Math.max(
    1,
    Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86_400_000),
  );
  const volume = toRoman(today.getFullYear() - FOUNDED_YEAR + 1);
  const issueNo = ((today.getFullYear() - FOUNDED_YEAR) * 365 + dayOfYear).toLocaleString("tr-TR");
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

  // Manşet, klişesi olan en yüksek sıralı haber olsun — ön sayfanın en büyük
  // görseli boş kalmasın. Hiçbirinde görsel yoksa sıradaki ilk habere düşülür
  // ve manşet klişesiz (yalnızca metin) dizilir. Kalanlar sırasını korur.
  const leadIndex = Math.max(0, items.findIndex((it) => Boolean(it.imageUrl)));
  const lead = items[leadIndex];
  const rest = items.filter((_, i) => i !== leadIndex);
  const secondaries = rest.slice(0, 6);
  const briefs = rest.slice(6, 18);
  const { deck: leadDeck, body: leadBodyFull } = splitDeck(lead?.summary);
  const leadBody = leadBodyFull.slice(0, 1100);
  const sourceCount = query.data?.sources?.length ?? 0;
  // Gerçek ön sayfada her habere klişe konmaz; yalnızca görseli olan ilk iki
  // ikincil haber resimli diziliyor. Görseli olmayana boş kutu koymak yerine
  // haber düz metin olarak akıyor.
  const illustrated = new Set(
    secondaries.filter((it) => Boolean(it.imageUrl)).slice(0, 2).map((it) => it.link),
  );

  return (
    <div
      className="gzp-desk min-h-[100svh] px-3 py-6 touch-auto sm:px-6"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Helmet>
        <title>Mariner's Book — Denizcilik Haberleri</title>
        <meta
          name="description"
          content="Denizcilik dünyasından güncel haberler; başlıklar, kaynaklar ve gazete formatında uygulama içi okuma."
        />
        <link rel="canonical" href="https://nauticalleap.com/maritime-news" />
        <meta property="og:title" content="Mariner's Book — Denizcilik Haberleri" />
        <meta property="og:description" content="Denizcilik dünyasından güncel haberler; kaynaklara göre derlenmiş öne çıkan başlıklar." />
        <meta property="og:url" content="https://nauticalleap.com/maritime-news" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Denizcilik Haberleri",
          url: "https://nauticalleap.com/maritime-news",
          isPartOf: { "@type": "WebSite", name: "Mariner's Book", url: "https://nauticalleap.com/" },
          about: "Maritime industry news aggregated from trusted sources",
        })}</script>
      </Helmet>

      <NewspaperStyles />

      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-25">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <ChevronRight className="w-6 h-6 text-[#e2d3ac] drop-shadow-lg" />
        </div>
      </div>

      {/* Masanın üzerindeki gazete destesi */}
      <div className="relative mx-auto w-full max-w-3xl">
        <div className="gzp-under" aria-hidden="true" />
        <div className="gzp-under gzp-under--2" aria-hidden="true" />

        <article className="gz-sheet overflow-hidden">
          <div className="gz-showthrough" aria-hidden="true" />
          <div className="gz-grain" aria-hidden="true" />

          {/* ── Manşet bloğu ──
              Üstteki geniş boşluk, sayfanın üzerinde duran genel "geri" düğmesinin
              kulaklıkların üstüne binmemesi için. */}
          <header className="relative px-4 pt-11 sm:px-8 sm:pt-6">
            <div className="gz-rule-thin" aria-hidden="true" />
            <div className="mt-2 flex items-center justify-center gap-2 sm:gap-3">
              <div className="gz-ear">
                Sabah
                <br />
                Baskısı
              </div>
              <div className="min-w-0 flex-1 text-center">
                <h1 className="gz-masthead notranslate" translate="no" lang="en">
                  Mariner&rsquo;s Post<span className="sr-only"> — Denizcilik Haberleri</span>
                </h1>
              </div>
              <div className="gz-ear">
                Kuruluşu
                <br />
                {FOUNDED_YEAR}
              </div>
            </div>
            <div className="gz-masthead-sub">DENİZCİLİK DÜNYASININ HAVADİSLERİ</div>
            <div className="gz-rule-double mt-2" aria-hidden="true" />
            <div className="gz-dateline">
              <span>{dateline}</span>
              <span className="hidden sm:inline">
                Cilt {volume} — Sayı {issueNo}
              </span>
              <span>Fiyatı 25 Kuruş</span>
            </div>
            <div className="gz-rule-hair" aria-hidden="true" />
            <div className="gz-dateline" style={{ justifyContent: "center", gap: 12 }}>
              <span>{coverage}</span>
              {pressTime ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Baskıya veriliş {pressTime}</span>
                </>
              ) : null}
            </div>
            <div className="gz-rule-thick" aria-hidden="true" />
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
                <p className="pt-3 text-center text-micro italic" style={{ color: "var(--gz-ink-faint)" }}>
                  Baskı makinesi çalışıyor…
                </p>
              </div>
            ) : query.isError ? (
              <div className="space-y-3 py-4">
                <div className="gz-kicker">Matbaadan Duyuru</div>
                <h2 className="gz-headline text-xl">Bugünkü baskı gecikti</h2>
                <div className="gz-notice">
                  Haberler alınamadı; hatlar onarılır onarılmaz baskıya devam edilecektir. Biraz sonra tekrar deneyin.
                  <div className="mt-1 break-words text-micro not-italic opacity-80">
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
                {/* Manşet haber — başlık, ara başlık, künye cetveli, sütunlara akan gövde */}
                {lead ? (
                  <section aria-label="Manşet haber">
                    <div className="gz-kicker">Günün Manşeti</div>
                    <button type="button" className="gz-tap mt-2" onClick={() => openItem(lead)}>
                      <h2 className="gz-headline text-[clamp(1.5rem,6.6vw,2.3rem)]">{lead.title}</h2>
                      {leadDeck ? (
                        <p className="gz-deck mt-1.5 text-[clamp(.8rem,3.4vw,1rem)]">{leadDeck}</p>
                      ) : null}
                      <div
                        className="gz-byline mt-2 border-y py-1"
                        style={{ borderColor: "var(--gz-rule)" }}
                      >
                        <span className="gz-src">{lead.source}</span>
                        {lead.publishedAt ? <span>· {formatDate(lead.publishedAt, currentLanguage)}</span> : null}
                      </div>
                      {/* Geniş ekranda panoramik: broadsheet ön sayfasında manşet
                          klişesi sayfanın yarısını kaplamaz. Klişesi olmayan
                          manşet altyazısız, düz metin olarak dizilir. */}
                      {lead.imageUrl ? (
                        <>
                          <PrintedPhoto
                            item={lead}
                            size="large"
                            eager
                            className="mt-2.5 block aspect-[16/9] w-full sm:aspect-[2.6/1]"
                          />
                          <div className="gz-caption">
                            {lead.source}
                            {lead.publishedAt ? ` — ${formatDate(lead.publishedAt, currentLanguage)}` : ""}
                          </div>
                        </>
                      ) : null}
                      {leadBody ? (
                        <>
                          <p
                            className="gz-cols gz-cols--3 gz-just gz-dropcap mt-2.5 text-micro leading-[1.5]"
                            style={{ color: "var(--gz-ink-soft)" }}
                          >
                            {softHyphenate(leadBody)}
                            {leadBodyFull.length > 1100 ? "…" : ""}
                          </p>
                          <div className="gz-jump mt-1">(Devamı için dokunun ⟶)</div>
                        </>
                      ) : (
                        <div className="gz-jump mt-1.5">(Haberin tamamı için dokunun ⟶)</div>
                      )}
                    </button>
                  </section>
                ) : null}

                <div className="gz-rule-thick mt-3" aria-hidden="true" />

                {/* İkinci sıra haberler — kart ızgarası değil, sürekli sütun dizgisi.
                    Klişe yalnızca ilk iki haberde: gerçek ön sayfada her habere
                    fotoğraf konmaz. */}
                <section className="mt-3" aria-label="Diğer haberler">
                  {secondaries.length > 0 ? <div className="gz-kicker">Denizden Havadisler</div> : null}
                  {/* Künye ve ilan kutuları da sütun akışının içinde: gerçek gazetede
                      kutular sayfanın dışında değil, dizginin arasında durur — ayrıca
                      sütunların dengelenmesini sağlayıp altta boşluk bırakmaz. */}
                  <div className="gz-cols gz-cols--2 mt-2.5">
                      {secondaries.map((it) => (
                        <article key={`${it.source}-${it.link}`} className="gz-story">
                          <button type="button" className="gz-tap min-w-0" onClick={() => openItem(it)}>
                            {illustrated.has(it.link) ? (
                              <PrintedPhoto item={it} size="small" className="mb-1.5 block aspect-[3/2] w-full" />
                            ) : null}
                            <h3 className="gz-headline text-[13px] leading-[1.16]">{it.title}</h3>
                            {stripHtml(it.summary) ? (
                              <p
                                className="gz-just mt-1 line-clamp-4 text-micro leading-[1.45]"
                                style={{ color: "var(--gz-ink-soft)" }}
                              >
                                {softHyphenate(stripHtml(it.summary))}
                              </p>
                            ) : null}
                            <div className="gz-byline mt-1.5">
                              <span className="gz-src">{it.source}</span>
                              {it.publishedAt ? <span>· {formatShort(it.publishedAt, currentLanguage)}</span> : null}
                            </div>
                          </button>
                        </article>
                      ))}

                    <div className="gz-box mb-3 break-inside-avoid">
                      <div className="gz-box-title">Bu Nüshada</div>
                      <ul className="space-y-1 text-[9.5px] leading-[1.35]">
                        <li className="flex justify-between gap-2">
                          <span>Manşet</span>
                          <span>{lead ? 1 : 0} haber</span>
                        </li>
                        <li className="flex justify-between gap-2">
                          <span>Denizden Havadisler</span>
                          <span>{secondaries.length} haber</span>
                        </li>
                        <li className="flex justify-between gap-2">
                          <span>Telgraf</span>
                          <span>{briefs.length} havadis</span>
                        </li>
                        {sourceCount > 0 ? (
                          <li className="flex justify-between gap-2">
                            <span>Kaynak</span>
                            <span>{sourceCount} gazete</span>
                          </li>
                        ) : null}
                      </ul>
                    </div>

                    <Link to="/book" className="gz-box mb-3 block break-inside-avoid text-inherit">
                      <div className="gz-box-title">İlan</div>
                      <p className="text-[9.5px] italic leading-[1.45]">
                        <span className="notranslate not-italic" translate="no" lang="en">
                          Mariner&rsquo;s Book
                        </span>{" "}
                        — denizcilik dersleri, stabilite hesaplayıcıları, COLREG ve sözlük. Kitabı açmak için dokunun.
                      </p>
                    </Link>
                  </div>
                </section>

                {/* Kısa havadisler — cetvelli telgraf departmanı */}
                {briefs.length > 0 ? (
                  <section className="mt-4" aria-label="Kısa haberler">
                    <div className="gz-box">
                      <div className="gz-box-title">Telgraf Haberleri</div>
                      <ul className="gz-cols gz-cols--2">
                        {briefs.map((it) => (
                          <li
                            key={`${it.source}-${it.link}`}
                            className="mb-1.5 break-inside-avoid border-b border-dotted border-[rgba(35,28,15,.32)] pb-1.5"
                          >
                            <button type="button" className="gz-tap" onClick={() => openItem(it)}>
                              <span className="line-clamp-3 text-micro font-bold leading-[1.28]">
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
                    </div>
                  </section>
                ) : null}

                {/* Sayfa altı folyosu */}
                <div className="gz-rule-thick mt-5" aria-hidden="true" />
                <div className="gz-folio mt-1">
                  <span className="notranslate" translate="no" lang="en">
                    Mariner&rsquo;s Post
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Sayfa 1</span>
                  <span aria-hidden="true">·</span>
                  <span>Sayı {issueNo}</span>
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
            radial-gradient(120% 70% at 50% 0%, rgba(214,178,110,.05), transparent 58%),
            radial-gradient(130% 100% at 50% 108%, rgba(0,0,0,.34), transparent 62%),
            /* tahta damarı — geniş ve düzensiz aralıklı (eski ince çizgiler
               kadife gibi duruyordu) */
            repeating-linear-gradient(92deg,
              rgba(0,0,0,.13) 0 3px,
              transparent 3px 17px,
              rgba(255,255,255,.016) 17px 20px,
              transparent 20px 41px,
              rgba(0,0,0,.09) 41px 43px,
              transparent 43px 74px),
            /* tahtaların ek yerleri */
            repeating-linear-gradient(90deg,
              rgba(0,0,0,.42) 0 2px,
              transparent 2px 148px),
            linear-gradient(180deg, #33261a 0%, #291e13 52%, #1c150d 100%);
        }
        .gzp-under{
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #e6d9b6 0%, #d6c599 100%);
          box-shadow: 0 12px 22px rgba(0,0,0,.45), inset 0 0 0 1px rgba(120,90,36,.2);
          transform: rotate(-1.15deg) translateY(5px);
        }
        .gzp-under--2{
          background: linear-gradient(180deg, #e1d2ab 0%, #cfbd90 100%);
          transform: rotate(.85deg) translateY(9px);
        }
      `}</style>
    </div>
  );
};

export default MaritimeNews;
