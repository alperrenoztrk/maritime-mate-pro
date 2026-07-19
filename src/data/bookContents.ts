import { calculationCategories } from "@/data/calculationCenterConfig";
import { getBetaCategories, getBetaTopicTitles } from "@/data/betaLessons";
import { crewHierarchy } from "@/data/crewHierarchy";
import { shipTypes } from "@/data/shipOperations";
import { glossaryCategories } from "@/data/glossaryTerms";
import { shipSystemsSections } from "@/data/shipSystemsSections";
import {
  createBookVolumeDescriptor,
  type BookCollectionId,
  type BookVolumeDescriptor,
  type BookVolumeGroup,
  type BookVolumeId,
} from "@/data/bookVolumes";

export type { BookCollectionId, BookVolumeId } from "@/data/bookVolumes";

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

export interface BookVolume extends BookVolumeDescriptor {
  chapters: BookChapter[];
}

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"] as const;
const roman = (index: number) => ROMAN_NUMERALS[index] ?? String(index + 1);

const chapter = (
  volumeId: BookVolumeId,
  index: number,
  id: string,
  title: string,
  to: string,
  sections: BookSection[],
): BookChapter => ({
  id: `${volumeId}-${id}`,
  numeral: roman(index),
  title,
  to,
  sections,
});

const topicRoute = (categoryId: string, title?: string) => {
  const machine = categoryId.startsWith("machine-");
  const root = machine
    ? `/machine/${categoryId.slice("machine-".length)}/topics`
    : `/lessons/${categoryId}/topics`;
  return title ? `${root}/${encodeURIComponent(title)}` : root;
};

const lessonVolumes: BookVolume[] = calculationCategories.map((category) => {
  const categoryId = String(category.id);
  const machine = categoryId.startsWith("machine-") || category.group === "machine";
  const group: BookVolumeGroup = machine ? "Makine" : "Güverte";
  const volumeId = `lesson-${categoryId}`;
  const root = topicRoute(categoryId);
  const topics = getBetaTopicTitles(categoryId);
  const topicEntries: BookEntry[] = topics.length
    ? topics.map((title) => ({ label: title, to: topicRoute(categoryId, title) }))
    : [{ label: `${category.title} Konularını Aç`, to: root }];
  const referenceEntries: BookEntry[] = category.sections
    .filter((section) => section.id !== "quiz" && Boolean(section.href))
    .map((section) => ({ label: section.label, to: section.href as string }));

  return {
    ...createBookVolumeDescriptor({
      id: volumeId,
      collectionId: "lessons",
      title: category.title,
      shortTitle: category.title,
      subtitle: "\n",
      description: `${category.title} konu anlatımları, hesaplamaları, formülleri ve kuralları.`,
      group,
      numeral: "\n",
    }),
    chapters: [
      chapter(volumeId, 0, "topics", "Konu Anlatımları", root, [{ entries: topicEntries }]),
      ...(referenceEntries.length
        ? [chapter(volumeId, 1, "references", "Hesaplamalar, Formüller ve Kurallar", referenceEntries[0]?.to ?? root, [
            { entries: referenceEntries },
          ])]
        : []),
    ],
  };
});

const betaCategories = new Map(getBetaCategories().map((category) => [category.key, category]));

const exerciseVolumes: BookVolume[] = calculationCategories.map((lessonCategory) => {
    const categoryId = String(lessonCategory.id);
    const category = betaCategories.get(categoryId);
    const machine = categoryId.startsWith("machine-") || lessonCategory.group === "machine";
    const group: BookVolumeGroup = machine ? "Makine" : "Güverte";
    const volumeId = `exercise-${categoryId}`;
    const root = `/exercises/${categoryId}/topics`;
    const topics = getBetaTopicTitles(categoryId);
    const quizRoute = lessonCategory.sections.find((section) => section.id === "quiz")?.href
      ?? (machine
        ? `/machine/${categoryId.slice("machine-".length)}/quiz`
        : `/${categoryId}/quiz`);
    const entries: BookEntry[] = topics.length
      ? topics.map((title) => ({
          label: title,
          to: `${root}/${encodeURIComponent(title)}`,
        }))
      : [{ label: `${lessonCategory.title} Quiz ve Alıştırmaları`, to: quizRoute }];

    return {
      ...createBookVolumeDescriptor({
        id: volumeId,
        collectionId: "exercises",
        title: `${lessonCategory.title} Alıştırmaları`,
        shortTitle: lessonCategory.title,
        subtitle: "\n",
        description: `${lessonCategory.title} için konu alıştırmaları, quizler ve uygulama çalışmaları.`,
        group,
        numeral: "\n",
      }),
      chapters: [
        chapter(volumeId, 0, "topics", "Alıştırma Konuları", topics.length ? root : quizRoute, [{ entries }]),
        ...(category?.enabled
          ? [chapter(volumeId, 1, "scenarios", "Senaryolar", `/exercises/${categoryId}/scenarios`, [
              { entries: [{ label: `${lessonCategory.title} Senaryoları`, to: `/exercises/${categoryId}/scenarios` }] },
            ])]
          : []),
      ],
    };
  });

