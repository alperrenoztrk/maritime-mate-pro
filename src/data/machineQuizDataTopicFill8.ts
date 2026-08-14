import type { QuizQuestion } from "@/types/quiz";

/**
 * Konu doldurma bankası 8 — yardımcı makineler konu bankasında konu başına en
 * az 8 soru hedefini tutturmak için yazılan ek sorular.
 *
 * `exerciseQuestionDistribution.ts` soruları konu başlıklarıyla sözcük örtüşmesine
 * göre eşlediğinden her soru hedeflediği konunun kendi terminolojisini kullanır;
 * aksi hâlde benzerlik puanı soruyu komşu konuya taşır.
 *
 * Numaralandırma taban + devam + vaka bankalarının ardından sürer (155'ten
 * başlar); `machineQuizDataIndex.ts` bankaları slug bazında bu sırayla birleştirir.
 */
export const machineQuizQuestionsTopicFill8: Record<string, QuizQuestion[]> = {
  auxiliary: [
    {
      id: 155,
      question: "Senkron alternatörde üretilen gerilimin frekansı neye bağlıdır?",
      options: [
        "Rotor devri ile kutup sayısına bağlı",
        "Yalnızca uyartım akımının değerine",
        "Yalnızca yükün güç faktörü değerine",
        "Yalnızca sargı yalıtım sınıfına bağlı",
      ],
      correctAnswer: 0,
      explanation:
        "Frekans yalnızca devir ve kutup sayısıyla belirlenir; uyartım akımı ise gerilim genliğini ve makinenin üstlendiği reaktif güç payını değiştirir.",
      category: "Yardımcı Makineler",
    },
    {
      id: 156,
      question: "Jeneratörü baraya paralel almak için hangi dört koşul sağlanır?",
      options: [
        "Yalnızca gerilim ve akım eşitliği",
        "Gerilim, frekans, faz sırası ve faz açısı",
        "Yalnızca sıcaklık ve yağ basıncı değeri",
        "Yalnızca yakıt debisi ve devir değeri",
      ],
      correctAnswer: 1,
      explanation:
        "Gelen jeneratörün gerilimi ve frekansı bara ile eşitlenir, faz sırası aynı olmalı ve şalter faz farkının sıfıra yaklaştığı anda kapatılmalıdır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 157,
      question: "Senkronoskop ibresinin yavaş saat yönünde dönmesi ne anlatır?",
      options: [
        "Gelen makinenin frekansı düşüktür",
        "Faz sırasının ters olduğu anlaşılır",
        "Gelen makinenin frekansı biraz yüksek",
        "Gerilimin bara değerinden düşük olduğu",
      ],
      correctAnswer: 2,
      explanation:
        "Saat yönünde yavaş dönüş, gelen makinenin bara frekansından biraz hızlı olduğunu gösterir; şalter ibre saat on iki konumuna gelmeden hemen önce kapatılır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 158,
      question: "Acil jeneratör dairesinin yeri için SOLAS ne ister?",
      options: [
        "Yalnızca makine dairesi içinde olması",
        "Yalnızca baş kasarada bulunması gerekir",
        "Yalnızca su hattının altında bulunması",
        "En üst sürekli güvertenin üstünde olması",
      ],
      correctAnswer: 3,
      explanation:
        "Acil jeneratör, ana makine dairesinin dışında ve en üst sürekli güvertenin üzerinde, çarpma perdesinin kıçında yer alır; böylece makine dairesi su alsa da çalışır kalır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 159,
      question: "Ateş borulu kazanda sıcak gaz nerede akar?",
      options: [
        "Su ile çevrili boruların içinde akar",
        "Boruların dışındaki su hacminde akar",
        "Yalnızca kazan gövdesinin dışında akar",
        "Yalnızca buhar tamburunun içinde akar",
      ],
      correctAnswer: 0,
      explanation:
        "Ateş borulu kazanda yanma gazı boruların içinden geçer, su ise boruları çevreler; su borulu kazanda ise bunun tam tersi geçerlidir.",
      category: "Yardımcı Makineler",
    },
    {
      id: 160,
      question: "Su borulu kazanın ateş borulu tipe göre üstünlüğü nedir?",
      options: [
        "Daha basit yapı ve düşük maliyeti",
        "Yüksek basınç ve hızlı buhar üretimi",
        "Daha büyük su hacmi taşıyabilmesi",
        "Bakımının hiç gerekmemesi durumu",
      ],
      correctAnswer: 1,
      explanation:
        "İnce borularda su hacmi küçük, ısıtma yüzeyi büyüktür; bu yüzden yüksek basınca çıkabilir ve buharı hızlı üretir. Buna karşılık su kalitesine çok duyarlıdır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 161,
      question: "Ateş borulu kazanın büyük su hacmi hangi sonucu doğurur?",
      options: [
        "Yük değişimine çok hızlı tepki vermesi",
        "Su kimyasına hiç duyarlı olmaması",
        "Yük dalgalanmasını yumuşatabilmesi",
        "Basıncın kendiliğinden yükselmesi",
      ],
      correctAnswer: 2,
      explanation:
        "Büyük su hacmi ısı deposu gibi çalışır ve ani buhar çekişlerinde basıncı korur; buna karşılık soğuk yol vermede ısınması uzun sürer, patlama enerjisi de büyüktür.",
      category: "Yardımcı Makineler",
    },
    {
      id: 162,
      question: "Kompozit kazan hangi iki ısı kaynağını birlikte kullanır?",
      options: [
        "Yalnızca güneş ve elektrik enerjisini",
        "Yalnızca elektrik ve nükleer enerjiyi",
        "Yalnızca rüzgâr ve yakıt enerjisini",
        "Yakıt brülörü ile egzoz gazı ısısını",
      ],
      correctAnswer: 3,
      explanation:
        "Kompozit kazan tek gövdede iki bölüm taşır; seyirde ana makine egzoz gazıyla, limanda veya makine durduğunda yakıt brülörüyle buhar üretir.",
      category: "Yardımcı Makineler",
    },
    {
      id: 163,
      question: "Kompozit kazanın gemi işletmesindeki temel yararı nedir?",
      options: [
        "Seyirde yakıt yakmadan buhar üretmesi",
        "Yalnızca kazan hacmini küçültmesi",
        "Yalnızca su kimyasını gereksiz kılması",
        "Yalnızca bakım aralığını uzatabilmesi",
      ],
      correctAnswer: 0,
      explanation:
        "Seyir boyunca ısıtma ve servis buharı atık egzoz ısısından karşılanır; yardımcı kazan yakıtı yalnızca limanda ve manevrada tüketilir.",
      category: "Yardımcı Makineler",
    },
    {
      id: 164,
      question: "Kompozit kazanda egzoz bölümünün kurumlanması hangi riski doğurur?",
      options: [
        "Yalnızca su tüketiminin artması riskini",
        "Kurum yangını (soot fire) çıkması riski",
        "Yalnızca buhar basıncının artması riski",
        "Yalnızca gövde boyasının bozulma riski",
      ],
      correctAnswer: 1,
      explanation:
        "Boru yüzeyinde biriken kurum tutuşabilir; düşük yükte ve kısmi yanmada birikim hızlanır, bu yüzden düzenli kurum üfleme ve yıkama yapılır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 165,
      question: "Egzoz gazı ekonomizerinin işlevi nedir?",
      options: [
        "Yalnızca egzoz gürültüsünü azaltmak",
        "Yalnızca egzoz basıncını yükseltmek",
        "Atık ısıdan buhar veya sıcak su üretmek",
        "Yalnızca egzoz gazını soğutup atmak",
      ],
      correctAnswer: 2,
      explanation:
        "Bacaya giden 250-350 °C dolayındaki egzoz gazı boru demeti üzerinden geçerek suyu ısıtır; böylece yardımcı kazan yakıtı harcamadan buhar elde edilir.",
      category: "Yardımcı Makineler",
    },
    {
      id: 166,
      question: "Ekonomizerde düşük yükte çalışırken hangi önlem gerekir?",
      options: [
        "Yalnızca su seviyesinin düşürülmesi",
        "Yalnızca egzoz valfinin kapatılması",
        "Yalnızca brülörün sürekli yakılması",
        "Dolaşım debisinin sürdürülmesi",
      ],
      correctAnswer: 3,
      explanation:
        "Su dolaşımı kesilirse boru içindeki su buharlaşıp kuru nokta oluşur, aşırı ısınma ve kurum tutuşması riski doğar; bu yüzden dolaşım pompası sürekli çalıştırılır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 167,
      question: "Ekonomizerde kurum yangınının erken belirtisi nedir?",
      options: [
        "Egzoz çıkış sıcaklığının hızla yükselmesi",
        "Buhar basıncının kendiliğinden düşmesi",
        "Su seviyesinin kendiliğinden yükselmesi",
        "Yakıt tüketiminin belirgin azalması",
      ],
      correctAnswer: 0,
      explanation:
        "Giriş sıcaklığı sabitken çıkış sıcaklığının yükselmesi boru demetinde tutuşma olduğunu gösterir; makine yükü düşürülür, kurum üfleme durdurulur ve su ile söndürülür.",
      category: "Yardımcı Makineler",
    },
    {
      id: 168,
      question: "Kazan suyunda pH değeri neden alkali tarafta tutulur?",
      options: [
        "Yalnızca köpürmeyi artırabilmek için",
        "Çelik yüzeyde korozyonu önlemek için",
        "Yalnızca buhar basıncını artırmak için",
        "Yalnızca su sertliğini yükseltmek için",
      ],
      correctAnswer: 1,
      explanation:
        "pH tipik olarak 9,5-11 aralığında tutulur; bu bantta çelik yüzeydeki koruyucu tabaka kararlıdır. Asidik su hızlı korozyon, aşırı alkali ise gevrekleşme yaratır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 169,
      question: "Kazan suyunda çözünmüş oksijen hangi soruna yol açar?",
      options: [
        "Yalnızca buhar sıcaklığını düşürmesi",
        "Yalnızca köpük oluşumunu engellemesi",
        "Çukurcuk (pitting) korozyonu yaratması",
        "Yalnızca su tüketimini azaltabilmesi",
      ],
      correctAnswer: 2,
      explanation:
        "Oksijen metal yüzeyde noktasal derin çukurlar açar; bu yüzden besleme suyu havasından arındırılır ve kalan oksijen kimyasal tutucuyla bağlanır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 170,
      question: "Kazan emniyet valfinin görevi nedir?",
      options: [
        "Yalnızca su seviyesini sabit tutmaktır",
        "Yalnızca brülörü otomatik yakmaktır",
        "Yalnızca buhar sıcaklığını ölçmektir",
        "Basıncı sınırlayıp fazla buharı atmak",
      ],
      correctAnswer: 3,
      explanation:
        "Ayar basıncı aşılınca valf açılır ve buharı emniyetli biçimde dışarı atar; her kazanda birbirinden bağımsız en az iki emniyet valfi bulunur ve düzenli test edilir.",
      category: "Yardımcı Makineler",
    },
    {
      id: 171,
      question: "Kazan düşük su seviyesi alarmı devreye girdiğinde ne olur?",
      options: [
        "Brülör otomatik olarak durdurulur",
        "Buhar basıncı otomatik yükseltilir",
        "Besleme pompası otomatik durdurulur",
        "Emniyet valfi kalıcı olarak kilitlenir",
      ],
      correctAnswer: 0,
      explanation:
        "Su seviyesi düşerken ısıtma sürerse borular kuruyup aşırı ısınır; bu yüzden düşük seviye ilk kademede alarm verir, ikinci kademede brülörü kilitleyerek durdurur.",
      category: "Yardımcı Makineler",
    },
    {
      id: 172,
      question: "Kazan iç muayenesi öncesinde hangi adım zorunludur?",
      options: [
        "Yalnızca dış yüzeyin boyanması",
        "İzolasyon, boşaltma ve havalandırma",
        "Yalnızca su kimyasalının eklenmesi",
        "Yalnızca emniyet valfinin ayarlanması",
      ],
      correctAnswer: 1,
      explanation:
        "Kazan soğutulur, buhar ve besleme hatları izole edilip kilitlenir, tamamen boşaltılır ve havalandırılır; kapalı alan giriş izni alınmadan içeri girilmez.",
      category: "Yardımcı Makineler",
    },
    {
      id: 173,
      question: "Kazan borularında kireç birikimi hangi sonuca yol açar?",
      options: [
        "Yalnızca buhar debisinin artmasına",
        "Yalnızca su tüketiminin azalmasına",
        "Isı geçişinin düşüp yüzeyin aşırı ısınması",
        "Yalnızca yakıt tüketiminin azalmasına",
      ],
      correctAnswer: 2,
      explanation:
        "Kireç yalıtkan gibi davranır; boru cidarı suya ısı veremeyip aşırı ısınır, dayanımını yitirir ve şişme ile patlama riski doğar. Yakıt tüketimi de yükselir.",
      category: "Yardımcı Makineler",
    },
    {
      id: 174,
      question: "Kazan hidrostatik testinin amacı nedir?",
      options: [
        "Yalnızca su kimyasını ölçmektir",
        "Yalnızca brülör ayarını yapmaktır",
        "Yalnızca buhar debisini ölçmektir",
        "Basınç altında sızdırmazlığı doğrulamak",
      ],
      correctAnswer: 3,
      explanation:
        "Kazan su ile doldurulup çalışma basıncının belirli bir katına çıkarılır ve kalıcı deformasyon ile kaçak aranır; test klas sörveyörü gözetiminde yapılır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 175,
      question: "Ters ozmoz sisteminde tatlı su nasıl elde edilir?",
      options: [
        "Basınçla suyu yarı geçirgen zardan geçirerek",
        "Deniz suyunu vakumda kaynatarak ayırarak",
        "Deniz suyunu dondurup buzu ayırarak",
        "Deniz suyuna kimyasal katkı ekleyerek",
      ],
      correctAnswer: 0,
      explanation:
        "Deniz suyu ozmotik basıncın üzerinde bir basınçla membrana verilir; su molekülleri zardan geçerken tuz iyonları tutulur ve konsantre salamura ayrı çıkar.",
      category: "Yardımcı Makineler",
    },
    {
      id: 176,
      question: "Ters ozmoz membranının en büyük düşmanı nedir?",
      options: [
        "Yalnızca deniz suyunun soğuk olması",
        "Tıkanma (fouling) ve klor teması",
        "Yalnızca basıncın düşük tutulması",
        "Yalnızca elektrik geriliminin düşmesi",
      ],
      correctAnswer: 1,
      explanation:
        "Askıda katı ve biyolojik büyüme zar gözeneklerini tıkar; poliamid membran ise serbest klora dayanmaz. Bu yüzden ön filtre ve klor giderme aşaması zorunludur.",
      category: "Yardımcı Makineler",
    },
    {
      id: 177,
      question: "İçme suyu kalite standardında tuzluluk hangi ölçümle izlenir?",
      options: [
        "Yalnızca suyun sıcaklık ölçümüyle",
        "Yalnızca suyun renk karşılaştırmasıyla",
        "Elektriksel iletkenlik ölçümüyle",
        "Yalnızca suyun bulanıklık ölçümüyle",
      ],
      correctAnswer: 2,
      explanation:
        "Çözünmüş tuz iyonları suyun iletkenliğini artırır; salinometre bu iletkenliği ölçer ve sınır aşılınca üretilen suyu içme tankı yerine teknik su tankına yönlendirir.",
      category: "Yardımcı Makineler",
    },
    {
      id: 178,
      question: "Gemide içme suyu için hangi mikrobiyolojik ölçüt aranır?",
      options: [
        "Yalnızca suyun tuzluluk değeri sınırı",
        "Yalnızca suyun sıcaklık değeri sınırı",
        "Yalnızca suyun sertlik değeri sınırı",
        "E. coli ve koliform bulunmaması",
      ],
      correctAnswer: 3,
      explanation:
        "İçme suyunda E. coli ve toplam koliform bulunmamalıdır; düzenli numune alınıp analiz edilir ve sonuçlar su kalitesi kayıt defterinde saklanır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 179,
      question: "Evaporatörden gelen su neden doğrudan içilemez?",
      options: [
        "Mineral içermez ve dezenfekte değildir",
        "Yalnızca sıcaklığı çok yüksek olduğu için",
        "Yalnızca rengi bulanık göründüğü için",
        "Yalnızca basıncı çok düşük olduğu için",
      ],
      correctAnswer: 0,
      explanation:
        "Damıtık su neredeyse tümüyle mineralsizdir ve tat ile sağlık açısından uygun değildir; ayrıca hat ve tanklardan bulaşma riskine karşı mutlaka dezenfekte edilir.",
      category: "Yardımcı Makineler",
    },
    {
      id: 180,
      question: "Damıtık suya mineral dozajı yapılmasının amacı nedir?",
      options: [
        "Yalnızca suyun rengini düzeltmektir",
        "Tat ve sağlık açısından uygun kılmak",
        "Yalnızca tank basıncını yükseltmektir",
        "Yalnızca su üretimini hızlandırmaktır",
      ],
      correctAnswer: 1,
      explanation:
        "Mineral dozaj ünitesi kalsiyum ve magnezyum ekleyerek suyu içilebilir kılar; ayrıca mineralsiz suyun boru ve tanklarda yaptığı aşındırıcı etkiyi azaltır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 181,
      question: "İçme suyu dezenfeksiyonunda en yaygın yöntem hangisidir?",
      options: [
        "Yalnızca suyun tankta bekletilmesi",
        "Yalnızca suyun soğutulup saklanması",
        "Klorlama veya ultraviyole ışınlama",
        "Yalnızca suyun filtreden geçirilmesi",
      ],
      correctAnswer: 2,
      explanation:
        "Klor kalıcı bakiye bıraktığı için tanklarda ve hatlarda koruma sağlar; ultraviyole ise anlık dezenfeksiyon verir ama kalıntı bırakmaz, bu yüzden ikisi birlikte kullanılır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 182,
      question: "İçme suyu hattında bakiye klor ölçümü neden yapılır?",
      options: [
        "Yalnızca suyun tadını ölçebilmek için",
        "Yalnızca su sıcaklığını izlemek için",
        "Yalnızca su basıncını izleyebilmek için",
        "Korumanın sürdüğünü doğrulamak için",
      ],
      correctAnswer: 3,
      explanation:
        "Musluktaki bakiye klor değeri, dezenfektanın hat boyunca tüketilmediğini ve korumanın devam ettiğini gösterir; tipik hedef 0,2 mg/L dolayındadır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 183,
      question: "Vakumlu evaporatörün üretim kapasitesi neye bağlıdır?",
      options: [
        "Ceket suyu sıcaklığı ile vakum düzeyine",
        "Yalnızca deniz suyu tuzluluk değerine",
        "Yalnızca gemi seyir hızı değerine",
        "Yalnızca tank kaplama malzemesine",
      ],
      correctAnswer: 0,
      explanation:
        "Isı kaynağı olan ceket suyunun sıcaklığı ve içerideki vakum, kaynama sıcaklığını ve ısı geçişini belirler; makine düşük yükte çalışırsa üretim düşer.",
      category: "Yardımcı Makineler",
    },
    {
      id: 184,
      question: "Evaporatör verimini düşüren en yaygın neden nedir?",
      options: [
        "Yalnızca deniz suyunun soğuk olması",
        "Isıtıcı yüzeyinde kireç birikmesi",
        "Yalnızca su tankının dolu olması",
        "Yalnızca vakum pompasının kapalı olması",
      ],
      correctAnswer: 1,
      explanation:
        "Isıtıcı plakalarında biriken kireç ısı geçişini düşürür; üretim azalır ve tuzluluk yükselir. Çözüm periyodik asitle temizlik ve doğru besleme debisi ayarıdır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 185,
      question: "Evaporatör hangi durumda çalıştırılmaz?",
      options: [
        "Yalnızca açık denizde seyrederken",
        "Yalnızca ana makine tam yükteyken",
        "Liman ve kıyıya yakın sularda",
        "Yalnızca gece vardiyası boyunca",
      ],
      correctAnswer: 2,
      explanation:
        "Liman ve kıyı sularında deniz suyu kirlilik ile atık su bulaşması taşır; bu yüzden evaporatör kapatılır ve kıyıdan belirli bir uzaklıkta yeniden devreye alınır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 186,
      question: "Santrifüj separatörde ayırmayı sağlayan temel etken nedir?",
      options: [
        "Yalnızca sıvının yüzey gerilimi farkı",
        "Yalnızca sıvının viskozite farkı",
        "Yalnızca sıvının renk farkı değeri",
        "Merkezkaç kuvveti ve yoğunluk farkı",
      ],
      correctAnswer: 3,
      explanation:
        "Yüksek devirde dönen bowl, yerçekiminin binlerce katı bir alan yaratır; yoğun faz olan su ve tortu dışa, hafif faz olan yağ içe doğru ayrışır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 187,
      question: "Separatörde disk takımının işlevi nedir?",
      options: [
        "Ayırma yüzeyini büyütüp yolu kısaltmak",
        "Yalnızca bowl ağırlığını artırmaktır",
        "Yalnızca devir sayısını düşürmektir",
        "Yalnızca yağı ısıtmayı sağlamaktır",
      ],
      correctAnswer: 0,
      explanation:
        "Konik diskler sıvıyı ince tabakalara böler; her tabakada parçacığın kat etmesi gereken mesafe kısalır, böylece aynı hacimde ayırma verimi büyük ölçüde artar.",
      category: "Yardımcı Makineler",
    },
    {
      id: 188,
      question: "Purifier ile clarifier arasındaki temel fark nedir?",
      options: [
        "Clarifier daha yüksek devirde döner",
        "Purifier su ve tortuyu birlikte ayırır",
        "Clarifier yalnızca yakıtta kullanılır",
        "Purifier hiç tortu tutmamaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "Purifier üç fazlı çalışır ve su ile tortuyu ayrı çıkışlardan atar; clarifier ise su çıkışı kapalı iki fazlı düzendir ve yalnızca katı parçacıkları tutar.",
      category: "Yardımcı Makineler",
    },
    {
      id: 189,
      question: "Clarifier düzeni hangi durumda tercih edilir?",
      options: [
        "Yalnızca su oranı çok yüksekken",
        "Yalnızca yakıt çok soğukken",
        "Su oranı çok düşük olduğunda",
        "Yalnızca bowl kirlendiğinde",
      ],
      correctAnswer: 2,
      explanation:
        "Su neredeyse yoksa üç fazlı çalışmaya gerek kalmaz; clarifier düzeninde ayrım yüzeyi bowl kenarına itilir ve yalnızca katı parçacık tutulur.",
      category: "Yardımcı Makineler",
    },
    {
      id: 190,
      question: "Modern separatörlerde purifier-clarifier geçişi nasıl yapılır?",
      options: [
        "Yalnızca bowl tümüyle değiştirilerek",
        "Yalnızca devir sayısı yükseltilerek",
        "Yalnızca ısıtıcı kapatılarak yapılır",
        "Gravity disc veya yazılım ayarıyla",
      ],
      correctAnswer: 3,
      explanation:
        "Klasik tiplerde uygun gravity disc takılır; sensörlü modern tiplerde ise su algılama ve otomatik kontrol yazılımı ayrım yüzeyini kendisi ayarlar.",
      category: "Yardımcı Makineler",
    },
    {
      id: 191,
      question: "Gravity disc seçimi hangi büyüklüğe göre yapılır?",
      options: [
        "Yakıtın çalışma sıcaklığındaki yoğunluğu",
        "Yalnızca yakıtın kükürt oranı değeri",
        "Yalnızca yakıtın parlama noktası değeri",
        "Yalnızca separatörün üretim yılı bilgisi",
      ],
      correctAnswer: 0,
      explanation:
        "Disk iç çapı, yakıt-su ayrım yüzeyinin bowl içindeki konumunu belirler; doğru seçim üretici tablosundan yakıtın işletme sıcaklığındaki yoğunluğuna göre okunur.",
      category: "Yardımcı Makineler",
    },
    {
      id: 192,
      question: "Çok küçük çaplı gravity disc takılırsa ne olur?",
      options: [
        "Yalnızca separatör devri düşer",
        "Ayrım yüzeyi içeri kayar, su kaçar",
        "Yalnızca ısıtıcı sıcaklığı yükselir",
        "Yalnızca desludge sayısı azalır",
      ],
      correctAnswer: 1,
      explanation:
        "Küçük disk ayrım yüzeyini merkeze doğru çeker ve su yağ çıkışına taşar. Çok büyük disk ise yüzeyi dışa iter, yağ su çıkışından kaçarak kayba yol açar.",
      category: "Yardımcı Makineler",
    },
    {
      id: 193,
      question: "Separatörden temiz taraftan su geldiği fark edilirse ne yapılır?",
      options: [
        "Yalnızca besleme debisi artırılır",
        "Yalnızca ısıtıcı kapatılıp beklenir",
        "Disk çapı ve sıcaklık gözden geçirilir",
        "Yalnızca bowl daha hızlı döndürülür",
      ],
      correctAnswer: 2,
      explanation:
        "Su kaçağı çoğunlukla yanlış gravity disc, düşük ısıtma sıcaklığı veya aşırı besleme debisinden doğar; üçü de üretici tablosuna göre yeniden ayarlanır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 194,
      question: "Otomatik desludge işlemi neyi yapar?",
      options: [
        "Yalnızca bowl devrini yükseltmektedir",
        "Yalnızca ısıtıcıyı devreden çıkarmakta",
        "Yalnızca besleme pompasını durdurur",
        "Bowl'u açıp biriken çamuru dışarı atar",
      ],
      correctAnswer: 3,
      explanation:
        "Belirlenen aralıkta işletme suyu bowl tabanındaki sürgüyü indirir; merkezkaç kuvvetiyle çamur boşaltma portlarından çamur tankına atılır ve bowl yeniden kapanır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 195,
      question: "Desludge aralığı hangi ölçüte göre belirlenir?",
      options: [
        "Yakıtın kirlilik düzeyi ve deneyime göre",
        "Yalnızca gemi seyir hızına göre belirlenir",
        "Yalnızca vardiya saatine göre belirlenir",
        "Yalnızca deniz suyu sıcaklığına göre",
      ],
      correctAnswer: 0,
      explanation:
        "Kirli yakıtta aralık kısaltılır; çok sık boşaltma ise yağ kaybı ve işletme suyu tüketimi yaratır. Çamur tankının artış hızı doğru aralığın en iyi göstergesidir.",
      category: "Yardımcı Makineler",
    },
    {
      id: 196,
      question: "Desludge sırasında besleme neden kesilir?",
      options: [
        "Yalnızca elektrik tüketimini azaltmak için",
        "Arıtılmamış yakıtın kaçmasını önlemek için",
        "Yalnızca bowl devrini artırabilmek için",
        "Yalnızca ısıtıcıyı korumak amacıyla",
      ],
      correctAnswer: 1,
      explanation:
        "Bowl açıkken ayırma yapılamaz; besleme sürerse arıtılmamış yakıt doğrudan temiz tarafa veya çamur tankına geçer. Bu yüzden besleme valfi işlem boyunca kapatılır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 197,
      question: "Ağır yakıt arıtmada separatöre kaç derecede verilir?",
      options: [
        "Yaklaşık 40 °C dolayında verilir",
        "Yaklaşık 60 °C dolayında verilir",
        "Yaklaşık 98 °C dolayında verilir",
        "Yaklaşık 130 °C dolayında verilir",
      ],
      correctAnswer: 2,
      explanation:
        "Ağır yakıt 98 °C dolayına ısıtılır; bu sıcaklık viskoziteyi düşürüp yoğunluk farkını büyütür. 100 °C aşılırsa su buharlaşır ve ayrım yüzeyi bozulur.",
      category: "Yardımcı Makineler",
    },
    {
      id: 198,
      question: "İki separatör seri bağlandığında arıtma sırası nasıl olur?",
      options: [
        "Önce clarifier, sonra purifier gelir",
        "İkisi de aynı anda purifier çalışır",
        "İkisi de aynı anda clarifier çalışır",
        "Önce purifier, sonra clarifier gelir",
      ],
      correctAnswer: 3,
      explanation:
        "Purifier önce suyun büyük bölümünü ve kaba tortuyu alır; ardından clarifier kalan ince katı parçacıkları tutar. Ters sıralama clarifier'ı gereksiz yere su ile yükler.",
      category: "Yardımcı Makineler",
    },
    {
      id: 199,
      question: "Separatör besleme debisinin düşürülmesi ayırmayı nasıl etkiler?",
      options: [
        "Bekleme süresi uzar, ayırma iyileşir",
        "Ayırma verimi kendiliğinden düşer",
        "Bowl devri kendiliğinden yükselir",
        "Yakıt sıcaklığı kendiliğinden düşer",
      ],
      correctAnswer: 0,
      explanation:
        "Debi azalınca yakıtın bowl içinde kalma süresi uzar ve parçacıkların ayrışmasına daha çok zaman kalır; bu yüzden kirli yakıtta separatör nominalin altında çalıştırılır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 200,
      question: "Yağlama yağı arıtan separatör hangi sıcaklıkta çalıştırılır?",
      options: [
        "Yaklaşık 40 °C dolayında çalıştırılır",
        "Yaklaşık 90 °C dolayında çalıştırılır",
        "Yaklaşık 20 °C dolayında çalıştırılır",
        "Yaklaşık 150 °C dolayında çalıştırılır",
      ],
      correctAnswer: 1,
      explanation:
        "Yağlama yağı 90-95 °C dolayına ısıtılır; bu sıcaklıkta viskozite düşer ve su ile yağ arasındaki yoğunluk farkı ayırma için yeterli hâle gelir.",
      category: "Yardımcı Makineler",
    },
    {
      id: 201,
      question: "Karter yağında su bulunması hangi belirtiyi verir?",
      options: [
        "Yalnızca yağ basıncının yükselmesi",
        "Yalnızca yağ renginin koyulaşması",
        "Yağın süt beyazı görünüm alması",
        "Yalnızca yağ tüketiminin azalması",
      ],
      correctAnswer: 2,
      explanation:
        "Emülsiyon hâline gelen su yağı süt rengine çevirir; kaynağı çoğunlukla soğutucu kaçağı veya gömlek contasıdır. Su, katkı maddelerini bozup yatak korozyonu yaratır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 202,
      question: "Yağ separatöründe sürekli çalışma neden tercih edilir?",
      options: [
        "Yalnızca elektrik tüketimini düşürmek için",
        "Yalnızca çamur tankını doldurmak için",
        "Yalnızca yağ sıcaklığını yükseltmek için",
        "Yağın sürekli temiz tutulabilmesi için",
      ],
      correctAnswer: 3,
      explanation:
        "Karter yağı devrede sürekli kirlenir; separatör by-pass hattında aralıksız çalışarak su, kurum ve aşınma ürünlerini alır ve yağın ömrünü uzatır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 203,
      question: "Sıkıştırmanın birden çok kademeye bölünmesinin nedeni nedir?",
      options: [
        "Harcanan işi ve çıkış sıcaklığını düşürmek",
        "Yalnızca kompresör ağırlığını artırmak",
        "Yalnızca yağ tüketimini yükseltmektir",
        "Yalnızca gürültü düzeyini artırmaktır",
      ],
      correctAnswer: 0,
      explanation:
        "Tek kademede 30 bara çıkmak çok yüksek sıcaklık üretir; sıkıştırma bölünüp aralarda soğutulunca hem çevrim izotermale yaklaşır hem malzeme sıcaklık sınırında kalır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 204,
      question: "Kademeler arasındaki basınç oranı nasıl seçilir?",
      options: [
        "Yalnızca ilk kademeye yığılacak biçimde",
        "Kademelere yaklaşık eşit dağıtılarak",
        "Yalnızca son kademeye yığılacak biçimde",
        "Yalnızca rastgele bir dağılım ile",
      ],
      correctAnswer: 1,
      explanation:
        "Toplam basınç oranının kademe sayısına göre eşit paylaştırılması harcanan toplam işi en aza indirir; her kademenin çıkış sıcaklığı da böylece birbirine yakın kalır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 205,
      question: "Kompresörde hacimsel verimi düşüren temel etken nedir?",
      options: [
        "Yalnızca soğutma suyu debisinin artması",
        "Yalnızca yağ seviyesinin yükselmesi",
        "Ölü hacimdeki havanın yeniden genleşmesi",
        "Yalnızca emiş filtresinin yenilenmesi",
      ],
      correctAnswer: 2,
      explanation:
        "Piston üst ölü noktada bir miktar basınçlı havayı silindirde bırakır; bu hava emiş strokunda genleşerek yeni havanın girişini geciktirir ve emilen hacmi küçültür.",
      category: "Yardımcı Makineler",
    },
    {
      id: 206,
      question: "Ara soğutucuda yoğuşan su nereye gider?",
      options: [
        "Doğrudan hava tüpüne gönderilir",
        "Yalnızca kompresör karterine döner",
        "Yalnızca emiş filtresine geri gider",
        "Drenaj kabında toplanıp atılır",
      ],
      correctAnswer: 3,
      explanation:
        "Soğuyan havadan ayrılan su ara soğutucu altındaki dren kabına düşer ve otomatik ya da elle boşaltılır; suyun ikinci kademeye taşınması valf hasarı yaratır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 207,
      question: "Son soğutucunun (aftercooler) işlevi nedir?",
      options: [
        "Çıkış havasını soğutup nemi ayırmak",
        "Yalnızca hava basıncını yükseltmek",
        "Yalnızca kompresör devrini artırmak",
        "Yalnızca yağ sıcaklığını yükseltmek",
      ],
      correctAnswer: 0,
      explanation:
        "Son kademeden çıkan sıcak hava tüpe girmeden soğutulur; içindeki nemin büyük bölümü burada yoğuşup ayrılır, böylece tüpte ve hatta korozyon azalır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 208,
      question: "Ara soğutucu kirlendiğinde hangi belirti görülür?",
      options: [
        "Yalnızca yağ basıncının yükselmesi",
        "İkinci kademe çıkış sıcaklığının artması",
        "Yalnızca emniyet valfinin donması",
        "Yalnızca hava debisinin iki katına çıkması",
      ],
      correctAnswer: 1,
      explanation:
        "Isı geçişi düşünce ikinci kademeye daha sıcak hava girer ve çıkış sıcaklığı yükselir; ayrıca kademeler arası basınç değişir, bu iki gösterge birlikte izlenir.",
      category: "Yardımcı Makineler",
    },
    {
      id: 209,
      question: "Kompresörde otomatik boşaltma (auto-drain) yol vermede neden açıktır?",
      options: [
        "Yalnızca elektrik tüketimini azaltmak için",
        "Yalnızca hava debisini artırabilmek için",
        "Yükü hafifletip yol vermeyi kolaylaştırmak",
        "Yalnızca yağ basıncını yükseltmek için",
      ],
      correctAnswer: 2,
      explanation:
        "Drenaj valfleri açık yol verildiğinde kompresör yüksüz döner; motor akımı düşer ve kalkış kolaylaşır. Devir kararlı hâle gelince valfler kapanır ve sıkıştırma başlar.",
      category: "Yardımcı Makineler",
    },
    {
      id: 210,
      question: "Otomatik boşaltma valfi tıkanırsa ne olur?",
      options: [
        "Yalnızca hava basıncı yükselir",
        "Yalnızca kompresör devri düşer",
        "Yalnızca yağ tüketimi azalır",
        "Su birikip valf ve tüpe taşır",
      ],
      correctAnswer: 3,
      explanation:
        "Boşaltılamayan su soğutucuda ve haznede birikir, hava akışıyla sürüklenip valflere ve hava tüpüne gider; sonuç valf hasarı, korozyon ve kumanda arızasıdır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 211,
      question: "Kompresör emme ve basma valfleri neden düzenli muayene edilir?",
      options: [
        "Sızdıran valf verimi ve emniyeti düşürür",
        "Yalnızca valf boyası yenilenmesi için",
        "Yalnızca valf ağırlığı ölçülmesi için",
        "Yalnızca valf numarası okunması için",
      ],
      correctAnswer: 0,
      explanation:
        "Sızdıran valf havayı geri kaçırır; kademe sıcaklığı yükselir, debi düşer ve yağ buharı tutuşma riski artar. Plaka, yay ve oturma yüzeyi belirli saatlerde incelenir.",
      category: "Yardımcı Makineler",
    },
    {
      id: 212,
      question: "Kompresör valfinin arızalandığı hangi belirtiden anlaşılır?",
      options: [
        "Yalnızca yağ renginin açılmasından",
        "Kademe sıcaklığı ve basıncındaki sapma",
        "Yalnızca gövde boyasının kabarmasından",
        "Yalnızca soğutma suyunun renginden",
      ],
      correctAnswer: 1,
      explanation:
        "Her kademenin çıkış basıncı ve sıcaklığı normal değerlerle karşılaştırılır; birinci kademede yüksek, ikincide düşük basınç genellikle ikinci kademe emme valfi kaçağını gösterir.",
      category: "Yardımcı Makineler",
    },
    {
      id: 213,
      question: "Kompresör bakımında karter yağı ne sıklıkla kontrol edilir?",
      options: [
        "Yalnızca yıllık bakımda kontrol edilir",
        "Yalnızca havuzlamada kontrol edilir",
        "Düzenli vardiya turlarında kontrol edilir",
        "Yalnızca kompresör arızalanınca bakılır",
      ],
      correctAnswer: 2,
      explanation:
        "Seviye ve durum her vardiya turunda görülür; renk değişimi, su varlığı ve kokusu incelenir. Yağ, üreticinin belirlediği çalışma saatinde veya analiz sonucuna göre değiştirilir.",
      category: "Yardımcı Makineler",
    },
    {
      id: 214,
      question: "Hava şişesinde (hava tüpü) hangi emniyet donanımı zorunludur?",
      options: [
        "Yalnızca seviye göstergesi bulunmalıdır",
        "Yalnızca sıcaklık göstergesi bulunmalıdır",
        "Yalnızca akış ölçer bulunmalıdır",
        "Emniyet valfi ve drenaj vanası bulunur",
      ],
      correctAnswer: 3,
      explanation:
        "Her hava tüpünde emniyet valfi veya eriyen tapa, dip drenaj vanası, basınç göstergesi ve izole edilebilir doldurma ile çekiş valfleri bulunur.",
      category: "Yardımcı Makineler",
    },
    {
      id: 215,
      question: "Hava şişesinin iç muayenesi hangi aralıkta yapılır?",
      options: [
        "Klas kuralının verdiği periyotta yapılır",
        "Yalnızca gemi satıldığında yapılır",
        "Yalnızca kompresör değişince yapılır",
        "Yalnızca gemi inşasında bir kez yapılır",
      ],
      correctAnswer: 0,
      explanation:
        "Basınçlı kaplar klas sörvey takvimine bağlıdır; içi açılıp korozyon ve çatlak yönünden incelenir, gerekirse kalınlık ölçümü ve hidrostatik test uygulanır.",
      category: "Yardımcı Makineler",
    },
    {
      id: 216,
      question: "Hava şişesinin dibinden düzenli drenaj alınmasının nedeni nedir?",
      options: [
        "Yalnızca tüp basıncını düşürebilmek için",
        "Biriken su ve yağın korozyon yapması",
        "Yalnızca tüp ağırlığını azaltmak için",
        "Yalnızca hava debisini artırmak için",
      ],
      correctAnswer: 1,
      explanation:
        "Sıkıştırılan havadan ayrılan su ve yağ tüpün dibinde birikir; korozyon yaratır ve yağ buharı yol verme hattında tutuşma riski doğurur. Drenaj her vardiyada alınır.",
      category: "Yardımcı Makineler",
    },
  ],
};
