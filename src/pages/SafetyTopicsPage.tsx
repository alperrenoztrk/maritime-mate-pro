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
    title: "Yangın Güvenliği",
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
    content: `SOLAS SÖZLEŞMESİNİN DOĞUŞU:

RMS Titanic'in 15 Nisan 1912'de batması, denizcilik dünyasında köklü değişikliklere yol açmıştır. 2.224 yolcu ve mürettebattan 1.514'ü hayatını kaybetmiş, bu felaket denizde can güvenliği konusundaki uluslararası düzenlemelerin gerekliliğini açıkça ortaya koymuştur.

İlk SOLAS sözleşmesi 1914 yılında kabul edilmiştir. Ancak I. Dünya Savaşı nedeniyle yürürlüğe girememiştir.

SOLAS SÖZLEŞME VERSİYONLARI:

1914 SOLAS: Titanic faciası sonrası ilk girişim. Yeterli cankurtaran sandal sayısı, radyo nöbeti ve buz devriye hizmetini öngörmüştür.

1929 SOLAS: Yangın güvenliği konusunda ilk kapsamlı düzenlemeler getirilmiştir.

1948 SOLAS: II. Dünya Savaşı deneyimlerinden yararlanılarak güncellenmiştir. IMO'nun (o zamanki adıyla IMCO) kurulmasına giden sürecin bir parçasıdır.

1960 SOLAS: IMO'nun ilk büyük başarısıdır. Teknik standartlar detaylandırılmıştır.

1974 SOLAS: Halen yürürlükte olan versiyon. "Tacit acceptance" (zımni kabul) prosedürü ile değişikliklerin daha hızlı yürürlüğe girmesi sağlanmıştır.

1988 Protokolü: Harmonize sörvey ve sertifika sistemi getirilmiştir.

ZIMNİ KABUL PROSEDÜRÜ:

1974 SOLAS'ın en önemli yeniliği zımni kabul (tacit acceptance) prosedürüdür. Bu sisteme göre, kabul edilen bir değişiklik, belirli bir tarihte yeterli sayıda devlet itiraz etmezse otomatik olarak yürürlüğe girer. Bu mekanizma, önceki versiyonlarda değişikliklerin yürürlüğe girmesinde yaşanan on yılları bulan gecikmeleri ortadan kaldırmıştır.`,
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
    content: `SOLAS BÖLÜM YAPISI:

Bölüm I – Genel Hükümler: Sözleşmenin uygulama alanı, sörvey ve sertifikasyon kuralları.

Bölüm II-1 – Yapı: Gemi yapısı, alt bölmeler, stabilite, makine ve elektrik tesisatı gereksinimleri. Hasar stabilitesi hesapları bu bölümde yer alır. Probabilistic damage stability yaklaşımı SOLAS 2009 değişiklikleriyle zorunlu hale gelmiştir.

Bölüm II-2 – Yangın Güvenliği: Yangın önleme, algılama ve söndürme. FSS Code (Fire Safety Systems Code) bu bölümün ayrılmaz parçasıdır. Yapısal yangın koruması, kaçış yolları, havalandırma sistemlerinin yangın durumunda kontrolü.

Bölüm III – Can Kurtarma Araçları: LSA Code (Life-Saving Appliances Code) ile birlikte uygulanır. Cankurtaran sandal ve sal gereksinimleri, piroteknik işaretler, kişisel koruma ekipmanları.

Bölüm IV – Radyo Haberleşmesi: GMDSS gereksinimleri. Deniz alanları (A1-A4) ve zorunlu ekipman.

Bölüm V – Seyir Emniyeti: Seyir cihazları, rota servisleri (routing), gemi raporlama sistemleri, VDR, AIS, ECDIS gereksinimleri.

Bölüm VI – Yük Taşıma: Yük güvenliği, dökme yük (IMSBC Code) ve konteyner doğrulanmış ağırlığı (VGM).

Bölüm VII – Tehlikeli Yük: IMDG Code, INF Code.

Bölüm VIII – Nükleer Gemiler.

Bölüm IX – Gemi İşletme Yönetimi: ISM Code zorunluluğu.

Bölüm X – Yüksek Hızlı Tekneler: HSC Code.

Bölüm XI-1 – Özel Tedbirler: Geliştirilmiş sörvey, tanıma numarası (IMO Number).

Bölüm XI-2 – Deniz Güvenliği: ISPS Code zorunluluğu.

Bölüm XII – Dökme Yük Gemileri İçin Ek Tedbirler.

Bölüm XIII – Doğrulama ve Uyum: IMO üye devlet denetim şeması (IMSAS).

Bölüm XIV – Kutup Bölgeleri: Polar Code zorunluluğu.`,
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
    content: `TEMEL SOLAS SERTİFİKALARI:

1. Yolcu Gemisi Güvenlik Sertifikası (Passenger Ship Safety Certificate): Yolcu gemilerinin SOLAS gereksinimlerine uygunluğunu belgeler. 12 aylık geçerlilik süresi vardır.

2. Yük Gemisi Yapı Güvenlik Sertifikası (Cargo Ship Safety Construction Certificate): Yük gemilerinin yapısal standartlara uygunluğunu belgeler. 5 yıl geçerlidir, yıllık sörvey şartıyla.

3. Yük Gemisi Donanım Güvenlik Sertifikası (Cargo Ship Safety Equipment Certificate): Can kurtarma, yangın söndürme ve seyir donanımlarının uygunluğunu belgeler. 5 yıl geçerlidir.

4. Yük Gemisi Radyo Güvenlik Sertifikası (Cargo Ship Safety Radio Certificate): GMDSS ekipmanlarının uygunluğunu belgeler. 5 yıl geçerlidir.

5. Uluslararası Gemi Güvenlik Sertifikası (ISSC – International Ship Security Certificate): ISPS Code uyumunu belgeler. 5 yıl geçerlidir.

6. SMC (Safety Management Certificate): ISM Code kapsamında geminin SMS'e uygunluğunu belgeler. 5 yıl geçerlidir.

7. DOC (Document of Compliance): ISM Code kapsamında şirketin uygunluğunu belgeler.

SÖRVEY TÜRLERİ:

Initial Survey: Geminin hizmete girmeden önce yapılan ilk sörveyi.
Annual Survey: Yıllık denetim; sertifika geçerliliğinin korunması için zorunludur.
Intermediate Survey: 5 yıllık süre içinde (2. veya 3. yılda) yapılan ara sörvey.
Renewal Survey: Sertifika yenilenmesi için yapılan kapsamlı sörvey.
Additional Survey: Onarım, değişiklik veya hasar sonrası yapılan ek sörvey.`,
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
    content: `SÖRVEY SİSTEMİ:

Harmonize sörvey ve sertifika sistemi (HSSC), tüm zorunlu sörvey tarihlerinin uyumlaştırılmasını sağlar. Bu sistem sayesinde geminin farklı sertifikaları için yapılan sörveyler mümkün olduğunca birleştirilerek operasyonel kesinti en aza indirilir.

BAYRAK DEVLETİ DENETİMİ:

Bayrak devleti, gemisinin uluslararası standartlara uygunluğunu sağlamakla yükümlüdür. Bu denetimleri doğrudan veya yetkilendirilmiş sınıflandırma kuruluşları (RO – Recognized Organization) aracılığıyla gerçekleştirir.

LİMAN DEVLETİ DENETİMİ (PSC):

Port State Control, yabancı bayraklı gemilerin limandaki denetimini kapsar. Paris MoU, Tokyo MoU gibi bölgesel anlaşmalar çerçevesinde uygulanır.

PSC denetiminde kontrol edilen başlıca hususlar:
- Sertifikaların geçerliliği ve güncelliği
- Mürettebat yeterlilikleri ve nöbet düzenlemeleri
- Can kurtarma ve yangın söndürme ekipmanlarının çalışır durumda olması
- Seyir cihazlarının durumu
- ISM ve ISPS Code uyumu
- Çevresel gereksinimler (MARPOL)

TUTMA (DETENTION):

Gemide "clearly hazardous" (açıkça tehlikeli) eksiklik tespit edilirse gemi tutulur. Tutma, gemi işletmecisi için ciddi mali ve itibar kaybına neden olur. Tutma oranları şirketin ve bayrak devletinin hedefleme profilini doğrudan etkiler.

SERTİFİKA UZATMA:

Zorunlu hallerde sertifika süresi en fazla 3 ay uzatılabilir. Uzatma istisnai durumlarda uygulanır ve normal bir uygulama olarak kabul edilmez.`,
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
    content: `SON DÖNEM ÖNEMLİ DEĞİŞİKLİKLER:

VGM (Verified Gross Mass) – 2016: SOLAS Bölüm VI, Kural 2 değişikliği ile konteyner brüt ağırlıklarının doğrulanmış olarak bildirilmesi zorunlu hale gelmiştir. MSC Flaminia ve diğer konteyner gemisi kazaları bu düzenlemenin tetikleyicisi olmuştur.

ECDIS Zorunluluğu: SOLAS Bölüm V, Kural 19.2 ile yeni gemilerde ECDIS kullanımı aşamalı olarak zorunlu hale gelmiştir. Kağıt harita kullanımı yedek olarak devam edebilir.

Polar Code – 2017: SOLAS Bölüm XIV ile kutup bölgelerinde seyreden gemiler için yapısal, operasyonel ve çevresel gereksinimler belirlenmiştir.

IGF Code – 2017: Doğal gaz veya düşük parlama noktalı yakıt kullanan gemiler için güvenlik gereksinimleri.

SOLAS III/17.1 (Cankurtaran Sandal Bakımı): Cankurtaran sandalların periyodik bakım ve servis gereksinimleri güncellenmiştir. Üretici onaylı servis istasyonu zorunluluğu getirilmiştir.

Siber Güvenlik – MSC.428(98): ISM Code kapsamında siber risk yönetiminin SMS'e entegre edilmesi zorunlu hale gelmiştir (1 Ocak 2021 itibariyle).

SOLAS II-1/3-12 (Hedeflenmiş Yapısal Standartlar – GBS): Yeni tanker ve dökme yük gemilerinin yapısal tasarımının hedef bazlı standartlara uygun olması zorunluluğu.`,
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
    content: `YANMA TEORİSİ:

Yanma, bir maddenin oksijenle ekzotermik (ısı açığa çıkaran) reaksiyona girmesidir. Bu reaksiyonun başlayabilmesi için üç unsurun aynı anda mevcut olması gerekir:

1. Yanıcı madde (fuel): Katı, sıvı veya gaz formunda olabilir. Sıvı yakıtlar doğrudan yanmaz; yüzeylerinden buharlaşan gazlar yanar.

2. Oksijen: Atmosferde hacimce %21 oranında bulunur. Yanma için minimum %16 oksijen konsantrasyonu gereklidir. %16'nın altında çoğu yanıcı madde yanmaz.

3. Tutuşma enerjisi (ısı): Yanıcı maddeyi tutuşma sıcaklığına ulaştıracak enerji kaynağı. Kıvılcım, sıcak yüzey, elektrik arkı, sürtünme gibi kaynaklar.

YANGIN TEMELİNDE DÖRT UNSURLU MODEL:

Modern yangın teorisi, üçgene ek olarak "zincirleme kimyasal reaksiyon" unsurunu da içerir. Bu dört unsurlu model "yangın dörtgeni" (fire tetrahedron) olarak adlandırılır. Halon gibi söndürücüler kimyasal reaksiyonu keserek yangını söndürür.

TUTUŞMA SICAKLIĞI VE PARLAMA NOKTASI:

Flash Point (Parlama Noktası): Sıvı yakıtın yüzeyinden yeterli buhar oluşturarak bir dış ateş kaynağıyla kısa süreli alevlenmeye yol açtığı en düşük sıcaklık. HFO için >60°C, benzin için -43°C'dir.

Fire Point (Yangın Noktası): Sürekli yanmanın başladığı sıcaklık. Parlama noktasından birkaç derece yüksektir.

Auto-Ignition Temperature (Kendiliğinden Tutuşma Sıcaklığı): Dış ateş kaynağı olmaksızın maddenin kendiliğinden tutuştuğu sıcaklık. Dizel yakıt için yaklaşık 210°C'dir.

YANMA ÜRÜNLERİ:

Tam yanma: CO₂ + H₂O + ısı oluşur. Yeterli oksijen mevcuttur.
Eksik yanma: CO (karbon monoksit) + kurum + zehirli gazlar oluşur. Yetersiz oksijen ortamında gerçekleşir. Denizde yangın ölümlerinin %75'inden fazlası duman zehirlenmesinden kaynaklanır.`,
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
    content: `YANGIN SINIFLARI:

Sınıf A – Katı Maddeler: Ahşap, kumaş, kağıt, plastik gibi organik katıların yangınıdır. Soğutma prensibiyle söndürülür. Su en etkili söndürücüdür. Korlar kalabilir, tekrar alevlenme riski vardır.

Sınıf B – Yanıcı Sıvılar: Yakıt, yağ, boya, çözücü gibi yanıcı sıvıların yangınıdır. Boğma prensibiyle söndürülür. Köpük (foam), CO₂, kuru kimyevi toz kullanılır. Su ile söndürülmez; su sıçratarak yangını yayabilir.

Sınıf C – Yanıcı Gazlar: LPG, LNG, asetilen gibi gazların yangınıdır. Gaz akışı kesilmeden söndürme yapılmaz, aksi halde patlama riski doğar. Kuru kimyevi toz, CO₂.

Sınıf D – Yanıcı Metaller: Alüminyum, magnezyum, titanyum, sodyum. Özel kuru toz söndürücüler gerekir. Su kesinlikle kullanılmaz, şiddetli reaksiyona girebilir.

Sınıf E/F – Elektrik / Pişirme Yağları: Elektrik yangınında önce enerji kesilir, sonra CO₂ veya kuru toz kullanılır. Pişirme yağı yangınlarında ıslak kimyevi söndürücüler kullanılır.

GEMİDE YANGIN TEHLİKE BÖLGELERİ:

Makine dairesi: En yüksek yangın riski. Yakıt sızıntısının sıcak yüzeyle teması başlıca nedendir. Sabit CO₂ veya FM-200 sistemi mevcuttur.
Mutfak (galley): Pişirme yağı yangını riski. Sabit söndürme sistemi zorunludur.
Yük ambarları: Dökme yük yangını, konteyner yangını. CO₂ inerting veya su spreyi.
Boyahane: Yanıcı boya ve çözücüler. Havalandırma ve depolama kuralları kritiktir.
Akomodasyon: Sigara, elektrik arızası. Duman dedektörleri ve sprinkler sistemi.`,
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
    content: `ALGILAMA PRENSİPLERİ:

Duman Dedektörleri:
- İyonizasyon tipi: Radyoaktif kaynak (Americium-241) kullanır. Duman partikülleri iyonizasyon akımını bozarak alarm verir. Hızlı yanan, az duman üreten yangınlarda etkilidir.
- Fotoelektrik (optik) tip: Işık saçılması prensibine dayanır. Duman partikülleri ışığı saçtığında fotosensör alarm verir. Ağır duman üreten yangınlarda daha duyarlıdır.
- Lazer tipi: En hassas tip. Çok erken aşamada duman tespiti yapabilir.

Isı Dedektörleri:
- Sabit sıcaklık tipi: Belirli bir sıcaklığa (genellikle 57°C veya 72°C) ulaşıldığında alarm verir.
- Hız artış tipi (rate-of-rise): Sıcaklık artış hızı belirli bir eşiği aştığında alarm verir. Normalde 8-10°C/dakika.
- Kombine tip: Her iki prensibi birleştirir.

Alev Dedektörleri:
- UV (ultraviyole) sensör: Alevin yaydığı UV radyasyonu algılar.
- IR (kızılötesi) sensör: Alevin yaydığı IR radyasyonu algılar.
- UV/IR kombine: Yanlış alarm oranını azaltır.

YANGIN ALARM SİSTEMİ:

Yangın alarm paneli köprüüstünde bulunur. Bölgesel (zone) alarm gösterimi sağlar. Her bölgenin alarm durumu ayrı olarak izlenir. SOLAS II-2'ye göre yangın algılama ve alarm sistemi sürekli izlenmelidir. Yedek güç kaynağı en az 36 saat kapasiteli olmalıdır.

DUMAN ÖRNEKLEMELİ SİSTEM:

Yük ambarlarında kullanılan aspirasyon tipi sistemdir. Boru hattı ile her bölmeden hava örneği çekilerek merkezi dedektörde analiz edilir. Konteyner gemilerinde ve Ro-Ro araç güvertelerinde yaygındır.`,
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
    content: `SÖNDÜRÜCÜ TİPLERİ:

Su Söndürücü (9 litre): Sınıf A yangınlarda kullanılır. Soğutma prensibiyle çalışır. Elektrik yangınlarında ve sıvı yangınlarda kullanılmaz.

Köpük Söndürücü (9 litre): Sınıf A ve B yangınlarda kullanılır. Yüzey örtme ve soğutma prensibiyle çalışır. AFFF (Aqueous Film Forming Foam) tipik köpük türüdür.

Kuru Kimyevi Toz Söndürücü (9 kg): Tüm sınıf yangınlarda kullanılabilir (ABC tipi). Kimyasal reaksiyonu kesme prensibiyle çalışır. Yeniden alevlenmeyi önlemez; soğutma etkisi düşüktür.

CO₂ Söndürücü (5 kg): Sınıf B ve elektrik yangınlarında kullanılır. Boğma prensibiyle çalışır. Artık bırakmaz; elektronik ve mekanik ekipman alanlarında tercih edilir. Kapalı alanda kullanımda boğulma riski mevcuttur.

KULLANIM TEKNİĞİ (PASS YÖNTEMİ):

P – Pull: Pimi çekin.
A – Aim: Hortumu yangının tabanına yöneltin.
S – Squeeze: Tetik kolunu sıkın.
S – Sweep: Süpürme hareketi ile tabana doğru yayarak söndürün.

YERLEŞTİRME KURALLARI:

SOLAS II-2'ye göre taşınabilir söndürücüler belirli aralıklarla ve erişilebilir konumlarda yerleştirilmelidir. Makine dairesinde en az bir köpük söndürücü bulunmalıdır. Mutfakta yanıcı yağ söndürücüsü zorunludur. Söndürücüler yıllık bakıma ve periyodik basınç testine tabidir.`,
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
    content: `CO₂ SABİT SİSTEM:

Makine dairesi ve yük ambarlarında kullanılır. Yangını oksijen konsantrasyonunu düşürerek söndürür. Boşaltma öncesi bölmedeki tüm personel tahliye edilmelidir – CO₂ ölümcüldür.

CO₂ sistemi bileşenleri: Yüksek basınçlı CO₂ tüpleri (genellikle CO₂ odasında), pilot tüp, ana valf, alarm sistemi, dağıtım boruları ve nozullar. Makine dairesinde boşaltma öncesi 20 saniyelik sesli ve görsel ön alarm verilir.

CO₂ miktarı hesabı (FSS Code Bölüm 5): Makine dairesi için, en büyük makine mahallinin brüt hacminin %40'ı (kapsam/casing hariç) veya toplam hacminin %35'i (casing dahil) — hangisi büyükse o esas alınır; yük ambarları için en büyük ambar brüt hacminin %30'u oranında CO₂ gereklidir. Makine mahallinde gerekli gazın %85'i ilk 2 dakikada boşaltılabilmelidir.

KÖPÜK (FOAM) SİSTEMİ:

Tanker güvertesinde ve makine dairesinde kullanılır. Yüzey örtme ve soğutma prensibiyle çalışır.

Düşük genleşmeli köpük (expansion ratio <20): Tanker güverte söndürmesinde kullanılır.
Orta genleşmeli köpük (20-200): Makine dairesi ve kapalı alanlar.
Yüksek genleşmeli köpük (>200): Büyük hacimli kapalı alanlarda kullanılır.

SU SPRİNKLER SİSTEMİ:

Yolcu gemilerinde akomodasyon alanlarında zorunludur. Otomatik çalışır; sprinkler başlıkları belirli sıcaklıkta (genellikle 68°C veya 79°C) aktive olur. Cam ampul veya fusible link ile tetiklenir.

SU SİSİ (WATER MIST) SİSTEMİ:

Küçük su damlacıkları ile büyük soğutma yüzeyi oluşturur. Düşük su tüketimi. Makine dairesi ve yaşam alanlarında kullanılır. Halon alternatifi olarak geliştirilmiştir.

FM-200 (HFC-227ea):

Temiz söndürücü gaz. Halon 1301'in çevre dostu alternatifi. Kimyasal reaksiyonu kesme ve soğutma prensibiyle çalışır. Artık bırakmaz. Kontrol odaları ve elektronik ekipman alanlarında kullanılır.`,
    keyPoints: [
      "CO₂ sistemi boşaltma öncesi 20 saniyelik ön alarm zorunludur",
      "CO₂ ölümcüldür, bölmedeki tüm personel tahliye edilmelidir",
      "Makine dairesi CO₂ kapasitesi: hacmin minimum %35'i",
      "Su sisi (water mist) halon alternatifi olarak yaygınlaşmaktadır",
    ],
    warnings: [
      "CO₂ boşaltma öncesi bölmede insan olmadığından EMİN olunmalıdır",
      "CO₂ odasına giriş prosedürleri sıkı şekilde uygulanmalıdır",
    ],
  },
  "fire-fighting-proc": {
    title: "Yangınla Mücadele Prosedürleri",
    introduction: "Gemide yangınla etkili mücadele, organize ekip çalışması ve standart prosedürlerin uygulanmasını gerektirir.",
    content: `YANGIN ALARM PROSEDÜRÜ:

1. Yangını keşfeden kişi derhal alarm verir ve köprüüstünü bilgilendirir.
2. Yangının yeri, türü ve büyüklüğü rapor edilir.
3. Genel alarm çalınır (7 kısa + 1 uzun düdük).
4. Mürettebat yangın istasyonlarına koşar ve görev dağılımına uygun pozisyon alır.

BOUNDARY COOLING (SINIR SOĞUTMA):

Yangının komşu bölmelere yayılmasını önlemek için yangın bulunan bölmenin sınır perdeleri (bulkhead, güverte) dışarıdan su ile soğutulur. Bu uygulama yapısal bütünlüğün korunması için kritiktir.

MAKİNE DAİRESİ YANGINI:

1. Yakıt vanalarını kapat (quick closing valves).
2. Havalandırmayı durdur, damperları kapat.
3. Bölmedeki personeli tahliye et.
4. Sabit söndürme sistemini devreye al (CO₂ veya FM-200).
5. Sınır soğutma uygula.
6. Yangının söndüğünden emin olmadan bölmeyi açma.

YANGIN EKİP ORGANİZASYONU:

No. 1 Ekip (Taarruz): Tam donanımlı yangın söndürme kıyafeti, SCBA (nefes cihazı), yangın hortumu ile müdahale.
No. 2 Ekip (Yedek/Destek): No. 1 ekibin yedek ekibidir. Sınır soğutma ve lojistik destek.
No. 3 Ekip (Teknik): Havalandırma kontrolü, vana operasyonları, pompa kontrolü.
Tıbbi ekip: İlk yardım müdahalesi.

SCBA KULLANIMI:

Self-Contained Breathing Apparatus, kapalı devre nefes cihazıdır. Yangına müdahale eden personel SCBA takmak zorundadır. Tüp kapasitesi genellikle 30 dakikadır. Giriş öncesi tüp basıncı kontrol edilir. Buddy system (ikili çalışma) zorunludur.`,
    keyPoints: [
      "Genel yangın alarmı: 7 kısa + 1 uzun düdük",
      "Makine dairesi yangınında önce yakıt vanaları kapatılır",
      "SCBA kullanımı zorunludur, buddy system uygulanır",
      "Sınır soğutma yangının yayılmasını önlemek için kritiktir",
    ],
    warnings: [
      "Yangının söndüğünden emin olmadan bölme açılmamalıdır – flashback riski",
      "SCBA olmadan duman dolu alana girilmez",
    ],
  },
  "engine-room-fire": {
    title: "Makine Dairesi Yangınları",
    introduction: "Makine dairesi, gemide en yüksek yangın riskine sahip bölgedir. Yakıt sızıntısı, sıcak yüzeyler ve elektrik arızaları başlıca yangın nedenleridir.",
    content: `BAŞLICA NEDENLER:

1. Yakıt sızıntısı: Yüksek basınçlı yakıt hattı arızası, flanş sızıntısı veya conta kaçağı sonucu yakıtın sıcak yüzeye (egzoz manifoldu, turboşarj gövdesi) teması. Sıcak yüzey sıcaklığı 220°C'yi aştığında HFO parlama noktasını çoktan geçmiş olur.

2. Yağ sızıntısı: Yağlama yağı veya hidrolik yağ sızıntısı.

3. Elektrik arızası: Kablo izolasyonu bozulması, gevşek bağlantılar, aşırı yük.

4. Ekonomizer yangını: Kurum (soot) birikimi sonucu ekonomizer içinde yangın çıkması.

5. Scavenge fire: Süpürme havası kanalında yağ ve karbon birikimi sonucu yangın.

ÖNLEME TEDBİRLERİ:

Yakıt hattı lagging (ısı yalıtımı): Sıcak yüzeylerin yalıtılması, sızıntı halinde yakıtın sıcak yüzeye ulaşmasını geciktirir.
Drip tray: Sızıntı toplama tavası; yakıt ve yağ kaçaklarını toplar.
Quick closing valves: Uzaktan kumandalı hızlı kapama vanaları; yangında yakıt akışını keser.
Düzenli bakım: Flanş, conta, hortum ve bağlantıların periyodik kontrolü.
Temizlik: Yağ birikintilerinin düzenli temizlenmesi.

ACİL MÜDAHALE:

1. Quick closing valve'ları kapat
2. Yakıt pompalarını durdur
3. Havalandırma fanlarını durdur, yangın damperlerini kapat
4. Personeli tahliye et
5. CO₂ veya FM-200 sistemini devreye al
6. Sınır soğutma başlat
7. Makineyi tam olarak izole et

REİGNITION RİSKİ:

Yangın söndürüldükten sonra sıcak yüzeyler soğumadan bölme açılırsa taze hava girişiyle reignition (yeniden tutuşma) oluşabilir. Bölme en az 24 saat kapalı tutulmalı ve sıcaklık ölçümleri yapılmalıdır.`,
    keyPoints: [
      "Makine dairesi yangınlarının %90'ı yakıt/yağ sızıntısından kaynaklanır",
      "Sıcak yüzey sıcaklığı >220°C ise HFO tutuşma riski yüksektir",
      "Yangın söndürüldükten sonra en az 24 saat bölme açılmamalıdır",
      "Quick closing valve'lar düzenli test edilmelidir",
    ],
    warnings: [
      "Söndürme sonrası reignition riski nedeniyle bölme erken açılmamalıdır",
      "Lagging (yalıtım) hasarlıysa derhal onarılmalıdır",
    ],
  },
  "fire-drills": {
    title: "Yangın Tatbikatları ve SOLAS Gereksinimleri",
    introduction: "SOLAS III/19.3 gereği yangın tatbikatları düzenli aralıklarla yapılmalı ve tüm mürettebatın katılımı sağlanmalıdır.",
    content: `TATBİKAT SIKLIĞI:

SOLAS Bölüm III, Kural 19.3: Yangın tatbikatı en az ayda bir yapılmalıdır. Herhangi bir limandan kalkışta mürettebatın %25'inden fazlası değişmişse, kalkıştan sonraki 24 saat içinde tatbikat yapılmalıdır.

ZORUNLU TATBİKAT TAKVİMİ (SOLAS III/19.3):
- Gemiyi terk (abandon ship) tatbikatı: yük gemilerinde ayda en az 1; yolcu gemilerinde haftada 1.
- Yangın tatbikatı: yük gemilerinde ayda en az 1; yolcu gemilerinde haftada 1.
- Her cankurtarma sandalı denize indirilip suda manevra ettirilmeli: en az 3 ayda 1.
- Kurtarma botu (rescue boat) denize indirilip manevra ettirilmeli: mümkün olduğunca ayda 1.
- Serbest düşüşlü (free-fall) sandal: en az 6 ayda 1 fiili veya benzetilmiş (simulated) indirme tatbikatı.
- Kapalı alana giriş ve kurtarma tatbikatı: en az 2 ayda 1 (SOLAS III/19.3.3).
- Her mürettebat üyesi 1 ay içinde bir gemiyi terk tatbikatına katılmalıdır.

TATBİKAT İÇERİĞİ:

1. Genel alarm çalınması ve mürettebatın yangın istasyonlarına toplanması
2. Yangın ekiplerinin tam donanımlı olarak hazırlanması
3. SCBA kullanımı ve kontrolleri
4. Yangın hortumu açma, bağlama ve kullanma
5. Yangın pompası ve sabit söndürme sistemi kontrolü
6. Havalandırma ve yangın damper kontrolü
7. Quick closing valve operasyonu
8. Boundary cooling uygulaması
9. Acil kaçış yollarının kontrolü
10. İlk yardım müdahalesi

KAYIT VE DOKÜMANTASYON:

Tüm tatbikatlar Official Log Book'a kaydedilir. Tarihi, süresi, senaryo detayları, katılımcılar ve tespit edilen eksiklikler yazılır. PSC denetiminde tatbikat kayıtları kontrol edilir. Eksiklik durumunda detainable deficiency olarak işlem yapılabilir.

SENARYOLAR:

Tatbikatlar farklı senaryolarla yapılmalıdır: makine dairesi yangını, galley yangını, akomodasyon yangını, yük ambarı yangını. Her senaryo için farklı söndürme yöntemleri ve ekip koordinasyonu uygulanmalıdır.`,
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
    content: `LSA CODE YAPISI:

LSA Code, can kurtarma araçlarının tasarım, performans ve test gereksinimlerini kapsar. SOLAS Bölüm III kurallarının zorunlu kıldığı tüm can kurtarma ekipmanlarının teknik özelliklerini tanımlar.

TEMEL KATEGORİLER:

Bölüm I – Genel: Uygulama alanı, tanımlar.
Bölüm II – Kişisel Can Kurtarma Araçları: Can yeleği, can simidi, dalma elbisesi (immersion suit), thermal protective aid (TPA).
Bölüm III – Görsel İşaretler: Piroteknik araçlar (paraşüt fişeği, el meşalesi, duman işareti).
Bölüm IV – Cankurtaran Araçları: Cankurtaran sandal ve sal gereksinimleri.
Bölüm V – İndirme ve Binme Düzenleri: Davit, vinç ve indirme sistemleri.
Bölüm VI – Diğer: Fırlatma tipi kurtarma araçları.

GENEL GEREKSINIMLER:

Tüm can kurtarma araçları deniz koşullarına, UV ışınlarına, sıcaklık değişimlerine ve yağmur suyuna dayanıklı olmalıdır. Retroreflektif bant ile donatılmalıdır. Tüm kişisel can kurtarma araçları IMO onaylı olmalı ve periyodik bakım/test kayıtları tutulmalıdır.`,
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
    content: `SANDAL TİPLERİ:

Tamamen kapalı sandal (Totally Enclosed Lifeboat – TELB): SOLAS gereği yük gemilerinde standart tiptir. Devrilme durumunda kendini düzeltebilir (self-righting). Motor, su pompası, havalandırma, ilk yardım malzemesi ve gıda/su bulunur.

Kısmi kapalı sandal: Yolcu gemilerinde bulunabilir.

Serbest düşme sandalı (Free-fall Lifeboat): Tanker ve dökme yük gemilerinde kıç güverteye monte edilir. Belirli bir yükseklikten serbest düşüşle denize atılır. Minimum 1.0g serbest düşüş kapasitesi. Mürettebat özel koltuklara emniyet kemerleri ile bağlanır.

SANDAL DONANIMII:

Zorunlu donanım listesi (kısmi):
- Motor (6 knot hız kapasitesi)
- El ve mekanik dümen
- Pusula ve deniz haritası
- Yiyecek (10.000 kJ/kişi) ve tatlı su (3 litre/kişi)
- İlk yardım seti
- Piroteknik işaretler (4 paraşüt fişeği, 6 el meşalesi, 2 yüzen duman işareti — LSA Code 4.4.8)
- Radar reflektörü veya SART
- El feneri ve pil
- Denizaltı fişeği (2 adet)
- Kürek, yüzdürme kemeri
- Deniz çapası (sea anchor)
- Hayatta kalma el kitabı

KAPASİTE HESABI:

Yük gemilerinde: Her borda için tüm mürettebatı alacak kapasitede sandal bulunmalıdır. Yani toplam sandal kapasitesi mürettebat sayısının 2 katıdır.

Yolcu gemilerinde: Farklı gereksinimler uygulanır; sandal + sal kombinasyonu ile toplam kapasite sağlanır.`,
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
    content: `SAL TİPLERİ:

SOLAS A Tipi (Davitli): Davit ile indirilen sal. Yolcu gemilerinde ve büyük yük gemilerinde bulunur. İndirme hızı kontrollüdür.

SOLAS B Tipi (Atmalı): Geminin borda yüksekliğinden denize atılarak şişirilen sal. Otomatik şişirme mekanizması ile donatılmıştır. Geminin batması durumunda hidrostatik serbest bırakma ünitesi (HRU) ile otomatik olarak serbest kalır ve şişer.

HİDROSTATİK SERBEST BIRAKMA (HRU):

HRU, gemi 2-4 metre derinliğe battığında su basıncı ile otomatik olarak aktive olur. Bağlama kelepçesini serbest bırakır, sal yüzeye çıkar ve painter halatının gerilmesiyle otomatik şişer. Can salı her 12 ayda bir yetkili serviste bakımdan geçirilir; HRU ise bakımı yapılmayan (disposable) bir parçadır ve üzerinde işaretli son kullanma tarihinde, normalde 2 yılda bir yenilenir.

SAL DONANIMI:

Zorunlu donanım SOLAS Pack A veya B olarak ikiye ayrılır:
Pack A (24 saatten uzun): Su, gıda, kürek, deniz çapası, ilk yardım, piroteknik, tamir takımı, pompa, fener.
Pack B (24 saate kadar): Daha az gıda/su, temel piroteknik ve donanım.

BAKIM VE SERVİS:

Şişirilebilir sallar 12 ayda bir yetkili servis istasyonunda bakıma tabi tutulmalıdır. 5 yılda bir tam test. HRU periyodik olarak değiştirilir. Bakımlar sertifikalı personel tarafından yapılmalıdır.`,
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
    content: `KURTARMA BOTU GEREKSİNİMLERİ:

SOLAS III/17.1 gereği her gemide en az bir kurtarma botu bulunmalıdır. Kurtarma botu cankurtaran sandal yerine geçebilir; bu durumda sandal kapasitesi buna göre düzenlenir.

TEKNİK ÖZELLİKLER:

Minimum 6 knot hız kapasitesi. En az 5 kişi taşıma kapasitesi (1 yaralı yatırılabilmeli). Rijit veya şişirilebilir gövde. Self-righting özelliği (devrilme sonrası kendini düzeltme). Çekme kancası ve emniyet hattı. Motor: Dıştan takma veya içten.

KULLANIM ALANLARI:

1. Denize düşen kişinin kurtarılması (MOB)
2. Denizde sürüklenen salların toplanması
3. Kıyıya yakın arama operasyonları
4. SAR destek operasyonları
5. Kılavuz transferi (pilot ladder ile birlikte)

İNDİRME VE BIRAKMA:

Kurtarma botu, davit sistemi ile hızlıca indirilebilmelidir. SOLAS gereği 5 dakika içinde indirilmesi ve hazır hale getirilmesi gerekir. Denize düşme alarmı verildiğinde kurtarma botu ekibi derhal göreve hazırlanmalıdır.`,
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
    content: `CAN YELEĞİ (LIFE JACKET):

SOLAS gereği gemideki her kişi için bir can yeleği, ayrıca vardiya pozisyonlarında ek yelek bulundurulmalıdır. Yolcu gemilerinde çocuk yelekleri de zorunludur.

Performans gereksinimleri: Bilinci kapalı kişiyi 5 saniye içinde ağzı su yüzeyinin üstünde kalacak şekilde yüzü yukarı (sırtüstü) güvenli pozisyona çevirebilmeli. En az 15.5 kg kaldırma kuvveti. Düdük, ışık (1 cd, 8 saat) ve retroreflektif bant ile donatılmış olmalı.

CAN SİMİDİ (LIFE BUOY):

Asgari can simidi sayısı gemi boyuna göre belirlenir. En az 2 adedi her bordada, hızla denize bırakılabilir konumda. En az yarısı MOB (man-overboard) ışığı ile, en az 2 adedi ayrıca otomatik duman işareti ile donatılmış olmalı; en az 1 adedi 30 metre yüzer halatlı (buoyant line) olmalıdır.

Asgari sayı tablosu (SOLAS III):
- Yük gemileri (Kural 32): <100 m = 8; 100-150 m = 10; 150-200 m = 12; ≥200 m = 14.
- Yolcu gemileri (Kural 22): <60 m = 8; 60-120 m = 12; 120-180 m = 18; 180-240 m = 24; ≥240 m = 30.

PİROTEKNİK İŞARETLER (Gemi seviyesi):
Köprüüstünde veya yakınında en az 12 paraşütlü işaret fişeği (rocket parachute flare) bulundurulur (SOLAS III/6.3). Bu, her filikada bulunan piroteknik donanımdan (4 paraşütlü işaret fişeği, 6 el maytabı, 2 yüzer duman işareti) ayrıdır.

DALMA ELBİSESİ (IMMERSION SUIT):

Soğuk sularda gemiyi terk etme durumunda vücut ısısını korumak için tasarlanmıştır. Dar su geçirmez elbise. Vücut sıcaklığı kaybını 6 saat boyunca 2°C'nin altında tutar. Can yeleği olmadan 70 N kaldırma kuvveti sağlar. SOLAS gereği soğuk sularda seyreden gemilerde zorunludur.

TERMAL KORUYUCU (TPA – Thermal Protective Aid):

Su geçirmez, rüzgar geçirmez torba şeklinde giysi. İmmersion suit bulunmayan kişiler için salda veya sandalda kullanılır. Vücut ısı kaybını yavaşlatır.`,
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
    content: `PİROTEKNİK TÜRLER:

PARAŞÜT FİŞEĞİ (Rocket Parachute Flare): En az 300 metre yüksekliğe fırlatılır. Paraşütle inerek en az 40 saniye boyunca minimum 30.000 kandela kırmızı ışık yayar. Gece ve gündüz görülebilir. 40 km mesafeden tespit edilebilir. Rüzgara karşı hafif eğik açı ile ateşlenir.

EL MESALESİ (Hand Flare): El ile tutulan kırmızı meşale. En az 1 dakika boyunca 15.000 kandela ışık yayar. Yakın mesafe işaretlemesi için kullanılır. Kurtarma helikopteri veya gemisine konum göstermek için etkilidir.

YÜZEN DUMAN İŞARETİ (Buoyant Smoke Signal): Turuncu renkli duman yayar. En az 3 dakika süreyle etkilidir. Gündüz saatlerinde kullanılır. Deniz yüzeyine bırakılır, rüzgar yönünde duman yayılır.

KULLANIM KURALLARI:

Piroteknik araçlar seri numarası ve son kullanma tarihi ile etiketlenmiştir. Son kullanma tarihinden sonra kullanılmamalıdır (ancak gemide yedek olarak bulundurulabilir). Kullanırken rüzgarın yönüne dikkat edilmelidir. Paraşüt fişeği rüzgar altına doğru ateşlenmeli, yanarak gemiye düşmesi önlenmelidir.

STCW GEREKSİNİMLERİ:

Tüm gemiadamları piroteknik araçların kullanımı konusunda eğitim almak zorundadır. Tatbikat sırasında süresi dolmuş piroteknik araçlarla pratik yapılabilir.`,
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
    content: `HAFTALIK KONTROLLER:

Her hafta tüm can kurtarma araçları ve indirme donanımı görsel olarak kontrol edilir. Can sandal motorları çalıştırılır (en az 3 dakika). Quick closing valve'lar, indirme teleri ve kancalar kontrol edilir. Kayıtlar Log Book'a işlenir.

AYLIK KONTROLLER:

Can yeleği, can simidi, piroteknik stokları kontrol edilir. EPIRB ve SART test edilir. Radyo ekipmanı test edilir. Acil aydınlatma kontrol edilir.

YILLIK KONTROLLER:

Davit ve vinçlerin yük testi (5 yılda bir). Wire rope'ların muayenesi ve değişim kaydı. Cankurtaran sandallarının tam fonksiyonel testi (motor, donanım, su geçirmezlik).

SANDAL BAKIM:

Haftalık motor çalıştırma. Aylık donanım kontrolü. Yıllık üretici onaylı servis. Davit vinç yağlama ve wire muayene. On-load ve off-load release gear testi.

ÖNEMLİ NOT: MSC.1/Circ.1206 gereği cankurtaran sandallarının bakımı üretici yetkili servis istasyonları tarafından yapılmalıdır. Yetkilendirilmemiş bakım güvenlik riski oluşturur ve SOLAS ihlali sayılır.`,
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
    content: `KARAR SÜRECİ:

Gemiyi terk etme kararı, geminin artık mürettebat ve yolcuların güvenliğini sağlayamayacağı durumda verilir. Kaptan, tüm alternatifleri değerlendirdikten sonra bu kararı verir. Temel kural: "Gemi, cankurtaran sandaldan daha büyük bir cankurtaran sandalıdır" – gemide kalma her zaman tercih edilir, terk etme son çaredir.

TERK KARARININ VERİLDİĞİ DURUMLAR:

1. Kontrol edilemeyen yangın
2. Geniş çaplı su alma ve batma riski
3. Yapısal bütünlüğün ciddi tehlikede olması
4. Kontrol edilemeyen gaz sızıntısı veya kimyasal tehlike

YETKİ ZİNCİRİ:

Terk kararı yalnızca kaptan tarafından verilir. Kaptanın yokluğu veya görev yapamaz durumda olması halinde başkaptan (chief officer) bu yetkiyi devralır. Terk emri genel alarm ve PA sistemiyle tüm gemiye duyurulur.`,
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
    content: `MUSTER LIST:

SOLAS III/8 gereği her gemide bir Muster List bulunmalıdır. Görev dağılımı mürettebat listesine göre hazırlanır ve herkesin görevi açık şekilde tanımlanır. Muster List, köprüüstü, makine dairesi kontrol odası ve mürettebat yaşam alanlarında asılı olmalıdır.

GÖREV GRUPLARI:

1. Köprüüstü ekibi: Haberleşme, alarm kontrolü, seyir güvenliği
2. Makine dairesi ekibi: Yakıt kesme, havalandırma kontrolü, pompa operasyonu
3. Can kurtarma ekibi: Sandal/sal hazırlama ve indirme
4. Yangın ekibi: Yangınla mücadele
5. Tıbbi ekip: İlk yardım, tıbbi müdahale
6. Yolcu rehberlik ekibi (yolcu gemilerinde): Yolcuları toplanma noktalarına yönlendirme

TOPLANMA İSTASYONLARI:

Her toplanma noktası açıkça işaretlenmiş ve aydınlatılmış olmalıdır. IMO sembolleri kullanılır. Toplanma istasyonundan embarkasyon (binme) noktasına erişim kolay olmalıdır.

ALARM İŞARETLERİ:

Genel alarm: 7 kısa + 1 uzun düdük sesi
Yangın alarmı: Sürekli çalan zil/düdük
Gemiyi terk alarmı: Genel alarm + PA ile terk emri`,
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
    content: `TERK PROSEDÜRÜ ADIMLARI:

1. HAZIRLIK: Kaptan terk kararı verir ve genel alarm çalınır. MAYDAY çağrısı yapılır. EPIRB aktive edilir. SART hazırlanır.

2. TOPLANMA: Mürettebat ve yolcular toplanma istasyonlarına gelir. Can yelekleri giyilir. Yoklama yapılır. İmmersion suit giyme durumu değerlendirilir.

3. EMBARKASYON: Sandal/sal ekipleri görev yerlerine geçer. Davit sistemleri hazırlanır. Embarkasyon merdiveni veya rampa kullanılır. Öncelik: yaralılar, çocuklar, kadınlar, yaşlılar.

4. BIRAKMA: Davit ile kontrollü indirme. Sandal denize ulaştığında kanca serbest bırakılır (on-load release). Sal atılır (throw-over veya davit indirme). Serbest düşme sandal ise release mekanizması aktive edilir.

5. UZAKLAŞMA: Sandallar ve sallar gemiden en az 200 metre uzaklaşır (emme etkisi ve patlama riski). Sal ve sandallar bir araya toplanır. Deniz çapası atılır. Hayatta kalma prosedürleri başlatılır.

ÖNEMLİ İLKELER:

Gemiden denize atlamak son çaredir. Atlanacaksa: can yeleği sıkıca bağlanır, ağız ve burun bir elle kapatılır, ayaklar birleştirilir, maksimum 5 metreden atlanır. Rüzgar altı tarafından atlanır.`,
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
    content: `SANDAL İNDİRME (DAVİT İLE):

1. Sandal örtüsü açılır, gripe'ler serbest bırakılır.
2. Embarkasyon (binme) yapılır. Personel tam donanımlı olarak biner.
3. Davit kolu çevrilerek sandal borda dışına çıkarılır.
4. Wire fren kontrol edilir, sandal kontrollü olarak denize indirilir.
5. Deniz yüzeyinde kanca serbest bırakılır (on-load release).
6. Painter (bağlama halatı) kesilir.
7. Motor çalıştırılır, gemiden uzaklaşılır.

SERBEST DÜŞME SANDALI:

1. Mürettebat özel koltulklara oturur, emniyet kemerlerini bağlar.
2. Kaptan terk emri onaylar.
3. Release mekanizması aktive edilir.
4. Sandal rampadan kayarak serbest düşüşle denize iner.
5. Su ile temasta şok absorbe edilir.
6. Motor çalıştırılır, gemiden uzaklaşılır.

SAL İNDİRME:

Atmalı sal: Konteyner tutucusu serbest bırakılır, sal denize atılır, painter halatı çekilerek şişirilir. HRU ile otomatik bırakma da mümkündür.
Davitli sal: Davit ile kontrollü indirilir, embarkasyon güverte seviyesinde yapılır.

ÖNEMLİ: On-load release mekanizması, sandalın su üzerindeyken ağırlık altında kancadan kurtulmasını sağlar. Bu mekanizmanın düzgün çalışması hayati önem taşır. Düzenli test ve bakım zorunludur.`,
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
    content: `HAYATTA KALMA ÖNCELİKLERİ:

1. KORUMA: Hipotermi, güneş çarpması ve yaralanmadan korunma. İmmersion suit veya TPA kullanımı. Sal tentesinin kapatılması.
2. YER BİLDİRME: EPIRB, SART, piroteknik işaretler, ayna (heliograph), düdük.
3. SU: Tatlı su yönetimi en kritik unsurdur. Yetişkin kişi günde minimum 0.5 litre suyla hayatta kalabilir. İlk 24 saat su içilmez (vücut deposu yeterlidir).
4. GIDA: Acil gıda rasyonu. Protein sindirimi su tüketimini artırdığından, su kısıtlı ise balık yenmemelidir.

HİPOTERMİ:

Vücut çekirdek sıcaklığının 35°C'nin altına düşmesidir. Su, havadan 25 kat daha hızlı ısı iletir. 15°C sudaki bir kişi can yeleği ile 4-6 saat, immersion suit ile 12+ saat hayatta kalabilir.

HEAT (Yardım) Pozisyonu: Bacaklar göğse çekilir, kollar vücuda sarılır. Vücut ısı kaybını %50 azaltır.
HUDDLE Pozisyonu: Grup halinde birbirine sarılma. Isı kaybını daha da azaltır.

PSİKOLOJİK FAKTÖRLER:

Liderlik: Sandalda/salda bir kişi lider olarak belirlenir.
Görev dağılımı: Nöbet, su dağıtımı, gözcülük gibi görevler.
Moral: Hayatta kalma iradesi en önemli faktördür. Çaresizlik duygusuna kapılmamak için düzenli aktivite ve iletişim sürdürülür.`,
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
    content: `HİPOTERMİ EVRELERİ:

Hafif hipotermi (35-32°C): Titreme, el becerisi kaybı, kas sertliği. Kişi bilinçlidir ancak karar verme yeteneği azalmıştır.

Orta hipotermi (32-28°C): Titreme durur, şiddetli kas sertliği, bilinç bulanıklığı, uyuşukluk. Kalp ritim bozuklukları başlayabilir.

Ağır hipotermi (28°C altı): Bilinç kaybı, düzensiz kalp atışı, solunumun yavaşlaması. Ölüm riski çok yüksektir.

SOĞUK SU ŞOKU (Cold Shock Response):

Soğuk suya ani daldırma ilk 1-3 dakikada soğuk su şokuna neden olur: İstemsiz nefes alma refleksi (gasping), hiperventilasyon, kalp hızında ani artış. Bu dönemde boğulma riski en yüksektir. Can yeleği bu aşamada hayat kurtarır.

HAYATTA KALMA SÜRELERİ (yaklaşık):

Su sıcaklığı → Can yeleği ile ortalama hayatta kalma süresi:
0-2°C → 15-45 dakika
2-4°C → 30-90 dakika
4-10°C → 1-3 saat
10-15°C → 2-6 saat
15-20°C → 6-12 saat
20°C üzeri → Belirsiz (uzun süre)

İLK YARDIM:

1. Kişi yavaşça sudan çıkarılır (rescue collapse riski)
2. Islak giysiler çıkarılır, kuru örtü/battaniye ile sarılır
3. Pasif ısıtma uygulanır (vücut kendi ısısıyla ısınır)
4. Sıcak tatlı içecek verilebilir (bilinç açıksa)
5. Aktif dış ısıtma uygulanmaz (afterdrop riski)
6. Kalp masajı ve CPR yalnızca belirtiler tamamen kaybolmuşsa uygulanır

RESCUE COLLAPSE:

Sudan çıkarıldıktan sonraki ilk dakikalarda tansiyon düşmesi ve kalp durması riski. Kişi yatay pozisyonda çıkarılmalı ve ani hareketlerden kaçınılmalıdır.`,
    keyPoints: [
      "Soğuk su şoku ilk 1-3 dakikada boğulma riski yaratır",
      "Can yeleği soğuk su şoku sırasında hayat kurtarır",
      "HEAT pozisyonu ısı kaybını %50 azaltır",
      "Rescue collapse: sudan çıkışta kalp durması riski – yatay pozisyonda çıkarın",
    ],
    warnings: [
      "Hipotermik kişiye alkol verilmez – damar genişlemesi ısı kaybını artırır",
      "Aktif dış ısıtma (sıcak su torbası vb.) afterdrop riski nedeniyle tehlikelidir",
    ],
  },

  // =====================================================
  // BÖLÜM 5 - İLK YARDIM
  // =====================================================
  "first-aid-basics": {
    title: "Temel İlk Yardım Prensipleri",
    introduction: "Denizde ilk yardım, tıbbi yardıma ulaşmanın sınırlı olduğu ortamda yaralanma ve hastalıklara ilk müdahaleyi kapsar.",
    content: `DR ABC PRENSİBİ:

D – Danger (Tehlike): Olay yerinin güvenliğini değerlendir. Kendi güvenliğin önceliklidir.
R – Response (Yanıt): Kişinin bilincini kontrol et. Omuzlarından hafifçe sarsarak ve sesli çağırarak yanıt ara.
A – Airway (Hava Yolu): Hava yolunun açık olduğundan emin ol. Baş geri, çene yukarı.
B – Breathing (Solunum): Solunumu kontrol et. Bak, dinle, hisset (10 saniye).
C – Circulation (Dolaşım): Nabız kontrolü. Büyük kanama varsa baskı uygula.

ÖNCELİK SIRALAMA (TRIAGE):

Birden fazla yaralı varsa öncelik sıralaması yapılır:
Kırmızı (acil): Hayati tehlike, hemen müdahale
Sarı (geciktirilebilir): Ciddi yaralanma, stabil
Yeşil (hafif): Ayaktan tedavi
Siyah: Hayati belirtisi yok

GEMİDE TIBBI ORGANİZASYON:

Kaptan gemideki tıbbi müdahaleden sorumludur (MLC 2006, STCW). Gemide eğitimli ilk yardımcı bulunmalıdır. Ship Captain's Medical Guide referans kitaptır. Tele-tıbbi danışmanlık (TMAS) 24 saat hizmet verir.`,
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
    content: `CPR PROSEDÜRÜ (YETİŞKİN):

1. Güvenliği kontrol et, yanıt ara.
2. Yanıt yoksa yardım çağır ve AED (varsa) getirt.
3. Hava yolunu aç (baş geri, çene yukarı).
4. Solunum kontrolü (10 saniye). Normal solunum yoksa CPR başlat.
5. 30 göğüs basısı uygula:
   - El topuğu göğüs kemiğinin alt yarısına
   - 5-6 cm derinlikte bası
   - Dakikada 100-120 bası hızı
6. 2 kurtarma nefesi ver.
7. 30:2 oranında devam et.
8. AED geldiğinde hemen kullan.

AED (OTOMATİK DIŞ DEFİBRİLATÖR):

SOLAS gereği belirli gemilerde AED bulunmalıdır. Cihaz sesli komutlarla kullanıcıyı yönlendirir. Elektrot pedleri göğse yapıştırılır. Cihaz kalp ritmini analiz eder ve gerekirse şok verilmesini önerir.

ÖNEMLİ NOTLAR:

CPR'a başlandıktan sonra tıbbi ekip gelene kadar veya kişi solunmaya başlayana kadar devam edilir. Yorulma durumunda başka bir kişi ile değişim yapılır. CPR kalitesi (derinlik ve hız) en önemli faktördür. Göğüs basıları arasında göğsün tam olarak geri yükselmesine izin verilmelidir.`,
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
    content: `KANAMA KONTROLÜ:

Doğrudan baskı: Temiz bezle yara üzerine sıkı baskı uygula. En etkili yöntemdir.
Elevasyon: Kanayan uzvu kalp seviyesinin üzerine kaldır.
Basınç noktaları: Arter basınç noktalarına baskı (brakial, femoral arter).
Turnike: Son çare olarak, yaşamı tehdit eden ekstremite kanamasında uygulanır. Uygulama zamanı yazılır.

KIRIK MÜDAHALESİ:

Açık kırık: Kemik dışarı çıkmış veya yara açılmış. Steril bezle ört, splint uygula. Kemiği yerine itmeye çalışma.
Kapalı kırık: Dış yara yok. Şişlik, ağrı, şekil bozukluğu. Splint ile sabitle.

Splint uygulama kuralları: Kırığın üstünden ve altından eklemleri içerecek şekilde sabitle. Dolaşımı kontrol et (nabız, renk, his). Taşıma öncesi immobilize et.

ÖZEL DURUMLAR:

Omurga yaralanması şüphesi: Kişiyi hareket ettirme. Baş-boyun-gövde hizasını koru. Log-roll tekniği ile taşı.
Pelvis kırığı: Bacakları bağla, hareketsiz tut.
Kaburga kırığı: Ağrılı tarafa yatır, destekle.`,
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
    content: `YANIK DERECELERİ:

1. Derece: Yüzeysel kızarıklık, ağrı. Sadece epidermis etkilenmiştir. Güneş yanığı gibi.
2. Derece: Su toplama (bül), şiddetli ağrı. Dermise uzanan hasar. Enfeksiyon riski.
3. Derece: Deri tam kalınlıkta hasar görmüştür. Beyaz/siyah renk, ağrı yok (sinir uçları hasarlı).

İLK YARDIM:

1. Kişiyi tehlike kaynağından uzaklaştır.
2. Yanan giysiyi söndür (dur-yere yat-yuvarlan).
3. Yanık bölgesini en az 20 dakika soğuk (ılık) suyla soğut. Buz uygulanmaz.
4. Takı ve sıkı giysileri (şişmeden önce) çıkar.
5. Steril, yapışmaz bezle ört. Cling film kullanılabilir.
6. Su toplamalarını (bülleri) patlatma.
7. Merhem, yağ veya krem sürme.

YANIK ALANI HESABI (Wallace'ın 9'lar Kuralı):

Baş ve boyun: %9
Her kol: %9
Göğüs (ön): %18
Sırt: %18
Her bacak: %18
Perine: %1

Yanık alanı %15'i aşan yetişkinlerde (çocuklarda %10) sıvı replasmanı gereklidir. IV sıvı başlanmalıdır. TMAS ile irtibat kurulmalıdır.

KİMYASAL YANIK:

Kimyasal maddeyi bol su ile yıka (en az 20 dakika). Etkilenen giysileri çıkar. Nötralize etmeye çalışma. Madde güvenlik veri formunu (MSDS/SDS) kontrol et.`,
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
    content: `YASAL DAYANAK:

MLC 2006 (Maritime Labour Convention), Standard A4.1 gereği her gemide yeterli tıbbi malzeme bulundurulmalıdır. Gemi sağlık sandığının içeriği geminin seyir bölgesi, mürettebat sayısı ve sefer süresine göre belirlenir.

SINIFLANDIRMA:

Kategori A: Kıyıdan uzak, uzun seyir yapan gemiler. En kapsamlı ilaç ve malzeme listesi.
Kategori B: Kıyıya yakın seyir. Orta düzey malzeme.
Kategori C: Kısa mesafe, liman yakını. Temel malzeme.

İÇERİK ÖRNEKLERİ:

İlaçlar: Ağrı kesici, antibiyotik, anti-emetik, antihistaminik, adrenalin, kalp ilaçları, göz/kulak damlaları, sıtma ilacı.
Malzemeler: Bandaj, atel, sargı, steril gazlı bez, IV set, kateter, enjektör, dikiş seti, oksijen seti.
Cihazlar: Tansiyon aleti, stetoskop, termometre, oksimetre, AED.

KONTROL VE YENİLEME:

İlaçların son kullanma tarihleri düzenli kontrol edilir. Kullanılan malzeme en kısa sürede yenilenir. Sağlık sandığı periyodik PSC ve bayrak devleti denetimine tabidir.`,
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
    content: `TMAS SİSTEMİ:

TMAS, sahilde konuşlanmış tıbbi profesyonellerin, gemideki hasta veya yaralı mürettebat için uzaktan tanı, tedavi ve tahliye kararı vermesini sağlayan hizmettir. Hizmet ücretsizdir ve 7/24 kullanılabilir.

İLETİŞİM KANALLARI:

VHF, MF/HF radyo, INMARSAT uydu telefonu veya e-posta ile iletişim kurulabilir. Medikal formlar standart format ile iletilir.

BİLDİRİM İÇERİĞİ:

Hastanın yaşı, cinsiyeti, görev pozisyonu
Şikayet ve semptomlar
Vital bulgular (nabız, tansiyon, sıcaklık, solunum sayısı)
Uygulanan ilk yardım
Mevcut ilaçlar ve alerjiler
Geminin pozisyonu ve en yakın limana mesafesi

TMAS KARARLARI:

1. Gemide tedavi devam edilebilir
2. Rota değişikliği ile limana yanaşma önerilir
3. Helikopter ile tahliye (MEDEVAC) gerekir
4. Denizde başka gemiden tıbbi destek alınması

MEDEVAC KARARI:

Tıbbi tahliye kararı TMAS doktorunun önerisi ve kaptanın onayı ile verilir. Helikopter tahliyesi için geminin pozisyonu, hava koşulları ve helikopter menzili değerlendirilir. Sahil güvenlik koordinasyonu sağlanır.`,
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
    content: `YASAL ÇERÇEVE:

SAR Convention (1979): Denizde arama ve kurtarma hizmetlerinin düzenlenmesini öngörür. Dünya denizleri SAR bölgelerine ayrılmıştır ve her kıyı devleti kendi bölgesinde SAR koordinasyonu sağlamakla yükümlüdür.

SOLAS V/33.1: Denizdeki kişilerin kurtarılmasına yönelik gemilerin yükümlülüklerini tanımlar. Her geminin kaptan, tehlike çağrısına cevap vermekle yükümlüdür.

IAMSAR MANUAL:

IAMSAR (International Aeronautical and Maritime Search and Rescue Manual) üç ciltten oluşur:
Cilt I: Organizasyon ve yönetim (devletler için)
Cilt II: Görev koordinasyonu (RCC/MRCC için)
Cilt III: Mobil vasıtalar (gemiler ve uçaklar için). Her ticari gemide bulunması zorunludur.

SAR ORGANİZASYONU:

MRCC (Maritime Rescue Coordination Centre): Kıyı devletinin SAR koordinasyon merkezi.
SMC (SAR Mission Coordinator): Operasyonun genel koordinatörü (MRCC'de).
OSC (On-Scene Coordinator): Olay yerindeki koordinatör (genellikle ilk ulaşan geminin kaptanı).
SRU (Search and Rescue Unit): Arama ve kurtarma birimi.`,
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
    content: `ARAMA DESENLERİ:

EXPANDING SQUARE SEARCH (SS): Genişleyen kare arama. Tek araçla aramada kullanılır. Kayıp konumunun nispeten kesin bilindiği durumlarda etkilidir. Merkez noktadan başlayarak giderek büyüyen kare spiral şeklinde arama yapılır.

SECTOR SEARCH (VS): Sektör arama. Kayıp konumunun iyi bilindiği ve arama alanının küçük olduğu durumlarda. Merkez noktadan farklı açılarda dışarı doğru arama yapılır.

PARALLEL TRACK SEARCH (PS): Paralel iz arama. Geniş alanda, birden fazla araçla aramada kullanılır. Araçlar paralel rotalar üzerinde ilerler. En yaygın kullanılan büyük alan arama desenidir.

CREEPING LINE AHEAD (CS): Sürünen hat arama. Akıntı veya rüzgar yönünde, tek araçla uzun ve dar bir alanda arama. Paralel izler akıntı yönüne dik açı ile geçilir.

TRACK LINE SEARCH: Hat üzeri arama. Kayıp geminin bilinen rotası üzerinde arama. İleri ve geri geçişlerle rota hattı taranır.

ARAMA GENİŞLİĞİ (SWEEP WIDTH):

Arama genişliği, hava koşulları, görüş mesafesi, dalga yüksekliği ve aranan nesnenin büyüklüğüne göre belirlenir. IAMSAR Cilt III'te sweep width tabloları bulunur.`,
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
    content: `OSC GÖREVLERİ:

1. Arama alanının belirlenmesi ve araçların dağıtımı
2. Arama deseninin seçimi ve uygulanması
3. Bulunan kişilerin kurtarılmasının koordinasyonu
4. Durum raporlarının SMC'ye iletilmesi
5. İletişim planının oluşturulması
6. Kurtarılan kişilerin bakım ve transferi

OSC ATANMASI:

Genellikle olay yerine ilk ulaşan geminin kaptanı OSC olarak görev yapar. MRCC, daha uygun bir geminin gelmesiyle OSC görevini devredebilir. Askeri gemi veya sahil güvenlik gemisi öncelikli olarak OSC atanır.

OSC RAPORLAMASI:

OSC, arama ilerlemesini düzenli olarak MRCC'ye raporlar. SITREP (Situation Report) formatı kullanılır. Rapor içeriği: arama alanı, bulunan kişi sayısı, hava koşulları, yakıt durumu, diğer araçların durumu.

ARAMA SONLANDIRMA:

Arama sonlandırma kararı MRCC tarafından verilir. OSC, MRCC onayı olmadan aramayı sonlandırmaz. Tüm araçlar aramayı aynı anda sonlandırır.`,
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
    content: `İLK TEDBİRLER:

1. "Adam denize!" çığlığı at
2. Can simidini denize at (MOB ışığı ve duman işaretli)
3. Köprüüstünü bilgilendir
4. MOB butonuna bas (GPS pozisyonu kaydeder)
5. Gözcü tayin et – düşen kişiyi gözden kaybetme

MANEVRA TEKNİKLERİ:

WILLIAMSON TURN: En yaygın kullanılan MOB manevrası. Dümen tam bir tarafa kırılır, gemi 60° dönünce dümen diğer tarafa tam kırılır. Gemi orijinal rotanın tam ters yönünde dönerek düşme noktasına geri gelir. Kısıtlı görüşte etkilidir.

ANDERSON TURN: Dümen tam bir tarafa kırılır ve gemi 270° dönüş yapar. Hızlı geri dönüş sağlar. İyi görüş koşullarında tercih edilir.

SCHARNOW TURN: Dümen bir tarafa kırılır, gemi orijinal rotasından 240° dönünce diğer tarafa kırılır. Büyük gemilerde düşme noktasına en doğru yaklaşımı sağlar.

KURTARMA:

Kişiye rüzgar altından yaklaş. Motor kur durumuna al (pervane yaralanma riski). Kurtarma botu indir veya halat/merdiven uzat. Hipotermik kişiyi yatay pozisyonda çıkar.`,
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
    content: `HAZIRLIK:

1. Helikopter operasyonu için güverte hazırlanır: gevşek malzeme sabitlenir, antenler alınır.
2. Yangın söndürme ekipmanı hazır tutulur.
3. Rüzgar yönü ve hızı belirlenir.
4. Gemi, rüzgarı pruva omuzluğundan (port quarter) alacak şekilde seyir yapar.
5. Haberleşme kanalı belirlenir (genellikle VHF Ch. 16 veya SAR kanalı).

HI-LINE PROSEDÜRÜ:

Helikopterden gönderilen guide hattı (hi-line) güverteye bırakılır. Gemiden bu hat ele alınır – GEMİYE BAĞLANMAZ (statik elektrik boşalmasına izin ver). Hat üzerinden vinç kancası yönlendirilir. Kişi vinçle helikoptere alınır.

DOUBLE LIFT:

Kurtarıcı personel helikopterden iner, yaralıyı sedyeye sabitler ve birlikte vinçle alınır.

GÜVENLİK KURALLARI:

Helikopter bıçaklarına yaklaşma mesafesi minimum 5 metre.
Helikopter pilotunun talimatlarına uyulur.
İniş alanı en az 5 x 5 metre açık alan.
Gece operasyonlarında iniş alanı aydınlatılır ama pilot gözü kamaştırılmaz.
Hi-line kesinlikle gemiye bağlanmaz, irgattan geçirilmez.`,
    keyPoints: [
      "Hi-line gemiye bağlanmaz – statik elektrik riski",
      "Rüzgar pruva omuzluğundan alınacak şekilde seyir yapılır",
      "Helikopter bıçaklarına minimum 5 m mesafe korunmalıdır",
      "Gece operasyonlarında pilot gözü kamaştırılmamalıdır",
    ],
    warnings: [
      "Hi-line kesinlikle ırgat veya babaya bağlanmaz",
      "Statik elektrik boşalması için hat önce suya veya güverteye temas ettirilir",
    ],
  },

  // =====================================================
  // BÖLÜM 7 - GMDSS
  // =====================================================
  "gmdss-overview": {
    title: "GMDSS Genel Yapısı ve Deniz Alanları",
    introduction: "GMDSS (Global Maritime Distress and Safety System), denizde tehlike ve güvenlik haberleşmesini küresel ölçekte güvence altına alan sistemdir.",
    content: `GMDSS GELİŞİMİ:

GMDSS, 1 Şubat 1999'da tam olarak yürürlüğe girmiştir. SOLAS Bölüm IV ile zorunlu kılınmıştır. Önceki Morse ve radyotelefon tabanlı sistemi değiştirmiştir. Temel prensip: tehlike çağrısının otomatik olarak kıyı istasyonlarına ve yakın gemilere ulaşmasını garanti etmektir.

DENİZ ALANLARI:

A1 Alanı: En az bir VHF kıyı istasyonunun (DSC) kapsama alanında olan bölge. Tipik olarak kıyıdan 20-30 deniz mili.

A2 Alanı: VHF kapsamı dışında kalan ancak en az bir MF kıyı istasyonunun (DSC) kapsama alanındaki bölge. Tipik olarak kıyıdan 100-150 deniz mili.

A3 Alanı: A1 ve A2 dışında kalan ancak INMARSAT jeostasyoner uydu kapsamındaki bölge. Yaklaşık 70°N – 70°S enlemberi arasındaki tüm denizler.

A4 Alanı: A1, A2 ve A3 dışında kalan bölge. Kutup bölgeleri. HF radyo zorunludur.

ZORUNLU EKİPMAN:

Tüm SOLAS gemileri: VHF (DSC, Ch.16, Ch.70), NAVTEX, EPIRB (406 MHz), SART veya AIS-SART, iki yönlü VHF telsiz (en az 3 adet, su geçirmez).

A1 ek: VHF DSC yeterlidir.
A1+A2 ek: MF DSC (2187.5 kHz).
A1+A2+A3 ek: INMARSAT-C veya HF DSC.
A4 ek: MF/HF DSC zorunlu.`,
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

406 MHz frekansında çalışır. COSPAS-SARSAT uydu sistemi aracılığıyla tehlike sinyali gönderir. Manuel veya otomatik (HRU ile) aktive edilir. Konum bilgisi dahili GPS ile sağlanır (doğruluk ~100 m). Batarya ömrü: minimum 48 saat sürekli sinyal.

Kayıt: Her EPIRB ulusal denizcilik otoritesine kayıtlı olmalıdır. Kayıt bilgileri: gemi adı, çağrı işareti, MMSI, acil durum iletişim bilgileri.

HRU ile EPIRB: Gemi 2-4 m derinliğe battığında HRU otomatik olarak EPIRB'i serbest bırakır. EPIRB yüzeye çıkar ve otomatik aktive olur.

SART (Search and Rescue Transponder):

9 GHz (X-band) radar sinyaline cevap verir. Kurtarma gemisinin radarında 12 adet eşit aralıklı nokta olarak görünür (yaklaştıkça daireler haline dönüşür). Batarya: 96 saat bekleme + 8 saat aktif sinyal.

AIS-SART:

AIS sistemi üzerinden konum bilgisi gönderir. ECDIS ve AIS ekranlarında özel sembol ile görünür. Geleneksel SART'ın alternatifi olarak kabul edilmektedir. S-band radarlarla çalışan gemilerde avantajlıdır.

BAKIMLARI:

EPIRB: Yıllık bakım, batarya değişimi (üretici tavsiyesine göre, genellikle 5 yılda bir), HRU değişimi (2 yılda bir).
SART: Aylık test (test modunda), yıllık bakım.`,
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
    content: `DSC SİSTEMİ:

DSC, belirli bir istasyonu veya tüm istasyonları dijital olarak çağırmak için kullanılır. Tehlike, aciliyet, emniyet ve rutin çağrı kategorileri vardır.

VHF DSC: Kanal 70 üzerinde otomatik tehlike çağrısı gönderir. Çağrıya MMSI, pozisyon, tehlike türü ve zaman bilgisi eklenir. Çağrı alındığında sesli ve görsel alarm verir.

TEHLİKE ÇAĞRISI PROSEDÜRÜ:

1. DSC tehlike butonunun kapağını aç
2. Tehlike türünü seç (yangın, batma, terk gemi, vb.)
3. Butonu 5 saniye basılı tut
4. DSC çağrısı otomatik olarak Ch.70'te gönderilir
5. Çağrı her 4 dakikada bir otomatik tekrarlanır
6. Onay alındığında VHF Ch.16'ya geç ve sesli MAYDAY mesajı ver

MAYDAY MESAJI FORMATI:

"MAYDAY MAYDAY MAYDAY, this is [gemi adı] [gemi adı] [gemi adı], MAYDAY [gemi adı], MMSI [numara], my position is [enlem/boylam], I am [tehlike türü], I require [yardım türü], [mürettebat sayısı] persons on board, over."

VHF KANALLARI:

Ch.16 (156.800 MHz): Uluslararası tehlike, aciliyet ve emniyet kanalı
Ch.70: DSC çağrı kanalı
Ch.13: Köprüüstü-köprüüstü manevra haberleşmesi
Ch.06: Gemi arası haberleşme`,
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
    content: `INMARSAT SİSTEMİ:

4 adet jeostasyoner uydu ile 70°N – 70°S arasında kesintisiz kapsama sağlar. Ses, veri, faks ve tehlike çağrısı hizmetleri sunar.

INMARSAT-C:

Metin tabanlı haberleşme (store and forward). Çift yönlü mesajlaşma ve tehlike çağrısı. EGC (Enhanced Group Call) ile SafetyNET bilgileri alınır. GMDSS A3 alanı için yeterlidir. Kompakt, düşük maliyetli.

INMARSAT Fleet Broadband:

Yüksek hızlı veri, ses ve video iletişimi. GMDSS işlevi ile birleştirilmiş. Geniş bant internet erişimi sağlar.

SafetyNET:

INMARSAT-C üzerinden MSI (Maritime Safety Information) yayınlarını iletir. Meteorolojik uyarılar, NAVAREA navigasyon uyarıları, SAR bilgileri ve korsan uyarıları yayınlanır. NAVTEX kapsamı dışındaki bölgelerde zorunludur.

DİĞER UYDU SİSTEMLERİ:

COSPAS-SARSAT: EPIRB sinyallerini alan tehlike uydu sistemi. LEO (alçak yörünge) ve MEO uyduları ile küresel kapsama.
Iridium: 66 LEO uydu ile kutuplar dahil küresel kapsama. GMDSS modernizasyonu kapsamında onaylanmıştır.`,
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
    content: `NAVTEX SİSTEMİ:

518 kHz (uluslararası, İngilizce) ve 490 kHz (ulusal dil) frekanslarında yayın yapar. Otomatik olarak alır ve yazdırır. Kapsama alanı: kıyıdan yaklaşık 300-400 deniz mili (A2 alanı sınırı).

MESAJ FORMATI:

Her NAVTEX mesajı 4 karakterli bir başlık ile tanımlanır:
1. karakter: Yayın istasyonu kimliği (A-Z)
2. karakter: Mesaj kategorisi
3-4. karakter: Mesaj sıra numarası (01-99)

MESAJ KATEGORİLERİ:

A – Navigasyon uyarıları
B – Meteoroloji uyarıları
C – Buz haberleri
D – SAR bilgileri
E – Meteoroloji tahminleri
F – Pilot hizmeti bilgileri
G-Z – Diğer

CİHAZ AYARLARI:

Kullanıcı, hangi istasyonlardan ve hangi kategorilerden mesaj almak istediğini seçebilir. Ancak A (navigasyon uyarısı), B (meteoroloji uyarısı), D (SAR) ve L (navigasyon uyarısı ek) kategorileri kapatılamaz – her zaman alınır.

WWNWS (World Wide Navigational Warning Service):

Dünya 21 NAVAREA'ya bölünmüştür. Her NAVAREA koordinatörü bölgesindeki navigasyon uyarılarını yayınlar. NAVTEX bu uyarıların kıyısal dağıtım aracıdır.`,
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
    content: `TEHLİKE (DISTRESS) – MAYDAY:

En yüksek öncelik. Gemi veya kişi ciddi ve yakın tehlike altındadır ve acil yardım gereklidir.
Prosedür: DSC Ch.70 tehlike çağrısı + VHF Ch.16 MAYDAY mesajı.
Tüm istasyonlar MAYDAY çağrısını duymak ve cevap vermekle yükümlüdür.

Tehlike türleri: Batma, yangın, terk gemi, kara oturma, çarpışma, sürüklenme, korsan saldırısı.

ACİLİYET (URGENCY) – PAN PAN:

İkinci öncelik. Gemi veya kişi güvenliği tehlikede ancak acil tehlike henüz oluşmamıştır.
"PAN PAN PAN PAN PAN PAN, all stations, this is [gemi adı]..."
Örnekler: Makine arızası (sürüklenme riski), denize düşme, acil tıbbi yardım ihtiyacı.

EMNİYET (SAFETY) – SECURITE:

Üçüncü öncelik. Navigasyon veya meteoroloji güvenlik bilgisi iletimi.
"SECURITE SECURITE SECURITE, all stations..."
Örnekler: Buz uyarısı, sürüklenen konteyner, fener arızası, fırtına uyarısı.

MAYDAY RELAY:

Tehlikedeki geminin kendisi çağrı yapamıyorsa, başka bir gemi onun adına MAYDAY Relay gönderir:
"MAYDAY RELAY MAYDAY RELAY MAYDAY RELAY, this is [relay gemi adı], following received from [tehlikedeki gemi]..."

YANLIŞ TEHLİKE ÇAĞRISI:

Yanlışlıkla gönderilen tehlike çağrısı derhal iptal edilmelidir. VHF Ch.16'da: "All stations, this is [gemi adı], cancel my distress alert of [tarih/saat], MMSI [numara]."`,
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
    content: `ISM CODE AMACI:

SOLAS Bölüm IX ile zorunlu kılınmıştır. Güvenli gemi operasyonunu sağlamak ve deniz kirliliğini önlemek için şirketin yönetim sistemini yapılandırır.

ISM CODE YAPISI (16 Bölüm):

1. Genel: Amaç, uygulama alanı, tanımlar.
2. Güvenlik ve çevre koruma politikası.
3. Şirketin sorumlulukları ve yetkileri.
4. Designated Person Ashore (DPA): Kıyıda atanmış kişi, gemi ile yönetim arasındaki güvenlik bağlantısı.
5. Kaptan sorumlulukları ve yetkileri.
6. Kaynaklar ve personel: Eğitim, yeterlilik, tatbikatlar.
7. Gemi operasyonlarına yönelik planların hazırlanması.
8. Acil duruma hazırlık.
9. Uygunsuzlukların (non-conformity), kazaların ve tehlikeli durumların raporlanması ve analizi.
10. Gemi ve ekipman bakımı.
11. Dokümantasyon.
12. Şirket doğrulaması, gözden geçirme ve değerlendirme.

SERTİFİKALAR:

DOC (Document of Compliance): Şirketin ISM Code'a uygun SMS (Safety Management System) kurduğunu belgeler. 5 yıl geçerli, yıllık doğrulama.
SMC (Safety Management Certificate): Geminin SMS'e uygun işletildiğini belgeler. 5 yıl geçerli, ara sörvey ile.`,
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
    content: `SMS BİLEŞENLERİ:

Güvenlik ve çevre politikası: Şirketin güvenlik taahhüdünü ifade eder.
Prosedürler ve talimatlar: Operasyonel prosedürler, acil durum planları, bakım prosedürleri.
Risk değerlendirmesi: Operasyonlar öncesi risk analizi yapılması.
İç denetim: Düzenli aralıklarla SMS'in etkinliğinin değerlendirilmesi.
Yönetim gözden geçirmesi: Üst yönetimin SMS performansını değerlendirmesi.

GEMİDEKİ UYGULAMA:

Master's Review: Kaptan, SMS'in etkinliğini düzenli olarak değerlendirir ve şirkete rapor eder.
Shipboard drill: Tatbikatlar SMS prosedürlerine uygun olarak yapılır.
Near miss raporlama: Kazaya ramak kala olayların raporlanması güvenlik kültürünün göstergesidir.
Non-conformity takibi: Tespit edilen uygunsuzluklar düzeltici eylem ile kapatılır.

DOKÜMAN YÖNETİMİ:

SMS dokümanları kontrollü (controlled) ve kontrolsüz (uncontrolled) olarak sınıflandırılır. Gemideki dokümanlar güncel tutulmalıdır. Eski versiyonlar kaldırılmalıdır. Elektronik SMS sistemleri yaygınlaşmaktadır.`,
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
    content: `ISPS CODE YAPISI:

SOLAS Bölüm XI-2 ile zorunlu kılınmıştır. 1 Temmuz 2004'te yürürlüğe girmiştir. Part A (zorunlu) ve Part B (tavsiye niteliğinde) olmak üzere iki bölümden oluşur.

GÜVENLİK SEVİYELERİ:

Security Level 1 (Normal): Normal operasyonel güvenlik önlemleri. Gemi ve liman tesisi günlük güvenlik prosedürlerini uygular.

Security Level 2 (Artırılmış): Güvenlik tehdidinin arttığı durumlarda. Ek güvenlik önlemleri uygulanır: arttırılmış erişim kontrolü, ek devriye, kısıtlı alanların güçlendirilmiş korunması.

Security Level 3 (Olağanüstü): Muhtemel veya yakın güvenlik tehlikesi. Maksimum güvenlik önlemleri. Hükümet otoritelerinin yönlendirmesiyle hareket edilir.

ZORUNLU BELGELER:

SSP (Ship Security Plan): Gemi güvenlik planı. Tüm güvenlik seviyelerinde uygulanacak prosedürleri tanımlar.
SSA (Ship Security Assessment): Gemi güvenlik değerlendirmesi. Risklerin ve zayıflıkların analizi.
ISSC (International Ship Security Certificate): Geminin ISPS Code'a uygunluğunu belgeler.

GÖREVLİ KİŞİLER:

SSO (Ship Security Officer): Gemi güvenlik zabiti. Genellikle başkaptan.
CSO (Company Security Officer): Şirket güvenlik sorumlusu.
PFSO (Port Facility Security Officer): Liman tesisi güvenlik sorumlusu.`,
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

Gemi güvenlik zabitinin görevleri:
1. SSP'nin (Ship Security Plan) uygulanması ve sürdürülmesi
2. Gemi güvenlik değerlendirmesinin güncellenmesi
3. Güvenlik eğitim ve tatbikatlarının düzenlenmesi
4. Güvenlik olaylarının raporlanması
5. Erişim kontrolünün denetimi
6. CSO ile düzenli iletişim
7. Güvenlik seviyesi değişikliklerinin uygulanması

CSO (Company Security Officer):

Şirket güvenlik sorumlusunun görevleri:
1. SSA'ların yaptırılması ve güncellenmesi
2. SSP'lerin hazırlanması ve onaylatılması
3. SSO'ların atanması ve eğitiminin sağlanması
4. İç denetimlerin yürütülmesi
5. Güvenlik seviyesi değişikliklerinin gemilere bildirilmesi
6. Bayrak devleti ve liman devleti ile güvenlik iletişimi

PFSO (Port Facility Security Officer):

Liman tesisi güvenlik sorumlusunun görevleri:
1. Liman tesisi güvenlik planının (PFSP) uygulanması
2. Gemi-liman arayüz güvenliğinin koordinasyonu
3. DoS (Declaration of Security) düzenlenmesi
4. Güvenlik tatbikatlarının düzenlenmesi

DOS (Declaration of Security):

Gemi ve liman tesisi arasında güvenlik sorumlulukların paylaşımını belgeleyen yazılı beyan. Güvenlik seviyeleri farklı olduğunda veya yüksek riskli operasyonlarda düzenlenir.`,
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
    content: `SSA SÜRECİ:

1. ÖN DEĞERLENDİRME: Mevcut güvenlik önlemlerinin tespiti, geminin fiziksel yapısı ve operasyonel profili.

2. TEHDİT ANALİZİ: Geminin seyir bölgesine ve yük tipine göre olası güvenlik tehditleri: korsan/silahlı soygun, terör, kaçak yolcu, kaçakçılık, sabotaj, siber saldırı.

3. ZAFIYET ANALİZİ: Erişim noktaları, güvenlik ekipmanı durumu, gözetleme sistemleri, aydınlatma, iletişim kapasitesi, mürettebat eğitim seviyesi.

4. RİSK DEĞERLENDİRMESİ: Tehdit olasılığı × etkisi = risk seviyesi. Risk matrisi ile öncelikli alanlar belirlenir.

5. KARŞI ÖNLEMLER: Her risk için uygun güvenlik önlemleri önerilir ve SSP'ye dahil edilir.

SSA ÇIKTILARI:

SSA sonuçları doğrudan SSP'nin (Ship Security Plan) oluşturulmasında ve güncellenmesinde kullanılır. SSA gizli bir dokümandır ve yetkisiz kişilere gösterilmez. SSA düzenli olarak (özellikle gemi ticareti veya seyir bölgesi değiştiğinde) güncellenir.`,
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
    content: `SUYA GİRİŞ YÖNTEMLERİ:

1. EMBARKASYON MERDİVENİ/RAMPA: En güvenli yöntem. Sandal veya sala doğrudan bindirme. Islak ellere ve kaygan yüzeylere dikkat.

2. ATLAMA (son çare): Maksimum 5 metreden. Can yeleği sıkıca bağlı olmalı. Bir elle ağız ve burunu kapat. Diğer elle can yeleğini tut. Ayaklar birleşik. Dik pozisyonda atla. Rüzgar altı tarafından atla. Gemiden en az 3 metre uzağa atla (emme etkisi).

3. SÜZÜLME: Ip veya merdiven ile kontrollü iniş. Eldivenle kavrama yüzeyi iyileştirilir.

GEMİDEN UZAKLAŞMA:

Suya girdikten sonra derhal gemiden uzaklaşılmalıdır:
- Emme etkisi (batma sırasında)
- Patlama riski (yakıt tankları)
- Dökülme (debris) riski
En az 200 metre uzaklaşılmalıdır.

CAN YELEĞİ İLE YÜZME:

Can yeleği suya girmeden önce giyilir ve sıkıca bağlanır. Suda can yeleği ile sırt üstü pozisyon alınır. Enerji tasarrufu için gereksiz yüzme yapılmaz. HEAT pozisyonu (bacaklar göğse, kollar vücuda sarılı) ısı kaybını yavaşlatır.`,
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
    content: `DROWNPROOFING TEKNİĞİ:

Can yeleği yoksa veya hasarlıysa uygulanan enerji tasarruflu yüzme tekniğidir:
1. Derin nefes al, yüzünü suya daldır
2. Kolları ve bacakları gevşet (denizyıldızı pozisyonu)
3. Hava bittiğinde başını kaldır, nefes al
4. Tekrarla

Bu teknik saatlerce suda kalmayı mümkün kılar çünkü enerji harcamasını minimize eder.

TREADING WATER:

Ayakta suda kalma. Bacaklar bisiklet çevirme hareketi, eller yatay düzlemde küçük daireler çizer. Daha fazla enerji harcar ama baş su üzerinde kalır.

GRUP TEKNİKLERİ:

HUDDLE: Grup halinde birbirine sarılma. En az 3 kişi ile uygulanır. Merkeze çocuklar ve zayıf yüzücüler alınır. Isı kaybını önemli ölçüde azaltır.

GİYSİ İLE YÜZDÜRME:

Pantolon: Bacakları bağla, havaya doldur, boyunun etrafına sarılarak geçici yüzdürme aracı olarak kullan.
Gömlek: Düğmeleri kapat, havaya doldur.`,
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
    content: `İLK EYLEMLER:

1. YARALANMA KONTROLÜ: Yaralılara ilk yardım uygula.
2. SU YÖNETİMİ: Su dağıtım planı oluştur. İlk 24 saat su içme (vücut deposu yeterli).
3. SAL KONTROLÜ: Hava odalarını kontrol et, sal tabanını kuru tut, deniz çapası at, tente kapat.
4. GÖZCÜLÜK: Sürekli gözcü tut. Piroteknik araçları kurtarma aracı görüldüğünde kullan.
5. LİDERLİK: Lider belirle, görev dağılımı yap, moral koru.

SU RASYONU:

Minimum günlük su ihtiyacı: 0.5 litre (hayatta kalma). Normal ihtiyaç: 2-3 litre. Yağmur suyu toplama sistemi kurulur. Deniz suyu içilmez – dehidrasyon hızlanır. Tuzdan arındırma kiti (desalination) varsa kullanılır.

GIDA YÖNETİMİ:

Acil gıda rasyonu eşit olarak dağıtılır. Su kısıtlıysa protein (balık) yenmemelidir – protein sindirimi su tüketimini artırır. Karbonhidrat tercih edilir.

KORUNMA:

Güneş çarpmasından korunma: Tente kapalı, ıslak bez ile serinleme.
Soğuktan korunma: TPA (Thermal Protective Aid), ıslak giysi çıkarma, grup ısınması.
Tuzlu su yarası: Tuzlu su ile temas eden yaraları tatlı su ile yıka.`,
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
    content: `İŞARET VERME ARAÇLARI:

1. SART/AIS-SART: Radar sinyaline otomatik yanıt. En etkili elektronik işaret aracı.
2. EPIRB: Uydu aracılığıyla konum bildirimi. Aktive edildiğinde SAR koordinasyon merkezi bilgilendirilir.
3. Paraşüt fişeği: Gece ve gündüz, uzak mesafeden görülebilir (40+ km).
4. El meşalesi: Yakın mesafede, kurtarma aracına yön gösterme.
5. Duman işareti: Gündüz saatlerinde turuncu duman.
6. Heliograph (ayna): Güneş ışığını yansıtarak uçağa/gemiye sinyal.
7. Düdük: Ses işareti, kısa mesafe.
8. El feneri: Gece, SOS (... --- ...) sinyali.

KURTARILMA HAZIRLIĞI:

Helikopter yaklaştığında: Piroteknik kullanma – rotor rüzgarıyla sal ters dönebilir. Hi-line talimatlarına uy. Sırayla vinçle alınma. İlk önce yaralılar.

Gemi yaklaştığında: Sal gözetleme hattı tarafına yaklaştırılır. Merdiven veya ağ ile çıkılır. Kendi başına çıkamayan kişilere yardım edilir.

KURTARMA SONRASI:

Hipotermik kişiler dikkatle taşınır (rescue collapse riski). Sıvı-gıda yavaş verilir. Tıbbi değerlendirme yapılır.`,
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
    content: `SU YÖNETİMİ:

İlk 24 saat: Su dağıtılmaz (vücut deposu yeterli, bulantı ve kusma olasılığı).
2-4. gün: Günde 0.5 litre (hayatta kalma dozu).
4+ gün: Duruma göre artırılabilir (yağmur suyu toplanırsa).

Su tasarrufu kuralları:
- Gereksiz konuşmayı azalt
- Fiziksel aktiviteyi sınırla
- Gün ortasında gölgede kal
- Deniz suyu içme (böbrek yetmezliği hızlanır)
- İdrar içme (zehirli atık madde konsantrasyonu artar)

YAĞMUR SUYU TOPLAMA:

Sal tentesi yağmur suyu toplama sistemine sahiptir. İlk yağmuru toplamadan önce tuz tabakası yıkansın diye birkaç dakika beklenir. Toplanan su kaplar ve plastik torbalarda depolanır.

GIDA YÖNETİMİ:

Acil rasyonlar eşit olarak dağıtılır. Karbonhidrat zengin gıdalar tercih edilir (su tüketimini artırmaz). Çiğ balık yenilebilir ancak su kısıtlıysa protein sindirimi su tüketimini artırır.

DENİZ SUYU ARINDIRILMASI:

Solar still: Güneş enerjisi ile buharlaştırma-yoğuşturma prensibiyle tatlı su üretimi. Desalination kiti: Kimyasal veya mekanik yöntemle tuz giderme.`,
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
    content: `KAPALI ALAN TANIMI:

Sınırlı giriş-çıkış noktası olan, sürekli insan çalışması için tasarlanmamış, tehlikeli atmosfer oluşma riski bulunan kapalı bölme. Örnekler: ballast tankları, yakıt tankları, kargo tankları, koferdamlar, boş bölmeler, zincir dolabı, boya deposu.

TEHLİKELİ ATMOSFER:

Oksijen yetersizliği: Normal %20.9 O₂. Tehlikeli: <%19.5. Ölümcül: <%16. Paslanma, organik madde çürümesi ve inert gaz oksijeni tüketir.

Oksijen fazlalığı: >%23.5 O₂. Yanıcı maddelerin tutuşma riski artar.

Zehirli gazlar:
- H₂S (Hidrojen sülfür): Çürüme sonucu oluşur. >10 ppm tehlikeli, >100 ppm ölümcül. Kokusu yüksek konsantrasyonda algılanamaz (sinir felci).
- CO (Karbon monoksit): Eksik yanma ürünü. >35 ppm tehlikeli.
- CO₂ (Karbondioksit): Fermantasyon, inert gaz kalıntısı. >0.5% tehlikeli.
- SO₂ (Kükürt dioksit): Kükürtlü yakıt yanma ürünü.

Patlayıcı atmosfer: Yanıcı gaz konsantrasyonunun LEL (Lower Explosive Limit) ile UEL (Upper Explosive Limit) arasında olması.

İSTATİSTİKLER:

IMO verilerine göre kapalı alan kazalarında ölümlerin çoğu kurtarma girişimi sırasında oluşmaktadır. İlk kurban için eğitimsiz ve donanımsız kurtarma girişimi ikinci ve üçüncü kurbanlara yol açmaktadır.`,
    keyPoints: [
      "O₂ < %19.5 tehlikeli, < %16 ölümcüldür",
      "H₂S yüksek konsantrasyonda koku algısını yok eder",
      "Kapalı alan ölümlerinin çoğu eğitimsiz kurtarma girişiminde oluşur",
      "Ballast tankları, yakıt tankları, koferdamlar kapalı alan örnekleridir",
    ],
    warnings: [
      "Eğitimsiz ve donanımsız kurtarma girişimi YAPILMAZ",
      "Atmosfer testi yapılmadan kapalı alana girilmez",
    ],
  },
  "entry-permit": {
    title: "Giriş İzin Sistemi (Entry Permit)",
    introduction: "Kapalı alana giriş, sistematik bir izin prosedürü ile kontrol altına alınır. Entry Permit, ISM Code ve şirket SMS prosedürleri gereği zorunludur.",
    content: `GİRİŞ İZNİ PROSEDÜRÜ:

1. Risk değerlendirmesi yapılır (kimin, neden, ne zaman gireceği).
2. Bölme havalandırılır (en az 24 saat veya yeterli süre).
3. Atmosfer testi yapılır: O₂, LEL, H₂S, CO ölçümleri.
4. Test sonuçları "güvenli" ise giriş izin belgesi düzenlenir.
5. Belge yetkili kişi (kaptan veya chief officer) tarafından onaylanır.
6. Giriş yapan personel ve gözcü (standby person) belirlenir.
7. İletişim aracı (VHF veya kablolu) temin edilir.
8. Kurtarma ekipmanı (SCBA, harness, tripod) hazırlanır.

ENTRY PERMİT İÇERİĞİ:

Bölme adı ve konumu
Giriş amacı ve tahmini süre
Atmosfer test sonuçları (O₂, LEL, H₂S, CO)
Havalandırma durumu
Giren personel isimleri
Gözcü (standby person) ismi
Kurtarma ekipmanı durumu
Yetkili onayı ve zaman damgası

İPTAL KOŞULLARI:

Atmosfer değişikliği şüphesi, havalandırma kesintisi, acil durum alarmı veya izin süresinin dolması halinde bölme derhal terk edilir.`,
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
    content: `ÖLÇÜLEN PARAMETRELER:

1. Oksijen (O₂): Güvenli aralık: %20.9 (±%1). Minimum güvenli: %19.5.
2. Yanıcı gaz (LEL): Güvenli: <%1 LEL. Uyarı: >%10 LEL.
3. Hidrojen sülfür (H₂S): Güvenli: <5 ppm. TWA: 10 ppm. STEL: 15 ppm.
4. Karbon monoksit (CO): Güvenli: <25 ppm. TWA: 35 ppm.

ÖLÇÜM CİHAZLARI:

Multi-gas dedektör (4 gazlı): O₂, LEL, H₂S, CO'yu aynı anda ölçer. En yaygın kullanılan cihaz. Kişisel taşınabilir tip ve pompalı uzaktan örneklemeli tip mevcuttur.

Pompalı tip: Uzun hortum ile bölmeye girmeden atmosfer örneği çekilir. Giriş öncesi test için gereklidir.

Kişisel dedektör: Giriş yapan personelin üzerinde taşıdığı, sürekli ölçüm yapan ve alarm veren cihaz.

KALİBRASYON:

Cihazlar üretici tavsiyesine göre düzenli olarak kalibre edilmelidir (genellikle 6 ayda bir veya kullanım öncesi). Kalibrasyon gazları ile doğrulama yapılır. Kalibrasyon kayıtları tutulur.

TEST PROSEDÜRÜ:

1. Havalandırmayı durdur (gerçek atmosferi ölç).
2. Pompalı cihazla bölmenin üst, orta ve alt seviyelerinden ölçüm yap (H₂S yukarıda, ağır gazlar altta birikir).
3. Sonuçları Entry Permit'e kaydet.
4. Giriş sırasında kişisel dedektör ile sürekli izleme yap.`,
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
    content: `KURTARMA PRENSİPLERİ:

1. ALARM VER: Gözcü (standby person) derhal alarm verir ve köprüüstünü bilgilendirir.
2. KENDİN GİRME: Eğitimsiz ve SCBA'sız kurtarma girişimi YAPMA. İkinci kurban olma riski çok yüksektir.
3. EĞİTİMLİ EKİP: Kurtarma ekibi SCBA ile donanır.
4. HARNESS VE HALAT: Kurtarılacak kişiye harness takılır, tripod veya davit ile çıkarılır.

KURTARMA EKİPMANI:

SCBA (Self-Contained Breathing Apparatus): 30 dakika kapasiteli nefes cihazı.
EEBD (Emergency Escape Breathing Device): 10-15 dakikalık kaçış cihazı. Kurtarma için yetersizdir; yalnızca kaçış için kullanılır.
Tripod ve vinç: Dikey erişimli bölmelerde (tank manholu) kişiyi çıkarmak için.
Stretcher (sedye): Yaralı taşıma.
İletişim: Sürekli iletişim hattı.

TATBİKAT:

SOLAS gereği kapalı alan kurtarma tatbikatı en az 2 ayda bir yapılmalıdır. Tatbikat gerçekçi senaryo ile uygulanır. SCBA kullanımı, harness takma, tripod kullanımı pratik edilir.

PSC DENETİMİNDE:

Kapalı alan giriş prosedürü, ekipman durumu ve tatbikat kayıtları PSC denetimlerinde kontrol edilir. Eksiklikler detainable deficiency olabilir.`,
    keyPoints: [
      "SCBA'sız kurtarma girişimi YAPILMAZ – ikinci kurban riski",
      "Kapalı alan kurtarma tatbikatı en az 2 ayda bir yapılmalıdır",
      "EEBD yalnızca kaçış içindir, kurtarma için SCBA kullanılır",
      "Tripod ve harness dikey erişimli bölmelerde zorunludur",
    ],
    warnings: [
      "Eğitimsiz kurtarma girişimi en sık ölüm nedenidir",
      "EEBD kurtarma operasyonu için KESİNLİKLE yeterli değildir",
    ],
  },

  // =====================================================
  // BÖLÜM 2/3 EKİ - YANGIN VE LSA EKİPMANLARI
  // =====================================================
  "eebd": {
    title: "EEBD – Acil Kaçış Solunum Cihazı",
    introduction: "EEBD (Emergency Escape Breathing Device), duman veya zehirli gazla dolu bir mahalden GÜVENLİ bir bölgeye KAÇIŞ için kullanılan, kısa süreli solunum havası sağlayan taşınabilir bir cihazdır. Yangın söndürme veya kurtarma için KULLANILMAZ.",
    content: `EEBD NEDİR?

EEBD, bir kişinin tehlikeli atmosferden (duman, sıcak gaz, oksijen yetersizliği) acil kaçışı sırasında solunum havası sağlar. Genellikle bir hava/oksijen kaynağı ve başı tamamen örten bir başlık (hood) veya yüz maskesinden oluşur. Başlık, gözleri ve yüzü dumandan korur.

YASAL DAYANAK:

SOLAS Bölüm II-2, Kural 13 (kaçış yolları) ve FSS Code Bölüm 3 EEBD gereksinimlerini düzenler. EEBD'ler en az 10 dakika kullanım süresi sağlamalıdır.

TAŞIMA GEREKSİNİMLERİ:

- Yaşam mahallerinde (accommodation) acil kaçış için EEBD bulundurulur.
- Makine mahallerinde en az iki adet EEBD, normal çalışma istasyonlarına yakın ve çıkış yollarında bulunur.
- Her EEBD'nin konumu yangın kontrol planında işaretlenir.
- Eğitim amaçlı ayrı bir EEBD (training unit) bulundurulur; servis ömrünü tüketmemek için gerçek cihazlar tatbikatta kullanılmaz.

EEBD KULLANIM İLKELERİ:

1. Başlığı tak ve hava akışını başlat.
2. Eğilerek, en kısa kaçış yolundan güvenli bölgeye ilerle.
3. Süre kısıtlıdır (≈10-15 dk); zaman kaybetme.
4. Güvenli bölgeye ulaşınca cihazı çıkar.

EEBD ile SCBA FARKI:

EEBD yalnızca KAÇIŞ içindir; kapalı/oksijensiz mahalle GİRİŞ, yangın söndürme veya kurtarma operasyonu için KULLANILMAZ. Bu amaçlar için SCBA (bağımsız solunum cihazı) gereklidir. EEBD'nin süresi ve koruması bu görevler için yetersizdir.

BAKIM VE KONTROL:

EEBD basınç göstergesi (varsa) düzenli kontrol edilir, mühür (seal) sağlamlığı denetlenir, son kullanma/servis tarihi takip edilir. Mühür kırıksa veya basınç düşükse cihaz "out of service" işaretlenir ve değiştirilir.`,
    keyPoints: [
      "EEBD yalnızca KAÇIŞ içindir – yangın söndürme/kurtarma için kullanılmaz",
      "En az 10 dakika solunum havası sağlar (FSS Code Bölüm 3)",
      "Makine mahallerinde en az 2 adet, kaçış yollarında bulunur",
      "Eğitim için ayrı training unit kullanılır; gerçek cihaz tatbikatta tüketilmez",
    ],
    warnings: [
      "EEBD ile oksijensiz/kapalı mahalle GİRİLMEZ – bu SCBA görevidir",
      "Mührü kırık veya basıncı düşük EEBD derhal değiştirilmelidir",
    ],
  },
  "scba": {
    title: "SCBA – Bağımsız Solunum Cihazı",
    introduction: "SCBA (Self-Contained Breathing Apparatus), kullanıcının ortam havasından bağımsız olarak basınçlı hava soluduğu, yangın söndürme ve kapalı/tehlikeli mahalle giriş için kullanılan tam korumalı solunum cihazıdır.",
    content: `SCBA BİLEŞENLERİ:

- Yüksek basınçlı hava tüpü (genellikle 6-9 litre, 200-300 bar).
- Basınç düşürücü regülatör ve talep valfi (demand valve).
- Tam yüz maskesi (full face mask).
- Sırt taşıma sistemi (harness ve back plate).
- Basınç göstergesi ve düşük basınç düdüğü (low-pressure warning whistle).

KAPASİTE VE SÜRE:

FSS Code Bölüm 3'e göre SCBA en az 1200 litre serbest hava veya 30 dakika kullanım kapasitesine sahip olmalıdır. Gerçek kullanım süresi; iş yükü, solunum hızı ve kişiye göre değişir; ağır eforda süre belirgin biçimde kısalır.

İTFAİYECİ TEÇHİZATININ PARÇASI:

SCBA, itfaiyeci teçhizatının (fireman's outfit) zorunlu parçasıdır. Her teçhizat için yeterli yedek dolum/şişe bulundurulur (gemide en az 2 yedek dolu tüp veya dolum kompresörü).

KULLANIM PRENSİPLERİ:

1. Giriş öncesi tüp basıncını ve maske sızdırmazlığını kontrol et.
2. Düşük basınç düdüğünün çaldığı eşiği bil (dönüş için kalan süre).
3. Buddy system (ikili çalışma) zorunludur; ekip dışarıdan kontrol edilir.
4. Hava yarıya inmeden dönüş planı yap (içeri girişte harcanan = dönüşte gereken).
5. Kullanım sonrası tüpü doldur, maske ve regülatörü temizle/dezenfekte et.

BAKIM:

Tüpler periyodik hidrostatik teste (genellikle 5 yılda bir) tabidir. Maske, regülatör ve düdük her kullanım öncesi/sonrası kontrol edilir. Kayıtlar tutulur.`,
    keyPoints: [
      "SCBA en az 1200 L hava / 30 dk kapasiteli olmalıdır (FSS Code Bölüm 3)",
      "İtfaiyeci teçhizatının zorunlu parçasıdır; yedek dolum bulundurulur",
      "Buddy system ve düşük basınç düdüğü güvenliğin temelidir",
      "Tüpler periyodik hidrostatik teste tabidir",
    ],
    warnings: [
      "Hava yarıya inmeden dönüş başlatılmalı – giriş kadar dönüş havası gerekir",
      "Maske sızdırmazlık kontrolü yapılmadan tehlikeli atmosfere girilmez",
    ],
  },
  "firemans-outfit": {
    title: "İtfaiyeci Teçhizatı (Fireman's Outfit)",
    introduction: "İtfaiyeci teçhizatı, yangına müdahale eden personeli ısı, alev ve dumandan koruyan kişisel koruyucu giysi ile solunum cihazından oluşan zorunlu bir setdir (SOLAS II-2 / FSS Code Bölüm 3).",
    content: `TEÇHİZAT BİLEŞENLERİ:

A) Kişisel donanım:
- Isıya ve dumana dayanıklı koruyucu giysi (yüzeyden ısı iletimini sınırlar, su geçirmez dış katman).
- Çizme ve eldiven (elektrik yalıtkanı, ısıya dayanıklı).
- Kafa, boyun ve yanları koruyan kask (helmet).
- Elektrikli emniyet lambası: en az 3 saat çalışma süreli.
- Yangın baltası (fireman's axe), elektrik yalıtkan saplı.

B) Solunum cihazı:
- SCBA (bağımsız basınçlı hava solunum cihazı).

C) Cankurtaran hattı (lifeline):
- Ateşe dayanıklı, en az 30 m, kanca ile teçhizata bağlanabilir; ekiple iletişim/geri çekme için.

GEMİDE BULUNDURULMASI GEREKEN SAYI:

SOLAS II-2 Kural 10.10, gemi tipi ve büyüklüğüne göre asgari teçhizat sayısını belirler. Yük gemilerinde genellikle en az 2 itfaiyeci teçhizatı bulunur; yolcu gemilerinde mahal/uzunluğa göre sayı artar. Tankerlerde ek teçhizat gerekebilir.

SAKLAMA VE ERİŞİM:

Teçhizatlar birbirinden uzak, kolay erişilebilir ve işaretli konumlarda saklanır; biri bir yangında erişilemez olursa diğeri kullanılabilsin diye dağıtılır. Konumları yangın kontrol planında gösterilir.

BAKIM VE KONTROL:

Giysi, eldiven, çizme ve kaskın bütünlüğü; lamba şarjı ve süresi; SCBA tüp basıncı ve maske durumu düzenli kontrol edilir ve kayıt tutulur.`,
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
    content: `YANGIN POMPALARI:

- Ana yangın pompaları: Gemi tipine göre sayı ve kapasitesi belirlenir; gerekli debiyi ve hidrant basıncını sağlar.
- Acil yangın pompası (emergency fire pump): Makine dairesi devre dışı kalsa bile su sağlayabilmek için makine dairesi dışında, ayrı bir mahalde ve bağımsız güç kaynaklı olarak bulunur.

YANGIN ANA DEVRESİ (FIRE MAIN):

Pompalardan beslenen, güverteler boyunca uzanan basınçlı su hattıdır. İzolasyon valfleri ile hasarlı bölüm ayrılabilir, devre çalışmaya devam eder.

HİDRANTLAR:

Hidrantlar, gemideki herhangi bir noktaya en az iki su jeti ulaşacak şekilde yerleştirilir (biri tek hortum boyundan). Her hidrantta gerekli minimum basınç sağlanmalıdır.

HORTUMLAR VE NOZULLAR:

- Yangın hortumları her hidrantın yanında, bağlantıya hazır bulunur. Uzunlukları mahale göre standarttır.
- Nozullar çift amaçlıdır (dual-purpose): tam jet (jet) ve sprey/sis (spray) modları. Standart nozul çapları yaklaşık 12 mm, 16 mm ve 19 mm'dir. Kapatma (shut-off) özelliği bulunur.

ULUSLARARASI SAHİL BAĞLANTISI (INTERNATIONAL SHORE CONNECTION):

Gemi yangın devresine karadan veya başka bir gemiden su basılabilmesi için standart ölçülü bir bağlantı flanşıdır. Her gemide en az bir adet bulunur. Standart boyutları (dış çap 178 mm, cıvata daire çapı 132 mm vb.) tüm dünyada aynıdır; böylece liman/itfaiye teçhizatı gemiye bağlanabilir.

KONTROL VE BAKIM:

Pompalar, izolasyon valfleri, hidrant valfleri, hortum contaları ve nozullar haftalık/aylık kontrol edilir. Sızıntı, çatlak veya korozyon defect olarak raporlanır.`,
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
    content: `BÖLME SINIFLARI:

A SINIFI (A-Class) bölmeler:
- Çelik veya eşdeğer malzemeden yapılır, uygun şekilde takviyelidir.
- 60 dakikalık standart yangın testi boyunca duman ve alev geçişini önler (bütünlük).
- Yalıtım seviyesine göre alt sınıflara ayrılır: A-60, A-30, A-15, A-0. Sayı, test başlangıcından itibaren ısının diğer yüzde ortalama 140°C (veya herhangi bir noktada 180°C) artışını geciktirdiği DAKİKA sayısıdır. A-0'da yalıtım şartı yoktur (yalnız bütünlük).

B SINIFI (B-Class) bölmeler:
- Yanmaz malzemeden yapılır; 30 dakika boyunca alev geçişini önler.
- Yalıtıma göre B-15 ve B-0 olarak ayrılır.

C SINIFI (C-Class) bölmeler:
- Yanmaz malzemeden yapılır; ısı geçişi veya alev için belirli bir süre şartı yoktur.

ANA DİKEY BÖLGELER (MAIN VERTICAL ZONES):

Gemi, A sınıfı bölmelerle ana dikey yangın bölgelerine ayrılır (yolcu gemilerinde uzunluk ve alan sınırı vardır). Böylece bir bölgedeki yangın komşu bölgelere kolayca yayılamaz.

YANGIN KAPILARI VE DAMPERLER:

- Yangın kapıları (fire doors): A/B sınıfı bölmelerdeki geçişlerde, kendiliğinden kapanan ve köprüden uzaktan kapatılabilen tiptedir.
- Yangın damperleri (fire dampers): Havalandırma kanallarında, yangın bölmesi sınırından geçişte yangının kanal üzerinden yayılmasını önler.

KAÇIŞ YOLLARININ KORUNMASI:

Merdiven kovaları ve kaçış yolları, yangın bölmeleriyle korunarak duman ve aleve karşı güvenli tahliye sağlanır.`,
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
    content: `PLANDA NELER GÖSTERİLİR?

- Kontrol istasyonları (control stations).
- A ve B sınıfı bölmelerle ayrılmış yangın bölümleri.
- Yangın algılama ve alarm sistemleri.
- Sprinkler ve sabit söndürme (CO₂, köpük vb.) sistemleri.
- Taşınabilir söndürücüler, hidrantlar, hortumlar ve uluslararası sahil bağlantısı.
- Kaçış yolları, merdiven kovaları ve toplanma istasyonları.
- Havalandırma sistemleri, fan kumandaları ve yangın damperlerinin konumu.
- EEBD, SCBA ve itfaiyeci teçhizatının konumu.

SEMBOLLER:

Plan, IMO tarafından standartlaştırılmış grafik semboller (IMO Kararı A.952(23)) ile çizilir; böylece her milletten itfaiyeci planı okuyabilir.

KARA İTFAİYESİ İÇİN KOPYA:

SOLAS II-2/15.2.4 gereği planın bir kopyası, güverte evi (deckhouse) dışında, belirgin işaretli ve hava şartlarına dayanıklı (weathertight) bir muhafaza içinde bulundurulur. Böylece karadan gelen itfaiye ekibi gemiye girmeden plana ulaşabilir.

GÜNCELLİK:

Plan, gemide yapılan değişikliklerle (ekipman ekleme/çıkarma) güncel tutulmalıdır. Eski/yanlış plan denetimde bulgu doğurur ve acil durumda yanıltıcıdır.

KULLANIM:

Familiarization sırasında yeni mürettebata yangın istasyonları, kaçış yolları ve ekipman konumları plan üzerinden gösterilir.`,
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
    content: `DALMA ELBİSESİ (IMMERSION SUIT):

Su geçirmez, ısı yalıtımlı, tüm vücudu (eller ve ayaklar dahil) örten tek parça elbisedir. Soğuk suda vücut ısısının korunmasını sağlar.

Performans gereksinimleri (LSA Code 2.3):
- Yardımsız olarak 2 dakika içinde giyilebilmeli.
- Giyildikten sonra 5 metre yükseklikten suya atlanabilmeli; su girişi olmamalı.
- İçinde yüzülebilmeli, can salına çıkılabilmeli.
- Yalıtımlı tip: 0-2°C suda 1 saat boyunca vücut iç sıcaklığının 2°C'den fazla düşmesini önlemeli.
- Yalıtımsız (yalnız su geçirmez) tipte ayrıca uygun can yeleği gerekebilir; yalıtımlı tip yeterli yüzdürmeyi sağlayabilir.

Bulundurma: SOLAS gereği genellikle gemideki her kişi için bir dalma elbisesi; ayrıca vardiya/uzak çalışma istasyonları için ek elbiseler.

TERMAL KORUYUCU (TPA – THERMAL PROTECTIVE AID):

Düşük ısı iletkenliğine sahip, su geçirmez malzemeden yapılan, başı hariç tüm vücudu örten bir tulum/örtüdür. Can salı veya filikada, ıslak olmayan kazazedede konveksiyon ve buharlaşma yoluyla ısı kaybını azaltır.

Özellikleri (LSA Code 2.5):
- -30°C ile +20°C hava sıcaklıklarında kullanılabilmeli.
- Can salı/filikadaki donanım listesinde belirli sayıda bulundurulur.
- Dalma elbisesinin yerine geçmez; TPA esas olarak sudan çıkmış kazazede içindir.

FARK:

Dalma elbisesi SUDA korur; TPA sudan çıkmış (sal/filika içindeki) kişide ısı kaybını azaltır.`,
    keyPoints: [
      "Dalma elbisesi 2 dakikada yardımsız giyilebilmeli (LSA Code 2.3)",
      "Yalıtımlı tip: 0-2°C suda 1 saatte iç sıcaklık düşüşü <2°C",
      "TPA su geçirmez örtüdür; sal/filikadaki kuru kazazedede ısı kaybını azaltır",
      "TPA dalma elbisesinin yerine geçmez",
    ],
    warnings: [
      "Islak kişide TPA tek başına yetersizdir; önce kuruluk/su tahliyesi sağlanmalı",
    ],
  },
  "mes": {
    title: "Deniz Tahliye Sistemi (MES)",
    introduction: "MES (Marine Evacuation System), çok sayıda kişinin gemiden can sallarına hızlı ve güvenli biçimde inmesini sağlayan, kaydırak (slide) veya tahliye kanalı (chute) ile platform/can sallarından oluşan bir tahliye sistemidir (LSA Code Bölüm 6). Özellikle yüksek fribordlu yolcu gemilerinde kullanılır.",
    content: `MES NEDİR?

Yüksek bordalı gemilerde kişilerin doğrudan can sallarına inmesi zordur. MES, gemi ile deniz seviyesi arasında bir kaydırak veya kapalı kanal kurar; kişiler bu yoldan bir platforma veya doğrudan büyük kapasiteli can sallarına iner.

TİPLER:

- Kaydıraklı (slide) sistem: Şişme bir kaydırak ile kişiler platforma/sala iner.
- Kanal (chute) sistem: Dikey, kapalı esnek bir kanal içinden kontrollü iniş yapılır; yüksek fribordlarda tercih edilir.

PERFORMANS:

LSA Code 6.2, MES'in belirli süre içinde gerekli sayıda kişiyi tahliye edebilmesini, deniz koşullarında çalışmasını ve şişme/kurulum sürelerini şart koşar. Sistem köprüden/güverteden hızla devreye alınabilmelidir.

KULLANIM AKIŞI:

1. Toplanma istasyonunda yolcular yönlendirilir.
2. MES devreye alınır; platform/sallar şişer ve konumlanır.
3. Kişiler kaydırak/kanaldan platforma/sala iner.
4. Sallar dolunca gemiden ayrılır.

BAKIM:

MES periyodik servis ve testlere tabidir (yıllık kontroller, 5 yıllık load test dahil). Servis yetkili istasyonlarca yapılır; kayıtlar tutulur.

AVANTAJI:

Çok sayıda kişiyi kısa sürede ve filika indirme manevrası gerektirmeden tahliye eder; özellikle büyük yolcu gemilerinde kritik öneme sahiptir.`,
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
    content: `KULLANIM AMACI:

İlk ince halatın hedefe ulaştırılması, ardından bu halatla daha kalın bir halatın veya çekme/transfer hattının çekilmesini sağlar. Gemiden gemiye veya gemiden kıyıya bağlantı, yedekleme ve kurtarma operasyonlarında kullanılır.

GEREKSİNİMLER (LSA Code 7.1):

- Atış mesafesi: Sakin havada en az 230 metre halatı yeterli doğrulukla atabilmeli.
- Donanım: En az 4 adet fırlatma roketi/projektili ve 4 adet halat (line) bulundurulur.
- Halatların kopma mukavemeti yeterli olmalı; nemden korunmalı.
- Su geçirmez muhafazada saklanır; kullanım talimatı paket üzerinde ve okunaklı olmalı.

TİPLER:

- Roketle (rocket-type) çalışan piroteknik aparatlar yaygındır.
- Bazı tiplerde tabanca benzeri fırlatıcı kullanılır.

GÜVENLİK:

- Piroteknik içerdiği için yalnız eğitimli personel kullanmalı.
- Atış doğrultusunda insan/parlayıcı madde bulunmamalı.
- Son kullanma tarihi takip edilir; süresi dolan üniteler usulüne uygun bertaraf edilir.

BAKIM:

Su geçirmez ambalaj bütünlüğü, son kullanma tarihi ve adet sayımı periyodik olarak (LSA envanter kontrolünde) doğrulanır.`,
    keyPoints: [
      "Sakin havada en az 230 m halat atabilmeli (LSA Code 7.1)",
      "En az 4 roket/projektil ve 4 halat bulundurulur",
      "Önce ince halat, sonra kalın halat/çekme hattı çekilir",
      "Piroteknik içerir; yalnız eğitimli personel kullanır",
    ],
    warnings: [
      "Atış doğrultusunda kişi veya parlayıcı madde bulunmamalı",
      "Son kullanma tarihi geçmiş üniteler güvenle bertaraf edilmeli",
    ],
  },

  // =====================================================
  // BÖLÜM 11 - İŞ SAĞLIĞI VE GÜVENLİĞİ
  // =====================================================
  "ppe": {
    title: "Kişisel Koruyucu Donanım (KKD/PPE)",
    introduction: "Kişisel koruyucu donanım (PPE), iş kazalarına karşı son savunma hattıdır. Tehlike kaynağında giderilemediğinde kişiyi korur; ancak hiçbir zaman mühendislik/yönetimsel önlemlerin yerine geçmez.",
    content: `KKD KATEGORİLERİ:

- Baş koruması: Baret (helmet) – düşen cisim, çarpma.
- Ayak koruması: Çelik burunlu güvenlik ayakkabısı/çizme – ezilme, kayma, delinme.
- El koruması: Eldiven – kesik, ısı, kimyasal, titreşim (göreve uygun tip).
- Göz/yüz koruması: Gözlük, yüz siperi – kıvılcım, talaş, kimyasal sıçrama.
- İşitme koruması: Kulak tıkacı/kulaklık – >85 dBA gürültü ortamlarında (makine dairesi).
- Solunum koruması: Toz maskesi, yarım/tam yüz maskesi, SCBA (tehlikeye göre).
- Vücut koruması: Tulum/iş elbisesi, alev geciktirici giysi, kimyasal tulum.
- Yüksekte çalışma: Tam vücut emniyet kemeri (full body harness) ve bağlantı/lanyard.
- Görünürlük: Reflektörlü yelek (güverte/liman operasyonları).
- Su üstü çalışma: Can yeleği / çalışma yelekleri (work vest).

KONTROL HİYERARŞİSİ İÇİNDE YERİ:

Risk kontrolünde sıralama: 1) Tehlikeyi yok et, 2) İkame et, 3) Mühendislik önlemi, 4) Yönetimsel önlem, 5) PPE. PPE EN SON sıradadır; tek başına yeterli sayılmaz.

YASAL/SİSTEMSEL DAYANAK:

ISM Code kapsamındaki güvenlik yönetim sistemi (SMS) ve MLC 2006, uygun PPE sağlanmasını, eğitimini ve kullanımını şart koşar. PPE ücretsiz sağlanır.

DOĞRU KULLANIM:

- Göreve ve tehlikeye uygun tip seçilir (örn. kaynakta kaynak maskesi + alev geciktirici giysi).
- Doğru beden/uyum; hasarlı PPE kullanılmaz, değiştirilir.
- Bakım, temizlik ve saklama talimatlara uygun yapılır.
- Toolbox talk ve familiarization ile kullanım pekiştirilir.`,
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
    content: `İZİN GEREKTİREN BAŞLICA İŞLER:

- Sıcak iş (hot work): Kaynak, taşlama, kesme – kıvılcım/alev üreten işler.
- Kapalı/tank mahalline giriş (enclosed space entry).
- Yüksekte ve borda dışında çalışma (working aloft / overside).
- Elektrik işleri ve enerji izolasyonu (Lock-Out/Tag-Out – LOTO).
- Soğutucu/kimyasal hatlarda iş, basınçlı sistemlerde iş.

SICAK İŞ İZNİ (HOT WORK PERMIT):

- Belirlenmiş atölye dışındaki tüm sıcak işler için izin gerekir.
- Tankerlerde ve yanıcı atmosfer riskli mahallerde gaz ölçümü (gas-free / gaz testi) zorunludur; "gas-free certificate" alınır.
- Çevredeki yanıcı maddeler uzaklaştırılır, yangın nöbetçisi (fire watch) ve söndürücü hazır bulunur.
- İş bitiminde alan kontrol edilir; gizli tutuşma (smouldering) için bekleme süresi uygulanır.

İZİN AKIŞI:

1. İşi yapacak kişi izin talep eder.
2. Tehlikeler ve kontroller (risk assessment) belirlenir.
3. Yetkili kişi (genellikle ilgili zabit/Master onayı) kontrolleri doğrular ve izni verir.
4. İzin süre ve kapsamla sınırlıdır; koşullar değişirse iptal edilir.
5. İş bitince izin kapatılır ve kayıt tutulur.

ENERJİ İZOLASYONU (LOTO):

Bakımdan önce makine/elektrik enerjisi kesilir, kilitlenir ve etiketlenir; yanlışlıkla devreye girmesi önlenir. İş bitiminde sadece izolasyonu yapan kişi kilidi açar.

GEMİ-KARA ARAYÜZÜ:

İzin sistemi, ISM/SMS prosedürleriyle ve PSC denetimleriyle uyumlu yürütülür; kayıtlar denetlenir.`,
    keyPoints: [
      "Permit-to-work yüksek riskli işleri yazılı izin ve onayla kontrol eder",
      "Atölye dışı sıcak iş için izin + gaz testi (tankerde gas-free) zorunludur",
      "Fire watch ve söndürücü hazır; iş sonrası gizli tutuşma için bekleme",
      "Enerji izolasyonu LOTO ile yapılır; kilidi yalnız uygulayan açar",
    ],
    warnings: [
      "İzinsiz sıcak iş veya kapalı mahal girişi ciddi kaza/ölüm nedenidir",
      "Koşullar değişirse izin derhal iptal edilmeli",
    ],
  },
  "risk-assessment": {
    title: "Risk Değerlendirmesi ve JSA",
    introduction: "Risk değerlendirmesi, bir işteki tehlikeleri önceden belirleyip olasılık ve şiddetine göre değerlendirerek uygun kontrol önlemlerini almak için yapılan sistematik bir süreçtir. ISM Code gemilerde risk değerlendirmesini zorunlu kılar.",
    content: `TEMEL KAVRAMLAR:

- Tehlike (hazard): Zarar verme potansiyeli olan kaynak/durum (örn. dönen parça, yüksek basınç, kaygan zemin).
- Risk: Zararın gerçekleşme olasılığı ile şiddetinin birleşimi (Risk = Olasılık × Şiddet).

RİSK DEĞERLENDİRME ADIMLARI:

1. Tehlikeleri belirle.
2. Kimin/neyin zarar görebileceğini belirle.
3. Riski değerlendir (olasılık × şiddet; risk matrisi kullanılır).
4. Kontrol önlemlerine karar ver (kontrol hiyerarşisi).
5. Bulguları kaydet ve uygula.
6. Gözden geçir ve güncelle (koşul değişince).

KONTROL HİYERARŞİSİ:

1) Tehlikeyi yok et → 2) İkame et → 3) Mühendislik kontrolü (koruma, havalandırma) → 4) Yönetimsel kontrol (prosedür, eğitim, izin) → 5) PPE. Üst sıradaki önlemler tercih edilir.

JSA / JHA (Job Safety/Hazard Analysis):

Belirli bir işi adımlara ayırıp her adımın tehlikesini ve kontrolünü inceleyen pratik bir yöntemdir. Genellikle işten hemen önce, ilgili ekip tarafından doldurulur.

TOOLBOX TALK:

İşe başlamadan ekiple yapılan kısa güvenlik brifingidir; JSA sonuçları, izinler ve özel tehlikeler paylaşılır.

ISM BAĞLANTISI:

ISM Code, şirketten ve gemiden faaliyetlerine ilişkin riskleri değerlendirmesini ve önlem almasını ister. Risk değerlendirme kayıtları SMS'in parçasıdır ve denetlenir.`,
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
    content: `SU GEÇİRMEZ BÜTÜNLÜK:

Gemi, su geçirmez perdelerle (bulkhead) bölmelere ayrılır. Bir bölme su alsa bile diğerleri kuru kalır ve gemi yüzer durumda kalır (rezerv sephiye/reserve buoyancy).

- Çatışma perdesi (collision bulkhead): Baş taraftaki ilk su geçirmez perde; baş çarpışmada su girişini sınırlar.
- Su geçirmez kapılar (watertight doors): Köprüden uzaktan kapatılabilir; konum göstergesi köprüdedir. Denizde kapalı tutulması esastır.

YÜZME GÜVENLİĞİ KAVRAMLARI:

- Rezerv sephiye (reserve buoyancy): Su hattı üstündeki su geçirmez hacim; su alındığında batmayı geciktirir.
- Bölmelendirme (subdivision) ve hasar stabilitesi: Belirli sayıda bölme su alsa da geminin ayakta kalmasını sağlayacak şekilde tasarlanır.
- Çapraz su basma (cross-flooding): Tek bordadan su alındığında karşı bölmeye kontrollü su alarak meyli azaltma düzeni.

HASAR KONTROL PLANI VE EL KİTABI:

SOLAS II-1 Kural 19 gereği gemide hasar kontrol planı (damage control plan) ve el kitabı (booklet) bulunur. Bunlarda su geçirmez sınırlar, açıklıklar, kapatma düzenekleri ve bilge/balast düzenlemeleri gösterilir.

MÜDAHALE FAALİYETLERİ:

1. Su girişini tespit et ve sınırla (kapatma, takviye, geçici tıkaç/yama).
2. Su geçirmez kapı/açıklıkları kapat.
3. Bilge ve balast pompalarıyla su tahliyesi/dengeleme.
4. Stabilite ve trimi izle; gerekirse yetkili otoriteyi/şirketi bilgilendir.

BİLGE SİSTEMİ:

Bilge sistemi, bölmelerde biriken suyu tahliye eder; alarmlar ve pompalar düzenli test edilir.`,
    keyPoints: [
      "Su geçirmez bölmelendirme + rezerv sephiye batmayı önler (SOLAS II-1)",
      "Çatışma perdesi baş çarpışmada su girişini sınırlar",
      "Su geçirmez kapılar denizde kapalı tutulur, köprüden izlenir",
      "Hasar kontrol planı/el kitabı (SOLAS II-1/19) gemide bulundurulur",
    ],
    warnings: [
      "Açık bırakılan su geçirmez kapı, kademeli su basmaya ve hızlı batmaya yol açar",
    ],
  },
  "mooring-safety-snapback": {
    title: "Bağlama Güvenliği ve Snap-Back Bölgeleri",
    introduction: "Bağlama (mooring) operasyonları, gemide en sık ciddi yaralanma yaşanan işlerden biridir. Gergin halatın kopması (snap-back) ve yüksek gerilim altındaki ekipman ölümcül kazalara yol açabilir. OCIMF MEG4 bu alanda referans kılavuzdur.",
    content: `SNAP-BACK NEDİR?

Gergin bir bağlama halatı koptuğunda, biriken elastik enerji açığa çıkar ve halatın uçları kırbaç gibi geri savrulur (snap-back). Bu savrulma ölümcül olabilir. Sentetik halatlar yüksek enerji depolar; çelik teller daha az gerilir ama kopmada yine tehlikelidir.

SNAP-BACK BÖLGELERİ:

Halat geometrisine (makara/fairlead, kapstan/winch hizası) göre, kopan halatın savrulabileceği tehlikeli alanlardır. Bu bölgelerde durulmaz. Not: Modern yaklaşımda (MEG4) güvertenin TAMAMI potansiyel tehlike alanı sayılır; eski tip boyalı "snap-back zone" işaretleri yanıltıcı olabileceğinden genel farkındalık esastır.

GÜVENLİK İLKELERİ:

- Gergin halatın "bight" (kıvrımı) içinde veya doğrultusunda durma.
- Yük altındaki halata el/ayak yaklaştırma; eldiven sıkışmasına dikkat et.
- Winch freni doğru ayarlı olmalı; fren ilk kayma noktasında halatı koruyacak şekilde test edilmeli.
- Halat ve kuyruk (tail) durumu kontrol edilir; aşınmış/yorulmuş halat değiştirilir.
- Uygun PPE: baret, güvenlik ayakkabısı, eldiven, reflektörlü yelek.

İLETİŞİM VE ORGANİZASYON:

- Baş/kıç istasyonları ile köprü arasında net iletişim (telsiz) kurulur.
- Operasyon öncesi toolbox talk: roller, tehlike alanları, kaçış yolları.
- Yeterli ve dinlenmiş personel; aceleye getirilmez.

EKİPMAN:

Bitt, fairlead, roller, winch, stoper (stopper) ve halat kuyrukları düzenli kontrol/bakım görür; sertifikalı ekipman kullanılır.`,
    keyPoints: [
      "Snap-back: kopan gergin halatın ölümcül geri savrulmasıdır",
      "MEG4 yaklaşımında tüm güverte tehlike alanı sayılır – bight içinde durulmaz",
      "Winch freni doğru ayarlanır ve düzenli test edilir",
      "Net iletişim, toolbox talk ve uygun PPE esastır",
    ],
    warnings: [
      "Gergin halatın doğrultusunda/bight içinde durmak ölümcüldür",
      "Aşınmış/yorulmuş halat ve yanlış fren ayarı kopma riskini artırır",
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
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 dark:from-[hsl(0,50%,6%)] dark:via-[hsl(15,50%,8%)] dark:to-[hsl(30,50%,10%)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
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
                    className="border border-border/40 rounded-xl overflow-hidden bg-card/80 backdrop-blur"
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

            <section className="rounded-2xl border border-border/40 bg-card/80 p-6 backdrop-blur mt-6">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-semibold text-foreground">Hızlı Erişim</h2>
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
                    className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-all hover:border-red-500/40 hover:bg-background"
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
