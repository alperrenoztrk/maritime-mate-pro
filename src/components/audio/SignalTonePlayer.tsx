import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  acquireAudioContext,
  isAudioSupported,
  TONE_PRESETS,
  type ToneStep,
  type TonePreset,
} from "./signalTones";

/**
 * Web Audio ile SENTEZLENEN denizcilik işaret sesleri.
 *
 * Neden dosya değil sentez: uygulama offline çalışmak zorunda ve APK/AAB
 * boyutu Google Play tarafında kritik. Onlarca .mp3 paketlemek yerine tonları
 * çalışma anında `OscillatorNode` ile üretiyoruz — sıfır asset, sıfır ağ,
 * tamamen offline ve süreleri COLREG Kural 32 tanımlarıyla birebir.
 *
 * Ton üretimi ve kalıp yardımcıları `./signalTones` içindedir.
 */

interface SignalTonePlayerProps {
  /** Çalınacak ses/sessizlik dizisi. */
  steps: ToneStep[];
  preset?: TonePreset;
  /** Butonun yanında gösterilecek kısa etiket (ör. "1 uzun + 2 kısa"). */
  label?: string;
  /**
   * Adım adım görsel ilerleme çubuğu gösterilsin mi. Mors kartlarında nokta /
   * çizgi dizisinin üzerinde ilerleyen vurgu için kullanılır.
   */
  showProgress?: boolean;
  className?: string;
  size?: "sm" | "default";
}

/**
 * Bir ses işaretini çalan buton. Aynı anda yalnız bir çalma sürer; yeni bir
 * çalma başlatmak veya bileşenin sökülmesi, planlanmış tüm osilatörleri
 * durdurur (aksi hâlde sayfa değişince ses devam ederdi).
 */
export default function SignalTonePlayer({
  steps,
  preset = "whistle",
  label,
  showProgress = false,
  className,
  size = "sm",
}: SignalTonePlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const nodesRef = useRef<AudioScheduledSourceNode[]>([]);
  const timersRef = useRef<number[]>([]);
  const supported = useMemo(isAudioSupported, []);

  const stop = useCallback(() => {
    for (const node of nodesRef.current) {
      try {
        node.stop();
      } catch {
        // Zaten durmuş bir düğümü durdurmak InvalidStateError atar; önemsiz.
      }
      node.disconnect();
    }
    nodesRef.current = [];
    for (const id of timersRef.current) window.clearTimeout(id);
    timersRef.current = [];
    setPlaying(false);
    setActiveIndex(-1);
  }, []);

  // Sayfadan ayrılırken sesi kes.
  useEffect(() => stop, [stop]);

  const play = useCallback(() => {
    // AudioContext yalnız kullanıcı jesti içinde açılabilir (iOS/Safari).
    const ctx = acquireAudioContext();
    if (!ctx) return;
    stop();

    const spec = TONE_PRESETS[preset];
    const master = ctx.createGain();
    master.gain.value = 1;
    master.connect(ctx.destination);

    // Küçük bir ön gecikme: resume() yarışını ve ilk örnekteki cızırtıyı önler.
    let cursor = ctx.currentTime + 0.06;
    let elapsedMs = 60;
    const scheduled: AudioScheduledSourceNode[] = [];

    steps.forEach((step, index) => {
      const startAt = cursor;
      const duration = Math.max(step.seconds, 0.02);

      if (step.on) {
        // Vuruşlu kaynaklarda (çan/gong) ton kendi decay'i kadar sürer; sürekli
        // kaynaklarda (düdük) adım süresi boyunca çalar.
        const ringFor = spec.decay ? Math.min(spec.decay, duration) : duration;
        const envelope = ctx.createGain();
        envelope.connect(master);

        // Rampasız kesim "klik" sesi üretir; kısa attack/release ile yumuşatılır.
        const attack = Math.min(0.012, ringFor / 4);
        const release = spec.decay ? ringFor : Math.min(0.03, ringFor / 4);
        envelope.gain.setValueAtTime(0.0001, startAt);
        envelope.gain.exponentialRampToValueAtTime(spec.gain, startAt + attack);
        if (spec.decay) {
          envelope.gain.exponentialRampToValueAtTime(0.0001, startAt + ringFor);
        } else {
          envelope.gain.setValueAtTime(spec.gain, startAt + ringFor - release);
          envelope.gain.exponentialRampToValueAtTime(0.0001, startAt + ringFor);
        }

        const frequencies = [spec.frequency, spec.subFrequency].filter(
          (value): value is number => typeof value === "number",
        );
        for (const frequency of frequencies) {
          const osc = ctx.createOscillator();
          osc.type = spec.type;
          osc.frequency.setValueAtTime(frequency, startAt);
          osc.connect(envelope);
          osc.start(startAt);
          osc.stop(startAt + ringFor + 0.02);
          scheduled.push(osc);
        }
      }

      if (showProgress) {
        const at = elapsedMs;
        timersRef.current.push(window.setTimeout(() => setActiveIndex(index), at));
      }

      cursor += duration;
      elapsedMs += duration * 1000;
    });

    nodesRef.current = scheduled;
    timersRef.current.push(window.setTimeout(stop, elapsedMs + 120));
    setPlaying(true);
  }, [preset, showProgress, steps, stop]);

  if (!supported) return null;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        type="button"
        variant="secondary"
        size={size === "sm" ? "sm" : "default"}
        onClick={playing ? stop : play}
        className="gap-1.5"
        aria-label={playing ? "Sesi durdur" : `Play the sound signal${label ? `: ${label}` : ""}`}
      >
        {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        <Volume2 className="h-3.5 w-3.5" />
        <span className="text-xs">{playing ? "Durdur" : "Çal"}</span>
      </Button>

      {label ? <span className="text-xs text-muted-foreground">{label}</span> : null}

      {showProgress ? (
        <span className="flex items-center gap-0.5" aria-hidden="true">
          {steps.map((step, index) =>
            step.on ? (
              <span
                key={index}
                className={cn(
                  "inline-block h-1.5 rounded-full transition-colors",
                  step.seconds > 0.2 ? "w-4" : "w-1.5",
                  index === activeIndex ? "bg-primary" : "bg-muted-foreground/40",
                )}
              />
            ) : null,
          )}
        </span>
      ) : null}
    </div>
  );
}
