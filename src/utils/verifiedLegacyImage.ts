import sourceRegistry from "@/data/verifiedLegacyVisuals.json";

/**
 * Non-guessing visual gate for older maritime lessons. An image is returned
 * only for an exact source URL emitted by Vite and an explicitly approved
 * topic/surface pair. No generic image, hotlink, keyword replacement, or
 * automatically drawn illustration may pass without a reviewed placement.
 */
type VerifiedLegacyVisual = (typeof sourceRegistry.approved)[number];
const localImages = import.meta.glob<string>("/src/assets/**/*.{jpg,jpeg,png,webp,svg}", {
  eager: true,
  query: "?url",
  import: "default",
});
const records = new Map<string, VerifiedLegacyVisual>();
const normalise = (value: string) => value.normalize("NFC");
const makeKey = (surface: string, topicId: string, src: string) =>
  [surface,topicId,src].map(normalise).join("\u0000");

for (const item of sourceRegistry.approved) {
  const compiled = localImages["/" + item.asset];
  if (!compiled) continue;
  records.set(makeKey(item.surface,item.topicId,compiled),item);
}

/** Count the placements whose local asset URLs were resolved by the build. */
export const verifiedLegacyPhotoCount = records.size;

export function verifiedLegacyImage(surface: string, topicId: string, src?: string) {
  if (!src || !surface || !topicId) return undefined;
  const verified = records.get(makeKey(surface,topicId,src));
  if (!verified) return undefined;
  return { ...verified, src };
}
