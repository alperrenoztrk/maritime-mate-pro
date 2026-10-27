import learningDepthSources from "./learningDepthSources.json";
import learningDepthReviews from "./learningDepthReviews.json";
import learningCaseStudies from "./learningCaseStudies.json";
import rulePlacements from "@/data/curriculumRulePlacement.json";
import type { LucideIcon } from "lucide-react";
import { calculationCategories } from "@/data/calculationCenterConfig";
import { getTopicContentsByCategory } from "@/data/topicContents";
import { stabilityTopicsData } from "@/data/stabilityTopicsContent";
import { getMachineSubTopicContent } from "@/data/machineTopicDetailContent";
import {
  getCurriculumSupplementTopic,
  getCurriculumSupplementTopicById,
  getCurriculumSupplementTopics,
  type CurriculumSupplementTopic,
} from "@/data/curriculumSupplementTopics";
import {
  getCurriculumCourse,
  getCurriculumModules,
  getCurriculumTopicById,
  getCurriculumTopicRefs,
  resolveCurriculumTopic,
  type CurriculumLevel,
} from "@/data/curriculumHierarchy";
import { getTopicRules } from "@/data/courseContent/rules";
import type { RuleGroup } from "@/data/courseContent/types";
import type { LessonFigureId } from "@/data/lessonFigures";

/**
 * "Dersler Beta" birleşik içerik katmanı.
 *
 * Kaynak içerik şemaları değiştirilmeden tek bir okunabilir modele çevrilir.
 * Ders -> modül -> konu hiyerarşisi curriculumHierarchy tarafından sağlanır;
 * eski kategori anahtarları ve başlık tabanlı URL'ler geriye dönük uyumludur.
 */

export interface BetaSection {
  id?: string;
  title: string;
  /** Kaynak başlık; gösterim başlığından farklıysa lesson-flow uyumluluğu için korunur. */
  sourceTitle?: string;
  content: string;
  bulletPoints?: string[];
  formula?: { text: string; description?: string };
  image?: string;
  imageAlt?: string;
  example?: { problem: string; steps?: string[]; solution?: string; result?: string };
  table?: { headers: string[]; rows: string[][] };
  references?: Array<{ title: string; url: string }>;
  figure?: LessonFigureId;
}

export interface BetaTopic {
  id?: string;
  title: string;
  sourceTitle?: string;
  moduleId?: string;
  level?: CurriculumLevel;
  introduction?: string;
  sections: BetaSection[];
  keyPoints?: string[];
}

export interface BetaModule {
  id: string;
  title: string;
  description: string;
  topicCount: number;
  topics: Array<{
    id: string;
    title: string;
    sourceTitle: string;
    level: CurriculumLevel;
  }>;
}

export interface BetaCategory {
  /** calculationCategories id'si (örn. navigation, stability, machine-thermodynamics). */
  key: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string;
  group: "deck" | "machine";
  enabled: boolean;
  topicCount: number;
  moduleCount: number;
}

const DECK_CONTENT_KEYS = [
  "navigation",
  "meteorology",
  "communication",
  "stability",
  "cargo",
  "safety",
  "environment",
  "seamanship",
  "economics",
];

const isMachine = (key: string) => key.startsWith("machine-");
const machineSlug = (key: string) => key.slice("machine-".length);
const ruleRegistryKey = (key: string) => (isMachine(key) ? machineSlug(key) : key);

const displaySectionTitle = (title: string) =>
  title.trim().toLocaleLowerCase("tr-TR") === "detaylı anlatım"
    ? "Yöntem, Uygulama ve Operasyonel Değerlendirme"
    : title;

const makeSectionId = (topicId: string | undefined, index: number) =>
  topicId ? `${topicId}-section-${index + 1}` : undefined;

export type RuleIntegrationAssignment = {
  categoryKey: string;
  group: RuleGroup;
  topicId: string;
  topicTitle: string;
};

const ruleAssignmentCache = new Map<string, RuleIntegrationAssignment[]>();

