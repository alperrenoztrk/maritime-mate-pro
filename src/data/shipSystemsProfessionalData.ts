export type SystemFlowStage = {
  label: string;
  detail: string;
};

export type SystemReference = {
  code: string;
  scope: string;
};

export type ProfessionalSystemGuide = {
  purpose: string;
  boundary: string;
  responsibleRole: string;
  flow: [SystemFlowStage, SystemFlowStage, SystemFlowStage, SystemFlowStage, SystemFlowStage];
  prepare: string[];
  monitor: string[];
  verify: string[];
  stopAndEscalate: string[];
  records: string[];
  references: SystemReference[];
  photoCaption?: string;
  searchTerms: string[];
};

type TopicSeed = {
  purpose: string;
  boundary: string;
  flow: [string, string, string, string, string];
  monitor: [string, string];
  verify: [string, string];
  stop: [string, string];
  prepare?: string[];
  records?: string[];
  references?: SystemReference[];
  photoCaption?: string;
  searchTerms?: string[];
};

type CategoryProfile = {
  responsibleRole: string;
  prepare: string[];
  records: string[];
  references: SystemReference[];
};

const ref = (code: string, scope: string): SystemReference => ({ code, scope });

const categoryProfiles: Record<string, CategoryProfile> = {
  "deck-machinery": {
    responsibleRole: "Operasyonu yöneten güverte zabiti; başüstü/kıçüstü ekip lideri ve yetkili operatör",
    prepare: [
      "Gemiye özgü kullanım kitabını, risk değerlendirmesini, görev paylaşımını ve kesintisiz haberleşme yöntemini doğrula.",
      "Enerji kaynağı, lokal/acil durdurma, fren, koruyucu, limit ve sızıntı kontrollerini yüksüz yap; düşme, sıkışma ve halat/zincir geri tepme alanlarını boşalt.",
    ],
    records: ["Güverte jurnali veya operasyon kontrol listesi", "PMS/arıza kaydı", "Uygunsa kaldırma donanımı sicili, SWL ve sertifikalar"],
    references: [
      ref("SOLAS II-1/3-13", "1 Ocak 2026'dan itibaren kaldırma donanımı ve anchor handling winch emniyeti; uygulanabilirlik ekipmana göre belirlenir"),
      ref("MSC.1/Circ.1663", "Gemi kaldırma donanımları için işletme, muayene, test ve bakım kılavuzu"),
      ref("SMS + üretici kitabı", "Gemiye özel limit, komuta zinciri ve emniyetli durdurma yöntemi"),
    ],
  },
  "nav-systems": {
    responsibleRole: "Köprüüstü vardiya zabiti; kritik ayar ve sapmalarda Kaptan ile köprüüstü takım yönetimi",
    prepare: [
      "Cihazın güç, self-test/BITE, sensör kaynağı, tarih-saat, dimmer ve alarm durumunu vardiya tesliminde doğrula.",
      "Ayarları seyir safhası, draft/UKC politikası, görüş, trafik, harita kapsamı ve Kaptan gece emirlerine göre yap; önceki vardiyanın ayarlarını körlemesine devralma.",
    ],
    records: ["Köprüüstü seyir jurnali", "Passage plan ve bridge checklist", "Arıza/servis kaydı; olaya ilişkin veriyse VDR save işlemi"],
    references: [
      ref("SOLAS V/19 ve V/27", "Seyir cihazlarının gemi tipi/tonaj/yapım tarihine göre taşınması ve resmî harita/yayınların güncelliği"),
      ref("STCW A-VIII/2", "Emniyetli seyir vardiyası, gözcülük ve mevcut tüm araçların uygun kullanımı"),
      ref("SMS + maker manual", "Cihaz tipine özgü fonksiyon, alarm, test ve yedek düzen"),
    ],
  },
  "main-engine": {
    responsibleRole: "Başmühendis gözetimindeki vardiya mühendisi; köprüüstü ile teyitli makine kontrolü",
    prepare: [
      "Yağlama, soğutma, yakıt/hava, elektrik ve kontrol havası yardımcılarını; interlock, alarm ve trip durumlarını devreye almadan önce doğrula.",
      "Turning gear, çalışma izni/LOTO, personel ve takım durumu ile köprü-makine haberleşmesini kontrol et; uzaktan kumandaya ancak lokal hazırlık tamamlanınca izin ver.",
    ],
    records: ["Makine jurnali ve performans trendleri", "PMS/defect report", "Yakıt-yağ analizi ve klas/servis raporları"],
    references: [
      ref("SOLAS II-1", "Makine, elektrik, dümen ve acil durum düzenleri"),
      ref("ISM Code + PMS", "Emniyetli işletme, kritik ekipman, bakım ve uygunsuzluk yönetimi"),
      ref("Klas kuralları + maker manual", "Gemi ve makine tipine özgü limit, tolerans ve testler"),
    ],
  },
  auxiliary: {
    responsibleRole: "Vardiya mühendisi veya atanmış makine zabiti; elektrik işleri için ETO/yetkili personel",
    prepare: [
      "Hat dizilimini P&ID üzerinden doğrula; tank seviyesi, emiş/basma valfleri, havalık, drenaj, yağlama, soğutma ve elektrik beslemesini kontrol et.",
      "Stand-by ünitenin gerçekten hazır olduğunu, alarm/triplerin normal olduğunu ve bakım izolasyonlarının kaldırıldığını teyit et.",
    ],
    records: ["Makine jurnali", "PMS ve ölçüm trendleri", "Kimyasal/atık/servis kaydı (sisteme uygulanıyorsa)"],
    references: [
      ref("SOLAS II-1 ve II-2", "Temel makine, elektrik, kazan, basınçlı sistem ve yangın emniyeti hükümleri"),
      ref("MARPOL", "Atık veya deşarj üreten yardımcı sistemlerde ilgili ek ve onaylı düzen"),
      ref("Maker manual + P&ID + PMS", "Hat dizilimi, interlock, normal değer ve emniyetli bakım"),
    ],
  },
  "fire-safety": {
    responsibleRole: "Kaptan komutasındaki acil durum organizasyonu; sistem tipine göre başmühendis, zabit ve eğitimli yangın ekibi",
    prepare: [
      "Fire Control Plan, muster list, sabit sistem release prosedürü, mahal tahliyesi ve haberleşmeyi gemiye özgü olarak doğrula.",
      "Valf/izolasyon konumu, güç kaynağı, alarm, tüp/tank basıncı veya pompa hazır durumu ile erişim mühürlerini değiştirmeden görsel kontrol et.",
    ],
    records: ["Fire/LSA bakım kontrol listesi ve PMS", "Tatbikat/eğitim kaydı", "Yetkili servis, dolum, hidrostatik test veya muayene raporu"],
    references: [
      ref("SOLAS II-2", "Yangının önlenmesi, algılanması, sınırlandırılması ve söndürülmesi"),
      ref("FSS Code", "Sabit ve seyyar yangın sistemlerinin teknik düzeni"),
      ref("Fire Control Plan + SMS", "Gemiye özgü mahal, vana, uzaktan kapatma ve release sırası"),
    ],
  },
  "cargo-systems": {
    responsibleRole: "Kaptan gözetiminde birinci zabit/cargo officer; terminal ve makine kontrol odasıyla koordinasyon",
    prepare: [
      "Onaylı cargo/operations manual, loading plan, ship/shore checklist, iletişim ve acil durdurma yöntemini birlikte doğrula.",
      "Hat, tank/ambar, valf, vent, seviye-basınç alarmı, kapama düzeni ve uygun gaz ölçümlerini operasyondan önce teyit et.",
    ],
    records: ["Cargo log/Statement of Facts ve checklist", "Uygunsa Oil/Cargo Record Book", "CSM, test sertifikası, PMS ve defect report"],
    references: [
      ref("SOLAS VI/VII", "Yük bilgisi, istifleme, sabitleme ve tehlikeli yük hükümleri"),
      ref("MARPOL/IBC/IGC/IMSBC", "Gemi ve yük tipine uygulanabilen çevre ve yük kodları"),
      ref("Approved cargo manual + SMS", "Gemiye özgü hat, limit, ESD ve operasyon sırası"),
    ],
  },
  "environmental-auxiliary": {
    responsibleRole: "Başmühendis/atanmış mühendis; kayıt ve deşarj kararında Kaptan ile MARPOL/BWM sorumluluğu",
    prepare: [
      "Onaylı plan/operating manual, sertifika, kalibrasyon, numune noktası ve hat dizilimini gerçek boru devresi üzerinden doğrula.",
      "Bypass veya mühürlü vana durumunu, sensör/alarm self-testini ve tank kapasitesini kontrol et; yalnız type approval bulunmasına dayanarak operasyon başlatma.",
    ],
    records: ["İlgili resmî record book ve elektronik kayıt", "Kalibrasyon/numune/servis raporu", "PMS, tank sounding ve reception facility belgesi"],
    references: [
      ref("MARPOL Annex I, IV, V, VI", "Sistemin ürettiği deşarj, atık veya emisyona uygulanabilen hükümler"),
      ref("BWM Convention", "Balast yönetim planı, D-2 standardı ve kayıtlar"),
      ref("Onaylı manual + sertifika", "Type-approved sistemin gemiye özgü çalışma zarfı ve sınırlamaları"),
    ],
  },
  "gmdss-lsa": {
    responsibleRole: "Kaptan gözetimindeki GOC/ROC yetkili telsiz zabiti veya atanmış LSA zabiti; can kurtarmada muster list görevleri",
    prepare: [
      "Gemi sertifikası, sea area, ekipman kimliği/MMSI, yedek güç, self-test ve tarih-saat/pozisyon girdisini kontrol et.",
      "LSA için erişim, securing, release/HRU, haftalık-aylık kontroller ve yetkili servis tarihlerini maker talimatı ile doğrula; tehlikeli release testini doğaçlama yapma.",
    ],
    records: ["Radio log veya GMDSS test kaydı", "LSA haftalık/aylık kontrol ve drill kaydı", "Batarya/HRU/servis sertifikası ve PMS"],
    references: [
      ref("SOLAS III ve LSA Code", "Can kurtarma araçları, hazır bulundurma, bakım ve tatbikat"),
      ref("SOLAS IV", "Modernize GMDSS fonksiyonları, deniz alanı ve radyo donanımı"),
      ref("MSC.402(96), as amended", "Filika/rescue boat, launching appliance ve release gear bakım/test yetkileri"),
    ],
  },
};

const stageLabels = ["Source / input", "Conversion", "Control", "Output", "Safety / evidence"] as const;

const seed = (value: TopicSeed): TopicSeed => value;

