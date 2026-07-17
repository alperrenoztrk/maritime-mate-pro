import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type MutableRefObject,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type WheelEvent as ReactWheelEvent,
} from "react";
import type { BookVolumeDescriptor } from "@/data/bookVolumes";
import type { BookInteractionMode } from "@/lib/bookRoutes";
import {
  getBookTurnProgress,
  getBookTurnSettleDuration,
  shouldCompleteBookTurn,
  type BookTurnDirection,
} from "@/lib/bookMotion";
import {
  getBookSurfaceOrientation,
  mapBookDelta,
  mapBookPointToLocal,
  type BookSurfaceOrientation,
} from "@/lib/bookOrientation";
import { BookLandscapeGate } from "@/components/book/BookLandscapeGate";

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
  /** Physical cover identity for subject-specific route volumes. */
  volume?: BookVolumeDescriptor;
}

interface LeafPagerHandle {
  step: (direction: BookTurnDirection) => void;
}

const clampNumber = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

/** Shared physical open-book surface for every educational route. */
export function BookSheet({
  title,
  children,
  routeFrame = false,
  pageKey,
  pageNumber = 2,
  interactionMode = "reading",
  volume,
}: BookSheetProps) {
  const alreadyInsideBook = useContext(BookSheetNestingContext);
  const pagerApi = useRef<LeafPagerHandle>({ step: () => {} });
  const [leafState, setLeafState] = useState({ spread: 0, spreads: 1 });
  const handleLeafState = useCallback((spread: number, spreads: number) => {
    setLeafState((current) =>
      current.spread === spread && current.spreads === spreads ? current : { spread, spreads },
    );
  }, []);

  if (alreadyInsideBook) return <>{children}</>;

  const firstLeftPage = pageNumber % 2 === 0 ? pageNumber : pageNumber - 1;
  const leftPage = firstLeftPage + leafState.spread * 2;

  return (
    <BookLandscapeGate>
      <div
        className={`bs-stage ${routeFrame ? "bs-route-frame" : ""}`}
        data-book-route={routeFrame || undefined}
        data-book-mode={interactionMode}
        data-book-volume={volume?.id}
        style={volume ? {
          "--bs-volume-cover": volume.cover,
          "--bs-volume-cover-deep": volume.coverDeep,
          "--bs-volume-accent": volume.accent,
        } as CSSProperties : undefined}
      >
      <div className="bs-cover-board">
        <div className={`bs-volume ${routeFrame ? "bs-volume--route" : ""}`}>
          <div className="bs-spread">
            <header className="bs-running bs-running--left">{volume?.shortTitle ?? "GENEL"}</header>
            <header className="bs-running bs-running--right">{title}</header>

            <BookSheetNestingContext.Provider value>
              <main key={pageKey ?? "book-sheet"} className="bs-spread-content">
                <BookLeafPager
                  routeContent={routeFrame}
                  interactionMode={interactionMode}
                  apiRef={pagerApi}
                  onLeafState={handleLeafState}
                >
                  {children}
                </BookLeafPager>
              </main>
            </BookSheetNestingContext.Provider>

            <footer className="bs-folio bs-folio--left" aria-label={`Sayfa ${leftPage}`}>
              <button
                type="button"
                className="bs-turn-btn"
                aria-label="Önceki sayfayı çevir"
                disabled={leafState.spread === 0}
                onClick={() => pagerApi.current.step("backward")}
              >
                ‹
              </button>
              <span className="bs-folio-number">{leftPage}</span>
            </footer>
            <footer className="bs-folio bs-folio--right" aria-label={`Sayfa ${leftPage + 1}`}>
              <span className="bs-folio-number">{leftPage + 1}</span>
              <button
                type="button"
                className="bs-turn-btn"
                aria-label="Sonraki sayfayı çevir"
                disabled={leafState.spread >= leafState.spreads - 1}
                onClick={() => pagerApi.current.step("forward")}
              >
                ›
              </button>
            </footer>

            <span className="bs-leaf-count" aria-hidden="true">
              YAPRAK {leafState.spread + 1}/{leafState.spreads}
            </span>
            <span className="sr-only" aria-live="polite">
              Sayfa {leftPage}–{leftPage + 1}
            </span>

            {pageKey && <span key={`turn-${pageKey}`} className="bs-turning-leaf" aria-hidden="true" />}
          </div>
        </div>
      </div>

      <style>{`
        .bs-stage{
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          min-height: 100svh;
          overflow-x: clip;
          overflow-anchor: none;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
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
            linear-gradient(145deg, var(--bs-volume-cover, #0e3767), var(--bs-volume-cover-deep, #071f42) 64%, #041329);
          border: 1px solid color-mix(in srgb, var(--bs-volume-accent, #cfa441) 52%, transparent);
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
          /* Drives the decorative route-turn leaf (a direct child); without a
             reachable perspective it rotates orthographically — a flat squash. */
          perspective: 1900px;
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
          z-index: 3;
          display: flex;
          grid-column: 1 / -1;
          min-width: 0;
          min-height: 0;
          max-width: 100%;
          overflow: hidden;
          padding: clamp(12px, 1.8vw, 26px) 0 14px;
          font-size: clamp(.66rem, 1.08vw, .93rem);
          line-height: 1.58;
        }
        .bs-pager{
          position: relative;
          flex: 1;
          min-width: 0;
          min-height: 0;
          width: 100%;
          height: 100%;
          max-height: 100%;
          overflow: hidden;
          /* Drives the interactive turn leaf; keeps the vanishing point fixed
             at the spine instead of following the rotating leaf. */
          perspective: 1900px;
          overscroll-behavior: contain;
          touch-action: pan-y;
          cursor: grab;
          outline: none;
          user-select: none;
          -webkit-user-select: none;
        }
        .bs-pager:active{ cursor: grabbing; }
        .bs-pager:focus-visible{ outline: 1px dotted rgba(90,61,20,.55); outline-offset: 2px; }
        .bs-pager::after{
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          mix-blend-mode: multiply;
          background: linear-gradient(90deg,
            transparent calc(50% - 26px), rgba(74,45,15,.18) calc(50% - 5px),
            rgba(255,248,224,.2) 50%, rgba(74,45,15,.15) calc(50% + 5px),
            transparent calc(50% + 26px));
        }
        .bs-flow{
          position: relative;
          z-index: 1;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          height: 100%;
          columns: 2;
          column-gap: clamp(34px, 7.2vw, 108px);
          column-fill: auto;
          will-change: transform;
          overflow-wrap: anywhere;
          word-break: break-word;
          hyphens: auto;
          orphans: 2;
          widows: 2;
          scrollbar-width: thin;
          scrollbar-color: rgba(96,63,21,.38) transparent;
        }
        .bs-flow :where(input,textarea,select,[contenteditable="true"]){ user-select: text; -webkit-user-select: text; }
        .bs-flow-clone{ pointer-events: none !important; }
        .bs-half{
          position: absolute;
          top: 0; bottom: 0;
          width: 50%;
          display: none;
          z-index: 4;
          overflow: hidden;
          pointer-events: none;
        }
        .bs-half--left{
          left: 0;
          background: linear-gradient(90deg, #e9d7ae 0%, #f7edd1 5%, #fbf2d9 84%, #e7d4a9 100%);
          box-shadow: inset -16px 0 22px -18px rgba(70,43,14,.55);
        }
        .bs-half--right{
          left: 50%;
          background: linear-gradient(90deg, #e7d4a9 0%, #fbf2d9 16%, #f7edd1 95%, #e9d7ae 100%);
          box-shadow: inset 16px 0 22px -18px rgba(70,43,14,.55);
        }
        .bs-turn-leaf{
          position: absolute;
          top: 0; bottom: 0;
          width: 50%;
          display: none;
          z-index: 6;
          pointer-events: none;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .bs-turn-leaf--forward{ left: 50%; transform-origin: left center; }
        .bs-turn-leaf--backward{ left: 0; transform-origin: right center; }
        .bs-turn-face{
          position: absolute;
          inset: 0;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          background: linear-gradient(180deg, #fbf2d9, #f1e2c0);
        }
        .bs-turn-face--front{ transform: rotateY(0deg) translateZ(.4px); }
        .bs-turn-face--back{ transform: rotateY(180deg) translateZ(.4px); }
        .bs-turn-face::after{
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: multiply;
          opacity: calc(var(--bs-shade, 0) * .68);
        }
        .bs-turn-leaf--forward .bs-turn-face--front::after{
          background: linear-gradient(90deg, rgba(58,35,9,.34), transparent 18%, rgba(255,255,255,.11) 78%, rgba(70,42,10,.16));
        }
        .bs-turn-leaf--forward .bs-turn-face--back::after{
          background: linear-gradient(90deg, rgba(70,42,10,.14), rgba(255,255,255,.12) 30%, transparent 82%, rgba(58,35,9,.31));
        }
        .bs-turn-leaf--backward .bs-turn-face--front::after{
          background: linear-gradient(90deg, rgba(70,42,10,.16), rgba(255,255,255,.11) 22%, transparent 82%, rgba(58,35,9,.34));
        }
        .bs-turn-leaf--backward .bs-turn-face--back::after{
          background: linear-gradient(90deg, rgba(58,35,9,.31), transparent 18%, rgba(255,255,255,.12) 70%, rgba(70,42,10,.14));
        }
        .bs-turn-shadow{
          position: absolute;
          z-index: 5;
          top: 0; bottom: 0;
          width: 22%;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          pointer-events: none;
          will-change: left, opacity;
          background: radial-gradient(ellipse at 50% 50%, rgba(48,28,6,.5), rgba(48,28,6,.17) 36%, transparent 76%);
        }
        .bs-folio{
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 8px;
          font-size: clamp(.55rem, .9vw, .72rem);
          font-variant-numeric: oldstyle-nums;
          color: rgba(77,49,16,.66);
          border-top: 1px solid rgba(126,83,27,.14);
        }
        .bs-folio--left{ justify-content: flex-start; padding-right: clamp(13px, 3.5vw, 50px); }
        .bs-folio--right{ justify-content: flex-end; padding-left: clamp(13px, 3.5vw, 50px); }
        .bs-turn-btn{
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          padding: 0 0 2px;
          border: 1px dotted rgba(120,80,20,.55);
          border-radius: 50%;
          background: transparent;
          color: rgba(77,49,16,.78);
          font: 700 13px/1 Georgia, 'Times New Roman', serif;
          cursor: pointer;
        }
        .bs-turn-btn:disabled{ opacity: .26; cursor: default; }
        .bs-leaf-count{
          position: absolute;
          z-index: 3;
          left: 50%;
          bottom: 5px;
          transform: translateX(-50%);
          pointer-events: none;
          font-size: clamp(.42rem, .7vw, .58rem);
          letter-spacing: .16em;
          color: rgba(90,61,20,.5);
        }
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
        .bs-formula{ break-inside:auto; margin:9px 0; padding:9px 12px; border:1px solid rgba(120,80,20,.42); background:rgba(255,255,255,.26); color:#3f2a0e; box-decoration-break:clone; -webkit-box-decoration-break:clone; }
        .bs-formula::before{ content:"Formül"; display:block; margin-bottom:3px; font-size:.58rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:rgba(90,61,20,.65); }
        .bs-formula-expression{ padding:8px 0; text-align:center; font-size:1.08em; font-weight:700; }
        .bs-table-wrap{ min-width:0; max-width:100%; overflow:visible; margin:9px 0; break-inside:auto; }
        .bs-table-caption{ padding:4px 2px; font-size:.72em; font-weight:700; font-style:italic; color:rgba(90,61,20,.72); }
        .bs-table{ width:100%; table-layout:fixed; border-collapse:collapse; font:normal .78em/1.4 Georgia,'Times New Roman',serif; color:#4a3113; }
        .bs-table th{ padding:5px 7px; text-align:left; font-size:.84em; letter-spacing:.08em; text-transform:uppercase; border-bottom:1.5px solid rgba(120,80,20,.5); }
        .bs-table td{ padding:5px 7px; vertical-align:top; border-bottom:1px dotted rgba(120,80,20,.34); }
        .bs-callout{ break-inside:auto; margin:8px 0; padding:7px 10px 7px 12px; border-left:3px solid rgba(120,80,20,.58); background:rgba(120,80,20,.055); font-size:.88em; color:#4a3113; box-decoration-break:clone; -webkit-box-decoration-break:clone; }
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
        .bs-topic-article{ margin:0 0 13px; padding:8px 0 11px; border-bottom:1px dotted rgba(120,80,20,.3); }
        .bs-topic-article h3{ margin:0 0 5px; color:#3f2a0e; font-size:.98em; font-weight:700; line-height:1.35; }
        .bs-topic-kicker{ margin:0 0 3px; color:#7a5c1a; font-size:.64em; font-weight:700; letter-spacing:.14em; text-transform:uppercase; }
        .bs-topic-introduction{ margin-bottom:10px !important; font-style:italic; color:rgba(74,49,19,.84); }
        .bs-topic-figure{ min-width:0; max-width:100%; break-inside:auto; margin:9px 0; }
        .bs-topic-figure img{ display:block; width:100%; height:clamp(140px, 24svh, 320px); object-fit:contain; }
        .bs-topic-figure figcaption{ display:grid; gap:2px; padding:5px 2px; color:rgba(90,61,20,.7); font-size:.72em; line-height:1.35; }
        .bs-photo-grid{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; }
        .bs-reading-empty{ display:flex; align-items:baseline; gap:8px; padding:5px 0; color:rgba(90,61,20,.55); font-size:.8em; border-bottom:1px dotted rgba(120,80,20,.22); }
        .bs-reading-empty p{ flex:1; }
        .bs-reading-empty em{ font-size:.78em; }
        .bs-reading-resources{ break-inside:auto; margin-top:16px; padding-top:10px; border-top:1px solid rgba(120,80,20,.38); }

        .bs-route-content{ min-width:0; max-width:100%; overflow-wrap:anywhere; word-break:break-word; hyphens:auto; overflow-anchor:none; -webkit-text-size-adjust:100%; text-size-adjust:100%; color:#4a3113; }
        .bs-route-content,
        .bs-route-content *{ box-sizing:border-box; }
        .bs-route-content > *,
        .bs-route-content :where(article,section,main,nav,header,footer,div,figure,form,fieldset,dl,ul,ol,li){ min-width:0; max-width:100%; }
        .bs-route-content :where(p,h1,h2,h3,h4,h5,h6,li,a,span,strong,em,code,pre,td,th,dt,dd){ max-width:100%; overflow-wrap:anywhere!important; word-break:break-word!important; hyphens:auto; }
        .bs-route-content :where(pre){ max-width:100%; white-space:pre-wrap!important; }
        .bs-route-content :where(.whitespace-nowrap,.truncate,[class*="line-clamp-"]){ white-space:normal!important; overflow:visible!important; text-overflow:clip!important; -webkit-line-clamp:unset!important; }
        .bs-route-content :where(img,video,canvas,iframe){ display:block; width:auto!important; height:auto!important; max-width:100%!important; max-height:max(48px,calc(var(--bs-page-height,360px) - 24px))!important; object-fit:contain; }
        .bs-route-content :where(svg){ max-width:100%!important; max-height:max(32px,calc(var(--bs-page-height,360px) - 24px))!important; }
        .bs-route-content :where(table){ width:100%!important; min-width:0!important; max-width:100%!important; table-layout:fixed; break-inside:auto!important; }
        .bs-route-content :where(th,td){ min-width:0!important; white-space:normal!important; }
        .bs-route-content :where(.break-inside-avoid,[class*="break-inside-avoid"],.bs-reading-section,.bs-topic-article,.bs-topic-figure,.bs-callout,.bs-formula,.bs-table-wrap,.bs-reading-resources){ break-inside:auto!important; page-break-inside:auto!important; }
        .bs-route-content :where(.bs-reading-section,.bs-topic-article){ content-visibility:visible!important; contain:none!important; contain-intrinsic-size:auto 0!important; }
        .bs-route-content :where(.grid,[class*="grid-cols-"],.bs-photo-grid,.flex-col){ display:block!important; }
        .bs-route-content :where(.grid,[class*="grid-cols-"],.bs-photo-grid,.flex-col) > * + *{ margin-top:.55rem; }
        .bs-route-content :where(.flex){ min-width:0; max-width:100%; flex-wrap:wrap; }
        .bs-route-content :where(.sticky){ position:static!important; inset:auto!important; }
        .bs-route-content :where(.overflow-auto,.overflow-scroll,.overflow-y-auto,.overflow-y-scroll,.overflow-clip){ overflow:visible!important; }
        .bs-route-content :where([class*="max-h-"]){ max-height:none!important; overflow-y:visible!important; }
        .bs-route-content :where([class*="min-h-"],.min-h-screen,.min-h-full){ min-height:0!important; }
        .bs-route-content :where(.h-screen,.h-full){ height:auto!important; }
        .bs-route-content :where([class*="w-screen"],[class*="min-w-"]){ min-width:0!important; max-width:100%!important; }
        .bs-route-content :where(.marine-shell){ display:block!important; min-height:0!important; overflow:visible!important; background:transparent!important; color:#4a3113!important; }
        .bs-route-content .marine-shell > .pointer-events-none{ display:none!important; }
        .bs-route-content .marine-shell main{ display:block!important; min-height:0!important; max-width:none!important; padding:0!important; }
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
        [data-book-mode="reading"] .bs-route-content :where(.overflow-hidden,.truncate,[class*="line-clamp-"]){ overflow:visible!important; }
        [data-book-mode="reading"] .bs-route-content :where(.absolute.pointer-events-none){ display:none!important; }
        [data-book-mode="reading"] .bs-route-content :where(.rounded-lg,.rounded-xl,.rounded-2xl){ border-radius:0!important; }
        [data-book-mode="reading"] .bs-route-content :where([role="tablist"],[role="toolbar"]){ display:block!important; position:static!important; }
        [data-book-mode="reading"] .bs-route-content :where(.fixed:not([role="dialog"])){ position:static!important; inset:auto!important; }

        body.book-route-active [role="dialog"]:not(.marine-keep){ border-color:rgba(120,80,20,.45)!important; background:#f6ecd0!important; color:#4a3113!important; }

        @media (max-width: 720px){
          .bs-stage{ padding-left:2px; padding-right:2px; }
          .bs-cover-board{ width:100%; padding:4px; border-radius:5px; }
          .bs-spread{ height:clamp(260px,min(58svh,78vw),430px); min-height:0; padding:12px 9px 12px; }
          .bs-spread-content{ font-size:clamp(.58rem,2.25vw,.72rem); line-height:1.5; }
          .bs-flow{ column-gap:26px; }
          .bs-running--left,.bs-folio--left{ padding-right:14px; }
          .bs-running--right,.bs-folio--right{ padding-left:14px; }
          .bs-photo-grid{ grid-template-columns:1fr; }
          .bs-entry{ min-height:28px; padding-left:4px; }
          .bs-callout{ padding:6px 7px; }
          .bs-turn-btn{ width:20px; height:20px; }
        }
        @media (prefers-reduced-motion: reduce){
          .bs-turning-leaf{ animation:none!important; display:none; }
          .bs-turn-leaf,.bs-turn-shadow,.bs-half{ display:none!important; }
        }
        @media print{
          .bs-stage{ min-height:0!important; padding:0!important; background:white!important; }
          .bs-cover-board,.bs-volume,.bs-spread{ width:100%!important; max-width:none!important; height:auto!important; min-height:0!important; padding:8mm!important; border:0!important; background:white!important; box-shadow:none!important; }
          .bs-cover-board::before,.bs-cover-board::after,.bs-volume::before,.bs-volume::after,.bs-spread::before,.bs-spread::after,.bs-turning-leaf{ display:none!important; }
          .bs-spread-content{ display:block!important; overflow:visible!important; }
          .bs-pager{ overflow:visible!important; }
          .bs-pager::after{ display:none!important; }
          .bs-flow{ height:auto!important; transform:none!important; columns:2; column-gap:16mm; column-fill:balance; }
          .bs-turn-leaf,.bs-half,.bs-turn-shadow,.bs-turn-btn,.bs-leaf-count{ display:none!important; }
        }
      `}</style>
      </div>
    </BookLandscapeGate>
  );
}