/** Authored ownership is independent of the display language. A translated
 * rule heading must not change its lesson, and cross-course rules are attached
 * to the course that actually teaches the relevant system or operation. */
export function getRuleIntegrationAssignments(categoryKey?: string): RuleIntegrationAssignment[] {
  if (!categoryKey) return [];
  const cached = ruleAssignmentCache.get(categoryKey);
  if (cached) return cached;
  const candidates = [
    ...getCurriculumModules(categoryKey).flatMap((module) => module.topics),
    ...getCurriculumSupplementTopics(categoryKey),
  ];
  const assignments: RuleIntegrationAssignment[] = [];
  for (const placement of rulePlacements.filter((entry) => entry.targetCategory === categoryKey)) {
    const group = getTopicRules(ruleRegistryKey(placement.sourceCategory)).find((entry) => entry.title === placement.ruleTitle);
    const topic = candidates.find((entry) => entry.title === placement.targetTitle || entry.sourceTitle === placement.targetTitle);
    if (!group || !topic) continue; // The curriculum check rejects a broken registry entry.
    assignments.push({ categoryKey, group, topicId: topic.id, topicTitle: topic.title });
  }
  ruleAssignmentCache.set(categoryKey, assignments);
  return assignments;
}

/**
 * Mevzuat maddelerini konu anlatımına bölüm olarak ekler.
 *
 * Kaynaktaki `rule.content` zaten madde listesidir; tek paragrafa birleştirmek
 * yerine `bulletPoints` olarak aktarılır. Grubun ilk bölümünde kaynak künyesi
 * gösterilir, künye yoksa dolgu metni yazılmaz.
 */
const integratedRuleSections = (
  topicId: string,
  assignments: RuleIntegrationAssignment[],
): BetaSection[] =>
  assignments.flatMap(({ group }, groupIndex) =>
    group.rules.map((rule, sectionIndex) => {
      const source = group.source
        ? [group.source.code, group.source.detail].filter(Boolean).join(" — ")
        : "";
      return {
        id: `${topicId}-integrated-standard-${groupIndex + 1}-${sectionIndex + 1}`,
        title: `${group.title} — ${rule.subtitle}`,
        sourceTitle: rule.subtitle,
        content: sectionIndex === 0 && source ? `Source: ${source}` : "",
        bulletPoints: rule.content.map((item) => item.trim()).filter(Boolean),
      };
    }),
  );

const mergeRulesIntoTopic = (categoryKey: string, topic: BetaTopic): BetaTopic => {
  if (!topic.id) return topic;
  const assignments = getRuleIntegrationAssignments(categoryKey).filter(
    (assignment) => assignment.topicId === topic.id,
  );
  const depthReview = learningDepthReviews.find((entry) => entry.topicId === topic.id);
  const workedCase = learningCaseStudies.find((entry) => entry.topicId === topic.id);
  if (assignments.length === 0 && !workedCase && !depthReview) return topic;

  return {
    ...topic,
    sections: [...topic.sections, ...(workedCase ? [workedCase.section] : []), ...(depthReview ? [{ ...depthReview.section, references: learningDepthSources[categoryKey as keyof typeof learningDepthSources] }] : []), ...integratedRuleSections(topic.id, assignments)],
  };
};

const mapSupplementTopic = (topic: CurriculumSupplementTopic): BetaTopic => ({
  id: topic.id,
  title: topic.title,
  sourceTitle: topic.sourceTitle,
  moduleId: topic.moduleId,
  level: topic.level,
  introduction: topic.introduction,
  sections: topic.sections.map((section, index) => ({
    id: makeSectionId(topic.id, index),
    title: section.title,
    sourceTitle: section.title,
    content: section.content,
    bulletPoints: section.bulletPoints,
  })),
  keyPoints: topic.keyPoints,
});

/**
 * Yeni arayüzlerin kullanacağı modül grupları.
 * Tamamlayıcı konular yalnız mevcut modüllere eklenir; eşleşmeyen bir modül
 * için yeni başlık oluşturulmaz.
 */
