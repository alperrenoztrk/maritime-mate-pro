import { getTopicContentsByCategory } from "@/data/topicContents";
import { stabilityTopicsData } from "@/data/stabilityTopicsContent";
import { machineTopics } from "@/data/machineTopicData";
import { machineTopicLessons } from "@/data/machineTopicLessonData";

export type CurriculumGroup = "deck" | "machine";
export type CurriculumLevel = "foundation" | "operational" | "advanced";

export interface CurriculumTopicRef {
  id: string;
  title: string;
  sourceCategory: string;
  sourceTitle: string;
  aliases?: string[];
  level: CurriculumLevel;
}

export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  topics: CurriculumTopicRef[];
}

export interface CurriculumCourse {
  id: string;
  key: string;
  title: string;
  subtitle: string;
  group: CurriculumGroup;
  modules: CurriculumModule[];
}

export interface CompetencyTrack {
  id: string;
  title: string;
  subtitle: string;
  topicIds: string[];
}

type ModuleRule = Omit<CurriculumModule, "topics"> & {
  keywords: string[];
  level?: CurriculumLevel;
};

type DeckCourseDefinition = {
  key: string;
  title: string;
  subtitle: string;
  modules: ModuleRule[];
};

const normalize = (value: string) =>
  value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");

export const curriculumSlug = (value: string) =>
  normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "topic";

const includesKeyword = (title: string, keywords: string[]) => {
  const normalized = normalize(title);
  return keywords.some((keyword) => normalized.includes(normalize(keyword)));
};

const RUNNING_FIX_CANONICAL = "Koşmalı Mevki Tayini — Running Fix";
const RUNNING_FIX_SOURCE = "Running Fix (Koşmalı Mevki Tayini)";
const RUNNING_FIX_DEPRECATED = "Running Fix (Zamana Bağlı Kerterizle Mevki Tayini)";

export const curriculumTopicAliases: Record<string, Record<string, string>> = {
  navigation: {
    [RUNNING_FIX_CANONICAL]: RUNNING_FIX_SOURCE,
    [RUNNING_FIX_DEPRECATED]: RUNNING_FIX_SOURCE,
  },
};

const canonicalDeckTitle = (category: string, sourceTitle: string) => {
  if (
    category === "navigation" &&
    (sourceTitle === RUNNING_FIX_SOURCE || sourceTitle === RUNNING_FIX_DEPRECATED)
  ) {
    return RUNNING_FIX_CANONICAL;
  }
  return sourceTitle;
};

