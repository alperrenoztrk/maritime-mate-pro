import type { BetaSection, BetaTopic } from "@/data/betaLessons";
import type { LessonFlow, RecapQuestion } from "@/data/lessonFlow/types";

export type LessonSequenceItem =
  | { kind: "teach"; section: BetaSection }
  | { kind: "quiz"; question: RecapQuestion };

/** Source identities survive translated/display headings and canonical URLs. */
export const sectionMatches = (section: BetaSection, reference: string) =>
  section.id === reference || section.sourceTitle === reference || section.title === reference;

/**
 * All questions follow their teaching. If an expanded lesson replaced a named
 * subsection, teach the whole lesson before its questions, rather than guessing
 * a section by word similarity or asking the question before the explanation.
 */
export function buildLessonSequence(
  topic: BetaTopic,
  flow?: LessonFlow,
  orderQuestions: (questions: RecapQuestion[]) => RecapQuestion[] = (questions) => questions,
): LessonSequenceItem[] {
  if (!flow) return topic.sections.map((section) => ({ kind: "teach", section }));
  const references = [...flow.blocks.flatMap((block) => block.sectionTitles), ...flow.questions.map((question) => question.sectionRef)];
  if (references.some((reference) => !topic.sections.some((section) => sectionMatches(section, reference)))) {
    return [
      ...topic.sections.map((section): LessonSequenceItem => ({ kind: "teach", section })),
      ...orderQuestions(flow.questions).map((question): LessonSequenceItem => ({ kind: "quiz", question })),
    ];
  }

  const items: LessonSequenceItem[] = [];
  const taught = new Set<BetaSection>();
  const asked = new Set<RecapQuestion>();
  for (const block of flow.blocks) {
    for (const reference of block.sectionTitles) {
      const section = topic.sections.find((entry) => sectionMatches(entry, reference));
      if (section && !taught.has(section)) {
        items.push({ kind: "teach", section });
        taught.add(section);
      }
    }
    const questions = flow.questions.filter((question) =>
      !asked.has(question) && [...taught].some((section) => sectionMatches(section, question.sectionRef)),
    );
    for (const question of orderQuestions(questions)) {
      items.push({ kind: "quiz", question });
      asked.add(question);
    }
  }
  for (const section of topic.sections) {
    if (!taught.has(section)) items.push({ kind: "teach", section });
  }
  for (const question of orderQuestions(flow.questions.filter((entry) => !asked.has(entry)))) {
    items.push({ kind: "quiz", question });
  }
  return items;
}
