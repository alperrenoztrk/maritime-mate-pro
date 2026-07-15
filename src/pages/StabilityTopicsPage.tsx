import { BookSheet } from "@/components/book/BookSheet";
import { BookTopicReader } from "@/components/book/BookTopicReader";
import {
  BookOpen,
  Anchor,
  AlertTriangle,
  Waves,
  Scale,
  Ship,
  Shield,
  Weight,
  BarChart3,
  Settings,
  Activity,
  Target,
  Zap,
  BookMarked,
} from "lucide-react";

// Stabilite diyagramları (public/diagrams altındaki vektör çizimler)
const metacenterDiagram = "/diagrams/stability/metasantr-gm.svg";
const gzCurveDiagram = "/diagrams/stability/gz-egrisi.svg";
const freeSurfaceEffect = "/diagrams/stability/serbest-yuzey.svg";
const rightingMomentDiagram = "/diagrams/dogrultma-kolu.svg";
const trimDiagram = "/diagrams/stability/trim.svg";
const damageStabilityDiagram = "/diagrams/stability/yara-stabilitesi.svg";

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

Metasantr konumu, su hattı atalet momenti ve batık hacme bağlı olarak hesaplanan BM mesafesi ile belirlenir. BM, B ile M arasındaki düşey mesafedir ve geminin su hattı şekline hassastır.`,
    images: [
      {
        src: metacenterDiagram,
        alt: "Metasantr ve GM diyagramı",
        caption: "Şekil: Gemi kesitinde K, B, G ve M noktalarının gösterimi ve GM mesafesi",
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
    images: [
      {
        src: gzCurveDiagram,
        alt: "GZ eğrisi diyagramı",
        caption: "Şekil: Tipik GZ eğrisi - yatma açısına göre doğrultma kolu değişimi",
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
    content: `GZ eğrisi belirli bir açıya kadar artar, ardından azalarak sıfıra yaklaşır. Eğrinin tepe noktası, geminin en yüksek doğrultma kapasitesini gösterir.

IMO 2008 IS Code gibi kriterler, maksimum GZ değerinin ve oluştuğu açının belirli minimumları sağlamasını ister. Örneğin genel kargo gemileri için GZmax ≥ 0.20 m ve bu maksimumun en az 25°–30° civarında oluşması beklenir (gemi tipine göre değişir).

