import {
  Compass,
  Navigation,
  Radar as RadarIcon,
  Radio,
  SatelliteDish,
  Waves,
  Navigation2,
  HardDrive,
  Bell
} from "lucide-react";

const bridgeDeviceImages = {
  vhfRadio: new URL("../assets/bridge/vhf-radio.jpg", import.meta.url).href,
  dscPanel: new URL("../assets/bridge/dsc-panel.jpg", import.meta.url).href,
  ecdisConsole: new URL("../assets/bridge/ecdis-radar-console.jpg", import.meta.url).href,
  radarDisplay: new URL("../assets/ship-systems/radar.jpg", import.meta.url).href,
  navtexReceiver: new URL("../assets/bridge/navtex-receiver.jpg", import.meta.url).href,
  aisDisplay: new URL("../assets/bridge/ais-display.jpg", import.meta.url).href,
  gyroCompass: new URL("../assets/bridge/gyro-compass.jpg", import.meta.url).href,
  inmarsatTerminal: new URL("../assets/bridge/inmarsat-terminal.jpg", import.meta.url).href,
  echoSounder: new URL("../assets/bridge/echo-sounder.jpg", import.meta.url).href,
  vdrUnit: new URL("../assets/bridge/vdr-unit.jpg", import.meta.url).href,
} as const;

export type BridgeDeviceId =
  | "vhf"
  | "dsc"
  | "ecdis"
  | "radar"
  | "navtex"
  | "ais"
  | "gyro"
  | "autopilot"
  | "inmarsat"
  | "echo-sounder"
  | "vdr"
  | "bnwas";

export interface BridgeDeviceInfo {
  id: BridgeDeviceId;
  name: string;
  description: string;
  summary: string;
  /** How the device works, in two or three sentences. */
  principle: string;
  /** Why this particular device matters on the bridge. */
  whyImportant: string;
  icon: typeof Radio;
  accent: string;
  images: string[];
  duties: string[];
  operations: string[];
  monitoring: string[];
  integration: string[];
  /** Carriage and performance requirements; only references that were checked. */
  requirements: string[];
  /** Mistakes that recur on watch and in incident reports. */
  commonErrors: string[];
}

