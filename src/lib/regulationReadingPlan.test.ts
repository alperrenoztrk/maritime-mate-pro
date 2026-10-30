import assert from "node:assert/strict";
import test from "node:test";
import { createRegulationReadingPlan, paginateItems } from "./regulationReadingPlan";
import type { RegulationItem } from "@/data/regulations/types";

const regulation: RegulationItem = {
  slug: "test-regulation",
  label: "Test Regulation",
  category: "IMO Conventions",
  overview: "Overview",
  history: "A historical note",
  essentials: ["a", "b", "c", "d", "e"],
  actions: ["do this"],
  learningObjectives: ["1", "2", "3", "4", "5"],
  narrativeChapters: [
    {
      id: "chapter-a", title: "Chapter A", introduction: "Intro A",
      sections: [
        { heading: "Section A1", paragraphs: ["A1", "A2", "A3", "A4", "A5"], shipboardMeaning: "Operate safely",
          references: ["SOLAS I"], commonMistakes: ["Wrong interpretation"],
          scenario: { title: "Case", situation: "Situation", analysis: "Analysis", correctApproach: "Action" },
        },
      ],
      chapterTakeaways: ["first", "second"],
    },
    {
      id: "chapter-b", title: "Chapter B", introduction: "Intro B",
      sections: [{ heading: "Section B1", paragraphs: ["B1"] }],
      chapterTakeaways: ["third"],
    },
  ],
  detailedSections: [{ heading: "Theory", body: "Detail" }],
  applicability: ["one", "two"],
  operationalRequirements: [{ title: "Requirement", regulatoryBasis: "Code", requirement: "Do it",
    rationale: "Safety", onboardEvidence: ["report"], responsibleRoles: ["Master"],
    verification: ["check"], commonFailure: "missing record" }],
  complianceStages: [{ stage: "Plan", objective: "Plan it", activities: ["record"], outputs: ["plan"] }],
  inspectionQuestions: [{ question: "What happened?", expectedAnswer: "Correct answer",
    evidence: ["log"], redFlags: ["none"] }],
  keyArticles: [{ id: "I/1", title: "Rule", summary: "Summary" }],
  amendments: [{ year: "2024", description: "Change" }],
  terms: [{ term: "Term", definition: "Definition" }],
  penalties: ["Warning"],
  relatedSlugs: ["other-regulation"],
  sourceStatus: { reviewedThrough: "2026", caution: "Verify official text", officialSources: [] },
};

test("chunking covers all content exactly once, never hides a remainder", () => {
  assert.deepEqual(paginateItems(0, 2), []);
  assert.deepEqual(paginateItems(5, 2), [[0, 2], [2, 4], [4, 5]]);
  assert.throws(() => paginateItems(5, 0));
  assert.throws(() => paginateItems(-1, 2));
});

test("legislation reading plan is ordered, unique, and includes each source category", () => {
  const pages = createRegulationReadingPlan(regulation);
  assert.equal(pages[0].id, "overview");
  assert.equal(pages.at(-1)?.kind, "closing");
  assert.equal(new Set(pages.map((item) => item.id)).size, pages.length);
  for (const kind of [
    "history", "learning", "chapter", "narrative", "narrative-application",
    "detailed", "applicability", "operational", "compliance", "inspection",
    "essentials", "actions", "article", "amendments", "terms", "penalties", "related", "sources",
  ]) {
    assert.ok(pages.some((item) => item.kind === kind), `Missing ${kind}`);
  }
  assert.equal(pages.filter((p) => p.kind === "narrative" && p.chapterIndex === 0).length, 3);
  assert.equal(pages.filter((p) => p.kind === "narrative" && p.chapterIndex === 1).length, 1);
  assert.equal(pages.filter((p) => p.kind === "chapter-takeaways-1")[0]?.chapterIndex, 1);
  assert.deepEqual(pages.filter((p) => p.kind === "narrative" && p.chapterIndex === 0)
    .map((p) => [p.start, p.end]), [[0, 2], [2, 4], [4, 5]]);
});

test("minimal regulation keeps overview, key focus, critical actions and review", () => {
  const pages = createRegulationReadingPlan({
    slug: "minimal", label: "Minimal", category: "Safety Codes",
    overview: "Text", essentials: [], actions: [],
  });
  assert.deepEqual(pages.map((page) => page.id), ["overview", "closing"]);
});
