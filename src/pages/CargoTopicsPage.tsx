import type { CSSProperties } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  ChevronRight,
  FileText,
  AlertTriangle,
  Anchor,
  Scale,
  Ship,
  Shield,
  Lightbulb,
  CheckCircle2,
  X,
  Boxes,
  BarChart3,
  Ruler,
  Settings,
  Thermometer,
  Droplets,
  Container,
  BookMarked,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useArticleBackGuard } from "@/hooks/useArticleBackGuard";
import { StructuredLessonText } from "@/components/lessons/StructuredLessonText";

interface CargoSubTopic {
  id: string;
  title: string;
  hasContent: boolean;
}

interface CargoMainTopic {
  id: string;
  number: number;
  title: string;
  icon: React.ElementType;
  subtopics: CargoSubTopic[];
}

const cargoTopics: CargoMainTopic[] = [
  {
    id: "cargo-intro",
    number: 1,
    title: "Yük Elleçleme Temelleri",
    icon: Package,
    subtopics: [
      { id: "cargo-handling-def", title: "Yük elleçlemenin tanımı ve önemi", hasContent: true },
      { id: "cargo-types", title: "Yük türleri ve sınıflandırması", hasContent: true },
      { id: "cargo-planning", title: "Yük planlaması esasları", hasContent: true },
      { id: "cargo-docs", title: "Yük belgeleri ve dokümantasyon", hasContent: true },
      { id: "cargo-safety-general", title: "Yükleme operasyonlarında güvenlik", hasContent: true },
      { id: "cargo-gear-swl", title: "Gemi yük donanımı, vinç/derrick ve SWL", hasContent: true },
    ],
  },
  {
    id: "stowage",
    number: 2,
    title: "İstifleme Prensipleri",
    icon: Boxes,
    subtopics: [
      { id: "stowage-principles", title: "Genel istifleme prensipleri", hasContent: true },
      { id: "stowage-factor", title: "İstifleme faktörü (Stowage Factor)", hasContent: true },
      { id: "broken-stowage", title: "Broken Stowage kavramı", hasContent: true },
      { id: "cargo-compatibility", title: "Yük uyumluluk tablosu", hasContent: true },
      { id: "ventilation", title: "Ambar havalandırması", hasContent: true },
      { id: "dunnage", title: "Dunnage (altlık) kullanımı", hasContent: true },
    ],
  },
  {
    id: "lashing-securing",
    number: 3,
    title: "Yük Bağlama ve Sabitleme (Lashing & Securing)",
    icon: Anchor,
    subtopics: [
      { id: "lashing-principles", title: "Bağlama prensipleri ve kuvvetler", hasContent: true },
      { id: "css-code", title: "CSS Code gereksinimleri", hasContent: true },
      { id: "lashing-equipment", title: "Bağlama ekipmanları", hasContent: true },
      { id: "lashing-calc", title: "Bağlama kuvveti hesapları", hasContent: true },
      { id: "container-lashing", title: "Konteyner bağlama sistemleri", hasContent: true },
      { id: "heavy-lift-lashing", title: "Ağır yük bağlama", hasContent: true },
    ],
  },
  {
    id: "draft-survey",
    number: 4,
    title: "Draft Survey",
    icon: Ruler,
    subtopics: [
      { id: "draft-survey-intro", title: "Draft survey amacı ve prensibi", hasContent: true },
      { id: "draft-reading", title: "Draft okuma teknikleri", hasContent: true },
      { id: "mean-draft", title: "Ortalama draft hesabı", hasContent: true },
      { id: "trim-correction", title: "Trim düzeltmeleri", hasContent: true },
      { id: "density-correction", title: "Density correction", hasContent: true },
      { id: "deductibles", title: "Düşülen değerler (Deductibles)", hasContent: true },
    ],
  },
  {
    id: "bulk-cargo",
    number: 5,
    title: "Dökme Yükler ve IMSBC Code",
    icon: BarChart3,
    subtopics: [
      { id: "bulk-types", title: "Dökme yük türleri", hasContent: true },
      { id: "imsbc-code", title: "IMSBC Code genel yapısı", hasContent: true },
      { id: "tml-fmp", title: "TML ve FMP kavramları", hasContent: true },
      { id: "group-a-cargoes", title: "Grup A yükler (liquefiable)", hasContent: true },
      { id: "group-b-cargoes", title: "Grup B yükler (kimyasal tehlike)", hasContent: true },
      { id: "trimming-bulk", title: "Dökme yük trimlenmesi", hasContent: true },
      { id: "blu-code", title: "BLU Code: dökme yük yükleme/boşaltma ve gemi-sahil kontrolü", hasContent: true },
      { id: "hold-preparation", title: "Ambar hazırlığı ve temizliği", hasContent: true },
    ],
  },
  {
    id: "dangerous-goods",
    number: 6,
    title: "Tehlikeli Yükler ve IMDG Code",
    icon: AlertTriangle,
    subtopics: [
      { id: "imdg-classes", title: "IMDG sınıfları ve alt sınıflar", hasContent: true },
      { id: "imdg-labeling", title: "Etiketleme ve işaretleme", hasContent: true },
      { id: "imdg-segregation", title: "Ayrım tablosu (Segregation Table)", hasContent: true },
      { id: "imdg-stowage", title: "Tehlikeli yük istifleme kuralları", hasContent: true },
      { id: "imdg-docs", title: "Tehlikeli yük belgeleri", hasContent: true },
      { id: "imdg-emergency", title: "Tehlikeli yük acil müdahale", hasContent: true },
    ],
  },
  {
    id: "container-ops",
    number: 7,
    title: "Konteyner Operasyonları",
    icon: Container,
    subtopics: [
      { id: "container-types", title: "Konteyner tipleri ve boyutları", hasContent: true },
      { id: "container-weight", title: "VGM (Verified Gross Mass)", hasContent: true },
      { id: "container-stowage-plan", title: "Bay plan ve istifleme planı", hasContent: true },
      { id: "reefer-containers", title: "Reefer konteynerler", hasContent: true },
      { id: "oog-cargo", title: "OOG (Out of Gauge) yükler", hasContent: true },
      { id: "container-inspection", title: "Konteyner muayene ve kontrolü", hasContent: true },
    ],
  },
  {
    id: "tanker-ops",
    number: 8,
    title: "Tanker Operations",
    icon: Droplets,
    subtopics: [
      { id: "tanker-types", title: "Tanker tipleri", hasContent: true },
      { id: "loading-discharging", title: "Yükleme ve tahliye operasyonu", hasContent: true },
      { id: "ullage-sounding", title: "Ullage ve sounding ölçümleri", hasContent: true },
      { id: "cargo-calc-tanker", title: "Tanker yük hesaplamaları", hasContent: true },
      { id: "tank-cleaning", title: "Tank temizliği ve COW", hasContent: true },
      { id: "ig-system", title: "Inert gas sistemi", hasContent: true },
      { id: "gas-carrier-igc", title: "Gaz taşıyıcılar ve IGC Code (LNG/LPG)", hasContent: true },
      { id: "isgott-tanker-safety", title: "ISGOTT ve tanker emniyeti (statik elektrik, gaz, ship-shore checklist)", hasContent: true },
    ],
  },
  {
    id: "grain-cargo",
    number: 9,
    title: "Tahıl Yükleri ve Grain Code",
    icon: Scale,
    subtopics: [
      { id: "grain-code-intro", title: "International Grain Code yapısı", hasContent: true },
      { id: "grain-shift", title: "Tahıl kayması ve yüzey etkisi", hasContent: true },
      { id: "grain-heeling-moment", title: "Volumetric Heeling Moment", hasContent: true },
      { id: "grain-stability-criteria", title: "Tahıl stabilite kriterleri", hasContent: true },
      { id: "grain-securing", title: "Tahıl yükünün sabitlenmesi", hasContent: true },
      { id: "grain-loading-plan", title: "Tahıl yükleme planı hazırlanması", hasContent: true },
    ],
  },
  {
    id: "special-cargoes",
    number: 10,
    title: "Özel Yükler",
    icon: Ship,
    subtopics: [
      { id: "timber-deck", title: "Kereste güverte yükleri", hasContent: true },
      { id: "load-line-marks", title: "Yükleme hattı işaretleri (TF/F/T/S/W/WNA)", hasContent: true },
      { id: "livestock", title: "Canlı hayvan taşımacılığı", hasContent: true },
      { id: "ro-ro-cargo", title: "Ro-Ro yük operasyonları", hasContent: true },
      { id: "steel-cargo", title: "Çelik ve ağır yük taşıma", hasContent: true },
      { id: "project-cargo", title: "Proje yükleri", hasContent: true },
    ],
  },
  {
    id: "cargo-care",
    number: 11,
    title: "Yük Bakımı ve Hasar Önleme",
    icon: Shield,
    subtopics: [
      { id: "cargo-damage-types", title: "Yük hasar türleri", hasContent: true },
      { id: "sweat-damage", title: "Terleme hasarı (Ship vs Cargo Sweat)", hasContent: true },
      { id: "moisture-control", title: "Nem kontrolü ve dew point", hasContent: true },
      { id: "cargo-claims", title: "Yük hasarı talepleri ve sorumluluk", hasContent: true },
      { id: "hague-visby", title: "Hague-Visby kuralları", hasContent: true },
    ],
  },
  {
    id: "cargo-safety-regs",
    number: 12,
    title: "Yük Emniyeti ve Uluslararası Kurallar",
    icon: BookMarked,
    subtopics: [
      { id: "solas-cargo", title: "SOLAS Bölüm VI ve VII", hasContent: true },
      { id: "marpol-cargo", title: "MARPOL ve yük operasyonları", hasContent: true },
      { id: "psc-cargo-findings", title: "PSC yük denetimleri ve bulgular", hasContent: true },
      { id: "ism-cargo", title: "ISM Code ve yük operasyonları", hasContent: true },
      { id: "cargo-incidents", title: "Yük kazaları ve alınan dersler", hasContent: true },
    ],
  },
];

interface TopicContent {
  title: string;
  introduction: string;
  content: string;
  image?: string;
  bulletPoints?: string[];
  examples?: { problem: string; solution: string }[];
  formula?: { name: string; expression: string; description: string };
  keyPoints?: string[];
  warnings?: string[];
}

