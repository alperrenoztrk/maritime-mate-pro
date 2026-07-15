import { useEffect, useMemo, useRef, useState, type PointerEvent, type WheelEvent } from "react";
import { Link } from "react-router-dom";
import { bookPages, type BookPageSpec } from "@/data/bookContents";

type TurnDirection = "forward" | "backward";

interface SpreadPage {
  page: BookPageSpec | null;
  number: number | null;
}

interface BookPageProps {
  /** Opens inside the home-page launcher instead of becoming a full-screen route. */
  embedded?: boolean;
}

/** Compact, two-leaf table of contents with gesture-driven page turns. */
export default function BookPage({ embedded = false }: BookPageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const wheelLock = useRef(false);
  const turnTimer = useRef<number | null>(null);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [turnDirection, setTurnDirection] = useState<TurnDirection>("forward");
  const [turning, setTurning] = useState(false);
  const [coverDone, setCoverDone] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const spreads = useMemo<SpreadPage[][]>(() => {
    // A real volume starts with the inside cover on the left and page 1 on the right.
    const leaves: SpreadPage[] = [
      { page: null, number: null },
      ...bookPages.map((page, index) => ({ page, number: index + 1 })),
    ];
    if (leaves.length % 2 !== 0) leaves.push({ page: null, number: null });

    const result: SpreadPage[][] = [];
    for (let index = 0; index < leaves.length; index += 2) {
      result.push([leaves[index], leaves[index + 1]]);
    }
    return result;
  }, []);

  useEffect(() => () => {
    if (turnTimer.current) window.clearTimeout(turnTimer.current);
  }, []);

  useEffect(() => {
    if (!embedded) return;
    stageRef.current?.focus({ preventScroll: true });
  }, [embedded]);

  const turnTo = (nextIndex: number, direction: TurnDirection) => {
    if (turning || nextIndex < 0 || nextIndex >= spreads.length || nextIndex === spreadIndex) return;
    if (turnTimer.current) window.clearTimeout(turnTimer.current);
    setTurnDirection(direction);
    setTurning(true);
    setSpreadIndex(nextIndex);
    turnTimer.current = window.setTimeout(() => setTurning(false), 720);
  };

  const stepSpread = (direction: TurnDirection) => {
    turnTo(spreadIndex + (direction === "forward" ? 1 : -1), direction);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || (event.target as HTMLElement).closest("a")) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) > 38 && Math.abs(deltaX) > Math.abs(deltaY)) {
      stepSpread(deltaX < 0 ? "forward" : "backward");
      return;
    }
    if (Math.abs(deltaY) > 12) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    if (relativeX < bounds.width * .18) stepSpread("backward");
    if (relativeX > bounds.width * .82) stepSpread("forward");
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    const horizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
    if (!horizontalIntent || wheelLock.current || Math.abs(event.deltaX || event.deltaY) < 16) return;
    event.stopPropagation();
    wheelLock.current = true;
    stepSpread((event.deltaX || event.deltaY) > 0 ? "forward" : "backward");
    window.setTimeout(() => { wheelLock.current = false; }, 700);
  };

  const currentSpread = spreads[spreadIndex] ?? spreads[0];

  return (
    <div className={`bk-scene ${embedded ? "bk-scene--embedded" : ""}`}>
      {!embedded && <div className="bk-ambient" aria-hidden="true" />}
      {!embedded && <h1 className="bk-title notranslate" translate="no" lang="en">MARINER&rsquo;S BOOK</h1>}

      <div
        ref={stageRef}
        className="bk-stage"
        role="region"
        aria-label="Mariner's Book içindekiler"
        aria-roledescription="iki sayfalı kitap"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "PageDown") stepSpread("forward");
          if (event.key === "ArrowLeft" || event.key === "PageUp") stepSpread("backward");
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { pointerStart.current = null; }}
        onWheel={onWheel}
      >
        <div className="bk-cover-board">
          <div className="bk-volume">
            <div className={`bk-spread bk-spread--${turnDirection}`} aria-live="polite">
              <BookLeaf leaf={currentSpread[0]} side="left" firstLeaf={spreadIndex === 0} />
              <BookLeaf leaf={currentSpread[1]} side="right" firstLeaf={spreadIndex === 0} />
              <span className="bk-gutter" aria-hidden="true" />
              {turning && <span key={`${spreadIndex}-${turnDirection}`} className={`bk-turn-leaf bk-turn-leaf--${turnDirection}`} aria-hidden="true" />}
              <span className="bk-ribbon" aria-hidden="true" />
            </div>

            {!coverDone && (
              <div className="bk-cover" aria-hidden="true" onAnimationEnd={() => setCoverDone(true)}>
                <div className="bk-cover-face bk-cover-front">
                  <div className="bk-cover-trim">
                    <div className="bk-emblem">⚓</div>
                    <div className="bk-cover-title">MARINER&rsquo;S<br />BOOK</div>
                    <div className="bk-cover-rule" />
                    <div className="bk-cover-subtitle">SEAMANSHIP · NAVIGATION · ENGINEERING</div>
                  </div>
                </div>
                <div className="bk-cover-face bk-cover-back" />
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="bk-instruction">
        Sayfa kenarına dokunun veya yatay kaydırın · {spreadIndex + 1} / {spreads.length} yaprak
      </p>

      <style>{`
        .bk-scene{
          position:relative; display:flex; min-height:100svh; flex-direction:column; align-items:center; overflow:hidden;
          padding: max(.65rem,env(safe-area-inset-top)) 2px max(.55rem,env(safe-area-inset-bottom));
          background:linear-gradient(180deg,#06152a 0%,#0a2949 54%,#051421 100%);
        }
        .bk-ambient{ position:absolute; inset:0; pointer-events:none; background:radial-gradient(ellipse at 50% 20%,rgba(71,184,225,.19),transparent 52%); }
        .bk-title{ position:relative; z-index:20; margin:0 0 6px; color:rgba(242,217,138,.84); font-size:clamp(.58rem,1.2vw,.78rem); font-weight:700; letter-spacing:.34em; text-indent:.34em; }
        .bk-stage{ position:relative; z-index:10; width:100%; flex:1; min-height:0; display:flex; align-items:center; justify-content:center; perspective:2100px; outline:none; touch-action:pan-y; }
        .bk-stage:focus-visible .bk-cover-board{ outline:1px dotted rgba(242,217,138,.62); outline-offset:3px; }
        .bk-cover-board{
          position:relative; width:min(94vw,780px); height:min(68svh,540px); min-height:320px; padding:clamp(5px,.85vw,11px);
          border:1px solid rgba(212,168,61,.46); border-radius:9px 13px 13px 9px;
          background:repeating-linear-gradient(25deg,rgba(255,255,255,.018) 0 2px,transparent 2px 8px),linear-gradient(145deg,#103a69,#071f42 58%,#041328);
          box-shadow:0 24px 64px rgba(0,0,0,.62),inset 0 0 30px rgba(0,0,0,.62);
        }
        .bk-cover-board::before,.bk-cover-board::after{ content:""; position:absolute; width:22px; height:22px; pointer-events:none; border-color:rgba(218,177,76,.58); }
        .bk-cover-board::before{ left:10px; top:10px; border-left:1px solid; border-top:1px solid; }
        .bk-cover-board::after{ right:10px; bottom:10px; border-right:1px solid; border-bottom:1px solid; }
        .bk-volume{ position:relative; width:100%; height:100%; transform-style:preserve-3d; border-radius:3px 8px 8px 3px; background:#d1b982; box-shadow:0 8px 18px rgba(0,0,0,.48); }
        .bk-volume::before,.bk-volume::after{ content:""; position:absolute; z-index:3; top:1.3%; bottom:1.3%; width:9px; pointer-events:none; background:repeating-linear-gradient(90deg,#f1e4c4 0 1.5px,#cbb47d 1.5px 3px); }
        .bk-volume::before{ left:-1px; border-radius:3px 0 0 3px; } .bk-volume::after{ right:-1px; border-radius:0 5px 5px 0; }
        .bk-spread{ position:absolute; inset:0; display:grid; grid-template-columns:1fr 1fr; overflow:hidden; border-radius:3px 7px 7px 3px; transform-style:preserve-3d; }
        .bk-leaf{
          position:relative; min-width:0; height:100%; overflow:hidden; padding:clamp(14px,2.5vw,34px) clamp(11px,2.6vw,38px) 17px;
          display:grid; grid-template-rows:auto minmax(0,1fr) auto; color:#482f12; font-family:Georgia,'Times New Roman',serif;
          background:radial-gradient(25% 16% at 82% 13%,rgba(137,82,23,.075),transparent 72%),repeating-linear-gradient(180deg,transparent 0 11px,rgba(120,80,20,.035) 11px 12px),linear-gradient(180deg,#fbf2d9,#efdfbc);
        }
        .bk-leaf--left{ box-shadow:inset 12px 0 16px -14px rgba(65,39,10,.42),inset -22px 0 26px -24px rgba(57,34,8,.72),inset 0 7px 9px -8px rgba(67,40,11,.34); }
        .bk-leaf--right{ box-shadow:inset -12px 0 16px -14px rgba(65,39,10,.42),inset 22px 0 26px -24px rgba(57,34,8,.72),inset 0 7px 9px -8px rgba(67,40,11,.34); }
        .bk-gutter{ position:absolute; z-index:4; top:0; bottom:0; left:50%; width:clamp(20px,3.2vw,48px); transform:translateX(-50%); pointer-events:none; background:linear-gradient(90deg,transparent,rgba(58,35,9,.24) 42%,rgba(255,249,229,.22) 52%,rgba(58,35,9,.2) 62%,transparent); mix-blend-mode:multiply; }
        .bk-running{ padding-bottom:8px; text-align:center; color:rgba(90,61,20,.54); border-bottom:1px solid rgba(120,80,20,.18); font-size:clamp(.46rem,.78vw,.65rem); font-weight:600; letter-spacing:.28em; text-indent:.28em; }
        .bk-running::before{ content:"❖  "; opacity:.45; }.bk-running::after{ content:"  ❖"; opacity:.45; }
        .bk-page{ min-height:0; overflow-x:hidden; overflow-y:auto; overscroll-behavior:contain; padding:clamp(10px,1.7vw,20px) 0 8px; scrollbar-width:none; }
        .bk-page::-webkit-scrollbar{ display:none; }
        .bk-toc-header{ display:flex; align-items:center; gap:8px; margin-bottom:9px; }
        .bk-toc-title{ flex:0 auto; color:#513514; font-size:clamp(.66rem,1.45vw,1.08rem); font-weight:700; letter-spacing:.22em; text-indent:.22em; }
        .bk-toc-rule{ flex:1; height:1px; background:linear-gradient(90deg,transparent,rgba(176,124,32,.6),transparent); }
        .bk-fleuron{ margin:-2px 0 8px; text-align:center; color:rgba(90,61,20,.48); }
        .bk-chapter{ display:flex; align-items:baseline; gap:.45em; padding:4px 0; color:#3f2a0e; text-decoration:none; }
        .bk-chapter:focus-visible,.bk-entry:focus-visible{ outline:2px dotted rgba(74,49,19,.58); outline-offset:2px; }
        .bk-chapter-numeral{ color:#7a5c1a; font-size:clamp(.69rem,1.35vw,1.02rem); font-weight:700; }
        .bk-chapter-title{ min-width:0; overflow-wrap:anywhere; hyphens:auto; font-size:clamp(.67rem,1.3vw,1rem); font-weight:700; letter-spacing:.09em; }
        .bk-cont{ font-size:.74em; font-weight:400; font-style:italic; letter-spacing:0; color:rgba(90,61,20,.68); }
        .bk-chapter-rule{ height:1px; margin:1px 0 8px; background:linear-gradient(90deg,rgba(176,124,32,.68),rgba(176,124,32,.1)); }
        .bk-section+.bk-section{ margin-top:9px; }
        .bk-section-heading{ overflow-wrap:anywhere; hyphens:auto; margin:5px 0 2px; color:rgba(90,61,20,.8); font-size:clamp(.48rem,.85vw,.68rem); font-weight:700; letter-spacing:.18em; text-transform:uppercase; }
        .bk-entry{ display:flex; align-items:baseline; min-width:0; min-height:31px; padding:5px 0 2px 8px; color:#4a3113; text-decoration:none; font-size:clamp(.56rem,1.05vw,.83rem); line-height:1.3; }
        .bk-entry-label{ min-width:0; max-width:78%; overflow-wrap:anywhere; hyphens:auto; }.bk-leader{ flex:1; min-width:8px; margin:0 .36em; border-bottom:1.5px dotted rgba(120,80,20,.42); transform:translateY(-2px); }.bk-anchor{ flex:0 0 auto; font-size:.66em; opacity:.62; }
        .bk-folio{ padding-top:6px; color:rgba(78,50,16,.65); border-top:1px solid rgba(120,80,20,.16); font-size:clamp(.48rem,.82vw,.68rem); font-variant-numeric:oldstyle-nums; }
        .bk-leaf--left .bk-folio{ text-align:left; }.bk-leaf--right .bk-folio{ text-align:right; }
        .bk-frontispiece{ height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; color:rgba(90,61,20,.55); }
        .bk-frontispiece-mark{ font-size:clamp(1.1rem,3.5vw,2.5rem); }.bk-frontispiece p{ margin-top:8px; font-size:clamp(.45rem,.86vw,.66rem); letter-spacing:.22em; }
        .bk-turn-leaf{ position:absolute; z-index:8; top:0; bottom:0; width:50%; pointer-events:none; backface-visibility:hidden; background:linear-gradient(90deg,rgba(84,54,19,.18),transparent 12%),linear-gradient(90deg,#e8d5ad,#fbf1d7); box-shadow:-14px 7px 28px rgba(49,29,7,.32); will-change:transform,opacity; }
        .bk-turn-leaf--forward{ right:0; transform-origin:left center; animation:bk-turn-forward .7s cubic-bezier(.64,.02,.23,1) both; }
        .bk-turn-leaf--backward{ left:0; transform-origin:right center; animation:bk-turn-backward .7s cubic-bezier(.64,.02,.23,1) both; }
        @keyframes bk-turn-forward{ from{transform:rotateY(0);opacity:.94} to{transform:rotateY(-178deg);opacity:0} }
        @keyframes bk-turn-backward{ from{transform:rotateY(0);opacity:.94} to{transform:rotateY(178deg);opacity:0} }
        .bk-ribbon{ position:absolute; z-index:5; top:-2px; right:10%; width:clamp(8px,1.15vw,15px); height:clamp(42px,8vw,74px); pointer-events:none; background:linear-gradient(90deg,#741717,#a42d2d 48%,#741717); clip-path:polygon(0 0,100% 0,100% 100%,50% 86%,0 100%); box-shadow:0 3px 5px rgba(0,0,0,.3); }
        .bk-cover{ position:absolute; z-index:12; inset:0; transform-style:preserve-3d; transform-origin:left center; animation:bk-cover-open 1.05s cubic-bezier(.72,.04,.22,1) .18s forwards; pointer-events:none; }
        .bk-cover-face{ position:absolute; inset:0; overflow:hidden; border-radius:3px 8px 8px 3px; backface-visibility:hidden; -webkit-backface-visibility:hidden; }
        .bk-cover-front{ transform:translateZ(.8px); border:1px solid rgba(212,168,61,.48); background:radial-gradient(130% 110% at 50% 38%,transparent 52%,rgba(0,0,0,.45) 100%),repeating-linear-gradient(115deg,rgba(255,255,255,.02) 0 2px,transparent 2px 7px),linear-gradient(140deg,#123c70,#092750 48%,#04162e); box-shadow:inset 0 0 30px rgba(0,0,0,.48),0 8px 22px rgba(0,0,0,.5); }
        .bk-cover-back{ transform:rotateY(180deg) translateZ(.8px); border-radius:8px 3px 3px 8px; background:linear-gradient(180deg,#f5e8c8,#e6d1a5); box-shadow:inset 0 0 18px rgba(120,80,20,.25); }
        .bk-cover-trim{ position:absolute; inset:6%; display:flex; flex-direction:column; align-items:center; justify-content:center; border:1.5px solid rgba(218,165,32,.58); }
        .bk-cover-trim::after{ content:""; position:absolute; inset:2.4%; border:1px solid rgba(218,165,32,.28); }
        .bk-emblem{ color:#d5ac4e; font-size:clamp(2rem,6vw,4.8rem); filter:drop-shadow(0 0 7px rgba(218,165,32,.35)); }
        .bk-cover-title{ margin-top:8px; text-align:center; color:#d9b258; font:700 clamp(.9rem,3.4vw,2.1rem)/1.38 Georgia,'Times New Roman',serif; letter-spacing:.16em; }
        .bk-cover-rule{ width:22%; height:1px; margin:15px 0; background:linear-gradient(90deg,transparent,#d5ac4e,transparent); }
        .bk-cover-subtitle{ color:rgba(218,177,76,.72); font:600 clamp(.38rem,.8vw,.63rem) Georgia,'Times New Roman',serif; letter-spacing:.18em; }
        @keyframes bk-cover-open{ to{transform:rotateY(-178deg)} }
        .bk-instruction{ position:relative; z-index:20; margin-top:6px; color:rgba(255,255,255,.68); font-size:clamp(.55rem,1vw,.72rem); letter-spacing:.04em; }
        .bk-scene--embedded{
          width:min(94vw,780px); min-height:0; padding:0; overflow:visible; isolation:isolate; background:transparent;
        }
        .bk-scene--embedded .bk-stage{
          flex:none; width:100%; height:clamp(260px,min(58svh,78vw),520px); min-height:0;
          transform-origin:center center; animation:bk-inline-unfold .46s cubic-bezier(.2,.76,.24,1) both;
        }
        .bk-scene--embedded .bk-cover-board{ width:100%; height:100%; min-height:0; }
        .bk-scene--embedded .bk-cover{ animation:bk-cover-open .92s cubic-bezier(.72,.04,.22,1) .28s forwards; }
        .bk-scene--embedded .bk-instruction{ margin:5px 0 0; text-align:center; }
        @keyframes bk-inline-unfold{
          from{ transform:scaleX(.54); opacity:.82; filter:drop-shadow(0 15px 20px rgba(0,0,0,.34)); }
          to{ transform:scaleX(1); opacity:1; filter:drop-shadow(0 18px 24px rgba(0,0,0,.24)); }
        }
        @keyframes bk-inline-unfold-wide{
          from{ transform:scale(.3,.64); opacity:.82; filter:drop-shadow(0 15px 20px rgba(0,0,0,.34)); }
          to{ transform:scale(1); opacity:1; filter:drop-shadow(0 18px 24px rgba(0,0,0,.24)); }
        }
        @media(min-width:721px){ .bk-scene--embedded .bk-stage{ animation-name:bk-inline-unfold-wide; } }
        @media(max-width:720px){
          .bk-cover-board{ height:clamp(300px,min(62svh,78vw),430px); min-height:300px; padding:4px; }
          .bk-leaf{ padding:10px 7px 11px; }
          .bk-page{ padding-top:7px; }
          .bk-gutter{ width:20px; }
          .bk-entry{ min-height:25px; padding-left:3px; }
          .bk-ribbon{ right:7%; }
        }
        @media(prefers-reduced-motion:reduce){ .bk-cover{animation-duration:.01s!important;animation-delay:0s!important}.bk-turn-leaf{animation-duration:.01s!important}.bk-scene--embedded .bk-stage{animation:none!important} }
      `}</style>
    </div>
  );
}