export function getBetaModules(key?: string): BetaModule[] {
  if (!key) return [];
  const supplements = getCurriculumSupplementTopics(key);

  return getCurriculumModules(key).map((module) => {
    const topics = [
      ...module.topics.map((topic) => ({
        id: topic.id,
        title: topic.title,
        sourceTitle: topic.sourceTitle,
        level: topic.level,
      })),
      ...supplements
        .filter((topic) => topic.moduleId === module.id)
        .map((topic) => ({
          id: topic.id,
          title: topic.title,
          sourceTitle: topic.sourceTitle,
          level: topic.level,
        })),
    ];

    return {
      id: module.id,
      title: module.title,
      description: module.description,
      topicCount: topics.length,
      topics,
    };
  });
}

/** Eski düz liste API'si korunur; artık tekrarları ayıklanmış kanonik başlıkları döndürür. */
export function getBetaTopicTitles(key?: string): string[] {
  if (!key) return [];
  return [
    ...getCurriculumTopicRefs(key).map((topic) => topic.title),
    ...getCurriculumSupplementTopics(key).map((topic) => topic.title),
  ];
}

/** URL ve ilerleme kaydı için başlıktan bağımsız, kararlı konu kimlikleri. */
export function getBetaTopicIds(key?: string): string[] {
  if (!key) return [];
  return [
    ...getCurriculumTopicRefs(key).map((topic) => topic.id),
    ...getCurriculumSupplementTopics(key).map((topic) => topic.id),
  ];
}

function mapMachineTopic(
  slug: string,
  sourceTitle: string,
  metadata?: ReturnType<typeof getCurriculumTopicById>,
): BetaTopic | null {
  const content = getMachineSubTopicContent(slug, sourceTitle);
  if (!content) return null;
  return {
    id: metadata?.id,
    title: metadata?.title ?? content.title,
    sourceTitle,
    moduleId: metadata
      ? getCurriculumModules(`machine-${slug}`).find((module) =>
          module.topics.some((topic) => topic.id === metadata.id),
        )?.id
      : undefined,
    level: metadata?.level,
    introduction: content.introduction,
    sections: content.sections.map((section, index) => ({
      id: makeSectionId(metadata?.id, index),
      title: displaySectionTitle(section.heading),
      sourceTitle: section.heading,
      content: section.paragraphs.join("\n\n"),
      bulletPoints: section.bulletPoints,
      formula: section.formula
        ? {
            text: section.formula.expression,
            description:
              section.formula.variables && section.formula.variables.length
                ? section.formula.variables.join(" · ")
                : undefined,
          }
        : undefined,
      image: section.diagram?.src,
      imageAlt: section.diagram?.alt,
      example: section.example
        ? {
            problem: section.example.problem,
            steps: section.example.steps,
            result: section.example.result,
          }
        : undefined,
      table: section.table,
    })),
    keyPoints: content.keyPoints,
  };
}

function mapStabilityTopic(
  sourceTitle: string,
  metadata?: ReturnType<typeof getCurriculumTopicById>,
): BetaTopic | null {
  for (const module of stabilityTopicsData) {
    const subtopic = module.subtopics.find((item) => item.title === sourceTitle);
    if (!subtopic) continue;
    const baseTitle = metadata?.title ?? subtopic.title.replace(/^\d+(?:\.\d+)*\.?\s*/, "");
    const sections: BetaSection[] = [
      {
        id: makeSectionId(metadata?.id, 0),
        title: baseTitle,
        sourceTitle: subtopic.title,
        content: subtopic.content,
        bulletPoints: [...(subtopic.practicalTips ?? []), ...(subtopic.warnings ?? [])],
      },
    ];
    const formulas = subtopic.formulas ?? [];
    formulas.forEach((formula, index) =>
      sections.push({
        id: makeSectionId(metadata?.id, sections.length),
        title: formulas.length > 1 ? `${baseTitle} — Formula ${index + 1}` : `${baseTitle} — Formula`,
        sourceTitle: formulas.length > 1 ? `Formula ${index + 1}` : "Formula",
        content: "",
        formula: { text: formula.formula, description: formula.description },
      }),
    );
    const examples = subtopic.examples ?? [];
    examples.forEach((example, index) =>
      sections.push({
        id: makeSectionId(metadata?.id, sections.length),
        title:
          examples.length > 1
            ? `${baseTitle} — Worked Example ${index + 1}`
            : `${baseTitle} — Worked Example`,
        sourceTitle: examples.length > 1 ? `Worked Example ${index + 1}` : "Worked Example",
        content: "",
        example: { problem: example.problem, solution: example.solution },
      }),
    );
    return {
      id: metadata?.id,
      title: baseTitle,
      sourceTitle,
      moduleId: module.id,
      level: metadata?.level,
      sections,
      keyPoints: subtopic.keyPoints,
    };
  }
  return null;
}

