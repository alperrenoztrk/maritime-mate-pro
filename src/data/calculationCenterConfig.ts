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
  Wrench,
} from "lucide-react";
import { machineTopics } from "@/data/machineTopicData";

export type SectionId =
  | "calculations"
  | "formulas"
  | "rules"
  | "assistant"
  | "quiz";

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

// Machine topic descriptions for sections
const machineTopicDescriptions: Record<string, { calculations: string; formulas: string; rules: string; assistant: string; quiz: string }> = {
  thermodynamics: {
    calculations: "Carnot verimi, ısı transferi ve enerji dönüşüm hesapları",
    formulas: "Termodinamik kanunları, entropi ve entalpi formülleri",
    rules: "Basınçlı kaplar, kazan güvenliği ve ISM gereklilikleri",
    assistant: "Isı çevrimi analizi ve verim optimizasyonu danışmanı",
    quiz: "Termodinamik kanunları ve ısı çevrimi soruları",
  },
  "fluid-mechanics": {
    calculations: "Reynolds sayısı, basınç kaybı ve pompa gücü hesapları",
    formulas: "Bernoulli, Darcy-Weisbach ve süreklilik denklemleri",
    rules: "Boru sistemi standartları ve pompa seçim kriterleri",
    assistant: "Akışkan sistemleri tasarım ve arıza analizi danışmanı",
    quiz: "Akışkanlar mekaniği ve pompa soruları",
  },
  "machine-elements": {
    calculations: "Mil, yatak, dişli ve kaynak mukavemet hesapları",
    formulas: "Gerilme, yorulma ve güvenlik katsayısı formülleri",
    rules: "Malzeme sertifikasyonu ve klas gereklilikleri",
    assistant: "Malzeme seçimi ve arıza analizi danışmanı",
    quiz: "Makine elemanları ve malzeme bilgisi soruları",
  },
  "diesel-engines": {
    calculations: "SFOC, silindir basıncı ve güç hesapları",
    formulas: "Ortalama efektif basınç, kompresyon oranı formülleri",
    rules: "NOx Tier, EEDI ve makine performans standartları",
    assistant: "Dizel makine arıza teşhisi ve performans danışmanı",
    quiz: "İki/dört zamanlı motorlar ve yanma soruları",
  },
  "ship-systems": {
    calculations: "Yakıt, yağlama ve soğutma sistemi kapasite hesapları",
    formulas: "Isı dengesi, akış debisi ve basınç düşüm formülleri",
    rules: "SOLAS, klas ve bayrak devleti sistem gereklilikleri",
    assistant: "Sistem arızası analizi ve bakım planlaması danışmanı",
    quiz: "Gemi makine sistemleri ve hat şemaları soruları",
  },
  auxiliary: {
    calculations: "Jeneratör yük hesabı, separatör kapasitesi ve kazan buhar üretimi",
    formulas: "Güç faktörü, separasyon verimi ve buhar entalpisi formülleri",
    rules: "SOLAS II-1, klas kuralları ve periyodik bakım gereklilikleri",
    assistant: "Yardımcı makine arıza teşhisi ve optimizasyon danışmanı",
    quiz: "Jeneratör, kazan, separatör ve kompresör soruları",
  },
  "fuel-technology": {
    calculations: "Viskozite-sıcaklık, CCAI ve yakıt tüketimi hesapları",
    formulas: "Yakıt ısıl değer, viskozite ve uyumluluk formülleri",
    rules: "MARPOL Annex VI, ISO 8217 ve yakıt kalite standartları",
    assistant: "Yakıt sorunları teşhisi ve arıtma sistemi danışmanı",
    quiz: "HFO/MGO/LNG ve yakıt yönetimi soruları",
  },
  "cooling-hvac": {
    calculations: "Soğutma kapasitesi, COP ve ısı yükü hesapları",
    formulas: "Soğutma çevrimi, akışkan basınç-sıcaklık formülleri",
    rules: "Montreal Protokolü, F-Gaz ve HVAC güvenlik standartları",
    assistant: "Soğutma sistemi arıza teşhisi ve optimizasyon danışmanı",
    quiz: "Soğutma çevrimi, akışkanlar ve klima soruları",
  },
  electrical: {
    calculations: "Yük analizi, kısa devre akımı ve kablo boyutlandırma",
    formulas: "Ohm, güç üçgeni ve transformatör oranı formülleri",
    rules: "IEC 60092, klas elektrik kuralları ve SOLAS gereklilikleri",
    assistant: "Elektrik arızası teşhisi ve blackout analizi danışmanı",
    quiz: "AC/DC sistemler, koruma ve blackout soruları",
  },
  automation: {
    calculations: "PID parametre ayarı, sensör kalibrasyonu ve alarm eşikleri",
    formulas: "Kontrol teorisi, sinyal işleme ve ölçme hata formülleri",
    rules: "Sınıflandırma kuruluşu otomasyon ve UMS gereklilikleri",
    assistant: "Otomasyon sistemi arıza teşhisi ve ayarlama danışmanı",
    quiz: "PLC, sensörler ve alarm sistemi soruları",
  },
  "engine-room-ops": {
    calculations: "Vardiya planlaması, devreye alma süreleri ve kontrol listeleri",
    formulas: "Performans izleme ve trend analizi formülleri",
    rules: "STCW, ISM ve vardiya tutma gereklilikleri",
    assistant: "Makine dairesi operasyonları ve prosedür danışmanı",
    quiz: "Vardiya, seyir/liman ve acil durum prosedür soruları",
  },
  maintenance: {
    calculations: "Bakım aralıkları, yağ analiz değerlendirmesi ve maliyet hesapları",
    formulas: "MTBF, MTTR ve güvenilirlik formülleri",
    rules: "ISM, klas periyodik survey ve PMS gereklilikleri",
    assistant: "Bakım planlama ve arıza önleme danışmanı",
    quiz: "Planlı bakım, yağ analizi ve klas soruları",
  },
  "engine-room-safety": {
    calculations: "Yangın söndürme kapasitesi ve havalandırma hesapları",
    formulas: "CO₂ miktarı, köpük oranı ve kaçış süresi formülleri",
    rules: "SOLAS II-2, FSS Code ve makine dairesi güvenlik kuralları",
    assistant: "Makine dairesi güvenlik analizi ve acil durum danışmanı",
    quiz: "Makine dairesi yangını, acil durdurma ve güvenlik soruları",
  },
  "environment-machine": {
    calculations: "Sintine suyu, sludge ve emisyon hesapları",
    formulas: "OWS verim, NOx/SOx dönüşüm ve atık su formülleri",
    rules: "MARPOL Annex I/IV/VI ve BWM Convention gereklilikleri",
    assistant: "Çevre uyumu ve denetim hazırlığı danışmanı",
    quiz: "MARPOL, OWS, scrubber ve emisyon soruları",
  },
  erm: {
    calculations: "Risk matrisi, iş yükü analizi ve CRM değerlendirmesi",
    formulas: "İnsan hatası olasılık ve risk skoru formülleri",
    rules: "STCW, ISM ve MLC insan faktörü gereklilikleri",
    assistant: "Vardiya yönetimi ve ekip kaynak yönetimi danışmanı",
    quiz: "ERM, insan faktörü ve liderlik soruları",
  },
  "energy-efficiency": {
    calculations: "EEDI, EEXI, CII ve atık ısı geri kazanım hesapları",
    formulas: "Yakıt tasarrufu, trim optimizasyonu ve verim formülleri",
    rules: "MEPC kuralları, SEEMP ve DCS raporlama gereklilikleri",
    assistant: "Enerji verimliliği analizi ve optimizasyon danışmanı",
    quiz: "EEDI, CII, SEEMP ve enerji yönetimi soruları",
  },
};