const DECK_COURSE_DEFINITIONS: DeckCourseDefinition[] = [
  {
    key: "navigation",
    title: "Seyir",
    subtitle: "Klasik, elektronik ve göksel seyir; mevki koyma, COLREG ve köprüüstü operasyonları",
    modules: [
      {
        id: "navigation-foundations",
        title: "Seyrin Temelleri",
        description: "Koordinatlar, yönler, pusula, rota, hız, mesafe ve temel seyir geometrisi",
        keywords: ["enlem", "boylam", "koordinat", "yön", "rota", "mesafe", "hız", "pusula", "variation", "deviation", "great circle", "rhumb", "mercator", "middle latitude", "plane sailing"],
        level: "foundation",
      },
      {
        id: "navigation-chartwork",
        title: "Harita ve Harita Çalışması",
        description: "Harita projeksiyonları, semboller, datum, yayınlar ve harita düzeltmeleri",
        keywords: ["harita", "chart", "datum", "sembol", "notice", "yayın", "projection", "projeksiyon"],
        level: "foundation",
      },
      {
        id: "navigation-position-fixing",
        title: "Mevki Koyma ve Ölü Hesap",
        description: "LOP, kerteriz, fix, running fix, DR, EP, set, drift ve leeway",
        keywords: ["mevki", "fix", "kerteriz", "bearing", "lop", "ölü hesap", "dead reckoning", "dr, ep", "set-drift", "horizontal angle", "vertical angle"],
        level: "operational",
      },
      {
        id: "navigation-tides-currents",
        title: "Gelgit, Akıntı ve UKC",
        description: "Gelgit yüksekliği, gelgit akıntıları, course to steer, squat ve dinamik UKC",
        keywords: ["gelgit", "tide", "akıntı", "current", "ukc", "squat"],
        level: "operational",
      },
      {
        id: "navigation-radar",
        title: "Radar, ARPA ve Paralel İndeks",
        description: "Radar kullanımı, plotting, CPA/TCPA, ARPA, trial manoeuvre ve PI",
        keywords: ["radar", "arpa", "cpa", "tcpa", "parallel index", "paralel indeks", "plotting"],
        level: "operational",
      },
      {
        id: "navigation-ecdis",
        title: "ECDIS ve Elektronik Seyir",
        description: "ENC/SENC, emniyet ayarları, rota kontrolü, alarmlar ve sensör bütünlüğü",
        keywords: ["ecdis", "enc", "senc", "catzoc", "scamin", "elektronik seyir", "gnss", "ais"],
        level: "operational",
      },
      {
        id: "navigation-passage-planning",
        title: "Passage Planning ve Seyrin İzlenmesi",
        description: "Appraisal, planning, execution, monitoring, wheel-over, no-go ve contingency",
        keywords: ["passage", "sefer plan", "seyir plan", "wheel-over", "wheel over", "no-go", "xte", "route monitoring", "rota izleme"],
        level: "operational",
      },
      {
        id: "navigation-colreg",
        title: "Çatışmayı Önleme Kuralları — COLREG",
        description: "Gözcülük, emniyetli hız, çatışma riski, manevra kuralları, fenerler ve işaretler",
        keywords: ["colreg", "çatışma", "fener", "ışık ve şekil", "ses işaret", "dar kanal", "trafik ayırım", "kısıtlı görüş", "crossing", "overtaking", "head-on"],
        level: "operational",
      },
      {
        id: "navigation-watchkeeping-brm",
        title: "Köprüüstü Vardiyası ve BRM",
        description: "Vardiya devri, standing orders, kaptanı çağırma, BRM ve pilotaj vardiyası",
        keywords: ["vardiya", "standing orders", "night orders", "kaptanı çağır", "brm", "master-pilot", "pilotaj"],
        level: "operational",
      },
      {
        id: "navigation-equipment-failures",
        title: "Cihaz Arızaları ve Yedek Seyir",
        description: "GNSS, gyro, radar, ECDIS, AIS ve dümen arızalarında emniyetli yedek düzen",
        keywords: ["arıza", "yedek seyir", "spoofing", "jamming"],
        level: "advanced",
      },
      {
        id: "navigation-celestial",
        title: "Göksel Seyir",
        description: "Sextant, gök küresi, azimut, noon sight ve sight reduction",
        keywords: ["göksel", "astronom", "sextant", "azimut", "noon", "güneş", "yıldız", "celestial"],
        level: "advanced",
      },
    ],
  },
  {
    key: "meteorology",
    title: "Meteoroloji",
    subtitle: "Atmosfer, hava sistemleri, deniz durumu, tahmin ve ağır hava kararları",
    modules: [
      { id: "met-foundations", title: "Atmosfer ve Ölçüm Temelleri", description: "Basınç, sıcaklık, nem, kararlılık ve meteorolojik cihazlar", keywords: ["basınç", "izobar", "sıcaklık", "nem", "atmosfer", "barometre", "psikrometre"], level: "foundation" },
      { id: "met-systems", title: "Hava Kütleleri, Cepheler ve Basınç Sistemleri", description: "Siklon, antisiklon, hava kütleleri, cepheler ve orta enlem sistemleri", keywords: ["hava kütle", "cephe", "siklon", "antisiklon", "alçak", "yüksek basınç", "depresyon"], level: "foundation" },
      { id: "met-wind-waves", title: "Rüzgâr, Dalga ve Deniz Durumu", description: "Rüzgâr oluşumu, Beaufort, dalga sistemleri ve swell", keywords: ["rüzgâr", "beaufort", "dalga", "swell", "deniz durumu"], level: "operational" },
      { id: "met-visibility-ice", title: "Görüş, Sis, Yağış ve Buz", description: "Sis oluşumu, görüş kısıtları, yağış, icing ve sea ice", keywords: ["sis", "görüş", "yağış", "buz", "icing", "ice"], level: "operational" },
      { id: "met-tropical-heavy-weather", title: "Tropikal Sistemler ve Ağır Hava", description: "Tropikal siklonlar, kaçınma, ağır hava rotası ve gemi hazırlığı", keywords: ["tropikal", "tayfun", "kasırga", "hurricane", "cyclone", "ağır hava", "storm"], level: "advanced" },
      { id: "met-forecast-routing", title: "Tahmin, Hava Haritaları ve Rota Kararı", description: "Synoptik harita, GRIB, weather routing ve operasyonel karar", keywords: ["tahmin", "synopt", "grib", "routing", "hava harita", "navtex"], level: "operational" },
    ],
  },
  {
    key: "communication",
    title: "Denizde Haberleşme",
    subtitle: "Radyo haberleşmesi, distress prosedürleri, SMCP ve operasyonel Maritime English",
    modules: [
      { id: "com-gmdss", title: "GMDSS Sistemi ve Deniz Alanları", description: "GMDSS mimarisi, A1–A4 deniz alanları ve taşıma gereklilikleri", keywords: ["gmdss", "deniz alan", "a1", "a2", "a3", "a4"], level: "foundation" },
      { id: "com-radio-dsc", title: "VHF, MF/HF ve DSC", description: "Telsiz cihazları, DSC çağrıları, kanal ve frekans kullanımı", keywords: ["vhf", "mf", "hf", "dsc", "frekans", "kanal"], level: "operational" },
      { id: "com-distress", title: "Distress, Urgency ve Safety Haberleşmesi", description: "MAYDAY, PAN-PAN, SÉCURITÉ, relay ve SAR koordinasyonu", keywords: ["distress", "mayday", "pan-pan", "securite", "urgency", "safety", "sar"], level: "operational" },
      { id: "com-equipment", title: "EPIRB, SART, NAVTEX ve Uydu Sistemleri", description: "Arama-kurtarma cihazları, MSI ve uydu haberleşmesi", keywords: ["epirb", "sart", "navtex", "inmarsat", "uydu"], level: "operational" },
      { id: "com-smcp", title: "SMCP ve Operasyonel Maritime English", description: "Köprüüstü, pilot, römorkör, VTS, terminal ve acil durum İngilizcesi", keywords: ["smcp", "maritime english", "operasyonel", "köprüüstü iletişim", "vts", "pilot ve römorkör", "acil durum ingilizcesi"], level: "operational" },
      { id: "com-records", title: "Radyo Kayıtları ve Profesyonel Raporlama", description: "GMDSS log, logbook, statement, defect report ve denetim iletişimi", keywords: ["log", "statement", "rapor", "kayıt", "psc", "surveyor"], level: "advanced" },
    ],
  },
  {
    key: "stability",
    title: "Stabilite",
    subtitle: "Enine-boyuna stabilite, yükleme durumu, tekne kuvvetleri ve hasarlı stabilite",
    modules: [],
  },
  {
    key: "cargo",
    title: "Cargo Handling and Stowage",
    subtitle: "Kuru yük, tanker, konteyner, özel yük, cargo-care ve liman belgeleri",
    modules: [
      { id: "cargo-foundations", title: "Yük Planlamasının Temelleri", description: "Stowage factor, broken stowage, kapasite, dağılım, draft, trim ve stress", keywords: ["istif faktörü", "broken stowage", "yük planı", "ağırlık dağılım", "draft survey"], level: "foundation" },
      { id: "cargo-bulk-grain", title: "Kuru Dökme Yük ve Tahıl", description: "IMSBC, liquefaction, kömür, konsantreler ve Grain Code", keywords: ["imsbc", "dökme", "bulk", "tahıl", "grain", "liquefaction", "kömür"], level: "operational" },
      { id: "cargo-container-dangerous", title: "Konteyner, Bağlama ve Tehlikeli Yük", description: "Bay plan, CSS, IMDG, lashing, reefer ve segregasyon", keywords: ["konteyner", "container", "css", "imdg", "tehlikeli", "dangerous"], level: "operational" },
      { id: "cargo-tanker", title: "Tanker Yük Operasyonları", description: "Petrol, kimyasal, LPG/LNG, inert gas, ESD ve tank cleaning", keywords: ["tankeri", "tanker", "lpg", "lng", "kimyasal", "petrol"], level: "advanced" },
      { id: "cargo-care-special", title: "Cargo Care ve Özel Yükler", description: "Terleme, havalandırma, fumigation, steel, timber, heavy lift ve Ro-Ro", keywords: ["cargo care", "terleme", "havalandır", "çelik", "kereste", "ağır yük", "ro-ro", "fumigation"], level: "operational" },
      { id: "cargo-documents", title: "Yük Belgeleri, Protesto ve Hasar Yönetimi", description: "Mate’s Receipt, B/L remarks, SOF, Letter of Protest, stevedore ve P&I", keywords: ["belge", "protesto", "hasar", "mate", "bill of lading", "statement of facts"], level: "advanced" },
    ],
  },
  {
    key: "safety",
    title: "Denizde Güvenlik",
    subtitle: "Yangın, terk, kurtarma, iş emniyeti, tıbbi yardım, security ve hasar kontrolü",
    modules: [
      { id: "safety-governance", title: "SOLAS, ISM, Sertifikalar ve Denetimler", description: "Emniyet mevzuatı, SMS, survey, sertifikalar, PSC ve raporlama", keywords: ["solas", "ism", "sertifika", "psc", "sörvey", "survey", "emniyet yönetimi"], level: "foundation" },
      { id: "safety-lsa", title: "Can Kurtarma Araçları ve Gemiyi Terk", description: "LSA, kişisel donanım, filika, sal, rescue boat ve abandon ship", keywords: ["can kurtarma", "lsa", "filika", "can sal", "can yele", "immersion", "terk"], level: "operational" },
      { id: "safety-fire", title: "Yangın Önleme ve Mücadele", description: "Yapısal koruma, algılama, sabit sistemler, söndürücüler, BA ve komuta", keywords: ["yangın", "fire", "co₂", "söndür", "scba", "eeBD"], level: "operational" },
      { id: "safety-occupational", title: "İş Emniyeti ve Kapalı Mahaller", description: "Risk assessment, permit to work, PPE, enclosed space ve kurtarma", keywords: ["iş emniyeti", "kapalı mahal", "enclosed", "ppe", "kkd", "risk değerlend", "permit"], level: "operational" },
      { id: "safety-medical", title: "Gemide Tıbbi İlk Yardım ve TMAS", description: "ABCDE, CPR/AED, travma, maruziyet, hipotermi, TMAS ve tahliye", keywords: ["tıbbi", "ilk yardım", "tmas", "medical", "cpr", "aed"], level: "operational" },
      { id: "safety-security", title: "Gemi Güvenliği, ISPS ve Siber Riskler", description: "Security levels, erişim, SSAS, korsanlık, citadel ve siber olaylar", keywords: ["isps", "gemi güvenliği", "korsan", "citadel", "ssas", "siber"], level: "advanced" },
      { id: "safety-emergency-damage", title: "Acil Durum ve Hasar Kontrolü", description: "Çatışma, karaya oturma, flooding, yara savunma, komuta ve delil", keywords: ["acil durum", "çatışma sonrası", "karaya oturma", "flooding", "hasar kontrol", "yara savunma", "delil"], level: "advanced" },
    ],
  },
  {
    key: "environment",
    title: "Denizcilik ve Çevre Koruma",
    subtitle: "Kirliliğin önlenmesi, atık, emisyon, balast suyu ve çevre kayıtları",
    modules: [
      { id: "env-framework", title: "MARPOL ve Çevre Uyum Sistemi", description: "MARPOL yapısı, sorumluluk, denetim ve kayıt ilkeleri", keywords: ["marpol", "çevre", "uyum"], level: "foundation" },
      { id: "env-oil-chemicals", title: "Petrol ve Kimyasal Kirliliği", description: "Annex I–II, OWS/ODME, SOPEP/SMPEP ve NLS", keywords: ["annex i", "annex ii", "petrol", "yağ", "kimyasal", "odme", "ows", "sopep"], level: "operational" },
      { id: "env-sewage-garbage", title: "Pis Su, Çöp ve Atık Yönetimi", description: "Annex IV–V, sewage, garbage, plastics ve kayıt kitapları", keywords: ["pis su", "sewage", "çöp", "garbage", "atık", "annex iv", "annex v"], level: "operational" },
      { id: "env-air-efficiency", title: "Hava Kirliliği ve Enerji Verimliliği", description: "Annex VI, SOx/NOx, fuel sulphur, CII, EEXI ve SEEMP", keywords: ["annex vi", "emisyon", "sox", "nox", "cii", "eexi", "seemp", "hava kirliliği"], level: "advanced" },
      { id: "env-bwm-biofouling", title: "Balast Suyu, AFS ve Biofouling", description: "BWM, ballast exchange/treatment, antifouling ve biyolojik taşınım", keywords: ["balast suyu", "bwm", "biofouling", "antifouling", "afs"], level: "operational" },
    ],
  },
  {
    key: "seamanship",
    title: "Gemicilik",
    subtitle: "Halatlar, demirleme, bağlama, römorkör, manevra, güverte bakımı ve gemi yapısı",
    modules: [
      { id: "seamanship-ropes", title: "Halatlar, Düğümler ve Güverte Donanımı", description: "Halat yapısı, SWL, düğümler, sapanlar ve güvenli kullanım", keywords: ["halat", "düğüm", "rope", "wire", "sapan"], level: "foundation" },
      { id: "seamanship-anchoring", title: "Demirleme ve Demir Vardiyası", description: "Demir donanımı, planlama, walk back/let go, swing, drag ve ağır hava", keywords: ["demir", "anchor"], level: "operational" },
      { id: "seamanship-mooring", title: "Bağlama ve Mooring Line Management", description: "Mooring arrangement, winch/brake, SDMBL, halat yönetimi ve snap-back", keywords: ["mooring", "bağlama", "palamar", "snap-back", "sdmbl"], level: "operational" },
      { id: "seamanship-towing-pilot", title: "Römorkör, Çekme ve Pilot Transferi", description: "Towing, tug assistance, pilot ladder, transfer ve gemi-kara koordinasyonu", keywords: ["römork", "towing", "pilot transfer", "pilot merdiv", "çarmıh"], level: "operational" },
      { id: "seamanship-manoeuvring", title: "Gemi Manevrası ve Pervane Etkileri", description: "Pivot point, transverse thrust, yanaşma, sığ su, interaction ve MOB dönüşleri", keywords: ["manevra", "pervane", "pivot", "mob dönüş", "sığ su", "bank effect", "ship interaction"], level: "advanced" },
      { id: "seamanship-deck-maintenance", title: "Güverte Bakımı ve Sızdırmazlık", description: "Korozyon, boya, hatch cover, kapılar, watertight/weathertight ve Load Line", keywords: ["bakım", "korozyon", "boya", "ambar kapa", "hatch", "sızdırmaz", "load line"], level: "operational" },
      { id: "seamanship-construction", title: "Gemi Yapısı ve Tekne Mukavemeti", description: "Yapısal elemanlar, longitudinal strength, point load, çatlak ve survey", keywords: ["gemi yapısı", "tekne mukavemet", "hogging", "sagging", "point load", "yapısal"], level: "advanced" },
    ],
  },
  {
    key: "economics",
    title: "Deniz İşletmeciliğinde Ticari Operasyonlar",
    subtitle: "Charter party, navlun, laytime, sefer ekonomisi, sigorta ve ticari belgeler",
    modules: [
      { id: "econ-chartering", title: "Charter Party ve Taşıma Sözleşmeleri", description: "Voyage/time/bareboat charter, taraflar ve temel sözleşme hükümleri", keywords: ["charter", "sözleşme", "kiralama"], level: "foundation" },
      { id: "econ-freight-laytime", title: "Navlun, Laytime ve Demurrage", description: "Freight, NOR, laytime hesabı, demurrage/despatch ve SOF", keywords: ["navlun", "freight", "laytime", "demurrage", "despatch", "nor"], level: "operational" },
      { id: "econ-voyage", title: "Sefer Ekonomisi ve TCE", description: "Voyage estimation, bunker, hız-tüketim, liman masrafları ve TCE", keywords: ["tce", "sefer", "bunker", "maliyet", "voyage"], level: "operational" },
      { id: "econ-documents", title: "Konşimento ve Ticari Belgeler", description: "Bill of Lading, Mate’s Receipt, manifest, teslim ve belge zinciri", keywords: ["bill of lading", "konşimento", "mate", "belge", "manifest"], level: "operational" },
      { id: "econ-insurance", title: "Deniz Sigortası, P&I ve General Average", description: "Hull and machinery, P&I, cargo claims, salvage ve müşterek avarya", keywords: ["sigorta", "insurance", "p&i", "general average", "avarya", "salvage"], level: "advanced" },
    ],
  },
];

