export type BookVolumeId =
  | "navigation-bridge"
  | "stability-cargo"
  | "seamanship-deck"
  | "safety-regulations"
  | "marine-engineering"
  | "crew-organization"
  | "workbook-reference";

export interface BookVolumeDescriptor {
  id: BookVolumeId;
  numeral: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  cover: string;
  coverDeep: string;
  accent: string;
}

/**
 * Lightweight cover catalogue. Keep this file independent from lesson,
 * glossary and operation datasets so the home shelf and route frame do not
 * eagerly load the full maritime curriculum.
 */
export const bookVolumeDescriptors: readonly BookVolumeDescriptor[] = [
  {
    id: "navigation-bridge",
    numeral: "CİLT I",
    title: "Seyir ve Köprüüstü",
    shortTitle: "Seyir",
    subtitle: "Seyir · Meteoroloji · GMDSS",
    description: "Seyir planı, köprüüstü vardiyası, meteoroloji, haberleşme ve seyir cihazları.",
    cover: "#174f78",
    coverDeep: "#08263f",
    accent: "#7dd3fc",
  },
  {
    id: "stability-cargo",
    numeral: "CİLT II",
    title: "Stabilite, Yük ve Ticari Operasyonlar",
    shortTitle: "Stabilite ve Yük",
    subtitle: "Stabilite · Kargo · Gemi Tipleri",
    description: "Stabilite, yük elleçleme, draft survey, gemi tipleri ve ticari operasyonlar.",
    cover: "#7a4b16",
    coverDeep: "#3b2108",
    accent: "#fbbf24",
  },
  {
    id: "seamanship-deck",
    numeral: "CİLT III",
    title: "Gemicilik ve Güverte Operasyonları",
    shortTitle: "Gemicilik",
    subtitle: "Gemicilik · Güverte · Manevra",
    description: "Gemicilik bilgisi, güverte makineleri, palamar, demir ve gemi görevleri.",
    cover: "#176452",
    coverDeep: "#07372d",
    accent: "#6ee7b7",
  },
  {
    id: "safety-regulations",
    numeral: "CİLT IV",
    title: "Emniyet, Çevre ve Mevzuat",
    shortTitle: "Emniyet ve Mevzuat",
    subtitle: "SOLAS · MARPOL · ISM · ISPS",
    description: "Denizde emniyet, yangın, çevre koruma ve uluslararası denizcilik mevzuatı.",
    cover: "#7b2532",
    coverDeep: "#3c0f18",
    accent: "#fda4af",
  },
  {
    id: "marine-engineering",
    numeral: "CİLT V",
    title: "Gemi Makineleri ve Teknik Sistemler",
    shortTitle: "Gemi Makineleri",
    subtitle: "Ana Makine · Yardımcılar · Elektrik",
    description: "Makine teorisi, ana ve yardımcı makineler, elektrik, otomasyon, bakım ve ERM.",
    cover: "#414a59",
    coverDeep: "#171c24",
    accent: "#cbd5e1",
  },
  {
    id: "crew-organization",
    numeral: "CİLT VI",
    title: "Gemi Personeli ve Organizasyonu",
    shortTitle: "Gemi Organizasyonu",
    subtitle: "Personel · Görevler · Role Cetveli",
    description: "Gemi hiyerarşisi, görev ve sorumluluklar, acil durum organizasyonu ve Role Cetveli.",
    cover: "#553b73",
    coverDeep: "#241431",
    accent: "#d8b4fe",
  },
  {
    id: "workbook-reference",
    numeral: "CİLT VII",
    title: "Denizci Çalışma ve Başvuru Kitabı",
    shortTitle: "Çalışma Kitabı",
    subtitle: "Hesaplama · Alıştırma · Sözlük",
    description: "Hesaplama merkezi, formüller, sınav çalışmaları, quizler ve denizcilik sözlüğü.",
    cover: "#755a18",
    coverDeep: "#352707",
    accent: "#fde68a",
  },
];

export const isBookVolumeId = (value: string | null | undefined): value is BookVolumeId =>
  Boolean(value && bookVolumeDescriptors.some((volume) => volume.id === value));

export function getBookVolumeDescriptor(volumeId: BookVolumeId): BookVolumeDescriptor {
  return bookVolumeDescriptors.find((volume) => volume.id === volumeId) ?? bookVolumeDescriptors[0];
}

