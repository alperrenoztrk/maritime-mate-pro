import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Anchor,
  ChevronRight,
  FileText,
  AlertTriangle,
  Waves,
  Scale,
  Ship,
  Gauge,
  Shield,
  Lightbulb,
  CheckCircle2,
  X,
  Weight,
  BarChart3,
  Ruler,
  Settings,
  Activity,
  Target,
  Zap,
  BookMarked,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Stabilite diyagramları (public/diagrams altındaki vektör çizimler)
const metacenterDiagram = "/diagrams/stability/metasantr-gm.svg";
const gzCurveDiagram = "/diagrams/stability/gz-egrisi.svg";
const freeSurfaceEffect = "/diagrams/stability/serbest-yuzey.svg";
const rightingMomentDiagram = "/diagrams/dogrultma-kolu.svg";
const trimDiagram = "/diagrams/stability/trim.svg";
const damageStabilityDiagram = "/diagrams/stability/yara-stabilitesi.svg";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useArticleBackGuard } from "@/hooks/useArticleBackGuard";
import { StructuredLessonText } from "@/components/lessons/StructuredLessonText";

// =====================================
// YENİ 14 BAŞLIKLI STABİLİTE MÜFREDATİ
// =====================================

interface StabilitySubTopic {
  id: string;
  title: string;
  hasContent: boolean;
}

interface StabilityMainTopic {
  id: string;
  number: number;
  title: string;
  icon: React.ElementType;
  subtopics: StabilitySubTopic[];
}

const stabilityTopics: StabilityMainTopic[] = [
  {
    id: "intro",
    number: 1,
    title: "Stabiliteye Giriş ve Temel Kavramlar",
    icon: BookOpen,
    subtopics: [
      { id: "stability-definition", title: "Stabilitenin tanımı", hasContent: true },
      { id: "balance-concepts", title: "Denge, devrilme ve doğrultma kavramları", hasContent: true },
      { id: "static-stability", title: "Statik stabilite", hasContent: true },
      { id: "dynamic-stability-intro", title: "Dinamik stabilite", hasContent: true },
      { id: "initial-stability", title: "İlk stabilite kavramı", hasContent: true },
      { id: "stability-safety", title: "Stabilite ve seyir emniyeti ilişkisi", hasContent: true },
    ],
  },
  {
    id: "weight-buoyancy",
    number: 2,
    title: "Ağırlık, Kaldırma Kuvveti ve Yüzerlik",
    icon: Weight,
    subtopics: [
      { id: "weight-w", title: "Weight (W)", hasContent: true },
      { id: "center-of-gravity", title: "Ağırlık merkezi (G)", hasContent: true },
      { id: "buoyancy-force", title: "Kaldırma kuvveti", hasContent: true },
      { id: "center-of-buoyancy", title: "Kaldırma merkezi (B)", hasContent: true },
      { id: "floatation-condition", title: "Yüzerlik şartı", hasContent: true },
      { id: "equilibrium-states", title: "Denge hâlleri (stable, unstable, neutral equilibrium)", hasContent: true },
    ],
  },
  {
    id: "metacentric",
    number: 3,
    title: "Metasantrik Kavramlar ve İlk Stabilite",
    icon: Target,
    subtopics: [
      { id: "metacenter-m", title: "Metasantr (M) kavramı", hasContent: true },
      { id: "metacentric-height-gm", title: "Metasantrik yükseklik (GM)", hasContent: true },
      { id: "kb-bm-kg-relation", title: "KB, BM ve KG ilişkisi", hasContent: true },
      { id: "positive-gm", title: "Pozitif GM", hasContent: true },
      { id: "negative-gm", title: "Negatif GM", hasContent: true },
      { id: "gm-ship-movements", title: "GM'nin gemi hareketlerine etkisi", hasContent: true },
    ],
  },
  {
    id: "cog-shift",
    number: 4,
    title: "Ağırlık Merkezinin Yer Değiştirmesi",
    icon: Settings,
    subtopics: [
      { id: "weight-addition", title: "Ağırlık eklenmesi", hasContent: true },
      { id: "weight-removal", title: "Ağırlık çıkarılması", hasContent: true },
      { id: "weight-shift", title: "Ağırlık kaydırılması", hasContent: true },
      { id: "vertical-weight-movement", title: "Dikey ağırlık hareketleri", hasContent: true },
      { id: "transverse-weight-movement", title: "Enine ağırlık hareketleri", hasContent: true },
      { id: "longitudinal-weight-movement", title: "Boyuna ağırlık hareketleri", hasContent: true },
    ],
  },
  {
    id: "transverse-stability",
    number: 5,
    title: "Enine Stabilite Hesapları",
    icon: Scale,
    subtopics: [
      { id: "righting-moment", title: "Righting moment", hasContent: true },
      { id: "heeling-moment", title: "Yatma momenti", hasContent: true },
      { id: "angle-of-equilibrium", title: "Denge açısı", hasContent: true },
      { id: "heel-from-weight-shift", title: "Ağırlık kaymasına bağlı yatma", hasContent: true },
      { id: "small-angle-stability", title: "Küçük açılar için stabilite", hasContent: true },
      { id: "large-angle-stability", title: "Büyük açılar için stabilite", hasContent: true },
    ],
  },
  {
    id: "free-surface",
    number: 6,
    title: "Serbest Yüzey Etkisi (Free Surface Effect)",
    icon: Waves,
    subtopics: [
      { id: "free-surface-concept", title: "Serbest yüzey kavramı", hasContent: true },
      { id: "fse-gm-effect", title: "Serbest yüzeyin GM'ye etkisi", hasContent: true },
      { id: "fsm", title: "Free Surface Moment (FSM)", hasContent: true },
      { id: "fse-calc", title: "Free Surface Effect (FSE)", hasContent: true },
      { id: "tank-geometry-effect", title: "Tank geometrisinin etkisi", hasContent: true },
      { id: "multiple-tanks-effect", title: "Birden fazla tankın etkisi", hasContent: true },
    ],
  },
  {
    id: "longitudinal-stability",
    number: 7,
    title: "Boyuna Stabilite ve Trim",
    icon: Anchor,
    subtopics: [
      { id: "lcg", title: "Boyuna ağırlık merkezi (LCG)", hasContent: true },
      { id: "lcb", title: "Yüzerlik merkezi (LCB)", hasContent: true },
      { id: "trim-concept", title: "Trim kavramı", hasContent: true },
      { id: "mct", title: "MCT (Moment to Change Trim)", hasContent: true },
      { id: "trim-calculations", title: "Trim hesapları", hasContent: true },
      { id: "trim-control", title: "Yükleme ve boşaltmada trim kontrolü", hasContent: true },
    ],
  },
  {
    id: "hydrostatic-data",
    number: 8,
    title: "Hidrostatik Veriler ve Stabilite Tabloları",
    icon: BarChart3,
    subtopics: [
      { id: "displacement", title: "Displacement", hasContent: true },
      { id: "draft", title: "Draft", hasContent: true },
      { id: "draft-displacement-relation", title: "Draft–deplasman ilişkisi", hasContent: true },
      { id: "tpc", title: "TPC (Ton Per Centimeter)", hasContent: true },
      { id: "km-values", title: "KM değerleri", hasContent: true },
      { id: "hydrostatic-tables-usage", title: "Hidrostatik tabloların kullanımı", hasContent: true },
      { id: "inclining-experiment", title: "Meyil deneyi (Inclining Experiment)", hasContent: true },
    ],
  },
  {
    id: "gz-curve",
    number: 9,
    title: "Doğrultma Kolları ve Stabilite Eğrileri (GZ Curve)",
    icon: Activity,
    subtopics: [
      { id: "gz-righting-lever", title: "Doğrultma kolu (GZ)", hasContent: true },
      { id: "gz-curve-generation", title: "GZ eğrisinin elde edilmesi", hasContent: true },
      { id: "max-gz", title: "Maksimum GZ", hasContent: true },
      { id: "stability-area", title: "Stabilite alanı", hasContent: true },
      { id: "capsizing-angle", title: "Devrilme açısı", hasContent: true },
      { id: "gz-curve-interpretation", title: "GZ eğrisinin yorumu", hasContent: true },
    ],
  },
  {
    id: "dynamic-stability",
    number: 10,
    title: "Dinamik Stabilite",
    icon: Zap,
    subtopics: [
      { id: "dynamic-righting-moment", title: "Dinamik doğrultma momenti", hasContent: true },
      { id: "area-concept", title: "Alan kavramı", hasContent: true },
      { id: "static-vs-dynamic", title: "Statik ve dinamik stabilite farkı", hasContent: true },
      { id: "wave-effect", title: "Dalga etkisi", hasContent: true },
      { id: "wind-effect", title: "Rüzgâr etkisi", hasContent: true },
    ],
  },
  {
    id: "damage-stability",
    number: 11,
    title: "Hasarlı Stabilite (Damage Stability)",
    icon: AlertTriangle,
    subtopics: [
      { id: "post-damage-floatation", title: "Hasar sonrası yüzerlik", hasContent: true },
      { id: "flooding-concept", title: "Flooding kavramı", hasContent: true },
      { id: "reserve-buoyancy", title: "Rezerv yüzerlik", hasContent: true },
      { id: "asymmetric-flooding", title: "Asimetrik flooding", hasContent: true },
      { id: "progressive-flooding", title: "Progressive flooding", hasContent: true },
      { id: "damaged-gm-gz", title: "Hasarlı GM ve GZ", hasContent: true },
      { id: "probabilistic-damage-stability", title: "Olasılıksal hasar stabilitesi (deterministik vs olasılıksal)", hasContent: true },
    ],
  },
  {
    id: "special-stability",
    number: 12,
    title: "Özel Stabilite Durumları",
    icon: Ship,
    subtopics: [
      { id: "heavy-lift", title: "Heavy lift operasyonları", hasContent: true },
      { id: "deck-cargo", title: "Güverte yükleri", hasContent: true },
      { id: "suspended-weight", title: "Asılı yük etkisi", hasContent: true },
      { id: "ballast-operations", title: "Balast operasyonları", hasContent: true },
      { id: "cargo-shift", title: "Kargo kayması", hasContent: true },
      { id: "icing-effect", title: "Buzlanma etkisi", hasContent: true },
      { id: "drydocking-stability", title: "Havuzlama (drydocking) stabilitesi", hasContent: true },
    ],
  },
  {
    id: "stability-criteria",
    number: 13,
    title: "Stabilite Kriterleri ve Uluslararası Kurallar",
    icon: Shield,
    subtopics: [
      { id: "imo-stability-criteria", title: "IMO stabilite kriterleri", hasContent: true },
      { id: "intact-stability-code", title: "Intact Stability Code", hasContent: true },
      { id: "wind-criteria", title: "Rüzgâr kriterleri", hasContent: true },
      { id: "wave-criteria", title: "Dalga kriterleri", hasContent: true },
      { id: "min-gm-requirements", title: "Minimum GM şartları", hasContent: true },
      { id: "operational-limits", title: "Operasyonel limitler", hasContent: true },
    ],
  },
  {
    id: "stability-accidents",
    number: 14,
    title: "Stabilite Kazaları ve Operasyonel Sonuçlar",
    icon: BookMarked,
    subtopics: [
      { id: "loading-errors", title: "Yükleme hataları", hasContent: true },
      { id: "fse-accidents", title: "Serbest yüzey kaynaklı kazalar", hasContent: true },
      { id: "wrong-gm-interpretation", title: "Yanlış GM yorumları", hasContent: true },
      { id: "trim-operation-errors", title: "Trim kaynaklı operasyon hataları", hasContent: true },
      { id: "psc-findings", title: "Stabiliteyle ilişkili PSC bulguları", hasContent: true },
    ],
  },
];

// İçerik veritabanı - her alt konu için detaylı içerik
interface TopicContent {
  title: string;
  introduction: string;
  content: string;
  bulletPoints?: string[];
  examples?: {
    problem: string;
    solution: string;
  }[];
  formula?: {
    name: string;
    expression: string;
    description: string;
  };
  keyPoints?: string[];
  warnings?: string[];
  images?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}

