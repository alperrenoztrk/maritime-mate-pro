import approvedVisualManifest from "@/data/verifiedLessonVisuals.json";

/** Only reviewable, image-specific source files are allowed into lesson pages.
 * The glob resolves Vite's hashed asset URLs; the manifest narrows them to
 * exact course + topic + section associations. A filename or vague keyword
 * match is never sufficient. Unapproved images fail closed.
 */
type VerifiedPlacement = (typeof approvedVisualManifest.approved)[number];
const allLocalAssets = import.meta.glob<string>("/src/assets/**/*.{jpg,jpeg,png,webp,svg}", {
  eager: true,
  query: "?url",
  import: "default",
});
const normalise = (s?: string) => (s ?? "").normalize("NFC").trim();
const reviewed = new Map<string, VerifiedPlacement>();
for (const placement of approvedVisualManifest.approved) {
  const url = allLocalAssets["/" + placement.asset];
  if (!url) continue;
  const key = [url, placement.category, placement.topic, placement.section].map(normalise).join("\u0000");
  reviewed.set(key, placement);
}
export function getVerifiedLessonImageCredit(
  src: string | undefined,
  categoryId: string | undefined,
  sectionTitle: string | undefined,
  topicTitle: string | undefined,
): VerifiedPlacement | undefined {
  if (!src || !categoryId || !sectionTitle || !topicTitle) return undefined;
  const key = [src, categoryId, topicTitle, sectionTitle].map(normalise).join("\u0000");
  return reviewed.get(key);
}

/**
 * Lesson image resolution.
 *
 * `LessonTopicDetailPage` and `LessonTeachCard` pass every image they find in
 * lesson content through here. Images are shown only for exact course/topic/section/source combinations\n * registered with an authentic provenance and licence. All other images are hidden.
 *
 * There is deliberately no keyword-based substitute any more: an image must be
 * assigned to its section explicitly in the content files, so a section either
 * shows a picture of exactly its subject or shows none (Oct 2026 image audit).
 */

export const resolveLessonImage = (
  categoryId: string | undefined,
  src: string | undefined,
  sectionTitle: string | undefined,
  topicTitle: string | undefined,
  _alt: string | undefined,
  _replaceExternal: boolean = true,
): string | undefined =>
  getVerifiedLessonImageCredit(src, categoryId, sectionTitle, topicTitle) ? src : undefined;

const MARKDOWN_IMAGE_RE = /!\[([^\]]*)\]\(([^)\s]+)\)/g;

/**
 * Tekrar denetimi için görselin kimliği.
 *
 * Aynı dosya iki ayrı yolla gelebilir: `src/assets/...` üzerinden import
 * edilince Vite adı hash'ler (`mercator-projection-a1b2c3d4.svg`), aynı dosyanın
 * `public/diagrams/...` kopyası ise düz yolla gelir. Ham metin karşılaştırması
 * bunları farklı sanıp aynı diyagramı iki kez basar; bu yüzden klasör ve hash
 * atılıp yalnız dosya adı üzerinden karşılaştırılır.
 */
export const lessonImageIdentity = (src: string): string =>
  src
    .split(/[?#]/)[0]
    .split("/")
    .pop()!
    .replace(/-[A-Za-z0-9_-]{8,}(\.[A-Za-z0-9]+)$/, "$1")
    .toLowerCase();

/**
 * Bir bölümün markdown metninin GÖSTERECEĞİ görselleri (çözümlenmiş hâlleriyle)
 * döndürür; metni değiştirmez.
 *
 * Çağıran sayfa, konu boyunca hangi görsellerin kullanıldığını biriktirip
 * `normalizeLessonMarkdownImages`'a geçirebilsin diye vardır. Aksi hâlde
 * tekrar denetimi yalnız bölüm içinde çalışır ve aynı diyagram (ör. Mercator)
 * bir konunun ardışık bölümlerinde arka arkaya basılır.
 */
export const collectLessonMarkdownImages = (
  content: string,
  categoryId: string | undefined,
  sectionTitle: string | undefined,
  topicTitle: string | undefined,
): string[] => {
  const found: string[] = [];
  const seen = new Set<string>();
  content.replace(MARKDOWN_IMAGE_RE, (_full, alt: string, src: string) => {
    const resolved = resolveLessonImage(categoryId, src, sectionTitle, topicTitle, alt);
    if (resolved && !seen.has(lessonImageIdentity(resolved))) {
      seen.add(lessonImageIdentity(resolved));
      found.push(resolved);
    }
    return "";
  });
  return found;
};

/**
 * Section markdown metnindeki görselleri normalize eder: dış görseller
 * `resolveLessonImage` ile yerel karşılığına çevrilir, karşılığı olmayanlar
 * ve aynı bölümde tekrar edenler metinden çıkarılır.
 */
export const normalizeLessonMarkdownImages = (
  content: string,
  categoryId: string | undefined,
  sectionTitle: string | undefined,
  topicTitle: string | undefined,
  alreadyUsed: Iterable<string> = [],
): string => {
  const seen = new Set([...alreadyUsed].map(lessonImageIdentity));
  return content.replace(MARKDOWN_IMAGE_RE, (_full, alt: string, src: string) => {
    const resolved = resolveLessonImage(categoryId, src, sectionTitle, topicTitle, alt);
    if (!resolved || seen.has(lessonImageIdentity(resolved))) return "";
    seen.add(lessonImageIdentity(resolved));
    return `![${alt}](${resolved})`;
  });
};
