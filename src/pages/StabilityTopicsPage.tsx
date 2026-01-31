import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
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
  Circle,
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
import { ScrollArea } from "@/components/ui/scroll-area";

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
      { id: "weight-w", title: "Ağırlık (W)", hasContent: true },
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
      { id: "righting-moment", title: "Doğrultma momenti", hasContent: true },
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
      { id: "displacement", title: "Deplasman", hasContent: true },
      { id: "draft", title: "Draft", hasContent: true },
      { id: "draft-displacement-relation", title: "Draft–deplasman ilişkisi", hasContent: true },
      { id: "tpc", title: "TPC (Ton Per Centimeter)", hasContent: true },
      { id: "km-values", title: "KM değerleri", hasContent: true },
      { id: "hydrostatic-tables-usage", title: "Hidrostatik tabloların kullanımı", hasContent: true },
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

const AUTO_LESSON_STORAGE_KEY = "stability:auto-lessons-v1";
const AUTO_LESSON_INTERVAL_MS = 20 * 60 * 1000;
const AUTO_LESSON_IDS = ["buoyancy-force", "center-of-buoyancy", "weight-w", "center-of-gravity"];

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
}

const topicContents: Record<string, TopicContent> = {
  "stability-definition": {
    title: "Stabilitenin Tanımı",
    introduction: "Stabilite, bir geminin dış kuvvetler altında dengesini koruma ve denge bozulduğunda eski haline dönme yeteneğidir.",
    content: `Gemi stabilitesi, denizcilik mühendisliğinin en kritik konularından biridir. Bir geminin güvenli seyir yapabilmesi için yeterli stabiliteye sahip olması zorunludur.

Stabilite kavramı temelde şu soruya cevap arar: "Gemi yattığında tekrar dik duruma dönebilir mi?"

Bir cismin stabilitesi, o cismin denge konumundan uzaklaştırıldığında gösterdiği tepkiyle belirlenir. Eğer cisim eski konumuna dönmeye çalışıyorsa stabildir, daha da uzaklaşıyorsa unstabildir.

Gemilerde stabilite, yükleme durumuna, tank doluluk oranlarına, hava koşullarına ve yapılan operasyonlara bağlı olarak sürekli değişir. Bu nedenle her yükleme durumunda stabilite hesabı yapılmalıdır.`,
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
    content: `Bir gemi dengedeyken üzerine iki temel kuvvet etki eder:
1. Ağırlık kuvveti (W) - Aşağı yönlü, ağırlık merkezinden (G) etki eder
2. Kaldırma kuvveti (B) - Yukarı yönlü, kaldırma merkezinden (B) etki eder

Dengede: W = B ve G ile B aynı düşey doğru üzerindedir.

DEVRILME:
Gemi yattığında G noktası sabit kalırken, B noktası yatan tarafa doğru kayar. Bu durum bir moment oluşturur.

DOĞRULTMA:
Eğer oluşan moment gemiyi dik duruma getirmeye çalışıyorsa, bu "doğrultma momenti"dir ve gemi stabildir.
Eğer moment gemiyi daha da yatırmaya çalışıyorsa, gemi unstabildir.`,
    bulletPoints: [
      "Denge: W = B, G ve B aynı düşey doğruda",
      "Yatma: B noktası yatan tarafa kayar",
      "Doğrultma momenti: Gemiyi dik konuma getiren moment",
      "Devrilme momenti: Gemiyi daha fazla yatıran moment",
    ],
    formula: {
      name: "Doğrultma Momenti",
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
    content: `Statik stabilite, geminin belirli bir yatma açısında denge durumunu inceler. Bu analiz, hareketin olmadığı, yani geminin o açıda "donmuş" gibi kabul edildiği bir durum için yapılır.

Statik stabilitede temel soru şudur: "Gemi belirli bir açıda yatmış halde mi kalacak, yoksa dik duruma mı dönecek?"

Statik stabilite analizi, GZ (doğrultma kolu) eğrisi üzerinden yapılır. Bu eğri, farklı yatma açılarında geminin ne kadar doğrultma momenti ürettiğini gösterir.

Pozitif GZ değeri, geminin o açıda dik duruma dönme eğiliminde olduğunu gösterir.
Negatif GZ değeri, geminin daha fazla yatma eğiliminde olduğunu gösterir.`,
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
    content: `Dinamik stabilite, gerçek deniz koşullarında geminin davranışını inceler. Statik stabiliteden farklı olarak, burada geminin hareketi ve enerji dengesi göz önünde bulundurulur.

Dalga, rüzgâr ve manevra gibi dış kuvvetler gemiye enerji aktarır. Bu enerji, geminin yatma hareketine dönüşür. Gemi, bu enerjiyi absorbe edebilmeli ve devrilmeden dengesini korumalıdır.

Dinamik stabilite, GZ eğrisinin altındaki alanla ölçülür. Bu alan, geminin belirli bir açıya kadar absorbe edebileceği enerji miktarını temsil eder.

Büyük alan = Daha fazla enerji absorbe kapasitesi = Daha iyi dinamik stabilite`,
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
    content: `İlk stabilite, geminin dik konumdan çok az yattığı (genellikle 10°'ye kadar) durumlardaki stabilitesidir. Bu aralıkta metasantr (M) noktası sabit kabul edilir.

İlk stabilitenin ölçüsü, metasantrik yükseklik GM'dir:
GM = KM - KG

Burada:
- KM: Omurgadan metasantra uzaklık (hidrostatik tablolardan)
- KG: Omurgadan ağırlık merkezine uzaklık (yükleme hesabından)

Büyük GM = Sert gemi, hızlı salınım
Küçük GM = Yumuşak gemi, yavaş salınım
Negatif GM = Unstabil gemi, tehlike!`,
    bulletPoints: [
      "İlk stabilite küçük açılar (0-10°) için geçerlidir",
      "GM değeri ilk stabilitenin ölçüsüdür",
      "GM = KM - KG formülü ile hesaplanır",
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
      "GM negatif ise gemi dik duramaz, 'loll' açısında kalır",
      "Minimum GM değeri gemi tipine göre IMO tarafından belirlenir",
    ],
  },
  "metacenter-m": {
    title: "Metasantr (M) kavramı",
    introduction: "Metasantr, gemi küçük açılarla yattığında kaldırma merkezinin izlediği eğrinin dikey eksenle kesiştiği noktadır ve ilk stabilitenin geometrik temelidir.",
    content: `Metasantr (M), gemi çok küçük bir yatma açısına geçtiğinde kaldırma merkezinin (B) yeni konumundan çizilen düşey doğrultunun, gemi merkez hattı ile kesiştiği noktadır. Bu nokta, küçük açılar için doğrultma momentinin oluşup oluşmadığını belirler.

Metasantr konumu, su hattı atalet momenti ve batık hacme bağlı olarak hesaplanan BM mesafesi ile belirlenir. BM, B ile M arasındaki düşey mesafedir ve geminin su hattı şekline hassastır.

Görsel: Enine kesitte gemi, ilk konumda B noktası ve küçük yatma açısında B noktasının kayışı; bu iki B noktasından çizilen düşey doğruların kesişimi M olarak işaretlenir.`,
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
        problem: "I = 3.200 m⁴, ∇ = 6.400 m³ ve KB = 3.2 m ise BM ve KM kaç metredir?",
        solution: "1) BM = I / ∇ = 3.200 / 6.400 = 0.5 m. 2) KM = KB + BM = 3.2 + 0.5 = 3.7 m. Sonuç: Metasantr omurgadan 3.7 m yüksekliktedir.",
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
    content: `GM, geminin küçük yatma açılarında ne kadar hızlı doğrultma momenti üreteceğini gösterir. GM pozitif ise gemi dik duruma dönme eğilimindedir, GM negatif ise gemi dengesizdir.

GM değeri, hidrostatik tablolardan alınan KM ile yükleme hesabından çıkan KG farkıdır. GM büyüdükçe gemi sertleşir ve salınım periyodu kısalır.

Görsel: Omurga üzerinde KB, G ve M noktalarının aynı düşey hat üzerinde gösterildiği şema; GM aralığı vurgulanır.`,
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
        problem: "KM = 7.2 m ve KG = 6.6 m ise GM kaç metredir?",
        solution: "1) GM = KM - KG. 2) GM = 7.2 - 6.6 = 0.6 m. Sonuç: GM pozitif olduğundan gemi küçük açılarda stabildir.",
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
    content: `KB, omurgadan kaldırma merkezine olan mesafedir ve batık şekle bağlıdır. BM, su hattı atalet momenti ile batık hacmin oranıdır. KG ise ağırlık merkezinin omurgadan yüksekliğidir.

Bu üç büyüklük bir araya geldiğinde önce KM hesaplanır, ardından GM bulunur. Bu zincir, stabilite hesabında kullanılan en temel geometrik bağlantıdır.

Görsel: Geminin enine kesitinde omurga, KB, BM ve KG noktaları; KM ve GM aralıkları ölçü çizgileriyle gösterilir.`,
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
        problem: "KB = 4.0 m, BM = 1.2 m ve KG = 4.6 m ise KM ve GM kaç metredir?",
        solution: "1) KM = KB + BM = 4.0 + 1.2 = 5.2 m. 2) GM = KM - KG = 5.2 - 4.6 = 0.6 m. Sonuç: GM pozitif, ilk stabilite yeterlidir.",
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
    content: `GM pozitif olduğunda, gemi küçük bir açıyla yattığında doğrultma kolu GZ oluşur ve gemi dik duruma dönme eğilimi gösterir. Bu durumda doğrultma momenti pozitif yöndedir.

Küçük açılar için GZ, GM ile açının sinüsü çarpımına eşit kabul edilir. Bu basit ilişki, ilk stabilite hesaplarında kullanılır.

Görsel: G noktası M noktasının altında, gemi küçük açıyla yatmış, GZ kolu ve doğrultma momenti okları gösterilir.`,
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
        problem: "GM = 0.8 m, θ = 10° ve Δ = 5.000 ton ise GZ ve RM kaçtır?",
        solution: "1) sin 10° ≈ 0.174. 2) GZ ≈ 0.8 × 0.174 = 0.139 m. 3) RM = Δ × GZ = 5.000 × 0.139 = 695 t m. Sonuç: Doğrultma momenti pozitif ve gemi dik duruma dönme eğilimindedir.",
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
    content: `GM negatif olduğunda, gemi küçük açıyla yattığında doğrultma kolu GZ negatif olur. Bu durumda moment gemiyi daha da yatırır ve gemi dengesiz davranır.

Negatif GM, geminin belirli bir loll açısına yatmasına yol açabilir. Bu durum operasyonel olarak tehlikelidir ve yükleme derhal düzeltilmelidir.

Görsel: G noktası M noktasının üzerinde, gemi küçük açıyla yatmış, GZ kolu ve moment okları devrilme yönünde gösterilir.`,
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
        problem: "GM = -0.3 m, θ = 8° ve Δ = 5.000 ton ise GZ ve RM kaçtır?",
        solution: "1) sin 8° ≈ 0.139. 2) GZ ≈ -0.3 × 0.139 = -0.042 m. 3) RM = 5.000 × -0.042 = -210 t m. Sonuç: Negatif moment gemiyi daha fazla yatırır.",
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
    content: `GM büyüdükçe geminin doğrultma momenti artar ve yalpa periyodu kısalır. Bu durum gemiyi sert hale getirir, yükler üzerinde dinamik kuvvetler artar.

GM küçüldükçe yalpa periyodu uzar, gemi yavaş salınır ve yolcu konforu artabilir; ancak stabilite marjı azalır. Bu nedenle GM değeri emniyet ve konfor arasında dikkatle değerlendirilir.

Görsel: Farklı GM değerleri için yalpa periyodu eğrisi ve gemi salınım genliği karşılaştırması.`,
    bulletPoints: [
      "Büyük GM = Kısa periyot, sert hareket",
      "Küçük GM = Uzun periyot, yumuşak hareket",
      "Konfor ve güvenlik arasında denge gerekir",
    ],
    formula: {
      name: "Yalpa Periyodu",
      expression: "T = 2π × √(k² / (g × GM))",
      description: "T: Yalpa periyodu (s), k: Atalet yarıçapı (m), g: Yer çekimi ivmesi (9.81 m s²), GM: Metasantrik yükseklik (m)",
    },
    examples: [
      {
        problem: "k = 4.5 m ve GM = 0.6 m için yalpa periyodu kaç saniyedir?",
        solution: "1) k² = 4.5 × 4.5 = 20.25. 2) g × GM = 9.81 × 0.6 = 5.886. 3) 20.25 / 5.886 = 3.44. 4) √3.44 = 1.855. 5) T = 2π × 1.855 = 11.65 s. Sonuç: Yalpa periyodu yaklaşık 11.6 saniyedir.",
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
    content: `Denizcilik tarihinde birçok trajik kaza, yetersiz stabiliteden kaynaklanmıştır. Bu kazalar, stabilite kurallarının sürekli güncellenmesine ve sıkılaştırılmasına neden olmuştur.

Stabilite ve emniyet ilişkisi:
1. Mürettebat güvenliği: Geminin devrilmesi can kaybına yol açar
2. Yolcu güvenliği: Yolcu gemilerinde binlerce kişi risk altındadır
3. Çevre güvenliği: Yakıt ve yük denize sızabilir
4. Ekonomik güvenlik: Gemi ve yük kaybı büyük maddi zarara neden olur

ISM (International Safety Management) Kodu, stabilite yönetimini zorunlu kılmaktadır. Kaptan, her yükleme durumunda stabilitenin yeterli olduğunu doğrulamalıdır.`,
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
      "Yetersiz stabilite geminin batmasına neden olabilir",
      "Stabilite kitapçığı limitlerine uyulmalıdır",
    ],
  },
  // Diğer konular için içerikler...
  "weight-w": {
    title: "Ağırlık (W)",
    introduction: "Geminin toplam ağırlığı, deplasman olarak adlandırılır ve geminin yüzmesi için gereken kaldırma kuvvetini belirler.",
    content: `Geminin ağırlığı (W veya Δ), geminin tüm bileşenlerinin toplam ağırlığıdır:

W = Hafif gemi ağırlığı + Yük + Yakıt + Tatlı su + Kumanya + Personel + ...

Bu toplam ağırlık, ton (t) cinsinden ifade edilir ve "deplasman" olarak adlandırılır.

Arşimet prensibine göre, yüzen bir cisim kendi ağırlığı kadar su kaldırır. Dolayısıyla:
Deplasman = Yer değiştirilen suyun ağırlığı

Deplasman, stabilite hesaplarının temelini oluşturur. Doğrultma momenti, deplasman ile GZ'nin çarpımıdır.`,
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
        problem: "Lightship = 3.500 t, kargo = 1.200 t, yakıt = 300 t, tatlı su = 50 t ise deplasman kaç tondur?",
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
    content: `Ağırlık merkezi G, gemideki tüm ağırlıkların momentler yöntemiyle hesaplanan bileşke noktasıdır.

G noktasının konumu üç boyutta tanımlanır:
- KG: Omurgadan G'ye dikey mesafe (en kritik)
- LCG: Boyuna ağırlık merkezi (trim için önemli)
- TCG: Enine ağırlık merkezi (list için önemli)

KG değeri, stabilitenin temel belirleyicisidir:
- KG yükselirse → GM azalır → Stabilite zayıflar
- KG düşerse → GM artar → Stabilite güçlenir

Her yük hareketi G noktasının konumunu değiştirir.`,
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
        problem: "100 t yük KG=6 m ve 200 t yük KG=3 m ise toplam KG kaç metredir?",
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
    content: `Kaldırma kuvveti (Y), geminin suya batmış hacminin yer değiştirdiği suyun ağırlığına eşittir. Bu kuvvet, kaldırma merkezinden (B) yukarı doğru etkir ve geminin ağırlık kuvvetini dengeleyerek yüzmesini sağlar.

Kaldırma kuvveti, suyun yoğunluğuna bağlıdır. Bu nedenle gemi tatlı suda daha fazla batar, deniz suyunda ise daha yüksek yüzer.

Stabilite hesaplarında kaldırma kuvveti, geminin deplasmanına eşit kabul edilir:
Y = W = Δ`,
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
        problem: "∇ = 3.000 m³, ρ = 1.025 t/m³ olan bir gemide kaldırma kuvveti kaç kN olur?",
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
    content: `Kaldırma merkezi (B), geminin su altında kalan hacminin geometrik merkezidir. Bu nokta, gemi yattığında su altı hacminin şekli değiştiği için yer değiştirir.

Gemi yatmaya başladığında B noktası yatılan tarafa kayar. Bu kayma, ağırlık merkezine göre bir moment kolu oluşturur ve doğrultma momenti meydana gelir.

Basit şekilli prizmalar için B noktası, batmış hacmin merkezindedir ve simetrik durumda omurgadan T/2 kadar yukarıdadır.`,
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
        problem: "Dikdörtgen kesitli bir gemide draft T = 4 m ise KB yaklaşık kaç metredir?",
        solution: "Dikdörtgen kesitte KB ≈ T/2 = 2.0 m",
      },
    ],
    keyPoints: [
      "KB değeri hidrostatik tablolardan alınır",
      "B'nin hareketi GZ kolunu oluşturur",
      "Şekil değiştikçe B'nin konumu değişir",
    ],
  },
  // Daha fazla içerik eklenebilir...
};

