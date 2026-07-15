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

/** Kitap render sayfası: bir bölümün tamamı ya da (Dersler gibi) bir alt parçası. */
export interface BookPageSpec {
  id: string;
  numeral: string;
  title: string;
  /** Sayfa bir bölümün devamıysa "devam" etiketi için. */
  continuation?: boolean;
  to: string;
  sections: BookSection[];
}

// Dersler sayfasındaki güverte/makine ayrımıyla birebir aynı filtre (LessonsPage.tsx)
const deckLessonCategories = calculationCategories
  .filter((category) => !category.group || category.group === "deck")
  .filter((category) => !(category.id as string).startsWith("machine-"));

const lessonsDeckSection: BookSection = {
  heading: "Güverte",
  entries: deckLessonCategories.map((c) => ({
    label: c.title,
    to: `/lessons/${c.id}/topics`,
  })),
};

const lessonsMachineSection: BookSection = {
  heading: "Makine",
  entries: machineTopics.map((t) => ({
    label: t.title,
    to: `/machine/${t.slug}/topics`,
  })),
};

const exercisesSection: BookSection = {
  entries: getBetaCategories()
    .filter((c) => c.enabled)
    .map((c) => ({
      label: c.title,
      to: `/exercises/${c.key}/topics`,
    })),
};

const crewSections: BookSection[] = [
  { entries: [{ label: "Role Cetveli (Muster List)", to: "/crew/muster-list" }] },
  ...crewHierarchy.map((group) => ({
    heading: group.department,
    entries: group.roles.map((role) => ({
      label: role.rank,
      to: `/crew/${role.slug}`,
    })),
  })),
];

const shipSystemsSection: BookSection = {
  entries: shipSystemsSections.map((s) => ({
    label: s.title,
    to: `/ship-systems/${s.id}`,
  })),
};

const operationsSection: BookSection = {
  entries: shipTypes.map((s) => ({
    label: s.label,
    to: `/ship-operations/${s.id}`,
  })),
};

const glossarySection: BookSection = {
  entries: glossaryCategories.map((cat) => ({
    label: cat,
    to: `/glossary?cat=${encodeURIComponent(cat)}`,
  })),
};

const calculationReferenceSection: BookSection = {
  heading: "Araçlar ve Referanslar",
  entries: [
    { label: "Hesaplama Merkezi", to: "/calculations" },
    { label: "Formül Kitabı", to: "/formulas" },
    { label: "Kurallar ve Regülasyonlar", to: "/regulations" },
  ],
};

export const bookChapters: BookChapter[] = [
  {
    id: "lessons",
    numeral: "I",
    title: "Dersler",
    to: "/lessons",
    sections: [lessonsDeckSection, lessonsMachineSection],
  },
  {
    id: "exercises",
    numeral: "II",
    title: "Alıştırmalar",
    to: "/exercises",
    sections: [exercisesSection],
  },
  {
    id: "crew",
    numeral: "III",
    title: "Personel",
    to: "/crew",
    sections: crewSections,
  },
  {
    id: "ship-systems",
    numeral: "IV",
    title: "Gemi Sistemleri",
    to: "/ship-systems",
    sections: [shipSystemsSection],
  },
  {
    id: "operations",
    numeral: "V",
    title: "Operasyonlar",
    to: "/ship-operations",
    sections: [operationsSection],
  },
  {
    id: "glossary",
    numeral: "VI",
    title: "Sözlük",
    to: "/glossary",
    sections: [glossarySection],
  },
  {
    id: "references",
    numeral: "VII",
    title: "Hesaplamalar ve Formüller",
    to: "/calculations",
    sections: [calculationReferenceSection],
  },
];

// Render sayfaları: Dersler tek başına ~25 girdi olduğundan Güverte/Makine olarak ikiye bölünür.
export const bookPages: BookPageSpec[] = bookChapters.flatMap((chapter): BookPageSpec[] => {
  if (chapter.id === "lessons") {
    return [
      {
        id: "lessons-deck",
        numeral: chapter.numeral,
        title: chapter.title,
        to: chapter.to,
        sections: [lessonsDeckSection],
      },
      {
        id: "lessons-machine",
        numeral: chapter.numeral,
        title: chapter.title,
        continuation: true,
        to: chapter.to,
        sections: [lessonsMachineSection],
      },
    ];
  }
  return [
    {
      id: chapter.id,
      numeral: chapter.numeral,
      title: chapter.title,
      to: chapter.to,
      sections: chapter.sections,
    },
  ];
});