function BookLeaf({ leaf, side, firstLeaf }: { leaf: SpreadPage; side: "left" | "right"; firstLeaf: boolean }) {
  return (
    <section lang="tr" className={`bk-leaf bk-leaf--${side}`} aria-label={leaf.number ? `Sayfa ${leaf.number}` : undefined}>
      <header className="bk-running">{leaf.page ? "İÇİNDEKİLER" : "MARINER’S BOOK"}</header>
      <div className="bk-page">
        {leaf.page ? <ContentsPage page={leaf.page} firstPage={leaf.number === 1} /> : (
          <div className="bk-frontispiece" aria-hidden={!firstLeaf}>
            <div className="bk-frontispiece-mark">⚓</div>
            <p>DENİZCİNİN BAŞVURU KİTABI</p>
          </div>
        )}
      </div>
      <footer className="bk-folio">{leaf.number ?? ""}</footer>
    </section>
  );
}

function ContentsPage({ page, firstPage }: { page: BookPageSpec; firstPage: boolean }) {
  return (
    <nav aria-label={`İçindekiler — ${page.title}`}>
      {firstPage && (
        <>
          <header className="bk-toc-header">
            <span className="bk-toc-rule" />
            <span className="bk-toc-title">İÇİNDEKİLER</span>
            <span className="bk-toc-rule" />
          </header>
          <div className="bk-fleuron" aria-hidden="true">❦</div>
        </>
      )}

      <Link to={page.to} className="bk-chapter">
        <span className="bk-chapter-numeral">{page.numeral}.</span>
        <span className="bk-chapter-title">
          {page.title.toLocaleUpperCase("tr")}
          {page.continuation ? <em className="bk-cont"> (devam)</em> : null}
        </span>
      </Link>
      <div className="bk-chapter-rule" />

      {page.sections.map((section, sectionIndex) => (
        <section key={sectionIndex} className="bk-section">
          {section.heading && <h2 className="bk-section-heading">{section.heading}</h2>}
          {section.entries.map((entry) => (
            <Link key={entry.to} to={entry.to} className="bk-entry">
              <span className="bk-entry-label">{entry.label}</span>
              <span className="bk-leader" aria-hidden="true" />
              <span className="bk-anchor" aria-hidden="true">⚓</span>
            </Link>
          ))}
        </section>
      ))}
    </nav>
  );
}