const topicContents: Record<string, TopicContent> = {
  "stability-definition": {
    title: "Stabilitenin Tanımı",
    introduction: "Stabilite, bir geminin dış kuvvetler altında dengesini koruma ve denge bozulduğunda eski haline dönme yeteneğidir.",
    content: `Ship stability is one of the most critical subjects in marine engineering. A ship must have adequate stability if it is to make a safe passage.

The concept of stability essentially answers this question: "Will the ship return upright when it heels?"

The stability of a body is determined by how it responds when it is moved from its equilibrium position. If the body tries to return to its former position it is stable; if it moves further away it is unstable.

On ships, stability changes continuously with the loading condition, the level of the tanks, the weather and the operations being carried out. A stability calculation must therefore be made for every loading condition.`,
    bulletPoints: [
      "Stabilite = Dengeyi koruma + Dengeye dönme yeteneği",
      "Yetersiz stabilite = Devrilme riski",
      "Aşırı stabilite = Sert salınım, yük hasarı",
      "Optimum stabilite = Güvenli ve konforlu seyir",
    ],
    keyPoints: [
      "Stabilite geminin en önemli güvenlik parametresidir",
      "Her yükleme durumunda kontrol edilmelidir",
      "IMO kriterleri minimum gereksinimleri belirler",
    ],
  },
  "balance-concepts": {
    title: "Denge, Devrilme ve Doğrultma Kavramları",
    introduction: "Gemilerde denge, üzerine etki eden kuvvetlerin dengede olması durumudur. Devrilme bu dengenin bozulması, doğrultma ise dengenin yeniden sağlanmasıdır.",
    content: `Two fundamental forces act on a ship in equilibrium:
1. The weight force (W) – acting downwards through the centre of gravity (G)
2. The buoyancy force (B) – acting upwards through the centre of buoyancy (B)

In equilibrium: W = B, and G and B lie on the same vertical line.

CAPSIZING:
When the ship heels, G stays where it is while B moves towards the low side. This creates a moment.

RIGHTING:
If the moment created tries to bring the ship upright, it is a "righting moment" and the ship is stable.
If the moment tries to heel the ship further, the ship is unstable.`,
    bulletPoints: [
      "Denge: W = B, G ve B aynı düşey doğruda",
      "Yatma: B noktası yatan tarafa kayar",
      "Doğrultma momenti: Gemiyi dik konuma getiren moment",
      "Devrilme momenti: Gemiyi daha fazla yatıran moment",
    ],
    formula: {
      name: "Righting Moment",
      expression: "RM = W × GZ",
      description: "RM: Doğrultma momenti (t-m), W: Deplasman (ton), GZ: Doğrultma kolu (m)",
    },
    keyPoints: [
      "Denge, kuvvetlerin eşitliği ve momentlerin sıfır olması demektir",
      "Devrilme, dengenin tehlikeli şekilde bozulmasıdır",
      "Doğrultma, geminin kendini düzeltme yeteneğidir",
    ],
  },
  "static-stability": {
    title: "Statik Stabilite",
    introduction: "Statik stabilite, geminin belirli bir yatma açısında sabit kaldığı ve hareket etmediği durumda analiz edilen stabilite türüdür.",
    content: `Static stability examines the equilibrium of the ship at a given angle of heel. The analysis is made for a condition in which there is no motion, that is, in which the ship is treated as "frozen" at that angle.

The basic question in static stability is: "Will the ship stay heeled at a given angle, or will it return upright?"

Static stability analysis is carried out using the GZ (righting lever) curve. This curve shows how much righting moment the ship produces at different angles of heel.

A positive GZ value shows that at that angle the ship tends to return upright.
A negative GZ value shows that the ship tends to heel further.`,
    bulletPoints: [
      "Statik = Hareket yok, anlık denge analizi",
      "GZ eğrisi statik stabilitenin temel aracıdır",
      "Pozitif GZ = Gemi dik duruma dönecek",
      "Negatif GZ = Gemi daha fazla yatacak",
    ],
    keyPoints: [
      "Statik stabilite, belirli bir andaki denge durumunu inceler",
      "GZ eğrisi, tüm yatma açıları için stabilite bilgisi verir",
      "IMO kriterleri statik stabilite üzerine kuruludur",
    ],
  },
  "dynamic-stability-intro": {
    title: "Dinamik Stabilite",
    introduction: "Dinamik stabilite, geminin hareket halindeyken ve dış kuvvetlere maruz kalırken gösterdiği stabilite davranışıdır.",
    content: `Dynamic stability examines the behaviour of the ship in real sea conditions. Unlike static stability, here the motion of the ship and the energy balance are taken into account.

External forces such as waves, wind and manoeuvring transfer energy to the ship. This energy is converted into heeling motion. The ship must be able to absorb this energy and keep its equilibrium without capsizing.

Dynamic stability is measured by the area under the GZ curve. This area represents the amount of energy the ship can absorb up to a given angle.

A large area = more energy absorbing capacity = better dynamic stability`,
    bulletPoints: [
      "Dinamik = Hareket var, enerji dengesi analizi",
      "Dış kuvvetler gemiye enerji aktarır",
      "GZ eğrisi altındaki alan = Enerji kapasitesi",
      "IMO kriterleri alan gereksinimlerini belirler",
    ],
    formula: {
      name: "Dinamik Stabilite",
      expression: "E = ∫ Δ × GZ × dθ",
      description: "E: Enerji (t-m-rad), Δ: Deplasman (ton), GZ: Doğrultma kolu (m), θ: Açı (rad)",
    },
    keyPoints: [
      "Dinamik stabilite gerçek deniz koşullarını yansıtır",
      "Enerji dengesi kritik öneme sahiptir",
      "Alan kriterleri IMO tarafından zorunlu kılınmıştır",
    ],
  },
  "initial-stability": {
    title: "İlk Stabilite Kavramı",
    introduction: "İlk stabilite (initial stability), geminin küçük yatma açılarındaki (0-10°) stabilite davranışını tanımlar ve GM değeri ile ifade edilir.",
    content: `Initial stability is the stability of the ship at small angles of heel from upright (generally up to 10°). Within this range the metacentre (M) is taken as fixed.

The measure of initial stability is the metacentric height GM:
GM = KM - KG

Where:
- KM: the distance from the keel to the metacentre (from the hydrostatic tables)
- KG: the distance from the keel to the centre of gravity (from the loading calculation)

Large GM = a stiff ship, rapid rolling
Small GM = a tender ship, slow rolling
Negative GM = an unstable ship, danger!`,
    bulletPoints: [
      "İlk stabilite küçük açılar (0-10°) için geçerlidir",
      "GM değeri ilk stabilitenin ölçüsüdür",
      "Calculated with the formula GM = KM - KG",
      "GM pozitif olmalıdır (minimum 0.15 m)",
    ],
    formula: {
      name: "Metasantrik Yükseklik",
      expression: "GM = KM - KG",
      description: "GM: Metasantrik yükseklik (m), KM: Omurgadan metasantra (m), KG: Omurgadan ağırlık merkezine (m)",
    },
    keyPoints: [
      "GM pozitif olmalıdır - negatif GM tehlikelidir",
      "Çok büyük GM sert salınıma neden olur",
      "Çok küçük GM yavaş tepki ve risk demektir",
    ],
    warnings: [
      "If GM is negative the ship cannot stay upright and rests at an angle of loll",
      "The minimum GM value is set by the IMO according to ship type",
    ],
  },
  "metacenter-m": {
    title: "Metasantr (M) kavramı",
    introduction: "Metasantr, gemi küçük açılarla yattığında kaldırma merkezinin izlediği eğrinin dikey eksenle kesiştiği noktadır ve ilk stabilitenin geometrik temelidir.",
    content: `The metacentre (M) is the point at which the vertical drawn through the new position of the centre of buoyancy (B), when the ship heels through a very small angle, intersects the ship's centreline. This point determines whether or not a righting moment is produced at small angles.

The position of the metacentre is determined by the distance BM, calculated from the waterplane moment of inertia and the immersed volume. BM is the vertical distance between B and M and is sensitive to the shape of the waterplane.`,
    images: [
      {
        src: metacenterDiagram,
        alt: "Metacentre and GM diagram",
        caption: "Figure: the points K, B, G and M in a midship section, and the GM distance",
      },
    ],
    bulletPoints: [
      "M noktası küçük yatma açılarında sabit kabul edilir",
      "BM mesafesi su hattı geometrisine bağlıdır",
      "Metasantr, ilk stabilitenin geometrik referans noktasıdır",
    ],
    formula: {
      name: "Metasantrik Yarıçap",
      expression: "BM = I / ∇; KM = KB + BM",
      description: "BM: Metasantrik yarıçap (m), I: Su hattı atalet momenti (m⁴), ∇: Batık hacim (m³), KB: Omurgadan kaldırma merkezine (m)",
    },
    examples: [
      {
        problem: "If I = 3,200 m⁴, ∇ = 6,400 m³ and KB = 3.2 m, what are BM and KM in metres?",
        solution: "1) BM = I / ∇ = 3,200 / 6,400 = 0.5 m. 2) KM = KB + BM = 3.2 + 0.5 = 3.7 m. Result: the metacentre is 3.7 m above the keel.",
      },
    ],
    keyPoints: [
      "BM büyüdükçe metasantr yükselir",
      "Su hattı genişledikçe I artar ve BM büyür",
      "Metasantr konumu ilk stabilitenin temel girdisidir",
    ],
  },
  "metacentric-height-gm": {
    title: "Metasantrik yükseklik (GM)",
    introduction: "Metasantrik yükseklik GM, metasantr ile ağırlık merkezi arasındaki düşey mesafedir ve ilk stabilitenin sayısal ölçüsüdür.",
    content: `GM shows how quickly the ship will produce a righting moment at small angles of heel. If GM is positive the ship tends to return upright; if GM is negative the ship is unstable.

The GM value is the difference between the KM taken from the hydrostatic tables and the KG produced by the loading calculation. As GM increases the ship becomes stiffer and the rolling period shortens.

Diagram: a sketch showing KB, G and M on the same vertical line above the keel, with the GM interval highlighted.`,
    bulletPoints: [
      "GM, ilk stabilitenin ana göstergesidir",
      "GM pozitif olmalıdır",
      "KM hidrostatik veriden, KG yükleme hesabından gelir",
    ],
    formula: {
      name: "Metasantrik Yükseklik",
      expression: "GM = KM - KG",
      description: "GM: Metasantrik yükseklik (m), KM: Omurgadan metasantra (m), KG: Omurgadan ağırlık merkezine (m)",
    },
    examples: [
      {
        problem: "If KM = 7.2 m and KG = 6.6 m, what is GM in metres?",
        solution: "1) GM = KM - KG. 2) GM = 7.2 - 6.6 = 0.6 m. Result: since GM is positive the ship is stable at small angles.",
      },
    ],
    keyPoints: [
      "GM büyüdükçe doğrultma momenti artar",
      "GM küçüldükçe gemi yumuşar ve yatma eğilimi artar",
      "GM negatif ise gemi loll açısına gider",
    ],
  },
  "kb-bm-kg-relation": {
    title: "KB, BM ve KG ilişkisi",
    introduction: "KB, BM ve KG arasındaki ilişki, metasantrik yükseklik ve ilk stabiliteyi belirleyen temel geometrik zincirdir.",
    content: `KB is the distance from the keel to the centre of buoyancy and depends on the immersed shape. BM is the ratio of the waterplane moment of inertia to the immersed volume. KG is the height of the centre of gravity above the keel.

When these three quantities are brought together, KM is calculated first and then GM is found. This chain is the most fundamental geometric relationship used in the stability calculation.

Diagram: the keel, KB, BM and KG points on a transverse section of the ship, with the KM and GM intervals shown by dimension lines.`,
    bulletPoints: [
      "KB hidrostatik tablodan gelir",
      "BM su hattı şekline duyarlıdır",
      "KG yükleme durumuna bağlıdır",
    ],
    formula: {
      name: "Geometrik İlişkiler",
      expression: "KM = KB + BM; GM = KM - KG",
      description: "KM: Omurgadan metasantra (m), KB: Omurgadan kaldırma merkezine (m), BM: Metasantrik yarıçap (m), KG: Omurgadan ağırlık merkezine (m)",
    },
    examples: [
      {
        problem: "If KB = 4.0 m, BM = 1.2 m and KG = 4.6 m, what are KM and GM in metres?",
        solution: "1) KM = KB + BM = 4.0 + 1.2 = 5.2 m. 2) GM = KM - KG = 5.2 - 4.6 = 0.6 m. Result: GM is positive, so the initial stability is adequate.",
      },
    ],
    keyPoints: [
      "KG yükseldikçe GM azalır",
      "BM, su hattı genişliğine ve formuna bağlıdır",
      "KB ve BM hidrostatik tablolarla desteklenmelidir",
    ],
  },
  "positive-gm": {
    title: "Pozitif GM",
    introduction: "Pozitif GM, ağırlık merkezinin metasantrın altında olduğunu ve geminin küçük açılarda doğrultma momenti üretebildiğini gösterir.",
    content: `When GM is positive and the ship heels through a small angle, a righting lever GZ is created and the ship tends to return upright. In this condition the righting moment acts in the positive direction.

For small angles GZ is taken as GM multiplied by the sine of the angle. This simple relationship is used in initial stability calculations.

Diagram: G below M, the ship heeled through a small angle, with the GZ lever and the righting moment arrows shown.`,
    bulletPoints: [
      "Pozitif GM, ilk stabilitenin varlığını gösterir",
      "GZ doğrultma kolu pozitif olur",
      "Doğrultma momenti gemiyi dikleştirir",
    ],
    formula: {
      name: "Küçük Açı Doğrultma İlişkisi",
      expression: "GZ ≈ GM × sin θ; RM = Δ × GZ",
      description: "GZ: Doğrultma kolu (m), GM: Metasantrik yükseklik (m), θ: Yatma açısı (derece), RM: Doğrultma momenti (t m), Δ: Deplasman (ton)",
    },
    examples: [
      {
        problem: "If GM = 0.8 m, θ = 10° and Δ = 5,000 tonnes, what are GZ and RM?",
        solution: "1) sin 10° ≈ 0.174. 2) GZ ≈ 0.8 × 0.174 = 0.139 m. 3) RM = Δ × GZ = 5,000 × 0.139 = 695 t m. Result: the righting moment is positive and the ship tends to return upright.",
      },
    ],
    keyPoints: [
      "Pozitif GM güvenli başlangıç stabilitesi sağlar",
      "GZ ve RM değerleri açıyla artar",
      "Küçük açılar yaklaşımı 10 dereceye kadar geçerlidir",
    ],
  },
  "negative-gm": {
    title: "Negatif GM",
    introduction: "Negatif GM, ağırlık merkezinin metasantrın üzerinde olduğunu ve geminin küçük açılarda dengesiz olduğunu gösterir.",
    content: `When GM is negative and the ship heels through a small angle, the righting lever GZ becomes negative. The moment then heels the ship further and the ship behaves unstably.

A negative GM can cause the ship to come to rest at an angle of loll. This condition is operationally dangerous and the loading must be corrected immediately.

Diagram: G above M, the ship heeled through a small angle, with the GZ lever and the moment arrows shown in the capsizing direction.`,
    bulletPoints: [
      "Negatif GM dengesizliği gösterir",
      "GZ negatif olur ve devrilme momenti oluşur",
      "Loll açısı oluşabilir ve operasyonel risk doğar",
    ],
    formula: {
      name: "Negatif GM Durumu",
      expression: "GZ ≈ GM × sin θ; RM = Δ × GZ",
      description: "GM negatif ise GZ ve RM de negatif olur ve moment devrilme yönündedir",
    },
    examples: [
      {
        problem: "If GM = -0.3 m, θ = 8° and Δ = 5,000 tonnes, what are GZ and RM?",
        solution: "1) sin 8° ≈ 0.139. 2) GZ ≈ -0.3 × 0.139 = -0.042 m. 3) RM = 5,000 × -0.042 = -210 t m. Result: the negative moment heels the ship further.",
      },
    ],
    keyPoints: [
      "Negatif GM acil düzeltme gerektirir",
      "Loll açısı geminin kararlı görünen ama riskli konumudur",
      "Yükleme ve balast düzeni gözden geçirilmelidir",
    ],
  },
  "gm-ship-movements": {
    title: "GM'nin gemi hareketlerine etkisi",
    introduction: "GM, geminin yalpa periyodunu ve hareket karakterini belirler; büyük GM sert, küçük GM yumuşak hareketlere neden olur.",
    content: `As GM increases the ship's righting moment increases and the rolling period shortens. This makes the ship stiff and increases the dynamic forces on the cargo.

As GM decreases the rolling period lengthens, the ship rolls slowly and passenger comfort may improve; but the margin of stability is reduced. The GM value must therefore be weighed carefully between safety and comfort.

Diagram: a comparison of the rolling period curve and the amplitude of roll for different GM values.`,
    bulletPoints: [
      "Büyük GM = Kısa periyot, sert hareket",
      "Küçük GM = Uzun periyot, yumuşak hareket",
      "Konfor ve güvenlik arasında denge gerekir",
    ],
    formula: {
      name: "Rolling Period",
      expression: "T = 2π × √(k² / (g × GM))",
      description: "T: Yalpa periyodu (s), k: Atalet yarıçapı (m), g: Yer çekimi ivmesi (9.81 m s²), GM: Metasantrik yükseklik (m)",
    },
    examples: [
      {
        problem: "For k = 4.5 m and GM = 0.6 m, what is the rolling period in seconds?",
        solution: "1) k² = 4.5 × 4.5 = 20.25. 2) g × GM = 9.81 × 0.6 = 5.886. 3) 20.25 / 5.886 = 3.44. 4) √3.44 = 1.855. 5) T = 2π × 1.855 = 11.65 s. Result: the rolling period is about 11.6 seconds.",
      },
    ],
    keyPoints: [
      "GM artışı periyodu azaltır",
      "Aşırı GM yük ve ekipman üzerinde darbe etkisi oluşturur",
      "Operasyonel konfor için GM hedef aralığı belirlenmelidir",
    ],
  },
  "stability-safety": {
    title: "Stabilite ve Seyir Emniyeti İlişkisi",
    introduction: "Stabilite, seyir emniyetinin temel direğidir. Yetersiz stabilite can kaybına, gemi kaybına ve çevre felaketlerine yol açabilir.",
    content: `Many tragic casualties in maritime history have been caused by inadequate stability. These casualties have led to the stability rules being updated and tightened continuously.

The relationship between stability and safety:
1. Crew safety: capsizing causes loss of life
2. Passenger safety: thousands of people are at risk on passenger ships
3. Environmental safety: fuel and cargo can leak into the sea
4. Economic safety: the loss of ship and cargo causes major financial damage

The ISM (International Safety Management) Code makes stability management mandatory. The master must verify that stability is adequate in every loading condition.`,
    bulletPoints: [
      "Yetersiz stabilite = Can kaybı riski",
      "ISM Kodu stabilite yönetimini zorunlu kılar",
      "Kaptan stabilite sorumluluğu taşır",
      "Her yükleme için stabilite hesabı şarttır",
    ],
    keyPoints: [
      "Stabilite, en kritik emniyet parametresidir",
      "Tarihi kazalar mevzuatı şekillendirmiştir",
      "Yükleme bilgisayarları stabilite kontrolünde kullanılır",
    ],
    warnings: [
      "Inadequate stability can cause the ship to founder",
      "The limits in the stability booklet must be complied with",
    ],
  },
  "weight-addition": {
    title: "Ağırlık eklenmesi",
    introduction: "Gemiye yeni bir ağırlık eklendiğinde toplam deplasman artar ve ağırlık merkezi eklenen yükün konumuna doğru kayar.",
    content: `Adding weight covers operations such as loading cargo, taking bunkers/ballast and installing equipment. Because the added weight increases the total weight, the ship's draft increases and the KG, LCG and TCG values change.

The new centre of gravity is calculated by the method of moments. The vertical (kg), transverse (tcg) and longitudinal (lcg) positions of the added weight are each assessed separately. This is essential at every loading step in order to stay within the limits of the stability book.

Diagram: the added weight on the ship, with the vector along which G moves towards the weight and the moment arm shown.`,
    bulletPoints: [
      "Deplasman artar, draft büyür",
      "G noktası eklenen yükün konumuna yaklaşır",
      "KG, LCG ve TCG ayrı ayrı güncellenir",
    ],
    formula: {
      name: "Ağırlık Ekleme ile Yeni KG",
      expression: "KG₁ = (Δ × KG₀ + w × kg) / (Δ + w)",
      description: "Δ: başlangıç deplasmanı (t), KG₀: başlangıç KG (m), w: eklenen ağırlık (t), kg: eklenen yükün dikey konumu (m)",
    },
    examples: [
      {
        problem: "Δ = 5,000 t, KG₀ = 6.2 m, and a weight of w = 200 t is added at kg = 9.0 m. What is the new KG in metres?",
        solution: "KG₁ = (5,000×6.2 + 200×9.0) / 5,200 = (31,000 + 1,800) / 5,200 = 6.31 m. Result: KG rises and GM falls.",
      },
    ],
    keyPoints: [
      "Yük yukarıda eklenirse KG artar, stabilite azalır",
      "Yük aşağıda eklenirse KG düşer, stabilite artar",
      "Her ekleme adımı için yeni G konumu hesaplanmalıdır",
    ],
  },
  "weight-removal": {
    title: "Ağırlık çıkarılması",
    introduction: "Ağırlık çıkarıldığında deplasman azalır ve ağırlık merkezi çıkarılan yükün ters yönüne kayar.",
    content: `Removing weight occurs through operations such as discharging cargo, consuming fuel or discharging ballast. The ship becomes lighter, the draft decreases and G moves in the opposite direction to the position of the weight removed.

If the weight removed was high up, KG decreases and stability may improve; if weight is removed from low down, KG rises and stability decreases. The consumption and discharge plan must therefore be watched carefully from the stability point of view.

Diagram: the movement of G in the opposite direction after the weight is removed, with the moment arm shown.`,
    bulletPoints: [
      "Deplasman azalır, draft küçülür",
      "G noktası çıkarılan yükün ters yönüne kayar",
      "Yüksekte ağırlık çıkarmak stabiliteyi iyileştirir",
    ],
    formula: {
      name: "Ağırlık Çıkarma ile Yeni KG",
      expression: "KG₁ = (Δ × KG₀ - w × kg) / (Δ - w)",
      description: "Δ: başlangıç deplasmanı (t), KG₀: başlangıç KG (m), w: çıkarılan ağırlık (t), kg: çıkarılan yükün dikey konumu (m)",
    },
    examples: [
      {
        problem: "Δ = 4,800 t, KG₀ = 5.9 m, and a weight of w = 150 t is removed from kg = 10 m. What is the new KG in metres?",
        solution: "KG₁ = (4,800×5.9 - 150×10) / 4,650 = (28,320 - 1,500) / 4,650 = 5.77 m. Result: KG falls and stability improves.",
      },
    ],
    keyPoints: [
      "Üstten ağırlık çıkarma GM’yi artırır",
      "Alttan ağırlık çıkarma GM’yi azaltır",
      "Yakıt tüketimi stabilite planında mutlaka izlenmelidir",
    ],
  },
  "weight-shift": {
    title: "Ağırlık kaydırılması",
    introduction: "Ağırlık kaydırma, deplasmanı değiştirmeden ağırlık merkezinin yön değiştirmesine neden olur ve list/trim oluşturabilir.",
    content: `Shifting weight means moving a weight from one position to another within the ship. The total displacement does not change in this operation, but G moves in the direction in which the weight is moved.

A transverse shift causes list and a longitudinal shift causes a change of trim. A vertical shift affects GM directly. The effect of shifting weight must therefore always be calculated during crane operations, container moves and ballast transfers.

Diagram: the weight moved to its new position, with the vector of the shift of G and the resulting moment arm shown.`,
    bulletPoints: [
      "Deplasman sabit kalır, G noktası yer değiştirir",
      "Enine kaydırma list oluşturur",
      "Boyuna kaydırma trim değiştirir",
    ],
    formula: {
      name: "Ağırlık Kaydırma ile G Değişimi",
      expression: "GG₁ = (w × d) / Δ",
      description: "GG₁: G’nin kayma miktarı (m), w: kaydırılan ağırlık (t), d: kaydırma mesafesi (m), Δ: deplasman (t)",
    },
    examples: [
      {
        problem: "Δ = 6,000 t and a weight of w = 120 t is shifted 6 m transversely. How far does G move?",
        solution: "GG₁ = (120×6) / 6,000 = 0.12 m. Result: G moves 12 cm and a list is created.",
      },
    ],
    keyPoints: [
      "G kayması doğrudan list/trim yaratır",
      "Vinç operasyonlarında kaydırma etkisi kritiktir",
      "Kısa mesafeler bile büyük list oluşturabilir",
    ],
  },
  "vertical-weight-movement": {
    title: "Dikey ağırlık hareketleri",
    introduction: "Ağırlığın dikey taşınması KG’yi değiştirir ve geminin ilk stabilitesini doğrudan etkiler.",
    content: `In vertical weight movements, KG increases if the weight is moved up and decreases if it is moved down. This operation does not change the displacement but has a strong effect on GM.

Lifting a weight with a crane, placing equipment on deck or transferring ballast to the bottom tanks are all vertical weight movements. In particular, when a weight is suspended the effective position of its centre of gravity is taken as having moved to the point of suspension.

Diagram: the weight moved up/down, with the new position of KG and the change in GM shown.`,
    bulletPoints: [
      "Yukarı taşıma KG’yi artırır, GM azalır",
      "Aşağı taşıma KG’yi azaltır, GM artar",
      "Askıdaki yük, ağırlık merkezini askı noktasına taşır",
    ],
    formula: {
      name: "Dikey Taşıma ile KG Değişimi",
      expression: "ΔKG = (w × d) / Δ",
      description: "ΔKG: KG değişimi (m), w: taşınan ağırlık (t), d: dikey taşıma mesafesi (m), Δ: deplasman (t)",
    },
    examples: [
      {
        problem: "Δ = 7,200 t and a weight of w = 80 t is moved 4 m upwards. By how much does KG increase?",
        solution: "ΔKG = (80×4) / 7,200 = 0.044 m. Result: KG increases by about 4.4 cm and GM falls.",
      },
    ],
    keyPoints: [
      "Dikey hareketler GM üzerinde en hızlı etkiye sahiptir",
      "Yükün askıda olduğu sürede stabilite azalır",
      "Kritik operasyonlarda izinli KG limitleri kontrol edilmelidir",
    ],
  },
  "transverse-weight-movement": {
    title: "Enine ağırlık hareketleri",
    introduction: "Enine ağırlık hareketleri TCG’yi değiştirir ve gemide list (yana yatma) oluşturur.",
    content: `A transverse shift is the movement of a weight from port to starboard or from starboard to port. G moves towards the low side and the ship comes to an angle of equilibrium.

For small angles the list calculation is based on the principle of balancing the righting moment against the heeling moment. Because transverse shifts are frequent in port operations, they must always be calculated in the loading plan.

Diagram: the transverse movement of the weight, the shift of TCG and the resulting angle of list.`,
    bulletPoints: [
      "TCG kayması list oluşturur",
      "Küçük açılarda tan θ yaklaşımı kullanılır",
      "Konteyner ve palet yer değiştirmeleri list yaratabilir",
    ],
    formula: {
      name: "Enine Kaydırmada List Açısı",
      expression: "tan θ = (w × d) / (Δ × GM)",
      description: "θ: list açısı (rad), w: taşınan ağırlık (t), d: enine taşıma mesafesi (m), Δ: deplasman (t), GM: metasantrik yükseklik (m)",
    },
    examples: [
      {
        problem: "Δ = 5,500 t, GM = 0.9 m, and a weight of w = 60 t is shifted 5 m transversely. What is the approximate angle of list in degrees?",
        solution: "tan θ = (60×5) / (5,500×0.9) = 300 / 4,950 = 0.0606. θ ≈ 3.47°. Result: a list of about 3.5° is created.",
      },
    ],
    keyPoints: [
      "GM küçüldükçe list açısı büyür",
      "Enine taşıma operasyonları limitler içinde yapılmalıdır",
      "Yükler simetrik yerleştirilmeli, list izlenmelidir",
    ],
  },
  "longitudinal-weight-movement": {
    title: "Boyuna ağırlık hareketleri",
    introduction: "Boyuna ağırlık hareketleri LCG’yi değiştirir ve geminin trimini etkiler.",
    content: `Weights moved longitudinally change the fore-and-aft balance of the ship. This change is expressed as a shift of LCG and causes trim.

The key quantity in the trim calculation is the MCT (Moment to Change Trim). The change of trim is found by comparing the longitudinal shifting moment (w × d) with the MCT. This analysis is critical for the loading plan and for preparing for sea.

Diagram: the weight shifted forward/aft, the shift of LCG and the resulting direction of trim.`,
    bulletPoints: [
      "LCG kayması trim değiştirir",
      "Trim hesabında MCT kullanılır",
      "Baş-kıç dengesizliği performansı etkiler",
    ],
    formula: {
      name: "Boyuna Kaydırmada Trim Değişimi",
      expression: "Trim = (w × d) / MCT",
      description: "Trim: trim değişimi (m veya cm), w: taşınan ağırlık (t), d: boyuna taşıma mesafesi (m), MCT: trim değişimi momenti (t·m/cm veya t·m/m)",
    },
    examples: [
      {
        problem: "A weight of w = 200 t is shifted 12 m forward. If MCT = 400 t·m/cm, what is the change of trim in cm?",
        solution: "Trim = (200×12) / 400 = 2,400 / 400 = 6 cm. Result: the trim by the head increases by about 6 cm.",
      },
    ],
    keyPoints: [
      "Trim değişimi yakıt tüketimi ve hız üzerinde etkilidir",
      "LCG kaymasıyla birlikte LCB uyumu kontrol edilmelidir",
      "MCT değeri hidrostatik tablolardan alınır",
    ],
  },
  // Diğer konular için içerikler...
  "weight-w": {
    title: "Weight (W)",
    introduction: "Geminin toplam ağırlığı, deplasman olarak adlandırılır ve geminin yüzmesi için gereken kaldırma kuvvetini belirler.",
    content: `The weight of the ship (W or Δ) is the total weight of all its components:

W = Lightship weight + Cargo + Fuel + Fresh water + Provisions + Crew + ...

This total weight is expressed in tonnes (t) and is called the "displacement".

By Archimedes' principle a floating body displaces water equal to its own weight. Therefore:
Displacement = the weight of the water displaced

Displacement is the basis of stability calculations. The righting moment is the displacement multiplied by GZ.`,
    bulletPoints: [
      "Deplasman = Geminin toplam ağırlığı",
      "Deplasman = Yer değiştirilen su ağırlığı",
      "Birim: ton (t) veya metrik ton",
      "Draft arttıkça deplasman artar",
    ],
    formula: {
      name: "Deplasman Hesabı",
      expression: "Δ = ∇ × ρ",
      description: "Δ: Deplasman (ton), ∇: Batık hacim (m³), ρ: Deniz suyu yoğunluğu (1.025 t/m³)",
    },
    examples: [
      {
        problem: "If lightship = 3,500 t, cargo = 1,200 t, fuel = 300 t and fresh water = 50 t, what is the displacement in tonnes?",
        solution: "Δ = 3.500 + 1.200 + 300 + 50 = 5.050 ton",
      },
    ],
    keyPoints: [
      "Deplasman, stabilitenin temel girdisidir",
      "Yükleme ile deplasman değişir",
      "Hidrostatik tablolardan draft-deplasman ilişkisi okunur",
    ],
  },
  "center-of-gravity": {
    title: "Ağırlık Merkezi (G)",
    introduction: "Ağırlık merkezi (G), geminin tüm ağırlığının tek bir noktada toplandığı varsayılan noktadır ve stabilitenin en kritik parametresidir.",
    content: `The centre of gravity G is the resultant point of all the weights on the ship, calculated by the method of moments.

The position of G is defined in three dimensions:
- KG: the vertical distance from the keel to G (the most critical)
- LCG: the longitudinal centre of gravity (important for trim)
- TCG: the transverse centre of gravity (important for list)

The KG value is the fundamental determinant of stability:
- If KG rises → GM falls → stability weakens
- If KG falls → GM rises → stability improves

Every movement of weight changes the position of G.`,
    bulletPoints: [
      "G = Tüm ağırlıkların bileşke noktası",
      "KG yüksekliği stabiliteyi doğrudan etkiler",
      "Yük ekleme/çıkarma G'yi hareket ettirir",
      "Yük taşıma G'yi taşınan yöne kaydırır",
    ],
    formula: {
      name: "KG Hesabı",
      expression: "KG = Σ(wᵢ × kgᵢ) / Σwᵢ",
      description: "Her bir ağırlığın momentleri toplamı / toplam ağırlık",
    },
    examples: [
      {
        problem: "If 100 t of cargo is at KG = 6 m and 200 t at KG = 3 m, what is the combined KG in metres?",
        solution: "KG = (100×6 + 200×3) / 300 = (600 + 600) / 300 = 4.0 m",
      },
    ],
    keyPoints: [
      "KG ne kadar düşükse stabilite o kadar iyidir",
      "Her yükleme işleminde KG yeniden hesaplanmalıdır",
      "Yük taşıma işlemi başladığı anda G anında değişir",
    ],
  },
  "buoyancy-force": {
    title: "Kaldırma Kuvveti",
    introduction: "Kaldırma kuvveti, gemiyi su üzerinde tutan temel kuvvettir ve yer değiştirdiği suyun ağırlığına eşittir.",
    content: `The buoyancy force is equal to the weight of the water displaced by the immersed volume of the ship. It acts upwards through the centre of buoyancy (B) and keeps the ship afloat by balancing its weight.

The buoyancy force depends on the density of the water. A ship therefore floats deeper in fresh water and higher in sea water.

In stability calculations the buoyancy force is taken as equal to the ship's displacement:
B = W = Δ`,
    bulletPoints: [
      "Kaldırma kuvveti yukarı yönlüdür ve B noktasından etkir",
      "Yüzen gemide Y = W dengesi vardır",
      "Suyun yoğunluğu değiştikçe kaldırma kuvveti değişir",
    ],
    formula: {
      name: "Kaldırma Kuvveti",
      expression: "Y = ρ × g × ∇",
      description: "Y: Kaldırma kuvveti (kN), ρ: Yoğunluk (t/m³), g: 9.81 m/s², ∇: Batık hacim (m³)",
    },
    examples: [
      {
        problem: "For a ship with ∇ = 3,000 m³ in water of ρ = 1.025 t/m³, what is the buoyancy force in kN?",
        solution: "Y = 1.025 × 9.81 × 3.000 ≈ 30 166 kN",
      },
    ],
    keyPoints: [
      "Kaldırma kuvveti geminin ağırlığına eşittir",
      "Yoğunluk değişimi draftı etkiler",
      "B noktası değiştikçe doğrultma momenti oluşur",
    ],
  },
  "center-of-buoyancy": {
    title: "Kaldırma Merkezi (B)",
    introduction: "Kaldırma merkezi (B), batmış hacmin geometrik ağırlık merkezidir ve kaldırma kuvvetinin etki noktasıdır.",
    content: `The centre of buoyancy (B) is the geometric centre of the ship's immersed volume. This point moves when the ship heels because the shape of the immersed volume changes.

As the ship begins to heel, B moves towards the low side. This movement creates a moment arm relative to the centre of gravity and a righting moment is produced.

For simple prismatic shapes B lies at the centre of the immersed volume and, in the upright condition, is T/2 above the keel.`,
    bulletPoints: [
      "B, batmış hacmin geometrik merkezidir",
      "Gemi yattığında B yatılan tarafa kayar",
      "B'nin kayması doğrultma momentinin temelidir",
    ],
    formula: {
      name: "Kaldırma Merkezi Yüksekliği",
      expression: "KB = (∫ z · d∇) / ∇",
      description: "KB: Omurgadan kaldırma merkezine dikey mesafe, z: derinlik koordinatı",
    },
    examples: [
      {
        problem: "For a ship of rectangular section at a draft of T = 4 m, what is KB approximately in metres?",
        solution: "For a rectangular section KB ≈ T/2 = 2.0 m",
      },
    ],
    keyPoints: [
      "KB değeri hidrostatik tablolardan alınır",
      "B'nin hareketi GZ kolunu oluşturur",
      "Şekil değiştikçe B'nin konumu değişir",
    ],
  },
  "gz-righting-lever": {
    title: "Righting Lever (GZ)",
    introduction: "GZ, gemi yattığında ağırlık kuvveti ile kaldırma kuvveti arasındaki yatay mesafeyi ifade eder ve doğrultma momentinin temelidir.",
    content: `GZ (the righting lever) is the horizontal distance between the centre of gravity (G) and the line of action of the buoyancy force when the ship is heeled through a given angle. This lever produces the righting moment and shows the ship's tendency to return upright.

At small angles GZ is taken as approximately GM × sinθ. This relationship provides a quick check in initial stability assessments. When GZ is positive the righting moment brings the ship upright; when GZ is negative the ship tends to heel further.`,
    bulletPoints: [
      "GZ doğrultma momentinin koludur",
      "Pozitif GZ: gemi dikleşme eğiliminde",
      "Negatif GZ: devrilme eğilimi",
      "Küçük açılarda GZ ≈ GM × sinθ",
    ],
    formula: {
      name: "Righting Moment",
      expression: "RM = Δ × GZ",
      description: "RM: Doğrultma momenti (t·m), Δ: Deplasman (ton), GZ: Doğrultma kolu (m)",
    },
    keyPoints: [
      "GZ eğrisi geminin tüm yatma açıları için stabilite profilini verir",
      "GZ büyüklüğü, stabilite kalitesinin doğrudan göstergesidir",
      "Yükleme değişiklikleri GZ'yi önemli ölçüde etkiler",
    ],
  },
  "gz-curve-generation": {
    title: "GZ Eğrisinin Elde Edilmesi",
    introduction: "GZ eğrisi, geminin farklı yatma açılarındaki doğrultma kollarının hesaplanmasıyla oluşturulan stabilite eğrisidir.",
    content: `The GZ curve is obtained by calculating the GZ values for a range of angles of heel (usually 0°-90°, and further if required). These calculations are based on the geometry and hydrostatic properties of the ship in a given loading condition.

The classical method involves the following steps:
1) The waterline and immersed volume are calculated for the chosen angle of heel.
2) The new position of the centre of buoyancy (B) is found.
3) The horizontal distance between G and B (GZ) is determined.
4) The process is repeated for all angles to build the curve.

In modern practice this process is carried out automatically by stability software; but the results must be consistent with the stability booklet and the hydrostatic tables.`,
    images: [
      {
        src: gzCurveDiagram,
        alt: "GZ curve diagram",
        caption: "Figure: a typical GZ curve - righting lever against angle of heel",
      },
    ],
    bulletPoints: [
      "GZ eğrisi her yükleme durumu için ayrı hesaplanır",
      "Hidrostatik tablolar ve stabilite yazılımı kullanılır",
      "GZ eğrisi, IMO kriterlerinin temel girdisidir",
    ],
    keyPoints: [
      "Doğru GZ eğrisi için doğru KG ve deplasman şarttır",
      "Serbest yüzey düzeltmeleri mutlaka dahil edilmelidir",
      "Eğri, hasarlı stabilite için ayrıca oluşturulur",
    ],
  },
  "max-gz": {
    title: "Maksimum GZ",
    introduction: "Maksimum GZ, doğrultma kolunun en büyük değerini aldığı yatma açısıdır ve geminin stabilite kapasitesinin önemli bir göstergesidir.",
    content: `The GZ curve rises up to a certain angle and then falls away towards zero. The peak of the curve shows the ship's greatest righting capacity.

Criteria such as the IMO 2008 IS Code require the maximum GZ value and the angle at which it occurs to meet defined minima. For general cargo ships, for example, GZmax ≥ 0.20 m is required and this maximum is expected to occur at around at least 25°-30° (this varies with ship type).

A very low maximum GZ, or one that occurs at a small angle, can indicate inadequate stability.`,
    bulletPoints: [
      "Maksimum GZ stabilite kapasitesinin tepe noktasıdır",
      "Aşırı küçük açıdaki maksimum GZ risklidir",
      "Gemi tipine göre minimum GZmax kriterleri vardır",
    ],
    keyPoints: [
      "GZmax, GM'den bağımsız olarak büyük açılı davranışı temsil eder",
      "Üst ağırlıkların artması GZmax'ı düşürür",
      "GZmax değeri yükleme planı ile kontrol edilir",
    ],
    warnings: [
      "If the GZmax criterion is not met, the safety of the voyage is at risk",
      "Deck cargo and the free surface effect can reduce GZmax rapidly",
    ],
  },
  "stability-area": {
    title: "Stabilite Alanı",
    introduction: "Stabilite alanı, GZ eğrisi altında kalan alanı ifade eder ve geminin dinamik stabilite enerji kapasitesini gösterir.",
    content: `The area under the GZ curve over a given range of angles represents the ship's capacity to absorb the energy of external forces. The larger this area, the better the ship can meet the effects of waves and wind.

The IMO criteria define minimum area values for different ranges of angle (e.g. 0°-30°, 0°-40° and 30°-40°). These values can vary with ship type.

In practice the area is calculated by numerical integration or with stability software.`,
    bulletPoints: [
      "Alan = Enerji kapasitesi göstergesi",
      "IMO kriterleri alan minimumlarını belirler",
      "Hasarlı stabilitede alan kriterleri daha kritiktir",
    ],
    formula: {
      name: "Dinamik Stabilite Alanı",
      expression: "A = ∫ GZ · dθ",
      description: "A: Alan (m·rad), GZ: doğrultma kolu (m), θ: yatma açısı (rad)",
    },
    keyPoints: [
      "Alan büyüdükçe devrilme riski azalır",
      "Alan değerleri GZ eğrisinin şekline bağlıdır",
      "Serbest yüzey ve üst yükler alanı küçültür",
    ],
  },
  "capsizing-angle": {
    title: "Devrilme Açısı (Vanishing Stability Angle)",
    introduction: "Devrilme açısı (Angle of Vanishing Stability – AVS), GZ eğrisinin pozitif bölgeden çıkıp tekrar sıfıra düştüğü ve geminin doğrultma momenti üretmeyi bıraktığı açıdır. Bu açıdan sonra GZ negatif olur ve gemi geri dönemez (devrilir).",
    content: `AVS AND THE RANGE OF STABILITY:
After its peak the GZ curve falls and reaches zero at a certain angle; this angle is the AVS. The range from the origin to the AVS is called the "range of positive stability". The wider the range, the greater the angle from which the ship can return.

WHAT IT DEPENDS ON:
- A rise in KG and free surface lower the GZ curve → the AVS decreases.
- High freeboard and watertight enclosed superstructure → the AVS increases (the curve reaches zero later).
- In a damaged (flooded) condition the curve falls → the AVS decreases markedly.

THE DOWNFLOODING ANGLE (θf) — THE PRACTICAL LIMIT:
Openings on the ship that cannot be closed (air vents, fan intakes, doors) become immersed at a certain angle of heel; this is the downflooding angle (θf). Once water begins to enter, the ship loses stability rapidly. The PRACTICAL safe range is therefore not the AVS but WHICHEVER IS SMALLER of the AVS and θf. The IMO area/range criteria are most often cut off at θf.`,
    bulletPoints: [
      "AVS: GZ'nin sıfıra döndüğü açı; sonrası negatif (devrilme)",
      "Pozitif stabilite aralığı = orijinden AVS'ye kadar",
      "KG↑/FSE AVS'yi küçültür; fribord/kapalı üst yapı büyütür",
      "Pratik sınır = min(AVS, downflooding açısı θf)",
    ],
    keyPoints: [
      "Geniş pozitif aralık = büyük yatmalardan geri dönebilme.",
      "Downflooding açısı çoğu zaman AVS'den önce gelir ve gerçek sınırdır.",
      "Hasarlı stabilitede AVS belirgin küçülür.",
    ],
    warnings: [
      "The immersion of openings (θf) lowers the capsizing angle in practice",
      "Once downflooding starts, stability is lost rapidly",
    ],
  },
  "gz-curve-interpretation": {
    title: "GZ Eğrisinin Yorumu",
    introduction: "GZ eğrisi (statik stabilite eğrisi), geminin farklı yatma açılarındaki doğrultma kolunu (GZ) gösterir ve geminin tüm stabilite karakterini tek bir grafikte özetler. Eğriden GM, maksimum GZ, stabilite aralığı ve dinamik stabilite birlikte okunur.",
    content: `THE MAIN QUANTITIES READ FROM THE CURVE:

1) THE INITIAL SLOPE → GM: the tangent to the curve at the origin gives GM. If the tangent is extended to an abscissa of 1 radian (57.3°), the GZ value it cuts is numerically equal to GM. At small angles GZ ≈ GM · sinθ.

2) MAXIMUM GZ AND ITS ANGLE: the peak of the curve is the largest righting lever the ship produces. The IMO requires GZmax to occur preferably at ≥30° (at least 25°).

3) DECK EDGE IMMERSION: when the deck edge becomes immersed the breadth of the waterplane decreases, BM falls and the slope of the curve changes (usually an inflection/turning point). Beyond this point GZ increases more slowly or begins to fall.

4) RANGE OF STABILITY: the range of angles over which the curve is positive; the angle at which it returns to zero is the AVS (the angle of vanishing stability).

5) AREA → DYNAMIC STABILITY: the area under the curve represents the righting energy (dynamic stability); the IMO area criteria are based on it.

WHAT CHANGES THE CURVE:
An increase in weight high up (KG↑) and free surface (FSE) pull the curve down and reduce the initial slope (GM); greater beam and a lower KG lift the curve; freeboard and enclosed superstructure extend the range of stability.`,
    bulletPoints: [
      "Orijin teğeti 57,3°'de GM'yi verir; küçük açıda GZ ≈ GM·sinθ",
      "Tepe = maksimum GZ (tercihen ≥30°'de)",
      "Deck edge immersion eğride bükülme noktası yaratır",
      "Eğri altı alan = dinamik stabilite (enerji)",
    ],
    formula: {
      name: "GZ ve GM ilişkisi (küçük açı / teğet)",
      expression: "GZ ≈ GM · sinθ  ;  GM = the value of the tangent at the origin read at 57.3°",
      description: "Başlangıç eğimi GM'yi verir; eğrinin tamamı büyük açı davranışını gösterir.",
    },
    keyPoints: [
      "Tek bir değer değil, eğrinin tüm şekli okunmalıdır.",
      "GM (eğim), GZmax, range ve alan birlikte değerlendirilir.",
      "KG↑ ve FSE eğriyi düşürür; fribord aralığı uzatır.",
      "GZ eğrisi, IMO kriterlerinin ve operasyonel limitlerin temelidir.",
    ],
  },
  // =====================================================
  // BÖLÜM 2 - EKSİK İÇERİKLER
  // =====================================================
  "floatation-condition": {
    title: "Yüzerlik Şartı",
    introduction: "Bir cismin su üzerinde kalabilmesi için toplam ağırlığının, batık hacminin yer değiştirdiği suyun ağırlığına eşit veya küçük olması gerekir.",
    content: `By Archimedes' principle a body receives a buoyancy force equal to the weight of the fluid it displaces. The condition for flotation is derived from this principle.

The flotation condition:
W ≤ ρ × g × ∇max

where ∇max is the volume of the body when fully immersed. If W exceeds this value the body sinks.

The flotation condition must always be satisfied on ships. Even in the light condition the ship has sufficient immersed volume. As loading increases the draft rises and the immersed volume increases. Danger arises, however, if the freeboard limit is exceeded.

Flotation is necessary for static equilibrium but not sufficient. A floating body may not be stable.`,
    bulletPoints: [
      "W = ρ × ∇ denklemi denge koşulunu tanımlar",
      "Batık hacim ≤ toplam hacim olmalıdır",
      "Fribord yüzerliğin görsel göstergesidir",
      "Yüzmek için stabilite ayrıca sağlanmalıdır",
    ],
    formula: {
      name: "Yüzerlik Denklemi",
      expression: "W = ρ × g × ∇; or Δ = ρ × ∇",
      description: "W: Ağırlık (kN), ρ: Suyun yoğunluğu (t/m³), ∇: Batık hacim (m³), Δ: Deplasman (ton)",
    },
    examples: [
      {
        problem: "If a ship's immersed volume is ∇ = 4,800 m³ and the sea water density is ρ = 1.025 t/m³, what is the maximum displacement in tonnes?",
        solution: "Δ = ρ × ∇ = 1.025 × 4,800 = 4,920 tonnes. Result: the ship can be loaded up to 4,920 tonnes.",
      },
    ],
    keyPoints: [
      "Yüzerlik şartı temel fizik kuralıdır",
      "Draft artışı batık hacmi artırır",
      "Fribord sınırı aşılmamalıdır",
    ],
  },
  "equilibrium-states": {
    title: "Denge Halleri",
    introduction: "Yüzen bir cisim üç farklı denge halinde bulunabilir: kararlı denge (stable), kararsız denge (unstable) ve nötr denge (neutral).",
    content: `States of equilibrium are classified by how a body responds when it is moved from its equilibrium position.

STABLE EQUILIBRIUM:
The body tends to return when it is moved from its equilibrium position. On ships a positive GM provides this condition. G lies below M.

UNSTABLE EQUILIBRIUM:
The body tends to move further away when it is displaced from its equilibrium position. A negative GM causes this condition. G lies above M.

NEUTRAL EQUILIBRIUM:
The body stays in its new position; it neither returns nor moves further. This occurs when GM = 0. G and M coincide.

A ship must be in stable equilibrium if it is to make a safe passage.`,
    bulletPoints: [
      "Kararlı denge: Pozitif GM, G altında M",
      "Kararsız denge: Negatif GM, G üstünde M",
      "Nötr denge: GM = 0, G ve M çakışık",
      "Seyir emniyeti kararlı denge gerektirir",
    ],
    examples: [
      {
        problem: "If KM = 6.5 m and KG = 6.5 m, in what state of equilibrium is the ship?",
        solution: "GM = KM - KG = 6.5 - 6.5 = 0 m. Result: neutral equilibrium. The ship can rest at any angle, which is a dangerous condition.",
      },
    ],
    keyPoints: [
      "Kararlı denge seyir için zorunludur",
      "Kararsız denge devrilme riskidir",
      "Nötr denge operasyonel olarak kabul edilemez",
    ],
    warnings: [
      "A ship must not proceed to sea with GM zero or negative",
      "The loading must be corrected immediately",
    ],
  },
  // =====================================================
  // BÖLÜM 5 - ENİNE STABİLİTE HESAPLARI
  // =====================================================
  "righting-moment": {
    title: "Righting Moment",
    introduction: "Doğrultma momenti, gemi yattığında ağırlık ve kaldırma kuvvetlerinin oluşturduğu ve gemiyi dik konuma döndürmeye çalışan momenttir.",
    content: `When the ship is heeled through a given angle, the weight force acts downwards through G and the buoyancy force acts upwards through B. The horizontal distance between these two forces is called GZ (the righting lever).

The righting moment (RM) is the displacement multiplied by GZ:
RM = Δ × GZ

When this moment is positive it acts to bring the ship upright. When it is negative it increases the heel.

The righting moment is the fundamental measure of a ship's stability. The IMO criteria require a minimum righting capacity at defined angles.`,
    images: [
      {
        src: rightingMomentDiagram,
        alt: "Righting moment diagram",
        caption: "Figure: the points G and B and the righting lever GZ in a heeled ship",
      },
    ],
    bulletPoints: [
      "Calculated with the formula RM = Δ × GZ",
      "Pozitif RM gemiyi dikleştirir",
      "Negatif RM yatmayı artırır",
      "RM büyüklüğü stabilite kapasitesini gösterir",
    ],
    formula: {
      name: "Righting Moment",
      expression: "RM = Δ × GZ",
      description: "RM: Doğrultma momenti (t·m), Δ: Deplasman (ton), GZ: Doğrultma kolu (m)",
    },
    examples: [
      {
        problem: "If Δ = 8,000 tonnes and GZ = 0.35 m, what is the righting moment in t·m?",
        solution: "RM = 8,000 × 0.35 = 2,800 t·m. Result: the ship produces a righting moment of 2,800 t·m.",
      },
    ],
    keyPoints: [
      "RM stabilite hesabının temel çıktısıdır",
      "GZ eğrisi RM profilini gösterir",
      "Yükleme değişiklikleri RM'yi doğrudan etkiler",
    ],
  },
  "heeling-moment": {
    title: "Yatma Momenti",
    introduction: "Yatma momenti, gemiyi yana yatıran dış kuvvetlerin oluşturduğu momenttir ve doğrultma momenti ile dengelenir.",
    content: `The heeling moment (HM) arises from external effects such as wind, waves, a shift of weight, a turning manoeuvre or a suspended load.

When the ship comes to equilibrium at a given angle:
HM = RM

This point of balance is called the angle of equilibrium.

If the heeling moment exceeds the righting moment the ship capsizes. The sources of heeling moment must therefore be calculated in advance and limited.`,
    bulletPoints: [
      "HM dış kaynaklı yatma etkisidir",
      "Rüzgâr, dalga, ağırlık kayması HM oluşturur",
      "Denge: HM = RM",
      "HM > RMmax ise devrilme riski oluşur",
    ],
    formula: {
      name: "Yatma Momenti (Rüzgâr)",
      expression: "HM = P × A × h",
      description: "HM: Yatma momenti (t·m), P: Rüzgâr basıncı (t/m²), A: Rüzgâra maruz alan (m²), h: Kaldırma kolu (m)",
    },
    examples: [
      {
        problem: "If the wind pressure is P = 0.05 t/m², A = 400 m² and h = 6 m, what is HM in t·m?",
        solution: "HM = 0.05 × 400 × 6 = 120 t·m. Result: the wind creates a heeling moment of 120 t·m.",
      },
    ],
    keyPoints: [
      "HM kaynakları önceden hesaplanmalıdır",
      "Operasyonel limitler HM'ye göre belirlenir",
      "IMO rüzgâr kriteri HM hesabına dayanır",
    ],
  },
  "angle-of-equilibrium": {
    title: "Denge Açısı",
    introduction: "Denge açısı, yatma momenti ile doğrultma momentinin eşitlendiği yatma açısıdır ve gemi bu açıda sabit kalır.",
    content: `When an external force applies a heeling moment to the ship, the ship produces a righting moment. When the two moments are equal the ship reaches equilibrium at a given angle.

On the GZ curve this angle is the point at which the heeling moment line cuts the curve.

The size of the angle of equilibrium depends on:
- The size of the heeling moment
- The ship's GM value
- The shape of the GZ curve

For small angles the approximation tan θ ≈ HM / (Δ × GM) can be used.`,
    bulletPoints: [
      "Denge açısı: HM = RM olduğu açı",
      "GZ eğrisi üzerinde grafiksel olarak bulunur",
      "GM büyükse denge açısı küçük olur",
      "GM küçükse denge açısı büyük olur",
    ],
    formula: {
      name: "Küçük Açı Denge Formülü",
      expression: "tan θ = HM / (Δ × GM)",
      description: "θ: Denge açısı, HM: Yatma momenti (t·m), Δ: Deplasman (ton), GM: Metasantrik yükseklik (m)",
    },
    examples: [
      {
        problem: "If HM = 200 t·m, Δ = 5,000 tonnes and GM = 0.8 m, what is the approximate angle of equilibrium in degrees?",
        solution: "tan θ = 200 / (5,000 × 0.8) = 200 / 4,000 = 0.05. θ ≈ 2.86°. Result: the ship settles at an angle of heel of about 3°.",
      },
    ],
    keyPoints: [
      "Denge açısı operasyonel limitleri belirler",
      "Büyük denge açısı yük kaymalarına yol açabilir",
      "Yolcu gemilerinde konfor sınırları uygulanır",
    ],
  },
  "heel-from-weight-shift": {
    title: "Ağırlık Kaymasına Bağlı Yatma",
    introduction: "Gemide bir ağırlığın enine kayması, ağırlık merkezini kaydırarak yatma (list) oluşturur.",
    content: `A shift of weight moves G transversely without changing the displacement. This shift is equivalent to a heeling moment.

The heeling moment created:
HM = w × d

where w is the weight shifted and d is the distance it is shifted.

The angle of equilibrium:
tan θ = (w × d) / (Δ × GM)

A cargo shift, a ballast transfer or crane operations can cause this kind of heel.`,
    bulletPoints: [
      "Enine ağırlık kayması list oluşturur",
      "The formula HM = w × d is applied",
      "GM küçükse aynı kayma daha büyük açı yaratır",
      "Kargo emniyet bağları kaymayı önler",
    ],
    formula: {
      name: "Ağırlık Kayması ile Yatma",
      expression: "tan θ = (w × d) / (Δ × GM)",
      description: "θ: Yatma açısı, w: Kaydırılan ağırlık (ton), d: Kaydırma mesafesi (m), Δ: Deplasman (ton), GM: Metasantrik yükseklik (m)",
    },
    examples: [
      {
        problem: "60 tonnes of cargo has shifted 4 m transversely. Δ = 6,000 tonnes, GM = 0.6 m. What is the angle of list in degrees?",
        solution: "tan θ = (60 × 4) / (6,000 × 0.6) = 240 / 3,600 = 0.0667. θ ≈ 3.8°. Result: a list of about 4° is created.",
      },
    ],
    keyPoints: [
      "Kargo kayması kazaların önemli nedenlerindendir",
      "Lashing ve securing prosedürleri kritiktir",
      "Seyir sırasında kayma izlenmelidir",
    ],
    warnings: [
      "With large shifts the list can increase rapidly",
      "Asymmetric flooding has a similar effect",
    ],
  },
  "small-angle-stability": {
    title: "Küçük Açılar İçin Stabilite",
    introduction: "Küçük yatma açılarında (yaklaşık 10°'ye kadar) metasantr sabit kabul edilir ve basitleştirilmiş formüller kullanılır.",
    content: `Small-angle stability examines the ship's behaviour close to upright. In this range the metacentre (M) is taken as fixed and GZ increases linearly.

The basic relationship:
GZ ≈ GM × sin θ

This approximation allows a quick calculation in initial stability assessments.

The small-angle approximation can also be written as sin θ ≈ θ (in radians). Above 10°, however, this approximation becomes inaccurate and a full GZ calculation is required.`,
    bulletPoints: [
      "Küçük açı: 0° - 10° aralığı",
      "M sabit kabul edilir",
      "The relationship GZ ≈ GM × sin θ applies",
      "10° üzerinde tam hesap gerekir",
    ],
    formula: {
      name: "Küçük Açı GZ Formülü",
      expression: "GZ ≈ GM × sin θ",
      description: "GZ: Doğrultma kolu (m), GM: Metasantrik yükseklik (m), θ: Yatma açısı (derece)",
    },
    examples: [
      {
        problem: "If GM = 0.7 m and θ = 8°, what is GZ in metres?",
        solution: "sin 8° = 0.139. GZ ≈ 0.7 × 0.139 = 0.097 m. Result: GZ is about 10 cm.",
      },
    ],
    keyPoints: [
      "Küçük açı formülleri hızlı değerlendirme sağlar",
      "GM değeri bu aralıkta belirleyicidir",
      "Büyük açılarda GZ eğrisi kullanılmalıdır",
    ],
  },
  "large-angle-stability": {
    title: "Büyük Açılar İçin Stabilite",
    introduction: "Yaklaşık 10°'nin üzerindeki yatma açılarında metasantr (M) sabit kalmaz ve GZ = GM·sinθ küçük açı yaklaşımı geçerliliğini yitirir. Büyük açı stabilitesi, kaldırma merkezinin (B) gerçek hareketi dikkate alınarak doğrudan GZ eğrisinden incelenir.",
    content: `WHY THE SMALL-ANGLE APPROXIMATION BREAKS DOWN:
At small angles M is almost fixed and GZ ≈ GM·sinθ can be used. As the angle increases the shape of the immersed volume (and so the position of B) changes markedly; M moves down and GZ departs from the simple sine relationship.

THE WALL-SIDED FORMULA:
Before the deck edge is immersed and before the keel emerges, and assuming a wall-sided hull, GZ is calculated approximately as:

GZ = sinθ · ( GM + ½ · BM · tan²θ )

The term ½·BM·tan²θ is the additional contribution to the righting lever at large angles (the form effect) and can make the ship appear more "stable" than the small-angle estimate suggests.

DECK EDGE IMMERSION:
Once the deck edge is immersed the waterplane area narrows, BM falls and the increase in GZ slows or stops; the curve peaks and begins to fall.

IMO LARGE-ANGLE CRITERIA:
- GZ ≥ 0.20 m (usually at ≥30°)
- The angle of GZmax ≥ 25° (preferably ≥30°)
- The 0-30°, 0-40° and 30-40° area criteria (IS Code).`,
    bulletPoints: [
      "10° üzerinde GZ = GM·sinθ yetersizdir; tam GZ analizi gerekir",
      "Wall-sided: GZ = sinθ·(GM + ½·BM·tan²θ)",
      "Deck edge immersion sonrası GZ artışı yavaşlar",
      "IMO: GZ≥0,20m, GZmax açısı ≥25°",
    ],
    formula: {
      name: "Wall-sided GZ formülü",
      expression: "GZ = sinθ · (GM + ½ · BM · tan²θ)",
      description: "Dik bordalı gövdede, güverte kenarı suya girmeden geçerli yaklaşık büyük açı bağıntısı.",
    },
    keyPoints: [
      "Büyük açıda M sabit değildir; B'nin gerçek hareketi esastır.",
      "Form stabilitesi (½·BM·tan²θ) büyük açıda GZ'ye katkı yapar.",
      "GZ eğrisi her yükleme durumu için oluşturulmalıdır.",
      "Hasarlı durumda büyük açı stabilitesi daha kritiktir.",
    ],
  },
  // =====================================================
  // BÖLÜM 6 - SERBEST YÜZEY ETKİSİ
  // =====================================================
  "free-surface-concept": {
    title: "Serbest Yüzey Kavramı",
    introduction: "Serbest yüzey, kısmen dolu bir tankta sıvının serbestçe hareket edebilmesi durumunu ifade eder ve stabiliteyi olumsuz etkiler.",
    content: `When a tank is completely full or completely empty the liquid inside it cannot move. But if the tank is partly full, the liquid runs to the low side when the ship heels and shifts the centre of gravity.

This movement creates a virtual rise in KG and reduces GM. The phenomenon is called the Free Surface Effect (FSE).

The free surface effect:
- The wider the tank, the greater the effect
- A higher liquid density increases the effect
- Tank subdivisions (longitudinal or transverse) reduce the effect

Every partly filled tank creates a free surface effect: fuel, ballast, fresh water, cargo oil.`,
    images: [
      {
        src: freeSurfaceEffect,
        alt: "Free surface effect diagram",
        caption: "Figure: liquid shifting in a partly filled tank and the virtual rise of KG",
      },
    ],
    bulletPoints: [
      "Kısmen dolu tank = Serbest yüzey etkisi",
      "Sıvı hareketi KG'yi sanal olarak yükseltir",
      "GM azalır, stabilite zayıflar",
      "Tank bölmeleri etkiyi azaltır",
    ],
    keyPoints: [
      "Serbest yüzey etkisi her kısmen dolu tankta vardır",
      "Etki tank genişliğinin küpüyle orantılıdır",
      "Stabilite hesabında mutlaka dahil edilmelidir",
    ],
    warnings: [
      "Several tanks with free surfaces can multiply the effect",
      "Tank conditions must be monitored during the passage",
    ],
  },
  "fse-gm-effect": {
    title: "Serbest Yüzeyin GM'ye Etkisi",
    introduction: "Serbest yüzey, efektif GM değerini düşürerek geminin ilk stabilitesini zayıflatır.",
    content: `The free surface effect causes a virtual rise of the centre of gravity (GG' or the virtual rise of G). This rise reduces GM directly.

The corrected GM:
GMfluid = GMsolid - GG'

where GG' is the free surface correction, calculated as FSM/Δ.

If the effective GM (GMfluid) becomes negative the ship becomes unstable. The free surface correction is therefore always applied in stability calculations.`,
    bulletPoints: [
      "Serbest yüzey KG'yi sanal olarak yükseltir",
      "GMfluid = GMsolid - GG'",
      "GG' = FSM / Δ",
      "Düşük GM'li gemilerde etki kritiktir",
    ],
    formula: {
      name: "Serbest Yüzey Düzeltmesi",
      expression: "GMfluid = GMsolid - (FSM / Δ)",
      description: "GMfluid: Düzeltilmiş GM (m), GMsolid: Katı hesaplı GM (m), FSM: Serbest yüzey momenti (t·m), Δ: Deplasman (ton)",
    },
    examples: [
      {
        problem: "If GMsolid = 0.80 m, FSM = 400 t·m and Δ = 8,000 tonnes, what is GMfluid in metres?",
        solution: "GG' = FSM / Δ = 400 / 8,000 = 0.05 m. GMfluid = 0.80 - 0.05 = 0.75 m. Result: free surface reduces GM by 5 cm.",
      },
    ],
    keyPoints: [
      "Stabilite hesabı her zaman GMfluid kullanmalıdır",
      "FSM değerleri tank tablolarından alınır",
      "Birden fazla tank için FSM'ler toplanır",
    ],
  },
  "fsm": {
    title: "Free Surface Moment (FSM)",
    introduction: "Free Surface Moment, bir tankın serbest yüzey etkisinin büyüklüğünü ifade eden ve stabilite hesabında kullanılan değerdir.",
    content: `The FSM depends on the geometry of the tank and the density of the liquid in it.

FSM = ρ × I

where ρ is the density of the liquid and I is the moment of inertia of the tank's liquid surface about the longitudinal axis.

For a tank of rectangular section:
I = (L × B³) / 12

FSM values are usually given in the tank tables. There may be different FSM values for different filling levels.`,
    bulletPoints: [
      "Calculated with the formula FSM = ρ × I",
      "I, su yüzeyinin atalet momentidir",
      "Genişlik (B) küpü ile orantılıdır",
      "Tank tabloları FSM değerlerini verir",
    ],
    formula: {
      name: "Free Surface Moment",
      expression: "FSM = ρ × I = ρ × (L × B³) / 12",
      description: "FSM: Serbest yüzey momenti (t·m), ρ: Sıvı yoğunluğu (t/m³), L: Tank uzunluğu (m), B: Tank genişliği (m)",
    },
    examples: [
      {
        problem: "If the tank dimensions are L = 10 m and B = 6 m and the fuel density is ρ = 0.85 t/m³, what is the FSM in t·m?",
        solution: "I = (10 × 6³) / 12 = (10 × 216) / 12 = 180 m⁴. FSM = 0.85 × 180 = 153 t·m. Result: the tank creates a free surface moment of 153 t·m.",
      },
    ],
    keyPoints: [
      "FSM tank genişliğine çok duyarlıdır (B³)",
      "Bölmeli tanklar FSM'yi önemli ölçüde azaltır",
      "Her tank için ayrı FSM hesaplanır",
    ],
  },
  "fse-calc": {
    title: "Free Surface Effect (FSE)",
    introduction: "Free Surface Effect, serbest yüzey momentinin deplasmanla bölünmesiyle bulunan ve KG'ye eklenen sanal yükselme değeridir.",
    content: `The FSE (or GG') shows how far the free surface raises the centre of gravity virtually.

FSE = FSM / Δ

This value is added to KG to give the effective KG:
KGfluid = KGsolid + FSE

Or it is deducted directly from GM:
GMfluid = GMsolid - FSE

If there are several tanks with free surfaces, all the FSMs are added together and the total FSE is calculated.`,
    bulletPoints: [
      "The formula FSE = FSM / Δ is used",
      "FSE, KG'ye eklenir veya GM'den çıkarılır",
      "Birden fazla tank için FSM'ler toplanır",
      "Deplasman büyüdükçe FSE küçülür",
    ],
    formula: {
      name: "Free Surface Effect Hesabı",
      expression: "FSE = Σ(FSM) / Δ; KGfluid = KGsolid + FSE",
      description: "FSE: Serbest yüzey etkisi (m), FSM: Serbest yüzey momenti (t·m), Δ: Deplasman (ton)",
    },
    examples: [
      {
        problem: "If the total FSM of 3 tanks is 600 t·m and Δ = 10,000 tonnes, what is the FSE in metres?",
        solution: "FSE = 600 / 10,000 = 0.06 m. Result: KG rises virtually by 6 cm.",
      },
    ],
    keyPoints: [
      "FSE hesabı stabilite kontrolünde zorunludur",
      "Yüksek deplasman FSE'yi küçültür",
      "Kritik operasyonlarda FSE izlenmelidir",
    ],
  },
  "tank-geometry-effect": {
    title: "Tank Geometrisinin Etkisi",
    introduction: "Tank şekli ve bölmeleme durumu serbest yüzey momentini doğrudan etkiler; geniş tanklar daha büyük FSM üretir.",
    content: `In the FSM calculation the moment of inertia (I) is proportional to the cube of the tank's breadth. Wide tanks therefore create a far greater free surface effect.

Longitudinal subdivision:
Dividing a tank longitudinally down the middle reduces the total FSM to a quarter (2 × (B/2)³ / 2 = B³/4).

Transverse subdivision:
Transverse divisions do not change the FSM; they only restrict the flow of the liquid.

Tank shape:
In curved or tapered tanks the FSM calculation is more complex and the tank tables are used.`,
    bulletPoints: [
      "FSM, B³ ile orantılıdır",
      "Boyuna bölme FSM'yi 1/4'e düşürür",
      "Enine bölme FSM'yi değiştirmez",
      "Karmaşık geometriler için tablo kullanılır",
    ],
    formula: {
      name: "Bölmeli Tank FSM",
      expression: "FSMsubdivided = FSMfull / n²",
      description: "n: Boyuna bölme sayısı (2 bölme için FSM 1/4 olur)",
    },
    examples: [
      {
        problem: "The FSM of a tank 12 m wide is 800 t·m. If the tank is divided longitudinally down the middle, what is the new FSM in t·m?",
        solution: "The number of divisions is n = 2. FSMnew = 800 / 2² = 800 / 4 = 200 t·m. Result: the FSM falls to a quarter.",
      },
    ],
    keyPoints: [
      "Geniş tanklarda mutlaka bölme düşünülmelidir",
      "Boyuna bölmeler stabilitede çok etkilidir",
      "Tank tasarımı stabilite ile birlikte değerlendirilir",
    ],
  },
  "multiple-tanks-effect": {
    title: "Birden Fazla Tankın Etkisi",
    introduction: "Birden fazla kısmen dolu tank varsa, her tankın serbest yüzey momenti toplanarak toplam etki hesaplanır.",
    content: `There are usually several partly filled tanks on board: fuel tanks, ballast tanks, fresh water tanks and cargo oil tanks.

The FSM of each tank is calculated separately or taken from the tank tables. The total free surface moment:
Σ(FSM) = FSM₁ + FSM₂ + FSM₃ + ...

The total FSE:
FSE = Σ(FSM) / Δ

Tanks that are completely full or completely empty are not included in the FSM calculation.`,
    bulletPoints: [
      "Her kısmen dolu tank FSM üretir",
      "FSM'ler toplanır, tek FSE hesaplanır",
      "Tam dolu veya boş tanklar dahil edilmez",
      "Yükleme planı FSM toplamını etkiler",
    ],
    examples: [
      {
        problem: "3 tanks: FSM₁ = 150 t·m, FSM₂ = 200 t·m, FSM₃ = 100 t·m. Δ = 7,500 tonnes. What is the total FSE in metres?",
        solution: "Σ(FSM) = 150 + 200 + 100 = 450 t·m. FSE = 450 / 7,500 = 0.06 m. Result: the total free surface effect is 6 cm.",
      },
    ],
    keyPoints: [
      "Tank sayısı arttıkça FSE artabilir",
      "Tankları tamamen doldurmak veya boşaltmak FSE'yi sıfırlar",
      "Yükleme planında FSM minimizasyonu hedeflenir",
    ],
    warnings: [
      "A large number of partly filled tanks can create a critical FSE",
      "Tank conditions must be reviewed before critical passages",
    ],
  },
  // =====================================================
  // BÖLÜM 7 - BOYUNA STABİLİTE VE TRİM
  // =====================================================
  "lcg": {
    title: "Boyuna Ağırlık Merkezi (LCG)",
    introduction: "LCG, geminin ağırlık merkezinin boyuna konumunu ifade eder ve trim hesaplarının temel girdisidir.",
    content: `The LCG (Longitudinal Centre of Gravity) is the longitudinal resultant of all the weights on the ship, calculated by the method of moments.

The reference point is usually:
- The after perpendicular (AP)
- Midship
- The forward perpendicular (FP)

The LCG calculation:
LCG = Σ(wᵢ × lcgᵢ) / Σwᵢ

The difference between LCG and LCB determines the trim.`,
    bulletPoints: [
      "LCG boyuna ağırlık merkezidir",
      "Momentler yöntemiyle hesaplanır",
      "Referans noktası AP, Midship veya FP olabilir",
      "LCG - LCB farkı trim yaratır",
    ],
    formula: {
      name: "LCG Hesabı",
      expression: "LCG = Σ(wᵢ × lcgᵢ) / Δ",
      description: "LCG: Boyuna ağırlık merkezi (m), wᵢ: Her bir ağırlık (ton), lcgᵢ: Her ağırlığın boyuna konumu (m)",
    },
    examples: [
      {
        problem: "If 500 t of cargo is 80 m from the AP and 300 t is 40 m from the AP, what is the LCG in metres?",
        solution: "LCG = (500 × 80 + 300 × 40) / 800 = (40,000 + 12,000) / 800 = 65 m. Result: the LCG is 65 m from the AP.",
      },
    ],
    keyPoints: [
      "LCG yükleme ile değişir",
      "LCG hesabı trim kontrolü için gereklidir",
      "Yük yerleşimi LCG'yi doğrudan etkiler",
    ],
  },
  "lcb": {
    title: "Yüzerlik Merkezi (LCB)",
    introduction: "LCB, geminin batık hacminin boyuna geometrik merkezidir ve trim hesaplarında LCG ile karşılaştırılır.",
    content: `The LCB (Longitudinal Centre of Buoyancy) is the longitudinal centre of the immersed volume. The buoyancy force acts upwards through this point.

The position of the LCB:
- Depends on the draft and the trim
- Is read from the hydrostatic tables
- Is sensitive to the form and block coefficient of the ship

In equilibrium the LCG and LCB must lie on the same vertical line. Otherwise a longitudinal moment arises and the ship trims.`,
    bulletPoints: [
      "LCB batık hacmin boyuna merkezidir",
      "Hidrostatik tablolardan alınır",
      "If LCG = LCB the trim is zero",
      "LCG ≠ LCB ise trim oluşur",
    ],
    formula: {
      name: "Trimming Moment",
      expression: "Trim Moment = Δ × (LCG - LCB)",
      description: "Trim Moment: Boyuna moment (t·m), Δ: Deplasman (ton), LCG - LCB: Fark (m)",
    },
    examples: [
      {
        problem: "Δ = 6,000 tonnes, LCG = 70 m (from the AP), LCB = 68 m (from the AP). What is the trimming moment in t·m?",
        solution: "Trimming Moment = 6,000 × (70 - 68) = 6,000 × 2 = 12,000 t·m. Result: a trimming moment by the head is created.",
      },
    ],
    keyPoints: [
      "LCB draft ile değişir",
      "LCB-LCG farkı trim yönünü belirler",
      "Trim düzeltmesi LCG kaydırılarak yapılır",
    ],
  },
  "trim-concept": {
    title: "Trim Kavramı",
    introduction: "Trim, geminin baş ve kıç draftları arasındaki farkı ifade eder ve boyuna stabiliteyi gösterir.",
    content: `Trim is the longitudinal inclination of the ship and is expressed in two ways:
1. As a difference: Trim = Taft - Tfwd
2. As an angle: θ = arctan(Trim / LBP)

If the trim is positive: trim by the stern
If the trim is negative: trim by the head
If the trim is 0: even keel

Trim affects the ship's performance, propeller efficiency and deck wetness. Optimum trim values are established in commercial operations.`,
    images: [
      {
        src: trimDiagram,
        alt: "Trim diagram",
        caption: "Figure: ship in profile - forward and aft drafts and the resulting trim",
      },
    ],
    bulletPoints: [
      "Trim = T aft - T fore",
      "Pozitif trim = Kıç trimi",
      "Negatif trim = Baş trimi",
      "Optimum trim yakıt verimliliğini artırır",
    ],
    formula: {
      name: "Trim Hesabı",
      expression: "Trim = T aft - T fore",
      description: "Trim: Baş-kıç draft farkı (m), Tkıç: Kıç draftı (m), Tbaş: Baş draftı (m)",
    },
    examples: [
      {
        problem: "If Taft = 7.2 m and Tfwd = 6.8 m, what is the trim condition?",
        solution: "Trim = 7.2 - 6.8 = 0.4 m. Result: there is 40 cm of trim by the stern.",
      },
    ],
    keyPoints: [
      "Trim seyir performansını etkiler",
      "Aşırı baş trimi güverte ıslaklığına yol açar",
      "Pervane derinliği kıç trimi ile ilişkilidir",
    ],
  },
  "mct": {
    title: "MCT (Moment to Change Trim)",
    introduction: "MCT, trimi 1 cm değiştirmek için gereken momenti ifade eder ve trim hesaplarında temel büyüklüktür.",
    content: `The MCT (Moment to Change Trim 1 cm) is the measure of a ship's longitudinal stability. It is taken from the hydrostatic tables and varies with draft.

The MCT calculation:
MCT = (Δ × GML) / (100 × LBP)

where GML is the longitudinal metacentric height and LBP the length between perpendiculars.

The change of trim:
Trim = (w × d) / MCT

where w is the weight and d the longitudinal distance it is moved.`,
    bulletPoints: [
      "MCT, trimi 1 cm değiştiren momenttir",
      "Hidrostatik tablolardan okunur",
      "Draft ile değişir",
      "Trim = Moment / MCT formülü kullanılır",
    ],
    formula: {
      name: "MCT Formülü",
      expression: "MCT = (Δ × GML) / (100 × LBP); Trim = (w × d) / MCT",
      description: "MCT: Trim değiştirme momenti (t·m/cm), GML: Boyuna metasantrik yükseklik (m), LBP: İki dikme arası (m)",
    },
    examples: [
      {
        problem: "MCT = 350 t·m/cm and 140 tonnes is shifted 15 m forward. What is the change of trim in cm?",
        solution: "Moment = 140 × 15 = 2,100 t·m. Trim = 2,100 / 350 = 6 cm. Result: the trim by the head increases by 6 cm.",
      },
    ],
    keyPoints: [
      "MCT büyük gemilerde daha yüksektir",
      "Trim hesabı yükleme planının parçasıdır",
      "MCT değeri draft ile değişir",
    ],
  },
  "trim-calculations": {
    title: "Trim Hesapları",
    introduction: "Trim hesapları, yük hareketlerinin ve ağırlık değişikliklerinin baş-kıç draftlarına etkisini belirler.",
    content: `The trim calculation covers two basic cases:
1. A shift of weight (the moment w × d)
2. Adding/removing weight (a change of LCG)

The change of trim:
ΔTrim = (w × d) / MCT

The changes in the forward and after drafts:
ΔTfwd = (ΔTrim × LCF) / LBP
ΔTaft = ΔTrim - ΔTfwd

The LCF (Longitudinal Centre of Flotation) is the longitudinal position of the centre of flotation.`,
    bulletPoints: [
      "Trim değişimi = Moment / MCT",
      "LCF, draft dağılımını belirler",
      "Baş ve kıç draftları ayrı hesaplanır",
      "Trim hesabı yükleme planında zorunludur",
    ],
    formula: {
      name: "Trim ve Draft Değişimi",
      expression: "ΔTrim = (w × d) / MCT; ΔTfwd = ΔTrim × (LBP - LCF) / LBP",
      description: "ΔTrim: Trim değişimi (cm), LCF: Yüzme merkezinin kıçtan uzaklığı (m)",
    },
    examples: [
      {
        problem: "w = 200 t, d = 20 m forward, MCT = 400 t·m/cm, LBP = 120 m, LCF = 55 m (from aft). What are the changes in draft?",
        solution: "ΔTrim = (200 × 20) / 400 = 10 cm by the head. ΔTaft = 10 × 55 / 120 = 4.58 cm decrease. ΔTfwd = 10 - 4.58 = 5.42 cm increase. Result: the bow sinks 5.4 cm and the stern rises 4.6 cm.",
      },
    ],
    keyPoints: [
      "LCF orta kesitte değilse draftlar eşit değişmez",
      "Trim hesabı fribord kontrolü ile birlikte yapılır",
      "Aşırı trim operasyonel sorunlara yol açar",
    ],
  },
  "trim-control": {
    title: "Yükleme ve Boşaltmada Trim Kontrolü",
    introduction: "Trim kontrolü, yükleme operasyonları sırasında geminin optimum trim değerlerinde kalmasını sağlar.",
    content: `Trim changes continuously during loading and discharging. Optimum trim values affect:
- Fuel consumption
- Propeller efficiency
- Deck wetness
- Manoeuvring in port

Methods of trim control:
1. The cargo distribution plan
2. Ballast transfer
3. Fuel transfer
4. Optimising the loading sequence

Stability computers simulate the trim and propose an optimum loading plan.`,
    bulletPoints: [
      "Optimum trim yakıt tasarrufu sağlar",
      "Balast transferi trim düzeltmesinde kullanılır",
      "Yükleme sırası trim kontrolünü etkiler",
      "Stabilite yazılımları trim simülasyonu yapar",
    ],
    keyPoints: [
      "Trim kontrolü yükleme planının parçasıdır",
      "Aşırı trim operasyonel sorunlara yol açar",
      "Optimum trim gemi tipine göre değişir",
    ],
  },
  // =====================================================
  // BÖLÜM 8 - HİDROSTATİK VERİLER VE TABLOLAR
  // =====================================================
  "displacement": {
    title: "Displacement",
    introduction: "Deplasman, geminin toplam ağırlığı ve yer değiştirdiği suyun ağırlığıdır; stabilitenin temel büyüklüğüdür.",
    content: `The displacement (Δ) is equal to the weight of the water the ship displaces when floating. By Archimedes' principle this value is equal to the total weight of the ship.

Δ = ∇ × ρ

where ∇ is the immersed volume (m³) and ρ is the density of the water (1.025 t/m³ for sea water).

The displacement value:
- Is an input to the stability calculations
- Is used in the righting moment calculation
- Is related to draft through the hydrostatic tables`,
    bulletPoints: [
      "Δ = Geminin toplam ağırlığı",
      "Δ = the weight of water displaced",
      "Calculated with the formula Δ = ∇ × ρ",
      "Draft arttıkça deplasman artar",
    ],
    formula: {
      name: "Deplasman Hesabı",
      expression: "Δ = ∇ × ρ",
      description: "Δ: Deplasman (ton), ∇: Batık hacim (m³), ρ: Su yoğunluğu (t/m³, deniz suyu için 1.025)",
    },
    examples: [
      {
        problem: "If the immersed volume is ∇ = 5,000 m³ and the sea water density is ρ = 1.025 t/m³, what is the displacement in tonnes?",
        solution: "Δ = 5,000 × 1.025 = 5,125 tonnes. Result: the ship weighs 5,125 tonnes.",
      },
    ],
    keyPoints: [
      "Deplasman stabilitenin ana girdisidir",
      "Yoğunluk değişimi deplasmanı etkiler",
      "Lightship + deadweight = Deplasman",
    ],
  },
  "draft": {
    title: "Draft",
    introduction: "Draft, geminin omurgasından su hattına olan dikey mesafedir ve yükleme durumunun göstergesidir.",
    content: `The draft shows how deep the ship is immersed. It is measured at three positions:
1. Forward draft
2. Aft draft
3. Mean draft

Mean draft = (Tfwd + Taft) / 2

As the draft increases:
- The displacement increases
- The freeboard decreases
- The immersed volume grows

Reading the draft is the starting point of the loading calculation.`,
    bulletPoints: [
      "Draft omurgadan su hattına mesafedir",
      "Baş, kıç ve orta draft ayrı ölçülür",
      "Draft artışı deplasman artışı demektir",
      "Fribord sınırları draft limitini belirler",
    ],
    formula: {
      name: "Orta Draft",
      expression: "Tmean = (Tfwd + Taft) / 2",
      description: "Tmean: Orta draft (m), Tbaş: Baş draftı (m), Tkıç: Kıç draftı (m)",
    },
    examples: [
      {
        problem: "If Tfwd = 6.4 m and Taft = 7.0 m, what is the mean draft in metres?",
        solution: "Tmean = (6.4 + 7.0) / 2 = 6.7 m. Result: the mean draft is 6.7 metres.",
      },
    ],
    keyPoints: [
      "Draft okuması operasyonun başlangıcıdır",
      "Fribord = Summer Load Line - Draft",
      "Minimum fribord sınırı aşılmamalıdır",
    ],
  },
  "draft-displacement-relation": {
    title: "Draft-Deplasman İlişkisi",
    introduction: "Draft ve deplasman arasındaki ilişki hidrostatik eğrilerle tanımlanır ve yükleme hesabında kullanılır.",
    content: `As the draft increases the immersed volume, and therefore the displacement, increases. This relationship is not linear; it depends on the form of the ship.

The hydrostatic tables or curves show this relationship:
- Draft (m) vs Displacement (tonnes)
- Draft (m) vs Immersed volume (m³)

These tables are calculated when the ship is built and are given in the stability booklet.

During loading the displacement is found by measuring the draft, or conversely the expected draft is checked against the displacement calculation.`,
    bulletPoints: [
      "Draft-deplasman ilişkisi doğrusal değildir",
      "Hidrostatik tablolardan okunur",
      "Gemi formuna bağlıdır",
      "Yükleme kontrolünün temel aracıdır",
    ],
    keyPoints: [
      "Hidrostatik veriler gemiye özgüdür",
      "Trim durumu draft okumalarını etkiler",
      "Hidrostatik tablolar trim düzeltmeleri içerir",
    ],
  },
  "tpc": {
    title: "TPC (Ton Per Centimeter)",
    introduction: "TPC, draftı 1 cm artırmak için gereken ağırlığı gösterir ve hızlı yükleme hesaplarında kullanılır.",
    content: `The TPC (Tonnes Per Centimetre Immersion) is related to the ship's waterplane area.

TPC = (A × ρ) / 100

where A is the waterplane area (m²) and ρ is the water density (t/m³).

Using the TPC:
- Weight to be loaded / TPC = increase in draft (cm)
- Change of draft × TPC = change in weight (tonnes)

The TPC value varies with draft; it is read from the hydrostatic tables.`,
    bulletPoints: [
      "TPC, 1 cm batış için gereken tondur",
      "Su hattı alanına bağlıdır",
      "Hidrostatik tablolardan okunur",
      "Hızlı yükleme hesabında kullanılır",
    ],
    formula: {
      name: "TPC Hesabı",
      expression: "TPC = (A × ρ) / 100; ΔT = w / TPC",
      description: "TPC: Ton per cm (ton/cm), A: Su hattı alanı (m²), ρ: Yoğunluk (t/m³), ΔT: Draft değişimi (cm), w: Ağırlık (ton)",
    },
    examples: [
      {
        problem: "TPC = 25 tonnes/cm and 500 tonnes is to be loaded. By how many cm does the draft increase?",
        solution: "ΔT = 500 / 25 = 20 cm. Result: the draft increases by 20 cm.",
      },
    ],
    keyPoints: [
      "TPC geniş gemilerde daha büyüktür",
      "Draft değiştikçe TPC de değişir",
      "Liman operasyonlarında sık kullanılır",
    ],
  },
  "km-values": {
    title: "KM Değerleri",
    introduction: "KM, omurgadan metasantra olan mesafedir ve GM hesabının temel girdisidir.",
    content: `KM (Keel to Metacentre) is the height of the metacentre above the keel.

KM = KB + BM

where KB is the distance from the keel to the centre of buoyancy and BM is the metacentric radius.

The KM value:
- Varies with draft
- Is read from the hydrostatic tables
- Is used in the GM calculation: GM = KM - KG

The KM value depends on the geometry of the ship and does not change with loading (it changes only with a change of draft).`,
    bulletPoints: [
      "The formula KM = KB + BM applies",
      "Hidrostatik tablolardan alınır",
      "Draft ile değişir",
      "Used in the calculation GM = KM - KG",
    ],
    formula: {
      name: "KM ve GM İlişkisi",
      expression: "KM = KB + BM; GM = KM - KG",
      description: "KM: Omurgadan metasantra (m), KB: Omurgadan kaldırma merkezine (m), BM: Metasantrik yarıçap (m), KG: Omurgadan ağırlık merkezine (m)",
    },
    examples: [
      {
        problem: "From the hydrostatic table, KM = 7.8 m is read for T = 6.5 m. If KG = 7.2 m, what is GM in metres?",
        solution: "GM = KM - KG = 7.8 - 7.2 = 0.6 m. Result: GM is 60 cm and the initial stability is adequate.",
      },
    ],
    keyPoints: [
      "KM gemiye özgü hidrostatik veridir",
      "Draft arttıkça genellikle KM azalır",
      "Stabilite hesabında KM doğru okunmalıdır",
    ],
  },
  "hydrostatic-tables-usage": {
    title: "Hidrostatik Tabloların Kullanımı",
    introduction: "Hidrostatik tablolar, geminin draft ve trim durumuna göre stabilite parametrelerini veren temel referanstır.",
    content: `Hydrostatic tables generally contain the following data:
- Draft vs Displacement
- Draft vs TPC
- Draft vs KM (KMt and KMl)
- Draft vs KB
- Draft vs LCB
- Draft vs LCF
- Draft vs MCT

The tables are prepared for an even keel. A correction may be needed when the ship is trimmed.

Modern stability computers use these tables automatically; but the tables must be understood for manual checking.`,
    bulletPoints: [
      "Tüm stabilite parametreleri tablolardan okunur",
      "Draft ana giriş değeridir",
      "Trim düzeltmeleri gerekebilir",
      "Stabilite yazılımları tabloları otomatik kullanır",
    ],
    keyPoints: [
      "Tablolar gemiye özgüdür ve değiştirilemez",
      "Enterpolasyon doğru yapılmalıdır",
      "Trim düzeltmeleri için özel tablolar bulunabilir",
    ],
  },
  // =====================================================
  // BÖLÜM 10 - DİNAMİK STABİLİTE
  // =====================================================
  "dynamic-righting-moment": {
    title: "Dinamik Doğrultma Momenti",
    introduction: "Dinamik doğrultma momenti, geminin hareket halindeyken dış kuvvetlere karşı ürettiği toplam doğrultma kapasitesidir.",
    content: `Dynamic stability expresses the amount of energy a ship can absorb up to a given angle. This capacity is measured by the area under the GZ curve.

The dynamic righting moment:
DRM = Δ × ∫GZ dθ

This integral is the area under the GZ curve from the initial angle up to a given angle.

The difference from static stability:
- Static: instantaneous equilibrium at a given angle
- Dynamic: the energy balance throughout the motion`,
    bulletPoints: [
      "Dinamik stabilite enerji kapasitesidir",
      "GZ eğrisi altındaki alanla ölçülür",
      "Dalga ve rüzgâr enerjisini absorbe eder",
      "IMO alan kriterleri dinamik stabiliteyi denetler",
    ],
    formula: {
      name: "Dinamik Stabilite",
      expression: "E = Δ × ∫(0 to θ) GZ dθ",
      description: "E: Dinamik stabilite enerjisi (t·m·rad), Δ: Deplasman (ton), GZ: Doğrultma kolu (m), θ: Açı (rad)",
    },
    keyPoints: [
      "Dinamik stabilite deniz koşullarını yansıtır",
      "Alan büyüklüğü güvenliğin ölçüsüdür",
      "IMO kriterleri minimum alanları belirler",
    ],
  },
  "area-concept": {
    title: "Alan Kavramı",
    introduction: "GZ eğrisi altındaki alan, geminin dinamik stabilite kapasitesini ve dış kuvvetlere direnme yeteneğini gösterir.",
    content: `The area under the GZ curve expresses how much energy the ship can absorb up to a given angle.

The IMO criteria define the following areas:
- A₁: the area from 0° to 30° ≥ 0.055 m·rad
- A₂: the area from 0° to 40° ≥ 0.090 m·rad
- A₃: the area from 30° to 40° ≥ 0.030 m·rad

These areas guarantee that the ship has an adequate energy reserve in various heeling scenarios.

The area is calculated by numerical integration or the trapezoidal rule.`,
    bulletPoints: [
      "Alan = Enerji kapasitesi",
      "IMO minimum alan kriterleri tanımlar",
      "0-30°, 0-40° ve 30-40° alanları kontrol edilir",
      "Sayısal integrasyon ile hesaplanır",
    ],
    formula: {
      name: "Alan Hesabı (Trapez Kuralı)",
      expression: "A = Σ [(GZₙ + GZₙ₊₁) / 2] × Δθ",
      description: "A: Alan (m·rad), GZ: Doğrultma kolu (m), Δθ: Açı aralığı (rad)",
    },
    examples: [
      {
        problem: "The area calculated between 0° and 30° is A₁ = 0.048 m·rad. Is the IMO criterion met?",
        solution: "The IMO criterion: A₁ ≥ 0.055 m·rad. 0.048 < 0.055. Result: the criterion is not met and the stability is inadequate.",
      },
    ],
    keyPoints: [
      "Tüm alan kriterleri aynı anda sağlanmalıdır",
      "Yükleme değişiklikleri alanları etkiler",
      "Kritik yüklemelerde alan kontrolü zorunludur",
    ],
  },
  "static-vs-dynamic": {
    title: "Statik ve Dinamik Stabilite Farkı",
    introduction: "Statik stabilite, belirli bir yatma açısındaki anlık doğrultma kuvvetini (GZ/moment) inceler. Dinamik stabilite ise gemiyi o açıya yatırmak için yapılan İŞİ (enerji) inceler ve GZ eğrisi altındaki alanla ölçülür. İkisi farklı şeyleri ölçer ve birlikte değerlendirilmelidir.",
    content: `STATIC STABILITY:
- Instantaneous equilibrium at a given angle: the righting lever GZ and the righting moment (Δ·GZ).
- Assessed by GM at small angles and by the GZ curve at large angles.
- The question: "How strongly does the ship right itself at this angle?"

DYNAMIC STABILITY (ENERGY):
- The work required to heel the ship from 0 to an angle θ is the area under the GZ curve.
- Dynamic stability = Δ × (the area under the GZ curve); the unit is tonne·metre·radian (energy).
- The question: "How much ENERGY is needed to capsize the ship / how much energy reserve is there?"

WHY BOTH ARE NEEDED:
A squall or a wave transfers WORK (energy) to the ship. If the ship does not have enough "reserve dynamic stability" (area under the curve) to meet that energy, it can capsize even though the instantaneous GZ is positive. The IMO weather criterion checks precisely this energy (area) balance (b ≥ a). Meeting the static criteria alone is therefore not sufficient.`,
    bulletPoints: [
      "Statik: anlık kuvvet/moment (GZ, Δ·GZ).",
      "Dinamik: iş/enerji = eğri altı alan.",
      "Dinamik stabilite = Δ × (GZ eğrisi altı alan).",
      "Rüzgâr/dalga gemiye enerji aktarır; rezerv alan bunu karşılamalı.",
    ],
    formula: {
      name: "Dinamik stabilite (enerji)",
      expression: "Dynamic stability = Δ × ∫₀^θ GZ dθ  (the area under the curve)",
      description: "GZ eğrisi altındaki alan, gemiyi o açıya yatırmak için yapılan işi (enerji rezervini) verir.",
    },
    keyPoints: [
      "Statik = kuvvet, dinamik = enerji; ikisi farklı şeyi ölçer.",
      "Dinamik stabilite GZ eğrisi altındaki alanla ölçülür.",
      "Weather criterion (b≥a) bir dinamik/enerji kriteridir.",
      "Statik yeterlilik dinamik güvenliği garanti etmez.",
    ],
  },
  "wave-effect": {
    title: "Dalga Etkisi",
    introduction: "Dalgalar gemiye enerji aktararak yatma hareketi oluşturur ve dinamik stabiliteyi test eder.",
    content: `Waves act on a ship in several ways:

1. Wave slope: when the ship lies on a wave the effective angle of heel increases.

2. Wave moment: the wave height and period determine the heeling moment.

3. Resonance: dangerous oscillations arise when the wave period approaches the rolling period.

4. Parametric rolling: in head/following seas the changing waterplane breadth alters the stability periodically.

The IMO wind and wave criteria take these effects into account.`,
    bulletPoints: [
      "Dalgalar yatma enerjisi aktarır",
      "Dalga periyodu ile yalpa periyodu rezonansa girebilir",
      "Baş-kıç dalgalarda parametrik yalpalama riski vardır",
      "Stabilite alanları dalga enerjisini absorbe eder",
    ],
    keyPoints: [
      "Dalga koşulları stabilite değerlendirmesinde kritiktir",
      "Rezonans önleme için rota ve hız ayarlanır",
      "Parametrik yalpalama konteyner gemilerinde önemlidir",
    ],
    warnings: [
      "Under resonant conditions the amplitude of roll can reach dangerous levels",
      "A change of course or a reduction of speed may be necessary",
    ],
  },
  "wind-effect": {
    title: "Rüzgâr Etkisi",
    introduction: "Rüzgâr, geminin üst yapılarına etki ederek yatma momenti oluşturur ve stabiliteyi zorlar.",
    content: `The effect of wind depends on the surface area exposed to it and on the wind speed.

The wind heeling moment:
HMwind = 0.5 × ρair × V² × A × h

where ρair is the air density, V the wind speed, A the exposed area and h the lever.

The IMO weather criterion is the stability check that guarantees the ship will not capsize under a sudden gust. This criterion is applied graphically on the GZ curve.`,
    bulletPoints: [
      "Rüzgâr yatma momenti üst yapı alanına bağlıdır",
      "Rüzgâr hızının karesiyle orantılıdır",
      "IMO Weather Criterion rüzgâr güvenliğini test eder",
      "Yüksek freeboard ve üst yapı rüzgâr etkisini artırır",
    ],
    formula: {
      name: "Rüzgâr Yatma Momenti",
      expression: "HM = P × A × h; P = 0.5 × ρ × V²",
      description: "HM: Yatma momenti (N·m), P: Rüzgâr basıncı (Pa), A: Maruz alan (m²), h: Kaldırma kolu (m), V: Rüzgâr hızı (m/s)",
    },
    keyPoints: [
      "Rüzgâr kriteri tüm gemiler için zorunludur",
      "Ani rüzgâr (gust) hesaba katılır",
      "Yatma açısı sınırları kontrol edilir",
    ],
  },
  // =====================================================
  // BÖLÜM 11 - HASARLI STABİLİTE (DAMAGE STABILITY)
  // =====================================================
  "post-damage-floatation": {
    title: "Hasar Sonrası Yüzerlik",
    introduction: "Hasar sonrası yüzerlik, geminin bir veya birden fazla bölmenin su ile dolması durumunda yüzmeye devam edip edemeyeceğini belirler.",
    content: `Preserving buoyancy when the ship is damaged is critical for the safety of life and property.

Buoyancy after damage depends on two factors:
1. The volume and position of the damaged compartment
2. The ship's available reserve buoyancy

Reserve buoyancy is the watertight volume above the waterline. If the water entering the damaged compartment exceeds this volume the ship founders.

The permeability factor (μ) shows how much of the compartment can fill with water:
- Engine room: μ = 0.85
- Cargo hold (general cargo): μ = 0.60
- Passenger spaces: μ = 0.95
- Empty tanks: μ = 0.95

Flooded volume = Actual volume × μ`,
    images: [
      {
        src: damageStabilityDiagram,
        alt: "Damage stability diagram",
        caption: "Figure: a damaged compartment, water ingress and the resulting list",
      },
    ],
    bulletPoints: [
      "Rezerv yüzerlik = Su hattı üstü suya dayanıklı hacim",
      "Permeabilite (μ) bölmeye göre değişir",
      "Hasarlı hacim = Hacim × μ",
      "Bölmeleme geminin batma direncini artırır",
    ],
    formula: {
      name: "Hasarlı Hacim Hesabı",
      expression: "Vflooded = Vcompartment × μ",
      description: "Vflooded: Dolan hacim (m³), Vcompartment: Bölme hacmi (m³), μ: Permeabilite katsayısı",
    },
    examples: [
      {
        problem: "A cargo hold of 500 m³ is damaged. If the permeability is μ = 0.60, how much water enters?",
        solution: "Vflooded = 500 × 0.60 = 300 m³. Result: 300 m³ of water enters the hold.",
      },
    ],
    keyPoints: [
      "Permeabilite değerleri SOLAS tarafından belirlenir",
      "Yüksek permeabilite = Daha fazla su dolumu",
      "Bölme sayısı arttıkça hasar direnci artar",
    ],
  },
  "flooding-concept": {
    title: "Flooding Kavramı",
    introduction: "Flooding, geminin bir bölmesinin kontrolsüz şekilde su ile dolmasıdır ve iki yöntemle analiz edilir: kayıp yüzerlik ve eklenen ağırlık.",
    content: `Flooding is analysed in two ways:

1. THE LOST BUOYANCY METHOD:
The flooded compartment no longer produces buoyancy. The ship sinks deeper to restore equilibrium. In this method the displacement is taken as unchanged.

2. THE ADDED WEIGHT METHOD:
The water that enters is treated as a weight. The displacement increases and the ship sinks. This method also takes the free surface effect into account.

Both methods give the same final draft and trim; only the logic of the calculation differs.

Modern stability computers generally use the added weight method.`,
    bulletPoints: [
      "Kayıp yüzerlik: Bölme kaldırma üretmez",
      "Eklenen ağırlık: Su bir ağırlık olarak eklenir",
      "Her iki yöntem aynı sonucu verir",
      "Eklenen ağırlık serbest yüzeyi hesaba katar",
    ],
    formula: {
      name: "Eklenen Ağırlık Hesabı",
      expression: "wadded = Vflooded × ρwater",
      description: "wadded: Eklenen su ağırlığı (ton), Vflooded: Dolan hacim (m³), ρwater: Su yoğunluğu (t/m³)",
    },
    examples: [
      {
        problem: "If 400 m³ of sea water (ρ = 1.025 t/m³) enters a compartment, what is the weight added?",
        solution: "wadded = 400 × 1.025 = 410 tonnes. Result: 410 tonnes of weight is added.",
      },
    ],
    keyPoints: [
      "Flooding analizi hasar stabilitesinin temelidir",
      "Serbest yüzey etkisi flooding durumunda kritiktir",
      "Stabilite yazılımları flooding simülasyonu yapar",
    ],
  },
  "reserve-buoyancy": {
    title: "Rezerv Yüzerlik",
    introduction: "Rezerv yüzerlik, geminin su hattı üzerinde kalan suya dayanıklı hacmidir ve hasar durumunda batmaya karşı güvenlik marjını oluşturur.",
    content: `Reserve buoyancy is the volume formed by the ship's freeboard and enclosed superstructures. This volume provides additional buoyancy in a damaged condition.

Factors in reserve buoyancy:
- The height of the freeboard
- The volume of the enclosed superstructures
- Watertight subdivision
- The condition of doors and openings

SOLAS requirements:
- Minimum freeboard values
- Limits on compartment length
- Watertight door standards

The reserve buoyancy calculation:
RB = Vsuperstructure + Vfreeboard

Adequate reserve buoyancy keeps the ship afloat even in a damaged condition.`,
    bulletPoints: [
      "Rezerv yüzerlik = Fribord + Kapalı üst yapılar",
      "Fribord azaldıkça rezerv yüzerlik azalır",
      "Su geçirmez bölmeleme rezerv yüzerliği korur",
      "SOLAS minimum fribord değerlerini belirler",
    ],
    formula: {
      name: "Rezerv Yüzerlik",
      expression: "RB = WPA × Freeboard + Vsuperstructure",
      description: "RB: Rezerv yüzerlik (m³), WPA: Su hattı alanı (m²), Freeboard: Fribord (m)",
    },
    keyPoints: [
      "Rezerv yüzerlik güvenlik marjıdır",
      "Aşırı yükleme rezerv yüzerliği azaltır",
      "Kapalı kapılar rezerv yüzerliği korur",
    ],
    warnings: [
      "Open hatches and doors reduce reserve buoyancy to zero",
      "The freeboard line must not be exceeded",
    ],
  },
  "asymmetric-flooding": {
    title: "Asimetrik Flooding",
    introduction: "Asimetrik flooding, suyun geminin bir tarafına dolması durumudur ve tehlikeli list açısına yol açar.",
    content: `Asymmetric flooding occurs when the damage is on one side. If water enters only one side the ship heels to that side.

The dangers of asymmetric flooding:
1. A sudden and large angle of list
2. Immersion of the deck edge
3. Additional water entering through open deck openings
4. The risk of capsizing

Cross-flooding:
Deliberately filling the tanks on the opposite side to reduce the list. This operation:
- Is required by SOLAS
- Must be completed within a maximum of 15 minutes
- Reduces the list to an acceptable value

The cross-flooding capacity is determined in the design of the ship.`,
    bulletPoints: [
      "Asimetrik flooding tehlikeli list yaratır",
      "Çapraz eşitleme listi azaltır",
      "SOLAS maksimum 15 dakika çapraz eşitleme süresi tanır",
      "Güverte kenarı batması devrilmeye yol açar",
    ],
    formula: {
      name: "List Açısı Tahmini",
      expression: "tan(θ) ≈ (w × y) / (Δ × GM)",
      description: "θ: List açısı, w: Dolan su ağırlığı (ton), y: Suyun enine mesafesi (m), GM: Metasantrik yükseklik (m)",
    },
    examples: [
      {
        problem: "200 tonnes of water collects 5 m off the centreline. If Δ = 10,000 tonnes and GM = 1.0 m, what is the angle of list?",
        solution: "tan(θ) = (200 × 5) / (10,000 × 1.0) = 0.1. θ = arctan(0.1) ≈ 5.7°. Result: the angle of list is about 6°.",
      },
    ],
    keyPoints: [
      "Asimetrik flooding en tehlikeli hasar durumudur",
      "Çapraz eşitleme sistemleri kritiktir",
      "List açısı 15°'yi aşmamalıdır",
    ],
  },
  "progressive-flooding": {
    title: "Progressive Flooding",
    introduction: "Progressive flooding, suyun bir bölmeden diğerine kontrol dışı yayılmasıdır ve geminin batma riskini artırır.",
    content: `Progressive flooding is the spread of water from the damaged compartment into other compartments through:
- Open doors
- Damaged compartment boundaries
- Ventilation ducts
- Pipelines

This rapidly worsens the ship's condition after the initial damage.

Methods of prevention:
1. Closing the watertight doors
2. Closing the ventilation dampers
3. Checking the pipeline valves
4. Isolating the damaged compartment

SOLAS assesses the duration of progressive flooding and the final condition of the ship.`,
    bulletPoints: [
      "Su açık geçitlerden diğer bölmelere yayılır",
      "Gemi durumu hızla kötüleşir",
      "Su geçirmez kapılar yayılmayı önler",
      "SOLAS progressive flooding senaryolarını test eder",
    ],
    keyPoints: [
      "Kapı ve damperlerin durumu kritiktir",
      "Düzenli su geçirmezlik kontrolleri yapılmalıdır",
      "Mürettebat eğitimi önemlidir",
    ],
    warnings: [
      "Doors left open can lead to disaster",
      "Watertight doors must be kept closed at sea",
    ],
  },
  "damaged-gm-gz": {
    title: "Hasarlı GM ve GZ",
    introduction: "Hasar sonrası GM ve GZ değerleri değişir; bu değişim geminin hayatta kalma kapasitesini belirler.",
    content: `Changes in stability after flooding:

CHANGE IN GM:
1. Change in KG: the water that enters raises or lowers the centre of gravity
2. Change in KM: the new draft and trim affect KM
3. Free surface: a free surface effect arises in the flooded compartment

Damaged GM = Intact GM + change in KM - change in KG - FSE

CHANGE IN THE GZ CURVE:
- The curve shifts horizontally (the angle of list)
- The maximum GZ decreases
- The area of stability shrinks
- The angle of vanishing stability decreases

SOLAS defines minimum GZ and area values for the damaged condition.`,
    bulletPoints: [
      "Hasarlı GM genellikle azalır",
      "Serbest yüzey GM'yi daha da düşürür",
      "GZ eğrisi list yönüne kayar",
      "Stabilite marjları daralır",
    ],
    formula: {
      name: "Hasarlı GM Tahmini",
      expression: "GMdamaged = GMintact - ΔFSE - ΔKG + ΔKM",
      description: "Her parametre flooding durumuna göre hesaplanır",
    },
    keyPoints: [
      "Hasarlı stabilite hesabı zorunludur",
      "SOLAS minimum değerleri belirler",
      "Stabilite bilgisayarları hasar senaryolarını simüle eder",
    ],
  },
  // =====================================================
  // BÖLÜM 12 - ÖZEL STABİLİTE DURUMLARI
  // =====================================================
  "heavy-lift": {
    title: "Heavy Lift Operasyonları",
    introduction: "Heavy lift operasyonları, ağır yüklerin vinç ile kaldırılması sırasında geminin stabilitesini kritik şekilde etkiler.",
    content: `Changes in stability during a heavy lift:

1. VIRTUAL RISE OF KG:
Once the weight leaves the ground its centre of gravity behaves as if it had moved to the head of the derrick.
KGnew = KG + (w × h) / Δ
h: the height of lift

2. PENDULUM EFFECT:
The suspended weight behaves like a pendulum and reduces GM.
GMreduced = GM - (w × l²) / (Δ × GM)
l: the length of the sling

3. FORMATION OF LIST:
A transverse moment arises when the boom is swung outboard.

Safety precautions:
- A stability calculation before the lift
- Ballast prepared
- Continuous monitoring during the lift
- Checking the wind and sea state`,
    bulletPoints: [
      "Yük kalktığında KG sanal olarak yükselir",
      "Asılı yük sarkaç etkisi yaratır",
      "GM kaldırma sırasında azalır",
      "Stabilite hesabı operasyon öncesi yapılmalıdır",
    ],
    formula: {
      name: "Sanal KG Yükselmesi",
      expression: "ΔKG = (w × h) / Δ",
      description: "ΔKG: KG artışı (m), w: Yük ağırlığı (ton), h: Kaldırma yüksekliği (m), Δ: Deplasman (ton)",
    },
    examples: [
      {
        problem: "A 50-tonne weight is lifted to a height of 10 m. If Δ = 5,000 tonnes, by how much does KG increase?",
        solution: "ΔKG = (50 × 10) / 5,000 = 0.10 m. Result: KG rises virtually by 10 cm.",
      },
    ],
    keyPoints: [
      "Her kaldırma öncesi stabilite kontrolü yapılır",
      "Rüzgârda kaldırma tehlikelidir",
      "Asılı yük serbest yüzey gibi davranır",
    ],
  },
  "deck-cargo": {
    title: "Güverte Yükleri",
    introduction: "Güverte yükleri KG'yi yükselterek GM'yi azaltır ve rüzgâr alanını artırarak stabiliteyi olumsuz etkiler.",
    content: `The stability effects of deck cargo:

1. RISE IN KG:
Cargo carried on deck has a high KG.
KGnew = Σ(wᵢ × KGᵢ) / Σwᵢ

2. REDUCTION IN GM:
A higher KG lowers GM.
GM = KM - KG

3. INCREASED WINDAGE AREA:
Deck containers or timber stacks increase the area exposed to the wind.

4. TRANSVERSE MOMENT:
A list arises if the cargo is stowed unevenly.

Limits on deck cargo:
- Maximum cargo weight (structural)
- Stability requirements
- Visibility requirements
- Lashing capacity`,
    bulletPoints: [
      "Güverte yükü KG'yi yükseltir",
      "Rüzgâr maruz alanı artar",
      "List oluşmaması için dengeli yükleme gerekir",
      "Bağlama güvenliği kritiktir",
    ],
    formula: {
      name: "Güverte Yükü ile KG",
      expression: "KGnew = (Δold × KGold + wdeck × KGdeck) / Δnew",
      description: "Ağırlık-moment yöntemiyle yeni KG hesaplanır",
    },
    keyPoints: [
      "Güverte yükü limitleri aşılmamalıdır",
      "Stabilite hesabı güverte yükünü içermelidir",
      "Bağlama planı hazırlanmalıdır",
    ],
  },
  "suspended-weight": {
    title: "Asılı Yük Etkisi",
    introduction: "Asılı yükler ağırlık merkezini sanal olarak askı noktasına taşır ve stabiliteyi azaltır.",
    content: `A suspended weight is any weight free to swing:
- A crane load
- Cargo in a sling
- Freely swinging equipment

VIRTUAL RISE OF KG:
The centre of gravity of a suspended weight is taken as having moved to the point of suspension.
GG' = (w × d) / Δ
d: the distance between the actual KG of the weight and the point of suspension

THE PENDULUM EFFECT:
A suspended weight swings outboard when the ship heels and increases the heel. This effect is similar to free surface.

GM with a suspended weight:
GMeffective = GM - (w × l²) / (Δ × GM)
l: the length of the sling`,
    bulletPoints: [
      "Asılı yük KG'yi sanal olarak yükseltir",
      "Salıncak etkisi stabiliteyi azaltır",
      "Serbest yüzey benzeri etki yaratır",
      "Kaldırma operasyonlarında kritiktir",
    ],
    formula: {
      name: "Asılı Yük KG Yükselmesi",
      expression: "GG' = (w × d) / Δ",
      description: "GG': Sanal KG yükselmesi (m), w: Asılı ağırlık (ton), d: Askı noktası mesafesi (m)",
    },
    examples: [
      {
        problem: "A 30-tonne weight is suspended from a point 8 m above its KG. If Δ = 6,000 tonnes, what is the virtual rise of KG?",
        solution: "GG' = (30 × 8) / 6,000 = 0.04 m. Result: KG rises virtually by 4 cm.",
      },
    ],
    keyPoints: [
      "Asılı yük serbest yüzey gibi etki eder",
      "Uzun sapanlar etkiyi artırır",
      "Operasyon sırasında izleme gerekir",
    ],
  },
  "ballast-operations": {
    title: "Balast Operasyonları",
    introduction: "Balast operasyonları geminin stabilitesini, draft ve trim değerlerini kontrol etmek için kullanılır.",
    content: `Ballast water management is the principal tool of stability control.

THE FUNCTIONS OF BALLAST:
1. Adjusting stability (GM control)
2. Correcting trim
3. Correcting list
4. Achieving a minimum draft
5. Managing stresses

STABILITY EFFECTS:
Ballast tanks are generally in the lower part of the ship.
- Taking ballast: KG falls and GM increases
- Discharging ballast: KG rises and GM decreases

FREE SURFACE:
Partly filled ballast tanks create a free surface effect. During critical operations tanks must be kept either full or empty.

The sequence of ballast operations matters — stability must not fall below critical values at any stage.`,
    bulletPoints: [
      "Balast stabilite, draft ve trim kontrolü sağlar",
      "Düşük tanklar KG'yi düşürür",
      "Kısmen dolu tanklar FSE yaratır",
      "Değişim sırası stabilitey etkiler",
    ],
    formula: {
      name: "Balast ile KG Değişimi",
      expression: "KGnew = (Δ × KG + wballast × KGtank) / (Δ + wballast)",
      description: "Balast alındığında yeni KG hesaplanır",
    },
    keyPoints: [
      "Balast operasyonu planı hazırlanmalıdır",
      "Serbest yüzey etkisi izlenmelidir",
      "Ara durumlar kontrol edilmelidir",
    ],
  },
  "cargo-shift": {
    title: "Kargo Kayması",
    introduction: "Kargo kayması, yükün geminin hareketi ile yer değiştirmesidir ve ani list veya devrilmeye yol açabilir.",
    content: `A cargo shift is one of the most dangerous causes of stability casualties.

TYPES OF SHIFT:
1. Bulk cargo shift (grain, ore, coal)
2. Packaged cargo shift (lashings parting)
3. Liquid cargo sloshing (within the tank)
4. Vehicle movement (Ro-Ro ships)

LIST CALCULATION:
tan(θ) = (w × d) / (Δ × GM)
w: the weight of cargo that shifts
d: the distance it shifts

PRECAUTIONS:
- Proper stowage and lashing
- Use of shifting boards for grain
- Checking tank filling levels
- Lashing vehicles on Ro-Ro ships

SOLAS and the Grain Code make anti-shifting measures mandatory.`,
    bulletPoints: [
      "Kargo kayması tehlikeli list yaratır",
      "Döküm yükler özel risk taşır",
      "Bağlama kopması devrilmeye yol açabilir",
      "IMO yük güvenliği kuralları zorunludur",
    ],
    formula: {
      name: "Kargo Kayması List Açısı",
      expression: "tan(θ) = (w × d) / (Δ × GM)",
      description: "θ: List açısı, w: Kayan ağırlık (ton), d: Kayma mesafesi (m)",
    },
    examples: [
      {
        problem: "500 tonnes of cargo shifts 2 m to one side. If Δ = 15,000 tonnes and GM = 1.0 m, what is the angle of list?",
        solution: "tan(θ) = (500 × 2) / (15,000 × 1.0) = 0.067. θ = arctan(0.067) ≈ 3.8°. Result: a list of around 4° is created.",
      },
    ],
    keyPoints: [
      "Yük güvenliği operasyonun ayrılmaz parçasıdır",
      "Seyir sırasında yük kontrolü yapılmalıdır",
      "Kötü hava öncesi bağlamalar kontrol edilmelidir",
    ],
  },
  "icing-effect": {
    title: "Buzlanma Etkisi",
    introduction: "Buzlanma, geminin üst yapılarında buz birikmesiyle KG'yi yükselterek stabiliteyi tehlikeli şekilde azaltır.",
    content: `Icing is a serious stability hazard for ships operating in cold regions.

ICE ACCRETION:
- Air temperature below -2°C
- Sea water temperature below +8°C
- Wind and sea spray

WEIGHT OF ICE:
Ice builds up on superstructures, equipment and the deck.
- Moderate icing: 30 kg/m²
- Severe icing: 50+ kg/m²

STABILITY EFFECT:
Ice has a high KG.
ΔKG = (wice × KGice) / (Δ + wice)

GM falls rapidly and the risk of capsizing increases.

Removing ice is critically important.`,
    bulletPoints: [
      "Buzlanma KG'yi yükseltir",
      "GM azalır, stabilite bozulur",
      "Şiddetli buzlanmada devrilme riski vardır",
      "Buz temizliği sürekli yapılmalıdır",
    ],
    formula: {
      name: "Buz Ağırlığı ile KG Değişimi",
      expression: "ΔKG = (mice × hice) / Δ",
      description: "ΔKG: KG artışı (m), mice: Buz kütlesi (ton), hice: Buzun ortalama yüksekliği (m)",
    },
    examples: [
      {
        problem: "50 tonnes of ice builds up on the superstructures at a mean KG of 15 m. If Δ = 5,000 tonnes and the existing KG = 7 m, what is the new KG?",
        solution: "KGnew = (5,000 × 7 + 50 × 15) / 5,050 = (35,000 + 750) / 5,050 = 7.08 m. Result: KG rises by 8 cm.",
      },
    ],
    keyPoints: [
      "Soğuk bölge seyirlerinde buzlanma izlenir",
      "Buz temizliği öncelikli operasyondur",
      "Buzlanma hızı şiddetli koşullarda çok yüksektir",
    ],
    warnings: [
      "Icing can reach a critical level in a very short time",
      "A change of course may be necessary",
    ],
  },
  // =====================================================
  // BÖLÜM 13 - STABİLİTE KRİTERLERİ VE ULUSLARARASI KURALLAR
  // =====================================================
  "imo-stability-criteria": {
    title: "IMO Stabilite Kriterleri",
    introduction: "IMO stabilite kriterleri, gemilerin minimum güvenlik gereksinimlerini tanımlar ve tüm ticari gemiler için zorunludur.",
    content: `The IMO (International Maritime Organization) stability criteria are set out in the MSC.267(85) Intact Stability Code.

THE BASIC CRITERIA:

1. AREA CRITERIA:
- The area from 0° to 30° ≥ 0.055 m·rad
- The area from 0° to 40° ≥ 0.090 m·rad
- The area from 30° to 40° ≥ 0.030 m·rad

2. GZ CRITERIA:
- Maximum GZ ≥ 0.20 m
- The maximum GZ must occur at an angle of at least 25°
- Preferably at 30° or above

3. GM CRITERION:
- Initial GM ≥ 0.15 m
- Higher values for some ship types

These criteria are for intact stability. Damage stability criteria are defined separately.`,
    bulletPoints: [
      "Alan kriterleri dinamik stabiliteyi kontrol eder",
      "GZ kriterleri yeterli doğrultma kolunu garanti eder",
      "GM kriteri ilk stabiliteyi sağlar",
      "Tüm kriterler aynı anda sağlanmalıdır",
    ],
    formula: {
      name: "IMO Alan Kriterleri",
      expression: "A₁ ≥ 0.055; A₂ ≥ 0.090; A₃ ≥ 0.030 (m·rad)",
      description: "A₁: 0-30° alan, A₂: 0-40° alan, A₃: 30-40° alan",
    },
    keyPoints: [
      "Kriterler tüm yükleme durumları için sağlanmalıdır",
      "Stabilite kitapçığı onaylı durumları listeler",
      "Kriter dışı çalışma yasaktır",
    ],
  },
  "intact-stability-code": {
    title: "Intact Stability Code",
    introduction: "Intact Stability Code (IS Code), hasarsız gemiler için kapsamlı stabilite gereksinimlerini ve hesap yöntemlerini içerir. 2008 IS Code (MSC.267(85)) ile kabul edilmiş olup SOLAS ve Yük Hattı Sözleşmesi kapsamında zorunludur.",
    content: `The Intact Stability Code (the 2008 IS Code) was adopted by resolution MSC.267(85).

STRUCTURE:
Part A (mandatory): the general criteria and the criteria for particular ship types.
Part B (recommendatory): additional measures and guidance.

GENERAL CRITERIA (Part A, 2.2 – for all ships):
Minimum requirements for the areas under the GZ curve and for the GZ values:
- The area under the GZ curve from 0° to 30° ≥ 0.055 m·rad
- The area from 0° to 40° (or 0° to θf if the downflooding angle θf is smaller) ≥ 0.090 m·rad
- The area from 30° to 40° (or 30° to θf) ≥ 0.030 m·rad
- The righting lever GZ must be ≥ 0.20 m at an angle of 30° or more
- The maximum GZ should preferably occur at an angle greater than 30° (at least 25°)
- The initial metacentric height GM₀ ≥ 0.15 m

THE WEATHER CRITERION (Part A 2.3):
The ship must have sufficient energy reserve against capsizing under a steady beam wind (lever arm lw1) with a superimposed roll and gust (lw2). The area resisting the wind moment (b) must be greater than or equal to the area applied by the wind moment (a), i.e. b ≥ a.

PARTICULAR SHIP TYPES:
Additional or special criteria are defined for passenger ships (passenger crowding and turning moment criteria), grain carriers (the Grain Code), timber deck cargoes, high-speed craft, offshore units and others.

APPLICATION:
Every loading condition is checked against these criteria in the ship's approved Stability Booklet; the flag State and PSC verify compliance.`,
    bulletPoints: [
      "Genel kriter: 0-30° alan ≥0,055; 0-40° ≥0,090; 30-40° ≥0,030 m·rad",
      "GZ ≥ 0,20 m (≥30°'de); GZ maks ≥25-30°'de; GM₀ ≥ 0,15 m",
      "Weather criterion: rüzgâr+yalpa altında b ≥ a (enerji dengesi)",
      "Tahıl, yolcu, kereste, HSC için özel kriterler vardır",
    ],
    formula: {
      name: "Weather Criterion (hava kriteri)",
      expression: "b ≥ a",
      description: "Devrilmeye karşı koyan GZ alanı (b), rüzgâr+yalpa momentinin uyguladığı alandan (a) büyük/eşit olmalı.",
    },
    keyPoints: [
      "IS Code stabilite kitapçığı kriterlerinin temelidir.",
      "Genel kriterler alan, GZ ve GM₀ için sayısal sınır koyar.",
      "Weather criterion rüzgâr/yalpa altında enerji rezervini güvence altına alır.",
      "Bayrak devleti ve PSC uyumu denetler.",
    ],
  },
  "wind-criteria": {
    title: "Rüzgâr Kriterleri",
    introduction: "Rüzgâr kriterleri (Weather Criterion), geminin şiddetli rüzgâr ve dalga koşullarında devrilmemesini sağlar.",
    content: `The weather criterion tests the ship's survival under a combination of a sudden gust and waves.

THE SCENARIO:
1. A steady wind heels the ship to angle θ₁
2. Wave action rolls the ship to windward to angle θ₂
3. A gust pushes the ship back to leeward

THE CRITERION:
b ≥ a (areas on the GZ curve)
- a: the area between the wind moment and the GZ curve
- b: the area on the righting side

WIND PRESSURE:
P = 504 N/m² (the standard value)
Correction factors are applied.

This criterion is particularly critical for ships with a large superstructure.`,
    bulletPoints: [
      "Weather Criterion en kötü senaryo testidir",
      "Ani rüzgâr ve dalga kombinasyonu değerlendirilir",
      "GZ eğrisinde alan karşılaştırması yapılır",
      "Stabilite kitapçığında grafiksel gösterilir",
    ],
    formula: {
      name: "Weather Criterion",
      expression: "b ≥ a; P = 504 N/m² (standart)",
      description: "a: Rüzgâr yatırma alanı, b: Doğrultma rezerv alanı",
    },
    keyPoints: [
      "Weather Criterion tüm gemiler için zorunludur",
      "Yüksek freeboard bu kriteri zorlaştırır",
      "Tasarımda dikkate alınmalıdır",
    ],
  },
  "wave-criteria": {
    title: "Dalga Kriterleri",
    introduction: "Dalga kriterleri, geminin dalga etkisinde parametrik yalpalama ve aşırı salınım risklerini değerlendirir.",
    content: `Assessing stability in a seaway:

PARAMETRIC ROLLING:
In head or following seas the breadth of the waterplane changes periodically. This changes GM periodically and, under resonant conditions, leads to dangerous rolling.

Container ships and RoPax vessels are particularly susceptible.

SURF-RIDING AND BROACHING:
In following seas the ship can be carried along with the wave and fall into an uncontrolled turn.

IMO RECOMMENDATIONS:
- MSC.1/Circ.1228: parametric rolling
- MSC.1/Circ.707: avoiding dangerous situations

Operational measures: a change of course and speed.`,
    bulletPoints: [
      "Parametrik yalpalama GM değişiminden kaynaklanır",
      "Rezonans koşullarında salınım tehlikeli boyutlara ulaşır",
      "Konteyner gemileri hassastır",
      "Rota ve hız ayarlaması ile önlenir",
    ],
    keyPoints: [
      "Dalga periyodu ile yalpa periyodu ilişkisi kritiktir",
      "Operasyonel farkındalık gereklidir",
      "Simülasyon araçları risk değerlendirmesinde kullanılır",
    ],
    warnings: [
      "Parametric rolling can be sudden and violent",
      "Heavy weather routeing is vitally important",
    ],
  },
  "min-gm-requirements": {
    title: "Minimum GM Şartları",
    introduction: "Minimum GM değerleri, IMO IS Code kriterlerinden türetilir ve gemi tipi ile yükleme durumuna göre stabilite kitapçığında belirtilen, operasyonda aşılamaz alt sınırlardır. Ancak GM yalnızca 'ne kadar büyük o kadar iyi' değildir; çok yüksek GM de tehlikelidir.",
    content: `THE ORIGIN OF THE MINIMUM GM:
The IS Code requires GM₀ ≥ 0.15 m for the initial metacentric height. In practice the minimum GM required for each loading condition is given in the booklet by the KG limit curve (the maximum KG / minimum GM curve); this curve represents the boundary at which all the IMO criteria (area, GZ, weather criterion) are met simultaneously.

BY SHIP TYPE:
- General cargo ship: GM₀ ≥ 0.15 m (plus the KG limit curve).
- Passenger ships: additional turning/passenger crowding criteria.
- Tankers: generally a higher GM in the ballast condition.
- Container ships: a calculation specific to the loading condition because of the risk of parametric rolling.

STIFF AND TENDER SHIPS:
GM and the rolling period are inversely related. A very high GM → a short period and stiff, violent rolling → damage to cargo and equipment and loss of comfort; and if the short period approaches the wave period, resonance. A very low GM → a long, sluggish roll, a small margin of safety and danger in a following sea. The aim is therefore a GM that meets the criteria without being excessively high.`,
    bulletPoints: [
      "GM₀ ≥ 0,15 m (IS Code) + KG limiti eğrisi her yükleme için sınır verir",
      "Stiff (yüksek GM): kısa/sert yalpa, hasar ve rezonans riski",
      "Tender (düşük GM): uzun yalpa, küçük emniyet payı",
      "Konteyner gemilerinde parametrik yalpa için ek dikkat",
    ],
    formula: {
      name: "Yalpa periyodu – GM ilişkisi",
      expression: "Troll = 2π · k / √(g · GM)",
      description: "k: jirasyon yarıçapı. GM arttıkça periyot kısalır (gemi sertleşir); GM azaldıkça periyot uzar.",
    },
    keyPoints: [
      "Minimum GM, IMO kriterlerini sağlayan KG limit eğrisinden gelir.",
      "Hem çok düşük hem çok yüksek GM tehlikelidir.",
      "Yalpa periyodu GM'nin pratik göstergesidir (T = 2πk/√(gGM)).",
      "GM azaltıcı operasyon öncesi hesap yapılmalıdır.",
    ],
    warnings: [
      "Sailing below the minimum GM carries a risk of capsizing",
      "An excessively high GM can cause cargo to shift and be damaged through violent rolling",
    ],
  },
  "operational-limits": {
    title: "Operasyonel Limitler",
    introduction: "Operasyonel limitler, geminin güvenli çalışma koşullarını tanımlar ve aşılmaları yasaktır.",
    content: `The operational limits are defined in the stability booklet:

CARGO LIMITS:
- Maximum deadweight
- Hold and deck cargo capacities
- Limits on cargo distribution

STABILITY LIMITS:
- Minimum GM values
- Maximum KG values (the KG limit curve)
- Trim limits

ENVIRONMENTAL LIMITS:
- Wind speed limits (for certain operations)
- Wave height limits
- Temperature limits (icing)

EXCEEDING THE LIMITS:
Exceeding the stability limits:
- Affects the validity of the insurance
- Leads to detention in PSC inspections
- Creates liability in the event of a casualty`,
    bulletPoints: [
      "Stabilite kitapçığı tüm limitleri tanımlar",
      "KG limiti eğrisi sık kullanılır",
      "Limit aşımı yasal sonuçlar doğurur",
      "Her yükleme limitlere göre kontrol edilir",
    ],
    keyPoints: [
      "Limitler güvenli operasyonun sınırlarıdır",
      "Kaptan limitlerden sorumludur",
      "Limit yaklaşımlarında dikkat gerekir",
    ],
  },
  // =====================================================
  // BÖLÜM 14 - STABİLİTE KAZALARI VE OPERASYONEL SONUÇLAR
  // =====================================================
  "loading-errors": {
    title: "Yükleme Hataları",
    introduction: "Yükleme hataları stabilite kazalarının en yaygın nedenidir ve dikkatli planlama ile önlenebilir.",
    content: `Common loading errors:

1. INCORRECT WEIGHT INFORMATION:
- A difference between the declared and the actual weight
- Deviations in container weights
- Measurement errors on bulk cargo

2. INCORRECT STOWAGE:
- Heavy weights stowed high up
- Asymmetric weight distribution
- Incorrect assessment of broken stowage

3. CALCULATION ERRORS:
- An incorrect KG calculation
- Neglecting the FSE
- Errors in the trim calculation

4. LACK OF PLANNING:
- Intermediate conditions not checked
- The effect of fuel consumption
- Inadequate ballast arrangement

These errors are prevented by careful use of the stability booklet.`,
    bulletPoints: [
      "Yanlış ağırlık bilgisi yaygın sorundur",
      "Yüksek yerleşim GM'yi düşürür",
      "Hesap hataları kritik sonuçlar doğurur",
      "Dikkatli planlama kazaları önler",
    ],
    keyPoints: [
      "Yük bilgileri doğrulanmalıdır",
      "Hesaplar iki kez kontrol edilmelidir",
      "Ara durumlar gözden geçirilmelidir",
    ],
    warnings: [
      "Container weights are frequently misdeclared",
      "The IMO VGM (Verified Gross Mass) requirement is in force",
    ],
  },
  "fse-accidents": {
    title: "Serbest Yüzey Kaynaklı Kazalar",
    introduction: "Serbest yüzey etkisinin ihmal edilmesi veya yanlış hesaplanması ciddi stabilite kazalarına yol açmıştır.",
    content: `The common features of free surface casualties:

1. A LARGE NUMBER OF PARTLY FILLED TANKS:
Several partly filled tanks raise the total FSE to a critical level.

2. NEGLECTING THE FSE CALCULATION:
Failing to apply the free surface correction in the GM calculation.

3. A SUDDEN LOSS OF GM:
A sudden increase in FSE during a cargo or ballast operation.

EXAMPLE CASUALTIES:
- A bulk carrier capsizing (several partly filled holds)
- A tanker capsizing (transfer of liquid between compartments)
- A fishing vessel foundering (holds left open)

The remedy: keep tanks either full or empty and monitor the FSE continuously.`,
    bulletPoints: [
      "Çok sayıda kısmen dolu tank tehlikelidir",
      "FSE hesabı ihmal edilmemelidir",
      "Ani GM kaybı devrilmeye yol açar",
      "Tank durumu sürekli izlenmelidir",
    ],
    keyPoints: [
      "FSE her stabilite hesabına dahil edilmelidir",
      "Kritik operasyonlarda tank sayısı azaltılmalıdır",
      "Operasyon öncesi hesap yapılmalıdır",
    ],
  },
  "wrong-gm-interpretation": {
    title: "Yanlış GM Yorumları",
    introduction: "GM değerinin yanlış yorumlanması operasyonel hatalara ve kazalara neden olabilir.",
    content: `Errors in interpreting GM:

1. THE FALLACY THAT A VERY HIGH GM IS GOOD:
A very high GM leads to violent rolling (a stiff ship):
- A short rolling period
- The risk of cargo damage
- Discomfort for the crew
- Structural stress

2. THE FALLACY THAT AN EVEN KEEL IS ALWAYS BEST:
On some ships an optimum trim improves fuel efficiency.

3. FAILING TO RECOGNISE A NEGATIVE GM:
An angle of loll (unstable equilibrium) can be misinterpreted:
- It is taken for the effect of the wind
- An attempt to correct it makes the situation worse

4. CONFUSING STATIC AND DYNAMIC STABILITY:
An adequate GM does not mean adequate dynamic stability.`,
    bulletPoints: [
      "Çok yüksek GM de sorunludur",
      "Negatif GM loll açısı yaratır",
      "Statik ve dinamik stabilite farklıdır",
      "Optimum GM değeri aranmalıdır",
    ],
    keyPoints: [
      "GM dengeli bir değerde tutulmalıdır",
      "Loll açısı tehlikeli bir uyarıdır",
      "Alan kriterleri de kontrol edilmelidir",
    ],
    warnings: [
      "Ballast must not be taken into the low side when the ship is at an angle of loll",
      "Water must first be taken into the lowest tanks",
    ],
  },
  "trim-operation-errors": {
    title: "Trim Kaynaklı Operasyon Hataları",
    introduction: "Yanlış trim değerleri pervane verimliliğini, manevrabiliteyi ve güvenliği olumsuz etkiler.",
    content: `Operational errors caused by trim:

1. EXCESSIVE TRIM BY THE HEAD:
- Deck wetness
- Reduced visibility
- The risk of shipping seas forward
- Loss of propeller efficiency

2. EXCESSIVE TRIM BY THE STERN:
- Reduced rudder effect
- Inefficient bow thruster
- Difficulty manoeuvring in port
- Increased hull friction

3. TRIM CALCULATION ERRORS:
- Incorrect use of the LCF
- Taking the wrong MCT value
- Neglecting intermediate conditions

4. THE EFFECT OF FUEL CONSUMPTION:
Fuel consumption during the passage changes the trim.`,
    bulletPoints: [
      "Aşırı baş trimi güverte ıslaklığına yol açar",
      "Aşırı kıç trimi manevrabiliteyi azaltır",
      "Optimum trim yakıt tasarrufu sağlar",
      "Seyir sırasında trim değişir",
    ],
    keyPoints: [
      "Trim değerleri sürekli izlenmelidir",
      "Optimum trim gemiye özeldir",
      "Yakıt transferi ile trim düzeltilebilir",
    ],
  },
  "psc-findings": {
    title: "Stabiliteyle İlişkili PSC Bulguları",
    introduction: "Port State Control denetimleri stabilite eksikliklerini tespit eder ve gemi tutulmasına yol açabilir.",
    content: `A PSC (Port State Control) stability inspection focuses on:

DOCUMENT CHECKS:
- Whether the stability booklet is up to date
- Approval of the loading computer
- Training records
- Stability calculations

PHYSICAL CHECKS:
- Comparing the draft readings against the calculation
- Agreement between the tank condition and the calculation
- The condition of the watertight doors
- The lashing equipment

COMMON FINDINGS:
- The stability calculation is not up to date
- The drafts do not agree with the calculation
- Watertight doors left open
- Incomplete cargo lashing
- The FSE not included in the calculation

Detention: the ship is not allowed to sail where critical findings arise.`,
    bulletPoints: [
      "Stabilite kitapçığı güncel olmalıdır",
      "Hesaplar gerçek durumla uyumlu olmalıdır",
      "Su geçirmez kapılar çalışır durumda olmalıdır",
      "Yük bağlama yeterli olmalıdır",
    ],
    keyPoints: [
      "PSC denetimi her limanda olabilir",
      "Kritik bulgu gemi tutulmasına yol açar",
      "Düzenli iç denetim önerilir",
    ],
    warnings: [
      "Detention means financial and operational loss",
      "Preventive procedures must be applied as required by the ISM Code",
    ],
  },

  "inclining-experiment": {
    title: "Meyil Deneyi (Inclining Experiment)",
    introduction: "Meyil deneyi, geminin boş (lightship) durumdaki ağırlık merkezi yüksekliğini (KG) ve boş gemi deplasmanını deneysel olarak belirlemek için yapılan kontrollü bir testtir. Tüm stabilite hesaplarının dayandığı KG değeri bu deneyle elde edilir.",
    content: `PURPOSE:

A ship's stability calculations cannot be made without knowing the lightship weight and the height of its centre of gravity (KG). The inclining experiment measures KG directly by heeling the ship in a controlled way with known weights. It is mandatory for newly built ships and for ships that have undergone major alterations.

METHOD:

A known weight (w) on deck is shifted transversely through a known distance (d). This applies a heeling moment to the ship and the ship heels through a small angle (θ). The heel is measured with a plumb line (pendulum) or a U-tube manometer. The ship's metacentric height (GM) is calculated from the measured heel; since KM is known from the hydrostatic tables, KG = KM − GM.

FORMULA:

Heeling moment = w × d. This moment is related to GM and the angle of heel.

EXPERIMENT CONDITIONS (FOR ACCURACY):

- The ship should be as light as possible and "as nearly complete as possible".
- Liquid tanks should be either completely full or empty (to eliminate the free surface effect), or a free surface correction must be applied.
- Wind, current and mooring line tension must be minimal; the ship must be free to heel.
- The experiment is repeated with several different weights and in both directions, and the results are averaged.
- Unknown weights (remaining cargo, water, waste) are recorded and corrected for.

RESULT:

The lightship displacement and KG obtained from the experiment are entered in the ship's Stability Booklet; the stability calculations for all loading conditions are based on these fundamental values.`,
    formula: {
      name: "Metasantr Yüksekliği (meyil deneyi)",
      expression: "GM = (w × d) / (W × tan θ)   →   KG = KM − GM",
      description: "w: kaydırılan ağırlık, d: kaydırma mesafesi, W: toplam deplasman, θ: meyil açısı, KM: hidrostatik tablodan.",
    },
    bulletPoints: [
      "Lightship deplasmanı ve KG'yi deneysel olarak belirler.",
      "Bilinen ağırlık enine kaydırılır, meyil sarkaç/U-borusuyla ölçülür.",
      "GM ölçülür, KM bilindiğinden KG = KM − GM bulunur.",
      "Serbest yüzey ve dış etkiler minimize edilir; tekrarla ortalama alınır.",
    ],
    keyPoints: [
      "Tüm stabilite hesaplarının temeli KG'dir; meyil deneyi KG'yi verir.",
      "Yeni inşa/büyük değişiklik sonrası zorunludur.",
      "Tank serbest yüzeyi ve dış kuvvetler doğruluğu doğrudan etkiler.",
    ],
    warnings: [
      "Tanks with free surfaces or tension in the mooring lines distort the result seriously",
      "An incorrect KG makes all the loading stability calculations unreliable",
    ],
  },

  "probabilistic-damage-stability": {
    title: "Olasılıksal Hasar Stabilitesi",
    introduction: "Hasar stabilitesinin değerlendirilmesinde iki yaklaşım vardır: deterministik (belirli hasar senaryolarına göre) ve olasılıksal (hasarın istatistiksel olasılığına göre). SOLAS, kuru yük ve yolcu gemilerinde olasılıksal yöntemi (probabilistic damage stability) esas alır.",
    content: `TWO APPROACHES:

THE DETERMINISTIC METHOD:
Defined damage scenarios (for example the flooding of one or two compartments) are considered and the ship must meet defined criteria in each scenario. The "one-compartment/two-compartment standard" is the classic expression of this logic. It is easy to understand but does not fully reflect the variety of real damage.

THE PROBABILISTIC METHOD (SOLAS II-1):
It is based on real collision/damage statistics. It takes account of the probabilities that damage may occur anywhere along the ship and be of various extents and depths. The basic measure is that the Attained Subdivision Index (A) must be greater than or equal to the Required Subdivision Index (R).

THE A AND R INDICES:

- R (Required Index): the minimum level of subdivision that must be achieved, determined by the type and size of the ship (number of passengers, length).
- A (Attained Index): the value calculated from the ship's actual subdivision arrangement, reflecting the probability of survival after damage. A is calculated as the sum of the products of the probability of damage (p) for each compartment or group of compartments and the probability of surviving that damage (s).

THE MEASURE:

A ≥ R must be achieved. Certain partial indices and worst-case conditions are also checked.

WHY IT MATTERS AT SEA:

The probabilistic approach gives the designer flexibility in subdivision while aiming to produce statistically safer ships. What matters to the officer is knowing that the ship's approved loading/damage conditions are defined in the Stability Booklet and the damage control information, and that they must be complied with.`,
    formula: {
      name: "Ulaşılan Bölmelendirme İndeksi",
      expression: "A = Σ (pᵢ × sᵢ) ≥ R",
      description: "pᵢ: i bölgesinin hasar görme olasılığı, sᵢ: o hasardan sonra hayatta kalma olasılığı, R: gerekli indeks.",
    },
    bulletPoints: [
      "Deterministik: belirli senaryolar (bir/iki bölme standardı).",
      "Olasılıksal: hasar istatistiğine dayalı; SOLAS II-1 esas alır.",
      "Ölçüt: Attained Index A ≥ Required Index R.",
      "A = Σ(p×s); p hasar olasılığı, s hayatta kalma olasılığı.",
    ],
    keyPoints: [
      "SOLAS, kuru yük/yolcu gemilerinde olasılıksal yöntemi kullanır.",
      "A ≥ R sağlanmalıdır.",
      "Onaylı yükleme/hasar durumlarına uyulması zabitin sorumluluğudur.",
    ],
  },

  "drydocking-stability": {
    title: "Havuzlama (Drydocking) Stabilitesi",
    introduction: "Havuzlama sırasında gemi kuru havuz blokları üzerine oturmaya başladığında, blokların uyguladığı yukarı tepki kuvveti geminin etkin stabilitesini azaltır. En kritik an, kıç omurganın bloklara ilk temas ettiği andır.",
    content: `WHAT HAPPENS:

When a ship is taken into a dry dock the water is pumped out; the ship comes down and (usually because of trim) the after end of the keel touches the blocks first. At this point of contact the blocks apply an upward reaction force (P). This force amounts to support acting upwards from a point below the keel line and REDUCES the ship's metacentric height (GM); that is, it behaves as though KG had risen.

THE CRITICAL MOMENT:

The most dangerous moment is the transition just before the ship lands fully, when part of the weight is still carried by buoyancy and part by the blocks. If GM is inadequate at that moment the ship can capsize in the dock or slip off the blocks. Adequate initial GM and a suitable trim must therefore be arranged before docking.

THE FORCE P AND THE LOSS OF GM:

The reaction force P applied by the blocks increases as the water level falls. The virtual rise of KG (and the loss of GM) caused by P is assessed as proportional to P × KM / W. Therefore:
- The ship enters the dock with a small trim by the stern (so that contact is controlled).
- Excessive trim creates a large P at a single point and increases the risk.
- Adequate initial GM is essential.

PRECAUTIONS:

- A suitable trim and adequate GM are arranged before docking by adjusting the loading/ballast.
- Side/bilge blocks and shores come into play as the ship lands.
- Stability is monitored until the whole weight of the ship is on the blocks (fully landed); once fully landed the ship is stable.`,
    formula: {
      name: "Havuzlamada GM Kaybı (yaklaşık)",
      expression: "Loss of GM ≈ (P × KM) / W",
      description: "P: blokların yukarı tepki kuvveti, KM: metasantr yüksekliği, W: deplasman. P arttıkça etkin GM azalır.",
    },
    bulletPoints: [
      "Bloklara temasta yukarı tepki kuvveti (P) etkin GM'yi azaltır.",
      "En kritik an: kıç omurga oturmaya başladığı geçiş anı.",
      "Küçük kıç trimi + yeterli başlangıç GM ile havuzlanır.",
      "Tam oturunca (landed) gemi tekrar stabildir.",
    ],
    keyPoints: [
      "Havuzlama etkin stabiliteyi geçici olarak düşürür.",
      "Aşırı trim tek noktada büyük P → daha çok GM kaybı.",
      "Yan bloklar ve payandalar oturma sırasında destek sağlar.",
    ],
    warnings: [
      "Docking with inadequate GM or excessive trim can cause the ship to slip off the blocks or capsize",
      "Stability must be monitored continuously during the transition",
    ],
  },
};

