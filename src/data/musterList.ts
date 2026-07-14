/**
 * Eğitim amaçlı, konvansiyonel yük gemisi için örnek acil durum organizasyonu.
 *
 * SOLAS III/8 ve III/37, role cetvelinde bulunması gereken asgari başlıkları
 * belirler; belirli bir rütbeye evrensel ve değişmez bir görev atamaz. Nihai
 * istasyonlar, ekipler, haberleşme kanalları ve yedek kişiler geminin onaylı
 * SMS'i, LSA/Fire Control Plan'ı, SOPEP/SMPEP'i, asgari emniyetli donatım belgesi
 * ve fiili personel kadrosuna göre Kaptan tarafından düzenlenir.
 *
 * Bu veri, uygulamadaki mevcut personel rütbelerini korur. Bir rütbe altında
 * birden fazla kişi varsa (AB-1, AB-2, OS gibi), gemide asılan gerçek cetvelde
 * her kişi adı, kamarası, istasyonu ve yedeğiyle ayrı satırda gösterilmelidir.
 */

export const MUSTER_EMERGENCY_IDS = [
  "general",
  "fire",
  "abandon",
  "mob",
  "flooding",
  "enclosed-space",
  "pollution",
] as const;

export type MusterEmergencyId = (typeof MUSTER_EMERGENCY_IDS)[number];

export type MusterSignalClass = "solas" | "master-order" | "ship-specific";

export type MusterEmergency = {
  id: MusterEmergencyId;
  title: string;
  shortTitle: string;
  signalClass: MusterSignalClass;
  signalLabel: string;
  signal: string;
  description: string;
  firstActions: string[];
  caution: string;
  reference: string;
};

export type MusterDuty = {
  /** Alarmdan sonra gidilecek operasyon/görev yeri. */
  station: string;
  /** Seçili olay için kişinin bağlı olduğu acil durum ekibi. */
  team: string;
  /** Bu görev sırasında rapor verilecek kişi veya istasyon. */
  reportsTo: string;
  /** Sıralı, uygulanabilir görev adımları. */
  actions: string[];
  /** Yalnızca gemide atanmış ve eğitimli personel tarafından alınacak donanım. */
  equipment?: string[];
};

export type MusterDutyMap = { [K in MusterEmergencyId]: MusterDuty };

export type MusterAssignment = {
  id: string;
  roleSlug: string;
  rank: string;
  billet: string;
  /** Genel acil durum alarmında doğrudan rapor verilecek örnek başlangıç yeri. */
  initialStation: string;
  roleNote?: string;
  substitute?: string;
  readinessResponsibility?: string;
  duties: MusterDutyMap;
};


export const musterEmergencies: MusterEmergency[] = [
  {
    id: "general",
    title: "Genel Acil Durum",
    shortTitle: "Genel Alarm",
    signalClass: "solas",
    signalLabel: "SOLAS genel acil durum alarmı",
    signal:
      "Gemi düdüğü/sireni ve dahili alarm sistemiyle yedi veya daha fazla kısa, ardından bir uzun ses; PA anonsu olayın türünü ve yerini bildirir.",
    description:
      "Personel, işini emniyete alarak kendi role cetvelinde yazılı ilk istasyona gider, uygun PPE'yi kuşanır, yoklama veya durum raporu verir ve komuta zincirine girer.",
    firstActions: [
      "Yapılan işi emniyetli biçimde durdur; sıcak işi, yakıt transferini ve açık ekipmanı prosedüre göre emniyete al.",
      "Role cetvelinde yazılı istasyona en kısa emniyetli yoldan git; kamaraya yalnızca cetvel veya anons bunu gerektiriyorsa uğra.",
      "Telsiz disiplinini koru, kişi sayısı ve mahal durumu hakkında yalnızca doğrulanmış bilgi raporla.",
    ],
    caution:
      "Genel alarm, tek başına gemiyi terk emri değildir. Gemi yalnızca Kaptanın açık emriyle terk edilir.",
    reference: "SOLAS III/6.4, III/8 ve III/37; LSA Code 7.2",
  },
  {
    id: "fire",
    title: "Yangın / Patlama",
    shortTitle: "Yangın",
    signalClass: "ship-specific",
    signalLabel: "Gemiye özel yangın alarmı + genel alarm/PA",
    signal:
      "Yangın algılama veya lokal alarmı takiben, tam personel müdahalesi gerekiyorsa genel acil durum alarmı ve PA ile yangının yeri ve türü bildirilir.",
    description:
      "Köprüüstü komutayı, olay yeri komutanı saha kontrolünü, makine ekibi enerji ve izolasyonu; saldırı, yedek, sınır soğutma ve ilk yardım ekipleri kendi görevlerini yürütür.",
    firstActions: [
      "Yangını gören kişi alarmı yükseltir, yeri ve yanan maddeyi köprüüstüne bildirir; kaçış yolunu riske atmadan uygun ilk müdahaleyi dener.",
      "Kapılar kapatılır; havalandırma, yakıt ve elektrik izolasyonu yalnızca yetkili komut ve gemi planına göre yapılır.",
      "BA giriş ekibi, kontrol levhası kurulmadan, haberleşme ve yedek ekip hazır olmadan mahalle girmez.",
    ],
    caution:
      "Sabit CO₂ veya başka bir total flooding sistemi, mahal boşaltılıp personel hesabı doğrulanmadan ve Kaptan/Baş Mühendis prosedürü uygulanmadan boşaltılmaz.",
    reference: "SOLAS II-2; SOLAS III/37.3.7–3.8; geminin Fire Control Plan ve SMS'i",
  },
  {
    id: "abandon",
    title: "Gemiyi Terk",
    shortTitle: "Terk",
    signalClass: "master-order",
    signalLabel: "Yalnızca Kaptanın açık emri",
    signal:
      "Genel alarmın ardından Kaptanın PA, telsiz veya sözlü olarak verdiği açık “Gemiyi terk et / Abandon ship” emri. Genel alarm tek başına terk emri değildir.",
    description:
      "Personel atanmış filika/can salı istasyonlarına gider; kişi hesabı, donatım, haberleşme cihazları, su/erzak, motor ve indirme düzeni kontrol edilir.",
    firstActions: [
      "Uygun giysi, can yeleği ve gerekiyorsa immersion suit giy; cetvelde atanan survival craft istasyonuna git.",
      "Filika/can salı amiri kişi hesabını, kapasiteyi, tıpa/painter/motor ve indirme yolunun açıklığını doğrular.",
      "EPIRB, SART/AIS-SART, taşınabilir GMDSS VHF ve gemiyi terk malzemeleri yalnızca atanmış kişilerce alınır.",
    ],
    caution:
      "Can kurtarma vasıtası, Kaptanın indirme/terk emri ve istasyon amirinin emniyet kontrolü olmadan suya indirilmez veya serbest bırakılmaz.",
    reference: "SOLAS III/8, III/10, III/19 ve III/37; geminin LSA Planı",
  },
  {
    id: "mob",
    title: "Denize Adam Düşmesi",
    shortTitle: "MOB",
    signalClass: "ship-specific",
    signalLabel: "Derhal köprüüstü çağrısı + gemiye özel alarm/PA",
    signal:
      "“Man overboard, port/starboard side” çağrısı, MOB işaretlemesi ve geminin SMS'inde tanımlanan alarm/PA. Üç uzun düdük yaygın bir şirket uygulamasıdır; evrensel SOLAS işareti değildir.",
    description:
      "İlk gören kişi teması kaybetmez; köprüüstü manevra ve haberleşmeyi, güverte ekibi işaretleme ve kurtarma vasıtasını, makine ekibi manevra hazırlığını yürütür.",
    firstActions: [
      "Yüksek sesle tarafı bildir; ışıklı/dumanlı can simidini at ve kişiyi kesintisiz işaret ederek gözcülüğü devretmeden sürdür.",
      "Köprüüstü MOB noktasını işaretler, uygun kurtarma manevrasını başlatır ve yakın gemi/VTS/SAR bildirim ihtiyacını değerlendirir.",
      "Kurtarma botu yalnızca hava/deniz, gemi hızı ve indirme riski değerlendirildikten sonra eğitimli ekip ile hazırlanır.",
    ],
    caution:
      "Kurtarma yöntemi, gemiye özel “sudan kişi kurtarma planı”na göre seçilir; bot indirmek her koşulda en güvenli seçenek değildir.",
    reference: "SOLAS III/17-1; MSC.1/Circ.1447; geminin Recovery Plan ve SMS'i",
  },
  {
    id: "flooding",
    title: "Çatışma / Su Alma",
    shortTitle: "Su Alma",
    signalClass: "ship-specific",
    signalLabel: "Genel alarm + mahal bilgili PA",
    signal:
      "Gemiye özel alarm/PA ile hasarlı mahal bildirilir; geniş çaplı müdahalede genel acil durum alarmı kullanılır.",
    description:
      "Hasar yeri belirlenir, watertight/weathertight bütünlük sağlanır, tank ve sintine seviyeleri izlenir; pompalar, stabilite ve yapısal risk birlikte yönetilir.",
    firstActions: [
      "Hasarlı mahalle kontrolsüz girme; su seviyesi, giriş hızı, sınırlar ve personel durumu emniyetli noktadan raporlanır.",
      "Watertight kapılar, scupper/valf/menfezler ve açıklıklar hasar kontrol planına göre emniyete alınır.",
      "Ballast veya yük transferi yalnızca Kaptan/Baş Mühendis kararı ve stabilite/gerilme değerlendirmesiyle yapılır.",
    ],
    caution:
      "Yanlış valf/pompa işlemi progresif su almayı veya serbest yüzey etkisini artırabilir; rastgele transfer yapılmaz.",
    reference: "SOLAS II-1; SOLAS III/37.3.1; Damage Control Plan/Booklet ve SMS",
  },
  {
    id: "enclosed-space",
    title: "Kapalı Mahal Kurtarma",
    shortTitle: "Kapalı Mahal",
    signalClass: "ship-specific",
    signalLabel: "Lokal imdat çağrısı + gemiye özel alarm/PA",
    signal:
      "Köprüüstüne acil çağrı yapılarak mahal ve kazazede sayısı bildirilir; SMS'e göre genel alarm/PA ile eğitimli kurtarma ekibi çağrılır.",
    description:
      "Mahale plansız ikinci giriş yapılmaz. İzolasyon, zorunlu havalandırma, kalibre gaz ölçümü, giriş kontrolü, BA/kaçış ve kurtarma donanımı birlikte hazırlanır.",
    firstActions: [
      "Kazazedeyi görmek, solunabilir atmosfer olduğu anlamına gelmez; uygun BA ve kurtarma planı olmadan içeri girme.",
      "Tüm enerji, boru hattı, valf, hareketli parça ve inert gaz kaynaklarını LOTO/blanking prosedürüne göre izole et.",
      "Girişçi, yedek girişçi, dış gözcü, haberleşme, kurtarma tertibatı ve ilk yardım hazır olmadan kurtarma girişini başlatma.",
    ],
    caution:
      "Kapalı mahal kazalarında plansız kurtarıcı girişleri çoklu can kaybının başlıca nedenidir; yalnızca eğitimli ve donanımlı ekip girer.",
    reference: "SOLAS XI-1/7; ISM Code 8; A.1050(27), as amended; geminin enclosed-space prosedürü",
  },
  {
    id: "pollution",
    title: "Petrol / Yakıt Döküntüsü",
    shortTitle: "Kirlilik",
    signalClass: "ship-specific",
    signalLabel: "Köprüüstü bildirimi + SOPEP/SMPEP çağrısı",
    signal:
      "Döküntü derhal köprüüstüne bildirilir; transfer acil durdurma ve geminin SOPEP/SMPEP alarm/PA prosedürü uygulanır.",
    description:
      "Kaynak durdurulur, bordaya çıkış engellenir, scupperlar kapatılır, emiciler/boomlar serilir ve gerekli kıyı/şirket bildirimleri kayıt altına alınır.",
    firstActions: [
      "Transferi veya sızıntı kaynağını emniyetle durdur; alarm ver ve döküntünün denize ulaşmasını öncelikle engelle.",
      "Scupperları kapat, damlama tavaları ve emicileri yerleştir; kimyasal dispersantı yetkisiz kullanma.",
      "Miktar, ürün, yer, denize çıkış, hava/akıntı ve alınan önlemleri doğrulanmış şekilde kaydet ve raporla.",
    ],
    caution:
      "Bildirimi geciktirmek veya miktarı tahmine dayalı kesin sayı gibi raporlamak ikinci bir uygunsuzluk yaratır; SOPEP iletişim zinciri izlenir.",
    reference: "MARPOL Annex I/37; SOPEP/SMPEP; ISM Code 8 ve şirket SMS'i",
  },
];

