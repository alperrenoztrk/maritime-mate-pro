import type { QuizQuestion } from "@/types/quiz";
import { getBetaTopic, type BetaSection, type BetaTopic } from "@/data/betaLessons";
import { getLessonFlow } from "@/data/lessonFlow";
import { getTopicQuiz } from "@/data/courseContent/quiz";
import { stripMarkdown, stripDollarSigns } from "@/utils/cleanText";
import { normalizeLessonMarkdownImages, resolveLessonImage } from "@/utils/lessonImageFallbacks";

/**
 * Ders anlatımının slayt ("video") modeli.
 *
 * İçerik YENİDEN YAZILMAZ: `betaLessons.getBetaTopic()` üç ayrı şemayı
 * (güverte `TopicDetailContent`, `stabilityTopicsData`, makine
 * `MachineSubTopicContent`) tek bir `BetaTopic` şekline indirger; bu modül de
 * o normalize içeriği ekran görüntüsündeki gibi slaytlara böler. Böylece tek
 * kod yolu ile 9 güverte kategorisi + stabilite + 16 makine konusunun TAMAMI
 * slayt/seslendirme akışına kavuşur.
 *
 * Her slaytın `narration` alanı seslendirme için hazırlanmış düz metindir
 * (kaynak dil). Uygulama dili değiştiğinde oynatıcı ekrandaki (çevrilmiş)
 * metni okur; `narration` yalnızca yedektir.
 */

export type SlideBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "image"; src: string; alt?: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "formula"; text: string; description?: string }
  | { kind: "table"; headers: string[]; rows: string[][] }
  | { kind: "example"; problem: string; steps?: string[]; solution?: string; result?: string }
  | { kind: "quiz"; question: QuizQuestion };

export type SlideLayout =
  | "cover"
  | "imageText"
  | "text"
  | "bullets"
  | "formula"
  | "table"
  | "example"
  | "summary"
  | "quiz";

export interface LessonSlide {
  id: string;
  layout: SlideLayout;
  /** Slayt başlığı (bölüm başlığı). */
  title: string;
  /** Aynı bölümün birden çok slaytında gösterilen "1/3" tipi sıra bilgisi. */
  partLabel?: string;
  blocks: SlideBlock[];
  /** Seslendirilecek düz metin (kaynak dil, yedek). */
  narration: string;
  /** Ses kapalıyken/başarısızken slaytın ekranda kalma süresi. */
  estimatedMs: number;
}

export interface LessonDeck {
  categoryId: string;
  topicTitle: string;
  title: string;
  slides: LessonSlide[];
}

export interface BuildDeckOptions {
  /** Alıştırma modu: bölüm aralarına bilgi kontrolü soruları eklenir. */
  withQuiz?: boolean;
}

// ── Ayarlar ───────────────────────────────────────────────────────────────

/** Bir metin slaytında gösterilecek yaklaşık en fazla karakter. */
const MAX_CHARS_PER_TEXT_SLIDE = 380;
/** Bir slaytta gösterilecek en fazla madde. */
const MAX_BULLETS_PER_SLIDE = 4;
/** Bir slaytta gösterilecek en fazla tablo satırı. */
const MAX_TABLE_ROWS_PER_SLIDE = 6;
/** Seslendirme yokken: kelime başına süre (~150 kelime/dk) ve alt/üst sınırlar. */
const MS_PER_WORD = 400;
const MIN_SLIDE_MS = 4000;
const MAX_SLIDE_MS = 30000;

// ── Metin yardımcıları ────────────────────────────────────────────────────

/** Markdown görsellerini metinden ayıklar; {text, images} döner. */
const extractMarkdownImages = (
  content: string,
  categoryId: string,
  sectionTitle: string,
  topicTitle: string,
  alreadyUsed: string[],
): { text: string; images: { src: string; alt?: string }[] } => {
  const normalized = normalizeLessonMarkdownImages(
    content,
    categoryId,
    sectionTitle,
    topicTitle,
    alreadyUsed,
  );
  const images: { src: string; alt?: string }[] = [];
  const text = normalized.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_full, alt: string, src: string) => {
    images.push({ src, alt: alt || undefined });
    return "";
  });
  return { text, images };
};

