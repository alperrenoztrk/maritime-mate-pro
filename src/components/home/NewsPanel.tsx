import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchMaritimeNews, type MaritimeNewsItem } from "@/services/maritimeNews";
import { NewsReaderDialog } from "@/components/news/NewsReaderDialog";
import { NewspaperStyles } from "@/components/news/NewspaperStyles";

function formatRelative(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const diffMin = Math.round((Date.now() - d.getTime()) / 60000);
  if (diffMin < 1) return "şimdi";
  if (diffMin < 60) return `${diffMin} dk önce`;
  const h = Math.round(diffMin / 60);
  if (h < 24) return `${h} sa önce`;
  const days = Math.round(h / 24);
  if (days < 7) return `${days} gün önce`;
  return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
}

function proxyImg(url?: string, w = 240): string | undefined {
  if (!url) return undefined;
  try {
    const u = url.startsWith("//") ? `https:${url}` : url;
    return `https://images.weserv.nl/?url=${encodeURIComponent(u.replace(/^https?:\/\//, ""))}&w=${w}&h=${Math.round(w * (2 / 3))}&fit=cover&output=webp&q=70`;
  } catch {
    return undefined;
  }
}

/**
 * Vintage gazete paneli — haberler eski bir denizci gazetesinin sayfası gibi dizilir.
 * Kağıt, doku, yarım ton tramı ve yazı tipleri `NewspaperStyles` (`gz-` prefix)
 * içinden geliyor; burada yalnızca panele özgü yerleşim tanımlı (`np-` prefix).
 */
export function NewsPanel() {
  const [selected, setSelected] = useState<MaritimeNewsItem | null>(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["maritime-news", "home-panel"],
    queryFn: () => fetchMaritimeNews(),
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  const items: MaritimeNewsItem[] = (data?.items ?? []).slice(0, 10);
  // Panelin en büyük görseli boş kalmasın: manşet, klişesi olan ilk haber olur.
  // Hiçbirinde görsel yoksa ilk habere düşülür ve klişesiz dizilir.
  const leadIndex = Math.max(0, items.findIndex((it) => Boolean(it.imageUrl)));
  const lead = items[leadIndex];
  const briefs = items.filter((_, i) => i !== leadIndex);

  const openItem = (item: MaritimeNewsItem) => {
    setSelected(item);
    setOpen(true);
  };

  const dateline = new Date().toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const leadImg = proxyImg(lead?.imageUrl, 480);

  return (
    <section className="flex h-full flex-col px-4 pt-2" aria-label="Denizcilik haberleri">
      <NewspaperStyles />

      <div className="relative min-h-0 flex-1">
        <div className="gz-sheet np-paper h-full overflow-y-auto">
          {/* Manşet başlığı */}
          <div className="np-head">
            <div className="gz-rule-thin" aria-hidden="true" />
            <div className="gz-masthead np-masthead notranslate" translate="no" lang="en">
              Mariner&rsquo;s Post
            </div>
            <div className="gz-rule-double mt-1.5" aria-hidden="true" />
            <div className="gz-dateline">
              <span>{dateline}</span>
              <Link to="/maritime-news" className="np-alllink">
                Tüm Sayılar →
              </Link>
            </div>
            <div className="gz-rule-thick" aria-hidden="true" />
          </div>

          {isLoading && (
            <ul className="space-y-3 px-3 pb-4 pt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="np-skel animate-pulse">
                  <div className="gz-skel h-14 w-16" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="gz-skel h-3 w-4/5" />
                    <div className="gz-skel h-2 w-2/5" />
                  </div>
                </li>
              ))}
            </ul>
          )}

          {isError && <p className="np-empty">Haberler şu an alınamıyor.</p>}

          {!isLoading && !isError && items.length === 0 && (
            <p className="np-empty">Şu an gösterilecek haber yok.</p>
          )}

          {/* Manşet haber */}
          {lead && (
            <button type="button" onClick={() => openItem(lead)} className="np-lead">
              {leadImg ? (
                <span className="gz-photo-wrap block aspect-[3/2] w-full">
                  <img src={leadImg} alt="" loading="lazy" className="gz-photo" />
                </span>
              ) : null}
              <h2 className="gz-headline np-lead-title">{lead.title}</h2>
              <span className="gz-byline np-time">{formatRelative(lead.publishedAt)}</span>
            </button>
          )}

          {/* Kısa haberler */}
          <ul>
            {briefs.map((item) => {
              const img = proxyImg(item.imageUrl);
              return (
                <li key={item.link} className="np-brief-row">
                  <button type="button" onClick={() => openItem(item)} className="np-brief">
                    {/* Klişesi olmayan kısa haber boş kutu yerine düz metin dizilir */}
                    {img ? (
                      <>
                        <span className="gz-photo-wrap np-thumb">
                          <img src={img} alt="" loading="lazy" className="gz-photo" />
                        </span>
                        <span className="np-col-rule" aria-hidden="true" />
                      </>
                    ) : null}
                    <span className="min-w-0 flex-1">
                      <span className="np-brief-title">{item.title}</span>
                      <span className="gz-byline np-time">{formatRelative(item.publishedAt)}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Kağıt dokusu + katlama izi — kaydırmadan bağımsız, sayfanın üstünde sabit */}
        <div className="gz-grain" aria-hidden="true" />
        <div className="gz-fold" aria-hidden="true" />
      </div>

      <NewsReaderDialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) setSelected(null);
        }}
        item={selected}
      />

      <style>{`
        .np-paper{
          scrollbar-width: none;
        }
        .np-paper::-webkit-scrollbar{ display: none; }
        .np-head{ padding: 8px 12px 0; }
        /* Ortak manşet punto ölçeği panel için fazla büyük */
        .np-masthead{ font-size: clamp(1.3rem, 6.4vw, 1.85rem); }
        .np-alllink{
          color: var(--gz-ink-soft);
          text-decoration: underline dotted rgba(35,28,15,.5);
          text-underline-offset: 2px;
        }
        .np-lead{
          display: block;
          width: calc(100% - 24px);
          margin: 9px 12px 10px;
          text-align: left;
          color: inherit;
        }
        .np-lead:active{ opacity: .7; }
        .np-lead-title{
          margin-top: 6px;
          font-size: 15px;
          line-height: 1.18;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .np-time{ margin-top: 3px; }
        .np-brief{
          display: flex;
          align-items: center;
          gap: 8px;
          width: calc(100% - 24px);
          margin: 0 12px;
          padding: 8px 0;
          text-align: left;
          color: inherit;
        }
        .np-brief:active{ opacity: .7; }
        .np-brief-row .np-brief{ border-top: 1px dotted rgba(35,28,15,.32); }
        .np-thumb{
          width: 64px;
          height: 48px;
          flex-shrink: 0;
        }
        .np-col-rule{
          align-self: stretch;
          width: 1px;
          background: rgba(35,28,15,.25);
          flex-shrink: 0;
        }
        .np-brief-title{
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-family: var(--gz-face-display);
          font-weight: 700;
          font-size: 12px;
          line-height: 1.28;
        }
        .np-skel{ display: flex; gap: 10px; }
        .np-empty{
          padding: 24px 16px;
          text-align: center;
          font-size: 12px;
          font-style: italic;
          color: var(--gz-ink-faint);
        }
      `}</style>
    </section>
  );
}