Maksimum GZ'nin çok düşük veya küçük açıda oluşması, yetersiz stabilite göstergesi olabilir.`,
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
      "GZmax kriteri sağlanmazsa sefer emniyeti risk altındadır",
      "Güverte yükleri ve serbest yüzey etkisi GZmax'ı hızlı düşürebilir",
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
    introduction: "Devrilme açısı (Angle of Vanishing Stability – AVS), GZ eğrisinin pozitif bölgeden çıkıp tekrar sıfıra düştüğü ve geminin doğrultma momenti üretmeyi bıraktığı açıdır. Bu açıdan sonra GZ negatif olur ve gemi geri dönemez (devrilir).",
    content: `AVS VE STABİLİTE ARALIĞI:
GZ eğrisi tepe yaptıktan sonra azalır ve bir açıda sıfıra iner; bu açı AVS'dir. Orijinden AVS'ye kadar olan aralık "pozitif stabilite aralığı" (range of positive stability) olarak adlandırılır. Aralık ne kadar genişse gemi büyük yatmalardan o kadar geri dönebilir.

NEYE BAĞLI:
- KG yükselmesi ve serbest yüzey GZ eğrisini düşürür → AVS küçülür.
- Yüksek fribord ve su geçirmez kapalı üst yapı → AVS büyür (eğri daha geç sıfırlanır).
- Hasar (su alma) durumunda eğri düşer → AVS belirgin küçülür.

DOWNFLOODING AÇISI (θf) — PRATİK SINIR:
Gemideki kapatılamayan açıklıklar (hava firarı, fan girişi, kapı) belirli bir yatma açısında suya girer; bu "downflooding angle" (θf). Su girmeye başladığında gemi hızla stabilite kaybeder. Bu nedenle PRATİK güvenli aralık, AVS değil, AVS ile θf'den HANGİSİ KÜÇÜKSE odur. IMO alan/aralık kriterleri çoğu zaman θf'ye göre kesilir.`,
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
      "Açıklıkların suya girmesi (θf) devrilme açısını pratikte düşürür",
      "Downflooding başladığında stabilite hızla kaybedilir",
    ],
  },
  "gz-curve-interpretation": {
    title: "GZ Eğrisinin Yorumu",
    introduction: "GZ eğrisi (statik stabilite eğrisi), geminin farklı yatma açılarındaki doğrultma kolunu (GZ) gösterir ve geminin tüm stabilite karakterini tek bir grafikte özetler. Eğriden GM, maksimum GZ, stabilite aralığı ve dinamik stabilite birlikte okunur.",
    content: `EĞRİDEN OKUNAN BAŞLICA BÜYÜKLÜKLER:

1) BAŞLANGIÇ EĞİMİ → GM: Eğrinin orijindeki teğeti GM'yi verir. Teğet, 1 radyan (57,3°) apsisine kadar uzatılırsa kestiği GZ değeri sayısal olarak GM'ye eşittir. Küçük açılarda GZ ≈ GM · sinθ.

2) MAKSİMUM GZ ve AÇISI: Eğrinin tepe noktası, geminin ürettiği en büyük doğrultma koludur. IMO, GZmax'ın tercihen ≥30°'de (en az 25°) oluşmasını ister.

3) DECK EDGE IMMERSION (güverte kenarı suya girişi): Güverte kenarı suya girdiğinde su hattı genişliği azalır, BM düşer ve eğrinin eğimi değişir (genelde bir bükülme/dönüm noktası). Bu noktadan sonra GZ daha yavaş artar veya azalmaya başlar.

4) STABİLİTE ARALIĞI (range): Eğrinin pozitif olduğu açı aralığı; sıfıra döndüğü açı AVS (devrilme açısı).

5) ALAN → DİNAMİK STABİLİTE: Eğri altındaki alan, doğrultma enerjisini (dinamik stabilite) temsil eder; IMO alan kriterleri buna dayanır.

EĞRİYİ NE DEĞİŞTİRİR:
Üst ağırlık artışı (KG↑) ve serbest yüzey (FSE) eğriyi aşağı çeker ve başlangıç eğimini (GM) düşürür; genişlik artışı ve düşük KG eğriyi yukarı taşır; fribord/kapalı üst yapı stabilite aralığını uzatır.`,
    bulletPoints: [
      "Orijin teğeti 57,3°'de GM'yi verir; küçük açıda GZ ≈ GM·sinθ",
      "Tepe = maksimum GZ (tercihen ≥30°'de)",
      "Deck edge immersion eğride bükülme noktası yaratır",
      "Eğri altı alan = dinamik stabilite (enerji)",
    ],
    formula: {
      name: "GZ ve GM ilişkisi (küçük açı / teğet)",
      expression: "GZ ≈ GM · sinθ  ;  GM = orijin teğetinin 57,3°'deki değeri",
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
    content: `Arşimet prensibine göre bir cisim, yer değiştirdiği sıvının ağırlığı kadar kaldırma kuvveti alır. Yüzerlik şartı bu prensipten türetilir.

Yüzerlik şartı:
W ≤ ρ × g × ∇max

Burada ∇max, cismin tamamen batması durumundaki hacmidir. W bu değerin üzerindeyse cisim batar.

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
    images: [
      {
        src: rightingMomentDiagram,
        alt: "Doğrultma momenti diyagramı",
        caption: "Şekil: Yatmış gemide G, B noktaları ve doğrultma kolu GZ gösterimi",
      },
    ],
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
      "HM > RMmax ise devrilme riski oluşur",
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
    introduction: "Yaklaşık 10°'nin üzerindeki yatma açılarında metasantr (M) sabit kalmaz ve GZ = GM·sinθ küçük açı yaklaşımı geçerliliğini yitirir. Büyük açı stabilitesi, kaldırma merkezinin (B) gerçek hareketi dikkate alınarak doğrudan GZ eğrisinden incelenir.",
    content: `NEDEN KÜÇÜK AÇI YAKLAŞIMI BOZULUR:
Küçük açılarda M neredeyse sabittir ve GZ ≈ GM·sinθ kullanılabilir. Açı büyüdükçe batık hacmin şekli (dolayısıyla B'nin konumu) belirgin değişir; M aşağı kayar ve GZ, basit sinüs bağıntısından sapar.

WALL-SIDED (DİK BORDA) FORMÜLÜ:
Güverte kenarı suya girmeden ve omurga sudan çıkmadan, dik bordalı gövde varsayımıyla GZ yaklaşık olarak şöyle hesaplanır:

GZ = sinθ · ( GM + ½ · BM · tan²θ )

Buradaki ½·BM·tan²θ terimi, büyük açıda doğrultma koluna yapılan ek katkıdır (form etkisi) ve gemiyi küçük açı tahmininden daha "stabil" gösterebilir.

DECK EDGE IMMERSION:
Güverte kenarı suya girdikten sonra su hattı alanı daralır, BM düşer ve GZ'nin artışı yavaşlar/durur; eğri tepe yapar ve düşmeye başlar.

IMO BÜYÜK AÇI KRİTERLERİ:
- GZ ≥ 0,20 m (genellikle ≥30°'de)
- GZmax açısı ≥ 25° (tercihen ≥30°)
- 0-30°, 0-40° ve 30-40° alan kriterleri (IS Code).`,
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
    content: `Bir tank tamamen dolu veya tamamen boş olduğunda içindeki sıvı hareket edemez. Ancak tank kısmen doluysa, sıvı gemi yattığında yatan tarafa akar ve ağırlık merkezini kaydırır.

Bu hareket, sanal bir KG artışı yaratır ve GM'yi azaltır. Bu fenomen "serbest yüzey etkisi" (Free Surface Effect - FSE) olarak adlandırılır.

Serbest yüzey etkisi:
- Tank ne kadar genişse etki o kadar büyüktür
- Sıvı yoğunluğu etkiyi artırır
- Tank bölmeleri (longitudinal veya transverse) etkiyi azaltır

Tüm kısmen dolu tanklar serbest yüzey etkisi yaratır: yakıt, balast, tatlı su, cargo oil.`,
    images: [
      {
        src: freeSurfaceEffect,
        alt: "Serbest yüzey etkisi diyagramı",
        caption: "Şekil: Kısmen dolu tankta sıvı kayması ve sanal KG yükselmesi",
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
      "Birden fazla serbest yüzeyli tank etkiyi katlayabilir",
      "Seyir sırasında tank durumları izlenmelidir",
    ],
  },
  "fse-gm-effect": {
    title: "Serbest Yüzeyin GM'ye Etkisi",
    introduction: "Serbest yüzey, efektif GM değerini düşürerek geminin ilk stabilitesini zayıflatır.",
    content: `Serbest yüzey etkisi, ağırlık merkezinin sanal olarak yükselmesine (GG' veya virtual rise of G) neden olur. Bu artış GM'yi doğrudan azaltır.

Düzeltilmiş GM:
GMfluid = GMsolid - GG'

Burada GG' serbest yüzey düzeltmesidir ve FSM/Δ olarak hesaplanır.

Efektif GM (GMfluid) negatif olursa gemi kararsız hale gelir. Bu nedenle stabilite hesaplarında serbest yüzey düzeltmesi her zaman uygulanır.`,
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
        problem: "GMsolid = 0.80 m, FSM = 400 t·m, Δ = 8.000 ton ise GMfluid kaç metredir?",
        solution: "GG' = FSM / Δ = 400 / 8.000 = 0.05 m. GMfluid = 0.80 - 0.05 = 0.75 m. Sonuç: Serbest yüzey GM'yi 5 cm azaltır.",
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
KGfluid = KGsolid + FSE

Veya doğrudan GM'den düşülür:
GMfluid = GMsolid - FSE

Birden fazla serbest yüzeyli tank varsa, tüm FSM'ler toplanır ve toplam FSE hesaplanır.`,
    bulletPoints: [
      "FSE = FSM / Δ formülü kullanılır",
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
      expression: "FSMbölmeli = FSMtam / n²",
      description: "n: Boyuna bölme sayısı (2 bölme için FSM 1/4 olur)",
    },
    examples: [
      {
        problem: "12 m genişliğinde bir tankın FSM = 800 t·m. Tank ortadan boyuna bölünürse yeni FSM kaç t·m olur?",
        solution: "Bölme sayısı n = 2. FSMyeni = 800 / 2² = 800 / 4 = 200 t·m. Sonuç: FSM 1/4'e düşer.",
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
1. Fark olarak: Trim = Tkıç - Tbaş
2. Açı olarak: θ = arctan(Trim / LBP)

Trim pozitif ise: Kıç trimi (stern trim)
Trim negatif ise: Baş trimi (bow trim)
Trim = 0 ise: Düz oturma (even keel)

Trim, geminin performansını, pervane verimliliğini ve güverte ıslaklığını etkiler. Ticari operasyonlarda optimum trim değerleri belirlenir.`,
    images: [
      {
        src: trimDiagram,
        alt: "Trim diyagramı",
        caption: "Şekil: Gemi yan görünüşü - baş ve kıç draftları ve trim gösterimi",
      },
    ],
    bulletPoints: [
      "Trim = Tkıç - Tbaş",
      "Pozitif trim = Kıç trimi",
      "Negatif trim = Baş trimi",
      "Optimum trim yakıt verimliliğini artırır",
    ],
    formula: {
      name: "Trim Hesabı",
      expression: "Trim = Tkıç - Tbaş",
      description: "Trim: Baş-kıç draft farkı (m), Tkıç: Kıç draftı (m), Tbaş: Baş draftı (m)",
    },
    examples: [
      {
        problem: "Tkıç = 7.2 m, Tbaş = 6.8 m ise trim durumu nedir?",
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
ΔTbaş = (ΔTrim × LCF) / LBP
ΔTkıç = ΔTrim - ΔTbaş

LCF (Longitudinal Center of Flotation), yüzme merkezinin boyuna konumudur.`,
    bulletPoints: [
      "Trim değişimi = Moment / MCT",
      "LCF, draft dağılımını belirler",
      "Baş ve kıç draftları ayrı hesaplanır",
      "Trim hesabı yükleme planında zorunludur",
    ],
    formula: {
      name: "Trim ve Draft Değişimi",
      expression: "ΔTrim = (w × d) / MCT; ΔTbaş = ΔTrim × (LBP - LCF) / LBP",
      description: "ΔTrim: Trim değişimi (cm), LCF: Yüzme merkezinin kıçtan uzaklığı (m)",
    },
    examples: [
      {
        problem: "w = 200 t, d = 20 m başa, MCT = 400 t·m/cm, LBP = 120 m, LCF = 55 m (kıçtan). Draft değişimleri nedir?",
        solution: "ΔTrim = (200 × 20) / 400 = 10 cm baş trimi. ΔTkıç = 10 × 55 / 120 = 4.58 cm azalma. ΔTbaş = 10 - 4.58 = 5.42 cm artış. Sonuç: Baş 5.4 cm batar, kıç 4.6 cm yükselir.",
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

Orta draft = (Tbaş + Tkıç) / 2

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
      expression: "Tmean = (Tbaş + Tkıç) / 2",
      description: "Tmean: Orta draft (m), Tbaş: Baş draftı (m), Tkıç: Kıç draftı (m)",
    },
    examples: [
      {
        problem: "Tbaş = 6.4 m, Tkıç = 7.0 m ise orta draft kaç metredir?",
        solution: "Tmean = (6.4 + 7.0) / 2 = 6.7 m. Sonuç: Orta draft 6.7 metredir.",
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
    introduction: "Statik stabilite, belirli bir yatma açısındaki anlık doğrultma kuvvetini (GZ/moment) inceler. Dinamik stabilite ise gemiyi o açıya yatırmak için yapılan İŞİ (enerji) inceler ve GZ eğrisi altındaki alanla ölçülür. İkisi farklı şeyleri ölçer ve birlikte değerlendirilmelidir.",
    content: `STATİK STABİLİTE:
- Belirli açıda anlık denge: doğrultma kolu GZ ve doğrultma momenti (Δ·GZ).
- Küçük açıda GM, büyük açıda GZ eğrisi ile değerlendirilir.
- Soru: "Bu açıda gemi ne kadar kuvvetle doğrulur?"

DİNAMİK STABİLİTE (ENERJİ):
- Gemiyi 0'dan θ açısına yatırmak için gereken iş, GZ eğrisi altındaki alandır.
- Dinamik stabilite = Δ × (GZ eğrisi altındaki alan); birimi tonne·metre·radyan (enerji).
- Soru: "Gemiyi devirmek için ne kadar ENERJİ gerekir / ne kadar enerji rezervi var?"

NEDEN İKİSİ DE GEREKLİ:
Bir rüzgâr sağnağı veya dalga, gemiye İŞ (enerji) aktarır. Gemi, bu enerjiyi karşılayacak yeterli "rezerv dinamik stabiliteye" (eğri altı alan) sahip değilse, anlık GZ pozitif olsa bile devrilebilir. IMO weather criterion tam olarak bu enerji (alan) dengesini (b ≥ a) kontrol eder. Bu yüzden statik kriterlerin sağlanması tek başına yeterli değildir.`,
    bulletPoints: [
      "Statik: anlık kuvvet/moment (GZ, Δ·GZ).",
      "Dinamik: iş/enerji = eğri altı alan.",
      "Dinamik stabilite = Δ × (GZ eğrisi altı alan).",
      "Rüzgâr/dalga gemiye enerji aktarır; rezerv alan bunu karşılamalı.",
    ],
    formula: {
      name: "Dinamik stabilite (enerji)",
      expression: "Dinamik stabilite = Δ × ∫₀^θ GZ dθ  (eğri altı alan)",
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
HMwind = 0.5 × ρair × V² × A × h

Burada ρair hava yoğunluğu, V rüzgâr hızı, A maruz alan, h kaldırma koludur.

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
  // =====================================================
  // BÖLÜM 11 - HASARLI STABİLİTE (DAMAGE STABILITY)
  // =====================================================
  "post-damage-floatation": {
    title: "Hasar Sonrası Yüzerlik",
    introduction: "Hasar sonrası yüzerlik, geminin bir veya birden fazla bölmenin su ile dolması durumunda yüzmeye devam edip edemeyeceğini belirler.",
    content: `Geminin hasar görmesi durumunda yüzerliğin korunması, can ve mal güvenliği açısından kritik öneme sahiptir.

Hasar sonrası yüzerlik iki faktöre bağlıdır:
1. Hasarlı bölmenin hacmi ve konumu
2. Geminin mevcut rezerv yüzerliği

Rezerv yüzerlik, su hattı üzerinde kalan suya dayanıklı hacimdir. Hasarlı bölmeye dolan su miktarı bu hacmi aşarsa gemi batar.

Permeabilite (μ) faktörü, bölmenin ne kadarının su ile dolabileceğini gösterir:
- Makine dairesi: μ = 0.85
- Kargo ambarı (genel yük): μ = 0.60
- Yolcu alanları: μ = 0.95
- Boş tanklar: μ = 0.95

Hasarlı hacim = Gerçek hacim × μ`,
    images: [
      {
        src: damageStabilityDiagram,
        alt: "Hasar stabilitesi diyagramı",
        caption: "Şekil: Hasarlı bölme, su girişi ve geminin list durumu gösterimi",
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
        problem: "Hacmi 500 m³ olan bir kargo ambarı hasar görüyor. Permeabilite μ = 0.60 ise ne kadar su dolar?",
        solution: "Vflooded = 500 × 0.60 = 300 m³. Sonuç: Ambara 300 m³ su dolar.",
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
    content: `Flooding analizi iki yaklaşımla yapılır:

1. KAYIP YÜZERLİK YÖNTEMİ (Lost Buoyancy Method):
Su dolan bölme artık kaldırma kuvveti üretmez. Gemi dengeyi sağlamak için daha fazla batar. Bu yöntemde deplasmanın değişmediği kabul edilir.

2. EKLENEN AĞIRLIK YÖNTEMİ (Added Weight Method):
Dolan su bir ağırlık olarak kabul edilir. Deplasman artar ve gemi batar. Bu yöntem serbest yüzey etkisini de dikkate alır.

Her iki yöntem de aynı nihai draft ve trim değerlerini verir; ancak hesap mantığı farklıdır.

Modern stabilite bilgisayarları genellikle eklenen ağırlık yöntemini kullanır.`,
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
        problem: "Bir bölmeye 400 m³ deniz suyu (ρ = 1.025 t/m³) doluyorsa eklenen ağırlık nedir?",
        solution: "wadded = 400 × 1.025 = 410 ton. Sonuç: 410 ton ağırlık eklenir.",
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
    content: `Rezerv yüzerlik, geminin fribord ve kapalı üst yapılarının oluşturduğu hacimdir. Bu hacim, hasar durumunda ek yüzerlik sağlar.

Rezerv yüzerlik faktörleri:
- Fribord yüksekliği
- Kapalı üst yapıların hacmi
- Su geçirmez bölmeleme
- Kapı ve açıklıkların durumu

SOLAS gereksinimleri:
- Minimum fribord değerleri
- Bölme uzunluğu sınırlamaları
- Su geçirmez kapı standartları

Rezerv yüzerlik hesabı:
RB = Vüst yapı + Vfribord

Yeterli rezerv yüzerlik, geminin hasarlı durumda bile yüzmesini sağlar.`,
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
      "Açık kapak ve kapılar rezerv yüzerliği sıfırlar",
      "Fribord çizgisi aşılmamalıdır",
    ],
  },
  "asymmetric-flooding": {
    title: "Asimetrik Flooding",
    introduction: "Asimetrik flooding, suyun geminin bir tarafına dolması durumudur ve tehlikeli list açısına yol açar.",
    content: `Asimetrik flooding, hasar tek tarafa olduğunda oluşur. Su yalnızca bir bordaya dolarsa gemi o tarafa yatar.

Asimetrik flooding tehlikeleri:
1. Ani ve büyük list açısı
2. Güverte kenarının suya girmesi
3. Açık güverte açıklıklarından ek su girişi
4. Devrilme riski

Çapraz eşitleme (cross-flooding):
Karşı bordadaki tankların kasten doldurularak listin azaltılması. Bu işlem:
- SOLAS tarafından zorunlu kılınır
- Maksimum 15 dakikada tamamlanmalıdır
- List açısını kabul edilebilir değere düşürür

Çapraz eşitleme kapasitesi gemi tasarımında belirlenir.`,
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
        problem: "200 ton su bordadan 5 m mesafede birikir. Δ = 10.000 ton, GM = 1.0 m ise list açısı nedir?",
        solution: "tan(θ) = (200 × 5) / (10.000 × 1.0) = 0.1. θ = arctan(0.1) ≈ 5.7°. Sonuç: List açısı yaklaşık 6°.",
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
    content: `Progressive flooding, hasarlı bölmedeki suyun:
- Açık kapılar
- Hasarlı bölme sınırları
- Havalandırma kanalları
- Boru hatları
üzerinden diğer bölmelere yayılmasıdır.

Bu durum, ilk hasar sonrası geminin durumunu hızla kötüleştirir.

Önleme yöntemleri:
1. Su geçirmez kapıların kapatılması
2. Havalandırma damperlerinin kapatılması
3. Boru valflerinin kontrol edilmesi
4. Hasarlı bölmenin izole edilmesi

SOLAS, progressive flooding süresini ve geminin nihai konumunu değerlendirir.`,
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
      "Açık bırakılan kapılar felakete yol açabilir",
      "Su geçirmez kapılar seyir sırasında kapalı tutulmalıdır",
    ],
  },
  "damaged-gm-gz": {
    title: "Hasarlı GM ve GZ",
    introduction: "Hasar sonrası GM ve GZ değerleri değişir; bu değişim geminin hayatta kalma kapasitesini belirler.",
    content: `Flooding sonrası stabilite değişiklikleri:

GM DEĞİŞİMİ:
1. KG değişimi: Dolan su ağırlık merkezi yükseltir veya alçaltır
2. KM değişimi: Yeni draft ve trim KM'yi etkiler
3. Serbest yüzey: Dolan bölmede serbest yüzey etkisi oluşur

Hasarlı GM = Sağlam GM + KM değişimi - KG değişimi - FSE

GZ EĞRİSİ DEĞİŞİMİ:
- Eğri yatay kayar (list açısı)
- Maksimum GZ azalır
- Stabilite alanı küçülür
- Devrilme açısı azalır

SOLAS hasarlı durumda minimum GZ ve alan değerlerini tanımlar.`,
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
    content: `Ağır yük kaldırma sırasında stabilite değişiklikleri:

1. SANAL KG YÜKSELMESİ:
Yük yerden kalktığında ağırlık merkezi vinç ucuna taşınmış gibi davranır.
KGyeni = KG + (w × h) / Δ
h: Kaldırma yüksekliği

2. SERFİ ETKİSİ:
Asılı yük bir sarkaç gibi hareket eder ve GM'yi azaltır.
GMreduced = GM - (w × l²) / (Δ × GM)
l: Sapan uzunluğu

3. LIST OLUŞUMU:
Boom dışarı açıldığında enine moment oluşur.

Güvenlik önlemleri:
- Kaldırma öncesi stabilite hesabı
- Balast hazırlığı
- Kaldırma sırasında sürekli izleme
- Rüzgâr ve dalga kontrolü`,
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
        problem: "50 ton yük 10 m yüksekliğe kaldırılıyor. Δ = 5.000 ton ise KG ne kadar artar?",
        solution: "ΔKG = (50 × 10) / 5.000 = 0.10 m. Sonuç: KG 10 cm sanal olarak yükselir.",
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
    content: `Güverte yüklerinin stabilite etkileri:

1. KG YÜKSELMESİ:
Güverte üstü yükler yüksek KG'ye sahiptir.
KGyeni = Σ(wᵢ × KGᵢ) / Σwᵢ

2. GM AZALMASI:
Yükselen KG, GM'yi düşürür.
GM = KM - KG

3. RÜZGÂR ALANI ARTIŞI:
Güverte konteynerları veya kereste yığınları rüzgâr maruz alanını artırır.

4. YANAL MOMENT:
Yük dengesiz yerleştirilirse list oluşur.

Güverte yükü sınırlamaları:
- Maksimum yük ağırlığı (yapısal)
- Stabilite gereksinimleri
- Görüş gereksinimleri
- Bağlama kapasitesi`,
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
    content: `Asılı yük (suspended weight), serbestçe sallanabilen herhangi bir ağırlıktır:
- Vinç yükü
- Şerit halindeki yük
- Serbest sallanan ekipman

SANAL KG YÜKSELMESİ:
Asılı yükün ağırlık merkezi, askı noktasına taşınmış kabul edilir.
GG' = (w × d) / Δ
d: Yükün gerçek KG'si ile askı noktası arasındaki mesafe

SALINCAK ETKİSİ:
Asılı yük gemi yattığında dışa salınır ve yatmayı artırır. Bu etki serbest yüzeye benzer.

Asılı yük durumunda GM:
GMeffective = GM - (w × l²) / (Δ × GM)
l: Sapan uzunluğu`,
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
        problem: "30 ton yük, askı noktası KG'den 8 m yukarıda. Δ = 6.000 ton ise sanal KG artışı nedir?",
        solution: "GG' = (30 × 8) / 6.000 = 0.04 m. Sonuç: KG 4 cm sanal olarak yükselir.",
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
    content: `Balast suyu yönetimi stabilite kontrolünün temel aracıdır.

BALAST İŞLEVLERİ:
1. Stabilite ayarı (GM kontrolü)
2. Trim düzeltme
3. List düzeltme
4. Minimum draft sağlama
5. Stres yönetimi

STABİLİTE ETKİLERİ:
Balast tankları genellikle geminin alt kısımlarındadır.
- Balast alımı: KG düşer, GM artar
- Balast atımı: KG yükselir, GM azalır

SERBEST YÜZEY:
Kısmen dolu balast tankları FSE yaratır. Kritik operasyonlarda tanklar tam dolu veya boş tutulmalıdır.

Balast değişimi sırası önemlidir - stabilite hiçbir aşamada kritik değerlerin altına düşmemelidir.`,
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
    content: `Kargo kayması en tehlikeli stabilite kazası nedenlerinden biridir.

KAYMA TÜRLERİ:
1. Döküm yük kayması (tahıl, cevher, kömür)
2. Paketli yük kayması (bağlama kopması)
3. Sıvı yük dalgalanması (tank içi)
4. Araç kayması (RoRo gemileri)

LİST HESABI:
tan(θ) = (w × d) / (Δ × GM)
w: Kayan yük ağırlığı
d: Kayma mesafesi

ÖNLEMLERİ:
- Uygun istif ve bağlama
- Tahıl için shifting board kullanımı
- Tank doluluk kontrolü
- RoRo'da araç bağlama

SOLAS ve Tahıl Kodu kayma önlemlerini zorunlu kılar.`,
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
        problem: "500 ton kargo 2 m yana kayar. Δ = 15.000 ton, GM = 1.0 m ise list açısı nedir?",
        solution: "tan(θ) = (500 × 2) / (15.000 × 1.0) = 0.067. θ = arctan(0.067) ≈ 3.8°. Sonuç: 4° civarında list oluşur.",
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
    content: `Buzlanma, soğuk bölgelerde seyir eden gemiler için ciddi bir stabilite tehlikesidir.

BUZ BİRİKİMİ:
- Hava sıcaklığı -2°C altında
- Deniz suyu sıcaklığı +8°C altında
- Rüzgâr ve dalga spreyi

BUZ AĞIRLIĞI:
Buz, üst yapılarda, ekipmanlarda ve güvertede birikir.
- Orta buzlanma: 30 kg/m²
- Şiddetli buzlanma: 50+ kg/m²

STABİLİTE ETKİSİ:
Buz yüksek KG'ye sahiptir.
ΔKG = (wice × KGice) / (Δ + wice)

GM hızla azalır ve devrilme riski artar.

Buz temizliği kritik öneme sahiptir.`,
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
        problem: "Üst yapılarda 50 ton buz birikir, ortalama KG = 15 m. Δ = 5.000 ton, mevcut KG = 7 m ise yeni KG nedir?",
        solution: "KGnew = (5.000 × 7 + 50 × 15) / 5.050 = (35.000 + 750) / 5.050 = 7.08 m. Sonuç: KG 8 cm yükselir.",
      },
    ],
    keyPoints: [
      "Soğuk bölge seyirlerinde buzlanma izlenir",
      "Buz temizliği öncelikli operasyondur",
      "Buzlanma hızı şiddetli koşullarda çok yüksektir",
    ],
    warnings: [
      "Buzlanma çok kısa sürede kritik seviyeye ulaşabilir",
      "Rota değişikliği gerekebilir",
    ],
  },
  // =====================================================
  // BÖLÜM 13 - STABİLİTE KRİTERLERİ VE ULUSLARARASI KURALLAR
  // =====================================================
  "imo-stability-criteria": {
    title: "IMO Stabilite Kriterleri",
    introduction: "IMO stabilite kriterleri, gemilerin minimum güvenlik gereksinimlerini tanımlar ve tüm ticari gemiler için zorunludur.",
    content: `IMO (Uluslararası Denizcilik Örgütü) stabilite kriterleri MSC.267(85) Intact Stability Code ile belirlenir.

TEMEL KRİTERLER:

1. ALAN KRİTERLERİ:
- 0° - 30° arası alan ≥ 0.055 m·rad
- 0° - 40° arası alan ≥ 0.090 m·rad
- 30° - 40° arası alan ≥ 0.030 m·rad

2. GZ KRİTERLERİ:
- Maksimum GZ ≥ 0.20 m
- Maksimum GZ en az 25° açıda olmalı
- Tercihen 30° ve üzerinde

3. GM KRİTERİ:
- Başlangıç GM ≥ 0.15 m
- Bazı gemi tipleri için daha yüksek değerler

Bu kriterler hasarsız (intact) stabilite içindir. Hasarlı stabilite kriterleri ayrıca tanımlanır.`,
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
    content: `Intact Stability Code (2008 IS Code), MSC.267(85) kararıyla kabul edilmiştir.

YAPISI:
Bölüm A (zorunlu): genel kriterler ve özel gemi tipi kriterleri.
Bölüm B (tavsiye): ek tedbirler ve rehberlik.

GENEL KRİTERLER (Part A, 2.2 – tüm gemiler için):
GZ eğrisi altındaki alanlar ve GZ değerleri için asgari şartlar:
- 0°–30° arası GZ eğrisi altındaki alan ≥ 0,055 m·rad
- 0°–40° (veya downflooding açısı θf daha küçükse 0°–θf) arası alan ≥ 0,090 m·rad
- 30°–40° (veya 30°–θf) arası alan ≥ 0,030 m·rad
- Doğrultma kolu GZ, 30° veya üzeri bir açıda ≥ 0,20 m olmalı
- Maksimum GZ, tercihen 30°'den büyük bir açıda oluşmalı (en az 25°)
- Başlangıç metasantr yüksekliği GM₀ ≥ 0,15 m

HAVA KRİTERİ (Weather Criterion, Part A 2.3):
Gemi, sabit yan rüzgâr (basınç kolu lw1) ve üzerine bindirilen yalpa + sağnak rüzgâr (lw2) altında devrilmeye karşı yeterli enerji rezervine sahip olmalı. Rüzgâr momentine karşı koyan alan (b), rüzgâr momentinin uyguladığı alandan (a) büyük/eşit olmalıdır (b ≥ a).

ÖZEL GEMİ TİPLERİ:
Yolcu gemileri (yolcu kalabalığı ve dönüş momenti kriterleri), tahıl taşıyanlar (Grain Code), kereste güverte yükü, yüksek hızlı tekneler, offshore vb. için ek/özel kriterler tanımlanır.

UYGULAMA:
Her yükleme durumu, geminin onaylı Stability Booklet'inde bu kriterlere göre kontrol edilir; bayrak devleti ve PSC uyumu denetler.`,
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
    content: `Weather Criterion, geminin ani rüzgâr (gust) ve dalga kombinasyonunda hayatta kalmasını test eder.

SENARYO:
1. Kararlı rüzgâr gemiyi θ₁ açısına yatırır
2. Dalga etkisiyle gemi rüzgâr üstüne θ₂ açısına döner
3. Ani rüzgâr (gust) gemiyi tekrar rüzgâr altına iter

KRİTER:
b ≥ a (GZ eğrisinde alanlar)
- a: Rüzgâr momenti ile GZ eğrisi arasındaki alan
- b: Doğrultma tarafındaki alan

RÜZGÂR BASINCI:
P = 504 N/m² (standart değer)
Düzeltme faktörleri uygulanır.

Bu kriter özellikle yüksek üst yapılı gemilerde kritiktir.`,
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
    content: `Dalga koşullarında stabilite değerlendirmesi:

PARAMETRİK YALPALAMA:
Baş veya kıç dalgalarda su hattı genişliği periyodik olarak değişir. Bu durum GM'yi periyodik olarak değiştirir ve rezonans koşullarında tehlikeli salınımlara yol açar.

Konteyner gemileri ve RoPax'lar özellikle hassastır.

SURF-RIDING VE BROACHING:
Kıç dalgalarda gemi dalga ile birlikte sürüklenebilir ve kontrolsüz dönüşe girebilir.

IMO TAVSİYELERİ:
- MSC.1/Circ.1228: Parametrik yalpalama
- MSC.1/Circ.707: Tehlikeli durumlardan kaçınma

Operasyonel önlemler: rota ve hız değişikliği.`,
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
      "Parametrik yalpalama ani ve şiddetli olabilir",
      "Kötü hava rotası planlaması hayati önemdedir",
    ],
  },
  "min-gm-requirements": {
    title: "Minimum GM Şartları",
    introduction: "Minimum GM değerleri, IMO IS Code kriterlerinden türetilir ve gemi tipi ile yükleme durumuna göre stabilite kitapçığında belirtilen, operasyonda aşılamaz alt sınırlardır. Ancak GM yalnızca 'ne kadar büyük o kadar iyi' değildir; çok yüksek GM de tehlikelidir.",
    content: `MINIMUM GM'NİN KAYNAĞI:
IS Code başlangıç metasantr yüksekliği için GM₀ ≥ 0,15 m şartı koyar. Pratikte her yükleme durumu için gereken minimum GM, KG limiti eğrisi (maximum KG / minimum GM curve) üzerinden kitapçıkta verilir; bu eğri tüm IMO kriterlerini (alan, GZ, weather criterion) aynı anda sağlayan sınırı temsil eder.

GEMİ TİPİNE GÖRE:
- Genel yük gemisi: GM₀ ≥ 0,15 m (ve KG limit eğrisi).
- Yolcu gemileri: ek dönüş/yolcu kalabalığı kriterleri.
- Tankerler: balast durumunda genellikle daha yüksek GM.
- Konteyner gemileri: parametrik yalpa riski nedeniyle yükleme durumuna özel hesap.

STIFF (KATI) ve TENDER (YUMUŞAK) GEMİ:
GM ile yalpa periyodu ters ilişkilidir. Çok yüksek GM → kısa periyot, sert ve ani (violent) yalpa → yük/ekipman hasarı ve konfor kaybı; ayrıca kısa periyot dalga periyoduna yaklaşırsa rezonans. Çok düşük GM → uzun, sluggish yalpa, küçük emniyet payı, takip eden denizde tehlikeli. Bu yüzden hedef, kriterleri sağlayan ancak aşırı yüksek olmayan bir GM'dir.`,
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
      "Minimum GM altında seyir devrilme riski taşır",
      "Aşırı yüksek GM sert yalpayla yük kaymasına/hasara yol açabilir",
    ],
  },
  "operational-limits": {
    title: "Operasyonel Limitler",
    introduction: "Operasyonel limitler, geminin güvenli çalışma koşullarını tanımlar ve aşılmaları yasaktır.",
    content: `Operasyonel limitler stabilite kitapçığında tanımlanır:

YÜK LİMİTLERİ:
- Maksimum deadweight
- Ambar ve güverte yük kapasiteleri
- Yük dağılım sınırları

STABİLİTE LİMİTLERİ:
- Minimum GM değerleri
- Maksimum KG değerleri (KG limiti eğrisi)
- Trim sınırları

ÇEVRESEL LİMİTLER:
- Rüzgâr hızı sınırları (bazı operasyonlar için)
- Dalga yüksekliği sınırları
- Sıcaklık limitleri (buzlanma)

LİMİT AŞIMI:
Stabilite limitlerinin aşılması:
- Sigorta geçerliliğini etkiler
- PSC denetimlerinde tutulmaya yol açar
- Kazalarda sorumluluk doğurur`,
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
    content: `Yaygın yükleme hataları:

1. YANLIŞ AĞIRLIK BİLGİSİ:
- Beyan edilen ve gerçek ağırlık farkı
- Konteyner ağırlık sapmaları
- Döküm yük ölçüm hataları

2. YANLIŞ YERLEŞİM:
- Ağır yüklerin yüksek yerleşimi
- Asimetrik yük dağılımı
- Boş alan yanlış değerlendirmesi

3. HESAP HATALARI:
- Yanlış KG hesabı
- FSE'nin ihmal edilmesi
- Trim hesap hatası

4. PLANLAMA EKSİKLİĞİ:
- Ara durumların kontrolsüzlüğü
- Yakıt tüketimi etkisi
- Balast düzenlemesi eksikliği

Bu hatalar stabilite kitapçığının dikkatli kullanımı ile önlenir.`,
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
      "Konteyner ağırlıkları sıkça yanlış beyan edilir",
      "IMO VGM (Verified Gross Mass) zorunluluğu uygulanmaktadır",
    ],
  },
  "fse-accidents": {
    title: "Serbest Yüzey Kaynaklı Kazalar",
    introduction: "Serbest yüzey etkisinin ihmal edilmesi veya yanlış hesaplanması ciddi stabilite kazalarına yol açmıştır.",
    content: `Serbest yüzey kaynaklı kazaların ortak özellikleri:

1. ÇOK SAYIDA KISMEN DOLU TANK:
Birden fazla tankın kısmen dolu olması toplam FSE'yi kritik seviyeye çıkarır.

2. FSE HESABININ İHMALİ:
GM hesabında serbest yüzey düzeltmesinin yapılmaması.

3. ANİ GM KAYBI:
Yük veya balast operasyonu sırasında ani FSE artışı.

ÖRNEK KAZALAR:
- Bulk carrier alabora (çok sayıda kısmen dolu ambar)
- Tanker devrilmesi (bölmeler arası sıvı transferi)
- Balıkçı gemisi batması (haznelerin açık bırakılması)

Önlem: Tankları tam dolu veya boş tutmak, FSE'yi sürekli izlemek.`,
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
    content: `GM yorumlama hataları:

1. ÇOK YÜKSEK GM İYİDİR YANILGISI:
Çok yüksek GM sert salınıma (stiff ship) yol açar:
- Kısa yalpa periyodu
- Yük hasarı riski
- Personel rahatsızlığı
- Yapısal stres

2. DÜZ OTURMA HER ZAMAN İYİDİR YANILGISI:
Bazı gemilerde optimum trim değerleri yakıt verimliliğini artırır.

3. NEGATİF GM FARKINDA OLUNMAMASI:
Loll açısı (unstabil denge) yanlış yorumlanabilir:
- Rüzgâr etkisi sanılır
- Dengeleme girişimi durumu kötüleştirir

4. STATİK VS DİNAMİK KARIŞIKLIĞI:
Yeterli GM, yeterli dinamik stabilite anlamına gelmez.`,
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
      "Loll durumunda düşük bordaya balast alınmamalıdır",
      "Önce en düşük tanklara su alınmalıdır",
    ],
  },
  "trim-operation-errors": {
    title: "Trim Kaynaklı Operasyon Hataları",
    introduction: "Yanlış trim değerleri pervane verimliliğini, manevrabiliteyi ve güvenliği olumsuz etkiler.",
    content: `Trim kaynaklı operasyon hataları:

1. AŞIRI BAŞ TRİMİ:
- Güverte ıslaklığı
- Azalan görüş
- Baş dalgalanma riski
- Pervane verimliliği kaybı

2. AŞIRI KIÇ TRİMİ:
- Dümen etkisi azalması
- Prova jeti verimsizliği
- Limanda manevra zorluğu
- Karina sürtünme artışı

3. TRİM HESAP HATALARI:
- LCF'nin yanlış kullanımı
- MCT değerinin yanlış alınması
- Ara durumların ihmal edilmesi

4. YAKIT TÜKETİMİ ETKİSİ:
Seyir sırasında yakıt tüketimi trimi değiştirir.`,
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
    content: `PSC (Port State Control) stabilite denetimi odaklanır:

BELGE KONTROLLERI:
- Stabilite kitapçığının güncelliği
- Yükleme bilgisayarı onayı
- Eğitim kayıtları
- Stabilite hesapları

FİZİKSEL KONTROLLER:
- Draft okuma ve hesap karşılaştırması
- Tank durumu ve hesaptaki uyum
- Su geçirmez kapıların durumu
- Bağlama ekipmanları

YAYGIN BULGULAR:
- Stabilite hesabı güncel değil
- Draft hesap uyumsuzluğu
- Su geçirmez kapılar açık
- Yük bağlama eksik
- FSE hesaba dahil değil

Tutulma: Kritik bulgularda gemi kalkmaya izin verilmez.`,
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
      "Tutulma mali ve operasyonel kayıp demektir",
      "ISM Code gereği önleyici prosedürler uygulanmalıdır",
    ],
  },

  "inclining-experiment": {
    title: "Meyil Deneyi (Inclining Experiment)",
    introduction: "Meyil deneyi, geminin boş (lightship) durumdaki ağırlık merkezi yüksekliğini (KG) ve boş gemi deplasmanını deneysel olarak belirlemek için yapılan kontrollü bir testtir. Tüm stabilite hesaplarının dayandığı KG değeri bu deneyle elde edilir.",
    content: `AMAÇ:

Bir geminin stabilite hesapları, boş gemi (lightship) ağırlığı ve bu ağırlığın merkezinin yüksekliği (KG) bilinmeden yapılamaz. Meyil deneyi, gemiyi bilinen ağırlıklarla kontrollü biçimde yatırarak KG'yi doğrudan ölçer. Yeni inşa edilen veya büyük değişiklik geçiren gemilerde zorunludur.

YÖNTEM:

Güvertede bilinen bir ağırlık (w) enine olarak bilinen bir mesafe (d) kadar kaydırılır. Bu, gemiye bir yatırma momenti uygular ve gemi küçük bir açı (θ) kadar meyleder. Meyil, sarkaç (plumb line/pendulum) veya U-borusu (manometer) ile ölçülür. Ölçülen meyilden geminin metasantr yüksekliği (GM) hesaplanır; KM hidrostatik tablolardan bilindiğinden KG = KM − GM bulunur.

FORMÜL:

Yatırma momenti = w × d. Bu moment, GM ve meyil açısıyla ilişkilidir.

DENEY KOŞULLARI (DOĞRULUK İÇİN):

- Gemi mümkün olduğunca boş ve "as nearly complete as possible" durumda olmalı.
- Sıvı tankları ya tam dolu/boş olmalı (serbest yüzey etkisini sıfırlamak için) ya da serbest yüzey düzeltmesi yapılmalı.
- Rüzgâr, akıntı ve bağlama gerginliği minimumda; gemi serbestçe meyledebilmeli.
- Birkaç farklı ağırlık ve yönde tekrar yapılarak ortalama alınır.
- Bilinmeyen ağırlıklar (artık yük, su, atık) kaydedilir ve düzeltilir.

SONUÇ:

Deneyden elde edilen lightship deplasmanı ve KG, geminin Stability Booklet'ine işlenir; tüm yükleme durumlarının stabilite hesapları bu temel değerlere göre yapılır.`,
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
      "Serbest yüzeyli tanklar veya bağlama gerginliği sonucu ciddi biçimde saptırır",
      "Hatalı KG, tüm yükleme stabilite hesaplarını güvenilmez kılar",
    ],
  },

  "probabilistic-damage-stability": {
    title: "Olasılıksal Hasar Stabilitesi",
    introduction: "Hasar stabilitesinin değerlendirilmesinde iki yaklaşım vardır: deterministik (belirli hasar senaryolarına göre) ve olasılıksal (hasarın istatistiksel olasılığına göre). SOLAS, kuru yük ve yolcu gemilerinde olasılıksal yöntemi (probabilistic damage stability) esas alır.",
    content: `İKİ YAKLAŞIM:

DETERMİNİSTİK YÖNTEM:
Önceden tanımlanmış belirli hasar senaryoları (örn. bir/iki bölmenin su alması) ele alınır ve gemi her senaryoda belirli kriterleri sağlamalıdır. "Bir bölme/iki bölme standardı" (one/two-compartment standard) bu mantığın klasik ifadesidir. Anlaşılması kolaydır ancak gerçek hasarın çeşitliliğini tam yansıtmaz.

OLASILIKSAL YÖNTEM (SOLAS II-1):
Gerçek çatışma/hasar istatistiklerine dayanır. Hasarın gemi boyunca herhangi bir yerde, çeşitli boyut ve derinlikte oluşabileceği olasılıkları dikkate alınır. Temel ölçüt, "Attained Subdivision Index (A)" değerinin gerekli "Required Subdivision Index (R)" değerinden büyük/eşit olmasıdır.

A ve R İNDEKSLERİ:

- R (Required Index): Geminin tipine ve büyüklüğüne (yolcu sayısı, boy) bağlı olarak belirlenen, sağlanması gereken asgari bölmelendirme düzeyidir.
- A (Attained Index): Geminin gerçek bölmelendirme düzenine göre hesaplanan, hasar sonrası hayatta kalma olasılığını yansıtan değerdir. A, her bölme/bölme grubu için hasar olasılığı (p) ile o hasardan sonra hayatta kalma olasılığının (s) çarpımlarının toplamı olarak hesaplanır.

ÖLÇÜT:

A ≥ R sağlanmalıdır. Ayrıca belirli kısmi indeksler ve en kötü durum koşulları da kontrol edilir.

DENİZCİLİK ÖNEMİ:

Olasılıksal yaklaşım, tasarımcıya bölmelendirmede esneklik tanırken istatistiksel olarak daha güvenli gemiler üretmeyi hedefler. Zabit açısından önemli olan, geminin onaylı yükleme/hasar durumlarının Stability Booklet ve hasar kontrol bilgilerinde tanımlı olduğunu ve bunlara uyulması gerektiğini bilmektir.`,
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
    content: `OLAY:

Gemi kuru havuza alınırken su boşaltılır; gemi alçalır ve önce (genellikle trim nedeniyle) kıç omurga bloklara temas eder. Bu temas noktasında bloklar yukarı doğru bir tepki kuvveti (P) uygular. Bu kuvvet, etkin olarak omurga hizasından aşağı bir noktadan yukarı destek anlamına gelir ve geminin metasantr yüksekliğini (GM) AZALTIR; yani sanki KG yükselmiş gibi davranır.

KRİTİK AN:

En tehlikeli an, geminin tam olarak oturmadan önce, ağırlığın bir kısmının hâlâ yüzme ile bir kısmının bloklarla taşındığı geçiş anıdır. Bu anda GM yetersiz kalırsa gemi havuz içinde devrilebilir veya bloklardan kayabilir. Bu yüzden havuzlama öncesi yeterli başlangıç GM ve uygun trim sağlanmalıdır.

P KUVVETİ VE GM KAYBI:

Blokların uyguladığı tepki kuvveti P, su seviyesi düştükçe artar. P'nin neden olduğu sanal KG artışı (ve GM kaybı), P × KM / W ile orantılı olarak değerlendirilir. Bu nedenle:
- Havuzlamaya küçük bir kıç trimi ile girilir (temas kontrollü olsun diye).
- Aşırı trim, tek noktada büyük P oluşturup riski artırır.
- Yeterli başlangıç GM şarttır.

ÖNLEMLER:

- Havuzlama öncesi yükleme/balast ayarıyla uygun trim ve yeterli GM sağlanır.
- Yan destek blokları (side/bilge blocks) ve payandalar (shores) gemi oturdukça devreye girer.
- Stabilite, geminin tüm ağırlığı bloklara binene (fully landed) kadar izlenir; tam oturduktan sonra gemi stabildir.`,
    formula: {
      name: "Havuzlamada GM Kaybı (yaklaşık)",
      expression: "GM kaybı ≈ (P × KM) / W",
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
      "Yetersiz GM veya aşırı trim ile havuzlama, gemi bloklardan kayabilir/devrilebilir",
      "Geçiş anında stabilite sürekli izlenmelidir",
    ],
  },
};

export default function StabilityTopicsPage() {
  return (
    <BookSheet title="DERSLER">
      <h1 className="bs-h2 text-center" style={{ borderBottom: "none" }}>Gemi Stabilitesi</h1>
      <div className="bs-fleuron" aria-hidden="true">❦</div>
      <BookTopicReader
        topics={stabilityTopics}
        contents={topicContents}
        resources={[
          { title: "Stabilite Hesaplamaları", href: "/stability/calculations" },
          { title: "Stabilite Formülleri", href: "/stability/formulas" },
          { title: "IMO Kuralları", href: "/stability/rules" }
        ]}
      />
    </BookSheet>
  );
}
