import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { bookPages } from "@/data/bookContents";

/**
 * Açık kitap görünümü: kapak splash'teki gibi ciltten açılır, ardından
 * İçindekiler sayfaları yatay kaydırmalı kitap sayfaları olarak gezilir.
 * CSS sınıfları `bk-` prefix'lidir (splash'in global `.book*` kurallarıyla çakışmasın).
 */
export default function BookPage() {
  const pagerRef = useRef<HTMLDivElement>(null);
  // Yumuşak kaydırma sürerken ardışık ok basışları kaybolmasın diye hedef sayfa burada tutulur.
  const pendingPageRef = useRef<number | null>(null);
  const settleTimerRef = useRef<number | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [coverDone, setCoverDone] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const el = pagerRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = window.setTimeout(() => {
        pendingPageRef.current = null;
      }, 250);
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const idx = Math.round(el.scrollLeft / el.clientWidth);
        setPageIndex(Math.max(0, Math.min(bookPages.length - 1, idx)));
        ticking = false;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current);
    };
  }, []);

  const stepPage = (delta: number) => {
    const el = pagerRef.current;
    if (!el) return;
    const current = pendingPageRef.current ?? Math.round(el.scrollLeft / el.clientWidth);
    const clamped = Math.max(0, Math.min(bookPages.length - 1, current + delta));
    pendingPageRef.current = clamped;
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div
      className="relative flex min-h-[100svh] flex-col items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(214 84% 8%) 0%, hsl(214 84% 15%) 50%, hsl(200 80% 18%) 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 25%, rgba(56,189,248,0.14) 0%, transparent 55%)",
        }}
      />

      {/* Kapatma: global FloatingNavButtons geri butonu (/book → /) kullanılır */}
      <h1
        className="notranslate z-20 mt-[max(1.1rem,env(safe-area-inset-top))] select-none text-center text-[13px] font-bold tracking-[0.3em] text-amber-200/80"
        translate="no"
        lang="en"
      >
        MARINER&rsquo;S BOOK
      </h1>

      {/* Kitap */}
      <div className="bk-stage z-10 mt-3 flex-1 w-full flex flex-col items-center min-h-0 pb-2">
        <div className="bk-volume">
          {/* Kâğıt + içindekiler pager'ı */}
          <div className="bk-body">
            <div
              ref={pagerRef}
              className="bk-pager no-scrollbar snap-x snap-mandatory"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {bookPages.map((page, i) => (
                <section key={page.id} className="bk-sheet snap-center snap-always">
                  <nav className="bk-page" aria-label={`İçindekiler — ${page.title}`}>
                    {i === 0 ? (
                      <>
                        <header className="bk-toc-header">
                          <div className="bk-toc-rule" />
                          <div className="bk-toc-title">İÇİNDEKİLER</div>
                          <div className="bk-toc-rule" />
                        </header>
                        <div className="bk-fleuron" aria-hidden="true">❦</div>
                      </>
                    ) : (
                      <header className="bk-running-header">İÇİNDEKİLER</header>
                    )}

                    <Link to={page.to} className="bk-chapter">
                      <span className="bk-chapter-numeral">{page.numeral}.</span>
                      <span className="bk-chapter-title">
                        {page.title.toLocaleUpperCase("tr")}
                        {page.continuation ? <em className="bk-cont"> (devam)</em> : null}
                      </span>
                    </Link>
                    <div className="bk-chapter-rule" />

                    {page.sections.map((section, si) => (
                      <div key={si} className="bk-section">
                        {section.heading ? (
                          <div className="bk-section-heading">{section.heading}</div>
                        ) : null}
                        {section.entries.map((entry) => (
                          <Link key={entry.to} to={entry.to} className="bk-entry">
                            <span className="bk-entry-label">{entry.label}</span>
                            <span className="bk-leader" aria-hidden="true" />
                            <span className="bk-anchor" aria-hidden="true">
                              ⚓
                            </span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </nav>
                </section>
              ))}
            </div>
            <div className="bk-ribbon" aria-hidden="true" />
          </div>

          {/* Ciltten açılan kapak */}
          {!coverDone && (
            <div
              className="bk-cover"
              aria-hidden="true"
              onAnimationEnd={() => setCoverDone(true)}
            >
              <div className="bk-cover-face bk-cover-front">
                <div className="bk-trim">
                  <div className="bk-emblem">
                    <svg
                      viewBox="0 0 64 64"
                      width="100%"
                      height="100%"
                      preserveAspectRatio="xMidYMid meet"
                      fill="none"
                      stroke="#daa520"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="32" cy="32" r="20" />
                      <circle cx="32" cy="32" r="6" />
                      <line x1="32" y1="4" x2="32" y2="16" />
                      <line x1="32" y1="48" x2="32" y2="60" />
                      <line x1="4" y1="32" x2="16" y2="32" />
                      <line x1="48" y1="32" x2="60" y2="32" />
                      <line x1="12" y1="12" x2="20" y2="20" />
                      <line x1="44" y1="44" x2="52" y2="52" />
                      <line x1="52" y1="12" x2="44" y2="20" />
                      <line x1="20" y1="44" x2="12" y2="52" />
                    </svg>
                  </div>
                  <div className="bk-cover-title notranslate" translate="no" lang="en">
                    MARINER&rsquo;S
                    <br />
                    BOOK
                  </div>
                </div>
              </div>
              <div className="bk-cover-face bk-cover-back" />
            </div>
          )}
        </div>

        {/* Sayfa göstergesi */}
        <div className="z-20 mt-3 flex items-center gap-3 pb-[max(0.9rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() => stepPage(-1)}
            disabled={pageIndex === 0}
            aria-label="Önceki sayfa"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-all hover:bg-white/15 active:scale-95 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2.25} />
          </button>
          <span className="min-w-[90px] text-center text-[12px] font-medium tracking-wide text-white/80">
            Sayfa {pageIndex + 1} / {bookPages.length}
          </span>
          <button
            type="button"
            onClick={() => stepPage(1)}
            disabled={pageIndex === bookPages.length - 1}
            aria-label="Sonraki sayfa"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-all hover:bg-white/15 active:scale-95 disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <style>{`
        .bk-stage{ perspective: 1600px; perspective-origin: 50% 45%; }
        .bk-volume{
          position: relative;
          width: min(94vw, 460px);
          flex: 1;
          min-height: 0;
          max-height: 100%;
          transform-style: preserve-3d;
        }
        .bk-body{
          position: absolute;
          inset: 0;
          border-radius: 3px 6px 6px 3px;
          background: linear-gradient(180deg, #f3e7c9 0%, #e6d3a8 100%);
          box-shadow: 0 14px 34px rgba(0,0,0,.55), inset 0 0 18px rgba(120,80,20,.18);
          overflow: hidden;
        }
        .bk-body::before{
          content: "";
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 10px;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(90deg, rgba(20,12,2,.5), rgba(20,12,2,.12) 70%, transparent);
          border-radius: 3px 0 0 3px;
        }
        .bk-body::after{
          content: "";
          position: absolute;
          right: 0; top: 1.5%; bottom: 1.5%;
          width: 9px;
          z-index: 2;
          pointer-events: none;
          border-radius: 0 4px 4px 0;
          background: repeating-linear-gradient(90deg, #f0e3c2 0 1.6px, #d5c194 1.6px 3.2px);
        }
        .bk-pager{
          display: flex;
          height: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: smooth;
          overscroll-behavior-x: contain;
        }
        .bk-sheet{
          flex-shrink: 0;
          width: 100%;
          height: 100%;
          padding: 10px 12px 10px 14px;
        }
        /* Hafif eğik sayfalar — elde dikilmiş cilt hissi */
        .bk-sheet:nth-child(odd) .bk-page{ transform: rotate(.15deg); }
        .bk-sheet:nth-child(even) .bk-page{ transform: rotate(-.15deg); }
        .bk-page{
          height: 100%;
          overflow-y: auto;
          border-radius: 2px;
          padding: clamp(14px, 4vw, 22px) clamp(14px, 4.5vw, 24px) 22px;
          background:
            radial-gradient(22% 14% at 82% 12%, rgba(150,100,30,.08), transparent 70%),
            radial-gradient(30% 18% at 12% 78%, rgba(150,100,30,.06), transparent 70%),
            radial-gradient(14% 9% at 60% 45%, rgba(150,100,30,.05), transparent 70%),
            repeating-linear-gradient(180deg, transparent 0 9px, rgba(120,80,20,.07) 9px 10px),
            linear-gradient(180deg, #f8eed4 0%, #eddcb4 100%);
          box-shadow:
            inset 6px 0 10px -6px rgba(90,60,20,.45),
            inset 0 6px 8px -6px rgba(90,60,20,.3),
            inset 0 -6px 8px -6px rgba(90,60,20,.3);
          font-family: Georgia, 'Times New Roman', serif;
          color: #4a3113;
          scrollbar-width: none;
        }
        .bk-page::-webkit-scrollbar{ display: none; }
        .bk-toc-header{
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: clamp(12px, 3vw, 18px);
        }
        .bk-toc-title{
          font-size: clamp(1.05rem, 4.6vw, 1.35rem);
          font-weight: 700;
          letter-spacing: .3em;
          text-indent: .3em;
          text-align: center;
          color: #5a3d14;
        }
        .bk-toc-rule{
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(176,124,32,.65), transparent);
        }
        .bk-fleuron{
          text-align: center;
          color: rgba(90,61,20,.55);
          font-size: 1.1rem;
          line-height: 1;
          margin: -6px 0 10px;
        }
        .bk-running-header{
          margin-bottom: 10px;
          text-align: center;
          font-size: .62rem;
          font-weight: 600;
          letter-spacing: .34em;
          text-indent: .34em;
          color: rgba(90,61,20,.55);
        }
        .bk-running-header::before{ content: "❖  "; opacity: .5; }
        .bk-running-header::after{ content: "  ❖"; opacity: .5; }
        .bk-chapter{
          display: flex;
          align-items: baseline;
          gap: .5em;
          padding: 4px 0;
          text-decoration: none;
          color: #3f2a0e;
        }
        .bk-chapter:active{ opacity: .7; }
        .bk-chapter-numeral{
          font-size: clamp(1rem, 4.2vw, 1.2rem);
          font-weight: 700;
          font-variant-numeric: lining-nums;
          color: #7a5c1a;
          text-shadow: 0 1px 0 rgba(242,217,138,.35);
        }
        .bk-chapter-title{
          font-size: clamp(1rem, 4.2vw, 1.2rem);
          font-weight: 700;
          letter-spacing: .12em;
        }
        .bk-cont{
          font-weight: 400;
          font-style: italic;
          letter-spacing: 0;
          font-size: .8em;
          color: rgba(90,61,20,.7);
        }
        .bk-chapter-rule{
          height: 1px;
          margin: 2px 0 10px;
          background: linear-gradient(90deg, rgba(176,124,32,.7), rgba(176,124,32,.15));
          box-shadow: 0 2px 0 rgba(176,124,32,.2);
        }
        .bk-section + .bk-section{ margin-top: 12px; }
        .bk-section-heading{
          margin: 6px 0 2px;
          font-size: .78rem;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: rgba(90,61,20,.8);
        }
        .bk-entry{
          display: flex;
          align-items: baseline;
          min-height: 40px;
          padding: 6px 0 2px 14px;
          text-decoration: none;
          color: #4a3113;
          font-size: clamp(.86rem, 3.6vw, .95rem);
          line-height: 1.35;
        }
        .bk-entry:active{ opacity: .65; }
        .bk-entry-label{ max-width: 78%; }
        .bk-leader{
          flex: 1;
          min-width: 16px;
          margin: 0 .45em;
          border-bottom: 2px dotted rgba(120,80,20,.45);
          transform: translateY(-3px);
        }
        .bk-anchor{
          font-size: .72em;
          opacity: .65;
        }

        /* Ciltten açılan kapak — splash cover-open ile aynı hareket */
        .bk-cover{
          position: absolute;
          inset: 0;
          z-index: 5;
          transform-style: preserve-3d;
          transform-origin: left center;
          transform: rotateY(0);
          animation: bk-cover-open .95s cubic-bezier(.72,.04,.22,1) .15s forwards;
          will-change: transform;
          pointer-events: none;
        }
        .bk-cover-face{
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 3px 7px 7px 3px;
          overflow: hidden;
        }
        .bk-cover-front{
          background:
            radial-gradient(60% 45% at 0% 0%, rgba(140,100,40,.16), transparent 70%),
            radial-gradient(60% 45% at 100% 100%, rgba(140,100,40,.14), transparent 70%),
            radial-gradient(130% 110% at 50% 38%, transparent 52%, rgba(0,0,0,.42) 100%),
            repeating-linear-gradient(115deg, rgba(255,255,255,.02) 0 2px, transparent 2px 6px),
            repeating-linear-gradient(24deg, rgba(255,255,255,.02) 0 2px, transparent 2px 7px),
            linear-gradient(140deg, #0f3668 0%, #0a274f 46%, #05172f 100%);
          border: 1px solid rgba(202,160,68,.45);
          box-shadow: inset 0 0 26px rgba(0,0,0,.45), 0 8px 22px rgba(0,0,0,.5);
          transform: translateZ(.6px);
        }
        .bk-cover-front::before{
          content: "";
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 8%;
          background: linear-gradient(90deg, rgba(0,0,0,.5), transparent);
          border-right: 1px solid rgba(218,165,32,.22);
        }
        .bk-cover-back{
          background:
            repeating-linear-gradient(180deg, transparent 0 9px, rgba(120,80,20,.06) 9px 10px),
            linear-gradient(180deg, #f6ebd0 0%, #e9d7ae 100%);
          transform: rotateY(180deg) translateZ(.6px);
          border-radius: 7px 3px 3px 7px;
          box-shadow: inset 0 0 16px rgba(120,80,20,.22);
        }
        .bk-trim{
          position: absolute;
          inset: 6.5%;
          border: 1.5px solid rgba(218,165,32,.55);
          border-radius: 3px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: clamp(6px, 2vh, 12px);
        }
        .bk-trim::after{
          content: "";
          position: absolute;
          inset: 2.5%;
          border: 1px solid rgba(218,165,32,.28);
          border-radius: 2px;
        }
        .bk-emblem{
          width: 30%;
          aspect-ratio: 1;
          filter: drop-shadow(0 0 6px rgba(218,165,32,.5));
        }
        .bk-emblem svg{ display: block; }
        .bk-cover-title{
          font-family: Georgia, 'Times New Roman', serif;
          font-weight: 700;
          text-align: center;
          letter-spacing: .14em;
          line-height: 1.45;
          font-size: clamp(.85rem, 4.4vw, 1.2rem);
          color: #d9b258;
          background: linear-gradient(180deg, #f2d98a 0%, #caa044 60%, #f2d98a 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        /* Kırmızı kurdele ayraç — kapağın (z-5) altında, dokunuşları engellemez */
        .bk-ribbon{
          position: absolute;
          top: -2px;
          right: 12%;
          width: 16px;
          height: 64px;
          z-index: 3;
          pointer-events: none;
          background: linear-gradient(90deg, #7a1a1a, #a83232 45%, #7a1a1a);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 86%, 0 100%);
          box-shadow: 0 3px 5px rgba(0,0,0,.35);
        }
        @keyframes bk-cover-open{ to{ transform: rotateY(-178deg); } }
        .no-scrollbar::-webkit-scrollbar{ display: none; }
        .no-scrollbar{ scrollbar-width: none; -ms-overflow-style: none; }
        @media (prefers-reduced-motion: reduce){
          .bk-cover{ animation-duration: .01s !important; animation-delay: 0s !important; }
          .bk-pager{ scroll-behavior: auto; }
        }
      `}</style>
    </div>
  );
}
