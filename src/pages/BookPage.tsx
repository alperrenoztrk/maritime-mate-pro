import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent,
  type ReactNode,
  type WheelEvent,
} from "react";
import { Link } from "react-router-dom";
import { bookPages, type BookPageSpec } from "@/data/bookContents";
import {
  getBookPageLayout,
  getBookTurnProgress,
  getBookTurnSettleDuration,
  paginateBookPages,
  shouldCompleteBookTurn,
  type BookTurnDirection,
} from "@/lib/bookMotion";

interface SpreadPage {
  page: BookPageSpec | null;
  number: number | null;
}

interface ActiveTurn {
  direction: BookTurnDirection;
  fromIndex: number;
  toIndex: number;
  progress: number;
  phase: "dragging" | "settling";
  durationMs: number;
}

interface PointerStart {
  pointerId: number;
  x: number;
  y: number;
  startedAt: number;
  lastX: number;
  lastTime: number;
  progress: number;
  horizontal: boolean;
  direction: BookTurnDirection;
  fromIndex: number;
  toIndex: number;
  leafWidth: number;
}

interface BookPageProps {
  /** Opens inside the home-page launcher instead of becoming a full-screen route. */
  embedded?: boolean;
}

/** Compact, two-leaf table of contents with gesture-driven page turns. */
export default function BookPage({ embedded = false }: BookPageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<PointerStart | null>(null);
  const wheelLock = useRef(false);
  const turnLock = useRef(false);
  const suppressClick = useRef(false);
  const turnTimer = useRef<number | null>(null);
  const turnFrame = useRef<number | null>(null);
  const wheelTimer = useRef<number | null>(null);
  const clickTimer = useRef<number | null>(null);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [turn, setTurn] = useState<ActiveTurn | null>(null);
  const [reducedMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [coverDone, setCoverDone] = useState(reducedMotion);
  const [volumeSize, setVolumeSize] = useState(() => ({
    width: embedded ? 390 : 780,
    height: embedded ? 320 : 520,
    fontScale: 1,
  }));

  const paginatedBookPages = useMemo(() => {
    const layout = getBookPageLayout(volumeSize.width, volumeSize.height, volumeSize.fontScale);
    return paginateBookPages(bookPages, layout);
  }, [volumeSize]);

  const spreads = useMemo<SpreadPage[][]>(() => {
    // A real volume starts with the inside cover on the left and page 1 on the right.
    const leaves: SpreadPage[] = [
      { page: null, number: null },
      ...paginatedBookPages.map((page, index) => ({ page, number: index + 1 })),
    ];
    if (leaves.length % 2 !== 0) leaves.push({ page: null, number: null });

    const result: SpreadPage[][] = [];
    for (let index = 0; index < leaves.length; index += 2) {
      result.push([leaves[index], leaves[index + 1]]);
    }
    return result;
  }, [paginatedBookPages]);

  useEffect(() => () => {
    if (turnTimer.current) window.clearTimeout(turnTimer.current);
    if (turnFrame.current) window.cancelAnimationFrame(turnFrame.current);
    if (wheelTimer.current) window.clearTimeout(wheelTimer.current);
    if (clickTimer.current) window.clearTimeout(clickTimer.current);
  }, []);

  useEffect(() => {
    const volume = volumeRef.current;
    if (!volume || typeof window === "undefined") return;

    const updateMetrics = () => {
      const bounds = volume.getBoundingClientRect();
      const parsedScale = Number.parseFloat(
        window.getComputedStyle(document.documentElement).getPropertyValue("--font-scale"),
      );
      const fontScale = Number.isFinite(parsedScale) ? parsedScale : 1;
      setVolumeSize((current) => {
        if (
          Math.abs(current.width - bounds.width) < 1 &&
          Math.abs(current.height - bounds.height) < 1 &&
          Math.abs(current.fontScale - fontScale) < 0.01
        ) return current;
        return { width: bounds.width, height: bounds.height, fontScale };
      });
    };

    updateMetrics();
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateMetrics);
    resizeObserver?.observe(volume);
    const fontObserver = new MutationObserver(updateMetrics);
    fontObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style", "data-font-size"],
    });
    window.addEventListener("resize", updateMetrics, { passive: true });
    return () => {
      resizeObserver?.disconnect();
      fontObserver.disconnect();
      window.removeEventListener("resize", updateMetrics);
    };
  }, []);

  useEffect(() => {
    setSpreadIndex((current) => Math.min(current, Math.max(0, spreads.length - 1)));
  }, [spreads.length]);

  useEffect(() => {
    if (!embedded) return;
    stageRef.current?.focus({ preventScroll: true });
  }, [embedded]);

  const clearTurnSchedule = () => {
    if (turnTimer.current) window.clearTimeout(turnTimer.current);
    if (turnFrame.current) window.cancelAnimationFrame(turnFrame.current);
    turnTimer.current = null;
    turnFrame.current = null;
  };

  const finishTurn = (active: ActiveTurn, complete: boolean) => {
    clearTurnSchedule();
    const durationMs = reducedMotion ? 0 : getBookTurnSettleDuration(active.progress, complete);
    const settled: ActiveTurn = {
      ...active,
      progress: complete ? 1 : 0,
      phase: "settling",
      durationMs,
    };
    setTurn(settled);

    const finalize = () => {
      if (complete) setSpreadIndex(active.toIndex);
      setTurn(null);
      turnLock.current = false;
      turnTimer.current = null;
    };
    if (durationMs === 0) finalize();
    else turnTimer.current = window.setTimeout(finalize, durationMs + 34);
  };

  const turnTo = (nextIndex: number, direction: BookTurnDirection) => {
    if (
      turnLock.current ||
      !coverDone ||
      nextIndex < 0 ||
      nextIndex >= spreads.length ||
      nextIndex === spreadIndex
    ) return;

    if (reducedMotion) {
      setSpreadIndex(nextIndex);
      return;
    }

    clearTurnSchedule();
    turnLock.current = true;
    const active: ActiveTurn = {
      direction,
      fromIndex: spreadIndex,
      toIndex: nextIndex,
      progress: 0,
      phase: "dragging",
      durationMs: 0,
    };
    setTurn(active);
    turnFrame.current = window.requestAnimationFrame(() => finishTurn(active, true));
  };

  const stepSpread = (direction: BookTurnDirection) => {
    turnTo(spreadIndex + (direction === "forward" ? 1 : -1), direction);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (event.button !== 0 || turnLock.current || !coverDone) return;
    const bounds = volumeRef.current?.getBoundingClientRect();
    if (!bounds || event.clientX < bounds.left || event.clientX > bounds.right) return;

    const direction: BookTurnDirection = event.clientX >= bounds.left + bounds.width / 2
      ? "forward"
      : "backward";
    const toIndex = spreadIndex + (direction === "forward" ? 1 : -1);
    if (toIndex < 0 || toIndex >= spreads.length) return;

    pointerStart.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startedAt: event.timeStamp,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      progress: 0,
      horizontal: false,
      direction,
      fromIndex: spreadIndex,
      toIndex,
      leafWidth: bounds.width / 2,
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    if (!start || start.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const directedDistance = start.direction === "forward" ? -deltaX : deltaX;
    if (!start.horizontal) {
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 7) return;
      if (Math.abs(deltaY) > Math.abs(deltaX) || directedDistance <= 0) return;
      start.horizontal = true;
      turnLock.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    event.preventDefault();
    event.stopPropagation();
    start.lastX = event.clientX;
    start.lastTime = event.timeStamp;
    start.progress = getBookTurnProgress(deltaX, start.leafWidth, start.direction);
    if (start.progress > 0.035) suppressClick.current = true;
    setTurn({
      direction: start.direction,
      fromIndex: start.fromIndex,
      toIndex: start.toIndex,
      progress: start.progress,
      phase: "dragging",
      durationMs: 0,
    });
  };

  const releasePointerCapture = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const armClickSuppressionReset = () => {
    if (clickTimer.current) window.clearTimeout(clickTimer.current);
    clickTimer.current = window.setTimeout(() => {
      suppressClick.current = false;
      clickTimer.current = null;
    }, 350);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.pointerId !== event.pointerId) return;
    releasePointerCapture(event);

    if (start.horizontal) {
      const deltaX = event.clientX - start.x;
      const elapsed = Math.max(1, event.timeStamp - start.lastTime);
      const releaseVelocity = (event.clientX - start.lastX) / elapsed;
      const totalVelocity = deltaX / Math.max(1, event.timeStamp - start.startedAt);
      const velocityX = Math.abs(releaseVelocity) > Math.abs(totalVelocity)
        ? releaseVelocity
        : totalVelocity;
      start.progress = getBookTurnProgress(deltaX, start.leafWidth, start.direction);
      suppressClick.current = true;
      armClickSuppressionReset();
      finishTurn(
        {
          direction: start.direction,
          fromIndex: start.fromIndex,
          toIndex: start.toIndex,
          progress: start.progress,
          phase: "dragging",
          durationMs: 0,
        },
        shouldCompleteBookTurn(start.progress, velocityX, start.direction),
      );
      return;
    }

    if ((event.target as HTMLElement).closest("a")) return;
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 12) return;
    const bounds = volumeRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const relativeX = event.clientX - bounds.left;
    if (relativeX < bounds.width * .18) stepSpread("backward");
    if (relativeX > bounds.width * .82) stepSpread("forward");
  };

  const onPointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const start = pointerStart.current;
    pointerStart.current = null;
    releasePointerCapture(event);
    if (!start?.horizontal) return;
    suppressClick.current = true;
    armClickSuppressionReset();
    finishTurn({
      direction: start.direction,
      fromIndex: start.fromIndex,
      toIndex: start.toIndex,
      progress: start.progress,
      phase: "dragging",
      durationMs: 0,
    }, false);
  };

  const onClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressClick.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick.current = false;
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    const horizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
    if (
      !horizontalIntent ||
      wheelLock.current ||
      turnLock.current ||
      Math.abs(event.deltaX || event.deltaY) < 16
    ) return;
    event.stopPropagation();
    wheelLock.current = true;
    stepSpread((event.deltaX || event.deltaY) > 0 ? "forward" : "backward");
    if (wheelTimer.current) window.clearTimeout(wheelTimer.current);
    wheelTimer.current = window.setTimeout(() => {
      wheelLock.current = false;
      wheelTimer.current = null;
    }, 650);
  };

  const currentSpread = spreads[spreadIndex] ?? spreads[0];
  const fromSpread = turn ? spreads[turn.fromIndex] ?? currentSpread : currentSpread;
  const toSpread = turn ? spreads[turn.toIndex] ?? currentSpread : currentSpread;
  const baseSpread = turn
    ? turn.direction === "forward"
      ? [fromSpread[0], toSpread[1]]
      : [toSpread[0], fromSpread[1]]
    : currentSpread;
  const turningFront = turn
    ? turn.direction === "forward" ? fromSpread[1] : fromSpread[0]
    : null;
  const turningBack = turn
    ? turn.direction === "forward" ? toSpread[0] : toSpread[1]
    : null;
  const rotation = turn
    ? (turn.direction === "forward" ? -179 : 179) * turn.progress
    : 0;
  const lift = turn ? Math.sin(Math.PI * turn.progress) * 14 : 0;
  const shadowPosition = turn
    ? 50 + (turn.direction === "forward" ? 50 : -50) * Math.cos(Math.PI * turn.progress)
    : 50;
  const turnStyle = turn ? ({
    "--bk-turn-duration": `${turn.durationMs}ms`,
    "--bk-turn-progress": turn.progress,
    transform: `rotateY(${rotation}deg) translateZ(${lift}px)`,
  } as CSSProperties) : undefined;
  const shadowStyle = turn ? ({
    "--bk-turn-duration": `${turn.durationMs}ms`,
    left: `${shadowPosition}%`,
    opacity: Math.sin(Math.PI * turn.progress) * 0.58,
  } as CSSProperties) : undefined;

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
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onClickCapture={onClickCapture}
        onWheel={onWheel}
      >
        <div className="bk-cover-board">
          <div ref={volumeRef} className="bk-volume">
            <div
              className={`bk-spread ${turn ? `bk-spread--turning bk-spread--${turn.direction}` : ""}`}
              aria-busy={Boolean(turn)}
            >
              <BookLeaf
                leaf={baseSpread[0]}
                side="left"
                firstLeaf={!turn && spreadIndex === 0}
                decorative={Boolean(turn)}
              />
              <BookLeaf
                leaf={baseSpread[1]}
                side="right"
                firstLeaf={!turn && spreadIndex === 0}
                decorative={Boolean(turn)}
              />
              <span className="bk-gutter" aria-hidden="true" />
              {turn && turningFront && turningBack && (
                <>
                  <span
                    className={`bk-turn-shadow bk-turn-shadow--${turn.direction}`}
                    style={shadowStyle}
                    aria-hidden="true"
                  />
                  <div
                    className={`bk-turn-leaf bk-turn-leaf--${turn.direction} bk-turn-leaf--${turn.phase}`}
                    style={turnStyle}
                    aria-hidden="true"
                  >
                    <div className="bk-turn-face bk-turn-face--front">
                      <BookLeaf
                        leaf={turningFront}
                        side={turn.direction === "forward" ? "right" : "left"}
                        firstLeaf={false}
                        decorative
                      />
                    </div>
                    <div className="bk-turn-face bk-turn-face--back">
                      <BookLeaf
                        leaf={turningBack}
                        side={turn.direction === "forward" ? "left" : "right"}
                        firstLeaf={false}
                        decorative
                      />
                    </div>
                  </div>
                </>
              )}
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

      <span className="sr-only" aria-live="polite">
        Açık yaprak {spreadIndex + 1} / {spreads.length}
      </span>
      <p className="bk-instruction">
        Sayfanın köşesini tutup sürükleyin · {spreadIndex + 1} / {spreads.length} yaprak
      </p>

      <style>{`
        .bk-scene{
          position:relative; display:flex; min-height:100svh; flex-direction:column; align-items:center; overflow:hidden;
          padding: max(.65rem,env(safe-area-inset-top)) 2px max(.55rem,env(safe-area-inset-bottom));
          background:linear-gradient(180deg,#06152a 0%,#0a2949 54%,#051421 100%);
        }
        .bk-ambient{ position:absolute; inset:0; pointer-events:none; background:radial-gradient(ellipse at 50% 20%,rgba(71,184,225,.19),transparent 52%); }
        .bk-title{ position:relative; z-index:20; margin:0 0 6px; color:rgba(242,217,138,.84); font-size:clamp(.58rem,1.2vw,.78rem); font-weight:700; letter-spacing:.34em; text-indent:.34em; }
        .bk-stage{ position:relative; z-index:10; width:100%; flex:1; min-height:0; display:flex; align-items:center; justify-content:center; perspective:2100px; outline:none; touch-action:pan-y; cursor:grab; user-select:none; -webkit-user-select:none; }
        .bk-stage:active{ cursor:grabbing; }
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
        .bk-spread--turning{ user-select:none; -webkit-user-select:none; }
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
        .bk-page{ min-width:0; min-height:0; max-width:100%; overflow:hidden; padding:clamp(10px,1.7vw,20px) 0 8px; }
        .bk-page :where(nav,section,a,span,h2){ min-width:0; max-width:100%; overflow-wrap:anywhere; }
        .bk-page a{ -webkit-user-drag:none; }
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
        .bk-turn-leaf{
          position:absolute; z-index:8; top:0; bottom:0; width:50%; pointer-events:none;
          transform-style:preserve-3d; will-change:transform; contain:layout paint style;
        }
        .bk-turn-leaf--forward{ right:0; transform-origin:left center; }
        .bk-turn-leaf--backward{ left:0; transform-origin:right center; }
        .bk-turn-leaf--dragging{ transition:none; }
        .bk-turn-leaf--settling{ transition:transform var(--bk-turn-duration) cubic-bezier(.2,.72,.2,1); }
        .bk-turn-face{
          position:absolute; inset:0; overflow:hidden; backface-visibility:hidden; -webkit-backface-visibility:hidden;
          transform-style:preserve-3d;
        }
        .bk-turn-face--front{ transform:rotateY(0deg) translateZ(.3px); }
        .bk-turn-face--back{ transform:rotateY(180deg) translateZ(.3px); }
        .bk-turn-face .bk-leaf{ position:absolute; inset:0; width:100%; }
        .bk-turn-face--front::after,.bk-turn-face--back::after{
          content:""; position:absolute; inset:0; pointer-events:none; opacity:.7; mix-blend-mode:multiply;
        }
        .bk-turn-leaf--forward .bk-turn-face--front::after{
          background:linear-gradient(90deg,rgba(58,35,9,.34),transparent 18%,rgba(255,255,255,.11) 78%,rgba(70,42,10,.16));
        }
        .bk-turn-leaf--forward .bk-turn-face--back::after{
          background:linear-gradient(90deg,rgba(70,42,10,.14),rgba(255,255,255,.12) 30%,transparent 82%,rgba(58,35,9,.31));
        }
        .bk-turn-leaf--backward .bk-turn-face--front::after{
          background:linear-gradient(90deg,rgba(70,42,10,.16),rgba(255,255,255,.11) 22%,transparent 82%,rgba(58,35,9,.34));
        }
        .bk-turn-leaf--backward .bk-turn-face--back::after{
          background:linear-gradient(90deg,rgba(58,35,9,.31),transparent 18%,rgba(255,255,255,.12) 70%,rgba(70,42,10,.14));
        }
        .bk-turn-shadow{
          position:absolute; z-index:7; top:0; bottom:0; width:22%; transform:translateX(-50%); pointer-events:none; will-change:left,opacity;
          background:radial-gradient(ellipse at 50% 50%,rgba(48,28,6,.5),rgba(48,28,6,.17) 36%,transparent 76%);
          transition:left var(--bk-turn-duration,40ms) cubic-bezier(.2,.72,.2,1),opacity var(--bk-turn-duration,40ms) cubic-bezier(.2,.72,.2,1);
        }
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
        @media(prefers-reduced-motion:reduce){ .bk-cover{animation-duration:.01s!important;animation-delay:0s!important}.bk-turn-leaf{transition-duration:.01ms!important}.bk-scene--embedded .bk-stage{animation:none!important} }
      `}</style>
    </div>
  );
}

