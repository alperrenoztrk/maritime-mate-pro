import { useMemo, useState } from "react";
import { Anchor } from "lucide-react";
import { shipSystemsData } from "@/data/shipSystemsData";
import { getProfessionalSystemGuide } from "@/data/shipSystemsProfessionalData";
import { shipSystemsSections as SECTIONS } from "@/data/shipSystemsSections";
import {
  LibraryBookCard,
  LibraryCompactCard,
  LibraryPageShell,
  LibrarySearchField,
  LibrarySectionHeading,
} from "@/components/library/LibraryInterface";

const SECTION_META = Object.fromEntries(
  SECTIONS.map((section) => [section.id, section]),
);

const normalize = (value: string) =>
  value
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");

const allTopics = Object.entries(shipSystemsData).flatMap(([sectionId, section]) => {
  const meta = SECTION_META[sectionId];
  if (!meta) return [];
  return section.topics.map((topic, topicIndex) => {
    const guide = getProfessionalSystemGuide(sectionId, topicIndex, topic.title);
    return {
      sectionId,
      topicIndex,
      title: topic.title,
      sectionTitle: meta.title,
      icon: meta.icon,
      accent: meta.color,
      searchText: [
        topic.title,
        section.title,
        section.description,
        topic.introduction,
        ...guide.searchTerms,
        guide.purpose,
        guide.boundary,
        ...topic.sections.flatMap((item) => [item.heading, ...item.paragraphs]),
      ].join(" "),
    };
  });
});

export default function ShipSystemsPage() {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalize(query.trim());
  const hits = useMemo(
    () =>
      normalizedQuery
        ? allTopics.filter((topic) => normalize(topic.searchText).includes(normalizedQuery))
        : [],
    [normalizedQuery],
  );

  return (
    <LibraryPageShell title="Gemi Sistemleri ve Ekipmanları" icon={Anchor}>
      <LibrarySearchField
        value={query}
        onChange={setQuery}
        placeholder="Konu veya ekipman ara…"
        ariaLabel="Gemi sistemlerinde ara"
      />

      {normalizedQuery ? (
        <section className="space-y-3">
          <LibrarySectionHeading badge={hits.length}>Arama Sonuçları</LibrarySectionHeading>
          {hits.length > 0 ? (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {hits.map((hit) => (
                <LibraryCompactCard
                  key={`${hit.sectionId}-${hit.topicIndex}`}
                  to={`/ship-systems/${hit.sectionId}?topic=${hit.topicIndex}`}
                  title={hit.title}
                  icon={hit.icon}
                  accent={hit.accent}
                  badge={hit.sectionTitle}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card/60 px-5 py-12 text-center text-sm text-muted-foreground">
              Eşleşen konu bulunamadı.
            </div>
          )}
        </section>
      ) : (
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {SECTIONS.map((section) => (
            <LibraryBookCard
              key={section.id}
              to={section.to}
              title={section.title}
              icon={section.icon}
              accent={section.color}
              badge={shipSystemsData[section.id]?.topics.length ?? 0}
            />
          ))}
        </section>
      )}
    </LibraryPageShell>
  );
}