const makeTopicRef = (
  category: string,
  sourceTitle: string,
  level: CurriculumLevel,
  idPrefix = category,
): CurriculumTopicRef => {
  const title = canonicalDeckTitle(category, sourceTitle);
  const aliases = Object.entries(curriculumTopicAliases[category] ?? {})
    .filter(([, target]) => target === sourceTitle)
    .map(([alias]) => alias)
    .filter((alias) => alias !== title);
  return {
    id: `${idPrefix}-${curriculumSlug(title)}`,
    title,
    sourceCategory: category,
    sourceTitle,
    aliases: aliases.length ? aliases : undefined,
    level,
  };
};

const buildDeckCourse = (definition: DeckCourseDefinition): CurriculumCourse => {
  const allTitles = Object.keys(getTopicContentsByCategory(definition.key)).filter(
    (title) => title !== RUNNING_FIX_DEPRECATED,
  );
  const assigned = new Set<string>();
  const modules = definition.modules.map((rule) => {
    const matching = allTitles.filter((title) => {
      if (assigned.has(title) || !includesKeyword(title, rule.keywords)) return false;
      assigned.add(title);
      return true;
    });
    return {
      id: rule.id,
      title: rule.title,
      description: rule.description,
      topics: matching.map((title) => makeTopicRef(definition.key, title, rule.level ?? "operational")),
    };
  });
  const remaining = allTitles.filter((title) => !assigned.has(title));
  if (remaining.length) {
    modules.push({
      id: `${definition.key}-additional-topics`,
      title: "Tamamlayıcı Konular",
      description: "Ana modül sınıflandırmalarını tamamlayan uzmanlık ve referans konuları",
      topics: remaining.map((title) => makeTopicRef(definition.key, title, "operational")),
    });
  }
  return {
    id: `deck-${definition.key}`,
    key: definition.key,
    title: definition.title,
    subtitle: definition.subtitle,
    group: "deck",
    modules: modules.filter((module) => module.topics.length > 0),
  };
};

