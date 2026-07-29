import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import type { LessonSlide } from "@/data/lessonSlides";
import { useLanguage } from "@/contexts/LanguageContext";
import { createNarrator, waitForVoices } from "@/services/lessonNarration";
import {
  getNarrationPreferences,
  NARRATION_PREFS_EVENT,
  type NarrationPreferences,
} from "@/services/narrationPreferences";

/**
 * Slayt oynatma durum makinesi.
 *
 * Akış: slayt görünür → bloklar animasyonla belirir → seslendirme başlar →
 * ses bitince kısa bir bekleme → sonraki slayt. Ses kapalıysa/başarısızsa
 * slaytın `estimatedMs` süresi kullanılır. Quiz slaytları cevaplanana kadar
 * otomatik ilerleme durur.
 *
 * Seslendirme metni ekrandaki (çevrilmiş) DOM'dan okunur; bu yüzden 25 dilin
 * tamamında ses ile ekran aynı olur. DOM okunamazsa `slide.narration` yedeği
 * kullanılır.
 */

/** Bloklar belirdikten sonra konuşmaya başlamadan önceki bekleme. */
const SPEAK_START_DELAY_MS = 450;
/** Slayt bittikten sonra sonrakine geçmeden önceki nefes payı. */
const SLIDE_GAP_MS = 800;

export interface SlidePlaybackState {
  index: number;
  slide: LessonSlide | undefined;
  total: number;
  isPlaying: boolean;
  muted: boolean;
  prefs: NarrationPreferences;
  isQuizBlocked: boolean;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  goTo: (index: number) => void;
  replay: () => void;
  toggleMute: () => void;
  answerQuiz: () => void;
}

export function useSlidePlayback(
  slides: LessonSlide[],
  stageRef: RefObject<HTMLElement>,
  options: { initialIndex?: number; onSlideChange?: (index: number) => void; onFinish?: () => void } = {},
): SlidePlaybackState {
  const { currentLanguage, changePhase } = useLanguage();
  const [prefs, setPrefs] = useState<NarrationPreferences>(() => getNarrationPreferences());
  const [index, setIndex] = useState(() => {
    const start = options.initialIndex ?? 0;
    return start >= 0 && start < slides.length ? start : 0;
  });
  const [isPlaying, setIsPlaying] = useState(prefs.autoplay);
  const [muted, setMuted] = useState(!prefs.enabled);
  const [answeredQuizzes, setAnsweredQuizzes] = useState<Set<string>>(() => new Set());

  const narratorRef = useRef(createNarrator());
  const timerRef = useRef<number | null>(null);
  const onSlideChangeRef = useRef(options.onSlideChange);
  const onFinishRef = useRef(options.onFinish);
  onSlideChangeRef.current = options.onSlideChange;
  onFinishRef.current = options.onFinish;

  const slide = slides[index];
  const total = slides.length;

  const isQuizBlocked = useMemo(
    () => !!slide && slide.layout === "quiz" && !answeredQuizzes.has(slide.id),
    [slide, answeredQuizzes],
  );

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Ayarlar sayfasındaki değişiklik açık oynatıcıya anında yansısın.
  useEffect(() => {
    const handler = () => {
      const next = getNarrationPreferences();
      setPrefs(next);
      setMuted(!next.enabled);
    };
    window.addEventListener(NARRATION_PREFS_EVENT, handler);
    return () => window.removeEventListener(NARRATION_PREFS_EVENT, handler);
  }, []);

  // Chrome sesleri asenkron yükler; ilk oynatmadan önce listeyi hazırla.
  useEffect(() => {
    void waitForVoices();
  }, []);

  // Bileşen kaldırıldığında konuşmayı mutlaka durdur.
  useEffect(() => {
    const narrator = narratorRef.current;
    return () => {
      narrator.stop();
    };
  }, []);

  useEffect(() => {
    onSlideChangeRef.current?.(index);
  }, [index]);

  const advance = useCallback(() => {
    setIndex((current) => {
      if (current + 1 >= total) {
        onFinishRef.current?.();
        setIsPlaying(false);
        return current;
      }
      return current + 1;
    });
  }, [total]);

  // Ana oynatma etkisi: slayt/durum değiştikçe seslendir veya sayaç kur.
  useEffect(() => {
    const narrator = narratorRef.current;
    narrator.stop();
    clearTimer();

    if (!slide || !isPlaying || isQuizBlocked) return;
    // Dil değişimi sürerken konuşma başlatma; yoksa yanlış dilde okur.
    if (changePhase !== "idle") return;

    let cancelled = false;

    const startTimer = (durationMs: number) => {
      timerRef.current = window.setTimeout(() => {
        if (!cancelled) advance();
      }, durationMs);
    };

    const begin = () => {
      if (cancelled) return;

      if (muted) {
        startTimer(slide.estimatedMs);
        return;
      }

      // Ekranda görünen (çevrilmiş) metni oku; yoksa kaynak dildeki yedeğe düş.
      const domText = stageRef.current?.innerText?.replace(/\s+/g, " ").trim();
      const text = domText && domText.length > 0 ? domText : slide.narration;

      if (!text) {
        startTimer(slide.estimatedMs);
        return;
      }

      narrator.speak(text, {
        lang: currentLanguage,
        rate: prefs.rate,
        voiceURI: prefs.voiceURI,
        onEnd: () => {
          if (cancelled) return;
          startTimer(SLIDE_GAP_MS);
        },
      });
    };

    timerRef.current = window.setTimeout(begin, SPEAK_START_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimer();
      narrator.stop();
    };
  }, [
    slide,
    isPlaying,
    muted,
    isQuizBlocked,
    currentLanguage,
    changePhase,
    prefs.rate,
    prefs.voiceURI,
    advance,
    clearTimer,
    stageRef,
  ]);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const togglePlay = useCallback(() => setIsPlaying((v) => !v), []);

  const goTo = useCallback(
    (target: number) => {
      if (total === 0) return;
      setIndex(Math.min(total - 1, Math.max(0, target)));
    },
    [total],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1), [goTo, index]);

  const replay = useCallback(() => {
    // Aynı slaytı baştan oynat: efekti yeniden tetiklemek için durdur/başlat.
    narratorRef.current.stop();
    clearTimer();
    setIsPlaying(false);
    window.setTimeout(() => setIsPlaying(true), 50);
  }, [clearTimer]);

  const toggleMute = useCallback(() => setMuted((v) => !v), []);

  const answerQuiz = useCallback(() => {
    if (!slide) return;
    setAnsweredQuizzes((current) => {
      if (current.has(slide.id)) return current;
      const next = new Set(current);
      next.add(slide.id);
      return next;
    });
  }, [slide]);

  return {
    index,
    slide,
    total,
    isPlaying,
    muted,
    prefs,
    isQuizBlocked,
    play,
    pause,
    togglePlay,
    next,
    previous,
    goTo,
    replay,
    toggleMute,
    answerQuiz,
  };
}
