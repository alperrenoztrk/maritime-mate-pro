import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Megaphone, Search, Volume2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToolNotice, ToolPage, ToolSection } from "@/components/tools/ToolKit";
import { useLanguage } from "@/contexts/useLanguage";
import { getStaticTranslation } from "@/utils/staticTranslations";
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
    .toLowerCase()
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/** Shows the pattern as short (●) and prolonged (▬) blasts. */
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
        <span className="rounded-full bg-muted px-2 py-0.5 text-micro font-medium text-muted-foreground">
          {signal.rule}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <PatternGlyphs pattern={signal.pattern} />
        <span className="text-xs font-medium text-foreground">{signal.readable}</span>
        {signal.pattern ? (
          <SignalTonePlayer steps={blastPattern(signal.pattern)} preset="whistle" />
        ) : (
          <span className="inline-flex items-center gap-1 text-micro text-muted-foreground">
            <Volume2 className="h-3.5 w-3.5" />
            Not given by whistle
          </span>
        )}
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{signal.meaning}</p>

      {signal.interval ? (
        <p className="mt-1 text-xs font-medium text-foreground">Interval: {signal.interval}</p>
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
 * COLREG sound signals. Each pattern can be played as a synthesised whistle
 * with the Rule 32 durations (short about 1 s, prolonged 4–6 s).
 */
export default function SoundSignalsPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const { currentLanguage } = useLanguage();

  const q = norm(query.trim());

  const grouped = useMemo(() => {
    const matches = SOUND_SIGNALS.filter((signal) => {
      if (!q) return true;
      const texts = [signal.title, signal.readable, signal.meaning, signal.rule, signal.note ?? ""];
      // Search the source text and the text shown in the current language.
      const haystack = norm(texts.flatMap((t) => [t, getStaticTranslation(t, currentLanguage) ?? ""]).join(" "));
      return haystack.includes(q);
    });

    return SOUND_GROUP_ORDER.map((group) => ({
      group,
      label: SOUND_GROUP_LABELS[group],
      signals: matches.filter((signal) => signal.group === group),
    })).filter((section) => section.signals.length > 0);
  }, [q, currentLanguage]);

  const totalMatches = grouped.reduce((n, section) => n + section.signals.length, 0);

  return (
    <ToolPage title="Sound Signals" icon={Megaphone}>
      <ToolSection title="Whistle, bell and gong" icon={Volume2}>
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Rule 32:</span>{" "}
          <span>A short blast lasts about 1 second; a prolonged blast lasts 4 to 6 seconds.</span>
        </p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Rule 33:</span>{" "}
          <span>
            Vessels of 12 m or more carry a whistle, vessels of 20 m or more also a bell, and vessels of 100 m or more in addition a gong. Vessels under 12 m need not carry these appliances but must have some other means of making an efficient sound signal; in restricted visibility they give it at intervals of not more than 2 minutes (Rule 35(j)).
          </span>
        </p>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search signals (e.g. astern, restricted visibility, at anchor)…"
            className="pl-9 pr-9"
            aria-label="Search sound signals"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </ToolSection>

      {totalMatches === 0 ? (
        <ToolNotice>No signals match this search. Try a different term.</ToolNotice>
      ) : (
        grouped.map(({ group, label, signals }) => (
          <ToolSection key={group} title={label.title} description={label.description} icon={Megaphone}>
            <div className="-mx-4 border-t border-border/30">
              {signals.map((signal) => (
                <SoundRow key={signal.id} signal={signal} />
              ))}
            </div>
          </ToolSection>
        ))
      )}
    </ToolPage>
  );
}
