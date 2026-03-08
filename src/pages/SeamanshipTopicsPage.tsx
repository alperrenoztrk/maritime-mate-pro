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
  Shield,
  Lightbulb,
  CheckCircle2,
  Circle,
  X,
  Compass,
  LifeBuoy,
  Ship,
  Wrench,
  Flag,
  Navigation,
  Eye,
  Waves,
  BookMarked,
  Settings,
  Users,
  MapPin,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SeamanshipSubTopic {
  id: string;
  title: string;
  hasContent: boolean;
}

interface SeamanshipMainTopic {
  id: string;
  number: number;
  title: string;
  icon: React.ElementType;
  subtopics: SeamanshipSubTopic[];
}

const seamanshipTopics: SeamanshipMainTopic[] = [
  {
    id: "seamanship-basics",
    number: 1,
    title: "Gemicilik Temelleri",
    icon: Anchor,
    subtopics: [
      { id: "seamanship-def", title: "Gemiciliğin tanımı ve kapsamı", hasContent: true },
      { id: "ship-parts", title: "Gemi kısımları ve terminolojisi", hasContent: true },
      { id: "ship-types-overview", title: "Gemi tipleri ve sınıflandırma", hasContent: true },
      { id: "ship-dimensions", title: "Gemi boyutları ve tonajları", hasContent: true },
      { id: "ship-certificates", title: "Gemi belgeleri ve sertifikaları", hasContent: true },
    ],
  },
  {
    id: "ropes-wires",
    number: 2,
    title: "Halatlar, Teller ve Düğümler",
    icon: Settings,
    subtopics: [
      { id: "rope-types", title: "Halat türleri ve malzemeleri", hasContent: true },
      { id: "wire-ropes", title: "Çelik teller ve yapıları", hasContent: true },
      { id: "rope-care", title: "Halat bakımı ve depolanması", hasContent: true },
      { id: "knots-bends", title: "Düğümler ve bağlamalar (knots & bends)", hasContent: true },
      { id: "hitches-splices", title: "Bağlar ve eklemeler (hitches & splices)", hasContent: true },
      { id: "swl-breaking", title: "SWL ve kopma yükü hesapları", hasContent: true },
    ],
  },
  {
    id: "anchoring",
    number: 3,
    title: "Demirleme ve Demir Donanımı",
    icon: Anchor,
    subtopics: [
      { id: "anchor-types", title: "Demir tipleri ve özellikleri", hasContent: true },
      { id: "anchor-chain", title: "Demir zinciri ve bağlantıları", hasContent: true },
      { id: "anchor-windlass", title: "Irgatlar ve demir donanımı", hasContent: true },
      { id: "anchoring-procedure", title: "Demirleme prosedürü", hasContent: true },
      { id: "anchor-watch", title: "Demir vardiyası ve tarama kontrolü", hasContent: true },
      { id: "anchor-dragging", title: "Demir taraması ve alınacak tedbirler", hasContent: true },
    ],
  },
  {
    id: "mooring",
    number: 4,
    title: "Palamar ve Bağlama",
    icon: MapPin,
    subtopics: [
      { id: "mooring-lines", title: "Palamar halatları ve adlandırmaları", hasContent: true },
      { id: "mooring-equipment", title: "Bağlama donanımı (babalar, makaralar)", hasContent: true },
      { id: "mooring-procedure", title: "Yanaşma ve bağlama prosedürü", hasContent: true },
      { id: "mooring-winches", title: "Irgatlar ve vinçler", hasContent: true },
      { id: "mooring-safety", title: "Bağlama operasyonlarında güvenlik", hasContent: true },
      { id: "single-buoy-mooring", title: "Tek şamandıra bağlaması (SBM/SPM)", hasContent: true },
    ],
  },
  {
    id: "steering",
    number: 5,
    title: "Dümen ve Manevra",
    icon: Navigation,
    subtopics: [
      { id: "rudder-types", title: "Dümen tipleri ve yapıları", hasContent: true },
      { id: "steering-gear", title: "Dümen makinesi sistemleri", hasContent: true },
      { id: "turning-circle", title: "Dönme dairesi ve manevra karakteristikleri", hasContent: true },
      { id: "stopping-distance", title: "Durma mesafesi ve Crash Stop", hasContent: true },
      { id: "squat-effect", title: "Squat etkisi ve sığ su etkileri", hasContent: true },
      { id: "bank-effect", title: "Kıyı etkisi (bank effect) ve kanal seyri", hasContent: true },
    ],
  },
  {
    id: "deck-machinery",
    number: 6,
    title: "Güverte Makineleri ve Donanım",
    icon: Wrench,
    subtopics: [
      { id: "deck-cranes", title: "Güverte vinçleri ve boom'lar", hasContent: true },
      { id: "derricks", title: "Bumba (derrick) sistemleri", hasContent: true },
      { id: "hatch-covers", title: "Ambar kapakları ve tipleri", hasContent: true },
      { id: "ventilation-systems", title: "Havalandırma sistemleri", hasContent: true },
      { id: "deck-maintenance", title: "Güverte bakımı ve boyama", hasContent: true },
    ],
  },
  {
    id: "boat-drills",
    number: 7,
    title: "Can Kurtarma ve Tahlisiye",
    icon: LifeBuoy,
    subtopics: [
      { id: "lifeboat-types", title: "Cankurtaran sandal tipleri ve donanımı", hasContent: true },
      { id: "liferaft-types", title: "Cankurtaran salı ve SOLAS gereksinimleri", hasContent: true },
      { id: "launching-procedure", title: "Sandal ve sal indirme prosedürü", hasContent: true },
      { id: "rescue-boat", title: "Kurtarma botu (rescue boat)", hasContent: true },
      { id: "life-saving-appliances", title: "Kişisel can kurtarma teçhizatı", hasContent: true },
      { id: "abandon-ship", title: "Gemiyi terk etme prosedürü", hasContent: true },
    ],
  },
  {
    id: "fire-fighting",
    number: 8,
    title: "Yangın Önleme ve Söndürme",
    icon: Shield,
    subtopics: [
      { id: "fire-triangle", title: "Yangın üçgeni ve yangın sınıfları", hasContent: true },
      { id: "fire-detection", title: "Yangın algılama ve alarm sistemleri", hasContent: true },
      { id: "portable-extinguishers", title: "Taşınabilir söndürücüler", hasContent: true },
      { id: "fixed-systems", title: "Sabit söndürme sistemleri (CO₂, foam, su)", hasContent: true },
      { id: "fire-fighting-procedure", title: "Yangınla mücadele prosedürü", hasContent: true },
      { id: "fire-drill", title: "Yangın tatbikatları ve SOLAS gereksinimleri", hasContent: true },
    ],
  },
  {
    id: "watchkeeping",
    number: 9,
    title: "Vardiya ve Köprüüstü Düzeni",
    icon: Eye,
    subtopics: [
      { id: "stcw-watchkeeping", title: "STCW vardiya standartları", hasContent: true },
      { id: "bridge-organization", title: "Köprüüstü organizasyonu (BRM)", hasContent: true },
      { id: "lookout-duty", title: "Gözcülük görevleri ve sorumlulukları", hasContent: true },
      { id: "watch-handover", title: "Vardiya devir teslimi", hasContent: true },
      { id: "night-vision", title: "Gece görüşü ve köprüüstü karartması", hasContent: true },
    ],
  },
  {
    id: "heavy-weather",
    number: 10,
    title: "Ağır Havada Gemicilik",
    icon: Waves,
    subtopics: [
      { id: "heavy-weather-prep", title: "Fırtına hazırlıkları (sea securing)", hasContent: true },
      { id: "parametric-rolling", title: "Parametrik salınım", hasContent: true },
      { id: "synchronous-rolling", title: "Senkron salınım ve broaching", hasContent: true },
      { id: "heavy-weather-nav", title: "Fırtınada seyir stratejileri", hasContent: true },
      { id: "pooping-bow-dive", title: "Kıç dalma (pooping) ve pruva dalma", hasContent: true },
      { id: "damage-assessment", title: "Fırtına hasarı değerlendirmesi", hasContent: true },
    ],
  },
  {
    id: "towing-salvage",
    number: 11,
    title: "Çekme (Towing) ve Kurtarma",
    icon: Ship,
    subtopics: [
      { id: "towing-principles", title: "Çekme prensipleri ve kuvvetleri", hasContent: true },
      { id: "towing-gear", title: "Çekme donanımı ve düzenlemesi", hasContent: true },
      { id: "emergency-towing", title: "Acil çekme prosedürü", hasContent: true },
      { id: "salvage-law", title: "Kurtarma hukuku temel ilkeleri", hasContent: true },
      { id: "grounding-response", title: "Karaya oturma ve kurtarma", hasContent: true },
    ],
  },
  {
    id: "seamanship-regulations",
    number: 12,
    title: "Gemicilik Kuralları ve Uygulamalar",
    icon: BookMarked,
    subtopics: [
      { id: "colreg-basic", title: "COLREG temel kuralları", hasContent: true },
      { id: "buoyage-iala", title: "IALA şamandıra sistemi", hasContent: true },
      { id: "flag-signals", title: "Uluslararası bayrak işaretleri", hasContent: true },
      { id: "sound-signals", title: "Ses işaretleri", hasContent: true },
      { id: "distress-signals", title: "Tehlike işaretleri", hasContent: true },
      { id: "ism-safety-culture", title: "ISM Code ve emniyet kültürü", hasContent: true },
    ],
  },
];

interface TopicContent {
  title: string;
  introduction: string;
  content: string;
  image?: string;
  table?: { title: string; headers: string[]; rows: string[][] };
  bulletPoints?: string[];
  examples?: { problem: string; solution: string }[];
  formula?: { name: string; expression: string; description: string };
  keyPoints?: string[];
  warnings?: string[];
}

