import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  BookOpen,
  Brain,
  Calculator,
  CloudSun,
  Compass,
  Leaf,
  ListChecks,
  Package,
  Radio,
  Shield,
  Ship,
  Sigma,
  TrendingUp,
} from "lucide-react";
import { machineTopics } from "@/data/machineTopicData";

export type SectionId = "calculations" | "formulas" | "rules" | "assistant" | "quiz";

export type CategoryId =
  | "stability"
  | "navigation"
  | "cargo"
  | "meteorology"
  | "seamanship"
  | "safety"
  | "communication"
  | "environment"
  | "economics"
  | `machine-${string}`;

export type SectionStatus = "live" | "info" | "external" | "upcoming";

export interface SectionFallback {
  intro: string;
  highlights?: { title: string; detail: string }[];
  formulas?: { name: string; expression: string; note?: string }[];
  rules?: string[];
  assistantTips?: string[];
  quiz?: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  };
  links?: { label: string; href: string; description?: string }[];
}

export interface SectionConfig {
  id: SectionId;
  label: string;
  description: string;
  status?: SectionStatus;
  href?: string;
  badge?: string;
  ctaLabel?: string;
  fallback?: SectionFallback;
}

export interface CategoryConfig {
  id: CategoryId;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string;
  status?: SectionStatus;
  badge?: string;
  ctaLabel?: string;
  sections: SectionConfig[];
  group?: "deck" | "machine";
}

export const sectionIconMap: Record<SectionId, LucideIcon> = {
  calculations: Calculator,
  formulas: Sigma,
  rules: BookOpen,
  assistant: Brain,
  quiz: ListChecks,
};

type SectionDescriptions = Record<SectionId, string>;

type CategorySeed = Omit<CategoryConfig, "sections"> & {
  descriptions: SectionDescriptions;
  basePath: string;
  sectionOverrides?: Partial<Record<SectionId, Partial<SectionConfig>>>;
};

const SECTION_LABELS: Record<SectionId, string> = {
  calculations: "Hesaplamalar",
  formulas: "Formüller",
  rules: "Kurallar ve Standartlar",
  assistant: "AI Eğitmen",
  quiz: "Alıştırmalar",
};

const SECTION_IDS: SectionId[] = ["calculations", "formulas", "rules", "assistant", "quiz"];

const buildSections = (seed: CategorySeed): SectionConfig[] =>
  SECTION_IDS.map((id) => {
    const override = seed.sectionOverrides?.[id];
    return {
      id,
      label: SECTION_LABELS[id],
      description: seed.descriptions[id],
      status: "live",
      badge: "Hazır",
      href: `${seed.basePath}/${id}`,
      ...override,
    };
  });

