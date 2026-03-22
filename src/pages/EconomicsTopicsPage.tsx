import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  FileText,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Circle,
  X,
  DollarSign,
  TrendingUp,
  Ship,
  Clock,
  FileCheck,
  Scale,
  Briefcase,
  Landmark,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EconSubTopic {
  id: string;
  title: string;
  hasContent: boolean;
}

interface EconMainTopic {
  id: string;
  number: number;
  title: string;
  icon: React.ElementType;
  subtopics: EconSubTopic[];
}

const econTopics: EconMainTopic[] = [
  {
    id: "shipping-market",
    number: 1,
    title: "Denizcilik Piyasası",
    icon: TrendingUp,
    subtopics: [
      { id: "market-overview", title: "Denizcilik piyasası genel yapısı", hasContent: true },
      { id: "supply-demand", title: "Arz-talep dengesi ve fiyat oluşumu", hasContent: true },
      { id: "shipping-cycles", title: "Denizcilik çevrimleri (shipping cycles)", hasContent: true },
      { id: "market-indices", title: "BDI ve piyasa endeksleri", hasContent: true },
    ],
  },
  {
    id: "chartering",
    number: 2,
    title: "Charter (Kiralama) Türleri",
    icon: FileCheck,
    subtopics: [
      { id: "voyage-charter", title: "Voyage Charter (sefer kiralaması)", hasContent: true },
      { id: "time-charter", title: "Time Charter (zaman kiralaması)", hasContent: true },
      { id: "bareboat-charter", title: "Bareboat Charter (çıplak gövde kiralaması)", hasContent: true },
      { id: "coa", title: "COA (Contract of Affreightment)", hasContent: true },
    ],
  },
  {
    id: "freight-calculation",
    number: 3,
    title: "Navlun ve TCE Hesaplama",
    icon: DollarSign,
    subtopics: [
      { id: "freight-basics", title: "Navlun kavramı ve hesaplama", hasContent: true },
      { id: "tce-calculation", title: "TCE (Time Charter Equivalent) hesaplama", hasContent: true },
      { id: "worldscale", title: "Worldscale sistemi", hasContent: true },
      { id: "bunker-cost", title: "Yakıt maliyeti hesaplaması", hasContent: true },
    ],
  },
  {
    id: "laytime-demurrage",
    number: 4,
    title: "Laytime ve Demurrage",
    icon: Clock,
    subtopics: [
      { id: "laytime-basics", title: "Laytime kavramı ve hesaplama", hasContent: true },
      { id: "notice-of-readiness", title: "Notice of Readiness (NOR)", hasContent: true },
      { id: "demurrage-calc", title: "Demurrage hesaplaması", hasContent: true },
      { id: "despatch", title: "Despatch (erken yükleme/boşaltma primi)", hasContent: true },
    ],
  },
  {
    id: "voyage-estimation",
    number: 5,
    title: "Sefer Tahmini ve Maliyet Analizi",
    icon: Ship,
    subtopics: [
      { id: "voyage-costs", title: "Sefer maliyetleri ve bileşenleri", hasContent: true },
      { id: "voyage-estimation-calc", title: "Sefer tahmini hesaplama", hasContent: true },
      { id: "profit-loss", title: "Kâr-zarar analizi", hasContent: true },
    ],
  },
  {
    id: "ship-finance",
    number: 6,
    title: "Gemi Finansmanı ve Değerleme",
    icon: Landmark,
    subtopics: [
      { id: "ship-acquisition", title: "Gemi edinim yöntemleri", hasContent: true },
      { id: "ship-valuation", title: "Gemi değerleme yöntemleri", hasContent: true },
      { id: "depreciation", title: "Amortisman hesaplaması", hasContent: true },
    ],
  },
  {
    id: "maritime-insurance",
    number: 7,
    title: "Deniz Sigortası",
    icon: Scale,
    subtopics: [
      { id: "hull-machinery", title: "Tekne ve Makine (H&M) sigortası", hasContent: true },
      { id: "pi-club", title: "P&I Kulüpleri ve sorumluluk sigortası", hasContent: true },
      { id: "cargo-insurance", title: "Yük sigortası ve klozlar", hasContent: true },
    ],
  },
  {
    id: "maritime-contracts",
    number: 8,
    title: "Denizcilik Sözleşmeleri ve Hukuk",
    icon: Briefcase,
    subtopics: [
      { id: "charter-party", title: "Charter party formları", hasContent: true },
      { id: "bill-of-lading", title: "Konşimento (Bill of Lading)", hasContent: true },
      { id: "maritime-claims", title: "Denizcilik alacakları ve tahkim", hasContent: true },
    ],
  },
];

interface TopicContent {
  title: string;
  introduction: string;
  content: string;
  bulletPoints?: string[];
  examples?: { problem: string; solution: string }[];
  formula?: { name: string; expression: string; description: string };
  keyPoints?: string[];
  warnings?: string[];
}

