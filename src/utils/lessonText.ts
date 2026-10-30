import type { BetaTopic } from "@/data/betaLessons";

/** Plain lesson text that grounds the AI instructor in the topic it sits on. */
export function buildLessonText(topic: BetaTopic): string {
  return [
    topic.introduction ?? "",
    ...topic.sections.map((section) =>
      [
        section.title,
        section.content,
        ...(section.bulletPoints ?? []),
        section.formula?.text,
        section.example?.problem,
        section.example?.result,
      ]
        .filter(Boolean)
        .join(" "),
    ),
  ].join("\n");
}
