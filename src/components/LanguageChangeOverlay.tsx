import { useLanguage } from "@/contexts/useLanguage";
import { Loader2 } from "lucide-react";

export function LanguageChangeOverlay() {
  const { isChangingLanguage, changeProgress, changePhase } = useLanguage();
  if (!isChangingLanguage) return null;

  const pct = Math.max(0, Math.min(100, Math.round(changeProgress)));

  // Authored in English: this overlay is painted during a language switch,
  // before the incoming dictionary is resolved, so it can never be translated
  // at runtime.
  const title =
    changePhase === 'harvest'
      ? 'Scanning pages…'
      : 'Preparing translations…';
  const subtitle =
    changePhase === 'harvest'
      ? 'Scanning every page of the app (one-off, 1–3 min)'
      : 'Caching all text — later navigation will not have to wait';

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 p-6"
      role="dialog"
      aria-modal="true"
      aria-live="polite"
    >
      <div className="surface-3 flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl border p-7 shadow-elev-3">
        <Loader2 className="h-9 w-9 animate-spin text-primary" strokeWidth={2.25} />
        <div className="text-center">
          <p className="text-base font-semibold text-foreground">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-control ease-out-ios"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-caption tabular-nums text-muted-foreground">{pct}%</p>
      </div>
    </div>
  );
}