const buildStabilityCourse = (): CurriculumCourse => ({
  id: "deck-stability",
  key: "stability",
  title: "Stabilite",
  subtitle: "Enine-boyuna stabilite, yükleme durumu, tekne kuvvetleri ve hasarlı stabilite",
  group: "deck",
  modules: stabilityTopicsData.map((module, moduleIndex) => ({
    id: module.id || `stability-module-${moduleIndex + 1}`,
    title: module.title.replace(/^Bölüm\s*\d+\s*[–-]\s*/i, ""),
    description: module.description,
    topics: module.subtopics.map((topic, topicIndex) => ({
      id: topic.id || `stability-${curriculumSlug(topic.title)}-${topicIndex + 1}`,
      title: topic.title.replace(/^\d+(?:\.\d+)*\.?\s*/, ""),
      sourceCategory: "stability",
      sourceTitle: topic.title,
      level: moduleIndex < 2 ? "foundation" : moduleIndex < 6 ? "operational" : "advanced",
    })),
  })),
});

const machineCourseTitleOverrides: Record<string, string> = {
  maintenance: "Bakım, Arıza Teşhisi ve Güvenilirlik",
  "environment-machine": "Makine Dairesinde MARPOL ve Çevre Uyum",
  erm: "Makine Dairesi Kaynak Yönetimi — ERM",
};