const topicSeeds: Record<string, TopicSeed> = {
  "deck-machinery/0": seed({
    purpose: "Demir zincirini kontrollü funda/vira etmek ve demirleme yükünü zincir stopper ile gemi bünyesine aktarmak.",
    boundary: "Windlass statik demirleme yükünü tek başına taşımak için bırakılmaz; fren, kavrama ve chain stopper görevleri birbirinin yerine geçmez.",
    flow: ["Electric or hydraulic power", "Motor, gearbox and clutch", "Wildcat with band brake", "Cable, stopper and anchor", "Bridge-forecastle orders; current/pressure record"],
    monitor: ["Zincirin yönü, şakül/marka, hız, yük ve deniz dibinden çıkış açısını birlikte izle.", "Fren sıcaklığı, hidrolik basınç/kaçak, motor akımı ve anormal ses-titreşimi trend olarak değerlendir."],
    verify: ["Köprü ile her komutta kapalı çevrim repeat-back kullan; gözlenen zincir hareketini kumanda göstergesiyle karşılaştır.", "Demir yerine oturduğunda yükün stopper'a geçtiğini fiziksel olarak doğrula; yalnız fren kolu pozisyonuna güvenme."],
    stop: ["Kontrolsüz zincir kaçırma, fren tutmaması veya personelin zincir hattına girmesi halinde operasyona devam etme.", "Basınç/akım ani yükselmesi, zincirin hawse pipe'a yanlış oturması veya kayıp haberleşmede durdur ve Kaptanı çağır."],
    photoCaption: "Gerçek bir demir ırgadı örneği. Wildcat, kavrama, bant freni ve zincir stopper düzeni gemiye göre değişir; fotoğraf tek başına operasyon şeması değildir.",
    searchTerms: ["anchor windlass", "wildcat", "gypsy", "chain stopper", "band brake"],
  }),
  "deck-machinery/1": seed({
    purpose: "Yükü onaylı çalışma zarfı içinde hoist, luff ve slew hareketleriyle kontrollü kaldırmak ve konumlandırmak.",
    boundary: "SWL tek bir evrensel kapasite değildir; outreach, boom açısı, grab/spreader ağırlığı, dinamik yük, trim/list ve rüzgâr load chart'ı değiştirir.",
    flow: ["Electric/hydraulic power", "Motor-pump, winch and brake", "Hoist/luff/slew control", "Wire, block, hook and load", "Limit/overload, SWL marking and lifting register"],
    monitor: ["Load chart, outreach, kanca yüksekliği, halat sarımı, fren ve limit göstergelerini yük hareketiyle birlikte izle.", "Rüzgâr, gemi hareketi, side-pull, yük salınımı ve haberleşme kalitesini sürekli yeniden değerlendir."],
    verify: ["Yük ağırlığı ve loose gear toplamını belge/etiketle doğrula; bilinmeyen yükü tahminle kaldırma.", "Yüksüz fonksiyon-fren-limit testi ile fiziksel hareketin kumanda yönüne uyduğunu kontrol et."],
    stop: ["Overload/limit alarmı, fren kaydırması, tel hasarı, yük altında personel veya iletişim kaybında yükü emniyete al.", "Beklenmeyen list/trim, çatlak/deformasyon, hidrolik kaçak ya da anormal ses varsa yetkili inceleme olmadan sürdürme."],
    photoCaption: "Gemi güverte vinci örneği. Doğru kapasite fotoğraftan değil, o vincin load chart'ı, SWL işareti ve sertifikalı loose gear kayıtlarından belirlenir.",
    searchTerms: ["deck crane", "lifting appliance", "load chart", "SWL", "loose gear"],
  }),
  "deck-machinery/2": seed({
    purpose: "Bağlama halatını kontrollü alıp vermek, uygun fren yüküyle geminin rıhtım konumunu korumak.",
    boundary: "Auto-tension her rıhtım operasyonunda güvenli varsayılan değildir; gemi/terminal prosedürü ve hat düzeni uygun değilse ardışık halat boşaltma-yükleme yaratabilir.",
    flow: ["Electric/hydraulic power", "Motor, gearbox and drum", "Clutch, brake and tension control", "Rope-fairlead-bollard load path", "Mooring plan, brake test and watch rounds"],
    monitor: ["Halat lead'i, katmanlanma, aşınma, eşit yük paylaşımı ve snap-back yönünü fiziksel olarak izle.", "Fren tutma, render/tension göstergesi, gelgit-draft değişimi ve rüzgâr/akıntı etkisini birlikte değerlendir."],
    verify: ["Mooring planındaki hat fonksiyonunu ve doğru fairlead/bollard kullanımını güvertede doğrula.", "Fren test sonucu ile üretici/design MBL esaslı ayarı karşılaştır; yalnız el hissiyle sıkma yapma."],
    stop: ["Personel bight/snap-back alanındaysa, halat atlıyorsa veya haberleşme kayıpsa vincin hareketini durdur.", "Fren kayması, pedestal/fairlead deformasyonu ya da halatın ciddi hasarında yükü kontrollü başka hatta aktar ve raporla."],
    photoCaption: "Bir mooring winch kurulum örneği. Tambur, split-drum, warping head ve fren düzeni gemiye göre değişir; güvenli alan sabit boyalı bir şeritten ibaret değildir.",
    searchTerms: ["mooring winch", "brake holding load", "design MBL", "snap-back", "rendering"],
  }),
  "deck-machinery/3": seed({
    purpose: "Ambar ağzını yapısal olarak kapatmak, weathertight bütünlüğü ve yük/deniz etkilerine karşı korumayı sürdürmek.",
    boundary: "Cleat'leri aşırı sıkmak hasarlı conta, compression bar veya drenajı telafi etmez; hose/ultrasonic test sonucu yalnız doğru prosedürle anlamlıdır.",
    flow: ["Hydraulic power or external lifting", "Cylinder, chain/roller and rail", "Limit, cleat and panel alignment", "Conta-compression bar-drenaj", "Ultrasonic/hose test and maintenance record"],
    monitor: ["Panel hizası, teker/ray, hidrolik kaçak, cross-joint, conta sıkışması ve drenaj kanalını izle.", "Kapatmada cleat yükünü dengeli uygula; coaming, drain non-return ve access hatch bütünlüğünü birlikte kontrol et."],
    verify: ["Kapanma sonrası fiziksel kilit/cleat pozisyonunu ve drenaj açıklığını iki kişiyle dolaşarak doğrula.", "Yük/hava riskine göre yetkin kişiyle ultrasonic veya onaylı hose test yap; tebeşir izini watertight test sanma."],
    stop: ["Panel hareket alanında kişi/engel, hizasız panel veya safety interlock arızasında hareketi durdur.", "Çatlak, kalıcı deformasyon, conta hattında ciddi kaçak ya da locking arızasında denize çıkış kararını Kaptan/klas sürecine yükselt."],
    photoCaption: "Gerçek bir ambar kapağı örneği. Fotoğraf tipin genel görünümünü verir; sızdırmazlık zinciri conta, compression bar, cross-joint ve drenajın birlikte çalışmasına bağlıdır.",
    searchTerms: ["hatch cover", "weathertight", "compression bar", "ultrasonic test", "cleat"],
  }),
  "deck-machinery/4": seed({
    purpose: "Halatı dikey warping head üzerinde sürtünmeyle kontrollü çekmek veya yönlendirmek.",
    boundary: "Capstan halatı kilitleyen bir depolama tamburu değildir; tur sayısı arttıkça tutma kuvveti ve sıkışma/override riski birlikte büyür.",
    flow: ["Electric/hydraulic power", "Vertical motor-gearbox", "Warping head and foot control", "Rope, fairlead and hand-tended tail", "Emergency stop, exclusion zone and PMS"],
    monitor: ["Halatın düzgün turunu, kuyruk tarafındaki personel duruşunu ve override başlangıcını izle.", "Motor yükü, warping head yüzeyi, ayak kumandası dönüşü ve haberleşmeyi sürekli kontrol et."],
    verify: ["Halat lead'inin capstan eksenine uygun ve fairlead'in temiz olduğunu operasyondan önce doğrula.", "Kumandayı bıraktığında hareketin kesildiğini yüksüz test et; yalnız ana şalteri test sayma."],
    stop: ["Halat üst üste binmeye, kişinin eli/giysisi yaklaşmaya veya kuyruk kontrolü kaybolmaya başlarsa derhal durdur.", "Kumanda takılması, frenlememe, anormal sıcaklık veya çatlak pedestal halinde LOTO uygula ve raporla."],
    photoCaption: "Dikey capstan/warping head örneği. Halatın sarım yönü ve operatörün güvenli konumu geminin gerçek fairlead düzenine göre belirlenir.",
    searchTerms: ["capstan", "warping head", "capstan equation", "override", "tailing line"],
  }),

  "nav-systems/0": seed({
    purpose: "Sabit ve hareketli hedefleri tespit etmek; mesafe/kerteriz ölçmek; kıyı seyrini, mevki kontrolünü ve çatışma riski değerlendirmesini desteklemek.",
    boundary: "Radar her hedefi garanti ederek göstermez; clutter ayarı hedefi silebilir ve ARPA'nın CPA/TCPA değeri sensör, tracking süresi ve hedef manevrasına bağlı bir tahmindir.",
    flow: ["X/S-band transmitter and rotating antenna", "Echo receiver, tuning and clutter processing", "Gyro, log/GNSS and operator settings", "PPI, EBL/VRM, PI, trails and ARPA", "Visual look-out, second radar/chart and VDR"],
    monitor: ["Brilliance, range, orientation/motion, gain, tuning, sea/rain clutter ve pulse ayarını koşula göre kur; otomatik ayarın küçük hedefi bastırmadığını farklı menzillerde kontrol et.", "Relative/true vector, vector time, target history, acquisition durumu ve heading/speed sensörünü okumadan CPA/TCPA'ya karar değeri verme."],
    verify: ["Hedefi görsel kerteriz, ikinci radar, AIS kimliği ve mümkünse harita/PI ile çapraz doğrula; AIS sembolünü radar ekosu sanma.", "EBL/VRM ve paralel index'i sabit harita objesiyle kontrol et; heading marker/anten hizası ile range/bearing doğruluğu şüpheliyse performans testine geç."],
    stop: ["Heading veya speed input kaybı, yanlış motion/vector modu, radar/anten arızası ya da belirgin misalignment varsa ARPA sonucuna güvenme ve Kaptanı çağır.", "Kötü görüşte hedef algısı yetersizse safe speed'i yeniden değerlendir, gözcüyü güçlendir ve COLREG'e uygun erken/substantial hareket için takım kur."],
    records: ["Radar performance/PM ve compass bearing check kaydı", "Passage plan üzerindeki PI/clearing range bilgisi"],
    references: [
      ref("MSC.192(79)", "Gemi radarlarının revize performans standardı"),
      ref("COLREG 5, 6, 7, 8 ve 19", "Gözcülük, emniyetli hız, çatışma riski, kaçınma hareketi ve kısıtlı görüş"),
      ref("STCW A-II/1 ve A-VIII/2", "Radar/ARPA kullanımı ve emniyetli köprüüstü vardiyası"),
    ],
    photoCaption: "X-band bir radar PPI/ARPA konsolu örneği. Ekrandaki yeşil ekolar gerçek çevreyi gösterir; üretici arayüzü eski olabilir ancak range, gain, clutter, EBL/VRM, vector ve trail mantığı güncel radarda da geçerlidir.",
    searchTerms: ["radar", "ARPA", "CPA TCPA", "gain", "sea clutter", "rain clutter", "parallel index", "true relative vector"],
  }),
  "nav-systems/1": seed({
    purpose: "Resmî elektronik seyir verisi üzerinde passage plan hazırlamak, onaylı rotayı izlemek ve emniyet parametrelerine göre tehlikeleri zamanında görünür kılmak.",
    boundary: "ECDIS kendi başına emniyetli rota üretmez; yasal eşdeğerlik type approval, resmî ve güncel veri, doğru kullanım ve yeterli bağımsız backup düzeninin birlikte sağlanmasına bağlıdır.",
    flow: ["Official ENC/RNC, permits and updates", "ECDIS kernel, SENC and presentation library", "GNSS, gyro, log and manual/independent fix", "Safety settings, route check and monitoring", "Alarm management, backup ECDIS/charts, bridge team and VDR"],
    monitor: ["Appraisal'da tüm rota için resmî ENC kapsamı, kullanım bandı/ölçek, permit ve update status; planning'de safety depth/contour, XTD, look-ahead, no-go, wheel-over ve abort noktalarını kontrol et.", "Monitoring sırasında seçili position/heading/speed kaynağını, chart scale/overscale, off-track, safety contour ve special-condition uyarılarını izle; alarmı nedenini anlamadan acknowledge etme."],
    verify: ["Primary GNSS mevkiini radar/visual fix, ikinci bağımsız PNT kaynağı veya uygun diğer yöntemle çaprazla; radar overlay hizasını bağımsız mevki kanıtı sayma.", "Automatic route check sonrasında rotayı uygun en büyük ENC ölçeğinde bacak bacak görsel incele; isolated danger, CATZOC/quality, SCAMIN ve temporary/preliminary bilgiler için mariner action yap."],
    stop: ["Resmî kapsam/permit/update yokluğu, update rejection, datum/PNT şüphesi veya backup düzeninin kullanılamaması halinde planı onaylama; Kaptan ve şirket prosedürüne yükselt.", "Position jump/freeze, heading uyuşmazlığı, safety alarmı ya da plan dışı sapmada önce gemiyi emniyetli seyir durumuna getir; ekrandaki rota çizgisini takip etmeyi otomatik refleks haline getirme."],
    records: ["ENC update report, permit ve update rejection kaydı", "Master-approved passage plan/revision ve alarm/position cross-check kayıtları"],
    references: [
      ref("MSC.232(82)", "1 Ocak 2009-31 Aralık 2025 arasında kurulan ECDIS için revize performans standardı"),
      ref("MSC.530(106), as revised", "1 Ocak 2026-2028 kurulumlarında alternatif; 1 Ocak 2029'dan itibaren yeni/S-100 ECDIS standardı"),
      ref("MSC.1/Circ.1503/Rev.2", "ECDIS için iyi uygulama, data/maintenance/training rolleri"),
      ref("IHO S-52, S-57, S-63, S-66", "Gösterim, ENC veri/koruma ve denizci kullanım rehberi"),
    ],
    photoCaption: "Ortadaki ekran ECDIS, yanlardaki ekranlar radar konsollarıdır. Fotoğraf ECDIS'in entegre köprüüstü bağlamını gösterir; harita renkleri ve menüler üreticiye/standarda göre değişse de resmî veri, safety settings ve bağımsız mevki kontrolü değişmez.",
    searchTerms: ["ECDIS", "ENC", "SENC", "S-57", "S-100", "S-101", "safety contour", "safety depth", "XTD", "route check", "CATZOC"],
  }),
  "nav-systems/2": seed({
    purpose: "Kimlik, seyir durumu ve hareket verilerini VHF data link üzerinden gemi-gemi ve gemi-kıyı durum farkındalığına sunmak.",
    boundary: "AIS hedef tespit sensörü değildir; yanlış, gecikmiş, elle hatalı girilmiş veya hiç yayınlanmayan veri olabilir ve COLREG kararını tek başına taşımaz.",
    flow: ["GNSS, gyro/ROT and statik-voyage data", "AIS transponder and TDMA zamanlama", "VHF 1/2 transmit-receive", "MKD/ECDIS/radar hedef sunumu", "Visual/radar verification and AIS test/record"],
    monitor: ["MMSI/call sign/IMO, draft, destination, ETA ve navigational status alanlarını sefer bağlamında doğru tut; sensor status ve position age'i izle.", "CPA/TCPA ve association durumunu radar ekosu ile karşılaştır; aynı hedefin iki sembol veya yanlış birleşme yaratıp yaratmadığını kontrol et."],
    verify: ["AIS kimliğini radar echo/bearing-range ve görsel gözlemle eşleştir; ekranda adı görünen geminin fiziksel hedefle aynı olduğunu kanıtla.", "Own-ship yayınını uygun test/shore report veya ikinci alıcıyla prosedüre göre doğrula; gizlilik gerekçeli kapatma kararını Kaptan verir ve kaydeder."],
    stop: ["Yanlış own-ship identity/position, sürekli TX alarmı veya spoofing şüphesinde veriyi karar kaynağı olmaktan çıkar ve Kaptanı bilgilendir.", "Hedef manevrası AIS ile radar arasında uyuşmuyorsa radar plotting ve görsel bilgiye dön; VHF anlaşmasını COLREG sorumluluğunun yerine koyma."],
    photoCaption: "Bir Class A AIS MKD örneği. Bu fiziksel ekran yalnız minimum göstergedir; modern gemide AIS verisi çoğunlukla ECDIS/radar üzerinde sunulur ve yine de radar echo değildir.",
    searchTerms: ["AIS", "Class A", "TDMA", "static dynamic voyage data", "target association"],
  }),
  "nav-systems/3": seed({
    purpose: "Uydu zaman ve ranging ölçümlerinden position, COG/SOG ve zaman üretip köprüüstü sistemlerine PNT girdisi sağlamak.",
    boundary: "GNSS ekrandaki hassasiyet kadar doğru kabul edilemez; anten/multipath, geometri, augmentation, jamming/spoofing ve datum bütünlüğü sonucu etkiler.",
    flow: ["GNSS constellations and augmentation", "Antenna, receiver, RAIM/integrity", "Position-time-COG/SOG computation", "Distribution to ECDIS/AIS/radar/VDR", "Second source, radar/visual fix and PNT alarm"],
    monitor: ["Kullanılan constellation, datum, position age, HDOP/quality/RAIM ve alarm göstergelerini seyir safhasına göre izle.", "COG/SOG'nin düşük hızdaki oynaklığını heading/log verisinden ayır; tüm sistemlerde aynı GNSS kaynağının ortak hata yaratabileceğini unutma."],
    verify: ["Mevkiyi radar/visual/terrestrial fix ve mümkünse bağımsız anten/alıcıyla çaprazla; iki ekranda aynı koordinatı görmek bağımsız doğrulama değildir.", "Jamming/spoofing şüphesinde zaman, COG/SOG, AIS hedefleri, radar overlay ve charted object hizasını birlikte kontrol et."],
    stop: ["Ani position jump, imkânsız hız/rota, integrity alarmı veya birden çok GNSS'in aynı sapması halinde otomatik pilot/track control bağımlılığını kes ve Kaptanı çağır.", "Kıyı yaklaşmasında doğrulanamayan mevkiyle planlanmış XTD içinde görünmeye güvenme; emniyetli hız/alan ve manuel fix yöntemine dön."],
    photoCaption: "Köprüüstü GNSS alıcısı örneği. Ekrandaki koordinat doğruluğun kanıtı değildir; quality/integrity göstergeleri ve bağımsız mevki kontrolü birlikte okunmalıdır.",
    searchTerms: ["GNSS", "GPS", "RAIM", "HDOP", "jamming", "spoofing", "PNT"],
  }),
  "nav-systems/4": seed({
    purpose: "Gyro ile true heading, manyetik pusula ile magnetic heading sağlayarak seyir, steering ve sensör dağıtımını desteklemek.",
    boundary: "Gyro ve manyetik pusula farklı kuzey referansları ve hata modellerine sahiptir; repeater'ların aynı değeri göstermesi master compass doğruluğunu kanıtlamaz.",
    flow: ["Earth's rotation/inertia or magnetic field", "Gyro master or compass card", "Correction and distribution to repeaters", "Steering/radar/ECDIS/AIS heading", "Azimuth/transit/amplitude check and compass record"],
    monitor: ["Master-repeater farkı, gyro alarmı, latitude/speed input ve manyetik pusulada kabarcık/serbestlik/deviation etkisini izle.", "Her vardiya ve belirgin rota/enlem/hız değişiminde uygulanabilir yöntemle compass error trendini kontrol et; tek ölçümü mutlak kabul etme."],
    verify: ["Gyro error'ı celestial azimuth/amplitude veya güvenilir transit ile; manyetik error'ı variation ve deviation ayrımıyla hesapla.", "Steering, radar ve ECDIS heading değerlerini master/repeater ile karşılaştır; dağıtım arızasını pusula arızasından ayır."],
    stop: ["Heading jump, repeater uyumsuzluğu veya kontrol edilemeyen gyro error'da otomatik/track steering'i uygun şekilde bırak ve manyetik pusula ile yedek seyir kur.", "Manyetik pusula yakınına yeni ferromanyetik/elektrik ekipman geldiyse deviation kontrolü yapılmadan eski kartı kesin kabul etme."],
    photoCaption: "Fotoğraf bir gyro repeater/azimuth circle düzenini gösterir; manyetik pusula binnacle'ı ile karıştırılmamalıdır. Master gyro, repeaters ve magnetic compass ayrı hata kontrollerine sahiptir.",
    searchTerms: ["gyro compass", "magnetic compass", "gyro error", "deviation", "variation", "repeater"],
  }),
  "nav-systems/5": seed({
    purpose: "Transducer altındaki su sütununda ses darbesinin gidiş-dönüş süresinden keel/transducer referanslı derinlik üretmek.",
    boundary: "Echo sounder charted depth veya tam UKC değildir; draft, transducer offset, tide, squat/heel ve ses hızı etkileri ayrıca ele alınır.",
    flow: ["Transducer and akustik pulse", "Water column and bottom echo", "Receiver, gain/range and bottom tracking", "Depth display, shallow alarm and VDR", "UKC check by chart/tide/lead line or a second method"],
    monitor: ["Range, gain, frequency, keel/transducer offset, shallow alarm ve bottom lock durumunu gerçek su derinliğine göre izle.", "Aeration, heavy weather, soft mud, steep bottom ve ikinci echo gibi yanlış izleri tanı; otomatik range'in dip kaybetmesini fark et."],
    verify: ["Gösterim referansını gemi draftı/offset belgesiyle doğrula; 'below keel', 'below transducer' ve 'below surface' değerlerini karıştırma.", "Charted depth+tide ile ölçümü trend olarak karşılaştır; farkta survey quality, squat, heel ve sound velocity ihtimallerini değerlendir."],
    stop: ["Sığ su alarmı, bottom loss veya beklenmeyen hızlı derinlik azalmasında Kaptanı çağır, hızı/rotayı ve UKC planını yeniden değerlendir.", "Offset bilinmiyorsa ekrandaki sayıyı UKC diye raporlama; güvenilir yedek ölçüm/alan olmadan yaklaşmayı sürdürme."],
    photoCaption: "Tarihî kâğıt kayıtlı bir echo sounder örneğidir; modern köprülerde renkli dijital display kullanılır. Eğitimde esas olan transducer referansı, gain/range, bottom echo ve UKC ayrımıdır.",
    searchTerms: ["echo sounder", "depth below keel", "transducer offset", "UKC", "bottom lock"],
  }),

  "main-engine/0": seed({
    purpose: "Düşük devirde iki zamanlı çevrimle doğrudan şaft/pervaneye yüksek tork sağlayan ana tahriki üretmek.",
    boundary: "Tek bir exhaust temperature veya scavenge pressure normal değeri evrensel değildir; silindirler arası trend maker limitleriyle okunur.",
    flow: ["Fuel, scavenge air and cylinder oil", "Cylinder-piston-crosshead combustion", "Crankshaft, thrust bearing and shaft", "FPP propeller thrust", "Alarm/trip, indicator diagram and engine log"],
    monitor: ["Silindir egzoz sıcaklığı farkı, scavenge pressure/temp, Pmax/IMEP, bearing/LO değerleri ve turbocharger davranışını birlikte trendle.", "Slow steaming, manevra ve yük artışında thermal load, air excess, liner lubrication ve torsional barred range sınırlamalarını uygula."],
    verify: ["Otomasyon değerini lokal gösterge/independent thermometer-pressure gauge ve silindirler arası karşılaştırmayla doğrula.", "Köprü telegraph komutu, governor/fuel index ve gerçek rpm/pitch tepkisini kapalı çevrim teyit et."],
    stop: ["Crankcase oil mist, scavenge fire işareti, severe bearing temperature/LO loss veya overspeed'de maker emergency response'u uygula.", "Anormal vuruntu, hızlı egzoz sapması veya metal partikülünde yükü emniyetli azalt; restart/inspection kararını Başmühendis verir."],
    photoCaption: "Düşük devirli iki zamanlı ana makinenin üst platform/silindir kapakları örneği. İç çevrim ve yağ-hava-yakıt akışı sistem şemasından okunmalıdır.",
    searchTerms: ["two stroke", "crosshead", "scavenge", "Pmax", "cylinder lubrication"],
  }),
  "main-engine/1": seed({
    purpose: "Dört zamanlı orta devir çevrimiyle jeneratör veya redüksiyon dişlisi üzerinden propulsion gücü üretmek.",
    boundary: "Ana tahrik ve genset uygulamasında governor/load sharing/gear sınırları farklıdır; otomatik load acceptance mekanik hazırlığın yerine geçmez.",
    flow: ["Fuel, charge air, LO and cooling water", "Piston-connecting rod-crankshaft four-stroke cycle", "Governor and turbocharger", "Alternator or reduction gear/CPP", "Protection, trend and PMS"],
    monitor: ["Egzoz sıcaklık balansı, charge air, LO/CW, crankcase, turbo speed ve generator/gear yükünü birlikte izle.", "Start-stop sayısı, düşük yükte kurum/wet stacking ve ani load step etkisini maker limitlerine göre yönet."],
    verify: ["Lokal basınç/sıcaklığı otomasyonla karşılaştır; cylinder cut-out veya load balance sonucunu egzoz trendiyle kanıtla.", "Clutch/gear veya breaker bağlantısından önce rpm, phase/load-sharing ve permissive durumunu doğrula."],
    stop: ["LO loss, overspeed, crankcase mist, cooling failure veya ciddi knock'ta korumayı bypass etmeden emniyetli shutdown uygula.", "Start air/fuel leak, misfire veya yük paylaşım kararsızlığında stand-by makineye geçişi planla ve Başmühendise bildir."],
    photoCaption: "Orta devirli dört zamanlı motor örneği. Jeneratör veya propulsion bağlantısı ve valf/turbo düzeni modele göre değişir.",
    searchTerms: ["four stroke", "medium speed", "load sharing", "wet stacking", "reduction gear"],
  }),
  "main-engine/2": seed({
    purpose: "Motor torkunu thrust bearing, ara/tail shaft ve stern tube üzerinden pervaneye hizalı ve düşük kayıpla aktarmak.",
    boundary: "Bearing sıcaklığının normal olması alignment, wear-down ve stern tube seal bütünlüğünü tek başına kanıtlamaz.",
    flow: ["Crankshaft/gear output torque", "Thrust, intermediate and tail shaft", "Bearings, coupling and stern tube", "Propeller torque/thrust", "Vibration, temperature, oil level and wear-down records"],
    monitor: ["Bearing temperature, vibration, stern tube oil level/pressure, seal leakage ve coupling/shaft davranışını rpm-yük ile trendle.", "Hull deflection, draft/trim ve sıcaklık değişiminin alignment ölçülerine etkisini bakım bağlamında değerlendir."],
    verify: ["Sensör trendini lokal inspection, oil sample, wear-down/poker gauge ve klas/maker toleranslarıyla çaprazla.", "Vibration artışını motor combustion, propeller fouling/damage ve shaft alignment kaynaklarına ayırmadan parça değiştirme."],
    stop: ["Hızlı bearing temp artışı, metalik ses, büyük oil loss/seal leak veya şiddetli vibration'da rpm'i emniyetli azalt ve Başmühendise bildir.", "Shaft earth/grounding veya turning gear interlock arızasında maker/klas değerlendirmesi olmadan normal operasyona dönme."],
    photoCaption: "Makine dairesindeki şaft hattı ve yatak örneği. Fotoğraf dış görünümü verir; thrust aktarımı, stern tube ve alignment ölçüleri şemayla anlaşılır.",
    searchTerms: ["shaft line", "thrust bearing", "stern tube", "alignment", "wear down"],
  }),
  "main-engine/3": seed({
    purpose: "Şaft torkunu suya momentum vererek gemi itmesine dönüştürmek; FPP/CPP düzeninde sevk ve manevrayı sağlamak.",
    boundary: "Pitch, rpm ve güç tek başına itme/verim değildir; wake, slip, cavitation, fouling, draft ve deniz durumu sonucu değiştirir.",
    flow: ["Shaft torque/rpm or CPP hydraulic power", "Hub and blade pitch", "Change of momentum in the wake", "Thrust and ship's speed", "Shaft power, vibration, pitch feedback and underwater inspection"],
    monitor: ["Shaft rpm/power, CPP pitch feedback, vibration, speed-slip ve stern tube/gear yükünü birlikte izle.", "Cavitation/ventilation işaretleri, ağır hava racing ve barred range'i operasyon koşuluna göre değerlendir."],
    verify: ["Pitch command-feedback'i ve shaft power'ı sea trial/baseline trendiyle karşılaştır; yalnız speed loss'a bakarak pervane arızası deme.", "Underwater damage/fouling şüphesini vibration spectrum, fuel-power-speed trendi ve uygun inspection ile doğrula."],
    stop: ["Pitch runaway/feedback mismatch, severe vibration veya shaft torque limitinde bridge-engine coordination ile yükü azalt.", "Blade/hub oil leak ya da grounding sonrası klas/maker incelemesi olmadan yüksek güç kullanma."],
    photoCaption: "Pervane ve dümen kurulum örneği. Blade geometrisi, pitch ve tip clearance fotoğraftan ölçülmez; onaylı çizim ve survey verisi kullanılır.",
    searchTerms: ["propeller", "FPP", "CPP", "cavitation", "slip", "shaft power"],
  }),
  "main-engine/4": seed({
    purpose: "Köprü komutunu hidrolik güçle dümen açısına dönüştürmek ve tek arızada mümkün olan yedeklilikle gemi yön kontrolünü sürdürmek.",
    boundary: "Rudder angle indicator komutu değil gerçek geri bildirimi göstermelidir; autopilot performansı dümen makinesi emniyet testinin yerine geçmez.",
    flow: ["Helm/autopilot order and gyro", "Control/telemotor and hydraulic pumps", "Ram/rotary vane, tiller and stock", "Rudder angle and yaw response", "Alarm, emergency steering comms and test record"],
    monitor: ["Command-actual rudder farkı, pump pressure/temperature, oil level/leak, hunting ve response time'ı izlemeye al.", "Heavy weather veya düşük hızda dümen etkisini propulsion/wake ile birlikte değerlendir; limit stop'a sürekli yük bindirme."],
    verify: ["Pre-departure steering testinde full movement, timing, pumps, remote/local/emergency control, indicators, alarms ve bridge-steering gear comms'i fiziksel doğrula.", "Gyro/autopilot hatasını lokal follow-up/non-follow-up kontrol ve gerçek rudder feedback ile ayır."],
    stop: ["Rudder response kaybı, hydraulic burst/leak, conflicting indicators veya uncontrollable hunting'de emergency steering procedure ve Master call uygula.", "Bir güç ünitesi arızasında kalan kapasiteyi ve SOLAS/maker sınırını doğrulamadan normal manevraya devam etme."],
    photoCaption: "Pervane arkasındaki dümen dış görünümü. Dümen makinesi, ram/rotary-vane ve yedek kontrol düzeni gemi içinde bulunur ve ayrı şemayla incelenir.",
    searchTerms: ["steering gear", "rudder", "telemotor", "follow-up", "NFU", "emergency steering"],
  }),

  "auxiliary/0": seed({
    purpose: "Dizel prime mover ve alternatörle gemi elektrik yükünü kararlı gerilim/frekans altında üretmek ve paylaşmak.",
    boundary: "Breaker'ın kapanması güvenli paraleli tek başına kanıtlamaz; phase sequence, voltage, frequency, synchronism, reverse power ve load sharing birlikte çalışır.",
    flow: ["Fuel-air-LO/CW and starting air", "Dizel motor + governor", "Alternator + AVR", "MSB, breaker and load sharing", "Protection, kW/kVAr trend and blackout record"],
    monitor: ["kW/kVAr, current balance, voltage/frequency, PF, winding/bearing temp ve engine exhaust/LO/CW değerlerini birlikte izle.", "Load step, spinning reserve, preferential trip ve stand-by auto-start hazırlığını gemi operasyonuna göre yönet."],
    verify: ["Senkron koşullarını synchroscope/lamp ve protection permissive ile doğrula; yanlış faz sırasını paralelleme ile deneme.", "Load sharing'i her jeneratörün kW/kVAr tepkisi ve governor/AVR moduyla çaprazla."],
    stop: ["Reverse power, differential/earth fault, unstable frequency/voltage veya ciddi engine alarmında protection'ı bypass etme.", "Blackout riskinde kritik yükleri koru, stand-by/emergency source prosedürünü uygula ve Başmühendisi çağır."],
    photoCaption: "Gemi dizel jeneratör seti örneği. Prime mover, alternatör ve MSB koruma zinciri ayrı bileşenlerdir.",
    searchTerms: ["diesel generator", "synchronizing", "AVR", "load sharing", "reverse power"],
  }),
  "auxiliary/1": seed({
    purpose: "Yakıt yanması veya waste heat ile güvenli basınçta buhar üretmek ve besi suyu-kondens çevrimini sürdürmek.",
    boundary: "Su seviye göstergesi tek noktadan doğrulanmadan güvenilir kabul edilmez; low-low water ve flame failure interlock'ları işletme kolaylığı için bypass edilmez.",
    flow: ["Feedwater, fuel/air or exhaust heat", "Furnace/economizer and evaporation", "Steam drum, separator and safety valve", "Steam consumers and condensate return", "Level/flame/pressure trips, water test and boiler log"],
    monitor: ["İki bağımsız level göstergesi, steam pressure, flame, FD fan/draft, feed flow ve water chemistry'yi trendle.", "Light-up/purge, burner sequence ve sudden load change sırasında swell/shrink etkisini gerçek su seviyesiyle ayır."],
    verify: ["Gauge glass blow-through ve independent level alarm testini maker/SMS sırasıyla yap; transmitter değerini tek başına kabul etme.", "Safety valve, flame scanner ve low-water trip testlerini yetkili prosedür ve kayıtla doğrula."],
    stop: ["Low-low water, flame failure sonrası yakıt birikimi, furnace blowback veya tube leak şüphesinde derhal emniyetli shutdown/purge uygula.", "Susuz kazana doğrudan feed verme; soğutma ve inceleme kararını Başmühendis/maker prosedürü belirler."],
    photoCaption: "Gemi yardımcı kazanı örneği. Burner, furnace, drum ve safety cihazları dış fotoğrafta bütünüyle görünmez.",
    searchTerms: ["marine boiler", "low water", "flame failure", "purge", "swell shrink"],
  }),
  "auxiliary/2": seed({
    purpose: "Yoğunluk farkı ve yüksek devirli santrifüj alanıyla yakıt/yağdan su ve katıları ayırmak.",
    boundary: "Purifier kapasitesi nominal debi değildir; viscosity/temperature, density, interface ayarı ve gerçek contamination separation sonucunu değiştirir.",
    flow: ["Conditioned oil from the settling/service tank", "Heater, feed pump and regulating valve", "High-speed bowl/disc stack", "Clean oil, separated water and sludge", "RPM/vibration/temp alarm, sludge log and sampling"],
    monitor: ["Feed temperature/viscosity, pressure, bowl speed, vibration, back pressure ve discharge cycle'ı izlemeye al.", "Water seal/interface veya ALCAP water sensor davranışını yağ tipine göre maker ayarıyla yönet."],
    verify: ["Clean oil sample ve drain/sludge gözlemini inlet condition ile karşılaştır; yalnız alarm olmamasını separation kanıtı sayma.", "Bowl assembly, gravity disc/parring disc ve sealing ring'in doğru tip/yerleşimini overhaul çizimiyle doğrula."],
    stop: ["High vibration, abnormal bowl noise, oil overflow veya speed loss'ta feed'i kesip maker shutdown sırasını uygula.", "Sıcak yağ kaçağında ignition kaynaklarını izole et; bowl tamamen durmadan açma."],
    photoCaption: "Fuel-oil separator/purifier örneği. Bowl ve disc stack iç yapısı fotoğrafta görünmez; doğru akış şeması önemlidir.",
    searchTerms: ["purifier", "separator", "disc stack", "gravity disc", "ALCAP"],
  }),
  "auxiliary/3": seed({
    purpose: "Start, control ve working air kullanıcıları için kademeli sıkıştırma ile kuru/temiz basınçlı hava üretmek.",
    boundary: "Receiver basıncı tek başına hava kalitesini veya compressor emniyetini kanıtlamaz; discharge temperature, drains, relief ve oil carry-over izlenir.",
    flow: ["Atmospheric air and suction filter", "LP/HP stages + intercooler", "Moisture separator and non-return", "Air receiver and distribution", "High-temp/pressure trips, drains and receiver survey"],
    monitor: ["Stage pressure/temperature, cooling water, LO, unloader ve automatic drain davranışını izlemeye al.", "Start frequency ve receiver pressure decay'i leakage/air demand ile trendle."],
    verify: ["Interstage gauge ve relief/non-return durumunu lokal kontrolle otomasyonla karşılaştır.", "Receiver drain condensate/oil miktarı ile discharge air kalitesini ve compressor condition'ı çaprazla."],
    stop: ["High discharge temp, relief lifting, knocking, cooling loss veya oil carry-over'da compressor'u durdur.", "Receiver/line üzerinde çalışmadan pressure isolation, drain ve LOTO yap; yalnız stop butonuna güvenme."],
    photoCaption: "Pistonlu starting-air compressor örneği. Intercooler, separator, non-return ve receiver zinciri sistemin ayrılmaz parçasıdır.",
    searchTerms: ["air compressor", "starting air", "intercooler", "air receiver", "unloader"],
  }),
  "auxiliary/4": seed({
    purpose: "Sıvıyı basınç/debi gereksinimine göre tanklar ve sistemler arasında taşımak.",
    boundary: "Pompa tipi ve duty point eşleşmeden 'valfi aç-çalıştır' yaklaşımı güvenli değildir; centrifugal ve positive-displacement pompaların shut-off davranışı farklıdır.",
    flow: ["Tank/sea suction and net positive head", "Impeller or displacement element", "Casing, seal and bearing", "Discharge line/control valve", "Pressure-flow-current, relief and leak record"],
    monitor: ["Suction/discharge pressure, flow, motor current, vibration, seal leak ve bearing temperature'ı duty point ile birlikte izle.", "Cavitation, loss of prime, dead-heading ve minimum-flow ihtiyacını pompa tipine göre ayır."],
    verify: ["Valve lineup ve tank level'i P&ID/fiziksel turla doğrula; yalnız mimic ekranına güvenme.", "Basınç farkını gerçek akış/level change ile çaprazla; dönme yönünü bakım sonrası yüksüz doğrula."],
    stop: ["Dry running, cavitation, seal failure, rapid pressure/current rise veya PD relief arızasında durdur.", "Kimyasal/sıcak/yanıcı akışkan kaçağında alanı izole et ve uygun PPE/permit prosedürüne geç."],
    photoCaption: "Makine dairesindeki santrifüj pompa örneği. Her pompa uygulaması aynı değildir; P&ID, pump curve ve minimum-flow düzeni okunmalıdır.",
    searchTerms: ["centrifugal pump", "positive displacement", "cavitation", "NPSH", "dead head"],
  }),
  "auxiliary/5": seed({
    purpose: "Vakum altında düşük sıcaklıkta evaporasyon veya reverse osmosis ile deniz suyundan teknik/içme suyu üretmek.",
    boundary: "Üretilen düşük-salinity distillate otomatik olarak içilebilir değildir; mineralizasyon/dezenfeksiyon ve potable-water standardı ayrı zincirdir.",
    flow: ["Seawater + waste heat or RO pressure", "Evaporator/condenser or membranes", "Demister/salinity cell", "Distillate tank and treatment", "Salinity dump, production log and water test"],
    monitor: ["Vacuum, temperatures, ejector/seawater flow, production rate ve salinity'yi feed condition ile trendle.", "RO'da differential pressure/conductivity; evaporator'da scale/foaming ve demister carry-over işaretlerini izle."],
    verify: ["Salinometer'ı doğrulanmış sample/conductivity ile çaprazla; high-salinity automatic dump testini maker prosedürüyle yap.", "Potable transfer öncesi dezenfeksiyon ve laboratuvar/ship test gereğini gemi planına göre doğrula."],
    stop: ["High salinity, vacuum loss, membrane pressure limit veya chemical dosing arızasında ürünü potable tanka verme.", "Contamination şüphesinde tankı izole et, numune al ve Başmühendis/Kaptan kararını bekle."],
    photoCaption: "Evaporator tip fresh-water generator örneği. RO ünitesi farklı görünür; her iki sistemde ürün kalite kontrolü zorunludur.",
    searchTerms: ["fresh water generator", "evaporator", "reverse osmosis", "salinometer", "potable water"],
  }),
  "auxiliary/6": seed({
    purpose: "Onaylı atık türlerini kontrollü sıcaklık ve residence time altında yakarak hacmi azaltmak.",
    boundary: "Her gemi atığı yakılamaz; MARPOL, yerel/liman yasakları, type approval ve maker feed limitleri birlikte uygulanır.",
    flow: ["Segregated sludge/garbage feed", "Primary-secondary chamber and burner", "Air control and temperature interlock", "Flue gas and ash", "Incinerator/sludge record, alarm and inspection"],
    monitor: ["Chamber temperatures, draft/O2, burner flame, feed rate ve flue condition'ı type-approved cycle ile izle.", "PVC/halogenated material, pressurized container, unknown chemical ve prohibited waste ayrımını feed öncesi yap."],
    verify: ["Atık kaynağı/miktarı ile incinerator/sludge tank mass balance ve ash miktarını çaprazla.", "Temperature sensor/interlock ve door seal'i PMS testiyle doğrula; yalnız display değerine güvenme."],
    stop: ["Flame failure, low temperature, positive pressure/smoke leak veya refractory damage'da feed'i kes ve purge/cool-down uygula.", "Yasak atık veya emisyon şüphesinde yakmayı durdur ve MARPOL/port procedure'e geç."],
    searchTerms: ["incinerator", "sludge", "MARPOL Annex VI", "prohibited waste", "refractory"],
  }),
  "auxiliary/7": seed({
    purpose: "Makine dairesi oily bilge water'ı onaylı 15 ppm filtering equipment ve alarm/automatic stopping arrangement ile işlemek.",
    boundary: "15 ppm göstergesi deşarj izni değildir; Annex I şartları, özel alan/yerel kısıt, en route koşulu, approved equipment ve doğru kayıt birlikte sağlanır.",
    flow: ["Bilge holding tank and homogenized feed", "Coalescer/filter stages", "15 ppm bilge alarm sample cell", "Overboard or automatic recirculation/stop", "ORB, valve/seal status and calibration record"],
    monitor: ["Feed condition, pressure drop, temperature/emulsion, ppm trend, sample flow ve automatic stopping response'u izle.", "Detergent/chemical emulsion ve clean-water flushing'in gerçek sample'ı yanıltmamasını sağla; bypass oluşturma."],
    verify: ["Gerçek valve lineup ve overboard/recirculation dönüşünü fiziksel turla mimic ekranla karşılaştır.", "15 ppm alarm/automatic stop testini onaylı yöntemle ve kalibrasyon geçerliliğiyle doğrula; test sonucu ORB girdisiyle tutarlı olsun."],
    stop: ["ppm yükselişi, sample loss, alarm/auto-stop arızası, mühür/bypass şüphesi veya yasal konum koşulu yoksa overboard'u kapat.", "Arızayı seyreltme veya manuel valfle aşma; holding capacity/reception facility planını Kaptan-Başmühendisle kur."],
    searchTerms: ["OWS", "15 ppm bilge alarm", "automatic stopping device", "Oil Record Book", "bilge"],
  }),
  "auxiliary/8": seed({
    purpose: "Siyah/gri suyu onaylı biyolojik/fiziksel-kimyasal süreçle işlemek veya uygun holding düzeninde tutmak.",
    boundary: "Plant running göstergesi effluent standardını kanıtlamaz; hydraulic/organic load, disinfectant, sludge ve Annex IV/yerel deşarj şartları izlenir.",
    flow: ["Black/grey water collection", "Aeration/bioreactor and settling", "Disinfection/filtration", "Effluent or holding/discharge", "Sample, sewage record/PMS and certificate"],
    monitor: ["Blower/aeration, level, return sludge, disinfectant, odour/foam ve effluent clarity'yi günlük trendle.", "Toxic cleaner/chemical shock, overload ve long idle döneminin biomass'a etkisini yönet."],
    verify: ["Effluent sample/test ve disinfectant residual'ı equipment limitleriyle çaprazla.", "Discharge/holding valve lineup'ını konum ve yerel kural öncesi fiziksel doğrula."],
    stop: ["Blower loss, overflow, failed disinfection veya non-compliant effluent'ta overboard'u kapat ve holding/reception planına geç.", "Kapalı tank/plant müdahalesinde enclosed-space ve biological hazard permit olmadan giriş yapma."],
    searchTerms: ["sewage treatment plant", "MARPOL Annex IV", "aeration", "effluent", "holding tank"],
  }),
  "auxiliary/9": seed({
    purpose: "İki akışkanı karıştırmadan plate/shell-and-tube yüzeyi üzerinden ısı aktarmak.",
    boundary: "Outlet sıcaklığını tutturmak exchanger'ın temiz veya sağlam olduğunu tek başına göstermez; bypass, flow ve cross-contamination izlenir.",
    flow: ["Hot fluid and cold fluid", "Plate/tube heat-transfer surface", "Control/bypass valve", "Conditioned outlet streams", "ΔT/ΔP trend, leak test and cleaning record"],
    monitor: ["Her iki taraf inlet/outlet temperature, pressure drop, flow ve control-valve position'ı birlikte trendle.", "Fouling, air lock, gasket/tube leak ve thermal expansion işaretlerini yük değişimiyle değerlendir."],
    verify: ["Heat balance ve sample/level değişimiyle cross-leak'i kontrol et; tek taraftaki basınca bakma.", "Temizlik sonrası pressure test/plate tightening veya tube plug kaydını maker toleransıyla doğrula."],
    stop: ["Rapid cross-contamination, major leak, high pressure drop veya cooling loss'ta yükü azaltıp exchanger'ı izole et.", "Sıcak/basınçlı ekipmanı drain-vent-cool ve LOTO yapmadan açma."],
    searchTerms: ["heat exchanger", "plate cooler", "shell and tube", "fouling", "cross contamination"],
  }),
  "auxiliary/10": seed({
    purpose: "Vapour-compression cycle ile provision rooms'tan ısı çekerek ürün sıcaklığını güvenli aralıkta tutmak.",
    boundary: "Suction/discharge pressure tek başına charge teşhisi değildir; superheat, subcooling, room/product temperature, airflow ve defrost birlikte değerlendirilir.",
    flow: ["Evaporator and room heat load", "Compressor", "Condenser + receiver", "Expansion valve and evaporator", "Pressure/temp trips, refrigerant log and food record"],
    monitor: ["Room/product temperature, suction/discharge, superheat, condenser cooling, oil level ve defrost cycle'ı trendle.", "Ice pattern, fan/door seal, drain ve refrigerant leak detector durumunu fiziksel turla izle."],
    verify: ["Gauge readings'i calibrated thermometer ve compressor current ile çaprazla; refrigerant eklemeden önce leak/airflow/defrost nedenlerini dışla.", "Stand-by compressor/room alarmı ve emergency response'u yük riski oluşmadan test et."],
    stop: ["High discharge pressure/temp, low oil, severe leak veya compressor liquid slugging işaretinde ünitenin korumasını bypass etme.", "Refrigerant kaçağında havalandır, alanı izole et ve gazın safety data/permit prosedürünü uygula."],
    searchTerms: ["refrigeration", "superheat", "subcooling", "defrost", "refrigerant leak"],
  }),
  "auxiliary/11": seed({
    purpose: "Ana güç kaybında emniyet, seyir, haberleşme ve tahliye tüketicilerini bağımsız bir kaynaktan beslemek.",
    boundary: "Acil jeneratörün çalışması acil güç düzeninin sağlam olduğunu kanıtlamaz; otomatik start süresi, doğru tüketici listesi, interconnector ayrılması ve besleme süresi birlikte doğrulanır.",
    flow: ["Bağımsız fuel tank, battery/air start", "Emergency diesel + governor", "AVR, auto-start and transfer logic", "Emergency switchboard and essential consumers", "Transitional battery, test record and survey"],
    monitor: ["Yakıt seviyesi, akü gerilimi/şarj, blok ısıtıcı, mahal havalandırması ve mod (auto/manual) konumunu izle.", "Test sırasında gerilim/frekans oturma süresini, yük altındaki davranışı ve wet stacking işaretlerini değerlendir."],
    verify: ["Otomatik start dizisini ve interconnector ayrılmasını gerçek besleme kaybı senaryosuyla, SMS'in izin verdiği ölçüde doğrula; yalnız manuel start testini yeterli sayma.", "Beslenen tüketicilerin onaylı elektrik şemasındaki acil tüketici listesiyle eşleştiğini kontrol et."],
    stop: ["Otomatik start, yük alma veya transfer arızasında düzeni çalışır kabul etme; kritik defect olarak Başmühendis/Kaptan'a yükselt.", "Testten sonra set otomatik modda değilse gemi acil güçsüz sayılır; derhal düzelt ve kayda geç."],
    photoCaption: "Acil jeneratör mahalli örneği. Bağımsız yakıt, marş ve acil switchboard düzeni fotoğrafta bütünüyle görünmez.",
    searchTerms: ["emergency generator", "emergency switchboard", "transitional source", "auto start", "blackout"],
  }),
  "auxiliary/12": seed({
    purpose: "Ana makine milinden alınan güçle elektrik üretmek (PTO) veya şafta güç vererek takviye/acil tahrik sağlamak (PTI/PTH).",
    boundary: "Şaft jeneratörü ana makineye bağımlıdır; ana makine trip'i doğrudan elektrik kaybı anlamına gelebileceğinden tek kaynak gibi yönetilmez.",
    flow: ["Main engine shaft power", "Shaft generator/motor", "CPP constant speed or frequency converter", "Main switchboard and PMS load sharing", "Protection, changeover plan and blackout record"],
    monitor: ["kW/kVAr, frekans/gerilim kararlılığı, konvertör sıcaklığı, harmonik ve şaft devri/hatve geri beslemesini birlikte izle.", "Seyir safhasına göre stand-by dizel jeneratör hazırlığını ve PMS geçiş mantığını yönet."],
    verify: ["Senkron koşullarını ve yük transferini gerçek kW tepkisiyle çaprazla; manevra öncesi yardımcı jeneratöre geçişi fiilen dene.", "Konvertörlü düzende sabit frekansın gerçekten korunduğunu bağımsız ölçümle doğrula."],
    stop: ["Frekans/gerilim kararsızlığı, konvertör aşırı sıcaklık veya koruma devreye girdiğinde şaft jeneratörünü baradan çıkarıp yardımcı jeneratöre geç.", "Manevra ve dar su geçişlerinde tek kaynak olarak şaft jeneratörüne güvenme; stand-by kapasitesini önceden devreye al."],
    searchTerms: ["shaft generator", "PTO", "PTI", "take me home", "frequency converter"],
  }),
  "auxiliary/13": seed({
    purpose: "Düşük hızda ve manevrada geminin başını/kıçını yanal olarak hareket ettirecek kontrollü itme kuvveti üretmek.",
    boundary: "İtici kuvveti gemi hızı arttıkça hızla düşer ve elektrik yükü blackout riski yaratabilir; kumanda kolunun konumu üretilen gerçek kuvveti kanıtlamaz.",
    flow: ["Electrical or hydraulic drive power", "Thruster motor and gearbox", "Pitch (CPP) or converter speed control", "Tunnel propeller thrust", "Oil level/pressure alarm, vibration and class survey"],
    monitor: ["Motor akımı/sargı sıcaklığı, hatve geri beslemesi, titreşim, dişli kutusu yağ seviyesi ve bara frekansını birlikte izle.", "Sürekli tam güç kullanım süresini ve tekrar başlatma aralığını üretici limitine göre yönet."],
    verify: ["Kumanda talebi, hatve göstergesi ve geminin gerçek tepkisini manevra sırasında karşılaştır; yalnız gösterge değerine güvenme.", "Kullanım öncesi devrede yeterli jeneratör kapasitesi bulunduğunu PMS ve bara yükü üzerinden doğrula."],
    stop: ["Aşırı titreşim, hatve geri besleme kaybı, motor sıcaklık alarmı veya yağ seviyesi düşüşünde kullanımı durdur ve köprüüstünü bilgilendir.", "Tünel bölgesinde dalgıç/temizlik çalışması varsa iticiyi elektriksel olarak izole edip kilitlemeden hiçbir kumanda verme."],
    photoCaption: "Tünel tipi baş itici örneği. Izgara, pervane ve dişli kutusu düzeni fotoğrafta bütünüyle görünmez.",
    searchTerms: ["bow thruster", "stern thruster", "tunnel thruster", "azimuth", "pitch control"],
  }),
  "auxiliary/14": seed({
    purpose: "Ana makine ve yardımcı ekipmanın attığı ısıyı kapalı HT/LT tatlı su devreleri üzerinden merkezi soğutucuda deniz suyuna aktarmak.",
    boundary: "Hedef sıcaklığın tutması eşanjörün temiz veya devrenin sağlam olduğunu göstermez; debi, fark basıncı, valf konumu ve su kimyası birlikte değerlendirilir.",
    flow: ["Sea chest and seawater pumps", "Central cooler heat transfer", "LT/HT circuits and three-way temperature valve", "Equipment coolers and jacket water", "Expansion tank trend, water test and PMS"],
    monitor: ["Deniz suyu süzgeç fark basıncı, pompa basınçları, HT/LT giriş-çıkış sıcaklıkları ve genleşme tankı seviyesini yükle birlikte trendle.", "Sığ/çamurlu/buzlu sularda sandık seçimini ve MGPS durumunu operasyon koşuluna göre yönet."],
    verify: ["Aynı yükte artan sıcaklık farkını temizlik ihtiyacı olarak yorumlamadan önce debi ve valf konumunu fiziksel olarak doğrula.", "Genleşme tankındaki seviye değişimini kaçak ve iç geçiş ayrımı için basınç testi, yağ/gaz izi ve klorür ölçümüyle çaprazla."],
    stop: ["Soğutma kaybı, deniz suyu emiş kaybı veya iç geçiş şüphesinde yükü azalt, stand-by pompaya geç ve Başmühendisi bilgilendir.", "Sıcak HT devresinde basınç düşürülüp sıcaklık güvenli seviyeye inmeden kapak/valf açma."],
    searchTerms: ["central cooling", "sea chest", "HT LT circuit", "expansion tank", "thermostatic valve"],
  }),
  "auxiliary/15": seed({
    purpose: "Servis tankındaki yakıtı doğru basınç, sıcaklık ve viskozitede enjeksiyon sistemine ulaştırmak.",
    boundary: "Sıcaklık değeri tek başına doğru enjeksiyonu kanıtlamaz; belirleyici büyüklük viskozitedir ve besleme/booster basınç kademesi gaz kilidini önlemek için gereklidir.",
    flow: ["Service tank and settled fuel", "Supply pump and mixing/deaeration tank", "Booster pump, final heater and viscosity control", "Engine fuel rail and return line", "Filter differential pressure, changeover and fuel log"],
    monitor: ["Besleme/booster basıncı, ısıtıcı çıkış sıcaklığı, viskozite değeri, filtre fark basıncı ve otomatik yıkama sıklığını birlikte izle.", "Yakıt değişiminde sıcaklık değişim hızını ve karışım tankındaki geçiş süresini üretici limitine göre yönet."],
    verify: ["Viskozimetre değerini numune/laboratuvar verisi ve ısıtıcı çıkış sıcaklığıyla çaprazla.", "Servis tankı drenajı ve filtre bulgularını separatör performansıyla birlikte değerlendir; filtreyi tek başına suçlama."],
    stop: ["Yakıt pompalarında sıkışma, ani basınç kaybı, ciddi kaçak veya viskozite kontrolünün kaybında yükü azalt ve emniyetli yakıta planlı geçiş yap.", "Sıcak yakıt kaçağında tutuşma kaynaklarını izole et; hattı basınçlıyken açma."],
    searchTerms: ["fuel booster unit", "viscosity controller", "mixing tank", "changeover", "service tank"],
  }),
  "auxiliary/16": seed({
    purpose: "Yatak ve gömlek yüzeylerinde yağ filmi kurarak sürtünmeyi azaltmak, ısıyı taşımak, sistemi temiz tutmak ve sızdırmazlık sağlamak.",
    boundary: "Yağ basıncının normal görünmesi film kalınlığını veya yağ kalitesini kanıtlamaz; su içeriği, viskozite ve aşınma metalleri ayrı zincirdir.",
    flow: ["Sump/storage tank", "LO pump and cooler", "Full-flow filter and bypass purifier", "Bearings, cylinder lubrication and stern tube", "Low-pressure trip, oil analysis and PMS record"],
    monitor: ["Yağ basıncı/sıcaklığı, filtre fark basıncı, tank ve kıç şaft baş tank seviyelerini turlarda kaydet.", "Silindir yağı besleme oranını yük ve yakıt kükürdüyle, kazıma analizindeki demir/alkalinite sonucuyla birlikte yönet."],
    verify: ["Yağ numunesi sonuçlarını (su, viskozite, aşınma metali) trendle karşılaştır; tek ölçüme dayanarak yağ değişimi kararı verme.", "Separatörün gerçekten yağ çektiğini ve boşaltma çevriminin çalıştığını yerel gözlemle doğrula."],
    stop: ["Düşük yağ basıncı, yağda ciddi su veya karter sıcaklık/sis alarmında korumayı bypass etme; makineyi emniyetli şekilde durdur.", "Karter kapağını soğuma süresi beklemeden açma; sıcak yağ buharı patlama riski taşır."],
    searchTerms: ["lube oil system", "cylinder lubrication", "BN", "scrape down", "stern tube"],
  }),
  "auxiliary/17": seed({
    purpose: "Draft/trim/meyil yönetimi için balast suyunu taşımak ve makine dairesi ile ambar kuyularındaki suyu güvenli biçimde toplamak.",
    boundary: "Mimik panodaki valf göstergesi gerçek hat dizilimini kanıtlamaz; balast ve sintine hatlarının ayrımı hem su alma emniyeti hem kirlilik açısından esastır.",
    flow: ["Tank/sea suction or bilge well", "Ballast or bilge pump", "Valve lineup, eductor and stripping", "Target tank, holding tank or approved treatment", "Level alarm, sounding, ORB/BWRB record"],
    monitor: ["Pompa emiş/basma basıncı, tank seviye değişimi, draft/trim etkisi ve eductor tahrik basıncını birlikte izle.", "Sintine kuyusu seviyelerini ve yüksek seviye alarmlarının çalışır durumunu turlarda doğrula."],
    verify: ["Kritik valfleri yerel olarak fiziksel doğrula; seviye değişimini beklenen debiyle karşılaştır.", "Kayıt defteri girişlerini gerçek sounding ve operasyon saatleriyle çaprazla."],
    stop: ["Beklenmeyen tank seviye değişimi, sintine seviyesinin düşmemesi veya su alma şüphesinde operasyonu durdurup Başmühendis/Kaptan'a yükselt.", "Onaylı ayırıcı devre dışı veya koşullar sağlanmıyorken sintine suyunu denize verme; holding ve kıyı tesisi planına geç."],
    searchTerms: ["ballast system", "bilge system", "eductor", "emergency bilge suction", "high level alarm"],
  }),
  "auxiliary/18": seed({
    purpose: "Dümen makinesi, ırgat, vinç, ambar kapağı ve valf aktüatörleri için kontrollü basınç ve debide hidrolik güç üretmek.",
    boundary: "Sistem basıncının normal görünmesi yağ temizliğini, akümülatör ön şarjını veya sızdırmazlığı kanıtlamaz; arızaların çoğu kirlilik ve nem kaynaklıdır.",
    flow: ["Reservoir and suction", "Electric motor + hydraulic pump", "Relief, directional valves and accumulator", "Cylinders, hydraulic motors and consumers", "Return filter, oil analysis and leak record"],
    monitor: ["Sistem basıncı, motor akımı, yağ sıcaklığı, filtre fark basıncı, tank seviyesi ve kaçak izlerini izlemeye al.", "Pompanın devreye girme sıklığını ve tüketici hareket hızını iç kaçak/ön şarj kaybı açısından trendle."],
    verify: ["Akümülatör ön şarjını yalnız sistem tarafı boşaltıldıktan sonra ölç; sık devreye girmeyi ölçmeden yorumlama.", "Yağ numunesi partikül ve su sonuçlarını üretici hedef temizlik sınıfıyla karşılaştır."],
    stop: ["Sürekli açan emniyet valfi, hızlı ısınma, ciddi kaçak veya kontrol kaybında üniteyi durdur ve tüketiciyi emniyetli konuma al.", "Basınçlı hatta çalışmaya başlamadan basıncı ve akümülatör tarafını boşalt, kilitleme/etiketleme uygula."],
    searchTerms: ["hydraulic power unit", "accumulator precharge", "ISO 4406", "relief valve", "deck hydraulics"],
  }),
  "auxiliary/19": seed({
    purpose: "Yakıt ve yağı tanklar arasında güvenli biçimde taşımak; separatör, filtre ve drenaj kaynaklı kalıntıları toplayıp onaylı yoldan bertaraf etmek.",
    boundary: "Sludge tankının dolu olmaması uyumun kanıtı değildir; üretim, bertaraf ve tank seviyesi arasındaki tutarlılık kayıtlarla birlikte değerlendirilir.",
    flow: ["Bunker/storage tanks and heating", "Positive displacement transfer pump", "Valve lineup, level alarm and overflow tank", "Service tanks, sludge tank and incinerator/shore", "Oil Record Book, receipts and sounding evidence"],
    monitor: ["Transfer sırasında tank seviyeleri, pompa basıncı, ısıtma sıcaklığı ve taşma tankı durumunu sürekli gözetim altında izle.", "Sludge üretim hızını yakıt kalitesi ve separatör performansıyla birlikte haftalık trendle."],
    verify: ["Seviye değişimini beklenen debiyle ve sounding değerleriyle çaprazla; kondens gözetleme tankından serpantin kaçağını kontrol et.", "Kayıt defteri girişlerinin gerçek işlem, miktar ve makbuzlarla tutarlı olduğunu doğrula."],
    stop: ["Basınç yükselip debi oluşmadığında pompayı durdur; kapalı valfe karşı basmaya devam etme.", "Taşma, kaçak veya kirlilik şüphesinde operasyonu durdur, SOPEP'i uygula ve bildirim yükümlülüğünü Kaptan ile değerlendir."],
    searchTerms: ["fuel transfer", "sludge tank", "standard discharge connection", "Oil Record Book", "bunkering"],
  }),

  "fire-safety/0": seed({
    purpose: "Gemi boyunca hidrant ve hortumlara yeterli basınç/debide deniz suyu sağlayarak yangın müdahalesini beslemek.",
    boundary: "Hidrantta basınç görülmesi tüm ring/main bütünlüğünü veya en uzak nozuldaki debiyi kanıtlamaz; izolasyon ve emergency fire pump bağımsızlığı test edilir.",
    flow: ["Sea chest/suction", "Main or emergency fire pump", "Fire main, isolating valves and ISC", "Hydrant-hose-nozzle", "Pressure test, valve plan and PMS"],
    monitor: ["Suction, discharge pressure, priming, leakage ve uzak hidrant performansını izle.", "Isolating valves, international shore connection ve emergency pump erişim/güç kaynağını hazır tut."],
    verify: ["En olumsuz hidrant düzeninde maker/SOLAS/SMS testini yap; yalnız pompa çıkış göstergesine bakma.", "Emergency fire pump'ın ana makine dairesi yangınından bağımsız suction/power/start düzenini fiziksel doğrula."],
    stop: ["Dry running, suction loss, burst main veya elektrik tehlikesinde uygun izolasyon ve alternatif pompa/section kullan.", "Testte yetersiz pressure/flow veya frozen/seized valve bulunursa derhal kritik defect olarak raporla."],
    searchTerms: ["fire main", "emergency fire pump", "hydrant", "international shore connection"],
  }),
  "fire-safety/1": seed({
    purpose: "Korunan mahali tahliye ve izole ettikten sonra oksijen oranını düşüren CO₂ miktarını kontrollü boşaltarak sabit yangın söndürme sağlamak.",
    boundary: "CO₂ release bir ilk müdahale düğmesi değildir; insan için ölümcül atmosfer yaratır ve tahliye, sayım, ventilation/fuel shutdown ve Kaptan yetkisi olmadan kullanılmaz.",
    flow: ["CO₂ cylinders/tank and pilot release", "Manifold, selector and time delay/alarm", "Protected-space piping/nozzles", "Oxygen reduction and fire suppression", "Muster/accounting, release cabinet seal and service record"],
    monitor: ["Release cabinet, pilot cylinder, selector, alarm/time delay, bottle weight/level ve piping/nozzle condition'ı periyodik kontrol et.", "Gerçek olayda mahal tahliyesi, personel sayımı, boundary cooling ve re-entry atmosferini komuta zinciriyle izle."],
    verify: ["Protected space selector ve shutdown interlock'larını Fire Control Plan/maker diagram ile doğrula; valf pozisyonunu ezbere alma.", "Servis/quantity kontrolünü yetkili yöntemle yap; release line'ı CO₂ boşaltarak test etme."],
    stop: ["Personel sayımı tamam değilse veya yanlış mahal seçimi şüphesi varsa release yapma.", "Release sonrası kontrolsüz yeniden giriş/ventilation başlatma; Kaptan ve eğitimli ekip gaz ölçümüyle karar verir."],
    searchTerms: ["fixed CO2", "total flooding", "release cabinet", "time delay", "personnel accounting"],
  }),
  "fire-safety/2": seed({
    purpose: "Yanıcı sıvı yüzeyini foam blanket ile ayırmak, buhar çıkışını ve yeniden tutuşmayı azaltmak.",
    boundary: "Foam tipleri/yüzdeleri ve application rate birbirinin yerine geçmez; yanlış concentrate, deniz suyu uyumu veya sert uygulama blanket'i bozabilir.",
    flow: ["Water + approved foam concentrate", "Proportioner/inductor and pump", "Foam solution/aeration", "Monitor/applicator and blanket", "Concentration test, stock/expiry and drill record"],
    monitor: ["Concentrate level/type, proportioning pressure, solution flow ve monitor/branchpipe erişimini izle.", "Blanket bütünlüğü, wind, hot surface ve drainage/containment'i yangın boyunca yeniden değerlendir."],
    verify: ["Foam concentrate certificate/compatibility ve proportioning test sonucunu sistem tasarımıyla karşılaştır.", "Yalnız köpük görünümüne bakma; application rate ve doğru mahal/alan kapsamını planla doğrula."],
    stop: ["Yanlış concentrate, düşük proportioning, elektrik/kimyasal uyumsuzluk veya personel exposure riskinde uygulamayı yeniden düzenle.", "PFOS veya yasaklı/uygunsuz concentrate şüphesinde stok kullanımını durdur ve şirket/flag prosedürüne yükselt."],
    searchTerms: ["foam system", "AFFF", "proportioner", "foam blanket", "application rate"],
  }),
  "fire-safety/3": seed({
    purpose: "Sprinkler ile ısıya duyarlı otomatik su boşaltımı veya water mist ile ince damlacıkların soğutma/oksijen yer değiştirme etkisini sağlamak.",
    boundary: "Sprinkler ve high/low-pressure water mist aynı sistem değildir; nozzle, section valve, pump/gas unit ve release logic maker tasarımına göre değişir.",
    flow: ["Fresh/sea water tank and pump/gas source", "Section valve/detection-release logic", "Piping and approved nozzles", "Localized cooling/suppression", "Section alarm, pressure test and nozzle inspection"],
    monitor: ["Tank/pressure source, pump auto-start, section valve, detector/release panel ve nozzle obstruction durumunu izle.", "Activation sonrası affected section, water demand, drainage/free-surface ve re-ignition riskini komuta zinciriyle yönet."],
    verify: ["Remote indication ve local valve position'ı karşılaştır; test valve üzerinden alarm/pump response'u maker prosedürüyle doğrula.", "Nozzle cap/obstruction ve approved spacing'i survey/PMS ile kontrol et; rastgele su boşaltımı yapma."],
    stop: ["Yanlış section release, piping rupture veya electrical hazard'da Fire Control Plan'a göre izolasyon/alternatif söndürme kur.", "System impaired ise compensating measures ve flag/class/company notification tamamlanmadan normal koruma varmış gibi işletme."],
    searchTerms: ["sprinkler", "water mist", "section valve", "automatic release", "nozzle"],
  }),
  "fire-safety/4": seed({
    purpose: "Tanker kargo tankı atmosferini non-flammable aralıkta tutmak için düşük O₂'li, temiz ve basıncı kontrollü inert gaz sağlamak.",
    boundary: "IGS patlamayı imkânsız kılmaz; O₂, basınç, deck seal/non-return bütünlüğü, venting ve cargo operation limitleri birlikte korunur.",
    flow: ["Boiler uptake or IG generator gas", "Scrubber/cooler and demister", "Blower + O₂ analyzer", "Deck seal/non-return and deck main", "Tank pressure/O₂ trend, alarms and cargo log"],
    monitor: ["O₂, deck main pressure/temp, scrubber level/flow, blower ve seal water durumunu cargo rate ile birlikte izle.", "Tank pressure/vacuum, P/V breaker ve branch isolations'ı loading/discharge/tank cleaning safhasına göre yönet."],
    verify: ["Fixed O₂ analyzer'ı portable calibrated meter ve sampling point ile çaprazla.", "Deck seal/non-return ve alarm trips'i maker/approved manual testleriyle doğrula; yalnız panel lambasına güvenme."],
    stop: ["O₂ veya pressure approved limit dışına çıkarsa ilgili cargo operation'ı manual'a göre durdur/azalt ve Master/Cargo Officer'ı çağır.", "Deck seal failure, gas backflow veya scrubber/blower ciddi arızasında cargo line-up'ı emniyete al."],
    searchTerms: ["inert gas system", "deck seal", "oxygen analyzer", "tanker", "P/V breaker"],
  }),
  "fire-safety/5": seed({
    purpose: "Duman, ısı veya alev belirtilerini erken algılayıp adres/zone bilgisiyle köprü veya fire control station'a alarm vermek.",
    boundary: "Normal panel tek tek detector temizliği/erişimini veya kapatılmış zone'u kanıtlamaz; isolation ve fault durumları aktif yangın riski gibi yönetilir.",
    flow: ["Smoke/heat/flame detector and manual call point", "Loop/zone wiring and control panel", "Logic, fault and alarm discrimination", "Audible/visual alarm and interface", "Test log, isolation register and detector cleaning"],
    monitor: ["Panel power, loop/zone fault, disable/isolate listesi ve alarm history'yi vardiya boyunca izle.", "Hot work, steam/dust ve ventilation değişiminin false alarm/temporary isolation riskini permit sistemiyle yönet."],
    verify: ["Seçilmiş detector/call point testini approved test medium ile yap ve panelde doğru address/zone'u doğrula.", "Fire patrol ve mahal turunu disabled detector'lara compensating measure olarak kaydet; otomatik algılama varmış gibi davranma."],
    stop: ["Unknown isolation, repeated fault veya alarmın mahalle uymamasında paneli resetleyip geçme; fiziksel investigation yap.", "Gerçek alarm şüphesinde ventilation/fire door ve muster response'u SMS'e göre başlat."],
    searchTerms: ["fire detection", "smoke detector", "addressable loop", "isolation", "manual call point"],
  }),
  "fire-safety/6": seed({
    purpose: "Başlangıç safhasındaki uygun yangın sınıfına eğitimli personelin taşınabilir söndürücüyle kontrollü müdahalesini sağlamak.",
    boundary: "Renk/etiket ve basınç göstergesi tek başına uygunluk kanıtı değildir; ajan, yangın sınıfı, kapasite, erişim, servis ve kaçış yolu birlikte değerlendirilir.",
    flow: ["Approved extinguishing agent", "Cylinder/valve and discharge mechanism", "Hose/nozzle application", "Local effect on the fire class", "Seal/gauge/weight, location plan and service tag"],
    monitor: ["Doğru konum, erişim, pin/seal, corrosion/damage, pressure veya weight ve service date'i kontrol et.", "Müdahalede ajan uyumu, wind, electrical isolation, re-ignition ve kaçış yolunu sürekli değerlendir."],
    verify: ["Fire Control Plan inventory ile gerçek adet/tip/konumu karşılaştır.", "CO₂ ve cartridge/pressure tiplerinde maker/servis ölçüm yöntemini uygula; gauge yeşil diye tam dolu varsayma."],
    stop: ["Yangın büyümüş, duman kaçışı kesmiş veya ajan uygun değilse kişisel müdahaleyi bırakıp alarm/muster ve sabit sisteme geç.", "Kullanılmış/kısmen boşalmış söndürücüyü yerine koyma; işaretle, değiştir ve kayıt aç."],
    searchTerms: ["portable extinguisher", "fire class", "CO2 dry powder foam", "service tag"],
  }),
  "fire-safety/7": seed({
    purpose: "EEBD ile yalnız kaçış için kısa süreli solunum koruması; SCBA ile eğitimli ekip için bağımsız solunum ve yangın/kurtarma çalışması sağlamak.",
    boundary: "EEBD yangınla mücadele veya kapalı mahal girişi cihazı değildir; SCBA süresi nominal cylinder duration değil kullanıcının eforu ve reserve/discipliniyle sınırlıdır.",
    flow: ["Compressed air/chemical oxygen source", "Cylinder/reducer or hood generator", "Mask/hood and demand flow", "Escape or firefighting breathing", "Pressure/weight, low-air alarm and service record"],
    monitor: ["Cylinder pressure/weight, mask/hood, straps, seal, whistle/low-air alarm ve expiry/service durumunu kontrol et.", "SCBA kullanımında entry control, tally, communications, team backup ve turn-around pressure'ı izle."],
    verify: ["Donning, face-seal ve low-pressure alarmı eğitim cihazı/prosedürle doğrula; acil cihazı gereksiz boşaltma.", "Fire Control Plan/muster inventory ile lokasyon/adet ve spare cylinder/compressor durumunu karşılaştır."],
    stop: ["Mask seal yok, pressure yetersiz, alarm/communication arızalı veya backup team yoksa giriş yapma.", "EEBD ile yangına yaklaşma veya yeniden giriş yapma; cihaz yalnız temiz kaçış yoluna ulaşmak içindir."],
    searchTerms: ["EEBD", "SCBA", "low air alarm", "entry control", "escape breathing"],
  }),
  "fire-safety/8": seed({
    purpose: "Yangının yakıt, hava ve enerji beslemesini uzaktan kesmek; fan/damper, quick-closing valve ve emergency stop ile yayılımı sınırlamak.",
    boundary: "Tüm remote shutdown'ları aynı anda rastgele çekmek güvenli değildir; yanlış sistem seçimi propulsion, steering, emergency power veya personel emniyetini etkileyebilir.",
    flow: ["Remote pull/ESD command", "Cable/pneumatic/electric actuation", "Quick-closing valve, fan/damper and pump stop", "Fuel/air/energy isolation", "Position verification, reset control and test log"],
    monitor: ["Mühür, erişim, label, actuator energy ve remote/local position indication'ı kontrol et.", "Gerçek olayda kapanmanın yangın sınırı, propulsion/electrical consequence ve yeniden başlatma riskini komuta zinciriyle yönet."],
    verify: ["Testte komutun doğru valve/fan/pump üzerinde gerçek hareket yarattığını lokal gözlemle doğrula; yalnız panel ışığını kabul etme.", "Fire Control Plan ve P&ID üzerindeki remote stop/quick-closing mapping'i fiziksel etiketlerle karşılaştır."],
    stop: ["Yanlış/kimliği belirsiz release veya stuck actuator varsa sistemi kritik defect olarak işaretle ve compensating measure kur.", "Yangın mahali emniyetli ilan edilmeden reset/reopen yapma; Kaptan/Başmühendis kontrollü yeniden devreye alır."],
    searchTerms: ["quick closing valve", "remote shutdown", "fire damper", "emergency stop", "fuel isolation"],
  }),

  "cargo-systems/0": seed({
    purpose: "Liquid cargo'yu onaylı hat/tank planı içinde kontrollü debi ve basınçla yüklemek, boşaltmak ve stripping yapmak.",
    boundary: "Pompa discharge pressure tek başına güvenli akış değildir; tank venting, valve line-up, shore backpressure, NPSH, cargo properties ve ESD birlikte izlenir.",
    flow: ["Cargo tank/sump and suction valves", "Centrifugal/deepwell/PD pump", "Cargo main, crossover and manifold", "Shore/tank transfer", "Pressure/level/ESD, cargo log and line-up check"],
    monitor: ["Tank level/rate, suction-discharge, pump current/speed, bearing/seal, manifold pressure ve venting'i birlikte izle.", "Stripping aşamasında vapour/gas entrainment, cavitation ve tank bottom condition'ı pump limitine göre yönet."],
    verify: ["İki kişiyle valve line-up/tank identity ve manifold connection'ı ship-shore checklist'e göre fiziksel doğrula.", "Transfer rate'i tank level/ullage change ve shore figure ile çaprazla; tek flowmeter'a güvenme."],
    stop: ["Unexpected level/pressure, ESD/communication loss, seal leak veya venting arızasında transferi agreed emergency sequence ile durdur.", "Yanlış tank/line contamination şüphesinde valf hareketi yapmadan akışı kes, numune/plan ve Cargo Officer kararına dön."],
    searchTerms: ["cargo pump", "deepwell", "stripping", "manifold", "ESD"],
  }),
  "cargo-systems/1": seed({
    purpose: "Ham petrol kargosunu sabit tank-washing machines ile kapalı devrede püskürterek residue'yu boşaltma akışına kazandırmak.",
    boundary: "COW rutin suyla yıkama değildir; approved COW manual, inert condition, washing program, oxygen/pressure ve stripping performansı olmadan uygulanmaz.",
    flow: ["Selected crude oil source", "Cargo pump/heater and COW main", "Fixed washing machines/programmer", "Tank surfaces and stripping", "IG/O₂/pressure, COW checklist and ORB"],
    monitor: ["IG deck pressure/O₂, COW line pressure/temp, machine cycle, tank atmosphere ve stripping suction'ı program boyunca izle.", "Static electricity, leakage, wash sequence ve slop/tank level'i approved manual limitlerinde yönet."],
    verify: ["Machine movement/pressure ve stripping performance'ı designated indicators/sounding ile doğrula.", "COW planı ile gerçek tank/machine/line-up ve ORB entry'yi çaprazla."],
    stop: ["IG pressure/O₂ limiti ihlali, COW line leak, machine failure veya stripping kaybında washing'i manual'a göre durdur.", "Manual dışı tank/program veya uygun olmayan crude ile COW yapma; Kaptan/Cargo Officer'a yükselt."],
    searchTerms: ["COW", "crude oil washing", "inert gas", "washing machine", "stripping"],
  }),
  "cargo-systems/2": seed({
    purpose: "Tank ullage/level, temperature ve bağımsız high-level/overfill bilgisiyle cargo miktarı ve taşma emniyetini izlemek.",
    boundary: "Continuous radar gauge ile independent high-level/overfill alarm aynı fonksiyon değildir; ortak power/sensor failure ve cargo foam/vapour etkisi ayrılır.",
    flow: ["Radar/servo/pressure sensor and temp elements", "Signal processing + tank calibration", "Cargo monitoring display", "Level/volume/temp and independent alarms", "Manual ullage cross-check, calibration and cargo log"],
    monitor: ["Level trend, rate, alarm health, vapour/foam etkisi, sensor discrepancy ve tank pressure'i izle.", "Loading limit ve alarm setpoint'lerini tank table, trim/list ve thermal expansion ile birlikte değerlendir."],
    verify: ["Uygun kapalı manual gauging veya bağımsız sensor ile selected tank reading'i çaprazla.", "High/high-high alarm functional testini approved procedure ile yap; process gauge simülasyonunu gerçek independent alarm testi sanma."],
    stop: ["Unknown/frozen level, alarm fault veya rate-level mismatch'te loading rate'i azalt/durdur ve tankı bağımsız ölç.", "Overfill alarmını susturup operasyona devam etme; ship-shore ESD planını uygula."],
    searchTerms: ["tank radar", "ullage", "high level alarm", "overfill", "tank table"],
  }),
  "cargo-systems/3": seed({
    purpose: "Ambar yükünü deniz etkilerinden korumak ve weathertight kapama bütünlüğünü sürdürmek.",
    boundary: "Görsel kapalı görünüm veya tebeşir izi tek başına weathertight performans değildir; structural condition, drainage, compression ve test birlikte gerekir.",
    flow: ["Hydraulic/lift-away actuation", "Panels, hinges/rollers and rails", "Cleats/locks", "Packing-compression bar-drainage", "Ultrasonic/hose test, survey and cargo record"],
    monitor: ["Panel/track alignment, seal compression, cross-joints, cleats ve drain non-return condition'ı izle.", "Heavy weather ve cargo operation sonrası coaming/panel deformation ve leakage evidence'i kontrol et."],
    verify: ["Pre-loading/closing walkdown ve suitable leak test ile bütün cover perimeter'ı doğrula.", "Repair sonrası local patch'i değil global compression/drainage continuity'yi test et."],
    stop: ["Panel hareket alanı açık değilse veya lock/interlock çalışmıyorsa hareket ettirme.", "Known leakage/deformation ile sea passage kararını Cargo Officer/Kaptan/klas değerlendirmesine yükselt."],
    searchTerms: ["hatch cover", "ultrasonic tightness", "weathertight", "cleat", "drain channel"],
  }),
  "cargo-systems/4": seed({
    purpose: "Kargo birimlerinin gemi hareketleri altında kayma, devrilme veya yer değiştirmesini approved CSM düzeniyle önlemek.",
    boundary: "Lashing sayısı tek başına yeterlilik değildir; cargo weight/CG, stow position, acceleration, angle, MSL/CS ve ekipman condition hesabı belirler.",
    flow: ["Cargo unit weight/CG and stow plan", "CSM/lashing calculation", "Twistlock, rod, turnbuckle/dunnage", "Ship structure/lashing point load path", "Inspection rounds, CSM record and damaged gear quarantine"],
    monitor: ["Correct gear/type, thread engagement, tension, lashing angle, stack geometry ve loose/damaged unit'i izle.", "Heavy weather, ice, vibration ve cargo settling sonrası lashing condition'ı yeniden kontrol et."],
    verify: ["Actual stow/weight ile approved CSM/computer input'unu bay-row-tier düzeyinde karşılaştır.", "Gear marking/certificate ve visual condition'ı doğrula; okunmayan veya deforme ekipmanı kullanma."],
    stop: ["CSM dışı stow, unknown weight/CG, missing/broken fitting veya unsafe access varsa departure/operation'ı düzeltme olmadan onaylama.", "Denizde lashing müdahalesi için risk assessment, weather/deck access ve fall protection olmadan ekibi göndermeme."],
    searchTerms: ["lashing", "Cargo Securing Manual", "MSL", "CS", "twistlock"],
  }),
  "cargo-systems/5": seed({
    purpose: "Reefer container'a güvenli elektrik beslemesi sağlamak ve set/return/supply temperature ile alarm durumunu izlemek.",
    boundary: "Socket enerjili ve display normal olması kargonun pulp temperature'ını kanıtlamaz; container unit, airflow, setpoint ve cargo instruction birlikte değerlendirilir.",
    flow: ["Ship reefer distribution power", "Breaker/socket/cable", "Container controller/compressor/fans", "Cargo air temperature", "Monitoring system, alarm round and reefer log"],
    monitor: ["Set/supply/return temp, current, phase/alarm, defrost ve ventilation setting'i cargo instruction ile izle.", "Plug/lead condition, water ingress, securing ve safe access'i her round'da kontrol et."],
    verify: ["Container ID ve setpoint'i manifest/reefer list ile; remote monitoring'i local display ile çaprazla.", "Electrical isolation/dead test'i bağlantı sökmeden önce uygun tester ve permit ile doğrula."],
    stop: ["Damaged/wet plug, earth fault, overheating veya unsafe access'te enerjiyi izole et ve ETO/Cargo Officer'a bildir.", "Temperature excursion'da setpoint'i izinsiz değiştirme; alarm zamanı, local condition ve cargo instruction'ı kaydet."],
    searchTerms: ["reefer container", "reefer socket", "set supply return temperature", "earth fault"],
  }),
  "cargo-systems/6": seed({
    purpose: "Ro-Ro araç/yük akışını sağlayan ramp ve shell door'u kontrollü hareket ettirmek, denizde kilitli ve weathertight/watertight durumda tutmak.",
    boundary: "Closed lamp tek başına emniyet değildir; physical locking, cleats, hydraulic pressure isolation ve bridge indication ayrı doğrulanır.",
    flow: ["Hydraulic/electric power", "Cylinders/winches/hinges", "Control + interlock", "Ramp/door and locks/cleats", "Bridge indication, CCTV/round and voyage checklist"],
    monitor: ["Movement zone, hinge/wire/cylinder load, hydraulic leak, vehicle interface ve wind/ship motion'u izle.", "Closing'de seal/compression, lock sequence ve local/bridge indication'ı adım adım kontrol et."],
    verify: ["Sorumlu kişi tüm locks/cleats'i fiziksel kontrol edip bridge indicator ile karşılaştırır.", "Departure checklist ve shell-door alarm testini SMS'e göre yap; CCTV'yi tek kanıt sayma."],
    stop: ["Person/vehicle movement zone'da, interlock bypass, asymmetrical movement veya wire/hydraulic abnormality varsa hareketi durdur.", "Lock/seal/indicator uyuşmazlığında denize çıkma kararını Kaptan/klas prosedürüne yükselt."],
    searchTerms: ["ro-ro ramp", "cargo door", "shell door", "locking cleat", "bridge indication"],
  }),
  "cargo-systems/7": seed({
    purpose: "Vinç, derrick ve loose gear ile yükü onaylı SWL ve rigging plan içinde kaldırmak.",
    boundary: "Crane SWL, derrick union purchase SWL veya loose gear MSL değerleri birbirine doğrudan çevrilmez; rig configuration ve resultant loads hesaplanır.",
    flow: ["Certified lifting appliance and power", "Hoist/luff/slew or derrick rig", "Wire/block/hook/sling", "Cargo + ship structure load path", "SWL marking, register, pre-use check and signal plan"],
    monitor: ["Rig geometry, preventer/guy tension, wire leads, brakes/limits, load swing ve weather'i izle.", "Single agreed signaller, radio fallback ve exclusion zone'u operasyon boyunca koru."],
    verify: ["Cargo weight/CG, lift points ve tüm gear certificates/SWL'yi lift plan ile karşılaştır.", "Yüksüz ve uygun test yükü altında brake/limit/function check'i approved procedure ile doğrula."],
    stop: ["Unknown weight, side pull, gear damage, communication loss veya person under load varsa kaldırmayı durdur.", "Any overload/structural contact sonrası competent-person examination olmadan yeniden kullanma."],
    searchTerms: ["cargo gear", "derrick", "union purchase", "rigging plan", "loose gear"],
  }),
  "cargo-systems/8": seed({
    purpose: "Tank yüzeylerini approved medium/program ile temizlemek, residue'yu slop'a toplamak ve eductor/stripping ile transfer etmek.",
    boundary: "Tank cleaning kimyasal püskürtme değildir; atmosphere, static electricity, toxicity, tank coating, heating, slop capacity ve discharge law birlikte yönetilir.",
    flow: ["Wash water/crude/chemical medium", "Heater/pump and tank cleaning main", "Fixed/portable machines", "Eductor/stripping and slop tanks", "Atmosphere/pressure/temp, tank-cleaning log and record book"],
    monitor: ["Tank atmosphere, wash pressure/temp, machine cycle, slop level, stripping suction ve deck leak'i izle.", "Simultaneous operations, venting/IG, chemical exposure ve enclosed-space boundaries'yi permit/SMS ile yönet."],
    verify: ["Cleaning plan ile actual tank/line/machine program ve slop capacity'yi çaprazla.", "Eductor motive pressure-vacuum ve stripping result'u sounding/ullage ile doğrula."],
    stop: ["Atmosphere limit dışı, IG/vent failure, leak, machine jam veya slop capacity riskinde cleaning'i durdur.", "Tank entry için ayrı enclosed-space entry permit/gas-free/LOTO tamamlanmadan içeri girme."],
    searchTerms: ["tank cleaning", "slop", "eductor", "stripping", "tank atmosphere"],
  }),

  "environmental-auxiliary/0": seed({
    purpose: "Balast suyunu type-approved treatment process ile D-2 discharge standardına uygun yönetmek ve işlemi izlenebilir kaydetmek.",
    boundary: "Type approval her su kalitesi/flow koşulunda compliance garantisi değildir; system design limitations, TRO/UV dose, holding time ve contingency measures uygulanır.",
    flow: ["Ballast intake and sampling", "Filter + UV/electrochlorination/active substance", "Monitoring/control and neutralization", "Treated ballast tank/discharge", "BWRB, alarms, calibration and compliance sample"],
    monitor: ["Flow, filter differential pressure/backwash, UV intensity/UVT veya TRO, temperature/salinity ve treatment alarms'ı SDL ile karşılaştır.", "Bypass, sensor invalid, hold time ve neutralization/discharge limitlerini voyage planıyla yönet."],
    verify: ["Valve line-up ve treatment status'u actual ballast tank/flow ile; sensor reading'i calibration/sample ile çaprazla.", "BWRB entry, BWMP contingency action ve alarm export'unun aynı operasyonu anlattığını doğrula."],
    stop: ["Treatment critical alarm, unapproved bypass, sensor invalid veya SDL dışı koşulda compliance varmış gibi discharge etme.", "Contingency measure'i Kaptan/şirket/port authority süreciyle belirle ve kaydet."],
    references: [ref("BWM Convention D-2 + BWMS Code", "Treatment performance, type approval, plan ve record book")],
    searchTerms: ["BWMS", "D-2", "UVT", "TRO", "ballast water record book", "system design limitations"],
  }),
  "environmental-auxiliary/1": seed({
    purpose: "Oily bilge water'ı 15 ppm filtering equipment üzerinden yalnız yasal koşullarda işlemek ve deşarjı otomatik güvenceye almak.",
    boundary: "ppm ekranı veya clean-water test sonucu gerçek bilge akışının uygunluğunu kanıtlamaz; approved piping, alarm/stop, konum şartı ve ORB mass balance gerekir.",
    flow: ["Bilge holding tank", "OWS/coalescer/filter", "15 ppm alarm sample loop", "Overboard or recirculation/stop", "ORB, seals, calibration and tank balance"],
    monitor: ["Feed homogenization, pressure drop, emulsion, sample flow, ppm trend ve automatic stop'u izle.", "Tank sounding, processed quantity ve discharge duration/rate'in matematiksel tutarlılığını kontrol et."],
    verify: ["Actual pipe/valve route'u approved drawing ile fiziksel karşılaştır.", "Alarm/automatic stop testini approved procedure ve geçerli calibration ile doğrula."],
    stop: ["Sample/alarm/stop arızası, ppm limit aşımı veya yasal discharge koşulu yoksa overboard'u kesin kapat.", "Bypass/seyreltme yapma; reception facility/holding planı kur ve defect'i raporla."],
    searchTerms: ["15 ppm", "oily water separator", "MARPOL Annex I", "ORB", "bypass"],
  }),
  "environmental-auxiliary/2": seed({
    purpose: "Sewage'i approved treatment veya holding düzeniyle MARPOL Annex IV ve yerel şartlara uygun yönetmek.",
    boundary: "Genel '3/12 mil' ezberi tek başına karar ağacı değildir; approved plant, comminution/disinfection, en route, rate, special area ve coastal rules birlikte okunur.",
    flow: ["Collection/holding", "Biological/physical treatment", "Disinfection and effluent", "Approved discharge/reception", "Sample, certificate, valve line-up and log"],
    monitor: ["Plant/blower/level/disinfection, effluent quality ve holding capacity'yi voyage boyunca izle.", "Discharge position/speed/rate ve local/special-area restrictions'i planla doğrula."],
    verify: ["Valve line-up ve actual tank/effluent condition'ı panelle karşılaştır.", "Sample/test ve certificate/approved manual limitini çaprazla."],
    stop: ["Plant failure, poor effluent, overflow riski veya legal condition yoksa overboard'u kapat.", "Tank/plant girişini enclosed-space/biological hazard kontrolü olmadan yapma."],
    searchTerms: ["sewage", "MARPOL Annex IV", "special area", "holding tank", "effluent"],
  }),
  "environmental-auxiliary/3": seed({
    purpose: "Yalnız izinli gemi atıklarını type-approved incinerator'da kontrollü yakmak ve MARPOL kayıt zincirini sürdürmek.",
    boundary: "Sludge/garbage availability yakma izni değildir; prohibited material, port/local restriction, chamber condition ve operating manual belirleyicidir.",
    flow: ["Segregated approved waste", "Feed/burner", "Primary-secondary combustion", "Flue gas + ash", "Temperature/interlock, sludge/garbage record and PMS"],
    monitor: ["Chamber temp/draft, flame, feed, flue ve refractory condition'ı izle.", "Waste category/mass balance ve ash disposal route'u kayıtlarla yönet."],
    verify: ["Feed category'yi Garbage/Sludge record ve MSDS ile doğrula.", "Interlock/sensor testini PMS ve service report ile çaprazla."],
    stop: ["Low temp/flame failure/smoke leak/refractory damage'da feed'i kes.", "Unknown/prohibited waste veya port ban varsa yakma yapma."],
    searchTerms: ["shipboard incinerator", "MARPOL Annex VI", "Garbage Record Book", "sludge"],
  }),
  "environmental-auxiliary/4": seed({
    purpose: "Accommodation/control spaces için sıcaklık, nem, taze hava ve basınç dengesini güvenli/yaşanabilir seviyede tutmak.",
    boundary: "Set temperature indoor air quality değildir; outside air, filter, damper/fire closure, humidity, condensate ve space pressure birlikte değerlendirilir.",
    flow: ["Outside/return air", "Filter, coil and fan", "Damper/duct control", "Conditioned occupied spaces", "Temp/humidity/pressure, fire damper and hygiene PMS"],
    monitor: ["Supply/return temp, humidity, filter ΔP, fan current, condensate ve damper position'ı izle.", "Galley/hospital/battery/paint store gibi özel mahal basınç ve exhaust ayrımını koru."],
    verify: ["BMS value'yu calibrated room/duct measurement ve airflow ile çaprazla.", "Fire damper/remote stop ve smoke-control fonksiyonlarını Fire Control Plan/PMS ile doğrula."],
    stop: ["Smoke/fire spread, refrigerant leak veya contamination'da ilgili zone'u planlı şekilde izole et.", "Confined duct/fan bakımına LOTO ve hygiene/permit olmadan girme."],
    searchTerms: ["HVAC", "air handling unit", "fire damper", "humidity", "pressure balance"],
  }),
  "environmental-auxiliary/5": seed({
    purpose: "Hydrophore tankındaki hava yastığıyla domestic fresh-water şebekesinde kararlı basınç sağlamak.",
    boundary: "Basınç normal olsa da potable water kalitesi, air-charge, pump cycling, backflow ve tank hygiene ayrı kontrol edilir.",
    flow: ["Fresh-water storage and pumps", "Hydrophore tank/air cushion", "Pressure switch/control", "Domestic distribution", "Pressure cycle, disinfection/sample and tank inspection"],
    monitor: ["Cut-in/out pressure, pump starts, tank level/air cushion, leak ve relief valve'i izle.", "Chlorine/residual veya ship water plan parametreleri, tank cleanliness ve shore bunkering riskini yönet."],
    verify: ["Pressure gauge/switch'i calibrated gauge ile; pump cycling'i actual demand/leak test ile çaprazla.", "Potable quality'yi uygun sample/test ile doğrula; görünüş/tat tek kanıt değildir."],
    stop: ["Contamination/backflow, tank bladder/air loss veya rapid cycling'de affected supply'ı izole et ve düzelt.", "Basınçlı tankı depressurize/LOTO olmadan açma."],
    searchTerms: ["hydrophore", "domestic fresh water", "pressure switch", "potable water"],
  }),
  "environmental-auxiliary/6": seed({
    purpose: "Provision rooms'ta kesintisiz cold-chain sıcaklığı ve gıda emniyetini vapour-compression refrigeration ile sürdürmek.",
    boundary: "Room air temperature ürün çekirdek sıcaklığı ve kaliteyi tek başına göstermez; airflow, door opening, defrost ve alarm duration izlenir.",
    flow: ["Room/product heat", "Evaporator and compressor", "Condenser/receiver", "Expansion and recirculation", "Room/product log, alarm and refrigerant PMS"],
    monitor: ["Room/product temp, pressure, superheat, defrost, fan ve door seal'i izle.", "Alarm duration ve food segregation/contingency'yi catering officer ile yönet."],
    verify: ["Remote sensor'u calibrated independent thermometer ile karşılaştır.", "Stand-by unit/alarm ve refrigerant leak detection'ı test et."],
    stop: ["Severe refrigerant leak/high pressure/low oil'de ünitenin protection'ını bypass etme.", "Temperature excursion'da ürünü otomatik uygun sayma; food-safety değerlendirmesi ve kayıt yap."],
    searchTerms: ["provision refrigeration", "cold room", "cold chain", "defrost"],
  }),
  "environmental-auxiliary/7": seed({
    purpose: "Starting, control ve working air'i gerekli basınç, rezerv ve kaliteyle ayrı/korumalı devrelerde sağlamak.",
    boundary: "Devreler arası cross-connection yanlış basınç veya kirlenme yayabilir; start air, control air ve working air gereksinimleri aynı değildir.",
    flow: ["Compressors", "Cooler/separator/dryer", "Receivers", "Start-control-working manifolds", "Pressure/dew point/drains, relief and survey"],
    monitor: ["Receiver pressures, dew point/oil-water drains, compressor cycling ve non-return/relief durumunu izle.", "Control-air quality ve starting-air reserve'i manoeuvring demand ile birlikte değerlendir."],
    verify: ["Local gauges/receiver drains ve automatic start-stop'u control system ile çaprazla.", "Isolation/cross-connection lineup'ını P&ID ve tag ile fiziksel doğrula."],
    stop: ["Oil carry-over/high temp/relief lift veya control-air contamination'da affected source'u izole et.", "Starting-air manifold üzerinde turning gear/engine isolation ve depressurization olmadan çalışma yapma."],
    searchTerms: ["starting air", "control air", "working air", "dryer", "receiver"],
  }),
  "environmental-auxiliary/8": seed({
    purpose: "Boiler steam'ini ısıtma kullanıcılarına dağıtmak, kondensi güvenli toplayıp feedwater çevrimine döndürmek.",
    boundary: "Steam valve open/pressure varlığı doğru condensate drainage veya trap çalışmasını kanıtlamaz; water hammer ve hot-surface riski izlenir.",
    flow: ["Boiler steam header", "Reducing/control valves", "Consumers/tracing/coils", "Steam traps and condensate return", "Pressure/temp, trap survey, water test and insulation PMS"],
    monitor: ["Header/branch pressure, drain/trap, return temp, hotwell level ve make-up trendini izle.", "Warm-through sırasında expansion, water hammer ve condensate pocket riskini yavaş valf operasyonuyla yönet."],
    verify: ["Trap function'ı temperature/ultrasonic method ve condensate return ile çaprazla.", "Valve lineup ve pressure-reducing/safety device'i P&ID/maker testine göre doğrula."],
    stop: ["Water hammer, major leak, failed trap causing flooding veya overpressure'da branch'i emniyetli izole et.", "Hot/pressurized line'ı cool-drain-vent-LOTO tamamlanmadan açma."],
    searchTerms: ["steam condensate", "steam trap", "water hammer", "hotwell"],
  }),

  "gmdss-lsa/0": seed({
    purpose: "Distress alerting, SAR coordination, MSI reception ve general communications fonksiyonlarını sea area ve redundancy esaslı bütünleşik düzenle sağlamak.",
    boundary: "GMDSS tek bir cihaz veya yalnız Inmarsat değildir; fonksiyonların sağlanması geminin sea area'sı, approved service/equipment ve duplicated/shore maintenance düzenine bağlıdır.",
    flow: ["VHF/MF/HF and recognized mobile satellite service", "DSC/satellite terminals + identities", "GNSS/time and reserve power", "Distress alert, voice/data and MSI", "Radio log, daily/weekly/monthly tests and shore service"],
    monitor: ["Sea area, watch receivers, position/time feed, printer/storage, antenna, reserve source ve charger alarmını izle.", "NAVTEX/SafetyNET MSI coverage ve message filtering'i voyage route ile eşleştir."],
    verify: ["Approved self-test/test call'ları radyo log prosedürüne göre yap; distress alert'i gerçek ağa yanlışlıkla gönderme.", "Battery autonomy/capacity ve duplicated equipment route'unu certificate/diagram ile doğrula."],
    stop: ["Distress false alert'te approved cancellation procedure'u hemen uygula ve RCC/coast station ile kayıt zincirini kur.", "Watch/alerting fonksiyonu kaybında Master'a bildir, defect/shore assistance ve compensating watch planı oluştur."],
    references: [ref("SOLAS IV (2024 modernized GMDSS)", "Functional requirements, sea areas, radio installations and watches")],
    searchTerms: ["GMDSS", "sea area A1 A2 A3 A4", "MSI", "reserve source", "distress alerting"],
  }),
  "gmdss-lsa/1": seed({
    purpose: "A1/short-range bölgede Ch 70 DSC distress/safety alerting ve VHF voice coordination sağlamak.",
    boundary: "DSC distress alert ayrıntılı voice distress traffic'in yerine geçmez; wrong MMSI/position/time veya antenna fault SAR verisini bozar.",
    flow: ["MMSI, GNSS/time and operator input", "VHF DSC controller Ch 70", "VHF transmitter/antenna", "DSC acknowledgment + working-channel voice", "Radio log, self-test and reserve power"],
    monitor: ["Ch 70 watch, GNSS age, MMSI, power source, squelch/volume ve antenna/VSWR fault'u izle.", "Distress category/nature ve follow-up working channel'ı olay prosedürüyle yönet."],
    verify: ["Internal/self-test ve izinli test call'ı ile DSC path'i; routine voice radio check ile audio path'i ayrı doğrula.", "Handset/channel/power selection'ı actual display ile kontrol et; dual-watch'i Ch 70 DSC watch sanma."],
    stop: ["False alert'te cihazı kapatıp susma; DSC cancellation ve Ch 16 voice cancellation prosedürünü uygula.", "Position/MMSI yanlışsa distress tuşunu koşulsuz kullanmadan manuel düzeltme/voice supplement planla."],
    searchTerms: ["VHF DSC", "channel 70", "channel 16", "MMSI", "false alert"],
  }),
  "gmdss-lsa/2": seed({
    purpose: "MF/HF DSC ve radiotelephony ile onaylı A2-A4 uzun menzil distress/safety communication sağlamak; varsa legacy NBDP işlevini geminin Radio Record'una göre yönetmek.",
    boundary: "MF/HF menzili sabit değildir; frequency, time, ionosphere, antenna/tuning ve propagation sonucu belirler; satellite'in basit alternatifi gibi işletilmez.",
    flow: ["MMSI/GNSS + frequency selection", "DSC controller and transmitter", "Antenna tuner/earth and MF/HF antenna", "Coast/ship DSC + voice / where fitted installed NBDP", "Watch receiver, test log and reserve power"],
    monitor: ["Sea area/frequency watch, tuning result, power, antenna earth, propagation ve selected mode'u izle.", "Distress acknowledgement/relay ve working frequency change'i GOC procedure ile yönet."],
    verify: ["Approved coast-station test call veya self-test ile DSC path'i; voice ve Radio Record'da bulunan diğer installed fonksiyonları ayrı doğrula.", "Position/time ve MMSI'yi alert ekranında actual source'la karşılaştır."],
    stop: ["Tuning/antenna fault veya repeated failed call'da aynı işlemi körlemesine tekrarlama; uygun band/service ve Master planına geç.", "False distress'te band/mode'a uygun cancellation ve log/authority notification yap."],
    searchTerms: ["MF HF DSC", "NBDP", "antenna tuner", "propagation", "A2 A3 A4"],
  }),
  "gmdss-lsa/3": seed({
    purpose: "Store-and-forward satellite data ile distress alert, EGC MSI/SafetyNET ve ship-shore text communication sağlamak.",
    boundary: "Terminal login/registered görünümü mesajın teslim edildiğini veya doğru ocean region/service seçimini tek başına kanıtlamaz; delivery status ve EGC configuration izlenir.",
    flow: ["MMSI/IMO identity, GNSS and message input", "Inmarsat-C/Mini-C terminal", "Satellite + land earth station", "Distress/data and EGC MSI", "Delivery report, EGC log, self-test and backup power"],
    monitor: ["Logged-in status, position/time, EGC areas, printer/storage, antenna ve distress button protection'ı izle.", "Message priority, address ve delivery confirmation'ı operasyona göre kontrol et."],
    verify: ["Approved link/performance test ile terminal path'i; received EGC route relevance ile filtering'i doğrula.", "Distress position/identity display'ini GNSS ve ship certificate ile karşılaştır."],
    stop: ["Failed delivery/login veya wrong identity/position'da tek kanala güvenme; alternative GMDSS means ve Master notification kullan.", "False distress'te recognized service cancellation procedure ve RCC notification uygula."],
    searchTerms: ["Inmarsat C", "Mini-C", "SafetyNET", "EGC", "delivery report"],
  }),
  "gmdss-lsa/4": seed({
    purpose: "Gemi batma/terk durumunda 406 MHz distress identity ve varsa GNSS position'ı Cospas-Sarsat sistemine iletmek; homing/AIS fonksiyonlarıyla SAR'ı desteklemek.",
    boundary: "EPIRB test mode dışında aktive edilmez; hydrostatic release otomatik serbest bırakır ancak yanlış mounting, lanyard düzeni veya obstruction float-free çalışmayı engeller.",
    flow: ["Float-free bracket, HRU and manual release", "406 MHz beacon + GNSS", "Cospas-Sarsat satellite/ground segment", "RCC distress data + 121.5/AIS homing", "Self-test, battery/HRU expiry and registration"],
    monitor: ["Bracket erişimi, housing, lanyard'ın doğru istifi, HRU ve battery expiry, registration label ve GNSS self-test sonucunu kontrol et.", "Gerçek aktivasyonda beacon'ı açık gökyüzüyle dik konumda ve mümkünse survival craft'a bağlı tut."],
    verify: ["Maker self-test/GNSS testini izinli aralıkta yap; RF transmission testini gerçek distress gibi üretme.", "HEX ID/MMSI registration'ı certificate/database kaydıyla karşılaştır; gemi/flag değişiminde güncelle."],
    stop: ["Accidental activation'da beacon'ı kapatmakla yetinme; RCC/coast station'a false alert cancellation yap ve logla.", "Expired/damaged/failed self-test EPIRB'i serviceable sayma; approved replacement/shore service sağla."],
    searchTerms: ["EPIRB", "406 MHz", "Cospas-Sarsat", "HRU", "float free", "121.5"],
  }),
  "gmdss-lsa/5": seed({
    purpose: "Radar SART ile X-band radar interrogasyonuna cevap vererek veya AIS-SART ile GNSS konum mesajı yayınlayarak survival craft'ın bulunmasını kolaylaştırmak.",
    boundary: "Radar SART S-band radarda görünmez; ekrandaki 12 cevap işareti mesafe/receiver saturation ile yay/halka haline dönüşebilir ve anten yüksekliği menzili belirler.",
    flow: ["Manual activation and high mounting", "X-band interrogation or GNSS", "Radar SART swept response / AIS messages", "SAR radar/AIS display", "Self-test, battery expiry and craft inventory"],
    monitor: ["Activation indication, mounting height/orientation ve survival craft'taki erişimi izle.", "Radar SART aramada X-band radar range/gain/sea clutter ayarını hedef cevabını bastırmayacak şekilde yönet."],
    verify: ["Maker self-test'i vessel radarına yanlış target üretmeden approved mode'da yap.", "Inventory, battery expiry ve correct type'ı muster/LSA plan ile karşılaştır."],
    stop: ["Distress dışında operational mode'a alma; false response oluşursa bridge team'i bilgilendir.", "Failed self-test/expired battery cihazı serviceable sayma ve craft'a geri koyma."],
    searchTerms: ["radar SART", "AIS-SART", "X-band", "12 dots", "homing"],
  }),
  "gmdss-lsa/6": seed({
    purpose: "Köprüüstü vardiya faaliyetini belirli inactivity süresinde kademeli alarm zinciriyle doğrulamak.",
    boundary: "BNWAS gözcü veya vardiya zabiti yerine geçmez; reset'e sürekli/otomatik basılması sistemin amacını bozar ve mode yetkisi Kaptana aittir.",
    flow: ["Active mode + inactivity timer", "Reset devices/motion input", "Bridge visual/audible alarm", "Backup officer/master/cabin alarm stages", "Mode/reset test, defect and bridge log"],
    monitor: ["Operating mode, timer, reset locations, stage alarms ve backup officer routing'i vardiya başında kontrol et.", "Reset'in gerçek bridge activity'yi temsil ettiğini ve alarmın ambient noise'da duyulduğunu doğrula."],
    verify: ["Stage sequence ve cabin routing testini SMS/maker prosedürüyle gerçek recipients'e kadar doğrula.", "Mode access/keys ve power-failure alarmını bridge equipment checklist ile karşılaştır."],
    stop: ["Stage alarm/routing arızası veya unauthorized bypass'ta Master'a bildir ve compensating watch düzeni kur.", "Alarmı susturmak için sürekli reset/weight/tape kullanma; bu kritik emniyet sistemini etkisizleştirir."],
    searchTerms: ["BNWAS", "bridge watch alarm", "inactivity timer", "reset", "alarm stages"],
  }),
  "gmdss-lsa/7": seed({
    purpose: "Kaza incelemesi için köprü sesleri, seyir sensörleri, radar/ECDIS görüntüsü ve gerekli gemi verilerini korumalı kayda almak.",
    boundary: "Normal status lamp tüm data channel'larının anlamlı kaydedildiğini kanıtlamaz; annual performance test ve source-specific monitoring gerekir.",
    flow: ["Bridge audio, GNSS/gyro/log/AIS/alarms and images", "Data acquisition/concentrator", "Long-term storage + fixed/float-free capsule", "Playback/export/save function", "APT, channel status and incident preservation log"],
    monitor: ["Power/UPS, capsule/beacon, microphones, input-channel fault ve recording status'u izle.", "Incident/near miss sonrası overwrite süresini beklemeden maker/SMS save/preserve action'ı uygula."],
    verify: ["Annual performance test report ve channel list'i actual installed sensors/displays ile karşılaştır.", "Approved playback/check ile time sync, audio ve selected channels'in usable olduğunu doğrula; veriyi değiştirme."],
    stop: ["Recording/input fault'ta Master ve company'ye bildir, defect/repair planı oluştur; normal seyir verisi varmış gibi raporlama.", "Kaza sonrası capsule/data'ya yetkisiz erişme, silme veya export yapma; evidence chain'i koru."],
    references: [ref("SOLAS V/20 + MSC.333(90)", "VDR carriage ve revised performance standard; gemi/yapım tarihine göre VDR/S-VDR uygulanır")],
    searchTerms: ["VDR", "S-VDR", "annual performance test", "capsule", "save data"],
  }),
  "gmdss-lsa/8": seed({
    purpose: "Mustered kişileri gemiden emniyetli ayırmak, denizde korumak ve gerektiğinde motorlu survival craft işlevi sağlamak.",
    boundary: "Filika/davit testleri yüksek risklidir; release gear ve overload/dynamic testler yalnız SOLAS III/20, MSC.402(96), maker ve yetkili service-provider sınırında yapılır.",
    flow: ["Muster, embarkation and securing", "Davit/winch/brake/falls", "Release gear and painter", "Lifeboat engine/survival equipment", "Weekly/monthly checks, drills and authorized service"],
    monitor: ["Hull/door, drain plug, equipment, engine/fuel, battery, steering, falls, brake, limit ve release indicators'ı planlı kontrol et.", "Launch/recovery'de ship motion, water area, communication, hooks ve winch/fall load'ını dedicated command ile izle."],
    verify: ["Checklist/LSA plan ile inventory ve securing'i fiziksel karşılaştır; engine testini cooling/maker restrictions ile yap.", "Annual/5-year service ve release gear records'ını authorized provider/Administration acceptance ile doğrula."],
    stop: ["Unclear hook status, damaged fall/brake, person in danger zone veya communication loss'ta launch/recovery'yi durdur.", "Safety pin/interlock bypass veya yetkisiz on-load release testine izin verme."],
    searchTerms: ["lifeboat", "davit", "release gear", "MSC.402(96)", "falls", "winch brake"],
  }),
  "gmdss-lsa/9": seed({
    purpose: "Gemi battığında HRU ile float-free serbest kalmak veya manuel denize atılarak painter çekimiyle şişip survival platformu sağlamak.",
    boundary: "HRU raft'ı şişirmez; container'ı gemiden serbest bırakır. Painter'ın weak link/ship bağlantısı ve doğru lashing olmadan float-free zincir çalışmaz.",
    flow: ["Cradle/lashing + HRU + weak link", "Float-free/manual release", "Painter pull and CO₂ inflation", "Canopy/equipment and embarkation", "Service date, HRU expiry, securing and LSA record"],
    monitor: ["Container/cradle, lashing, HRU orientation/expiry, weak link, painter connection ve launching path'i kontrol et.", "Embarkation ladder/MES/lighting ve assigned capacity/location'ı muster plan ile uyumlu tut."],
    verify: ["Label serial/capacity/service date ve certificate'i fiziksel raft ile karşılaştır.", "Securing arrangement'ı maker installation drawing ile doğrula; raft'ı test için açma."],
    stop: ["Yanlış painter/weak-link bağlantısı, expired service/HRU veya obstructed float-free path'te raft'ı serviceable sayma.", "Container'ı gemiye doğrudan zincir/halatla ek bağlayıp HRU işlevini iptal etme."],
    searchTerms: ["liferaft", "HRU", "weak link", "painter", "float free"],
  }),
  "gmdss-lsa/10": seed({
    purpose: "Denize adam düşmesi ve SAR görevlerinde kişiyi süratle kurtarmak; FRB'de hızlı launch/recovery ve yüksek manevra kabiliyeti sağlamak.",
    boundary: "Rescue boat, lifeboat ve FRB şartları aynı değildir; crew competence, PPE, painter, release ve davit working load/motion limitleri gemiye özgüdür.",
    flow: ["Assigned crew/PPE and readiness", "Davit/winch/falls", "Release/painter and launch", "Engine, steering and recovery gear", "Drill, weekly/monthly check and authorized service"],
    monitor: ["Engine/fuel/battery, steering, communications, recovery strop, hooks, davit/brake ve boat equipment'i kontrol et.", "Launch/recovery'de ship speed/lee, sea state, propeller hazard, hook load ve crew condition'ı dedicated commander izler."],
    verify: ["Pre-use function ve equipment inventory'yi checklist/LSA plan ile fiziksel doğrula.", "Davit/release annual ve 5-year service records'ını authorized provider şartlarıyla karşılaştır."],
    stop: ["Hook/fall/brake uncertainty, engine/steering failure, person in fall zone veya lost communication'da operasyonu durdur.", "FRB'yi training/launch limitleri dışında yalnız hız hedefiyle riske atma; Kaptan SAR planı belirler."],
    searchTerms: ["rescue boat", "fast rescue boat", "FRB", "launch recovery", "MOB"],
  }),
};

