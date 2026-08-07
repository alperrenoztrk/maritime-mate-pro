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
    content: `TARİHSEL GELİŞİM:

1954 – OILPOL Sözleşmesi: İlk uluslararası deniz kirliliği sözleşmesidir. Yalnızca petrol deşarjını düzenler. Belirli bölgelerde petrol deşarjını yasaklar ancak uygulama zayıftır.

1967 – Torrey Canyon kazası: İngiltere kıyılarında 119.000 ton ham petrol döküldü. Bu felaket, daha kapsamlı düzenlemelerin gerekliliğini ortaya koydu.

1973 – MARPOL Sözleşmesi kabul edildi: IMO tarafından Londra'da kabul edilen sözleşme, yalnızca petrole değil tüm deniz kirleticilerine yönelik düzenlemeler içerir. Ancak yeterli onay sayısına ulaşamadığından yürürlüğe giremedi.

1978 – MARPOL Protokolü: 1976-77 yıllarında yaşanan tanker kazaları (Argo Merchant, Amoco Cadiz) nedeniyle 1978 Protokolü kabul edildi. 1973 Sözleşmesi'ni absorbe etti; birleşik metin MARPOL 73/78 olarak anılır.

1983 – MARPOL 73/78 yürürlüğe girdi: 2 Ekim 1983'te Ek I ve Ek II zorunlu olarak yürürlüğe girdi.

MARPOL'ün günümüzde 6 eki bulunmakta olup, Ek I ve Ek II zorunlu; Ek III, IV, V ve VI isteğe bağlı onaya tabidir. Ancak pratikte tüm büyük denizcilik devletleri 6 ekin tamamını onaylamıştır.`,
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
    content: `ANA YAPI:

MARPOL sözleşmesi üç katmanlı bir yapıya sahiptir:

1. Ana Sözleşme Metni (Articles): Genel yükümlülükleri, tanımları, uygulama ve yaptırım prensiplerini belirler.

2. Protokoller:
   Protokol I: Zararlı madde olaylarının raporlanması (Kural 8.8'deki bildirim yükümlülüğü).
   Protokol II: Tahkim (uyuşmazlık çözümü).

3. Teknik Ekler:
   Ek I – Petrol kirliliğinin önlenmesi kuralları (Yürürlük: 1983)
   Ek II – Dökme zehirli sıvı maddelerle (NLS) kirlenmenin kontrolü (Yürürlük: 1983)
   Ek III – Denizde paketlenmiş hâlde taşınan zararlı maddelerin kirliliğinin önlenmesi (Yürürlük: 1992)
   Ek IV – Gemilerden kaynaklanan pis suyun (sewage) kirliliğinin önlenmesi (Yürürlük: 2003)
   Ek V – Gemilerden kaynaklanan çöpün kirliliğinin önlenmesi (Yürürlük: 1988)
   Ek VI – Gemilerden kaynaklanan hava kirliliğinin önlenmesi (Yürürlük: 2005)

DEĞİŞİKLİK PROSEDÜRÜ:

MARPOL değişiklikleri "tacit acceptance" (zımni kabul) yöntemiyle yürürlüğe girer. IMO, değişikliği kabul eder ve belirli bir süre içinde üye devletlerin 1/3'ü itiraz etmezse değişiklik otomatik olarak yürürlüğe girer. Bu yöntem, sözleşmenin hızlı güncellenmesini sağlar.`,
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
    content: `TEMEL MARPOL SERTİFİKALARI:

1. IOPP Sertifikası (International Oil Pollution Prevention Certificate):
   Ek I gereği 400 GT ve üzeri gemiler için zorunludur.
   Geçerlilik süresi: 5 yıl (yıllık/ara sörveylerle).
   Kapsamı: Yağlı su ayırıcı, slop tankı, izleme sistemi (ODME), SBT/CBT düzenlemeleri.

2. ISPP Sertifikası (International Sewage Pollution Prevention Certificate):
   Ek IV gereği 400 GT ve üzeri veya 15'ten fazla personel taşıyan gemiler için zorunludur.
   Kapsamı: Pis su arıtma tesisi, dezenfeksiyon sistemi, depolama tankı.

3. IAPP Sertifikası (International Air Pollution Prevention Certificate):
   Ek VI gereği 400 GT ve üzeri gemiler için zorunludur.
   Kapsamı: Motor emisyonları (NOx teknik dosyası), yakıt kükürt oranı, ODS envanteri.

4. IEE Sertifikası (International Energy Efficiency Certificate):
   EEDI/EEXI değerini ve SEEMP'i belgeler.
   2023'ten itibaren tüm gemiler için zorunludur.

5. Fitness Certificate (Ek II):
   NLS taşıyan gemiler için zorunlu uygunluk sertifikasıdır.

6. BWM Sertifikası (International Ballast Water Management Certificate):
   BWM Sözleşmesi gereği düzenlenir.

HER SERTİFİKA İÇİN:
Geçerlilik: 5 yıl
Sörvey: İlk, yıllık, ara, yenileme ve olağanüstü sörveyler
Düzenleyen: Bayrak devleti idaresi veya yetkilendirilmiş klas kuruluşu`,
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
    content: `SÖRVEY TÜRLERİ:

1. İlk Sörvey (Initial Survey): Gemi hizmete girmeden veya MARPOL sertifikası ilk kez alınmadan önce yapılır. Tüm donanımın, sistemlerin ve belgelerin MARPOL gereksinimlerine uygunluğu doğrulanır.

2. Yıllık Sörvey (Annual Survey): Sertifika süresince her yıl yapılır. Donanımın çalışır durumda olduğu ve kayıtların düzgün tutulduğu kontrol edilir.

3. Ara Sörvey (Intermediate Survey): 5 yıllık sertifika süresinin 2. veya 3. yılında yapılır. Yıllık sörveyden daha kapsamlıdır.

4. Yenileme Sörveyi (Renewal Survey): 5 yıllık sertifika süresi dolmadan önce yapılır. İlk sörvey kapsamında yapılır.

5. Olağanüstü Sörvey (Additional Survey): Bir olay, arıza veya onarım sonrasında talep edilir.

PSC DENETİMLERİ:

Liman Devleti Kontrolü (Port State Control) denetçileri, geminin sertifikalarını, kayıt defterlerini, donanım durumunu ve mürettebat bilgisini kontrol eder. Paris MoU, Tokyo MoU gibi bölgesel anlaşmalar denetim standartlarını belirler.

PSC'de en sık tespit edilen MARPOL eksiklikleri:
- OWS arızası veya bypass şüphesi
- Yağ Kayıt Defteri kayıt hataları
- Çöp yönetim planı eksikliği
- IAPP sertifikası ile motor NOx teknik dosyası uyumsuzluğu`,
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
    content: `EK I KAPSAMI:

Ek I, gemilerden denize petrol ve petrol karışımlı suların deşarjını düzenler. Hem makine dairesi sintine suyunu hem de yük tankı artıklarını (tankerler için) kapsar.

TEMEL KURALLAR:

Kural 15 – Makine Dairesi Deşarjı (tüm gemiler):
400 GT ve üzeri gemilerde yağlı su ayırıcı (OWS) bulunmalıdır. Deşarj edilen suyun petrol içeriği 15 ppm'i geçmemelidir. ODME (Oil Discharge Monitoring Equipment) sürekli izleme yapmalı ve 15 ppm aşıldığında otomatik olarak deşarjı durdurmalıdır.

Kural 34 – Özel Alanlarda Deşarj:
Akdeniz, Baltık, Karadeniz, Kızıldeniz, Körfezler bölgesi, Antarktika, Kuzey Batı Avrupa suları ve Oman Denizi Bölgesi özel alan olarak tanımlanmıştır. Özel alanlarda makine dairesi sintine suyu deşarjı, yalnızca OWS üzerinden (15 ppm altında), geminin seyir hâlinde olması koşuluyla yapılabilir. Yük artığı deşarjı özel alanlarda yasaktır.

Kural 20 – Çift Cidarlı Tankerler:
5.000 DWT ve üzeri petrol tankerlerinde çift cidar (double hull) zorunludur. Mevcut tek cidarlı tankerler aşamalı olarak hizmet dışı bırakılmıştır.

SBT ve CBT:
SBT (Segregated Ballast Tanks): Yalnızca balast suyu için ayrılmış tanklar. Yükle temas etmez.
CBT (Clean Ballast Tanks): Yük taşıdıktan sonra temizlenip balast suyu alınan tanklar (artık güncel değil).`,
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
    content: `ÇALIŞMA PRENSİBİ:

OWS, üç aşamalı bir ayırma işlemi gerçekleştirir:

1. Yerçekimi Ayırma (1. kademe): Yoğunluk farkı kullanılarak büyük petrol damlaları yüzeye çıkarılır ve ayrı bir tanka alınır. Bu kademe petrol içeriğini yaklaşık 100 ppm'e düşürür.

2. Koalesör/Filtre Kademe (2. kademe): Özel filtre elemanları küçük petrol damlacıklarını birleştirerek (coalescing) büyük damlaların oluşmasını sağlar. Bu kademe petrol içeriğini 15 ppm altına düşürür.

3. İzleme ve Otomatik Kontrol: ODME (Oil Discharge Monitoring Equipment) veya OCM (Oil Content Monitor), deşarj edilen suyun petrol içeriğini sürekli izler. 15 ppm aşıldığında üç yollu valf otomatik olarak suyu geri devir hattına yönlendirir.

15 PPM KURALI:

MARPOL Ek I Kural 15'e göre, gemiden denize deşarj edilen sintine suyunun petrol içeriği 15 ppm'i geçemez. Bu kural:
- Tüm deniz alanlarında geçerlidir (özel alan ayrımı yoktur)
- Gemi seyir hâlinde olmalıdır
- Deşarj su hattı altından yapılmalıdır

OWS'NİN BYPASS EDİLMESİ:

OWS'nin bypass edilmesi (magic pipe vb.) ağır cezai yaptırımlara tabidir. ABD sularında tespit edilen bypass vakaları milyonlarca dolar para cezası ve hapis cezası ile sonuçlanmıştır.`,
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
      "OWS bypass girişimi ABD'de milyonlarca dolar ceza ve hapis cezası getirir",
      "OCM kalibrasyonu yapılmamış gemi PSC'de alıkonabilir (detention)",
    ],
  },
  "oil-record-book": {
    title: "Yağ Kayıt Defteri (ORB) Part I ve II",
    introduction: "Yağ Kayıt Defteri (Oil Record Book), gemideki tüm petrol operasyonlarının yasal olarak kaydedildiği resmi belgedir ve PSC denetimlerinde en çok incelenen kayıttır.",
    content: `ORB PART I – MAKİNE DAİRESİ OPERASYONLARI:

400 GT ve üzeri tüm gemiler ORB Part I tutmak zorundadır. Kaydedilen operasyonlar:

(A) Sintine tanklarının balastlanması veya temizlenmesi
(B) Sintine tanklarından veya makine dairesi sintine kuyusundan deşarj
(C) Slop tanklarındaki yağ artıklarının tasfiyesi
(D) Sintine suyunun OWS üzerinden deşarjı
(E) Yağ yakıt transferleri
(F) Yağ dökülmesi
(G) Limanda alıcı tesise teslim

ORB PART II – YÜK VE BALAST OPERASYONLARI (Tankerler):

150 GT ve üzeri petrol tankerleri ORB Part II tutar. Kaydedilen operasyonlar:

(A) Yük yükleme
(B) İç transfer
(C) Yük boşaltma
(D) Tank yıkama (COW dahil)
(E) Balast alma/boşaltma
(F) Slop tankı operasyonları
(G) Artık deşarjı

KAYIT KURALLARI:

Her giriş, operasyon koduna göre yapılır. Sorumlu zabit imzalar, kaptan her sayfayı onaylar. ORB, gemide 3 yıl muhafaza edilir. Kayıtlar İngilizce, Fransızca veya İspanyolca olarak tutulur (veya bayrak devletinin dili + İngilizce çevirisi).`,
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
      "ORB'de kaydedilen miktarlar ile tank soundingleri tutarsızsa PSC genişletilmiş denetime geçer",
    ],
  },
  "special-areas-annex1": {
    title: "Özel Alanlar ve Deşarj Kuralları",
    introduction: "MARPOL, ekolojik açıdan hassas deniz alanlarını 'özel alan' olarak tanımlar ve bu bölgelerde daha sıkı deşarj kuralları uygular.",
    content: `EK I ÖZEL ALANLAR:

Akdeniz, Baltık Denizi, Karadeniz, Kızıldeniz, Körfezler Bölgesi (Persian Gulf), Aden Körfezi, Antarktika Bölgesi, Kuzey-Batı Avrupa Suları, Oman Denizi Bölgesi, Güney Afrika Suları.

ÖZEL ALANLARDA KURALLAR:

Makine dairesi deşarjı:
- OWS üzerinden, 15 ppm altında ve gemi seyir hâlinde ise izin verilir (normal alanlarla aynı)

Yük artığı deşarjı (tankerler):
- Özel alanlarda tamamen YASAKTIR
- Slop tankına alınmalı ve limandaki alıcı tesise teslim edilmelidir

PSSA (Particularly Sensitive Sea Areas):
Özel alanlardan farklı olarak PSSA, IMO tarafından belirlenen ve ek koruyucu tedbirler (rotalama sistemi, hız sınırı vb.) uygulanan bölgelerdir. Örnekler: Büyük Set Resifi, Galapagos, Baltık, Kanarya Adaları.`,
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
    content: `SOPEP ZORUNLULUĞU:

MARPOL Ek I Kural 37 gereği, 400 GT ve üzeri tüm gemiler SOPEP taşımak zorundadır. Tankerler için ayrıca SMPEP (Shipboard Marine Pollution Emergency Plan) ile birleştirilmiş olabilir.

SOPEP İÇERİĞİ:

1. Raporlama prosedürü: MARPOL Protokol I gereği yapılacak bildirimin detayları. Kime, ne zaman, nasıl rapor edileceği.

2. Bildirim listesi: Kıyı devleti idaresi, liman yetkilisi, P&I kulübü, şirket DPA (Designated Person Ashore), klas kuruluşu iletişim bilgileri.

3. Müdahale prosedürleri:
   - Güvertede dökülme: Emici malzeme kullanımı, savak kapatma
   - Tank taşması: Transfer durdurma, slop tankına yönlendirme
   - Boru hattı arızası: İzolasyon valfi kapatma, acil pompa durdurma
   - Çarpışma/karaya oturma sonrası sızıntı: Hasar değerlendirmesi, tank transferi

4. Koordinasyon: Kıyı devleti SAR/kirlilik müdahale merkezi ile koordinasyon prosedürü.

SOPEP TATBİKATI:

IMO tavsiyesi: yılda en az bir SOPEP tatbikatı yapılmalıdır. Tatbikatta raporlama zinciri, donanım kullanımı ve müdahale süresi değerlendirilir.`,
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
    content: `COW PRENSİBİ:

Geleneksel su yıkamada yıkama suyu slop tankına alınır ve tasfiye edilir; bu süreçte büyük miktarda yağlı su oluşur. COW sisteminde ise yük boşaltma sırasında yük pompalarıyla ham petrolün bir kısmı yüksek basınçlı nozullardan (tank cleaning machines) tanklara püskürtülür. Ham petrol, tank cidarlarına yapışan waxy tortularını çözer ve süzer; böylece artık miktarı çok düşük seviyeye iner.

COW AVANTAJLARI:

1. Artık miktarı %0,1'in altına düşer (su yıkamada %0,3-1,0)
2. Daha fazla yük teslim edilir → ticari avantaj
3. Slop miktarı azalır → denize deşarj riski düşer
4. Su tüketimi azalır

COW GEREKSİNİMLERİ (MARPOL Ek I Kural 33):

20.000 DWT ve üzeri ham petrol tankerlerinde COW zorunludur. Sistem, bayrak devleti idaresi tarafından onaylanmış COW Manual'e uygun olarak işletilir.

İnert gaz sistemi (IGS) ile birlikte çalışması zorunludur; COW sırasında tank atmosferi inert gaz ile %8 O₂ altında tutulmalıdır.

COW sırasında en az 2 tank yıkanmalı ve her limanda yıkanan tanklar ORB Part II'ye kaydedilmelidir.`,
    formula: {
      name: "COW Basınç Gereksinimi",
      expression: "Tank yıkama makinesi basıncı: 8-10 bar (tipik)",
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
      "COW sırasında inert gaz kullanılmazsa patlama riski vardır",
    ],
  },

  // =====================================================
  // BÖLÜM 3 - EK II
  // =====================================================
  "annex2-categories": {
    title: "NLS Kategorileri (X, Y, Z, OS)",
    introduction: "MARPOL Ek II, dökme hâlde taşınan zehirli sıvı maddeleri (NLS - Noxious Liquid Substances) tehlike derecelerine göre dört kategoride sınıflandırır.",
    content: `KATEGORİLER:

Kategori X – Büyük Tehlike: Denize deşarj edilmesi hâlinde deniz kaynakları veya insan sağlığı için büyük tehlike oluşturan maddeler. Denize deşarjı tamamen YASAKTIR. Tank yıkama artıkları alıcı tesise verilmelidir. Örnekler: Karbon tetraklorür, bazı pestisitler.

Kategori Y – Tehlike: Deşarjı hâlinde deniz kaynakları veya insan sağlığı için tehlike oluşturan veya deniz ortamını zararlı etkileyen maddeler. Sınırlı koşullarda deşarj izni vardır (ön yıkama + alıcı tesis zorunlu). Örnekler: Fenol, krezol, bazı solventler.

Kategori Z – Hafif Tehlike: Deşarjı hâlinde deniz kaynakları veya insan sağlığı için hafif tehlike oluşturan maddeler. Belirli koşullarda deşarj izni vardır. Örnekler: Fosfat esterleri, bazı asitler.

OS (Other Substances) – Diğer Maddeler: Yukarıdaki kategorilere girmeyen maddeler. Deşarjı serbest olan maddelerdir. Ancak yine de P&A Manual'e uygun operasyon zorunludur.

PREWASH ZORUNLULUĞU:

Kategori X ve Y maddeler taşındıktan sonra prewash (ön yıkama) zorunludur. Prewash suyu alıcı tesise verilmelidir. Kategori Z için prewash, yalnızca belirli koşullarda gereklidir.`,
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
    content: `DEŞARJ KOŞULLARI:

Genel kurallar (Kural 13):
- Gemi seyir hâlinde olmalıdır
- Hız en az 7 knot
- Deşarj su hattı altından yapılmalıdır
- En yakın kıyıdan en az 12 deniz mili uzakta
- Su derinliği en az 25 metre

KATEGORİYE GÖRE KURALLAR:

Kategori X: Tamamen yasak. Prewash zorunlu, prewash suyu alıcı tesise.
Kategori Y: Prewash zorunlu. Prewash sonrası artık su deşarj koşullarına uyularak denize verilebilir. Özel alanlarda ek kısıtlamalar.
Kategori Z: Prewash genellikle zorunlu değil. Deşarj koşullarına uyularak verilebilir.
OS: Kısıtlama yoktur.

PREWASH PROSEDÜRÜ:

1. Boşaltma işlemi tamamlanır, stripping yapılır
2. Prewash sırasında belirli miktarda su ile tank yıkanır
3. Yıkama suyu slop tankına veya doğrudan alıcı tesise verilir
4. Prewash tamamlandıktan sonra sörveyor veya liman yetkilisi onayı alınır
5. Cargo Record Book'a kayıt yapılır`,
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
    content: `P&A MANUAL:

MARPOL Ek II Kural 14 gereği, NLS taşıyan her gemide P&A Manual bulunmalıdır. Manual, bayrak devleti tarafından onaylanır.

İÇERİĞİ:
1. Tank yıkama prosedürleri (her tank için)
2. Stripping sistemi kapasitesi ve operasyonu
3. Prewash gereksinimleri (kategori bazlı)
4. Slop tankı operasyonu
5. Deşarj bağlantıları ve düzenlemeleri
6. Uyumluluk tabloları (hangi maddeler aynı tankta taşınabilir)

CARGO RECORD BOOK:

Ek II kapsamındaki tüm operasyonlar Cargo Record Book'a kaydedilir. ORB Part II'nin NLS eşdeğeridir.

Kaydedilen operasyonlar:
- Yük yükleme ve boşaltma
- Tank yıkama ve prewash
- Balast operasyonları
- Slop transferi
- Artık deşarjı
- Alıcı tesise teslim

Cargo Record Book gemide 3 yıl muhafaza edilir. PSC denetimlerinde P&A Manual ile birlikte kontrol edilir.`,
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
    content: `IMDG CODE YAPISI:

IMDG Code, MARPOL Ek III'ü destekleyen ve SOLAS Bölüm VII'ye referans verilen zorunlu bir koddur. 2 yılda bir güncellenir.

TEHLİKELİ MADDE SINIFLARI:

Sınıf 1 – Patlayıcılar (1.1-1.6 alt sınıflar)
Sınıf 2 – Gazlar (2.1 yanıcı, 2.2 yanıcı olmayan, 2.3 zehirli)
Sınıf 3 – Yanıcı sıvılar (parlama noktası ≤ 60°C kapalı kap)
Sınıf 4 – Yanıcı katılar (4.1 yanıcı katı, 4.2 kendiliğinden yanıcı, 4.3 su ile temas)
Sınıf 5 – Oksitleyiciler ve organik peroksitler (5.1, 5.2)
Sınıf 6 – Zehirli ve bulaşıcı maddeler (6.1, 6.2)
Sınıf 7 – Radyoaktif maddeler
Sınıf 8 – Aşındırıcılar
Sınıf 9 – Çeşitli tehlikeli maddeler

UN NUMARASI VE DOĞRU NAKLİYE ADI:

Her tehlikeli madde, dört haneli bir UN numarası ve Proper Shipping Name (PSN) ile tanımlanır. Örnek: UN 1203 – GASOLINE (Benzin), Sınıf 3.

IMDG Code, her UN numarası için paketleme grubu (PG I: büyük tehlike, PG II: orta, PG III: küçük), istifleme kuralları ve uyumsuz maddeler listesi sunar.`,
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
    content: `ETİKETLEME:

Her tehlikeli madde paketi üzerinde:
1. UN numarası (UN ile başlayan 4 haneli numara)
2. Proper Shipping Name (doğru nakliye adı)
3. Tehlike etiketi (diamond-shaped label): Sınıfa göre renk ve sembol
   - Sınıf 1: turuncu/patlama sembolü
   - Sınıf 2.1: kırmızı/alev
   - Sınıf 3: kırmızı/alev
   - Sınıf 6.1: beyaz/kurukafa
   - Sınıf 8: siyah-beyaz/sıvı damla

4. İkincil tehlike etiketi (varsa)

İŞARETLEME (Marking):
Konteyner üzerinde: tehlike plakartı (placard) ve UN numarası görünür şekilde yazılır.

İSTİFLEME (Stowage & Segregation):

IMDG Code, uyumsuz maddelerin birbirinden ayrılması için 4 seviyeli bir sistem tanımlar:

1. "Away from" (uzakta): Farklı bölme/ambar veya en az 3 m yatay mesafe
2. "Separated from" (ayrılmış): Farklı bölme veya en az bir tam bölme aralığı
3. "Separated by a complete compartment" (tam bölme ile ayrılmış)
4. "Separated longitudinally by an intervening complete compartment" (boylamasına tam bölme ile ayrılmış)

Güverte üzeri ve güverte altı istifleme kuralları farklıdır; IMDG Code Bölüm 7 detayları içerir.`,
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
    content: `ZORUNLU BELGELER:

1. Dangerous Goods Declaration (Tehlikeli Madde Beyannamesi):
   Yükleyici (shipper) tarafından hazırlanır. UN numarası, PSN, sınıf, paketleme grubu, miktar ve acil müdahale bilgilerini içerir.

2. Container/Vehicle Packing Certificate:
   Konteynere yükleme yapan tarafın, yüklemenin IMDG Code'a uygun yapıldığını onayladığı belgedir.

3. Dangerous Goods Manifest veya Stowage Plan:
   Gemideki tüm tehlikeli maddelerin yeri, miktarı ve sınıfını gösteren listedir. Gemi terk edildiğinde kıyı otoritelerine verilmelidir.

4. EmS (Emergency Schedules):
   Her sınıf için acil müdahale prosedürlerini içerir. IMDG Code Supplement'te yer alır.

5. MFAG (Medical First Aid Guide):
   Tehlikeli madde temasında ilk yardım prosedürleri. IMDG Code Supplement'te yer alır.

SORUMLULUKLAR:

Yükleyici: Doğru beyanname, etiketleme, paketleme
Gemi: İstifleme, ayrım, belge kontrolü, acil müdahale planı
Liman: Yükleme öncesi onay (bazı limanlarda)`,
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
    content: `KAPSAM:

MARPOL Ek IV, 27 Eylül 2003'te yürürlüğe girmiştir.

Uygulama alanı:
- 400 GT ve üzeri uluslararası sefer yapan gemiler
- 400 GT altında olup 15'ten fazla kişi taşıyan gemiler

PİS SU TANIMI:

Pis su (sewage), aşağıdaki kaynakları kapsar:
1. Tuvalet ve pisuar drenajı
2. Tıbbi bölüm lavabo ve drenajı
3. Hayvan taşınan bölümlerin drenajı
4. Yukarıdaki kaynaklarla karışmış diğer atık sular

GEMİDE BULUNMASI GEREKEN SİSTEMLER:

- Pis su arıtma tesisi (Sewage Treatment Plant - STP) ve/veya
- Dezenfeksiyon sistemi (comminuting and disinfecting system) ve/veya
- Toplama tankı (holding tank)

Üç seçenekten en az biri bulunmalıdır. Modern gemilerde genellikle STP + holding tank kombinasyonu tercih edilir.`,
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
    content: `ARITMA YÖNTEMLERİ:

1. Biyolojik Arıtma: Aerobik bakteriler organik maddeyi parçalar. En yaygın yöntemdir. Aktif çamur (activated sludge) veya membran biyoreaktör (MBR) kullanılır.

2. Kimyasal Arıtma: Klor veya UV dezenfeksiyon ile patojen mikroorganizmalar yok edilir.

3. Elektrokimyasal Arıtma: Elektroliz yöntemiyle parçalama ve dezenfeksiyon. Bazı modern sistemlerde kullanılır.

IMO STANDARTLARI (MEPC.227(64)):

Arıtılmış suyun kalite standartları:
- BOD₅ (Biyolojik Oksijen İhtiyacı): ≤ 25 mg/L
- COD (Kimyasal Oksijen İhtiyacı): ≤ 125 mg/L
- TSS (Toplam Askıda Katı Madde): ≤ 35 mg/L
- Koliform bakteri: ≤ 100 CFU/100 mL
- pH: 6-8,5

Bu standartlar, 1 Ocak 2010 ve sonrasında inşa edilen gemiler ile Baltık özel alanında faaliyet gösteren yolcu gemileri için geçerlidir.`,
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
    content: `DEŞARJ KOŞULLARI:

1. Arıtılmış pis su (STP çıkışı):
   - MEPC.227(64) standardını karşılıyorsa: kısıtlama olmaksızın deşarj edilebilir
   - Eski standartları karşılıyorsa: en yakın kıyıdan 3 deniz mili ötede deşarj

2. Dezenfekte edilmiş pis su (comminuted and disinfected):
   - En yakın kıyıdan en az 3 deniz mili uzakta
   - Gemi seyir hâlinde, hız en az 4 knot

3. Arıtılmamış pis su:
   - En yakın kıyıdan en az 12 deniz mili uzakta
   - Gemi seyir hâlinde, hız en az 4 knot
   - Anlık deşarj hızı: Oran IMO tarafından belirlenmiş formüle uymalıdır

ÖZEL ALAN – BALTIK DENİZİ:

Baltık Denizi, Ek IV özel alanı olarak belirlenmiştir. Yolcu gemileri için ek kurallar:
- Yeni yolcu gemileri (1 Haziran 2019 sonrası keel): STP MEPC.227(64) standardını karşılamalı
- Mevcut yolcu gemileri: 1 Haziran 2021'den itibaren uyum zorunlu

Yük gemileri için Baltık'ta genel kurallar geçerlidir.`,
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
    content: `ÇÖP KATEGORİLERİ (Ek V Kural 4-6):

Kategori A – Plastikler: Denize atılması tamamen YASAKTIR. İstisna yoktur.

Kategori B – Yemek artıkları: 
- Normal alanlar: 3 mil ötede, parçalanmış (25 mm altı) olarak
- Özel alanlar: 12 mil ötede, parçalanmış olarak

Kategori C – İç yüzeyler, ambalaj, kağıt, paçavra:
- Normal alanlar: 12 mil ötede
- Özel alanlar: YASAK

Kategori D – Pişirme yağı:
- Normal alanlar: 12 mil ötede
- Özel alanlar: YASAK

Kategori E – Küller (incinerator):
- Normal alanlar: 12 mil ötede
- Özel alanlar: YASAK

Kategori F – Operasyonel atıklar (kargo artığı dahil):
- Normal alanlar: 12 mil ötede, çevre için zararlı değilse
- Özel alanlar: YASAK (kargo artıkları hariç bazı istisnalar)

GENEL KURAL: Plastik dahil tüm sentetik materyallerin denize atılması her koşulda yasaktır.`,
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
    content: `ÇÖP YÖNETİM PLANI:

Kural 10.2 gereği, 100 GT ve üzeri gemilerde yazılı bir Çöp Yönetim Planı bulunmalıdır. Plan, mürettebat tarafından anlaşılır dilde yazılmalı ve aşağıdakileri içermelidir:

1. Toplama prosedürleri: Çöp kategorilerine göre ayrıştırma
2. Depolama: Güvertede veya çöp odasında kategorilere göre ayrı konteynerler
3. İşleme: Incinerator (yakma fırını), compactor (sıkıştırıcı), comminuter (parçalayıcı)
4. Deşarj: Denize izin verilen ve verilmeyen kategoriler
5. Alıcı tesise teslim: Limanda çöp bertarafı prosedürü

ÇÖP KAYIT DEFTERİ (Garbage Record Book):

400 GT ve üzeri gemiler ile 15+ kişi taşıyan sabit platformlarda zorunludur.

Kaydedilen bilgiler:
- Çöp türü (kategori kodu)
- Tahmini miktar (m³)
- Bertaraf yöntemi (denize deşarj / yakma / alıcı tesise teslim)
- Tarih, saat ve konum

Kayıt defteri gemide 2 yıl muhafaza edilir.

INCINERATOR KURALLARI:

Gemilerde çöp yakma (incineration) izin verilenler:
- Kağıt, paçavra, yağlı atıklar, yemek artıkları
Yasak olanlar:
- Ek I, II, III kapsamındaki yük artıkları
- PVC içeren plastikler (dioksin riski)`,
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
    content: `EK V ÖZEL ALANLARI:

Akdeniz, Baltık Denizi, Karadeniz, Kızıldeniz, Körfezler Bölgesi, Kuzey Denizi, Antarktika Bölgesi (60°S güneyinde), Geniş Karayip Bölgesi.

ÖZEL ALANLARDA KURALLAR:

Plastikler: YASAK (normal alanlarla aynı)
Yemek artıkları: 12 deniz mili ötede, parçalanmış (25 mm altı), gemi seyir hâlinde
Diğer tüm kategoriler: YASAK (limanda alıcı tesise verilmeli)

ANTARKTİKA BÖLGESİ (60°S GÜNEYİ):

Antarktika bölgesi en sıkı kurallara tabidir:
- Tüm çöp türlerinin denize atılması YASAKTIR
- Yemek artıkları dahil hiçbir çöp verilemez
- Incinerator kullanımı: Antarktika Antlaşması Çevre Protokolü gereği bazı kısıtlamalar
- Tüm çöp gemide depolanarak Antarktika dışına çıkarılmalıdır

Antarktika'da faaliyet gösteren gemiler, yerel çevre mevzuatına da uymak zorundadır (Antarctic Treaty System).`,
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
    content: `KÜRESEL KÜKÜRT SINIRLARI:

1 Ocak 2020'den itibaren küresel kükürt sınırı %0,50 m/m (ağırlıkça) olarak uygulanmaktadır. Bu düzenleme "IMO 2020" olarak bilinir.

TARİHSEL GELİŞİM:
- 2012 öncesi: %4,50 (fiilen sınırsız)
- 2012-2020: %3,50
- 2020 sonrası: %0,50

ECA/SECA BÖLGELERİ:

Emisyon Kontrol Alanları (ECA) veya Kükürt Emisyon Kontrol Alanları (SECA) içinde sınır: %0,10 m/m (2015'ten itibaren).

Mevcut ECA'lar: Baltık Denizi, Kuzey Denizi, Kuzey Amerika (ABD + Kanada kıyıları, 200 mil), ABD Karayip Bölgesi, Akdeniz (2025'ten itibaren).

UYUM YÖNTEMLERİ:

1. Düşük kükürtlü yakıt (VLSFO/ULSFO): En yaygın yöntem. %0,50 (küresel) veya %0,10 (ECA) uyumlu yakıt kullanımı.
2. Scrubber (Egzoz Gazı Temizleme Sistemi - EGCS): HFO kullanımına devam ederken egzoz gazından SO₂'yi yıkar. Open-loop, closed-loop veya hybrid tipler.
3. LNG: Doğal gaz yakıt olarak kullanıldığında SOx emisyonu sıfıra yakındır.
4. Metanol ve diğer alternatif yakıtlar.`,
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
      "ECA'ya girerken yakıt geçişi (fuel changeover) en az 1 saat önceden yapılmalıdır",
      "Uyumsuz yakıt kullanımı: PSC detention + yüksek para cezası",
    ],
  },
  "nox-tiers": {
    title: "NOx Tier I, II, III Standartları",
    introduction: "MARPOL Ek VI, gemi dizel motorlarından kaynaklanan azot oksit (NOx) emisyonlarını motor devir sayısına bağlı üç kademeli standartla sınırlar.",
    content: `NOx STANDARTLARI:

NOx sınırları, motorun devir sayısına (n = RPM) göre belirlenir:

Tier I (2000-2011 arası inşa edilen gemiler):
- n < 130 rpm: 17,0 g/kWh
- 130 ≤ n < 2000 rpm: 45 × n⁻⁰·² g/kWh
- n ≥ 2000 rpm: 9,8 g/kWh

Tier II (2011 sonrası inşa edilen gemiler):
- n < 130 rpm: 14,4 g/kWh
- 130 ≤ n < 2000 rpm: 44 × n⁻⁰·²³ g/kWh
- n ≥ 2000 rpm: 7,7 g/kWh

Tier III (2016 sonrası, NOx ECA içinde):
- n < 130 rpm: 3,4 g/kWh
- 130 ≤ n < 2000 rpm: 9 × n⁻⁰·² g/kWh
- n ≥ 2000 rpm: 2,0 g/kWh

TIER III UYUM YÖNTEMLERİ:

1. SCR (Selective Catalytic Reduction): Egzoz gazına üre çözeltisi enjekte edilerek NOx azaltılır. %80-90 verimlilik.
2. EGR (Exhaust Gas Recirculation): Egzoz gazının bir kısmı yanma odasına geri döndürülerek yanma sıcaklığı düşürülür.
3. LNG: Doğal gazla çalışan motorlar Tier III'ü doğal olarak karşılar.

NOx ECA: Kuzey Amerika ve ABD Karayip. Baltık ve Kuzey Denizi 2021'den itibaren NOx ECA.`,
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
    content: `MEVCUT ECA BÖLGELERİ:

1. Baltık Denizi SECA: Yalnızca SOx kontrolü. 2006'dan beri aktif.
2. Kuzey Denizi SECA: Yalnızca SOx kontrolü. 2007'den beri aktif.
3. Kuzey Amerika ECA: SOx + NOx + PM kontrolü. 2012'den beri. ABD ve Kanada kıyılarından 200 deniz mili.
4. ABD Karayip ECA: SOx + NOx + PM. 2014'ten beri. Porto Riko ve ABD Virjin Adaları çevresi.
5. Baltık ve Kuzey Denizi NOx ECA: 1 Ocak 2021'den itibaren (Tier III uyumu).
6. Akdeniz SOx ECA: 2025'te yürürlüğe girecektir.

GEREKSİNİMLER:

SOx ECA:
- Yakıt kükürt oranı ≤ %0,10 m/m veya eşdeğer scrubber
- Fuel changeover prosedürü ve kaydı

NOx ECA:
- 2016/2021 sonrası inşa edilen gemilerin motorları Tier III'ü karşılamalıdır
- SCR, EGR veya LNG teknolojisi

ECA'YA GİRİŞ/ÇIKIŞ:

Gemi ECA sınırına girmeden önce düşük kükürtlü yakıta geçiş (fuel changeover) yapmalıdır. Geçiş süreci boyunca yakıt tanklarında yeterli düşük kükürtlü yakıt bulunmalıdır. Fuel changeover zamanı, tarihi ve tank hacmi log book'a kaydedilir.`,
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
    content: `KAPSAM:

Ozon tabakasını incelten maddeler (ODS - Ozone Depleting Substances), Montreal Protokolü ile kontrol altına alınmış kimyasallardır.

Gemilerde en yaygın ODS kullanım alanları:
- Soğutma sistemleri (klima, provizyon soğutma, kargo soğutma)
- Yangın söndürme sistemleri (Halon)
- Yalıtım köpükleri

MARPOL EK VI KURAL 12:

1. Yeni kurulum yasağı: CFC (Chlorofluorocarbon) içeren soğutma ve yangın söndürme sistemlerinin yeni kurulumu yasaktır (tüm gemiler).

2. Halon 1211, 1301 ve CFC-12 (R-12) gibi maddelerin yeni kurulumu yasaktır.

3. HCFC (Hydrochlorofluorocarbon) sınırlaması: 1 Ocak 2020'den itibaren HCFC (R-22 dahil) içeren yeni kurulum yasaktır. Mevcut sistemlerin kullanımı devam edebilir ancak dolum yapılamaz.

4. ODS Kayıt Defteri (ODS Record Book): ODS içeren tüm sistemler kaydedilmeli, sızıntılar ve dolum miktarları izlenmelidir.

ALTERNATIFLER:

R-134a, R-404A, R-407C gibi HFC (Hydrofluorocarbon) soğutucu akışkanlar ODS değildir ancak sera gazı etkisi nedeniyle Kigali Değişikliği ile aşamalı olarak azaltılmaktadır.`,
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
    content: `VOC NEDİR?

VOC (Volatile Organic Compounds), tanker yük tanklarından atmosfere yayılan uçucu hidrokarbonlardır. Ham petrol ve benzin gibi yüklerin buharlaşması sonucu oluşur. Ozon oluşumuna katkıda bulunur ve hava kalitesini olumsuz etkiler.

KURAL 15 GEREKSİNİMLERİ:

1. VOC Yönetim Planı (VOCSMP): Ham petrol tankerleri bir VOC Yönetim Planı hazırlamalıdır.

2. Buhar Toplama Sistemi (VECS - Vapour Emission Control System): Bazı limanlar ve terminaller, yükleme sırasında VOC emisyonlarının toplanmasını zorunlu kılar. Gemi bu sisteme bağlanabilecek donanıma sahip olmalıdır.

3. Buhar Geri Kazanım Sistemi (VRUS): Toplanan buharların yoğunlaştırılarak geri kazanılması veya güvenli yakılması.

UYGULAMA:

VOC kontrolü ağırlıklı olarak terminallerde uygulanır. Geminin sorumluluğu:
- VECS bağlantı manifoldu bulundurmak
- VOC yönetim planına uymak
- Yükleme sırasında tank vantilatörlerini kontrol etmek

Norveç gibi bazı kıyı devletleri, karasuları içinde ek VOC kontrol gereksinimleri uygular.`,
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
    content: `EEDI (YENİ GEMİLER):

EEDI, geminin tasarım aşamasında ton-mil başına CO₂ emisyonunu ölçer. MARPOL Ek VI Kural 21 gereği 2013'ten itibaren yeni gemiler için zorunludur.

Hesaplama (basitleştirilmiş):
EEDI = (CO₂ emisyonu) / (taşıma kapasitesi × hız)

Birim: g CO₂ / (ton × deniz mili)

EEDI azaltma hedefleri (baseline'a göre):
- Faz 0 (2013-2015): %0 (referans)
- Faz 1 (2015-2020): %10 azaltma
- Faz 2 (2020-2025): %20 azaltma
- Faz 3 (2025+): %30-50 azaltma (gemi tipine göre)

EEXI (MEVCUT GEMİLER):

1 Ocak 2023'ten itibaren mevcut gemiler EEXI hesaplaması yapmak ve gerekli enerji verimliliği endeksini sağlamak zorundadır.

EEXI = EEDI'nin mevcut gemilere uygulanmış hâlidir.

EEXI uyum yöntemleri:
1. Motor güç sınırlaması (Engine Power Limitation - EPL): En yaygın yöntem
2. Enerji tasarruflu teknolojiler (waste heat recovery, air lubrication)
3. Alternatif yakıt dönüşümü`,
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
    content: `CII NEDİR?

CII, geminin bir yılda fiilen ürettiği CO₂ emisyonunu taşıma kapasitesine ve kat ettiği mesafeye oranlar. EEDI/EEXI'den farklı olarak CII operasyonel performansı ölçer.

HESAPLAMA:

CII = Yıllık CO₂ emisyonu / (Capacity × Mesafe)

Birim: g CO₂ / (ton × deniz mili)

Yıllık CO₂ = Toplam yakıt tüketimi × CF (CO₂ dönüşüm faktörü)

DERECELENDİRME:

A: Üstün (Superior) – Referans çizgisinin çok altında
B: İyi (Good) – Referans çizgisinin altında  
C: Orta (Moderate) – Referans çizgisi civarında
D: Yetersiz (Inferior) – Referans çizgisinin üstünde
E: Kötü (Poor) – Referans çizgisinin çok üstünde

Üst üste 3 yıl D veya 1 yıl E alan gemiler düzeltici eylem planı hazırlamak zorundadır.

CII AZALTMA HEDEFLERİ:

2023: referans yılı
2024: %2 azaltma
2025: %3 azaltma
2026: %4 azaltma
Sonrası: IMO tarafından belirlenecek

İYİLEŞTİRME YÖNTEMLERİ:

1. Hız optimizasyonu (slow steaming)
2. Rota optimizasyonu
3. Tekne bakımı (anti-fouling)
4. Pervane polisajı
5. Trim optimizasyonu
6. Alternatif yakıt kullanımı`,
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
    content: `SEEMP YAPISI:

SEEMP, 2023'ten itibaren iki bölümden oluşur:

SEEMP Part I: Enerji Verimliliği Yönetim Planı
- Gemi-spesifik enerji verimliliği tedbirleri
- Yakıt tüketimi izleme prosedürleri
- Mürettebat eğitimi
- Tüm gemiler için zorunludur

SEEMP Part II: CII İzleme ve Raporlama
- 5.000 GT ve üzeri gemiler için zorunludur
- Yakıt tüketimi verilerinin toplanması (DCS - Data Collection System)
- Yıllık CII hesaplaması
- Düzeltici eylem planı (D veya E derecelendirmesi alınırsa)

ENERJİ VERİMLİLİĞİ TEDBİRLERİ:

SEEMP'te yer alabilecek iyileştirme tedbirleri:
1. Seyir optimizasyonu: rota planlama, akıntı ve hava durumu dikkate alma
2. Hız yönetimi: optimum ekonomik hız belirleme
3. Trim optimizasyonu: statik trim ayarlaması ile direnç azaltma
4. Makine bakımı: motor tune-up, pervane polisajı
5. Tekne bakımı: anti-fouling boya uygulaması
6. Atık ısı geri kazanımı
7. LED aydınlatma ve enerji verimli ekipman

DCS (Veri Toplama Sistemi):

5.000 GT+ gemiler yıllık yakıt tüketimi verilerini bayrak devletine raporlar. Veriler IMO DCS veritabanında toplanır.`,
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
    content: `EU ETS DENİZCİLİK:

1 Ocak 2024'ten itibaren 5.000 GT ve üzeri gemilerin CO₂ emisyonları AB Emisyon Ticaret Sistemi kapsamına alınmıştır.

KAPSAM:
- AB limanları arasındaki seferler: emisyonların %100'ü
- AB limanı – AB dışı liman seferleri: emisyonların %50'si
- AB limanında bekleme sırasında: emisyonların %100'ü

AŞAMALI GEÇİŞ:
2024: emisyonların %40'ı için tahsisat satın alma
2025: %70
2026: %100

Gemi operatörü, emisyonlarını karşılayacak kadar EUA (EU Allowance) satın almalıdır. 1 EUA = 1 ton CO₂.

FUELEU MARITIME (2025):

1 Ocak 2025'ten itibaren gemilerin yakıt sera gazı yoğunluğu (GHG intensity) azaltma hedefleri:
2025: -%2 (2020 referansına göre)
2030: -%6
2035: -%14,5
2040: -%31
2045: -%62
2050: -%80

GHG intensity, Well-to-Wake (kuyudan pervanaya) bazında hesaplanır; üretim, taşıma ve yanma emisyonlarının tamamını kapsar.

Uyumsuzluk halinde para cezası uygulanır.`,
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
    content: `LNG (SIVILAŞTIRILMIŞ DOĞAL GAZ):

Avantajlar: SOx emisyonu neredeyse sıfır, NOx %85 azalma, CO₂ %20-25 azalma, PM (partikül madde) %95 azalma.
Dezavantajlar: Methan slip (yanmamış metan kaçağı) sera gazı etkisini azaltır; yüksek yatırım maliyeti; bunkerleme altyapısı sınırlı.
IGF Code: LNG yakıtlı gemilerin güvenlik gereksinimleri.

METANOL:

Avantajlar: SOx sıfır, NOx düşük, oda sıcaklığında sıvı (depolama kolaylığı), biyometanol ve e-metanol ile karbonsuz olabilir.
Dezavantajlar: Düşük enerji yoğunluğu (HFO'nun yarısı), zehirli (görünmez alev, cilt teması).
Maersk 2024'te metanol yakıtlı konteyner gemilerini hizmete almıştır.

AMONYAK:

Avantajlar: Karbon içermez (yanma sırasında CO₂ üretmez), yüksek enerji yoğunluğu, mevcut LPG taşıma teknolojisi uyarlanabilir.
Dezavantajlar: Son derece zehirli (TLV: 25 ppm), korozif, düşük yanma hızı, NOx üretebilir.
2030'lu yıllarda ticari kullanıma girmesi beklenmektedir.

HİDROJEN:

Yeşil hidrojen (elektroliz) en temiz yakıttır ancak depolama zorluğu (yüksek basınç veya kriojenik), düşük enerji yoğunluğu (hacimsel) ve üretim maliyeti nedeniyle denizcilik uygulaması henüz sınırlıdır.

KARŞILAŞTIRMA (HFO = 100 referans):

Yakıt / Enerji Yoğunluğu / CO₂ azaltma / Maliyet
HFO: 100 / referans / düşük
LNG: 75 / %20-25 / orta
Metanol: 50 / %0-100* / yüksek
Amonyak: 55 / %100 (tank-to-wake) / yüksek
*Biyometanol veya e-metanol ile %100 azaltma mümkün`,
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
    content: `BWM SÖZLEŞMESİ:

2004'te IMO tarafından kabul edilmiş, 8 Eylül 2017'de yürürlüğe girmiştir.

SORUN: Gemiler dengeyi sağlamak için bir bölgede aldıkları balast suyunu başka bir bölgede denize boşaltır. Balast suyuyla birlikte taşınan yabancı organizmalar (istilacı türler), yerel ekosistemleri ciddi şekilde tehdit eder.

ÖNEMLİ ÖRNEKLER:
- Zebra midyesi (Dreissena polymorpha): Hazar Denizi'nden Büyük Göller'e taşınmış; su altyapısına milyarlarca dolar hasar.
- Kolera bakterisi: Balast suyu yoluyla Güney Amerika'ya taşındığı tespit edilmiştir.
- Deniz tarağı (Mnemiopsis leidyi): Batı Atlantik'ten Karadeniz'e; balıkçılığı yıkıcı etki.

UYGULAMA TAKVİMİ:

D-1 Standardı (Balast suyu değişimi): Geçiş dönemi uygulaması. Okyanus ortasında balast suyu değişimi.
D-2 Standardı (Balast suyu arıtma): Nihai hedef. Onaylı arıtma sistemi (BWTS) ile organizmaların yok edilmesi.

2024 itibarıyla tüm gemilerin D-2 standardına geçmesi planlanmaktadır (gemi yaşına bağlı geçiş takvimi).`,
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
    content: `D-1 STANDARDI GEREKSİNİMLERİ:

- En yakın kıyıdan en az 200 deniz mili uzakta
- Su derinliği en az 200 metre
- %95 hacimsel değişim

200 mil şartı karşılanamıyorsa: en az 50 mil uzakta ve 200 m derinlikte.

DEĞİŞİM YÖNTEMLERİ:

1. Sıralı Yöntem (Sequential Method):
   Tank tamamen boşaltılır, ardından okyanus suyu ile doldurulur.
   Avantaj: %100'e yakın değişim
   Dezavantaj: Stabilite sorunları (boş tank anı); yapısal stres

2. Akıtmalı Yöntem (Flow-through Method):
   Tank dolu iken alttan veya üstten okyanus suyu pompalar; su üst taşma (overflow) ile dışarı verilir.
   Kural: tank hacminin en az 3 katı su geçirilmelidir (%95 değişim).
   Avantaj: Stabilite korunur
   Dezavantaj: Güverte ıslanması, uzun süre

3. Seyreltme Yöntemi (Dilution Method):
   Tankın üstünden temiz su girerken alttan aynı hızda boşaltılır.
   Kural: 3 kat hacim geçirilmelidir.
   Avantaj: Kontrollü işlem
   Dezavantaj: Özel boru tesisatı gerektirir

STABİLİTE DİKKATİ:

Sıralı yöntemde tankların boşaltılma/doldurulma sırası stabilite hesabına uygun olmalıdır. Serbest yüzey etkisi ve trim değişimi izlenmelidir.`,
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
      "Sıralı yöntemde tank boşken stabilite kaybı olabilir; stabilite hesabı şarttır",
    ],
  },
  "ballast-treatment": {
    title: "Balast Suyu Arıtma Sistemleri (D-2)",
    introduction: "D-2 standardı, balast suyundaki canlı organizmaların onaylı bir arıtma sistemi (BWTS) ile belirli sınırların altına düşürülmesini gerektirir.",
    content: `D-2 STANDARDI LİMİTLERİ:

Canlı organizmalar (≥50 µm): < 10 birey/m³
Canlı organizmalar (10-50 µm): < 10 birey/mL
Vibrio cholerae: < 1 CFU/100 mL
E. coli: < 250 CFU/100 mL
Intestinal Enterococci: < 100 CFU/100 mL

ARITMA TEKNOLOJİLERİ:

1. UV (Ultraviyole) Arıtma:
   UV-C ışığı ile organizmaların DNA'sı hasar görür ve çoğalamazlar.
   Avantaj: Kimyasal kullanılmaz, artık madde bırakmaz
   Dezavantaj: Bulanık suda etkinlik düşer; ön filtrasyon gerekir

2. Elektroklorinasyon:
   Deniz suyunun elektrolizi ile sodyum hipoklorit (NaOCl) üretilir ve balast suyuna dozlanır.
   Avantaj: Yerinde üretim, etkili
   Dezavantaj: TRO (Total Residual Oxidant) kontrolü gerekir; korozyon riski

3. Ozonlama:
   Ozon (O₃) gazı ile dezenfeksiyon.
   Avantaj: Çok güçlü oksidant
   Dezavantaj: Enerji yoğun; bromat oluşumu riski

4. Filtrasyon + UV kombinasyonu:
   En yaygın ticari sistem. Ön filtre (40-50 µm) + UV kamara.

IMO TİP ONAYI:

Tüm BWTS'ler IMO tarafından belirlenen G8 veya BWMS Code kapsamında tip onayı almak zorundadır.`,
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
    content: `BALAST SUYU YÖNETİM PLANI:

BWM Sözleşmesi Kural B-1 gereği her gemide bir Balast Suyu Yönetim Planı (BWMP) bulunmalıdır. Plan bayrak devleti tarafından onaylanır.

İÇERİĞİ:
1. Balast suyu operasyonlarına ilişkin güvenlik prosedürleri
2. Gemiye özgü balast sistemi açıklaması (tank yerleşimi, pompa kapasiteleri)
3. D-1 veya D-2 standardına uyum yöntemi
4. BWTS operasyon ve bakım prosedürleri
5. Sediment yönetimi
6. Mürettebat görev ve sorumlulukları
7. Balast suyu alınacak bölgelerin değerlendirilmesi

BALAST SUYU KAYIT DEFTERİ:

Kural B-2 gereği her gemide Balast Suyu Kayıt Defteri (Ballast Water Record Book) bulunmalıdır.

Kaydedilen bilgiler:
- Balast suyu alma: tarih, saat, konum, tank numarası, miktar
- Balast suyu boşaltma: aynı bilgiler
- Balast suyu değişimi (D-1): yöntem, başlangıç/bitiş konumu
- BWTS ile arıtma (D-2): çalıştırma/durdurma zamanları
- Alıcı tesise teslim
- Kazara veya istisnai deşarj

Kayıt defteri gemide en az 2 yıl muhafaza edilir; PSC denetiminde ibraz edilir.`,
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
    content: `TARİHÇE:

Gemi teknelerine deniz organizmalarının (biyokirlenme) yapışmasını önlemek için kullanılan anti-fouling boyalar, uzun yıllar tributilkalay (TBT - Tributyltin) bileşikleri içermiştir. TBT'nin deniz ekosistemleri üzerindeki yıkıcı etkisi (midye ve salyangozlarda üreme bozuklukları) ortaya çıkınca AFS Sözleşmesi hazırlanmıştır.

AFS SÖZLEŞMESİ:

2001'de kabul edilmiş, 17 Eylül 2008'de yürürlüğe girmiştir.

TEMEL GEREKSİNİMLER:
1. TBT içeren anti-fouling boyaların uygulanması 1 Ocak 2003'ten itibaren yasaklanmıştır.
2. 1 Ocak 2008'den itibaren TBT boyalı gemilerin faaliyet göstermesi veya TBT boyanın mühürlenmesi (sealer coat) zorunludur.
3. Sibutryn gibi diğer potansiyel zararlı maddeler inceleme altındadır.

AFS SERTİFİKASI:

400 GT ve üzeri uluslararası sefer yapan gemilerde International Anti-fouling System Certificate veya Declaration bulunmalıdır.

GÜNCEL ALTERNATIFLER:

- Bakır bazlı boyalar (en yaygın)
- Silikon bazlı foul-release boyalar (kaygan yüzey)
- Ultrasonik anti-fouling sistemleri
- Biyosidal olmayan boyalar`,
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
    content: `BİYOKİRLENME ETKİLERİ:

1. Yakıt tüketimi artışı: Yoğun biyokirlenme sürtünme direncini %40'a kadar artırabilir; bu da yakıt tüketiminde %10-40 artış demektir.

2. İstilacı tür transferi: Tekneye yapışan organizmalar bir bölgeden diğerine taşınır. Balast suyundan sonra en büyük istilacı tür vektörüdür.

3. Emisyon artışı: Artan yakıt tüketimi doğrudan CO₂, SOx, NOx emisyonlarını artırır. CII derecelendirmesini olumsuz etkiler.

IMO BİYOKİRLENME REHBERİ (2011/2023):

IMO, biyokirlenme yönetimi için gönüllü rehber yayınlamıştır (MEPC.207(62), 2023 revizyonu). Rehber şunları içerir:

1. Biyokirlenme Yönetim Planı (Biofouling Management Plan):
   - Anti-fouling sistemi seçimi ve bakım programı
   - Sualtı muayene takvimi
   - Niş alanların (deniz suyu girişleri, dümen, pervane) bakımı

2. Biyokirlenme Kayıt Defteri (Biofouling Record Book):
   - Anti-fouling boya uygulamaları
   - Sualtı temizlik ve muayeneleri
   - Dry-docking tarihleri
   - Niş alan bakımları

NİŞ ALANLAR:

Gemi teknesinde biyokirlenmeye en duyarlı bölgeler: deniz suyu giriş ızgaraları (sea chest), dümen, pervane, bow thruster tüneli, anot koruma alanları, kingo valfleri.`,
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
    content: `HONG KONG SÖZLEŞMESİ:

2009'da kabul edilmiş, 26 Haziran 2025'te yürürlüğe girecektir (yeterli onay sağlanmıştır).

AMAÇ: Gemilerin söküm sürecinde:
- İşçi sağlığı ve güvenliğinin korunması
- Çevre kirliliğinin önlenmesi
- Zararlı maddelerin kontrollü yönetimi

TEMEL GEREKSİNİMLER:

1. IHM (Inventory of Hazardous Materials):
   Her gemide bulunan zararlı maddelerin envanteri. 500 GT ve üzeri gemilerde zorunlu olacaktır.
   Üç bölüm:
   - Part I: Gemi yapısında ve donanımında bulunan zararlı maddeler (asbest, PCB, TBT, ODS vb.)
   - Part II: Operasyonel olarak üretilen atıklar
   - Part III: Depolar (stok malzemeleri)

2. Gemi Geri Dönüşüm Planı (Ship Recycling Plan):
   Söküm tesisi tarafından her gemi için özel olarak hazırlanır.

3. Geri Dönüşüm Tesisi Yetkilendirmesi:
   Tesisler ulusal otorite tarafından yetkilendirilmelidir.

AB DÜZENLEMESI (EU SRR):

AB, Hong Kong Sözleşmesi'ni beklemeden kendi Gemi Geri Dönüşüm Düzenlemesi'ni (EU Ship Recycling Regulation, 1257/2013) yürürlüğe koymuştur. AB bayraklı gemiler yalnızca AB onaylı tesislerde sökülebilir.`,
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
    content: `NEDEN GEREKLİ?

MARPOL ekleri pek çok atığın denize deşarjını yasaklar veya sıkı sınırlandırır. Geminin bu atıkları (sintine yağı, slop, çamur/sludge, çöp, pis su, kargo yıkama artığı) bir yerde biriktirip karaya teslim etmesi gerekir. PRF, bu teslimi mümkün kılan liman altyapısıdır; PRF olmadan MARPOL uyumu pratikte sağlanamaz.

GEMİNİN SORUMLULUĞU:

- Atıkları ilgili ekin kayıt defterine (ORB, Garbage Record Book vb.) işlemek.
- PRF'ye teslimde teslim makbuzu (waste delivery receipt) almak ve saklamak.
- Atık yönetim planlarına (Garbage Management Plan vb.) uymak.

LİMAN DEVLETİNİN SORUMLULUĞU:

Taraf devletler, gemilere gereksiz gecikme yaşatmadan yeterli kapasitede PRF sağlamakla yükümlüdür. Yetersiz PRF, denize yasa dışı deşarjı teşvik ettiği için ciddi bir uyum boşluğudur.

AB ÖZELİ:

AB'de PRF Direktifi, gemilerin atıklarını limana teslim etmesini ve atık ücretinin liman ücretine dâhil edilmesini düzenler (deşarj teşvikini azaltmak için).`,
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
    content: `ÇALIŞMA PRENSİBİ:

Scrubber, egzoz gazını su (genellikle deniz suyu) ile yıkar; SOx suda çözünerek gazdan ayrılır. Böylece bacadan çıkan SOx, düşük kükürtlü yakıt kullanılmış gibi sınır altına iner. Uyum, eşdeğer SO2/CO2 oranı ölçümüyle sürekli izlenir.

TİPLER:

- Açık devre (open loop): deniz suyu doğal alkalinitesiyle yıkar, yıkama suyu (washwater) izleme sonrası denize deşarj edilir.
- Kapalı devre (closed loop): tatlı su + alkali (kostik) ile yıkar; washwater devridaim eder, çamur (sludge) karaya verilir. Deşarj kısıtı olan bölgeler için uygundur.
- Hibrit: her iki modda çalışabilir.

WASHWATER VE KISITLAR:

Açık devre deşarj suyu için MARPOL Ek VI kriterleri (pH, PAH, bulanıklık, nitrat) izlenir. Bazı liman/bölgeler açık devre washwater deşarjını yasaklar; bu durumda kapalı devreye geçilir.

UYUM VE DİĞER YOLLAR:

Scrubber, düşük kükürtlü yakıt (VLSFO/MGO) ve LNG ile birlikte Ek VI kükürt uyumunun üç ana yolundan biridir. Sürekli izleme verileri ve onay belgeleri (SECC/onaylı SO2/CO2 oranı) tutulur.`,
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
    content: `KULLANIM AMACI:

Gemide biriken yanabilir atıklar (yağlı çamur/sludge, yağ artığı, bazı çöpler) insineratörde yakılarak hacmi azaltılır; bu, karaya teslim edilecek atık miktarını düşürür.

MARPOL EK VI GEREKSİNİMLERİ:

- Onaylı tip insineratör (IMO standardına uygun) kullanılmalı; yanma odası sıcaklığı izlenmelidir.
- Belirli maddelerin gemide yakılması YASAKTIR: örn. MARPOL ekleri kapsamındaki belirli kalıntılar, PCB içerenler, ağır metal içeren çöpler ve halojenli bileşikler.
- Limanlarda/iç sularda yakma çoğunlukla yasaktır veya kısıtlıdır; liman kuralları önceliklidir.

OPERASYON VE GÜVENLİK:

- Yakma kayıtları (yakılan atık türü/miktarı) Garbage Record Book / ilgili kayıtlara işlenir.
- Yanma sıcaklığı ve baca emisyonu izlenir.
- Yangın ve patlama riski nedeniyle düzgün besleme ve bakım gerekir.

ALTERNATİF:

Yakılamayan veya yakılması yasak atıklar liman atık kabul tesislerine (PRF) teslim edilir.`,
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
      "Yasak maddelerin yakılması ağır yaptırım doğurur",
      "Yanlış besleme/bakım yangın ve patlama riski yaratır",
    ],
  },
  "imo-ghg-strategy": {
    title: "IMO Sera Gazı (GHG) Stratejisi ve Net-Zero Hedefleri",
    introduction: "IMO'nun gemicilik sera gazı stratejisi, uluslararası deniz taşımacılığından kaynaklanan GHG emisyonlarını azaltmak için hedefler ve tedbirler belirler. EEDI/CII gibi araçlar bu stratejinin uygulama mekanizmalarıdır.",
    content: `STRATEJİNİN ÇERÇEVESİ:

IMO'nun revize GHG Stratejisi (2023), uluslararası gemiciliğin emisyonlarını 2050 civarında net-sıfıra (net-zero) ulaştırmayı amaçlar ve yol boyunca ara kontrol noktaları (gösterge hedefler) tanımlar; ayrıca düşük/sıfır karbonlu yakıtların payının artırılmasını hedefler.

TEDBİR TÜRLERİ:

- Teknik tedbirler: yakıtların karbon yoğunluğunu sınırlayan kurallar (ör. yakıt standardı) ve gemi verimliliği gereksinimleri.
- Ekonomik tedbirler: karbon fiyatlandırması/ücretlendirme gibi piyasa temelli mekanizmalar (üzerinde çalışılan).

UYGULAMA ARAÇLARI (mevcut):

- EEDI/EEXI: tasarım/var olan gemi verimlilik indeksleri.
- CII: operasyonel karbon yoğunluğu derecelendirmesi (A–E).
- SEEMP: gemi enerji verimliliği yönetim planı.
Bunlar stratejinin somut uygulama araçlarıdır.

BÖLGESEL ETKİLEŞİM:

AB'nin EU ETS ve FuelEU Maritime düzenlemeleri, IMO çerçevesiyle paralel/ek baskı oluşturur. Gemi işletmeleri hem küresel (IMO) hem bölgesel (AB) gereksinimleri birlikte yönetir.

OPERASYONEL ETKİ:

Hız optimizasyonu (slow steaming), rota/trim optimizasyonu, enerji tasarruf cihazları ve alternatif yakıtlar, hedeflere ulaşmada başlıca operasyonel kaldıraçlardır.`,
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
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-[hsl(160,50%,6%)] dark:via-[hsl(160,50%,8%)] dark:to-[hsl(170,50%,10%)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
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
                    className="border border-border/40 rounded-xl overflow-hidden bg-card/80 backdrop-blur"
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

            <section className="rounded-2xl border border-border/40 bg-card/80 p-6 backdrop-blur mt-6">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-emerald-500" />
                <h2 className="text-lg font-semibold text-foreground">Hızlı Erişim</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { title: "Emisyon Hesaplamaları", href: "/environment/calculations" },
                  { title: "Emisyon Formülleri", href: "/environment/formulas" },
                  { title: "Tüm Dersler", href: "/lessons" },
                ].map((resource, index) => (
                  <Link
                    key={index}
                    to={resource.href}
                    className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-all hover:border-emerald-500/40 hover:bg-background"
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
                <div className="bg-emerald-500/10 rounded-xl p-4 border-l-4 border-emerald-500">
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
