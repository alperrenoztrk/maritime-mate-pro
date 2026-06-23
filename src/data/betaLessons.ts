import type { LucideIcon } from "lucide-react";
import { calculationCategories } from "@/data/calculationCenterConfig";
import { getTopicContentsByCategory } from "@/data/topicContents";
import { stabilityTopicsData } from "@/data/stabilityTopicsContent";
import { machineTopicLessons } from "@/data/machineTopicLessonData";
import { getMachineSubTopicContent, hasSubTopicContent } from "@/data/machineTopicDetailContent";

/**
 * "Dersler Beta" — birleşik (normalize) içerik katmanı.
 *
 * Uygulamada ders içeriği üç farklı şemada tutulur:
 *  1) Güverte (navigation/meteorology/communication): `TopicDetailContent`
 *     (section = {title, content, bulletPoints, formula{text,description}, image})
 *  2) Stabilite: `stabilityTopicsData` (subtopic = {content, formulas[], examples[]...})
 *  3) Makine (16 konu): `machineTopicDetailContent` (section = {heading, paragraphs[],
 *     formula{expression,variables}, example{problem,steps,result}, table, diagram})
 *
 * Bu modül üçünü tek bir `BetaTopic`/`BetaSection` şekline indirger; böylece beta
 * sayfaları (liste, detay, Duolingo oturumu, AI eğitmen) TÜM güverte ve makine
 * konularını/alt başlıklarını tek kod yoluyla kapsar. İçerik read-only okunur;
 * orijinal "Dersler" verisine dokunulmaz.
 */

export interface BetaSection {
  title: string;
  content: string;
  bulletPoints?: string[];
  formula?: { text: string; description?: string };
  image?: string;
  imageAlt?: string;
  example?: { problem: string; steps?: string[]; solution?: string; result?: string };
  table?: { headers: string[]; rows: string[][] };
}

export interface BetaTopic {
  title: string;
  introduction?: string;
  sections: BetaSection[];
  keyPoints?: string[];
}

export interface BetaCategory {
  /** calculationCategories id'si (örn. "navigation", "stability", "machine-thermodynamics"). */
  key: string;
  title: string;
  icon: LucideIcon;
  accent: string;
  group: "deck" | "machine";
  /** Bu kategoride rehberli/okunabilir konu anlatımı içeriği var mı? */
  enabled: boolean;
  /** Açılabilir (içerikli) alt başlık sayısı. */
  topicCount: number;
}

/** Section düzeyinde anlatım içeriği OLAN güverte kategorileri. */
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

// ── Konu başlığı listeleri ────────────────────────────────────────────────

/** Bir kategorinin (güverte id veya makine id) açılabilir alt başlık başlıkları. */
export function getBetaTopicTitles(key?: string): string[] {
  if (!key) return [];
  if (isMachine(key)) {
    const slug = machineSlug(key);
    const lesson = machineTopicLessons[slug];
    if (!lesson) return [];
    const titles: string[] = [];
    for (const kt of lesson.keyTopics) {
      for (const st of kt.subTopics) {
        if (hasSubTopicContent(slug, st.title)) titles.push(st.title);
      }
    }
    return titles;
  }
  if (key === "stability") {
    return stabilityTopicsData.flatMap((t) => t.subtopics.map((s) => s.title));
  }
  if (DECK_CONTENT_KEYS.includes(key)) {
    return Object.keys(getTopicContentsByCategory(key));
  }
  return [];
}

// ── Tekil konu içeriği (normalize) ────────────────────────────────────────

function mapMachineTopic(slug: string, title: string): BetaTopic | null {
  const c = getMachineSubTopicContent(slug, title);
  if (!c) return null;
  return {
    title: c.title,
    introduction: c.introduction,
    sections: c.sections.map((s) => ({
      title: s.heading,
      content: s.paragraphs.join("\n\n"),
      bulletPoints: s.bulletPoints,
      formula: s.formula
        ? {
            text: s.formula.expression,
            description:
              s.formula.variables && s.formula.variables.length
                ? s.formula.variables.join(" · ")
                : undefined,
          }
        : undefined,
      image: s.diagram?.src,
      imageAlt: s.diagram?.alt,
      example: s.example
        ? { problem: s.example.problem, steps: s.example.steps, result: s.example.result }
        : undefined,
      table: s.table,
    })),
    keyPoints: c.keyPoints,
  };
}

function mapStabilityTopic(title: string): BetaTopic | null {
  for (const topic of stabilityTopicsData) {
    const sub = topic.subtopics.find((s) => s.title === title);
    if (!sub) continue;
    const sections: BetaSection[] = [
      {
        title: sub.title,
        content: sub.content,
        bulletPoints: [...(sub.practicalTips ?? []), ...(sub.warnings ?? [])],
      },
    ];
    // Başlıklar benzersiz olmalı (GuidedLessonSession section Map'i ve flow eşleşmesi
    // için): birden çok formül/örnek varsa numaralandırılır.
    const fs = sub.formulas ?? [];
    fs.forEach((f, i) =>
      sections.push({
        title: fs.length > 1 ? `Formül ${i + 1}` : "Formül",
        content: "",
        formula: { text: f.formula, description: f.description },
      }),
    );
    const ex = sub.examples ?? [];
    ex.forEach((e, i) =>
      sections.push({
        title: ex.length > 1 ? `Çözümlü Örnek ${i + 1}` : "Çözümlü Örnek",
        content: "",
        example: { problem: e.problem, solution: e.solution },
      }),
    );
    return { title: sub.title, sections, keyPoints: sub.keyPoints };
  }
  return null;
}

function mapDeckTopic(key: string, title: string): BetaTopic | null {
  const t = getTopicContentsByCategory(key)[title];
  if (!t) return null;
  return {
    title: t.title,
    introduction: t.introduction,
    sections: t.sections.map((s) => ({
      title: s.title,
      content: s.content,
      bulletPoints: s.bulletPoints,
      formula: s.formula ? { text: s.formula.text, description: s.formula.description } : undefined,
      image: s.image,
      imageAlt: s.imageAlt,
    })),
    keyPoints: t.keyPoints,
  };
}

/** Normalize edilmiş tekil konu içeriği (yoksa null). */
export function getBetaTopic(key?: string, title?: string): BetaTopic | null {
  if (!key || !title) return null;
  if (isMachine(key)) return mapMachineTopic(machineSlug(key), title);
  if (key === "stability") return mapStabilityTopic(title);
  if (DECK_CONTENT_KEYS.includes(key)) return mapDeckTopic(key, title);
  return null;
}

// ── Kategori listesi ──────────────────────────────────────────────────────

/** Tüm beta kategorileri (güverte + makine), içerik durumu ile birlikte. */
export function getBetaCategories(): BetaCategory[] {
  return calculationCategories.map((c) => {
    const key = c.id as string;
    const group: "deck" | "machine" = isMachine(key) ? "machine" : "deck";
    // İçerik odaklı: yalnızca gerçekten açılabilir konusu olan kategori "enabled".
    const topicCount = getBetaTopicTitles(key).length;
    return {
      key,
      title: c.title,
      icon: c.icon,
      accent: c.accent,
      group,
      enabled: topicCount > 0,
      topicCount,
    };
  });
}

export const hasBetaContent = (key?: string): boolean => getBetaTopicTitles(key).length > 0;
