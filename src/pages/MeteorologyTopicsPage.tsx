import type { CSSProperties } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Cloud,
  ChevronRight,
  FileText,
  AlertTriangle,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  Compass,
  Lightbulb,
  CheckCircle2,
  Circle,
  X,
  Waves,
  Sun,
  Globe,
  Shield,
  BookMarked,
  BarChart3,
  Satellite,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PhotoGallery, type GalleryPhoto } from "@/components/PhotoGallery";

// Etap 1B - meteoroloji gerçekçi fotoğraflar
import photoCumulonimbus from "@/assets/meteorology/cumulonimbus.jpg";
import photoCirrus from "@/assets/meteorology/cirrus.jpg";
import photoCumulus from "@/assets/meteorology/cumulus.jpg";
import photoSeaFog from "@/assets/meteorology/sea-fog.jpg";
import photoStormWaves from "@/assets/meteorology/storm-waves.jpg";
import photoBarometer from "@/assets/meteorology/barometer.jpg";
import photoAnemometer from "@/assets/meteorology/anemometer.jpg";
import photoHurricaneSatellite from "@/assets/meteorology/hurricane-satellite.jpg";
import photoWaterspout from "@/assets/meteorology/waterspout.jpg";
import photoColdFront from "@/assets/meteorology/cold-front.jpg";

interface MeteoSubTopic {
  id: string;
  title: string;
  hasContent: boolean;
}

interface MeteoMainTopic {
  id: string;
  number: number;
  title: string;
  icon: React.ElementType;
  subtopics: MeteoSubTopic[];
}

const meteorologyTopics: MeteoMainTopic[] = [
  {
    id: "atmo-basics",
    number: 1,
    title: "Atmosfer ve Temel Kavramlar",
    icon: Globe,
    subtopics: [
      { id: "atmo-structure", title: "Atmosferin yapısı ve katmanları", hasContent: true },
      { id: "atmo-composition", title: "Atmosferin bileşimi", hasContent: true },
      { id: "atmo-heat-transfer", title: "Isı transferi mekanizmaları", hasContent: true },
      { id: "atmo-temperature", title: "Sıcaklık dağılımı ve ölçümü", hasContent: true },
      { id: "atmo-insolation", title: "Güneş radyasyonu ve insolasyon", hasContent: true },
    ],
  },
  {
    id: "pressure-wind",
    number: 2,
    title: "Atmosfer Basıncı ve Rüzgâr",
    icon: Wind,
    subtopics: [
      { id: "pressure-def", title: "Atmosfer basıncı ve ölçümü", hasContent: true },
      { id: "pressure-systems", title: "Basınç sistemleri (siklon/antisiklon)", hasContent: true },
      { id: "isobars", title: "İzobar ve basınç gradyanı", hasContent: true },
      { id: "wind-forces", title: "Rüzgârı etkileyen kuvvetler", hasContent: true },
      { id: "wind-types", title: "Genel rüzgâr dolaşımı ve yerel rüzgârlar", hasContent: true },
      { id: "beaufort-scale", title: "Beaufort Skalası", hasContent: true },
    ],
  },
  {
    id: "humidity-precip",
    number: 3,
    title: "Nem, Bulutlar ve Yağış",
    icon: Droplets,
    subtopics: [
      { id: "humidity-concepts", title: "Nem kavramları (mutlak, bağıl, özgül nem)", hasContent: true },
      { id: "dew-point", title: "Çiy noktası (dew point) ve yoğunlaşma", hasContent: true },
      { id: "cloud-formation", title: "Bulut oluşumu ve sınıflandırması", hasContent: true },
      { id: "cloud-types", title: "Bulut türleri ve seviyeleri", hasContent: true },
      { id: "precipitation-types", title: "Yağış türleri ve oluşumu", hasContent: true },
    ],
  },
  {
    id: "visibility",
    number: 4,
    title: "Görüş ve Sis",
    icon: Eye,
    subtopics: [
      { id: "visibility-def", title: "Denizde görüş ve etkileyen faktörler", hasContent: true },
      { id: "fog-types", title: "Sis türleri ve oluşum mekanizmaları", hasContent: true },
      { id: "advection-fog", title: "Adveksiyon sisi (deniz sisi)", hasContent: true },
      { id: "radiation-fog", title: "Radyasyon sisi ve diğer türler", hasContent: true },
      { id: "fog-navigation", title: "Siste seyir tedbirleri", hasContent: true },
    ],
  },
  {
    id: "air-masses-fronts",
    number: 5,
    title: "Hava Kütleleri ve Cepheler",
    icon: Compass,
    subtopics: [
      { id: "air-mass-types", title: "Hava kütlesi türleri ve kaynakları", hasContent: true },
      { id: "air-mass-modification", title: "Hava kütlesi modifikasyonu", hasContent: true },
      { id: "cold-front", title: "Soğuk cephe yapısı ve hava olayları", hasContent: true },
      { id: "warm-front", title: "Sıcak cephe yapısı ve hava olayları", hasContent: true },
      { id: "occluded-front", title: "Oklüzyon cephesi", hasContent: true },
      { id: "frontal-depression", title: "Cephesel depresyon gelişimi", hasContent: true },
    ],
  },
  {
    id: "tropical-meteo",
    number: 6,
    title: "Tropikal Meteoroloji ve Siklonlar",
    icon: AlertTriangle,
    subtopics: [
      { id: "tropical-climate", title: "Tropikal iklim özellikleri", hasContent: true },
      { id: "tropical-cyclone-formation", title: "Tropikal siklon oluşumu ve yapısı", hasContent: true },
      { id: "cyclone-classification", title: "Siklon sınıflandırması (TD, TS, Hurricane)", hasContent: true },
      { id: "cyclone-tracking", title: "Siklon izleme ve tahmin", hasContent: true },
      { id: "dangerous-semicircle", title: "Tehlikeli ve seyir edilebilir yarım daire", hasContent: true },
      { id: "cyclone-avoidance", title: "Tropikal siklondan kaçınma manevraları", hasContent: true },
    ],
  },
  {
    id: "waves-sea-state",
    number: 7,
    title: "Dalgalar ve Deniz Durumu",
    icon: Waves,
    subtopics: [
      { id: "wave-formation", title: "Dalga oluşumu ve parametreleri", hasContent: true },
      { id: "wave-types", title: "Dalga türleri (rüzgâr dalgası, swell)", hasContent: true },
      { id: "sea-state-scale", title: "Deniz durumu skalası (Douglas)", hasContent: true },
      { id: "significant-wave", title: "Anlamlı dalga yüksekliği (Hs)", hasContent: true },
      { id: "wave-ship-interaction", title: "Dalga-gemi etkileşimi", hasContent: true },
    ],
  },
  {
    id: "ocean-currents-tides",
    number: 8,
    title: "Okyanus Akıntıları ve Gelgit",
    icon: Satellite,
    subtopics: [
      { id: "ocean-currents", title: "Okyanus akıntıları ve nedenleri", hasContent: true },
      { id: "major-currents", title: "Başlıca okyanus akıntı sistemleri", hasContent: true },
      { id: "tide-theory", title: "Gelgit teorisi ve çekim kuvvetleri", hasContent: true },
      { id: "tide-types", title: "Gelgit türleri (spring/neap)", hasContent: true },
      { id: "tide-tables", title: "Gelgit tabloları ve hesaplamaları", hasContent: true },
      { id: "tidal-currents", title: "Gelgit akıntıları", hasContent: true },
    ],
  },
  {
    id: "weather-instruments",
    number: 9,
    title: "Meteoroloji Aletleri ve Gözlem",
    icon: Thermometer,
    subtopics: [
      { id: "barometer", title: "Barometre türleri ve kullanımı", hasContent: true },
      { id: "thermometer-hygrometer", title: "Termometre ve higrometre", hasContent: true },
      { id: "anemometer", title: "Anemometre ve rüzgâr ölçümü", hasContent: true },
      { id: "weather-observation", title: "Denizde hava gözlemi ve kayıt", hasContent: true },
      { id: "weather-reports", title: "Meteoroloji raporları (SYNOP, METAR)", hasContent: true },
    ],
  },
  {
    id: "weather-forecasting",
    number: 10,
    title: "Hava Tahmini ve Haritalar",
    icon: BarChart3,
    subtopics: [
      { id: "synoptic-charts", title: "Sinoptik haritalar ve okuma", hasContent: true },
      { id: "weather-symbols", title: "Hava haritası sembolleri", hasContent: true },
      { id: "forecast-methods", title: "Tahmin yöntemleri", hasContent: true },
      { id: "local-signs", title: "Yerel hava belirtileri (denizci bilgisi)", hasContent: true },
      { id: "weather-routing", title: "Hava rotalaması (weather routing)", hasContent: true },
    ],
  },
  {
    id: "maritime-comms",
    number: 11,
    title: "Denizcilik Meteoroloji Haberleşmesi",
    icon: Shield,
    subtopics: [
      { id: "navtex-meteo", title: "NAVTEX meteoroloji mesajları", hasContent: true },
      { id: "gmdss-weather", title: "GMDSS ve hava güvenlik bilgileri", hasContent: true },
      { id: "weather-warnings", title: "Hava uyarıları ve fırtına sinyalleri", hasContent: true },
      { id: "inmarsat-weather", title: "Inmarsat hava servisleri", hasContent: true },
      { id: "coastal-warnings", title: "Sahil istasyonu uyarıları", hasContent: true },
    ],
  },
  {
    id: "climate-safety",
    number: 12,
    title: "İklim ve Denizde Güvenlik",
    icon: BookMarked,
    subtopics: [
      { id: "climate-zones", title: "İklim kuşakları ve deniz rotaları", hasContent: true },
      { id: "monsoon", title: "Muson rüzgârları ve mevsimsel değişimler", hasContent: true },
      { id: "ice-navigation", title: "Buz navigasyonu ve buz türleri", hasContent: true },
      { id: "heavy-weather-seamanship", title: "Ağır havada gemicilik (heavy weather seamanship)", hasContent: true },
      { id: "meteo-accidents", title: "Meteorolojik nedenli deniz kazaları", hasContent: true },
    ],
  },
];

interface TopicContent {
  title: string;
  introduction: string;
  content: string;
  photos?: GalleryPhoto[];
  bulletPoints?: string[];
  examples?: { problem: string; solution: string }[];
  formula?: { name: string; expression: string; description: string };
  keyPoints?: string[];
  warnings?: string[];
}

