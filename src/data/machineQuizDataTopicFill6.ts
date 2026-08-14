import type { QuizQuestion } from "@/types/quiz";

/**
 * Konu doldurma bankası 6 — makine dairesi güvenliği konu bankasında konu
 * başına en az 8 soru hedefini tutturmak için yazılan ek sorular.
 *
 * `exerciseQuestionDistribution.ts` soruları konu başlıklarıyla sözcük örtüşmesine
 * göre eşlediğinden her soru hedeflediği konunun kendi terminolojisini kullanır;
 * aksi hâlde benzerlik puanı soruyu komşu konuya taşır.
 *
 * Numaralandırma taban + devam + vaka bankalarının ardından sürer (155'ten
 * başlar); `machineQuizDataIndex.ts` bankaları slug bazında bu sırayla birleştirir.
 */
export const machineQuizQuestionsTopicFill6: Record<string, QuizQuestion[]> = {
  "engine-room-safety": [
    {
      id: 155,
      question:
        "Kişisel koruyucu donanım risk kontrol sıralamasında nerede yer alır?",
      options: [
        "Son savunma hattı olarak en sonda",
        "İlk ve tek önlem olarak en başta",
        "Mühendislik önlemlerinin yerine",
        "Risk değerlendirmesinin yerine",
      ],
      correctAnswer: 0,
      explanation:
        "Tehlike önce ortadan kaldırılır, sonra ikame ve mühendislik önlemleri uygulanır; kişisel koruyucu donanım bunların hiçbiri riski yeterince düşüremediğinde giyilen son katmandır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 156,
      question: "Makine dairesinde standart olarak giyilmesi beklenen KKD hangisidir?",
      options: [
        "Yalnızca eldiven ve gözlük",
        "Tulum, baret, ayakkabı, kulaklık",
        "Yalnızca yüz siperi ve önlük",
        "Yalnızca solunum cihazı",
      ],
      correctAnswer: 1,
      explanation:
        "Makine dairesine girişte kollu tulum, baret, çelik burunlu ayakkabı ve kulak koruyucu temel donanımdır; işin türüne göre gözlük, eldiven ve yüz siperi eklenir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 157,
      question: "KKD kullanımından önce yapılması gereken kontrol nedir?",
      options: [
        "Yalnızca renk uyumuna bakılması",
        "Yalnızca üretici adının okunması",
        "Hasar ve son kullanma kontrolü",
        "Yalnızca ağırlığının tartılması",
      ],
      correctAnswer: 2,
      explanation:
        "Her kullanımdan önce çatlak, yırtık, deforme parça ve süresi dolmuş bileşen aranır; hasarlı donanım koruma sağlamadığı hâlde kullanana yanlış bir güven verir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 158,
      question:
        "Makine dairesinde gürültü maruziyeti hangi eşikten sonra korumayı zorunlu kılar?",
      options: [
        "Yaklaşık 55 dB(A) düzeyinden sonra",
        "Yaklaşık 65 dB(A) düzeyinden sonra",
        "Yaklaşık 120 dB(A) düzeyinden sonra",
        "Yaklaşık 85 dB(A) düzeyinden sonra",
      ],
      correctAnswer: 3,
      explanation:
        "IMO gürültü kodu, 85 dB(A) üzerindeki alanlarda işitme koruması kullanımını, 110 dB(A) üzerinde ise girişin sınırlandırılmasını ve uyarı levhası konmasını ister.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 159,
      question: "Gürültüye bağlı işitme kaybının en önemli özelliği nedir?",
      options: [
        "Kalıcı olması ve geri dönmemesi",
        "Birkaç gün içinde düzelmesi",
        "Yalnızca yaşlılıkta görülmesi",
        "İlaçla tümüyle giderilebilmesi",
      ],
      correctAnswer: 0,
      explanation:
        "Yüksek sese uzun süre maruz kalmak iç kulaktaki tüy hücrelerini kalıcı olarak zedeler; kayıp yavaş ilerlediği için fark edilmesi de gecikir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 160,
      question: "Kulak tıkacı ile kulaklık arasındaki seçim neye göre yapılır?",
      options: [
        "Yalnızca kişinin kişisel tercihine",
        "Gürültü düzeyi ve çalışma süresine",
        "Yalnızca ekipmanın rengine göre",
        "Yalnızca depodaki stok durumuna",
      ],
      correctAnswer: 1,
      explanation:
        "Koruyucunun sağladığı zayıflatma değeri ortam düzeyine yetmelidir; çok yüksek gürültüde tıkaç ve kulaklık birlikte kullanılır, uzun süreli işlerde konfor da belirleyicidir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 161,
      question: "Taşlama işinde göz ve yüz için hangi koruma yeterlidir?",
      options: [
        "Yalnızca standart iş gözlüğü",
        "Yalnızca güneş gözlüğü camı",
        "Gözlük üstüne tam yüz siperi",
        "Yalnızca toz maskesi takmak",
      ],
      correctAnswer: 2,
      explanation:
        "Taşlama kıvılcım ve parçacığı geniş açıyla savurur; koruyucu gözlük gözü korur ama yüzün tamamı ancak siperle korunur, bu yüzden ikisi birlikte kullanılır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 162,
      question: "Kaynak işinde göz koruması neden özel filtre gerektirir?",
      options: [
        "Yalnızca kıvılcım sıçraması olduğu için",
        "Yalnızca yüksek sıcaklık oluştuğu için",
        "Yalnızca duman açığa çıktığı için",
        "Ultraviyole ışıma korneayı yaktığı için",
      ],
      correctAnswer: 3,
      explanation:
        "Ark kaynağının ürettiği ultraviyole ışıma korneada ağrılı yanığa yol açar; bu yüzden işleme uygun karartma numarası taşıyan kaynak camı zorunludur.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 163,
      question: "Sıcak yüzeyle çalışırken hangi eldiven tipi seçilir?",
      options: [
        "Isıya dayanıklı özel eldiven",
        "İnce lateks muayene eldiveni",
        "Elektrik yalıtım eldiveni",
        "Kimyasal koruma eldiveni",
      ],
      correctAnswer: 0,
      explanation:
        "Her eldiven yalnızca tasarlandığı tehlikeye karşı korur; kimyasal veya elektrik eldiveni sıcak yüzeyde erir ve yaralanmayı ağırlaştırır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 164,
      question: "Dönen makine yakınında eldiven kullanımıyla ilgili kural nedir?",
      options: [
        "Her koşulda kalın eldiven giyilir",
        "Kapılma riski varsa giyilmez",
        "Yalnızca lastik eldiven giyilir",
        "Eldiven yerine bez sarılır",
      ],
      correctAnswer: 1,
      explanation:
        "Torna, matkap ve şaft gibi dönen parçaların yanında eldiven kapılıp eli içeri çeker; bu işlerde eldiven takılmaz, bol giysi ve takı da çıkarılır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 165,
      question: "Makine dairesi tulumunun kollu ve tam boy olmasının nedeni nedir?",
      options: [
        "Yalnızca üniforma bütünlüğü için",
        "Yalnızca kir görünmesin diye",
        "Sıcak yüzey ve sıçramaya karşı",
        "Yalnızca cep sayısı fazla olsun diye",
      ],
      correctAnswer: 2,
      explanation:
        "Açıkta kalan cilt, sıcak boru teması ve yağ-yakıt sıçramasına karşı savunmasızdır; ayrıca alev geciktirici kumaş ani parlamada kritik saniyeler kazandırır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 166,
      question: "Güvenlik ayakkabısındaki S3 sınıfı neyi ekler?",
      options: [
        "Yalnızca burun koruması ekler",
        "Yalnızca renk kodu belirtir",
        "Yalnızca numara aralığı belirtir",
        "Delinme direnci ve su geçirmezlik",
      ],
      correctAnswer: 3,
      explanation:
        "S1 temel burun korumasını, S2 su emmezliği, S3 ise buna ek olarak delinmeye dirençli tabanı kapsar; makine dairesinde S3 sınıfı tercih edilir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 167,
      question: "Makine dairesi ayakkabısında kaymaz taban neden aranır?",
      options: [
        "Yağlı ve ıslak zeminde düşmeyi önler",
        "Yalnızca ayakkabının ömrünü uzatır",
        "Yalnızca yürüyüş sesini azaltmaktadır",
        "Yalnızca ayak terlemesini engellemektedir",
      ],
      correctAnswer: 0,
      explanation:
        "Makine dairesi kazalarının önemli bölümü kayma ve takılmadır; yağ ile temas eden zeminde kaymaz taban en etkili tek önlemdir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 168,
      question: "Güvenlik ayakkabısı ne zaman değiştirilir?",
      options: [
        "Yalnızca yıl dönümünde değiştirilir",
        "Taban veya burun hasar gördüğünde",
        "Yalnızca renk soldu diye değiştirilir",
        "Yalnızca numara değişince değiştirilir",
      ],
      correctAnswer: 1,
      explanation:
        "Aşınıp incelen taban kaymaz özelliğini, ezilmiş burun ise darbe direncini yitirir; görünür hasarda ayakkabı süresi dolmasa da yenilenir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 169,
      question: "Yağ yangınında (F sınıfı) hangi portatif söndürücü kullanılır?",
      options: [
        "Basınçlı su söndürücüsü",
        "Standart köpük söndürücü",
        "Islak kimyasal söndürücü",
        "Basınçlı hava söndürücüsü",
      ],
      correctAnswer: 2,
      explanation:
        "Yemek yağı yangınında ıslak kimyasal, yağ yüzeyinde sabunlaşma tabakası oluşturarak yeniden tutuşmayı engeller; su ise yağı sıçratıp yangını büyütür.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 170,
      question: "Elektrik panosu yangınında hangi portatif söndürücü tercih edilir?",
      options: [
        "Basınçlı su söndürücüsü",
        "Mekanik köpük söndürücü",
        "Islak kimyasal söndürücü",
        "CO₂ veya kuru kimyevi toz",
      ],
      correctAnswer: 3,
      explanation:
        "İletken olmayan söndürücü gerekir; CO₂ artık bırakmadığı için hassas elektronikte, kuru kimyevi toz ise geniş alanda tercih edilir. Su ve köpük çarpılma riski yaratır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 171,
      question: "Portatif söndürücünün kullanımında doğru sıra nedir?",
      options: [
        "Pimi çek, hortumu alevin dibine tut",
        "Alevin tepesine doğrudan püskürt",
        "Önce mührü sökmeden kolu sık",
        "Rüzgârı arkana almadan yaklaş",
      ],
      correctAnswer: 0,
      explanation:
        "Pim çekilir, hortum yanan maddenin tabanına yöneltilir, kola basılır ve süpürme hareketiyle ilerlenir; aleve tepeden püskürtmek söndürücüyü boşa harcar.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 172,
      question:
        "Yangın algılamada duman dedektörü yerine ısı dedektörü nerede tercih edilir?",
      options: [
        "Yalnızca kamara koridorlarında",
        "Buhar ve yağ buharı olan yerlerde",
        "Yalnızca köprüüstü konsolunda",
        "Yalnızca telsiz odası içinde",
      ],
      correctAnswer: 1,
      explanation:
        "Normal işletmede buhar, yağ sisi ve toz bulunan bölgelerde duman dedektörü yanlış alarm verir; bu alanlarda sabit sıcaklık veya artış hızı esaslı ısı dedektörü kullanılır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 173,
      question: "Hızlı kapatma vanaları (quick closing valve) nereden kumanda edilir?",
      options: [
        "Yalnızca vananın kendi üstünden",
        "Yalnızca köprüüstü konsolundan",
        "Makine dairesi dışındaki bir noktadan",
        "Yalnızca acil jeneratör dairesinden",
      ],
      correctAnswer: 2,
      explanation:
        "Yangın nedeniyle mahalle girilemeyeceği için kumanda kolları makine dairesi dışında, kolay erişilen ve levhalanmış bir noktada toplanır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 174,
      question: "Hızlı kapatma vanalarının işlevi nedir?",
      options: [
        "Soğutma suyu debisini ayarlamak",
        "Sintine seviyesini sabit tutmak",
        "Yakıt tanklarını havalandırmak",
        "Tanklardan yakıt akışını kesmek",
      ],
      correctAnswer: 3,
      explanation:
        "Yangında tanklardan makine dairesine yakıt ve yağ beslemesi uzaktan kesilir; besleme kesilmeden söndürme kalıcı olmaz. Vanalar düzenli olarak test edilir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 175,
      question: "SOLAS'a göre yangın tatbikatı hangi sıklıkla yapılır?",
      options: [
        "Ayda en az bir kez yapılır",
        "Yılda en az bir kez yapılır",
        "Üç ayda en az bir kez yapılır",
        "Beş yılda bir kez yapılır",
      ],
      correctAnswer: 0,
      explanation:
        "SOLAS her mürettebat üyesinin ayda en az bir yangın tatbikatına katılmasını ister; mürettebatın önemli bölümü değişirse tatbikat kalkıştan kısa süre sonra yinelenir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 176,
      question: "Muster listesi neyi belirler?",
      options: [
        "Yalnızca söndürücülerin yerlerini",
        "Herkesin acil durum görevini",
        "Yalnızca can salı kapasitesini",
        "Yalnızca alarm sinyali tipini",
      ],
      correctAnswer: 1,
      explanation:
        "Muster listesi her mürettebat üyesinin hangi alarmda nereye gideceğini ve hangi görevi üstleneceğini gösterir; kamaralarda ve ortak alanlarda asılı bulundurulur.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 177,
      question: "Bir mahallin kapalı alan sayılması için hangi ölçüt aranır?",
      options: [
        "Yalnızca içeride ışık bulunmaması",
        "Yalnızca mahallin küçük olması",
        "Sınırlı giriş ve yetersiz havalandırma",
        "Yalnızca mahallin güverte altında olması",
      ],
      correctAnswer: 2,
      explanation:
        "Kapalı alan; giriş-çıkışı sınırlı, sürekli insan bulunması için tasarlanmamış ve doğal havalandırması yetersiz olan mahaldir. Boyut değil bu üç ölçüt belirleyicidir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 178,
      question: "Kapalı alanda oksijen azalmasının en yaygın nedeni nedir?",
      options: [
        "Yalnızca içeride yangın çıkması",
        "Yalnızca sıcaklığın yükselmesi",
        "Yalnızca basıncın düşmesi olayı",
        "Paslanma ve yükün oksijen tüketmesi",
      ],
      correctAnswer: 3,
      explanation:
        "Çelik yüzeyin oksitlenmesi, bazı yüklerin oksijen tüketmesi ve inert gaz kalıntısı oksijeni sessizce düşürür; ortam gözle bakıldığında tümüyle normal görünür.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 179,
      question: "Kapalı alana girmek için atmosfer testinde oksijen düzeyi ne olmalıdır?",
      options: [
        "Hacimce yaklaşık %20,9 düzeyinde",
        "Hacimce yaklaşık %15 düzeyinde",
        "Hacimce yaklaşık %10 düzeyinde",
        "Hacimce yaklaşık %25 düzeyinde",
      ],
      correctAnswer: 0,
      explanation:
        "Giriş için normal atmosfer değeri olan %20,9 aranır; düşük değer boğulma riskini, yüksek değer ise oksijence zengin ortamda tutuşma riskini gösterir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 180,
      question: "LEL ölçümü kapalı alanda neyi gösterir?",
      options: [
        "Ortamdaki oksijen yüzdesini",
        "Parlayıcı gazın alt sınıra oranını",
        "Ortamın bağıl nem düzeyini",
        "Ortamın sıcaklık değerini",
      ],
      correctAnswer: 1,
      explanation:
        "LEL, parlayıcı gaz derişiminin alt patlama sınırına oranını yüzde olarak verir; girişe genellikle %1 LEL'in altında izin verilir, sıcak işte sınır daha da sıkıdır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 181,
      question: "Kapalı alanda atmosfer ölçümü hangi noktalardan alınmalıdır?",
      options: [
        "Yalnızca giriş ağzından alınır",
        "Yalnızca mahallin tavanından",
        "Üst, orta ve dip seviyelerinden",
        "Yalnızca havalandırma çıkışından",
      ],
      correctAnswer: 2,
      explanation:
        "Ağır gazlar dipte, hafif gazlar tavanda birikir; bu yüzden ölçüm farklı derinliklerden alınır ve giriş süresince belirli aralıklarla yinelenir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 182,
      question: "Kapalı alan giriş izin belgesi kim tarafından onaylanır?",
      options: [
        "Yalnızca içeri girecek kişi tarafından",
        "Yalnızca giriş ağzındaki gözcü tarafından",
        "Yalnızca liman devleti denetçisi tarafından",
        "Yetkilendirilmiş sorumlu zabit tarafından",
      ],
      correctAnswer: 3,
      explanation:
        "Giriş izni, koşulları bağımsız olarak doğrulayan yetkili bir zabit tarafından imzalanır; girecek kişinin kendi iznini onaylaması kontrolün bağımsızlığını ortadan kaldırır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 183,
      question: "Kapalı alan giriş izninin geçerlilik süresi nasıl belirlenir?",
      options: [
        "Belirli bir süreyle sınırlandırılır",
        "Sefer boyunca geçerli sayılır",
        "Süresiz olarak açık bırakılır",
        "Yalnızca liman süresince geçerlidir",
      ],
      correctAnswer: 0,
      explanation:
        "İzin belirli bir iş ve süre için verilir; süre dolduğunda veya koşullar değiştiğinde atmosfer yeniden ölçülür ve izin yenilenir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 184,
      question: "Kapalı alan girişinde ağızda bekleyen gözcünün görevi nedir?",
      options: [
        "İçeriye girip yardım etmektir",
        "İletişimi sürdürüp alarm vermektir",
        "Diğer işleri de yürütmektir",
        "Ölçüm cihazını kapatmaktır",
      ],
      correctAnswer: 1,
      explanation:
        "Gözcü sürekli iletişim kurar, sayıyı ve süreyi izler, sorun gördüğünde alarm verip destek çağırır; hiçbir koşulda içeri girmez, aksi hâlde ikinci kurban olur.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 185,
      question: "Kapalı alan girişinden önce havalandırma nasıl yapılır?",
      options: [
        "Yalnızca kapak açık bırakılır",
        "Yalnızca ölçümden sonra başlanır",
        "Zorlamalı fanla hava değişimi yapılır",
        "Yalnızca girişten sonra başlatılır",
      ],
      correctAnswer: 2,
      explanation:
        "Doğal havalandırma yeterli değildir; zorlamalı fanla mahal hacminin birkaç katı hava değiştirilir ve havalandırma giriş süresince kesintisiz sürdürülür.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 186,
      question: "Havalandırmanın giriş boyunca sürdürülmesinin nedeni nedir?",
      options: [
        "Yalnızca sıcaklığı düşürmek içindir",
        "Yalnızca gürültüyü azaltmak içindir",
        "Yalnızca aydınlatmayı artırmak içindir",
        "Gaz birikiminin yeniden başlaması",
      ],
      correctAnswer: 3,
      explanation:
        "Paslanma, kalıntı buharlaşması ve yapılan iş yeniden gaz üretir; fan durdurulursa atmosfer kısa sürede yeniden bozulur, bu yüzden ölçüm de yinelenir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 187,
      question: "Kapalı alandan kurtarma yapacak ekip hangi donanımı kullanır?",
      options: [
        "Bağımsız solunum cihazı ve emniyet kemeri",
        "Yalnızca toz maskesi ve el feneri",
        "Yalnızca eldiven ve koruyucu gözlük",
        "Yalnızca telsiz ve yedek pil takımı",
      ],
      correctAnswer: 0,
      explanation:
        "Kurtarma bağımsız solunum cihazı, emniyet kemeri, halat ve gerektiğinde üçayak-vinç düzeneğiyle yapılır; filtreli maske oksijensiz ortamda hiçbir koruma sağlamaz.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 188,
      question: "Kapalı alan kurtarma tatbikatı hangi sıklıkla yapılır?",
      options: [
        "Yalnızca yılda bir kez yapılır",
        "İki ayda en az bir kez yapılır",
        "Yalnızca beş yılda bir yapılır",
        "Yalnızca havuzlamada yapılır",
      ],
      correctAnswer: 1,
      explanation:
        "SOLAS, kapalı alana giriş ve kurtarma tatbikatının iki ayda bir yapılmasını ister; tatbikatta ölçüm, izin, iletişim ve yaralı çıkarma adımları birlikte prova edilir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 189,
      question: "Kapalı alanda kurtarma sırasında ilk yapılması gereken nedir?",
      options: [
        "Hemen içeri girip müdahale etmek",
        "Kapağı kapatıp havalandırmak",
        "Alarm verip ekibi çağırmaktır",
        "Ölçüm cihazını kapatıp beklemek",
      ],
      correctAnswer: 2,
      explanation:
        "Gözcü önce alarm verir ve eğitimli ekibi çağırır; donanımsız girmek kazayı iki kişilik yapar. Ekip gelene kadar dışarıdan havalandırma ve iletişim sürdürülür.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 190,
      question: "MSDS (Güvenlik Bilgi Formu) belgesinde hangi bilgi bulunur?",
      options: [
        "Yalnızca kimyasalın satın alma fiyatı",
        "Yalnızca üreticinin ticari unvanı",
        "Yalnızca ambalajın hacim ölçüsü",
        "Tehlikeler, KKD ve ilk yardım bilgisi",
      ],
      correctAnswer: 3,
      explanation:
        "Güvenlik bilgi formu; maddenin tehlike sınıfını, maruz kalma sınırlarını, gereken koruyucu donanımı, ilk yardım ile dökülme müdahalesini ve depolama koşullarını verir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 191,
      question: "MSDS gemide nerede bulundurulmalıdır?",
      options: [
        "Kimyasalın kullanıldığı yere yakın",
        "Yalnızca şirket merkezinde saklanır",
        "Yalnızca kaptan kasasında saklanır",
        "Yalnızca yıllık denetimde getirilir",
      ],
      correctAnswer: 0,
      explanation:
        "Belge acil durumda saniyeler içinde ulaşılabilir olmalıdır; bu yüzden kimyasal deposunda ve kullanım noktasında dosyalanır, ayrıca gemi genelinde bir set bulundurulur.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 192,
      question: "Asbest içeren malzeme gemide nasıl ele alınır?",
      options: [
        "Kırılıp küçük parçalara ayrılır",
        "Bozulmadan bırakılıp işaretlenir",
        "Basınçlı hava ile temizlenir",
        "Zımparalanarak yüzeyi açılır",
      ],
      correctAnswer: 1,
      explanation:
        "Sağlam durumdaki asbest lif salmaz; tehlike ancak kırılma, kesme veya zımparalama ile ortaya çıkar. Malzeme envanterde işaretlenir ve sökümü yalnızca yetkili firma yapar.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 193,
      question: "Gemide tehlikeli madde envanteri (IHM) neyi belgeler?",
      options: [
        "Yalnızca yakıt tanklarının hacmini",
        "Yalnızca boya markalarının listesini",
        "Yasaklı malzemenin yerini ve miktarını",
        "Yalnızca yedek parça stok düzeyini",
      ],
      correctAnswer: 2,
      explanation:
        "Envanter, gemi yapısında ve donanımında bulunan asbest, PCB ve ağır metal gibi maddelerin yerini ve tahminî miktarını listeler; geri dönüşümde esas alınır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 194,
      question: "Asbest liflerinin sağlık açısından temel riski nedir?",
      options: [
        "Yalnızca ciltte kaşıntı yapması",
        "Yalnızca geçici öksürük yapması",
        "Yalnızca göz tahrişi yaratması",
        "Yıllar sonra akciğer hastalığı",
      ],
      correctAnswer: 3,
      explanation:
        "Solunan lifler akciğer dokusunda kalıcı olarak birikir; ilgili hastalıklar maruziyetten on yıllar sonra ortaya çıkar, bu yüzden risk o an hissedilmez.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 195,
      question: "Kimyasal depolamada birbirinden ayrı tutulması gereken çift hangisidir?",
      options: [
        "Asit ve alkali (baz) maddeler",
        "İki farklı marka yağlama yağı",
        "Boya ve boya tineri kutuları",
        "İki farklı temizlik deterjanı",
      ],
      correctAnswer: 0,
      explanation:
        "Asit ve baz temas ettiğinde şiddetli tepkimeye girip ısı ve gaz açığa çıkarır; uyumsuz kimyasallar ayrı bölmelerde ve tercihen ayrı sızdırmaz tepsilerde saklanır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 196,
      question: "Kimyasal deposunda hangi düzenek zorunludur?",
      options: [
        "Yalnızca kilit ve uyarı levhası",
        "Havalandırma ve göz duşu erişimi",
        "Yalnızca yangın battaniyesi",
        "Yalnızca raf etiketi düzeni",
      ],
      correctAnswer: 1,
      explanation:
        "Buhar birikmesini önleyen havalandırma, sıçramada kullanılacak göz duşu ve acil duş, dökülme için emici malzeme ve uygun söndürücü bulundurulur.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 197,
      question: "Kimyasal kapları depoda nasıl saklanır?",
      options: [
        "Etiketleri sökülmüş olarak saklanır",
        "Yalnızca açık kapaklı bekletilir",
        "Orijinal etiketli ve kapalı olarak",
        "Gıda kabına aktarılarak saklanır",
      ],
      correctAnswer: 2,
      explanation:
        "Kimyasal daima kendi etiketli kabında ve kapağı kapalı tutulur; etiketsiz veya gıda kabına aktarılmış madde yanlış kullanıma ve zehirlenmeye yol açar.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 198,
      question: "Basınçlı gaz tüpleri nasıl depolanır?",
      options: [
        "Yatık ve serbest bırakılarak",
        "Yalnızca sıcak mahalde tutularak",
        "Üst üste istiflenmiş biçimde",
        "Dik konumda ve zincirle bağlı",
      ],
      correctAnswer: 3,
      explanation:
        "Tüp dik durur, devrilmeye karşı zincir veya kelepçeyle bağlanır, valf koruma başlığı takılı tutulur; devrilen tüpün valfi kırılırsa tüp mermi gibi fırlar.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 199,
      question: "Oksijen ve asetilen tüpleri neden ayrı tutulur?",
      options: [
        "Kaçak birleşince patlayıcı ortam",
        "Yalnızca renkleri farklı olduğu için",
        "Yalnızca ağırlıkları farklı olduğu için",
        "Yalnızca vana dişleri aynı olduğu için",
      ],
      correctAnswer: 0,
      explanation:
        "Yanıcı gaz ile yakıcı gazın birlikte sızması şiddetli patlama riski doğurur; ikisi ayrı ve havalandırılmış yerlerde, yağdan uzak tutulur.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 200,
      question: "Gemide biyolojik tehlike olarak Legionella riski en çok nerede bulunur?",
      options: [
        "Yalnızca yakıt devresi hatlarında",
        "Sıcak su ve klima nemlendirmesinde",
        "Yalnızca yağlama yağı devresinde",
        "Yalnızca sintine tankı içerisinde",
      ],
      correctAnswer: 1,
      explanation:
        "Bakteri 20-45 °C arasındaki durgun suda çoğalır; sıcak su tesisatı, duş başlıkları ve klima nemlendirme suyu tipik kaynaklardır. Önlem sıcaklık kontrolü ve dezenfeksiyondur.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 201,
      question: "Sıcak su tesisatında Legionella'ya karşı hangi sıcaklık aranır?",
      options: [
        "Yaklaşık 30 °C dolayında tutulur",
        "Yaklaşık 40 °C dolayında tutulur",
        "60 °C ve üzerinde tutulur",
        "Yaklaşık 25 °C dolayında tutulur",
      ],
      correctAnswer: 2,
      explanation:
        "Depolanan sıcak su 60 °C'nin üzerinde, soğuk su ise 20 °C'nin altında tutulur; bakteri bu iki değerin arasındaki bandın dışında çoğalamaz.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 202,
      question: "Sintine ve atık su ile çalışırken hangi biyolojik önlem alınır?",
      options: [
        "Yalnızca kısa kollu tulum giyilir",
        "Yalnızca iş sonrası ilaç içilir",
        "Yalnızca eldivensiz çalışılır",
        "Sıvı geçirmez eldiven ve gözlük",
      ],
      correctAnswer: 3,
      explanation:
        "Atık su bakteri ve parazit taşır; sıçramaya karşı sıvı geçirmez eldiven, gözlük ve önlük kullanılır, iş sonrası eller antiseptikle yıkanır ve açık yara kapatılır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 203,
      question: "ISM Kod gemide hangi belgeyle uygulanır?",
      options: [
        "Emniyetli Yönetim Sistemi (SMS) ile",
        "Yalnızca klas sertifikası ile",
        "Yalnızca tonaj belgesi ile",
        "Yalnızca yükleme sınırı belgesi ile",
      ],
      correctAnswer: 0,
      explanation:
        "Şirket, gemi tipine uygun bir Emniyetli Yönetim Sistemi kurar ve uygular; sistem prosedürleri, sorumlulukları ve acil durum planlarını içerir, uygunluk belgelerle kanıtlanır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 204,
      question: "ISM Kod'un öngördüğü karadaki belirlenmiş kişi (DPA) kimdir?",
      options: [
        "Yalnızca geminin baş mühendisidir",
        "Gemi ile üst yönetim arasındaki bağ",
        "Yalnızca liman devleti denetçisidir",
        "Yalnızca klas sörveyörünün adıdır",
      ],
      correctAnswer: 1,
      explanation:
        "Belirlenmiş kişi, gemiyle şirketin en üst yönetimi arasında doğrudan erişim sağlayan karadaki görevlidir; emniyet ve çevre konularını hiyerarşiye takılmadan yönetime taşır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 205,
      question: "SMS kapsamında iç denetimin amacı nedir?",
      options: [
        "Yalnızca mürettebatı değerlendirmek",
        "Yalnızca yakıt tüketimini ölçmek",
        "Sistemin uygulandığını doğrulamak",
        "Yalnızca klas sörveyini hazırlamak",
      ],
      correctAnswer: 2,
      explanation:
        "İç denetim, yazılı prosedürlerin gerçekten uygulanıp uygulanmadığını ve etkili olup olmadığını kanıtla doğrular; bulgular düzeltici faaliyetle kapatılır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 206,
      question: "Risk değerlendirmesi hangi adımla başlar?",
      options: [
        "Kontrol önlemi seçimiyle başlar",
        "Sonuçların raporlanmasıyla başlar",
        "Kalan riskin ölçülmesiyle başlar",
        "Tehlikelerin belirlenmesiyle başlar",
      ],
      correctAnswer: 3,
      explanation:
        "Önce işin adımları ayrıştırılıp her adımdaki tehlikeler listelenir; risk ancak tehlike tanımlandıktan sonra olasılık ve şiddet üzerinden değerlendirilebilir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 207,
      question: "Risk değerlendirmesi ne zaman yenilenir?",
      options: [
        "İş, ekipman veya koşul değişince",
        "Yalnızca beş yılda bir yenilenir",
        "Yalnızca kaza olduktan sonra",
        "Yalnızca yeni gemi teslimde",
      ],
      correctAnswer: 0,
      explanation:
        "Yöntem, ekipman, personel veya çevre koşulları değiştiğinde değerlendirme güncellenir; ayrıca ramak kala ve kaza sonrası mutlaka gözden geçirilir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 208,
      question: "Risk değerlendirmesinde kalan risk (residual risk) ne anlama gelir?",
      options: [
        "Hiç önlem alınmadan önceki risk",
        "Önlemler alındıktan sonraki risk",
        "Yalnızca kaza sonrası oluşan risk",
        "Yalnızca sigortalanan risk payı",
      ],
      correctAnswer: 1,
      explanation:
        "Kontrol önlemleri uygulandıktan sonra da bir miktar risk kalır; bu kalan riskin kabul edilebilir düzeyde olduğu değerlendirilip kayda geçirilmelidir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 209,
      question: "Sıcak iş izni hangi işler için düzenlenir?",
      options: [
        "Yalnızca boya kazıma işleri için",
        "Yalnızca elektrik ölçüm işleri için",
        "Kaynak, kesme ve taşlama işleri için",
        "Yalnızca yağ değişimi işleri için",
      ],
      correctAnswer: 2,
      explanation:
        "Kıvılcım, alev veya yüksek sıcaklık üreten her iş sıcak iş sayılır; izin verilmeden önce ortam gazdan arındırılır, yanıcılar uzaklaştırılır ve yangın gözcüsü görevlendirilir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 210,
      question: "İş izni belgesi iş bittiğinde ne olur?",
      options: [
        "Bir sonraki iş için saklanır",
        "Yalnızca panoda asılı bırakılır",
        "Yalnızca sözlü olarak kapatılır",
        "Alan kontrol edilip kapatılır",
      ],
      correctAnswer: 3,
      explanation:
        "İzni veren kişi alanı gezer, ekipmanın toplandığını ve kızgın nokta kalmadığını doğrular, sonra izni imzalayarak kapatır; açık kalan izin sistemin kontrolünü bozar.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 211,
      question: "İş izin sisteminde kilitle-etiketle (LOTO) uygulaması neyi sağlar?",
      options: [
        "Ekipmanın yanlışlıkla çalışmamasını",
        "Yalnızca ekipmanın temiz kalmasını",
        "Yalnızca bakım süresinin kısalmasını",
        "Yalnızca yedek parça stoğunun artmasını",
      ],
      correctAnswer: 0,
      explanation:
        "Enerji kaynağı ayrılır, şalter kilitlenir ve üzerine kimin çalıştığını gösteren etiket asılır; kilidi yalnızca takan kişi açar, böylece beklenmedik devreye girme engellenir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 212,
      question: "Kaza sonrası kök neden analizinin amacı nedir?",
      options: [
        "Sorumlu kişiyi belirleyip cezalandırmak",
        "Tekrarı önleyecek asıl nedeni bulmak",
        "Yalnızca kaza kaydını arşivlemektir",
        "Yalnızca sigorta talebini hazırlamaktır",
      ],
      correctAnswer: 1,
      explanation:
        "Analiz, olayın görünen nedeninin ardındaki sistem zayıflığını arar; kişi değiştirilerek kapatılan olay aynı koşullarda başka biriyle yeniden yaşanır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 213,
      question: "Kök neden analizinde beş neden (5 Why) yöntemi nasıl uygulanır?",
      options: [
        "Beş farklı kişiye soru sorulur",
        "Beş ayrı rapor birlikte yazılır",
        "Her yanıta yeniden neden sorulur",
        "Beş gün boyunca gözlem yapılır",
      ],
      correctAnswer: 2,
      explanation:
        "Her cevabın ardından yeniden neden sorularak belirtiden sistem düzeyindeki nedene inilir; sayı beşle sınırlı değildir, nedenin kontrol edilebilir olduğu noktada durulur.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 214,
      question: "Kaza raporunun zamanında yazılmasının önemi nedir?",
      options: [
        "Yalnızca resmî yazışma düzeni için",
        "Yalnızca arşiv düzenini korumak için",
        "Yalnızca sigorta yazışması için gerekli",
        "Kanıt ve tanık bilgisi taze kaldığı için",
      ],
      correctAnswer: 3,
      explanation:
        "Zaman geçtikçe fiziksel kanıt bozulur ve tanık anlatımları birbirine karışır; olaya yakın alınan bilgi, kök nedene ulaşma olasılığını belirgin artırır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 215,
      question: "Toolbox toplantısı ne zaman yapılır?",
      options: [
        "İşe başlamadan hemen önce yapılır",
        "Yalnızca ay sonunda yapılır",
        "Yalnızca kaza sonrası yapılır",
        "Yalnızca liman girişinde yapılır",
      ],
      correctAnswer: 0,
      explanation:
        "Toolbox toplantısı işin başında, işi yapacak ekiple sahada yapılır; kısa tutulur, o güne özgü riskleri ve kimin ne yapacağını konuşur.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 216,
      question: "Toolbox toplantısında hangi yaklaşım aranır?",
      options: [
        "Yalnızca sorumlu kişinin konuşması",
        "Ekibin soru sorup katkı vermesi",
        "Yalnızca imza toplanıp bitirilmesi",
        "Yalnızca prosedürün okunup geçilmesi",
      ],
      correctAnswer: 1,
      explanation:
        "Toplantı tek yönlü bilgilendirme değil karşılıklı bir kontroldür; işi fiilen yapacak kişilerin fark ettiği riskler çoğu zaman prosedürde yazmayan risklerdir.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 217,
      question: "Güvenlik brifinginde mutlaka konuşulması gereken konu nedir?",
      options: [
        "Yalnızca işin tahmini bitiş saati",
        "Yalnızca ekibin izin planı durumu",
        "İşi durdurma yetkisi ve koşulları",
        "Yalnızca kullanılacak takım markası",
      ],
      correctAnswer: 2,
      explanation:
        "Her ekip üyesinin, koşullar değiştiğinde işi durdurma yetkisi olduğu açıkça söylenir; bu yetki dile getirilmezse kimse riskli anda işi durdurmayı üstlenmez.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 218,
      question: "Ramak kala (near-miss) olay nasıl tanımlanır?",
      options: [
        "Yaralanma ile sonuçlanan olaydır",
        "Yalnızca ekipman hasarlı olaydır",
        "Yalnızca çevre kirliliği olayıdır",
        "Zarar oluşmadan atlatılan olaydır",
      ],
      correctAnswer: 3,
      explanation:
        "Ramak kala, koşullar biraz farklı olsaydı yaralanma veya hasar doğurabilecek ama bu kez zararsız atlatılan olaydır; bedelsiz bir öğrenme fırsatı sunar.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 219,
      question: "Near-miss raporlamasını artırmanın en etkili yolu nedir?",
      options: [
        "Bildirimi cezasız ve kolay kılmak",
        "Bildirim sayısına kota koymak",
        "Bildirimleri imzaya bağlamak",
        "Bildirimi yalnızca zabitlere açmak",
      ],
      correctAnswer: 0,
      explanation:
        "Bildirimin cezaya dönüştüğü ortamda olaylar gizlenir; kısa form, isimsiz bildirim seçeneği ve geri bildirim döngüsü raporlamayı en çok artıran üç uygulamadır.",
      category: "Makine Dairesi Güvenliği",
    },
    {
      id: 220,
      question: "Bildirilen ramak kala olayları nasıl değerlendirilir?",
      options: [
        "Yalnızca sayılıp arşive kaldırılır",
        "Eğilim çıkarılıp önlem güncellenir",
        "Yalnızca panoda ilan edilir",
        "Yalnızca yıl sonunda okunur",
      ],
      correctAnswer: 1,
      explanation:
        "Tekil olaylar tek başına küçük görünür; aynı yerde veya aynı işte tekrarlayan bildirimler eğilim olarak okununca hangi savunmanın zayıfladığı ortaya çıkar.",
      category: "Makine Dairesi Güvenliği",
    },
  ],
};
