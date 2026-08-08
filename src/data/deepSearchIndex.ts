// Deep (content-level) search index for the global in-app search.
// -----------------------------------------------------------------------------
// The static `searchIndex` only knows about pages. This module additionally
// indexes the actual content of the app — glossary terms, lesson topics,
// sailor knots, crew roles, bridge devices, ship systems, ICS signal flags,
// Morse characters, IALA buoy marks and COLREG sound signals — so the user can
// jump straight to a term or topic instead of only to a section page.
//
// The underlying datasets are large, so everything is pulled in through
// dynamic `import()` calls: the chunks are only downloaded the first time the
// search dialog is opened, and the built index is cached for the session.
// -----------------------------------------------------------------------------

import type { SearchItem } from "./searchIndex";

/** Turkish labels for the lesson content categories in `topicContentsByCategory`. */
const LESSON_CATEGORY_LABELS: Record<string, string> = {
  navigation: "Seyir",
  meteorology: "Meteoroloji",
  communication: "İletişim",
  cargo: "Kargo",
  safety: "Güvenlik",
  environment: "Çevre",
  seamanship: "Gemicilik",
  economics: "Ekonomi",
};

/** Trim long content intros down to a single, short result subtitle. */
function shortDescription(text: string | undefined, max = 140): string | undefined {
  if (!text) return undefined;
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return undefined;
  const sentenceEnd = clean.indexOf(". ");
  const sentence = sentenceEnd > 20 ? clean.slice(0, sentenceEnd + 1) : clean;
  return sentence.length > max ? `${sentence.slice(0, max - 1).trimEnd()}…` : sentence;
}

async function buildGlossaryItems(): Promise<SearchItem[]> {
  const { glossaryTerms } = await import("./glossaryTerms");
  return glossaryTerms.map((term) => ({
    title: term.title,
    description: shortDescription(term.description),
    path: `/glossary?q=${encodeURIComponent(term.title)}`,
    category: "Sözlük",
    keywords: [term.category, "terim", "sözlük"],
  }));
}

async function buildLessonTopicItems(): Promise<SearchItem[]> {
  const { topicContentsByCategory } = await import("./topicContents");
  const items: SearchItem[] = [];
  for (const [categoryId, contents] of Object.entries(topicContentsByCategory)) {
    const category = LESSON_CATEGORY_LABELS[categoryId] ?? "Dersler";
    for (const [title, content] of Object.entries(contents)) {
      items.push({
        title,
        description: shortDescription(content.introduction),
        path: `/lessons/${categoryId}/topics/${encodeURIComponent(title)}`,
        category,
        keywords: ["konu anlatımı", "ders", category],
      });
    }
  }
  return items;
}

async function buildKnotItems(): Promise<SearchItem[]> {
  const { SAILOR_KNOTS } = await import("./sailorKnots");
  return SAILOR_KNOTS.map((knot) => ({
    title: knot.name,
    description: shortDescription(knot.use),
    path: `/seamanship/knots?q=${encodeURIComponent(knot.name)}`,
    category: "Gemicilik",
    keywords: [knot.nameEn, ...(knot.aka ?? []), "düğüm", "bağ", "halat"],
  }));
}

async function buildCrewItems(): Promise<SearchItem[]> {
  const { crewHierarchy } = await import("./crewHierarchy");
  return crewHierarchy.flatMap((group) =>
    group.roles.map((role) => ({
      title: role.rank,
      description: shortDescription(role.responsibility),
      path: `/crew/${role.slug}`,
      category: "Personel",
      keywords: [group.department, "mürettebat", "görev", "rütbe"],
    })),
  );
}

async function buildBridgeDeviceItems(): Promise<SearchItem[]> {
  const { bridgeDevices } = await import("./bridgeDevices");
  return bridgeDevices.map((device) => ({
    title: device.name,
    description: shortDescription(device.description),
    path: `/bridge/${device.id}`,
    category: "Seyir",
    keywords: ["köprüüstü", "cihaz", "ekipman"],
  }));
}

