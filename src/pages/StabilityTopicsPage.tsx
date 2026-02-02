import type { CSSProperties } from "react";
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
  "weight-addition": {
    title: "Ağırlık eklenmesi",
    introduction: "Gemiye yeni bir ağırlık eklendiğinde toplam deplasman artar ve ağırlık merkezi eklenen yükün konumuna doğru kayar.",
    content: `Ağırlık ekleme; kargo yükleme, yakıt/ballast alma, ekipman montajı gibi işlemleri kapsar. Eklenen yük, toplam ağırlığı artırdığı için geminin draftı büyür ve KG, LCG, TCG değerleri değişir.

Yeni ağırlık merkezinin hesabı momentler yöntemi ile yapılır. Eklenen yükün dikey (kg), enine (tcg) ve boyuna (lcg) konumları ayrı ayrı değerlendirilir. Bu işlem, her yükleme adımında stabilite kitabı sınırları içinde kalmak için zorunludur.

Görsel: Geminin üzerinde eklenen yük, G noktasının yük yönüne kaydığı vektörle ve moment kolu ile gösterilir.`,
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
        problem: "Δ = 5.000 t, KG₀ = 6.2 m ve w = 200 t yük kg = 9.0 m seviyesine eklendi. Yeni KG kaç m?",
        solution: "KG₁ = (5.000×6.2 + 200×9.0) / 5.200 = (31.000 + 1.800) / 5.200 = 6.31 m. Sonuç: KG yükselir, GM azalır.",
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
    content: `Ağırlık çıkarma; kargo boşaltma, yakıt tüketimi veya balast verme gibi işlemlerle oluşur. Bu durumda gemi hafifler, draft azalır ve G noktası çıkarılan yükün konumuna ters yönde hareket eder.

Çıkarılan yükün konumu yüksek ise KG azalır ve stabilite artabilir; aşağıdan ağırlık çıkarılırsa KG yükselir ve stabilite azalır. Bu nedenle tüketim ve boşaltma planı, stabilite açısından dikkatle izlenmelidir.

Görsel: Yük çıkarma sonrası G noktasının ters yöne kayması ve moment kolu gösterilir.`,
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
        problem: "Δ = 4.800 t, KG₀ = 5.9 m, w = 150 t ve kg = 10 m yük çıkarılıyor. Yeni KG kaç m?",
        solution: "KG₁ = (4.800×5.9 - 150×10) / 4.650 = (28.320 - 1.500) / 4.650 = 5.77 m. Sonuç: KG azalır, stabilite artar.",
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
    content: `Ağırlık kaydırma; gemi içinde bir yükün başka bir konuma taşınmasıdır. Bu işlemde toplam deplasman değişmez, ancak G noktası taşınan yükün yönüne doğru kayar.

Enine kaydırma list (yana yatma), boyuna kaydırma trim değişimine neden olur. Dikey kaydırma ise GM’yi doğrudan etkiler. Bu yüzden vinç operasyonları, konteyner yer değişimleri ve balast transferleri sırasında ağırlık kaydırma etkisi mutlaka hesaplanır.

Görsel: Yükün yeni konumuna taşınması, G noktasının kayma vektörü ve oluşan moment kolu gösterilir.`,
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
        problem: "Δ = 6.000 t, w = 120 t yük 6 m enine kaydırılıyor. G kaç metre kayar?",
        solution: "GG₁ = (120×6) / 6.000 = 0.12 m. Sonuç: G, 12 cm kayar ve list oluşur.",
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
    content: `Dikey ağırlık hareketlerinde yük yukarı taşınırsa KG artar, aşağı taşınırsa KG azalır. Bu işlem deplasmanı değiştirmez ancak GM üzerinde güçlü etki yaratır.

Vinçle yük kaldırma, güverteye ekipman yerleştirme veya balastın alt tanklara transferi gibi işlemler dikey ağırlık hareketidir. Özellikle yükün askıda olduğu durumlarda, ağırlık merkezinin etkin konumu askı noktasına taşınmış kabul edilir.

Görsel: Yükün yukarı/aşağı taşınması ve KG’nin yeni konumu ile GM değişimi gösterilir.`,
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
        problem: "Δ = 7.200 t, w = 80 t yük 4 m yukarı taşınıyor. KG ne kadar artar?",
        solution: "ΔKG = (80×4) / 7.200 = 0.044 m. Sonuç: KG yaklaşık 4.4 cm artar ve GM azalır.",
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
    content: `Enine taşıma, bir yükün iskeleden sancağa veya sancaktan iskeleye kaydırılmasıdır. Bu işlemde G noktası yatılan tarafa doğru kayar ve gemi denge açısına gelir.

Küçük açılar için list hesabı, doğrultma momenti ile yatma momentinin dengelenmesi prensibine dayanır. Enine kaydırma, liman operasyonlarında sık gerçekleştiği için yükleme planlarında mutlaka hesaplanır.

Görsel: Yükün enine taşınması, TCG kayması ve oluşan list açısı gösterilir.`,
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
        problem: "Δ = 5.500 t, GM = 0.9 m, w = 60 t yük 5 m enine kaydırılıyor. List açısı yaklaşık kaç derece?",
        solution: "tan θ = (60×5) / (5.500×0.9) = 300 / 4.950 = 0.0606. θ ≈ 3.47°. Sonuç: Yaklaşık 3.5° list oluşur.",
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
    content: `Boyuna taşınan yükler, geminin baş-kıç dengesini değiştirir. Bu değişim LCG kayması ile ifade edilir ve trim oluşmasına neden olur.

Trim hesabında temel büyüklük MCT (Moment to Change Trim) değeridir. Boyuna kaydırma momenti (w × d) ile MCT karşılaştırılarak trim değişimi bulunur. Bu analiz, yükleme planı ve seyre hazırlık açısından kritiktir.

Görsel: Yükün başa/kıça kaydırılması, LCG kayması ve oluşan trim yönü gösterilir.`,
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
        problem: "w = 200 t yük 12 m başa kaydırılıyor. MCT = 400 t·m/cm ise trim değişimi kaç cm olur?",
        solution: "Trim = (200×12) / 400 = 2.400 / 400 = 6 cm. Sonuç: Baş trim yaklaşık 6 cm artar.",
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
  "gz-righting-lever": {
    title: "Doğrultma Kolu (GZ)",
    introduction: "GZ, gemi yattığında ağırlık kuvveti ile kaldırma kuvveti arasındaki yatay mesafeyi ifade eder ve doğrultma momentinin temelidir.",
    content: `GZ (righting lever), gemi belirli bir açıyla yattığında ağırlık merkezi (G) ile kaldırma kuvvetinin etki doğrultusu arasındaki yatay uzaklıktır. Bu kol, doğrultma momentini üretir ve geminin dik konuma dönme eğilimini gösterir.

Küçük açılarda GZ yaklaşık olarak GM × sinθ kabul edilir. Bu ilişki, ilk stabilite değerlendirmelerinde hızlı bir kontrol sağlar. GZ pozitif olduğunda doğrultma momenti gemiyi düzeltir; GZ negatif olduğunda gemi daha fazla yatma eğilimindedir.`,
    bulletPoints: [
      "GZ doğrultma momentinin koludur",
      "Pozitif GZ: gemi dikleşme eğiliminde",
      "Negatif GZ: devrilme eğilimi",
      "Küçük açılarda GZ ≈ GM × sinθ",
    ],
    formula: {
      name: "Doğrultma Momenti",
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
    content: `GZ eğrisi, geminin çeşitli yatma açıları (genellikle 0°–90° ve gerekirse daha fazla) için GZ değerlerinin hesaplanmasıyla elde edilir. Bu hesaplar, geminin belirli bir yükleme durumundaki geometrisine ve hidrostatik özelliklerine dayanır.

Klasik yöntem şu adımları içerir:
1) Seçilen yatma açısı için su hattı ve batık hacim hesaplanır.
2) Kaldırma merkezinin (B) yeni konumu bulunur.
3) G ve B arasındaki yatay mesafe (GZ) belirlenir.
4) Tüm açılar için tekrar edilerek eğri oluşturulur.

Modern uygulamalarda bu süreç stabilite yazılımlarıyla otomatik yapılır; ancak sonuçların stabilite kitapçığı ve hidrostatik tablolarla tutarlı olması şarttır.`,
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
    content: `GZ eğrisi belirli bir açıya kadar artar, ardından azalarak sıfıra yaklaşır. Eğrinin tepe noktası, geminin en yüksek doğrultma kapasitesini gösterir.

IMO 2008 IS Code gibi kriterler, maksimum GZ değerinin ve oluştuğu açının belirli minimumları sağlamasını ister. Örneğin genel kargo gemileri için GZ_max ≥ 0.20 m ve bu maksimumun en az 25°–30° civarında oluşması beklenir (gemi tipine göre değişir).

Maksimum GZ'nin çok düşük veya küçük açıda oluşması, yetersiz stabilite göstergesi olabilir.`,
    bulletPoints: [
      "Maksimum GZ stabilite kapasitesinin tepe noktasıdır",
      "Aşırı küçük açıdaki maksimum GZ risklidir",
      "Gemi tipine göre minimum GZ_max kriterleri vardır",
    ],
    keyPoints: [
      "GZ_max, GM'den bağımsız olarak büyük açılı davranışı temsil eder",
      "Üst ağırlıkların artması GZ_max'ı düşürür",
      "GZ_max değeri yükleme planı ile kontrol edilir",
    ],
    warnings: [
      "GZ_max kriteri sağlanmazsa sefer emniyeti risk altındadır",
      "Güverte yükleri ve serbest yüzey etkisi GZ_max'ı hızlı düşürebilir",
    ],
  },
  "stability-area": {
    title: "Stabilite Alanı",
    introduction: "Stabilite alanı, GZ eğrisi altında kalan alanı ifade eder ve geminin dinamik stabilite enerji kapasitesini gösterir.",
    content: `GZ eğrisinin belirli bir açı aralığında altında kalan alan, geminin dış kuvvetlere karşı enerji sönümleme kapasitesini temsil eder. Bu alan ne kadar büyükse gemi dalga ve rüzgâr etkilerini o kadar iyi karşılar.

IMO kriterleri, farklı açı aralıkları için minimum alan değerleri tanımlar (ör. 0°–30°, 0°–40° ve 30°–40°). Bu değerler gemi tipine göre değişebilir.

Alan hesabı pratikte sayısal integrasyon veya stabilite yazılımı ile yapılır.`,
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
    introduction: "Devrilme açısı, GZ eğrisinin tekrar sıfıra düştüğü ve geminin doğrultma momenti üretmeyi bıraktığı açıdır.",
    content: `GZ eğrisi, belirli bir açıdan sonra azalır ve bir noktada sıfıra ulaşır. Bu açı, geminin doğrultma yeteneğinin sona erdiği sınırdır ve vanishing stability angle olarak adlandırılır.

Bu açıdan sonra GZ negatif olur ve gemi devrilme eğilimine girer. Devrilme açısı, geminin güvenli stabilite aralığını tanımlar ve yükleme durumuna göre değişir.`,
    bulletPoints: [
      "GZ = 0 olduğu açı güvenli stabilite sınırıdır",
      "Bu açıdan sonra devrilme riski hızla artar",
      "Yükleme ve KG değişimleri devrilme açısını etkiler",
    ],
    keyPoints: [
      "Devrilme açısı ne kadar büyükse o kadar güvenlidir",
      "Freeboard ve downflooding açıklıkları bu açıyı sınırlayabilir",
      "Hasarlı stabilitede devrilme açısı daha küçüktür",
    ],
    warnings: [
      "Açıklıkların suya girmesi devrilme açısını pratikte düşürür",
      "Downflooding açısı, GZ eğrisinden önce sınır olabilir",
    ],
  },
  "gz-curve-interpretation": {
    title: "GZ Eğrisinin Yorumu",
    introduction: "GZ eğrisi, geminin farklı yatma açılarına karşı stabilite davranışını görsel olarak ortaya koyar.",
    content: `GZ eğrisi üzerinde aşağıdaki noktalar birlikte değerlendirilir:
- Eğrinin başlangıç eğimi (GM ile ilişkili)
- Maksimum GZ değeri ve oluştuğu açı
- Pozitif GZ aralığı (stabilite aralığı)
- Alan büyüklükleri (dinamik stabilite)

Yükleme değiştiğinde eğri de değişir. Üst yüklerin artması eğriyi aşağı çeker; serbest yüzey etkisi başlangıç eğimini düşürür; genişlik artışı veya düşük KG eğriyi yukarı taşır.`,
    bulletPoints: [
      "Eğrinin başlangıcı GM'yi yansıtır",
      "Tepe noktası maksimum doğrultma kapasitesidir",
      "Eğrinin sıfıra indiği açı güvenli sınırdır",
      "Alanlar dinamik stabiliteyi temsil eder",
    ],
    keyPoints: [
      "Tek bir değer yerine eğrinin tüm şekli okunmalıdır",
      "Yükleme senaryoları arasında kıyaslama yapılmalıdır",
      "GZ eğrisi, operasyonel limitlerin temel dayanağıdır",
    ],
  },
  // =====================================================
  // BÖLÜM 2 - EKSİK İÇERİKLER
  // =====================================================
  "floatation-condition": {
    title: "Yüzerlik Şartı",
    introduction: "Bir cismin su üzerinde kalabilmesi için toplam ağırlığının, batık hacminin yer değiştirdiği suyun ağırlığına eşit veya küçük olması gerekir.",
    content: `Arşimet prensibine göre bir cisim, yer değiştirdiği sıvının ağırlığı kadar kaldırma kuvveti alır. Yüzerlik şartı bu prensipten türetilir.

Yüzerlik şartı:
W ≤ ρ × g × ∇_max

Burada ∇_max, cismin tamamen batması durumundaki hacmidir. W bu değerin üzerindeyse cisim batar.

Gemilerde yüzerlik şartı her zaman sağlanmalıdır. Gemi hafif haldeyken bile yeterli batık hacme sahiptir. Yükleme arttıkça draft yükselir ve batık hacim artar. Ancak fribord sınırı aşılırsa tehlike oluşur.

Yüzerlik durumu statik denge için gerekli ama yeterli değildir. Yüzen bir cisim stabil olmayabilir.`,
    bulletPoints: [
      "W = ρ × ∇ denklemi denge koşulunu tanımlar",
      "Batık hacim ≤ toplam hacim olmalıdır",
      "Fribord yüzerliğin görsel göstergesidir",
      "Yüzmek için stabilite ayrıca sağlanmalıdır",
    ],
    formula: {
      name: "Yüzerlik Denklemi",
      expression: "W = ρ × g × ∇; veya Δ = ρ × ∇",
      description: "W: Ağırlık (kN), ρ: Suyun yoğunluğu (t/m³), ∇: Batık hacim (m³), Δ: Deplasman (ton)",
    },
    examples: [
      {
        problem: "Bir geminin batık hacmi ∇ = 4.800 m³ ve deniz suyu yoğunluğu ρ = 1.025 t/m³ ise maksimum deplasman kaç tondur?",
        solution: "Δ = ρ × ∇ = 1.025 × 4.800 = 4.920 ton. Sonuç: Gemi 4.920 tona kadar yüklenebilir.",
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
    content: `Denge halleri, cisim denge konumundan uzaklaştırıldığında gösterdiği tepkiye göre sınıflandırılır.

KARARLI DENGE (Stable Equilibrium):
Cisim denge konumundan uzaklaştırıldığında geri dönme eğilimi gösterir. Gemilerde pozitif GM bu durumu sağlar. G noktası M noktasının altındadır.

KARARSIZ DENGE (Unstable Equilibrium):
Cisim denge konumundan uzaklaştırıldığında daha da uzaklaşma eğilimi gösterir. Negatif GM bu duruma yol açar. G noktası M noktasının üzerindedir.

NÖTR DENGE (Neutral Equilibrium):
Cisim yeni konumda kalır, ne geri döner ne de uzaklaşır. GM = 0 olduğunda oluşur. G ve M noktaları çakışıktır.

Gemilerin güvenli seyir yapabilmesi için kararlı dengede olması şarttır.`,
    bulletPoints: [
      "Kararlı denge: Pozitif GM, G altında M",
      "Kararsız denge: Negatif GM, G üstünde M",
      "Nötr denge: GM = 0, G ve M çakışık",
      "Seyir emniyeti kararlı denge gerektirir",
    ],
    examples: [
      {
        problem: "KM = 6.5 m ve KG = 6.5 m ise gemi hangi denge halindedir?",
        solution: "GM = KM - KG = 6.5 - 6.5 = 0 m. Sonuç: Nötr denge. Gemi herhangi bir açıda kalabilir, bu durum tehlikelidir.",
      },
    ],
    keyPoints: [
      "Kararlı denge seyir için zorunludur",
      "Kararsız denge devrilme riskidir",
      "Nötr denge operasyonel olarak kabul edilemez",
    ],
    warnings: [
      "GM = 0 veya negatif durumda gemi seyir yapmamalıdır",
      "Yükleme derhal düzeltilmelidir",
    ],
  },
  // =====================================================
  // BÖLÜM 5 - ENİNE STABİLİTE HESAPLARI
  // =====================================================
  "righting-moment": {
    title: "Doğrultma Momenti",
    introduction: "Doğrultma momenti, gemi yattığında ağırlık ve kaldırma kuvvetlerinin oluşturduğu ve gemiyi dik konuma döndürmeye çalışan momenttir.",
    content: `Gemi belirli bir açıyla yattığında, ağırlık kuvveti G noktasından aşağı, kaldırma kuvveti B noktasından yukarı etkir. Bu iki kuvvet arasındaki yatay mesafe GZ (doğrultma kolu) olarak adlandırılır.

Doğrultma momenti (RM), deplasmanın GZ ile çarpımıdır:
RM = Δ × GZ

Bu moment pozitif olduğunda gemiyi dikleştirici etki yapar. Negatif olduğunda ise yatmayı artırır.

Doğrultma momenti, geminin stabilitesinin temel ölçüsüdür. IMO kriterleri belirli açılarda minimum doğrultma kapasitesi gerektirir.`,
    bulletPoints: [
      "RM = Δ × GZ formülü ile hesaplanır",
      "Pozitif RM gemiyi dikleştirir",
      "Negatif RM yatmayı artırır",
      "RM büyüklüğü stabilite kapasitesini gösterir",
    ],
    formula: {
      name: "Doğrultma Momenti",
      expression: "RM = Δ × GZ",
      description: "RM: Doğrultma momenti (t·m), Δ: Deplasman (ton), GZ: Doğrultma kolu (m)",
    },
    examples: [
      {
        problem: "Δ = 8.000 ton ve GZ = 0.35 m ise doğrultma momenti kaç t·m olur?",
        solution: "RM = 8.000 × 0.35 = 2.800 t·m. Sonuç: Gemi 2.800 t·m doğrultma momenti üretir.",
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
    content: `Yatma momenti (HM), rüzgâr, dalga, ağırlık kayması, dönüş manevrası veya asılı yük gibi dış etkilerden kaynaklanır.

Gemi belirli bir açıda dengeye geldiğinde:
HM = RM

Bu denge noktasına "denge açısı" (angle of equilibrium) denir.

Yatma momenti doğrultma momentinden büyük olursa gemi devrilir. Bu nedenle yatma momentinin kaynakları önceden hesaplanmalı ve sınırlandırılmalıdır.`,
    bulletPoints: [
      "HM dış kaynaklı yatma etkisidir",
      "Rüzgâr, dalga, ağırlık kayması HM oluşturur",
      "Denge: HM = RM",
      "HM > RM_max ise devrilme riski oluşur",
    ],
    formula: {
      name: "Yatma Momenti (Rüzgâr)",
      expression: "HM = P × A × h",
      description: "HM: Yatma momenti (t·m), P: Rüzgâr basıncı (t/m²), A: Rüzgâra maruz alan (m²), h: Kaldırma kolu (m)",
    },
    examples: [
      {
        problem: "Rüzgâr basıncı P = 0.05 t/m², A = 400 m² ve h = 6 m ise HM kaç t·m olur?",
        solution: "HM = 0.05 × 400 × 6 = 120 t·m. Sonuç: Rüzgâr 120 t·m yatma momenti oluşturur.",
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
    content: `Dış bir kuvvet gemiye yatma momenti uyguladığında, gemi doğrultma momenti üretir. İki moment eşitlendiğinde gemi belirli bir açıda dengeye ulaşır.

GZ eğrisi üzerinde bu açı, yatma momenti doğrusunun eğriyi kestiği noktadır.

Denge açısının büyüklüğü:
- Yatma momentinin büyüklüğüne
- Geminin GM değerine
- GZ eğrisinin şekline bağlıdır

Küçük açılar için tan θ ≈ HM / (Δ × GM) yaklaşımı kullanılabilir.`,
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
        problem: "HM = 200 t·m, Δ = 5.000 ton, GM = 0.8 m ise denge açısı yaklaşık kaç derece olur?",
        solution: "tan θ = 200 / (5.000 × 0.8) = 200 / 4.000 = 0.05. θ ≈ 2.86°. Sonuç: Gemi yaklaşık 3° yatma açısında dengelenir.",
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
    content: `Ağırlık kayması, deplasmanı değiştirmeden G noktasının enine hareket etmesine neden olur. Bu kayma yatma momentine eşdeğerdir.

Oluşan yatma momenti:
HM = w × d

Burada w kaydırılan ağırlık, d ise kaydırma mesafesidir.

Denge açısı:
tan θ = (w × d) / (Δ × GM)

Kargo kayması, balast transferi veya vinç operasyonları bu tür yatmaya neden olabilir.`,
    bulletPoints: [
      "Enine ağırlık kayması list oluşturur",
      "HM = w × d formülü uygulanır",
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
        problem: "60 ton yük 4 m enine kaydı. Δ = 6.000 ton, GM = 0.6 m. List açısı kaç derece?",
        solution: "tan θ = (60 × 4) / (6.000 × 0.6) = 240 / 3.600 = 0.0667. θ ≈ 3.8°. Sonuç: Yaklaşık 4° list oluşur.",
      },
    ],
    keyPoints: [
      "Kargo kayması kazaların önemli nedenlerindendir",
      "Lashing ve securing prosedürleri kritiktir",
      "Seyir sırasında kayma izlenmelidir",
    ],
    warnings: [
      "Büyük kaymalarda list hızla artabilir",
      "Asimetrik flooding benzer etki yaratır",
    ],
  },
  "small-angle-stability": {
    title: "Küçük Açılar İçin Stabilite",
    introduction: "Küçük yatma açılarında (yaklaşık 10°'ye kadar) metasantr sabit kabul edilir ve basitleştirilmiş formüller kullanılır.",
    content: `Küçük açı stabilitesi, geminin dik konuma yakın davranışını inceler. Bu aralıkta metasantr (M) sabit kabul edilir ve GZ doğrusal olarak artar.

Temel ilişki:
GZ ≈ GM × sin θ

Bu yaklaşım, ilk stabilite değerlendirmelerinde hızlı hesap imkânı sağlar.

Küçük açı yaklaşımı sin θ ≈ θ (radyan) olarak da yazılabilir. Ancak 10°'nin üzerinde bu yaklaşım hata verir ve tam GZ hesabı gereklidir.`,
    bulletPoints: [
      "Küçük açı: 0° - 10° aralığı",
      "M sabit kabul edilir",
      "GZ ≈ GM × sin θ ilişkisi geçerlidir",
      "10° üzerinde tam hesap gerekir",
    ],
    formula: {
      name: "Küçük Açı GZ Formülü",
      expression: "GZ ≈ GM × sin θ",
      description: "GZ: Doğrultma kolu (m), GM: Metasantrik yükseklik (m), θ: Yatma açısı (derece)",
    },
    examples: [
      {
        problem: "GM = 0.7 m ve θ = 8° ise GZ kaç metre olur?",
        solution: "sin 8° = 0.139. GZ ≈ 0.7 × 0.139 = 0.097 m. Sonuç: GZ yaklaşık 10 cm'dir.",
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
    introduction: "Büyük yatma açılarında metasantr sabit değildir ve stabilite analizi tam GZ eğrisi ile yapılır.",
    content: `10°'nin üzerindeki açılarda metasantr (M) konumu değişir ve küçük açı yaklaşımı geçerliliğini yitirir. Bu nedenle büyük açı stabilitesi doğrudan GZ eğrisi üzerinden incelenir.

GZ eğrisi, geminin tüm yatma aralığındaki stabilite davranışını gösterir. Eğri üzerinde maksimum GZ, stabilite alanları ve devrilme açısı değerlendirilir.

IMO kriterleri büyük açılar için minimum gereksinimler tanımlar:
- Maksimum GZ ≥ 0.20 m (bazı gemi tipleri için)
- GZ_max açısı ≥ 25°
- Alan kriterleri`,
    bulletPoints: [
      "10° üzerinde tam GZ analizi gerekir",
      "Metasantr konumu değişkendir",
      "GZ eğrisi tüm stabilite profilini verir",
      "IMO kriterleri büyük açı gereksinimleri tanımlar",
    ],
    keyPoints: [
      "Büyük açı stabilitesi operasyonel güvenlik için kritiktir",
      "GZ eğrisi her yükleme durumu için oluşturulmalıdır",
      "Hasarlı stabilite büyük açılarda daha kritiktir",
    ],
  },
  // =====================================================
  // BÖLÜM 6 - SERBEST YÜZEY ETKİSİ
  // =====================================================
  "free-surface-concept": {
    title: "Serbest Yüzey Kavramı",
    introduction: "Serbest yüzey, kısmen dolu bir tankta sıvının serbestçe hareket edebilmesi durumunu ifade eder ve stabiliteyi olumsuz etkiler.",
    content: `Bir tank tamamen dolu veya tamamen boş olduğunda içindeki sıvı hareket edemez. Ancak tank kısmen doluysa, sıvı gemi yattığında yatan tarafa akar ve ağırlık merkezini kaydırır.

Bu hareket, sanal bir KG artışı yaratır ve GM'yi azaltır. Bu fenomen "serbest yüzey etkisi" (Free Surface Effect - FSE) olarak adlandırılır.

Serbest yüzey etkisi:
- Tank ne kadar genişse etki o kadar büyüktür
- Sıvı yoğunluğu etkiyi artırır
- Tank bölmeleri (longitudinal veya transverse) etkiyi azaltır

Tüm kısmen dolu tanklar serbest yüzey etkisi yaratır: yakıt, balast, tatlı su, cargo oil.`,
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
      "Birden fazla serbest yüzeyli tank etkiyi katlayabilir",
      "Seyir sırasında tank durumları izlenmelidir",
    ],
  },
  "fse-gm-effect": {
    title: "Serbest Yüzeyin GM'ye Etkisi",
    introduction: "Serbest yüzey, efektif GM değerini düşürerek geminin ilk stabilitesini zayıflatır.",
    content: `Serbest yüzey etkisi, ağırlık merkezinin sanal olarak yükselmesine (GG' veya virtual rise of G) neden olur. Bu artış GM'yi doğrudan azaltır.

Düzeltilmiş GM:
GM_fluid = GM_solid - GG'

Burada GG' serbest yüzey düzeltmesidir ve FSM/Δ olarak hesaplanır.

Efektif GM (GM_fluid) negatif olursa gemi kararsız hale gelir. Bu nedenle stabilite hesaplarında serbest yüzey düzeltmesi her zaman uygulanır.`,
    bulletPoints: [
      "Serbest yüzey KG'yi sanal olarak yükseltir",
      "GM_fluid = GM_solid - GG'",
      "GG' = FSM / Δ",
      "Düşük GM'li gemilerde etki kritiktir",
    ],
    formula: {
      name: "Serbest Yüzey Düzeltmesi",
      expression: "GM_fluid = GM_solid - (FSM / Δ)",
      description: "GM_fluid: Düzeltilmiş GM (m), GM_solid: Katı hesaplı GM (m), FSM: Serbest yüzey momenti (t·m), Δ: Deplasman (ton)",
    },
    examples: [
      {
        problem: "GM_solid = 0.80 m, FSM = 400 t·m, Δ = 8.000 ton ise GM_fluid kaç metredir?",
        solution: "GG' = FSM / Δ = 400 / 8.000 = 0.05 m. GM_fluid = 0.80 - 0.05 = 0.75 m. Sonuç: Serbest yüzey GM'yi 5 cm azaltır.",
      },
    ],
    keyPoints: [
      "Stabilite hesabı her zaman GM_fluid kullanmalıdır",
      "FSM değerleri tank tablolarından alınır",
      "Birden fazla tank için FSM'ler toplanır",
    ],
  },
  "fsm": {
    title: "Free Surface Moment (FSM)",
    introduction: "Free Surface Moment, bir tankın serbest yüzey etkisinin büyüklüğünü ifade eden ve stabilite hesabında kullanılan değerdir.",
    content: `FSM, tankın geometrik özelliklerine ve içindeki sıvının yoğunluğuna bağlıdır.

FSM = ρ × I

Burada ρ sıvının yoğunluğu, I ise tank su yüzeyinin boyuna eksene göre atalet momentidir.

Dikdörtgen kesitli bir tank için:
I = (L × B³) / 12

FSM değerleri genellikle tank tablolarında verilir. Farklı doluluk oranları için farklı FSM değerleri olabilir.`,
    bulletPoints: [
      "FSM = ρ × I formülü ile hesaplanır",
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
        problem: "Tank boyutları L = 10 m, B = 6 m ve yakıt yoğunluğu ρ = 0.85 t/m³ ise FSM kaç t·m olur?",
        solution: "I = (10 × 6³) / 12 = (10 × 216) / 12 = 180 m⁴. FSM = 0.85 × 180 = 153 t·m. Sonuç: Tank 153 t·m serbest yüzey momenti oluşturur.",
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
    content: `FSE (veya GG'), serbest yüzeyin ağırlık merkezini ne kadar sanal olarak yükselttiğini gösterir.

FSE = FSM / Δ

Bu değer KG'ye eklenerek efektif KG bulunur:
KG_fluid = KG_solid + FSE

Veya doğrudan GM'den düşülür:
GM_fluid = GM_solid - FSE

Birden fazla serbest yüzeyli tank varsa, tüm FSM'ler toplanır ve toplam FSE hesaplanır.`,
    bulletPoints: [
      "FSE = FSM / Δ formülü kullanılır",
      "FSE, KG'ye eklenir veya GM'den çıkarılır",
      "Birden fazla tank için FSM'ler toplanır",
      "Deplasman büyüdükçe FSE küçülür",
    ],
    formula: {
      name: "Free Surface Effect Hesabı",
      expression: "FSE = Σ(FSM) / Δ; KG_fluid = KG_solid + FSE",
      description: "FSE: Serbest yüzey etkisi (m), FSM: Serbest yüzey momenti (t·m), Δ: Deplasman (ton)",
    },
    examples: [
      {
        problem: "3 tankın FSM toplamı 600 t·m ve Δ = 10.000 ton ise FSE kaç metredir?",
        solution: "FSE = 600 / 10.000 = 0.06 m. Sonuç: KG 6 cm sanal olarak yükselir.",
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
    content: `FSM hesabında atalet momenti (I) tank genişliğinin küpüyle orantılıdır. Bu nedenle geniş tanklar çok daha büyük serbest yüzey etkisi yaratır.

Boyuna bölme (longitudinal subdivision):
Bir tankı ortadan boyuna bölmek, toplam FSM'yi 1/4'üne düşürür (2 × (B/2)³ / 2 = B³/4).

Enine bölme (transverse subdivision):
Enine bölmeler FSM'yi değiştirmez; ancak sıvı akışını sınırlar.

Tank şekli:
Eğrisel veya konik tanklarda FSM hesabı daha karmaşıktır ve tank tablolarına başvurulur.`,
    bulletPoints: [
      "FSM, B³ ile orantılıdır",
      "Boyuna bölme FSM'yi 1/4'e düşürür",
      "Enine bölme FSM'yi değiştirmez",
      "Karmaşık geometriler için tablo kullanılır",
    ],
    formula: {
      name: "Bölmeli Tank FSM",
      expression: "FSM_bölmeli = FSM_tam / n²",
      description: "n: Boyuna bölme sayısı (2 bölme için FSM 1/4 olur)",
    },
    examples: [
      {
        problem: "12 m genişliğinde bir tankın FSM = 800 t·m. Tank ortadan boyuna bölünürse yeni FSM kaç t·m olur?",
        solution: "Bölme sayısı n = 2. FSM_yeni = 800 / 2² = 800 / 4 = 200 t·m. Sonuç: FSM 1/4'e düşer.",
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
    content: `Gemide genellikle birden fazla tank kısmen dolu olabilir: yakıt tankları, balast tankları, tatlı su tankları, cargo oil tankları.

Her tankın FSM'si ayrı hesaplanır veya tank tablolarından alınır. Toplam serbest yüzey momenti:
Σ(FSM) = FSM₁ + FSM₂ + FSM₃ + ...

Toplam FSE:
FSE = Σ(FSM) / Δ

Tamamen dolu veya tamamen boş tanklar FSM hesabına dahil edilmez.`,
    bulletPoints: [
      "Her kısmen dolu tank FSM üretir",
      "FSM'ler toplanır, tek FSE hesaplanır",
      "Tam dolu veya boş tanklar dahil edilmez",
      "Yükleme planı FSM toplamını etkiler",
    ],
    examples: [
      {
        problem: "3 tank: FSM₁ = 150 t·m, FSM₂ = 200 t·m, FSM₃ = 100 t·m. Δ = 7.500 ton. Toplam FSE kaç metredir?",
        solution: "Σ(FSM) = 150 + 200 + 100 = 450 t·m. FSE = 450 / 7.500 = 0.06 m. Sonuç: Toplam serbest yüzey etkisi 6 cm'dir.",
      },
    ],
    keyPoints: [
      "Tank sayısı arttıkça FSE artabilir",
      "Tankları tamamen doldurmak veya boşaltmak FSE'yi sıfırlar",
      "Yükleme planında FSM minimizasyonu hedeflenir",
    ],
    warnings: [
      "Çok sayıda kısmen dolu tank kritik FSE oluşturabilir",
      "Kritik seyirlerde tank durumları gözden geçirilmelidir",
    ],
  },
  // =====================================================
  // BÖLÜM 7 - BOYUNA STABİLİTE VE TRİM
  // =====================================================
  "lcg": {
    title: "Boyuna Ağırlık Merkezi (LCG)",
    introduction: "LCG, geminin ağırlık merkezinin boyuna konumunu ifade eder ve trim hesaplarının temel girdisidir.",
    content: `LCG (Longitudinal Center of Gravity), gemideki tüm ağırlıkların momentler yöntemiyle hesaplanan boyuna bileşkesidir.

Referans noktası genellikle:
- Kıç dikme (AP - After Perpendicular)
- Orta kesit (Midship)
- Baş dikme (FP - Forward Perpendicular)

LCG hesabı:
LCG = Σ(wᵢ × lcgᵢ) / Σwᵢ

LCG ile LCB arasındaki fark trim oluşumunu belirler.`,
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
        problem: "500 t yük AP'den 80 m, 300 t yük AP'den 40 m ise LCG kaç metredir?",
        solution: "LCG = (500 × 80 + 300 × 40) / 800 = (40.000 + 12.000) / 800 = 65 m. Sonuç: LCG, AP'den 65 m'dir.",
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
    content: `LCB (Longitudinal Center of Buoyancy), batık hacmin boyuna ağırlık merkezidir. Kaldırma kuvveti bu noktadan yukarı yönlü etkir.

LCB konumu:
- Draft ve trim durumuna bağlıdır
- Hidrostatik tablolardan okunur
- Gemi form ve doluluk oranına duyarlıdır

Denge durumunda LCG ve LCB aynı düşey doğru üzerinde olmalıdır. Aksi halde boyuna moment oluşur ve trim meydana gelir.`,
    bulletPoints: [
      "LCB batık hacmin boyuna merkezidir",
      "Hidrostatik tablolardan alınır",
      "LCG = LCB ise trim sıfırdır",
      "LCG ≠ LCB ise trim oluşur",
    ],
    formula: {
      name: "Trim Momenti",
      expression: "Trim Moment = Δ × (LCG - LCB)",
      description: "Trim Moment: Boyuna moment (t·m), Δ: Deplasman (ton), LCG - LCB: Fark (m)",
    },
    examples: [
      {
        problem: "Δ = 6.000 ton, LCG = 70 m (AP'den), LCB = 68 m (AP'den). Trim momenti kaç t·m?",
        solution: "Trim Moment = 6.000 × (70 - 68) = 6.000 × 2 = 12.000 t·m. Sonuç: Baş yönünde trim momenti oluşur.",
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
    content: `Trim, geminin boyuna yatma durumudur ve iki şekilde ifade edilir:
1. Fark olarak: Trim = T_kıç - T_baş
2. Açı olarak: θ = arctan(Trim / LBP)

Trim pozitif ise: Kıç trimi (stern trim)
Trim negatif ise: Baş trimi (bow trim)
Trim = 0 ise: Düz oturma (even keel)

Trim, geminin performansını, pervane verimliliğini ve güverte ıslaklığını etkiler. Ticari operasyonlarda optimum trim değerleri belirlenir.`,
    bulletPoints: [
      "Trim = T_kıç - T_baş",
      "Pozitif trim = Kıç trimi",
      "Negatif trim = Baş trimi",
      "Optimum trim yakıt verimliliğini artırır",
    ],
    formula: {
      name: "Trim Hesabı",
      expression: "Trim = T_kıç - T_baş",
      description: "Trim: Baş-kıç draft farkı (m), T_kıç: Kıç draftı (m), T_baş: Baş draftı (m)",
    },
    examples: [
      {
        problem: "T_kıç = 7.2 m, T_baş = 6.8 m ise trim durumu nedir?",
        solution: "Trim = 7.2 - 6.8 = 0.4 m. Sonuç: 40 cm kıç trimi (stern trim) vardır.",
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
    content: `MCT (Moment to Change Trim 1 cm), geminin boyuna stabilitesinin ölçüsüdür. Bu değer hidrostatik tablolardan alınır ve draft ile değişir.

MCT hesabı:
MCT = (Δ × GML) / (100 × LBP)

Burada GML boyuna metasantrik yükseklik, LBP iki dikme arası uzunluktur.

Trim değişimi hesabı:
Trim = (w × d) / MCT

Burada w ağırlık, d boyuna taşıma mesafesidir.`,
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
        problem: "MCT = 350 t·m/cm, 140 ton yük 15 m başa kaydırılıyor. Trim değişimi kaç cm?",
        solution: "Moment = 140 × 15 = 2.100 t·m. Trim = 2.100 / 350 = 6 cm. Sonuç: Baş trimi 6 cm artar.",
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
    content: `Trim hesabı iki temel durumu kapsar:
1. Ağırlık kayması (w × d momenti)
2. Ağırlık ekleme/çıkarma (LCG değişimi)

Trim değişimi:
ΔTrim = (w × d) / MCT

Baş ve kıç draft değişimleri:
ΔT_baş = (ΔTrim × LCF) / LBP
ΔT_kıç = ΔTrim - ΔT_baş

LCF (Longitudinal Center of Flotation), yüzme merkezinin boyuna konumudur.`,
    bulletPoints: [
      "Trim değişimi = Moment / MCT",
      "LCF, draft dağılımını belirler",
      "Baş ve kıç draftları ayrı hesaplanır",
      "Trim hesabı yükleme planında zorunludur",
    ],
    formula: {
      name: "Trim ve Draft Değişimi",
      expression: "ΔTrim = (w × d) / MCT; ΔT_baş = ΔTrim × (LBP - LCF) / LBP",
      description: "ΔTrim: Trim değişimi (cm), LCF: Yüzme merkezinin kıçtan uzaklığı (m)",
    },
    examples: [
      {
        problem: "w = 200 t, d = 20 m başa, MCT = 400 t·m/cm, LBP = 120 m, LCF = 55 m (kıçtan). Draft değişimleri nedir?",
        solution: "ΔTrim = (200 × 20) / 400 = 10 cm baş trimi. ΔT_kıç = 10 × 55 / 120 = 4.58 cm azalma. ΔT_baş = 10 - 4.58 = 5.42 cm artış. Sonuç: Baş 5.4 cm batar, kıç 4.6 cm yükselir.",
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
    content: `Yükleme ve boşaltma sırasında trim sürekli değişir. Optimum trim değerleri şunları etkiler:
- Yakıt tüketimi
- Pervane verimliliği
- Güverte ıslaklığı
- Liman manevrası

Trim kontrolü yöntemleri:
1. Yük yerleşim planı
2. Balast transferi
3. Yakıt transferi
4. Yükleme sırası optimizasyonu

Stabilite bilgisayarları trim simülasyonu yaparak optimum yükleme planı önerir.`,
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
    title: "Deplasman",
    introduction: "Deplasman, geminin toplam ağırlığı ve yer değiştirdiği suyun ağırlığıdır; stabilitenin temel büyüklüğüdür.",
    content: `Deplasman (Δ), geminin yüzerken yer değiştirdiği suyun ağırlığına eşittir. Arşimet prensibine göre bu değer geminin toplam ağırlığına eşittir.

Δ = ∇ × ρ

Burada ∇ batık hacim (m³), ρ suyun yoğunluğudur (deniz suyu için 1.025 t/m³).

Deplasman değeri:
- Stabilite hesaplarının girdisidir
- Doğrultma momenti hesabında kullanılır
- Hidrostatik tablolardan draft ile ilişkilendirilir`,
    bulletPoints: [
      "Δ = Geminin toplam ağırlığı",
      "Δ = Yer değiştirilen su ağırlığı",
      "Δ = ∇ × ρ formülü ile hesaplanır",
      "Draft arttıkça deplasman artar",
    ],
    formula: {
      name: "Deplasman Hesabı",
      expression: "Δ = ∇ × ρ",
      description: "Δ: Deplasman (ton), ∇: Batık hacim (m³), ρ: Su yoğunluğu (t/m³, deniz suyu için 1.025)",
    },
    examples: [
      {
        problem: "Batık hacim ∇ = 5.000 m³, deniz suyu yoğunluğu ρ = 1.025 t/m³ ise deplasman kaç tondur?",
        solution: "Δ = 5.000 × 1.025 = 5.125 ton. Sonuç: Gemi 5.125 ton ağırlığındadır.",
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
    content: `Draft (su çekimi), geminin ne kadar suya battığını gösterir. Üç konumda ölçülür:
1. Baş draftı (Forward draft)
2. Kıç draftı (Aft draft)
3. Orta draft (Mean draft)

Orta draft = (T_baş + T_kıç) / 2

Draft arttıkça:
- Deplasman artar
- Fribord azalır
- Batık hacim büyür

Draft okuması, yükleme hesabının başlangıç noktasıdır.`,
    bulletPoints: [
      "Draft omurgadan su hattına mesafedir",
      "Baş, kıç ve orta draft ayrı ölçülür",
      "Draft artışı deplasman artışı demektir",
      "Fribord sınırları draft limitini belirler",
    ],
    formula: {
      name: "Orta Draft",
      expression: "T_mean = (T_baş + T_kıç) / 2",
      description: "T_mean: Orta draft (m), T_baş: Baş draftı (m), T_kıç: Kıç draftı (m)",
    },
    examples: [
      {
        problem: "T_baş = 6.4 m, T_kıç = 7.0 m ise orta draft kaç metredir?",
        solution: "T_mean = (6.4 + 7.0) / 2 = 6.7 m. Sonuç: Orta draft 6.7 metredir.",
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
    content: `Draft arttıkça batık hacim ve dolayısıyla deplasman artar. Bu ilişki doğrusal değildir; gemi formuna bağlıdır.

Hidrostatik tablolar veya eğriler bu ilişkiyi gösterir:
- Draft (m) vs Deplasman (ton)
- Draft (m) vs Batık hacim (m³)

Bu tablolar geminin inşa aşamasında hesaplanır ve stabilite kitapçığında verilir.

Yükleme sırasında draft ölçülerek deplasman bulunur veya tersine deplasman hesabından beklenen draft kontrol edilir.`,
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
    content: `TPC (Tons Per Centimeter Immersion), geminin su hattı alanı ile ilişkilidir.

TPC = (A × ρ) / 100

Burada A su hattı alanı (m²), ρ su yoğunluğudur (t/m³).

TPC kullanımı:
- Yüklenecek ağırlık / TPC = Draft artışı (cm)
- Draft değişimi × TPC = Ağırlık değişimi (ton)

TPC değeri draft ile değişir; hidrostatik tablolardan okunur.`,
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
        problem: "TPC = 25 ton/cm ve 500 ton yük yüklenecek. Draft kaç cm artar?",
        solution: "ΔT = 500 / 25 = 20 cm. Sonuç: Draft 20 cm artar.",
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
    content: `KM (Keel to Metacenter), metasantrın omurgadan yüksekliğidir.

KM = KB + BM

Burada KB omurgadan kaldırma merkezine, BM metasantrik yarıçaptır.

KM değeri:
- Draft ile değişir
- Hidrostatik tablolardan okunur
- GM hesabında kullanılır: GM = KM - KG

KM değeri gemi geometrisine bağlıdır ve yükleme ile değişmez (yalnızca draft değişimi ile değişir).`,
    bulletPoints: [
      "KM = KB + BM formülü geçerlidir",
      "Hidrostatik tablolardan alınır",
      "Draft ile değişir",
      "GM = KM - KG hesabında kullanılır",
    ],
    formula: {
      name: "KM ve GM İlişkisi",
      expression: "KM = KB + BM; GM = KM - KG",
      description: "KM: Omurgadan metasantra (m), KB: Omurgadan kaldırma merkezine (m), BM: Metasantrik yarıçap (m), KG: Omurgadan ağırlık merkezine (m)",
    },
    examples: [
      {
        problem: "Hidrostatik tablodan T = 6.5 m için KM = 7.8 m okundu. KG = 7.2 m ise GM kaç metredir?",
        solution: "GM = KM - KG = 7.8 - 7.2 = 0.6 m. Sonuç: GM 60 cm'dir, ilk stabilite yeterlidir.",
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
    content: `Hidrostatik tablolar genellikle şu verileri içerir:
- Draft vs Deplasman
- Draft vs TPC
- Draft vs KM (KMt ve KMl)
- Draft vs KB
- Draft vs LCB
- Draft vs LCF
- Draft vs MCT

Tablolar düz oturma (even keel) için hazırlanır. Trim durumunda düzeltme yapılması gerekebilir.

Modern stabilite bilgisayarları bu tabloları otomatik olarak kullanır; ancak manuel kontrol için tablolar bilinmelidir.`,
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
    content: `Dinamik stabilite, geminin belirli bir açıya kadar absorbe edebileceği enerji miktarını ifade eder. Bu kapasite, GZ eğrisinin altındaki alanla ölçülür.

Dinamik doğrultma momenti:
DRM = Δ × ∫GZ dθ

Bu integral, başlangıç açısından belirli bir açıya kadar GZ eğrisinin altındaki alandır.

Statik stabiliteden farkı:
- Statik: Belirli bir açıda anlık denge
- Dinamik: Hareket boyunca enerji dengesi`,
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
    content: `GZ eğrisi altındaki alan, geminin belirli bir açıya kadar ne kadar enerji absorbe edebileceğini ifade eder.

IMO kriterleri şu alanları tanımlar:
- A₁: 0° - 30° arası alan ≥ 0.055 m·rad
- A₂: 0° - 40° arası alan ≥ 0.090 m·rad
- A₃: 30° - 40° arası alan ≥ 0.030 m·rad

Bu alanlar, geminin çeşitli yatma senaryolarında yeterli enerji rezervine sahip olmasını garanti eder.

Alan hesabı sayısal integrasyon veya trapez kuralı ile yapılır.`,
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
        problem: "0-30° arasında hesaplanan alan A₁ = 0.048 m·rad. IMO kriteri sağlanıyor mu?",
        solution: "IMO kriteri: A₁ ≥ 0.055 m·rad. 0.048 < 0.055. Sonuç: Kriter sağlanmıyor, stabilite yetersiz.",
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
    introduction: "Statik stabilite anlık dengeyi, dinamik stabilite ise hareket halinde enerji dengesini inceler.",
    content: `Statik ve dinamik stabilite birbirini tamamlar:

STATİK STABİLİTE:
- Belirli bir açıda anlık denge analizi
- GZ değerleri ve GM kontrolü
- Küçük açılarda GM, büyük açılarda GZ eğrisi

DİNAMİK STABİLİTE:
- Hareket boyunca enerji dengesi
- GZ eğrisi altındaki alanlar
- Dalga ve rüzgâr etkisi altında davranış

Her iki analiz de gereklidir. Statik kriterlerin sağlanması dinamik güvenliği garanti etmez; alan kriterleri de kontrol edilmelidir.`,
    bulletPoints: [
      "Statik: Anlık denge, GZ ve GM",
      "Dinamik: Enerji dengesi, alanlar",
      "Her ikisi de IMO tarafından zorunludur",
      "Statik yeterlilik dinamik güvenliği garanti etmez",
    ],
    keyPoints: [
      "Stabilite değerlendirmesi her iki analizi kapsar",
      "GZ eğrisi hem statik hem dinamik bilgi verir",
      "Kritik operasyonlarda dinamik analiz önceliklidir",
    ],
  },
  "wave-effect": {
    title: "Dalga Etkisi",
    introduction: "Dalgalar gemiye enerji aktararak yatma hareketi oluşturur ve dinamik stabiliteyi test eder.",
    content: `Dalgalar gemiye çeşitli şekillerde etki eder:

1. Dalga eğimi (wave slope): Gemi dalga üzerinde yattığında efektif yatma açısı artar.

2. Dalga momenti: Dalga yüksekliği ve periyodu yatma momentini belirler.

3. Rezonans: Dalga periyodu yalpa periyoduna yaklaştığında tehlikeli salınımlar oluşur.

4. Parametrik yalpalama: Baş-kıç dalgalarında değişen su hattı genişliği stabiliteyi periyodik olarak değiştirir.

IMO rüzgâr ve dalga kriterleri bu etkileri hesaba katar.`,
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
      "Rezonans koşullarında salınım genliği tehlikeli boyutlara ulaşabilir",
      "Rota değişikliği veya hız azaltma gerekebilir",
    ],
  },
  "wind-effect": {
    title: "Rüzgâr Etkisi",
    introduction: "Rüzgâr, geminin üst yapılarına etki ederek yatma momenti oluşturur ve stabiliteyi zorlar.",
    content: `Rüzgâr etkisi, rüzgâra maruz kalan yüzey alanı ve rüzgâr hızına bağlıdır.

Rüzgâr yatma momenti:
HM_wind = 0.5 × ρ_air × V² × A × h

Burada ρ_air hava yoğunluğu, V rüzgâr hızı, A maruz alan, h kaldırma koludur.

IMO rüzgâr kriteri (Weather Criterion), ani rüzgâr altında geminin devrilmemesini garanti eden stabilite kontrolüdür. Bu kriter GZ eğrisi üzerinde grafiksel olarak uygulanır.`,
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