const deckSeeds: CategorySeed[] = [
  {
    id: "stability",
    title: "Stabilite ve Yükleme Durumu",
    subtitle: "Enine-boyuna stabilite, yükleme durumu, tekne kuvvetleri ve hasarlı stabilite",
    icon: Ship,
    accent: "from-blue-500 via-indigo-500 to-blue-600",
    badge: "Çekirdek",
    status: "live",
    ctaLabel: "Stabilite derslerini aç",
    basePath: "/stability",
    descriptions: {
      calculations: "GZ, GM, ağırlık kaydırma, trim, FWA ve yükleme durumu araçları",
      formulas: "Stabilite, trim, serbest yüzey, SF/BM ve hasar hesaplarının formülleri",
      rules: "Intact Stability Code, SOLAS, Load Line ve gemiye özel limitler",
      assistant: "Yükleme durumu, tank yönetimi ve stabilite kararları için AI eğitmen",
      quiz: "Temel, operasyonel ve ileri stabilite senaryoları",
    },
    sectionOverrides: {
      calculations: { href: "/stability/calculations", ctaLabel: "Hesaplamaları aç" },
    },
  },
  {
    id: "navigation",
    title: "Seyir ve Sefer Planlama",
    subtitle: "Klasik, elektronik ve göksel seyir; mevki koyma, COLREG ve passage planning",
    icon: Compass,
    accent: "from-indigo-500 via-purple-500 to-blue-500",
    badge: "Güverte",
    status: "live",
    ctaLabel: "Seyir derslerini aç",
    basePath: "/navigation",
    descriptions: {
      calculations: "Rota, hız-mesafe-zaman, gelgit, akıntı, ETA, radar ve göksel seyir araçları",
      formulas: "Düzlem seyri, Mercator, akıntı üçgeni, radar ve astronomik seyir formülleri",
      rules: "COLREG, STCW vardiya standartları, passage planning ve seyir emniyeti",
      assistant: "Rota planı, köprüüstü vardiyası, radar/ECDIS ve manevra için AI eğitmen",
      quiz: "COLREG, harita çalışması, radar, ECDIS, göksel seyir ve BRM senaryoları",
    },
    sectionOverrides: {
      calculations: { href: "/navigation", ctaLabel: "Seyir araçlarını aç" },
    },
  },
  {
    id: "cargo",
    title: "Yük Operasyonları ve İstif",
    subtitle: "Kuru yük, tanker, konteyner, özel yük, cargo-care ve liman belgeleri",
    icon: Package,
    accent: "from-amber-500 via-orange-500 to-rose-500",
    badge: "Operasyon",
    status: "live",
    ctaLabel: "Yük operasyonlarını aç",
    basePath: "/cargo",
    descriptions: {
      calculations: "Draft survey, yük dağılımı, trim, stress, kapasite ve tanker miktar hesapları",
      formulas: "Draft survey, stowage factor, grain, SF/BM ve yük operasyonu formülleri",
      rules: "IMSBC, Grain, CSS, IMDG, IBC/IGC ve terminal emniyet gereklilikleri",
      assistant: "Yük planı, cargo care, tanker, belge ve hasar yönetimi için AI eğitmen",
      quiz: "Kuru yük, tanker, konteyner, özel yük ve belge senaryoları",
    },
  },
  {
    id: "meteorology",
    title: "Deniz Meteorolojisi ve Hava Yönetimi",
    subtitle: "Atmosfer, hava sistemleri, deniz durumu, tahmin ve ağır hava kararları",
    icon: CloudSun,
    accent: "from-sky-500 via-cyan-500 to-blue-500",
    badge: "Hava",
    status: "live",
    ctaLabel: "Meteoroloji derslerini aç",
    basePath: "/meteorology",
    descriptions: {
      calculations: "Rüzgâr, dalga, basınç, bağıl nem, rota meteorolojisi ve fırtına seyri",
      formulas: "Atmosfer, rüzgâr, dalga, görüş ve tropikal siklon hesapları",
      rules: "SOLAS V/34, STCW VIII/2, WMO yayınları ve ağır hava prosedürleri",
      assistant: "Hava haritası, GRIB, weather routing ve operasyon kararı için AI eğitmen",
      quiz: "Basınç sistemleri, cepheler, Beaufort, dalga, sis ve ağır hava soruları",
    },
    sectionOverrides: {
      calculations: { href: "/meteorology/topics", badge: "Yeni" },
    },
  },
  {
    id: "seamanship",
    title: "Gemicilik ve Güverte Operasyonları",
    subtitle: "Halatlar, demirleme, bağlama, römorkör, manevra, bakım ve gemi yapısı",
    icon: Anchor,
    accent: "from-emerald-500 via-teal-500 to-blue-500",
    badge: "Güverte",
    status: "live",
    ctaLabel: "Gemicilik derslerini aç",
    basePath: "/seamanship",
    descriptions: {
      calculations: "Palamar yükü, zincir katenary, römorkör kuvveti, rüzgâr alanı ve manevra",
      formulas: "Mooring, catenary, bollard pull, rüzgâr/akıntı ve tekne yükü eşitlikleri",
      rules: "Mooring Equipment Guidelines, pilot transferi, Load Line ve güverte emniyeti",
      assistant: "Demirleme, bağlama, römorkör, manevra ve bakım için AI eğitmen",
      quiz: "Halat, demir, mooring, pilot transferi, manevra ve gemi yapısı senaryoları",
    },
  },
  {
    id: "communication",
    title: "GMDSS ve Denizcilik İletişimi",
    subtitle: "Radyo haberleşmesi, distress prosedürleri, SMCP ve operasyonel Maritime English",
    icon: Radio,
    accent: "from-cyan-500 via-blue-500 to-indigo-500",
    badge: "Güverte",
    status: "live",
    ctaLabel: "Haberleşme derslerini aç",
    basePath: "/communication",
    descriptions: {
      calculations: "Radyo menzili, kanal/frekans planı ve çağrı önceliği senaryoları",
      formulas: "Frekans, dalga boyu, anten, güç ve propagation özetleri",
      rules: "GMDSS, SOLAS IV, ITU Radio Regulations, SMCP ve kayıt gereklilikleri",
      assistant: "VHF/DSC, distress, VTS, pilot, terminal ve raporlama için AI eğitmen",
      quiz: "DSC, MAYDAY, NAVTEX, EPIRB/SART, SMCP ve operasyonel iletişim soruları",
    },
    sectionOverrides: {
      calculations: { status: "info", badge: "Bilgi", href: undefined },
      formulas: { status: "info", badge: "Bilgi", href: undefined },
      rules: { status: "info", badge: "Bilgi", href: undefined },
      assistant: { href: "/communication/assistant" },
      quiz: { status: "info", badge: "Bilgi", href: undefined },
    },
  },
  {
    id: "safety",
    title: "Deniz Emniyeti ve Acil Durumlar",
    subtitle: "Yangın, terk, kurtarma, iş emniyeti, tıbbi yardım, security ve hasar kontrolü",
    icon: Shield,
    accent: "from-rose-500 via-orange-500 to-amber-500",
    badge: "Kritik",
    status: "live",
    ctaLabel: "Emniyet derslerini aç",
    basePath: "/safety",
    descriptions: {
      calculations: "Risk matrisi, yangın suyu/köpük/CO₂, tahliye ve hasar kontrol hesapları",
      formulas: "Yangın söndürme, stabilizasyon, risk ve acil durum hesaplarının özeti",
      rules: "SOLAS, LSA/FSS Code, ISM, ISPS, STCW ve iş emniyeti gereklilikleri",
      assistant: "Acil durum komutası, tıbbi ilk yardım, security ve denetim için AI eğitmen",
      quiz: "Yangın, terk, kapalı mahal, ilk yardım, ISPS, flooding ve kaza senaryoları",
    },
    sectionOverrides: {
      calculations: { href: "/safety" },
    },
  },
  {
    id: "environment",
    title: "MARPOL ve Deniz Çevresinin Korunması",
    subtitle: "Kirliliğin önlenmesi, atık, emisyon, balast suyu ve çevre kayıtları",
    icon: Leaf,
    accent: "from-emerald-600 via-green-600 to-teal-700",
    badge: "Çevre",
    status: "live",
    ctaLabel: "Çevre derslerini aç",
    basePath: "/environment",
    descriptions: {
      calculations: "CO₂/CO₂e, CII, EEXI, yakıt, atık, balast ve raporlama hesapları",
      formulas: "Emisyon, enerji verimliliği, tahliye ve çevre performansı formülleri",
      rules: "MARPOL I–VI, BWM, AFS, biofouling, IMO DCS ve bölgesel raporlama",
      assistant: "Kayıt kitapları, tahliye kararı, denetim ve çevre uygunsuzluğu için AI eğitmen",
      quiz: "MARPOL, atık, OWS/ODME, emisyon, balast ve biofouling soruları",
    },
  },
  {
    id: "economics",
    title: "Ticari Gemi Operasyonları",
    subtitle: "Charter party, navlun, laytime, sefer ekonomisi, sigorta ve ticari belgeler",
    icon: TrendingUp,
    accent: "from-amber-400 via-yellow-500 to-orange-600",
    badge: "Ticari",
    status: "live",
    ctaLabel: "Ticari operasyonları aç",
    basePath: "/economics",
    descriptions: {
      calculations: "TCE, voyage estimation, navlun, demurrage/despatch ve maliyet dökümleri",
      formulas: "Bunker, hız-yakıt eğrileri, laytime ve sefer ekonomisi formülleri",
      rules: "Charter party, Bill of Lading, Mate’s Receipt, sigorta ve talep yönetimi",
      assistant: "Charter, navlun, TCE, laytime, yük belgeleri ve P&I için AI eğitmen",
      quiz: "Charter türleri, laytime, demurrage, TCE, B/L ve sigorta senaryoları",
    },
    sectionOverrides: {
      calculations: { href: "/economics", ctaLabel: "Hesapla" },
      formulas: { status: "info", badge: "Özet", href: "/economics" },
      rules: { status: "info", badge: "Bilgi", href: "/economics" },
      assistant: { href: "/economics/assistant" },
      quiz: { href: "/economics/quiz" },
    },
  },
];

