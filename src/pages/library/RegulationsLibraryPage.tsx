import { useMemo, useState } from "react";
import {
  ClipboardList,
  Globe,
  Leaf,
  Map as MapIcon,
  Scale,
  Search,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { regulationItems, type RegulationCategory } from "@/data/regulationItems";
import {
  LibraryBookCard,
  LibraryEntryCard,
  LibraryPageShell,
  LibrarySearchField,
  LibrarySectionHeading,
} from "@/components/library/LibraryInterface";

const categories: Array<{
  category: RegulationCategory;
  icon: LucideIcon;
  accent: string;
}> = [
  { category: "IMO Sözleşmeleri", icon: Globe, accent: "from-blue-500 via-indigo-600 to-blue-800" },
  { category: "Emniyet Kodları", icon: Shield, accent: "from-amber-500 via-orange-600 to-red-700" },
  { category: "Çevresel Düzenlemeler", icon: Leaf, accent: "from-emerald-500 via-teal-600 to-cyan-800" },
  { category: "Denetim & Sörvey", icon: Search, accent: "from-sky-500 via-blue-600 to-indigo-800" },
  { category: "Gemi Sertifikaları", icon: ClipboardList, accent: "from-violet-500 via-purple-600 to-indigo-800" },
  { category: "Bölgesel Düzenlemeler", icon: MapIcon, accent: "from-rose-500 via-red-600 to-orange-700" },
];

const normalize = (value: string) =>
  value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const searchableText = (item: (typeof regulationItems)[number]) =>
  normalize(
    [
      item.label,
      item.category,
      item.overview,
      ...(item.essentials || []),
      ...(item.keyArticles || []).flatMap((article) => [article.id, article.title, article.summary]),
      ...(item.detailedSections || []).flatMap((section) => [section.heading, section.body]),
      ...(item.narrativeChapters || []).flatMap((chapter) => [
        chapter.title,
        chapter.introduction,
        ...(chapter.chapterTakeaways || []),
        ...chapter.sections.flatMap((section) => [
          section.heading,
          ...section.paragraphs,
          ...(section.references || []),
          section.shipboardMeaning || "",
          ...(section.commonMistakes || []),
        ]),
      ]),
      ...(item.terms || []).flatMap((entry) => [entry.term, entry.definition]),
    ].join(" "),
  );

const searchIndex = new Map(regulationItems.map((item) => [item.slug, searchableText(item)]));

export default function RegulationsLibraryPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<RegulationCategory | null>(null);
  const normalizedQuery = normalize(query.trim());

  const filteredItems = useMemo(
    () =>
      regulationItems.filter((item) => {
        const categoryMatches = !activeCategory || item.category === activeCategory;
        const queryMatches = !normalizedQuery || searchIndex.get(item.slug)?.includes(normalizedQuery);
        return categoryMatches && queryMatches;
      }),
    [activeCategory, normalizedQuery],
  );

  const showCategoryLibrary = !activeCategory && !normalizedQuery;

  return (
    <LibraryPageShell title="Regülasyonlar" icon={Scale}>
      <LibrarySearchField
        value={query}
        onChange={setQuery}
        placeholder="SOLAS, MARPOL, PSC veya sertifika ara…"
        ariaLabel="Regülasyonlarda ara"
      />

      {showCategoryLibrary ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((entry) => (
            <LibraryEntryCard
              key={entry.category}
              title={entry.category}
              icon={entry.icon}
              accent={entry.accent}
              badge={regulationItems.filter((item) => item.category === entry.category).length}
              onClick={() => setActiveCategory(entry.category)}
            />
          ))}
        </section>
      ) : (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <LibrarySectionHeading badge={filteredItems.length}>
              {activeCategory ?? "Arama Sonuçları"}
            </LibrarySectionHeading>
            {activeCategory && (
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="rounded-xl border border-border/60 bg-card/80 px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              >
                Kategoriler
              </button>
            )}
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredItems.map((item) => {
                const category = categories.find((entry) => entry.category === item.category) ?? categories[0];
                const chapterCount = item.narrativeChapters?.length ?? 0;
                return (
                  <LibraryBookCard
                    key={item.slug}
                    to={`/regulations/${item.slug}`}
                    title={item.label}
                    icon={category.icon}
                    accent={category.accent}
                    badge={chapterCount || undefined}
                  />
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card/60 px-5 py-12 text-center text-sm text-muted-foreground">
              Aramanızla eşleşen regülasyon bulunamadı.
            </div>
          )}
        </section>
      )}
    </LibraryPageShell>
  );
}
