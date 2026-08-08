import type { LucideIcon } from "lucide-react";
import { calculationCategories } from "@/data/calculationCenterConfig";
import { getTopicContentsByCategory } from "@/data/topicContents";
import { stabilityTopicsData } from "@/data/stabilityTopicsContent";
import { getMachineSubTopicContent } from "@/data/machineTopicDetailContent";
import {
  getCurriculumSupplementTopic,
  getCurriculumSupplementTopicById,
  getCurriculumSupplementTopics,
  type CurriculumSupplementTopic,
} from "@/data/curriculumSupplementTopics";
import {
  getCurriculumCourse,
  getCurriculumModules,
  getCurriculumTopicById,
  getCurriculumTopicRefs,
  resolveCurriculumTopic,
  type CurriculumLevel,
} from "@/data/curriculumHierarchy";
import { getTopicRules } from "@/data/courseContent/rules";
import type { RuleGroup } from "@/data/courseContent/types";

/**
 * "Dersler Beta" birleşik içerik katmanı.
 *
 * Kaynak içerik şemaları değiştirilmeden tek bir okunabilir modele çevrilir.
 * Ders -> modül -> konu hiyerarşisi curriculumHierarchy tarafından sağlanır;
 * eski kategori anahtarları ve başlık tabanlı URL'ler geriye dönük uyumludur.
 */

export interface BetaSection {
  id?: string;
  title: string;
  /** Kaynak başlık; gösterim başlığından farklıysa lesson-flow uyumluluğu için korunur. */
  sourceTitle?: string;
  content: string;
  bulletPoints?: string[];
  formula?: { text: string; description?: string };
  image?: string;
  imageAlt?: string;
  example?: { problem: string; steps?: string[]; solution?: string; result?: string };
  table?: { headers: string[]; rows: string[][] };
}

export interface BetaTopic {
  id?: string;
  title: string;
  sourceTitle?: string;
  moduleId?: string;
  level?: CurriculumLevel;
  introduction?: string;
  sections: BetaSection[];
  keyPoints?: string[];
}

export interface BetaModule {
  id: string;
  title: string;
  description: string;
  topicCount: number;
  topics: Array<{
    id: string;
    title: string;
    sourceTitle: string;
    level: CurriculumLevel;
  }>;
}

export interface BetaCategory {
  /** calculationCategories id'si (örn. navigation, stability, machine-thermodynamics). */
  key: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string;
  group: "deck" | "machine";
  enabled: boolean;
  topicCount: number;
  moduleCount: number;
}

const DECK_CONTENT_KEYS = [
  "navigation",
  "meteorology",
  "communication",
  "stability",
  "cargo",
  "safety",
  "environment",
  "seamanship",
  "economics",
];

const isMachine = (key: string) => key.startsWith("machine-");
const machineSlug = (key: string) => key.slice("machine-".length);
const ruleRegistryKey = (key: string) => (isMachine(key) ? machineSlug(key) : key);

const displaySectionTitle = (title: string) =>
  title.trim().toLocaleLowerCase("tr-TR") === "detaylı anlatım"
    ? "Yöntem, Uygulama ve Operasyonel Değerlendirme"
    : title;

const makeSectionId = (topicId: string | undefined, index: number) =>
  topicId ? `${topicId}-section-${index + 1}` : undefined;

type RuleTopicCandidate = {
  id: string;
  title: string;
  sourceTitle: string;
  moduleTitle: string;
  moduleDescription: string;
};

export type RuleIntegrationAssignment = {
  categoryKey: string;
  group: RuleGroup;
  topicId: string;
  topicTitle: string;
};

const normalizeRuleMatch = (value: string) =>
  value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const RULE_MATCH_STOP_WORDS = new Set([
  "ve",
  "veya",
  "ile",
  "icin",
  "ilgili",
  "temel",
  "gemi",
  "gemiler",
  "gemilerde",
  "deniz",
  "denizcilik",
  "kural",
  "kurallar",
  "gereklilik",
  "gereklilikleri",
  "standart",
  "standartlari",
  "sistem",
  "sistemi",
  "yonetim",
  "yonetimi",
  "operasyon",
  "operasyonel",
  "uygulama",
  "uygulamasi",
]);

