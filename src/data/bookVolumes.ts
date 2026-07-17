export type BookCollectionId =
  | "lessons"
  | "exercises"
  | "systems"
  | "operations"
  | "crew"
  | "glossary";

export type BookVolumeId = string;
export type BookVolumeGroup = "Güverte" | "Makine";

export interface BookCollectionDescriptor {
  id: BookCollectionId;
  numeral: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  cover: string;
  coverDeep: string;
  accent: string;
  directVolumeId?: BookVolumeId;
}

export interface BookVolumeDescriptor {
  id: BookVolumeId;
  collectionId: BookCollectionId;
  numeral: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  cover: string;
  coverDeep: string;
  accent: string;
  group?: BookVolumeGroup;
}

export const bookCollections: readonly BookCollectionDescriptor[] = [
  {
    id: "lessons",
    numeral: "\n",
    title: "\n\n⚓\nContainer",
    shortTitle: "Dersler",
    subtitle: "Güverte ve Makine Ders Kitapları",
    description: "Stabilite, seyir ve diğer bütün güverte ve makine dersleri ayrı kitaplar hâlinde.",
    cover: "#174f78",
    coverDeep: "#08263f",
    accent: "#7dd3fc",
  },
  {
    id: "exercises",
    numeral: "II",
    title: "Alıştırmalar",
    shortTitle: "Alıştırmalar",
    subtitle: "Güverte ve Makine Çalışma Kitapları",
    description: "Her ders için konuya özel alıştırma, öğrenme ve senaryo kitapları.",
    cover: "#8a5a14",
    coverDeep: "#3d2307",
    accent: "#fbbf24",
  },
  {
    id: "systems",
    numeral: "III",
    title: "Gemi Sistemleri",
    shortTitle: "Gemi Sistemleri",
    subtitle: "Her Sistem Ayrı Kitap",
    description: "Seyir, ana makine, yangın, yük ve diğer gemi sistemleri bağımsız kitaplar.",
    cover: "#414a59",
    coverDeep: "#171c24",
    accent: "#cbd5e1",
  },
  {
    id: "operations",
    numeral: "IV",
    title: "Operasyonlar",
    shortTitle: "Operasyonlar",
    subtitle: "Her Gemi Tipi Ayrı Kitap",
    description: "Dökme yük, tanker, konteyner, offshore ve diğer gemi tiplerinin operasyon kitapları.",
    cover: "#176452",
    coverDeep: "#07372d",
    accent: "#6ee7b7",
  },
  {
    id: "crew",
    numeral: "V",
    title: "Personel",
    shortTitle: "Personel",
    subtitle: "Görevler ve Role Cetveli",
    description: "Bütün gemi personeli, görevleri ve acil durum organizasyonu tek kitapta.",
    cover: "#553b73",
    coverDeep: "#241431",
    accent: "#d8b4fe",
    directVolumeId: "crew",
  },
  {
    id: "glossary",
    numeral: "VI",
    title: "Sözlük",
    shortTitle: "Sözlük",
    subtitle: "Denizcilik Terimleri",
    description: "Bütün denizcilik terimleri ve kategorileri tek başvuru kitabında.",
    cover: "#7b2532",
    coverDeep: "#3c0f18",
    accent: "#fda4af",
    directVolumeId: "glossary",
  },
];

const COLLECTION_PALETTES: Record<BookCollectionId, readonly [string, string, string][]> = {
  lessons: [
    ["#174f78", "#08263f", "#7dd3fc"],
    ["#1f5f6f", "#0b3038", "#67e8f9"],
    ["#315a8a", "#102947", "#93c5fd"],
    ["#285f52", "#0b332a", "#6ee7b7"],
    ["#4d527f", "#1e2145", "#c4b5fd"],
    ["#6b4f2a", "#34220d", "#fcd34d"],
  ],
  exercises: [
    ["#8a5a14", "#3d2307", "#fbbf24"],
    ["#865025", "#3f210d", "#fdba74"],
    ["#77601b", "#342a08", "#fde047"],
    ["#7a3e38", "#381817", "#fca5a5"],
  ],
  systems: [
    ["#414a59", "#171c24", "#cbd5e1"],
    ["#334e68", "#14283a", "#93c5fd"],
    ["#4b5563", "#1f2937", "#d1d5db"],
    ["#3f4f46", "#192b22", "#a7f3d0"],
  ],
  operations: [
    ["#176452", "#07372d", "#6ee7b7"],
    ["#1f626b", "#0b3036", "#67e8f9"],
    ["#6b4f2a", "#34220d", "#fcd34d"],
    ["#62436f", "#2c1735", "#e9d5ff"],
  ],
  crew: [["#553b73", "#241431", "#d8b4fe"]],
  glossary: [["#7b2532", "#3c0f18", "#fda4af"]],
};

const COLLECTION_VOLUME_LABELS: Record<BookCollectionId, string> = {
  lessons: "\n",
  exercises: "\n",
  systems: "\n",
  operations: "\n",
  crew: "\n",
  glossary: "\n",
};

const hashId = (value: string) => {
  let hash = 0;
  for (const character of value) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return hash;
};

export function createBookVolumeDescriptor(input: {
  id: BookVolumeId;
  collectionId: BookCollectionId;
  title: string;
  shortTitle?: string;
  subtitle: string;
  description: string;
  group?: BookVolumeGroup;
  numeral?: string;
}): BookVolumeDescriptor {
  const palette = COLLECTION_PALETTES[input.collectionId];
  const [cover, coverDeep, accent] = palette[hashId(input.id) % palette.length];
  return {
    ...input,
    numeral: input.numeral ?? "\n",
    shortTitle: input.shortTitle ?? input.title,
    cover,
    coverDeep,
    accent,
  };
}

export const isBookCollectionId = (
  value: string | null | undefined,
): value is BookCollectionId =>
  Boolean(value && bookCollections.some((collection) => collection.id === value));

export function getBookCollection(collectionId: BookCollectionId): BookCollectionDescriptor {
  return bookCollections.find((collection) => collection.id === collectionId) ?? bookCollections[0];
}

export function getCollectionIdFromVolumeId(volumeId: BookVolumeId): BookCollectionId {
  if (volumeId.startsWith("lesson-")) return "lessons";
  if (volumeId.startsWith("exercise-")) return "exercises";
  if (volumeId.startsWith("system-")) return "systems";
  if (volumeId.startsWith("operation-")) return "operations";
  if (volumeId === "crew") return "crew";
  if (volumeId === "glossary") return "glossary";
  return "lessons";
}
