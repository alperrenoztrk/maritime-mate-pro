import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Volume2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import SignalTonePlayer from "@/components/audio/SignalTonePlayer";
import { blastPattern } from "@/components/audio/signalTones";
import {
  SOUND_GROUP_LABELS,
  SOUND_GROUP_ORDER,
  SOUND_SIGNALS,
  type SoundSignal,
} from "@/data/soundSignals";

const norm = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/** Kalıbı ● (kısa) ve ▬ (uzun) sembolleriyle gösterir. */
function PatternGlyphs({ pattern }: { pattern: string }) {
  if (!pattern) return null;
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      {[...pattern].map((char, index) => (
        <span
          key={index}
          className={
            char === "L"
              ? "inline-block h-1.5 w-6 rounded-full bg-amber-500"
              : "inline-block h-1.5 w-1.5 rounded-full bg-amber-500"
          }
        />
      ))}
    </span>
  );
}

function SoundRow({ signal }: { signal: SoundSignal }) {
  return (
    <article className="border-b border-border/30 px-4 py-3 last:border-b-0">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h3 className="text-sm font-semibold text-foreground">{signal.title}</h3>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          {signal.rule}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <PatternGlyphs pattern={signal.pattern} />
        <span className="text-xs font-medium text-foreground">{signal.readable}</span>
        {signal.pattern ? (
          <SignalTonePlayer steps={blastPattern(signal.pattern)} preset="whistle" />
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Volume2 className="h-3.5 w-3.5" />
            Düdükle verilmez
          </span>
        )}
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{signal.meaning}</p>

      {signal.interval ? (
        <p className="mt-1 text-xs font-medium text-foreground">Aralık: {signal.interval}</p>
      ) : null}

      {signal.note ? (
        <p className="mt-1.5 rounded-lg bg-muted/40 px-2.5 py-1.5 text-xs leading-relaxed text-muted-foreground">
          {signal.note}
        </p>
      ) : null}
    </article>
  );
}

/**
 * COLREG ses işaretleri referansı. Her kalıp Web Audio ile sentezlenmiş gemi
 * düdüğü tonuyla, Kural 32'deki gerçek süreleriyle (kısa ≈1 sn, uzun 4-6 sn)
 * çalınabilir — böylece "1 uzun + 2 kısa" ezber değil, tanınan bir ritim olur.
 */
export default function SoundSignalsPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");

  const q = norm(query.trim());

  const grouped = useMemo(() => {
    const matches = SOUND_SIGNALS.filter((signal) => {
      if (!q) return true;
      const haystack = norm(
        [signal.title, signal.readable, signal.meaning, signal.rule, signal.note ?? ""].join(" "),
      );
      return haystack.includes(q);
    });

    return SOUND_GROUP_ORDER.map((group) => ({
      group,
      label: SOUND_GROUP_LABELS[group],
      signals: matches.filter((signal) => signal.group === group),
    })).filter((section) => section.signals.length > 0);
  }, [q]);

  const totalMatches = grouped.reduce((n, section) => n + section.signals.length, 0);

  return (
    <div className="min-h-screen px-4 pb-4 pt-[var(--floating-nav-reserve)] md:px-8 md:pb-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-2 flex items-center gap-2">
          <Volume2 className="h-7 w-7 text-amber-500" />
          <h1 className="text-3xl font-bold md:text-4xl">Ses İşaretleri</h1>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          COLREG Bölüm D (Kural 32-37), gemilerin niyet ve durumlarını sesle bildirmesini düzenler.
          Aşağıdaki her kalıbı gerçek süreleriyle dinleyebilirsiniz.
        </p>

        <div className="mb-5 rounded-xl border border-border/50 bg-muted/20 p-3">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Kural 32 tanımları:</span> kısa düdük
            yaklaşık 1 saniye, uzun düdük 4-6 saniye sürer.{" "}
            <span className="font-semibold text-foreground">Kural 33 cihazlar:</span> 12 m ve üzeri
            gemide düdük, 20 m ve üzerinde ayrıca çan, 100 m ve üzerinde ek olarak gong bulunur. 12
            m'den küçük tekneler bu işaretleri vermek zorunda değildir; ancak en fazla 2 dakikada bir
            başka etkili bir ses işareti vermelidir.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="İşaret ara (ör. tornistan, kısıtlı görüş, demirde)…"
            className="pl-9 pr-9"
            aria-label="Ses işareti ara"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Aramayı temizle"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {totalMatches === 0 ? (
          <div className="rounded-2xl border border-border/50 bg-card/60 px-4 py-10 text-center">
            <p className="text-sm font-medium text-foreground">Sonuç bulunamadı</p>
            <p className="mt-1 text-xs text-muted-foreground">Farklı bir arama terimi deneyin.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {grouped.map(({ group, label, signals }) => (
              <section
                key={group}
                className="overflow-hidden rounded-2xl border border-border/50 bg-card/60"
              >
                <div className="border-b border-border/40 bg-muted/30 px-4 py-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="text-base font-semibold text-foreground">{label.title}</h2>
                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {signals.length} işaret
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{label.description}</p>
                </div>

                <div>
                  {signals.map((signal) => (
                    <SoundRow key={signal.id} signal={signal} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
