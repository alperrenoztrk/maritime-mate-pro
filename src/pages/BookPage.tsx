import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent,
  type CSSProperties,
  type ReactNode,
  type WheelEvent,
} from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  BookCollectionLibrary,
  BookVolumeLibrary,
} from "@/components/book/BookVolumeLibrary";
import {
  BookLandscapeGate,
  requestBookLandscape,
} from "@/components/book/BookLandscapeGate";
import {
  getBookPagesForVolume,
  getBookVolume,
  getBookVolumesForCollection,
  isBookVolumeId,
  type BookPageSpec,
  type BookVolume,
} from "@/data/bookContents";
import {
  getBookCollection,
  isBookCollectionId,
  type BookCollectionId,
  type BookVolumeId,
} from "@/data/bookVolumes";
import {
  getBookPageLayout,
  getBookTurnProgress,
  getBookTurnSettleDuration,
  paginateBookPages,
  shouldCompleteBookTurn,
  type BookPageLayout,
  type BookTurnDirection,
} from "@/lib/bookMotion";
import {
  getBookSurfaceOrientation,
  mapBookDelta,
  mapBookPointToLocal,
  type BookSurfaceOrientation,
} from "@/lib/bookOrientation";

interface SpreadPage {
  page: BookPageSpec | null;
  number: number | null;
  volume: BookVolume;
}

interface ActiveTurn {
  direction: BookTurnDirection;
  fromIndex: number;
  toIndex: number;
}

interface PointerStart {
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
  leafWidth: number;
  /** Frozen at pointerdown so a mid-gesture mode flip cannot corrupt the drag. */
  orientation: BookSurfaceOrientation;
}

interface BookPageProps {
  /** Opens inside the home-page launcher instead of becoming a full-screen route. */
  embedded?: boolean;
  /** Home-page selection opens one of the six top-level collections. */
  collectionId?: BookCollectionId;
  /** A subject, system or operation can also be opened directly. */
  volumeId?: BookVolumeId;
  /** Dismisses an embedded book from the rotated overlay's exit control. */
  onClose?: () => void;
}

const clampNumber = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

/** Six main books lead to their subject/system/operation sub-book shelves. */
export default function BookPage({
  embedded = false,
  collectionId,
  volumeId,
  onClose,
}: BookPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [embeddedVolumeId, setEmbeddedVolumeId] = useState<BookVolumeId | null>(null);
  const queryCollectionId = searchParams.get("collection");
  const queryVolumeId = searchParams.get("volume");
  const selectedCollectionId = collectionId
    ?? (isBookCollectionId(queryCollectionId) ? queryCollectionId : null);

  if (!selectedCollectionId) {
    return (
      <BookCollectionLibrary
        compact={embedded}
        onSelect={(nextCollectionId) => setSearchParams({ collection: nextCollectionId })}
      />
    );
  }

  const collection = getBookCollection(selectedCollectionId);
  const collectionVolumes = getBookVolumesForCollection(selectedCollectionId);
  const requestedVolumeId = volumeId
    ?? embeddedVolumeId
    ?? (isBookVolumeId(queryVolumeId) ? queryVolumeId : null);
  const selectedVolumeId = requestedVolumeId
    && collectionVolumes.some((volume) => volume.id === requestedVolumeId)
      ? requestedVolumeId
      : collection.directVolumeId
        && collectionVolumes.some((volume) => volume.id === collection.directVolumeId)
        ? collection.directVolumeId
        : null;

  if (!selectedVolumeId) {
    return (
      <BookVolumeLibrary
        compact={embedded}
        collection={collection}
        volumes={collectionVolumes}
        onSelect={(nextVolumeId) => {
          requestBookLandscape();
          if (embedded || collectionId) {
            setEmbeddedVolumeId(nextVolumeId);
            return;
          }
          setSearchParams({
            collection: selectedCollectionId,
            volume: nextVolumeId,
          });
        }}
      />
    );
  }

  // The rotated overlay covers the surrounding UI, so it needs a real exit:
  // a shelf-picked volume pops back to its shelf, an embedded book closes the
  // launcher, and route books fall back to the gate's history.back().
  const handleBookExit = embeddedVolumeId ? () => setEmbeddedVolumeId(null) : onClose;

  return (
    <OpenBookVolume
      key={selectedVolumeId}
      embedded={embedded}
      volumeId={selectedVolumeId}
      onExit={handleBookExit}
    />
  );
}

