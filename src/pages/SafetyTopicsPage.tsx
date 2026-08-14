import type { CSSProperties } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  FileText,
  AlertTriangle,
  Shield,
  Lightbulb,
  CheckCircle2,
  X,
  LifeBuoy,
  Flame,
  Heart,
  Radio,
  Anchor,
  Users,
  BookMarked,
  Eye,
  Siren,
  HardHat,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useArticleBackGuard } from "@/hooks/useArticleBackGuard";
import { StructuredLessonText } from "@/components/lessons/StructuredLessonText";

interface SafetySubTopic {
  id: string;
  title: string;
  hasContent: boolean;
}

interface SafetyMainTopic {
  id: string;
  number: number;
  title: string;
  icon: React.ElementType;
  subtopics: SafetySubTopic[];
}

const safetyTopics: SafetyMainTopic[] = [
  {
    id: "solas-general",
    number: 1,
    title: "SOLAS Sözleşmesi Genel",
    icon: Shield,
    subtopics: [
      { id: "solas-history", title: "SOLAS tarihçesi ve gelişimi", hasContent: true },
      { id: "solas-structure", title: "SOLAS yapısı ve bölümleri", hasContent: true },
      { id: "solas-certificates", title: "SOLAS sertifikaları", hasContent: true },
      { id: "solas-surveys", title: "Sörvey ve denetimler", hasContent: true },
      { id: "solas-amendments", title: "Güncel değişiklikler ve uygulamalar", hasContent: true },
    ],
  },
  {
    id: "fire-safety",
    number: 2,
    title: "Fire Safety",
    icon: Flame,
    subtopics: [
      { id: "fire-theory", title: "Yangın teorisi ve yanma kimyası", hasContent: true },
      { id: "fire-classes", title: "Yangın sınıfları ve söndürme yöntemleri", hasContent: true },
      { id: "fire-detection", title: "Yangın algılama ve alarm sistemleri", hasContent: true },
      { id: "portable-extinguishers", title: "Taşınabilir söndürücüler", hasContent: true },
      { id: "fixed-fire-systems", title: "Sabit söndürme sistemleri", hasContent: true },
      { id: "fire-fighting-proc", title: "Yangınla mücadele prosedürleri", hasContent: true },
      { id: "engine-room-fire", title: "Makine dairesi yangınları", hasContent: true },
      { id: "fire-drills", title: "Yangın tatbikatları ve SOLAS gereksinimleri", hasContent: true },
      { id: "eebd", title: "EEBD – Acil Kaçış Solunum Cihazı", hasContent: true },
      { id: "scba", title: "SCBA – Bağımsız Solunum Cihazı", hasContent: true },
      { id: "firemans-outfit", title: "İtfaiyeci teçhizatı (Fireman's Outfit)", hasContent: true },
      { id: "fire-fighting-equipment", title: "Yangın devresi, hidrant, hortum ve nozullar", hasContent: true },
      { id: "structural-fire-protection", title: "Yapısal yangın koruması (A/B/C sınıfı bölmeler)", hasContent: true },
      { id: "fire-control-plan", title: "Yangın kontrol planı (Fire Control Plan)", hasContent: true },
    ],
  },
  {
    id: "life-saving",
    number: 3,
    title: "Can Kurtarma Araçları (LSA)",
    icon: LifeBuoy,
    subtopics: [
      { id: "lsa-overview", title: "LSA Code genel yapısı", hasContent: true },
      { id: "lifeboats", title: "Cankurtaran sandal tipleri ve donanımı", hasContent: true },
      { id: "liferafts", title: "Cankurtaran salları ve SOLAS gereksinimleri", hasContent: true },
      { id: "rescue-boats", title: "Kurtarma botları", hasContent: true },
      { id: "personal-lsa", title: "Kişisel can kurtarma teçhizatı", hasContent: true },
      { id: "pyrotechnics", title: "Piroteknik işaret araçları", hasContent: true },
      { id: "lsa-maintenance", title: "LSA bakım ve muayene", hasContent: true },
      { id: "immersion-suit-tpa", title: "Dalma elbisesi ve termal koruyucu (TPA)", hasContent: true },
      { id: "mes", title: "Deniz tahliye sistemi (MES)", hasContent: true },
      { id: "line-throwing", title: "Halat atma aparatı (Line-Throwing Appliance)", hasContent: true },
    ],
  },
  {
    id: "abandon-ship",
    number: 4,
    title: "Gemiyi Terk Etme",
    icon: Anchor,
    subtopics: [
      { id: "abandon-decision", title: "Terk kararı ve yetki zinciri", hasContent: true },
      { id: "muster-stations", title: "Toplanma istasyonları ve görev dağılımı", hasContent: true },
      { id: "abandon-procedure", title: "Gemiyi terk prosedürü", hasContent: true },
      { id: "launching-boats", title: "Sandal ve sal indirme teknikleri", hasContent: true },
      { id: "survival-at-sea", title: "Denizde hayatta kalma", hasContent: true },
      { id: "hypothermia", title: "Hipotermi ve soğuk su şoku", hasContent: true },
    ],
  },
  {
    id: "first-aid",
    number: 5,
    title: "İlk Yardım ve Tıbbi Bakım",
    icon: Heart,
    subtopics: [
      { id: "first-aid-basics", title: "Temel ilk yardım prensipleri", hasContent: true },
      { id: "cpr-procedure", title: "CPR ve temel yaşam desteği", hasContent: true },
      { id: "bleeding-fractures", title: "Kanama kontrolü ve kırık müdahalesi", hasContent: true },
      { id: "burns-treatment", title: "Yanık tedavisi", hasContent: true },
      { id: "medical-chest", title: "Gemi sağlık sandığı (Medical Chest)", hasContent: true },
      { id: "telemedical", title: "Tele-tıbbi danışmanlık (TMAS)", hasContent: true },
    ],
  },
  {
    id: "sar-operations",
    number: 6,
    title: "Arama ve Kurtarma (SAR)",
    icon: Eye,
    subtopics: [
      { id: "sar-system", title: "SAR sistemi ve IAMSAR Manual", hasContent: true },
      { id: "sar-patterns", title: "Arama desenleri (search patterns)", hasContent: true },
      { id: "on-scene-coordinator", title: "Olay yeri koordinatörü (OSC)", hasContent: true },
      { id: "person-overboard", title: "Denize düşme ve MOB prosedürü", hasContent: true },
      { id: "helicopter-ops", title: "Helikopter operasyonları", hasContent: true },
    ],
  },
  {
    id: "gmdss",
    number: 7,
    title: "GMDSS",
    icon: Radio,
    subtopics: [
      { id: "gmdss-overview", title: "GMDSS genel yapısı ve deniz alanları", hasContent: true },
      { id: "epirb-sart", title: "EPIRB, SART ve AIS-SART", hasContent: true },
      { id: "dsc-vhf", title: "DSC ve VHF haberleşmesi", hasContent: true },
      { id: "inmarsat", title: "INMARSAT ve uydu sistemleri", hasContent: true },
      { id: "navtex", title: "NAVTEX ve güvenlik bilgileri", hasContent: true },
      { id: "distress-comm", title: "Tehlike, aciliyet ve emniyet haberleşmesi", hasContent: true },
    ],
  },
  {
    id: "ism-isps",
    number: 8,
    title: "ISM Code ve ISPS Code",
    icon: BookMarked,
    subtopics: [
      { id: "ism-code", title: "ISM Code yapısı ve gereklilikleri", hasContent: true },
      { id: "sms-system", title: "SMS (Safety Management System)", hasContent: true },
      { id: "isps-code", title: "ISPS Code ve güvenlik seviyeleri", hasContent: true },
      { id: "sso-cso", title: "SSO, CSO ve PFSO görevleri", hasContent: true },
      { id: "security-assessment", title: "Gemi güvenlik değerlendirmesi (SSA)", hasContent: true },
    ],
  },
  {
    id: "survival-techniques",
    number: 9,
    title: "Denizde Hayatta Kalma Teknikleri",
    icon: Users,
    subtopics: [
      { id: "water-entry", title: "Suya giriş teknikleri", hasContent: true },
      { id: "flotation-aids", title: "Yüzme ve batmama teknikleri", hasContent: true },
      { id: "raft-survival", title: "Salda hayatta kalma", hasContent: true },
      { id: "signaling-rescue", title: "İşaret verme ve kurtarılma", hasContent: true },
      { id: "food-water-survival", title: "Yiyecek ve su yönetimi", hasContent: true },
    ],
  },
  {
    id: "enclosed-spaces",
    number: 10,
    title: "Kapalı Alan Güvenliği",
    icon: AlertTriangle,
    subtopics: [
      { id: "enclosed-space-risks", title: "Kapalı alan riskleri ve tehlikeli atmosfer", hasContent: true },
      { id: "entry-permit", title: "Giriş izin sistemi (Entry Permit)", hasContent: true },
      { id: "atmosphere-testing", title: "Atmosfer testi ve ölçüm cihazları", hasContent: true },
      { id: "rescue-from-enclosed", title: "Kapalı alandan kurtarma prosedürü", hasContent: true },
    ],
  },
  {
    id: "occupational-safety",
    number: 11,
    title: "İş Sağlığı ve Güvenliği",
    icon: HardHat,
    subtopics: [
      { id: "ppe", title: "Kişisel koruyucu donanım (KKD/PPE)", hasContent: true },
      { id: "permit-to-work", title: "Çalışma izni sistemi ve sıcak iş izni", hasContent: true },
      { id: "risk-assessment", title: "Risk değerlendirmesi ve JSA", hasContent: true },
      { id: "damage-control", title: "Hasar kontrolü ve su geçirmez bütünlük", hasContent: true },
      { id: "mooring-safety-snapback", title: "Bağlama güvenliği ve snap-back bölgeleri", hasContent: true },
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
  // BÖLÜM 1 - SOLAS GENEL
  // =====================================================
  "solas-history": {
    title: "SOLAS Tarihçesi ve Gelişimi",
    introduction: "SOLAS (Safety of Life at Sea), denizde can güvenliğinin sağlanmasına yönelik en kapsamlı uluslararası sözleşmedir.",
    content: `THE BIRTH OF THE SOLAS CONVENTION:

The sinking of RMS Titanic on 15 April 1912 brought about fundamental change in the maritime world. 1,514 of the 2,224 passengers and crew lost their lives, and this disaster made the need for international regulation of safety of life at sea plainly clear.

The first SOLAS convention was adopted in 1914. It could not enter into force, however, because of the First World War.

VERSIONS OF THE SOLAS CONVENTION:

SOLAS 1914: the first attempt after the Titanic disaster. It required a sufficient number of lifeboats, a radio watch and an ice patrol service.

SOLAS 1929: the first comprehensive provisions on fire safety.

SOLAS 1948: updated in the light of the experience of the Second World War. It formed part of the process leading to the establishment of the IMO (then called IMCO).

SOLAS 1960: the IMO's first major achievement. The technical standards were set out in detail.

SOLAS 1974: the version still in force. The "tacit acceptance" procedure allowed amendments to enter into force far more quickly.

The 1988 Protocol: introduced the harmonized system of survey and certification.

THE TACIT ACCEPTANCE PROCEDURE:

The most important innovation of SOLAS 1974 is the tacit acceptance procedure. Under this system an adopted amendment enters into force automatically on a given date unless a sufficient number of States object. This mechanism removed the delays of decades that amendments suffered under the earlier versions.`,
    keyPoints: [
      "İlk SOLAS sözleşmesi 1914'te Titanic faciası sonrası kabul edilmiştir",
      "Yürürlükteki versiyon 1974 SOLAS'tır",
      "Zımni kabul prosedürü değişikliklerin hızlı uygulanmasını sağlar",
      "SOLAS düzenli olarak güncellenmeye devam etmektedir",
    ],
  },
  "solas-structure": {
    title: "SOLAS Yapısı ve Bölümleri",
    introduction: "SOLAS sözleşmesi, deniz taşımacılığının tüm güvenlik yönlerini kapsayan kapsamlı bir yapıya sahiptir.",
    content: `THE STRUCTURE OF SOLAS CHAPTERS:

Chapter I – General Provisions: the scope of the convention and the survey and certification rules.

Chapter II-1 – Construction: requirements for ship structure, subdivision, stability, machinery and electrical installations. The damage stability calculations are found here. The probabilistic damage stability approach became mandatory with the SOLAS 2009 amendments.

Chapter II-2 – Fire Safety: fire prevention, detection and extinction. The FSS Code (Fire Safety Systems Code) is an integral part of this chapter. Structural fire protection, escape routes and control of ventilation systems in a fire.

Chapter III – Life-Saving Appliances: applied together with the LSA Code (Life-Saving Appliances Code). Requirements for lifeboats and liferafts, pyrotechnic signals and personal protective equipment.

Chapter IV – Radiocommunications: the GMDSS requirements. Sea areas (A1-A4) and the mandatory equipment.

Chapter V – Safety of Navigation: navigational equipment, routeing services, ship reporting systems, VDR, AIS and ECDIS requirements.

Chapter VI – Carriage of Cargoes: cargo safety, solid bulk cargoes (the IMSBC Code) and the verified gross mass of containers (VGM).

Chapter VII – Carriage of Dangerous Goods: the IMDG Code, the INF Code.

Chapter VIII – Nuclear Ships.

Chapter IX – Management for the Safe Operation of Ships: the ISM Code requirement.

Chapter X – Safety Measures for High-Speed Craft: the HSC Code.

Chapter XI-1 – Special Measures to Enhance Maritime Safety: the enhanced survey programme, the ship identification number (IMO Number).

Chapter XI-2 – Special Measures to Enhance Maritime Security: the ISPS Code requirement.

Chapter XII – Additional Safety Measures for Bulk Carriers.

Chapter XIII – Verification of Compliance: the IMO Member State Audit Scheme (IMSAS).

Chapter XIV – Safety Measures for Ships Operating in Polar Waters: the Polar Code requirement.`,
    keyPoints: [
      "SOLAS 14 bölümden oluşur ve tüm güvenlik konularını kapsar",
      "Bölüm II-1 yapı, II-2 yangın, III can kurtarma, IV radyo, V seyir emniyetini düzenler",
      "ISM Code (Bölüm IX) ve ISPS Code (Bölüm XI-2) zorunludur",
      "Her bölüm kendi alt kodlarıyla (FSS, LSA, HSC) desteklenir",
    ],
  },
  "solas-certificates": {
    title: "SOLAS Sertifikaları",
    introduction: "SOLAS kapsamında gemilere çeşitli sertifikalar verilir ve bu sertifikalar düzenli sörveylerle geçerlilikleri doğrulanır.",
    content: `THE PRINCIPAL SOLAS CERTIFICATES:

1. Passenger Ship Safety Certificate: certifies that a passenger ship complies with the SOLAS requirements. It is valid for 12 months.

2. Cargo Ship Safety Construction Certificate: certifies that a cargo ship complies with the structural standards. Valid for 5 years, subject to annual survey.

3. Cargo Ship Safety Equipment Certificate: certifies the compliance of the life-saving, fire fighting and navigational equipment. Valid for 5 years.

4. Cargo Ship Safety Radio Certificate: certifies the compliance of the GMDSS equipment. Valid for 5 years.

5. ISSC (International Ship Security Certificate): certifies compliance with the ISPS Code. Valid for 5 years.

6. SMC (Safety Management Certificate): certifies the ship's compliance with the SMS under the ISM Code. Valid for 5 years.

7. DOC (Document of Compliance): certifies the company's compliance under the ISM Code.

TYPES OF SURVEY:

Initial Survey: the first survey, carried out before the ship enters service.
Annual Survey: the yearly inspection; mandatory for the certificate to remain valid.
Intermediate Survey: the survey carried out within the 5-year period (in the 2nd or 3rd year).
Renewal Survey: the comprehensive survey carried out to renew the certificate.
Additional Survey: the extra survey carried out after a repair, alteration or damage.`,
    keyPoints: [
      "Yolcu gemisi sertifikası 12 ay, yük gemisi sertifikaları 5 yıl geçerlidir",
      "Yıllık sörvey sertifika geçerliliğinin korunması için zorunludur",
      "SMC gemiye, DOC şirkete verilir",
      "ISSC, ISPS Code uyumunu belgeler",
    ],
  },
  "solas-surveys": {
    title: "Sörvey ve Denetimler",
    introduction: "Gemi güvenlik sertifikalarının geçerliliği, düzenli aralıklarla yapılan sörveylerle sürdürülür.",
    content: `THE SURVEY SYSTEM:

The harmonized system of survey and certification (HSSC) aligns all the mandatory survey dates. Under this system the surveys for the ship's various certificates are combined as far as possible, keeping operational interruption to a minimum.

FLAG STATE INSPECTION:

The flag State is responsible for ensuring that its ships comply with the international standards. It carries out these inspections directly or through authorised classification societies (ROs – Recognized Organizations).

PORT STATE CONTROL (PSC):

Port State Control covers the inspection of foreign-flagged ships in port. It is applied within the framework of regional agreements such as the Paris MoU and the Tokyo MoU.

The main matters checked in a PSC inspection:
- The validity and currency of the certificates
- Crew competence and watchkeeping arrangements
- That the life-saving and fire fighting equipment is in working order
- The condition of the navigational equipment
- Compliance with the ISM and ISPS Codes
- Environmental requirements (MARPOL)

DETENTION:

If a "clearly hazardous" deficiency is found on board the ship is detained. Detention causes serious financial and reputational loss to the ship operator. Detention rates directly affect the targeting profile of the company and the flag State.

CERTIFICATE EXTENSION:

Where unavoidable, a certificate may be extended by a maximum of 3 months. Extension is applied in exceptional circumstances and is not regarded as normal practice.`,
    keyPoints: [
      "Harmonize sörvey sistemi operasyonel kesintileri azaltır",
      "PSC denetiminde tutma (detention) ciddi sonuçlar doğurur",
      "Bayrak devleti, sınıflandırma kuruluşlarını yetkilendirebilir (RO)",
      "Sertifika süresi en fazla 3 ay uzatılabilir",
    ],
  },
  "solas-amendments": {
    title: "Güncel Değişiklikler ve Uygulamalar",
    introduction: "SOLAS sözleşmesi, denizcilik teknolojisindeki gelişmelere ve kazalardan çıkarılan derslere bağlı olarak sürekli güncellenmektedir.",
    content: `RECENT MAJOR AMENDMENTS:

VGM (Verified Gross Mass) – 2016: the amendment to SOLAS Chapter VI, Regulation 2 made the declaration of a verified gross mass for containers mandatory. The MSC Flaminia and other container ship casualties triggered this regulation.

ECDIS requirement: under SOLAS Chapter V, Regulation 19.2 the use of ECDIS became mandatory on new ships in stages. Paper charts may continue to be carried as a back-up.

The Polar Code – 2017: SOLAS Chapter XIV set structural, operational and environmental requirements for ships operating in polar waters.

The IGF Code – 2017: safety requirements for ships using natural gas or other low-flashpoint fuels.

SOLAS III/17.1 (lifeboat maintenance): the requirements for the periodic maintenance and servicing of lifeboats were updated. Servicing by a maker-approved station became mandatory.

Cyber security – MSC.428(98): the integration of cyber risk management into the SMS became mandatory under the ISM Code (from 1 January 2021).

SOLAS II-1/3-12 (Goal-Based Standards – GBS): the requirement that the structural design of new tankers and bulk carriers complies with goal-based standards.`,
    keyPoints: [
      "VGM (2016): Konteyner brüt ağırlıklarının doğrulanması zorunludur",
      "Polar Code (2017): Kutup bölgelerinde seyreden gemiler için ek gereksinimler",
      "Siber güvenlik riskleri ISM/SMS'e entegre edilmelidir",
      "SOLAS sürekli olarak güncellenen yaşayan bir sözleşmedir",
    ],
  },

  // =====================================================
  // BÖLÜM 2 - YANGIN GÜVENLİĞİ
  // =====================================================
  "fire-theory": {
    title: "Yangın Teorisi ve Yanma Kimyası",
    introduction: "Yangın, yanıcı madde, oksijen ve tutuşma enerjisinin bir arada bulunmasıyla başlayan kontrolsüz bir yanma reaksiyonudur.",
    content: `COMBUSTION THEORY:

Combustion is the exothermic (heat-releasing) reaction of a substance with oxygen. Three elements must be present at the same time for this reaction to start:

1. Fuel: it may be solid, liquid or gas. Liquid fuels do not burn directly; the vapours evaporating from their surface burn.

2. Oxygen: present in the atmosphere at 21% by volume. A minimum oxygen concentration of 16% is needed for combustion. Below 16% most combustible substances will not burn.

3. Ignition energy (heat): the energy source that raises the fuel to its ignition temperature. Sources such as a spark, a hot surface, an electrical arc or friction.

THE FOUR-ELEMENT MODEL:

Modern fire theory adds a fourth element, the "chain chemical reaction", to the triangle. This four-element model is called the fire tetrahedron. Extinguishing agents such as halon put a fire out by breaking the chemical reaction.

IGNITION TEMPERATURE AND FLASH POINT:

Flash Point: the lowest temperature at which a liquid fuel gives off enough vapour from its surface to flash momentarily on contact with an external source of ignition. It is >60°C for HFO and -43°C for petrol.

Fire Point: the temperature at which sustained burning begins. It is a few degrees above the flash point.

Auto-Ignition Temperature: the temperature at which a substance ignites spontaneously without an external source of ignition. It is about 210°C for diesel oil.

PRODUCTS OF COMBUSTION:

Complete combustion: CO₂ + H₂O + heat. Sufficient oxygen is present.
Incomplete combustion: CO (carbon monoxide) + soot + toxic gases. It occurs where oxygen is insufficient. More than 75% of fire deaths at sea are caused by smoke inhalation.`,
    keyPoints: [
      "Yangın üçgeni: yakıt + oksijen + ısı; dörtgen: + zincirleme reaksiyon",
      "Minimum %16 O₂ konsantrasyonu gerekli, inerting %5'in altına düşürür",
      "Flash point: kısa alevlenme; fire point: sürekli yanma sıcaklığı",
      "Yangın ölümlerinin %75'inden fazlası duman zehirlenmesinden kaynaklanır",
    ],
  },
  "fire-classes": {
    title: "Yangın Sınıfları ve Söndürme Yöntemleri",
    introduction: "Yangınlar, yanan maddeye göre sınıflandırılır ve her sınıf için uygun söndürme yöntemi farklıdır.",
    content: `CLASSES OF FIRE:

Class A – Solid materials: fires in organic solids such as wood, cloth, paper and plastic. Extinguished by cooling. Water is the most effective agent. Embers can remain and there is a risk of re-ignition.

Class B – Flammable liquids: fires in flammable liquids such as fuel, oil, paint and solvents. Extinguished by smothering. Foam, CO₂ and dry chemical powder are used. Not extinguished with water; water can spread the fire by splashing.

Class C – Flammable gases: fires in gases such as LPG, LNG and acetylene. The fire is not extinguished until the gas flow has been shut off, otherwise there is a risk of explosion. Dry chemical powder, CO₂.

Class D – Combustible metals: aluminium, magnesium, titanium, sodium. Special dry powder extinguishers are needed. Water must never be used; it can react violently.

Class E/F – Electrical / cooking oils: in an electrical fire the power is isolated first, then CO₂ or dry powder is used. Wet chemical extinguishers are used for cooking oil fires.

FIRE RISK AREAS ON BOARD:

Engine room: the highest fire risk. Fuel leaking onto a hot surface is the main cause. A fixed CO₂ or FM-200 system is fitted.
Galley: the risk of a cooking oil fire. A fixed extinguishing system is mandatory.
Cargo holds: bulk cargo fires and container fires. CO₂ inerting or water spray.
Paint store: flammable paints and solvents. The ventilation and storage rules are critical.
Accommodation: smoking, electrical faults. Smoke detectors and a sprinkler system.`,
    keyPoints: [
      "Sınıf B yangınlarda su kesinlikle kullanılmaz – sıçratır ve yayar",
      "Sınıf C yangınlarda gaz akışı kesilmeden söndürme yapılmaz",
      "Makine dairesi gemide en yüksek yangın riskine sahip bölgedir",
      "Elektrik yangınında önce enerji kesilir, sonra müdahale edilir",
    ],
  },
  "fire-detection": {
    title: "Yangın Algılama ve Alarm Sistemleri",
    introduction: "Yangının erken tespit edilmesi, etkili müdahalenin ve can kaybının önlenmesinin temel koşuludur.",
    content: `DETECTION PRINCIPLES:

Smoke detectors:
- Ionisation type: uses a radioactive source (Americium-241). Smoke particles disturb the ionisation current and raise the alarm. Effective in fast-burning fires that produce little smoke.
- Photoelectric (optical) type: based on the principle of light scattering. When smoke particles scatter the light the photosensor raises the alarm. More sensitive to fires producing dense smoke.
- Laser type: the most sensitive. It can detect smoke at a very early stage.

Heat detectors:
- Fixed temperature type: raises the alarm when a set temperature (usually 57°C or 72°C) is reached.
- Rate-of-rise type: raises the alarm when the rate of temperature increase exceeds a set threshold. Normally 8-10°C/minute.
- Combined type: combines both principles.

Flame detectors:
- UV (ultraviolet) sensor: detects the UV radiation emitted by a flame.
- IR (infrared) sensor: detects the IR radiation emitted by a flame.
- Combined UV/IR: reduces the false alarm rate.

THE FIRE ALARM SYSTEM:

The fire alarm panel is on the bridge. It provides a zonal alarm display. The alarm status of each zone is monitored separately. Under SOLAS II-2 the fire detection and alarm system must be continuously monitored. The back-up power supply must have a capacity of at least 36 hours.

SAMPLE SMOKE DETECTION SYSTEM:

An aspirating type system used in cargo holds. Air samples are drawn from each compartment through a pipeline and analysed at a central detector. Common on container ships and Ro-Ro vehicle decks.`,
    keyPoints: [
      "İyonizasyon dedektörü hızlı yanan, optik dedektör yoğun dumanlı yangınlarda etkilidir",
      "Yangın alarm paneli köprüüstünde bulunur ve bölgesel gösterim sağlar",
      "Yedek güç kaynağı en az 36 saat kapasiteli olmalıdır",
      "Yük ambarlarında duman örneklemeli (aspirasyon) sistem kullanılır",
    ],
  },
  "portable-extinguishers": {
    title: "Taşınabilir Söndürücüler",
    introduction: "Taşınabilir yangın söndürücüler, yangının başlangıç aşamasında müdahale için kullanılan ilk savunma hattıdır.",
    content: `TYPES OF EXTINGUISHER:

Water extinguisher (9 litres): used on Class A fires. Works by cooling. Not used on electrical or liquid fires.

Foam extinguisher (9 litres): used on Class A and B fires. Works by blanketing the surface and cooling. AFFF (Aqueous Film Forming Foam) is the typical foam type.

Dry chemical powder extinguisher (9 kg): can be used on all classes of fire (ABC type). Works by breaking the chemical reaction. It does not prevent re-ignition; its cooling effect is low.

CO₂ extinguisher (5 kg): used on Class B and electrical fires. Works by smothering. It leaves no residue and is preferred in areas with electronic and mechanical equipment. There is a risk of asphyxiation if it is used in an enclosed space.

TECHNIQUE OF USE (THE PASS METHOD):

P – Pull: pull the pin.
A – Aim: aim the nozzle at the base of the fire.
S – Squeeze: squeeze the lever.
S – Sweep: extinguish by sweeping across the base of the fire.

SITING RULES:

Under SOLAS II-2 portable extinguishers must be sited at defined intervals in accessible positions. There must be at least one foam extinguisher in the engine room. A cooking oil extinguisher is mandatory in the galley. Extinguishers are subject to annual maintenance and periodic pressure testing.`,
    keyPoints: [
      "CO₂ söndürücü artık bırakmaz, elektronik alanlarda tercih edilir",
      "PASS tekniği: Çek – Yönelt – Sık – Süpür",
      "Kuru kimyevi toz tüm sınıflarda kullanılabilir ama soğutma etkisi düşüktür",
      "Söndürücüler yıllık bakım ve periyodik basınç testine tabidir",
    ],
  },
  "fixed-fire-systems": {
    title: "Sabit Söndürme Sistemleri",
    introduction: "Sabit yangın söndürme sistemleri, özellikle makine dairesi ve yük ambarları gibi büyük bölmelerdeki yangınlarla mücadelede kullanılır.",
    content: `THE FIXED CO₂ SYSTEM:

Used in the engine room and cargo holds. It extinguishes the fire by reducing the oxygen concentration. All personnel must be evacuated from the space before release – CO₂ is fatal.

CO₂ system components: high-pressure CO₂ cylinders (usually in the CO₂ room), a pilot cylinder, the main valve, the alarm system, distribution pipes and nozzles. A 20-second audible and visual pre-alarm is given before release into the engine room.

Calculating the quantity of CO₂ (FSS Code Chapter 5): for the engine room, 40% of the gross volume of the largest machinery space (excluding the casing) or 35% of the total volume (including the casing) — whichever is the greater; for cargo holds, CO₂ equal to 30% of the gross volume of the largest hold is required. In a machinery space 85% of the required gas must be capable of being released within the first 2 minutes.

THE FOAM SYSTEM:

Used on tanker decks and in the engine room. It works by blanketing the surface and cooling.

Low expansion foam (expansion ratio <20): used for tanker deck fire fighting.
Medium expansion foam (20-200): engine rooms and enclosed spaces.
High expansion foam (>200): used in large enclosed volumes.

THE WATER SPRINKLER SYSTEM:

Mandatory in the accommodation areas of passenger ships. It works automatically; the sprinkler heads activate at a set temperature (usually 68°C or 79°C). They are triggered by a glass bulb or a fusible link.

THE WATER MIST SYSTEM:

Fine water droplets create a large cooling surface. Low water consumption. Used in engine rooms and accommodation spaces. Developed as an alternative to halon.

FM-200 (HFC-227ea):

A clean extinguishing gas. The environmentally friendly alternative to Halon 1301. It works by breaking the chemical reaction and by cooling. It leaves no residue. Used in control rooms and areas with electronic equipment.`,
    keyPoints: [
      "CO₂ sistemi boşaltma öncesi 20 saniyelik ön alarm zorunludur",
      "CO₂ ölümcüldür, bölmedeki tüm personel tahliye edilmelidir",
      "Makine dairesi CO₂ kapasitesi: hacmin minimum %35'i",
      "Su sisi (water mist) halon alternatifi olarak yaygınlaşmaktadır",
    ],
    warnings: [
      "Before releasing CO₂ you must be CERTAIN that there is nobody in the space",
      "The procedures for entering the CO₂ room must be applied strictly",
    ],
  },
  "fire-fighting-proc": {
    title: "Yangınla Mücadele Prosedürleri",
    introduction: "Gemide yangınla etkili mücadele, organize ekip çalışması ve standart prosedürlerin uygulanmasını gerektirir.",
    content: `THE FIRE ALARM PROCEDURE:

1. Whoever discovers the fire raises the alarm at once and informs the bridge.
2. The location, type and size of the fire are reported.
3. The general alarm is sounded (7 short blasts + 1 prolonged blast).
4. The crew go to their fire stations and take up the positions set out in the muster list.

BOUNDARY COOLING:

To prevent the fire spreading to adjacent compartments, the boundaries (bulkheads, decks) of the compartment on fire are cooled with water from outside. This is critical to preserving structural integrity.

AN ENGINE ROOM FIRE:

1. Close the fuel valves (quick closing valves).
2. Stop the ventilation and close the dampers.
3. Evacuate all personnel from the space.
4. Release the fixed extinguishing system (CO₂ or FM-200).
5. Apply boundary cooling.
6. Do not open the space until you are sure the fire is out.

FIRE TEAM ORGANISATION:

Team No. 1 (attack): responds in full fire fighting outfit with SCBA (breathing apparatus) and a fire hose.
Team No. 2 (back-up/support): the back-up team for Team No. 1. Boundary cooling and logistic support.
Team No. 3 (technical): ventilation control, valve operations, pump control.
Medical team: first aid.

USING SCBA:

Self-Contained Breathing Apparatus is a closed-circuit breathing set. Personnel fighting a fire must wear SCBA. The cylinder capacity is usually 30 minutes. The cylinder pressure is checked before entry. The buddy system (working in pairs) is mandatory.`,
    keyPoints: [
      "Genel yangın alarmı: 7 kısa + 1 uzun düdük",
      "Makine dairesi yangınında önce yakıt vanaları kapatılır",
      "SCBA kullanımı zorunludur, buddy system uygulanır",
      "Sınır soğutma yangının yayılmasını önlemek için kritiktir",
    ],
    warnings: [
      "The space must not be opened until you are sure the fire is out – the risk of flashback",
      "SCBA olmadan duman dolu alana girilmez",
    ],
  },
  "engine-room-fire": {
    title: "Makine Dairesi Yangınları",
    introduction: "Makine dairesi, gemide en yüksek yangın riskine sahip bölgedir. Yakıt sızıntısı, sıcak yüzeyler ve elektrik arızaları başlıca yangın nedenleridir.",
    content: `THE MAIN CAUSES:

1. Fuel leakage: fuel reaching a hot surface (exhaust manifold, turbocharger casing) after a failure of a high-pressure fuel line, a flange leak or a gasket leak. When a hot surface exceeds 220°C, HFO is already well past its flash point.

2. Oil leakage: a leak of lubricating oil or hydraulic oil.

3. Electrical fault: breakdown of cable insulation, loose connections, overload.

4. Economizer fire: a fire inside the economizer caused by a build-up of soot.

5. Scavenge fire: a fire caused by a build-up of oil and carbon in the scavenge air trunk.

PREVENTIVE MEASURES:

Fuel line lagging (thermal insulation): lagging hot surfaces delays fuel reaching them in the event of a leak.
Drip trays: leakage collection trays; they catch fuel and oil leaks.
Quick closing valves: remotely operated valves; they cut off the fuel flow in a fire.
Regular maintenance: periodic checks of flanges, gaskets, hoses and connections.
Cleanliness: regular removal of oil accumulations.

EMERGENCY RESPONSE:

1. Close the quick closing valves
2. Stop the fuel pumps
3. Stop the ventilation fans and close the fire dampers
4. Evacuate personnel
5. Release the CO₂ or FM-200 system
6. Start boundary cooling
7. Isolate the machinery completely

THE RISK OF RE-IGNITION:

If the space is opened after the fire has been extinguished but before the hot surfaces have cooled, the fresh air can cause re-ignition. The space must be kept closed for at least 24 hours and temperature readings must be taken.`,
    keyPoints: [
      "Makine dairesi yangınlarının %90'ı yakıt/yağ sızıntısından kaynaklanır",
      "Sıcak yüzey sıcaklığı >220°C ise HFO tutuşma riski yüksektir",
      "Yangın söndürüldükten sonra en az 24 saat bölme açılmamalıdır",
      "Quick closing valve'lar düzenli test edilmelidir",
    ],
    warnings: [
      "The space must not be opened early because of the risk of re-ignition after extinguishing",
      "Damaged lagging (insulation) must be repaired immediately",
    ],
  },
  "fire-drills": {
    title: "Yangın Tatbikatları ve SOLAS Gereksinimleri",
    introduction: "SOLAS III/19.3 gereği yangın tatbikatları düzenli aralıklarla yapılmalı ve tüm mürettebatın katılımı sağlanmalıdır.",
    content: `FREQUENCY OF DRILLS:

SOLAS Chapter III, Regulation 19.3.2: every crew member must take part in at least one fire drill each month. If more than 25% of the crew did not take part in the drills on that ship in the previous month, a drill must be held within 24 hours of the ship leaving port.

THE MANDATORY DRILL SCHEDULE (SOLAS III/19.3; III/30.2 on passenger ships):
- Abandon ship drill: at least once a month on cargo ships; weekly on passenger ships.
- Fire drill: at least once a month on cargo ships; weekly on passenger ships.
- Every lifeboat must be launched and manoeuvred in the water: at least once every 3 months (III/19.3.4.3).
- The rescue boat must be launched and manoeuvred: monthly where practicable, and in any case at least once every 3 months (III/19.3.4.4).
- Free-fall lifeboat: an actual or simulated launching drill at least once every 6 months.
- Enclosed space entry and rescue drill: at least once every 2 months (SOLAS III/19.3.3).
- Every crew member must take part in an abandon ship drill within one month.

DRILL CONTENT:

1. Sounding the general alarm and mustering the crew at their fire stations
2. Preparing the fire teams in full outfit
3. Use and checking of SCBA
4. Running out, connecting and using a fire hose
5. Checking the fire pump and the fixed extinguishing system
6. Ventilation and fire damper control
7. Operating the quick closing valves
8. Applying boundary cooling
9. Checking the emergency escape routes
10. First aid response

RECORDS AND DOCUMENTATION:

All drills are entered in the Official Log Book. The date, duration, scenario details, participants and any deficiencies found are recorded. Drill records are checked in PSC inspections. A shortcoming may be treated as a detainable deficiency.

SCENARIOS:

Drills must be run with different scenarios: an engine room fire, a galley fire, an accommodation fire, a cargo hold fire. Different extinguishing methods and team coordination must be practised for each scenario.`,
    keyPoints: [
      "Yangın tatbikatı en az ayda bir yapılmalıdır (SOLAS III/19.3)",
      "Mürettebatın %25'i değişirse 24 saat içinde tatbikat zorunludur",
      "Tatbikatlar Official Log Book'a kaydedilir",
      "Farklı senaryo ve lokasyonlarla çeşitlilik sağlanmalıdır",
    ],
  },

  // =====================================================
  // BÖLÜM 3 - CAN KURTARMA ARAÇLARI (LSA)
  // =====================================================
  "lsa-overview": {
    title: "LSA Code Genel Yapısı",
    introduction: "LSA Code (Life-Saving Appliances Code), SOLAS Bölüm III'ün uygulanması için teknik standartları belirler.",
    content: `THE STRUCTURE OF THE LSA CODE:

The LSA Code covers the design, performance and testing requirements for life-saving appliances. It defines the technical specifications of all the life-saving equipment required by the SOLAS Chapter III regulations.

THE MAIN SECTIONS:

Chapter I – General: scope and definitions.
Chapter II – Personal life-saving appliances: lifejackets, lifebuoys, immersion suits and thermal protective aids (TPA).
Chapter III – Visual signals: pyrotechnics (rocket parachute flares, hand flares, smoke signals).
Chapter IV – Survival craft: requirements for lifeboats and liferafts.
Chapter V – Launching and embarkation appliances: davits, winches and launching systems.
Chapter VI – Other appliances: line-throwing appliances.

GENERAL REQUIREMENTS:

All life-saving appliances must be resistant to the marine environment, UV radiation, temperature variation and rainwater. They must be fitted with retro-reflective tape. All personal life-saving appliances must be IMO approved and records of periodic maintenance/testing must be kept.`,
    keyPoints: [
      "LSA Code, SOLAS III'ün uygulama standardıdır",
      "Tüm LSA ekipmanları IMO onaylı ve retroreflektif bantlı olmalıdır",
      "Periyodik bakım ve test kayıtları tutulmalıdır",
      "Kişisel, görsel ve toplu can kurtarma araçlarını kapsar",
    ],
  },
  "lifeboats": {
    title: "Cankurtaran Sandal Tipleri ve Donanımı",
    introduction: "Cankurtaran sandallar, gemiyi terk etme durumunda tüm mürettebat ve yolcuları barındırmak üzere tasarlanmış kapalı veya yarı kapalı teknelerdir.",
    content: `TYPES OF LIFEBOAT:

Totally Enclosed Lifeboat (TELB): the standard type on cargo ships under SOLAS. It is self-righting if it capsizes. It has an engine, a water spray pump, ventilation, first aid equipment and food/water.

Partially enclosed lifeboat: may be found on passenger ships.

Free-fall lifeboat: mounted on the after deck of tankers and bulk carriers. It is launched into the sea by free fall from a given height. Minimum free-fall capability of 1.0g. The crew are secured in special seats with harnesses.

LIFEBOAT EQUIPMENT:

The mandatory equipment list (in part):
- Engine (capable of 6 knots)
- Hand and mechanical steering
- Compass and chart
- Food (10,000 kJ per person) and fresh water (3 litres per person)
- First aid kit
- Pyrotechnic signals (4 rocket parachute flares, 6 hand flares, 2 buoyant smoke signals — LSA Code 4.4.8)
- Radar reflector or SART
- Torch and batteries
- Signalling flares (2)
- Oars, buoyant lifelines
- Sea anchor
- Survival manual

CAPACITY CALCULATION:

On cargo ships: there must be lifeboat capacity for the whole crew on each side. The total lifeboat capacity is therefore twice the number of crew.

On passenger ships: different requirements apply; the total capacity is provided by a combination of lifeboats and liferafts.`,
    keyPoints: [
      "Yük gemilerinde her bordada tam mürettebat kapasiteli sandal zorunludur",
      "Serbest düşme sandalı tanker ve dökme yük gemilerinde tercih edilir",
      "TELB devrilme durumunda kendini düzeltebilir",
      "Sandal donanımı SOLAS ve LSA Code ile detaylı olarak tanımlanmıştır",
    ],
  },
  "liferafts": {
    title: "Cankurtaran Salları ve SOLAS Gereksinimleri",
    introduction: "Cankurtaran salları, cankurtaran sandalların kullanılamadığı veya ek kapasite gerektiği durumlarda kullanılan şişirilebilir can kurtarma araçlarıdır.",
    content: `TYPES OF LIFERAFT:

SOLAS Type A (davit-launched): a raft launched by davit. Found on passenger ships and large cargo ships. The launching speed is controlled.

SOLAS Type B (throw-overboard): a raft thrown into the sea from the ship's side and inflated. It is fitted with an automatic inflation mechanism. If the ship founders, the hydrostatic release unit (HRU) frees it automatically and it inflates.

THE HYDROSTATIC RELEASE UNIT (HRU):

The HRU is activated automatically by water pressure when the ship sinks to a depth of 2-4 metres. It releases the securing strap, the raft floats to the surface and inflates automatically as the painter comes taut. The liferaft is serviced at an approved station every 12 months; the HRU is a disposable item that is not serviced and is renewed by the expiry date marked on it, normally every 2 years.

LIFERAFT EQUIPMENT:

The mandatory equipment is divided into SOLAS Pack A or Pack B:
Pack A (for voyages over 24 hours): water, food, paddles, sea anchor, first aid, pyrotechnics, repair kit, pump, torch.
Pack B (for voyages up to 24 hours): less food/water, basic pyrotechnics and equipment.

MAINTENANCE AND SERVICING:

Inflatable liferafts must be serviced at an approved service station every 12 months. A full test every 5 years. The HRU is replaced periodically. Servicing must be carried out by certified personnel.`,
    keyPoints: [
      "HRU, gemi 2-4 m derinliğe battığında otomatik olarak salı serbest bırakır",
      "Can salı 12 ayda bir serviste bakım görür; HRU bakımsız (disposable) parçadır, normalde 2 yılda bir yenilenir",
      "Sallar 12 ayda bir yetkili serviste bakım görmelidir",
      "SOLAS Pack A: 24+ saat, Pack B: 24 saate kadar hayatta kalma donanımı",
    ],
  },
  "rescue-boats": {
    title: "Kurtarma Botları",
    introduction: "Kurtarma botları (rescue boats), denize düşen kişilerin veya denizde sürüklenen can kurtarma araçlarının toplanması için tasarlanmış hızlı ve manevra kabiliyeti yüksek teknelerdir.",
    content: `RESCUE BOAT REQUIREMENTS:

Under SOLAS III/17.1 every ship must carry at least one rescue boat. A rescue boat may also count as a lifeboat; in that case the lifeboat capacity is arranged accordingly.

TECHNICAL CHARACTERISTICS:

A minimum speed of 6 knots. Capacity for at least 5 persons (with room for one casualty lying down). A rigid or inflated hull. Self-righting capability. A towing hook and a lifeline. Engine: outboard or inboard.

USES:

1. Recovering a person overboard (MOB)
2. Collecting liferafts drifting at sea
3. Inshore search operations
4. SAR support operations
5. Pilot transfer (together with the pilot ladder)

LAUNCHING AND RELEASE:

The rescue boat must be capable of being launched quickly by its davit system. SOLAS requires it to be launched and made ready within 5 minutes. When the man overboard alarm is given the rescue boat crew must prepare immediately.`,
    keyPoints: [
      "Her gemide en az bir kurtarma botu zorunludur (SOLAS III/17.1)",
      "5 dakika içinde denize indirilebilmelidir",
      "Minimum 6 knot hız ve 5 kişi kapasitesi",
      "MOB, SAR ve sal toplama operasyonlarında kullanılır",
    ],
  },
  "personal-lsa": {
    title: "Kişisel Can Kurtarma Teçhizatı",
    introduction: "Kişisel can kurtarma teçhizatı, denize düşme veya gemiyi terk etme durumunda bireyin hayatta kalma şansını artıran ekipmanlardır.",
    content: `LIFEJACKET:

SOLAS requires a lifejacket for every person on board, plus additional jackets at the watch positions. Children's lifejackets are also mandatory on passenger ships.

Performance requirements: it must turn an unconscious person into a safe face-up position with the mouth clear of the water within 5 seconds. At least 15.5 kg of buoyancy. It must be fitted with a whistle, a light (1 cd, 8 hours) and retro-reflective tape.

LIFEBUOY:

The minimum number of lifebuoys is set by the length of the ship. At least 2 on each side, stowed so that they can be released quickly. At least half must be fitted with a man-overboard (MOB) light and at least 2 also with an automatic smoke signal; at least 1 must have a 30-metre buoyant line.

Minimum numbers (SOLAS III):
- Cargo ships (Regulation 32): <100 m = 8; 100-150 m = 10; 150-200 m = 12; ≥200 m = 14.
- Passenger ships (Regulation 22): <60 m = 8; 60-120 m = 12; 120-180 m = 18; 180-240 m = 24; ≥240 m = 30.

PYROTECHNIC SIGNALS (ship level):
At least 12 rocket parachute flares are carried on or near the bridge (SOLAS III/6.3). These are separate from the pyrotechnics carried in each lifeboat (4 rocket parachute flares, 6 hand flares, 2 buoyant smoke signals).

IMMERSION SUIT:

Designed to preserve body heat when abandoning ship in cold water. A close-fitting watertight suit. It keeps the fall in body temperature below 2°C for 6 hours. It provides 70 N of buoyancy without a lifejacket. Mandatory under SOLAS on ships operating in cold waters.

THERMAL PROTECTIVE AID (TPA):

A waterproof, windproof bag-shaped garment. Used in a liferaft or lifeboat by persons without an immersion suit. It slows the loss of body heat.`,
    keyPoints: [
      "Her kişi için bir can yeleği + vardiya pozisyonlarında ek yelek zorunludur",
      "Can yeleği 5 saniye içinde yüzüstü pozisyon sağlamalıdır",
      "En az 2 can simidi MOB ışığı ve duman işareti ile donatılmalıdır",
      "İmmersion suit 6 saat boyunca vücut ısısını korur",
    ],
  },
  "pyrotechnics": {
    title: "Piroteknik İşaret Araçları",
    introduction: "Piroteknik işaret araçları, denizde tehlike durumunda görsel sinyal vererek kurtarma operasyonlarını yönlendirmek için kullanılır.",
    content: `TYPES OF PYROTECHNIC:

ROCKET PARACHUTE FLARE: fired to a height of at least 300 metres. It descends by parachute, burning red at a minimum of 30,000 candela for at least 40 seconds. Visible by day and night. It can be seen from 40 km. It is fired at a slight angle into the wind.

HAND FLARE: a red flare held in the hand. It burns at 15,000 candela for at least 1 minute. Used for marking a position at short range. Effective for showing your position to a rescue helicopter or ship.

BUOYANT SMOKE SIGNAL: emits orange smoke. Effective for at least 3 minutes. Used in daylight. It is put into the water and the smoke drifts downwind.

RULES OF USE:

Pyrotechnics are marked with a serial number and an expiry date. They must not be used after the expiry date (although they may be kept on board as spares). The wind direction must be watched when using them. A rocket parachute flare must be fired to leeward so that it does not fall burning onto the ship.

STCW REQUIREMENTS:

All seafarers must be trained in the use of pyrotechnics. Expired pyrotechnics may be used for practice during drills.`,
    keyPoints: [
      "Paraşüt fişeği 300 m yüksekliğe fırlatılır, 40+ saniye yanar",
      "El meşalesi yakın mesafe, paraşüt fişeği uzak mesafe için kullanılır",
      "Duman işareti yalnızca gündüz saatlerinde etkilidir",
      "Son kullanma tarihi dolmuş piroteknikler kullanılmamalıdır",
    ],
  },
  "lsa-maintenance": {
    title: "LSA Bakım ve Muayene",
    introduction: "Can kurtarma araçlarının güvenilirliği, düzenli bakım, muayene ve test ile sağlanır. SOLAS III/20 bakım gereksinimlerini tanımlar.",
    content: `WEEKLY CHECKS:

All life-saving appliances and launching gear are inspected visually every week. The lifeboat engines are run (at least 3 minutes). The quick closing valves, falls and hooks are checked. The results are entered in the log book.

MONTHLY CHECKS:

Lifejackets, lifebuoys and pyrotechnic stocks are checked. The EPIRB and SART are tested. The radio equipment is tested. The emergency lighting is checked.

ANNUAL CHECKS:

Load testing of davits and winches (every 5 years). Inspection of the wire ropes and the record of renewal. Full functional testing of the lifeboats (engine, equipment, watertightness).

LIFEBOAT MAINTENANCE:

Weekly engine running. Monthly equipment check. Annual maker-approved servicing. Greasing the davit winch and inspecting the wires. Testing the on-load and off-load release gear.

IMPORTANT NOTE: under MSC.1/Circ.1206 lifeboats must be serviced by maker-authorised service stations. Unauthorised servicing creates a safety risk and is a SOLAS breach.`,
    keyPoints: [
      "Haftalık motor çalıştırma, aylık donanım kontrolü zorunludur",
      "Sandal bakımı üretici yetkili servis istasyonları tarafından yapılmalıdır",
      "Wire rope'lar düzenli muayene edilir, hasarlılar değiştirilir",
      "Tüm bakım ve test kayıtları dokümante edilmelidir",
    ],
  },

  // =====================================================
  // BÖLÜM 4 - GEMİYİ TERK ETME
  // =====================================================
  "abandon-decision": {
    title: "Terk Kararı ve Yetki Zinciri",
    introduction: "Gemiyi terk etme kararı, en son çare olarak verilir ve yalnızca gemi kaptanının yetkisindedir.",
    content: `THE DECISION PROCESS:

The decision to abandon ship is taken when the ship can no longer provide for the safety of the crew and passengers. The master takes this decision after weighing all the alternatives. The basic rule: "the ship is a bigger lifeboat than the lifeboat" – staying on board is always preferable and abandoning ship is the last resort.

WHEN THE DECISION TO ABANDON IS TAKEN:

1. An uncontrollable fire
2. Extensive flooding and the risk of foundering
3. Structural integrity seriously in doubt
4. An uncontrollable gas leak or chemical hazard

THE CHAIN OF AUTHORITY:

The decision to abandon ship is taken by the master alone. If the master is absent or unable to act, the chief officer assumes this authority. The order to abandon is announced throughout the ship by the general alarm and the PA system.`,
    keyPoints: [
      "Gemiyi terk etme kararı yalnızca kaptan tarafından verilir",
      "Gemi en büyük cankurtaran aracıdır – terk etme son çaredir",
      "Kaptanın yokluğunda başkaptan yetki devralır",
      "Kontrol edilemeyen yangın veya batma riski terk gerekçesidir",
    ],
  },
  "muster-stations": {
    title: "Toplanma İstasyonları ve Görev Dağılımı",
    introduction: "Acil durum toplanma istasyonları ve mürettebat görev dağılımı, Muster List (Emergency Station Bill) ile belirlenir.",
    content: `THE MUSTER LIST:

Under SOLAS III/8 every ship must have a muster list. The allocation of duties is drawn up against the crew list and every person's duty is clearly defined. The muster list must be posted on the bridge, in the engine control room and in the crew accommodation.

DUTY GROUPS:

1. Bridge team: communications, alarm control, safety of navigation
2. Engine room team: shutting off fuel, ventilation control, pump operation
3. Survival craft team: preparing and launching the boats/rafts
4. Fire team: fire fighting
5. Medical team: first aid, medical response
6. Passenger guidance team (on passenger ships): directing passengers to the muster stations

MUSTER STATIONS:

Every muster station must be clearly marked and lit. IMO symbols are used. Access from the muster station to the embarkation point must be easy.

ALARM SIGNALS:

General alarm: 7 short blasts + 1 prolonged blast
Fire alarm: a continuously ringing bell/whistle
Abandon ship: the general alarm plus the order to abandon over the PA`,
    keyPoints: [
      "Muster List (Acil Durum Görev Listesi) her gemide zorunludur",
      "Genel alarm: 7 kısa + 1 uzun düdük sesi",
      "Her mürettebat üyesinin görev ve toplanma noktası belirlenmiş olmalıdır",
      "Toplanma noktaları IMO sembolleri ile işaretlenmelidir",
    ],
  },
  "abandon-procedure": {
    title: "Gemiyi Terk Prosedürü",
    introduction: "Gemiyi terk etme prosedürü, kaptan emri ile başlayan ve standart adımlarla yürütülen hayati bir süreçtir.",
    content: `THE ABANDON SHIP PROCEDURE, STEP BY STEP:

1. PREPARATION: the master gives the order to abandon and the general alarm is sounded. A MAYDAY call is made. The EPIRB is activated. The SART is made ready.

2. MUSTERING: crew and passengers go to the muster stations. Lifejackets are put on. A roll call is taken. Whether to don immersion suits is assessed.

3. EMBARKATION: the boat/raft crews go to their stations. The davit systems are prepared. The embarkation ladder or ramp is used. Priority: the injured, children, women, the elderly.

4. LAUNCHING: controlled lowering by davit. The hooks are released when the boat reaches the water (on-load release). Rafts are launched (thrown overboard or lowered by davit). For a free-fall lifeboat the release mechanism is activated.

5. CLEARING THE SHIP: the boats and rafts move at least 200 metres away from the ship (suction effect and the risk of explosion). The rafts and boats gather together. The sea anchor is streamed. Survival procedures begin.

IMPORTANT PRINCIPLES:

Jumping into the sea from the ship is a last resort. If you must jump: the lifejacket is secured tightly, the mouth and nose are covered with one hand, the feet are held together and the jump is from no more than 5 metres. Jump from the lee side.`,
    keyPoints: [
      "MAYDAY çağrısı ve EPIRB aktivasyonu ilk adımlardır",
      "Gemiden en az 200 metre uzaklaşılmalıdır",
      "Denize atlama son çare olarak uygulanır",
      "Öncelik sırası: yaralılar, çocuklar, kadınlar, yaşlılar",
    ],
  },
  "launching-boats": {
    title: "Sandal ve Sal İndirme Teknikleri",
    introduction: "Cankurtaran sandal ve sallarının güvenli ve hızlı şekilde denize indirilmesi, düzenli eğitim ve tatbikat gerektiren kritik bir beceridir.",
    content: `LAUNCHING A LIFEBOAT (BY DAVIT):

1. The boat cover is removed and the gripes are released.
2. Embarkation takes place. The crew board fully equipped.
3. The davit arm is turned to swing the boat outboard.
4. The wire brake is checked and the boat is lowered to the water under control.
5. The hooks are released at the water surface (on-load release).
6. The painter is cut.
7. The engine is started and the boat clears the ship.

THE FREE-FALL LIFEBOAT:

1. The crew sit in the special seats and fasten their harnesses.
2. The master confirms the order to abandon.
3. The release mechanism is activated.
4. The boat slides down the ramp and enters the water in free fall.
5. The impact with the water is absorbed.
6. The engine is started and the boat clears the ship.

LAUNCHING A LIFERAFT:

Throw-overboard raft: the container securing is released, the raft is thrown into the sea and inflated by pulling the painter. Automatic release by HRU is also possible.
Davit-launched raft: lowered under control by davit, with embarkation at deck level.

IMPORTANT: the on-load release mechanism allows the boat to be released from the hooks under load while it is in the water. The correct operation of this mechanism is vital. Regular testing and maintenance are mandatory.`,
    keyPoints: [
      "On-load release mekanizmasının düzgün çalışması hayati önemdedir",
      "Serbest düşme sandalında emniyet kemeri bağlanması zorunludur",
      "Painter halatı sal şişirildikten sonra kesilir",
      "Sandal/sal indirme tatbikatı düzenli yapılmalıdır",
    ],
  },
  "survival-at-sea": {
    title: "Denizde Hayatta Kalma",
    introduction: "Gemiyi terk ettikten sonra kurtarılana kadar geçen sürede hayatta kalma, fiziksel ve psikolojik hazırlık gerektirir.",
    content: `SURVIVAL PRIORITIES:

1. PROTECTION: protection from hypothermia, sunstroke and injury. Use of an immersion suit or TPA. Closing the raft canopy.
2. LOCATION: EPIRB, SART, pyrotechnics, a heliograph mirror, a whistle.
3. WATER: managing the fresh water is the most critical element. An adult can survive on a minimum of 0.5 litres of water a day. No water is drunk in the first 24 hours (the body's reserves are sufficient).
4. FOOD: emergency food rations. Because digesting protein increases water consumption, fish must not be eaten when water is short.

HYPOTHERMIA:

Hypothermia is a fall in the body's core temperature below 35°C. Water conducts heat 25 times faster than air. A person in water at 15°C can survive for 4-6 hours in a lifejacket and 12+ hours in an immersion suit.

The HELP position: the legs are drawn up to the chest and the arms wrapped around the body. It reduces heat loss by 50%.
The HUDDLE position: huddling together as a group. It reduces heat loss still further.

PSYCHOLOGICAL FACTORS:

Leadership: one person is appointed leader in the boat/raft.
Allocation of duties: watchkeeping, water distribution, lookout.
Morale: the will to survive is the single most important factor. Regular activity and communication are maintained to keep despair at bay.`,
    keyPoints: [
      "HEAT pozisyonu ısı kaybını %50 azaltır",
      "Su yönetimi en kritik hayatta kalma faktörüdür",
      "İlk 24 saat su içilmez, vücut deposu kullanılır",
      "Liderlik ve görev dağılımı morali yüksek tutar",
    ],
  },
  "hypothermia": {
    title: "Hipotermi ve Soğuk Su Şoku",
    introduction: "Hipotermi, denizde can kaybının en önemli nedenlerinden biridir. Vücut çekirdek sıcaklığının 35°C'nin altına düşmesi olarak tanımlanır.",
    content: `STAGES OF HYPOTHERMIA:

Mild hypothermia (35-32°C): shivering, loss of manual dexterity, muscle stiffness. The person is conscious but their judgement is impaired.

Moderate hypothermia (32-28°C): shivering stops, severe muscle rigidity, confusion, drowsiness. Cardiac arrhythmias may begin.

Severe hypothermia (below 28°C): loss of consciousness, irregular heartbeat, slowed breathing. The risk of death is very high.

COLD SHOCK RESPONSE:

Sudden immersion in cold water causes cold shock in the first 1-3 minutes: an involuntary gasp reflex, hyperventilation and a sudden rise in heart rate. The risk of drowning is highest during this period. A lifejacket saves lives at this stage.

SURVIVAL TIMES (approximate):

Water temperature → average survival time with a lifejacket:
0-2°C → 15-45 minutes
2-4°C → 30-90 minutes
4-10°C → 1-3 hours
10-15°C → 2-6 hours
15-20°C → 6-12 hours
Above 20°C → indefinite (a long time)

FIRST AID:

1. The person is lifted from the water slowly (the risk of rescue collapse)
2. Wet clothing is removed and they are wrapped in a dry cover/blanket
3. Passive rewarming is applied (the body warms with its own heat)
4. A warm sweet drink may be given (if conscious)
5. Active external rewarming is not applied (the risk of afterdrop)
6. Chest compressions and CPR are given only if all signs of life have gone

RESCUE COLLAPSE:

The risk of a drop in blood pressure and cardiac arrest in the first minutes after recovery from the water. The person must be lifted horizontally and sudden movement avoided.`,
    keyPoints: [
      "Soğuk su şoku ilk 1-3 dakikada boğulma riski yaratır",
      "Can yeleği soğuk su şoku sırasında hayat kurtarır",
      "HEAT pozisyonu ısı kaybını %50 azaltır",
      "Rescue collapse: sudan çıkışta kalp durması riski – yatay pozisyonda çıkarın",
    ],
    warnings: [
      "Never give alcohol to a hypothermic casualty – vasodilation increases heat loss",
      "Active external rewarming (hot water bottles, etc.) is dangerous because of the risk of afterdrop",
    ],
  },

  // =====================================================
  // BÖLÜM 5 - İLK YARDIM
  // =====================================================
  "first-aid-basics": {
    title: "Temel İlk Yardım Prensipleri",
    introduction: "Denizde ilk yardım, tıbbi yardıma ulaşmanın sınırlı olduğu ortamda yaralanma ve hastalıklara ilk müdahaleyi kapsar.",
    content: `THE DR ABC PRINCIPLE:

D – Danger: assess the safety of the scene. Your own safety comes first.
R – Response: check the casualty's level of consciousness. Shake the shoulders gently and call out for a response.
A – Airway: make sure the airway is open. Head back, chin up.
B – Breathing: check for breathing. Look, listen and feel (10 seconds).
C – Circulation: check the pulse. Apply pressure to any major bleeding.

TRIAGE:

Where there is more than one casualty, priorities are set:
Red (immediate): life-threatening, treat at once
Yellow (delayed): serious injury, stable
Green (minor): walking wounded
Black: no signs of life

MEDICAL ORGANISATION ON BOARD:

The master is responsible for medical care on board (MLC 2006, STCW). A trained first-aider must be carried. The Ship Captain's Medical Guide is the reference book. Telemedical advice (TMAS) is available 24 hours a day.`,
    keyPoints: [
      "DR ABC: Tehlike → Yanıt → Hava yolu → Solunum → Dolaşım",
      "Triage: Kırmızı (acil), Sarı (geciktirilebilir), Yeşil (hafif)",
      "Kaptan gemideki tıbbi müdahaleden sorumludur",
      "TMAS 24 saat tele-tıbbi danışmanlık hizmeti verir",
    ],
  },
  "cpr-procedure": {
    title: "CPR ve Temel Yaşam Desteği",
    introduction: "CPR (Kardiyopulmoner Resüsitasyon), kalp durması durumunda hayat kurtaran temel yaşam desteği uygulamasıdır.",
    content: `THE CPR PROCEDURE (ADULT):

1. Check for danger, look for a response.
2. If there is no response, call for help and have an AED (if available) brought.
3. Open the airway (head back, chin up).
4. Check for breathing (10 seconds). If breathing is not normal, start CPR.
5. Give 30 chest compressions:
   - The heel of the hand on the lower half of the breastbone
   - Compress to a depth of 5-6 cm
   - At a rate of 100-120 compressions a minute
6. Give 2 rescue breaths.
7. Continue at a ratio of 30:2.
8. Use the AED as soon as it arrives.

AED (AUTOMATED EXTERNAL DEFIBRILLATOR):

Under SOLAS an AED must be carried on certain ships. The device guides the user with voice prompts. The electrode pads are placed on the chest. The device analyses the heart rhythm and advises a shock if required.

IMPORTANT NOTES:

Once started, CPR is continued until medical help arrives or the casualty starts breathing. Change over with another person when you tire. The quality of CPR (depth and rate) is the most important factor. The chest must be allowed to recoil fully between compressions.`,
    keyPoints: [
      "CPR oranı: 30 bası + 2 nefes",
      "Bası derinliği 5-6 cm, hız dakikada 100-120",
      "AED geldiğinde hemen kullanılmalıdır",
      "CPR kalitesi (derinlik + hız) hayatta kalma şansını belirler",
    ],
  },
  "bleeding-fractures": {
    title: "Kanama Kontrolü ve Kırık Müdahalesi",
    introduction: "Ciddi kanama ve kırıklar, gemide sık karşılaşılan yaralanma türleridir ve doğru ilk yardım müdahalesi hayati önem taşır.",
    content: `CONTROLLING BLEEDING:

Direct pressure: press firmly on the wound with a clean dressing. This is the most effective method.
Elevation: raise the bleeding limb above the level of the heart.
Pressure points: press on the arterial pressure points (brachial, femoral artery).
Tourniquet: applied as a last resort for life-threatening limb bleeding. The time of application is recorded.

TREATING FRACTURES:

Open fracture: the bone protrudes or the wound is open. Cover with a sterile dressing and apply a splint. Do not try to push the bone back.
Closed fracture: no external wound. Swelling, pain, deformity. Immobilise with a splint.

Rules for applying a splint: immobilise so as to include the joints above and below the fracture. Check the circulation (pulse, colour, sensation). Immobilise before moving the casualty.

SPECIAL CASES:

Suspected spinal injury: do not move the casualty. Keep the head, neck and body in line. Move using the log-roll technique.
Pelvic fracture: bind the legs together and keep the casualty still.
Rib fracture: lay the casualty on the injured side and support it.`,
    keyPoints: [
      "Doğrudan baskı en etkili kanama kontrol yöntemidir",
      "Turnike son çare olarak uygulanır, zaman kaydedilir",
      "Splint kırığın üst ve alt eklemlerini içermelidir",
      "Omurga yaralanması şüphesinde kişi hareket ettirilmez",
    ],
  },
  "burns-treatment": {
    title: "Yanık Tedavisi",
    introduction: "Yanıklar, gemide makine dairesi, mutfak ve kimyasal madde operasyonlarında sıkça karşılaşılan yaralanma türüdür.",
    content: `DEGREES OF BURN:

1st degree: superficial redness and pain. Only the epidermis is affected. Like sunburn.
2nd degree: blistering and severe pain. Damage extending into the dermis. Risk of infection.
3rd degree: full-thickness damage to the skin. White/black in colour, no pain (the nerve endings are destroyed).

FIRST AID:

1. Remove the casualty from the source of danger.
2. Put out burning clothing (stop-drop-roll).
3. Cool the burn with cool (tepid) water for at least 20 minutes. Do not apply ice.
4. Remove jewellery and tight clothing (before swelling starts).
5. Cover with a sterile, non-adherent dressing. Cling film may be used.
6. Do not burst blisters.
7. Do not apply ointment, oil or cream.

CALCULATING THE BURN AREA (Wallace's Rule of Nines):

Head and neck: 9%
Each arm: 9%
Chest (front): 18%
Back: 18%
Each leg: 18%
Perineum: 1%

Adults with burns over 15% of the body surface (10% in children) need fluid replacement. IV fluids must be started. TMAS must be contacted.

CHEMICAL BURNS:

Wash the chemical off with plenty of water (at least 20 minutes). Remove contaminated clothing. Do not try to neutralise it. Check the material safety data sheet (MSDS/SDS).`,
    keyPoints: [
      "Yanık en az 20 dakika soğuk suyla soğutulmalıdır",
      "Yanık alanı %15'i aşarsa IV sıvı replasmanı gerekir",
      "Wallace'ın 9'lar Kuralı yanık alanı hesabında kullanılır",
      "Kimyasal yanıkta en az 20 dakika su ile yıkama yapılır",
    ],
  },
  "medical-chest": {
    title: "Gemi Sağlık Sandığı (Medical Chest)",
    introduction: "Her ticari gemide, ILO/WHO standartlarına uygun tıbbi malzeme ve ilaç bulundurulması zorunludur.",
    content: `THE LEGAL BASIS:

Under MLC 2006 (the Maritime Labour Convention), Standard A4.1, every ship must carry adequate medical supplies. The contents of the ship's medical chest are determined by the ship's trading area, the number of crew and the length of the voyage.

CLASSIFICATION:

Category A: ships making long voyages far from the coast. The most comprehensive list of medicines and equipment.
Category B: coastal voyages. A medium level of supplies.
Category C: short distance, close to port. Basic supplies.

EXAMPLES OF CONTENTS:

Medicines: analgesics, antibiotics, anti-emetics, antihistamines, adrenaline, cardiac medication, eye/ear drops, antimalarials.
Supplies: bandages, splints, dressings, sterile gauze, IV sets, catheters, syringes, suture sets, oxygen sets.
Instruments: sphygmomanometer, stethoscope, thermometer, oximeter, AED.

CHECKING AND REPLENISHMENT:

The expiry dates of the medicines are checked regularly. Items used are replaced as soon as possible. The medical chest is subject to periodic PSC and flag State inspection.`,
    keyPoints: [
      "MLC 2006 gereği her gemide tıbbi malzeme zorunludur",
      "Seyir bölgesine göre Kategori A, B, C olarak sınıflandırılır",
      "İlaç son kullanma tarihleri düzenli kontrol edilmelidir",
      "PSC denetiminde sağlık sandığı kontrol edilir",
    ],
  },
  "telemedical": {
    title: "Tele-Tıbbi Danışmanlık (TMAS)",
    introduction: "TMAS (Telemedical Maritime Assistance Service), gemilere 24 saat uzaktan tıbbi danışmanlık hizmeti sunan sistemdir.",
    content: `THE TMAS SYSTEM:

TMAS is a service through which shore-based medical professionals provide remote diagnosis, treatment and evacuation decisions for sick or injured crew on board. The service is free and available 24/7.

COMMUNICATION CHANNELS:

Contact can be made by VHF, MF/HF radio, INMARSAT satellite telephone or email. Medical forms are transmitted in a standard format.

WHAT TO REPORT:

The patient's age, sex and rank
Complaints and symptoms
Vital signs (pulse, blood pressure, temperature, respiratory rate)
The first aid given
Current medication and allergies
The ship's position and distance to the nearest port

TMAS DECISIONS:

1. Treatment can continue on board
2. A change of route to put into port is recommended
3. Evacuation by helicopter (MEDEVAC) is required
4. Medical support is obtained from another ship at sea

THE MEDEVAC DECISION:

The decision to evacuate is taken on the recommendation of the TMAS doctor and with the master's approval. For a helicopter evacuation the ship's position, the weather and the helicopter's range are assessed. Coordination with the coastguard is arranged.`,
    keyPoints: [
      "TMAS 24 saat ücretsiz tıbbi danışmanlık hizmeti sunar",
      "Medikal raporlar standart format ile iletilir",
      "MEDEVAC kararı TMAS ve kaptan koordinasyonuyla verilir",
      "İletişim: VHF, INMARSAT veya e-posta ile kurulabilir",
    ],
  },

  // =====================================================
  // BÖLÜM 6 - SAR
  // =====================================================
  "sar-system": {
    title: "SAR Sistemi ve IAMSAR Manual",
    introduction: "SAR (Search and Rescue), denizde tehlikedeki kişilerin aranması ve kurtarılmasına yönelik uluslararası koordineli operasyondur.",
    content: `THE LEGAL FRAMEWORK:

The SAR Convention (1979): provides for the organisation of search and rescue services at sea. The world's seas are divided into SAR regions and each coastal State is responsible for SAR coordination in its own region.

SOLAS V/33.1: sets out ships' obligations towards persons in distress at sea. Every master is obliged to respond to a distress call.

THE IAMSAR MANUAL:

IAMSAR (the International Aeronautical and Maritime Search and Rescue Manual) is in three volumes:
Volume I: Organization and Management (for States)
Volume II: Mission Co-ordination (for RCCs/MRCCs)
Volume III: Mobile Facilities (for ships and aircraft). It must be carried on every merchant ship.

SAR ORGANISATION:

MRCC (Maritime Rescue Coordination Centre): the coastal State's SAR coordination centre.
SMC (SAR Mission Coordinator): the overall coordinator of the operation (at the MRCC).
OSC (On-Scene Coordinator): the coordinator at the scene (usually the master of the first ship to arrive).
SRU (Search and Rescue Unit): a search and rescue unit.`,
    keyPoints: [
      "Her ticari gemide IAMSAR Cilt III bulunması zorunludur",
      "MRCC kıyı devletinin SAR koordinasyon merkezidir",
      "Tüm gemiler tehlike çağrılarına cevap vermekle yükümlüdür",
      "OSC genellikle olay yerine ilk ulaşan geminin kaptanıdır",
    ],
  },
  "sar-patterns": {
    title: "Arama Desenleri (Search Patterns)",
    introduction: "SAR operasyonlarında kullanılan arama desenleri, kayıp kişi veya nesnenin olası konumuna, arama alanının genişliğine ve mevcut araçlara göre seçilir.",
    image: "/diagrams/seamanship/arama-desenleri.svg",
    content: `SEARCH PATTERNS:

EXPANDING SQUARE SEARCH (SS): used when searching with a single unit. Effective where the position of the casualty is known relatively accurately. The search starts at a datum point and spirals outwards in progressively larger squares.

SECTOR SEARCH (VS): used where the position of the casualty is well known and the search area is small. The search runs outwards from a datum point on different headings.

PARALLEL TRACK SEARCH (PS): used to search a large area with several units. The units run on parallel tracks. It is the most widely used pattern for large areas.

CREEPING LINE AHEAD (CS): a search of a long, narrow area with a single unit, along the direction of the current or wind. The parallel legs are run at right angles to the direction of the current.

TRACK LINE SEARCH: a search along the known route of the missing ship. The track is swept on outward and return legs.

SWEEP WIDTH:

The sweep width is set by the weather, visibility, wave height and the size of the object being sought. Sweep width tables are given in IAMSAR Volume III.`,
    keyPoints: [
      "Expanding Square: tek araç, kesin konum tahmini",
      "Parallel Track: geniş alan, çoklu araç",
      "Sector Search: küçük alan, kesin konum",
      "Sweep width hava koşullarına ve hedef boyutuna göre değişir",
    ],
  },
  "on-scene-coordinator": {
    title: "Olay Yeri Koordinatörü (OSC)",
    introduction: "OSC (On-Scene Coordinator), SAR olay yerine ilk ulaşan veya MRCC tarafından atanan geminin kaptanıdır ve olay yerindeki tüm araçları koordine eder.",
    content: `THE OSC'S DUTIES:

1. Defining the search area and allocating the units
2. Choosing and applying the search pattern
3. Coordinating the rescue of persons found
4. Passing situation reports to the SMC
5. Setting up the communications plan
6. Care and transfer of the survivors

APPOINTING THE OSC:

The master of the first ship to arrive on scene usually acts as OSC. The MRCC may hand the OSC role over when a more suitable ship arrives. A naval or coastguard vessel is appointed OSC in preference.

OSC REPORTING:

The OSC reports the progress of the search to the MRCC at regular intervals. The SITREP (Situation Report) format is used. The report covers: the search area, the number of persons found, the weather, the fuel situation and the status of the other units.

TERMINATING THE SEARCH:

The decision to terminate the search is taken by the MRCC. The OSC does not terminate the search without the MRCC's approval. All units terminate the search at the same time.`,
    keyPoints: [
      "OSC olay yerindeki tüm araçları koordine eder",
      "OSC genellikle ilk ulaşan geminin kaptanıdır",
      "SITREP formatında düzenli raporlama yapılır",
      "Arama sonlandırma kararı MRCC tarafından verilir",
    ],
  },
  "person-overboard": {
    title: "Denize Düşme ve MOB Prosedürü",
    introduction: "Denize düşme (Man Overboard – MOB), gemide en acil müdahale gerektiren durumlardan biridir.",
    content: `IMMEDIATE ACTIONS:

1. Shout "Man overboard!"
2. Throw a lifebuoy (with MOB light and smoke signal)
3. Inform the bridge
4. Press the MOB button (it records the GPS position)
5. Post a lookout – do not lose sight of the person in the water

MANOEUVRES:

WILLIAMSON TURN: the most commonly used MOB manoeuvre. The helm is put hard over to one side and, when the ship has turned 60°, hard over to the other side. The ship turns onto the exact reciprocal of the original course and returns along the same track. Effective in restricted visibility.

ANDERSON TURN: the helm is put hard over to one side and the ship turns through 270°. It gives the fastest return. Preferred in good visibility.

SCHARNOW TURN: the helm is put over to one side and, when the ship has turned 240° from the original course, over to the other side. It gives the most accurate approach to the position on large ships.

RECOVERY:

Approach the person from downwind. Put the engine to neutral (the risk of propeller injury). Launch the rescue boat, or pass a line or ladder. Lift a hypothermic casualty out horizontally.`,
    keyPoints: [
      "MOB butonuna hemen basarak GPS pozisyonu kaydet",
      "Williamson Turn: kısıtlı görüşte en etkili manevra",
      "Anderson Turn: iyi görüşte hızlı geri dönüş",
      "Kişiye rüzgar altından yaklaşılır, pervane dur konumuna alınır",
    ],
  },
  "helicopter-ops": {
    title: "Helikopter Operasyonları",
    introduction: "Helikopter operasyonları, tıbbi tahliye (MEDEVAC) ve SAR kapsamında denizde kişi transferi için yapılır.",
    content: `PREPARATION:

1. The deck is prepared for the helicopter operation: loose gear is secured and aerials are lowered.
2. Fire fighting equipment is kept ready.
3. The wind direction and speed are established.
4. The ship steers so as to take the wind on the port bow/quarter as instructed.
5. The communication channel is agreed (usually VHF Ch. 16 or a SAR channel).

THE HI-LINE PROCEDURE:

The guide line (hi-line) sent down from the helicopter is lowered to the deck. It is taken in hand on board – IT IS NEVER MADE FAST TO THE SHIP (allow the static charge to discharge). The winch hook is guided down along the line. The person is lifted into the helicopter by the winch.

DOUBLE LIFT:

A rescue crew member is lowered from the helicopter, secures the casualty in a stretcher and is lifted with them.

SAFETY RULES:

The minimum approach distance to the helicopter rotors is 5 metres.
The helicopter pilot's instructions are followed.
The landing area must be a clear space of at least 5 x 5 metres.
For night operations the landing area is lit but the pilot must not be dazzled.
The hi-line is never made fast to the ship or led through a winch.`,
    keyPoints: [
      "Hi-line gemiye bağlanmaz – statik elektrik riski",
      "Rüzgar pruva omuzluğundan alınacak şekilde seyir yapılır",
      "Helikopter bıçaklarına minimum 5 m mesafe korunmalıdır",
      "Gece operasyonlarında pilot gözü kamaştırılmamalıdır",
    ],
    warnings: [
      "The hi-line must never be made fast to a winch or a bitt",
      "The line is first touched to the water or the deck to discharge the static charge",
    ],
  },

  // =====================================================
  // BÖLÜM 7 - GMDSS
  // =====================================================
  "gmdss-overview": {
    title: "GMDSS Genel Yapısı ve Deniz Alanları",
    introduction: "GMDSS (Global Maritime Distress and Safety System), denizde tehlike ve güvenlik haberleşmesini küresel ölçekte güvence altına alan sistemdir.",
    content: `THE DEVELOPMENT OF GMDSS:

GMDSS came fully into force on 1 February 1999. It is mandatory under SOLAS Chapter IV. It replaced the earlier Morse and radiotelephone based system. The basic principle is to guarantee that a distress alert reaches shore stations and nearby ships automatically.

SEA AREAS:

Area A1: within the coverage of at least one VHF coast station with DSC. Typically 20-30 nautical miles from the coast.

Area A2: outside VHF coverage but within the coverage of at least one MF coast station with DSC. Typically 100-150 nautical miles from the coast.

Area A3: outside A1 and A2 but within the coverage of an INMARSAT geostationary satellite. Approximately all seas between latitudes 70°N and 70°S.

Area A4: outside A1, A2 and A3. The polar regions. HF radio is mandatory.

MANDATORY EQUIPMENT:

All SOLAS ships: VHF (DSC, Ch.16, Ch.70), NAVTEX, EPIRB (406 MHz), SART or AIS-SART, two-way VHF radios (at least 3, waterproof).

A1 additionally: VHF DSC is sufficient.
A1+A2 additionally: MF DSC (2187.5 kHz).
A1+A2+A3 additionally: INMARSAT-C or HF DSC.
A4 additionally: MF/HF DSC is mandatory.`,
    keyPoints: [
      "GMDSS 1 Şubat 1999'da tam yürürlüğe girmiştir",
      "A1: VHF (20-30 nm), A2: MF (100-150 nm), A3: INMARSAT, A4: HF (kutup)",
      "EPIRB, SART, NAVTEX tüm SOLAS gemilerinde zorunludur",
      "GMDSS otomatik tehlike çağrısı iletimini garanti eder",
    ],
  },
  "epirb-sart": {
    title: "EPIRB, SART ve AIS-SART",
    introduction: "EPIRB ve SART, denizde tehlike durumunda konum bildirimi ve arama işaretlemesi sağlayan kritik GMDSS bileşenleridir.",
    content: `EPIRB (Emergency Position Indicating Radio Beacon):

Operates on 406 MHz. It transmits a distress signal through the COSPAS-SARSAT satellite system. It is activated manually or automatically (by HRU). Position information is provided by an internal GPS (accuracy ~100 m). Battery life: a minimum of 48 hours of continuous transmission.

Registration: every EPIRB must be registered with the national maritime authority. The registration details: ship's name, call sign, MMSI and emergency contact details.

EPIRB with HRU: when the ship sinks to a depth of 2-4 m the HRU releases the EPIRB automatically. The EPIRB floats to the surface and activates automatically.

SART (Search and Rescue Transponder):

It responds to a 9 GHz (X-band) radar signal. It appears on the rescue vessel's radar as 12 evenly spaced dots (which become arcs as the vessel closes). Battery: 96 hours on standby plus 8 hours transmitting.

AIS-SART:

It transmits position information over the AIS system. It appears with a special symbol on ECDIS and AIS displays. It is accepted as an alternative to the traditional SART. It is advantageous on ships fitted with S-band radar.

MAINTENANCE:

EPIRB: annual maintenance, battery replacement (as recommended by the maker, usually every 5 years), HRU replacement (every 2 years).
SART: monthly test (in test mode), annual maintenance.`,
    keyPoints: [
      "EPIRB 406 MHz ile COSPAS-SARSAT uydularına sinyal gönderir",
      "SART radarada 12 nokta olarak görünür",
      "EPIRB HRU 2-4 m derinlikte otomatik aktive olur",
      "EPIRB batarya ömrü minimum 48 saat, SART 96 saat bekleme",
    ],
  },
  "dsc-vhf": {
    title: "DSC ve VHF Haberleşmesi",
    introduction: "DSC (Digital Selective Calling), GMDSS'in temel bileşeni olarak otomatik dijital çağrı sistemidir.",
    content: `THE DSC SYSTEM:

DSC is used to call a particular station or all stations digitally. There are distress, urgency, safety and routine call categories.

VHF DSC: sends an automatic distress alert on Channel 70. The MMSI, position, nature of distress and time are included in the alert. When an alert is received an audible and visual alarm is given.

THE DISTRESS ALERT PROCEDURE:

1. Lift the cover of the DSC distress button
2. Select the nature of the distress (fire, sinking, abandoning ship, etc.)
3. Hold the button down for 5 seconds
4. The DSC alert is transmitted automatically on Ch.70
5. The alert repeats automatically every 4 minutes
6. When it is acknowledged, switch to VHF Ch.16 and pass the spoken MAYDAY message

THE MAYDAY MESSAGE FORMAT:

"MAYDAY MAYDAY MAYDAY, this is [ship's name] [ship's name] [ship's name], MAYDAY [ship's name], MMSI [number], my position is [latitude/longitude], I am [nature of distress], I require [assistance required], [number of crew] persons on board, over."

VHF CHANNELS:

Ch.16 (156.800 MHz): the international distress, urgency and safety channel
Ch.70: the DSC calling channel
Ch.13: bridge-to-bridge manoeuvring communications
Ch.06: ship-to-ship communications`,
    keyPoints: [
      "VHF Ch.70: DSC dijital çağrı kanalı, Ch.16: sesli tehlike kanalı",
      "DSC tehlike çağrısı MMSI, pozisyon ve tehlike türünü içerir",
      "Çağrı her 4 dakikada otomatik tekrarlanır",
      "MAYDAY mesajı standart format ile verilir",
    ],
  },
  "inmarsat": {
    title: "INMARSAT ve Uydu Sistemleri",
    introduction: "INMARSAT, denizde uydu üzerinden haberleşme hizmeti sunan ve GMDSS'in A3 alanı bileşeni olan küresel uydu sistemidir.",
    content: `THE INMARSAT SYSTEM:

Four geostationary satellites provide continuous coverage between 70°N and 70°S. It offers voice, data, fax and distress alerting services.

INMARSAT-C:

Text-based communication (store and forward). Two-way messaging and distress alerting. SafetyNET information is received through EGC (Enhanced Group Call). It is sufficient for GMDSS Area A3. Compact and low cost.

INMARSAT Fleet Broadband:

High-speed data, voice and video communication. Combined with a GMDSS function. It provides broadband internet access.

SafetyNET:

It broadcasts MSI (Maritime Safety Information) over INMARSAT-C. Meteorological warnings, NAVAREA navigational warnings, SAR information and piracy warnings are transmitted. It is mandatory in areas outside NAVTEX coverage.

OTHER SATELLITE SYSTEMS:

COSPAS-SARSAT: the distress satellite system that receives EPIRB signals. Global coverage using LEO (low earth orbit) and MEO satellites.
Iridium: global coverage including the poles with 66 LEO satellites. Approved as part of the modernisation of GMDSS.`,
    keyPoints: [
      "INMARSAT 70°N – 70°S arasında kapsama sağlar",
      "INMARSAT-C metin tabanlı, GMDSS A3 yeterli",
      "SafetyNET ile MSI (denizcilik güvenlik bilgileri) alınır",
      "Iridium kutuplar dahil küresel kapsama sağlar",
    ],
  },
  "navtex": {
    title: "NAVTEX ve Güvenlik Bilgileri",
    introduction: "NAVTEX (Navigational Telex), kıyı istasyonlarından otomatik olarak navigasyon ve meteoroloji uyarılarını alan GMDSS bileşenidir.",
    content: `THE NAVTEX SYSTEM:

It broadcasts on 518 kHz (international, in English) and 490 kHz (national language). It receives and prints automatically. Coverage: approximately 300-400 nautical miles from the coast (the limit of Area A2).

MESSAGE FORMAT:

Every NAVTEX message is identified by a 4-character header:
1st character: the transmitting station identity (A-Z)
2nd character: the message category
3rd-4th characters: the message serial number (01-99)

MESSAGE CATEGORIES:

A – Navigational warnings
B – Meteorological warnings
C – Ice reports
D – SAR information
E – Meteorological forecasts
F – Pilot service messages
G-Z – Other

RECEIVER SETTINGS:

The user can select which stations and which categories to receive. But categories A (navigational warnings), B (meteorological warnings), D (SAR) and L (additional navigational warnings) cannot be switched off – they are always received.

WWNWS (World Wide Navigational Warning Service):

The world is divided into 21 NAVAREAs. Each NAVAREA coordinator issues the navigational warnings for its region. NAVTEX is the coastal means of distributing these warnings.`,
    keyPoints: [
      "NAVTEX 518 kHz (İngilizce) ve 490 kHz (ulusal dil) frekanslarında çalışır",
      "A, B, D ve L kategorileri kapatılamaz – her zaman alınır",
      "Kapsama alanı yaklaşık 300-400 deniz mili",
      "21 NAVAREA bölgesinde navigasyon uyarıları yayınlanır",
    ],
  },
  "distress-comm": {
    title: "Tehlike, Aciliyet ve Emniyet Haberleşmesi",
    introduction: "Deniz haberleşmesinde üç öncelik seviyesi tanımlanmıştır: tehlike (distress), aciliyet (urgency) ve emniyet (safety).",
    content: `DISTRESS – MAYDAY:

The highest priority. A ship or person is in grave and imminent danger and requires immediate assistance.
Procedure: a DSC distress alert on Ch.70 plus a MAYDAY message on VHF Ch.16.
All stations are obliged to listen out for and respond to a MAYDAY call.

Types of distress: sinking, fire, abandoning ship, grounding, collision, drifting, piracy attack.

URGENCY – PAN PAN:

The second priority. The safety of a ship or person is at risk but immediate danger has not yet arisen.
"PAN PAN PAN PAN PAN PAN, all stations, this is [ship's name]..."
Examples: machinery breakdown (the risk of drifting), a person overboard, the need for urgent medical assistance.

SAFETY – SECURITE:

The third priority. The transmission of navigational or meteorological safety information.
"SECURITE SECURITE SECURITE, all stations..."
Examples: an ice warning, a drifting container, a light out of order, a storm warning.

MAYDAY RELAY:

If the ship in distress cannot transmit for herself, another ship transmits a MAYDAY Relay on her behalf:
"MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY, this is [relaying ship's name], following received from [ship in distress]..."

FALSE DISTRESS ALERTS:

A distress alert sent by mistake must be cancelled at once. On VHF Ch.16: "All stations, this is [ship's name], cancel my distress alert of [date/time], MMSI [number]."`,
    keyPoints: [
      "MAYDAY: ciddi ve yakın tehlike, en yüksek öncelik",
      "PAN PAN: güvenlik tehlikede ama acil tehlike yok",
      "SECURITE: navigasyon/meteoroloji güvenlik bilgisi",
      "Yanlış tehlike çağrısı derhal iptal edilmelidir",
    ],
  },

  // =====================================================
  // BÖLÜM 8 - ISM & ISPS
  // =====================================================
  "ism-code": {
    title: "ISM Code Yapısı ve Gereklilikleri",
    introduction: "ISM Code (International Safety Management Code), gemilerin güvenli işletilmesi ve deniz kirliliğinin önlenmesi için sistematik bir yönetim çerçevesi oluşturur.",
    content: `THE PURPOSE OF THE ISM CODE:

Mandatory under SOLAS Chapter IX. It structures the company's management system so as to ensure safe ship operation and prevent marine pollution.

THE STRUCTURE OF THE ISM CODE (16 sections):

1. General: purpose, application, definitions.
2. Safety and environmental protection policy.
3. Company responsibilities and authority.
4. Designated Person Ashore (DPA): the person ashore who provides the safety link between the ship and the management.
5. Master's responsibility and authority.
6. Resources and personnel: training, competence, drills.
7. Development of plans for shipboard operations.
8. Emergency preparedness.
9. Reports and analysis of non-conformities, accidents and hazardous occurrences.
10. Maintenance of the ship and equipment.
11. Documentation.
12. Company verification, review and evaluation.

CERTIFICATES:

DOC (Document of Compliance): certifies that the company has established an SMS (Safety Management System) complying with the ISM Code. Valid for 5 years, with annual verification.
SMC (Safety Management Certificate): certifies that the ship is operated in accordance with the SMS. Valid for 5 years, with an intermediate verification.`,
    keyPoints: [
      "ISM Code SOLAS IX ile zorunludur",
      "DPA: şirket ve gemi arasında güvenlik bağlantısı",
      "DOC şirkete, SMC gemiye verilir",
      "Non-conformity raporlama ve analizi zorunludur (Bölüm 9)",
    ],
  },
  "sms-system": {
    title: "SMS (Safety Management System)",
    introduction: "SMS, ISM Code'un gerektirdiği güvenlik yönetim sistemidir ve şirketin tüm denizcilik operasyonlarını kapsayan dokümante edilmiş bir yönetim çerçevesidir.",
    content: `COMPONENTS OF THE SMS:

Safety and environmental policy: states the company's safety commitment.
Procedures and instructions: operational procedures, emergency plans, maintenance procedures.
Risk assessment: analysing the risk before an operation.
Internal audit: evaluating the effectiveness of the SMS at regular intervals.
Management review: senior management's evaluation of SMS performance.

IMPLEMENTATION ON BOARD:

Master's review: the master evaluates the effectiveness of the SMS at regular intervals and reports to the company.
Shipboard drills: drills are carried out in accordance with the SMS procedures.
Near-miss reporting: reporting near misses is a sign of a healthy safety culture.
Non-conformity follow-up: non-conformities found are closed out with corrective action.

DOCUMENT MANAGEMENT:

SMS documents are classified as controlled and uncontrolled. The documents on board must be kept up to date. Superseded versions must be removed. Electronic SMS systems are becoming widespread.`,
    keyPoints: [
      "SMS tüm operasyonel prosedürleri ve acil durum planlarını kapsar",
      "Near miss raporlama güvenlik kültürünün temel göstergesidir",
      "Master's Review: kaptanın SMS etkinliğini değerlendirmesi",
      "Non-conformity tespit edildiğinde düzeltici eylem zorunludur",
    ],
  },
  "isps-code": {
    title: "ISPS Code ve Güvenlik Seviyeleri",
    introduction: "ISPS Code (International Ship and Port Facility Security Code), gemilerin ve liman tesislerinin güvenliğini sağlamak amacıyla 11 Eylül 2001 sonrası oluşturulmuş uluslararası güvenlik çerçevesidir.",
    content: `THE STRUCTURE OF THE ISPS CODE:

Mandatory under SOLAS Chapter XI-2. It entered into force on 1 July 2004. It consists of two parts: Part A (mandatory) and Part B (recommendatory).

SECURITY LEVELS:

Security Level 1 (normal): normal operational security measures. The ship and the port facility apply their day-to-day security procedures.

Security Level 2 (heightened): applied where the security threat has increased. Additional security measures are taken: increased access control, extra patrols, strengthened protection of restricted areas.

Security Level 3 (exceptional): a probable or imminent security incident. Maximum security measures. Action is taken under the direction of the government authorities.

MANDATORY DOCUMENTS:

SSP (Ship Security Plan): defines the procedures to be applied at every security level.
SSA (Ship Security Assessment): the analysis of risks and vulnerabilities.
ISSC (International Ship Security Certificate): certifies the ship's compliance with the ISPS Code.

APPOINTED PERSONS:

SSO (Ship Security Officer): usually the chief officer.
CSO (Company Security Officer).
PFSO (Port Facility Security Officer).`,
    keyPoints: [
      "Üç güvenlik seviyesi: Level 1 (normal), Level 2 (artırılmış), Level 3 (olağanüstü)",
      "SSP (Gemi Güvenlik Planı) tüm seviyeleri kapsar",
      "SSO genellikle başkaptan tarafından üstlenilir",
      "ISPS Code 1 Temmuz 2004'te yürürlüğe girmiştir",
    ],
  },
  "sso-cso": {
    title: "SSO, CSO ve PFSO Görevleri",
    introduction: "ISPS Code kapsamında güvenlik sorumluluğu gemi, şirket ve liman tesisi düzeyinde atanmış kişilere dağıtılmıştır.",
    content: `SSO (Ship Security Officer):

The duties of the ship security officer:
1. Implementing and maintaining the SSP (Ship Security Plan)
2. Keeping the ship security assessment up to date
3. Arranging security training and drills
4. Reporting security incidents
5. Supervising access control
6. Regular communication with the CSO
7. Implementing changes of security level

CSO (Company Security Officer):

The duties of the company security officer:
1. Having the SSAs carried out and updated
2. Preparing the SSPs and having them approved
3. Appointing and training the SSOs
4. Conducting internal audits
5. Notifying the ships of changes of security level
6. Security liaison with the flag State and the port State

PFSO (Port Facility Security Officer):

The duties of the port facility security officer:
1. Implementing the port facility security plan (PFSP)
2. Coordinating security at the ship/port interface
3. Completing the Declaration of Security (DoS)
4. Arranging security drills

THE DECLARATION OF SECURITY (DoS):

A written declaration recording the division of security responsibilities between the ship and the port facility. It is completed where the security levels differ or for high-risk operations.`,
    keyPoints: [
      "SSO gemide SSP'yi uygular, CSO şirket genelinde koordine eder",
      "DoS gemi-liman arası güvenlik sorumluluklarını belgelemektedir",
      "Güvenlik seviyesi değişikliği CSO tarafından gemilere bildirilir",
      "SSO, CSO ve PFSO ISPS Code uyarınca eğitim almak zorundadır",
    ],
  },
  "security-assessment": {
    title: "Gemi Güvenlik Değerlendirmesi (SSA)",
    introduction: "SSA (Ship Security Assessment), geminin güvenlik zayıflıklarının ve olası tehditlerin sistematik analizi ile güvenlik planının temelini oluşturur.",
    content: `THE SSA PROCESS:

1. PRELIMINARY ASSESSMENT: identifying the existing security measures, the ship's physical structure and its operational profile.

2. THREAT ANALYSIS: the security threats possible for the ship's trading area and cargo type: piracy/armed robbery, terrorism, stowaways, smuggling, sabotage, cyber attack.

3. VULNERABILITY ANALYSIS: access points, the condition of the security equipment, surveillance systems, lighting, communications capability, the level of crew training.

4. RISK ASSESSMENT: probability of the threat × its impact = the level of risk. Priority areas are identified with a risk matrix.

5. COUNTERMEASURES: appropriate security measures are proposed for each risk and included in the SSP.

OUTPUTS OF THE SSA:

The results of the SSA are used directly in creating and updating the SSP (Ship Security Plan). The SSA is a confidential document and is not shown to unauthorised persons. The SSA is updated regularly (particularly when the ship's trade or trading area changes).`,
    keyPoints: [
      "SSA: tehdit analizi + zafiyet analizi + risk değerlendirmesi",
      "SSA gizli dokümandır, yetkisiz kişilere gösterilmez",
      "Seyir bölgesi veya ticaret değiştiğinde SSA güncellenir",
      "SSA sonuçları SSP'nin temelini oluşturur",
    ],
  },

  // =====================================================
  // BÖLÜM 9 - HAYATTA KALMA TEKNİKLERİ
  // =====================================================
  "water-entry": {
    title: "Suya Giriş Teknikleri",
    introduction: "Gemiyi terk ederken suya güvenli giriş, ilk anlardaki yaralanma ve boğulma riskini azaltmak için doğru teknik uygulamayı gerektirir.",
    content: `METHODS OF ENTERING THE WATER:

1. EMBARKATION LADDER/RAMP: the safest method. Boarding a lifeboat or liferaft directly. Watch for wet hands and slippery surfaces.

2. JUMPING (a last resort): from no more than 5 metres. The lifejacket must be firmly secured. Cover the mouth and nose with one hand. Hold the lifejacket down with the other hand. Keep the feet together. Jump upright. Jump from the lee side. Jump at least 3 metres clear of the ship (suction effect).

3. CLIMBING DOWN: a controlled descent by rope or ladder. Gloves improve the grip.

CLEARING THE SHIP:

Once in the water you must get clear of the ship at once because of:
- The suction effect (as she sinks)
- The risk of explosion (fuel tanks)
- The risk of falling debris
Get at least 200 metres clear.

SWIMMING IN A LIFEJACKET:

The lifejacket is put on and secured before entering the water. In the water, adopt a face-up position in the lifejacket. Do not swim unnecessarily, to conserve energy. The HELP position (legs drawn up to the chest, arms wrapped around the body) slows heat loss.`,
    keyPoints: [
      "Atlama son çare olarak, max 5 metreden, rüzgar altından yapılır",
      "Gemiden en az 200 metre uzaklaşılmalıdır",
      "Can yeleği suya girmeden önce giyilip sıkıca bağlanmalıdır",
      "HEAT pozisyonu ısı kaybını %50 azaltır",
    ],
  },
  "flotation-aids": {
    title: "Yüzme ve Batmama Teknikleri",
    introduction: "Can yeleği olmadan veya hasarlı can yeleği ile suda kalma durumunda batmama teknikleri hayat kurtarabilir.",
    content: `THE DROWNPROOFING TECHNIQUE:

An energy-saving floating technique used where there is no lifejacket or it is damaged:
1. Take a deep breath and put your face in the water
2. Relax the arms and legs (the starfish position)
3. When you run out of air, lift your head and breathe
4. Repeat

This technique makes it possible to stay in the water for hours because it minimises energy expenditure.

TREADING WATER:

Staying upright in the water. The legs make a cycling movement and the hands describe small horizontal circles. It uses more energy but keeps the head clear of the water.

GROUP TECHNIQUES:

HUDDLE: huddling together as a group. Used with at least 3 people. Children and weak swimmers are placed in the centre. It reduces heat loss considerably.

USING CLOTHING FOR BUOYANCY:

Trousers: knot the legs, fill them with air and use them around the neck as a temporary flotation aid.
Shirt: fasten the buttons and fill it with air.`,
    keyPoints: [
      "Drownproofing: enerji tasarruflu, saatlerce suda kalma tekniği",
      "HUDDLE: grup ısınması, merkeze zayıf yüzücüler alınır",
      "Giysiler geçici yüzdürme aracı olarak kullanılabilir",
      "Gereksiz yüzme enerji ve ısı kaybına neden olur",
    ],
  },
  "raft-survival": {
    title: "Salda Hayatta Kalma",
    introduction: "Cankurtaran salına bindikten sonra organize bir hayatta kalma planı uygulamak, kurtarılana kadar geçen sürede sağ kalma şansını artırır.",
    content: `FIRST ACTIONS:

1. CHECK FOR INJURIES: give first aid to the injured.
2. WATER MANAGEMENT: draw up a water distribution plan. Do not drink water in the first 24 hours (the body's reserves are sufficient).
3. CHECK THE RAFT: check the buoyancy chambers, keep the raft floor dry, stream the sea anchor and close the canopy.
4. LOOKOUT: keep a continuous lookout. Use pyrotechnics only when a rescue unit is sighted.
5. LEADERSHIP: appoint a leader, allocate duties, keep morale up.

WATER RATIONING:

Minimum daily water requirement: 0.5 litres (for survival). Normal requirement: 2-3 litres. A rainwater collection system is set up. Sea water must not be drunk – it accelerates dehydration. A desalination kit is used if one is carried.

FOOD MANAGEMENT:

Emergency rations are shared out equally. If water is short, protein (fish) must not be eaten – digesting protein increases water consumption. Carbohydrates are preferred.

PROTECTION:

Protection from sunstroke: keep the canopy closed, cool down with a wet cloth.
Protection from the cold: TPA (Thermal Protective Aid), remove wet clothing, group warming.
Salt water sores: wash wounds that have been in contact with sea water with fresh water.`,
    keyPoints: [
      "İlk 24 saat su içilmez, sonra günlük 0.5 litre minimum",
      "Deniz suyu kesinlikle içilmez – dehidrasyonu hızlandırır",
      "Su kısıtlıysa balık yenilmez – protein sindirimi su tüketir",
      "Liderlik ve görev dağılımı morali yüksek tutar",
    ],
  },
  "signaling-rescue": {
    title: "İşaret Verme ve Kurtarılma",
    introduction: "Denizde kurtarılabilmek için etkin işaret verme teknikleri ve kurtarma operasyonuna hazırlık hayati önemdedir.",
    content: `MEANS OF SIGNALLING:

1. SART/AIS-SART: an automatic response to a radar signal. The most effective electronic means of signalling.
2. EPIRB: position notification by satellite. When activated, the SAR coordination centre is informed.
3. Rocket parachute flare: visible by day and night at long range (40+ km).
4. Hand flare: shows the rescue unit your position at short range.
5. Smoke signal: orange smoke, for daylight use.
6. Heliograph (mirror): signals to an aircraft/ship by reflecting sunlight.
7. Whistle: an audible signal at short range.
8. Torch: at night, the SOS signal (... --- ...).

PREPARING FOR RESCUE:

As the helicopter approaches: do not use pyrotechnics – the rotor downwash can capsize the raft. Follow the hi-line instructions. Be lifted by the winch in turn. The injured first.

As a ship approaches: the raft is brought to the lee side. Board by ladder or scrambling net. Those who cannot climb unaided are helped.

AFTER RESCUE:

Hypothermic casualties are moved carefully (the risk of rescue collapse). Fluids and food are given slowly. A medical assessment is made.`,
    keyPoints: [
      "SART ve EPIRB en etkili elektronik işaret araçlarıdır",
      "Heliograph güneşli günlerde uçağa işaret vermede çok etkilidir",
      "Helikopter yaklaştığında piroteknik kullanılmaz",
      "Kurtarma sonrası rescue collapse riskine dikkat edilmelidir",
    ],
  },
  "food-water-survival": {
    title: "Yiyecek ve Su Yönetimi",
    introduction: "Denizde hayatta kalma süresinin en kritik belirleyicisi su yönetimidir. İnsan vücudu susuz 3-5 gün, gıdasız 3-4 hafta dayanabilir.",
    content: `WATER MANAGEMENT:

The first 24 hours: no water is issued (the body's reserves are sufficient and there is a risk of nausea and vomiting).
Days 2-4: 0.5 litres a day (the survival ration).
Day 4 onwards: may be increased as circumstances allow (if rainwater is collected).

Rules for conserving water:
- Reduce unnecessary talking
- Limit physical activity
- Stay in the shade in the middle of the day
- Do not drink sea water (it accelerates kidney failure)
- Do not drink urine (the concentration of toxic waste products increases)

COLLECTING RAINWATER:

The raft canopy has a rainwater collection system. Wait a few minutes before collecting the first rain so that the salt layer is washed off. The water collected is stored in containers and plastic bags.

FOOD MANAGEMENT:

Emergency rations are shared out equally. Carbohydrate-rich foods are preferred (they do not increase water consumption). Raw fish can be eaten, but if water is short, digesting protein increases water consumption.

DESALINATING SEA WATER:

Solar still: producing fresh water by evaporation and condensation using solar energy. Desalination kit: removing salt by a chemical or mechanical method.`,
    keyPoints: [
      "İlk 24 saat su verilmez, sonra günlük 0.5 litre minimum",
      "Deniz suyu ve idrar kesinlikle içilmez",
      "Yağmur suyunda ilk yağmur tuz yıkama için atlanır",
      "Su kısıtlıysa protein (balık) tüketimi sınırlandırılır",
    ],
  },

  // =====================================================
  // BÖLÜM 10 - KAPALI ALAN
  // =====================================================
  "enclosed-space-risks": {
    title: "Kapalı Alan Riskleri ve Tehlikeli Atmosfer",
    introduction: "Kapalı alan (enclosed space) kazaları, denizcilik sektöründe en sık ölüm nedenlerinden biridir. Oksijen yetersizliği, zehirli gaz veya patlayıcı atmosfer hayati tehlike oluşturur.",
    content: `DEFINITION OF AN ENCLOSED SPACE:

A closed compartment with limited means of entry and exit, not designed for continuous occupancy, in which a hazardous atmosphere may develop. Examples: ballast tanks, fuel tanks, cargo tanks, cofferdams, void spaces, the chain locker and the paint store.

HAZARDOUS ATMOSPHERES:

Oxygen deficiency: normal is 20.9% O₂. Hazardous: <19.5%. Fatal: <16%. Rusting, decomposition of organic matter and inert gas consume oxygen.

Oxygen enrichment: >23.5% O₂. The risk of combustible materials igniting increases.

Toxic gases:
- H₂S (hydrogen sulphide): produced by decomposition. >10 ppm hazardous, >100 ppm fatal. At high concentrations its smell cannot be detected (olfactory paralysis).
- CO (carbon monoxide): a product of incomplete combustion. >35 ppm hazardous.
- CO₂ (carbon dioxide): fermentation, inert gas residues. >0.5% hazardous.
- SO₂ (sulphur dioxide): a combustion product of sulphur-bearing fuel.

Explosive atmosphere: a flammable gas concentration between the LEL (Lower Explosive Limit) and the UEL (Upper Explosive Limit).

STATISTICS:

According to IMO data, most deaths in enclosed space accidents occur during rescue attempts. An untrained and unequipped attempt to rescue the first casualty produces a second and a third.`,
    keyPoints: [
      "O₂ < %19.5 tehlikeli, < %16 ölümcüldür",
      "H₂S yüksek konsantrasyonda koku algısını yok eder",
      "Kapalı alan ölümlerinin çoğu eğitimsiz kurtarma girişiminde oluşur",
      "Ballast tankları, yakıt tankları, koferdamlar kapalı alan örnekleridir",
    ],
    warnings: [
      "NEVER attempt a rescue untrained and without equipment",
      "Never enter an enclosed space without testing the atmosphere",
    ],
  },
  "entry-permit": {
    title: "Giriş İzin Sistemi (Entry Permit)",
    introduction: "Kapalı alana giriş, sistematik bir izin prosedürü ile kontrol altına alınır. Entry Permit, ISM Code ve şirket SMS prosedürleri gereği zorunludur.",
    content: `THE ENTRY PERMIT PROCEDURE:

1. A risk assessment is made (who is entering, why and when).
2. The space is ventilated (at least 24 hours, or long enough).
3. The atmosphere is tested: O₂, LEL, H₂S and CO measurements.
4. If the test results are "safe", an entry permit is issued.
5. The permit is authorised by a responsible person (the master or chief officer).
6. The persons entering and the standby person are named.
7. A means of communication (VHF or hard-wired) is provided.
8. Rescue equipment (SCBA, harness, tripod) is made ready.

CONTENTS OF THE ENTRY PERMIT:

The name and location of the space
The purpose of entry and the estimated duration
The atmosphere test results (O₂, LEL, H₂S, CO)
The ventilation status
The names of those entering
The name of the standby person
The status of the rescue equipment
The authorisation and time stamp

CANCELLATION:

The space is evacuated immediately if there is any suspicion of a change in the atmosphere, an interruption of ventilation, an emergency alarm, or if the permit expires.`,
    keyPoints: [
      "Atmosfer testi olmadan kapalı alana giriş kesinlikle yasaktır",
      "Gözcü (standby person) her zaman bölme girişinde hazır bulunmalıdır",
      "Entry Permit yetkili kişi (kaptan/chief officer) onayı gerektirir",
      "Havalandırma kesintisinde bölme derhal terk edilir",
    ],
  },
  "atmosphere-testing": {
    title: "Atmosfer Testi ve Ölçüm Cihazları",
    introduction: "Kapalı alana giriş öncesi atmosfer testi yapılması zorunludur. Doğru ölçüm cihazı kullanımı ve kalibrasyon kritik önemdedir.",
    content: `PARAMETERS MEASURED:

1. Oxygen (O₂): safe range: 20.9% (±1%). Minimum safe: 19.5%.
2. Flammable gas (LEL): safe: <1% LEL. Warning: >10% LEL.
3. Hydrogen sulphide (H₂S): safe: <5 ppm. TWA: 10 ppm. STEL: 15 ppm.
4. Carbon monoxide (CO): safe: <25 ppm. TWA: 35 ppm.

MEASURING INSTRUMENTS:

Multi-gas detector (4 gas): measures O₂, LEL, H₂S and CO at the same time. The most commonly used instrument. Personal portable and pump-operated remote sampling types are available.

Pump type: an atmosphere sample is drawn through a long hose without entering the space. It is required for pre-entry testing.

Personal detector: an instrument carried by the person entering, measuring continuously and alarming.

CALIBRATION:

Instruments must be calibrated regularly as recommended by the maker (usually every 6 months or before use). They are verified with calibration gases. Calibration records are kept.

TEST PROCEDURE:

1. Stop the ventilation (to measure the true atmosphere).
2. Take readings at the top, middle and bottom of the space with the pump instrument (H₂S collects high up, heavy gases at the bottom).
3. Record the results on the entry permit.
4. Monitor continuously with a personal detector while inside.`,
    keyPoints: [
      "Test bölmenin üst, orta ve alt seviyelerinden yapılmalıdır",
      "Havalandırma durdurularak gerçek atmosfer ölçülmelidir",
      "Multi-gas dedektör düzenli kalibrasyon gerektirir",
      "Giriş sırasında kişisel dedektör ile sürekli izleme yapılmalıdır",
    ],
  },
  "rescue-from-enclosed": {
    title: "Kapalı Alandan Kurtarma Prosedürü",
    introduction: "Kapalı alanda bilinç kaybı veya kaza durumunda kurtarma operasyonu, önceden planlanmış ve tatbikatla pekiştirilmiş prosedürlere uygun yürütülmelidir.",
    content: `RESCUE PRINCIPLES:

1. RAISE THE ALARM: the standby person raises the alarm at once and informs the bridge.
2. DO NOT GO IN YOURSELF: NEVER attempt a rescue untrained and without SCBA. The risk of becoming the second casualty is very high.
3. A TRAINED TEAM: the rescue team is equipped with SCBA.
4. HARNESS AND LINE: a harness is fitted to the casualty and they are lifted out with a tripod or davit.

RESCUE EQUIPMENT:

SCBA (Self-Contained Breathing Apparatus): a 30-minute breathing set.
EEBD (Emergency Escape Breathing Device): a 10-15 minute escape device. It is inadequate for rescue; it is only for escape.
Tripod and winch: for lifting a person out of a space with vertical access (a tank manhole).
Stretcher: for carrying a casualty.
Communications: a continuous communication link.

DRILLS:

Under SOLAS an enclosed space rescue drill must be held at least once every 2 months. The drill is run with a realistic scenario. Use of SCBA, fitting a harness and use of a tripod are practised.

IN PSC INSPECTIONS:

The enclosed space entry procedure, the condition of the equipment and the drill records are checked in PSC inspections. Shortcomings can be detainable deficiencies.`,
    keyPoints: [
      "SCBA'sız kurtarma girişimi YAPILMAZ – ikinci kurban riski",
      "Kapalı alan kurtarma tatbikatı en az 2 ayda bir yapılmalıdır",
      "EEBD yalnızca kaçış içindir, kurtarma için SCBA kullanılır",
      "Tripod ve harness dikey erişimli bölmelerde zorunludur",
    ],
    warnings: [
      "An untrained rescue attempt is the most frequent cause of death",
      "An EEBD is NEVER adequate for a rescue operation",
    ],
  },

  // =====================================================
  // BÖLÜM 2/3 EKİ - YANGIN VE LSA EKİPMANLARI
  // =====================================================
  "eebd": {
    title: "EEBD – Acil Kaçış Solunum Cihazı",
    introduction: "EEBD (Emergency Escape Breathing Device), duman veya zehirli gazla dolu bir mahalden GÜVENLİ bir bölgeye KAÇIŞ için kullanılan, kısa süreli solunum havası sağlayan taşınabilir bir cihazdır. Yangın söndürme veya kurtarma için KULLANILMAZ.",
    content: `WHAT IS AN EEBD?

An EEBD provides breathing air while a person escapes from a hazardous atmosphere (smoke, hot gases, oxygen deficiency). It normally consists of an air/oxygen supply and a hood covering the whole head, or a face mask. The hood protects the eyes and face from smoke.

THE LEGAL BASIS:

SOLAS Chapter II-2, Regulation 13 (means of escape) and FSS Code Chapter 3 set out the EEBD requirements. EEBDs must provide at least 10 minutes of use.

CARRIAGE REQUIREMENTS:

- EEBDs are carried in the accommodation for emergency escape.
- At least two EEBDs are carried in machinery spaces, close to the normal working stations and on the escape routes.
- The location of every EEBD is marked on the fire control plan.
- A separate training unit is carried; the actual devices are not used in drills so that their service life is not consumed.

PRINCIPLES OF USE:

1. Don the hood and start the air flow.
2. Keeping low, make for a safe area by the shortest escape route.
3. The duration is limited (≈10-15 min); do not waste time.
4. Remove the device once you reach a safe area.

THE DIFFERENCE BETWEEN AN EEBD AND SCBA:

An EEBD is for ESCAPE only; it is NOT USED to ENTER an enclosed or oxygen-deficient space, to fight fire or for a rescue operation. SCBA (self-contained breathing apparatus) is required for those tasks. The duration and protection of an EEBD are inadequate for them.

MAINTENANCE AND CHECKS:

The EEBD pressure gauge (where fitted) is checked regularly, the seal is inspected and the expiry/service date is monitored. If the seal is broken or the pressure is low the device is marked "out of service" and replaced.`,
    keyPoints: [
      "EEBD yalnızca KAÇIŞ içindir – yangın söndürme/kurtarma için kullanılmaz",
      "En az 10 dakika solunum havası sağlar (FSS Code Bölüm 3)",
      "Makine mahallerinde en az 2 adet, kaçış yollarında bulunur",
      "Eğitim için ayrı training unit kullanılır; gerçek cihaz tatbikatta tüketilmez",
    ],
    warnings: [
      "NEVER enter an oxygen-deficient or enclosed space with an EEBD – that is a job for SCBA",
      "An EEBD with a broken seal or low pressure must be replaced immediately",
    ],
  },
  "scba": {
    title: "SCBA – Bağımsız Solunum Cihazı",
    introduction: "SCBA (Self-Contained Breathing Apparatus), kullanıcının ortam havasından bağımsız olarak basınçlı hava soluduğu, yangın söndürme ve kapalı/tehlikeli mahalle giriş için kullanılan tam korumalı solunum cihazıdır.",
    content: `SCBA COMPONENTS:

- A high-pressure air cylinder (usually 6-9 litres at 200-300 bar).
- A pressure-reducing regulator and a demand valve.
- A full face mask.
- A carrying system (harness and back plate).
- A pressure gauge and a low-pressure warning whistle.

CAPACITY AND DURATION:

Under FSS Code Chapter 3 an SCBA must have a capacity of at least 1200 litres of free air or 30 minutes of use. The actual duration varies with the workload, breathing rate and the individual; under heavy exertion it is significantly shorter.

PART OF THE FIREMAN'S OUTFIT:

SCBA is a mandatory part of the fireman's outfit. Sufficient spare charges/cylinders are carried for each outfit (at least 2 spare charged cylinders on board, or a charging compressor).

PRINCIPLES OF USE:

1. Check the cylinder pressure and the mask seal before entry.
2. Know the pressure at which the low-pressure whistle sounds (the time left to return).
3. The buddy system (working in pairs) is mandatory; the team is monitored from outside.
4. Plan to turn back before the air is half used (the air used going in = the air needed to come out).
5. Recharge the cylinder after use and clean/disinfect the mask and regulator.

MAINTENANCE:

Cylinders are subject to periodic hydrostatic testing (usually every 5 years). The mask, regulator and whistle are checked before and after every use. Records are kept.`,
    keyPoints: [
      "SCBA en az 1200 L hava / 30 dk kapasiteli olmalıdır (FSS Code Bölüm 3)",
      "İtfaiyeci teçhizatının zorunlu parçasıdır; yedek dolum bulundurulur",
      "Buddy system ve düşük basınç düdüğü güvenliğin temelidir",
      "Tüpler periyodik hidrostatik teste tabidir",
    ],
    warnings: [
      "Start back before the air is half used – you need as much air to come out as to go in",
      "Never enter a hazardous atmosphere without carrying out a mask seal check",
    ],
  },
  "firemans-outfit": {
    title: "İtfaiyeci Teçhizatı (Fireman's Outfit)",
    introduction: "İtfaiyeci teçhizatı, yangına müdahale eden personeli ısı, alev ve dumandan koruyan kişisel koruyucu giysi ile solunum cihazından oluşan zorunlu bir setdir (SOLAS II-2 / FSS Code Bölüm 3).",
    content: `COMPONENTS OF THE OUTFIT:

A) Personal equipment:
- Protective clothing resistant to heat and smoke (it limits heat conduction from the surface and has a waterproof outer layer).
- Boots and gloves (electrically insulating, heat resistant).
- A helmet protecting the head, neck and sides.
- An electric safety lamp with a burning period of at least 3 hours.
- A fireman's axe with an electrically insulated handle.

B) Breathing apparatus:
- SCBA (self-contained compressed air breathing apparatus).

C) Lifeline:
- Fire resistant, at least 30 m long, capable of being attached to the outfit by a hook; used for communication with the team and for withdrawal.

NUMBERS TO BE CARRIED:

SOLAS II-2 Regulation 10.10 sets the minimum number of outfits by ship type and size. Cargo ships generally carry at least 2 fireman's outfits; on passenger ships the number increases with the spaces and length. Additional outfits may be required on tankers.

STOWAGE AND ACCESS:

The outfits are stowed apart from each other in readily accessible, marked positions; they are distributed so that if one becomes inaccessible in a fire the other can still be used. Their positions are shown on the fire control plan.

MAINTENANCE AND CHECKS:

The integrity of the clothing, gloves, boots and helmet; the charge and duration of the lamp; and the SCBA cylinder pressure and mask condition are checked regularly and recorded.`,
    keyPoints: [
      "Set = koruyucu giysi + çizme/eldiven + kask + emniyet lambası (≥3 saat) + balta + SCBA + lifeline",
      "SOLAS II-2/10.10 asgari sayıyı belirler; yük gemisinde genellikle ≥2",
      "Teçhizatlar birbirinden uzak, işaretli konumlarda saklanır",
      "Lifeline ateşe dayanıklı ve ekiple geri çekme için kullanılır",
    ],
  },
  "fire-fighting-equipment": {
    title: "Yangın Devresi, Hidrant, Hortum ve Nozullar",
    introduction: "Gemideki sabit yangın su devresi (fire main); pompalar, ana boru hattı, hidrantlar, hortumlar ve nozullar ile uluslararası sahil bağlantısından oluşur ve yangına su ile müdahalenin temelini sağlar (SOLAS II-2 Kural 10).",
    content: `FIRE PUMPS:

- Main fire pumps: the number and capacity are set by ship type; they provide the required flow and hydrant pressure.
- Emergency fire pump: located outside the machinery space, in a separate compartment with an independent power source, so that water can be supplied even if the machinery space is out of action.

THE FIRE MAIN:

The pressurised water line running along the decks, supplied by the pumps. Isolating valves allow a damaged section to be cut out while the main keeps working.

HYDRANTS:

Hydrants are sited so that at least two jets of water can reach any part of the ship (one from a single length of hose). The required minimum pressure must be available at every hydrant.

HOSES AND NOZZLES:

- Fire hoses are kept ready for connection beside every hydrant. Their lengths are standardised for the space.
- Nozzles are dual-purpose: jet and spray/fog. The standard nozzle sizes are about 12 mm, 16 mm and 19 mm. They have a shut-off facility.

THE INTERNATIONAL SHORE CONNECTION:

A standard-dimension connecting flange that allows water to be supplied to the ship's fire main from ashore or from another ship. At least one is carried on every ship. The standard dimensions (outside diameter 178 mm, bolt circle diameter 132 mm, etc.) are the same worldwide, so that port/fire brigade equipment can be connected to the ship.

CHECKS AND MAINTENANCE:

The pumps, isolating valves, hydrant valves, hose gaskets and nozzles are checked weekly/monthly. Leaks, cracks or corrosion are reported as defects.`,
    keyPoints: [
      "Acil yangın pompası makine dairesi dışında, bağımsız güç kaynaklıdır",
      "Her noktaya en az iki su jeti ulaşmalı (SOLAS II-2/10)",
      "Nozullar çift amaçlı (jet + sprey) ve kapatma özelliklidir",
      "Uluslararası sahil bağlantısı standart ölçülüdür; gemide en az 1 adet",
    ],
  },
  "structural-fire-protection": {
    title: "Yapısal Yangın Koruması (A/B/C Sınıfı Bölmeler)",
    introduction: "Yapısal yangın koruması, geminin perde ve güvertelerinin yangının yayılmasını geciktirecek şekilde sınıflandırılması ve yalıtılması prensibine dayanır (SOLAS II-2). Amaç, yangını kaynağında sınırlamak ve kaçış yollarını korumaktır.",
    content: `DIVISION CLASSES:

CLASS A divisions:
- Constructed of steel or equivalent material, suitably stiffened.
- They prevent the passage of smoke and flame for 60 minutes of the standard fire test (integrity).
- They are subdivided by level of insulation: A-60, A-30, A-15, A-0. The number is the number of MINUTES for which the division delays the average temperature on the unexposed side rising by 140°C (or by 180°C at any one point) from the start of the test. A-0 has no insulation requirement (integrity only).

CLASS B divisions:
- Constructed of non-combustible materials; they prevent the passage of flame for 30 minutes.
- Subdivided by insulation into B-15 and B-0.

CLASS C divisions:
- Constructed of non-combustible materials; there is no requirement for a period of heat or flame resistance.

MAIN VERTICAL ZONES:

The ship is divided into main vertical fire zones by Class A divisions (there are length and area limits on passenger ships). A fire in one zone therefore cannot spread easily to the adjacent zones.

FIRE DOORS AND DAMPERS:

- Fire doors: at openings in Class A/B divisions, of the self-closing type and capable of being closed remotely from the bridge.
- Fire dampers: in ventilation ducts where they pass through a fire boundary, to prevent fire spreading through the duct.

PROTECTING THE ESCAPE ROUTES:

Stairway enclosures and escape routes are protected by fire divisions to provide safe evacuation from smoke and flame.`,
    keyPoints: [
      "A sınıfı: çelik, 60 dk bütünlük; A-60/A-30/A-15/A-0 ısı geçişi süresine göre",
      "B sınıfı: 30 dk, B-15/B-0; C sınıfı: yanmaz, süre şartı yok",
      "Ana dikey bölgeler A sınıfı bölmelerle ayrılır",
      "Yangın kapıları kendiliğinden kapanır, damperler kanal yayılımını önler",
    ],
  },
  "fire-control-plan": {
    title: "Yangın Kontrol Planı (Fire Control Plan)",
    introduction: "Yangın kontrol planı, geminin yangın güvenliği düzeneğini gösteren, her güverte için kalıcı olarak sergilenen bir şemadır. Acil durumda mürettebata ve karadan gelen itfaiyecilere yol gösterir (SOLAS II-2 Kural 15).",
    content: `WHAT THE PLAN SHOWS:

- Control stations.
- The fire sections separated by Class A and B divisions.
- Fire detection and alarm systems.
- Sprinkler and fixed extinguishing systems (CO₂, foam, etc.).
- Portable extinguishers, hydrants, hoses and the international shore connection.
- Escape routes, stairway enclosures and muster stations.
- Ventilation systems, fan controls and the positions of the fire dampers.
- The positions of the EEBDs, SCBA and fireman's outfits.

SYMBOLS:

The plan is drawn using the graphical symbols standardised by the IMO (IMO Resolution A.952(23)), so that firefighters of any nationality can read it.

A COPY FOR THE SHORE FIRE BRIGADE:

Under SOLAS II-2/15.2.4 a copy of the plan is kept outside the deckhouse in a prominently marked weathertight enclosure. A shore fire team can therefore reach the plan without boarding the ship.

KEEPING IT UP TO DATE:

The plan must be kept up to date as changes are made on board (equipment added or removed). An out-of-date or incorrect plan is a finding in an inspection and is misleading in an emergency.

USE:

During familiarisation, new crew members are shown the fire stations, escape routes and equipment positions on the plan.`,
    keyPoints: [
      "Yangın kontrol planı her güvertede kalıcı sergilenir (SOLAS II-2/15)",
      "IMO A.952(23) standart sembolleri kullanılır",
      "Kara itfaiyesi için weathertight kutuda dış kopya bulundurulur (15.2.4)",
      "Değişikliklerle güncel tutulmalı; familiarization'da kullanılır",
    ],
  },
  "immersion-suit-tpa": {
    title: "Dalma Elbisesi ve Termal Koruyucu (TPA)",
    introduction: "Dalma elbisesi (immersion suit) ve termal koruyucu (Thermal Protective Aid – TPA), soğuk suda hipotermiyi geciktirerek hayatta kalma süresini uzatan kişisel ısı koruma araçlarıdır (LSA Code Bölüm 2).",
    content: `IMMERSION SUIT:

A waterproof, thermally insulated one-piece suit covering the whole body (including hands and feet). It preserves body heat in cold water.

Performance requirements (LSA Code 2.3):
- It must be capable of being donned unassisted within 2 minutes.
- Once donned, it must be possible to jump into the water from a height of 5 metres without water entering.
- It must be possible to swim in it and to board a liferaft.
- Insulated type: in water of 0-2°C it must prevent the body core temperature falling by more than 2°C over 1 hour.
- An uninsulated (waterproof only) type may also require a suitable lifejacket; an insulated type may provide sufficient buoyancy on its own.

Carriage: SOLAS generally requires an immersion suit for every person on board, plus additional suits for watch/remote working stations.

THERMAL PROTECTIVE AID (TPA):

A bag or suit made of waterproof material with low thermal conductivity, covering the whole body except the head. In a liferaft or lifeboat it reduces the heat loss of a dry survivor by convection and evaporation.

Characteristics (LSA Code 2.5):
- It must be usable in air temperatures from -30°C to +20°C.
- A defined number are carried in the liferaft/lifeboat equipment list.
- It does not replace an immersion suit; a TPA is primarily for a survivor who is out of the water.

THE DIFFERENCE:

An immersion suit protects IN the water; a TPA reduces heat loss for a person who is out of the water (in a raft/boat).`,
    keyPoints: [
      "Dalma elbisesi 2 dakikada yardımsız giyilebilmeli (LSA Code 2.3)",
      "Yalıtımlı tip: 0-2°C suda 1 saatte iç sıcaklık düşüşü <2°C",
      "TPA su geçirmez örtüdür; sal/filikadaki kuru kazazedede ısı kaybını azaltır",
      "TPA dalma elbisesinin yerine geçmez",
    ],
    warnings: [
      "A TPA alone is not enough for a wet survivor; they must first be dried/the water drained",
    ],
  },
  "mes": {
    title: "Deniz Tahliye Sistemi (MES)",
    introduction: "MES (Marine Evacuation System), çok sayıda kişinin gemiden can sallarına hızlı ve güvenli biçimde inmesini sağlayan, kaydırak (slide) veya tahliye kanalı (chute) ile platform/can sallarından oluşan bir tahliye sistemidir (LSA Code Bölüm 6). Özellikle yüksek fribordlu yolcu gemilerinde kullanılır.",
    content: `WHAT IS AN MES?

On ships with a high freeboard it is difficult for people to get down directly into liferafts. An MES sets up a slide or an enclosed chute between the ship and the sea; people descend by this route to a platform, or directly into large-capacity liferafts.

TYPES:

- Slide system: people descend to the platform/raft down an inflatable slide.
- Chute system: a controlled descent inside a vertical, enclosed flexible chute; preferred where the freeboard is high.

PERFORMANCE:

LSA Code 6.2 requires the MES to evacuate the required number of persons within a set time, to work in a seaway, and sets inflation/deployment times. The system must be capable of being deployed quickly from the bridge/deck.

HOW IT IS USED:

1. Passengers are directed at the muster station.
2. The MES is deployed; the platform/rafts inflate and take up position.
3. People descend by slide/chute to the platform/raft.
4. Once full, the rafts cast off from the ship.

MAINTENANCE:

The MES is subject to periodic servicing and testing (annual checks, including a 5-yearly load test). Servicing is carried out by approved stations; records are kept.

THE ADVANTAGE:

It evacuates a large number of people in a short time without the need to launch lifeboats; it is critically important on large passenger ships.`,
    keyPoints: [
      "MES = kaydırak/kanal + platform/can salı; yüksek fribordlu yolcu gemilerinde",
      "Slide ve chute tipleri vardır; chute yüksek bordada tercih edilir",
      "LSA Code Bölüm 6 tahliye süresi ve performansı şart koşar",
      "Yıllık servis ve 5 yıllık load test'e tabidir",
    ],
  },
  "line-throwing": {
    title: "Halat Atma Aparatı (Line-Throwing Appliance)",
    introduction: "Halat atma aparatı, tehlikedeki bir gemiye, kişiye veya kıyıya ince bir halat (ip) ulaştırarak ardından daha kalın halat/çekme bağlantısı kurulmasını sağlayan bir kurtarma aracıdır (LSA Code Bölüm 7).",
    content: `PURPOSE:

It gets a first light line to the target, which is then used to haul across a heavier line or a towing/transfer line. It is used for ship-to-ship or ship-to-shore connection, towing and rescue operations.

REQUIREMENTS (LSA Code 7.1):

- Throwing range: it must be capable of throwing a line at least 230 metres with reasonable accuracy in calm weather.
- Equipment: at least 4 projectiles/rockets and 4 lines are carried.
- The lines must have adequate breaking strength and be protected from damp.
- It is stored in a watertight container; the instructions for use must be on the pack and legible.

TYPES:

- Rocket-type pyrotechnic appliances are common.
- Some types use a pistol-like launcher.

SAFETY:

- Because it contains pyrotechnics, only trained personnel may use it.
- There must be no person or flammable material in the line of fire.
- The expiry date is monitored; expired units are disposed of properly.

MAINTENANCE:

The integrity of the watertight packaging, the expiry date and the number carried are verified periodically (in the LSA inventory check).`,
    keyPoints: [
      "Sakin havada en az 230 m halat atabilmeli (LSA Code 7.1)",
      "En az 4 roket/projektil ve 4 halat bulundurulur",
      "Önce ince halat, sonra kalın halat/çekme hattı çekilir",
      "Piroteknik içerir; yalnız eğitimli personel kullanır",
    ],
    warnings: [
      "There must be no person or flammable material in the line of fire",
      "Expired units must be disposed of safely",
    ],
  },

  // =====================================================
  // BÖLÜM 11 - İŞ SAĞLIĞI VE GÜVENLİĞİ
  // =====================================================
  "ppe": {
    title: "Kişisel Koruyucu Donanım (KKD/PPE)",
    introduction: "Kişisel koruyucu donanım (PPE), iş kazalarına karşı son savunma hattıdır. Tehlike kaynağında giderilemediğinde kişiyi korur; ancak hiçbir zaman mühendislik/yönetimsel önlemlerin yerine geçmez.",
    content: `PPE CATEGORIES:

- Head protection: helmet – falling objects, impact.
- Foot protection: steel toe-capped safety shoes/boots – crushing, slipping, puncture.
- Hand protection: gloves – cuts, heat, chemicals, vibration (the type suited to the job).
- Eye/face protection: goggles, face shield – sparks, swarf, chemical splash.
- Hearing protection: ear plugs/defenders – in noise above 85 dBA (engine room).
- Respiratory protection: dust mask, half/full face mask, SCBA (according to the hazard).
- Body protection: overalls/working clothes, flame-retardant clothing, chemical suit.
- Work at height: full body harness and lanyard.
- Visibility: high-visibility vest (deck/port operations).
- Work over water: lifejacket / work vest.

ITS PLACE IN THE HIERARCHY OF CONTROL:

The order of risk control: 1) eliminate the hazard, 2) substitute, 3) engineering controls, 4) administrative controls, 5) PPE. PPE comes LAST; it is not regarded as sufficient on its own.

THE LEGAL/SYSTEM BASIS:

The safety management system (SMS) under the ISM Code and MLC 2006 require suitable PPE to be provided, together with training in its use. PPE is provided free of charge.

CORRECT USE:

- The type is chosen to suit the job and the hazard (e.g. a welding mask plus flame-retardant clothing for welding).
- Correct size/fit; damaged PPE is not used but replaced.
- Maintenance, cleaning and storage follow the instructions.
- Its use is reinforced through toolbox talks and familiarisation.`,
    keyPoints: [
      "PPE kontrol hiyerarşisinde EN SON önlemdir; tek başına yeterli değildir",
      "Göreve uygun tip seçilir; hasarlı PPE kullanılmaz",
      "ISM/SMS ve MLC 2006 uygun PPE sağlanmasını şart koşar",
      ">85 dBA ortamda işitme koruması, yüksekte çalışmada harness zorunludur",
    ],
  },
  "permit-to-work": {
    title: "Çalışma İzni Sistemi ve Sıcak İş İzni",
    introduction: "Çalışma izni (permit-to-work) sistemi, yüksek riskli işlerin ancak tehlikeler değerlendirilip kontrol altına alındıktan sonra, yazılı izinle ve sorumluların onayıyla yapılmasını güvence altına alan resmi bir kontrol mekanizmasıdır.",
    content: `THE MAIN WORK REQUIRING A PERMIT:

- Hot work: welding, grinding, cutting – work producing sparks/flame.
- Enclosed space/tank entry.
- Working aloft and overside.
- Electrical work and energy isolation (Lock-Out/Tag-Out – LOTO).
- Work on refrigerant/chemical lines and on pressurised systems.

THE HOT WORK PERMIT:

- A permit is required for all hot work outside a designated workshop.
- On tankers and in spaces with a risk of a flammable atmosphere, gas measurement (gas-free/gas testing) is mandatory; a gas-free certificate is obtained.
- Flammable materials in the vicinity are removed, and a fire watch and an extinguisher are on hand.
- The area is checked on completion; a waiting period is applied for smouldering.

THE PERMIT PROCESS:

1. The person doing the work applies for a permit.
2. The hazards and controls (risk assessment) are identified.
3. A responsible person (usually the relevant officer with the master's approval) verifies the controls and issues the permit.
4. The permit is limited in time and scope; it is cancelled if the conditions change.
5. When the work is finished the permit is closed out and recorded.

ENERGY ISOLATION (LOTO):

Before maintenance the machinery/electrical supply is isolated, locked and tagged so that it cannot be started inadvertently. When the work is finished only the person who applied the isolation removes the lock.

THE SHIP/SHORE INTERFACE:

The permit system is operated in line with the ISM/SMS procedures and PSC inspections; the records are audited.`,
    keyPoints: [
      "Permit-to-work yüksek riskli işleri yazılı izin ve onayla kontrol eder",
      "Atölye dışı sıcak iş için izin + gaz testi (tankerde gas-free) zorunludur",
      "Fire watch ve söndürücü hazır; iş sonrası gizli tutuşma için bekleme",
      "Enerji izolasyonu LOTO ile yapılır; kilidi yalnız uygulayan açar",
    ],
    warnings: [
      "Hot work or enclosed space entry without a permit is a serious cause of accidents and deaths",
      "If conditions change the permit must be cancelled immediately",
    ],
  },
  "risk-assessment": {
    title: "Risk Değerlendirmesi ve JSA",
    introduction: "Risk değerlendirmesi, bir işteki tehlikeleri önceden belirleyip olasılık ve şiddetine göre değerlendirerek uygun kontrol önlemlerini almak için yapılan sistematik bir süreçtir. ISM Code gemilerde risk değerlendirmesini zorunlu kılar.",
    content: `BASIC CONCEPTS:

- Hazard: a source or situation with the potential to cause harm (e.g. a rotating part, high pressure, a slippery deck).
- Risk: the combination of the likelihood of harm occurring and its severity (Risk = Likelihood × Severity).

RISK ASSESSMENT STEPS:

1. Identify the hazards.
2. Identify who or what may be harmed.
3. Evaluate the risk (likelihood × severity; a risk matrix is used).
4. Decide the control measures (the hierarchy of control).
5. Record the findings and implement them.
6. Review and update (when conditions change).

THE HIERARCHY OF CONTROL:

1) Eliminate the hazard → 2) Substitute → 3) Engineering controls (guarding, ventilation) → 4) Administrative controls (procedure, training, permit) → 5) PPE. The measures higher up the list are preferred.

JSA / JHA (Job Safety/Hazard Analysis):

A practical method that breaks a particular job into steps and examines the hazard and the control at each step. It is usually completed by the team concerned immediately before the work.

TOOLBOX TALK:

A short safety briefing held with the team before starting work; the results of the JSA, the permits and any special hazards are shared.

THE ISM LINK:

The ISM Code requires the company and the ship to assess the risks of their activities and take precautions. Risk assessment records are part of the SMS and are audited.`,
    keyPoints: [
      "Risk = Olasılık × Şiddet; risk matrisi ile değerlendirilir",
      "Kontrol hiyerarşisi: yok et > ikame > mühendislik > yönetimsel > PPE",
      "JSA işi adımlara ayırır; toolbox talk işten önce brifing verir",
      "ISM Code risk değerlendirmesini zorunlu kılar; kayıtlar SMS'in parçasıdır",
    ],
  },
  "damage-control": {
    title: "Hasar Kontrolü ve Su Geçirmez Bütünlük",
    introduction: "Hasar kontrolü, çarpışma, karaya oturma veya su alma sonrası geminin batmadan ve devrilmeden kalmasını sağlamak için su geçirmez bütünlüğün korunması ve su girişinin sınırlandırılması faaliyetlerini kapsar (SOLAS Bölüm II-1).",
    content: `WATERTIGHT INTEGRITY:

The ship is divided into compartments by watertight bulkheads. Even if one compartment floods the others stay dry and the ship stays afloat (reserve buoyancy).

- Collision bulkhead: the first watertight bulkhead forward; it limits the ingress of water in a head-on collision.
- Watertight doors: they can be closed remotely from the bridge; the position indicator is on the bridge. They must be kept closed at sea.

FLOTATION SAFETY CONCEPTS:

- Reserve buoyancy: the watertight volume above the waterline; it delays foundering when water is taken in.
- Subdivision and damage stability: the ship is designed to stay afloat with a defined number of compartments flooded.
- Cross-flooding: an arrangement for reducing the list when water is taken in on one side, by admitting water in a controlled way to the compartment on the other side.

THE DAMAGE CONTROL PLAN AND BOOKLET:

Under SOLAS II-1 Regulation 19 a damage control plan and booklet are carried on board. They show the watertight boundaries, the openings, the closing arrangements and the bilge/ballast arrangements.

RESPONSE ACTIONS:

1. Locate and limit the ingress of water (closing, shoring, a temporary plug/patch).
2. Close the watertight doors and openings.
3. Pump out and balance the water with the bilge and ballast pumps.
4. Monitor stability and trim; inform the competent authority/the company if necessary.

THE BILGE SYSTEM:

The bilge system drains water that collects in the compartments; the alarms and pumps are tested regularly.`,
    keyPoints: [
      "Su geçirmez bölmelendirme + rezerv sephiye batmayı önler (SOLAS II-1)",
      "Çatışma perdesi baş çarpışmada su girişini sınırlar",
      "Su geçirmez kapılar denizde kapalı tutulur, köprüden izlenir",
      "Hasar kontrol planı/el kitabı (SOLAS II-1/19) gemide bulundurulur",
    ],
    warnings: [
      "A watertight door left open leads to progressive flooding and rapid foundering",
    ],
  },
  "mooring-safety-snapback": {
    title: "Bağlama Güvenliği ve Snap-Back Bölgeleri",
    introduction: "Bağlama (mooring) operasyonları, gemide en sık ciddi yaralanma yaşanan işlerden biridir. Gergin halatın kopması (snap-back) ve yüksek gerilim altındaki ekipman ölümcül kazalara yol açabilir. OCIMF MEG4 bu alanda referans kılavuzdur.",
    content: `WHAT IS SNAP-BACK?

When a mooring line under tension parts, the stored elastic energy is released and the ends of the line whip back (snap-back). This whipping can be fatal. Synthetic ropes store a great deal of energy; wire ropes stretch less but are still dangerous when they part.

SNAP-BACK ZONES:

These are the dangerous areas into which a parted line could whip, determined by the geometry of the line (rollers/fairleads, the line of the capstan/winch). No one stands in these areas. Note: the modern approach (MEG4) treats the WHOLE deck as a potential danger area; the old painted "snap-back zone" markings can be misleading, so general awareness is what matters.

SAFETY PRINCIPLES:

- Never stand in the bight of a line under tension or in line with it.
- Keep hands and feet away from a line under load; watch for gloves being drawn in.
- The winch brake must be correctly set; it must be tested so that it renders at the designed slip point.
- The condition of the line and the tail is checked; worn/fatigued line is replaced.
- Appropriate PPE: helmet, safety shoes, gloves, high-visibility vest.

COMMUNICATION AND ORGANISATION:

- Clear communication (radio) between the forward/aft stations and the bridge.
- A toolbox talk before the operation: roles, danger areas, escape routes.
- Sufficient and rested personnel; the operation is never rushed.

EQUIPMENT:

Bitts, fairleads, rollers, winches, stoppers and rope tails are regularly checked and maintained; certified equipment is used.`,
    keyPoints: [
      "Snap-back: kopan gergin halatın ölümcül geri savrulmasıdır",
      "MEG4 yaklaşımında tüm güverte tehlike alanı sayılır – bight içinde durulmaz",
      "Winch freni doğru ayarlanır ve düzenli test edilir",
      "Net iletişim, toolbox talk ve uygun PPE esastır",
    ],
    warnings: [
      "Standing in line with, or in the bight of, a line under tension is fatal",
      "Worn/fatigued line and an incorrectly set brake increase the risk of parting",
    ],
  },
};

export default function SafetyTopicsPage() {
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
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="relative z-40 bg-background/95 border-b border-border">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-600 text-white shadow-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Denizde Güvenlik</h1>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-4 max-w-4xl mx-auto pb-20">
            <Accordion type="single" collapsible className="space-y-2">
              {safetyTopics.map((topic) => {
                return (
                  <AccordionItem
                    key={topic.id}
                    value={topic.id}
                    className="border border-border/40 rounded-xl overflow-hidden bg-card/80"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left">
                        <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white font-bold">
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
                                ? "hover:bg-red-500/5 cursor-pointer"
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

            <section className="rounded-2xl border border-border/40 bg-card/80 p-6 mt-6">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-semibold text-foreground">Quick Access</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { title: "Güvenlik Hesaplamaları", href: "/safety" },
                  { title: "Güvenlik Formülleri", href: "/safety/formulas" },
                  { title: "Tüm Dersler", href: "/lessons" },
                ].map((resource, index) => (
                  <Link
                    key={index}
                    to={resource.href}
                    className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-[background-color,color,border-color,box-shadow,opacity,transform,width] hover:border-red-500/40 hover:bg-background"
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

      <AnimatePresence>
        {selectedTopic && currentContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
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

            <ScrollArea className="h-[calc(100vh-60px)]">
              <div className="p-4 space-y-6 pb-20 max-w-4xl mx-auto">
                <div className="bg-red-500/10 rounded-xl p-4 border-l-4 border-red-500">
                  <p className="text-foreground font-medium leading-relaxed">
                    {currentContent.introduction}
                  </p>
                </div>

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

                <StructuredLessonText text={currentContent.content} />

                {currentContent.bulletPoints && currentContent.bulletPoints.length > 0 && (
                  <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                    <h3 className="font-semibold text-foreground mb-3">Önemli Noktalar</h3>
                    {currentContent.bulletPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
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
                    <div className="bg-background rounded-lg p-3 font-mono text-lg text-center text-red-600 dark:text-red-400 mb-2">
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
                  <div className="bg-red-500/5 rounded-xl p-4">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-red-500" />
                      Anahtar Bilgiler
                    </h3>
                    <div className="space-y-2">
                      {currentContent.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-red-600 dark:text-red-400 font-bold">{index + 1}.</span>
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
                      Warnings
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