const systemVolumes: BookVolume[] = shipSystemsSections.map((system) => {
  const volumeId = `system-${system.id}`;
  const root = `/ship-systems/${system.id}`;
  return {
    ...createBookVolumeDescriptor({
      id: volumeId,
      collectionId: "systems",
      title: system.title,
      shortTitle: system.title,
      subtitle: "\n",
      description: system.desc,
      numeral: "\n",
    }),
    chapters: [
      chapter(volumeId, 0, "contents", "Sistem Konuları", root, [
        { entries: [{ label: `${system.title} Kitabını Aç`, to: root }] },
      ]),
    ],
  };
});

const operationVolumes: BookVolume[] = shipTypes.map((ship) => {
  const volumeId = `operation-${ship.id}`;
  const root = `/ship-operations/${ship.id}`;
  return {
    ...createBookVolumeDescriptor({
      id: volumeId,
      collectionId: "operations",
      title: ship.label,
      shortTitle: ship.label,
      subtitle: "\n",
      description: ship.description,
      numeral: "\n",
    }),
    chapters: [
      chapter(volumeId, 0, "contents", "Operasyon Konuları", root, [
        { entries: [{ label: `${ship.label} Operasyonlarını Aç`, to: root }] },
      ]),
    ],
  };
});

const crewSections: BookSection[] = crewHierarchy.map((group) => ({
  heading: group.department,
  entries: group.roles.map((role) => ({
    label: role.rank,
    to: `/crew/${role.slug}`,
  })),
}));

const crewVolume: BookVolume = {
  ...createBookVolumeDescriptor({
    id: "crew",
    collectionId: "crew",
    title: "Gemi Personeli",
    shortTitle: "Personel",
    subtitle: "\n",
    description: "Bütün gemi personeli, görev ve sorumlulukları ile acil durum organizasyonu.",
    numeral: "\n",
  }),
  chapters: [
    chapter("crew", 0, "muster", "Acil Durum Organizasyonu", "/crew/muster-list", [
      { entries: [{ label: "Role Cetveli (Muster List)", to: "/crew/muster-list" }] },
    ]),
    chapter("crew", 1, "roles", "Gemi Personeli", "/crew", crewSections),
  ],
};

const glossaryVolume: BookVolume = {
  ...createBookVolumeDescriptor({
    id: "glossary",
    collectionId: "glossary",
    title: "Denizcilik Sözlüğü",
    shortTitle: "Sözlük",
    subtitle: "\n",
    description: "Denizcilik terimlerinin tamamı kategori bazında tek başvuru kitabında.",
    numeral: "\n",
  }),
  chapters: [
    chapter("glossary", 0, "categories", "Sözlük Kategorileri", "/glossary", [
      {
        entries: glossaryCategories.map((category) => ({
          label: category,
          to: `/glossary?cat=${encodeURIComponent(category)}`,
        })),
      },
    ]),
  ],
};

/**
 * Exact hierarchy requested by the product owner:
 * - lessons: one book per deck or engine subject;
 * - exercises: one book per enabled subject;
 * - systems: one book per system;
 * - operations: one book per ship type;
 * - crew and glossary: one book each.
 */
export const bookVolumes: BookVolume[] = [
  ...lessonVolumes,
  ...exerciseVolumes,
  ...systemVolumes,
  ...operationVolumes,
  crewVolume,
  glossaryVolume,
];

export const isBookVolumeId = (value: string | null | undefined): value is BookVolumeId =>
  Boolean(value && bookVolumes.some((volume) => volume.id === value));

export function getBookVolumesForCollection(collectionId: BookCollectionId): BookVolume[] {
  return bookVolumes.filter((volume) => volume.collectionId === collectionId);
}

export function getBookVolume(volumeId: BookVolumeId): BookVolume {
  return bookVolumes.find((volume) => volume.id === volumeId) ?? lessonVolumes[0] ?? crewVolume;
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

export const bookChapters = bookVolumes.flatMap((volume) => volume.chapters);
export const bookPages = bookVolumes.flatMap((volume) => getBookPagesForVolume(volume.id));
