import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchMaritimeNews, type MaritimeNewsItem } from "@/services/maritimeNews";
import { NewsReaderDialog } from "@/components/news/NewsReaderDialog";

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

/** Vintage gazete paneli — haberler eski bir denizci gazetesinin sayfası gibi dizilir. */
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
  const [lead, ...briefs] = items;

  const openItem = (item: MaritimeNewsItem) => {
    setSelected(item);
    setOpen(true);
  };

  const dateline = new Date().toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="flex h-full flex-col px-4 pt-2" aria-label="Denizcilik haberleri">
      <div className="np-shell relative min-h-0 flex-1">
      <div className="np-paper h-full overflow-y-auto">
        {/* Manşet başlığı */}
        <div className="np-topline" aria-hidden="true" />
        <div className="np-masthead notranslate" translate="no" lang="en">
          MARINER&rsquo;S POST
        </div>
        <div className="np-masthead-rule" aria-hidden="true" />
        <div className="np-dateline">
          <span>{dateline}</span>
          <Link to="/maritime-news" className="np-alllink">
            Tüm Sayılar →
          </Link>
        </div>

        {isLoading && (
          <ul className="space-y-3 px-3 pb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="np-skel animate-pulse">
                <div className="h-14 w-16 rounded-sm bg-[rgba(90,61,20,.12)]" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3 w-4/5 rounded-sm bg-[rgba(90,61,20,.12)]" />
                  <div className="h-2 w-2/5 rounded-sm bg-[rgba(90,61,20,.12)]" />
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
            <span className="np-frame">
              {proxyImg(lead.imageUrl, 480) ? (
                <img src={proxyImg(lead.imageUrl, 480)} alt="" loading="lazy" className="np-photo" />
              ) : (
                <div className="np-photo np-photo-fallback" aria-hidden="true">⚓</div>
              )}
            </span>
            <h3 className="np-lead-title">{lead.title}</h3>
            <div className="np-time">{formatRelative(lead.publishedAt)}</div>
          </button>
        )}

        {/* Kısa haberler */}
        <ul>
          {briefs.map((item) => {
            const img = proxyImg(item.imageUrl);
            return (
              <li key={item.link} className="np-brief-row">
                <button type="button" onClick={() => openItem(item)} className="np-brief">
                  <span className="np-frame np-frame--thumb">
                    {img ? (
                      <img src={img} alt="" loading="lazy" className="np-thumb" />
                    ) : (
                      <div className="np-thumb np-thumb-fallback" aria-hidden="true">⚓</div>
                    )}
                  </span>
                  <span className="np-col-rule" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="np-brief-title">{item.title}</span>
                    <span className="np-time">{formatRelative(item.publishedAt)}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Kağıt hamuru taneciği + kenar vinyeti — kaydırmadan bağımsız sabit doku */}
      <div className="np-grain" aria-hidden="true" />
      <div className="np-fold" aria-hidden="true" />
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
          border-radius: 8px;
          background:
            radial-gradient(90% 40% at 50% 0%, rgba(120,80,20,.06), transparent 70%),
            linear-gradient(180deg, #ece4d0 0%, #ddd2b8 100%);
          box-shadow: 0 10px 26px rgba(0,0,0,.45), inset 0 0 14px rgba(90,61,20,.14);
          color: #2b2418;
          font-family: Georgia, 'Times New Roman', serif;
          scrollbar-width: none;
        }
        .np-paper::-webkit-scrollbar{ display: none; }
        /* Kağıt hamuru benekleri (inline SVG feTurbulence) — kaydırma içeriğinin üstünde sabit */
        .np-grain{
          position: absolute;
          inset: 0;
          z-index: 2;
          border-radius: 8px;
          pointer-events: none;
          mix-blend-mode: multiply;
          opacity: .55;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0.1 0.1 0 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
          box-shadow: inset 0 0 20px rgba(90,61,20,.22);
        }
        /* Orta katlama izi + kenar gölgeleri — panel gerçek bir ön sayfa gibi */
        .np-fold{
          position: absolute;
          inset: 0;
          z-index: 2;
          border-radius: 8px;
          pointer-events: none;
          background:
            linear-gradient(180deg, transparent 0 54.6%, rgba(90,61,20,.1) 56.6%, rgba(255,255,255,.32) 57.4%, rgba(90,61,20,.08) 58.4%, transparent 61%),
            linear-gradient(90deg, rgba(90,61,20,.14), transparent 3.5%, transparent 96.5%, rgba(90,61,20,.14));
        }
        /* Basılı fotoğraf çerçevesi: yarım ton baskı tramı */
        .np-frame{ position: relative; display: block; }
        .np-frame--thumb{ flex-shrink: 0; }
        .np-frame::after{
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: multiply;
          opacity: .4;
          background-image: radial-gradient(circle, rgba(43,36,24,.85) .55px, transparent .9px);
          background-size: 2.8px 2.8px;
        }
        .np-topline{
          height: 2px;
          margin: 8px 12px 0;
          background: #2b2418;
          opacity: .75;
        }
        .np-masthead{
          margin-top: 6px;
          text-align: center;
          font-weight: 900;
          font-size: clamp(1.15rem, 5.4vw, 1.5rem);
          letter-spacing: .08em;
          line-height: 1.1;
          color: #2b2418;
        }
        .np-masthead::before{ content: "⚓ "; font-size: .6em; vertical-align: middle; opacity: .7; }
        .np-masthead::after{ content: " ⚓"; font-size: .6em; vertical-align: middle; opacity: .7; }
        .np-masthead-rule{
          margin: 6px 12px 0;
          border-bottom: 3px double rgba(43,36,24,.65);
        }
        .np-dateline{
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 8px;
          margin: 0 12px 8px;
          padding: 4px 2px;
          border-bottom: 1px solid rgba(43,36,24,.35);
          font-size: 9px;
          font-variant: small-caps;
          letter-spacing: .08em;
          color: rgba(43,36,24,.8);
        }
        .np-alllink{
          color: rgba(43,36,24,.8);
          text-decoration: underline dotted rgba(43,36,24,.5);
          text-underline-offset: 2px;
        }
        .np-lead{
          display: block;
          width: calc(100% - 24px);
          margin: 0 12px 10px;
          text-align: left;
        }
        .np-lead:active{ opacity: .7; }
        .np-photo{
          width: 100%;
          aspect-ratio: 3 / 2;
          object-fit: cover;
          border: 1px solid rgba(43,36,24,.4);
          filter: sepia(.5) contrast(.92) saturate(.8);
          display: block;
        }
        .np-photo-fallback{
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          opacity: .45;
          background: repeating-linear-gradient(45deg, rgba(43,36,24,.06) 0 6px, transparent 6px 12px);
          filter: none;
        }
        .np-lead-title{
          margin-top: 7px;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .np-time{
          display: block;
          margin-top: 3px;
          font-size: 9px;
          font-variant: small-caps;
          letter-spacing: .1em;
          color: rgba(43,36,24,.65);
        }
        .np-brief-row .np-brief{
          border-top: 1px dotted rgba(43,36,24,.35);
        }
        .np-brief{
          display: flex;
          align-items: center;
          gap: 8px;
          width: calc(100% - 24px);
          margin: 0 12px;
          padding: 8px 0;
          text-align: left;
        }
        .np-brief:active{ opacity: .7; }
        .np-thumb{
          width: 64px;
          height: 48px;
          flex-shrink: 0;
          object-fit: cover;
          border: 1px solid rgba(43,36,24,.4);
          filter: sepia(.5) contrast(.92) saturate(.8);
        }
        .np-thumb-fallback{
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          opacity: .45;
          background: repeating-linear-gradient(45deg, rgba(43,36,24,.06) 0 6px, transparent 6px 12px);
          filter: none;
        }
        .np-col-rule{
          align-self: stretch;
          width: 1px;
          background: rgba(43,36,24,.25);
          flex-shrink: 0;
        }
        .np-brief-title{
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.35;
        }
        .np-skel{ display: flex; gap: 10px; }
        .np-empty{
          padding: 24px 16px;
          text-align: center;
          font-size: 12px;
          font-style: italic;
          color: rgba(90,61,20,.7);
        }
      `}</style>
    </section>
  );
}
