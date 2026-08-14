import type { QuizQuestion } from "@/types/quiz";

/**
 * Konu doldurma bankası 3 — bakım ve makine dairesi operasyonları konu
 * bankalarında konu başına en az 8 soru hedefini tutturmak için yazılan ek
 * sorular.
 *
 * `exerciseQuestionDistribution.ts` soruları konu başlıklarıyla sözcük örtüşmesine
 * göre eşlediğinden her soru hedeflediği konunun kendi terminolojisini kullanır;
 * aksi hâlde benzerlik puanı soruyu komşu konuya taşır.
 *
 * Numaralandırma taban + devam + vaka bankalarının ardından sürer (155'ten
 * başlar); `machineQuizDataIndex.ts` bankaları slug bazında bu sırayla birleştirir.
 */
export const machineQuizQuestionsTopicFill3: Record<string, QuizQuestion[]> = {
  maintenance: [
    {
      id: 155,
      question: "Planlı bakım (preventive) hangi ölçüte göre tetiklenir?",
      options: [
        "Önceden belirlenmiş süre veya çalışma saati",
        "Ekipmanın arızalanıp durmasının ardından",
        "Titreşim ve yağ analizi bulgularına göre",
        "Yalnızca liman devleti denetimi isteğiyle",
      ],
      correctAnswer: 0,
      explanation:
        "Planlı bakım takvim süresine veya sayaçtaki çalışma saatine bağlı sabit aralıklarla yapılır; durum bazlı bakım ölçülen duruma, arıza sonrası bakım ise gerçekleşen arızaya dayanır.",
      category: "Bakım",
    },
    {
      id: 156,
      question: "Planlı bakımın başlıca dezavantajı nedir?",
      options: [
        "Arıza riskini hiç azaltmıyor olması",
        "Sağlam parçanın erken değiştirilmesi",
        "Yedek parça stokunu gereksiz kılması",
        "Klas kayıtlarının tutulmasını engellemesi",
      ],
      correctAnswer: 1,
      explanation:
        "Sabit aralık, parçanın gerçek durumundan bağımsız olduğu için hâlâ sağlam bileşenler değiştirilebilir; bu iş gücü ve yedek parça maliyetini gereksiz yere artırır.",
      category: "Bakım",
    },
    {
      id: 157,
      question: "Kestirimci bakım (predictive) hangi yaklaşımı benimser?",
      options: [
        "Bakımı yalnızca havuzlama dönemine bırakır",
        "Arıza olana kadar hiçbir ölçüm yapmaz",
        "Ölçüm trendinden kalan ömrü öngörür",
        "Her ekipmanı aynı sabit aralıkla açar",
      ],
      correctAnswer: 2,
      explanation:
        "Titreşim, sıcaklık ve yağ analizi verilerinin eğilimi işlenerek arızaya kalan süre tahmin edilir; bakım ancak bu tahmin sınırına yaklaşınca planlanır.",
      category: "Bakım",
    },
    {
      id: 158,
      question: "Kestirimci bakımın uygulanabilmesi için ne gerekir?",
      options: [
        "Yalnızca üretici kataloğunun bulunması",
        "Yalnızca ek personel görevlendirilmesi",
        "Yalnızca yedek parça stokunun artması",
        "Düzenli ölçüm ve geçmiş veri birikimi",
      ],
      correctAnswer: 3,
      explanation:
        "Eğilim çıkarmak için aynı noktadan düzenli aralıklarla alınmış ölçümler ve bunların saklandığı bir veri geçmişi şarttır; tek bir ölçüm kalan ömür hakkında bilgi vermez.",
      category: "Bakım",
    },
    {
      id: 159,
      question: "Güvenilirlik merkezli bakım (RCM) analizinin çıkış noktası nedir?",
      options: [
        "Ekipmanın işlevi ve işlev kaybının sonucu",
        "Ekipmanın satın alma bedeli ve amortismanı",
        "Ekipmanın gemideki fiziksel yerleşim yeri",
        "Ekipmanı üreten firmanın ticari itibarı",
      ],
      correctAnswer: 0,
      explanation:
        "RCM önce her ekipmanın işlevini, olası işlev kayıplarını ve bu kayıpların emniyet, çevre ve işletme sonuçlarını tanımlar; bakım stratejisi bu sonuçlara göre seçilir.",
      category: "Bakım",
    },
    {
      id: 160,
      question: "RCM sonucunda bir ekipman için hangi karar çıkabilir?",
      options: [
        "Her ekipmana aynı bakımın uygulanması",
        "Arızaya kadar çalıştırmanın seçilmesi",
        "Tüm ekipmanların sökülüp yenilenmesi",
        "Bakım kaydının tutulmasından vazgeçme",
      ],
      correctAnswer: 1,
      explanation:
        "İşlev kaybının sonucu önemsizse ve gizli arıza riski yoksa RCM arızaya kadar çalıştırma kararını meşru sayar; kaynak, sonucu ağır olan ekipmanlara aktarılır.",
      category: "Bakım",
    },
    {
      id: 161,
      question: "PMS yazılımında iş emri (work order) neyi belgeler?",
      options: [
        "Yalnızca yedek parçanın satın alma fiyatını",
        "Yalnızca geminin bir sonraki liman planını",
        "Yapılan işi, harcanan süreyi ve kullanılan parçayı",
        "Yalnızca mürettebatın izin ve terfi durumunu",
      ],
      correctAnswer: 2,
      explanation:
        "İş emri planlanan görevi açar; tamamlandığında yapılan işi, harcanan adam-saati ve tüketilen yedek parçayı kaydeder. Klas ve şirket denetimlerinde kanıt bu kayıtlardır.",
      category: "Bakım",
    },
    {
      id: 162,
      question: "PMS yazılımında geciken iş emirlerinin birikmesi neyi gösterir?",
      options: [
        "Bakım planının fazlasıyla sıkı tutulduğunu",
        "Yazılımın sürüm güncellemesi gerektiğini",
        "Klas sörveyinin ertelenmiş olabileceğini",
        "Bakım kapasitesiyle planın uyuşmadığını",
      ],
      correctAnswer: 3,
      explanation:
        "Sürekli biriken gecikmeler ya iş yükünün mevcut personelle karşılanamadığını ya da aralıkların gerçekçi belirlenmediğini gösterir; plan gözden geçirilmeden gecikme kapanmaz.",
      category: "Bakım",
    },
    {
      id: 163,
      question: "Bakım aralıkları çalışma saatine bağlandığında ne izlenir?",
      options: [
        "Ekipmanın sayaçtaki kümülatif çalışma süresi",
        "Geminin liman ve demir bekleme süreleri",
        "Mürettebatın vardiya değişim saatleri",
        "Yakıt tankındaki kalan miktar değeri",
      ],
      correctAnswer: 0,
      explanation:
        "Sayaç saati ekipmanın gerçek yüklenme süresini yansıtır; takvim aralığı ise az çalışan ekipmanı gereksiz açtırır, çok çalışanı ise geç yakalar.",
      category: "Bakım",
    },
    {
      id: 164,
      question: "Bir ekipmanın bakım aralığı hangi kaynağa göre belirlenir?",
      options: [
        "Yalnızca geminin sefer programına göre",
        "Üretici önerisi ve işletme deneyimine göre",
        "Yalnızca yedek parça stok düzeyine göre",
        "Yalnızca sigorta şirketi talebine göre",
      ],
      correctAnswer: 1,
      explanation:
        "Temel aralık üretici el kitabından alınır; gemideki çalışma koşulları, yağ analizi ve arıza geçmişi bu aralığın kısaltılmasını veya uzatılmasını gerekçelendirir.",
      category: "Bakım",
    },
    {
      id: 165,
      question: "Klas sörvey takviminde yıllık, ara ve yenileme sörveyi nasıl dizilir?",
      options: [
        "Üçü de aynı yıl içinde art arda yapılır",
        "Yalnızca gemi sahibinin isteğine bırakılır",
        "Beş yıllık çevrimde belirli pencerelerde",
        "Her sefer sonunda yeniden başlatılır",
      ],
      correctAnswer: 2,
      explanation:
        "Klas sertifikası beş yıllık çevrimde yenilenir; her yıl yıllık sörvey, ikinci ile üçüncü yıl arasında ara sörvey ve çevrim sonunda yenileme sörveyi belirli pencerelerde yapılır.",
      category: "Bakım",
    },
    {
      id: 166,
      question: "Sürekli makine sörveyi (CMS) düzeninin sağladığı kolaylık nedir?",
      options: [
        "Sörvey zorunluluğunu tümüyle ortadan kaldırır",
        "Tüm makineleri tek seferde açmayı gerektirir",
        "Klas kaydının gemide tutulmasını gereksiz kılar",
        "Kalemleri beş yıla yayıp bakımla birleştirir",
      ],
      correctAnswer: 3,
      explanation:
        "CMS'te makine kalemleri beş yıllık çevrime dağıtılır ve her biri kendi planlı bakımıyla birlikte sörveylenir; böylece gemi tek seferlik büyük açımlar için durdurulmaz.",
      category: "Bakım",
    },
    {
      id: 167,
      question: "Yedek parça envanterinde minimum seviye neyi ifade eder?",
      options: [
        "Sipariş verilmesi gereken kritik stok eşiği",
        "Depoda tutulabilecek en büyük parça sayısı",
        "Bir parçanın raftaki azami bekleme süresi",
        "Bir parçanın satın alma bedelinin alt sınırı",
      ],
      correctAnswer: 0,
      explanation:
        "Minimum seviye, tedarik süresi boyunca tüketilecek miktarı karşılayacak eşiktir; stok bu değere inince sipariş açılır, maksimum seviye ise bağlanan sermayeyi sınırlar.",
      category: "Bakım",
    },
    {
      id: 168,
      question: "Kritik yedek parçaların gemide bulundurulması neden istenir?",
      options: [
        "Depo alanını verimli kullanabilmek için",
        "Arızada seferin aksamasını önlemek için",
        "Satın alma maliyetini düşürebilmek için",
        "Gümrük işlemlerini hızlandırabilmek için",
      ],
      correctAnswer: 1,
      explanation:
        "SOLAS ve klas, ana makine ve dümen donanımı gibi kritik sistemler için gemide yedek bulundurulmasını ister; parçanın limandan tedarik süresi seferi günlerce durdurabilir.",
      category: "Bakım",
    },
    {
      id: 169,
      question: "Silindir kapağı sökümünde ilk yapılması gereken nedir?",
      options: [
        "Kapak cıvatalarının çapraz sırayla sökülmesi",
        "Supap yaylarının doğrudan çıkarılması",
        "Sistemin izole edilip basıncın alınması",
        "Kapağın vinçle yukarı kaldırılması",
      ],
      correctAnswer: 2,
      explanation:
        "Yakıt, soğutma suyu, hava ve egzoz bağlantıları izole edilip basınç boşaltılmadan hiçbir söküm başlamaz; ardından cıvatalar hidrolik takımla çapraz sırayla gevşetilir.",
      category: "Bakım",
    },
    {
      id: 170,
      question: "Silindir kapağı revizyonunda hangi kontrol mutlaka yapılır?",
      options: [
        "Kapak boyasının renk uyumu kontrolü",
        "Kapak ağırlığının tartıyla ölçülmesi",
        "Kapak seri numarasının yeniden basılması",
        "Su ceketinde çatlak ve korozyon kontrolü",
      ],
      correctAnswer: 3,
      explanation:
        "Kapak temizlendikten sonra su ceketi korozyon ve çatlak açısından incelenir, supap yuvaları ile enjektör deliği ölçülür; şüpheli bölgeler penetrant muayenesiyle doğrulanır.",
      category: "Bakım",
    },
    {
      id: 171,
      question: "Silindir gömleğinde (liner) ölçüm hangi amaçla yapılır?",
      options: [
        "Aşınma ve ovalliğin sınır içinde olduğunu",
        "Gömlek malzemesinin döküm tarihini bulmak",
        "Gömleğin boyanma sıklığını belirleyebilmek",
        "Gömlek ağırlığını kayıt altına alabilmek",
      ],
      correctAnswer: 0,
      explanation:
        "Gömlek çapı üst, orta ve alt bölgelerde iki dik eksende ölçülür; aşınma oranı ve ovallik üretici sınırıyla karşılaştırılarak segman kaçağı ve yağ tüketimi öngörülür.",
      category: "Bakım",
    },
    {
      id: 172,
      question: "Gömlek iç yüzeyindeki honlama izlerinin (hone) işlevi nedir?",
      options: [
        "Yanma odası hacmini büyütmesini sağlamak",
        "Yağ filmini tutup segman alıştırmasını",
        "Gömlek soğutmasını doğrudan hızlandırmak",
        "Egzoz gazı sıcaklığını kalıcı düşürmek",
      ],
      correctAnswer: 1,
      explanation:
        "Çapraz honlama izleri yağı yüzeyde tutarak segman ile gömlek arasında sürekli yağ filmi oluşturur; izler parlayıp kaybolduğunda yağ tüketimi ve aşınma artar.",
      category: "Bakım",
    },
    {
      id: 173,
      question: "Supap taşlamasının amacı nedir?",
      options: [
        "Supap sapını kısaltıp boşluğu artırmak",
        "Supap yayının sertliğini yükseltmek",
        "Oturma yüzeyinde tam sızdırmazlık",
        "Supap çapını genişletmiş olmak",
      ],
      correctAnswer: 2,
      explanation:
        "Taşlama, supap tablası ile yuva arasındaki oksit ve çukurlukları giderip sürekli bir temas kuşağı oluşturur; sızdıran supap yanma gazı kaçırıp yüzeyi hızla yakar.",
      category: "Bakım",
    },
    {
      id: 174,
      question: "Supap boşluğu (tappet clearance) fazla ayarlanırsa ne olur?",
      options: [
        "Supap sürekli açık kalıp gaz kaçırır",
        "Yağ basıncı kendiliğinden yükselir",
        "Yakıt püskürtme avansı değişir",
        "Vuruntulu ses ve geç açılma olur",
      ],
      correctAnswer: 3,
      explanation:
        "Fazla boşluk supabın geç açılıp erken kapanmasına ve mekanizmada darbeli çalışmaya yol açar; az boşluk ise supabın tam kapanmamasına ve oturma yüzeyinin yanmasına neden olur.",
      category: "Bakım",
    },
    {
      id: 175,
      question: "Enjektör test tezgâhında hangi değerler kontrol edilir?",
      options: [
        "Açma basıncı, püskürtme biçimi ve sızdırmazlık",
        "Yalnızca enjektörün dış gövde boyutu ölçüsü",
        "Yalnızca enjektör gövdesinin yüzey sertliği",
        "Yalnızca bağlantı cıvatasının sıkma momenti",
      ],
      correctAnswer: 0,
      explanation:
        "Test tezgâhında memenin açma basıncı, püskürtme konisinin biçimi ve damlatma yapıp yapmadığı sınanır; bozuk püskürtme kurumlu yanma ve gömlek aşınması yaratır.",
      category: "Bakım",
    },
    {
      id: 176,
      question: "Damlatan (dripping) bir enjektör motorda hangi sonuca yol açar?",
      options: [
        "Egzoz gazı sıcaklığının kalıcı düşmesine",
        "Kurumlu yanma ve meme ucu yanmasına",
        "Yağlama yağı basıncının yükselmesine",
        "Turboşarjer devrinin ani düşmesine",
      ],
      correctAnswer: 1,
      explanation:
        "Kapanma anında damlayan yakıt atomize olmadan yanar; kurum birikimi, meme ucunda aşırı ısınma ve piston tepesinde birikinti oluşur, egzoz sıcaklığı da yükselir.",
      category: "Bakım",
    },
    {
      id: 177,
      question: "Krank mili saptırma (deflection) ölçümü neyi ortaya çıkarır?",
      options: [
        "Krank milinin dönme hızındaki değişimi",
        "Yağlama yağının viskozite düşüşünü",
        "Ana yatak hizasındaki bozulmayı",
        "Segmanların yanal boşluk artışını",
      ],
      correctAnswer: 2,
      explanation:
        "Kol ağızları arasına konan komparatör, mil döndürülürken açılma ve kapanmayı ölçer; sınırı aşan saptırma ana yatakların aşınmasını veya tekne deformasyonunu gösterir.",
      category: "Bakım",
    },
    {
      id: 178,
      question: "Saptırma ölçümü hangi koşullarda yapılmalıdır?",
      options: [
        "Motor tam yükte çalışırken ölçülmelidir",
        "Yalnızca gemi havuzdayken ölçülmelidir",
        "Yalnızca tam yüklü durumda ölçülmelidir",
        "Motor soğukken ve bilinen yükleme durumunda",
      ],
      correctAnswer: 3,
      explanation:
        "Ölçüm motor durmuş ve soğukken yapılır; sonuçlar ancak yükleme durumu kaydedilirse karşılaştırılabilir, çünkü tekne bükülmesi değerleri doğrudan etkiler.",
      category: "Bakım",
    },
    {
      id: 179,
      question: "Ultrasonik kalınlık ölçümü hangi ilkeye dayanır?",
      options: [
        "Ses dalgasının gidiş-dönüş süresinin ölçümü",
        "Yüzeye sürülen boyanın renk değişimi",
        "Manyetik alan çizgilerinin sapma açısı",
        "Malzemeye uygulanan basıncın tepkisi",
      ],
      correctAnswer: 0,
      explanation:
        "Prob malzemeye gönderdiği ultrasonik darbenin arka yüzeyden yansıyıp dönme süresini ölçer; ses hızı bilindiğinden süre doğrudan et kalınlığına çevrilir.",
      category: "Bakım",
    },
    {
      id: 180,
      question: "Ultrasonik kalınlık ölçümünde temas jeli neden kullanılır?",
      options: [
        "Prob yüzeyini korozyondan korumak için",
        "Arada hava kalmasını önlemek için",
        "Ölçüm cihazını soğutabilmek için",
        "Yüzeydeki boyayı çözebilmek için",
      ],
      correctAnswer: 1,
      explanation:
        "Hava ultrasonik dalgayı neredeyse tümüyle yansıtır; jel veya yağ, prob ile yüzey arasındaki boşluğu doldurarak dalganın malzemeye geçmesini sağlar.",
      category: "Bakım",
    },
    {
      id: 181,
      question: "Manyetik parçacık muayenesi (MT) hangi malzemelerde uygulanır?",
      options: [
        "Alüminyum ve bakır alaşımlarının tümünde",
        "Plastik ve kompozit malzemelerin hepsinde",
        "Ferromanyetik çelik malzemelerde",
        "Cam ve seramik malzemelerin hepsinde",
      ],
      correctAnswer: 2,
      explanation:
        "Yöntem manyetik alanın süreksizlikte kaçak yapması ilkesine dayanır; yalnızca mıknatıslanabilen malzemelerde işe yarar, östenitik paslanmaz ve alüminyumda kullanılamaz.",
      category: "Bakım",
    },
    {
      id: 182,
      question: "MT muayenesi hangi tür kusurları en iyi ortaya çıkarır?",
      options: [
        "Parçanın tam merkezindeki boşlukları",
        "Yalnızca yüzeye sürülmüş boya hatasını",
        "Yalnızca parçanın boyutsal sapmasını",
        "Yüzey ve yüzeye yakın çatlakları",
      ],
      correctAnswer: 3,
      explanation:
        "Manyetik kaçak alanı ancak kusur yüzeye yakınsa parçacıkları toplar; derindeki iç kusurlar için ultrasonik veya radyografik muayene gerekir.",
      category: "Bakım",
    },
    {
      id: 183,
      question: "Sıvı penetrant muayenesinde (PT) adımların doğru sırası nedir?",
      options: [
        "Temizleme, penetrant, fazlasını alma, geliştirici",
        "Geliştirici, penetrant, temizleme, fazlasını alma",
        "Penetrant, geliştirici, temizleme, fazlasını alma",
        "Fazlasını alma, temizleme, geliştirici, penetrant",
      ],
      correctAnswer: 0,
      explanation:
        "Yüzey temizlenir, penetrant sürülüp bekletilir, yüzeydeki fazla penetrant alınır ve geliştirici çatlakta kalan sıvıyı yüzeye çekerek göstergeyi görünür kılar.",
      category: "Bakım",
    },
    {
      id: 184,
      question: "PT muayenesinin manyetik parçacığa göre üstünlüğü nedir?",
      options: [
        "Derindeki iç kusurları da gösterebilmesi",
        "Manyetik olmayan malzemede kullanılması",
        "Yüzey temizliği gerektirmeden çalışması",
        "Boyalı yüzeyde doğrudan uygulanabilmesi",
      ],
      correctAnswer: 1,
      explanation:
        "Penetrant kılcallıkla çalıştığından paslanmaz çelik, alüminyum ve dökümde de kullanılabilir; buna karşılık yalnızca yüzeye açık kusurları bulur ve temiz yüzey ister.",
      category: "Bakım",
    },
    {
      id: 185,
      question: "Durum bazlı bakım (condition-based) kararı neye dayanır?",
      options: [
        "Takvimdeki sabit aralığın dolmasına",
        "Yalnızca arızanın gerçekleşmesine",
        "Ölçülen mevcut durum göstergesine",
        "Yalnızca liman planındaki boşluğa",
      ],
      correctAnswer: 2,
      explanation:
        "Titreşim, sıcaklık, basınç ve yağ analizi gibi göstergeler sınır değeri aştığında bakım açılır; ekipman iyi durumdayken gereksiz söküm yapılmaz.",
      category: "Bakım",
    },
    {
      id: 186,
      question: "Bir ekipmanın kritik sayılmasını belirleyen ölçüt nedir?",
      options: [
        "Ekipmanın satın alma bedelinin yüksekliği",
        "Ekipmanın makine dairesindeki konumu",
        "Ekipmanın üretici garantisinin süresi",
        "Arızasının emniyet ve seyre etkisi",
      ],
      correctAnswer: 3,
      explanation:
        "ISM Kod, ani arızası tehlikeli duruma yol açabilecek ekipmanları kritik ilan etmeyi ister; bu ekipmanlar için düzenli test, yedeklilik ve öncelikli yedek parça planlanır.",
      category: "Bakım",
    },
    {
      id: 187,
      question:
        "Titreşim analizinde spektrumda 1× devir frekansındaki tepe neyi işaret eder?",
      options: [
        "Rotor balanssızlığını en tipik biçimde",
        "Yatak yağının viskozite düşüşünü kesin",
        "Dişli çark dişlerinin kırıldığını kesin",
        "Kaplin cıvatalarının gevşediğini kesin",
      ],
      correctAnswer: 0,
      explanation:
        "Balanssızlık enerjiyi dönme frekansında toplar; eksen kaçıklığı 2× bileşeni, mekanik gevşeklik harmonik dizisi, rulman kusurları ise yüksek frekanslı özgün bantlar üretir.",
      category: "Bakım",
    },
  ],
  "engine-room-ops": [
    {
      id: 155,
      question:
        "Ana makine seyir hazırlığında turning gear ile ilgili doğru uygulama nedir?",
      options: [
        "İndikatör muslukları açık iken mil döndürülür",
        "Turning gear takılıyken makine çalıştırılır",
        "Muslukları kapalı tutup hava verilerek denenir",
        "Turning gear sökülmeden manevraya başlanır",
      ],
      correctAnswer: 0,
      explanation:
        "İndikatör muslukları açıkken turning gear ile birkaç tur çevrilerek silindirde su veya yağ birikimi olmadığı doğrulanır; ardından turning gear ayrılır ve hava ile üfleme yapılır.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 156,
      question: "Seyir öncesi yardımcı makine kontrolünde ilk bakılan nedir?",
      options: [
        "Jeneratörün boya ve dış görünüm durumu",
        "Yağ, soğutma suyu ve yakıt seviyeleri",
        "Jeneratör etiketindeki seri numarası",
        "Makine dairesi aydınlatma armatürleri",
      ],
      correctAnswer: 1,
      explanation:
        "Yol vermeden önce karter yağı, soğutma suyu genleşme tankı ve günlük yakıt tankı seviyeleri ile yol verme havası basıncı doğrulanır; eksik seviye kalkışta hasar yaratır.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 157,
      question: "Seyir hazırlığında ikinci bir jeneratör neden devreye alınır?",
      options: [
        "Yakıt tüketimini düşürebilmek amacıyla",
        "Bakım aralığını uzatabilmek amacıyla",
        "Ani yük artışında blackout riskine karşı",
        "Egzoz sıcaklığını düşürebilmek amacıyla",
      ],
      correctAnswer: 2,
      explanation:
        "Manevra ve dar su geçişlerinde bow thruster, dümen ve vinç yükleri ani biner; tek jeneratörle çalışmak bu yük sıçramalarında trip ve blackout riski yaratır.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 158,
      question: "Yakıt sistemi seyir hazırlığında hangi kontrol yapılır?",
      options: [
        "Yalnızca yakıt fiyat listesinin gözden geçirilmesi",
        "Yalnızca bunker teslim notunun arşivlenmesi",
        "Yalnızca tank boyalarının durumu incelenmesi",
        "Servis tankı seviyesi, ısıtma ve viskozite",
      ],
      correctAnswer: 3,
      explanation:
        "Servis tankı seviyesi, drenajın alınmış olması, ısıtıcı çıkış sıcaklığı ve viskozite kontrolörünün ayarı doğrulanır; separatörler ve besleme pompaları çalışır durumda olmalıdır.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 159,
      question: "Yakıt servis tankından drenaj almanın amacı nedir?",
      options: [
        "Dipte biriken su ve tortuyu uzaklaştırmak",
        "Tank içindeki basıncı dengeleyebilmek",
        "Yakıtın viskozitesini yükseltebilmek",
        "Tank kapasitesini kalıcı büyütebilmek",
      ],
      correctAnswer: 0,
      explanation:
        "Su ve tortu yakıttan ağır olduğu için tank dibinde toplanır; düzenli drenaj bunları sisteme girmeden alır, aksi hâlde enjeksiyon ekipmanı aşınır ve yanma bozulur.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 160,
      question: "Kalkış öncesi dümen donanımı testinde ne doğrulanır?",
      options: [
        "Yalnızca dümen dairesinin aydınlatması",
        "Tam bordadan bordaya hareket ve süresi",
        "Yalnızca hidrolik yağın satın alma tarihi",
        "Yalnızca dümen yelpazesinin boya durumu",
      ],
      correctAnswer: 1,
      explanation:
        "SOLAS, kalkıştan önceki 12 saat içinde dümenin bir bordadan diğerine tam hareketini, güç ünitelerini, uzaktan kumanda sistemlerini ve haberleşmeyi test etmeyi ister.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 161,
      question: "Manevra öncesi ırgat ve vinçlerin hazırlanmasında ne sağlanır?",
      options: [
        "Yalnızca tel halatların boyanmış olması",
        "Yalnızca güverte aydınlatmasının açılması",
        "Hidrolik güç ünitesinin devreye alınması",
        "Yalnızca vinç etiketlerinin okunabilmesi",
      ],
      correctAnswer: 2,
      explanation:
        "Güverte makineleri hidrolik veya elektrik güç ünitesi devreye alınıp yağ sıcaklığı ve basıncı kararlı hâle geldikten sonra çalışır; makine dairesi bu hazırlığı köprüüstüne bildirir.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 162,
      question: "Engine room check list kullanımının temel yararı nedir?",
      options: [
        "Vardiya sürelerini kısaltabilmesi",
        "Yedek parça maliyetini düşürmesi",
        "Klas sörveyinin yerine geçebilmesi",
        "Adımın atlanmasını önleyebilmesi",
      ],
      correctAnswer: 3,
      explanation:
        "Kontrol listesi hazırlığı standartlaştırır ve yoğun anlarda unutulan adımı yakalar; imzalanan liste aynı zamanda yapılan kontrolün kaydını oluşturur.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 163,
      question: "Kontrol listesindeki bir madde sağlanamıyorsa ne yapılır?",
      options: [
        "Durum kaydedilip baş mühendise bildirilir",
        "Madde listeden kalıcı olarak çıkarılır",
        "Liste imzalanıp işleme devam edilir",
        "Bir sonraki seferde bakılmak üzere ertelenir",
      ],
      correctAnswer: 0,
      explanation:
        "Sağlanamayan madde işaretlenip gerekçesiyle kaydedilir ve karar verecek kişiye bildirilir; listenin gerçeğe aykırı imzalanması denetimlerde ağır bulgu doğurur.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 164,
      question: "Ana makine performans izlemesinde hangi parametreler karşılaştırılır?",
      options: [
        "Yalnızca gemi konumu ve rota bilgisi",
        "Egzoz sıcaklıkları, basınçlar ve devir",
        "Yalnızca mürettebat vardiya çizelgesi",
        "Yalnızca liman varış saati tahminleri",
      ],
      correctAnswer: 1,
      explanation:
        "Silindir egzoz sıcaklıkları, süpürme ve maksimum yanma basınçları, turboşarjer devri ve yakıt indeksi kaydedilip tezgâh testi referans değerleriyle karşılaştırılır.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 165,
      question:
        "Silindirler arasında egzoz sıcaklığı farkının büyümesi neyi düşündürür?",
      options: [
        "Geminin rotasının değiştirilmiş olduğunu",
        "Deniz suyu tuzluluğunun arttığını",
        "Yakıt yüklemesinin dengesiz olduğunu",
        "Yağlama yağı renginin koyulaştığını",
      ],
      correctAnswer: 2,
      explanation:
        "Sıcaklık dağılımındaki sapma çoğunlukla enjektör, yakıt pompası veya supap kaynaklıdır; sürekli izlenen fark, arızalı silindiri sökmeden önce belirlemeyi sağlar.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 166,
      question: "Engine Log Book kaydında hangi ilke geçerlidir?",
      options: [
        "Kayıt sefer sonunda toplu doldurulur",
        "Hatalı kayıt silinip yeniden yazılır",
        "Kayıt yalnızca baş mühendisçe tutulur",
        "Ölçüm alındığı anda ve okunaklı yazılır",
      ],
      correctAnswer: 3,
      explanation:
        "Değerler okunduğu anda kaydedilir; hatalı kayıt silinmez, üzeri tek çizgiyle çizilip paraflanarak düzeltilir. Sonradan doldurulan jurnal denetimde kanıt değeri taşımaz.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 167,
      question: "Makine dairesinde bir alarm geldiğinde doğru sıra nedir?",
      options: [
        "Susturup nedeni doğrula, sonra müdahale et",
        "Alarmı kalıcı devre dışı bırakıp beklemek",
        "Önce sigortayı atıp sistemi durdurmak",
        "Kaydı sonra tutmak üzere hiç bakmamak",
      ],
      correctAnswer: 0,
      explanation:
        "Sesli uyarı susturulur ama alarm sıfırlanmaz; ilgili gösterge ve sahadaki değer doğrulanarak gerçek arıza mı yoksa sensör hatası mı olduğu belirlenir ve buna göre müdahale edilir.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 168,
      question: "UMS (Unmanned Machinery Space) modunda hangi düzenek zorunludur?",
      options: [
        "Makine dairesinde sürekli personel bulunması",
        "Kamaraya alarm veren vardiya çağrı sistemi",
        "Tüm alarmların kalıcı susturulmuş olması",
        "Otomasyon sisteminin tümüyle kapatılması",
      ],
      correctAnswer: 1,
      explanation:
        "UMS'te alarmlar köprüüstüne ve nöbetçi mühendisin kamarasına aktarılır; ayrıca ölü adam alarmı, yangın algılama ve otomatik yedek pompa devreye alma düzenleri aranır.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 169,
      question: "UMS moduna geçmeden önce nöbetçi mühendis ne yapar?",
      options: [
        "Tüm alarm noktalarını devre dışı bırakır",
        "Ana makine yükünü tam güce yükseltir",
        "Devir turu yapıp alarm testini doğrular",
        "Yakıt servis tankını tümüyle boşaltır",
      ],
      correctAnswer: 2,
      explanation:
        "Geçiş öncesi tam bir kontrol turu yapılır; sintine seviyeleri, tank stokları ve yedek pompaların otomatik konumu doğrulanır, alarm aktarımı sınanarak kayda geçirilir.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 170,
      question: "Ana makine manevra moduna geçirilirken ne yapılır?",
      options: [
        "Yakıt indeksi sınırı tümüyle kaldırılır",
        "Yol verme hava tüpleri boşaltılır",
        "Yedek jeneratör devreden çıkarılır",
        "Yol verme havası ve yedek güç hazırlanır",
      ],
      correctAnswer: 3,
      explanation:
        "Manevrada sık yol verme gerektiğinden hava tüpleri doldurulur, ikinci jeneratör paralele alınır, kontrol köprüüstünden makine dairesine devredilir ve saatler eşitlenir.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 171,
      question: "Manevra öncesi ana makine neden kademeli soğutulur?",
      options: [
        "Ani yük düşüşünün termal şok yaratmaması",
        "Yakıt tüketiminin doğrudan azaltılması",
        "Turboşarjer devrinin sabit tutulabilmesi",
        "Jeneratör frekansının yükseltilebilmesi",
      ],
      correctAnswer: 0,
      explanation:
        "Seyir yükünden manevra yüküne inişte sıcaklıklar hızla değişirse gömlek, kapak ve supaplarda termal gerilme oluşur; bu yüzden yük belirli bir süre boyunca kademeli düşürülür.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 172,
      question: "Ağır yakıttan düşük kükürtlü yakıta geçişte neye dikkat edilir?",
      options: [
        "Değişimin en kısa sürede tamamlanmasına",
        "Sıcaklık değişim hızının sınırlanmasına",
        "Separatörlerin tümüyle durdurulmasına",
        "Isıtıcıların en yüksek ayara alınmasına",
      ],
      correctAnswer: 1,
      explanation:
        "Hızlı sıcaklık değişimi viskoziteyi ani düşürüp yakıt pompası plunger'larında sıkışma ve kaçak yaratır; geçiş genelde saatte 2 °C dolayında bir hızla kademeli yapılır.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 173,
      question: "Ana makine devrini sabit tutan düzenek hangisidir?",
      options: [
        "Turboşarjer üfleme kanadı açıklığı",
        "Silindir yağlama pompası ayarı",
        "Yakıt indeksini süren regülatör",
        "Soğutma suyu termostatik valfi",
      ],
      correctAnswer: 2,
      explanation:
        "Regülatör ölçülen devir ile set değerini karşılaştırır ve yakıt pompası indeksini değiştirerek yükü karşılar; yük artınca indeks yükselir, azalınca düşer.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 174,
      question: "Ana makine acil durdurma (emergency stop) düzeneği ne yapar?",
      options: [
        "Yalnızca alarm panelinde uyarı gösterir",
        "Yalnızca devir sınırını kademeli düşürür",
        "Yalnızca soğutma pompalarını durdurur",
        "Yakıt beslemesini anında keser",
      ],
      correctAnswer: 3,
      explanation:
        "Acil durdurma yakıt rakını sıfıra alarak veya yakıt valfini kapatarak yanmayı anında sonlandırır; sistem köprüüstünden ve makine kontrol odasından ayrı ayrı tetiklenebilir.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 175,
      question: "Tek yönlü sabit hatveli pervanede geri yol nasıl elde edilir?",
      options: [
        "Ana makine ters yönde döndürülerek",
        "Pervane hatvesi negatif yapılarak",
        "Dümen tam bordaya alınmış olarak",
        "Şaft freni sürekli uygulanarak",
      ],
      correctAnswer: 0,
      explanation:
        "Sabit hatveli pervanede geri yol için makine durdurulup yol verme havası ters kam konumundan verilir ve makine ters yönde çalıştırılır; kontrol hatveli pervanede yalnızca hatve çevrilir.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 176,
      question:
        "Köprüüstü ile makine dairesi arasında telgraf komutu nasıl doğrulanır?",
      options: [
        "Yalnızca telefonla sözlü onay verilerek",
        "Telgraf kolu yanıtlanıp jurnale yazılarak",
        "Yalnızca alarm ışığının yanmasıyla",
        "Yalnızca komutun tekrar edilmesiyle",
      ],
      correctAnswer: 1,
      explanation:
        "Makine dairesi telgraf kolunu aynı konuma getirerek komutu yanıtlar; hem köprü hem makine kayıt cihazı ve jurnal komutun saatini ve içeriğini belgeler.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 177,
      question: "Makine dairesindeki bir arıza köprüüstüne ne zaman bildirilir?",
      options: [
        "Yalnızca vardiya değişiminde toplu olarak",
        "Yalnızca arıza tümüyle giderildikten sonra",
        "Seyir emniyetini etkiler etkilemez hemen",
        "Yalnızca baş mühendis onayı beklendikten",
      ],
      correctAnswer: 2,
      explanation:
        "Manevra kabiliyetini, gücü veya dümeni etkileyebilecek her arıza gecikmeden köprüüstüne bildirilir; kaptan buna göre hız, rota ve trafik kararlarını değiştirir.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 178,
      question: "Makine dairesi yangınında ilk müdahale sırası nasıldır?",
      options: [
        "Önce sabit sistemin boşaltılması yapılır",
        "Önce havalandırma fanları açılır",
        "Önce sintine pompaları çalıştırılır",
        "Alarm verilip yakıt ve fan kesilir",
      ],
      correctAnswer: 3,
      explanation:
        "Yangın alarmı verilir, hızlı kapatma valfleriyle yakıt beslemesi kesilir, fanlar durdurulup damperler kapatılır ve taşınabilir söndürücülerle ilk müdahale denenir; sabit sistem son adımdır.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 179,
      question: "Makine dairesinde en sık görülen yangın başlangıcı nedir?",
      options: [
        "Sıcak yüzeye püsküren yakıt veya yağ",
        "Soğutma suyu devresindeki kaçak",
        "Sintine suyunun yükselmiş olması",
        "Balast tankındaki hava basıncı",
      ],
      correctAnswer: 0,
      explanation:
        "Basınçlı yakıt veya yağ hattındaki kaçağın egzoz manifoldu gibi sıcak yüzeye püskürmesi tipik başlangıçtır; bu yüzden sıcak yüzeyler yalıtılır ve hatlarda koruyucu kılıf kullanılır.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 180,
      question: "Blackout sonrası güç geri kazanımında doğru yaklaşım nedir?",
      options: [
        "Tüm tüketicileri aynı anda devreye almak",
        "Jeneratörü alıp yükü kademeli yüklemek",
        "Önce ana makineyi çalıştırmayı denemek",
        "Acil jeneratörle ana panoyu beslemek",
      ],
      correctAnswer: 1,
      explanation:
        "Bir jeneratör panoya alınıp önce yağlama, soğutma ve dümen gibi zorunlu tüketiciler kademeli devreye alınır; toplu yükleme yeni bir trip ve ikinci blackout yaratır.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 181,
      question: "Acil jeneratörün blackout anındaki görevi nedir?",
      options: [
        "Ana makineyi doğrudan çalıştırmak",
        "Tüm gemi yüklerini karşılamaktır",
        "Acil barayı besleyip aydınlatmak",
        "Ana panoyu tam yükle beslemektir",
      ],
      correctAnswer: 2,
      explanation:
        "Acil jeneratör SOLAS'ın istediği acil aydınlatma, seyir fenerleri, telsiz, yangın pompası ve dümen gibi yükleri belirlenen süre besler; ana baranın tamamını taşıyacak güçte değildir.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 182,
      question: "Ana makine devre dışı kaldığında köprüüstünün ilk yapacağı nedir?",
      options: [
        "Yalnızca demir atmayı beklemeye almak",
        "Yalnızca yakıt tüketimini kaydetmek",
        "Yalnızca liman acentesini bilgilendirmek",
        "Kumanda edememe işaretlerini göstermek",
      ],
      correctAnswer: 3,
      explanation:
        "COLREG uyarınca kumanda edemeyen gemi fener ve şekillerini gösterir, uygun VHF anonsu yapar; makine dairesi bu sırada arızanın süresini ve olası kısmi gücü bildirir.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 183,
      question: "Deniz suyu devresinde sızıntı fark edildiğinde ilk adım nedir?",
      options: [
        "İlgili hattı izole edip yedek devreye almak",
        "Sızıntıyı sonraki limanda onarmayı beklemek",
        "Deniz suyu pompasının devrini artırmak",
        "Sintine pompasını sürekli çalışır bırakmak",
      ],
      correctAnswer: 0,
      explanation:
        "Sızan hat kapatma valfleriyle izole edilip yedek hat veya çapraz bağlantı devreye alınır; su seviyesi izlenir ve durum köprüüstüne bildirilir, geçici onarım sonra düşünülür.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 184,
      question: "Deniz suyu emiş sandığı (sea chest) tıkanması hangi belirtiyi verir?",
      options: [
        "Yağlama yağı basıncının yükselmesi",
        "Soğutma suyu debisi ve basıncı düşer",
        "Yakıt viskozitesinin ani yükselmesi",
        "Yol verme havası basıncının düşmesi",
      ],
      correctAnswer: 1,
      explanation:
        "Sığ ve çamurlu suda emiş ızgarası tıkanınca pompa emiş vakumu artar, debi düşer ve soğutucu çıkış sıcaklıkları yükselir; çözüm alternatif sandığa geçip üfleme yapmaktır.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 185,
      question: "Ana makine yağlama yağı düşük basınç alarmında ne yapılır?",
      options: [
        "Alarm kaydedilip seyre devam edilir",
        "Yağ sıcaklığı ayarı yükseltilir",
        "Yük düşürülüp basınç doğrulanır",
        "Alarm eşiği aşağı çekilip susturulur",
      ],
      correctAnswer: 2,
      explanation:
        "Basınç göstergesi sahadan doğrulanır, filtre fark basıncı ve yedek pompa kontrol edilir; sebep bulunamazsa yatak hasarını önlemek için yük düşürülür ve gerekirse makine durdurulur.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 186,
      question: "Acil jeneratörün otomatik devreye girme süresi neye bağlıdır?",
      options: [
        "Yalnızca yakıt tankının hacmine bağlıdır",
        "Yalnızca jeneratör gücüne bağlıdır",
        "Yalnızca deniz suyu sıcaklığına bağlıdır",
        "SOLAS'ın öngördüğü azami süre sınırına",
      ],
      correctAnswer: 3,
      explanation:
        "SOLAS acil jeneratörün ana güç kaybından sonra 45 saniye içinde devreye girip acil baraya yük vermesini ister; bu yüzden düzenli otomatik yol verme testi yapılır.",
      category: "Makine Dairesi Operasyonları",
    },
    {
      id: 187,
      question: "Acil jeneratörün yakıt tankı hangi ölçüte göre boyutlandırılır?",
      options: [
        "Öngörülen süre boyunca yük besleyecek hacim",
        "Ana makinenin günlük tüketimine eşit hacim",
        "Jeneratör dairesinin boş alanına göre hacim",
        "Yalnızca tersanenin standardına göre hacim",
      ],
      correctAnswer: 0,
      explanation:
        "Tank, geminin tipine göre 18 veya 36 saat boyunca acil yükleri besleyecek yakıtı taşıyacak biçimde hesaplanır ve acil jeneratör dairesinin içinde bulundurulur.",
      category: "Makine Dairesi Operasyonları",
    },
  ],
};