async function buildShipSystemItems(): Promise<SearchItem[]> {
  const { shipSystemsData } = await import("./shipSystemsData");
  const items: SearchItem[] = [];
  for (const [sectionId, section] of Object.entries(shipSystemsData)) {
    items.push({
      title: section.title,
      description: shortDescription(section.description),
      path: `/ship-systems/${sectionId}`,
      category: "Makine",
      keywords: ["gemi sistemleri", "ekipman"],
    });
    section.topics.forEach((topic, index) => {
      items.push({
        title: topic.title,
        description: shortDescription(topic.introduction),
        path: `/ship-systems/${sectionId}/${index}`,
        category: "Makine",
        keywords: ["gemi sistemleri", section.title],
      });
    });
  }
  return items;
}

async function buildSignalFlagItems(): Promise<SearchItem[]> {
  const { SIGNAL_FLAGS } = await import("./signalFlags");
  return SIGNAL_FLAGS.map((flag) => ({
    // "A (Alfa)" biçimi, arama sonucunda harfin tek başına kaybolmasını önler.
    title: flag.phonetic ? `${flag.label} (${flag.phonetic})` : flag.label,
    description: shortDescription(flag.meaning),
    path: `/communication/flags?q=${encodeURIComponent(flag.label)}`,
    category: "Haberleşme",
    keywords: [flag.phonetic ?? "", "bayrak", "flama", "işaret kodu", "ICS"].filter(Boolean),
  }));
}

async function buildMorseItems(): Promise<SearchItem[]> {
  const { MORSE_CODE } = await import("./morseCode");
  return MORSE_CODE.map((entry) => ({
    title: `${entry.char} — mors ${entry.code}`,
    description: shortDescription(entry.maritimeUse),
    path: `/communication/morse?q=${encodeURIComponent(entry.char)}`,
    category: "Haberleşme",
    keywords: [entry.phonetic ?? "", "mors", "morse", "aldis"].filter(Boolean),
  }));
}

async function buildBuoyageItems(): Promise<SearchItem[]> {
  const { BUOY_MARKS } = await import("./buoyage");
  return BUOY_MARKS.map((mark) => ({
    title: mark.title,
    description: shortDescription(mark.instruction),
    path: `/navigation/buoyage?q=${encodeURIComponent(mark.title)}`,
    category: "Seyir",
    keywords: ["şamandıra", "buoy", "IALA", mark.colour],
  }));
}

async function buildSoundSignalItems(): Promise<SearchItem[]> {
  const { SOUND_SIGNALS } = await import("./soundSignals");
  return SOUND_SIGNALS.map((signal) => ({
    title: `${signal.title} (${signal.readable})`,
    description: shortDescription(signal.meaning),
    path: `/navigation/sound-signals?q=${encodeURIComponent(signal.title)}`,
    category: "Seyir",
    keywords: ["ses işareti", "düdük", "COLREG", signal.rule],
  }));
}

let cachedIndex: SearchItem[] | null = null;
let pendingIndex: Promise<SearchItem[]> | null = null;

/** Returns the already-built deep index without triggering a load. */
export function getDeepSearchIndex(): SearchItem[] | null {
  return cachedIndex;
}

/**
 * Builds (once) and returns the deep content index. Individual sources are
 * loaded independently, so a failing chunk only drops its own entries.
 */
export function loadDeepSearchIndex(): Promise<SearchItem[]> {
  if (cachedIndex) return Promise.resolve(cachedIndex);
  if (pendingIndex) return pendingIndex;

  pendingIndex = Promise.allSettled([
    buildGlossaryItems(),
    buildLessonTopicItems(),
    buildKnotItems(),
    buildCrewItems(),
    buildBridgeDeviceItems(),
    buildShipSystemItems(),
    buildSignalFlagItems(),
    buildMorseItems(),
    buildBuoyageItems(),
    buildSoundSignalItems(),
  ]).then((results) => {
    cachedIndex = results.flatMap((result) =>
      result.status === "fulfilled" ? result.value : [],
    );
    pendingIndex = null;
    return cachedIndex;
  });

  return pendingIndex;
}