const ruleMatchTokens = (value: string) =>
  Array.from(
    new Set(
      normalizeRuleMatch(value)
        .split(" ")
        .filter((token) => token.length > 2 && !RULE_MATCH_STOP_WORDS.has(token)),
    ),
  );

/**
 * Alan bilgisi gerektiren veya yalnız sözcük benzerliğiyle yanlış konuya
 * düşebilecek gruplar için açık hedefler. Değerler konu başlığının tamamıdır;
 * id yerine başlık kullanılması içerik kaynakları yenilendiğinde bağlantıyı
 * korur. Diğer gruplar aşağıdaki ağırlıklı eşleştirme ile dağıtılır.
 */
const RULE_TOPIC_OVERRIDES: Record<string, Record<string, string>> = {
  stability: {
    "2008 IS Code — Hasarsız (Intakt) Stabilite": "IMO Intact Stability Code (2008 IS Code)",
    "International Grain Code — Tahıl Yükleri": "Tahıl Yükü Stabilitesi (Grain Stability)",
    "SOLAS II‑1 — Olasılıksal Hasar Stabilitesi": "SOLAS Hasarlı Stabilite Gereksinimleri",
    "Timber Deck Cargo Code — Güverte Tomruk": "Operasyonel Limitler ve Uygunluk Yönetimi",
    "IBC/IGC — Kimyasal ve Gaz Tankerleri": "Kritik Yükleme Durumları",
    "Polar Code — Kutup Suları Operasyonları": "Operasyonel Limitler ve Uygunluk Yönetimi",
    "CSS Code (Annex 13) — CSM Bağlama Hesaplarına Esas Sayılar": "Ağır Yükler ve Proje Kargoları",
    "Stockholm Agreement — Ro‑Ro Yolcu (Bölgesel Ek Şartlar)": "SOLAS Hasarlı Stabilite Gereksinimleri",
    "Balıkçı Gemileri — Güvenlik Kodu (2005/2012) ve Cape Town Agreement": "Operasyonel Limitler ve Uygunluk Yönetimi",
    "OSV / SPS — Offshore Supply ve Special Purpose Ships": "Operasyonel Limitler ve Uygunluk Yönetimi",
    "HSC Code — Yüksek Hızlı Tekneler": "Operasyonel Limitler ve Uygunluk Yönetimi",
    "MODU Code — Mobil Açık Deniz Üniteleri": "Operasyonel Limitler ve Uygunluk Yönetimi",
    "Load Line (LL) — Yükleme Sınırı Sözleşmesi Bağlantıları": "Deck Edge Immersion ve Downflooding Açısı",
  },
  navigation: {
    "COLREG — Denizde Çatışmayı Önleme Kuralları": "COLREG temel prensipleri",
    "Seyir Fenerleri ve İşaretler": "Seyir fenerleri: yay ve menzil",
    "IALA Deniz İşaretleri Sistemi": "Harita sembolleri ve kısaltmalar",
    "Tehlike ve Emniyet Sinyalleri": "Ses ve işaret kuralları (Kural 32-37)",
    "Seyir Planlama Kuralları": "Rota planlama",
    "Pusula ve Mevki Kuralları": "Mevki koyma",
  },
  cargo: {
    "IMSBC Kodu — Katı Dökme Yükler": "Katı Dökme Yükler ve IMSBC Code",
    "International Grain Code — Tahıl Yükleri": "Tahıl Yükleri ve Tahıl Stabilitesi",
    "IMDG Kodu — Tehlikeli Yükler": "Tehlikeli Yükler ve IMDG Code",
    "Yük Emniyeti — CSS Code & CSM": "Yük Bağlama ve Sıkıştırma (CSS Code)",
    "Tanker ve Terminal — ISGOTT": "Petrol Tankeri Yük Operasyonları",
    "Yük Artıkları — MARPOL": "Cargo Care, Terleme ve Ambar Havalandırması",
  },
  meteorology: {
    "SOLAS V — Seyir Planı ve Meteoroloji Servisleri": "SOLAS V tehlike mesajları ve hava raporlama",
    "IMO Weather Routing Guidelines": "Rüzgar/deniz tahmini çıkarımı",
    "STCW VIII/2 — Vardiya ve Hava Takibi": "SOLAS V tehlike mesajları ve hava raporlama",
    "MSI — NAVTEX, SafetyNET ve Uyarılar": "SOLAS V tehlike mesajları ve hava raporlama",
  },
  seamanship: {
    "COLREG Kısım B — Manevra Kuralları": "Manevra ve Gemi Hareketi",
    "COLREG Kısım C/D — Fenerler, Şekiller, Sesli İşaretler": "Köprüüstü Vardiyası ve Gözcülük",
    "Demirleme ve Bağlama — İyi Gemicilik": "Bağlama (Mooring) Operasyonları",
    "ISM Kodu — Güvenli İşletim": "Köprüüstü Vardiyası ve Gözcülük",
    "ISPS Kodu": "Köprüüstü Vardiyası ve Gözcülük",
    "Liman, VTS ve Pilotaj": "Pilot Transferi ve Pilot Merdiveni",
  },
  communication: {
    "GMDSS Deniz Alanları ve Taşıma Gereklilikleri": "GMDSS Mimarisi ve Deniz Alanları",
    "Tehlike, İvedi ve Güvenlik Muhabereleri": "Tehlike, Aciliyet ve Emniyet Haberleşmesi",
    "DSC, MSI ve NAVTEX": "NAVTEX, SafetyNET ve MSI",
    "EPIRB / SART, Telsiz Jurnali ve Yanlış Alarm": "EPIRB, SART ve Arama Kurtarma Entegrasyonu",
  },
  safety: {
    "SOLAS Bölüm II-2 — Yangın Güvenliği": "Yangın Önleme ve Yapısal Koruma",
    "SOLAS III & LSA — Can Kurtarma": "Can Kurtarma Araçları (LSA)",
    "ISM Kodu — Emniyetli İşletim": "SOLAS ve Emniyet Yönetimi (ISM)",
    "ISPS Kodu — Güvenlik": "ISPS, Gemi Güvenliği ve Korsanlık",
    "MLC 2006 — İş Sağlığı ve Güvenliği": "İş Sağlığı, Güvenliği ve KKD",
  },
  environment: {
    "MARPOL Annex VI - Hava Kirliliği": "MARPOL Ek VI — Hava Kirliliği ve Enerji Verimliliği",
    "BWM Convention - Balast Suyu": "Balast Suyu Yönetimi (BWM)",
    "MARPOL Annex I - Petrol Kirliliği": "MARPOL Ek I — Petrol Kirliliği",
    "MARPOL Annex V - Çöp": "MARPOL Ek V — Çöp (Garbage)",
    "IMO DCS ve Bölgesel MRV": "MARPOL Ek VI — Hava Kirliliği ve Enerji Verimliliği",
  },
  economics: {
    "Çarter Parti (Charter Party) Türleri": "Çarter Türleri ve Charter Party",
    "Laytime, Demuraj ve Despatch": "Laytime, Demurrage ve Despatch",
    "Notice of Readiness (NOR)": "Laytime, Demurrage ve Despatch",
    "Konişmento (Bill of Lading) ve Hague-Visby": "Konşimento ve Taşıma Belgeleri",
    "Incoterms 2020 Temelleri": "Konşimento ve Taşıma Belgeleri",
    "BIMCO Standart Formları": "Çarter Türleri ve Charter Party",
    "P&I ve H&M Sigortası Temelleri": "Deniz Sigortası ve Genel Avarya",
  },
  "machine-diesel-engines": {
    "MARPOL Annex VI – Emisyon": "Performans izleme ve trend analizi",
    "Üretici ve Klas Gereklilikleri": "Performans izleme ve trend analizi",
    "Krank Karteri ve Emniyet Tertibatı": "Biyel kolu ve krank mili",
  },
  "machine-machine-elements": {
    "Malzeme ve Yapı Standartları": "Denizcilik çelik standartları",
    "Şaft, Yatak ve Pervane": "Pervane şaftı boyutlandırma (IACS UR M68)",
    "Bağlantı Elemanları ve Muayene": "NDT (tahribatsız muayene) teknikleri",
  },
  "machine-ship-systems": {
    "Yakıt Sistemi Kuralları": "Hava tankları ve emniyet düzenlemeleri",
    "Yağlama ve Soğutma Sistemleri": "Stern tube yağlama ve sızdırmazlık",
    "Dümen Donanımı": "Dümen testleri ve SOLAS gereklilikleri",
  },
  "machine-cooling-hvac": {
    "Gıda Soğutma ve Hijyen": "Provizyon soğuk hane sistemi",
    "Klima ve Havalandırma (HVAC)": "Taze hava ve egzoz havalandırma",
  },
  "machine-automation": {
    "Otomasyon Standartları": "Gemi entegre otomasyon sistemi (IAS)",
    "İzleme ve Kontrol Sistemleri": "Alarm ve izleme sistemi (AMS)",
    "Siber Güvenlik (OT)": "Makine Otomasyonu ve OT Siber Güvenliği",
  },
  "machine-engine-room-ops": {
    "Operasyon Kuralları": "Makine vardiyası devir-teslim",
    "Çalışma ve Dinlenme Saatleri": "Makine vardiyası devir-teslim",
    "Manevra ve Köprü-Makine Koordinasyonu": "Köprüüstü-makine dairesi iletişim",
  },
  "machine-engine-room-safety": {
    "Makine Dairesi Güvenlik Kuralları": "Hızlı kapatma vanası (quick closing valve)",
    "Kapalı Alana Giriş": "Kapalı alan tanımı ve tehlikeler",
    "Sabit Söndürme Sistemleri (FSS)": "Makine dairesi sabit söndürme (CO₂, FM200)",
  },
  "machine-environment-machine": {
    "MARPOL – Makine İlgili Hükümler": "MARPOL sözleşmesi tarihçesi",
    "Enerji ve Emisyon İzleme": "CII (Karbon Yoğunluğu Göstergesi)",
    "Atık ve Madde Yönetimi": "Çöp yönetim planı (Garbage Management Plan)",
  },
  "machine-erm": {
    "ERM Kuralları ve Standartları": "STCW ERM gereklilikleri",
    "Takım Çalışması ve İletişim": "Kapalı döngü iletişim (closed-loop)",
    "Yorgunluk ve Karar Verme": "Stres ve yorgunluk etkisi",
  },
  "machine-energy-efficiency": {
    "Enerji Verimliliği Düzenlemeleri": "SEEMP (Gemi Enerji Verimliliği Yönetim Planı)",
    "EEXI / CII Uygulaması": "CII derecelendirme sistemi (A–E)",
    "Operasyonel Verimlilik": "Hız optimizasyonu (slow steaming)",
  },
};

