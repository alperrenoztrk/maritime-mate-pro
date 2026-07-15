import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Anchor, Search, X } from "lucide-react";
import { shipSystemsData } from "@/data/shipSystemsData";
import { getProfessionalSystemGuide } from "@/data/shipSystemsProfessionalData";
import { shipSystemsSections as SECTIONS } from "@/data/shipSystemsSections";
import { BookSheet } from "@/components/book/BookSheet";

const SECTION_META: Record<string, { title: string; icon: typeof Anchor; color: string }> = Object.fromEntries(
  SECTIONS.map((s) => [s.id, { title: s.title, icon: s.icon, color: s.color }]),
);

interface TopicHit {
  sectionId: string;
  sectionTitle: string;
  topicIndex: number;
  topicTitle: string;
  icon: typeof Anchor;
  color: string;
  purpose: string;
  searchText: string;
}

const ALL_TOPICS: TopicHit[] = Object.entries(shipSystemsData).flatMap(([sectionId, section]) => {
  const meta = SECTION_META[sectionId];
  if (!meta) return [];
  return section.topics.map((t, idx) => {
    const guide = getProfessionalSystemGuide(sectionId, idx, t.title);
    const sourceText = [
      t.title,
      section.title,
      section.description,
      t.introduction,
      ...guide.searchTerms,
      guide.purpose,
      guide.boundary,
      ...t.sections.flatMap((topicSection) => [topicSection.heading, ...topicSection.paragraphs]),
    ].join(" ");
    return {
      sectionId,
      sectionTitle: meta.title,
      topicIndex: idx,
      topicTitle: t.title,
      icon: meta.icon,
      color: meta.color,
      purpose: guide.purpose,
      searchText: sourceText,
    };
  });
});

const TOTAL_TOPIC_COUNT = ALL_TOPICS.length;

const normalize = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .replace(/[ğ]/g, "g")
    .replace(/[ü]/g, "u")
    .replace(/[ş]/g, "s")
    .replace(/[ö]/g, "o")
    .replace(/[ç]/g, "c");

export default function ShipSystemsPage() {
  const [query, setQuery] = useState("");
  const trimmed = query.trim();

  const hits = useMemo(() => {
    if (!trimmed) return [] as TopicHit[];
    const q = normalize(trimmed);
    return ALL_TOPICS.filter(
      (h) => normalize(h.searchText).includes(q),
    );
  }, [trimmed]);

  return (
    <BookSheet title="GEMİ SİSTEMLERİ">
      <p className="bs-muted mb-3 text-center text-[11px] italic">
        {TOTAL_TOPIC_COUNT} sistem; çalışma akışı, gemide kullanım, arıza ve mevzuat bağlantısıyla.
      </p>

      {/* Arama kutusu */}
      <div className="relative mb-2">
        <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgba(90,61,20,.6)]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Konu veya ekipman ara…"
          className="bs-input"
          aria-label="Gemi sistemleri içinde ara"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Aramayı temizle"
            className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-[rgba(90,61,20,.6)] hover:opacity-70"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {trimmed ? (
        <div>
          <p className="bs-muted text-[11px] italic">{hits.length} sonuç bulundu</p>
          {hits.length === 0 ? (
            <p className="bs-muted py-6 text-center text-sm italic">Eşleşen konu bulunamadı.</p>
          ) : (
            hits.map((hit) => (
              <Link
                key={`${hit.sectionId}-${hit.topicIndex}`}
                to={`/ship-systems/${hit.sectionId}?topic=${hit.topicIndex}`}
                className="block"
              >
                <span className="bs-entry" style={{ minHeight: 0, paddingBottom: 0 }}>
                  <span className="bs-entry-label font-semibold">{hit.topicTitle}</span>
                  <span className="bs-leader" aria-hidden="true" />
                  <span className="bs-anchor" aria-hidden="true">⚓</span>
                </span>
                <span className="bs-muted block pl-3 pr-2 pb-2 text-[11px] leading-relaxed">
                  {hit.sectionTitle} — <span className="line-clamp-2 inline">{hit.purpose}</span>
                </span>
              </Link>
            ))
          )}
        </div>
      ) : (
        <div>
          {SECTIONS.map((section) => (
            <Link key={section.id} to={section.to} className="block">
              <span className="bs-entry" style={{ minHeight: 0, paddingBottom: 0 }}>
                <span className="bs-entry-label font-semibold">{section.title}</span>
                <span className="bs-leader" aria-hidden="true" />
                <span className="bs-note">{shipSystemsData[section.id]?.topics.length ?? 0} sistem</span>
              </span>
              <span className="bs-muted line-clamp-2 block pl-3 pr-2 pb-2 text-[11px] leading-relaxed">
                {section.desc}
              </span>
            </Link>
          ))}
        </div>
      )}
    </BookSheet>
  );
}