/** Compact, two-leaf table of contents with gesture-driven page turns. */
function OpenBookVolume({
  embedded,
  volumeId,
  onExit,
}: {
  embedded: boolean;
  volumeId: BookVolumeId;
  onExit?: () => void;
}) {
  const activeVolume = getBookVolume(volumeId);
  const volumePages = useMemo(() => getBookPagesForVolume(volumeId), [volumeId]);
  const stageRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<PointerStart | null>(null);
  const wheelLock = useRef(false);
  const turnLock = useRef(false);
  const suppressClick = useRef(false);
  const wheelTimer = useRef<number | null>(null);
  const clickTimer = useRef<number | null>(null);
  const settleFrame = useRef<number | null>(null);
  const turnRef = useRef<ActiveTurn | null>(null);
  const progressRef = useRef(0);
  /** Queued programmatic settle for when the turn leaf has not mounted yet. */
  const pendingSettle = useRef<{ from: number; complete: boolean } | null>(null);
  const turnLeafRef = useRef<HTMLDivElement | null>(null);
  const frontFaceRef = useRef<HTMLDivElement | null>(null);
  const backFaceRef = useRef<HTMLDivElement | null>(null);
  const shadowRef = useRef<HTMLSpanElement | null>(null);
  const measureCanvas = useRef<HTMLCanvasElement | null>(null);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [turn, setTurn] = useState<ActiveTurn | null>(null);
  const [measuredLayout, setMeasuredLayout] = useState<BookPageLayout | null>(null);
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
    const layout = measuredLayout
      ?? getBookPageLayout(volumeSize.width, volumeSize.height, volumeSize.fontScale);
    return paginateBookPages(volumePages, layout);
  }, [measuredLayout, volumePages, volumeSize]);

  const spreads = useMemo<SpreadPage[][]>(() => {
    // A real volume starts with the inside cover on the left and page 1 on the right.
    const leaves: SpreadPage[] = [
      { page: null, number: null, volume: activeVolume },
      ...paginatedBookPages.map((page, index) => ({
        page,
        number: index + 1,
        volume: activeVolume,
      })),
    ];
    if (leaves.length % 2 !== 0) {
      leaves.push({ page: null, number: null, volume: activeVolume });
    }

    const result: SpreadPage[][] = [];
    for (let index = 0; index < leaves.length; index += 2) {
      result.push([leaves[index], leaves[index + 1]]);
    }
    return result;
  }, [activeVolume, paginatedBookPages]);

  useEffect(() => () => {
    if (wheelTimer.current) window.clearTimeout(wheelTimer.current);
    if (clickTimer.current) window.clearTimeout(clickTimer.current);
    if (settleFrame.current) window.cancelAnimationFrame(settleFrame.current);
  }, []);

  /**
   * Derives the real print capacity from the rendered paper instead of
   * estimates, so every leaf is filled and no printed line is ever clipped.
   */
  const measurePrintCapacity = useCallback(() => {
    const volume = volumeRef.current;
    if (!volume || typeof window === "undefined") return;
    const pageElement = volume.querySelector<HTMLElement>(".bk-leaf--right .bk-page")
      ?? volume.querySelector<HTMLElement>(".bk-page");
    if (!pageElement) return;
    const pageStyle = window.getComputedStyle(pageElement);
    const innerHeight = pageElement.clientHeight
      - (Number.parseFloat(pageStyle.paddingTop) || 0)
      - (Number.parseFloat(pageStyle.paddingBottom) || 0);
    const innerWidth = pageElement.clientWidth
      - (Number.parseFloat(pageStyle.paddingLeft) || 0)
      - (Number.parseFloat(pageStyle.paddingRight) || 0);
    if (innerHeight < 60 || innerWidth < 60) return;

    let rowHeight = 25;
    let labelWidth = innerWidth * 0.72;
    let glyphWidth = 5.4;
    const entryElement = volume.querySelector<HTMLElement>(".bk-entry");
    if (entryElement) {
      const entryStyle = window.getComputedStyle(entryElement);
      const fontSize = Number.parseFloat(entryStyle.fontSize) || 10;
      const lineHeight = Number.parseFloat(entryStyle.lineHeight) || fontSize * 1.3;
      const paddingY = (Number.parseFloat(entryStyle.paddingTop) || 0)
        + (Number.parseFloat(entryStyle.paddingBottom) || 0);
      rowHeight = Math.max(Number.parseFloat(entryStyle.minHeight) || 0, lineHeight + paddingY, 14);
      labelWidth = (pageElement.clientWidth - (Number.parseFloat(entryStyle.paddingLeft) || 0)) * 0.78;
      const canvas = (measureCanvas.current ??= document.createElement("canvas"));
      const context = canvas.getContext("2d");
      if (context) {
        context.font = `${entryStyle.fontWeight} ${entryStyle.fontSize} ${entryStyle.fontFamily}`;
        const sample = "Denizcilikte seyir güvenliği ve gemi stabilite hesapları";
        const sampleWidth = context.measureText(sample).width;
        if (sampleWidth > 0) glyphWidth = sampleWidth / sample.length;
      }
    }

    const rowBudget = clampNumber(Math.floor((innerHeight - 4) / rowHeight), 4, 24);
    const charactersPerLine = clampNumber(Math.floor(labelWidth / Math.max(glyphWidth, 3)), 12, 72);
    setMeasuredLayout((current) =>
      current && current.rowBudget === rowBudget && current.charactersPerLine === charactersPerLine
        ? current
        : { rowBudget, charactersPerLine },
    );
  }, []);

  useEffect(() => {
    const volume = volumeRef.current;
    if (!volume || typeof window === "undefined") return;

    const updateMetrics = () => {
      // offsetWidth/offsetHeight are layout values, unaffected by the rotated
      // overlay's transform (getBoundingClientRect would report swapped axes).
      const width = volume.offsetWidth;
      const height = volume.offsetHeight;
      const parsedScale = Number.parseFloat(
        window.getComputedStyle(document.documentElement).getPropertyValue("--font-scale"),
      );
      const fontScale = Number.isFinite(parsedScale) ? parsedScale : 1;
      setVolumeSize((current) => {
        if (
          Math.abs(current.width - width) < 1 &&
          Math.abs(current.height - height) < 1 &&
          Math.abs(current.fontScale - fontScale) < 0.01
        ) return current;
        return { width, height, fontScale };
      });
      measurePrintCapacity();
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
  }, [measurePrintCapacity]);

  useEffect(() => {
    setSpreadIndex((current) => Math.min(current, Math.max(0, spreads.length - 1)));
  }, [spreads.length]);

  /**
   * Font metrics and translated labels can wrap differently from the initial
   * estimate. Tighten the shared row budget before paint whenever a rendered
   * contents leaf is still taller than its printable paper area.
   */
  useLayoutEffect(() => {
    const volume = volumeRef.current;
    if (!volume) return;
    const pages = volume.querySelectorAll<HTMLElement>(
      ".bk-spread:not(.bk-spread--turning) .bk-page",
    );
    const hasOverflow = [...pages].some(
      (page) => Boolean(page.querySelector("nav")) && page.scrollHeight > page.clientHeight + 1,
    );
    if (!hasOverflow) return;

    setMeasuredLayout((current) => {
      const layout = current
        ?? getBookPageLayout(volumeSize.width, volumeSize.height, volumeSize.fontScale);
      if (layout.rowBudget <= 4) return current;
      return { ...layout, rowBudget: layout.rowBudget - 1 };
    });
  }, [measuredLayout, spreadIndex, spreads.length, volumeSize]);

  useEffect(() => {
    if (!embedded) return;
    stageRef.current?.focus({ preventScroll: true });
  }, [embedded]);

  /** Writes one animation frame straight to the DOM — no re-render per frame. */
  const applyTurnFrame = useCallback((progress: number) => {
    const active = turnRef.current;
    const leaf = turnLeafRef.current;
    if (!active || !leaf) return;
    const sign = active.direction === "forward" ? -1 : 1;
    // Depth comes from the parent perspective on .bk-spread, so the vanishing
    // point stays fixed at the spine instead of following the leaf.
    leaf.style.transform = `rotateY(${(180 * progress * sign).toFixed(3)}deg)`;
    const shade = Math.sin(Math.PI * progress);
    leaf.style.setProperty("--bk-shade", shade.toFixed(3));
    if (frontFaceRef.current) frontFaceRef.current.style.visibility = progress < 0.5 ? "visible" : "hidden";
    if (backFaceRef.current) backFaceRef.current.style.visibility = progress < 0.5 ? "hidden" : "visible";
    if (shadowRef.current) {
      const foldCenter = 50 + (active.direction === "forward" ? 50 : -50) * Math.cos(Math.PI * progress);
      shadowRef.current.style.left = `${foldCenter.toFixed(2)}%`;
      shadowRef.current.style.opacity = (shade * 0.52).toFixed(3);
    }
  }, []);

  const finalizeTurn = useCallback((complete: boolean) => {
    const active = turnRef.current;
    if (complete && active) setSpreadIndex(active.toIndex);
    pendingSettle.current = null;
    if (settleFrame.current) {
      window.cancelAnimationFrame(settleFrame.current);
      settleFrame.current = null;
    }
    turnRef.current = null;
    progressRef.current = 0;
    turnLock.current = false;
    setTurn(null);
  }, []);

  /** Eases the grabbed leaf the rest of the way (or back) at 60fps. */
  const settleTurn = useCallback((fromProgress: number, complete: boolean) => {
    if (settleFrame.current) window.cancelAnimationFrame(settleFrame.current);
    const target = complete ? 1 : 0;
    const durationMs = reducedMotion ? 0 : getBookTurnSettleDuration(fromProgress, complete);
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
  }, [applyTurnFrame, finalizeTurn, reducedMotion]);

  const beginTurn = useCallback((direction: BookTurnDirection, fromIndex: number, toIndex: number) => {
    turnLock.current = true;
    const active: ActiveTurn = { direction, fromIndex, toIndex };
    turnRef.current = active;
    progressRef.current = 0;
    setTurn(active);
  }, []);

  /** Runs the settle now, or queues it until the turn leaf mounts. */
  const settleWhenReady = useCallback((fromProgress: number, complete: boolean) => {
    if (turnLeafRef.current) {
      settleTurn(fromProgress, complete);
      return;
    }
    // beginTurn's React commit has not mounted the leaf yet; bindTurnLeaf
    // flushes this queue so the animation always plays from its first frame.
    pendingSettle.current = { from: fromProgress, complete };
  }, [settleTurn]);

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

    beginTurn(direction, spreadIndex, nextIndex);
    settleWhenReady(0, true);
  };

  const stepSpread = (direction: BookTurnDirection) => {
    turnTo(spreadIndex + (direction === "forward" ? 1 : -1), direction);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (event.button !== 0 || turnLock.current || !coverDone) return;
    const volume = volumeRef.current;
    const bounds = volume?.getBoundingClientRect();
    if (!volume || !bounds) return;
    const orientation = getBookSurfaceOrientation(volume);
    const local = mapBookPointToLocal(event.clientX, event.clientY, bounds, orientation);
    if (local.x < 0 || local.x > volume.offsetWidth) return;

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
      leafWidth: volume.offsetWidth / 2,
      orientation,
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
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
        // Vertical intent: hand the gesture back to the page scroll.
        pointerStart.current = null;
        return;
      }
      // Dragging left pulls the right-hand leaf over; dragging right pulls the
      // left-hand leaf back — exactly like paper.
      const direction: BookTurnDirection = deltaX < 0 ? "forward" : "backward";
      const toIndex = spreadIndex + (direction === "forward" ? 1 : -1);
      if (toIndex < 0 || toIndex >= spreads.length || turnLock.current) return;
      start.horizontal = true;
      start.direction = direction;
      event.currentTarget.setPointerCapture(event.pointerId);
      beginTurn(direction, spreadIndex, toIndex);
    }

    event.stopPropagation();
    start.lastX = deltaX;
    start.lastTime = event.timeStamp;
    start.progress = getBookTurnProgress(deltaX, start.leafWidth, start.direction);
    if (start.progress > 0.035) suppressClick.current = true;
    progressRef.current = start.progress;
    applyTurnFrame(start.progress);
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
      const progress = getBookTurnProgress(deltaX, start.leafWidth, start.direction);
      progressRef.current = progress;
      suppressClick.current = true;
      armClickSuppressionReset();
      settleWhenReady(progress, shouldCompleteBookTurn(progress, velocityX, start.direction));
      return;
    }

    if ((event.target as HTMLElement).closest("a")) return;
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 12) return;
    const volume = volumeRef.current;
    const bounds = volume?.getBoundingClientRect();
    if (!volume || !bounds) return;
    const local = mapBookPointToLocal(event.clientX, event.clientY, bounds, start.orientation);
    if (local.x < volume.offsetWidth * .18) stepSpread("backward");
    if (local.x > volume.offsetWidth * .82) stepSpread("forward");
  };

  const onPointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const start = pointerStart.current;
    pointerStart.current = null;
    releasePointerCapture(event);
    if (!start?.horizontal) return;
    suppressClick.current = true;
    armClickSuppressionReset();
    settleWhenReady(progressRef.current, false);
  };

  const onClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressClick.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick.current = false;
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    const { deltaX, deltaY } = mapBookDelta(
      event.deltaX,
      event.deltaY,
      getBookSurfaceOrientation(stageRef.current),
    );
    const horizontalIntent = Math.abs(deltaX) > Math.abs(deltaY) || event.shiftKey;
    if (
      !horizontalIntent ||
      wheelLock.current ||
      turnLock.current ||
      Math.abs(deltaX || deltaY) < 16
    ) return;
    event.stopPropagation();
    wheelLock.current = true;
    stepSpread((deltaX || deltaY) > 0 ? "forward" : "backward");
    if (wheelTimer.current) window.clearTimeout(wheelTimer.current);
    wheelTimer.current = window.setTimeout(() => {
      wheelLock.current = false;
      wheelTimer.current = null;
    }, 650);
  };

  const bindTurnLeaf = useCallback((element: HTMLDivElement | null) => {
    turnLeafRef.current = element;
    if (!element) return;
    applyTurnFrame(progressRef.current);
    const pending = pendingSettle.current;
    if (pending) {
      pendingSettle.current = null;
      settleTurn(pending.from, pending.complete);
    }
  }, [applyTurnFrame, settleTurn]);

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

  return (
    <BookLandscapeGate embedded={embedded} onExit={onExit}>
      <div
        className={`bk-scene ${embedded ? "bk-scene--embedded" : ""}`}
        style={{
          "--bk-volume-cover": activeVolume.cover,
          "--bk-volume-cover-deep": activeVolume.coverDeep,
          "--bk-volume-accent": activeVolume.accent,
        } as CSSProperties}
      >
      {!embedded && <div className="bk-ambient" aria-hidden="true" />}
      {!embedded && <h1 className="bk-title">{activeVolume.title}</h1>}

      <div
        ref={stageRef}
        className="bk-stage"
        role="region"
        aria-label={`${activeVolume.title} içindekiler`}
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
                    ref={shadowRef}
                    className={`bk-turn-shadow bk-turn-shadow--${turn.direction}`}
                    aria-hidden="true"
                  />
                  <div
                    ref={bindTurnLeaf}
                    className={`bk-turn-leaf bk-turn-leaf--${turn.direction}`}
                    aria-hidden="true"
                  >
                    <div ref={frontFaceRef} className="bk-turn-face bk-turn-face--front">
                      <BookLeaf
                        leaf={turningFront}
                        side={turn.direction === "forward" ? "right" : "left"}
                        firstLeaf={false}
                        decorative
                      />
                    </div>
                    <div ref={backFaceRef} className="bk-turn-face bk-turn-face--back">
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
                    <div className="bk-cover-volume">{activeVolume.numeral}</div>
                    <div className="bk-cover-title">{activeVolume.title.toLocaleUpperCase("tr")}</div>
                    <div className="bk-cover-rule" />
                    <div className="bk-cover-subtitle">{activeVolume.subtitle}</div>
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
        Sayfayı sürükleyerek çevirin · {spreadIndex + 1} / {spreads.length} yaprak
      </p>

      <style>{`
        .bk-scene{
          position:relative; display:flex; width:100%; min-width:0; max-width:100%; min-height:100svh; flex-direction:column; align-items:center; overflow:hidden;
          overflow-anchor:none; -webkit-text-size-adjust:100%; text-size-adjust:100%;
          padding: max(.65rem,env(safe-area-inset-top)) 2px max(.55rem,env(safe-area-inset-bottom));
          background:linear-gradient(180deg,#06152a 0%,#0a2949 54%,#051421 100%);
        }
        .bk-ambient{ position:absolute; inset:0; pointer-events:none; background:radial-gradient(ellipse at 50% 20%,rgba(71,184,225,.19),transparent 52%); }
        .bk-title{ position:relative; z-index:20; margin:0 0 6px; color:rgba(242,217,138,.84); font-size:clamp(.58rem,1.2vw,.78rem); font-weight:700; letter-spacing:.34em; text-indent:.34em; }
        .bk-stage{ position:relative; z-index:10; width:100%; flex:1; min-height:0; display:flex; align-items:center; justify-content:center; outline:none; touch-action:pan-y; cursor:grab; user-select:none; -webkit-user-select:none; }
        .bk-stage:active{ cursor:grabbing; }
        .bk-stage:focus-visible .bk-cover-board{ outline:1px dotted rgba(242,217,138,.62); outline-offset:3px; }
        .bk-cover-board{
          position:relative; width:min(94vw,780px); height:min(68svh,540px); min-height:320px; padding:clamp(5px,.85vw,11px);
          border:1px solid color-mix(in srgb,var(--bk-volume-accent) 48%,#d4a83d); border-radius:9px 13px 13px 9px;
          background:repeating-linear-gradient(25deg,rgba(255,255,255,.018) 0 2px,transparent 2px 8px),linear-gradient(145deg,var(--bk-volume-cover),var(--bk-volume-cover-deep) 72%,#050b13);
          box-shadow:0 24px 64px rgba(0,0,0,.62),inset 0 0 30px rgba(0,0,0,.62);
        }
        .bk-cover-board::before,.bk-cover-board::after{ content:""; position:absolute; width:22px; height:22px; pointer-events:none; border-color:rgba(218,177,76,.58); }
        .bk-cover-board::before{ left:10px; top:10px; border-left:1px solid; border-top:1px solid; }
        .bk-cover-board::after{ right:10px; bottom:10px; border-right:1px solid; border-bottom:1px solid; }
        .bk-volume{ position:relative; z-index:1; width:100%; height:100%; border-radius:3px 8px 8px 3px; background:#d1b982; box-shadow:0 8px 18px rgba(0,0,0,.48); }
        .bk-volume::before,.bk-volume::after{ content:""; position:absolute; z-index:3; top:1.3%; bottom:1.3%; width:9px; pointer-events:none; background:repeating-linear-gradient(90deg,#f1e4c4 0 1.5px,#cbb47d 1.5px 3px); }
        .bk-volume::before{ left:-1px; border-radius:3px 0 0 3px; } .bk-volume::after{ right:-1px; border-radius:0 5px 5px 0; }
        .bk-spread{ position:absolute; inset:0; display:grid; grid-template-columns:1fr 1fr; border-radius:3px 7px 7px 3px; perspective:1900px; }
        .bk-spread--turning{ user-select:none; -webkit-user-select:none; }
        .bk-leaf{
          position:relative; min-width:0; height:100%; overflow:hidden; padding:clamp(14px,2.5vw,34px) clamp(11px,2.6vw,38px) 17px;
          display:grid; grid-template-rows:auto minmax(0,1fr) auto; color:#000; font-family:Georgia,'Times New Roman',serif;
          background:radial-gradient(25% 16% at 82% 13%,rgba(137,82,23,.075),transparent 72%),repeating-linear-gradient(180deg,transparent 0 11px,rgba(120,80,20,.035) 11px 12px),linear-gradient(180deg,#fbf2d9,#efdfbc);
        }
        .bk-leaf--left{ border-radius:3px 0 0 3px; box-shadow:inset 12px 0 16px -14px rgba(65,39,10,.42),inset -22px 0 26px -24px rgba(57,34,8,.72),inset 0 7px 9px -8px rgba(67,40,11,.34); }
        .bk-leaf--right{ border-radius:0 7px 7px 0; box-shadow:inset -12px 0 16px -14px rgba(65,39,10,.42),inset 22px 0 26px -24px rgba(57,34,8,.72),inset 0 7px 9px -8px rgba(67,40,11,.34); }
        .bk-gutter{ position:absolute; z-index:4; top:0; bottom:0; left:50%; width:clamp(20px,3.2vw,48px); transform:translateX(-50%); pointer-events:none; background:linear-gradient(90deg,transparent,rgba(58,35,9,.24) 42%,rgba(255,249,229,.22) 52%,rgba(58,35,9,.2) 62%,transparent); mix-blend-mode:multiply; }
        .bk-running{ min-width:0; max-width:100%; padding-bottom:8px; text-align:center; overflow-wrap:anywhere; word-break:break-word; hyphens:auto; color:#000; border-bottom:1px solid rgba(120,80,20,.18); font-size:clamp(.46rem,.78vw,.65rem); font-weight:600; letter-spacing:.28em; text-indent:.28em; }
        .bk-running::before{ content:"❖  "; opacity:.45; }.bk-running::after{ content:"  ❖"; opacity:.45; }
        .bk-page{ min-width:0; min-height:0; max-width:100%; overflow:hidden; overflow-anchor:none; padding:clamp(10px,1.7vw,20px) 0 8px; }
        .bk-page :where(nav,section,a,span,h2){ min-width:0; max-width:100%; overflow-wrap:anywhere; }
        .bk-page a{ -webkit-user-drag:none; }
        .bk-toc-header{ display:flex; align-items:center; gap:8px; margin-bottom:9px; }
        .bk-toc-title{ flex:0 auto; color:#000; font-size:clamp(.66rem,1.45vw,1.08rem); font-weight:700; letter-spacing:.22em; text-indent:.22em; }
        .bk-toc-rule{ flex:1; height:1px; background:linear-gradient(90deg,transparent,rgba(176,124,32,.6),transparent); }
        .bk-fleuron{ margin:-2px 0 8px; text-align:center; color:#000; }
        .bk-chapter{ display:flex; align-items:baseline; gap:.45em; padding:4px 0; color:#000; text-decoration:none; }
        .bk-chapter:focus-visible,.bk-entry:focus-visible{ outline:2px dotted rgba(74,49,19,.58); outline-offset:2px; }
        .bk-chapter-numeral{ flex:0 0 auto; white-space:nowrap; color:#000; font-size:clamp(.69rem,1.35vw,1.02rem); font-weight:700; }
        .bk-chapter-title{ min-width:0; overflow-wrap:anywhere; hyphens:auto; font-size:clamp(.67rem,1.3vw,1rem); font-weight:700; letter-spacing:.09em; }
        .bk-cont{ font-size:.74em; font-weight:400; font-style:italic; letter-spacing:0; color:#000; }
        .bk-chapter-rule{ height:1px; margin:1px 0 8px; background:linear-gradient(90deg,rgba(176,124,32,.68),rgba(176,124,32,.1)); }
        .bk-section+.bk-section{ margin-top:9px; }
        .bk-section-heading{ overflow-wrap:anywhere; hyphens:auto; margin:5px 0 2px; color:#000; font-size:clamp(.48rem,.85vw,.68rem); font-weight:700; letter-spacing:.18em; text-transform:uppercase; }
        .bk-entry{ display:flex; align-items:baseline; min-width:0; min-height:31px; padding:5px 0 2px 8px; color:#000; text-decoration:none; font-size:clamp(.56rem,1.05vw,.83rem); line-height:1.3; }
        .bk-entry-label{ min-width:0; max-width:78%; overflow-wrap:anywhere; hyphens:auto; }.bk-leader{ flex:1; min-width:8px; margin:0 .36em; border-bottom:1.5px dotted rgba(120,80,20,.42); transform:translateY(-2px); }.bk-anchor{ flex:0 0 auto; font-size:.66em; opacity:.62; }
        .bk-folio{ padding-top:6px; color:#000; border-top:1px solid rgba(120,80,20,.16); font-size:clamp(.48rem,.82vw,.68rem); font-variant-numeric:oldstyle-nums; }
        .bk-leaf--left .bk-folio{ text-align:left; }.bk-leaf--right .bk-folio{ text-align:right; }
        .bk-frontispiece{ height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; color:#000; }
        .bk-frontispiece-mark{ font-size:clamp(1.1rem,3.5vw,2.5rem); }
        .bk-frontispiece strong{ max-width:82%; margin-top:7px; font-size:clamp(.62rem,1.4vw,1rem); line-height:1.3; text-wrap:balance; }
        .bk-frontispiece p{ max-width:84%; margin-top:8px; overflow-wrap:anywhere; word-break:break-word; hyphens:auto; font-size:clamp(.42rem,.78vw,.6rem); letter-spacing:.12em; text-transform:uppercase; }
        .bk-turn-leaf{
          position:absolute; z-index:8; top:0; bottom:0; width:50%; pointer-events:none;
          transform-style:preserve-3d; will-change:transform;
        }
        .bk-turn-leaf--forward{ right:0; transform-origin:left center; }
        .bk-turn-leaf--backward{ left:0; transform-origin:right center; }
        .bk-turn-face{
          position:absolute; inset:0; overflow:hidden;
          backface-visibility:hidden; -webkit-backface-visibility:hidden;
        }
        .bk-turn-face--front{ transform:rotateY(0deg) translateZ(.4px); }
        .bk-turn-face--back{ transform:rotateY(180deg) translateZ(.4px); }
        .bk-turn-face .bk-leaf{ position:absolute; inset:0; width:100%; }
        .bk-turn-face--front::after,.bk-turn-face--back::after{
          content:""; position:absolute; inset:0; pointer-events:none; mix-blend-mode:multiply;
        }
        .bk-turn-face--front::after{ opacity:calc(var(--bk-shade,0) * .62); }
        .bk-turn-face--back::after{ opacity:calc(var(--bk-shade,0) * .74); }
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
          position:absolute; z-index:7; top:0; bottom:0; width:22%; transform:translateX(-50%); pointer-events:none;
          left:50%; opacity:0; will-change:left,opacity;
          background:radial-gradient(ellipse at 50% 50%,rgba(48,28,6,.5),rgba(48,28,6,.17) 36%,transparent 76%);
        }
        .bk-ribbon{ position:absolute; z-index:5; top:-2px; right:10%; width:clamp(8px,1.15vw,15px); height:clamp(42px,8vw,74px); pointer-events:none; background:linear-gradient(90deg,#741717,#a42d2d 48%,#741717); clip-path:polygon(0 0,100% 0,100% 100%,50% 86%,0 100%); box-shadow:0 3px 5px rgba(0,0,0,.3); }
        .bk-cover{ position:absolute; z-index:12; inset:0; transform-style:preserve-3d; transform-origin:left center; transform:perspective(1500px) rotateY(0deg); animation:bk-cover-open 1.05s cubic-bezier(.72,.04,.22,1) .18s forwards; pointer-events:none; }
        .bk-cover-face{ position:absolute; inset:0; overflow:hidden; border-radius:3px 8px 8px 3px; backface-visibility:hidden; -webkit-backface-visibility:hidden; }
        .bk-cover-front{ transform:translateZ(.8px); border:1px solid color-mix(in srgb,var(--bk-volume-accent) 55%,#d4a83d); background:radial-gradient(130% 110% at 50% 38%,transparent 52%,rgba(0,0,0,.45) 100%),repeating-linear-gradient(115deg,rgba(255,255,255,.02) 0 2px,transparent 2px 7px),linear-gradient(140deg,color-mix(in srgb,var(--bk-volume-cover) 88%,white),var(--bk-volume-cover) 48%,var(--bk-volume-cover-deep)); box-shadow:inset 0 0 30px rgba(0,0,0,.48),0 8px 22px rgba(0,0,0,.5); }
        .bk-cover-back{ transform:rotateY(180deg) translateZ(.8px); border-radius:8px 3px 3px 8px; background:linear-gradient(180deg,#f5e8c8,#e6d1a5); box-shadow:inset 0 0 18px rgba(120,80,20,.25); }
        .bk-cover-trim{ position:absolute; inset:6%; display:flex; flex-direction:column; align-items:center; justify-content:center; border:1.5px solid rgba(218,165,32,.58); }
        .bk-cover-trim::after{ content:""; position:absolute; inset:2.4%; border:1px solid rgba(218,165,32,.28); }
        .bk-emblem{ color:var(--bk-volume-accent); font-size:clamp(2rem,6vw,4.8rem); filter:drop-shadow(0 0 7px color-mix(in srgb,var(--bk-volume-accent) 45%,transparent)); }
        .bk-cover-volume{ margin-top:4px; color:color-mix(in srgb,var(--bk-volume-accent) 84%,#f2d98a); font:700 clamp(.42rem,.8vw,.6rem) Georgia,serif; letter-spacing:.22em; }
        .bk-cover-title{ max-width:78%; margin-top:8px; text-align:center; text-wrap:balance; overflow-wrap:anywhere; word-break:break-word; hyphens:auto; color:#f2d98a; font:700 clamp(.72rem,2.7vw,1.75rem)/1.24 Georgia,'Times New Roman',serif; letter-spacing:.09em; }
        .bk-cover-rule{ width:22%; height:1px; margin:15px 0; background:linear-gradient(90deg,transparent,#d5ac4e,transparent); }
        .bk-cover-subtitle{ max-width:78%; text-align:center; overflow-wrap:anywhere; word-break:break-word; hyphens:auto; color:rgba(218,177,76,.72); font:600 clamp(.38rem,.8vw,.63rem)/1.35 Georgia,'Times New Roman',serif; letter-spacing:.18em; }
        @keyframes bk-cover-open{ from{ transform:perspective(1500px) rotateY(0deg); } to{ transform:perspective(1500px) rotateY(-178deg); } }
        .bk-instruction{ position:relative; z-index:20; max-width:94vw; margin-top:6px; text-align:center; overflow-wrap:anywhere; color:rgba(255,255,255,.68); font-size:clamp(.55rem,1vw,.72rem); letter-spacing:.04em; }
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
          from{ transform:scaleX(.54); opacity:.82; }
          to{ transform:scaleX(1); opacity:1; }
        }
        @keyframes bk-inline-unfold-wide{
          from{ transform:scale(.3,.64); opacity:.82; }
          to{ transform:scale(1); opacity:1; }
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
        @media(prefers-reduced-motion:reduce){ .bk-cover{animation-duration:.01s!important;animation-delay:0s!important}.bk-scene--embedded .bk-stage{animation:none!important} }
      `}</style>
      </div>
    </BookLandscapeGate>
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
      <header className="bk-running">{leaf.page ? leaf.volume.shortTitle.toLocaleUpperCase("tr") : leaf.volume.numeral}</header>
      <div className="bk-page">
        {leaf.page ? (
          <ContentsPage page={leaf.page} firstPage={leaf.number === 1} decorative={decorative} />
        ) : (
          <div className="bk-frontispiece" aria-hidden={!firstLeaf}>
            <div className="bk-frontispiece-mark">⚓</div>
            <strong>{leaf.volume.title}</strong>
            <p>{leaf.volume.subtitle}</p>
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