const ruleAssignmentCache = new Map<string, RuleIntegrationAssignment[]>();

const getRuleTopicCandidates = (categoryKey: string): RuleTopicCandidate[] => {
  const modules = getCurriculumModules(categoryKey);
  const candidates = modules.flatMap((module) =>
    module.topics.map((topic) => ({
      id: topic.id,
      title: topic.title,
      sourceTitle: topic.sourceTitle,
      moduleTitle: module.title,
      moduleDescription: module.description,
    })),
  );

  for (const topic of getCurriculumSupplementTopics(categoryKey)) {
    const module = modules.find((item) => item.id === topic.moduleId);
    candidates.push({
      id: topic.id,
      title: topic.title,
      sourceTitle: topic.sourceTitle,
      moduleTitle: module?.title ?? "Tamamlayıcı Konular",
      moduleDescription: module?.description ?? "",
    });
  }

  return candidates;
};

const scoreRuleCandidate = (group: RuleGroup, candidate: RuleTopicCandidate) => {
  const title = normalizeRuleMatch(candidate.title);
  const sourceTitle = normalizeRuleMatch(candidate.sourceTitle);
  const moduleText = normalizeRuleMatch(
    `${candidate.moduleTitle} ${candidate.moduleDescription}`,
  );
  const groupTitle = normalizeRuleMatch(group.title);
  const groupTitleTokens = ruleMatchTokens(group.title);
  const subtitleTokens = ruleMatchTokens(group.rules.map((rule) => rule.subtitle).join(" "));
  const contentTokens = ruleMatchTokens(
    [group.source?.code, group.source?.detail, ...group.rules.flatMap((rule) => rule.content)]
      .filter(Boolean)
      .join(" "),
  );
  let score = 0;

  if (title === groupTitle || sourceTitle === groupTitle) score += 120;
  if (title.includes(groupTitle) || groupTitle.includes(title)) score += 35;

  for (const token of groupTitleTokens) {
    if (title.includes(token) || sourceTitle.includes(token)) score += 12;
    else if (moduleText.includes(token)) score += 4;
  }
  for (const token of subtitleTokens) {
    if (title.includes(token) || sourceTitle.includes(token)) score += 6;
    else if (moduleText.includes(token)) score += 2;
  }
  for (const token of contentTokens) {
    if (title.includes(token) || sourceTitle.includes(token)) score += 2;
  }

  return score;
};