const topicContents: Record<string, TopicContent> = {
  // =====================================================
  // BÖLÜM 1 - ATMOSFER VE TEMEL KAVRAMLAR
  // =====================================================
  "atmo-structure": {
    title: "Atmosferin Yapısı ve Katmanları",
    introduction: "Atmosfer, Dünya'yı çevreleyen gaz tabakasıdır ve yüksekliğe bağlı olarak farklı fiziksel özelliklere sahip katmanlara ayrılır.",
    content: `ATMOSFER KATMANLARI:

TROPOSFER (0 – 12 km):
Hava olaylarının tamamına yakını bu katmanda gerçekleşir. Yükseldikçe sıcaklık her 1.000 metrede ortalama 6,5 °C düşer (çevresel azalma oranı – Environmental Lapse Rate). Troposferin üst sınırı tropopoz olarak adlandırılır. Ekvatorda yaklaşık 16-17 km, kutuplarda 8-9 km yüksekliğe ulaşır. Atmosferdeki su buharının %99'u bu katmanda bulunur.

STRATOSFER (12 – 50 km):
Ozon tabakasını barındırır. Sıcaklık, ozon tabakasında UV radyasyonun emilmesi nedeniyle yükseklikle artar. Hava olayları bu katmanda gözlenmez; yalnızca çok kuvvetli kümülonimbus bulutları tropopozu aşarak stratosfere ulaşabilir.

MEZOSFER (50 – 85 km):
Sıcaklık tekrar düşer ve atmosferin en soğuk noktası (yaklaşık -90 °C) mezopozda bulunur. Meteorlar bu katmanda yanar.

TERMOSFER (85 – 600 km):
Güneş radyasyonunun doğrudan etkisiyle sıcaklık hızla artar. İyonosfer bu katman içinde yer alır ve radyo dalgalarının yansımasını sağlar.

EGZOSFER (600 km üzeri):
Atmosferin en dış katmanıdır. Gaz yoğunluğu son derece düşüktür ve uzaya geçiş bölgesidir.

DENİZCİLİK AÇISINDAN ÖNEMİ:
Tüm meteorolojik olaylar troposferde meydana gelir. Denizcinin ilgilendiği bulut oluşumları, yağış, rüzgâr ve görüş koşulları bu katmandaki fiziksel süreçlere bağlıdır. Tropopoz yüksekliğinin enlemle değişmesi, tropikal ve kutupsal hava sistemlerinin yapısını doğrudan etkiler.`,
    bulletPoints: [
      "Troposfer: 0-12 km, tüm hava olayları burada gerçekleşir",
      "Her 1.000 m yükseklikte sıcaklık ortalama 6,5 °C düşer",
      "Stratosfer ozon tabakasını barındırır",
      "İyonosfer radyo haberleşmesi için kritiktir",
    ],
    keyPoints: [
      "Denizcilik meteorolojisi troposferle ilgilenir",
      "Tropopoz yüksekliği enlemle değişir (ekvator: 16 km, kutup: 8 km)",
      "Çevresel azalma oranı (ELR) sıcaklık tahmininde kullanılır",
    ],
  },
  "atmo-composition": {
    title: "Atmosferin Bileşimi",
    introduction: "Kuru atmosfer hacimsel olarak %78 azot ve %21 oksijenden oluşur; geri kalan %1'lik pay argon, karbondioksit ve eser gazlardan meydana gelir.",
    content: `KURU HAVA BİLEŞİMİ:

Azot (N₂): %78,09
Oksijen (O₂): %20,95
Argon (Ar): %0,93
Karbondioksit (CO₂): %0,04
Neon, Helyum, Metan, Kripton: Eser miktarlarda

SU BUHARI:
Kuru hava bileşimine dâhil edilmez. Hacimsel oranı %0 ile %4 arasında değişir. Tropikal deniz yüzeyinde en yüksek, kutuplarda ve yükseklerde en düşük değerlere ulaşır. Su buharı atmosferdeki en önemli sera gazıdır ve faz değişimleri (buharlaşma, yoğunlaşma) sırasında büyük miktarda enerji (gizli ısı) taşır.

AEROSOL VE PARÇACIKLAR:
Tuz kristalleri, toz, volkanik kül ve organik parçacıklar yoğunlaşma çekirdeği olarak görev yapar. Deniz üzerinde tuz aerosolleri bulut oluşumunda birincil çekirdek görevi görür. Bu nedenle deniz üzerinde bulut oluşumu, kara üzerine kıyasla daha kolay gerçekleşir.

OZON (O₃):
Stratosfer içinde 20-30 km yükseklikte yoğunlaşır. Güneşin zararlı UV-B ve UV-C radyasyonunu absorbe eder. Troposfer seviyesinde düşük miktarda bulunur.`,
    bulletPoints: [
      "Atmosferin %99'u azot ve oksijenden oluşur",
      "Su buharı hacimsel olarak %0-4 arasında değişir",
      "Tuz kristalleri deniz üzerinde yoğunlaşma çekirdeği görevi görür",
      "Ozon tabakası UV radyasyonu absorbe eder",
    ],
    keyPoints: [
      "Su buharı en önemli sera gazıdır ve gizli ısı taşır",
      "Deniz aerosolleri bulut oluşumunu kolaylaştırır",
      "Atmosfer bileşimi yükseklikle değişmez (homojen tabaka: 0-80 km)",
    ],
  },
  "atmo-heat-transfer": {
    title: "Isı Transferi Mekanizmaları",
    introduction: "Atmosferdeki ısı, radyasyon, kondüksiyon (iletim) ve konveksiyon (taşınım) yoluyla transfer edilir.",
    content: `ISI TRANSFERİ YOLLARI:

1. RADYASYON (IŞINIM):
Güneş enerjisi kısa dalga radyasyon olarak Dünya'ya ulaşır. Yeryüzü bu enerjiyi absorbe eder ve uzun dalga (kızılötesi) radyasyon olarak tekrar yayar. Atmosferdeki su buharı ve CO₂ bu uzun dalga radyasyonu tutar (sera etkisi). Deniz yüzeyinin radyasyon dengesi, bölgesel iklimi belirler.

2. KONDÜKSİYON (İLETİM):
Temas yoluyla ısı geçişidir. Atmosferde rolü sınırlıdır çünkü hava kötü bir iletkendir. Ancak deniz yüzeyi ile temas halindeki ilk birkaç santimetrelik hava tabakası arasında kondüksiyon önemlidir. Bu mekanizma, adveksiyon sisi oluşumunda temel süreçtir.

3. KONVEKSİYON (TAŞINIM):
Isınan havanın yükselmesi ve soğuk havanın alçalmasıyla oluşan dikey hava hareketi. Kümülüs tipi bulutların oluşumunda birincil mekanizmadır. Deniz yüzeyinden ısınan hava parselinin yükselmesi, enerji ve su buharını troposferin üst kısımlarına taşır.

4. ADVEKSİYON:
Isının yatay hava hareketiyle taşınmasıdır. Sıcak hava kütlesinin soğuk deniz yüzeyine doğru hareketi adveksiyon sisi oluşturur. Rüzgâr sistemleri büyük ölçekte ısıyı ekvatordan kutuplara taşır.`,
    bulletPoints: [
      "Radyasyon: Güneşten kısa dalga, yerden uzun dalga ışınım",
      "Kondüksiyon: Temas yoluyla ısı geçişi (siste önemli)",
      "Konveksiyon: Isınan havanın yükselmesi (kümülüs oluşumu)",
      "Adveksiyon: Isının yatay rüzgârla taşınması",
    ],
    keyPoints: [
      "Deniz meteorolojisinde adveksiyon sisi kondüksiyon+adveksiyonla oluşur",
      "Konveksiyon kümülüs bulutlarının ve yağışın temel nedenidir",
      "Sera etkisi uzun dalga radyasyonun tutulmasıyla gerçekleşir",
    ],
  },
  "atmo-temperature": {
    title: "Sıcaklık Dağılımı ve Ölçümü",
    introduction: "Atmosfer sıcaklığı yükseklik, enlem, kara-deniz dağılımı ve mevsime bağlı olarak değişir.",
    content: `SICAKLIK ÖLÇÜMÜ:
Gemilerde sıcaklık, standart meteoroloji kulübesinde (Stevenson Screen) kuru ve yaş termometre ile ölçülür. Ölçüm güverte seviyesinden en az 1,2 m yükseklikte, doğrudan güneş ışığından korunmuş şekilde yapılır.

YÜKSEKLIKLE DEĞİŞİM:
Troposferde sıcaklık yükseldikçe azalır. Normal koşullarda çevresel azalma oranı (ELR) 6,5 °C / 1.000 m'dir.

Kuru adyabatik azalma oranı (DALR): 10 °C / 1.000 m — doygun olmayan hava parseli
Islak adyabatik azalma oranı (SALR): 5-6 °C / 1.000 m — doygun hava parseli

SICAKLIK İNVERSİYONU:
Normal azalma oranının tersine, belirli bir yükseklikte sıcaklığın artmasıdır. Denizde sıklıkla deniz yüzeyindeki soğuk akıntılar üzerinde oluşur. İnversiyon tabakası dikey hava hareketini engeller, sis ve pus oluşumunu artırır, bulut gelişimini sınırlar.

DENİZ-KARA ETKİSİ:
Deniz yüzeyinin yüksek ısı kapasitesi nedeniyle kıyı bölgelerinde günlük ve yıllık sıcaklık farkı karasal bölgelere göre çok düşüktür. Bu durum deniz ikliminin ılıman karakterini belirler.`,
    bulletPoints: [
      "ELR: 6,5 °C / 1.000 m (çevresel azalma oranı)",
      "DALR: 10 °C / 1.000 m (kuru adyabatik)",
      "SALR: 5-6 °C / 1.000 m (doygun adyabatik)",
      "İnversiyon tabakası sis oluşumunu artırır",
    ],
    examples: [
      {
        problem: "Deniz seviyesinde sıcaklık 20 °C ise, 2.000 m yükseklikteki tahmini sıcaklık nedir? (ELR = 6,5 °C/km)",
        solution: "T = 20 − (6,5 × 2) = 20 − 13 = 7 °C",
      },
    ],
    keyPoints: [
      "Sıcaklık inversiyonu sis ve pusun habercisidir",
      "Denizde günlük sıcaklık farkı karaya göre çok azdır",
      "DALR ve SALR atmosferik stabilite analizinde kullanılır",
    ],
  },
  "atmo-insolation": {
    title: "Güneş Radyasyonu ve İnsolasyon",
    introduction: "İnsolasyon, birim yüzeye birim zamanda gelen güneş radyasyonu miktarıdır ve Dünya'nın ısı dengesinin temel kaynağıdır.",
    content: `GÜNEŞ SABİTİ:
Atmosferin dışında, güneş ışınlarına dik 1 m² yüzeye gelen enerji yaklaşık 1.361 W/m² (güneş sabiti). Bu enerjinin yaklaşık %30'u doğrudan uzaya yansıtılır (albedo). Kalan %70 atmosfer ve yeryüzü tarafından absorbe edilir.

İNSOLASYONU ETKİLEYEN FAKTÖRLER:

1. GÜNEŞ AÇISI:
Güneş ışınlarının geliş açısı ne kadar dik olursa, birim alana düşen enerji o kadar fazladır. Ekvator bölgesi en fazla insolasyon alır.

2. GÜN UZUNLUĞU:
Yaz aylarında yüksek enlemlerde gün uzunluğu artar, toplam insolasyon yükselir. Ancak güneş açısı düşük olduğu için ekvator kadar verimli değildir.

3. BULUT ÖRTÜSÜ:
Bulutlar güneş radyasyonunu yansıtır ve absorbe eder. Kalın bulut örtüsü altında yüzeye ulaşan radyasyon %80'e kadar azalabilir.

4. YÜZEY ALBEDOsu:
Açık deniz yüzeyi güneş radyasyonunun büyük kısmını absorbe eder (albedo ≈ %6-10). Buz ve kar kaplı yüzeyler ise %80-90 oranında yansıtır.

DENİZDE SICAKLIK DENGESİ:
Okyanus yüzeyi güneş enerjisini derinlere aktarır ve yavaş ısınıp yavaş soğur. Bu özellik deniz ikliminin ılıman olmasının temel nedenidir.`,
    bulletPoints: [
      "Güneş sabiti: ~1.361 W/m²",
      "Dünya albedosu: ~%30 (yansıtılan enerji oranı)",
      "Deniz yüzeyi albedosu: %6-10 (enerjiyi absorbe eder)",
      "Bulut örtüsü radyasyonu %80'e kadar azaltabilir",
    ],
    keyPoints: [
      "Okyanus yüksek ısı kapasitesiyle iklimi düzenler",
      "Ekvator-kutup enerji farkı atmosfer dolaşımını sürükler",
      "Deniz buzu erimesi albedoyu azaltarak ısınmayı hızlandırır",
    ],
  },

  // =====================================================
  // BÖLÜM 2 - ATMOSFER BASINCI VE RÜZGÂR
  // =====================================================
  "pressure-def": {
    title: "Atmosfer Basıncı ve Ölçümü",
    introduction: "Atmosfer basıncı, havanın ağırlığından kaynaklanan kuvvettir ve hektopaskal (hPa) veya milibar (mb) birimiyle ölçülür.",
    content: `TANIMLAR:
Standart atmosfer basıncı: 1013,25 hPa (= 1013,25 mb = 760 mmHg = 29,92 inHg)

1 hPa = 1 mb (birim olarak eşdeğerdir)

Basınç yükseklikle azalır. Deniz seviyesinden itibaren her 8,5 m yükseklik artışında basınç yaklaşık 1 hPa düşer (alt troposferde).

BAROMETRE TÜRLERİ:
1. Civalı Barometre: En hassas ölçümü sağlar. Gemilerde sallanmayı kompanze eden deniz tipi civalı barometreler kullanılır. Okunan değer sıcaklık, yerçekimi ve yükseklik düzeltmeleri uygulanarak deniz seviyesine indirgenir.

2. Aneroid Barometre: Metal kapsül içindeki vakum basınç değişimlerine göre genleşir veya büzülür. Taşınabilir ve darbeye dayanıklıdır. Düzenli kalibrasyon gerektirir.

3. Barograf: Aneroid mekanizmalı, basınç değişimini kâğıt üzerine sürekli kaydeden cihaz. 24 saatlik veya haftalık kayıt yapar. Basınç eğilimi (tendency) analizi için kullanılır.

BASINÇ EĞİLİMİ (TENDENCY):
Son 3 saatteki basınç değişimi, hava tahmininde kritik bilgidir. 3 saatte 3 hPa'dan fazla düşüş, kötüleşen hava koşullarının göstergesidir. Hızlı basınç düşüşü yaklaşan fırtına veya derin alçak basınç sistemi işaretidir.`,
    bulletPoints: [
      "Standart basınç: 1013,25 hPa",
      "Her 8,5 m yükseklikte basınç ~1 hPa düşer",
      "Barograf basınç eğilimini sürekli kaydeder",
      "3 saatte >3 hPa düşüş fırtına uyarısıdır",
    ],
    examples: [
      {
        problem: "Köprüüstü 15 m yükseklikte olup aneroid barometre 1010,0 hPa gösteriyorsa deniz seviyesi basıncı nedir?",
        solution: "Düzeltme = 15 / 8,5 ≈ 1,8 hPa. Deniz seviyesi basıncı = 1010,0 + 1,8 = 1011,8 hPa",
      },
    ],
    keyPoints: [
      "Tüm basınç okumaları deniz seviyesine indirgenir",
      "Basınç eğilimi hava tahmininde temel göstergedir",
      "Barograf kaydı PSC denetimlerinde kontrol edilir",
    ],
  },
  "pressure-systems": {
    title: "Basınç Sistemleri (Siklon / Antisiklon)",
    introduction: "Siklon (alçak basınç) ve antisiklon (yüksek basınç) sistemleri atmosferik dolaşımın ve hava olaylarının temel yapı taşlarıdır.",
    content: `ALÇAK BASINÇ SİSTEMİ (SİKLON / DEPRESYON):
Merkezde basınç çevre ortalamasının altındadır. Kuzey yarımkürede rüzgâr saat yönünün tersine, güney yarımkürede saat yönünde döner (Coriolis etkisi). Merkeze doğru birleşen hava yükselir, soğur ve yoğunlaşır. Bu nedenle alçak basınç sistemleri bulutlu, yağışlı ve rüzgârlı hava ile ilişkilendirilir.

Derin alçak basınç: Merkez basıncı 980 hPa'nın altındaki sistemler. Kuvvetli rüzgâr ve fırtına koşulları oluşturur.

YÜKSEK BASINÇ SİSTEMİ (ANTİSİKLON):
Merkezde basınç çevre ortalamasının üstündedir. Kuzey yarımkürede saat yönünde, güney yarımkürede saat yönünün tersine döner. Merkezdeki hava alçalır (subsidence), ısınır ve kuruyan hava açık gökyüzü ve iyi görüş oluşturur. Rüzgâr hızı genellikle düşüktür.

Ancak antisiklon kenarlarında basınç gradyanı artabilir ve güçlü rüzgâr oluşabilir. Ayrıca sıcak mevsimde alt seviyelerde tuzak nem birikmesiyle sis veya pus oluşabilir.

BUYS BALLOT KURALI:
Kuzey yarımkürede rüzgâra arkanızı döndüğünüzde, alçak basınç sol tarafınızda, yüksek basınç sağ tarafınızda kalır. Güney yarımkürede durum tersidir. Bu kural gemiciler için basınç merkezlerinin konumunu tahmin etmede pratik bir yöntemdir.`,
    bulletPoints: [
      "Alçak basınç: bulutlu, yağışlı, rüzgârlı hava",
      "Yüksek basınç: açık gökyüzü, iyi görüş, hafif rüzgâr",
      "KYK'de siklon saat yönü tersi, antisiklon saat yönünde döner",
      "Buys Ballot kuralı basınç merkezi tahmininde kullanılır",
    ],
    keyPoints: [
      "Derin alçak basınç (<980 hPa) fırtına koşulları demektir",
      "Antisiklon kenarlarında kuvvetli rüzgâr oluşabilir",
      "Buys Ballot kuralını her denizci bilmelidir",
    ],
  },
  "isobars": {
    title: "İzobar ve Basınç Gradyanı",
    introduction: "İzobarlar, harita üzerinde eşit basınç değerlerini birleştiren çizgilerdir ve rüzgâr yönü ile hızını belirlemede kullanılır.",
    content: `İZOBAR TANIMI:
Deniz seviyesine indirgenmiş eşit basınç noktalarını birleştiren eğriler. Standart aralık 4 hPa'dır (1000, 1004, 1008, 1012, 1016 hPa gibi).

BASINÇ GRADYANI:
İki izobar arasındaki basınç farkının mesafeye oranıdır. İzobarlar birbirine ne kadar yakınsa gradyan o kadar büyük, dolayısıyla rüzgâr o kadar kuvvetlidir.

RÜZGÂR VE İZOBAR İLİŞKİSİ:
Sürtünmesiz ortamda (üst atmosfer) rüzgâr izobarlara paralel eser (jeostrofik rüzgâr). Yüzey sürtünmesi nedeniyle deniz üzerinde rüzgâr izobarlarla yaklaşık 10-15° açı yapar (karada 25-30°). Bu açı nedeniyle yüzey rüzgârı kısmen alçak basınç merkezine doğru yönelir.

SİNOPTİK HARİTADA OKUMA:
- Dairesel, kapalı izobarlar: Basınç merkezi (H veya L)
- Sık izobarlar: Kuvvetli rüzgâr bölgesi
- Seyrek izobarlar: Hafif rüzgâr bölgesi
- V şeklinde bükülme: Oluk (trough) — kötü hava bölgesi
- Ters V şeklinde bükülme: Sırt (ridge) — iyi hava bölgesi`,
    bulletPoints: [
      "İzobar aralığı: standart 4 hPa",
      "Sık izobar = kuvvetli rüzgâr",
      "Deniz üzerinde rüzgâr-izobar açısı: 10-15°",
      "Karada rüzgâr-izobar açısı: 25-30°",
    ],
    keyPoints: [
      "İzobar haritası okuyabilmek temel denizcilik becerisidir",
      "Oluk bölgeleri cephe ve kötü hava ile ilişkilidir",
      "Basınç gradyanı rüzgâr kuvvetinin doğrudan göstergesidir",
    ],
  },
  "wind-forces": {
    title: "Rüzgârı Etkileyen Kuvvetler",
    introduction: "Rüzgâr, basınç gradyanı kuvveti, Coriolis kuvveti, sürtünme kuvveti ve merkezkaç kuvvetinin bileşkesi olarak oluşur.",
    content: `1. BASINÇ GRADYANI KUVVETİ (PGF):
Yüksek basınçtan alçak basınca doğru, izobarlara dik yönde etkir. Rüzgârın birincil nedenidir. İzobarlar ne kadar sıksa PGF o kadar büyüktür.

2. CORİOLİS KUVVETİ:
Dünya'nın dönüşünden kaynaklanan sanal kuvvet. Kuzey yarımkürede hareket yönünün sağına, güney yarımkürede soluna saptırır. Ekvator'da sıfırdır, kutuplara doğru artar. Rüzgâr hızıyla doğru orantılıdır.

3. SÜRTÜNME KUVVETİ:
Yüzey pürüzlülüğünden kaynaklanır. Rüzgâr hızını azaltır ve rüzgâr yönünü alçak basınca doğru kırdırır. Deniz üzerinde sürtünme karaya göre düşüktür, bu nedenle denizde rüzgâr hızı karadan yüksektir.

4. JEOSTROFİK RÜZGÂR:
PGF ve Coriolis kuvvetinin dengelendiği durumda oluşur. İzobarlara paralel eser. Yüzey sürtünmesinin etkili olmadığı yaklaşık 1.000 m üzerinde geçerlidir.

5. GRADYAN RÜZGÂRI:
Eğri izobarlarda PGF, Coriolis ve merkezkaç kuvvetinin dengelenmesiyle oluşur. Siklon ve antisiklon çevresindeki gerçek rüzgâr akışını tanımlar.`,
    bulletPoints: [
      "PGF: Rüzgârın birincil nedeni, yüksekten alçak basınca doğru",
      "Coriolis: KYK'de sağa, GYK'de sola saptırır",
      "Sürtünme deniz üzerinde düşüktür → denizde rüzgâr daha kuvvetli",
      "Jeostrofik rüzgâr izobarlara paralel eser",
    ],
    keyPoints: [
      "PGF olmadan rüzgâr oluşmaz",
      "Coriolis etkisi enlemle artar, ekvator'da sıfırdır",
      "Deniz-kara rüzgâr hız farkı sürtünme farkından kaynaklanır",
    ],
  },
  "wind-types": {
    title: "Genel Rüzgâr Dolaşımı ve Yerel Rüzgârlar",
    introduction: "Dünya genelinde enerji dengesizliği üç hücreli genel dolaşım sistemini oluşturur; bölgesel koşullar ise yerel rüzgâr sistemlerini meydana getirir.",
    content: `GENEL DOLAŞIM SİSTEMİ (ÜÇ HÜCRE MODELİ):

HADLEY HÜCRESİ (0°-30°):
Ekvatorda yükselen sıcak hava kutuplara doğru hareket eder, yaklaşık 30° enlemde alçalır. Yüzeyde ekvatora dönen hava, Coriolis etkisiyle kuzeydoğu (KYK) veya güneydoğu (GYK) yönünde eser. Bunlar alize (trade winds) rüzgârlarıdır.

FERREL HÜCRESİ (30°-60°):
Dolaylı bir hücre. Yüzeyde batılı rüzgârlar (westerlies) hâkimdir. Orta enlem alçak basınç sistemleri ve cepheler bu bölgede oluşur.

POLAR HÜCRE (60°-90°):
Kutuplarda soğuk, yoğun hava alçalır ve ekvatora doğru hareket eder. Kutupsal doğulu rüzgârlar oluşturur.

ÖNEMLİ RÜZGÂR KUŞAKLARI:
- Doldrums (ITCZ): Ekvator çevresindeki durgun hava bölgesi
- Trade Winds: 10°-30° arası sürekli esen alizeler
- Horse Latitudes: ~30° enlemde hafif rüzgâr bölgesi
- Westerlies: 35°-60° arası hâkim batılılar
- Roaring Forties, Furious Fifties, Shrieking Sixties: Güney yarımküre güçlü batılıları

YEREL RÜZGÂRLAR:
- Meltem (Sea/Land Breeze): Gündüz denizden karaya, gece karadan denize
- Fön: Dağ aşırı sıcak kuru rüzgâr
- Katabatik: Dağ yamaçlarından aşağı akan soğuk rüzgâr
- Lodos: Marmara ve Ege'de güneybatıdan esen ılık rüzgâr
- Poyraz: Kuzeydoğudan esen soğuk rüzgâr`,
    bulletPoints: [
      "Alize rüzgârları (trade winds) KYK'de kuzeydoğudan eser",
      "Batılılar (westerlies) 35-60° enlemde hâkimdir",
      "ITCZ ekvator civarında durgun hava bölgesidir",
      "Meltem gündüz denizden karaya, gece karadan denize eser",
    ],
    keyPoints: [
      "Genel dolaşım sistemi ticaret rotalarını tarihsel olarak belirlemiştir",
      "Güney yarımküre batılıları karası az olduğu için çok kuvvetlidir",
      "ITCZ mevsimsel olarak kuzey-güney yer değiştirir",
    ],
  },
  "beaufort-scale": {
    title: "Beaufort Skalası",
    introduction: "Beaufort skalası, rüzgâr kuvvetini 0'dan 12'ye kadar derecelendiren uluslararası standarttır ve denizciler tarafından yaygın olarak kullanılır.",
    content: `BEAUFORT SKALASI:

Kuvvet 0 — Durgun (Calm): 0-1 knot, deniz ayna gibi
Kuvvet 1 — Hafif esinti (Light Air): 1-3 knot, küçük dalgacıklar
Kuvvet 2 — Hafif rüzgâr (Light Breeze): 4-6 knot, kısa küçük dalgalar
Kuvvet 3 — Zayıf rüzgâr (Gentle Breeze): 7-10 knot, dalgacıklar kırılmaya başlar
Kuvvet 4 — Ilımlı rüzgâr (Moderate Breeze): 11-16 knot, beyaz köpükler sıklaşır
Kuvvet 5 — Sert rüzgâr (Fresh Breeze): 17-21 knot, orta dalgalar, belirgin köpük
Kuvvet 6 — Kuvvetli rüzgâr (Strong Breeze): 22-27 knot, büyük dalgalar oluşur
Kuvvet 7 — Sert (Near Gale): 28-33 knot, dalga köpükleri rüzgâr yönünde sürüklenir
Kuvvet 8 — Fırtına öncesi (Gale): 34-40 knot, yüksek dalgalar, köpük çizgileri
Kuvvet 9 — Şiddetli fırtına (Strong Gale): 41-47 knot, çok yüksek dalgalar
Kuvvet 10 — Tam fırtına (Storm): 48-55 knot, aşırı yüksek dalgalar, görüş azalır
Kuvvet 11 — Şiddetli fırtına (Violent Storm): 56-63 knot, olağanüstü dalgalar
Kuvvet 12 — Kasırga (Hurricane): 64+ knot, hava köpük ve serpintiyle dolu

DENİZ DURUMU İLE İLİŞKİ:
Beaufort skalasında her kuvvet derecesine karşılık gelen anlamlı dalga yüksekliği (Hs) değerleri de tanımlıdır. Örneğin Beaufort 7 için Hs ≈ 4-5,5 m, Beaufort 10 için Hs ≈ 9-12,5 m.

GEMİDE KULLANIMI:
Deniz gözlemiyle rüzgâr kuvveti tahmin edilir ve meteoroloji jurnalına kaydedilir. Seyir planlamasında Beaufort değeri güvenli hız ve rota kararlarında kullanılır.`,
    bulletPoints: [
      "Beaufort 0: Durgun, Beaufort 12: Kasırga",
      "Knot cinsinden hız aralıkları belirlenmiştir",
      "Her dereceye karşılık dalga yüksekliği tanımlıdır",
      "Deniz gözlemiyle Beaufort tahmini yapılabilir",
    ],
    keyPoints: [
      "Beaufort 8 ve üzeri resmi olarak fırtına koşullarıdır",
      "Gemilerde hava gözlemi Beaufort skalasıyla kaydedilir",
      "Rüzgâr hızı knot, dalga yüksekliği metre cinsinden ifade edilir",
    ],
  },

  // =====================================================
  // BÖLÜM 3 - NEM, BULUTLAR VE YAĞIŞ
  // =====================================================
  "humidity-concepts": {
    title: "Nem Kavramları",
    introduction: "Nem, havadaki su buharı miktarını ifade eder ve mutlak nem, bağıl nem ve özgül nem olarak farklı şekillerde tanımlanır.",
    content: `NEM TÜRLERİ:

MUTLAK NEM:
Birim hacim havadaki su buharı kütlesi (g/m³). Sıcaklıkla doğrudan ilişkilidir; sıcak hava daha fazla su buharı tutabilir.

BAĞIL NEM (Relative Humidity — RH):
Havadaki mevcut su buharı miktarının, o sıcaklıkta havanın tutabileceği maksimum miktara oranıdır. Yüzde olarak ifade edilir.

RH = (Gerçek buhar basıncı / Doygun buhar basıncı) × 100

RH = %100 olduğunda hava doygundur; yoğunlaşma başlar. Sıcaklık düştükçe doygunluk noktasına daha kolay ulaşılır.

ÖZGÜL NEM:
Birim kütle havadaki su buharı kütlesi (g/kg). Hava parselinin yükselmesi veya alçalmasında değişmez (yoğunlaşma olmadığı sürece), bu nedenle meteorolojik hesaplamalarda tercih edilir.

YAŞIK VE KURU TERMOMETRE:
Gemilerde psikrometre (wet-dry bulb thermometer) kullanılarak bağıl nem ölçülür. Kuru termometre hava sıcaklığını, yaş termometre buharlaşma sonucu soğumuş sıcaklığı gösterir. İki ölçüm arasındaki fark (depression) büyükse bağıl nem düşüktür.`,
    bulletPoints: [
      "Bağıl nem (%RH): Doygunluğa oranı gösterir",
      "RH = %100 → hava doygun, yoğunlaşma başlar",
      "Psikrometre: yaş-kuru termometre farkıyla nem ölçümü",
      "Sıcaklık düşerse aynı nem miktarıyla RH artar",
    ],
    examples: [
      {
        problem: "Kuru termometre: 25 °C, yaş termometre: 20 °C. Depression = ?",
        solution: "Depression = 25 − 20 = 5 °C. Psikrometrik tablolardan RH ≈ %63",
      },
    ],
    keyPoints: [
      "Yaş-kuru termometre farkı büyükse hava kuru demektir",
      "Sıcak deniz üzerinde bağıl nem yüksektir",
      "Nem ölçümü sis tahmini için kritik veridir",
    ],
  },
  "dew-point": {
    title: "Çiy Noktası ve Yoğunlaşma",
    introduction: "Çiy noktası (dew point), havanın mevcut nem içeriğiyle doygunluğa ulaşacağı sıcaklıktır ve yoğunlaşma bu noktada başlar.",
    content: `ÇİY NOKTASI (DEW POINT):
Hava sıcaklığı çiy noktasına düştüğünde bağıl nem %100 olur ve su buharı yoğunlaşmaya başlar. Çiy noktası ne kadar hava sıcaklığına yakınsa, yoğunlaşma ve sis riski o kadar yüksektir.

Hava sıcaklığı − Çiy noktası = Çiy noktası açıklığı (dew point depression)

Çiy noktası açıklığı < 2 °C → Sis veya bulut oluşumu olasılığı çok yüksek

YOĞUNLAŞMA TÜRLERİ:
1. ÇİY (Dew): Açık gecelerde yüzeylerin soğumasıyla oluşur
2. KIRAGEN (Frost): Çiy noktası 0 °C altında olduğunda doğrudan buz kristalleri oluşur
3. SİS (Fog): Yüzeye yakın havada yoğunlaşma
4. BULUT (Cloud): Yükselen havanın soğumasıyla yoğunlaşma

DENİZCİLİKTE ÖNEMİ:
Gemide terleme (ship sweat / cargo sweat) çiy noktası ilişkilidir. Gemi sıcak bölgeden soğuk bölgeye geçtiğinde, ambar içindeki sıcak nemli hava soğuk gemi yapısıyla temas ederek yoğunlaşır (ship sweat). Yük sıcaklığı çiy noktasının altında kalırsa yük üzerinde yoğunlaşma olur (cargo sweat).`,
    bulletPoints: [
      "Çiy noktası açıklığı < 2 °C → sis riski çok yüksek",
      "Hava sıcaklığı = çiy noktası → RH = %100",
      "Ship sweat: Gemi yapısı üzerinde yoğunlaşma",
      "Cargo sweat: Yük yüzeyi üzerinde yoğunlaşma",
    ],
    keyPoints: [
      "Çiy noktası sis tahmini için en önemli parametredir",
      "Terleme hasarı önleme ambar havalandırmasıyla sağlanır",
      "Sıcak bölgeden soğuk bölgeye seyirde terleme riski artar",
    ],
  },
  "cloud-formation": {
    title: "Bulut Oluşumu ve Sınıflandırması",
    introduction: "Bulutlar, havadaki su buharının yoğunlaşma çekirdekleri etrafında yoğunlaşmasıyla oluşur ve oluşum mekanizmalarına göre sınıflandırılır.",
    content: `BULUT OLUŞUM MEKANİZMALARI:

1. KONVEKTİF YÜKSELME:
Güneş tarafından ısıtılan yüzey havayı ısıtır, ısınan hava yükselir. Yükselen hava parseli kuru adyabatik oranda soğur. Çiy noktasına ulaşıldığında yoğunlaşma başlar ve kümülüs bulutları oluşur. Bu seviye yoğunlaşma seviyesi (condensation level) olarak adlandırılır.

2. OROGRAFİK YÜKSELME:
Hava kütlesinin dağ veya yükseltiye çarparak yükselmesiyle oluşur. Rüzgârüstü yamaçlarda bulut ve yağış, rüzgâraltında kuru ve sıcak hava (fön etkisi) gözlenir.

3. CEPHESEL YÜKSELME:
Farklı yoğunluktaki hava kütlelerinin karşılaşmasında, sıcak hava soğuk hava üzerinden yükselir. Geniş alanda bulut örtüsü ve sürekli yağış oluşturur.

4. TÜRBÜLANS KARIŞIMI:
Yüzey sürtünmesiyle oluşan mekanik karışım, nemin üst seviyelere taşınmasını sağlar. Stratokümülüs bulutları bu mekanizmayla oluşur.

ULUSLARARASI SINIFLANDIRMA:
Bulutlar 10 ana cinse ayrılır. Yüksekliklerine göre üç seviyeye dağıtılır:
- Yüksek bulutlar (6-12 km): Cirrus, Cirrocumulus, Cirrostratus
- Orta bulutlar (2-6 km): Altocumulus, Altostratus
- Alçak bulutlar (0-2 km): Stratus, Stratocumulus, Nimbostratus
- Dikey gelişme gösteren: Cumulus, Cumulonimbus`,
    bulletPoints: [
      "Konveksiyon → kümülüs, cephesel yükselme → stratus tipi bulutlar",
      "10 ana bulut cinsi, 3 seviye",
      "Yoğunlaşma seviyesi: kuru adyabatik soğumayla çiy noktasına ulaşılan yükseklik",
      "Orogafik yükselme rüzgârüstü yağış, rüzgâraltı fön etkisi oluşturur",
    ],
    keyPoints: [
      "Bulut türünü tanımak yaklaşan hava durumunu anlamayı sağlar",
      "Kümülonimbus fırtına, şimşek ve dolu ile ilişkilidir",
      "Cephesel bulutlar geniş alana yayılır ve uzun süre yağış verir",
    ],
  },
  "cloud-types": {
    title: "Bulut Türleri ve Seviyeleri",
    introduction: "Her bulut türü farklı atmosferik koşulları yansıtır ve denizci için gelecek hava durumu hakkında bilgi sunar.",
    content: `YÜKSEK BULUTLAR (Ci, Cc, Cs) — 6.000 m üzeri:

CİRRUS (Ci): İnce, ipliksi, beyaz bulutlar. Buz kristallerinden oluşur. Tek başına iyi havayı gösterir, ancak kalınlaşıp yayılması yaklaşan sıcak cephenin habercisidir.

CİRROKÜMÜLÜS (Cc): Küçük beyaz lekeler veya dalgacıklar (uskumru gökyüzü). Nadir görülür.

CİRROSTRATUS (Cs): Gökyüzünü kaplayan ince, beyazımsı örtü. Güneş veya ay etrafında hale (halka) oluşturur. Sıcak cephenin yaklaştığını gösterir.

ORTA BULUTLAR (Ac, As) — 2.000-6.000 m:

ALTOKÜMLÜS (Ac): Beyaz veya gri lekeler halinde. Yazın sabah görülmesi öğleden sonra sağanak ihtimaline işaret eder.

ALTOSTRATUS (As): Gri örtü, güneşi buzlu cam gibi geçirir. Yaklaşan yağışın habercisidir.

ALÇAK BULUTLAR (St, Sc, Ns) — 0-2.000 m:

STRATUS (St): Düşük, gri, tek düze bulut örtüsü. Çisenti verebilir. Görüşü azaltır.

STRATOKÜMÜLÜS (Sc): Gri veya beyaz, alt kısımda dalgalı görünüm. Genellikle yağış vermez.

NİMBOSTRATUS (Ns): Koyu gri, kalın, sürekli yağış veren bulut. Güneşi tamamen kapatır.

DİKEY GELİŞME GÖSTEREN BULUTLAR:

KÜMÜLÜS (Cu): Beyaz, dikey gelişen, karnabahar görünümlü. İyi hava kümülüsü küçük ve yassıdır. Büyüyerek kümülonimbusa dönüşebilir.

KÜMÜLONİMBUS (Cb): Örs başlı dev bulut. Sağanak, fırtına, şimşek, dolu ve ani rüzgâr değişimleri ile ilişkilidir. Denizciler için en tehlikeli bulut türüdür.`,
    bulletPoints: [
      "Cirrostratus → hale → sıcak cephe yaklaşıyor",
      "Nimbostratus: sürekli yağış veren alçak bulut",
      "Kümülonimbus: fırtına, şimşek ve dolu riski",
      "İyi hava kümülüsü küçük ve yassıdır",
    ],
    keyPoints: [
      "Bulut sırasını izlemek cephe yaklaşmasını gösterir: Ci → Cs → As → Ns",
      "Kümülonimbus denizciler için en tehlikeli bulut türüdür",
      "Deniz üzerinde stratokümülüs en yaygın bulut türüdür",
    ],
  },
  "precipitation-types": {
    title: "Yağış Türleri ve Oluşumu",
    introduction: "Yağış, atmosferde yoğunlaşan su damlacıkları veya buz kristallerinin yeterli büyüklüğe ulaşarak yere düşmesidir.",
    content: `YAĞIŞ OLUŞUM SÜRECİ:

BERGERON-FINDEISEN TEORİSİ:
Bulut içinde buz kristalleri ve aşırı soğumuş su damlacıkları bir arada bulunur. Buzun buhar basıncı suyunkinden düşük olduğu için su damlacıkları buharlaşırken buz kristalleri büyür. Yeterli ağırlığa ulaşan kristaller düşmeye başlar.

ÇARPIŞMA-BİRLEŞME TEORİSİ:
Sıcak (tropikal) bulutlarda buz kristali oluşmaz. Büyük damlacıklar küçükleri yakalayarak büyür ve yağış oluşturur.

YAĞIŞ TÜRLERİ:

YAĞMUR (Rain): Çapı 0,5 mm üzerinde su damlaları. Sürekli yağmur genellikle cephesel (nimbostratus); sağanak ise konvektif (kümülonimbus) kaynaklıdır.

ÇİSENTİ (Drizzle): 0,5 mm altında çok küçük damlacıklar. Stratus bulutlarından düşer. Görüşü azaltır.

KAR (Snow): Buz kristallerinin çeşitli formlarda birleşmesiyle oluşur. Yüzey sıcaklığı 0 °C altında olduğunda yere kar olarak ulaşır.

DOLU (Hail): Kümülonimbus içinde kuvvetli yükselme akımlarıyla taşınan buz parçacıkları katman katman büyür. 5 mm ile 10 cm arası çaplara ulaşabilir.

SAĞANAK (Shower): Ani başlayan ve biten, konvektif kaynaklı yağış. Kümülüs ve kümülonimbus bulutlarından düşer.

DENİZDE YAĞIŞIN ETKİLERİ:
Şiddetli yağış görüşü ciddi ölçüde azaltır. Radar ekranında yağış ekoları hedefleri maskeleyebilir. Dolu güverte ekipmanına zarar verebilir.`,
    bulletPoints: [
      "Sürekli yağmur: cephesel (Ns), sağanak: konvektif (Cb)",
      "Çisenti stratus bulutlarından düşer, görüşü azaltır",
      "Dolu kümülonimbus içinde oluşur",
      "Yağış radarı maskeleyebilir",
    ],
    keyPoints: [
      "Yağış türü bulut türüyle doğrudan ilişkilidir",
      "Sağanak ani başlar ve biter; sürekli yağmur saatlerce devam eder",
      "Radarın yağış modunda kullanımı sis ve yağışta kritiktir",
    ],
  },

  // =====================================================
  // BÖLÜM 4 - GÖRÜŞ VE SİS
  // =====================================================
  "visibility-def": {
    title: "Denizde Görüş ve Etkileyen Faktörler",
    introduction: "Meteorolojik görüş, normal gözle ufukta bir cismin seçilebileceği maksimum mesafedir ve deniz emniyeti açısından kritik bir parametredir.",
    content: `GÖRÜŞ TANIMLARI:
Meteorolojik görüş: Gündüz, ufukta koyu renkli bir cismin görülebildiği mesafe. Gece, orta şiddette bir ışığın seçilebildiği mesafe.

GÖRÜŞ SINIFLANDIRMASI:
- Çok iyi: >10 deniz mili
- İyi: 5-10 deniz mili
- Orta: 2-5 deniz mili
- Kötü: 1.000 m - 2 deniz mili
- Sis: <1.000 m
- Yoğun sis: <200 m

GÖRÜŞÜ AZALTAN FAKTÖRLER:
1. SİS: En önemli neden. Görüşü 1.000 m altına düşürür.
2. YAĞIŞ: Şiddetli yağmur ve kar görüşü ciddi ölçüde azaltır.
3. PUS (Haze/Mist): Kuru parçacıklar (haze) veya ince nem (mist, 1-5 km görüş) nedeniyle azalma.
4. DUMAN: Orman yangınları veya endüstriyel kaynaklar.
5. SERPINTI (Spray): Şiddetli rüzgâr ve dalgada deniz serpintisi.
6. KUM/TOZ FIRTINASI: Sahile yakın bölgelerde.

COLREG KURAL 19:
Kısıtlı görüş koşullarında tüm gemiler güvenli hızda seyretmeli, radar kullanmalı ve sis düdüğü işaretleri vermelidir. Mekanik araçla yol alan gemi 2 dakikada bir uzun düdük çalar.`,
    bulletPoints: [
      "Sis: görüş <1.000 m, yoğun sis: <200 m",
      "COLREG Kural 19 kısıtlı görüşte geçerlidir",
      "Sis düdüğü: mekanik araçla yol alan gemi 2 dakikada bir uzun düdük",
      "Pus (mist): görüş 1.000-5.000 m arasında",
    ],
    keyPoints: [
      "Görüş 1.000 m altına düştüğünde resmi olarak sis koşulları geçerlidir",
      "COLREG Kural 19 kısıtlı görüş prosedürlerini zorunlu kılar",
      "Radar kısıtlı görüşte birincil navigasyon aracı olur",
    ],
  },
  "fog-types": {
    title: "Sis Türleri ve Oluşum Mekanizmaları",
    introduction: "Sis, yüzeye yakın hava tabakasında su buharının yoğunlaşmasıyla oluşan ve görüşü 1.000 metrenin altına düşüren meteorolojik olaydır.",
    content: `SİS TÜRLERİ:

1. ADVEKSİYON SİSİ:
Sıcak nemli havanın soğuk yüzey üzerine hareket etmesiyle oluşur. Denizde en yaygın sis türüdür. Gulf Stream'den Labrador akıntısına doğru esen rüzgâr, Newfoundland Grand Banks bölgesinde yoğun adveksiyon sisi oluşturur. Rüzgâr ile oluşur ve kalıcıdır.

2. RADYASYON SİSİ:
Açık gecelerde kara yüzeyinin radyasyonla soğumasıyla oluşur. Karasal kökenlidir, deniz üzerinde oluşmaz. Ancak kıyı yakınlarında kara sisi denize doğru kayabilir. Sabah güneşle çözülür.

3. CEPHESEL SİS:
Sıcak cephe önünde, üst seviyelerden düşen yağışın alt seviyelerdeki soğuk havada buharlaşmasıyla oluşur. Cephe geçişiyle birlikte çözülür.

4. BUHARLAŞMA SİSİ (Steam Fog / Arctic Smoke):
Soğuk havanın sıcak su yüzeyi üzerinde hareket etmesiyle oluşur. Arktik bölgelerde kış aylarında açık deniz yüzeyinde görülür. Kutupsal hava kütlesi sıcak okyanus akıntılarıyla karşılaştığında gözlenir.

5. YOKUŞ SİSİ (Upslope Fog):
Nemli havanın eğimli arazi boyunca yükselmesiyle oluşur. Dağlık kıyılarda görülebilir.`,
    bulletPoints: [
      "Adveksiyon sisi: sıcak nemli hava + soğuk deniz yüzeyi",
      "Radyasyon sisi: kara kökenli, denizde oluşmaz",
      "Cephesel sis: sıcak cephe önünde yağıştan buharlaşma",
      "Buharlaşma sisi: soğuk hava + sıcak deniz yüzeyi",
    ],
    keyPoints: [
      "Adveksiyon sisi denizde en sık karşılaşılan türdür",
      "Adveksiyon sisi rüzgârla oluşur, rüzgârla dağılmaz",
      "Grand Banks dünyada en yoğun deniz sisi bölgesidir",
    ],
  },
  "advection-fog": {
    title: "Adveksiyon Sisi (Deniz Sisi)",
    introduction: "Adveksiyon sisi, sıcak ve nemli bir hava kütlesinin soğuk bir deniz yüzeyi üzerinden geçmesiyle oluşan ve denizcilikte en sık karşılaşılan sis türüdür.",
    content: `OLUŞUM KOŞULLARI:
1. Sıcak, nemli hava kütlesi mevcut olmalıdır
2. Bu hava kütlesi soğuk bir yüzey üzerine hareket etmelidir
3. Hava sıcaklığı ile deniz suyu sıcaklığı arasında yeterli fark bulunmalıdır (genellikle >2 °C)
4. Hafif-orta şiddette rüzgâr bulunmalıdır (rüzgâr sisi oluşturur ve yayar)

OLUŞUM SÜRECİ:
Sıcak nemli hava soğuk deniz yüzeyiyle temas ettiğinde, alt hava tabakası kondüksiyonla soğur. Sıcaklık çiy noktasına düştüğünde yoğunlaşma başlar. Hafif rüzgâr (5-15 knot) türbülansla sisi 100-500 m kalınlığa kadar yayar.

KARAKTERİSTİKLERİ:
- Geniş alana yayılır (yüzlerce mil)
- Günlerce sürebilir
- Rüzgâr yön değiştirene veya hava kütlesi değişene kadar kalıcıdır
- Gece-gündüz farkı yoktur (radyasyon sisi gibi sabah çözülmez)

YAYGIN BÖLGELER:
- Grand Banks (Newfoundland): Gulf Stream + Labrador akıntısı
- Kuzey Pasifik: Kuroshio + Oyashio akıntısı buluşması
- Kuzey Denizi, Baltık Denizi: Yazın sıcak hava + soğuk deniz
- Kaliforniya kıyıları: Sıcak hava + soğuk akıntı`,
    bulletPoints: [
      "Sıcak nemli hava + soğuk deniz yüzeyi = adveksiyon sisi",
      "Hafif rüzgâr sisi oluşturur ve yayar (5-15 knot)",
      "Günlerce sürebilir, gündüz çözülmez",
      "Grand Banks dünyada en yoğun adveksiyon sisi bölgesidir",
    ],
    keyPoints: [
      "Deniz suyu sıcaklığı ile hava sıcaklığını karşılaştırmak sis riskini öngörmeyi sağlar",
      "Hava kütlesi değişmedikçe adveksiyon sisi çözülmez",
      "Soğuk akıntı bölgelerinde sis olasılığı yüksektir",
    ],
    warnings: [
      "Adveksiyon sisi aniden oluşabilir — sürekli radar takibi yapılmalıdır",
      "COLREG Kural 19 prosedürleri derhal uygulanmalıdır",
    ],
  },
  "radiation-fog": {
    title: "Radyasyon Sisi ve Diğer Türler",
    introduction: "Radyasyon sisi kara kökenli olup deniz üzerinde oluşmaz; ancak kıyıdan denize kayarak sahil seyirlerinde etkili olabilir.",
    content: `RADYASYON SİSİ:
Açık, bulutsuz gecelerde kara yüzeyinin uzun dalga radyasyonla hızla soğumasıyla oluşur. Üzerindeki hava kondüksiyonla soğuyarak çiy noktasına ulaşır.

Oluşum koşulları:
- Açık (bulutsuz) gece
- Hafif rüzgâr veya durgun hava (1-3 knot)
- Yüksek bağıl nem
- Karasal ortam

Özellikleri:
- Vadi ve çukurlarda toplanır (soğuk havanın birikmesi)
- Sabah güneşle birlikte çözülmeye başlar
- Genellikle 100-200 m kalınlığındadır
- Deniz üzerinde oluşmaz (deniz yüzeyinin ısı kapasitesi yüksek)

Kıyıda etkisi:
Kara üzerinde oluşan radyasyon sisi, hafif kara rüzgârıyla (land breeze) sabah saatlerinde kıyıdan denize doğru kayabilir. Bu durum liman girişlerinde ve kıyı seyirlerinde risk oluşturur.

DİĞER SİS TÜRLERİ:

BUHARLASMA SİSİ:
Çok soğuk hava sıcak su üzerine geldiğinde su yüzeyinden buharlaşma artar ve hemen yoğunlaşır. Arktik bölgelerde polynya (açık su) alanlarında ve kış aylarında iç sularda görülür.

TROPİKAL SİS:
Tropikal bölgelerde sis nadirdir. Ancak trade wind inversiyonu altında, soğuk akıntı bölgelerinde (Peru kıyısı, Namibya kıyısı) düşük stratus bulutları ve pus oluşabilir.`,
    bulletPoints: [
      "Radyasyon sisi kara kökenli, denizde oluşmaz",
      "Açık gece, hafif rüzgâr, yüksek nem koşullarında oluşur",
      "Sabah güneşle çözülür",
      "Kara rüzgârıyla sabah kıyıdan denize kayabilir",
    ],
    keyPoints: [
      "Liman yaklaşmasında sabah saatlerinde radyasyon sisi riski vardır",
      "Buharlaşma sisi arktik açık su alanlarında görülür",
      "Her sis türünün oluşum mekanizması ve çözülme şekli farklıdır",
    ],
  },
  "fog-navigation": {
    title: "Siste Seyir Tedbirleri",
    introduction: "Sis koşullarında seyir emniyeti için COLREG kurallarına uyum, radar kullanımı ve düdük işaretleri zorunludur.",
    content: `COLREG KURAL 19 — KISITLI GÖRÜŞTE SEYİR:

1. GÜVENLİ HIZ:
Görüş koşullarına uygun hızda seyredilmelidir. Güvenli hız; trafik yoğunluğu, manevra kabiliyeti, radar performansı ve deniz/hava koşullarına göre belirlenir.

2. RADAR KULLANIMI:
- Radar sürekli açık ve izlenmelidir
- En az iki mesafe skalası kullanılmalıdır (yakın ve uzak)
- Sistematik radar plotlama yapılmalıdır
- ARPA hedef takibi aktif olmalıdır
- Yağış ekoları clutter filtresiyle kontrol edilmelidir

3. DÜDÜK İŞARETLERİ:
- Mekanik araçla yol alan gemi: 2 dakikada bir uzun düdük (—)
- Yol yapan ama makineleri durmuş gemi: 2 dakikada bir iki uzun düdük (— —)
- Manevra kabiliyeti kısıtlı, demir üzeri, balıkçı: 2 dakikada bir iki kısa bir uzun (· · —)
- Çekilen gemi: hemen çeken geminin ardından bir uzun üç kısa (— · · ·)
- Demirdeki gemi: 1 dakikada bir çan, 75 m üzeri: pruva çan + kıç gong

4. KÖPRÜÜSTÜNDEKİ İLAVE TEDBİRLER:
- Baş gözcüsü (lookout) konuşlandırılmalıdır
- VHF dinlemesi sürekli yapılmalıdır
- AIS bilgileri izlenmelidir
- Makine hazır (standby) tutulmalıdır
- Kaptan köprüüstüne çağrılmalıdır
- Seyir defterine detaylı kayıt tutulmalıdır`,
    bulletPoints: [
      "Radar sürekli izlenmeli, en az iki skala kullanılmalı",
      "Mekanik araçla gemi: 2 dakikada bir uzun düdük",
      "Baş gözcüsü konuşlandırılmalıdır",
      "Makine standby tutulmalıdır",
    ],
    keyPoints: [
      "COLREG Kural 19 kısıtlı görüşte zorunlu prosedürleri belirler",
      "Siste görsel seyir yerine radar seyiri esas alınır",
      "Kaptan kısıtlı görüş başladığında köprüüstünde bulunmalıdır",
    ],
    warnings: [
      "Sis koşullarında hız azaltılmadan seyir COLREG ihlalidir",
      "Düdük işaretleri verilmezse yasal sorumluluk doğar",
    ],
  },

  // =====================================================
  // BÖLÜM 5 - HAVA KÜTLELERİ VE CEPHELER
  // =====================================================
  "air-mass-types": {
    title: "Hava Kütlesi Türleri ve Kaynakları",
    introduction: "Hava kütlesi, yatayda geniş bir alanda sıcaklık ve nem bakımından homojen özelliklere sahip büyük hava hacmidir.",
    content: `HAVA KÜTLESİ SINIFLANDIRMASI:

SICAKLIK KAYNAĞINA GÖRE:
- Arktik / Antarktik (A): Kutup buz örtüsü üzerinde, çok soğuk
- Polar (P): 50-70° enlemlerde, soğuk
- Tropikal (T): 20-35° enlemlerde, sıcak
- Ekvatorial (E): Ekvator çevresinde, sıcak ve çok nemli

NEM KAYNAĞINA GÖRE:
- Denizel (maritime — m): Okyanus üzerinde oluşan, nemli
- Karasal (continental — c): Kara üzerinde oluşan, kuru

TEMEL HAVA KÜTLELERİ:
mT (Maritime Tropical): Sıcak, nemli. Subtropikal okyanus bölgelerinde oluşur. Yumuşak hava, sis ve çisenti getirir.

cT (Continental Tropical): Sıcak, kuru. Sahara ve Arabistan üzerinde oluşur. Kum ve toz fırtınaları taşıyabilir.

mP (Maritime Polar): Soğuk, nemli. Kuzey Atlantik ve Kuzey Pasifik üzerinde oluşur. Sağanak yağış ve rüzgârlı hava getirir.

cP (Continental Polar): Soğuk, kuru. Sibirya ve Kanada üzerinde oluşur. Şiddetli soğuklar ve açık hava getirir.

mA (Maritime Arctic): Çok soğuk, nemli. Arktik deniz üzerinde oluşur.

cA (Continental Arctic): Çok soğuk, çok kuru. Arktik kara üzerinde oluşur.`,
    bulletPoints: [
      "mT: sıcak-nemli, mP: soğuk-nemli, cP: soğuk-kuru, cT: sıcak-kuru",
      "Denizel (m) hava kütleleri nemli, karasal (c) olanlar kurudur",
      "Hava kütlesinin kaynağı hava koşullarını belirler",
      "İki farklı hava kütlesinin sınırında cephe oluşur",
    ],
    keyPoints: [
      "Hava kütlesi sınıflandırması hava tahmini için temel bilgidir",
      "mP havası denizde sağanak ve kuvvetli rüzgâr getirir",
      "mT havası sis ve düşük bulut örtüsü oluşturur",
    ],
  },
  "air-mass-modification": {
    title: "Hava Kütlesi Modifikasyonu",
    introduction: "Bir hava kütlesi kaynak bölgesinden uzaklaşarak farklı bir yüzey üzerinden geçtiğinde, alt seviyelerden başlayarak ısıl ve nemsel özellikleri değişir.",
    content: `MODİFİKASYON TÜRLERİ:

SICAK YÜZEY ÜZERİNDEN GEÇEN SOĞUK HAVA (Unstable Modification):
Soğuk hava kütlesi sıcak deniz yüzeyi üzerinden geçtiğinde alt kısımları ısınır, konveksiyon güçlenir, atmosfer kararsızlaşır. Sonuç: kümülüs-kümülonimbus bulutları, sağanak yağış, iyi görüş (yağış arası), kuvvetli rüzgâr. Kış aylarında Kuzey Atlantik'te cP hava kütlelerinin okyanus üzerine çıkmasıyla bu durum sıkça gözlenir.

SOĞUK YÜZEY ÜZERİNDEN GEÇEN SICAK HAVA (Stable Modification):
Sıcak hava kütlesi soğuk deniz yüzeyi üzerinden geçtiğinde alt kısımları soğur, inversiyon oluşur, atmosfer kararlılaşır. Sonuç: stratus-stratokümülüs bulutları, çisenti, sis veya pus, düşük görüş. Yazın mT hava kütlelerinin soğuk akıntı bölgelerine ilerlemesiyle bu durum oluşur.

DENİZCİLİK AÇISINDAN:
Soğuk hava geçişi (unstable): Kuvvetli rüzgâr ve deniz riski ama görüş genellikle iyidir.
Sıcak hava geçişi (stable): Rüzgâr hafif olabilir ama sis ve düşük görüş ciddi risk oluşturur.`,
    bulletPoints: [
      "Soğuk hava + sıcak deniz = kararsız, konvektif hava (sağanak, iyi görüş)",
      "Sıcak hava + soğuk deniz = kararlı, sis ve düşük görüş",
      "Modifikasyon alt seviyelerden başlar ve yukarı yayılır",
      "Hava kütlesi yüzeyle ne kadar uzun süre temas ederse modifikasyon o kadar belirgin",
    ],
    keyPoints: [
      "Kararsız hava: sağanak ama iyi görüş; kararlı hava: sis ama az rüzgâr",
      "Kış Kuzey Atlantik'te cP modifikasyonu şiddetli hava getirir",
      "Yaz soğuk akıntı bölgelerinde mT modifikasyonu sis getirir",
    ],
  },
  "cold-front": {
    title: "Soğuk Cephe Yapısı ve Hava Olayları",
    introduction: "Soğuk cephe, soğuk hava kütlesinin sıcak hava kütlesinin altına girerek onu kaldırmasıyla oluşan sınır bölgesidir.",
    content: `SOĞUK CEPHE YAPISI:
Soğuk hava yoğun olduğu için yüzeyde ilerler ve sıcak havayı kama şeklinde alttan kaldırır. Cephe yüzeyi dik açılıdır (yaklaşık 1:50 ile 1:100 arası eğim). Bu dik yapı ani ve şiddetli hava olayları üretir.

SOĞUK CEPHE ÖNCESİ (sıcak sektör):
- Sıcak, nemli hava
- Güney veya güneybatı rüzgâr (KYK)
- Düşük bulutlar, olası sis

SOĞUK CEPHE GEÇİŞİ:
- Ani rüzgâr yön değişimi (güneybatıdan kuzeybatıya — veer)
- Rüzgâr hızında ani artış (squall)
- Sıcaklıkta belirgin düşüş
- Basınçta ani yükselme
- Kümülonimbus bulutları, sağanak yağış, olası gök gürültülü fırtına
- Geçiş süresi: 1-3 saat

SOĞUK CEPHE SONRASI:
- Soğuk, kuru hava (mP veya cP)
- Batı veya kuzeybatı rüzgâr
- Kümülüs bulutları, sağanaklar arası açık gökyüzü
- İyi görüş
- Basınç yükselmeye devam eder

HARİTADA GÖSTERİMİ:
Mavi üçgenlerle işaretlenen çizgi, hareket yönünü gösterir.`,
    bulletPoints: [
      "Soğuk cephe dik yapılıdır → ani ve şiddetli hava olayları",
      "Rüzgâr güneybatıdan kuzeybatıya döner (KYK'de veer)",
      "Geçiş sırasında kümülonimbus, sağanak ve squall",
      "Geçiş sonrası iyi görüş, soğuk hava",
    ],
    keyPoints: [
      "Soğuk cephe geçişi denizde en tehlikeli cephe olayıdır",
      "Squall line cephe önünde ani kuvvetli rüzgâr çizgisidir",
      "Cephe geçişi rüzgâr yönü değişiminden tespit edilir",
    ],
    warnings: [
      "Soğuk cephe geçişinde ani rüzgâr artışı güvertedeki personeli tehlikeye atabilir",
      "Cephe öncesi gevşek yüklerin sabitlenmesi gerekir",
    ],
  },
  "warm-front": {
    title: "Sıcak Cephe Yapısı ve Hava Olayları",
    introduction: "Sıcak cephe, sıcak hava kütlesinin soğuk hava kütlesi üzerine yavaşça çıkmasıyla oluşan geniş eğimli sınır bölgesidir.",
    content: `SICAK CEPHE YAPISI:
Sıcak hava soğuk havanın üzerine çıkar. Cephe yüzeyi çok yatık eğimlidir (1:150 ile 1:300). Bu geniş eğim nedeniyle hava olayları cephenin yüzlerce mil önünden başlar ve yavaş gelişir.

SICAK CEPHE YAKLAŞIMI (bulut sıralaması):
Cephe yaklaşırken belirgin bir bulut sıralaması gözlenir:
1. Cirrus (Ci): 600-800 mil önde, ince saçaklar
2. Cirrostratus (Cs): 400-600 mil, hale oluşturur
3. Altostratus (As): 200-400 mil, güneşi buzlu cam gibi geçirir
4. Nimbostratus (Ns): 0-200 mil, kalın, sürekli yağış

SICAK CEPHE GEÇİŞİ:
- Yağış durur veya çisentiye dönüşür
- Sıcaklık artar
- Rüzgâr yön değiştirir (KYK'de veer, güneye döner)
- Basınç düşüşü durur, stabil kalır
- Sis veya düşük bulut örtüsü olasıdır

SICAK CEPHE SONRASI (sıcak sektör):
- Ilık, nemli hava
- Stratokümülüs veya stratus bulutları
- Çisenti veya sis olasılığı
- Düşük görüş

HARİTADA GÖSTERİMİ:
Kırmızı yarım dairelerle işaretlenen çizgi.`,
    bulletPoints: [
      "Sıcak cephe geniş eğimli → hava olayları yavaş gelişir",
      "Ci → Cs → As → Ns bulut sıralaması cephe yaklaşmasını gösterir",
      "Sürekli yağış (saatlerce) nimbostratus'tan düşer",
      "Cephe sonrası sıcak sektör: ılık, nemli, düşük görüş",
    ],
    keyPoints: [
      "Hale (cirrostratus) sıcak cephenin yaklaştığının klasik göstergesidir",
      "Sıcak cephe yağışı 12-24 saat sürebilir",
      "Sıcak sektörde sis riski yüksektir",
    ],
  },
  "occluded-front": {
    title: "Oklüzyon Cephesi",
    introduction: "Oklüzyon, soğuk cephenin sıcak cepheye yetişerek sıcak sektörü yüzeyden kaldırmasıyla oluşan karma cephe yapısıdır.",
    content: `OKLÜZYON OLUŞUMU:
Bir depresyonda soğuk cephe sıcak cepheden daha hızlı hareket eder. Soğuk cephe sıcak cepheye yetiştiğinde sıcak hava tamamen yüzeyden kalkar. Bu olay oklüzyon olarak adlandırılır.

OKLÜZYON TÜRLERİ:

SOĞUK OKLÜZYON (Cold Occlusion):
Soğuk cephe arkasındaki hava, sıcak cephe önündeki havadan daha soğuktur. Soğuk cephe havası sıcak cephe havasının da altına girer. Kuzey Atlantik ve Kuzey Pasifik'te yaygındır.

SICAK OKLÜZYON (Warm Occlusion):
Soğuk cephe arkasındaki hava, sıcak cephe önündeki havadan daha ılıktır. Soğuk cephe havası sıcak cephe havasının üzerine çıkar. Daha nadir görülür.

OKLÜZYON HAVA OLAYLARI:
- Her iki cephenin hava olayları bir arada gözlenebilir
- Karışık yağış: sürekli yağmur + sağanak
- Bulut yapısı karmaşık
- Rüzgâr değişimi daha az belirgin
- Oklüzyon ilerledikçe depresyon zayıflar

OKLÜZYON NOKTASI:
Üç cephenin yüzeyde buluştuğu nokta. Genellikle en kötü hava koşullarının gözlendiği bölgedir.`,
    bulletPoints: [
      "Soğuk cephe sıcak cepheye yetişince oklüzyon oluşur",
      "Soğuk oklüzyon: soğuk cephe arkası daha soğuk (yaygın)",
      "Oklüzyon noktası en kötü hava bölgesidir",
      "Oklüzyon depresyonun zayıflama sürecini başlatır",
    ],
    keyPoints: [
      "Oklüzyon olgun bir depresyonun son aşamasıdır",
      "Oklüzyon noktasında en yoğun yağış ve rüzgâr gözlenir",
      "Kuzey Atlantik'te oklüzyonlar çok yaygındır",
    ],
  },
  "frontal-depression": {
    title: "Cephesel Depresyon Gelişimi",
    introduction: "Cephesel depresyon, polar cephe üzerinde dalga halinde başlayan ve olgunlaşarak derin alçak basınç sistemi haline gelen siklonik yapıdır.",
    content: `YAŞAM DÖNGÜSÜ:

1. DOĞUŞ (İnitial Wave):
Polar cephe üzerinde küçük bir dalga bozulması oluşur. Sıcak hava poleward, soğuk hava ekvatorward hareket etmeye başlar. Basınç düşmeye başlar.

2. GELİŞME (Young Depression):
Dalga büyür, sıcak ve soğuk cepheler belirginleşir. Sıcak sektör oluşur. Basınç düşmeye devam eder. Yağış ve rüzgâr artar.

3. OLGUNLUK (Mature Depression):
Sistem en derin basıncına ulaşır. Cepheler tam gelişmiştir. Sıcak sektör geniştir. En kuvvetli rüzgâr ve en yoğun yağış bu aşamadadır. Soğuk cephe sıcak cepheye yaklaşır.

4. OKLÜZYON (Occlusion):
Soğuk cephe sıcak cepheye yetişir. Sıcak hava yüzeyden kalkar. Enerji kaynağı azalır. Sistem zayıflamaya başlar.

5. DAĞILMA (Dissolution):
Oklüzyon tamamlanır, sıcak sektör tamamen kalkmıştır. Sistem yavaşça dağılır. Basınç yükselmeye başlar.

DEPRESYON AİLESİ:
Polar cephe üzerinde birden fazla depresyon art arda oluşabilir. Genellikle 3-5 depresyon bir aile oluşturur. Her bir depresyon öncekinin soğuk cephesi üzerinde doğar.

TIPIK HAREKET:
Kuzey Atlantik'te depresyonlar genellikle güneybatıdan kuzeydoğuya doğru hareket eder. Hızları 20-40 knot arasındadır.`,
    bulletPoints: [
      "Depresyon polar cephe üzerinde dalga olarak başlar",
      "Olgun aşamada en şiddetli hava koşulları görülür",
      "Oklüzyon sistemin zayıflama sürecini başlatır",
      "Depresyon ailesi: art arda 3-5 sistem",
    ],
    keyPoints: [
      "Depresyonun yaşam döngüsü 3-7 gün sürer",
      "Olgunluk aşamasında basınç en düşük seviyededir",
      "Kuzey Atlantik depresyonları SW-NE yönünde hareket eder",
    ],
  },

  // =====================================================
  // BÖLÜM 6 - TROPİKAL METEOROLOJİ VE SİKLONLAR
  // =====================================================
  "tropical-climate": {
    title: "Tropikal İklim Özellikleri",
    introduction: "Tropikal kuşak, yıl boyunca yüksek sıcaklık, nemli hava ve belirgin yağış dönemleriyle karakterize edilen ekvator çevresindeki iklim bölgesidir.",
    content: `TROPİKAL KUŞAK:
Yengeç dönencesi (23,5°N) ile Oğlak dönencesi (23,5°S) arasında yer alır. Yıllık sıcaklık farkı çok düşüktür (genellikle <5 °C). Günlük sıcaklık farkı yıllık farktan büyüktür.

ITCZ (Intertropical Convergence Zone):
Kuzey ve güney yarımküre alizelerinin birleştiği bölge. Güçlü konveksiyon, kümülonimbus bulutları ve şiddetli sağanak yağış. Mevsimsel olarak kuzey-güney kayar: Temmuz'da 10-15°N, Ocak'ta 0-5°S.

MUSON SİSTEMİ:
Mevsimsel rüzgâr yön değişimi. Yaz musonu: okyanustan karaya, nemli, yağışlı. Kış musonu: karadan okyanusa, kuru. Hint Okyanusu, Güneydoğu Asya ve Batı Afrika'da belirgin.

TROPİKAL DENİZ KOŞULLARI:
- Deniz suyu sıcaklığı: 26-30 °C
- Yüksek bağıl nem: %70-90
- Günlük konvektif sağanaklar (öğleden sonra)
- Trade wind inversiyonu: normal koşullarda konveksiyonu sınırlar
- ITCZ yakınında durgun hava (doldrums) ve ani sağanaklar`,
    bulletPoints: [
      "Tropikal kuşakta yıllık sıcaklık farkı düşük, günlük fark daha yüksek",
      "ITCZ: alizelerin birleştiği, güçlü konveksiyon bölgesi",
      "Muson: mevsimsel rüzgâr yön değişimi",
      "Trade wind inversiyonu konveksiyonu sınırlar",
    ],
    keyPoints: [
      "ITCZ tropikal siklon oluşumunun başlangıç bölgesidir",
      "Muson mevsimi deniz rotalarını ve yükleme zamanlamasını etkiler",
      "SST > 26 °C tropikal siklon oluşumu için ön koşuldur",
    ],
  },
  "tropical-cyclone-formation": {
    title: "Tropikal Siklon Oluşumu ve Yapısı",
    introduction: "Tropikal siklon, sıcak okyanus suları üzerinde güçlü konveksiyonla oluşan, organize döngüsel rüzgâr sistemidir.",
    content: `OLUŞUM KOŞULLARI:
1. Deniz suyu sıcaklığı ≥ 26 °C (en az 50 m derinliğe kadar)
2. Yeterli Coriolis etkisi (genellikle 5° enlemden poleward)
3. Düşük rüzgâr kesme (wind shear) — üst ve alt seviye rüzgârları arasında az fark
4. Nemli orta troposfer
5. Başlangıç bozulması (easterly wave, ITCZ dalga)
6. Üst seviyede divergence (havanın dağılması)

YAPI:
GÖZ (Eye): Merkezde 20-60 km çapında sakin bölge. Alçalan hava, açık gökyüzü veya az bulut. En düşük basınç burada.

GÖZ DUVARI (Eyewall): Gözü çevreleyen en şiddetli bölge. En kuvvetli rüzgâr, en yoğun yağış ve en güçlü yükselme akımları burada.

YAĞIŞ BANTLARI (Rainbands): Göz duvarından dışa doğru spiral şekilde uzanan yağış ve rüzgâr bantları. Squall koşulları oluşturabilir.

ENERJİ KAYNAĞI:
Sıcak okyanusdan buharlaşan su buharının yoğunlaşmasıyla açığa çıkan gizli ısı, siklonun enerji kaynağıdır. Karaya çıktığında veya soğuk sulara geçtiğinde enerji kaynağı kesilir ve sistem zayıflar.`,
    bulletPoints: [
      "SST ≥ 26 °C ve düşük wind shear temel oluşum koşullarıdır",
      "Göz: sakin merkez; göz duvarı: en şiddetli bölge",
      "Enerji kaynağı deniz yüzeyinden buharlaşan gizli ısıdır",
      "Ekvator'da Coriolis etkisi yetersiz → 5° enlem altında oluşmaz",
    ],
    keyPoints: [
      "6 koşulun tamamı sağlanmadan tropikal siklon oluşmaz",
      "Göz duvarında rüzgâr hızı 250 knot'u aşabilir (kategori 5)",
      "Karaya ulaşan siklon hızla zayıflar",
    ],
    warnings: [
      "Tropikal siklon denizciler için en tehlikeli meteorolojik olaydır",
      "Göz içinde havanın sakinleşmesi yanıltıcıdır — göz duvarının diğer tarafı gelecektir",
    ],
  },
  "cyclone-classification": {
    title: "Siklon Sınıflandırması",
    introduction: "Tropikal siklonlar rüzgâr hızına göre sınıflandırılır ve bölgeye göre farklı isimler alır.",
    content: `RÜZGÂR HIZINA GÖRE SINIFLANDIRMA:

TROPİKAL BOZULMA (Tropical Disturbance): Organize olmamış konveksiyon, kapalı izobar yok.

TROPİKAL DEPRESYON (TD): Kapalı izobar, sürekli rüzgâr <34 knot.

TROPİKAL FIRTINA (TS): Sürekli rüzgâr 34-63 knot. Bu aşamada resmi isim verilir.

KASIRGA / TAYFUN (Hurricane/Typhoon): Sürekli rüzgâr ≥64 knot.

SAFFIR-SIMPSON ÖLÇEĞİ (Kasırga Kategorileri):
Kategori 1: 64-82 knot — Minimum hasar
Kategori 2: 83-95 knot — Orta hasar
Kategori 3: 96-112 knot — Büyük hasar (Major Hurricane)
Kategori 4: 113-136 knot — Ağır hasar
Kategori 5: >136 knot — Felaket düzeyinde

BÖLGESEL İSİMLER:
- Hurricane: Kuzey Atlantik, Kuzeydoğu Pasifik
- Typhoon: Kuzeybatı Pasifik
- Cyclone: Hint Okyanusu, Güney Pasifik
- Willy-Willy: Avustralya (eski kullanım)

MEVSIMLER:
- Kuzey Atlantik: Haziran-Kasım (zirve: Ağustos-Ekim)
- Kuzeybatı Pasifik: Yıl boyu (zirve: Temmuz-Kasım)
- Güney Hint Okyanusu: Kasım-Nisan`,
    bulletPoints: [
      "TD: <34 knot, TS: 34-63 knot, Hurricane: ≥64 knot",
      "Saffir-Simpson ölçeği 1-5 arası kategorilere ayırır",
      "Kategori 3 ve üzeri: Major Hurricane",
      "Bölgeye göre Hurricane, Typhoon veya Cyclone denir",
    ],
    keyPoints: [
      "Tropikal fırtına aşamasında resmi isim verilir",
      "Kuzey Atlantik sezonu Haziran-Kasım'dır",
      "Kategori 5 kasırgada rüzgâr 136 knot'u aşar",
    ],
  },
  "cyclone-tracking": {
    title: "Siklon İzleme ve Tahmin",
    introduction: "Tropikal siklonlar uydu, radar, uçak keşfi ve sayısal modeller aracılığıyla izlenir ve yolları tahmin edilir.",
    content: `İZLEME YÖNTEMLERİ:

1. METEOROLOJİ UYDU:
Geostationary (sabit yörünge) uydular tropikal siklonları sürekli izler. Kızılötesi ve görünür dalga görüntüleri siklon yapısı ve yoğunluğu hakkında bilgi verir. Dvorak tekniği uydu görüntüsünden siklon şiddetini tahmin eder.

2. HAVA KEŞİF UÇAĞI:
ABD Hurricane Hunters (WC-130J, WP-3D) ve NOAA uçakları fırtınanın içine girerek merkez basıncını ve rüzgâr hızını doğrudan ölçer. Dropsonde adı verilen cihazlar fırtına içinden veri toplar.

3. RADAR:
Kıyı radarları siklon yaklaştığında yapısını ve göz konumunu gösterir. Doppler radar rüzgâr hızı ve yönünü ölçer.

4. SAYISAL MODELLER:
Bilgisayar modelleri (GFS, ECMWF, HWRF) siklonun olası yolunu ve şiddetini tahmin eder. Birden fazla model bir arada değerlendirilir (ensemble forecast).

TAHMİN BELİRSİZLİĞİ:
72 saatlik yol tahmini ortalama 150-200 mil hata payı içerir. Şiddet tahmini yol tahmininden daha zordur. Bu nedenle uyarılar geniş bir koridor şeklinde yayınlanır.

DENİZCİ İÇİN BİLGİ KAYNAKLARI:
- NAVTEX tropikal siklon uyarıları
- Inmarsat-C SafetyNET mesajları
- JTWC (Joint Typhoon Warning Center) bültenleri
- NHC (National Hurricane Center) tahminleri`,
    bulletPoints: [
      "Uydu görüntüleri sürekli izleme sağlar (Dvorak tekniği)",
      "Hurricane Hunters doğrudan ölçüm yapar",
      "72 saatlik tahmin 150-200 mil hata payı içerir",
      "NAVTEX ve SafetyNET uyarıları denizciler için temeldir",
    ],
    keyPoints: [
      "Birden fazla model karşılaştırılarak en güvenilir tahmin oluşturulur",
      "Şiddet tahmini yol tahmininden daha zordur",
      "Denizciler JTWC ve NHC bültenlerini düzenli takip etmelidir",
    ],
  },
  "dangerous-semicircle": {
    title: "Tehlikeli ve Seyir Edilebilir Yarım Daire",
    introduction: "Tropikal siklonun hareket yönüne göre sağ ve sol yarıları farklı tehlike seviyelerine sahiptir; bu kavram kaçınma manevrasının temelini oluşturur.",
    content: `YARIM DAİRE KAVRAMI (Kuzey Yarımküre):

TEHLİKELİ YARIM DAİRE (Dangerous Semicircle):
Siklonun hareket yönünün sağ tarafıdır (KYK). Bu bölgede:
- Rüzgâr hızı = siklon rüzgârı + ilerleme hızı (birbirine eklenir)
- Rüzgâr yönü gemiyi siklonun yoluna doğru iter
- Dalgalar daha büyük ve düzensizdir
- Recurvature (yön değiştirme) bölgesi bu taraftadır

SEYİR EDİLEBİLİR YARIM DAİRE (Navigable Semicircle):
Siklonun hareket yönünün sol tarafıdır (KYK). Bu bölgede:
- Rüzgâr hızı = siklon rüzgârı − ilerleme hızı (birbirinden çıkarılır)
- Rüzgâr yönü gemiyi siklondan uzaklaştırır
- Dalgalar nispeten düzenlidir

GÜNEY YARIMKÜRE:
Durum tersine döner. Tehlikeli yarım daire sol taraftadır.

TESPİT YÖNTEMİ (Buys Ballot Kuralı):
KYK'de rüzgâra arkanızı döndüğünüzde siklon merkezi sol ön tarafınızdadır. Rüzgâr yönü saat yönünün tersine dönüyorsa (back ediyorsa) tehlikeli yarım dairedesiniz. Saat yönünde dönüyorsa (veer ediyorsa) seyir edilebilir yarım dairedesiniz.

YAKIN YARIMDAIRE SINIRI:
Göz duvarının yakın çevresi (~100 mil) her iki tarafta da son derece tehlikelidir.`,
    bulletPoints: [
      "KYK: sağ taraf tehlikeli, sol taraf seyir edilebilir",
      "GYK: sol taraf tehlikeli, sağ taraf seyir edilebilir",
      "Tehlikeli yarımda rüzgâr hızı eklenir, seyir edilebilirde çıkarılır",
      "Rüzgâr back ediyorsa tehlikeli yarım daire",
    ],
    examples: [
      {
        problem: "KYK'de bir siklon kuzeye hareket ediyor. Gemide rüzgâr güneybatıdan (SW) esiyor ve yavaşça güneye (S) dönüyor. Hangi yarım dairedesiniz?",
        solution: "Rüzgâr SW'den S'ye dönüyor → saat yönünün tersi (backing) → Tehlikeli yarım dairedesiniz.",
      },
    ],
    keyPoints: [
      "Yarım daire tespiti kaçınma manevrasının ilk adımıdır",
      "Rüzgâr yönü değişimi izlenerek pozisyon tespit edilir",
      "Göz duvarına 100 mil içinde her iki yarım daire de çok tehlikelidir",
    ],
  },
  "cyclone-avoidance": {
    title: "Tropikal Siklondan Kaçınma Manevraları",
    introduction: "Tropikal siklondan kaçınma, denizci için hayati önem taşıyan ve sistematik kurallara dayanan manevra tekniklerini gerektirir.",
    content: `TEMEL İLKE:
Siklonun merkezinden ve yolundan mümkün olduğunca uzak durmak. Erken hareket etmek en etkili stratejidir.

KUZEY YARIMKÜRE MANEVRALARI:

TEHLİKELİ YARIM DAİREDE:
- Rüzgârı sancak (starboard) pruva omuzluğundan al
- Mümkün olan en yüksek hızla seyret
- Bu rota seni siklonun yolundan uzaklaştırır

SEYİR EDİLEBİLİR YARIM DAİREDE:
- Rüzgârı sancak kıç omuzluğundan al
- Güvenli hızda seyret
- Siklon geçene kadar bu rotayı koru

YOLUN ÖNÜNDEYSEN:
- En tehlikeli konum
- Sancak taraftan rüzgâr al ve mümkün olan en yüksek hızla siklonun yolundan uzaklaş
- Her iki yarım daireye de düşebilirsin

GÜNEY YARIMKÜRE:
Tüm talimatlar tersine uygulanır (sancak yerine iskele).

1-2-3 KURALI:
Siklonun 24, 48 ve 72 saatlik tahmin hatalarına (34 knot rüzgâr yarıçapı eklenerek) dayanan tehlike bölgesi hesabıdır. Bu bölgenin dışında kalınmalıdır.

GENEL TEDBİRLER:
- Erken karar verin, geç kalmayın
- Yakıt ve makine durumunu kontrol edin
- Tüm açık güverte yüklerini emniyete alın
- Su geçirmez kapıları kapatın
- Mürettebatı bilgilendirin
- Meteoroloji bültenlerini sürekli takip edin`,
    bulletPoints: [
      "Tehlikeli yarım (KYK): rüzgâr sancak pruva omuzluğundan",
      "Seyir edilebilir yarım (KYK): rüzgâr sancak kıç omuzluğundan",
      "Yolun önünde: en tehlikeli — hızla uzaklaş",
      "1-2-3 kuralı tehlike bölgesi hesabında kullanılır",
    ],
    keyPoints: [
      "Erken karar ve erken manevra hayat kurtarır",
      "GYK'de tüm manevralar tersine uygulanır",
      "Siklonun 200 mil içine girmekten kaçınılmalıdır",
    ],
    warnings: [
      "Tropikal siklon göz duvarında dalga yüksekliği 15 metreyi aşabilir",
      "Siklona yakın bölgede rota değişikliği imkânsız hale gelebilir",
    ],
  },

  // =====================================================
  // BÖLÜM 7 - DALGALAR VE DENİZ DURUMU
  // =====================================================
  "wave-formation": {
    title: "Dalga Oluşumu ve Parametreleri",
    introduction: "Deniz dalgaları rüzgârın deniz yüzeyine enerji aktarmasıyla oluşur ve belirli parametrelerle tanımlanır.",
    content: `DALGA OLUŞUMU:
Rüzgâr deniz yüzeyindeki sürtünme ile enerjisini suya aktarır. Dalga büyüklüğü üç faktöre bağlıdır:

1. RÜZGÂR HIZI: Hız arttıkça dalga büyür
2. RÜZGÂR SÜRESİ (Duration): Rüzgâr ne kadar uzun süre eserse dalga o kadar büyür
3. FETCH: Rüzgârın engelsiz estiği deniz mesafesi. Fetch arttıkça dalga büyür.

DALGA PARAMETRELERİ:
- Dalga yüksekliği (H): Dalga çukurundan tepeye mesafe
- Dalga boyu (λ): İki ardışık tepe arası mesafe
- Dalga periyodu (T): İki ardışık tepenin aynı noktadan geçiş süresi (saniye)
- Dalga hızı (C): C = λ/T veya derin suda C ≈ 1,56 × T (m/s)
- Dalga dikliği (Steepness): H/λ oranı. 1/7'yi aşarsa dalga kırılır.

TAM GELİŞMİŞ DENİZ (Fully Developed Sea):
Verilen rüzgâr hızı, süre ve fetch için ulaşılabilecek maksimum dalga durumudur. Bu noktadan sonra rüzgâr artsa bile dalgalar daha fazla büyümez (aynı fetch ve sürede).`,
    bulletPoints: [
      "Dalga büyüklüğü: rüzgâr hızı, süre ve fetch'e bağlıdır",
      "Dalga dikliği 1/7'yi aşarsa dalga kırılır",
      "Derin su dalga hızı: C ≈ 1,56 × T (m/s)",
      "Tam gelişmiş deniz: maksimum dalga durumu",
    ],
    formula: {
      name: "Dalga Hızı (Derin Su)",
      expression: "C = 1,56 × T (m/s)   veya   C = λ / T",
      description: "C: dalga hızı (m/s), T: periyot (s), λ: dalga boyu (m)",
    },
    keyPoints: [
      "Fetch kısa ise rüzgâr kuvvetli olsa da dalgalar sınırlı kalır",
      "Dalga kırılması güverte üzerinde tehlike oluşturur",
      "Dalga periyodu dalga tahmininde kullanılan temel parametredir",
    ],
  },
  "wave-types": {
    title: "Dalga Türleri",
    introduction: "Deniz dalgaları oluşum kaynağına göre rüzgâr dalgaları (wind waves) ve ölü deniz (swell) olarak iki ana kategoride incelenir.",
    content: `RÜZGÂR DALGALARI (Wind Waves / Sea):
Aktif rüzgâr etkisiyle oluşan ve şekillenen dalgalar. Düzensiz, kısa periyotlu ve dik yapılıdır. Rüzgâr yönünde hareket eder. Beyaz köpüklü dalgalar (whitecaps) rüzgâr dalgalarının kırılmasıyla oluşur.

ÖLÜ DENİZ (Swell):
Fırtına bölgesinden uzaklaşmış veya rüzgâr dindikten sonra devam eden dalgalar. Düzenli, uzun periyotlu ve yuvarlak tepelidir. Binlerce mil öteden gelebilir. Enerji kaybı çok azdır; Güney Okyanus'taki fırtınalardan gelen swell Kuzey Pasifik'e ulaşabilir. Swell'in yönü mevcut rüzgâr yönünden farklı olabilir.

KARIŞIK DENİZ (Cross Sea / Confused Sea):
Farklı yönlerden gelen rüzgâr dalgaları ve swell'in çakışması. Düzensiz ve tehlikeli dalga yapısı oluşur. Geminin salınımı öngörülemez hale gelir.

DENİZCİLİK AÇISINDAN:
- Swell uzun dalga boyu ile gemilerde yavaş ama geniş açılı salınım yaratır
- Kısa periyotlu rüzgâr dalgaları hızlı ve keskin salınıma neden olur
- Cross sea durumu parametrik yuvarlanma ve broaching riskini artırır`,
    bulletPoints: [
      "Rüzgâr dalgası: düzensiz, kısa periyot, dik yapı",
      "Swell: düzenli, uzun periyot, yuvarlak tepe",
      "Cross sea: farklı yönlerden gelen dalgaların çakışması",
      "Swell binlerce mil öteden gelebilir",
    ],
    keyPoints: [
      "Swell yönü mevcut rüzgâr yönünden bağımsız olabilir",
      "Cross sea durumu gemiler için çok tehlikelidir",
      "Dalga tahmininde hem sea hem swell ayrı değerlendirilir",
    ],
  },
  "sea-state-scale": {
    title: "Deniz Durumu Skalası (Douglas)",
    introduction: "Douglas deniz durumu skalası, dalga yüksekliğine göre deniz durumunu 0-9 arası derecelendiren uluslararası standarttır.",
    content: `DOUGLAS DENİZ DURUMU SKALASI:

Derece 0 — Cam gibi (Calm-glassy): Dalga yüksekliği: 0 m
Derece 1 — Sakin (Calm-rippled): 0-0,1 m
Derece 2 — Pürüzsüz (Smooth): 0,1-0,5 m
Derece 3 — Hafif (Slight): 0,5-1,25 m
Derece 4 — Orta (Moderate): 1,25-2,5 m
Derece 5 — Kaba (Rough): 2,5-4 m
Derece 6 — Çok kaba (Very rough): 4-6 m
Derece 7 — Yüksek (High): 6-9 m
Derece 8 — Çok yüksek (Very high): 9-14 m
Derece 9 — Olağanüstü (Phenomenal): >14 m

DOUGLAS SWELL SKALASI:
Swell ayrıca boy ve yüksekliğine göre sınıflandırılır:
- Kısa veya orta boy: λ < 200 m
- Uzun boy: λ > 200 m
- Düşük: H < 2 m
- Orta: H = 2-4 m
- Yüksek: H > 4 m

KULLANIMI:
Gemide hava gözlemi sırasında deniz durumu Douglas skalasıyla kaydedilir. Seyir planlamasında güvenli rota ve hız kararlarında bu skala referans alınır.`,
    bulletPoints: [
      "Douglas skalası 0-9 arası, dalga yüksekliğine göre",
      "Derece 5 (rough): 2,5-4 m dalga yüksekliği",
      "Derece 9 (phenomenal): 14 m üzeri dalga",
      "Swell ayrı olarak boy ve yüksekliğe göre sınıflandırılır",
    ],
    keyPoints: [
      "Douglas skalası meteoroloji jurnalında kullanılır",
      "Beaufort rüzgâr, Douglas dalga skalasıdır — birlikte kullanılır",
      "Yüksek deniz durumunda hız azaltma zorunlu olabilir",
    ],
  },
  "significant-wave": {
    title: "Anlamlı Dalga Yüksekliği (Hs)",
    introduction: "Anlamlı dalga yüksekliği (Hs veya H1/3), gözlemlenen dalgaların en yüksek üçte birlik kısmının ortalamasıdır ve dalga tahmininde standart ölçüdür.",
    content: `TANIM:
Belirli bir zaman diliminde gözlemlenen tüm dalgalar yüksekliklerine göre sıralanır. En yüksek 1/3'ünün ortalaması anlamlı dalga yüksekliğidir (Hs veya H1/3).

Tecrübeli bir gözlemcinin tahmin ettiği dalga yüksekliği, istatistiksel olarak Hs değerine yakındır.

İSTATİSTİKSEL İLİŞKİLER:
- Ortalama dalga yüksekliği (Hmean) ≈ 0,63 × Hs
- En yüksek 1/10'un ortalaması (H1/10) ≈ 1,27 × Hs
- 1000 dalgada en yüksek dalga (Hmax) ≈ 1,86 × Hs

Bu oranlar dalga yüksekliğinin Rayleigh dağılımına uyduğunu varsayar.

ROGUE WAVES (HAYDUt DALGALAR):
İstatistiksel beklentinin çok üzerinde, aniden oluşan dev dalgalar. Tanım: Hs'nin 2 katını aşan dalgalar. Farklı dalga sistemlerinin yapıcı girişimi (constructive interference), akıntı-dalga etkileşimi veya odaklanma etkileriyle oluşabilir. Agulhas akıntısı bölgesi rogue wave riski yüksek alanlardan biridir.`,
    bulletPoints: [
      "Hs = en yüksek 1/3 dalganın ortalaması",
      "Hmax ≈ 1,86 × Hs (1000 dalga içinde)",
      "Rogue wave: Hs'nin 2 katını aşan dalga",
      "Gözlemci tahmini istatistiksel olarak Hs'ye yakındır",
    ],
    examples: [
      {
        problem: "Hs = 6 m ise, 1000 dalga içinde karşılaşılabilecek en yüksek dalga yaklaşık ne kadardır?",
        solution: "Hmax ≈ 1,86 × 6 = 11,2 m",
      },
    ],
    keyPoints: [
      "Hs uluslararası standart dalga ölçüsüdür",
      "Gerçek dalgalar Hs'den çok daha yüksek olabilir",
      "Rogue wave riski belirli akıntı bölgelerinde artar",
    ],
  },
  "wave-ship-interaction": {
    title: "Dalga-Gemi Etkileşimi",
    introduction: "Dalgaların gemi üzerindeki etkileri, güvenli seyir, yapısal bütünlük ve mürettebat güvenliği açısından kritik öneme sahiptir.",
    content: `DALGA ETKİLERİ:

1. YUNUSLAMA (Pitching): Baş-kıç doğrultusunda salınım. Dalgalar baş yönünden geldiğinde artar. Slamming (pruva vurması) ve bow flare riski.

2. YALPALAMA (Rolling): İskele-sancak doğrultusunda salınım. Dalgalar borda yönünden geldiğinde artar. Rezonans riski: dalga karşılaşma periyodu geminin doğal salınım periyoduna yaklaştığında aşırı yalpalama oluşur.

3. SÜRÇME (Yawing): Dümen doğrultusunda sapma. Dalgalar kıç omuzluktan geldiğinde artar. Broaching riski.

4. SLAMMING:
Pruvanın dalga yüzeyine şiddetle çarpması. Yapısal hasar riski taşır. Yüksek dalga ve yüksek hızda artar. Hız azaltma veya rota değişikliğiyle önlenir.

5. GÜVERTE YIKAMASI (Green Water / Shipping Seas):
Dalgaların güverteye çıkması. Güverte yüklerine ve mürettebata tehlike oluşturur.

WEATHER ROUTING İLKELERİ:
- Rota ve hız, dalga koşullarına göre optimize edilir
- Rezonans bölgesinden kaçınılır
- Slamming riskinde hız azaltılır veya rota değiştirilir
- Kıç omuzluk dalgasında broaching riskine dikkat edilir`,
    bulletPoints: [
      "Pitching: baş-kıç salınım, rolling: borda salınım",
      "Rezonans: dalga periyodu ≈ gemi doğal periyodu → aşırı salınım",
      "Slamming: pruva vurması, hız azaltmayla önlenir",
      "Broaching: kıç omuzluk dalgasında rota kaybı",
    ],
    keyPoints: [
      "Rezonans durumunda rota veya hız değiştirilerek periyot aralığı açılır",
      "Slamming yapısal hasara yol açabilir",
      "Weather routing dalga etkileşimini minimize eder",
    ],
    warnings: [
      "Aşırı rolling yük kaymasına neden olabilir",
      "Parametrik rolling konteyner gemilerinde kritik risktir",
    ],
  },

  // =====================================================
  // BÖLÜM 8 - OKYANUS AKINTILARI VE GELGİT
  // =====================================================
  "ocean-currents": {
    title: "Okyanus Akıntıları ve Nedenleri",
    introduction: "Okyanus akıntıları, deniz suyunun büyük ölçekli yatay hareketidir ve rüzgâr, sıcaklık farkları, tuzluluk ve Coriolis etkisi tarafından sürüklenir.",
    content: `AKINTIYI OLUŞTURAN FAKTÖRLER:

1. RÜZGÂR SÜRÜKLEMESİ:
Sürekli esen rüzgârlar yüzey suyunu hareket ettirir. Ekman spirali nedeniyle yüzey akıntısı rüzgâr yönünden KYK'de sağa, GYK'de sola 45° sapar. Ortalama taşınma (Ekman transport) rüzgâr yönüne 90° açıdadır.

2. TERMOHALİN DOLAŞIM:
Sıcaklık ve tuzluluk farklarından kaynaklanan yoğunluk farkları derin okyanus akıntılarını sürükler. Kuzey Atlantik'te soğuyarak yoğunlaşan su dibe çöker ve güneye doğru akar (NADW — North Atlantic Deep Water). Bu dolaşım "global konveyör bant" olarak adlandırılır.

3. CORİOLİS ETKİSİ:
Akıntıları KYK'de sağa, GYK'de sola saptırır.

4. KITA KENARLARI VE DENİZ TABANI:
Fiziksel engeller akıntıları yönlendirir ve hızlandırabilir.

AKINTILAR VE DENİZCİLİK:
- Uygun akıntı yönünde seyir yakıt tasarrufu sağlar
- Ters akıntı seyir süresini ve yakıt tüketimini artırır
- Akıntı-dalga karşılaşması dalga dikliğini artırır (tehlike)
- Akıntı haritaları (pilot charts) rota planlamasında kullanılır`,
    bulletPoints: [
      "Yüzey akıntısı rüzgâr yönünden 45° sapar (Ekman spirali)",
      "Termohalin dolaşım derin okyanus akıntılarını sürükler",
      "Uygun akıntı seyir süresini kısaltır ve yakıt tasarrufu sağlar",
      "Ters akıntı dalga dikliğini artırarak tehlike oluşturur",
    ],
    keyPoints: [
      "Ekman spirali yüzey akıntısının rüzgâr yönünden sapmasını açıklar",
      "Global konveyör bant dünya iklimini düzenler",
      "Pilot charts akıntı bilgisi içerir",
    ],
  },
  "major-currents": {
    title: "Başlıca Okyanus Akıntı Sistemleri",
    introduction: "Dünya okyanuslarında rüzgâr ve termohalin dolaşımla sürüklenen büyük akıntı sistemleri, iklimi ve deniz rotalarını belirler.",
    content: `BAŞLICA AKINTILAR:

ATLANTİK OKYANUSU:
- Gulf Stream: Florida Boğazı'ndan kuzeydoğuya, sıcak akıntı. Hızı 4 knot'a kadar ulaşır. Kuzey Avrupa'nın ılıman ikliminin temel nedenidir.
- Labrador Akıntısı: Soğuk, güneye doğru. Grand Banks'te Gulf Stream ile buluşarak yoğun sis oluşturur.
- Kanarya Akıntısı: Soğuk, güneye doğru. Kuzeybatı Afrika kıyısında.
- Kuzey Ekvatorial Akıntı: Batıya doğru, trade winds tarafından sürüklenir.
- Benguela Akıntısı: Soğuk, kuzeye doğru. Güneybatı Afrika kıyısında.

PASİFİK OKYANUSU:
- Kuroshio: Japonya kıyısında kuzeye doğru akan sıcak akıntı (Pasifik'in Gulf Stream'i).
- Oyashio: Soğuk, güneye doğru. Kuroshio ile buluşması sis oluşturur.
- Kaliforniya Akıntısı: Soğuk, güneye doğru. Kıyıda sis oluşumuna katkı sağlar.
- Humboldt (Peru) Akıntısı: Soğuk, kuzeye doğru. El Niño ile zayıflar.

HİNT OKYANUSU:
Muson etkisiyle mevsimsel olarak yön değiştirir. Yaz musonu: doğuya, kış musonu: batıya.

AGULHAS AKINTISI:
Güney Afrika kıyısında güneybatıya doğru akan sıcak akıntı. Ters yönden gelen dalga ve akıntının karşılaşması rogue wave riski oluşturur.`,
    bulletPoints: [
      "Gulf Stream: sıcak, kuzeydoğuya, 4 knot'a kadar",
      "Labrador: soğuk, Grand Banks sis bölgesi",
      "Kuroshio: Pasifik'in Gulf Stream'i, sıcak",
      "Agulhas: rogue wave riskinin yüksek olduğu bölge",
    ],
    keyPoints: [
      "Sıcak ve soğuk akıntıların buluşması sis oluşturur",
      "Gulf Stream Avrupa iklimini ılımanlaştırır",
      "Akıntı-dalga karşılaşması dalga tehlikesini artırır",
    ],
  },
  "tide-theory": {
    title: "Gelgit Teorisi ve Çekim Kuvvetleri",
    introduction: "Gelgit, Ay ve Güneş'in çekim kuvvetleri ile merkezkaç kuvvetin etkileşimiyle deniz seviyesinde oluşan periyodik yükselme ve alçalmadır.",
    content: `TEMEL İLKE:
Newton'un evrensel çekim yasasına göre çekim kuvveti kütleyle doğru, mesafenin karesiyle ters orantılıdır. Ay, Güneş'ten çok daha küçük olmasına rağmen Dünya'ya çok daha yakın olduğu için gelgit üzerindeki etkisi Güneş'in yaklaşık 2,2 katıdır.

GELGİT OLUŞTURAN KUVVET:
Dünya'nın Ay'a bakan yüzünde çekim kuvveti güçlüdür → su yükselir (kabarma).
Dünya'nın Ay'ın karşı tarafında merkezkaç kuvvet baskındır → su yine yükselir.
Dik açıda (Ay'a göre 90°) su seviyesi düşer (çekilme).

SONUÇ:
Dünya üzerinde aynı anda iki kabarma (high tide) ve iki çekilme (low tide) noktası bulunur. Dünya'nın dönüşüyle bu noktalar hareket eder ve yaklaşık 12 saat 25 dakika arayla gelgit değişimi yaşanır.

AY VE GÜNEŞ BİRLEŞİK ETKİSİ:
- Yeniay ve dolunayda Güneş ve Ay aynı veya karşı hizadadır → çekim etkileri birleşir → SPRING TIDE (büyük gelgit)
- İlk ve son dördün ayda Güneş ve Ay 90° açıdadır → çekim etkileri birbirini zayıflatır → NEAP TIDE (küçük gelgit)`,
    bulletPoints: [
      "Ay'ın gelgit etkisi Güneş'in ~2,2 katıdır",
      "Aynı anda iki kabarma ve iki çekilme noktası bulunur",
      "Gelgit periyodu: ~12 saat 25 dakika",
      "Spring tide: yeniay/dolunay, neap tide: ilk/son dördün",
    ],
    keyPoints: [
      "Gelgit yüksekliği kıyı şekline, deniz tabanı yapısına ve coğrafyaya bağlıdır",
      "Spring tide'da gelgit aralığı (range) maksimumdur",
      "Neap tide'da gelgit aralığı minimumdur",
    ],
  },
  "tide-types": {
    title: "Gelgit Türleri",
    introduction: "Coğrafi konuma göre gelgit günde iki kez (semidiurnal), bir kez (diurnal) veya karışık (mixed) olarak gözlenebilir.",
    content: `GELGİT TÜRLERİ:

YARI GÜNLÜK (Semidiurnal):
Günde iki kabarma ve iki çekilme. İki kabarma yaklaşık eşit yüksekliktedir. Kuzey Atlantik'te yaygındır (İngiltere, Avrupa kıyıları). Periyot: ~12 saat 25 dakika.

GÜNLÜK (Diurnal):
Günde bir kabarma ve bir çekilme. Gulf of Mexico'nun bazı bölgeleri, Güneydoğu Asya'nın bazı bölgeleri. Periyot: ~24 saat 50 dakika.

KARIŞIK (Mixed):
Günde iki kabarma ve çekilme, ancak yükseklikleri belirgin ölçüde farklıdır. Büyük eşitsizlik (diurnal inequality) gözlenir. Pasifik kıyılarında yaygındır. HHW (Higher High Water) ve LLW (Lower Low Water) kavramları kullanılır.

GELGİT TERİMLERİ:
- HW (High Water): Kabarma
- LW (Low Water): Çekilme
- Range: HW ile LW arasındaki fark
- Stand of tide: HW veya LW'de su seviyesinin değişmediği kısa süre
- Flood: Yükselen gelgit akıntısı
- Ebb: Alçalan gelgit akıntısı
- Slack water: Flood ve ebb arasındaki durgun su`,
    bulletPoints: [
      "Semidiurnal: günde 2 HW ve 2 LW (Atlantik'te yaygın)",
      "Diurnal: günde 1 HW ve 1 LW",
      "Mixed: 2 HW/LW ama yükseklikleri farklı (Pasifik'te yaygın)",
      "Flood: yükselen gelgit, ebb: alçalan gelgit",
    ],
    keyPoints: [
      "Gelgit türü coğrafyaya bağlıdır ve gelgit tablosundan öğrenilir",
      "Karışık gelgitte HHW ve LLW ayrımı kritiktir",
      "Slack water demirleme ve manevra için uygun zamandır",
    ],
  },
  "tide-tables": {
    title: "Gelgit Tabloları ve Hesaplamaları",
    introduction: "Gelgit tabloları belirli referans limanlar için günlük kabarma/çekilme saatlerini ve yüksekliklerini verir; ikincil limanlar fark yöntemiyle hesaplanır.",
    content: `GELGİT TABLOLARI (Tide Tables):

REFERANS LİMANLAR (Standard Ports):
Her yıl yayınlanan tablolarda doğrudan verilen limanlardır. Her gün için HW ve LW saatleri ile yükseklikleri listelenir. Referans seviye: Chart Datum (harita sıfırı — genellikle LAT).

İKİNCİL LİMANLAR (Secondary Ports):
Referans limana göre zaman ve yükseklik farkları uygulanarak hesaplanır.

HESAPLAMA:
İkincil liman HW saati = Referans liman HW saati + Zaman farkı
İkincil liman HW yüksekliği = Referans liman HW yüksekliği + Yükseklik farkı

ARA ZAMAN HESABI:
HW ve LW arasındaki herhangi bir saatteki su seviyesi için kullanılan yöntemler:
1. Twelfths Rule (Onikide bir kuralı): Gelgit aralığını 12'ye bölerek her saatlik değişimi tahmin eder.
   Saatlik dağılım: 1/12, 2/12, 3/12, 3/12, 2/12, 1/12

2. Gelgit Eğrisi: Admiralty Tide Tables'da verilen standart eğri.

CHART DATUM VE HAİTA DERİNLİKLERİ:
Haritadaki derinlikler Chart Datum'a (CD) göre verilir. CD genellikle LAT (Lowest Astronomical Tide) seviyesidir. Herhangi bir andaki gerçek derinlik = Harita derinliği + Gelgit yüksekliği.`,
    bulletPoints: [
      "Referans limanlar doğrudan tabloda verilir",
      "İkincil limanlar fark yöntemiyle hesaplanır",
      "Twelfths Rule: 1-2-3-3-2-1 oranıyla saatlik tahmin",
      "Gerçek derinlik = harita derinliği + gelgit yüksekliği",
    ],
    examples: [
      {
        problem: "HW = 5,0 m, LW = 1,0 m. Range = 4,0 m. HW'den 2 saat sonra su seviyesi nedir? (Twelfths Rule)",
        solution: "1. saat düşüş: 1/12 × 4,0 = 0,33 m. 2. saat: 2/12 × 4,0 = 0,67 m. Toplam düşüş = 1,0 m. Su seviyesi = 5,0 − 1,0 = 4,0 m",
      },
    ],
    formula: {
      name: "Twelfths Rule (Onikide Bir Kuralı)",
      expression: "Saatlik dağılım: 1/12, 2/12, 3/12, 3/12, 2/12, 1/12",
      description: "HW'den LW'ye 6 saatlik gelgit periyodunda her saat için toplam aralığın (range) ne kadarının değişeceğini verir.",
    },
    keyPoints: [
      "Gelgit tablosu seyir planlamasının temel aracıdır",
      "Chart Datum altına düşen gelgit negatif değer alır (dikkat!)",
      "UKC (Under Keel Clearance) hesabında gelgit yüksekliği kritiktir",
    ],
  },
  "tidal-currents": {
    title: "Gelgit Akıntıları",
    introduction: "Gelgit akıntıları, gelgitin yükselmesi (flood) ve alçalması (ebb) sırasında oluşan yatay su hareketidir ve seyir hesaplamalarında dikkate alınmalıdır.",
    content: `TEMEL KAVRAMLAR:
- Flood stream: Gelgitin yükseldiği dönemde kabarma yönünde akan su
- Ebb stream: Gelgitin alçaldığı dönemde çekilme yönünde akan su
- Slack water: Flood ve ebb arasındaki durgun su (akıntı hızı ≈ 0)
- Slack water her zaman HW ve LW ile aynı zamanda değildir

AKINTIYI ETKİLEYEN FAKTÖRLER:
- Kıyı şekli: Dar boğazlar ve kanallar akıntıyı hızlandırır
- Deniz tabanı: Sığ bölgelerde akıntı etkisi artar
- Rüzgâr: Akıntı yönünde rüzgâr etkiyi güçlendirir
- Spring/Neap: Spring tide'da akıntı hızı neap tide'a göre çok daha fazladır

GELGİT AKINTISI TABLOLARI VE ATLASI:
Tidal stream atlas veya tidal diamonds (harita üzerinde) ile belirli referans limanlara göre her saatteki akıntı yönü ve hızı verilir. Spring ve neap değerleri ayrı sütunlarda gösterilir.

SEYİRE ETKİSİ:
- Akıntı seyir yönünde ise hız kazanılır (SOG artar)
- Ters yönde ise hız kaybedilir
- Akıntının çapraz etkisi geminin drift yapmasına neden olur
- EP (Estimated Position) hesabında akıntı vektörel olarak eklenir`,
    bulletPoints: [
      "Flood: yükselen gelgit akıntısı, ebb: alçalan",
      "Slack water her zaman HW/LW ile eşzamanlı değildir",
      "Spring tide'da akıntı hızı çok daha fazladır",
      "Tidal stream atlas akıntı yönü ve hızını gösterir",
    ],
    keyPoints: [
      "Dar boğazlarda gelgit akıntısı 6-8 knot'a ulaşabilir",
      "Seyir hesaplamalarında akıntı vektörel olarak eklenir",
      "Akıntı-dalga karşılaşması dalga dikliğini artırır",
    ],
  },

  // =====================================================
  // BÖLÜM 9 - METEOROLOJİ ALETLERİ VE GÖZLEM
  // =====================================================
  "barometer": {
    title: "Barometre Türleri ve Kullanımı",
    introduction: "Barometre, atmosfer basıncını ölçen temel meteoroloji aletidir ve gemilerde civalı, aneroid ve barograf olmak üzere üç tipi kullanılır.",
    content: `CİVALI BAROMETRE:
En hassas basınç ölçüm aracıdır. Camboruda civa sütununun yüksekliği basınçla orantılıdır. Gemilerde sallanmayı kompanze eden Kew-pattern deniz barometresi kullanılır.

Düzeltmeler:
1. Sıcaklık düzeltmesi: Civa genleşmesi için
2. Yerçekimi düzeltmesi: Enlem farkı için (standart: 45° enlem)
3. Yükseklik düzeltmesi: Deniz seviyesine indirgeme
4. Indeks hatası: Aletin kendi hatası

ANEROİD BAROMETRE:
Metal vakum kapsülün basınç değişimleriyle genleşip büzüşmesi prensibine dayanır. Taşınabilir ve dayanıklıdır. Civalı barometre ile düzenli karşılaştırma (kalibrasyon) gerektirir.

BAROGRAF:
Aneroid mekanizmalı, döner tambur üzerine sarılı kâğıda basınç değişimini sürekli kaydeden cihazdır. 24 saatlik veya haftalık kayıt yapar.

Barograf kaydından okunan bilgiler:
- Mevcut basınç
- Basınç eğilimi (tendency): Son 3 saatteki değişim
- Değişim hızı ve yönü
- Cephe geçişi, fırtına yaklaşması gibi olaylar

PSC denetimlerinde barograf kaydı kontrol edilir; kayıtların düzenli ve kesintisiz olması gerekir.`,
    bulletPoints: [
      "Civalı barometre: en hassas, 4 düzeltme uygulanır",
      "Aneroid barometre: taşınabilir, düzenli kalibrasyon gerekli",
      "Barograf: sürekli basınç kaydı, eğilim analizi",
      "PSC denetimlerinde barograf kaydı kontrol edilir",
    ],
    keyPoints: [
      "Civalı barometre referans alettir, diğerleri onunla kalibre edilir",
      "Basınç eğilimi hava tahmini için basınç değerinden daha önemlidir",
      "Hızlı basınç düşüşü yaklaşan fırtınanın göstergesidir",
    ],
  },
  "thermometer-hygrometer": {
    title: "Termometre ve Higrometre",
    introduction: "Gemilerde hava sıcaklığı ve nem ölçümü, standart meteoroloji kulübesinde kuru-yaş termometre (psikrometre) ile yapılır.",
    content: `SICAKLIK ÖLÇÜMÜ:

Stevenson Screen (Meteoroloji Kulübesi):
Beyaz boyalı, havalandırmalı ahşap dolap. Doğrudan güneş ışığı, rüzgâr ve yağıştan korur. Güverteden en az 1,2 m yükseklikte yerleştirilir.

İçindeki aletler:
1. Kuru termometre: Hava sıcaklığını ölçer
2. Yaş termometre: Fitilli ucu ıslak bezle sarılı; buharlaşma sonucu soğur
3. Maksimum termometre: Günün en yüksek sıcaklığını kaydeder
4. Minimum termometre: Günün en düşük sıcaklığını kaydeder

PSİKROMETRE (Wet-Dry Bulb):
Kuru ve yaş termometrenin birlikte kullanılmasıyla bağıl nem, çiy noktası ve buhar basıncı hesaplanır. İki termometre arasındaki fark (depression) ne kadar büyükse hava o kadar kurudur.

DENİZ SUYU SICAKLIĞI:
Kova ile alınan su örneğinden veya geminin deniz suyu giriş (sea chest) termometresinden ölçülür. SST sis tahmini ve tropikal siklon risk değerlendirmesi için kritiktir.

HİGROGRAF:
Nem değişimini sürekli kaydeden cihazdır. Saç higrometri prensibine dayanır (saç nemle uzar).`,
    bulletPoints: [
      "Stevenson Screen: standart meteoroloji ölçüm dolabı",
      "Psikrometre: kuru-yaş termometre farkıyla nem ölçümü",
      "SST: sis ve tropikal siklon tahmini için kritik",
      "Depression büyükse hava kuru, küçükse nemli",
    ],
    keyPoints: [
      "Ölçüm doğrudan güneş ışığından korunarak yapılmalıdır",
      "Yaş termometre fitili her zaman ıslak ve temiz tutulmalıdır",
      "SST ile hava sıcaklığı farkı sis riskini gösterir",
    ],
  },
  "anemometer": {
    title: "Anemometre ve Rüzgâr Ölçümü",
    introduction: "Anemometre rüzgâr hızını, rüzgâr gülü (wind vane) ise rüzgâr yönünü ölçen meteoroloji aletleridir.",
    content: `ANEMOMETRE TÜRLERİ:

1. KUPA ANEMOMETRESİ (Cup Anemometer):
En yaygın tip. Üç veya dört kupa rüzgârla döner, dönüş hızı rüzgâr hızıyla orantılıdır. Gemilerde direğin tepesine veya köprüüstü üstüne yerleştirilir.

2. PERVANE ANEMOMETRESİ:
Rüzgâr yönüne dönen pervane, dönüş hızından rüzgâr hızını ölçer.

3. ULTRASONİK ANEMOMETRE:
Hareketli parçası yoktur. Ultrasonik ses dalgalarının rüzgârdan etkilenmesini ölçer. Modern gemilerde giderek yaygınlaşmaktadır. Buz tutma sorunu yoktur.

RÜZGÂR ÖLÇÜMÜNDE DÜZELTMELERİ:

GERÇEK RÜZGÂR VE GEMİ RÜZGÂRI:
Gemi hareket halinde ölçülen rüzgâr "apparent wind" (görünen rüzgâr)'dır. Gerçek rüzgâr, gemi hızı ve rotası dikkate alınarak vektörel olarak hesaplanır.

Gerçek rüzgâr = Apparent wind − Gemi hız/yön vektörü

YÜKSEKLİK DÜZELTMESİ:
Rüzgâr hızı yükseklikle artar (logaritmik profil). Standart ölçüm yüksekliği 10 m'dir. Gemi anemometresi farklı yükseklikteyse düzeltme uygulanır.

RÜZGÂR YÖNÜ:
Rüzgâr yönü, rüzgârın geldiği yön olarak ifade edilir. Kuzeyden esen rüzgâr = 000° (360°) yönünden gelen rüzgâr.`,
    bulletPoints: [
      "Kupa anemometresi en yaygın tiptir",
      "Ultrasonik anemometre hareketli parçasız, modern tercih",
      "Gemide ölçülen: apparent wind → vektörel düzeltme → true wind",
      "Rüzgâr yönü: rüzgârın geldiği yön",
    ],
    keyPoints: [
      "Apparent wind gerçek rüzgâr değildir — düzeltme şarttır",
      "Standart rüzgâr ölçüm yüksekliği 10 metredir",
      "Rüzgâr yönü derece olarak kuzeyden saat yönünde ifade edilir",
    ],
  },
  "weather-observation": {
    title: "Denizde Hava Gözlemi ve Kayıt",
    introduction: "Gemilerde düzenli meteorolojik gözlem yapılır ve sonuçlar meteoroloji jurnalına kaydedilerek ulusal ve uluslararası servislere iletilir.",
    content: `GÖZLEM ZAMANLARI:
Standart sinoptik saatler: 00, 06, 12, 18 UTC (ana saatler)
Ara saatler: 03, 09, 15, 21 UTC
Gemiler genellikle günde 4 veya 8 gözlem yapar.

GÖZLEM PARAMETRELERİ:
1. Basınç: Barometre okuması, deniz seviyesine indirgeme, eğilim (tendency)
2. Sıcaklık: Kuru termometre, yaş termometre, deniz suyu sıcaklığı
3. Rüzgâr: Yön (gerçek), hız (Beaufort veya knot)
4. Bulut: Tür, miktar (okta cinsinden, 0-8), alt taban yüksekliği
5. Görüş: Mesafe tahmini
6. Deniz durumu: Dalga yüksekliği ve yönü (sea ve swell ayrı ayrı)
7. Hava durumu: Mevcut ve geçmiş hava olayları (yağış, sis, fırtına vb.)

METEOROLOJİ JURNALI:
Tüm gözlemler kayıt altına alınır. IMO ve WMO standartlarına uygun formlar kullanılır.

GÖNÜLLÜ GÖZLEM GEMİLERİ (VOS):
WMO'nun Gönüllü Gözlem Gemileri programına katılan ticari gemiler, gözlem verilerini ulusal meteoroloji servislerine iletir. Bu veriler hava tahmin modellerinin doğrulanması ve iyileştirilmesinde kullanılır.`,
    bulletPoints: [
      "Sinoptik saatler: 00, 06, 12, 18 UTC",
      "Bulut miktarı okta (0-8) ile ölçülür",
      "Sea ve swell ayrı ayrı kaydedilir",
      "VOS programı ticari gemilerin veri katkısıdır",
    ],
    keyPoints: [
      "Meteoroloji jurnali yasal bir belgedir",
      "Düzenli gözlem hem emniyet hem hava tahmini için gereklidir",
      "Gözlem verileri uluslararası hava tahmin ağına katkı sağlar",
    ],
  },
  "weather-reports": {
    title: "Meteoroloji Raporları (SYNOP, METAR)",
    introduction: "Meteorolojik gözlemler uluslararası standart kodlarla (SYNOP, METAR, SHIP) kodlanarak iletilir.",
    content: `SYNOP KODU:
Karasal meteoroloji istasyonlarının saatlik gözlem raporu formatıdır. WMO standart formatta kodlanır. Basınç, sıcaklık, nem, rüzgâr, bulut, görüş ve hava olaylarını içerir.

SHIP KODU:
Gemilerin denizden yaptığı gözlem raporu formatıdır. SYNOP'a benzer yapıda, ek olarak geminin pozisyonu, rotası, hızı, deniz suyu sıcaklığı ve dalga bilgilerini içerir.

METAR:
Havacılık meteoroloji raporu. Kıyıya yakın seyirde veya liman yaklaşmasında referans olarak kullanılabilir. Rüzgâr, görüş, bulut ve önemli hava olaylarını içerir.

GMDSS METEOROLOJİ YAYINLARI:
- NAVTEX: 518 kHz üzerinden otomatik meteoroloji uyarıları
- SafetyNET (Inmarsat-C): Küresel meteoroloji güvenlik mesajları
- HF RTTY / WEFAX: Hava haritaları ve bültenler
- Internet / Inmarsat: Modern gemilerde e-posta ile güncel tahminler

METAREA SİSTEMİ:
Dünya okyanusları 21 METAREA bölgesine ayrılmıştır. Her bölgenin sorumlu meteoroloji servisi vardır ve bölgeye özgü uyarılar yayınlar.`,
    bulletPoints: [
      "SYNOP: kara gözlem raporu, SHIP: gemi gözlem raporu",
      "METAR: havacılık raporu, kıyı seyirde referans",
      "NAVTEX otomatik meteoroloji uyarısı sağlar",
      "21 METAREA bölgesi küresel hava güvenliğini kapsar",
    ],
    keyPoints: [
      "SHIP raporu VOS gemilerinin WMO'ya katkısıdır",
      "GMDSS meteoroloji yayınları tüm SOLAS gemileri için zorunludur",
      "METAREA sorumlu servisleri uyarıların düzenli yayınını garanti eder",
    ],
  },

  // =====================================================
  // BÖLÜM 10 - HAVA TAHMİNİ VE HARİTALAR
  // =====================================================
  "synoptic-charts": {
    title: "Sinoptik Haritalar ve Okuma",
    introduction: "Sinoptik hava haritaları, geniş bir bölgedeki basınç sistemlerini, cepheleri ve hava koşullarını belirli bir zamanda gösteren temel meteorolojik araçlardır.",
    content: `SİNOPTİK HARİTA İÇERİĞİ:

1. İZOBARLAR: Eşit basınç çizgileri (4 hPa aralıklı). Sık izobar = kuvvetli rüzgâr.
2. BASINÇ MERKEZLERİ: H (yüksek) ve L (alçak) ile işaretlenir. Merkez basınç değeri yazılır.
3. CEPHELER:
   - Soğuk cephe: Mavi üçgenler
   - Sıcak cephe: Kırmızı yarım daireler
   - Oklüzyon: Mor üçgen + yarım daire
   - Stasyoner cephe: Mavi üçgen + kırmızı yarım daire (zıt yönlerde)
4. OLUK (Trough): Kesikli çizgi, alçak basınç uzantısı
5. SIRT (Ridge): Yüksek basınç uzantısı
6. İSTASYON MODELİ: Gözlem verilerinin sembolik gösterimi

HARİTA OKUMA PRATİĞİ:
- Önce basınç merkezlerini belirle (H, L)
- İzobar sıklığından rüzgâr kuvvetini tahmin et
- Cephelerin konumu ve hareket yönünü değerlendir
- Kendi konumunun basınç sistemine göre durumunu belirle
- Gelecek 12-24 saatteki olası değişimi tahmin et

TAHMİN HARİTALARI (Prognostic Charts):
24, 48 ve 72 saat sonrası için tahmin edilen basınç ve cephe konumlarını gösteren haritalar. Seyir planlamasında kullanılır.`,
    bulletPoints: [
      "İzobarlar 4 hPa aralıklı çizilir",
      "Soğuk cephe: mavi üçgen, sıcak cephe: kırmızı yarım daire",
      "Oluk: kötü hava bölgesi, sırt: iyi hava bölgesi",
      "Prognostik haritalar 24-72 saat öngörü sağlar",
    ],
    keyPoints: [
      "Sinoptik harita okuma denizci için temel beceridir",
      "Kendi pozisyonunun basınç sistemine göre tespiti rotayı etkiler",
      "Tahmin haritaları seyir planlamasının ayrılmaz parçasıdır",
    ],
  },
  "weather-symbols": {
    title: "Hava Haritası Sembolleri",
    introduction: "İstasyon modeli, belirli bir gözlem noktasındaki tüm meteorolojik verileri standart sembollerle tek bir diyagramda gösterir.",
    content: `İSTASYON MODELİ (Station Model):

Merkez daire: Bulut miktarını gösterir (0/8 açık — 8/8 kapalı)
Sol taraf: Rüzgâr yönü ve hızı (flamalar ve çizgiler)
Üst sol: Sıcaklık (°C)
Alt sol: Çiy noktası (°C)
Sağ: Basınç (son 3 hane, örn. 132 = 1013,2 hPa)
Sağ üst: Basınç eğilimi (tendency) sembolü ve değeri
Sol alt: Mevcut hava durumu sembolü

RÜZGÂR SEMBOLÜ:
Çubuk rüzgârın geldiği yönü gösterir. Çubuk üzerindeki:
- Kısa çizgi: 5 knot
- Uzun çizgi: 10 knot
- Üçgen flama: 50 knot
Örnek: İki uzun çizgi + bir kısa = 25 knot

HAVA DURUMU SEMBOLLERİ:
• (nokta): Yağmur         ❊ (yıldız): Kar
≡ (üç çizgi): Sis          ∞ (sonsuzluk): Pus
▽ (üçgen): Sağanak       ⚡ (şimşek): Gök gürültüsü

BASINÇ EĞİLİMİ SEMBOLLERİ:
Yükselen, düşen, sabit veya dalgalı basınç değişimini gösteren eğri semboller. 3 saatlik değişim miktarı sayısal olarak eklenir.`,
    bulletPoints: [
      "İstasyon modeli tüm meteorolojik verileri tek diyagramda gösterir",
      "Rüzgâr: uzun çizgi=10 kn, kısa=5 kn, flama=50 kn",
      "Basınç: son 3 hane verilir (132 → 1013,2 hPa)",
      "Bulut miktarı: 0/8 açık, 8/8 kapalı (okta)",
    ],
    keyPoints: [
      "İstasyon modelini okuyabilmek sinoptik harita analizinin temelidir",
      "Rüzgâr sembolü yönü ve hızı birlikte gösterir",
      "Basınç eğilimi sembolü hava değişimini öngörmede kritiktir",
    ],
  },
  "forecast-methods": {
    title: "Tahmin Yöntemleri",
    introduction: "Hava tahmini; sinoptik analiz, sayısal modeller ve istatistiksel yöntemlerin birlikte kullanılmasıyla yapılır.",
    content: `TAHMİN YÖNTEMLERİ:

1. SİNOPTİK METOT:
Ardışık sinoptik haritalar karşılaştırılarak basınç sistemlerinin ve cephelerin hareket yönü ve hızı belirlenir. Deneyimli meteorologun analiz ve yorumlama becerisi gerektirir. Kısa vadeli (12-24 saat) tahminlerde etkilidir.

2. SAYISAL HAVA TAHMİNİ (NWP):
Süper bilgisayarlarla atmosferin fizik denklemleri çözülerek gelecek hava koşulları hesaplanır. Başlıca modeller: GFS (ABD), ECMWF (Avrupa), UKMO (İngiltere), JMA (Japonya). Orta ve uzun vadeli (3-7 gün) tahminlerde en güvenilir yöntemdir.

3. ENSEMBLE TAHMİN:
Aynı modelin biraz farklı başlangıç koşullarıyla çok sayıda çalıştırılmasıdır. Tahmin belirsizliğini gösterir. Üyelerin çoğunluğunun gösterdiği sonuç daha güvenilirdir.

4. İSTATİSTİKSEL METOT (MOS):
Model çıktılarının tarihsel verilerle karşılaştırılarak düzeltilmesi. Yerel koşullara uyarlama sağlar.

TAHMİN GÜVENİLİRLİĞİ:
- 24 saat: %85-90 doğruluk
- 72 saat: %70-80 doğruluk
- 5-7 gün: Genel eğilim güvenilir, detay zayıf
- 10 gün sonrası: Düşük güvenilirlik`,
    bulletPoints: [
      "Sinoptik metot: harita analizi, kısa vadeli",
      "NWP: bilgisayar modelleri, orta-uzun vadeli",
      "Ensemble: belirsizlik analizi, güvenilirlik artırıcı",
      "24 saatlik tahmin %85-90 doğruluk oranına sahiptir",
    ],
    keyPoints: [
      "ECMWF genel olarak en güvenilir global model kabul edilir",
      "Birden fazla model karşılaştırarak güvenilirlik artırılır",
      "Denizciler 5 günlük tahmine kadar plan yapabilir",
    ],
  },
  "local-signs": {
    title: "Yerel Hava Belirtileri (Denizci Bilgisi)",
    introduction: "Denizde gökyüzü, rüzgâr ve deniz yüzeyi gözlemleri, teknolojik araçlar olmaksızın hava değişikliklerini öngörmede değerli bilgiler sunar.",
    content: `GÖKYÜZÜ BELİRTİLERİ:

İYİ HAVA GÖSTERGELERİ:
- Açık mavi gökyüzü, iyi tanımlanmış ufuk çizgisi
- Küçük, yassı kümülüs bulutları (fair weather cumulus)
- Güneş batımında kırmızı/turuncu ufuk (KYK'de batıdan gelen iyi hava)
- Yükselen barograf eğrisi
- Düzenli meltem (deniz-kara esintisi)

KÖTÜ HAVA GÖSTERGELERİ:
- Cirrus bulutlarının artması ve kalınlaşması
- Hale (ay veya güneş etrafında halka) — cirrostratus → sıcak cephe yaklaşıyor
- Alçalan bulut tabanı
- Rüzgâr yönünde ani değişim
- Barograf eğrisinde hızlı düşüş
- Ufukta kalın, koyu bulut kümesi (squall line)
- Deniz kuşlarının kıyıya dönmesi

ATASÖZÜ VE DENİZCİ BİLGİSİ:
"Red sky at night, sailor's delight; red sky in morning, sailor's warning."
(Akşam kırmızı gökyüzü iyi hava; sabah kırmızı gökyüzü kötü hava habercisi.)

Bu atasözü özellikle orta enlemlerde geçerlidir. Hava sistemleri genellikle batıdan doğuya hareket ettiği için, akşam batıdaki kırmızılık açık gökyüzünü, sabah doğudaki kırmızılık geçmiş iyi havanın ardından kötü hava yaklaşımını gösterir.

BASINÇ EĞİLİMİ YORUMU:
- Yavaş, düzenli düşüş: Alçak basınç yaklaşıyor
- Hızlı düşüş (>3 hPa/3 saat): Fırtına uyarısı
- Düzenli yükseliş: İyi hava geliyor
- V şeklinde düşüp yükselme: Cephe geçişi`,
    bulletPoints: [
      "Hale cirrostratus → sıcak cephe yaklaşıyor",
      "Barograf 3 saatte >3 hPa düşerse fırtına yakındır",
      "Akşam kırmızılığı iyi hava, sabah kırmızılığı kötü hava",
      "Alçalan bulut tabanı kötüleşen havanın göstergesidir",
    ],
    keyPoints: [
      "Denizci gözlemi teknolojinin yedekleyici güvencesidir",
      "Barograf eğilimi yerel belirtilerin en güvenilir olanıdır",
      "Bulut sıralamasını takip etmek cephe yaklaşmasını anlamayı sağlar",
    ],
  },
  "weather-routing": {
    title: "Hava Rotalaması (Weather Routing)",
    introduction: "Weather routing, meteorolojik tahminlere dayalı olarak en güvenli ve ekonomik deniz rotasının belirlenmesi sürecidir.",
    content: `AMAÇ:
En kısa rota her zaman en hızlı veya en güvenli rota değildir. Weather routing, hava ve deniz koşullarını dikkate alarak optimum rotayı belirler.

KRİTERLER:
1. Minimum seyir süresi (ETA optimizasyonu)
2. Minimum yakıt tüketimi
3. Minimum yapısal stres (dalga yükü)
4. Mürettebat ve yük güvenliği
5. Programa uyum

SÜREÇ:
1. Mevcut ve tahmin edilen hava haritalarının analizi
2. Dalga tahmin haritalarının incelenmesi
3. Gemi performans verilerinin değerlendirilmesi (speed-power curve)
4. Alternatif rotaların karşılaştırılması
5. Optimum rotanın seçimi ve uygulama
6. Seyir boyunca güncellenme (rerouting)

WEATHER ROUTING SERVİSLERİ:
Profesyonel weather routing şirketleri, uydu üzerinden gemilere güncel rota tavsiyeleri gönderir. Tavsiyeler kaptan için bağlayıcı değildir; nihai karar her zaman kaptana aittir.

BÜYÜK DAİRE VS. WEATHER ROUTE:
Büyük daire en kısa mesafedir, ancak kötü hava bölgesinden geçebilir. Weather routing daha uzun ama güvenli ve hızlı bir alternatif sunabilir. Kuzey Atlantik ve Kuzey Pasifik'te weather routing özellikle kış aylarında kritiktir.`,
    bulletPoints: [
      "En kısa rota her zaman en iyi rota değildir",
      "Minimum seyir süresi, yakıt ve yapısal stres optimize edilir",
      "Profesyonel servisler uydu üzerinden tavsiye gönderir",
      "Nihai rota kararı kaptana aittir",
    ],
    keyPoints: [
      "Weather routing emniyet ve ekonomiyi birleştirir",
      "Kuzey Atlantik kışında weather routing hayati önemdedir",
      "Seyir boyunca güncel tahminlerle rota revize edilir (rerouting)",
    ],
  },

  // =====================================================
  // BÖLÜM 11 - DENİZCİLİK METEOROLOJİ HABERLEŞMESİ
  // =====================================================
  "navtex-meteo": {
    title: "NAVTEX Meteoroloji Mesajları",
    introduction: "NAVTEX, 518 kHz frekansında meteoroloji uyarıları ve seyir tehlikelerini otomatik olarak yazılı metin halinde alan haberleşme sistemidir.",
    content: `NAVTEX SİSTEMİ:
NAVTEX (Navigational Telex), GMDSS'in bir parçasıdır. Kıyı istasyonlarından 200-400 deniz mili menzilde çalışır.

MESAJ TÜRLERİ (B harfi Meteoroloji):
A — Seyir uyarıları
B — Meteoroloji uyarıları ve tahminler
C — Buz raporları
D — SAR bilgileri
E — Meteoroloji tahminleri
L — Diğer seyir uyarıları

METEOROLOJİ MESAJI İÇERİĞİ:
1. Fırtına uyarıları (gale/storm warnings)
2. Sinoptik durum özeti
3. 24 saatlik hava tahmini (rüzgâr, deniz durumu, görüş)
4. İleriye dönük genel tahmin

MESAJ FORMATI:
ZCZC [İstasyon kodu] [Mesaj türü] [Sıra no]
Mesaj içeriği
NNNN

ÖNEMLİ KURALLAR:
- NAVTEX alıcısı 7/24 açık tutulmalıdır (SOLAS zorunluluğu)
- Seyir bölgesindeki istasyonlar seçili olmalıdır
- B ve D mesaj türleri kapatılamaz (zorunlu alım)
- Aynı mesaj tekrar alınmaz (duplicate rejection)`,
    bulletPoints: [
      "NAVTEX 518 kHz, 200-400 mil menzil",
      "B harfi: meteoroloji uyarıları (zorunlu alım)",
      "Alıcı 7/24 açık tutulmalıdır (SOLAS)",
      "Mesajlar otomatik olarak yazılı metin halinde alınır",
    ],
    keyPoints: [
      "NAVTEX kıyıya yakın seyirde birincil meteoroloji bilgi kaynağıdır",
      "B ve D mesajları kapatılamaz",
      "PSC denetimlerinde NAVTEX alıcısı kontrol edilir",
    ],
  },
  "gmdss-weather": {
    title: "GMDSS ve Hava Güvenlik Bilgileri",
    introduction: "GMDSS, denizde meteorolojik güvenlik bilgilerinin tüm gemilere ulaştırılmasını garanti eden küresel haberleşme sistemidir.",
    content: `GMDSS METEOROLOJİ BİLEŞENLERİ:

1. NAVTEX (A1/A2 bölgesi):
Kıyıya yakın seyirde birincil kaynak. Otomatik alım.

2. SafetyNET (Inmarsat-C):
Açık deniz (A3/A4 bölgesi) için EGC (Enhanced Group Call) üzerinden meteoroloji uyarıları yayınlanır. METAREA koordinatörleri tarafından düzenlenir.

3. HF DSC ve NBDP:
A4 bölgesinde HF üzerinden meteoroloji bültenleri alınabilir.

4. UYDU (Inmarsat):
Inmarsat-C terminali üzerinden e-posta formatında meteoroloji bültenleri ve hava haritaları (WEFAX) alınabilir.

MSI (Maritime Safety Information):
Meteoroloji uyarıları MSI kapsamında yayınlanır. İçerik:
- Fırtına uyarıları (gale, storm, hurricane warnings)
- Sinoptik durum
- Tahminler
- Tropikal siklon bültenleri

WMO-IMO METAREA SİSTEMİ:
21 METAREA bölgesi sorumlu ulusal meteoroloji servisleri tarafından yönetilir. Her servis bölgesindeki denizcilere düzenli uyarı ve tahmin sağlar.`,
    bulletPoints: [
      "NAVTEX: kıyı, SafetyNET: açık deniz meteoroloji bilgisi",
      "MSI: fırtına uyarıları ve tahminleri kapsar",
      "21 METAREA bölgesi küresel hava güvenliğini sağlar",
      "Inmarsat-C üzerinden hava haritası alınabilir",
    ],
    keyPoints: [
      "GMDSS tüm SOLAS gemilerinde zorunludur",
      "SafetyNET açık denizde birincil meteoroloji kaynağıdır",
      "Fırtına uyarıları derhal değerlendirilmelidir",
    ],
  },
  "weather-warnings": {
    title: "Hava Uyarıları ve Fırtına Sinyalleri",
    introduction: "Meteoroloji servisleri, denizcileri yaklaşan tehlikeli hava koşulları konusunda standart uyarı kategorileriyle bilgilendirir.",
    content: `UYARI KATEGORİLERİ:

GALE WARNING (Fırtına Uyarısı):
Rüzgâr hızı Beaufort 8 (34-40 knot) bekleniyor. 

STORM WARNING (Şiddetli Fırtına Uyarısı):
Rüzgâr hızı Beaufort 10 (48-55 knot) bekleniyor.

HURRICANE WARNING (Kasırga Uyarısı):
Rüzgâr hızı Beaufort 12 (64+ knot) bekleniyor.

TROPİKAL SİKLON UYARISI:
Tropikal siklon bölgeye yaklaşıyorsa, konumu, hareket yönü ve hızı, merkez basıncı ve tahmini yolu bildirilir.

UYARI YAYINI:
Uyarılar yayınlandığı andan itibaren geçerlidir. Normal bülten saatleri beklenmeksizin derhal yayınlanır. NAVTEX, SafetyNET ve VHF kanallarıyla duyurulur.

LİMANDA FIRTINA SİNYALLERİ:
Bazı ülkelerde limanlarda görsel sinyaller (gündüz: koni/silindir, gece: ışıklar) kullanılır. Koni tepesi yukarı = kuzeyden fırtına, tepesi aşağı = güneyden fırtına.

DENİZCİNİN SORUMLULUĞU:
Uyarıları aldığında kaptan rota planını gözden geçirmeli, gerekirse rota veya hız değiştirmeli, gemiyi ağır havaya hazırlamalıdır.`,
    bulletPoints: [
      "Gale warning: 34-40 knot (Bf 8)",
      "Storm warning: 48-55 knot (Bf 10)",
      "Hurricane warning: 64+ knot (Bf 12)",
      "Uyarılar derhal yayınlanır, bülten saati beklenmez",
    ],
    keyPoints: [
      "Uyarı alındığında gemi hazırlıklarına başlanmalıdır",
      "Tropikal siklon uyarılarında konum ve tahmin yolu verilir",
      "Kaptan uyarıları değerlendirip rota kararı vermelidir",
    ],
  },
  "inmarsat-weather": {
    title: "Inmarsat Hava Servisleri",
    introduction: "Inmarsat uydu sistemi, açık denizde meteoroloji bilgilerinin alınması için güvenilir ve küresel kapsama sağlayan haberleşme aracıdır.",
    content: `INMARSAT SİSTEMİ:
Dört jeostationary uydu ile kutuplar dışında (~70°N-70°S) küresel kapsama sağlar. GMDSS A3 bölgesinde zorunlu haberleşme aracıdır.

INMARSAT-C METEOROLOJİ SERVİSLERİ:

1. SafetyNET (EGC):
- METAREA meteoroloji uyarıları (otomatik alım)
- Tropikal siklon bültenleri
- Fırtına uyarıları
- Kıyısal uyarılar

2. FleetNET:
- Ticari meteoroloji servisleri
- Detaylı weather routing bilgileri
- Bölgesel tahminler

3. E-MAİL SERVİSLERİ:
- Weather routing şirketlerinden güncel rota tavsiyeleri
- GRIB dosyaları (gridded binary — rüzgâr ve dalga tahmin verileri)
- Sinoptik haritalar ve uydu görüntüleri

GRIB DOSYALARI:
Sayısal model çıktılarının sıkıştırılmış formatıdır. Gemi navigasyon yazılımlarında görsel olarak gösterilir. Rüzgâr, dalga, basınç ve akıntı bilgilerini içerir. Düşük bant genişliğiyle bile indirilebilir.`,
    bulletPoints: [
      "Inmarsat-C SafetyNET açık denizde zorunlu meteoroloji alımı",
      "GRIB dosyaları rüzgâr ve dalga tahminini görsel olarak sunar",
      "FleetNET ticari weather routing bilgisi sağlar",
      "Kutuplar (~70° ötesi) Inmarsat kapsamı dışındadır",
    ],
    keyPoints: [
      "SafetyNET mesajları otomatik alınır ve ekranda görüntülenir",
      "GRIB dosyaları modern seyir planlamasının temel aracıdır",
      "A3 bölgesinde Inmarsat-C zorunludur",
    ],
  },
  "coastal-warnings": {
    title: "Sahil İstasyonu Uyarıları",
    introduction: "Sahil radyo istasyonları, VHF ve MF/HF frekanslarında düzenli olarak meteoroloji bültenleri ve fırtına uyarıları yayınlar.",
    content: `VHF METEOROLOJİ YAYINLARI:
Sahil istasyonları VHF kanalları üzerinden düzenli saatlerde meteoroloji bültenleri yayınlar. Menzil: 20-50 deniz mili.

Yayın içeriği:
- Fırtına uyarıları (derhal yayınlanır)
- Genel sinoptik durum
- 24 saatlik bölgesel tahmin
- Deniz durumu ve görüş tahmini

YAYIM ZAMANLARI:
Her ülkenin sahil istasyonu belirli saatlerde yayın yapar. Yayın zamanları Admiralty List of Radio Signals (ALRS) Volume 3'te listelenir.

UYARI PROSEDÜRÜ:
Fırtına uyarısı alındığında:
1. Uyarıyı kaydet (meteoroloji jurnali)
2. Kaptanı bilgilendir
3. Sinoptik haritada konumu değerlendir
4. Barometreyi kontrol et
5. Gerekirse rota/hız değişikliği planla
6. Gemiyi ağır havaya hazırla

Türkiye'de KEGM (Kıyı Emniyeti Genel Müdürlüğü) sahil istasyonları meteoroloji yayını yapar. İstanbul, Antalya, İzmir ve diğer istasyonlar VHF ve MF üzerinden düzenli bülten verir.`,
    bulletPoints: [
      "VHF meteoroloji yayını 20-50 mil menzilde",
      "Fırtına uyarıları derhal yayınlanır",
      "ALRS Volume 3 yayın zamanlarını listeler",
      "Türkiye'de KEGM sahil istasyonları yayın yapar",
    ],
    keyPoints: [
      "Sahil istasyonu yayınları kıyı seyirde birincil kaynaktır",
      "Uyarı alındığında kayıt ve değerlendirme zorunludur",
      "ALRS yayınları seyir planlamasında başvuru kaynağıdır",
    ],
  },

  // =====================================================
  // BÖLÜM 12 - İKLİM VE DENİZDE GÜVENLİK
  // =====================================================
  "climate-zones": {
    title: "İklim Kuşakları ve Deniz Rotaları",
    introduction: "Dünya iklim kuşakları, deniz ticaret rotalarını, seyir koşullarını ve mevsimsel planlamayı doğrudan etkiler.",
    content: `İKLİM KUŞAKLARI:

EKVATORİAL KUŞAK (0-10°):
Yüksek sıcaklık, yüksek nem, günlük sağanaklar. ITCZ bölgesi: hafif rüzgâr ve durgun hava (doldrums). Tropikal siklon riski düşük (Coriolis yetersiz).

TROPİKAL KUŞAK (10-23,5°):
Trade winds hâkim. Kuru ve yağışlı mevsimler belirgin. Tropikal siklon oluşum bölgesi. Muson etkisi (Hint Okyanusu).

SUBTROPİKAL KUŞAK (23,5-35°):
Yüksek basınç bölgesi (horse latitudes). Hafif rüzgâr, açık hava. Büyük çöller bu kuşaktadır.

ORTA ENLEM KUŞAĞI (35-60°):
Batılı rüzgârlar (westerlies), cephesel depresyonlar, değişken hava. En yoğun deniz ticareti bu kuşakta yapılır. Kış aylarında şiddetli fırtına riski.

SUBPOLAR VE POLAR KUŞAK (60-90°):
Şiddetli rüzgâr (Roaring Forties, Furious Fifties), buz riski, düşük görüş. Drake Passage ve Güney Okyanus en zorlu seyir bölgeleri arasındadır.

ROTALARA ETKİSİ:
- Kuzey Atlantik: Kışın güneyli, yazın kuzeyli rota tercih edilir
- Hint Okyanusu: Muson mevsimine göre rota planlanır
- Panama ve Süveyş kanalları iklim kuşaklarını atlama imkânı sağlar
- Pilot charts mevsimsel rüzgâr ve akıntı bilgisi sunar`,
    bulletPoints: [
      "Orta enlem: en yoğun ticaret rotası, değişken hava",
      "Tropikal kuşak: siklon riski, trade winds",
      "Subtropikal: yüksek basınç, hafif rüzgâr",
      "Pilot charts mevsimsel koşulları gösterir",
    ],
    keyPoints: [
      "Seyir planlaması iklim kuşaklarına göre şekillenir",
      "Kış Kuzey Atlantik rotası fırtına riskine göre belirlenir",
      "Muson mevsimi Hint Okyanusu'nda rotayı belirler",
    ],
  },
  "monsoon": {
    title: "Muson Rüzgârları ve Mevsimsel Değişimler",
    introduction: "Muson, kara ve deniz arasındaki mevsimsel sıcaklık farkından kaynaklanan büyük ölçekli rüzgâr yön değişimidir.",
    content: `MUSON MEKANİZMASI:
Kara Güneş enerjisini denizden daha hızlı absorbe eder ve yayar. Yaz: kara ısınır, üzerinde alçak basınç oluşur, nemli deniz havası karaya doğru akar (yaz musonu — SW monsoon). Kış: kara soğur, üzerinde yüksek basınç oluşur, kuru kara havası denize doğru akar (kış musonu — NE monsoon).

HİNT OKYANUSU MUSONU:

GÜNEYBATI MUSONU (Haziran-Eylül):
- Hint Okyanusu'nda SW rüzgâr
- Şiddetli yağış (Hindistan, Güneydoğu Asya)
- Kuvvetli rüzgâr ve dalgalar (Beaufort 6-8)
- Somali akıntısı kuzeye doğru akar
- Aden Körfezi ve Arap Denizi'nde sert koşullar

KUZEYDOĞU MUSONU (Kasım-Mart):
- NE rüzgâr
- Kuru mevsim (Hindistan)
- Daha ılımlı deniz koşulları
- Somali akıntısı güneye döner

GEÇİŞ DÖNEMLERİ (Nisan-Mayıs, Ekim-Kasım):
Rüzgâr yönü değişirken değişken ve durgun hava koşulları. Tropikal siklon riski artar (Bay of Bengal).

DENİZCİLİK ETKİSİ:
- Yaz musonu döneminde Hint Okyanusu seyirleri zorlaşır
- Liman operasyonları yağış ve dalgadan etkilenir
- Yükleme programları muson mevsimine göre planlanır
- Monsoon drift akıntısı seyir süresini etkiler`,
    bulletPoints: [
      "SW muson (Haz-Eyl): nemli, şiddetli rüzgâr ve yağış",
      "NE muson (Kas-Mar): kuru, ılımlı koşullar",
      "Geçiş dönemlerinde tropikal siklon riski artar",
      "Muson mevsimi liman ve yükleme planlamasını etkiler",
    ],
    keyPoints: [
      "Hint Okyanusu rüzgâr rejimi tamamen mevsimseldir",
      "SW muson döneminde Arap Denizi seyirleri çok sert olabilir",
      "Muson bilgisi Hint Okyanusu rotaları için zorunludur",
    ],
  },
  "ice-navigation": {
    title: "Buz Navigasyonu ve Buz Türleri",
    introduction: "Kutup ve yüksek enlemlerde deniz buzu, seyir emniyeti açısından ciddi risk oluşturur ve buz türlerinin tanınması güvenli seyirin ön koşuludur.",
    content: `BUZ TÜRLERİ:

DENİZ BUZU (Sea Ice):
Deniz suyunun donmasıyla oluşur. Donma noktası tuzluluğa bağlıdır (standart deniz suyu: -1,8 °C).

- New ice: İlk oluşan ince buz tabakası
- Young ice: 10-30 cm kalınlık
- First-year ice: Bir mevsim boyunca büyümüş buz (30 cm - 2 m)
- Multi-year ice: Birden fazla erime mevsimini atlatmış buz, çok sert ve kalın (>2 m)

BUZDAĞI (Iceberg):
Buzullardan kopan büyük buz kütleleri. %90'ı su altındadır. Kuzey Atlantik'te Grönland buzullarından kopan buzdağları Labrador akıntısıyla güneye taşınır. Titanic faciası (1912) sonucu Uluslararası Buz Devriye Teşkilatı (IIP) kurulmuştur.

BUZ SINIFLANDIRMASI (miktara göre):
- Open water: <1/10 buz
- Very open pack: 1/10 - 3/10
- Open pack: 4/10 - 6/10
- Close pack: 7/10 - 8/10
- Very close pack: 9/10 - <10/10
- Compact/consolidated: 10/10

BUZ HARİTALARI VE BİLGİ KAYNAKLARI:
- IIP (International Ice Patrol): Kuzey Atlantik buzdağı takibi
- NAVTEX buz uyarıları
- Uydu buz haritaları
- Ice Pilot: Buz bölgesi seyir kılavuzu`,
    bulletPoints: [
      "Deniz suyu -1,8 °C'de donar",
      "Buzdağının %90'ı su altındadır",
      "Multi-year ice en sert ve tehlikeli buz türüdür",
      "IIP Kuzey Atlantik'te buzdağı izleme yapar",
    ],
    keyPoints: [
      "Buz bölgesinde seyirde radar ve gözcü kritiktir",
      "Buz konsantrasyonu 7/10 üzerinde seyir çok risklidir",
      "Polar Code buz sularında seyir kurallarını düzenler",
    ],
    warnings: [
      "Buzdağıyla çarpışma geminin batmasına yol açabilir",
      "Buz bilgisi olmadan kutupsal sulara girilmemelidir",
    ],
  },
  "heavy-weather-seamanship": {
    title: "Ağır Havada Gemicilik (Heavy Weather Seamanship)",
    introduction: "Ağır hava koşullarında gemi ve mürettebat güvenliğini sağlamak için sistematik hazırlık ve manevra teknikleri uygulanır.",
    content: `AĞIR HAVA HAZIRLIĞI:

1. GEMİNİN HAZIRLANMASI:
- Tüm su geçirmez kapılar ve havalandırıcılar kapatılır
- Güverte yükleri kontrol ve emniyete alınır
- Borda lombozu kapatılır
- Deniz suyu giriş vanaları kontrol edilir
- Boş tanklar doldurulur veya tamamen boşaltılır (serbest yüzey etkisi)

2. KÖPRÜÜSTİ TEDBİRLERİ:
- Makine standby
- Radar ve AIS aktif
- Güvenli hız belirlenir
- Barograf sürekli izlenir
- VHF ve NAVTEX takibi

3. MÜRETTEBAT:
- Güverte çalışmaları durdurulur
- Personel bilgilendirilir
- Açık güverteye çıkış yasaklanır veya kısıtlanır
- İlk yardım ve acil durum ekipmanı hazır tutulur

AĞIR HAVADA MANEVRA:

HEAVE TO (Baş yönüne alma):
Dalgaları pruva omuzluğundan alarak düşük hızda seyretmek. Pitching artabilir ancak rolling azalır. Genel olarak en güvenli pozisyondur.

RÜZGÂR ALTINA DÖNME (Running before the sea):
Dalgalarla aynı yönde seyir. Rolling azalır, ancak broaching ve pooping (kıçtan dalga yemesi) riski artar. Kıç dalgalarda dikkatli dümen kullanımı gerektirir.

LAY AHULL (Makineleri durdurup sürüklenme):
Son çare. Gemiyi dalgalara bırakmak. Kontrolsüz rolling ve broaching riski yüksektir.`,
    bulletPoints: [
      "Su geçirmez kapılar kapatılır, yükler sabitlenir",
      "Serbest yüzey etkisi önlenir (tanklar tam dolu veya boş)",
      "Heave to: en güvenli pozisyon, pruva omuzluk dalgası",
      "Running: broaching riski, lay ahull: son çare",
    ],
    keyPoints: [
      "Ağır hava hazırlığı fırtına öncesinde tamamlanmalıdır",
      "Manevra seçimi gemi tipi, yük durumu ve deniz koşullarına bağlıdır",
      "Güvenli hız slamming ve güverte yıkamayı önleyecek şekilde ayarlanır",
    ],
    warnings: [
      "Ağır havada güverte çalışması hayati risk taşır",
      "Serbest yüzey etkisi fırtınada stabilite kaybına neden olabilir",
    ],
  },
  "meteo-accidents": {
    title: "Meteorolojik Nedenli Deniz Kazaları",
    introduction: "Meteorolojik koşullar deniz kazalarının önemli bir bölümünde doğrudan veya dolaylı etkendir; tarihsel kazalar güvenlik kurallarının gelişimini şekillendirmiştir.",
    content: `ÖNEMLİ METEOROLOJİK KAYNAKLI KAZALAR:

1. RMS TITANIC (1912):
Kuzey Atlantik'te buzdağı ile çarpışma. 1.517 kişi hayatını kaybetti. Buzdağı Labrador akıntısıyla güneye taşınmıştı. Sonuç: SOLAS sözleşmesi ve IIP (International Ice Patrol) kuruldu.

2. SS EDMUND FITZGERALD (1975):
Superior Gölü'nde şiddetli fırtınada battı (29 mürettebat). Rüzgâr 60 knot, dalga 10 m'yi aştı. Fırtına uyarılarına rağmen seyir devam etmişti.

3. MV DERBYSHIRE (1980):
Tayfun Orchid'de batarak kayboldu (44 mürettebat). Dökme cevher yüklü bulk carrier. Araştırma sonucu hatch cover standartları güçlendirildi.

4. MS MÜNCHEN (1978):
Kuzey Atlantik fırtınasında kayboldu (28 mürettebat). Rogue wave etkisi olduğu değerlendirildi. LASH tipi gemi.

5. EL FARO (2015):
Karayip'te Joaquin Kasırgası'nda battı (33 mürettebat). Kaptan fırtınadan kaçınma manevrasını geç uyguladı. Eski gemi, yetersiz hava bilgisi ve karar hatası.

ALINAN DERSLER:
- Hava uyarıları ciddiye alınmalı ve zamanında değerlendirilmelidir
- Weather routing kullanımı yaygınlaştırılmalıdır
- Gemi yapısal standartları meteorolojik koşullara uygun olmalıdır
- Kaptan eğitimi ağır hava gemiciliğini kapsamalıdır`,
    bulletPoints: [
      "Titanic: IIP ve SOLAS'ın doğmasına yol açtı",
      "Derbyshire: Hatch cover standartlarını değiştirdi",
      "El Faro: Geç manevra ve yetersiz bilginin sonuçları",
      "München: Rogue wave teorisini gündeme getirdi",
    ],
    keyPoints: [
      "Meteorolojik kazaların çoğu önlenebilir niteliktedir",
      "Uyarıların zamanında değerlendirilmesi hayat kurtarır",
      "Her büyük kaza uluslararası kural değişikliğine yol açmıştır",
    ],
    warnings: [
      "Hava uyarılarını görmezden gelmek hayati sonuçlar doğurur",
      "Ağır hava kararları gecikmeden verilmelidir",
    ],
  },
};

