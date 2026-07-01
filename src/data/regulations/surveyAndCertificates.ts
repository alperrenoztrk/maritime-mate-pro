import type { RegulationItem } from "./types";

export const surveyRegulations: RegulationItem[] = [
  {
    slug: "psc",
    label: "PSC – Liman Devleti Kontrolü",
    category: "Denetim & Sörvey",
    overview: "Liman devletlerinin yabancı bayraklı gemileri uluslararası standartlara uyum açısından denetlemesi; eksiklik ve alıkoyma riski taşır.",
    history: "PSC kavramı SOLAS ve MARPOL sözleşmelerinde yer almakla birlikte, sistematik uygulama 1982 Paris MoU ile başlamıştır. UNCLOS Madde 218-220 liman devletinin denetim yetkisini tanımlar. Günümüzde 9 bölgesel MoU (Paris, Tokyo, Indian Ocean, Mediterranean, Viña del Mar, Riyadh, Black Sea, Abuja, Caribbean) dünya çapında PSC koordinasyonu sağlamaktadır. IMO Resolution A.1138(31) global PSC prosedürlerini belirler.",
    applicability: [
      "Uluslararası sefer yapan tüm yabancı bayraklı gemiler",
      "Liman devletinin yargı alanındaki sularında bulunan gemiler",
      "Risk tabanlı hedefleme ile öncelikli denetim – gemi yaşı, tipi, bayrak ve klas performansı, geçmiş denetim sonuçları",
      "9 bölgesel MoU aracılığıyla küresel kapsam",
    ],
    essentials: [
      "Denetim türleri: Initial inspection (sertifika ve genel durum), more detailed inspection (teçhizat ve operasyonel kontrol), expanded inspection (HRS, yolcu, tanker için zorunlu)",
      "Denetim kapsamı: sertifika geçerliliği, teçhizat durumu ve bakımı, mürettebat yeterliliği ve dokümanları, operasyonel prosedürler (ISM, ISPS, MARPOL), yapısal bütünlük",
      "Eksiklik kodları: 17 ana kategori – sertifikalar, yapısal, yangın güvenliği, can kurtarma, seyir güvenliği, MARPOL, ISM, ISPS, MLC, BWM vb.",
      "Eksiklik aksiyonları: kod 10 (düzeltilmiş), kod 15 (sonraki limanda düzeltme), kod 16 (14 gün içinde), kod 17 (bayrak devletine bildirim), kod 30 (alıkoyma), kod 45 (RO bildirim)",
      "Alıkoyma (detention) kriterleri: ciddi eksiklik veya birden fazla alanda yetersizlik – gemi seyir yapamaz duruma gelinceye kadar",
      "Risk profili: HRS (High Risk Ship), SRS (Standard Risk), LRS (Low Risk) – bölgesel MoU'ya göre hesaplama",
      "CIC (Concentrated Inspection Campaign): yılda 1-2 kez belirli konulara (BWM, STCW, SOLAS yangın, ISM) odaklanan kampanyalar",
      "Bölgesel MoU'lar ve bilgi sistemleri: THETIS (Paris), APCIS (Tokyo), IOMIS (Indian Ocean) vb.",
      "Clear grounds: initial inspection sırasında daha detaylı denetim gerektirecek bulgular",
      "Operational control: yangın tatbikatı, cankurtarma tatbikatı, dümen testi gibi operasyonel testler",
    ],
    actions: [
      "Tüm sertifikaları güncel ve gemide erişilebilir durumda bulundur",
      "Teçhizat bakım kayıtlarını düzenli tut ve servis tarihlerini izle",
      "PSC denetimi öncesi iç denetim (pre-PSC checklist) yap: yangın, can kurtarma, seyir, MARPOL",
      "Eksiklikleri hızlı kapat ve kanıtla (fotoğraf, test raporu, servis kaydı)",
      "CIC kampanya temalarını önceden mürettebatla gözden geçir ve tatbikatları tamamla",
      "Gemi risk profilini bölgesel MoU portallarından düzenli kontrol et",
      "Mürettebatın sertifika ve eğitim kayıtlarını kontrol et (STCW endorsement, MLC uyumu)",
      "Geçmiş denetim raporlarını analiz ederek tekrar eden eksiklikleri (recurring deficiencies) gider",
    ],
    amendments: [
      { year: "1982", description: "Paris MoU kuruldu – ilk bölgesel PSC koordinasyonu" },
      { year: "2011", description: "Paris MoU NIR (New Inspection Regime) uygulamaya geçti" },
      { year: "2017", description: "IMO Resolution A.1138(31) – güncellenmiş PSC prosedürleri" },
      { year: "2021", description: "CIC kampanya kapsamı genişletildi (BWM, Cyber Security)" },
    ],
    keyArticles: [
      { id: "IMO Res. A.1138(31)", title: "PSC Prosedürleri", summary: "Liman devleti kontrolü için IMO prosedürleri, denetim kapsamı ve kılavuzları." },
      { id: "SOLAS Kural I/19", title: "SOLAS PSC Yetkisi", summary: "SOLAS kapsamında liman devletinin denetim yetkisi ve alıkoyma koşulları." },
      { id: "MARPOL Madde 5-6", title: "MARPOL PSC Yetkisi", summary: "MARPOL kapsamında çevre uyumu denetim yetkileri." },
      { id: "Paris MoU NIR", title: "Yeni Denetim Rejimi", summary: "Risk tabanlı hedefleme ve HRS/SRS/LRS sınıflandırma sistemi." },
    ],
    penalties: [
      "Eksiklik tespitinde düzeltme talebi ve takip denetimi (belirli süre içinde)",
      "Ciddi eksikliklerde geminin alıkonması (detention) – gemi seyir yapamaz",
      "Tekrar eden alıkonmalarda bölgesel ban listesine alınma (Paris MoU: 3+ detention → ban)",
      "Bayrak devleti performans tablosu: White/Grey/Black list sıralamasına etkisi",
      "Alıkoyma kaldırma koşulları: tüm eksikliklerin giderilmesi, klas/bayrak onayı, ek denetim (masraflar armatöre ait)",
    ],
    detailedSections: [
      {
        heading: "Bayrak devletinin son güvenlik ağı",
        body:
          "Liman Devleti Kontrolü (PSC), bayrak devleti denetiminin zayıf kaldığı yerlerde devreye giren bağımsız bir denetim katmanıdır. İlke şudur: bir geminin emniyetinden öncelikle bayrağı sorumludur, ancak bazı bayraklar bu görevi yeterince yerine getirmez (kolay bayraklar). PSC, geminin uğradığı limanın devletine, o gemiyi uluslararası standartlara uyum açısından denetleme yetkisi vererek bu boşluğu kapatır. Böylece standart altı gemiler bayrağı ne olursa olsun bir limanda yakalanabilir. Dünya, dokuz bölgesel mutabakat zaptı (MoU) aracılığıyla bu denetimleri koordine eder ve bilgi paylaşır.",
      },
      {
        heading: "Risk tabanlı hedefleme ve denetim türleri",
        body:
          "Her gemiyi her seferinde denetlemek imkânsız olduğundan PSC, kaynaklarını riske göre yönlendirir. Geminin yaşı, tipi, bayrak ve klas performansı ile geçmiş denetim sonuçlarına dayanan bir risk profili hesaplanır; gemi Yüksek (HRS), Standart (SRS) veya Düşük (LRS) riskli olarak sınıflandırılır ve denetim sıklığı buna göre belirlenir. Denetim, sertifika ve genel durumu inceleyen ilk denetimden (initial), 'clear grounds' (şüphe uyandıran bulgu) halinde daha ayrıntılı denetime ve tanker/yolcu gemilerinde zorunlu genişletilmiş denetime kadar derinleşir. Yangın ve can kurtarma tatbikatı, dümen testi gibi operasyonel kontroller de yapılabilir.",
      },
      {
        heading: "Eksiklikler, alıkoyma ve sonuçları",
        body:
          "Denetimde bulunan her eksiklik standart kodlarla kayda geçer ve bir aksiyon atanır: kimi yerinde düzeltilir, kimi sonraki limana veya belirli bir süreye ertelenir. En ağır sonuç alıkoymadır (detention): gemi, ciddi eksiklikler giderilene kadar seferden alıkonur ve bu süre boyunca ticari kayıp yaşar. Tekrarlayan alıkoymalar geminin bölgesel giriş yasağına (ban) kadar gidebilir. Sonuçlar tek gemiyle de sınırlı değildir: alıkoymalar bayrak devletinin White/Grey/Black liste sıralamasını etkiler, bu da o bayrağın tüm gemilerinin denetim sıklığını belirler. Bu yüzden gemiler limana girmeden iç denetim (pre-PSC) yapar ve eksiklikleri önceden kapatır.",
      },
      {
        heading: "Denetim türleri ve aşamaları (derinlemesine)",
        body:
          "PSC denetimi tek tip değildir; bir piramit gibi derinleşir. İlk denetim (initial inspection) sertifikaların geçerliliğini, geminin genel durumunu ve mürettebatın temel uyumunu kontrol eder; çoğu denetim burada başlar ve biter. Ancak denetçi 'clear grounds' (daha derin incelemeyi haklı kılan somut bulgular – örneğin eksik sertifika, hasarlı ekipman, bilgisiz mürettebat) tespit ederse daha ayrıntılı denetime (more detailed inspection) geçer ve gemiyi sistematik olarak inceler. Tanker, yolcu gemisi ve dökme yük gemisi gibi yüksek riskli tipler ile yüksek riskli gemilerde genişletilmiş denetim (expanded inspection) zorunludur; bu, yapısal alanlardan operasyonel sistemlere kadar geniş bir kapsamı kapsar. Denetim yalnızca belge incelemesi değildir: yangın ve can kurtarma tatbikatı, dümen testi ve acil jeneratör çalıştırma gibi operasyonel kontroller de yapılabilir.",
      },
      {
        heading: "Eksiklik kodları ve aksiyonlar",
        body:
          "Denetimde bulunan her eksiklik, standartlaştırılmış bir kodla kayda geçer ve ona bir düzeltme aksiyonu atanır. Bazı eksiklikler yerinde düzeltilir (kod 10), bazıları sonraki limanda (kod 15) veya belirli bir süre içinde (kod 16, örneğin 14 gün) giderilmek üzere ertelenir, bazıları bayrak devletine veya klas kuruluşuna bildirilir (kod 17/45). En ağır aksiyon alıkoymadır (kod 30): gemi, ciddi eksiklikler giderilip emniyetli hale gelene kadar limandan ayrılamaz. Eksiklikler 17 ana kategoride toplanır (sertifikalar, yapısal güvenlik, yangın güvenliği, can kurtarma, seyir güvenliği, MARPOL, ISM, ISPS, MLC, BWM vb.) ve yüzlerce alt kod içerir. Bu standartlaşma, dünyanın her limanındaki denetçinin aynı dili konuşmasını ve sonuçların bölgesel veritabanlarında (THETIS, APCIS) tutarlı biçimde paylaşılmasını sağlar.",
      },
      {
        heading: "CIC kampanyaları ve hazırlık stratejisi",
        body:
          "Bölgesel MoU'lar, yılda bir veya iki kez Yoğunlaştırılmış Denetim Kampanyaları (CIC – Concentrated Inspection Campaign) düzenler. Bunlar, belirli bir konuya (örneğin balast suyu yönetimi, STCW dinlenme saatleri, yangın güvenliği, kapalı mahal girişi) odaklanan ve genellikle birkaç ay süren özel denetim dönemleridir; kampanya sırasında o konu standart denetime ek bir soru listesiyle derinlemesine incelenir. Gemiler için en akılcı yaklaşım, yürürlükteki CIC temasını önceden öğrenmek, ilgili prosedür ve kayıtları gözden geçirmek ve mürettebatla birlikte hazırlanmaktır. Daha genel olarak, denetime hazırlık proaktiftir: gemiler limana girmeden bir iç denetim (pre-PSC checklist) yapar, sertifika ve servis tarihlerini kontrol eder, geçmiş denetim raporlarındaki tekrar eden eksiklikleri giderir ve risk profillerini bölgesel portallardan izler.",
      },
      {
        heading: "Alıkoyma, ban ve bayrak performansının sonuçları",
        body:
          "PSC'nin yaptırım gücü kademeli ama ağırdır. Alıkoyma (detention), geminin doğrudan ticari kaybına yol açar ve eksiklikler giderilip masraflar (ek denetim dahil) karşılanana kadar sürer. Tekrarlayan alıkoymalar bölgesel giriş yasağına (ban/refusal of access) kadar gider; örneğin Paris MoU'da belirli sayıda alıkoymadan sonra gemi giderek uzayan sürelerle, hatta kalıcı olarak bölgeye alınmaz. Sonuçlar tek gemiyle sınırlı değildir: alıkoyma oranları bayrak devletlerinin White/Grey/Black liste sıralamasını belirler ve bu sıralama, o bayrağın tüm gemilerinin denetlenme sıklığını ve risk profilini etkiler. Aynı şekilde klas kuruluşlarının (RO) performansı da izlenir. Böylece PSC, tek bir denetimi aşan, bayrak ve klas düzeyinde sistemik bir kalite baskısı yaratır; standart altı işletmecilik ticari olarak da sürdürülemez hale gelir.",
      },
    ],
    relatedSlugs: ["paris-mou", "tokyo-mou", "ism-code", "solas", "marpol"],
    resources: [
      { label: "Paris MoU", href: "https://www.parismou.org/" },
      { label: "Tokyo MoU", href: "https://www.tokyo-mou.org/" },
    ],
  },
  {
    slug: "flag-state",
    label: "Flag State Inspection – Bayrak Devleti Denetimi",
    category: "Denetim & Sörvey",
    overview: "Bayrak devletinin kendi gemilerini uluslararası sözleşmelere uyum açısından denetlemesi; yetkilendirme, survey ve sertifikasyon süreçlerini kapsar.",
    history: "Bayrak devleti sorumluluğu UNCLOS (Birleşmiş Milletler Deniz Hukuku Sözleşmesi) Madde 94 ve IMO sözleşmelerinin temel ilkesidir. Her devlet, bayrağını taşıyan gemilerin uluslararası standartlara uyumunu sağlamakla yükümlüdür. IMO III Code (Instruments Implementation Code) kapsamında 2016'dan itibaren bayrak devletlerinin performansı zorunlu denetim altına alınmıştır (IMO Member State Audit Scheme – IMSAS). RO Code ile klas kuruluşlarının yetkilendirilmesi ve denetimi düzenlenmektedir.",
    applicability: [
      "Bayrak devletine kayıtlı tüm gemiler (ticari, yolcu, balıkçı – sözleşme kapsamına göre)",
      "RO (Recognized Organization/klas kuruluşu) yetkili olduğu alanlarda bayrak devleti adına hareket eder",
      "Bayrak devleti, RO performansını izlemek ve denetlemek zorundadır",
    ],
    essentials: [
      "Bayrak devleti yetkilendirmesi: gemilerin kayıt, sertifikasyon ve denetim sorumluluğu",
      "RO görevlendirmesi: klas kuruluşlarının RO Code uyumlu yetkilendirilmesi ve performans izleme",
      "Zorunlu survey döngüsü: Initial (ilk), Annual (yıllık), Intermediate (ara – 2.5-3 yıl), Renewal (yenileme – 5 yıl), Additional/Special (ek/özel)",
      "Sertifika düzenleme ve geçerlilik kontrolleri – pencere (window) sistemi: yıllık ±3 ay, ara 2-3 yıl, yenileme 5 yıl (3 ay öncesi – sonrası)",
      "Harmonized Survey System (HSS): farklı sözleşme survey'lerinin koordineli planlanması",
      "IMO III Code – Bayrak devleti denetim şeması (IMSAS): bayrak devletlerinin IMO tarafından denetlenmesi",
      "Casualty investigation yükümlülüğü: Casualty Investigation Code kapsamında ciddi kaza soruşturma",
      "Bayrak devleti performans ölçümü: Paris MoU / Tokyo MoU White/Grey/Black list sıralaması",
      "Annual flag state report: IMO'ya yıllık performans raporu sunma yükümlülüğü",
    ],
    actions: [
      "Survey tarihlerini takip et ve pencere (window) içinde zamanında planla",
      "RO ile koordinasyon sağla: survey planlaması, sertifika düzenleme, bulgu kapatma",
      "Bayrak devleti gerekliliklerini güncel takip et (ulusal mevzuat değişiklikleri)",
      "HSS kapsamında farklı sertifika survey'lerini koordine et (aynı ziyarette birden fazla survey)",
      "Denetim bulgularını hızlı kapat ve düzeltici faaliyet kanıtlarını sun",
      "Bayrak devleti performansını izle: White list'te kalmak PSC avantajı sağlar",
    ],
    amendments: [
      { year: "1993", description: "IMO Resolution A.847(20) – bayrak devleti uygulama kılavuzu" },
      { year: "2013", description: "III Code (Mandatory Instruments Implementation) kabul edildi" },
      { year: "2016", description: "IMSAS – IMO Üye Devlet Denetim Şeması zorunlu olarak başladı" },
      { year: "2017", description: "RO Code zorunlu hale geldi" },
    ],
    keyArticles: [
      { id: "UNCLOS Madde 94", title: "Bayrak Devleti Yükümlülükleri", summary: "Bayrak devletinin gemileri üzerindeki yargı yetkisi ve idari/teknik yükümlülükleri." },
      { id: "III Code", title: "Instruments Implementation Code", summary: "Bayrak devletlerinin IMO sözleşmelerini etkin uygulaması için zorunlu standartlar." },
      { id: "RO Code", title: "Recognized Organization Code", summary: "Klas kuruluşlarının yetkilendirilmesi, performans izleme ve denetim gereklilikleri." },
      { id: "SOLAS Kural I/6-I/14", title: "Survey ve Sertifikasyon", summary: "SOLAS kapsamında survey türleri, sertifika süreleri ve geçerlilik koşulları." },
    ],
    penalties: [
      "Bayrak devletinin sertifika düzenleme yetkisini askıya alması veya geri çekmesi",
      "IMSAS denetiminde uyumsuzluk tespitinde düzeltici eylem zorunluluğu",
      "Grey/Black list'e düşen bayrak devletlerinin gemilerine artan PSC denetimi ve ticari dezavantaj",
      "Klas kuruluşunun (RO) performans yetersizliğinde yetki sınırlandırılması veya geri alınması",
    ],
    detailedSections: [
      {
        heading: "Birincil sorumluluk: bayrak devleti",
        body:
          "Bir gemi hangi devletin bayrağını taşıyorsa, o devletin yargı yetkisi ve sorumluluğu altındadır; bu, UNCLOS Madde 94'ün temel ilkesidir. Bayrak devleti, bayrağını taşıyan gemilerin uluslararası sözleşmelere (SOLAS, MARPOL, STCW, MLC) uyumunu sağlamak, onları kaydetmek, sertifikalandırmak ve denetlemekle yükümlüdür. Bu, sadece bir formalite değil, denizcilik emniyet sisteminin ilk ve en önemli halkasıdır. Bayrak devleti güçlü ve titizse PSC denetimleri büyük ölçüde teyit niteliğinde kalır; zayıfsa, standart altı gemiler sisteme sızar ve bu açığı PSC kapatmaya çalışır.",
      },
      {
        heading: "Klas kuruluşlarına devredilen yetki (RO)",
        body:
          "Hiçbir bayrak devletinin tüm gemilerini fiziksel olarak denetleyecek teknik kapasitesi yoktur; bu yüzden teknik sörvey ve sertifikasyonun büyük kısmı, Tanınmış Kuruluşlara (Recognized Organization – RO), yani klas kuruluşlarına devredilir. Ancak bu devir denetimsiz değildir: RO Code, klas kuruluşlarının nasıl yetkilendirileceğini, performanslarının nasıl izleneceğini ve gerektiğinde yetkinin nasıl geri alınacağını düzenler. Sörvey döngüsü düzenli bir takvime bağlıdır: ilk, yıllık, ara ve beş yıllık yenileme sörveyleri belirli pencereler (window) içinde yapılır; Uyumlaştırılmış Sörvey Sistemi (HSS) farklı sözleşmelerin sörveylerini tek ziyarette toplayarak verimlilik sağlar.",
      },
      {
        heading: "Bayrak devletinin de denetlenmesi: IMSAS",
        body:
          "Uzun süre bayrak devletlerinin performansını denetleyecek bir mekanizma yoktu; bu, kötü performanslı bayrakların hesap vermeden devam etmesine izin veriyordu. III Code ve onunla gelen IMO Üye Devlet Denetim Şeması (IMSAS), 2016'dan itibaren bu boşluğu kapatarak bayrak devletlerinin kendisini de zorunlu denetime tabi kıldı. Ayrıca bayrak devletleri ciddi kazaları Casualty Investigation Code kapsamında soruşturmak ve IMO'ya yıllık performans raporu sunmakla yükümlüdür. Performansın somut göstergesi, Paris/Tokyo MoU White/Grey/Black listeleridir: White listede yer almak, o bayrağın gemilerine PSC'de avantaj sağlar.",
      },
      {
        heading: "Devretmek, sorumluluktan kurtulmak değildir",
        body:
          "RO'ya devredilen sörvey ve sertifikasyon yetkisi, bayrak devletinin sorumluluğunu ortadan kaldırmaz; devredilen yalnızca işin fiilen yapılmasıdır, nihai hesap verebilirlik daima bayrak devletinde kalır. Bir RO, bayrak devleti adına bir sertifika düzenlediğinde, bu sertifikanın arkasında hukuken bayrak devletinin imzası vardır; RO'nun hatalı veya gevşek bir sörvey yapması, PSC alıkoymasına ya da bir kazaya yol açtığında, sorun tek bir RO vakası olarak kalmaz, o RO'yu yetkilendiren bayrak devletinin IMSAS denetimine ve genel performans karnesine yansır. Bu yüzden bayrak devletleri, RO'larıyla ilişkilerini tek yönlü bir yetki devri değil, sürekli izlenmesi gereken bir vekillik (agency) ilişkisi olarak yönetmek zorundadır: RO performans verilerini (bulgu oranları, gecikmeler, tekrarlayan eksiklikler) düzenli gözden geçirmek, yıllık değerlendirme yapmak ve gerektiğinde bir RO'nun yetkisini belirli sertifika türleri veya coğrafi bölgeler için sınırlamak veya tamamen geri çekmek buna dahildir. RO Code bu denetim ilişkisini çift taraflı hesap verebilirlik olarak kurar: RO bayrak devletine, bayrak devleti de IMO'ya karşı sorumludur. Pratikte bu, iyi yönetilen bir bayrağın RO'larını gerçekten denetlediği, kötü yönetilen bir bayrağın ise sertifikasyonu tamamen RO'ya bırakıp kendisi hiçbir doğrulama yapmadığı anlamına gelir; ikinci durum IMSAS'ta ve dolayısıyla PSC istatistiklerinde er ya da geç görünür hale gelir.",
      },
      {
        heading: "HSS pencere mantığı ve operasyonel planlama",
        body:
          "Harmonized Survey System (HSS), farklı sözleşmelerin (SOLAS, MARPOL, Load Line) gerektirdiği sörveyleri ortak bir takvimde birleştirir; bunun amacı bir geminin yılın farklı zamanlarında birbirinden bağımsız sörveylerle sürekli kesintiye uğramasını önlemektir. Yıllık sörveyler, sertifikanın yıldönümü etrafında ±3 aylık bir pencere içinde yapılabilir; bu esneklik, geminin o tarihte hangi limanda veya hangi operasyonda olduğuna bakılmaksızın sörveyörle buluşabilmesini sağlar. Ara sörvey ikinci ile üçüncü yıl arasına, yenileme sörveyi ise beşinci yılın sonuna denk gelecek şekilde planlanır ve yenileme penceresi de benzer bir tolerans (genellikle 3 ay önce – 3 ay sonra) taşır. Bu pencere sistemi armatör için saf bir bürokrasi değil, somut bir operasyonel planlama aracıdır: charter sözleşmeleri, kuru havuz randevuları ve mürettebat değişimleri bu pencerelere göre dizilir, çünkü pencere dışına çıkan bir sörvey sertifikayı fiilen geçersiz kılar ve gemiyi limanda beklemeye veya PSC alıkoymasına maruz bırakır. Bu yüzden operasyon departmanları sörvey takvimini rota planlamasının ayrılmaz bir girdisi olarak ele alır.",
      },
      {
        heading: "Bayrak performansının ticari yansımaları",
        body:
          "Bir bayrağın performansı artık soyut bir istatistik değil, doğrudan ticari bir değişkendir. Sık PSC alıkoyması yaşayan veya IMSAS'ta düşük not alan bir bayrak, Paris/Tokyo MoU gibi listelerde Grey veya Black kategoriye düşer; bu, o bayrağı taşıyan tüm gemilerin PSC'de daha sık ve daha ayrıntılı denetime tabi tutulması demektir, yani her liman uğrağı ek gecikme riski taşır hale gelir. Sigortacılar ve P&I kulüpleri de bayrak performansını risk fiyatlamasına dahil eder; kötü bayraklı gemiler daha yüksek prim öder. Büyük charterer'lar ve oil major'lar ise vetting ve RightShip gibi süreçlerde bayrak performansını doğrudan bir filtre olarak kullanır, bazı büyük şirketler belirli Black list bayraklarını kategorik olarak reddeder. Bu ticari baskı, 'bayrak değiştirme' (flag hopping) olgusunu doğurur: performansı düşen bir gemi, geçmiş kaydını 'temizlemek' amacıyla başka bir bayrağa geçebilir. Sektör bu davranışı olumsuz karşılar, çünkü gemi geçmişi (kaza, alıkoyma kaydı) uluslararası veritabanlarında bayrağı ne olursa olsun izlenebilir kalır ve sık bayrak değiştirme kendisi bir risk göstergesi olarak okunur; ciddi charterer'lar ve sigortacılar bu deseni sorgular.",
      },
    ],
    relatedSlugs: ["class-survey", "psc", "solas"],
    resources: [{ label: "IMO Flag State Implementation", href: "https://www.imo.org/en/OurWork/IIIS/Pages/Flag%20State%20Implementation.aspx" }],
  },
  {
    slug: "class-survey",
    label: "Class Survey – Klas Denetimi",
    category: "Denetim & Sörvey",
    overview: "Klas kuruluşunun geminin yapısal ve mekanik bütünlüğünü değerlendirmesi; klas notasyonu ve sertifikasyonu için gereklidir.",
    history: "Denizcilik klas kuruluşları 1760'ta Lloyd's Coffee House'da başlayan gemi değerlendirmesiyle ortaya çıkmıştır. Lloyd's Register (1764) dünyanın ilk klas kuruluşudur. Günümüzde IACS (International Association of Classification Societies) üyesi 11 büyük klas kuruluşu dünya ticaret filosunun %90'ından fazlasını sınıflandırır. Klas kuruluşları hem bağımsız klas denetimi yapar hem de bayrak devleti adına RO olarak sertifikasyon hizmeti verir.",
    applicability: [
      "Sigorta, charterer ve bayrak devleti gerekliliklerini karşılamak isteyen tüm gemiler",
      "Ticari sefer yapan hemen tüm gemiler fiilen klas kuruluşu denetimine tabidir",
      "IACS üyeleri: LR (Lloyd's Register), DNV, BV (Bureau Veritas), ABS, ClassNK, KR (Korean Register), CCS (China Classification Society), RINA, IRS (Indian Register), CRS (Croatian Register), PRS (Polish Register)",
    ],
    essentials: [
      "Survey döngüsü: 5 yıllık class renewal (special survey) + yıllık (annual) + ara (intermediate) denetimler",
      "Special Survey (SS): her 5 yılda kapsamlı yapısal ve mekanik muayene – havuz denetimi dahil",
      "Annual Survey (AS): her yıl ±3 ay penceresi içinde genel durum kontrolü",
      "Intermediate Survey (IS): 2. veya 3. yılda (yaş ve tipe göre) genişletilmiş yapısal kontrol",
      "Klas notasyonları: gövde (hull), makine (machinery) + ek notlar: ice class, automation (UMS/CMS), green passport, BWM, cyber resilience vb.",
      "Yapısal muayene: kalınlık ölçümleri (UTM – Ultrasonic Thickness Measurement), yakın görsel muayene (close-up survey), çatlak testi (NDT)",
      "Makine ve elektrik tesisleri denetimi: performans testleri, yağ analizi, titreşim ölçümü, alarm testleri",
      "Condition of Class (CoC): süre sınırlı düzeltme talepleri – belirli süre içinde tamamlanmazsa klas askıya alınır",
      "Recommendation: klas tarafından önerilen ama zorunlu olmayan düzeltmeler",
      "Continuous Survey: Machinery (CSM) ve Hull (CSH) – survey maddelerinin 5 yıla yayılması seçeneği",
      "IACS Unified Requirements (UR): tüm IACS üyelerinin uyguladığı ortak teknik standartlar",
    ],
    actions: [
      "Survey tarihlerini klas ile koordine et ve pencere içinde planla",
      "Kalınlık ölçüm raporlarını hazırla ve korozyon trendini izle (özellikle ballast tankları)",
      "Klas bulgularını (CoC, recommendations) zamanında kapat ve kanıtları sun",
      "Klas sertifikalarını güncel tut ve sertifika-survey uyumunu kontrol et",
      "CoC maddeleri için düzeltme planını ve süresini takip et – süre aşımı klas askıya alma riski taşır",
      "CSM/CSH tercih ediliyorsa planlama döngüsünü klas ile koordine et",
      "Havuz denetimi öncesi survey spesifikasyonunu hazırla ve klas ile paylaş",
    ],
    amendments: [
      { year: "2006", description: "IACS UR Z10 – Hull survey gereklilikleri güncellendi" },
      { year: "2015", description: "IACS UR Z7 – Survey planlaması ve CoC prosedürleri güncellendi" },
      { year: "2020", description: "Uzaktan denetim (remote survey) kılavuzları yayımlandı (COVID-19 etkisi)" },
      { year: "2022", description: "Klas notasyonlarında cyber resilience ve GHG notasyonları eklendi" },
    ],
    keyArticles: [
      { id: "IACS UR Z10", title: "Hull Surveys", summary: "Gövde yapısal survey gereklilikleri: kalınlık ölçümü, close-up survey ve kaplama değerlendirmesi." },
      { id: "IACS UR Z7", title: "Survey Planlaması", summary: "Survey zamanlaması, pencere sistemi ve CoC yönetimi prosedürleri." },
      { id: "IACS UR Z17", title: "Procedural Requirements", summary: "IACS üyelerinin survey ve sertifikasyon prosedürlerinde uyması gereken ortak standartlar." },
      { id: "RO Code", title: "Recognized Organization", summary: "Klas kuruluşlarının bayrak devleti adına yetkilendirilmesi ve performans izleme." },
    ],
    penalties: [
      "Condition of Class (CoC) kapatılmadığında klas askıya alınması (class suspension)",
      "Klas askıya alındığında: deniz sigortası geçersiz olabilir, charterer kabul etmeyebilir, sertifikalar geçerliliğini yitirebilir",
      "Klas kaybında (class withdrawal) bayrak devleti sertifikalarının da geçersiz olması → gemi seferden men",
      "Overdue survey'de klas otomatik askıya alınır",
      "Klas notasyonu kaybında ticari ve operasyonel dezavantaj",
    ],
    detailedSections: [
      {
        heading: "Klasın doğuşu ve işlevi",
        body:
          "Klas kuruluşları, denizcilik tarihinin en eski risk yönetim kurumlarıdır; kökenleri 18. yüzyılda Londra'da tüccarların ve sigortacıların gemilerin durumunu ortak bir ölçüye göre değerlendirme ihtiyacına dayanır. Bugün bir klas kuruluşu, bir geminin gövdesinin ve makinelerinin kendi yayımladığı teknik kurallara uygun tasarlandığını, inşa edildiğini ve bakımının yapıldığını bağımsız olarak doğrular. 'Klasta' (in class) olmak, geminin yapısal ve mekanik olarak sağlam kabul edilmesidir; bu, sigortanın geçerliliği, kiracının kabulü ve bayrak sertifikalarının dayanağı için fiilen zorunludur. IACS üyesi büyük kuruluşlar dünya filosunun büyük çoğunluğunu sınıflandırır.",
      },
      {
        heading: "Sörvey döngüsü ve yapısal muayene",
        body:
          "Klas denetimi süreklidir ve beş yıllık bir döngü etrafında kurulur. Her yıl genel durumu kontrol eden yıllık sörveyler, 2-3. yıl arasında genişletilmiş ara sörvey ve beşinci yılda en kapsamlı olan özel sörvey (special survey) yapılır; bu sonuncusu genellikle havuz denetimini de içerir. Yapısal muayene yüzeysel bakıştan ibaret değildir: ultrasonik kalınlık ölçümleri (UTM) çelikteki incelmeyi (korozyon) sayısallaştırır, yakın görsel muayene (close-up survey) tank içi yapısal detayları inceler, tahribatsız testler (NDT) çatlakları arar. Özellikle balast tanklarındaki korozyon trendi yıllar boyunca izlenir.",
      },
      {
        heading: "Bulgular, koşullar ve klasın kaybı",
        body:
          "Denetimde tespit edilen sorunlar iki kategoriye ayrılır: belirli bir süre içinde giderilmesi zorunlu olan 'Condition of Class' (CoC) ve tavsiye niteliğindeki recommendation'lar. Bir CoC zamanında kapatılmazsa veya bir sörvey süresi aşılırsa klas askıya alınır (suspension). Bunun sonuçları ağırdır: klas askıya alındığında deniz sigortası geçersiz olabilir, kiracılar gemiyi reddeder ve bayrak sertifikaları geçerliliğini yitirebilir, yani gemi fiilen sefer yapamaz hale gelir. Bu yüzden klas yönetimi, gemi işletmeciliğinin sürekli ve ihmal edilemez bir parçasıdır. ESP ve havuz denetimi gibi özel sörvey rejimleri de bu çerçevenin parçalarıdır.",
      },
      {
        heading: "UTM ve close-up survey'in teknik mantığı",
        body:
          "Ultrasonik kalınlık ölçümü (UTM), bir çelik plakanın üzerine yerleştirilen probun ses dalgalarının karşı yüzeyden geri dönüş süresini ölçerek kalınlığı hesaplaması esasına dayanır; bu, çeliği kesmeden veya zarar vermeden korozyon kaybını sayısallaştıran pratik bir yöntemdir. Ölçümler rastgele değil, geminin yapısal yükünü en çok taşıyan ve en çok korozyona maruz kalan 'kritik yapısal alanlar' (CSA) etrafında yoğunlaşır: çift dip yapıları, balast tankı iç yüzeyleri, ambar dip köşeleri ve güverte kirişleri gibi bölgeler. Yakın görsel muayene (close-up survey) ise ölçümün ötesine geçer: sörveyör, iskele veya sal (staging/rafting) ile bu yapısal elemanlara fiziksel olarak yaklaşır ve çatlak, deformasyon veya kaynak hatası gibi ölçümle yakalanamayacak kusurları gözle ve gerekirse tahribatsız test (NDT) ile arar. Gemi yaşlandıkça bu odak daha da sıkılaşır: gençlik döneminde seyrek örneklenen bölgeler, orta ve ileri yaşta sistematik olarak taranır, çünkü yorulma ve korozyon zamanla hızlanan, doğrusal olmayan bir süreçtir ve geçmiş ölçüm trendleri gelecekteki bozulma hızını tahmin etmenin tek güvenilir yoludur.",
      },
      {
        heading: "Standart altı bulgunun sonuçları: CoC'den withdrawal'a",
        body:
          "Bir sörveyör standart altı bir durum bulduğunda klasın elindeki araçlar kademelidir. En hafif uçta, zorunlu olmayan ama kayda geçen 'recommendation' bulunur. Daha ciddi bulgular 'Condition of Class' (CoC) olarak kaydedilir ve belirli bir süre (genellikle birkaç ay, bazen bir sonraki limana kadar) içinde kapatılması şart koşulur; bu süre boyunca gemi klasta kalır ama takip altındadır. Süre aşılır ve düzeltme yapılmazsa klas askıya alınır (suspension) — bu, geminin klas gerekliliklerine artık uymadığının resmi tespitidir ve genellikle geri döndürülebilir. En ağır sonuç klasın tamamen geri alınmasıdır (withdrawal); bu, sadece bir askıya alma değil, klas kuruluşunun gemiyle ilişkisini sonlandırmasıdır ve yeniden klasa girmek sıfırdan bir değerlendirme gerektirir. Withdrawal'ın pratik sonuçları hızla zincirlenir: P&I kulüpleri ve kasko sigortacıları poliçelerini genellikle 'klasta olma' koşuluna bağladığından, klas kaybı sigorta teminatının fiilen sona ermesi anlamına gelir; bir kaza veya kirlilik olayında sigortacı ödemeyi reddedebilir. Bayrak devleti sertifikaları da çoğunlukla klas onayına dayandığından, withdrawal bu sertifikaların da askıya alınmasına ve geminin sefer yapamaz hale gelmesine yol açar.",
      },
      {
        heading: "Klas ile bayrak/PSC arasındaki sınır",
        body:
          "Klas sertifikası ile bayrak devleti statüter sertifikaları (SOLAS, MARPOL kapsamındaki belgeler) sıkça karıştırılır, ama hukuken ayrı sistemlerdir. Klas, geminin yapısal ve mekanik olarak kendi teknik kurallarına uygun tasarlandığını ve bakımının yapıldığını özel hukuk sözleşmesi temelinde doğrular; bu bir devlet yetkisi değil, armatör ile klas kuruluşu arasındaki ticari bir ilişkidir. Statüter uyum ise devletlerarası sözleşmelerden (SOLAS, MARPOL, MLC) doğan kamu hukuku yükümlülüğüdür ve nihai sorumluluk bayrak devletindedir. Pratikte bu iki sistem büyük ölçüde örtüşür, çünkü çoğu bayrak devleti statüter sertifikasyonu klas kuruluşuna RO sıfatıyla devreder ve aynı sörveyör aynı ziyarette hem klas hem statüter kontrolleri yapar. Ancak örtüşme tam değildir: bir gemi klasta olsa da ISM, ISPS veya MLC gibi tamamen operasyonel/idari alanlardaki bir eksiklik klas kapsamına girmez ve PSC'de ayrı bir eksiklik olarak kayda geçer. Tersine, klas kaybı otomatik olarak bir PSC alıkoymasına dönüşür, çünkü statüter sertifikaların geçerliliği çoğu zaman klas onayına bağlıdır. Bu yüzden 'klas sertifikası var' demek 'statüter uyum tamdır' demek değildir; ikisi paralel ama hukuken bağımsız güvence katmanlarıdır.",
      },
    ],
    relatedSlugs: ["flag-state", "esp", "dry-dock"],
    resources: [{ label: "IACS", href: "https://iacs.org.uk/" }],
  },
  {
    slug: "vetting",
    label: "Vetting Inspection – Kiralayan Denetimi",
    category: "Denetim & Sörvey",
    overview: "Petrol şirketleri ve charterer'ların gemileri SIRE, CDI, OVID gibi standartlara göre denetlemesi; ticari kabul için kritik öneme sahiptir.",
    history: "SIRE (Ship Inspection Report Programme) 1993'te OCIMF (Oil Companies International Marine Forum) tarafından tanker emniyetini değerlendirmek amacıyla başlatılmıştır. 2023'te köklü bir güncellemeyle SIRE 2.0'a geçilmiş; tablet tabanlı, algoritma destekli ve CAQ (Computer Assisted Questioning) formatına sahip daha kapsamlı bir denetim sistemi uygulanmaya başlanmıştır. CDI (Chemical Distribution Institute) 1994'te kimyasal tankerler için başlatılmıştır.",
    applicability: [
      "Petrol tankerleri: SIRE / SIRE 2.0 kapsamında",
      "Kimyasal tankerler: CDI denetim programı kapsamında",
      "Gaz tankerleri: SIRE kapsamında",
      "Offshore destek gemileri: OVID (OCIMF Vessel Inspection Database) kapsamında",
      "Dökme yük gemileri: RightShip değerlendirmesi (ayrı slug)",
      "Charterer ve terminal kabul kriterleri kapsamındaki tüm tankerler",
    ],
    essentials: [
      "SIRE 2.0: tablet tabanlı denetim, CAQ (Computer Assisted Questioning) sistemi – soruların gemi tipine ve operasyona göre dinamik belirlenmesi",
      "SIRE 2.0 kapsamı: 13 bölüm – General, Certification, Crew Management, Navigation, Safety, Pollution Prevention, Structural, Mooring, Cargo/Ballast, Engine, vb.",
      "CDI (Chemical Distribution Institute): kimyasal tanker denetim programı – SIRE'ye benzer format ama kimyasal taşıma odaklı",
      "OVID (OCIMF Vessel Inspection Database): offshore destek gemileri için vetting denetimi",
      "VIQ (Vessel Inspection Questionnaire) – SIRE 2.0'da HVPQ (Harmonised Vessel Particulars Questionnaire) ile desteklenir",
      "Denetim sıklığı: genellikle 6-12 ay (charterer/terminal talebi), SIRE raporları 12 ay geçerli",
      "Observation sınıflandırması: negative observation (düzeltme gerekli), positive observation (iyi uygulama)",
      "Inspection raporu paylaşımı: SIRE/CDI raporları üye şirketlerle paylaşılır – tüm potansiyel charterer'lar görebilir",
    ],
    actions: [
      "Vetting denetimi öncesi iç denetim yap (pre-vetting checklist – SIRE 2.0 formatına uygun)",
      "Tüm dokümantasyonu güncel, düzenli ve erişilebilir tut (ISM, ISPS, MARPOL kayıtları)",
      "Mürettebatı SIRE 2.0 CAQ formatı konusunda eğit: sorulara doğru ve güvenle yanıt verme",
      "Gözlemleri (negative observations) hızlı kapat ve kanıtları sisteme yükle (OCIMF platformu)",
      "Geçmiş denetim raporlarını analiz ederek tekrar eden bulguları (recurring observations) gider",
      "Key personnel (Master, Chief Officer, Chief Engineer) bilgi ve yetkinliğini değerlendir",
      "Denetim öncesi deck walkthrough ve engine room tour hazırlığı yap",
    ],
    amendments: [
      { year: "1993", description: "SIRE programı OCIMF tarafından başlatıldı" },
      { year: "1994", description: "CDI programı başlatıldı" },
      { year: "2020", description: "SIRE 2.0 pilot programı başladı" },
      { year: "2023", description: "SIRE 2.0 tam uygulamaya geçti – eski SIRE aşamalı olarak sonlandırılıyor" },
    ],
    keyArticles: [
      { id: "SIRE 2.0 Framework", title: "Denetim Çerçevesi", summary: "CAQ tabanlı denetim metodolojisi, soru akışı ve değerlendirme kriterleri." },
      { id: "HVPQ", title: "Harmonised Vessel Particulars", summary: "Gemi özellikleri ve operasyonel bilgilerin standart formatında toplanması." },
      { id: "TMSA 3", title: "Tanker Management Self Assessment", summary: "Tanker yönetim şirketlerinin kendi performansını değerlendirme çerçevesi." },
    ],
    penalties: [
      "Yetersiz vetting raporu sonucunda charterer tarafından geminin reddedilmesi (commercial rejection)",
      "Negative observation kapatılmayana kadar geminin yeni charterer kabul etmemesi",
      "Düşük SIRE performansı ile sigorta prim artışı riski",
      "Terminal tarafından geminin limana kabul edilmemesi",
      "Şirket TMSA puanının düşmesi ile filo genelinde ticari dezavantaj",
    ],
    detailedSections: [
      {
        heading: "Regülasyonun ötesinde ticari denetim",
        body:
          "Vetting, devletlerin değil ticari aktörlerin (petrol şirketleri, kiracılar, terminaller) yürüttüğü bir denetim katmanıdır. Mantığı basittir: yükünü bir gemiye emanet edecek olan taraf, o geminin standartlara uyduğunu kendisi görmek ister; çünkü bir tanker kazasının sorumluluğu ve itibar zararı yük sahibine de yansır. Bu yüzden zorunlu olmasa da vetting fiilen zorunludur: vetting onayı olmayan bir tanker iş bulamaz. SIRE (petrol/gaz tankerleri), CDI (kimyasal tankerler) ve OVID (offshore gemiler) bu denetimin standartlaştırılmış formatlarıdır; PSC ve klastan farklı olarak gemiyi 'asgari uyum' değil 'ticari mükemmellik' eşiğinde değerlendirir.",
      },
      {
        heading: "SIRE 2.0 ve dinamik denetim",
        body:
          "OCIMF'in SIRE programı 2023'te köklü biçimde yenilenerek SIRE 2.0'a geçti. Eski sabit soru listesinin yerini, tablet tabanlı ve algoritma destekli, geminin tipine ve o günkü operasyonuna göre soruları dinamik belirleyen bir sistem (CAQ – Computer Assisted Questioning) aldı. Denetim; sertifikasyondan mürettebat yönetimine, seyirden kargo/balast operasyonlarına ve makine dairesine kadar onlarca bölümü kapsar ve insan faktörünü (mürettebatın bilgisi, davranışı) öncekinden çok daha fazla ölçer. HVPQ (gemi özellikleri anketi) ve şirket düzeyindeki TMSA öz değerlendirmesi bu çerçeveyi tamamlar.",
      },
      {
        heading: "Sonuçların ticari ağırlığı",
        body:
          "Vetting denetiminin çıktısı, üye şirketlerle paylaşılan bir rapordur; yani tek bir denetimdeki olumsuz gözlemleri (negative observation) potansiyel tüm kiracılar görebilir. Kapatılmayan gözlemler geminin yeni iş almasını engeller, düşük performans sigorta primlerini artırır ve terminaller gemiyi kabul etmeyebilir. Şirketin TMSA puanının düşmesi ise sorunu tek gemiden tüm filoya yayar. Bu yüzden gemiler vetting öncesi titiz bir iç denetim (pre-vetting) yapar, dokümantasyonu kusursuz tutar ve özellikle kilit personeli (kaptan, başmühendis) CAQ formatındaki sorulara hazırlar. Vetting, modern tanker işletmeciliğinde regülatif uyum kadar belirleyici bir ticari kapıdır.",
      },
      {
        heading: "Neden statüter uyum yetmez: oil major'ların ticari mantığı",
        body:
          "Vetting'in var olma nedeni, petrol şirketlerinin bir kazanın yalnızca gemi sahibinin değil, yükü taşıyan ve genellikle marka değeri çok daha yüksek olan şirketin de sorumluluğuna dönüştüğünü sert biçimde öğrenmiş olmasıdır. Exxon Valdez (1989) gibi olaylar, bir tankerin bayrağı ve klası uyumlu olsa bile ciddi bir kazaya karışabileceğini ve bu kazanın temizlik maliyeti, hukuki sorumluluk ve itibar zararının yükü kiraya veren şirkete de yansıyacağını gösterdi. Bu deneyimden sonra oil major'lar, bir tankerin sadece 'yasal asgari uyum' sağlamasını yeterli görmemeye başladı; kendi ticari risk iştahlarına göre, statüter sistemin ölçmediği unsurları (mürettebat pratiği, bakım kültürü, işletmeci geçmişi) değerlendiren bağımsız bir denetim katmanı kurdular. Bu, düzenleyici bir zorunluluk değil, tamamen ticari bir risk yönetimi kararıdır: bir şirket başka bir şirketin gemisini denetleyip 'bizim standartlarımızı karşılamıyorsa yükümüzü taşımayacaksın' diyebilir. SIRE bu mantığın standartlaştırılmış, paylaşılan bir versiyonudur ve bu yüzden PSC veya klasın yerini almaz, onların üzerine bir ticari filtre ekler.",
      },
      {
        heading: "Gözlemlerin anatomisi ve ticari sonuçları",
        body:
          "Bir SIRE denetiminde inceleme belirli bir kontrol listesini geçmekten ibaret değildir; denetçi gemiyi baştan sona dolaşır, belgeleri inceler, mürettebatla görüşür ve gözlemlediği her sapmayı (observation) standart bir formatta kaydeder. Gözlemler önem derecesine göre değerlendirilir: küçük bir prosedür sapması basit bir not olarak kalırken, doğrudan bir emniyet veya çevre riski taşıyan bulgular daha ağır sınıflandırılır. En ciddi bulgular 'unacceptable' (kabul edilemez) düzeyine ulaşabilir; bu durumda kiracı geminin o anki durumuyla yükü taşımasını doğrudan reddedebilir (immediate rejection). Daha hafif bulgularda ise koşullu kabul (conditional acceptance) mümkündür: gemi, belirli bir süre içinde düzeltme yapması ve kanıt sunması şartıyla işe alınabilir. Bu ayrım ticari olarak kritiktir, çünkü bir 'unacceptable' bulgu geminin o charterer havuzundan günler veya haftalarca dışlanmasına, tekrarlayan benzer bulgular ise şirketin genel TMSA puanının düşmesine yol açar.",
      },
      {
        heading: "SIRE 2.0 ve insan faktörüne kayış",
        body:
          "Eski SIRE formatı büyük ölçüde ekipman ve dokümantasyon odaklıydı: bir yangın pompası çalışıyor mu, bir sertifika güncel mi türünden statik kontrollerdi. SIRE 2.0, bu mirası korurken ağırlığı belirgin biçimde insan faktörüne kaydırdı; CAQ (Computer Assisted Questioning) sistemi, denetçinin gözlemlerine göre dinamik olarak açılan takip sorularıyla mürettebatın bir prosedürü neden o şekilde uyguladığını, bir riski nasıl değerlendirdiğini ve baskı altında nasıl karar verdiğini anlamaya çalışır. Bu değişim, sektörün kaza istatistiklerinden çıkardığı bir dersi yansıtır: gemi kazalarının büyük çoğunluğu ekipman arızasından değil, insan faktöründen (yorgunluk, iletişim kopukluğu, prosedürün yanlış anlaşılması, hiyerarşik baskı) kaynaklanır. Dolayısıyla bir gemi teknik olarak kusursuz olsa da, mürettebatın karar alma kültürü zayıfsa SIRE 2.0'da olumsuz gözlem alabilir. Bu, vetting'in artık sadece 'donanım var mı' sorusundan 'bu ekip bir kriz anında doğru karar verir mi' sorusuna evrildiğini gösterir ve modern emniyet yönetiminin (ISM'in de vurguladığı) insan merkezli yaklaşımıyla örtüşür.",
      },
    ],
    relatedSlugs: ["ism-code", "isps-code", "rightship"],
    resources: [{ label: "OCIMF SIRE", href: "https://www.ocimf.org/sire" }],
  },
  {
    slug: "rightship",
    label: "RightShip – Gemi Değerlendirme",
    category: "Denetim & Sörvey",
    overview: "Dökme yük gemilerinin emniyet ve çevre performansını değerlendiren bağımsız platform; charterer kabulü için yaygın kullanılır.",
    history: "RightShip 2001'de BHP Billiton, Rio Tinto ve Cargill tarafından dökme yük gemilerinin emniyet değerlendirmesi amacıyla kurulmuştur. Başlangıçta emniyet odaklı olan platform, 2020'de GHG Rating ekleyerek çevresel performansı da değerlendirmeye başlamıştır. Günümüzde dökme yük, genel kargo ve konteyner gemileri için standart ticari kabul aracıdır. 2023'te Safety Score sistemi güncellenerek daha detaylı risk değerlendirmesi yapılmaya başlanmıştır.",
    applicability: [
      "Dökme yük gemileri (dry bulk carriers) – birincil hedef grup",
      "Genel kargo gemileri, konteyner gemileri – kapsam genişletildi",
      "Charterer, tüccar ve terminal kabul kriterleri kapsamında kullanılır",
      "Zorunlu değil ancak ticari olarak fiilen zorunlu – büyük charterer'lar RightShip onayı ister",
    ],
    essentials: [
      "Safety Score (Qi): 0.5 – 5.0 arası (5.0 en iyi) – geminin emniyet risk puanı",
      "Safety Score parametreleri: kaza/olay geçmişi, yaş, bayrak performansı, klas performansı, PSC denetim sonuçları, şirket performansı, gemi tipi",
      "GHG Rating: A-G arası emisyon performansı – EVDI (Existing Vessel Design Index) bazlı",
      "EVDI hesaplaması: geminin tasarım parametrelerine dayalı tahmini CO₂ emisyon yoğunluğu (gCO₂/ton·mil)",
      "RightShip Dry Bulk Inspection: fiziksel denetim programı – kritik gemi tipleri için",
      "Charterer kabul eşikleri: her şirketin minimum Safety Score ve GHG Rating gerekliliği farklı (genellikle ≥2.5 Safety Score)",
      "Veri kaynakları: PSC veritabanları, klas kayıtları, IHS/Lloyd's List verileri, kaza raporları",
    ],
    actions: [
      "RightShip Safety Score'u düzenli izle ve düşüş trendlerini erkenden tespit et",
      "GHG Rating'i iyileştirmek için yakıt verimliliği önlemleri al (CII ile paralel)",
      "RightShip fiziksel denetimine hazırlıklı ol (özellikle yaşlı dökme yük gemileri)",
      "Düşük skorlarda kök neden analizi yap: PSC performansı, kaza geçmişi, şirket performansı",
      "PSC ve kaza geçmişini temiz tut – skor etkisi yüksek (en önemli faktörler)",
      "Gemi yaşlanmasının skor üzerindeki etkisini yönet: bakım kalitesini artır",
    ],
    amendments: [
      { year: "2001", description: "RightShip kuruldu (BHP Billiton, Rio Tinto, Cargill)" },
      { year: "2014", description: "Star Rating sisteminden Safety Score (Qi) sistemine geçiş" },
      { year: "2020", description: "GHG Rating (EVDI bazlı A-G) eklendi" },
      { year: "2023", description: "Safety Score metodolojisi güncellendi, veri kaynakları genişletildi" },
    ],
    keyArticles: [
      { id: "Safety Score Methodology", title: "Emniyet Puanlama", summary: "Qi hesaplama parametreleri, ağırlıklandırma ve güncelleme döngüsü." },
      { id: "GHG Rating Framework", title: "Emisyon Değerlendirme", summary: "EVDI hesaplama metodolojisi ve A-G rating sınıfları." },
      { id: "Inspection Protocol", title: "Denetim Protokolü", summary: "RightShip fiziksel denetim kapsamı, prosedürleri ve raporlama." },
    ],
    penalties: [
      "Düşük Safety Score ile charterer tarafından geminin reddedilmesi (ticari kayıp)",
      "GHG Rating D ve altında büyük charterer'ların gemiyi tercih etmemesi",
      "Fiziksel denetimde kritik bulgu tespitinde geminin ticari kullanılabilirliğinin askıya alınması",
      "Şirket genelinde düşük performans, filo seviyesinde ticari dezavantaj",
    ],
    detailedSections: [
      {
        heading: "Dökme yük dünyasının vetting karşılığı",
        body:
          "Tankerlerde SIRE/CDI ne işi görüyorsa, dökme yük (dry bulk) sektöründe büyük ölçüde RightShip o işi görür. Büyük maden ve tahıl tüccarlarının kurduğu bu bağımsız platform, dökme yük gemilerinin emniyet ve çevre performansını veriye dayalı puanlarla değerlendirir ve bu puanları ticari kabul kararlarına temel yapar. RightShip onayı zorunlu bir regülasyon değildir, ancak büyük kiracılar belirli bir puanın altındaki gemilerle çalışmadığı için fiilen zorunludur. Platformun gücü, denetçi göndermek yerine mevcut büyük veri kaynaklarını (PSC veritabanları, klas kayıtları, kaza raporları) birleştirerek sürekli güncellenen bir risk puanı üretmesinden gelir.",
      },
      {
        heading: "Safety Score ve GHG Rating",
        body:
          "RightShip iki ana metrik üretir. Safety Score (Qi), 0,5 ile 5,0 arasında bir emniyet risk puanıdır; geminin kaza/olay geçmişi, yaşı, bayrak ve klas performansı, PSC sonuçları ve işletmeci performansı gibi faktörleri ağırlıklandırarak hesaplanır. Yüksek puan düşük risk demektir ve çoğu kiracı bir alt eşik (örneğin 2,5) belirler. İkinci metrik GHG Rating'dir: geminin tasarım parametrelerinden türetilen EVDI'ye dayanarak A'dan G'ye bir emisyon verimliliği notu verir. Böylece RightShip, hem emniyet hem çevre boyutunu tek bir ticari karar arayüzünde birleştirir; GHG Rating, IMO'nun CII rejimiyle paralel bir ticari baskı yaratır.",
      },
      {
        heading: "Safety Score'un ticari kapı olarak işleyişi",
        body:
          "RightShip'in gerçek gücü, puanın kendisinde değil, bu puanın büyük yük sahiplerinin kiralama süreçlerine nasıl gömüldüğündedir. Büyük tahıl ve maden tüccarları, madencilik şirketleri ve petrol şirketleri, kendi kurumsal politikalarında bir asgari Qi eşiği (sıklıkla 4 ve üzeri, bazı hassas kargolarda daha yüksek) belirler ve kiralama sistemlerine bu eşiği sert bir filtre olarak yerleştirir. Bunun sonucu mekaniktir: eşiğin altındaki bir gemi, o şirketin broker'ına teklif olarak bile sunulamaz, çünkü sistem otomatik olarak elenir. Bu, PSC alıkoymasından farklı bir dışlanma biçimidir; gemi hiçbir kuralı ihlal etmemiş olabilir, ama ticari erişimi bir yazılım eşiğiyle kapanmıştır. Bu yapı, RightShip'i düzenleyici bir kurumdan çok, kiralama havuzunun görünmez bir ön kapısı haline getirir ve armatörleri, bir PSC alıkoymasının veya kaza kaydının uzun süre puan üzerinde iz bırakacağını bilerek risk yönetimi yapmaya zorlar.",
      },
      {
        heading: "EVDI ve EEXI: benzer ölçüm, farklı işlev",
        body:
          "GHG Rating'in temelindeki EVDI (Existing Vessel Design Index), tıpkı IMO'nun EEXI'si gibi geminin tasarım parametrelerinden (ana makine gücü, kapasite, hız) yola çıkarak tahmini bir CO₂ yoğunluğu hesaplar ve ikisi kavramsal olarak akrabadır. Ancak işlevleri ayrılır: EEXI, MARPOL Ek VI kapsamında bir uyum eşiğidir, gemi bu eşiği geçmezse teknik olarak sefer edemez hale gelebilir ve bu bir statüter zorunluluktur. EVDI ise bir uyum eşiği değil, sıralayıcı bir ticari nottur (A'dan G'ye) ve herhangi bir yasal yaptırımı yoktur. Bunun pratik önemi zamanlamadır: bir charterer, bir gemiyi kiralama kararını verirken EEXI'nin resmi olarak denetlenip denetlenmediğini beklemeden, RightShip'in halihazırda yayınladığı GHG Rating'ine bakarak ön eleme yapabilir. Yani EVDI, EEXI'nin resmi doğrulama sürecinden önce devreye giren bir ticari erken uyarı sistemidir; bir gemi EEXI'yi teknik olarak karşılasa da GHG Rating'i düşükse, bazı çevre bilincine sahip charterer'lar için hâlâ istenmeyen bir seçenek olabilir.",
      },
      {
        heading: "RightShip'in vetting ve PSC'den ayrışan rolü",
        body:
          "RightShip'i SIRE veya PSC ile aynı kategoriye koymak yaygın bir kavram hatasıdır. PSC, devletlerin yürüttüğü ve uluslararası sözleşmelere (SOLAS, MARPOL, MLC) asgari uyumu denetleyen istatüter bir sistemdir; SIRE ise oil major'ların kendi tanker filosuna özgü, çok derinlemesine ve fiziksel bir denetimdir. RightShip ise ne devlet yetkisi kullanır ne de standart olarak fiziksel denetim yapar (fiziksel Dry Bulk Inspection istisnai ve hedeflidir); onun temel işlevi, var olan verileri (PSC geçmişi, klas kayıtları, kaza raporları) birleştirip sürekli güncellenen bir ticari risk skoru üretmektir. Bu fark somut sonuçlar doğurur: bir gemi PSC'de temiz bir geçmişe ve geçerli SIRE onayına sahip olabilir, ama geçmişteki bir kaza kaydı veya düşük klas performans notu nedeniyle RightShip Safety Score'u düşük çıkabilir ve dökme yük charterer'ları tarafından reddedilebilir. Tersi de mümkündür: RightShip'te iyi not alan bir gemi, güncel bir SIRE denetiminde ciddi operasyonel gözlemler alabilir. Bu üç sistem birbirinin yerini tutmaz, farklı zaman dilimlerini (RightShip geçmiş veri, SIRE anlık durum, PSC anlık asgari uyum) ve farklı kullanım amaçlarını yansıtan, üst üste binen ama bağımsız çalışan katmanlardır.",
      },
    ],
    relatedSlugs: ["cii", "psc", "vetting"],
    resources: [{ label: "RightShip", href: "https://www.rightship.com/" }],
  },
  {
    slug: "esp",
    label: "ESP – Geliştirilmiş Sörvey Programı",
    category: "Denetim & Sörvey",
    overview: "Dökme yük ve tanker gemilerinin yapısal bütünlüğünü değerlendirmek için geliştirilmiş denetim prosedürlerini belirler.",
    history: "IACS tarafından geliştirilen ESP (Enhanced Survey Programme), 1990'lardaki yapısal arızalar ve gemi kayıplarının ardından zorunlu kılınmıştır. Özellikle MV Derbyshire (1980) ve MV Flare (1998) gibi yapısal arıza kaynaklı kayıplar ESP'nin geliştirilmesine katkı sağlamıştır. SOLAS Chapter XI-1 Kural 2'de referans verilmektedir. ESP, standart klas survey'inin ötesinde ek yapısal değerlendirme gereklilikleri getirir.",
    applicability: [
      "Dökme yük gemileri (bulk carriers): tüm yaşlar, özellikle 10+ yaş",
      "Petrol tankerleri (oil tankers): tek ve çift cidarlı",
      "Kimyasal tankerler ve kombine taşıyıcılar (OBO)",
      "Yaş ve boyuta göre artan survey gereklilikleri",
    ],
    essentials: [
      "Kalınlık ölçümü (UTM – Ultrasonic Thickness Measurement): kritik yapısal bölgelerde sistematik ölçüm",
      "Yakın görsel muayene (close-up survey): tank içi ve yapısal detay muayenesi – staging/rafting ile erişim",
      "Survey planning questionnaire: geminin yaşı, tipi ve geçmişine göre survey kapsamının planlanması",
      "Kritik yapısal bölgelerin (CSA – Critical Structural Areas) belirlenmesi ve izlenmesi",
      "Korozyon koruma sistemi değerlendirmesi: tank coating durumu, anot tüketimi, ICCP sistemi",
      "Tank test gereklilikleri: balast tankları ve kargo tankları basınç testi (hose test veya air test)",
      "ESP dosyası: gemi yaşam boyu survey kayıtları, kalınlık ölçüm trendleri, onarım geçmişi – gemide bulundurma zorunlu",
      "Significant corrosion, substantial corrosion kavramları: kalınlık kaybı eşikleri ve aksiyon gereklilikleri",
    ],
    actions: [
      "ESP kalınlık ölçüm raporlarını survey öncesi hazırla ve klas surveyor'e sun",
      "Kritik yapısal alanlarda (CSA) korozyon trendlerini izle ve grafikle takip et",
      "ESP dosyasını gemide güncel ve erişilebilir tut",
      "Close-up survey için güvenli erişim (staging/rafting) planla ve hazırla",
      "Tank coating durumunu izle: aşınma, kabarcıklanma, çatlama tespitinde erken aksiyon al",
      "Survey öncesi tankları temizle ve gaz-free yap (enclosed space entry gereklilikleri)",
    ],
    amendments: [
      { year: "1993", description: "SOLAS Chapter XI'e ESP referansı eklendi" },
      { year: "2006", description: "IACS UR Z10 – Dökme yük ve tanker ESP gereklilikleri güncellendi" },
      { year: "2012", description: "CSR (Common Structural Rules) ile entegrasyon sağlandı" },
    ],
    keyArticles: [
      { id: "SOLAS XI-1/2", title: "ESP Referansı", summary: "SOLAS kapsamında ESP uygulamasının zorunluluğu ve kapsamı." },
      { id: "IACS UR Z10.1", title: "Tanker ESP", summary: "Petrol tankerleri için yapısal survey gereklilikleri: kalınlık ölçümü, close-up survey, tank test." },
      { id: "IACS UR Z10.2", title: "Bulk Carrier ESP", summary: "Dökme yük gemileri için yapısal survey gereklilikleri: ambar kapaklarından çift dip yapılarına." },
      { id: "IACS UR Z10.4", title: "Kalınlık Ölçüm Prosedürleri", summary: "UTM ölçüm noktaları, minimum kalınlık kriterleri ve trend değerlendirmesi." },
    ],
    penalties: [
      "ESP survey'inin zamanında yapılmaması durumunda klas askıya alma riski",
      "Significant/substantial corrosion tespitinde onarım veya güçlendirme zorunluluğu",
      "Minimum kalınlık değerinin altındaki bölgelerde sınıf kaybı veya operasyon kısıtlaması",
      "ESP dosyası eksikliğinde PSC denetimlerinde eksiklik kaydı",
    ],
    detailedSections: [
      {
        heading: "Yapısal kayıplara verilen yanıt",
        body:
          "Geliştirilmiş Sörvey Programı (ESP), 1980-90'larda yaşanan ve gemilerin uyarı vermeden battığı yapısal kayıpların doğrudan sonucudur. Bu kazalar, standart klas sörveyinin dökme yük gemileri ve tankerler gibi ağır yorulan gemilerin yapısal yıpranmasını yakalamakta yetersiz kaldığını gösterdi. ESP, bu yüksek riskli gemi tipleri için standart sörveyin ötesinde, daha sistematik ve daha derin bir yapısal değerlendirme zorunluluğu getirir. Amacı, korozyon ve çatlak gibi yavaş ilerleyen yıpranmaları, felakete dönüşmeden önce ölçülebilir biçimde tespit etmektir.",
      },
      {
        heading: "Kalınlık ölçümü ve yakın muayene",
        body:
          "ESP'nin teknik kalbi, geminin çeliğinin zamanla ne kadar inceldiğini izlemektir. Ultrasonik kalınlık ölçümü (UTM), kritik yapısal bölgelerde sistematik olarak yapılır ve her ölçüm bir trendin parçası olarak değerlendirilir; 'significant' ve 'substantial corrosion' eşikleri aşıldığında onarım veya güçlendirme zorunlu hale gelir. Yakın görsel muayene (close-up survey) ise sörveyörün, tank içindeki yapısal elemanlara iskele veya sal (staging/rafting) ile fiziksel olarak ulaşıp çatlak ve deformasyonu yakından incelemesini gerektirir. Tank kaplamasının (coating) durumu ve katodik koruma da değerlendirilir, çünkü kaplama bozulması korozyonun habercisidir.",
      },
      {
        heading: "ESP dosyası ve süreklilik",
        body:
          "ESP'yi tek seferlik bir denetimden ayıran şey, geminin yaşam boyu yapısal hafızasını tutmasıdır. Gemide bulundurulması zorunlu olan ESP dosyası; tüm geçmiş sörvey kayıtlarını, kalınlık ölçüm trendlerini ve onarım geçmişini bir arada barındırır. Bu sayede sörveyör, geminin bugünkü durumunu değil, yıllar içindeki bozulma hızını görerek geleceğe yönelik karar verebilir. Sörvey kapsamı geminin yaşı ve tipine göre planlanır; tankların güvenli muayenesi için temizleme ve gaz-free işlemleri (kapalı mahal giriş kurallarıyla) gerekir. ESP'nin zamanında yapılmaması klas askıya alınmasına, dosya eksikliği ise PSC bulgusuna yol açar.",
      },
      {
        heading: "Neden özellikle dökme yük ve tanker gemileri",
        body:
          "ESP'nin kapsamı rastgele seçilmemiştir; dökme yük gemileri ve tankerler, gemi kayıp istatistiklerinde yapısal arızanın en sık görüldüğü iki gemi tipidir ve bunun somut mühendislik nedenleri vardır. Dökme yük gemilerinde ambarlar, yüksek yoğunluklu katı kargonun (maden, kömür, tahıl) tekrarlanan yükleme-boşaltma çevrimlerinde yarattığı yerel gerilme yoğunlaşmalarına ve grab/ekskavatör gibi ekipmanın verdiği mekanik hasara maruz kalır; bu, özellikle ambar dip köşelerinde ve enine perdelerde yorulma çatlaklarını hızlandırır. Tankerlerde ise sorun kimyasaldır: ham petrol ve türevlerinin içerdiği su, hidrojen sülfür ve diğer korozif bileşenler, özellikle balast tankı üst yüzeyleri ve kargo tankı çelik yapılarında hızlı ve yer yer öngörülemez korozyona yol açar. Her iki durumda da hasar, dıştan bakan bir gözlemcinin fark edemeyeceği kapalı hacimlerde birikir ve uyarı vermeden kritik seviyeye ulaşabilir. 1990'lardaki peş peşe dökme yük gemisi kayıpları, mevcut genel klas sörveyinin bu tip yapısal riski yakalamakta yetersiz kaldığını göstermiş ve IACS'i bu iki gemi tipine özel, daha sık ve daha derin bir sörvey rejimi geliştirmeye yöneltmiştir.",
      },
      {
        heading: "Close-up survey erişiminin operasyonel maliyeti",
        body:
          "Close-up survey'in 'yakın' olması lafta kalmaz; sörveyörün bir yapısal elemana gerçekten fiziksel olarak, kolla dokunacak veya çekiçle vuracak mesafede ulaşması gerekir. Bu, tank içine iskele (staging) kurulmasını veya bir sal/platform (rafting) ile balast suyunun üstünde gezinmeyi gerektirir ve bu düzeneklerin kurulması başlı başına günler sürebilir. Daha temel bir engel ise mahalin insan girişine güvenli hale getirilmesidir: kapalı tanklar öncesinde havalandırılır, atmosfer oksijen ve zehirli/yanıcı gaz açısından ölçülür ve gaz-free sertifikası alınmadan hiçbir personel içeri giremez; bu süreç tankın boyutuna ve önceki kargoya bağlı olarak uzun sürebilir. Büyük bir dökme yük gemisinde onlarca ambar ve balast tankının sırayla bu şekilde hazırlanıp muayene edilmesi, geminin günlerce, bazen haftalarca ticari seferden çekilmesi anlamına gelir. Bu yüzden armatörler ESP sörveylerini genellikle zaten planlanmış bir kuru havuz veya bakım duruşuyla birleştirir; ayrı ayrı yapılması hem maliyeti hem kayıp süreyi katlar.",
      },
      {
        heading: "Yapısal bulguların gemi ömrü kararlarına yansıması",
        body:
          "ESP sörveylerinin biriken sonuçları, bir geminin sadece o anki klas durumunu değil, uzun vadeli ekonomik geleceğini de belirler. Kalınlık ölçüm trendleri yıllar içinde bir bozulma eğrisi çizer; bu eğri, belirli yapısal elemanların ne zaman minimum kalınlık sınırına yaklaşacağını, dolayısıyla ne zaman ve ne ölçüde çelik yenileme (steel renewal) gerekeceğini öngörmeyi sağlar. Armatör bu noktada temel bir ekonomik karar verir: yaklaşan büyük bir çelik yenileme masrafı, geminin kalan ticari ömrü ve o dönemdeki hurda/ikinci el gemi fiyatları karşısında hâlâ karlı mı, yoksa gemiyi söküme göndermek mi daha akılcı? Özellikle 15-20 yaş üstü dökme yük gemileri ve tankerlerde bu hesap sık yapılır; bir ESP sörveyinde ortaya çıkan yaygın 'substantial corrosion' bulgusu, tek bir tamirle çözülebilecek bir mesele değil, geminin ekonomik ömrünün sonuna işaret eden bir sinyal olabilir. Bu yüzden ESP dosyası sadece bir denetim kaydı değil, filo yönetiminin varlık ömrü planlamasında kullandığı temel bir veri kümesidir.",
      },
    ],
    relatedSlugs: ["class-survey", "dry-dock", "bc-code"],
    resources: [{ label: "IACS ESP", href: "https://iacs.org.uk/publications/unified-requirements/" }],
  },
  {
    slug: "dry-dock",
    label: "Dry Dock Survey – Kuru Havuz Denetimi",
    category: "Denetim & Sörvey",
    overview: "Geminin su altı kısmının periyodik olarak kuru havuzda denetlenmesini ve bakım/onarım gerekliliklerini kapsar.",
    history: "Kuru havuz denetimi, geminin su altı kısmının (gövde, pervane, dümen, deniz bağlantıları) fiziksel muayenesini sağlayan temel bakım ve denetim sürecidir. SOLAS Kural I/10 ve klas kuralları kapsamında zorunludur. Alternatif olarak belirli koşullarda su altı denetimi (In-Water Survey – IWS) kabul edilebilir. Kuru havuz maliyetleri geminin en büyük bakım gider kalemlerinden biridir.",
    applicability: [
      "Uluslararası sefer yapan tüm SOLAS gemileri",
      "Klas kuruluşuna kayıtlı tüm gemiler (klas kuralları kapsamında)",
      "Gemi yaşı ve tipine göre artan gereklilikler",
    ],
    essentials: [
      "Kuru havuz döngüsü: 5 yıllık sertifika döngüsü içinde 2 kuru havuz denetimi (maksimum 36 ay aralık)",
      "Alternatif: In-Water Survey (IWS) – belirli koşullarda (sınırlı yaş, temiz geçmiş, uygun su koşulları) dalgıç/ROV ile su altı muayenesi",
      "Denetim kapsamı: gövde plakaları (su altı kısmı), pervane ve şaft, dümen ve dümen yatakları, deniz bağlantıları (sea chest, sea valve), bow thruster, sonar dome",
      "Gövde temizliği ve boyama: anti-fouling boya uygulaması, gövde düzgünlüğü (hull roughness) değerlendirmesi",
      "Katodik koruma: çinko/alüminyum anot değişimi, ICCP sistemi kontrolü, anot tüketim oranı değerlendirmesi",
      "Shaft seal ve stern tube: seal durumu, yağ analizi, bearing clearance ölçümü",
      "Propeller muayenesi: erozyon, kavitasyon hasarı, çatlak testi (dye penetrant/MPI), polishing, balancing",
      "Dümen muayenesi: bearing clearance (jumping, lifting, wearing), pintle ve gudgeon durumu, dümen seal",
      "Sea valve ve sea chest: korozyon, biofouling temizliği, grating durumu",
      "Havuz spesifikasyonu: klas/bayrak gerekliliklerini, armatör bakım planını ve onarım ihtiyaçlarını içeren detaylı çalışma planı",
    ],
    actions: [
      "Kuru havuz spesifikasyonunu klas/bayrak gerekliliklerine ve bakım planına göre hazırla",
      "Su altı fotoğraf/video kayıtlarını survey dosyasına ekle",
      "Anot tüketim oranlarını izleyip sonraki havuz için yedek anotları planla",
      "Propeller polishing ve balancing gereksinimini değerlendir (kavitasyon hasarı kontrolü)",
      "Stern tube bearing clearance ölçümlerini kaydet ve trendi izle",
      "Dümen bearing clearance (jumping, wearing) ölçümlerini yaparak klas limitleriyle karşılaştır",
      "Hull roughness ölçümü yap: yüksek roughness yakıt tüketimine doğrudan etki eder",
      "IWS seçeneğini değerlendir: maliyet avantajı vs klas ve bayrak kabul koşulları",
    ],
    amendments: [
      { year: "2000", description: "IACS UR Z3 – Bottom survey gereklilikleri güncellendi" },
      { year: "2010", description: "IWS alternatifleri için kılavuzlar genişletildi" },
      { year: "2020", description: "Uzaktan denetim teknolojileri (ROV, drone) kullanım kılavuzları" },
    ],
    keyArticles: [
      { id: "SOLAS Kural I/10", title: "Survey Gereklilikleri", summary: "Gemi gövdesi ve makine denetimleri için survey aralıkları ve koşulları." },
      { id: "IACS UR Z3", title: "Bottom Survey", summary: "Kuru havuz ve su altı denetim gereklilikleri, IWS koşulları." },
      { id: "IACS UR Z7.1", title: "Survey Pencere Sistemi", summary: "Kuru havuz survey zamanlaması ve pencere (window) sistemi kuralları." },
    ],
    penalties: [
      "Havuz denetiminin pencere dışında yapılması durumunda klas askıya alınması riski",
      "IWS koşulları sağlanmadan kuru havuz atlama girişiminde sertifika geçersizliği",
      "Havuz denetiminde tespit edilen yapısal/mekanik sorunlarda acil onarım zorunluluğu",
      "Plansız havuz ihtiyacı (emergency dry dock) yüksek maliyet ve operasyon kaybı",
    ],
    detailedSections: [
      {
        heading: "Su altının görülemeyen yarısı",
        body:
          "Bir gemi seyir halindeyken gövdesinin su altında kalan kısmı (gövde plakaları, pervane, dümen, deniz bağlantıları) görülemez ve denetlenemez; oysa bu bölgeler korozyon, biyolojik kirlenme ve mekanik aşınmaya en çok maruz kalan yerlerdir. Kuru havuz denetimi, gemiyi havuza alıp suyu boşaltarak bu görünmeyen yarıyı fiziksel muayeneye açar. SOLAS ve klas kuralları bu denetimi zorunlu kılar: tipik olarak beş yıllık sertifika döngüsü içinde iki kuru havuz denetimi yapılır ve iki denetim arası 36 ayı geçemez. Belirli koşulları sağlayan gemiler için dalgıç veya ROV ile yapılan su altı denetimi (IWS) bir alternatif olabilir.",
      },
      {
        heading: "Denetim kapsamı ve kritik sistemler",
        body:
          "Havuz, yalnızca bir denetim değil aynı zamanda en büyük bakım fırsatıdır. Gövdenin su altı kısmı temizlenip yeniden anti-fouling boya ile boyanır; gövde pürüzlülüğü (hull roughness) ölçülür, çünkü pürüzlü bir gövde yakıt tüketimini doğrudan artırır. Pervane erozyon ve kavitasyon hasarı açısından muayene edilir, parlatılır ve dengelenir. Dümen ve şaft yatak boşlukları (bearing clearance) ölçülerek klas limitleriyle karşılaştırılır; stern tube keçesi ve yağ durumu kontrol edilir. Katodik koruma anotları (çinko/alüminyum) değiştirilir, deniz bağlantıları (sea chest, sea valve) korozyon ve kirlenmeye karşı temizlenir.",
      },
      {
        heading: "Planlama, maliyet ve riskler",
        body:
          "Kuru havuz, bir geminin en pahalı ve operasyonel olarak en kesintili bakım kalemlerinden biridir; bu yüzden iyi planlanması kritiktir. Detaylı bir havuz spesifikasyonu, klas/bayrak gerekliliklerini, armatörün bakım planını ve bilinen onarım ihtiyaçlarını önceden bir araya getirir, böylece havuzdaki süre ve maliyet kontrol altında tutulur. Anot tüketim oranları izlenip bir sonraki dönem için yedekler planlanır, su altı kayıtları (fotoğraf/video) sörvey dosyasına eklenir. Havuzun pencere dışında yapılması klas askıya alınmasına; plansız bir acil havuz ihtiyacı (emergency dry dock) ise yüksek maliyet ve ciddi operasyon kaybına yol açar.",
      },
      {
        heading: "IWS'in kapsayamadığı su altı bileşenleri",
        body:
          "In-Water Survey (IWS), belirli koşullarda kuru havuza ihtiyacı geciktirmeyi mümkün kılsa da bazı bileşenler için gerçek bir muayene alternatifi sunmaz, çünkü bu bileşenlerin doğru değerlendirilmesi suyun tamamen boşaltılmasını ve doğrudan erişimi gerektirir. Dümen pintle (mafsal pimi) aşınması, dalgıç veya ROV'un dokunma hassasiyetiyle ölçülemeyecek mikron seviyesinde tolerans ölçümleri ister; bu ölçüm ancak dümen suyun dışına çıkarılıp mekanik olarak ölçüldüğünde güvenilirdir. Deniz kutusu (sea chest) ızgaraları, iç yüzeyde biriken kirlenme ve korozyonun görsel ve fiziksel muayenesini gerektirir, su altında bulanıklık ve erişim açısı bu incelemeyi ciddi ölçüde sınırlar. Bow thruster tüneli ve içindeki pervane-yatak sistemi ile sonar dome gibi hassas elektronik muhafazalar da benzer şekilde suyun dışında, doğrudan görüşle ve gerekirse sökülerek incelenmelidir. Bu yüzden klas kuralları IWS'i her zaman 'koşullu' bir alternatif olarak tanımlar: belirli yaş, geçmiş ve durum kriterlerini karşılayan gemilere sınırlı sayıda ardışık dönemde izin verilir, ama bu bileşenler söz konusu olduğunda ya IWS kapsamı daraltılır ya da doğrudan kuru havuz şart koşulur.",
      },
      {
        heading: "Havuz slotu planlaması ve bindirilen işler",
        body:
          "Bir kuru havuz randevusu, özellikle büyük tersanelerde, aylar öncesinden ayrılması gereken kıt bir kaynaktır; talep yoğun dönemlerde (örneğin belirli bölgesel tersane kapasitesi daraldığında) armatörler slot rezervasyonunu bir yıl öncesine kadar yapmak zorunda kalabilir. Bu yüzden havuz planlaması, sertifika pencerelerinin çok öncesinde başlayan bir lojistik süreçtir. Havuza girmek zaten pahalı ve kesintili olduğundan, armatörler bu süreyi tek bir amaca (zorunlu sörvey) hasretmek yerine, aynı duruşta yapılabilecek tüm bakım işlerini bir arada toplar: pervane parlatma ve dengeleme, anot yenileme, gövde boyaması, ve daha büyük müdahaleler için tailshaft'ın (kuyruk şaftı) çıkarılıp yatak ve keçe kontrolünün yapılması gibi işler klas sörveyiyle aynı takvime bindirilir. Bu 'bindirme' mantığı doğrudan ekonomiktir: geminin ticaretten çekildiği her ek gün gelir kaybı olduğundan, havuzdaki her günün mümkün olduğunca çok bakım işine denk gelmesi istenir; bu da havuz spesifikasyonunun aylar önceden, tüm departmanların (teknik, operasyon, satın alma) girdisiyle hazırlanmasını gerektirir.",
      },
      {
        heading: "Anot tüketiminin teşhis değeri",
        body:
          "Katodik koruma, gövde çeliğinin kendisinden daha kolay çözünen bir metali (çinko veya alüminyum anot) feda ederek korozyonu bu anotlara yönlendirme ilkesine dayanır; anotların zamanla erimesi sistemin normal ve beklenen çalışma biçimidir. Ancak anot tüketiminin hızı ve deseni, salt bir yenileme takvimi değil, aynı zamanda bir teşhis aracıdır. Tüm anotların gövde üzerinde düzgün ve öngörülen orana yakın erimesi, koruma sisteminin sağlıklı çalıştığını gösterir. Ancak belirli bölgelerdeki anotların beklenenden çok daha hızlı erimesi, genellikle iki sorundan birine işaret eder: ya o bölgede kaplama (coating) bozulmuş ve çelik doğrudan suya açık kalmış, bu da anotun o noktaya orantısız akım göndermesine yol açmıştır; ya da gemide sızıntılı bir elektrik devresinden kaynaklanan kaçak akım (stray current) mevcuttur ve bu akım anotları normalden hızlı tüketmektedir. Sörveyör bu deseni fark ettiğinde, sadece anotları değiştirmekle kalmaz, kaplama durumunu o bölgede ayrıca inceler veya elektrik sisteminde kaçak akım araştırması başlatılmasını önerir; aksi halde bir sonraki havuz döneminde aynı anormal tüketim, hatta altındaki çelikte lokal korozyon olarak karşılarına çıkar.",
      },
    ],
    relatedSlugs: ["class-survey", "esp"],
    resources: [{ label: "Klas havuz gereklilikleri", href: "https://iacs.org.uk/publications/unified-requirements/" }],
  },
];