const topicContents: Record<string, TopicContent> = {
  // =====================================================
  // BÖLÜM 1 - YÜK ELLEÇLEME TEMELLERİ
  // =====================================================
  "cargo-handling-def": {
    title: "Yük Elleçlemenin Tanımı ve Önemi",
    introduction: "Yük elleçleme, yükün gemiye alınması, istiflenmesi, taşınması ve boşaltılması süreçlerinin tamamını kapsayan denizcilik operasyonudur.",
    content: `Cargo handling is the fundamental operational process of sea transport. It covers every stage from the cargo's origin to the ship, its carriage on board and its discharge at the destination.

The main aims of cargo handling:
1. Carrying the cargo without damage
2. Preserving the ship's stability
3. Conducting the operation safely
4. Efficiency in time and cost

The main stages of the handling process:
- Pre-stowage planning
- The loading operation
- Cargo care at sea
- The discharging operation

The master is responsible overall for cargo operations. The chief officer manages the day-to-day cargo operations and prepares the loading plan.

Three fundamental constraints are considered in cargo operations: the ship's structural strength, its stability and its trim. All three parameters must be kept within safe limits at the same time.`,
    bulletPoints: [
      "Yük elleçleme = yükleme + taşıma + boşaltma sürecinin tamamı",
      "Kaptan genel sorumlu, Baş zabit operasyonel sorumludur",
      "Yapısal dayanım, stabilite ve trim eş zamanlı kontrol edilir",
      "Yük planı her sefer için hazırlanır",
    ],
    keyPoints: [
      "Yükleme planı operasyona başlamadan önce tamamlanmalıdır",
      "Stabilite hesapları her ara yükleme durumunda kontrol edilmelidir",
      "Yük operasyonları uluslararası kurallara tabidir (SOLAS, IMDG, IMSBC)",
    ],
  },
  "cargo-types": {
    title: "Yük Türleri ve Sınıflandırması",
    introduction: "Deniz yoluyla taşınan yükler fiziksel özelliklerine, taşıma şekline ve tehlike sınıflarına göre sınıflandırılır.",
    content: `BY PHYSICAL PROPERTIES:
1. General cargo: cargo in pieces, packaged or bundled. Cases, drums, pallets.
2. Dry bulk: granular, unpackaged. Grain, coal, ore, cement.
3. Liquid bulk: liquids carried in tanks. Crude oil, chemicals, vegetable oils.
4. Gas cargoes: LNG, LPG, ammonia.

BY METHOD OF CARRIAGE:
- Containerised cargo (FCL/LCL)
- Ro-Ro cargo (wheeled vehicles)
- Heavy lift
- Project cargo
- Refrigerated cargo (reefer cargo)

BY HAZARD CLASS (IMDG):
- Class 1: Explosives
- Class 2: Gases
- Class 3: Flammable liquids
- Class 4: Flammable solids
- Class 5: Oxidizers
- Class 6: Toxic substances
- Class 7: Radioactive material
- Class 8: Corrosives
- Class 9: Miscellaneous dangerous substances`,
    bulletPoints: [
      "Dökme kuru, dökme sıvı, genel yük ve gaz ana kategorilerdir",
      "IMDG Code 9 tehlike sınıfı tanımlar",
      "Taşıma şekli gemi tipini belirler",
      "Her yük türünün kendine özel elleçleme prosedürü vardır",
    ],
    keyPoints: [
      "Yük sınıflandırması doğru ekipman ve prosedür seçimi için kritiktir",
      "Tehlikeli yükler özel etiketleme ve ayrım kurallarına tabidir",
      "Yük karakteristiği istifleme planını doğrudan etkiler",
    ],
  },
  "cargo-planning": {
    title: "Yük Planlaması Esasları",
    introduction: "Yük planlaması, geminin güvenli ve verimli yüklenmesini sağlamak için yapılan sistematik hazırlık sürecidir.",
    content: `Cargo planning takes the following factors into account:

1. SHIP CAPACITY:
- Deadweight capacity (DWT)
- Hold volumes (bale/grain capacity)
- Deck cargo capacity
- Tank capacities

2. STABILITY REQUIREMENTS:
- The minimum GM value
- Maximum KG limits
- Trim limits
- The FSE calculation

3. STRUCTURAL STRENGTH:
- The tank top load density limit (t/m²)
- Deck load limits
- Hatch cover strength
- Longitudinal strength (SF and BM)

4. DISCHARGE SEQUENCE:
- On a multi-port rotation, stowing cargo from the bottom up and from aft forward
- The "first in, last out" principle
- Stability checks at intermediate ports

5. COMPATIBILITY:
- Compatibility of the cargoes with each other
- The dangerous goods segregation table
- The risk of sweat and contamination`,
    bulletPoints: [
      "Yük planı DWT, hacim, stabilite ve yapısal limitlere göre hazırlanır",
      "Tahliye sırası göz önünde bulundurulur",
      "Yük uyumluluğu kontrol edilir",
      "Ara durumlar dahil tüm aşamalar hesaplanır",
    ],
    keyPoints: [
      "Yükleme planı kaptan onayı olmadan uygulanmaz",
      "Her yükleme durumunda stabilite güvenli sınırlarda olmalıdır",
      "Boyuna mukavemet (shear force ve bending moment) kontrol edilmelidir",
    ],
    warnings: [
      "Exceeding the structural limits can break the ship's back",
      "Loading must not begin before a stability check has been made",
    ],
  },
  "cargo-docs": {
    title: "Yük Belgeleri ve Dokümantasyon",
    introduction: "Yük operasyonlarında kullanılan belgeler, yükün yasal, ticari ve operasyonel takibi için zorunludur.",
    content: `THE PRINCIPAL CARGO DOCUMENTS:

1. BILL OF LADING (B/L):
The formal document evidencing that the cargo has been taken on board, and constituting the contract of carriage. It has three functions: a receipt for the cargo, evidence of the contract of carriage and a document of title.

2. CARGO PLAN / STOWAGE PLAN:
The technical drawing showing where the cargoes are stowed on the ship. It shows the distribution of cargo by hold, deck and tank.

3. CARGO MANIFEST:
The list of all the cargo on board. It contains the load port, discharge port, type and quantity of cargo and the bill of lading number.

4. DG MANIFEST:
The list of dangerous goods, with the IMDG class, UN number and stowage position.

5. DRAFT SURVEY REPORT:
The calculation of the cargo quantity from the draft readings before and after loading.

6. TALLY SHEET:
The count of break-bulk cargo during loading and discharging.

7. MATE'S RECEIPT:
The first receipt evidencing that the cargo has been taken on board and its condition.

8. LETTER OF PROTEST:
The letter of objection issued when cargo is received damaged, or in circumstances such as bad weather.`,
    bulletPoints: [
      "Konşimento taşımanın en önemli yasal belgesidir",
      "Yükleme planı operasyonel referans belgesidir",
      "DG Manifest tehlikeli yük taşıyan tüm gemilerde zorunludur",
      "Letter of Protest zamanında düzenlenmeli ve imzalatılmalıdır",
    ],
    keyPoints: [
      "Belgeler yükleme öncesinde hazır olmalıdır",
      "Konşimento üzerindeki yük tanımları dikkatle kontrol edilmelidir",
      "Hasar durumunda Letter of Protest derhal düzenlenmelidir",
    ],
  },
  "cargo-safety-general": {
    title: "Yükleme Operasyonlarında Güvenlik",
    introduction: "Yükleme ve tahliye operasyonları yüksek riskli süreçlerdir ve sıkı güvenlik prosedürleri gerektirir.",
    content: `SAFETY BEFORE THE OPERATION:
- Checking the cleanliness of the holds and deck
- Checking the ventilation system
- The maintenance condition of cranes and equipment
- Testing the communication systems
- Reviewing the emergency plan

SAFETY DURING THE OPERATION:
- Hooking cargo and using slings
- Keeping personnel from standing under the load
- Not exceeding the safe working load (SWL)
- Observing wind speed limits
- Safety barriers at the hatch edge

PERSONAL PROTECTIVE EQUIPMENT (PPE):
- Helmet, safety shoes, gloves
- Safety harness for work at height
- Mask and protective clothing for dangerous cargoes

SOLAS REQUIREMENTS:
- Watchkeeping arrangements during cargo operations
- The permit-to-enter procedure (hold entry)
- Oxygen measurement (enclosed space)
- The fire patrol programme`,
    bulletPoints: [
      "SWL aşılmamalı, vinç güvenlik sistemleri aktif tutulmalıdır",
      "Kapalı alan girişinde atmosfer ölçümü zorunludur",
      "Yük altında kesinlikle durulmamalıdır",
      "Rüzgar limitleri aşıldığında operasyon durdurulmalıdır",
    ],
    keyPoints: [
      "Güvenlik her zaman operasyonel verimlilikten önce gelir",
      "Kapalı alanlara giriş izin prosedürüne tabidir",
      "Vinç operatörü ve sapancı arasında sürekli iletişim şarttır",
    ],
    warnings: [
      "The risk of loss of life in enclosed space entry is high",
      "Exceeding the SWL can break the equipment and cause death",
    ],
  },

  // =====================================================
  // BÖLÜM 2 - İSTİFLEME PRENSİPLERİ
  // =====================================================
  "stowage-principles": {
    title: "Genel İstifleme Prensipleri",
    introduction: "İstifleme, yükün gemide güvenli, verimli ve hasarsız taşınmasını sağlayacak şekilde yerleştirilmesidir.",
    content: `THE GOLDEN RULES OF STOWAGE:

1. SAFETY: the cargo must not shift throughout the voyage. Lashing and securing must be adequate.

2. STRUCTURAL PROTECTION: the tank top and deck load density limits must not be exceeded.

3. STABILITY: the vertical and horizontal distribution of the cargo must not adversely affect the ship's stability.

4. CARGO PROTECTION: cargoes must not damage each other or the ship's structure. Incompatible cargoes must be separated.

5. ACCESSIBILITY: cargo to be discharged at intermediate ports must be accessible.

6. EFFICIENCY: the hold volume and the deadweight capacity must be used to best advantage.

STOWAGE ORDER:
- Heavy cargo at the bottom, light cargo on top
- Fragile cargo at the very top
- Wet and dry cargoes separated
- Odorous cargoes kept away from the others

Stowing heavy cargo low down gives a low KG and therefore good stability.`,
    bulletPoints: [
      "Ağır yükler alta, hafif yükler üste yerleştirilir",
      "Uyumsuz yükler birbirinden ayrılmalıdır",
      "Yapısal yük limitleri asla aşılmamalıdır",
      "Tahliye sırası istifleme planını belirler",
    ],
    keyPoints: [
      "İstifleme güvenlik, stabilite ve verimlilik dengesini gözetir",
      "Her yükün altına uygun dunnage yerleştirilmelidir",
      "İstifleme planı kaptan onayına tabidir",
    ],
  },
  "stowage-factor": {
    title: "İstifleme Faktörü (Stowage Factor)",
    introduction: "İstifleme faktörü, bir ton yükün gemide kapladığı hacmi ifade eder ve yük planlamasının temel parametresidir.",
    content: `The stowage factor (SF) is the volume one tonne of cargo occupies on board.

Unit: m³/t or ft³/ton

CALCULATION:
Hold volume required = Cargo quantity (tonnes) × SF

EXAMPLE SF VALUES:
- Iron ore: 0.35 – 0.56 m³/t
- Coal: 1.10 – 1.40 m³/t
- Grain (wheat): 1.30 – 1.50 m³/t
- Grain (barley): 1.60 – 1.80 m³/t
- Timber: 1.80 – 3.00 m³/t
- Baled cotton: 1.80 – 2.50 m³/t
- Cement (bagged): 0.75 – 0.85 m³/t
- General cargo (average): 1.30 – 1.80 m³/t

A low SF = heavy cargo; the deadweight fills before the volume (deadweight cargo)
A high SF = bulky cargo; the volume fills before the deadweight (measurement cargo)

Whether the cargo will fit is checked by comparing this against the ship's bale/grain capacity.`,
    bulletPoints: [
      "SF = Bir ton yükün kapladığı hacim (m³/t)",
      "Düşük SF: Ağır yük, deadweight sınırlayıcı",
      "Yüksek SF: Hacimli yük, kapasite sınırlayıcı",
      "Gereken hacim = Yük miktarı × SF",
    ],
    formula: {
      name: "Gerekli Ambar Hacmi",
      expression: "V = W × SF",
      description: "V: Gerekli hacim (m³), W: Yük miktarı (ton), SF: İstifleme faktörü (m³/t)",
    },
    examples: [
      {
        problem: "3,000 tonnes of wheat (SF = 1.40 m³/t) is to be loaded. What hold volume is required?",
        solution: "V = 3000 × 1.40 = 4200 m³ ambar hacmi gereklidir.",
      },
    ],
    keyPoints: [
      "SF, yükün ambalaj durumuna göre değişir",
      "Bale capacity paketli yükler, grain capacity dökme yükler için kullanılır",
      "Broken stowage SF hesabına eklenerek gerçek hacim bulunur",
    ],
  },
  "broken-stowage": {
    title: "Broken Stowage Kavramı",
    introduction: "Broken stowage, yükün şekli ve ambar geometrisi nedeniyle kullanılamayan ambar hacmini ifade eder.",
    content: `Broken stowage is the space unavoidably left between cargoes, and between the cargo and the hold boundaries, inside a hold.

WHY IT ARISES:
- The irregular shape of the cargo
- The corners and curvature of the hold
- Dunnage and stowage materials
- Ventilation spaces

TYPICAL BROKEN STOWAGE VALUES:
- Grain (in bulk): 2% – 5%
- Bagged cargo: 10% – 15%
- Cased cargo: 15% – 25%
- Drums: 20% – 30%
- Irregularly shaped cargo: 25% – 40%

CALCULATION:
Usable volume = Hold volume × (1 – broken stowage %)

The higher the broken stowage, the less cargo fits into the same hold. This loss must always be allowed for in the cargo plan.`,
    bulletPoints: [
      "Broken stowage = ambar içinde kullanılamayan boşluk",
      "Dökme yüklerde %2–5, kasalı yüklerde %15–25 oranında",
      "Kullanılabilir hacim = Ambar hacmi × (1 – BS%)",
      "Yük planlamasında broken stowage mutlaka hesaplanmalıdır",
    ],
    formula: {
      name: "Kullanılabilir Hacim",
      expression: "Vnet = Vambar × (1 − BS)",
      description: "Vnet: Kullanılabilir hacim, Vambar: Ambar brüt hacmi, BS: Broken stowage oranı (ondalık)",
    },
    examples: [
      {
        problem: "Cased cargo is to be loaded into a hold volume of 5,000 m³ (BS = 20%). What is the usable volume?",
        solution: "Vnet = 5000 × (1 – 0.20) = 5000 × 0.80 = 4000 m³",
      },
    ],
  },
  "cargo-compatibility": {
    title: "Yük Uyumluluk Tablosu",
    introduction: "Farklı yüklerin aynı ambarda veya bitişik ambarlarda taşınabilirliği uyumluluk kurallarına tabidir.",
    content: `REASONS FOR CARGO INCOMPATIBILITY:
- Transfer of odour (taint)
- The effect of moisture and sweat
- Chemical reaction
- Differences in temperature

EXAMPLES OF INCOMPATIBLE CARGOES:
- Tea and rubber (odour transfer)
- Cement and sugar (moisture and dust)
- Grain and chemicals (contamination)
- Fruit and onions (odour)

LEVELS OF SEGREGATION:
1. The same hold: compatible cargoes can be loaded side by side
2. Different holds: incompatible cargoes are put in separate holds
3. Separate compartments: separated by a deck or a bulkhead
4. A different ship: must never be carried on the same ship

For dangerous goods the IMDG Code segregation table applies.`,
    bulletPoints: [
      "Koku, nem ve kimyasal uyumluluk kontrol edilmelidir",
      "Uyumsuz yükler ayrı ambarlara yerleştirilir",
      "IMDG ayrım tablosu tehlikeli yükler için zorunludur",
      "Gıda yükleri kimyasallardan uzak tutulmalıdır",
    ],
    keyPoints: [
      "Yük uyumluluğu yükleme planının temel parametresidir",
      "Kontaminasyon hasarı gemiyi mali sorumlu yapabilir",
      "Baş zabit uyumluluk tablosunu kontrol etmelidir",
    ],
  },
  "ventilation": {
    title: "Ambar Havalandırması",
    introduction: "Ambar havalandırması, yük terleme hasarını önlemek ve güvenli atmosferi korumak için uygulanan prosedürdür.",
    content: `THE PURPOSE OF VENTILATION:
1. To prevent sweat damage
2. To remove carbon dioxide, methane and other gases
3. Temperature control
4. To slow deterioration in grain and organic cargoes

TYPES OF VENTILATION:
- Natural ventilation: wind ventilators
- Mechanical ventilation: forced air circulation by fans

THE THREE-RULE SYSTEM:
The decision is made by comparing dew points:

Rule 1: Outside air dew point < cargo temperature → ventilate
Rule 2: Outside air dew point > cargo temperature → do not ventilate
Rule 3: Sailing from a warm region to a cold one → ventilate; from cold to warm → ventilation may be shut down

SHIP SWEAT:
When the ship's steel structure cools, the moist hold air condenses on the shell plating. It drips onto the cargo below.

CARGO SWEAT:
Warm moist air condenses on a cold cargo surface.`,
    bulletPoints: [
      "Dew point karşılaştırması havalandırma kararını belirler",
      "Gemi terleme: Çelik yapı soğuduğunda oluşur",
      "Yük terleme: Sıcak hava soğuk yüke temas ettiğinde oluşur",
      "Tahıl yüklerinde havalandırma özel önem taşır",
    ],
    keyPoints: [
      "Havalandırma günlüğü tutulmalı ve kayıt altına alınmalıdır",
      "Yağmurlu havada havalandırma kapanır",
      "Dew point ölçümleri düzenli yapılmalıdır",
    ],
  },
  "dunnage": {
    title: "Dunnage (Altlık) Kullanımı",
    introduction: "Dunnage, yükü ambar tabanından, duvarlarından ve diğer yüklerden ayırmak için kullanılan koruyucu malzemedir.",
    content: `TYPES OF DUNNAGE:
- Wooden boards and pieces of timber
- Polythene sheeting
- Kraft paper
- Air bags / dunnage bags
- Rubber mats

THE PURPOSES OF DUNNAGE:
1. Protection from moisture: separating the cargo from tank top sweat
2. Ventilation: providing air circulation under the cargo
3. Load distribution: spreading the weight evenly
4. Separation: keeping different cargoes apart
5. Friction: preventing the cargo from sliding

RULES OF APPLICATION:
- Dunnage must be clean and dry
- Timber of at least 25 mm thickness is used
- Dunnage must not obstruct the flow of cargo
- Cross-laying improves air circulation
- Thicker dunnage is used under heavy cargoes`,
    bulletPoints: [
      "Dunnage yükü nem, sürtünme ve hasardan korur",
      "Minimum 25 mm kalınlığında ahşap kullanılır",
      "Çapraz döşeme hava dolaşımı sağlar",
      "Temiz ve kuru malzeme kullanılmalıdır",
    ],
    keyPoints: [
      "Dunnage maliyeti yük hasar tazminatından çok düşüktür",
      "Her yükleme öncesi yeterli dunnage stoku kontrol edilmelidir",
      "Uygun dunnage kullanımı sigorta açısından önemlidir",
    ],
  },

  // =====================================================
  // BÖLÜM 3 - LASHING & SECURING
  // =====================================================
  "lashing-principles": {
    title: "Bağlama Prensipleri ve Kuvvetler",
    introduction: "Yük bağlama, deniz koşullarında yüke etki eden ivme kuvvetlerine karşı yükü sabit tutmak için uygulanan prosedürdür.",
    content: `THE FORCES ACTING ON CARGO AT SEA:
The motion of the ship subjects the cargo to acceleration forces in three directions:

1. TRANSVERSE FORCES:
Caused by rolling. These are the largest forces.
Typical value: 0.5g – 0.8g (depending on the ship's length and loading condition)

2. LONGITUDINAL FORCES:
Caused by pitching and wave impact.
Typical value: 0.3g – 0.5g

3. VERTICAL FORCES:
Caused by heaving.
Typical value: 0.2g – 0.5g

THE SECURING PRINCIPLE:
The total holding force of the securing equipment must be greater than the sliding forces acting on the cargo.

Safety factor: minimum 1.5

Friction also helps to resist the cargo sliding. The coefficient of friction between steel and steel is about 0.3.`,
    bulletPoints: [
      "Enine kuvvetler en büyük bağlama ihtiyacını oluşturur",
      "Bağlama kuvveti kayma kuvvetinin 1.5 katı olmalıdır",
      "Sürtünme katsayısı hesaba dahil edilir",
      "CSS Code hesap yöntemlerini belirler",
    ],
    keyPoints: [
      "Bağlama hesabı operasyon öncesi yapılmalıdır",
      "Seyir sırasında bağlamaların kontrolü zorunludur",
      "Kötü hava öncesi ek bağlama yapılabilir",
    ],
    warnings: [
      "Inadequate securing leads to the cargo shifting and toppling",
      "The SWL of the securing equipment must not be exceeded",
    ],
  },
  "css-code": {
    title: "CSS Code Gereksinimleri",
    introduction: "CSS Code (Code of Safe Practice for Cargo Stowage and Securing), IMO tarafından yayımlanan yük istifleme ve bağlama güvenlik kurallarıdır.",
    content: `THE STRUCTURE OF THE CSS CODE:
A code of practice adopted by IMO Resolution A.714(17) and updated regularly.

THE BASIC REQUIREMENTS:
1. Cargo Securing Manual (CSM): a mandatory document on every ship. It defines the securing arrangements specific to the ship.
2. Securing points: the capacities of the securing elements on the ship, such as D-rings, pad eyes and bollards, must be documented.
3. Securing equipment: the MSL (Maximum Securing Load) values of chains, wire ropes, turnbuckles and lashing bars are recorded.

ANNEXES TO THE CSS CODE:
- Annex 1: principles of safe stowage
- Annex 5: securing semi-standardised cargo
- Annex 12: container safety
- Annex 13: the method for calculating securing forces (the advanced calculation)

THE ANNEX 13 CALCULATION METHOD:
It compares the effect of the acceleration forces on the cargo with the capacity of the securing equipment to resist them.`,
    bulletPoints: [
      "Her gemide Cargo Securing Manual (CSM) zorunludur",
      "Bağlama noktalarının kapasiteleri belgelenmelidir",
      "MSL değerleri ekipman üzerinde belirtilmelidir",
      "Annex 13 ileri bağlama hesaplarını tanımlar",
    ],
    keyPoints: [
      "CSM gemi özelinde hazırlanır ve klas onayı gerektirir",
      "PSC denetimlerinde CSM ve uygulaması kontrol edilir",
      "Yeni ekipman eklendiğinde CSM güncellenmelidir",
    ],
  },
  "lashing-equipment": {
    title: "Bağlama Ekipmanları",
    introduction: "Yük bağlama ekipmanları, her birinin belirli kapasitesi (MSL) olan ve yükü gemiye sabitleyen malzemelerdir.",
    content: `THE PRINCIPAL SECURING EQUIPMENT:

1. LASHING CHAIN:
- High-strength steel
- Grade 80 or Grade 100
- MSL: 50% of the breaking load

2. WIRE ROPE:
- 6×19 or 6×37 construction
- MSL: 80% of the breaking load (with a turnbuckle)
- Usually for heavy lift cargoes

3. WEBBING STRAP:
- Polyester or polypropylene
- MSL: stated on the label
- Light and medium weight cargoes

4. TURNBUCKLE:
- The means of tensioning the lashing
- The bottle screw type is common
- Requires periodic maintenance

5. LASHING BAR / ROD:
- Steel bar lashing
- Common in container securing

6. SECURING POINTS:
- D-ring, pad eye, cleat
- The SWL values are shown on the ship's plan
- Regular inspection and maintenance are mandatory`,
    bulletPoints: [
      "Zincir MSL: Kopma yükünün %50'si",
      "Çelik halat MSL: Kopma yükünün %80'i",
      "Her ekipmanın MSL etiketi okunmalıdır",
      "Hasarlı ekipman kullanılmamalıdır",
    ],
    keyPoints: [
      "MSL değerleri CSS Code'a göre belirlenir",
      "Ekipman bakımı ve sertifikası zorunludur",
      "Bağlama açısı etkin kuvveti azaltır (kuvvet = MSL × cos θ)",
    ],
  },
  "lashing-calc": {
    title: "Bağlama Kuvveti Hesapları",
    introduction: "Bağlama kuvveti hesabı, yüke etki eden kayma kuvvetlerini ve bağlama ekipmanının karşılama kapasitesini karşılaştırır.",
    content: `THE BASIC CALCULATION PRINCIPLE:

Total securing capacity ≥ Safety factor × Sliding force

SLIDING FORCE:
Fsliding = m × a − μ × m × g × cos θ

where:
m: mass of the cargo (tonnes)
a: acceleration (m/s²) – from the CSS Code tables
μ: coefficient of friction
g: acceleration due to gravity (9.81 m/s²)
θ: deck inclination

EFFECTIVE SECURING FORCE:
This depends on the angle the lashing makes with the horizontal.
Feffective = MSL × cos α

α: the lashing angle (to the horizontal)
A small angle = a high effective force
A large angle = a low effective force

The ideal lashing angle: between 30° and 60°`,
    bulletPoints: [
      "Bağlama kapasitesi kayma kuvvetinin 1.5 katı olmalıdır",
      "Bağlama açısı etkin kuvveti doğrudan etkiler",
      "Sürtünme kuvveti bağlama ihtiyacını azaltır",
      "İdeal bağlama açısı 30°–60° arasıdır",
    ],
    formula: {
      name: "Etkin Bağlama Kuvveti",
      expression: "Fetkin = MSL × cos α",
      description: "Fetkin: Etkin yatay kuvvet, MSL: Maksimum sabitleme yükü, α: Bağlama açısı",
    },
    examples: [
      {
        problem: "A lashing strap with an MSL of 100 kN is applied at an angle of 45°. What is the effective force?",
        solution: "Fetkin = 100 × cos 45° = 100 × 0.707 = 70.7 kN",
      },
    ],
    keyPoints: [
      "Bağlama açısı küçüldükçe etkin kuvvet artar",
      "Her iki taraftaki bağlama simetrik olmalıdır",
      "Hesap sonuçları CSM'ye kaydedilmelidir",
    ],
  },
  "container-lashing": {
    title: "Konteyner Bağlama Sistemleri",
    introduction: "Konteyner bağlama, twist lock, lashing bar ve stacking cone gibi standart ekipmanlarla gerçekleştirilir.",
    content: `CONTAINER SECURING EQUIPMENT:

1. TWIST LOCK (manual & automatic):
The locking mechanism that secures containers to each other and to the hatch cover. A "base twist lock" is used on the bottom container and "intermediate twist locks" on those above.

2. LASHING BAR AND TURNBUCKLE:
The cross-lashing system applied to containers on deck. It is usually applied up to the 2nd and 3rd tier.

3. STACKING CONE:
Provides alignment and location when containers are stacked.

4. BRIDGE FITTING:
A bridge-type securing element placed between two containers.

HEIGHT LIMITS:
- In the hold: usually 5-9 tiers
- On deck: 4-6 tiers (depending on the ship type)
- Weight limits apply to the upper tiers

Heavy containers are stowed low and light ones high.
Reefer containers are kept in positions where the power connections are accessible.`,
    bulletPoints: [
      "Twist lock en temel konteyner sabitleme elemanıdır",
      "Güverte üstü 2.–3. kata kadar lashing bar uygulanır",
      "Ağır konteynerler alta, hafifler üste yerleştirilir",
      "Reefer konteynerler elektrik bağlantısına yakın konumlandırılır",
    ],
    keyPoints: [
      "Automatic twist lock operasyonu hızlandırır",
      "Lashing bar'ların sertifikası kontrol edilmelidir",
      "VGM (Verified Gross Mass) bilgisi istifleme planında kullanılır",
    ],
  },
  "heavy-lift-lashing": {
    title: "Ağır Yük Bağlama",
    introduction: "Ağır yükler (heavy lift), standart bağlama yöntemlerinin ötesinde özel hesap ve ekipman gerektiren yüklerdir.",
    content: `DEFINITION OF HEAVY LIFT:
Generally cargoes weighing more than 50 tonnes as a single piece. Transformers, generators, industrial equipment and cranes fall into this category.

DECK STRENGTH:
The first check for a heavy lift is the strength of the deck or the tank top.
Load per unit area: cargo weight / base area ≤ the permissible load density (t/m²)

Spreader plates are placed under the cargo if necessary.

SECURING CALCULATION:
For heavy lifts the detailed calculation method of CSS Code Annex 13 is applied.

The sliding forces are calculated in three directions (transverse, longitudinal and vertical) and the securing arrangement is designed accordingly.

SECURING ARRANGEMENT:
- Lashings from at least 4 corners
- Welded pads may be used
- A chain plus turnbuckle combination is common
- Regular checks at sea after securing

STOPPERS AND CHOCKS:
Steel stoppers or wooden chocks are fitted to prevent the cargo sliding.`,
    bulletPoints: [
      "Güverte dayanımı ilk kontrol noktasıdır",
      "Spreader plaka yük dağılımı sağlar",
      "CSS Code Annex 13 hesap yöntemi uygulanır",
      "Stopper ve chock kayma önlemek için kullanılır",
    ],
    keyPoints: [
      "Ağır yük operasyonlarında stabilite önceden hesaplanmalıdır",
      "Welding pad kullanımı klas onayına tabi olabilir",
      "Bağlama düzeni kaptan ve terminal koordinasyonuyla belirlenir",
    ],
    warnings: [
      "If the deck strength is exceeded there is a risk of structural damage",
      "GM can fall to a critical level during a heavy lift",
    ],
  },

  // =====================================================
  // BÖLÜM 4 - DRAFT SURVEY
  // =====================================================
  "draft-survey-intro": {
    title: "Draft Survey Amacı ve Prensibi",
    introduction: "Draft survey, geminin su çekimindeki (draft) değişimden yola çıkarak yüklenen veya boşaltılan yük miktarını hesaplama yöntemidir.",
    content: `A draft survey is based on Archimedes' principle:

The weight of the water a body displaces is equal to the weight of that body.

THE PRINCIPLE:
The ship's displacement is calculated before and after loading. The difference gives the quantity of cargo.

Cargo quantity = Displacement (after) − Displacement (before) − the difference in the deductibles

STEPS:
1. Initial draft readings: forward, aft and midships
2. Calculating the mean draft from the readings
3. Trim and hogging/sagging corrections
4. Reading the displacement from the hydrostatic tables
5. Density correction
6. Deductibles such as ballast, fuel and fresh water
7. Final draft readings and a repeat of the same calculations
8. Calculating the net cargo quantity

The draft survey is the most common method of establishing the commercial quantity of bulk cargoes.`,
    bulletPoints: [
      "Draft survey Arşimet prensibine dayanır",
      "Yük = Son deplasman − İlk deplasman − Düşülenler",
      "Prova, pupa ve orta olmak üzere 6 nokta okunur",
      "Dökme yük ticaretinde standart miktar tespit yöntemidir",
    ],
    keyPoints: [
      "Draft survey bağımsız bir surveyor tarafından yapılabilir",
      "Ticari anlaşmazlıklarda referans belgedir",
      "Doğruluk ±0.5% mertebesindedir (iyi koşullarda)",
    ],
  },
  "draft-reading": {
    title: "Draft Okuma Teknikleri",
    introduction: "Draft okumaları, geminin pruva (baş), pupa (kıç) ve orta noktalarında sancak ve iskele tarafından yapılan su çekimi ölçümleridir.",
    content: `READING POINTS:
The draft is read at 6 points:
- Forward starboard (FS), forward port (FP)
- Midships starboard (MS), midships port (MP)
- Aft starboard (AS), aft port (AP)

MEANS:
dF = (FS + FP) / 2
dM = (MS + MP) / 2
dA = (AS + AP) / 2

READING RULES (METRIC SYSTEM):
- The bottom edge of the figure: the value of the figure
- The middle of the figure: the figure + 5 cm
- The top edge of the figure: the figure + 10 cm

READING DIFFICULTIES:
- Averaging in waves and swell
- Night readings (lighting required)
- Marine growth and blistered paint
- Parallax error (the observer's angle)

It is important that the readings are taken at the same time. Readings must not be taken while ballast transfer or loading is in progress.`,
    bulletPoints: [
      "6 noktadan eş zamanlı okuma yapılır",
      "Dalga ortalaması alınarak net değer bulunur",
      "Metrik ve imperial okuma kuralları farklıdır",
      "Ballast transferi sırasında okuma yapılmamalıdır",
    ],
    keyPoints: [
      "Doğru okuma, doğru hesabın temelidir",
      "Gece okumalarında yeterli aydınlatma sağlanmalıdır",
      "Her okuma kayıt altına alınmalıdır",
    ],
  },
  "mean-draft": {
    title: "Ortalama Draft Hesabı",
    introduction: "Ortalama draft, geminin trim ve eğimini dikkate alarak tek bir temsili draft değerine ulaşmayı amaçlar.",
    content: `THREE MEAN METHODS:

1. MEAN OF MEANS:
dmean = (dF + dM + dA) / 3
Used only where the ship is upright and without deflection.

2. QUARTER MEAN DRAFT:
dQM = (dF + 6 × dM + dA) / 8
Gives a more accurate result where there is hogging or sagging.

3. THE CORRECTED MEAN:
The draft value after the trim correction has been applied.

DETECTING HOGGING AND SAGGING:
- Hogging: (dF + dA) / 2 > dM → the ship is arched upwards amidships
- Sagging: (dF + dA) / 2 < dM → the ship is dished downwards amidships

The quarter mean draft gives a more accurate displacement, particularly where there is marked hogging or sagging.`,
    bulletPoints: [
      "Düz durumda aritmetik ortalama kullanılır",
      "Hogging/sagging varsa QM draft tercih edilir",
      "QM = (dF + 6×dM + dA) / 8",
      "Hogging: Ortası yukarı, Sagging: Ortası aşağı",
    ],
    formula: {
      name: "Quarter Mean Draft",
      expression: "dQM = (dF + 6 × dM + dA) / 8",
      description: "dQM: Quarter mean draft, dF: Pruva (baş) draft, dM: Orta draft, dA: Pupa draft",
    },
    examples: [
      {
        problem: "dF = 6.20 m, dM = 6.50 m, dA = 7.00 m. Quarter mean draft?",
        solution: "dQM = (6.20 + 6×6.50 + 7.00) / 8 = (6.20 + 39.00 + 7.00) / 8 = 52.20 / 8 = 6.525 m",
      },
    ],
  },
  "trim-correction": {
    title: "Trim Düzeltmeleri",
    introduction: "Trim düzeltmeleri, geminin trimli olduğu durumlarda hidrostatik tablolardan okunan deplasmanın doğru değere getirilmesi için uygulanır.",
    content: `TRIM:
Trim = dA − dF

TWO CORRECTIONS ARE APPLIED:

1. THE FIRST TRIM CORRECTION (Δ₁):
It arises from the difference between the LCF (the longitudinal position of the centre of flotation) and midships.

Δ₁ = (Trim × LCFmid × TPC × 100) / LBP

It can be positive or negative.

2. THE SECOND TRIM CORRECTION (Δ₂):
The correction arising from the change in the shape of the waterplane when the ship is trimmed.

Δ₂ = (Trim² × ΔMCT × 50) / LBP

It is always positive (it increases the displacement).

TOTAL DISPLACEMENT:
Δcorrected = Δtable + Δ₁ + Δ₂

The trim corrections make a significant difference particularly at large trims (more than 1 metre).`,
    bulletPoints: [
      "Birinci düzeltme LCF pozisyonundan kaynaklanır",
      "İkinci düzeltme her zaman pozitiftir",
      "Toplam deplasman = Tablo değeri + Δ₁ + Δ₂",
      "Büyük trimlerde düzeltmeler kritik öneme sahiptir",
    ],
    formula: {
      name: "Birinci Trim Düzeltmesi",
      expression: "Δ₁ = (Trim × LCF × TPC × 100) / LBP",
      description: "LCF: Yüzerlik merkezi ortadan uzaklık, TPC: Ton/cm, LBP: İki perpendikül arası uzunluk",
    },
  },
  "density-correction": {
    title: "Density Correction",
    introduction: "Hidrostatik tablolar tuzlu deniz suyu (1.025 t/m³) için hazırlanır; farklı yoğunluktaki sularda düzeltme gerekir.",
    content: `The hydrostatic tables are drawn up for a density of 1.025 t/m³.

Dock water can be of a different density:
- Fresh water: 1.000 t/m³
- River estuary: 1.000 – 1.020 t/m³
- Sea water: 1.020 – 1.030 t/m³

DENSITY CORRECTION:
Δcorrected = Δtable × (ρdock / 1.025)

where:
ρdock: the density of the dock water (t/m³)

Measuring the density:
- Measured with a hydrometer
- The sample is taken from sea level
- A temperature correction may be applied

In water of lower density the ship floats deeper (reads a greater draft) but the displacement does not change.`,
    bulletPoints: [
      "Tablolar 1.025 t/m³ için hazırlanmıştır",
      "Farklı yoğunlukta düzeltme zorunludur",
      "Δdüz = Δtablo × (ρdock / 1.025)",
      "Hidrometre ile yoğunluk ölçülür",
    ],
    formula: {
      name: "Density Correction",
      expression: "Δcorrected = Δtable × (ρdock / 1.025)",
      description: "ρdock: Liman suyu yoğunluğu (t/m³). Düşük yoğunlukta deplasman azaltılır.",
    },
    examples: [
      {
        problem: "The displacement read from the table is 15,000 tonnes and the dock water density is 1.010 t/m³. What is the corrected displacement?",
        solution: "Δ = 15000 × (1.010 / 1.025) = 15000 × 0.9854 = 14780.5 ton",
      },
    ],
  },
  "deductibles": {
    title: "Düşülen Değerler (Deductibles)",
    introduction: "Draft survey sonucunda hesaplanan deplasmanlardan ballast, yakıt, tatlı su ve diğer sıvıların ağırlığı düşülerek net yük miktarı bulunur.",
    content: `The net cargo calculation:
Cargo = (Δfinal − Δinitial) − (deductibles_final − deductibles_initial)

THE DEDUCTIBLE ITEMS:
1. BALLAST WATER:
Each tank is sounded or ullaged. The volume is read from the tank calibration tables and multiplied by the density to give the weight.

2. FUEL (HFO, MGO, MDO):
Each fuel tank is sounded. A density correction is applied for temperature.

3. FRESH WATER:
The level in the fresh water tanks is measured.

4. SLOP / SLUDGE:
The waste oil and slop tanks.

5. OTHER:
The constant (fixed weight): crew, provisions, paint, spare parts, etc. Generally taken as constant at every survey.

MEASUREMENT ACCURACY:
- Every tank is measured separately
- Temperature corrections are applied
- Ballast tanks are kept full or empty where possible
- The ballast remaining on board (ROB) is calculated carefully`,
    bulletPoints: [
      "Ballast, yakıt, tatlı su ve sabitler düşülür",
      "Her tank ayrı ölçülür",
      "Sıcaklık düzeltmesi yakıtta zorunludur",
      "Constant değeri genellikle sabit kabul edilir",
    ],
    keyPoints: [
      "Deductibles hatası doğrudan yük miktarını etkiler",
      "Ballast tanklarının boş olduğu kontrol edilmelidir",
      "Yakıt yoğunluğu sıcaklığa göre düzeltilmelidir",
    ],
  },

  // =====================================================
  // BÖLÜM 5 - DÖKME YÜKLER VE IMSBC CODE
  // =====================================================
  "bulk-types": {
    title: "Dökme Yük Türleri",
    introduction: "Dökme yükler tanecikli yapıda olup ambalajsız olarak geminin ambarlarına doğrudan yüklenen katı malzemelerdir.",
    content: `THE PRINCIPAL BULK CARGOES:

1. ORES:
- Iron ore: SF ≈ 0.35–0.56 m³/t
- Bauxite, manganese, nickel
- Very heavy, deadweight limiting

2. COAL:
- SF ≈ 1.10–1.40 m³/t
- Risk of spontaneous combustion
- Emission of methane gas

3. GRAINS:
- Wheat, maize, barley, soya
- SF ≈ 1.30–1.80 m³/t
- Risk of shifting (the Grain Code applies)

4. CEMENT:
- Bagged or in bulk
- Moisture sensitive, watertight packaging

5. FERTILISER:
- Urea, ammonium nitrate
- Some fall under the IMDG Code

6. MINERALS:
- Sand, gravel, limestone
- Low SF, structural strength must be checked

The IMSBC Code divides all bulk cargoes into three groups:
- Group A: cargoes that may liquefy
- Group B: cargoes with a chemical hazard
- Group C: cargoes that fall into neither Group A nor Group B`,
    bulletPoints: [
      "Cevherler çok ağır (düşük SF), tahıllar hacimlidir (yüksek SF)",
      "Kömür kendiliğinden yanma ve metan riski taşır",
      "IMSBC Code dökme yükleri A, B, C gruplarına ayırır",
      "Grup A yükler sıvılaşma riski taşır",
    ],
    keyPoints: [
      "Her dökme yükün IMSBC Code'daki veri sayfası kontrol edilmelidir",
      "Yükleme öncesi yükün nem içeriği belirlenmelidir",
      "Grup A yüklerde TML ve FMP sertifikası zorunludur",
    ],
  },
  "imsbc-code": {
    title: "IMSBC Code Genel Yapısı",
    introduction: "IMSBC Code (International Maritime Solid Bulk Cargoes Code), dökme katı yüklerin güvenli taşınmasını düzenleyen zorunlu uluslararası koddur.",
    content: `THE STRUCTURE OF THE IMSBC CODE:

Mandatory under SOLAS Chapter VI, this code sets out the rules for the safe carriage of solid bulk cargoes.

SECTIONS:
1. General provisions and definitions
2. General precautions before loading
3. Carriage and points to watch
4. Assessment of bulk cargo hazards
5. Trimming
6. Individual schedules for each cargo

CARGO GROUPS:
- Group A: cargoes that may liquefy (nickel ore, iron ore fines, etc.)
- Group B: chemical hazard (DRI, sulphur, coal, etc.)
- Group C: the others (sand, stone, etc.)
- Some cargoes fall into more than one group (A and B)

EACH CARGO HAS A DATA SHEET CONTAINING:
- A description of the cargo and its properties
- The hazard class
- Stowage and segregation rules
- Loading limits
- Precautions during carriage
- Emergency procedures`,
    bulletPoints: [
      "SOLAS Bölüm VI ile zorunlu kılınmıştır",
      "Her yükün kendine özel veri sayfası vardır",
      "Yükler A, B ve C gruplarına ayrılır",
      "Kod düzenli olarak güncellenir (amendments)",
    ],
    keyPoints: [
      "Yükleme öncesi IMSBC veri sayfası mutlaka incelenmelidir",
      "Kod kapsamında olmayan yük için bayrak devleti iznı gerekir",
      "PSC denetimlerinde IMSBC uyumu kontrol edilir",
    ],
  },
  "tml-fmp": {
    title: "TML ve FMP Kavramları",
    introduction: "TML (Transportable Moisture Limit) ve FMP (Flow Moisture Point), dökme yüklerin sıvılaşma riskini değerlendirmek için kullanılan kritik parametrelerdir.",
    content: `WHAT IS LIQUEFACTION?
Some bulk cargoes (fine-grained minerals and ores) can begin to behave like a liquid under the vibration and motion of the ship. This causes the cargo to shift to one side and the ship to capsize.

FMP (Flow Moisture Point):
The moisture content at which the cargo begins to flow like a liquid.
It is determined by laboratory tests.

TML (Transportable Moisture Limit):
The maximum moisture content at which the cargo can be carried safely.
TML = FMP × 0.9 (90% of the FMP)

THE CONTROL MECHANISM:
1. The shipper provides the moisture content of the cargo and the TML certificate
2. The actual moisture content of the cargo must be ≤ TML
3. If the moisture content exceeds the TML the cargo is rejected or dried

THE CAN TEST (a practical test):
A can is half filled with the cargo and struck on a table 25 times. If free moisture appears on the surface the cargo must not be loaded.`,
    bulletPoints: [
      "Sıvılaşma = Dökme yükün sıvı gibi davranması",
      "TML = FMP × 0.9",
      "Nem içeriği ≤ TML olmalıdır",
      "Can testi pratik kontrol yöntemidir",
    ],
    formula: {
      name: "Taşınabilir Nem Limiti",
      expression: "TML = FMP × 0.9",
      description: "TML: Taşınabilir nem limiti (%), FMP: Akışkan nem noktası (%)",
    },
    keyPoints: [
      "TML sertifikası yükleme öncesi alınmalıdır",
      "Can testi basit ama etkili bir kontrol yöntemidir",
      "Yağmur altında yükleme nem oranını artırabilir",
    ],
    warnings: [
      "Cargo with a moisture content above the TML must never be loaded",
      "Liquefaction happens suddenly and can capsize the ship",
    ],
  },
  "group-a-cargoes": {
    title: "Grup A Yükler (Liquefiable)",
    introduction: "Grup A yükler, belirli nem oranı üzerinde sıvılaşma riski taşıyan ve özel önlemlerle taşınması gereken dökme yüklerdir.",
    content: `EXAMPLES OF GROUP A CARGOES:
- Nickel ore
- Iron ore fines
- Bauxite (some types)
- Fluorspar
- Certain concentrates (copper, zinc, lead)

CHECKS BEFORE LOADING:
1. The shipper's declaration
2. The TML certificate (from an accredited laboratory)
3. The moisture content test result
4. Visual and tactile inspection of the cargo
5. Carrying out the can test

PRECAUTIONS DURING THE VOYAGE:
- Keeping the hold ventilation closed
- Checking the cargo surface regularly (where possible)
- Keeping the bilge pumps operational
- Changing route according to the weather

PAST CASUALTIES:
The capsizing of ships loaded with nickel ore led to the Group A cargo rules in the IMSBC Code being tightened.`,
    bulletPoints: [
      "Nikel cevheri ve ince demir cevheri en riskli Grup A yüklerdir",
      "TML sertifikası ve nem testi zorunludur",
      "Can testi yükleme öncesi uygulanmalıdır",
      "Geçmiş kazalar kuralların sıkılaşmasına yol açmıştır",
    ],
    keyPoints: [
      "Kaptan yükü reddetme hakkına sahiptir",
      "Yağmur altında yükleme yapmaktan kaçınılmalıdır",
      "Ambar bilge pompası sistemi kontrol edilmelidir",
    ],
    warnings: [
      "The liquefaction of Group A cargoes has caused the most fatal cargo casualties worldwide",
      "Loading must NEVER take place when the moisture limit is exceeded",
    ],
  },
  "group-b-cargoes": {
    title: "Grup B Yükler (Kimyasal Tehlike)",
    introduction: "Grup B yükler kimyasal tehlike arz eden dökme katı yüklerdir ve özel taşıma kurallarına tabidir.",
    content: `EXAMPLES OF GROUP B CARGOES AND THEIR HAZARDS:

1. COAL:
- Emission of methane gas (risk of explosion)
- Self-heating (spontaneous combustion)
- Oxygen depletion (enclosed space hazard)

2. DRI (Direct Reduced Iron):
- Produces hydrogen on contact with water
- Risk of spontaneous combustion

3. SULPHUR:
- Formation of combustible dust
- Emission of SO₂ gas
- Risk of static electricity

4. FERTILISERS:
- Ammonium nitrate: explosive potential
- Urea: moisture sensitive

COMMON PRECAUTIONS:
- Hold inspection before loading
- Preparing the gas measuring instruments
- The enclosed space procedure for hold entry
- Fire prevention measures
- Compliance with the ventilation rules`,
    bulletPoints: [
      "Kömür: Metan, self-heating ve oksijen tüketimi riski",
      "DRI: Su temasında hidrojen üretir",
      "Kükürt: Yanıcı toz ve SO₂ riski",
      "Gaz ölçüm cihazları hazır tutulmalıdır",
    ],
    keyPoints: [
      "Grup B yüklerin IMSBC veri sayfası dikkatle okunmalıdır",
      "Kapalı alan girişi prosedürü mutlaka uygulanmalıdır",
      "Yangın dedektörleri aktif tutulmalıdır",
    ],
    warnings: [
      "The oxygen level in a coal hold can fall; entry can be fatal",
      "If water reaches DRI cargo there is a risk of explosion",
    ],
  },
  "trimming-bulk": {
    title: "Dökme Yük Trimlenmesi",
    introduction: "Trimleme, dökme yükün ambar içinde düzgün yayılmasını sağlamak için yapılan seviyeleme işlemidir.",
    content: `THE PURPOSE OF TRIMMING:
Bulk cargo piles up in a cone. A heap forms under the loading conveyor and the sides of the hold are left empty. This:
- Increases the risk of the cargo shifting
- Can cause local structural overloading
- Prevents the full capacity of the hold being used

THE SOLAS REQUIREMENT:
SOLAS Chapter VI, Regulation 6: bulk cargoes must be trimmed reasonably level to the boundaries of the hold.

METHODS OF TRIMMING:
1. Mechanical trimming: with a bulldozer or a bucket
2. Conveyor movement: moving the loading conveyor
3. Levelling with a grab: levelling with the crane grab

WHY IT MATTERS:
Untrimmed cargo can shift at sea and, even if it does not capsize the ship, can cause a dangerous list.

Trimming is particularly critical for grain cargoes; the Grain Code sets specific trimming requirements.`,
    bulletPoints: [
      "Dökme yük konik yığılır, trimleme ile seviyelenir",
      "SOLAS trimleme zorunluluğu getirir",
      "Mekanik, konveyör veya grab ile yapılır",
      "Trimlenmemiş yük kayma riski taşır",
    ],
    keyPoints: [
      "Trimleme maliyeti stabilite kazasından çok düşüktür",
      "Tahıl yüklerinde Grain Code trimleme kuralları uygulanır",
      "Trimleme derecesi IMSBC veri sayfasında belirtilir",
    ],
  },

  // =====================================================
  // BÖLÜM 6 - TEHLİKELİ YÜKLER VE IMDG CODE
  // =====================================================
  "imdg-classes": {
    title: "IMDG Sınıfları ve Alt Sınıflar",
    introduction: "IMDG Code, tehlikeli yükleri 9 ana sınıfa ayırır. Her sınıfın kendine özel tehlike özellikleri, istifleme ve bağlama kuralları vardır.",
    content: `IMDG HAZARD CLASSES:

Class 1: EXPLOSIVES
1.1 – Mass explosion hazard
1.2 – Projection hazard
1.3 – Fire hazard
1.4 – Minor explosion hazard
1.5 – Very insensitive explosives
1.6 – Extremely insensitive

Class 2: GASES
2.1 – Flammable gases
2.2 – Non-flammable, non-toxic gases
2.3 – Toxic gases

Class 3: FLAMMABLE LIQUIDS
No subdivisions. The packing group is determined by the flash point.

Class 4: FLAMMABLE SOLIDS
4.1 – Flammable solids
4.2 – Substances liable to spontaneous combustion
4.3 – Substances which emit flammable gases on contact with water

Class 5: OXIDIZERS
5.1 – Oxidizing substances
5.2 – Organic peroxides

Class 6: TOXIC SUBSTANCES
6.1 – Toxic
6.2 – Infectious

Class 7: RADIOACTIVE MATERIAL

Class 8: CORROSIVE SUBSTANCES

Class 9: MISCELLANEOUS DANGEROUS SUBSTANCES`,
    bulletPoints: [
      "9 ana sınıf ve çok sayıda alt sınıf mevcuttur",
      "Her maddenin UN numarası vardır",
      "Paketleme grubu (PG I, II, III) tehlike seviyesini belirtir",
      "UN numarası ile IMDG Code'dan detaylı bilgiye ulaşılır",
    ],
    keyPoints: [
      "UN numarası tehlikeli yük tanımlama anahtarıdır",
      "Aynı sınıftaki maddeler bile farklı kurallara tabi olabilir",
      "IMDG Code iki yılda bir güncellenir",
    ],
  },
  "imdg-labeling": {
    title: "Etiketleme ve İşaretleme",
    introduction: "Tehlikeli yüklerin doğru etiketlenmesi ve işaretlenmesi, güvenli elleçleme ve acil müdahale için zorunludur.",
    content: `LABELLING REQUIREMENTS:

1. HAZARD LABELS:
A hazard label appropriate to the class is affixed to every package.
- Label size: minimum 100 × 100 mm
- A square set on a point (diamond) shape
- A colour and symbol specific to the class

2. PLACARDS:
Affixed to containers and tanks.
- Size: minimum 250 × 250 mm
- On all four sides of the container

3. UN NUMBER:
The four-digit identification number of every dangerous substance.
Example: UN 1203 = Gasoline

4. PROPER SHIPPING NAME:
The substance's official transport name in the IMDG Code.

5. MARKS:
- The marine pollutant mark
- Orientation arrows (this way up)
- Limited/excepted quantity marks`,
    bulletPoints: [
      "Tehlike etiketi minimum 100×100 mm boyutunda",
      "Konteyner placard'ı dört yüze yapıştırılır",
      "UN numarası her pakette görünür olmalı",
      "Proper Shipping Name IMDG Code'a göre yazılır",
    ],
    keyPoints: [
      "Eksik veya yanlış etiketleme PSC tutulma nedenidir",
      "Acil müdahale ekibi etiketten tehlikeyi tanır",
      "Marine pollutant işareti çevresel riski gösterir",
    ],
  },
  "imdg-segregation": {
    title: "Ayrım Tablosu (Segregation Table)",
    introduction: "IMDG Code segregation table, farklı sınıftaki tehlikeli yüklerin gemide birbirine olan minimum uzaklığını belirler.",
    image: "/diagrams/seamanship/imdg-ayrim.svg",
    content: `SEGREGATION LEVELS (from the lowest to the highest):

1. "AWAY FROM":
In different holds, or 3 m apart horizontally in the same hold.

2. "SEPARATED FROM":
In different holds or compartments. A minimum of 6 m horizontal separation on deck.

3. "SEPARATED BY A COMPLETE COMPARTMENT":
There must be at least one complete compartment (hold) between them.

4. "SEPARATED LONGITUDINALLY":
Separated by at least one intervening hold plus a deck, OR a minimum of 24 m horizontal separation.

USING THE SEGREGATION TABLE:
The IMDG classes appear in the rows and columns.
The symbol in the intersecting cell gives the level of segregation.

X = see the segregation rules (special cases)
1 = Away from
2 = Separated from
3 = Separated by a complete compartment
4 = Separated longitudinally`,
    bulletPoints: [
      "4 ayrım seviyesi mevcuttur (1 en düşük, 4 en yüksek)",
      "Tablo IMDG sınıflarının kesişimine göre okunur",
      "Güverte üstü ve altı için farklı kurallar uygulanabilir",
      "X işareti özel durum kontrolü gerektirir",
    ],
    keyPoints: [
      "Ayrım tablosu yükleme planının temel referansıdır",
      "Yanlış ayrım PSC tutulma ve sigorta ihlali nedenidir",
      "Tablo güncel IMDG Code sürümünden kontrol edilmelidir",
    ],
    warnings: [
      "Stowing incompatible dangerous goods close together can cause fire and explosion",
      "Breaching the segregation rules has serious legal consequences",
    ],
  },
  "imdg-stowage": {
    title: "Tehlikeli Yük İstifleme Kuralları",
    introduction: "Tehlikeli yüklerin istiflenmesi IMDG Code'un belirlediği özel kurallara tabidir ve sınıfa göre güverte üstü veya altı yerleşim belirlenmiştir.",
    content: `STOWAGE CATEGORIES:

The IMDG Code assigns a stowage category to every substance:

Category A: on or under deck (no restriction)
Category B: on or under deck (subject to conditions)
Category C: on deck only
Category D: on deck only (special conditions)
Category E: on or under deck (special conditions)

GENERAL STOWAGE RULES:
1. A minimum distance from the accommodation must be maintained
2. It must not be stowed close to foodstuffs
3. It must be kept away from heat sources
4. It must not be exposed to sunlight (some classes)
5. Access to the fire fighting equipment must be preserved
6. The ventilation requirements must be met

ON CONTAINER SHIPS:
DG containers are marked specially on the bay plan.
Segregation distances are calculated in container lengths (TEU).`,
    bulletPoints: [
      "İstifleme kategorisi A-E arası değişir",
      "Yaşam mahalline ve yiyeceklere uzaklık zorunludur",
      "Yangın söndürme ekipmanına erişim korunmalıdır",
      "DG konteynerler bay planında işaretlenir",
    ],
    keyPoints: [
      "Her DG maddesinin IMDG Code'daki istifleme kategorisi kontrol edilmelidir",
      "İstifleme kategorisi ile ayrım tablosu birlikte uygulanır",
      "Kaptan DG Manifest'i onaylamadan yükleme yapılmaz",
    ],
  },
  "imdg-docs": {
    title: "Tehlikeli Yük Belgeleri",
    introduction: "Tehlikeli yük taşımacılığında doğru ve eksiksiz dokümantasyon hem yasal zorunluluk hem de güvenlik gereğidir.",
    content: `MANDATORY DOCUMENTS:

1. DG DECLARATION:
Prepared by the shipper. It contains the UN number, proper shipping name, class, packing group and emergency response information.

2. DG MANIFEST / LIST:
The list of all dangerous goods on board, with the stowage positions.
Mandatory under SOLAS Chapter VII.

3. CONTAINER / VEHICLE PACKING CERTIFICATE:
Certifies that the container has been packed in accordance with the IMDG rules.

4. EmS (Emergency Schedule):
The emergency response procedure for each DG substance.
Taken from the EmS Guide.

5. MFAG (Medical First Aid Guide):
The first aid guide for contact with dangerous substances.

6. SPECIAL LIST / STOWAGE PLAN:
The plan showing the positions of the DG cargoes on board.
Provided to the port authority.`,
    bulletPoints: [
      "DG Declaration yükleyici sorumluluğundadır",
      "DG Manifest SOLAS gereği zorunludur",
      "EmS ve MFAG acil durum rehberleridir",
      "DG stowage plan liman otoritesine verilir",
    ],
    keyPoints: [
      "Belge eksikliği yükleme reddine yol açar",
      "Yanlış beyan yapan yükleyici yasal sorumludur",
      "Belgeler gemide erişilebilir yerde tutulmalıdır",
    ],
  },
  "imdg-emergency": {
    title: "Tehlikeli Yük Acil Müdahale",
    introduction: "Tehlikeli yük kazalarında doğru ve hızlı müdahale can ve mal kaybını önlemek için kritik öneme sahiptir.",
    content: `TYPES OF EMERGENCY:
1. Fire (the most common)
2. Leakage / spillage
3. Chemical exposure
4. Risk of explosion

USING EmS:
Every dangerous substance has a two-part EmS code:
- F (Fire): the fire fighting procedure
- S (Spillage): the spillage response procedure

Example: EmS F-A, S-A

RESPONSE PRINCIPLES:
1. Crew safety comes before everything else
2. Stay upwind
3. Appropriate PPE must be worn
4. Contaminated water must be prevented from running into the sea (MARPOL)
5. The regional MRCC must be informed

THE MUSTER LIST:
A special allocation of duties for DG emergencies must appear in the muster list.

DRILLS:
DG emergency drills must be held regularly.`,
    bulletPoints: [
      "EmS kodu F (yangın) ve S (dökülme) bölümlerinden oluşur",
      "Mürettebat güvenliği en önceliklidir",
      "Rüzgar üstünde kalınmalı, uygun KKD giyilmelidir",
      "MRCC'ye derhal bilgi verilmelidir",
    ],
    keyPoints: [
      "EmS Guide ve MFAG köprüüstünde hazır tutulmalıdır",
      "DG acil durum tatbikatları düzenli yapılmalıdır",
      "Denize kirlilik durumunda MARPOL bildirim zorunluluğu vardır",
    ],
    warnings: [
      "Using the wrong extinguishing agent can make the situation worse",
      "Responding to a DG incident in an enclosed space can be fatal",
    ],
  },

  // =====================================================
  // BÖLÜM 7 - KONTEYNER OPERASYONLARI
  // =====================================================
  "container-types": {
    title: "Konteyner Tipleri ve Boyutları",
    introduction: "Konteynerler ISO standartlarına göre üretilir ve taşınacak yükün özelliğine göre farklı tiplerde tasarlanmıştır.",
    content: `STANDARD DIMENSIONS:

20' container (1 TEU):
- External dimensions: 6.058 × 2.438 × 2.591 m
- Internal volume: ~33.2 m³
- Maximum gross weight: 30,480 kg
- Tare: ~2,300 kg

40' container (2 TEU):
- External dimensions: 12.192 × 2.438 × 2.591 m
- Internal volume: ~67.7 m³
- Maximum gross weight: 30,480 kg

40' High Cube (HC):
- Height: 2.896 m (30 cm higher than standard)
- Internal volume: ~76.3 m³

CONTAINER TYPES:
- Dry (standard): general dry cargo
- Reefer: refrigerated, temperature controlled
- Open Top: open topped, for high cargo
- Flat Rack: without sides, for wide/heavy cargo
- Tank Container: liquid cargo
- Ventilated: ventilated (coffee, cocoa, etc.)
- Bulk Container: for solid bulk cargo
- Platform: base only`,
    bulletPoints: [
      "20' = 1 TEU, 40' = 2 TEU",
      "Standart ve High Cube en yaygın tiplerdir",
      "Reefer konteynerler sürekli elektrik gerektirir",
      "Flat rack ve open top özel yükler içindir",
    ],
    keyPoints: [
      "Maksimum brüt ağırlık 30,480 kg'dır (ISO)",
      "VGM doğrulaması zorunludur (SOLAS)",
      "Konteyner CSC plakası geçerlilik tarihi kontrol edilmelidir",
    ],
  },
  "container-weight": {
    title: "VGM (Verified Gross Mass)",
    introduction: "VGM, SOLAS zorunluluğu gereği her konteynerin yükleme öncesi doğrulanmış brüt ağırlığıdır.",
    content: `WHAT IS THE VGM?
Mandatory since 2016 under SOLAS Chapter VI, Regulation 2. The actual gross mass of every container must be verified before loading.

TWO METHODS OF VERIFICATION:

Method 1: WEIGHING
The whole packed container is weighed on calibrated scales.

Method 2: CALCULATION
The container's tare weight plus the sum of the weighed weights of all its contents.

A container without a VGM is not loaded on board.

RESPONSIBILITY FOR THE VGM:
The shipper is responsible for verifying the VGM.
The terminal passes the VGM information to the ship planner.
The master must reject any container without a VGM.

WHY THE VGM MATTERS:
Incorrect weight information leads to:
- The container stack toppling
- The ship taking an unexpected list
- The crane capacity being exceeded
- The stability calculation being wrong`,
    bulletPoints: [
      "VGM 2016'dan bu yana SOLAS ile zorunludur",
      "Tartım veya hesaplama yöntemiyle belirlenir",
      "VGM olmadan konteyner yüklenmez",
      "Yükleyici VGM'den sorumludur",
    ],
    keyPoints: [
      "VGM eksikliği PSC tutulma nedenidir",
      "Yanlış VGM stabilite kazalarına yol açar",
      "Kaptan VGM'siz konteyneri reddetme hakkına sahiptir",
    ],
  },
  "container-stowage-plan": {
    title: "Bay Plan ve İstifleme Planı",
    introduction: "Bay plan, konteyner gemisinde her konteynerin üç boyutlu yerleşim pozisyonunu gösteren standart istifleme planıdır.",
    content: `THE BAY PLAN NUMBERING SYSTEM:

A six-digit position code: BAY – ROW – TIER

BAY (longitudinal position):
- Odd numbers: 20' container positions (01, 03, 05...)
- Even numbers: 40' container positions (02, 06, 10...)
- Increasing from forward to aft

ROW (transverse position):
- Centreline: 00
- Starboard: 01, 03, 05... (odd)
- Port: 02, 04, 06... (even)

TIER (vertical position):
- In the hold: 02, 04, 06... (from the bottom up)
- On deck: 82, 84, 86... (from the bottom up)

EXAMPLE: 140682
Bay 14, Row 06 (third row to port), Tier 82 (first tier on deck)

PLANNING CRITERIA:
- Weight distribution (heavy at the bottom)
- Discharge sequence (the top ones come out first)
- DG segregation rules
- Reefer power connections
- Stability and trim optimisation`,
    bulletPoints: [
      "Bay-Row-Tier üç boyutlu konum sistemidir",
      "An odd bay = 20', an even bay = 40'",
      "Sancak tek, iskele tarafı çift row numarası alır",
      "Ambar içi tier 02'den, güverte üstü 82'den başlar",
    ],
    keyPoints: [
      "Bay plan istifleme planlamasının temel aracıdır",
      "Planlama yazılımları stabilite kontrolü yapar",
      "Her liman için ayrı yükleme/boşaltma planı hazırlanır",
    ],
  },
  "reefer-containers": {
    title: "Reefer Konteynerler",
    introduction: "Reefer konteynerler, sıcaklık kontrollü yük taşımak için tasarlanmış soğutma üniteli özel konteynerlerdir.",
    content: `REEFER CONTAINER FEATURES:
- An integral refrigeration/heating unit
- Temperature range: -30°C to +30°C
- Power supply: 380/440V, 3 phase, 50/60 Hz
- A digital temperature control panel
- Ventilation damper control

CARGOES CARRIED:
- Fruit and vegetables
- Meat and fish products
- Dairy products
- Pharmaceuticals
- Flowers
- Certain chemicals

TYPICAL CARRIAGE TEMPERATURES (approximate; the shipper's instructions govern):
- Bananas: +13°C to +14°C (chilling injury below 12°C)
- Apples, pears: 0°C to +1°C
- Citrus: +4°C to +8°C
- Fresh (chilled) meat: -1°C to +2°C
- Frozen meat/fish: -18°C and below (deep frozen -25°C)
- Fresh fish: 0°C to +2°C
- Dairy products: +2°C to +4°C
- Ice cream: -25°C
- Cut flowers: +2°C to +8°C
- Pharmaceuticals/vaccines: +2°C to +8°C (some at -20°C)
- Chocolate: +12°C to +18°C

Note: with a controlled/modified atmosphere (CA/MA) the O₂ and CO₂ levels are adjusted to extend the shelf life of fruit and vegetables. The distinction between "chilled" (above freezing point) and "frozen" is critical.

OPERATIONAL CHECKS:
1. Before loading: the PTI (Pre-Trip Inspection) check
2. Temperature setting: according to the cargo specification
3. Ventilation: open for fruit/vegetables, closed for meat
4. During the voyage: temperature checks at least twice a day
5. In the event of a breakdown: a spare container or a cold room

POSITIONING:
- A position where the power connection is accessible
- Sufficient clearance for air circulation
- On deck or in dedicated reefer bays`,
    bulletPoints: [
      "Sıcaklık aralığı -30°C ile +30°C",
      "380/440V, 3 faz elektrik beslemesi gerekir",
      "Günde en az 2 kez sıcaklık kontrolü yapılır",
      "PTI kontrolü yükleme öncesi zorunludur",
    ],
    keyPoints: [
      "Reefer arızası yükün tamamının kaybına yol açabilir",
      "Yedek elektrik bağlantısı planlanmalıdır",
      "Havalandırma ayarı yük türüne göre yapılır",
    ],
  },
  "oog-cargo": {
    title: "OOG (Out of Gauge) Yükler",
    introduction: "OOG yükler, standart konteyner boyutlarını aşan ve özel planlama gerektiren yüklerdir.",
    content: `TYPES OF OOG:
- Over-height
- Over-width
- Over-length
- Overweight

METHODS OF CARRIAGE:
1. Open Top container: cargo overhanging at the top
2. Flat Rack: cargo overhanging at the sides
3. Platform: cargo overhanging in all directions
4. As break-bulk: stowed directly, outside a container

STOWAGE RULES:
- No other container is placed on top of an OOG container
- The overhang must not affect the adjacent bays
- Securing requires a special calculation
- Wind loading must be taken into account

PLANNING:
OOG cargo is marked specially on the bay plan.
The overhang dimensions must be declared to the nearest centimetre.
The crane capacity must be checked.`,
    bulletPoints: [
      "OOG yükler standart boyutları aşar",
      "Flat rack ve open top en yaygın taşıma araçlarıdır",
      "Üzerine başka konteyner konulmaz",
      "Taşma boyutları hassas bildirilmelidir",
    ],
    keyPoints: [
      "OOG yükler ek navlun gerektirir",
      "Bağlama hesabı CSS Code'a göre yapılır",
      "Planlama aşamasında terminalle koordinasyon şarttır",
    ],
  },
  "container-inspection": {
    title: "Konteyner Muayene ve Kontrolü",
    introduction: "Konteyner muayenesi, güvenli taşıma ve yasal uyumluluk için yükleme öncesi ve sırasında yapılan kontrolleri kapsar.",
    content: `CHECKING THE CSC PLATE:
Every container must have a CSC (Container Safety Convention) approval plate.
What to check:
- The approval date and validity
- The ACEP (Approved Continuous Examination Programme) number
- The maximum gross weight
- The stacking weight

PHYSICAL INSPECTION:
1. STRUCTURE: deformation, cracks, corrosion
2. FLOOR: rot, breaks, holes
3. DOORS: the condition of the seals, the locking mechanism
4. ROOF: holes, water leaks
5. CORNER CASTINGS: deformation, cracked welds

PACKING CHECK:
- Securing of the cargo inside the container
- Use of dunnage and air bags
- Balanced weight distribution
- Correctness of the DG labels

REJECTION CRITERIA:
A container with structural damage, a missing CSC plate, water leaks or an identified safety risk is rejected.`,
    bulletPoints: [
      "CSC plakası her konteynerde olmalıdır",
      "Fiziksel muayene yapı, taban, kapı ve çatıyı kapsar",
      "Hasarlı konteyner reddedilmelidir",
      "Paketleme kontrolü yük güvenliği için kritiktir",
    ],
    keyPoints: [
      "CSC plakası olmayan konteyner taşınamaz",
      "Konteyner hasarı yük taleplerine yol açar",
      "Muayene bulguları kayıt altına alınmalıdır",
    ],
  },

  // =====================================================
  // BÖLÜM 8 - TANKER OPERASYONLARI
  // =====================================================
  "tanker-types": {
    title: "Tanker Tipleri",
    introduction: "Tankerler taşıdıkları sıvı yükün özelliğine göre farklı tiplerde inşa edilir ve her tipin kendine özel operasyonel kuralları vardır.",
    content: `TANKER TYPES:

1. CRUDE OIL TANKERS:
- VLCC (Very Large Crude Carrier): 200,000+ DWT
- Suezmax: 120,000 – 200,000 DWT
- Aframax: 80,000 – 120,000 DWT
- Panamax: 60,000 – 80,000 DWT

2. PRODUCT TANKERS:
- Refined petroleum products (petrol, diesel, jet fuel)
- Coated tanks (epoxy coating)
- Able to carry more than one grade

3. CHEMICAL TANKERS:
- IMO Type 1: the most hazardous chemicals
- IMO Type 2: moderately hazardous
- IMO Type 3: less hazardous
- Covered by the IBC Code

4. LNG CARRIERS:
- Liquefied natural gas (-162°C)
- Membrane or Moss type tanks
- Covered by the IGC Code

5. LPG CARRIERS:
- Pressurised or semi-refrigerated
- Carrying propane and butane

GAS CARRIER TANK TYPES (IGC Code):
On gas carriers the type of cargo containment system determines the requirement for a secondary barrier. Cargoes carried below -10°C require a secondary barrier.

- Independent Type A: prismatic, designed to ship structural standards. A FULL secondary barrier is mandatory. Design vapour pressure < 0.7 bar. Carries fully refrigerated LPG/ethylene.
- Independent Type B: designed using advanced analysis (fatigue, crack propagation) and model testing; only a PARTIAL secondary barrier (drip tray) is required. The classic example is the spherical Moss tank; also the prismatic SPB. Design pressure < 0.7 bar.
- Independent Type C: a pressure vessel (cylindrical/spherical); design vapour pressure generally ≥ 2 bar. NO SECONDARY BARRIER IS REQUIRED. Used on small and medium gas carriers carrying fully pressurised/semi-pressurised LPG and ethylene.
- Membrane tanks: a thin steel/invar membrane (the primary barrier) supported by insulation; it includes a FULL secondary barrier. Common on LNG carriers (GTT Mark III, NO96). The design pressure is low (< 0.25 bar).`,
    bulletPoints: [
      "Ham petrol, ürün, kimyasal, LNG ve LPG ana tanker tipleridir",
      "VLCC 200,000 DWT üzeri en büyük tankerdir",
      "Kimyasal tankerler IMO Tip 1, 2 ve 3 olarak sınıflandırılır",
      "LNG tankerleri -162°C'de yük taşır",
      "IGC tank tipleri: A (tam ikincil bariyer), B (kısmi), C (basınçlı, bariyer yok), membran (LNG)",
    ],
    keyPoints: [
      "Her tanker tipi farklı uluslararası koda tabidir",
      "Tank kaplamalar yük uyumluluğunu belirler",
      "Tanker personeli özel eğitim almalıdır (STCW)",
      "Tip C ikincil bariyer gerektirmez; Tip A tam, Tip B kısmi bariyer ister",
    ],
  },
  "loading-discharging": {
    title: "Yükleme ve Tahliye Operasyonu",
    introduction: "Tanker yükleme ve tahliye operasyonları yüksek risk içerir ve sistematik prosedürlere göre yürütülür.",
    content: `BEFORE LOADING:
1. The Ship/Shore Safety Checklist is completed
2. The manifold connections are checked
3. Tank preparation (gas-free or inerted)
4. Communications and emergency procedures
5. The loading plan and rate are agreed

THE LOADING OPERATION:
- Starting at a low rate (to confirm the line-up to the shore tank)
- Increasing the rate in stages
- Regular ullage/sounding measurement
- Trim and stability monitoring
- Static electricity precautions (the first 30 minutes of loading)
- Topping off (the final stage, at a low rate)

THE DISCHARGE OPERATION:
- Discharge with the cargo pumps
- Stripping (clearing the remaining cargo)
- The tank emptying sequence set by stability
- Crude Oil Washing (COW)
- Taking ballast (into SBT or the emptied tanks)

SOLAS REQUIREMENTS:
- The permit-to-enter procedure
- Gas measurements
- Fire prevention measures`,
    bulletPoints: [
      "Ship/Shore Safety Checklist zorunludur",
      "Başlangıçta düşük debi ile yükleme yapılır",
      "Topping off aşamasında debi azaltılır",
      "Tahliyede ballast alımı stabilite için gereklidir",
    ],
    keyPoints: [
      "Statik elektrik ilk 30 dakikada en tehlikelidir",
      "Tank boşalma sırası stabiliteye göre belirlenir",
      "Ship/Shore iletişimi sürekli açık tutulmalıdır",
    ],
    warnings: [
      "A manifold leak can cause a fire and an environmental disaster",
      "Overfilling a tank has serious consequences",
    ],
  },
  "ullage-sounding": {
    title: "Ullage ve Sounding Ölçümleri",
    introduction: "Ullage ve sounding, tanklardaki sıvı seviyesini belirlemek için kullanılan iki temel ölçüm yöntemidir.",
    content: `ULLAGE:
The empty distance from the top of the tank to the liquid surface.
Ullage = tank depth − liquid level

SOUNDING:
The filled distance from the bottom of the tank to the liquid surface.
Sounding = liquid level

THE RELATIONSHIP:
Ullage + Sounding = tank depth

MEASUREMENT METHODS:
1. Manual: with a steel ullage tape
2. Automatic: with a radar or ultrasonic level sensor

VOLUME CALCULATION:
1. The liquid level is measured (ullage or sounding)
2. The volume is read from the tank calibration table
3. A temperature correction is applied
4. The weight is found by multiplying by the density

Weight = Volume × Density

TRIM CORRECTION:
The ship being trimmed affects the liquid level. The tank calibration tables include a trim correction.`,
    bulletPoints: [
      "Ullage = Boş mesafe (üstten), Sounding = Dolu mesafe (alttan)",
      "Ullage + Sounding = Tank yüksekliği",
      "Hacim tank kalibrasyon tablosundan okunur",
      "Sıcaklık ve trim düzeltmeleri uygulanır",
    ],
    formula: {
      name: "Yük Ağırlığı",
      expression: "W = V × ρ",
      description: "W: Yük ağırlığı (ton), V: Düzeltilmiş hacim (m³), ρ: Yoğunluk (t/m³)",
    },
  },
  "cargo-calc-tanker": {
    title: "Tanker Yük Hesaplamaları",
    introduction: "Tanker yük miktarı, sıvı seviye ölçümleri, sıcaklık düzeltmeleri ve yoğunluk verileri kullanılarak hesaplanır.",
    content: `CALCULATION STEPS:

1. ULLAGE/SOUNDING MEASUREMENT:
An independent measurement is taken in each tank.

2. GROSS OBSERVED VOLUME (GOV):
The volume corresponding to the liquid level is read from the tank tables.

3. NET OBSERVED VOLUME (NOV):
GOV − free water and sediment

4. CONVERSION TO STANDARD VOLUME (GSV):
A temperature correction is applied.
GSV = GOV × VCF (Volume Correction Factor)
The VCF is found using the ASTM tables (Table 54).

5. WEIGHT CALCULATION:
Weight (metric tonnes) = GSV × density (at 15°C, in vacuum)
or
Weight (in air) = GSV × density (at 15°C, in air)

ASTM TABLES:
- Table 54: the temperature correction factor
- Table 56: density conversion
- Table 6: API gravity conversion`,
    bulletPoints: [
      "GOV → NOV → GSV → Ağırlık sırası izlenir",
      "VCF sıcaklık düzeltme faktörüdür (ASTM Table 54)",
      "Yoğunluk 15°C referans sıcaklığında kullanılır",
      "ASTM tabloları standart hesaplama referansıdır",
    ],
    formula: {
      name: "Standart Hacim",
      expression: "GSV = GOV × VCF",
      description: "GSV: Standart hacim, GOV: Gözlenen hacim, VCF: Hacim düzeltme faktörü (ASTM Table 54)",
    },
  },
  "tank-cleaning": {
    title: "Tank Temizliği ve COW",
    introduction: "Tank temizliği, bir sonraki yüke hazırlık veya onarım için tankların yıkanması ve gazdan arındırılması işlemidir.",
    content: `CLEANING METHODS:

1. COW (Crude Oil Washing):
The method applied on crude oil tankers during discharge.
Part of the crude oil loaded is sprayed at high pressure onto the tank walls.
Mandatory under MARPOL Annex I (on ships where it is practicable).

2. HOT SEA WATER WASHING:
Tank washing with water at 60-80°C.
Effective for heavy residues.

3. COLD SEA WATER WASHING:
Sufficient after light products.

4. CHEMICAL CLEANING:
On chemical tankers when changing grade.
Selecting the right cleaning agent is critical.

5. GAS-FREEING:
Making the tanks safe against explosion.
LEL must be < 1% and O₂ > 21%.

THE WALL WASH TEST:
After cleaning, a sample taken from the tank wall is used to check that the cleaning is adequate.`,
    bulletPoints: [
      "COW ham petrol tankerleri için MARPOL zorunluluğudur",
      "Gazfree: LEL < %1 ve O₂ > %21",
      "Wall wash testi temizlik doğrulaması yapar",
      "Kimyasal tankerlerde uygun ajan seçimi kritiktir",
    ],
    keyPoints: [
      "Tank temizliği sırasında kapalı alan prosedürü uygulanır",
      "İnert atmosfer altında COW yapılır",
      "Temizlik suyu MARPOL kurallarına göre bertaraf edilir",
    ],
    warnings: [
      "Entering a tank that has not been gas-freed is fatal",
      "There is a risk of static electricity and explosion during COW",
    ],
  },
  "ig-system": {
    title: "Inert Gas Sistemi",
    introduction: "Inert gas sistemi, tank atmosferindeki oksijeni düşürerek patlama riskini ortadan kaldıran güvenlik sistemidir.",
    content: `PURPOSE:
To prevent flammable hydrocarbon vapours exploding by reducing the oxygen content of the tank atmosphere below 8%.

PRINCIPLE OF OPERATION:
Exhaust gas from the boiler or the IG generator is cooled, scrubbed and delivered to the tanks.
IG composition: ~83% N₂, ~14% CO₂, ~3% other

IG APPLICATIONS:
1. INERTING: filling the tank with inert gas (O₂ < 8%)
2. PURGING: replacing the gas in the tank with clean IG
3. GAS-FREEING: replacing the IG in the tank with fresh air
4. TOPPING UP: making up a falling pressure with IG

WHERE IT IS MANDATORY:
- Crude oil tankers (over 20,000 DWT): mandatory
- Product tankers (some): mandatory
- Chemical tankers: depending on the cargo

SYSTEM COMPONENTS:
- The IG producer (boiler or generator)
- Scrubber (washing tower)
- Blower (fan)
- Deck seal (water seal)
- P/V valve and breaker
- The IG distribution line`,
    bulletPoints: [
      "IG oksijeni %8 altına düşürür",
      "Inerting, purging, gas-freeing ve topping up uygulamaları vardır",
      "20,000+ DWT ham petrol tankerlerinde zorunludur",
      "Deck seal IG hattının geri akışını engeller",
    ],
    keyPoints: [
      "IG sistemi SOLAS ve MARPOL gereği zorunludur",
      "Sistem arızası durumunda operasyon durdurulmalıdır",
      "O₂ ölçümü sürekli yapılmalıdır",
    ],
    warnings: [
      "Tank operations must not be carried out while the IG system is out of service",
      "A dry deck seal allows gas to flow back and can cause an explosion",
    ],
  },

  // =====================================================
  // BÖLÜM 9 - TAHIL YÜKLERİ VE GRAIN CODE
  // =====================================================
  "grain-code-intro": {
    title: "International Grain Code Yapısı",
    introduction: "International Grain Code, tahıl yüklerinin denizde güvenli taşınmasını düzenleyen ve SOLAS kapsamında zorunlu olan uluslararası koddur.",
    content: `The Grain Code, made mandatory under SOLAS Chapter VI, sets out the rules for the safe carriage of grain cargoes.

SCOPE:
Grain cargo: wheat, maize, oats, barley, rice, millet and similar granular cargoes.

MAIN SUBJECTS:
1. The shifting characteristics of grain cargo
2. Heeling moment calculations
3. Stability criteria
4. Hold filling levels
5. Securing the cargo
6. Documentation requirements

THE GRAIN LOADING BOOKLET:
The document that must be carried on every ship authorised to load grain.
It contains:
- The ship's grain carriage approval
- The grain/bale capacities of the holds
- VHM (Volumetric Heeling Moment) tables
- Allowable heeling moment tables
- Stability calculation forms

Approval by the flag State or an authorised classification society is mandatory.`,
    bulletPoints: [
      "SOLAS Bölüm VI kapsamında zorunludur",
      "Grain Loading Booklet her gemide bulunmalıdır",
      "VHM tabloları heeling moment hesabı için kullanılır",
      "Bayrak devleti veya klas onayı zorunludur",
    ],
    keyPoints: [
      "Tahıl taşıma onayı olmayan gemi tahıl yükleyemez",
      "Grain Code'un güncellenen ekleri takip edilmelidir",
      "Stabilite kriterleri genel yük gemilerinden farklıdır",
    ],
  },
  "grain-shift": {
    title: "Tahıl Kayması ve Yüzey Etkisi",
    introduction: "Tahıl yükü, geminin salınımı sırasında kayarak bir tarafa toplanabilir ve tehlikeli list oluşturabilir.",
    content: `THE SHIFTING MECHANISM:
Grain particles are not firmly bound to each other. As the ship rolls:
1. The particles flow towards the low side
2. The cargo surface becomes inclined
3. The cargo does not return when the ship comes upright
4. Repeated rolling increases the one-sided accumulation

This effect is similar to the free surface effect, but it is different. Grain does not flow back, so the effect is cumulative.

THE CONDITION OF THE CARGO SURFACE:
- A full hold (filled): minimum risk of shifting
- A partly filled hold: maximum risk of shifting

THE ANGLE OF REPOSE:
The natural angle of repose of grain is about 25°-30°.
When the ship heels the cargo surface tries to reach this angle.

PRECAUTIONS:
1. Filling holds completely (trimmed, filled)
2. Using shifting boards or feeders in partly filled holds
3. Trimming the cargo surface and overstowing it with bagged grain`,
    bulletPoints: [
      "Tahıl geri akmaz, kayma etkisi kümülatiftir",
      "Tam dolu ambar kayma riskini minimize eder",
      "Kısmen dolu ambar en tehlikeli durumdur",
      "Shifting board veya silo ile sabitleme yapılır",
    ],
    keyPoints: [
      "Tahıl kayması alabora riskinin önemli nedenlerinden biridir",
      "Kısmen dolu ambar sayısı minimize edilmelidir",
      "Yük yüzeyi trimlenmelidir",
    ],
    warnings: [
      "A partly filled hold presents the greatest risk of grain shifting",
      "Inadequate securing can lead to the ship capsizing",
    ],
  },
  "grain-heeling-moment": {
    title: "Volumetric Heeling Moment",
    introduction: "VHM (Volumetric Heeling Moment), tahıl yükünün kayması sonucu oluşan yatma momentini ifade eden hesaplama parametresidir.",
    content: `The VHM calculation is made with data taken from the Grain Loading Booklet.

The VHM is calculated separately for each hold and the values are added together.

A FULL HOLD:
The VHM value is read from the Grain Loading Booklet table.
The VHM is low in full holds.

A PARTLY FILLED HOLD:
The VHM value is much greater, depending on the filling level.
The Grain Code provides separate tables for these holds.

TOTAL VHM:
The VHM values of all the holds are added together to give the ship's total VHM.

THE GHM CALCULATION:
GHM (Grain Heeling Moment) = total VHM ÷ SF (stowage factor, m³/t)
Unit check: VHM (m⁴) ÷ SF (m³/t) = t·m (an actual weight moment).
Alternatively the GHM is used directly where it has already been calculated.

THE CHECK:
GHM must be ≤ the allowable heeling moment.
The allowable heeling moment is determined by the ship's stability condition.`,
    bulletPoints: [
      "VHM her ambar için ayrı ayrı hesaplanır",
      "Tam dolu ambar VHM'si düşük, kısmen dolu ambar VHM'si yüksektir",
      "Toplam VHM tüm ambarların toplamıdır",
      "GHM ≤ Allowable Heeling Moment olmalıdır",
    ],
    formula: {
      name: "Tahıl Yatma Açısı",
      expression: "θ = (57.3 × GHM) / (Δ × GM)",
      description: "θ: Yatma açısı (°), GHM: Grain Heeling Moment (t-m), Δ: Deplasman (ton), GM: Metasantrik yükseklik (m)",
    },
  },
  "grain-stability-criteria": {
    title: "Grain Stability Criteria",
    introduction: "Grain Code, tahıl taşıyan gemiler için genel stabilite kriterlerinden daha sıkı özel kriterler belirler.",
    content: `GRAIN CODE STABILITY CRITERIA:

1. ANGLE OF HEEL:
The angle of list due to grain shifting must not exceed 12° or 40% of the angle of deck edge immersion, whichever is the less.

2. RESIDUAL AREA:
The area between the GZ curve and the heeling moment curve (residual dynamic stability):
Minimum 0.075 m-rad

3. GM0 (initial GM):
Minimum GM ≥ 0.30 m (after the free surface correction)

THE CHECKING PROCESS:
1. The loading plan is prepared
2. The VHM/GHM is calculated for each hold
3. The total GHM is found
4. The GZ curve is drawn
5. The heeling moment curve is added
6. The residual area is calculated
7. It is confirmed that all the criteria are met

If the stability criteria are not met the loading plan must be revised.`,
    bulletPoints: [
      "List açısı ≤ 12° (veya güverte girme açısının %40'ı)",
      "Residual area ≥ 0.075 m-rad",
      "GM₀ ≥ 0.30 m (FSE düzeltmesi sonrası)",
      "Üç kriter birlikte sağlanmalıdır",
    ],
    keyPoints: [
      "Grain Code kriterleri genel IMO kriterlerinden farklıdır",
      "Yükleme planı kriterleri sağlamıyorsa revize edilmelidir",
      "Grain Loading Booklet hesaplamaların temel referansıdır",
    ],
  },
  "grain-securing": {
    title: "Tahıl Yükünün Sabitlenmesi",
    introduction: "Tahıl yükü, kayma riskini azaltmak için ambar içinde çeşitli yöntemlerle sabitlenir.",
    content: `SECURING METHODS:

1. SHIFTING BOARDS:
Wooden or steel panels fitted vertically on the centreline along the length of the hold.
They physically prevent the grain shifting to one side.

2. LONGITUDINAL DIVISIONS (feeders/silos):
Permanent structures dividing the hold longitudinally in two.
They reduce the effective VHM considerably.

3. BUNDLING / BAGGING:
Placing bagged grain on the cargo surface of a partly filled hold.
Covering the surface with a minimum of 16 bags (150 mm thickness).

4. STRAPPING:
Securing the cargo surface with polyester strapping.

A FULL HOLD:
Filled to the top of the hold and trimmed.
The hatchway area must also be filled.

A PARTLY FILLED HOLD:
No more than two holds may be partly filled (a Grain Code restriction).
Shifting boards or bagging are mandatory in these holds.`,
    bulletPoints: [
      "Shifting board tahılın kaymasını mekanik olarak engeller",
      "Longitudinal division VHM'yi azaltır",
      "Kısmen dolu ambarlarda bagging minimum 150 mm",
      "En fazla iki ambar kısmen dolu olabilir",
    ],
    keyPoints: [
      "Sabitlenme yöntemi Grain Loading Booklet'te belirtilir",
      "Shifting board dayanımı hesaplanmalıdır",
      "Kısmen dolu ambar sayısı minimize edilmelidir",
    ],
  },
  "grain-loading-plan": {
    title: "Tahıl Yükleme Planı Hazırlanması",
    introduction: "Tahıl yükleme planı, geminin stabilitesini ve Grain Code kriterlerini sağlayacak şekilde sistematik olarak hazırlanır.",
    content: `STEPS IN PREPARING THE PLAN:

1. SHIP DATA:
- Lightship weight and KG
- Hold grain/bale capacities
- Hydrostatic data
- The Grain Loading Booklet

2. CARGO INFORMATION:
- Type of grain and its SF
- Total cargo quantity
- Load/discharge ports

3. STOWAGE PLAN:
- How much cargo in which holds
- Full and partly filled holds
- Securing methods

4. STABILITY CALCULATION:
- The KG calculation (including all weights)
- The GM calculation (corrected for FSE)
- The VHM / GHM calculation
- Checking the angle of heel
- Checking the residual area

5. APPROVAL:
- The master's approval
- Port authority / surveyor approval
- Completing the Grain Code form

The plan must also cover all the intermediate loading conditions.`,
    bulletPoints: [
      "Hafif gemi ağırlığı ve ambar kapasiteleri temel verilerdir",
      "Tam ve kısmen dolu ambar kararı stabiliteye göre verilir",
      "Grain Code formu doldurulur ve onaylanır",
      "Ara durumlar dahil tüm aşamalar kontrol edilir",
    ],
    keyPoints: [
      "Yükleme planı kaptan ve surveyor onayı olmadan uygulanmaz",
      "Grain Code kriterleri her aşamada sağlanmalıdır",
      "Plan değişikliği durumunda hesaplar yenilenir",
    ],
  },

  // =====================================================
  // BÖLÜM 10-12 ANA KONULAR (Özet içerikler)
  // =====================================================
  "timber-deck": {
    title: "Kereste Güverte Yükleri",
    introduction: "Kereste güverte yükleri, özel istifleme ve bağlama kurallarına tabi olan ve geminin stabilitesini önemli ölçüde etkileyen yüklerdir.",
    content: `THE TIMBER CODE (Code of Safe Practice for Ships Carrying Timber Deck Cargoes):

STOWAGE RULES:
- The cargo must be stowed compactly (with minimum voids)
- The height must not exceed one third of the ship's breadth
- The freeing ports must be kept clear
- Safe access ways must be preserved

SECURING:
- Securing with wire rope or chain
- Lashings at least every 3 metres
- The use of uprights (stanchions)
- Checking the lashings during the voyage

STABILITY EFFECT:
- Deck cargo raises the KG
- Timber taking up water increases the weight → GM falls
- Water absorption can be of the order of 15-25%
- Icing adds further weight

FREEBOARD:
The timber load line differs from the normal load line.
Ships carrying timber deck cargo are permitted a deeper loading (additional reserve buoyancy).`,
    bulletPoints: [
      "Yükseklik gemi genişliğinin 1/3'ünü geçmemelidir",
      "Her 3 metrede bir bağlama zorunludur",
      "Islanan kereste ağırlığı %15-25 artabilir",
      "Timber Load Line daha derin yükleme izni verir",
    ],
    keyPoints: [
      "Kereste ıslandığında GM tehlikeli seviyelere düşebilir",
      "Seyir sırasında bağlama sıklıkla kontrol edilmelidir",
      "Güvenli geçiş yolları korunmalıdır",
    ],
  },
  "load-line-marks": {
    title: "Yükleme Hattı İşaretleri (TF/F/T/S/W/WNA)",
    introduction: "Yükleme hattı (load line / Plimsoll) işaretleri, Uluslararası Yükleme Hattı Sözleşmesi (1966 / 1988 Protokolü) uyarınca geminin farklı bölge ve mevsimlerde izin verilen azami yükleme draftını (asgari fribordu) gösterir.",
    image: "/diagrams/seamanship/load-line-isaretleri.svg",
    content: `THE LOAD LINE MARK:
The disc (ring) on the ship's side amidships, with the horizontal line through its centre, shows the Summer (S) line. The initials of the assigning classification society appear beside the disc. The horizontal "comb" lines forward of the vertical line attached to the disc are the seasonal/zonal load lines.

THE LINES (from the top down):
- TF — Tropical Fresh: the deepest loading.
- F — Fresh
- T — Tropical
- S — Summer: the reference line, passing through the centre of the disc.
- W — Winter
- WNA — Winter North Atlantic: the shallowest loading.

THE INTERVALS:
- T is above S and W is below S: each by 1/48 of the summer draft.
- F = S + FWA (the fresh water allowance); TF = T + FWA.
- WNA = W − 50 mm (on ships of 100 m or less in length).
- FWA (mm) = Displacement / (4 × TPC).

THE DECK LINE AND FREEBOARD:
The vertical distance between the deck line and the summer (S) line is the summer freeboard. The load lines are used together with the seasonal zones on the world chart (tropical, summer, winter, seasonal areas); the ship must not exceed the line appropriate to the zone and season it is in.`,
    bulletPoints: [
      "S (Yaz) hattı referanstır ve diskin merkezinden geçer",
      "TF en derin, WNA en sığ yükleme hattıdır",
      "T ve W, S'den yaz draftının 1/48'i kadar uzaktadır",
      "FWA = Deplasman / (4 × TPC); tatlı suda draft FWA kadar artar",
    ],
    keyPoints: [
      "Yükleme Hattı Sözleşmesi 1966 / 1988 Protokolü kapsamındadır",
      "Disk yanındaki harfler atayan klas kuruluşunu gösterir",
      "Gemi, bulunduğu bölge ve mevsimin yükleme hattını aşamaz",
      "Yeterli fribord = yeterli rezerv sephiye (reserve buoyancy)",
    ],
  },
  "livestock": {
    title: "Canlı Hayvan Taşımacılığı",
    introduction: "Canlı hayvan taşımacılığı, hayvan refahı ve gemi güvenliği açısından özel düzenlemelere tabidir.",
    content: `The carriage of live animals is governed by the WOAH (World Organisation for Animal Health) and by national legislation.

REQUIREMENTS:
- Adequate ventilation and shade
- Supply of clean water and feed
- A waste management system (drainage)
- Access to veterinary care
- Adequate space and a space calculation (m² per animal)

STABILITY EFFECT:
- The free movement of animals is similar to a free surface effect
- The risk of a mass shift if the animals panic
- Changes in the weight of the water and feed tanks

PENNING:
The animals are divided into pens to prevent a mass shift.
The size of the pens is determined by the species.`,
    bulletPoints: [
      "Yeterli havalandırma, su ve yem zorunludur",
      "Hayvan hareketi stabiliteyi etkiler",
      "Bölmelere ayırma toplu kayma riskini azaltır",
      "Veteriner bakımı sağlanmalıdır",
    ],
    keyPoints: [
      "Hayvan refahı uluslararası düzenlemelere tabidir",
      "Stabilite hesabında hayvan hareketi dikkate alınmalıdır",
      "Drenaj sistemi hijyen için kritiktir",
    ],
  },
  "ro-ro-cargo": {
    title: "Ro-Ro Yük Operasyonları",
    introduction: "Ro-Ro gemilerinde yükler tekerlekli araçlar olarak gemiye alınır ve çıkarılır; özel bağlama ve stabilite kontrolü gerektirir.",
    content: `RO-RO LOADING:
Cargo is driven on board over a ramp on its own wheels or by a tug master.

TYPES OF CARGO:
- Cars
- Trucks and articulated lorries
- Construction machinery
- Project cargo (on a wheeled platform)

SECURING:
Every vehicle is secured to the deck with lashing straps.
- Car: minimum 4 points
- Truck: minimum 8 points (depending on weight)
- The CSS Code securing calculations are applied

STABILITY:
Ro-Ro ships carry the risk of a high KG:
- Vehicles on the deck (a high centre of gravity)
- Large open deck areas (an effect similar to free surface)
- The risk of water ingress (bow/stern doors)

SAFETY:
- Ventilation (exhaust gases)
- Fire detection and extinguishing systems
- Keeping the watertight doors closed`,
    bulletPoints: [
      "Araçlar rampa ile yüklenir/boşaltılır",
      "Her araç minimum 4 noktadan bağlanır",
      "Yüksek KG ve açık güverte alanları stabilite riski oluşturur",
      "Su geçirmez kapılar seyirde kapalı tutulmalıdır",
    ],
    keyPoints: [
      "Ro-Ro gemileri özellikle hasarlı stabilite açısından hassastır",
      "Herald of Free Enterprise kazası Ro-Ro güvenlik kurallarını sıkılaştırmıştır",
      "Bow/stern door kapatılmadan seyir başlamaz",
    ],
    warnings: [
      "Sailing with the bow door open has had fatal consequences",
      "Vehicle lashings must be checked in bad weather",
    ],
  },
  "steel-cargo": {
    title: "Çelik ve Ağır Yük Taşıma",
    introduction: "Çelik ürünleri yüksek yoğunluklu yüklerdir ve istifleme, bağlama ve yapısal dayanım açısından özel dikkat gerektirir.",
    content: `TYPES OF STEEL PRODUCT:
- Steel coil
- Steel plate
- Steel pipe
- Steel billet/slab
- Rebar

STOWAGE:
- Steel coils: eye down or eye to side
- Dunnage: wooden cradles or V-blocks
- Weight distribution: checking the tank top limit
- Anti-shifting: wooden chocks and stoppers

SECURING:
- Securing with wire rope or chain
- Every coil must be secured independently
- The securing force is calculated according to the CSS Code

STRUCTURAL STRENGTH:
Because steel has a high density (SF ~ 0.3–0.5 m³/t):
- The tank top load density limit is checked
- It is compared against the tank top strength
- The load is spread with dunnage where necessary`,
    bulletPoints: [
      "Steel coil göz aşağı veya göz yana istif edilir",
      "Her coil bağımsız olarak bağlanmalıdır",
      "Ambar tabanı yük yoğunluğu limiti kontrol edilmelidir",
      "Dunnage ile yük dağılımı sağlanır",
    ],
    keyPoints: [
      "Çelik düşük SF'li ağır yüktür, deadweight belirleyicidir",
      "Kayma riski yüksektir, bağlama kritiktir",
      "Spreader veya dunnage yük dağılımı sağlar",
    ],
  },
  "project-cargo": {
    title: "Proje Yükleri",
    introduction: "Proje yükleri, boyut ve ağırlık olarak standart dışı olan, özel planlama ve elleçleme gerektiren tekil yüklerdir.",
    content: `EXAMPLES OF PROJECT CARGO:
- Wind turbine blades
- Oil platform modules
- Large transformers
- Industrial equipment
- Bridge sections

PLANNING:
1. Analysis of the cargo dimensions and weight
2. Checking the crane capacity
3. Deck strength calculation
4. Stability analysis (during the lift)
5. Design of the securing arrangement
6. The route and the weather
7. Insurance and legal requirements

OPERATIONAL RISKS:
- Loss of stability during the lift
- Wind effect (a large surface area)
- Damage to the deck
- Inadequate securing

Every project cargo is unique and requires individual planning.`,
    bulletPoints: [
      "Her proje yükü benzersizdir, standart prosedür yoktur",
      "Vinç kapasitesi ve güverte dayanımı kontrol edilir",
      "Kaldırma sırasında stabilite kritiktir",
      "Rüzgar etkisi büyük yüzey alanlı yüklerde hesaplanmalıdır",
    ],
    keyPoints: [
      "Proje yükü planlaması haftalar/aylar öncesinden başlar",
      "Marine warranty surveyor onayı gerekebilir",
      "Stabilite her aşamada kontrol edilmelidir",
    ],
  },
  "cargo-damage-types": {
    title: "Yük Hasar Türleri",
    introduction: "Deniz taşımacılığında yükler çeşitli nedenlerle hasar görebilir ve bu hasarlar ticari kayıplara yol açar.",
    content: `THE PRINCIPAL TYPES OF DAMAGE:

1. PHYSICAL DAMAGE:
- Crushing (shifting within the hold)
- Breakage (inadequate packaging)
- Deformation (overstowing)
- Scratching and impact

2. MOISTURE DAMAGE:
- Ship sweat
- Cargo sweat
- Ingress of rain water
- Sea water leakage

3. CONTAMINATION:
- Odour transfer (taint)
- Dust contamination
- Chemical contamination
- Residues of a previous cargo

4. TEMPERATURE DAMAGE:
- Overheating (self-heating)
- Freezing (passages through cold regions)
- Temperature fluctuations

5. BIOLOGICAL DAMAGE:
- Mould and fungus
- Insect infestation
- Decay (organic cargoes)

PREVENTING DAMAGE:
Correct stowage, suitable dunnage, ventilation control and cargo care.`,
    bulletPoints: [
      "Fiziksel, nem, kontaminasyon, sıcaklık ve biyolojik hasar ana kategorilerdir",
      "Nem hasarı en yaygın hasar türüdür",
      "Doğru istifleme ve dunnage hasarı önler",
      "Havalandırma kontrolü terlemeyi engeller",
    ],
    keyPoints: [
      "Hasar önleme maliyeti tazminat maliyetinden çok düşüktür",
      "Yükleme sırasında yük durumu kayıt altına alınmalıdır",
      "Hasar tespit edildiğinde Letter of Protest düzenlenmelidir",
    ],
  },
  "sweat-damage": {
    title: "Terleme Hasarı (Ship vs Cargo Sweat)",
    introduction: "Terleme, sıcaklık farkı nedeniyle ambar veya yük yüzeyinde nem yoğunlaşması olup yaygın bir yük hasar nedenidir.",
    content: `TWO TYPES OF SWEAT:

1. SHIP SWEAT:
Occurs on a passage from a warm region to a cold one.
The ship's structure (the steel shell) cools from outside.
The moist air in the hold condenses on the cold steel surfaces.
The condensed droplets drip onto the cargo.

Condition: outside air temperature < the dew point of the hold air

2. CARGO SWEAT:
Occurs on a passage from a cold region to a warm one.
Warm moist outside air enters the hold.
Moisture condenses on the cold cargo surface.

Condition: outside air dew point > the cargo surface temperature

PREVENTION:
- Dew point measurement and a ventilation decision
- Ship sweat: ventilate when entering a cold region
- Cargo sweat: do not ventilate when entering a warm region
- Use of desiccants (silica gel, calcium chloride)`,
    bulletPoints: [
      "Gemi terleme: Sıcaktan soğuğa seyirde oluşur",
      "Yük terleme: Soğuktan sıcağa seyirde oluşur",
      "Dew point ölçümü havalandırma kararını belirler",
      "Nem emici malzeme ek koruma sağlar",
    ],
    keyPoints: [
      "Havalandırma günlüğü tutulmalıdır",
      "Dew point ölçüm cihazı gemide bulunmalıdır",
      "Yanlış havalandırma kararı terlemeyi artırabilir",
    ],
  },
  "moisture-control": {
    title: "Nem Kontrolü ve Dew Point",
    introduction: "Nem kontrolü, yük hasarını önlemek için ambar atmosferinin dew point ölçümüne dayalı yönetim sürecidir.",
    content: `DEW POINT:
The temperature at which air of a given humidity begins to condense when it is cooled.

MEASUREMENT:
Hold and outside air measurements are taken with a psychrometer or an electronic dew point meter.

DECISION TABLE:
Outside air dew point < cargo temperature → ventilate (moisture is carried out)
Outside air dew point > cargo temperature → keep closed (moisture would condense)

RECORDS:
A dew point measurement must be taken every watch and entered in the log book.
These records are evidence in the event of a damage claim.`,
    bulletPoints: [
      "Dew point = Nemin yoğuşmaya başladığı sıcaklık",
      "Psikrometre veya elektronik cihaz ile ölçülür",
      "Dış dew point < Yük sıcaklığı → Havalandır",
      "Ölçüm ve kayıt hasar taleplerinde delil niteliğindedir",
    ],
    keyPoints: [
      "Her vardiyada ölçüm yapılmalıdır",
      "Kayıtlar dava sürecinde kritik önemdedir",
      "Havalandırma kararı bilimsel verilere dayandırılmalıdır",
    ],
  },
  "cargo-claims": {
    title: "Yük Hasarı Talepleri ve Sorumluluk",
    introduction: "Yük hasarı talepleri, taşıyıcının sorumluluğunu ve tazminat yükümlülüğünü belirleyen uluslararası kurallara göre değerlendirilir.",
    content: `THE BASIS OF LIABILITY:

Under the Hague-Visby Rules the carrier is bound:
- To keep the ship seaworthy
- To load, stow, carry and discharge the cargo carefully

THE CARRIER'S EXCEPTIONS:
- Perils of the sea (act of God)
- War, piracy
- Quarantine
- Damage arising from the nature of the cargo (inherent vice)
- Insufficient packing
- Latent defect

THE SHIP'S STAFF RESPONSIBILITIES:
1. Hold inspection before loading
2. Recording the condition of the cargo (Mate's Receipt)
3. A Letter of Protest for damaged cargo
4. Ventilation records
5. Cargo care during the voyage

DOCUMENTATION:
Good documentation protects the carrier. Photographs, records and letters of protest are critically important.`,
    bulletPoints: [
      "Hague-Visby Rules taşıyıcı sorumluluğunu belirler",
      "Taşıyıcı gemiyi denize elverişli tutmakla yükümlüdür",
      "Bazı durumlarda taşıyıcı muafiyet kazanır",
      "Belgelendirme sorumluluk tespitinde kritiktir",
    ],
    keyPoints: [
      "Letter of Protest zamanında düzenlenmelidir",
      "Fotoğraf ve kayıtlar dava delili olarak kullanılır",
      "Kaptan yükleme koşulları hakkında itiraz hakkına sahiptir",
    ],
  },
  "hague-visby": {
    title: "Hague-Visby Rules",
    introduction: "Hague-Visby Rules, deniz yoluyla yük taşımacılığında taşıyıcının hak ve sorumluluklarını düzenleyen temel uluslararası sözleşmedir.",
    content: `THE BASIC PRINCIPLES:

1. APPLICATION:
They apply to international carriage of goods under any bill of lading.
They apply to charter parties where a bill of lading is issued.

2. THE CARRIER'S OBLIGATIONS:
- To exercise due diligence to make the ship seaworthy
- To prepare the holds fit for the cargo
- To load, stow and carry the cargo carefully

3. LIMIT OF LIABILITY:
- Per package or per kilo (whichever is the higher)
- 666.67 SDR per package or 2 SDR per kg

4. PERIOD:
- From the moment of loading to the moment of discharge
- Time bar for suit: 1 year

5. EXCEPTIONS:
17 excepted perils are listed (error in navigation, fire, act of God, etc.)

The Rotterdam Rules and the Hamburg Rules are alternative conventions, but Hague-Visby is the most widely accepted.`,
    bulletPoints: [
      "Konşimento ile taşınan uluslararası taşımalarda geçerli",
      "Sorumluluk sınırı 666.67 SDR/paket veya 2 SDR/kg",
      "Dava açma süresi 1 yıl",
      "17 muafiyet nedeni tanımlanmıştır",
    ],
    keyPoints: [
      "Hague-Visby en yaygın kabul gören deniz taşımacılık sözleşmesidir",
      "Due diligence yükümlülüğü kritik öneme sahiptir",
      "Navigasyon hatası muafiyeti tartışmalı bir maddedir",
    ],
  },
  "solas-cargo": {
    title: "SOLAS Bölüm VI ve VII",
    introduction: "SOLAS (Safety of Life at Sea) Bölüm VI genel yük taşımacılığını, Bölüm VII tehlikeli yük taşımacılığını düzenler.",
    content: `CHAPTER VI – CARRIAGE OF CARGOES:

Regulation 1: Application
Regulation 2: Cargo information (the shipper's responsibilities)
Regulation 3: Oxygen depletion and gas emission
Regulation 5: Stowage and securing
Regulation 6: Additional requirements for bulk cargoes
Regulation 7: Loading grain (reference to the Grain Code)

CHAPTER VII – CARRIAGE OF DANGEROUS GOODS:

Part A: Dangerous goods in packaged form (the IMDG Code)
Part A-1: Dangerous goods in solid form in bulk (the IMSBC Code)
Part B: Chemical tankers (the IBC Code)
Part C: Gas carriers (the IGC Code)
Part D: The INF Code (radioactive cargoes)

IMPORTANT REQUIREMENTS:
- The VGM requirement (container weight verification)
- The Cargo Securing Manual
- The dangerous goods declaration and manifest
- Hold entry procedures`,
    bulletPoints: [
      "Bölüm VI genel yük, Bölüm VII tehlikeli yük kurallarını içerir",
      "VGM zorunluluğu Bölüm VI kapsamındadır",
      "Ambalajlı DG: IMDG Code, Dökme DG: IMSBC Code",
      "Cargo Securing Manual tüm gemilerde zorunludur",
    ],
    keyPoints: [
      "SOLAS yük taşımacılığının temel yasal çerçevesidir",
      "Yükleyici doğru yük bilgisi vermekle yükümlüdür",
      "Kaptan güvenli olmayan yükü reddetme hakkına sahiptir",
    ],
  },
  "marpol-cargo": {
    title: "MARPOL ve Yük Operasyonları",
    introduction: "MARPOL, yük operasyonlarından kaynaklanan deniz kirliliğini önlemeyi amaçlayan uluslararası sözleşmedir.",
    content: `THE MARPOL ANNEXES AND CARGO:

ANNEX I – OIL POLLUTION:
- Rules for discharging tanker cargo tank washings
- The requirement for Crude Oil Washing (COW)
- Slop tank management
- Oil Record Book entries

ANNEX II – NOXIOUS LIQUID SUBSTANCES (NLS):
- Chemical tanker cargo residues; every substance is assigned to a category in the IBC Code.
- Categories: X (major hazard — discharge into the sea prohibited, prewash mandatory and residues delivered to a reception facility), Y (hazard — limited discharge), Z (minor hazard — less restricted), OS (Other Substances — evaluated and falling outside Annex II; no pollution risk).
- General discharge conditions: the ship under way (≥7 knots self-propelled), ≥12 nautical miles from land, water depth ≥25 m, discharged below the waterline.
- For Category X a prewash and verification of the residue concentration are required.
- Tank washing requirements and the Cargo Record Book entry.

ANNEX III – HARMFUL SUBSTANCES IN PACKAGED FORM:
- The Marine Pollutant mark
- Stowage and labelling rules
- Reporting in the event of loss

ANNEX V – GARBAGE:
- Cargo wastes (dunnage, packaging)
- Discharge restrictions
- The Garbage Management Plan`,
    bulletPoints: [
      "Ek I petrol, Ek II kimyasal, Ek III ambalajlı zararlı maddeler",
      "COW tankerler için MARPOL zorunluluğudur",
      "Oil/Cargo Record Book tutulmalıdır",
      "Marine Pollutant işareti Ek III kapsamındadır",
    ],
    keyPoints: [
      "MARPOL ihlali ağır cezai yaptırımlar gerektirir",
      "Kayıt defterleri PSC denetimlerinde kontrol edilir",
      "Liman atık alım tesisleri kullanılmalıdır",
    ],
  },
  "psc-cargo-findings": {
    title: "PSC Yük Denetimleri ve Bulgular",
    introduction: "Port State Control (PSC) denetimleri, yük güvenliğine ilişkin eksiklikleri tespit eder ve ciddi bulgularda gemiyi tutabilir.",
    content: `PSC INSPECTION AREAS:

1. DOCUMENT CHECKS:
- The Cargo Securing Manual
- The DG Manifest and documents
- Stability calculations
- Loading computer approval
- The Grain Loading Booklet (grain ships)

2. PHYSICAL CHECKS:
- The condition of the cargo securing
- DG labelling and segregation
- Hatch cover weathertightness
- Hold ventilation
- Fire safety equipment

3. COMMON FINDINGS:
- Inadequate lashing
- Breaches of DG segregation
- An out-of-date CSM
- Missing stability calculations
- Leaking hatch covers
- No VGM

4. DETENTION:
Where the ship is found to present a safety risk it is not given clearance to sail.
The ship stays in port until the deficiencies are rectified.`,
    bulletPoints: [
      "Belge ve fiziksel kontroller eş zamanlı yapılır",
      "Yetersiz lashing ve DG ayrım ihlali yaygın bulgulardır",
      "CSM güncelliği kontrol edilir",
      "Tutulma operasyonel ve mali kayba yol açar",
    ],
    keyPoints: [
      "Düzenli iç denetim PSC bulgularını önler",
      "CSM ve DG belgeleri güncel tutulmalıdır",
      "Bağlama ekipmanları sertifikalı olmalıdır",
    ],
  },
  "ism-cargo": {
    title: "ISM Code ve Yük Operasyonları",
    introduction: "ISM Code, yük operasyonlarının sistematik ve güvenli yürütülmesi için prosedür ve sorumlulukları tanımlar.",
    content: `THE ISM CODE AND CARGO:

The ISM Code (International Safety Management Code) requires all shipboard operations to be managed through systematic procedures.

THE ELEMENTS RELATING TO CARGO OPERATIONS:

1. POLICY:
The company's safety and environmental protection policy covers cargo operations.

2. RESPONSIBILITIES:
- The master: overall responsibility for cargo safety
- The DPA: the link between the company and the ship
- The chief officer: day-to-day cargo operations

3. PROCEDURES:
- The procedure for preparing the loading plan
- The DG loading procedure
- The hold entry procedure
- Emergency procedures (cargo shift, fire)

4. RECORDS:
All cargo operations are recorded.
The records are retained for audit and investigation.

5. TRAINING:
Personnel taking part in cargo operations must be trained.
Drills must be held regularly.`,
    bulletPoints: [
      "ISM Code yük operasyonları için prosedür zorunluluğu getirir",
      "Kaptan yük güvenliğinin genel sorumlusudur",
      "Tüm operasyonlar kayıt altına alınır",
      "Personel eğitimi ve tatbikat zorunludur",
    ],
    keyPoints: [
      "ISM prosedürleri şirket SMS'inin parçasıdır",
      "Prosedür ihlali ISM audit bulgusuna yol açar",
      "Sürekli iyileştirme prensibi uygulanır",
    ],
  },
  "cargo-incidents": {
    title: "Yük Kazaları ve Alınan Dersler",
    introduction: "Tarihsel yük kazaları, mevcut güvenlik kurallarının oluşturulmasında belirleyici olmuş ve önemli dersler ortaya koymuştur.",
    content: `MAJOR CARGO CASUALTIES:

1. MV DERBYSHIRE (1980):
- A bulk carrier loaded with ore
- Foundered during a typhoon (44 crew lost)
- Outcome: hatch cover strength standards were strengthened

2. HERALD OF FREE ENTERPRISE (1987):
- A Ro-Ro passenger ferry
- Sailed with the bow door open
- 193 people lost their lives
- Outcome: the creation of the ISM Code

3. MV STELLAR DAISY (2017):
- A VLOC (Very Large Ore Carrier)
- Foundered in the South Atlantic (22 lost)
- Structural fatigue and liquefaction of the ore

4. THE NICKEL ORE CASUALTIES:
- Several bulk carriers foundered after loading nickel ore in the Philippines
- Outcome: the IMSBC Code Group A rules were tightened

5. MSC FLAMINIA (2012):
- A DG-related fire on a container ship
- Drifted at sea for months
- Outcome: the DG container stowage rules were updated`,
    bulletPoints: [
      "MV Derbyshire: Hatch cover standartlarını değiştirdi",
      "Herald of Free Enterprise: ISM Code'u doğurdu",
      "Nikel cevheri kazaları: IMSBC kurallarını sıkılaştırdı",
      "MSC Flaminia: DG istifleme kurallarını güncelledi",
    ],
    keyPoints: [
      "Her büyük kaza uluslararası kural değişikliğine yol açmıştır",
      "Kaza analizi güvenlik kültürünün temelidir",
      "Lessons learned paylaşımı tekrarı önler",
    ],
    warnings: [
      "The safety rules were written after lives were lost",
      "Complying with the rules saves lives",
    ],
  },

  // =====================================================
  // EK BAŞLIKLAR (2. tur domain taraması)
  // =====================================================
  "cargo-gear-swl": {
    title: "Gemi Yük Donanımı, Vinç/Derrick ve SWL",
    introduction: "Gemi yük donanımı; vinçler (crane), bumbalar (derrick) ve bunların aksesuarlarından (halat, makara, kanca, kilit) oluşur. Her bir donanımın güvenle kaldırabileceği yük, SWL (Safe Working Load) ile sınırlandırılmıştır ve kayıt altına alınır.",
    content: `SWL (SAFE WORKING LOAD):

The SWL is the maximum load a lifting appliance can safely carry in normal use. It is set by applying a safety factor to the breaking load of the gear and is marked legibly on the appliance.

COMPONENTS OF THE CARGO GEAR:

- Crane / derrick: the main appliance that lifts the load.
- Wires/ropes, blocks, shackles, hooks: the accessories; each has its own SWL.
- The weakest element determines the capacity of the whole system.

THE CARGO GEAR REGISTER:

All the lifting appliances and loose gear on board are recorded, together with their certificates, in a Cargo Gear Register (Register of Lifting Appliances). These records are checked in PSC inspections under ILO Convention 152 and the SOLAS requirements.

TESTING AND EXAMINATION:

- Proof load test: the gear is tested with a load above its SWL (at a proportion determined by the SWL). Normally repeated every 5 years.
- Annual thorough examination: carried out by a competent person.
- Visual check: the condition of the ropes, hooks and shackles is checked before every use.

SAFE USE:

The SWL must not be exceeded; no one must stand under a suspended load; shock loading must be avoided; the increase in leg forces in an angled lift must be taken into account.`,
    bulletPoints: [
      "SWL, donanımın güvenle kaldırabileceği maksimum yüktür ve işaretlenir.",
      "Sistemin kapasitesini en zayıf eleman belirler.",
      "Tüm donanım Cargo Gear Register'da sertifikalı olarak kayıtlıdır.",
      "Proof load test ~5 yılda bir, ayrıntılı muayene yıllık yapılır.",
    ],
    keyPoints: [
      "SWL aşılmaz; kopma yüküne güvenlik katsayısı uygulanır.",
      "ILO 152 ve SOLAS, kaldırma donanımı kayıt ve testini gerektirir.",
      "Açılı kaldırmada bacak kuvvetleri artar.",
    ],
    warnings: [
      "Never stand under a suspended load; a shock load can part the gear",
      "Uncertificated/untested gear must not be used",
    ],
  },
  "blu-code": {
    title: "BLU Code: Dökme Yük Yükleme/Boşaltma ve Gemi-Sahil Kontrolü",
    introduction: "BLU Code (Code of Practice for the Safe Loading and Unloading of Bulk Carriers), dökme yük gemilerinde aşırı/dengesiz yüklemenin neden olduğu yapısal hasar ve batma kazalarını önlemek için gemi ile terminal arasındaki güvenli yükleme/boşaltma uygulamasını düzenler.",
    content: `PURPOSE:

On bulk carriers, rapid and unbalanced loading can create excessive shear force and bending moment, straining the hull structure and even breaking the ship's back. The BLU Code standardises ship/terminal coordination in order to manage these risks.

THE LOADING/UNLOADING PLAN:

The master and the terminal representative prepare an agreed loading/unloading plan: the quantity for each hold, the sequence, the loading rate and the coordination of deballasting. The plan keeps the ship within the shear force/bending moment limits permitted by the loading computer.

THE SHIP/SHORE SAFETY CHECKLIST:

The Ship/Shore Safety Checklist is completed; the method of communication, the emergency stop signal, the loading rate and the means of contact are clearly agreed.

LOADING SEQUENCE AND STRESS CONTROL:

- The holds are filled in a defined sequence and in a balanced way (the alternate hold loading restrictions are observed).
- Deballasting is carried out in step with the loading rate.
- Draft, trim, shear force and bending moment are monitored at every stage with the loading computer.
- The loading rate is set so as not to exceed the deballasting capacity.

LESSONS FROM CASUALTIES:

Many bulk carrier losses have been caused by an incorrect loading sequence and excessive local loading; the BLU Code grew out of that experience.`,
    bulletPoints: [
      "Hızlı/dengesiz yükleme aşırı shear force ve bending moment oluşturur.",
      "Gemi-terminal üzerinde anlaşılan yükleme planı hazırlar.",
      "Ship-Shore Safety Checklist ve net iletişim zorunludur.",
      "Loading computer ile stres limitleri sürekli izlenir.",
    ],
    keyPoints: [
      "BLU Code dökme yük yükleme/boşaltmasında yapısal güvenliği hedefler.",
      "Yükleme hızı deballasting kapasitesiyle senkronize edilir.",
      "Alternate hold loading kısıtlarına uyulmalıdır.",
    ],
    warnings: [
      "Unplanned or excessive local loading can permanently deform the hull or break the ship's back",
      "The emergency stop signal and the means of communication must be agreed beforehand",
    ],
  },
  "hold-preparation": {
    title: "Ambar Hazırlığı ve Temizliği",
    introduction: "Yeni yük öncesi ambar hazırlığı; yük hasarını, kontaminasyonu ve yük taleplerini (claims) önlemenin temelidir. Gerekli temizlik standardı, taşınacak yüke ve önceki yüke göre belirlenir.",
    content: `CLEANLINESS STANDARDS:

- Hospital clean (grain clean): the highest standard; the hold completely clean, dry, odour-free and free of rust and residues of the previous cargo. Required for grain and sensitive cargoes.
- Normal clean: swept, with the residues of the previous cargo removed; sufficient for similar cargoes.
- Load on top (shovel clean): a rough clean; may be sufficient between certain bulk cargoes.

PREPARATION STEPS:

1. Complete removal of the previous cargo residues (sweeping/washing).
2. Washing with fresh/sea water if required, followed by drying (salt residues cause problems with some cargoes).
3. Cleaning and testing the bilge wells and checking the strum boxes.
4. Checking the hold paint/rust condition; repairs if required.
5. Ventilation and odour control.
6. Hatch cover weathertightness testing.

INSPECTION AND APPROVAL:

For some cargoes (particularly grain) an independent surveyor inspects the hold and passes it. Inadequate preparation leads to serious claims for cargo damage and contamination.`,
    bulletPoints: [
      "Standartlar: hospital/grain clean > normal clean > shovel clean.",
      "Önceki yük artığı, tuz ve nem hassas yüklerde hasar yaratır.",
      "Sintine kuyuları ve süzgeçler temizlenip test edilir.",
      "Hatch cover sızdırmazlığı kontrol edilir.",
    ],
    keyPoints: [
      "Gerekli temizlik standardı yeni yüke göre belirlenir.",
      "Tahıl/hassas yüklerde sörveyör onayı gerekebilir.",
      "Yetersiz hazırlık yük hasarı ve tazminat talebi doğurur.",
    ],
  },
  "gas-carrier-igc": {
    title: "Gaz Taşıyıcılar ve IGC Code (LNG/LPG)",
    introduction: "Sıvılaştırılmış gaz taşıyıcılar (LNG/LPG), gazı düşük sıcaklık ve/veya yüksek basınçta sıvı hâlde taşır. Bu gemiler IGC Code (International Code for the Construction and Equipment of Ships Carrying Liquefied Gases in Bulk) gereksinimlerine tabidir.",
    content: `CARGO CONDITIONS:

- Fully pressurised: the gas at ambient temperature in high-pressure tanks (usually small LPG carriers).
- Semi-pressurised/semi-refrigerated: moderate pressure plus partial refrigeration.
- Fully refrigerated: at atmospheric pressure and very low temperature (LNG ≈ -163 °C; LPG ≈ -42 °C).

TANK TYPES (containment):

- Independent tanks Type A, B and C (C: a pressurised cylindrical/spherical vessel).
- Membrane systems: particularly on large LNG carriers, a thin steel membrane plus insulation.
- The secondary barrier: protects the hull from low temperature in the event of a leak.

BOIL-OFF AND RELIQUEFACTION:

In refrigerated carriage some of the gas evaporates because of heat ingress (boil-off gas, BOG). On LPG carriers a reliquefaction plant returns the BOG to liquid; on LNG carriers the BOG is mostly used as fuel in the machinery.

HAZARDS AND SAFETY:

- Flammability and explosion (flammable vapour); gas detection and ventilation are critical.
- Very low temperature (cryogenic): the risk of skin burns and brittle fracture of steel.
- Asphyxiation: the gas displaces oxygen.
- An ESD (Emergency Shutdown) system, gas detectors and special PPE are mandatory.`,
    bulletPoints: [
      "Koşullar: tam basınçlı / yarı basınçlı / tam soğutmalı.",
      "Tank tipleri: Type A/B/C ve membran; ikincil bariyer şarttır.",
      "Boil-off: LPG'de reliquefaction, LNG'de yakıt olarak kullanım.",
      "IGC Code yapı ve donanım gereksinimlerini belirler.",
    ],
    keyPoints: [
      "LNG ≈ -163 °C, LPG ≈ -42 °C taşınır.",
      "Başlıca tehlikeler: parlayıcılık, kriyojenik soğuk, boğulma.",
      "ESD, gaz dedeksiyonu ve özel KKD zorunludur.",
    ],
    warnings: [
      "Contact with a cryogenic liquid causes severe burns and brittle fracture in steel",
      "An accumulation of gas creates a risk of explosion and asphyxiation",
    ],
  },
  "isgott-tanker-safety": {
    title: "ISGOTT ve Tanker Emniyeti",
    introduction: "ISGOTT (International Safety Guide for Oil Tankers and Terminals), petrol tankerleri ve terminallerinde güvenli operasyonun endüstri standardı rehberidir. Statik elektrik, parlayıcı buhar ve gemi-sahil arayüzü kaynaklı riskleri yönetir.",
    content: `THE STATIC ELECTRICITY HAZARD:

The movement of the liquid inside pipes and tanks builds up a static charge. If the accumulated charge discharges as a spark in a flammable vapour atmosphere it can cause ignition. Precautions: limiting the loading rate at the start (initial slow loading), preventing free fall and splashing, static-safe use of measuring equipment (sounding) and appropriate relaxation times.

FLAMMABLE ATMOSPHERE AND INERT GAS:

The tank atmosphere must not be within the flammable range. The inert gas system (IGS) makes the atmosphere non-combustible by reducing the oxygen in the tank (generally below 8% by volume); this is the basis of ISGOTT operations.

THE SHIP/SHORE SAFETY CHECK LIST:

The Ship/Shore Safety Check List is completed: the integrity of the manifold connections, emergency shutdown (ESD), communications, fire fighting readiness, the ban on smoking/naked lights, enclosed space rules and hot work control.

OPERATIONAL PRECAUTIONS:

- No smoking / control of naked lights and sources of sparks.
- Bonding/earthing and proper hose/manifold connections.
- Gas measurement and enclosed space entry permits.
- Preventing overflow and spillage; drip trays and scupper plugs.
- A continuous deck watch and readiness to respond quickly.`,
    bulletPoints: [
      "Statik elektrik birikimi parlayıcı ortamda tutuşma riski yaratır.",
      "Inert gas, tank oksijenini düşürerek yanmayı önler (ISGOTT temeli).",
      "Ship/Shore Safety Check List operasyon öncesi doldurulur.",
      "İlk yükleme yavaş yapılır (initial slow loading).",
    ],
    keyPoints: [
      "ISGOTT petrol tankeri/terminal operasyonlarının endüstri rehberidir.",
      "Statik, parlayıcı buhar ve gemi-sahil arayüzü ana risklerdir.",
      "Inert gas ve gaz ölçümü emniyetin temelidir.",
    ],
    warnings: [
      "Flammable vapour + a spark = an explosion; sources of ignition are strictly controlled",
      "Breaching the inert gas/enclosed space rules is fatal",
    ],
  },
};