/**
 * Her kural grubunu tek bir kanonik konuya bağlar. Bu fonksiyon doğrulama
 * betiği tarafından da kullanılır; böylece görünmeyen veya iki kez eklenen
 * kural grubu kalmaz.
 */
export function getRuleIntegrationAssignments(
  categoryKey?: string,
): RuleIntegrationAssignment[] {
  if (!categoryKey) return [];
  const cached = ruleAssignmentCache.get(categoryKey);
  if (cached) return cached;

  const groups = getTopicRules(ruleRegistryKey(categoryKey));
  const candidates = getRuleTopicCandidates(categoryKey);
  if (groups.length === 0 || candidates.length === 0) {
    ruleAssignmentCache.set(categoryKey, []);
    return [];
  }

  const overrides = RULE_TOPIC_OVERRIDES[categoryKey] ?? {};
  const assignments = groups.map((group) => {
    const targetTitle = overrides[group.title];
    const overridden = targetTitle
      ? candidates.find(
          (candidate) =>
            normalizeRuleMatch(candidate.title) === normalizeRuleMatch(targetTitle) ||
            normalizeRuleMatch(candidate.sourceTitle) === normalizeRuleMatch(targetTitle),
        )
      : undefined;
    const topic =
      overridden ??
      [...candidates].sort(
        (left, right) =>
          scoreRuleCandidate(group, right) - scoreRuleCandidate(group, left),
      )[0];

    return {
      categoryKey,
      group,
      topicId: topic.id,
      topicTitle: topic.title,
    };
  });

  ruleAssignmentCache.set(categoryKey, assignments);
  return assignments;
}

