export type RegulationCategory =
  | "IMO Sözleşmeleri"
  | "Emniyet Kodları"
  | "Çevresel Düzenlemeler"
  | "Denetim & Sörvey"
  | "Gemi Sertifikaları"
  | "Bölgesel Düzenlemeler";

export type RegulationItem = {
  slug: string;
  label: string;
  category: RegulationCategory;
  overview: string;
  essentials: string[];
  actions: string[];
  resources?: { label: string; href: string }[];
};

export const regulationItems: RegulationItem[] = [
  // ── IMO Sözleşmeleri ───────────────────────────────────────────────
  {
    slug: "solas",
    label: "SOLAS – Denizde Can Emniyeti",
    category: "IMO Sözleşmeleri",
    overview:
      "Uluslararası deniz taşımacılığında can emniyeti için temel gereklilikleri belirler; gemi inşası, teçhizat, operasyon ve sertifikasyon standartlarını kapsar.",
    essentials: [
      "Gemi yapısı, bölmeleme ve stabilite (Chapter II-1)",
      "Yangın güvenliği, algılama ve söndürme (Chapter II-2)",
      "Can kurtarma araçları ve düzenlemeleri (Chapter III)",
      "Radyo haberleşme ve GMDSS (Chapter IV)",
      "Seyir emniyeti teçhizatı (Chapter V)",
    ],
    actions: [
      "Yıllık, ara ve yenileme survey'lerini zamanında tamamla",
      "SOLAS sertifikalarını güncel tut ve gemide bulundur",
      "Mürettebat eğitim ve tatbikatlarını düzenli yap",
      "Teçhizat bakım kayıtlarını düzenli tut",
    ],
    resources: [
      {
        label: "IMO SOLAS sayfası",
        href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Safety-of-Life-at-Sea-(SOLAS),-1974.aspx",
      },
    ],
  },
  {
    slug: "marpol",
    label: "MARPOL – Deniz Kirliliğinin Önlenmesi",
    category: "IMO Sözleşmeleri",
    overview:
      "Gemilerden kaynaklanan deniz kirliliğinin önlenmesi için uluslararası standartları belirler; altı ek ile petrol, kimyasal, atık, çöp, hava emisyonları ve balistik su yönetimini düzenler.",
    essentials: [
      "Ek I: Petrol kirliliği (IOPP, ORB, SOPEP)",
      "Ek II: Zararlı sıvı maddeler (NLS, Cargo Record Book)",
      "Ek IV: Kanalizasyon (sewage treatment, discharge criteria)",
      "Ek V: Çöp yönetimi (Garbage Record Book, discharge restrictions)",
      "Ek VI: Hava kirliliği (SOx, NOx, EEXI, CII, SEEMP)",
    ],
    actions: [
      "ORB, Cargo Record Book ve Garbage Record Book kayıtlarını düzenli tut",
      "IOPP ve IAPP sertifikalarını güncel tut",
      "Yakıt numuneleri ve BDN'leri sakla",
      "SEEMP'i uygula ve CII performansını izle",
    ],
    resources: [
      {
        label: "IMO MARPOL sayfası",
        href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Prevention-of-Pollution-from-Ships-(MARPOL).aspx",
      },
    ],
  },
  {
    slug: "stcw",
    label: "STCW – Gemi Adamları Eğitim Standardı",
    category: "IMO Sözleşmeleri",
    overview:
      "Gemi adamlarının eğitim, belgelendirme ve vardiya tutma standartlarını düzenler; yeterlilik sertifikaları, yenileme gereklilikleri ve dinlenme saatlerini kapsar.",
    essentials: [
      "Yeterlilik sertifikaları ve yenileme gereklilikleri",
      "Zorunlu eğitimler: BST, ARPA, ECDIS, tanker endorsements",
      "Vardiya düzeni ve dinlenme saatleri (minimum 10 saat/24 saat)",
      "Mürettebat kayıtları ve Safe Manning Document uyumu",
    ],
    actions: [
      "Sertifika geçerlilik tarihlerini takip et ve yenileme planla",
      "Zorunlu eğitimleri zamanında tamamla",
      "Dinlenme saatlerini kaydet ve uyumu doğrula",
      "Safe Manning Document ile mürettebat sayısını eşleştir",
    ],
    resources: [
      {
        label: "IMO STCW sayfası",
        href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-on-Standards-of-Training,-Certification-and-Watchkeeping-for-Seafarers-(STCW).aspx",
      },
    ],
  },
  {
    slug: "mlc",
    label: "MLC 2006 – Denizcilik Çalışma Sözleşmesi",
    category: "IMO Sözleşmeleri",
    overview:
      "Gemi adamlarının çalışma ve yaşam koşullarını düzenler; sözleşme hakları, ücret, çalışma saatleri, konaklama, sağlık ve sosyal güvenlik standartlarını kapsar.",
    essentials: [
      "Çalışma sözleşmesi ve ücret ödeme gereklilikleri",
      "Çalışma ve dinlenme saatleri (max. 14 saat/gün, 72 saat/hafta)",
      "Konaklama, yemek ve rekreasyon standartları",
      "Sağlık, tıbbi bakım ve repatriation hakları",
    ],
    actions: [
      "MLC sertifikası ve DMLC'yi güncel tut",
      "Çalışma saatlerini kaydet ve limitlere uy",
      "Konaklama ve yemek standartlarını düzenli denetle",
      "Mürettebat şikayetlerini kaydet ve çöz",
    ],
    resources: [
      {
        label: "ILO MLC 2006",
        href: "https://www.ilo.org/global/standards/maritime-labour-convention/lang--en/index.htm",
      },
    ],
  },
  {
    slug: "bwm",
    label: "BWM – Balast Suyu Yönetimi",
    category: "IMO Sözleşmeleri",
    overview:
      "Balast suyu ile taşınan zararlı organizmaların yayılmasını önlemek için arıtma ve yönetim standartlarını belirler; BWMS kurulumu ve işletme gerekliliklerini kapsar.",
    essentials: [
      "D-2 standardı: arıtılmış balast suyu deşarjı",
      "BWMS kurulumu, işletme ve bakım gereklilikleri",
      "Balast Suyu Kayıt Defteri (BWRB) tutma",
      "Commissioning test ve yıllık survey",
    ],
    actions: [
      "BWMS'yi düzenli olarak çalıştır ve bakımını yap",
      "BWRB kayıtlarını her balast operasyonunda tamamla",
      "UV lamba ve filtre değişimlerini zamanında yap",
      "Yıllık survey ve commissioning test'i planla",
    ],
    resources: [
      {
        label: "IMO BWM Convention",
        href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Control-and-Management-of-Ships'-Ballast-Water-and-Sediments-(BWM).aspx",
      },
    ],
  },
  {
    slug: "llc",
    label: "LLC – Yük Hattı Sözleşmesi",
    category: "IMO Sözleşmeleri",
    overview:
      "Gemilerin güvenli yükleme limitlerini belirleyen yük hattı işaretleri ve freeboard hesaplamalarını düzenler; mevsimsel ve bölgesel yükleme sınırlarını kapsar.",
    essentials: [
      "Freeboard hesaplaması ve yük hattı işaretleri",
      "Mevsimsel zonlar ve yükleme limitleri",
      "Yük Hattı Sertifikası ve survey gereklilikleri",
      "Hava ve su geçirmezlik kontrolleri",
    ],
    actions: [
      "Yükleme öncesi yük hattı limitlerini kontrol et",
      "Mevsimsel zon değişikliklerinde yükleme planını güncelle",
      "Yük Hattı Sertifikasını güncel tut",
      "Hava ve su geçirmez kapakları düzenli denetle",
    ],
    resources: [
      {
        label: "IMO Load Lines Convention",
        href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-on-Load-Lines.aspx",
      },
    ],
  },
  {
    slug: "colreg",
    label: "COLREG – Denizde Çatışmayı Önleme",
    category: "IMO Sözleşmeleri",
    overview:
      "Denizde gemilerin birbirlerinden kaçınma kurallarını, seyir ışıkları, şekil ve ses işaretlerini düzenler; tüm deniz araçları için zorunlu uyum gerektirir.",
    essentials: [
      "Seyir kuralları: karşılaşma, geçiş, yetişme durumları",
      "Seyir ışıkları ve şekil işaretleri",
      "Ses ve ışık sinyalleri",
      "Dar kanal, trafik ayrım şemaları ve kısıtlı görüş kuralları",
    ],
    actions: [
      "Seyir ışıklarını günlük kontrol et ve kaydet",
      "Dar kanal ve TSS geçişlerinde COLREG kurallarına uy",
      "Kısıtlı görüşte sis sinyali ver ve hızı azalt",
      "Mürettebata COLREG kurallarını düzenli hatırlat",
    ],
    resources: [
      {
        label: "IMO COLREG",
        href: "https://www.imo.org/en/About/Conventions/Pages/COLREG.aspx",
      },
    ],
  },

  // ── Emniyet Kodları ────────────────────────────────────────────────
  {
    slug: "ism-code",
    label: "ISM Code – Uluslararası Emniyet Yönetimi",
    category: "Emniyet Kodları",
    overview:
      "Gemi ve şirket düzeyinde emniyet yönetim sistemi (SMS) kurulması, uygulanması ve sürekli iyileştirilmesi için çerçeve sağlar.",
    essentials: [
      "Emniyet ve çevre politikası",
      "Şirket ve gemi sorumlulukları",
      "Acil durum hazırlığı ve tatbikatlar",
      "İç ve dış denetimler (internal/external audit)",
    ],
    actions: [
      "SMS prosedürlerini güncel tut ve mürettebata eğit",
      "Acil durum tatbikatlarını düzenli yap ve kaydet",
      "İç denetimleri planla ve uygunsuzlukları kapat",
      "DOC ve SMC sertifikalarını güncel tut",
    ],
    resources: [
      {
        label: "IMO ISM Code",
        href: "https://www.imo.org/en/OurWork/HumanElement/Pages/ISMCode.aspx",
      },
    ],
  },
  {
    slug: "isps-code",
    label: "ISPS Code – Gemi ve Liman Tesisi Güvenliği",
    category: "Emniyet Kodları",
    overview:
      "Deniz güvenliği tehditlerine karşı gemi ve liman tesislerinin korunması için risk değerlendirmesi, güvenlik planları ve prosedürler belirler.",
    essentials: [
      "Gemi Güvenlik Planı (SSP) ve güvenlik seviyeleri (1-2-3)",
      "Gemi Güvenlik Görevlisi (SSO) ve Şirket Güvenlik Görevlisi (CSO)",
      "Güvenlik ekipmanları: CCTV, alarm, erişim kontrol",
      "Güvenlik tatbikatları ve denetimler",
    ],
    actions: [
      "SSP'yi güncel tut ve mürettebata eğit",
      "Güvenlik seviyesi değişimlerinde prosedürleri uygula",
      "Güvenlik ekipmanlarını düzenli test et",
      "ISSC sertifikasını güncel tut",
    ],
    resources: [
      {
        label: "IMO ISPS Code",
        href: "https://www.imo.org/en/OurWork/Security/Pages/ISPS-Code.aspx",
      },
    ],
  },
  {
    slug: "imsbc-code",
    label: "IMSBC Code – Dökme Katı Yük Kuralları",
    category: "Emniyet Kodları",
    overview:
      "Dökme katı yükün güvenli taşınması için sınıflandırma, istif, trimming ve özel önlemler belirler; liquefy olabilen ve kimyasal tehlike taşıyan yükleri kapsar.",
    essentials: [
      "Yük grupları: A (liquefy), B (kimyasal tehlike), C (diğer)",
      "Nem limiti ve TML (Transportable Moisture Limit)",
      "Trimming gereklilikleri ve istif faktörü",
      "Özel önlemler: havalandırma, gaz ölçümü, yangın riski",
    ],
    actions: [
      "Yük bildirimini (cargo declaration) kontrol et",
      "TML ve nem testlerini doğrula",
      "Ambar havalandırmasını ve gaz ölçümlerini düzenli yap",
      "Trimming gerekliliklerine uy",
    ],
    resources: [
      {
        label: "IMO IMSBC Code",
        href: "https://www.imo.org/en/Publications/Pages/IMSBC-Code.aspx",
      },
    ],
  },
  {
    slug: "imdg-code",
    label: "IMDG Code – Tehlikeli Madde Taşımacılığı",
    category: "Emniyet Kodları",
    overview:
      "Tehlikeli maddelerin deniz yoluyla taşınmasında sınıflandırma, ambalajlama, işaretleme, belgelendirme ve ayrım kurallarını düzenler.",
    essentials: [
      "9 tehlike sınıfı ve alt sınıflar",
      "Ambalajlama, işaretleme ve etiketleme",
      "Ayrım (segregation) gereklilikleri",
      "Belgelendirme: DG manifest, container packing certificate",
    ],
    actions: [
      "DG manifest ve packing certificate'ı kontrol et",
      "Ayrım kurallarına göre istif planı yap",
      "Acil durum prosedürlerini (EmS) hazır bulundur",
      "Mürettebata tehlikeli madde eğitimi ver",
    ],
    resources: [
      {
        label: "IMO IMDG Code",
        href: "https://www.imo.org/en/Publications/Pages/IMDG-Code.aspx",
      },
    ],
  },
  {
    slug: "igs-code",
    label: "IGS Code – Inert Gaz Sistemleri",
    category: "Emniyet Kodları",
    overview:
      "Tanker gemilerinde kargo tanklarının inert gaz ile korunması için sistem tasarımı, işletme ve bakım standartlarını belirler.",
    essentials: [
      "Oksijen seviyesi: max. %8 (operasyon), %5 (yükleme/boşaltma)",
      "IG üretimi: flue gas veya inert gas generator",
      "Sistem bileşenleri: scrubber, blower, deck seal",
      "İzleme ve alarm sistemleri",
    ],
    actions: [
      "IG sistemi performansını sürekli izle",
      "Oksijen seviyesini düzenli ölç ve kaydet",
      "Scrubber ve blower bakımlarını zamanında yap",
      "Deck seal su seviyesini kontrol et",
    ],
    resources: [
      {
        label: "IMO IGS Code",
        href: "https://www.imo.org/en/OurWork/Safety/Pages/IGS-Code.aspx",
      },
    ],
  },
  {
    slug: "igf-code",
    label: "IGF Code – Gaz Yakıtlı Gemiler",
    category: "Emniyet Kodları",
    overview:
      "LNG ve diğer düşük parlama noktalı gazlarla çalışan gemilerin tasarım, inşa ve işletme güvenliği için risk tabanlı yaklaşım ve teknik standartlar sağlar.",
    essentials: [
      "Risk değerlendirmesi ve alternatif tasarım onayı",
      "Yakıt tankı, boru hattı ve bunkering düzenleri",
      "Gaz algılama, havalandırma ve acil durum sistemleri",
      "Mürettebat eğitimi ve operasyon prosedürleri",
    ],
    actions: [
      "Gaz algılama sistemlerini günlük test et",
      "Bunkering prosedürlerini checklist ile uygula",
      "Acil durum tatbikatlarını düzenli yap",
      "Mürettebata gaz yakıt güvenliği eğitimi ver",
    ],
    resources: [
      {
        label: "IMO IGF Code",
        href: "https://www.imo.org/en/OurWork/Safety/Pages/IGF-Code.aspx",
      },
    ],
  },
  {
    slug: "bc-code",
    label: "BC Code – Dökme Yük Gemileri",
    category: "Emniyet Kodları",
    overview:
      "Dökme yük gemilerinin yapısal güvenliği, yükleme/boşaltma prosedürleri ve stabilite için ek gereklilikler belirler.",
    essentials: [
      "Yapısal dayanım ve yükleme sınırlamaları",
      "Loading instrument ve stress monitoring",
      "Ambar erişimi ve havalandırma",
      "Yükleme/boşaltma planı ve onayı",
    ],
    actions: [
      "Loading instrument ile stres değerlerini izle",
      "Yükleme planını kaptan ve terminal ile onayla",
      "Ambar havalandırmasını düzenli kontrol et",
      "Yapısal hasarları düzenli denetle",
    ],
    resources: [
      {
        label: "IMO BC Code",
        href: "https://www.imo.org/en/OurWork/Safety/Pages/BulkCarriers.aspx",
      },
    ],
  },
  {
    slug: "ics-code",
    label: "ICS Code – Kimyasal Tankerler",
    category: "Emniyet Kodları",
    overview:
      "Kimyasal tanker gemilerinin tasarım, inşa ve tehlikeli kimyasal madde taşımacılığı için güvenlik standartlarını düzenler.",
    essentials: [
      "Gemi tipi: 1, 2, 3 (tehlike seviyesine göre)",
      "Kargo tank malzemesi ve kaplama gereklilikleri",
      "Kargo transfer, havalandırma ve gaz freeing",
      "P&A Manual ve cargo compatibility",
    ],
    actions: [
      "P&A Manual'i güncel tut ve mürettebata eğit",
      "Cargo compatibility kontrolü yap",
      "Tank kaplama durumunu düzenli denetle",
      "Gaz freeing prosedürlerini uygula",
    ],
    resources: [
      {
        label: "IMO IBC Code",
        href: "https://www.imo.org/en/Publications/Pages/IBC-Code.aspx",
      },
    ],
  },
  {
    slug: "igc-code",
    label: "IGC Code – Gaz Tankerleri",
    category: "Emniyet Kodları",
    overview:
      "Sıvılaştırılmış gaz (LNG, LPG vb.) taşıyan tankerlerin tasarım, inşa ve işletme güvenliği için kapsamlı teknik standartlar sağlar.",
    essentials: [
      "Tank tipi: bağımsız, membran, integral",
      "Kargo sıcaklık ve basınç kontrol sistemleri",
      "Gaz algılama, havalandırma ve acil durum prosedürleri",
      "Mürettebat eğitimi ve operasyon limitleri",
    ],
    actions: [
      "Kargo sıcaklık ve basıncını sürekli izle",
      "Gaz algılama sistemlerini günlük test et",
      "Acil durum prosedürlerini düzenli tatbikat et",
      "Tank muayene ve bakımlarını zamanında yap",
    ],
    resources: [
      {
        label: "IMO IGC Code",
        href: "https://www.imo.org/en/Publications/Pages/IGC-Code.aspx",
      },
    ],
  },

  // ── Çevresel Düzenlemeler ──────────────────────────────────────────
  {
    slug: "eexi",
    label: "EEXI – Enerji Verimliliği Tasarım İndeksi",
    category: "Çevresel Düzenlemeler",
    overview:
      "Mevcut gemilerin enerji verimliliğini değerlendiren teknik indeks; 2023'ten itibaren zorunlu, geminin CO₂ emisyon performansını ölçer.",
    essentials: [
      "EEXI hesaplaması ve attained/required EEXI karşılaştırması",
      "Teknik ve operasyonel iyileştirme seçenekleri",
      "EEXI Technical File hazırlama ve onay",
      "İlk survey sonrası sertifikasyon",
    ],
    actions: [
      "EEXI hesaplamasını klas/bayrak ile doğrula",
      "Gerekirse EPL (Engine Power Limitation) uygula",
      "EEXI Technical File'ı hazırla ve gemide bulundur",
      "IAPP sertifikasına EEXI onayını ekle",
    ],
    resources: [
      {
        label: "IMO EEXI rehberi",
        href: "https://www.imo.org/en/OurWork/Environment/Pages/EEXI.aspx",
      },
    ],
  },
  {
    slug: "cii",
    label: "CII – Karbon Yoğunluğu Göstergesi",
    category: "Çevresel Düzenlemeler",
    overview:
      "Geminin yıllık operasyonel karbon verimliliğini ölçen gösterge; A-E arası derecelendirme ile performans izlenir, düşük performans iyileştirme planı gerektirir.",
    essentials: [
      "Yıllık CII hesaplaması: gCO₂/(dwt·mil)",
      "Rating: A (en iyi) – E (en kötü)",
      "D veya E rating için SEEMP iyileştirme planı",
      "Yıllık raporlama ve doğrulama",
    ],
    actions: [
      "Yakıt tüketimi ve mesafe verilerini düzenli kaydet",
      "CII performansını aylık izle ve tahmin et",
      "Düşük performansta SEEMP iyileştirme planı hazırla",
      "Yıllık CII raporunu bayrak devletine sun",
    ],
    resources: [
      {
        label: "IMO CII rehberi",
        href: "https://www.imo.org/en/OurWork/Environment/Pages/CII.aspx",
      },
    ],
  },
  {
    slug: "eu-ets",
    label: "EU ETS – AB Emisyon Ticaret Sistemi",
    category: "Çevresel Düzenlemeler",
    overview:
      "AB limanlarına uğrayan gemilerin CO₂ emisyonlarını kapsayan karbon fiyatlandırma mekanizması; 2024'ten itibaren kademeli uygulama başlar.",
    essentials: [
      "Kapsam: AB limanları arası ve AB-üçüncü ülke seferleri",
      "İzleme, raporlama ve doğrulama (MRV) gereklilikleri",
      "Emisyon kotası (allowance) satın alma ve teslim",
      "Kademeli uygulama: %40 (2024), %70 (2025), %100 (2026)",
    ],
    actions: [
      "MRV sistemini kur ve emisyon verilerini kaydet",
      "Doğrulayıcı kuruluş ile yıllık doğrulama yap",
      "Emisyon kotası ihtiyacını hesapla ve satın al",
      "Teslim tarihlerine (30 Nisan) uyum sağla",
    ],
    resources: [
      {
        label: "EU ETS denizcilik",
        href: "https://climate.ec.europa.eu/eu-action/transport/reducing-emissions-shipping-sector_en",
      },
    ],
  },
  {
    slug: "fueleu-maritime",
    label: "FuelEU Maritime – AB Yakıt Standardı",
    category: "Çevresel Düzenlemeler",
    overview:
      "AB limanlarına uğrayan gemilerin kullandığı yakıtların sera gazı yoğunluğunu kademeli olarak azaltmayı hedefleyen AB düzenlemesi.",
    essentials: [
      "GHG yoğunluğu limitleri: 2025'ten itibaren kademeli azalma",
      "Alternatif yakıt kullanımı teşviki",
      "Liman elektriği (OPS) kullanım zorunluluğu",
      "Uyumsuzluk cezaları ve compliance balance",
    ],
    actions: [
      "Yakıt GHG yoğunluğunu hesapla ve limitle karşılaştır",
      "Alternatif yakıt ve OPS kullanım planı yap",
      "Compliance balance'ı izle",
      "Yıllık raporlama ve doğrulama yap",
    ],
    resources: [
      {
        label: "FuelEU Maritime",
        href: "https://climate.ec.europa.eu/eu-action/transport/reducing-emissions-shipping-sector/fueleu-maritime_en",
      },
    ],
  },
  {
    slug: "imo-dcs",
    label: "IMO DCS – Veri Toplama Sistemi",
    category: "Çevresel Düzenlemeler",
    overview:
      "5000 GT üzeri gemilerin yakıt tüketimi ve CO₂ emisyon verilerini toplama ve raporlama sistemi; MARPOL Ek VI kapsamında zorunludur.",
    essentials: [
      "Yıllık yakıt tüketimi, mesafe ve çalışma saati verisi",
      "Bayrak devletine raporlama (31 Mart)",
      "IMO veri tabanına aktarım ve şeffaflık",
      "SEEMP ile entegrasyon",
    ],
    actions: [
      "Yakıt tüketimi verilerini düzenli kaydet",
      "Yıllık DCS raporunu hazırla ve bayrak devletine sun",
      "SEEMP'te DCS verilerini kullan",
      "Veri kalitesini doğrula",
    ],
    resources: [
      {
        label: "IMO DCS",
        href: "https://www.imo.org/en/OurWork/Environment/Pages/Data-Collection-System.aspx",
      },
    ],
  },
  {
    slug: "imo-2020",
    label: "IMO 2020 – Kükürt Limiti",
    category: "Çevresel Düzenlemeler",
    overview:
      "Gemi yakıtlarındaki kükürt içeriğini %0.50 m/m ile sınırlayan küresel düzenleme; ECA bölgelerinde %0.10 m/m limiti geçerlidir.",
    essentials: [
      "Küresel limit: %0.50 m/m SOx",
      "ECA bölgeleri: %0.10 m/m SOx",
      "Uyum seçenekleri: LSFO, MGO veya EGCS (scrubber)",
      "Yakıt numune ve BDN saklama",
    ],
    actions: [
      "Yakıt kükürt içeriğini BDN ile doğrula",
      "ECA giriş/çıkışında yakıt değişimini kaydet",
      "EGCS kullanımında emisyon verilerini izle",
      "Yakıt numunelerini 12 ay sakla",
    ],
    resources: [
      {
        label: "IMO 2020 sulphur limit",
        href: "https://www.imo.org/en/MediaCentre/HotTopics/Pages/Sulphur-2020.aspx",
      },
    ],
  },

  // ── Denetim & Sörvey ───────────────────────────────────────────────
  {
    slug: "psc",
    label: "PSC – Liman Devleti Kontrolü",
    category: "Denetim & Sörvey",
    overview:
      "Liman devletlerinin yabancı bayraklı gemileri uluslararası standartlara uyum açısından denetlemesi; eksiklik ve alıkoyma riski taşır.",
    essentials: [
      "Denetim kapsamı: sertifikalar, teçhizat, mürettebat, operasyon",
      "Eksiklik kodları ve alıkoyma kriterleri",
      "Bölgesel MoU'lar: Paris, Tokyo, USCG vb.",
      "Risk tabanlı hedefleme: HRS, SRS, LRS",
    ],
    actions: [
      "Tüm sertifikaları güncel ve gemide bulundur",
      "Teçhizat bakım kayıtlarını düzenli tut",
      "PSC denetimi öncesi iç denetim yap",
      "Eksiklikleri hızlı kapat ve kanıtla",
    ],
    resources: [
      {
        label: "Paris MoU",
        href: "https://www.parismou.org/",
      },
      {
        label: "Tokyo MoU",
        href: "https://www.tokyo-mou.org/",
      },
    ],
  },
  {
    slug: "flag-state",
    label: "Flag State Inspection – Bayrak Devleti Denetimi",
    category: "Denetim & Sörvey",
    overview:
      "Bayrak devletinin kendi gemilerini uluslararası sözleşmelere uyum açısından denetlemesi; yetkilendirme, survey ve sertifikasyon süreçlerini kapsar.",
    essentials: [
      "Bayrak devleti yetkilendirmesi ve RO (Recognized Organization) görevlendirmesi",
      "Zorunlu survey'ler: yıllık, ara, yenileme, özel",
      "Sertifika düzenleme ve geçerlilik kontrolleri",
      "Bayrak devleti denetim programları",
    ],
    actions: [
      "Survey tarihlerini takip et ve zamanında planla",
      "RO ile koordinasyon sağla",
      "Bayrak devleti gerekliliklerini güncel takip et",
      "Denetim bulgularını hızlı kapat",
    ],
    resources: [
      {
        label: "IMO Flag State Implementation",
        href: "https://www.imo.org/en/OurWork/IIIS/Pages/Flag%20State%20Implementation.aspx",
      },
    ],
  },
  {
    slug: "class-survey",
    label: "Class Survey – Klas Denetimi",
    category: "Denetim & Sörvey",
    overview:
      "Klas kuruluşunun geminin yapısal ve mekanik bütünlüğünü değerlendirmesi; klas notasyonu ve sertifikasyonu için gereklidir.",
    essentials: [
      "Yıllık, ara ve özel survey'ler",
      "Klas notasyonları ve ek notlar",
      "Yapısal muayene ve kalınlık ölçümleri",
      "Makine ve elektrik tesisleri denetimi",
    ],
    actions: [
      "Survey tarihlerini klas ile koordine et",
      "Kalınlık ölçüm raporlarını hazırla",
      "Klas bulgularını zamanında kapat",
      "Klas sertifikalarını güncel tut",
    ],
    resources: [
      {
        label: "IACS",
        href: "https://iacs.org.uk/",
      },
    ],
  },
  {
    slug: "vetting",
    label: "Vetting Inspection – Kiralayan Denetimi",
    category: "Denetim & Sörvey",
    overview:
      "Petrol şirketleri ve charterer'ların gemileri SIRE, CDI, OVID gibi standartlara göre denetlemesi; ticari kabul için kritik öneme sahiptir.",
    essentials: [
      "SIRE (Ship Inspection Report Programme) – petrol tankerleri",
      "CDI (Chemical Distribution Institute) – kimyasal tankerler",
      "OVID (OCIMF Vessel Inspection Database)",
      "Denetim kapsamı: yapısal, operasyonel, dokümantasyon",
    ],
    actions: [
      "Vetting denetimi öncesi iç denetim yap",
      "Tüm dokümantasyonu güncel ve erişilebilir tut",
      "Mürettebatı vetting prosedürleri konusunda eğit",
      "Gözlemleri (observations) hızlı kapat",
    ],
    resources: [
      {
        label: "OCIMF SIRE",
        href: "https://www.ocimf.org/sire",
      },
    ],
  },
  {
    slug: "rightship",
    label: "RightShip – Gemi Değerlendirme",
    category: "Denetim & Sörvey",
    overview:
      "Dökme yük gemilerinin emniyet ve çevre performansını değerlendiren bağımsız platform; charterer kabulü için yaygın kullanılır.",
    essentials: [
      "Safety Score: A-G arası derecelendirme",
      "GHG Rating: A-G arası emisyon performansı",
      "Vetting denetimleri ve raporlama",
      "Charterer kabul kriterleri",
    ],
    actions: [
      "RightShip Safety Score'u düzenli izle",
      "GHG Rating'i iyileştirmek için yakıt verimliliği önlemleri al",
      "RightShip denetimlerine hazırlıklı ol",
      "Düşük skorlarda iyileştirme planı yap",
    ],
    resources: [
      {
        label: "RightShip",
        href: "https://www.rightship.com/",
      },
    ],
  },

  // ── Gemi Sertifikaları ─────────────────────────────────────────────
  {
    slug: "smc",
    label: "SMC – Emniyet Yönetim Sertifikası",
    category: "Gemi Sertifikaları",
    overview:
      "ISM Code kapsamında geminin emniyet yönetim sistemini uyguladığını belgeleyen sertifika; DOC ile birlikte zorunludur.",
    essentials: [
      "İlk sertifikasyon ve yenileme (5 yıl)",
      "Ara doğrulama (2.5-3 yıl arası)",
      "SMS uygulaması ve iç denetim kayıtları",
      "Uygunsuzlukların kapatılması",
    ],
    actions: [
      "SMS prosedürlerini güncel tut",
      "İç denetimleri düzenli yap",
      "Ara doğrulama tarihini takip et",
      "Dış denetim bulgularını hızlı kapat",
    ],
    resources: [
      {
        label: "ISM Code",
        href: "https://www.imo.org/en/OurWork/HumanElement/Pages/ISMCode.aspx",
      },
    ],
  },
  {
    slug: "issc",
    label: "ISSC – Gemi Güvenlik Sertifikası",
    category: "Gemi Sertifikaları",
    overview:
      "ISPS Code kapsamında geminin güvenlik önlemlerini uyguladığını belgeleyen sertifika; SSP uyumu ve güvenlik ekipmanı gerektirir.",
    essentials: [
      "İlk sertifikasyon ve yenileme (5 yıl)",
      "Ara doğrulama (2.5-3 yıl arası)",
      "SSP uygulaması ve güvenlik tatbikatları",
      "Güvenlik ekipmanı bakım kayıtları",
    ],
    actions: [
      "SSP'yi güncel tut ve mürettebata eğit",
      "Güvenlik ekipmanlarını düzenli test et",
      "Ara doğrulama tarihini takip et",
      "Güvenlik tatbikatlarını kaydet",
    ],
    resources: [
      {
        label: "ISPS Code",
        href: "https://www.imo.org/en/OurWork/Security/Pages/ISPS-Code.aspx",
      },
    ],
  },
  {
    slug: "mlc-cert",
    label: "MLC Certificate – Denizcilik Çalışma Sertifikası",
    category: "Gemi Sertifikaları",
    overview:
      "MLC 2006 kapsamında geminin çalışma ve yaşam koşullarını sağladığını belgeleyen sertifika; DMLC ile birlikte zorunludur.",
    essentials: [
      "İlk sertifikasyon ve yenileme (5 yıl)",
      "Ara denetim (2.5-3 yıl arası)",
      "DMLC Part I ve Part II uyumu",
      "Çalışma koşulları, konaklama ve sağlık standartları",
    ],
    actions: [
      "DMLC'yi güncel tut",
      "Çalışma saatlerini kaydet ve limitlere uy",
      "Konaklama ve yemek standartlarını denetle",
      "Ara denetim tarihini takip et",
    ],
    resources: [
      {
        label: "MLC 2006",
        href: "https://www.ilo.org/global/standards/maritime-labour-convention/lang--en/index.htm",
      },
    ],
  },
  {
    slug: "iopp-cert",
    label: "IOPP Certificate – Petrol Kirliliği Önleme Belgesi",
    category: "Gemi Sertifikaları",
    overview:
      "MARPOL Ek I kapsamında geminin petrol kirliliği önleme ekipmanı ve prosedürlerini belgeleyen sertifika.",
    essentials: [
      "İlk sertifikasyon ve yenileme (5 yıl)",
      "Yıllık ve ara survey",
      "ODM, OWS, bilge alarm ve SOPEP gereklilikleri",
      "ORB kayıt tutma",
    ],
    actions: [
      "OWS ve bilge alarm testlerini düzenli yap",
      "ORB kayıtlarını eksiksiz tut",
      "SOPEP'i güncel tut ve tatbikat yap",
      "Survey tarihlerini takip et",
    ],
    resources: [
      {
        label: "MARPOL Ek I",
        href: "https://www.imo.org/en/OurWork/Environment/Pages/OilPollution.aspx",
      },
    ],
  },

  // ── Bölgesel Düzenlemeler ──────────────────────────────────────────
  {
    slug: "paris-mou",
    label: "Paris MoU – Avrupa PSC",
    category: "Bölgesel Düzenlemeler",
    overview:
      "Avrupa ve Kuzey Atlantik limanlarında PSC denetimlerini koordine eden bölgesel mutabakat zaptı; risk tabanlı hedefleme ve CIC kampanyaları yürütür.",
    essentials: [
      "Risk profili: HRS, SRS, LRS",
      "Denetim sıklığı ve öncelik",
      "CIC (Concentrated Inspection Campaign) temaları",
      "Eksiklik ve alıkoyma prosedürleri",
    ],
    actions: [
      "Gemi risk profilini düzenli kontrol et",
      "CIC kampanya temalarını takip et ve hazırlan",
      "Tüm sertifikaları güncel tut",
      "Eksiklikleri hızlı kapat",
    ],
    resources: [
      {
        label: "Paris MoU",
        href: "https://www.parismou.org/",
      },
    ],
  },
  {
    slug: "tokyo-mou",
    label: "Tokyo MoU – Asya-Pasifik PSC",
    category: "Bölgesel Düzenlemeler",
    overview:
      "Asya-Pasifik bölgesindeki liman devletleri arasında PSC koordinasyonunu sağlayan bölgesel mutabakat zaptı.",
    essentials: [
      "Risk tabanlı hedefleme sistemi",
      "Denetim standartları ve prosedürleri",
      "Bölgesel CIC kampanyaları",
      "Veri paylaşımı ve istatistikler",
    ],
    actions: [
      "Tokyo MoU bölgesine giriş öncesi hazırlık yap",
      "CIC kampanya temalarını mürettebatla gözden geçir",
      "Denetim trendlerini izle",
      "Eksiklik kapatma kanıtlarını hazır tut",
    ],
    resources: [
      {
        label: "Tokyo MoU",
        href: "https://www.tokyo-mou.org/",
      },
    ],
  },
  {
    slug: "uscg",
    label: "USCG – ABD Sahil Güvenlik Denetimleri",
    category: "Bölgesel Düzenlemeler",
    overview:
      "ABD limanlarında USCG tarafından yapılan kapsamlı denetimler; QUALSHIP 21 programı ve sıkı uyum gereklilikleri içerir.",
    essentials: [
      "QUALSHIP 21 programı ve avantajları",
      "Denetim kapsamı: sertifikalar, teçhizat, operasyon, mürettebat",
      "COI (Certificate of Inspection) gereklilikleri",
      "Eksiklik ve alıkoyma prosedürleri",
    ],
    actions: [
      "QUALSHIP 21 kriterlerini karşılamaya çalış",
      "ABD'ye giriş öncesi kapsamlı iç denetim yap",
      "Tüm dokümantasyonu hazır tut",
      "USCG gerekliliklerini güncel takip et",
    ],
    resources: [
      {
        label: "USCG",
        href: "https://www.dco.uscg.mil/",
      },
    ],
  },
  {
    slug: "riyadh-mou",
    label: "Riyadh MoU – Körfez PSC",
    category: "Bölgesel Düzenlemeler",
    overview:
      "Basra Körfezi ve Kızıldeniz bölgesindeki liman devletleri arasında PSC koordinasyonunu sağlayan bölgesel mutabakat zaptı.",
    essentials: [
      "Denetim standartları ve prosedürleri",
      "Eksiklik sınıflandırması ve raporlama",
      "Bölgesel işbirliği ve veri paylaşımı",
      "CIC kampanyaları",
    ],
    actions: [
      "Körfez bölgesine giriş öncesi hazırlık yap",
      "Yerel gereklilikleri kontrol et",
      "CIC kampanya temalarını takip et",
      "Denetim bulgularını hızlı kapat",
    ],
    resources: [
      {
        label: "Riyadh MoU",
        href: "https://www.riyadhmou.org/",
      },
    ],
  },
  {
    slug: "black-sea-mou",
    label: "Black Sea MoU – Karadeniz PSC",
    category: "Bölgesel Düzenlemeler",
    overview:
      "Karadeniz limanlarındaki PSC denetimlerini koordine eder; risk temelli denetim ve ortak kampanyalar yürütür.",
    essentials: [
      "Hedefleme kriterleri ve kampanya duyuruları",
      "Eksiklik, alıkoyma ve raporlama süreçleri",
      "Veri paylaşımı ve istatistiksel performans göstergeleri",
    ],
    actions: [
      "Karadeniz limanlarına girmeden CIC temalarını mürettebatla gözden geçir",
      "Bulgu kapatma kanıtlarını bayrak ve RO ile paylaş",
      "Bölgesel raporlama portalı kayıtlarını doğrula",
    ],
    resources: [
      {
        label: "Black Sea MoU",
        href: "https://www.bsmou.org/",
      },
    ],
  },

  // ── IMO Sözleşmeleri (ek) ──────────────────────────────────────────
  {
    slug: "itc-69",
    label: "ITC 69 – Tonaj Ölçümü Sözleşmesi",
    category: "IMO Sözleşmeleri",
    overview: "Gemilerin brüt ve net tonajlarının evrensel ve tutarlı biçimde ölçülmesi için kurallar koyar; liman harçları, güvenlik gereklilikleri ve manning hesaplamalarına temel oluşturur.",
    essentials: ["Brüt tonaj (GT) ve net tonaj (NT) hesaplama formülleri", "Kapalı hacimlerin tanımı ve istisnaları", "Tonaj sertifikasının geçerliliği ve yenileme koşulları"],
    actions: ["Yapısal modifikasyon sonrası tonaj yeniden hesaplamasını talep et", "Tonaj sertifikası ile manning ve emniyet gerekliliklerini karşılaştır", "Liman harç hesaplarında GT/NT doğrulaması yap"],
    resources: [{ label: "ITC 69 bilgi sayfası", href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-on-Tonnage-Measurement-of-Ships.aspx" }],
  },
  {
    slug: "sar-convention",
    label: "SAR – Arama ve Kurtarma Sözleşmesi",
    category: "IMO Sözleşmeleri",
    overview: "Denizde arama ve kurtarma operasyonlarının koordinasyonunu, SRR bölgelerini ve MRCC işbirliği çerçevesini düzenler.",
    essentials: ["SRR (Search and Rescue Region) sınırları ve sorumluluklar", "MRCC/MRSC koordinasyon ve haberleşme prosedürleri", "SAR planları, tatbikatlar ve kaynak paylaşımı"],
    actions: ["Seyir planında geçilen SRR'lerin MRCC iletişim bilgilerini hazırla", "SAR tatbikatlarını yılda en az bir kez gerçekleştir", "GMDSS cihazlarının SAR alarm fonksiyonlarını periyodik test et"],
    resources: [{ label: "SAR Convention", href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-on-Maritime-Search-and-Rescue-(SAR).aspx" }],
  },
  {
    slug: "fal-convention",
    label: "FAL – Deniz Trafiğinin Kolaylaştırılması",
    category: "IMO Sözleşmeleri",
    overview: "Gemilerin limanlara giriş/çıkışında gereken belge ve prosedürleri basitleştirerek uluslararası deniz ticaretini kolaylaştırır.",
    essentials: ["FAL formları (1–7) ve elektronik veri değişimi", "Ön bildirim gereklilikleri ve liman prosedürleri", "Kaçak yolcu ve sığınmacı prosedürleri"],
    actions: ["FAL formlarını elektronik ortamda hazırla ve zamanında ilet", "Ön bildirim (pre-arrival notification) gerekliliklerini kontrol et", "Kaçak yolcu arama ve raporlama prosedürlerini mürettebata öğret"],
    resources: [{ label: "FAL Convention", href: "https://www.imo.org/en/About/Conventions/Pages/Convention-on-Facilitation-of-International-Maritime-Traffic-(FAL).aspx" }],
  },
  {
    slug: "sua-convention",
    label: "SUA – Denizde Yasadışı Eylemlerin Önlenmesi",
    category: "IMO Sözleşmeleri",
    overview: "Gemilere karşı korsanlık, terörizm ve diğer yasadışı eylemlerin önlenmesi, bastırılması ve yargılanması için hukuki çerçeve sağlar.",
    essentials: ["Suç tanımları: gemi ele geçirme, yolcu/mürettebata şiddet, hasar verme", "Yargı yetkisi ve iade (extradition) düzenlemeleri", "2005 Protokolü: WMD taşımacılığı ve platform güvenliği"],
    actions: ["Yüksek riskli bölgelerde BMP (Best Management Practices) uygula", "Güvenlik seviyesi değişimlerinde SSP prosedürlerini etkinleştir", "Yasadışı eylem girişimlerini kıyı devleti ve bayrak devletine raporla"],
    resources: [{ label: "SUA Convention", href: "https://www.imo.org/en/About/Conventions/Pages/SUA-Treaties.aspx" }],
  },

  // ── Emniyet Kodları (ek) ───────────────────────────────────────────
  {
    slug: "lsa-code",
    label: "LSA Code – Can Kurtarma Araçları",
    category: "Emniyet Kodları",
    overview: "Can filikaları, can salları, kişisel can kurtarma teçhizatı ve indirme düzeneklerinin tasarım, performans ve test standartlarını belirler.",
    essentials: ["Can filikası ve can salı performans ve kapasite gereklilikleri", "Kişisel teçhizat: can yeleği, can simidi, dalma elbisesi standartları", "İndirme/kurtarma (davit) düzenekleri ve bakım/test aralıkları"],
    actions: ["Can kurtarma araçlarının periyodik servis ve yıllık muayenelerini planla", "Dalma elbisesi ve can yeleği sayılarını manifesto ile eşleştir", "Davit ve vinç yük testlerini 5 yıllık döngüde tamamla"],
    resources: [{ label: "LSA Code", href: "https://www.imo.org/en/OurWork/Safety/Pages/LifeSavingAppliances.aspx" }],
  },
  {
    slug: "fss-code",
    label: "FSS Code – Yangın Güvenlik Sistemleri",
    category: "Emniyet Kodları",
    overview: "Sabit yangın söndürme, algılama ve alarm sistemlerinin tasarım, kurulum, test ve bakım standartlarını düzenler.",
    essentials: ["Sabit CO₂, köpük, su sisi ve aerosol söndürme sistemleri", "Otomatik ve manuel yangın algılama/alarm düzenleri", "Sistem test, bakım ve yedek parça gereklilikleri"],
    actions: ["CO₂ sistemi ağırlık kontrolünü yıllık olarak yap ve kaydet", "Algılama ve alarm panellerini haftalık fonksiyon testiyle doğrula", "Söndürme ajanı miktarı ve şarj durumunu izle"],
    resources: [{ label: "FSS Code", href: "https://www.imo.org/en/OurWork/Safety/Pages/FireProtection.aspx" }],
  },
  {
    slug: "css-code",
    label: "CSS Code – Yüklerin Bağlanması",
    category: "Emniyet Kodları",
    overview: "Kargonun güvenli istiflenmesi, sabitlenmesi ve lashing düzenlemelerinin genel ilkelerini belirler; Cargo Securing Manual referansıdır.",
    essentials: ["Cargo Securing Manual (CSM) gereklilikleri", "Lashing malzeme standartları ve MSL (Maximum Securing Load) hesapları", "Konteyner, araç ve ağır yük bağlama düzenleri"],
    actions: ["CSM prosedürlerini yükleme planıyla eşleştir", "Lashing ekipmanının bakım ve muayene kayıtlarını tut", "Kötü hava koşullarında ek bağlama önlemlerini uygula"],
    resources: [{ label: "CSS Code rehberi", href: "https://www.imo.org/en/OurWork/Safety/Pages/CSS-Code.aspx" }],
  },
  {
    slug: "grain-code",
    label: "Grain Code – Tahıl Taşıma Kuralları",
    category: "Emniyet Kodları",
    overview: "Dökme tahıl taşımacılığında stabilite hesapları, serbest yüzey etkisi ve istif gerekliliklerini düzenler.",
    essentials: ["Tahıl kaymaya karşı stabilite kriterleri (GZ alanı, θ açısı)", "Serbest yüzey düzeltmesi ve heeling moment hesabı", "Feeding ve overstowing gereklilikleri"],
    actions: ["Grain stability hesaplamalarını yükleme öncesi doğrula", "Document of Authorization belgesi geçerliliğini kontrol et", "Feeding düzenlemelerini ambar koşullarına göre planla"],
    resources: [{ label: "Grain Code", href: "https://www.imo.org/en/OurWork/Safety/Pages/Grain.aspx" }],
  },
  {
    slug: "iamsar",
    label: "IAMSAR – Arama Kurtarma Rehberi",
    category: "Emniyet Kodları",
    overview: "IMO/ICAO ortak arama kurtarma operasyon rehberi; arama şekilleri, koordinasyon ve gemiden yapılacak yardım prosedürlerini içerir.",
    essentials: ["Cilt III: Gemi kaptanı sorumlulukları ve SAR prosedürleri", "Arama şekilleri: expanding square, sector, parallel track", "OSC (On-Scene Coordinator) görev ve sorumlulukları"],
    actions: ["IAMSAR Cilt III'ü köprüüstünde erişilebilir tut ve güncel versiyonu doğrula", "SAR haberleşme formatlarını GMDSS tatbikatlarına entegre et", "Arama şekillerini harita üzerinde mürettebatla prova et"],
    resources: [{ label: "IAMSAR bilgi", href: "https://www.imo.org/en/OurWork/Safety/Pages/IAMSARManual.aspx" }],
  },

  // ── Çevresel Düzenlemeler (ek) ─────────────────────────────────────
  {
    slug: "polar-code",
    label: "Polar Code – Kutup Suları Kuralları",
    category: "Çevresel Düzenlemeler",
    overview: "Kutup sularında seyreden gemiler için ek emniyet ve çevre koruma gerekliliklerini belirler; buz sınıfı, ekipman ve operasyon planlamasını kapsar.",
    essentials: ["Polar Ship Certificate ve PWOM (Polar Water Operational Manual)", "Buz sınıfı gereklilikleri ve yapısal güçlendirme", "Çevresel koruma: sıfır deşarj, yakıt kısıtlamaları"],
    actions: ["PWOM'u rotaya özgü buz ve hava koşullarına göre güncelle", "Kutup suları için ek can kurtarma teçhizatını hazır bulundur", "Mürettebata kutup suları eğitimi ve tatbikatı yaptır"],
    resources: [{ label: "Polar Code", href: "https://www.imo.org/en/OurWork/Safety/Pages/polar-code.aspx" }],
  },
  {
    slug: "ghg-strategy",
    label: "IMO GHG Strategy – Sera Gazı Stratejisi",
    category: "Çevresel Düzenlemeler",
    overview: "IMO'nun denizcilik sektöründen kaynaklanan sera gazı emisyonlarını azaltmak için belirlediği hedefler ve uygulama yol haritasını içerir.",
    essentials: ["2050 net sıfır hedefi ve ara dönem kontrol noktaları", "Alternatif yakıtlar: amonyak, metanol, hidrojen, biyoyakıt", "Piyasa tabanlı önlemler (MBM) ve GHG Fuel Standard"],
    actions: ["Filo dekarbonizasyon yol haritasını GHG stratejisiyle hizala", "Alternatif yakıt uyumluluğu için teknik fizibilite çalışması yap", "CII ve EEXI performansını GHG hedefleriyle birlikte izle"],
    resources: [{ label: "IMO GHG Strategy", href: "https://www.imo.org/en/OurWork/Environment/Pages/2023-IMO-Strategy-on-Reduction-of-GHG-Emissions-from-Ships.aspx" }],
  },
  {
    slug: "oprc",
    label: "OPRC – Petrol Kirliliğine Hazırlık ve Müdahale",
    category: "Çevresel Düzenlemeler",
    overview: "Denizde petrol sızıntılarına karşı hazırlık, müdahale planları ve uluslararası işbirliği çerçevesini düzenler.",
    essentials: ["Gemi ve liman SOPEP (Shipboard Oil Pollution Emergency Plan)", "Müdahale ekipmanları ve organizasyon gereklilikleri", "Bildirim yükümlülükleri ve uluslararası işbirliği"],
    actions: ["SOPEP planını mürettebatla yılda en az bir kez tatbikat et", "Kirlilik müdahale ekipmanlarının (sorbent, boom) envanterini kontrol et", "Kirlilik olaylarını kıyı devletine derhal raporla"],
    resources: [{ label: "OPRC Convention", href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-on-Oil-Pollution-Preparedness,-Response-and-Co-Operation-(OPRC).aspx" }],
  },

  // ── Denetim & Sörvey (ek) ─────────────────────────────────────────
  {
    slug: "esp",
    label: "ESP – Geliştirilmiş Sörvey Programı",
    category: "Denetim & Sörvey",
    overview: "Dökme yük ve tanker gemilerinin yapısal bütünlüğünü değerlendirmek için geliştirilmiş denetim prosedürlerini belirler.",
    essentials: ["Kalınlık ölçümü, yakın görsel muayene ve yapısal değerlendirme", "Survey rapor formatları ve dosya yönetimi", "Klas/bayrak ile koordineli denetim planlaması"],
    actions: ["ESP kalınlık ölçüm raporlarını klas surveyor'e önceden hazırla", "Kritik yapısal alanlarda korozyon trendlerini izle", "ESP dosyasını gemide güncel ve erişilebilir tut"],
    resources: [{ label: "IACS ESP", href: "https://iacs.org.uk/publications/unified-requirements/" }],
  },
  {
    slug: "dry-dock",
    label: "Dry Dock Survey – Kuru Havuz Denetimi",
    category: "Denetim & Sörvey",
    overview: "Geminin su altı kısmının periyodik olarak kuru havuzda denetlenmesini ve bakım/onarım gerekliliklerini kapsar.",
    essentials: ["5 yıllık döngüde 2 kuru havuz denetimi (max. 36 ay aralık)", "Pervane, dümen, deniz bağlantıları ve anot kontrolleri", "Gövde temizliği, boyama ve katodik koruma değerlendirmesi"],
    actions: ["Kuru havuz spesifikasyonunu klas/bayrak gerekliliklerine göre hazırla", "Su altı fotoğraf/video kayıtlarını survey dosyasına ekle", "Anot tüketim oranlarını izleyip sonraki havuz için planlama yap"],
    resources: [{ label: "Klas havuz gereklilikleri", href: "https://iacs.org.uk/publications/unified-requirements/" }],
  },

  // ── Gemi Sertifikaları (ek) ────────────────────────────────────────
  {
    slug: "safety-equipment-cert",
    label: "Safety Equipment Certificate – Emniyet Teçhizat Belgesi",
    category: "Gemi Sertifikaları",
    overview: "SOLAS gereği gemideki can kurtarma, yangın söndürme ve seyir güvenliği teçhizatının yeterliliğini belgeleyen sertifika.",
    essentials: ["Can kurtarma, yangın ve seyir teçhizatı envanter doğrulaması", "Sertifika süresi, yıllık ve ara survey gereklilikleri", "Teçhizat servis/bakım kayıtları ile uyum"],
    actions: ["Teçhizat envanterini sertifika ekleriyle eşleştir", "Servis süresi dolan teçhizatı survey öncesi yenile", "Yıllık survey tarihini bakım planına entegre et"],
    resources: [{ label: "SOLAS sertifikalar", href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Safety-of-Life-at-Sea.aspx" }],
  },
  {
    slug: "safety-radio-cert",
    label: "Safety Radio Certificate – Telsiz Emniyet Belgesi",
    category: "Gemi Sertifikaları",
    overview: "GMDSS telsiz ekipmanının SOLAS Chapter IV gerekliliklerine uygunluğunu belgeleyen sertifika.",
    essentials: ["Sea area'ya göre GMDSS ekipman asgari listesi", "EPIRB, SART, VHF DSC ve MF/HF test kayıtları", "Yıllık ve periyodik survey aralıkları"],
    actions: ["EPIRB ve SART pil/HRD tarihlerini izle", "Telsiz ekipman fonksiyon testlerini haftalık kaydet", "Sertifika eklerini ekipman değişikliklerinde güncelle"],
    resources: [{ label: "SOLAS Chapter IV", href: "https://www.imo.org/en/OurWork/Safety/Pages/RadioCommunications.aspx" }],
  },
  {
    slug: "safety-construction-cert",
    label: "Safety Construction Certificate – İnşa Emniyet Belgesi",
    category: "Gemi Sertifikaları",
    overview: "Gemi gövdesi, makineleri ve elektrik tesislerinin SOLAS Chapter II-1 ve II-2 gerekliliklerine uygunluğunu belgelendirir.",
    essentials: ["Yapısal bütünlük, bölmeleme ve stabilite doğrulaması", "Makine ve elektrik tesislerinin emniyet kontrolleri", "Yangın bütünlüğü ve malzeme uygunluğu"],
    actions: ["Yapısal modifikasyonları sertifika kapsamıyla doğrula", "Su geçirmez kapı ve yangın kapısı testlerini periyodik yap", "Sertifika yenileme survey'ini klas denetimiyle koordine et"],
    resources: [{ label: "SOLAS Chapter II", href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Safety-of-Life-at-Sea.aspx" }],
  },
  {
    slug: "iapp-cert",
    label: "IAPP Certificate – Hava Kirliliği Önleme Belgesi",
    category: "Gemi Sertifikaları",
    overview: "MARPOL Ek VI kapsamında geminin hava emisyonları, yakıt kalitesi ve enerji verimliliği gerekliliklerine uyumunu belgelendirir.",
    essentials: ["NOx Teknik Dosyası ve motor sertifikasyonu", "SOx uyumu: yakıt kükürt limiti veya EGCS onayı", "SEEMP ve enerji verimliliği doğrulaması"],
    actions: ["NOx Teknik Dosyasını motor bakımlarıyla güncel tut", "Yakıt numune ve BDN kayıtlarını IAPP survey'e hazırla", "EGCS emisyon verilerini periyodik olarak doğrula"],
    resources: [{ label: "MARPOL Ek VI", href: "https://www.imo.org/en/OurWork/Environment/Pages/AirPollution.aspx" }],
  },
  {
    slug: "tonnage-cert",
    label: "Tonnage Certificate – Tonaj Belgesi",
    category: "Gemi Sertifikaları",
    overview: "ITC 69 kapsamında geminin brüt ve net tonajının ölçüm sonuçlarını belgeleyen sertifika; liman harçları ve uluslararası gerekliliklere referans oluşturur.",
    essentials: ["GT ve NT değerleri ile hesaplama detayları", "Sertifikanın süresiz geçerliliği ve yenileme koşulları", "Yapısal değişiklik sonrası yeniden tonaj ölçümü"],
    actions: ["Yapısal modifikasyon sonrası tonaj sertifikasını güncelle", "GT/NT değerlerini manning ve emniyet gereklilikleriyle karşılaştır", "Sertifika nüshasını köprüüstü ve ofiste bulundur"],
    resources: [{ label: "ITC 69", href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-on-Tonnage-Measurement-of-Ships.aspx" }],
  },
  {
    slug: "dmlc",
    label: "DMLC – Denizcilik Çalışma Beyanı",
    category: "Gemi Sertifikaları",
    overview: "MLC 2006 kapsamında bayrak devleti gerekliliklerini (Bölüm I) ve şirket uyum önlemlerini (Bölüm II) belgeleyen iki parçalı deklarasyon.",
    essentials: ["DMLC Part I: bayrak devleti ulusal gereklilikleri", "DMLC Part II: şirket uygulama ve uyum planları", "MLC sertifikası ile birlikte gemide bulundurma zorunluluğu"],
    actions: ["DMLC Part II'yi şirket prosedür değişikliklerinde güncelle", "Bayrak devleti gereklilik değişikliklerini Part I'de izle", "PSC denetimlerinde DMLC ve MLC sertifikasını birlikte sun"],
    resources: [{ label: "MLC 2006", href: "https://www.ilo.org/global/standards/maritime-labour-convention/lang--en/index.htm" }],
  },

  // ── Bölgesel Düzenlemeler (ek) ─────────────────────────────────────
  {
    slug: "indian-ocean-mou",
    label: "Indian Ocean MoU – Hint Okyanusu PSC",
    category: "Bölgesel Düzenlemeler",
    overview: "Hint Okyanusu bölgesindeki liman devletleri arasında PSC koordinasyonunu sağlayan bölgesel mutabakat zaptı.",
    essentials: ["Risk tabanlı hedefleme ve denetim oranları", "Eksiklik ve alıkoyma prosedürleri", "Bölgesel CIC kampanyaları ve veri paylaşımı"],
    actions: ["Hint Okyanusu limanlarına giriş öncesi CIC temalarını gözden geçir", "Bölgesel denetim trendlerini izleyip hazırlık yap", "Eksiklik kapatma kanıtlarını zamanında sunarak alıkoymayı önle"],
    resources: [{ label: "Indian Ocean MoU", href: "https://www.iomou.org/" }],
  },
  {
    slug: "mediterranean-mou",
    label: "Mediterranean MoU – Akdeniz PSC",
    category: "Bölgesel Düzenlemeler",
    overview: "Akdeniz limanlarında PSC denetim koordinasyonu ve uyum standartlarını belirleyen bölgesel anlaşma.",
    essentials: ["Hedefleme sistemi ve öncelikli denetim kriterleri", "Eksiklik sınıflandırması ve alıkoyma koşulları", "Bölgesel kampanyalar ve GISIS veri entegrasyonu"],
    actions: ["Akdeniz limanlarında beklenen denetim konularına hazırlan", "CIC kampanya duyurularını operasyon ekibiyle paylaş", "Denetim bulgu trendlerini analiz ederek önleyici aksiyon al"],
    resources: [{ label: "Mediterranean MoU", href: "https://www.medmou.org/" }],
  },
  {
    slug: "vina-del-mar",
    label: "Viña del Mar Agreement – Latin Amerika PSC",
    category: "Bölgesel Düzenlemeler",
    overview: "Latin Amerika limanlarında PSC denetimlerini koordine eden bölgesel anlaşma; Güney Amerika kıyılarında uyum denetimlerini standardize eder.",
    essentials: ["Denetim hedefleme ve risk değerlendirme kriterleri", "Eksiklik kodları ve alıkoyma prosedürleri", "Bölgesel işbirliği ve veri paylaşım mekanizmaları"],
    actions: ["Latin Amerika limanlarına girmeden yerel PSC gerekliliklerini kontrol et", "Bölgesel kampanya temalarını mürettebatla paylaş", "Alıkoyma riskini azaltmak için pre-arrival checklist uygula"],
    resources: [{ label: "Viña del Mar Agreement", href: "https://www.vinamou.cl/" }],
  },
];

export const regulationItemMap = regulationItems.reduce<Record<string, RegulationItem>>((acc, item) => {
  acc[item.slug] = item;
  return acc;
}, {});

export const regulationCategories: RegulationCategory[] = [
  "IMO Sözleşmeleri",
  "Emniyet Kodları",
  "Çevresel Düzenlemeler",
  "Denetim & Sörvey",
  "Gemi Sertifikaları",
  "Bölgesel Düzenlemeler",
];