interface AutoLessonState {
  startAt: number;
  publishedCount: number;
}

const getDefaultAutoLessonState = (): AutoLessonState => ({
  startAt: Date.now(),
  publishedCount: 0,
});

const parseStoredAutoLessonState = (): AutoLessonState => {
  if (typeof window === "undefined") {
    return getDefaultAutoLessonState();
  }

  const raw = window.localStorage.getItem(AUTO_LESSON_STORAGE_KEY);
  if (!raw) {
    const freshState = getDefaultAutoLessonState();
    window.localStorage.setItem(AUTO_LESSON_STORAGE_KEY, JSON.stringify(freshState));
    return freshState;
  }

  try {
    const parsed = JSON.parse(raw) as AutoLessonState;
    if (!parsed || typeof parsed.startAt !== "number" || typeof parsed.publishedCount !== "number") {
      throw new Error("Invalid auto lesson state");
    }
    return parsed;
  } catch {
    const freshState = getDefaultAutoLessonState();
    window.localStorage.setItem(AUTO_LESSON_STORAGE_KEY, JSON.stringify(freshState));
    return freshState;
  }
};

const clampAutoLessonState = (state: AutoLessonState): AutoLessonState => ({
  startAt: state.startAt,
  publishedCount: Math.min(Math.max(state.publishedCount, 0), AUTO_LESSON_IDS.length),
});

