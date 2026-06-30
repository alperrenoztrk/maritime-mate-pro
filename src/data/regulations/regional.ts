import type { RegulationItem } from "./types";

export const regionalRegulations: RegulationItem[] = [
  {
    slug: "paris-mou",
    label: "Paris MoU – Avrupa PSC",
    category: "Bölgesel Düzenlemeler",
    overview: "Avrupa ve Kuzey Atlantik limanlarında PSC denetimlerini koordine eden bölgesel mutabakat zaptı; risk tabanlı hedefleme ve CIC kampanyaları yürütür.",
    history: "1982'de kurulan Paris MoU, liman devleti kontrolü denetimlerinin bölgesel düzeyde koordinasyonunu sağlayan dünyanın ilk ve en kapsamlı mutabakat zaptıdır. Hague Memorandum'un (1978) devamı olarak kurulmuştur. 27 üye devlet (tüm AB kıyı devletleri + Kanada, İzlanda, Norveç, Rusya, UK) ile dünyanın en yoğun deniz trafiği bölgelerini kapsar. 2011'de NIR (New Inspection Regime) uygulamaya geçmiş ve risk tabanlı hedefleme sistemi oluşturulmuştur. Yıllık yaklaşık 18.000 denetim gerçekleştirilir.",
    applicability: [
      "Paris MoU üye devlet limanlarına uğrayan tüm yabancı bayraklı gemiler",
      "27 üye devlet: Belçika, Bulgaristan, Hırvatistan, Kıbrıs, Danimarka, Estonya, Finlandiya, Fransa, Almanya, Yunanistan, İzlanda, İrlanda, İtalya, Letonya, Litvanya, Malta, Hollanda, Norveç, Polonya, Portekiz, Romanya, Slovenya, İspanya, İsveç, UK, Kanada, Rusya",
      "İlişkili devletler (cooperating MoU): Tokyo MoU, USCG ile veri paylaşımı",
    ],
    essentials: [
      "NIR (New Inspection Regime): 2011'den itibaren risk profili tabanlı denetim sistemi",
      "Ship Risk Profile hesaplama: gemi tipi, yaşı, bayrak performansı, RO performansı, geçmiş PSC denetim sonuçları, ISM/ISPS performansı",
      "Risk profili kategorileri: HRS (High Risk Ship), SRS (Standard Risk Ship), LRS (Low Risk Ship)",
      "Denetim aralıkları: HRS → 5-6 ay, SRS → 10-12 ay, LRS → 24-36 ay (öncelik penceresi içinde)",
      "Denetim türleri: Initial inspection, more detailed inspection, expanded inspection (HRS ve yolcu/tanker gemileri için)",
      "CIC (Concentrated Inspection Campaign): yılda 1-2 odaklı kampanya – belirli konularda (STCW, SOLAS yangın güvenliği, BWM vb.) yoğunlaştırılmış denetim",
      "White/Grey/Black list: bayrak devleti performans sıralaması – 3 yıllık alıkoyma oranına göre",
      "THETIS bilgi sistemi: tüm denetim verileri, gemi profilleri, eksiklikler ve alıkoyma kayıtları",
      "Eksiklik kodları: deficiency code sistemi (17 ana kategori, yüzlerce alt kod)",
      "Alıkoyma kriterleri: ISM ciddi uygunsuzluk, yapısal bütünlük, yangın güvenliği, can kurtarma, MARPOL ihlali",
    ],
    actions: [
      "Gemi risk profilini THETIS üzerinden düzenli kontrol et ve HRS'den kaçınmak için eksiklikleri kapat",
      "CIC kampanya temalarını önceden takip et ve mürettebatla birlikte hazırlan",
      "Tüm sertifikaları güncel tut ve geçerlilik tarihlerini kontrol et",
      "Pre-PSC internal checklist ile iç denetim yap (özellikle HRS gemilerde)",
      "Eksiklikleri en kısa sürede kapat ve kanıtları (fotoğraf, rapor, test kayıtları) hazırla",
      "White list bayrak devletlerinin avantajını kullan (LRS olasılığı artar)",
      "Geçmiş denetim raporlarını analiz ederek tekrar eden eksiklikleri gider",
    ],
    amendments: [
      { year: "1982", description: "Paris MoU kuruldu – 14 üye devlet ile başlangıç" },
      { year: "2004", description: "AB PSC Direktifi (2009/16/EC öncülü) ile uyumlaştırma" },
      { year: "2011", description: "NIR (New Inspection Regime) uygulamaya geçti – risk tabanlı hedefleme" },
      { year: "2024", description: "THETIS-EU sistemi güncellendi, CIC kampanya kapsamı genişletildi" },
    ],
    keyArticles: [
      { id: "Bölüm 1", title: "Genel Hükümler", summary: "MoU'nun kapsamı, üye devletler ve temel denetim yükümlülükleri." },
      { id: "Bölüm 2", title: "Denetim Yükümlülükleri", summary: "Üye devletlerin yıllık denetim taahhütleri ve hedef denetim oranları." },
      { id: "Bölüm 3", title: "Denetim Prosedürleri", summary: "Initial, detailed ve expanded inspection prosedürleri ve uygulama kriterleri." },
      { id: "Ek 7", title: "Ship Risk Profile", summary: "Gemilerin risk profili hesaplama parametreleri ve HRS/SRS/LRS sınıflandırma kriterleri." },
    ],
    penalties: [
      "Detention: ciddi eksikliklerde geminin liman devleti tarafından alıkonması (geminin emniyetli hale getirilmesine kadar)",
      "Ban (giriş yasağı): 3 kez alıkonma → 3 ay ban; 4. kez → 12 ay; 5. kez → 24 ay; sonrası → kalıcı ban",
      "Refusal of access: yasaklı geminin Paris MoU bölgesindeki tüm limanlara girişinin reddedilmesi",
      "Birden fazla ciddi eksiklik tespitinde geminin seferden men edilmesi",
      "Ban kaldırma koşulları: tüm eksikliklerin giderilmesi, klas ve bayrak devleti onayı, ek denetim ücreti",
    ],
    detailedSections: [
      {
        heading: "Bölgesel PSC'nin doğduğu yer",
        body:
          "Paris MoU, liman devleti kontrolünün bölgesel koordinasyonunu icat eden ve dünyaya model olan mutabakat zaptıdır. Tek bir devletin denetimleri yalnızca kendi limanlarını kapsar; ama gemiler bölgesel olarak hareket eder. Paris MoU'nun temel fikri, üye devletlerin denetim sonuçlarını ortak bir veritabanında (THETIS) paylaşması ve denetim yükünü aralarında bölüşmesidir. Böylece bir gemi bir üye limanda denetlendiğinde, sonuç tüm üyelerce görülür ve gereksiz tekrar denetimler önlenirken standart altı gemiler bölge genelinde takip edilebilir. 27 üye devletle dünyanın en yoğun deniz trafiği bölgelerinden birini kapsar.",
      },
      {
        heading: "Risk profili ve Yeni Denetim Rejimi (NIR)",
        body:
          "Paris MoU'nun 2011'de uygulamaya koyduğu Yeni Denetim Rejimi (NIR), modern PSC'nin omurgasını oluşturur. Her gemiye; tipi, yaşı, bayrak performansı, klas (RO) performansı, geçmiş denetim sonuçları ve ISM/ISPS geçmişine dayanan bir risk profili atanır. Gemi Yüksek (HRS), Standart (SRS) veya Düşük (LRS) riskli sayılır ve denetim sıklığı buna göre belirlenir: yüksek riskli gemiler birkaç ayda bir, düşük riskliler iki-üç yılda bir hedeflenir. Buna ek olarak yılda bir-iki kez belirli bir konuya (örneğin BWM, STCW, yangın güvenliği) odaklanan Yoğunlaştırılmış Denetim Kampanyaları (CIC) yürütülür.",
      },
      {
        heading: "Alıkoyma, ban ve bayrak listeleri",
        body:
          "Paris MoU'nun yaptırım gücü kademelidir. Ciddi eksiklikler geminin alıkonmasına (detention) yol açar; tekrarlayan alıkoymalar ise giriş yasağına (ban) kadar gider — üç alıkoyma üç ay, dördüncüsü on iki ay, beşincisi yirmi dört ay yasak ve sonrasında kalıcı men anlamına gelebilir. Denetim performansı bayrak devletlerini de etkiler: üç yıllık alıkoyma oranlarına göre bayraklar White, Grey ve Black listelere ayrılır ve bu sıralama, o bayrağın gemilerinin denetlenme olasılığını belirler. Gemiler bu yüzden risk profillerini THETIS üzerinden izler, CIC temalarına hazırlanır ve eksiklikleri önceden kapatır.",
      },
    ],
    relatedSlugs: ["psc", "tokyo-mou", "ism-code"],
    resources: [{ label: "Paris MoU", href: "https://www.parismou.org/" }],
  },
  {
    slug: "tokyo-mou",
    label: "Tokyo MoU – Asya-Pasifik PSC",
    category: "Bölgesel Düzenlemeler",
    overview: "Asya-Pasifik bölgesindeki liman devletleri arasında PSC koordinasyonunu sağlayan bölgesel mutabakat zaptı.",
    history: "1993'te kurulan Tokyo MoU, Asya-Pasifik bölgesindeki 21 üye devletin PSC denetimlerini koordine eder. Dünyanın en yoğun deniz trafiği bölgelerinden birini kapsayan Tokyo MoU, yıllık yaklaşık 30.000+ denetim gerçekleştirir. NIR (New Inspection Regime) 2014'te uygulanmaya başlamıştır. Paris MoU ile yakın işbirliği içinde olup ortak CIC kampanyaları yürütür.",
    applicability: [
      "21 üye devlet limanlarına uğrayan tüm yabancı bayraklı gemiler",
      "Üye devletler: Avustralya, Kanada (gözlemci), Çin, Fiji, Hong Kong (Çin), Endonezya, Japonya, Güney Kore, Malezya, Marshall Adaları, Yeni Zelanda, Papua Yeni Gine, Filipinler, Rusya, Singapur, Solomon Adaları, Tayland, Tonga, Vanuatu, Vietnam",
      "İşbirliği: Paris MoU, USCG, Indian Ocean MoU ile veri paylaşımı",
    ],
    essentials: [
      "NIR (New Inspection Regime): 2014'ten itibaren risk tabanlı hedefleme sistemi (Paris MoU benzeri)",
      "Risk profili: Ship Risk Profile (SRP) hesaplama – bayrak performansı, gemi yaşı/tipi, klas performansı, şirket performansı, geçmiş PSC sonuçları",
      "Denetim aralıkları: HRS 5-6 ay, SRS 10-12 ay, LRS 18-30 ay",
      "APCIS (Asia Pacific Computerized Information System): denetim verileri ve gemi profilleri",
      "CIC kampanyaları: Paris MoU ile koordineli yılda 1-2 odaklı kampanya",
      "White/Grey/Black list: bayrak devleti performans sıralaması (3 yıllık veriye dayalı)",
      "Denetim kapsamı: sertifikalar, teçhizat, yapısal bütünlük, operasyonel prosedürler, mürettebat yeterliliği",
      "Alıkoyma kriterleri: Paris MoU ile uyumlu detention threshold",
    ],
    actions: [
      "Tokyo MoU bölgesine giriş öncesi SRP'yi APCIS üzerinden kontrol et",
      "CIC kampanya temalarını mürettebatla gözden geçir ve hazırlan",
      "Denetim trendlerini izle: APCIS yıllık raporları ve istatistikleri",
      "Eksiklik kapatma kanıtlarını hazır tut ve bayrak/RO ile koordine et",
      "Pre-arrival notification (NOA) gerekliliklerini kontrol et",
      "HRS profilinden çıkmak için geçmiş eksiklikleri analiz et ve düzeltici aksiyon al",
    ],
    amendments: [
      { year: "1993", description: "Tokyo MoU kuruldu – Asya-Pasifik PSC koordinasyonu başladı" },
      { year: "2014", description: "NIR (New Inspection Regime) uygulamaya geçti" },
      { year: "2017", description: "APCIS sistemi güncellendi, veri paylaşımı kapsamı genişletildi" },
    ],
    keyArticles: [
      { id: "Bölüm 2", title: "Denetim Taahhütleri", summary: "Üye devletlerin yıllık denetim oranları ve hedef sayıları." },
      { id: "Bölüm 3", title: "Denetim Prosedürleri", summary: "Denetim türleri, kapsamı ve uygulama kriterleri." },
      { id: "Ek 8", title: "Ship Risk Profile", summary: "Risk profili hesaplama kriterleri ve HRS/SRS/LRS sınıflandırma parametreleri." },
    ],
    penalties: [
      "Detention: ciddi eksikliklerde geminin alıkonması",
      "Ban: tekrarlayan alıkonmalarda Tokyo MoU bölgesine giriş yasağı",
      "Black list bayrak devletlerine kayıtlı gemilerde artan denetim sıklığı",
      "Alıkoyma kayıtlarının APCIS'te saklanması ve tüm üye devletler tarafından görünmesi",
    ],
    detailedSections: [
      {
        heading: "Asya-Pasifik'in PSC ağı",
        body:
          "Tokyo MoU, Asya-Pasifik bölgesindeki 21 üye devletin liman devleti kontrolünü koordine eder ve dünyanın en yoğun konteyner ve kuru yük trafiğinin geçtiği suları kapsar. Yıllık denetim hacmi açısından dünyanın en büyük PSC bölgesidir; her yıl on binlerce denetim gerçekleştirir. Paris MoU ile aynı temel felsefeyi paylaşır: ortak bir veritabanı (APCIS) üzerinden denetim sonuçlarını paylaşmak, denetim yükünü üyeler arasında bölüşmek ve standart altı gemileri bölge genelinde izlemek. İki MoU yakın işbirliği içinde çalışır ve sıklıkla ortak CIC kampanyaları yürütür.",
      },
      {
        heading: "Risk hedefleme ve operasyonel hazırlık",
        body:
          "Tokyo MoU de 2014'ten itibaren Paris benzeri bir Yeni Denetim Rejimi (NIR) uygular: gemi risk profili (SRP), bayrak ve klas performansı, gemi yaşı/tipi, işletmeci performansı ve geçmiş denetim sonuçlarından hesaplanır ve denetim aralığı buna göre belirlenir. Bölgeye giriş yapacak bir gemi için en akılcı yaklaşım, APCIS üzerinden kendi risk profilini önceden kontrol etmek, yürürlükteki CIC kampanya temalarını mürettebatla gözden geçirmek ve geçmiş eksiklikleri analiz ederek tekrar edenleri gidermektir. Alıkoyma kriterleri ve eksiklik kodları Paris MoU ile uyumludur, böylece iki bölge arasında tutarlı bir denetim standardı korunur.",
      },
    ],
    relatedSlugs: ["psc", "paris-mou"],
    resources: [{ label: "Tokyo MoU", href: "https://www.tokyo-mou.org/" }],
  },
  {
    slug: "uscg",
    label: "USCG – ABD Sahil Güvenlik Denetimleri",
    category: "Bölgesel Düzenlemeler",
    overview: "ABD limanlarında USCG tarafından yapılan kapsamlı denetimler; QUALSHIP 21 programı ve sıkı uyum gereklilikleri içerir.",
    history: "ABD, Paris veya Tokyo MoU üyesi değildir; kendi bağımsız ve genellikle daha sıkı PSC rejimini uygular. USCG (United States Coast Guard) denetimleri, uluslararası sözleşmelere ek olarak ABD federal yasaları kapsamında da yürütülür. QUALSHIP 21 (Quality Shipping for the 21st Century) programı 2001'de başlatılmış olup, yüksek performanslı gemilere denetim kolaylığı sağlar. ABD, denizcilik çevre ihlallerinde (APPS) cezai yaptırım uygulayan en sıkı ülkelerden biridir.",
    applicability: [
      "ABD limanlarına ve sularına giren tüm yabancı bayraklı gemiler",
      "Territorial sea (12 mil), EEZ (200 mil) ve iç sulardaki gemiler (geçiş hakkı kapsamında bile)",
      "ABD OCS (Outer Continental Shelf) üzerinde çalışan offshore gemiler",
      "ABD bayraklı gemilerin düzenli denetimleri (ayrı rejim)",
    ],
    essentials: [
      "QUALSHIP 21: yüksek performanslı gemilere (sıfır alıkoyma, yüksek bayrak ve klas performansı) 2 yıl denetim muafiyeti",
      "Targeting matrix: her gemiye puanlama – bayrak, klas, şirket, gemi yaşı/tipi, geçmiş PSC sonuçları, QUALSHIP 21 durumu",
      "Denetim kapsamı: sertifikalar, teçhizat, operasyonel prosedürler, mürettebat, BWM, ISM/ISPS, MARPOL uyumu",
      "ABD'ye özgü gereklilikler: VGP (Vessel General Permit – EPA), APPS uyumu, OPA 90 kapsamında kirlilik önleme",
      "NVIC'ler (Navigation and Vessel Inspection Circulars): USCG politika ve uygulama kılavuzları – düzenli güncellenir",
      "APPS (Act to Prevent Pollution from Ships): deniz kirliliği ihlallerinde ciddi cezai yaptırım (magic pipe, ORB falsification)",
      "COTP (Captain of the Port) yetkileri: gemi hareketlerini durdurma, bölgesel güvenlik emirleri verme",
      "Priority boarding: risk tabanlı önceliklendirme – ilk ziyaret, yüksek riskli bayrak, geçmiş eksiklikler",
      "96 saat NOA (Notice of Arrival): ABD limanlarına giriş öncesi zorunlu bildirim",
      "eNOAD (electronic Notice of Arrival/Departure): NVMC üzerinden elektronik bildirim",
    ],
    actions: [
      "QUALSHIP 21 kriterlerini karşılamaya çalış ve statüyü koru",
      "ABD'ye giriş öncesi kapsamlı iç denetim yap (USCG checklist kullan)",
      "96 saat önceden NOA (Notice of Arrival) gönder (eNOAD üzerinden)",
      "Tüm dokümantasyonu hazır tut: ORB, BDN, BWM kayıtları, ISM/ISPS belgeleri",
      "USCG NVIC güncellemelerini takip et (özellikle BWM, cyber security, APPS)",
      "Mürettebatı USCG denetim prosedürleri konusunda bilgilendir",
      "Herhangi bir çevre ihlali riskini minimize et (ORB doğruluğu, OWS bakımı kritik)",
    ],
    amendments: [
      { year: "1990", description: "OPA 90 (Oil Pollution Act) – Exxon Valdez sonrası kapsamlı çevre koruma yasası" },
      { year: "2001", description: "QUALSHIP 21 programı başlatıldı" },
      { year: "2004", description: "MTSA (Maritime Transportation Security Act) – ISPS Code ABD uygulaması" },
      { year: "2013", description: "ABD BWM kuralları güncellendi – USCG tip onaylı BWMS zorunluluğu" },
      { year: "2021", description: "Cyber security NVIC güncellemesi" },
    ],
    keyArticles: [
      { id: "33 CFR 160", title: "Ports and Waterways Safety", summary: "COTP yetkileri ve gemi hareketlerinin düzenlenmesi." },
      { id: "33 CFR 164", title: "Navigation Safety", summary: "Seyir güvenliği gereklilikleri: AIS, ECDIS, VDR ve köprüüstü prosedürleri." },
      { id: "46 USC §3301-3318", title: "Vessel Inspection", summary: "ABD bayraklı ve yabancı bayraklı gemilerin denetim yetkileri ve prosedürleri." },
      { id: "APPS (33 USC §1901-1912)", title: "Kirlilik Önleme", summary: "MARPOL'ün ABD uygulaması – ihlallerde cezai yaptırım, whistleblower ödülleri." },
    ],
    penalties: [
      "Eksiklik ve alıkoyma durumunda yüksek idari para cezaları (binlerce dolardan yüz binlerce dolara)",
      "APPS ihlalinde (magic pipe, ORB falsification) hapis cezası (10 yıla kadar) ve milyonlarca dolar para cezası",
      "Whistleblower programı: mürettebat ihbar ederse ödül alır (ceza miktarının %50'sine kadar)",
      "OPA 90 kapsamında petrol kirliliğinde sınırsız sorumluluk (temizleme + doğal kaynak hasarı)",
      "QUALSHIP 21 statüsünün kaybında artan denetim sıklığı ve ticari itibar kaybı",
      "Gemi giriş yasağı (denial of entry) ve sınır dışı edilme",
    ],
    detailedSections: [
      {
        heading: "MoU dışı, kendine özgü ve katı bir rejim",
        body:
          "ABD'nin denetim sistemi, diğer bölgesel rejimlerden temelde ayrılır: ABD ne Paris ne de Tokyo MoU üyesidir; kendi bağımsız ve genellikle daha sıkı PSC rejimini USCG (United States Coast Guard) aracılığıyla uygular. Bunun anlamı, uluslararası sözleşmelerin yanı sıra ABD federal yasalarının da denetime dahil olmasıdır. ABD limanlarına giren her yabancı bayraklı gemi, karasularına girdiği andan itibaren bu rejime tabidir. Bu bağımsızlık, ABD'yi denizcilikte uyum çıtasının en yüksek olduğu yargı alanlarından biri haline getirir.",
      },
      {
        heading: "QUALSHIP 21 ve hedefleme matrisi",
        body:
          "USCG, gemileri bir hedefleme matrisiyle puanlar: bayrak, klas, işletmeci, gemi yaşı/tipi ve geçmiş denetim sonuçları bu puanı belirler ve yüksek riskli gemilere öncelik verilir. Olumlu tarafta, yüksek performanslı gemileri ödüllendiren QUALSHIP 21 programı vardır: sıfır alıkoyma geçmişi ve güçlü bayrak/klas performansına sahip gemiler denetim kolaylığı kazanır. ABD'ye giriş, 96 saat önceden elektronik varış bildirimi (eNOA) gerektirir. ABD'ye özgü ek gereklilikler arasında EPA'nın VGP'si, OPA 90 kapsamındaki kirlilik önleme yükümlülükleri ve düzenli güncellenen NVIC politika kılavuzları bulunur.",
      },
      {
        heading: "Çevre ihlallerinde ağır cezai sorumluluk",
        body:
          "USCG rejimini en çok ayrıştıran yön, çevre ihlallerine verdiği cezai ağırlıktır. APPS (Act to Prevent Pollution from Ships), MARPOL'ün ABD uygulamasıdır ve özellikle 'magic pipe' (yağ-su ayırıcıyı atlatma) ve Yağ Kayıt Defteri sahteciliği gibi ihlalleri ağır biçimde kovuşturur: on yıla varan hapis cezaları ve milyonlarca dolar para cezası mümkündür. Dahası, ihbarcı (whistleblower) programı, ihlali bildiren mürettebata ceza miktarının önemli bir bölümüne kadar ödül vererek iç bildirimi teşvik eder. OPA 90 ise petrol kirliliğinde fiilen sınırsız sorumluluk getirir. Bu yüzden ABD'ye uğrayan gemilerde ORB doğruluğu ve OWS bakımı mutlak öncelikli tutulur.",
      },
    ],
    relatedSlugs: ["psc", "marpol", "bwm"],
    resources: [{ label: "USCG", href: "https://www.dco.uscg.mil/" }],
  },
  {
    slug: "riyadh-mou",
    label: "Riyadh MoU – Körfez PSC",
    category: "Bölgesel Düzenlemeler",
    overview: "Basra Körfezi ve Kızıldeniz bölgesindeki liman devletleri arasında PSC koordinasyonunu sağlayan bölgesel mutabakat zaptı.",
    history: "2005'te kurulan Riyadh MoU, Basra Körfezi, Arap Denizi ve Kızıldeniz bölgesindeki 6 üye devletin PSC denetimlerini koordine eder. Üye devletler: Bahreyn, Kuveyt, Umman, Katar, Suudi Arabistan ve BAE. Bölge, dünya petrol trafiğinin önemli bir kısmını barındırır. Diğer MoU'larla karşılaştırıldığında görece yeni bir organizasyondur.",
    applicability: [
      "Riyadh MoU üye devlet limanlarına uğrayan tüm yabancı bayraklı gemiler",
      "6 üye devlet: Bahreyn, Kuveyt, Umman, Katar, Suudi Arabistan, BAE",
      "Bölgedeki tanker trafiği yoğunluğu nedeniyle özellikle petrol tankerleri ve kimyasal tankerler üzerinde odaklanma",
    ],
    essentials: [
      "Denetim standartları ve prosedürleri: IMO PSC Guidelines (Res. A.1138(31)) uyumlu",
      "Hedefleme ve denetim oranları: bölgesel hedef denetim oranı",
      "Eksiklik sınıflandırması: IMO kodlarına uyumlu eksiklik ve alıkoyma kriterleri",
      "Bölgesel bilgi sistemi: denetim verilerinin toplanması ve üye devletler arası paylaşım",
      "CIC kampanyaları: diğer MoU'lar (Paris, Tokyo) ile koordineli odaklı kampanyalar",
      "Bölgeye özgü odak alanları: tanker emniyeti, ISPS güvenlik, çevre koruma (Körfez hassas ekosistemi)",
    ],
    actions: [
      "Körfez bölgesine giriş öncesi denetim hazırlığı yap (özellikle tanker gemileri)",
      "Yerel gereklilikleri kontrol et (BAE, Suudi Arabistan'a özgü ek düzenlemeler)",
      "CIC kampanya temalarını takip et ve mürettebatla gözden geçir",
      "Denetim bulgularını hızlı kapat ve kanıtları hazırla",
      "Bölgedeki terminal/charterer ek gerekliliklerini (SIRE, CDI) karşıla",
    ],
    keyArticles: [
      { id: "Bölüm 2", title: "Denetim Yükümlülükleri", summary: "Üye devletlerin denetim hedefleri ve koordinasyon mekanizmaları." },
      { id: "Bölüm 3", title: "Denetim Prosedürleri", summary: "PSC denetim kapsamı, eksiklik kodları ve alıkoyma kriterleri." },
    ],
    penalties: [
      "Detention: ciddi eksikliklerde geminin alıkonması",
      "Eksiklik kapatma talebi ve takip denetimi",
      "Bölgesel alıkoyma kayıtlarının paylaşımı",
    ],
    detailedSections: [
      {
        heading: "Körfez'in petrol trafiği ve PSC işbirliği",
        body:
          "Riyadh MoU, Basra Körfezi, Arap Denizi ve Kızıldeniz bölgesindeki altı Körfez ülkesinin (Bahreyn, Kuveyt, Umman, Katar, Suudi Arabistan, BAE) liman devleti kontrolünü koordine eder. Bölge, dünya petrol trafiğinin önemli bir kısmının geçtiği stratejik bir koridordur; bu nedenle MoU özellikle petrol ve kimyasal tankerler üzerinde yoğunlaşır. Diğer büyük MoU'lara göre görece yeni ve daha küçük bir organizasyon olsa da, denetim standartlarını IMO PSC Kılavuzları (Res. A.1138(31)) ile uyumlu yürütür ve bölgesel veri paylaşımı sağlar.",
      },
      {
        heading: "Bölgeye özgü hazırlık",
        body:
          "Körfez bölgesine giriş yapacak gemiler, standart PSC hazırlığının ötesinde bölgesel özelliklere dikkat etmelidir. Tanker yoğunluğu nedeniyle denetimler sıklıkla tanker emniyeti, ISPS güvenliği ve Körfez'in hassas ekosistemini koruyan çevre kurallarına odaklanır. Ayrıca BAE ve Suudi Arabistan gibi üye devletlerin yerel ek düzenlemeleri olabilir ve terminaller çoğu zaman SIRE/CDI gibi ticari vetting gerekliliklerini de arar. MoU, Paris ve Tokyo gibi büyük rejimlerle koordineli CIC kampanyaları yürütür; bu yüzden gemiler güncel kampanya temalarını mürettebatla önceden gözden geçirmelidir.",
      },
    ],
    relatedSlugs: ["psc"],
    resources: [{ label: "Riyadh MoU", href: "https://www.riyadhmou.org/" }],
  },
  {
    slug: "black-sea-mou",
    label: "Black Sea MoU – Karadeniz PSC",
    category: "Bölgesel Düzenlemeler",
    overview: "Karadeniz limanlarındaki PSC denetimlerini koordine eder; risk temelli denetim ve ortak kampanyalar yürütür.",
    history: "2000'de kurulan Black Sea MoU, Karadeniz'e kıyısı olan 6 ülkenin PSC denetimlerini koordine eder: Bulgaristan, Gürcistan, Romanya, Rusya, Türkiye ve Ukrayna. Paris MoU ile yakın işbirliği içindedir ve AB üyesi ülkeler (Bulgaristan, Romanya) aynı zamanda Paris MoU üyesidir. Türkiye, hem Black Sea MoU hem de Mediterranean MoU üyesidir.",
    applicability: [
      "Black Sea MoU üye devlet limanlarına uğrayan tüm yabancı bayraklı gemiler",
      "6 üye devlet: Bulgaristan, Gürcistan, Romanya, Rusya, Türkiye, Ukrayna",
      "Karadeniz ve Azak Denizi'ndeki tüm ticari limanlarda",
    ],
    essentials: [
      "Hedefleme kriterleri: gemi yaşı, tipi, bayrak performansı ve geçmiş denetim sonuçlarına göre önceliklendirme",
      "Denetim prosedürleri: IMO PSC Guidelines uyumlu initial ve detailed inspection",
      "Eksiklik, alıkoyma ve raporlama süreçleri: standart IMO kodları",
      "Veri paylaşımı ve istatistiksel performans göstergeleri: yıllık rapor yayımlama",
      "CIC koordinasyonu: Paris MoU ve diğer MoU'lar ile ortak kampanyalar",
      "Bölgesel bilgi sistemi: BS-INFO sistemi üzerinden denetim veri paylaşımı",
    ],
    actions: [
      "Karadeniz limanlarına girmeden CIC temalarını mürettebatla gözden geçir",
      "Bulgu kapatma kanıtlarını bayrak devleti ve klas kuruluşu ile paylaş",
      "Bölgesel raporlama portalı kayıtlarını doğrula",
      "Türk Boğazları geçişi öncesi VTS bildirim gerekliliklerini yerine getir",
      "Denetim trendlerini izle ve tekrar eden eksiklikleri önle",
    ],
    keyArticles: [
      { id: "Bölüm 2", title: "Denetim Taahhütleri", summary: "Üye devletlerin yıllık denetim hedefleri ve koordinasyon mekanizmaları." },
      { id: "Bölüm 3", title: "Denetim Prosedürleri", summary: "Initial ve detailed inspection kapsamı, eksiklik ve alıkoyma kriterleri." },
    ],
    penalties: [
      "Detention: ciddi eksikliklerde geminin alıkonması",
      "Eksiklik kapatma ve takip denetimi zorunluluğu",
      "Alıkoyma kayıtlarının BS-INFO sisteminde saklanması ve tüm üye devletler tarafından görünmesi",
    ],
    detailedSections: [
      {
        heading: "Karadeniz'in altı kıyı devleti",
        body:
          "Black Sea MoU, Karadeniz'e kıyısı olan altı ülkenin (Bulgaristan, Gürcistan, Romanya, Rusya, Türkiye, Ukrayna) liman devleti kontrolünü koordine eder. Bölgenin ilginç bir yapısal özelliği vardır: AB üyesi olan Bulgaristan ve Romanya aynı zamanda Paris MoU üyesidir, Türkiye ise hem Black Sea hem Mediterranean MoU'ya dahildir. Bu çakışan üyelikler, Karadeniz denetimlerinin Paris MoU standartlarıyla yakın uyum içinde yürütülmesini sağlar. Denetim verileri BS-INFO bölgesel sistemi üzerinden paylaşılır ve üyeler arasında ortak görünür.",
      },
      {
        heading: "Bölgesel hazırlık ve boğaz geçişleri",
        body:
          "Karadeniz limanlarına girecek gemiler, IMO PSC Kılavuzlarına dayanan ilk ve ayrıntılı denetimlere hazırlıklı olmalıdır; hedefleme gemi yaşı, tipi, bayrak performansı ve geçmiş sonuçlara göre yapılır. Bölgeye özgü önemli bir nokta Türk Boğazları'dır: Karadeniz'e giriş-çıkışta İstanbul ve Çanakkale boğazlarının geçişi, VTS bildirim gerekliliklerine ve trafik düzenine uyumu gerektirir. Black Sea MoU, Paris ve diğer MoU'larla koordineli CIC kampanyaları yürüttüğü için gemiler güncel kampanya temalarını mürettebatla gözden geçirmeli ve bulgu kapatma kanıtlarını bayrak devleti ile klas kuruluşuyla paylaşmalıdır.",
      },
    ],
    relatedSlugs: ["psc", "paris-mou"],
    resources: [{ label: "Black Sea MoU", href: "https://www.bsmou.org/" }],
  },
  {
    slug: "indian-ocean-mou",
    label: "Indian Ocean MoU – Hint Okyanusu PSC",
    category: "Bölgesel Düzenlemeler",
    overview: "Hint Okyanusu bölgesindeki liman devletleri arasında PSC koordinasyonunu sağlayan bölgesel mutabakat zaptı.",
    history: "1998'de kurulan Indian Ocean MoU, Hint Okyanusu ve çevresindeki ülkelerin PSC işbirliğini sağlar. Üye devletler arasında Avustralya, Hindistan, İran, Güney Afrika, Kenya, Tanzanya, Mozambik, Sri Lanka, Myanmar, Mauritius, Eritre, Maldivler, Sudan, Yemen, Bangladeş, Umman ve Fransa (La Réunion) bulunmaktadır. Bölge, Süveyş-Malakka arasındaki stratejik deniz yollarını kapsar.",
    applicability: [
      "Indian Ocean MoU üye devlet limanlarına uğrayan tüm yabancı bayraklı gemiler",
      "18 üye devlet: Avustralya, Bangladeş, Komorlar, Eritre, Fransa (La Réunion), Hindistan, İran, Kenya, Maldivler, Mauritius, Mozambik, Myanmar, Umman, Güney Afrika, Sri Lanka, Sudan, Tanzanya, Yemen",
      "Hint Okyanusu, Kızıldeniz güneyi ve Güneydoğu Afrika kıyılarındaki limanlarda",
    ],
    essentials: [
      "Risk tabanlı hedefleme: gemi profili, bayrak performansı ve geçmiş denetim sonuçlarına göre",
      "Denetim oranları: üye devlet kapasitesine göre değişen hedef oranlar",
      "Eksiklik ve alıkoyma prosedürleri: IMO PSC Guidelines uyumlu",
      "Bölgesel CIC kampanyaları: Paris MoU ve Tokyo MoU ile koordineli",
      "IOMIS (Indian Ocean MoU Information System): denetim veri paylaşım sistemi",
      "Kapasite geliştirme: PSC denetçi eğitim programları",
    ],
    actions: [
      "Hint Okyanusu limanlarına giriş öncesi CIC temalarını gözden geçir",
      "Bölgesel denetim trendlerini izleyip hazırlık yap",
      "Eksiklik kapatma kanıtlarını zamanında sun",
      "Yerel düzenlemeleri (Avustralya AMSA, Güney Afrika SAMSA gibi) ayrıca kontrol et",
      "Bölgedeki liman devletlerinin ek gerekliliklerini araştır",
    ],
    keyArticles: [
      { id: "Bölüm 2", title: "Denetim Yükümlülükleri", summary: "Üye devletlerin denetim taahhütleri ve hedef oranları." },
      { id: "Bölüm 3", title: "Denetim Prosedürleri", summary: "Denetim kapsamı, eksiklik sınıflandırması ve alıkoyma kriterleri." },
    ],
    penalties: [
      "Detention: ciddi eksikliklerde geminin alıkonması",
      "Takip denetimi zorunluluğu",
      "Alıkoyma kayıtlarının IOMIS sisteminde paylaşılması",
    ],
    detailedSections: [
      {
        heading: "Stratejik deniz yollarının PSC örgütü",
        body:
          "Indian Ocean MoU, Hint Okyanusu ve çevresindeki 18 üye devletin liman devleti kontrolünü koordine eder; üyeler Avustralya'dan Hindistan'a, Güney Afrika'dan İran ve Doğu Afrika kıyılarına kadar geniş bir coğrafyaya yayılır. Bu bölge, Süveyş ile Malakka Boğazı arasındaki en yoğun ticaret rotalarını ve dünya petrol/konteyner trafiğinin kritik bir kısmını barındırır. MoU, denetim verilerini IOMIS bölgesel sistemi üzerinden paylaşır ve risk tabanlı hedefleme ile öncelikli gemileri belirler.",
      },
      {
        heading: "Kapasite gelişimi ve yerel düzenlemeler",
        body:
          "Indian Ocean MoU'nun belirgin bir özelliği, üye devletler arasındaki denetim kapasitesi farklılıklarıdır; bu yüzden MoU, denetçi eğitim programları ve teknik yardımla bölgesel standardizasyonu güçlendirmeye önem verir. Denetim oranları üye devletin kapasitesine göre değişebilir. Bölgeye giren gemiler, MoU'nun ortak kurallarının yanı sıra güçlü ulusal rejimleri de göz önünde bulundurmalıdır: Avustralya'nın AMSA'sı ve Güney Afrika'nın SAMSA'sı kendi sıkı uygulamalarıyla bilinir. Paris ve Tokyo MoU'larla koordineli CIC kampanyaları yürütüldüğünden, gemiler güncel temaları gözden geçirip eksiklik kapatma kanıtlarını zamanında sunmalıdır.",
      },
    ],
    relatedSlugs: ["psc"],
    resources: [{ label: "Indian Ocean MoU", href: "https://www.iomou.org/" }],
  },
  {
    slug: "mediterranean-mou",
    label: "Mediterranean MoU – Akdeniz PSC",
    category: "Bölgesel Düzenlemeler",
    overview: "Akdeniz limanlarında PSC denetim koordinasyonu ve uyum standartlarını belirleyen bölgesel anlaşma.",
    history: "1997'de kurulan Mediterranean MoU, Akdeniz'e kıyısı olan ülkelerin PSC denetimlerini koordine eder. Üye devletler arasında Kuzey Afrika ülkeleri (Cezayir, Mısır, Libya, Fas, Tunus), Doğu Akdeniz ülkeleri (İsrail, Lübnan, Türkiye), Malta ve Kıbrıs bulunmaktadır. Paris MoU ile yakın işbirliği içindedir ve AB üyesi olan Akdeniz ülkeleri (Malta, Kıbrıs) aynı zamanda Paris MoU üyesidir.",
    applicability: [
      "Mediterranean MoU üye devlet limanlarına uğrayan tüm yabancı bayraklı gemiler",
      "Üye devletler: Cezayir, Kıbrıs, Mısır, İsrail, Ürdün, Lübnan, Libya, Malta, Fas, Tunus, Türkiye",
      "Akdeniz kıyı devletlerinin tüm ticari limanlarında",
    ],
    essentials: [
      "Hedefleme sistemi ve öncelikli denetim kriterleri: gemi yaşı, tipi, bayrak performansı",
      "Eksiklik sınıflandırması ve alıkoyma koşulları: IMO PSC Guidelines uyumlu",
      "Bölgesel CIC kampanyaları: Paris MoU ile koordineli odaklı denetimler",
      "GISIS veri entegrasyonu: IMO Global Integrated Shipping Information System ile veri paylaşımı",
      "Paris MoU ile harmonizasyon: AB üyesi Akdeniz ülkelerinde çifte üyelik",
      "Med-INFO bilgi sistemi: bölgesel denetim veri paylaşım platformu",
    ],
    actions: [
      "Akdeniz limanlarında beklenen denetim konularına hazırlan",
      "CIC kampanya duyurularını operasyon ekibiyle paylaş",
      "Denetim bulgu trendlerini analiz ederek önleyici aksiyon al",
      "Kuzey Afrika limanlarına giriş öncesi yerel gereklilikleri kontrol et",
      "Akdeniz ECA (2028 yürürlük) SOx gerekliliklerine hazırlan",
    ],
    keyArticles: [
      { id: "Bölüm 2", title: "Denetim Yükümlülükleri", summary: "Üye devletlerin denetim taahhütleri ve koordinasyon mekanizmaları." },
      { id: "Bölüm 3", title: "Denetim Prosedürleri", summary: "Denetim kapsamı, eksiklik kodları ve alıkoyma kriterleri." },
    ],
    penalties: [
      "Detention: ciddi eksikliklerde geminin alıkonması",
      "Takip denetimi ve eksiklik kapatma zorunluluğu",
      "Bölgesel alıkoyma kayıtlarının Med-INFO sisteminde paylaşılması",
    ],
    detailedSections: [
      {
        heading: "Akdeniz havzasının denetim koordinasyonu",
        body:
          "Mediterranean MoU, Akdeniz'e kıyısı olan ülkelerin liman devleti kontrolünü koordine eder; üyeleri arasında Kuzey Afrika (Cezayir, Mısır, Libya, Fas, Tunus), Doğu Akdeniz (İsrail, Ürdün, Lübnan, Türkiye) ülkeleri ile Malta ve Kıbrıs bulunur. AB üyesi olan Malta ve Kıbrıs aynı zamanda Paris MoU üyesi olduğundan, MoU Paris standartlarıyla yakın uyum içinde çalışır ve Med-INFO sistemi üzerinden veri paylaşır. Bu çifte üyelik, Akdeniz denetimlerinde tutarlı bir çıta korunmasını sağlar.",
      },
      {
        heading: "Bölgesel hazırlık ve Akdeniz ECA'sı",
        body:
          "Akdeniz limanlarına girecek gemiler, gemi yaşı, tipi ve bayrak performansına dayalı hedefleme ile karşılaşır; eksiklik sınıflandırması ve alıkoyma koşulları IMO PSC Kılavuzlarıyla uyumludur. Bölgeye özgü kritik bir gelişme, Akdeniz'in SOx Emisyon Kontrol Alanı (ECA) ilan edilmesidir: 2028'de yürürlüğe girecek bu düzenlemeyle Akdeniz'de yakıt kükürt limiti %0,10'a inecektir, dolayısıyla gemiler şimdiden yakıt ve scrubber uyumuna hazırlanmalıdır. Kuzey Afrika limanlarında yerel ek gereklilikler bulunabileceğinden, gemiler giriş öncesi bu düzenlemeleri kontrol etmeli ve Paris MoU ile koordineli CIC temalarını mürettebatla gözden geçirmelidir.",
      },
    ],
    relatedSlugs: ["psc", "paris-mou"],
    resources: [{ label: "Mediterranean MoU", href: "https://www.medmou.org/" }],
  },
  {
    slug: "vina-del-mar",
    label: "Viña del Mar Agreement – Latin Amerika PSC",
    category: "Bölgesel Düzenlemeler",
    overview: "Latin Amerika bölgesindeki liman devletlerinin PSC denetimlerini koordine etmesini sağlayan bölgesel anlaşma.",
    history: "1992'de kurulan Viña del Mar Agreement, Latin Amerika'nın ilk PSC bölgesel anlaşmasıdır. 14 üye devlet ile Güney ve Orta Amerika limanlarındaki denetimleri koordine eder. Anlaşma, Paris MoU modelinden esinlenmiştir. Bölgede denetim kapasitesi ve standardizasyon çalışmaları IMO teknik yardım programlarıyla desteklenmektedir.",
    applicability: [
      "Viña del Mar Agreement üye devlet limanlarına uğrayan tüm yabancı bayraklı gemiler",
      "14 üye devlet: Arjantin, Bolivya, Brezilya, Şili, Kolombiya, Küba, Ekvador, Honduras, Meksika, Panama, Peru, Surinam, Uruguay, Venezuela",
      "Güney Amerika, Orta Amerika ve Karayipler'deki üye devlet limanlarında",
    ],
    essentials: [
      "Risk tabanlı hedefleme ve denetim önceliklendirmesi: gemi profili ve geçmiş denetim sonuçlarına göre",
      "Eksiklik ve alıkoyma prosedürleri: IMO PSC Guidelines uyumlu",
      "CIALA (Centro de Información del Acuerdo Latinoamericano) bilgi sistemi: bölgesel denetim veri paylaşımı",
      "Bölgesel CIC kampanyaları: diğer MoU'lar ile koordineli",
      "Kapasite geliştirme: PSC denetçi eğitim programları ve teknik yardım",
      "Panama kayıtlı gemilerin yoğunluğu: Panama dünyanın en büyük gemi siciline sahip – bölgesel etkileşim yoğun",
    ],
    actions: [
      "Latin Amerika limanlarına giriş öncesi bölgesel gereklilikleri kontrol et",
      "CIC kampanya temalarına hazırlan ve mürettebatı bilgilendir",
      "Bölgesel denetim trendlerini izle: CIALA yıllık raporları",
      "Yerel düzenlemeleri araştır (ülkelere özgü ek gereklilikler olabilir)",
      "Panama bayraklı gemilerde kendi bayrak devleti denetim yükümlülüklerini de göz önünde bulundur",
    ],
    keyArticles: [
      { id: "Bölüm 2", title: "Denetim Taahhütleri", summary: "Üye devletlerin denetim hedefleri ve koordinasyon mekanizmaları." },
      { id: "Bölüm 3", title: "Denetim Prosedürleri", summary: "Denetim kapsamı, eksiklik sınıflandırması ve alıkoyma kriterleri." },
    ],
    penalties: [
      "Detention: ciddi eksikliklerde geminin alıkonması",
      "Eksiklik kapatma ve takip denetimi zorunluluğu",
      "CIALA sisteminde alıkoyma kayıtlarının paylaşılması",
    ],
    detailedSections: [
      {
        heading: "Latin Amerika'nın ilk PSC anlaşması",
        body:
          "Viña del Mar Agreement (Acuerdo Latinoamericano), Latin Amerika'nın ilk bölgesel liman devleti kontrolü anlaşmasıdır ve 14 üye devletle Güney, Orta Amerika ve Karayipler'deki denetimleri koordine eder. Paris MoU modelinden esinlenerek kurulmuş olup denetim verilerini CIALA bölgesel bilgi sistemi üzerinden paylaşır. Bölgenin kendine özgü bir dinamiği vardır: dünyanın en büyük gemi siciline sahip Panama bu coğrafyada yer alır, dolayısıyla bölgede hem liman devleti hem bayrak devleti rollerinin yoğun bir etkileşimi görülür.",
      },
      {
        heading: "Standardizasyon ve bölgesel hazırlık",
        body:
          "Anlaşma, üye devletler arasındaki denetim kapasitesi ve standardizasyonu güçlendirmek için IMO teknik yardım programlarından yararlanır; denetçi eğitimi ve ortak prosedürler bu çabanın merkezindedir. Risk tabanlı hedefleme, eksiklik sınıflandırması ve alıkoyma kriterleri IMO PSC Kılavuzlarıyla uyumludur ve diğer MoU'larla koordineli CIC kampanyaları yürütülür. Bölgeye girecek gemiler yerel düzenlemeleri kontrol etmeli, CIALA denetim trendlerini izlemeli ve özellikle Panama bayraklı gemiler kendi bayrak devleti yükümlülüklerini de göz önünde bulundurmalıdır. Alıkoyma kayıtları CIALA üzerinden tüm üyelerce görülebilir.",
      },
    ],
    relatedSlugs: ["psc"],
    resources: [{ label: "Viña del Mar Agreement", href: "https://www.vina-del-mar-agreement.org/" }],
  },
];