/**
 * Mevzuat maddelerini konu anlatımına bölüm olarak ekler.
 *
 * Kaynaktaki `rule.content` zaten madde listesidir; tek paragrafa birleştirmek
 * yerine `bulletPoints` olarak aktarılır. Grubun ilk bölümünde kaynak künyesi
 * gösterilir, künye yoksa dolgu metni yazılmaz.
 */
const integratedRuleSections = (
  topicId: string,
  assignments: RuleIntegrationAssignment[],
): BetaSection[] =>
  assignments.flatMap(({ group }, groupIndex) =>
    group.rules.map((rule, sectionIndex) => {
      const source = group.source
        ? [group.source.code, group.source.detail].filter(Boolean).join(" — ")
        : "";
      return {
        id: `${topicId}-integrated-standard-${groupIndex + 1}-${sectionIndex + 1}`,
        title: `${group.title} — ${rule.subtitle}`,
        sourceTitle: rule.subtitle,
        content: sectionIndex === 0 && source ? `Kaynak: ${source}` : "",
        bulletPoints: rule.content.map((item) => item.trim()).filter(Boolean),
      };
    }),
  );

const mergeRulesIntoTopic = (categoryKey: string, topic: BetaTopic): BetaTopic => {
  if (!topic.id) return topic;
  const assignments = getRuleIntegrationAssignments(categoryKey).filter(
    (assignment) => assignment.topicId === topic.id,
  );
  if (assignments.length === 0) return topic;

  return {
    ...topic,
    sections: [...topic.sections, ...integratedRuleSections(topic.id, assignments)],
  };
};

const mapSupplementTopic = (topic: CurriculumSupplementTopic): BetaTopic => ({
  id: topic.id,
  title: topic.title,
  sourceTitle: topic.sourceTitle,
  moduleId: topic.moduleId,
  level: topic.level,
  introduction: topic.introduction,
  sections: topic.sections.map((section, index) => ({
    id: makeSectionId(topic.id, index),
    title: section.title,
    sourceTitle: section.title,
    content: section.content,
    bulletPoints: section.bulletPoints,
  })),
  keyPoints: topic.keyPoints,
});