function BookLeaf({
  leaf,
  side,
  firstLeaf,
  decorative = false,
}: {
  leaf: SpreadPage;
  side: "left" | "right";
  firstLeaf: boolean;
  decorative?: boolean;
}) {
  return (
    <section
      lang="tr"
      className={`bk-leaf bk-leaf--${side}`}
      aria-label={!decorative && leaf.number ? `Sayfa ${leaf.number}` : undefined}
      aria-hidden={decorative || undefined}
    >
      <header className="bk-running">{leaf.page ? "İÇİNDEKİLER" : "MARINER’S BOOK"}</header>
      <div className="bk-page">
        {leaf.page ? (
          <ContentsPage page={leaf.page} firstPage={leaf.number === 1} decorative={decorative} />
        ) : (
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

function BookNavigationLink({
  to,
  className,
  decorative,
  children,
}: {
  to: string;
  className: string;
  decorative: boolean;
  children: ReactNode;
}) {
  if (decorative) return <span className={className}>{children}</span>;
  return <Link to={to} className={className} draggable={false}>{children}</Link>;
}

function ContentsPage({
  page,
  firstPage,
  decorative,
}: {
  page: BookPageSpec;
  firstPage: boolean;
  decorative: boolean;
}) {
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

      <BookNavigationLink to={page.to} className="bk-chapter" decorative={decorative}>
        <span className="bk-chapter-numeral">{page.numeral}.</span>
        <span className="bk-chapter-title">
          {page.title.toLocaleUpperCase("tr")}
          {page.continuation ? <em className="bk-cont"> (devam)</em> : null}
        </span>
      </BookNavigationLink>
      <div className="bk-chapter-rule" />

      {page.sections.map((section, sectionIndex) => (
        <section key={sectionIndex} className="bk-section">
          {section.heading && <h2 className="bk-section-heading">{section.heading}</h2>}
          {section.entries.map((entry) => (
            <BookNavigationLink key={entry.to} to={entry.to} className="bk-entry" decorative={decorative}>
              <span className="bk-entry-label">{entry.label}</span>
              <span className="bk-leader" aria-hidden="true" />
              <span className="bk-anchor" aria-hidden="true">⚓</span>
            </BookNavigationLink>
          ))}
        </section>
      ))}
    </nav>
  );
}
