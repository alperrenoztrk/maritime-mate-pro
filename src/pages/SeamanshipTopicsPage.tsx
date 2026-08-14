import type { CSSProperties } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Anchor,
  ChevronRight,
  FileText,
  AlertTriangle,
  Shield,
  Lightbulb,
  CheckCircle2,
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
import { PhotoGallery, type GalleryPhoto } from "@/components/PhotoGallery";

// Gemicilik gerçekçi fotoğraflar
import photoRopeTypes from "@/assets/seamanship/rope-types.jpg";
import photoWireRope from "@/assets/seamanship/wire-rope.jpg";
import photoAnchorTypes from "@/assets/seamanship/anchor-types.jpg";
import photoAnchorChain from "@/assets/seamanship/anchor-chain.jpg";
import photoKnotsDisplay from "@/assets/seamanship/knots-display.jpg";
import photoShipPartsOverview from "@/assets/seamanship/ship-parts-overview.jpg";
import photoMooringEquipment from "@/assets/seamanship/mooring-equipment.jpg";
import photoWindlass from "@/assets/seamanship/windlass.jpg";
// Etap 1B - eklenen gerçekçi fotoğraflar
import photoFireExtinguishers from "@/assets/seamanship/fire-extinguishers.jpg";
import photoCo2System from "@/assets/seamanship/co2-system.jpg";
import photoLifeboatEnclosed from "@/assets/seamanship/lifeboat-enclosed.jpg";
import photoLiferaftCanister from "@/assets/seamanship/liferaft-canister.jpg";
import photoLsaPersonal from "@/assets/seamanship/lsa-personal.jpg";
import photoRudderPropeller from "@/assets/seamanship/rudder-propeller.jpg";
import photoSteeringGear from "@/assets/seamanship/steering-gear.jpg";
import photoDeckCrane from "@/assets/seamanship/deck-crane.jpg";
import photoHatchCovers from "@/assets/seamanship/hatch-covers.jpg";
import photoBridgeWatch from "@/assets/seamanship/bridge-watch.jpg";
import { useArticleBackGuard } from "@/hooks/useArticleBackGuard";
import { StructuredLessonText } from "@/components/lessons/StructuredLessonText";

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
      { id: "anchoring-maneuvers", title: "Demirleme manevra teknikleri", hasContent: true },
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
      { id: "helm-orders", title: "Dümen komutları ve standart manevra emirleri", hasContent: true },
      { id: "mob-maneuvers", title: "Denize adam düştü manevraları (Williamson/Anderson/Scharnow)", hasContent: true },
      { id: "ship-handling-tugs", title: "Yanaşma/kalkış manevraları ve römorkör kullanımı", hasContent: true },
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
      { id: "pilot-transfer", title: "Pilot transferi ve pilot çarmıhı (pilot ladder)", hasContent: true },
      { id: "means-of-access", title: "Gemiye iniş-biniş donanımı (gangway/accommodation ladder)", hasContent: true },
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
  photos?: GalleryPhoto[];
  knotAnimations?: string[];
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
    content: `Seamanship is the most fundamental discipline of the maritime profession. The word covers, in a broad sense, every kind of practical work carried out at sea.

THE SCOPE OF SEAMANSHIP:

Seamanship is a practical discipline that goes beyond theoretical knowledge. It covers the following areas:

1. Deck work: the use of ropes, wires and chains; knotting; painting and maintenance work.
2. Anchoring and mooring: letting go the anchor, taking mooring lines, securing to a buoy.
3. Cargo operations: opening/closing hatches, operating cranes, securing cargo.
4. Safety: the use of life-saving appliances, fire fighting, abandon ship procedures.
5. Manoeuvring: steering, transits of narrow waters, berthing and unberthing.
6. Maintenance: deck and hull maintenance, rust removal, painting.

HISTORICAL DEVELOPMENT:

Seamanship developed in the age of sail as a wholly manual craft. Practices changed with the arrival of the steam engine and modern deck machinery, but the underlying principles have not.

THE STCW CONVENTION AND SEAMANSHIP:

The STCW (Standards of Training, Certification and Watchkeeping) Convention defines the seamanship competences required of seafarers at every level. Deck officers' competence in seamanship subjects is certified through training and examination. STCW Code section A-II/1 lists in detail the seamanship knowledge and skills required of an officer of the watch.`,
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
    photos: [
      {
        src: photoShipPartsOverview,
        title: "Modern dökme yük gemisi (yan görünüm)",
        caption: "The bulbous bow, raised forecastle, hatch covers, aft accommodation block, bridge and funnel are all visible in one frame.",
        alt: "A large bulk carrier under way at sea in side profile; the red underwater hull, black side shell, white accommodation block and flush hatch covers stand out.",
      },
    ],
    content: `THE MAIN PARTS OF A SHIP:

BOW: the forward part of the ship. The form of the bow determines its wave-breaking performance. The main bow types: vertical stem, bulbous bow, clipper bow, raked bow. A bulbous bow reduces wave resistance by 5-15% and so saves fuel.

STERN: the after part of the ship. The rudder and propeller are in this area. Stern forms: transom stern (flat), cruiser stern (rounded), elliptical stern.

PORT: the left-hand side of the ship. The red navigation light is on this side at night.
STARBOARD: the right-hand side of the ship. The green navigation light is on this side at night.

STRUCTURAL MEMBERS:

Keel: the main structural member of the ship. It runs fore and aft along the bottom centreline of the hull.
Frames: the transverse structural members rising from the keel.
Ribs: the part of the frames that meets the outer shell.
Deck: the horizontal platforms. Main deck, upper deck, lower deck/tween deck.
Cargo hold: the enclosed compartment in which cargo is carried.
Hull plating: the outer shell of the hull.
Cofferdams: void spaces between two compartments, used for leak detection and safety.

SUPERSTRUCTURE:

Bridge/wheelhouse: the ship's command centre.
Forecastle (fo'c'sle): the forward superstructure; the anchor gear is here.
Poop: the structure over the after deck.`,
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
    content: `SHIP TYPES:

1. DRY CARGO SHIPS:
General cargo ships: carry various packaged cargoes. They have their own cranes (geared).
Bulk carriers: carry bulk cargoes such as grain, coal and ore.
Container ships: carry cargo in standard containers. Measured by TEU (Twenty-foot Equivalent Unit) capacity.

2. TANKERS:
Crude oil tankers: VLCC (Very Large Crude Carrier, 200,000+ DWT) and ULCC (Ultra Large, 300,000+ DWT).
Product tankers: carry refined petroleum products.
Chemical tankers: carry chemicals in special tanks. Subject to the IBC Code.
LNG/LPG carriers: carry liquefied gas. Subject to the IGC Code.

3. SPECIAL SHIP TYPES:
Ro-Ro ships: wheeled cargo loaded over a ramp.
Passenger ships: subject to the SOLAS Chapter II-2 fire safety standards.
Offshore Supply Vessels.
Floating Production Storage and Offloading units (FPSO).

CLASSIFICATION SOCIETIES:

Organisations such as Lloyd's Register, DNV, Bureau Veritas, the American Bureau of Shipping (ABS) and ClassNK verify that ships comply with the structural standards. They operate under the umbrella of IACS (the International Association of Classification Societies).

TONNAGE CONCEPTS:
Gross Tonnage (GT): a measure of the total enclosed volume of the ship; it is a dimensionless number.
Net Tonnage (NT): a measure of the volume set aside for carrying cargo.
Deadweight Tonnage (DWT): the total weight the ship can carry (cargo + fuel + water + provisions + crew).
Displacement: the weight of the water the ship displaces.`,
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
    content: `PRINCIPAL DIMENSIONS:

LOA (Length Overall): the total length of the ship from the extreme forward point to the extreme after point. This is the figure used in port and pilotage operations.

LBP (Length Between Perpendiculars): the distance between the forward and after perpendiculars. This is the reference used in structural calculations and hydrostatic data.

Beam/Breadth: the measurement at the widest point of the ship. The moulded beam is used in structural calculations and the extreme beam for the outside dimension.

Depth: the vertical distance from the top of the keel to the underside of the main deck.

Draft (Draught): the vertical distance from the waterline to the bottom of the keel. It varies with the loading condition.

Freeboard: the vertical distance from the main deck edge to the waterline. Its minimum values are set by the International Load Line Convention.

TONNAGE CALCULATIONS:

GT is calculated with the formula GT = K₁ × V. V is the total enclosed volume of the ship (m³); K₁ = 0.2 + 0.02 × log₁₀V.

NT is derived from the cargo volume and is used in financial calculations such as port dues and pilotage fees.`,
    formula: {
      name: "Gross Tonnage Hesabı",
      expression: "GT = K₁ × V     (K₁ = 0,2 + 0,02 × log₁₀V)",
      description: "V: toplam kapalı hacim (m³), K₁: tonaj katsayısı. GT boyutsuz bir sayıdır.",
    },
    examples: [
      {
        problem: "Calculate the GT of a ship with a total enclosed volume of 50,000 m³.",
        solution: "K₁ = 0.2 + 0.02 × log₁₀(50,000) = 0.2 + 0.02 × 4.699 = 0.2 + 0.094 = 0.294. GT = 0.294 × 50,000 = 14,700. The ship's Gross Tonnage is 14,700.",
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
    content: `MANDATORY CERTIFICATES:

1. International Tonnage Certificate (ITC 69): issued under the 1969 Tonnage Measurement Convention. It states the GT and NT.

2. International Load Line Certificate (ILLC): issued under the 1966 Load Line Convention. It states the minimum freeboard permitted for the ship.

3. Safety Construction Certificate (SCC): certifies under SOLAS that the ship's structure complies with the standards.

4. Safety Equipment Certificate (SEC): certifies the compliance of the life-saving and fire fighting equipment.

5. Safety Radio Certificate (SRC): confirms the adequacy of the GMDSS equipment.

6. IOPP Certificate (International Oil Pollution Prevention Certificate): issued under MARPOL Annex I.

7. ISPP Certificate (International Sewage Pollution Prevention Certificate): issued under MARPOL Annex IV.

8. ISM certificates: the Document of Compliance (DOC) is issued to the company and the Safety Management Certificate (SMC) to the ship.

9. ISSC (International Ship Security Certificate): issued under the ISPS Code.

10. CLC Certificate (Civil Liability Certificate): the certificate of financial responsibility for oil pollution.

DOCUMENT CHECKS IN PSC INSPECTIONS:

Port State Control inspectors check the validity of these certificates first. An expired or missing certificate can be grounds for detention.`,
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
    photos: [
      {
        src: photoRopeTypes,
        title: "Yaygın halat malzemeleri (yan yana)",
        caption: "Four ropes of the same diameter: white double-braid nylon, yellow polypropylene (which floats), brown natural-fibre manila and blue polyester. The differences in construction and lay are clear.",
        alt: "Four different ropes laid side by side on a wooden deck: nylon, polypropylene, manila and polyester, each a different colour and construction.",
      },
    ],
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
    content: `NATURAL FIBRE ROPES:

Manila: made from the abaca plant. The strongest of the natural ropes. Its strength falls by 10-15% when wet. It is still used as the safety line for a pilot ladder.

Sisal: cheaper than manila but weaker. It stiffens when wet and its strength falls by 20%.

SYNTHETIC FIBRE ROPES:

Nylon (polyamide): high elasticity (30-40% extension). Resistant to shock loads. Its strength falls by 10% when wet. Preferred as a towing line.

Polypropylene (PP): floats (specific gravity 0.91). Light but sensitive to UV. Used as a lifeline.

Polyester (Terylene/Dacron): low elasticity (12-15% extension). Its strength does not change when wet. Widely used as a mooring line.

HMPE (Dyneema/Spectra): strength equivalent to wire at one seventh of the weight. Extension 3-4%. Used for modern mooring and towing lines. Sensitive to heat (watch for friction heat on bollards).

ROPE CONSTRUCTIONS:

Laid rope: made by twisting three or four strands together. Z-lay (right-hand lay) is standard.
Braided rope: braided around an inner core. It has no tendency to rotate.
Double braided: an inner and an outer braid. It provides high strength and flexibility.`,
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
      "When synthetic ropes part, the risk of snap-back is high",
      "HMPE rope can be damaged on sharp corners; chafe guards must be used",
    ],
  },
  "wire-ropes": {
    title: "Çelik Teller ve Yapıları",
    introduction: "Çelik teller, yüksek çekme dayanımı gerektiren güverte operasyonlarında kullanılır; tel yapısı, kullanım amacına göre seçilir.",
    photos: [
      {
        src: photoWireRope,
        title: "6×36 IWRC çelik tel kesiti",
        caption: "Six outer strands around an independent wire rope core (IWRC), each strand made up of many fine wires. An IWRC gives a 7-10% higher breaking load than a fibre core.",
        alt: "The cut end of a galvanised wire rope on a ship's deck; the interlocking strands and the central wire core are clearly visible, with a splicing tool beside it.",
      },
    ],
    table: {
      title: "Çelik Tel Tipleri Karşılaştırması",
      headers: ["Tip", "Telcik Sayısı", "Esneklik", "Aşınma Direnci", "Kullanım Alanı"],
      rows: [
        ["6×7", "42 (az, kalın)", "Low", "High", "Korkuluk, sabit bağlantı"],
        ["6×19", "114 (orta)", "Orta", "Orta", "Genel güverte işleri"],
        ["6×37", "222 (çok, ince)", "High", "Low", "Vinç, kaldırma"],
        ["6×19 FC", "114 + lif çekirdek", "High", "Orta", "Kaldırma operasyonları"],
        ["6×19 IWRC", "114 + tel çekirdek", "Orta", "High", "Ağır yük, ezilme riski"],
      ],
    },
    content: `THE CONSTRUCTION OF WIRE ROPE:

Wire rope is made by laying fine steel wires in strands around a core. The standard designation is A × B. For example, 6 × 19 means 6 strands with 19 wires in each strand.

COMMON WIRE TYPES:

6 × 7: few, thick wires. High abrasion resistance, low flexibility. Guardrails and standing rigging.
6 × 19: a balance of flexibility and strength. General purpose deck work.
6 × 37: many fine wires. High flexibility but low abrasion resistance. Winch and lifting operations.

CORE TYPES:
Fibre Core (FC): a fibre core. More flexible, and acts as a reservoir of lubricant. Preferred in lifting operations.
Independent Wire Rope Core (IWRC): an independent steel wire core. A higher breaking load (7-10% more). Greater resistance to crushing.

WIRE MAINTENANCE AND INSPECTION:

Regular lubrication extends the life of the wire. The parameters checked at inspection:
- The number of broken wires (must not exceed 10% in one lay length)
- Wear (the loss of diameter must not exceed 5% of the original)
- Corrosion
- Kinks (bending damage) – a kinked wire must not be used
- Birdcaging (core protrusion)`,
    formula: {
      name: "Çelik Tel Kırılma Yükü (Yaklaşık)",
      expression: "BL ≈ d² × K (ton)",
      description: "d: tel çapı (cm), K: katsayı (6×19 FC için K ≈ 46, 6×37 IWRC için K ≈ 50)",
    },
    examples: [
      {
        problem: "Calculate the approximate breaking load of a 6×19 FC wire rope of 24 mm (2.4 cm) diameter.",
        solution: "BL ≈ d² × K = 2.4² × 46 = 5.76 × 46 = 264.96 tonnes. The approximate breaking load of the wire is 265 tonnes. For the safe working load (SWL) it is divided by the factor of safety (usually 5): SWL = 265/5 = 53 tonnes.",
      },
    ],
    bulletPoints: [
      "6×19: genel amaçlı, 6×37: esnek (vinç/kaldırma)",
      "IWRC çekirdek, FC'ye göre %7-10 daha yüksek kırılma yükü sağlar",
      "Kink olan tel kesinlikle kullanılmamalıdır",
      "Bir adımdaki kırık telcik oranı %10'u geçmemeli",
    ],
    warnings: [
      "A kinked wire rope cannot be repaired; it must be taken out of service",
      "SWL = BL / factor of safety (usually 5 or 6)",
    ],
  },
  "rope-care": {
    title: "Halat Bakımı ve Depolanması",
    introduction: "Halatların ömrü ve güvenli kullanımı, doğru bakım ve depolama uygulamalarına bağlıdır.",
    content: `PRINCIPLES OF ROPE MAINTENANCE:

All ropes must be inspected regularly and checked for signs of damage. Abrasion, cuts, UV damage, chemical damage and internal fibre deterioration are the main things to look for.

SYNTHETIC ROPE MAINTENANCE:
- Wash with fresh water after use (salt crystals abrade the fibres)
- Store out of direct sunlight (UV degradation)
- Protect from sharp corners (use chafe guards/fairleads)
- Do not kink; a kink reduces the strength of a synthetic rope by up to 30%

WIRE ROPE MAINTENANCE:
- Regular lubrication (penetrating oil plus protective grease)
- Correct spooling on drums and sheaves
- Corrosion checks
- Counting broken wires

STORAGE:

Ropes must be stored in a dry, ventilated place out of direct sunlight. They can be kept on a reel or in a Flemish coil. Ropes must be kept away from chemicals; contact with acids and alkalis in particular must be avoided.

INSPECTION RECORDS:

Under the ISM Code the periodic inspections of ropes and wires must be recorded and followed up within the maintenance planning (PMS).`,
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
    knotAnimations: ["bowline", "figure-eight", "reef-knot", "sheet-bend"],
    photos: [
      {
        src: photoKnotsDisplay,
        title: "Temel denizcilik düğümleri (toplu görünüm)",
        caption: "Bowline (non-slipping loop), figure-eight (stopper), clove hitch, reef knot, sheet bend and round turn and two half hitches — the six most commonly used knots together.",
        alt: "Six different nautical knots tied in white rope on a wooden surface, each clearly visible.",
      },
    ],
    content: `BASIC KNOTS:

Reef knot (square knot): used to join two rope ends of the same diameter. Widely used when furling sails. It is not reliable with ropes of different diameters; it can slip.

Bowline: forms a non-slipping loop at the end of a rope. The most important of the seaman's knots. It does not jam under load and is easy to undo. Used in rescue operations, in passing mooring lines and for general purposes.

Figure-of-eight knot: tied in the end of a rope to stop it running out of a block or sheave. A simple and effective stopper knot.

BENDS:

Double bowline: used as a seat (bosun's chair). It forms two loops.

Sheet bend: used to join two ropes of different diameters. A double sheet bend is more secure.

Carrick bend: used to join heavy ropes and towing hawsers. It does not jam under load.

PRINCIPLES OF KNOTS:
Every knot reduces the breaking load of the rope. Average strength losses:
- Bowline: 40% loss of strength
- Reef knot: 55% loss of strength
- Sheet bend: 45% loss of strength
- Figure-of-eight: 25% loss of strength`,
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
    knotAnimations: ["clove-hitch", "round-turn-two-half-hitches"],
    content: `HITCHES:

Clove hitch: used to secure a rope temporarily to a bollard or a rail. It is not reliable on its own; it can come undone if the ends are left free. It is usually backed up with additional turns.

Bollard hitch: the method of securing a mooring line to a bollard. The standard practice: the eye of the line is dropped over the bollard, then figure-of-eight turns are taken with the line. The last turn is locked off.

Blackwall hitch: used to secure a rope temporarily to a hook. It holds only while under load.

Rolling hitch: used to make fast to another rope or a spar where the pull is not at right angles.

SPLICES:

Eye splice: forms a permanent loop in the end of a rope. The loss of strength is far lower than with a knot (5-10%). It is the standard finish for mooring lines.

Short splice: joins two rope ends permanently. The diameter increases, so it will not pass through a sheave or block.

Long splice: joins two rope ends without increasing the diameter. It will pass through a sheave or block, but the loss of strength is greater than with a short splice.

STRENGTH COMPARISON:
Eye splice: 90-95% of the original strength is retained.
Short splice: 85-90% of the original strength is retained.
Bowline: 60% of the original strength is retained.

A splice should therefore always be preferred over a knot where a permanent loop is needed.`,
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
    content: `BASIC CONCEPTS:

Breaking Load (BL) / Minimum Breaking Load (MBL): the load at which the material parts. It is stated by the maker.

Safe Working Load (SWL) / Working Load Limit (WLL): the maximum load at which the item can be used safely. It is calculated as SWL = BL / FoS.

Factor of Safety (FoS): the safety factor. It varies with the application.

STANDARD SAFETY FACTORS:

Wire ropes (lifting): FoS = 5
Wire ropes (general deck work): FoS = 4-5
Synthetic ropes: FoS = 5-6
Chains (lifting): FoS = 4-5
Shackles and lifting accessories: FoS = 4-6
Anchor chain: FoS = 3-4

PROOF LOAD:
The proof load (PL) is the test load applied after manufacture. It is usually twice the SWL (PL = 2 × SWL). An item that passes the proof load test must show no permanent deformation.`,
    formula: {
      name: "Güvenli Çalışma Yükü",
      expression: "SWL = BL / FoS",
      description: "BL: kırılma yükü, FoS: güvenlik faktörü. SWL hiçbir zaman aşılmamalıdır.",
    },
    examples: [
      {
        problem: "Calculate the SWL of a wire rope with a breaking load of 120 tonnes for a lifting operation (FoS = 5).",
        solution: "SWL = BL / FoS = 120 / 5 = 24 tonnes. A maximum of 24 tonnes can be lifted with this wire.",
      },
      {
        problem: "Calculate the proof load of a shackle with an SWL of 15 tonnes.",
        solution: "PL = 2 × SWL = 2 × 15 = 30 tonnes. The shackle must have been tested at 30 tonnes after manufacture.",
      },
    ],
    bulletPoints: [
      "SWL = BL / factor of safety",
      "Kaldırma operasyonlarında FoS = 5 standarttır",
      "Proof load = 2 × SWL (üretim test yükü)",
      "SWL aşıldığında ekipman hizmet dışı bırakılmalıdır",
    ],
    warnings: [
      "The SWL must never be exceeded under any circumstances",
      "The SWL of damaged or worn equipment is reduced; inspection is mandatory",
    ],
  },

  // =====================================================
  // BÖLÜM 3 - DEMİRLEME VE DEMİR DONANIMI
  // =====================================================
  "anchor-types": {
    title: "Demir Tipleri ve Özellikleri",
    introduction: "Gemilerde kullanılan demirler, yapılarına ve tutma kuvvetlerine göre farklı tiplerde üretilir; seçim deniz tabanı yapısına ve gemi tonajına göre yapılır.",
    image: "/diagrams/seamanship/demir-tipleri.svg",
    photos: [
      {
        src: photoAnchorTypes,
        title: "Yaygın demir tipleri karşılaştırması",
        caption: "Left to right: Hall stockless (the merchant ship standard), AC-14 high holding power (modern HHP), Danforth fluke (holds in soft ground) and Admiralty stocked (the classic stocked type).",
        alt: "Four different ships' anchors lined up on a quay, each with a different shank, fluke and stock arrangement.",
      },
    ],
    content: `THE MAIN TYPES OF ANCHOR:

STOCKLESS ANCHOR (Hall anchor): the type most widely used on merchant ships. The flukes pivot about the crown. It can be stowed in the hawse pipe. It develops a holding power of 3-5 times its own weight.

DANFORTH ANCHOR: its wide, flat flukes give very good holding in soft ground (mud, sand). It develops a holding power of 10-20 times its own weight. Common on small craft; carried as a spare on large ships.

MUSHROOM ANCHOR: mushroom shaped; it buries itself in soft mud and provides very high holding power. Used for permanent moorings for lightships and marker buoys.

BRUCE ANCHOR: a one-piece cast design without pivoting flukes. It holds well in all types of ground. Common on offshore installations.

ANCHOR WEIGHT:

Classification societies set the minimum anchor weight according to the ship's equipment number (EN). The equipment number is calculated from the ship's dimensions and the area exposed to the wind.

EN = Δ^(2/3) + 2hB + A/10 (approximate formula)

A merchant ship normally carries two bower anchors (forward) and one spare anchor.`,
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
    image: "/diagrams/seamanship/zincir-isaretleme.svg",
    photos: [
      {
        src: photoAnchorChain,
        title: "Stud-link demir zinciri ve shackle işaretlemesi",
        caption: "The stud inside each link prevents the link from collapsing. Coloured paint (white/red/blue) marks the shackle (27.5 m) boundaries; the last shackle is painted entirely red.",
        alt: "Heavy stud-link anchor cable running to the windlass on a ship's forecastle; one link is painted red, one blue and one white, marked with the shackle number.",
      },
      {
        src: photoWindlass,
        title: "Demir vinci (windlass) yakın çekim",
        caption: "The wildcat (gypsy) hauls the cable by seating each link in its pocket; the brake band, chain stopper and hawse pipe are visible. This is the standard forecastle outfit above the main deck.",
        alt: "Close-up of an anchor windlass on a ship's forecastle, showing the large steel wildcat that hauls the cable, the brake mechanism and the hawse pipe opening.",
      },
    ],
    content: `CHAIN CONSTRUCTION:

Anchor chain is made up of links. Each link has a stud across its middle; the stud prevents the link being crushed and the chain becoming tangled. Stud-link chain is standard on merchant ships.

CHAIN DIMENSIONS:
Chain size is expressed by the diameter of the common link. One shackle of chain = 27.5 m (90 feet). Shackles of chain are joined together with a joining shackle (Kenter shackle).

CHAIN MARKING:

Each shackle of chain is marked with paint and wire turns:
1st shackle: 1 white mark + 1 turn of wire
2nd shackle: 2 white marks + 2 turns of wire
3rd shackle: 3 white marks + 3 turns of wire
The last two shackles: links painted red
The last shackle: painted red throughout

THE CHAIN LOCKER:
The chain is stowed in the chain locker below the forecastle. The end link of the chain is secured to the ship by a bitter end shackle. This connection must be capable of being released so that the chain can be let go in an emergency.`,
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
    content: `TYPES OF WINDLASS:

Horizontal windlass: the drum axis is horizontal. It takes up more deck space but is easier to maintain.

Vertical windlass (capstan): the drum axis is vertical. It takes up less deck space. The chain lead is more natural.

WINDLASS COMPONENTS:

Cable lifter (wildcat/gypsy): the wheel that grips and takes in the chain links.
Warping drum: the cylindrical drum used for handling ropes.
Band brake: the band brake that holds the chain.
Clutch: engages or disengages the wildcat from the shaft.
Hawse pipe: the pipe through which the chain runs from the deck outboard.
Spurling pipe: the pipe through which the chain runs from the deck down to the chain locker.
Chain stopper (devil's claw): the securing device that holds the chain.

USING THE WINDLASS WHEN ANCHORING:

When letting go, the windlass clutch is disengaged and the band brake is eased in a controlled way to pay out the chain. When weighing anchor the clutch is engaged and the windlass motor heaves the chain in.

In an emergency the chain can be let go on the run; but this carries the risk of losing control in the chain locker.`,
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
    content: `PREPARATION BEFORE ANCHORING:

1. Studying the anchorage on the chart (depth, type of bottom, obstructions)
2. Assessing the weather and current
3. Calculating the length of chain required
4. Preparing the anchor gear (windlass, brake, communications)
5. Checking bridge/forecastle communications (UHF/VHF or telephone)

CALCULATING THE LENGTH OF CHAIN:

The general rule: total chain = 5-7 times the depth (normal conditions). In storm conditions 8-10 times. In shallow water a minimum of 4 times.

The part of the chain lying on the bottom (the catenary) increases the holding power. Without an adequate catenary the risk of dragging increases.

ANCHORING, STEP BY STEP:

1. Speed is reduced to a minimum as the ship approaches the anchorage
2. The approach is made into the wind or current
3. The anchor is let go when the ship is stopped or making very slight sternway
4. The chain is paid out under control (to the required length)
5. The brake is applied and the anchor is checked to see whether it is holding
6. The anchor position is recorded by GPS, radar bearings or shore transits
7. The anchor watch is set`,
    formula: {
      name: "Zincir Boyu (Genel Kural)",
      expression: "Zincir boyu = Derinlik × (5 ~ 7)",
      description: "Normal koşullar: 5-7 kat, fırtına: 8-10 kat, sığ su: minimum 4 kat derinlik",
    },
    examples: [
      {
        problem: "How much chain should be paid out in normal conditions at an anchorage with a depth of 20 metres?",
        solution: "Length of chain = 20 × 6 (average) = 120 metres. Since 1 shackle = 27.5 m, 120 / 27.5 ≈ 4.4 shackles. In practice 4.5 or 5 shackles are paid out.",
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
    content: `ANCHOR WATCH DUTIES:

1. Position monitoring: monitoring the ship's position by GPS or radar bearings. The swinging circle is calculated and the safe distance from other ships and shore obstructions is checked.

2. Checking for dragging: monitoring whether the anchor is still holding. Signs of dragging:
   - An unexpected change in the direction of the chain
   - Excessive vibration in the chain
   - The position moving on GPS
   - A change in the radar bearings

3. Monitoring the weather and sea state: changes in wind, current and swell are watched.

4. Traffic watch: monitoring other ships approaching or at anchor.

CALCULATING THE SWINGING CIRCLE:

The radius of the swinging circle = the ship's length + the length of chain paid out. It is normal for a ship at anchor to move within this circle under the influence of wind and current.

ALARM SETTINGS:

An anchor watch alarm is set on modern ECDIS and GPS systems. It gives an audible and visual alarm when the ship moves outside the defined circle.`,
    formula: {
      name: "Salma Dairesi Yarıçapı",
      expression: "R = L + Zincir boyu",
      description: "R: salma dairesi yarıçapı (m), L: gemi boyu (LOA, m)",
    },
    examples: [
      {
        problem: "Calculate the swinging circle radius for a ship with LOA = 180 m and 5 shackles of chain paid out.",
        solution: "Length of chain = 5 × 27.5 = 137.5 m. R = 180 + 137.5 = 317.5 m. The ship's swinging circle radius is about 318 metres. There must be more clearance than this to the surrounding obstructions.",
      },
    ],
    bulletPoints: [
      "Salma dairesi = gemi boyu + zincir boyu",
      "GPS ve radar ile sürekli pozisyon kontrolü yapılır",
      "ECDIS anchor alarm ayarı standart uygulamadır",
      "Zincir yönü ve titreşimi tarama belirtilerini gösterir",
    ],
    warnings: [
      "If the anchor drags the bridge must be informed at once and the engine kept ready",
      "Extra chain must be paid out, or a second anchor prepared, before the weather deteriorates",
    ],
  },
  "anchor-dragging": {
    title: "Demir Taraması ve Alınacak Tedbirler",
    introduction: "Demir taraması, demirin zemine tutunma gücünü kaybederek geminin kontrolsüz sürüklenmesidir; denizciliğin en kritik durumlarından biridir.",
    content: `CAUSES OF DRAGGING:

1. Insufficient chain (loss of catenary)
2. Deteriorating weather (increasing wind and current forces)
3. Unsuitable ground (hard clay, rock, weed)
4. Damage to the anchor or chain
5. A sudden change of wind (direction or strength)

SIGNS OF DRAGGING:

- A continuous, one-directional movement of the GPS position
- A change in the radar bearings
- An abnormal change in the direction of the chain
- Heavy vibration or snatching noises in the chain
- The bow not lying head to wind/current

ACTION TO BE TAKEN:

1. Put the engine on stand-by immediately
2. Pay out more chain (to increase the catenary)
3. If the chain holds, verify the position again
4. If it does not hold, let go the second anchor (in a different direction)
5. If neither anchor holds, weigh anchor and anchor elsewhere
6. If necessary, proceed to sea and stand out into open water

ANCHORING WITH TWO ANCHORS:

Two anchors can be used when heavy weather is expected. Two methods:
- Open moor (V-shape): the two anchors are laid at an angle of 60-90° to each other
- Tandem: the two anchors are laid one behind the other on the same chain (rare)`,
    bulletPoints: [
      "Taramanın 1 numaralı sebebi yetersiz zincir boyudur",
      "İlk adım: makine hazır, ikinci adım: zincir ver",
      "İkinci demir farklı yöne atılmalıdır",
      "Open moor: iki demir 60-90° açıyla yerleştirilir",
    ],
    warnings: [
      "No time must be lost when the anchor drags; the engine must be made ready at once",
      "In shallow water or a crowded anchorage, dragging = the risk of collision",
    ],
  },
  "anchoring-maneuvers": {
    title: "Demirleme Manevra Teknikleri",
    introduction: "Demirleme manevrası; salınım alanı, dip tutuşu, hava/akıntı ve liman düzenine göre farklı tekniklerle yapılır. Doğru teknik, geminin emniyetli salınımını ve sağlam tutuşunu belirler.",
    image: "/diagrams/seamanship/demirleme-manevralari.svg",
    content: `THE APPROACH:
The ship always approaches the anchorage HEAD TO whichever is the stronger, the wind or the current. The ship is stopped over the position, or the anchor is let go while she is making very slight sternway, so that the chain does not pile up on the anchor. The chain is snubbed under control and the anchor is confirmed to be brought up.

SINGLE / SWINGING MOOR:
The most common method. One anchor is let go and the ship swings around it with the wind and current. It requires a wide swinging area. Chain = 5-7 times the depth (8-10 in a storm).

RUNNING MOOR:
The first anchor is let go while the ship still has headway; she continues ahead paying out extra chain, the second anchor is let go and the ship is dropped back to equalise the chains. The two anchors limit the swing and give strong holding. Preferred in crowded anchorages or where there is a strong current.

STANDING MOOR:
The ship is stopped or making slight sternway; the first anchor is let go and chain is paid out as she drops astern; the second anchor is let go and the first chain is heaved in to bring the ship midway between the two anchors. It is the reverse sequence of the running moor.

MEDITERRANEAN MOOR:
The ship backs in stern-to towards the quay; two anchors (starboard and port) are laid out from forward at an angle, and she is secured to the quay with stern lines. It is used in crowded Mediterranean ports to fit in a large number of ships.

BALTIC MOOR:
In a strong offshore wind, the offshore anchor and a mooring line are used together to bring the ship in and hold her safely alongside.

OPEN MOOR:
The two anchors are laid at an angle of 60-90°; this limits the swing and improves holding when the current/wind changes direction.`,
    bulletPoints: [
      "Yaklaşma daima rüzgâr/akıntıya karşı; nokta üzerinde funda",
      "Running moor: ileri yolda 1. demir → ikinci demir → geri çekip eşitle",
      "Standing moor: dur/geri kay → 1. demir → 2. demir → ortala",
      "Akdeniz usulü: kıç rıhtıma, baştan iki demir açıyla",
      "Baltik usulü: dış borda demiri + palamar halatı birlikte",
    ],
    keyPoints: [
      "İki demirli moor (running/standing) salınımı kısıtlar ve tutuşu artırır",
      "Tek demir geniş salınım alanı ister; kalabalıkta uygun değildir",
      "Funda anında gemi durmuş veya çok hafif sternway almış olmalı",
      "Manevra köprüüstü-baş kasara arası sürekli iletişimle yürütülür",
    ],
    warnings: [
      "Letting go with headway strains the chain and windlass; the speed must be very low in a running moor",
      "In a Mediterranean moor watch for the risk of the anchor cables crossing and fouling",
    ],
  },

  // =====================================================
  // BÖLÜM 4 - PALAMAR VE BAĞLAMA
  // =====================================================
  "mooring-lines": {
    title: "Palamar Halatları ve Adlandırmaları",
    introduction: "Geminin rıhtıma güvenli bağlanması için kullanılan palamar halatları, konumlarına ve görevlerine göre adlandırılır.",
    image: "/diagrams/seamanship/palamar-duzeni.svg",
    photos: [
      {
        src: photoMooringEquipment,
        title: "Hidrolik palamar vinci ve kıç güverte düzeni",
        caption: "Mooring line wound on the winch drum, with bollards and fairleads around it. On modern ships split-drum winches serve for both stowage and hauling.",
        alt: "A large hydraulic mooring winch on the after deck of a cargo ship, with heavy rope wound on the drum and black bollards around it.",
      },
    ],
    table: {
      title: "Palamar Halatları Görev Tablosu",
      headers: ["Halat Adı", "Konum", "Tasks", "Direction"],
      rows: [
        ["Head Line", "Pruva", "Geminin ileri hareketini önler", "İleri-yukarı"],
        ["Stern Line", "Kıç", "Geminin geri hareketini önler", "Geri-yukarı"],
        ["Forward Breast", "Pruva", "Rıhtımdan uzaklaşmayı önler", "Dik (rıhtıma)"],
        ["After Breast", "Kıç", "Rıhtımdan uzaklaşmayı önler", "Dik (rıhtıma)"],
        ["Forward Spring", "Pruva → kıça doğru", "Gemi ileri kaymasını önler", "Geriye doğru çapraz"],
        ["After Spring", "Kıç → pruvaya doğru", "Gemi geri kaymasını önler", "İleriye doğru çapraz"],
      ],
    },
    content: `TYPES AND NAMES OF MOORING LINES:

From the bow aft:

1. Head Line: run forward from the extreme forward part of the bow. It heaves the ship in towards the quay.

2. Forward Breast Line: run ashore at right angles from the bow area. It holds the ship close to the quay.

3. Forward Spring: run aft from the bow area. It prevents the ship moving forward.

4. After Spring: run forward from the stern area. It prevents the ship moving aft.

5. After Breast Line: run ashore at right angles from the stern area.

6. Stern Line: run aft from the extreme after part of the stern.

THEIR FUNCTIONS:

The head and stern lines control the ship's fore-and-aft movement and heave her in to the quay.
The breast lines hold the ship close to the quay (transverse control).
The springs prevent the ship surging fore and aft. The springs are the most critical lines; they provide the primary control of the ship's movement.

MOORING LINE MATERIALS:

Modern ships generally use polyester or HMPE ropes for mooring. Nylon is not preferred for mooring because of its high elasticity (excessive stretch allows unwanted movement). Nylon may however be used for buoy moorings in some ports.`,
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
    content: `SHIPBOARD EQUIPMENT:

Bollard: the steel cylindrical post around which the mooring line is turned up. The double (cruciform) bollard is the standard type. Its SWL must be marked on it.

Panama chock: a closed fairlead that leads the line outboard. It reduces chafe.

Roller fairlead: a fairlead with rotating rollers. It minimises friction on the line.

Pedestal fairlead: a raised fairlead; used to adjust the lead of the line.

Bitts: paired vertical posts. Used for towing lines or mooring lines.

SHORE EQUIPMENT:

Shore bollard: a heavy steel bollard fixed to the quay.
Mooring buoy: the ship is secured to the buoy.
Quick Release Hook (QRH): the quick release hook used at tanker terminals. It can be released remotely in an emergency.

STANDARD EQUIPMENT ARRANGEMENT:

The OCIMF (Oil Companies International Marine Forum) and IACS standards define the arrangement of mooring equipment and its SWL values. The Ship Design Minimum Breaking Load (SDMBL) concept aims to give all the equipment equal strength.`,
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
    content: `PREPARATION BEFORE BERTHING:

1. Studying the berth information and the approach plan
2. Preparing the mooring lines (ranged out and flaked down)
3. Placing the fenders
4. Checking communications (bridge-forward-aft)
5. Testing the engine and steering gear
6. Coordinating with the tugs (if required)

THE ORDER OF MAKING FAST:

The standard order (it can change with the wind/current):
1. The springs are sent first (they control the ship's movement)
2. Then the head and stern lines
3. Finally the breast lines

THE USE OF TUGS:

Large ships take tug assistance when berthing and unberthing. The number and power of the tugs depend on the ship's tonnage, the port conditions and local rules. The point of tug connection is chosen in relation to the ship's pivot point.

THE HEAVING LINE:

Because a mooring line cannot be thrown ashore directly, a light heaving line is thrown first. A weight (a monkey's fist) is made up in its end. The shore party hauls on the heaving line to bring the mooring line ashore.`,
    bulletPoints: [
      "İlk spring, ardından head/stern, son olarak breast gönderilir",
      "Heaving line (atma halatı) ile palamar kıyıya geçirilir",
      "Monkey's fist atma halatının ucundaki ağırlıktır",
      "Römorkör sayısı ve gücü gemi tonajına ve koşullara bağlıdır",
    ],
    warnings: [
      "Make sure the shore party is in a safe area before throwing the heaving line",
      "Keep clear of the snap-back zone",
    ],
  },
  "mooring-winches": {
    title: "Irgatlar ve Vinçler",
    introduction: "Bağlama ırgatları (mooring winches), palamar halatlarının sarılması ve gerilmesini sağlayan mekanik sistemlerdir.",
    content: `TYPES OF MOORING WINCH:

1. Single drum winch: one drum; a simple design, widely used.
2. Split drum winch: two drums; one for the working part of the line and the other for the stowed part.
3. Tension winch (auto-tension/render-recover): an automatic tension winch. It keeps the line tension constant. It is needed in ports with a large tidal range.
4. Brake drum: a drum that only brakes; the free end of the line is turned up on a bollard.

THE AUTOMATIC TENSION SYSTEM:

Auto-tension winches measure the tension in the line continuously. When the tension rises (the ship moving away) they render the line; when it falls (the ship coming in) they recover it. The tension setting must not exceed 60% of the SWL.

SAFETY:

Personnel must keep clear of the danger areas during winch operations. If a line under tension parts, the snap-back can be fatal. IMO MSC Circ.1175 requires snap-back zones to be marked on deck.`,
    bulletPoints: [
      "Auto-tension winch: gelgit farkı yüksek limanlarda gereklidir",
      "Ayar gerilimi SWL'nin %60'ını geçmemelidir",
      "IMO MSC Circ.1175: snap-back zone işaretlemesi zorunluluğu",
    ],
    warnings: [
      "The snap-back zone is a lethal danger area; it is marked on deck with yellow/red lines",
      "Never stand in front of the drum during winch operations",
    ],
  },
  "mooring-safety": {
    title: "Bağlama Operasyonlarında Güvenlik",
    introduction: "Bağlama operasyonları, denizcilik kazalarının en sık yaşandığı faaliyet alanlarından biridir; güvenlik protokollerinin sıkı uygulanması hayat kurtarır.",
    content: `THE MAIN RISKS:

1. Snap-back: a line under tension parting and whipping back. This is the most lethal risk. Because synthetic ropes store a lot of energy, the snap-back distance is long.

2. Trapping: hands/feet caught between lines, drums or sheaves.

3. Impact: uncontrolled movement of a line or of mooring equipment.

4. Falls: wet decks, lines as trip hazards, inattention.

SAFETY MEASURES:

- Snap-back zones must be clearly marked on deck (IMO MSC Circ.1175)
- PPE (helmet, safety glasses, safety shoes, gloves) must be worn
- Never stand in line with a rope that could part
- Keep clear of the fairleads
- Clear communication between the winch operator and the supervisor
- The slack must be controlled when turning a line up on a bollard

THE OCIMF MEG4 GUIDELINES:

The OCIMF Mooring Equipment Guidelines (MEG4) are the comprehensive reference for mooring safety. They give guidance on equipment design, maintenance, operational procedures and risk assessment.`,
    bulletPoints: [
      "Snapback: en ölümcül bağlama riski; sentetik halatlar yüksek enerji depolar",
      "Snap-back zone'lar güvertede işaretlenmelidir (IMO MSC Circ.1175)",
      "PPE: kask, gözlük, emniyet ayakkabısı, eldiven zorunludur",
      "OCIMF MEG4: bağlama güvenliği referans kılavuzu",
    ],
    warnings: [
      "Never stand in line with a rope under tension",
      "At least two people must be on duty during a mooring operation",
    ],
  },
  "single-buoy-mooring": {
    title: "Tek Şamandıra Bağlaması (SBM/SPM)",
    introduction: "Single Point Mooring (SPM), tankerlerin açık denizde yükleme/boşaltma yapabilmesi için kullanılan şamandıra bağlama sistemidir.",
    content: `SYSTEM LAYOUT:

An SPM/SBM (Single Buoy Mooring) consists of a large buoy anchored to the seabed. The tanker secures her bow to this buoy and can weathervane freely with the wind and current.

The components of the system:
- The buoy body
- The anchor legs/chains
- The turntable/swivel
- Submarine hoses/pipelines
- Floating hoses or a CALM system

THE MOORING PROCEDURE:

1. The tanker approaches the buoy under control (usually from downwind)
2. The pick-up line (pennant wire) is taken with a heaving line/messenger
3. The chafing chain is taken from the end of the buoy and secured in the tanker's bow stopper
4. The floating hoses are connected and cargo transfer begins

During mooring and loading the tanker can swing through 360° around the buoy. This allows safe operation in open sea conditions.

SBM operations are standardised in the OCIMF publication "SBM and SPM – Guidelines".`,
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
    image: "/diagrams/seamanship/dumen-tipleri.svg",
    introduction: "Dümen, geminin yön değiştirmesini sağlayan birincil manevra elemanıdır; tipi ve boyutu geminin manevra kabiliyetini doğrudan etkiler.",
    photos: [
      {
        src: photoRudderPropeller,
        title: "Yarı dengeli (semi-balanced) spade dümen ve pervane",
        caption: "The stern of a merchant ship in dry dock: a blue semi-balanced spade rudder and a five-bladed bronze propeller together. Relative to the propeller diameter, the rudder area is typically 1.5-2% of the underwater lateral area.",
        alt: "Stern view of a large ship in dry dock; a blue semi-balanced spade rudder and a large five-bladed bronze propeller, with workers and staging around them.",
      },
    ],
    content: `THE MAIN TYPES OF RUDDER:

1. Balanced rudder: part of the rudder area (20-25%) lies forward of the stock. This design reduces the rudder torque required. It is standard on modern merchant ships.

2. Semi-balanced rudder: the upper part is attached to a fixed structure and the lower part is free. A variation of the balanced rudder.

3. Unbalanced rudder: the whole rudder area lies aft of the stock. It requires high torque. Found on older ships.

4. Flap rudder (Becker rudder): a movable flap on the trailing edge of the rudder. It effectively increases the rudder angle and improves turning performance.

5. Schilling rudder: a profile design producing high lift. It improves manoeuvrability in confined waters.

RUDDER PARAMETERS:

The rudder area is generally 1.5-2% of the underwater lateral area. The maximum rudder angle is usually 35° each way. Under SOLAS the rudder must be capable of being put over from 35° on one side to 30° on the other in 28 seconds.

The initial turning effect acts on the stern, not on the bow. When the helm is put to starboard the stern swings to port, and only then does the ship begin to turn to starboard.`,
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
    photos: [
      {
        src: photoSteeringGear,
        title: "Hidrolik ram tipi dümen makinesi dairesi",
        caption: "Green hydraulic cylinders (rams) connected to the tiller, with hydraulic power packs and electric motors behind. SOLAS requires the steering gear to put the rudder from 35° over to 30° the other way in not more than 28 seconds.",
        alt: "A ship's steering gear room; two large green hydraulic ram cylinders connected to the tiller, with hydraulic pumps and gauges around them.",
      },
    ],
    content: `TYPES OF STEERING GEAR:

1. Ram type: hydraulic cylinders move the tiller. Two or four rams are used. Common on large ships.

2. Rotary vane type: a rotary vane hydraulic motor. Compact in design. Preferred on medium-sized ships.

3. Electric motor driven: the rudder is driven directly by an electric motor on small ships.

SOLAS REQUIREMENTS:

- The main steering gear must put the rudder over from 35° on one side to 30° on the other in 28 seconds
- The auxiliary steering gear must put the rudder over from 15° on one side to 15° on the other in 60 seconds
- There must be two independent power supplies
- It must be capable of being controlled from the bridge, from the steering gear compartment and from the emergency steering position
- A rudder angle indicator must be fitted on the bridge and in the steering gear compartment

EMERGENCY STEERING:

If the main steering gear fails, the changeover to the auxiliary system must be as quick as possible. Steering gear drills must be held regularly (every 3 months). The emergency steering procedure must be known by the crew.`,
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
    image: "/diagrams/seamanship/donme-dairesi.svg",
    introduction: "Dönme dairesi (turning circle), geminin tam dümen açısıyla 360° dönüş yaptığında çizdiği yoldur ve geminin manevra kabiliyetini tanımlar.",
    content: `TURNING CIRCLE PARAMETERS:

Advance: the distance travelled in the direction of the original course from the moment the helm is put over until the ship's head has turned 90°. Generally between 3 and 5 ship lengths.

Transfer: the distance moved at right angles to the original course from the moment the helm is put over until the head has turned 90°. Generally between 1 and 2 ship lengths.

Tactical diameter: the total distance moved at right angles to the original course when the ship has turned 180°. Generally between 3 and 6 ship lengths.

Final diameter: the diameter of the steady turn (once the rate of turn has settled).

Kick: the swing of the stern in the opposite direction to the turn when the helm is first put over.

INFLUENCING FACTORS:

- Rudder angle (the greater the angle, the smaller the diameter)
- Ship's speed (the higher the speed, the shorter the time to turn, though the diameter changes little)
- Trim (a ship trimmed by the stern turns less readily)
- Loading condition (the turning circle is larger when fully loaded)
- Wind and current
- Shallow water effect (the diameter increases)

IMO STANDARDS (MSC.137(76)):
- Advance ≤ 4.5 ship lengths
- Tactical diameter ≤ 5 ship lengths`,
    formula: {
      name: "IMO Manevra Standartları",
      expression: "Advance ≤ 4.5L  and  Tactical Diameter ≤ 5L",
      description: "L: gemi boyu (LBP). IMO MSC.137(76) standartlarına göre minimum performans gereksinimleri.",
    },
    examples: [
      {
        problem: "Calculate the maximum advance and tactical diameter permitted by the IMO standards for a ship with LBP = 200 m.",
        solution: "Advance ≤ 4.5 × 200 = 900 m. Tactical diameter ≤ 5 × 200 = 1,000 m. The ship must perform within these figures on her sea trials.",
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
    content: `STOPPING CONCEPTS:

Free stop: the engines are stopped and the ship slows under her own resistance. On large ships this distance is very long (it can take 30-40 minutes).

Crash stop (emergency stop): the engines are put full astern. The ship is stopped in the shortest possible distance. This manoeuvre imposes stress on the propeller shaft and the engine.

CRASH STOP PARAMETERS:

Track reach: the total distance the ship covers during the crash stop. Generally between 10 and 20 ship lengths.

Head reach: the distance travelled in the direction of the original course.

Lateral deviation: the sideways movement of the ship while stopping. The ship usually swings to one side because of transverse thrust.

INFLUENCING FACTORS:

- Ship's speed (the stopping distance increases with speed – a squared relationship)
- Displacement (the greater it is, the harder it is to stop)
- Hull form and resistance
- Propeller power and type
- Wind and current
- Shallow water effect (the stopping distance shortens but control becomes more difficult)

IMO STANDARD: head reach ≤ 15 ship lengths (MSC.137(76))`,
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
      "A crash stop imposes excessive stress on the propeller shaft and the engine",
      "On large container ships and tankers the stopping distance can be 2-3 km",
    ],
  },
  "squat-effect": {
    title: "Squat Etkisi ve Sığ Su Etkileri",
    image: "/diagrams/seamanship/squat-etkisi.svg",
    introduction: "Squat, geminin sığ suda veya dar kanalda hareket ederken su altı basınç değişimlerinin etkisiyle batmasıdır (draft artışı).",
    content: `THE PHYSICS OF SQUAT:

When a ship moves through the water the flow beneath and around the hull speeds up. By Bernoulli's principle, where the speed increases the pressure falls. The drop in pressure causes the ship to sink bodily (squat).

Definition of shallow water: the shallow water effect is significant when the depth/draft ratio is less than 1.5.

CALCULATING SQUAT (BARRASS FORMULA):

In open water: Squat ≈ Cb × V² / 100 (metres)
In a canal/confined water: Squat ≈ 2 × Cb × V² / 100 (metres)

Cb: the block coefficient
V: the ship's speed (knots)

THE EFFECTS OF SQUAT:

- An increase in draft (the most critical effect: the risk of grounding)
- A change of trim (usually an increase in trim by the head on a loaded ship)
- Reduced rudder effectiveness
- A larger turning circle

SHALLOW WATER EFFECTS:

- Increased wave resistance
- A drop in the ship's speed
- Reduced manoeuvrability
- A larger bow wave (the risk of bank erosion)`,
    formula: {
      name: "Squat Hesabı (Barrass Formülü)",
      expression: "Squat ≈ Cb × V² / 100  (open water, metres)",
      description: "Cb: blok katsayısı, V: hız (knot). Kanal/dar sularda sonuç 2 ile çarpılır.",
    },
    examples: [
      {
        problem: "Calculate the squat of a bulk carrier with Cb = 0.80 at 12 knots in open shallow water.",
        solution: "Squat = Cb × V² / 100 = 0.80 × 12² / 100 = 0.80 × 144 / 100 = 1.152 m. The ship's draft will increase by about 1.15 metres. In a canal transit this becomes 2 × 1.15 = 2.30 m.",
      },
    ],
    bulletPoints: [
      "Derinlik/Draft < 1,5 → sığ su etkisi belirgin",
      "Squat hızın karesiyle orantılı artar",
      "Kanal squat'ı açık su squat'ının yaklaşık 2 katıdır",
      "En kritik risk: draft artışı → karaya oturma",
    ],
    warnings: [
      "Speed must always be reduced in shallow water (squat increases with the square of the speed)",
      "Squat must always be taken into account in the UKC calculation",
    ],
  },
  "bank-effect": {
    title: "Kıyı Etkisi (Bank Effect) ve Kanal Seyri",
    introduction: "Kıyı etkisi, geminin kıyıya veya kanal duvarına yakın seyrettiğinde ortaya çıkan asimetrik su akışının neden olduğu istem dışı yön değiştirmesidir.",
    content: `THE MECHANISM OF BANK EFFECT:

When a ship passes close to a canal wall or a bank, the flow on the near side speeds up (the confined space) and the flow on the far side slows down. By Bernoulli's principle:
- The pressure falls on the near side → the ship is drawn towards the bank (suction)
- While the bow is pushed away from the bank, the stern is drawn towards it
- The result: the bow appears to sheer away from the bank while in fact the stern moves towards it

INTERACTION BETWEEN TWO SHIPS:

Similar effects arise between two ships running parallel or meeting in confined waters:
- On approach: bow-to-bow repulsion
- Passing abeam: mutual attraction (suction)
- Drawing apart: stern-to-stern repulsion

These effects act more strongly on small ships. A small vessel must leave a safe distance and reduce speed when a large ship passes.

RULES FOR CANAL PASSAGE:

1. Keep to the centreline (where possible)
2. Reduce speed (this reduces squat and bank effect)
3. Keep tight control of the helm
4. Take extra care when meeting and overtaking
5. Follow the pilot's advice

THE SUEZ AND PANAMA CANALS:

Special navigation rules and speed limits apply in these canals. Pilotage is compulsory. The ship's dimensions must comply with the canal transit restrictions (Suezmax, Panamax, Neopanamax).`,
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
    photos: [
      {
        src: photoDeckCrane,
        title: "Güverte üzerindeki pedestal (sütunlu) vinç",
        caption: "A pedestal crane with its jib extended and hook block rigged, on the deck of a modern dry cargo ship. The SWL (Safe Working Load) is set by the weakest component; every crane must be load tested and certified annually.",
        alt: "A tall grey pedestal crane on the deck of a dry cargo ship at sea, its jib extended and hook hanging over the hatch.",
      },
    ],
    content: `TYPES OF CRANE:

Deck crane: fitted on most modern cargo ships. Hydraulically driven and capable of slewing through 360°. The SWL is generally between 25 and 35 tonnes. Capacity can be increased by working two cranes together in tandem.

Gantry crane: a crane travelling on rails. It works over the hatch covers on container ships.

BASIC CRANE PARAMETERS:

SWL (Safe Working Load): the maximum load the crane can lift safely.
Outreach: the maximum working radius from the crane centre.
Hoisting speed: the lifting speed (m/minute).
Slewing speed: the rate of turn (degrees/second).

CRANE SAFETY:

- The SWL must never be exceeded
- Slewing under load must be done carefully
- The wind speed limits must be observed (operations are usually stopped above 20 m/s)
- Nobody must stand under the load
- The crane operator must be certificated`,
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
    content: `TYPES OF DERRICK:

Swinging derrick: the most basic type. A boom pivoted on a mast/samson post. Two derricks are worked together in a union purchase rig.

Heavy lift derrick (Stülcken, jumbo): heavy lift derricks of 100-500 tonnes capacity. Rare today; most have been replaced by heavy lift cranes.

THE UNION PURCHASE RIG:

Two derricks worked together to move the load from the hold to the quay or vice versa. One derrick is plumbed over the hatch (the hatch derrick) and the other outboard (the yard derrick).

- Hatch derrick: lifts the load out of the hold
- Yard derrick: carries the load outboard
- The runners of the two derricks are shackled to the same hook

SAFETY:

In derrick operations the weakest element (rope, block, shackle) determines the SWL. In union purchase the SWL is lower than the capacity of a single derrick (because of the angle between the runners).`,
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
    photos: [
      {
        src: photoHatchCovers,
        title: "Folding tipi (katlanır) çelik ambar kapakları",
        caption: "Blue folding hatch covers on a bulk carrier, opened and closed by hydraulic actuators. Weathertightness is achieved by a rubber gasket seating on the coaming together with a compression bar.",
        alt: "Large blue folding hatch covers, hydraulic cylinders and the hatch coaming on the deck of a bulk carrier.",
      },
    ],
    content: `TYPES OF HATCH COVER:

1. Hydraulic folding: the panels are folded open by hydraulic cylinders. Common on modern bulk carriers.

2. Side rolling: the panels roll sideways on rails. Used on container and general cargo ships.

3. Piggyback: the panels stack on top of each other. Preferred on ships with limited deck space.

4. Pontoon type: independent panels lifted off by crane. Found on older ships.

WEATHERTIGHTNESS:

The weathertightness of hatch covers is mandatory under SOLAS and the Load Line Convention. Regardless of the weather, all covers must be properly closed and checked before proceeding to sea.

Test methods:
- Hose test: testing the seals with a high-pressure water jet
- Chalk test: chalking the compression bars to check contact
- Ultrasonic test: leak detection with an ultrasonic instrument (the most reliable method)

GASKETS AND MAINTENANCE:

Rubber gaskets must be checked periodically. Hardened, cracked or deformed gaskets must be replaced. The packing line and cleating mechanisms must be maintained regularly.`,
    bulletPoints: [
      "Hidrolik katlanır: modern dökme yük gemilerinde standart",
      "Ultrasonik test en güvenilir su geçirmezlik kontrol yöntemidir",
      "Ambar kapaklarının su geçirmezliği SOLAS zorunluluğudur",
      "Contalar periyodik olarak kontrol edilmeli ve değiştirilmelidir",
    ],
    warnings: [
      "Proceeding to sea with a damaged hatch cover is a legal breach",
      "Hatch covers are equipment frequently checked in PSC inspections",
    ],
  },
  "ventilation-systems": {
    title: "Havalandırma Sistemleri",
    introduction: "Gemi havalandırma sistemleri, yük ambarları, makine dairesi ve yaşam alanlarında yeterli hava dolaşımını sağlar.",
    content: `TYPES OF VENTILATION:

Natural ventilation: air movement produced by wind and temperature difference. Cowl and mushroom ventilators work on this principle.

Mechanical ventilation: forced air circulation by fans and blowers. Used in the engine room, the pump room and large cargo holds.

CARGO HOLD VENTILATION:

Hold ventilation is critical in preventing cargo sweat and ship sweat. The dew point rule is applied:

Outside air dew point < cargo temperature → ventilation may be carried out
Outside air dew point > cargo temperature → ventilation must not be carried out

ENGINE ROOM VENTILATION:

The engine room requires continuous ventilation (combustion air + cooling + a working environment). The minimum air change rate is 20-30 changes per hour.

VENTILATION OF HAZARDOUS AREAS:

Tanker pump rooms and enclosed spaces where an explosive atmosphere can form require continuous mechanical ventilation. Entry is prohibited when the ventilation is stopped.`,
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
    content: `MAINTENANCE ACTIVITIES:

1. Rust removal: mechanical cleaning by chipping, wire brushing, needle gun or power tool. The surface should be brought to the Sa 2½ (near-white blast) standard.

2. The paint system:
   - Primer: protects the metal surface from corrosion. Epoxy primer is common.
   - Intermediate coat: builds up the thickness of the protective film.
   - Top coat: protects against UV and mechanical wear.

3. Deck washing: washing with fresh water to prevent salt build-up.

4. Greasing: moving parts (fairleads, rollers, shackles) must be greased regularly.

5. Sounding: daily checks of the ballast tanks, fresh water tanks and bilge levels.

PAINTING CONDITIONS:

The ideal conditions for applying paint:
- Surface temperature: at least 3°C above the dew point
- Relative humidity: below 85%
- Wind speed: not excessive (dust and grit)
- Paint must not be applied in direct sunlight (blistering)

PMS (Planned Maintenance System):

Under the ISM Code all maintenance is planned, carried out and recorded within the PMS. Digital PMS software manages this process.`,
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
    photos: [
      {
        src: photoLifeboatEnclosed,
        title: "Tamamen kapalı cankurtaran sandalı (TEMPSC) — davit asılı",
        caption: "A bright orange totally enclosed (TEMPSC) lifeboat hanging in its davits on the boat deck of a cargo ship. SOLAS requires capacity for 100% of the total complement on each side.",
        alt: "A bright orange totally enclosed lifeboat hanging in its davit on the ship's side, with the grey hull behind.",
      },
    ],
    content: `TYPES OF LIFEBOAT:

1. Open lifeboat: an open boat. The old standard; no longer fitted on newly built ships.

2. Totally Enclosed Lifeboat (TELB): a fully enclosed boat. The SOLAS standard. It is self-righting. It has a diesel engine and an independent air supply system.

3. Partially enclosed lifeboat: used on some passenger ships.

4. Free-fall lifeboat: launched by free fall from the stern. Common on tankers and bulk carriers. The evacuation time is very short (seconds rather than minutes).

LIFEBOAT EQUIPMENT (SOLAS III/34):

- Engine and fuel (24 hours running)
- Compass and sextant
- Fresh water (3 litres per person) and food rations
- First aid equipment
- Signal flares and a torch
- Radar reflector and SART
- Rainwear and thermal protective aids
- Sea anchor
- Water purification tablets
- Oars – carried even in motor lifeboats

CAPACITY AND ARRANGEMENT:

Capacity for 100% of the ship's complement on each side. All personnel must be able to be saved even if one side cannot be used.`,
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
    photos: [
      {
        src: photoLiferaftCanister,
        title: "Şişirilebilir cankurtaran salı kanisteri (HRU ile)",
        caption: "An inflatable liferaft packed in a white glass-fibre cylindrical canister, mounted on its cradle and connected by a hydrostatic release unit (HRU) and painter line. The HRU releases automatically once the ship sinks to about 4 m.",
        alt: "A white cylindrical liferaft canister on its cradle on a ship's deck, with the HRU and red painter line visible.",
      },
    ],
    content: `TYPES OF LIFERAFT:

1. Inflatable liferaft: the most common type. Stowed in a fibreglass canister. It inflates automatically when thrown into the sea or released by the hydrostatic release unit. Capacity: 6-150 persons.

2. Rigid liferaft: a rigid raft. It needs no servicing but takes up bulky stowage space.

3. Davit-launched liferaft (DLRS): a raft lowered by davit. It is an advantage in evacuating elderly or disabled passengers.

THE HYDROSTATIC RELEASE UNIT (HRU):

The raft is released automatically as the ship sinks. The mechanism is triggered by water pressure at a depth of 1.5-4 metres. A weak link separates the raft from the sinking ship. HRUs must be serviced at a certified station every 2 years.

LIFERAFT SERVICING:

Inflatable rafts are serviced at a certified service station every 12 months (30 months with some makers). At the service they are inflated, the equipment is checked and they are repacked.`,
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
    content: `LAUNCHING A LIFEBOAT (CONVENTIONAL DAVIT):

1. The master gives the order to abandon ship (7 short blasts + 1 prolonged)
2. The crew go to the muster stations
3. Lifejackets are put on
4. The boat's gripes are released
5. The boat is swung out (the davits are turned out)
6. The crew board the boat
7. The painter is checked
8. The falls are eased under control and the boat is lowered to the water
9. Once waterborne, the releasing hooks are operated (on-load release)
10. The painter is cut and the boat clears the ship

FREE-FALL LAUNCHING:

1. The crew board the boat and fasten their harnesses
2. The hatch is closed
3. The release lever is pulled
4. The boat slides down the ramp and enters the water in free fall
5. The engine is started and the boat clears the ship

DRILLS:

Under SOLAS III/19.3.2 every crew member takes part in an abandon ship drill at least once a month. Every lifeboat is launched and manoeuvred in the water with its assigned operating crew at least once every 3 months (SOLAS III/19.3.4.3).`,
    bulletPoints: [
      "Abandon ship sinyali: 7 kısa + 1 uzun düdük",
      "On-load release: sandal denizde iken hook serbest bırakılır",
      "Freefall: emniyet kemeri zorunlu, çok hızlı tahliye",
      "A monthly drill (III/19.3.2); every lifeboat launched at least once every 3 months (III/19.3.4.3)",
    ],
    warnings: [
      "Misuse of the on-load release mechanism carries a risk of accident; training is critical",
      "All personnel must fasten their harnesses before a free-fall lifeboat is launched",
    ],
  },
  "rescue-boat": {
    title: "Kurtarma Botu (Rescue Boat)",
    introduction: "Kurtarma botu, denize düşen kişinin kurtarılması ve acil müdahale amacıyla kullanılan hızlı tahlisiye aracıdır.",
    content: `RESCUE BOAT CHARACTERISTICS (SOLAS III/17):

- Capacity for at least 6 persons
- Capable of at least 6 knots
- Able to run at full power for 4 hours
- An arrangement for recovering a person from the water (boarding ramp/scramble net)
- First aid equipment
- A searchlight
- A VHF radio
- A compass

LAUNCHING AND USE:

The rescue boat is normally launched by davit. Single-arm slewing davits and A-frame davits are the common types. The launching time must not exceed 5 minutes.

In a man overboard situation the rescue boat is the fastest means of response. While the ship turns back with a Williamson or Anderson turn, the rescue boat is prepared.

DRILLS:

The rescue boat is launched and manoeuvred with its assigned crew monthly as far as practicable, and in any case at least once every 3 months (SOLAS III/19.3.4.4). The rescue boat crew must be specially trained.`,
    bulletPoints: [
      "Minimum 6 kişi kapasiteli, 6 knot hız",
      "İndirme süresi ≤ 5 dakika",
      "MOB durumunda birincil müdahale aracı",
      "Launched monthly where practicable, and in any case at least once every 3 months (SOLAS III/19.3.4.4)",
    ],
    keyPoints: [
      "Williamson turn: 60° dönüş + karşı dümen → orijinal hatta dönüş",
      "Anderson turn: hızlı geri dönüş, kısa mesafede MOB yaklaşımı",
    ],
  },
  "life-saving-appliances": {
    title: "Kişisel Can Kurtarma Teçhizatı",
    introduction: "SOLAS Bölüm III, her gemide bulunması gereken kişisel can kurtarma araçlarını ve bunların standartlarını belirler.",
    photos: [
      {
        src: photoLsaPersonal,
        title: "SOLAS kişisel can kurtarma teçhizatı seti",
        caption: "An orange SOLAS lifejacket (with whistle and light), a red immersion suit, an EPIRB and a lifebuoy (with self-igniting light and buoyant line) together. Each lifejacket provides at least 100 N of buoyancy per person.",
        alt: "Personal life-saving appliances laid out on a ship's deck: an orange lifejacket, a red immersion suit, a red EPIRB and a white-and-red lifebuoy.",
      },
    ],
    content: `PERSONAL EQUIPMENT:

Lifejacket: one for every person. It must turn an unconscious person face up. A whistle and a light are attached. Children's lifejackets are also carried.

Lifebuoy: at strategic points on the bridge and deck. A minimum of 8 (more on ships over 200 m). At least 2 fitted with a self-igniting light and a self-activating smoke signal. At least 2 with a buoyant lifeline attached.

Immersion suit: protection from hypothermia in cold water. It must maintain body temperature for 1 hour. It is mandatory for every person (in certain trading areas).

Thermal Protective Aid (TPA): may be carried in place of immersion suits on ships trading in warm waters.

EPIRB (Emergency Position Indicating Radio Beacon): operates on 406 MHz. With integral GPS it transmits position information. It is released automatically by an HRU. The battery transmits for 48 hours.

SART (Search and Rescue Transponder): responds to a 9 GHz radar signal. It appears on the radar screen as a line of 12 dots.`,
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
    content: `THE DECISION TO ABANDON:

The decision to abandon ship is taken by the master alone. It must be taken only when it is certain that the ship is sinking, burning or otherwise unable to remain afloat. The principle: "abandoning ship is always the last resort."

THE PROCEDURE:

1. The master makes a MAYDAY call
2. The general alarm is sounded (7 short blasts + 1 prolonged)
3. The crew muster at the muster stations
4. A roll call is taken (against the muster list)
5. Lifejackets are put on
6. The EPIRB and SART are activated
7. The survival craft are prepared
8. On the master's order the boats/rafts are boarded
9. The craft are launched
10. They clear the ship to a safe distance (at least 200 m)
11. The survival craft are kept together
12. Survival procedures are put into effect

SURVIVAL PRIORITIES:

1. Protection (from cold, heat and the elements)
2. Location (EPIRB, SART, flares)
3. Water (conserving the fresh water ration)
4. Food
5. Keeping morale up

The timing of flares is critical; they must not be used until a ship or aircraft is sighted.`,
    bulletPoints: [
      "Terk kararı yalnızca kaptan tarafından verilir",
      "MAYDAY çağrısı + genel alarm (7 kısa + 1 uzun)",
      "Gemiden en az 200 m uzaklaşılmalıdır",
      "Hayatta kalma öncelikleri: koruma > pozisyon > su > gıda",
    ],
    warnings: [
      "Abandoning ship is always the last resort",
      "Flares must only be used when a rescue unit has been sighted",
    ],
  },

  // =====================================================
  // BÖLÜM 8 - YANGIN ÖNLEME VE SÖNDÜRME
  // =====================================================
  "fire-triangle": {
    title: "Yangın Üçgeni ve Yangın Sınıfları",
    image: "/diagrams/seamanship/yangin-sinifi.svg",
    introduction: "Yangın, ısı, yakıt ve oksijenin bir arada bulunmasıyla başlar; bu üç unsurun herhangi birini ortadan kaldırmak yangını söndürür.",
    content: `THE FIRE TRIANGLE:

Three elements: heat + fuel + oxygen (O₂). Modern thinking adds the chemical chain reaction and uses the concept of the "fire tetrahedron".

Principles of extinguishing:
- Cooling: removing the heat (water)
- Smothering: cutting off the oxygen (CO₂, foam, inert gas)
- Starving: removing the fuel
- Chemical inhibition: breaking the chain reaction (dry powder)

CLASSES OF FIRE (IMO):

Class A: solid materials (wood, paper, textiles). Extinguishing: water.
Class B: flammable liquids (fuel, paint, oil). Extinguishing: foam, CO₂, dry powder.
Class C: flammable gases (LPG, natural gas). Extinguishing: dry powder. The gas supply must be shut off.
Class D: combustible metals (magnesium, aluminium powder). Extinguishing: special dry powder.
Class E (electrical fire): electrical equipment. Extinguishing: CO₂, dry powder. Water is not used.
Class F: cooking oils. Extinguishing: wet chemical.

A CRITICAL RULE: never play water on a Class B fire (it splashes the burning liquid and spreads it).`,
    bulletPoints: [
      "Yangın üçgeni: Isı + Yakıt + Oksijen",
      "A sınıfı: katı → su, B sınıfı: sıvı → köpük/CO₂",
      "C sınıfı: gaz → kuru toz, gaz kaynağını kes",
      "Elektrik yangınında su kullanılmaz",
    ],
    warnings: [
      "Never play water on a Class B fire: the burning liquid splashes and spreads",
      "In an electrical fire, isolate the power first, then extinguish with CO₂",
    ],
  },
  "fire-detection": {
    title: "Yangın Algılama ve Alarm Sistemleri",
    introduction: "Erken algılama, gemide yangın kontrolünün en kritik aşamasıdır; SOLAS Bölüm II-2 yangın algılama sistemi gereksinimlerini belirler.",
    content: `TYPES OF DETECTION:

1. Smoke detector: ionisation or photoelectric type. Mandatory in the accommodation and alleyways.

2. Heat detector: fixed temperature (usually 68°C) or rate-of-rise type. Used in the engine room and the galley.

3. Flame detector: with a UV or IR sensor. Used in the engine room and on open deck areas.

4. Manual call point: the button used by the crew to raise the alarm. Fitted on every escape route and on deck.

THE FIRE ALARM SYSTEM:

The central fire alarm panel is on the bridge or in the fire control station. The location of the fire is identified by the zone indication. The audible and visual alarm must be perceived throughout the ship.

FIRE PATROL AND WATCHKEEPING:

SOLAS requires continuous fire watch. A fire patrol is mandatory, particularly on passenger ships.`,
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
    photos: [
      {
        src: photoFireExtinguishers,
        title: "Gemi koridorunda taşınabilir söndürücü istasyonu",
        caption: "Left: red CO₂ (class B-E, safe on electrical fires). Centre: red dry powder, multi-purpose ABC. Right: cream AFFF foam (class B). SOLAS requires annual inspection and a hydrostatic test every 5 years.",
        alt: "Three portable fire extinguishers mounted on a white-painted ship's bulkhead: red CO₂, red dry powder and cream foam, with A-B-C class labels beside them.",
      },
    ],
    table: {
      title: "Taşınabilir Söndürücü Tipleri ve Kullanım Alanları",
      headers: ["Söndürücü Tipi", "Söndürme Maddesi", "Fire Class", "Menzil (m)", "Caution"],
      rows: [
        ["Su", "Su (9 L)", "A", "6-10", "Elektrikte kullanılamaz"],
        ["Köpük (Foam)", "AFFF (9 L)", "A, B", "3-6", "Elektrikte kullanılamaz"],
        ["CO₂", "Karbondioksit (5 kg)", "B, E", "1-3", "Kapalı alanda O₂ düşer"],
        ["KKT", "Kuru kimyevi toz (6-9 kg)", "A, B, C, E", "3-6", "Artık bırakır, hassas cihazda dikkat"],
        ["Temiz Ajan", "HFC-227ea / FK-5-1-12", "B, C, E", "2-4", "Ozon dostu, pahalı"],
      ],
    },
    content: `TYPES OF EXTINGUISHER:

1. CO₂ (carbon dioxide): Class B and E fires. It extinguishes by cutting off the oxygen. There is a risk of asphyxiation in an enclosed space. It is safe on electrical fires.

2. Dry chemical powder: ABC type (multi-purpose). It works by chemical inhibition and smothering. It has a wide application but does not prevent re-ignition.

3. Foam: Class B (liquid) fires. It blankets the surface, cutting off the oxygen, and cools. AFFF (Aqueous Film Forming Foam) is the common type.

4. Water: Class A fires. It works by cooling.

SITING AND MAINTENANCE:

Under SOLAS II-2/10 a sufficient number of extinguishers must be provided on every escape route, in every accommodation space and in every machinery space. Extinguishers must be inspected annually, their pressure checked, and be hydrostatically tested every 5 years.`,
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
    photos: [
      {
        src: photoCo2System,
        title: "Sabit CO₂ söndürme sistemi cylinder room",
        caption: "A fixed CO₂ system for engine room fires: high-pressure red CO₂ cylinders connected to the manifold and release valves. An audible and visual alarm with a 20-second delay before discharge allows personnel to evacuate.",
        alt: "Two rows of large red high-pressure CO₂ cylinders and the manifold piping in a white-ceilinged compartment.",
      },
    ],
    content: `FIXED SYSTEMS:

1. CO₂ system: used in machinery spaces and cargo holds. The CO₂ cylinders are stored in a separate CO₂ room. When the system is released all personnel in the space must have been evacuated (risk of death). There is a two-man release safety mechanism.

2. Foam system: tanker decks, helicopter decks and machinery spaces. High-expansion foam: fills large volumes. Low-expansion foam: blankets a liquid surface.

3. Water mist system: cooling and oxygen dilution with fine water droplets. Increasingly used as an alternative to CO₂ in machinery spaces.

4. Sprinkler system: automatic fire extinguishing in the accommodation. Triggered by a heat-sensitive glass bulb.

5. Drencher system: protects deck areas with a water curtain. It prevents fire spreading.

THE CO₂ PROCEDURE IN AN ENGINE ROOM FIRE:

1. The alarm is raised and all personnel are evacuated
2. All ventilation fans are stopped and the dampers closed
3. The fuel shut-off valves are closed
4. The CO₂ alarm period (20-30 s) is allowed to run
5. The CO₂ is released
6. The space must not be opened for up to 24 hours`,
    bulletPoints: [
      "CO₂ sistemi: ölümcül gaz, two-man release zorunlu",
      "High-expansion foam: büyük hacim doldurma",
      "Water mist: CO₂'ye modern alternatif",
      "Sprinkler: otomatik, ısıyla tetiklenen cam ampul",
    ],
    warnings: [
      "Before releasing CO₂ it must be confirmed that all personnel have left the space",
      "Leave the space immediately when the CO₂ alarm sounds",
    ],
  },
  "fire-fighting-procedure": {
    title: "Yangınla Mücadele Prosedürü",
    introduction: "Gemide yangın müdahalesi, organize ekip çalışması ve standart prosedürlerin uygulanmasını gerektirir.",
    content: `FIRE RESPONSE, STEP BY STEP:

1. DISCOVERY: the fire is detected and the alarm is raised.
2. ALARM: the fire alarm is sounded (continuous bell or general alarm). The bridge is informed.
3. CONTAINMENT: the area is isolated. Doors and ventilation are closed. The fire is prevented from spreading.
4. EXTINGUISHING: the fire is attacked with the appropriate medium. The correct agent is chosen for the class of fire.
5. COOLING: the area is cooled after the fire to prevent re-ignition.
6. WATCHKEEPING: the area is watched for a long period after the fire is out (checking for re-ignition).

FIRE TEAM ORGANISATION (MUSTER LIST):

- Fire team leader (usually the chief officer)
- Hose team (nozzleman + back-up)
- Support team (preparing EEBD/BA, damage control)
- Engine team (pumps, valve control, power management)
- Rescue team (evacuating casualties)
- Communications rating (between the bridge and the team)

LIFE SUPPORT EQUIPMENT:

BA (Breathing Apparatus): self-contained breathing apparatus. Mandatory when entering the fire area. 30-45 minutes of air.
EEBD (Emergency Escape Breathing Device): an escape breathing device. 15 minutes' capacity. Used only for escape, never for fighting a fire.
Fire suit: a heat-resistant entry suit. There are two types: the proximity suit and the entry suit.`,
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
    content: `DRILL REQUIREMENTS (SOLAS III/19):

Every crew member must take part in at least one fire drill a month (III/19.3.2). If more than 25% of the crew did not take part in the drills on board in the previous month, a drill is held within 24 hours of the ship leaving port. Crew joining the ship are given training in the fire equipment within two weeks at the latest (III/19.4.1). Drills must be planned with scenarios that are as realistic as possible.

DRILL CONTENT:

1. Recognising the fire alarm signal
2. Mustering at the muster station and taking a roll call
3. Running out a fire hose and putting water on
4. Using portable extinguishers
5. Donning and using BA
6. Checking the communications equipment
7. Checking the fire doors, watertight doors and dampers
8. Starting the fire pump and the emergency generator
9. Reviewing the arrangements for abandoning ship

RECORDS AND DOCUMENTATION:

All drills are entered in the log book. The date, scenario, participants and assessment notes are recorded. Drill records are checked in PSC inspections. Missing drill records can be grounds for detention.`,
    bulletPoints: [
      "Fire drill: at least one a month for every crew member (SOLAS III/19.3.2)",
      "Crew joining the ship: LSA/FFE training within 2 weeks at the latest (SOLAS III/19.4.1)",
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
    content: `REST PERIODS (STCW A-VIII/1):

A minimum of 10 hours' rest must be provided in any 24-hour period.
A minimum of 77 hours' rest must be provided in any 7-day period.
The 10 hours' rest may be divided into no more than two periods; one of them must be at least 6 hours.

WATCH ARRANGEMENTS:

The standard three-watch system (4 hours on, 8 hours off):
- 00:00-04:00 and 12:00-16:00: the second officer
- 04:00-08:00 and 16:00-20:00: the third officer
- 08:00-12:00 and 20:00-24:00: the chief officer

Port watches: a special watch arrangement applies during cargo operations.

THE OFFICER OF THE WATCH'S RESPONSIBILITIES:

1. Safe navigation: monitoring bearings, depth and weather
2. Compliance with the COLREGs
3. Keeping the records (the deck log)
4. Knowing when to call the master
5. Coordination with the engine room`,
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
    photos: [
      {
        src: photoBridgeWatch,
        title: "Modern köprüüstü ve seyir vardiyası",
        caption: "The officer of the watch, in uniform, appraising the situation using ECDIS and the X/S-band radars. The bridge equipment — ECDIS, ARPA radar, GPS, AIS, autopilot and VHF — is arranged to STCW BRM standards.",
        alt: "Interior view of a modern ship's bridge; radar and ECDIS displays, a wooden helm, and a uniformed officer looking out towards the horizon.",
      },
    ],
    content: `BRM PRINCIPLES:

1. Teamwork: open communication and a clear division of duties between the master, the officer of the watch and the lookout.
2. Situational awareness: continuous awareness of the ship's position, her surroundings, the traffic and the weather.
3. Decision making: a structured decision-making process; avoiding hasty decisions.
4. Communication: standard bridge terminology and closed-loop communication.

CLOSED-LOOP COMMUNICATION:

The person giving the order: "Starboard ten"
The person executing it: "Starboard ten, Sir"
The person giving the order: verifies the rudder angle indicator

CRITICAL SITUATIONS:

BRM training encourages junior personnel to challenge the master or a senior officer when necessary. This culture must be developed in order to prevent accidents caused by fear of the hierarchy.`,
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
    content: `COLREG RULE 5 – LOOK-OUT:

"Every vessel shall at all times maintain a proper look-out by sight and hearing as well as by all available means appropriate in the prevailing circumstances and conditions."

PRINCIPLES OF KEEPING A LOOK-OUT:

1. Visual look-out: continuous scanning of the horizon by eye and with binoculars
2. Aural look-out: fog signals, alarms, sounds from the sea
3. Radar look-out: systematic monitoring with radar and ARPA
4. AIS monitoring: identifying the ships around you
5. VHF listening watch: Channel 16 and the traffic channels

THE LOOKOUT'S DUTIES:

- Reporting every object (ships, obstructions, floating objects, people)
- Identifying navigation lights and shapes
- Reporting immediately to the officer of the watch
- Knowing the escape routes and the safety equipment

NO EXEMPTION FROM THE LOOK-OUT:

Under no circumstances may the look-out duty be combined with another task. Keeping a look-out while steering is a breach of STCW and the COLREGs (with certain exceptions).`,
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
    content: `THE HANDOVER PROCESS:

The relieving officer of the watch must be given the following information before taking over the watch:

1. The ship's present position and heading
2. The planned route and the next waypoint
3. The speed and the state of the engine
4. The traffic around (ships, fishing vessels)
5. The weather and sea state
6. Tidal and current information
7. Navigational warnings (NAVTEX, NAVAREA)
8. The master's standing orders
9. Any equipment defects
10. The passage plan and the state of the charts

WHEN NOT TO TAKE OVER:

The officer of the watch must not take over the watch:
- If their eyes are not adapted to the dark (at night)
- If they are not fully aware of the situation
- During a manoeuvre or a close-quarters situation (they must wait until it is complete)

SOLAS and STCW require the handover of the watch to be recorded.`,
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
    content: `DARK ADAPTATION:

It takes about 20-30 minutes for the human eye to adapt fully to darkness. Even brief exposure to white light destroys the adaptation and another 20-30 minutes is needed.

BRIDGE BLACKOUT:

Bridge lighting is switched to red at night. Red light has minimal effect on the eye's dark adaptation. Chart table lighting is also red-filtered.

PRACTICAL RULES:

- Wait before entering the bridge so that the eyes can adapt
- Turn the brightness of white-lit screens down to minimum
- Looking at the radar screen for long periods destroys adaptation; look at the horizon periodically
- Covering one eye to protect it is an old but effective technique
- After exposure to a bright light, wait at least 10 minutes in red light`,
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
    content: `HEAVY WEATHER PREPARATION CHECKLIST:

DECK:
- All hatch covers are checked and secured
- The ventilator closing appliances are confirmed shut
- Loose gear on deck (paint tins, drums, staging) is secured
- The deck scuppers are checked clear
- The guardrails and deck lighting are checked
- Deck access restrictions are set (lifelines rigged)

CARGO AND HOLDS:
- The cargo lashings are checked and additional lashings added if necessary
- Hold ventilation is closed
- Free surface in the tanks is minimised (tanks either full or empty)

ENGINE ROOM:
- All moving parts are secured
- The bilge pump is checked
- The fuel transfer plan is reviewed

BRIDGE:
- The weather forecasts are updated
- Alternative routes are considered
- NAVTEX/GMDSS warnings are monitored

When heavy weather is expected the master issues a Heavy Weather Preparedness circular and informs all departments.`,
    bulletPoints: [
      "Ambar kapakları, havalandırıcılar, scupper'lar kontrol edilir",
      "Güvertedeki serbest malzemeler sabitlenir",
      "Serbest yüzey etkisi minimize edilir (tanklar dolu veya boş)",
      "Lifeline kurulumu ile güverte geçiş güvenliği sağlanır",
    ],
    warnings: [
      "Going out on deck in a storm is prohibited without the master's permission",
      "The free surface effect is the main cause of loss of stability",
    ],
  },
  "parametric-rolling": {
    title: "Parametrik Salınım",
    introduction: "Parametrik salınım, dalga karşılaşma periyodunun geminin doğal salınım periyodunun yarısına eşit olduğu durumda gelişen tehlikeli yalpa hareketidir.",
    content: `THE MECHANISM:

Parametric rolling arises from the periodic change in the ship's waterplane area as a wave passes. When the wave crest is amidships the waterplane area decreases (GM falls); in the trough the waterplane area increases (GM rises). Under certain conditions this variation in GM creates resonance.

DANGEROUS CONDITIONS:

- The wave encounter period ≈ half the ship's natural roll period (Te ≈ Tr/2)
- A wave height greater than 40% of the ship's beam
- More frequent on ships with pronounced flare forward and aft

SHIP TYPES AFFECTED:

Container ships in particular, large C11-type post-Panamax container ships and Ro-Ro ships are susceptible to parametric rolling. The serious container loss casualties of the 2000s were attributed to this phenomenon.

AVOIDANCE STRATEGIES:

1. Changing speed (to change the encounter period)
2. Changing course (to change the wave angle)
3. Monitoring with wave radar and forecasting software
4. Using anti-rolling tanks or fin stabilisers`,
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
      "Parametric rolling can reach roll angles of 30°+; the risk of container loss and capsizing",
      "Particular care is needed in long waves from ahead or astern",
    ],
  },
  "synchronous-rolling": {
    title: "Senkron Salınım ve Broaching",
    introduction: "Senkron salınım, dalga karşılaşma periyodunun geminin doğal salınım periyoduna eşit olduğu durumda gelişen tehlikeli rezonans halidir.",
    content: `SYNCHRONOUS ROLLING:

When the wave encounter period (Te) equals the ship's natural roll period (Tr), each wave increases the roll (resonance). The roll angles grow progressively and can approach the point of capsize.

Te = Tr → synchronous rolling

BROACHING:

Broaching is the uncontrolled yaw of a ship under the influence of a following or quartering sea, leaving her lying beam-on to the waves. It usually happens when running with the sea at a similar speed. Steering control is lost.

AVOIDANCE:

Avoiding synchronous rolling:
- Change speed to change the encounter period
- Change course to change the wave angle
- Use the tanks to change GM

Avoiding broaching:
- Avoid taking the sea from astern
- Reduce speed (below the wave speed)
- Use the helm actively`,
    bulletPoints: [
      "Te = Tr → senkron salınım (rezonans), yalpa açıları büyür",
      "Broaching: kıçtan dalga ile kontrolsüz dönüş, dümen kaybı",
      "Hız ve rota değişikliği her iki tehlike için de çözümdür",
    ],
    warnings: [
      "There is a risk of capsizing in synchronous rolling",
      "Broaching is more common on small and medium-sized ships",
    ],
  },
  "heavy-weather-nav": {
    title: "Fırtınada Seyir Stratejileri",
    introduction: "Ağır havada seyir, gemi güvenliği ve yapısal bütünlüğü korumak için özel stratejiler ve hız/rota kararları gerektirir.",
    content: `HEAVY WEATHER STRATEGIES:

1. HEAVING TO: the bow is brought into the sea and position is maintained at low revolutions. The most common storm strategy. It minimises the effect of the seas.

2. RUNNING BEFORE THE SEA: running in the same direction as the waves. There is a risk of broaching but it is preferred in some circumstances. The speed must be kept below the wave speed.

3. DODGING: proceeding at 30-45° to the sea. It strikes a balance between rolling and pitching.

4. LYING AHULL: the engine is stopped and the ship is left to the sea. A last resort; used only in the event of machinery failure.

REASONS FOR REDUCING SPEED:

- To prevent excessive bow diving/slamming
- To prevent green water on deck
- To prevent propeller racing
- To reduce structural stress
- To avoid parametric/synchronous rolling

The decision to reduce speed depends on the master's experience and the prevailing conditions. As a general rule, speed must be reduced immediately once the ship starts to slam heavily.`,
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
    content: `POOPING:

A following sea overtaking the ship and breaking over the after deck. Risk factors:
- Running with the sea (a following sea)
- High waves and low freeboard
- A speed close to the wave speed

Consequences:
- Damage to the after deck
- Damage to the rudder and propeller
- Flooding of the engine room
- Risk to personnel

BOW DIVING:

The bow burying itself in a wave and the deck going under water. It occurs at high speed heading into the sea. Slamming can cause serious damage to the bow structure.

PREVENTIVE MEASURES:

Against pooping: avoid taking the sea from astern, reduce speed or alter course
Against bow diving: reduce speed, take the sea at an angle, reduce trim by the head`,
    bulletPoints: [
      "Pooping: kıçtan dalga güverteyi kaplar, dümen/pervane hasarı riski",
      "Slamming: pruvanın dalgaya çarpması, yapısal hasar",
      "Hız azaltma her iki durum için birincil önlemdir",
    ],
    warnings: [
      "During pooping, personnel on the after deck can be swept away by the sea",
      "Severe slamming can cause permanent damage to the ship's structure",
    ],
  },
  "damage-assessment": {
    title: "Fırtına Hasarı Değerlendirmesi",
    introduction: "Fırtına sonrası hasar değerlendirmesi, geminin seyir güvenliğinin ve yapısal bütünlüğünün teyit edilmesi için sistematik olarak yapılmalıdır.",
    content: `DAMAGE ASSESSMENT, STEP BY STEP:

1. PERSONNEL SAFETY: the condition of all personnel is checked first.

2. WATERTIGHT INTEGRITY: the hatch covers, tank soundings and bilge levels are checked. If water ingress is found, pumping is started.

3. STRUCTURAL CHECK: the deck, shell, hatch coamings and superstructure are inspected visually. Cracks, deformation and buckling are looked for.

4. CARGO CHECK: the condition of the cargo lashings is checked. Signs of a cargo shift or damage are looked for.

5. EQUIPMENT CHECK: the navigational equipment, communications equipment, steering and machinery systems are function tested.

6. REPORTING: the master prepares a note of protest (sea protest). A status report is sent to the P&I club and the operator.

THE NOTE OF PROTEST:

It is drawn up before a notary or a competent authority at the port of arrival. It records the storm conditions, the measures taken and any damage sustained. It is the legal document that protects the master and the ship against cargo damage claims.`,
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
    content: `TOWING FORCES:

Bollard pull is the towing capacity a tug develops at rest, expressed in tonnes. When towing at sea the total resistance increases with speed and sea state.

BASIC PRINCIPLES OF TOWING:

1. The towline must be of sufficient length (to form a catenary)
2. Catenary: the curve the towline takes under its own weight. It absorbs shock loads.
3. The towing speed is set by the resistance of the towed vessel and the sea conditions
4. The tow route is planned taking the weather and the current into account

PRECAUTIONS ON THE TOWED VESSEL:

- The rudder must be amidships or locked
- The navigation lights and day shapes must be displayed
- The strength of the towing connection (towing bitts/bollard) must be checked
- An axe must be kept ready to cut the towline in an emergency`,
    bulletPoints: [
      "Bollard pull: römorkörün sabit çekme kapasitesi (ton)",
      "Catenary: halat eğrisi, şok yüklerini absorbe eder",
      "Çekme hızı genellikle 4-6 knot arasında tutulur",
      "Towline yeterli uzunlukta olmalı (catenary için)",
    ],
    warnings: [
      "If the towline parts, the snap-back is a lethal hazard",
    ],
  },
  "towing-gear": {
    title: "Çekme Donanımı ve Düzenlemesi",
    introduction: "Çekme donanımı, çekme operasyonunun güvenli ve verimli yürütülmesi için tasarlanmış özel ekipman ve düzenlemedir.",
    content: `COMPONENTS OF THE TOWING GEAR:

1. Towline: it may be HMPE, nylon or wire rope. Ocean towing normally uses a combination of wire rope plus a synthetic tail. The tail provides elasticity.

2. Towing bridle: a V-shaped arrangement that spreads the towing force over two points.

3. Towing pendant: the chain or wire connecting the tug to the towed vessel.

4. Emergency towing arrangement: mandatory under SOLAS on tankers over 20,000 GT and on other ships over 500 GT.

TOWING ARRANGEMENTS:

Harbour tow: a short towline, low speed, tug control.
Ocean tow: a long towline (500-1000 m), where the catenary matters; the tow can last for days.

CHAFING PROTECTION:

The towline must be protected against chafe where it bears on the ship's structure. Fairleads, rollers and chafing gear are used.`,
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
    content: `EMERGENCY TOWING SITUATIONS:

An emergency tow may be needed when a ship loses her manoeuvrability through machinery failure, loss of steering or other causes. The urgency increases close to the coast and in busy traffic areas.

THE EMERGENCY TOWING ARRANGEMENT (ETA):

Under SOLAS an ETA must be fitted on ships above a certain tonnage. It comprises pre-rigged towing connection points forward and aft. The connection must be capable of being made quickly when a tug arrives.

PROCEDURE:

1. An emergency is declared; a MAYDAY or PAN PAN call is made
2. The anchor is let go if possible (to slow the drift)
3. Contact is made with the coastguard or the rescue coordination centre
4. The position and the rate of drift are monitored until the tug arrives
5. The tow connection is made (heaving line → messenger → towline)
6. The ship is towed to a safe port or anchorage

SALVAGE vs TOWAGE:

Salvage: the saving of a ship in danger; the salvage award is high (LOF – Lloyd's Open Form).
Towage: a commercial towing service under contract.`,
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
    content: `BASIC PRINCIPLES:

1. "No cure, no pay": the traditional principle. If the salvage fails, no award is paid. The Lloyd's Open Form (LOF) is based on this principle.

2. The 1989 International Convention on Salvage: it provides for payment (Special Compensation) for work done to prevent environmental damage as well.

3. The salvage award cannot exceed the value of the ship and cargo salved.

THE MASTER'S RESPONSIBILITIES:

- The obligation to render assistance to ships in distress (SOLAS V/33)
- The authority to sign a salvage agreement
- Requesting assistance (PAN PAN / MAYDAY)

LOF (LLOYD'S OPEN FORM):

The most widely used salvage agreement in the world. The salvage award is settled afterwards by arbitration. The London Maritime Arbitrators Association (LMAA) conducts the arbitration.

THE SCOPIC CLAUSE:

A special compensation clause added to the LOF. It guarantees payment for environmental protection work even if the salvage is unsuccessful.`,
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
    content: `IMMEDIATE ACTIONS:

1. STOP THE ENGINES: turning the propeller can increase the damage to the bottom.
2. Damage check: all tanks are sounded and water ingress is checked.
3. The position and the way the ship is aground are established (draft readings).
4. The state of the tide is checked.
5. The P&I club and the operator are informed.
6. The coastal State is notified if necessary (risk of pollution).

METHODS OF REFLOATING:

1. Refloating under her own power: changing ballast, adjusting trim, using engine power. Advantage is taken of the rising tide.
2. Tug assistance: pulling off with external force.
3. Lightening: reducing the draft by discharging cargo, fuel or ballast.
4. Dredging: excavating around the ship.

ENVIRONMENTAL RISK:

In a grounding, fuel leakage and pollution are the greatest risk. The SOPEP (Shipboard Oil Pollution Emergency Plan) is put into effect. If there is a risk of pollution the coastal State must be notified immediately.`,
    bulletPoints: [
      "İlk adım: makineyi durdur, zemin hasarını artırma",
      "Tank sounding ile su girişi kontrol edilir",
      "Gelgit yükselişi kurtulma şansını artırır",
      "SOPEP: yakıt sızıntısı acil eylem planı",
    ],
    warnings: [
      "When aground, the ground and the damage must be assessed before using engine power",
      "An uncontrolled refloating attempt can cause further damage to the ship",
    ],
  },

  // =====================================================
  // BÖLÜM 12 - GEMİCİLİK KURALLARI VE UYGULAMALAR
  // =====================================================
  "colreg-basic": {
    title: "COLREG Temel Kuralları",
    introduction: "COLREG (Collision Regulations), denizde çatışmayı önlemek amacıyla tüm gemilerin uyması gereken uluslararası kurallar bütünüdür.",
    content: `THE STRUCTURE OF THE COLREGs:

COLREG 1972 (International Regulations for Preventing Collisions at Sea) consists of five parts (A-E), 38 rules and 4 annexes (I-IV):

Part A: General (Rules 1-3): application and definitions
Part B: Steering and sailing rules (Rules 4-19): the manoeuvring rules
Part C: Lights and shapes (Rules 20-31): navigation lights
Part D: Sound and light signals (Rules 32-37)
Part E: Exemptions (Rule 38)

THE CRITICAL RULES:

Rule 5 – Look-out: a proper look-out shall be maintained at all times.
Rule 7 – Risk of collision: if the bearing does not appreciably change, risk of collision exists.
Rule 8 – Action to avoid collision: action shall be positive, made in ample time and be readily apparent.
Rule 13 – Overtaking: the overtaking vessel shall keep out of the way.
Rule 14 – Head-on situation: both vessels alter course to starboard.
Rule 15 – Crossing situation: the vessel which has the other on her starboard side shall keep out of the way.
Rule 18 – Responsibilities between vessels: the order of priority according to manoeuvrability.`,
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
    image: "/diagrams/seamanship/kardinal-samandiralar.svg",
    content: `IALA REGIONS:

Region A: Europe, Africa, most of Asia, Australia
Region B: North/South America, Japan, Korea, the Philippines

The difference between the two regions is that the colour meanings of the lateral marks are reversed.

TYPES OF BUOY:

1. Lateral marks:
   Region A: red = port hand, green = starboard hand [when entering harbour]
   Region B: exactly the reverse

2. Cardinal marks: black and yellow; the topmark consists of two black cones. The direction of the cones shows which side to pass.
   North: both cones point up (▲▲); black above, yellow below → pass to the north of the danger.
   South: both cones point down (▼▼); yellow above, black below → pass to the south.
   East: cones base to base, points apart (▲▼); black-yellow-black → pass to the east.
   West: cones point to point, a "wine glass" shape (▼▲); yellow-black-yellow → pass to the west.

3. Isolated danger mark: black with red horizontal bands. It is placed on the danger itself.

4. Safe water mark: red and white vertical stripes. It marks safe water. Used as a landfall mark. Its light is white; Iso, Oc, LFl 10s or Mo(A).

5. Special mark: yellow, with a yellow X topmark. It marks the limits of special areas such as cable routes, firing ranges, data collection buoys (ODAS) and racecourses. It does not indicate a navigational danger.

6. Emergency Wreck Marking Buoy (EWMB): added to the system in 2006. A body with blue and yellow VERTICAL stripes and an upright yellow cross (+) as a topmark. Its light alternates blue and yellow: Al Oc BuY 3s (1 s blue, 0.5 s dark, 1 s yellow, 0.5 s dark). It marks a newly discovered wreck TEMPORARILY, before it has been charted and promulgated in navigational warnings; it is removed once permanent marking is in place. The blue/yellow colour pair is used on no other IALA mark.

HOW THE LATERAL MARKS CHANGE BY REGION:

Region A (entering harbour):
   To port: RED, cylindrical (can) shape, red can topmark, red light
   To starboard: GREEN, conical shape, green cone topmark (point up), green light

Region B (entering harbour) — the colours are exactly reversed:
   To port: GREEN, cylindrical (can) shape, green can topmark, green light
   To starboard: RED, conical shape, red cone topmark, red light
   The American seaman's mnemonic: "red right returning" — red to starboard when returning.

NOTE: the SHAPE does not change between regions. The port hand mark is cylindrical (can) in both regions and the starboard hand mark is conical in both. So when the colour cannot be made out (at night, in fog or at a distance), the shape and topmark still give the right information.

PREFERRED CHANNEL MARKS:

Used where a channel divides. The body colour tells you which side to leave the mark, and the broad band on it shows the direction of the preferred (main) channel. Their lights are composite group flashing: Fl (2+1).`,
    bulletPoints: [
      "Bölge A: kırmızı = iskele, yeşil = sancak (limana girerken)",
      "Bölge B: renk anlamları ters — 'red right returning'",
      "Gövde biçimi bölgeye göre DEĞİŞMEZ: iskele silindirik, sancak konik",
      "Kardinal işaretler: tehlikenin hangi tarafından geçileceğini belirtir",
      "Güvenli su işareti: kırmızı-beyaz dikey çizgili, yaklaşma işareti",
      "EWMB: mavi-sarı dikey şeritli, sarı haç tepe işaretli, geçici batık işareti",
    ],
    keyPoints: [
      "IALA bölgesini bilmek yanal işaretleri doğru yorumlamak için zorunludur",
      "Kardinal işaretlerin tepe şekilleri yönü belirler",
      "Kardinal ışık imzaları: K = kesintisiz, D = 3'lü, G = 6'lı + uzun çakar, B = 9'lu",
      "EWMB geçicidir; kalıcı işaretleme yapılana kadar batığın yerini bildirir",
    ],
  },
  "flag-signals": {
    title: "Uluslararası Bayrak İşaretleri",
    introduction: "Uluslararası İşaret Bayrakları (International Code of Signals), gemiler arasında evrensel bir görsel haberleşme sistemidir.",
    content: `THE FLAG SYSTEM:

It consists of 26 alphabet flags, 10 numeral pennants, 3 substitute pennants and 1 answering pennant. Each flag conveys a message on its own or in combination.

SINGLE-LETTER MEANINGS (THE MOST IMPORTANT):

A (Alfa): I have a diver down; keep well clear
B (Bravo): I am taking in, discharging or carrying dangerous goods
C (Charlie): Yes (affirmative)
D (Delta): Keep clear of me; I am manoeuvring with difficulty
G (Golf): I require a pilot
H (Hotel): I have a pilot on board
L (Lima): You should stop your vessel instantly
N (November): No (negative)
O (Oscar): Man overboard
P (Papa): All persons should report on board (the Blue Peter – about to proceed to sea)
Q (Quebec): My vessel is healthy and I request free pratique
U (Uniform): You are running into danger
W (Whiskey): I require medical assistance

IMPORTANT COMBINATIONS:

NC: I am in distress and require immediate assistance
ZD: I require a pilot (Suez)
ZW: I require a tug`,
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
    content: `MANOEUVRING SIGNALS (Rule 34):

One short blast (•): I am altering my course to starboard
Two short blasts (••): I am altering my course to port
Three short blasts (•••): I am operating astern propulsion

In a narrow channel:
Two prolonged + one short (— — •): I intend to overtake you on your starboard side
Two prolonged + two short (— — ••): I intend to overtake you on your port side
Prolonged + short + prolonged + short (— • — •): agreement (the reply)

SIGNALS IN RESTRICTED VISIBILITY (Rule 35):

A power-driven vessel making way: one prolonged blast every 2 minutes (—)
A power-driven vessel under way but stopped: two prolonged blasts every 2 minutes (— —)
A vessel restricted in her ability to manoeuvre/constrained by her draught/under sail: one prolonged plus two short every 2 minutes (— ••)
A vessel being towed: immediately after the towing vessel, one prolonged plus three short (— •••)
A vessel at anchor: rapid ringing of the bell for 5 seconds every minute. On ships over 100 m, the bell forward plus a gong aft

THE DOUBT / WARNING SIGNAL (Rule 34(d)): at least five short and rapid blasts.
This is NOT a distress signal; it indicates that you do not understand the other vessel's intentions,
or that you doubt whether sufficient action is being taken to avoid collision.
Distress signals are a separate matter, dealt with in Rule 37 and Annex IV.`,
    bulletPoints: [
      "• = sancağa, •• = iskeleye, ••• = tornistan",
      "Kısıtlı görüşte her 2 dakikada uzun düdük (makine ile seyir)",
      "Demirli gemi: pruva çan + kıça gong (>100 m)",
      "5+ kısa düdük = şüphe/ikaz işareti (Kural 34(d)) — tehlike işareti değildir",
    ],
  },
  "distress-signals": {
    title: "Tehlike İşaretleri",
    introduction: "Tehlike işaretleri, geminin ciddi ve yakın tehlike altında olduğunu belirtmek için kullanılan uluslararası standart sinyallerdir.",
    content: `DISTRESS SIGNALS (COLREG Annex IV):

1. A continuous sounding with any fog-signalling apparatus
2. A gun fired at intervals of about a minute
3. Rockets or shells throwing red stars
4. The SOS signal (by any means)
5. A MAYDAY radio call (VHF Channel 16)
6. The NC flag signal
7. A signal consisting of a square flag with a ball above or below it
8. Flames on the vessel (a controlled fire on deck)
9. A rocket parachute flare showing a red light
10. An orange-coloured smoke signal
11. Slowly and repeatedly raising and lowering the arms outstretched to each side
12. A DSC (Digital Selective Calling) distress alert
13. Activation of an EPIRB
14. An approved radar transponder signal (SART)

THE MAYDAY PROCEDURE:

"MAYDAY MAYDAY MAYDAY – This is [ship's name × 3] – MAYDAY [ship's name] – My position is [position] – [nature of distress] – [assistance required] – [number of persons on board] – [any other information] – Over"

THE USE OF DISTRESS SIGNALS:

Distress signals may only be used in a genuine distress situation. Their misuse is prohibited and carries penalties.`,
    bulletPoints: [
      "MAYDAY: VHF Kanal 16, en yüksek öncelikli tehlike çağrısı",
      "Kırmızı paraşüt fişeği: geniş alanda görülebilen tehlike sinyali",
      "EPIRB: otomatik uydu üzerinden tehlike bildirimi",
      "Tehlike işaretlerinin yanlış kullanımı suçtur",
    ],
    warnings: [
      "Distress signals must only be used in a situation of grave and imminent danger",
    ],
  },
  "ism-safety-culture": {
    title: "ISM Code ve Emniyet Kültürü",
    introduction: "ISM Code (International Safety Management Code), denizde can ve mal güvenliğini sağlamak ve çevre kirliliğini önlemek için uluslararası emniyet yönetim standardıdır.",
    content: `THE STRUCTURE OF THE ISM CODE:

The ISM Code is made mandatory by SOLAS Chapter IX. It produces two fundamental documents:

DOC (Document of Compliance): certifies the compliance of the company's safety management system. It is issued to the company by the flag State.

SMC (Safety Management Certificate): certifies that the ship is operated in accordance with the SMS (Safety Management System). It is issued to the ship.

COMPONENTS OF THE SMS:

1. Safety and environmental protection policy
2. Definition of duties and authority
3. Appointment of a DPA (Designated Person Ashore)
4. The master's authority and responsibility
5. Resources and personnel
6. Plans for shipboard operations
7. Emergency preparedness
8. Reporting of non-conformities, accidents and hazardous occurrences
9. Maintenance planning (PMS)
10. Documentation
11. Company verification, review and evaluation

SAFETY CULTURE:

A safety culture is one in which personnel at every level treat safety as the overriding value. Near-miss reporting, risk assessment, toolbox meetings and safety meetings are the tools of a safety culture.

The signs of an effective safety culture:
- Personnel report non-conformities and near misses without fear of punishment
- A risk assessment is made before every operation
- Senior management allocates resources to safety and supports it`,
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

  // =====================================================
  // EK BAŞLIKLAR (2. tur domain taraması)
  // =====================================================
  "helm-orders": {
    title: "Dümen Komutları ve Standart Manevra Emirleri",
    introduction: "Köprüüstünde manevra sırasında dümenci (helmsman) ile komutu veren zabit (conning officer) arasındaki iletişim, yanlış anlaşılmayı önlemek için standart dümen komutları (helm orders) ve kapalı döngü teyit ile yürütülür. Komutlar IMO SMCP ile standartlaştırılmıştır.",
    content: `STANDARD HELM ORDERS:

- "Hard a-port / Hard a-starboard": helm hard over to port/starboard.
- "Port / Starboard twenty (ten/five)": the stated number of degrees of port/starboard helm.
- "Midships": centre the rudder (zero).
- "Steady / Steady as she goes": keep the ship on her present heading.
- "Ease to ten/five": reduce the rudder angle to the stated value.
- "Meet her": apply opposite helm to check the swing.
- "Nothing to port / Nothing to starboard": do not let her go that way.
- "Steer one-eight-zero": steer the stated heading (digit by digit).

CLOSED-LOOP CONFIRMATION:

The helmsman repeats every order aloud (read-back), executes it and reports that it has been executed (e.g. "Hard a-starboard" → executes → "Wheel hard a-starboard"; and on reaching the ordered heading, "Steady on one-eight-zero"). This loop guarantees that the order was received and executed correctly.

HOW NUMBERS ARE SPOKEN:

Headings and rudder angles are spoken digit by digit (e.g. 5 degrees "five", 180 "one-eight-zero") – to prevent misunderstanding.

ENGINE (TELEGRAPH) ORDERS:

Telegraph orders are used for speed (Dead Slow / Slow / Half / Full Ahead-Astern, Stop). At the start of a manoeuvre the discipline of orders between the helmsman and the engine room is tested (including the steering gear test).

RESPONSIBILITY:

The conning officer gives clear, single orders; only one person gives orders at any time. Even with a pilot on board the responsibility remains with the master; orders are still given and acknowledged in the standard form.`,
    bulletPoints: [
      "Komutlar IMO SMCP'ye göre standarttır (Hard a-port, Midships, Steady...).",
      "Dümenci her komutu tekrarlar ve uygulandığını bildirir (closed-loop).",
      "Pruva/açılar rakam rakam okunur (180 = one-eight-zero).",
      "Aynı anda yalnız bir kişi komut verir.",
    ],
    keyPoints: [
      "Standart komut + read-back yanlış manevrayı önler.",
      "'Steady as she goes' o anki başı korumak demektir.",
      "Pilot gemideyken de sorumluluk kaptandadır.",
    ],
    warnings: [
      "An ambiguous or duplicated order can lead to a collision or a grounding",
      "The read-back of an order must never be omitted",
    ],
  },
  "mob-maneuvers": {
    title: "Denize Adam Düştü Manevraları (Williamson/Anderson/Scharnow)",
    introduction: "Denize adam düşmesi (Man Overboard – MOB) durumunda gemiyi en kısa sürede kazazedeye geri getirmek için standart dönüş manevraları kullanılır. Doğru manevra seçimi; görüş, durumun fark edilme zamanı ve geminin manevra kabiliyetine bağlıdır.",
    content: `IMMEDIATE ACTIONS:

1. Shout "Man overboard!" and alert the bridge.
2. Put the helm over towards the side the person fell from (to swing the propeller away from them).
3. Throw a lifebuoy (with light/smoke) into the water at once – it provides a datum.
4. Press the MOB button (marking the GPS position) and post a lookout (do not lose sight of the person).
5. Sound the general alarm, put the engine on stand-by, prepare the rescue boat crew and warn ships in the vicinity.

RECOVERY MANOEUVRES:

- Williamson Turn: the helm is put over towards the casualty; once the head has swung about 60° from the original course, the helm is put hard over the other way; the ship comes back onto her original track on the reciprocal course. It is the most reliable manoeuvre in restricted visibility or when the casualty has been lost from sight; it brings the ship back exactly onto her old track. The most accurate but relatively slow.

- Anderson Turn (single turn): the helm is put hard over towards the casualty and the ship turns through about 250° to head straight for them. It is the fastest turn; ideal when the casualty is in sight and the ship is handy, but it demands precision on the final approach.

- Scharnow Turn: used when the casualty went overboard some time earlier and is well astern; it brings the ship back onto her own wake. Suitable when the incident was not noticed immediately; it is not suitable for an immediate response.

APPROACH AND RECOVERY:

The approach is made from upwind and the ship is stopped so that she provides a lee for the casualty; they are recovered by the rescue boat or with rescue equipment. IAMSAR and the ship's procedures govern.`,
    bulletPoints: [
      "İlk an: dümeni olay tarafına bas, can simidi at, MOB butonu, gözcü.",
      "Williamson: eski iz üzerine ters rota; kısıtlı görüş/gözden kayıpta en güvenilir.",
      "Anderson: tek/hızlı dönüş; kazazede görünüyorsa ve gemi çevikse ideal.",
      "Scharnow: kendi dümen suyuna döner; geç fark edilen MOB'da kullanılır.",
    ],
    keyPoints: [
      "Dümen kazazede tarafına basılır (pervaneyi uzaklaştırmak için).",
      "Manevra seçimi görüş, zaman ve manevra kabiliyetine bağlıdır.",
      "Kazazedeye rüzgârüstünden yaklaşılır; gemi siper olur.",
    ],
    warnings: [
      "The lookout must point continuously at the casualty; losing sight of them makes recovery much harder",
      "The Scharnow turn is not suitable for an immediate response",
    ],
  },
  "ship-handling-tugs": {
    title: "Yanaşma/Kalkış Manevraları ve Römorkör Kullanımı",
    introduction: "Liman manevralarında (yanaşma/berthing ve kalkış/unberthing) gemi; römorkörler, baş/kıç iticiler (thruster), halatlar ve makine/dümen kullanımıyla kontrol edilir. Rüzgâr, akıntı ve dönme noktası (pivot point) etkileri dikkatle yönetilir.",
    content: `THE PIVOT POINT:

The point about which the ship turns lies close to the bow when going ahead and close to the stern when going astern. The turning moment produced by the rudder and the tugs is assessed relative to the pivot point.

USING TUGS:

- Tugs are made fast forward and/or aft, or they push or pull.
- When berthing, the tugs bring the ship parallel to the quay and slow the approach.
- An escort tug provides steering/thrust support in confined waters.
- THE RISK OF GIRTING (girding/tripping): the risk of a towing tug being capsized when the towline leads out over her side; it can be fatal. Speed and the angle of the line are controlled, and the line is released quickly if necessary (gog rope/quick release).

THRUSTERS:

Bow/stern thrusters move the ship sideways or turn her at low speed; their effectiveness falls as headway increases. Thrusters can reduce the need for tugs.

USING LINES (SPRINGS):

Spring lines (forward/after springs) prevent the ship moving fore and aft along the quay and are used with the engine to spring the ship on and off the berth.

WIND/CURRENT AND PLANNING:

The berthing plan is made according to the wind, current, tide, water depth (UKC) and the layout of the berth. The roles and the plan are shared in a manoeuvring briefing (the master/pilot exchange).`,
    bulletPoints: [
      "Pivot point: ileride pruvaya, geride kıça yakındır; dönme momentini belirler.",
      "Römorkör itme/çekme/escort; girting (devrilme) riski ölümcüldür.",
      "Baş/kıç iticiler düşük hızda etkilidir, hız arttıkça zayıflar.",
      "Spring halatları + makine ile gemi iskeleye sıvıştırılır.",
    ],
    keyPoints: [
      "Manevra rüzgâr, akıntı, UKC ve pivot point dikkate alınarak planlanır.",
      "Girting riskine karşı halat açısı/hız kontrol edilir, hızlı bırakma hazırdır.",
      "Master/pilot exchange ile plan ve roller paylaşılır.",
    ],
    warnings: [
      "Tug girting (capsizing) can be sudden and fatal",
      "Connecting to a tug at excessive speed increases the risk of the line parting and of girting",
    ],
  },
  "pilot-transfer": {
    title: "Pilot Transferi ve Pilot Çarmıhı (Pilot Ladder)",
    introduction: "Kılavuz kaptanın (pilot) gemiye güvenli iniş-binişi, SOLAS Bölüm V Kural 23 ve IMO standartlarına uygun donatılan pilot çarmıhı (pilot ladder) ile sağlanır. Hatalı donatım, ölümcül düşme kazalarının başlıca nedenidir.",
    content: `THE LEGAL BASIS:

SOLAS V/23 and the related IMO resolutions govern the construction, rigging and maintenance of pilot transfer arrangements. The equipment must be approved and marked.

RIGGING THE PILOT LADDER:

- The ladder must be properly secured to the ship and hang evenly from the water surface to the point of access.
- The steps must be horizontal, equally spaced and non-slip; wide spreader steps at defined intervals prevent twisting.
- The side ropes must be sound and of the correct diameter.
- Man-ropes, adequate lighting (at night), a lifebuoy (with light), a heaving line and a responsible officer/lookout close by must be provided.

COMBINATION LADDER:

Where the freeboard exceeds 9 metres, the pilot ladder is used together with an accommodation ladder in a combination arrangement; the transfer point must be safe and level.

THE RESPONSIBLE OFFICER AND SAFETY:

A responsible officer supervises the transfer, in radio contact with the bridge. The ship manoeuvres to provide a good lee for the pilot. The equipment is checked before every use; a defective ladder must not be used.`,
    bulletPoints: [
      "SOLAS V/23 ve IMO standartlarına uygun, onaylı donanım kullanılır.",
      "Spreader steps, sağlam yan halatlar, man-rope, aydınlatma, can simidi şart.",
      "Freeboard > 9 m ise kombine çarmıh (accommodation + pilot ladder).",
      "Sorumlu zabit gözetir; gemi pilota rüzgâraltı oluşturur.",
    ],
    keyPoints: [
      "Hatalı pilot çarmıhı donatımı ölümcül düşme kazalarının başlıca nedenidir.",
      "Donanım her kullanım öncesi kontrol edilir; arızalıysa kullanılmaz.",
      "Transfer sırasında köprüyle iletişim ve gözetim zorunludur.",
    ],
    warnings: [
      "A slack or worn ladder, or an incorrect spreader, can cause the pilot to fall",
      "A lifebuoy and a heaving line must be kept ready at the transfer point",
    ],
  },
  "means-of-access": {
    title: "Gemiye İniş-Biniş Donanımı (Gangway/Accommodation Ladder)",
    introduction: "Personel ve ziyaretçilerin gemiye güvenli iniş-binişi; borda iskelesi (accommodation ladder) veya gangway ile sağlanır. SOLAS II-1/3-9, güvenli erişim araçlarını (means of access) düzenler.",
    content: `TYPES OF EQUIPMENT:

- Accommodation ladder: an inclined ladder with handrails, leading from the ship's side down to the quay or the water level.
- Gangway: the horizontal or slightly inclined brow rigged between the ship and the quay.

SAFETY REQUIREMENTS (SOLAS II-1/3-9):

- The equipment must be approved, marked with its SWL and certified.
- There must be sound handrails/stanchions on both sides.
- A safety net must be rigged beneath it (to catch a fall).
- Adequate lighting must be provided.
- The angle of inclination must be kept within safe limits and adjusted with the tide.

GANGWAY WATCH AND SAFETY:

- The gangway watch controls access (including ISPS security).
- A lifebuoy with a light and a line is kept ready at the access point.
- It must not be overloaded (SWL/number of persons).
- The ends are secured against falling; the position/angle is checked frequently as the tide and draft change.

MAINTENANCE:

The ropes/wires, hinges, steps and handrails are checked regularly; worn equipment must not be used and records are kept.`,
    bulletPoints: [
      "Accommodation ladder (eğimli merdiven) ve gangway (yatay geçiş) kullanılır.",
      "SOLAS II-1/3-9: korkuluk, güvenlik ağı, aydınlatma, işaretli SWL.",
      "Geçişte ışıklı can simidi + halat hazır bulundurulur.",
      "Gelgit/draft değişiminde konum ve eğim sık kontrol edilir.",
    ],
    keyPoints: [
      "Güvenli erişim (means of access) SOLAS gereğidir ve sertifikalıdır.",
      "Altındaki güvenlik ağı düşmeye karşı koruma sağlar.",
      "Gangway nöbeti giriş-çıkış ve güvenlik kontrolünü sağlar.",
    ],
    warnings: [
      "Use without a safety net or handrails creates a risk of falling and drowning",
      "A gangway not adjusted with the tide can reach a dangerous angle",
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
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="relative z-40 bg-background/95 border-b border-border">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
                <Anchor className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Gemicilik</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Accordion */}
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-4 max-w-4xl mx-auto pb-20">
            <Accordion type="single" collapsible className="space-y-2">
              {seamanshipTopics.map((topic) => {
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
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { title: "Denizci Düğümleri", href: "/seamanship/knots" },
                  { title: "İşaret Bayrakları", href: "/communication/flags" },
                  { title: "Mors Alfabesi", href: "/communication/morse" },
                  { title: "IALA Şamandıraları", href: "/navigation/buoyage" },
                  { title: "Ses İşaretleri", href: "/navigation/sound-signals" },
                  { title: "Hesaplamalar", href: "/seamanship/calculations" },
                  { title: "Tüm Dersler", href: "/lessons" },
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

                {/* Real Photographs Gallery */}
                {currentContent.photos && currentContent.photos.length > 0 && (
                  <PhotoGallery photos={currentContent.photos} topicTitle={currentContent.title} />
                )}

                {/* Knot-tying — bütün bağlar tek bir yerde, Gemici Bağları sayfasında toplanmıştır */}
                {currentContent.knotAnimations && currentContent.knotAnimations.length > 0 && (
                  <div className="space-y-2 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                    <div className="flex items-center gap-2">
                      <Anchor className="h-5 w-5 text-amber-500" />
                      <h3 className="font-semibold text-foreground">Adım Adım Bağ Yapımı</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      All the seaman's knots, bends and splices are gathered in one place. For real knot-tying videos, step-by-step instructions, uses and tips, open the Sailor's Knots page.
                    </p>
                    <Link
                      to="/seamanship/knots"
                      className="group inline-flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-500/20 dark:text-amber-400"
                    >
                      <Eye className="h-4 w-4" />
                      Gemici Bağları'nı aç
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                )}

                {/* Main Content */}
                <StructuredLessonText text={currentContent.content} />

                {/* Data Table */}
                {currentContent.table && (
                  <div className="rounded-xl border border-border/40 overflow-hidden">
                    <div className="bg-muted/60 px-4 py-3 border-b border-border/40">
                      <h3 className="font-semibold text-foreground text-sm">{currentContent.table.title}</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border/40 bg-muted/30">
                            {currentContent.table.headers.map((header, i) => (
                              <th key={i} className="px-3 py-2.5 text-left font-medium text-foreground whitespace-nowrap">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {currentContent.table.rows.map((row, rowIdx) => (
                            <tr key={rowIdx} className="border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors">
                              {row.map((cell, cellIdx) => (
                                <td key={cellIdx} className={`px-3 py-2 text-foreground/80 ${cellIdx === 0 ? 'font-medium text-foreground' : ''}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

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