/**
 * Yeni arayüzlerin kullanacağı modül grupları.
 * Tamamlayıcı konular yalnız mevcut modüllere eklenir; eşleşmeyen bir modül
 * için yeni başlık oluşturulmaz.
 */
export function getBetaModules(key?: string): BetaModule[] {
  if (!key) return [];
  const supplements = getCurriculumSupplementTopics(key);

  return getCurriculumModules(key).map((module) => {
    const topics = [
      ...module.topics.map((topic) => ({
        id: topic.id,
        title: topic.title,
        sourceTitle: topic.sourceTitle,
        level: topic.level,
      })),
      ...supplements
        .filter((topic) => topic.moduleId === module.id)
        .map((topic) => ({
          id: topic.id,
          title: topic.title,
          sourceTitle: topic.sourceTitle,
          level: topic.level,
        })),
    ];

    return {
      id: module.id,
      title: module.title,
      description: module.description,
      topicCount: topics.length,
      topics,
    };
  });
}

/** Eski düz liste API'si korunur; artık tekrarları ayıklanmış kanonik başlıkları döndürür. */
export function getBetaTopicTitles(key?: string): string[] {
  if (!key) return [];
  return [
    ...getCurriculumTopicRefs(key).map((topic) => topic.title),
    ...getCurriculumSupplementTopics(key).map((topic) => topic.title),
  ];
}

/** URL ve ilerleme kaydı için başlıktan bağımsız, kararlı konu kimlikleri. */
export function getBetaTopicIds(key?: string): string[] {
  if (!key) return [];
  return [
    ...getCurriculumTopicRefs(key).map((topic) => topic.id),
    ...getCurriculumSupplementTopics(key).map((topic) => topic.id),
  ];
}

function mapMachineTopic(
  slug: string,
  sourceTitle: string,
  metadata?: ReturnType<typeof getCurriculumTopicById>,
): BetaTopic | null {
  const content = getMachineSubTopicContent(slug, sourceTitle);
  if (!content) return null;
  return {
    id: metadata?.id,
    title: metadata?.title ?? content.title,
    sourceTitle,
    moduleId: metadata
      ? getCurriculumModules(`machine-${slug}`).find((module) =>
          module.topics.some((topic) => topic.id === metadata.id),
        )?.id
      : undefined,
    level: metadata?.level,
    introduction: content.introduction,
    sections: content.sections.map((section, index) => ({
      id: makeSectionId(metadata?.id, index),
      title: displaySectionTitle(section.heading),
      sourceTitle: section.heading,
      content: section.paragraphs.join("\n\n"),
      bulletPoints: section.bulletPoints,
      formula: section.formula
        ? {
            text: section.formula.expression,
            description:
              section.formula.variables && section.formula.variables.length
                ? section.formula.variables.join(" · ")
                : undefined,
          }
        : undefined,
      image: section.diagram?.src,
      imageAlt: section.diagram?.alt,
      example: section.example
        ? {
            problem: section.example.problem,
            steps: section.example.steps,
            result: section.example.result,
          }
        : undefined,
      table: section.table,
    })),
    keyPoints: content.keyPoints,
  };
}

function mapStabilityTopic(
  sourceTitle: string,
  metadata?: ReturnType<typeof getCurriculumTopicById>,
): BetaTopic | null {
  for (const module of stabilityTopicsData) {
    const subtopic = module.subtopics.find((item) => item.title === sourceTitle);
    if (!subtopic) continue;
    const baseTitle = metadata?.title ?? subtopic.title.replace(/^\d+(?:\.\d+)*\.?\s*/, "");
    const sections: BetaSection[] = [
      {
        id: makeSectionId(metadata?.id, 0),
        title: baseTitle,
        sourceTitle: subtopic.title,
        content: subtopic.content,
        bulletPoints: [...(subtopic.practicalTips ?? []), ...(subtopic.warnings ?? [])],
      },
    ];
    const formulas = subtopic.formulas ?? [];
    formulas.forEach((formula, index) =>
      sections.push({
        id: makeSectionId(metadata?.id, sections.length),
        title: formulas.length > 1 ? `${baseTitle} — Formül ${index + 1}` : `${baseTitle} — Formül`,
        sourceTitle: formulas.length > 1 ? `Formül ${index + 1}` : "Formül",
        content: "",
        formula: { text: formula.formula, description: formula.description },
      }),
    );
    const examples = subtopic.examples ?? [];
    examples.forEach((example, index) =>
      sections.push({
        id: makeSectionId(metadata?.id, sections.length),
        title:
          examples.length > 1
            ? `${baseTitle} — Çözümlü Örnek ${index + 1}`
            : `${baseTitle} — Çözümlü Örnek`,
        sourceTitle: examples.length > 1 ? `Çözümlü Örnek ${index + 1}` : "Çözümlü Örnek",
        content: "",
        example: { problem: example.problem, solution: example.solution },
      }),
    );
    return {
      id: metadata?.id,
      title: baseTitle,
      sourceTitle,
      moduleId: module.id,
      level: metadata?.level,
      sections,
      keyPoints: subtopic.keyPoints,
    };
  }
  return null;
}