const machineSubtitles: Record<string, string> = {
  thermodynamics: "Isı, iş, enerji, çevrimler, ısı transferi ve gemi enerji sistemleri",
  "fluid-mechanics": "Akışkan statiği/dinamiği, boru kayıpları, pompalar ve gemi servis hatları",
  "machine-elements": "Malzemeler, mukavemet, şaft-yatak-dişli, kaynak, yorulma ve titreşim",
  "diesel-engines": "Deniz motorları, yanma, performans, arızalar ve sevk operasyonu",
  "ship-systems": "Yakıt, yağlama, soğutma, starting air, egzoz ve yardımcı sistemler",
  auxiliary: "Jeneratör, kazan, separatör, kompresör, evaporatör ve yardımcı makineler",
  "fuel-technology": "Yakıt özellikleri, ISO 8217, arıtma, bunkering ve fuel changeover",
  "cooling-hvac": "Soğutma çevrimleri, provision plant, HVAC ve arıza teşhisi",
  electrical: "Dağıtım, alternatörler, koruma, blackout, acil güç ve yüksek gerilim",
  automation: "Sensör, transmitter, PLC, alarm, PID, UMS ve otomasyon arızaları",
  "engine-room-ops": "Makine vardiyası, manevra hazırlığı, devreye alma ve acil durumlar",
  maintenance: "PMS, condition monitoring, kök neden, yedek parça, survey ve dry-dock",
  "engine-room-safety": "Yangın, sıcak iş, LOTO, kapalı mahal ve makine dairesi acilleri",
  "environment-machine": "OWS, sludge, sewage, emisyon, scrubber ve MARPOL kayıtları",
  erm: "Liderlik, vardiya yönetimi, iletişim, yorgunluk ve insan faktörü",
  "energy-efficiency": "EEXI, CII, SEEMP, trim, hız-yakıt ve atık ısı geri kazanımı",
};