export const certificateRegulations: RegulationItem[] = [
  {
    slug: "smc",
    label: "SMC – Emniyet Yönetim Sertifikası",
    category: "Gemi Sertifikaları",
    overview: "ISM Code kapsamında geminin emniyet yönetim sistemini uyguladığını belgeleyen sertifika; DOC ile birlikte zorunludur.",
    history: "SMC (Safety Management Certificate), ISM Code'un uygulanmasıyla 1998'den itibaren tüm yolcu gemileri ve 500 GT üzeri kargo gemileri için zorunlu hale gelmiştir. ISM Code, Herald of Free Enterprise (1987) ve Scandinavian Star (1990) felaketlerinin ardından geliştirilen emniyet yönetim sistemi standardıdır. SMC her bir gemi için ayrı ayrı düzenlenirken, DOC (Document of Compliance) şirketi kapsar.",
    applicability: [
      "Tüm yolcu gemileri (boyut sınırı yok)",
      "500 GT ve üzeri uluslararası sefer yapan kargo gemileri",
      "MODU'lar (Mobile Offshore Drilling Units)",
    ],
    essentials: [
      "SMC düzenleme: bayrak devleti veya yetkili RO tarafından – ISM Code uyum denetimi sonrası",
      "Sertifika süresi: 5 yıl geçerlilik + ara doğrulama (intermediate verification: 2. ve 3. yıl arasında)",
      "DOC (Document of Compliance): şirket için düzenlenen ISM uyum belgesi – SMC ancak geçerli DOC varsa düzenlenir",
      "SMS (Safety Management System) uygulaması: emniyet politikası, prosedürler, acil durum müdahale, iç denetim, yönetim gözden geçirmesi",
      "Designated Person Ashore (DPA): kıyı organizasyonunda ISM sorumlusu – gemi ile şirket arasındaki emniyet köprüsü",
      "ISM iç denetimleri: yılda en az 1 kez (gemi ve şirket için ayrı ayrı)",
      "Uygunsuzluklar: Major nonconformity → SMC askıya alma riski; nonconformity → belirli sürede kapatma",
      "SMS dokümantasyonu: Gemide güncel olarak bulundurulması gereken tüm ISM prosedürleri",
    ],
    actions: [
      "SMS prosedürlerini güncel tut ve değişiklikleri mürettebata duyur",
      "İç denetimleri yılda en az 1 kez yap ve raporla",
      "Ara doğrulama (intermediate verification) tarihini takip et ve zamanında planla",
      "Dış denetim (external audit) bulgularını hızlı kapat ve düzeltici faaliyet kanıtlarını sun",
      "DPA iletişimini aktif tut: emniyet konuları ve uygunsuzluklar",
      "Master's review ve yönetim gözden geçirmesini düzenli yap",
    ],
    amendments: [
      { year: "1998", description: "ISM Code Phase 1 yürürlüğe girdi (yolcu, tanker, kimyasal, gaz, bulk)" },
      { year: "2002", description: "ISM Code Phase 2 – tüm gemi tipleri için zorunlu" },
      { year: "2010", description: "ISM Code değişiklikleri: DPA rolleri ve prosedürleri güncellendi" },
      { year: "2015", description: "ISM Code değişiklikleri: iç denetim ve yönetim gözden geçirmesi gereklilikleri güncellendi" },
    ],
    keyArticles: [
      { id: "ISM Code Bölüm 1", title: "Genel Hükümler", summary: "ISM Code'un amacı, kapsamı ve tanımlar." },
      { id: "ISM Code Bölüm 13", title: "Sertifikasyon ve Doğrulama", summary: "SMC ve DOC düzenleme, ara doğrulama ve yenileme prosedürleri." },
      { id: "ISM Code Bölüm 12", title: "Şirket Doğrulaması ve Gözden Geçirme", summary: "İç denetim, yönetim gözden geçirmesi ve düzeltici/önleyici faaliyetler." },
    ],
    penalties: [
      "Major nonconformity tespitinde SMC askıya alınması veya geri çekilmesi",
      "SMC olmadan uluslararası sefer yapılamaz – PSC denetimlerinde alıkoyma",
      "DOC geçersizliğinde tüm şirket gemilerinin SMC'leri de geçerliliğini yitirir",
      "ISM uyumsuzluğu PSC'de en ciddi eksiklik kategorilerinden biri – doğrudan alıkoyma riski",
    ],
    detailedSections: [
      {
        heading: "ISM uyumunun gemi düzeyindeki kanıtı",
        body:
          "SMC (Safety Management Certificate), ISM Code'un soyut emniyet yönetimi gerekliliklerini somut, denetlenebilir bir belgeye bağlar. Bir geminin SMC taşıması, o gemide şirketin Emniyet Yönetim Sisteminin (SMS) gerçekten kurulu ve işler olduğunun dış denetimle doğrulandığı anlamına gelir. SMC tek başına anlamlı değildir: ancak şirketin geçerli bir DOC'una (Document of Compliance) bağlı olarak düzenlenebilir. Yani DOC şirketin, SMC ise her bir geminin uyumunu belgeler; biri olmadan diğeri geçersizdir. Bu ikili yapı, emniyetin hem kıyıdaki organizasyonda hem de gemide eşzamanlı sağlanmasını güvence altına alır.",
      },
      {
        heading: "Geçerlilik döngüsü ve uygunsuzluklar",
        body:
          "SMC beş yıl geçerlidir, ancak bu süre boyunca pasif kalmaz: 2. ve 3. yıl arasında zorunlu bir ara doğrulama (intermediate verification) yapılır ve sistemin canlı tutulduğu denetlenir. Denetimlerde bulunan uygunsuzluklar ağırlığına göre ele alınır; küçük uygunsuzluklar belirli sürede kapatılır, ancak büyük bir uygunsuzluk (major non-conformity) sistemde ciddi bir kırılmaya işaret eder ve kapatılmazsa SMC askıya alınabilir. SMC olmadan gemi uluslararası sefer yapamaz ve ISM uyumsuzluğu, PSC'de en ağır eksiklik kategorilerinden biri olduğu için doğrudan alıkoymaya yol açabilir. Bu yüzden iç denetimler, DPA iletişimi ve yönetim gözden geçirmesi sürekli yürütülür.",
      },
      {
        heading: "Geçici (interim) sertifikalar ve geçiş durumları",
        body:
          "SMC ve DOC sistemi, yeni kurulan şirketleri ve filoya yeni katılan gemileri de kapsayacak esnekliğe sahiptir. Yeni bir şirket faaliyete geçtiğinde veya yeni bir gemi tipi işletmeye başladığında, henüz tam SMC/DOC için gereken işletme geçmişi oluşmadan, sınırlı süreli (genellikle 6-12 ay) geçici (interim) belgeler düzenlenir; bu süre içinde sistemin gerçek koşullarda işlediği doğrulanır ve ardından tam sertifikaya geçilir. Gemi sahibi veya işleteni değiştiğinde ya da bayrak değiştiğinde de geçici belgeler köprü işlevi görür. Bu mekanizma, emniyet yönetim sisteminin kurulması ile geminin sefere çıkması arasında bir boşluk oluşmasını engeller; ancak geçici belge, sistemin asgari unsurlarının (DPA atanması, temel prosedürler, acil durum hazırlığı, mürettebatın temel familiarizasyonu) hazır olmasını şart koşar.",
      },
      {
        heading: "SMC denetiminin kapsamı ve nesnel kanıt",
        body:
          "SMC denetimi (audit) bir belge incelemesinden çok daha fazlasıdır; denetçi 'nesnel kanıt' (objective evidence) arar, yani sistemin yazıldığı gibi gerçekten uygulandığını gösteren somut işaretler ister. Bu kapsamda kayıtlar (tatbikat kayıtları, bakım kayıtları, near-miss raporları), mürettebatla görüşmeler ve operasyonel gözlemler bir arada değerlendirilir; örneğin bir tatbikatın gerçekten yapılıp yapılmadığı, mürettebatın acil durumdaki görevini bilip bilmediği veya kritik ekipmanın test edilip edilmediği yerinde sınanır. Bulunan uyumsuzluklar ağırlığına göre sınıflandırılır: küçük uyumsuzluk (minor non-conformity) belirli sürede kapatılır, büyük uyumsuzluk (major non-conformity) ise sistemde ciddi bir kırılmaya işaret eder ve kapatılmazsa SMC askıya alınabilir. Bu yüzden SMC, geminin emniyet kültürünün kâğıt üstünde değil sahada işlediğinin teminatıdır.",
      },
      {
        heading: "Dış denetimde 'yazılı prosedür' ile 'kanıtlanmış uygulama' ayrımı",
        body:
          "ISM dış denetiminin en temel mesleki tekniği, bir prosedürün var olmasıyla uygulanmasının aynı şey olmadığını sürekli sınamaktır. Denetçi bir SMS el kitabını okuyup 'yangın tatbikatı ayda bir yapılır' yazısını görmekle yetinmez; bu iddiayı doğrulayacak somut kanıt ister: imzalı tatbikat raporları, tatbikat sırasında çekilmiş fotoğraflar, mürettebatın o tatbikatta hangi görevi üstlendiğini hatırlayıp hatırlamadığı, kritik ekipmanın (yangın pompası, acil jeneratör) test kayıtlarının tarihleri ile bakım defterinin örtüşüp örtüşmediği. Bir 'major non-conformity', tek bir unutulmuş imza değildir; sistemin bütününde bir kırılmayı gösteren, tekrarlayan veya sistemik bir başarısızlıktır — örneğin aylarca hiç iç denetim yapılmamış olması, kritik bir prosedürün mürettebatın tamamı tarafından bilinmiyor olması veya bir DPA'nın fiilen görevini yerine getirmediğinin anlaşılması gibi durumlar bu eşiği aşar. Böyle bir bulgu SMC'nin (ve dolayısıyla DOC'un) askıya alınmasını tetikleyebilir, çünkü denetçinin vardığı sonuç artık 'küçük bir eksiklik var' değil, 'bu sistemin gerçekten işlediğine güvenilemez' yönündedir.",
      },
      {
        heading: "DPA'nın gemi-kıyı arasındaki köprü rolü",
        body:
          "Designated Person Ashore (DPA), ISM Code'un en özgün kurumsal icadıdır: gemi ile şirketin en üst yönetimi arasında doğrudan, filtrelenmemiş bir iletişim hattı kurmayı amaçlar. Kuralın açıkça şart koştuğu şey, DPA'nın şirketin üst yönetimine doğrudan erişiminin (direct access to the highest level of management) olmasıdır; bu, DPA'nın operasyon veya ticaret departmanlarının hiyerarşisi içinde sıkışıp kalmaması, bir emniyet endişesini raporlarken ticari veya operasyonel çıkar çatışması yaşayan bir amirin onayına bağımlı olmaması demektir. Bu erişim gerekliliğinin arkasındaki mantık nettir: bir kaptan bir emniyet riski bildirdiğinde, bu bilginin şirket içinde 'seferi geciktirmemek' veya 'maliyeti artırmamak' gibi ticari kaygılarla süzülüp hafifletilmemesi gerekir. DPA'nın günlük pratikte rolü büyük ölçüde reaktiftir değil proaktiftir: iç denetim sonuçlarını takip eder, near-miss ve uygunsuzluk raporlarını analiz eder, gemiden gelen endişeleri üst yönetime iletir ve gerektiğinde şirketin kaynak tahsisi kararlarını (personel, bakım bütçesi, ekipman yenileme) emniyet gerekleri doğrultusunda savunur. DPA'nın bu bağımsızlığı zayıfladığında, ISM denetçileri bunu genellikle sistemin en kırılgan noktası olarak tespit eder.",
      },
    ],
    relatedSlugs: ["ism-code", "solas"],
    resources: [{ label: "ISM Code", href: "https://www.imo.org/en/OurWork/HumanElement/Pages/ISMCode.aspx" }],
  },
  {
    slug: "issc",
    label: "ISSC – Gemi Güvenlik Sertifikası",
    category: "Gemi Sertifikaları",
    overview: "ISPS Code kapsamında geminin güvenlik önlemlerini uyguladığını belgeleyen sertifika; SSP uyumu ve güvenlik ekipmanı gerektirir.",
    history: "ISSC (International Ship Security Certificate), 11 Eylül 2001 terör saldırılarının ardından geliştirilen ISPS Code kapsamında 1 Temmuz 2004'ten itibaren zorunlu hale gelmiştir. SOLAS Chapter XI-2 tarafından düzenlenen bu sertifika, geminin terörizm ve güvenlik tehditlerine karşı korunma önlemlerini uyguladığını belgeler.",
    applicability: [
      "500 GT ve üzeri uluslararası sefer yapan tüm kargo gemileri",
      "Tüm yolcu gemileri (boyut sınırı yok)",
      "MODU'lar (Mobile Offshore Drilling Units)",
      "Yüksek hızlı araçlar (HSC)",
    ],
    essentials: [
      "ISSC düzenleme: bayrak devleti veya yetkili RSO (Recognized Security Organization) tarafından",
      "Sertifika süresi: 5 yıl geçerlilik + ara doğrulama (intermediate verification)",
      "SSP (Ship Security Plan): gemiye özel güvenlik planı – gizli belge, onay bayrak devletince",
      "SSA (Ship Security Assessment): güvenlik açığı değerlendirmesi – SSP'nin temeli",
      "SSO (Ship Security Officer): gemideki güvenlik sorumlusu – STCW sertifikalı",
      "CSO (Company Security Officer): kıyı organizasyonundaki güvenlik sorumlusu",
      "PFSO (Port Facility Security Officer): liman tesisi güvenlik sorumlusu",
      "Security level: Level 1 (normal), Level 2 (heightened – artırılmış), Level 3 (exceptional – olağanüstü)",
      "DoS (Declaration of Security): gemi-liman tesisi arasında güvenlik bildirgesi",
      "CSR (Continuous Synopsis Record): geminin tarihçe kaydı – ISSC ile birlikte gemide bulundurma",
      "Güvenlik ekipmanları: AIS, SSAS (Ship Security Alert System), erişim kontrol, CCTV, aydınlatma",
    ],
    actions: [
      "SSP'yi güncel tut ve mürettebata düzenli güvenlik eğitimi ver",
      "Güvenlik ekipmanlarını (SSAS, AIS, erişim kontrol, CCTV) düzenli test et",
      "Güvenlik tatbikatlarını düzenli yap: her 3 ayda 1 drill, yılda 1 exercise",
      "Ara doğrulama (intermediate verification) tarihini takip et ve zamanında planla",
      "Security level değişikliklerinde SSP prosedürlerini uygula",
      "DoS gerektiğinde liman tesisi ile koordine et",
      "CSR'yi güncel tut ve gemide bulundur",
    ],
    amendments: [
      { year: "2002", description: "ISPS Code kabul edildi (SOLAS Chapter XI-2)" },
      { year: "2004", description: "1 Temmuz – ISPS Code ve ISSC zorunlu olarak yürürlüğe girdi" },
      { year: "2012", description: "MSC.1/Circ.1443 – ISPS Code uygulama kılavuzu güncellendi" },
      { year: "2022", description: "Maritime Cyber Risk Management – güvenlik kapsamına siber güvenlik eklendi" },
    ],
    keyArticles: [
      { id: "SOLAS XI-2/5", title: "SSP Gereklilikleri", summary: "Ship Security Plan hazırlama, onay ve uygulama gereklilikleri." },
      { id: "ISPS Part A/19", title: "ISSC Düzenleme", summary: "ISSC düzenleme koşulları, geçerlilik ve doğrulama prosedürleri." },
      { id: "SOLAS XI-2/6", title: "Security Level", summary: "Güvenlik seviyeleri tanımı ve her seviye için alınması gereken önlemler." },
    ],
    penalties: [
      "ISSC olmadan uluslararası sefer yapılamaz",
      "PSC denetimlerinde ISSC veya SSP eksikliğinde alıkoyma",
      "Güvenlik ihlallerinde geminin limana kabul edilmemesi veya limandan çıkarılması",
      "SSP gizlilik ihlalinde güvenlik riski ve bayrak devleti yaptırımları",
    ],
    detailedSections: [
      {
        heading: "Güvenlik uyumunun belgesi",
        body:
          "ISSC (International Ship Security Certificate), bir geminin ISPS Code kapsamındaki güvenlik önlemlerini kurduğunu ve uyguladığını belgeleyen sertifikadır. SMC nasıl emniyet yönetiminin (safety) kanıtıysa, ISSC de güvenliğin (security – kasıtlı saldırılara karşı koruma) kanıtıdır. Sertifika, bayrak devleti veya yetkili bir Tanınmış Güvenlik Kuruluşu (RSO) tarafından, geminin onaylı bir Gemi Güvenlik Planına (SSP) ve gerekli güvenlik donanımına sahip olduğu doğrulandıktan sonra düzenlenir. Beş yıl geçerlidir ve dönem ortasında ara doğrulamadan geçer.",
      },
      {
        heading: "Planın ve donanımın arkasındaki sistem",
        body:
          "ISSC, kâğıt üstünde bir izin değil, işleyen bir sistemin sonucudur. Temelinde, geminin tehdit ve zafiyetlerini değerlendiren Gemi Güvenlik Değerlendirmesi (SSA) ve buna dayanan gizli Gemi Güvenlik Planı (SSP) yatar. Planı sahada gemideki SSO, kıyıda CSO ve liman tarafında PFSO uygular. Gemi; SSAS (gizli güvenlik alarmı), AIS, erişim kontrolü ve CCTV gibi donanımları işler tutmak, üç güvenlik seviyesi arasındaki geçişlere anında uyum sağlamak ve düzenli tatbikatlar yapmak zorundadır. ISSC veya SSP eksikliği PSC'de alıkoymaya, güvenlik ihlalleri ise limana kabul edilmemeye yol açabilir; geminin geçmişini izleyen CSR de ISSC ile birlikte gemide bulundurulur.",
      },
      {
        heading: "RSO, geçici ISSC ve doğrulama döngüsü",
        body:
          "ISSC, bayrak devleti tarafından veya onun yetkilendirdiği bir Tanınmış Güvenlik Kuruluşu (RSO – genellikle bir klas kuruluşu) tarafından düzenlenir; ancak bazı hassas güvenlik kararları (örneğin güvenlik seviyesinin belirlenmesi) devredilemez ve bayrak devletinde kalır. Beş yıllık geçerlilik döngüsünde, dönem ortasında en az bir ara doğrulama (intermediate verification) yapılır ve geminin güvenlik planının hâlâ uygulandığı teyit edilir. Yeni inşa edilen veya bayrak/işletmeci değiştiren gemiler için, tam denetim tamamlanana kadar sınırlı süreli geçici ISSC düzenlenebilir. Bu yapı, SMC sertifikasyon mantığıyla simetriktir: biri emniyet yönetimini (ISM), diğeri güvenlik yönetimini (ISPS) doğrular ve her ikisi de eksik olduğunda gemi sefer yapamaz.",
      },
      {
        heading: "Güvenlik tatbikatları, eğitim ve denetim hazırlığı",
        body:
          "ISSC'nin geçerliliği, planın yaşatılmasına bağlıdır. Mürettebat düzenli güvenlik tatbikatları (drills – tipik olarak üç ayda bir) ve daha kapsamlı egzersizler (exercises – yılda bir) yapar; bunlar erişim kontrolü, kısıtlı bölgelerin korunması, silah/patlayıcı tehdidi, kaçak yolcu ve geminin güvenlik seviyeleri arasındaki geçişi içerir. Güvenlik donanımı (SSAS, AIS, CCTV, aydınlatma, erişim kontrol) periyodik test edilir ve kayıtları tutulur. Denetime hazırlık, gemi güvenlik kayıtlarının (DoS örnekleri, tatbikat kayıtları, ziyaretçi/yük güvenlik kayıtları) güncel ve erişilebilir olmasını gerektirir. ISSC veya onaylı SSP eksikliği PSC denetiminde alıkoymaya, ciddi güvenlik ihlalleri ise geminin limana kabul edilmemesine yol açabilir; bu yüzden güvenlik, emniyet kadar günlük operasyonun parçasıdır.",
      },
      {
        heading: "Üç güvenlik seviyesinde fiilen ne değişir",
        body:
          "Güvenlik seviyeleri arasındaki geçiş, kâğıt üstünde bir sınıflandırmadan ibaret değildir; gemide gözle görülür somut değişiklikler tetikler. Seviye 1 (normal), sürekli asgari önlemleri kapsar: erişim noktalarının kontrolü, güvertede rastgele devriye, kimlik kontrolü ile gemiye giriş. Seviye 2'ye (artırılmış) geçildiğinde, tipik olarak bölgesel bir tehdit istihbaratına veya belirli bir olaya yanıt olarak, erişim kontrolü sıklaştırılır: gangway'de ek personel görevlendirilir, ziyaretçi ve yük kontrolleri daha sık ve daha detaylı yapılır, kısıtlı bölgelere girişler kayda geçirilir, gece devriye sıklığı artırılır ve komşu gemilerle/liman tesisiyle güvenlik bilgisi paylaşımı yoğunlaşır. Seviye 3'e (olağanüstü) geçiş ise somut ve yakın bir tehdide karşı alınan acil önlemleri ifade eder: kargo operasyonları durdurulabilir, gemiye erişim tamamen kısıtlanabilir veya sadece yetkili güvenlik personeliyle sınırlanabilir, liman tesisiyle koordineli tahliye veya limandan ayrılma senaryoları devreye girebilir. Her seviye geçişinde SSO, CSO ve PFSO arasında bir Declaration of Security (DoS) imzalanması ve uygulanan önlemlerin kayda geçirilmesi beklenir.",
      },
      {
        heading: "SSP'nin gizliliği ve denetimde doğrulama yöntemi",
        body:
          "Gemi Güvenlik Planı (SSP), tanımı gereği gizli bir belgedir; çünkü içeriği (erişim kontrol noktalarının tam yerleşimi, güvenlik ekipmanının teknik detayları, alarm prosedürlerinin özgül adımları) kötü niyetli bir aktörün elinde geminin savunmasını doğrudan zayıflatacak bilgi taşır. Bu gizlilik, denetim sürecini SMC'den farklılaştırır: PSC veya bayrak devleti denetçisi, SSP'nin her sayfasını satır satır okuyup teyit etmek yerine, planın gerçekten uygulandığını dolaylı yollarla doğrular — SSO'nun planın temel unsurlarını bilip bilmediğini sorgulayarak, güvenlik ekipmanının (SSAS, CCTV, erişim kontrol) çalışır durumda olup olmadığını test ederek, tatbikat kayıtlarını inceleyerek ve gemideki fiziksel güvenlik düzenlemelerini (aydınlatma, kısıtlı bölge işaretleri, erişim noktaları) gözlemleyerek. SSP'nin onayı da bu gizliliği korur: plan bayrak devleti (veya yetkili RSO) tarafından onaylanır ve değişiklik yapılacaksa yine bu onay mercii devreye girer; PSC denetçisi genellikle SSP'nin onaylı olduğunu ve mürettebatın içeriğine aşina olduğunu teyit etmekle yetinir, planın kendisini talep etmesi istisnaidir ve sadece güvenlik seviyesi 3 gibi olağanüstü durumlarda gündeme gelebilir.",
      },
    ],
    relatedSlugs: ["isps-code", "solas"],
    resources: [{ label: "ISPS Code", href: "https://www.imo.org/en/OurWork/Security/Pages/ISPS-Code.aspx" }],
  },
  {
    slug: "mlc-cert",
    label: "MLC Certificate – Denizcilik Çalışma Sertifikası",
    category: "Gemi Sertifikaları",
    overview: "MLC 2006 kapsamında geminin çalışma ve yaşam koşullarını sağladığını belgeleyen sertifika; DMLC ile birlikte zorunludur.",
    history: "MLC 2006 (Maritime Labour Convention), 2006'da ILO tarafından kabul edilmiş ve 20 Ağustos 2013'te yürürlüğe girmiştir. Daha önce 68 ayrı ILO sözleşmesini ve tavsiyesini birleştiren kapsamlı bir 'süper sözleşme'dir. SOLAS, MARPOL ve STCW ile birlikte denizciliğin dört temel sözleşmesinden biri kabul edilir. MLC Certificate ve DMLC, 500 GT ve üzeri uluslararası sefer yapan tüm gemilerde zorunludur.",
    applicability: [
      "500 GT ve üzeri uluslararası sefer yapan tüm gemiler – MLC Certificate zorunlu",
      "500 GT altı uluslararası sefer yapan gemiler – MLC'ye uyum zorunlu ancak sertifika isteğe bağlı",
      "Tüm gemilerde (boyut fark etmeksizin) MLC temel hakları geçerli",
    ],
    essentials: [
      "MLC Certificate (Maritime Labour Certificate): bayrak devleti veya yetkili RO tarafından düzenlenir",
      "Sertifika süresi: 5 yıl geçerlilik + ara denetim (intermediate inspection: 2. ve 3. yıl arasında)",
      "DMLC (Declaration of Maritime Labour Compliance): Part I (bayrak devleti) + Part II (şirket) – sertifika eki",
      "14 MLC denetim alanı: asgari yaş, sağlık sertifikası, denizci eğitimi, SEA (Seafarers' Employment Agreement), çalışma/dinlenme saatleri, ücret, tatil, geri dönüş hakkı (repatriation), konaklama, yemek ve ikram, sağlık hizmetleri, gemideki tıbbi bakım, şikâyet mekanizması, mali güvence (P&I)",
      "Çalışma/dinlenme saatleri: minimum 10 saat dinlenme/24 saat, 77 saat dinlenme/7 gün (ikiye bölünebilir)",
      "SEA gereklilikleri: yazılı sözleşme, belirli asgari içerik, denizciye kopya verilmesi",
      "Şikâyet mekanizması (onboard complaint procedures): gemi içi ve kıyı organizasyonu seviyesinde",
      "Mali güvence: P&I kapsamında geri dönüş, ücret alacağı ve kaza tazminatı güvencesi",
    ],
    actions: [
      "DMLC Part II'yi güncel tut ve şirket prosedür değişikliklerinde revize et",
      "Çalışma/dinlenme saatlerini günlük kaydet ve 10/24 – 77/7 kurallarına uy",
      "SEA'ları tüm denizciler için güncel ve eksiksiz tut",
      "Konaklama, yemek ve hijyen standartlarını periyodik denetle",
      "Şikâyet mekanizmasını mürettebata duyur ve aktif tut",
      "Ara denetim tarihini takip et ve zamanında planla",
      "PSC MLC denetimlerine hazırlıklı ol (MLC en sık PSC eksiklik alanlarından biri)",
    ],
    amendments: [
      { year: "2006", description: "MLC 2006 ILO tarafından kabul edildi" },
      { year: "2013", description: "20 Ağustos – MLC 2006 yürürlüğe girdi" },
      { year: "2014", description: "MLC değişiklikleri: mali güvence (financial security) gereklilikleri eklendi" },
      { year: "2018", description: "MLC değişiklikleri: denizci sağlık hakları ve şikâyet mekanizması güncellendi" },
      { year: "2022", description: "MLC değişiklikleri: mürettebat değişimi ve geri dönüş hakkı güncellemeleri (COVID-19 etkisi)" },
    ],
    keyArticles: [
      { id: "MLC Kural 2.3", title: "Çalışma/Dinlenme Saatleri", summary: "Minimum dinlenme saatleri: 10 saat/24 saat, 77 saat/7 gün kuralları." },
      { id: "MLC Kural 2.1", title: "Denizcilik İş Sözleşmesi (SEA)", summary: "Yazılı sözleşme zorunluluğu, asgari içerik gereklilikleri." },
      { id: "MLC Kural 4.2", title: "Armatörün Sorumluluğu", summary: "Kaza, hastalık ve ölüm durumlarında mali güvence ve tazminat yükümlülükleri." },
      { id: "MLC Kural 5.1.3", title: "Sertifikasyon", summary: "MLC Certificate ve DMLC düzenleme, doğrulama ve yenileme prosedürleri." },
    ],
    penalties: [
      "MLC Certificate ve DMLC olmadan uluslararası sefer yapılamaz",
      "PSC denetimlerinde MLC uyumsuzluğu en sık bulunan eksiklikler arasında",
      "Ciddi MLC ihlallerinde geminin alıkonması (özellikle çalışma saatleri, SEA eksikliği, güvenlik/sağlık)",
      "Denizcilerin şikâyet hakkı: liman devletine şikâyet mekanizması → denetim tetikleyebilir",
    ],
    detailedSections: [
      {
        heading: "Denizci haklarının belgelenmesi",
        body:
          "MLC Certificate (Maritime Labour Certificate), bir geminin MLC 2006 kapsamındaki çalışma ve yaşam koşulu standartlarını sağladığını belgeleyen sertifikadır. SOLAS sertifikaları gemiyi, STCW mürettebatın yeterliliğini belgelerken MLC Certificate doğrudan denizcinin insani çalışma koşullarını güvence altına alır. 500 GT ve üzeri uluslararası sefer gemileri için zorunludur; bayrak devleti veya yetkili klas kuruluşu tarafından, 14 MLC denetim alanındaki uyum doğrulandıktan sonra düzenlenir. Beş yıl geçerlidir ve dönem ortasında bir ara denetimden geçer.",
      },
      {
        heading: "On dört denetim alanı ve DMLC ile bağ",
        body:
          "Sertifikanın kapsadığı 14 alan, bir denizcinin gemideki yaşamının neredeyse tamamını kapsar: asgari yaş, sağlık sertifikası, iş sözleşmesi (SEA), çalışma/dinlenme saatleri, ücret, izin, geri dönüş hakkı, konaklama, yemek, sağlık hizmetleri, şikâyet mekanizması ve mali güvence. Bu alanların nasıl karşılandığı, sertifikanın ayrılmaz eki olan DMLC ile belgelenir: Part I bayrak devletinin ulusal gerekliliklerini, Part II ise şirketin bu gerekliliklere nasıl uyduğunu gösterir. Çalışma/dinlenme saatleri (24 saatte en az 10, 7 günde en az 77 saat dinlenme) STCW ile aynı kurallara dayanır ve titizlikle kaydedilir.",
      },
      {
        heading: "Denetimde MLC'nin ağırlığı",
        body:
          "MLC, liman devleti kontrolünde en sık eksiklik bulunan alanlardan biridir; çünkü ödenmemiş ücret, aşırı çalışma, yetersiz yemek veya kötü konaklama gibi sorunlar somut ve kolayca tespit edilebilir. Ciddi MLC ihlalleri geminin alıkonmasına kadar gidebilir. Ayrıca MLC, denizciye doğrudan bir güç verir: gemideki ve kıyıdaki şikâyet mekanizmaları aracılığıyla bir denizci liman devletini harekete geçirebilir ve bu bir denetimi tetikleyebilir. Bu yüzden gemiler DMLC Part II'yi güncel tutar, çalışma saati kayıtlarını düzenli işler ve PSC MLC denetimlerine her zaman hazırlıklı olur.",
      },
      {
        heading: "Çalışma/dinlenme saatleri ve kayıt disiplini",
        body:
          "MLC sertifikasyonunda en sık denetlenen ve en sık eksiklik bulunan alan çalışma/dinlenme saatleridir. Kural, ya azami çalışma (24 saatte en fazla 14, 7 günde en fazla 72 saat) ya da asgari dinlenme (24 saatte en az 10, 7 günde en az 77 saat) sınırıyla uygulanır; dinlenme en fazla iki parçaya bölünebilir ve bir parçası en az 6 saat olmalıdır. Bu saatler her denizci için günlük olarak kaydedilir ve denizciye bir kopyası verilir. Kayıtların gerçeği yansıtması esastır: kâğıt üstünde uyumlu görünen ama fiilen aşırı çalışmayı gizleyen kayıtlar, hem MLC hem STCW ihlalidir ve PSC denetiminde ciddi sonuç doğurur. Bu kurallar STCW'nin yorgunluk hükümleriyle birebir örtüşür; çünkü yorgunluk hem bir denizci hakkı meselesi hem de doğrudan bir emniyet riskidir.",
      },
      {
        heading: "Finansal güvence ve repatriation",
        body:
          "MLC'nin denizciyi en somut biçimde koruyan hükümlerinden biri, geri dönüş (repatriation) hakkı ve bunu destekleyen zorunlu finansal güvencedir. Bir denizci, sözleşmesi bittiğinde, hastalandığında veya gemi/şirket yükümlülüğünü yerine getiremediğinde masrafsız biçimde ülkesine döndürülmek zorundadır. 2014 değişiklikleriyle eklenen finansal güvence (genellikle P&I sigortası yoluyla), armatörün iflası veya denizcinin terk edilmesi (abandonment) durumunda devreye girer: ödenmemiş ücretleri, geri dönüş masraflarını ve temel ihtiyaçları karşılar. Geminin bu finansal güvenceyi gösteren sertifikaları (örneğin terk edilme ve ölüm/uzun süreli iş göremezlik için ayrı belgeler) görünür biçimde gemide bulundurması zorunludur; bunların eksikliği PSC denetiminde eksiklik kaydına yol açar. Bu mekanizma, geçmişte denizcilerin yabancı limanlarda aylarca ücretsiz ve çaresiz bırakıldığı vakalara verilen yanıttır.",
      },
    ],
    relatedSlugs: ["mlc", "dmlc", "psc"],
    resources: [{ label: "MLC 2006", href: "https://www.ilo.org/global/standards/maritime-labour-convention/lang--en/index.htm" }],
  },
  {
    slug: "iopp-cert",
    label: "IOPP Certificate – Petrol Kirliliği Önleme Belgesi",
    category: "Gemi Sertifikaları",
    overview: "MARPOL Ek I kapsamında geminin petrol kirliliği önleme ekipmanı ve prosedürlerini belgeleyen sertifika.",
    history: "IOPP Certificate (International Oil Pollution Prevention Certificate), MARPOL 73/78 Ek I kapsamında düzenlenmektedir. 400 GT ve üzeri tüm gemiler ve tüm petrol tankerleri için zorunludur. Sertifika, geminin petrol kirliliği önleme ekipmanlarının MARPOL Ek I'e uygunluğunu belgeler. Supplement (Form A – tanker olmayan, Form B – tankerler) sertifikanın ayrılmaz parçasıdır.",
    applicability: [
      "400 GT ve üzeri tüm gemiler (tanker olmayan)",
      "150 GT ve üzeri tüm petrol tankerleri",
      "Tüm boyutlarda petrol taşıyan gemiler (bazı muafiyetlerle)",
    ],
    essentials: [
      "Sertifika süresi: 5 yıl geçerlilik + yıllık survey + ara survey (intermediate)",
      "Supplement to IOPP: Form A (tanker olmayan gemiler) veya Form B (tankerler) – ekipman detay listesi",
      "ODM (Oil Discharge Monitoring): 15 ppm'den fazla deşarjda otomatik kapama (tankerler)",
      "OWS (Oil Water Separator): sintine suyundaki yağ içeriğini 15 ppm altına düşüren sistem + 15 ppm alarm ve otomatik kapama",
      "SOPEP (Shipboard Oil Pollution Emergency Plan): petrol kirliliği acil müdahale planı",
      "ORB (Oil Record Book): Part I (makine dairesi operasyonları) ve Part II (kargo/balast operasyonları – tankerler) – tüm yağ operasyonlarının kaydı",
      "Slop tank ve COW (Crude Oil Washing) gereklilikleri (ham petrol tankerleri)",
      "SBT (Segregated Ballast Tanks): kirli balast önleme sistemi (tankerler)",
      "Special areas (özel bölgeler): Akdeniz, Baltık, Karadeniz, Kırmızı Deniz vb. – sıfıra yakın deşarj",
    ],
    actions: [
      "OWS ve 15 ppm alarm/otomatik kapama sistemini düzenli test et ve bakımını yap",
      "ORB Part I ve Part II kayıtlarını eksiksiz, doğru ve güncel tut",
      "SOPEP'i güncel tut ve yılda en az 1 tatbikat yap",
      "Survey tarihlerini (yıllık + ara) planla ve zamanında tamamla",
      "Supplement (Form A/B) bilgilerini ekipman değişikliklerinde güncelle",
      "Special area deşarj kurallarına uyumu doğrula",
      "Bilge holding tank kapasitesini izle ve yasal deşarj koşullarını kontrol et",
    ],
    amendments: [
      { year: "1983", description: "MARPOL 73/78 Ek I yürürlüğe girdi – IOPP zorunlu" },
      { year: "2007", description: "Revize MARPOL Ek I yürürlüğe girdi (çift cidar zorunluluğu kesinleşti)" },
      { year: "2011", description: "MEPC.187(62) – Ek I değişiklikleri: SBT ve özel bölge kuralları güncellendi" },
    ],
    keyArticles: [
      { id: "MARPOL Ek I Kural 6", title: "Survey ve Sertifikasyon", summary: "IOPP Certificate düzenleme, survey aralıkları ve geçerlilik koşulları." },
      { id: "Kural 14", title: "Yağ Deşarj Kontrolü", summary: "15 ppm kuralı, OWS gereklilikleri ve özel bölge deşarj yasakları." },
      { id: "Kural 17", title: "ORB Kayıt Tutma", summary: "Oil Record Book Part I ve Part II kayıt gereklilikleri ve saklama süresi." },
      { id: "Kural 37", title: "SOPEP", summary: "Gemiye özel petrol kirliliği acil müdahale planı gereklilikleri." },
    ],
    penalties: [
      "IOPP Certificate olmadan uluslararası sefer yapılamaz",
      "ORB eksikliği, yanlışlığı veya sahteliğinde ağır yaptırımlar (APPS kapsamında ABD'de cezai)",
      "OWS bypass (magic pipe) tespitinde cezai sorumluluk ve çok yüksek para cezaları",
      "PSC denetimlerinde MARPOL Ek I uyumsuzluğunda alıkoyma",
      "Yasadışı deşarjda çevre kirliliği cezaları ve armatör sorumluluğu",
    ],
    detailedSections: [
      {
        heading: "MARPOL Ek I'in gemideki belgesi",
        body:
          "IOPP Certificate (International Oil Pollution Prevention Certificate), bir geminin MARPOL Ek I kapsamındaki petrol kirliliği önleme ekipman ve prosedürlerine uyduğunu belgeler. 400 GT ve üzeri gemiler ile (daha düşük eşikle) petrol tankerleri için zorunludur. Sertifikanın ayrılmaz bir eki vardır: tanker olmayan gemiler için Form A, tankerler için Form B; bu ekler gemideki kirlilik önleme donanımını ayrıntılı listeler. IOPP, beş yıl geçerlidir ve yıllık ile ara sörveylerle canlı tutulur; donanım değiştiğinde ek (supplement) güncellenir.",
      },
      {
        heading: "Donanım: OWS, ODM ve kayıt defteri",
        body:
          "IOPP'nin arkasındaki teknik gerçeklik, petrolün denize karışmasını önleyen sistemlerdir. Makine dairesinde yağ-su ayırıcı (OWS), sintine suyundaki yağı yasal sınır olan 15 ppm'in altına indirir ve 15 ppm alarmı bu sınır aşıldığında deşarjı otomatik durdurur. Tankerlerde yük deşarjını izleyen ODM, slop tank ve ayrılmış balast tankları (SBT) kirli suyun denize verilmesini engeller. Tüm bu operasyonlar Yağ Kayıt Defterine (ORB) işlenir; bu defter, kirlilik önlemenin kanıtı ve denetimin odak noktasıdır. SOPEP ise olası bir sızıntıya karşı gemiye özel acil müdahale planıdır.",
      },
      {
        heading: "Kayıt bütünlüğü ve ağır yaptırımlar",
        body:
          "IOPP rejiminde en ciddi ihlaller donanım değil, kayıt sahteciliği ve bypass etrafında döner. 'Magic pipe' olarak bilinen, yağ-su ayırıcıyı atlatarak sintineyi doğrudan denize basan düzenekler ve bunların Yağ Kayıt Defterinde gizlenmesi, dünya çapında en ağır biçimde cezalandırılan denizcilik suçlarındandır; özellikle ABD'de APPS kapsamında milyonlarca dolar para cezası ve hapis cezasıyla sonuçlanır. Bu yüzden ORB'nin doğru, eksiksiz ve dürüst tutulması hayati önemdedir. IOPP olmadan gemi sefer yapamaz, MARPOL Ek I uyumsuzluğu ise PSC'de alıkoymaya yol açar.",
      },
      {
        heading: "Supplement (Form A/B) ve ekipman uyumu",
        body:
          "IOPP Certificate'ın ayrılmaz ve aslında en bilgi yüklü parçası, ekidir (supplement): tanker olmayan gemiler için Form A, tankerler için Form B. Bu ek, gemideki tüm petrol kirliliği önleme donanımını tek tek listeler: yağ-su ayırıcının (OWS) kapasitesi ve tipi, 15 ppm izleme ve alarm cihazı, slop tank düzeni, yük petrol kalıntısı izleme cihazı (ODME), ayrılmış balast tankları (SBT) ve ham petrol yıkama (COW) sistemleri. Denetimde, gemideki gerçek donanımın bu listeyle birebir örtüşmesi beklenir; bir ekipman değiştiğinde veya kaldırıldığında supplement güncellenmelidir, aksi halde sertifika ile gerçek durum arasında uyumsuzluk doğar ve bu bir PSC bulgusudur. Supplement, böylece geminin çevre donanımının resmi envanteri ve denetimin yol haritasıdır.",
      },
      {
        heading: "Oil Record Book ve kayıt bütünlüğü",
        body:
          "IOPP rejiminin denetlenebilirliğinin kalbi Yağ Kayıt Defteri'dir (ORB): Part I makine dairesi operasyonlarını (sintine ayırma, sludge transferi/yakma, yakıt alımı), Part II ise tankerlerde kargo/balast operasyonlarını kaydeder. Her giriş, operasyonun türünü, miktarını, zamanını ve konumunu gösterir ve sorumlu zabit ile kaptan tarafından imzalanır; defter belirli süre (genellikle üç yıl) gemide saklanır. ORB, denetimde ilk bakılan belgelerdendir çünkü deşarjların nerede ve nasıl yapıldığını ortaya koyar. En ağır ihlaller donanım arızası değil, kayıt sahteciliği ve bypass etrafında döner: yağ-su ayırıcıyı atlatan 'magic pipe' düzenekleri ve bunların ORB'de gizlenmesi, özellikle ABD'de APPS kapsamında milyonlarca dolar para ve hapis cezasıyla sonuçlanır; ihbarcı (whistleblower) ödülleri bu ihlallerin ortaya çıkmasını teşvik eder. Bu yüzden ORB'nin dürüst ve eksiksiz tutulması, IOPP uyumunun en kritik yönüdür.",
      },
    ],
    relatedSlugs: ["marpol", "oprc"],
    resources: [{ label: "MARPOL Ek I", href: "https://www.imo.org/en/OurWork/Environment/Pages/OilPollution.aspx" }],
  },
  {
    slug: "safety-equipment-cert",
    label: "Safety Equipment Certificate – Emniyet Teçhizat Belgesi",
    category: "Gemi Sertifikaları",
    overview: "SOLAS gereği gemideki can kurtarma, yangın söndürme ve seyir güvenliği teçhizatının yeterliliğini belgeleyen sertifika.",
    history: "Safety Equipment Certificate (Cargo Ship Safety Equipment Certificate), SOLAS 1974 kapsamında düzenlenmektedir. Gemideki can kurtarma teçhizatı (LSA Code), yangın söndürme sistemleri (FSS Code) ve seyir teçhizatının (SOLAS Chapter V) uluslararası standartlara uygunluğunu belgeler. 500 GT ve üzeri kargo gemileri için zorunludur (yolcu gemileri için Passenger Ship Safety Certificate kapsar).",
    applicability: [
      "500 GT ve üzeri uluslararası sefer yapan kargo gemileri",
      "Yolcu gemileri için ayrı Passenger Ship Safety Certificate düzenlenir (aynı teçhizatı kapsar)",
    ],
    essentials: [
      "Sertifika süresi: 5 yıl geçerlilik + yıllık survey + ara survey (intermediate – periodical)",
      "Record of Equipment (Form E): sertifika ekinde detaylı teçhizat listesi – her teçhizat kalemi belirtilir",
      "Can kurtarma teçhizatı: cankurtaran sandalları (lifeboat), can salları (liferaft), cankurtaran simidi, can yeleği, immersion suit, EPIRB, SART/AIS-SART, pyrotechnics",
      "Yangın söndürme teçhizatı: sabit CO₂/foam/water mist sistemleri, taşınabilir söndürücüler, yangın hortumlari, yangın algılama ve alarm sistemleri, yangın kapıları ve damperler",
      "Seyir teçhizatı: radar, ECDIS, AIS, GMDSS, manyetik ve jiroskopik pusula, echo sounder, speed log, VDR/S-VDR",
      "Teçhizat servis/bakım gereklilikleri: yıllık servis (can salları, söndürücüler), 5 yıllık büyük bakım, PSC denetimlerinde test edilebilir durumda olma",
    ],
    actions: [
      "Teçhizat envanterini sertifika ekleriyle (Form E) eşleştir ve tutarsızlık olmamasını sağla",
      "Servis süresi dolan teçhizatı (can salı, söndürücü, EPIRB bataryası, pyrotechnics) survey öncesi yenile",
      "Yıllık survey tarihini bakım planına entegre et",
      "Teçhizat bakım ve test kayıtlarını düzenli tut (yangın pompası, waterlight doors, fire dampers)",
      "GMDSS teçhizatı fonksiyon testlerini haftalık yap ve kaydet",
    ],
    amendments: [
      { year: "1992", description: "LSA Code zorunlu hale geldi – can kurtarma teçhizatı standardizasyonu" },
      { year: "2002", description: "FSS Code zorunlu hale geldi – yangın güvenlik sistemleri standardizasyonu" },
      { year: "2010", description: "SOLAS Chapter V güncellemeleri: AIS, ECDIS, VDR zorunlulukları genişletildi" },
    ],
    keyArticles: [
      { id: "SOLAS Kural I/12", title: "Kargo Gemisi Survey", summary: "Kargo gemisi teçhizat survey'i gereklilikleri ve aralıkları." },
      { id: "SOLAS Chapter III", title: "Can Kurtarma", summary: "Can kurtarma teçhizatı gereklilikleri ve LSA Code referansı." },
      { id: "SOLAS Chapter II-2", title: "Yangın Güvenliği", summary: "Yangın koruma, algılama ve söndürme teçhizatı gereklilikleri." },
      { id: "SOLAS Chapter V", title: "Seyir Güvenliği", summary: "Seyir teçhizatı gereklilikleri: radar, ECDIS, AIS, VDR." },
    ],
    penalties: [
      "Safety Equipment Certificate olmadan uluslararası sefer yapılamaz",
      "Form E ile gemideki teçhizat uyumsuzluğunda PSC eksiklik ve alıkoyma riski",
      "Servis süresi geçmiş teçhizat (expired liferaft, extinguisher) PSC'de doğrudan eksiklik",
      "Teçhizat testi başarısız olursa (fire pump, davit) alıkoyma olasılığı yüksek",
    ],
    detailedSections: [
      {
        heading: "Üç emniyet alanını tek belgede toplamak",
        body:
          "Safety Equipment Certificate, bir kargo gemisinin üç kritik emniyet alanındaki donanımının SOLAS standartlarına uyduğunu tek bir belgede toplar: can kurtarma (LSA Code), yangın söndürme (FSS Code) ve seyir güvenliği (SOLAS Chapter V). 500 GT ve üzeri kargo gemileri için zorunludur; yolcu gemilerinde aynı kapsam daha geniş Passenger Ship Safety Certificate içinde yer alır. Sertifikanın özünde, gemideki her bir emniyet teçhizatı kalemini tek tek listeleyen Record of Equipment (Form E) bulunur; denetimde bu liste ile gemideki gerçek donanımın birebir örtüşmesi beklenir.",
      },
      {
        heading: "Servis döngüsü ve denetlenebilirlik",
        body:
          "Bu sertifikanın asıl zorluğu, kapsadığı donanımın büyük bölümünün düzenli servis gerektirmesidir. Can salları yıllık servise gönderilir, yangın söndürücüler periyodik şarj edilir, EPIRB bataryaları ve piroteknik malzemeler son kullanma tarihine bağlıdır, matafora (davit) düzenekleri beş yıllık yük testinden geçer. Sertifika beş yıl geçerli olsa da yıllık ve ara sörveylerle sürekli denetlenir. PSC denetiminde servis süresi geçmiş bir can salı veya çalışmayan bir yangın pompası doğrudan eksiklik, hatta alıkoyma sebebidir. Bu yüzden teçhizat bakımı, sertifikanın geçerliliğini sürdürmenin ayrılmaz parçasıdır ve LSA/FSS Code'ların standartlarına dayanır.",
      },
      {
        heading: "Record of Equipment (Form E) ve envanter uyumu",
        body:
          "Safety Equipment Certificate'ın işlevsel kalbi, ekindeki Record of Equipment'tir (kargo gemileri için Form E). Bu liste, gemideki her bir can kurtarma, yangın ve seyir teçhizatı kalemini sayısıyla birlikte tek tek belgeler: kaç can filikası ve salı, kaç can yeleği ve dalma elbisesi, hangi yangın söndürme sistemleri, hangi seyir cihazları (radar, ECDIS, AIS, VDR) bulunduğu kayıt altındadır. Denetimde, gemideki gerçek donanımın bu liste ile birebir örtüşmesi beklenir; eksik veya listede olmayan bir teçhizat, doğrudan bir PSC bulgusudur. Teçhizat değiştiğinde Form E güncellenmelidir. Bu yapı, sertifikanın yalnızca bir 'uygunluk damgası' değil, geminin emniyet envanterinin denetlenebilir bir kaydı olmasını sağlar.",
      },
      {
        heading: "Servis döngüsü ve operasyonel denetim",
        body:
          "Bu sertifikanın kapsadığı donanımın büyük bölümü düzenli servis ve test gerektirir; sertifikanın geçerliliği fiilen bu bakım disiplinine bağlıdır. Can salları yıllık akredite servise gönderilir, yangın söndürücüler periyodik şarj edilir, EPIRB bataryaları ve piroteknik malzemeler son kullanma tarihine bağlıdır, matafora (davit) düzenekleri beş yıllık yük testinden geçer, GMDSS ve seyir cihazları fonksiyon testlerine tabidir. Sertifika beş yıl geçerli olsa da yıllık ve ara (periyodik) sörveylerle sürekli izlenir. Denetimde donanım yalnızca görülmez, çalıştırılır da: yangın pompası basıncı, acil jeneratör, su geçirmez/yangın kapıları ve alarm sistemleri operasyonel olarak sınanabilir. Servis süresi geçmiş bir can salı veya çalışmayan bir yangın pompası doğrudan eksiklik, hatta alıkoyma sebebidir; teknik standartların ayrıntısı LSA ve FSS Code'lara dayanır.",
      },
      {
        heading: "Yıllık/beş yıllık servis takviminin somut ayrıntısı",
        body:
          "Can kurtarma donanımının bakım takvimi, teçhizat türüne göre farklı ritimlerle işler ve bu ritimlerin aksaması sertifikanın fiilen anlamsızlaşmasına yol açar. Şişme can salları (inflatable liferaft), üreticinin belirlediği periyotta (genellikle yıllık, bazı yeni tasarımlarda uzatılmış aralıklarla) bayrak devleti onaylı bir servis istasyonuna gönderilir; burada sal açılır, sızdırmazlığı, şişirme mekanizması, hidrostatik serbest bırakma cihazı ve içindeki acil malzemeler (su, gıda, sinyal ekipmanı) tek tek kontrol edilir ve değiştirilir. Piroteknik malzemeler (el fişekleri, paraşütlü işaret fişekleri, duman sinyalleri) sabit bir son kullanma tarihine bağlıdır ve süresi dolanlar güvenli bertaraf prosedürüyle (genellikle üretici veya yetkili kuruluş aracılığıyla) imha edilip yenisiyle değiştirilir; süresi geçmiş bir piroteknik malzemenin gemide tutulması bile PSC'de doğrudan eksiklik sebebidir. Cankurtaran filikası davitlerinin vinç freni (winch brake) ise yıllık yük testinden ve beş yılda bir daha kapsamlı statik/dinamik yük testinden geçer; fren yetersizse filikanın kontrolsüz düşme riski doğar. Bu üç kalem, PSC istatistiklerinde en sık rastlanan eksiklik türleri arasındadır, çünkü süre takibi çok sayıda parçayı kapsar ve tek bir gözden kaçan tarih doğrudan bulgu olarak kayda geçer.",
      },
      {
        heading: "Form E'nin canlı doküman niteliği",
        body:
          "Record of Equipment (Form E), sertifikanın verildiği tarihte donmuş bir liste değil, geminin donanımıyla eş zamanlı güncellenmesi gereken canlı bir belgedir. Bir can salı değiştirildiğinde, bir yangın söndürme sistemi yenilendiğinde veya bir seyir cihazı farklı bir modelle ikame edildiğinde, bu değişiklik Form E'ye işlenmeli ve gerekiyorsa klas/bayrak onayından geçmelidir. Bunun ihmal edilmesinin sonucu, salt bürokratik bir eksiklik değildir: denetçi gemide fiilen bulunan bir ekipmanı Form E'de bulamadığında veya Form E'de yazan bir kalemi gemide göremediğinde, bu tutarsızlık kendi başına bir PSC bulgusu olarak kaydedilir, çünkü sertifikanın güvence verdiği şey tam olarak bu listenin doğruluğudur. Uygulamada bu, ekipman tedarik ve bakım süreçlerinin teknik departmanla dokümantasyon süreci arasında sıkı bir koordinasyon gerektirdiği anlamına gelir; bir yedek parça veya donanım değişimi satın alma kaydına düşse de Form E'ye yansıtılmazsa, sertifika ile gerçek durum arasında sessizce büyüyen bir boşluk oluşur ve bu boşluk genellikle en can alıcı anda, bir denetim veya kaza sırasında ortaya çıkar.",
      },
    ],
    relatedSlugs: ["solas", "lsa-code", "fss-code"],
    resources: [{ label: "SOLAS sertifikalar", href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Safety-of-Life-at-Sea.aspx" }],
  },
  {
    slug: "safety-radio-cert",
    label: "Safety Radio Certificate – Telsiz Emniyet Belgesi",
    category: "Gemi Sertifikaları",
    overview: "GMDSS telsiz ekipmanının SOLAS Chapter IV gerekliliklerine uygunluğunu belgeleyen sertifika.",
    history: "Safety Radio Certificate (Cargo Ship Safety Radio Certificate), GMDSS'nin (Global Maritime Distress and Safety System) 1999'da tam olarak uygulanmaya başlamasıyla zorunlu hale gelmiştir. SOLAS Chapter IV kapsamında düzenlenir. Geminin seyir bölgesine (Sea Area A1-A4) göre asgari telsiz teçhizatı gereklilikleri belirlenir.",
    applicability: [
      "300 GT ve üzeri uluslararası sefer yapan tüm kargo gemileri",
      "Tüm yolcu gemileri (boyut fark etmeksizin)",
    ],
    essentials: [
      "Sertifika süresi: 5 yıl geçerlilik + periyodik survey (yıllık veya periodical)",
      "Record of Equipment (Form R): sertifika ekinde telsiz ekipman listesi",
      "Sea Area gereklilikleri: A1 (VHF DSC), A2 (MF DSC eklenir), A3 (HF veya Inmarsat eklenir), A4 (HF DSC zorunlu)",
      "Zorunlu GMDSS ekipmanları: VHF DSC, MF/HF DSC, Inmarsat-C, EPIRB (406 MHz – COSPAS-SARSAT), SART/AIS-SART, NAVTEX, EGC (SafetyNET)",
      "Yedekleme seçenekleri: shore-based maintenance (SBM), at-sea maintenance (ASM), duplication of equipment",
      "Fonksiyon test gereklilikleri: haftalık VHF/MF/HF test, aylık EPIRB/SART test, yıllık tam fonksiyon testi",
      "Batarya gereklilikleri: GMDSS batarya kapasitesi – minimum 1 saat (6 saat önerilir) reserve power",
      "Radio log: telsiz kayıt tutma zorunluluğu – tehlike ve güvenlik haberleşmeleri",
    ],
    actions: [
      "EPIRB ve SART pil/HRD (Hydrostatic Release Device) tarihlerini izle ve zamanında değiştir",
      "Telsiz ekipman fonksiyon testlerini haftalık kaydet (DSC test call dahil)",
      "Sertifika eklerini (Form R) ekipman değişikliklerinde güncelle",
      "GMDSS batarya kapasitesini kontrol et ve değişim takvimini planla",
      "Periyodik survey tarihini planla ve zamanında tamamla",
      "Telsiz operatörü (GMDSS GOC sertifikalı) yeterliliğini doğrula",
    ],
    amendments: [
      { year: "1988", description: "GMDSS SOLAS değişiklikleri kabul edildi" },
      { year: "1999", description: "GMDSS tam uygulama – Morse code sistemi sonlandırıldı" },
      { year: "2024", description: "GMDSS modernizasyon değişiklikleri (e-navigation, VDES entegrasyonu)" },
    ],
    keyArticles: [
      { id: "SOLAS IV/7-11", title: "Telsiz Ekipman Gereklilikleri", summary: "Sea Area'ya göre zorunlu GMDSS ekipman listesi ve teknik standartlar." },
      { id: "SOLAS IV/15", title: "Bakım Gereklilikleri", summary: "GMDSS ekipmanlarının bakım seçenekleri: SBM, ASM, duplication." },
      { id: "SOLAS Kural I/8", title: "Radio Survey", summary: "Telsiz survey türleri, aralıkları ve sertifika geçerlilik koşulları." },
    ],
    penalties: [
      "Safety Radio Certificate olmadan uluslararası sefer yapılamaz",
      "GMDSS ekipman arızası ve yedekleme yetersizliğinde PSC alıkoyma riski",
      "EPIRB kayıt eksikliği veya yanlışlığında SAR koordinasyonunda aksaklık ve cezai sorumluluk",
      "GMDSS operatör sertifikası olmayan kişinin telsiz kullanmasında bayrak devleti yaptırımları",
    ],
    detailedSections: [
      {
        heading: "GMDSS ve sea area mantığı",
        body:
          "Safety Radio Certificate, bir geminin telsiz donanımının SOLAS Chapter IV ve GMDSS (Global Maritime Distress and Safety System) gerekliliklerine uyduğunu belgeler. GMDSS'nin temel fikri, bir geminin tehlike çağrısının her koşulda ve otomatik olarak ilgili kurtarma merkezlerine ulaşmasını garanti etmektir. Donanım gereklilikleri geminin seyrettiği deniz alanına göre belirlenir: kıyıya yakın A1'de VHF DSC yeterliyken, açık okyanusta seyreden A3/A4 gemileri HF veya uydu (Inmarsat) sistemlerini de taşımak zorundadır. Böylece her gemi, bulunduğu konumdan yardım çağırabilecek asgari donanıma sahip olur.",
      },
      {
        heading: "Yedeklilik, test ve operatör yeterliliği",
        body:
          "GMDSS'in güvenilirliği yedekliliğe dayanır: tehlike anında tek bir cihazın arızası iletişimi kesmemelidir, bu yüzden gemiler kıyı bakımı, deniz bakımı veya cihaz ikileme gibi yöntemlerle yedekleme sağlar. EPIRB (otomatik tehlike vericisi) ve SART (arama-kurtarma transponderi) gibi can alıcı cihazların pil ve hidrostatik serbest bırakma tarihleri izlenir, fonksiyon testleri (haftalık, aylık, yıllık) düzenli yapılır ve kaydedilir. GMDSS bataryası, ana güç kesildiğinde sistemi besleyecek yeterli rezerve sahip olmalıdır. Donanımın yanı sıra, telsizi kullanan kişinin GMDSS operatör sertifikası (GOC) taşıması gerekir; sertifika veya çalışır donanım eksikliği PSC'de alıkoyma riski doğurur.",
      },
      {
        heading: "Deniz alanları ve zorunlu donanımın derinlemesine yapısı",
        body:
          "Safety Radio Certificate'ın temel mantığı, geminin telsiz donanımını seyrettiği deniz alanına (sea area) göre belirlemektir; çünkü tehlike çağrısını hangi sistemle iletebileceği bulunduğu konuma bağlıdır. A1, bir VHF DSC sahil istasyonunun menzilindeki kıyı sularıdır ve VHF DSC yeterlidir. A2, bir MF DSC istasyonu menzilini ekler. A3, uydu (Inmarsat) veya HF kapsamındaki açık denizleri, A4 ise uydu kapsamı dışındaki kutup bölgelerini kapsar ve HF DSC'yi zorunlu kılar. Her alan, bir öncekinin donanımına yenilerini ekleyerek katmanlı bir yapı oluşturur. Zorunlu GMDSS donanımı; VHF/MF/HF DSC, Inmarsat-C, EPIRB, SART/AIS-SART, NAVTEX ve güvenlik mesajı alıcılarını içerir. Record of Equipment (Form R), bu donanımı tek tek belgeler ve denetimde gemideki gerçek durumla karşılaştırılır.",
      },
      {
        heading: "Yedeklilik, test ve operatör yeterliliği",
        body:
          "GMDSS'in güvenilirliği yedekliliğe dayanır: tehlike anında tek bir cihazın arızası iletişimi kesmemelidir, bu yüzden gemiler kıyı bakımı (SBM), deniz bakımı (ASM) veya cihaz ikileme (duplication) gibi yöntemlerle yedekleme sağlar; açık deniz (A3/A4) gemileri genellikle birden çok bağımsız iletişim yolu taşır. Can alıcı cihazların hazır olması düzenli testle güvence altına alınır: EPIRB ve SART'ın pil ile hidrostatik serbest bırakma tarihleri izlenir ve zamanında değiştirilir, fonksiyon testleri (haftalık VHF/DSC, aylık EPIRB/SART, yıllık tam test) yapılır ve telsiz kayıt defterine işlenir. GMDSS bataryası, ana güç kesildiğinde sistemi besleyecek yeterli rezerve sahip olmalıdır. Donanımın yanı sıra operatörün de yeterli olması gerekir: telsizi kullanan kişi geçerli bir GMDSS operatör sertifikası (GOC) taşımalıdır. Çalışmayan donanım, yetersiz yedeklilik veya sertifikasız operatör PSC denetiminde alıkoyma riski doğurur.",
      },
      {
        heading: "Seyir bölgesi değiştikçe donanımın fiilen artması",
        body:
          "Bir geminin trafik deseni değiştiğinde (örneğin kıyı sularında çalışan bir gemi açık okyanus seferine geçtiğinde) sertifikalandırıldığı sea area de yükseltilmek zorundadır ve bu, kâğıt üzerinde bir güncelleme değil, gemide fiilen ek donanım kurulmasını gerektirir. Sadece A1'de sertifikalı bir gemi VHF DSC ile yetinebilirken, A2'ye geçiş MF DSC vericisinin eklenmesini, A3'e geçiş Inmarsat terminali veya HF donanımının kurulmasını, A4'e geçiş ise HF DSC'nin zorunlu hale gelmesini gerektirir. Bir gemi, sertifikalandırıldığı sea area'nın dışına, gerekli donanımı kurmadan sefer ederse, bu hem SOLAS Chapter IV'ün doğrudan ihlali hem de fiili bir emniyet açığıdır: o bölgede tehlike çağrısını iletebilecek sistem gemide yoktur. PSC ve bayrak devleti denetimleri, geminin fiili sefer bölgesini (son limanlar, planlanan rota) sertifikadaki sea area beyanıyla karşılaştırır; bir uyumsuzluk tespit edilirse bu doğrudan bir eksiklik, ciddi durumlarda alıkoyma sebebidir. Bu yüzden bir geminin ticaret bölgesi genişletilmeden önce, telsiz donanımının yükseltilmesi ve sertifikanın buna göre güncellenmesi operasyonel planlamanın ön şartıdır.",
      },
      {
        heading: "Bakım seçeneğinin sözleşmesel karşılığı",
        body:
          "SOLAS Chapter IV, GMDSS donanımının bakımını üç yöntemden biriyle (veya birkaçının birleşimiyle) sağlamayı şart koşar, ama bu seçim armatör için soyut bir tercih değil, somut bir sözleşme yükümlülüğüdür. Kıyı bakımı (shore-based maintenance – SBM) seçildiğinde, armatör bayrak devleti tarafından tanınmış bir radyo bakım sağlayıcısıyla resmi bir servis anlaşması imzalamak ve bu sağlayıcının belirli aralıklarla (genellikle yıllık) gemiye çıkıp donanımı test etmesini, arıza teşhisi yapmasını ve gerektiğinde parça değiştirmesini sözleşmeyle güvence altına almak zorundadır; bu anlaşmanın kanıtı (servis sertifikaları, ziyaret raporları) denetimde talep edilebilir. Deniz bakımı (at-sea maintenance – ASM) seçildiğinde ise sorumluluk gemi mürettebatına kayar: bu durumda ilgili zabitin (genellikle ikinci zabit veya elektrik zabiti) GMDSS bakım eğitimi almış ve gerekli yedek parça/test ekipmanının gemide bulunması şarttır. Cihaz ikileme (duplication) seçeneği ise bakım yükünü azaltmak yerine arıza riskini yedekli donanımla telafi eder. Armatörün bu üç yoldan hangisini seçtiği DMLC benzeri biçimde belgelenir ve denetimde hangi yöntemin seçildiğinin fiilen uygulandığı (sözleşme, eğitim kaydı veya yedek donanımın varlığı) sorgulanır; seçilen yöntemin kâğıt üzerinde kalması, donanım arızasında telafisiz bir emniyet açığına dönüşür.",
      },
    ],
    relatedSlugs: ["solas"],
    resources: [{ label: "SOLAS Chapter IV", href: "https://www.imo.org/en/OurWork/Safety/Pages/RadioCommunications.aspx" }],
  },
  {
    slug: "safety-construction-cert",
    label: "Safety Construction Certificate – İnşa Emniyet Belgesi",
    category: "Gemi Sertifikaları",
    overview: "Gemi gövdesi, makineleri ve elektrik tesislerinin SOLAS Chapter II-1 ve II-2 gerekliliklerine uygunluğunu belgelendirir.",
    history: "Safety Construction Certificate (Cargo Ship Safety Construction Certificate), SOLAS 1974 kapsamında 500 GT ve üzeri kargo gemileri için zorunlu olarak düzenlenmektedir. Geminin yapısal tasarımı, bölmeleme, stabilite, makine, elektrik ve yangın bütünlüğü standartlarına uygunluğunu belgeler. Genellikle klas kuruluşu tarafından bayrak devleti adına (RO olarak) düzenlenir.",
    applicability: [
      "500 GT ve üzeri uluslararası sefer yapan tüm kargo gemileri",
      "Yolcu gemileri için ayrı Passenger Ship Safety Certificate düzenlenir",
    ],
    essentials: [
      "Sertifika süresi: 5 yıl geçerlilik + yıllık survey + ara survey (intermediate)",
      "Record of Equipment (Form C): sertifika ekinde yapısal detay listesi",
      "Yapısal bütünlük: gövde, bölmeleme ve stabilite doğrulaması (damage stability dahil)",
      "Makine ve elektrik tesislerinin emniyet kontrolleri: ana makine, jeneratörler, pompa sistemleri, elektrik dağıtımı",
      "Yangın bütünlüğü: A sınıfı ve B sınıfı bölmeler, yangın kapıları, fire damperler, cephe izolasyonu",
      "Su geçirmez bölmeler: watertight doors, bulkhead penetrations, bilge wells",
      "Stabilite bilgi kitapçığı: gemide bulundurma zorunlu – onaylı yükleme durumları",
      "Emergency systems: acil yangın pompası, acil jeneratör, acil tiller sistemi",
    ],
    actions: [
      "Yapısal modifikasyonları sertifika kapsamıyla doğrula ve klas/bayrak onayı al",
      "Su geçirmez kapı ve yangın kapısı testlerini periyodik yap ve kaydet",
      "Sertifika yenileme survey'ini klas denetimiyle koordine et",
      "Form C bilgilerini yapısal değişikliklerde güncelle",
      "Fire damper testlerini düzenli yap (açma/kapama fonksiyon testi)",
      "Emergency generator ve emergency fire pump testlerini haftalık/aylık kaydet",
    ],
    amendments: [
      { year: "2009", description: "SOLAS Chapter II-1 yapısal güvenlik gereklilikleri güncellendi" },
      { year: "2014", description: "SOLAS Chapter II-2 yangın güvenlik gereklilikleri güncellendi (MSC.365(93))" },
      { year: "2020", description: "Damage stability gereklilikleri güncellendi" },
    ],
    keyArticles: [
      { id: "SOLAS II-1/Part A-1", title: "Yapı", summary: "Gemi gövdesi yapısal gereklilikleri, klas standartlarına referans." },
      { id: "SOLAS II-1/Part B", title: "Bölmeleme ve Stabilite", summary: "Su geçirmez bölmeleme, hasar stabilitesi ve bölmeleme yük çizgisi." },
      { id: "SOLAS II-2/Part A", title: "Yangın Bütünlüğü", summary: "A/B sınıfı bölmeler, yangın koruma malzemeleri ve düzenleme kuralları." },
      { id: "SOLAS Kural I/10", title: "Construction Survey", summary: "İnşa survey gereklilikleri, aralıkları ve sertifika düzenleme koşulları." },
    ],
    penalties: [
      "Safety Construction Certificate olmadan uluslararası sefer yapılamaz",
      "Yapısal bütünlük sorunlarında (çatlak, korozyon, deformasyon) acil onarım ve potansiyel alıkoyma",
      "Yangın bütünlüğü ihlallerinde PSC'de ciddi eksiklik ve alıkoyma",
      "Yetkisiz yapısal modifikasyonda sertifika geçersizliği riski",
    ],
    detailedSections: [
      {
        heading: "Geminin iskeletinin sertifikası",
        body:
          "Safety Construction Certificate, bir geminin yapısal ve mekanik temelinin SOLAS Chapter II-1 (yapı, bölmeleme, stabilite, makine, elektrik) ve II-2 (yangın bütünlüğü) gerekliliklerine uyduğunu belgeler. Diğer SOLAS sertifikaları donanımı ve operasyonu ele alırken bu sertifika geminin 'iskeletini' güvence altına alır: gövdenin sağlamlığını, su geçirmez bölmelemeyi, hasar durumunda yüzer kalma kabiliyetini (damage stability) ve yangının yayılmasını sınırlayan yapısal bölmeleri kapsar. Genellikle klas kuruluşu tarafından bayrak devleti adına (RO olarak) düzenlenir, çünkü değerlendirilen konular klasın yapısal uzmanlığıyla doğrudan örtüşür.",
      },
      {
        heading: "Yapısal bütünlük, yangın bölmeleri ve acil sistemler",
        body:
          "Sertifikanın kapsadığı alanlar geminin hayatta kalma kabiliyetinin çekirdeğidir. Su geçirmez kapılar ve perdeler bir bölmenin su almasının tüm gemiye yayılmasını engeller; A ve B sınıfı yangın bölmeleri, yangın kapıları ve damperler bir yangının belirli süre boyunca komşu mahallere geçmesini sınırlar. Onaylı stabilite bilgi kitapçığı, geminin hangi yükleme durumlarında güvenle dengede kalacağını gösterir ve gemide bulundurulur. Acil sistemler (acil yangın pompası, acil jeneratör, acil dümen donanımı), ana sistemler devre dışı kaldığında devreye girer. Yapısal bir değişiklik yapıldığında klas/bayrak onayı gerekir; yetkisiz modifikasyon sertifikayı geçersiz kılabilir, yapısal/yangın bütünlüğü ihlalleri ise PSC'de ciddi eksiklik ve alıkoyma doğurur.",
      },
      {
        heading: "Bölmeleme, hasar stabilitesi ve su geçirmezlik",
        body:
          "Safety Construction Certificate'ın kapsadığı en kritik konu, geminin hasar gördüğünde hayatta kalma kabiliyetidir. Su geçirmez perdeler gemiyi kompartımanlara böler ve bir veya daha fazla bölme su aldığında geminin yüzer ve dengede kalmasını sağlar; hasar stabilite hesapları, belirli hasar senaryolarında geminin batmadan ve devrilmeden kalacağını kanıtlamak zorundadır. Su geçirmez kapılar, perde geçişleri ve sintine kuyuları bu bütünlüğü korur; onaylı stabilite bilgi kitapçığı ise hangi yükleme durumlarında geminin güvenle dengede kalacağını gösterir ve gemide bulundurulur. Çift dip ve güçlendirilmiş yapısal elemanlar, tek bir hasarın domino etkisiyle tüm gemiyi batırmasını önler. Bu gereklilikler, klas kuruluşunun yapısal uzmanlığıyla doğrudan örtüştüğü için sertifika genellikle klas tarafından bayrak adına düzenlenir.",
      },
      {
        heading: "Yangın bütünlüğü, acil sistemler ve modifikasyon kontrolü",
        body:
          "Sertifika, geminin yangına karşı yapısal direncini de kapsar: A ve B sınıfı yangın bölmeleri (farklı dayanım süreleriyle), yangın kapıları, damperler ve yanmaz/geç tutuşan malzemeler bir mahaldeki yangının komşu mahallere geçmesini geciktirir ve tahliye için zaman kazandırır. Acil sistemler, ana sistemler devre dışı kaldığında devreye girer: acil yangın pompası, acil jeneratör ve acil dümen donanımı bunların başlıcalarıdır ve düzenli test edilir. Sertifikanın geçerliliği, geminin onaylı yapısal durumunu korumasına bağlıdır: yapısal bir değişiklik (üst yapı ekleme, bölme değiştirme, açıklık açma) yapılacaksa önceden klas/bayrak onayı alınmalıdır; yetkisiz modifikasyon sertifikayı geçersiz kılabilir. Yapısal bütünlük sorunları (çatlak, ileri korozyon, deformasyon) veya yangın bütünlüğü ihlalleri PSC denetiminde ciddi eksiklik ve alıkoyma doğurur.",
      },
      {
        heading: "Büyük tadilatların sertifika üzerindeki etkisi",
        body:
          "Safety Construction Certificate, geminin inşa anındaki veya son büyük tadilat anındaki onaylı yapısal durumunu yansıtır; bu durumu değiştiren her önemli müdahale, sertifikanın dayandığı temeli sarsar. Örneğin geminin üst güvertesine yeni bir kabin bloğu eklenmesi, mevcut bir açık alanın kapatılarak kapalı hacme dönüştürülmesi veya bir su geçirmez bölmenin yerinin değiştirilmesi gibi yapısal değişiklikler, geminin bölmeleme düzenini, hasar stabilitesi hesaplarını, yangın bölme planını veya toplam ağırlık dağılımını doğrudan etkiler. Bu tip bir müdahale yapılmadan önce klas ve bayrak devletinin ön onayı alınmalıdır; onay sonrası ise değişikliğin fiilen SOLAS Chapter II-1/II-2 gerekliliklerini karşıladığını doğrulayan bir survey yapılır ve sertifika bu survey sonucuna göre yeniden teyit edilir veya güncellenir. Bu süreç tamamlanmadan yapılan bir 'sessiz' tadilat, sertifikayı fiilen geçersiz kılar; çünkü belge artık geminin gerçek yapısal durumunu doğru yansıtmamaktadır. PSC denetçileri, özellikle yaşlı gemilerde, sertifikadaki plan bilgileriyle gemide gözlemledikleri fiziksel düzenlemeyi karşılaştırarak yetkisiz modifikasyon izi arar; bu tür bir uyumsuzluk ciddi bir eksiklik olarak kayda geçer.",
      },
      {
        heading: "Neden ayrı sertifikalar: donanım-yapı ile yönetim-donanım ayrımı",
        body:
          "Safety Construction Certificate'ın kapsamı ile Safety Equipment Certificate ve SMC'nin kapsamı arasındaki çizgi, denizcilik sertifikasyon mimarisinin temel mantığını yansıtır: geminin sabit, kalıcı 'donanımı' (hardware) ile hareketli/değiştirilebilir teçhizatı ve yönetsel sistemleri ayrı belgelerle güvence altına alınır. Safety Construction Certificate, gövde, bölmeleme, ana makine, elektrik dağıtımı ve yangın bölmeleri gibi geminin fiziksel iskeletini ve kalıcı olarak monte edilmiş sistemlerini kapsar; bunlar değişmesi zor, pahalı ve yapısal onay gerektiren unsurlardır. Safety Equipment Certificate ise can salları, yangın söndürücüler ve seyir cihazları gibi taşınabilir veya değiştirilebilir donanımı kapsar; bunlar daha sık servis, değişim ve yenileme döngüsüne sahiptir. SMC ise hiçbir fiziksel donanımı değil, bu donanımın nasıl yönetildiğini, hangi prosedürlerle işletildiğini ve mürettebatın bu prosedürleri nasıl uyguladığını güvence altına alır. Bu üçlü ayrım keyfi değildir: her biri farklı bir denetim uzmanlığı (yapısal mühendislik, teçhizat/donanım standartları, yönetim sistemi denetimi) ve farklı bir yenileme/servis ritmi gerektirir; tek bir sertifikada birleştirilmeleri hem denetim sürecini karmaşıklaştırır hem de bir alandaki değişikliğin (örneğin bir teçhizat yenilemesinin) diğer alanların (yapısal onay) gereksiz yere tekrar açılmasına yol açardı.",
      },
    ],
    relatedSlugs: ["solas", "class-survey"],
    resources: [{ label: "SOLAS Chapter II", href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Safety-of-Life-at-Sea.aspx" }],
  },
  {
    slug: "iapp-cert",
    label: "IAPP Certificate – Hava Kirliliği Önleme Belgesi",
    category: "Gemi Sertifikaları",
    overview: "MARPOL Ek VI kapsamında geminin hava emisyonları, yakıt kalitesi ve enerji verimliliği gerekliliklerine uyumunu belgelendirir.",
    history: "IAPP Certificate (International Air Pollution Prevention Certificate), MARPOL Ek VI'nın 2005'te yürürlüğe girmesiyle zorunlu hale gelmiştir. 400 GT ve üzeri gemiler ile tüm sabit ve yüzer sondaj platformları için düzenlenir. NOx (azot oksitler), SOx (kükürt oksitler), ODS (ozon tabakasını incelten maddeler), VOC (uçucu organik bileşikler) ve enerji verimliliği (EEXI/CII) gerekliliklerini kapsar.",
    applicability: [
      "400 GT ve üzeri uluslararası sefer yapan tüm gemiler",
      "Sabit ve yüzer sondaj platformları (MODU)",
      "MARPOL Ek VI'ya taraf devletlerin bayraklarını taşıyan gemiler",
    ],
    essentials: [
      "Sertifika süresi: 5 yıl geçerlilik + yıllık survey + ara survey (intermediate)",
      "Supplement to IAPP: motor, yakıt, EGCS, ODS ve enerji verimliliği detayları",
      "NOx Teknik Dosyası: her dizel motorun (130 kW üzeri) emisyon sertifikasyonu – Tier I (2000), Tier II (2011), Tier III (NECA bölgelerinde 2016/2021)",
      "NOx Tier III gereklilikleri: NECA (NOx Emission Control Areas) bölgelerinde: Kuzey Amerika, ABD Karayip, Baltık ve Kuzey Denizi (2021)",
      "SOx uyumu: yakıt kükürt limiti (%0.50 küresel, %0.10 SECA) veya EGCS (scrubber) onayı",
      "SEEMP (Ship Energy Efficiency Management Plan): Part I (genel), Part II (DCS), Part III (CII) – gemide bulundurma zorunlu",
      "EEXI doğrulaması: 2023'ten itibaren IAPP sertifikasına EEXI onayı eklenir",
      "ODS (Ozone Depleting Substances) kayıt gereklilikleri: halon, CFC, HCFC kullanımının kaydı ve raporlanması",
      "VOC Management Plan: ham petrol tankerleri için zorunlu (belirli limanlar/terminallerde)",
      "Shipboard incinerator: 2000 sonrası kurulan yakıcılar MEPC.244(66) onaylı olmalı",
    ],
    actions: [
      "NOx Teknik Dosyasını motor bakımlarıyla (injector, turbocharger, timing) güncel tut",
      "Yakıt numune ve BDN kayıtlarını IAPP survey'e hazır bulundur",
      "EGCS kullanımında emisyon verilerini (SOx, pH, PAH) periyodik olarak doğrula ve kaydet",
      "ODS kaydını güncel tut: envanter, sızıntı kayıtları ve bertaraf",
      "SEEMP Part I-II-III'ü güncel tut ve revizyon tarihlerini takip et",
      "EEXI Technical File'ı survey'de hazır bulundur",
      "Shipboard incinerator bakım ve onay belgelerini kontrol et",
    ],
    amendments: [
      { year: "2005", description: "MARPOL Ek VI yürürlüğe girdi – IAPP Certificate zorunlu" },
      { year: "2011", description: "Revize MARPOL Ek VI yürürlüğe girdi – EEDI/SEEMP ve NOx Tier II zorunlu" },
      { year: "2016", description: "NOx Tier III – Kuzey Amerika NECA'da zorunlu" },
      { year: "2020", description: "Küresel kükürt limiti %0.50 – IAPP survey'de SOx uyumu kontrol altında" },
      { year: "2021", description: "NOx Tier III – Baltık ve Kuzey Denizi NECA'larda zorunlu" },
      { year: "2023", description: "EEXI ve CII – IAPP sertifikasına enerji verimliliği doğrulaması eklendi" },
    ],
    keyArticles: [
      { id: "MARPOL Ek VI Kural 6", title: "IAPP Survey ve Sertifikasyon", summary: "IAPP Certificate düzenleme, survey aralıkları ve geçerlilik koşulları." },
      { id: "Kural 13", title: "NOx Emisyonları", summary: "Dizel motor NOx emisyon limitleri (Tier I, II, III) ve NOx Teknik Dosyası gereklilikleri." },
      { id: "Kural 14", title: "SOx Emisyonları", summary: "Yakıt kükürt limitleri (küresel ve SECA) ve EGCS alternatifi." },
      { id: "Kural 22", title: "SEEMP", summary: "Ship Energy Efficiency Management Plan gereklilikleri ve içeriği." },
    ],
    penalties: [
      "IAPP Certificate olmadan uluslararası sefer yapılamaz",
      "NOx Teknik Dosyası eksik veya güncel değilse PSC eksiklik ve potansiyel alıkoyma",
      "SOx uyumsuzluğu (yüksek kükürtlü yakıt kullanımı) tespitinde ağır para cezaları ve alıkoyma",
      "SEEMP eksikliğinde PSC eksiklik kaydı",
      "ODS kayıt eksikliğinde çevre mevzuatı ihlali cezaları",
    ],
    detailedSections: [
      {
        heading: "Hava emisyonlarının tek sertifikası",
        body:
          "IAPP Certificate (International Air Pollution Prevention Certificate), MARPOL Ek VI'nın gemideki belgesidir ve geminin havaya verdiği tüm emisyon türlerini tek çatı altında toplar: azot oksitler (NOx), kükürt oksitler (SOx), ozon tabakasını incelten maddeler (ODS), uçucu organik bileşikler (VOC) ve giderek artan biçimde enerji verimliliği (EEXI/CII). 400 GT ve üzeri gemiler için zorunludur. Sertifikanın eki (supplement), gemideki motorları, yakıt sistemini, varsa scrubber'ı ve enerji verimliliği parametrelerini ayrıntılandırır. Beş yıl geçerlidir ve yıllık/ara sörveylerle güncel tutulur.",
      },
      {
        heading: "NOx, SOx ve genişleyen kapsam",
        body:
          "IAPP'nin teknik kalbi iki ana kirleticidir. NOx tarafında, 130 kW üzeri her dizel motorun bir NOx Teknik Dosyası vardır ve motor üretim yılına göre Tier I, II veya (NECA bölgelerinde) Tier III limitlerine tabidir; motor bakımı (enjektör, turboşarjer, timing) bu uyumu doğrudan etkiler. SOx tarafında uyum, ya düşük kükürtlü yakıtla ya da onaylı bir scrubber ile sağlanır ve BDN'ler ile yakıt numuneleriyle belgelenir. Zamanla bu sertifikanın kapsamı genişlemiştir: ODS kayıtları, ham petrol tankerleri için VOC yönetim planı, onaylı gemi yakıcıları ve 2023'ten itibaren EEXI doğrulaması da IAPP'ye eklenmiştir.",
      },
      {
        heading: "SEEMP ve enerji verimliliği bağı",
        body:
          "IAPP, klasik kirlilik kontrolünden iklim düzenlemesine uzanan köprüdür. Gemide bulundurulması zorunlu olan SEEMP (Ship Energy Efficiency Management Plan) üç bölümlüdür: genel verimlilik yönetimi (Part I), IMO DCS veri toplama planı (Part II) ve CII yönetim planı (Part III). Böylece IAPP sertifikası altında hem geminin tasarım verimliliği (EEXI) hem operasyonel karbon performansı (CII) izlenir hale gelmiştir. NOx Teknik Dosyasının güncel olmaması, SOx uyumsuzluğu veya SEEMP eksikliği PSC'de eksiklik ve olası alıkoymaya yol açar; sertifika olmadan ise gemi uluslararası sefer yapamaz.",
      },
      {
        heading: "NOx Teknik Dosyası ve motor yönetimi",
        body:
          "IAPP'nin en teknik unsuru, gemideki 130 kW üzeri her dizel motorun NOx Teknik Dosyası'dır. Bu dosya, motorun azot oksit emisyonunun üretim yılına ve seyir bölgesine göre uygulanan Tier I, II veya III limitlerine uyduğunu belgeler ve motorun emisyonunu etkileyen tüm 'ayarlanabilir bileşenleri' (enjektör, yakıt pompası timing'i, turboşarjer, supap ayarı) tanımlar. Önemli olan, motorun bakımının bu dosyadaki onaylı parametreler içinde tutulmasıdır: bir bakım veya parça değişimi sırasında motorun emisyon karakteristiği değiştirilirse, bu onaylı bir yöntemle (örneğin onboard izleme veya parametre kontrolü) yeniden doğrulanmalıdır. Tier III, yalnızca NOx Emisyon Kontrol Alanlarında (NECA) uygulanır ve genellikle seçici katalitik indirgeme (SCR) veya egzoz gazı resirkülasyonu (EGR) gibi ek teknoloji gerektirir. Dosyanın güncel olmaması PSC'de eksiklik doğurur.",
      },
      {
        heading: "SEEMP, enerji verimliliği ve genişleyen kapsam",
        body:
          "IAPP, klasik kirlilik kontrolünden iklim düzenlemesine uzanan köprüdür. Gemide bulundurulması zorunlu olan SEEMP (Ship Energy Efficiency Management Plan) üç bölümlüdür: genel verimlilik yönetimi (Part I), IMO DCS veri toplama planı (Part II) ve CII yönetim planı (Part III). Böylece IAPP sertifikası altında hem geminin tasarım verimliliği (EEXI) hem operasyonel karbon performansı (CII) izlenir. Sertifikanın kapsamı zamanla genişlemiştir: kükürt (SOx) uyumu için yakıt veya scrubber doğrulaması, ozon tabakasını incelten maddelerin (ODS – halon, CFC) kaydı, ham petrol tankerleri için VOC yönetim planı ve onaylı gemi yakıcıları (incinerator) da bu sertifika altında değerlendirilir. NOx dosyasının eksikliği, SOx uyumsuzluğu veya SEEMP eksikliği PSC'de eksiklik ve olası alıkoymaya yol açar; sertifika olmadan gemi uluslararası sefer yapamaz.",
      },
    ],
    relatedSlugs: ["marpol", "eexi", "imo-2020"],
    resources: [{ label: "MARPOL Ek VI", href: "https://www.imo.org/en/OurWork/Environment/Pages/AirPollution.aspx" }],
  },
  {
    slug: "tonnage-cert",
    label: "Tonnage Certificate – Tonaj Belgesi",
    category: "Gemi Sertifikaları",
    overview: "ITC 69 kapsamında geminin brüt ve net tonajının ölçüm sonuçlarını belgeleyen sertifika; liman harçları ve uluslararası gerekliliklere referans oluşturur.",
    history: "International Tonnage Certificate, ITC 69 (International Convention on Tonnage Measurement of Ships, 1969) kapsamında düzenlenmektedir. 1982'de yürürlüğe giren sözleşme, gemilerin brüt tonaj (GT) ve net tonaj (NT) hesaplaması için uluslararası standart oluşturmuştur. GT ve NT değerleri liman harçları, kılavuzluk ücretleri, emniyet gereklilikleri (SOLAS eşikleri), manning gereklilikleri ve vergilendirme için referans olarak kullanılır.",
    applicability: [
      "24 metre ve üzeri uluslararası sefer yapan tüm gemiler",
      "ITC 69'a taraf tüm devletlerin bayraklarını taşıyan gemiler",
    ],
    essentials: [
      "GT (Gross Tonnage) hesaplaması: GT = K₁ × V (K₁ = 0.2 + 0.02 × log₁₀V, V = toplam kapalı hacim m³)",
      "NT (Net Tonnage) hesaplaması: yük hacmi, yolcu kapasitesi, draft oranına dayalı formül",
      "Sertifikanın süresiz geçerliliği: yapısal değişiklik olmadığı sürece geçerli kalır",
      "Yapısal değişiklik sonrası yeniden tonaj ölçümü ve sertifika düzenlenmesi zorunlu",
      "Dual tonnage: Süveyş ve Panama kanalları için ayrı tonaj sertifikaları (Suez Canal Tonnage Certificate, Panama Canal Tonnage Certificate)",
      "GT eşikleri: birçok uluslararası düzenleme GT'ye göre uygulama kapsamı belirler (300 GT: AIS, 500 GT: SOLAS kargo, 400 GT: MARPOL Ek VI vb.)",
    ],
    actions: [
      "Yapısal modifikasyon sonrası (üst yapı ekleme/çıkarma, kapalı hacim değişikliği) tonaj sertifikasını güncelle",
      "GT/NT değerlerini manning, emniyet ve sözleşme gereklilikleriyle karşılaştır ve uyumu doğrula",
      "Sertifika nüshasını köprüüstü ve ofiste güncel bulundur",
      "Süveyş veya Panama kanalı geçişi planlıyorsa ilgili kanal tonaj sertifikasını hazırla",
    ],
    amendments: [
      { year: "1982", description: "ITC 69 yürürlüğe girdi – GT/NT hesaplaması için ilk uluslararası standart" },
      { year: "1994", description: "Geçiş dönemi sona erdi – 1969 öncesi gemilerin eski (gross register tonnage) ölçümle devam etme muafiyeti kalktı, tüm gemiler ITC 69 tonajına geçti" },
      { year: "2011", description: "MEPC.203(62) ile EEDI/SEEMP düzenlemeleri GT eşiklerine referans vermeye başladı" },
      { year: "2021", description: "CII ve EEXI uygulamasında GT tabanlı eşikler (400 GT ve üzeri) referans olarak kullanılmaya devam etti" },
    ],
    keyArticles: [
      { id: "ITC 69 Madde 6", title: "GT Hesaplaması", summary: "Brüt tonaj hesaplama formülü ve toplam kapalı hacim tanımı." },
      { id: "ITC 69 Madde 7", title: "NT Hesaplaması", summary: "Net tonaj hesaplama formülü, yük hacmi ve draft oranı." },
      { id: "ITC 69 Madde 10", title: "Sertifika Düzenleme", summary: "Tonaj sertifikası düzenleme, geçerlilik ve yenileme koşulları." },
    ],
    penalties: [
      "Tonnage Certificate olmadan uluslararası sefer yapılamaz (bazı ülkelerde liman giriş reddi)",
      "Yapısal değişiklik sonrası güncellenmemiş sertifika ile sefer – PSC eksiklik riski",
      "Yanlış GT/NT beyanı ile liman harçları/kılavuzluk ücretlerinde hile – hukuki yaptırımlar",
    ],
    detailedSections: [
      {
        heading: "Geminin büyüklüğünü resmileştiren belge",
        body:
          "Tonnage Certificate (International Tonnage Certificate), ITC 69 kapsamında geminin brüt tonajını (GT) ve net tonajını (NT) resmileştiren belgedir. GT geminin toplam kapalı hacmini, NT ise gelir getiren yük/yolcu hacmini temsil eder; ikisi de hacim esaslı, boyutsuz ölçülerdir. Bu sertifika denizcilikte sessiz ama her yere nüfuz eden bir referanstır: liman harçları, kılavuzluk ücretleri, vergilendirme ve pek çok uluslararası düzenlemenin uygulanıp uygulanmayacağı bu değerlere bağlıdır. 24 metre ve üzeri uluslararası sefer gemileri için zorunludur.",
      },
      {
        heading: "Eşik etkisi, süreklilik ve kanal tonajları",
        body:
          "Tonajın en pratik işlevi 'eşik belirlemesidir': birçok kural belirli bir GT değerinin üstündeki gemilere uygulanır (örneğin AIS için 300 GT, SOLAS kargo için 500 GT, MARPOL Ek VI için 400 GT). Dolayısıyla bir geminin GT'si, hangi sertifikalara ve emniyet gerekliliklerine tabi olacağını doğrudan belirler. Tonaj sertifikası, yapısal bir değişiklik olmadığı sürece süresiz geçerlidir; ancak kapalı hacmi değiştiren bir modifikasyondan sonra yeniden ölçüm ve yeni sertifika zorunludur. Süveyş ve Panama kanalları kendi ticari tonaj sistemlerini uyguladığı için, bu kanalları geçecek gemiler ayrı kanal tonaj sertifikaları da taşır. Yanlış tonaj beyanı harç kaçırma olarak hukuki yaptırıma yol açar.",
      },
      {
        heading: "Süreklilik, yeniden ölçüm ve denetim",
        body:
          "Tonnage Certificate, diğer sertifikalardan farklı olarak süreli değildir: yapısal bir değişiklik olmadığı sürece süresiz geçerli kalır, çünkü ölçtüğü şey (geminin hacmi) değişmedikçe sonuç da değişmez. Ancak geminin kapalı hacmini değiştiren kalıcı bir modifikasyon (üst yapı ekleme/çıkarma, ambar dönüşümü) yapıldığında tonajın yeniden ölçülmesi ve yeni sertifika düzenlenmesi zorunludur; aksi halde sertifika gerçeği yansıtmaz ve geçersiz duruma düşer. Bazı ülkeler, tonaj sertifikası eksik gemilere liman girişini reddedebilir. Denetimde, beyan edilen GT/NT değerlerinin sertifikayla ve geminin diğer belgeleriyle (manning, emniyet eşikleri) tutarlı olması beklenir.",
      },
      {
        heading: "Eşik etkisi ve kanal tonaj sertifikaları",
        body:
          "Tonaj sertifikasının asıl işlevi, geminin tabi olacağı düzenlemeleri belirleyen 'eşik' değerlerini resmileştirmektir. GT üzerinden pek çok kural devreye girer: 300 GT'de AIS, 400 GT'de MARPOL Ek VI ve MLC, 500 GT'de SOLAS kargo gereklilikleri ve ISM gibi. Dolayısıyla bir geminin GT'si, hangi sertifikalara, kaç kişilik mürettebata ve hangi emniyet donanımına tabi olacağını doğrudan belirler; NT ise liman harçları ve geçiş ücretlerinin tabanını oluşturur. Süveyş ve Panama kanalları, ITC 69'dan ayrı kendi ticari tonaj sistemlerini (SCNT ve PC/UMS) uyguladığı için bu kanalları geçecek gemiler ayrı kanal tonaj sertifikaları da taşır ve geçiş ücretleri bu özel tonajlar üzerinden hesaplanır. Yanlış tonaj beyanıyla harç kaçırmak idari yaptırıma yol açar.",
      },
      {
        heading: "Neden kalıcı bir belge: hangi değişiklikler yeniden ölçüm gerektirir",
        body:
          "Tonnage Certificate'ın süresiz geçerliliği, diğer sertifikaların aksine bir zaman aşımı riski taşımaması anlamına gelir; çünkü ölçtüğü büyüklük (geminin kapalı hacmi) doğası gereği zamanla kendiliğinden değişmez, oysa bir emniyet ekipmanı eskir veya bir yönetim sistemi güncellenmesi gerekir. Ancak bu kalıcılık koşulsuz değildir: geminin kapalı hacmini fiilen değiştiren yapısal müdahaleler, sertifikayı geçersiz kılar ve yeniden ölçüm zorunlu hale gelir. Bunun tipik örnekleri arasında bir güvertenin tamamen kapatılması (örneğin açık bir çalışma güvertesinin üzerine kalıcı bir üst yapı inşa edilmesi), yeni bir güverte katının eklenmesi, önceden açık olan bir alanın (örneğin bir konteyner güvertesi altı boşluğun) kalıcı olarak kapalı hacme dönüştürülmesi veya geminin ana kullanım amacını değiştiren büyük bir dönüşüm (bir kuru yük gemisinin tanker veya konteyner gemisine çevrilmesi) sayılabilir. Bu değişikliklerden biri yapıldığında armatör, klas veya yetkili bir tonaj ölçüm uzmanını devreye sokarak yeni hacmi resmi olarak ölçtürmek ve yeni sertifika almak zorundadır; aksi halde beyan edilen GT/NT, geminin gerçek durumunu yansıtmayan yanlış bir rakam olarak kalır ve bu durum denetimde tespit edilirse ciddi bir eksiklik oluşturur.",
      },
      {
        heading: "GT eşiğinin bir tarafında ve diğer tarafında olmanın bedeli",
        body:
          "GT'nin salt bir ölçüm değil, bir düzenleyici anahtar olarak işlev görmesi, eşiğin hemen altında ve üstünde kalan gemiler arasında orantısız büyüklükte bir yükümlülük farkı yaratır. Örneğin 500 GT eşiği, SOLAS'ın kargo gemilerine yönelik birçok sertifikasyon gerekliliğini (Safety Construction, Safety Equipment gibi) ve ISM Code'un zorunlu SMC/DOC rejimini devreye sokar; 499 GT'lik bir gemi bu ağır sertifikasyon ve yönetim sistemi yükünden muaf kalırken, 500 GT'ye ulaşan bir gemi aynı anda çok sayıda yeni statüter yükümlülükle karşılaşır. Benzer bir kırılma MLC Certificate zorunluluğunda da görülür. Bu keskin eşik etkisi, gemi tasarımcıları ve armatörler için bilinçli bir mühendislik hedefine dönüşebilir: 'tonaj optimizasyonu' olarak bilinen bu yaklaşımda, bir geminin iç hacmi, kapasiteyi ciddi ölçüde feda etmeden eşiğin altında tutulacak biçimde tasarlanır — örneğin belirli güverte üstü alanların kısmen açık bırakılması veya hacim hesaplamasına dahil olmayan boşluklar yaratılması yoluyla. Bu pratik, düzenleyici otoriteler tarafından bazen eleştirilir çünkü geminin fiili taşıma kapasitesi ile tabi olduğu emniyet ve çalışma standardı rejimi arasında bir uyumsuzluk yaratabilir; IMO ve bazı bayrak devletleri, tonaj hesaplama kurallarını bu tür 'eşik oyunlarını' sınırlamak amacıyla zaman zaman gözden geçirmiştir.",
      },
    ],
    relatedSlugs: ["itc-69", "llc"],
    resources: [{ label: "ITC 69", href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-on-Tonnage-Measurement-of-Ships.aspx" }],
  },
  {
    slug: "dmlc",
    label: "DMLC – Denizcilik Çalışma Beyanı",
    category: "Gemi Sertifikaları",
    overview: "MLC 2006 kapsamında bayrak devleti gerekliliklerini (Bölüm I) ve şirket uyum önlemlerini (Bölüm II) belgeleyen iki parçalı deklarasyon.",
    history: "DMLC (Declaration of Maritime Labour Compliance), MLC 2006'nın sertifikasyon mekanizmasının temel parçasıdır. MLC Certificate'ın eki olarak gemide bulundurulması zorunludur. Part I bayrak devleti tarafından, Part II şirket tarafından hazırlanır. 14 MLC denetim alanında hem ulusal gereklilikleri hem de şirket uyum planlarını bir arada belgeleyen benzersiz bir iki parçalı sistemdir.",
    applicability: [
      "500 GT ve üzeri uluslararası sefer yapan tüm gemiler (MLC Certificate ile birlikte)",
      "MLC 2006'ya taraf devletlerin bayraklarını taşıyan gemiler",
    ],
    essentials: [
      "DMLC Part I: bayrak devleti tarafından düzenlenir – 14 MLC alanındaki ulusal mevzuat gereklilikleri, ulusal farklılıklar (substantial equivalences)",
      "DMLC Part II: şirket (armatör) tarafından hazırlanır – her 14 alan için şirketin nasıl uyum sağladığını gösteren uygulama planı",
      "14 MLC denetim alanı: (1) Asgari yaş, (2) Sağlık sertifikası, (3) Denizci nitelikleri, (4) SEA, (5) Özel istihdam kuruluşları, (6) Çalışma/dinlenme saatleri, (7) Manning seviyesi, (8) Konaklama, (9) Rekreasyon, (10) Yemek/ikram, (11) Sağlık/tıbbi bakım, (12) Gemideki şikâyet mekanizması, (13) Ücret ödemesi, (14) Mali güvence",
      "MLC Certificate olmadan DMLC'nin anlamı yok – ikisi birlikte gemide bulundurulmalı",
      "PSC denetimlerinde DMLC en çok kontrol edilen belgelerden biri",
      "Part II'nin gemi değişikliğinde (personel politikası, prosedür değişimi) güncellenmesi gerekir",
    ],
    actions: [
      "DMLC Part II'yi şirket prosedür değişikliklerinde güncelle ve bayrak devletine/RO'ya bildir",
      "Bayrak devleti gereklilik değişikliklerini Part I'de izle ve güncelleme olup olmadığını kontrol et",
      "PSC denetimlerinde DMLC ve MLC sertifikasını birlikte sunmaya hazır ol",
      "14 alanın her biri için uyum kanıtlarını (kayıtlar, prosedürler, sertifikalar) hazır tut",
      "Yeni mürettebat üyelerini DMLC kapsamındaki hakları ve prosedürleri konusunda bilgilendir",
    ],
    amendments: [
      { year: "2006", description: "MLC 2006 kabul edildi – DMLC sistemi tanımlandı" },
      { year: "2013", description: "MLC 2006 yürürlüğe girdi – DMLC zorunlu" },
      { year: "2014", description: "Mali güvence (financial security) alanı eklendi" },
      { year: "2018", description: "Şikâyet mekanizması ve sağlık hakları güncellendi" },
    ],
    keyArticles: [
      { id: "MLC Standart A5.1.3", title: "DMLC Gereklilikleri", summary: "DMLC Part I ve Part II içeriği, düzenleme ve güncelleme prosedürleri." },
      { id: "MLC Kural 5.1.3", title: "Sertifikasyon ve DMLC", summary: "MLC Certificate ve DMLC arasındaki ilişki, gemide bulundurma zorunluluğu." },
    ],
    penalties: [
      "DMLC Part I veya Part II eksikliğinde PSC denetimlerinde eksiklik kaydı",
      "DMLC ile gerçek uygulama arasındaki tutarsızlıkta (Part II prosedürleri uygulanmıyorsa) ciddi eksiklik ve potansiyel alıkoyma",
      "MLC Certificate geçersiz ise DMLC de geçersiz → uluslararası sefer yapılamaz",
    ],
    detailedSections: [
      {
        heading: "İki parçalı uyum beyanı",
        body:
          "DMLC (Declaration of Maritime Labour Compliance), MLC 2006 sertifikasyon sisteminin özgün ve pratik kalbidir. MLC Certificate uyumu 'onaylar' ama nasıl sağlandığını anlatmaz; DMLC bu boşluğu doldurur ve sertifikanın ayrılmaz eki olarak gemide bulundurulur. İki parçalıdır: Part I'i bayrak devleti hazırlar ve 14 MLC alanında ulusal mevzuatın ne gerektirdiğini (varsa ulusal eşdeğer farklılıklarıyla) açıklar; Part II'yi ise şirket hazırlar ve her bir alanda bu gereklilikleri fiilen nasıl karşıladığını gösteren uygulama planını ortaya koyar. Böylece beyan, hem 'kural ne diyor' hem 'biz bunu nasıl uyguluyoruz' sorularını tek belgede yanıtlar.",
      },
      {
        heading: "Denetimde söz ile uygulamanın örtüşmesi",
        body:
          "DMLC, PSC denetiminde en çok incelenen belgelerden biridir, çünkü denetçi için doğal bir kontrol listesidir: Part II'de yazılı her prosedürün gemide gerçekten uygulanıp uygulanmadığı kıyaslanır. En kritik risk, beyan ile gerçek arasındaki tutarsızlıktır; örneğin Part II çalışma saati kaydı tutulduğunu söylüyorsa ama kayıtlar eksikse, bu ciddi bir uygunsuzluk ve olası alıkoyma sebebidir. Bu yüzden Part II, şirketin personel politikası veya prosedürleri değiştiğinde güncellenmeli, Part I'deki ulusal gereklilik değişiklikleri izlenmeli ve 14 alanın her biri için somut uyum kanıtları (kayıtlar, sözleşmeler, sertifikalar) gemide hazır tutulmalıdır. MLC Certificate geçersizse DMLC de geçersiz hale gelir.",
      },
      {
        heading: "On dört denetim alanının iki parçalı belgelenmesi",
        body:
          "DMLC, MLC'nin 14 denetim alanını hem ulusal gereklilik hem şirket uygulaması düzeyinde belgeler. Bu alanlar bir denizcinin gemideki yaşamının neredeyse tamamını kapsar: asgari yaş, sağlık sertifikası, denizci nitelikleri, iş sözleşmesi (SEA), işe alma hizmetleri, çalışma/dinlenme saatleri, manning seviyesi, konaklama, rekreasyon, yemek/ikram, sağlık ve tıbbi bakım, gemideki şikâyet mekanizması, ücret ödemesi ve mali güvence. Part I, bayrak devletinin her alanda ne gerektirdiğini (ve varsa ulusal eşdeğer farklılıkları) açıklar; Part II ise şirketin bu gereklilikleri fiilen nasıl karşıladığını gösteren uygulama planını ortaya koyar. Böylece DMLC, 'kural ne diyor' ve 'biz bunu nasıl uyguluyoruz' sorularını tek belgede yanıtlar ve denetçi için doğal bir kontrol listesi işlevi görür.",
      },
      {
        heading: "Söz ile uygulamanın örtüşmesi ve güncel tutma",
        body:
          "DMLC denetiminin en kritik yönü, Part II'de yazılı her prosedürün gemide gerçekten uygulanıp uygulanmadığının kıyaslanmasıdır. En ciddi risk, beyan ile gerçek arasındaki tutarsızlıktır: örneğin Part II çalışma saati kaydı tutulduğunu söylüyorsa ama kayıtlar eksikse, veya şikâyet mekanizması tanımlanmış ama mürettebat bundan habersizse, bu büyük bir uyumsuzluk ve olası alıkoyma sebebidir. Bu yüzden Part II, şirketin personel politikası veya prosedürleri değiştiğinde güncellenmeli ve bayrak devletine/RO'ya bildirilmeli; Part I'deki ulusal gereklilik değişiklikleri izlenmeli; 14 alanın her biri için somut uyum kanıtları (kayıtlar, sözleşmeler, sertifikalar) gemide hazır tutulmalıdır. DMLC, MLC Certificate ile birlikte anlamlıdır; sertifika geçersiz olursa DMLC de geçersiz hale gelir ve gemi uluslararası sefer yapamaz.",
      },
      {
        heading: "Part I'de 'esdeğer uygulama' esnekliği",
        body:
          "MLC 2006'nın tasarımında bilinçli bir esneklik payı vardır: sözleşme, her ülkenin hukuk sistemine, idari yapısına ve mevcut mevzuatına aynı katı kalıbı zorla oturtmak yerine, aynı koruyucu amaca ulaşan farklı uygulama yollarına izin verir. Buna 'esdeğer uygulama' (substantial equivalence) denir ve DMLC Part I'de somutlaşır. Örneğin bir standart, denizcinin belirli bir konaklama alanı asgari metrekaresini şart koşabilir; bir ülke bu asgari metrekareyi harfiyen uygulamak yerine, kendi gemi tipleri ve iklim koşullarına uyarlanmış, ama denizcinin genel yaşam kalitesini ve mahremiyetini eşdeğer düzeyde koruyan alternatif bir düzenleme (örneğin farklı bir alan-kişi oranı, ek ortak alan telafisi) benimseyebilir; bunun koşulu, ILO'ya bu farkın gerekçesini bildirmesi ve alternatifin standardın korumasını 'tam olarak eşit' düzeyde sağladığını göstermesidir. Bu esneklik, MLC'nin dünya çapında farklı hukuk ve gemi inşa geleneklerine sahip 100'den fazla bayrak devletini aynı sözleşmeye kazandırabilmiş olmasının önemli bir nedenidir; katı, tek-boyutlu bir standart seti bu kadar geniş bir kabul bulamazdı.",
      },
      {
        heading: "Neden Part II en çok didiklenen belgedir",
        body:
          "PSC denetçisinin gözünde DMLC Part I ile Part II'nin ağırlığı çok farklıdır. Part I, esasen bayrak devletinin ulusal mevzuatının bir özetidir; denetçi için yeni bir bilgi taşımaz, çünkü o mevzuat zaten kamuya açıktır ve denetçi bunu doğrulamak için bayrak devletine güvenir. Part II ise tamamen farklı bir doğası vardır: bu, şirketin kendi sesiyle, 'bu gereklilikleri biz somut olarak şu prosedürlerle, şu kayıt sistemiyle, şu sorumlu kişilerle karşılıyoruz' diye yazdığı bir taahhüttür. Bu taahhüt, denetçinin elinde doğrudan test edilebilir bir kontrol listesine dönüşür: Part II 'çalışma saatleri şu yazılımla günlük kaydedilir' diyorsa, denetçi o yazılımın kayıtlarını ister; 'şikâyetler şu kutuya yazılı olarak iletilir' diyorsa, o kutunun varlığını ve mürettebatın bundan haberdar olup olmadığını sorar. Yani Part I doğrulanması gereken bir gerçek değil kabul edilen bir arka plan bilgisiyken, Part II doğrudan yalanlanabilir (falsifiable) bir iddiadır — ya doğrulanır ya da çöker. Bu asimetri, PSC denetçilerinin neredeyse tüm MLC denetim enerjisini Part II'nin gemideki fiili karşılığını aramaya harcamasının nedenidir.",
      },
    ],
    relatedSlugs: ["mlc", "mlc-cert", "psc"],
    resources: [{ label: "MLC 2006", href: "https://www.ilo.org/global/standards/maritime-labour-convention/lang--en/index.htm" }],
  },
];
