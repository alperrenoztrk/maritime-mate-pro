import type { QuizQuestion } from "@/types/quiz";

/**
 * Konu doldurma bankası 2 — enerji verimliliği ve otomasyon konu bankalarında
 * konu başına en az 8 soru hedefini tutturmak için yazılan ek sorular.
 *
 * `exerciseQuestionDistribution.ts` soruları konu başlıklarıyla sözcük örtüşmesine
 * göre eşlediğinden her soru hedeflediği konunun kendi terminolojisini kullanır;
 * aksi hâlde benzerlik puanı soruyu komşu konuya taşır.
 *
 * Numaralandırma taban + devam + vaka bankalarının ardından sürer (155'ten
 * başlar); `machineQuizDataIndex.ts` bankaları slug bazında bu sırayla birleştirir.
 */
export const machineQuizQuestionsTopicFill2: Record<string, QuizQuestion[]> = {
  "energy-efficiency": [
    {
      id: 155,
      question:
        "IMO'nun 2023 sera gazı stratejisinde uluslararası denizciliğe konan nihai hedef nedir?",
      options: [
        "2050 dolaylarında net sıfır sera gazı emisyonu",
        "2050'de 2008 seviyesine göre %20 azaltım",
        "2050'de yalnızca kükürt emisyonunun sıfırlanması",
        "2050'de gemi başına sabit karbon kotası verilmesi",
      ],
      correctAnswer: 0,
      explanation:
        "2023 IMO GHG Stratejisi, uluslararası denizcilikten kaynaklanan sera gazı emisyonlarının 2050 dolaylarında net sıfıra indirilmesini hedefler; bu hedef 2018 stratejisindeki %50 azaltım hedefinin yerini almıştır.",
      category: "Enerji Verimliliği",
    },
    {
      id: 156,
      question:
        "IMO sera gazı stratejisi nihai hedefe giden yolda hangi ara kontrol noktalarını tanımlar?",
      options: [
        "Yalnızca 2035 için tek bir kontrol noktası",
        "2030 ve 2040 yılları için iki kontrol noktası",
        "Beş yılda bir yenilenen gönüllü beyan usulü",
        "Bayrak devletinin serbestçe belirlediği takvim",
      ],
      correctAnswer: 1,
      explanation:
        "Strateji 2030 ve 2040 için gösterge niteliğinde ara kontrol noktaları koyar; 2030'da emisyonların en az %20 (gayret %30), 2040'ta en az %70 (gayret %80) azaltılması beklenir.",
      category: "Enerji Verimliliği",
    },
    {
      id: 157,
      question: "EEXI hangi gemilere ve hangi anda uygulanan bir gerekliliktir?",
      options: [
        "Yalnızca 2023 sonrası inşa edilen yeni gemilere",
        "Yalnızca tanker sınıfındaki gemilere sefer başına",
        "Mevcut 400 GT üstü gemilere tek seferlik olarak",
        "Tüm gemilere her yıl yeniden hesaplanarak",
      ],
      correctAnswer: 2,
      explanation:
        "EEXI mevcut filoya uygulanan tasarım temelli bir indekstir; 400 GT ve üzeri gemiler için 2023'ten itibaren tek seferlik hesaplanıp onaylanır, EEDI ise yeni inşa gemileri kapsar.",
      category: "Enerji Verimliliği",
    },
    {
      id: 158,
      question:
        "Bir geminin EEXI değerini gerekli sınırın altına çekmek için en yaygın uygulanan yöntem nedir?",
      options: [
        "Ana makinenin tümüyle yenisiyle değiştirilmesi",
        "Gemi baş bodoslamasının yeniden şekillendirilmesi",
        "Sefer sayısının idari kararla azaltılması yoluyla",
        "Motor gücü sınırlaması (EPL/ShaPoLi) takılması",
      ],
      correctAnswer: 3,
      explanation:
        "EEXI tasarım indeksi olduğu için en pratik uyum yolu onaylı motor gücü sınırlaması (EPL) veya şaft gücü sınırlamasıdır (ShaPoLi); makine değişimi ve gövde modifikasyonu ekonomik değildir.",
      category: "Enerji Verimliliği",
    },
    {
      id: 159,
      question: "CII göstergesi bir geminin hangi büyüklüğünü ölçer?",
      options: [
        "Taşıma işi başına yıllık karbon yoğunluğunu",
        "Yıllık toplam yakıt tüketiminin mutlak değerini",
        "Ana makinenin tasarım anındaki verim düzeyini",
        "Sefer başına ortalama seyir hızının değişimini",
      ],
      correctAnswer: 0,
      explanation:
        "CII, yıllık CO₂ salımının taşıma işine (deadweight × katedilen mesafe) bölünmesiyle bulunan operasyonel karbon yoğunluğudur; EEDI ve EEXI'nin aksine geminin gerçek işletme performansını ölçer.",
      category: "Enerji Verimliliği",
    },
    {
      id: 160,
      question: "CII hesabında kullanılan yıllık veriler hangi kaynaktan alınır?",
      options: [
        "Klas kuruluşunun periyodik sörvey notlarından",
        "IMO DCS kapsamında raporlanan yakıt verisinden",
        "Makine dairesi vardiya defterindeki gözlemlerden",
        "Tersanenin tasarım aşamasındaki hesaplarından",
      ],
      correctAnswer: 1,
      explanation:
        "CII, IMO Veri Toplama Sistemi kapsamında bayrak devletine raporlanan yıllık yakıt tüketimi ve katedilen mesafe verisi üzerinden hesaplanır; bu yüzden DCS verisinin doğruluğu doğrudan dereceye yansır.",
      category: "Enerji Verimliliği",
    },
    {
      id: 161,
      question: "CII derecelendirmesinde A'dan E'ye doğru gidildikçe ne değişir?",
      options: [
        "Geminin sınıf sertifikası kademe kademe düşer",
        "Geminin tonaj ölçüsü kademeli olarak büyütülür",
        "Karbon yoğunluğu performansı giderek kötüleşir",
        "Yakıt tankı kapasitesi zorunlu olarak artırılır",
      ],
      correctAnswer: 2,
      explanation:
        "A en iyi, E en kötü performansı gösterir; C sınırın hemen çevresindeki kabul edilebilir bandı temsil eder. Derece sınıf sertifikasıyla değil, ölçülen karbon yoğunluğuyla ilgilidir.",
      category: "Enerji Verimliliği",
    },
    {
      id: 162,
      question: "Üç yıl üst üste D derecesi alan bir gemi için ne gerekir?",
      options: [
        "Geminin doğrudan hurdaya ayrılması zorunludur",
        "Yalnızca bayrak devletine bilgi notu verilmesi",
        "Bir sonraki yıl için sefer sayısının azaltılması",
        "SEEMP'e onaylı düzeltici eylem planı eklenmesi",
      ],
      correctAnswer: 3,
      explanation:
        "Üç yıl üst üste D veya bir yıl E alan gemi, SEEMP Bölüm III'e onaylanmış bir düzeltici eylem planı eklemek zorundadır; plan olmadan Uygunluk Beyanı yenilenmez.",
      category: "Enerji Verimliliği",
    },
    {
      id: 163,
      question: "SEEMP gemide hangi belge olarak bulundurulur ve neyi kapsar?",
      options: [
        "Gemiye özgü enerji verimliliği yönetim planı",
        "Filo geneli için tek bir şirket politika metni",
        "Klas kuruluşunun düzenlediği yakıt sertifikası",
        "Liman devletine verilen tek seferlik beyanname",
      ],
      correctAnswer: 0,
      explanation:
        "SEEMP her gemi için ayrı hazırlanan ve gemide bulundurulan bir plandır; MARPOL Ek VI uyarınca enerji verimliliği önlemlerini, izleme yöntemini ve CII uyum yaklaşımını belgeler.",
      category: "Enerji Verimliliği",
    },
    {
      id: 164,
      question: "SEEMP'in Bölüm II ve Bölüm III'ü hangi konuları düzenler?",
      options: [
        "İkisi de yalnızca mürettebat eğitim kayıtlarını",
        "Yakıt veri toplama planı ve CII uyum planını",
        "Balast suyu değişimi ile çöp yönetimi planını",
        "Kazan bakımı ile jeneratör devreye alma sırasını",
      ],
      correctAnswer: 1,
      explanation:
        "Bölüm II gemi yakıt tüketimi veri toplama planını, Bölüm III ise gerekli yıllık operasyonel CII değerlerine ulaşma planını içerir; Bölüm I gönüllü verimlilik önlemlerini listeler.",
      category: "Enerji Verimliliği",
    },
    {
      id: 165,
      question: "Sevk gücü ile gemi hızı arasındaki ilişki yaklaşık olarak nasıldır?",
      options: [
        "Güç, hızın karesiyle doğru orantılı artar",
        "Güç, hızdan bağımsız olarak sabit kalır",
        "Güç, hızın küpüyle yaklaşık orantılı artar",
        "Güç, hızın kareköküyle orantılı olarak artar",
      ],
      correctAnswer: 2,
      explanation:
        "Direnç hızın karesiyle, sevk gücü ise yaklaşık küpüyle arttığından hızda %10 düşüş güçte yaklaşık %27 azalma verir; slow steaming'in tasarruf gücü bu ilişkiden gelir.",
      category: "Enerji Verimliliği",
    },
    {
      id: 166,
      question: "Trim optimizasyonu geminin hangi büyüklüğünü azaltarak tasarruf sağlar?",
      options: [
        "Silindir içi maksimum yanma basıncını düşürerek",
        "Jeneratörlerin elektrik yükünü doğrudan keserek",
        "Yağlama yağı tüketim hızını sınırlandırarak",
        "Gövdenin toplam sevk direncini azaltarak",
      ],
      correctAnswer: 3,
      explanation:
        "Optimum trim, su hattı formunu ve ıslak yüzey dağılımını değiştirerek toplam direnci düşürür; aynı hız için gereken şaft gücü ve yakıt tüketimi böylece azalır.",
      category: "Enerji Verimliliği",
    },
    {
      id: 167,
      question: "Optimum trim değeri hangi koşullara göre değişkenlik gösterir?",
      options: [
        "Draft, hız ve yükleme durumunun bileşimine",
        "Yalnızca geminin bayrak devleti mevzuatına",
        "Yalnızca makine dairesi personel sayısına",
        "Yalnızca kullanılan yakıtın kükürt oranına",
      ],
      correctAnswer: 0,
      explanation:
        "Trim tabloları model deneyi veya CFD ile her draft-hız birleşimi için ayrı üretilir; tek bir en iyi trim yoktur, değer yükleme durumuna göre değişir.",
      category: "Enerji Verimliliği",
    },
    {
      id: 168,
      question: "Weather routing yazılımı rota önerisini hangi girdilerle üretir?",
      options: [
        "Yalnızca limanların yükleme ücret tarifeleri",
        "Hava ve deniz tahmini ile gemi tepki verisi",
        "Yalnızca geminin son sörvey raporu kayıtları",
        "Yalnızca mürettebatın vardiya çizelgesi planı",
      ],
      correctAnswer: 1,
      explanation:
        "Weather routing, meteorolojik ve okyanus tahminlerini geminin ilave direnç ve hız kaybı eğrileriyle birleştirerek en az yakıtla veya en emniyetli geçişi veren rotayı hesaplar.",
      category: "Enerji Verimliliği",
    },
    {
      id: 169,
      question: "Rota optimizasyonunun yakıt dışında sağladığı temel fayda nedir?",
      options: [
        "Klas sertifikasının süresini otomatik uzatması",
        "Makine bakım aralıklarını iki katına çıkarması",
        "Ağır hava hasarı ve yük kaymasını azaltması",
        "Liman devleti denetiminden muafiyet sağlaması",
      ],
      correctAnswer: 2,
      explanation:
        "Fırtına alanlarından kaçınmak slamming, güverteye su alma ve yük kayması riskini düşürür; bu emniyet kazancı çoğu zaman yakıt kazancı kadar değerlidir.",
      category: "Enerji Verimliliği",
    },
    {
      id: 170,
      question:
        "Tekne yüzeyindeki biyolojik kirlenme (fouling) direnci hangi yolla artırır?",
      options: [
        "Geminin toplam deplasmanını belirgin büyüterek",
        "Pervane kanat sayısını fiilen azaltmış olarak",
        "Dümen yelpazesinin alanını daraltmış olarak",
        "Gövde yüzey pürüzlülüğünü ve sürtünmeyi artırarak",
      ],
      correctAnswer: 3,
      explanation:
        "Fouling ıslak yüzeyin pürüzlülüğünü artırarak sürtünme direncini yükseltir; ağır kirlenmede aynı hız için gereken güç %20-40 oranında artabilir.",
      category: "Enerji Verimliliği",
    },
    {
      id: 171,
      question: "Pervane parlatmanın (polishing) verim üzerindeki etkisi nedir?",
      options: [
        "Kanat pürüzlülüğünü düşürüp itme verimini artırır",
        "Kanat sayısını artırarak devir ihtiyacını düşürür",
        "Pervane çapını büyütüp hatveyi kalıcı değiştirir",
        "Şaft yatak açıklığını azaltıp titreşimi engeller",
      ],
      correctAnswer: 0,
      explanation:
        "Kanat yüzeyindeki kirlilik ve pürüzlülük sürtünme kayıplarını artırır; düzenli parlatma açık deniz koşullarında birkaç yüzde puanlık sevk verimi kazancı sağlar.",
      category: "Enerji Verimliliği",
    },
    {
      id: 172,
      question: "Pervanede kavitasyon oluşumu hangi sonuca yol açar?",
      options: [
        "Kanat malzemesini zamanla sertleştirip güçlendirir",
        "Kanat yüzeyinde erozyon ve itme kaybı yaratır",
        "Şaft devrini kendiliğinden sabit değere kilitler",
        "Yakıt tüketimini doğrudan ölçülebilir düşürür",
      ],
      correctAnswer: 1,
      explanation:
        "Basıncın buharlaşma basıncının altına düşmesiyle oluşan kabarcıklar çökerken kanat yüzeyini dövüp erozyon, gürültü, titreşim ve itme kaybı üretir.",
      category: "Enerji Verimliliği",
    },
    {
      id: 173,
      question:
        "Gemide günlük yakıt tüketimi hangi iki yöntemin karşılaştırılmasıyla doğrulanır?",
      options: [
        "Seyir jurnali ile radar mesafe kaydı",
        "Klas sörveyi ile sigorta poliçesi kaydı",
        "Tank sondajı ölçümü ile debimetre okuması",
        "Vardiya defteri ile telsiz mesaj kaydı",
      ],
      correctAnswer: 2,
      explanation:
        "Tank sondajı veya seviye vericisi toplam stoku, debimetre ise anlık ve kümülatif akışı verir; iki bağımsız ölçümün tutarlılığı hem kaçak hem ölçüm hatası tespitini sağlar.",
      category: "Enerji Verimliliği",
    },
    {
      id: 174,
      question: "Yakıt tüketimi raporlamasında noon report hangi bilgileri taşır?",
      options: [
        "Yalnızca mürettebatın vardiya devir saatlerini",
        "Yalnızca bir sonraki limanın acente bilgisini",
        "Yalnızca ana makine yağ analizi sonuçlarını",
        "Katedilen mesafe, tüketim ve hava koşulları",
      ],
      correctAnswer: 3,
      explanation:
        "Noon report; öğle konumu, son 24 saatte katedilen mesafe, ana makine ve yardımcı tüketimleri, hava-deniz koşulları ve kalan yakıt miktarını içerir; performans analizinin temel verisidir.",
      category: "Enerji Verimliliği",
    },
    {
      id: 175,
      question: "Hava yağlama sistemi tekne direncini hangi ilkeye dayanarak azaltır?",
      options: [
        "Karina altında hava kabarcığı tabakası oluşturarak",
        "Gövde etrafındaki su sıcaklığını yükselterek",
        "Baş omuzda ilave dalga sistemi üreterek",
        "Dümen açısını sürekli küçük tutmayı sağlayarak",
      ],
      correctAnswer: 0,
      explanation:
        "Kompresörlerle karina altına basılan hava, ıslak yüzey ile su arasında kabarcık tabakası oluşturarak sürtünme direncini düşürür; net kazanç kompresör gücü düşüldükten sonra hesaplanır.",
      category: "Enerji Verimliliği",
    },
    {
      id: 176,
      question: "Hava yağlama sisteminde net tasarrufu belirleyen kritik denge nedir?",
      options: [
        "Pervane hatvesi ile dümen makinesi tüketimi",
        "Kabarcık kazancı ile kompresör güç tüketimi",
        "Kazan buhar debisi ile jeneratör soğutma suyu",
        "Balast pompası debisi ile sintine ayırıcı yükü",
      ],
      correctAnswer: 1,
      explanation:
        "Sistem sürekli basınçlı hava ister; kompresörlerin çektiği elektrik gücü, sürtünme direncindeki azalmanın sağladığı kazancın altında kalmalıdır, aksi hâlde net tasarruf oluşmaz.",
      category: "Enerji Verimliliği",
    },
    {
      id: 177,
      question: "Rotor sail (Flettner rotoru) itmeyi hangi etkiyle üretir?",
      options: [
        "Baca gazı akışını hızlandıran Bernoulli etkisiyle",
        "Dünya dönüşünden güç alan Coriolis etkisiyle",
        "Dönen silindirde kuvvet doğuran Magnus etkisiyle",
        "Güverte üzerinde vakum kuran Venturi etkisiyle",
      ],
      correctAnswer: 2,
      explanation:
        "Dönen dikey silindir üzerinden geçen rüzgâr, Magnus etkisiyle akışa dik bir kuvvet üretir; bu kuvvetin ileri bileşeni ana makine yükünü azaltır.",
      category: "Enerji Verimliliği",
    },
    {
      id: 178,
      question: "Rüzgâr destekli itme sistemlerinin kazancı en çok neye bağlıdır?",
      options: [
        "Geminin ana makine silindir sayısına",
        "Yakıt tankındaki kükürt oranı değerine",
        "Limanda geçirilen bekleme süresi payına",
        "Rota üzerindeki rüzgâr yönü ve şiddetine",
      ],
      correctAnswer: 3,
      explanation:
        "Rotor ve kanat yelkenler en yüksek itmeyi bağıl rüzgâr yandan geldiğinde üretir; kazanç rotanın hâkim rüzgâr rejimine ve seyir hızına göre tipik olarak %5-20 arasında değişir.",
      category: "Enerji Verimliliği",
    },
    {
      id: 179,
      question: "LED aydınlatmaya geçişin gemide sağladığı başlıca kazanç nedir?",
      options: [
        "Aydınlatma yükünü ve lamba değişimini azaltması",
        "Ana makine yakıt debisini doğrudan kısıtlaması",
        "Kazan buhar üretim verimini yükseltmiş olması",
        "Pervane sevk verimini ölçülebilir artırması",
      ],
      correctAnswer: 0,
      explanation:
        "LED armatürler aynı aydınlık düzeyini flüoresan ve akkor lambaların çok altında güçle sağlar; uzun ömürleri sayesinde bakım iş yükü ve yedek parça stoğu da düşer.",
      category: "Enerji Verimliliği",
    },
    {
      id: 180,
      question: "Gemide LED dönüşümü planlanırken armatür seçiminde ne aranır?",
      options: [
        "Yalnızca armatürün renk sıcaklığı tercihi",
        "Titreşim, nem ve tuz sisine dayanıklılık",
        "Yalnızca en düşük satın alma fiyatı düzeyi",
        "Yalnızca ambalaj ve depolama hacmi payı",
      ],
      correctAnswer: 1,
      explanation:
        "Denizcilik armatürleri titreşim, nem, tuz sisi ve gerilim dalgalanmasına dayanacak tip onaylı ürünler olmalıdır; ofis tipi ucuz LED'ler gemi ortamında kısa sürede arızalanır.",
      category: "Enerji Verimliliği",
    },
    {
      id: 181,
      question:
        "Pervane enerji tasarrufu cihazları (ESD) kazancı hangi yolla sağlar?",
      options: [
        "Ana makinenin silindir basıncını doğrudan yükseltir",
        "Şaft jeneratörünün elektrik üretimini iki katlar",
        "Pervaneye giren akışı düzelterek kayıpları azaltır",
        "Dümen makinesinin hidrolik basıncını düşürmektedir",
      ],
      correctAnswer: 2,
      explanation:
        "Ön dönüş kanatları, duct ve kıç girdap kaybını toplayan cihazlar pervane giriş akışını homojenleştirip dönme kaybını azaltır; tipik kazanç %2-8 aralığındadır.",
      category: "Enerji Verimliliği",
    },
    {
      id: 182,
      question: "IMO DCS kapsamında bir gemi hangi verileri yıllık raporlar?",
      options: [
        "Yalnızca mürettebat sayısı ve vardiya düzeni",
        "Yalnızca yük türü ve navlun bedeli tutarları",
        "Yalnızca boya ve yağlama malzemesi stokları",
        "Yakıt tüketimi, katedilen mesafe ve seyir saati",
      ],
      correctAnswer: 3,
      explanation:
        "5000 GT ve üzeri gemiler yakıt türü bazında tüketim, katedilen mesafe ve seyirde geçen saat verisini bayrak devletine raporlar; idare doğruladıktan sonra Uygunluk Beyanı düzenlenir.",
      category: "Enerji Verimliliği",
    },
    {
      id: 183,
      question: "IMO DCS raporu doğrulandıktan sonra gemiye hangi belge verilir?",
      options: [
        "Uygunluk Beyanı (Statement of Compliance)",
        "Uluslararası Yükleme Sınırı Sertifikası",
        "Denize Elverişlilik Belgesi ekindeki not",
        "Uluslararası Tonaj Belgesi güncellemesi",
      ],
      correctAnswer: 0,
      explanation:
        "Bayrak devleti veya yetkilendirdiği kuruluş raporu doğrulayınca gemiye Uygunluk Beyanı düzenlenir; belge gemide bulundurulur ve liman devleti denetimlerinde istenir.",
      category: "Enerji Verimliliği",
    },
    {
      id: 184,
      question: "EU MRV regülasyonu hangi kapsamdaki seferleri izlemeye tabi tutar?",
      options: [
        "Yalnızca AB bayraklı gemilerin tüm seferlerini",
        "AB limanlarına uğrayan gemilerin seferlerini",
        "Yalnızca AB içi limanlar arası yolcu seferini",
        "Yalnızca konteyner gemilerinin transit geçişini",
      ],
      correctAnswer: 1,
      explanation:
        "MRV, bayrağa bakmaksızın Avrupa Ekonomik Alanı limanlarına uğrayan 5000 GT üzeri gemilerin ilgili seferlerini kapsar; izleme planı akredite doğrulayıcı tarafından onaylanır.",
      category: "Enerji Verimliliği",
    },
    {
      id: 185,
      question: "EU MRV ile IMO DCS arasındaki temel fark nedir?",
      options: [
        "MRV yalnızca kükürt emisyonlarını ölçmektedir",
        "DCS yalnızca demirdeki tüketimi kaydetmektedir",
        "MRV taşınan yükü de içerip veriyi yayımlar",
        "DCS her sefer için ayrı beyanname istemektedir",
      ],
      correctAnswer: 2,
      explanation:
        "MRV sefer bazında raporlama ister, taşınan yük bilgisini içerir ve doğrulanmış veriler kamuya açıklanır; DCS ise gemi bazında yıllık toplamları IMO veri tabanına gönderir ve anonim tutar.",
      category: "Enerji Verimliliği",
    },
    {
      id: 186,
      question: "EU ETS denizcilikte yükümlülüğü nasıl bir mekanizmayla getirir?",
      options: [
        "Sefer başına sabit liman harcı ödenmesi yoluyla",
        "Gemi başına yıllık tonaj vergisi alınması yoluyla",
        "Yakıt alımında peşin kesilen sabit primle",
        "Salınan CO₂ karşılığı emisyon tahsisatı teslimi",
      ],
      correctAnswer: 3,
      explanation:
        "Şirketler doğrulanmış emisyonları kadar emisyon tahsisatı satın alıp teslim eder; bu, karbonu doğrudan fiyatlandırarak verimlilik yatırımlarını ekonomik olarak cazip kılar.",
      category: "Enerji Verimliliği",
    },
    {
      id: 187,
      question: "EU ETS kapsamında AB dışı bir limandan gelen seferde oran nedir?",
      options: [
        "Emisyonların yarısı kapsam içinde sayılır",
        "Emisyonların tamamı kapsam içinde sayılır",
        "Emisyonların dörtte biri kapsam içindedir",
        "Bu seferler tümüyle kapsam dışında kalır",
      ],
      correctAnswer: 0,
      explanation:
        "Avrupa Ekonomik Alanı dışındaki bir limanla AEA limanı arasındaki seferlerde emisyonların %50'si, iki AEA limanı arasındaki seferlerde ve rıhtımdaki sürede ise %100'ü kapsama girer.",
      category: "Enerji Verimliliği",
    },
    {
      id: 188,
      question: "Raporlanan yakıt tüketimi verisinin doğrulanmasında ilk adım nedir?",
      options: [
        "Verinin doğrudan liman devletine gönderilmesi",
        "Verinin bağımsız kaynaklarla tutarlılık kontrolü",
        "Verinin bir sonraki yıla devredilerek saklanması",
        "Verinin yalnızca kâğıt jurnalde arşivlenmesi",
      ],
      correctAnswer: 1,
      explanation:
        "Doğrulayıcı; bunker teslim notları, tank sondaj kayıtları, debimetre toplamları ve noon raporlarını çapraz karşılaştırır, tutarsızlık bulunursa gemiden kanıt ve açıklama ister.",
      category: "Enerji Verimliliği",
    },
    {
      id: 189,
      question:
        "Yakıt verisinde eksik veya tutarsız kayıt bulunması hangi sonucu doğurur?",
      options: [
        "Veri otomatik olarak ortalamayla tamamlanır",
        "Bir sonraki sefer verisiyle yerine konulabilir",
        "Doğrulama tamamlanmaz ve belge düzenlenmez",
        "Yalnızca şirket içi uyarı yazısıyla kapanır",
      ],
      correctAnswer: 2,
      explanation:
        "Doğrulayıcı yeterli kanıt bulamazsa olumlu görüş veremez; Uygunluk Beyanı veya MRV emisyon raporu düzenlenmez ve gemi liman devleti denetiminde eksiklikle karşılaşır.",
      category: "Enerji Verimliliği",
    },
    {
      id: 190,
      question: "Yıllık verimlilik raporu hazırlanırken veriler hangi dönemi kapsar?",
      options: [
        "Yalnızca en yoğun üç ayın toplam değerleri",
        "Yalnızca son sörveyden bu yana geçen süre",
        "Yalnızca yükleme yapılan seferlerin süresi",
        "Takvim yılının tamamına ait toplam değerler",
      ],
      correctAnswer: 3,
      explanation:
        "Raporlama dönemi 1 Ocak-31 Aralık takvim yılıdır; gemi yıl içinde el veya bayrak değiştirirse kısmi dönemler ayrı raporlanıp birleştirilir.",
      category: "Enerji Verimliliği",
    },
    {
      id: 191,
      question: "Yıllık verimlilik raporu şirket içinde hangi amaçla kullanılır?",
      options: [
        "Filo hedeflerini ve yatırım kararlarını beslemek",
        "Mürettebatın terfi sıralamasını belirlemek",
        "Sigorta priminin tek belirleyicisi olmak",
        "Klas sörvey takvimini tümüyle değiştirmek",
      ],
      correctAnswer: 0,
      explanation:
        "Rapor; gemilerin CII eğilimini, tasarruf önlemlerinin gerçekleşen etkisini ve filo hedeflerine uzaklığı gösterir, böylece hangi gemiye hangi yatırımın yapılacağına veriyle karar verilir.",
      category: "Enerji Verimliliği",
    },
  ],
  automation: [
    {
      id: 155,
      question: "Termokupl sıcaklık ölçümünde hangi fiziksel ilkeye dayanır?",
      options: [
        "İki farklı metal birleşiminde gerilim doğması",
        "Direncin sıcaklıkla doğrusal olarak artması",
        "Yarı iletken bandındaki ışık yayılımı olayı",
        "Sıvı sütununun hacimce genleşmesi olayı",
      ],
      correctAnswer: 0,
      explanation:
        "Seebeck etkisi uyarınca iki farklı metalin birleştiği noktada sıcaklıkla orantılı küçük bir gerilim doğar; RTD ise direncin sıcaklıkla değişimini kullanır.",
      category: "Otomasyon",
    },
    {
      id: 156,
      question: "Pt100 tipi RTD sensörün 0 °C'deki direnç değeri nedir?",
      options: ["10 ohm", "100 ohm", "500 ohm", "1000 ohm"],
      correctAnswer: 1,
      explanation:
        "Pt100 adı, platin elemanın 0 °C'de 100 ohm direnç göstermesinden gelir; sıcaklık arttıkça direnç yaklaşık 0,385 ohm/°C oranında yükselir.",
      category: "Otomasyon",
    },
    {
      id: 157,
      question: "Bourdon tipi manometre basıncı nasıl gösterge hareketine çevirir?",
      options: [
        "Kristal üzerinde yük yaratıp gerilim üretir",
        "Sıvı sütununun yüksekliğini doğrudan okur",
        "Kıvrık boru basınçla açılıp ibreyi döndürür",
        "Diyaframdaki ısıl genleşmeyi ölçüye çevirir",
      ],
      correctAnswer: 2,
      explanation:
        "C biçimli Bourdon borusu iç basınçla düzelmeye çalışır; uç hareketi dişli takımıyla büyütülüp ibreye aktarılır. Piezoelektrik ölçümde ise kristal üzerinde yük oluşur.",
      category: "Otomasyon",
    },
    {
      id: 158,
      question: "Tank seviyesini ölçen hidrostatik yöntem neyi esas alır?",
      options: [
        "Yüzeyden yansıyan ultrasonik dalga süresini",
        "Şamandıranın mekanik konum değişimini",
        "Elektrotlar arası kapasitans değişimini",
        "Sıvı sütununun tabanda yarattığı basıncı",
      ],
      correctAnswer: 3,
      explanation:
        "Hidrostatik seviye vericisi tank dibindeki basıncı ölçer; p = ρgh bağıntısıyla yükseklik bulunur, bu yüzden sıvı yoğunluğu değişirse okuma sapar.",
      category: "Otomasyon",
    },
    {
      id: 159,
      question: "Orifis plakalı debimetre akışı hangi büyüklükten hesaplar?",
      options: [
        "Plaka öncesi ve sonrası basınç farkından",
        "Boru cidarındaki sıcaklık farkından",
        "Akışkanın elektriksel iletkenliğinden",
        "Borudaki ses hızının mutlak değerinden",
      ],
      correctAnswer: 0,
      explanation:
        "Daralan kesitte hız artar ve basınç düşer; ölçülen fark karekök bağıntısıyla debiye çevrilir. Bu yüzden orifis düşük debilerde duyarlılığını yitirir.",
      category: "Otomasyon",
    },
    {
      id: 160,
      question: "Coriolis debimetrenin orifisli ölçüme göre üstünlüğü nedir?",
      options: [
        "Boru içinde hiç basınç kaybı yaratmaması",
        "Kütlesel debiyi doğrudan ölçebilmesi",
        "Yalnızca gaz akışlarında çalışabilmesi",
        "Kalibrasyon gerektirmeyen basit yapısı",
      ],
      correctAnswer: 1,
      explanation:
        "Titreşen ölçüm borusundaki faz kayması kütlesel debiyle orantılıdır; yoğunluk ve sıcaklıktan bağımsız kütle ölçümü, bunker ve yakıt tüketimi ölçümünde belirleyici üstünlüktür.",
      category: "Otomasyon",
    },
    {
      id: 161,
      question: "Manyetik pickup tipi devir sensörü sinyali nasıl üretir?",
      options: [
        "Şaft üzerindeki sıcaklık değişimi ölçümüyle",
        "Yatak yağ filminin kalınlık değişimiyle",
        "Dişli çark dişlerinin manyetik alanı bozmasıyla",
        "Kaplin cıvatalarının burulma miktarıyla",
      ],
      correctAnswer: 2,
      explanation:
        "Şaft üzerindeki dişli çarkın her dişi sensörün manyetik alanını değiştirir ve bobinde darbe üretir; darbe frekansı devir sayısıyla doğru orantılıdır.",
      category: "Otomasyon",
    },
    {
      id: 162,
      question: "Devir ölçümünde takometre sinyalinin arızalanması hangi riski doğurur?",
      options: [
        "Yalnızca gösterge ışığının sönmesi riskini",
        "Yalnızca jurnal kaydının eksik kalmasını",
        "Yalnızca alarm sesinin kısılması durumunu",
        "Hız regülatörünün yanlış müdahale etmesini",
      ],
      correctAnswer: 3,
      explanation:
        "Devir sinyali regülatör ve emniyet devrelerinin girdisidir; hatalı sinyal aşırı hızlanma veya beklenmedik yavaşlama ile sonuçlanabileceğinden ölçüm genelde yedekli yapılır.",
      category: "Otomasyon",
    },
    {
      id: 163,
      question: "Kapalı döngü kontrolü açık döngüden ayıran temel unsur nedir?",
      options: [
        "Çıkışın ölçülüp girişe geri beslenmesi",
        "Kontrol vanasının elle ayarlanabilmesi",
        "Sistemin sabit bir zamanlayıcı kullanması",
        "Girişin sürekli sabit tutulması koşulu",
      ],
      correctAnswer: 0,
      explanation:
        "Kapalı döngüde ölçülen çıkış set değeriyle karşılaştırılır ve hata sinyali kontrolörü sürer; açık döngüde çıkış izlenmediğinden bozucu etkiler düzeltilemez.",
      category: "Otomasyon",
    },
    {
      id: 164,
      question: "Açık döngü kontrol hangi durumda yeterli kabul edilir?",
      options: [
        "Bozucu etkilerin sürekli değiştiği hâlde",
        "Bozucu etkilerin ihmal edilebildiği hâlde",
        "Ölçüm cihazının hiç bulunmadığı her hâlde",
        "Set değerinin sürekli değiştirildiği hâlde",
      ],
      correctAnswer: 1,
      explanation:
        "Yük ve bozucu etkiler kararlıysa önceden belirlenmiş bir çıkış yeterli olur; gemide bu ancak sabit süreli yıkama gibi basit zamanlı işlemlerde kabul edilir.",
      category: "Otomasyon",
    },
    {
      id: 165,
      question: "PID kontrolde integral (I) teriminin başlıca görevi nedir?",
      options: [
        "Ani değişimlere karşı tepkiyi yumuşatmak",
        "Hata değişim hızını öngörerek düzeltmek",
        "Kalıcı durum hatasını sıfıra indirmektir",
        "Kontrolör kazancını sabit tutmak içindir",
      ],
      correctAnswer: 2,
      explanation:
        "İntegral terimi hatanın zaman içindeki birikimini alarak orantısal terimin bıraktığı kalıcı sapmayı temizler; aşırı büyük I değeri ise aşımı ve salınımı artırır.",
      category: "Otomasyon",
    },
    {
      id: 166,
      question: "Ziegler-Nichols yöntemiyle kontrol döngüsü nasıl ayarlanır?",
      options: [
        "İntegral süresi sıfıra sabitlenerek yapılır",
        "Yalnızca vana boyutu değiştirilerek yapılır",
        "Ölçüm ölçeği daraltılarak elde edilir",
        "Kritik kazanç ve salınım periyodu ölçülür",
      ],
      correctAnswer: 3,
      explanation:
        "Yalnızca P terimiyle sistem sürekli salınıma sokulur; salınımı başlatan kritik kazanç ve salınım periyodu ölçülüp tablodan P, I ve D değerleri türetilir.",
      category: "Otomasyon",
    },
    {
      id: 167,
      question: "Kontrol döngüsünde aşırı yüksek orantısal kazanç ne yaratır?",
      options: [
        "Salınım ve kararsız çalışma davranışı",
        "Kalıcı hatanın büyümesi ve yavaşlama",
        "Vananın sürekli kapalı konumda kalması",
        "Ölçüm sinyalinin tümüyle kaybolması",
      ],
      correctAnswer: 0,
      explanation:
        "Yüksek kazanç küçük hatalara büyük tepki üretir; döngü set değerinin çevresinde sürekli aşıp geri döner ve vana ile aktüatör gereksiz yere yıpranır.",
      category: "Otomasyon",
    },
    {
      id: 168,
      question: "PLC'de dijital giriş modülü hangi tip sinyali kabul eder?",
      options: [
        "Sürekli değişen analog gerilim aralığını",
        "İki durumlu aç-kapa kontak sinyalini",
        "Yüksek frekanslı radyo taşıyıcı işaretini",
        "Doğrudan termokupl milivolt değerini",
      ],
      correctAnswer: 1,
      explanation:
        "Dijital giriş kartı basınç şalteri ve limit anahtarı gibi iki konumlu kontakların durumunu okur; 4-20 mA veya termokupl gibi sürekli sinyaller analog giriş kartına bağlanır.",
      category: "Otomasyon",
    },
    {
      id: 169,
      question: "PLC tarama (scan) çevrimi hangi sırayla işler?",
      options: [
        "Program çözümü, giriş okuma, çıkış yazma",
        "Çıkış yazma, program çözümü, giriş okuma",
        "Giriş okuma, program çözümü, çıkış yazma",
        "Giriş okuma, çıkış yazma, program çözümü",
      ],
      correctAnswer: 2,
      explanation:
        "PLC her çevrimde önce tüm girişleri görüntü belleğine alır, ardından ladder programını yukarıdan aşağı çözer ve son adımda çıkış görüntüsünü fiziksel kartlara yazar.",
      category: "Otomasyon",
    },
    {
      id: 170,
      question: "Ladder diyagramda seri bağlı iki kontak hangi mantığı kurar?",
      options: [
        "VEYA (OR) mantık işlevini kurar",
        "DEĞİL (NOT) mantık işlevini kurar",
        "ÖZEL VEYA (XOR) işlevini kurar",
        "VE (AND) mantık işlevini kurar",
      ],
      correctAnswer: 3,
      explanation:
        "Seri bağlı kontaklarda akışın devam etmesi için hepsinin kapalı olması gerekir; bu VE mantığıdır. Paralel bağlı kontaklar ise VEYA mantığını verir.",
      category: "Otomasyon",
    },
    {
      id: 171,
      question: "Ladder programda kendinden tutmalı (latch) devre neyi sağlar?",
      options: [
        "Buton bırakılsa da çıkışın açık kalmasını",
        "Çıkışın belirli süre sonra kapanmasını",
        "Girişin analog değere dönüştürülmesini",
        "Programın baştan yeniden başlamasını",
      ],
      correctAnswer: 0,
      explanation:
        "Çıkış kontağı start butonuna paralel bağlanır; buton bırakıldığında akış kendi kontağı üzerinden sürer ve devre ancak stop kontağıyla kesilir.",
      category: "Otomasyon",
    },
    {
      id: 172,
      question: "Dağıtık kontrol sisteminin (DCS) merkezî yapıya üstünlüğü nedir?",
      options: [
        "Tek bir işlemcide tüm işleri toplaması",
        "Bir düğüm arızasında işlevin sürmesi",
        "Hiç haberleşme ağı gerektirmemesi",
        "Yalnızca elle kumandaya izin vermesi",
      ],
      correctAnswer: 1,
      explanation:
        "Kontrol işlevi sahaya dağıtılmış istasyonlara bölündüğünden tek noktanın arızası tüm tesisi durdurmaz; merkezî mimaride ise işlemci arızası bütün döngüleri kaybettirir.",
      category: "Otomasyon",
    },
    {
      id: 173,
      question:
        "DCS mimarisinde saha istasyonları ile operatör istasyonu nasıl bağlanır?",
      options: [
        "Her cihaz için ayrı analog kablo çekilir",
        "Yalnızca kablosuz telsiz bağlantısıyla",
        "Yedekli bir haberleşme ağı üzerinden",
        "Doğrudan fiziksel şalter panosu ile",
      ],
      correctAnswer: 2,
      explanation:
        "Saha kontrol istasyonları ile operatör konsolları çift yollu endüstriyel ağ üzerinden haberleşir; ağın yedekli olması tek kablo arızasında görüntü ve kumanda kaybını önler.",
      category: "Otomasyon",
    },
    {
      id: 174,
      question: "Gemi entegre otomasyon sistemi (IAS) hangi işlevi üstlenir?",
      options: [
        "Yalnızca yangın algılama işlevini yürütür",
        "Yalnızca dümen kumandasını devralır",
        "Yalnızca yük hesabını otomatik yapar",
        "Makine, kargo ve güç izlemesini birleştirir",
      ],
      correctAnswer: 3,
      explanation:
        "IAS; makine dairesi alarm-izleme, güç yönetimi, kargo ve balast kontrolü gibi ayrı sistemleri ortak arayüz ve veri tabanı altında toplar, böylece bütünsel işletim sağlar.",
      category: "Otomasyon",
    },
    {
      id: 175,
      question: "Uzaktan izleme sistemleri karadaki teknik ekibe ne sağlar?",
      options: [
        "Gerçek zamanlı parametre ve trend erişimi",
        "Gemi üzerinde doğrudan fiziksel onarım",
        "Klas sörveylerinin tümüyle kaldırılması",
        "Mürettebat vardiyalarının azaltılması",
      ],
      correctAnswer: 0,
      explanation:
        "Uydu bağlantısı üzerinden aktarılan sensör verisi kara ekibinin trendleri izlemesine, arıza öncesi uyarı üretmesine ve gemiye doğru yedek parçayla destek vermesine olanak tanır.",
      category: "Otomasyon",
    },
    {
      id: 176,
      question: "Uzaktan tanı (diagnostics) bağlantısı hangi riski beraberinde getirir?",
      options: [
        "Sensör kalibrasyonunun kendiliğinden bozulması",
        "Gemi ağına dışarıdan yetkisiz erişim olasılığı",
        "Yakıt tüketiminin ölçülemez duruma gelmesi",
        "Alarm listesinin otomatik olarak silinmesi",
      ],
      correctAnswer: 1,
      explanation:
        "Kara ile kurulan her veri yolu aynı zamanda bir saldırı yüzeyidir; bağlantı bölümlenmiş ağ, tek yönlü veri akışı ve güçlü kimlik doğrulama ile korunmalıdır.",
      category: "Otomasyon",
    },
    {
      id: 177,
      question:
        "Gemide OT (operasyonel teknoloji) ağını korumanın temel ilkesi nedir?",
      options: [
        "Tüm sistemleri tek ağda toplamak",
        "USB portlarını sürekli açık tutmak",
        "Ağ bölümleme ve en az yetki ilkesi",
        "Yazılım güncellemelerini ertelemek",
      ],
      correctAnswer: 2,
      explanation:
        "OT ağı IT ağından ayrılır, aralarına güvenlik duvarı ve denetimli geçit konur; kullanıcı ve servis hesaplarına yalnızca görevi için gereken yetki verilir.",
      category: "Otomasyon",
    },
    {
      id: 178,
      question: "Thyristor (SCR) diyottan hangi özelliğiyle ayrılır?",
      options: [
        "Her iki yönde de akım geçirmesiyle",
        "Hiç kayıp üretmeden çalışmasıyla",
        "Yalnızca alternatif gerilimde çalışmasıyla",
        "İletime geçişin kapı ucuyla tetiklenmesi",
      ],
      correctAnswer: 3,
      explanation:
        "Diyot ileri yönde kendiliğinden iletir; SCR ise anot-katot arasında gerilim olsa bile kapı ucuna tetikleme darbesi gelmedikçe yalıtımda kalır.",
      category: "Otomasyon",
    },
    {
      id: 179,
      question: "İletime geçmiş bir thyristor nasıl kesime götürülür?",
      options: [
        "Anot akımı tutma değerinin altına düşürülerek",
        "Kapı ucuna ters yönde darbe uygulanarak",
        "Soğutucu blok sıcaklığı yükseltilerek",
        "Yalnızca çalışma frekansı artırılarak",
      ],
      correctAnswer: 0,
      explanation:
        "SCR bir kez iletime geçtikten sonra kapı denetimini yitirir; ancak anot akımı tutma akımının altına inince yalıtıma döner. Bu yüzden AC devrede doğal sıfır geçişi kullanılır.",
      category: "Otomasyon",
    },
    {
      id: 180,
      question: "Tam dalga köprü doğrultucu yarım dalgaya göre ne sağlar?",
      options: [
        "Çıkışta hiç dalgalanma kalmamasını",
        "Her iki alternansın da kullanılmasını",
        "Giriş geriliminin iki katına çıkmasını",
        "Tek bir diyotla çalışabilme kolaylığını",
      ],
      correctAnswer: 1,
      explanation:
        "Dört diyotlu köprü, kaynağın pozitif ve negatif alternanslarını aynı yönde yüke aktarır; böylece ortalama DC gerilim yükselir ve dalgalanma frekansı iki katına çıkar.",
      category: "Otomasyon",
    },
    {
      id: 181,
      question: "Doğrultucu çıkışındaki dalgalanmayı azaltmak için ne kullanılır?",
      options: [
        "Seri bağlı bir sigorta elemanı",
        "Girişe konan bir izolasyon şalteri",
        "Süzgeç kondansatörü veya LC filtre",
        "Yüke paralel bir ölçü aleti",
      ],
      correctAnswer: 2,
      explanation:
        "Kondansatör tepe değerde şarj olup vadilerde yükü besleyerek dalgalanmayı düzler; büyük güçlerde bobin-kondansatör (LC) filtresi tercih edilir.",
      category: "Otomasyon",
    },
    {
      id: 182,
      question: "Frekans dönüştürücü asenkron motorun devrini nasıl değiştirir?",
      options: [
        "Motorun kutup sayısını fiziksel değiştirerek",
        "Yalnızca uygulanan gerilimi düşürerek",
        "Rotor direncine ek bobin ekleyerek",
        "Besleme frekansını sürekli ayarlayarak",
      ],
      correctAnswer: 3,
      explanation:
        "Senkron devir n = 120f/p bağıntısıyla frekansa bağlıdır; invertör çıkış frekansını değiştirirken momenti korumak için gerilimi de orantılı ayarlar (V/f denetimi).",
      category: "Otomasyon",
    },
    {
      id: 183,
      question: "İnvertör çıkışındaki PWM dalga biçimi nasıl elde edilir?",
      options: [
        "Darbe genişliklerinin sürekli değiştirilmesiyle",
        "Doğrudan sinüs biçimli anahtar kullanımıyla",
        "Çıkış trafosunun sargı sayısı değişimiyle",
        "Doğrultucu diyotlarının ısıtılmasıyla",
      ],
      correctAnswer: 0,
      explanation:
        "IGBT'ler yüksek frekansta anahtarlanır ve darbe genişlikleri sinüs referansına göre modüle edilir; motor sargısının endüktansı bu darbe dizisini yaklaşık sinüs akıma dönüştürür.",
      category: "Otomasyon",
    },
    {
      id: 184,
      question: "Soft starter motora yol verirken hangi büyüklüğü sınırlar?",
      options: [
        "Motorun anma güç değerini kalıcı sınırlar",
        "Kalkış akımını kademeli olarak sınırlar",
        "Yatak yağlama debisini geçici sınırlar",
        "Şebeke frekansını kalkış boyunca sınırlar",
      ],
      correctAnswer: 1,
      explanation:
        "Tetikleme açısı denetimli thyristorlarla gerilim yavaşça yükseltilir; doğrudan yol vermede anma akımının 6-8 katına çıkan kalkış akımı böylece 2-3 katına indirilir.",
      category: "Otomasyon",
    },
    {
      id: 185,
      question: "Soft starter ile frekans dönüştürücü arasındaki temel fark nedir?",
      options: [
        "Soft starter da sürekli devir denetimi yapar",
        "Frekans dönüştürücü yalnızca kalkışta çalışır",
        "Soft starter yalnızca kalkış ve duruşta etkindir",
        "İkisi de motor kutup sayısını değiştirmektedir",
      ],
      correctAnswer: 2,
      explanation:
        "Soft starter yalnızca yol verme ve durdurma sırasında gerilimi ayarlar, motor sonrasında tam şebeke gerilimiyle çalışır; frekans dönüştürücü ise devri işletme boyunca sürekli denetler.",
      category: "Otomasyon",
    },
    {
      id: 186,
      question: "Gemi şebekesinde harmonik bozulmanın başlıca kaynağı nedir?",
      options: [
        "Doğrudan yol verilen asenkron motorlar",
        "Akkor telli klasik aydınlatma devreleri",
        "Isıtıcı rezistanslar ve direnç yükleri",
        "Doğrultuculu güç elektroniği yükleri",
      ],
      correctAnswer: 3,
      explanation:
        "Frekans dönüştürücü, kesintisiz güç kaynağı ve doğrultuculu şarj cihazları akımı sinüs biçiminde değil darbeli çeker; bu doğrusal olmayan yükler 5., 7. ve 11. harmonikleri üretir.",
      category: "Otomasyon",
    },
    {
      id: 187,
      question: "Harmonik akımların gemi elektrik sisteminde yarattığı etki nedir?",
      options: [
        "Transformatör ve kabloda ilave ısınma",
        "Şebeke frekansının kalıcı yükselmesi",
        "Jeneratör kutup sayısının değişmesi",
        "Yalıtım direncinin kendiliğinden artması",
      ],
      correctAnswer: 0,
      explanation:
        "Harmonik akımlar etkin değeri büyüterek bakır ve demir kayıplarını artırır; ayrıca nötr iletkende toplanma, koruma rölelerinde hatalı açma ve ölçüm sapmaları görülür.",
      category: "Otomasyon",
    },
  ],
};