export default function CargoTopicsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleSubtopicClick = (subtopicId: string, hasContent: boolean) => {
    if (hasContent) {
      setSelectedTopic(subtopicId);
    }
  };

  const closeModal = () => {
    setSelectedTopic(null);
  };

  const currentContent = selectedTopic ? topicContents[selectedTopic] : null;

  // Back tuşu açık bir yazıyı asla kapatmaz: konu anlatımı ekrandayken
  // geri tuşu yutulur, yazı ancak kendi kapatma düğmesiyle kapanır.
  useArticleBackGuard(Boolean(currentContent));

  return (
    <div
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-rose-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="relative z-40 bg-background/95 border-b border-border">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Yük Elleçleme ve İstifleme</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Accordion */}
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-4 max-w-4xl mx-auto pb-20">
            <Accordion type="single" collapsible className="space-y-2">
              {cargoTopics.map((topic) => {
                return (
                  <AccordionItem
                    key={topic.id}
                    value={topic.id}
                    className="border border-border/40 rounded-xl overflow-hidden bg-card/80"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left">
                        <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
                          {topic.number}
                        </span>
                        <span className="font-semibold text-foreground text-sm leading-tight">
                          {topic.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-1 mt-2">
                        {topic.subtopics.map((subtopic) => (
                          <motion.button
                            key={subtopic.id}
                            onClick={() => handleSubtopicClick(subtopic.id, subtopic.hasContent)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                              subtopic.hasContent && topicContents[subtopic.id]
                                ? "hover:bg-amber-500/5 cursor-pointer"
                                : "opacity-50 cursor-not-allowed"
                            }`}
                            whileTap={subtopic.hasContent && topicContents[subtopic.id] ? { scale: 0.98 } : {}}
                          >
                            <span className="text-sm text-foreground">{subtopic.title}</span>
                            {subtopic.hasContent && topicContents[subtopic.id] && (
                              <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            {/* Quick Links */}
            <section className="rounded-2xl border border-border/40 bg-card/80 p-6 mt-6">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg font-semibold text-foreground">Quick Access</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { title: "Yük Hesaplamaları", href: "/cargo/calculations" },
                  { title: "Draft Survey Formülleri", href: "/cargo/formulas" },
                ].map((resource, index) => (
                  <Link
                    key={index}
                    to={resource.href}
                    className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-[background-color,color,border-color,box-shadow,opacity,transform,width] hover:border-amber-500/40 hover:bg-background"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{resource.title}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </ScrollArea>
      </div>

      {/* Full Screen Content Modal */}
      <AnimatePresence>
        {selectedTopic && currentContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
            {/* Modal Header */}
            <div className="relative z-10 bg-background/95 border-b border-border">
              <div className="flex items-center justify-between px-4 py-3 max-w-4xl mx-auto">
                <h2 className="text-lg font-bold text-foreground truncate pr-4">
                  {currentContent.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <ScrollArea className="h-[calc(100vh-60px)]">
              <div className="p-4 space-y-6 pb-20 max-w-4xl mx-auto">
                {/* Introduction */}
                <div className="bg-amber-500/10 rounded-xl p-4 border-l-4 border-amber-500">
                  <p className="text-foreground font-medium leading-relaxed">
                    {currentContent.introduction}
                  </p>
                </div>

                {/* Topic Image/Diagram */}
                {currentContent.image && (
                  <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-border/40 bg-muted/20">
                    <img
                      src={currentContent.image}
                      alt={currentContent.title}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Main Content */}
                <StructuredLessonText text={currentContent.content} />

                {/* Bullet Points */}
                {currentContent.bulletPoints && currentContent.bulletPoints.length > 0 && (
                  <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                    <h3 className="font-semibold text-foreground mb-3">Önemli Noktalar</h3>
                    {currentContent.bulletPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                        <span className="text-sm text-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Formula */}
                {currentContent.formula && (
                  <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                    <h3 className="font-semibold text-foreground mb-2">
                      {currentContent.formula.name}
                    </h3>
                    <div className="bg-background rounded-lg p-3 font-mono text-lg text-center text-amber-600 dark:text-amber-400 mb-2">
                      {currentContent.formula.expression}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {currentContent.formula.description}
                    </p>
                  </div>
                )}

                {/* Examples */}
                {currentContent.examples && currentContent.examples.length > 0 && (
                  <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                    <h3 className="font-semibold text-foreground mb-2">Sayısal Örnek</h3>
                    {currentContent.examples.map((example, index) => (
                      <div key={index} className="text-sm text-foreground">
                        <p className="font-medium">Soru: {example.problem}</p>
                        <p className="text-muted-foreground mt-1">Çözüm: {example.solution}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Points */}
                {currentContent.keyPoints && currentContent.keyPoints.length > 0 && (
                  <div className="bg-amber-500/5 rounded-xl p-4">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-amber-500" />
                      Anahtar Bilgiler
                    </h3>
                    <div className="space-y-2">
                      {currentContent.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-amber-600 dark:text-amber-400 font-bold">{index + 1}.</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Warnings */}
                {currentContent.warnings && currentContent.warnings.length > 0 && (
                  <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20">
                    <h3 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Warnings
                    </h3>
                    <div className="space-y-2">
                      {currentContent.warnings.map((warning, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-destructive">⚠</span>
                          <span>{warning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
