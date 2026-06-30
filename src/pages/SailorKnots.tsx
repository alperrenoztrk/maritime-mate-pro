import { useMemo, useState } from "react";
import { Anchor, Search, X } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import KnotCard from "@/components/lessons/KnotCard";
import {
  SAILOR_KNOTS,
  KNOT_CATEGORY_ORDER,
  KNOT_CATEGORY_LABELS,
  type KnotCategory,
} from "@/data/sailorKnots";

type Filter = "all" | KnotCategory;

const FILTER_CHIPS: { value: Filter; label: string }[] = [
  { value: "all", label: "Tümü" },
  ...KNOT_CATEGORY_ORDER.map((c) => ({ value: c, label: KNOT_CATEGORY_LABELS[c].title.split(" ")[0] })),
];

const norm = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export default function SailorKnotsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const q = norm(query.trim());

  // Apply text search + category filter, then group by category preserving the
  // curated order from the data file.
  const grouped = useMemo(() => {
    const matches = SAILOR_KNOTS.filter((k) => {
      if (filter !== "all" && k.category !== filter) return false;
      if (!q) return true;
      const haystack = norm([k.name, k.nameEn, ...(k.aka ?? []), k.use].join(" "));
      return haystack.includes(q);
    });

    return KNOT_CATEGORY_ORDER.map((category) => ({
      category,
      label: KNOT_CATEGORY_LABELS[category],
      knots: matches.filter((k) => k.category === category),
    })).filter((g) => g.knots.length > 0);
  }, [q, filter]);

  const totalMatches = grouped.reduce((n, g) => n + g.knots.length, 0);

  return (
    <div className="min-h-screen p-4 md:p-8" data-no-translate>
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-2 flex items-center gap-2">
          <Anchor className="h-7 w-7 text-amber-500" />
          <h1 className="text-3xl font-bold md:text-4xl">Gemici Bağları</h1>
        </div>
        <p className="mb-5 text-sm text-muted-foreground">
          Temel denizci bağları kategorilere ayrılmıştır. Bir bağı incelemek için başlığına dokunarak
          açın; adım adım yapılışı, kullanımı ve püf noktası görünür. Aramak için yazın ya da kategori
          seçin.
        </p>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Bağ ara (ör. izbarço, bowline, demir)…"
            className="pl-9 pr-9"
            aria-label="Bağ ara"
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

        {/* Category filter chips */}
        <div className="mb-5 flex flex-wrap gap-2">
          {FILTER_CHIPS.map((chip) => {
            const active = filter === chip.value;
            return (
              <button
                key={chip.value}
                type="button"
                onClick={() => setFilter(chip.value)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-amber-500/50 bg-amber-500/15 text-amber-700 dark:text-amber-400"
                    : "border-border/50 bg-card/40 text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* Results */}
        {totalMatches === 0 ? (
          <div className="rounded-2xl border border-border/50 bg-card/60 px-4 py-10 text-center">
            <p className="text-sm font-medium text-foreground">Sonuç bulunamadı</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Farklı bir arama terimi deneyin veya kategori filtresini temizleyin.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {grouped.map(({ category, label, knots }) => (
              <section
                key={category}
                className="overflow-hidden rounded-2xl border border-border/50 bg-card/60"
              >
                <div className="border-b border-border/40 bg-muted/30 px-4 py-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="text-base font-semibold text-foreground">{label.title}</h2>
                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {knots.length} bağ
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{label.subtitle}</p>
                </div>

                <Accordion type="multiple" className="px-1">
                  {knots.map((knot) => (
                    <KnotCard key={knot.id} knotId={knot.id} />
                  ))}
                </Accordion>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