const machineCourseSubtitles: Record<string, string> = {
  thermodynamics: "Isı, iş, enerji, çevrimler, ısı transferi ve gemi enerji sistemleri",
  "fluid-mechanics": "Akışkan statiği/dinamiği, boru kayıpları, pompalar ve gemi servis hatları",
  "machine-elements": "Malzemeler, mukavemet, şaft-yatak-dişli, kaynak, yorulma ve titreşim",
  "diesel-engines": "İki/dört zamanlı deniz motorları, yanma, performans, arızalar ve sevk operasyonu",
  "ship-systems": "Yakıt, yağlama, soğutma, starting air, egzoz ve makine yardımcı sistemleri",
  auxiliary: "Jeneratör, kazan, separatör, kompresör, evaporatör ve yardımcı makineler",
  "fuel-technology": "Deniz yakıtları, ISO 8217, arıtma, uyumluluk, bunkering ve changeover",
  "cooling-hvac": "Soğutma çevrimleri, refrigerantlar, provision plant, HVAC ve arıza teşhisi",
  electrical: "AC/DC dağıtım, alternatörler, koruma, blackout, acil güç ve yüksek gerilim",
  automation: "Sensörler, transmitterlar, PLC, alarm, PID, UMS ve otomasyon arızaları",
  "engine-room-ops": "Makine vardiyası, manevra hazırlığı, devreye alma, kayıt ve acil durumlar",
  maintenance: "PMS, condition monitoring, kök neden, yedek parça, survey ve dry-dock",
  "engine-room-safety": "Yangın, sıcak iş, LOTO, kapalı mahal, kimyasal ve makine dairesi acilleri",
  "environment-machine": "OWS, sludge, sewage, emisyon, scrubber, kayıtlar ve MARPOL denetimleri",
  erm: "Liderlik, vardiya yönetimi, kapalı döngü iletişim, yorgunluk ve insan faktörü",
  "energy-efficiency": "EEXI, CII, SEEMP, trim, hız-yakıt optimizasyonu ve atık ısı geri kazanımı",
};

