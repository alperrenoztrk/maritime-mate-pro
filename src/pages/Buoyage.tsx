import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LifeBuoy, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LessonImage } from "@/components/ui/LessonImage";
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
    .toLocaleLowerCase("tr")
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
          <dt className="shrink-0 font-medium text-muted-foreground">Format:</dt>
          <dd className="text-foreground">{mark.shape}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="shrink-0 font-medium text-muted-foreground">Peak sign:</dt>
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
 * IALA şamandıra sistemi referansı. Bölge A / Bölge B anahtarı, lateral
 * işaretlerin renk anlamının bölgeye göre nasıl tersine döndüğünü yan yana
 * gösterir — bu ayrım sistemin en çok karıştırılan yanıdır.
 */
export default function BuoyagePage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [region, setRegion] = useState<IalaRegion>("A");

  const q = norm(query.trim());

  const grouped = useMemo(() => {
    const matches = BUOY_MARKS.filter((mark) => {
      // Lateral işaretler bölgeye bağlıdır; diğerleri her iki bölgede aynıdır.
      if (mark.region && mark.region !== region) return false;
      if (!q) return true;
      const haystack = norm(
        [mark.title, mark.colour, mark.shape, mark.topmark ?? "", mark.light, mark.instruction, mark.note ?? ""].join(
          " ",
        ),
      );
      return haystack.includes(q);
    });

    return BUOY_CATEGORY_ORDER.map((category) => ({
      category,
      label: BUOY_CATEGORY_LABELS[category],
      marks: matches.filter((mark) => mark.category === category),
    })).filter((section) => section.marks.length > 0);
  }, [q, region]);

  const totalMatches = grouped.reduce((n, section) => n + section.marks.length, 0);

  return (
    <div className="min-h-screen px-4 py-4 md:px-8 md:py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-2 flex items-center gap-2">
          <LifeBuoy className="h-7 w-7 text-emerald-500" />
          <h1 className="text-3xl font-bold md:text-4xl">IALA Buoy System</h1>
        </div>

        {/* Region toggle — the single most important control on this page. */}
        <div className="mb-4 rounded-xl border border-border/50 bg-card/60 p-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">IALA Region</p>
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
                    active
                      ? "border-emerald-500/50 bg-emerald-500/15"
                      : "border-border/50 bg-card/40 hover:bg-muted/50"
                  }`}
                >
                  <span className="block text-sm font-semibold text-foreground">Region {value}</span>
                  <span className="block text-micro leading-tight text-muted-foreground">
                    {value === "A"
                      ? "Europe, Africa, most of Asia, Australia — Turkey is here"
                      : "North and South America, Japan, Korea, Philippines"}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-micro leading-relaxed text-muted-foreground">
            {region === "A"
              ? "Zone A: when entering the port, RED stays port and GREEN stays starboard."
              : "Zone B: when entering the port, RED stays to starboard and GREEN stays to port (“red right returning”)."}
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Look for signs (e.g. cardinal, wreck, safe water)…"
            className="pl-9 pr-9"
            aria-label="Look for buoy sign"
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

        {totalMatches === 0 ? (
          <div className="rounded-2xl border border-border/50 bg-card/60 px-4 py-10 text-center">
            <p className="text-sm font-medium text-foreground">No results found</p>
            <p className="mt-1 text-xs text-muted-foreground">Try a different search term.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {grouped.map(({ category, label, marks }) => (
              <section
                key={category}
                className="overflow-hidden rounded-2xl border border-border/50 bg-card/60"
              >
                <div className="border-b border-border/40 bg-muted/30 px-4 py-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="text-base font-semibold text-foreground">{label.title}</h2>
                    <span className="shrink-0 text-micro text-muted-foreground">
                      {marks.length} sign
                    </span>
                  </div>
                </div>

                {label.image ? (
                  <div className="border-b border-border/40 bg-background/40 px-4 py-3">
                    <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border/40 bg-white">
                      <LessonImage
                        src={label.image}
                        alt={label.imageAlt ?? label.title}
                        className="h-auto w-full object-contain"
                      />
                    </div>
                  </div>
                ) : null}

                <div>
                  {marks.map((mark) => (
                    <BuoyCard key={mark.id} mark={mark} />
                  ))}
                </div>
              </section>
            ))}

            {/* Işık karakteri sözlüğü — şamandırayı gece tanımanın anahtarı. */}
            <section className="overflow-hidden rounded-2xl border border-border/50 bg-card/60">
              <div className="border-b border-border/40 bg-muted/30 px-4 py-3">
                <h2 className="text-base font-semibold text-foreground">
                  Light Character Abbreviations
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  At night you recognize a mark by its light rhythm, not by the color of its body. If the rhythm you see does not match the signature on the chart, either you are looking at the wrong light or your position assumption is wrong.
                </p>
              </div>
              <div>
                {LIGHT_CHARACTERS.map((character) => (
                  <div
                    key={character.code}
                    className="flex gap-3 border-b border-border/30 px-4 py-2.5 last:border-b-0"
                  >
                    <span className="w-12 shrink-0 font-mono text-sm font-bold text-foreground">
                      {character.code}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{character.name}</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {character.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
