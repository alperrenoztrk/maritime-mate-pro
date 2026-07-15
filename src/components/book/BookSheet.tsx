import { createContext, useContext, type ReactNode } from "react";
import type { BookInteractionMode } from "@/lib/bookRoutes";

const BookSheetNestingContext = createContext(false);

interface BookSheetProps {
  title: string;
  children: ReactNode;
  /** Persistent route frame: compact open book and legacy-screen normalization. */
  routeFrame?: boolean;
  /** Stable route key that restarts the decorative page-turn animation. */
  pageKey?: string;
  /** Even page number printed on the left leaf. */
  pageNumber?: number;
  /** Reading pages are inert; calculators, quizzes and assistants keep controls. */
  interactionMode?: BookInteractionMode;
}

/** Shared physical open-book surface for every educational route. */
export function BookSheet({
  title,
  children,
  routeFrame = false,
  pageKey,
  pageNumber = 2,
  interactionMode = "reading",
}: BookSheetProps) {
  const alreadyInsideBook = useContext(BookSheetNestingContext);

  if (alreadyInsideBook) return <>{children}</>;

  const leftPage = pageNumber % 2 === 0 ? pageNumber : pageNumber - 1;

  return (
    <div
      className={`bs-stage ${routeFrame ? "bs-route-frame" : ""}`}
      data-book-route={routeFrame || undefined}
      data-book-mode={interactionMode}
    >
      <div className="bs-cover-board">
        <div className={`bs-volume ${routeFrame ? "bs-volume--route" : ""}`}>
          <div className="bs-spread">
            <header className="bs-running bs-running--left">MARINER&rsquo;S BOOK</header>
            <header className="bs-running bs-running--right">{title}</header>

            <BookSheetNestingContext.Provider value>
              <main
                key={pageKey ?? "book-sheet"}
                className={`bs-spread-content ${routeFrame ? "bs-route-content" : ""}`}
              >
                {children}
              </main>
            </BookSheetNestingContext.Provider>

            <footer className="bs-folio bs-folio--left" aria-label={`Sayfa ${leftPage}`}>
              {leftPage}
            </footer>
            <footer className="bs-folio bs-folio--right" aria-label={`Sayfa ${leftPage + 1}`}>
              {leftPage + 1}
            </footer>

            {pageKey && <span key={`turn-${pageKey}`} className="bs-turning-leaf" aria-hidden="true" />}
          </div>
        </div>
      </div>

      <style>{`
        .bs-stage{
          position: relative;
          display: flex;
          align-items: center;
          min-height: 100svh;
          padding: max(3.15rem, calc(env(safe-area-inset-top) + 2.6rem)) clamp(5px, 1.3vw, 18px) max(4.6rem, calc(env(safe-area-inset-bottom) + 3.8rem));
          isolation: isolate;
          background:
            radial-gradient(ellipse at 50% 16%, rgba(54,142,190,.2), transparent 48%),
            linear-gradient(180deg, #07182d 0%, #0a2744 54%, #061523 100%);
        }
        .bs-cover-board{
          position: relative;
          width: min(94vw, 820px);
          margin: 0 auto;
          padding: clamp(5px, .8vw, 11px);
          border-radius: 8px 12px 12px 8px;
          background:
            radial-gradient(80% 50% at 50% 0%, rgba(213,173,78,.1), transparent 70%),
            repeating-linear-gradient(24deg, rgba(255,255,255,.018) 0 2px, transparent 2px 8px),
            linear-gradient(145deg, #0e3767, #071f42 55%, #041329);
          border: 1px solid rgba(207,164,65,.42);
          box-shadow: 0 22px 58px rgba(0,0,0,.58), inset 0 0 28px rgba(0,0,0,.62);
        }
        .bs-cover-board::before,
        .bs-cover-board::after{
          content: "";
          position: absolute;
          width: 18px;
          height: 18px;
          border-color: rgba(218,177,76,.62);
          pointer-events: none;
        }
        .bs-cover-board::before{ left: 9px; top: 9px; border-left: 1px solid; border-top: 1px solid; }
        .bs-cover-board::after{ right: 9px; bottom: 9px; border-right: 1px solid; border-bottom: 1px solid; }
        .bs-volume{
          position: relative;
          width: 100%;
          border-radius: 3px 7px 7px 3px;
          perspective: 1900px;
          transform-style: preserve-3d;
          background: #d7c08d;
          box-shadow: 0 8px 18px rgba(0,0,0,.45);
        }
        .bs-volume::before,
        .bs-volume::after{
          content: "";
          position: absolute;
          z-index: 3;
          top: 1.2%;
          bottom: 1.2%;
          width: 8px;
          pointer-events: none;
          background: repeating-linear-gradient(90deg, #f1e4c4 0 1.4px, #cdb883 1.4px 2.8px);
        }
        .bs-volume::before{ left: -1px; border-radius: 3px 0 0 3px; }
        .bs-volume::after{ right: -1px; border-radius: 0 5px 5px 0; }
        .bs-spread{
          position: relative;
          display: grid;
          grid-template-columns: minmax(0,1fr) minmax(0,1fr);
          grid-template-rows: auto minmax(1px,1fr) auto;
          height: clamp(300px, min(64svh, 72vw), 560px);
          min-height: 0;
          overflow: hidden;
          border-radius: 3px 6px 6px 3px;
          padding: clamp(16px, 2.3vw, 34px) clamp(14px, 2.8vw, 42px) 18px;
          color: #432d12;
          font-family: Georgia, 'Times New Roman', serif;
          background:
            radial-gradient(18% 13% at 12% 17%, rgba(137,82,23,.07), transparent 72%),
            radial-gradient(20% 14% at 86% 74%, rgba(137,82,23,.075), transparent 72%),
            linear-gradient(90deg,
              #e6d3a7 0%, #f7edd1 2.2%, #fbf2d9 43%, #e1cca0 49.2%,
              #b69a69 49.86%, #8e7248 50%, #b99d6d 50.16%, #e2cea3 50.8%,
              #fbf2d9 57%, #f7edd1 97.8%, #e1cca0 100%);
          box-shadow:
            inset 18px 0 20px -18px rgba(70,43,14,.48),
            inset -18px 0 20px -18px rgba(70,43,14,.48),
            inset 0 9px 12px -10px rgba(70,43,14,.45),
            inset 0 -10px 12px -10px rgba(70,43,14,.42);
        }
        .bs-spread::before{
          content: "";
          position: absolute;
          z-index: 2;
          pointer-events: none;
          top: 0; bottom: 0; left: 50%;
          width: clamp(22px, 3.6vw, 54px);
          transform: translateX(-50%);
          background: linear-gradient(90deg, transparent, rgba(74,45,15,.24) 40%, rgba(255,248,224,.22) 52%, rgba(74,45,15,.18) 62%, transparent);
          mix-blend-mode: multiply;
        }
        .bs-spread::after{
          content: "";
          position: absolute;
          inset: 8px;
          pointer-events: none;
          border: 1px solid rgba(123,82,25,.13);
          box-shadow: inset 0 0 28px rgba(125,82,24,.08);
        }
        .bs-running{
          position: relative;
          z-index: 3;
          min-width: 0;
          padding-bottom: 9px;
          text-align: center;
          font-size: clamp(.48rem, .85vw, .68rem);
          font-weight: 600;
          letter-spacing: .27em;
          text-indent: .27em;
          color: rgba(82,53,18,.58);
          border-bottom: 1px solid rgba(126,83,27,.15);
        }
        .bs-running--left{ padding-right: clamp(13px, 3.5vw, 50px); }
        .bs-running--right{ padding-left: clamp(13px, 3.5vw, 50px); }
        .bs-running::before{ content: "❖  "; opacity: .45; }
        .bs-running::after{ content: "  ❖"; opacity: .45; }
        .bs-spread-content{
          position: relative;
          z-index: 1;
          grid-column: 1 / -1;
          min-width: 0;
          min-height: 0;
          max-width: 100%;
          overflow: auto;
          overscroll-behavior: contain;
          overflow-wrap: anywhere;
          scrollbar-width: thin;
          scrollbar-color: rgba(96,63,21,.38) transparent;
          padding: clamp(12px, 1.8vw, 26px) 0 16px;
          columns: 2;
          column-gap: clamp(34px, 7.2vw, 108px);
          column-fill: balance;
          font-size: clamp(.66rem, 1.08vw, .93rem);
          line-height: 1.58;
          animation: bs-ink-settle .42s ease-out both;
        }
        .bs-folio{
          position: relative;
          z-index: 3;
          padding-top: 8px;
          font-size: clamp(.55rem, .9vw, .72rem);
          font-variant-numeric: oldstyle-nums;
          color: rgba(77,49,16,.66);
          border-top: 1px solid rgba(126,83,27,.14);
        }
        .bs-folio--left{ text-align: left; padding-right: clamp(13px, 3.5vw, 50px); }
        .bs-folio--right{ text-align: right; padding-left: clamp(13px, 3.5vw, 50px); }
        .bs-turning-leaf{
          position: absolute;
          z-index: 9;
          top: 0; right: 0; bottom: 0;
          width: 50%;
          pointer-events: none;
          transform-origin: left center;
          backface-visibility: hidden;
          border-radius: 0 5px 5px 0;
          background:
            linear-gradient(90deg, rgba(93,63,25,.22), transparent 12%),
            linear-gradient(90deg, #ead9b4, #faf0d5 13%, #f4e4c3 100%);
          box-shadow: -12px 5px 26px rgba(53,32,9,.3);
          animation: bs-turn-page .68s cubic-bezier(.64,.02,.24,1) both;
          will-change: transform, opacity;
        }
        @keyframes bs-turn-page{
          0%{ transform: rotateY(0deg); opacity: .92; }
          58%{ opacity: .74; }
          100%{ transform: rotateY(-178deg); opacity: 0; }
        }
        @keyframes bs-ink-settle{
          from{ opacity: .35; transform: translateX(8px); }
          to{ opacity: 1; transform: translateX(0); }
        }

        .bs-fleuron{ text-align:center; color:rgba(90,61,20,.55); font-size:1.05rem; line-height:1; margin:4px 0 10px; }
        .bs-chapter{ display:flex; align-items:center; gap:.5em; width:100%; margin:0; padding:7px 0 4px; text-align:left; font:700 clamp(.84rem,1.4vw,1.08rem)/1.25 Georgia,'Times New Roman',serif; letter-spacing:.1em; color:#3f2a0e; text-decoration:none; }
        .bs-chapter-rule{ height:1px; margin:0 0 8px; background:linear-gradient(90deg,rgba(176,124,32,.7),rgba(176,124,32,.15)); box-shadow:0 2px 0 rgba(176,124,32,.15); }
        .bs-section{ margin:12px 0 3px; font-size:.72rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:rgba(90,61,20,.82); }
        .bs-entry{ display:flex; align-items:baseline; width:100%; min-height:34px; padding:6px 0 3px 10px; text-align:left; text-decoration:none; color:#4a3113; font-family:Georgia,'Times New Roman',serif; font-size:.86em; line-height:1.35; }
        .bs-entry:focus-visible{ outline:2px dotted rgba(74,49,19,.6); outline-offset:2px; }
        .bs-entry-label{ max-width:78%; }
        .bs-leader{ flex:1; min-width:12px; margin:0 .45em; border-bottom:2px dotted rgba(120,80,20,.4); transform:translateY(-3px); }
        .bs-anchor{ font-size:.72em; opacity:.65; }
        .bs-note{ font-size:.7em; font-style:italic; color:rgba(90,61,20,.65); }
        .bs-text{ color:#4a3113; }
        .bs-muted{ color:rgba(90,61,20,.72); }
        .bs-hairline{ height:1px; border:0; border-bottom:1px dotted rgba(120,80,20,.35); }
        .bs-h2{ margin:14px 0 5px; padding-bottom:3px; font:700 clamp(.88rem,1.5vw,1.08rem)/1.3 Georgia,'Times New Roman',serif; letter-spacing:.05em; color:#3f2a0e; border-bottom:1px solid rgba(176,124,32,.45); }
        .bs-prose{ color:#4a3113; font-family:Georgia,'Times New Roman',serif; font-size:.9em; line-height:1.66; }
        .bs-prose p{ margin:6px 0; }
        .bs-prose strong,.bs-prose b{ color:#3f2a0e; }
        .bs-prose ul,.bs-prose ol{ margin:6px 0 6px 18px; }
        .bs-prose ul{ list-style:disc; }
        .bs-prose ol{ list-style:decimal; }
        .bs-prose li{ margin:3px 0; }
        .bs-prose li::marker{ color:rgba(120,80,20,.72); }
        .bs-prose h3,.bs-prose h4{ margin:10px 0 4px; font-weight:700; color:#3f2a0e; }
        .bs-prose a{ color:#6e4a12; text-decoration:underline dotted; text-underline-offset:2px; }
        .bs-prose img,.bs-photo{ max-width:100%; filter:sepia(.42) contrast(.94) saturate(.82); border:1px solid rgba(74,49,19,.35); }
        .bs-formula{ break-inside:avoid; margin:9px 0; padding:9px 12px; border:1px solid rgba(120,80,20,.42); background:rgba(255,255,255,.26); color:#3f2a0e; }
        .bs-formula::before{ content:"Formül"; display:block; margin-bottom:3px; font-size:.58rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:rgba(90,61,20,.65); }
        .bs-formula-expression{ padding:8px 0; text-align:center; font-size:1.08em; font-weight:700; }
        .bs-table-wrap{ overflow-x:auto; margin:9px 0; break-inside:avoid; }
        .bs-table-caption{ padding:4px 2px; font-size:.72em; font-weight:700; font-style:italic; color:rgba(90,61,20,.72); }
        .bs-table{ width:100%; table-layout:fixed; border-collapse:collapse; font:normal .78em/1.4 Georgia,'Times New Roman',serif; color:#4a3113; }
        .bs-table th{ padding:5px 7px; text-align:left; font-size:.84em; letter-spacing:.08em; text-transform:uppercase; border-bottom:1.5px solid rgba(120,80,20,.5); }
        .bs-table td{ padding:5px 7px; vertical-align:top; border-bottom:1px dotted rgba(120,80,20,.34); }
        .bs-callout{ break-inside:avoid; margin:8px 0; padding:7px 10px 7px 12px; border-left:3px solid rgba(120,80,20,.58); background:rgba(120,80,20,.055); font-size:.88em; color:#4a3113; }
        .bs-callout--warning{ border-left-color:#8f1f1f; background:rgba(143,31,31,.045); }
        .bs-callout-label{ display:block; margin-bottom:2px; font-size:.6rem; font-weight:700; letter-spacing:.17em; text-transform:uppercase; color:rgba(90,61,20,.72); }
        .bs-example + .bs-example{ margin-top:8px; padding-top:8px; border-top:1px dotted rgba(120,80,20,.34); }
        .bs-input{ width:100%; border:0; border-bottom:1.5px solid rgba(74,49,19,.5); border-radius:0; background:transparent; color:#4a3113; padding:6px 24px; font:normal .9rem Georgia,'Times New Roman',serif; }
        .bs-input:focus{ outline:none; border-bottom-color:#4a3113; }
        .bs-chip{ display:inline-flex; align-items:center; padding:3px 8px; border:1px dotted rgba(120,80,20,.55); border-radius:2px; background:transparent; color:rgba(74,49,19,.82); font:600 9px/1.3 Georgia,'Times New Roman',serif; letter-spacing:.07em; text-transform:uppercase; }
        .bs-chip--on{ border-style:solid; background:#4a3113; color:#f3e7c9; }
        .bs-btn,.bs-btn--ghost{ display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:7px 13px; border:1px solid #4a3113; border-radius:2px; background:#4a3113; color:#f3e7c9; font:600 .8rem Georgia,'Times New Roman',serif; text-decoration:none; }
        .bs-btn--ghost{ border-style:dotted; background:transparent; color:#4a3113; }
        .bs-btn:disabled,.bs-btn--ghost:disabled{ opacity:.4; }
        .bs-sticky{ position:sticky; top:0; z-index:5; padding:6px 0; background:rgba(247,237,209,.96); border-bottom:1px dotted rgba(120,80,20,.4); }

        .bs-open-sections{ display:block; }
        .bs-reading-section{ display:block; margin:0 0 18px; padding:0 0 12px; border-bottom:1px dotted rgba(120,80,20,.42); }
        .bs-reading-heading{ display:flex; align-items:flex-start; gap:8px; margin:0 0 8px; padding:7px 0; color:#3f2a0e; border-bottom:1px solid rgba(176,124,32,.35); }
        .bs-reading-heading h2,.bs-reading-heading:is(h2){ flex:1; margin:0; font-size:1.02em; font-weight:700; letter-spacing:.045em; }
        .bs-reading-number{ display:inline-flex; align-items:center; justify-content:center; min-width:20px; color:#7a5c1a; font-weight:700; }
        .bs-topic-article{ content-visibility:auto; contain-intrinsic-size:auto 320px; break-inside:avoid; margin:0 0 13px; padding:8px 0 11px; border-bottom:1px dotted rgba(120,80,20,.3); }
        .bs-topic-article h3{ margin:0 0 5px; color:#3f2a0e; font-size:.98em; font-weight:700; line-height:1.35; }
        .bs-topic-kicker{ margin:0 0 3px; color:#7a5c1a; font-size:.64em; font-weight:700; letter-spacing:.14em; text-transform:uppercase; }
        .bs-topic-introduction{ margin-bottom:10px !important; font-style:italic; color:rgba(74,49,19,.84); }
        .bs-topic-figure{ break-inside:avoid; margin:9px 0; }
        .bs-topic-figure img{ display:block; width:100%; max-height:390px; object-fit:contain; }
        .bs-topic-figure figcaption{ display:grid; gap:2px; padding:5px 2px; color:rgba(90,61,20,.7); font-size:.72em; line-height:1.35; }
        .bs-photo-grid{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; }
        .bs-reading-empty{ display:flex; align-items:baseline; gap:8px; padding:5px 0; color:rgba(90,61,20,.55); font-size:.8em; border-bottom:1px dotted rgba(120,80,20,.22); }
        .bs-reading-empty p{ flex:1; }
        .bs-reading-empty em{ font-size:.78em; }
        .bs-reading-resources{ break-inside:avoid; margin-top:16px; padding-top:10px; border-top:1px solid rgba(120,80,20,.38); }

        .bs-route-content{ min-width:0; max-width:100%; overflow-wrap:anywhere; color:#4a3113; }
        .bs-route-content :where(p,h1,h2,h3,h4,h5,h6,li,a,span,strong,em,code,pre,td,th){ overflow-wrap:anywhere; word-break:break-word; }
        .bs-route-content :where(pre){ max-width:100%; white-space:pre-wrap; }
        .bs-route-content :where(img,video,canvas,svg,iframe){ max-width:100%!important; }
        .bs-route-content :where(table){ max-width:100%; table-layout:fixed; }
        .bs-route-content :where([class*="w-screen"],[class*="min-w-"]){ min-width:0!important; max-width:100%!important; }
        .bs-route-content :where(.marine-shell){ min-height:0!important; overflow:visible!important; background:transparent!important; color:#4a3113!important; }
        .bs-route-content .marine-shell > .pointer-events-none{ display:none!important; }
        .bs-route-content .marine-shell main{ min-height:0!important; max-width:none!important; padding:0!important; }
        .bs-route-content :where(.min-h-screen,[class*="min-h-[100svh]"],[class*="min-h-[100vh]"]){ min-height:0!important; background:transparent!important; background-image:none!important; }
        .bs-route-content :where(.container){ max-width:none!important; padding-left:0!important; padding-right:0!important; }
        .bs-route-content :where(.text-foreground,.text-card-foreground,.text-slate-900,.text-slate-800,.text-gray-900,.text-gray-800,.text-black){ color:#4a3113!important; }
        .bs-route-content :where(.text-muted-foreground,.text-slate-600,.text-slate-500,.text-gray-600,.text-gray-500){ color:rgba(90,61,20,.72)!important; }
        .bs-route-content :where(.bg-background,.bg-card,[class*="bg-card/"],.bg-white,[class*="bg-white/"],.bg-muted,[class*="bg-muted/"]){ background:rgba(255,255,255,.16)!important; background-image:none!important; backdrop-filter:none!important; }
        .bs-route-content :where(.shadow,.shadow-sm,.shadow-md,.shadow-lg,.shadow-xl,.shadow-2xl){ box-shadow:none!important; }
        .bs-route-content :where(input,textarea,select,[role="combobox"]){ border-color:rgba(120,80,20,.45)!important; background:rgba(255,255,255,.22)!important; color:#3f2a0e!important; }
        .bs-route-content :where(th,td){ border-color:rgba(120,80,20,.34)!important; }

        /* Printed-page contract: only answer-producing routes expose controls. */
        [data-book-mode="reading"] .bs-route-content button{
          display:contents!important;
          pointer-events:none!important;
          cursor:default!important;
          appearance:none!important;
        }
        [data-book-mode="reading"] .bs-route-content :where(input,textarea,select,[role="combobox"],[role="switch"],[role="slider"]){ display:none!important; }
        [data-book-mode="reading"] .bs-route-content :where([data-state="closed"],[hidden]){ display:block!important; height:auto!important; max-height:none!important; opacity:1!important; overflow:visible!important; }
        [data-book-mode="reading"] .bs-route-content :where(.rounded-lg,.rounded-xl,.rounded-2xl){ border-radius:0!important; }
        [data-book-mode="reading"] .bs-route-content :where([role="tablist"],[role="toolbar"]){ display:block!important; position:static!important; }
        [data-book-mode="reading"] .bs-route-content :where(.fixed:not([role="dialog"])){ position:static!important; inset:auto!important; }

        body.book-route-active [role="dialog"]:not(.marine-keep){ border-color:rgba(120,80,20,.45)!important; background:#f6ecd0!important; color:#4a3113!important; }

        @media (max-width: 720px){
          .bs-stage{ padding-left:2px; padding-right:2px; }
          .bs-cover-board{ width:100%; padding:4px; border-radius:5px; }
          .bs-spread{ height:clamp(300px,min(58svh,78vw),430px); min-height:0; padding:12px 9px 12px; }
          .bs-spread-content{ column-gap:28px; font-size:clamp(.58rem,2.25vw,.72rem); line-height:1.5; }
          .bs-running--left,.bs-folio--left{ padding-right:14px; }
          .bs-running--right,.bs-folio--right{ padding-left:14px; }
          .bs-photo-grid{ grid-template-columns:1fr; }
          .bs-entry{ min-height:28px; padding-left:4px; }
          .bs-callout{ padding:6px 7px; }
        }
        @media (prefers-reduced-motion: reduce){
          .bs-turning-leaf{ animation:none!important; display:none; }
          .bs-spread-content{ animation:none!important; }
        }
        @media print{
          .bs-stage{ min-height:0!important; padding:0!important; background:white!important; }
          .bs-cover-board,.bs-volume,.bs-spread{ width:100%!important; max-width:none!important; height:auto!important; min-height:0!important; padding:8mm!important; border:0!important; background:white!important; box-shadow:none!important; }
          .bs-cover-board::before,.bs-cover-board::after,.bs-volume::before,.bs-volume::after,.bs-spread::before,.bs-spread::after,.bs-turning-leaf{ display:none!important; }
          .bs-spread-content{ overflow:visible!important; columns:2; column-gap:16mm; animation:none!important; }
        }
      `}</style>
    </div>
  );
}