export default function MeteorologyTopicsPage() {
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
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50 dark:from-[hsl(210,50%,6%)] dark:via-[hsl(200,50%,8%)] dark:to-[hsl(220,50%,10%)]"
      data-no-translate
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-600 text-white shadow-lg">
                <Cloud className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Meteoroloji</h1>
                <p className="text-sm text-muted-foreground">12 Ana Konu • Kapsamlı Müfredat</p>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Accordion */}
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-4 max-w-4xl mx-auto pb-20">
            <Accordion type="single" collapsible className="space-y-2">
              {meteorologyTopics.map((topic) => {
                const TopicIcon = topic.icon;
                return (
                  <AccordionItem
                    key={topic.id}
                    value={topic.id}
                    className="border border-border/40 rounded-xl overflow-hidden bg-card/80 backdrop-blur"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left">
                        <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center text-white font-bold">
                          {topic.number}
                        </span>
                        <div className="flex items-center gap-2">
                          <TopicIcon className="h-4 w-4 text-sky-600 dark:text-sky-400" />
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
                                ? "hover:bg-sky-500/5 cursor-pointer"
                                : "opacity-50 cursor-not-allowed"
                            }`}
                            whileTap={subtopic.hasContent && topicContents[subtopic.id] ? { scale: 0.98 } : {}}
                          >
                            {subtopic.hasContent && topicContents[subtopic.id] ? (
                              <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0" />
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
                <Lightbulb className="h-5 w-5 text-sky-500" />
                <h2 className="text-lg font-semibold text-foreground">Hızlı Erişim</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { title: "Detaylı Meteoroloji", href: "/meteorology/topics" },
                  { title: "Hava Haritası Çizimi", href: "/navigation/meteorology" },
                  { title: "Hesaplamalar", href: "/calculations" },
                ].map((resource, index) => (
                  <Link
                    key={index}
                    to={resource.href}
                    className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-all hover:border-sky-500/40 hover:bg-background"
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
                <div className="bg-sky-500/10 rounded-xl p-4 border-l-4 border-sky-500">
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
                        <span className="w-2 h-2 rounded-full bg-sky-500 mt-2 flex-shrink-0" />
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
                    <div className="bg-background rounded-lg p-3 font-mono text-lg text-center text-sky-600 dark:text-sky-400 mb-2">
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
                  <div className="bg-sky-500/5 rounded-xl p-4">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-sky-500" />
                      Anahtar Bilgiler
                    </h3>
                    <div className="space-y-2">
                      {currentContent.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-sky-600 dark:text-sky-400 font-bold">{index + 1}.</span>
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