const sharedTopicAliases: Record<string, string> = {
  "cargo-systems/3": "deck-machinery/3",
  "cargo-systems/7": "deck-machinery/1",
  "environmental-auxiliary/1": "auxiliary/7",
  "environmental-auxiliary/2": "auxiliary/8",
  "environmental-auxiliary/3": "auxiliary/6",
  "environmental-auxiliary/6": "auxiliary/10",
};

function resolveSeed(key: string): TopicSeed | undefined {
  return topicSeeds[key] ?? topicSeeds[sharedTopicAliases[key]];
}

export function hasProfessionalSystemGuide(sectionId: string, topicIndex: number): boolean {
  return Boolean(resolveSeed(`${sectionId}/${topicIndex}`) && categoryProfiles[sectionId]);
}

export function getProfessionalSystemGuide(
  sectionId: string,
  topicIndex: number,
  topicTitle: string,
): ProfessionalSystemGuide {
  const key = `${sectionId}/${topicIndex}`;
  const profile = categoryProfiles[sectionId];
  const topic = resolveSeed(key);

  if (!profile || !topic) {
    throw new Error(`Eksik profesyonel gemi sistemi rehberi: ${key} (${topicTitle})`);
  }

  return {
    purpose: topic.purpose,
    boundary: topic.boundary,
    responsibleRole: profile.responsibleRole,
    flow: topic.flow.map((detail, index) => ({ label: stageLabels[index], detail })) as ProfessionalSystemGuide["flow"],
    prepare: [...profile.prepare, ...(topic.prepare ?? [])],
    monitor: topic.monitor,
    verify: topic.verify,
    stopAndEscalate: topic.stop,
    records: [...profile.records, ...(topic.records ?? [])],
    references: [...profile.references, ...(topic.references ?? [])],
    photoCaption: topic.photoCaption,
    searchTerms: [topicTitle, ...(topic.searchTerms ?? [])],
  };
}

export const professionalGuideKeys = Object.freeze(
  Object.keys(topicSeeds).concat(Object.keys(sharedTopicAliases)).sort(),
);
