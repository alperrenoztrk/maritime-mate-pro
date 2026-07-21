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
  Circle,
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
      { id: "density-correction", title: "Yoğunluk düzeltmesi", hasContent: true },
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
    title: "Tanker Operasyonları",
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
    content: `Yük elleçleme (cargo handling), deniz taşımacılığının temel operasyonel sürecidir. Yükün kaynağından gemiye, gemide taşınması ve varış noktasında boşaltılmasına kadar tüm aşamaları kapsar.

Yük elleçlemenin temel amaçları:
1. Yükün hasarsız taşınması
2. Geminin stabilitesinin korunması
3. Operasyonun güvenli yürütülmesi
4. Zaman ve maliyet verimliliği

Elleçleme sürecinin başlıca aşamaları:
- Yük planlaması (pre-stowage planning)
- Yükleme operasyonu (loading)
- Denizde yük bakımı (cargo care at sea)
- Tahliye operasyonu (discharging)

Kaptan, yük operasyonlarının genel sorumlusudur. Baş zabit (Chief Officer), günlük yük operasyonlarını yönetir ve yükleme planını hazırlar.

Yük operasyonlarında üç temel kısıt dikkate alınır: geminin yapısal dayanımı, stabilitesi ve trim durumu. Bu üç parametrenin tümü eş zamanlı olarak güvenli sınırlarda tutulmalıdır.`,
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
    content: `FİZİKSEL ÖZELLİKLERE GÖRE:
1. Genel yükler (General Cargo): Parça halinde, ambalajlı veya bağlanmış yükler. Kasalar, fıçılar, paletler.
2. Dökme kuru yükler (Dry Bulk): Tanecikli yapıda, ambalajsız. Tahıl, kömür, cevher, çimento.
3. Dökme sıvı yükler (Liquid Bulk): Tanklarda taşınan sıvılar. Ham petrol, kimyasallar, bitkisel yağlar.
4. Gaz halinde yükler: LNG, LPG, amonyak.

TAŞIMA ŞEKLİNE GÖRE:
- Konteyner yükler (FCL/LCL)
- Ro-Ro yükler (tekerlekli araçlar)
- Ağır yükler (heavy lift)
- Proje yükleri (project cargo)
- Soğutmalı yükler (reefer cargo)

TEHLİKE SINIFINA GÖRE (IMDG):
- Class 1: Patlayıcılar
- Class 2: Gazlar
- Class 3: Yanıcı sıvılar
- Class 4: Yanıcı katılar
- Class 5: Oksitleyiciler
- Class 6: Zehirli maddeler
- Class 7: Radyoaktif maddeler
- Class 8: Aşındırıcılar
- Class 9: Diğer tehlikeli maddeler`,
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
    content: `Yük planlaması şu faktörleri dikkate alır:

1. GEMİ KAPASİTESİ:
- Deadweight kapasitesi (DWT)
- Ambar hacimleri (bale/grain capacity)
- Güverte yük kapasitesi
- Tank kapasiteleri

2. STABİLİTE GEREKSİNİMLERİ:
- Minimum GM değeri
- Maksimum KG limitleri
- Trim sınırları
- FSE hesabı

3. YAPISAL DAYANIM:
- Ambar tabanı yük yoğunluğu limiti (t/m²)
- Güverte yük limitleri
- Hatch cover dayanımı
- Boyuna mukavemet (SF ve BM)

4. TAHLIYE SIRASI:
- Çoklu liman rotasında yükün alttan üste ve kıçtan pruva doğru yerleşimi
- "First in, last out" prensibi
- Ara limanlarda stabilite kontrolü

5. UYUMLULUK:
- Yüklerin birbirine uyumu
- Tehlikeli yük ayrım tablosu
- Terleme ve kontaminasyon riski`,
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
      "Yapısal limitlerin aşılması gemi kırılmasına yol açabilir",
      "Stabilite kontrolü yapılmadan yüklemeye başlanmamalıdır",
    ],
  },
  "cargo-docs": {
    title: "Yük Belgeleri ve Dokümantasyon",
    introduction: "Yük operasyonlarında kullanılan belgeler, yükün yasal, ticari ve operasyonel takibi için zorunludur.",
    content: `TEMEL YÜK BELGELERİ:

1. KONŞIMENTO (Bill of Lading - B/L):
Yükün gemiye alındığını belgeleyen, taşıma sözleşmesi niteliğinde resmi belgedir. Üç işlevi vardır: yükün makbuzu, taşıma sözleşmesi, mülkiyet belgesi.

2. YÜKLEME PLANI (Cargo Plan / Stowage Plan):
Yüklerin gemideki yerleşimini gösteren teknik çizim. Ambar, güverte ve tank bazında yük dağılımını gösterir.

3. MANİFESTO (Cargo Manifest):
Gemideki tüm yüklerin listesi. Yükleme limanı, tahliye limanı, yük cinsi, miktarı ve konşimento numarasını içerir.

4. TEHLİKELİ YÜK MANİFESTOSU (DG Manifest):
Tehlikeli yüklerin listesi, IMDG sınıfı, UN numarası ve istif pozisyonu bilgilerini içerir.

5. DRAFT SURVEY RAPORU:
Yükleme öncesi ve sonrası draft okumaları ile yük miktarının hesaplanması.

6. TALLEY SHEET:
Yükleme ve boşaltma sırasında parça yük sayımı.

7. MATE'S RECEIPT:
Yükün gemiye alındığını ve durumunu belgeleyen ilk makbuz.

8. LETTER OF PROTEST:
Yükün hasarlı teslim alınması veya hava koşulları gibi durumlarda düzenlenen itiraz mektubu.`,
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
    content: `OPERASYON ÖNCESİ GÜVENLİK:
- Ambar ve güverte temizliği kontrolü
- Havalandırma sistemi kontrolü
- Vinç ve ekipman bakım durumu
- İletişim sistemleri testi
- Acil durum planı gözden geçirme

OPERASYON SIRASINDAKİ GÜVENLİK:
- Yük kancalama ve sapan kullanımı
- Personelin yük altında durmaması
- Güvenli çalışma yükü (SWL) aşılmaması
- Rüzgar hızı limitlerine uyum
- Ambar kenarı güvenlik bariyerleri

KİŞİSEL KORUYUCU DONANIMLAR (KKD):
- Baret, güvenlik ayakkabısı, eldiven
- Yüksekte çalışma emniyet kemeri
- Tehlikeli yüklerde maske ve koruyucu giysi

SOLAS GEREKSİNİMLERİ:
- Yükleme operasyonları sırasında nöbet düzeni
- Giriş izni prosedürü (ambar girişi)
- Oksijen ölçümü (kapalı alan)
- Yangın devriye programı`,
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
      "Kapalı alan girişinde can kaybı riski yüksektir",
      "SWL aşımı ekipman kırılması ve ölüme yol açabilir",
    ],
  },

  // =====================================================
  // BÖLÜM 2 - İSTİFLEME PRENSİPLERİ
  // =====================================================
  "stowage-principles": {
    title: "Genel İstifleme Prensipleri",
    introduction: "İstifleme, yükün gemide güvenli, verimli ve hasarsız taşınmasını sağlayacak şekilde yerleştirilmesidir.",
    content: `İSTİFLEMENİN ALTIN KURALLARI:

1. GÜVENLİK: Yük seyir boyunca yerinden oynamamalıdır. Lashing ve securing yeterli olmalıdır.

2. YAPISAL KORUMA: Ambar tabanı ve güverte yük yoğunluğu limitleri aşılmamalıdır.

3. STABİLİTE: Yükün dikey ve yatay dağılımı geminin stabilitesini olumsuz etkilememelidir.

4. YÜK KORUMA: Yükler birbirini ve gemi yapılarını hasarlamamalıdır. Uyumsuz yükler ayrılmalıdır.

5. ERİŞİLEBİLİRLİK: Ara limanlarda boşaltılacak yüklere erişim mümkün olmalıdır.

6. VERİMLİLİK: Ambar hacmi ve deadweight kapasitesi en iyi şekilde kullanılmalıdır.

İSTİFLEME SIRASI:
- Ağır yükler altta, hafif yükler üstte
- Kırılgan yükler en üstte
- Nemli ve kuru yükler ayrı
- Kokulu yükler diğerlerinden uzakta

Ağır yüklerin altta olması düşük KG ve dolayısıyla iyi stabilite sağlar.`,
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
    content: `İstifleme faktörü (SF), bir ton yükün gemide işgal ettiği hacimdir.

Birim: m³/t veya ft³/ton

HESAPLAMA:
Gereken ambar hacmi = Yük miktarı (ton) × SF

ÖRNEK SF DEĞERLERİ:
- Demir cevheri: 0.35 – 0.56 m³/t
- Kömür: 1.10 – 1.40 m³/t
- Tahıl (buğday): 1.30 – 1.50 m³/t
- Tahıl (arpa): 1.60 – 1.80 m³/t
- Kereste: 1.80 – 3.00 m³/t
- Pamuk balyası: 1.80 – 2.50 m³/t
- Çimento (torbalı): 0.75 – 0.85 m³/t
- Genel kargo (ortalama): 1.30 – 1.80 m³/t

Düşük SF = Ağır yük, hacimden önce tonaj dolar (deadweight cargo)
Yüksek SF = Hacimli yük, tonajdan önce hacim dolar (measurement cargo)

Geminin bale capacity / grain capacity ile karşılaştırılarak yükün sığıp sığmayacağı kontrol edilir.`,
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
        problem: "3000 ton buğday (SF = 1.40 m³/t) yüklenecektir. Gereken ambar hacmi nedir?",
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
    content: `Broken stowage (kırık istifleme), ambar içinde yükler arasında ve yük ile ambar duvarları arasında kaçınılmaz olarak oluşan boşluklardır.

NEDEN OLUŞUR:
- Yüklerin düzensiz şekli
- Ambar köşe ve eğimleri
- Dunnage ve istifleme malzemesi
- Havalandırma boşlukları

TİPİK BROKEN STOWAGE DEĞERLERİ:
- Tahıl (dökme): %2 – %5
- Torbalı yük: %10 – %15
- Kasalı yük: %15 – %25
- Variller: %20 – %30
- Düzensiz şekilli yük: %25 – %40

HESAPLAMA:
Kullanılabilir hacim = Ambar hacmi × (1 – Broken Stowage %)

Broken stowage oranı yükseldikçe aynı ambara daha az yük sığar. Yük planlamasında bu kayıp mutlaka hesaba katılmalıdır.`,
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
        problem: "5000 m³ ambar hacmine kasalı yük yüklenecektir (BS = %20). Kullanılabilir hacim nedir?",
        solution: "Vnet = 5000 × (1 – 0.20) = 5000 × 0.80 = 4000 m³",
      },
    ],
  },
  "cargo-compatibility": {
    title: "Yük Uyumluluk Tablosu",
    introduction: "Farklı yüklerin aynı ambarda veya bitişik ambarlarda taşınabilirliği uyumluluk kurallarına tabidir.",
    content: `YÜK UYUMSUZLUK NEDENLERİ:
- Koku transferi (kontaminasyon)
- Nem ve terleme etkisi
- Kimyasal reaksiyon
- Sıcaklık farklılıkları

UYUMSUZ YÜK ÖRNEKLERİ:
- Çay ve kauçuk (koku transferi)
- Çimento ve şeker (nem ve toz)
- Tahıl ve kimyasallar (kontaminasyon)
- Meyve ve soğan (koku)

AYRIM SEVİYELERİ:
1. Aynı ambar: Uyumlu yükler yan yana yüklenebilir
2. Farklı ambar: Uyumsuz yükler ayrı ambarlara konulur
3. Ayrı kompartıman: Bir güverte veya bulkhead ile ayrılmalı
4. Farklı gemi: Kesinlikle aynı gemide taşınmamalı

Tehlikeli yükler için IMDG Code segregation table uygulanır.`,
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
    content: `HAVALANDIRMANIN AMACI:
1. Terleme (sweat) hasarını önlemek
2. Karbondioksit, metan ve diğer gazların uzaklaştırılması
3. Sıcaklık kontrolü
4. Tahıl ve organik yüklerde bozunmanın yavaşlatılması

HAVALANDIRMA TÜRLERİ:
- Doğal havalandırma: Rüzgar bacaları (ventilators)
- Mekanik havalandırma: Fanlar ile zorlamalı hava sirkülasyonu

ÜÇ KURALLIK SİSTEM:
Dew point karşılaştırmasına göre karar verilir:

Kural 1: Dış hava dew point'i < Yük sıcaklığı → Havalandır
Kural 2: Dış hava dew point'i > Yük sıcaklığı → Havalandırma
Kural 3: Sıcak bölgeden soğuk bölgeye seyir → Havalandır; soğuktan sıcağa → Kapatabilirsin

GEMİ TERLEMESİ (Ship Sweat):
Gemi çelik yapısı soğuduğunda nemli ambar havası karinada yoğunlaşır. Üstteki yüklere damlar.

YÜK TERLEMESİ (Cargo Sweat):
Sıcak nemli hava soğuk yük yüzeyinde yoğuşur.`,
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
    content: `DUNNAGE TÜRLERİ:
- Ahşap tahta ve kereste parçaları
- Polietilen örtüler
- Kraft kağıt
- Hava yastıkları (air bags / dunnage bags)
- Lastik matlar

DUNNAGE KULLANIM AMAÇLARI:
1. Nemden koruma: Tank top terlemesinden yükü ayırmak
2. Havalandırma: Yük altında hava sirkülasyonu sağlamak
3. Yük dağılımı: Ağırlığı eşit dağıtmak
4. Ayrım: Farklı yükleri ayırmak
5. Sürtünme: Yükün kaymasını engellemek

UYGULAMA KURALLARI:
- Dunnage temiz ve kuru olmalıdır
- Minimum 25 mm kalınlığında ahşap kullanılır
- Dunnage yük akışını engellememeli
- Çapraz döşeme hava dolaşımını artırır
- Ağır yüklerde dunnage kalınlığı artırılır`,
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
    content: `DENİZDE YÜKE ETKİ EDEN KUVVETLER:
Gemi hareketi sonucu yüke üç yönde ivme kuvveti etki eder:

1. ENİNE KUVVETLER (Transverse):
Yalpalama (rolling) sonucu oluşur. En büyük kuvvettir.
Tipik değer: 0.5g – 0.8g (geminin boyuna ve yükleme durumuna bağlı)

2. BOYUNA KUVVETLER (Longitudinal):
Yunuslama (pitching) ve dalga çarpması sonucu oluşur.
Tipik değer: 0.3g – 0.5g

3. DÜŞEY KUVVETLER (Vertical):
Heave hareketi sonucu oluşur.
Tipik değer: 0.2g – 0.5g

BAĞLAMA PRENSİBİ:
Bağlama ekipmanının toplam tutma kuvveti, yüke etki eden kayma kuvvetlerinden büyük olmalıdır.

Güvenlik faktörü: Minimum 1.5

Sürtünme kuvveti de yükün kaymasına karşı yardımcı olur. Çelik-çelik arası sürtünme katsayısı yaklaşık 0.3'tür.`,
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
      "Yetersiz bağlama yük kaymasına ve devrilmeye yol açar",
      "Bağlama ekipmanının SWL değeri aşılmamalıdır",
    ],
  },
  "css-code": {
    title: "CSS Code Gereksinimleri",
    introduction: "CSS Code (Code of Safe Practice for Cargo Stowage and Securing), IMO tarafından yayımlanan yük istifleme ve bağlama güvenlik kurallarıdır.",
    content: `CSS CODE YAPISI:
IMO Resolution A.714(17) ile kabul edilmiş ve düzenli güncellenen uygulama kodudur.

TEMEL GEREKSİNİMLER:
1. Cargo Securing Manual (CSM): Her gemide bulunması zorunlu belgedir. Gemi özelinde bağlama düzenlerini tanımlar.
2. Bağlama noktaları (securing points): Gemi üzerindeki D-ring, pad eye ve bollard gibi bağlama elemanlarının kapasiteleri belgelenmelidir.
3. Bağlama ekipmanı: Zincir, çelik halat, turnbuckle, lashing bar gibi ekipmanların MSL (Maximum Securing Load) değerleri kayıt altındadır.

CSS CODE EKLERİ:
- Annex 1: Güvenli istifleme prensipleri
- Annex 5: Yarı standart yükler için bağlama
- Annex 12: Konteyner güvenliği
- Annex 13: Bağlama kuvveti hesap yöntemi (İleri hesap)

ANNEX 13 HESAP YÖNTEMİ:
İvme kuvvetlerinin yük üzerindeki etkisini ve bağlama ekipmanının buna karşı koyma kapasitesini karşılaştırır.`,
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
    content: `BAŞLICA BAĞLAMA EKİPMANLARI:

1. BAĞLAMA ZİNCİRİ (Lashing Chain):
- Yüksek dayanımlı çelik
- Grade 80 veya Grade 100
- MSL: Kopma yükünün %50'si

2. ÇELİK HALAT (Wire Rope):
- 6×19 veya 6×37 örgü
- MSL: Kopma yükünün %80'i (turnbuckle ile)
- Genellikle heavy lift yüklerde

3. SENTETİK KAYIŞ (Webbing Strap):
- Polyester veya polipropilen
- MSL: Etikette belirtilir
- Hafif ve orta ağırlıklı yükler

4. TURNBUCKLE (Gerdirme Cihazı):
- Bağlamayı germe aracı
- Bottle screw tipi yaygın
- Periyodik bakım gerektirir

5. LASHING BAR / ROD:
- Çelik çubuk bağlama
- Konteyner bağlamada yaygın

6. BAĞLAMA NOKTALARI:
- D-ring, pad eye, cleat
- SWL değerleri gemi planında belirtilir
- Düzenli kontrol ve bakım zorunludur`,
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
    content: `TEMEL HESAP PRENSİBİ:

Toplam Bağlama Kapasitesi ≥ Güvenlik Faktörü × Kayma Kuvveti

KAYMA KUVVETİ:
Fkayma = m × a − μ × m × g × cos θ

Burada:
m: Yük kütlesi (ton)
a: İvme (m/s²) – CSS Code tablolarından
μ: Sürtünme katsayısı
g: Yerçekimi ivmesi (9.81 m/s²)
θ: Güverte eğimi

BAĞLAMA ETKİN KUVVETİ:
Bağlama halatının yatay düzlemle yaptığı açıya bağlıdır.
Fetkin = MSL × cos α

α: Bağlama açısı (yatay düzlemle)
Küçük açı = Yüksek etkin kuvvet
Büyük açı = Düşük etkin kuvvet

İdeal bağlama açısı: 30° – 60° arası`,
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
        problem: "MSL = 100 kN olan bir bağlama kayışı 45° açıyla uygulanmıştır. Etkin kuvvet nedir?",
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
    content: `KONTEYNER BAĞLAMA EKİPMANLARI:

1. TWIST LOCK (Manual & Automatic):
Konteynerleri birbirine ve hatch cover'a bağlayan kilit mekanizması. Alt konteynerde "base twist lock", üsttekilerde "intermediate twist lock" kullanılır.

2. LASHING BAR ve TURNBUCKLE:
Güverte üstü konteynerlere uygulanan çapraz bağlama sistemi. Genellikle 2. ve 3. kata kadar uygulanır.

3. STACKING CONE:
Konteynerlerin üst üste istiflenmesinde hizalama ve sabitleme sağlar.

4. BRIDGE FITTING:
İki konteyner arasına yerleştirilen köprü tipi sabitleme elemanı.

YÜKSEKLİK SINIRLAMASI:
- Ambar içi: Genellikle 5-9 kat
- Güverte üstü: 4-6 kat (gemi tipine göre)
- Üst katlarda ağırlık sınırlaması uygulanır

Ağır konteynerler alta, hafifler üste yerleştirilir.
Reefer konteynerler elektrik bağlantısına erişilebilir pozisyonlarda tutulur.`,
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
    content: `AĞIR YÜK TANIMI:
Genellikle tek parça ağırlığı 50 ton üzerindeki yüklerdir. Transformatörler, jeneratörler, endüstriyel ekipmanlar, vinçler bu kategoriye girer.

GÜVERTE DAYANIMI:
Ağır yüklerde ilk kontrol güverte veya ambar tabanının dayanımıdır.
Birim alan yük: Yük ağırlığı / Taban alanı ≤ İzin verilen yük yoğunluğu (t/m²)

Gerekirse yük altına spreader (dağıtıcı) plaka yerleştirilir.

BAĞLAMA HESABI:
Ağır yüklerde CSS Code Annex 13 detaylı hesap yöntemi uygulanır.

Üç yönde (enine, boyuna, düşey) kayma kuvvetleri hesaplanır ve bağlama düzeni buna göre tasarlanır.

BAĞLAMA DÜZENİ:
- Minimum 4 köşeden bağlama
- Welding pad (kaynaklı sabitleme) kullanılabilir
- Zincir + turnbuckle kombinasyonu yaygın
- Bağlama sonrası seyirde düzenli kontrol

STOPPER VE CHOCK:
Yükün kaymasını engellemek için çelik stopper veya ahşap chock yerleştirilir.`,
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
      "Güverte dayanımı aşılırsa yapısal hasar riski vardır",
      "Ağır yük kaldırma sırasında GM kritik seviyeye düşebilir",
    ],
  },

  // =====================================================
  // BÖLÜM 4 - DRAFT SURVEY
  // =====================================================
  "draft-survey-intro": {
    title: "Draft Survey Amacı ve Prensibi",
    introduction: "Draft survey, geminin su çekimindeki (draft) değişimden yola çıkarak yüklenen veya boşaltılan yük miktarını hesaplama yöntemidir.",
    content: `Draft survey, Arşimet prensibine dayanır:

Bir cismin batırdığı su miktarının ağırlığı, o cismin ağırlığına eşittir.

PRENSIP:
Yükleme öncesi ve sonrası geminin deplasmanı hesaplanır. Aradaki fark yük miktarını verir.

Yük Miktarı = Deplasman (sonra) − Deplasman (önce) − Sabit Ağırlıklar Farkı

UYGULAMA ADIMLARI:
1. İlk (initial) draft okumaları: Prova, pupa ve orta
2. Draftlardan ortalama draft hesabı
3. Trim ve hogging/sagging düzeltmeleri
4. Hidrostatik tablolardan deplasman okunması
5. Yoğunluk düzeltmesi
6. Ballast, yakıt, tatlı su gibi düşülen değerler
7. Son (final) draft okumaları ve aynı hesapların tekrarı
8. Net yük miktarının hesaplanması

Draft survey, dökme yüklerin ticari miktar tespitinde en yaygın yöntemdir.`,
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
    content: `OKUMA NOKTALARI:
6 noktadan draft okunur:
- Pruva sancak (FS), Pruva iskele tarafı (FP)
- Orta sancak (MS), Orta iskele tarafı (MP)
- Pupa sancak (AS), Pupa iskele tarafı (AP)

ORTALAMALAR:
dF = (FS + FP) / 2
dM = (MS + MP) / 2
dA = (AS + AP) / 2

OKUMA KURALLARI (METRİK SİSTEM):
- Rakam altı kenar: Rakam değeri
- Rakam ortası: Rakam + 5 cm
- Rakam üst kenar: Rakam + 10 cm

OKUMA ZORLUKLARI:
- Dalga ve çalkantıda ortalama alma
- Gece okumaları (aydınlatma gerekir)
- Deniz canlıları ve boya kabarması
- Parallax hatası (gözlemci açısı)

Okumaların eş zamanlı yapılması önemlidir. Ballast transferi veya yükleme devam ederken okuma yapılmamalıdır.`,
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
    content: `ÜÇ ORTALAMA YÖNTEM:

1. ARİTMETİK ORTALAMA (Mean of Means):
dmean = (dF + dM + dA) / 3
Sadece geminin düz durumda olduğu hallerde kullanılır.

2. QUARTER MEAN DRAFT:
dQM = (dF + 6 × dM + dA) / 8
Hogging veya sagging durumunda daha doğru sonuç verir.

3. DÜZELTILMIŞ ORTALAMA:
Trim düzeltmesi uygulanmış draft değeridir.

HOGGING VE SAGGING TESPİTİ:
- Hogging: (dF + dA) / 2 > dM → Gemi ortadan yukarı kalkık
- Sagging: (dF + dA) / 2 < dM → Gemi ortadan aşağı çökmüş

Quarter mean draft özellikle belirgin hogging veya sagging durumlarında daha doğru deplasman değeri verir.`,
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
    content: `TRİM:
Trim = dA − dF

İKİ DÜZELTME UYGULANIR:

1. BİRİNCİ TRİM DÜZELTMESİ (Δ₁):
LCF'nin (Yüzerlik Merkezinin Boyuna Konumu) orta noktadan farkından kaynaklanır.

Δ₁ = (Trim × LCFort × TPC × 100) / LBP

Pozitif veya negatif olabilir.

2. İKİNCİ TRİM DÜZELTMESİ (Δ₂):
Trimli durumda su hattı şeklinin değişmesinden kaynaklanan düzeltmedir.

Δ₂ = (Trim² × ΔMCT × 50) / LBP

Her zaman pozitiftir (deplasmanı artırır).

TOPLAM DEPLASMAN:
Δdüzeltilmiş = Δtablo + Δ₁ + Δ₂

Trim düzeltmeleri özellikle büyük trimlerde (1 metreden fazla) önemli fark yaratır.`,
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
    title: "Yoğunluk Düzeltmesi",
    introduction: "Hidrostatik tablolar tuzlu deniz suyu (1.025 t/m³) için hazırlanır; farklı yoğunluktaki sularda düzeltme gerekir.",
    content: `Hidrostatik tablolar 1.025 t/m³ yoğunluk için düzenlenmiştir.

Liman suyu farklı yoğunlukta olabilir:
- Tatlı su: 1.000 t/m³
- Nehir ağzı: 1.000 – 1.020 t/m³
- Deniz suyu: 1.020 – 1.030 t/m³

YOĞUNLUK DÜZELTMESİ:
Δdüzeltilmiş = Δtablo × (ρdock / 1.025)

Burada:
ρdock: Liman suyu yoğunluğu (t/m³)

Yoğunluk ölçümü:
- Hidrometre ile ölçülür
- Su numunesi deniz seviyesinden alınır
- Sıcaklık düzeltmesi uygulanabilir

Düşük yoğunlukta gemi daha fazla batar (daha büyük draft okur) ancak deplasman değişmez.`,
    bulletPoints: [
      "Tablolar 1.025 t/m³ için hazırlanmıştır",
      "Farklı yoğunlukta düzeltme zorunludur",
      "Δdüz = Δtablo × (ρdock / 1.025)",
      "Hidrometre ile yoğunluk ölçülür",
    ],
    formula: {
      name: "Yoğunluk Düzeltmesi",
      expression: "Δcorrected = Δtable × (ρdock / 1.025)",
      description: "ρdock: Liman suyu yoğunluğu (t/m³). Düşük yoğunlukta deplasman azaltılır.",
    },
    examples: [
      {
        problem: "Tablodan okunan deplasman 15000 ton, liman suyu yoğunluğu 1.010 t/m³. Düzeltilmiş deplasman?",
        solution: "Δ = 15000 × (1.010 / 1.025) = 15000 × 0.9854 = 14780.5 ton",
      },
    ],
  },
  "deductibles": {
    title: "Düşülen Değerler (Deductibles)",
    introduction: "Draft survey sonucunda hesaplanan deplasmanlardan ballast, yakıt, tatlı su ve diğer sıvıların ağırlığı düşülerek net yük miktarı bulunur.",
    content: `Net yük hesabı:
Yük = (Δfinal − Δinitial) − (Deductibles_final − Deductibles_initial)

DÜŞÜLEN KALEMLER:
1. BALLAST SUYU:
Her tankın sounding veya ullage ölçümü yapılır. Tank kalibrasyon tablolarından hacim okunur ve yoğunlukla çarpılarak ağırlık bulunur.

2. YAKIT (HFO, MGO, MDO):
Her yakıt tankının sounding ölçümü yapılır. Sıcaklığa göre yoğunluk düzeltmesi uygulanır.

3. TATLI SU:
Tatlı su tanklarının seviye ölçümü.

4. SLOP / SLUDGE:
Atık yağ ve slop tankları.

5. DİĞER:
Constant (sabit ağırlık): Mürettebat, kumanya, boya, yedek parça vb. Genellikle her survey'de sabit kabul edilir.

ÖLÇÜM DOĞRULUĞU:
- Her tank ayrı ayrı ölçülür
- Sıcaklık düzeltmeleri uygulanır
- Ballast tankları mümkünse tam dolu veya boş tutulur
- Kalan ballast (ROB) dikkatle hesaplanır`,
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
    content: `BAŞLICA DÖKME YÜK TÜRLERİ:

1. CEVHERLER:
- Demir cevheri (iron ore): SF ≈ 0.35–0.56 m³/t
- Boksit, manganez, nikel
- Çok ağır, deadweight sınırlayıcı

2. KÖMÜR:
- SF ≈ 1.10–1.40 m³/t
- Kendiliğinden yanma riski
- Metan gazı salınımı

3. TAHILLAR:
- Buğday, mısır, arpa, soya
- SF ≈ 1.30–1.80 m³/t
- Kayma riski (Grain Code uygulanır)

4. ÇİMENTO:
- Torbalı veya dökme
- Nem hassas, su geçirmez ambalaj

5. GÜBRE:
- Üre, amonyum nitrat
- Bazıları IMDG kapsamında

6. MİNERALLER:
- Kum, çakıl, kireçtaşı
- Düşük SF, yapısal dayanım kontrolü gerekir

IMSBC Code tüm dökme yükleri üç gruba ayırır:
- Grup A: Sıvılaşabilir yükler
- Grup B: Kimyasal tehlike arz eden yükler
- Grup C: Ne A ne B grubuna girmeyen yükler`,
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
    content: `IMSBC CODE YAPISI:

SOLAS Bölüm VI kapsamında zorunlu olan bu kod, dökme katı yüklerin güvenli taşınması için kurallar belirler.

BÖLÜMLER:
1. Genel hükümler ve tanımlar
2. Yükleme öncesi genel önlemler
3. Taşıma ve dikkat edilecekler
4. Dökme yük tehlike değerlendirmesi
5. Trimleme
6. Yüklere özgü bilgi formları (individual schedules)

YÜK GRUPLARI:
- Grup A: Sıvılaşabilir yükler (nickel ore, iron ore fines vb.)
- Grup B: Kimyasal tehlike (DRI, sulphur, coal vb.)
- Grup C: Diğerleri (kum, taş, vs.)
- Bazı yükler birden fazla gruba dahil olabilir (A ve B)

HER YÜK İÇİN VERİ SAYFASI İÇERİR:
- Yük tanımı ve özellikleri
- Tehlike sınıfı
- İstifleme ve ayrım kuralları
- Yükleme limitleri
- Taşıma sırasında önlemler
- Acil durum prosedürleri`,
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
    content: `SIVILAŞMA NEDİR?
Bazı dökme yükler (ince taneli mineraller, cevherler) geminin titreşim ve salınımı etkisiyle sıvı gibi davranmaya başlayabilir. Bu durum kargoyu bir tarafa kaydırarak geminin alabora olmasına yol açar.

FMP (Flow Moisture Point):
Yükün sıvı gibi akmaya başladığı nem içeriği oranıdır.
Laboratuvar testleri ile belirlenir.

TML (Transportable Moisture Limit):
Güvenli taşınabilir maksimum nem oranıdır.
TML = FMP × 0.9 (FMP'nin %90'ı)

KONTROL MEKANİZMASI:
1. Yükleyici, yükün nem içeriğini (moisture content) ve TML sertifikasını sunar
2. Yükün gerçek nem içeriği ≤ TML olmalıdır
3. Nem içeriği > TML ise yük reddedilir veya kurutulur

CAN TESTİ (Pratik test):
Bir kabın yarısına yük konur ve masaya 25 kez vurulur. Yüzeyinde serbest nem belirirse yükleme yapılmamalıdır.`,
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
      "TML üzerinde nem içeriği olan yük kesinlikle yüklenmemelidir",
      "Sıvılaşma aniden gerçekleşir ve gemiyi alabora edebilir",
    ],
  },
  "group-a-cargoes": {
    title: "Grup A Yükler (Liquefiable)",
    introduction: "Grup A yükler, belirli nem oranı üzerinde sıvılaşma riski taşıyan ve özel önlemlerle taşınması gereken dökme yüklerdir.",
    content: `GRUP A YÜK ÖRNEKLERİ:
- Nikel cevheri (nickel ore)
- İnce demir cevheri (iron ore fines)
- Boksit (bazı tipleri)
- Fluorspar
- Bazı konsantreler (bakır, çinko, kurşun)

YÜKLEME ÖNCESİ KONTROLLER:
1. Shipper's Declaration (yükleyici beyanı)
2. TML sertifikası (akredite laboratuvardan)
3. Nem içeriği test sonucu
4. Yükün görsel ve dokunsal kontrolü
5. Can testi uygulaması

SEYİR SIRASINDA ÖNLEMLER:
- Ambar havalandırma kapaklarının kapalı tutulması
- Yük yüzeyinin düzenli kontrolü (mümkünse)
- Bilge pompalarının çalışır durumda tutulması
- Hava koşullarına göre rota değişikliği

GEÇMİŞTE YAŞANAN KAZALAR:
Nickel ore yüklü gemilerin alabora olması sonucu IMSBC Code'da Grup A yük kuralları sıkılaştırılmıştır.`,
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
      "Grup A yüklerin sıvılaşması dünya genelinde en ölümcül kargo kazalarına yol açmıştır",
      "Nem limiti aşıldığında KESİNLİKLE yükleme yapılmamalıdır",
    ],
  },
  "group-b-cargoes": {
    title: "Grup B Yükler (Kimyasal Tehlike)",
    introduction: "Grup B yükler kimyasal tehlike arz eden dökme katı yüklerdir ve özel taşıma kurallarına tabidir.",
    content: `GRUP B YÜK ÖRNEKLERİ VE TEHLİKELERİ:

1. KÖMÜR (Coal):
- Metan gazı salınımı (patlama riski)
- Kendiliğinden yanma (self-heating)
- Oksijen tüketimi (kapalı alan tehlikesi)

2. DRI (Direct Reduced Iron):
- Su ile temas ettiğinde hidrojen üretir
- Kendiliğinden yanma riski

3. KÜKÜRT (Sulphur):
- Yanıcı toz oluşumu
- SO₂ gazı salınımı
- Statik elektrik riski

4. GÜBRELER:
- Amonyum nitrat: Patlayıcı potansiyel
- Üre: Nem hassas

ORTAK ÖNLEMLER:
- Yükleme öncesi ambar muayenesi
- Gaz ölçüm cihazlarının hazırlanması
- Ambar girişinde enclosed space prosedürü
- Yangın önleme tedbirleri
- Havalandırma kurallarına uyum`,
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
      "Kömür ambarında oksijen seviyesi düşebilir; giriş ölümcül olabilir",
      "DRI tankları su alırsa patlama riski doğar",
    ],
  },
  "trimming-bulk": {
    title: "Dökme Yük Trimlenmesi",
    introduction: "Trimleme, dökme yükün ambar içinde düzgün yayılmasını sağlamak için yapılan seviyeleme işlemidir.",
    content: `TRİMLEMENİN AMACI:
Dökme yük konik şekilde yığılır. Yükleme konveyörünün altında yığın oluşur ve ambar kenarları boş kalır. Bu durum:
- Yükün kayma riskini artırır
- Yerel yapısal aşırı yüklemeye neden olabilir
- Ambar kapasitesinin tam kullanılmasını engeller

SOLAS GEREKSİNİMİ:
SOLAS Bölüm VI, Kural 6: Dökme yükler ambar sınırlarına kadar trimlenmelidir (reasonably level).

TRİMLEME YÖNTEMLERİ:
1. Mekanik trimleme: Buldozer veya kepçe ile
2. Konveyör hareketi: Yükleme konveyörünün hareket ettirilmesi
3. Grab ile düzeltme: Vinç grab'ı ile seviyeleme

ÖNEMİ:
Trimlenmemiş yük denizde kayabilir ve gemiyi devirmemese bile tehlikeli list oluşturabilir.

Tahıl yüklerinde trimleme özellikle kritiktir; Grain Code spesifik trimleme gereksinimleri belirler.`,
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
    content: `IMDG TEHLİKE SINIFLARI:

Sınıf 1: PATLAYICILAR
1.1 – Toplu patlama tehlikesi
1.2 – Saçılma tehlikesi
1.3 – Yangın tehlikesi
1.4 – Küçük patlama tehlikesi
1.5 – Çok duyarsız patlayıcılar
1.6 – Son derece duyarsız

Sınıf 2: GAZLAR
2.1 – Yanıcı gazlar
2.2 – Yanıcı olmayan, zehirsiz gazlar
2.3 – Zehirli gazlar

Sınıf 3: YANICI SIVILAR
Alt sınıf yok. Parlama noktasına göre paketleme grubu belirlenir.

Sınıf 4: YANICI KATILAR
4.1 – Yanıcı katılar
4.2 – Kendiliğinden yanmaya yatkın
4.3 – Su ile temas ettiğinde yanıcı gaz çıkaran

Sınıf 5: OKSİTLEYİCİLER
5.1 – Oksitleyici maddeler
5.2 – Organik peroksitler

Sınıf 6: ZEHİRLİ MADDELER
6.1 – Zehirli
6.2 – Bulaşıcı

Sınıf 7: RADYOAKTİF MADDELER

Sınıf 8: AŞINDIRICI MADDELER

Sınıf 9: DİĞER TEHLİKELİ MADDELER`,
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
    content: `ETİKETLEME GEREKSİNİMLERİ:

1. TEHLİKE ETİKETLERİ (Labels):
Her paket üzerine sınıfına uygun tehlike etiketi yapıştırılır.
- Etiket boyutu: Minimum 100 × 100 mm
- Köşe döndürülmüş kare (elmas) şekil
- Sınıfa özel renk ve sembol

2. PLACARD (Büyük Etiket):
Konteyner ve tanklara yapıştırılır.
- Boyut: Minimum 250 × 250 mm
- Konteynerin dört yüzüne

3. UN NUMARASI:
Her tehlikeli maddenin dört haneli tanımlama numarası.
Örnek: UN 1203 = Benzin

4. PROPER SHIPPING NAME:
Maddenin IMDG Code'daki resmi taşıma adı.

5. İŞARETLER (Marks):
- Deniz kirliliği işareti (marine pollutant)
- Yönlendirme okları (bu taraf yukarı)
- Limited/Excepted quantity işaretleri`,
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
    content: `AYRIM SEVİYELERİ (En düşükten en yükseğe):

1. "AWAY FROM" (Uzak tut):
Farklı ambarlarda veya aynı ambarda yatay olarak 3 m uzaklıkta.

2. "SEPARATED FROM" (Ayrılmış):
Farklı ambarlarda veya bölmelerde. Güverte üstünde minimum 6 m yatay mesafe.

3. "SEPARATED BY A COMPLETE COMPARTMENT" (Tam bir bölme ile ayrılmış):
Aralarında en az bir tam bölme (ambar) olmalı.

4. "SEPARATED LONGITUDINALLY" (Boyuna ayrılmış):
Aralarında en az bir ambar + güverte ile ayrılmalı. VEYA minimum 24 m yatay mesafe.

AYRIM TABLOSU KULLANIMI:
Satır ve sütunlarda IMDG sınıfları yer alır.
Kesişme hücresindeki sembol ayrım seviyesini belirtir.

X = Ayrım kurallarına bakınız (özel durumlar)
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
      "Uyumsuz tehlikeli yüklerin yakın istiflenmesi yangın ve patlamaya yol açabilir",
      "Ayrım kuralı ihlali ciddi yasal sonuçlar doğurur",
    ],
  },
  "imdg-stowage": {
    title: "Tehlikeli Yük İstifleme Kuralları",
    introduction: "Tehlikeli yüklerin istiflenmesi IMDG Code'un belirlediği özel kurallara tabidir ve sınıfa göre güverte üstü veya altı yerleşim belirlenmiştir.",
    content: `İSTİFLEME KATEGORİLERİ:

IMDG Code her madde için istifleme kategorisi belirler:

Kategori A: Güverte üstü veya altı (kısıtlama yok)
Kategori B: Güverte üstü veya altı (koşullara bağlı)
Kategori C: Sadece güverte üstü
Kategori D: Sadece güverte üstü (özel koşullar)
Kategori E: Güverte üstü veya altı (özel koşullar)

GENEL İSTİFLEME KURALLARI:
1. Yaşam mahalline minimum mesafe korunmalıdır
2. Yiyecek maddelerine yakın istiflenmemelidir
3. Isı kaynaklarından uzak tutulmalıdır
4. Güneş ışığına maruz kalmamalıdır (bazı sınıflar)
5. Yangın söndürme ekipmanına erişim korunmalıdır
6. Havalandırma gereksinimleri sağlanmalıdır

KONTEYNER GEMİLERİNDE:
DG konteynerler bay planında özel olarak işaretlenir.
Ayrım mesafeleri konteyner boyu (TEU) cinsinden hesaplanır.`,
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
    content: `ZORUNLU BELGELER:

1. DG DECLARATION (Tehlikeli Yük Beyanı):
Yükleyici tarafından hazırlanır. UN numarası, proper shipping name, sınıf, paketleme grubu ve acil müdahale bilgilerini içerir.

2. DG MANIFEST / LIST:
Gemideki tüm tehlikeli yüklerin listesi. İstif pozisyonları belirtilir.
SOLAS Bölüm VII gereği zorunludur.

3. KONTEYNER / ARAÇ PAKETLEME SERTİFİKASI:
Konteynerin IMDG kurallarına uygun paketlendiğini belgeler.

4. EMS (Emergency Schedule):
Her DG maddesi için acil müdahale prosedürü.
EmS Guide'dan alınır.

5. MFAG (Medical First Aid Guide):
Tehlikeli maddelerle temas halinde ilk yardım rehberi.

6. SPECIAL LIST / STOWAGE PLAN:
DG yüklerin gemideki konumlarını gösteren plan.
Liman otoritesine verilir.`,
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
    content: `ACİL DURUM TÜRLERİ:
1. Yangın (en yaygın)
2. Sızıntı / dökülme
3. Kimyasal maruz kalma
4. Patlama riski

EmS KULLANIMI:
Her tehlikeli madde için iki bölümlü EmS kodu vardır:
- F (Fire): Yangın söndürme prosedürü
- S (Spillage): Dökülme müdahale prosedürü

Örnek: EmS F-A, S-A

MÜDAHALE PRENSİPLERİ:
1. Mürettebat güvenliği her şeyden önce gelir
2. Rüzgar üstünde kalınmalıdır
3. Uygun KKD giyilmelidir
4. Bulaşık su denize akışı engellenmelidir (MARPOL)
5. Bölgesel MRCC'ye bilgi verilmelidir

MUSTER LIST:
DG acil durumları için özel görev dağılımı muster list'te yer almalıdır.

DRILLER:
DG acil durumu tatbikatları düzenli yapılmalıdır.`,
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
      "Yanlış söndürücü kullanımı durumu kötüleştirebilir",
      "Kapalı alanda DG müdahalesi ölümcül olabilir",
    ],
  },

  // =====================================================
  // BÖLÜM 7 - KONTEYNER OPERASYONLARI
  // =====================================================
  "container-types": {
    title: "Konteyner Tipleri ve Boyutları",
    introduction: "Konteynerler ISO standartlarına göre üretilir ve taşınacak yükün özelliğine göre farklı tiplerde tasarlanmıştır.",
    content: `STANDART BOYUTLAR:

20' Konteyner (1 TEU):
- Dış boyutlar: 6.058 × 2.438 × 2.591 m
- İç hacim: ~33.2 m³
- Maksimum brüt ağırlık: 30,480 kg
- Tara: ~2,300 kg

40' Konteyner (2 TEU):
- Dış boyutlar: 12.192 × 2.438 × 2.591 m
- İç hacim: ~67.7 m³
- Maksimum brüt ağırlık: 30,480 kg

40' High Cube (HC):
- Yükseklik: 2.896 m (standarttan 30 cm yüksek)
- İç hacim: ~76.3 m³

KONTEYNER TİPLERİ:
- Dry (standart): Genel kuru yükler
- Reefer: Soğutmalı, sıcaklık kontrollü
- Open Top: Üstü açık, yüksek yükler
- Flat Rack: Kenarsız, geniş/ağır yükler
- Tank Container: Sıvı yükler
- Ventilated: Havalandırmalı (kahve, kakao vb.)
- Bulk Container: Dökme katı yükler için
- Platform: Sadece taban`,
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
    content: `VGM NEDİR?
SOLAS Bölüm VI, Kural 2 gereği 2016'dan itibaren zorunludur. Her konteynerin gerçek brüt ağırlığı yükleme öncesinde doğrulanmalıdır.

İKİ DOĞRULAMA YÖNTEMİ:

Yöntem 1: TARTIM
Dolu konteynerin tamamı kalibre edilmiş tartı ile tartılır.

Yöntem 2: HESAPLAMA
Konteyner tara ağırlığı + tüm içeriklerin tartılmış ağırlıkları toplamı.

VGM olmayan konteyner gemiye yüklenmez.

VGM SORUMLULUĞU:
Yükleyici (shipper) VGM'yi doğrulamakla yükümlüdür.
Terminal VGM bilgisini gemi planlayıcısına iletir.
Kaptan VGM olmayan konteyneri reddetmelidir.

VGM'NİN ÖNEMİ:
Yanlış ağırlık bilgisi:
- Konteyner yığınının devrilmesi
- Geminin beklenmeyen list yapması
- Vinç kapasitesinin aşılması
- Stabilite hesabının yanlış çıkması`,
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
    content: `BAY PLAN NUMARALANDIRMA SİSTEMİ:

Üç haneli konum kodu: BAY – ROW – TIER

BAY (Boyuna konum):
- Tek sayılar: 20' konteyner pozisyonları (01, 03, 05...)
- Çift sayılar: 40' konteyner pozisyonları (02, 06, 10...)
- Pruva'dan pupaya doğru artar

ROW (Enine konum):
- Merkez hattı: 00
- Sancak: 01, 03, 05... (tek)
- İskele tarafı: 02, 04, 06... (çift)

TIER (Düşey konum):
- Ambar içi: 02, 04, 06... (alttan yukarı)
- Güverte üstü: 82, 84, 86... (alttan yukarı)

ÖRNEK: 140682
Bay 14, Row 06 (iskele tarafı 3. sıra), Tier 82 (güverte üstü 1. kat)

PLANLAMA KRİTERLERİ:
- Ağırlık dağılımı (ağır altlara)
- Tahliye sırası (üstteki önce çıkar)
- DG ayrım kuralları
- Reefer elektrik bağlantısı
- Stabilite ve trim optimizasyonu`,
    bulletPoints: [
      "Bay-Row-Tier üç boyutlu konum sistemidir",
      "Tek bay = 20', çift bay = 40'",
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
    content: `REEFER KONTEYNER ÖZELLİKLERİ:
- Dahili soğutma/ısıtma ünitesi
- Sıcaklık aralığı: -30°C ile +30°C
- Elektrik beslemesi: 380/440V, 3 faz, 50/60 Hz
- Dijital sıcaklık kontrol paneli
- Havalandırma damper kontrolü

TAŞINAN YÜKLER:
- Meyve ve sebzeler
- Et ve balık ürünleri
- Süt ürünleri
- İlaçlar (farmasötik)
- Çiçekler
- Bazı kimyasallar

TİPİK TAŞIMA SICAKLIKLARI (yaklaşık, gönderici talimatı esastır):
- Muz: +13°C ile +14°C (12°C altında soğuk hasarı/chilling injury)
- Elma, armut: 0°C ile +1°C
- Narenciye: +4°C ile +8°C
- Taze (soğutulmuş) et: -1°C ile +2°C
- Dondurulmuş et/balık: -18°C ve altı (derin dondurma -25°C)
- Taze balık: 0°C ile +2°C
- Süt ürünleri: +2°C ile +4°C
- Dondurma: -25°C
- Kesme çiçek: +2°C ile +8°C
- İlaç/aşı: +2°C ile +8°C (bazıları -20°C)
- Çikolata: +12°C ile +18°C

Not: Kontrollü/değiştirilmiş atmosfer (CA/MA) ile O₂ ve CO₂ seviyeleri ayarlanarak meyve-sebze raf ömrü uzatılır. "Chilled" (soğutulmuş, donma noktası üstü) ile "frozen" (dondurulmuş) ayrımı kritiktir.

OPERASYONEL KONTROLLER:
1. Yükleme öncesi: PTI (Pre-Trip Inspection) kontrolü
2. Sıcaklık ayarı: Yük spesifikasyonuna göre
3. Havalandırma: Meyve/sebze için açık, et için kapalı
4. Seyir sırasında: Günde en az 2 kez sıcaklık kontrolü
5. Arıza durumunda: Yedek konteyner veya soğuk oda

YERLEŞİM:
- Elektrik bağlantısına erişilebilir pozisyon
- Hava sirkülasyonu için yeterli boşluk
- Güverte üstünde veya özel reefer bay'lerinde`,
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
    content: `OOG TÜRLERİ:
- Over-height: Yükseklik aşımı
- Over-width: Genişlik aşımı
- Over-length: Uzunluk aşımı
- Overweight: Ağırlık aşımı

TAŞIMA YÖNTEMLERİ:
1. Open Top konteyner: Üstten taşan yükler
2. Flat Rack: Yandan taşan yükler
3. Platform: Tüm yönlerden taşan yükler
4. Break-bulk olarak: Konteyner dışı doğrudan istifleme

İSTİFLEME KURALLARI:
- OOG konteynerlerin üzerine başka konteyner konulmaz
- Taşma miktarı komşu bay'leri etkilememelidir
- Bağlama özel hesap gerektirir
- Rüzgar yüküne dikkat edilmelidir

PLANLAMA:
Bay planında OOG yükler özel olarak işaretlenir.
Taşma boyutları santimetre hassasiyetinde bildirilmelidir.
Vinç kapasitesi kontrol edilmelidir.`,
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
    content: `CSC PLAKASI KONTROLÜ:
Her konteynerin CSC (Container Safety Convention) onay plakası olmalıdır.
Kontrol edilecekler:
- Onay tarihi ve geçerlilik
- ACEP (Approved Continuous Examination Programme) numarası
- Maksimum brüt ağırlık
- İstifleme ağırlığı

FİZİKSEL MUAYENE:
1. YAPI: Deformasyon, çatlak, korozyon
2. TABAN: Çürüme, kırık, delik
3. KAPILAR: Conta durumu, kilit mekanizması
4. ÇATI: Delik, su sızdırma
5. KÖŞELİKLER: Deformasyon, kaynak çatlağı

PAKETLEME KONTROLÜ:
- Yükün konteyner içinde sabitlenmesi
- Dunnage ve hava yastığı kullanımı
- Ağırlık dağılımının dengelenmesi
- DG etiketlerinin doğruluğu

RET KRİTERLERİ:
Yapısal hasar, CSC plakası eksikliği, su sızdırması veya güvenlik riski tespit edilen konteyner reddedilir.`,
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
    content: `TANKER TİPLERİ:

1. HAM PETROL TANKERLERİ (Crude Oil Tankers):
- VLCC (Very Large Crude Carrier): 200,000+ DWT
- Suezmax: 120,000 – 200,000 DWT
- Aframax: 80,000 – 120,000 DWT
- Panamax: 60,000 – 80,000 DWT

2. ÜRÜN TANKERLERİ (Product Tankers):
- Refined petroleum ürünleri (benzin, dizel, jet fuel)
- Coated tanklar (epoksi kaplama)
- Birden fazla yük taşıma kapasitesi

3. KİMYASAL TANKERLER (Chemical Tankers):
- IMO Tip 1: En tehlikeli kimyasallar
- IMO Tip 2: Orta tehlikeli
- IMO Tip 3: Düşük tehlikeli
- IBC Code kapsamında

4. LNG TANKERLERİ:
- Sıvılaştırılmış doğal gaz (-162°C)
- Membrane veya moss tipi tanklar
- IGC Code kapsamında

5. LPG TANKERLERİ:
- Basınçlı veya yarı soğutmalı
- Propan, bütan taşıma

GAZ TAŞIYICI TANK TİPLERİ (IGC Code):
Gaz taşıyıcılarda yük muhafaza (containment) sistemi tipi, ikincil bariyer gereksinimini belirler. -10°C altında taşınan yükler ikincil bariyer gerektirir.

- Bağımsız Tip A (Independent Type A): prizmatik, gemi inşa standartlarına göre tasarlanır. TAM ikincil bariyer zorunludur. Tasarım buhar basıncı < 0.7 bar. Tam soğutmalı (fully refrigerated) LPG/etilen taşır.
- Bağımsız Tip B (Independent Type B): ileri analiz (yorulma, çatlak ilerlemesi) ve model testi ile tasarlanır; yalnızca KISMİ ikincil bariyer (damlama tepsisi) gerekir. Klasik örnek: küresel Moss tankı; ayrıca prizmatik SPB. Tasarım basıncı < 0.7 bar.
- Bağımsız Tip C (Independent Type C): basınçlı kap (silindirik/küresel); tasarım buhar basıncı genellikle ≥ 2 bar. İKİNCİL BARİYER GEREKMEZ. Tam basınçlı/yarı basınçlı LPG ve etilen taşıyan küçük-orta gaz gemilerinde kullanılır.
- Membran (Membrane) tanklar: ince çelik/invar membran (birincil bariyer) izolasyonla desteklenir; TAM ikincil bariyer içerir. LNG taşıyıcılarda yaygın (GTT Mark III, NO96). Tasarım basıncı düşüktür (< 0.25 bar).`,
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
    content: `YÜKLEME ÖNCESİ:
1. Ship/Shore Safety Checklist doldurulur
2. Manifold bağlantıları kontrol edilir
3. Tank hazırlığı (gazfree veya inert)
4. İletişim ve acil durum prosedürleri
5. Yükleme planı ve oranı belirlenir

YÜKLEME OPERASYONU:
- Başlangıçta düşük debi ile (shore tank doğrulama)
- Kademeli debi artışı
- Düzenli ullage/sounding ölçümü
- Trim ve stabilite kontrolü
- Statik elektrik önlemleri (yükleme ilk 30 dk)
- Topping off (son aşama, düşük debi)

TAHLİYE OPERASYONU:
- Kargo pompalarıyla tahliye
- Stripping (artık yük temizleme)
- Tank boşalma sırası stabiliteye göre
- COW (Crude Oil Washing) uygulaması
- Ballast alımı (SBT veya boşalan tanklara)

SOLAS GEREKSİNİMLERİ:
- Giriş izni prosedürü
- Gaz ölçümleri
- Yangın önleme tedbirleri`,
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
      "Manifold sızıntısı yangın ve çevre felaketine yol açabilir",
      "Tank aşırı doldurma (overflow) ciddi sonuçlar doğurur",
    ],
  },
  "ullage-sounding": {
    title: "Ullage ve Sounding Ölçümleri",
    introduction: "Ullage ve sounding, tanklardaki sıvı seviyesini belirlemek için kullanılan iki temel ölçüm yöntemidir.",
    content: `ULLAGE:
Tank üstünden sıvı yüzeyine olan boş mesafe.
Ullage = Tank yüksekliği − Sıvı seviyesi

SOUNDING:
Tank tabanından sıvı yüzeyine olan dolu mesafe.
Sounding = Sıvı seviyesi

İLİŞKİ:
Ullage + Sounding = Tank yüksekliği

ÖLÇÜM YÖNTEMLERİ:
1. Manuel: Çelik şerit metre (ullage tape) ile
2. Otomatik: Radar veya ultrasonik seviye sensörü

HACIM HESABI:
1. Sıvı seviyesi ölçülür (ullage veya sounding)
2. Tank kalibrasyon tablosundan hacim okunur
3. Sıcaklık düzeltmesi uygulanır
4. Yoğunluk ile çarpılarak ağırlık bulunur

Ağırlık = Hacim × Yoğunluk

TRIM DÜZELTMESİ:
Geminin trimli olması sıvı seviyesini etkiler. Tank kalibrasyon tabloları trim düzeltmesi içerir.`,
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
    content: `HESAPLAMA ADIMLARI:

1. ULLAGE/SOUNDING ÖLÇÜMÜ:
Her tankta bağımsız ölçüm yapılır.

2. GÖZLENEN HACİM (GOV - Gross Observed Volume):
Tank tablolarından sıvı seviyesine karşılık gelen hacim okunur.

3. NET GÖZLENEN HACİM (NOV):
GOV − Serbest su ve tortu (free water and sediment)

4. STANDART HACME DÖNÜŞÜM (GSV - Gross Standard Volume):
Sıcaklık düzeltmesi uygulanır.
GSV = GOV × VCF (Volume Correction Factor)
VCF, ASTM tabloları (Table 54) kullanılarak bulunur.

5. AĞIRLIK HESABI:
Ağırlık (metrik ton) = GSV × Yoğunluk (15°C'de, vacuum)
veya
Ağırlık (air) = GSV × Yoğunluk (15°C, air)

ASTM TABLOLARI:
- Table 54: Sıcaklık düzeltme faktörü
- Table 56: Yoğunluk dönüşümü
- Table 6: API gravity dönüşümü`,
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
    content: `TEMİZLİK YÖNTEMLERİ:

1. COW (Crude Oil Washing):
Ham petrol tankerlerinde tahliye sırasında uygulanan yöntem.
Yüklenen ham petrolün bir kısmı yüksek basınçla tank duvarlarına sıkılır.
MARPOL Annex I gereği zorunludur (mümkün olan gemilerde).

2. SICAK DENIZ SUYU YIKAMASI:
60-80°C sıcak su ile tank yıkama.
Ağır kalıntılar için etkili.

3. SOĞUK DENIZ SUYU YIKAMASI:
Hafif ürünlerden sonra yeterli.

4. KİMYASAL TEMİZLİK:
Kimyasal tankerlerde yük değişikliğinde.
Uygun temizleme ajanı seçimi kritiktir.

5. GAZFREE:
Tankların patlamaya karşı güvenli hale getirilmesi.
LEL < %1, O₂ > %21 olmalıdır.

WALL WASH TESTİ:
Temizlik sonrası tank duvarından alınan numune ile temizliğin yeterliliği kontrol edilir.`,
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
      "Gazfree edilmemiş tanka giriş ölümcüldür",
      "COW sırasında statik elektrik ve patlama riski mevcuttur",
    ],
  },
  "ig-system": {
    title: "Inert Gas Sistemi",
    introduction: "Inert gas sistemi, tank atmosferindeki oksijeni düşürerek patlama riskini ortadan kaldıran güvenlik sistemidir.",
    content: `AMAÇ:
Tank içindeki atmosferin oksijen oranını %8'in altına düşürerek yanıcı hidrokarbon buharlarının patlamasını engellemek.

ÇALIŞMA PRENSİBİ:
Kazan veya IG jeneratöründen gelen egzoz gazı soğutulur, yıkanır ve tanklara verilir.
IG içeriği: ~%83 N₂, ~%14 CO₂, ~%3 diğer

IG UYGULAMALARI:
1. INERTING: Tankı inert gazla doldurmak (O₂ < %8)
2. PURGING: Tanktaki gazı temiz IG ile değiştirmek
3. GAS-FREEING: Tanktaki IG'yi taze hava ile değiştirmek
4. TOPPING UP: Düşen basıncı IG ile takviye etmek

ZORUNLULUK:
- Ham petrol tankerleri (20,000 DWT üzeri): Zorunlu
- Ürün tankerleri (bazıları): Zorunlu
- Kimyasal tankerler: Yüke bağlı

SİSTEM BİLEŞENLERİ:
- IG üretici (kazan veya jeneratör)
- Scrubber (yıkama kulesi)
- Blower (fan)
- Deck seal (su mühürü)
- P/V valve ve breaker
- IG dağıtım hattı`,
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
      "IG sistemi devre dışı iken tank operasyonu yapılmamalıdır",
      "Deck seal'in kuru kalması gaz geri akışına ve patlamaya yol açar",
    ],
  },

  // =====================================================
  // BÖLÜM 9 - TAHIL YÜKLERİ VE GRAIN CODE
  // =====================================================
  "grain-code-intro": {
    title: "International Grain Code Yapısı",
    introduction: "International Grain Code, tahıl yüklerinin denizde güvenli taşınmasını düzenleyen ve SOLAS kapsamında zorunlu olan uluslararası koddur.",
    content: `Grain Code, SOLAS Bölüm VI kapsamında zorunlu kılınmış olup tahıl yükünün güvenli taşınmasına ilişkin kuralları belirler.

KAPSAM:
Tahıl yükü: Buğday, mısır, yulaf, arpa, pirinç, darı ve benzeri tanecikli yükler.

TEMEL KONULAR:
1. Tahıl yükünün kayma karakteristikleri
2. Heeling moment hesapları
3. Stabilite kriterleri
4. Ambar doluluk oranları
5. Yükün sabitlenmesi (securing)
6. Dokümantasyon gereksinimleri

GRAIN LOADING BOOKLET:
Her tahıl yükleme yetkili gemide bulunması gereken belgedir.
İçerir:
- Geminin tahıl taşıma onayı
- Ambar grain/bale kapasiteleri
- VHM (Volumetric Heeling Moment) tabloları
- Allowable heeling moment tabloları
- Stabilite hesap formları

Bayrak devleti veya yetkilendirilmiş klas kuruluşu onayı zorunludur.`,
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
    content: `KAYMA MEKANİZMASI:
Tahıl tanecikleri birbirine sıkı bağlı değildir. Gemi salınımı sırasında:
1. Tanecikler yatma yönüne doğru akar
2. Yük yüzeyi eğilir
3. Gemi dik konuma döndüğünde yük geri gelmez
4. Tekrarlayan salınımlarla tek taraflı birikim artar

Bu etki, serbest yüzey etkisine benzer ancak farklıdır. Tahıl geri akmaz, bu nedenle etki kümülatiftir.

YÜK YÜZEY DURUMU:
- Tam dolu ambar (filled): Kayma riski minimum
- Kısmen dolu (partly filled): Kayma riski maksimum

KAYMA AÇISI:
Tahılın doğal yığılma açısı yaklaşık 25°–30°'dir.
Geminin yatması durumunda yük yüzeyi bu açıya ulaşmaya çalışır.

ÖNLEMLERİ:
1. Ambarları tam doldurmak (trimmed, filled)
2. Kısmen dolu ambarlarda shifting board veya silo kullanmak
3. Yük yüzeyini trimlemek ve üstüne bagging yapıştırmak`,
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
      "Kısmen dolu ambar tahıl kaymasında en büyük riski oluşturur",
      "Yetersiz securing geminin devrilmesine yol açabilir",
    ],
  },
  "grain-heeling-moment": {
    title: "Volumetric Heeling Moment",
    introduction: "VHM (Volumetric Heeling Moment), tahıl yükünün kayması sonucu oluşan yatma momentini ifade eden hesaplama parametresidir.",
    content: `VHM hesabı Grain Loading Booklet'ten alınan verilerle yapılır.

VHM, her ambar için ayrı ayrı hesaplanır ve toplanır.

TAM DOLU AMBAR:
VHM değeri Grain Loading Booklet tablosundan okunur.
Tam dolu ambarlarda VHM düşüktür.

KISMEN DOLU AMBAR:
VHM değeri doluluk oranına göre çok daha büyüktür.
Grain Code bu ambarlar için ayrı tablolar sunar.

TOPLAM VHM:
Tüm ambarların VHM değerleri toplanarak geminin toplam VHM'si bulunur.

GHM HESABI:
GHM (Grain Heeling Moment) = Toplam VHM ÷ SF (stowage factor, m³/t)
Birim kontrolü: VHM (m⁴) ÷ SF (m³/t) = t·m (gerçek ağırlık momenti).
veya
GHM hesaplanmış ise doğrudan kullanılır.

KONTROL:
GHM ≤ Allowable Heeling Moment olmalıdır.
Allowable Heeling Moment, geminin stabilite durumuna göre belirlenir.`,
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
    title: "Tahıl Stabilite Kriterleri",
    introduction: "Grain Code, tahıl taşıyan gemiler için genel stabilite kriterlerinden daha sıkı özel kriterler belirler.",
    content: `GRAIN CODE STABİLİTE KRİTERLERİ:

1. YATMA AÇISI:
Tahıl kaymasından kaynaklanan list açısı 12° veya güvertenin suya girme açısının %40'ından büyük olmamalıdır (hangisi küçükse).

2. RESİDÜEL ALAN:
GZ eğrisi ile heeling moment eğrisi arasındaki alan (residual dynamic stability):
Minimum 0.075 m-rad

3. GM0 (Başlangıç GM):
Minimum GM ≥ 0.30 m (serbest yüzey düzeltmesi sonrası)

KONTROL SÜRECİ:
1. Yükleme planı hazırlanır
2. Her ambar için VHM/GHM hesaplanır
3. Toplam GHM bulunur
4. GZ eğrisi çizilir
5. Heeling moment eğrisi eklenir
6. Residual area hesaplanır
7. Tüm kriterlerin sağlandığı doğrulanır

Stabilite kriterleri sağlanmazsa yükleme planı revize edilmelidir.`,
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
    content: `SABİTLEME YÖNTEMLERİ:

1. SHIFTING BOARDS:
Ambar boyunca merkez hattında dikey olarak yerleştirilen ahşap veya çelik paneller.
Tahılın bir tarafa kaymasını fiziksel olarak engeller.

2. LONGITUDINAL DIVISIONS (Silo):
Ambarı boyuna ikiye bölen kalıcı yapılar.
Etkin VHM'yi önemli ölçüde azaltır.

3. BUNDLING / BAGGING:
Kısmen dolu ambarın yük yüzeyine torbalanmış tahıl yerleştirmek.
Minimum 16 torba (150 mm kalınlık) ile yüzeyi örtmek.

4. STRAPPING:
Yük yüzeyi üzerine polyester kayış ile sabitleme.

TAM DOLU AMBAR:
Ambar üst kenarına kadar doldurulup trimlenir.
Hatch opening alanı da doldurulmalıdır.

KISMEN DOLU AMBAR:
En fazla iki ambar kısmen dolu olabilir (Grain Code kısıtlaması).
Bu ambarlarda shifting board veya bagging zorunludur.`,
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
    content: `PLAN HAZIRLAMA ADIMLARI:

1. GEMİ VERİLERİ:
- Hafif gemi ağırlığı ve KG
- Ambar grain/bale kapasiteleri
- Hidrostatik veriler
- Grain Loading Booklet

2. YÜK BİLGİLERİ:
- Tahıl türü ve SF
- Toplam yük miktarı
- Yükleme/tahliye limanları

3. YERLEŞIM PLANI:
- Hangi ambarlara ne kadar yük
- Tam dolu ve kısmen dolu ambarlar
- Sabitlenme yöntemleri

4. STABİLİTE HESABI:
- KG hesabı (tüm ağırlıklar dahil)
- GM hesabı (FSE düzeltmeli)
- VHM / GHM hesabı
- Yatma açısı kontrolü
- Residual area kontrolü

5. ONAY:
- Kaptan onayı
- Liman otoritesi / surveyor onayı
- Grain Code form'unun doldurulması

Plan tüm ara yükleme durumlarını da kapsamalıdır.`,
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
    content: `TIMBER CODE (Code of Safe Practice for Ships Carrying Timber Deck Cargoes):

İSTİFLEME KURALLARI:
- Yük sıkı istiflenmelidir (minimum boşluk)
- Yükseklik geminin genişliğinin 1/3'ünü geçmemelidir
- Küpeşte suyollarının açık kalması sağlanmalıdır
- Güvenli geçiş yolları korunmalıdır

BAĞLAMA:
- Çelik halat veya zincir ile bağlama
- Bağlama düzeni en az her 3 metrede bir
- Stanchion (direk) kullanımı
- Seyir sırasında bağlama kontrolü

STABİLİTE ETKİSİ:
- Güverte yükü KG'yi yükseltir
- Islanan kereste ağırlık artışı → GM azalması
- Su absorpsiyonu %15-25 oranında olabilir
- Buzlanma ek ağırlık oluşturur

FREEBOARD:
Timber Load Line ile normal Load Line farklıdır.
Kereste güverte yükü taşıyan gemilere daha derin yükleme izni verilir (ek reserve buoyancy).`,
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
    content: `YÜKLEME HATTI İŞARETİ:
Bordada amidships'te bulunan disk (halka), merkezinden geçen yatay çizgi ile Yaz (Summer, S) hattını gösterir. Diskin yanında atayan klas kuruluşunun baş harfleri yer alır. Diske bağlı dikey çizginin önündeki yatay "tarak" hatları mevsim/bölge yükleme hatlarıdır.

HATLAR (yukarıdan aşağıya):
- TF — Tropik Tatlı Su (Tropical Fresh): en derin yükleme.
- F — Tatlı Su (Fresh)
- T — Tropik (Tropical)
- S — Yaz (Summer): referans hat, disk merkezinden geçer.
- W — Kış (Winter)
- WNA — Kış Kuzey Atlantik (Winter North Atlantic): en sığ yükleme.

ARALIKLAR:
- T, S'nin üstünde; W, S'nin altında: her biri yaz draftının 1/48'i kadar.
- F = S + FWA (tatlı su payı); TF = T + FWA.
- WNA = W − 50 mm (boyu ≤ 100 m gemilerde).
- FWA (mm) = Deplasman / (4 × TPC).

DECK LINE VE FRİBORD:
Güverte hattı (deck line) ile yaz (S) hattı arasındaki düşey mesafe yaz fribordudur. Yükleme hatları, dünya haritasındaki mevsim bölgeleriyle (tropik, yaz, kış, mevsimsel bölgeler) birlikte kullanılır; gemi içinde bulunduğu bölge ve mevsime uygun hattı aşmamalıdır.`,
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
    content: `Canlı hayvan taşımacılığı OIE (Dünya Hayvan Sağlığı Örgütü) ve ulusal mevzuata göre yapılır.

GEREKSİNİMLER:
- Yeterli havalandırma ve gölgelik
- Temiz su ve yem temini
- Atık yönetim sistemi (drenaj)
- Veteriner bakımı imkanı
- Uygun alan ve alan hesabı (hayvan başına m²)

STABİLİTE ETKİSİ:
- Hayvanların serbest hareketi serbest yüzey etkisine benzer
- Panik durumunda toplu kayma riski
- Su ve yem tanklarının ağırlık değişimi

BÖLME SİSTEMİ:
Hayvanlar bölmelere ayrılarak toplu kayma önlenir.
Bölme boyutu hayvan türüne göre belirlenir.`,
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
    content: `RO-RO YÜKLEME:
Yükler rampa üzerinden kendi tekerlekleriyle veya çekici ile gemiye alınır.

YÜK TÜRLERİ:
- Otomobiller
- Kamyon ve TIR'lar
- İş makineleri
- Proje yükleri (tekerlekli platform üzerinde)

BAĞLAMA:
Her araç lashing kayışları ile güverteye sabitlenir.
- Otomobil: Minimum 4 nokta
- Kamyon: Minimum 8 nokta (ağırlığa göre)
- CSS Code bağlama hesapları uygulanır

STABİLİTE:
Ro-Ro gemileri yüksek KG riski taşır:
- Araçlar güverte üzerinde (yüksek ağırlık merkezi)
- Büyük açık güverte alanları (serbest yüzey benzeri etki)
- Su girişi riski (bow/stern door)

GÜVENLİK:
- Havalandırma (egzoz gazları)
- Yangın dedektör ve söndürme sistemleri
- Su geçirmez kapıların kapalı tutulması`,
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
      "Açık bow door ile seyir ölümcül sonuçlar doğurmuştur",
      "Araç bağlamaları kötü havada kontrol edilmelidir",
    ],
  },
  "steel-cargo": {
    title: "Çelik ve Ağır Yük Taşıma",
    introduction: "Çelik ürünleri yüksek yoğunluklu yüklerdir ve istifleme, bağlama ve yapısal dayanım açısından özel dikkat gerektirir.",
    content: `ÇELİK ÜRÜN TÜRLERİ:
- Steel coil (çelik rulo)
- Steel plate (çelik levha)
- Steel pipe (çelik boru)
- Steel billet/slab (çelik kütük)
- Rebar (inşaat demiri)

İSTİFLEME:
- Çelik coil: Göz aşağı (eye down) veya göz yana (eye to side)
- Dunnage: Ahşap cradle veya V-blok kullanımı
- Ağırlık dağılımı: Ambar tabanı limit kontrolü
- Kayma önlemi: Ahşap chock ve stopper

BAĞLAMA:
- Çelik halat veya zincir bağlama
- Her coil bağımsız olarak bağlanmalı
- Bağlama kuvveti CSS Code'a göre hesaplanır

YAPILSAL DAYANIM:
Çelik yüksek yoğunluklu (SF ~ 0.3–0.5 m³/t) olduğundan:
- Ambar tabanı yük yoğunluğu limiti kontrol edilir
- Tank top strength ile karşılaştırılır
- Gerekirse dunnage ile yük dağıtılır`,
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
    content: `PROJE YÜKÜ ÖRNEKLERİ:
- Rüzgar türbini kanatları
- Petrol platformu modülleri
- Büyük transformatörler
- Endüstriyel ekipmanlar
- Köprü elemanları

PLANLAMA:
1. Yük boyut ve ağırlık analizi
2. Vinç/kran kapasitesi kontrolü
3. Güverte dayanımı hesabı
4. Stabilite analizi (kaldırma sırasında)
5. Bağlama düzeni tasarımı
6. Seyir rotası ve hava koşulları
7. Sigorta ve yasal gereksinimler

OPERASYONEL RİSKLER:
- Kaldırma sırasında stabilite kaybı
- Rüzgar etkisi (büyük yüzey alanı)
- Güverte hasarı
- Bağlama yetersizliği

Her proje yükü benzersizdir ve özel planlama gerektirir.`,
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
    content: `BAŞLICA HASAR TÜRLERİ:

1. FİZİKSEL HASAR:
- Ezilme (ambar içi kayma)
- Kırılma (yetersiz ambalaj)
- Deformasyon (aşırı istifleme)
- Çizilme ve çarpma

2. NEM HASARI:
- Gemi terleme (ship sweat)
- Yük terleme (cargo sweat)
- Yağmur suyu girişi
- Deniz suyu sızıntısı

3. KONTAMİNASYON:
- Koku transferi
- Toz bulaşması
- Kimyasal bulaşma
- Önceki yük kalıntıları

4. SICAKLIK HASARI:
- Aşırı ısınma (self-heating)
- Donma (soğuk bölge seyri)
- Sıcaklık dalgalanmaları

5. BİYOLOJİK HASAR:
- Küf ve mantar
- Böcek istilası
- Çürüme (organik yükler)

HASAR ÖNLEMELERİ:
Doğru istifleme, uygun dunnage, havalandırma kontrolü ve yük bakımı.`,
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
    content: `İKİ TÜR TERLEME:

1. GEMİ TERLEMESİ (Ship Sweat):
Sıcak bölgeden soğuk bölgeye seyirde oluşur.
Gemi yapısı (çelik karinası) dışarıdan soğur.
Ambar içindeki nemli hava soğuk çelik yüzeylerde yoğuşur.
Yoğunlaşan su damlacıkları yükün üzerine damlar.

Koşul: Dış hava sıcaklığı < Ambar hava dew point'i

2. YÜK TERLEMESİ (Cargo Sweat):
Soğuk bölgeden sıcak bölgeye seyirde oluşur.
Sıcak nemli dış hava ambara girer.
Soğuk yük yüzeyinde nem yoğuşur.

Koşul: Dış hava dew point'i > Yük yüzey sıcaklığı

ÖNLEME:
- Dew point ölçümü ve havalandırma kararı
- Gemi terleme: Soğuk bölgeye girerken havalandır
- Yük terleme: Sıcak bölgeye girerken havalandırma
- Nem emici malzeme kullanımı (silica gel, kalsiyum klorür)`,
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
    content: `DEW POINT (ÇİĞ NOKTASI):
Belirli bir nem oranındaki havanın soğutulduğunda nem yoğunlaşmasının başladığı sıcaklık.

ÖLÇÜM:
Psikrometre veya elektronik dew point ölçer ile ambar ve dış hava ölçümleri yapılır.

KARAR TABLOSU:
Dış hava dew point'i < Yük sıcaklığı → Havalandır (nem dışarı çıkar)
Dış hava dew point'i > Yük sıcaklığı → Kapalı tut (nem yoğuşur)

KAYIT:
Her vardiyada dew point ölçümü yapılmalı ve kayıt defterine işlenmelidir.
Bu kayıtlar hasar taleplerinde delil niteliğindedir.`,
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
    content: `SORUMLULUK ESASLARI:

Hague-Visby Rules kapsamında taşıyıcı:
- Gemiyi denize elverişli (seaworthy) tutmakla
- Yükü dikkatli yüklemek, istiflemek, taşımak ve boşaltmakla
yükümlüdür.

TAŞIYICINİN MUAFİYETLERİ:
- Deniz kazaları (act of God)
- Savaş, korsanlık
- Karantina
- Yükün doğasından kaynaklanan hasar (inherent vice)
- Yetersiz ambalaj
- Gizli ayıp (latent defect)

GEMİ PERSONELİNİN SORUMLULUKLARI:
1. Yükleme öncesi ambar muayenesi
2. Yük durumunun kaydedilmesi (Mate's Receipt)
3. Hasarlı yükte Letter of Protest
4. Havalandırma kayıtları
5. Seyir sırasında yük bakımı

BELGELENDİRME:
İyi belgelendirme taşıyıcıyı korur. Fotoğraf, kayıt ve itiraz mektupları kritik öneme sahiptir.`,
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
    title: "Hague-Visby Kuralları",
    introduction: "Hague-Visby Rules, deniz yoluyla yük taşımacılığında taşıyıcının hak ve sorumluluklarını düzenleyen temel uluslararası sözleşmedir.",
    content: `TEMEL İLKELER:

1. UYGULANIRLIK:
Her konşimento ile taşınan uluslararası yük taşımacılığında geçerlidir.
Çarter parti sözleşmelerinde konşimento düzenlendiğinde uygulanır.

2. TAŞIYICI YÜKÜMLÜLÜKLERİ:
- Gemiyi denize elverişli kılmak (due diligence)
- Ambarları yüke uygun hazırlamak
- Yükü dikkatle yüklemek, istiflemek ve taşımak

3. SORUMLULUK SINIRI:
- Paket başına veya kilo başına (hangisi yüksekse)
- 666.67 SDR/paket veya 2 SDR/kg

4. SÜRE:
- Yükleme anından boşaltma anına kadar
- Dava açma süresi: 1 yıl

5. MUAFİYETLER:
17 muafiyet nedeni sayılır (navigasyon hatası, yangın, act of God, vs.)

Rotterdam Rules ve Hamburg Rules alternatif sözleşmelerdir ancak Hague-Visby en yaygın kabul görendir.`,
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
    content: `BÖLÜM VI - YÜK TAŞIMACILIĞI:

Kural 1: Uygulama alanı
Kural 2: Yük bilgileri (yükleyici sorumlulukları)
Kural 3: Oksijen tüketimi ve gaz salınımı
Kural 5: İstifleme ve sabitleme
Kural 6: Dökme yük ek gereksinimleri
Kural 7: Tahıl yükleme (Grain Code referansı)

BÖLÜM VII - TEHLİKELİ YÜKLER:

Kısım A: Ambalajlı tehlikeli yükler (IMDG Code)
Kısım A-1: Dökme katı tehlikeli yükler (IMSBC Code)
Kısım B: Kimyasal tankerler (IBC Code)
Kısım C: Gaz taşıyıcılar (IGC Code)
Kısım D: INF Code (radyoaktif yükler)

ÖNEMLİ GEREKSİNİMLER:
- VGM zorunluluğu (konteyner ağırlık doğrulama)
- Cargo Securing Manual
- Tehlikeli yük beyanı ve manifesto
- Ambar girişi prosedürleri`,
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
    content: `MARPOL EKLERİ VE YÜK İLİŞKİSİ:

EK I - PETROL KİRLİLİĞİ:
- Tanker yük tankı yıkama suyu boşaltma kuralları
- COW (Crude Oil Washing) zorunluluğu
- Slop tank yönetimi
- Oil Record Book kayıtları

EK II - ZARARLI SIVI MADDELER (NLS):
- Kimyasal tanker yük artıkları; her madde IBC Code'da bir kategoriye atanır.
- Kategoriler: X (büyük zarar — denize boşaltım yasak, ön yıkama/prewash zorunlu ve atık kabul tesisine verilir), Y (zarar — sınırlı boşaltım), Z (küçük zarar — daha az kısıtlı), OS (Other Substances — değerlendirilmiş ve Ek II kapsamı dışı; kirlilik riski yok).
- Genel boşaltım koşulları: gemi yolda (≥7 knot self-propelled), kıyıdan ≥12 deniz mili, su derinliği ≥25 m, su altı çıkışından.
- Kategori X için ön yıkama (prewash) ve kalıntı konsantrasyonu doğrulaması gereklidir.
- Tank yıkama gereksinimleri ve Cargo Record Book kaydı.

EK III - AMBALAJLI ZARARLI MADDELER:
- Deniz kirliliği işareti (Marine Pollutant)
- İstifleme ve etiketleme kuralları
- Kayıp durumunda raporlama

EK V - ÇÖP:
- Kargo atıkları (dunnage, ambalaj)
- Boşaltma kısıtlamaları
- Çöp Yönetim Planı`,
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
    content: `PSC DENETİM ALANLARI:

1. BELGE KONTROLLERİ:
- Cargo Securing Manual
- DG Manifest ve belgeler
- Stabilite hesapları
- Yükleme bilgisayarı onayı
- Grain Loading Booklet (tahıl gemileri)

2. FİZİKSEL KONTROLLERİ:
- Yük bağlama durumu
- DG etiketleme ve ayrımı
- Hatch cover su geçirmezliği
- Ambar havalandırması
- Yangın güvenlik ekipmanları

3. YAYGIN BULGULAR:
- Yetersiz lashing
- DG ayrım ihlali
- CSM güncel değil
- Stabilite hesabı eksik
- Hatch cover sızdırma
- VGM eksikliği

4. TUTULMA:
Geminin güvenlik riski oluşturduğu tespit edildiğinde kalkış izni verilmez.
Eksiklikler giderilene kadar gemi limanda kalır.`,
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
    content: `ISM CODE VE YÜK:

ISM Code (International Safety Management Code), gemideki tüm operasyonların sistematik prosedürlerle yönetilmesini gerektirir.

YÜK OPERASYONLARI İLE İLGİLİ MADDELER:

1. POLİTİKA:
Şirketin güvenlik ve çevre koruma politikası yük operasyonlarını kapsar.

2. SORUMLULUKLAR:
- Kaptan: Yük güvenliğinin genel sorumlusu
- DPA: Şirket ile gemi arasında köprü
- Baş zabit: Günlük yük operasyonları

3. PROSEDÜRLER:
- Yükleme planı hazırlama prosedürü
- DG yükleme prosedürü
- Ambar girişi prosedürü
- Acil durum prosedürleri (yük kayması, yangın)

4. KAYITLAR:
Tüm yük operasyonları kayıt altına alınır.
Kayıtlar denetim ve soruşturma için saklanır.

5. EĞİTİM:
Yük operasyonlarına katılan personel eğitimli olmalıdır.
Tatbikatlar düzenli yapılmalıdır.`,
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
    content: `ÖNEMLİ YÜK KAZALARI:

1. MV DERBYSHIRE (1980):
- Dökme cevher yüklü bulk carrier
- Tayfun sırasında battı (44 mürettebat)
- Sonuç: Hatch cover dayanım standartları güçlendirildi

2. HERALD OF FREE ENTERPRISE (1987):
- Ro-Ro yolcu gemisi
- Açık bow door ile seyir
- 193 kişi hayatını kaybetti
- Sonuç: ISM Code'un oluşturulması

3. MV STELLAR DAISY (2017):
- VLOC (Very Large Ore Carrier)
- Güney Atlantik'te battı (22 kayıp)
- Yapısal yorgunluk ve cevher sıvılaşması

4. NİKEL CEVHER KAZALARI:
- Birçok bulk carrier Filipinler'den nikel cevheri yükledikten sonra battı
- Sonuç: IMSBC Code Grup A kuralları sıkılaştırıldı

5. MSC FLAMINIA (2012):
- Konteyner gemisinde DG kaynaklı yangın
- Aylarca denizde sürüklendi
- Sonuç: DG konteyner istifleme kuralları güncellendi`,
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
      "Güvenlik kuralları can kayıplarından sonra yazılmıştır",
      "Kurallara uyum sağlanması hayat kurtarır",
    ],
  },

  // =====================================================
  // EK BAŞLIKLAR (2. tur domain taraması)
  // =====================================================
  "cargo-gear-swl": {
    title: "Gemi Yük Donanımı, Vinç/Derrick ve SWL",
    introduction: "Gemi yük donanımı; vinçler (crane), bumbalar (derrick) ve bunların aksesuarlarından (halat, makara, kanca, kilit) oluşur. Her bir donanımın güvenle kaldırabileceği yük, SWL (Safe Working Load) ile sınırlandırılmıştır ve kayıt altına alınır.",
    content: `SWL (SAFE WORKING LOAD):

SWL, bir kaldırma donanımının normal kullanımda güvenle taşıyabileceği maksimum yüktür. Donanımın kopma yüküne (breaking load) bir güvenlik katsayısı uygulanarak belirlenir; donanım üzerinde okunaklı biçimde işaretlenir.

YÜK DONANIMI BİLEŞENLERİ:

- Vinç (crane) / bumba (derrick): yükü kaldıran ana donanım.
- Tel/halat (wire/rope), makaralar (blocks), kilitler (shackle), kancalar (hook): aksesuarlar; her birinin kendi SWL'si vardır.
- En zayıf eleman tüm sistemin kapasitesini belirler.

CARGO GEAR REGISTER (YÜK DONANIMI SİCİLİ):

Gemideki tüm kaldırma donanımı ve aksesuarları, sertifikalarıyla birlikte bir Cargo Gear Register'da (yük donanımı sicili / Register of Lifting Appliances) kayıtlıdır. ILO 152 Sözleşmesi ve SOLAS gerekleri kapsamında bu kayıtlar PSC denetiminde kontrol edilir.

TEST VE MUAYENE:

- Proof load test (yük testi): donanım, SWL'sinin üzerinde bir test yüküyle (örn. SWL'ye bağlı olarak belirlenen oranda) test edilir. Genellikle 5 yılda bir tekrarlanır.
- Yıllık ayrıntılı muayene (thorough examination): yetkili kişi tarafından yapılır.
- Görsel kontrol: her kullanımdan önce halat, kanca ve kilitlerin durumu kontrol edilir.

GÜVENLİ KULLANIM:

SWL aşılmamalı; yük asılıyken altında durulmamalı; ani yükleme (shock load) yapılmamalı; açılı kaldırmada bacaklardaki kuvvet artışı dikkate alınmalıdır.`,
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
      "Asılı yükün altında durulmaz; shock load donanımı koparabilir",
      "Sertifikasız/test edilmemiş donanım kullanılmaz",
    ],
  },
  "blu-code": {
    title: "BLU Code: Dökme Yük Yükleme/Boşaltma ve Gemi-Sahil Kontrolü",
    introduction: "BLU Code (Code of Practice for the Safe Loading and Unloading of Bulk Carriers), dökme yük gemilerinde aşırı/dengesiz yüklemenin neden olduğu yapısal hasar ve batma kazalarını önlemek için gemi ile terminal arasındaki güvenli yükleme/boşaltma uygulamasını düzenler.",
    content: `AMAÇ:

Dökme yük gemilerinde hızlı ve dengesiz yükleme; aşırı kesme kuvveti (shear force) ve eğilme momenti (bending moment) oluşturarak gövde yapısını zorlayabilir, hatta gemiyi kırabilir. BLU Code bu riskleri yönetmek için gemi-terminal koordinasyonunu standartlaştırır.

YÜKLEME/BOŞALTMA PLANI:

Kaptan ve terminal temsilcisi, üzerinde anlaşılan bir yükleme/boşaltma planı hazırlar: her ambar için yük miktarı, sıra (sequence), yükleme hızı ve balast suyu boşaltma (deballasting) eşgüdümü. Plan, geminin yükleme bilgisayarında (loading computer) izin verilen kesme kuvveti/eğilme momenti sınırları içinde tutulmasını sağlar.

GEMİ-SAHİL EMNİYET KONTROL LİSTESİ:

Ship-Shore Safety Checklist doldurulur; iletişim yöntemi, acil durdurma sinyali, yükleme hızı ve haberleşme net biçimde belirlenir.

YÜKLEME SIRASI VE STRES KONTROLÜ:

- Ambarlar belirli bir sırayla, dengeli doldurulur (alternate hold loading kısıtlarına dikkat edilir).
- Balast suyu boşaltması yükleme hızıyla senkron yürütülür.
- Loading computer ile her aşamada draft, trim, shear force ve bending moment izlenir.
- Yükleme hızı, deballasting kapasitesini aşmayacak şekilde ayarlanır.

KAZALARDAN DERS:

Birçok dökme yük gemisi kaybı, yanlış yükleme sırası ve aşırı yerel yüklenme kaynaklıdır; BLU Code bu deneyimlerden doğmuştur.`,
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
      "Plan dışı/aşırı yerel yükleme gövdeyi kalıcı deforme edebilir veya kırabilir",
      "Acil durdurma sinyali ve iletişim önceden netleştirilmelidir",
    ],
  },
  "hold-preparation": {
    title: "Ambar Hazırlığı ve Temizliği",
    introduction: "Yeni yük öncesi ambar hazırlığı; yük hasarını, kontaminasyonu ve yük taleplerini (claims) önlemenin temelidir. Gerekli temizlik standardı, taşınacak yüke ve önceki yüke göre belirlenir.",
    content: `TEMİZLİK STANDARTLARI:

- Hastane temiz (hospital clean / grain clean): en yüksek standart; ambar tamamen temiz, kuru, kokusuz, pas ve önceki yük artığından arınmış. Tahıl ve hassas yükler için gereklidir.
- Normal temiz (normal clean): süpürülmüş, önceki yük artıkları alınmış; benzer yükler için yeterli.
- Yük yüklenebilir (load on top / shovel clean): kaba temizlik; bazı dökme yükler arasında yeterli olabilir.

HAZIRLIK ADIMLARI:

1. Önceki yük artıklarının tamamen alınması (süpürme/yıkama).
2. Gerekiyorsa tatlı/deniz suyuyla yıkama ve ardından kurutma (tuz kalıntısı bazı yüklerde sorun yaratır).
3. Sintine (bilge) kuyularının temizliği, test edilmesi ve süzgeçlerin (strum box) kontrolü.
4. Ambar boyası/pas durumunun kontrolü; gerekiyorsa onarım.
5. Havalandırma ve koku kontrolü.
6. Ambar kapağı (hatch cover) sızdırmazlık testi.

KONTROL VE ONAY:

Bazı yüklerde (özellikle tahıl) bağımsız sörveyör ambarı kontrol edip uygunluk verir. Yetersiz hazırlık, yük hasarı ve kontaminasyon nedeniyle ciddi tazminat taleplerine yol açar.`,
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
    content: `KARGO KOŞULLARI:

- Tam basınçlı (fully pressurized): gaz ortam sıcaklığında, yüksek basınçlı tanklarda (genellikle küçük LPG gemileri).
- Yarı basınçlı/yarı soğutmalı (semi-pressurized): orta basınç + kısmi soğutma.
- Tam soğutmalı (fully refrigerated): atmosfer basıncında, çok düşük sıcaklıkta (LNG ≈ -163 °C; LPG ≈ -42 °C).

TANK TİPLERİ (containment):

- Bağımsız tanklar Type A, B, C (C: basınçlı silindirik/küresel).
- Membran (membrane) sistemleri: özellikle büyük LNG gemilerinde, ince çelik membran + yalıtım.
- İkincil bariyer (secondary barrier): sızıntıda gövdeyi düşük sıcaklıktan korur.

BOIL-OFF VE RELİKİFAKSİYON:

Soğutmalı taşımada ısı girişi nedeniyle bir miktar gaz buharlaşır (boil-off gas, BOG). LPG gemilerinde reliquefaction (yeniden sıvılaştırma) tesisi BOG'u geri sıvılaştırır; LNG gemilerinde BOG çoğunlukla yakıt olarak makinede kullanılır.

TEHLİKELER VE EMNİYET:

- Parlayıcılık ve patlama (flammable vapour); gaz dedeksiyonu ve havalandırma kritik.
- Çok düşük sıcaklık (cryogenic): cilt yanığı ve çelik gevrekleşmesi (brittle fracture) riski.
- Boğulma (asphyxiation): gaz oksijeni yer değiştirir.
- ESD (Emergency Shutdown) sistemi, gaz dedektörleri ve özel KKD zorunludur.`,
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
      "Kriyojenik sıvı teması ağır yanık ve çelikte gevrek kırılma yapar",
      "Gaz birikimi patlama ve boğulma riski oluşturur",
    ],
  },
  "isgott-tanker-safety": {
    title: "ISGOTT ve Tanker Emniyeti",
    introduction: "ISGOTT (International Safety Guide for Oil Tankers and Terminals), petrol tankerleri ve terminallerinde güvenli operasyonun endüstri standardı rehberidir. Statik elektrik, parlayıcı buhar ve gemi-sahil arayüzü kaynaklı riskleri yönetir.",
    content: `STATİK ELEKTRİK TEHLİKESİ:

Akışkanın boru/tank içinde hareketi statik yük biriktirir. Yük birikimi bir kıvılcımla (spark) boşaldığında parlayıcı buhar ortamında tutuşmaya yol açabilir. Önlemler: yükleme hızını başlangıçta sınırlama (initial slow loading), serbest düşme/sıçramayı önleme, ölçüm cihazlarının (sounding) statik açıdan güvenli kullanımı ve uygun bekleme süreleri.

PARLAYICI ORTAM VE INERT GAS:

Tank atmosferi parlayıcı (flammable) aralıkta olmamalıdır. Inert gas sistemi (IGS) tank içi oksijeni düşürerek (genellikle %8 hacim altına) ortamı yanmaz hâle getirir; ISGOTT operasyonlarının temelidir.

GEMİ-SAHİL EMNİYET KONTROL LİSTESİ:

Ship/Shore Safety Check List doldurulur: bağlantıların (manifold) sağlamlığı, acil durdurma (ESD), haberleşme, yangın söndürme hazırlığı, sigara/açık alev yasağı, kapalı mahal kuralları ve sıcak iş kontrolü.

OPERASYONEL ÖNLEMLER:

- No smoking / açık alev ve kıvılcım kaynaklarının kontrolü.
- Bonding/topraklama ve uygun hortum/manifold bağlantısı.
- Gaz ölçümü ve kapalı mahal giriş izni.
- Aşırı dolum (overflow) ve dökülme önleme; drip tray ve scupper tıkaçları.
- Sürekli güverte nöbeti ve hızlı müdahale hazırlığı.`,
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
      "Parlayıcı buhar + kıvılcım = patlama; tutuşma kaynakları sıkı kontrol edilir",
      "Inert gas/kapalı mahal kuralları ihlali ölümcüldür",
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

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-[hsl(30,50%,6%)] dark:via-[hsl(25,50%,8%)] dark:to-[hsl(20,50%,10%)]"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-rose-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
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
                const TopicIcon = topic.icon;
                return (
                  <AccordionItem
                    key={topic.id}
                    value={topic.id}
                    className="border border-border/40 rounded-xl overflow-hidden bg-card/80 backdrop-blur"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left">
                        <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
                          {topic.number}
                        </span>
                        <div className="flex items-center gap-2">
                          <TopicIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          <span className="font-semibold text-foreground text-sm leading-tight">
                            {topic.title}
                          </span>
                        </div>
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
                            {subtopic.hasContent && topicContents[subtopic.id] ? (
                              <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            )}
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
            <section className="rounded-2xl border border-border/40 bg-card/80 p-6 backdrop-blur mt-6">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg font-semibold text-foreground">Hızlı Erişim</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { title: "Yük Hesaplamaları", href: "/cargo/calculations" },
                  { title: "Draft Survey Formülleri", href: "/cargo/formulas" },
                  { title: "Yük Kuralları", href: "/cargo/rules" },
                ].map((resource, index) => (
                  <Link
                    key={index}
                    to={resource.href}
                    className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-all hover:border-amber-500/40 hover:bg-background"
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
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
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
                <div className="prose prose-sm max-w-none">
                  <div className="text-foreground leading-relaxed whitespace-pre-line">
                    {currentContent.content}
                  </div>
                </div>

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
                      Uyarılar
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