// Generate machine topic categories
const machineCategories: CategoryConfig[] = machineTopics.map((topic) => {
  const desc = machineTopicDescriptions[topic.slug] || {
    calculations: `${topic.title} hesaplamaları`,
    formulas: `${topic.title} formülleri`,
    rules: `${topic.title} kuralları`,
    assistant: `${topic.title} danışmanı`,
    quiz: `${topic.title} soruları`,
  };
  return {
    id: `machine-${topic.slug}` as CategoryId,
    title: topic.title,
    subtitle: "",
    icon: topic.icon,
    accent: topic.accent,
    badge: "Makine",
    status: "live" as SectionStatus,
    group: "machine" as const,
    sections: [
      {
        id: "calculations" as SectionId,
        label: "Hesaplamalar",
        description: desc.calculations,
        status: "live" as SectionStatus,
        badge: "Hazır",
        href: `/machine/${topic.slug}/calculations`,
      },
      {
        id: "formulas" as SectionId,
        label: "Formüller",
        description: desc.formulas,
        status: "live" as SectionStatus,
        badge: "Hazır",
        href: `/machine/${topic.slug}/formulas`,
      },
      {
        id: "rules" as SectionId,
        label: "Kurallar",
        description: desc.rules,
        status: "live" as SectionStatus,
        badge: "Hazır",
        href: `/machine/${topic.slug}/rules`,
      },
      {
        id: "assistant" as SectionId,
        label: "Asistan",
        description: desc.assistant,
        status: "live" as SectionStatus,
        badge: "Hazır",
        href: `/machine/${topic.slug}/assistant`,
      },
      {
        id: "quiz" as SectionId,
        label: "Quiz",
        description: desc.quiz,
        status: "live" as SectionStatus,
        badge: "Hazır",
        href: `/machine/${topic.slug}/quiz`,
      },
    ],
  };
});