const topicContents: Record<string, TopicContent> = {
  // =====================================================
  // BÖLÜM 1 - DENİZCİLİK PİYASASI
  // =====================================================
  "market-overview": {
    title: "Denizcilik Piyasası Genel Yapısı",
    introduction: "Denizcilik piyasası, dünya ticaretinin %80'inden fazlasının taşındığı, arz ve talebin sürekli değiştiği küresel bir ekonomik ekosistemdir.",
    content: `PİYASA YAPISI:

Denizcilik piyasası dört alt piyasadan oluşur:

1. NAVLUN PİYASASI (Freight Market):
Yük taşıma hizmetinin alınıp satıldığı piyasadır. Navlun oranları arz (mevcut gemi tonajı) ve talep (taşınacak yük miktarı) dengesine göre belirlenir.

2. İKİNCİ EL GEMİ PİYASASI (Sale & Purchase Market):
Mevcut gemilerin alınıp satıldığı piyasadır. Gemi fiyatları navlun oranları, gemi yaşı, tipi ve genel piyasa beklentileriyle şekillenir.

3. YENİ İNŞA PİYASASI (Newbuilding Market):
Tersanelere yeni gemi siparişi verilen piyasadır. Sipariş miktarı gelecek piyasa beklentilerine bağlıdır. Teslim süresi genellikle 2-4 yıldır.

4. HURDA PİYASASI (Demolition/Scrap Market):
Ekonomik ömrünü tamamlamış gemilerin söküm için satıldığı piyasadır. Hurda fiyatları çelik fiyatlarıyla doğrudan ilişkilidir.

PİYASA KATILIMCILARI:

- Armatör (Ship Owner): Geminin sahibi
- Kiracı (Charterer): Gemiyi kiralayan taraf (genellikle yük sahibi veya tüccar)
- Broker: Armatör ile kiracı arasında aracılık yapan kişi/kurum
- Operatör: Gemiyi ticari olarak işleten taraf`,
    bulletPoints: [
      "4 alt piyasa: navlun, ikinci el, yeni inşa, hurda",
      "Navlun oranları arz-talep dengesine göre belirlenir",
      "Broker armatör ile kiracı arasında aracılık yapar",
    ],
    keyPoints: [
      "Dünya ticaretinin %80+'ı denizyoluyla taşınır",
      "Gemi fiyatları ve navlun oranları birbirleriyle koreledir",
      "Yeni inşa siparişleri gelecek beklentilerine bağlıdır; teslim 2-4 yıl",
    ],
  },
  "supply-demand": {
    title: "Arz-Talep Dengesi ve Fiyat Oluşumu",
    introduction: "Denizcilik piyasasında navlun oranları, mevcut gemi tonajı (arz) ile taşınacak yük miktarı (talep) arasındaki dengeye göre oluşur.",
    content: `ARZ TARAFI:

Arz, dünya ticaret filosunun toplam taşıma kapasitesidir (DWT bazında).

Arzı etkileyen faktörler:
1. Filo büyüklüğü: Mevcut gemi sayısı ve tonajı
2. Yeni inşa teslimatları: Tersanelerden teslim alınan yeni gemiler
3. Hurdaya çıkan gemiler: Söküm için ayrılan gemiler
4. Filo verimliliği: Hız (slow steaming arzı etkiler), bekleme süreleri
5. Lay-up: Düşük piyasada gemilerin devreden çıkarılması

TALEP TARAFI:

Talep, dünya ticaretinin hacmi ve yapısıyla belirlenir.

Talebi etkileyen faktörler:
1. Küresel ekonomik büyüme (GSYİH)
2. Uluslararası ticaret hacmi
3. Emtia fiyatları
4. Jeopolitik faktörler (savaş, ambargo, kanal kapanması)
5. Mevsimsel değişimler
6. Ton-mil talebi: Yük miktarı × taşıma mesafesi

FİYAT OLUŞUMU:

Arz > Talep → navlun oranları düşer (yumuşak piyasa)
Talep > Arz → navlun oranları yükselir (sert piyasa)

Denizcilikte arz kısa vadede esnek değildir (yeni gemi inşası 2-4 yıl sürer); bu nedenle talep değişimleri fiyatlarda aşırı dalgalanmalara yol açar.`,
    bulletPoints: [
      "Arz = mevcut filo kapasitesi; kısa vadede esnek değildir",
      "Talep = ton-mil cinsinden ticaret hacmi",
      "Arz esneksizliği navlun dalgalanmalarının temel sebebidir",
    ],
    keyPoints: [
      "Slow steaming efektif arzı azaltarak navlunları destekler",
      "Ton-mil = yük miktarı × taşıma mesafesi; mesafe arttıkça talep artar",
      "Yeni gemi siparişi 2-4 yıl sonra arzı artırır; gecikme etkisi",
    ],
  },
  "shipping-cycles": {
    title: "Denizcilik Çevrimleri (Shipping Cycles)",
    introduction: "Denizcilik piyasası, tarihsel olarak 7-10 yıllık çevrimlerle yükseliş ve düşüş dönemleri yaşar.",
    content: `ÇEVRİM AŞAMALARI:

Martin Stopford'un klasik denizcilik çevrimi modeli dört aşamadan oluşur:

1. DİP (Trough):
Navlun oranları işletme maliyetlerinin altındadır. Gemiler lay-up'a alınır veya hurda olarak satılır. Yeni sipariş yoktur. Armatörler zarar eder.

2. TOPARLANMA (Recovery):
Arz azalması ve/veya talep artışıyla navlunlar yükselmeye başlar. Gemiler tekrar devreye girer. Armatörler başabaş noktasına ulaşır.

3. ZİRVE (Peak/Plateau):
Navlunlar yüksek, kârlılık güçlüdür. Gemi fiyatları hızla artar. Tersanelere çok sayıda yeni sipariş verilir. Piyasada aşırı iyimserlik.

4. DÜŞÜŞ (Collapse):
Aşırı sipariş verilen yeni gemiler teslim olmaya başlar; arz fazlası oluşur. Navlunlar hızla düşer. Gemi fiyatları çöker.

TARİHSEL ÖRNEKLER:

2003-2008 Super Cycle: Çin'in endüstriyel büyümesi talep patlamasına yol açtı. BDI 11.793 puana çıktı (Mayıs 2008). 2008 finansal krizinde BDI 663'e düştü (%94 kayıp).

ÇEVRIM SÜRESİ:

Tipik süre 7-10 yıldır ancak süper çevrimler ve kısa dönemli çevrimler de mevcuttur. Çevrimin süresi, sipariş defteri (orderbook) büyüklüğü ve küresel ekonomik koşullara bağlıdır.`,
    bulletPoints: [
      "4 aşama: dip → toparlanma → zirve → düşüş",
      "Tipik çevrim süresi 7-10 yıl",
      "2008: BDI 11.793 → 663 (%94 düşüş) tarihin en sert çöküşü",
    ],
    keyPoints: [
      "Zirvedeki aşırı sipariş, bir sonraki düşüşün temel sebebidir",
      "Arz esneksizliği çevrimlerin şiddetini artırır",
      "Stopford modeli denizcilik ekonomisinin temel çerçevesidir",
    ],
  },
  "market-indices": {
    title: "BDI ve Piyasa Endeksleri",
    introduction: "Baltic Dry Index (BDI), dökme yük navlun piyasasının en önemli göstergesi olup küresel ticaret aktivitesinin barometresi olarak kabul edilir.",
    content: `BDI (BALTIC DRY INDEX):

BDI, Baltic Exchange tarafından Londra'da günlük olarak yayınlanır. Dört alt endeksin ağırlıklı ortalamasıdır:

1. BCI (Baltic Capesize Index): 180.000+ DWT gemiler. Demir cevheri ve kömür rotaları.
2. BPI (Baltic Panamax Index): 65.000-80.000 DWT. Tahıl, kömür, mineraller.
3. BSI (Baltic Supramax Index): 52.000-58.000 DWT. Çeşitli dökme yükler.
4. BHSI (Baltic Handysize Index): 28.000-38.000 DWT. Bölgesel dökme yük taşımacılığı.

BDI NASIL HESAPLANIR:

BDI = (BCI + BPI + BSI + BHSI) / 4 (basitleştirilmiş)

Her alt endeks, belirli rotalardaki günlük kiralama oranlarının ortalamasıyla oluşturulur. Referans tarihi 1985 = 1.000 puan.

DİĞER ÖNEMLİ ENDEKSLER:

BDTI (Baltic Dirty Tanker Index): Ham petrol tankeri navlunları
BCTI (Baltic Clean Tanker Index): Ürün tankeri navlunları
SCFI (Shanghai Containerized Freight Index): Konteyner navlunları
WCI (World Container Index): Drewry konteyner endeksi
Worldscale: Tanker navlun referans endeksi

BDI'NIN EKONOMİK ÖNEMİ:

BDI, spekülasyona açık olmadığı için (gemi boşken yük taşınmaz) gerçek ekonomik aktiviteyi yansıttığı kabul edilir. Bu nedenle makroekonomik analizlerde ve emtia piyasalarında öncü gösterge olarak kullanılır.`,
    formula: {
      name: "BDI Hesaplaması (Basitleştirilmiş)",
      expression: "BDI = (BCI + BPI + BSI + BHSI) / 4",
      description: "Her alt endeks belirli rotalardaki günlük T/C oranlarının ortalamasıdır. 1985 = 1.000 puan referans.",
    },
    bulletPoints: [
      "BDI 4 alt endeksten oluşur: BCI, BPI, BSI, BHSI",
      "Baltic Exchange Londra'da günlük yayınlar",
      "Spekülasyona açık olmadığı için gerçek aktiviteyi yansıtır",
    ],
    keyPoints: [
      "BDI = dökme yük piyasası; BDTI = tanker piyasası",
      "BDI makroekonomik öncü gösterge olarak kabul edilir",
      "Capesize gemiler BDI'nin en volatil bileşenidir",
    ],
  },

  // =====================================================
  // BÖLÜM 2 - CHARTER TÜRLERİ
  // =====================================================
  "voyage-charter": {
    title: "Voyage Charter (Sefer Kiralaması)",
    introduction: "Voyage charter, armatörün belirli bir yükü belirli bir limandan diğerine taşımayı taahhüt ettiği kiralama türüdür.",
    content: `VOYAGE CHARTER YAPISI:

Sefer kiralamasında armatör:
- Gemiyi donatır ve mürettebatı sağlar
- Yakıt masraflarını karşılar
- Liman masraflarını (çoğunlukla) karşılar
- Belirlenen yükü A limanından B limanına taşır

Kiracı (charterer):
- Navlun (freight) öder
- Yükü hazır bulundurur
- Yükleme/boşaltma süresini (laytime) aşarsa demurrage öder

NAVLUN HESAPLAMA:

Navlun genellikle $/ton bazında belirlenir.

Toplam Navlun = Yük miktarı (ton) × Navlun oranı ($/ton)

Örnek: 50.000 ton demir cevheri × $12/ton = $600.000

ALTERNATİF NAVLUN HESAPLAMA:

Lump sum freight: Yük miktarından bağımsız sabit ücret
Worldscale (tankerler): Referans orana göre yüzdelik belirleme

MASRAF DAĞILIMI (VOYAGE CHARTER):

Armatör tarafı: yakıt, mürettebat, sigorta, bakım, liman masrafları (genellikle)
Kiracı tarafı: navlun, yükleme/boşaltma masrafları (anlaşmaya bağlı)

SÖZLEŞME: Voyage charter party (C/P) formu kullanılır. Yaygın formlar: GENCON (genel kargo), ASBATANKVOY (tanker).`,
    formula: {
      name: "Voyage Charter Navlun Hesabı",
      expression: "Toplam Navlun = Yük Miktarı (ton) × Navlun Oranı ($/ton)",
      description: "Navlun oranı piyasa koşullarına göre belirlenir. Yük miktarı B/L (konşimento) üzerindeki miktardır.",
    },
    examples: [
      {
        problem: "55.000 ton kömür, Güney Afrika'dan Rotterdam'a, navlun oranı $14,50/ton. Toplam navlunu hesaplayınız.",
        solution: "Toplam Navlun = 55.000 × $14,50 = $797.500",
      },
    ],
    bulletPoints: [
      "Armatör yakıt, mürettebat ve liman masraflarını karşılar",
      "Navlun genellikle $/ton bazında hesaplanır",
      "GENCON en yaygın voyage charter party formudur",
    ],
    keyPoints: [
      "Voyage charter'da operasyonel risk armatöre aittir",
      "Laytime aşımı demurrage'a yol açar",
      "Lump sum freight yük miktarından bağımsız sabit ücrettir",
    ],
  },
  "time-charter": {
    title: "Time Charter (Zaman Kiralaması)",
    introduction: "Time charter, armatörün gemiyi belirli bir süre için kiracının emrine verdiği kiralama türüdür; kiracı yakıt ve liman masraflarını üstlenir.",
    content: `TIME CHARTER YAPISI:

Armatör:
- Gemiyi donatılmış ve mürettebatlı olarak teslim eder
- Mürettebat, sigorta, bakım ve sınıflandırma masraflarını karşılar
- Geminin teknik işletmesinden sorumludur

Kiracı:
- Günlük/aylık hire (kira) öder
- Yakıt (bunker) masraflarını karşılar
- Liman masraflarını karşılar
- Geminin ticari işletmesinden sorumludur (yük seçimi, rota)

HIRE HESAPLAMA:

Hire genellikle $/gün bazında belirlenir.

Toplam Hire = Günlük Hire ($/gün) × Süre (gün)

Örnek: $15.000/gün × 365 gün = $5.475.000/yıl

OFF-HIRE:

Geminin kiracının kullanımına hazır olmadığı dönemlerde (arıza, kuru havuz, mürettebat sorunu) hire ödenmez. Bu duruma "off-hire" denir. Off-hire süresi charter party'deki klozlara göre belirlenir.

SÖZLEŞME FORMLARI:

NYPE (New York Produce Exchange): En yaygın time charter party formu
BALTIME: Alternatif form
SHELLTIME: Tankerler için`,
    formula: {
      name: "Time Charter Hire Hesabı",
      expression: "Toplam Hire = Günlük Hire ($/gün) × Charter Süresi (gün)",
      description: "Off-hire günleri toplam süreden düşülür.",
    },
    examples: [
      {
        problem: "12 aylık time charter, günlük hire $18.500, off-hire 5 gün. Toplam hire gelirini hesaplayınız.",
        solution: "Charter süresi = 365 − 5 = 360 gün. Toplam Hire = 360 × $18.500 = $6.660.000",
      },
    ],
    bulletPoints: [
      "Kiracı yakıt ve liman masraflarını karşılar",
      "Hire $/gün bazında belirlenir",
      "Off-hire: gemi hazır olmadığında hire ödenmez",
    ],
    keyPoints: [
      "Time charter'da ticari risk kiracıya, teknik risk armatöre aittir",
      "NYPE en yaygın time charter party formudur",
      "Off-hire klozu charter party'nin en çok tartışılan bölümüdür",
    ],
  },
  "bareboat-charter": {
    title: "Bareboat Charter (Çıplak Gövde Kiralaması)",
    introduction: "Bareboat charter, armatörün gemiyi mürettebatsız ve donanımsız olarak kiracıya teslim ettiği, kiracının geminin tam operasyonel kontrolünü üstlendiği kiralama türüdür.",
    content: `BAREBOAT CHARTER YAPISI:

Bu kiralama türünde kiracı (bareboat charterer) fiilen geminin disponent owner'ı (sahipmiş gibi işleten) konumundadır.

Armatör:
- Gemiyi çıplak gövde olarak teslim eder
- Geminin mülkiyet hakkını elinde tutar

Kiracı:
- Mürettebat temin eder ve istihdam eder
- Tüm işletme masraflarını karşılar (yakıt, liman, sigorta, bakım)
- Geminin teknik ve ticari işletmesinden tam sorumludur
- Hire (kira) öder

SÜRESİ: Genellikle uzun vadeli (5-20 yıl). Finansman amaçlı kullanımda gemi ömrü boyunca olabilir.

FİNANSMAN ARACI OLARAK:

Bareboat charter sıklıkla gemi finansmanı aracı olarak kullanılır:
1. Banka gemiyi satın alır veya finanse eder
2. Armatöre bareboat charter ile kiralar
3. Charter süresi sonunda gemi armatöre devredilir (hire-purchase)

Bu yapı, operasyonel leasing'e benzer.

SÖZLEŞME: BARECON (BIMCO Bareboat Charter Party) en yaygın formdur.`,
    bulletPoints: [
      "Kiracı mürettebat dahil tüm masrafları karşılar",
      "Kiracı geminin disponent owner'ıdır",
      "Genellikle uzun vadeli (5-20 yıl) sözleşmedir",
    ],
    keyPoints: [
      "Bareboat charter'da tüm risk kiracıya aittir",
      "Finansman aracı olarak yaygın kullanılır (hire-purchase)",
      "BARECON BIMCO'nun standart bareboat formudur",
    ],
  },
  "coa": {
    title: "COA (Contract of Affreightment)",
    introduction: "COA, belirli bir süre içinde belirli miktarda yükün taşınmasını taahhüt eden uzun vadeli navlun sözleşmesidir; belirli bir gemi belirlenmez.",
    content: `COA YAPISI:

COA'da armatör, belirli bir dönem içinde (örneğin 1-3 yıl) belirli bir toplam miktarda yükü (örneğin yılda 500.000 ton) belirli rotada taşımayı taahhüt eder. Taşıma, birden fazla seferle gerçekleştirilir.

ÖZELLİKLERİ:

1. Gemi belirtilmez: Armatör uygun gemiyi seçer (substitution hakkı)
2. Yük miktarı ve takvim belirlidir: yıllık veya aylık bazda
3. Navlun oranı sabit veya endekse bağlıdır
4. Her sefer ayrı bir voyage charter gibi işler ancak navlun önceden belirlenmiştir

AVANTAJLAR:

Armatör için:
- Uzun vadeli gelir güvencesi
- Filo planlaması kolaylaşır

Kiracı için:
- Uzun vadeli taşıma güvencesi
- Navlun oranı önceden bilinir
- Piyasa dalgalanmalarından korunma (hedging)

DEZAVANTAJLAR:

- Piyasa yükselirse armatör düşük navlunda taşımaya devam eder
- Piyasa düşerse kiracı yüksek navlun öder
- Fiyat riski iki taraf için de mevcuttur

KULLANIM ALANLARI:

Demir cevheri, kömür, boksit gibi büyük hacimli ve düzenli taşınan emtialarda yaygındır. Büyük maden şirketleri (BHP, Rio Tinto, Vale) COA kullanır.`,
    bulletPoints: [
      "COA'da belirli bir gemi değil, taşıma taahhüdü vardır",
      "Uzun vadeli gelir güvencesi sağlar",
      "Demir cevheri, kömür gibi büyük hacimli emtialarda yaygın",
    ],
    keyPoints: [
      "COA = uzun vadeli navlun sözleşmesi; gemi belirtilmez",
      "Armatörün substitution hakkı vardır",
      "Piyasa riski her iki taraf için de mevcuttur",
    ],
  },

  // =====================================================
  // BÖLÜM 3 - NAVLUN VE TCE
  // =====================================================
  "freight-basics": {
    title: "Navlun Kavramı ve Hesaplama",
    introduction: "Navlun (freight), deniz yoluyla yük taşıma karşılığında ödenen ücrettir ve denizcilik ekonomisinin temel gelir kalemini oluşturur.",
    content: `NAVLUN TÜRLERİ:

1. Birim Navlun: $/ton, $/m³ veya $/TEU bazında hesaplanır.
   Toplam = Yük miktarı × Birim oran

2. Lump Sum Navlun: Yük miktarından bağımsız sabit ücret.
   Armatör için avantajlı: stowage factor kötü olsa da gelir sabit.

3. Worldscale (WS): Tanker piyasasında kullanılır. Referans orana göre yüzdelik.
   Gerçek navlun = WS oranı × Flat Rate

4. Time Charter Equivalent (TCE): Farklı charter türlerini karşılaştırmak için günlük bazda navlun geliri.

ÖDEME KOŞULLARI:

- Freight Prepaid: Navlun yükleme limanında peşin ödenir.
- Freight Collect: Navlun boşaltma limanında ödenir.
- Navlun genellikle konşimento (B/L) üzerindeki miktara göre hesaplanır.

ADDRESS COMMISSION VE BROKERAGE:

Address Commission: Kiracıya ödenen komisyon (genellikle %3,75)
Brokerage: Broker'a ödenen komisyon (genellikle %1,25)
Toplam: navlunun %5'i standart komisyon oranıdır.

Net Navlun = Brüt Navlun × (1 − komisyon oranı)`,
    formula: {
      name: "Net Navlun Hesabı",
      expression: "Net Navlun = Brüt Navlun × (1 − Komisyon %)",
      description: "Standart komisyon: %3,75 address commission + %1,25 brokerage = %5 toplam.",
    },
    examples: [
      {
        problem: "60.000 ton buğday, navlun $18/ton, %3,75 address commission + %1,25 brokerage. Net navlunu hesaplayınız.",
        solution: "Brüt Navlun = 60.000 × $18 = $1.080.000. Toplam komisyon = %5. Net Navlun = $1.080.000 × (1 − 0,05) = $1.080.000 × 0,95 = $1.026.000.",
      },
    ],
    bulletPoints: [
      "4 navlun türü: birim, lump sum, Worldscale, TCE",
      "Standart komisyon: %3,75 address + %1,25 brokerage = %5",
      "Freight prepaid veya collect olarak ödenebilir",
    ],
    keyPoints: [
      "Net navlun = brüt navlun − komisyonlar",
      "B/L miktarı navlun hesaplamasının temelini oluşturur",
      "Lump sum navlun stowage factor riskini kiracıya yükler",
    ],
  },
  "tce-calculation": {
    title: "TCE (Time Charter Equivalent) Hesaplama",
    introduction: "TCE, voyage charter gelirlerini günlük bazda time charter eşdeğerine dönüştüren ve farklı seferlerin kârlılığını karşılaştırmaya yarayan temel performans göstergesidir.",
    content: `TCE FORMÜLÜ:

TCE = (Net Navlun Geliri − Sefer Maliyetleri) / Sefer Süresi (gün)

Birim: $/gün

SEFER MALİYETLERİ (Voyage Costs):
- Yakıt maliyeti (bunker)
- Liman masrafları
- Kanal geçiş ücretleri (Süveyş, Panama)
- Acentelik masrafları

SEFER SÜRESİ:
Toplam gün = Denizde geçen gün + Limanda geçen gün

Denizde geçen gün = Mesafe (deniz mili) / Hız (knot) / 24

TCE hesaplamasında yakıt maliyeti en büyük değişken kalemdir. Denizde tüketim ve limanda tüketim ayrı hesaplanır.`,
    formula: {
      name: "TCE Hesaplaması",
      expression: "TCE = (Navlun − Sefer Maliyetleri) / Sefer Süresi",
      description: "TCE $/gün bazında hesaplanır. Tüm voyage charter tekliflerini time charter bazında karşılaştırmak için kullanılır.",
    },
    examples: [
      {
        problem: "Net navlun $800.000. Yakıt: $180.000, liman masrafları: $45.000, kanal: $60.000. Sefer süresi 28 gün. TCE?",
        solution: "Sefer Maliyetleri = $180.000 + $45.000 + $60.000 = $285.000. TCE = ($800.000 − $285.000) / 28 = $515.000 / 28 = $18.393/gün.",
      },
    ],
    bulletPoints: [
      "TCE = (Net Navlun − Sefer Maliyetleri) / Sefer Süresi",
      "Yakıt en büyük değişken maliyettir",
      "TCE farklı seferlerin kârlılığını karşılaştırır",
    ],
    keyPoints: [
      "TCE > Time Charter hire → voyage charter daha kârlı",
      "TCE hesabında komisyonlar net navlundan düşülmüş olmalıdır",
      "Denizde geçen gün = mesafe / hız / 24",
    ],
  },
  "worldscale": {
    title: "Worldscale Sistemi",
    introduction: "Worldscale, tanker navlun piyasasında kullanılan ve her rota için referans navlun oranı belirleyen standart bir fiyatlandırma sistemidir.",
    content: `WORLDSCALE NEDİR?

Worldscale (WS), Worldscale Association tarafından her yıl güncellenen bir referans oran tablosudur. Her rota için "flat rate" (WS100) olarak adlandırılan bir temel navlun oranı ($/ton) belirlenir.

NASIL ÇALIŞIR:

Flat rate, standart bir geminin (75.000 DWT tanker) belirli bir rotada başabaş noktasında çalışması için gereken navlun oranıdır.

Piyasa navlunu Worldscale yüzdesi olarak ifade edilir:

Gerçek navlun = WS oranı (%) × Flat rate ($/ton)

Örnek:
Rota: Ras Tanura → Rotterdam
Flat rate: $20,00/ton
Piyasa oranı: WS 65

Navlun = 65/100 × $20,00 = $13,00/ton

WS100 = flat rate = başabaş noktası
WS > 100: armatör kârlı
WS < 100: armatör zarar eder veya düşük kâr

GÜNCELLEME:

Flat rate'ler her yıl 1 Ocak'ta güncellenir. Güncelleme yakıt fiyatları, liman masrafları ve kanal ücretlerindeki değişimleri yansıtır.`,
    formula: {
      name: "Worldscale Navlun Hesabı",
      expression: "Navlun = (WS Oranı / 100) × Flat Rate ($/ton)",
      description: "WS100 = flat rate (başabaş). WS oranı piyasa koşullarına göre değişir.",
    },
    examples: [
      {
        problem: "Flat rate $22,50/ton, piyasa oranı WS 72. 80.000 ton ham petrol. Toplam navlunu hesaplayınız.",
        solution: "Birim navlun = 72/100 × $22,50 = $16,20/ton. Toplam navlun = 80.000 × $16,20 = $1.296.000.",
      },
    ],
    bulletPoints: [
      "WS100 = flat rate = standart başabaş noktası",
      "Piyasa oranı WS yüzdesi olarak ifade edilir",
      "Flat rate'ler her yıl 1 Ocak'ta güncellenir",
    ],
    keyPoints: [
      "Worldscale tanker piyasasının evrensel dilidir",
      "WS > 100 armatör kârlı; WS < 100 düşük kâr/zarar",
      "Flat rate standart 75.000 DWT tanker bazında hesaplanır",
    ],
  },
  "bunker-cost": {
    title: "Yakıt Maliyeti Hesaplaması",
    introduction: "Yakıt (bunker) maliyeti, sefer giderlerinin en büyük kalemini oluşturur ve navlun kârlılığını doğrudan etkiler.",
    content: `YAKIT TÜRLERİ VE FİYATLAR:

HFO (Heavy Fuel Oil): Yüksek kükürtlü (%3,5), en ucuz. Scrubber gerektir.
VLSFO (Very Low Sulphur Fuel Oil): %0,50 kükürt, IMO 2020 uyumlu. Standart yakıt.
LSMGO (Low Sulphur Marine Gas Oil): %0,10 kükürt, ECA bölgeleri. En pahalı.
LNG: Alternatif yakıt, çift yakıtlı motorlarda.

YAKIT TÜKETİM HESABI:

Denizde günlük tüketim: ton/gün (ana makine + yardımcılar)
Limanda günlük tüketim: ton/gün (yalnızca yardımcılar + jeneratörler)

Toplam Yakıt = (Deniz günü × Deniz tüketimi) + (Liman günü × Liman tüketimi)

Toplam Yakıt Maliyeti = Toplam Yakıt (ton) × Yakıt Fiyatı ($/ton)

Denizde geçen gün = Mesafe (NM) / (Hız (knot) × 24)`,
    formula: {
      name: "Yakıt Maliyeti Hesabı",
      expression: "Yakıt Maliyeti = [(D_deniz × C_deniz) + (D_liman × C_liman)] × Fiyat",
      description: "D: gün sayısı, C: günlük tüketim (ton/gün), Fiyat: $/ton. Yakıt türüne göre ayrı hesaplanmalıdır.",
    },
    examples: [
      {
        problem: "4.200 NM mesafe, 14 knot hız. Denizde 32 ton/gün VLSFO ($580/ton), limanda 4 ton/gün (5 gün). Toplam yakıt maliyeti?",
        solution: "Deniz günü = 4.200 / (14 × 24) = 12,5 gün. Deniz yakıtı = 12,5 × 32 = 400 ton. Liman yakıtı = 5 × 4 = 20 ton. Toplam = 420 ton. Maliyet = 420 × $580 = $243.600.",
      },
    ],
    bulletPoints: [
      "VLSFO (0,50%) standart yakıt; LSMGO (0,10%) ECA yakıtı",
      "Yakıt, sefer maliyetlerinin genellikle %50-70'ini oluşturur",
      "Hız düşürme (slow steaming) yakıt maliyetini önemli ölçüde azaltır",
    ],
    keyPoints: [
      "Yakıt tüketimi hızın küpüyle orantılıdır (yaklaşık)",
      "ECA bölgelerinde LSMGO kullanımı maliyeti %30-50 artırabilir",
      "Bunker fiyatları bölgeye göre önemli farklılıklar gösterir (Singapore, Rotterdam, Fujairah)",
    ],
  },

  // =====================================================
  // BÖLÜM 4 - LAYTIME VE DEMURRAGE
  // =====================================================
  "laytime-basics": {
    title: "Laytime Kavramı ve Hesaplama",
    introduction: "Laytime, charter party'de yükleme ve/veya boşaltma için izin verilen süredir; bu sürenin aşılması demurrage'a yol açar.",
    content: `LAYTIME TANIMI:

Laytime, kiracının gemiyi yüklemek ve/veya boşaltmak için kullanabileceği ücretsiz süredir. Charter party'de gün veya saat olarak belirtilir.

LAYTIME BELİRLEME YÖNTEMLERİ:

1. Sabit Laytime: Belirli gün sayısı (örn: 7 gün yükleme, 5 gün boşaltma)
2. Customary Quick Despatch (CQD): Limanın adetiyle uyumlu hızda
3. Oran bazlı: ton/gün (örn: 8.000 ton/gün yükleme oranı)
   Laytime = Yük miktarı / Yükleme oranı

GÜN TÜRLERİ:

Running Days: Kesintisiz, 7/24 sayılır (Pazar, tatil dahil)
Working Days: Yalnızca iş günleri sayılır
Weather Working Days (WWD): Hava koşullarının çalışmaya uygun olduğu iş günleri
SHEX (Sundays and Holidays Excluded): Pazar ve tatiller sayılmaz
SHINC (Sundays and Holidays Included): Pazar ve tatiller dahil

Laytime sayımı, geçerli NOR (Notice of Readiness) verildikten sonra, charter party'de belirtilen süre kadar bekledikten sonra başlar.`,
    formula: {
      name: "Oran Bazlı Laytime Hesabı",
      expression: "Laytime (gün) = Yük Miktarı (ton) / Yükleme Oranı (ton/gün)",
      description: "WWD of 24 consecutive hours SHEX UU (en yaygın laytime tanımı). UU = Unless Used.",
    },
    examples: [
      {
        problem: "52.000 ton kömür, yükleme oranı 8.000 ton/gün. Laytime?",
        solution: "Laytime = 52.000 / 8.000 = 6,5 gün (6 gün 12 saat).",
      },
    ],
    bulletPoints: [
      "Running days: 7/24; WWD: hava uygun iş günleri; SHEX: tatil hariç",
      "Laytime NOR'dan belirli süre sonra başlar",
      "UU (Unless Used): tatilde çalışılırsa laytime'dan düşülmez",
    ],
    keyPoints: [
      "Laytime hesabı demurrage/despatch'ın temelini oluşturur",
      "WWD SHEX UU en yaygın laytime tanımıdır",
      "EIU (Even If Used): tatilde çalışılsa bile laytime durur",
    ],
  },
  "notice-of-readiness": {
    title: "Notice of Readiness (NOR)",
    introduction: "NOR, geminin yükleme/boşaltma için tüm yönleriyle hazır olduğunu kiracıya bildiren yazılı bildirimdir ve laytime sayımının başlamasını tetikler.",
    content: `NOR NEDİR?

Notice of Readiness (NOR), kaptanın veya acentenin kiracıya geminin yükleme/boşaltma için hazır olduğunu bildirdiği resmi belgedir.

NOR GEÇERLİLİK KOŞULLARI:

1. Gemi rıhtıma yanaşmış veya demir sahası/bekleme bölgesinde olmalıdır
2. Gemi tüm yönleriyle hazır olmalıdır (ambarlar temiz, donanım çalışır)
3. Serbest pratika (free pratique) alınmış olmalıdır
4. Gümrük işlemleri tamamlanmış olmalıdır
5. NOR, charter party'de belirtilen saatler içinde verilmelidir

NOR VE LAYTIME BAŞLANGICI:

NOR verilmesinden laytime başlangıcına kadar genellikle bir bekleme süresi vardır:
- Çalışma saatlerinde NOR: genellikle 6 saat sonra laytime başlar
- Mesai dışında NOR: bir sonraki iş gününün 08:00'inde başlar

Bu süre charter party'nin laytime klozunda belirtilir.

WIBON / WIPON:

WIBON (Whether In Berth Or Not): Gemi rıhtıma yanaşmamış olsa bile NOR geçerlidir.
WIPON (Whether In Port Or Not): Gemi liman sınırları içinde olmasa bile NOR geçerlidir (nadiren).

WIBON klozu armatör lehine önemli bir korumadır; rıhtım beklemesi laytime'ı tüketir.`,
    bulletPoints: [
      "NOR geminin hazır olduğunu bildiren resmi belgedir",
      "NOR sonrası genellikle 6 saat bekleme ile laytime başlar",
      "WIBON: rıhtım beklemesinde bile NOR geçerlidir",
    ],
    keyPoints: [
      "NOR geçerliliği laytime hesabının başlangıç noktasıdır",
      "WIBON klozu armatörü rıhtım bekleme riskinden korur",
      "NOR'un charter party'deki koşullara tam uyması zorunludur",
    ],
  },
  "demurrage-calc": {
    title: "Demurrage Hesaplaması",
    introduction: "Demurrage, laytime'ın aşılması durumunda kiracının armatöre ödediği gecikme tazminatıdır.",
    content: `DEMURRAGE HESABI:

Demurrage = Aşılan Süre (gün) × Demurrage Oranı ($/gün)

Demurrage oranı charter party'de sabit olarak belirlenir. Genellikle time charter hire oranından yüksektir.

HESAPLAMA ADIMLARI:

1. İzin verilen laytime'ı belirle
2. Kullanılan süreyi hesapla (gün türüne göre)
3. Aşılan süre = Kullanılan süre − İzin verilen laytime
4. Demurrage = Aşılan süre × Oran

ÖNEMLİ KURAL: "Once on demurrage, always on demurrage"
Demurrage başladığında, tatil günleri ve hava koşulları dahil kesintisiz sayılır (running days). Bu kural uluslararası denizcilik hukukunda yerleşik bir ilkedir.

REVERSİBLE LAYTIME:

Bazı charter party'lerde yükleme ve boşaltma laytime'ı birleştirilir (reversible). Bu durumda yüklemede kazanılan süre boşaltmada kullanılabilir veya tersi.

Toplam laytime = yükleme + boşaltma izin süresi
Toplam kullanılan = yükleme + boşaltma fiili süresi`,
    formula: {
      name: "Demurrage Hesabı",
      expression: "Demurrage ($) = Aşılan Süre (gün) × Demurrage Oranı ($/gün)",
      description: "Once on demurrage, always on demurrage kuralı geçerlidir; kesintisiz running days sayılır.",
    },
    examples: [
      {
        problem: "Laytime: 5 gün. Kullanılan süre: 7 gün 12 saat. Demurrage oranı: $25.000/gün. Demurrage?",
        solution: "Aşılan süre = 7,5 − 5,0 = 2,5 gün. Demurrage = 2,5 × $25.000 = $62.500.",
      },
    ],
    bulletPoints: [
      "Demurrage = aşılan gün × oran",
      "Once on demurrage, always on demurrage kuralı",
      "Reversible laytime: yükleme ve boşaltma süresi birleştirilebilir",
    ],
    keyPoints: [
      "Demurrage oranı genellikle T/C hire'dan yüksektir; caydırıcı etkisi vardır",
      "Demurrage başladıktan sonra SHEX kuralı uygulanmaz",
      "Reversible laytime armatör lehine esneklik sağlar",
    ],
  },
  "despatch": {
    title: "Despatch (Erken Yükleme/Boşaltma Primi)",
    introduction: "Despatch, laytime'ın altında sürede yükleme/boşaltma tamamlandığında armatörün kiracıya ödediği primdir.",
    content: `DESPATCH HESABI:

Despatch = Tasarruf Edilen Süre (gün) × Despatch Oranı ($/gün)

DESPATCH ORANI:

Standart oran: demurrage oranının yarısıdır.

Despatch Oranı = Demurrage Oranı / 2

Bu kural "half demurrage" olarak bilinir ve piyasa standardıdır.

Bazı charter party'lerde "all time saved" veya "working time saved" ayrımı yapılır:
- All time saved: Pazar/tatil dahil tasarruf edilen toplam süre
- Working time saved: Yalnızca çalışma günlerindeki tasarruf

DESPATCH MANTIĞI:

Gemi erken ayrılırsa armatör bir sonraki sefere daha erken başlayabilir. Ancak despatch oranı demurrage oranının yarısıdır; bu da armatörün gecikmeden daha fazla zarara uğradığını yansıtır.`,
    formula: {
      name: "Despatch Hesabı",
      expression: "Despatch = Tasarruf Edilen Süre × (Demurrage Oranı / 2)",
      description: "Half demurrage standardı. All time saved veya working time saved olarak hesaplanabilir.",
    },
    examples: [
      {
        problem: "Laytime 6 gün, yükleme 4,5 günde tamamlandı. Demurrage oranı $22.000/gün. Despatch?",
        solution: "Tasarruf = 6 − 4,5 = 1,5 gün. Despatch oranı = $22.000 / 2 = $11.000/gün. Despatch = 1,5 × $11.000 = $16.500.",
      },
    ],
    bulletPoints: [
      "Despatch oranı = demurrage oranının yarısı (standart)",
      "All time saved: tatiller dahil; working time saved: yalnızca iş günleri",
      "Despatch kiracıyı hızlı operasyona teşvik eder",
    ],
    keyPoints: [
      "Half demurrage = despatch oranı piyasa standardıdır",
      "All time saved armatör için daha maliyetli; kiracı için daha avantajlı",
      "Despatch hakı charter party'de açıkça belirtilmelidir",
    ],
  },

  // =====================================================
  // BÖLÜM 5 - SEFER TAHMİNİ
  // =====================================================
  "voyage-costs": {
    title: "Sefer Maliyetleri ve Bileşenleri",
    introduction: "Gemi işletme maliyetleri sabit ve değişken kalemlerden oluşur; sefer değerlendirmesinde tüm maliyet bileşenlerinin doğru hesaplanması kârlılık analizinin temelidir.",
    content: `MALİYET KATEGORİLERİ:

1. İŞLETME MALİYETLERİ (OPEX – Operating Expenses):
Gemi çalışsın veya çalışmasın katlanılan sabit maliyetler.
- Mürettebat maaşları ve sosyal haklar
- Sigorta primleri (H&M, P&I)
- Bakım ve onarım
- Yedek parça ve sarf malzeme
- Yönetim giderleri (tekne yönetim ücreti)
- Sınıflandırma (klas) sörvey masrafları
- Kuru havuz (dry-docking) amortismanı

Tipik OPEX: $5.000-$12.000/gün (gemi tipine göre)

2. SEFER MALİYETLERİ (Voyage Costs):
Belirli bir seferle doğrudan ilişkili değişken maliyetler.
- Yakıt (bunker): en büyük kalem
- Liman masrafları (port charges, pilotage, towage)
- Kanal geçiş ücretleri (Süveyş, Panama)
- Acentelik ücretleri

3. SERMAYE MALİYETLERİ (Capital Costs):
- Kredi anapara ve faiz ödemeleri
- Amortisman (muhasebe amaçlı)

4. KOMİSYONLAR:
- Address commission (%3,75)
- Brokerage (%1,25)
Toplam: navlunun %5'i`,
    bulletPoints: [
      "OPEX: mürettebat, sigorta, bakım – gemi çalışmasa da devam eder",
      "Yakıt sefer maliyetlerinin %50-70'ini oluşturur",
      "Sermaye maliyetleri kredi ödeme planına bağlıdır",
    ],
    keyPoints: [
      "Günlük maliyet = OPEX + Sermaye maliyeti amortismanı",
      "Başabaş TCE = OPEX/gün + Sermaye/gün",
      "Kanal geçiş ücretleri büyük gemilerde $500.000+ olabilir",
    ],
  },
  "voyage-estimation-calc": {
    title: "Sefer Tahmini Hesaplama",
    introduction: "Sefer tahmini (voyage estimation), bir seferin kârlılığını önceden hesaplamak için yapılan sistematik maliyet-gelir analizidir.",
    content: `SEFER TAHMİNİ ADIMLARI:

1. GELİR HESABI:
Brüt Navlun = Yük miktarı × Navlun oranı
Net Navlun = Brüt Navlun × (1 − komisyon %)

2. SEFER SÜRESİ:
Deniz günü = Mesafe / (Hız × 24)
Liman günü = Laytime + bekleme (tahmini)
Toplam süre = Deniz günü + Liman günü (her liman)

3. YAKIT MALİYETİ:
Deniz yakıtı = Deniz günü × Deniz tüketimi × Yakıt fiyatı
Liman yakıtı = Liman günü × Liman tüketimi × Yakıt fiyatı

4. LİMAN VE DİĞER GİDERLER:
Yükleme limanı masrafları + Boşaltma limanı masrafları + Kanal + Acentelik

5. TCE:
TCE = (Net Navlun − Toplam Sefer Maliyeti) / Sefer Süresi

6. KÂRLILIK:
Günlük Kâr = TCE − OPEX/gün − Sermaye/gün`,
    examples: [
      {
        problem: "55.000 ton demir cevheri, Tubarao (Brezilya) → Qingdao (Çin). Navlun $22/ton, %5 komisyon. Mesafe 11.200 NM, hız 13,5 knot. Deniz tüketimi 35 ton/gün VLSFO ($590/ton). Liman günü 10 (toplam). Liman tüketimi 3 ton/gün. Liman masrafları $120.000. Kanal yok. OPEX $7.500/gün. TCE ve günlük kâr?",
        solution: "Brüt navlun = 55.000 × $22 = $1.210.000. Net navlun = $1.210.000 × 0,95 = $1.149.500. Deniz günü = 11.200 / (13,5 × 24) = 34,6 gün. Toplam süre = 34,6 + 10 = 44,6 gün. Deniz yakıt = 34,6 × 35 × $590 = $714.210. Liman yakıt = 10 × 3 × $590 = $17.700. Toplam maliyet = $714.210 + $17.700 + $120.000 = $851.910. TCE = ($1.149.500 − $851.910) / 44,6 = $6.673/gün. Günlük kâr = $6.673 − $7.500 = −$827/gün (zarar).",
      },
    ],
    bulletPoints: [
      "6 adım: gelir → süre → yakıt → liman → TCE → kârlılık",
      "TCE > OPEX + sermaye ise sefer kârlıdır",
      "Deniz günü hesabı: mesafe / (hız × 24)",
    ],
    keyPoints: [
      "Negatif TCE bile geminin lay-up'tan daha iyi olabileceği anlamına gelebilir",
      "Sefer tahmini spreadsheet veya yazılımlarla yapılır",
      "Hız ve yakıt tüketimi arasındaki ilişki (yaklaşık küp kuralı) kritiktir",
    ],
  },
  "profit-loss": {
    title: "Kâr-Zarar Analizi",
    introduction: "Denizcilik işletmeciliğinde kâr-zarar analizi, sefer bazlı ve dönemsel bazda yapılarak geminin ekonomik performansı değerlendirilir.",
    content: `SEFER BAZLI ANALIZ:

Sefer Kârı/Zararı = Net Navlun − (Sefer Maliyetleri + OPEX × Sefer Süresi + Sermaye Maliyeti × Sefer Süresi)

Alternatif: TCE bazlı
Günlük Kâr/Zarar = TCE − Günlük OPEX − Günlük Sermaye Maliyeti

DÖNEMSEL ANALIZ:

Yıllık gelir: ∑(tüm seferlerin net navlunları) veya T/C hire × 365
Yıllık gider: OPEX × 365 + Sefer maliyetleri + Sermaye maliyeti
Yıllık Kâr = Gelir − Gider

BAŞABAŞ ANALİZİ:

Başabaş TCE = Günlük OPEX + Günlük Sermaye Maliyeti

Bu değer, geminin en azından masraflarını karşılayabilmesi için gereken minimum günlük geliri gösterir.

KARAR KRİTERLERİ:

1. TCE > Başabaş → sefer kabul edilebilir
2. TCE < Başabaş ancak > OPEX → sefer zarar ettirse de sermaye maliyetinin bir kısmını karşılar; lay-up'tan iyidir
3. TCE < OPEX → gemiyi lay-up'a almak daha mantıklı olabilir

ROI (Return on Investment):

ROI = Yıllık Net Kâr / Gemi Yatırım Değeri × 100

Denizcilik sektöründe iyi bir ROI genellikle %8-15 aralığındadır.`,
    formula: {
      name: "Başabaş TCE",
      expression: "Başabaş TCE = OPEX/gün + Sermaye Maliyeti/gün",
      description: "Geminin masraflarını karşılayabilmesi için gereken minimum günlük gelir.",
    },
    bulletPoints: [
      "TCE > başabaş → kârlı sefer; TCE < OPEX → lay-up değerlendirilmeli",
      "Sefer bazlı ve dönemsel analiz birlikte yapılmalıdır",
      "ROI hedefi: %8-15 aralığı",
    ],
    keyPoints: [
      "Zarar eden seferde bile sermaye maliyetinin kısmen karşılanması lay-up'tan iyidir",
      "Başabaş TCE karar vermede en kritik eşik değerdir",
      "Spot piyasa vs. T/C kararı risk-getiri dengesine bağlıdır",
    ],
  },

  // =====================================================
  // BÖLÜM 6 - GEMİ FİNANSMANI
  // =====================================================
  "ship-acquisition": {
    title: "Gemi Edinim Yöntemleri",
    introduction: "Gemi edinimi, öz sermaye, banka kredisi, leasing veya farklı finansman yapılarıyla gerçekleştirilebilir; her yöntemin avantaj ve riskleri farklıdır.",
    content: `EDİNİM YÖNTEMLERİ:

1. ÖZ SERMAYE: Şirketin kendi kaynaklarıyla doğrudan satın alma. Risk tamamen şirkete aittir ancak faiz yükü yoktur.

2. BANKA KREDİSİ (Mortgage): En yaygın yöntem. Gemi ipotekle teminat altına alınır. Kredi/Değer oranı (LTV): genellikle %60-70. Vade: 5-12 yıl. Gemi yatırım bankacılığında uzmanlaşmış bankalar: Hamburg Commercial Bank, DNB, ING, CIT, ABN AMRO.

3. LEASING: Finansal kiralama (bareboat charter + opsiyon). Leasing şirketi gemiyi satın alır, armatöre kiralar. Süre sonunda satın alma opsiyonu.

4. TAHVİL İHRACI (Bond): Büyük denizcilik şirketleri sermaye piyasasından borçlanabilir.

5. HALKA ARZ (IPO/Equity Market): New York, Oslo, Atina borsalarında denizcilik şirketleri hisse senedi ihraç edebilir.

6. ÖZEL SERMAYE (Private Equity): Son yıllarda artan bir finansman kaynağı.

YENİ İNŞA vs. İKİNCİ EL:

Yeni inşa: Tersane fiyatı + denetim + teslim süresi (2-4 yıl). Avantaj: güncel düzenlemelere tam uyum, düşük bakım. Dezavantaj: uzun teslim süresi, yüksek maliyet.

İkinci el: Hemen teslim. Avantaj: anında gelir. Dezavantaj: bakım riski, eski düzenlemeler, kısa kalan ekonomik ömür.`,
    bulletPoints: [
      "Banka kredisi en yaygın; LTV %60-70, vade 5-12 yıl",
      "Leasing = bareboat charter + satın alma opsiyonu",
      "Yeni inşa teslim süresi 2-4 yıl; ikinci el hemen teslim",
    ],
    keyPoints: [
      "Gemi ipoteği (mortgage) bankanın temel teminatıdır",
      "LTV oranı gemi değerindeki düşüşlerden etkilenir; covenant riski",
      "Piyasa zirvesinde ikinci el, dipte yeni inşa tercih edilir",
    ],
  },
  "ship-valuation": {
    title: "Gemi Değerleme Yöntemleri",
    introduction: "Gemi değerlemesi, alım-satım, kredi, sigorta ve muhasebe amaçlarıyla farklı yöntemlerle yapılır.",
    content: `DEĞERLEME YÖNTEMLERİ:

1. PİYASA DEĞERİ (Market Value):
Benzer yaş, tip ve büyüklükteki gemilerin güncel satış fiyatları referans alınır. En yaygın yöntemdir.
Kaynak: VesselsValue, Clarksons, Baltic Exchange S&P değerlendirmeleri.

2. HURDA DEĞERİ (Scrap Value):
Gemi = Hafif tonaj (LDT) × Hurda çelik fiyatı ($/LDT)
Minimum değer olarak kabul edilir.

3. YENİ İNŞA DEĞERİ (Newbuilding Price):
Benzer tipte yeni gemi siparişi fiyatı. Üst sınır referansıdır.

4. NAKİT AKIŞI YÖNTEMİ (DCF – Discounted Cash Flow):
Geminin gelecekteki nakit akışlarının bugünkü değere indirgenmesi.
NPV = ∑ [CF_t / (1+r)^t]

5. CHARTER-FREE VALUE:
Gemi herhangi bir charter taahhüdü olmaksızın değerlendirilir. Gerçek piyasa değerine en yakın ölçümdür.

GEMİ DEĞERİNİ ETKİLEYEN FAKTÖRLER:

- Gemi yaşı (en kritik: amortisman eğrisi)
- Gemi tipi ve büyüklüğü
- Mevcut navlun piyasası durumu
- Özel donanım (ice class, scrubber, BWTS)
- Bakım durumu ve klas kayıtları`,
    bulletPoints: [
      "Piyasa değeri: benzer gemi satışlarıyla karşılaştırma",
      "Hurda değeri = LDT × $/LDT, minimum değerdir",
      "DCF gelecek nakit akışlarını bugünkü değere indirger",
    ],
    keyPoints: [
      "Gemi yaşı değerin en kritik belirleyicisidir",
      "Navlun piyasası yükseldiğinde gemi değerleri de artar",
      "Banka LTV hesabında genellikle charter-free piyasa değeri kullanılır",
    ],
  },
  "depreciation": {
    title: "Amortisman Hesaplaması",
    introduction: "Amortisman, geminin ekonomik ömrü boyunca maliyetinin sistematik olarak giderleştirilmesidir ve vergi planlamasında önemli bir araçtır.",
    content: `AMORTİSMAN YÖNTEMLERİ:

1. DOĞRUSAL AMORTİSMAN (Straight-Line):

Yıllık Amortisman = (Gemi Maliyeti − Hurda Değeri) / Ekonomik Ömür

En yaygın yöntemdir. Denizcilik sektöründe standart ekonomik ömür genellikle 25 yıl kabul edilir.

2. AZALAN BAKİYE (Declining Balance):
Her yıl kalan değer üzerinden sabit yüzde uygulanır. İlk yıllarda daha yüksek amortisman.

3. ÜRETIM BİRİMİ (Units of Production):
Geminin çalıştığı gün veya mil başına amortisman. Pratikte nadir kullanılır.

HURDA DEĞERİ TAHMİNİ:

Hurda değeri = LDT × Tahmini hurda fiyatı
Tipik LDT: Gemi DWT'sinin %15-25'i
Hurda fiyatı: $350-550/LDT (piyasa koşullarına göre)`,
    formula: {
      name: "Doğrusal Amortisman",
      expression: "Yıllık Amortisman = (Maliyet − Hurda Değeri) / Ekonomik Ömür",
      description: "Standart ekonomik ömür: 25 yıl. Hurda değeri LDT × $/LDT ile tahmin edilir.",
    },
    examples: [
      {
        problem: "Gemi maliyeti $35.000.000, hurda değeri $5.000.000, ekonomik ömür 25 yıl. Yıllık ve günlük amortisman?",
        solution: "Yıllık = ($35.000.000 − $5.000.000) / 25 = $1.200.000/yıl. Günlük = $1.200.000 / 365 = $3.288/gün.",
      },
    ],
    bulletPoints: [
      "Doğrusal amortisman en yaygın; standart ömür 25 yıl",
      "Hurda değeri = LDT × $/LDT",
      "Günlük amortisman başabaş TCE hesabında kullanılır",
    ],
    keyPoints: [
      "Amortisman nakit çıkışı yaratmaz; vergi avantajı sağlar",
      "LDT genellikle DWT'nin %15-25'i kadardır",
      "Özel düzenlemeler (EEDI, scrubber) geriye dönük değer artırabilir",
    ],
  },

  // =====================================================
  // BÖLÜM 7 - DENİZ SİGORTASI
  // =====================================================
  "hull-machinery": {
    title: "Tekne ve Makine (H&M) Sigortası",
    introduction: "H&M (Hull & Machinery) sigortası, geminin fiziksel hasarlarını, çarpışma sorumluluğunun bir kısmını ve kurtarma masraflarını teminat altına alır.",
    content: `H&M SİGORTASI KAPSAMI:

Tekne ve Makine sigortası, deniz rizikolarına karşı geminin fiziksel yapısını korur.

TEMİNAT ALTINDAKI RİZİKOLAR:
- Deniz tehlikeleri (fırtına, karaya oturma, batma)
- Yangın ve patlama
- Çarpışma (collision) hasarı
- Hırsızlık ve korsanlık
- Makine arızası (belirli klozlarda)
- Mürettebat ihmali

SİGORTA DEĞERİ:

Agreed Value: Sigorta poliçesinde belirtilen sabit değer. Hasar durumunda bu değer üzerinden tazminat ödenir. Genellikle piyasa değerine yakın belirlenir.

ÖNEMLİ KLOZLAR:

ITC Hulls (Institute Time Clauses – Hulls): Standart H&M klozu.

3/4 RDC (Running Down Clause): Çarpışma sorumluluğunun 3/4'ünü teminat altına alır. Kalan 1/4 P&I sigortası kapsamındadır.

Deductible: Her hasarda sigortalının üstlendiği muafiyet tutarı. Tipik: $100.000-$250.000.

PRİM BELİRLEME FAKTÖRLERİ:

- Gemi yaşı ve tipi
- Bayrak devleti ve klas kuruluşu
- İşletme bölgesi
- Hasar geçmişi (loss record)
- Geminin sigorta değeri`,
    bulletPoints: [
      "H&M geminin fiziksel hasarını ve çarpışma sorumluluğunun 3/4'ünü kapsar",
      "Agreed value poliçede sabit olarak belirlenir",
      "ITC Hulls standart H&M klozudur",
    ],
    keyPoints: [
      "3/4 RDC: çarpışma sorumluluğunun 3/4'ü H&M, 1/4'ü P&I",
      "Deductible her hasarda sigortalının üstlendiği muafiyet tutarıdır",
      "Gemi yaşı ve hasar geçmişi prim oranını doğrudan etkiler",
    ],
  },
  "pi-club": {
    title: "P&I Kulüpleri ve Sorumluluk Sigortası",
    introduction: "P&I (Protection and Indemnity) kulüpleri, armatörlerin üçüncü şahıslara karşı sorumluluklarını karşılayan karşılıklı sigorta kuruluşlarıdır.",
    content: `P&I KULÜBÜ NEDİR?

P&I kulüpleri, armatörlerin bir araya gelerek oluşturdukları karşılıklı sigorta (mutual insurance) kuruluşlarıdır. Kâr amacı gütmezler.

International Group of P&I Clubs: 13 kulüpten oluşur ve dünya ticaret filosunun %90'ından fazlasını sigorta eder. Üyeler: Gard, Britannia, Steamship Mutual, UK P&I Club, Skuld, vb.

TEMİNAT KAPSAMI:

Protection (Koruma):
- Mürettebat yaralanma ve ölümü
- Yolcu hasarı
- Çarpışma sorumluluğunun 1/4'ü (H&M'in kapsamadığı kısım)
- Enkaz kaldırma
- Kirlilik sorumluluğu (petrol kirliliği)
- Karantina masrafları

Indemnity (Tazminat):
- Yük hasarı
- Navlun kaybı
- Konteyner hasarı
- Liman/terminal hasarı

ÖZEL ÖZELLİKLER:

1. Pooling: Büyük hasarlarda kulüpler arasında paylaşım
2. Supplementary Call: Hasar fazlaysa ek prim talep edilebilir
3. Sınırsız teminat: Çoğu risk için teminat limiti yoktur`,
    bulletPoints: [
      "P&I = karşılıklı sigorta; kâr amacı gütmez",
      "International Group dünya filosunun %90+'ını sigorta eder",
      "Kirlilik sorumluluğu P&I kapsamındadır",
    ],
    keyPoints: [
      "P&I çarpışma sorumluluğunun H&M kapsamı dışındaki 1/4'ünü karşılar",
      "Büyük hasarlarda kulüpler arası pooling mekanizması çalışır",
      "P&I sertifikası liman giriş şartıdır (CLC, BWR sertifikaları)",
    ],
  },
  "cargo-insurance": {
    title: "Yük Sigortası ve Klozlar",
    introduction: "Yük sigortası, taşınan yükün deniz rizikoları nedeniyle uğrayacağı hasar veya kayıpları teminat altına alır.",
    content: `YÜK SİGORTASI KLOZLARI:

Institute Cargo Clauses (ICC) üç seviyede teminat sunar:

ICC (A) – All Risks: En geniş teminat. Hariç tutulan riskler dışında tüm rizikolar kapsanır.
Hariçler: savaş, grev, gecikme, doğal aşınma, paketleme yetersizliği.

ICC (B): Belirtilen riskler (named perils) kapsanır.
Kapsam: yangın, patlama, çarpışma, devrilme, karaya oturma, deprem, yıldırım, deniz suyu girişi.

ICC (C): En dar teminat. Yalnızca büyük kazalar kapsanır.
Kapsam: yangın, patlama, çarpışma, karaya oturma, batma, devrilme.

EK KLOZLAR:
- War Clause: Savaş riski
- Strikes Clause: Grev riski
- Institute Frozen Food Clauses: Dondurulmuş gıda

SİGORTA DEĞERİ:

CIF + %10 = Standart sigorta değeri
(Cost + Insurance + Freight) + %10 kâr marjı

GENEL AVARYA (General Average):

Deniz hukukuna özgü bir kavramdır. Gemiyi ve yükü kurtarmak için yapılan gönüllü fedakârlıklar (yük denize atma, kurtarma ücreti) tüm ilgililer arasında orantılı olarak paylaşılır. York-Antwerp Rules uygulanır.`,
    bulletPoints: [
      "ICC (A): all risks; ICC (B): named perils; ICC (C): minimum kapsam",
      "Sigorta değeri: CIF + %10 standart",
      "Genel avarya: fedakârlık masrafları orantılı paylaşılır",
    ],
    keyPoints: [
      "ICC (A) en yaygın yük sigortası klozudur",
      "Savaş ve grev riskleri standart klozlarda kapsanmaz; ek kloz gerekir",
      "Genel avarya York-Antwerp Rules'a göre hesaplanır",
    ],
  },

  // =====================================================
  // BÖLÜM 8 - SÖZLEŞMELER VE HUKUK
  // =====================================================
  "charter-party": {
    title: "Charter Party Formları",
    introduction: "Charter party, armatör ile kiracı arasındaki kiralama sözleşmesidir; standart formlar BIMCO ve diğer kuruluşlar tarafından hazırlanır.",
    content: `BAŞLICA FORMLAR:

VOYAGE CHARTER PARTY:
- GENCON (General Charter): En yaygın genel kargo formu. BIMCO tarafından hazırlanmıştır.
- ASBATANKVOY: Tanker seferleri için standart form.
- AMWELSH: Kömür taşımacılığı.
- NORGRAIN: Tahıl taşımacılığı.

TIME CHARTER PARTY:
- NYPE (New York Produce Exchange): En yaygın time charter formu.
- BALTIME: Alternatif time charter formu.
- SHELLTIME: Shell tarafından tankerler için hazırlanmış.

BAREBOAT CHARTER PARTY:
- BARECON: BIMCO standart bareboat formu.

ÖNEMLI KLOZLAR:

1. Preamble: Taraflar, gemi tanımı, süre/rota
2. Cargo Clause: Yük tanımı ve miktarı
3. Laytime/Demurrage: Süre ve oran
4. Off-hire: Time charter'da kira durma koşulları
5. Withdrawal: Hire ödenmemesi durumunda gemiyi geri çekme hakkı
6. War/Ice Clause: Savaş ve buz riski
7. Arbitration: Uyuşmazlık çözüm yöntemi (Londra, New York)

BIMCO:

Baltic and International Maritime Council, denizcilik sözleşme formlarının en önemli kaynağıdır. 100'den fazla standart form ve kloz yayınlamıştır.`,
    bulletPoints: [
      "GENCON: genel kargo, NYPE: time charter, BARECON: bareboat",
      "BIMCO 100'den fazla standart form yayınlamıştır",
      "Arbitration genellikle Londra veya New York'ta yapılır",
    ],
    keyPoints: [
      "Charter party'nin en kritik klozları: laytime, demurrage, off-hire, withdrawal",
      "NYPE Clause 8 (off-hire) ve Clause 11 (withdrawal) en çok tartışılan bölümlerdir",
      "Rider clauses: standart forma eklenen özel klozlardır",
    ],
  },
  "bill-of-lading": {
    title: "Konşimento (Bill of Lading)",
    introduction: "Konşimento (B/L), deniz taşımacılığında yükün teslim alındığını belgeleyen, taşıma sözleşmesinin kanıtı olan ve mülkiyet devri sağlayan kıymetli evraktır.",
    content: `KONŞİMENTONUN 3 FONKSİYONU:

1. MAKBUZ (Receipt): Yükün gemiye yüklendiğinin veya taşıma için teslim alındığının kanıtıdır. Yükün miktarı, durumu ve tanımı B/L'de belirtilir.

2. TAŞIMA SÖZLEŞMESİNİN KANITI: Taşıyan ile yükleyici arasındaki taşıma koşullarını belgeler.

3. MÜLKİYET BELGESİ (Document of Title): B/L'yi elinde bulunduran kişi yükü talep edebilir. Ciro (endorsement) ile devredilebilir. Bu özelliği B/L'yi diğer taşıma belgelerinden ayırır.

KONŞİMENTO TÜRLERİ:

Clean B/L: Yükün görünürde iyi durumda yüklendiğini belirtir.
Claused/Dirty B/L: Yükün hasarlı veya eksik olduğuna dair kayıt (remark) içerir.
Shipped B/L: Yükün gemiye fiilen yüklendiğini belirtir.
Received for Shipment B/L: Yükün taşıma için teslim alındığını belirtir.
Straight B/L: Belirli bir alıcıya düzenlenir; ciro edilemez.
Order B/L: "To order" veya "To order of shipper" olarak düzenlenir; ciro ile devredilebilir.

HAGUE-VISBY KURALLARI:

Taşıyanın yüke karşı asgari sorumluluğunu belirler. Taşıyan, denize elverişlilik (seaworthiness) yükümlülüğünü yerine getirmek zorundadır.`,
    bulletPoints: [
      "B/L: makbuz + sözleşme kanıtı + mülkiyet belgesidir",
      "Clean B/L: hasar kaydı yok; claused B/L: hasar/eksik kaydı var",
      "Order B/L ciro ile devredilebilir; straight B/L devredilemez",
    ],
    keyPoints: [
      "B/L'nin mülkiyet belgesi özelliği onu kıymetli evrak yapar",
      "Hague-Visby Rules taşıyanın asgari sorumluluğunu belirler",
      "Letter of Credit (akreditif) işlemlerinde clean shipped B/L istenir",
    ],
  },
  "maritime-claims": {
    title: "Denizcilik Alacakları ve Tahkim",
    introduction: "Denizcilik uyuşmazlıkları genellikle tahkim (arbitration) yoluyla çözülür; denizcilik alacakları geminin tutuklanmasına (arrest) yol açabilir.",
    content: `DENİZCİLİK ALACAKLARI:

Denizcilik alacağı (maritime claim), deniz ticaretinden kaynaklanan tüm hukuki talepleri kapsar.

BAŞLICA ALACAK TÜRLERİ:

1. Gemi ipoteği (mortgage)
2. Mürettebat alacakları (ücret, tazminat)
3. Kurtarma ücreti (salvage)
4. Çarpışma hasarı talebi
5. Yük hasarı talebi
6. Yakıt (bunker) alacağı
7. Liman ücretleri
8. Tamir ve bakım alacakları
9. Navlun alacağı
10. Demurrage alacağı

GEMİ TUTUKLAMASI (ARREST):

1952 ve 1999 Arrest Conventions gereği, denizcilik alacağı olan taraf mahkemeden geminin tutuklanmasını talep edebilir. Gemi, borcun ödenmesine veya teminat gösterilmesine kadar tutulur.

TAHKİM (ARBITRATION):

Denizcilik uyuşmazlıklarının büyük çoğunluğu tahkim yoluyla çözülür. Tahkim mahkemeye göre daha hızlı, gizli ve uzman hakemlerle yapılır.

Başlıca tahkim merkezleri:
- Londra (LMAA – London Maritime Arbitrators Association): En yaygın
- New York (SMA – Society of Maritime Arbitrators)
- Singapur (SIAC)
- Hong Kong (HKIAC)

İngiliz hukuku, denizcilik sözleşmelerinde en yaygın uygulanan hukuk sistemidir.`,
    bulletPoints: [
      "Gemi tutuklaması (arrest) denizcilik alacaklarının teminatıdır",
      "Londra (LMAA) en yaygın denizcilik tahkim merkezidir",
      "İngiliz hukuku denizcilik sözleşmelerinde standart tercihtir",
    ],
    keyPoints: [
      "Mürettebat alacakları en öncelikli denizcilik alacaklarındandır",
      "Tahkim kararları 1958 New York Sözleşmesi ile uluslararası uygulanabilir",
      "Charter party'deki arbitration klozu yargı yetkisini belirler",
    ],
  },
};

