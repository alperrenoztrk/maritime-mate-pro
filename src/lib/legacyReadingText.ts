/** Split a long lesson at existing paragraph boundaries; no words or symbols removed. */
export function splitLegacyReadingText(input: string, maxChars = 1250): string[] {
  if (!input.trim()) return [];
  if (!Number.isFinite(maxChars) || maxChars <= 0) throw new RangeError("Invalid page size.");
  const paragraphs = input.trim().split(/\n\s*\n/).filter(Boolean);
  const pages: string[] = [];
  let current = "";
  for (const paragraph of paragraphs) {
    if (current && current.length + paragraph.length + 2 > maxChars) {
      pages.push(current);
      current = "";
    }
    current += (current ? "\n\n" : "") + paragraph;
  }
  if (current) pages.push(current);
  return pages;
}