export const calculationCategories: CategoryConfig[] = [
  {
    id: "stability",
    title: "Stabilite",
    subtitle: "",
    icon: Ship,
    accent: "from-blue-500 via-indigo-500 to-blue-600",
    badge: "Çekirdek",
    status: "live",
    ctaLabel: "Stabilite merkezine git",
    sections: [
      {
        id: "calculations",
        label: "Hesaplamalar",
        description: "GZ, GM, ağırlık kaydırma ve FWA araçları",
        status: "live",
        badge: "Hazır",
        ctaLabel: "Hesaplamaları aç",
        href: "/stability/calculations",
      },
      {
        id: "formulas",
        label: "Formüller",
        description: "Tüm stabilite formülleri ve açıklamaları",
        status: "live",
        badge: "Hazır",
        href: "/stability/formulas",
      },
      {
        id: "rules",
        label: "Kurallar",
        description: "IMO, IS Code ve klas limitleri",
        status: "live",
        badge: "Hazır",
        href: "/stability/rules",
      },
      {
        id: "assistant",
        label: "Asistan",
        description: "Stabilite danışmanı ve operasyonel öneriler",
        status: "live",
        badge: "Hazır",
        href: "/stability/assistant",
      },
      {
        id: "quiz",
        label: "Quiz",
        description: "Sınav soruları ve anlık geri bildirimler",
        status: "live",
        badge: "Hazır",
        href: "/stability/quiz",
      },
    ],
  },
  {
    id: "navigation",
    title: "Seyir",
    subtitle: "",
    icon: Compass,
    accent: "from-indigo-500 via-purple-500 to-blue-500",
    badge: "Günlük",
    status: "live",
    ctaLabel: "Seyir merkezine git",
    sections: [
      {
        id: "calculations",
        label: "Hesaplamalar",
        description: "Rota, ETA, yakıt ve gök cisimleri",
        status: "live",
        badge: "Hazır",
        ctaLabel: "Navigasyon araçları",
        href: "/navigation",
      },
      {
        id: "formulas",
        label: "Formüller",
        description: "Trigonometrik ve astronomik hesap tabloları",
        status: "live",
        badge: "Hazır",
        href: "/navigation/formulas",
      },
      {
        id: "rules",
        label: "Kurallar",
        description: "COLREG, STCW ve seyir jeneralleri",
        status: "live",
        badge: "Hazır",
        href: "/navigation/rules",
      },
      {
        id: "assistant",
        label: "Asistan",
        description: "Seyir planı, meteoroloji ve VTS diyaloğu",
        status: "live",
        badge: "Hazır",
        href: "/navigation/assistant",
      },
      {
        id: "quiz",
        label: "Quiz",
        description: "COLREG, seyir astronomisi ve radar testleri",
        status: "live",
        badge: "Hazır",
        href: "/navigation/quiz",
      },
    ],
  },
  {
    id: "cargo",
    title: "Yük Elleçleme ve İstifleme",
    subtitle: "",
    icon: Package,
    accent: "from-amber-500 via-orange-500 to-rose-500",
    badge: "Operasyon",
    status: "live",
    ctaLabel: "Kargo menüsü",
    sections: [
      {
        id: "calculations",
        label: "Hesaplamalar",
        description: "Draft survey ve yükleme hesap modülleri",
        status: "live",
        badge: "Hazır",
        href: "/cargo/calculations",
      },
      {
        id: "formulas",
        label: "Formüller",
        description: "Standart draft survey formülleri ve örnekler",
        status: "live",
        badge: "Hazır",
        href: "/cargo/formulas",
      },
      {
        id: "rules",
        label: "Kurallar",
        description: "IMSBC, Grain Rules ve terminal prosedürleri",
        status: "live",
        badge: "Hazır",
        href: "/cargo/rules",
      },
      {
        id: "assistant",
        label: "Asistan",
        description: "Yükleme sırası ve trim için operasyonel danışmanlık",
        status: "live",
        badge: "Hazır",
        href: "/cargo/assistant",
      },
      {
        id: "quiz",
        label: "Quiz",
        description: "Draft survey ve yük hesap soruları",
        status: "live",
        badge: "Hazır",
        href: "/cargo/quiz",
      },
    ],
  },
  {
    id: "meteorology",
    title: "Meteoroloji",
    subtitle: "",
    icon: CloudSun,
    accent: "from-sky-500 via-cyan-500 to-blue-500",
    badge: "Hava",
    status: "live",
    ctaLabel: "Meteoroloji menüsü",
    sections: [
      {
        id: "calculations",
        label: "Konu Anlatımı",
        description: "Deniz meteorolojisi ve fırtına seyri konu içerikleri",
        status: "live",
        badge: "Yeni",
        href: "/meteorology/topics",
      },
      {
        id: "formulas",
        label: "Formüller",
        description: "Rüzgâr, dalga ve atmosfer denklemleri",
        status: "live",
        badge: "Hazır",
        href: "/meteorology/formulas",
      },
      {
        id: "rules",
        label: "Kurallar",
        description: "SOLAS V/34, STCW VIII/2 ve WMO prosedürleri",
        status: "live",
        badge: "Hazır",
        href: "/meteorology/rules",
      },
      {
        id: "assistant",
        label: "Asistan",
        description: "Rota bazlı hava tavsiyeleri ve alarm eşikleri",
        status: "live",
        badge: "Hazır",
        href: "/meteorology/assistant",
      },
      {
        id: "quiz",
        label: "Quiz",
        description: "Beaufort, bulut türleri ve storm-avoidance soruları",
        status: "live",
        badge: "Hazır",
        href: "/meteorology/quiz",
      },
    ],
  },
  {
    id: "seamanship",
    title: "Gemicilik",
    subtitle: "",
    icon: Anchor,
    accent: "from-emerald-500 via-teal-500 to-blue-500",
    badge: "Güverte",
    status: "live",
    ctaLabel: "Gemicilik menüsü",
    sections: [
      {
        id: "calculations",
        label: "Hesaplamalar",
        description: "Palamar yükü, zincir katenary ve römorkör kuvvetleri",
        status: "live",
        badge: "Hazır",
        href: "/seamanship/calculations",
      },
      {
        id: "formulas",
        label: "Formüller",
        description: "Mooring, catenary ve rüzgâr yükü eşitlikleri",
        status: "live",
        badge: "Hazır",
        href: "/seamanship/formulas",
      },
      {
        id: "rules",
        label: "Kurallar",
        description: "COLREG, ISM, ISPS ve liman talimatları",
        status: "live",
        badge: "Hazır",
        href: "/seamanship/rules",
      },
      {
        id: "assistant",
        label: "Asistan",
        description: "Vardiya, bakım ve güvenlik için öneri setleri",
        status: "live",
        badge: "Hazır",
        href: "/seamanship/assistant",
      },
      {
        id: "quiz",
        label: "Quiz",
        description: "Demirleme, çarmıh ve vardiya senaryoları",
        status: "live",
        badge: "Hazır",
        href: "/seamanship/quiz",
      },
    ],
  },
  {
    id: "communication",
    title: "Denizde Haberleşme",
    subtitle: "",
    icon: Radio,
    accent: "from-cyan-500 via-blue-500 to-indigo-500",
    badge: "Güverte",
    status: "info",
    ctaLabel: "Haberleşme menüsü",
    sections: [
      {
        id: "calculations",
        label: "Hesaplamalar",
        description: "Kapsama, kanal planı ve çağrı önceliği senaryoları",
        status: "info",
        badge: "Plan",
      },
      {
        id: "formulas",
        label: "Formüller",
        description: "Frekans, dalga boyu ve anten verimi özetleri",
        status: "info",
        badge: "Plan",
      },
      {
        id: "rules",
        label: "Kurallar",
        description: "GMDSS, SOLAS IV ve ITU düzenlemeleri",
        status: "info",
        badge: "Bilgi",
      },
      {
        id: "assistant",
        label: "Asistan",
        description: "VHF/DSC çağrı metinleri ve acil durum akışı",
        status: "info",
        badge: "Plan",
      },
      {
        id: "quiz",
        label: "Quiz",
        description: "DSC, NAVTEX ve acil çağrı prosedürleri",
        status: "info",
        badge: "Plan",
      },
    ],
  },
  {
    id: "safety",
    title: "Denizde Güvenlik",
    subtitle: "",
    icon: Shield,
    accent: "from-rose-500 via-orange-500 to-amber-500",
    badge: "Kritik",
    status: "info",
    ctaLabel: "Emniyet menüsü",
    sections: [
      {
        id: "calculations",
        label: "Hesaplamalar",
        description: "Risk matrisi, yangın suyu ve kaçış süreleri",
        status: "live",
        badge: "Hazır",
        href: "/safety",
      },
      {
        id: "formulas",
        label: "Formüller",
        description: "Yangın söndürme, köpük ve CO2 miktar hesapları",
        status: "live",
        badge: "Hazır",
        href: "/safety/formulas",
      },
      {
        id: "rules",
        label: "Kurallar",
        description: "SOLAS, LSA, FFA ve ulusal otorite gereklilikleri",
        status: "live",
        badge: "Hazır",
        href: "/safety/rules",
      },
      {
        id: "assistant",
        label: "Asistan",
        description: "Risk değerlendirme ve denetim hazırlığı için danışman",
        status: "live",
        badge: "Hazır",
        href: "/safety/assistant",
      },
      {
        id: "quiz",
        label: "Quiz",
        description: "SOLAS, ISM ve emniyet prosedürü soruları",
        status: "live",
        badge: "Hazır",
        href: "/safety/quiz",
      },
    ],
  },
  // Machine topic categories (16 adet)
  ...machineCategories,
  {
    id: "environment",
    title: "Denizcilik ve Çevre Koruma",
    subtitle: "",
    icon: Leaf,
    accent: "from-emerald-600 via-green-600 to-teal-700",
    badge: "Yeşil",
    status: "live",
    ctaLabel: "Çevre menüsü",
    sections: [
      {
        id: "calculations",
        label: "Hesaplamalar",
        description: "CO₂/CO₂e, CII, EEXI ve raporlama hesapları",
        status: "live",
        badge: "Hazır",
        href: "/environment/calculations",
      },
      {
        id: "formulas",
        label: "Formüller",
        description: "Emisyon ve enerji verimliliği formülleri",
        status: "live",
        badge: "Hazır",
        href: "/environment/formulas",
      },
      {
        id: "rules",
        label: "Kurallar",
        description: "MARPOL, BWM, IMO DCS ve bölgesel raporlama",
        status: "live",
        badge: "Hazır",
        href: "/environment/rules",
      },
      {
        id: "assistant",
        label: "Asistan",
        description: "Denetim hazırlığı, kayıt kontrolü ve aksiyon önerileri",
        status: "live",
        badge: "Hazır",
        href: "/environment/assistant",
      },
      {
        id: "quiz",
        label: "Quiz",
        description: "MARPOL, atık ve balast yönetimi soru setleri",
        status: "live",
        badge: "Hazır",
        href: "/environment/quiz",
      },
    ],
  },
  {
    id: "economics",
    title: "Deniz İşletmeciliğinde Ticari Operasyonlar",
    subtitle: "",
    icon: TrendingUp,
    accent: "from-amber-400 via-yellow-500 to-orange-600",
    badge: "Finans",
    status: "info",
    ctaLabel: "Ekonomi araçları",
    sections: [
      {
        id: "calculations",
        label: "Hesaplamalar",
        description: "TCE, demurrage/despatch ve maliyet dökümleri",
        status: "live",
        badge: "Hazır",
        ctaLabel: "Hesapla",
        href: "/economics",
      },
      {
        id: "formulas",
        label: "Formüller",
        description: "Bunker, hız/yakıt eğrileri ve sefer planı",
        status: "info",
        badge: "Özet",
        href: "/economics",
      },
      {
        id: "rules",
        label: "Kurallar",
        description: "Charter party ve lojistik sözleşme kontrol listesi",
        status: "info",
        badge: "Bilgi",
        href: "/economics",
      },
    ],
  },
];
