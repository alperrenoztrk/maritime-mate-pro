import type { RegulationItem } from "./types";

export const imoConventions: RegulationItem[] = [
  {
    slug: "solas",
    label: "SOLAS – Denizde Can Emniyeti",
    category: "IMO Sözleşmeleri",
    overview:
      "Uluslararası deniz taşımacılığında can emniyeti için temel gereklilikleri belirler; gemi inşası, teçhizat, operasyon ve sertifikasyon standartlarını kapsar. İlk versiyonu 1914'te Titanic faciası sonrasında kabul edilen SOLAS, denizcilik tarihinin en önemli sözleşmesidir ve sürekli güncellenmektedir.",
    history:
      "SOLAS'ın kökeni 1912 Titanic felaketine dayanır. İlk SOLAS sözleşmesi 1914'te kabul edilmiş, ancak I. Dünya Savaşı nedeniyle yürürlüğe girememiştir. 1929 ve 1948 versiyonlarının ardından 1960'ta IMO bünyesinde kapsamlı bir revizyon yapılmıştır. Günümüzde yürürlükte olan 1974 SOLAS Sözleşmesi, 'tacit acceptance' (zımni kabul) prosedürüyle sürekli güncellenmektedir. 2024 konsolide baskısı 14 bölüm ve çok sayıda kodu kapsamaktadır.",
    applicability: [
      "Uluslararası sefer yapan 500 GT ve üzeri yük gemileri",
      "Tüm yolcu gemileri (uluslararası sefer)",
      "Bayrak devleti tarafından belirlenmiş kısa uluslararası seferdeki gemiler",
      "Savaş gemileri, ahşap gemiler, ilkel yapılı gemiler ve 500 GT altı yük gemileri hariç tutulur",
      "Bazı bölümler (örn. Chapter V) boyut sınırı olmaksızın tüm gemilere uygulanır",
    ],
    essentials: [
      "Gemi yapısı, bölmeleme ve stabilite (Chapter II-1)",
      "Yangın güvenliği, algılama ve söndürme (Chapter II-2)",
      "Can kurtarma araçları ve düzenlemeleri (Chapter III)",
      "Radyo haberleşme ve GMDSS (Chapter IV)",
      "Seyir emniyeti teçhizatı ve köprüüstü prosedürleri (Chapter V)",
      "Tehlikeli yük taşımacılığı (Chapter VII)",
      "ISM Code – Emniyet yönetim sistemi (Chapter IX)",
      "ISPS Code – Güvenlik önlemleri (Chapter XI-2)",
      "Kutup suları için ek gereklilikler (Chapter XIV – Polar Code)",
    ],
    actions: [
      "Yıllık, ara ve yenileme survey'lerini zamanında tamamla",
      "SOLAS sertifikalarını güncel tut ve gemide bulundur",
      "Mürettebat eğitim ve tatbikatlarını düzenli yap (yangın, terk gemi, adam denize)",
      "Teçhizat bakım kayıtlarını düzenli tut",
      "Su geçirmez kapı, yangın kapısı ve acil durum jeneratörü testlerini periyodik yap",
      "SOLAS değişikliklerini (MSC sirküler) takip et ve uygula",
      "Klas kuruluşu ile survey koordinasyonunu planla",
    ],
    amendments: [
      { year: "2000", description: "Hasar stabilite hesaplamalarında probabilistik yöntemin kabulü (Chapter II-1)" },
      { year: "2002", description: "ISPS Code eklenmesi – Chapter XI-2 olarak gemi ve liman güvenliği" },
      { year: "2006", description: "LRIT (Long Range Identification and Tracking) zorunluluğu" },
      { year: "2010", description: "Goal-Based Standards (GBS) – performans tabanlı gemi inşa standartları" },
      { year: "2012", description: "Safe Return to Port (SRtP) gereklilikleri yolcu gemileri için" },
      { year: "2014", description: "Chapter XIV – Polar Code eklenmesi (2017 yürürlük)" },
      { year: "2016", description: "Konteyner ağırlık doğrulaması (VGM) zorunluluğu" },
      { year: "2020", description: "ECDIS zorunluluğunun tüm gemilere genişletilmesi" },
      { year: "2024", description: "Deniz güvenliği için siber güvenlik gereklilikleri (ISM Code entegrasyonu)" },
    ],
    keyArticles: [
      { id: "Chapter I", title: "Genel Hükümler", summary: "Uygulama kapsamı, tanımlar, survey ve sertifikasyon çerçevesi, bayrak devleti ve liman devleti kontrol mekanizmaları." },
      { id: "Chapter II-1", title: "Yapı – Bölmeleme ve Stabilite", summary: "Hasar bölmeleme, su geçirmezlik, stabilite kriterleri, makine ve elektrik tesisleri güvenliği." },
      { id: "Chapter II-2", title: "Yangın Güvenliği", summary: "Yangın önleme, algılama, söndürme sistemleri ve kaçış yolları tasarımı." },
      { id: "Chapter III", title: "Can Kurtarma Araçları", summary: "Can filikaları, sallar, kişisel teçhizat, indirme düzenekleri ve tatbikat gereklilikleri." },
      { id: "Chapter IV", title: "Telsiz Haberleşme", summary: "GMDSS ekipman gereklilikleri, sea area kapsamları ve acil durum haberleşmesi." },
      { id: "Chapter V", title: "Seyir Emniyeti", summary: "Zorunlu teçhizat (AIS, VDR, ECDIS), seyir planlaması, kaptan yetkileri ve meteorolojik uyarılar." },
      { id: "Chapter VI", title: "Yük Taşımacılığı", summary: "Dökme katı ve tahıl yüklerinin güvenli taşınması, istif ve bağlama gereklilikleri." },
      { id: "Chapter VII", title: "Tehlikeli Yükler", summary: "IMDG Code, IBC Code, IGC Code ve INF Code kapsamındaki tehlikeli yük taşımacılığı kuralları." },
      { id: "Chapter IX", title: "ISM Code", summary: "Güvenli işletme yönetim sistemi, SMS oluşturma, iç denetim ve sürekli iyileştirme." },
      { id: "Chapter X", title: "Yüksek Hızlı Gemiler", summary: "HSC Code kapsamında yüksek hızlı hafif tonajlı gemilerin güvenlik standartları." },
      { id: "Chapter XI-1", title: "Deniz Emniyeti İyileştirme Önlemleri", summary: "RO denetimi, ESP, CSR, gemi tanımlama numarası (IMO numarası) gereklilikleri." },
      { id: "Chapter XI-2", title: "ISPS Code", summary: "Gemi ve liman tesisi güvenlik değerlendirmesi, güvenlik planları ve güvenlik seviyeleri." },
      { id: "Chapter XII", title: "Dökme Yük Gemileri", summary: "150 m üzeri dökme yük gemileri için ek yapısal gereklilikler, ambar su geçirmezliği ve alarm sistemleri." },
      { id: "Chapter XIV", title: "Polar Code", summary: "Kutup sularında seyreden gemiler için ek emniyet ve çevre koruma gereklilikleri." },
    ],
    penalties: [
      "Sertifika eksikliği veya geçersizliği durumunda geminin alıkonması (detention)",
      "Ciddi emniyet eksikliklerinde seferin yasaklanması",
      "Bayrak devleti tarafından sertifika iptali veya askıya alınması",
      "PSC denetimlerinde tekrar eden eksikliklerde 'ban' listesine alınma riski",
      "Deniz kazası soruşturmalarında SOLAS ihlalinin tespiti halinde cezai ve hukuki sorumluluk",
    ],
    detailedSections: [
      {
        heading: "Sözleşmenin amacı ve genel mantığı",
        body:
          "SOLAS, denizde insan hayatını korumayı tek amaç edinen ve bunu 'asgari standart' mantığıyla kuran şemsiye bir sözleşmedir. Temel felsefesi, bir geminin tasarımından söküme kadar geçen tüm yaşam döngüsünde belirli emniyet eşiklerinin sürekli sağlanmasıdır. Bayrak devleti bu standartları kendi mevzuatına aktarır, klas kuruluşları (RO) adına sörvey yapar ve liman devleti kontrolü (PSC) bağımsız bir denetim katmanı olarak gemiye gelir. Bu üçlü yapı sayesinde tek bir denetim noktasına bağımlı kalınmaz; emniyet zincirinin her halkası diğerini denetler. SOLAS'ın bir diğer ayırt edici yönü 'zımni kabul' mekanizmasıdır: değişiklikler belirli bir tarihte itiraz edilmedikçe otomatik yürürlüğe girer, böylece sözleşme teknolojiyle birlikte güncel kalır.",
      },
      {
        heading: "Yapısal ve teknik emniyet (Chapter II-1 ve II-2)",
        body:
          "Sözleşmenin teknik omurgasını iki bölüm oluşturur. Chapter II-1, geminin su altı bütünlüğünü konu alır: bölmeleme yoluyla bir veya daha fazla kompartıman su aldığında geminin yüzer kalmasını sağlayan hasar stabilitesi, su geçirmez perdeler, çift dip ve makine/elektrik tesislerinin güvenliği bu kapsamdadır. 2009 sonrası gemilerde olasılık temelli (probabilistik) hasar stabilitesi yöntemi esas alınır. Chapter II-2 ise yangını üç aşamada ele alır: önleme (yanmaz/geç tutuşan malzemeler, sınırlandırma bölgeleri), algılama (duman/ısı dedektörleri, manuel alarm) ve söndürme (sabit CO₂/köpük/su sisi sistemleri, yangın devreleri). Kaçış yollarının tasarımı, yangın kapıları ve havalandırmanın acil durdurulması da bu bölümün konularıdır.",
      },
      {
        heading: "Can kurtarma, haberleşme ve seyir (Chapter III-IV-V)",
        body:
          "Chapter III, kazadan sonra hayatta kalmayı düzenler: can filikaları ve sallarının sayısı/kapasitesi, indirme düzenekleri, kişisel koruyucu teçhizat (can yeleği, immersion suit) ve bunların tatbikatlarla işler tutulması. Chapter IV, GMDSS mimarisini kurar; gemiye, seyrettiği deniz alanına (A1-A4) göre değişen telsiz ekipmanı zorunluluğu getirir ve tehlike çağrılarının her koşulda iletilmesini garanti eder. Chapter V ise tüm gemilere boyut sınırı olmaksızın uygulanan seyir emniyeti bölümüdür: AIS, VDR, ECDIS gibi zorunlu cihazlar, sefer planlaması, gözcü tutma, meteorolojik uyarıların alınması ve kaptanın emniyet kararlarındaki nihai yetkisi burada tanımlanır.",
      },
      {
        heading: "Yönetim, güvenlik ve özel rejimler (Chapter IX, XI, XIV)",
        body:
          "SOLAS yalnızca donanım değil, organizasyonu da düzenler. Chapter IX, ISM Code'u zorunlu kılarak her şirketin yazılı bir Emniyet Yönetim Sistemi (SMS) kurmasını, risk değerlendirmesi yapmasını ve sürekli iyileştirmeyi belgelendirmesini ister. Chapter XI-1 deniz emniyetini iyileştiren ek önlemleri (IMO numarası, CSR, ESP) içerirken XI-2 ISPS Code ile gemi/liman güvenliğini ve güvenlik seviyelerini düzenler. Polar Code'u zorunlu kılan Chapter XIV, kutup sularında buz, düşük sıcaklık ve uzaklık kaynaklı ek riskleri ele alır. Pratikte bir gemi adamı için SOLAS, ayrı ayrı ezberlenecek kurallar yığını değil; sörvey takvimi, sertifika geçerliliği, tatbikat döngüsü ve ekipman bakımıyla günlük operasyona gömülmüş yaşayan bir çerçevedir.",
      },
      {
        heading: "Chapter I – Sörvey, sertifikasyon ve zımni kabul",
        body:
          "SOLAS'ın birinci bölümü, tüm sözleşmenin işletim sistemidir. Geminin uyumunu kanıtlayan sertifikaları (Passenger Ship Safety Certificate; kargo gemileri için Safety Construction, Safety Equipment ve Safety Radio sertifikaları) ve bunları doğrulayan sörvey türlerini tanımlar: ilk (initial), yıllık (annual), ara (intermediate), periyodik (periodical) ve yenileme (renewal). Uyumlaştırılmış Sörvey ve Sertifikasyon Sistemi (HSSC), farklı sözleşmelerin sörveylerini ortak bir beş yıllık takvimde ve pencerelerde (±3 ay) toplar, böylece gemi tek ziyarette çoklu sörvey görebilir. Bölüm ayrıca bayrak devleti ile liman devleti kontrolünün yetkilerini, klas kuruluşlarının (RO) bayrak adına nasıl çalışacağını ve sertifikaların geçerlilik/onay koşullarını belirler. Sözleşmenin teknolojiyle güncel kalmasını sağlayan 'zımni kabul' (tacit acceptance) mekanizması da buraya dayanır: kabul edilen bir değişiklik, belirlenen tarihe kadar yeterli sayıda taraf devlet itiraz etmedikçe otomatik yürürlüğe girer.",
      },
      {
        heading: "Chapter II-1 – Bölmeleme, hasar stabilitesi ve makine emniyeti (derinlemesine)",
        body:
          "II-1, geminin su altı bütünlüğünü çok katmanlı biçimde güvence altına alır. Bölmeleme (subdivision) ilkesi gemiyi su geçirmez perdelerle kompartımanlara böler; amaç, bir veya daha fazla bölme su aldığında geminin yüzer ve dengede kalmasıdır. 2009 sonrası yolcu ve kargo gemilerinde, hasar senaryolarını olasılıklarıyla birlikte değerlendiren probabilistik hasar stabilite yöntemi (gerekli A indeksi ≥ ulaşılan A indeksi) esas alınır. Bölüm; su geçirmez kapıların tipini ve kapanma sürelerini, çift dip (double bottom) gerekliliklerini, hasar kontrol planlarını ve sintine/balast pompalama düzenlerini kapsar. Makine ve elektrik tarafında ise ana ve yardımcı makinelerin, acil güç kaynaklarının (emergency generator), dümen donanımının (steering gear – ana ve yardımcı sistem, test gereklilikleri) ve dümen kontrolünün yedekliliğini düzenler; amaç tek bir arızanın gemiyi yönetilemez hale getirmemesidir.",
      },
      {
        heading: "Chapter II-2 – Yangın güvenliği (derinlemesine)",
        body:
          "II-2, yangını üç stratejiyle ele alır: önleme, sınırlama ve söndürme. Önleme; yanıcı malzemelerin kısıtlanması, yakıt/yağ sistemlerinin güvenli tasarımı ve tutuşma kaynaklarının kontrolüyle sağlanır. Sınırlama, gemiyi A ve B sınıfı yangın bölmeleriyle (A-60'tan A-0'a kadar farklı dayanım süreleri) ana dikey bölgelere ayırarak bir mahaldeki yangının komşu mahallere geçmesini geciktirir; yangın kapıları, damperler ve havalandırmanın acil durdurulması bu sistemi tamamlar. Algılama; duman ve ısı dedektörleri, manuel alarm noktaları ve köprüüstündeki merkezi panellerle yangının yerini anında belirler. Söndürme ise mahalle göre değişir: makine dairesi için sabit CO₂/köpük/su sisi, yaşam mahalleri için sprinkler, güverte için köpük monitörleri. Bölüm ayrıca kaçış yollarının tasarımını, acil aydınlatmayı, itfaiyeci teçhizatını (SCBA, EEBD) ve tankerlere özgü ek önlemleri (inert gaz, köpük) düzenler.",
      },
      {
        heading: "Chapter III – Can kurtarma ve tatbikat düzeni (derinlemesine)",
        body:
          "III, kazadan sonra hayatta kalmayı hem donanım hem organizasyon olarak düzenler. Donanım tarafında survival craft (tamamen kapalı, serbest düşüşlü filikalar, can salları), kurtarma botu (rescue boat), indirme düzenekleri (davit) ve kişisel teçhizat (can yeleği, immersion suit, TPA) sayı ve performans olarak belirlenir; yolcu gemilerinde hızlı tahliye için Marine Evacuation System (MES) öngörülür. Organizasyon tarafında ise her geminin bir muster list (yangın yeri cetveli) bulundurması, her mürettebat üyesinin acil durumdaki görevini bilmesi ve toplanma istasyonlarının işaretlenmesi zorunludur. Tatbikatlar bu bölümün kalbidir: terk gemi (abandon ship) ve yangın tatbikatları düzenli aralıklarla, can filikalarının suya indirilmesi belirli periyotlarla yapılır ve kaydedilir; yeni katılan personele familiarization eğitimi verilir. Teknik standartların ayrıntısı LSA Code'a bırakılır.",
      },
      {
        heading: "Chapter IV ve V – GMDSS ve seyir emniyeti (derinlemesine)",
        body:
          "Chapter IV, Küresel Deniz Tehlike ve Emniyet Sistemini (GMDSS) kurar ve donanımı geminin seyrettiği deniz alanına göre belirler: kıyıya yakın A1 (VHF DSC), A2 (MF ilave), A3 (HF veya uydu/Inmarsat), açık okyanus A4 (HF DSC zorunlu). Amaç, tehlike çağrısının her konumdan otomatik ulaşmasıdır; EPIRB, SART, NAVTEX ve yedeklilik gereklilikleri bunu destekler. Chapter V ise boyut sınırı olmaksızın neredeyse tüm gemilere uygulanan seyir emniyeti bölümüdür ve modern köprüüstünün omurgasını tanımlar: zorunlu ECDIS, AIS, VDR/S-VDR, BNWAS (vardiya uyarı sistemi), jiropusula ve radar; sefer planlamasının dört aşaması (appraisal, planning, execution, monitoring); gözcü tutma; meteorolojik ve seyir uyarılarının (NAVTEX, MSI) alınması; LRIT ile uzun menzilli takip; buzdan kaçınma ve tehlike bildirimi; ve kaptanın emniyet kararlarındaki nihai yetkisinin (hiçbir ticari baskının bunu sınırlayamayacağı) açıkça korunması.",
      },
      {
        heading: "Chapter VI–VII – Yük ve tehlikeli madde taşımacılığı (derinlemesine)",
        body:
          "Chapter VI, dökme katı ve diğer yüklerin güvenli taşınmasını düzenler ve IMSBC Code ile Grain Code'a bağlanır; istif, trimming, yük bilgi formu ve özellikle konteyner yüklerinde doğrulanmış brüt ağırlık (VGM – Verified Gross Mass) zorunluluğu bu bölümden gelir. VGM, yanlış beyan edilen konteyner ağırlıklarının yol açtığı istif çökmesi ve gemi stabilite sorunlarını önlemeyi amaçlar. Chapter VII, ambalajlı ve dökme tehlikeli yükleri kapsar ve dört temel koda köprü kurar: ambalajlı tehlikeli maddeler için IMDG Code, dökme kimyasallar için IBC Code, sıvılaştırılmış gazlar için IGC Code ve ışınlanmış nükleer yakıt için INF Code. Bu sayede SOLAS, tehlikeli yükün sınıflandırılmasından ambalajlanmasına, ayrımına (segregation) ve acil müdahale bilgisine kadar tüm zinciri ilgili uzman koda yönlendirir; gemi ise yükün tipine göre hangi kodun geçerli olduğunu bilmek ve uygulamakla yükümlüdür.",
      },
      {
        heading: "Chapter XI-1 / XI-2 – Emniyet ve güvenlik ek önlemleri (derinlemesine)",
        body:
          "Chapter XI, 11 Eylül sonrası ikiye ayrılmıştır. XI-1 deniz emniyetini güçlendiren önlemleri içerir: geminin ömür boyu değişmeyen IMO numarası (kimlik), gemi-bayrak-klas geçmişini gösteren Continuous Synopsis Record (CSR), tanker ve dökme yük gemilerinde zorunlu Enhanced Survey Programme (ESP) ve klas kuruluşlarının yetkilendirilmesine ilişkin gereklilikler. XI-2 ise ISPS Code'u zorunlu kılarak güvenliği (security) düzenler: gemi güvenlik değerlendirmesi (SSA), gemi güvenlik planı (SSP), atanmış sorumlular (SSO, CSO, PFSO), gizli güvenlik alarm sistemi (SSAS) ve üç kademeli güvenlik seviyesi sistemi. Bu bölüm, gemiyi yalnızca kazalara karşı değil kasıtlı saldırılara karşı da korur ve liman tesisleriyle birlikte bütünleşik bir güvenlik arayüzü kurar; güvenlik seviyesi değişimlerinde gemi planında tanımlı önlemleri anında devreye almak zorundadır.",
      },
      {
        heading: "Chapter XII ve XIV – Dökme yük gemileri ve kutup suları",
        body:
          "Chapter XII, denizdeki en yüksek kayıp oranına sahip gemi tiplerinden biri olan dökme yük gemilerine özel ek gereklilikler getirir: 150 m üzeri gemilerde bir ambarın su alması durumunda hayatta kalmayı sağlayan güçlendirilmiş perde ve çift cidar yapıları, her ambarda su seviyesi algılama ve alarm sistemleri ile yapısal dayanım kriterleri. Bu kurallar, Derbyshire gibi gemilerin uyarı bile veremeden batmasının ardından geliştirilmiştir. Chapter XIV ise kutup sularında seyreden gemiler için Polar Code'u zorunlu kılar; buz yükü, aşırı düşük sıcaklık, karanlık dönemler, sınırlı haberleşme ve uzak SAR kapsamı gibi ek riskleri hedefleyen yapısal, donanımsal ve operasyonel gereklilikleri içerir. Bu iki bölüm, SOLAS'ın 'tek beden herkese uyar' yaklaşımından çıkıp belirli gemi tipleri ve seyir bölgeleri için özelleşmiş rejimler kurabildiğini gösterir.",
      },
      {
        heading: "Modern eklentiler: GBS, Safe Return to Port, siber güvenlik",
        body:
          "SOLAS, zımni kabul mekanizması sayesinde sürekli evrilir ve son yıllarda klasik donanım kurallarının ötesine geçen modern katmanlar kazanmıştır. Goal-Based Standards (GBS), yeni gemi inşa kurallarını ayrıntılı reçeteler yerine ulaşılması gereken hedef performanslara bağlar ve klas kurallarının bu hedeflere uygunluğunu denetler. Yolcu gemileri için Safe Return to Port (SRtP), belirli bir hasar veya yangından sonra geminin kendi gücüyle güvenli bir limana dönebilmesini ve temel sistemlerin çalışmaya devam etmesini şart koşar; böylece gemi 'kendi en iyi cankurtaran filikası' olarak tasarlanır. ISM Code ile entegre edilen siber güvenlik gereklilikleri ise dijital sistemlerin (ECDIS, otomasyon, haberleşme) tehditlere karşı risk yönetimini emniyet yönetiminin parçası haline getirir. Bu yüzden bir gemi yönetimi için SOLAS uyumu statik değildir: MSC sirkülerlerinin ve değişikliklerin sürekli takip edilip uygulanmasını gerektirir.",
      },
    ],
    relatedSlugs: ["ism-code", "isps-code", "lsa-code", "fss-code", "stcw", "colreg"],
    resources: [
      { label: "IMO SOLAS sayfası", href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Safety-of-Life-at-Sea-(SOLAS),-1974.aspx" },
    ],
  },
  {
    slug: "marpol",
    label: "MARPOL – Deniz Kirliliğinin Önlenmesi",
    category: "IMO Sözleşmeleri",
    overview:
      "Gemilerden kaynaklanan deniz kirliliğinin önlenmesi için uluslararası standartları belirler; altı ek ile petrol, kimyasal, atık, çöp, hava emisyonları düzenler. MARPOL 73/78, deniz çevre korumasının temel taşıdır.",
    history:
      "MARPOL'ün kökeni 1954 OILPOL sözleşmesine dayanır. 1967 Torrey Canyon kazasından sonra IMO kapsamlı bir kirlilik önleme sözleşmesi hazırlamaya başlamış, 1973'te kabul edilen sözleşme 1978 Protokolü ile birleştirilerek MARPOL 73/78 adını almıştır. 1997 Protokolü ile Ek VI (hava kirliliği) eklenmiştir. Günümüzde 6 ek ile gemilerden kaynaklanan tüm kirlilik türlerini kapsar.",
    applicability: [
      "Tüm uluslararası sefer yapan gemiler (boyut ve tip fark etmeksizin ilgili eklere tabi)",
      "Ek I: 150 GT üzeri tankerler ve 400 GT üzeri diğer gemiler",
      "Ek II: Zararlı sıvı madde taşıyan tüm gemiler",
      "Ek III: Ambalajlı zararlı madde taşıyan gemiler",
      "Ek IV: 400 GT üzeri gemiler veya 15'ten fazla yolcu taşıyan gemiler",
      "Ek V: Tüm gemiler",
      "Ek VI: 400 GT üzeri gemiler (EEXI/CII: 5000 GT üzeri)",
    ],
    essentials: [
      "Ek I: Petrol kirliliği – IOPP sertifikası, ORB, OWS (15 ppm), SOPEP, çift cidarlı tanker gerekliliği",
      "Ek II: Zararlı sıvı maddeler (NLS) – kategori sınıflandırması (X, Y, Z, OS), P&A Manual, Cargo Record Book",
      "Ek III: Ambalajlı zararlı maddeler – IMDG Code referanslı işaretleme ve belgelendirme",
      "Ek IV: Kanalizasyon – sewage treatment plant, deşarj kriterleri (kıyıdan 12 mil, 4 knot hız)",
      "Ek V: Çöp yönetimi – Garbage Record Book, Garbage Management Plan, deşarj yasak ve istisnaları",
      "Ek VI: Hava kirliliği – SOx limiti (%0.50 global, %0.10 ECA), NOx Tier I-II-III, EEXI, CII, SEEMP",
      "Özel Alanlar (Special Areas): Akdeniz, Baltık, Karadeniz, Kızıldeniz, Körfez bölgeleri için sıkı kurallar",
    ],
    actions: [
      "ORB Part I ve II, Cargo Record Book ve Garbage Record Book kayıtlarını eksiksiz tut",
      "IOPP ve IAPP sertifikalarını güncel tut",
      "Yakıt numuneleri ve BDN'leri minimum 3 yıl sakla",
      "SEEMP'i uygula ve CII performansını aylık izle",
      "OWS, bilge alarm, ODM ve EGCS sistemlerini periyodik test et",
      "Özel alan (Special Area) kurallarını rota planlamasına entegre et",
      "SOPEP tatbikatını yılda en az bir kez gerçekleştir ve kaydet",
    ],
    amendments: [
      { year: "1992", description: "Ek I revizyonu – çift cidarlı tanker gerekliliği (OPA 90 uyumlu)" },
      { year: "1997", description: "Ek VI eklenmesi – hava kirliliği, SOx/NOx limitleri" },
      { year: "2005", description: "Ek I ve II kapsamlı revizyonu – NLS kategorileri yeniden düzenlendi" },
      { year: "2011", description: "Ek VI – EEDI zorunluluğu (yeni gemi tasarım verimliliği)" },
      { year: "2013", description: "Ek V – Garbage Management Plan ve deşarj tablolarının güncellenmesi" },
      { year: "2017", description: "Ek III – ambalajlı tehlikeli madde taşımacılığı gerekliliklerinin güncellenmesi" },
      { year: "2020", description: "IMO 2020 – küresel kükürt limiti %0.50'ye düşürüldü" },
      { year: "2021", description: "EEXI ve CII zorunlulukları (2023 yürürlük) kabul edildi" },
      { year: "2023", description: "Ek VI – Mid-term GHG measures tartışmaları ve GHG Fuel Standard çerçevesi" },
    ],
    keyArticles: [
      { id: "Ek I", title: "Petrol Kirliliği", summary: "Petrol taşıyan ve diğer gemilerden petrolle kirliliğin önlenmesi; OWS, ODME, slop tank, çift cidar gereklilikleri." },
      { id: "Ek II", title: "Zararlı Sıvı Maddeler", summary: "NLS taşımacılığında tank yıkama, kalıntı deşarjı ve prewash gereklilikleri." },
      { id: "Ek III", title: "Ambalajlı Zararlı Maddeler", summary: "IMDG Code uyumlu paketleme, işaretleme, etiketleme ve belgelendirme gereklilikleri." },
      { id: "Ek IV", title: "Kanalizasyon", summary: "Gemiden kaynaklanan kanalizasyonun arıtılması ve deşarj koşulları." },
      { id: "Ek V", title: "Çöp Yönetimi", summary: "Gemi çöpünün sınıflandırılması, deşarj yasakları ve kayıt gereklilikleri." },
      { id: "Ek VI", title: "Hava Kirliliği", summary: "SOx, NOx, PM emisyon limitleri, EEXI, CII ve enerji verimliliği gereklilikleri." },
    ],
    penalties: [
      "Yasadışı deşarj tespitinde ağır para cezaları (ülkeye göre milyon dolarlara ulaşabilir)",
      "Gemi alıkonması ve sertifika askıya alınması",
      "ORB ve kayıtlarda sahtecilik tespitinde cezai kovuşturma",
      "ABD sularında ihlalde APPS (Act to Prevent Pollution from Ships) kapsamında hapis cezası",
      "Çevre kirliliği durumunda tazminat yükümlülüğü (CLC/FUND uygulaması)",
    ],
    detailedSections: [
      {
        heading: "Sözleşmenin yapısı: tek çatı, altı ek",
        body:
          "MARPOL'ü anlamanın anahtarı, onu tek bir kural seti değil, her biri farklı bir kirletici türünü hedefleyen altı ekin toplamı olarak görmektir. Ek I petrolü, Ek II zararlı sıvı kimyasalları, Ek III ambalajlı tehlikeli maddeleri, Ek IV kanalizasyonu, Ek V çöpü ve Ek VI hava emisyonlarını düzenler. Bir gemi tipine ve taşıdığı yüke göre bu eklerin bir kısmı veya tamamı uygulanır. Sözleşmenin ortak mantığı 'deşarj standardı' ile 'ekipman/kayıt zorunluluğu'nu birleştirmektir: ne kadarın, nereye, hangi koşulda boşaltılabileceği sayısal limitlerle tanımlanır; bunu sağlayan donanım (OWS, arıtma ünitesi, scrubber) ve bunu kanıtlayan kayıt defterleri (ORB, Garbage Record Book) zorunlu tutulur.",
      },
      {
        heading: "Ek I ve II: petrol ve kimyasal kirliliği",
        body:
          "Ek I, gemilerden petrol deşarjını sıkı koşullara bağlar: makine dairesi sintinesi yalnızca 15 ppm altında yağ içerecek şekilde yağ-su ayırıcıdan (OWS) geçirilerek basılabilir, kargo bölgesi deşarjları ise yük petrol kalıntısı izleme cihazı (ODME) ve slop tank düzeniyle kontrol edilir. Çift cidar gerekliliği, Exxon Valdez ve benzeri kazalardan sonra tankerlerin yapısal standardı haline gelmiştir. Ek II, dökme zararlı sıvıları (NLS) çevreye verdikleri zarara göre X, Y, Z ve OS kategorilerine ayırır; her kategori için tank yıkama, ön yıkama (prewash) ve kalıntı deşarj kuralları farklıdır. P&A Manual ve Cargo Record Book bu işlemlerin belgelendirilmesini sağlar.",
      },
      {
        heading: "Ek IV ve V: kanalizasyon ve çöp",
        body:
          "Ek IV, gemi kaynaklı kanalizasyonun (sewage) ancak onaylı bir arıtma tesisinden geçirilerek veya kıyıdan belirli mesafelerde ve asgari hızlarda boşaltılabilmesini düzenler. Ek V ise çöp konusunda 'kural istisna değil, deşarj istisnadır' yaklaşımını benimser: plastik her koşulda denize atılamaz, diğer çöp türleri ancak belirli mesafe ve işleme koşullarında boşaltılabilir. Her gemi bir Garbage Management Plan hazırlar, çöpü kategorilere ayırır ve tüm işlemleri Garbage Record Book'a kaydeder. Özel Alanlar'da (Akdeniz, Baltık, Karadeniz, Kızıldeniz, Körfez) kurallar daha da sıkıdır ve neredeyse tüm deşarjlar yasaktır.",
      },
      {
        heading: "Ek VI: hava kirliliği ve karbon boyutu",
        body:
          "Ek VI, MARPOL'ün son eklenen ve günümüzde en hızlı evrilen bölümüdür. Kükürt oksitleri (SOx) için küresel %0.50 ve Emisyon Kontrol Alanlarında (ECA) %0.10 yakıt kükürt limiti getirir; bu limit ya düşük kükürtlü yakıtla ya da egzoz gazı temizleme sistemiyle (scrubber) sağlanır. Azot oksitleri (NOx) için motor üretim yılına ve seyir bölgesine bağlı Tier I-II-III limitleri vardır. Ek VI ayrıca enerji verimliliği rejiminin de evidir: yeni gemiler için EEDI, mevcut gemiler için EEXI tasarım verimliliğini, CII ise yıllık operasyonel karbon yoğunluğunu ölçer; SEEMP bu performansın yönetim planıdır. Böylece Ek VI, klasik kirlilik kontrolünden sera gazı azaltımına uzanan bir köprü işlevi görür.",
      },
      {
        heading: "Ek I – Petrol kirliliği (derinlemesine)",
        body:
          "Ek I, MARPOL'ün en eski ve en ayrıntılı ekidir; petrolün hem makine dairesinden hem kargo bölgesinden denize karışmasını ayrı rejimlerle önler. Makine dairesi tarafında sintine suyu, ancak yağ-su ayırıcıdan (OWS) geçirilip yağ içeriği 15 ppm'in altına indirildikten sonra basılabilir; 15 ppm alarmı ve otomatik durdurma bunu güvence altına alır. Kargo bölgesinde ise tankerler için yük petrol deşarjını izleyen ODME (Oil Discharge Monitoring Equipment), kirli yıkama sularını toplayan slop tank düzeni ve ham petrol tankerlerinde tankı kendi yüküyle yıkayarak kalıntıyı azaltan Crude Oil Washing (COW) sistemleri öngörülür. Ayrılmış balast tankları (SBT) balast suyunun petrolle temas etmesini engeller. 1990'lardan sonra zorunlu kılınan çift cidar (double hull) yapısı, çarpışma ve karaya oturmalarda yük tankının yırtılma riskini azaltır. Tüm bu operasyonlar Yağ Kayıt Defterine (ORB Part I – makine, Part II – kargo) işlenir.",
      },
      {
        heading: "Ek II – Zararlı sıvı maddeler (derinlemesine)",
        body:
          "Ek II, dökme olarak taşınan zararlı sıvı maddeleri (NLS) çevreye verdikleri zarara göre dört kategoriye ayırır: X (en zararlı, deşarjı yasak), Y, Z ve OS (other substances – ihmal edilebilir zarar). Her kategori için tank yıkama, kalıntı deşarjı ve ön yıkama (prewash) kuralları farklıdır; bazı maddelerde tankın liman tesisine boşaltılması ve onaylı bir ön yıkamadan geçirilmesi zorunludur. Bu işlemlerin nasıl yapılacağı, geminin Procedures and Arrangements (P&A) Manual'inde tanımlanır ve her operasyon Cargo Record Book'a kaydedilir. Ek II, kimyasal tankerlerin emniyet tasarımını düzenleyen IBC Code ile iç içe çalışır: biri çevreyi (kirlilik), diğeri gemiyi ve mürettebatı (emniyet) korur; bu yüzden bir kimyasal tankerin uyumu her iki rejimi birden gerektirir.",
      },
      {
        heading: "Ek III, IV ve V – Ambalajlı maddeler, kanalizasyon ve çöp",
        body:
          "Ek III, denizi kirletici (marine pollutant) olarak işaretlenen ambalajlı zararlı maddelerin taşınmasını düzenler ve uygulamada IMDG Code'a bağlanır: doğru ambalajlama, işaretleme, etiketleme ve belgelendirme gereklilikleri buradan gelir. Ek IV, gemi kaynaklı kanalizasyonun (sewage) yönetimini ele alır; deşarj ancak onaylı bir arıtma tesisinden geçirilerek veya kıyıdan belirli mesafelerde ve asgari hızlarda (parçalanmış/dezenfekte edilmiş için daha yakın, ham için daha uzak) yapılabilir. Ek V, çöp konusunda 'deşarj istisnadır' yaklaşımını benimser: plastik hiçbir koşulda denize atılamaz, diğer çöp türleri yalnızca belirli mesafe ve işleme koşullarında boşaltılabilir. Her gemi bir Çöp Yönetim Planı (Garbage Management Plan) hazırlar, çöpü kategorilere ayırır ve tüm işlemleri Çöp Kayıt Defterine (Garbage Record Book) işler.",
      },
      {
        heading: "Ek VI – Hava kirliliği ve enerji verimliliği (derinlemesine)",
        body:
          "Ek VI, MARPOL'ün en hızlı evrilen bölümüdür ve birkaç ayrı rejimi barındırır. Kükürt oksitleri (SOx) için yakıt kükürt limiti küresel %0,50, Emisyon Kontrol Alanlarında (ECA/SECA) %0,10'dur; bu, düşük kükürtlü yakıtla veya egzoz gazı temizleme sistemiyle (scrubber) sağlanır. Azot oksitleri (NOx) için motorun üretim yılına ve seyir bölgesine bağlı Tier I-II-III limitleri vardır; Tier III yalnızca NECA bölgelerinde uygulanır. Bölüm ayrıca ozon tabakasını incelten maddelerin (ODS – halon, CFC) kontrolünü, ham petrol tankerleri için VOC yönetim planını ve onaylı gemi yakıcılarını (incinerator) düzenler. En önemlisi, enerji verimliliği rejiminin evidir: yeni gemiler için EEDI, mevcut gemiler için EEXI tasarım verimliliğini; CII yıllık operasyonel karbon yoğunluğunu ölçer; SEEMP ise bu performansın yönetim planıdır. Böylece Ek VI, klasik kirlilik kontrolünden sera gazı azaltımına uzanan bir köprü kurar.",
      },
      {
        heading: "Özel Alanlar ve emisyon kontrol bölgeleri",
        body:
          "MARPOL, bazı denizlerin ekolojik hassasiyeti veya kapalı yapısı nedeniyle daha sıkı korunmasını sağlamak için 'Özel Alanlar' (Special Areas) ve emisyon kontrol bölgeleri tanımlar. Petrol (Ek I), zararlı sıvılar (Ek II) ve çöp (Ek V) için Akdeniz, Baltık, Karadeniz, Kızıldeniz ve Körfez gibi alanlarda deşarj kuralları neredeyse sıfır toleransa kadar sıkılaşır. Hava kirliliği tarafında SOx Emisyon Kontrol Alanları (SECA/ECA – Baltık, Kuzey Denizi, Kuzey Amerika, ABD Karayip; Akdeniz 2028) yakıt kükürdünü, NOx Emisyon Kontrol Alanları (NECA) ise yeni motorların azot oksit emisyonunu sınırlar. Bu bölgesel katmanlar, gemilerin rota planlamasını doğrudan etkiler: gemi bir ECA'ya girerken yakıt değişimi (changeover) yapar ve bunu Yağ Kayıt Defterine işler. Özel alan kuralları, küresel kuralların üzerine eklenen ve ihmal edildiğinde ağır cezalara yol açan bir uyum katmanıdır.",
      },
      {
        heading: "Sörvey, sertifikalar ve denetim",
        body:
          "MARPOL uyumu bir dizi sertifikayla belgelenir ve sörveylerle doğrulanır: petrol için IOPP, zararlı sıvılar için NLS/ISPP, hava emisyonları için IAPP, kanalizasyon için ISPP (sewage) sertifikaları gemide bulundurulur ve beş yıllık döngüde yıllık/ara sörveylerle güncel tutulur. Uyumun en güçlü teminatı kayıt defterleridir: Yağ Kayıt Defteri, Cargo Record Book ve Garbage Record Book, denetimde ilk bakılan belgelerdir çünkü deşarjların nerede, ne zaman ve nasıl yapıldığını gösterir. Liman devleti kontrolünde MARPOL eksiklikleri sık görülür ve ciddi olanlar alıkoymaya yol açar. En ağır ihlaller ise donanım değil, kayıt sahteciliği ve bypass etrafında döner: yağ-su ayırıcıyı atlatan 'magic pipe' düzenekleri ve bunların ORB'de gizlenmesi, özellikle ABD'de APPS kapsamında milyonlarca dolar para ve hapis cezasıyla sonuçlanır; ihbarcı (whistleblower) programları bu ihlallerin ortaya çıkmasını teşvik eder.",
      },
    ],
    relatedSlugs: ["iopp-cert", "iapp-cert", "eexi", "cii", "imo-2020", "imo-dcs"],
    resources: [
      { label: "IMO MARPOL sayfası", href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Prevention-of-Pollution-from-Ships-(MARPOL).aspx" },
    ],
  },
  {
    slug: "stcw",
    label: "STCW – Gemi Adamları Eğitim Standardı",
    category: "IMO Sözleşmeleri",
    overview:
      "Gemi adamlarının eğitim, belgelendirme ve vardiya tutma standartlarını düzenler; yeterlilik sertifikaları, yenileme gereklilikleri ve dinlenme saatlerini kapsar.",
    history:
      "1978'de kabul edilen STCW, gemi adamları için uluslararası düzeyde asgari eğitim ve yeterlilik standartları belirleyen ilk sözleşmedir. 1995'teki kapsamlı revizyon ile STCW Code (Part A – zorunlu, Part B – tavsiye) yapısı oluşturulmuştur. 2010 Manila Değişiklikleri ile modern eğitim gereklilikleri, ECDIS eğitimi ve dinlenme saatleri kuralları güncellenmiştir.",
    applicability: [
      "Uluslararası sefer yapan deniz ticaret gemilerinde görev yapan tüm gemi adamları",
      "Kaptan, güverte zabitleri, makine zabitleri ve elektro-teknik zabitleri",
      "GMDSS operatörleri",
      "Tanker personeli (petrol, kimyasal, LNG/LPG)",
      "Yolcu gemisi personeli (crowd management, crisis management)",
      "Balıkçı gemileri STCW-F sözleşmesi kapsamındadır (ayrı)",
    ],
    essentials: [
      "Yeterlilik sertifikaları (CoC) ve onay belgeleri (endorsement) sistemi",
      "Zorunlu temel eğitimler: BST (Basic Safety Training) – STCW A-VI/1",
      "İleri eğitimler: ARPA, ECDIS, BRM (Bridge Resource Management)",
      "Tanker endorsement: petrol, kimyasal veya gaz tanker eğitimi",
      "Vardiya düzeni ve dinlenme saatleri (minimum 10 saat/24 saat, 77 saat/7 gün)",
      "Mürettebat kayıtları ve Safe Manning Document uyumu",
      "Yeterlilik yenileme: 5 yılda bir deniz hizmeti veya onaylı kurs",
      "Simülatör eğitimi gereklilikleri (ECDIS, ARPA, engine room simulator)",
    ],
    actions: [
      "Sertifika geçerlilik tarihlerini takip et ve yenileme planla",
      "Zorunlu eğitimleri zamanında tamamla",
      "Dinlenme saatlerini kaydet ve uyumu doğrula",
      "Safe Manning Document ile mürettebat sayısını eşleştir",
      "Tanker endorsement geçerliliklerini kontrol et",
      "Familiarization eğitimlerini gemi değişimlerinde uygula",
    ],
    amendments: [
      { year: "1995", description: "Kapsamlı revizyon – STCW Code (Part A/B) yapısının oluşturulması" },
      { year: "2010", description: "Manila Değişiklikleri – ECDIS eğitimi, ETO yeterliliği, dinlenme saatleri güncellemesi" },
      { year: "2015", description: "IGF Code kapsamında gaz yakıtlı gemi eğitimi eklenmesi" },
      { year: "2017", description: "Polar Code kapsamında kutup suları eğitim gereklilikleri" },
      { year: "2022", description: "EEXI/CII farkındalık eğitimi ve dijital yetkinlik tartışmaları" },
    ],
    keyArticles: [
      { id: "Chapter I", title: "Genel Hükümler", summary: "Tanımlar, sertifika tanınması, idari gereklilikler ve geçiş hükümleri." },
      { id: "Chapter II", title: "Kaptan ve Güverte Bölümü", summary: "Kaptan, baş zabit ve vardiya zabiti yeterlilik standartları, seyir ve kargo yönetimi yetkinlikleri." },
      { id: "Chapter III", title: "Makine Bölümü", summary: "Başmakinist, ikinci makinist ve vardiya mühendisi yeterlilik standartları." },
      { id: "Chapter III-A", title: "Elektro-Teknik Zabitleri", summary: "ETO (Electro-Technical Officer) yeterlilik ve eğitim gereklilikleri." },
      { id: "Chapter IV", title: "Telsiz Haberleşme", summary: "GMDSS operatör yeterlilikleri ve sertifikasyon." },
      { id: "Chapter V", title: "Özel Eğitim Gereklilikleri", summary: "Tanker, ro-ro, yolcu gemisi ve IGF Code kapsamındaki özel eğitimler." },
      { id: "Chapter VI", title: "Acil Durum ve Emniyet", summary: "BST, ileri yangın söndürme, tıbbi ilk yardım ve survival craft eğitimleri." },
      { id: "Chapter VII", title: "Alternatif Sertifikasyon", summary: "Bütünleşik güverte-makine yeterlilik sistemi gereklilikleri." },
      { id: "Chapter VIII", title: "Vardiya Tutma", summary: "Vardiya düzeni, dinlenme saatleri, fitness for duty ve alkol/uyuşturucu politikası." },
    ],
    penalties: [
      "Yetersiz veya geçersiz sertifika ile çalışma durumunda geminin alıkonması",
      "Dinlenme saati ihlallerinde bayrak devleti yaptırımları",
      "Sahte sertifika kullanımında cezai kovuşturma",
      "Kaza soruşturmalarında eğitim eksikliği tespitinde hukuki sorumluluk",
      "Safe Manning Document'e uymayan gemilerin sefere çıkışının engellenmesi",
    ],
    detailedSections: [
      {
        heading: "Neden gerekli: insan faktörü ve standardizasyon",
        body:
          "STCW, denizdeki kazaların büyük çoğunluğunun insan kaynaklı olduğu gerçeğinden doğmuştur. Sözleşme öncesinde her ülke kendi yeterlilik standardını uyguluyordu; bir ülkede geçerli olan kaptan belgesi başka bir bayrakta yetersiz sayılabiliyordu. STCW, gemi adamlarının eğitim, belgelendirme ve vardiya standartlarını uluslararası asgari bir tabana oturtarak bu kaosu çözer. Yapısı iki katmanlıdır: zorunlu hükümleri içeren Convention metni ve teknik ayrıntıları veren STCW Code. Code da kendi içinde bağlayıcı Part A ile tavsiye niteliğindeki Part B'ye ayrılır. Bu sayede 'yeterlilik' soyut bir kavram olmaktan çıkıp, ölçülebilir bilgi-beceri-tutum tablolarına (competence tables) indirgenir.",
      },
      {
        heading: "Sertifikasyon mimarisi ve eğitim basamakları",
        body:
          "Her gemi adamı, görevine uygun bir Yeterlilik Sertifikası (CoC) ve bunu tanıyan bayrak devletinin onay belgesini (endorsement) taşır. Temel taban herkes için Basic Safety Training'dir (yangın, can kurtarma, ilk yardım, kişisel güvenlik). Bunun üzerine göreve özgü eğitimler eklenir: köprüüstü zabitleri için ARPA, ECDIS ve Bridge Resource Management; makine zabitleri için makine dairesi simülatörü; tanker personeli için petrol/kimyasal/gaz endorsement'ı. Yolcu gemisi personeli kalabalık ve kriz yönetimi eğitimi alır. Yeterlilikler süreklilik gerektirir: tipik olarak beş yılda bir, ya yeterli deniz hizmeti ya da onaylı tazeleme kursuyla güncellenmesi gerekir.",
      },
      {
        heading: "Vardiya, dinlenme ve yorgunluk yönetimi",
        body:
          "STCW'nin Chapter VIII'i sadece kimin vardiya tutacağını değil, hangi koşulda tutacağını da düzenler. Yorgunluğun bir emniyet riski olduğu kabulüyle asgari dinlenme saatleri tanımlanır: 24 saatte en az 10 saat ve 7 günde en az 77 saat dinlenme. Bu saatler kayıt altına alınır ve PSC denetimlerinde sıkça kontrol edilir. 'Fitness for duty' ilkesi, alkol/uyuşturucu sınırlarını ve göreve hazır olma yükümlülüğünü kapsar. Vardiya devir-teslim prosedürleri, gözcü tutma ve köprüüstü/makine dairesi vardiya düzeni de bu bölümde tanımlanır; bu kurallar COLREG'in gözcülük gerekliliğiyle doğrudan örtüşür.",
      },
      {
        heading: "Gemi ve şirket için pratik yükümlülükler",
        body:
          "Sözleşme yalnızca bireyi değil, organizasyonu da bağlar. Gemi, bayrak devletinin verdiği Safe Manning Document'te belirtilen sayı ve nitelikte personelle donatılmalıdır; aksi halde sefere çıkamaz. Her yeni gemiye katılan personel için familiarization (tanıtım) eğitimi zorunludur, böylece kişi göreve başlamadan önce o geminin can kurtarma ve acil durum düzenini öğrenir. Şirket, sertifika geçerlilik tarihlerini, tanker endorsement sürelerini ve zorunlu kursların yenilenmesini takip eden bir sistem kurmak zorundadır. STCW bu yönüyle ISM Code ile iç içe geçer: yeterlilik yönetimi, emniyet yönetim sisteminin ayrılmaz bir parçasıdır.",
      },
      {
        heading: "Yeterlilik tabloları, fonksiyonlar ve seviyeler",
        body:
          "STCW Code'un teknik kalbi, yeterliliği ölçülebilir kılan competence (yeterlilik) tablolarıdır. Her görev için 'yeterlilik – bilgi/anlayış/beceri – gösterme yöntemi – değerlendirme kriteri' sütunlarından oluşan tablolar tanımlanır; böylece 'iyi bir vardiya zabiti' soyut bir nitelik olmaktan çıkıp, sayılabilir ve sınanabilir yetkinliklere indirgenir. Sözleşme görevleri yedi fonksiyona ayırır (seyir, yük elleçleme, gemi operasyonu/can güvenliği, makine, elektrik, bakım-onarım, telsiz) ve her fonksiyonu üç sorumluluk seviyesinde ele alır: operasyonel (vardiya zabiti), yönetim (kaptan/başmühendis ve birinci zabitler) ve destek (yardımcı personel – ratings). Bir kişinin sertifikası, hangi fonksiyonda hangi seviyede yetkin olduğunu gösterir; bu yapı, dünya genelinde tutarlı bir yeterlilik dili kurar.",
      },
      {
        heading: "Chapter II ve III – Güverte ve makine yeterlilikleri",
        body:
          "Chapter II, köprüüstü hiyerarşisinin yeterliliklerini basamak basamak tanımlar: vardiya zabiti (OOW) operasyonel seviyede seyir, yük ve gemi operasyonunu yürütebilmeli; birinci zabit ve kaptan ise yönetim seviyesinde sefer planlaması, stabilite, hasar kontrolü, hukuki yükümlülükler ve kriz yönetimini de kapsamalıdır. Chapter III makine bölümü için aynı mantığı uygular: vardiya mühendisi, ikinci mühendis ve başmühendis için makine operasyonu, elektrik/elektronik sistemler, bakım ve gemi sistemleri yönetimi yetkinlikleri tanımlanır. Ayrı bir kategori olan Elektro-Teknik Zabiti (ETO), modern gemilerin artan otomasyon ve elektronik karmaşıklığına yanıt olarak Manila değişiklikleriyle resmileştirilmiştir. Bu bölümler ayrıca her seviye için gereken asgari deniz hizmeti süresini ve onaylı eğitim/değerlendirme gerekliliklerini belirler.",
      },
      {
        heading: "Chapter V ve VI – Özel ve zorunlu emniyet eğitimleri",
        body:
          "Chapter V, belirli gemi tipleri için ek eğitimleri zorunlu kılar: tanker personeli için temel ve ileri petrol/kimyasal/gaz tanker eğitimleri (basic ve advanced training), gaz yakıtlı gemiler için IGF Code eğitimi, kutup sularında seyir için Polar Code eğitimi ve yolcu gemisi personeli için kalabalık yönetimi (crowd management) ile kriz yönetimi eğitimleri. Chapter VI ise tüm gemi adamları için ortak emniyet ve güvenlik eğitimlerini düzenler: Temel Emniyet Eğitimi (BST – yangın söndürme, kişisel hayatta kalma teknikleri, ilk yardım, kişisel güvenlik ve sosyal sorumluluk), survival craft ve rescue boat kullanımı (PSCRB), ileri yangın söndürme, tıbbi ilk yardım/tıbbi bakım ve ISPS kapsamındaki güvenlik farkındalığı ile atanmış güvenlik görevleri eğitimleri. Bu eğitimler, sertifikanın görünmeyen ama hayati tabanını oluşturur.",
      },
      {
        heading: "Chapter VIII – Vardiya, dinlenme ve göreve uygunluk",
        body:
          "Chapter VIII, yorgunluğu açık bir emniyet riski olarak ele alır ve hem köprüüstü hem makine vardiyalarının nasıl tutulacağını düzenler. Asgari dinlenme saatleri kesindir: 24 saatlik herhangi bir dilimde en az 10 saat ve 7 günlük herhangi bir dilimde en az 77 saat dinlenme; dinlenme en fazla iki parçaya bölünebilir ve bir parçası en az 6 saat olmalıdır. Bu saatler kayıt altına alınır ve liman devleti kontrolünde sıkça incelenir. 'Göreve uygunluk' (fitness for duty) ilkesi, alkol ve uyuşturucu politikasını da kapsar; STCW, vardiya görevlilerine standart bir azami kan alkol sınırı (0,05% BAC veya 0,25 mg/L soluk) getirir. Bölüm ayrıca vardiya devir-teslimini, gözcü tutmayı ve köprüüstü/makine dairesi vardiya düzenini tanımlar; bu kurallar COLREG'in gözcülük gereklilikleriyle ve geminin ISM emniyet yönetim sistemiyle doğrudan örtüşür.",
      },
      {
        heading: "Sertifika güvenilirliği: değerlendirme, yenileme ve denetim",
        body:
          "STCW'nin gücü, sertifikaların gerçekten güvenilir olmasından gelir; bu yüzden sözleşme yalnızca eğitimi değil, eğitimin kalite kontrolünü de düzenler. Yeterlilikler onaylı simülatör (ECDIS, ARPA, makine dairesi), gemide yapılandırılmış staj kayıtları (training record book) ve standartlaştırılmış değerlendirmelerle kanıtlanır. Sertifikalar süresizdir değil: tipik olarak beş yılda bir, yeterli deniz hizmeti veya onaylı tazeleme kursuyla yenilenmeleri (revalidation) gerekir; özellikle tanker endorsement ve emniyet eğitimleri belirli periyotlarla tazelenir. Sistemin bütünlüğünü korumak için IMO, gerekliliklere etkin biçimde uyan ülkeleri bir 'beyaz liste'de tutar; bir gemi adamının sertifikası ayrıca onu istihdam eden bayrağın onay belgesiyle (endorsement) tanınmalıdır. Sahte sertifika kullanımı ağır biçimde kovuşturulur ve liman devleti denetiminde sertifika/dinlenme kaydı uyumsuzlukları geminin alıkonmasına yol açabilir.",
      },
    ],
    relatedSlugs: ["solas", "ism-code", "colreg"],
    resources: [
      { label: "IMO STCW sayfası", href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-on-Standards-of-Training,-Certification-and-Watchkeeping-for-Seafarers-(STCW).aspx" },
    ],
  },
  {
    slug: "mlc",
    label: "MLC 2006 – Denizcilik Çalışma Sözleşmesi",
    category: "IMO Sözleşmeleri",
    overview:
      "ILO tarafından kabul edilen ve 'denizcilerin haklar bildirgesi' olarak anılan sözleşme; gemi adamlarının çalışma ve yaşam koşullarını, sözleşme hakları, ücret, çalışma saatleri, konaklama, sağlık ve sosyal güvenlik standartlarını kapsar.",
    history:
      "MLC 2006, ILO'nun 68 denizcilik sözleşmesini ve tavsiyesini tek bir çatı altında birleştirmek amacıyla 2006'da kabul edilmiştir. 2013'te yürürlüğe giren sözleşme, 'denizcilerin dördüncü sütunu' olarak SOLAS, MARPOL ve STCW ile birlikte denizcilik hukukunun temel taşlarından biri kabul edilir. 2014 ve 2016 değişiklikleri ile finansal güvence ve terk edilme koruması eklenmiştir.",
    applicability: [
      "500 GT ve üzeri uluslararası sefer yapan tüm ticari gemiler",
      "Bayrak devleti tarafından belirlenen koşullarda daha küçük gemiler",
      "Balıkçı gemileri kapsam dışı (ILO Work in Fishing Convention C188 kapsamında)",
      "Savaş gemileri ve devlet gemileri hariç",
    ],
    essentials: [
      "Çalışma sözleşmesi (SEA) ve ücret ödeme gereklilikleri – aylık ödeme, detaylı hesap belgesi",
      "Çalışma ve dinlenme saatleri (max. 14 saat/gün, 72 saat/hafta veya min. 10 saat dinlenme/gün)",
      "Konaklama, yemek ve rekreasyon standartları – kabin boyutu, havalandırma, aydınlatma",
      "Sağlık koruması, tıbbi bakım ve gemi içi hastane gereklilikleri",
      "Repatriation (geri dönüş) hakları ve finansal güvence",
      "Şikayet prosedürleri (on-board ve ashore)",
      "Sosyal güvenlik koruması",
      "İşe alma ve yerleştirme hizmetleri lisanslama gerekliliği",
    ],
    actions: [
      "MLC sertifikası ve DMLC'yi güncel tut",
      "Çalışma saatlerini kaydet ve limitlere uy",
      "Konaklama ve yemek standartlarını düzenli denetle",
      "Mürettebat şikayetlerini kaydet ve çöz",
      "Repatriation fonunu ve finansal güvence belgelerini hazır bulundur",
      "İşe alma ve yerleştirme hizmetlerinin ILO uyumunu doğrula",
    ],
    amendments: [
      { year: "2014", description: "Denizcilerin terk edilmesi durumunda finansal güvence zorunluluğu (Standart A2.5.2)" },
      { year: "2016", description: "Taciz ve zorbalık konusunda ek koruma hükümleri" },
      { year: "2018", description: "Sözleşme kapsamının genişletilmesi tartışmaları; kabin standartları revizyonu" },
      { year: "2022", description: "COVID-19 sonrası mürettebat değişimi ve tıbbi bakım erişimi düzenlemeleri" },
    ],
    keyArticles: [
      { id: "Title 1", title: "Asgari Gereklilikler", summary: "Asgari yaş (16), sağlık sertifikası, eğitim ve yeterlilik gereklilikleri." },
      { id: "Title 2", title: "Çalışma Koşulları", summary: "İstihdam sözleşmesi, ücret, çalışma saatleri, izin hakları ve repatriation." },
      { id: "Title 3", title: "Konaklama ve Yemek", summary: "Yaşam alanları, rekreasyon, yemek kalitesi ve hijyen standartları." },
      { id: "Title 4", title: "Sağlık ve Sosyal Güvenlik", summary: "Tıbbi bakım, iş güvenliği, kaza önleme ve sosyal güvenlik koruması." },
      { id: "Title 5", title: "Uyum ve Uygulama", summary: "Bayrak devleti ve liman devleti denetimi, sertifikasyon ve şikayet mekanizmaları." },
    ],
    penalties: [
      "MLC sertifikası eksik veya geçersiz gemilerin alıkonması",
      "Çalışma koşulları ihlallerinde bayrak devleti yaptırımları",
      "Ücret ödeme gecikmeleri ve sözleşme ihlallerinde tazminat yükümlülüğü",
      "Liman devleti PSC denetimlerinde MLC ihlallerinin raporlanması",
      "Denizcilerin terk edilmesi durumunda finansal güvence mekanizmasının devreye girmesi",
    ],
    detailedSections: [
      {
        heading: "Denizciliğin dördüncü sütunu",
        body:
          "MLC 2006, SOLAS, MARPOL ve STCW'nin yanına denizcilik hukukunun 'dördüncü sütunu' olarak yerleşir; çünkü öncekiler gemiyi ve mesleki yeterliliği düzenlerken MLC doğrudan gemi adamının insani çalışma ve yaşam koşullarını korur. ILO bünyesinde 68 ayrı sözleşme ve tavsiyeyi tek bir konsolide metinde birleştirir. Yapısı beş Title etrafında kurulur ve her Title, bağlayıcı Standard'lar (Part A) ile rehber Guideline'lardan (Part B) oluşur. Sözleşmenin gücü, bir gemiyi hem bayrak devleti denetimine hem de liman devleti kontrolüne tabi kılan 'no more favourable treatment' ilkesinden gelir: MLC'yi onaylamamış bir bayrağın gemisi bile MLC üyesi limanda denetlenir.",
      },
      {
        heading: "İstihdam, ücret ve çalışma süreleri",
        body:
          "Title 1 ve 2, istihdam ilişkisinin temelini düzenler. Her gemi adamı, görev ve ücret koşullarını net biçimde belirten yazılı bir Deniz İş Sözleşmesine (SEA) sahip olmalıdır; ücret düzenli (genellikle aylık) ödenmeli ve gemi adamına ayrıntılı hesap belgesi verilmelidir. Asgari yaş 16'dır ve gece çalışması ile tehlikeli işlerde daha sıkı sınırlar uygulanır. Çalışma/dinlenme saatleri ya azami çalışma (24 saatte 14, haftada 72 saat) ya da asgari dinlenme (24 saatte 10 saat) sınırıyla yönetilir. Bu sınırlar STCW'nin yorgunluk hükümleriyle uyumludur ve aynı kayıtlarla denetlenir.",
      },
      {
        heading: "Yaşam koşulları, sağlık ve geri dönüş hakkı",
        body:
          "Title 3 ve 4, geminin bir işyeri olduğu kadar bir yaşam alanı da olduğu gerçeğini düzenler. Kabin boyutları, havalandırma, aydınlatma, yemek kalitesi ve rekreasyon imkânları asgari standartlara bağlanır. Sağlık koruması; gemide tıbbi bakım, ilaç dolabı, gerektiğinde kıyıdan tıbbi danışma ve ciddi durumlarda tahliye düzenlemelerini kapsar. MLC'nin en güçlü hükümlerinden biri repatriation (geri dönüş) hakkıdır: gemi adamı, sözleşme bittiğinde veya terk edilme gibi durumlarda masrafsız biçimde ülkesine döndürülmek zorundadır. 2014 değişiklikleriyle bu hak, armatörün iflası halinde devreye giren zorunlu finansal güvence ile desteklenmiştir.",
      },
      {
        heading: "Uyum, denetim ve şikâyet mekanizması",
        body:
          "Title 5, sözleşmenin kâğıt üstünde kalmamasını sağlayan denetim mimarisini kurar. 500 GT ve üzeri uluslararası sefer gemileri, bayrak devletinin verdiği Maritime Labour Certificate ve şirketin uyum beyanını içeren DMLC (Bölüm I devlet gerekliliklerini, Bölüm II şirket önlemlerini gösterir) taşımak zorundadır. Gemi adamlarının hem gemide hem kıyıda işleyen, misilleme korumalı şikâyet prosedürlerine erişimi olmalıdır. Liman devleti kontrolünde MLC ihlalleri (ödenmemiş ücret, aşırı çalışma, kötü konaklama) eksiklik olarak kaydedilir ve ciddi durumlarda gemi alıkonabilir. Böylece MLC, gemi adamı haklarını soyut bir bildirge olmaktan çıkarıp denetlenebilir bir uyum sistemine dönüştürür.",
      },
      {
        heading: "Beş Title'ın derinlemesine yapısı",
        body:
          "MLC 2006, beş Title etrafında örgütlenir ve her biri denizcinin yaşamının farklı bir boyutunu güvence altına alır. Title 1, gemide çalışmanın asgari koşullarını belirler: asgari yaş (16, gece ve tehlikeli işlerde daha sıkı sınırlarla), geçerli sağlık sertifikası, mesleki eğitim ve düzenlenmiş işe alma/yerleştirme hizmetleri. Title 2, istihdam koşullarını kapsar: yazılı Deniz İş Sözleşmesi (SEA), düzenli ücret ödemesi, çalışma/dinlenme saatleri, izin hakkı ve geri dönüş (repatriation). Title 3, geminin bir yaşam alanı olduğu gerçeğini düzenler: kabin, havalandırma, aydınlatma, yemek ve rekreasyon standartları. Title 4, sağlık korumasını, tıbbi bakımı, iş güvenliğini ve sosyal güvenliği kapsar. Title 5 ise uyum ve uygulamayı (sertifikasyon, denetim, şikâyet mekanizmaları) düzenler. Her Title, bağlayıcı Standard'lar (Part A) ile rehber Guideline'lardan (Part B) oluşur.",
      },
      {
        heading: "Denetim, sertifikasyon ve şikâyet hakkı",
        body:
          "MLC'nin gücü, denetlenebilir olmasından gelir. 500 GT ve üzeri uluslararası sefer gemileri, bayrak devletinin verdiği Maritime Labour Certificate ve iki parçalı DMLC (Bölüm I devlet gerekliliklerini, Bölüm II şirket önlemlerini gösterir) taşımak zorundadır; bunlar beş yıl geçerlidir ve ara denetimden geçer. Sözleşmenin kapsamını güçlendiren ilke 'no more favourable treatment'tır: MLC'yi onaylamamış bir bayrağın gemisi bile MLC üyesi limanda denetlenir, böylece standart altı işletmeciler avantaj sağlayamaz. Denizciye doğrudan güç veren şikâyet mekanizmaları hem gemide hem kıyıda işler ve misillemeye karşı korunur; bir denizci, ödenmemiş ücret veya kötü koşulları liman devletine bildirerek bir denetimi tetikleyebilir. MLC, liman devleti kontrolünde en sık eksiklik bulunan alanlardan biridir ve ciddi ihlaller geminin alıkonmasına yol açar; 2014 değişiklikleriyle eklenen zorunlu finansal güvence, armatörün iflası veya denizcinin terk edilmesi durumunda devreye girer.",
      },
    ],
    relatedSlugs: ["mlc-cert", "dmlc", "psc"],
    resources: [
      { label: "ILO MLC 2006", href: "https://www.ilo.org/global/standards/maritime-labour-convention/lang--en/index.htm" },
    ],
  },
  {
    slug: "bwm",
    label: "BWM – Balast Suyu Yönetimi",
    category: "IMO Sözleşmeleri",
    overview:
      "Balast suyu ile taşınan zararlı organizmaların yayılmasını önlemek için arıtma ve yönetim standartlarını belirler; BWMS kurulumu ve işletme gerekliliklerini kapsar.",
    history:
      "Balast suyu ile istilacı türlerin yayılması 1980'lerden itibaren ciddi bir çevresel tehdit olarak tanımlanmıştır. IMO 2004'te BWM Sözleşmesini kabul etmiş, ancak yeterli sayıda onay sağlanamadığı için sözleşme ancak 2017'de yürürlüğe girmiştir. D-1 (değişim) standardından D-2 (arıtma) standardına geçiş süreci 2024'te büyük ölçüde tamamlanmıştır.",
    applicability: [
      "Balast suyu taşıyan tüm uluslararası sefer gemileri",
      "Yeni gemiler: inşa tarihinden itibaren D-2 standardı zorunlu",
      "Mevcut gemiler: IOPP yenileme survey'ine kadar geçiş süresi (çoğu 2024'e kadar tamamlandı)",
      "Kalıcı balast taşıyan gemiler ve bazı özel durumlar için istisna mevcuttur",
    ],
    essentials: [
      "D-1 standardı: açık denizde balast suyu değişimi (en az %95 hacim değişimi veya 3× pump-through)",
      "D-2 standardı: arıtılmış balast suyu deşarjı (< 10 canlı organizma/m³, > 50 μm boyutlu)",
      "BWMS tip onayı ve kurulum gereklilikleri (IMO MEPC onaylı sistem)",
      "Balast Suyu Kayıt Defteri (BWRB) tutma zorunluluğu",
      "Commissioning test ve yıllık survey gereklilikleri",
      "Balast Suyu Yönetim Planı (BWMP) hazırlama ve uygulama",
      "BWMS bakım: UV lamba ömrü, filtre temizliği, sensör kalibrasyonu",
      "ABD'de USCG ayrı tip onay standardı uygular (IMO onayı yeterli değildir)",
    ],
    actions: [
      "BWMS'yi düzenli olarak çalıştır ve bakımını yap",
      "BWRB kayıtlarını her balast operasyonunda tamamla",
      "UV lamba ve filtre değişimlerini zamanında yap",
      "Yıllık survey ve commissioning test'i planla",
      "Sediment yönetim prosedürlerini uygula",
      "ABD'ye uğrayan gemilerde USCG BWMS uyumunu ayrıca doğrula",
    ],
    amendments: [
      { year: "2017", description: "Sözleşme yürürlüğe girişi ve geçiş takviminin belirlenmesi" },
      { year: "2019", description: "Commissioning testing gerekliliği (BWM.2/Circ.70)" },
      { year: "2022", description: "Experience-Building Phase (EBP) veri toplama ve değerlendirme" },
      { year: "2024", description: "Mevcut gemilerin büyük çoğunluğu D-2 standardına geçiş tamamladı" },
    ],
    keyArticles: [
      { id: "Regulation B-3", title: "Balast Suyu Yönetimi", summary: "Gemilerin balast suyu yönetim planı gereklilikleri ve standartlara uyum takvimi." },
      { id: "Regulation D-1", title: "Balast Suyu Değişim Standardı", summary: "Açık denizde en az %95 hacim değişimi, kıyıdan 200 mil açıkta, 200 m derinlikte." },
      { id: "Regulation D-2", title: "Balast Suyu Performans Standardı", summary: "BWMS ile arıtma gereklilikleri: canlı organizma ve bakteri limitleri." },
      { id: "Regulation E-1", title: "Survey ve Sertifikasyon", summary: "İlk, yıllık, ara ve yenileme survey gereklilikleri." },
    ],
    penalties: [
      "BWMS çalışmıyor veya kurulu değilse geminin alıkonması",
      "BWRB kayıt eksikliğinde PSC eksikliği ve olası alıkonma",
      "D-2 standardına uyumsuzluk durumunda bayrak devleti yaptırımları",
      "ABD sularında USCG BWMS ihlalinde NANPCA/NISA kapsamında ceza",
    ],
    detailedSections: [
      {
        heading: "Sorun: balast suyuyla taşınan istilacı türler",
        body:
          "Gemiler dengelerini korumak için boş seyirde balast suyu alır, yük aldıklarında bu suyu basarlar. Ancak alınan suyla birlikte mikroskobik organizmalar, larvalar ve patojenler bir ekosistemden diğerine taşınır. Hedef bölgede doğal düşmanı olmayan bu türler hızla çoğalarak yerli yaşamı yok edebilir, balıkçılığı ve altyapıyı zarara uğratabilir. BWM Sözleşmesi, bu görünmez ama ciddi çevresel tehdidi yönetmek için kurulmuştur. Çözümün özü, balast suyunu deşarjdan önce ya değiştirmek ya da içindeki canlıları öldürecek/uzaklaştıracak şekilde arıtmaktır.",
      },
      {
        heading: "D-1 ve D-2 standartları arasındaki geçiş",
        body:
          "Sözleşme iki kademeli bir standart tanımlar. D-1, açık denizde balast suyu değişimini öngörür: kıyıdan en az 200 mil açıkta ve 200 m derinlikte, balast hacminin en az %95'i değiştirilir. Bu yöntem geçici ve kısmi bir çözümdür çünkü değişim her zaman tam etkili değildir ve hava koşullarına bağlıdır. D-2 ise kalıcı çözümdür: gemiye kurulan bir Balast Suyu Arıtma Sistemi (BWMS), deşarj edilen suda metreküp başına izin verilen canlı organizma sayısını çok düşük limitlere indirir. Filo, IOPP yenileme sörveyi takvimine bağlı olarak kademeli biçimde D-1'den D-2'ye geçmiştir ve bu geçiş büyük ölçüde tamamlanmıştır.",
      },
      {
        heading: "Arıtma teknolojisi ve operasyonel yükümlülükler",
        body:
          "BWMS'ler tipik olarak iki aşamalı çalışır: önce bir filtre büyük partikülleri ve organizmaları ayırır, ardından UV ışını veya elektroklorinasyon gibi bir dezenfeksiyon kademesi kalan canlıları etkisiz hale getirir. Sistemin IMO tip onayı taşıması, kurulumdan sonra commissioning testiyle doğrulanması ve yıllık sörveylerle izlenmesi gerekir. Mürettebat için bu, her balast operasyonunun Balast Suyu Kayıt Defterine işlenmesi, UV lambalarının ve filtrelerin zamanında değiştirilmesi, sensörlerin kalibre edilmesi ve sediment yönetimi anlamına gelir. Sistem arızalanırsa alternatif uyum yöntemleri ve raporlama prosedürleri devreye girer.",
      },
      {
        heading: "ABD ayrımı ve uyum riski",
        body:
          "BWM uyumunda en sık yapılan hata, IMO onayını yeterli sanmaktır. ABD sularına giren gemiler için USCG, IMO'dan bağımsız ve genellikle daha katı bir tip onay rejimi uygular; bir BWMS hem IMO hem USCG onaylı değilse ABD'de uyumsuz sayılabilir. Bu nedenle ABD'ye uğrayan gemiler her iki onayı da kontrol etmek zorundadır. Genel olarak BWMS'in kurulu olmaması, çalışmaması veya kayıt defterinin eksik olması PSC denetimlerinde alıkoymaya kadar varan sonuçlar doğurabilir. BWM böylece teknik bir kurulum işi olmaktan çıkıp sürekli işletme, bakım ve belgelendirme disiplinine dönüşür.",
      },
      {
        heading: "BWMS'in iç işleyişi ve commissioning testi (derinlemesine)",
        body:
          "D-2 standardını karşılayan bir Balast Suyu Arıtma Sistemi, tek bir cihaz değil, birbirini tamamlayan kademelerden oluşan bir üretim hattı gibi çalışır. İlk kademe genellikle bir mekanik filtrasyon ünitesidir; balast alınırken sudaki büyük partikülleri, sedimenti ve makroskobik organizmaları geri yıkanabilir bir elek üzerinden ayırır, böylece hem arıtma yükünü azaltır hem de sonraki kademenin verimini artırır. İkinci kademe dezenfeksiyondur ve üç ana teknolojiden biriyle uygulanır: UV ışınımı hücre DNA'sını bozarak organizmaların çoğalmasını engeller; elektroklorinasyon deniz suyundaki tuzu elektrolizle sodyum hipoklorite çevirip aktif klor üreterek dezenfekte eder; ozonlama ise güçlü bir oksidan olan ozon gazıyla hücre yapısını parçalar. Deşarj öncesi genellikle bir nötralizasyon adımı (klor bazlı sistemlerde) kalıntı oksidan seviyesini deşarj limitinin altına indirir. Sistemin kurulumdan sonra gerçekten D-2 performansını sağladığını kanıtlamak için commissioning testing yapılır: bağımsız bir örnekleme ekibi, gerçek balast operasyonu sırasında alım ve deşarj sularından numune alır ve canlı organizma sayımını (>50 μm ve 10-50 μm boyut sınıfları için) ile bakteri göstergelerini laboratuvarda doğrular. Bu test geçilmeden sertifika verilmez ve sistem D-2 uyumlu sayılmaz.",
      },
      {
        heading: "Mürettebatın operasyonel yükü ve sistem arızasında alternatif uyum",
        body:
          "BWMS'in gemiye kurulması, uyumu otomatikleştirmez; günlük operasyonel disiplin gerektirir. Her balast alma ve deşarj işlemi, hacim, konum, tarih/saat ve kullanılan yöntem (D-1 değişimi veya D-2 arıtma) belirtilerek Balast Suyu Kayıt Defterine (BWRB) eksiksiz işlenmelidir; bu kayıtlar PSC denetiminde ilk incelenen belgelerden biridir ve eksiklik doğrudan eksiklik kodu veya alıkoymaya yol açabilir. Filtre geri yıkama sıklığı ve tank diplerinde biriken sedimentin periyodik olarak temizlenmesi, hem sistem performansını korur hem de Balast Suyu Yönetim Planında (BWMP) tanımlanan sediment yönetimi yükümlülüğünü karşılar. UV lambalarının ömrü sınırlıdır ve azalan ışın gücü su bulanıklığı yüksek limanlarda dezenfeksiyon yetersizliğine yol açabileceğinden düzenli değişim ve sensör kalibrasyonu şarttır. Sistem seyir ortasında arızalanırsa gemi, mürettebatın kendi başına çözemeyeceği bir uyum krizine girer: sözleşme bu durum için 'alternatif yönetim uygulaması' (Ballast Water Exchange as contingency) ve olayın bayrak devletine ve varış limanı idaresine derhal raporlanmasını öngörür; tekrarlayan arıza kayıtları olmadan yapılan deşarjlar denetimde ağır bir uygunsuzluk olarak değerlendirilir.",
      },
    ],
    relatedSlugs: ["marpol", "iopp-cert"],
    resources: [
      { label: "IMO BWM Convention", href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Control-and-Management-of-Ships'-Ballast-Water-and-Sediments-(BWM).aspx" },
    ],
  },
  {
    slug: "llc",
    label: "LLC – Yük Hattı Sözleşmesi",
    category: "IMO Sözleşmeleri",
    overview:
      "Gemilerin güvenli yükleme limitlerini belirleyen yük hattı işaretleri ve freeboard hesaplamalarını düzenler; mevsimsel ve bölgesel yükleme sınırlarını kapsar.",
    history:
      "İlk uluslararası yük hattı sözleşmesi 1930'da Samuel Plimsoll'un 19. yüzyıldaki çabalarının mirası olarak kabul edilmiştir. 1966'da güncellenen sözleşme günümüzde hâlâ yürürlüktedir. 1988 Protokolü ile uyumlaştırılmış survey ve sertifikasyon sistemi getirilmiştir.",
    applicability: [
      "Uluslararası sefer yapan tüm gemiler",
      "24 metreden kısa gemiler, savaş gemileri ve balıkçı gemileri hariç",
      "Yeni gemiler ve mevcut gemiler için farklı geçiş hükümleri",
    ],
    essentials: [
      "Freeboard hesaplaması ve yük hattı işaretleri (Plimsoll markası)",
      "Mevsimsel zonlar: Tropical (T), Summer (S), Winter (W), Winter North Atlantic (WNA)",
      "Taze su yük hattı (F) ve tropik taze su yük hattı (TF)",
      "Yük Hattı Sertifikası ve survey gereklilikleri",
      "Hava ve su geçirmezlik kontrolleri (hatch cover, kapak contaları, ventilasyon kapakları)",
      "Taze su düzeltmesi (Fresh Water Allowance – FWA)",
      "Kereste yük hattı (Timber Load Line) özel gereklilikleri",
      "Tabular freeboard ve düzeltme faktörleri (L, Cb, D, süperstrüktür)",
    ],
    actions: [
      "Yükleme öncesi yük hattı limitlerini kontrol et",
      "Mevsimsel zon değişikliklerinde yükleme planını güncelle",
      "Yük Hattı Sertifikasını güncel tut",
      "Hava ve su geçirmez kapakları düzenli denetle",
      "Freeboard tablolarını ve hesaplamaları doğru kullan",
      "Kereste yüklemesinde timber load line koşullarını doğrula",
    ],
    amendments: [
      { year: "1988", description: "Protokol – uyumlaştırılmış survey ve sertifikasyon sistemi" },
      { year: "2003", description: "Revize teknik gerekliliklerin kabulü" },
      { year: "2005", description: "Hatch cover su geçirmezlik testleri için güncellenmiş kılavuzlar" },
    ],
    keyArticles: [
      { id: "Ek I", title: "Freeboard Hesaplama Kuralları", summary: "Tip A ve Tip B gemileri için tabular freeboard, düzeltme faktörleri ve yük hattı işaretleri." },
      { id: "Ek II", title: "Zon ve Mevsimsel Alanlar", summary: "Dünya denizlerinin yük hattı zonlarına (S, W, WNA, T) ayrılması." },
      { id: "Ek III", title: "Sertifikalar", summary: "Uluslararası Yük Hattı Sertifikası formatı ve survey gereklilikleri." },
    ],
    penalties: [
      "Yük hattı limitinin aşılması durumunda geminin yüklenmesinin durdurulması",
      "Sertifika geçersizliğinde geminin alıkonması",
      "Aşırı yükleme nedeniyle kazalarda cezai sorumluluk",
      "Hatch cover su geçirmezlik ihlalinde PSC eksikliği",
    ],
    detailedSections: [
      {
        heading: "Freeboard kavramı ve Plimsoll mirası",
        body:
          "Yük Hattı Sözleşmesinin tüm mantığı tek bir kavrama dayanır: freeboard, yani güverte kenarı ile su yüzeyi arasındaki asgari yükseklik. Bu mesafe geminin rezerv sintine hacmini ve dolayısıyla denizde batmadan kalma kabiliyetini belirler. 19. yüzyılda aşırı yüklenen gemilerin batması üzerine Samuel Plimsoll'un öncülük ettiği mücadele, gemi bordasına çizilen 'Plimsoll markası' ile sonuçlanmıştır. LLC bu fikri uluslararası bir standarda dönüştürür: her gemi için izin verilen azami yükleme, bordadaki yük hattı işaretleriyle görünür kılınır ve hiçbir koşulda bu çizginin altına yüklenemez.",
      },
      {
        heading: "Mevsimsel ve bölgesel yük hatları",
        body:
          "Aynı gemi her denizde ve her mevsimde aynı miktarda yüklenemez, çünkü su yoğunluğu ve hava koşulları değişir. Sözleşme dünyayı zonlara ayırır ve borda işaretinde birden çok çizgi tanımlar: Tropical (T), Summer (S), Winter (W) ve özellikle sert koşulları olan Winter North Atlantic (WNA). Tatlı suda gemi daha derine batacağı için ayrıca Fresh water (F) ve Tropical Fresh (TF) çizgileri de bulunur; tatlı su düzeltmesi (FWA) limandan denize çıkışta draftın nasıl değişeceğini hesaplar. Kaptanın yükleme planı, geminin seyir boyunca gireceği zonlara göre en kısıtlayıcı çizgiye uyacak biçimde yapılır.",
      },
      {
        heading: "Hesaplama, su geçirmezlik ve sörvey",
        body:
          "Freeboard, geminin boyu, blok katsayısı, derinliği ve üst yapıları dikkate alınarak tablo değerleri ve düzeltme faktörleriyle hesaplanır; Tip A (sıvı dökme yük) ve Tip B gemiler için farklı temel değerler kullanılır. Ancak hesaplanan freeboard ancak geminin su geçirmezliği korunduğu sürece anlamlıdır: ambar kapakları, contalar, havalandırma ve hava firar boruları, lumbar ağızları gibi açıklıkların su sızdırmazlığı düzenli denetlenmelidir. Geminin Uluslararası Yük Hattı Sertifikası bu uygunluğu belgeler ve periyodik sörveylerle yenilenir.",
      },
      {
        heading: "Freeboard hesabının derinlemesine yöntemi",
        body:
          "Yük hattı, keyfi bir çizgi değil, ayrıntılı bir mühendislik hesabının sonucudur. Hesap, geminin tipine göre bir tablo (tabular) freeboard değeriyle başlar: Tip A gemiler (sıvı dökme yük taşıyan, küçük güverte açıklıklı tankerler) daha düşük freeboard'a izin verecek şekilde, Tip B gemiler (diğerleri) daha yüksek freeboard ile değerlendirilir. Bu temel değer bir dizi düzeltme faktörüyle ayarlanır: blok katsayısı (Cb) düzeltmesi, geminin derinliği (D) düzeltmesi, üst yapıların (superstructure) ve kasaraların kapalı uzunluğuna göre indirim, geminin kavisi (sheer) ve baş yüksekliği. Sonuçta belirlenen freeboard, geminin rezerv sintine hacmini ve dolayısıyla denizde batmadan kalma kabiliyetini temsil eder. Bu hesap, geminin Yük Hattı Sertifikasında belgelenir ve bordadaki işaretlerin konumunu belirler.",
      },
      {
        heading: "Mevsimsel zonlar ve su geçirmezlik koşulu",
        body:
          "Aynı gemi her denizde aynı derinliğe yüklenemez; çünkü su yoğunluğu ve beklenen hava koşulları değişir. Sözleşme dünyayı yük hattı zonlarına ayırır ve bordadaki işaret bu zonlara karşılık gelen birden çok çizgi içerir: Tropical (T), Summer (S), Winter (W) ve özellikle sert koşulları olan Winter North Atlantic (WNA). Tatlı suda gemi daha derine batacağı için ayrıca Fresh (F) ve Tropical Fresh (TF) çizgileri bulunur; tatlı su düzeltmesi (Fresh Water Allowance), limandan denize çıkışta draftın nasıl değişeceğini hesaplar. Kaptan, yükleme planını geminin seyir boyunca gireceği en kısıtlayıcı zona uyacak şekilde yapar. Ancak hesaplanan freeboard, ancak geminin su geçirmezliği korunduğu sürece anlamlıdır: ambar kapakları, contalar, havalandırma ve hava firar boruları, lumbar ağızları gibi tüm açıklıkların sızdırmazlığı düzenli denetlenir; aksi halde rezerv sintine hacmi tehlikeye girer. Kereste taşıyan gemiler için ayrı timber load line koşulları uygulanır.",
      },
      {
        heading: "1988 Protokolü: uyumlaştırılmış sörvey sistemi",
        body:
          "LLC'nin 1988 Protokolü, sözleşmenin denetim mimarisini SOLAS ve MARPOL ile aynı takvime oturtan Uyumlaştırılmış Sörvey ve Sertifikasyon Sistemini (HSSC) getirir. Protokol öncesinde her sözleşmenin kendi sörvey ve sertifika yenileme döngüsü ayrı işlediğinden bir gemi aynı yıl içinde farklı tarihlerde birden çok denetim ziyareti almak zorunda kalabiliyordu. HSSC ile Yük Hattı Sertifikası da beş yıllık ortak bir sertifikasyon döngüsüne girer ve yıllık/periyodik sörveyleri SOLAS'ın Safety Construction ve Safety Equipment sörveyleri ile MARPOL'ün IOPP/IAPP sörveylerinin pencereleriyle (genellikle ana tarihin ±3 ayı) örtüşecek biçimde planlanabilir. Bu sayede klas kuruluşu bir tek sörvey ziyaretinde geminin su geçirmezliğini, yapısal bütünlüğünü ve kirlilik önleme donanımını birlikte kontrol edebilir. Protokol ayrıca serbest bord işaretinin ve tonaj işaretlerinin sertifika üzerindeki gösterimini standartlaştırmış, taraf devletler arası sertifika tanınmasını güçlendirmiştir. Pratikte bu, gemi yönetimi için sörvey planlamasının LLC'yi ayrı değil, SOLAS ve MARPOL sörvey takvimiyle birlikte tek bir yıllık program içinde ele alınması gerektiği anlamına gelir.",
      },
      {
        heading: "Aşırı yüklemenin operasyonel ve hukuki sonuçları",
        body:
          "Yük hattı çizgisinin ihlali, teorik bir kural ihlalinden çok daha ağır sonuçlar doğurur. Liman devleti kontrolünde bir geminin yük hattı işaretinin su altında kaldığı tespit edilirse bu, PSC denetiminde en ciddi eksiklik kategorilerinden biri sayılır ve genellikle gemi fazla yükü boşaltana veya balastını ayarlayana kadar limandan çıkışına izin verilmeyerek doğrudan alıkoymaya (detention) yol açar. Sigorta ve P&I kulüpleri açısından da sonuçlar ağırdır: poliçe koşulları genellikle geminin yasal yük hattı sınırları içinde seyretmesini şart koşar; aşırı yükleme sırasında yaşanan bir kaza veya kayıpta P&I kulübü ve hull&machinery sigortacısı, geminin seaworthy (deniz elverişli) olmadığı gerekçesiyle tazminat ödemeyi reddedebilir veya sübrogasyon yoluyla armatöre rücu edebilir. Denizcilik tarihi, freeboard'un neden bu kadar katı korunduğunu acı biçimde göstermiştir: 19. yüzyılda İngiliz kömür gemilerinin aşırı yüklenerek her yıl yüzlercesinin batması Plimsoll'un mücadelesini başlatmış, modern dönemde de dökme yük ve kuru yük gemilerinde yanlış istif ve aşırı yükleme kaynaklı stabilite kayıpları önemli kazalara yol açmıştır. Bu yüzden yük hattı denetimi, kaptanın yükleme öncesi kontrol listesinde asla atlanmaması gereken bir adımdır.",
      },
    ],
    relatedSlugs: ["solas", "tonnage-cert"],
    resources: [
      { label: "IMO Load Lines Convention", href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-on-Load-Lines.aspx" },
    ],
  },
  {
    slug: "colreg",
    label: "COLREG – Denizde Çatışmayı Önleme",
    category: "IMO Sözleşmeleri",
    overview:
      "Denizde gemilerin birbirlerinden kaçınma kurallarını, seyir ışıkları, şekil ve ses işaretlerini düzenler; tüm deniz araçları için zorunlu uyum gerektirir.",
    history:
      "Denizde çatışmayı önleme kurallarının tarihi 1840'lara Trinity House düzenlemelerine kadar uzanır. 1972'de kabul edilen mevcut COLREG, TSS (Traffic Separation Schemes) kavramını ilk kez uluslararası düzeyde zorunlu kılmıştır. 41 kural ve 4 ekten oluşur.",
    applicability: [
      "Açık denizlere ve bağlantılı tüm sulara bağlı her boyutta ve tipte deniz aracı",
      "Ticari gemiler, yatlar, balıkçı gemileri, küçük tekneler dahil",
      "Savaş gemileri özel hükümler kapsamında dahildir",
      "İç sular ulusal düzenlemelere tabidir ancak genellikle COLREG ile uyumludur",
    ],
    essentials: [
      "Kural 2: Sorumluluk – denizcilik teamülü ve özel koşulların dikkate alınması",
      "Kural 5: Her zaman uygun bir gözcü (lookout) bulundurma",
      "Kural 6: Emniyetli hız – görüş, trafik, manevrabilite faktörleri",
      "Kural 7-8: Çatışma riski değerlendirmesi ve kaçınma manevrası",
      "Kural 9-10: Dar kanallar ve TSS kuralları",
      "Kural 13-15: Yetişme, karşılaşma ve çapraz geçiş durumları",
      "Kural 18: Sorumluluk sırası (manevra kabiliyetine göre)",
      "Kural 19: Kısıtlı görüşte seyir kuralları",
      "Ek I: Seyir ışıkları – yerleşim ve teknik detaylar",
      "Ek II: İlave seyir ışıkları – balıkçı gemileri için",
      "Ek III: Ses sinyalleri – teknik özellikler ve kullanım",
      "Ek IV: Tehlike (distress) sinyalleri",
    ],
    actions: [
      "Seyir ışıklarını günlük kontrol et ve kaydet",
      "Dar kanal ve TSS geçişlerinde COLREG kurallarına uy",
      "Kısıtlı görüşte sis sinyali ver ve hızı azalt",
      "Mürettebata COLREG kurallarını düzenli hatırlat",
      "AIS ve radar kullanımını COLREG Kural 7 ile entegre et",
      "Gece seyir ışık kontrolünü vardiya değişiminde yapılacak kontrol listesine ekle",
    ],
    amendments: [
      { year: "1981", description: "Kural 10 – TSS kurallarının güçlendirilmesi" },
      { year: "1987", description: "Ek I – ışık mesafelerinde düzenlemeler" },
      { year: "1989", description: "WIG (Wing-In-Ground) araçları için ek düzenlemeler" },
      { year: "2001", description: "Kural 18 – WIG araçları sorumluluk sırasına eklendi" },
      { year: "2007", description: "TSS değişiklikleri ve trafik yönetimi güncellemeleri" },
      { year: "2024", description: "MASS (Maritime Autonomous Surface Ships) için COLREG uyumluluğu çalışmaları" },
    ],
    keyArticles: [
      { id: "Part A (K.1-3)", title: "Genel", summary: "Uygulama, sorumluluk ve genel tanımlar." },
      { id: "Part B-I (K.4-10)", title: "Her Koşulda Uygulanacak Kurallar", summary: "Gözcü, emniyetli hız, çatışma riski, kaçınma manevrası, dar kanallar, TSS." },
      { id: "Part B-II (K.11-18)", title: "Birbirini Gören Gemiler", summary: "Yelkenli kuralları, yetişme, karşılaşma, çapraz geçiş ve yol verme kuralları." },
      { id: "Part B-III (K.19)", title: "Kısıtlı Görüş", summary: "Radar kullanımı, sis sinyalleri ve kısıtlı görüşte kaçınma." },
      { id: "Part C (K.20-31)", title: "Işıklar ve Şekiller", summary: "Seyir ışıkları, güverte ışıkları, çekme ışıkları ve gündüz şekilleri." },
      { id: "Part D (K.32-37)", title: "Ses ve Işık Sinyalleri", summary: "Manevra, uyarı ve tehlike sinyalleri." },
    ],
    penalties: [
      "COLREG ihlali çatışma kazasında tam kusur veya müterafik kusur belirlenmesi",
      "Seyir ışığı eksikliğinde PSC alıkoyması",
      "Tehlike sinyalinin kötüye kullanımında cezai yaptırım",
      "Çatışma kazası soruşturmalarında kaptana cezai ve disiplin yaptırımı",
    ],
    detailedSections: [
      {
        heading: "Denizin trafik kuralları olarak COLREG",
        body:
          "COLREG, denizdeki çatışmaları önlemek için tüm deniz araçlarının uymak zorunda olduğu evrensel 'trafik kurallarıdır'. Karayolundaki şerit ve trafik ışıklarının deniz karşılığı; seyir ışıkları, şekiller, ses sinyalleri ve manevra kurallarıdır. Sözleşmenin temel ilkesi, her gemicinin denizcilik teamülünü ve sağduyuyu kuralların önüne koyabilmesidir: Kural 2, kuralların hiçbir zaman bir çatışmaya yol açacak biçimde katı uygulanamayacağını, gerektiğinde kurallardan ayrılmanın bile çatışmayı önlemek için meşru olduğunu söyler. Bu yüzden COLREG ezberlenecek 41 madde olmaktan çok, durum değerlendirmesi yapma disiplinidir.",
      },
      {
        heading: "Gözcülük, emniyetli hız ve çatışma riski",
        body:
          "Sözleşmenin kalbi, her koşulda uygulanan Kural 5-8'dir. Kural 5, gözle ve kulakla, ayrıca radar/AIS gibi tüm mevcut araçlarla sürekli ve uygun bir gözcülük tutmayı emreder. Kural 6, emniyetli hızı görüş, trafik yoğunluğu, manevra kabiliyeti ve hava gibi faktörlere bağlar; 'emniyetli hız' sabit bir sayı değil, o anki koşullarda durabilecek ve kaçınma yapabilecek hızdır. Kural 7, çatışma riskinin nasıl değerlendirileceğini (özellikle pusula kerterizinin sabit kalması ölçütünü), Kural 8 ise kaçınma manevrasının erken, belirgin ve yeterli olması gerektiğini düzenler.",
      },
      {
        heading: "Gemiler arası ilişki ve sorumluluk sırası",
        body:
          "Birbirini gören gemiler için Kural 11-18, üç klasik karşılaşma durumunu tanımlar: aynı yönde yetişme (overtaking), karşı karşıya gelme (head-on) ve çapraz geçiş (crossing). Her durumda hangi geminin yol vereceği (give-way) ve hangisinin rotasını koruyacağı (stand-on) açıkça belirlenir. Kural 18 ise gemiler arasında bir hiyerarşi kurar: manevra kabiliyeti en kısıtlı olan (kumanda altında olmayan, manevra kabiliyeti sınırlı, balıkçı, yelkenli) en çok korunur; güçle yürüyen normal bir gemi çoğu duruma yol vermek zorundadır. Bu sıralama, çatışma anında 'kim kime göre öncelikli' sorusunu net yanıtlar.",
      },
      {
        heading: "Kısıtlı görüş, ışıklar ve sinyaller",
        body:
          "Kural 19, sis veya yağmurda görüşün kısıtlandığı durumları ayrı ele alır: bu koşulda 'birbirini gören gemiler' kuralları geçmez, gemiler radara dayanır, hızı emniyetli düzeye indirir ve gerektiğinde durmaya hazır olur. Sözleşmenin ekleri teknik dili tamamlar: Ek I seyir ışıklarının renk, açı ve menzilini; Ek III ses sinyali cihazlarının özelliklerini; Ek IV ise tehlike işaretlerini tanımlar. Gece bir geminin tipini, yönünü ve durumunu yalnızca ışık düzeninden okumak; gündüz ise şekillerden ve düdük işaretlerinden niyetini anlamak, vardiya zabitinin temel becerisidir. Bu yüzden COLREG, STCW vardiya gereklilikleriyle doğrudan iç içedir.",
      },
      {
        heading: "Part A – Kural 1-3: kapsam, sorumluluk ve tanımlar",
        body:
          "COLREG'in giriş bölümü, kuralların nasıl yorumlanacağını belirler. Kural 1 uygulama kapsamını çizer: açık denizler ve bunlara bağlı, deniz gemilerinin seyrettiği tüm sular. Kural 2 (sorumluluk) sözleşmenin ruhudur: hiçbir kural, gemiyi, kaptanı veya mürettebatı kuralları ihmal etmenin sonuçlarından muaf tutmaz; ayrıca özel koşullar (yakın tehlike, dar su, manevra kısıtı) gerektirdiğinde kurallardan ayrılmak bile bir çatışmayı önlemek için meşrudur. Bu, COLREG'i körü körüne ezberlenecek bir liste olmaktan çıkarıp durum değerlendirmesine dayalı bir denizcilik disiplinine dönüştürür. Kural 3 ise tüm sözleşmede kullanılan terimleri (güçle yürüyen gemi, yelkenli, manevra kabiliyeti sınırlı gemi, kumanda altında olmayan gemi, birbirini görme, kısıtlı görüş) tanımlar; bu tanımlar sonraki kuralların doğru uygulanmasının anahtarıdır.",
      },
      {
        heading: "Kural 4-7: gözcülük, emniyetli hız ve çatışma riski",
        body:
          "Her koşulda geçerli olan bu kurallar, çatışmayı daha doğmadan tespit etmeyi hedefler. Kural 5 (gözcülük), görme ve işitmenin yanı sıra radar ve AIS dahil tüm uygun araçlarla sürekli ve tam bir gözcülük tutmayı emreder. Kural 6 (emniyetli hız), hızın görüş, trafik yoğunluğu, manevra kabiliyeti, gece koşulları, rüzgâr/deniz durumu ve radar kısıtları gibi faktörlere göre ayarlanmasını ister; 'emniyetli hız' sabit bir sayı değil, o anki koşulda durabilecek ve kaçınma yapabilecek hızdır. Kural 7 (çatışma riski), riski belirlemenin yöntemini verir: özellikle yaklaşan bir geminin pusula kerterizinin belirgin biçimde değişmemesi çatışma riskinin işaretidir; radar varsa sistematik gözlem ve plotting (CPA/TCPA değerlendirmesi) yapılmalı, eksik bilgiyle varsayımda bulunulmamalıdır.",
      },
      {
        heading: "Kural 8-10: kaçınma manevrası, dar kanallar ve TSS",
        body:
          "Kural 8 (kaçınma eylemi), bir manevranın nasıl yapılacağını tanımlar: yeterince erken, belirgin (karşı gemiden çıplak gözle veya radarla net görülecek kadar büyük) ve tereddütsüz olmalı; bir dizi küçük rota/hız değişikliği yerine net bir değişiklik tercih edilmeli ve manevra etkili olana kadar sürdürülmelidir. Kural 9 (dar kanallar), gemilerin kanalın kendi sancak tarafına yakın seyretmesini ve büyük gemilerin geçişini engellememesini düzenler. Kural 10 (Trafik Ayırım Düzenleri – TSS), yoğun trafik bölgelerinde gemilerin doğru trafik şeridini uygun yönde kullanmasını, ayırım hattını mümkünse dik açıyla geçmesini ve ayırım bölgelerinden kaçınmasını şart koşar. TSS'lerin uluslararası düzeyde zorunlu kılınması, COLREG'in 1972'deki en önemli yeniliklerinden biridir.",
      },
      {
        heading: "Kural 11-18: birbirini gören gemiler ve sorumluluk hiyerarşisi",
        body:
          "Bu kurallar, görüş alanındaki gemiler arasındaki üç klasik karşılaşmayı çözer. Yetişme (overtaking, Kural 13): arkadan yaklaşan gemi yol vermek zorundadır ve bir gemi yetişme durumundaysa sonradan çapraz duruma dönse bile bu yükümlülük sürer. Pruvadan pruvaya (head-on, Kural 14): karşılıklı gelen iki güçle yürüyen gemi, her ikisi de sancağa dönerek iskele bordalarından geçer. Çapraz geçiş (crossing, Kural 15): diğer gemiyi sancağında gören gemi yol verir. Kural 16 yol veren geminin (give-way) erken ve belirgin manevra yapmasını, Kural 17 yolu olan geminin (stand-on) başlangıçta rota ve hızını korumasını ama çatışma kaçınılmaz hale gelirse kendi manevrasını yapmasını düzenler. Kural 18, gemiler arası öncelik hiyerarşisini kurar: kumanda altında olmayan ve manevra kabiliyeti sınırlı gemiler en çok korunur; onları balıkçı gemileri ve yelkenliler izler; güçle yürüyen normal bir gemi çoğu duruma yol vermek zorundadır.",
      },
      {
        heading: "Kural 19: kısıtlı görüşte seyir",
        body:
          "Kural 19, sis, yağmur veya kar nedeniyle görüşün kısıtlandığı durumları ayrı bir mantıkla ele alır; çünkü bu koşulda gemiler birbirini göremez ve 'birbirini gören gemiler' kuralları (give-way/stand-on) geçmez. Bu durumda her gemi emniyetli hıza iner, makineleri manevraya hazır tutar ve radarla sistematik gözlem yapar. Yalnızca radarla saptanan bir gemiye karşı manevra yapılırken iki davranıştan kaçınılmalıdır: kendinden önde (önden geçen hariç) bir gemiye iskeleye dönmek ve kendine kabin/borda hizasında veya kıçında bir gemiye yaklaşmak için rota değiştirmek. Görüş kısıtlıyken ayrıca uygun sis sinyalleri verilir. Kural 19, kazaların büyük kısmının kötü görüşte yaşandığı gerçeği nedeniyle pratikte en kritik kurallardandır ve STCW'nin radar/ARPA eğitim gereklilikleriyle doğrudan bağlantılıdır.",
      },
      {
        heading: "Part C ve D – Işıklar, şekiller ve sesli sinyaller",
        body:
          "Sözleşmenin son bölümleri, gemilerin niyetini ve durumunu görsel/işitsel olarak 'okumayı' sağlar. Part C (Kural 20-31), seyir ışıklarını ve gündüz şekillerini düzenler: bir geminin tipi, boyutu, yönü ve özel durumu (demirde, kumanda altında değil, çekme yapıyor, balık avlıyor, manevra kabiliyeti sınırlı) yalnızca ışık düzeninden gece anlaşılabilir. Pruva feneri, kıç feneri, borda fenerleri ve direk fenerlerinin renkleri, görüş açıları ve menzilleri kesin tanımlanır. Part D (Kular 32-37), sesli ve ışıklı sinyalleri kapsar: manevra ve uyarı sinyalleri (bir kısa düdük – sancağa dönüyorum, iki kısa – iskeleye, beş kısa – niyetinizi anlamıyorum/şüphe), kısıtlı görüşte sis sinyalleri ve tehlike (distress) sinyalleri. Vardiya zabitinin gece bir ışık demetinden geminin durumunu, gündüz bir düdük dizisinden niyetini çözebilmesi, COLREG'in pratikteki temel becerisidir.",
      },
    ],
    relatedSlugs: ["solas", "stcw"],
    resources: [
      { label: "IMO COLREG", href: "https://www.imo.org/en/About/Conventions/Pages/COLREG.aspx" },
    ],
  },
  {
    slug: "itc-69",
    label: "ITC 69 – Tonaj Ölçümü Sözleşmesi",
    category: "IMO Sözleşmeleri",
    overview: "Gemilerin brüt ve net tonajlarının evrensel ve tutarlı biçimde ölçülmesi için kurallar koyar; liman harçları, güvenlik gereklilikleri ve manning hesaplamalarına temel oluşturur.",
    history: "1969'da kabul edilen ve 1982'de yürürlüğe giren ITC 69, farklı ulusal tonaj ölçüm sistemlerini tek bir uluslararası standart altında birleştirmiştir. Önceki Moorsom sistemi hacim bazlı olmasına rağmen tutarsız uygulamalara yol açıyordu. Geçiş süreci 1994'te tamamlanmış ve tüm uluslararası sefer yapan gemiler ITC 69'a göre ölçülmüştür.",
    applicability: [
      "Uluslararası sefer yapan 24 metre ve üzeri tüm gemiler",
      "Savaş gemileri hariç",
      "İç sularda sefer yapan gemiler ulusal tonaj kurallarına tabi olabilir",
    ],
    essentials: [
      "Brüt tonaj (GT) hesaplama formülü: GT = K₁ × V (K₁ = 0.2 + 0.02 × log₁₀V)",
      "Net tonaj (NT) hesaplama formülü: NT = K₂ × Vc × (4d/3D)² + K₃(N₁ + N₂/10)",
      "Kapalı hacimlerin tanımı ve istisnaları",
      "Tonaj sertifikasının geçerliliği ve yenileme koşulları",
      "GT'nin manning, emniyet gereklilikleri, liman harçları, kanal geçiş ücretleri ve sigorta primine etkisi",
      "Süez ve Panama kanalları için ayrı tonaj ölçüm sistemleri (SCNT, PC/UMS)",
    ],
    actions: [
      "Yapısal modifikasyon sonrası tonaj yeniden hesaplamasını talep et",
      "Tonaj sertifikası ile manning ve emniyet gerekliliklerini karşılaştır",
      "Liman harç hesaplarında GT/NT doğrulaması yap",
      "Kanal geçiş tonajları için ayrı sertifikaların geçerliliğini kontrol et",
    ],
    amendments: [
      { year: "1982", description: "Sözleşme yürürlüğe girişi" },
      { year: "1994", description: "12 yıllık geçiş süresinin tamamlanması – tüm gemiler ITC 69'a geçti" },
      { year: "2013", description: "Bazı açık alanların (open-top container ship) tonaj hesabına dahil edilmesi kılavuzları" },
    ],
    keyArticles: [
      { id: "Madde 2-3", title: "Uygulama ve Tanımlar", summary: "Sözleşme kapsamı, GT ve NT tanımları, ölçüm prensipleri." },
      { id: "Madde 6", title: "Tonajın Belirlenmesi", summary: "GT ve NT hesaplama kuralları ve formüllerinin detayları." },
      { id: "Madde 7", title: "Tonaj Sertifikası", summary: "Uluslararası Tonaj Sertifikası düzenleme, geçerlilik ve iptal koşulları." },
      { id: "Ek I", title: "Tonaj Ölçüm Kuralları", summary: "Hacim hesaplama yöntemleri, kapalı/açık alan tanımları ve istisna alanları." },
    ],
    penalties: [
      "Tonaj sertifikası eksik gemilerin alıkonması",
      "Yapısal değişiklik sonrası tonaj güncellenmemesinde sertifika geçersizliği",
      "Yanlış tonaj beyanı ile liman harç kaçırma durumunda idari ceza",
    ],
    detailedSections: [
      {
        heading: "Tonajın iki yüzü: GT ve NT",
        body:
          "ITC 69, geminin 'büyüklüğünü' parayla ve emniyetle ilişkili tek bir uluslararası dile çevirir. İki temel ölçü vardır: Brüt Tonaj (GT) geminin tüm kapalı hacmini temsil eder ve emniyet gereklilikleri, mürettebat sayısı, sertifika türleri gibi düzenleyici eşiklerin tabanını oluşturur. Net Tonaj (NT) ise yalnızca gelir getiren (yük/yolcu) hacmi temsil eder ve liman harçları, kanal geçiş ücretleri gibi ticari yüklerin hesabında kullanılır. Önemli olan, bu değerlerin hacim esaslı ve boyutsuz katsayılar olmasıdır; geçmişteki tutarsız ulusal sistemlerin aksine tüm dünyada aynı formülle hesaplanır.",
      },
      {
        heading: "Neden tek bir standart gerekli oldu",
        body:
          "Sözleşme öncesinde her ülke tonajı farklı ölçüyordu; bu, aynı geminin farklı limanlarda farklı 'büyüklükte' sayılmasına ve haksız rekabete yol açıyordu. ITC 69, eski Moorsom sisteminin yarattığı bu karmaşayı tek bir matematiksel çerçeveyle sonlandırmıştır. GT logaritmik bir katsayıyla toplam hacme, NT ise yük hacmi, draft/derinlik oranı ve yolcu sayısı gibi parametrelere bağlanır. Böylece tonaj artık ölçen idareye göre değişen bir tahmin değil, doğrulanabilir bir hesap sonucudur ve geminin Uluslararası Tonaj Sertifikasıyla belgelenir.",
      },
      {
        heading: "Pratik etkiler ve kanal istisnaları",
        body:
          "Tonaj, bir geminin yaşam döngüsü boyunca aldığı pek çok kararı sessizce yönetir: hangi sertifikalara tabi olacağı, kaç kişiyle donatılacağı, limanda ne kadar harç ödeyeceği ve sigorta priminin nasıl hesaplanacağı GT/NT üzerinden kurulur. Geminin yapısında kalıcı bir değişiklik yapılırsa (örneğin kapalı hacim eklenirse) tonajın yeniden hesaplanması ve sertifikanın güncellenmesi gerekir. Süveyş ve Panama kanalları ise kendi ticari amaçlarıyla ITC 69'dan ayrı tonaj sistemleri (SCNT, PC/UMS) uygular; bu nedenle bu kanalları geçecek gemiler ayrı kanal tonaj sertifikalarını da geçerli tutmak zorundadır.",
      },
      {
        heading: "GT ve NT formüllerinin derinlemesine mantığı",
        body:
          "ITC 69, tonajı ölçen idareye göre değişen bir tahmin olmaktan çıkarıp doğrulanabilir bir matematiksel sonuca dönüştürür. Brüt tonaj (GT), geminin toplam kapalı hacmine (V, metreküp) logaritmik bir katsayı uygulanarak hesaplanır: GT = K₁ × V, burada K₁ = 0,2 + 0,02 × log₁₀V. Logaritmik katsayı, büyük gemilerde hacmin tonaja katkısının orantılı biçimde azalmasını sağlar. Net tonaj (NT) ise yalnızca gelir getiren (yük/yolcu) hacmi temsil eder ve daha karmaşık bir formülle hesaplanır: yük hacmi, draft/derinlik oranının karesi ve yolcu sayısı parametrelerini içerir; NT belirli alt sınırların altına inemez. Önemli olan, bu değerlerin hacim esaslı ve boyutsuz olmasıdır; geçmişteki tutarsız ulusal sistemlerin (eski Moorsom yöntemi) aksine tüm dünyada aynı formülle hesaplanır ve Uluslararası Tonaj Sertifikasıyla belgelenir.",
      },
      {
        heading: "Eşik etkisi, süreklilik ve kanal tonajları",
        body:
          "Tonaj, bir geminin yaşam döngüsü boyunca aldığı pek çok kararı sessizce yönetir. GT, pek çok uluslararası düzenlemenin uygulanıp uygulanmayacağını belirleyen 'eşik' değeridir: 300 GT'de AIS, 400 GT'de MARPOL Ek VI ve MLC, 500 GT'de SOLAS kargo gereklilikleri gibi sınırlar GT üzerinden işler; ayrıca mürettebat sayısı, emniyet gereklilikleri ve liman harçları da tonaja bağlanır. Bu yüzden geminin yapısında kalıcı bir değişiklik (kapalı hacim ekleme/çıkarma) yapılırsa tonaj yeniden hesaplanmalı ve sertifika güncellenmelidir; aksi halde sertifika geçersiz olur. Süveyş ve Panama kanalları kendi ticari amaçlarıyla ITC 69'dan ayrı tonaj sistemleri (SCNT, PC/UMS) uygular; bu kanalları geçecek gemiler, geçiş ücretlerinin hesabında kullanılan ayrı kanal tonaj sertifikalarını da geçerli tutmak zorundadır. Yanlış tonaj beyanıyla harç kaçırma idari yaptırıma yol açar.",
      },
      {
        heading: "GT'nin diğer sözleşmelerdeki eşik rolü",
        body:
          "ITC 69'un pratik önemi, kendi başına bir emniyet veya çevre kuralı koymamasına rağmen, neredeyse her IMO sözleşmesinin kapsamını belirleyen ortak ölçü birimini sağlamasından gelir. Bir gemi bu sözleşmelerin hangi maddelerine tabi olacağını, önce ITC 69'a göre hesaplanan GT değerine bakarak öğrenir. Örneğin AIS taşıma zorunluluğu 300 GT eşiğinde başlar; SOLAS'ın kargo gemilerine yönelik pek çok bölümü (Safety Construction, Safety Equipment sertifikaları) 500 GT eşiğini kullanır ve MLC 2006 de aynı 500 GT sınırını Denizcilik Çalışma Sertifikası zorunluluğu için benimser; MARPOL Ek VI'nın IAPP sertifikası ve SOPEP gerekliliği ise 400 GT eşiğine bağlıdır ve EEXI/CII rejimi bu eşiği 5000 GT'ye çıkarır. Bu eşikler keyfi değildir: küçük gemilerin idari ve teknik yüküne oranla büyük gemilerin taşıdığı riskin daha ağır düzenlemeyi haklı çıkardığı kabulüne dayanır. Bu yüzden bir armatörün gemi tasarımı veya modifikasyon kararı verirken GT'yi bir eşiğin hemen altında veya üstünde tutması, hangi sertifika ve ekipman rejimine gireceğini doğrudan belirleyen stratejik bir karardır.",
      },
      {
        heading: "Kanal tonaj sistemleri: SCNT ve PC/UMS",
        body:
          "Süveyş ve Panama kanalları, ITC 69'un evrensel GT/NT sistemini kabul etmek yerine kendi ticari amaçlarına göre tasarlanmış ayrı tonaj rejimlerini korumuşlardır, çünkü geçiş ücretleri bu kanalların en büyük gelir kaynağıdır ve ITC 69'un genel formülü onların özel gemi tipleri ve hacim tanımları için yeterince hassas görülmemiştir. Süveyş Kanalı, Suez Canal Net Tonnage (SCNT) sistemini kullanır; bu, ITC 69 NT'sinden farklı hacim tanımları ve düzeltme katsayıları içerir ve her gemi için ayrı bir Süveyş Tonaj Sertifikası gerektirir. Panama Kanalı ise PC/UMS (Panama Canal/Universal Measurement System) uygular; bu sistem ITC 69'un brüt tonaj mantığına daha yakın olsa da kendi düzeltme tablolarına ve açık üst güverte (open-top) gibi özel yapı tanımlarına sahiptir. Sonuç olarak bu kanallardan geçecek bir gemi, ITC 69 kapsamındaki Uluslararası Tonaj Sertifikasının yanı sıra, geçiş ücretinin hesaplanacağı ayrı kanal tonaj sertifikalarını da almak ve güncel tutmak zorundadır; bir gemi işletmecisi için bu, aynı geminin üç farklı tonaj değeriyle (ITC 69 GT/NT, SCNT, PC/UMS) anılabileceği ve her birinin farklı bir mali veya düzenleyici sonucu olduğu anlamına gelir.",
      },
    ],
    relatedSlugs: ["tonnage-cert", "llc"],
    resources: [{ label: "ITC 69 bilgi sayfası", href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-on-Tonnage-Measurement-of-Ships.aspx" }],
  },
  {
    slug: "sar-convention",
    label: "SAR – Arama ve Kurtarma Sözleşmesi",
    category: "IMO Sözleşmeleri",
    overview: "Denizde arama ve kurtarma operasyonlarının koordinasyonunu, SRR bölgelerini ve MRCC işbirliği çerçevesini düzenler.",
    history: "1979'da kabul edilen SAR Sözleşmesi, denizde arama ve kurtarma operasyonlarının uluslararası koordinasyonunu sağlamak amacıyla oluşturulmuştur. 1998'de revize edilerek operasyonel prosedürler güncellenmiştir. ICAO ile ortak çalışarak havacılık ve denizcilik SAR'ını entegre eden IAMSAR Manual'in temelini oluşturur.",
    applicability: [
      "Tüm taraf devletler ve deniz alanlarında bulunan gemiler",
      "Her boyut ve tipte deniz aracı",
      "Kaptanın denizde tehlikedeki kişilere yardım yükümlülüğü SOLAS V/33.1 ile desteklenir",
    ],
    essentials: [
      "SRR (Search and Rescue Region) sınırları ve devlet sorumlulukları",
      "MRCC (Maritime Rescue Coordination Centre) ve MRSC kurulumu",
      "SAR koordinasyon prosedürleri ve haberleşme kanalları",
      "OSC (On-Scene Coordinator) atanması ve görevleri",
      "SAR planları, tatbikatlar ve kaynak paylaşımı",
      "Kaptanın denizde tehlikedeki kişilere yardım yükümlülüğü",
      "RCC'ler arası uluslararası işbirliği protokolleri",
    ],
    actions: [
      "Seyir planında geçilen SRR'lerin MRCC iletişim bilgilerini hazırla",
      "SAR tatbikatlarını yılda en az bir kez gerçekleştir",
      "GMDSS cihazlarının SAR alarm fonksiyonlarını periyodik test et",
      "MOB prosedürlerini (Williamson, Anderson, Scharnow) düzenli tatbikat et",
      "EPIRB ve SART'ın düzgün çalıştığını doğrula",
    ],
    amendments: [
      { year: "1998", description: "Kapsamlı revizyon – IAMSAR Manual ile entegrasyon" },
      { year: "2004", description: "Toplu kurtarma operasyonları ve göçmen kurtarma prosedürleri" },
      { year: "2006", description: "Denizde kurtarılan kişilerin güvenli limana teslimi prosedürleri" },
    ],
    keyArticles: [
      { id: "Chapter 2", title: "SRR Organizasyonu", summary: "Arama ve kurtarma bölgelerinin belirlenmesi, MRCC/MRSC kurulması." },
      { id: "Chapter 3", title: "İşbirliği", summary: "Devletlerarası SAR koordinasyonu, bilgi paylaşımı ve karşılıklı yardım." },
      { id: "Chapter 4", title: "Operasyonel Prosedürler", summary: "Tehlike aşamaları (uncertainty, alert, distress), arama şekilleri ve kurtarma planlaması." },
    ],
    penalties: [
      "Kaptanın denizde tehlikedeki kişilere yardım etmemesi cezai suç oluşturur",
      "SAR koordinasyonuna katılmayı reddetme durumunda bayrak devleti soruşturması",
    ],
    detailedSections: [
      {
        heading: "Denizde kurtarma yükümlülüğünün kurumsallaşması",
        body:
          "Denizde tehlikedeki kişiye yardım etmek yüzyıllardır denizciliğin ahlaki bir borcudur; SAR Sözleşmesi bu borcu örgütlü, planlı ve uluslararası işbirliğine dayalı bir sisteme dönüştürür. Sözleşmenin amacı, dünyanın hangi noktasında bir tehlike olursa olsun, sorumlu bir kurtarma örgütünün hızla devreye girmesini garanti etmektir. Bunu sağlamak için okyanuslar Arama ve Kurtarma Bölgelerine (SRR) bölünür ve her bölgeden bir devlet sorumlu tutulur. Böylece kurtarma, gemilerin iyi niyetine bırakılan rastlantısal bir çaba olmaktan çıkıp, koordine edilen bir kamu hizmetine dönüşür.",
      },
      {
        heading: "MRCC, OSC ve koordinasyon zinciri",
        body:
          "Sistemin merkezinde, her SRR için kurulan Deniz Kurtarma Koordinasyon Merkezleri (MRCC) bulunur. Bir tehlike çağrısı alındığında MRCC durumu üç aşamada değerlendirir: belirsizlik (uncertainty), alarm (alert) ve tehlike (distress). Bölgedeki gemiler ve hava araçları seferber edilir, olay yerinde bir On-Scene Coordinator (OSC) atanır ve arama, standart arama şekilleriyle (sektör, genişleyen kare, paralel tarama) sistemli biçimde yürütülür. MRCC'ler arası uluslararası işbirliği protokolleri, bir bölgeden diğerine geçişte koordinasyonun kopmamasını sağlar.",
      },
      {
        heading: "Gemiye düşen görevler ve IAMSAR ile bağ",
        body:
          "SAR Sözleşmesi devlet yükümlülüklerini düzenlese de pratikte ilk müdahaleyi çoğu zaman olay yerine en yakın ticari gemi yapar. Bu yüzden kaptanın tehlikedeki kişilere yardım yükümlülüğü SOLAS V/33 ile pekiştirilir. Gemiler için bu, geçilen SRR'lerin MRCC iletişim bilgilerini hazır tutmak, GMDSS cihazlarının alarm fonksiyonlarını test etmek, EPIRB ve SART'ın çalışırlığını doğrulamak ve adam denize (MOB) manevralarını tatbik etmek anlamına gelir. Operasyonel ayrıntılar, denizcilik ve havacılık kurtarmasını birleştiren IAMSAR Manual'de tanımlanır; SAR Sözleşmesi çerçeveyi, IAMSAR ise uygulama el kitabını sağlar.",
      },
      {
        heading: "Tehlike aşamaları ve arama planlaması (derinlemesine)",
        body:
          "SAR Sözleşmesi, bir durumun ne zaman ve nasıl müdahale gerektirdiğini üç tehlike aşamasıyla tanımlar. Belirsizlik aşaması (uncertainty/INCERFA), bir gemiden veya kişiden beklenen haberin alınamaması gibi şüphe durumudur. Alarm aşaması (alert/ALERFA), belirsizliğin sürmesi ve endişenin artmasıdır; bu aşamada arama hazırlıkları başlatılır. Tehlike aşaması (distress/DETRESFA), bir gemi veya kişinin ciddi ve yakın tehlike altında olduğu, derhal yardım gerektiren durumdur. MRCC her aşamada artan yoğunlukta eylem alır: bilgi toplar, bölgedeki vasıtaları uyarır ve gerektiğinde tam bir arama-kurtarma operasyonu başlatır. Arama, kazazedenin akıntı ve rüzgârla sürüklendiği güncel olası konum (datum) üzerinden, standart arama şekilleriyle (genişleyen kare, sektör, paralel tarama) sistemli biçimde planlanır.",
      },
      {
        heading: "Devletlerarası işbirliği ve güvenli yere teslim",
        body:
          "SAR'ın etkinliği, sınırların ötesinde işbirliğine dayanır. Sözleşme, komşu SRR'lerden sorumlu devletlerin kurtarma koordinasyon merkezleri (MRCC) arasında bilgi paylaşımı, karşılıklı yardım ve bir devletin SAR vasıtalarının diğerinin sularına girmesine izin verme protokolleri kurar; çünkü bir tehlike, bir bölgenin sınırında veya birden çok bölgeyi kapsayacak biçimde gerçekleşebilir. Sözleşmenin zamanla güçlenen bir boyutu, denizde kurtarılan kişilerin (özellikle toplu göç ve sığınmacı kurtarma olaylarında) güvenli bir yere teslim edilmesi yükümlülüğüdür; kaptanın yardım yükümlülüğü ile kıyı devletlerinin kurtarılanları kabul sorumluluğu arasındaki koordinasyon bu kapsamda düzenlenir. Operasyonel ayrıntılar, denizcilik ve havacılık kurtarmasını birleştiren IAMSAR Manual'de tanımlanır; SAR Sözleşmesi çerçeveyi, IAMSAR ise uygulama el kitabını sağlar.",
      },
      {
        heading: "Tehlike aşaması eskalasyonu: INCERFA'dan DETRESFA'ya koordinasyon",
        body:
          "SAR sisteminin operasyonel kalbi, bir durumun ciddiyetini kademeli olarak artan üç aşamada sınıflandırmasıdır. INCERFA (belirsizlik aşaması), bir gemiden beklenen rapor veya haberin makul bir süre içinde alınamaması gibi henüz endişe verici olmayan bir şüphe durumunda devreye girer; MRCC bu aşamada sorumlu acenteler ve gemiyle iletişime geçerek bilgi toplar. Durum netleşmez veya kötüleşirse ALERFA (alarm aşaması) ilan edilir; bu, geminin veya kişinin güvenliği konusunda ciddi kaygının doğduğu ve arama-kurtarma kaynaklarının hazırlığa geçtiği aşamadır. Ciddi ve yakın bir tehlikenin kesinleştiği veya derhal yardım gerektiği anlaşıldığında DETRESFA (tehlike aşaması) ilan edilir ve tam kapsamlı bir arama-kurtarma operasyonu başlatılır. Bu üç aşama boyunca koordinasyon hiyerarşik biçimde işler: SRR'den sorumlu MRCC genel koordinasyonu üstlenir, olayın büyüklüğüne göre bir SAR Mission Coordinator (SMC) operasyonun günlük yönetimini yürütür ve olay yerinde fiilen bulunan birimler arasında bir On-Scene Coordinator (OSC) atanarak arama düzeni, sektör paylaşımı ve haberleşme trafiği fiilen sahada yönetilir. Bu üç kademeli yapı (MRCC-SMC-OSC), büyük ölçekli veya uzun süreli operasyonlarda karar alma ile fiili icra arasındaki mesafeyi güvenli biçimde yönetir.",
      },
      {
        heading: "Yardım yükümlülüğü ve SAR koordinasyonuyla ilişkisi",
        body:
          "SAR Sözleşmesinin devlet düzeyinde kurduğu örgütlü yapı, denizcilik hukukunun çok daha eski bir ilkesiyle, kaptanın tehlikedeki kişilere yardım etme yükümlülüğüyle iç içe çalışır. Bu yükümlülük SOLAS Chapter V, Regulation 33 ile pekiştirilmiştir: bir tehlike sinyali alan veya denizde tehlikede bir kişi/gemi gören her geminin kaptanı, kendi gemisini, mürettebatını veya yolcularını ciddi riske atmadığı sürece, mümkün olan en hızlı biçimde yardıma gitmek zorundadır; bu yükümlülük gemi bayrağından veya ilgili tarafların milliyetinden bağımsızdır. Aynı ilke UNCLOS Madde 98 ile örf ve adet hukukunda da yer alır. Pratikte bu, çoğu tehlike durumunda ilk müdahalenin devlet SAR varlıklarından değil olay yerine en yakın ticari gemiden geldiği anlamına gelir; bu yüzden SAR Sözleşmesi, ticari gemilerin bu yardımı MRCC koordinasyonu içine dahil ederek düzenli hale getirir. Bir kaptan yardıma giderken durumu derhal MRCC'ye bildirir, MRCC onu resmi bir SAR varlığı gibi OSC'nin talimatı altına alabilir ve gemi görevini tamamlayana ya da başka bir birim devralana kadar olay yerinde kalmakla yükümlü olur. Böylece bireysel ahlaki/hukuki yükümlülük ile devletin örgütlü SAR sistemi, tek bir operasyonel zincirde birleşir.",
      },
    ],
    relatedSlugs: ["solas", "iamsar"],
    resources: [{ label: "SAR Convention", href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-on-Maritime-Search-and-Rescue-(SAR).aspx" }],
  },
  {
    slug: "fal-convention",
    label: "FAL – Deniz Trafiğinin Kolaylaştırılması",
    category: "IMO Sözleşmeleri",
    overview: "Gemilerin limanlara giriş/çıkışında gereken belge ve prosedürleri basitleştirerek uluslararası deniz ticaretini kolaylaştırır.",
    history: "1965'te kabul edilen FAL Sözleşmesi, limanlarla ilgili bürokratik işlemleri en aza indirmek amacıyla oluşturulmuştur. 2019 değişiklikleri ile Maritime Single Window (elektronik belge sistemi) zorunluluğu getirilmiştir. En son FAL 14 (2024) güncellemesi ile dijital sertifika değişim standartları kabul edilmiştir.",
    applicability: [
      "Uluslararası sefer yapan tüm gemiler",
      "Liman otoriteleri, gümrük ve sınır kontrol idareleri",
      "Deniz acenteleri ve gemi işletmecileri",
    ],
    essentials: [
      "FAL formu 1 – General Declaration (Genel Beyanname)",
      "FAL formu 2 – Cargo Declaration (Yük Beyanı)",
      "FAL formu 3 – Ship's Stores Declaration (Kumanya Beyanı)",
      "FAL formu 4 – Crew's Effects Declaration (Mürettebat Eşyası Beyanı)",
      "FAL formu 5 – Crew List (Mürettebat Listesi)",
      "FAL formu 6 – Passenger List (Yolcu Listesi)",
      "FAL formu 7 – Dangerous Goods Manifest",
      "Maritime Single Window (MSW) zorunluluğu (2024'ten itibaren)",
      "Ön bildirim gereklilikleri ve liman prosedürleri",
      "Kaçak yolcu ve sığınmacı prosedürleri",
    ],
    actions: [
      "FAL formlarını elektronik ortamda hazırla ve zamanında ilet",
      "Maritime Single Window sistemine entegrasyon sağla",
      "Ön bildirim (pre-arrival notification) gerekliliklerini kontrol et",
      "Kaçak yolcu arama ve raporlama prosedürlerini mürettebata öğret",
      "Liman devleti gerekliliklerini rota bazlı kontrol et",
    ],
    amendments: [
      { year: "2005", description: "FAL 9 – elektronik veri değişimi ve basitleştirme" },
      { year: "2016", description: "FAL 12 – ön bildirim gerekliliklerinin standartlaştırılması" },
      { year: "2019", description: "FAL 13 – Maritime Single Window zorunluluğu (2024 yürürlük)" },
      { year: "2024", description: "FAL 14 – dijital sertifika değişimi ve yapay zeka destekli süreçler" },
    ],
    keyArticles: [
      { id: "Section 1", title: "Tanımlar ve Genel Hükümler", summary: "Uygulama kapsamı, tanımlar ve kamu otoritelerinin yükümlülükleri." },
      { id: "Section 2", title: "Geminin Varışı, Kalışı ve Ayrılışı", summary: "Kamu otoritelerine sunulacak belgeler, varış ve ayrılış prosedürleri." },
      { id: "Section 3", title: "Mürettebat ve Yolcu Gereklilikleri", summary: "Mürettebat/yolcu vize, sağlık ve kişisel eşya prosedürleri." },
      { id: "Section 7", title: "Kaçak Yolcu (Stowaway)", summary: "Kaçak yolcu tespiti, bakımı ve geri gönderme prosedürleri." },
    ],
    penalties: [
      "FAL form eksikliğinde geminin yanaşma izninin gecikmesi",
      "Maritime Single Window uyumsuzluğunda ceza mekanizması (liman devletine göre değişir)",
      "Kaçak yolcu prosedürü ihlallerinde sorumluluk",
    ],
    detailedSections: [
      {
        heading: "Bürokrasiyi azaltarak ticareti hızlandırmak",
        body:
          "FAL Sözleşmesi, emniyet ya da çevre değil; verimlilik odaklı tek IMO sözleşmesidir. Amacı, bir geminin limana giriş ve çıkışında istenen belge ve formaliteleri en aza indirmek, standartlaştırmak ve mümkün olduğunca elektronik hale getirmektir. Gereksiz evrak ve tekrar eden bildirimler hem gemiyi limanda bekletir hem de ticaret maliyetini artırır. FAL, kamu otoritelerinin (gümrük, sınır, sağlık, liman) gemiden isteyebileceği bilgileri ortak bir forma kavuşturarak bu sürtünmeyi azaltır ve uluslararası deniz ticaretini akıcı kılar.",
      },
      {
        heading: "Standart FAL formları",
        body:
          "Sözleşmenin pratik omurgası, dünya çapında tanınan standart beyan formlarıdır: Genel Beyanname (FAL 1), Yük Beyanı (FAL 2), Kumanya Beyanı (FAL 3), Mürettebat Eşyası Beyanı (FAL 4), Mürettebat Listesi (FAL 5), Yolcu Listesi (FAL 6) ve Tehlikeli Yük Manifestosu (FAL 7). Bu standartlaştırma sayesinde aynı bilgi her limanda farklı formatlarda yeniden hazırlanmak zorunda kalmaz; acente ve gemi yönetimi tek bir veri setini farklı otoritelere sunabilir. Sözleşme ayrıca kaçak yolcu (stowaway) tespiti, bakımı ve geri gönderilmesine ilişkin insani prosedürleri de kapsar.",
      },
      {
        heading: "Maritime Single Window ve dijitalleşme",
        body:
          "FAL'ın son yıllardaki en önemli atılımı, Maritime Single Window (MSW) zorunluluğudur: gemiyle ilgili tüm bildirimlerin tek bir elektronik giriş noktasından, bir kez yapılarak ilgili tüm kurumlarla paylaşılması. Bu, kâğıt formların ve aynı bilginin farklı dairelere defalarca verilmesinin sonunu getirir. En güncel revizyonlar dijital sertifika değişimini ve süreçlerde otomasyonu da kapsamaktadır. Gemi yönetimi açısından FAL uyumu; ön varış bildirimlerini zamanında göndermek, MSW sistemlerine entegre olmak ve mürettebata kaçak yolcu prosedürlerini öğretmek anlamına gelir.",
      },
      {
        heading: "Varış, kalış ve ayrılış prosedürleri (derinlemesine)",
        body:
          "FAL Sözleşmesi, bir geminin limanla etkileşimindeki tüm idari süreci standartlaştırır. Varıştan önce, gemi ön bildirim (pre-arrival notification) ile yük, mürettebat, tehlikeli madde ve sağlık durumu bilgilerini iletir; bu, liman ve sınır otoritelerinin önceden hazırlanmasını sağlar. Limanda kalış sırasında gümrük, göç, sağlık ve liman idarelerinin isteyebileceği bilgiler, sözleşmenin azami olarak izin verdiği belge setiyle sınırlandırılır; sözleşme, kamu otoritelerinin gereksiz veya tekrarlayan belge istemesini engellemeyi amaçlar. Ayrılışta da benzer biçimde formaliteler asgariye indirilir. Bu standartlaşmanın temel aracı, dünya çapında tanınan FAL formlarıdır (Genel Beyanname, Yük, Kumanya, Mürettebat Eşyası, Mürettebat ve Yolcu listeleri, Tehlikeli Yük Manifestosu); aynı veri her limanda yeniden farklı formatta hazırlanmak zorunda kalmaz.",
      },
      {
        heading: "Dijitalleşme, tek pencere ve kaçak yolcu",
        body:
          "FAL'ın çağdaş atılımı, kâğıt formalitelerini elektronik veri değişimine taşımaktır. Maritime Single Window (MSW), gemiyle ilgili tüm bildirimlerin tek bir elektronik giriş noktasından, bir kez yapılarak ilgili tüm kurumlarla paylaşılmasını sağlar; bu, aynı bilginin farklı dairelere defalarca verilmesinin sonunu getirir ve gemiyi limanda bekleten bürokrasiyi azaltır. En güncel revizyonlar dijital sertifika değişimini ve süreçlerde otomasyonu da kapsar. Sözleşme ayrıca insani bir boyut taşır: kaçak yolcu (stowaway) konusunda, kaçak yolcunun tespiti, gemide insani koşullarda barındırılması, bayrak/liman/uğranacak liman devletleri arasında sorumluluğun paylaşılması ve geri gönderilmesine ilişkin standart prosedürler tanımlanır. Böylece FAL, ticareti hızlandırırken hem verimlilik hem insani standartları bir arada gözetir.",
      },
      {
        heading: "Kâğıttan tek pencereye: 2024 MSW zorunluluğunun anlamı",
        body:
          "FAL'ın en köklü dönüşümü, gemi-liman veri alışverişini kâğıt formdan elektronik tek pencereye taşımasıdır. FAL 13 (2019) değişiklikleriyle kabul edilen ve 2024'ten itibaren tüm taraf devlet limanlarında zorunlu hale gelen Maritime Single Window gerekliliği, önceden her kamu otoritesine (gümrük, göç, sağlık, liman başkanlığı, güvenlik) ayrı ayrı ve genellikle kâğıt üzerinde tekrarlanan bildirimleri, tek bir dijital arayüzden bir kez girilen ve ilgili tüm kurumlara otomatik dağıtılan bir veri setine indirger. Bu değişim yalnızca kağıt tasarrufu değildir; aynı bilginin acente, kaptan veya donatan tarafından farklı formatlarda defalarca girilmesi sırasında oluşan tutarsızlık ve gecikme riskini de ortadan kaldırır. Sistemin teknik omurgası, standart FAL formlarının (1-7) verilerini ortak veri modelleri ve mesajlaşma standartlarıyla (örneğin UN/EDIFACT tabanlı veya XML formatlı) taşımaktır; böylece bir gemi acentesi tek bir dosyayı yükleyerek Genel Beyanname, Yük Beyanı, Mürettebat ve Yolcu Listesi bilgilerini eşzamanlı olarak tüm yetkili otoritelere iletebilir. Gelişmekte olan liman idareleri için bu geçiş, altyapı yatırımı ve personel eğitimi gerektiren ciddi bir kapasite yükümlülüğüdür; IMO bu ülkelere teknik işbirliği programlarıyla destek sağlamaktadır.",
      },
      {
        heading: "FAL formlarının liman uğrağı sekansındaki pratik yeri",
        body:
          "FAL'ın yedi standart formu, soyut bir belge listesi değil, bir liman uğrağının kronolojik akışına birebir karşılık gelen bir iş akışıdır. Varıştan önceki ön bildirim aşamasında gemi acentesi, geminin ETA'sı, yükü ve mürettebatı hakkındaki temel bilgileri (Genel Beyanname'nin taslağı, Yük Beyanı, Tehlikeli Yük Manifestosu) ileterek liman, gümrük ve sağlık otoritelerinin önceden hazırlanmasını sağlar. Varışta, Genel Beyanname (FAL 1) geminin kimliğini ve seyir bilgilerini resmileştirirken, Mürettebat Listesi (FAL 5) ve Yolcu Listesi (FAL 6) göçmenlik/sınır kontrolüne, Kumanya Beyanı (FAL 3) ve Mürettebat Eşyası Beyanı (FAL 4) ise gümrüğe sunulur. Limanda kalış sırasında yük operasyonlarıyla ilgili değişiklikler Yük Beyanında güncellenir. Ayrılışta ise genellikle varıştaki belgelerin bir alt kümesi, güncellenmiş haliyle yeniden sunulur. Bu belgelerin sayısının ve içeriğinin asgari düzeyde tutulması doğrudan liman verimliliğine yansır: bir gemi belge işlemleri nedeniyle rıhtımda veya demirde beklerse bu, hem armatör için demuraj benzeri maliyet hem de liman kapasitesinin verimsiz kullanımı anlamına gelir. Bu yüzden FAL'ın 'gereksiz veya tekrarlayan belge istenemez' ilkesi, doğrudan liman turnaround süresini kısaltan somut bir ekonomik araçtır.",
      },
    ],
    relatedSlugs: ["isps-code"],
    resources: [{ label: "FAL Convention", href: "https://www.imo.org/en/About/Conventions/Pages/Convention-on-Facilitation-of-International-Maritime-Traffic-(FAL).aspx" }],
  },
  {
    slug: "sua-convention",
    label: "SUA – Denizde Yasadışı Eylemlerin Önlenmesi",
    category: "IMO Sözleşmeleri",
    overview: "Gemilere karşı korsanlık, terörizm ve diğer yasadışı eylemlerin önlenmesi, bastırılması ve yargılanması için hukuki çerçeve sağlar.",
    history: "1988'de Achille Lauro gemisi kaçırma olayı sonrasında kabul edilen SUA Sözleşmesi, denizde terörizm ve yasadışı eylemlere karşı hukuki çerçeve sağlamıştır. 2005 Protokolü ile kitle imha silahlarının deniz yoluyla taşınmasının önlenmesi ve boarding yetkileri eklenmiştir.",
    applicability: [
      "Tüm taraf devletlerin karasuları dışındaki deniz alanlarındaki gemiler",
      "Açık denizdeki sabit platformlar (Sabit Platform Protokolü ile)",
      "Kıta sahanlığındaki yapılar",
    ],
    essentials: [
      "Suç tanımları: gemi ele geçirme, yolcu/mürettebata şiddet, gemiye hasar verme",
      "2005 Protokolü ek suçlar: WMD taşıma, gemiyi silah olarak kullanma, tehlikeli madde yayma",
      "Yargı yetkisi ve iade (extradition) düzenlemeleri",
      "Boarding prosedürleri: bayrak devleti izni ile durdurma ve arama yetkileri",
      "Devletlerarası işbirliği ve karşılıklı hukuki yardım mekanizmaları",
      "IMO MSC sirküler kılavuzları: BMP (Best Management Practices) for piracy",
    ],
    actions: [
      "Yüksek riskli bölgelerde BMP uygula (Aden Körfezi, Batı Afrika, Güneydoğu Asya)",
      "Güvenlik seviyesi değişimlerinde SSP prosedürlerini etkinleştir",
      "Yasadışı eylem girişimlerini kıyı devleti ve bayrak devletine derhal raporla",
      "Citadel (güvenli oda) prosedürlerini mürettebatla tatbikat et",
      "Korsan saldırısı önleme ekipmanlarını (razor wire, water cannon, LRAD) hazır bulundur",
    ],
    amendments: [
      { year: "2005", description: "2005 Protokolü – WMD taşımacılığı suçları ve boarding yetkileri eklendi" },
      { year: "2010", description: "Somali korsanlığı karşısında SUA uygulamasının güçlendirilmesi" },
    ],
    keyArticles: [
      { id: "Madde 3", title: "Suç Tanımları", summary: "Gemi ele geçirme, şiddet, hasar verme ve diğer yasadışı eylem tanımları." },
      { id: "Madde 6", title: "Yargı Yetkisi", summary: "Bayrak devleti, ülke devleti ve vatandaşlık temelli yargı yetkisi kuralları." },
      { id: "Madde 8bis (2005)", title: "Boarding Yetkileri", summary: "Devletlerarası gemi durdurma, arama ve boarding işbirliği prosedürleri." },
      { id: "Madde 11", title: "İade (Extradition)", summary: "Suçluların iadesi ve yargılanması mekanizmaları." },
    ],
    penalties: [
      "SUA kapsamındaki suçlar uluslararası düzeyde ağır cezai yaptırım gerektirir",
      "Korsanlık suçu evrensel yargı yetkisine tabidir (UNCLOS Madde 105)",
      "Bayrak devletinin soruşturma yükümlülüğü",
    ],
    detailedSections: [
      {
        heading: "Achille Lauro'dan doğan hukuki çerçeve",
        body:
          "SUA Sözleşmesi, 1985'te Achille Lauro yolcu gemisinin silahlı kişilerce ele geçirilmesi ve bir yolcunun öldürülmesinin ardından, denizde terörizm ve yasadışı eylemlere karşı uluslararası hukukun yetersiz kalması üzerine kurulmuştur. Korsanlığın klasik tanımı (özel çıkar amacıyla, açık denizde, bir gemiden diğerine) pek çok modern saldırıyı kapsamadığı için bir boşluk vardı. SUA bu boşluğu doldurur: gemiye, mürettebata veya yolculara yönelik şiddet, gemiyi ele geçirme ve seyir güvenliğini tehlikeye atma gibi eylemleri suç olarak tanımlar ve devletleri bu suçları kovuşturmaya zorlar.",
      },
      {
        heading: "Suç tanımları, yargı yetkisi ve iade",
        body:
          "Sözleşmenin özü, 'ya yargıla ya iade et' (aut dedere aut judicare) ilkesidir. SUA, hangi eylemlerin suç sayıldığını ayrıntılı tanımlar ve taraf devletlere bayrak, ülke veya vatandaşlık bağına dayalı yargı yetkisi verir. 2005 Protokolü kapsamı genişletmiştir: kitle imha silahlarının deniz yoluyla taşınması, gemiyi bir silah olarak kullanma ve tehlikeli madde yayma da suç kapsamına alınmış; ayrıca devletlerin bayrak devleti izniyle şüpheli gemileri açık denizde durdurup arayabilmesini sağlayan boarding prosedürleri (Madde 8bis) eklenmiştir.",
      },
      {
        heading: "Korsanlıkla mücadelede pratik uygulama",
        body:
          "SUA hukuki çatıyı kurarken, denizdeki günlük korunma BMP (Best Management Practices) gibi operasyonel kılavuzlarla sağlanır. Aden Körfezi, Batı Afrika ve Güneydoğu Asya gibi yüksek riskli bölgelerde gemiler hız ve rota önlemleri alır, dikenli tel ve su topu gibi fiziksel engeller kurar, mürettebatın sığınabileceği bir citadel (güvenli oda) hazırlar ve saldırı durumunda kıyı ve bayrak devletini derhal uyarır. SUA, bu önlemlerin işe yaramadığı ve bir saldırı gerçekleştiği durumda saldırganların kovuşturulmasını ve cezasız kalmamasını güvence altına alan hukuki üst yapıdır; ISPS Code ile birlikte deniz güvenliğinin iki tamamlayıcı ayağını oluşturur.",
      },
      {
        heading: "2005 Protokolü ve boarding yetkileri (derinlemesine)",
        body:
          "SUA'nın 2005 Protokolü, sözleşmeyi 11 Eylül sonrası tehdit ortamına uyarlayarak kapsamını önemli ölçüde genişletmiştir. Yeni suçlar arasında bir gemiyi kitle imha silahı (nükleer, kimyasal, biyolojik) veya bunların yapımına yarayan malzemeleri taşımak için kullanmak, gemiyi bir silah olarak (örneğin bir tesise çarptırmak için) kullanmak ve gemiden tehlikeli madde yayarak ölüm/ciddi yaralanma tehdidi oluşturmak yer alır. Protokolün en pratik yeniliği, Madde 8bis ile getirilen boarding (gemiye çıkma) prosedürleridir: bir devlet, başka bir devletin bayrağını taşıyan ve SUA suçuna karıştığından şüphelenilen bir gemiyi açık denizde durdurup arayabilmek için bayrak devletinden izin isteyebilir; bayrak devleti bu talebe nasıl ve ne sürede yanıt vereceğini önceden belirleyebilir. Bu mekanizma, açık denizde devlet egemenliğini ihlal etmeden yasadışı taşımacılığa müdahale etmenin hukuki yolunu açar.",
      },
      {
        heading: "Yargı yetkisi, iade ve korsanlıkla ilişki",
        body:
          "SUA'nın temel ilkesi 'ya yargıla ya iade et' (aut dedere aut judicare) kuralıdır: taraf devletler, ülkesinde bulunan bir SUA suçlusunu ya kendi mahkemelerinde yargılamak ya da yargılayacak başka bir devlete iade etmek zorundadır; böylece bu suçların cezasız kalmasının önüne geçilir. Sözleşme; bayrak, ülke ve vatandaşlık bağına dayalı yargı yetkisi kuralları ile devletlerarası karşılıklı hukuki yardım mekanizmalarını tanımlar. SUA, korsanlıkla mücadelede önemli bir tamamlayıcıdır: UNCLOS'taki klasik korsanlık tanımı (özel çıkar amacıyla, açık denizde, bir gemiden diğerine) pek çok modern saldırıyı (karasularındaki olaylar, siyasi saldırılar, tek gemi içindeki eylemler) kapsamaz; SUA bu boşluğu doldurarak gemiye yönelik şiddeti suç sayar. Denizdeki günlük korunma ise BMP gibi operasyonel kılavuzlarla sağlanır; SUA, bu önlemlerin yetersiz kaldığı ve bir saldırı gerçekleştiği durumda saldırganların kovuşturulmasını güvence altına alan hukuki üst yapıdır.",
      },
      {
        heading: "SUA, BMP ve savaş gemilerinin korsan gemisine müdahale yetkisi",
        body:
          "Korsanlıkla fiili mücadelede SUA ve operasyonel BMP (Best Management Practices) kılavuzları birbirini tamamlayan iki katman oluşturur: BMP, ticari gemilerin kendi kendini koruma önlemlerini (hız artırma, rota sapması, sivil geminin fiziksel savunması, citadel'e sığınma, deniz gücüne raporlama) düzenlerken SUA, bir saldırı girişiminde devletlerin fiilen müdahale edebilmesinin hukuki temelini sağlar. UNCLOS Madde 105, açık denizde bir savaş gemisinin veya yetkili devlet gemisinin korsan gemisini durdurma, gemiye çıkma (boarding), ele geçirme ve gemideki kişileri tutuklama yetkisini tanır; bu yetki korsanlığın evrensel yargı yetkisine tabi bir suç olmasından, yani hangi devletin bayrağını taşırsa taşısın her devletin kovuşturma hakkına sahip olmasından kaynaklanır. SUA bu çerçeveyi genişletir: bir olay klasik korsanlık tanımına (açık denizde, özel çıkar amacıyla) girmese bile SUA kapsamındaki bir suç (gemi ele geçirme, mürettebata şiddet, seyir güvenliğini tehlikeye atma) oluşturuyorsa, 2005 Protokolünün Madde 8bis boarding prosedürleri devreye girer ve bayrak devletinin izniyle şüpheli gemiye çıkılabilir. Aden Körfezi ve Somali açıklarındaki uluslararası deniz güçleri operasyonları (Combined Task Force 151, EU NAVFOR Atalanta gibi) pratikte tam olarak bu iki hukuki temelin (UNCLOS Madde 105 korsanlık yetkisi ve SUA suç tanımları) birleşimine dayanır; yakalanan şüpheliler genellikle bölgedeki bir taraf devlette SUA veya ulusal korsanlık mevzuatı kapsamında yargılanır.",
      },
      {
        heading: "2005 Protokolünün genişleyen kapsamı: WMD ve nükleer/çevresel terör",
        body:
          "2005 Protokolü, SUA'yı klasik gemi kaçırma senaryosunun ötesine taşıyarak kitle imha silahlarının (WMD) deniz yoluyla yayılmasını ve gemilerin çevresel/nükleer terör aracı olarak kullanılmasını da suç kapsamına almıştır. Yeni suç tanımları arasında bir gemiyi nükleer, kimyasal veya biyolojik silah ya da bunların üretiminde kullanılan hassas malzeme veya teknolojiyi taşımak için kullanmak, bir gemiyi ölüm veya ciddi yaralanmaya yol açacak biçimde bir silah gibi kullanmak (örneğin bir tesise veya başka bir gemiye çarptırmak) ve gemiden petrol, sıvılaştırılmış gaz veya diğer tehlikeli/zararlı maddeleri kasıtlı olarak yayarak çevresel veya insani zarar tehdidi oluşturmak yer alır. Bu genişleme, SUA'yı klasik bir 'gemi güvenliği' sözleşmesinden, deniz yoluyla gerçekleştirilebilecek kitlesel yıkım senaryolarına karşı bir hukuki bariyere dönüştürmüştür. Jurisdiksiyon ve iade mekanizması aynı 'ya yargıla ya iade et' mantığıyla işler, ancak WMD suçlarının uluslararası niteliği nedeniyle devletlerarası istihbarat paylaşımı ve karşılıklı hukuki yardım taleplerinin önceliği ve aciliyeti daha yüksektir; bir devlet, kendi topraklarında SUA 2005 kapsamında bir şüpheliyi tespit ettiğinde, bu kişiyi yargılamak veya derhal talep eden bir devlete iade etmek için hızlandırılmış prosedürler işletmekle yükümlüdür. Protokol ayrıca sabit platformlara yönelik benzer suçları düzenleyen paralel bir protokolle (Sabit Platform Protokolü) tamamlanmıştır.",
      },
    ],
    relatedSlugs: ["isps-code", "solas"],
    resources: [{ label: "SUA Convention", href: "https://www.imo.org/en/About/Conventions/Pages/SUA-Treaties.aspx" }],
  },
];