interface TurnState {
  direction: BookTurnDirection;
  from: number;
  to: number;
}

interface PagerPointerStart {
  pointerId: number;
  x: number;
  y: number;
  startedAt: number;
  /** Cumulative drag distance along the book's own x axis, in px. */
  lastX: number;
  lastTime: number;
  progress: number;
  horizontal: boolean;
  direction: BookTurnDirection;
  /** Frozen at pointerdown so a mid-gesture mode flip cannot corrupt the drag. */
  orientation: BookSurfaceOrientation;
}

interface PagerMetrics {
  width: number;
  height: number;
  gap: number;
  columnWidth: number;
  /** Horizontal distance between the starts of two neighbouring columns. */
  stride: number;
  /** Horizontal distance between the starts of two neighbouring spreads. */
  spreadStride: number;
  spreads: number;
}

const INTERACTIVE_GUARD = [
  "input", "textarea", "select", "option", "summary", "audio", "video",
  "[role='slider']", "[role='switch']", "[role='combobox']", "[role='listbox']",
  "[role='spinbutton']", "[contenteditable='true']", ".bs-table-wrap", "[data-book-no-turn]",
].join(",");
const BUTTON_GUARD = "button,[role='button'],[role='tab'],[role='menuitem']";
/** Above this many DOM nodes a turn keeps the physical leaf but skips the leaf-face clones. */
const CLONE_NODE_LIMIT = 6000;

