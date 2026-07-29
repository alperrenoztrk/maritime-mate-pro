import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Menu,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import type { LessonDeck } from "@/data/lessonSlides";
import { SlideStage } from "@/components/lessons/SlideStage";
import { useSlidePlayback } from "@/hooks/useSlidePlayback";
import { getLessonProgress, setLessonProgress } from "@/services/lessonProgress";

/**
 * Slayt/"video" ders oynatıcısı.
 *
 * Üstte konu başlığı + slayt indeksi menüsü, ortada 16:9 slayt sahnesi, altta
 * oynat/duraklat, ilerleme çubuğu, slaytı tekrarla, ses aç/kapa, tam ekran ve
 * önceki/sonraki denetimleri bulunur. Seslendirme `useSlidePlayback` içinde
 * yürütülür (cihaz TTS → bulut TTS).
 */
export function LessonSlidePlayer({
  deck,
  categoryId,
  topicTitle,
  variant = "lesson",
}: {
  deck: LessonDeck;
  categoryId: string;
  topicTitle: string;
  /** Ders ve Alıştırma desteleri farklı olduğu için ilerleme ayrı saklanır. */
  variant?: "lesson" | "practice";
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [indexOpen, setIndexOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Kaldığı yerden başlat: yarım kalmış ders varsa o slayttan devam eder.
  const [initialIndex] = useState(() => {
    const saved = getLessonProgress(categoryId, topicTitle, variant);
    if (!saved || saved.completedAt) return 0;
    return saved.slideIndex > 0 && saved.slideIndex < deck.slides.length ? saved.slideIndex : 0;
  });

  const handleSlideChange = useCallback(
    (index: number) => {
      setLessonProgress(
        categoryId,
        topicTitle,
        { slideIndex: index, totalSlides: deck.slides.length },
        variant,
      );
    },
    [categoryId, topicTitle, deck.slides.length, variant],
  );

  const handleFinish = useCallback(() => {
    setLessonProgress(
      categoryId,
      topicTitle,
      {
        slideIndex: deck.slides.length - 1,
        totalSlides: deck.slides.length,
        completedAt: new Date().toISOString(),
      },
      variant,
    );
  }, [categoryId, topicTitle, deck.slides.length, variant]);

  const player = useSlidePlayback(deck.slides, stageRef, {
    initialIndex,
    onSlideChange: handleSlideChange,
    onFinish: handleFinish,
  });

  const { index, slide, total, isPlaying, muted, isQuizBlocked } = player;
  const progress = total > 0 ? ((index + 1) / total) * 100 : 0;
  const isLast = index >= total - 1;

  // Klavye denetimleri (masaüstü).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        player.next();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        player.previous();
      } else if (event.key === " ") {
        event.preventDefault();
        player.togglePlay();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [player]);

  const toggleFullscreen = useCallback(async () => {
    const element = containerRef.current;
    if (!element) return;
    try {
      if (!document.fullscreenElement) {
        await element.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Tam ekran reddedilirse (iOS Safari) oynatma normal şekilde devam eder.
    }
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const handleQuizAnswered = useCallback(() => {
    player.answerQuiz();
  }, [player]);

  if (!slide) return null;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm"
    >
      {/* Üst bar */}
      <div className="flex items-center gap-3 border-b border-border/40 px-3 py-2.5 sm:px-4">
        <button
          type="button"
          onClick={() => setIndexOpen(true)}
          aria-label="Slayt listesi"
          className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <Menu className="h-5 w-5" />
        </button>
        <p className="min-w-0 flex-1 truncate text-sm font-medium text-muted-foreground">
          {deck.title}
        </p>
        <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
          {index + 1} / {total}
        </span>
      </div>

      {/* Slayt sahnesi */}
      <div className="relative bg-muted/30">
        <div className="h-[62vh] min-h-[320px] sm:aspect-video sm:h-auto">
          <SlideStage ref={stageRef} slide={slide} onQuizAnswered={handleQuizAnswered} />
        </div>

        {isQuizBlocked && (
          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
            Devam etmek için soruyu cevapla
          </div>
        )}
      </div>

      {/* Alt denetim çubuğu */}
      <div className="border-t border-border/40 px-2 py-2.5 sm:px-4">
        <div className="flex items-center gap-1 sm:gap-2.5">
          <button
            type="button"
            onClick={player.togglePlay}
            aria-label={isPlaying ? "Duraklat" : "Oynat"}
            className="shrink-0 rounded-lg p-1.5 text-foreground transition hover:bg-muted"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>

          <input
            type="range"
            min={0}
            max={Math.max(0, total - 1)}
            value={index}
            onChange={(event) => player.goTo(Number(event.target.value))}
            aria-label="Slayt ilerlemesi"
            className="h-1.5 min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-primary"
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) ${progress}%, hsl(var(--border)) ${progress}%)`,
            }}
          />

          <button
            type="button"
            onClick={player.replay}
            aria-label="Slaytı tekrarla"
            className="shrink-0 rounded-lg p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground sm:p-1.5"
          >
            <RotateCcw className="h-[18px] w-[18px]" />
          </button>

          <button
            type="button"
            onClick={player.toggleMute}
            aria-label={muted ? "Sesi aç" : "Sesi kapat"}
            className="shrink-0 rounded-lg p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground sm:p-1.5"
          >
            {muted ? <VolumeX className="h-[18px] w-[18px]" /> : <Volume2 className="h-[18px] w-[18px]" />}
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Tam ekrandan çık" : "Tam ekran"}
            className="hidden shrink-0 rounded-lg p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground sm:block"
          >
            {isFullscreen ? (
              <Minimize2 className="h-[18px] w-[18px]" />
            ) : (
              <Maximize2 className="h-[18px] w-[18px]" />
            )}
          </button>

          <button
            type="button"
            onClick={player.previous}
            disabled={index === 0}
            className="flex shrink-0 items-center gap-1 rounded-lg px-1 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-40 sm:px-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Önceki</span>
          </button>

          <button
            type="button"
            onClick={player.next}
            disabled={isLast}
            className="flex shrink-0 items-center gap-1 rounded-lg px-1 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-40 sm:px-2"
          >
            <span className="hidden sm:inline">Sonraki</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Slayt indeksi */}
      {indexOpen && (
        <div className="absolute inset-0 z-50 flex" role="dialog" aria-label="Slayt listesi">
          <button
            type="button"
            aria-label="Kapat"
            onClick={() => setIndexOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="relative z-10 flex h-full w-72 max-w-[80%] flex-col bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
              <p className="text-sm font-semibold text-foreground">Slaytlar</p>
              <button
                type="button"
                onClick={() => setIndexOpen(false)}
                aria-label="Kapat"
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {deck.slides.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    player.goTo(i);
                    setIndexOpen(false);
                  }}
                  className={`flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left text-xs transition ${
                    i === index
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-foreground/80 hover:bg-muted"
                  }`}
                >
                  <span className="mt-0.5 w-5 shrink-0 tabular-nums text-muted-foreground">{i + 1}</span>
                  <span className="line-clamp-2">
                    {item.title}
                    {item.partLabel ? ` (${item.partLabel})` : ""}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
