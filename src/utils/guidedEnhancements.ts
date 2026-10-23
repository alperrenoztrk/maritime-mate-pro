import type { BetaSection, BetaTopic } from "@/data/betaLessons";
import { getLessonTopicEnhancement } from "@/data/lessonTopicEnhancements";

/** Keep the reader's existing worked explanations available in guided practice. */
export function withGuidedEnhancements(category: string | undefined, topic: BetaTopic): BetaTopic {
  const enhancement = getLessonTopicEnhancement(category, topic.sourceTitle ?? topic.title);
  if (!enhancement) return topic;
  const sections: BetaSection[] = [];
  if (enhancement.deepDive || enhancement.coreFormula) sections.push({
    title: "Concept and method", content: enhancement.deepDive ?? "", formula: enhancement.coreFormula,
  });
  for (const step of enhancement.steps ?? []) sections.push({ title: step.title, content: step.description });
  for (const [index, example] of (enhancement.workedExamples ?? []).entries()) sections.push({
    title: `Worked example ${index + 1}`, content: example.note ?? "",
    table: { headers: ["Given", "Value"], rows: example.given.map((given) => [given.label, given.value]) },
    example: { problem: example.scenario, steps: example.solution.map((line) => [line.step, line.expression, line.result].filter(Boolean).join(" — ")), result: example.answer },
  });
  if (enhancement.commonMistakes?.length) sections.push({ title: "Common mistakes", content: "", bulletPoints: enhancement.commonMistakes });
  if (enhancement.criticalNotes?.length) sections.push({ title: "Practical limits", content: "", bulletPoints: enhancement.criticalNotes });
  return { ...topic, sections: [...topic.sections, ...sections.map((section, index) => ({ ...section, id: `${topic.id}-guided-extension-${index + 1}` }))] };
}
