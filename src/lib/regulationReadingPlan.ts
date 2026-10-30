import type { RegulationItem } from "@/data/regulations/types";

export interface RegulationReadingStep {
  id: string;
  title: string;
  section: string;
  kind: string;
  chapterIndex?: number;
  sectionIndex?: number;
  start?: number;
  end?: number;
  itemIndex?: number;
}

export function paginateItems(count: number, batchSize: number): Array<[number, number]> {
  if (!Number.isSafeInteger(count) || count < 0 || !Number.isSafeInteger(batchSize) || batchSize < 1) {
    throw new RangeError("Invalid page count or batch size.");
  }
  const result: Array<[number, number]> = [];
  for (let i = 0; i < count; i += batchSize) result.push([i, Math.min(count, i + batchSize)]);
  return result;
}

/** Preserve every source section, without concatenating the entire regulation into one DOM page. */
export function createRegulationReadingPlan(data: RegulationItem): RegulationReadingStep[] {
  const pages: RegulationReadingStep[] = [];
  const add = (step: RegulationReadingStep) => pages.push(step);
  const groups = (kind: string, section: string, title: string, count: number, chunk: number) => {
    paginateItems(count, chunk).forEach(([start, end]) => add({
      id: `${kind}-${start}`, title: `${title}${count > chunk ? ` · ${start + 1}–${end}` : ""}`,
      section, kind, start, end,
    }));
  };
  add({ id: "overview", title: data.label, section: "Introduction", kind: "overview" });
  if (data.history) add({ id: "history", title: "History and place in the system", section: "Context", kind: "history" });
  groups("learning", "Reading objectives", "What you will learn", data.learningObjectives?.length ?? 0, 4);

  data.narrativeChapters?.forEach((chapter, chapterIndex) => {
    add({ id: `chapter-${chapterIndex}`, title: chapter.title, section: `Chapter ${chapterIndex + 1}`, kind: "chapter", chapterIndex });
    chapter.sections.forEach((subsection, sectionIndex) => {
      const id = `n-${chapterIndex}-${sectionIndex}`;
      const base = { chapterIndex, sectionIndex, section: `${chapterIndex + 1}.${sectionIndex + 1} — ${chapter.title}` };
      paginateItems(subsection.paragraphs.length, 2).forEach(([start, end]) => {
        add({ ...base, kind: "narrative", id: `${id}-${start}`, title: subsection.heading, start, end });
      });
      if (subsection.shipboardMeaning || subsection.references?.length || subsection.commonMistakes?.length || subsection.scenario) {
        add({ ...base, kind: "narrative-application", id: `${id}-application`, title: `${subsection.heading} — On board` });
      }
      if (!subsection.paragraphs.length && !subsection.shipboardMeaning && !subsection.references?.length &&
          !subsection.commonMistakes?.length && !subsection.scenario) {
        add({ ...base, kind: "narrative", id: `${id}-empty`, title: subsection.heading, start: 0, end: 0 });
      }
    });
    groups(`chapter-takeaways-${chapterIndex}`, `Chapter ${chapterIndex + 1}`, "Key takeaways", chapter.chapterTakeaways?.length ?? 0, 4);
  });

  data.detailedSections?.forEach((item, itemIndex) =>
    add({ id: `detailed-${itemIndex}`, title: item.heading, section: "Theory summary", kind: "detailed", itemIndex }));
  groups("applicability", "Applicability", "Scope of application", data.applicability?.length ?? 0, 4);
  data.operationalRequirements?.forEach((item, itemIndex) =>
    add({ id: `operational-${itemIndex}`, title: item.title, section: "Shipboard requirements", kind: "operational", itemIndex }));
  data.complianceStages?.forEach((item, itemIndex) =>
    add({ id: `compliance-${itemIndex}`, title: item.stage, section: "Compliance lifecycle", kind: "compliance", itemIndex }));
  data.inspectionQuestions?.forEach((item, itemIndex) =>
    add({ id: `inspection-${itemIndex}`, title: item.question, section: "Inspection readiness", kind: "inspection", itemIndex }));
  groups("essentials", "Quick reference", "Key focus areas", data.essentials.length, 4);
  groups("actions", "Quick reference", "Critical actions", data.actions.length, 4);
  data.keyArticles?.forEach((item, itemIndex) =>
    add({ id: `article-${itemIndex}`, title: `${item.id}: ${item.title}`, section: "Rules and articles", kind: "article", itemIndex }));
  groups("amendments", "Amendments", "Major changes", data.amendments?.length ?? 0, 3);
  groups("terms", "Glossary", "Operational dictionary", data.terms?.length ?? 0, 3);
  groups("penalties", "Consequences", "Sanctions and detention risk", data.penalties?.length ?? 0, 4);
  groups("related", "Cross references", "Related regulations", data.relatedSlugs?.length ?? 0, 6);
  if (data.sourceStatus || data.resources?.length) {
    add({ id: "official-sources", title: "Official sources and verification", section: "References", kind: "sources" });
  }
  add({ id: "closing", title: "Putting the rule into practice", section: "Review", kind: "closing" });
  return pages;
}
