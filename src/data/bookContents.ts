import { calculationCategories } from "@/data/calculationCenterConfig";
import { machineTopics } from "@/data/machineTopicData";
import { getBetaCategories } from "@/data/betaLessons";
import { crewHierarchy } from "@/data/crewHierarchy";
import { shipTypes } from "@/data/shipOperations";
import { glossaryCategories } from "@/data/glossaryTerms";
import { shipSystemsSections } from "@/data/shipSystemsSections";

export interface BookEntry {
  label: string;
  to: string;
}

export interface BookSection {
  heading?: string;
  entries: BookEntry[];
}

export interface BookChapter {
  id: string;
  numeral: string;
  title: string;
  to: string;
  sections: BookSection[];
}

export interface BookPageSpec {
  id: string;
  numeral: string;
  title: string;
  continuation?: boolean;
  to: string;
  sections: BookSection[];
}

export type BookVolumeId =
  | "navigation-bridge"
  | "stability-cargo"
  | "seamanship-deck"
  | "safety-regulations"
  | "marine-engineering"
  | "crew-organization"
  | "workbook-reference";

export interface BookVolume {
  id: BookVolumeId;
  numeral: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  cover: string;
  coverDeep: string;
  accent: string;
  chapters: BookChapter[];
}

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"] as const;

const deckLessonCategories = calculationCategories
  .filter((category) => !category.group || category.group === "deck")
  .filter((category) => !(category.id as string).startsWith("machine-"));

const lessonEntries = (ids: string[]): BookEntry[] =>
  deckLessonCategories
    .filter((category) => ids.includes(category.id as string))
    .map((category) => ({
      label: category.title,
      to: `/lessons/${category.id}/topics`,
    }));

const machineLessonEntries: BookEntry[] = machineTopics.map((topic) => ({
  label: topic.title,
  to: `/machine/${topic.slug}/topics`,
}));

const exerciseEntries = (group?: "deck" | "machine"): BookEntry[] =>
  getBetaCategories()
    .filter((category) => category.enabled && (!group || category.group === group))
    .map((category) => ({
      label: category.title,
      to: `/exercises/${category.key}/topics`,
    }));

const systemEntries = (ids: string[]): BookEntry[] =>
  shipSystemsSections
    .filter((system) => ids.includes(system.id))
    .map((system) => ({
      label: system.title,
      to: `/ship-systems/${system.id}`,
    }));

const glossaryEntries = (categories: string[]): BookEntry[] =>
  glossaryCategories
    .filter((category) => categories.includes(category))
    .map((category) => ({
      label: category,
      to: `/glossary?cat=${encodeURIComponent(category)}`,
    }));

const crewSections: BookSection[] = crewHierarchy.map((group) => ({
  heading: group.department,
  entries: group.roles.map((role) => ({
    label: role.rank,
    to: `/crew/${role.slug}`,
  })),
}));

const operationsEntries: BookEntry[] = shipTypes.map((ship) => ({
  label: ship.label,
  to: `/ship-operations/${ship.id}`,
}));

const chapter = (
  volumeId: BookVolumeId,
  index: number,
  id: string,
  title: string,
  to: string,
  sections: BookSection[],
): BookChapter => ({
  id: `${volumeId}-${id}`,
  numeral: ROMAN_NUMERALS[index] ?? String(index + 1),
  title,
  to,
  sections,
});

/**
 * Seven purpose-built volumes. The split follows how seafarers look for
 * information (subject and onboard duty), rather than mirroring app feature
 * types such as "lessons", "tools" and "systems".
 */