/**
 * Uzun metni slayt boyutunda parçalara böler. Cümle sınırlarına saygı duyar,
 * tek cümle sınırı aşıyorsa o cümle kendi slaytında kalır (ortadan kesilmez).
 */
const chunkText = (text: string, maxChars = MAX_CHARS_PER_TEXT_SLIDE): string[] => {
  const clean = stripDollarSigns(text).replace(/\s+/g, " ").trim();
  if (!clean) return [];
  if (clean.length <= maxChars) return [clean];

  const sentences = clean.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) ?? [clean];
  const chunks: string[] = [];
  let current = "";
  for (const raw of sentences) {
    const sentence = raw.trim();
    if (!sentence) continue;
    if (!current) {
      current = sentence;
    } else if (`${current} ${sentence}`.length <= maxChars) {
      current = `${current} ${sentence}`;
    } else {
      chunks.push(current);
      current = sentence;
    }
  }
  if (current) chunks.push(current);
  return chunks;
};

const chunkArray = <T,>(items: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
};

/** Slaytın seslendirme metnini bloklardan üretir (görsel src'leri okunmaz). */
const narrationFromBlocks = (title: string, blocks: SlideBlock[], includeTitle = true): string => {
  const parts: string[] = [];
  if (includeTitle && title) parts.push(stripMarkdown(title));

  for (const block of blocks) {
    switch (block.kind) {
      case "paragraph":
        parts.push(stripMarkdown(block.text));
        break;
      case "bullets":
        parts.push(...block.items.map((item) => stripMarkdown(item)));
        break;
      case "formula":
        parts.push(stripMarkdown(block.text));
        if (block.description) parts.push(stripMarkdown(block.description));
        break;
      case "table":
        // Tablolar okunmaz; yalnızca varlığı belirtilir.
        parts.push("Tabloyu ekrandan inceleyin.");
        break;
      case "example":
        parts.push(stripMarkdown(block.problem));
        if (block.steps) parts.push(...block.steps.map((step) => stripMarkdown(step)));
        if (block.solution) parts.push(stripMarkdown(block.solution));
        if (block.result) parts.push(`Sonuç: ${stripMarkdown(block.result)}`);
        break;
      case "quiz":
        parts.push(stripMarkdown(block.question.question));
        break;
      case "image":
        if (block.alt) parts.push(stripMarkdown(block.alt));
        break;
    }
  }

  return parts
    .map((part) => part.trim())
    .filter(Boolean)
    .join(". ")
    .replace(/\.\.+/g, ".")
    .replace(/\s+/g, " ")
    .trim();
};

const estimateMs = (narration: string): number => {
  const words = narration.split(/\s+/).filter(Boolean).length;
  return Math.min(MAX_SLIDE_MS, Math.max(MIN_SLIDE_MS, words * MS_PER_WORD));
};

const makeSlide = (
  id: string,
  layout: SlideLayout,
  title: string,
  blocks: SlideBlock[],
  opts: { partLabel?: string; narrateTitle?: boolean } = {},
): LessonSlide => {
  const narration = narrationFromBlocks(title, blocks, opts.narrateTitle ?? true);
  return {
    id,
    layout,
    title,
    partLabel: opts.partLabel,
    blocks,
    narration,
    estimatedMs: estimateMs(narration),
  };
};

// ── Bölüm → slaytlar ──────────────────────────────────────────────────────