const buildMachineCourses = (): CurriculumCourse[] =>
  machineTopics.map((machine) => {
    const lesson = machineTopicLessons[machine.slug];
    return {
      id: `machine-${machine.slug}`,
      key: `machine-${machine.slug}`,
      title: machineCourseTitleOverrides[machine.slug] ?? machine.title,
      subtitle: machineCourseSubtitles[machine.slug] ?? lesson?.description ?? machine.title,
      group: "machine",
      modules: (lesson?.keyTopics ?? []).map((module, moduleIndex) => ({
        id: `machine-${machine.slug}-${curriculumSlug(module.title)}`,
        title: module.title,
        description: module.description,
        topics: module.subTopics.map((topic, topicIndex) => ({
          id: `machine-${machine.slug}-${curriculumSlug(module.title)}-${curriculumSlug(topic.title)}-${topicIndex + 1}`,
          title: topic.title,
          sourceCategory: `machine-${machine.slug}`,
          sourceTitle: topic.title,
          level: moduleIndex < 2 ? "foundation" : moduleIndex < 5 ? "operational" : "advanced",
        })),
      })),
    };
  });

const deckCourses = DECK_COURSE_DEFINITIONS.map((definition) =>
  definition.key === "stability" ? buildStabilityCourse() : buildDeckCourse(definition),
);