export const bridgeDevices: BridgeDeviceInfo[] = [
  {
    id: "vhf",
    name: "VHF",
    description: "Kanal yönetimi, distress ve routine call kontrolleri",
    summary:
      "GMDSS kapsamında gemi-gemi ve gemi-kıyı arasındaki temel ses haberleşmesini sağlar; kanal 16 sürekli dinleme ve köprüüstü koordinasyonu için kritik rol oynar.",
    principle:
      "VHF telsiz 156–174 MHz deniz bandında çalışır. Sinyal görüş hattında yayıldığı için menzil anten yüksekliğine bağlıdır ve gemiden gemiye menzil, yüksek antenli kıyı istasyonlarına göre daha kısadır. Simpleks kanallarda aynı anda yalnız bir istasyon konuşabilir; bu nedenle kısa, standart (SMCP) ifadeler ve kanal disiplini esastır.",
    whyImportant:
      "VHF, köprüüstünün dış dünyayla en hızlı bağlantısıdır: çatışma riskinde karşı gemiyle, yanaşmada pilot ve VTS ile, tehlikede kıyı istasyonu ve yakındaki gemilerle ilk temas çoğunlukla bu cihazla kurulur. Yanlış kanal ya da belirsiz bir mesaj, doğru bir kararı geciktirebilir.",
    icon: Radio,
    accent: "from-sky-500 via-blue-500 to-indigo-500",
    images: [bridgeDeviceImages.vhfRadio],
    duties: [
      "Görüş hattı mesafelerde emniyet, operasyonel ve liman kılavuz çağrıları",
      "Mayday, Pan-Pan ve Sécurité anonslarının hızlı ve prosedüre uygun iletimi",
      "Kanal 13/16/06 gibi köprüüstü ve manevra kanallarında sürekli dinleme",
      "Pilot ve VTS ile yanaşma/kalkış sırasında kesintisiz koordinasyon"
    ],
    operations: [
      "Kanal seçimi: Acil durum için CH16, manevra için CH13/12, liman otoritesi talimatlarına göre yerel kanallar",
      "Güç ve anten kontrolleri: 25 W/1 W çıkış seçimi, anten SWR ve ayrım mesafesi doğrulaması",
      "DSC bağlantılı cihazlarda MMSI ve grup çağrılarının hazır tutulması",
      "Sessizlik (silence) modunun sadece otorite talebiyle ve kısa süreli kullanılması"
    ],
    monitoring: [
      "Çekiş ve demir operasyonlarında parazit veya crosstalk için squelch ayarını optimize et",
      "Köprüüstü alarmlarını kayda al; kayıt cihazı varsa ses kayıtlarını zaman damgasıyla arşivle",
      "Kanal tıkanıklığı veya acil durum taşması olduğunda MF/HF veya uyduya yönel",
      "Yedek el VHF'lerin batarya ve watertight kapak kontrollerini günlük yap"
    ],
    integration: [
      "VTS, pilot ve kurtarma koordinasyon merkezleriyle standart mayday formatında iletişim",
      "DSC cihazı varsa otomatik distress/urgency başlatma ve navtex/ais uyarılarıyla birlikte kullanma",
      "Köprüüstü kayıt sistemine (VDR/S-VDR) ses çıkışını besleyerek olay sonrası analiz"
    ],
    requirements: [
      "SOLAS IV: DSC'li VHF telsiz tesisi (CH70 DSC dinlemesi ve CH16 ses) tüm deniz alanlarında taşınır",
      "SOLAS III/6: 500 GT ve üstü gemilerde en az 3, 300–500 GT arası gemilerde en az 2 adet GMDSS el telsizi (two-way VHF) bulunur",
      "Telsiz trafiği ve testler GMDSS telsiz jurnaline kaydedilir"
    ],
    commonErrors: [
      "CH16'yı uzun konuşmalar için kullanmak; ilk temastan sonra çalışma kanalına geçmemek",
      "Gemi adını, konumu ve niyeti net vermemek; 'kırmızı gemi' gibi belirsiz tariflerle COLREG manevrası kararlaştırmak",
      "Squelch'i çok yüksek tutup zayıf çağrıları kaçırmak"
    ]
  },
  {
    id: "dsc",
    name: "DSC",
    description: "Distress, urgency ve safety çağrı protokolleri",
    summary:
      "Digital Selective Calling, GMDSS'in dijital uyarı katmanıdır; otomatik konumlu distress/urgency çağrılarını ve seçilmiş istasyonla sessiz arama kurar.",
    principle:
      "DSC, sesli haberleşmeden önce dijital bir çağrı gönderir: VHF'te CH70, MF'te 2187,5 kHz kullanılır. Çağrı; gönderen MMSI, öncelik (distress, urgency, safety, routine), konum ve zaman bilgisi ile sonraki sesli trafiğin yapılacağı kanalı taşır. Distress alarmı, onay (acknowledgement) alınana kadar cihaz tarafından otomatik olarak tekrarlanır.",
    whyImportant:
      "DSC sayesinde tek bir tuşla, konum ve tehlikenin türüyle birlikte alarm menzildeki tüm kıyı istasyonlarına ve gemilere ulaşır. Operatör panikte olsa bile kritik bilgiler otomatik gider; yanlış girilmiş MMSI veya eski konum ise kurtarmayı yanlış yere yönlendirir.",
    icon: Waves,
    accent: "from-cyan-400 via-cyan-500 to-teal-600",
    images: [bridgeDeviceImages.dscPanel],
    duties: [
      "Tek tuşla MMSI ve GNSS konum bilgisi içeren distress alarmı gönderir",
      "Seçici arama ile belirli gemi/kiyi istasyonuna rutin veya urgency çağrı",
      "Otomatik ack/relay akışlarıyla SAR zincirinin hızlı kurulumu",
      "Gemiye ait MMSI, grup numarası ve RX/TX frekans setlerinin yönetimi"
    ],
    operations: [
      "GNSS girişinin doğruluğunu günlük kontrol et; konum yoksa manuel gir ve logla",
      "Distress kategorisi (fire, flooding, collision vb.) seçimini tatbikatlarda tekrar et",
      "RX/ACK işlemlerinde sesli takip için ilgili VHF veya MF/HF kanalına geçiş",
      "Gürültü ve yanlış alarm riskine karşı test çağrılarını (test call) mesai dışı yoğun olmayan zamanda yap"
    ],
    monitoring: [
      "Alarm geçmişini (log) yedekle; VDR entegrasyonu varsa kayıtların çalıştığını doğrula",
      "Anten ve modülasyon performansını SWR metre ve BITE self-test ile kontrol et",
      "Kurulum değişiklikleri sonrası MMSI, ATIS ve frekans tablolarını iki kişiyle çapraz doğrula",
      "Deneme çağrılarında alınan ACK sürelerini kaydedip kapsama kalitesini izleme"
    ],
    integration: [
      "Navtex ve AIS emniyet mesajlarıyla paralel uyarı; SAR koordinasyonunda EPIRB/PLB ile birlikte",
      "VHF-DSC ve MF/HF-DSC arasında bölgeye (Sea Area A1/A2/A3) göre otomatik öncelik",
      "Gemi telsiz el kitabı ve GMDSS konsolu üzerinde ortak alarm planı"
    ],
    requirements: [
      "SOLAS IV: VHF-DSC tüm deniz alanlarında zorunludur; A1 dışına çıkan gemiler ek olarak en az MF-DSC kapasitesi taşır",
      "Bayrak devletinin verdiği 9 haneli MMSI cihaza doğru girilmiş olmalıdır",
      "DSC fonksiyonları gerçek alarm gönderilmeden, cihazın test menüsüyle veya kıyı istasyonuna test çağrısıyla denenir"
    ],
    commonErrors: [
      "Yanlışlıkla gönderilen distress alarmını iptal etmemek: cihaz kapatılmaz, alarm durdurulur ve CH16'da 'All stations' anonsuyla iptal edildiği bildirilir",
      "Konum GNSS'ten gelmediğinde eski konumla alarm göndermek",
      "Alınan distress alarmını DSC ile onaylamak; gemiler normalde onayı kıyı istasyonuna bırakır ve gerekirse CH16'da sesle yanıt verir"
    ]
  },
  {
    id: "ecdis",
    name: "ECDIS",
    description: "Rota planlama, ENC güncellemeleri ve alarmlar",
    summary:
      "Elektronik seyir haritası sistemi; SOLAS uyumlu rota planlama, ENCs, alarmlar ve sensör entegrasyonu ile kâğıt haritaya eşdeğer resmi seyir sağlar.",
    principle:
      "ECDIS, resmî ENC verisini (S-57) GNSS konumu, gyro heading ve log hızıyla birleştirerek geminin anlık konumunu harita üzerinde gösterir. Vektör harita olduğu için derinlik konturları ve tehlikeler nesne olarak tanımlıdır; bu sayede safety contour ve look-ahead alarmları rotadaki tehlikeler için otomatik uyarı verebilir.",
    whyImportant:
      "ECDIS bugün çoğu gemide birincil seyir aracıdır; passage plan, konum takibi ve sığ su alarmları aynı ekranda toplanır. Yanlış ayarlanmış bir safety contour veya kapatılmış bir alarm, gemiyi uyarı vermeden sığlığa götürebilir; birçok karaya oturma raporunda ECDIS'in yanlış kullanımı temel nedenler arasındadır.",
    icon: Navigation,
    accent: "from-emerald-500 via-teal-500 to-cyan-500",
    images: [bridgeDeviceImages.ecdisConsole],
    duties: [
      "Passage plan üretimi: appraisal–planning–execution–monitoring aşamalarının dijital yönetimi",
      "ENC güncellemeleri, T&P notları ve katmanların (CATZOC, batimetri, AIO) doğrulanması",
      "Sensor entegrasyonu: GPS/INS, gyro, log, AIS, radar overlay, Navtex/T&P layer",
      "Rota devri sırasında master/pilot review ve alarm limitlerinin yazılı onayı"
    ],
    operations: [
      "XTD, turn radius/speed ve safety contour/safety depth limitlerini sefer özelliklerine göre ayarla",
      "Look-ahead alarmlarını (shoal, nav aid, TSS, no-go) test et ve bridge team ile paylaş",
      "ENC cell lisanslarının süresini ve S-63/S-57/S-101 formatlarının uyumunu takip et",
      "UPS/güç yedekliliği ve sensör kaybı senaryolarında yedek ECDIS veya kağıt haritaya geçiş prosedürü"
    ],
    monitoring: [
      "Track control veya pilotage sırasında radar overlay parazit ve heading latency'yi izleme",
      "Position source değişimlerinde (GPS1 → GPS2 → DR/INS) alarm/ack zincirini belgeleyin",
      "Layer yoğunluğu ve parlaklık ayarlarını gece seyri için optimize et",
      "VDR ekran kayıtlarının çalıştığını periyodik kontrol et"
    ],
    integration: [
      "Conning display, pilot plug ve VTS paylaşımı için waypoint ve ETA çıktıları",
      "UKC/air-draft hesap modülleri, tidal/meteoroloji katmanları ve Navtex uyarılarını rota üzerine bindirme",
      "AIS, radar ARPA hedefleri ve CPA/TCPA katmanlarıyla birleşik durum farkındalığı"
    ],
    requirements: [
      "SOLAS V/19: ECDIS, 500 GT ve üstü yolcu gemileri ile 3000 GT ve üstü tankerler ve yeni yük gemileri için 2012–2018 arasında aşamalı olarak zorunlu hâle geldi",
      "Performans standardı: IMO MSC.232(82)",
      "Yedek düzenleme: ikinci bağımsız ECDIS veya güncel kâğıt harita portföyü",
      "STCW kapsamında genel ECDIS eğitimi ve gemideki modele özgü (type-specific) eğitim"
    ],
    commonErrors: [
      "Safety contour'u gemi draftına ve UKC'ye göre ayarlamamak; seçilen değer ENC'de yoksa sistem bir sonraki daha derin konturu kullanır",
      "Rota kontrolünü (route check) çalıştırmadan veya uyarıları okumadan rotayı onaylamak",
      "Ekranı aşırı sadeleştirip seyir yardımcılarını ve uyarı alanlarını gözden kaçırmak; uygun ölçekte olmayan (overscale) görüntüye güvenmek",
      "ENC güncellemelerini ve T&P bildirimlerini işlemeden sefere çıkmak"
    ]
  },
  {
    id: "radar",
    name: "Radar",
    description: "ARPA, CPA/TCPA ve yağmur/deniz clutter ayarları",
    summary:
      "Radar ve ARPA hedef takibi, çarpışma önleme ve yakın seyirde durumsal farkındalığın ana sensörüdür; deniz/yağmur clutter kontrolü güvenli ayrımı sağlar.",
    principle:
      "Radar kısa mikrodalga darbeleri gönderir; hedeften dönen yankının süresinden mesafeyi, antenin yönünden kerterizi bulur. X-band (9 GHz, 3 cm) daha iyi çözünürlük verir; S-band (3 GHz, 10 cm) yağmur ve deniz yansımasından daha az etkilenir. ARPA, ardışık ölçümlerden hedefin rotasını, süratini, CPA ve TCPA değerlerini hesaplar.",
    whyImportant:
      "Radar; gece, sis ve yağmurda diğer gemileri, kıyıyı ve şamandıraları gösteren ana sensördür ve hedeften bağımsız çalışır: karşı geminin AIS'i kapalı olsa bile yankı ekrana gelir. Doğru ayarlanmış radar ve sistematik plotlama, COLREG'e göre erken ve kararlı manevranın temelidir.",
    icon: RadarIcon,
    accent: "from-indigo-500 via-blue-600 to-slate-700",
    images: [bridgeDeviceImages.radarDisplay],
    duties: [
      "Hedef tespiti ve ARPA takibiyle CPA/TCPA hesaplama",
      "Head-up/ North-up/ Course-up modlarıyla pilotaj ve açık deniz kullanımına uygun görünüm",
      "True/relative motion ve ground/sea stabilization yönetimi",
      "Guard zone, exclusion zone ve alarm ayarlarıyla erken uyarı"
    ],
    operations: [
      "Gain, sea, rain clutter ve interference rejection ayarlarını çevre koşullarına göre optimize et",
      "Paralel index (PI) ve VRM/EBL ile referans mesafe/açılar oluştur",
      "Target swap ve manual acquire kullanarak yanlış ARPA eşleşmelerini düzelt",
      "Heading/görüntü gecikmesi için gyro latency ve log kaymasını düzenli kontrol et"
    ],
    monitoring: [
      "Gyro, log ve GPS kaynaklarında kopma yaşanırsa STW/COG fallback modlarına geç",
      "Close-quarters manevrada guard zone alarm sürelerini kısalt ve güvenli limiti daralt",
      "X-band/S-band seçimini görüş, yağmur ve yol tutuşuna göre yap",
      "Ekran parlaklığı ve renk paletini gece görüşünü bozmayacak şekilde ayarla"
    ],
    integration: [
      "ECDIS radar overlay ve AIS target fusion ile birleşik tablo",
      "VDR kayıt çıkışları ve bridge alert management (BAM) sistemine alarm gönderimi",
      "ARPA hedeflerinin VHF/DSC/AIS ile doğrulanarak köprüüstü iletişim"
    ],
    requirements: [
      "SOLAS V/19: 300 GT ve üstü gemilerde 9 GHz (X-band) radar; 3000 GT ve üstü gemilerde ondan bağımsız ikinci radar (3 GHz veya ikinci 9 GHz)",
      "SOLAS V/19: 500 GT ve üstü gemilerde otomatik hedef takibi (ATA veya ARPA) bulunur",
      "Performans standardı: IMO MSC.192(79)",
      "COLREG Kural 7: radar varsa uzun mesafe taraması ve sistematik plotlama dahil uygun şekilde kullanılır"
    ],
    commonErrors: [
      "Çatışma önleme için ground stabilization kullanmak; akıntıda hedeflerin görünüşü (aspect) yanlış çıkar, bu amaçla sea stabilization tercih edilir",
      "Clutter'ı aşırı bastırıp küçük tekne ve şamandıraları ekrandan silmek",
      "Yetersiz radar bilgisine (scanty radar information), özellikle tek bir ölçüme dayanarak karar vermek",
      "AIS bilgisini radarın yerine koymak; AIS yayını olmayan hedefler yalnız radarda görünür"
    ]
  },
  {
    id: "navtex",
    name: "Navtex",
    description: "Meteoroloji, seyir uyarıları ve MSI mesajları",
    summary:
      "Navigational Telex, kıyı istasyonlarından seyrüsefer ve meteoroloji uyarılarını otomatik alır; MSI ve SAR bildirimleri için düşük bant genişlikli zorunlu GMDSS katmanıdır.",
    principle:
      "NAVTEX, kıyı istasyonlarının sırayla, zaman paylaşımlı yaptığı yayınları alır: uluslararası yayınlar 518 kHz'de İngilizce, ulusal dildeki yayınlar 490 kHz'de, tropik bölgelerdeki yayınlar 4209,5 kHz'dedir. Her mesaj başlığı istasyon harfi (B1), mesaj tipi (B2) ve seri numarasından (B3B4) oluşur; alıcı aynı mesajı ikinci kez göstermez.",
    whyImportant:
      "Batık, sönük fener, yeri değişmiş şamandıra, fırtına uyarısı ve kayıp gemi gibi bilgiler gemiye ilk olarak çoğunlukla NAVTEX ile ulaşır. Bu bilgiler haritada henüz yoktur; mesajı okumayan vardiya zabiti rotasındaki tehlikeden habersiz kalır.",
    icon: SatelliteDish,
    accent: "from-yellow-400 via-amber-500 to-amber-700",
    images: [bridgeDeviceImages.navtexReceiver],
    duties: [
      "NAVAREA/METAREA yayınlarının otomatik alımı ve kategorilere göre filtrelenmesi",
      "SAR, seyir engelleri, fener ve diğer seyir yardımcılarının arızaları ile fırtına uyarılarının köprüüstüne iletimi",
      "Yeni mesajların ECDIS/rota planına yansıtılması ve watchkeeper imzasıyla loglanması",
      "B1/B2 kod yönetimiyle bölgesel gereksiz trafiğin süzülmesi"
    ],
    operations: [
      "518/490/4209.5 kHz frekanslarını deniz alanına göre seç ve anten uyumluluğunu doğrula",
      "Mesaj sınıflarını (A=seyir, B=meteoroloji, D=SAR vb.) filtrele; otomatik çıktı yazdırma/arkivle",
      "Makine/eşik paraziti durumunda anten topraklama ve kablo ekranlamasını kontrol et",
      "Mesaj saatlerini UTC olarak köprüüstü jurnaline kaydet, pilotage öncesi yeni yayın var mı kontrol et"
    ],
    monitoring: [
      "Alım kalitesini sinyal seviyesi ve hata oranıyla takip et; zayıf alımda frekans/power ayarı yap",
      "Eski mesajları periyodik silerek hafıza doluluk alarmını önle",
      "NAVTEX Tx arızalarında alternatif MSI kaynağı olarak Inmarsat SafetyNET veya VHF Sécurité anonslarını hazır tut",
      "Tehlike mesajlarını bridge team'e sözlü aktar ve ECDIS üzerinde ilgili noktayı işaretle"
    ],
    integration: [
      "ECDIS üzerinde T&P/temporary notice katmanına manuel işaretleme",
      "GMDSS konsolu, köprüüstü durum ekranı ve VDR kayıt entegrasyonu",
      "AIS emniyet mesajları ve DSC uyarılarıyla birlikte alarm matrisine dahil et"
    ],
    requirements: [
      "SOLAS IV: NAVTEX hizmeti verilen bölgelerde sefer yapan gemilerde NAVTEX alıcısı bulunur",
      "Performans standardı: IMO MSC.148(77)",
      "A (seyir uyarıları), B (meteorolojik uyarılar), D (SAR ve korsanlık bilgileri) ve L (ek seyir uyarıları) mesajları alıcıda reddedilemez",
      "Menzil tipik olarak kıyıdan yaklaşık 250–400 deniz milidir"
    ],
    commonErrors: [
      "Seyir bölgesindeki istasyonları (B1) seçmeyi unutmak; yeni bölgeye girildiğinde alıcı eski istasyonları dinlemeye devam eder",
      "Gelen uyarıyı okuyup rota üzerinde işaretlememek veya vardiya devrinde aktarmamak",
      "Kâğıt bitti veya hafıza doldu alarmını görmezden gelmek"
    ]
  },
  {
    id: "ais",
    name: "AIS",
    description: "Mesaj tipleri, target filtreleri ve emniyet mesajları",
    summary:
      "Automatic Identification System, seyir bilgilerini yayınlar ve alır; çarpışma önleme, trafik resmi ve liman otoritesi bilgi akışı için ana veri kaynağıdır.",
    principle:
      "AIS, VHF deniz bandında iki kanalda (AIS 1: 161,975 MHz, AIS 2: 162,025 MHz) otomatik veri yayını yapar. Class A cihazları zaman dilimlerini SOTDMA ile paylaşır; dinamik veriler sürat ve dönüşe göre birkaç saniyede bir, demirdeyken 3 dakikada bir, statik ve sefer verileri 6 dakikada bir gönderilir. Konum ve sürat bilgisi geminin kendi GNSS'inden gelir.",
    whyImportant:
      "AIS, hedefin adını, MMSI'sini ve niyetini (varış limanı, seyir durumu) ekrana getirir; köprüüstüler arası iletişimi kolaylaştırır ve radar gölgesindeki gemileri bile gösterebilir. Ancak yalnız yayın yapan gemiler görünür ve veriler karşı geminin girdisine bağlıdır; bu nedenle AIS radarın tamamlayıcısıdır, yerine geçmez.",
    icon: Radio,
    accent: "from-violet-500 via-indigo-500 to-blue-500",
    images: [bridgeDeviceImages.aisDisplay],
    duties: [
      "Statik (IMO, MMSI, çağrı adı) ve dinamik (SOG, COG, ROT) bilgileri periyodik yayınlama",
      "Voyage related veriler (ETA, yük, varış limanı, taslak) ve emniyet mesajları",
      "Hedeflerin CPA/TCPA bilgisini radar/ECDIS ile karşılaştırma",
      "SART/AtoN/BASE station mesajlarını izleme ve raporlama"
    ],
    operations: [
      "Yanlış kimlik yayınını önlemek için statik verileri sefer başında çift kontrol et",
      "Silent mode veya düşük güç modunu sadece otorite talebiyle ve kayıt altına alarak kullan",
      "Target filtreleriyle gereksiz yakın kıyı trafiğini süz, fakat emniyet mesajlarını açık bırak",
      "Pilot plug veya VTS entegrasyonu için NMEA/USB çıkışlarını doğrula"
    ],
    monitoring: [
      "GPS kaynağı kaybında dead reckoning yayınına geçildiğini alarm ekranından izle",
      "CPA/TCPA farkları görürsen radar/visual doğrulaması yap ve bridge team'e bildir",
      "SOTDMA/CSTDMA slot çakışmalarında TX gecikmelerini logla",
      "Çevre gemilerden alınan safety related message (SRM) içeriklerini köprü defterine geçir"
    ],
    integration: [
      "ECDIS ve radar overlay üzerinde hedef kimliklerinin görüntülenmesi",
      "VDR kayıtlarına AIS girişinin sağlandığını ve zaman senkronunun doğru olduğunu kontrol et",
      "DSC ve VHF çağrılarında MMSI seçimi için AIS hedef listesini kullan"
    ],
    requirements: [
      "SOLAS V/19: uluslararası sefer yapan 300 GT ve üstü gemiler, uluslararası sefer yapmayan 500 GT ve üstü yük gemileri ve tüm yolcu gemileri AIS taşır",
      "Performans standardı: IMO MSC.74(69) Ek 3; gemide kullanım rehberi: IMO A.1106(29)",
      "AIS sürekli çalışır durumda tutulur; yalnız kaptan gemi güvenliği için (ör. korsanlık riski) gerekli görürse kapatılır ve bu kayıt altına alınır"
    ],
    commonErrors: [
      "Seyir durumunu (navigational status) güncellememek: gemi seyirdeyken 'at anchor' yayınlamak",
      "Draft, varış limanı ve ETA'yı sefer başında güncellememek",
      "AIS'in CPA/TCPA değerine tek başına güvenmek; karşı geminin konumu onun GNSS'ine, heading'i gyro bağlantısına bağlıdır ve hatalı olabilir",
      "Her teknenin AIS yayını yaptığını varsaymak"
    ]
  },
  {
    id: "gyro",
    name: "Gyro / Pusula",
    description: "Heading kontrolü, düzeltmeler ve hata analizi",
    summary:
      "Gyro ve manyetik pusula, heading referansını sağlar; sensör entegrasyonunda hataların izlenmesi rota tutuşu ve sensör güvenliği için kritiktir.",
    principle:
      "Gyro pusula, hızla dönen bir rotorun Dünya'nın dönüşü ve yer çekimiyle etkileşerek coğrafi kuzeyi (true north) aramasıyla çalışır. Manyetik alandan etkilenmediği için deviation ve variation yoktur; ancak enlem ve sürate bağlı hata (speed/latitude error) ile küçük bir sabit gyro hatası bulunabilir. Çalıştırıldıktan sonra kuzeye oturması (settling) birkaç saat sürer.",
    whyImportant:
      "Radar, ECDIS, ARPA, AIS ve otopilot heading bilgisini gyrodan alır. Gyrodaki birkaç derecelik hata, radar overlay'in kaymasına, ARPA'nın yanlış CPA hesaplamasına ve otopilotun gemiyi sessizce rotadan çıkarmasına yol açar; manyetik pusula ise elektrik kesildiğinde son bağımsız yön referansıdır.",
    icon: Compass,
    accent: "from-slate-600 via-gray-700 to-stone-800",
    images: [bridgeDeviceImages.gyroCompass],
    duties: [
      "COG/heading referansı sağlayarak radar, ECDIS, autopilot ve conning sistemlerini besler",
      "Gyro deviation ve magnetic variation hesaplarıyla gerçek/Manyetik yönleri düzeltir",
      "Emergency steering ve manyetik pusula yedeklemesi için sürekli hazır tutma",
      "Hava koşulları, hız ve enleme bağlı gyro drift takibi"
    ],
    operations: [
      "Gyro settle time sonrası heading'i pelorus veya azimuth mirror ile doğrula",
      "Manyetik pusula için günlük/haftalık deviasyon kaydı ve flinders/flinder çubuk kontrolü",
      "Sensor selection panelinden gyro1/gyro2 veya compass fallback seçimini kayıt altına al",
      "UPS ve power supply kontrolü; alarm durumunda autopilot'u hand steering'e geçir"
    ],
    monitoring: [
      "Drift veya ani sapmalarda diğer sensörlerle (GPS COG, visual transit) karşılaştırma",
      "Radar/ECDIS üzerindeki heading latency veya offset'i periyodik test et",
      "Repeaters ve bearing repeaters'ın kalibrasyonunu kontrol et",
      "Magnetic compass'ta kabarcık, card lekesi, aydınlatma ve degaussing etkilerini gözle"
    ],
    integration: [
      "Autopilot ve track control için heading/ROT girdisi",
      "VDR, radar, ECDIS ve AIS'e NMEA heading bilgisi dağıtımı",
      "Rate-of-turn verisinin pilotage ve manevra kayıtlarında kullanımı"
    ],
    requirements: [
      "SOLAS V/19: tüm gemilerde güç kaynağı gerektirmeyen bir manyetik pusula ve kerteriz alma imkânı bulunur",
      "SOLAS V/19: 500 GT ve üstü gemilerde gyro pusula ve acil dümen mevkiinden görülebilen heading göstergesi bulunur",
      "STCW A-VIII/2: pusula hataları en az vardiyada bir kez ve mümkünse her büyük rota değişikliğinden sonra belirlenir"
    ],
    commonErrors: [
      "Gyroya enlem ve sürat girdisi elle veriliyorsa bunları güncellememek",
      "Güç kesintisinden sonra repeater'ları ana gyro ile hizalamadan kullanmak",
      "Gyro hatasını kontrol etmeden kerterize ve paralel index'e güvenmek"
    ]
  },
  {
    id: "autopilot",
    name: "Otopilot",
    description: "Track control, yaw damping ve alarm limitleri",
    summary:
      "Otopilot, rota veya track takip ederken dümen komutlarını optimize eder; yakıt, konfor ve güvenlik için kontrol modları ve limitler hassas ayarlanmalıdır.",
    principle:
      "Otopilot (heading control system), gyrodan aldığı heading ile ayarlanan rota arasındaki farkı ölçer ve dümen makinesine düzeltici dümen açısı komutu verir. Rudder (gain), counter rudder ve yaw (weather) ayarları dümenin ne kadar sert ve ne sıklıkla kullanılacağını belirler. Track control modunda ECDIS'ten gelen rotaya göre XTD'yi de düzeltir ve waypoint'lerde dönüşü yapar.",
    whyImportant:
      "Otopilot uzun açık deniz seyrinde dümenciyi rahatlatır ve yakıt tasarrufu sağlar; fakat birçok çatışma ve karaya oturmada vardiya zabiti gemiyi otopilotta bırakıp el dümenine geçmekte geç kalmıştır. Modlar, alarmlar ve el dümenine geçiş adımları her zabit tarafından ezbere bilinmelidir.",
    icon: Navigation2,
    accent: "from-lime-500 via-green-600 to-emerald-800",
    images: [],
    duties: [
      "Heading hold, course over ground veya track control modlarında otomatik dümenleme",
      "Rudder limit, rate limit ve yaw damping ile konforlu ve ekonomik seyir",
      "Track cross error, drift ve set için hata düzeltmesi",
      "Hand-over/take-over prosedürlerinde hızlı geçiş ve alarm yönetimi"
    ],
    operations: [
      "Pilotaj ve dar geçitlerde el ile dümen; açık denizde uygun gain ve counter rudder ayarı",
      "Track control modunda ECDIS ile waypoint doğrulaması ve XTD limitlerini aktifleştir",
      "Rudder ve rate limitlerini hava/deniz durumuna göre artır veya azalt",
      "Alarmları (off-course, gyro fail, follow-up fail) test ederek bridge log'a işle"
    ],
    monitoring: [
      "Yaw ve heading sapmalarını trend olarak izle; aşırı trim veya yük dengesizliğinde ayarları güncelle",
      "Hydraulic/steering gear basınç ve yağ sıcaklıklarını alarm panelinden takip et",
      "Rudder angle feedback ile otopilot komutlarının tutarlılığını doğrula",
      "E-Nav entegrasyonlarında sensör kaybında otomatik hand steering'e düşme davranışını test et"
    ],
    integration: [
      "Gyro, log ve GPS'ten heading/COG/SOG girdileri; ECDIS track control arayüzü",
      "VDR ve bridge alert management sistemine alarm/veri çıkışı",
      "Follow-up/Non-follow-up (NFU) ve tiller/joystick kontrol istasyonlarıyla birlikte çalışır"
    ],
    requirements: [
      "SOLAS V/24: yoğun trafikte, kısıtlı görüşte ve diğer tehlikeli seyir durumlarında otomatik dümen kullanılıyorsa el dümenine hemen geçilebilmeli ve dümenci hazır bulunmalıdır",
      "SOLAS V/24: uzun süre otomatik dümen kullanıldıktan sonra ve özel dikkat gerektiren bölgelere girmeden önce el dümeni test edilir",
      "SOLAS V/26: kalkıştan önceki 12 saat içinde dümen donanımı test edilir; acil dümen tatbikatı en az 3 ayda bir yapılır",
      "Performans standartları: heading control için IMO MSC.64(67) Ek 3, track control için IMO MSC.74(69) Ek 2"
    ],
    commonErrors: [
      "Pilot alırken veya bırakırken, dar geçitte ya da yoğun trafikte otopilotta kalmak",
      "El dümenine geçişte override/take-over düğmesinin yerini ve seçici şalterin sırasını bilmemek",
      "Ağır havada yaw (weather) ayarını artırmayıp dümen makinesini sürekli çalıştırmak"
    ]
  }
  ,
  {
    id: "inmarsat",
    name: "Inmarsat / SafetyNET",
    description: "MSI, SafetyNET, veri/telefon ve GMDSS uydu katmanı",
    summary:
      "Inmarsat-C (EGC) ve modern uydu terminalleri; NAVAREA/METAREA SafetyNET mesajları, distress/urgency haberleşmesi ve veri servisleri için kullanılır. NAVTEX kapsaması dışına çıkıldığında kritik yedek MSI kaynağıdır.",
    principle:
      "Inmarsat-C terminali, yer sabit (geostationary) uydular üzerinden kaydet-ilet (store-and-forward) mantığıyla mesaj gönderir ve alır. EGC (Enhanced Group Call) alıcısı, geminin bulunduğu NAVAREA/METAREA için yayınlanan SafetyNET deniz emniyeti bilgilerini otomatik olarak alır. Yer sabit uydular yaklaşık 70° kuzey ve güney enlemlerinin ötesini kapsamaz.",
    whyImportant:
      "Açık okyanusta NAVTEX menzili bittiğinde fırtına, buz, korsanlık ve SAR bilgileri gemiye SafetyNET ile gelir. A3 alanında aynı terminal, gemi ile kurtarma koordinasyon merkezi arasındaki tehlike alarmı ve mesajlaşmanın da ana yoludur.",
    icon: SatelliteDish,
    accent: "from-fuchsia-500 via-violet-500 to-indigo-600",
    images: [bridgeDeviceImages.inmarsatTerminal],
    duties: [
      "SafetyNET MSI mesajlarının alınması ve ilgili tehlikelerin rota planına işlenmesi",
      "GMDSS prosedürlerine uygun distress/urgency trafiğinin yürütülmesi",
      "Ekipman testleri, terminal log’larının tutulması ve printer/ekran arşivi",
      "Sea Area A3 operasyonlarında NAVTEX’in tamamlayıcısı/yedeği olarak hazır bulundurma",
    ],
    operations: [
      "EGC/SafetyNET alım parametrelerini (NAVAREA/METAREA) sefer bölgesine göre ayarla",
      "GNSS girişinin terminale doğru geldiğini kontrol et; konum yoksa manuel gir ve kaydet",
      "Printer/ekran kayıtlarının timestamp (UTC) ile tutulduğunu doğrula",
      "Distress test prosedürlerini şirket/flag talimatlarına uygun periyotta uygula",
    ],
    monitoring: [
      "Alım kesintilerinde anten, güç ve terminal self-test sonuçlarını kontrol et",
      "Yanlış filtreleme nedeniyle kritik MSI kaçmaması için alan/sektör ayarlarını periyodik gözden geçir",
      "UTC saat senkronizasyonunun doğru olduğundan emin ol (VDR/bridge log tutarlılığı)",
      "Terminalin oturum (login) durumunu ve bağlı olduğu okyanus bölgesi uydusunu günlük kontrol et",
    ],
    integration: [
      "NAVTEX, AIS SRM ve VHF Sécurité ile birlikte MSI bütünlüğü",
      "Passage plan appraisal aşamasında MSI risklerinin rota üzerine işlenmesi",
      "VDR kayıtlarının ve bridge log’un olay sonrası analiz için uyumlu tutulması",
    ],
    requirements: [
      "SOLAS IV: A3 deniz alanında sefer yapan gemiler, tanınmış bir mobil uydu hizmeti gemi yer istasyonu ya da MF/HF-DSC ile tehlike alarmı verebilmelidir",
      "NAVTEX kapsaması dışında MSI almak için EGC (SafetyNET) alıcısı gerekir",
      "IMO, 2018'de Iridium'u da GMDSS'te tanınmış uydu hizmeti olarak kabul etmiştir",
      "SOLAS IV/18: tehlike alarmına konum otomatik girmiyorsa, seyirde konum en çok 4 saatte bir elle güncellenir"
    ],
    commonErrors: [
      "Seyir bölgesi değiştiğinde NAVAREA/METAREA ve kıyı uyarısı (coastal warning) alanlarını güncellememek",
      "EGC mesaj listesini veya yazıcı kâğıdını kontrol etmeden vardiya devralmak",
      "Distress düğmesine test amacıyla basmak; testler yalnız cihazın test prosedürüyle yapılır"
    ]
  },
  {
    id: "echo-sounder",
    name: "Echo Sounder (Elektronik İskandil)",
    description: "Derinlik takibi, sığlık alarmları ve draft/tide offset yönetimi",
    summary:
      "Echo sounder, özellikle coastal/confined waters’da en kritik doğrulama sensörüdür. Draft ofseti, tide ofseti ve alarm eşikleri doğru ayarlanmadığında yanlış güven hissi yaratabilir.",
    principle:
      "İskandil, transdüserden suya akustik bir darbe gönderir ve deniz dibinden dönen yankının süresini ölçer; deniz suyunda ses hızı yaklaşık 1500 m/s alınarak derinlik hesaplanır. Ölçülen değer transdüserin altındaki derinliktir; omurga altı veya su hattından derinlik göstermek için offset doğru girilmelidir.",
    whyImportant:
      "Karaya oturmaya giden zincirin son halkasında, haritadaki derinliğin gerçekten orada olup olmadığını söyleyen tek cihaz iskandildir. Doğru offset ve iyi ayarlanmış bir sığlık alarmı, ECDIS'teki veya konumdaki bir hatayı vakit varken gösterir.",
    icon: Waves,
    accent: "from-blue-600 via-blue-800 to-indigo-950",
    images: [bridgeDeviceImages.echoSounder],
    duties: [
      "Derinlik trendini izleyerek sığ su riskini erken tespit",
      "Shallow/deep alarm limitlerini passage plan’a uygun yönetmek",
      "Charted soundings ile karşılaştırma yaparak sensör/doğruluk kontrolü",
      "Pilotaj, demirleme ve dar geçitlerde derinlik değerlerini belirli aralıklarla jurnale kaydetmek",
    ],
    operations: [
      "Draft offset ve (varsa) tide offset ayarlarını güncel draft’a göre doğrula",
      "Uygun frekans seçimi (50/200 kHz) ile yumuşak/sert dip ayrımına dikkat et",
      "Alarm eşiğini dar geçit ve pilotajda daha konservatif ayarla",
      "Ölçüm aralığını (range) beklenen derinliğe göre seç; derin suda ikinci yankı (second trace) yanıltıcı sığ okuma verebilir",
    ],
    monitoring: [
      "Kabarcık/sürat etkisiyle okuma bozulursa hız ve sensör modu ayarlarını gözden geçir",
      "Derinlik ile ECDIS bathymetry arasında tutarsızlıkta pozisyon/doğruluk teyidi yap",
      "Kayıt (paper/digital) çalışıyorsa timestamp ile sakla",
    ],
    integration: [
      "UKC hesapları (tide+squat) ile birlikte gerçek zamanlı derinlik doğrulaması",
      "VDR’ye derinlik girdisinin sağlandığını ve alarm log’larının kaydedildiğini kontrol et",
      "Derinlik trendinin ECDIS ve conning ekranında gösterilmesi",
    ],
    requirements: [
      "SOLAS V/19: 300 GT ve üstü gemiler ile tüm yolcu gemilerinde iskandil bulunur",
      "Performans standardı: IMO MSC.74(69) Ek 4; cihaz son 12 saatin derinlik kaydını gösterebilmelidir"
    ],
    commonErrors: [
      "Yükleme veya tahliyeden sonra draft değişince offset'i güncellememek",
      "Ekrandaki derinliğin transdüserin, omurganın mı yoksa su hattının altından mı ölçüldüğünü bilmemek",
      "Hava kabarcığı, balık sürüsü veya termoklin kaynaklı sahte yankıları gerçek dip sanmak"
    ]
  },
  {
    id: "vdr",
    name: "VDR / S-VDR",
    description: "Köprüüstü ses/veri/ekran kayıtları (kaza sonrası analiz)",
    summary:
      "VDR; radar/ECDIS görüntüleri, bridge audio, VHF, GNSS, gyro, log, echo sounder gibi girdileri kayıt altına alır. Kaza sonrası incelemenin temel kaynağıdır.",
    principle:
      "VDR; köprüüstü mikrofonlarını, VHF konuşmalarını, radar ve ECDIS görüntülerini, konum, sürat, heading, dümen ve makine emri ile yanıtını, derinliği, rüzgârı, AIS'i ve ana alarmları ortak bir zaman damgasıyla kesintisiz kaydeder. Kayıt döngüseldir: eski veri yeni verinin üzerine yazılır. Veriler darbeye, yangına ve basınca dayanıklı sabit kapsülde (fixed capsule), yeni nesil VDR'lerde ayrıca batmada yüzerek ayrılan kapsülde (float-free) saklanır.",
    whyImportant:
      "Kaza sonrası 'ne oldu?' sorusunun tarafsız cevabı VDR'dedir: soruşturmacılar köprüüstü konuşmalarını, ekranları ve emirleri saniye saniye yeniden oynatır. Çalışmayan veya kaydı yedeklenmeyen bir VDR hem dersin kaybolmasına hem de gemi ve zabit aleyhine sonuçlara yol açabilir.",
    icon: HardDrive,
    accent: "from-orange-500 via-orange-600 to-red-700",
    images: [bridgeDeviceImages.vdrUnit],
    duties: [
      "VDR durum ışığı ve self-test’lerin vardiya öncesi kontrolü",
      "Girdi kaynaklarının (GPS/gyro/log/echo sounder/radar video) aktif olduğunun doğrulanması",
      "APT (Annual Performance Test) ve servis kayıtlarının takip edilmesi",
      "Kayda girmeyen veya arızalı girdileri VDR alarm panelinden belirleyip kaydetmek",
    ],
    operations: [
      "UTC zaman kaynağının doğru olduğunu doğrula (timestamp tutarlılığı)",
      "Alarm/arıza durumunda şirket prosedürüne göre kayıt ve bildirim",
      "Uzun süreli arızada bridge log’a not düş ve yedek kayıt yöntemlerini devreye al",
      "Kaza veya ciddi bir olaydan sonra kaydı hemen yedekle (save/backup); cihazın gücünü kesme ve veri silme",
    ],
    monitoring: [
      "Kritik olaylarda (near miss, heavy weather) VDR kayıtlarının tutulduğunu teyit et",
      "Video input’larda siyah ekran/overlay sorunlarında kablo ve seçili kaynakları kontrol et",
      "Köprüüstü mikrofonlarının çalıştığını ve kaydın anlaşılır olduğunu APT ve rutin kontrollerle doğrula",
    ],
    integration: [
      "BNWAS, radar/ECDIS, VHF/DSC ve sensörlerden gelen log’ların ortak zaman tabanında tutulması",
      "Eğitim/olay sonrası değerlendirmede playback ile BRM analizine destek",
      "Kaza soruşturmasında VDR verileri bayrak devletinin soruşturma kuruluşu tarafından kullanılır",
    ],
    requirements: [
      "SOLAS V/20: yolcu gemileri ile 3000 GT ve üstü diğer gemilerde VDR bulunur; mevcut yük gemilerinde S-VDR kabul edilmiştir",
      "SOLAS V/18.8: VDR'nin yıllık performans testi (APT) onaylı servis tarafından yapılır",
      "Performans standardı: 1 Temmuz 2014 ve sonrasında kurulan VDR'ler için IMO MSC.333(90)",
      "Sabit kapsüldeki sualtı yer belirleme vericisinin (ULB) pil son kullanma tarihi takip edilir"
    ],
    commonErrors: [
      "Olaydan sonra kaydı yedeklemeyi unutmak; döngüsel kayıt kritik dakikaların üzerine yazar",
      "Sürekli tekrarlayan VDR arıza alarmını susturup sebebini araştırmamak",
      "Köprüüstü mikrofonlarının önünü kapatmak veya yüksek sesli radyo ve müzikle kaydı anlaşılmaz hâle getirmek"
    ]
  },
  {
    id: "bnwas",
    name: "BNWAS",
    description: "Vardiya uyanıklık alarm sistemi (SOLAS gereği)",
    summary:
      "BNWAS, köprüüstü vardiya zabitinin uyanıklığını kontrol eder; süre sonunda onay gelmezse aşamalı alarm üretir. Tek personel vardiyada risk azaltır ve PSC denetimlerinde kritik kontrol maddesidir.",
    principle:
      "BNWAS, vardiya zabitinin belirli bir süre (dormant period, 3–12 dakika) içinde reset düğmesine basması veya hareketinin algılanmasıyla etkinliğini doğrular. Onay gelmezse alarm kademelenir: önce köprüüstünde görsel uyarı, 15 saniye sonra köprüüstünde sesli alarm, ardından kaptanın veya yedek zabitin bulunduğu yerde uzak alarm, daha sonra diğer personelin bulunduğu yerlerde alarm.",
    whyImportant:
      "Gece vardiyasında uyuyakalan veya aniden rahatsızlanan tek bir zabit, gemiyi dakikalar içinde karaya veya başka bir gemiye götürebilir. BNWAS bu durumu fark eder ve sırayla kaptanı ve mürettebatı uyarır; tek kişilik köprüüstü vardiyasının son güvenlik ağıdır.",
    icon: Bell,
    accent: "from-red-500 via-red-600 to-rose-800",
    images: [],
    duties: [
      "Zamanlayıcı (3–12 dk gibi) ve alarm kademelerinin gemi prosedürüne uygun ayarı",
      "Reset butonları/hareket sensörleri işlev testi ve alarm zincirinin doğrulanması",
      "Bridge log’da vardiya başlangıcında BNWAS aktifliğinin kaydı",
      "Uzak alarm noktalarının (kaptan ve zabit kamaraları) periyodik testi",
    ],
    operations: [
      "Pilotaj/dar geçitlerde uygun modun seçilmesi (master talimatına göre)",
      "Yanlış alarm ve inhibit kullanımlarının kayıt altına alınması",
      "Alarm escalation (captain call) hatlarının çalıştığının periyodik kontrolü",
      "Acil çağrı (emergency call) düğmesiyle kaptanı veya yedek zabiti hemen köprüüstüne çağırmak",
    ],
    monitoring: [
      "Alarm log’larını ve sistem hatalarını izleyip bakım planına işlemek",
      "Kritik dönemlerde (gece vardiyası/az personel) inhibit yerine destek gözcü tercih etmek",
      "Reset düğmelerinin vardiya zabitinin normal gözcülük mevkilerinden erişilebilir olduğunu kontrol etmek",
    ],
    integration: [
      "Bridge alert management (BAM) ve VDR ile alarm kayıtlarının bütünleşmesi",
      "BRM prosedürleri ile birlikte vardiya disiplininin güçlendirilmesi",
      "Otomatik modda, heading veya track control (otopilot) devreye girdiğinde BNWAS da kendiliğinden çalışır",
    ],
    requirements: [
      "SOLAS V/19: 150 GT ve üstü gemiler ile tüm yolcu gemilerinde BNWAS bulunur (2011–2014 aşamalı geçiş)",
      "SOLAS V/19: BNWAS, gemi denizde seyirdeyken her zaman çalışır durumda tutulur",
      "Performans standardı: IMO MSC.128(75)",
      "Çalışma modu ve süre ayarı yalnız kaptanın erişebildiği anahtar veya şifreyle değiştirilir"
    ],
    commonErrors: [
      "Reset düğmesine ağırlık koymak veya hareket sensörünü sürekli tetikleyecek düzenek kurmak",
      "Denizde BNWAS'ı kapalı modda bırakmak",
      "Uzak alarmları test etmeyip yalnız köprüüstü alarmını denemek"
    ]
  }
];

export const bridgeDeviceMap = bridgeDevices.reduce((acc, device) => {
  acc[device.id] = device;
  return acc;
}, {} as Record<BridgeDeviceId, BridgeDeviceInfo>);