const topicContents: Record<string, TopicContent> = {
  // =====================================================
  // BÖLÜM 1 - GEMİCİLİK TEMELLERİ
  // =====================================================
  "seamanship-def": {
    title: "Gemiciliğin Tanımı ve Kapsamı",
    introduction: "Gemicilik (seamanship), geminin güvenli ve etkin bir şekilde işletilmesi için gerekli pratik bilgi, beceri ve deneyimin bütünüdür.",
    content: `Gemicilik kavramı, denizcilik mesleğinin en temel disiplinini oluşturur. Terimin İngilizce karşılığı olan "seamanship" kelimesi, denizde yapılan her türlü pratik işi kapsayan geniş bir anlam taşır.

GEMİCİLİĞİN KAPSAMI:

Gemicilik, teorik bilginin ötesinde uygulamaya dayalı bir disiplindir. Aşağıdaki alanları kapsar:

1. Güverte işleri: Halat, tel, zincir kullanımı; düğüm atma; boya ve bakım işleri.
2. Demirleme ve bağlama: Demir atma, palamar alma, şamandıraya bağlama.
3. Yük operasyonları: Ambar açma/kapama, vinç kullanımı, yük sabitleme.
4. Emniyet: Cankurtarma araçlarının kullanımı, yangınla mücadele, gemiyi terk prosedürleri.
5. Manevra: Dümen kullanımı, dar su geçişleri, yanaşma-kalkma.
6. Bakım: Güverte ve tekne bakımı, pas temizliği, boyama.

TARİHSEL GELİŞİM:

Gemicilik, yelkenli gemiler döneminde tamamen el becerisine dayalı bir meslek olarak gelişmiştir. Buhar makinelerinin ve modern güverte donanımlarının ortaya çıkmasıyla birlikte gemicilik uygulamaları dönüşmüş, ancak temel prensipler değişmemiştir.

STCW SÖZLEŞMESİ VE GEMİCİLİK:

STCW (Standards of Training, Certification and Watchkeeping) sözleşmesi, her seviyedeki denizci için gemicilik yeterliliklerini tanımlar. Güverte zabitlerinin gemicilik konularındaki yeterliliği, eğitim ve sınav süreçleriyle belgelenir. STCW Code A-II/1 bölümü, vardiya zabiti için gereken gemicilik bilgi ve becerisini detaylı olarak listeler.`,
    bulletPoints: [
      "Gemicilik, pratik denizcilik becerilerinin tamamını kapsar",
      "STCW sözleşmesi gemicilik yeterliliklerini tanımlar",
      "Halat, demir, bağlama, emniyet ve bakım temel bileşenlerdir",
      "Modern donanıma rağmen temel gemicilik prensipleri değişmemiştir",
    ],
    keyPoints: [
      "Gemicilik = teori + uygulama + deneyim bütünüdür",
      "STCW Code A-II/1: vardiya zabiti gemicilik yeterliliği standardı",
      "Pratik beceri, sertifikasyon için zorunlu uygulamalı eğitimle kazanılır",
    ],
  },
  "ship-parts": {
    title: "Gemi Kısımları ve Terminolojisi",
    introduction: "Geminin yapısal elemanlarının ve bölümlerinin doğru terminoloji ile bilinmesi, güverte operasyonlarının etkin yürütülmesi için temel gereksinimdir.",
    image: "/diagrams/seamanship/gemi-kisimlari.svg",
    content: `GEMİ ANA BÖLÜMLER:

PRUVA (BOW): Geminin ön kısmıdır. Pruva formu, dalga kırma performansını belirler. Başlıca pruva tipleri: Düz pruva (vertical stem), ampul pruva (bulbous bow), clipper pruva, raker pruva. Ampul pruva, dalga direncini %5-15 oranında azaltarak yakıt tasarrufu sağlar.

KIÇA (STERN): Geminin arka kısmıdır. Dümen ve pervane bu bölgede bulunur. Kıç formları: Transom kıç (düz), cruiser kıç (yuvarlak), elliptical kıç.

İSKELE (PORT): Geminin sol tarafıdır. Gece kırmızı seyir feneri bu tarafta yanar.
SANCAk (STARBOARD): Geminin sağ tarafıdır. Gece yeşil seyir feneri bu tarafta yanar.

YAPISAL ELEMANLAR:

Omurga (Keel): Geminin ana yapısal elemanıdır. Teknenin uzunlamasına alt merkezinde uzanır.
Postalar (Frames): Omurgadan yukarı doğru yükselen enine yapısal elemanlardır.
Kaburga (Ribs): Postaların dış kaplamayla birleşen kısmıdır.
Güverte (Deck): Yatay platformlardır. Ana güverte (main deck), üst güverte (upper deck), alt güverte (lower deck/tween deck).
Ambar (Cargo Hold): Yükün taşındığı kapalı bölümdür.
Borda (Hull plating): Teknenin dış kaplamasıdır.
Koferdamlar (Cofferdams): İki bölme arasındaki boş alanlar olup, sızıntı kontrolü ve güvenlik amacıyla kullanılır.

ÜST YAPI:

Köprüüstü (Bridge/Wheelhouse): Geminin kumanda merkezi.
Kasara (Forecastle/Fo'c'sle): Pruva üst yapısı; demir donanımı burada bulunur.
Güverte ambarı üst yapısı (Poop): Kıç güvertesi üzerindeki yapı.`,
    bulletPoints: [
      "İskele (Port) = sol taraf → kırmızı fener",
      "Sancak (Starboard) = sağ taraf → yeşil fener",
      "Ampul pruva dalga direncini %5-15 azaltır",
      "Omurga, geminin ana yapısal elemanıdır",
    ],
    keyPoints: [
      "Pruva, kıç, iskele, sancak yön terminolojisinin bilinmesi zorunludur",
      "Yapısal elemanlar: omurga, postalar, güverte, borda",
      "Üst yapı elemanları: köprüüstü, kasara (fo'c'sle), poop",
    ],
  },
  "ship-types-overview": {
    title: "Gemi Tipleri ve Sınıflandırma",
    introduction: "Gemiler, taşıdıkları yüke, kullanım amacına ve yapısal özelliklerine göre sınıflandırılır.",
    content: `GEMİ TİPLERİ:

1. KURU YÜK GEMİLERİ:
Genel kargo gemileri (General Cargo): Çeşitli ambalajlı yükleri taşır. Kendi vinçlerine sahiptir (geared).
Dökme yük gemileri (Bulk Carrier): Tahıl, kömür, cevher gibi dökme yükleri taşır.
Konteyner gemileri (Container Ship): Standart konteynerlerle yük taşır. TEU (Twenty-foot Equivalent Unit) kapasitesiyle ölçülür.

2. TANKERLER:
Ham petrol tankerleri (Crude Oil Tanker): VLCC (Very Large Crude Carrier, 200.000+ DWT) ve ULCC (Ultra Large, 300.000+ DWT).
Ürün tankerleri (Product Tanker): Rafine petrol ürünlerini taşır.
Kimyasal tankerler (Chemical Tanker): Kimyasal maddeleri özel tanklarda taşır. IBC Code'a tabidir.
LNG/LPG tankerleri: Sıvılaştırılmış gaz taşır. IGC Code'a tabidir.

3. ÖZEL TİP GEMİLER:
Ro-Ro gemileri: Tekerlekli yüklerin rampadan yüklenmesi.
Yolcu gemileri: SOLAS Bölüm II-2 yangın güvenlik standartlarına tabidir.
Açık deniz destek gemileri (Offshore Supply Vessels).
Yüzer üretim ve depolama üniteleri (FPSO).

SINIFLANDIRMA KURULUŞLARI:

Lloyd's Register, DNV, Bureau Veritas, American Bureau of Shipping (ABS), ClassNK gibi kuruluşlar gemilerin yapısal standartlara uygunluğunu denetler. Bu kuruluşlar IACS (International Association of Classification Societies) çatısı altında faaliyet gösterir.

TONAJ KAVRAMLARI:
Gross Tonnage (GT): Geminin tüm kapalı hacminin ölçüsüdür; boyutsuz bir sayıdır.
Net Tonnage (NT): Yük taşımaya ayrılan hacmin ölçüsüdür.
Deadweight Tonnage (DWT): Geminin taşıyabileceği toplam ağırlıktır (yük + yakıt + su + kumanya + mürettebat).
Displacement: Geminin yerinden ettiği suyun ağırlığıdır.`,
    bulletPoints: [
      "Dökme yük, konteyner, tanker, Ro-Ro başlıca gemi tipleridir",
      "VLCC: 200.000+ DWT, ULCC: 300.000+ DWT kapasitelidir",
      "Sınıflandırma kuruluşları IACS çatısında çalışır",
      "GT hacim ölçüsüdür, DWT ağırlık ölçüsüdür",
    ],
    keyPoints: [
      "GT ≠ ağırlık; hacimsel bir kavramdır",
      "DWT = yük + yakıt + su + kumanya + mürettebat toplam taşıma kapasitesi",
      "Displacement = geminin yerinden ettiği su ağırlığı",
    ],
  },
  "ship-dimensions": {
    title: "Gemi Boyutları ve Tonajları",
    introduction: "Gemi boyutları, yapısal tasarımdan liman giriş kısıtlamalarına kadar birçok operasyonel kararı doğrudan etkiler.",
    content: `TEMEL BOYUTLAR:

LOA (Length Overall): Geminin pruva ucundan kıç ucuna kadar olan toplam uzunluğudur. Liman ve kılavuzluk operasyonlarında bu değer kullanılır.

LBP (Length Between Perpendiculars): Pruva dikme hattı ile kıç dikme hattı arasındaki mesafedir. Yapısal hesaplamalarda ve hidrostatik verilerde bu değer referans alınır.

Genişlik (Beam/Breadth): Geminin en geniş noktasındaki ölçüdür. Moulded beam (kalıp genişliği) yapısal hesaplarda, extreme beam dış ölçüde kullanılır.

Derinlik (Depth): Omurganın üst yüzeyinden ana güvertenin alt yüzeyine kadar olan dikey mesafedir.

Draft (Draught): Su hattından omurganın alt yüzeyine (keel) kadar olan dikey mesafedir. Yükleme durumuna göre değişir.

Freeboard: Ana güverte kenarından su hattına kadar olan dikey mesafedir. Uluslararası Yükleme Sınırı Sözleşmesi (Load Line Convention) tarafından minimum değerleri belirlenir.

TONAJ HESAPLARI:

GT = K₁ × V formülüyle hesaplanır. V, geminin toplam kapalı hacmi (m³); K₁ = 0,2 + 0,02 × log₁₀V katsayısıdır.

NT, yük hacminden türetilir ve liman harçları, kılavuzluk ücretleri gibi mali hesaplarda kullanılır.`,
    formula: {
      name: "Gross Tonnage Hesabı",
      expression: "GT = K₁ × V     (K₁ = 0,2 + 0,02 × log₁₀V)",
      description: "V: toplam kapalı hacim (m³), K₁: tonaj katsayısı. GT boyutsuz bir sayıdır.",
    },
    examples: [
      {
        problem: "Toplam kapalı hacmi 50.000 m³ olan bir geminin GT değerini hesaplayınız.",
        solution: "K₁ = 0,2 + 0,02 × log₁₀(50.000) = 0,2 + 0,02 × 4,699 = 0,2 + 0,094 = 0,294. GT = 0,294 × 50.000 = 14.700. Geminin Gross Tonnage değeri 14.700'dür.",
      },
    ],
    bulletPoints: [
      "LOA: toplam uzunluk, LBP: dikme hatları arası uzunluk",
      "Draft yükleme durumuyla değişir; freeboard minimum sınırı yasayla belirlenir",
      "GT hacim ölçüsüdür ve boyutsuzdur",
    ],
    keyPoints: [
      "LOA liman operasyonlarında, LBP yapısal hesaplarda kullanılır",
      "Freeboard = güverte kenarı - su hattı mesafesi",
      "Load Line Convention (1966) minimum freeboard'u belirler",
    ],
  },
  "ship-certificates": {
    title: "Gemi Belgeleri ve Sertifikaları",
    introduction: "Her ticaret gemisi, uluslararası sözleşmeler gereği belirli sertifikalara sahip olmak zorundadır; bu belgeler liman devleti denetimlerinde kontrol edilir.",
    content: `ZORUNLU SERTIFIKALAR:

1. Uluslararası Tonaj Sertifikası (International Tonnage Certificate - ITC 69): 1969 Tonaj Ölçme Sözleşmesi gereği düzenlenir. GT ve NT değerlerini belirtir.

2. Uluslararası Yükleme Sınırı Sertifikası (International Load Line Certificate - ILLC): 1966 Yükleme Sınırı Sözleşmesi gereği düzenlenir. Geminin izin verilen minimum freeboard değerlerini belirtir.

3. Emniyet Yapı Sertifikası (Safety Construction Certificate - SCC): SOLAS gereği gemi yapısının standartlara uygunluğunu belgelendirir.

4. Emniyet Donanım Sertifikası (Safety Equipment Certificate - SEC): Cankurtarma ve yangın söndürme donanımının uygunluğunu belirtir.

5. Emniyet Telsiz Sertifikası (Safety Radio Certificate - SRC): GMDSS donanımının yeterliliğini onaylar.

6. IOPP Sertifikası (International Oil Pollution Prevention Certificate): MARPOL Ek I gereği düzenlenir.

7. ISPP Sertifikası (International Sewage Pollution Prevention Certificate): MARPOL Ek IV gereği düzenlenir.

8. ISM Sertifikası: Document of Compliance (DOC) şirkete, Safety Management Certificate (SMC) gemiye verilir.

9. ISSC (International Ship Security Certificate): ISPS Code gereği düzenlenir.

10. CLC Sertifikası (Civil Liability Certificate): Petrol kirliliği mali sorumluluk sertifikasıdır.

PSC DENETİMLERİNDE BELGE KONTROLÜ:

Liman Devleti Kontrolü (Port State Control) denetçileri, öncelikle bu sertifikaların geçerliliğini kontrol eder. Süresi dolmuş veya eksik sertifika, geminin alıkonulması (detention) sebebi olabilir.`,
    bulletPoints: [
      "ITC 69: tonaj, ILLC: freeboard, SCC: yapısal güvenlik sertifikası",
      "DOC şirkete, SMC gemiye verilir (ISM Code)",
      "ISPS Code gereği ISSC sertifikası zorunludur",
      "Sertifika eksikliği geminin alıkonulmasına (detention) yol açar",
    ],
    keyPoints: [
      "Tüm sertifikalar bayrak devleti veya yetkilendirilmiş klas kuruluşu tarafından düzenlenir",
      "PSC denetimlerinde öncelikle sertifika geçerliliği kontrol edilir",
      "ISM: DOC (şirket) + SMC (gemi) ikili yapıdadır",
    ],
  },

  // =====================================================
  // BÖLÜM 2 - HALATLAR, TELLER VE DÜĞÜMLER
  // =====================================================
  "rope-types": {
    title: "Halat Türleri ve Malzemeleri",
    introduction: "Gemilerde kullanılan halatlar, malzemelerine ve yapılarına göre sınıflandırılır; her tür farklı mekanik özelliklere ve kullanım alanlarına sahiptir.",
    image: "/diagrams/seamanship/halat-yapilari.svg",
    table: {
      title: "Halat Malzeme Karşılaştırma Tablosu",
      headers: ["Malzeme", "Özgül Ağırlık", "Uzama (%)", "Islak Dayanım", "Kullanım Alanı"],
      rows: [
        ["Manila", "1,38", "10-12", "%10-15 düşer", "Pilot merdiveni"],
        ["Naylon (PA)", "1,14", "30-40", "%10 düşer", "Çekme halatı"],
        ["Polipropilen", "0,91 (yüzer)", "15-20", "Değişmez", "Can kurtarma halatı"],
        ["Polyester", "1,38", "12-15", "Değişmez", "Palamar halatı"],
        ["HMPE (Dyneema)", "0,97", "3-4", "Değişmez", "Palamar, çekme"],
        ["Çelik Tel", "7,85", "1-2", "Korozyon riski", "Vinç, kaldırma"],
      ],
    },
    content: `DOĞAL LİF HALATLAR:

Manila: Abaka bitkisinden üretilir. Doğal halatlar arasında en güçlüsüdür. Islakken dayanımı %10-15 düşer. Günümüzde hâlâ pilot merdiveni güvenlik halatı olarak kullanılır.

Sisal: Manila'dan daha ucuz ancak daha düşük dayanımlıdır. Islakken sertleşir ve dayanımı %20 düşer.

SENTETİK LİF HALATLAR:

Naylon (Polyamid): Yüksek elastikiyet (%30-40 uzama). Şok yüklerine dayanıklıdır. Islakken dayanımı %10 düşer. Çekme halatı olarak tercih edilir.

Polipropilen (PP): Suda yüzer (özgül ağırlık 0,91). Hafiftir ancak UV ışınlarına duyarlıdır. Can kurtarma halatı olarak kullanılır.

Polyester (Terilen/Dacron): Düşük elastikiyet (%12-15 uzama). Islakken dayanımı değişmez. Palamar halatı olarak yaygındır.

HMPE (Dyneema/Spectra): Çelikle eşdeğer dayanım, çeliğin 1/7'si ağırlıkta. Uzama %3-4. Modern palamar ve çekme halatlarında kullanılır. Isıya duyarlıdır (bollard'larda sürtünme ısısına dikkat).

HALAT YAPILARI:

Kolalı (Laid rope): Üç veya dört kolun birbiri üzerine sarılmasıyla oluşur. Z-büküm (sağ el büküm) standarttır.
Örgülü (Braided rope): İç çekirdek etrafında örgü şeklinde üretilir. Dönme eğilimi yoktur.
Çift örgülü (Double braided): İç ve dış örgüden oluşur. Yüksek dayanım ve esneklik sağlar.`,
    bulletPoints: [
      "Manila: doğal halatlar arasında en güçlü, ıslakken %10-15 dayanım kaybı",
      "Naylon: %30-40 uzama, şok yüklere dayanıklı, çekme halatı",
      "Polipropilen: suda yüzer, can kurtarma halatı",
      "HMPE (Dyneema): çelik eşdeğeri dayanım, 1/7 ağırlık",
    ],
    keyPoints: [
      "Islak naylon halatın dayanımı %10 düşer",
      "PP suda yüzer → can kurtarma halatı olarak idealdir",
      "HMPE isıya duyarlıdır; bollard sürtünmesine dikkat edilmelidir",
    ],
    warnings: [
      "Sentetik halatlar koptuğunda geri tepme (snapback) riski yüksektir",
      "HMPE halat keskin köşelerde hasar görebilir; chafe guard kullanılmalıdır",
    ],
  },
  "wire-ropes": {
    title: "Çelik Teller ve Yapıları",
    introduction: "Çelik teller, yüksek çekme dayanımı gerektiren güverte operasyonlarında kullanılır; tel yapısı, kullanım amacına göre seçilir.",
    table: {
      title: "Çelik Tel Tipleri Karşılaştırması",
      headers: ["Tip", "Telcik Sayısı", "Esneklik", "Aşınma Direnci", "Kullanım Alanı"],
      rows: [
        ["6×7", "42 (az, kalın)", "Düşük", "Yüksek", "Korkuluk, sabit bağlantı"],
        ["6×19", "114 (orta)", "Orta", "Orta", "Genel güverte işleri"],
        ["6×37", "222 (çok, ince)", "Yüksek", "Düşük", "Vinç, kaldırma"],
        ["6×19 FC", "114 + lif çekirdek", "Yüksek", "Orta", "Kaldırma operasyonları"],
        ["6×19 IWRC", "114 + tel çekirdek", "Orta", "Yüksek", "Ağır yük, ezilme riski"],
      ],
    },
    content: `ÇELİK TEL YAPISI:

Çelik tel, ince çelik telciklerin (wire) bir çekirdek (core) etrafında kollar (strands) halinde sarılmasıyla üretilir. Standart gösterim: A × B şeklindedir. Örneğin 6 × 19, 6 kol ve her kolda 19 telcik anlamına gelir.

YAYGIN TEL TİPLERİ:

6 × 7: Az sayıda kalın telcik. Yüksek aşınma direnci, düşük esneklik. Korkuluk, sabit bağlantılar.
6 × 19: Orta esneklik ve dayanım dengesi. Genel amaçlı güverte işleri.
6 × 37: Çok sayıda ince telcik. Yüksek esneklik ancak düşük aşınma direnci. Vinç ve kaldırma operasyonları.

ÇEKİRDEK TİPLERİ:
Fiber Core (FC): Lif çekirdek. Daha esnek, yağ deposu görevi görür. Kaldırma operasyonlarında tercih edilir.
Independent Wire Rope Core (IWRC): Bağımsız çelik tel çekirdek. Daha yüksek kırılma yükü (%7-10 fazla). Ezilme direnci daha yüksektir.

TEL BAKIM VE MUAYENE:

Telin ömrünü uzatmak için düzenli yağlama yapılmalıdır. Muayenede kontrol edilen parametreler:
- Kırık telcik sayısı (bir adım boyunda %10'u geçmemeli)
- Aşınma (çap kaybı orijinalin %5'ini geçmemeli)
- Korozyon
- Kink (bükülme hasarı) – kink olan tel kullanılmamalıdır
- Çekirdek çıkması (birdcaging)`,
    formula: {
      name: "Çelik Tel Kırılma Yükü (Yaklaşık)",
      expression: "BL ≈ d² × K (ton)",
      description: "d: tel çapı (cm), K: katsayı (6×19 FC için K ≈ 46, 6×37 IWRC için K ≈ 50)",
    },
    examples: [
      {
        problem: "Çapı 24 mm (2,4 cm) olan 6×19 FC çelik telin yaklaşık kırılma yükünü hesaplayınız.",
        solution: "BL ≈ d² × K = 2,4² × 46 = 5,76 × 46 = 264,96 ton. Telin yaklaşık kırılma yükü 265 tondur. Güvenli çalışma yükü (SWL) için güvenlik faktörüne (genellikle 5) bölünür: SWL = 265/5 = 53 ton.",
      },
    ],
    bulletPoints: [
      "6×19: genel amaçlı, 6×37: esnek (vinç/kaldırma)",
      "IWRC çekirdek, FC'ye göre %7-10 daha yüksek kırılma yükü sağlar",
      "Kink olan tel kesinlikle kullanılmamalıdır",
      "Bir adımdaki kırık telcik oranı %10'u geçmemeli",
    ],
    warnings: [
      "Kink hasarı olan çelik tel tamir edilemez; hizmet dışı bırakılmalıdır",
      "SWL = BL / güvenlik faktörü (genellikle 5 veya 6)",
    ],
  },
  "rope-care": {
    title: "Halat Bakımı ve Depolanması",
    introduction: "Halatların ömrü ve güvenli kullanımı, doğru bakım ve depolama uygulamalarına bağlıdır.",
    content: `HALAT BAKIMI İLKELERİ:

Tüm halatlar düzenli olarak muayene edilmeli ve hasar belirtileri kontrol edilmelidir. Aşınma, kesik, UV hasarı, kimyasal hasar ve iç lif bozulması başlıca kontrol edilecek hususlardır.

SENTETİK HALAT BAKIMI:
- Kullanımdan sonra tatlı suyla yıkanmalı (tuz kristalleri lifleri aşındırır)
- Doğrudan güneş ışığından korunarak depolanmalı (UV bozulması)
- Keskin köşelerden korunmalı (chafe guard/fairlead kullanımı)
- Kink yapılmamalı; kink sentetik halatlarda dayanımı %30'a kadar düşürür

ÇELİK TEL BAKIMI:
- Düzenli yağlama (penetrant yağ + koruyucu yağ)
- Tambur ve makaralardan düzgün sarılma
- Korozyon kontrolü
- Kırık telcik sayımı

DEPOLAMA:
Halatlar kuru, havalandırmalı, doğrudan güneş ışığı almayan alanlarda depolanmalıdır. Halat tamburuna sarılı veya flemish coil şeklinde tutulabilir. Halatlar kimyasal maddelerden uzak tutulmalı; özellikle asit ve alkali ile temas önlenmelidir.

MUAYENE KAYITLARI:
ISM Code gereği, halat ve tellerin periyodik muayeneleri kaydedilmeli ve bakım planlaması (PMS) kapsamında takip edilmelidir.`,
    bulletPoints: [
      "Sentetik halatlar tatlı suyla yıkanmalı ve UV'den korunmalı",
      "Kink, sentetik halat dayanımını %30'a kadar düşürür",
      "Çelik teller düzenli olarak yağlanmalıdır",
      "Muayene kayıtları ISM Code gereği tutulmalıdır",
    ],
    keyPoints: [
      "Halat bakımının üç temel unsuru: temizlik, muayene, doğru depolama",
      "PMS kapsamında periyodik muayene ve değişim programı uygulanır",
    ],
  },
  "knots-bends": {
    title: "Düğümler ve Bağlamalar (Knots & Bends)",
    introduction: "Denizcilik düğümleri, halatların belirli amaçlarla birleştirilmesi veya sabitlenmesi için kullanılan standart bağlama tekniklerdir.",
    content: `TEMEL DÜĞÜMLER (KNOTS):

Yassı Düğüm (Reef Knot / Square Knot): Aynı çaptaki iki halat ucunu birleştirmek için kullanılır. Yelken toplarken yaygın olarak uygulanır. Farklı çaptaki halatlarda güvenilir değildir; kayabilir.

Kazık Bağı (Bowline): Halatın ucunda kaymayan bir ilmek oluşturur. Denizcilik düğümlerinin en önemlisidir. Yük altında sıkışmaz ve kolayca çözülebilir. Cankurtarma operasyonlarında, palamar geçirmede ve genel amaçlı kullanılır.

Sekizli Düğüm (Figure-of-Eight Knot): Halatın bloktan veya makaradan kaymasını önlemek için ucuna atılır. Basit ve etkili bir durdurucu düğümdür.

BAĞLAMALAR (BENDS):

Çift Kazık Bağı (Double Bowline): Oturak halinde kullanılır (bosen's chair). İki ilmek oluşturur.

Kıstırma Düğümü (Sheet Bend): Farklı çaptaki iki halatı birleştirmek için kullanılır. Çift kıstırma düğümü (double sheet bend) daha güvenlidir.

Kamçı Bağı (Carrick Bend): Kalın halat ve çekme halatlarını birleştirmek için kullanılır. Yük altında sıkışmaz.

DÜĞÜM PRENSIPLERI:
Her düğüm, halatın kırılma yükünü düşürür. Ortalama dayanım kaybı değerleri:
- Bowline: %40 dayanım kaybı
- Reef knot: %55 dayanım kaybı
- Sheet bend: %45 dayanım kaybı
- Figure-of-eight: %25 dayanım kaybı`,
    bulletPoints: [
      "Bowline: kaymayan ilmek, en önemli denizcilik düğümü",
      "Reef knot: yalnızca aynı çaptaki halatlar için güvenlidir",
      "Sheet bend: farklı çaptaki halatları birleştirir",
      "Her düğüm halat dayanımını düşürür (%25-55 arası)",
    ],
    keyPoints: [
      "Bowline yük altında sıkışmaz ve kolayca çözülür",
      "Figure-of-eight en az dayanım kaybına neden olur (%25)",
      "Reef knot farklı çaplarda kayabilir; güvenilir değildir",
    ],
  },
  "hitches-splices": {
    title: "Bağlar ve Eklemeler (Hitches & Splices)",
    introduction: "Bağlar (hitches) halatı bir nesneye sabitlemek, eklemeler (splices) ise iki halat ucunu kalıcı olarak birleştirmek için kullanılan tekniklerdir.",
    content: `BAĞLAR (HITCHES):

Volta (Clove Hitch): Halatı bir babaya veya baraya geçici olarak bağlamak için kullanılır. Tek başına güvenilir değildir; uçlar serbest bırakılırsa çözülebilir. Genellikle ek güvenlik dönüşleriyle desteklenir.

Kazık Baba Bağı (Bollard Hitch): Palamar halatını babaya bağlama yöntemidir. Standart uygulama: halat gözü (eye) baba üzerine geçirilir, ardından halatla şekil-sekiz (figure-8) sarımlar yapılır. Son sarım kilitlenir.

Kancalı Bağ (Blackwall Hitch): Halatı bir kancaya geçici bağlamak için kullanılır. Yalnızca yük altındayken tutar.

Balıkçı Bağı (Rolling Hitch): Bir halat üzerine veya çubuğa, çekme yönüne dik olmayan bağlama yapmak için kullanılır.

EKLEMELER (SPLICES):

Göz Ekleme (Eye Splice): Halatın ucunda kalıcı bir ilmek oluşturur. Düğüme kıyasla dayanım kaybı çok düşüktür (%5-10). Palamar halatlarının standart uç işlemesidir.

Kısa Ekleme (Short Splice): İki halat ucunu kalıcı olarak birleştirir. Çap artar; makara ve bloktan geçemez.

Uzun Ekleme (Long Splice): İki halat ucunu çap artırmadan birleştirir. Makara ve bloktan geçebilir ancak dayanım kaybı short splice'dan fazladır.

DAYANIM KARŞILAŞTIRMASI:
Eye splice: %90-95 orijinal dayanım korunur.
Short splice: %85-90 orijinal dayanım korunur.
Bowline düğümü: %60 orijinal dayanım korunur.

Bu nedenle kalıcı ilmek gerektiğinde düğüm yerine daima splice tercih edilmelidir.`,
    bulletPoints: [
      "Eye splice: %90-95 dayanım korur, düğümden çok üstündür",
      "Clove hitch tek başına güvenilir değildir; ek kilitle desteklenmeli",
      "Short splice çapı artırır; makara ve bloktan geçemez",
      "Long splice çap artırmaz ancak daha zayıftır",
    ],
    keyPoints: [
      "Kalıcı ilmek = eye splice, geçici ilmek = bowline",
      "Splice dayanımı > düğüm dayanımı (her zaman)",
      "Bollard hitch'te son sarım mutlaka kilitlenmelidir",
    ],
  },
  "swl-breaking": {
    title: "SWL ve Kopma Yükü Hesapları",
    introduction: "Güvenli Çalışma Yükü (SWL), bir donanım veya halatın güvenle taşıyabileceği maksimum yüktür ve kırılma yükünden güvenlik faktörüne bölünerek hesaplanır.",
    content: `TEMEL KAVRAMLAR:

Breaking Load (BL) / Minimum Breaking Load (MBL): Malzemenin kopma anındaki yüktür. Üretici tarafından belirtilir.

Safe Working Load (SWL) / Working Load Limit (WLL): Malzemenin güvenle kullanılabileceği maksimum yüktür. SWL = BL / FoS formülüyle hesaplanır.

Factor of Safety (FoS): Güvenlik faktörüdür. Uygulama alanına göre değişir.

STANDART GÜVENLİK FAKTÖRLERİ:

Çelik teller (kaldırma): FoS = 5
Çelik teller (genel güverte işi): FoS = 4-5
Sentetik halatlar: FoS = 5-6
Zincirler (kaldırma): FoS = 4-5
Şaklalar ve kaldırma aksesuarları: FoS = 4-6
Demir zinciri: FoS = 3-4

PROOF LOAD:
Proof Load (PL), üretim sonrası uygulanan test yüküdür. Genellikle SWL'nin 2 katıdır (PL = 2 × SWL). Proof load testi geçen malzeme kalıcı deformasyon göstermemelidir.`,
    formula: {
      name: "Güvenli Çalışma Yükü",
      expression: "SWL = BL / FoS",
      description: "BL: kırılma yükü, FoS: güvenlik faktörü. SWL hiçbir zaman aşılmamalıdır.",
    },
    examples: [
      {
        problem: "Kırılma yükü 120 ton olan bir çelik telin kaldırma operasyonundaki SWL değerini hesaplayınız (FoS = 5).",
        solution: "SWL = BL / FoS = 120 / 5 = 24 ton. Bu çelik telle en fazla 24 ton yük kaldırılabilir.",
      },
      {
        problem: "SWL'si 15 ton olan bir şaklanın proof load değerini hesaplayınız.",
        solution: "PL = 2 × SWL = 2 × 15 = 30 ton. Şakla üretim sonrası 30 ton ile test edilmiş olmalıdır.",
      },
    ],
    bulletPoints: [
      "SWL = BL / güvenlik faktörü",
      "Kaldırma operasyonlarında FoS = 5 standarttır",
      "Proof load = 2 × SWL (üretim test yükü)",
      "SWL aşıldığında ekipman hizmet dışı bırakılmalıdır",
    ],
    warnings: [
      "SWL değeri hiçbir koşulda aşılmamalıdır",
      "Hasarlı veya aşınmış ekipmanın SWL değeri düşer; muayene zorunludur",
    ],
  },

  // =====================================================
  // BÖLÜM 3 - DEMİRLEME VE DEMİR DONANIMI
  // =====================================================
  "anchor-types": {
    title: "Demir Tipleri ve Özellikleri",
    introduction: "Gemilerde kullanılan demirler, yapılarına ve tutma kuvvetlerine göre farklı tiplerde üretilir; seçim deniz tabanı yapısına ve gemi tonajına göre yapılır.",
    content: `BAŞLICA DEMİR TİPLERİ:

STOCKLESS ANCHOR (Patentli Demir / Hall Demiri): Ticaret gemilerinde en yaygın kullanılan tiptir. Kolları (flukes) ankasa (crown) etrafında dönebilir. Hawse pipe içinde depolanabilir. Kendi ağırlığının 3-5 katı tutma kuvveti üretir.

DANFORTH DEMİRİ: Geniş ve düz kolları sayesinde yumuşak zeminde (çamur, kum) çok iyi tutma sağlar. Kendi ağırlığının 10-20 katı tutma kuvveti üretir. Küçük teknelerde yaygındır; büyük gemilerde yedek olarak kullanılır.

MUSHROOM DEMİRİ: Mantar şekilli; yumuşak çamurda gömülerek çok yüksek tutma kuvveti sağlar. Fener gemileri ve dalgıç şamandıralarında kalıcı demirleme için kullanılır.

BRUCE DEMİRİ: Kolsuz, tek parça döküm tasarım. Her tür zeminde iyi tutma sağlar. Açık deniz platformlarında yaygındır.

DEMİR AĞIRLIĞI:

Sınıflandırma kuruluşları, geminin equipment number'ına (EN) göre minimum demir ağırlığını belirler. Equipment number, geminin boyutları ve rüzgâra maruz kalan alanından hesaplanır.

EN = Δ^(2/3) + 2hB + A/10 (yaklaşık formül)

Bir ticaret gemisi genellikle iki bower demiri (pruva) ve bir spare (yedek) demir taşır.`,
    bulletPoints: [
      "Stockless: en yaygın ticaret gemisi demiri, tutma = 3-5 × ağırlık",
      "Danforth: yumuşak zeminde çok iyi, tutma = 10-20 × ağırlık",
      "İki bower ve bir yedek demir standart donanımdır",
      "Equipment number'a göre minimum demir ağırlığı belirlenir",
    ],
    keyPoints: [
      "Demir tipi seçimi deniz tabanı yapısına göre yapılır",
      "Stockless demir hawse pipe'ta depolanabilir (pratik avantaj)",
      "Danforth kayalık zeminde etkisizdir",
    ],
  },
  "anchor-chain": {
    title: "Demir Zinciri ve Bağlantıları",
    introduction: "Demir zinciri, demiri gemiye bağlayan ve demirleme sırasında tutma kuvvetini artıran ağır çelik zincirdir.",
    content: `ZİNCİR YAPISI:

Demir zinciri, baklalardan (links) oluşur. Her bakla ortasında bir takviye çubuğu (stud) bulunur; bu çubuk baklanın ezilmesini ve birbirine dolaşmasını önler. Stud-link chain, ticaret gemilerinde standarttır.

ZİNCİR ÖLÇÜLERİ:
Zincir kalınlığı, baklanın çapıyla (diameter of common link) ifade edilir. Bir zincir boyu (shackle) = 27,5 m (90 feet). Bağlantı şaklası (joining shackle/Kenter shackle) ile zincir boyları birbirine bağlanır.

ZİNCİR İŞARETLEME (MARKING):

Her zincir boyu (shackle) renkli boya ve tel sarımlarla işaretlenir:
1. shackle: 1 beyaz boya + 1 tel sarım
2. shackle: 2 beyaz boya + 2 tel sarım
3. shackle: 3 beyaz boya + 3 tel sarım
Son iki shackle: kırmızı boyalı baklalar
Son shackle: tamamen kırmızı

ZİNCİR LOCKER (ZİNCİR AMBARI):
Zincir, pruva altındaki zincir ambarında (chain locker) depolanır. Zincirin uç baklası bir bitter end shackle ile gemiye bağlanır. Acil durumda zincirin serbest bırakılması için bu bağlantı sökülebilir olmalıdır.`,
    bulletPoints: [
      "Stud-link chain ticaret gemilerinde standarttır",
      "1 shackle = 27,5 m (90 feet) zincir",
      "İşaretleme: beyaz boya ve tel sarım sistemi",
      "Bitter end acil durumda sökülüp zincir serbest bırakılabilir",
    ],
    keyPoints: [
      "Zincir kalınlığı bakla çapıyla (mm) ifade edilir",
      "Son iki shackle kırmızı boyalıdır (sığ demir uyarısı)",
      "Kenter shackle birleşim noktalarında kullanılır",
    ],
  },
  "anchor-windlass": {
    title: "Irgatlar ve Demir Donanımı",
    introduction: "Demir ırgatı (anchor windlass), demir zincirini saran ve serbest bırakan mekanik sistemdir.",
    content: `IRGAT TİPLERİ:

Yatay Irgatlar (Horizontal Windlass): Tambur ekseni yatay konumdadır. Güvertede daha fazla alan kaplar ancak bakımı kolaydır.

Dikey Irgatlar (Vertical Windlass / Capstan): Tambur ekseni dikeydir. Güvertede daha az alan kaplar. Zincir yönlendirmesi daha doğaldır.

IRGAT BİLEŞENLERİ:

Cable lifter (Wildcat/Gypsy): Zincir baklalarını kavrayarak saran çark.
Warping drum: Halat sarmak için kullanılan silindirik tambur.
Band brake: Zinciri frenleyen bant fren.
Clutch: Wildcat'i şafta bağlayan veya ayıran kavrama.
Hawse pipe: Zincirin güverteden borda dışına çıktığı boru.
Spurling pipe: Zincirin güverteden zincir ambarına indiği boru.
Chain stopper (Devil's claw): Zinciri sabit tutan güvenlik tertibatı.

DEMİRLEMEDE IRGAT KULLANIMI:

Demir atarken ırgat clutch'ı ayrılır ve band brake kontrollü olarak gevşetilerek zincir serbest bırakılır (paying out). Demir alırken clutch kavranır ve ırgat motoru çalıştırılarak zincir sarılır (heaving up).

Acil durumda zincir bottoming (tam serbest bırakma) yapılabilir; ancak bu, zincir ambarında kontrol kaybı riski taşır.`,
    bulletPoints: [
      "Yatay ırgat: geniş alan, kolay bakım; dikey ırgat: dar alan",
      "Wildcat/Gypsy zincir baklalarını kavrar",
      "Chain stopper (devil's claw) zinciri güvenlik altına alır",
      "Band brake ile kontrollü zincir salınımı sağlanır",
    ],
    keyPoints: [
      "Demir atarken clutch ayrılır, brake kontrollü gevşetilir",
      "Demir alırken clutch kavranır, motor çalıştırılır",
      "Hawse pipe: borda geçiş, spurling pipe: ambar geçiş",
    ],
  },
  "anchoring-procedure": {
    title: "Demirleme Prosedürü",
    introduction: "Demirleme, planlı ve koordineli bir şekilde yürütülen operasyondur; kaptan ve kasara ekibi arasında sürekli iletişim gerektirir.",
    content: `DEMİRLEME ÖNCESİ HAZIRLIK:

1. Demirleme bölgesinin haritadan incelenmesi (derinlik, zemin tipi, engeller)
2. Hava ve akıntı durumunun değerlendirilmesi
3. Gerekli zincir boyunun hesaplanması
4. Demir donanımının hazırlanması (ırgat, fren, iletişim)
5. Köprüüstü-kasara iletişim kontrolü (UHF/VHF veya telefon)

ZİNCİR BOYU HESABI:

Genel kural: Toplam zincir boyu = derinliğin 5-7 katı (normal koşullar). Fırtına koşullarında 8-10 katı. Sığ sularda minimum 4 kat.

Zincirin yere yatan kısmı (catenary) tutma kuvvetini artırır. Yeterli catenary olmadığında demir tarama riski artar.

DEMİRLEME ADIMLARI:

1. Gemi demirleme noktasına yaklaşırken hız minimum düzeye düşürülür
2. Rüzgâr veya akıntıya karşı yaklaşılır
3. Gemi durduğunda veya çok yavaş sternway aldığında demir bırakılır
4. Kontrollü şekilde zincir verilir (istenen uzunlukta)
5. Brake sıkılır ve zincirin tutup tutmadığı kontrol edilir
6. GPS, radar kerterizi veya kıyı nişangâhlarıyla demir pozisyonu kaydedilir
7. Demir vardiyası başlatılır`,
    formula: {
      name: "Zincir Boyu (Genel Kural)",
      expression: "Zincir boyu = Derinlik × (5 ~ 7)",
      description: "Normal koşullar: 5-7 kat, fırtına: 8-10 kat, sığ su: minimum 4 kat derinlik",
    },
    examples: [
      {
        problem: "Derinliği 20 metre olan bir demirleme yerinde normal koşullarda ne kadar zincir verilmelidir?",
        solution: "Zincir boyu = 20 × 6 (ortalama) = 120 metre. 1 shackle = 27,5 m olduğundan, 120 / 27,5 ≈ 4,4 shackle. Uygulamada 4,5 veya 5 shackle zincir verilir.",
      },
    ],
    bulletPoints: [
      "Zincir boyu = derinlik × 5-7 (normal koşullar)",
      "Rüzgâr veya akıntıya karşı yaklaşılır",
      "Gemi durduğunda veya sternway aldığında demir bırakılır",
      "Demir pozisyonu GPS/radar ile kaydedilir",
    ],
    warnings: [
      "Yetersiz zincir boyu = yetersiz catenary = tarama riski",
      "Sert zeminde (kaya) demirleme risklidir; demir tutmayabilir",
    ],
  },
  "anchor-watch": {
    title: "Demir Vardiyası ve Tarama Kontrolü",
    introduction: "Demir vardiyası, geminin güvenli bir şekilde demirli kalmasını sağlamak amacıyla sürekli gözetim yapılan vardiya türüdür.",
    content: `DEMİR VARDIYASI GÖREVLERİ:

1. Pozisyon kontrolü: GPS veya radar kerterizi ile geminin pozisyonunun izlenmesi. Salma dairesi (swinging circle) hesaplanarak diğer gemilerle ve kıyı engelleriyle güvenli mesafe kontrolü yapılır.

2. Tarama kontrolü: Demirin zemine tutunmaya devam edip etmediğinin izlenmesi. Tarama belirtileri:
   - Zincir yönünün beklenmedik şekilde değişmesi
   - Zincirde aşırı titreşim
   - GPS'te pozisyon kayması
   - Radar kerterizlerinde değişim

3. Hava ve deniz durumu takibi: Rüzgâr, akıntı ve dalga değişimleri izlenir.

4. Trafik gözetimi: Yaklaşan veya demirdeki diğer gemilerin izlenmesi.

SALMA DAİRESİ HESABI:

Salma dairesi yarıçapı = gemi boyu + verilen zincir boyu. Demirli geminin rüzgâr ve akıntı etkisiyle bu daire içinde hareket etmesi normaldir.

ALARM AYARLARI:

Modern ECDIS ve GPS sistemlerinde anchor watch alarm ayarı yapılır. Gemi, belirlenen dairenin dışına çıktığında sesli ve görsel alarm verir.`,
    formula: {
      name: "Salma Dairesi Yarıçapı",
      expression: "R = L + Zincir boyu",
      description: "R: salma dairesi yarıçapı (m), L: gemi boyu (LOA, m)",
    },
    examples: [
      {
        problem: "LOA = 180 m, verilen zincir = 5 shackle olan geminin salma dairesi yarıçapını hesaplayınız.",
        solution: "Zincir boyu = 5 × 27,5 = 137,5 m. R = 180 + 137,5 = 317,5 m. Geminin salma dairesi yarıçapı yaklaşık 318 metredir. Çevredeki engellerle bu mesafeden fazla açıklık olmalıdır.",
      },
    ],
    bulletPoints: [
      "Salma dairesi = gemi boyu + zincir boyu",
      "GPS ve radar ile sürekli pozisyon kontrolü yapılır",
      "ECDIS anchor alarm ayarı standart uygulamadır",
      "Zincir yönü ve titreşimi tarama belirtilerini gösterir",
    ],
    warnings: [
      "Demir taramasında derhal köprüüstü bilgilendirilmeli ve makine hazır tutulmalıdır",
      "Hava bozulması öncesi ek zincir verilmeli veya ikinci demir hazırlanmalıdır",
    ],
  },
  "anchor-dragging": {
    title: "Demir Taraması ve Alınacak Tedbirler",
    introduction: "Demir taraması, demirin zemine tutunma gücünü kaybederek geminin kontrolsüz sürüklenmesidir; denizciliğin en kritik durumlarından biridir.",
    content: `TARAMA NEDENLERİ:

1. Yetersiz zincir boyu (catenary kaybı)
2. Kötüleşen hava koşulları (artan rüzgâr ve akıntı kuvvetleri)
3. Uygun olmayan zemin (sert kil, kaya, yosun)
4. Demir veya zincir hasarı
5. Ani rüzgâr değişimi (yön veya şiddet)

TARAMA BELİRTİLERİ:

- GPS pozisyonunda sürekli ve tek yönlü kayma
- Radar kerterizlerinde değişim
- Zincir yönünde anormal değişim
- Zincirde sert titreşim veya darbe sesleri
- Pruvanın rüzgâra/akıntıya dönmemesi

ALINACAK TEDBİRLER:

1. Makineyi derhal hazır et (stand-by engine)
2. Daha fazla zincir ver (catenary artırmak için)
3. Zincir tutarsa pozisyonu yeniden doğrula
4. Tutmazsa ikinci demiri at (farklı yöne)
5. İki demir de tutmazsa demir al ve başka yere demir at
6. Gerekiyorsa seyire geç ve açık denize çık

İKİ DEMİRLE DEMİRLEME:

Ağır hava beklentisinde iki demir atılabilir. İki yöntem:
- Open moor (V şekli): İki demir birbirine 60-90° açıyla atılır
- Tandem: İki demir aynı zincir hattında, birbiri ardına atılır (nadir)`,
    bulletPoints: [
      "Taramanın 1 numaralı sebebi yetersiz zincir boyudur",
      "İlk adım: makine hazır, ikinci adım: zincir ver",
      "İkinci demir farklı yöne atılmalıdır",
      "Open moor: iki demir 60-90° açıyla yerleştirilir",
    ],
    warnings: [
      "Tarama anında vakit kaybedilmemeli; makine derhal hazır tutulmalıdır",
      "Sığ suda veya kalabalık demirlemede tarama = çatışma riski",
    ],
  },

  // =====================================================
  // BÖLÜM 4 - PALAMAR VE BAĞLAMA
  // =====================================================
  "mooring-lines": {
    title: "Palamar Halatları ve Adlandırmaları",
    introduction: "Geminin rıhtıma güvenli bağlanması için kullanılan palamar halatları, konumlarına ve görevlerine göre adlandırılır.",
    content: `PALAMAR HALAT TÜRLERİ VE ADLARI:

Geminin pruvasından kıçına doğru sırasıyla:

1. Head Line (Baş Bağı): Pruvanın en ön kısmından ileriye doğru gönderilen halat. Gemiyi iskeleye çeker.

2. Forward Breast Line (Baş Omuz Bağı): Pruva bölgesinden dik olarak kıyıya gönderilen halat. Gemiyi iskeleye yakın tutar.

3. Forward Spring (Baş Spring): Pruva bölgesinden kıça doğru gönderilen halat. Geminin ileri kaymasını önler.

4. After Spring (Kıç Spring): Kıç bölgesinden pruva yönüne doğru gönderilen halat. Geminin geri kaymasını önler.

5. After Breast Line (Kıç Omuz Bağı): Kıç bölgesinden dik olarak kıyıya gönderilen halat.

6. Stern Line (Kıç Bağı): Kıçın en arka kısmından geriye doğru gönderilen halat.

GÖREVLER:

Head ve stern line'lar geminin uzunlamasına hareketini ve iskeleye çekimini sağlar.
Breast line'lar gemiyi iskeleye yakın tutar (enine hareket kontrolü).
Spring'ler geminin ileri-geri kaymasını (surging) önler. Spring'ler en kritik bağlardır; gemi hareketinin birincil kontrolünü sağlar.

PALAMAR MALZEMESİ:

Modern gemilerde genellikle polyester veya HMPE halatlar palamar olarak kullanılır. Naylon, yüksek elastikiyeti nedeniyle palamar olarak tercih edilmez (aşırı uzama istenmeyen harekete izin verir). Ancak bazı limanlarda şamandıra bağlamasında naylon kullanılabilir.`,
    bulletPoints: [
      "Spring'ler geminin ileri-geri kaymasını önleyen en kritik bağlardır",
      "Breast line'lar gemiyi iskeleye yakın tutar (enine kontrol)",
      "Head/stern line'lar uzunlamasına çekim sağlar",
      "Polyester veya HMPE palamar halatı olarak tercih edilir",
    ],
    keyPoints: [
      "Forward spring: ileri kaymayı önler (kıça doğru uzanır)",
      "After spring: geri kaymayı önler (pruvaya doğru uzanır)",
      "Naylon elastikiyeti palamar için dezavantajdır",
    ],
  },
  "mooring-equipment": {
    title: "Bağlama Donanımı (Babalar, Makaralar)",
    introduction: "Bağlama donanımı, palamar halatlarının gemide ve kıyıda güvenle sabitlenmesini sağlayan yapısal ve mekanik elemanlardır.",
    content: `GEMİ ÜZERİNDEKİ DONANIM:

Baba (Bollard): Palamar halatının sarıldığı çelik silindirik direk. Çift baba (double bollard/cruciform) standart tiptir. SWL değeri üzerinde belirtilmelidir.

Panama Chock: Halatı borda dışına yönlendiren kapalı kılavuz. Halatın aşınmasını azaltır.

Roller Fairlead: Dönen makaralı kılavuz. Halat sürtünmesini minimize eder.

Pedestal Fairlead: Yükseltilmiş kılavuz; halat açısını ayarlamak için kullanılır.

Bitts (Babalar): İkili dikey direkler. Çekme halatı veya palamar için kullanılır.

KIYI DONANIMI:

Bollard (Kıyı babası): Rıhtıma monte edilmiş ağır çelik baba.
Mooring buoy: Demirleme şamandırası; gemi şamandıraya bağlanır.
Quick Release Hook (QRH): Tanker terminallerinde kullanılan hızlı serbest bırakma kancası. Acil durumda uzaktan kumandayla açılabilir.

STANDART DONANIM YERLEŞİMİ:

OCIMF (Oil Companies International Marine Forum) ve IACS standartları, bağlama donanımının yerleşimini ve SWL değerlerini belirler. Mooring Design MBL (DMBL) kavramı, tüm donanımın eşit dayanımda olmasını hedefler.`,
    bulletPoints: [
      "Panama chock: kapalı kılavuz, halat aşınmasını azaltır",
      "Roller fairlead: dönen makara, sürtünmeyi minimize eder",
      "QRH: tanker terminallerinde acil serbest bırakma mekanizması",
      "OCIMF ve IACS bağlama donanım standartlarını belirler",
    ],
    keyPoints: [
      "Tüm donanımın SWL değeri görünür şekilde işaretlenmeli",
      "DMBL: tüm bağlama donanımının eşit dayanımda olması prensibi",
    ],
  },
  "mooring-procedure": {
    title: "Yanaşma ve Bağlama Prosedürü",
    introduction: "Yanaşma ve bağlama, köprüüstü ile güverte ekipleri arasında koordineli olarak yürütülen kritik bir operasyondur.",
    content: `YANAŞMA ÖNCESİ HAZIRLIK:

1. Rıhtım bilgileri ve yaklaşım planının incelenmesi
2. Palamar halatlarının hazırlanması (koçan boşanması)
3. Koruma donanımının (fender) yerleştirilmesi
4. İletişim kontrolü (köprüüstü-pruva-kıç)
5. Makine ve dümen manevra testleri
6. Römorkör koordinasyonu (gerekiyorsa)

BAĞLAMA SIRASI:

Standart bağlama sırası (rüzgâr/akıntı durumuna göre değişebilir):
1. İlk olarak spring halatları gönderilir (gemi hareketini kontrol eder)
2. Ardından head ve stern line'lar
3. Son olarak breast line'lar

ROMORKÖRLERİN KULLANIMI:

Büyük gemilerde yanaşma ve kalkma sırasında römorkör desteği alınır. Römorkör sayısı ve gücü, geminin tonajına, liman koşullarına ve yerel kurallara bağlıdır. Römorkör bağlantı noktası, geminin manevra merkezine göre belirlenir.

HEAVING LINE (İNCE ATMA HALATI):

Palamar halatı doğrudan kıyıya atılamayacağı için önce ince bir atma halatı (heaving line) kıyıya fırlatılır. Bu halatın ucuna ağırlık (monkey's fist) bağlıdır. Kıyıdaki personel atma halatını çekerek palamar halatını kıyıya alır.`,
    bulletPoints: [
      "İlk spring, ardından head/stern, son olarak breast gönderilir",
      "Heaving line (atma halatı) ile palamar kıyıya geçirilir",
      "Monkey's fist atma halatının ucundaki ağırlıktır",
      "Römorkör sayısı ve gücü gemi tonajına ve koşullara bağlıdır",
    ],
    warnings: [
      "Heaving line atılırken kıyıdaki personelin güvenli alanda olduğundan emin olunmalıdır",
      "Snap-back zone'dan (halat geri tepme bölgesi) uzak durulmalıdır",
    ],
  },
  "mooring-winches": {
    title: "Irgatlar ve Vinçler",
    introduction: "Bağlama ırgatları (mooring winches), palamar halatlarının sarılması ve gerilmesini sağlayan mekanik sistemlerdir.",
    content: `MOORING WINCH TİPLERİ:

1. Single Drum Winch: Tek tamburlu; basit yapı, yaygın kullanım.
2. Split Drum Winch: İki tamburlu; bir tambur palamar, diğer tambur yedek halat için.
3. Tension Winch (Auto-tension/Render-recover): Otomatik gergi winch'i. Halat gerginliğini sabit tutar. Gelgit farklılığının yüksek olduğu limanlarda gereklidir.
4. Brake Drum: Sadece frenleme yapan tambur; halatın serbest ucu babaya alınır.

OTOMATİK GERGİ SİSTEMİ:

Auto-tension winch'ler halattaki gerilimi sürekli ölçer. Gerginlik arttığında (geminin uzaklaşması) halat verir (render). Gerginlik azaldığında (geminin yaklaşması) halatı sarar (recover). Ayarlanan gerilim değeri SWL'nin %60'ını geçmemelidir.

GÜVENLIK:

Winch operasyonu sırasında personel tehlikeli bölgelerden uzak durmalıdır. Halatın gerilim altında kopması halinde geri tepme (snapback) ölümcül olabilir. IMO MSC Circ.1175 snap-back zone'ların güverte üzerinde işaretlenmesini gerektirir.`,
    bulletPoints: [
      "Auto-tension winch: gelgit farkı yüksek limanlarda gereklidir",
      "Ayar gerilimi SWL'nin %60'ını geçmemelidir",
      "IMO MSC Circ.1175: snap-back zone işaretlemesi zorunluluğu",
    ],
    warnings: [
      "Snap-back zone ölümcül tehlike bölgesidir; güvertede sarı/kırmızı hatlarla işaretlenir",
      "Winch operasyonu sırasında tambur önünde durulmamalıdır",
    ],
  },
  "mooring-safety": {
    title: "Bağlama Operasyonlarında Güvenlik",
    introduction: "Bağlama operasyonları, denizcilik kazalarının en sık yaşandığı faaliyet alanlarından biridir; güvenlik protokollerinin sıkı uygulanması hayat kurtarır.",
    content: `BAŞLICA RİSKLER:

1. Snapback (Geri Tepme): Gerilmiş halatın koparak geri tepmesi. En ölümcül risktir. Sentetik halatlar yüksek enerji depoladığından snapback mesafesi uzundur.

2. Sıkışma: Halatların, tamburların veya makaraların arasına el/ayak sıkışması.

3. Çarpma: Halatın veya bağlama donanımının kontrolsüz hareketi.

4. Düşme: Islak güverte, halat engelleri, dikkatsizlik.

GÜVENLİK ÖNLEMLERİ:

- Snap-back zone'lar güvertede belirgin şekilde işaretlenmeli (IMO MSC Circ.1175)
- PPE (kask, emniyet gözlüğü, emniyet ayakkabısı, eldiven) giyilmeli
- Halatın kopabileceği hat üzerinde durulmamalı
- Kılavuz makaralara uzak durulmalı
- Winch operatörü ile gözetmen arasında açık iletişim
- Halatın babaya alınması sırasında halat serbest dönüşü (slack) kontrol edilmeli

OCIMF MEG4 KILAVUZU:

OCIMF Mooring Equipment Guidelines (MEG4) bağlama güvenliği için kapsamlı bir referans kaynağıdır. Donanım tasarımı, bakım, operasyonel prosedürler ve risk değerlendirmesi konularında rehberlik sağlar.`,
    bulletPoints: [
      "Snapback: en ölümcül bağlama riski; sentetik halatlar yüksek enerji depolar",
      "Snap-back zone'lar güvertede işaretlenmelidir (IMO MSC Circ.1175)",
      "PPE: kask, gözlük, emniyet ayakkabısı, eldiven zorunludur",
      "OCIMF MEG4: bağlama güvenliği referans kılavuzu",
    ],
    warnings: [
      "Gerilmiş halatın hizasında kesinlikle durulmamalıdır",
      "Bağlama operasyonu sırasında en az iki kişi görev yapmalıdır",
    ],
  },
  "single-buoy-mooring": {
    title: "Tek Şamandıra Bağlaması (SBM/SPM)",
    introduction: "Single Point Mooring (SPM), tankerlerin açık denizde yükleme/boşaltma yapabilmesi için kullanılan şamandıra bağlama sistemidir.",
    content: `SİSTEM YAPISI:

SPM/SBM (Single Buoy Mooring), deniz tabanına ankrajlanmış büyük bir şamandıradan oluşur. Tanker, pruvasını bu şamandıraya bağlar ve rüzgâr/akıntı etkisiyle serbest dönüş (weathervaning) yapabilir.

Sistemin bileşenleri:
- Şamandıra gövdesi (buoy body)
- Ankraj bacakları (anchor legs/chains)
- Döner kafa (turntable/swivel)
- Deniz altı boruları (submarine hoses/pipelines)
- Yüzen hortumlar (floating hoses) veya CALM sistemi

BAĞLAMA PROSEDÜRÜ:

1. Tanker, şamandıraya kontrollü yaklaşır (genellikle rüzgâraltından)
2. Heaving line/messenger ile pick-up halatı (pennant wire) alınır
3. Chafing chain şamandıra ucundan alınarak tankerin pruva stopper'ına bağlanır
4. Yüzen hortumlar bağlanır ve yük transferi başlar

Bağlama ve yükleme sırasında tanker, şamandıra etrafında 360° dönebilir. Bu özellik, açık deniz koşullarında güvenli operasyon sağlar.

SBM operasyonları OCIMF tarafından yayınlanan "SBM and SPM - Guidelines" dokümanıyla standartlaştırılmıştır.`,
    bulletPoints: [
      "SPM: tanker pruvasından bağlanır, serbest dönüş (weathervaning) yapar",
      "CALM: Catenary Anchor Leg Mooring yaygın bir SPM tipidir",
      "Yüzen hortumlarla yük transferi yapılır",
      "OCIMF SPM kılavuzu operasyonel standarttır",
    ],
    keyPoints: [
      "Weathervaning: tanker rüzgâr ve akıntıya göre serbest dönüş yapar",
      "Chafing chain pruva stopper'a bağlanır",
      "SPM operasyonları açık deniz tanker terminallerinde standarttır",
    ],
  },

  // =====================================================
  // BÖLÜM 5 - DÜMEN VE MANEVRA
  // =====================================================
  "rudder-types": {
    title: "Dümen Tipleri ve Yapıları",
    introduction: "Dümen, geminin yön değiştirmesini sağlayan birincil manevra elemanıdır; tipi ve boyutu geminin manevra kabiliyetini doğrudan etkiler.",
    content: `BAŞLICA DÜMEN TİPLERİ:

1. Balanced Rudder (Dengeli Dümen): Dümen alanının bir kısmı (%20-25) döndürme ekseni önünde kalır. Bu tasarım, dümen torku gereksinimini azaltır. Modern ticaret gemilerinde standarttır.

2. Semi-Balanced Rudder (Yarı Dengeli): Üst kısım sabit yapıya monte, alt kısım serbest. Dengeli dümenin bir varyasyonudur.

3. Unbalanced Rudder (Dengesiz): Tüm dümen alanı döndürme ekseni arkasındadır. Yüksek tork gerektirir. Eski tip gemilerde bulunur.

4. Flap Rudder (Becker Rudder): Dümenin arka kenarında hareketli bir kanat (flap) bulunur. Dümen açısını efektif olarak artırır ve dönüş performansını iyileştirir.

5. Schilling Rudder: Yüksek kaldırma kuvveti üreten profil tasarımı. Dar alanlarda manevra kabiliyetini artırır.

DÜMEN PARAMETRELERİ:

Dümen alanı genellikle sualtı yüzey alanının %1,5-2'si kadardır. Maksimum dümen açısı genellikle her iki tarafa 35°'dir. SOLAS gereği dümen, 35°'den bir tarafa 30°'ye karşı tarafa 28 saniyede dönebilmelidir.

Dümen başlangıç etkisi (initial turning effect) pruva tarafına değil, kıç tarafına etki eder. Dümen sancağa basıldığında kıç iskeleye savrulur, ardından gemi sancağa dönmeye başlar.`,
    bulletPoints: [
      "Balanced rudder: modern standart, düşük tork gereksinimi",
      "Flap rudder (Becker): artırılmış dönüş performansı",
      "Maksimum dümen açısı: genellikle 35° her iki tarafa",
      "SOLAS: 35° → 30° karşı taraf, 28 saniye içinde",
    ],
    keyPoints: [
      "Dümen kıç tarafına etki eder; kıç savrulması hesaba katılmalıdır",
      "Dümen alanı ≈ sualtı yüzey alanının %1,5-2'si",
      "Balanced dümen tasarımı tork gereksinimini azaltır",
    ],
  },
  "steering-gear": {
    title: "Dümen Makinesi Sistemleri",
    introduction: "Dümen makinesi, köprüüstünden verilen dümen komutlarını mekanik kuvvete dönüştürerek dümen palasını hareket ettiren sistemdir.",
    content: `DÜMEN MAKİNESİ TİPLERİ:

1. Ram Type (Pistonlu): Hidrolik silindirler yardımıyla dümen yelpazesini (tiller) hareket ettirir. İki veya dört silindir kullanılır. Büyük gemilerde yaygındır.

2. Rotary Vane Type: Döner kanatlı hidrolik motor. Kompakt yapıdadır. Orta boy gemilerde tercih edilir.

3. Elektrik Motorlu: Küçük gemilerde doğrudan elektrik motoruyla dümen tahriği.

SOLAS GEREKSİNİMLERİ:

- Ana dümen makinesi: dümenin 35° bir tarafa, 30° karşı tarafa 28 saniyede dönmesini sağlamalıdır
- Yardımcı dümen makinesi: dümenin 15° bir tarafa, 15° karşı tarafa 60 saniyede dönmesini sağlamalıdır
- İki bağımsız güç kaynağı bulunmalıdır
- Köprüüstünden, dümen makinesi dairesinden ve acil dümen pozisyonundan kontrol edilebilmelidir
- Dümen açı göstergesi (rudder angle indicator) köprüüstünde ve dümen makinesi dairesinde bulunmalıdır

ACİL DÜMEN:

Ana dümen makinesi arızasında yardımcı sisteme geçiş süresi mümkün olan en kısa olmalıdır. Dümen makinesi tatbikatları düzenli olarak yapılmalıdır (3 ayda bir). Acil dümen prosedürü mürettebat tarafından bilinmelidir.`,
    bulletPoints: [
      "Ram type: büyük gemilerde standart hidrolik sistem",
      "Rotary vane: kompakt, orta boy gemilerde tercih edilir",
      "Ana dümen: 35° → 30° karşı, 28 saniye",
      "Yardımcı dümen: 15° → 15° karşı, 60 saniye",
    ],
    keyPoints: [
      "İki bağımsız güç kaynağı SOLAS zorunluluğudur",
      "Dümen makinesi tatbikatı: her 3 ayda bir yapılmalıdır",
      "Acil dümen: köprüüstü, makine dairesi ve acil pozisyon",
    ],
  },
  "turning-circle": {
    title: "Dönme Dairesi ve Manevra Karakteristikleri",
    introduction: "Dönme dairesi (turning circle), geminin tam dümen açısıyla 360° dönüş yaptığında çizdiği yoldur ve geminin manevra kabiliyetini tanımlar.",
    content: `DÖNME DAİRESİ PARAMETRELERİ:

Advance: Dümen basıldığı andan gemi 90° dönene kadar orijinal seyir hattı yönündeki ilerleme mesafesi. Genellikle 3-5 gemi boyu arasındadır.

Transfer: Dümen basıldığı andan gemi 90° dönene kadar orijinal seyir hattına dik yöndeki yer değiştirme mesafesi. Genellikle 1-2 gemi boyu arasındadır.

Tactical Diameter: Geminin 180° dönene kadar orijinal seyir hattına dik yöndeki toplam yer değiştirmesidir. Genellikle 3-6 gemi boyu arasındadır.

Final Diameter: Kararlı dönüş çapıdır (dönüş hızı sabitlendiğinde).

Kick: Dümenin ilk basılmasında kıçın dönüş yönünün tersine savrulmasıdır.

ETKİLEYEN FAKTÖRLER:

- Dümen açısı (arttıkça çap küçülür)
- Gemi hızı (arttıkça dönüş süresi kısalır, ancak çap çok değişmez)
- Trim durumu (kıç triminde dönüş zorlaşır)
- Yük durumu (tam yüklü gemide dönüş çapı büyür)
- Rüzgâr ve akıntı
- Sığ su etkisi (çap büyür)

IMO STANDARTLARI (MSC.137(76)):
- Advance ≤ 4,5 gemi boyu
- Tactical diameter ≤ 5 gemi boyu`,
    formula: {
      name: "IMO Manevra Standartları",
      expression: "Advance ≤ 4,5L  ve  Tactical Diameter ≤ 5L",
      description: "L: gemi boyu (LBP). IMO MSC.137(76) standartlarına göre minimum performans gereksinimleri.",
    },
    examples: [
      {
        problem: "LBP = 200 m olan bir gemi için IMO standartlarına göre izin verilen maksimum advance ve tactical diameter değerlerini hesaplayınız.",
        solution: "Advance ≤ 4,5 × 200 = 900 m. Tactical diameter ≤ 5 × 200 = 1.000 m. Geminin sea trial testlerinde bu değerlerin altında performans göstermesi gerekir.",
      },
    ],
    bulletPoints: [
      "Advance: 90° dönüşe kadar ilerleme (3-5 gemi boyu)",
      "Transfer: 90° dönüşe kadar yana kayma (1-2 gemi boyu)",
      "Tactical diameter: 180° dönüşe kadar toplam yana kayma",
      "IMO: advance ≤ 4,5L, tactical diameter ≤ 5L",
    ],
    keyPoints: [
      "Kick etkisi: dümen basıldığında kıç önce ters tarafa savrulur",
      "Sığ su dönme çapını büyütür",
      "Kıç triminde dönüş zorlaşır",
    ],
  },
  "stopping-distance": {
    title: "Durma Mesafesi ve Crash Stop",
    introduction: "Durma mesafesi, geminin tam yol ilerlerken makinelerin durdurulması veya tornistan verilmesiyle tamamen duruncaya kadar kat ettiği mesafedir.",
    content: `DURMA KAVRAMLARI:

Free Stop: Makineler durdurulur, gemi kendi direnciyle yavaşlar. Büyük gemilerde bu mesafe çok uzundur (30-40 dakika sürebilir).

Crash Stop (Emergency Stop): Makineler tam yol tornistana alınır. Gemi mümkün olan en kısa mesafede durdurulur. Ancak bu manevra pervane şaftına ve makineye stres uygular.

CRASH STOP PARAMETRELERİ:

Durma mesafesi (track reach): Geminin crash stop boyunca kat ettiği toplam mesafe. Genellikle 10-20 gemi boyu arasındadır.

Head reach: Orijinal seyir hattı yönündeki ilerleme mesafesi.

Lateral deviation: Durma sırasında geminin yana sapması. Pervane etkisi (transverse thrust) nedeniyle gemi genellikle bir tarafa sapar.

ETKİLEYEN FAKTÖRLER:

- Gemi hızı (arttıkça durma mesafesi artar – karesel ilişki)
- Deplasmanı (arttıkça durma zorlaşır)
- Gemi formu ve direnç
- Pervane gücü ve tipi
- Rüzgâr ve akıntı
- Sığ su etkisi (durma mesafesi kısalır ancak kontrol zorlaşır)

IMO STANDARDI: Head reach ≤ 15 gemi boyu (MSC.137(76))`,
    formula: {
      name: "IMO Crash Stop Standardı",
      expression: "Head Reach ≤ 15L",
      description: "L: gemi boyu (LBP). Crash stop ile durma mesafesi 15 gemi boyunu geçmemelidir.",
    },
    bulletPoints: [
      "Crash stop: tam yol tornistana alınarak durma",
      "Durma mesafesi genellikle 10-20 gemi boyu",
      "IMO standardı: head reach ≤ 15 gemi boyu",
      "Pervane etkisiyle gemi yana sapar",
    ],
    warnings: [
      "Crash stop pervane şaftına ve makineye aşırı stres uygular",
      "Büyük konteyner ve tanker gemilerde durma mesafesi 2-3 km'yi bulabilir",
    ],
  },
  "squat-effect": {
    title: "Squat Etkisi ve Sığ Su Etkileri",
    introduction: "Squat, geminin sığ suda veya dar kanalda hareket ederken su altı basınç değişimlerinin etkisiyle batmasıdır (draft artışı).",
    content: `SQUAT FİZİĞİ:

Gemi hareket ettiğinde tekne altında ve çevresinde su akışı hızlanır. Bernoulli prensibi gereği hız artan yerde basınç düşer. Basınç düşüşü geminin batmasına (squat) neden olur.

Sığ su tanımı: Derinlik/Draft oranı < 1,5 ise sığ su etkisi belirgindir.

SQUAT HESABI (BARRASS FORMÜLÜ):

Açık sularda: Squat ≈ Cb × V² / 100 (metre)
Kanal/dar sularda: Squat ≈ 2 × Cb × V² / 100 (metre)

Cb: blok katsayısı (block coefficient)
V: gemi hızı (knot)

SQUAT ETKİLERİ:

- Draft artışı (en kritik etki: karaya oturma riski)
- Trim değişimi (dolu gemide genellikle pruva triminin artması)
- Dümen etkinliğinin azalması
- Dönüş çapının büyümesi

SIĞ SU ETKİLERİ:

- Dalga direncinin artması
- Gemi hızının düşmesi
- Manevra kabiliyetinin azalması
- Pruva dalgasının büyümesi (kıyı erozyonu riski)`,
    formula: {
      name: "Squat Hesabı (Barrass Formülü)",
      expression: "Squat ≈ Cb × V² / 100  (açık su, metre)",
      description: "Cb: blok katsayısı, V: hız (knot). Kanal/dar sularda sonuç 2 ile çarpılır.",
    },
    examples: [
      {
        problem: "Cb = 0,80 ve hızı 12 knot olan bir bulk carrier'ın açık sığ suda squat değerini hesaplayınız.",
        solution: "Squat = Cb × V² / 100 = 0,80 × 12² / 100 = 0,80 × 144 / 100 = 1,152 m. Geminin draftı yaklaşık 1,15 metre artacaktır. Kanal geçişinde bu değer 2 × 1,15 = 2,30 m olur.",
      },
    ],
    bulletPoints: [
      "Derinlik/Draft < 1,5 → sığ su etkisi belirgin",
      "Squat hızın karesiyle orantılı artar",
      "Kanal squat'ı açık su squat'ının yaklaşık 2 katıdır",
      "En kritik risk: draft artışı → karaya oturma",
    ],
    warnings: [
      "Sığ sularda hız mutlaka azaltılmalıdır (squat hızın karesiyle artar)",
      "UKC hesabında squat değeri mutlaka dikkate alınmalıdır",
    ],
  },
  "bank-effect": {
    title: "Kıyı Etkisi (Bank Effect) ve Kanal Seyri",
    introduction: "Kıyı etkisi, geminin kıyıya veya kanal duvarına yakın seyrettiğinde ortaya çıkan asimetrik su akışının neden olduğu istem dışı yön değiştirmesidir.",
    content: `KIYI ETKİSİ MEKANİZMASI:

Gemi kanal duvarına veya kıyıya yakın seyrettiğinde, yakın taraftaki su akışı hızlanır (dar alan), uzak taraftaki yavaşlar. Bernoulli prensibi gereği:
- Yakın tarafta basınç düşer → gemi kıyıya doğru çekilir (suction)
- Pruva uzak tarafa iterken, kıç yakın tarafa çekilir
- Sonuç: gemi kıyıdan uzaklaşır gibi görünür ancak aslında kıç kıyıya doğru kayar

İKİ GEMİNİN ETKİLEŞİMİ:

Dar sularda paralel seyreden veya karşılaşan iki gemi arasında da benzer etkiler oluşur:
- Yaklaşma aşaması: pruva-pruva itme
- Paralel geçiş: karşılıklı çekim (suction)
- Uzaklaşma: kıç-kıç itme

Bu etkiler küçük gemileri daha fazla etkiler. Büyük gemi geçerken küçük gemi güvenli mesafe bırakmalı ve hızını düşürmelidir.

KANAL SEYRİ KURALLARI:

1. Orta hattan seyret (mümkünse)
2. Hızı azalt (squat ve kıyı etkisi azalır)
3. Dümen kontrolünü sıkı tut
4. Karşılaşma ve sollama manevralarında ekstra dikkat
5. Pilot rehberliğine uy

SUEZ VE PANAMA KANALLARI:

Bu kanallarda özel seyir kuralları ve hız limitleri uygulanır. Pilot alımı zorunludur. Gemi boyutları kanal geçiş kısıtlamalarına (Suezmax, Panamax, Neopanamax) uygun olmalıdır.`,
    bulletPoints: [
      "Kıyı etkisi: yakın tarafta basınç düşer, kıç kıyıya çekilir",
      "İki gemi etkileşiminde pruva-pruva itme, paralelde çekim",
      "Hız azaltmak hem squat hem kıyı etkisini azaltır",
      "Suez/Panama: özel kurallar, pilot zorunlu",
    ],
    keyPoints: [
      "Küçük gemiler büyük gemilerin kıyı etkisinden daha fazla etkilenir",
      "Kanal seyrinde orta hattan gitmek en güvenli stratejidir",
      "Panamax, Neopanamax, Suezmax: kanal geçiş kısıtlama sınıfları",
    ],
  },

  // =====================================================
  // BÖLÜM 6 - GÜVERTE MAKİNELERİ
  // =====================================================
  "deck-cranes": {
    title: "Güverte Vinçleri ve Boom'lar",
    introduction: "Güverte vinçleri, yük operasyonlarında kullanılan hidrolik veya elektro-hidrolik kaldırma donanımıdır.",
    content: `VİNÇ TİPLERİ:

Deck Crane (Güverte Vinci): Modern kargo gemilerinin çoğunda kullanılır. Hidrolik tahrikli, 360° dönebilen yapıdadır. SWL genellikle 25-35 ton arasıdır. Tandem operasyonuyla iki vinç birlikte çalıştırılarak kapasite artırılabilir.

Gantry Crane (Portal Vinç): Ray üzerinde hareket eden vinç. Konteyner gemilerinde ambar kapağı üzerinde çalışır.

TEMEL VİNÇ PARAMETRELERİ:

SWL (Safe Working Load): Vincin güvenle kaldırabileceği maksimum yük.
Outreach: Vincin merkezinden maksimum çalışma yarıçapı.
Hoisting Speed: Kaldırma hızı (m/dakika).
Slewing Speed: Dönüş hızı (derece/saniye).

VİNÇ GÜVENLİĞİ:

- SWL hiçbir koşulda aşılmamalıdır
- Yük altında slewing (dönüş) dikkatle yapılmalı
- Rüzgâr hızı limitlerine uyulmalı (genellikle >20 m/s'de operasyon durdurulur)
- Yükün altında kimse durmamalıdır
- Vinç operatörü sertifikalı olmalıdır`,
    bulletPoints: [
      "Deck crane SWL genellikle 25-35 ton",
      "Tandem operasyonuyla kapasite artırılabilir",
      "Rüzgâr > 20 m/s'de operasyon durdurulur",
      "Vinç operatörü sertifikalı olmalıdır",
    ],
    keyPoints: [
      "SWL outreach ile ters orantılıdır (uzak mesafede kapasite düşer)",
      "Tandem lift: iki vincin koordineli çalışması, özel eğitim gerektirir",
    ],
  },
  "derricks": {
    title: "Bumba (Derrick) Sistemleri",
    introduction: "Bumba, eski tip kargo gemilerinde yük kaldırma ve taşıma amacıyla kullanılan mafsallı kol sistemidir.",
    content: `BUMBA TİPLERİ:

Swinging Derrick: En temel tip. Bir direk (mast/samson post) üzerinde mafsallı kol. Union purchase düzenlemesiyle iki bumba birlikte çalıştırılır.

Heavy Lift Derrick (Stülcken, Jumbo): 100-500 ton kapasiteli ağır yük bumbaları. Günümüzde nadir; çoğu ağır yük vinçleriyle değiştirilmiştir.

UNION PURCHASE DÜZENLEMESİ:

İki bumba birlikte çalıştırılarak yükün ambardan rıhtıma veya tersine taşınması. Bir bumba ambar üzerinde (hatch derrick), diğeri borda dışında (yard derrick) sabitlenir.

- Hatch derrick: yükü ambardan kaldırır
- Yard derrick: yükü borda dışına taşır
- İki vincin halatları aynı kancaya bağlanır

GÜVENLIK:

Bumba operasyonlarında SWL'nin en zayıf elemanı (halat, blok, şakla) belirler. Union purchase'da SWL, tek bumba kapasitesinden düşüktür (açı etkisi).`,
    bulletPoints: [
      "Union purchase: iki bumbanın koordineli çalışması",
      "Heavy lift derrick: 100-500 ton kapasite (nadir)",
      "SWL en zayıf elemana göre belirlenir",
      "Modern gemilerde bumbalar büyük ölçüde vinçlerle değiştirilmiştir",
    ],
    keyPoints: [
      "Union purchase SWL'si tek bumba kapasitesinden düşüktür",
      "Açı arttıkça halatlardaki gerilim artar (SWL düşer)",
    ],
  },
  "hatch-covers": {
    title: "Ambar Kapakları ve Tipleri",
    introduction: "Ambar kapakları, yük ambarlarının su geçirmez şekilde kapatılmasını sağlayan yapısal elemanlardır ve gemi emniyeti açısından kritik öneme sahiptir.",
    content: `AMBAR KAPAĞI TİPLERİ:

1. Hydraulic Folding (Hidrolik Katlanır): Paneller hidrolik silindirlerle katlanarak açılır. Modern dökme yük gemilerinde yaygındır.

2. Side Rolling (Yana Kayar): Paneller ray üzerinde yanlara kayar. Konteyner ve genel kargo gemilerinde kullanılır.

3. Piggyback (Bindirmeli): Paneller birbiri üzerine bindirilir. Dar güverte alanına sahip gemilerde tercih edilir.

4. Pontoon Type (Duba Tipi): Bağımsız paneller vinçle kaldırılarak açılır. Eski tip gemilerde bulunur.

SU GEÇİRMEZLİK:

Ambar kapaklarının su geçirmezliği SOLAS ve Load Line Convention gereği zorunludur. Hava durumu koşullarından bağımsız olarak denize açılmadan önce tüm kapaklar doğru şekilde kapatılmalı ve kontrol edilmelidir.

Test yöntemleri:
- Hose test (su testi): Yüksek basınçlı su ile contaların test edilmesi
- Chalk test (tebeşir testi): Conta yüzeylerine tebeşir sürülerek temas kontrolü
- Ultrasonic test: Ultrasonik cihazla sızıntı tespiti (en güvenilir yöntem)

CONTALAR VE BAKIM:

Kauçuk contalar (rubber gaskets) periyodik olarak kontrol edilmelidir. Sertleşmiş, çatlamış veya deforme olmuş contalar değiştirilmelidir. Packing line ve cleating (sıkıştırma) mekanizmaları düzenli olarak bakılmalıdır.`,
    bulletPoints: [
      "Hidrolik katlanır: modern dökme yük gemilerinde standart",
      "Ultrasonik test en güvenilir su geçirmezlik kontrol yöntemidir",
      "Ambar kapaklarının su geçirmezliği SOLAS zorunluluğudur",
      "Contalar periyodik olarak kontrol edilmeli ve değiştirilmelidir",
    ],
    warnings: [
      "Hasarlı ambar kapağı ile denize açılmak yasal ihlaldir",
      "PSC denetimlerinde ambar kapakları sıklıkla kontrol edilen donanımdır",
    ],
  },
  "ventilation-systems": {
    title: "Havalandırma Sistemleri",
    introduction: "Gemi havalandırma sistemleri, yük ambarları, makine dairesi ve yaşam alanlarında yeterli hava dolaşımını sağlar.",
    content: `HAVALANDIRMA TÜRLERİ:

Doğal Havalandırma: Rüzgâr ve sıcaklık farkıyla oluşan hava akımı. Cowl ventilator (mantar havalandırıcı) ve mushroom ventilator bu prensiple çalışır.

Mekanik Havalandırma: Fan ve blower'larla zorlamalı hava dolaşımı. Makine dairesi, pompa dairesi ve büyük yük ambarlarında kullanılır.

YÜK AMBARI HAVALANDIRMASI:

Yük terlenmesi (cargo sweat) ve gemi terlenmesi (ship sweat) önlenmesi için ambar havalandırması kritiktir. Dew point kuralı uygulanır:

Dış havanın çiy noktası < yükün sıcaklığı → havalandırma yapılabilir
Dış havanın çiy noktası > yükün sıcaklığı → havalandırma yapılmamalı

MAKİNE DAİRESİ HAVALANDIRMASI:

Makine dairesi sürekli havalandırma gerektirir (yanma havası + soğutma + çalışma ortamı). Minimum hava değişim oranı saatte 20-30 değişimdir.

TEHLİKELİ ALAN HAVALANDIRMASI:

Tanker pompa daireleri, patlayıcı atmosfer oluşabilecek kapalı alanlar sürekli mekanik havalandırma gerektirir. Havalandırma kesildiğinde alana giriş yasaklanır.`,
    bulletPoints: [
      "Cowl ventilator: doğal havalandırma, mushroom ventilator: su geçirmez kapalı",
      "Dew point kuralı: dış hava çiy noktası < yük sıcaklığı → havalandır",
      "Makine dairesi: saatte 20-30 hava değişimi minimum",
      "Tanker pompa dairesi: sürekli mekanik havalandırma zorunlu",
    ],
    keyPoints: [
      "Cargo sweat: yük yüzeyinde yoğunlaşma, ship sweat: borda iç yüzeyinde yoğunlaşma",
      "Dew point kuralı yük hasarını önlemenin temelidir",
    ],
  },
  "deck-maintenance": {
    title: "Güverte Bakımı ve Boyama",
    introduction: "Düzenli güverte bakımı, geminin yapısal bütünlüğünü korumak ve korozyon hasarını önlemek için zorunludur.",
    content: `BAKIM FAALİYETLERİ:

1. Pas Temizliği: Chipping (çekiçleme), wire brushing (tel fırçalama), needle gun (iğneli tabanca), power tool ile mekanik temizlik. Yüzey Sa 2½ (near-white blast) standardına getirilmelidir.

2. Boyama Sistemi:
   - Primer (astar): Metal yüzeyi korozyondan korur. Epoxy primer yaygındır.
   - Intermediate coat: Koruyucu katman kalınlığını artırır.
   - Top coat (son kat): UV ve mekanik aşınmaya karşı korur.

3. Güverte Yıkama: Tuzlu su birikiminin önlenmesi için tatlı su ile yıkama.

4. Greasing (Yağlama): Hareketli parçalar (fairlead, roller, şakla) düzenli yağlanmalıdır.

5. Sounding (Seviye Ölçümü): Balast tankları, tatlı su tankları ve sintine seviyelerinin günlük kontrolü.

BOYAMA KOŞULLARI:

Boya uygulaması için ideal koşullar:
- Yüzey sıcaklığı: çiy noktasından en az 3°C yukarıda
- Bağıl nem: %85'in altında
- Rüzgâr hızı: aşırı olmayan (toz ve kum etkisi)
- Doğrudan güneş ışığı altında boya yapılmamalı (kabarcık oluşumu)

PMS (Planned Maintenance System):

ISM Code gereği tüm bakım faaliyetleri PMS kapsamında planlanır, uygulanır ve kaydedilir. Dijital PMS yazılımları bu süreci yönetir.`,
    bulletPoints: [
      "Sa 2½: yakın-beyaz blast, en yaygın yüzey hazırlık standardı",
      "Epoxy primer: metal korozyon korumasında standart",
      "Boya: yüzey sıcaklığı > çiy noktası + 3°C, nem < %85",
      "ISM Code gereği tüm bakım PMS'te kaydedilir",
    ],
    keyPoints: [
      "Korozyon korumasının temeli: yüzey hazırlığı + doğru boya sistemi",
      "PMS: planlı bakım sistemi, ISM Code zorunluluğu",
    ],
  },

  // =====================================================
  // BÖLÜM 7 - CAN KURTARMA VE TAHLİSİYE
  // =====================================================
  "lifeboat-types": {
    title: "Cankurtaran Sandal Tipleri ve Donanımı",
    introduction: "Cankurtaran sandalları, gemi terk durumunda mürettebat ve yolcuların hayatını korumak için tasarlanmış SOLAS onaylı tahlisiye araçlarıdır.",
    content: `SANDAL TİPLERİ:

1. Open Lifeboat: Üstü açık sandal. Eski standarttır; yeni inşa gemilerde artık kullanılmaz.

2. Totally Enclosed Lifeboat (TELB): Tamamen kapalı sandal. SOLAS standardıdır. Kendi kendine doğrulma (self-righting) özelliğine sahiptir. Dizel motorlu, bağımsız hava besleme sistemi mevcuttur.

3. Partially Enclosed Lifeboat: Kısmen kapalı sandal. Bazı yolcu gemilerinde kullanılır.

4. Freefall Lifeboat: Kıçtan serbest düşüşle denize bırakılan sandal. Tanker ve dökme yük gemilerinde yaygındır. Tahliye süresi çok kısadır (dakikalar yerine saniyeler).

SANDAL DONANIMI (SOLAS III/34):

- Motor ve yakıt (24 saat çalışma kapasitesi)
- Pusula ve sextant
- Tatlı su (3 litre/kişi) ve gıda tayını
- İlk yardım malzemesi
- İşaret fişekleri ve el feneri
- Radar reflektörü ve SART
- Yağmurluk ve termal koruma araçları
- Deniz çapası (sea anchor)
- Çamaşır suyu (su arıtma tableti)
- Oars (kürekler) - motorlu sandallarda da bulunur

KAPASİTE VE YERLEŞİM:

Her iki bordada toplam gemi personelinin %100'ünü alabileceek kapasite. Bir bordanın kullanılamaması durumunda bile tüm personel kurtarılabilmelidir.`,
    bulletPoints: [
      "TELB: tamamen kapalı, self-righting, SOLAS standardı",
      "Freefall lifeboat: tanker/bulk carrier, çok hızlı tahliye",
      "Her bordada %100 kapasite (SOLAS gereksinimi)",
      "24 saat motor çalışma kapasitesi, 3 L/kişi tatlı su",
    ],
    keyPoints: [
      "Freefall sandalın avantajı: tahliye süresi çok kısa",
      "SOLAS III/34: sandal zorunlu donanım listesi",
      "Haftada bir sandal motoru çalıştırılmalı ve donanım kontrolü yapılmalıdır",
    ],
  },
  "liferaft-types": {
    title: "Cankurtaran Salı ve SOLAS Gereksinimleri",
    introduction: "Cankurtaran salları, sandalların kullanılamaması durumunda hayatta kalma aracı olarak hizmet veren şişirilebilir veya rijit yapılardır.",
    content: `SAL TİPLERİ:

1. Inflatable Life Raft (Şişme Sal): En yaygın tiptir. Fiberglas kapsül (canister) içinde depolanır. Denize atıldığında veya hidrostatik serbest bırakma ile otomatik olarak şişer. Kapasite: 6-150 kişi.

2. Rigid Life Raft: Sert yapılı sal. Bakım gerektirmez ancak hacimli depolama alanı kaplar.

3. Davit-Launched Life Raft (DLRS): Vinçle denize indirilen sal. Yaşlı veya engelli yolcuların tahliyesinde avantaj sağlar.

HİDROSTATİK SERBEST BIRAKMA (HRU):

Gemi batarken sal otomatik olarak serbest bırakılır. Mekanizma 1,5-4 metre derinlikte su basıncıyla tetiklenir. Weak link (zayıf bağ) salı batan gemiden ayırır. HRU'lar her 2 yılda bir sertifikalı istasyonda servis edilmelidir.

SAL SERVİSİ:

Şişme sallar her 12 ayda (bazı üreticiler 30 ay) sertifikalı servis istasyonunda bakıma alınır. Bakımda şişirilir, donanım kontrol edilir ve yeniden paketlenir.`,
    bulletPoints: [
      "Inflatable life raft: en yaygın, canister içinde depolama",
      "HRU: 1,5-4 m derinlikte otomatik serbest bırakma",
      "HRU servisi: her 2 yılda bir",
      "Sal servisi: her 12 ayda bir (sertifikalı istasyon)",
    ],
    keyPoints: [
      "HRU sayesinde bilinç kaybı durumunda bile sal serbest kalır",
      "Weak link salı batan gemiden otomatik olarak ayırır",
    ],
  },
  "launching-procedure": {
    title: "Sandal ve Sal İndirme Prosedürü",
    introduction: "Tahlisiye araçlarının doğru prosedürle indirilmesi, tahliye operasyonunun başarısı için hayati önem taşır.",
    content: `SANDAL İNDİRME (CONVENTIONAL DAVIT):

1. Kaptan 'Abandon Ship' emri verir (7 kısa + 1 uzun düdük)
2. Mürettebat toplanma noktalarına (muster station) gider
3. Can yelekleri giyilir
4. Sandalın gripe'ları (sabitleyiciler) sökülür
5. Sandal dışa salınır (davit'ler dönürülür)
6. Personel sandala biner (boarding)
7. Painter (bağ halatı) kontrol edilir
8. Frapper'lar (fall wire) kontrollü bırakılarak sandal denize indirilir
9. Denize indikten sonra releasing hook tetiklenir (on-load release)
10. Painter kesilir ve sandaldan uzaklaşılır

FREEFALL İNDİRME:

1. Personel sandala biner ve emniyet kemeri bağlar
2. Kapak kapatılır
3. Serbest bırakma kolu çekilir
4. Sandal rampadan serbest düşüşle denize girer
5. Motor çalıştırılır ve uzaklaşılır

TATBİKATLAR (DRILLS):

SOLAS gereği her ay abandon ship tatbikatı yapılır. Her mürettebat 3 ayda bir fiili indirme tatbikatına katılmalıdır.`,
    bulletPoints: [
      "Abandon ship sinyali: 7 kısa + 1 uzun düdük",
      "On-load release: sandal denizde iken hook serbest bırakılır",
      "Freefall: emniyet kemeri zorunlu, çok hızlı tahliye",
      "Her ay tatbikat, 3 ayda bir fiili indirme (SOLAS)",
    ],
    warnings: [
      "On-load release mekanizması yanlış kullanımda kaza riski taşır; eğitim kritiktir",
      "Freefall sandala binmeden önce tüm personel emniyet kemerini bağlamalıdır",
    ],
  },
  "rescue-boat": {
    title: "Kurtarma Botu (Rescue Boat)",
    introduction: "Kurtarma botu, denize düşen kişinin kurtarılması ve acil müdahale amacıyla kullanılan hızlı tahlisiye aracıdır.",
    content: `KURTARMA BOTU ÖZELLİKLERİ (SOLAS III/17):

- Minimum 6 kişi kapasiteli
- En az 6 knot hız yapabilmeli
- 4 saat tam güçte çalışma kapasitesi
- Denize düşen kişiyi sudan çıkarma düzeneği (boarding ramp/scramble net)
- İlk yardım malzemesi
- Arama ışıldağı (searchlight)
- VHF telsiz
- Pusula

İNDİRME VE KULLANIM:

Kurtarma botu genellikle davit ile indirilir. Single-arm slewing davit veya A-frame davit yaygın tipleridir. İndirme süresi 5 dakikayı geçmemelidir.

Man overboard (denize adam düşmesi) durumunda kurtarma botu en hızlı müdahale aracıdır. Williamson turn veya Anderson turn ile geminin geri dönüşü sağlanırken, kurtarma botu hazırlanır.

TATBİKAT:

Her ay kurtarma botu tatbikatı yapılmalıdır. Kurtarma botu mürettebatı özel eğitimli olmalıdır.`,
    bulletPoints: [
      "Minimum 6 kişi kapasiteli, 6 knot hız",
      "İndirme süresi ≤ 5 dakika",
      "MOB durumunda birincil müdahale aracı",
      "Her ay tatbikat zorunludur",
    ],
    keyPoints: [
      "Williamson turn: 60° dönüş + karşı dümen → orijinal hatta dönüş",
      "Anderson turn: hızlı geri dönüş, kısa mesafede MOB yaklaşımı",
    ],
  },
  "life-saving-appliances": {
    title: "Kişisel Can Kurtarma Teçhizatı",
    introduction: "SOLAS Bölüm III, her gemide bulunması gereken kişisel can kurtarma araçlarını ve bunların standartlarını belirler.",
    content: `KİŞİSEL TEÇHİZAT:

Can Yeleği (Life Jacket): Her kişi için bir adet. Bilinçsiz kişiyi sırt üstü çevirebilmeli. Düdük ve ışık takılıdır. Çocuk yelekleri ayrıca bulundurulur.

Can Simidi (Lifebuoy): Köprüüstü ve güvertede stratejik noktalarda. Minimum 8 adet (>200 m gemiler için daha fazla). En az 2 tanesi self-igniting light (otomatik yanan ışık) ve self-activating smoke signal (duman sinyali) ile donatılmış. En az 2 tanesi buoyant lifeline (yüzer halat) bağlı.

Immersion Suit (Dalgıç Elbisesi): Soğuk sularda hipotermiden koruma. 1 saat boyunca vücut sıcaklığını koruyabilmeli. Her kişi için bulundurulması zorunludur (bazı seyir bölgelerinde).

Thermal Protective Aid (TPA): Varsayımsal olarak ılık sularda seyir yapan gemilerde immersion suit yerine kullanılabilir.

EPIRB (Emergency Position Indicating Radio Beacon): 406 MHz frekansında çalışır. GPS entegreli olarak pozisyon bilgisi gönderir. HRU ile otomatik serbest bırakılır. Bataryası 48 saat yayın yapar.

SART (Search and Rescue Transponder): 9 GHz radar sinyalini alarak yanıt verir. Radar ekranında 12 noktalı daire olarak görünür.`,
    bulletPoints: [
      "Can yeleği: bilinçsiz kişiyi sırt üstü çevirebilmeli",
      "Can simidi: minimum 8 adet, 2 tanesi ışık+duman sinyalli",
      "EPIRB: 406 MHz, GPS, HRU ile otomatik, 48 saat batarya",
      "SART: radar ekranında 12 noktalı daire olarak görünür",
    ],
    keyPoints: [
      "EPIRB ve SART birlikte kullanıldığında arama-kurtarma başarısı artar",
      "Immersion suit 1 saat boyunca vücut sıcaklığını korur",
    ],
  },
  "abandon-ship": {
    title: "Gemiyi Terk Etme Prosedürü",
    introduction: "Gemiyi terk etme, tüm diğer kurtarma yöntemleri tükendiğinde son çare olarak uygulanan hayatta kalma operasyonudur.",
    content: `TERK ETME KARARI:

Gemiyi terk etme kararı yalnızca kaptan tarafından verilir. Karar ancak geminin batma, yanma veya oturmaya devam edemeyecek durumda olduğu kesinleştiğinde verilmelidir. Prensip: 'Gemiyi terk etmek her zaman son çaredir.'

PROSEDÜR:

1. Kaptan MAYDAY çağrısı yapar
2. Genel alarm çalınır (7 kısa + 1 uzun düdük)
3. Mürettebat muster station'lara toplanır
4. Yoklama yapılır (muster list'e göre)
5. Can yelekleri giyilir
6. EPIRB ve SART aktive edilir
7. Tahlisiye araçları hazırlanır
8. Kaptan emri ile sandallara/sallara binilir
9. Araçlar denize indirilir
10. Gemiden güvenli mesafeye uzaklaşılır (en az 200 m)
11. Tahlisiye araçları bir arada tutulur
12. Hayatta kalma prosedürleri uygulanır

HAYATTA KALMA ÖNCELİKLERİ:

1. Koruma (soğuktan, sıcaktan, elemandan)
2. Pozisyon bildirimi (EPIRB, SART, işaret fişekleri)
3. Su (tatlı su tayını korunması)
4. Gıda
5. Morali yüksek tutmak

İşaret fişeklerinin kullanım zamanlaması kritiktir; gemi veya uçak görülmeden kullanılmamalıdır.`,
    bulletPoints: [
      "Terk kararı yalnızca kaptan tarafından verilir",
      "MAYDAY çağrısı + genel alarm (7 kısa + 1 uzun)",
      "Gemiden en az 200 m uzaklaşılmalıdır",
      "Hayatta kalma öncelikleri: koruma > pozisyon > su > gıda",
    ],
    warnings: [
      "Gemiyi terk etmek her zaman son çaredir",
      "İşaret fişekleri yalnızca kurtarma aracı görüldüğünde kullanılmalıdır",
    ],
  },

  // =====================================================
  // BÖLÜM 8 - YANGIN ÖNLEME VE SÖNDÜRME
  // =====================================================
  "fire-triangle": {
    title: "Yangın Üçgeni ve Yangın Sınıfları",
    introduction: "Yangın, ısı, yakıt ve oksijenin bir arada bulunmasıyla başlar; bu üç unsurun herhangi birini ortadan kaldırmak yangını söndürür.",
    content: `YANGIN ÜÇGENİ:

Üç unsur: Isı (Heat) + Yakıt (Fuel) + Oksijen (O₂). Modern anlayış buna kimyasal zincir reaksiyonunu da ekleyerek 'yangın dörtgeni' kavramını kullanır.

Söndürme prensipleri:
- Soğutma: Isıyı yok etmek (su)
- Boğma: Oksijeni kesmek (CO₂, foam, inert gas)
- Yakıtı uzaklaştırma: Yanıcı malzemeyi ayırmak
- Kimyasal inhibisyon: Zincir reaksiyonu kesmek (dry powder)

YANGIN SINIFLARI (IMO):

A Sınıfı: Katı maddeler (odun, kâğıt, tekstil). Söndürme: Su.
B Sınıfı: Yanıcı sıvılar (yakıt, boya, yağ). Söndürme: Köpük (foam), CO₂, kuru toz.
C Sınıfı: Yanıcı gazlar (LPG, doğalgaz). Söndürme: Kuru toz. Gaz kaynağı kapatılmalıdır.
D Sınıfı: Yanıcı metaller (magnezyum, alüminyum tozu). Söndürme: Özel kuru toz.
E Sınıfı (Elektrik yangını): Elektrikli ekipman. Söndürme: CO₂, kuru toz. Su kullanılmaz.
F Sınıfı: Pişirme yağları. Söndürme: Islak kimyasal (wet chemical).

KRİTİK KURAL: B sınıfı yangına su sıkılmaz (yanan sıvıyı sıçratır ve yayar).`,
    bulletPoints: [
      "Yangın üçgeni: Isı + Yakıt + Oksijen",
      "A sınıfı: katı → su, B sınıfı: sıvı → köpük/CO₂",
      "C sınıfı: gaz → kuru toz, gaz kaynağını kes",
      "Elektrik yangınında su kullanılmaz",
    ],
    warnings: [
      "B sınıfı yangına su sıkılmaz: yanan sıvı sıçrar ve yayılır",
      "Elektrik yangınında önce enerjisi kesilmeli, sonra CO₂ ile söndürülmeli",
    ],
  },
  "fire-detection": {
    title: "Yangın Algılama ve Alarm Sistemleri",
    introduction: "Erken algılama, gemide yangın kontrolünün en kritik aşamasıdır; SOLAS Bölüm II-2 yangın algılama sistemi gereksinimlerini belirler.",
    content: `ALGILAMA TÜRLERİ:

1. Duman Algılayıcı (Smoke Detector): İyonizasyon tipi veya fotoelektrik tip. Yaşam alanlarında ve koridorlarda zorunludur.

2. Isı Algılayıcı (Heat Detector): Sabit sıcaklık (68°C genellikle) veya artış hızı (rate-of-rise) tipi. Makine dairesi ve mutfakta kullanılır.

3. Alev Algılayıcı (Flame Detector): UV veya IR sensörlü. Makine dairesi ve açık güverte alanlarında kullanılır.

4. Manuel Alarm Noktası (Manual Call Point): Personelin yangını ihbar etmesi için kullanılan buton. Her kaçış yolunda ve güvertede bulunur.

YANGIN ALARM SİSTEMİ:

Merkezi yangın alarm paneli köprüüstünde veya yangın kontrol istasyonunda bulunur. Bölgesel alarm göstergesiyle yangın lokasyonu tespit edilir. Sesli ve görsel alarm tüm gemide duyulmalıdır.

YANGIN DEVRIYE VE GÖZETİM:

SOLAS gereği sürekli yangın gözetimi sağlanmalıdır. Yangın devriyesi (fire patrol) özellikle yolcu gemilerinde zorunludur.`,
    bulletPoints: [
      "Duman algılayıcı: yaşam alanları ve koridorlarda zorunlu",
      "Isı algılayıcı: makine dairesi ve mutfakta kullanılır",
      "Merkezi alarm paneli: köprüüstü veya yangın kontrol istasyonu",
      "Manuel alarm noktası: her kaçış yolunda bulunmalıdır",
    ],
  },
  "portable-extinguishers": {
    title: "Taşınabilir Söndürücüler",
    introduction: "Taşınabilir yangın söndürücüler, yangının başlangıç aşamasında ilk müdahale için kullanılan birincil söndürme araçlarıdır.",
    content: `SÖNDÜRÜCÜ TÜRLERİ:

1. CO₂ (Karbondioksit): B ve E sınıfı yangınlar. Oksijeni keserek söndürür. Kapalı alanda boğulma riski vardır. Elektrik yangınlarında güvenlidir.

2. Dry Chemical Powder (Kuru Toz): ABC tipi (çok amaçlı). Kimyasal inhibisyon ve boğma prensibiyle çalışır. Geniş kapsamlıdır ancak yeniden tutuşmayı engellemez.

3. Foam (Köpük): B sınıfı yangınlar (sıvı). Yüzeyi örtekerek oksijeni keser ve soğutur. AFFF (Aqueous Film Forming Foam) yaygın tiptir.

4. Water (Su): A sınıfı yangınlar. Soğutma prensibiyle çalışır.

YERLEŞİM VE BAKIM:

SOLAS II-2/10'a göre her kaçış yolunda, her yaşam alanında ve her makine dairesinde yeterli sayıda söndürücü bulunmalıdır. Söndürücüler yılda bir muayene edilmeli, basınç kontrolü yapılmalı ve her 5 yılda bir hidrostatik teste tabi tutulmalıdır.`,
    bulletPoints: [
      "CO₂: B ve E sınıfı, elektrik güvenli, kapalı alanda boğulma riski",
      "Kuru toz (ABC): çok amaçlı ancak yeniden tutuşmayı engellemez",
      "AFFF köpük: B sınıfı, yüzey örtme + soğutma",
      "Yıllık muayene + 5 yılda bir hidrostatik test zorunlu",
    ],
  },
  "fixed-systems": {
    title: "Sabit Söndürme Sistemleri (CO₂, Foam, Su)",
    introduction: "Sabit yangın söndürme sistemleri, makine dairesi, yük ambarları ve pompa daireleri gibi büyük alanlardaki yangınları kontrol altına almak için tasarlanmıştır.",
    content: `SABİT SİSTEMLER:

1. CO₂ Sistemi: Makine dairesi ve yük ambarlarında kullanılır. CO₂ tüpleri ayrı bir CO₂ odasında depolanır. Sistem tetiklendiğinde alanda bulunan tüm personelin tahliye edilmesi zorunludur (ölüm riski). Çift güvenlik mekanizması (two-man release) bulunur.

2. Foam Sistemi: Tanker güvertesi, helikopter güvertesi ve makine dairesi. High-expansion foam: büyük hacimli alanları doldurur. Low-expansion foam: sıvı yüzeyini örter.

3. Su Sisi Sistemi (Water Mist): İnce su tanecikleri ile soğutma ve oksijen seyreltme. Makine dairelerinde CO₂'ye alternatif olarak yaygınlaşmaktadır.

4. Sprinkler Sistemi: Yaşam alanlarında otomatik yangın söndürme. Isıyla tetiklenen cam ampul (bulb) mekanizması.

5. Drencher Sistemi: Güverte alanlarını su perdesiyle koruma. Yangının yayılmasını engeller.

MAKİNE DAİRESİ YANGININDA CO₂ PROSEDÜRÜ:

1. Alarm verilir ve tüm personel tahliye edilir
2. Tüm havalandırma fanları durdurulur ve damperler kapatılır
3. Yakıt kesme vanaları kapatılır
4. CO₂ alarm süresi (20-30 sn) beklenir
5. CO₂ salınır
6. Alan 24 saate kadar açılmamalıdır`,
    bulletPoints: [
      "CO₂ sistemi: ölümcül gaz, two-man release zorunlu",
      "High-expansion foam: büyük hacim doldurma",
      "Water mist: CO₂'ye modern alternatif",
      "Sprinkler: otomatik, ısıyla tetiklenen cam ampul",
    ],
    warnings: [
      "CO₂ salınımından önce tüm personelin alanı terk ettiği kesinleştirilmeli",
      "CO₂ alarm sinyali çaldığında alanı derhal terk edin",
    ],
  },
  "fire-fighting-procedure": {
    title: "Yangınla Mücadele Prosedürü",
    introduction: "Gemide yangın müdahalesi, organize ekip çalışması ve standart prosedürlerin uygulanmasını gerektirir.",
    content: `YANGIN MÜDAHALE ADIMLARI:

1. KEŞİF: Yangın tespit edilir ve alarm verilir.
2. ALARM: Yangın alarmı çalınır (sürekli çan veya genel alarm). Köprüüstü bilgilendirilir.
3. SINIRLANDIRMA: Yangın alanı izole edilir. Kapılar ve havalandırma kapatılır. Yangının yayılması engellenir.
4. SÖNDÜRME: Uygun söndürme aracıyla müdahale edilir. Yangın sınıfına göre doğru ajan seçilir.
5. SOĞUTMA: Yangın sonrası yeniden tutuşmayı önlemek için alan soğutulur.
6. GÖZETİM: Yangın tamamen söndükten sonra uzun süre gözetim yapılır (re-ignition kontrolü).

YANGIN EKİBİ ORGANİZASYONU (MUSTER LIST):

- Yangın ekibi lideri (genellikle Chief Officer)
- Hortum ekibi (nozzlemen + backup)
- Destek ekibi (EEBD/BA hazırlığı, hasar kontrolü)
- Makine ekibi (pompa, vana kontrolü, enerji yönetimi)
- Kurtarma ekibi (yaralı tahliye)
- İletişim görevlisi (köprüüstü-ekip arası)

YAŞAM DESTEK EKİPMANI:

BA (Breathing Apparatus): Müstakil solunum cihazı. Yangın alanına girişte zorunludur. 30-45 dakika hava kapasitesi.
EEBD (Emergency Escape Breathing Device): Kaçış solunum cihazı. 15 dakika kapasite. Sadece kaçış için kullanılır, yangına müdahale için kullanılmaz.
Fire suit (itfaiyeci elbisesi): Isıya dayanıklı giriş elbisesi. Yaklaşma elbisesi (proximity suit) ve giriş elbisesi (entry suit) olmak üzere iki tip.`,
    bulletPoints: [
      "Müdahale sırası: keşif → alarm → sınırlandırma → söndürme → soğutma → gözetim",
      "BA: 30-45 dk hava, yangın müdahalesinde zorunlu",
      "EEBD: 15 dk, sadece kaçış amaçlı",
      "Yangın sınıfına uygun söndürme ajanı seçimi kritiktir",
    ],
  },
  "fire-drill": {
    title: "Yangın Tatbikatları ve SOLAS Gereksinimleri",
    introduction: "SOLAS, tüm gemilerde düzenli yangın tatbikatları yapılmasını zorunlu kılar; tatbikatlar mürettebatın gerçek yangın durumunda etkin müdahale yeteneğini geliştirir.",
    content: `TATBİKAT GEREKSİNİMLERİ (SOLAS III/19):

Yangın tatbikatı en az ayda bir yapılmalıdır. Yeni mürettebat katılan ilk hafta içinde tatbikat yapılmalıdır. Tatbikat, mümkün olduğunca gerçekçi senaryolarla planlanmalıdır.

TATBİKAT İÇERİĞİ:

1. Yangın alarm sinyalinin tanınması
2. Muster station'a toplanma ve yoklama
3. Yangın hortumu açma ve su basma
4. Taşınabilir söndürücü kullanımı
5. BA giyimi ve kullanımı
6. Kapalı alan kurtarma tatbikatı
7. Yangın kapılarının ve damperlerinin kontrolü
8. Yangın pompa ve acil jeneratör çalıştırma

KAYIT VE DOKÜMANTASYON:

Tüm tatbikatlar jurnale kaydedilir. Tatbikat tarihi, senaryosu, katılımcıları ve değerlendirme notları yazılır. PSC denetimlerinde tatbikat kayıtları kontrol edilir. Eksik tatbikat kaydı, geminin alıkonulma (detention) sebebi olabilir.`,
    bulletPoints: [
      "Yangın tatbikatı: en az ayda bir (SOLAS III/19)",
      "Yeni mürettebat: ilk hafta içinde tatbikat zorunlu",
      "BA giyimi, hortum açma, söndürücü kullanımı tatbikat kapsamında",
      "Tüm tatbikatlar jurnale kaydedilir; PSC'de kontrol edilir",
    ],
  },

  // =====================================================
  // BÖLÜM 9 - VARDİYA VE KÖPRÜÜSTÜ DÜZENİ
  // =====================================================
  "stcw-watchkeeping": {
    title: "STCW Vardiya Standartları",
    introduction: "STCW sözleşmesi, güverte ve makine vardiya zabitlerinin dinlenme saatleri, yeterlilikleri ve vardiya düzeni standartlarını belirler.",
    content: `DİNLENME SÜRELERİ (STCW A-VIII/1):

Her 24 saatlik dönemde en az 10 saat dinlenme sağlanmalıdır.
Her 7 günlük dönemde en az 77 saat dinlenme sağlanmalıdır.
10 saatlik dinlenme en fazla iki bölüme ayrılabilir; bir bölüm en az 6 saat olmalıdır.

VARDİYA DÜZENİ:

Standart üç vardiya sistemi (4 saat vardiya, 8 saat dinlenme):
- 00:00-04:00 ve 12:00-16:00: İkinci zabit
- 04:00-08:00 ve 16:00-20:00: Üçüncü zabit
- 08:00-12:00 ve 20:00-24:00: Baş zabit

Liman vardiyası: Yük operasyonları sırasında özel vardiya düzeni uygulanır.

VARDİYA ZABİTİ SORUMLULUKLARI:

1. Güvenli seyir: Kerteriz, derinlik, hava durumu izleme
2. COLREG kurallarına uyum
3. Kayıtların tutulması (seyir jurnali)
4. Kaptan'a bilgi verme gereklilikleri
5. Makine ile koordinasyon`,
    bulletPoints: [
      "24 saatte en az 10 saat, 7 günde en az 77 saat dinlenme",
      "Dinlenme en fazla 2 bölüm; biri en az 6 saat olmalı",
      "Standart: 4 saat vardiya + 8 saat dinlenme",
    ],
    keyPoints: [
      "Dinlenme süreleri STCW zorunluluğudur; ihlali yasal yaptırım gerektirir",
      "Vardiya zabiti, vardiyası süresince seyir güvenliğinden sorumludur",
    ],
  },
  "bridge-organization": {
    title: "Köprüüstü Organizasyonu (BRM)",
    introduction: "Bridge Resource Management (BRM), köprüüstü ekibinin koordineli ve etkin çalışmasını sağlayan yönetim sistemidir.",
    content: `BRM İLKELERİ:

1. Ekip Çalışması: Kaptan, vardiya zabiti ve gözcü arasında açık iletişim ve görev paylaşımı.
2. Durum Farkındalığı (Situational Awareness): Geminin konumu, çevresi, trafik ve hava durumu hakkında sürekli farkındalık.
3. Karar Verme: Yapılandırılmış karar verme süreci; acele kararlardan kaçınma.
4. İletişim: Standart köprüüstü terminolojisi ve geri bildirim döngüsü (closed loop communication).

CLOSED LOOP COMMUNICATION:

Komut veren: "Starboard ten" (dümen sancağa on)
Uygulayan: "Starboard ten, Sir" (sancağa on, efendim)
Komut veren: Dümen açı göstergesini doğrular

KRİTİK DURUMLAR:

BRM eğitimi, junior personelin (düşük rütbeli) kaptanı veya kıdemli zabiti gerektiğinde uyarabilmesini (challenge) teşvik eder. Hiyerarşik korkudan kaynaklanan kazaların önlenmesi için bu kültür geliştirilmelidir.`,
    bulletPoints: [
      "BRM: ekip çalışması, durum farkındalığı, iletişim, karar verme",
      "Closed loop communication: komut → tekrar → doğrulama",
      "Junior personelin kıdemlileri uyarabilmesi teşvik edilir",
    ],
    keyPoints: [
      "Birçok deniz kazası BRM eksikliğinden kaynaklanmaktadır",
      "Situational awareness kaybı en sık kaza nedenidir",
    ],
  },
  "lookout-duty": {
    title: "Gözcülük Görevleri ve Sorumlulukları",
    introduction: "COLREG Kural 5 gereği, her gemi her zaman uygun gözcülük (proper look-out) yapmakla yükümlüdür.",
    content: `COLREG KURAL 5 - GÖZCÜLÜK:

'Her gemi, daima, görme ve işitme yoluyla ve mevcut koşullara ve duruma uygun her araçla, tam bir gözcülük yapacaktır.'

GÖZCÜLÜK İLKELERİ:

1. Görsel gözcülük: Çıplak göz ve dürbün ile sürekli ufuk taraması
2. İşitsel gözcülük: Sis düdükleri, alarm sesleri, deniz sesleri
3. Radar gözcülüğü: Radar ve ARPA ile sistematik izleme
4. AIS takibi: Çevredeki gemilerin tanımlanması
5. VHF dinleme: Kanal 16 ve trafik kanalları

GÖZCÜ GÖREVLERİ:

- Tüm nesneleri (gemi, engel, sürüklenen cisim, insanlar) raporlamak
- Seyir fenerleri ve işaretlerini tanımlamak
- Köprüüstündeki vardiya zabitine derhal bilgi vermek
- Kaçış yollarını ve güvenlik donanımını bilmek

GÖZCÜLÜKTEn MUAF TUTULMAMA:

Hiçbir koşulda gözcülük görevi başka bir görevle birleştirilemez. Dümen tutarak gözcülük yapılması STCW ve COLREG ihlalidir (bazı istisnalar dışında).`,
    bulletPoints: [
      "COLREG Kural 5: her gemi her zaman tam gözcülük yapacaktır",
      "Gözcülük: görsel + işitsel + radar + AIS + VHF",
      "Gözcü görevi başka görevle birleştirilemez (genel kural)",
      "Dümen tutarken gözcülük: COLREG ihlali (istisnalar hariç)",
    ],
  },
  "watch-handover": {
    title: "Vardiya Devir Teslimi",
    introduction: "Vardiya devir teslimi, seyir güvenliğinin kesintisiz sürdürülmesi için standart prosedüre uygun olarak yapılmalıdır.",
    content: `DEVİR TESLİM SÜRECİ:

Gelen vardiya zabiti, vardiyayı devralmadan önce aşağıdaki bilgileri almalıdır:

1. Geminin mevcut pozisyonu ve kerterizi
2. Planlanan rota ve sonraki waypoint
3. Hız ve makine durumu
4. Çevredeki trafik (gemiler, balıkçılar)
5. Hava ve deniz durumu
6. Gelgit ve akıntı bilgisi
7. Seyir uyarıları (NAVTEX, NAVAREA)
8. Kaptanın özel talimatları
9. Ekipman arızaları (varsa)
10. Seyir planı ve harita durumu

DEVİR ALMA KOŞULLARI:

Vardiya zabiti, aşağıdaki durumlarda vardiyayı devralmamalıdır:
- Gözleri karanlığa adapte olmamışsa (gece)
- Durumun tam farkına varamamışsa
- Manevra veya tehlike anında (manevra tamamlanana kadar beklenmeli)

SOLAS ve STCW, vardiya devrinin kayıt altına alınmasını gerektirir.`,
    bulletPoints: [
      "Devir teslimde 10 temel bilgi aktarılmalıdır",
      "Gözler karanlığa adapte olmadan gece vardiyası devralınmaz",
      "Manevra anında vardiya devri yapılmaz",
      "Devir teslim kayıt altına alınmalıdır (STCW)",
    ],
  },
  "night-vision": {
    title: "Gece Görüşü ve Köprüüstü Karartması",
    introduction: "Gece seyri sırasında gözcülüğün etkinliği, gözlerin karanlık adaptasyonu ve köprüüstü aydınlatma disiplinine bağlıdır.",
    content: `KARANLIK ADAPTASYONU:

İnsan gözünün karanlığa tam adaptasyonu yaklaşık 20-30 dakika sürer. Beyaz ışığa kısa süreli maruz kalmak bile adaptasyonu bozar ve yeniden 20-30 dakikalık süre gerektirir.

KÖPRÜÜSTÜ KARARTMASI:

Gece seyirde köprüüstü ışıkları kırmızıya alınır. Kırmızı ışık, gözün karanlık adaptasyonunu minimum düzeyde etkiler. Harita aydınlatması da kırmızı filtrelidir.

PRATİK KURALLAR:

- Köprüüstüne girmeden önce gözlerin adapte edilmesi için beklenmeli
- Beyaz ışıklı ekranların parlaklığı minimuma düşürülmeli
- Radar ekranına uzun süre bakmak adaptasyonu bozar; periyodik olarak ufka bakılmalı
- Bir gözün kapatılarak korunması eski ama etkili bir tekniktir
- Parlak ışık kaynağından sonra kırmızı ışıkta en az 10 dakika beklenilmeli`,
    bulletPoints: [
      "Karanlık adaptasyonu: 20-30 dakika",
      "Beyaz ışık adaptasyonu anında bozar",
      "Kırmızı ışık adaptasyonu minimum etkiler",
      "Radar ekranına uzun bakış adaptasyonu bozar",
    ],
  },

  // =====================================================
  // BÖLÜM 10 - AĞIR HAVADA GEMİCİLİK
  // =====================================================
  "heavy-weather-prep": {
    title: "Fırtına Hazırlıkları (Sea Securing)",
    introduction: "Ağır hava öncesinde geminin denize hazırlanması (sea securing), can ve mal güvenliği açısından hayati bir operasyondur.",
    content: `FIRTINA HAZIRLIK KONTROL LİSTESİ:

GÜVERTE:
- Tüm ambar kapakları kontrol edilir ve sıkıca kapatılır
- Havalandırıcı kapaklarının kapalı olduğu doğrulanır
- Güvertedeki serbest malzemeler (boya tenekeleri, fıçılar, iskele) sabitlenir
- Güverte drenaj deliklerinin (scuppers) açık olduğu kontrol edilir
- Korkuluklar ve güverte aydınlatması kontrol edilir
- Güverte geçiş yasakları belirlenir (lifeline kurulumu)

YÜK VE AMBAR:
- Yük bağlama (lashing) kontrolü yapılır, gerekirse ek bağlama eklenir
- Ambar havalandırma kapatılır
- Tanklardaki serbest yüzey etkisi minimize edilir (tanklar dolu veya boş)

MAKİNE DAİRESİ:
- Tüm hareketli parçalar sabitlenir
- Sintine pompası kontrol edilir
- Yakıt transfer planı gözden geçirilir

KÖPRÜüSTü:
- Hava tahminleri güncellenir
- Rota alternatiffleri değerlendirilir
- NAVTEX/GMDSS uyarıları izlenir

Kaptan, ağır hava beklentisinde 'Heavy Weather Preparedness' sirküleri yayınlar ve tüm departmanları bilgilendirir.`,
    bulletPoints: [
      "Ambar kapakları, havalandırıcılar, scupper'lar kontrol edilir",
      "Güvertedeki serbest malzemeler sabitlenir",
      "Serbest yüzey etkisi minimize edilir (tanklar dolu veya boş)",
      "Lifeline kurulumu ile güverte geçiş güvenliği sağlanır",
    ],
    warnings: [
      "Fırtınada güverteye çıkış kaptanın izni olmadan yasaktır",
      "Serbest yüzey etkisi stabilite kaybının başlıca nedenidir",
    ],
  },
  "parametric-rolling": {
    title: "Parametrik Salınım",
    introduction: "Parametrik salınım, dalga karşılaşma periyodunun geminin doğal salınım periyodunun yarısına eşit olduğu durumda gelişen tehlikeli yalpa hareketidir.",
    content: `MEKANİZMA:

Parametrik salınım, geminin su hattı alanının (waterplane area) dalga geçişi sırasında periyodik olarak değişmesinden kaynaklanır. Dalga tepesi gemi ortasında iken su hattı alanı azalır (GM düşer), dalga çukurunda iken su hattı alanı artar (GM artar). Bu GM değişimi belirli koşullarda rezonans yaratır.

TEHLİKE KOŞULLARI:

- Dalga karşılaşma periyodu ≈ geminin doğal salınım periyodunun yarısı (Te ≈ Tr/2)
- Dalga yüksekliği geminin genişliğinin %40'ından fazla
- Pruva ve kıçta belirgin flare (genişleme) olan gemilerde daha sık

ETKİLENEN GEMİ TİPLERİ:

Özellikle konteyner gemileri, büyük C11 tipi post-Panamax konteyner gemileri ve Ro-Ro gemileri parametrik salınıma duyarlıdır. 2000'li yıllardaki ciddi konteyner kaybı kazaları bu fenomene bağlanmıştır.

KAÇINMA STRATEJİLERİ:

1. Hız değiştirmek (karşılaşma periyodunu değiştirmek için)
2. Rota değiştirmek (dalga açısını değiştirmek)
3. Dalga radarı ve tahmin yazılımları ile izleme
4. Anti-rolling tank veya fin stabilizer kullanımı`,
    formula: {
      name: "Parametrik Rezonans Koşulu",
      expression: "Te ≈ Tr / 2",
      description: "Te: dalga karşılaşma periyodu (s), Tr: geminin doğal salınım periyodu (s). Bu koşul sağlandığında parametrik salınım riski vardır.",
    },
    bulletPoints: [
      "Te ≈ Tr/2 koşulunda parametrik rezonans gelişir",
      "Konteyner ve Ro-Ro gemileri en duyarlı tiplerdir",
      "Kaçınma: hız veya rota değiştirerek Te'yi değiştirmek",
      "GM'nin dalga geçişiyle periyodik değişimi tetikleyicidir",
    ],
    warnings: [
      "Parametrik salınım 30°+ yalpa açılarına ulaşabilir; konteyner kaybı ve devrilme riski",
      "Baş veya kıçtan gelen uzun dalgalarda özellikle dikkat edilmelidir",
    ],
  },
  "synchronous-rolling": {
    title: "Senkron Salınım ve Broaching",
    introduction: "Senkron salınım, dalga karşılaşma periyodunun geminin doğal salınım periyoduna eşit olduğu durumda gelişen tehlikeli rezonans halidir.",
    content: `SENKRON SALINIM:

Dalga karşılaşma periyodu (Te) geminin doğal yalpa periyoduna (Tr) eşit olduğunda, her dalga geminin salınımını artırır (rezonans). Yalpa açıları giderek büyür ve devrilme noktasına yaklaşabilir.

Te = Tr → Senkron salınım

BROACHING:

Broaching, geminin kıçtan veya kıç omuzluktan gelen dalga etkisiyle kontrolsüz şekilde dönmesi (yaw) ve enine dalgaya yakalanmasıdır. Genellikle dalgayla aynı yönde ve benzer hızda seyirde oluşur. Dümen kontrolü kaybedilir.

KAÇINMA:

Senkron salınımdan kaçınma:
- Hız değiştirerek karşılaşma periyodunu değiştirmek
- Rota değiştirerek dalga açısını değiştirmek
- Tankları kullanarak GM'yi değiştirmek

Broaching'den kaçınma:
- Kıçtan dalga almaktan kaçınmak
- Hızı azaltmak (dalga hızının altına düşürmek)
- Aktif dümen kullanımı`,
    bulletPoints: [
      "Te = Tr → senkron salınım (rezonans), yalpa açıları büyür",
      "Broaching: kıçtan dalga ile kontrolsüz dönüş, dümen kaybı",
      "Hız ve rota değişikliği her iki tehlike için de çözümdür",
    ],
    warnings: [
      "Senkron salınımda devrilme riski vardır",
      "Broaching küçük ve orta boy gemilerde daha sık yaşanır",
    ],
  },
  "heavy-weather-nav": {
    title: "Fırtınada Seyir Stratejileri",
    introduction: "Ağır havada seyir, gemi güvenliği ve yapısal bütünlüğü korumak için özel stratejiler ve hız/rota kararları gerektirir.",
    content: `SEYİR STRATEJİLERİ:

1. HEAVING TO (Yatarak Bekleme): Pruva dalga yönüne döndürülür, düşük devir ile pozisyon korunur. En yaygın fırtına stratejisi. Dalga etkisini minimuma indirir.

2. RUNNING BEFORE THE SEA: Dalgayla aynı yönde seyir. Broaching riski vardır ancak bazı durumlarda tercih edilir. Hız dalgadan düşük tutulmalıdır.

3. DODGING: Dalgaya 30-45° açıyla ilerleme. Yalpa ve baş dalma arasında denge sağlar.

4. LYING AHULL: Makine durdurulur, gemi dalgaya bırakılır. Son çaredir; yalnızca makine arızası durumunda uygulanır.

HIZ AZALTMA NEDENLERİ:

- Aşırı baş dalma (bow diving/slamming) önleme
- Yeşil deniz (green water on deck) önleme
- Pervane yarışması (racing) önleme
- Yapısal stres azaltma
- Parametrik/senkron salınım kaçınma

Hız azaltma kararı, kaptanın deneyimine ve mevcut koşullara bağlıdır. Genel kural olarak gemi şiddetli darbeler (slamming) almaya başladığında hız derhal düşürülmelidir.`,
    bulletPoints: [
      "Heaving to: pruva dalga yönüne, düşük devir, en yaygın strateji",
      "Running: dalgayla seyir, broaching riski",
      "Dodging: dalga açısı 30-45°, dengeli yaklaşım",
      "Slamming başladığında hız derhal düşürülmeli",
    ],
  },
  "pooping-bow-dive": {
    title: "Kıç Dalma (Pooping) ve Pruva Dalma",
    introduction: "Pooping ve pruva dalma, ağır havada gemi güvenliğini doğrudan tehdit eden ciddi deniz olaylarıdır.",
    content: `POOPING (KIÇ DALMA):

Kıçtan gelen dalganın güverteyi aşarak kıç güvertesini kaplamasıdır. Risk faktörleri:
- Dalgayla aynı yönde seyir (kıçtan dalga)
- Yüksek dalga ve düşük freeboard
- Hız dalga hızına yakın

Sonuçları:
- Kıç güvertesinde hasar
- Dümen ve pervane hasarı
- Makine dairesi su alması
- Personel güvenliği riski

BOW DIVING (PRUVA DALMA):

Pruvanın dalga içine girmesi ve güvertenin su altında kalmasıdır. Yüksek hızda dalgaya karşı seyirde oluşur. Slamming (çarpma) pruva yapısında ciddi hasara yol açabilir.

ÖNLEYİCİ TEDBİRLER:

Pooping için: Kıçtan dalga almaktan kaçın, hızı düşür veya rota değiştir
Pruva dalma için: Hızı düşür, dalgaya açı ver, baş trimi azalt`,
    bulletPoints: [
      "Pooping: kıçtan dalga güverteyi kaplar, dümen/pervane hasarı riski",
      "Slamming: pruvanın dalgaya çarpması, yapısal hasar",
      "Hız azaltma her iki durum için birincil önlemdir",
    ],
    warnings: [
      "Pooping sırasında kıç güvertede bulunan personel dalga ile sürüklenebilir",
      "Şiddetli slamming geminin omurga yapısında kalıcı hasar oluşturabilir",
    ],
  },
  "damage-assessment": {
    title: "Fırtına Hasarı Değerlendirmesi",
    introduction: "Fırtına sonrası hasar değerlendirmesi, geminin seyir güvenliğinin ve yapısal bütünlüğünün teyit edilmesi için sistematik olarak yapılmalıdır.",
    content: `HASAR DEĞERLENDİRME ADIMLARI:

1. PERSONEL GÜVENLİĞİ: Öncelikli olarak tüm personelin durumu kontrol edilir.

2. SU GEÇİRMEZLİK: Ambar kapakları, tank soundingleri ve sintine seviyeleri kontrol edilir. Su girişi tespit edilirse boşaltma (pumping) başlatılır.

3. YAPISAL KONTROL: Güverte, borda, ambar coamingleri ve üst yapı görsel olarak incelenir. Çatlak, deformasyon, bükülme aranır.

4. YÜK KONTROLÜ: Yük bağlamalarının durumu kontrol edilir. Yük kayması veya hasar belirtileri aranır.

5. DONANIM KONTROLÜ: Seyir cihazları, haberleşme ekipmanları, dümen ve makine sistemleri fonksiyonel olarak test edilir.

6. RAPORLAMA: Kaptan, deniz protestosu (sea protest/note of protest) hazırlar. P&I Club'a ve işletene durum raporu gönderilir.

DENİZ PROTESTOSU:

Varış limanında noter veya yetkili makam huzurunda düzenlenir. Fırtına koşullarını, alınan tedbirleri ve oluşan hasarı belgeler. Yük hasarı taleplerinde kaptan ve gemiyi koruyucu hukuki belgedir.`,
    bulletPoints: [
      "Öncelik: personel güvenliği > su geçirmezlik > yapısal > yük > donanım",
      "Tank sounding ve sintine seviyesi su girişini tespit eder",
      "Deniz protestosu (sea protest) hukuki koruma belgesidir",
      "P&I Club'a durum raporu derhal gönderilir",
    ],
  },

  // =====================================================
  // BÖLÜM 11 - ÇEKME VE KURTARMA
  // =====================================================
  "towing-principles": {
    title: "Çekme Prensipleri ve Kuvvetleri",
    introduction: "Denizde çekme operasyonları, çekilen geminin veya objenin ağırlığına, hız ve deniz koşullarına bağlı kuvvetlerin doğru hesaplanmasını gerektirir.",
    content: `ÇEKME KUVVETLERİ:

Çekme kuvveti (bollard pull), römorkörün sabit durumda ürettiği çekme kapasitesidir ve ton cinsinden ifade edilir. Denizde çekme sırasında toplam direnç, hız ve deniz koşullarıyla artar.

ÇEKMENİN TEMEL PRENSİPLERİ:

1. Çekme halatı (towline) yeterli uzunlukta olmalıdır (catenary oluşturmak için)
2. Catenary: Halatın yerçekimiyle oluşturduğu eğri. Şok yüklerini absorbe eder.
3. Çekme hızı, çekilen geminin direncine ve deniz koşullarına göre ayarlanır
4. Çekme rotası, hava ve akıntı yönü dikkate alınarak planlanır

ÇEKİLEN GEMİDE ALINACAK TEDBİRLER:

- Dümen ortalanmalı veya kilitlenelidir
- Seyir fenerleri ve gündüz işaretleri gösterilmeli
- Çekme bağlantı noktası (towing bitts/bollard) dayanımı kontrol edilmeli
- Acil durumda towline'ın kesilmesi için balta hazır bulundurulmalı`,
    bulletPoints: [
      "Bollard pull: römorkörün sabit çekme kapasitesi (ton)",
      "Catenary: halat eğrisi, şok yüklerini absorbe eder",
      "Çekme hızı genellikle 4-6 knot arasında tutulur",
      "Towline yeterli uzunlukta olmalı (catenary için)",
    ],
    warnings: [
      "Çekme halatı koptuğunda geri tepme (snapback) ölümcül tehlike oluşturur",
    ],
  },
  "towing-gear": {
    title: "Çekme Donanımı ve Düzenlemesi",
    introduction: "Çekme donanımı, çekme operasyonunun güvenli ve verimli yürütülmesi için tasarlanmış özel ekipman ve düzenlemedir.",
    content: `ÇEKME DONANIMININ BİLEŞENLERİ:

1. Towline (Çekme Halatı): HMPE, naylon veya çelik tel olabilir. Açık deniz çekmelerinde genellikle çelik tel + sentetik tail (kuyruk) kombinasyonu kullanılır. Tail esneklik sağlar.

2. Towing Bridle (Çekme Yayılma): Çekme kuvvetini iki noktaya dağıtan V şekilli düzenleme.

3. Towing Pendant: Çekme gemisi ile çekilen gemi arasındaki bağlantı zinciri veya teli.

4. Emergency Towing Arrangement: SOLAS gereği 20.000 GT üzeri tanker ve 500 GT üzeri diğer gemilerde zorunlu acil çekme donanımı.

ÇEKME DÜZENLEMELERİ:

Kısa mesafe çekme (harbour tow): Kısa towline, düşük hız, römorkör kontrolü.
Açık deniz çekmesi (ocean tow): Uzun towline (500-1000 m), catenary önemli, çekme süresi günler sürebilir.

CHAFING PROTECTION:

Çekme halatı gemi yapısıyla temas ettiği noktalarda aşınmaya karşı korunmalıdır. Fairlead, roller ve chafing gear kullanılır.`,
    bulletPoints: [
      "Çelik tel + sentetik tail kombinasyonu açık deniz standardıdır",
      "Towing bridle: kuvveti iki noktaya dağıtır",
      "SOLAS: 20.000 GT+ tankerlerde emergency towing arrangement zorunlu",
      "Açık deniz çekmesinde towline 500-1000 m uzunluğunda",
    ],
  },
  "emergency-towing": {
    title: "Acil Çekme Prosedürü",
    introduction: "Acil çekme, makine arızası veya diğer acil durumlarda geminin güvenli bir yere çekilmesi için uygulanan prosedürdür.",
    content: `ACİL ÇEKME DURUMU:

Makine arızası, dümen kaybı veya diğer nedenlerle gemi manevra kabiliyetini kaybettiğinde acil çekme gerekebilir. Özellikle kıyıya yakın ve yoğun trafikli bölgelerde aciliyet artar.

EMERGENCY TOWING ARRANGEMENT (ETA):

SOLAS gereği belirli tonajın üzerindeki gemilerde ETA bulunmalıdır. Bu düzenleme, geminin pruva ve kıçında önceden hazırlanmış çekme bağlantı noktalarını içerir. Römorkör geldiğinde hızla bağlantı kurulabilmeli.

PROSEDÜR:

1. Acil durum ilan edilir; MAYDAY veya PAN PAN çağrısı yapılır
2. Demir atılabiliyorsa atılır (sürüklenmeyi yavaşlatmak için)
3. Kıyı Koruma veya kurtarma koordinasyon merkezi ile iletişim kurulur
4. Römorkör gelene kadar pozisyon ve sürüklenme izlenir
5. Çekme bağlantısı kurulur (heaving line → messenger → towline)
6. Güvenli limana veya demirliğe çekilir

SALVAGE vs TOW:

Salvage (kurtarma): Tehlike altındaki geminin kurtarılması; kurtarma ücreti yüksektir (LOF - Lloyd's Open Form).
Towage (çekme): Sözleşmeye dayalı ticari çekme hizmeti.`,
    bulletPoints: [
      "ETA: gemide önceden hazırlanmış acil çekme bağlantı noktaları",
      "Makine kaybında ilk adım: demir atarak sürüklenmeyi yavaşlatmak",
      "LOF: Lloyd's Open Form, standart kurtarma sözleşmesi",
      "Salvage ≠ Towage: kurtarma hukuki, çekme ticari hizmettir",
    ],
  },
  "salvage-law": {
    title: "Kurtarma Hukuku Temel İlkeleri",
    introduction: "Denizde kurtarma hukuku, tehlike altındaki gemilerin kurtarılmasını teşvik eden ve kurtaranın haklarını koruyan uluslararası hukuk dalıdır.",
    content: `TEMEL İLKELER:

1. 'No cure, no pay' (Kurtarma yok, ödeme yok): Geleneksel prensip. Kurtarma başarısız olursa ücret ödenmez. Lloyd's Open Form (LOF) bu prensibe dayanır.

2. 1989 Uluslararası Kurtarma Sözleşmesi: Çevre kirliliğinin önlenmesi için yapılan çalışmalara da ücret ödenmesini öngörür (Special Compensation).

3. Kurtarma ücreti, kurtarılan geminin ve yükün değerini aşamaz.

KAPTANIN SORUMLULUKLARI:

- Tehlike altındaki gemilere yardım etme yükümlülüğü (SOLAS V/33)
- Kurtarma sözleşmesi imzalama yetkisi
- Yardım talep etme (PAN PAN / MAYDAY)

LOF (LLOYD'S OPEN FORM):

Dünya'nın en yaygın kurtarma sözleşmesidir. Kurtarma ücreti sonradan tahkim (arbitration) yoluyla belirlenir. London Maritime Arbitrators Association (LMAA) tahkim yapar.

SCOPIC CLAUSE:

LOF'a eklenen özel tazminat maddesidir. Kurtarma başarısız olsa bile çevre koruma çalışmaları için ücret ödenmesini garanti eder.`,
    bulletPoints: [
      "No cure, no pay: kurtarma başarısız olursa ücret yok",
      "LOF: en yaygın kurtarma sözleşmesi, tahkim sistemi",
      "SOLAS V/33: tehlike altındaki gemilere yardım yükümlülüğü",
      "SCOPIC: çevre koruma çalışmaları için tazminat garantisi",
    ],
  },
  "grounding-response": {
    title: "Karaya Oturma ve Kurtarma",
    introduction: "Karaya oturma, geminin deniz tabanına veya kıyıya oturmasıdır; müdahale hızı ve doğru kararlar geminin kurtarılmasını belirler.",
    content: `İLK MÜDAHALE ADIMLARI:

1. MAKİNE DURDURULUR: Pervane dönüşü zemin hasarını artırabilir.
2. Hasar kontrolü: Tüm tanklar sounding edilir, su girişi kontrol edilir.
3. Pozisyon ve oturma durumu belirlenir (draft okumaları).
4. Gelgit durumu kontrol edilir.
5. P&I Club ve işleten bilgilendirilir.
6. Gerekiyorsa kıyı devletine bildirim yapılır (kirlilik riski).

KURTARMA YÖNTEMLERİ:

1. Kendi gücüyle kurtulma (refloating): Balast değişikliği, trim ayarı, makine gücü. Gelgit yükselmesinden faydalanılır.
2. Römorkör yardımı: Dış çekme kuvveti ile çıkarma.
3. Yük boşaltma (lightening): Yük, yakıt veya balast boşaltılarak draftı azaltmak.
4. Dredging: Gemi çevresinin kazılması.

ÇEVRE RİSKİ:

Karaya oturma durumunda yakıt sızıntısı ve çevre kirliliği en büyük risk faktörüdür. SOPEP (Shipboard Oil Pollution Emergency Plan) devreye girer. Kirlilik riski varsa derhal kıyı devletine bildirim yapılmalıdır.`,
    bulletPoints: [
      "İlk adım: makineyi durdur, zemin hasarını artırma",
      "Tank sounding ile su girişi kontrol edilir",
      "Gelgit yükselişi kurtulma şansını artırır",
      "SOPEP: yakıt sızıntısı acil eylem planı",
    ],
    warnings: [
      "Oturma durumunda makine gücü kullanmadan önce zemin ve hasar durumu değerlendirilmeli",
      "Kontrolsüz refloating girişimi gemide ek hasara yol açabilir",
    ],
  },

  // =====================================================
  // BÖLÜM 12 - GEMİCİLİK KURALLARI VE UYGULAMALAR
  // =====================================================
  "colreg-basic": {
    title: "COLREG Temel Kuralları",
    introduction: "COLREG (Collision Regulations), denizde çatışmayı önlemek amacıyla tüm gemilerin uyması gereken uluslararası kurallar bütünüdür.",
    content: `COLREG'İN YAPISI:

COLREG 1972 (International Regulations for Preventing Collisions at Sea) beş bölüm ve 41 kuraldan oluşur:

Bölüm A: Genel (Kural 1-3): Uygulama alanı ve tanımlar
Bölüm B: Yön ve seyir kuralları (Kural 4-19): Manevra kuralları
Bölüm C: Fenerler ve işaretler (Kural 20-31): Seyir fenerleri
Bölüm D: Ses ve ışık sinyalleri (Kural 32-37)
Bölüm E: Muafiyetler (Kural 38)

KRİTİK KURALLAR:

Kural 5 - Gözcülük: Her zaman uygun gözcülük yapılacaktır.
Kural 7 - Çatışma tehlikesi: Kerteriz değişmiyorsa çatışma tehlikesi vardır.
Kural 8 - Çatışmadan kaçınma: Manevra erken, belirgin ve geniş açıyla yapılacaktır.
Kural 13 - Geçme (Overtaking): Geçen gemi yol vermekle yükümlüdür.
Kural 14 - Karşı karşıya geliş: Her iki gemi sancağa döner.
Kural 15 - Çaprazlama: Sancak tarafından gelen gemiye yol verilir.
Kural 18 - Gemiler arası sorumluluk: Manevra kabiliyetine göre öncelik sırası.`,
    bulletPoints: [
      "Kural 7: kerteriz değişmiyorsa çatışma tehlikesi var",
      "Kural 8: manevra erken, belirgin ve geniş açıyla",
      "Kural 14: karşıdan geliş → her iki gemi sancağa döner",
      "Kural 15: sancaktan gelen gemiye yol verilir",
    ],
    keyPoints: [
      "COLREG tüm deniz alanlarında geçerlidir",
      "Kural 2: hiçbir kural iyi denizcilik uygulamasından muaf tutmaz",
    ],
  },
  "buoyage-iala": {
    title: "IALA Şamandıra Sistemi",
    introduction: "IALA (International Association of Marine Aids to Navigation) şamandıra sistemi, seyir yardımcılarının dünya genelinde standart olarak uygulanmasını sağlar.",
    content: `IALA BÖLGELERİ:

Bölge A: Avrupa, Afrika, Asya'nın büyük bölümü, Avustralya
Bölge B: Kuzey/Güney Amerika, Japonya, Kore, Filipinler

İki bölge arasındaki fark, yanal (lateral) işaretlerin renk anlamlarının ters olmasıdır.

ŞAMANDIRA TİPLERİ:

1. Yanal İşaretler (Lateral Marks):
   Bölge A: Kırmızı = iskele (sol), Yeşil = sancak (sağ) [limana girerken]
   Bölge B: Tam tersi

2. Kardinal İşaretler (Cardinal Marks):
   Kuzey: Üstte iki yukarı ok → tehlikenin kuzeyinden geç
   Güney: Üstte iki aşağı ok → güneyinden geç
   Doğu: Üstte yukarı+aşağı → doğusundan geç
   Batı: Üstte aşağı+yukarı → batısından geç

3. Ayrılmış Tehlike İşareti (Isolated Danger): Siyah-kırmızı-siyah yatay çizgili. Tehlike üzerinde konumlandırılır.

4. Güvenli Su İşareti (Safe Water): Kırmızı-beyaz dikey çizgili. Güvenli su bölgesini gösterir. Yaklaşma işareti olarak kullanılır.

5. Özel İşaret (Special Mark): Sarı renkli. Özel alan sınırlarını belirtir.`,
    bulletPoints: [
      "Bölge A: kırmızı = iskele, yeşil = sancak (limana girerken)",
      "Bölge B: renk anlamları ters",
      "Kardinal işaretler: tehlikenin hangi tarafından geçileceğini belirtir",
      "Güvenli su işareti: kırmızı-beyaz dikey çizgili, yaklaşma işareti",
    ],
    keyPoints: [
      "IALA bölgesini bilmek yanal işaretleri doğru yorumlamak için zorunludur",
      "Kardinal işaretlerin tepe şekilleri yönü belirler",
    ],
  },
  "flag-signals": {
    title: "Uluslararası Bayrak İşaretleri",
    introduction: "Uluslararası İşaret Bayrakları (International Code of Signals), gemiler arasında evrensel bir görsel haberleşme sistemidir.",
    content: `BAYRAK SİSTEMİ:

26 harf bayrağı, 10 sayı flaması, 3 ikame flaması ve 1 yanıt flamasından oluşur. Her bayrak tek başına veya kombinasyonlarla mesaj iletir.

TEK BAYRAK ANLAMI (EN ÖNEMLİLER):

A (Alfa): Dalgıcım var, uzak durunuz
B (Bravo): Tehlikeli yük alıyorum/boşaltıyorum/taşıyorum
C (Charlie): Evet (olumlu)
D (Delta): Manevra güçlüğüm var, uzak durunuz
G (Golf): Kılavuz istiyorum
H (Hotel): Kılavuzum var
L (Lima): Derhal durunuz
N (November): Hayır (olumsuz)
O (Oscar): Denize adam düştü
P (Papa): Tüm personel gemiye! (Blue Peter - hareket hazırlığı)
Q (Quebec): Gemim sağlıklı, serbest pratika istiyorum
U (Uniform): Tehlikeye doğru gidiyorsunuz
W (Whiskey): Tıbbi yardıma ihtiyacım var

ÖNEMLİ KOMBİNASYONLAR:

NC: Tehlike altındayım, acil yardım istiyorum
ZD: Kılavuz istiyorum (Suez)
ZW: Römorkör istiyorum`,
    bulletPoints: [
      "A (Alfa): dalgıcım var, B (Bravo): tehlikeli yük",
      "O (Oscar): denize adam düştü, P (Papa): tüm personel gemiye",
      "Q (Quebec): serbest pratika istiyorum",
      "NC: tehlike altındayım, acil yardım istiyorum",
    ],
  },
  "sound-signals": {
    title: "Ses İşaretleri",
    introduction: "COLREG Kural 34 ve 35, gemilerin manevra ve kısıtlı görüşte kullanacağı ses işaretlerini belirler.",
    content: `MANEVRA İŞARETLERİ (Kural 34):

Bir kısa düdük (•): Rotamı sancağa değiştiriyorum
İki kısa düdük (••): Rotamı iskeleye değiştiriyorum
Üç kısa düdük (•••): Makinelerimi tornistana alıyorum

Dar kanal/geçitte:
İki uzun + bir kısa (— — •): Sancak tarafınızdan geçmek istiyorum
İki uzun + iki kısa (— — ••): İskele tarafınızdan geçmek istiyorum
Uzun + kısa + uzun + kısa (— • — •): Kabul ediyorum (yanıt)

KISITLI GÖRÜŞ İŞARETLERİ (Kural 35):

Makine ile seyir: Her 2 dakikada bir uzun düdük (—)
Makine ile seyir ama duruyor: Her 2 dakikada iki uzun düdük (— —)
Manevra kısıtlı/derin draftlı/yelkenli: Her 2 dakikada bir uzun + iki kısa (— ••)
Çekilmekte olan gemi: Çeken gemiden hemen sonra bir uzun + üç kısa (— •••)
Demirli gemi: Her dakika hızlı çan çalma (5 sn). >100 m gemilerde pruva çan + kıça gong

TEHLİKE İŞARETİ: Beş veya daha fazla kısa ve hızlı düdük (COLREG Kural 34(d))`,
    bulletPoints: [
      "• = sancağa, •• = iskeleye, ••• = tornistan",
      "Kısıtlı görüşte her 2 dakikada uzun düdük (makine ile seyir)",
      "Demirli gemi: pruva çan + kıça gong (>100 m)",
      "5+ kısa düdük = tehlike işareti",
    ],
  },
  "distress-signals": {
    title: "Tehlike İşaretleri",
    introduction: "Tehlike işaretleri, geminin ciddi ve yakın tehlike altında olduğunu belirtmek için kullanılan uluslararası standart sinyallerdir.",
    content: `TEHLİKE İŞARETLERİ (COLREG Ek IV):

1. Sürekli ses veren herhangi bir sis sinyali cihazı
2. Kısa aralıklarla ateşlenen silah (dakikada bir)
3. Kırmızı yıldız fişeği
4. SOS sinyali (herhangi bir yolla)
5. MAYDAY telsiz çağrısı (VHF Kanal 16)
6. NC bayrak sinyali
7. Üzerinde kare ve daire olan bayrak
8. Güvertede kontrollü ateş
9. Kırmızı paraşüt fişeği
10. Turuncu renkli duman sinyali
11. Kolları yanlara yavaşça kaldırıp indirme
12. DSC (Digital Selective Calling) tehlike alarmı
13. EPIRB aktivasyonu
14. Onaylanmış radar transponder sinyali (SART)

MAYDAY PROSEDÜRÜ:

'MAYDAY MAYDAY MAYDAY - This is [gemi adı × 3] - MAYDAY [gemi adı] - My position is [pozisyon] - [tehlike türü] - [yardım türü] - [personel sayısı] - [diğer bilgiler] - Over'

TEHLİKE İŞARETLERİNİN KULLANIMI:

Tehlike işaretleri yalnızca gerçek tehlike durumunda kullanılabilir. Yanlış kullanım yasaktır ve cezai yaptırımı vardır.`,
    bulletPoints: [
      "MAYDAY: VHF Kanal 16, en yüksek öncelikli tehlike çağrısı",
      "Kırmızı paraşüt fişeği: geniş alanda görülebilen tehlike sinyali",
      "EPIRB: otomatik uydu üzerinden tehlike bildirimi",
      "Tehlike işaretlerinin yanlış kullanımı suçtur",
    ],
    warnings: [
      "Tehlike işaretleri yalnızca ciddi ve yakın tehlike durumunda kullanılmalıdır",
    ],
  },
  "ism-safety-culture": {
    title: "ISM Code ve Emniyet Kültürü",
    introduction: "ISM Code (International Safety Management Code), denizde can ve mal güvenliğini sağlamak ve çevre kirliliğini önlemek için uluslararası emniyet yönetim standardıdır.",
    content: `ISM CODE YAPISI:

ISM Code, SOLAS Bölüm IX ile zorunlu hale getirilmiştir. İki temel belge üretir:

DOC (Document of Compliance): Şirketin emniyet yönetim sisteminin uygunluğunu belgeler. Bayrak devleti tarafından şirkete verilir.

SMC (Safety Management Certificate): Geminin SMS'e (Safety Management System) uygun olarak işletildiğini belgeler. Gemiye verilir.

SMS BİLEŞENLERİ:

1. Emniyet ve çevre koruma politikası
2. Görev ve yetki tanımları
3. DPA (Designated Person Ashore) atanması
4. Kaptan'ın yetki ve sorumluluğu
5. Kaynaklar ve personel
6. Gemi operasyonları için planlar
7. Acil durum hazırlığı
8. Uygunsuzluk, kaza ve tehlikeli durumların raporlanması
9. Bakım planlaması (PMS)
10. Dokümantasyon
11. Şirket doğrulama, denetim ve değerlendirme

EMNİYET KÜLTÜRÜ:

Emniyet kültürü, tüm seviyelerdeki personelin emniyeti öncelikli değer olarak benimsemesidir. 'Near miss' (ramak kala) raporlama, risk değerlendirmesi, toolbox meeting ve güvenlik toplantıları emniyet kültürünün araçlarıdır.

Etkili emniyet kültürünün göstergeleri:
- Personel uygunsuzlukları ve near miss'leri cezalandırma korkusu olmadan raporlar
- Risk değerlendirmesi tüm operasyonlar öncesi yapılır
- Üst yönetim emniyete kaynakayırır ve destekler`,
    bulletPoints: [
      "DOC: şirkete verilen uygunluk belgesi",
      "SMC: gemiye verilen emniyet yönetim sertifikası",
      "DPA: kıyıda atanmış kişi, gemi ile yönetim arasında bağlantı",
      "Near miss raporlama: emniyet kültürünün temel aracı",
    ],
    keyPoints: [
      "ISM Code SOLAS IX ile zorunludur",
      "Emniyet kültürü = emniyetin kişisel değer olarak benimsenmesi",
      "Risk değerlendirmesi tüm operasyonlar öncesi yapılmalıdır",
    ],
  },
};

export default function SeamanshipTopicsPage() {
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
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-[hsl(30,50%,6%)] dark:via-[hsl(25,50%,8%)] dark:to-[hsl(35,50%,10%)]"
      data-no-translate
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
                <Anchor className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Gemicilik</h1>
                <p className="text-sm text-muted-foreground">12 Ana Konu • Kapsamlı Müfredat</p>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Accordion */}
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-4 max-w-4xl mx-auto pb-20">
            <Accordion type="single" collapsible className="space-y-2">
              {seamanshipTopics.map((topic) => {
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
                  { title: "Denizci Düğümleri", href: "/seamanship/knots" },
                  { title: "Hesaplamalar", href: "/seamanship/calculations" },
                  { title: "Tüm Dersler", href: "/lessons" },
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
                <div className="bg-amber-500/10 rounded-xl p-4 border-l-4 border-amber-500">
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
