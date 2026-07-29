import { FileText, MonitorPlay } from "lucide-react";

export type LessonViewMode = "slides" | "text";

/**
 * "Slayt anlatım" ↔ "Metin olarak oku" geçişi.
 *
 * Ders anlatımı artık varsayılan olarak slayt/seslendirme akışıdır; eski uzun
 * metin görünümü kaybolmaz, bu düğmeyle erişilir.
 */
export function LessonModeToggle({
  mode,
  onChange,
}: {
  mode: LessonViewMode;
  onChange: (mode: LessonViewMode) => void;
}) {
  return (
    <div className="inline-flex rounded-xl border border-border/60 bg-muted/40 p-1">
      <button
        type="button"
        onClick={() => onChange("slides")}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
          mode === "slides"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <MonitorPlay className="h-3.5 w-3.5" />
        Slayt anlatım
      </button>
      <button
        type="button"
        onClick={() => onChange("text")}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
          mode === "text"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <FileText className="h-3.5 w-3.5" />
        Metin olarak oku
      </button>
    </div>
  );
}