export default function StabilityTopicsPage() {
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
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="relative z-40 bg-background/95 border-b border-border">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                <Anchor className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Gemi Stabilitesi</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Accordion */}
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-4 max-w-4xl mx-auto pb-20">
            <Accordion type="single" collapsible className="space-y-2">
              {stabilityTopics.map((topic) => {
                return (
                  <AccordionItem
                    key={topic.id}
                    value={topic.id}
                    className="border border-border/40 rounded-xl overflow-hidden bg-card/80"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left">
                        <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
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
                                ? "hover:bg-primary/5 cursor-pointer"
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
                <Lightbulb className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Quick Access</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { title: "Stability Calculations", href: "/stability/calculations" },
                  { title: "Stability Formulas", href: "/stability/formulas" },
                ].map((resource, index) => (
                  <Link
                    key={index}
                    to={resource.href}
                    className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-[background-color,color,border-color,box-shadow,opacity,transform,width] hover:border-primary/40 hover:bg-background"
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
                <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-primary">
                  <p className="text-foreground font-medium leading-relaxed">
                    {currentContent.introduction}
                  </p>
                </div>

                {/* Images/Diagrams */}
                {currentContent.images && currentContent.images.length > 0 && (
                  <div className="space-y-4">
                    {currentContent.images.map((image, index) => (
                      <div key={index} className="rounded-xl overflow-hidden border border-border/40 bg-muted/30">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-48 object-contain bg-muted/30"
                        />
                        {image.caption && (
                          <p className="text-xs text-muted-foreground text-center py-2 px-4">
                            {image.caption}
                          </p>
                        )}
                      </div>
                    ))}
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
                        <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
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
                    <div className="bg-background rounded-lg p-3 font-mono text-lg text-center text-primary mb-2">
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
                        <p className="text-muted-foreground">Çözüm: {example.solution}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Points */}
                {currentContent.keyPoints && currentContent.keyPoints.length > 0 && (
                  <div className="bg-primary/5 rounded-xl p-4">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      Anahtar Bilgiler
                    </h3>
                    <div className="space-y-2">
                      {currentContent.keyPoints.map((point, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <span className="text-primary font-bold">{index + 1}.</span>
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
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
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
