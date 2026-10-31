import { getStaticTranslation } from "@/utils/staticTranslations";
import { getMaritimeTranslationOverride } from "@/utils/maritimeGlossary";
import type { ShipOperation } from "./types";
import type { ShipOpLongForm } from "./longform/types";

// The ship-operation source material is authored in Turkish. The existing
// reviewed dictionaries already contain its English equivalents. Resolve
// those strings before rendering so a slow DOM translation pass cannot leave
// Turkish titles, procedures, tables or callouts in the English reader.
const english = (value: string): string =>
  getStaticTranslation(value.trim(), "en") ?? value;

export const englishShipTypeLabel = (id: string, original: string): string =>
  ({
    konteyner: "Container Ships",
    "ro-ro": "Ro-Ro Ships",
    tanker: "Tankers",
    dokme: "Bulk Carriers",
    yolcu: "Passenger Ships",
    offshore: "Offshore Vessels",
  } as Record<string, string>)[id] ?? english(original);

export const englishShipOperation = (operation: ShipOperation): ShipOperation => ({
  ...operation,
  title: english(operation.title),
  purpose: english(operation.purpose),
  procedure: operation.procedure.map(english),
  regulations: operation.regulations?.map(english),
  safety: operation.safety?.map(english),
  records: operation.records?.map(english),
});

export const englishShipOpLongForm = (content: ShipOpLongForm): ShipOpLongForm => ({
  ...content,
  title: english(content.title),
  intro: english(content.intro),
  sources: content.sources?.map(english),
  chapters: content.chapters.map((chapter) => ({
    ...chapter,
    heading: english(chapter.heading),
    lead: chapter.lead ? english(chapter.lead) : undefined,
    sections: chapter.sections.map((section) => ({
      ...section,
      subheading: english(section.subheading),
      paragraphs: section.paragraphs?.map(english),
      bullets: section.bullets?.map(english),
      callouts: section.callouts?.map((callout) => ({
        ...callout,
        title: callout.title ? english(callout.title) : undefined,
        text: english(callout.text),
      })),
      table: section.table && {
        caption: section.table.caption ? english(section.table.caption) : undefined,
        headers: section.table.headers.map(english),
        rows: section.table.rows.map((row) => row.map(english)),
      },
    })),
  })),
});