const buildSectionSlides = (
  section: BetaSection,
  index: number,
  categoryId: string,
  topicTitle: string,
): LessonSlide[] => {
  const slides: LessonSlide[] = [];
  const sectionId = `s${index}`;
  const title = stripMarkdown(section.title || "");

  const primaryImage = resolveLessonImage(
    categoryId,
    section.image,
    section.title,
    topicTitle,
    section.imageAlt,
  );

  const { text, images: inlineImages } = section.content
    ? extractMarkdownImages(
        section.content,
        categoryId,
        section.title,
        topicTitle,
        primaryImage ? [primaryImage] : [],
      )
    : { text: "", images: [] as { src: string; alt?: string }[] };

  const paragraphs = chunkText(text);
  const imageQueue: { src: string; alt?: string }[] = [];
  if (primaryImage) imageQueue.push({ src: primaryImage, alt: section.imageAlt });
  imageQueue.push(...inlineImages);

  // 1) Metin slaytları — ilk slayta bölümün görseli eşlik eder (imageText düzeni).
  paragraphs.forEach((paragraph, i) => {
    const image = imageQueue.shift();
    const blocks: SlideBlock[] = [];
    if (image) blocks.push({ kind: "image", src: image.src, alt: image.alt });
    blocks.push({ kind: "paragraph", text: paragraph });
    slides.push(
      makeSlide(`${sectionId}-p${i}`, image ? "imageText" : "text", title, blocks, {
        partLabel: paragraphs.length > 1 ? `${i + 1}/${paragraphs.length}` : undefined,
        narrateTitle: i === 0,
      }),
    );
  });

  // Metin yoksa ama görsel varsa görseli tek başına göster.
  if (paragraphs.length === 0 && imageQueue.length > 0) {
    const image = imageQueue.shift()!;
    slides.push(
      makeSlide(`${sectionId}-img`, "imageText", title, [
        { kind: "image", src: image.src, alt: image.alt },
      ]),
    );
  }

  // 2) Madde listeleri
  const bullets = (section.bulletPoints ?? []).map((b) => stripMarkdown(b)).filter(Boolean);
  chunkArray(bullets, MAX_BULLETS_PER_SLIDE).forEach((group, i, all) => {
    slides.push(
      makeSlide(`${sectionId}-b${i}`, "bullets", title, [{ kind: "bullets", items: group }], {
        partLabel: all.length > 1 ? `${i + 1}/${all.length}` : undefined,
        narrateTitle: slides.length === 0,
      }),
    );
  });

  // 3) Formül
  if (section.formula?.text) {
    slides.push(
      makeSlide(`${sectionId}-f`, "formula", title, [
        {
          kind: "formula",
          text: stripDollarSigns(section.formula.text),
          description: section.formula.description
            ? stripMarkdown(section.formula.description)
            : undefined,
        },
      ]),
    );
  }

  // 4) Tablo (uzun tablolar birden çok slayta bölünür)
  if (section.table && section.table.headers.length > 0) {
    const { headers, rows } = section.table;
    chunkArray(rows, MAX_TABLE_ROWS_PER_SLIDE).forEach((group, i, all) => {
      slides.push(
        makeSlide(`${sectionId}-t${i}`, "table", title, [
          { kind: "table", headers, rows: group },
        ], { partLabel: all.length > 1 ? `${i + 1}/${all.length}` : undefined }),
      );
    });
  }

  // 5) Çözümlü örnek
  if (section.example) {
    slides.push(
      makeSlide(`${sectionId}-e`, "example", title, [
        {
          kind: "example",
          problem: stripMarkdown(section.example.problem),
          steps: section.example.steps?.map((s) => stripMarkdown(s)),
          solution: section.example.solution ? stripMarkdown(section.example.solution) : undefined,
          result: section.example.result ? stripMarkdown(section.example.result) : undefined,
        },
      ]),
    );
  }

  // Bölümün hiç içeriği yoksa (yalnız başlık) en azından başlık slaytı üret.
  if (slides.length === 0 && title) {
    slides.push(makeSlide(`${sectionId}-h`, "text", title, []));
  }

  return slides;
};

// ── Quiz slaytları ────────────────────────────────────────────────────────

/**
 * Bölüm sonlarına yerleştirilecek bilgi kontrolü sorularını hazırlar.
 * `lessonFlow` varsa recap soruları blok sonlarına bağlanır
 * (ExerciseTopicDetailPage'deki `checkAfter` mantığının aynısı); yoksa
 * kategori quiz bankasından belirli aralıklarla soru serpiştirilir.
 */
