import type { LucideIcon } from "lucide-react";
import { calculationCategories } from "@/data/calculationCenterConfig";
import { getTopicContentsByCategory } from "@/data/topicContents";
import { stabilityTopicsData } from "@/data/stabilityTopicsContent";
import { machineTopicLessons } from "@/data/machineTopicLessonData";
import { getMachineSubTopicContent, hasSubTopicContent } from "@/data/machineTopicDetailContent";
import { topicContents as cargoTopicContents, cargoTopics } from "@/pages/CargoTopicsPage";
import { topicContents as seamanshipTopicContents, seamanshipTopics } from "@/pages/SeamanshipTopicsPage";
import { topicContents as safetyTopicContents, safetyTopics } from "@/pages/SafetyTopicsPage";
import { topicContents as environmentTopicContents, environmentTopics } from "@/pages/EnvironmentTopicsPage";
import { topicContents as economicsTopicContents, econTopics } from "@/pages/EconomicsTopicsPage";

/**
 * "Dersler Beta" — birleşik (normalize) içerik katmanı.
 *
 * Uygulamada ders içeriği farklı şemalarda tutulur:
 *  1) Güverte (navigation/meteorology/communication): `TopicDetailContent`
 *     (section = {title, content, bulletPoints, formula{text,description}, image})
 *  2) Stabilite: `stabilityTopicsData` (subtopic = {content, formulas[], examples[]...})
 *  3) Makine (16 konu): `machineTopicDetailContent` (section = {heading, paragraphs[],
 *     formula{expression,variables}, example{problem,steps,result}, table, diagram})
 *  4) Sayfa-içi güverte konuları (cargo/seamanship/safety/environment/economics):
 *     `*TopicsPage.tsx` içindeki `topicContents` (tek `content` metni + formula{name,
 *     expression,description} + examples[] + warnings[]); konu sırası `*Topics` ağacından.
 *
 * Bu modül hepsini tek bir `BetaTopic`/`BetaSection` şekline indirger; böylece beta
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
const DECK_CONTENT_KEYS = ["navigation", "meteorology", "communication", "stability"];

const isMachine = (key: string) => key.startsWith("machine-");
const machineSlug = (key: string) => key.slice("machine-".length);

// ── Sayfa-içi güverte konuları (cargo/seamanship/safety/environment/economics) ──
//
// Bu kategorilerin anlatımı ilgili `*TopicsPage.tsx` dosyalarında `topicContents`
// (id → içerik) ve `*Topics` (konu ağacı, sıralama) olarak tutulur. Read-only okunur.

interface PageSubTopic {
  id: string;
  title: string;
  hasContent: boolean;
}
interface PageMainTopic {
  subtopics: PageSubTopic[];
}
interface PageTopicContent {
  title: string;
  introduction?: string;
  content: string;
  image?: string;
  bulletPoints?: string[];
  examples?: { problem: string; solution: string }[];
  formula?: { name: string; expression: string; description: string };
  keyPoints?: string[];
  warnings?: string[];
  table?: { title?: string; headers: string[]; rows: string[][] };
}

interface PageCategory {
  tree: PageMainTopic[];
  contents: Record<string, PageTopicContent>;
}

const PAGE_CATEGORIES: Record<string, PageCategory> = {
  cargo: { tree: cargoTopics as unknown as PageMainTopic[], contents: cargoTopicContents as unknown as Record<string, PageTopicContent> },
  seamanship: { tree: seamanshipTopics as unknown as PageMainTopic[], contents: seamanshipTopicContents as unknown as Record<string, PageTopicContent> },
  safety: { tree: safetyTopics as unknown as PageMainTopic[], contents: safetyTopicContents as unknown as Record<string, PageTopicContent> },
  environment: { tree: environmentTopics as unknown as PageMainTopic[], contents: environmentTopicContents as unknown as Record<string, PageTopicContent> },
  economics: { tree: econTopics as unknown as PageMainTopic[], contents: economicsTopicContents as unknown as Record<string, PageTopicContent> },
};

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
  const page = PAGE_CATEGORIES[key];
  if (page) {
    const titles: string[] = [];
    for (const main of page.tree) {
      for (const sub of main.subtopics) {
        if (!sub.hasContent) continue;
        const c = page.contents[sub.id];
        if (c) titles.push(c.title);
      }
    }
    return titles;
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

function mapPageTopic(key: string, title: string): BetaTopic | null {
  const page = PAGE_CATEGORIES[key];
  if (!page) return null;
  const c = Object.values(page.contents).find((x) => x.title === title);
  if (!c) return null;

  const sections: BetaSection[] = [
    {
      title: c.title,
      content: c.content,
      bulletPoints: [...(c.bulletPoints ?? []), ...(c.warnings ?? [])],
      image: c.image,
      table: c.table ? { headers: c.table.headers, rows: c.table.rows } : undefined,
    },
  ];
  // Başlıklar benzersiz olmalı (GuidedLessonSession section Map'i için).
  if (c.formula) {
    sections.push({
      title: "Formül",
      content: "",
      formula: {
        text: c.formula.expression,
        description: [c.formula.name, c.formula.description].filter(Boolean).join(" — "),
      },
    });
  }
  const ex = c.examples ?? [];
  ex.forEach((e, i) =>
    sections.push({
      title: ex.length > 1 ? `Çözümlü Örnek ${i + 1}` : "Çözümlü Örnek",
      content: "",
      example: { problem: e.problem, solution: e.solution },
    }),
  );

  return { title: c.title, introduction: c.introduction, sections, keyPoints: c.keyPoints };
}

/** Normalize edilmiş tekil konu içeriği (yoksa null). */
export function getBetaTopic(key?: string, title?: string): BetaTopic | null {
  if (!key || !title) return null;
  if (isMachine(key)) return mapMachineTopic(machineSlug(key), title);
  if (key === "stability") return mapStabilityTopic(title);
  if (DECK_CONTENT_KEYS.includes(key)) return mapDeckTopic(key, title);
  if (PAGE_CATEGORIES[key]) return mapPageTopic(key, title);
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