export const bookVolumes: BookVolume[] = [
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
    chapters: [
      chapter("navigation-bridge", 0, "lessons", "Seyir ve Köprüüstü Dersleri", "/lessons/navigation/topics", [
        { entries: lessonEntries(["navigation", "meteorology", "communication"]) },
      ]),
      chapter("navigation-bridge", 1, "systems", "Köprüüstü ve Haberleşme Sistemleri", "/ship-systems/nav-systems", [
        { entries: systemEntries(["nav-systems", "gmdss-lsa"]) },
      ]),
      chapter("navigation-bridge", 2, "practice", "Seyir Uygulamaları", "/navigation", [
        {
          entries: [
            { label: "Seyir Hesaplamaları", to: "/navigation" },
            { label: "Seyir Formülleri", to: "/navigation/formulas" },
            { label: "Seyir Kuralları", to: "/navigation/rules" },
            { label: "Passage Plan", to: "/passage-plan" },
          ],
        },
      ]),
    ],
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
    chapters: [
      chapter("stability-cargo", 0, "lessons", "Stabilite ve Yük Dersleri", "/lessons/stability/topics", [
        { entries: lessonEntries(["stability", "cargo", "economics"]) },
      ]),
      chapter("stability-cargo", 1, "systems", "Yük Sistemleri ve Ekipmanları", "/ship-systems/cargo-systems", [
        { entries: systemEntries(["cargo-systems"]) },
      ]),
      chapter("stability-cargo", 2, "operations", "Gemi Tipleri ve Operasyonları", "/ship-operations", [
        { entries: operationsEntries },
      ]),
      chapter("stability-cargo", 3, "calculations", "Stabilite ve Yük Hesapları", "/stability/calculations", [
        {
          entries: [
            { label: "Stabilite Hesaplamaları", to: "/stability/calculations" },
            { label: "Stabilite Formülleri", to: "/stability/formulas" },
            { label: "Yük Hesaplamaları", to: "/cargo/calculations" },
            { label: "Yük Formülleri", to: "/cargo/formulas" },
          ],
        },
      ]),
    ],
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
    chapters: [
      chapter("seamanship-deck", 0, "lessons", "Gemicilik Dersleri", "/lessons/seamanship/topics", [
        { entries: lessonEntries(["seamanship"]) },
      ]),
      chapter("seamanship-deck", 1, "machinery", "Güverte Makineleri", "/ship-systems/deck-machinery", [
        { entries: systemEntries(["deck-machinery"]) },
      ]),
      chapter("seamanship-deck", 2, "duties", "Güverte İşleri ve Operasyonlar", "/ship-tasks", [
        {
          entries: [
            { label: "Gemi Görevleri", to: "/ship-tasks" },
            { label: "Gemicilik Hesaplamaları", to: "/seamanship/calculations" },
            { label: "Gemicilik Formülleri", to: "/seamanship/formulas" },
            { label: "Gemicilik Kuralları", to: "/seamanship/rules" },
          ],
        },
      ]),
    ],
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
    chapters: [
      chapter("safety-regulations", 0, "lessons", "Emniyet ve Çevre Dersleri", "/lessons/safety/topics", [
        { entries: lessonEntries(["safety", "environment"]) },
      ]),
      chapter("safety-regulations", 1, "systems", "Yangın ve Emniyet Sistemleri", "/ship-systems/fire-safety", [
        { entries: systemEntries(["fire-safety"]) },
      ]),
      chapter("safety-regulations", 2, "regulations", "Kurallar ve Regülasyonlar", "/regulations", [
        {
          entries: [
            { label: "Tüm Kurallar ve Regülasyonlar", to: "/regulations" },
            { label: "SOLAS", to: "/solas" },
            { label: "Emniyet Kuralları", to: "/safety/rules" },
            { label: "Çevre Koruma Kuralları", to: "/environment/rules" },
          ],
        },
      ]),
    ],
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
    chapters: [
      chapter("marine-engineering", 0, "lessons", "Makine Dersleri", "/machine/thermodynamics/topics", [
        { entries: machineLessonEntries },
      ]),
      chapter("marine-engineering", 1, "systems", "Makine ve Yardımcı Sistemler", "/ship-systems/main-engine", [
        { entries: systemEntries(["main-engine", "auxiliary", "environmental-auxiliary"]) },
      ]),
      chapter("marine-engineering", 2, "tools", "Makine Hesaplamaları", "/machine-calculations", [
        {
          entries: [
            { label: "Makine Hesaplama Merkezi", to: "/machine-calculations" },
            { label: "Makine Dairesi Operasyonları", to: "/machinery" },
            { label: "Motor ve Tahrik", to: "/engine" },
          ],
        },
      ]),
    ],
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
    chapters: [
      chapter("crew-organization", 0, "muster", "Acil Durum Organizasyonu", "/crew/muster-list", [
        { entries: [{ label: "Role Cetveli (Muster List)", to: "/crew/muster-list" }] },
      ]),
      chapter("crew-organization", 1, "crew", "Gemi Personeli", "/crew", crewSections),
    ],
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
    chapters: [
      chapter("workbook-reference", 0, "calculations", "Hesaplamalar ve Formüller", "/calculations", [
        {
          entries: [
            { label: "Hesaplama Merkezi", to: "/calculations" },
            { label: "Formül Kitabı", to: "/formulas" },
            { label: "Birim Dönüştürücü", to: "/converter" },
          ],
        },
      ]),
      chapter("workbook-reference", 1, "exercises-deck", "Güverte Alıştırmaları", "/exercises", [
        { heading: "Güverte", entries: exerciseEntries("deck") },
      ]),
      chapter("workbook-reference", 2, "exercises-machine", "Makine Alıştırmaları", "/exercises", [
        { heading: "Makine", entries: exerciseEntries("machine") },
      ]),
      chapter("workbook-reference", 3, "exam", "Sınav Hazırlığı", "/exam-preparation", [
        { entries: [{ label: "Sınav Hazırlık Merkezi", to: "/exam-preparation" }] },
      ]),
      chapter("workbook-reference", 4, "glossary", "Denizcilik Sözlüğü", "/glossary", [
        { entries: glossaryEntries([...glossaryCategories]) },
      ]),
    ],
  },
];

export const isBookVolumeId = (value: string | null | undefined): value is BookVolumeId =>
  Boolean(value && bookVolumes.some((volume) => volume.id === value));

export function getBookVolume(volumeId: BookVolumeId): BookVolume {
  return bookVolumes.find((volume) => volume.id === volumeId) ?? bookVolumes[0];
}

export function getBookPagesForVolume(volumeId: BookVolumeId): BookPageSpec[] {
  return getBookVolume(volumeId).chapters.map((bookChapter) => ({
    id: bookChapter.id,
    numeral: bookChapter.numeral,
    title: bookChapter.title,
    to: bookChapter.to,
    sections: bookChapter.sections,
  }));
}

/** Backward-compatible flattened exports for callers that only need an index. */
export const bookChapters = bookVolumes.flatMap((volume) => volume.chapters);
export const bookPages = bookVolumes.flatMap((volume) => getBookPagesForVolume(volume.id));

