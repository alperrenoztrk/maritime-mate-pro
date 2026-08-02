export interface MachineSubTopic {
  title: string;
}

export interface MachineKeyTopic {
  title: string;
  description: string;
  subTopics: MachineSubTopic[];
}

export interface MachineTopicLesson {
  title: string;
  description: string;
  keyTopics: MachineKeyTopic[];
  resources: { title: string; href: string }[];
}

export const machineTopicLessons: Record<string, MachineTopicLesson> = {
  thermodynamics: {
    title: "Termodinamik ve Isı Tekniği",
    description: "Isı, iş ve enerji kavramları; termodinamik çevrimler; ısı transferi ve gemi enerji sistemleri.",
    keyTopics: [
      {
        title: "Termodinamiğin Temel Kavramları",
        description: "Sistem, çevre, hal büyüklükleri ve enerji formları",
        subTopics: [
          { title: "Termodinamik sistem ve sınıflandırması" },
          { title: "Hal büyüklükleri: basınç, sıcaklık, hacim" },
          { title: "İç enerji ve entalpi" },
          { title: "Spesifik ısı kapasiteleri (Cp, Cv)" },
          { title: "Termodinamiğin sıfırıncı yasası" },
        ],
      },
      {
        title: "Termodinamik Yasalar",
        description: "Birinci ve ikinci yasa, entropi ve tersinirlik",
        subTopics: [
          { title: "Birinci yasa: enerji korunumu" },
          { title: "Açık ve kapalı sistemlerde enerji dengesi" },
          { title: "İkinci yasa: Kelvin–Planck ve Clausius ifadeleri" },
          { title: "Entropi kavramı ve hesabı" },
          { title: "Tersinir ve tersinmez süreçler" },
          { title: "Exerji ve anergy kavramları" },
        ],
      },
      {
        title: "İdeal Gaz ve Hal Değişimleri",
        description: "İdeal gaz denklemleri ve politropik süreçler",
        subTopics: [
          { title: "İdeal gaz denklemi (PV = mRT)" },
          { title: "İzotermik süreç" },
          { title: "İzobarik süreç" },
          { title: "İzokorik süreç" },
          { title: "Adyabatik (izentropik) süreç" },
          { title: "Politropik süreç ve n üssü" },
        ],
      },
      {
        title: "Termodinamik Çevrimler",
        description: "Güç ve soğutma çevrimleri",
        subTopics: [
          { title: "Carnot çevrimi ve teorik verim" },
          { title: "Otto çevrimi (benzinli motor)" },
          { title: "Diesel çevrimi" },
          { title: "Sabathe (ikili) çevrimi" },
          { title: "Rankine çevrimi (buhar türbini)" },
          { title: "Brayton çevrimi (gaz türbini)" },
          { title: "Ters çevrimler: soğutma ve ısı pompası" },
        ],
      },
      {
        title: "Isı Transferi",
        description: "İletim, taşınım ve ışınım mekanizmaları",
        subTopics: [
          { title: "Fourier iletim yasası" },
          { title: "Çok katmanlı duvar ve silindirik iletim" },
          { title: "Newton soğuma yasası (taşınım)" },
          { title: "Doğal ve zorlanmış taşınım" },
          { title: "Stefan–Boltzmann ışınım yasası" },
          { title: "Toplam ısı geçiş katsayısı (U)" },
        ],
      },
      {
        title: "Isı Eşanjörleri",
        description: "Gemi ısı eşanjör tipleri ve performans hesapları",
        subTopics: [
          { title: "Paralel akış ve ters akış düzenlemeleri" },
          { title: "LMTD (logaritmik ortalama sıcaklık farkı)" },
          { title: "Plakalı ısı eşanjörleri" },
          { title: "Kabuk–boru (shell & tube) eşanjörler" },
          { title: "Fouling ve temizlik etkileri" },
          { title: "Eşanjör verim hesapları" },
        ],
      },
      {
        title: "Gemi Enerji Sistemleri",
        description: "Atık ısı geri kazanımı ve enerji yönetimi",
        subTopics: [
          { title: "Egzoz gazı ekonomizeri" },
          { title: "Atık ısı geri kazanım sistemi (WHRS)" },
          { title: "Buhar jeneratörü ve türbin entegrasyonu" },
          { title: "Kojenerasyon uygulamaları" },
          { title: "Enerji dönüşüm verimi ve kayıp analizi" },
        ],
      },
    ],
    resources: [
      { title: "Hesaplamalar", href: "/machine/thermodynamics/calculations" },
      { title: "Formüller", href: "/machine/thermodynamics/formulas" },
    ],
  },

  "fluid-mechanics": {
    title: "Akışkanlar Mekaniği",
    description: "Akışkan statiği ve dinamiği, pompa sistemleri ve boru hattı hesapları.",
    keyTopics: [
      {
        title: "Akışkan Statiği",
        description: "Basınç dağılımı ve kuvvet hesapları",
        subTopics: [
          { title: "Basınç kavramı ve birimleri" },
          { title: "Hidrostatik basınç denklemleri" },
          { title: "Mutlak ve manometrik basınç" },
          { title: "Pascal prensibi" },
          { title: "Düz ve eğri yüzeylere etkiyen basınç kuvveti" },
          { title: "Yüzdürme kuvveti (Arşimet)" },
        ],
      },
      {
        title: "Akışkan Kinematiği ve Dinamiği",
        description: "Akış türleri ve temel denklemler",
        subTopics: [
          { title: "Akım çizgileri ve akış tipleri" },
          { title: "Laminer ve türbülanslı akış" },
          { title: "Reynolds sayısı" },
          { title: "Süreklilik denklemi" },
          { title: "Bernoulli denklemi ve uygulamaları" },
          { title: "Enerji ve momentum denklemleri" },
        ],
      },
      {
        title: "Boru Akışı ve Kayıplar",
        description: "Sürtünme ve lokal kayıp hesapları",
        subTopics: [
          { title: "Darcy–Weisbach denklemi" },
          { title: "Moody diyagramı ve sürtünme katsayısı" },
          { title: "Boru çapı ve hız hesapları" },
          { title: "Lokal kayıplar (dirsek, vana, daralma)" },
          { title: "Seri ve paralel boru sistemleri" },
          { title: "Boru hattı tasarım prensipleri" },
        ],
      },
      {
        title: "Pompa Sistemleri",
        description: "Santrifüj ve pozitif deplasanlı pompalar",
        subTopics: [
          { title: "Santrifüj pompa çalışma prensibi" },
          { title: "Pompa karakteristik eğrileri (H-Q)" },
          { title: "Sistem eğrisi ve çalışma noktası" },
          { title: "NPSH kavramı ve kavitasyon" },
          { title: "Pozitif deplasanlı pompalar (dişli, vidalı)" },
          { title: "Pompa seçimi ve boyutlandırma" },
          { title: "Seri ve paralel pompa çalıştırma" },
        ],
      },
      {
        title: "Gemi Boru Sistemleri",
        description: "Gemi servis hatları ve valf tipleri",
        subTopics: [
          { title: "Balast boru sistemi" },
          { title: "Sintine boru sistemi" },
          { title: "Soğutma suyu sistemleri" },
          { title: "Yakıt transfer ve servis hatları" },
          { title: "Valf tipleri ve seçim kriterleri" },
          { title: "Boru malzemeleri ve standartlar" },
        ],
      },
    ],
    resources: [
      { title: "Hesaplamalar", href: "/machine/fluid-mechanics/calculations" },
      { title: "Formüller", href: "/machine/fluid-mechanics/formulas" },
    ],
  },

  "machine-elements": {
    title: "Makine Elemanları ve Malzeme Bilgisi",
    description: "Mukavemet, malzeme seçimi, mil-yatak-dişli tasarımı ve kaynak teknolojisi.",
    keyTopics: [
      {
        title: "Malzeme Bilgisi",
        description: "Metalurji temelleri ve denizcilik malzemeleri",
        subTopics: [
          { title: "Kristal yapılar ve faz diyagramları" },
          { title: "Çelik türleri ve alaşım elementleri" },
          { title: "Demir dışı metaller (bakır, alüminyum)" },
          { title: "Korozyon direnci ve korozyon tipleri" },
          { title: "Isıl işlemler (tavlama, sertleştirme)" },
          { title: "Denizcilik çelik standartları" },
        ],
      },
      {
        title: "Mukavemet Temelleri",
        description: "Gerilme, şekil değiştirme ve güvenlik katsayısı",
        subTopics: [
          { title: "Normal gerilme ve deformasyon" },
          { title: "Kayma gerilmesi" },
          { title: "Hooke yasası ve elastiklik modülü" },
          { title: "Eğilme gerilmesi ve moment hesabı" },
          { title: "Burulma gerilmesi" },
          { title: "Bileşik gerilme ve Von Mises kriteri" },
          { title: "Güvenlik katsayısı ve emniyet gerilmesi" },
        ],
      },
      {
        title: "Mil ve Yatak Tasarımı",
        description: "Şaft hattı ve yatak hesapları",
        subTopics: [
          { title: "Mil çapı hesabı (burulma ve eğilme)" },
          { title: "Pervane şaftı boyutlandırma (IACS UR M68)" },
          { title: "Ara şaft ve kıç boru şaftı" },
          { title: "Kaymalı yatak (stern tube bearing)" },
          { title: "Rulman seçimi ve ömür hesabı" },
          { title: "Şaft hizalama (alignment)" },
        ],
      },
      {
        title: "Dişli ve Aktarma Elemanları",
        description: "Güç aktarma mekanizmaları",
        subTopics: [
          { title: "Düz dişli hesapları" },
          { title: "Helisel dişli ve pervane redüktörü" },
          { title: "Kayış ve zincir tahrik sistemleri" },
          { title: "Kaplin tipleri (esnek, rijit)" },
          { title: "Kavrama (clutch) mekanizmaları" },
        ],
      },
      {
        title: "Yorulma ve Titreşim",
        description: "Dinamik yükleme ve rezonans analizi",
        subTopics: [
          { title: "Yorulma ömrü ve S-N eğrisi" },
          { title: "Yorulma sınırı ve gerilme yoğunlaşması" },
          { title: "Torsiyonel titreşim ve barred speed range" },
          { title: "Aksiyel titreşim" },
          { title: "Lateral titreşim ve kritik hız" },
        ],
      },
      {
        title: "Kaynak ve Bağlantı Teknolojisi",
        description: "Kaynak yöntemleri ve muayene teknikleri",
        subTopics: [
          { title: "Elektrik ark kaynağı (SMAW)" },
          { title: "Gazaltı kaynağı (MIG/MAG, TIG)" },
          { title: "Kaynak dikişi hesapları" },
          { title: "Kaynak hataları ve muayene yöntemleri" },
          { title: "NDT (tahribatsız muayene) teknikleri" },
          { title: "Cıvata ve perçin bağlantıları" },
        ],
      },
    ],
    resources: [
      { title: "Hesaplamalar", href: "/machine/machine-elements/calculations" },
      { title: "Formüller", href: "/machine/machine-elements/formulas" },
    ],
  },

  "diesel-engines": {
    title: "Deniz Dizel Makineleri",
    description: "İki ve dört zamanlı deniz dizel motorları, performans analizi ve arıza teşhisi.",
    keyTopics: [
      {
        title: "Dizel Motor Temelleri",
        description: "Çalışma prensibi ve sınıflandırma",
        subTopics: [
          { title: "Dizel çevrimi ve sıkıştırma ile ateşleme" },
          { title: "İki zamanlı motor çalışma prensibi" },
          { title: "Dört zamanlı motor çalışma prensibi" },
          { title: "Düşük, orta ve yüksek devirli motorlar" },
          { title: "Crosshead ve trunk piston motor farkları" },
          { title: "Ana motor ve yardımcı motor ayrımı" },
        ],
      },
      {
        title: "Motor Bileşenleri",
        description: "Ana parçalar ve görevleri",
        subTopics: [
          { title: "Silindir kapağı (cylinder head)" },
          { title: "Silindir gömleği (liner) ve aşınma" },
          { title: "Piston ve segman tasarımı" },
          { title: "Biyel kolu ve krank mili" },
          { title: "Yatak (bearing) tipleri ve ölçüm" },
          { title: "Supap mekanizması ve zamanlaması" },
          { title: "Bedplate ve frame yapısı" },
        ],
      },
      {
        title: "Yakıt Enjeksiyonu ve Yanma",
        description: "Enjeksiyon sistemleri ve yanma kalitesi",
        subTopics: [
          { title: "Mekanik yakıt enjeksiyon sistemi" },
          { title: "Common rail enjeksiyon sistemi" },
          { title: "Enjektör (nozzle) tipleri ve püskürtme" },
          { title: "Yanma aşamaları ve gecikme süresi" },
          { title: "Anormal yanma: knocking ve misfiring" },
          { title: "İndikatör diyagramı ve P-V analizi" },
        ],
      },
      {
        title: "Süperşarj ve Hava Besleme",
        description: "Turboşarj ve süpürme sistemleri",
        subTopics: [
          { title: "Turboşarjer çalışma prensibi" },
          { title: "Türbin ve kompresör karakteristikleri" },
          { title: "Süpürme (scavenging) tipleri: uniflow, loop" },
          { title: "Şarj havası soğutucusu" },
          { title: "Turboşarj yardımcı üfleyici (auxiliary blower)" },
          { title: "VIT (Variable Injection Timing)" },
        ],
      },
      {
        title: "Motor Performansı",
        description: "Güç, verim ve performans izleme",
        subTopics: [
          { title: "İndike güç (indicated power) hesabı" },
          { title: "Fren gücü (brake power) ve mekanik verim" },
          { title: "Ortalama efektif basınç (MEP)" },
          { title: "Özgül yakıt tüketimi (SFOC)" },
          { title: "Performans izleme ve trend analizi" },
          { title: "Yük dengeleme (load balancing)" },
        ],
      },
      {
        title: "Motor Arıza Teşhisi",
        description: "Tipik arızalar ve giderme yöntemleri",
        subTopics: [
          { title: "Silindir performans dengesizliği" },
          { title: "Liner ve piston aşınması" },
          { title: "Egzoz sıcaklık sapmaları" },
          { title: "Turboşarj surging" },
          { title: "Yatak arızaları ve sıcaklık kontrolü" },
          { title: "Silindir yağlama sistemi sorunları" },
        ],
      },
    ],
    resources: [
      { title: "Hesaplamalar", href: "/machine/diesel-engines/calculations" },
      { title: "Formüller", href: "/machine/diesel-engines/formulas" },
    ],
  },

  "ship-systems": {
    title: "Gemi Makine Sistemleri",
    description: "Güverte makineleri, dümen sistemi, pervane ve güç aktarma hatları.",
    keyTopics: [
      {
        title: "Dümen Donanımı",
        description: "Dümen tipleri ve servo sistemler",
        subTopics: [
          { title: "Dümen tipleri (balanced, semi-balanced, unbalanced)" },
          { title: "Dümen kuvveti ve tork hesabı" },
          { title: "Elektro-hidrolik dümen makinesi" },
          { title: "Telemotor sistemi" },
          { title: "Dümen testleri ve SOLAS gereklilikleri" },
          { title: "Yedek dümen sistemi" },
        ],
      },
      {
        title: "Pervane ve Şaft Hattı",
        description: "İtme sistemi bileşenleri",
        subTopics: [
          { title: "Sabit hatveli pervane (FPP)" },
          { title: "Değişken hatveli pervane (CPP)" },
          { title: "Pervane verimi ve kavitasyon" },
          { title: "Şaft hattı düzeni ve bileşenleri" },
          { title: "Stern tube yağlama ve sızdırmazlık" },
          { title: "Ara yatak ve trust yatak" },
        ],
      },
      {
        title: "Güverte Makineleri",
        description: "Vinç, ırgat ve mooring ekipmanları",
        subTopics: [
          { title: "Demir ırgadı (windlass)" },
          { title: "Yük vinçleri ve kaldırma kapasitesi" },
          { title: "Mooring vinçleri ve otomatik gerilim" },
          { title: "Kapak (hatch cover) mekanizmaları" },
          { title: "Ramp ve asansör sistemleri" },
        ],
      },
      {
        title: "Hidrolik Sistemler",
        description: "Güç aktarımı ve kontrol devreleri",
        subTopics: [
          { title: "Hidrolik pompa tipleri" },
          { title: "Hidrolik silindir ve motor" },
          { title: "Yön kontrol ve basınç kontrol valfleri" },
          { title: "Hidrolik devre okuma" },
          { title: "Hidrolik yağ bakımı ve filtrasyon" },
        ],
      },
      {
        title: "Pnömatik Sistemler",
        description: "Basınçlı hava üretim ve dağıtım",
        subTopics: [
          { title: "Hava kompresörleri (pistonlu, vidalı)" },
          { title: "Hava tankları ve emniyet düzenlemeleri" },
          { title: "Hava kurutucu ve filtre üniteleri" },
          { title: "Starting air sistemi" },
          { title: "Kontrol havası ve servis havası" },
        ],
      },
    ],
    resources: [
      { title: "Hesaplamalar", href: "/machine/ship-systems/calculations" },
      { title: "Formüller", href: "/machine/ship-systems/formulas" },
    ],
  },

  auxiliary: {
    title: "Yardımcı Makineler",
    description: "Jeneratör, buhar kazanı, su arıtma, purifier ve separator sistemleri.",
    keyTopics: [
      {
        title: "Dizel Jeneratörler",
        description: "Elektrik üretim ve paralel çalışma",
        subTopics: [
          { title: "Yardımcı dizel motor özellikleri" },
          { title: "Alternatör (AC jeneratör) prensibi" },
          { title: "Paralel bağlama (synchronizing)" },
          { title: "Yük paylaşımı ve frekans regülasyonu" },
          { title: "Acil jeneratör ve SOLAS gereklilikleri" },
        ],
      },
      {
        title: "Buhar Kazanları",
        description: "Gemi buhar üretim sistemleri",
        subTopics: [
          { title: "Ateş borulu ve su borulu kazanlar" },
          { title: "Kompozit kazan tasarımı" },
          { title: "Egzoz gazı ekonomizeri" },
          { title: "Kazan su kimyası ve işlem" },
          { title: "Kazan emniyet düzenleri" },
          { title: "Kazan bakım ve muayene" },
        ],
      },
      {
        title: "Tatlı Su Üretimi",
        description: "Evaporatör ve ters ozmoz sistemleri",
        subTopics: [
          { title: "Vakumlu evaporatör çalışma prensibi" },
          { title: "Ters ozmoz (RO) sistemi" },
          { title: "Su kalitesi standartları" },
          { title: "Mineral dozajı ve dezenfeksiyon" },
          { title: "Üretim kapasitesi ve verim" },
        ],
      },
      {
        title: "Separatör ve Purifier",
        description: "Yakıt ve yağ arıtma sistemleri",
        subTopics: [
          { title: "Santrifüj ayırma prensibi" },
          { title: "Purifier ve clarifier farkı" },
          { title: "Gravity disc seçimi" },
          { title: "Otomatik desludge ve kontrol" },
          { title: "Yakıt arıtma sırası ve sıcaklık" },
          { title: "Yağ arıtma ve su ayrımı" },
        ],
      },
      {
        title: "Hava Kompresörleri",
        description: "Starting ve servis havası üretimi",
        subTopics: [
          { title: "Çok kademeli kompresör prensibi" },
          { title: "Ara soğutma ve son soğutma" },
          { title: "Otomatik boşaltma (auto-drain)" },
          { title: "Kompresör bakım ve valf muayenesi" },
          { title: "Hava şişesi muayene gereklilikleri" },
        ],
      },
    ],
    resources: [
      { title: "Hesaplamalar", href: "/machine/auxiliary/calculations" },
      { title: "Formüller", href: "/machine/auxiliary/formulas" },
    ],
  },

  "fuel-technology": {
    title: "Yakıt Teknolojisi ve Yönetimi",
    description: "Deniz yakıtları, yakıt kalitesi, işleme ve depolama yönetimi.",
    keyTopics: [
      {
        title: "Deniz Yakıt Türleri",
        description: "HFO, VLSFO, MGO ve alternatif yakıtlar",
        subTopics: [
          { title: "HFO (Heavy Fuel Oil) özellikleri" },
          { title: "VLSFO (Very Low Sulphur Fuel Oil)" },
          { title: "MGO ve MDO ayrımı" },
          { title: "ISO 8217 yakıt standartları" },
          { title: "LNG yakıt kullanımı" },
          { title: "Metanol ve amonyak yakıtlar" },
        ],
      },
      {
        title: "Yakıt Kalite Parametreleri",
        description: "Viskozite, yoğunluk ve diğer özellikler",
        subTopics: [
          { title: "Viskozite ve sıcaklık ilişkisi" },
          { title: "Yoğunluk ve API gravity" },
          { title: "Pour point ve cloud point" },
          { title: "Flash point ve tutuşma noktası" },
          { title: "CCAI ve CII (yakıt kalite indeksleri)" },
          { title: "Katalizör incelikleri (Al+Si)" },
          { title: "Su ve sediment oranı" },
        ],
      },
      {
        title: "Yakıt İşleme Sistemi",
        description: "Arıtma, ısıtma ve filtrasyon",
        subTopics: [
          { title: "Settling tank ve servis tank" },
          { title: "Yakıt ısıtma ve viskozite kontrolü" },
          { title: "Purifier ile arıtma" },
          { title: "Otojen filtrasyon ve oto-filter" },
          { title: "Homojenizerler" },
          { title: "Yakıt değiştirme (fuel changeover) prosedürü" },
        ],
      },
      {
        title: "Bunker Operasyonları",
        description: "Yakıt alımı ve hesapları",
        subTopics: [
          { title: "Bunker planlama ve sipariş" },
          { title: "Bunker miktarı ölçüm yöntemleri" },
          { title: "Bunker Delivery Note (BDN)" },
          { title: "MARPOL Annex VI kükürt uyumu" },
          { title: "Yakıt numunesi alma prosedürü" },
          { title: "Bunker uyuşmazlık yönetimi" },
        ],
      },
    ],
    resources: [
      { title: "Hesaplamalar", href: "/machine/fuel-technology/calculations" },
      { title: "Formüller", href: "/machine/fuel-technology/formulas" },
    ],
  },

  "cooling-hvac": {
    title: "Soğutma ve Klima Sistemleri",
    description: "Buhar sıkıştırmalı soğutma çevrimi, soğutucu akışkanlar ve klima sistemi tasarımı.",
    keyTopics: [
      {
        title: "Soğutma Çevrimi Temelleri",
        description: "Buhar sıkıştırmalı soğutma prensibi",
        subTopics: [
          { title: "Soğutma çevrimi bileşenleri" },
          { title: "Kompresör tipleri (pistonlu, vidalı)" },
          { title: "Kondenser ve evaporatör" },
          { title: "Genleşme valfi (TXV, EEV)" },
          { title: "Mollier (P-h) diyagramı okuma" },
          { title: "COP (Performans Katsayısı) hesabı" },
        ],
      },
      {
        title: "Soğutucu Akışkanlar",
        description: "Freon alternatifleri ve çevresel etkiler",
        subTopics: [
          { title: "CFC, HCFC ve HFC soğutucu gazlar" },
          { title: "Doğal soğutucu akışkanlar (CO₂, NH₃)" },
          { title: "ODP ve GWP kavramları" },
          { title: "Montreal ve Kigali protokolleri" },
          { title: "Soğutucu akışkan şarj ve geri kazanım" },
        ],
      },
      {
        title: "Gemi Soğutma Sistemleri",
        description: "Provizyonve yük soğutma",
        subTopics: [
          { title: "Provizyon soğuk hane sistemi" },
          { title: "Konteyner (reefer) soğutma" },
          { title: "Merkezi soğutma suyu sistemi" },
          { title: "Ana makine ve yardımcı soğutma" },
          { title: "Soğutma sistemi alarm ve korumaları" },
        ],
      },
      {
        title: "Klima Sistemi",
        description: "İklimlendirme ve havalandırma",
        subTopics: [
          { title: "Klima sistemi bileşenleri" },
          { title: "Hava işleme ünitesi (AHU)" },
          { title: "Soğutma ve ısıtma serpantinleri" },
          { title: "Nemlilik kontrolü" },
          { title: "Kanal sistemi tasarımı" },
          { title: "Taze hava ve egzoz havalandırma" },
        ],
      },
    ],
    resources: [
      { title: "Hesaplamalar", href: "/machine/cooling-hvac/calculations" },
      { title: "Formüller", href: "/machine/cooling-hvac/formulas" },
    ],
  },

  electrical: {
    title: "Gemi Elektrik Sistemleri",
    description: "Elektrik üretim, dağıtım, koruma ve motorlar.",
    keyTopics: [
      {
        title: "Elektrik Üretim Sistemi",
        description: "Jeneratör ve güç yönetimi",
        subTopics: [
          { title: "Senkron jeneratör çalışma prensibi" },
          { title: "Gerilim regülasyonu (AVR)" },
          { title: "Frekans ve yük kontrolü" },
          { title: "Paralel jeneratör bağlama" },
          { title: "Güç yönetim sistemi (PMS)" },
          { title: "Shore connection (kıyı bağlantısı)" },
        ],
      },
      {
        title: "Elektrik Dağıtım Sistemi",
        description: "Pano, kablo ve topraklama",
        subTopics: [
          { title: "Ana dağıtım panosu (MSB)" },
          { title: "Acil dağıtım panosu (ESB)" },
          { title: "Kablo tipleri ve boyutlandırma" },
          { title: "Topraklama sistemleri (izole nötr)" },
          { title: "İnsülasyon direnci ölçümü ve izleme" },
          { title: "440V ve 6.6kV sistemler" },
        ],
      },
      {
        title: "Koruma Sistemleri",
        description: "Sigorta, şalter ve koruma rölesi",
        subTopics: [
          { title: "Aşırı akım koruma (devre kesici)" },
          { title: "Kısa devre koruma" },
          { title: "Ters güç koruma (reverse power)" },
          { title: "Tercihli açma (preferential trip)" },
          { title: "Toprak kaçağı koruma" },
        ],
      },
      {
        title: "Elektrik Motorları",
        description: "AC ve DC motor tipleri",
        subTopics: [
          { title: "Üç fazlı asenkron motor" },
          { title: "Motor yol verme yöntemleri (DOL, Y-Δ, VFD)" },
          { title: "DC motor tipleri ve uygulamaları" },
          { title: "Frekans dönüştürücü (VFD) kontrolü" },
          { title: "Motor koruma ve bakım" },
        ],
      },
      {
        title: "Aydınlatma ve Akü Sistemleri",
        description: "Gemi aydınlatma ve acil güç kaynakları",
        subTopics: [
          { title: "Seyir fenerleri (navigation lights)" },
          { title: "Acil aydınlatma sistemi" },
          { title: "Akü tipleri ve şarj sistemleri" },
          { title: "UPS (kesintisiz güç kaynağı)" },
          { title: "Patlama korumalı (Ex-proof) ekipman" },
        ],
      },
    ],
    resources: [
      { title: "Hesaplamalar", href: "/machine/electrical/calculations" },
      { title: "Formüller", href: "/machine/electrical/formulas" },
    ],
  },

  automation: {
    title: "Elektronik, Ölçme ve Otomasyon",
    description: "Sensörler, PLC sistemleri, kontrol teorisi ve gemi otomasyon uygulamaları.",
    keyTopics: [
      {
        title: "Ölçme ve Enstrümantasyon",
        description: "Sensör tipleri ve ölçüm prensipleri",
        subTopics: [
          { title: "Sıcaklık ölçüm sensörleri (termokuple, RTD)" },
          { title: "Basınç ölçüm cihazları (Bourdon, piezoelektrik)" },
          { title: "Seviye ölçüm yöntemleri" },
          { title: "Akış ölçüm cihazları (orifis, Coriolis)" },
          { title: "Devir ve hız ölçümü" },
          { title: "Sinyal dönüştürücüler (4-20 mA, 0-10V)" },
        ],
      },
      {
        title: "Kontrol Teorisi",
        description: "Geri besleme ve kontrol algoritmaları",
        subTopics: [
          { title: "Açık ve kapalı döngü kontrol" },
          { title: "PID kontrol algoritması" },
          { title: "P, I, D parametrelerinin etkileri" },
          { title: "Kontrol döngüsü ayarı (tuning)" },
          { title: "Kaskad ve ileri besleme kontrol" },
        ],
      },
      {
        title: "PLC ve Otomasyon Sistemleri",
        description: "Programlanabilir mantık ve gemi otomasyonu",
        subTopics: [
          { title: "PLC donanım yapısı ve I/O" },
          { title: "Ladder diyagram programlama" },
          { title: "Alarm ve izleme sistemi (AMS)" },
          { title: "Dağıtık kontrol sistemi (DCS)" },
          { title: "Gemi entegre otomasyon sistemi (IAS)" },
          { title: "Uzaktan izleme ve tanı" },
        ],
      },
      {
        title: "Güç Elektroniği",
        description: "Yarı iletken elemanlar ve dönüştürücüler",
        subTopics: [
          { title: "Diyot ve thyristor (SCR)" },
          { title: "Doğrultucu devreler" },
          { title: "İnvertör ve frekans dönüştürücü" },
          { title: "Yumuşak yol verici (soft starter)" },
          { title: "Harmonik bozulma ve filtreleme" },
        ],
      },
    ],
    resources: [
      { title: "Hesaplamalar", href: "/machine/automation/calculations" },
      { title: "Formüller", href: "/machine/automation/formulas" },
    ],
  },

  "engine-room-ops": {
    title: "Makine Dairesi Operasyonları",
    description: "Seyir hazırlığı, vardiya tutma, manevralar ve acil durum prosedürleri.",
    keyTopics: [
      {
        title: "Seyir Hazırlığı",
        description: "Kalkış öncesi kontrol ve hazırlık",
        subTopics: [
          { title: "Ana makine seyir hazırlık prosedürü" },
          { title: "Yardımcı makine kontrolü" },
          { title: "Yakıt sistemi hazırlığı" },
          { title: "Soğutma ve yağlama kontrolü" },
          { title: "Dümen ve güverte makineleri testi" },
          { title: "Engine room check list" },
        ],
      },
      {
        title: "Makine Vardiyası",
        description: "Vardiya prosedürleri ve izleme",
        subTopics: [
          { title: "Makine vardiyası devir-teslim" },
          { title: "Periyodik kontrol turları (round)" },
          { title: "Performans parametreleri izleme" },
          { title: "Günlük kayıt (Engine Log Book)" },
          { title: "Alarm yönetimi ve müdahale" },
          { title: "UMS (Unmanned Machinery Space) operasyonu" },
        ],
      },
      {
        title: "Manevra Operasyonları",
        description: "Liman giriş-çıkış ve dar kanal seyri",
        subTopics: [
          { title: "Manevra modu geçiş prosedürü" },
          { title: "Yakıt değiştirme (fuel changeover)" },
          { title: "Ana makine hız kontrolü" },
          { title: "Acil durma ve geri yol" },
          { title: "Köprüüstü-makine dairesi iletişim" },
        ],
      },
      {
        title: "Acil Durum Prosedürleri",
        description: "Makine dairesi acil durumları",
        subTopics: [
          { title: "Makine dairesi yangını" },
          { title: "Blackout ve güç geri kazanımı" },
          { title: "Ana makine arızası ile seyir" },
          { title: "Deniz suyu sızıntısı" },
          { title: "Yüksek sıcaklık ve basınç alarmları" },
          { title: "Acil jeneratör devreye alma" },
        ],
      },
    ],
    resources: [
      { title: "Hesaplamalar", href: "/machine/engine-room-ops/calculations" },
      { title: "Formüller", href: "/machine/engine-room-ops/formulas" },
    ],
  },

  maintenance: {
    title: "Bakım ve Tutum",
    description: "Planlı bakım sistemi, muayene yöntemleri ve yedek parça yönetimi.",
    keyTopics: [
      {
        title: "Bakım Stratejileri",
        description: "Reaktif, önleyici ve kestirimci bakım",
        subTopics: [
          { title: "Arıza sonrası bakım (corrective)" },
          { title: "Planlı bakım (planned/preventive)" },
          { title: "Durum bazlı bakım (condition-based)" },
          { title: "Kestirimci bakım (predictive)" },
          { title: "Güvenilirlik merkezli bakım (RCM)" },
        ],
      },
      {
        title: "Planlı Bakım Sistemi (PMS)",
        description: "Kayıt ve takip sistemleri",
        subTopics: [
          { title: "PMS yazılımı ve iş emri yönetimi" },
          { title: "Bakım aralıkları ve çalışma saatleri" },
          { title: "Klas gereklilikleri ve survey takvimi" },
          { title: "Kritik ekipman tanımlaması" },
          { title: "Yedek parça envanteri ve min-max seviye" },
        ],
      },
      {
        title: "Motor Bakım İşleri",
        description: "Ana ve yardımcı makine bakımları",
        subTopics: [
          { title: "Silindir kapağı söküm ve revizyon" },
          { title: "Piston ve segman değişimi" },
          { title: "Liner muayene ve ölçüm" },
          { title: "Supap taşlama ve ayar" },
          { title: "Enjektör test ve bakım" },
          { title: "Krank mili saptırma (deflection) ölçümü" },
        ],
      },
      {
        title: "Muayene ve Test Yöntemleri",
        description: "NDT ve tahribatlı muayene",
        subTopics: [
          { title: "Görsel muayene prosedürleri" },
          { title: "Ultrasonik kalınlık ölçümü" },
          { title: "Manyetik parçacık muayenesi (MT)" },
          { title: "Sıvı penetrant muayenesi (PT)" },
          { title: "Titreşim analizi" },
          { title: "Yağ analizi ve durum izleme" },
        ],
      },
    ],
    resources: [
      { title: "Hesaplamalar", href: "/machine/maintenance/calculations" },
      { title: "Formüller", href: "/machine/maintenance/formulas" },
    ],
  },

  "engine-room-safety": {
    title: "Makine Dairesi Güvenliği",
    description: "Kişisel koruma, yangın güvenliği, kapalı alan ve ISM gereklilikleri.",
    keyTopics: [
      {
        title: "Kişisel Koruma",
        description: "KKD kullanımı ve güvenli çalışma",
        subTopics: [
          { title: "Kişisel koruyucu donanım (KKD) türleri" },
          { title: "İşitme koruması (gürültü maruziyeti)" },
          { title: "Göz ve yüz koruması" },
          { title: "Koruyucu giysi ve eldiven" },
          { title: "Güvenlik ayakkabısı standartları" },
        ],
      },
      {
        title: "Yangın Güvenliği",
        description: "Yangın önleme ve söndürme",
        subTopics: [
          { title: "Yangın üçgeni ve yangın sınıfları" },
          { title: "Makine dairesi sabit söndürme (CO₂, FM200)" },
          { title: "Portatif söndürücü tipleri" },
          { title: "Yangın algılama sistemi" },
          { title: "Hızlı kapatma vanası (quick closing valve)" },
          { title: "Yangın tatbikatı ve muster" },
        ],
      },
      {
        title: "Kapalı Alan Güvenliği",
        description: "Kapalı/kapalı mahallere giriş",
        subTopics: [
          { title: "Kapalı alan tanımı ve tehlikeler" },
          { title: "Atmosfer testi (O₂, LEL, H₂S)" },
          { title: "Giriş izin sistemi (PTW)" },
          { title: "Havalandırma gereklilikleri" },
          { title: "Kurtarma prosedürü ve ekipman" },
        ],
      },
      {
        title: "Tehlikeli Maddeler",
        description: "Kimyasal güvenlik ve depolama",
        subTopics: [
          { title: "MSDS (Güvenlik Bilgi Formu) okuma" },
          { title: "Asbest ve yasaklı malzemeler" },
          { title: "Kimyasal depolama kuralları" },
          { title: "Basınçlı gaz tüpü güvenliği" },
          { title: "Biyolojik tehlikeler ve önlemler" },
        ],
      },
      {
        title: "İş Güvenliği Yönetimi",
        description: "ISM ve risk değerlendirme",
        subTopics: [
          { title: "ISM Code gereklilikleri" },
          { title: "Risk değerlendirme (Risk Assessment)" },
          { title: "İş izin sistemi (Permit to Work)" },
          { title: "Kaza raporlama ve kök neden analizi" },
          { title: "Toolbox meeting ve güvenlik brifingi" },
          { title: "Near-miss raporlama" },
        ],
      },
    ],
    resources: [
      { title: "Hesaplamalar", href: "/machine/engine-room-safety/calculations" },
      { title: "Formüller", href: "/machine/engine-room-safety/formulas" },
    ],
  },

  "environment-machine": {
    title: "Çevre ve MARPOL – Makine",
    description: "MARPOL ekleri, emisyon kontrolü, atık yönetimi ve balast su arıtma.",
    keyTopics: [
      {
        title: "MARPOL Genel Yapısı",
        description: "Sözleşme çerçevesi ve ekler",
        subTopics: [
          { title: "MARPOL sözleşmesi tarihçesi" },
          { title: "Ek I – Petrol kirliliği önleme" },
          { title: "Ek II – Zararlı sıvı maddeler" },
          { title: "Ek III – Ambalajlı zararlı maddeler" },
          { title: "Ek IV – Pis su (sewage)" },
          { title: "Ek V – Çöp (garbage)" },
          { title: "Ek VI – Hava kirliliği ve emisyonlar" },
        ],
      },
      {
        title: "Yağ Kirliliği Önleme (Annex I)",
        description: "OWS, ODMCS ve yağ kayıt defteri",
        subTopics: [
          { title: "Yağ-su ayırıcı (OWS) 15 ppm standardı" },
          { title: "Yağ deşarj izleme sistemi (ODMCS)" },
          { title: "Yağ kayıt defteri (Oil Record Book)" },
          { title: "Slop tank yönetimi" },
          { title: "Özel deniz alanları ve deşarj kuralları" },
        ],
      },
      {
        title: "Emisyon Kontrolü (Annex VI)",
        description: "SOx, NOx ve GHG düzenlemeleri",
        subTopics: [
          { title: "Kükürt limitleri (global 0.50%, ECA 0.10%)" },
          { title: "Egzoz gazı yıkama (scrubber) sistemi" },
          { title: "NOx Tier I, II, III standartları" },
          { title: "SCR (seçici katalitik indirgeme)" },
          { title: "EGR (egzoz gazı resirkülasyonu)" },
          { title: "EEDI ve EEXI gereklilikleri" },
          { title: "CII (Karbon Yoğunluğu Göstergesi)" },
        ],
      },
      {
        title: "Balast Su Yönetimi",
        description: "BWM Convention ve arıtma teknolojileri",
        subTopics: [
          { title: "Balast su sözleşmesi (BWM Convention)" },
          { title: "D-1 ve D-2 standartları" },
          { title: "Balast su arıtma sistemleri (BWTS)" },
          { title: "UV, elektroliz ve filtrasyon yöntemleri" },
          { title: "Balast su değişim bölgeleri" },
          { title: "Balast su kayıt defteri" },
        ],
      },
      {
        title: "Atık Yönetimi",
        description: "Çöp ve pis su yönetimi",
        subTopics: [
          { title: "Çöp yönetim planı (Garbage Management Plan)" },
          { title: "Çöp sınıflandırma ve kayıt" },
          { title: "Incinerator operasyonu" },
          { title: "Pis su arıtma tesisi (STP)" },
          { title: "Liman atık alım tesisi kullanımı" },
        ],
      },
    ],
    resources: [
      { title: "Hesaplamalar", href: "/machine/environment-machine/calculations" },
      { title: "Formüller", href: "/machine/environment-machine/formulas" },
    ],
  },

  erm: {
    title: "Engine Resource Management (ERM)",
    description: "Makine dairesi kaynak yönetimi, liderlik, iletişim ve takım çalışması.",
    keyTopics: [
      {
        title: "ERM Temelleri",
        description: "Kaynak yönetimi kavramı ve önemi",
        subTopics: [
          { title: "ERM nedir ve neden gereklidir" },
          { title: "BRM'den ERM'ye geçiş" },
          { title: "İnsan faktörü ve hata yönetimi" },
          { title: "Situational awareness (durumsal farkındalık)" },
          { title: "STCW ERM gereklilikleri" },
        ],
      },
      {
        title: "Liderlik ve İletişim",
        description: "Makine dairesi ekip yönetimi",
        subTopics: [
          { title: "Liderlik tarzları ve durumsal liderlik" },
          { title: "Etkili iletişim teknikleri" },
          { title: "Kapalı döngü iletişim (closed-loop)" },
          { title: "Kültürler arası iletişim" },
          { title: "Asertif davranış ve otorite gradyanı" },
        ],
      },
      {
        title: "Karar Verme ve Problem Çözme",
        description: "Yapılandırılmış karar süreçleri",
        subTopics: [
          { title: "DECIDE modeli" },
          { title: "Risk tabanlı karar verme" },
          { title: "Zaman baskısı altında karar" },
          { title: "Hata zincirleri ve kırma noktaları" },
          { title: "Stres ve yorgunluk etkisi" },
        ],
      },
      {
        title: "Takım Çalışması",
        description: "Ekip koordinasyonu ve brifingler",
        subTopics: [
          { title: "Takım oluşturma ve rol dağılımı" },
          { title: "Brifing ve debrifing teknikleri" },
          { title: "Yük paylaşımı (workload management)" },
          { title: "Çapraz kontrol ve karşılıklı izleme" },
          { title: "Geri bildirim kültürü" },
        ],
      },
      {
        title: "Kaza Analizi ve Dersler",
        description: "Gerçek makine dairesi kazaları",
        subTopics: [
          { title: "Makine dairesi yangın kaza örnekleri" },
          { title: "Blackout senaryoları ve kök nedenler" },
          { title: "Kapalı alan kazaları" },
          { title: "İletişim kopukluğuna bağlı olaylar" },
          { title: "Derslerin operasyona yansıtılması" },
        ],
      },
    ],
    resources: [
      { title: "Hesaplamalar", href: "/machine/erm/calculations" },
      { title: "Formüller", href: "/machine/erm/formulas" },
    ],
  },

  "energy-efficiency": {
    title: "Enerji Verimliliği",
    description: "EEDI, EEXI, CII hesaplamaları, SEEMP ve operasyonel optimizasyon.",
    keyTopics: [
      {
        title: "Enerji Verimliliği Çerçevesi",
        description: "IMO düzenlemeleri ve hedefler",
        subTopics: [
          { title: "IMO GHG stratejisi ve hedefler" },
          { title: "EEDI (Enerji Verimliliği Tasarım İndeksi)" },
          { title: "EEXI (Mevcut Gemi Enerji Verimliliği İndeksi)" },
          { title: "CII (Karbon Yoğunluğu Göstergesi)" },
          { title: "CII derecelendirme sistemi (A–E)" },
          { title: "SEEMP (Gemi Enerji Verimliliği Yönetim Planı)" },
        ],
      },
      {
        title: "Operasyonel Verimlilik",
        description: "Yakıt tasarrufu ve performans izleme",
        subTopics: [
          { title: "Hız optimizasyonu (slow steaming)" },
          { title: "Trim optimizasyonu" },
          { title: "Rota optimizasyonu (weather routing)" },
          { title: "Fouling etkisi ve tekne temizliği" },
          { title: "Pervane parlatma ve kavitasyon kontrolü" },
          { title: "Yakıt tüketimi izleme ve raporlama" },
        ],
      },
      {
        title: "Teknik Verimlilik Çözümleri",
        description: "Donanım ve sistem iyileştirmeleri",
        subTopics: [
          { title: "Atık ısı geri kazanım (WHRS)" },
          { title: "Hava yağlama (air lubrication) sistemi" },
          { title: "Rüzgâr destekli itme (rotor sail, wing sail)" },
          { title: "Değişken frekanslı tahrik (VFD) kullanımı" },
          { title: "LED aydınlatma dönüşümü" },
          { title: "Pervane enerji tasarrufu cihazları" },
        ],
      },
      {
        title: "Veri Toplama ve Raporlama",
        description: "DCS, MRV ve EU ETS uyumu",
        subTopics: [
          { title: "IMO DCS (veri toplama sistemi)" },
          { title: "EU MRV regülasyonu" },
          { title: "EU ETS (emisyon ticaret sistemi)" },
          { title: "Yakıt tüketimi veri doğrulama" },
          { title: "Yıllık verimlilik raporu hazırlama" },
        ],
      },
    ],
    resources: [
      { title: "Hesaplamalar", href: "/machine/energy-efficiency/calculations" },
      { title: "Formüller", href: "/machine/energy-efficiency/formulas" },
    ],
  },
};