function mapDeckTopic(
  key: string,
  sourceTitle: string,
  metadata?: ReturnType<typeof getCurriculumTopicById>,
): BetaTopic | null {
  const topic = getTopicContentsByCategory(key)[sourceTitle];
  if (!topic) return null;
  const moduleId = metadata
    ? getCurriculumModules(key).find((module) =>
        module.topics.some((item) => item.id === metadata.id),
      )?.id
    : undefined;
  return {
    id: metadata?.id,
    title: metadata?.title ?? topic.title,
    sourceTitle,
    moduleId,
    level: metadata?.level,
    introduction: topic.introduction,
    sections: topic.sections.map((section, index) => ({
      id: makeSectionId(metadata?.id, index),
      title: displaySectionTitle(section.title),
      sourceTitle: section.title,
      content: section.content,
      bulletPoints: section.bulletPoints,
      formula: section.formula
        ? { text: section.formula.text, description: section.formula.description }
        : undefined,
      image: section.image,
      imageAlt: section.imageAlt,
      table: section.table,
      example: section.example,
      figure: section.figure,
    })),
    keyPoints: topic.keyPoints,
  };
}

/**
 * Başlık, eski başlık alias'ı veya sabit topic id kabul eder.
 * Böylece eski deep-link ve localStorage ilerleme kayıtları bozulmaz.
 */
export function getBetaTopic(key?: string, titleOrId?: string): BetaTopic | null {
  if (!key || !titleOrId) return null;

  const supplement = getCurriculumSupplementTopic(key, titleOrId);
  if (supplement) return mergeRulesIntoTopic(key, mapSupplementTopic(supplement));

  const metadata = getCurriculumTopicById(titleOrId) ?? resolveCurriculumTopic(key, titleOrId);
  const sourceTitle = metadata?.sourceTitle ?? titleOrId;
  const topic = isMachine(key)
    ? mapMachineTopic(machineSlug(key), sourceTitle, metadata)
    : key === "stability"
      ? mapStabilityTopic(sourceTitle, metadata)
      : DECK_CONTENT_KEYS.includes(key)
        ? mapDeckTopic(key, sourceTitle, metadata)
        : null;

  return topic ? mergeRulesIntoTopic(key, topic) : null;
}

export function getBetaTopicById(topicId?: string): BetaTopic | null {
  const supplement = getCurriculumSupplementTopicById(topicId);
  if (supplement) {
    return mergeRulesIntoTopic(supplement.category, mapSupplementTopic(supplement));
  }

  const topic = getCurriculumTopicById(topicId);
  return topic ? getBetaTopic(topic.sourceCategory, topic.id) : null;
}

export function getBetaCategories(): BetaCategory[] {
  return calculationCategories.map((category) => {
    const key = category.id as string;
    const course = getCurriculumCourse(key);
    const group: "deck" | "machine" = isMachine(key) ? "machine" : "deck";
    const topicCount = getBetaTopicTitles(key).length;
    return {
      key,
      title: course?.title ?? category.title,
      subtitle: course?.subtitle ?? category.subtitle,
      icon: category.icon,
      accent: category.accent,
      group,
      enabled: topicCount > 0,
      topicCount,
      moduleCount: course?.modules.length ?? 0,
    };
  });
}

export const hasBetaContent = (key?: string): boolean => getBetaTopicTitles(key).length > 0;