function isGuardedTarget(target: EventTarget | null, mode: BookInteractionMode): boolean {
  const element = target instanceof Element ? target : null;
  if (!element) return false;
  if (element.closest(INTERACTIVE_GUARD)) return true;
  // Reading pages print buttons as plain ink, so they never swallow a turn.
  return mode !== "reading" && Boolean(element.closest(BUTTON_GUARD));
}

/**
 * Splits arbitrary sheet content into fixed physical leaves with CSS columns.
 * Every printed line keeps its place on its leaf — nothing scrolls — and the
 * reader moves through the sheet with the same drag/flick/tap page turns as
 * the table of contents, complete with a real two-faced turning leaf.
 */
function BookLeafPager({
  children,
  routeContent,
  interactionMode,
  apiRef,
  onLeafState,
}: {
  children: ReactNode;
  routeContent: boolean;
  interactionMode: BookInteractionMode;
  apiRef: MutableRefObject<LeafPagerHandle>;
  onLeafState: (spread: number, spreads: number) => void;
}) {
  const pagerRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const halfRef = useRef<HTMLDivElement>(null);
  const leafRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLSpanElement>(null);

  const metricsRef = useRef<PagerMetrics>({
    width: 0, height: 0, gap: 0, columnWidth: 1, stride: 1, spreadStride: 1, spreads: 1,
  });
  const spreadRef = useRef(0);
  const turnRef = useRef<TurnState | null>(null);
  const progressRef = useRef(0);
  const settleFrame = useRef<number | null>(null);
  const pointerStart = useRef<PagerPointerStart | null>(null);
  const wheelLock = useRef(false);
  const wheelTimer = useRef<number | null>(null);
  const clickTimer = useRef<number | null>(null);
  const suppressClick = useRef(false);
  const pendingMeasure = useRef(false);
  const hashHandled = useRef(false);
  const [reducedMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const onLeafStateRef = useRef(onLeafState);
  onLeafStateRef.current = onLeafState;

  const publishState = useCallback(() => {
    onLeafStateRef.current(spreadRef.current, metricsRef.current.spreads);
  }, []);

  const applyBaseOffset = useCallback(() => {
    const flow = flowRef.current;
    if (!flow) return;
    const offset = spreadRef.current * metricsRef.current.spreadStride;
    flow.style.transform = `translate3d(${-offset}px, 0, 0)`;
  }, []);

  /**
   * Reads the real paper size and derives the physical leaf grid from it.
   * The transform is cleared for one synchronous layout so `scrollWidth`
   * reports the full run of printed columns.
   */
  const measure = useCallback(() => {
    if (typeof window === "undefined") return;
    const pager = pagerRef.current;
    const flow = flowRef.current;
    if (!pager || !flow) return;
    if (turnRef.current) {
      pendingMeasure.current = true;
      return;
    }
    const width = pager.clientWidth;
    const height = pager.clientHeight;
    if (width < 60 || height < 40) return;

    const gap = Number.parseFloat(window.getComputedStyle(flow).columnGap) || 0;
    const columnWidth = Math.max(1, (width - gap) / 2);
    const stride = columnWidth + gap;
    pager.style.setProperty("--bs-page-height", `${height}px`);
    pager.style.setProperty("--bs-page-width", `${columnWidth}px`);
    flow.style.transform = "none";
    if (pager.scrollLeft) pager.scrollLeft = 0;
    if (pager.scrollTop) pager.scrollTop = 0;
    const total = Math.max(pager.scrollWidth, width);
    // A partial final column must still become a real leaf. Keep a one-pixel
    // tolerance for integer scrollWidth rounding without rounding content away.
    const columns = Math.max(1, Math.ceil((total + gap - 1) / stride));
    const spreads = Math.max(1, Math.ceil(columns / 2));

    // Deep links (#subtopic) open the book on the leaf that prints the target.
    if (!hashHandled.current) {
      hashHandled.current = true;
      const hash = window.location.hash;
      if (hash.length > 1) {
        try {
          const anchor = flow.querySelector(hash);
          if (anchor) {
            // Screen-space offsets are book-y in the rotated overlay, so the
            // anchor's column distance must be mapped into book-space first.
            const flowRect = flow.getBoundingClientRect();
            const anchorRect = anchor.getBoundingClientRect();
            const { deltaX } = mapBookDelta(
              anchorRect.left - flowRect.left,
              anchorRect.top - flowRect.top,
              getBookSurfaceOrientation(flow),
            );
            const column = Math.floor((deltaX + 2) / stride);
            spreadRef.current = Math.floor(Math.max(0, column) / 2);
          }
        } catch {
          /* Not a queryable anchor. */
        }
      }
    }

    metricsRef.current = { width, height, gap, columnWidth, stride, spreadStride: width + gap, spreads };
    spreadRef.current = clampNumber(spreadRef.current, 0, spreads - 1);
    applyBaseOffset();
    publishState();
  }, [applyBaseOffset, publishState]);

  /** Writes one animation frame straight to the DOM — no re-render per frame. */
  const applyTurnFrame = useCallback((progress: number) => {
    const active = turnRef.current;
    const leaf = leafRef.current;
    if (!active || !leaf) return;
    const sign = active.direction === "forward" ? -1 : 1;
    // Depth comes from the parent perspective on .bs-pager; an inline
    // perspective() here would move the vanishing point with the leaf.
    leaf.style.transform = `rotateY(${(180 * progress * sign).toFixed(3)}deg)`;
    const shade = Math.sin(Math.PI * progress);
    leaf.style.setProperty("--bs-shade", shade.toFixed(3));
    if (frontRef.current) frontRef.current.style.visibility = progress < 0.5 ? "visible" : "hidden";
    if (backRef.current) backRef.current.style.visibility = progress < 0.5 ? "hidden" : "visible";
    if (shadowRef.current) {
      const foldCenter = 50 + (active.direction === "forward" ? 50 : -50) * Math.cos(Math.PI * progress);
      shadowRef.current.style.left = `${foldCenter.toFixed(2)}%`;
      shadowRef.current.style.opacity = (shade * 0.5).toFixed(3);
    }
  }, []);

  const finalizeTurn = useCallback((complete: boolean) => {
    const active = turnRef.current;
    turnRef.current = null;
    progressRef.current = 0;
    if (active) spreadRef.current = complete ? active.to : active.from;
    if (leafRef.current) {
      leafRef.current.style.display = "none";
      leafRef.current.style.transform = "";
      leafRef.current.style.removeProperty("--bs-shade");
    }
    if (halfRef.current) halfRef.current.style.display = "none";
    if (shadowRef.current) shadowRef.current.style.opacity = "0";
    if (frontRef.current) frontRef.current.style.visibility = "";
    if (backRef.current) backRef.current.style.visibility = "";
    frontRef.current?.replaceChildren();
    backRef.current?.replaceChildren();
    halfRef.current?.replaceChildren();
    applyBaseOffset();
    publishState();
    if (pendingMeasure.current) {
      pendingMeasure.current = false;
      measure();
    }
  }, [applyBaseOffset, measure, publishState]);

  /** Eases the grabbed leaf the rest of the way (or back) at 60fps. */
  const settleTurn = useCallback((fromProgress: number, complete: boolean) => {
    if (settleFrame.current) window.cancelAnimationFrame(settleFrame.current);
    const target = complete ? 1 : 0;
    const durationMs = getBookTurnSettleDuration(fromProgress, complete);
    if (durationMs <= 0 || Math.abs(target - fromProgress) < 0.002) {
      applyTurnFrame(target);
      finalizeTurn(complete);
      return;
    }
    const startedAt = performance.now();
    const tick = (now: number) => {
      const elapsed = clampNumber((now - startedAt) / durationMs, 0, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      const progress = fromProgress + (target - fromProgress) * eased;
      progressRef.current = progress;
      applyTurnFrame(progress);
      if (elapsed < 1) {
        settleFrame.current = window.requestAnimationFrame(tick);
      } else {
        settleFrame.current = null;
        finalizeTurn(complete);
      }
    };
    settleFrame.current = window.requestAnimationFrame(tick);
  }, [applyTurnFrame, finalizeTurn]);

  /** Prints a frozen copy of the flow into one face of the turning leaf. */
  const buildFace = useCallback((host: HTMLElement | null, left: number) => {
    const flow = flowRef.current;
    if (!host || !flow) return;
    const clone = flow.cloneNode(true) as HTMLElement;
    clone.classList.add("bs-flow-clone");
    clone.style.transform = "none";
    clone.style.position = "absolute";
    clone.style.top = "0";
    clone.style.left = `${left}px`;
    clone.style.width = `${metricsRef.current.width}px`;
    clone.style.height = "100%";
    clone.setAttribute("aria-hidden", "true");
    clone.setAttribute("inert", "");
    host.replaceChildren(clone);
  }, []);

  const beginTurn = useCallback((direction: BookTurnDirection): boolean => {
    if (turnRef.current) return false;
    const flow = flowRef.current;
    const leaf = leafRef.current;
    const half = halfRef.current;
    if (!flow || !leaf || !half) return false;
    const metrics = metricsRef.current;
    if (metrics.width < 60) return false;
    const from = spreadRef.current;
    const to = from + (direction === "forward" ? 1 : -1);
    if (to < 0 || to > metrics.spreads - 1) return false;

    const light = flow.querySelectorAll("*").length > CLONE_NODE_LIMIT;
    turnRef.current = { direction, from, to };
    progressRef.current = 0;

    const leftColumn = from * 2;
    const rightColumn = leftColumn + 1;
    const halfGap = metrics.gap / 2;
    // Oversized flows skip the two leaf-face clones (the leaf turns as plain
    // paper) but never the covered-half clone below: it is what lets the
    // target spread wait beneath the moving paper from the very first frame
    // instead of teleporting into view mid-turn.
    if (!light) {
      if (direction === "forward") {
        buildFace(frontRef.current, halfGap - rightColumn * metrics.stride);
        buildFace(backRef.current, -(rightColumn + 1) * metrics.stride);
      } else {
        buildFace(frontRef.current, -leftColumn * metrics.stride);
        buildFace(backRef.current, halfGap - (leftColumn - 1) * metrics.stride);
      }
    }
    if (direction === "forward") {
      buildFace(half, -leftColumn * metrics.stride);
      half.className = "bs-half bs-half--left";
    } else {
      buildFace(half, halfGap - rightColumn * metrics.stride);
      half.className = "bs-half bs-half--right";
    }
    half.style.display = "block";
    // The target spread waits beneath the moving paper, exactly like a book.
    flow.style.transform = `translate3d(${-(to * metrics.spreadStride)}px, 0, 0)`;

    leaf.className = `bs-turn-leaf bs-turn-leaf--${direction}`;
    leaf.style.display = "block";
    applyTurnFrame(0);
    return true;
  }, [applyTurnFrame, buildFace]);

  const stepInstant = useCallback((direction: BookTurnDirection) => {
    const next = clampNumber(
      spreadRef.current + (direction === "forward" ? 1 : -1),
      0,
      metricsRef.current.spreads - 1,
    );
    if (next === spreadRef.current) return;
    spreadRef.current = next;
    applyBaseOffset();
    publishState();
  }, [applyBaseOffset, publishState]);

  const step = useCallback((direction: BookTurnDirection) => {
    if (turnRef.current) return;
    if (reducedMotion) {
      stepInstant(direction);
      return;
    }
    if (beginTurn(direction)) settleTurn(0, true);
  }, [beginTurn, reducedMotion, settleTurn, stepInstant]);

  useEffect(() => {
    apiRef.current = { step };
  }, [apiRef, step]);

  useEffect(() => {
    measure();
    const pager = pagerRef.current;
    const flow = flowRef.current;
    if (!pager || !flow || typeof window === "undefined") return;

    let frame: number | null = null;
    const scheduleMeasure = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(() => {
        frame = null;
        measure();
      });
    };

    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleMeasure);
    resizeObserver?.observe(pager);
    const contentObserver = new MutationObserver(scheduleMeasure);
    contentObserver.observe(flow, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["class", "open", "hidden", "aria-expanded", "data-state"],
    });
    const fontObserver = new MutationObserver(scheduleMeasure);
    fontObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style", "data-font-size"],
    });
    const onAssetLoad = (event: Event) => {
      if ((event.target as HTMLElement | null)?.tagName === "IMG") scheduleMeasure();
    };
    flow.addEventListener("load", onAssetLoad, true);
    const fontSet = document.fonts;
    let disposed = false;
    const onFontLoad = () => {
      if (!disposed) scheduleMeasure();
    };
    void fontSet?.ready.then(onFontLoad);
    fontSet?.addEventListener("loadingdone", onFontLoad);
    // Focus jumps and hash navigation must never shear the printed columns.
    const keepPinned = () => {
      if (pager.scrollLeft) pager.scrollLeft = 0;
      if (pager.scrollTop) pager.scrollTop = 0;
    };
    pager.addEventListener("scroll", keepPinned, { passive: true });
    window.addEventListener("resize", scheduleMeasure, { passive: true });

    return () => {
      disposed = true;
      if (frame !== null) window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      contentObserver.disconnect();
      fontObserver.disconnect();
      flow.removeEventListener("load", onAssetLoad, true);
      fontSet?.removeEventListener("loadingdone", onFontLoad);
      pager.removeEventListener("scroll", keepPinned);
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [measure]);

  useEffect(() => () => {
    if (settleFrame.current) window.cancelAnimationFrame(settleFrame.current);
    if (wheelTimer.current) window.clearTimeout(wheelTimer.current);
    if (clickTimer.current) window.clearTimeout(clickTimer.current);
  }, []);

  const armClickSuppressionReset = () => {
    if (clickTimer.current) window.clearTimeout(clickTimer.current);
    clickTimer.current = window.setTimeout(() => {
      suppressClick.current = false;
      clickTimer.current = null;
    }, 350);
  };

  const releasePointerCapture = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || turnRef.current) return;
    if (isGuardedTarget(event.target, interactionMode)) return;
    pointerStart.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startedAt: event.timeStamp,
      lastX: 0,
      lastTime: event.timeStamp,
      progress: 0,
      horizontal: false,
      direction: "forward",
      orientation: getBookSurfaceOrientation(pagerRef.current),
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    if (!start || start.pointerId !== event.pointerId) return;

    const { deltaX, deltaY } = mapBookDelta(
      event.clientX - start.x,
      event.clientY - start.y,
      start.orientation,
    );
    if (!start.horizontal) {
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 7) return;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        pointerStart.current = null;
        return;
      }
      // Dragging left pulls the right-hand leaf over; dragging right pulls the
      // left-hand leaf back — exactly like paper.
      const direction: BookTurnDirection = deltaX < 0 ? "forward" : "backward";
      if (reducedMotion) {
        pointerStart.current = null;
        suppressClick.current = true;
        armClickSuppressionReset();
        stepInstant(direction);
        return;
      }
      if (!beginTurn(direction)) {
        pointerStart.current = null;
        return;
      }
      start.horizontal = true;
      start.direction = direction;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    start.lastX = deltaX;
    start.lastTime = event.timeStamp;
    const leafWidth = metricsRef.current.width / 2 || 1;
    start.progress = getBookTurnProgress(deltaX, leafWidth, start.direction);
    if (start.progress > 0.035) suppressClick.current = true;
    progressRef.current = start.progress;
    applyTurnFrame(start.progress);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.pointerId !== event.pointerId) return;
    releasePointerCapture(event);

    if (start.horizontal) {
      // All velocity math stays in book-space: deltas are mapped first, then
      // divided by time, so shouldCompleteBookTurn's sign logic is untouched.
      const { deltaX } = mapBookDelta(
        event.clientX - start.x,
        event.clientY - start.y,
        start.orientation,
      );
      const elapsed = Math.max(1, event.timeStamp - start.lastTime);
      const releaseVelocity = (deltaX - start.lastX) / elapsed;
      const totalVelocity = deltaX / Math.max(1, event.timeStamp - start.startedAt);
      const velocityX = Math.abs(releaseVelocity) > Math.abs(totalVelocity)
        ? releaseVelocity
        : totalVelocity;
      const leafWidth = metricsRef.current.width / 2 || 1;
      const progress = getBookTurnProgress(deltaX, leafWidth, start.direction);
      progressRef.current = progress;
      suppressClick.current = true;
      armClickSuppressionReset();
      settleTurn(progress, shouldCompleteBookTurn(progress, velocityX, start.direction));
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest("a")) return;
    if (isGuardedTarget(target, interactionMode)) return;
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 12) return;
    const pager = pagerRef.current;
    const bounds = pager?.getBoundingClientRect();
    if (!pager || !bounds) return;
    const local = mapBookPointToLocal(event.clientX, event.clientY, bounds, start.orientation);
    if (local.x < pager.offsetWidth * 0.16) step("backward");
    else if (local.x > pager.offsetWidth * 0.84) step("forward");
  };

  const onPointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    releasePointerCapture(event);
    if (!start?.horizontal) return;
    suppressClick.current = true;
    armClickSuppressionReset();
    settleTurn(progressRef.current, false);
  };

  const onClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressClick.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick.current = false;
  };

  const onWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    const { deltaX, deltaY } = mapBookDelta(
      event.deltaX,
      event.deltaY,
      getBookSurfaceOrientation(pagerRef.current),
    );
    const magnitude = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
    if (wheelLock.current || turnRef.current || Math.abs(magnitude) < 16) return;
    if (isGuardedTarget(event.target, interactionMode)) return;
    wheelLock.current = true;
    step(magnitude > 0 ? "forward" : "backward");
    if (wheelTimer.current) window.clearTimeout(wheelTimer.current);
    wheelTimer.current = window.setTimeout(() => {
      wheelLock.current = false;
      wheelTimer.current = null;
    }, 650);
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("input,textarea,select,[contenteditable='true']")) return;
    if (event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      step("forward");
    }
    if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      step("backward");
    }
  };

  return (
    <div
      ref={pagerRef}
      className="bs-pager"
      role="group"
      aria-roledescription="iki sayfalı kitap yaprağı"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onClickCapture={onClickCapture}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
      onDragStart={(event) => event.preventDefault()}
    >
      <div ref={flowRef} className={`bs-flow ${routeContent ? "bs-route-content" : ""}`}>
        {children}
      </div>
      <div ref={halfRef} className="bs-half" aria-hidden="true" />
      <span ref={shadowRef} className="bs-turn-shadow" aria-hidden="true" />
      <div ref={leafRef} className="bs-turn-leaf" aria-hidden="true">
        <div ref={frontRef} className="bs-turn-face bs-turn-face--front" />
        <div ref={backRef} className="bs-turn-face bs-turn-face--back" />
      </div>
    </div>
  );
}
