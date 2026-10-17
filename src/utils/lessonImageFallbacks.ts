/**
 * Lesson image resolution.
 *
 * `LessonTopicDetailPage` and `LessonTeachCard` pass every image they find in
 * lesson content through here. Images bundled with the app (local imports or
 * paths under /) are shown as they are; external http images are dropped.
 *
 * There is deliberately no keyword-based substitute any more: an image must be
 * assigned to its section explicitly in the content files, so a section either
 * shows a picture of exactly its subject or shows none (Oct 2026 image audit).
 */

export const resolveLessonImage = (
  _categoryId: string | undefined,
  src: string | undefined,
  _sectionTitle: string | undefined,
  _topicTitle: string | undefined,
  _alt: string | undefined,
  replaceExternal: boolean = true,
): string | undefined => {
  if (!src) return undefined;
  if (!replaceExternal || !src.startsWith("http")) return src;
  // External (hotlinked) images are never shown: they belong to other sites
  // and do not load offline. Images are no longer guessed from keywords
  // either — a guessed image is too often unrelated to the section.
  return undefined;
};

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