export default function EconomicsTopicsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleSubtopicClick = (subtopicId: string, hasContent: boolean) => {
    if (hasContent && topicContents[subtopicId]) {
      setSelectedTopic(subtopicId);
    }
  };

  const closeModal = () => {
    setSelectedTopic(null);
  };

  const currentContent = selectedTopic ? topicContents[selectedTopic] : null;

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-violet-50 dark:from-[hsl(230,50%,6%)] dark:via-[hsl(230,50%,8%)] dark:to-[hsl(260,50%,10%)]"
      data-no-translate
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Deniz İşletmeciliği</h1>
                <p className="text-sm text-muted-foreground">8 Ana Konu • Kapsamlı Müfredat</p>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-4 max-w-4xl mx-auto pb-20">
            <Accordion type="single" collapsible className="space-y-2">
              {econTopics.map((topic) => {
                const TopicIcon = topic.icon;
                return (
                  <AccordionItem
                    key={topic.id}
                    value={topic.id}
                    className="border border-border/40 rounded-xl overflow-hidden bg-card/80 backdrop-blur"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left">
                        <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold">
                          {topic.number}
                        </span>
                        <div className="flex items-center gap-2">
                          <TopicIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
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
                                ? "hover:bg-indigo-500/5 cursor-pointer"
                                : "opacity-50 cursor-not-allowed"
                            }`}
                            whileTap={subtopic.hasContent && topicContents[subtopic.id] ? { scale: 0.98 } : {}}
                          >
                            {subtopic.hasContent && topicContents[subtopic.id] ? (
                              <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
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

            <section className="rounded-2xl border border-border/40 bg-card/80 p-6 backdrop-blur mt-6">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-indigo-500" />
                <h2 className="text-lg font-semibold text-foreground">Hızlı Erişim</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { title: "Ekonomi Hesaplamaları", href: "/economics" },
                  { title: "Formüller", href: "/formulas" },
                  { title: "Tüm Dersler", href: "/lessons" },
                ].map((resource, index) => (
                  <Link
                    key={index}
                    to={resource.href}
                    className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-all hover:border-indigo-500/40 hover:bg-background"
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

      <AnimatePresence>
        {selectedTopic && currentContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
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

            <ScrollArea className="h-[calc(100vh-60px)]">
              <div className="p-4 space-y-6 pb-20 max-w-4xl mx-auto">
                <div className="bg-indigo-500/10 rounded-xl p-4 border-l-4 border-indigo-500">
                  <p className="text-foreground font-medium leading-relaxed">
                    {currentContent.introduction}
                  </p>
                </div>

                <div className="prose prose-sm max-w-none">
                  <div className="text-foreground leading-relaxed whitespace-pre-line">
                    {currentContent.content}
                  </div>
                </div>

                {currentContent.bulletPoints && currentContent.bulletPoints.length > 0 && (
                  <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                    <h3 className="font-semibold text-foreground mb-3">Önemli Noktalar</h3>
                    {currentContent.bulletPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                        <span className="text-sm text-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                )}

                {currentContent.formula && (
                  <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                    <h3 className="font-semibold text-foreground mb-2">
                      {currentContent.formula.name}
                    </h3>
                    <div className="bg-background rounded-lg p-3 font-mono text-lg text-center text-indigo-600 dark:text-indigo-400 mb-2">
                      {currentContent.formula.expression}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {currentContent.formula.description}
                    </p>
                  </div>
                )}

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

                {currentContent.keyPoints && currentContent.keyPoints.length > 0 && (
                  <div className="bg-indigo-500/5 rounded-xl p-4">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                      Anahtar Bilgiler
                    </h3>
                    <div className="space-y-2">
                      {currentContent.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-indigo-600 dark:text-indigo-400 font-bold">{index + 1}.</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentContent.warnings && currentContent.warnings.length > 0 && (
                  <div className="bg-destructive/10 rounded-xl p-4 border border-destructive/20">
                    <h3 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Uyarılar
                    </h3>
                    <div className="space-y-2">
                      {currentContent.warnings.map((warning, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-destructive font-bold">!</span>
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