const machineCategories: CategoryConfig[] = machineTopics.map((topic) => {
  const basePath = `/machine/${topic.slug}`;
  const seed: CategorySeed = {
    id: `machine-${topic.slug}`,
    title: topic.title,
    subtitle: machineSubtitles[topic.slug] ?? `${topic.title} teori ve operasyonları`,
    icon: topic.icon,
    accent: topic.accent,
    badge: "Makine",
    status: "live",
    ctaLabel: `${topic.title} derslerini aç`,
    group: "machine",
    basePath,
    descriptions: {
      calculations: `${topic.title} için mühendislik ve operasyon hesapları`,
      formulas: `${topic.title} temel denklemleri, değişkenleri ve uygulama sınırları`,
      rules: `${topic.title} için SOLAS, MARPOL, STCW, klas ve üretici gereklilikleri`,
      assistant: `${topic.title} operasyonu, bakım ve arıza teşhisi için AI eğitmen`,
      quiz: `${topic.title} teori, vardiya, arıza ve denetim senaryoları`,
    },
  };
  return { ...seed, sections: buildSections(seed) };
});

export const calculationCategories: CategoryConfig[] = [
  ...deckSeeds.map((seed) => ({ ...seed, sections: buildSections(seed) })),
  ...machineCategories,
];
