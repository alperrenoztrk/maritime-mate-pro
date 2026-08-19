import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
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
  LibraryCompactCard,
  LibraryEntryCard,
  LibraryPageShell,
  LibrarySearchField,
  LibrarySectionHeading,
} from "@/components/library/LibraryInterface";
import { InsetGroupedList } from "@/components/ui/InsetGroupedList";

const categories: Array<{
  category: RegulationCategory;
  icon: LucideIcon;
  accent: string;
}> = [
  { category: "IMO Sözleşmeleri", icon: Globe, accent: "accent-ocean" },
  { category: "Emniyet Kodları", icon: Shield, accent: "accent-amber" },
  { category: "Çevresel Düzenlemeler", icon: Leaf, accent: "accent-teal" },
  { category: "Denetim & Sörvey", icon: Search, accent: "accent-ocean" },
  { category: "Gemi Sertifikaları", icon: ClipboardList, accent: "accent-deep" },
  { category: "Bölgesel Düzenlemeler", icon: MapIcon, accent: "accent-slate" },
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
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const requestedCategory = searchParams.get("category");
  const activeCategory = categories.some((entry) => entry.category === requestedCategory)
    ? (requestedCategory as RegulationCategory)
    : null;
  const normalizedQuery = normalize(query.trim());

  const updateQuery = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value.trim()) next.set("q", value);
    else next.delete("q");
    setSearchParams(next, { replace: true });
  };

  const openCategory = (category: RegulationCategory) => {
    const next = new URLSearchParams(searchParams);
    next.set("category", category);
    setSearchParams(next);
  };

  const closeCategory = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("category");
    setSearchParams(next, { replace: true });
  };

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
    <LibraryPageShell
      title={activeCategory ?? "Regülasyonlar"}
      icon={Scale}
      onBack={activeCategory ? closeCategory : undefined}
      backLabel="Kategoriler"
      maxWidth="max-w-4xl"
    >
      <LibrarySearchField
        value={query}
        onChange={updateQuery}
        placeholder="SOLAS, MARPOL, PSC veya sertifika ara…"
        ariaLabel="Search regulations"
      />

      {showCategoryLibrary ? (
        <InsetGroupedList columns={2}>
          {categories.map((entry) => (
            <LibraryEntryCard
              key={entry.category}
              title={entry.category}
              icon={entry.icon}
              accent={entry.accent}
              onClick={() => openCategory(entry.category)}
            />
          ))}
        </InsetGroupedList>
      ) : (
        <section className="space-y-3">
          {!activeCategory && (
            <LibrarySectionHeading>Arama Sonuçları</LibrarySectionHeading>
          )}
          {filteredItems.length > 0 ? (
            <InsetGroupedList columns={2}>
              {filteredItems.map((item) => {
                const category = categories.find((entry) => entry.category === item.category) ?? categories[0];
                return (
                  <LibraryCompactCard
                    key={item.slug}
                    to={`/regulations/${item.slug}`}
                    title={item.label}
                    icon={category.icon}
                    accent={category.accent}
                  />
                );
              })}
            </InsetGroupedList>
          ) : (
            <div className="px-5 py-12 text-center text-sm text-muted-foreground">
              Aramanızla eşleşen regülasyon bulunamadı.
            </div>
          )}
        </section>
      )}
    </LibraryPageShell>
  );
}