export const musterAssignments: MusterAssignment[] = [
  {
    id: "master",
    roleSlug: "kaptan",
    rank: "Kaptan (Master)",
    billet: "Emergency Commander",
    initialStation: "Köprüüstü / Acil Durum Komuta Merkezi",
    substitute: "Birinci Zabit; komuta devri köprüüstü ekibine açıkça duyurulur.",
    readinessResponsibility:
      "Role cetvelini seferden önce onaylar; personel değişikliğinde revize eder ve tatbikatların SMS'e göre yürütülmesini sağlar.",
    duties: {
      general: {
        station: "Köprüüstü",
        team: "Komuta ve Haberleşme",
        reportsTo: "Şirket / kıyı makamları (gerektiğinde)",
        actions: [
          "Olayın türünü, yerini ve personel durumunu doğrulatır; gerekli alarm ve PA anonsunu emreder.",
          "Köprüüstü, saha ve makine komuta zincirini kurar; kişi hesabı ve kritik sistem raporlarını toplar.",
          "Seyir, liman, şirket, VTS/SAR ve acil yardım kararlarını olay günlüğüyle birlikte yönetir.",
        ],
        equipment: ["GMDSS", "PA/genel alarm", "SMS acil durum kontrol listeleri"],
      },
      fire: {
        station: "Köprüüstü",
        team: "Köprüüstü Komuta ve Haberleşme",
        reportsTo: "Şirket / kıyı itfaiyesi veya SAR (gerektiğinde)",
        actions: [
          "Yangın yeri, sınıfı, duman yayılımı ve personel hesabına göre müdahale stratejisini onaylar.",
          "Manevra, havalandırma/yakıt durdurma, genel alarm ve dış yardım kararlarını verir.",
          "Sabit söndürme sisteminin ancak mahal tahliye ve izolasyon kontrolleri tamamlandıktan sonra kullanılmasını emreder.",
        ],
        equipment: ["Fire Control Plan", "GMDSS", "Olay kayıt formu"],
      },
      abandon: {
        station: "Köprüüstü, ardından atanmış survival craft",
        team: "Köprüüstü ve Distress Haberleşme",
        reportsTo: "MRCC / kurtarma birimleri",
        actions: [
          "Tehlike çağrısını ve pozisyon güncellemesini yaptırır; yalnızca gerekli olduğunda açık gemiyi terk emrini verir.",
          "Kişi hesabı, craft hazırlığı, deniz/hava ve geminin sürüklenme durumunu doğrulatır.",
          "Gerekli seyir/GMDSS kayıt ve evrakını alır; mümkün olduğu ölçüde gemiyi en son terk eder.",
        ],
        equipment: ["Taşınabilir VHF", "Gemiyi terk kontrol listesi", "Gerekli gemi evrakı"],
      },
      mob: {
        station: "Köprüüstü",
        team: "MOB Köprüüstü Komuta",
        reportsTo: "SAR/VTS ve şirket (duruma göre)",
        actions: [
          "MOB manevrasını, hız azaltmayı ve pervane riskini yönetir; sürekli gözcü ve konum kaydını doğrular.",
          "Kurtarma botu, pilot ladder, scramble net veya bordadan alma seçenekleri arasında risk temelli karar verir.",
          "Tıbbi tahliye ve dış yardım ihtiyacını değerlendirir; olay zaman çizelgesini korur.",
        ],
        equipment: ["MOB/Recovery Plan", "GMDSS", "Manevra verileri"],
      },
      flooding: {
        station: "Köprüüstü",
        team: "Komuta, Stabilite ve Kayıt",
        reportsTo: "Şirket acil durum ekibi / kıyı makamları",
        actions: [
          "Hasar yerini, su giriş hızını, watertight bütünlüğü ve personel durumunu doğrulatır.",
          "Damage stability, trim, gerilme ve progresif su alma riskine göre transfer/manevra kararlarını onaylar.",
          "Yardım, sığınma limanı veya gemiyi terk eşiğini belirler; düzenli durum raporu yayımlar.",
        ],
        equipment: ["Damage Control Plan", "Stabilite bilgisi", "GMDSS"],
      },
      "enclosed-space": {
        station: "Köprüüstü",
        team: "Komuta ve Tıbbi Haberleşme",
        reportsTo: "Telemedical/MRCC ve şirket (gerektiğinde)",
        actions: [
          "Plansız girişleri durdurur; olay yeri komutanı, kurtarma ekibi ve tıbbi desteği aktive eder.",
          "Mahalin izolasyon, havalandırma ve atmosfer ölçüm durumunu raporla doğrulatır.",
          "Dış profesyonel kurtarma veya medikal tahliye ihtiyacını değerlendirir ve olay kaydını yönetir.",
        ],
        equipment: ["Enclosed-space rescue plan", "GMDSS/telemedical bağlantı"],
      },
      pollution: {
        station: "Köprüüstü / SOPEP Komuta Merkezi",
        team: "SOPEP Komuta, Haberleşme ve Kayıt",
        reportsTo: "Şirket, terminal, liman ve yetkili makamlar",
        actions: [
          "Kaynağın durdurulmasını ve tüm transferlerin emniyete alınmasını emreder.",
          "SOPEP/SMPEP bildirim zincirini başlatır; ürün, miktar aralığı ve denize çıkış durumunu doğrulatır.",
          "Müdahale güvenliğini, dış destek ihtiyacını ve resmi kayıtların korunmasını sağlar.",
        ],
        equipment: ["SOPEP/SMPEP", "Acil iletişim listesi", "Olay kayıt formu"],
      },
    },
  },
  {
    id: "chief-officer",
    roleSlug: "birinci-zabit",
    rank: "Birinci Zabit (Chief Officer / C/O)",
    billet: "On-Scene Commander",
    initialStation: "Yangın Kontrol İstasyonu / Atanmış Muster Station",
    substitute: "İkinci Zabit veya Kaptanın role cetvelinde belirlediği zabit.",
    readinessResponsibility:
      "Örnek organizasyonda güverte LSA/FFA hazırlığının sorumlu zabiti; fiili atama gemi SMS'i ve Kaptan emriyle belirlenir.",
    duties: {
      general: {
        station: "Acil Durum Kontrol İstasyonu",
        team: "Güverte Acil Müdahale",
        reportsTo: "Kaptan",
        actions: [
          "Personel hesabını ve ekip hazır oluş raporlarını toplar; eksik/yaralı kişileri derhal köprüüstüne bildirir.",
          "Olay yeri keşfini, emniyet çevresini ve giriş kontrol noktasını kurar.",
          "Saha ekiplerini Kaptanın stratejisine göre görevlendirir ve düzenli SITREP verir.",
        ],
        equipment: ["Taşınabilir UHF", "Muster list", "Saha kontrol listesi"],
      },
      fire: {
        station: "Yangın Kontrol İstasyonu / olay yeri güvenli tarafı",
        team: "Yangın Saha Komuta",
        reportsTo: "Kaptan",
        actions: [
          "Yangının yeri, sınıfı, erişim ve duman sınırını keşif ekibiyle doğrular.",
          "Saldırı, yedek, boundary cooling, tahliye ve ilk yardım ekiplerini konuşlandırır.",
          "BA giriş süreleri, su beslemesi, izolasyon ve geri çekilme şartlarını izleyerek köprüüstüne raporlar.",
        ],
        equipment: ["Fire Control Plan", "Taşınabilir UHF", "Termal kamera (varsa)"],
      },
      abandon: {
        station: "Atanmış survival craft istasyonu",
        team: "Survival Craft ve Muster",
        reportsTo: "Kaptan",
        actions: [
          "Tüm craft istasyonlarından kişi hesabı ve hazırlık raporu alır.",
          "Can kurtarma vasıtalarının denize indirme yolunu, kapasitesini ve yükleme sırasını kontrol eder.",
          "Kaptan emrinden sonra istasyon amirleriyle indirme/ayrılma işlemini koordine eder.",
        ],
        equipment: ["Can yeleği/immersion suit", "Taşınabilir UHF", "LSA kontrol listesi"],
      },
      mob: {
        station: "Kurtarma istasyonu / emniyetli güverte",
        team: "Sudan Kişi Kurtarma",
        reportsTo: "Kaptan",
        actions: [
          "Kurtarma botu veya alternatif bordadan alma düzenini sahada hazırlar.",
          "Pervane, gemi hareketi, serbest borda ve deniz durumuna göre emniyetli yaklaşma tarafını bildirir.",
          "Kazazedenin güverteye alınması ve ilk yardıma devrini koordine eder.",
        ],
        equipment: ["Recovery equipment", "Taşınabilir UHF", "Termal koruyucu malzeme"],
      },
      flooding: {
        station: "Hasar kontrol istasyonu / olay yeri güvenli sınırı",
        team: "Hasar Kontrol",
        reportsTo: "Kaptan",
        actions: [
          "Hasar, çatlak, su seviyesi ve komşu mahallere yayılımı emniyetli keşifle belirler.",
          "Watertight kapatma, geçici tıkaç/şoring ve erişim kontrolünü yönetir.",
          "Periyodik sounding ve su giriş hızı raporlarını köprüüstüne iletir.",
        ],
        equipment: ["Damage Control Plan", "Taşınabilir UHF", "Shoring/plugging kit"],
      },
      "enclosed-space": {
        station: "Kapalı mahal kurtarma staging alanı",
        team: "Kapalı Mahal Saha Komuta",
        reportsTo: "Kaptan",
        actions: [
          "Giriş kontrol noktası, tehlike alanı ve kurtarma planını kurar; plansız girişi engeller.",
          "İzolasyon, havalandırma, gaz ölçümü, BA ekibi ve yedek ekibin hazır olduğunu doğrular.",
          "Kurtarma girişini, kazazedenin çıkarılmasını ve ilk yardıma devri yönetir.",
        ],
        equipment: ["Rescue plan", "Taşınabilir UHF", "Entry permit/gas log"],
      },
      pollution: {
        station: "Ana güverte / döküntünün rüzgâr üstü tarafı",
        team: "SOPEP Güverte Müdahale",
        reportsTo: "Kaptan",
        actions: [
          "Döküntü kaynağını ve bordaya çıkış yollarını belirler; sıcak bölgeyi sınırlar.",
          "Scupper kapatma, emici/boom serme ve güvenli geri toplama işini yönetir.",
          "Kullanılan malzeme, geri toplanan atık ve kalan risk hakkında köprüüstüne rapor verir.",
        ],
        equipment: ["SOPEP locker", "Kimyasala uygun PPE", "Taşınabilir UHF"],
      },
    },
  },
  {
    id: "second-officer",
    roleSlug: "ikinci-zabit",
    rank: "İkinci Zabit (Second Officer / 2/O)",
    billet: "Communications & Navigation Officer",
    initialStation: "Köprüüstü / GMDSS İstasyonu",
    substitute: "Role cetvelinde adı yazılı, geçerli GOC sahibi diğer zabit.",
    duties: {
      general: {
        station: "Köprüüstü / GMDSS",
        team: "Komuta ve Haberleşme",
        reportsTo: "Kaptan",
        actions: [
          "Gemi pozisyonu, rota, trafik ve meteoroloji bilgisini hazırlar; seyir emniyetini sürdürür.",
          "GMDSS'i hazırlar, olay günlüğünü zaman damgalı tutar ve gelen saha raporlarını kaydeder.",
          "Kaptanın emriyle VTS, kıyı, şirket ve diğer gemilerle haberleşmeyi yürütür.",
        ],
        equipment: ["GMDSS", "Seyir cihazları", "Olay kayıt formu"],
      },
      fire: {
        station: "Köprüüstü / GMDSS",
        team: "Köprüüstü Komuta ve Haberleşme",
        reportsTo: "Kaptan",
        actions: [
          "Yangın raporlarını ve personel hesabını zaman damgalı kaydeder.",
          "Gemi manevrası, emniyet yayınları ve dış yardım haberleşmesini Kaptan talimatıyla yürütür.",
          "Yangın yerini Fire Control Plan üzerinde işaretler; değişen durumu köprüüstü ekibine aktarır.",
        ],
        equipment: ["GMDSS", "Fire Control Plan kopyası", "Olay günlüğü"],
      },
      abandon: {
        station: "Köprüüstü, ardından atanmış survival craft",
        team: "Köprüüstü ve Distress Haberleşme",
        reportsTo: "Kaptan",
        actions: [
          "Kaptan emriyle DSC/MAYDAY gönderir ve sürekli distress watch sürdürür.",
          "EPIRB, SART/AIS-SART ve taşınabilir GMDSS VHF'lerin atanmış kişilerce alındığını doğrular.",
          "Son pozisyon, saat, rota/sürat ve hava bilgisini survival craft amirlerine iletir.",
        ],
        equipment: ["GMDSS", "Taşınabilir VHF", "EPIRB/SART kontrolü"],
      },
      mob: {
        station: "Köprüüstü",
        team: "MOB Köprüüstü Komuta",
        reportsTo: "Kaptan",
        actions: [
          "MOB noktasını işaretler; zaman, konum, taraf ve ilk manevrayı kaydeder.",
          "VHF emniyet/urgency trafiği ile VTS/SAR bildirimlerini Kaptan emriyle yapar.",
          "Gözcü, kurtarma istasyonu ve makineyle kesintisiz haberleşmeyi sağlar.",
        ],
        equipment: ["ECDIS/GPS MOB işlevi", "GMDSS", "Taşınabilir UHF"],
      },
      flooding: {
        station: "Köprüüstü",
        team: "Komuta, Stabilite ve Kayıt",
        reportsTo: "Kaptan",
        actions: [
          "Hasar/sounding raporlarını Damage Control Plan üzerinde zaman sırasıyla işler.",
          "Yakın emniyetli sular, trafik, hava ve liman seçenekleri için seyir bilgisini hazırlar.",
          "Kaptan emriyle urgency/distress ve şirket bildirimini yürütür.",
        ],
        equipment: ["Damage Control Plan", "GMDSS", "Seyir yayınları"],
      },
      "enclosed-space": {
        station: "Köprüüstü / haberleşme istasyonu",
        team: "Komuta ve Tıbbi Haberleşme",
        reportsTo: "Kaptan",
        actions: [
          "Olay saati, mahal, girişçi/kazazede sayısı ve atmosfer ölçümlerini kaydeder.",
          "Telemedical advice, MRCC veya kıyı acil servis haberleşmesini Kaptan emriyle kurar.",
          "Saha komutanı ile köprüüstü arasındaki yedek haberleşmeyi sürdürür.",
        ],
        equipment: ["GMDSS/telefon", "Medical guide", "Olay günlüğü"],
      },
      pollution: {
        station: "Köprüüstü / GMDSS",
        team: "SOPEP Komuta, Haberleşme ve Kayıt",
        reportsTo: "Kaptan",
        actions: [
          "SOPEP iletişim listesine göre terminal, acente, şirket ve makam çağrılarını hazırlar.",
          "Ürün, tahmini aralık, konum, hava/akıntı ve alınan önlemleri zaman damgalı kaydeder.",
          "Resmî bildirimleri yalnızca Kaptan onayıyla gönderir ve kopyalarını saklar.",
        ],
        equipment: ["SOPEP/SMPEP", "GMDSS/telefon", "Bildirim formları"],
      },
    },
  },
  {
    id: "third-officer",
    roleSlug: "ucuncu-zabit",
    rank: "Üçüncü Zabit (Third Officer / 3/O)",
    billet: "Fire & Rescue Team Officer",
    initialStation: "Acil Durum Ekipman İstasyonu",
    substitute: "Role cetvelinde belirlenen diğer güverte zabiti.",
    readinessResponsibility:
      "Örnek organizasyonda LSA/FFA periyodik kontrollerini sorumlu zabit adına takip eder; nihai sorumluluk ataması SMS'te yazılıdır.",
    duties: {
      general: {
        station: "Acil durum ekipman istasyonu",
        team: "Güverte Acil Müdahale",
        reportsTo: "Birinci Zabit",
        actions: [
          "BA, fire suit, telsiz ve kurtarma donanımının hazır oluşunu kontrol eder.",
          "Atanmış ekip üyelerini ve yedeklerini sayar; eksikleri saha komutanına bildirir.",
          "Olay türüne göre saldırı veya kurtarma ekibini brief eder.",
        ],
        equipment: ["Fireman's outfit", "SCBA", "Taşınabilir UHF"],
      },
      fire: {
        station: "BA kontrol noktası / olay yeri giriş sınırı",
        team: "Yangın Saldırı ve Yedek",
        reportsTo: "Birinci Zabit",
        actions: [
          "Saldırı ekibini tehlike, giriş rotası, geri çekilme işareti ve haberleşme konusunda brief eder.",
          "Görevli ise BA ekibine liderlik eder; kontrollü arama/söndürme yapar ve düzenli durum raporu verir.",
          "Düşük basınç, haberleşme kaybı, ısı artışı veya yapı riski oluştuğunda ekibi geri çeker.",
        ],
        equipment: ["SCBA", "Fireman's outfit", "UHF", "Termal kamera (varsa)"],
      },
      abandon: {
        station: "Atanmış survival craft istasyonu",
        team: "Survival Craft ve Muster",
        reportsTo: "Birinci Zabit / craft amiri",
        actions: [
          "Motor, tıpa, yakıt, painter, serbest bırakma ve embarkation düzenini kontrol eder.",
          "LSA envanterini ve taşınacak ilave ekipmanı doğrular.",
          "Craft amirinin emriyle çalıştırma/indirme hazırlığını yönetir.",
        ],
        equipment: ["LSA checklist", "Taşınabilir UHF", "Can yeleği/immersion suit"],
      },
      mob: {
        station: "Kurtarma botu istasyonu",
        team: "Sudan Kişi Kurtarma",
        reportsTo: "Birinci Zabit",
        actions: [
          "Görevli coxswain ise bot, motor, yakıt, dümen, haberleşme ve ekip PPE'sini kontrol eder.",
          "İndirme riski ve yaklaşma planını saha komutanıyla teyit eder.",
          "Kazazedeyi sudan alma, ilk değerlendirme ve gemiye geri transferi yönetir.",
        ],
        equipment: ["Rescue boat PPE", "Taşınabilir VHF", "Recovery sling"],
      },
      flooding: {
        station: "Hasar kontrol ekipman istasyonu",
        team: "Hasar Kontrol",
        reportsTo: "Birinci Zabit",
        actions: [
          "Emniyetli keşif ekibini brief eder; gaz/elektrik/yapısal tehlikeleri değerlendirir.",
          "Sınırları, su seviyesini ve kullanılabilir erişim yollarını raporlar.",
          "Shoring, soft patch veya pompa ekibini saha komutanı talimatıyla konuşlandırır.",
        ],
        equipment: ["Damage control kit", "UHF", "Uygun PPE"],
      },
      "enclosed-space": {
        station: "Kapalı mahal giriş kontrol noktası",
        team: "BA Kurtarma ve Giriş Kontrol",
        reportsTo: "Birinci Zabit",
        actions: [
          "Giriş rotası, atmosfer, izolasyon ve kazazede çıkarma yöntemini ekip ile doğrular.",
          "Görevli ise BA kurtarma ekibine liderlik eder; sürekli hat/telsiz irtibatı sürdürür.",
          "Kazazedeyi uygun sedye/harness ile çıkarır ve ilk yardım ekibine teslim eder.",
        ],
        equipment: ["SCBA", "Rescue harness/stretcher", "UHF", "Kişisel gaz ölçer"],
      },
      pollution: {
        station: "SOPEP locker / sıcak bölge sınırı",
        team: "SOPEP Güverte Müdahale",
        reportsTo: "Birinci Zabit",
        actions: [
          "SOPEP donanımını dağıtır ve ekip PPE'sinin ürüne uygunluğunu kontrol eder.",
          "Döküntünün yayılımını, bordaya ulaşmasını ve ateşleme riskini izler.",
          "Toplanan atığın etiketlenmesi ve geçici depolanmasını denetler.",
        ],
        equipment: ["SOPEP kit", "Kimyasal PPE", "UHF"],
      },
    },
  },
  {
    id: "fourth-officer",
    roleSlug: "dorduncu-zabit",
    rank: "Dördüncü Zabit (Fourth Officer / 4/O)",
    billet: "Muster, BA Control & LSA/FFA Support",
    initialStation: "Muster Kontrol / Atanmış Ekipman İstasyonu",
    roleNote: "Her gemide bulunmaz; yoksa görevler isimli yedeklere dağıtılır.",
    substitute: "Kaptanın cetvelde belirlediği zabit veya eğitimli personel.",
    readinessResponsibility:
      "SMS ile atanmışsa LSA/FFA'nın mevcudiyet, servis/son kullanım tarihi, mühür, erişim ve kayıt takibini yapar; teknik tamir yetkisi değildir.",
    duties: {
      general: {
        station: "Muster kontrol noktası",
        team: "Güverte Acil Müdahale",
        reportsTo: "Birinci Zabit",
        actions: [
          "İsim bazlı yoklamayı yapar; eksik kişinin son bilinen yeri ve vardiyasını doğrular.",
          "Alarm saati, ekip hazır oluşu ve kritik raporları zaman damgalı kaydeder.",
          "LSA/FFA donanım eksik veya arızalarını saha komutanına derhal bildirir.",
        ],
        equipment: ["Güncel isimli muster list", "UHF", "Kontrol/olay kayıt formu"],
      },
      fire: {
        station: "BA kontrol noktası",
        team: "BA Kontrol ve Lojistik",
        reportsTo: "Üçüncü Zabit / Birinci Zabit",
        actions: [
          "BA girişçilerin isim, tüp basıncı, giriş saati ve beklenen dönüş süresini kaydeder.",
          "Yedek BA ekibi ve dolu tüp durumunu takip eder; düşük süreyi ekip liderine bildirir.",
          "Giriş ekibiyle irtibat kesilirse acil prosedürü başlatır; izinsiz kişiyi giriş sınırından geçirmez.",
        ],
        equipment: ["BA control board", "UHF", "Yedek SCBA tüpleri"],
      },
      abandon: {
        station: "Atanmış survival craft istasyonu",
        team: "Survival Craft ve Muster",
        reportsTo: "Craft amiri / Birinci Zabit",
        actions: [
          "İsimli kişi hesabını ve can yeleği/immersion suit giyimini kontrol eder.",
          "Taşınabilir VHF, SART/AIS-SART ve ilave LSA malzemelerinin atanmış kişide olduğunu doğrular.",
          "Eksik kişi veya ekipman durumunu craft amirine bildirir; indirme kaydını tutar.",
        ],
        equipment: ["Muster list", "LSA inventory", "Taşınabilir UHF"],
      },
      mob: {
        station: "Köprüüstü kanadı / yüksek ve emniyetli gözcü noktası",
        team: "Sudan Kişi Kurtarma",
        reportsTo: "Kaptan / Birinci Zabit",
        actions: [
          "Kazazedeyi kesintisiz işaret eder; taraf, mesafe ve görünürlüğü kısa raporlarla verir.",
          "Can simidi/ışık/duman ve recovery equipment durumunu kontrol eder.",
          "Kurtarma ve ilk temas saatlerini olay kaydına işler.",
        ],
        equipment: ["Dürbün", "UHF", "Işıklı/dumanlı can simidi kontrolü"],
      },
      flooding: {
        station: "Muster kontrol / damage control plot",
        team: "Komuta, Stabilite ve Kayıt",
        reportsTo: "Birinci Zabit",
        actions: [
          "Sounding, seviye ve pompa raporlarını mahal ve saat bazında kaydeder.",
          "Personel hesabını güncel tutar; kapatılan açıklık ve izole edilen sistemleri işaretler.",
          "Hasar kontrol ekibine taşınabilir ışık, telsiz ve ekipman lojistiği sağlar.",
        ],
        equipment: ["Damage Control Plan", "UHF", "Kayıt formu"],
      },
      "enclosed-space": {
        station: "Giriş kontrol / kurtarma kayıt noktası",
        team: "BA Kurtarma ve Giriş Kontrol",
        reportsTo: "Birinci Zabit / kurtarma ekip lideri",
        actions: [
          "Girişçi, yedek girişçi, dış gözcü, tüp basıncı ve giriş süresini kayıt altına alır.",
          "Gaz ölçüm trendini ve havalandırma durumunu giriş kontrol formunda izler.",
          "Kurtarılan kazazedenin ilk yardım ekibine kontrollü devrini ve zamanlarını kaydeder.",
        ],
        equipment: ["Entry control board", "UHF", "Gaz ölçüm kayıt formu"],
      },
      pollution: {
        station: "SOPEP kontrol noktası",
        team: "SOPEP Komuta, Haberleşme ve Kayıt",
        reportsTo: "Birinci Zabit",
        actions: [
          "SOPEP malzeme çıkışı, kullanılan PPE ve atık kaplarını kaydeder.",
          "Döküntü alanı fotoğraf/zaman kaydını emniyetli noktadan toplar.",
          "Eksilen SOPEP stoklarını ve yeniden tedarik ihtiyacını raporlar.",
        ],
        equipment: ["SOPEP inventory", "UHF", "Kayıt/etiket malzemesi"],
      },
    },
  },
  {
    id: "bosun",
    roleSlug: "reis-bosun",
    rank: "Reis / Bosun",
    billet: "Deck Emergency Team Leader",
    initialStation: "Güverte Acil Durum Ekipman İstasyonu",
    substitute: "Role cetvelinde adı yazılı kıdemli AB.",
    duties: {
      general: {
        station: "Güverte acil durum ekipman istasyonu",
        team: "Güverte Acil Müdahale",
        reportsTo: "Birinci Zabit",
        actions: [
          "Güverte tayfasını isimle sayar, PPE ve ekipman hazır oluşunu kontrol eder.",
          "Erişim yolları, kapılar, havalandırma damperleri ve güverte riskleri hakkında saha raporu verir.",
          "Ekibi olay türüne göre saldırı, boundary, indirme veya containment görevine dağıtır.",
        ],
        equipment: ["UHF", "Acil durum ekipmanları", "Uygun PPE"],
      },
      fire: {
        station: "Olay yeri giriş sınırı",
        team: "Yangın Saldırı ve Yedek",
        reportsTo: "Birinci Zabit / Üçüncü Zabit",
        actions: [
          "Hortum hattı, nozül, su beslemesi ve kaçış rotasını kurar.",
          "Görevli ise nozzleman veya saldırı ekibi kıdemlisi olarak kontrollü ilerler.",
          "Yangın sınırlarının ısı ve duman kontrolünü yaptırır; değişikliği saha komutanına bildirir.",
        ],
        equipment: ["Hortum/nozül", "UHF", "Fire PPE"],
      },
      abandon: {
        station: "Atanmış survival craft indirme istasyonu",
        team: "Survival Craft ve Muster",
        reportsTo: "Craft amiri / Birinci Zabit",
        actions: [
          "Gripes, falls, bowsing tackles, painter ve embarkation yolunu kontrol eder.",
          "İndirme ekibine görev dağıtır; hareketli donanım ve crush zone'u emniyete alır.",
          "Craft amirinin komutuyla indirme ve gemiden açılma işlemini uygular.",
        ],
        equipment: ["Can yeleği/immersion suit", "UHF", "Launching checklist"],
      },
      mob: {
        station: "Kurtarma botu / recovery station",
        team: "Sudan Kişi Kurtarma",
        reportsTo: "Birinci Zabit",
        actions: [
          "Bot indirme alanını, painter ve recovery düzenini hazırlar.",
          "Görevli ise bot mürettebatında yer alır veya bordadan alma takımına liderlik eder.",
          "Kazazedenin emniyetli kaldırılması için strop/net/merdiven düzenini kurar.",
        ],
        equipment: ["Recovery sling/net", "UHF", "PFD/immersion suit"],
      },
      flooding: {
        station: "Hasar kontrol ekipman istasyonu",
        team: "Hasar Kontrol",
        reportsTo: "Birinci Zabit",
        actions: [
          "Shoring, wedge, soft patch ve portable pump ekipmanını hazırlar.",
          "Yapısal ve elektrik tehlikesi kontrolünden sonra geçici sızdırmazlık uygular.",
          "Su girişindeki değişimi ve malzeme ihtiyacını düzenli raporlar.",
        ],
        equipment: ["Shoring/plugging kit", "Portable pump", "UHF"],
      },
      "enclosed-space": {
        station: "Kapalı mahal staging alanı",
        team: "BA Kurtarma ve Giriş Kontrol",
        reportsTo: "Üçüncü Zabit / Birinci Zabit",
        actions: [
          "Tripod/davit, lifeline, sedye ve kontrollü kaldırma düzenini kurar.",
          "Dış gözcü veya yedek ekip görevini role cetveline göre yürütür.",
          "Giriş yolunu açık tutar ve izinsiz girişleri engeller.",
        ],
        equipment: ["Rescue tripod/davit", "Lifeline", "Stretcher", "UHF"],
      },
      pollution: {
        station: "Döküntünün rüzgâr üstü sınırı",
        team: "SOPEP Güverte Müdahale",
        reportsTo: "Birinci Zabit",
        actions: [
          "Scupper plug, boom, emici ped ve damlama tavalarını ekibe dağıtır.",
          "Yayılımı sınırlar; kıvılcım ve kayma riskine karşı sıcak bölgeyi işaretler.",
          "Toplanan atığı uygun kaba alır ve geçici depolama alanına taşır.",
        ],
        equipment: ["SOPEP kit", "Kimyasala uygun PPE", "Kıvılcım güvenli el aletleri"],
      },
    },
  },
  {
    id: "deck-ratings",
    roleSlug: "ustagemici",
    rank: "Usta Gemici & Gemiciler (AB / OS)",
    billet: "Deck Emergency Ratings",
    initialStation: "Güverte Acil Durum Ekipman İstasyonu",
    roleNote:
      "Gerçek cetvelde AB-1, AB-2 ve OS aynı satırda birleştirilmez; her kişi için nozzleman, yedek, bot mürettebatı veya gözcü görevi ayrı yazılır.",
    duties: {
      general: {
        station: "Güverte acil durum ekipman istasyonu",
        team: "Güverte Acil Müdahale",
        reportsTo: "Reis / Birinci Zabit",
        actions: [
          "İsimli görevine uygun PPE ve donanımı alır; yoklamasını verir.",
          "Acil çıkış, kapı ve güverte erişimlerinin açık/kapalı durumunu raporlar.",
          "Yalnızca role cetvelinde atanan saldırı, yedek, boundary veya boat görevini üstlenir.",
        ],
        equipment: ["Uygun PPE", "UHF (atanmış kişide)", "Göreve özel donanım"],
      },
      fire: {
        station: "Olay yeri giriş sınırı / atanmış boundary",
        team: "Yangın Saldırı ve Yedek",
        reportsTo: "Reis / Üçüncü Zabit",
        actions: [
          "İsimli görevine göre nozzleman, hoseman, yedek BA veya boundary cooling görevini yapar.",
          "Hortum kıvrımı, su beslemesi, kapı kontrolü ve kaçış yolunu sürekli izler.",
          "Isı, duman, yapısal ses veya basınç değişikliğini derhal ekip liderine raporlar.",
        ],
        equipment: ["Hortum/nozül", "Fire PPE", "SCBA (yalnızca atanmış/eğitimli kişi)"],
      },
      abandon: {
        station: "İsimli survival craft istasyonu",
        team: "Survival Craft ve Muster",
        reportsTo: "Reis / craft amiri",
        actions: [
          "İsimli görevine göre gripes/falls/painter/embarkation işini yapar.",
          "Craft yükleme sırasında kişi akışını ve sıkışma bölgelerini emniyette tutar.",
          "Boat crew olarak atandıysa motor, kanca ve denize açılma talimatlarını uygular.",
        ],
        equipment: ["Can yeleği/immersion suit", "İndirme PPE'si"],
      },
      mob: {
        station: "Atanmış gözcü veya recovery station",
        team: "Sudan Kişi Kurtarma",
        reportsTo: "Reis / Birinci Zabit",
        actions: [
          "Atanmış gözcü teması sürdürür; diğer ekip recovery equipment veya botu hazırlar.",
          "Rescue boat crew ise yalnızca coxswain komutlarını uygular.",
          "Kazazedenin bordaya alınmasında strop/net/merdiven düzenini işletir.",
        ],
        equipment: ["PFD/immersion suit", "Recovery equipment", "UHF (atanmış kişide)"],
      },
      flooding: {
        station: "Hasar kontrol istasyonu",
        team: "Hasar Kontrol",
        reportsTo: "Reis / Birinci Zabit",
        actions: [
          "İsimli göreve göre sounding, portable pump, soft patch veya shoring uygular.",
          "Su içinde elektrik, kimyasal ve yapısal tehlikeye karşı erişim sınırına uyar.",
          "Seviye ve pompa debisi değişikliklerini ekip liderine raporlar.",
        ],
        equipment: ["Portable pump", "Damage control kit", "Uygun PPE"],
      },
      "enclosed-space": {
        station: "Kapalı mahal staging alanı",
        team: "BA Kurtarma ve Giriş Kontrol",
        reportsTo: "Üçüncü Zabit / Reis",
        actions: [
          "Yalnızca isimli ve eğitimli ise BA girişçisi/yedeği olur; aksi halde dış destek görevinde kalır.",
          "Lifeline, sedye ve kaldırma düzenini işler; giriş kontrol görevlisinin komutlarına uyar.",
          "Haberleşme veya hava beslemesi bozulursa acil geri çekilme prosedürünü uygular.",
        ],
        equipment: ["SCBA (atanmış kişide)", "Harness/lifeline", "Rescue stretcher"],
      },
      pollution: {
        station: "SOPEP müdahale alanı",
        team: "SOPEP Güverte Müdahale",
        reportsTo: "Reis / Birinci Zabit",
        actions: [
          "Scupperları kapatır, emicileri/boomları yerleştirir ve drenajı korur.",
          "Ürüne uygun PPE ile geri toplama ve atık kaplarına aktarma yapar.",
          "Kayma, buhar ve ateşleme riskini sürekli izleyip raporlar.",
        ],
        equipment: ["SOPEP kit", "Kimyasal PPE", "Atık kapları"],
      },
    },
  },
  {
    id: "deck-cadet",
    roleSlug: "guverte-stajyer",
    rank: "Güverte Stajyeri (Deck Cadet)",
    billet: "Runner & Logistics Support",
    initialStation: "Atanmış Muster Station",
    roleNote: "Bağımsız kritik görev verilmez; her görev isimli bir zabit veya ekip liderinin doğrudan gözetimindedir.",
    duties: {
      general: {
        station: "Atanmış muster / haberci noktası",
        team: "Güverte Acil Müdahale",
        reportsTo: "Dördüncü Zabit / Birinci Zabit",
        actions: [
          "Yoklamasını verir ve yalnızca atanmış haberci/lojistik görevini alır.",
          "Telsiz dışı yedek iletişimde yazılı mesajı doğru kişiye taşır.",
          "Ekipman taşırken kaçış ve yangın kapılarını açık bırakmaz.",
        ],
        equipment: ["Uygun PPE", "Mesaj/kayıt kartı"],
      },
      fire: {
        station: "Yangın kontrol istasyonu güvenli tarafı",
        team: "BA Kontrol ve Lojistik",
        reportsTo: "Dördüncü/Üçüncü Zabit",
        actions: [
          "Yedek hortum, tüp, ışık ve su/ilk yardım malzemesini güvenli sınıra taşır.",
          "BA giriş alanına izinsiz yaklaşmaz ve bağımsız yangın girişi yapmaz.",
          "Ekip liderinin mesaj ve malzeme taleplerini yerine getirir.",
        ],
        equipment: ["Temel PPE", "Lojistik malzemesi"],
      },
      abandon: {
        station: "Atanmış survival craft istasyonu",
        team: "Survival Craft ve Muster",
        reportsTo: "Craft amiri / Dördüncü Zabit",
        actions: [
          "İlave su, battaniye veya atanmış abandon-ship malzemesini istasyona getirir.",
          "Kişi akışında ve can yeleği kontrolünde zabite yardım eder.",
          "İndirme donanımını yalnızca doğrudan gözetim altında çalıştırır.",
        ],
        equipment: ["Can yeleği/immersion suit", "Atanmış ilave malzeme"],
      },
      mob: {
        station: "Atanmış gözcü / kurtarma lojistik noktası",
        team: "Sudan Kişi Kurtarma",
        reportsTo: "Dördüncü Zabit / Reis",
        actions: [
          "Atandıysa ikinci gözcü olarak kazazedenin yönünü işaret eder.",
          "Battaniye, sedye, ışık ve recovery equipment lojistiğini sağlar.",
          "Olay alanında komutsuz hareket etmez ve bot ekibine yalnızca gözetimle yardım eder.",
        ],
        equipment: ["Dürbün (atanmışsa)", "Termal koruyucu malzeme"],
      },
      flooding: {
        station: "Hasar kontrol lojistik noktası",
        team: "Hasar Kontrol",
        reportsTo: "Dördüncü Zabit / Reis",
        actions: [
          "Sounding kayıtlarını zabit gözetiminde zaman ve mahal bazında tutar.",
          "Pompa hortumu, ışık ve shoring malzemesini güvenli sınıra taşır.",
          "Su basmış mahalle bağımsız girmez.",
        ],
        equipment: ["Kayıt formu", "Temel PPE", "Taşınabilir ışık"],
      },
      "enclosed-space": {
        station: "Kurtarma staging alanı",
        team: "BA Kurtarma ve Giriş Kontrol",
        reportsTo: "Dördüncü Zabit / Reis",
        actions: [
          "Kapalı mahale hiçbir koşulda bağımsız girmez.",
          "Sedye, yedek tüp, ilk yardım ve aydınlatma lojistiğini sağlar.",
          "Yazılı mesaj ve zaman kayıtlarını ilgili görevlilere taşır.",
        ],
        equipment: ["Temel PPE", "Lojistik/kayıt malzemesi"],
      },
      pollution: {
        station: "SOPEP lojistik noktası",
        team: "SOPEP Güverte Müdahale",
        reportsTo: "Dördüncü Zabit / Reis",
        actions: [
          "Emici, atık torbası, işaretleme ve temiz PPE malzemesi getirir.",
          "Kirli/temiz bölge ayrımını korur; kontamine malzemeyi etiketli alana taşır.",
          "Stok çıkışını kayıt görevlisine bildirir.",
        ],
        equipment: ["SOPEP lojistik malzemesi", "Uygun PPE"],
      },
    },
  },
  {
    id: "chief-engineer",
    roleSlug: "bas-muhendis",
    rank: "Baş Mühendis (Chief Engineer)",
    billet: "Engine Emergency Commander",
    initialStation: "Makine Kontrol Odası (ECR)",
    substitute: "İkinci Mühendis.",
    readinessResponsibility:
      "Acil güç, yangın/bilge pompaları, remote stops, quick-closing valves ve sabit makine dairesi söndürme sistemlerinin teknik hazırlığını yönetir.",
    duties: {
      general: {
        station: "Makine Kontrol Odası (ECR)",
        team: "Makine Acil Müdahale",
        reportsTo: "Kaptan",
        actions: [
          "Ana tahrik, dümen, elektrik üretimi, pompalar ve yakıt sisteminin durumunu toplar.",
          "Makine ekibini isimle sayar; kritik görev ve yedekleri görevlendirir.",
          "Köprüüstüne tahrik, güç, yangın pompası ve izolasyon imkânı hakkında düzenli rapor verir.",
        ],
        equipment: ["ECR haberleşmesi", "Makine acil durum checklist'i", "UHF"],
      },
      fire: {
        station: "ECR / makine yangın kontrol noktası",
        team: "Makine İzolasyon ve Yangın Desteği",
        reportsTo: "Kaptan",
        actions: [
          "Yangın pompaları, acil güç, yakıt quick-closing ve fan/remote stop durumunu yönetir.",
          "Etkilenen makine sistemini emniyetle izole eder; tahrik ve blackout riskini Kaptana bildirir.",
          "Makine dairesi total flooding sistemi için personel hesabı, sızdırmazlık ve boşaltma hazırlığını doğrular.",
        ],
        equipment: ["Makine Fire Control Plan", "Remote stop/QCV paneli", "UHF"],
      },
      abandon: {
        station: "ECR, ardından atanmış survival craft",
        team: "Makine Emniyete Alma",
        reportsTo: "Kaptan",
        actions: [
          "Kaptan talimatına kadar gerekli tahrik, yangın pompası ve acil gücü sürdürür.",
          "Emir üzerine makineyi emniyetli sırayla durdurur; yakıt ve kritik valfleri kapattırır.",
          "Makine ekibi kişi hesabını doğrulayıp atanmış craft istasyonuna geçer.",
        ],
        equipment: ["Shutdown checklist", "UHF", "Can yeleği/immersion suit"],
      },
      mob: {
        station: "ECR",
        team: "MOB Makine ve Teknik Destek",
        reportsTo: "Kaptan",
        actions: [
          "Ana makineyi ani ve tekrarlı manevralara hazır tutar; köprüüstü komutlarına öncelik verir.",
          "Pervane devri, dümen gücü, elektrik yükü ve start-air durumunu izler.",
          "Recovery station için gerekli hidrolik/elektrik desteğini sağlar.",
        ],
        equipment: ["ECR kontrol sistemleri", "Köprüüstü haberleşmesi"],
      },
      flooding: {
        station: "ECR",
        team: "Pumping ve Teknik İzolasyon",
        reportsTo: "Kaptan",
        actions: [
          "Bilge/sintine alarmlarını, sea inlet ve tank seviyelerini doğrular; su giriş yolunu izole ettirir.",
          "Bilge, ballast, GS ve portable pump seçeneklerini sistem bütünlüğüne göre yönetir.",
          "Blackout, serbest yüzey ve progresif flooding etkilerini Kaptana raporlar.",
        ],
        equipment: ["Piping diagrams", "Bilge/ballast paneli", "UHF"],
      },
      "enclosed-space": {
        station: "ECR / izolasyon kontrol noktası",
        team: "Teknik İzolasyon ve Kurtarma Desteği",
        reportsTo: "Kaptan / Birinci Zabit",
        actions: [
          "Mahale bağlı tüm boru, pompa, agitator, inert gas ve enerji kaynaklarını belirler.",
          "LOTO/blanking ve zorunlu havalandırmayı isimli mühendislerle uygulatır.",
          "İzolasyonun sürdüğünü kurtarma bitene kadar kontrol eder ve saha komutanına raporlar.",
        ],
        equipment: ["P&ID", "LOTO kit", "UHF"],
      },
      pollution: {
        station: "ECR / bunker kontrol noktası",
        team: "SOPEP Teknik İzolasyon",
        reportsTo: "Kaptan",
        actions: [
          "Transfer pompalarını durdurur ve ilgili manifold/tank valflerini izole ettirir.",
          "Tank seviyesi, overflow hattı ve sızıntı kaynağını teknik verilerle doğrular.",
          "Geri transfer veya boş tanka alma seçeneğini stabilite ve prosedürle değerlendirip Kaptana sunar.",
        ],
        equipment: ["Bunker/transfer planı", "Tank sounding verisi", "UHF"],
      },
    },
  },
  {
    id: "second-engineer",
    roleSlug: "ikinci-muhendis",
    rank: "İkinci Mühendis (Second Engineer)",
    billet: "Engine On-Scene Leader",
    initialStation: "Makine Kontrol Odası (ECR)",
    substitute: "Üçüncü/Dördüncü Mühendis; görev devri Baş Mühendis tarafından yapılır.",
    duties: {
      general: {
        station: "ECR",
        team: "Makine Acil Müdahale",
        reportsTo: "Baş Mühendis",
        actions: [
          "Makine personeli hesabını ve kritik makine/pompa durumunu doğrular.",
          "Baş Mühendis talimatıyla saha operatörlerini görevlendirir ve haberleşmeyi kurar.",
          "Yakıt, yağ, hava, soğutma ve elektrik sistemlerinde anormallikleri raporlar.",
        ],
        equipment: ["UHF", "Makine checklist'i", "P&ID"],
      },
      fire: {
        station: "ECR / güvenli saha kontrol noktası",
        team: "Makine İzolasyon ve Yangın Desteği",
        reportsTo: "Baş Mühendis",
        actions: [
          "Ana/acil yangın pompasını ve ring-main basıncını devreye aldırır.",
          "Yakıt pompaları, QCV, fan ve damper izolasyonlarını isimli personelle uygular.",
          "Etkilenen sistem ve blackout riskini izleyip Baş Mühendise raporlar.",
        ],
        equipment: ["Remote stop/QCV planı", "UHF", "Fire PPE"],
      },
      abandon: {
        station: "ECR, ardından atanmış survival craft",
        team: "Makine Emniyete Alma",
        reportsTo: "Baş Mühendis",
        actions: [
          "Shutdown sırasını mühendis ve ratinglere dağıtır.",
          "Pompalar, kazan, separatör ve yakıt sistemlerinin emniyetli durumunu doğrular.",
          "Baş Mühendis serbest bıraktığında ekibiyle craft istasyonuna geçer.",
        ],
        equipment: ["Shutdown checklist", "UHF", "Can yeleği/immersion suit"],
      },
      mob: {
        station: "ECR",
        team: "MOB Makine ve Teknik Destek",
        reportsTo: "Baş Mühendis",
        actions: [
          "Ana makine, steering gear ve jeneratörlerin manevra yükünü izler.",
          "Start-air ve standby ekipmanını hazır tutar.",
          "Kurtarma ekipmanına ait güç/hidrolik talebini karşılar.",
        ],
        equipment: ["ECR kontrol sistemleri", "Dahili haberleşme"],
      },
      flooding: {
        station: "ECR / pompa kontrol noktası",
        team: "Pumping ve Teknik İzolasyon",
        reportsTo: "Baş Mühendis",
        actions: [
          "Su girişine bağlı sea valve, bilge, ballast ve cross-connection hatlarını belirler.",
          "Uygun pompa konfigürasyonunu kurar ve emiş kaybı/tıkanmayı izler.",
          "Saatlik seviye ve pompa performansını Baş Mühendise raporlar.",
        ],
        equipment: ["P&ID", "Pompa paneli", "UHF"],
      },
      "enclosed-space": {
        station: "Teknik izolasyon noktası",
        team: "Teknik İzolasyon ve Kurtarma Desteği",
        reportsTo: "Baş Mühendis / Birinci Zabit",
        actions: [
          "Mahale giren tüm hatları, hareketli ekipmanı ve enerjiyi LOTO ile izole eder.",
          "Mekanik havalandırmayı güvenli konfigürasyonda çalıştırır; egzozun yeniden girişini önler.",
          "İzolasyon anahtarlarını ve kilitleri kurtarma sonuna kadar kontrol altında tutar.",
        ],
        equipment: ["LOTO kit", "P&ID", "UHF"],
      },
      pollution: {
        station: "Transfer kontrol noktası",
        team: "SOPEP Teknik İzolasyon",
        reportsTo: "Baş Mühendis",
        actions: [
          "Transfer pompasını durdurur, manifold ve tank valflerini doğru sırada kapatır.",
          "Overflow, vent ve drip tray durumunu sahadan doğrulatır.",
          "Güvenli geri toplama/transfer için teknik bağlantıları hazırlar.",
        ],
        equipment: ["Transfer planı", "UHF", "Kimyasala uygun PPE"],
      },
    },
  },
  {
    id: "engineer-officer",
    roleSlug: "ucuncu-muhendis",
    rank: "Üçüncü/Dördüncü Mühendis",
    billet: "Emergency Machinery Operator",
    initialStation: "Makine Kontrol Odası / Atanmış Makine İstasyonu",
    roleNote: "Gerçek cetvelde 3/E ve 4/E varsa her biri ayrı isimli görev ve istasyona atanır.",
    duties: {
      general: {
        station: "Atanmış makine acil durum istasyonu",
        team: "Makine Acil Müdahale",
        reportsTo: "İkinci Mühendis",
        actions: [
          "Atanmış jeneratör, pompa, kazan veya yakıt sisteminin durumunu kontrol eder.",
          "Lokal alarmları ve saha koşullarını ECR'a raporlar.",
          "Bağımsız valf değişikliği yapmadan önce komut ve hat konfigürasyonunu doğrular.",
        ],
        equipment: ["UHF", "P&ID", "Makine PPE'si"],
      },
      fire: {
        station: "Acil yangın pompası / atanmış izolasyon istasyonu",
        team: "Makine İzolasyon ve Yangın Desteği",
        reportsTo: "İkinci Mühendis",
        actions: [
          "Atanmış yangın/acil yangın pompasını çalıştırır ve basıncı raporlar.",
          "Yakıt, fan, damper veya elektrik izolasyonunu checklist'e göre uygular.",
          "Mahalde duman/ısı varsa bağımsız giriş yapmaz; güvenli sınırdan rapor verir.",
        ],
        equipment: ["UHF", "Fire PPE", "İzolasyon checklist'i"],
      },
      abandon: {
        station: "Atanmış makine istasyonu, ardından survival craft",
        team: "Makine Emniyete Alma",
        reportsTo: "İkinci Mühendis",
        actions: [
          "Atanmış yardımcı makineyi shutdown sırasına göre emniyete alır.",
          "Valf/şalter durumunu ECR'a teyit eder ve anahtarları emniyete alır.",
          "Serbest bırakılınca doğrudan kendi craft istasyonuna gider.",
        ],
        equipment: ["Shutdown checklist", "Can yeleği/immersion suit"],
      },
      mob: {
        station: "ECR / steering gear standby",
        team: "MOB Makine ve Teknik Destek",
        reportsTo: "İkinci Mühendis",
        actions: [
          "Atanmış makine veya steering gear sistemini standby'da tutar.",
          "Manevra komutlarına tepkiyi ve anormal sıcaklık/basıncı izler.",
          "Recovery equipment güç talebine saha desteği verir.",
        ],
        equipment: ["UHF/dahili telefon", "Makine PPE'si"],
      },
      flooding: {
        station: "Bilge/ballast pompa istasyonu",
        team: "Pumping ve Teknik İzolasyon",
        reportsTo: "İkinci Mühendis",
        actions: [
          "Atanmış pompa ve suction/discharge hattını P&ID üzerinden doğrular.",
          "Pompa akımı, basınç, emiş ve su seviyesini periyodik raporlar.",
          "Yanlış bölmeye transferi önlemek için valf lineup'ını çift kontrol eder.",
        ],
        equipment: ["P&ID", "UHF", "Taşınabilir gaz ölçer (gerektiğinde)"],
      },
      "enclosed-space": {
        station: "İzolasyon / gaz ölçüm noktası",
        team: "Teknik İzolasyon ve Kurtarma Desteği",
        reportsTo: "İkinci Mühendis / Birinci Zabit",
        actions: [
          "Yetkin ve atanmışsa kalibre cihazla uzaktan/katmanlı atmosfer ölçümü yapar.",
          "Oksijen, LEL ve toksik gaz sonuçlarını saat/yer ile kayıt görevlisine bildirir.",
          "İzolasyon ve havalandırma ekipmanını kurtarma boyunca izler.",
        ],
        equipment: ["Kalibre çoklu gaz ölçer", "LOTO kit", "UHF"],
      },
      pollution: {
        station: "Pompa/transfer istasyonu",
        team: "SOPEP Teknik İzolasyon",
        reportsTo: "İkinci Mühendis",
        actions: [
          "Pompa ve valf lineup'ını emniyete alır; sızıntılı hattın basıncını düşürür.",
          "Tank seviyelerini ve transfer edilen miktarı teknik kayıtla doğrular.",
          "Geri toplama pompasını veya uygun boş tank bağlantısını talimatla hazırlar.",
        ],
        equipment: ["P&ID", "UHF", "Kimyasala uygun PPE"],
      },
    },
  },
  {
    id: "eto",
    roleSlug: "eto",
    rank: "Elektrik Zabiti (ETO)",
    billet: "Emergency Electrical Officer",
    initialStation: "Acil Switchboard / ECR",
    substitute: "SMS'te yetkilendirilmiş elektrik yeterliği bulunan makine zabiti.",
    readinessResponsibility:
      "Genel alarm/PA, yangın algılama, acil jeneratör, aküler, UPS, acil aydınlatma ve kritik haberleşme güç kaynaklarının teknik hazırlığını takip eder.",
    duties: {
      general: {
        station: "Acil switchboard / ECR",
        team: "Makine Acil Müdahale",
        reportsTo: "Baş Mühendis",
        actions: [
          "Ana ve acil güç, UPS, akü ve acil aydınlatma durumunu kontrol eder.",
          "Alarm/PA ve kritik haberleşme beslemelerinin çalıştığını doğrular.",
          "Elektrik arızası veya izolasyon ihtiyacını Baş Mühendise raporlar.",
        ],
        equipment: ["Elektrik tek hat şeması", "UHF", "Elektrik PPE'si"],
      },
      fire: {
        station: "Acil switchboard / güvenli izolasyon noktası",
        team: "Makine İzolasyon ve Yangın Desteği",
        reportsTo: "Baş Mühendis",
        actions: [
          "Etkilenen mahali, yangın pompaları veya acil sistemleri kesmeden seçici olarak izole eder.",
          "Acil jeneratör ve acil aydınlatmayı hazır tutar; blackout sonrası restorasyonu yönetir.",
          "Elektriksel yeniden tutuşma riskini saha komutanına bildirir.",
        ],
        equipment: ["Single-line diagram", "Arc-rated PPE", "UHF"],
      },
      abandon: {
        station: "Acil switchboard, ardından atanmış survival craft",
        team: "Makine Emniyete Alma",
        reportsTo: "Baş Mühendis",
        actions: [
          "Acil aydınlatma ve GMDSS/şarj beslemelerini son emre kadar sürdürür.",
          "Gerekli devreleri emniyete alır ve kritik sistemlerin son durumunu raporlar.",
          "Serbest bırakıldığında atanmış craft istasyonuna geçer.",
        ],
        equipment: ["Elektrik shutdown listesi", "Can yeleği/immersion suit"],
      },
      mob: {
        station: "Acil switchboard / projektör kontrolü",
        team: "MOB Makine ve Teknik Destek",
        reportsTo: "Baş Mühendis",
        actions: [
          "Projektör, güverte aydınlatması ve recovery equipment beslemesini hazırlar.",
          "Köprüüstü ve kurtarma telsizlerinin güç sürekliliğini izler.",
          "Elektrik arızasında emniyetli alternatif beslemeyi devreye alır.",
        ],
        equipment: ["Acil güç paneli", "Elektrik PPE'si"],
      },
      flooding: {
        station: "Acil switchboard / hasarlı mahal elektrik sınırı",
        team: "Pumping ve Teknik İzolasyon",
        reportsTo: "Baş Mühendis",
        actions: [
          "Su alan mahalin devrelerini, kritik pompaları koruyacak şekilde izole eder.",
          "Kablo yolları ve switchboard su maruziyetini izler; yaklaşma sınırı koyar.",
          "Portable pump ve aydınlatma için RCD/uygun güvenli besleme sağlar.",
        ],
        equipment: ["Single-line diagram", "İzolasyon/LOTO kit", "UHF"],
      },
      "enclosed-space": {
        station: "Güvenli elektrik kontrol noktası",
        team: "Teknik İzolasyon ve Kurtarma Desteği",
        reportsTo: "Baş Mühendis / Birinci Zabit",
        actions: [
          "Mahaldeki elektrik ve hareketli ekipmanı LOTO ile izole eder.",
          "Ex/intrinsically safe aydınlatma ve uygun havalandırma beslemesini sağlar.",
          "Kurtarma donanımı ve haberleşmenin güç sürekliliğini izler.",
        ],
        equipment: ["LOTO kit", "Ex-proof/intrinsically safe equipment", "UHF"],
      },
      pollution: {
        station: "Güvenli elektrik kontrol noktası",
        team: "SOPEP Teknik İzolasyon",
        reportsTo: "Baş Mühendis",
        actions: [
          "Yanıcı buhar riski varsa ateşleme kaynaklarını kontrollü izole eder.",
          "Ex uygun pompa/aydınlatma beslemesini doğrular.",
          "Statik elektrik ve bonding/earthing durumunu teknik ekibe raporlar.",
        ],
        equipment: ["Elektrik PPE'si", "Ex equipment", "UHF"],
      },
    },
  },
  {
    id: "engine-ratings",
    roleSlug: "yagci-fitter",
    rank: "Yağcı / Fitter / Silici",
    billet: "Engine Emergency Ratings",
    initialStation: "ECR / Atanmış Makine Muster Station",
    roleNote: "Gerçek cetvelde Fitter, Oiler/Motorman ve Wiper isimle ayrı görevlendirilir.",
    duties: {
      general: {
        station: "ECR / atanmış saha istasyonu",
        team: "Makine Acil Müdahale",
        reportsTo: "İkinci Mühendis",
        actions: [
          "Yoklamasını verir ve isimli valf, pompa, boundary veya lojistik görevini alır.",
          "Sızıntı, duman, yüksek sıcaklık ve anormal sesleri ECR'a bildirir.",
          "Komutsuz valf veya şalter işlemi yapmaz.",
        ],
        equipment: ["Makine PPE'si", "UHF (atanmış kişide)", "El feneri"],
      },
      fire: {
        station: "Atanmış izolasyon/boundary noktası",
        team: "Makine İzolasyon ve Yangın Desteği",
        reportsTo: "İkinci Mühendis",
        actions: [
          "İsimli QCV, damper, fan veya yakıt valfi görevini checklist ile uygular.",
          "Boundary cooling/hortum veya ekipman taşıma görevini yapar.",
          "Dumanlı mahale uygun BA olmadan girmez.",
        ],
        equipment: ["Fire PPE", "Hortum/taşınabilir söndürücü", "UHF (atanmışsa)"],
      },
      abandon: {
        station: "Atanmış makine görevi, ardından survival craft",
        team: "Makine Emniyete Alma",
        reportsTo: "İkinci Mühendis",
        actions: [
          "Atanmış lokal valf veya ekipman shutdown görevini yapar.",
          "İşlemi ECR'a teyit eder ve emniyetsiz alandan çıkar.",
          "Serbest bırakılınca doğrudan isimli craft istasyonuna gider.",
        ],
        equipment: ["Can yeleği/immersion suit", "Göreve uygun el aleti"],
      },
      mob: {
        station: "ECR veya atanmış recovery station",
        team: "MOB Makine ve Teknik Destek",
        reportsTo: "İkinci Mühendis / Reis",
        actions: [
          "Makinede kalırsa manevra ekipmanına lokal destek verir.",
          "Role cetvelinde güverteye atanmışsa recovery equipment taşır ve kurar.",
          "Görev değişimini iki komuta hattına da teyit eder.",
        ],
        equipment: ["Makine veya güverte PPE'si", "Recovery equipment (atanmışsa)"],
      },
      flooding: {
        station: "Pompa/hasar kontrol istasyonu",
        team: "Pumping ve Teknik İzolasyon",
        reportsTo: "İkinci Mühendis",
        actions: [
          "Portable pump, hortum ve mekanik tıkaç/soft patch düzenini kurar.",
          "Atanmış valf lineup'ını mühendis gözetiminde uygular.",
          "Su seviyesi ve sızıntı değişimini düzenli raporlar.",
        ],
        equipment: ["Portable pump", "Mechanical plugging kit", "Uygun PPE"],
      },
      "enclosed-space": {
        station: "Kurtarma staging / teknik izolasyon noktası",
        team: "Teknik İzolasyon ve Kurtarma Desteği",
        reportsTo: "İkinci Mühendis / Reis",
        actions: [
          "Kaldırma, sedye ve mekanik izolasyon düzenini isimli göreviyle kurar.",
          "Yalnızca eğitimli ve atanmışsa BA kurtarma ekibine girer.",
          "Dış gözcü talimatına uyar ve giriş yolunu açık tutar.",
        ],
        equipment: ["Rigging/rescue gear", "LOTO kit", "SCBA (yalnızca atanmışsa)"],
      },
      pollution: {
        station: "Transfer/containment alanı",
        team: "SOPEP Teknik İzolasyon",
        reportsTo: "İkinci Mühendis / Reis",
        actions: [
          "Sızıntılı bağlantıya basınç boşaltıldıktan sonra mekanik containment uygular.",
          "Scupper, damlama tavası, emici ve geri toplama pompasını kurar.",
          "Kontamine atığı uygun kaba aktarır ve alanı emniyette tutar.",
        ],
        equipment: ["SOPEP kit", "Kimyasal PPE", "Kıvılcım güvenli el aletleri"],
      },
    },
  },
  {
    id: "engine-cadet",
    roleSlug: "makine-stajyer",
    rank: "Makine Stajyeri (Engine Cadet)",
    billet: "Engine Runner & Logistics Support",
    initialStation: "ECR / Atanmış Muster Station",
    roleNote: "Bağımsız valf, elektrik, BA girişi veya kritik shutdown görevi verilmez.",
    duties: {
      general: {
        station: "ECR haberci noktası",
        team: "Makine Acil Müdahale",
        reportsTo: "İkinci Mühendis",
        actions: [
          "Yoklamasını verir ve doğrudan gözetim altında haberci görevini alır.",
          "Yazılı/sözlü mesajı tekrar ederek doğrular ve doğru istasyona taşır.",
          "Tehlikeli mahale bağımsız girmez.",
        ],
        equipment: ["Makine PPE'si", "Mesaj/kayıt kartı"],
      },
      fire: {
        station: "ECR güvenli lojistik noktası",
        team: "Makine İzolasyon ve Yangın Desteği",
        reportsTo: "İkinci Mühendis",
        actions: [
          "Yedek tüp, ışık ve ekipman lojistiğini güvenli sınıra taşır.",
          "Dumanlı mahale veya BA giriş alanına izinsiz girmez.",
          "Makine saha raporlarını ECR'a iletir.",
        ],
        equipment: ["Temel PPE", "Lojistik malzemesi"],
      },
      abandon: {
        station: "Atanmış survival craft istasyonu",
        team: "Makine Emniyete Alma",
        reportsTo: "Craft amiri",
        actions: [
          "Serbest bırakılınca doğrudan craft istasyonuna gider ve yoklamasını verir.",
          "Atanmış teknik/erzak malzemesini taşır.",
          "İndirme donanımını yalnızca doğrudan gözetimle çalıştırır.",
        ],
        equipment: ["Can yeleği/immersion suit", "Atanmış malzeme"],
      },
      mob: {
        station: "ECR lojistik noktası",
        team: "MOB Makine ve Teknik Destek",
        reportsTo: "İkinci Mühendis",
        actions: [
          "Manevra sırasında ekipman, kayıt veya haberci desteği verir.",
          "Recovery station'a malzeme gönderimini koordine eder.",
          "Bağımsız makine işlemi yapmaz.",
        ],
        equipment: ["Makine PPE'si", "Lojistik malzemesi"],
      },
      flooding: {
        station: "ECR / pompa lojistik noktası",
        team: "Pumping ve Teknik İzolasyon",
        reportsTo: "İkinci Mühendis",
        actions: [
          "Hortum, portable pump ve ışık taşır.",
          "Sounding değerini mühendis gözetiminde alır ve aynen raporlar.",
          "Su basmış veya elektrik riski olan mahale bağımsız girmez.",
        ],
        equipment: ["Temel PPE", "Taşınabilir ışık", "Kayıt kartı"],
      },
      "enclosed-space": {
        station: "Kurtarma lojistik noktası",
        team: "Teknik İzolasyon ve Kurtarma Desteği",
        reportsTo: "İkinci Mühendis / giriş kontrol görevlisi",
        actions: [
          "Kapalı mahale girmez; yedek tüp, sedye ve ışık lojistiğini yapar.",
          "Gaz ölçüm ve giriş kayıtlarını ilgili görevlilere taşır.",
          "Temiz/kirli ve güvenli/tehlikeli bölge sınırlarını korur.",
        ],
        equipment: ["Temel PPE", "Lojistik malzemesi"],
      },
      pollution: {
        station: "SOPEP lojistik noktası",
        team: "SOPEP Teknik İzolasyon",
        reportsTo: "İkinci Mühendis",
        actions: [
          "Emici, atık kabı ve temiz PPE malzemesini getirir.",
          "Kontamine malzemeyi etiketli geçici alana taşır.",
          "Kullanılan stok miktarını kayıt görevlisine bildirir.",
        ],
        equipment: ["Uygun PPE", "SOPEP lojistik malzemesi"],
      },
    },
  },
  {
    id: "cook",
    roleSlug: "asci",
    rank: "Aşçı (Cook)",
    billet: "Galley Safety & Welfare Support",
    initialStation: "Atanmış Muster / İlk Yardım İstasyonu",
    duties: {
      general: {
        station: "Atanmış muster istasyonu",
        team: "İlk Yardım ve Yaşam Mahalli",
        reportsTo: "Dördüncü Zabit / Birinci Zabit",
        actions: [
          "Ocak, elektrikli pişirme ve gaz/yakıt kaynağını emniyete alır.",
          "Yoklamasını verir ve ilk yardım/erzak destek görevine geçer.",
          "Galley ve store durumunu doğrulanmış şekilde raporlar.",
        ],
        equipment: ["Uygun PPE", "İlk yardım/erzak malzemesi (atanmışsa)"],
      },
      fire: {
        station: "Galley izolasyonu, ardından ilk yardım istasyonu",
        team: "İlk Yardım ve Tahliye",
        reportsTo: "Birinci Zabit",
        actions: [
          "Emniyetliyse galley ısı/güç kaynağını ve havalandırmayı prosedüre göre kapatır.",
          "Galley yangın söndürme sistemine izinsiz müdahale etmez; durumu raporlar.",
          "Atanmışsa ilk yardım ve sedye ekibine katılır.",
        ],
        equipment: ["İlk yardım PPE'si", "Sedye/ilk yardım çantası (atanmışsa)"],
      },
      abandon: {
        station: "Atanmış survival craft istasyonu",
        team: "Yaşam Desteği ve Muster",
        reportsTo: "Craft amiri",
        actions: [
          "Atanmış ilave su, acil erzak ve battaniyeleri istasyona getirir.",
          "Özel sağlık/diyet ihtiyacı olan kişileri craft amirine bildirir.",
          "Kişi akışına engel olmadan malzemeyi craft'a teslim eder.",
        ],
        equipment: ["Can yeleği/immersion suit", "Atanmış su/erzak"],
      },
      mob: {
        station: "İlk yardım / recovery kabul noktası",
        team: "İlk Yardım ve Hipotermi",
        reportsTo: "Atanmış medical officer / Birinci Zabit",
        actions: [
          "Battaniye, kuru giysi ve sıcak ortamı hazırlar.",
          "Kazazedeyi medical officer'a teslimde yardımcı olur; bilinçsiz kişiye ağızdan sıvı vermez.",
          "İlk yardım alanını temiz ve erişilebilir tutar.",
        ],
        equipment: ["Battaniye/termal koruma", "İlk yardım destek malzemesi"],
      },
      flooding: {
        station: "Atanmış muster / yaşam mahalli sınırı",
        team: "Yaşam Mahalli ve İlk Yardım",
        reportsTo: "Birinci Zabit",
        actions: [
          "Galley/store kapı ve açıklıklarını emniyete alır.",
          "Yaşam mahallindeki su, elektrik veya kayma riskini raporlar.",
          "İlk yardım ve personel ihtiyaçları için destek alanını hazırlar.",
        ],
        equipment: ["Temel PPE", "İlk yardım malzemesi"],
      },
      "enclosed-space": {
        station: "İlk yardım istasyonu",
        team: "İlk Yardım ve Sedye",
        reportsTo: "Medical officer / Birinci Zabit",
        actions: [
          "Oksijen/ilk yardım donanımını eğitimli medical personel için hazırlar.",
          "Kazazedenin ısı kaybını önleyecek kuru ve kontrollü alanı hazırlar.",
          "Kurtarma alanına izinsiz girmez ve tıbbi komutları uygular.",
        ],
        equipment: ["İlk yardım çantası", "Battaniye", "Oksijen seti (atanmış/eğitimli personel için)"],
      },
      pollution: {
        station: "Temiz destek alanı",
        team: "Temiz Bölge ve Dekontaminasyon Desteği",
        reportsTo: "Birinci Zabit",
        actions: [
          "Temiz su, temiz PPE ve hijyen malzemesini kirli bölge dışında hazırlar.",
          "Kontamine giysi ile galley/yaşam alanı arasındaki çapraz bulaşmayı önler.",
          "Müdahale ekibinin içme suyu ve dinlenme ihtiyacını güvenli şekilde karşılar.",
        ],
        equipment: ["Temiz PPE", "Hijyen/dekontaminasyon destek malzemesi"],
      },
    },
  },
  {
    id: "steward",
    roleSlug: "kamarot",
    rank: "Kamarot / Steward",
    billet: "Accommodation Sweep & First Aid Support",
    initialStation: "Atanmış Muster / İlk Yardım İstasyonu",
    duties: {
      general: {
        station: "Yaşam mahalli sweep rotası, ardından muster",
        team: "İlk Yardım ve Yaşam Mahalli",
        reportsTo: "Dördüncü Zabit / Birinci Zabit",
        actions: [
          "Yalnızca emniyetliyse atanmış kamara/ortak alan sweep rotasını kontrol eder.",
          "Bulunan, eksik veya yardıma ihtiyaç duyan kişileri muster görevlisine bildirir.",
          "Yangın kapıları ve kaçış yollarını açık/kapalı gerekliliğine göre emniyete alır.",
        ],
        equipment: ["Uygun PPE", "El feneri", "Sweep listesi"],
      },
      fire: {
        station: "Yaşam mahalli sınırı / ilk yardım istasyonu",
        team: "İlk Yardım ve Tahliye",
        reportsTo: "Birinci Zabit",
        actions: [
          "Emniyetliyse atanmış fire door, porthole ve ventilation openingleri kapatır.",
          "Dumanlı koridora bağımsız girmez; tamamlanan sweep alanını raporlar.",
          "Atanmışsa sedye ve ilk yardım ekibine katılır.",
        ],
        equipment: ["İlk yardım PPE'si", "Sedye/ilk yardım çantası"],
      },
      abandon: {
        station: "Atanmış survival craft istasyonu",
        team: "Yaşam Desteği ve Muster",
        reportsTo: "Craft amiri / Dördüncü Zabit",
        actions: [
          "Atanmış kamara/ortak alanın boşaltıldığını bildirir.",
          "İlave can yeleği, battaniye ve ilk yardım çantasını istasyona getirir.",
          "Kişi hesabı ve doğru craft'a yönlendirmede yardım eder.",
        ],
        equipment: ["Can yeleği/immersion suit", "İlk yardım çantası", "Battaniye"],
      },
      mob: {
        station: "İlk yardım / recovery kabul noktası",
        team: "İlk Yardım ve Hipotermi",
        reportsTo: "Medical officer / Birinci Zabit",
        actions: [
          "Sedye, battaniye, kuru giysi ve ilk yardım alanını hazırlar.",
          "Kazazedenin mahremiyetini ve sıcak tutulmasını sağlar.",
          "Tıbbi ekip talimatıyla kayıt veya ekipman desteği verir.",
        ],
        equipment: ["Sedye", "Battaniye", "İlk yardım çantası"],
      },
      flooding: {
        station: "Yaşam mahalli kontrol rotası",
        team: "Yaşam Mahalli ve İlk Yardım",
        reportsTo: "Birinci Zabit",
        actions: [
          "Alt seviye kamara/ortak alanları yalnızca emniyetli rota üzerinden kontrol eder.",
          "Watertight/fire door ve açıklıkların durumunu raporlar.",
          "Personeli su alan veya elektrik riski bulunan alandan uzaklaştırır.",
        ],
        equipment: ["El feneri", "Uygun PPE", "Sweep listesi"],
      },
      "enclosed-space": {
        station: "İlk yardım istasyonu",
        team: "İlk Yardım ve Sedye",
        reportsTo: "Medical officer / Birinci Zabit",
        actions: [
          "Sedye, ilk yardım ve oksijen donanımını eğitimli personel için hazırlar.",
          "Kazazedenin kabul alanını açık ve emniyetli tutar.",
          "Kapalı mahale veya giriş kontrol sınırına izinsiz geçmez.",
        ],
        equipment: ["Sedye", "İlk yardım çantası", "Battaniye"],
      },
      pollution: {
        station: "Temiz/kirli bölge kontrol noktası",
        team: "Temiz Bölge ve Dekontaminasyon Desteği",
        reportsTo: "Birinci Zabit",
        actions: [
          "Kirli PPE için ayrı toplama ve etiketli geçici depolama alanı kurar.",
          "Kontamine ayakkabı/giysiyle yaşam mahalline girişe engel olur.",
          "Temiz PPE ve hijyen malzemesi stokunu kayıt görevlisine bildirir.",
        ],
        equipment: ["Atık torbası/etiket", "Temiz PPE", "Hijyen malzemesi"],
      },
    },
  },
];

