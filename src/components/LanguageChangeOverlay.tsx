import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";

export function LanguageChangeOverlay() {
  const { isChangingLanguage, changeProgress, changePhase } = useLanguage();
  if (!isChangingLanguage) return null;

  const pct = Math.max(0, Math.min(100, Math.round(changeProgress)));

  const title =
    changePhase === 'harvest'
      ? 'Sayfalar taranıyor…'
      : 'Çeviriler hazırlanıyor…';
  const subtitle =
    changePhase === 'harvest'
      ? 'Uygulamanın tüm sayfaları taranıyor (tek seferlik, 1–3 dk)'
      : 'Tüm metinler önbelleğe alınıyor — sonraki gezinmelerde bekleme olmayacak';

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-xl"
      style={{ background: "rgba(7, 18, 38, 0.78)" }}
      role="dialog"
      aria-modal="true"
      aria-live="polite"
    >
      <div className="mx-6 flex w-full max-w-xs flex-col items-center gap-4 rounded-3xl border border-white/15 bg-white/[0.06] p-7 shadow-2xl">
        <Loader2 className="h-9 w-9 animate-spin text-sky-300" strokeWidth={2.25} />
        <div className="text-center">
          <p className="text-base font-semibold text-white">{title}</p>
          <p className="mt-1 text-[12px] text-white/60">{subtitle}</p>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 transition-[width] duration-200 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-[11px] tabular-nums text-white/55">%{pct}</p>
      </div>
    </div>
  );
}
