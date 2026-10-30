import { useEffect, useRef, useState, type ReactNode, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, List, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ReadingPage {
  id: string;
  title: string;
  section: string;
  content: ReactNode;
}

function readInitialPage(storageKey: string, pages: readonly ReadingPage[]): number {
  if (!pages.length) return 0;
  try {
    const savedId = window.localStorage.getItem(storageKey);
    const index = pages.findIndex((page) => page.id === savedId);
    return index === -1 ? 0 : index;
  } catch {
    return 0;
  }
}

/**
 * Reusable mobile-first book surface: one conceptual page, rather than a
 * continuous document. Long content retains accessible within-page scrolling.
 */
export function PagedReadingSurface({
  title, subtitle, pages, storageKey, headerAction,
}: {
  title: string;
  subtitle?: string;
  pages: ReadingPage[];
  storageKey: string;
  headerAction?: ReactNode;
}) {
  const [index, setIndex] = useState(() => readInitialPage(storageKey, pages));
  const [contentsOpen, setContentsOpen] = useState(false);
  const [fontScale, setFontScale] = useState(() => {
    try {
      const saved = Number(window.localStorage.getItem("mariners-book:reader-font-scale"));
      return saved >= 0.9 && saved <= 1.4 ? saved : 1;
    } catch { return 1; }
  });
  const articleRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const total = pages.length;
  const updateFont = (delta: number) => {
    const next = Math.round(Math.min(1.4, Math.max(0.9, fontScale + delta)) * 10) / 10;
    setFontScale(next);
    try { window.localStorage.setItem("mariners-book:reader-font-scale", String(next)); } catch { /* disabled */ }
  };
  const current = pages[Math.min(index, Math.max(0, total - 1))];
  const pageId = current?.id;

  useEffect(() => {
    if (!pageId) return;
    try { window.localStorage.setItem(storageKey, pageId); } catch { /* private browsing */ }
  }, [pageId, storageKey]);

  const goTo = (next: number) => {
    const clamped = Math.min(Math.max(0, next), total - 1);
    setIndex(clamped);
    setContentsOpen(false);
    if (articleRef.current) articleRef.current.scrollTop = 0;
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input,textarea,select,button,a,[contenteditable=true],[role=dialog]")) return;
      if (event.key === "ArrowRight" && index < total - 1) {
        event.preventDefault(); goTo(index + 1);
      } else if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault(); goTo(index - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, total]);

  const handleTouchStart = (event: TouchEvent) => {
    if (event.touches.length !== 1) return;
    touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };
  const handleTouchEnd = (event: TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || event.changedTouches.length !== 1) return;
    const deltaX = event.changedTouches[0].clientX - start.x;
    const deltaY = event.changedTouches[0].clientY - start.y;
    // Leave vertical reading gestures, interactive elements and text selection alone.
    if (Math.abs(deltaX) < 75 || Math.abs(deltaX) < Math.abs(deltaY) * 1.6) return;
    if ((window.getSelection()?.toString() ?? "").length > 0) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest("button,a,input,select,textarea,[role=dialog]")) return;
    goTo(index + (deltaX < 0 ? 1 : -1));
  };

  if (!current) return <p className="p-6 text-sm text-muted-foreground">This chapter has no reading pages.</p>;

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-3 pb-[max(1rem,var(--safe-bottom))] pt-3 sm:px-6"
      aria-label={`Book reader: ${title}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-muted-foreground">{subtitle ?? "Learning library"}</p>
          <h1 data-page-title className="truncate text-lg font-bold tracking-tight text-foreground sm:text-2xl">{title}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {headerAction}
          <div className="flex items-center gap-1 rounded-xl border border-border/60 p-0.5" aria-label="Text size controls">
            <button type="button" aria-label="Decrease text size" title="Smaller text"
              disabled={fontScale <= 0.9} onClick={() => updateFont(-0.1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted disabled:opacity-40">
              <Minus className="h-4 w-4" aria-hidden />
            </button>
            <span className="text-xs font-semibold text-muted-foreground" aria-hidden>Aa</span>
            <button type="button" aria-label="Increase text size" title="Larger text"
              disabled={fontScale >= 1.4} onClick={() => updateFont(0.1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted disabled:opacity-40">
              <Plus className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <Button variant="outline" size="sm" className="min-h-10 gap-2 rounded-xl" type="button"
            onClick={() => setContentsOpen((previous) => !previous)} aria-expanded={contentsOpen}
            aria-controls="reader-chapters">
            <List className="h-4 w-4" aria-hidden /> Contents
          </Button>
        </div>
      </div>
      {contentsOpen && (
        <nav id="reader-chapters" aria-label="Book contents"
          className="max-h-52 overflow-y-auto rounded-xl border border-border/60 bg-card p-2 shadow-sm">
          <ol className="grid gap-1 sm:grid-cols-2">
            {pages.map((page, i) => (
              <li key={page.id}>
                <button type="button" onClick={() => goTo(i)}
                  aria-current={i === index ? "page" : undefined}
                  className={`w-full rounded-lg px-3 py-2 text-left text-xs leading-relaxed focus-visible:outline-2 focus-visible:outline-primary ${i === index ? "bg-primary/10 font-semibold text-primary" : "text-foreground hover:bg-muted"}`}>
                  <span className="mr-2 font-mono text-muted-foreground">{i + 1}.</span>{page.title}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="min-w-0 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
        <div className="flex items-center justify-between gap-2 border-b border-border/60 bg-muted/30 px-4 py-2.5">
          <span className="min-w-0 truncate text-xs font-semibold text-primary">{current.section}</span>
          <span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
            {index + 1} / {total}
          </span>
        </div>
        <div ref={articleRef} key={current.id} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
          className="h-[clamp(22rem,calc(100dvh-16rem),58rem)] overflow-y-auto overscroll-contain px-4 py-5 touch-pan-y sm:px-8 sm:py-8"
          tabIndex={0} aria-label={`Reading page ${index + 1}: ${current.title}`}>
          <article className="mx-auto max-w-[72ch] space-y-5 break-words">
            <h2 className="text-xl font-bold leading-snug text-foreground sm:text-2xl">{current.title}</h2>
            <div className="space-y-4 leading-[1.85] text-foreground/90"
              style={{ fontSize: `${fontScale}rem` }}>
              {current.content}
            </div>
          </article>
        </div>
        <div className="border-t border-border/60 p-3 sm:p-4">
          <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-muted" role="progressbar"
            aria-label="Reading progress" aria-valuemin={0} aria-valuemax={total} aria-valuenow={index + 1}>
            <div className="h-full rounded-full bg-primary transition-[width] duration-200 motion-reduce:transition-none"
              style={{ width: `${((index + 1) / total) * 100}%` }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button" className="h-12 gap-2 rounded-xl" disabled={index === 0}
              onClick={() => goTo(index - 1)}>
              <ChevronLeft className="h-4 w-4" aria-hidden /> Previous
            </Button>
            <Button type="button" className="h-12 gap-2 rounded-xl" disabled={index === total - 1}
              onClick={() => goTo(index + 1)}>
              Next <ChevronRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
          <p className="mt-2 text-center text-[11px] leading-relaxed text-muted-foreground">
            Swipe sideways to change pages. Long pages scroll inside the book.
          </p>
        </div>
      </div>
    </section>
  );
}