function mapDeckTopic(
  key: string,
  sourceTitle: string,
  metadata?: ReturnType<typeof getCurriculumTopicById>,
): BetaTopic | null {
  const topic = getTopicContentsByCategory(key)[sourceTitle];
  if (!topic) return null;
  const moduleId = metadata
    ? getCurriculumModules(key).find((module) =>
        module.topics.some((item) => item.id === metadata.id),
      )?.id
    : undefined;
  return {
    id: metadata?.id,
    title: metadata?.title ?? topic.title,
    sourceTitle,
    moduleId,
    level: metadata?.level,
    introduction: topic.introduction,
    sections: topic.sections.map((section, index) => ({
      id: makeSectionId(metadata?.id, index),
      title: displaySectionTitle(section.title),
      sourceTitle: section.title,
      content: section.content,
      bulletPoints: section.bulletPoints,
      formula: section.formula
        ? { text: section.formula.text, description: section.formula.description }
        : undefined,
      image: section.image,
      imageAlt: section.imageAlt,
    })),
    keyPoints: topic.keyPoints,
  };
}

/**
 * Başlık, eski başlık alias'ı veya sabit topic id kabul eder.
 * Böylece eski deep-link ve localStorage ilerleme kayıtları bozulmaz.
 */
export function getBetaTopic(key?: string, titleOrId?: string): BetaTopic | null {
  if (!key || !titleOrId) return null;

  const supplement = getCurriculumSupplementTopic(key, titleOrId);
  if (supplement) return mergeRulesIntoTopic(key, mapSupplementTopic(supplement));

  const metadata = getCurriculumTopicById(titleOrId) ?? resolveCurriculumTopic(key, titleOrId);
  const sourceTitle = metadata?.sourceTitle ?? titleOrId;
  const topic = isMachine(key)
    ? mapMachineTopic(machineSlug(key), sourceTitle, metadata)
    : key === "stability"
      ? mapStabilityTopic(sourceTitle, metadata)
      : DECK_CONTENT_KEYS.includes(key)
        ? mapDeckTopic(key, sourceTitle, metadata)
        : null;

  return topic ? mergeRulesIntoTopic(key, topic) : null;
}

export function getBetaTopicById(topicId?: string): BetaTopic | null {
  const supplement = getCurriculumSupplementTopicById(topicId);
  if (supplement) {
    return mergeRulesIntoTopic(supplement.category, mapSupplementTopic(supplement));
  }

  const topic = getCurriculumTopicById(topicId);
  return topic ? getBetaTopic(topic.sourceCategory, topic.id) : null;
}

export function getBetaCategories(): BetaCategory[] {
  return calculationCategories.map((category) => {
    const key = category.id as string;
    const course = getCurriculumCourse(key);
    const group: "deck" | "machine" = isMachine(key) ? "machine" : "deck";
    const topicCount = getBetaTopicTitles(key).length;
    return {
      key,
      title: course?.title ?? category.title,
      subtitle: course?.subtitle ?? category.subtitle,
      icon: category.icon,
      accent: category.accent,
      group,
      enabled: topicCount > 0,
      topicCount,
      moduleCount: course?.modules.length ?? 0,
    };
  });
}

export const hasBetaContent = (key?: string): boolean => getBetaTopicTitles(key).length > 0;