export const musterComplianceChecklist = [
  {
    title: "Alarm ve terk emri",
    detail:
      "Genel acil durum alarmı, PA sistemi, personelin ilk hareketi ve Kaptanın gemiyi terk emrini nasıl vereceği açıkça yazılı olmalı.",
    reference: "SOLAS III/37.1",
  },
  {
    title: "İsimli kişi ve doğrudan görev yeri",
    detail:
      "Gerçek cetvel rütbe grubu değil, her personeli adı/rütbesi ve atanmış ilk istasyonuyla göstermeli; aynı rütbedeki kişiler ayrı görev almalı.",
    reference: "SOLAS III/8 ve III/37.3",
  },
  {
    title: "Kapatma ve izolasyon görevleri",
    detail:
      "Watertight/fire door, valf, scupper, side opening, fan, damper, yakıt ve elektrik izolasyonları isimli kişilere dağıtılmalı.",
    reference: "SOLAS III/37.3.1",
  },
  {
    title: "LSA hazırlama ve indirme",
    detail:
      "Her survival craft için amir, ikinci sorumlu, motorcu, indirme ekibi, painter ve taşınabilir haberleşme/LSA taşıyıcıları belirlenmeli.",
    reference: "SOLAS III/10 ve III/37.3.2–3.4",
  },
  {
    title: "Yangın ekipleri ve özel donanım",
    detail:
      "Saldırı, yedek, BA control, boundary cooling, pump/isolasyon ve ilk yardım görevleri; ekip lideri ve geri çekilme zinciriyle yazılmalı.",
    reference: "SOLAS III/37.3.7–3.8",
  },
  {
    title: "Haberleşme ve kayıt",
    detail:
      "Köprüüstü–saha–ECR haberleşmesi, kullanılan cihaz/kanal, distress haberleşme sorumlusu ve olay kayıt görevlisi belirtilmeli.",
    reference: "SOLAS III/37.3.6; SOLAS IV",
  },
  {
    title: "Hazır bulundurma sorumluları",
    detail:
      "LSA ve FFA'nın iyi durumda ve hemen kullanıma hazır olmasını sağlayan sorumlu zabit veya zabitler açıkça atanmalı.",
    reference: "SOLAS III/37.4",
  },
  {
    title: "Kritik görev yedekleri",
    detail:
      "Kaptan, saha komutanı, Baş Mühendis, GMDSS, craft amiri ve diğer kritik görevler için yetersiz kalan/yaralanan personele karşı isimli yedek bulunmalı.",
    reference: "SOLAS III/37.5",
  },
  {
    title: "Sefer öncesi güncellik ve görünürlük",
    detail:
      "Cetvel gemi denize çıkmadan hazırlanmalı, personel değişikliğinde revize edilmeli; köprüüstü, makine dairesi ve yaşam mahallinde görünür yerde asılmalı.",
    reference: "SOLAS III/8.3 ve III/37.7",
  },
] as const;

export const musterReferences = [
  "SOLAS Chapter III — Regulations 6, 8, 10, 17-1, 19 and 37",
  "International Life-Saving Appliance (LSA) Code — section 7.2",
  "SOLAS Chapter II-1 / II-2 and the ship's Damage Control & Fire Control Plans",
  "ISM Code section 8 and the vessel-specific Safety Management System",
  "MARPOL Annex I Regulation 37 and the vessel's SOPEP/SMPEP",
] as const;

export const musterAssignmentById = Object.fromEntries(
  musterAssignments.map((assignment) => [assignment.id, assignment]),
) as Record<string, MusterAssignment>;