const updateAutoLessonStorage = (state: AutoLessonState) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(AUTO_LESSON_STORAGE_KEY, JSON.stringify(state));
};

const syncAutoLessonState = (state: AutoLessonState) => {
  const now = Date.now();
  const elapsed = Math.max(now - state.startAt, 0);
  const availableCount = Math.min(AUTO_LESSON_IDS.length, Math.floor(elapsed / AUTO_LESSON_INTERVAL_MS));
  const nextState = clampAutoLessonState({
    ...state,
    publishedCount: Math.max(state.publishedCount, availableCount),
  });
  updateAutoLessonStorage(nextState);
  return nextState;
};

const formatRemainingTime = (remainingMs: number) => {
  const totalSeconds = Math.max(Math.ceil(remainingMs / 1000), 0);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes > 0) {
    return `${minutes} dk ${seconds} sn`;
  }
  return `${seconds} sn`;
};

export default function StabilityTopicsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [autoLessonState, setAutoLessonState] = useState<AutoLessonState>(() =>
    syncAutoLessonState(parseStoredAutoLessonState())
  );
  const [remainingTime, setRemainingTime] = useState<string | null>(null);

  const refreshAutoLessons = useCallback(() => {
    setAutoLessonState((previous) => syncAutoLessonState(previous));
  }, []);

  useEffect(() => {
    refreshAutoLessons();
  }, [refreshAutoLessons]);

  useEffect(() => {
    if (AUTO_LESSON_IDS.length === 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      refreshAutoLessons();
    }, 60 * 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [refreshAutoLessons]);

  useEffect(() => {
    if (autoLessonState.publishedCount >= AUTO_LESSON_IDS.length) {
      setRemainingTime(null);
      return;
    }

    const nextReleaseAt =
      autoLessonState.startAt + (autoLessonState.publishedCount + 1) * AUTO_LESSON_INTERVAL_MS;
    const updateRemaining = () => {
      const nextRemaining = Math.max(nextReleaseAt - Date.now(), 0);
      setRemainingTime(formatRemainingTime(nextRemaining));
    };

    updateRemaining();
    const timerId = window.setInterval(updateRemaining, 1000);
    const timeoutId = window.setTimeout(() => {
      refreshAutoLessons();
    }, Math.max(nextReleaseAt - Date.now(), 0));

    return () => {
      window.clearInterval(timerId);
      window.clearTimeout(timeoutId);
    };
  }, [autoLessonState, refreshAutoLessons]);

  const handleSubtopicClick = (subtopicId: string, hasContent: boolean) => {
    if (hasContent) {
      setSelectedTopic(subtopicId);
    }
  };

  const closeModal = () => {
    setSelectedTopic(null);
  };

  const currentContent = selectedTopic ? topicContents[selectedTopic] : null;
  const publishedAutoLessonIds = useMemo(
    () => AUTO_LESSON_IDS.slice(0, autoLessonState.publishedCount),
    [autoLessonState.publishedCount]
  );
  const publishedAutoLessons = useMemo(
    () => publishedAutoLessonIds.map((id) => topicContents[id]).filter(Boolean),
    [publishedAutoLessonIds]
  );
  const nextAutoLessonId = AUTO_LESSON_IDS[autoLessonState.publishedCount];
  const nextAutoLesson = nextAutoLessonId ? topicContents[nextAutoLessonId] : null;

  const highRefreshRateStyles: CSSProperties = {
    ["--frame-rate" as string]: "120",
    ["--animation-duration" as string]: "8.33ms",
    ["--transition-duration" as string]: "16.67ms",
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]"
      data-no-translate
      style={highRefreshRateStyles}
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                <Anchor className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Gemi Stabilitesi</h1>
                <p className="text-sm text-muted-foreground">14 Ana Konu • Kapsamlı Müfredat</p>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Accordion */}
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-4 max-w-4xl mx-auto pb-20">
            {/* Auto Lesson */}
            {(publishedAutoLessons.length > 0 || nextAutoLesson) && (
              <section className="rounded-2xl border border-border/40 bg-card/80 p-6 backdrop-blur">
                <div className="mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Otomatik Konu Anlatımı</h2>
                    <p className="text-xs text-muted-foreground">
                      20 dakikada bir yeni alt başlık uygulamaya eklenir.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {publishedAutoLessons.length === 0 && nextAutoLesson && (
                    <div className="rounded-xl border border-dashed border-border/60 bg-background/40 p-4 text-sm text-muted-foreground">
                      İlk konu anlatımı {remainingTime ? `${remainingTime} sonra` : "20 dakika sonra"} eklenecek.
                    </div>
                  )}

                  {publishedAutoLessons.map((lesson, index) => (
                    <div key={`${lesson.title}-${index}`} className="space-y-3">
                      <div className="rounded-xl border border-border/40 bg-background/60 p-4">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h3 className="text-base font-semibold text-foreground">
                            {lesson.title}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {index + 1}. otomatik içerik
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {lesson.introduction}
                        </p>
                        <div className="text-sm text-foreground whitespace-pre-line">
                          {lesson.content}
                        </div>
                      </div>

                      {lesson.formula && (
                        <div className="rounded-xl border border-accent/20 bg-accent/10 p-4">
                          <h4 className="text-sm font-semibold text-foreground mb-2">Formül</h4>
                          <div className="bg-background rounded-lg p-3 font-mono text-center text-primary">
                            {lesson.formula.expression}
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">
                            {lesson.formula.description}
                          </p>
                        </div>
                      )}

                      {lesson.examples && lesson.examples.length > 0 && (
                        <div className="rounded-xl border border-border/40 bg-muted/40 p-4 space-y-3">
                          <h4 className="text-sm font-semibold text-foreground">Sayısal Örnek</h4>
                          {lesson.examples.map((example, exampleIndex) => (
                            <div key={exampleIndex} className="text-sm text-foreground">
                              <p className="font-medium">Soru: {example.problem}</p>
                              <p className="text-muted-foreground">Çözüm: {example.solution}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {nextAutoLesson && publishedAutoLessons.length > 0 && (
                    <div className="rounded-xl border border-dashed border-border/60 bg-background/40 p-4 text-sm text-muted-foreground">
                      Sıradaki konu anlatımı {remainingTime ? `${remainingTime} sonra` : "20 dakika sonra"} eklenecek.
                    </div>
                  )}
                </div>
              </section>
            )}

            <Accordion type="single" collapsible className="space-y-2">
              {stabilityTopics.map((topic) => {
                const TopicIcon = topic.icon;
                return (
                  <AccordionItem
                    key={topic.id}
                    value={topic.id}
                    className="border border-border/40 rounded-xl overflow-hidden bg-card/80 backdrop-blur"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left">
                        <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                          {topic.number}
                        </span>
                        <div className="flex items-center gap-2">
                          <TopicIcon className="h-4 w-4 text-primary" />
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
                                ? "hover:bg-primary/5 cursor-pointer"
                                : "opacity-50 cursor-not-allowed"
                            }`}
                            whileTap={subtopic.hasContent && topicContents[subtopic.id] ? { scale: 0.98 } : {}}
                          >
                            {subtopic.hasContent && topicContents[subtopic.id] ? (
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
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
                <Lightbulb className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Hızlı Erişim</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { title: "Stabilite Hesaplamaları", href: "/stability/calculations" },
                  { title: "Stabilite Formülleri", href: "/stability/formulas" },
                  { title: "IMO Kuralları", href: "/stability/rules" }
                ].map((resource, index) => (
                  <Link
                    key={index}
                    to={resource.href}
                    className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-all hover:border-primary/40 hover:bg-background"
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

            {/* Back to Lessons */}
            <div className="flex justify-center pt-2">
              <Link
                to="/lessons"
                className="inline-flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-xs text-muted-foreground backdrop-blur transition-colors hover:bg-card hover:text-foreground"
              >
                <BookOpen className="h-4 w-4" />
                Tüm Derslere Dön
              </Link>
            </div>
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
                <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-primary">
                  <p className="text-foreground font-medium leading-relaxed">
                    {currentContent.introduction}
                  </p>
                </div>

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
                      Uyarılar
                    </h3>
                    <div className="space-y-2">
                      {currentContent.warnings.map((warning, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <span className="text-destructive">⚠️</span>
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
