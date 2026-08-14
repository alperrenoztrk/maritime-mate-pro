import type { CSSProperties } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  FileText,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  X,
  Leaf,
  Droplets,
  Wind,
  Trash2,
  Ship,
  Waves,
  Shield,
  Gauge,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useArticleBackGuard } from "@/hooks/useArticleBackGuard";
import { StructuredLessonText } from "@/components/lessons/StructuredLessonText";

interface EnvironmentSubTopic {
  id: string;
  title: string;
  hasContent: boolean;
}

interface EnvironmentMainTopic {
  id: string;
  number: number;
  title: string;
  icon: React.ElementType;
  subtopics: EnvironmentSubTopic[];
}

const environmentTopics: EnvironmentMainTopic[] = [
  {
    id: "marpol-general",
    number: 1,
    title: "MARPOL Sözleşmesi Genel",
    icon: Shield,
    subtopics: [
      { id: "marpol-history", title: "MARPOL tarihçesi ve gelişimi", hasContent: true },
      { id: "marpol-structure", title: "MARPOL yapısı ve ekleri", hasContent: true },
      { id: "marpol-certificates", title: "MARPOL sertifikaları", hasContent: true },
      { id: "marpol-surveys", title: "Sörvey ve denetimler", hasContent: true },
      { id: "port-reception", title: "Liman atık kabul tesisleri (Port Reception Facilities)", hasContent: true },
    ],
  },
  {
    id: "annex-i",
    number: 2,
    title: "Ek I – Petrol Kirliliği",
    icon: Droplets,
    subtopics: [
      { id: "annex1-overview", title: "Ek I genel yapısı ve kapsamı", hasContent: true },
      { id: "oily-water-separator", title: "Yağlı su ayırıcı (OWS) ve 15 ppm kuralı", hasContent: true },
      { id: "oil-record-book", title: "Yağ Kayıt Defteri (ORB) Part I ve II", hasContent: true },
      { id: "special-areas-annex1", title: "Özel alanlar ve deşarj kuralları", hasContent: true },
      { id: "sopep", title: "SOPEP (Shipboard Oil Pollution Emergency Plan)", hasContent: true },
      { id: "crude-oil-washing", title: "Ham petrol yıkama (COW) sistemi", hasContent: true },
    ],
  },
  {
    id: "annex-ii",
    number: 3,
    title: "Ek II – Zehirli Sıvı Maddeler",
    icon: AlertTriangle,
    subtopics: [
      { id: "annex2-categories", title: "NLS kategorileri (X, Y, Z, OS)", hasContent: true },
      { id: "annex2-discharge", title: "Deşarj standartları ve prewash", hasContent: true },
      { id: "annex2-ppap", title: "P&A Manual ve Cargo Record Book", hasContent: true },
    ],
  },
  {
    id: "annex-iii",
    number: 4,
    title: "Ek III – Paketlenmiş Zararlı Maddeler",
    icon: Trash2,
    subtopics: [
      { id: "annex3-imdg", title: "IMDG Code ve sınıflandırma", hasContent: true },
      { id: "annex3-marking", title: "Etiketleme, işaretleme ve istifleme", hasContent: true },
      { id: "annex3-documentation", title: "Tehlikeli madde beyannamesi", hasContent: true },
    ],
  },
  {
    id: "annex-iv",
    number: 5,
    title: "Ek IV – Pis Su (Sewage)",
    icon: Waves,
    subtopics: [
      { id: "annex4-overview", title: "Ek IV gereksinimleri ve uygulama", hasContent: true },
      { id: "sewage-treatment", title: "Pis su arıtma tesisi ve standartları", hasContent: true },
      { id: "sewage-discharge", title: "Deşarj kuralları ve mesafe sınırları", hasContent: true },
    ],
  },
  {
    id: "annex-v",
    number: 6,
    title: "Ek V – Çöp Yönetimi",
    icon: Trash2,
    subtopics: [
      { id: "annex5-categories", title: "Çöp kategorileri ve deşarj kuralları", hasContent: true },
      { id: "garbage-management", title: "Çöp yönetim planı ve kayıt defteri", hasContent: true },
      { id: "annex5-special-areas", title: "Özel alanlar ve Antarktika kuralları", hasContent: true },
    ],
  },
  {
    id: "annex-vi",
    number: 7,
    title: "Ek VI – Hava Kirliliği",
    icon: Wind,
    subtopics: [
      { id: "sox-regulations", title: "SOx sınırları ve yakıt kükürt oranları", hasContent: true },
      { id: "nox-tiers", title: "NOx Tier I, II, III standartları", hasContent: true },
      { id: "eca-seca", title: "ECA/SECA bölgeleri ve gereksinimleri", hasContent: true },
      { id: "ods-regulations", title: "Ozon tabakasını incelten maddeler", hasContent: true },
      { id: "voc-regulations", title: "VOC (Uçucu Organik Bileşikler) kontrolü", hasContent: true },
      { id: "scrubber-egcs", title: "Egzoz gazı temizleme sistemleri (Scrubber/EGCS)", hasContent: true },
      { id: "incinerator", title: "Gemide atık yakma (incinerator) ve Ek VI", hasContent: true },
    ],
  },
  {
    id: "energy-efficiency",
    number: 8,
    title: "Enerji Verimliliği ve Karbon",
    icon: Gauge,
    subtopics: [
      { id: "eedi-eexi", title: "EEDI ve EEXI hesaplama ve gereksinimleri", hasContent: true },
      { id: "cii-rating", title: "CII derecelendirmesi (A-E) ve hesaplama", hasContent: true },
      { id: "seemp", title: "SEEMP (Gemi Enerji Verimliliği Yönetim Planı)", hasContent: true },
      { id: "eu-ets", title: "EU ETS ve FuelEU Maritime", hasContent: true },
      { id: "alternative-fuels", title: "Alternatif yakıtlar (LNG, metanol, amonyak)", hasContent: true },
      { id: "imo-ghg-strategy", title: "IMO Sera Gazı (GHG) Stratejisi ve net-zero hedefleri", hasContent: true },
    ],
  },
  {
    id: "ballast-water",
    number: 9,
    title: "Balast Suyu Yönetimi",
    icon: Ship,
    subtopics: [
      { id: "bwm-convention", title: "BWM Sözleşmesi ve tarihçesi", hasContent: true },
      { id: "ballast-exchange", title: "Balast suyu değişim yöntemleri (D-1)", hasContent: true },
      { id: "ballast-treatment", title: "Balast suyu arıtma sistemleri (D-2)", hasContent: true },
      { id: "ballast-management-plan", title: "Balast suyu yönetim planı ve kayıt defteri", hasContent: true },
    ],
  },
  {
    id: "anti-fouling",
    number: 10,
    title: "Biyolojik Çeşitlilik ve Diğer",
    icon: Leaf,
    subtopics: [
      { id: "afs-convention", title: "AFS Sözleşmesi (Anti-fouling sistemler)", hasContent: true },
      { id: "biofouling-management", title: "Biyokirlenme yönetimi", hasContent: true },
      { id: "ship-recycling", title: "Hong Kong Sözleşmesi (gemi geri dönüşümü)", hasContent: true },
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
  // BÖLÜM 1 - MARPOL GENEL
  // =====================================================
  "marpol-history": {
    title: "MARPOL Tarihçesi ve Gelişimi",
    introduction: "MARPOL 73/78 (International Convention for the Prevention of Pollution from Ships), gemilerden kaynaklanan deniz kirliliğinin önlenmesine yönelik en kapsamlı uluslararası sözleşmedir.",
    content: `HISTORICAL DEVELOPMENT:

1954 – The OILPOL Convention: the first international marine pollution convention. It regulated oil discharges only. It prohibited oil discharges in certain areas, but enforcement was weak.

1967 – The Torrey Canyon casualty: 119,000 tonnes of crude oil were spilled off the coast of England. This disaster demonstrated the need for far wider regulation.

1973 – The MARPOL Convention was adopted: adopted by the IMO in London, the convention covered not only oil but all marine pollutants. It could not enter into force, however, because it did not attract enough ratifications.

1978 – The MARPOL Protocol: the 1978 Protocol was adopted following the tanker casualties of 1976-77 (Argo Merchant, Amoco Cadiz). It absorbed the 1973 Convention; the combined text is known as MARPOL 73/78.

1983 – MARPOL 73/78 entered into force: Annexes I and II entered into force as mandatory annexes on 2 October 1983.

MARPOL today has 6 annexes, of which Annexes I and II are mandatory; Annexes III, IV, V and VI are subject to optional ratification. In practice, however, all the major maritime states have ratified all six annexes.`,
    bulletPoints: [
      "MARPOL 73/78: 1973 Sözleşmesi + 1978 Protokolü birleşik metnidir",
      "Ek I ve Ek II zorunlu; diğer ekler isteğe bağlıdır",
      "2 Ekim 1983'te yürürlüğe girmiştir",
      "Torrey Canyon (1967) ve Amoco Cadiz (1978) kazaları düzenlemeleri hızlandırmıştır",
    ],
    keyPoints: [
      "MARPOL, gemilerden kaynaklanan TÜM kirlilik türlerini kapsar (yalnızca petrol değil)",
      "6 ek: Petrol, NLS, Paketli zararlı maddeler, Pis su, Çöp, Hava kirliliği",
      "IMO'nun en önemli çevre koruma aracıdır",
    ],
  },
  "marpol-structure": {
    title: "MARPOL Yapısı ve Ekleri",
    introduction: "MARPOL 73/78, ana sözleşme metni, iki protokol ve altı teknik ekten oluşur; her ek farklı bir kirlilik kaynağını düzenler.",
    content: `THE MAIN STRUCTURE:

The MARPOL convention has a three-layer structure:

1. The main convention text (Articles): sets out the general obligations, definitions and the principles of application and enforcement.

2. Protocols:
   Protocol I: Reporting of incidents involving harmful substances (the reporting obligation in Regulation 8.8).
   Protocol II: Arbitration (dispute resolution).

3. Technical Annexes:
   Annex I – Regulations for the prevention of pollution by oil (in force: 1983)
   Annex II – Control of pollution by noxious liquid substances in bulk (NLS) (in force: 1983)
   Annex III – Prevention of pollution by harmful substances carried by sea in packaged form (in force: 1992)
   Annex IV – Prevention of pollution by sewage from ships (in force: 2003)
   Annex V – Prevention of pollution by garbage from ships (in force: 1988)
   Annex VI – Prevention of air pollution from ships (in force: 2005)

THE AMENDMENT PROCEDURE:

MARPOL amendments enter into force by "tacit acceptance". The IMO adopts the amendment and, if one third of the member states do not object within a defined period, the amendment enters into force automatically. This method allows the convention to be updated quickly.`,
    bulletPoints: [
      "Ek I ve II zorunlu; Ek III-VI isteğe bağlı onaya tabidir",
      "Tacit acceptance: Değişiklikler, itiraz edilmezse otomatik yürürlüğe girer",
      "Protokol I: Olay raporlama, Protokol II: Tahkim",
    ],
    keyPoints: [
      "6 ek, farklı kirlilik türlerini ayrı ayrı düzenler",
      "Tacit acceptance prosedürü değişikliklerin hızlı uygulanmasını sağlar",
      "Her ekin kendi sertifikası, kayıt defteri ve özel alan tanımı vardır",
    ],
  },
  "marpol-certificates": {
    title: "MARPOL Sertifikaları",
    introduction: "MARPOL sözleşmesinin her eki, gemilerin uygunluğunu belgeleyen ayrı sertifikalar gerektirir; bu sertifikalar bayrak devleti veya yetkilendirilmiş kuruluş tarafından düzenlenir.",
    content: `THE PRINCIPAL MARPOL CERTIFICATES:

1. IOPP Certificate (International Oil Pollution Prevention Certificate):
   Mandatory under Annex I for ships of 400 GT and above.
   Validity: 5 years (with annual/intermediate surveys).
   Scope: oily water separator, slop tank, monitoring system (ODME), SBT/CBT arrangements.

2. ISPP Certificate (International Sewage Pollution Prevention Certificate):
   Mandatory under Annex IV for ships of 400 GT and above, or carrying more than 15 persons.
   Scope: sewage treatment plant, disinfection system, holding tank.

3. IAPP Certificate (International Air Pollution Prevention Certificate):
   Mandatory under Annex VI for ships of 400 GT and above.
   Scope: engine emissions (NOx technical file), fuel sulphur content, ODS inventory.

4. IEE Certificate (International Energy Efficiency Certificate):
   Documents the EEDI/EEXI value and the SEEMP.
   Mandatory for all ships from 2023.

5. Fitness Certificate (Annex II):
   The mandatory certificate of fitness for ships carrying NLS.

6. BWM Certificate (International Ballast Water Management Certificate):
   Issued under the BWM Convention.

FOR EVERY CERTIFICATE:
Validity: 5 years
Surveys: initial, annual, intermediate, renewal and additional surveys
Issued by: the flag State administration or an authorised classification society`,
    bulletPoints: [
      "IOPP: Ek I (petrol), ISPP: Ek IV (pis su), IAPP: Ek VI (hava kirliliği)",
      "IEE sertifikası 2023'ten itibaren zorunludur",
      "Tüm sertifikalar 5 yıl geçerli, yıllık/ara sörvey gerektirir",
    ],
    keyPoints: [
      "400 GT ve üzeri gemiler IOPP, IAPP sertifikalarına sahip olmalıdır",
      "PSC denetçileri MARPOL sertifikalarını ve kayıt defterlerini birlikte kontrol eder",
      "Sertifika eksikliği: detention (gemi alıkonması) sebebidir",
    ],
  },
  "marpol-surveys": {
    title: "Sörvey ve Denetimler",
    introduction: "MARPOL uygunluğu, düzenli sörveyler ve liman devleti denetimleri (PSC) yoluyla kontrol edilir.",
    content: `TYPES OF SURVEY:

1. Initial Survey: carried out before the ship enters service or before a MARPOL certificate is issued for the first time. It verifies that all equipment, systems and documents comply with the MARPOL requirements.

2. Annual Survey: carried out every year during the life of the certificate. It checks that the equipment is in working order and that the records are properly kept.

3. Intermediate Survey: carried out in the 2nd or 3rd year of the 5-year certificate period. It is more comprehensive than the annual survey.

4. Renewal Survey: carried out before the 5-year certificate expires. It has the same scope as the initial survey.

5. Additional Survey: required after an incident, a failure or a repair.

PSC INSPECTIONS:

Port State Control inspectors check the ship's certificates, record books, equipment condition and crew knowledge. Regional agreements such as the Paris MoU and the Tokyo MoU set the inspection standards.

The MARPOL deficiencies most frequently found in PSC:
- OWS failure or suspicion of bypass
- Errors in the Oil Record Book entries
- A missing garbage management plan
- A mismatch between the IAPP certificate and the engine NOx technical file`,
    bulletPoints: [
      "5 sörvey türü: ilk, yıllık, ara, yenileme, olağanüstü",
      "PSC denetçileri sertifika + kayıt defteri + donanım kontrolü yapar",
      "OWS arızası ve ORB hataları en sık tespit edilen eksikliklerdir",
    ],
    keyPoints: [
      "Ara sörvey 2. veya 3. yılda yapılır ve yıllıktan daha kapsamlıdır",
      "PSC detention riski: eksik sertifika, arızalı donanım veya yanlış kayıt",
      "Paris MoU bölgesinde yüksek riskli gemiler daha sık denetlenir",
    ],
  },

  // =====================================================
  // BÖLÜM 2 - EK I – PETROL KİRLİLİĞİ
  // =====================================================
  "annex1-overview": {
    title: "Ek I Genel Yapısı ve Kapsamı",
    introduction: "MARPOL Ek I, gemilerden kaynaklanan petrol kirliliğinin önlenmesine yönelik kuralları içerir ve tüm gemiler için geçerlidir.",
    content: `THE SCOPE OF ANNEX I:

Annex I regulates the discharge of oil and oily mixtures from ships into the sea. It covers both engine room bilge water and cargo tank residues (for tankers).

THE MAIN REGULATIONS:

Regulation 15 – Engine room discharge (all ships):
Ships of 400 GT and above must be fitted with an oily water separator (OWS). The oil content of the water discharged must not exceed 15 ppm. The ODME (Oil Discharge Monitoring Equipment) must monitor continuously and stop the discharge automatically when 15 ppm is exceeded.

Regulation 34 – Discharge in special areas:
The Mediterranean, Baltic, Black Sea, Red Sea, Gulfs area, Antarctic, North West European waters and the Oman Sea area are defined as special areas. In special areas engine room bilge water may only be discharged through the OWS (below 15 ppm) and while the ship is under way. The discharge of cargo residues is prohibited in special areas.

Regulation 20 – Double hull tankers:
A double hull is mandatory for oil tankers of 5,000 DWT and above. Existing single hull tankers have been phased out.

SBT AND CBT:
SBT (Segregated Ballast Tanks): tanks dedicated to ballast water only. They never come into contact with cargo.
CBT (Clean Ballast Tanks): tanks cleaned after carrying cargo and then used for ballast water (no longer current).`,
    bulletPoints: [
      "15 ppm kuralı: tüm gemilerde deşarj edilen suyun petrol içeriği sınırı",
      "Özel alanlarda yük artığı deşarjı tamamen yasaktır",
      "5.000 DWT+ tankerlerde çift cidar zorunluluğu",
    ],
    keyPoints: [
      "OWS + ODME sistemi tüm 400 GT+ gemilerde zorunludur",
      "Kural 15: makine dairesi, Kural 34: özel alanlar, Kural 20: tanker yapısı",
      "SBT tankları yükle temas etmez; yalnızca balast içindir",
    ],
  },
  "oily-water-separator": {
    title: "Yağlı Su Ayırıcı (OWS) ve 15 ppm Kuralı",
    introduction: "Yağlı su ayırıcı (Oil Water Separator), makine dairesi sintine suyundaki petrolü ayırarak denize deşarj edilebilir seviyeye getiren kritik bir MARPOL donanımıdır.",
    content: `PRINCIPLE OF OPERATION:

An OWS performs separation in three stages:

1. Gravity separation (1st stage): the difference in density brings large oil droplets to the surface, where they are drawn off to a separate tank. This stage reduces the oil content to about 100 ppm.

2. Coalescer/filter stage (2nd stage): special filter elements bring small oil droplets together (coalescing) to form larger droplets. This stage reduces the oil content below 15 ppm.

3. Monitoring and automatic control: the ODME (Oil Discharge Monitoring Equipment) or OCM (Oil Content Monitor) continuously measures the oil content of the discharged water. When 15 ppm is exceeded, a three-way valve automatically diverts the water to the recirculation line.

THE 15 PPM RULE:

Under MARPOL Annex I Regulation 15, the oil content of bilge water discharged into the sea must not exceed 15 ppm. This rule:
- Applies in all sea areas (there is no special area distinction)
- Requires the ship to be under way
- Requires the discharge to be made below the waterline

BYPASSING THE OWS:

Bypassing the OWS (the "magic pipe" and similar) attracts severe criminal sanctions. Bypass cases detected in US waters have resulted in fines of millions of dollars and prison sentences.`,
    bulletPoints: [
      "3 aşama: yerçekimi ayırma → koalesör filtre → otomatik izleme",
      "15 ppm sınırı tüm deniz alanlarında geçerlidir",
      "15 ppm aşıldığında otomatik geri devir aktif olmalıdır",
    ],
    keyPoints: [
      "OWS bypass (magic pipe) ağır cezai yaptırıma tabidir",
      "OCM kalibrasyonu düzenli yapılmalı; PSC'de kontrol edilir",
      "Sintine tankı dolu iken OWS çalıştırmak zorunludur; doğrudan denize pompalama yasaktır",
    ],
    warnings: [
      "An attempted OWS bypass brings fines of millions of dollars and imprisonment in the USA",
      "A ship whose OCM has not been calibrated can be detained in PSC",
    ],
  },
  "oil-record-book": {
    title: "Yağ Kayıt Defteri (ORB) Part I ve II",
    introduction: "Yağ Kayıt Defteri (Oil Record Book), gemideki tüm petrol operasyonlarının yasal olarak kaydedildiği resmi belgedir ve PSC denetimlerinde en çok incelenen kayıttır.",
    content: `ORB PART I – MACHINERY SPACE OPERATIONS:

All ships of 400 GT and above must keep ORB Part I. The operations recorded are:

(A) Ballasting or cleaning of oil fuel tanks
(B) Discharge from oil fuel tanks or the engine room bilge well
(C) Disposal of oil residues in slop tanks
(D) Discharge of bilge water through the OWS
(E) Bunkering and oil fuel transfers
(F) Accidental discharge of oil
(G) Delivery to a reception facility in port

ORB PART II – CARGO AND BALLAST OPERATIONS (Tankers):

Oil tankers of 150 GT and above keep ORB Part II. The operations recorded are:

(A) Loading of cargo
(B) Internal transfer
(C) Discharge of cargo
(D) Tank cleaning (including COW)
(E) Ballasting/deballasting
(F) Slop tank operations
(G) Discharge of residues

RECORDING RULES:

Each entry is made against the operation code. The officer in charge signs and the master endorses every page. The ORB is retained on board for 3 years. Entries are made in English, French or Spanish (or in the flag State language plus an English translation).`,
    bulletPoints: [
      "Part I: 400 GT+ tüm gemiler, Part II: 150 GT+ petrol tankerleri",
      "ORB gemide 3 yıl muhafaza edilir",
      "Her giriş sorumlu zabit imzası + kaptan onayı gerektirir",
    ],
    keyPoints: [
      "PSC denetimlerinde ORB en çok incelenen belgedir",
      "Kayıt hataları, tutarsızlıklar veya eksik girişler detention sebebidir",
      "Kod sistemi: A-G harfleri ile operasyon türü belirtilir",
    ],
    warnings: [
      "If the quantities recorded in the ORB do not tally with the tank soundings, PSC moves to an expanded inspection",
    ],
  },
  "special-areas-annex1": {
    title: "Özel Alanlar ve Deşarj Kuralları",
    introduction: "MARPOL, ekolojik açıdan hassas deniz alanlarını 'özel alan' olarak tanımlar ve bu bölgelerde daha sıkı deşarj kuralları uygular.",
    content: `ANNEX I SPECIAL AREAS:

The Mediterranean, the Baltic Sea, the Black Sea, the Red Sea, the Gulfs area (Persian Gulf), the Gulf of Aden, the Antarctic area, North-West European waters, the Oman Sea area and Southern African waters.

RULES IN SPECIAL AREAS:

Engine room discharge:
- Permitted through the OWS, below 15 ppm and while the ship is under way (the same as in normal areas)

Cargo residue discharge (tankers):
- Completely PROHIBITED in special areas
- Must be retained in the slop tank and delivered to a reception facility in port

PSSA (Particularly Sensitive Sea Areas):
Unlike special areas, PSSAs are areas designated by the IMO in which additional protective measures (routeing systems, speed limits, etc.) apply. Examples: the Great Barrier Reef, Galápagos, the Baltic, the Canary Islands.`,
    bulletPoints: [
      "Özel alanlarda tanker yük artığı deşarjı tamamen yasaktır",
      "Makine dairesi 15 ppm kuralı özel alanlarda da aynıdır",
      "PSSA, özel alanlardan farklıdır; IMO tarafından ek tedbirlerle korunur",
    ],
    keyPoints: [
      "Akdeniz, Baltık, Karadeniz: Ek I özel alanlarıdır",
      "Özel alan = daha sıkı deşarj kuralları; PSSA = ek koruyucu tedbirler",
      "Yük artığı: özel alanlarda → slop + alıcı tesis zorunlu",
    ],
  },
  "sopep": {
    title: "SOPEP (Shipboard Oil Pollution Emergency Plan)",
    introduction: "SOPEP, gemide petrol sızıntısı veya dökülmesi durumunda mürettebatın izleyeceği acil müdahale prosedürlerini içeren zorunlu bir plandır.",
    content: `THE SOPEP REQUIREMENT:

Under MARPOL Annex I Regulation 37, all ships of 400 GT and above must carry a SOPEP. For tankers it may also be combined with the SMPEP (Shipboard Marine Pollution Emergency Plan).

CONTENTS OF THE SOPEP:

1. Reporting procedure: the details of the report required by MARPOL Protocol I. To whom, when and how the report is to be made.

2. Contact list: contact details for the coastal State administration, the port authority, the P&I club, the company DPA (Designated Person Ashore) and the classification society.

3. Response procedures:
   - Spill on deck: use of absorbent material, closing the scuppers
   - Tank overflow: stopping the transfer, diverting to the slop tank
   - Pipeline failure: closing the isolating valve, emergency pump stop
   - Leakage after collision/grounding: damage assessment, tank transfer

4. Coordination: the procedure for coordinating with the coastal State SAR/pollution response centre.

SOPEP DRILLS:

IMO recommendation: at least one SOPEP drill should be held each year. The drill assesses the reporting chain, the use of the equipment and the response time.`,
    bulletPoints: [
      "400 GT+ tüm gemilerde SOPEP zorunludur",
      "Raporlama, bildirim listesi, müdahale prosedürü ve koordinasyonu kapsar",
      "Yılda en az bir SOPEP tatbikatı tavsiye edilir",
    ],
    keyPoints: [
      "SOPEP bayrak devleti tarafından onaylanmalıdır",
      "Bildirim listesi güncel tutulmalıdır; PSC'de kontrol edilir",
      "Tankerler için SMPEP ile birleştirilebilir",
    ],
  },
  "crude-oil-washing": {
    title: "Ham Petrol Yıkama (COW) Sistemi",
    introduction: "COW (Crude Oil Washing), ham petrol tankerlerinde yük tanklarının boşaltma sırasında ham petrolün kendisiyle yıkanarak artık miktarını minimuma indiren bir yöntemdir.",
    content: `THE PRINCIPLE OF COW:

In traditional water washing the wash water is collected in the slop tank and disposed of; this process generates a large quantity of oily water. With a COW system, part of the crude oil is sprayed into the tanks by the cargo pumps through high-pressure nozzles (tank cleaning machines) during discharge. The crude oil dissolves and washes away the waxy deposits clinging to the tank walls, so that the quantity of residue is reduced to a very low level.

ADVANTAGES OF COW:

1. The residue falls below 0.1% (0.3-1.0% with water washing)
2. More cargo is delivered → a commercial advantage
3. Less slop → a lower risk of discharge into the sea
4. Water consumption is reduced

COW REQUIREMENTS (MARPOL Annex I Regulation 33):

COW is mandatory on crude oil tankers of 20,000 DWT and above. The system is operated in accordance with a COW Manual approved by the flag State administration.

It must be operated together with an inert gas system (IGS); during COW the tank atmosphere must be kept below 8% O₂ with inert gas.

At least 2 tanks must be washed during COW, and the tanks washed at each port must be recorded in ORB Part II.`,
    formula: {
      name: "COW Basınç Gereksinimi",
      expression: "Tank cleaning machine pressure: 8-10 bar (typical)",
      description: "Ham petrol, yüksek basınçla tank cidarlarına püskürtülerek wax ve tortu çözülür.",
    },
    bulletPoints: [
      "20.000 DWT+ ham petrol tankerlerinde COW zorunludur",
      "Artık %0,1'in altına düşer; su yıkamada %0,3-1,0",
      "IGS ile birlikte çalışması zorunludur (O₂ < %8)",
    ],
    keyPoints: [
      "COW = ham petrol ile tank yıkama → artık minimuma iner",
      "COW Manual bayrak devleti tarafından onaylanmalıdır",
      "Her COW operasyonu ORB Part II'ye kaydedilir",
    ],
    warnings: [
      "There is a risk of explosion if inert gas is not used during COW",
    ],
  },

  // =====================================================
  // BÖLÜM 3 - EK II
  // =====================================================
  "annex2-categories": {
    title: "NLS Kategorileri (X, Y, Z, OS)",
    introduction: "MARPOL Ek II, dökme hâlde taşınan zehirli sıvı maddeleri (NLS - Noxious Liquid Substances) tehlike derecelerine göre dört kategoride sınıflandırır.",
    content: `CATEGORIES:

Category X – Major hazard: substances which, if discharged into the sea, present a major hazard to marine resources or human health. Discharge into the sea is completely PROHIBITED. Tank washing residues must be delivered to a reception facility. Examples: carbon tetrachloride, certain pesticides.

Category Y – Hazard: substances which, if discharged, present a hazard to marine resources or human health or cause harm to the marine environment. Discharge is permitted under limited conditions (prewash plus a reception facility are mandatory). Examples: phenol, cresol, certain solvents.

Category Z – Minor hazard: substances which, if discharged, present a minor hazard to marine resources or human health. Discharge is permitted under defined conditions. Examples: phosphate esters, certain acids.

OS (Other Substances): substances which do not fall into the above categories. Their discharge is unrestricted. Operations must nevertheless comply with the P&A Manual.

THE PREWASH REQUIREMENT:

A prewash is mandatory after carrying Category X and Y substances. The prewash water must be delivered to a reception facility. For Category Z a prewash is required only under certain conditions.`,
    bulletPoints: [
      "X: deşarj yasak, Y: ön yıkama + alıcı tesis, Z: koşullu deşarj, OS: serbest",
      "Kategori X ve Y sonrası prewash zorunludur",
      "Her maddenin kategorisi IBC Code'da listelenmiştir",
    ],
    keyPoints: [
      "NLS kategorisi arttıkça (X→OS) tehlike derecesi azalır",
      "Prewash sonrası su alıcı tesise verilmelidir; denize deşarjı yasaktır",
      "P&A Manual tüm NLS operasyonlarını düzenler",
    ],
  },
  "annex2-discharge": {
    title: "Deşarj Standartları ve Prewash",
    introduction: "MARPOL Ek II, NLS taşıyan gemilerin tank yıkama ve deşarj işlemlerini maddenin tehlike kategorisine göre düzenler.",
    content: `DISCHARGE CONDITIONS:

General rules (Regulation 13):
- The ship must be under way
- Speed at least 7 knots
- The discharge must be made below the waterline
- At least 12 nautical miles from the nearest land
- Water depth at least 25 metres

RULES BY CATEGORY:

Category X: completely prohibited. Prewash mandatory, prewash water to a reception facility.
Category Y: prewash mandatory. After the prewash the residual water may be discharged into the sea subject to the discharge conditions. Additional restrictions apply in special areas.
Category Z: a prewash is generally not required. It may be discharged subject to the discharge conditions.
OS: no restrictions.

THE PREWASH PROCEDURE:

1. Discharge is completed and stripping is carried out
2. During the prewash the tank is washed with a defined quantity of water
3. The wash water is transferred to the slop tank or directly to a reception facility
4. Once the prewash is complete the approval of a surveyor or port official is obtained
5. An entry is made in the Cargo Record Book`,
    bulletPoints: [
      "Deşarj: 7 knot hız, 12 mil kıyıdan uzak, 25 m derinlik",
      "Kategori X: deşarj tamamen yasak; Y: prewash + koşullu deşarj",
      "Prewash operasyonu Cargo Record Book'a kaydedilir",
    ],
    keyPoints: [
      "Prewash, tankın kabul edilebilir artık seviyesine ulaşmasını sağlar",
      "Sörveyor onayı prewash'ın doğru yapıldığını teyit eder",
      "Cargo Record Book = Ek II'nin ORB eşdeğeridir",
    ],
  },
  "annex2-ppap": {
    title: "P&A Manual ve Cargo Record Book",
    introduction: "P&A Manual (Procedures and Arrangements Manual), NLS taşıyan kimyasal tankerlerin operasyonel prosedürlerini tanımlayan zorunlu dokümandır.",
    content: `THE P&A MANUAL:

Under MARPOL Annex II Regulation 14, every ship carrying NLS must have a P&A Manual on board. The manual is approved by the flag State.

CONTENTS:
1. Tank washing procedures (for each tank)
2. Stripping system capacity and operation
3. Prewash requirements (by category)
4. Slop tank operation
5. Discharge connections and arrangements
6. Compatibility tables (which substances may be carried in the same tank)

THE CARGO RECORD BOOK:

All operations under Annex II are recorded in the Cargo Record Book. It is the NLS equivalent of ORB Part II.

The operations recorded:
- Loading and discharging of cargo
- Tank washing and prewash
- Ballast operations
- Slop transfer
- Discharge of residues
- Delivery to a reception facility

The Cargo Record Book is retained on board for 3 years. It is checked together with the P&A Manual during PSC inspections.`,
    bulletPoints: [
      "P&A Manual bayrak devleti onaylı olmalıdır",
      "Cargo Record Book tüm NLS operasyonlarını kaydeder",
      "Her iki belge de gemide 3 yıl muhafaza edilir",
    ],
    keyPoints: [
      "P&A Manual her tank için ayrı yıkama prosedürü içerir",
      "Cargo Record Book = Ek II'nin ORB eşdeğeridir",
      "PSC: P&A Manual + Cargo Record Book + tank durumu birlikte değerlendirilir",
    ],
  },

  // =====================================================
  // BÖLÜM 4 - EK III
  // =====================================================
  "annex3-imdg": {
    title: "IMDG Code ve Sınıflandırma",
    introduction: "IMDG Code (International Maritime Dangerous Goods Code), deniz yoluyla paketlenmiş tehlikeli maddelerin güvenli taşınmasını düzenleyen uluslararası standarttır.",
    content: `THE STRUCTURE OF THE IMDG CODE:

The IMDG Code is a mandatory code that supports MARPOL Annex III and is referenced in SOLAS Chapter VII. It is updated every 2 years.

CLASSES OF DANGEROUS GOODS:

Class 1 – Explosives (divisions 1.1-1.6)
Class 2 – Gases (2.1 flammable, 2.2 non-flammable, 2.3 toxic)
Class 3 – Flammable liquids (flash point ≤ 60°C closed cup)
Class 4 – Flammable solids (4.1 flammable solid, 4.2 spontaneously combustible, 4.3 dangerous when wet)
Class 5 – Oxidizers and organic peroxides (5.1, 5.2)
Class 6 – Toxic and infectious substances (6.1, 6.2)
Class 7 – Radioactive material
Class 8 – Corrosives
Class 9 – Miscellaneous dangerous substances

UN NUMBER AND PROPER SHIPPING NAME:

Every dangerous substance is identified by a four-digit UN number and a Proper Shipping Name (PSN). Example: UN 1203 – GASOLINE, Class 3.

For each UN number the IMDG Code gives the packing group (PG I: great danger, PG II: medium, PG III: minor), the stowage rules and the list of incompatible substances.`,
    bulletPoints: [
      "9 ana sınıf: patlayıcı, gaz, yanıcı sıvı/katı, oksitleyici, zehirli, radyoaktif, aşındırıcı",
      "Her madde UN numarası + PSN ile tanımlanır",
      "Paketleme Grubu: PG I (en tehlikeli) → PG III (en az tehlikeli)",
    ],
    keyPoints: [
      "IMDG Code 2 yılda bir güncellenir; güncel versiyonun gemide bulunması zorunludur",
      "Sınıf 3 yanıcı sıvılar: parlama noktası ≤ 60°C (kapalı kap testi)",
      "Uyumsuz maddelerin aynı konteyner/ambara yüklenmesi yasaktır",
    ],
  },
  "annex3-marking": {
    title: "Etiketleme, İşaretleme ve İstifleme",
    introduction: "Paketlenmiş tehlikeli maddeler, IMDG Code'a uygun etiket, işaret ve plakartlarla tanımlanmalı ve uyumluluk kurallarına göre istiflenmelidir.",
    content: `LABELLING:

On every package of dangerous goods:
1. The UN number (a 4-digit number prefixed by UN)
2. The Proper Shipping Name
3. The hazard label (diamond-shaped): colour and symbol according to class
   - Class 1: orange/exploding bomb symbol
   - Class 2.1: red/flame
   - Class 3: red/flame
   - Class 6.1: white/skull and crossbones
   - Class 8: black and white/liquid drops

4. The subsidiary hazard label (where applicable)

MARKING:
On the container: the placard and the UN number are displayed so as to be clearly visible.

STOWAGE & SEGREGATION:

The IMDG Code defines a four-level system for keeping incompatible substances apart:

1. "Away from": a different compartment/hold or at least 3 m horizontal separation
2. "Separated from": a different compartment, or at least one full compartment apart
3. "Separated by a complete compartment"
4. "Separated longitudinally by an intervening complete compartment"

The stowage rules on deck and under deck are different; Part 7 of the IMDG Code gives the details.`,
    bulletPoints: [
      "Paket: UN numarası + PSN + tehlike etiketi zorunludur",
      "Konteyner: placard + UN numarası görünür olmalıdır",
      "4 ayrım seviyesi: away from → longitudinal compartment ayrımı",
    ],
    keyPoints: [
      "Uyumsuz maddeler aynı konteyner/ambarda taşınamaz",
      "Segregation tablosu IMDG Code Bölüm 7.2'de yer alır",
      "Tehlike etiketi diamond (kare döndürülmüş) şeklindedir",
    ],
  },
  "annex3-documentation": {
    title: "Tehlikeli Madde Beyannamesi",
    introduction: "Tehlikeli madde taşıyan gemiler, SOLAS ve MARPOL gereği doğru beyanname ve dokümantasyona sahip olmalıdır.",
    content: `MANDATORY DOCUMENTS:

1. Dangerous Goods Declaration:
   Prepared by the shipper. It states the UN number, PSN, class, packing group, quantity and emergency response information.

2. Container/Vehicle Packing Certificate:
   The document by which the party packing the container certifies that the packing has been carried out in accordance with the IMDG Code.

3. Dangerous Goods Manifest or Stowage Plan:
   The list showing the location, quantity and class of all dangerous goods on board. It must be given to the shore authorities if the ship is abandoned.

4. EmS (Emergency Schedules):
   Contains the emergency response procedures for each class. Found in the IMDG Code Supplement.

5. MFAG (Medical First Aid Guide):
   First aid procedures following contact with dangerous goods. Found in the IMDG Code Supplement.

RESPONSIBILITIES:

Shipper: correct declaration, labelling and packing
Ship: stowage, segregation, document check, emergency response plan
Port: pre-loading approval (in some ports)`,
    bulletPoints: [
      "Dangerous Goods Declaration yükleyici tarafından hazırlanır",
      "Manifest veya stowage plan gemide bulunmalıdır",
      "EmS ve MFAG acil durum ve ilk yardım prosedürlerini içerir",
    ],
    keyPoints: [
      "Belgeler eksik ise gemi tehlikeli madde yükleyemez",
      "Container Packing Certificate yükleme sorumluluğunu belgelendirir",
      "Dangerous Goods Manifest terk durumunda kıyı otoritesine verilir",
    ],
  },

  // =====================================================
  // BÖLÜM 5 - EK IV
  // =====================================================
  "annex4-overview": {
    title: "Ek IV Gereksinimleri ve Uygulama",
    introduction: "MARPOL Ek IV, gemilerden kaynaklanan pis suyun (sewage) denize deşarjını düzenler ve 400 GT üzeri veya 15'ten fazla personel taşıyan gemilere uygulanır.",
    content: `SCOPE:

MARPOL Annex IV entered into force on 27 September 2003.

Application:
- Ships of 400 GT and above engaged on international voyages
- Ships of less than 400 GT carrying more than 15 persons

DEFINITION OF SEWAGE:

Sewage covers the following sources:
1. Drainage from toilets and urinals
2. Drainage from medical spaces (washbasins and drains)
3. Drainage from spaces containing live animals
4. Other waste waters mixed with the above

SYSTEMS REQUIRED ON BOARD:

- A sewage treatment plant (STP) and/or
- A comminuting and disinfecting system and/or
- A holding tank

At least one of the three options must be fitted. Modern ships usually prefer a combination of STP plus holding tank.`,
    bulletPoints: [
      "400 GT+ veya 15+ kişi taşıyan gemilerde zorunludur",
      "Pis su: tuvalet, tıbbi bölüm ve hayvan drenajını kapsar",
      "STP, dezenfeksiyon sistemi veya holding tank gereklidir",
    ],
    keyPoints: [
      "Ek IV 2003'te yürürlüğe girmiştir",
      "ISPP sertifikası uygunluğu belgeler",
      "Baltık Denizi Ek IV özel alanıdır; yolcu gemileri için ek kurallar geçerlidir",
    ],
  },
  "sewage-treatment": {
    title: "Pis Su Arıtma Tesisi ve Standartları",
    introduction: "Gemilerdeki pis su arıtma tesisleri (STP), pis suyu biyolojik, kimyasal veya fiziksel yöntemlerle arıtarak denize deşarj edilebilir kaliteye getirir.",
    content: `TREATMENT METHODS:

1. Biological treatment: aerobic bacteria break down the organic matter. This is the most common method. Activated sludge or a membrane bioreactor (MBR) is used.

2. Chemical treatment: pathogenic micro-organisms are destroyed by chlorine or UV disinfection.

3. Electrochemical treatment: breakdown and disinfection by electrolysis. Used in some modern systems.

IMO STANDARDS (MEPC.227(64)):

Quality standards for the treated effluent:
- BOD₅ (Biochemical Oxygen Demand): ≤ 25 mg/L
- COD (Chemical Oxygen Demand): ≤ 125 mg/L
- TSS (Total Suspended Solids): ≤ 35 mg/L
- Coliform bacteria: ≤ 100 CFU/100 mL
- pH: 6-8.5

These standards apply to ships built on or after 1 January 2010 and to passenger ships operating in the Baltic special area.`,
    formula: {
      name: "STP Kalite Standartları",
      expression: "BOD₅ ≤ 25 mg/L | TSS ≤ 35 mg/L | Koliform ≤ 100 CFU/100mL",
      description: "MEPC.227(64) standardı. 2010 sonrası gemiler ve Baltık yolcu gemileri için zorunludur.",
    },
    bulletPoints: [
      "Biyolojik arıtma (aktif çamur/MBR) en yaygın yöntemdir",
      "MEPC.227(64): modern STP kalite standardı",
      "BOD₅ ≤ 25, TSS ≤ 35, Koliform ≤ 100 limitleri",
    ],
    keyPoints: [
      "STP performansı düzenli olarak test edilmeli; PSC'de kontrol edilir",
      "MBR sistemleri daha yüksek arıtma kalitesi sağlar",
      "STP arızası → holding tank kullanılmalı → limanda alıcı tesise",
    ],
  },
  "sewage-discharge": {
    title: "Deşarj Kuralları ve Mesafe Sınırları",
    introduction: "Pis su deşarjı, arıtma durumuna, özel alan tanımına ve kıyıdan uzaklığa göre farklı kurallara tabidir.",
    content: `DISCHARGE CONDITIONS:

1. Treated sewage (STP effluent):
   - If it meets the MEPC.227(64) standard: it may be discharged without restriction
   - If it meets the earlier standards: discharge more than 3 nautical miles from the nearest land

2. Comminuted and disinfected sewage:
   - At least 3 nautical miles from the nearest land
   - The ship under way, speed at least 4 knots

3. Untreated sewage:
   - At least 12 nautical miles from the nearest land
   - The ship under way, speed at least 4 knots
   - Instantaneous rate of discharge: the rate must comply with the formula set by the IMO

SPECIAL AREA – THE BALTIC SEA:

The Baltic Sea is designated an Annex IV special area. Additional rules for passenger ships:
- New passenger ships (keel laid after 1 June 2019): the STP must meet the MEPC.227(64) standard
- Existing passenger ships: compliance mandatory from 1 June 2021

The general rules apply to cargo ships in the Baltic.`,
    bulletPoints: [
      "Arıtılmış (MEPC.227): kısıtlamasız; dezenfekte: 3 mil; arıtılmamış: 12 mil",
      "Deşarj sırasında gemi seyir hâlinde, en az 4 knot hız",
      "Baltık Denizi Ek IV özel alanıdır; yolcu gemileri için ek kurallar",
    ],
    keyPoints: [
      "12 mil kuralı: arıtılmamış pis su için minimum mesafe",
      "3 mil kuralı: dezenfekte edilmiş pis su için minimum mesafe",
      "Modern STP (MEPC.227): mesafe kısıtlaması yok",
    ],
  },

  // =====================================================
  // BÖLÜM 6 - EK V
  // =====================================================
  "annex5-categories": {
    title: "Çöp Kategorileri ve Deşarj Kuralları",
    introduction: "MARPOL Ek V, gemilerden kaynaklanan çöplerin denize atılmasını çoğunlukla yasaklar; yalnızca belirli kategorilerde sınırlı istisnalar tanımlar.",
    content: `GARBAGE CATEGORIES (Annex V Regulations 4-6):

Category A – Plastics: discharge into the sea is completely PROHIBITED. There are no exceptions.

Category B – Food waste:
- Normal areas: more than 3 miles offshore, comminuted (below 25 mm)
- Special areas: more than 12 miles offshore, comminuted

Category C – Domestic wastes, packaging, paper, rags:
- Normal areas: more than 12 miles offshore
- Special areas: PROHIBITED

Category D – Cooking oil:
- Normal areas: more than 12 miles offshore
- Special areas: PROHIBITED

Category E – Incinerator ashes:
- Normal areas: more than 12 miles offshore
- Special areas: PROHIBITED

Category F – Operational wastes (including cargo residues):
- Normal areas: more than 12 miles offshore, if not harmful to the environment
- Special areas: PROHIBITED (with some exceptions for cargo residues)

GENERAL RULE: the discharge of all synthetic materials including plastics into the sea is prohibited in all circumstances.`,
    bulletPoints: [
      "Plastik denize atılması: tamamen ve her yerde YASAK",
      "Yemek artıkları: 3 mil (normal), 12 mil (özel alan), parçalanmış",
      "Diğer çoğu kategori: 12 mil (normal), yasak (özel alan)",
    ],
    keyPoints: [
      "2013 revizyonu ile kurallar sıkılaştırılmıştır",
      "Özel alanlarda yalnızca yemek artıkları (12 mil, parçalanmış) verilebilir",
      "Plastik = mutlak yasak; hiçbir istisna yoktur",
    ],
  },
  "garbage-management": {
    title: "Çöp Yönetim Planı ve Kayıt Defteri",
    introduction: "100 GT ve üzeri gemiler ile 15 veya daha fazla kişi taşıyan sabit platformlar Çöp Yönetim Planı (Garbage Management Plan) bulundurmak zorundadır.",
    content: `THE GARBAGE MANAGEMENT PLAN:

Under Regulation 10.2, ships of 100 GT and above must carry a written Garbage Management Plan. The plan must be written in a language the crew understands and must cover:

1. Collection procedures: segregation by garbage category
2. Storage: separate containers by category on deck or in the garbage room
3. Processing: incinerator, compactor, comminuter
4. Discharge: the categories which may and may not be discharged into the sea
5. Delivery to a reception facility: the procedure for disposing of garbage in port

THE GARBAGE RECORD BOOK:

Mandatory for ships of 400 GT and above and for fixed platforms carrying 15 or more persons.

The information recorded:
- Type of garbage (category code)
- Estimated quantity (m³)
- Method of disposal (discharge to sea / incineration / delivery to a reception facility)
- Date, time and position

The record book is retained on board for 2 years.

INCINERATOR RULES:

What may be incinerated on board:
- Paper, rags, oily wastes, food waste
What is prohibited:
- Cargo residues covered by Annexes I, II and III
- Plastics containing PVC (risk of dioxins)`,
    bulletPoints: [
      "100 GT+ gemilerde Çöp Yönetim Planı zorunludur",
      "400 GT+ gemilerde Çöp Kayıt Defteri zorunludur",
      "Kayıt defteri gemide 2 yıl muhafaza edilir",
    ],
    keyPoints: [
      "Çöp 7 kategoride ayrıştırılmalıdır (plastik, yemek, kağıt vb.)",
      "PVC yakmak yasaktır; dioksin ve furan emisyonu riski",
      "Incinerator MEPC.244(66) standardını karşılamalıdır",
    ],
  },
  "annex5-special-areas": {
    title: "Özel Alanlar ve Antarktika Kuralları",
    introduction: "MARPOL Ek V kapsamında çok sayıda deniz alanı özel alan olarak belirlenmiş olup, bu alanlarda çöp deşarjı kuralları normal alanlardan çok daha kısıtlayıcıdır.",
    content: `ANNEX V SPECIAL AREAS:

The Mediterranean, the Baltic Sea, the Black Sea, the Red Sea, the Gulfs area, the North Sea, the Antarctic area (south of 60°S) and the Wider Caribbean Region.

RULES IN SPECIAL AREAS:

Plastics: PROHIBITED (as in normal areas)
Food waste: more than 12 nautical miles offshore, comminuted (below 25 mm), the ship under way
All other categories: PROHIBITED (must be delivered to a reception facility in port)

THE ANTARCTIC AREA (SOUTH OF 60°S):

The Antarctic area is subject to the strictest rules:
- The discharge of all types of garbage into the sea is PROHIBITED
- No garbage at all, including food waste, may be discharged
- Use of the incinerator: certain restrictions apply under the Environmental Protocol to the Antarctic Treaty
- All garbage must be stored on board and taken out of the Antarctic area

Ships operating in the Antarctic must also comply with the local environmental legislation (the Antarctic Treaty System).`,
    bulletPoints: [
      "Özel alanlarda yalnızca yemek artıkları (12 mil, parçalanmış) deşarj edilebilir",
      "Antarktika: yemek artıkları dahil TÜM çöp yasaktır",
      "8 bölge Ek V özel alanı olarak tanımlanmıştır",
    ],
    keyPoints: [
      "Antarktika = en sıkı çöp kuralları; hiçbir deşarj izni yoktur",
      "Özel alanlarda kağıt, plastik, ambalaj → limanda alıcı tesise zorunlu",
      "Akdeniz, Baltık, Karadeniz, Kuzey Denizi: özel alan statüsündedir",
    ],
  },

  // =====================================================
  // BÖLÜM 7 - EK VI
  // =====================================================
  "sox-regulations": {
    title: "SOx Sınırları ve Yakıt Kükürt Oranları",
    introduction: "MARPOL Ek VI, gemilerden kaynaklanan kükürt oksit (SOx) emisyonlarını yakıt kükürt oranı sınırları aracılığıyla kontrol eder.",
    content: `GLOBAL SULPHUR LIMITS:

Since 1 January 2020 the global sulphur limit has been 0.50% m/m (by mass). This regulation is known as "IMO 2020".

HISTORICAL DEVELOPMENT:
- Before 2012: 4.50% (effectively unlimited)
- 2012-2020: 3.50%
- After 2020: 0.50%

ECA/SECA AREAS:

Within Emission Control Areas (ECA) or Sulphur Emission Control Areas (SECA) the limit is 0.10% m/m (since 2015).

Existing ECAs: the Baltic Sea, the North Sea, North America (US and Canadian coasts, 200 miles), the US Caribbean, and the Mediterranean (from 2025).

METHODS OF COMPLIANCE:

1. Low sulphur fuel (VLSFO/ULSFO): the most common method. Using fuel compliant with 0.50% (global) or 0.10% (ECA).
2. Scrubber (Exhaust Gas Cleaning System – EGCS): washes SO₂ out of the exhaust gas while continuing to burn HFO. Open-loop, closed-loop or hybrid types.
3. LNG: when natural gas is used as fuel, SOx emissions are close to zero.
4. Methanol and other alternative fuels.`,
    bulletPoints: [
      "2020 sonrası küresel sınır: %0,50 m/m kükürt",
      "ECA/SECA sınırı: %0,10 m/m (2015'ten itibaren)",
      "Uyum: düşük kükürtlü yakıt, scrubber veya LNG",
    ],
    keyPoints: [
      "IMO 2020 = küresel kükürt sınırının %3,50'den %0,50'ye düşürülmesi",
      "ECA'larda %0,10 sınırı 2015'ten beri geçerlidir",
      "Scrubber kullanan gemiler HFO (%3,50) yakabilir ancak scrubber çıkışı izlenmelidir",
    ],
    warnings: [
      "The fuel changeover before entering an ECA must be completed at least 1 hour in advance",
      "Use of non-compliant fuel: PSC detention plus heavy fines",
    ],
  },
  "nox-tiers": {
    title: "NOx Tier I, II, III Standartları",
    introduction: "MARPOL Ek VI, gemi dizel motorlarından kaynaklanan azot oksit (NOx) emisyonlarını motor devir sayısına bağlı üç kademeli standartla sınırlar.",
    content: `NOx STANDARDS:

The NOx limits are set according to the engine speed (n = rpm):

Tier I (ships built between 2000 and 2011):
- n < 130 rpm: 17.0 g/kWh
- 130 ≤ n < 2000 rpm: 45 × n⁻⁰·² g/kWh
- n ≥ 2000 rpm: 9.8 g/kWh

Tier II (ships built after 2011):
- n < 130 rpm: 14.4 g/kWh
- 130 ≤ n < 2000 rpm: 44 × n⁻⁰·²³ g/kWh
- n ≥ 2000 rpm: 7.7 g/kWh

Tier III (after 2016, inside a NOx ECA):
- n < 130 rpm: 3.4 g/kWh
- 130 ≤ n < 2000 rpm: 9 × n⁻⁰·² g/kWh
- n ≥ 2000 rpm: 2.0 g/kWh

METHODS OF TIER III COMPLIANCE:

1. SCR (Selective Catalytic Reduction): a urea solution is injected into the exhaust gas to reduce NOx. 80-90% efficiency.
2. EGR (Exhaust Gas Recirculation): part of the exhaust gas is returned to the combustion chamber, lowering the combustion temperature.
3. LNG: gas-fuelled engines meet Tier III naturally.

NOx ECAs: North America and the US Caribbean. The Baltic and the North Sea became NOx ECAs in 2021.`,
    formula: {
      name: "Tier II NOx Sınırı (130-2000 rpm arası)",
      expression: "NOx ≤ 44 × n⁻⁰·²³ g/kWh",
      description: "n: motor devir sayısı (rpm). 2011 sonrası inşa edilen gemilerin motorları için geçerlidir.",
    },
    bulletPoints: [
      "Tier I: 2000-2011, Tier II: 2011+, Tier III: 2016+ (NOx ECA içi)",
      "Tier III, Tier I'e göre ~%80 düşük emisyon gerektirir",
      "SCR ve EGR en yaygın Tier III uyum teknolojileridir",
    ],
    keyPoints: [
      "NOx sınırları motor RPM'ine göre formülle hesaplanır",
      "Tier III yalnızca NOx ECA içinde uygulanır; ECA dışında Tier II yeterlidir",
      "EIAPP sertifikası her motorun NOx uyumunu belgeler",
    ],
  },
  "eca-seca": {
    title: "ECA/SECA Bölgeleri ve Gereksinimleri",
    introduction: "Emisyon Kontrol Alanları (ECA), IMO tarafından belirlenen ve normal deniz alanlarından daha sıkı emisyon standartlarının uygulandığı bölgelerdir.",
    content: `THE EXISTING ECAs:

1. Baltic Sea SECA: SOx control only. In force since 2006.
2. North Sea SECA: SOx control only. In force since 2007.
3. North American ECA: SOx + NOx + PM control. Since 2012. 200 nautical miles from the US and Canadian coasts.
4. US Caribbean ECA: SOx + NOx + PM. Since 2014. Around Puerto Rico and the US Virgin Islands.
5. Baltic and North Sea NOx ECA: from 1 January 2021 (Tier III compliance).
6. Mediterranean SOx ECA: enters into force in 2025.

REQUIREMENTS:

SOx ECA:
- Fuel sulphur content ≤ 0.10% m/m or an equivalent scrubber
- Fuel changeover procedure and record

NOx ECA:
- Engines of ships built after 2016/2021 must meet Tier III
- SCR, EGR or LNG technology

ENTERING/LEAVING AN ECA:

The ship must change over to low sulphur fuel before crossing the ECA boundary. Sufficient low sulphur fuel must be available in the tanks throughout the changeover. The time and date of the changeover and the tank volumes are recorded in the log book.`,
    bulletPoints: [
      "SOx ECA: %0,10 kükürt sınırı; NOx ECA: Tier III zorunlu",
      "Kuzey Amerika: SOx + NOx + PM kontrolü (en kapsamlı)",
      "Akdeniz SOx ECA 2025'te yürürlüğe girecektir",
    ],
    keyPoints: [
      "ECA = SOx ve/veya NOx ve/veya PM için sıkı sınırlar",
      "Fuel changeover ECA sınırına girmeden önce tamamlanmalıdır",
      "Tier III: yalnızca NOx ECA'larında geçerlidir",
    ],
  },
  "ods-regulations": {
    title: "Ozon Tabakasını İncelten Maddeler",
    introduction: "MARPOL Ek VI Kural 12, ozon tabakasını incelten maddelerin (ODS) gemilerde kullanımını kontrol eder.",
    content: `SCOPE:

Ozone Depleting Substances (ODS) are chemicals brought under control by the Montreal Protocol.

The most common uses of ODS on board:
- Refrigeration systems (air conditioning, provision cooling, cargo refrigeration)
- Fire extinguishing systems (halon)
- Insulation foams

MARPOL ANNEX VI REGULATION 12:

1. Prohibition of new installations: new installations of refrigeration and fire extinguishing systems containing CFCs (chlorofluorocarbons) are prohibited (all ships).

2. New installations of substances such as Halon 1211, 1301 and CFC-12 (R-12) are prohibited.

3. HCFC (hydrochlorofluorocarbon) restriction: from 1 January 2020 new installations containing HCFCs (including R-22) are prohibited. Existing systems may continue in use but may not be recharged.

4. ODS Record Book: all systems containing ODS must be recorded, and leakages and recharge quantities must be tracked.

ALTERNATIVES:

HFC (hydrofluorocarbon) refrigerants such as R-134a, R-404A and R-407C are not ODS, but they are being phased down under the Kigali Amendment because of their greenhouse effect.`,
    bulletPoints: [
      "CFC ve Halon yeni kurulumu tamamen yasaktır",
      "HCFC (R-22): 2020'den itibaren yeni kurulum yasak; mevcut sistemde dolum yapılamaz",
      "ODS Record Book gemide bulundurulmalıdır",
    ],
    keyPoints: [
      "ODS kontrolü Montreal Protokolü + MARPOL Ek VI Kural 12 ile sağlanır",
      "R-22 hâlâ bazı eski gemilerde mevcut; ancak dolum yasaktır",
      "HFC'ler ODS değildir ancak Kigali Değişikliği ile azaltılacaktır",
    ],
  },
  "voc-regulations": {
    title: "VOC (Uçucu Organik Bileşikler) Kontrolü",
    introduction: "MARPOL Ek VI Kural 15, tanker operasyonlarından kaynaklanan uçucu organik bileşik (VOC) emisyonlarının kontrolünü düzenler.",
    content: `WHAT ARE VOCs?

VOCs (Volatile Organic Compounds) are volatile hydrocarbons released into the atmosphere from tanker cargo tanks. They arise from the evaporation of cargoes such as crude oil and petrol. They contribute to the formation of ozone and have an adverse effect on air quality.

REGULATION 15 REQUIREMENTS:

1. VOC Management Plan (VOCSMP): crude oil tankers must prepare a VOC Management Plan.

2. Vapour Emission Control System (VECS): some ports and terminals require VOC emissions to be collected during loading. The ship must have the equipment to connect to this system.

3. Vapour Recovery Unit (VRU): the vapours collected are condensed and recovered or safely burned.

APPLICATION:

VOC control is applied mainly at terminals. The ship's responsibility is to:
- Carry a VECS connection manifold
- Comply with the VOC management plan
- Control the tank vents during loading

Some coastal States, such as Norway, apply additional VOC control requirements within their territorial waters.`,
    bulletPoints: [
      "VOC: tanker yük tanklarından yayılan uçucu hidrokarbonlar",
      "Ham petrol tankerleri VOC Yönetim Planı bulundurmalıdır",
      "VECS bağlantısı terminallerde yükleme sırasında kullanılır",
    ],
    keyPoints: [
      "VOC emisyonları ozon oluşumuna katkıda bulunur",
      "Terminal-gemi bağlantısı için standart manifold gereklidir",
      "Norveç gibi ülkeler ulusal düzeyde ek VOC kuralları uygular",
    ],
  },

  // =====================================================
  // BÖLÜM 8 - ENERJİ VERİMLİLİĞİ
  // =====================================================
  "eedi-eexi": {
    title: "EEDI ve EEXI Hesaplama ve Gereksinimleri",
    introduction: "EEDI (Energy Efficiency Design Index) yeni gemiler için, EEXI (Energy Efficiency Existing Ship Index) ise mevcut gemiler için karbon verimliliğini ölçen zorunlu endekslerdir.",
    content: `EEDI (NEW SHIPS):

The EEDI measures the CO₂ emission per ton-mile at the design stage of the ship. It has been mandatory for new ships since 2013 under MARPOL Annex VI Regulation 21.

Calculation (simplified):
EEDI = (CO₂ emission) / (carrying capacity × speed)

Unit: g CO₂ / (tonne × nautical mile)

EEDI reduction targets (against the baseline):
- Phase 0 (2013-2015): 0% (reference)
- Phase 1 (2015-2020): 10% reduction
- Phase 2 (2020-2025): 20% reduction
- Phase 3 (2025+): 30-50% reduction (depending on ship type)

EEXI (EXISTING SHIPS):

From 1 January 2023 existing ships must calculate their EEXI and achieve the required energy efficiency index.

The EEXI is the EEDI applied to existing ships.

Methods of EEXI compliance:
1. Engine Power Limitation (EPL): the most common method
2. Energy saving technologies (waste heat recovery, air lubrication)
3. Conversion to alternative fuel`,
    formula: {
      name: "EEDI Hesaplaması (Basitleştirilmiş)",
      expression: "EEDI = (P × SFC × CF) / (Capacity × Vref)",
      description: "P: Motor gücü (kW), SFC: Özgül yakıt tüketimi (g/kWh), CF: CO₂ dönüşüm faktörü, Capacity: DWT, Vref: Referans hız (knot).",
    },
    bulletPoints: [
      "EEDI: 2013+ yeni gemiler, EEXI: 2023+ mevcut gemiler",
      "Faz 3 (2025+): %30-50 azaltma hedefi",
      "EPL (motor güç sınırlaması) en yaygın EEXI uyum yöntemidir",
    ],
    keyPoints: [
      "EEDI/EEXI geminin tasarım verimliliğini ölçer; operasyonel değil",
      "IEE sertifikası EEDI/EEXI değerini belgeler",
      "EEXI uyumu 1 Ocak 2023'ten itibaren zorunludur",
    ],
  },
  "cii-rating": {
    title: "CII Derecelendirmesi (A-E) ve Hesaplama",
    introduction: "CII (Carbon Intensity Indicator), geminin yıllık operasyonel karbon yoğunluğunu ölçer ve A-E arasında bir derecelendirme verir.",
    content: `WHAT IS THE CII?

The CII relates the CO₂ a ship actually emits in a year to its carrying capacity and the distance it sails. Unlike the EEDI/EEXI, the CII measures operational performance.

CALCULATION:

CII = Annual CO₂ emission / (Capacity × Distance)

Unit: g CO₂ / (tonne × nautical mile)

Annual CO₂ = Total fuel consumption × CF (CO₂ conversion factor)

RATING:

A: Superior – well below the reference line
B: Good – below the reference line
C: Moderate – around the reference line
D: Inferior – above the reference line
E: Poor – well above the reference line

Ships rated D for three consecutive years or E for one year must prepare a corrective action plan.

CII REDUCTION TARGETS:

2023: reference year
2024: 2% reduction
2025: 3% reduction
2026: 4% reduction
Beyond that: to be set by the IMO

METHODS OF IMPROVEMENT:

1. Speed optimisation (slow steaming)
2. Route optimisation
3. Hull maintenance (anti-fouling)
4. Propeller polishing
5. Trim optimisation
6. Use of alternative fuels`,
    formula: {
      name: "CII Hesaplaması",
      expression: "CII = (ΣFCⱼ × CFⱼ) / (Capacity × D)",
      description: "FCⱼ: j tipi yakıt tüketimi (ton), CFⱼ: CO₂ dönüşüm faktörü, Capacity: DWT veya GT, D: toplam kat edilen mesafe (deniz mili).",
    },
    bulletPoints: [
      "CII operasyonel karbon yoğunluğunu ölçer; EEDI/EEXI tasarım endeksidir",
      "A-E derecelendirmesi: D veya E alan gemiler düzeltici eylem zorunlu",
      "Yıllık azaltma hedefi: %2-4 (2024-2026)",
    ],
    keyPoints: [
      "3 yıl D veya 1 yıl E = düzeltici eylem planı zorunlu",
      "Slow steaming en etkili CII iyileştirme yöntemidir",
      "CII referans çizgileri gemi tipine göre farklıdır",
    ],
  },
  "seemp": {
    title: "SEEMP (Gemi Enerji Verimliliği Yönetim Planı)",
    introduction: "SEEMP, geminin enerji verimliliğini izlemek ve iyileştirmek için gerekli prosedürleri içeren zorunlu bir yönetim planıdır.",
    content: `THE STRUCTURE OF THE SEEMP:

Since 2023 the SEEMP has consisted of two parts:

SEEMP Part I: the Energy Efficiency Management Plan
- Ship-specific energy efficiency measures
- Fuel consumption monitoring procedures
- Crew training
- Mandatory for all ships

SEEMP Part II: CII monitoring and reporting
- Mandatory for ships of 5,000 GT and above
- Collection of fuel consumption data (DCS – Data Collection System)
- Annual CII calculation
- Corrective action plan (if a D or E rating is received)

ENERGY EFFICIENCY MEASURES:

Improvement measures that may be included in the SEEMP:
1. Voyage optimisation: passage planning, allowing for currents and weather
2. Speed management: determining the optimum economical speed
3. Trim optimisation: reducing resistance by adjusting the static trim
4. Machinery maintenance: engine tune-up, propeller polishing
5. Hull maintenance: application of anti-fouling paint
6. Waste heat recovery
7. LED lighting and energy efficient equipment

DCS (Data Collection System):

Ships of 5,000 GT and above report their annual fuel consumption data to the flag State. The data is collated in the IMO DCS database.`,
    bulletPoints: [
      "SEEMP Part I: tüm gemiler; Part II: 5.000 GT+ gemiler",
      "Part II CII izleme ve yıllık raporlama içerir",
      "DCS ile yıllık yakıt tüketimi verisi IMO'ya raporlanır",
    ],
    keyPoints: [
      "SEEMP, IEE sertifikasının ayrılmaz parçasıdır",
      "D veya E derecelendirmesinde düzeltici eylem planı Part II'ye eklenir",
      "Trim optimizasyonu %2-5 yakıt tasarrufu sağlayabilir",
    ],
  },
  "eu-ets": {
    title: "EU ETS ve FuelEU Maritime",
    introduction: "AB, denizcilik sektörünü 2024'ten itibaren Emisyon Ticaret Sistemi'ne (EU ETS) dahil etmiş ve FuelEU Maritime düzenlemesiyle sera gazı yoğunluğu hedefleri belirlemiştir.",
    content: `EU ETS FOR SHIPPING:

Since 1 January 2024 the CO₂ emissions of ships of 5,000 GT and above have been included in the EU Emissions Trading System.

SCOPE:
- Voyages between EU ports: 100% of emissions
- Voyages between an EU port and a non-EU port: 50% of emissions
- While at berth in an EU port: 100% of emissions

PHASE-IN:
2024: allowances to be surrendered for 40% of emissions
2025: 70%
2026: 100%

The ship operator must buy enough EUAs (EU Allowances) to cover its emissions. 1 EUA = 1 tonne of CO₂.

FUELEU MARITIME (2025):

From 1 January 2025 ships must meet targets for reducing the greenhouse gas intensity of their fuel:
2025: −2% (against the 2020 reference)
2030: −6%
2035: −14.5%
2040: −31%
2045: −62%
2050: −80%

GHG intensity is calculated on a Well-to-Wake basis; it covers the emissions from production, transport and combustion.

Fines apply in the event of non-compliance.`,
    bulletPoints: [
      "EU ETS: 2024'ten itibaren 5.000 GT+ gemiler dahil",
      "AB-AB seferleri: %100, AB-üçüncü ülke: %50 emisyon kapsamı",
      "FuelEU Maritime: 2025-2050 arası kademeli GHG azaltma hedefleri",
    ],
    keyPoints: [
      "1 EUA = 1 ton CO₂; operatör emisyon karşılığı tahsisat satın almalıdır",
      "FuelEU Maritime Well-to-Wake bazlıdır (yalnızca baca emisyonu değil)",
      "2050 hedefi: %80 GHG yoğunluğu azaltma",
    ],
  },
  "alternative-fuels": {
    title: "Alternatif Yakıtlar (LNG, Metanol, Amonyak)",
    introduction: "Denizcilik sektörünün dekarbonizasyon hedeflerini karşılamak için geleneksel petrol bazlı yakıtlara alternatif çeşitli yakıt seçenekleri geliştirilmektedir.",
    content: `LNG (LIQUEFIED NATURAL GAS):

Advantages: SOx emissions close to zero, NOx down by 85%, CO₂ down by 20-25%, PM (particulate matter) down by 95%.
Disadvantages: methane slip (unburned methane) offsets the greenhouse benefit; high investment cost; limited bunkering infrastructure.
IGF Code: the safety requirements for gas-fuelled ships.

METHANOL:

Advantages: zero SOx, low NOx, liquid at ambient temperature (easy to store), can be carbon neutral as biomethanol or e-methanol.
Disadvantages: low energy density (half that of HFO), toxic (invisible flame, skin contact).
Maersk brought methanol-fuelled container ships into service in 2024.

AMMONIA:

Advantages: contains no carbon (produces no CO₂ on combustion), high energy density, existing LPG carriage technology can be adapted.
Disadvantages: extremely toxic (TLV: 25 ppm), corrosive, low flame speed, can produce NOx.
Commercial use is expected during the 2030s.

HYDROGEN:

Green hydrogen (from electrolysis) is the cleanest fuel, but its marine application is still limited by the difficulty of storage (high pressure or cryogenic), its low volumetric energy density and its production cost.

COMPARISON (HFO = 100 reference):

Fuel / Energy density / CO₂ reduction / Cost
HFO: 100 / reference / low
LNG: 75 / 20-25% / medium
Methanol: 50 / 0-100%* / high
Ammonia: 55 / 100% (tank-to-wake) / high
*A 100% reduction is possible with biomethanol or e-methanol`,
    bulletPoints: [
      "LNG: SOx ≈ 0, CO₂ %20-25 azalma; methan slip dezavantajı",
      "Metanol: oda sıcaklığında sıvı, e-metanol ile %100 azaltma mümkün",
      "Amonyak: karbon içermez ancak son derece zehirli (TLV: 25 ppm)",
    ],
    keyPoints: [
      "LNG şu anda en olgun alternatif yakıt teknolojisidir",
      "Metanol, Maersk gibi büyük operatörler tarafından benimsenmektedir",
      "2050 net-sıfır hedefi için e-metanol veya yeşil amonyak kritik öneme sahiptir",
    ],
  },

  // =====================================================
  // BÖLÜM 9 - BALAST SUYU
  // =====================================================
  "bwm-convention": {
    title: "BWM Sözleşmesi ve Tarihçesi",
    introduction: "Balast Suyu Yönetimi (BWM) Sözleşmesi, gemilerin balast suyu yoluyla yabancı deniz organizmalarını taşımasını önlemeye yönelik uluslararası düzenlemedir.",
    content: `THE BWM CONVENTION:

Adopted by the IMO in 2004, it entered into force on 8 September 2017.

THE PROBLEM: ships take on ballast water in one region to maintain their stability and discharge it in another. The alien organisms carried with the ballast water (invasive species) pose a serious threat to local ecosystems.

IMPORTANT EXAMPLES:
- The zebra mussel (Dreissena polymorpha): carried from the Caspian Sea to the Great Lakes; billions of dollars of damage to water infrastructure.
- The cholera bacterium: found to have been carried to South America in ballast water.
- The comb jelly (Mnemiopsis leidyi): from the western Atlantic to the Black Sea; a devastating effect on fisheries.

IMPLEMENTATION TIMETABLE:

D-1 Standard (ballast water exchange): a transitional measure. Exchange of ballast water in mid-ocean.
D-2 Standard (ballast water treatment): the final goal. Destruction of the organisms by an approved treatment system (BWTS).

All ships are due to have moved to the D-2 standard by 2024 (on a transition timetable based on the age of the ship).`,
    bulletPoints: [
      "BWM Sözleşmesi 2004'te kabul, 2017'de yürürlüğe girmiştir",
      "İstilacı türler milyarlarca dolarlık ekonomik hasar verebilir",
      "D-1: su değişimi (geçici), D-2: arıtma sistemi (nihai)",
    ],
    keyPoints: [
      "Tüm gemiler aşamalı olarak D-2 standardına geçmektedir",
      "BWM sertifikası gemide bulunmalıdır",
      "Balast suyu istilacı tür transferinin en büyük vektörüdür",
    ],
  },
  "ballast-exchange": {
    title: "Balast Suyu Değişim Yöntemleri (D-1)",
    introduction: "D-1 standardı, geminin kıyıdan uzak açık okyanus sularında balast suyunu değiştirerek kıyısal organizmaları uzaklaştırmasını gerektirir.",
    content: `D-1 STANDARD REQUIREMENTS:

- At least 200 nautical miles from the nearest land
- Water depth at least 200 metres
- 95% volumetric exchange

If the 200-mile condition cannot be met: at least 50 miles offshore in a depth of 200 m.

METHODS OF EXCHANGE:

1. Sequential Method:
   The tank is emptied completely and then refilled with ocean water.
   Advantage: close to 100% exchange
   Disadvantage: stability problems (the moment the tank is empty); structural stress

2. Flow-through Method:
   Ocean water is pumped into the full tank from the bottom or the top and the water leaves by overflow.
   Rule: at least 3 times the tank volume must be pumped through (95% exchange).
   Advantage: stability is maintained
   Disadvantage: wet decks, takes a long time

3. Dilution Method:
   Clean water enters at the top of the tank while the same rate is discharged from the bottom.
   Rule: 3 times the volume must be pumped through.
   Advantage: a controlled operation
   Disadvantage: requires special pipework

STABILITY CONSIDERATIONS:

With the sequential method the order in which tanks are emptied and filled must be consistent with the stability calculation. The free surface effect and the change of trim must be monitored.`,
    bulletPoints: [
      "200 mil + 200 m derinlik; veya 50 mil + 200 m derinlik",
      "3 yöntem: sıralı, akıtmalı, seyreltme; hepsi %95 değişim hedefler",
      "Akıtmalı yöntemde 3 kat tank hacmi su geçirilmelidir",
    ],
    keyPoints: [
      "D-1 geçiş dönemi standardıdır; D-2 nihai hedeftir",
      "Sıralı yöntemde stabilite riski en yüksektir",
      "Balast suyu değişimi Balast Suyu Kayıt Defteri'ne kaydedilir",
    ],
    warnings: [
      "With the sequential method stability can be lost while a tank is empty; a stability calculation is essential",
    ],
  },
  "ballast-treatment": {
    title: "Balast Suyu Arıtma Sistemleri (D-2)",
    introduction: "D-2 standardı, balast suyundaki canlı organizmaların onaylı bir arıtma sistemi (BWTS) ile belirli sınırların altına düşürülmesini gerektirir.",
    content: `D-2 STANDARD LIMITS:

Viable organisms (≥50 µm): < 10 individuals/m³
Viable organisms (10-50 µm): < 10 individuals/mL
Vibrio cholerae: < 1 CFU/100 mL
E. coli: < 250 CFU/100 mL
Intestinal enterococci: < 100 CFU/100 mL

TREATMENT TECHNOLOGIES:

1. UV (Ultraviolet) treatment:
   UV-C light damages the DNA of the organisms so that they cannot reproduce.
   Advantage: no chemicals used, leaves no residue
   Disadvantage: effectiveness falls in turbid water; pre-filtration is needed

2. Electrochlorination:
   Sodium hypochlorite (NaOCl) is produced by electrolysis of seawater and dosed into the ballast water.
   Advantage: produced in situ, effective
   Disadvantage: TRO (Total Residual Oxidant) must be controlled; risk of corrosion

3. Ozonation:
   Disinfection with ozone (O₃) gas.
   Advantage: a very powerful oxidant
   Disadvantage: energy intensive; risk of bromate formation

4. Filtration plus UV:
   The most common commercial system. A pre-filter (40-50 µm) plus a UV chamber.

IMO TYPE APPROVAL:

All BWTS must be type approved under the IMO G8 guidelines or the BWMS Code.`,
    bulletPoints: [
      "D-2: ≥50 µm organizma < 10/m³; 10-50 µm < 10/mL",
      "UV, elektroklorinasyon ve ozon başlıca arıtma teknolojileridir",
      "Filtrasyon + UV en yaygın ticari kombinasyondur",
    ],
    keyPoints: [
      "BWTS IMO tip onaylı olmalıdır (BWMS Code)",
      "UV sistemlerde bulanık su etkinliği düşürür; ön filtrasyon şarttır",
      "Elektroklorinasyonda TRO kontrolü ve nötralizasyon gereklidir",
    ],
  },
  "ballast-management-plan": {
    title: "Balast Suyu Yönetim Planı ve Kayıt Defteri",
    introduction: "Her gemide balast suyu operasyonlarını düzenleyen bir yönetim planı ve tüm operasyonları kaydeden bir kayıt defteri bulunmalıdır.",
    content: `THE BALLAST WATER MANAGEMENT PLAN:

Under Regulation B-1 of the BWM Convention every ship must have a Ballast Water Management Plan (BWMP). The plan is approved by the flag State.

CONTENTS:
1. Safety procedures for ballast water operations
2. A ship-specific description of the ballast system (tank arrangement, pump capacities)
3. The method of compliance with the D-1 or D-2 standard
4. BWTS operating and maintenance procedures
5. Sediment management
6. Crew duties and responsibilities
7. Assessment of the areas from which ballast water is to be taken

THE BALLAST WATER RECORD BOOK:

Under Regulation B-2 every ship must carry a Ballast Water Record Book.

The information recorded:
- Ballast water uptake: date, time, position, tank number, quantity
- Ballast water discharge: the same details
- Ballast water exchange (D-1): method, start/finish position
- Treatment by BWTS (D-2): start/stop times
- Delivery to a reception facility
- Accidental or exceptional discharge

The record book is retained on board for at least 2 years and is produced during PSC inspections.`,
    bulletPoints: [
      "BWMP bayrak devleti tarafından onaylanmalıdır",
      "Kayıt defteri tüm balast operasyonlarını tarih, saat ve konumla kaydeder",
      "Kayıt defteri gemide 2 yıl muhafaza edilir",
    ],
    keyPoints: [
      "BWMP, D-1 veya D-2 standardına uyum yöntemini detaylı açıklar",
      "PSC denetiminde BWMP + kayıt defteri + BWTS çalışma durumu kontrol edilir",
      "Sediment yönetimi planın ayrılmaz parçasıdır",
    ],
  },

  // =====================================================
  // BÖLÜM 10 - BİYOLOJİK ÇEŞİTLİLİK
  // =====================================================
  "afs-convention": {
    title: "AFS Sözleşmesi (Anti-fouling Sistemler)",
    introduction: "AFS Sözleşmesi (International Convention on the Control of Harmful Anti-fouling Systems on Ships), gemi tekne boyalarında kullanılan zararlı kimyasalları yasaklar.",
    content: `HISTORY:

The anti-fouling paints used to stop marine organisms (biofouling) attaching to ships' hulls contained tributyltin (TBT) compounds for many years. The AFS Convention was drawn up once the devastating effect of TBT on marine ecosystems (reproductive disorders in mussels and snails) became apparent.

THE AFS CONVENTION:

Adopted in 2001, it entered into force on 17 September 2008.

THE MAIN REQUIREMENTS:
1. The application of anti-fouling paints containing TBT has been prohibited since 1 January 2003.
2. From 1 January 2008 ships with TBT coatings may not operate unless the coating is sealed (sealer coat).
3. Other potentially harmful substances such as cybutryne are under review.

THE AFS CERTIFICATE:

Ships of 400 GT and above engaged on international voyages must carry an International Anti-fouling System Certificate or a Declaration.

CURRENT ALTERNATIVES:

- Copper-based paints (the most common)
- Silicone-based foul-release coatings (a slippery surface)
- Ultrasonic anti-fouling systems
- Non-biocidal coatings`,
    bulletPoints: [
      "TBT boyaların uygulanması 2003'ten, bulundurulması 2008'den beri yasaktır",
      "AFS sertifikası 400 GT+ uluslararası gemilerde zorunludur",
      "Bakır bazlı ve silikon bazlı boyalar güncel alternatiflerdir",
    ],
    keyPoints: [
      "TBT deniz ekosistemlerinde üreme bozukluklarına yol açmıştır",
      "AFS Sözleşmesi 2001'de kabul, 2008'de yürürlüğe girmiştir",
      "Sibutryn ve diğer maddeler hâlâ inceleme altındadır",
    ],
  },
  "biofouling-management": {
    title: "Biyokirlenme Yönetimi",
    introduction: "Biyokirlenme (biofouling), deniz organizmalarının gemi teknesine yapışması olup yakıt tüketimini artırır ve istilacı tür transferine neden olabilir.",
    content: `THE EFFECTS OF BIOFOULING:

1. Increased fuel consumption: heavy biofouling can increase frictional resistance by up to 40%, which means a 10-40% increase in fuel consumption.

2. Transfer of invasive species: organisms attached to the hull are carried from one region to another. After ballast water this is the largest vector for invasive species.

3. Increased emissions: higher fuel consumption directly increases CO₂, SOx and NOx emissions. It has an adverse effect on the CII rating.

THE IMO BIOFOULING GUIDELINES (2011/2023):

The IMO has published voluntary guidelines on biofouling management (MEPC.207(62), revised in 2023). They cover:

1. A Biofouling Management Plan:
   - Selection of the anti-fouling system and the maintenance programme
   - The underwater inspection schedule
   - Maintenance of niche areas (sea water inlets, rudder, propeller)

2. A Biofouling Record Book:
   - Applications of anti-fouling paint
   - Underwater cleaning and inspections
   - Drydocking dates
   - Niche area maintenance

NICHE AREAS:

The parts of the hull most susceptible to biofouling: sea water inlet gratings (sea chests), the rudder, the propeller, the bow thruster tunnel, anode protection areas and sea valves.`,
    bulletPoints: [
      "Biyokirlenme yakıt tüketimini %10-40 artırabilir",
      "IMO gönüllü rehberi: yönetim planı + kayıt defteri",
      "Niş alanlar: sea chest, dümen, pervane en kritik bölgelerdir",
    ],
    keyPoints: [
      "Biyokirlenme, balast suyundan sonra en büyük istilacı tür vektörüdür",
      "Sualtı temizliği hem yakıt tasarrufu hem CII iyileşmesi sağlar",
      "Bazı bölgeler (Avustralya, Yeni Zelanda) sualtı temizlik kuralları koyar",
    ],
  },
  "ship-recycling": {
    title: "Hong Kong Sözleşmesi (Gemi Geri Dönüşümü)",
    introduction: "Hong Kong Sözleşmesi (2009), gemilerin söküm/geri dönüşüm sürecinde insan sağlığı ve çevre korumasını amaçlayan uluslararası düzenlemedir.",
    content: `THE HONG KONG CONVENTION:

Adopted in 2009, it enters into force on 26 June 2025 (sufficient ratifications have been achieved).

PURPOSE: during the ship recycling process:
- To protect worker health and safety
- To prevent environmental pollution
- To manage hazardous materials under control

THE MAIN REQUIREMENTS:

1. IHM (Inventory of Hazardous Materials):
   An inventory of the hazardous materials present on each ship. It will be mandatory for ships of 500 GT and above.
   Three parts:
   - Part I: hazardous materials in the ship's structure and equipment (asbestos, PCBs, TBT, ODS, etc.)
   - Part II: operationally generated wastes
   - Part III: stores (stock materials)

2. Ship Recycling Plan:
   Prepared specifically for each ship by the recycling facility.

3. Authorisation of the recycling facility:
   Facilities must be authorised by the national authority.

THE EU REGULATION (EU SRR):

Without waiting for the Hong Kong Convention, the EU brought its own Ship Recycling Regulation (EU 1257/2013) into force. EU-flagged ships may only be recycled at EU-approved facilities.`,
    bulletPoints: [
      "Hong Kong Sözleşmesi 2009'da kabul, 2025'te yürürlüğe girecektir",
      "IHM (Zararlı Madde Envanteri) 500 GT+ gemilerde zorunlu olacaktır",
      "AB: EU SRR ile kendi geri dönüşüm düzenlemesini uygulamaktadır",
    ],
    keyPoints: [
      "IHM Part I: yapısal zararlı maddeler (asbest, PCB, TBT, ODS vb.)",
      "Geri dönüşüm tesisleri yetkili otorite tarafından onaylanmalıdır",
      "Beaching yöntemi (karaya çıkarma) çevre ve işçi güvenliği riskleri nedeniyle tartışmalıdır",
    ],
  },

  // =====================================================
  // EK BAŞLIKLAR (2. tur domain taraması)
  // =====================================================
  "port-reception": {
    title: "Liman Atık Kabul Tesisleri (Port Reception Facilities)",
    introduction: "MARPOL, gemilerin deşarj edemediği atıkları (yağlı atık, slop, çöp, pis su, kargo artığı) karaya güvenle teslim edebilmesi için liman devletlerinin yeterli atık kabul tesisi (Port Reception Facility – PRF) sağlamasını şart koşar.",
    content: `WHY ARE THEY NEEDED?

The MARPOL annexes prohibit or strictly limit the discharge of many wastes into the sea. The ship must collect these wastes (bilge oil, slops, sludge, garbage, sewage, cargo washing residues) and land them ashore. Port reception facilities (PRF) are the port infrastructure that makes this possible; without PRF, MARPOL compliance cannot be achieved in practice.

THE SHIP'S RESPONSIBILITY:

- To enter the wastes in the record book for the relevant annex (ORB, Garbage Record Book, etc.).
- To obtain and keep a waste delivery receipt on delivery to the PRF.
- To comply with the waste management plans (Garbage Management Plan, etc.).

THE PORT STATE'S RESPONSIBILITY:

States Parties are obliged to provide PRF of adequate capacity without causing undue delay to ships. Inadequate PRF is a serious compliance gap because it encourages illegal discharge into the sea.

THE EU POSITION:

In the EU the PRF Directive requires ships to deliver their wastes to the port and requires the waste fee to be included in the port dues (in order to reduce the incentive to discharge at sea).`,
    bulletPoints: [
      "PRF, gemilerin MARPOL atıklarını karaya güvenle teslim etmesini sağlar.",
      "Teslimde waste delivery receipt alınır ve saklanır.",
      "Liman devleti yeterli PRF sağlamakla yükümlüdür.",
      "Yetersiz PRF yasa dışı deşarjı teşvik eder.",
    ],
    keyPoints: [
      "PRF olmadan MARPOL uyumu pratikte mümkün değildir.",
      "Teslim makbuzu uyum kanıtıdır ve denetimde sorulur.",
      "AB PRF Direktifi atık ücretini liman ücretine dâhil eder.",
    ],
  },
  "scrubber-egcs": {
    title: "Egzoz Gazı Temizleme Sistemleri (Scrubber/EGCS)",
    introduction: "EGCS (Exhaust Gas Cleaning System / scrubber), egzoz gazındaki kükürt oksitlerini (SOx) yıkayarak gidermek için kullanılır ve MARPOL Ek VI kükürt sınırına 'eşdeğer tedbir' olarak yüksek kükürtlü yakıt (HSFO) kullanımına imkân verir.",
    content: `PRINCIPLE OF OPERATION:

A scrubber washes the exhaust gas with water (usually seawater); the SOx dissolves in the water and is separated from the gas. The SOx leaving the funnel is thereby brought below the limit as if low sulphur fuel had been used. Compliance is monitored continuously by measuring the equivalent SO2/CO2 ratio.

TYPES:

- Open loop: washes with the natural alkalinity of seawater; after monitoring, the washwater is discharged into the sea.
- Closed loop: washes with fresh water plus an alkali (caustic); the washwater is recirculated and the sludge is landed ashore. Suitable for areas with discharge restrictions.
- Hybrid: can operate in either mode.

WASHWATER AND RESTRICTIONS:

For open-loop discharge water the MARPOL Annex VI criteria (pH, PAH, turbidity, nitrate) are monitored. Some ports/regions prohibit open-loop washwater discharge; the system is then switched to closed loop.

COMPLIANCE AND THE OTHER ROUTES:

Along with low sulphur fuel (VLSFO/MGO) and LNG, the scrubber is one of the three main routes to Annex VI sulphur compliance. Continuous monitoring data and the approval documents (SECC/approved SO2/CO2 ratio) are retained.`,
    bulletPoints: [
      "Scrubber egzozdaki SOx'i suyla yıkayarak giderir.",
      "Açık devre (deniz suyu), kapalı devre (tatlı su+alkali), hibrit tipleri vardır.",
      "Washwater MARPOL Ek VI kriterlerine (pH/PAH/bulanıklık) göre izlenir.",
      "Bazı bölgeler açık devre deşarjını yasaklar.",
    ],
    keyPoints: [
      "Scrubber, HSFO ile Ek VI kükürt sınırına eşdeğer uyum sağlar.",
      "Uyum SO2/CO2 oranının sürekli izlenmesiyle kanıtlanır.",
      "Deşarj kısıtlı bölgelerde kapalı devre kullanılır.",
    ],
  },
  "incinerator": {
    title: "Gemide Atık Yakma (Incinerator) ve Ek VI",
    introduction: "Gemi insineratörü; atık yağ (sludge), yağlı paçavra, belirli çöp ve katı atıkları yakarak hacmini azaltır. MARPOL Ek VI, gemide yakmayı düzenler ve bazı maddelerin yakılmasını yasaklar.",
    content: `PURPOSE:

Combustible wastes accumulated on board (oily sludge, oil residues, some garbage) are burned in the incinerator to reduce their volume; this lowers the quantity of waste that has to be landed ashore.

MARPOL ANNEX VI REQUIREMENTS:

- An approved type of incinerator (meeting the IMO standard) must be used; the combustion chamber temperature must be monitored.
- The incineration on board of certain substances is PROHIBITED: for example certain residues covered by the MARPOL annexes, materials containing PCBs, garbage containing heavy metals and halogenated compounds.
- Incineration in port or in inland waters is mostly prohibited or restricted; the port rules take precedence.

OPERATION AND SAFETY:

- Incineration records (type/quantity of waste burned) are entered in the Garbage Record Book or the relevant records.
- The combustion temperature and the funnel emissions are monitored.
- Correct feeding and maintenance are required because of the risk of fire and explosion.

THE ALTERNATIVE:

Wastes that cannot or must not be incinerated are delivered to port reception facilities (PRF).`,
    bulletPoints: [
      "İnsineratör yanabilir atık (sludge, bazı çöpler) hacmini azaltır.",
      "Onaylı tip insineratör ve sıcaklık izleme gerekir (Ek VI).",
      "PCB/ağır metal/halojenli bazı maddelerin yakılması yasaktır.",
      "Yakma kayıtları kayıt defterine işlenir.",
    ],
    keyPoints: [
      "Ek VI gemide yakmayı düzenler ve bazı maddeleri yasaklar.",
      "Liman/iç sularda yakma çoğunlukla kısıtlı/yasaktır.",
      "Yakılamayan atık PRF'ye teslim edilir.",
    ],
    warnings: [
      "Incinerating prohibited materials carries severe sanctions",
      "Incorrect feeding/maintenance creates a risk of fire and explosion",
    ],
  },
  "imo-ghg-strategy": {
    title: "IMO Sera Gazı (GHG) Stratejisi ve Net-Zero Hedefleri",
    introduction: "IMO'nun gemicilik sera gazı stratejisi, uluslararası deniz taşımacılığından kaynaklanan GHG emisyonlarını azaltmak için hedefler ve tedbirler belirler. EEDI/CII gibi araçlar bu stratejinin uygulama mekanizmalarıdır.",
    content: `THE FRAMEWORK OF THE STRATEGY:

The IMO's revised GHG Strategy (2023) aims to bring the emissions of international shipping to net zero by around 2050 and defines indicative checkpoints along the way; it also aims to increase the share of low/zero carbon fuels.

TYPES OF MEASURE:

- Technical measures: rules limiting the carbon intensity of fuels (e.g. a fuel standard) and ship efficiency requirements.
- Economic measures: market-based mechanisms such as carbon pricing/levies (still under development).

THE IMPLEMENTING INSTRUMENTS (existing):

- EEDI/EEXI: the design/existing ship efficiency indices.
- CII: the operational carbon intensity rating (A-E).
- SEEMP: the ship energy efficiency management plan.
These are the concrete instruments through which the strategy is implemented.

INTERACTION WITH REGIONAL RULES:

The EU's EU ETS and FuelEU Maritime regulations create parallel and additional pressure alongside the IMO framework. Ship operators have to manage both the global (IMO) and the regional (EU) requirements together.

OPERATIONAL IMPACT:

Speed optimisation (slow steaming), route/trim optimisation, energy saving devices and alternative fuels are the main operational levers for meeting the targets.`,
    bulletPoints: [
      "Revize IMO GHG Stratejisi (2023) ~2050 net-zero hedefler.",
      "Teknik (yakıt/verim) ve ekonomik (karbon fiyatı) tedbirler içerir.",
      "Uygulama araçları: EEDI/EEXI, CII, SEEMP.",
      "EU ETS / FuelEU Maritime bölgesel olarak paralel baskı yapar.",
    ],
    keyPoints: [
      "Strateji, gemiciliği net-sıfıra götüren çerçeveyi tanımlar.",
      "EEDI/CII/SEEMP stratejinin somut araçlarıdır.",
      "Slow steaming ve alternatif yakıtlar başlıca azaltım kaldıraçlarıdır.",
    ],
  },
};

export default function EnvironmentTopicsPage() {
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
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="relative z-40 bg-background/95 border-b border-border">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Çevre Koruma (MARPOL)</h1>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-4 max-w-4xl mx-auto pb-20">
            <Accordion type="single" collapsible className="space-y-2">
              {environmentTopics.map((topic) => {
                return (
                  <AccordionItem
                    key={topic.id}
                    value={topic.id}
                    className="border border-border/40 rounded-xl overflow-hidden bg-card/80"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                      <div className="flex items-center gap-3 text-left">
                        <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
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
                                ? "hover:bg-emerald-500/5 cursor-pointer"
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
                <Lightbulb className="h-5 w-5 text-emerald-500" />
                <h2 className="text-lg font-semibold text-foreground">Quick Access</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { title: "Emission Calculations", href: "/environment/calculations" },
                  { title: "Emisyon Formülleri", href: "/environment/formulas" },
                  { title: "Tüm Dersler", href: "/lessons" },
                ].map((resource, index) => (
                  <Link
                    key={index}
                    to={resource.href}
                    className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-[background-color,color,border-color,box-shadow,opacity,transform,width] hover:border-emerald-500/40 hover:bg-background"
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
                <div className="bg-emerald-500/10 rounded-xl p-4 border-l-4 border-emerald-500">
                  <p className="text-foreground font-medium leading-relaxed">
                    {currentContent.introduction}
                  </p>
                </div>

                <StructuredLessonText text={currentContent.content} />

                {currentContent.bulletPoints && currentContent.bulletPoints.length > 0 && (
                  <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                    <h3 className="font-semibold text-foreground mb-3">Önemli Noktalar</h3>
                    {currentContent.bulletPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
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
                    <div className="bg-background rounded-lg p-3 font-mono text-lg text-center text-emerald-600 dark:text-emerald-400 mb-2">
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
                  <div className="bg-emerald-500/5 rounded-xl p-4">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      Anahtar Bilgiler
                    </h3>
                    <div className="space-y-2">
                      {currentContent.keyPoints.map((point, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">{index + 1}.</span>
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