const buildQuizBySection = (
  categoryId: string,
  topicTitle: string,
  topic: BetaTopic,
): Map<string, QuizQuestion> => {
  const bySection = new Map<string, QuizQuestion>();
  const flow = getLessonFlow(categoryId, topicTitle);

  if (flow) {
    const used = new Set<number>();
    for (const block of flow.blocks) {
      const last = block.sectionTitles[block.sectionTitles.length - 1];
      const question = flow.questions.find(
        (q) => block.sectionTitles.includes(q.sectionRef) && !used.has(q.id),
      );
      if (last && question) {
        used.add(question.id);
        bySection.set(last, question);
      }
    }
    if (bySection.size > 0) return bySection;
  }

  // Yedek: kategori soru bankasından her 3 bölümde bir soru.
  const pool = getTopicQuiz(categoryId);
  if (pool.length === 0) return bySection;
  let poolIndex = 0;
  topic.sections.forEach((section, i) => {
    if (i > 0 && (i + 1) % 3 === 0 && poolIndex < pool.length) {
      bySection.set(section.title, pool[poolIndex]);
      poolIndex += 1;
    }
  });
  return bySection;
};

// ── Deck üreticisi ────────────────────────────────────────────────────────

const deckCache = new Map<string, LessonDeck | null>();

const buildDeck = (
  categoryId: string,
  topicTitle: string,
  options: BuildDeckOptions,
): LessonDeck | null => {
  const topic = getBetaTopic(categoryId, topicTitle);
  if (!topic) return null;

  const slides: LessonSlide[] = [];
  const title = stripMarkdown(topic.title || topicTitle);

  // Kapak
  const introChunks = topic.introduction ? chunkText(topic.introduction) : [];
  slides.push(
    makeSlide("cover", "cover", title, introChunks[0] ? [{ kind: "paragraph", text: introChunks[0] }] : []),
  );
  introChunks.slice(1).forEach((chunk, i) => {
    slides.push(
      makeSlide(`intro-${i}`, "text", title, [{ kind: "paragraph", text: chunk }], {
        narrateTitle: false,
      }),
    );
  });

  const quizBySection = options.withQuiz
    ? buildQuizBySection(categoryId, topicTitle, topic)
    : new Map<string, QuizQuestion>();

  topic.sections.forEach((section, index) => {
    slides.push(...buildSectionSlides(section, index, categoryId, title));
    const question = quizBySection.get(section.title);
    if (question) {
      slides.push(
        makeSlide(`s${index}-quiz`, "quiz", "Bilgini Kontrol Et", [
          { kind: "quiz", question },
        ]),
      );
    }
  });

  // Özet
  const keyPoints = (topic.keyPoints ?? []).map((p) => stripMarkdown(p)).filter(Boolean);
  if (keyPoints.length > 0) {
    chunkArray(keyPoints, MAX_BULLETS_PER_SLIDE).forEach((group, i, all) => {
      slides.push(
        makeSlide(`summary-${i}`, "summary", "Önemli Noktalar", [
          { kind: "bullets", items: group },
        ], { partLabel: all.length > 1 ? `${i + 1}/${all.length}` : undefined }),
      );
    });
  }

  return { categoryId, topicTitle, title, slides };
};

/**
 * Bir konunun slayt destesini üretir (yoksa null). Sonuç önbelleğe alınır;
 * içerik build-time sabit olduğu için deste her render'da yeniden kurulmaz.
 */
export function buildLessonDeck(
  categoryId?: string,
  topicTitle?: string,
  options: BuildDeckOptions = {},
): LessonDeck | null {
  if (!categoryId || !topicTitle) return null;
  const cacheKey = `${categoryId}|${topicTitle}|${options.withQuiz ? "q" : "-"}`;
  if (deckCache.has(cacheKey)) return deckCache.get(cacheKey) ?? null;
  const deck = buildDeck(categoryId, topicTitle, options);
  deckCache.set(cacheKey, deck);
  return deck;
}

/** Bu konunun slayt anlatımı var mı? */
export const hasLessonDeck = (categoryId?: string, topicTitle?: string): boolean => {
  const deck = buildLessonDeck(categoryId, topicTitle);
  return !!deck && deck.slides.length > 0;
};
