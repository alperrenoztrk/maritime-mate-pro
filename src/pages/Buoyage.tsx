import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LifeBuoy, Lightbulb, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LessonImage } from "@/components/ui/LessonImage";
import { ToolNotice, ToolPage, ToolSection } from "@/components/tools/ToolKit";
import { useLanguage } from "@/contexts/useLanguage";
import { getStaticTranslation } from "@/utils/staticTranslations";
import {
  BUOY_CATEGORY_LABELS,
  BUOY_CATEGORY_ORDER,
  BUOY_MARKS,
  LIGHT_CHARACTERS,
  type BuoyMark,
  type IalaRegion,
} from "@/data/buoyage";

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function BuoyCard({ mark }: { mark: BuoyMark }) {
  return (
    <article className="border-b border-border/30 px-4 py-3 last:border-b-0">
      <div className="flex flex-wrap items-baseline gap-2">
        <h3 className="text-sm font-semibold text-foreground">{mark.title}</h3>
        {mark.region ? (
          <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-micro font-medium text-sky-700 dark:text-sky-400">
            Region {mark.region}
          </span>
        ) : null}
      </div>

      <p className="mt-1.5 rounded-lg bg-primary/10 px-2.5 py-1.5 text-sm font-medium leading-relaxed text-foreground">
        {mark.instruction}
      </p>

      <dl className="mt-2 grid gap-x-4 gap-y-1 text-xs sm:grid-cols-2">
        <div className="flex gap-1.5">
          <dt className="shrink-0 font-medium text-muted-foreground">Colour:</dt>
          <dd className="text-foreground">{mark.colour}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="shrink-0 font-medium text-muted-foreground">Shape:</dt>
          <dd className="text-foreground">{mark.shape}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="shrink-0 font-medium text-muted-foreground">Topmark:</dt>
          <dd className="text-foreground">{mark.topmark ?? "None"}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="shrink-0 font-medium text-muted-foreground">Light:</dt>
          <dd className="text-foreground">{mark.light}</dd>
        </div>
      </dl>

      {mark.note ? (
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{mark.note}</p>
      ) : null}
    </article>
  );
}

/**
 * IALA Maritime Buoyage System reference. The Region A / Region B switch shows
 * how the colours of the lateral marks are reversed between the regions.
 */
export default function BuoyagePage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [region, setRegion] = useState<IalaRegion>("A");
  const { currentLanguage } = useLanguage();

  const q = norm(query.trim());

  const grouped = useMemo(() => {
    const matches = BUOY_MARKS.filter((mark) => {
      // Lateral marks depend on the region; the others are the same in both.
      if (mark.region && mark.region !== region) return false;
      if (!q) return true;
      const texts = [mark.title, mark.colour, mark.shape, mark.topmark ?? "", mark.light, mark.instruction, mark.note ?? ""];
      // Search the source text and the text shown in the current language.
      const haystack = norm(texts.flatMap((t) => [t, getStaticTranslation(t, currentLanguage) ?? ""]).join(" "));
      return haystack.includes(q);
    });

    return BUOY_CATEGORY_ORDER.map((category) => ({
      category,
      label: BUOY_CATEGORY_LABELS[category],
      marks: matches.filter((mark) => mark.category === category),
    })).filter((section) => section.marks.length > 0);
  }, [q, region, currentLanguage]);

  const totalMatches = grouped.reduce((n, section) => n + section.marks.length, 0);

  return (
    <ToolPage title="IALA Buoyage" icon={LifeBuoy}>
      <ToolSection title="IALA region">
        <div className="flex gap-2">
          {(["A", "B"] as IalaRegion[]).map((value) => {
            const active = region === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setRegion(value)}
                aria-pressed={active}
                className={`flex-1 rounded-lg border px-3 py-2 text-left transition-colors ${
                  active ? "border-primary/50 bg-primary/10" : "border-border/50 bg-card/40 hover:bg-muted/50"
                }`}
              >
                <span className="block text-sm font-semibold text-foreground">Region {value}</span>
                <span className="block text-micro leading-tight text-muted-foreground">
                  {value === "A" ? "Europe, Africa, most of Asia, Australia" : "North and South America, Japan, Korea, Philippines"}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {region === "A"
            ? "Region A: entering from seaward (in the direction of buoyage), keep RED marks to port and GREEN marks to starboard."
            : "Region B: entering from seaward (in the direction of buoyage), keep RED marks to starboard and GREEN marks to port (“red right returning”)."}
        </p>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search marks (e.g. cardinal, wreck, safe water)…"
            className="pl-9 pr-9"
            aria-label="Search buoyage marks"
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
        <ToolNotice>No marks match this search. Try a different term.</ToolNotice>
      ) : (
        grouped.map(({ category, label, marks }) => (
          <ToolSection key={category} title={label.title} description={label.description} icon={LifeBuoy}>
            {label.image ? (
              <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border/40 bg-white">
                <LessonImage src={label.image} alt={label.imageAlt ?? label.title} className="h-auto w-full object-contain" />
              </div>
            ) : null}
            <div className="-mx-4 border-t border-border/30">
              {marks.map((mark) => (
                <BuoyCard key={mark.id} mark={mark} />
              ))}
            </div>
          </ToolSection>
        ))
      )}

      <ToolSection
        title="Light character abbreviations"
        icon={Lightbulb}
        description="At night a mark is recognised by the rhythm of its light. If the rhythm does not match the chart, you are looking at another light or you are not where you think you are."
      >
        <div className="-mx-4 border-t border-border/30">
          {LIGHT_CHARACTERS.map((character) => (
            <div key={character.code} className="flex gap-3 border-b border-border/30 px-4 py-2.5 last:border-b-0">
              <span translate="no" className="notranslate w-12 shrink-0 font-mono text-sm font-bold text-foreground">
                {character.code}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{character.name}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{character.description}</p>
              </div>
            </div>
          ))}
        </div>
      </ToolSection>
    </ToolPage>
  );
}