export const curriculumCourses: CurriculumCourse[] = [...deckCourses, ...buildMachineCourses()];

const allTopicRefs = curriculumCourses.flatMap((course) =>
  course.modules.flatMap((module) => module.topics),
);

const makeTrack = (
  id: string,
  title: string,
  subtitle: string,
  keywords: string[],
): CompetencyTrack => ({
  id,
  title,
  subtitle,
  topicIds: allTopicRefs
    .filter((topic) => includesKeyword(`${topic.title} ${topic.sourceTitle}`, keywords))
    .map((topic) => topic.id),
});

export const competencyTracks: CompetencyTrack[] = [
  makeTrack("colreg", "Çatışmayı Önleme Kuralları — COLREG", "Kuralların senaryo, radar ve vardiya kararlarıyla bütünleşik öğrenimi", ["colreg", "çatışma", "fener", "dar kanal", "trafik ayırım", "kısıtlı görüş"]),
  makeTrack("bridge-watchkeeping-brm", "Köprüüstü Vardiyası ve BRM", "Vardiya devri, kaptanı çağırma, pilotaj ve insan faktörü", ["vardiya", "standing orders", "night orders", "brm", "master-pilot"]),
  makeTrack("manoeuvring-pilotage", "Gemi Manevrası, Pilotaj ve Römorkör", "Pervane etkileri, yanaşma, tug plan, pilot exchange ve abort kararları", ["manevra", "pervane", "römork", "pilotaj", "master-pilot", "yanaş"]),
  makeTrack("construction-damage-control", "Gemi Yapısı ve Hasar Kontrolü", "Tekne mukavemeti, flooding, çatışma, karaya oturma ve yara savunma", ["gemi yapısı", "tekne mukavemet", "flooding", "hasar kontrol", "karaya oturma", "çatışma sonrası"]),
  makeTrack("security-isps-cyber", "Gemi Güvenliği, ISPS ve Siber Riskler", "Kasıtlı tehdit, erişim, korsanlık, SSAS ve dijital dayanıklılık", ["isps", "gemi güvenliği", "korsan", "siber", "ssas"]),
  makeTrack("medical-first-aid", "Gemide Tıbbi İlk Yardım", "ABCDE, CPR/AED, travma, maruziyet, TMAS ve tahliye", ["tıbbi", "ilk yardım", "tmas", "medical"]),
  makeTrack("gmdss", "GMDSS ve Radyo Haberleşmesi", "Deniz alanları, DSC, distress, MSI ve arama-kurtarma cihazları", ["gmdss", "dsc", "mayday", "epirb", "sart", "navtex"]),
  makeTrack("maritime-english", "Denizcilik İngilizcesi ve Operasyonel İletişim", "SMCP, pilot, tug, VTS, terminal, acil durum ve profesyonel raporlama", ["smcp", "maritime english", "operasyonel", "acil durum ingilizcesi", "logbook", "statement"]),
  makeTrack("regulation-certification", "Mevzuat, Sertifikalar ve Denetimler", "SOLAS, ISM, MARPOL, klas, bayrak, PSC ve survey sistemi", ["solas", "ism", "marpol", "sertifika", "psc", "survey", "sörvey"]),
].filter((track) => track.topicIds.length > 0);

export const getCurriculumCourses = (group?: CurriculumGroup) =>
  group ? curriculumCourses.filter((course) => course.group === group) : curriculumCourses;

export const getCurriculumCourse = (key?: string) =>
  key ? curriculumCourses.find((course) => course.key === key || course.id === key) : undefined;

export const getCurriculumModules = (key?: string) => getCurriculumCourse(key)?.modules ?? [];

export const getCurriculumTopicRefs = (key?: string) =>
  getCurriculumModules(key).flatMap((module) => module.topics);

export const getCurriculumTopicById = (topicId?: string) =>
  topicId ? allTopicRefs.find((topic) => topic.id === topicId) : undefined;

export const resolveCurriculumTopic = (category?: string, titleOrId?: string) => {
  if (!category || !titleOrId) return undefined;
  const refs = getCurriculumTopicRefs(category);
  return refs.find(
    (topic) =>
      topic.id === titleOrId ||
      topic.title === titleOrId ||
      topic.sourceTitle === titleOrId ||
      topic.aliases?.includes(titleOrId),
  );
};
