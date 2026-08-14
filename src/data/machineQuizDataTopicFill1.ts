import type { QuizQuestion } from "@/types/quiz";

/**
 * Konu doldurma bankası 1 — makine konu bankalarında konu başına en az 8 soru
 * hedefini tutturmak için yazılan ek sorular.
 *
 * `exerciseQuestionDistribution.ts` soruları konu başlıklarıyla sözcük örtüşmesine
 * göre eşlediğinden her soru hedeflediği konunun kendi terminolojisini kullanır;
 * aksi hâlde benzerlik puanı soruyu komşu konuya taşır.
 *
 * Numaralandırma taban + devam + vaka bankalarının ardından sürer (155'ten
 * başlar); `machineQuizDataIndex.ts` bankaları slug bazında bu sırayla birleştirir.
 */
export const machineQuizQuestionsTopicFill1: Record<string, QuizQuestion[]> = {
  "cooling-hvac": [
    {
      id: 155,
      question: "Buhar sıkıştırmalı soğutma çevriminde bileşenler hangi sırayla dizilir?",
      options: [
        "Kompresör → kondenser → genleşme → evaporatör",
        "Kondenser → kompresör → evaporatör → genleşme",
        "Evaporatör → genleşme → kondenser → kompresör",
        "Genleşme → evaporatör → kompresör → kondenser",
      ],
      correctAnswer: 0,
      explanation:
        "Çevrim kompresörde sıkıştırma, kondenserde yoğuşma, genleşme valfinde basınç düşürme ve evaporatörde buharlaşma adımlarını bu sırayla izler.",
      category: "Soğutma ve Klima",
    },
    {
      id: 156,
      question: "Vidalı kompresörün pistonlu tipe göre başlıca üstünlüğü nedir?",
      options: [
        "Yalnızca düşük basınçta çalışabilmesi",
        "Daha az titreşim ve sürekli kapasite",
        "Hiç yağlama yağı gerektirmeyen yapısı",
        "Bakım gerektirmeyen tümüyle kapalı yapı",
      ],
      correctAnswer: 1,
      explanation:
        "Vidalı kompresör dönel çalıştığı için titreşimi düşüktür ve sürgü valfle %10-100 arasında sürekli kapasite kontrolü sağlar; pistonlu tip kademeli yükleme yapar.",
      category: "Soğutma ve Klima",
    },
    {
      id: 157,
      question: "Kondenser ile evaporatör arasındaki temel işlev farkı nedir?",
      options: [
        "İkisi de ortamdan ısı çekip soğutur",
        "Kondenser ısı çeker, evaporatör atar",
        "Kondenser ısı atar, evaporatör çeker",
        "İkisi de yalnızca basınç düşürmekte",
      ],
      correctAnswer: 2,
      explanation:
        "Kondenser yüksek basınçlı kızgın buharı deniz suyuna ısı atarak yoğuşturur; evaporatör düşük basınçta buharlaşırken soğutulan ortamdan ısı çeker.",
      category: "Soğutma ve Klima",
    },
    {
      id: 158,
      question:
        "Termostatik genleşme valfi (TXV) açıklığını hangi büyüklüğe göre ayarlar?",
      options: [
        "Kondenser yoğuşma basıncı değerine",
        "Kompresör devir sayısı değerine",
        "Deniz suyu giriş sıcaklığına göre",
        "Evaporatör çıkışındaki kızgınlığa",
      ],
      correctAnswer: 3,
      explanation:
        "TXV, evaporatör çıkışındaki kızgınlık derecesini (tipik 5-8 K) sabit tutacak biçimde açıklığını değiştirir; böylece evaporatör tam kullanılır ve kompresöre sıvı gitmez.",
      category: "Soğutma ve Klima",
    },
    {
      id: 159,
      question: "Mollier (P-h) diyagramında kompresör süreci nasıl görünür?",
      options: [
        "Yukarı doğru, entropi artışıyla ilerler",
        "Yatay doğrultuda, sabit basınçta ilerler",
        "Düşey doğrultuda, izoentalpik ilerler",
        "Aşağı doğru, basınç düşüşüyle ilerler",
      ],
      correctAnswer: 0,
      explanation:
        "Sıkıştırma basıncı yükselttiği için süreç P-h diyagramında yukarı doğrudur; gerçek kompresörde tersinmezlik nedeniyle entropi de artar.",
      category: "Soğutma ve Klima",
    },
    {
      id: 160,
      question: "Soğutma çevriminde COP hangi orandan hesaplanır?",
      options: [
        "Kompresör işi / soğutma etkisi oranı",
        "Soğutma etkisi / kompresör işi oranı",
        "Kondenser ısısı / evaporatör ısısı",
        "Soğutma etkisi ile işin çarpımı",
      ],
      correctAnswer: 1,
      explanation:
        "COP = soğutma etkisi / kompresör işi = (h₁ − h₄) / (h₂ − h₁). Cihaz ısıyı üretmeyip düşük sıcaklıktan yükseğe taşıdığı için değer 1'in üzerinde çıkar.",
      category: "Soğutma ve Klima",
    },
    {
      id: 161,
      question: "HFC soğutucu gazların CFC ve HCFC'lerden ayrılan özelliği nedir?",
      options: [
        "ODP değerleri CFC'lerden yüksektir",
        "Montreal Protokolü ile yasaklanmıştır",
        "ODP sıfırdır ama GWP yüksek kalır",
        "Klor içerdikleri için ozona zarar verir",
      ],
      correctAnswer: 2,
      explanation:
        "HFC'lerde klor bulunmadığı için ODP sıfırdır; ancak yüksek GWP değerleri nedeniyle Kigali Değişikliği ile kademeli azaltıma alınmışlardır.",
      category: "Soğutma ve Klima",
    },
    {
      id: 162,
      question:
        "Amonyak (R-717) soğutucu akışkanın gemide dikkat gerektiren yönü nedir?",
      options: [
        "ODP ve GWP değerlerinin çok yüksekliği",
        "Soğutma performansının çok düşük olması",
        "Yalnızca çok yüksek basınçta çalışması",
        "Toksik ve yanıcı olması nedeniyle ayrı mahal",
      ],
      correctAnswer: 3,
      explanation:
        "Amonyağın ODP'si sıfır, GWP'si ihmal edilebilir ve COP'si yüksektir; ancak toksik ve yanıcı olduğundan makine dairesi dışında ayrı, havalandırmalı mahalde konumlandırılır.",
      category: "Soğutma ve Klima",
    },
    {
      id: 163,
      question: "ODP ve GWP değerleri hangi referanslara göre verilir?",
      options: [
        "ODP için R-11, GWP için CO₂ referans",
        "ODP için CO₂, GWP için R-11 referans",
        "Her ikisi de amonyağa göre verilir",
        "Her ikisi de havaya göre verilmekte",
      ],
      correctAnswer: 0,
      explanation:
        "ODP ozon incelticiliği R-11'e (ODP = 1,0) göre, GWP küresel ısınma etkisi CO₂'ye (GWP = 1) göre ölçeklenir.",
      category: "Soğutma ve Klima",
    },
    {
      id: 164,
      question: "Kigali Değişikliği Montreal Protokolü'ne neyi eklemiştir?",
      options: [
        "CFC gazlarının yeniden serbest bırakılmasını",
        "HFC gazlarının kademeli azaltılmasını",
        "Yakıt kükürt sınırının düşürülmesini",
        "Balast suyu arıtma zorunluluğunu",
      ],
      correctAnswer: 1,
      explanation:
        "Montreal Protokolü ozon incelten CFC/HCFC'leri kaldırmıştı; 2016 Kigali Değişikliği ozona zararsız ama yüksek GWP'li HFC'lerin üretim ve tüketimini de kademeli azaltıma bağladı.",
      category: "Soğutma ve Klima",
    },
    {
      id: 165,
      question: "Sistemden boşaltılan soğutucu akışkana ne yapılır?",
      options: [
        "Atmosfere serbestçe salınabilmektedir",
        "Yalnızca açık denizde salınabilmekte",
        "Onaylı geri kazanım ünitesiyle toplanır",
        "Yakıta karıştırılıp gemide yakılmakta",
      ],
      correctAnswer: 2,
      explanation:
        "Soğutucu akışkanın atmosfere salınması yasaktır; onaylı geri kazanım (recovery) ünitesiyle toplanır, miktarı ve işlem kayda geçirilir.",
      category: "Soğutma ve Klima",
    },
    {
      id: 166,
      question:
        "Provizyon soğuk hanede et ve sebze odaları neden farklı sıcaklıklarda tutulur?",
      options: [
        "Kompresör yükünü eşitlemek amacıyla",
        "Soğutucu akışkan tasarrufu sağlamak için",
        "Yalnızca elektrik tüketimini azaltmak için",
        "Her ürünün bozulma sıcaklığı farklı olduğu",
      ],
      correctAnswer: 3,
      explanation:
        "Et odası tipik −18 °C'de dondurulmuş, sebze odası +2 ila +4 °C'de tutulur; her ürünün bozulmadan saklanabildiği aralık farklı olduğundan odalar ayrı termostatik valflerle ayarlanır.",
      category: "Soğutma ve Klima",
    },
    {
      id: 167,
      question: "Reefer konteyner sayısı gemi için neden kritik bir kısıttır?",
      options: [
        "Jeneratör kapasitesini doğrudan belirler",
        "Ambar hacmini doğrudan küçültmektedir",
        "Geminin servis hızını düşürmektedir",
        "Yalnızca istif planını zorlaştırmakta",
      ],
      correctAnswer: 0,
      explanation:
        "Her reefer kendi soğutma ünitesini gemi prizinden besler; toplam çekilen güç jeneratör kapasitesini aşamayacağından yük planı ve devrede tutulan jeneratör sayısı buna göre kurulur.",
      category: "Soğutma ve Klima",
    },
    {
      id: 168,
      question:
        "Merkezi soğutma sisteminin deniz suyu ile doğrudan soğutmaya göre üstünlüğü nedir?",
      options: [
        "Deniz suyu pompasını tümüyle kaldırması",
        "Deniz suyuyla temas eden ekipmanın azalması",
        "Hiç ısı eşanjörü gerektirmeyen basit yapı",
        "Tatlı su üretimini gereksiz kılan tasarım",
      ],
      correctAnswer: 1,
      explanation:
        "Merkezi sistemde deniz suyu yalnızca merkezi soğutucuya girer; tüketiciler kapalı tatlı su devresiyle soğutulduğu için korozyon ve fouling riski taşıyan ekipman sayısı azalır.",
      category: "Soğutma ve Klima",
    },
    {
      id: 169,
      question: "Ana makine HT ve LT soğutma devreleri hangi tüketicileri soğutur?",
      options: [
        "Her ikisi de yalnızca yağ soğutucuyu",
        "Her ikisi de yalnızca şaft yataklarını",
        "HT gömlek ve kapağı, LT yağ ve şarj havası",
        "HT yalnızca yakıtı, LT yalnızca aküyü",
      ],
      correctAnswer: 2,
      explanation:
        "Yüksek sıcaklık (HT) devresi silindir gömleği ve kapağını 75-90 °C bandında soğutur; düşük sıcaklık (LT) devresi yağlama yağı soğutucusu, şarj havası soğutucusu ve yardımcıları alır.",
      category: "Soğutma ve Klima",
    },
    {
      id: 170,
      question:
        "Soğutma kompresöründe yüksek basma basıncı alarmının olası nedeni nedir?",
      options: [
        "Sistemde yetersiz soğutucu şarjı olması",
        "Deniz suyu sıcaklığının çok düşük olması",
        "Kompresör yağ seviyesinin düşük olması",
        "Kirli kondenser veya fazla şarj olması",
      ],
      correctAnswer: 3,
      explanation:
        "Kondenserdeki fouling ya da yetersiz deniz suyu debisi ısının atılmasını engelleyip basma basıncını yükseltir; aşırı şarj da aynı etkiyi yapar. Yetersiz şarj tersine emme basıncını düşürür.",
      category: "Soğutma ve Klima",
    },
    {
      id: 171,
      question: "Gemi klima sisteminde chiller ünitesinin görevi nedir?",
      options: [
        "Soğuk su üretip AHU'lara dağıtmaktır",
        "Ortam havasını doğrudan ısıtmaktır",
        "Kanal içindeki havayı nemlendirmektir",
        "Egzoz havasını dışarı atmaktır",
      ],
      correctAnswer: 0,
      explanation:
        "Chiller kapalı devrede soğuk su üretir; bu su hava işleme ünitelerindeki soğutma serpantinlerine gönderilerek üflenen hava soğutulur.",
      category: "Soğutma ve Klima",
    },
    {
      id: 172,
      question: "Hava işleme ünitesi (AHU) hangi bölümlerden oluşur?",
      options: [
        "Kompresör, kondenser ve genleşme valfi",
        "Filtre, serpantin, fan ve nem kontrolü",
        "Devirdaim pompası, tank ve boru hattı",
        "Yalnızca bir adet üfleme fan ünitesi",
      ],
      correctAnswer: 1,
      explanation:
        "AHU girişte filtre, ardından soğutma/ısıtma serpantini, nem kontrol kademesi ve üfleme fanından oluşur; soğutucu çevrim bileşenleri chiller tarafındadır.",
      category: "Soğutma ve Klima",
    },
    {
      id: 173,
      question: "Buhar ısıtma serpantininde yoğuşan kondens nasıl tahliye edilir?",
      options: [
        "Fan pervanesiyle dışarı üflenmektedir",
        "Hava filtresinde tutulup atılmaktadır",
        "Steam trap (kondens tuzağı) ile atılır",
        "Serpantin içinde birikmeye bırakılır",
      ],
      correctAnswer: 2,
      explanation:
        "Steam trap buharı tutup yalnızca kondensi geçirir; tahliye edilmezse serpantin su ile dolar (water hammer riski) ve ısıtma kapasitesi düşer.",
      category: "Soğutma ve Klima",
    },
    {
      id: 174,
      question: "Klimada soğutmayla nem alma (dehumidification) nasıl gerçekleşir?",
      options: [
        "Havanın basıncı artırılarak sağlanmakta",
        "Kanal içinde hava ısıtılarak sağlanmakta",
        "Kanala su püskürtülerek sağlanmaktadır",
        "Serpantin yüzeyi çiy noktası altına iner",
      ],
      correctAnswer: 3,
      explanation:
        "Serpantin yüzey sıcaklığı havanın çiy noktasının altına düştüğünde nem yoğuşur ve drenaj tavasına akar; ısıtmak bağıl nemi düşürür ama mutlak nemi almaz.",
      category: "Soğutma ve Klima",
    },
    {
      id: 175,
      question: "Klima kanallarında hava hızı neden sınırlandırılır?",
      options: [
        "Gürültü ve basınç kaybını azaltmak için",
        "Kanal malzemesinden tasarruf etmek için",
        "Fan motorunu daha çok yüklemek için",
        "Yalnızca estetik görünüm sağlamak için",
      ],
      correctAnswer: 0,
      explanation:
        "Yüksek hız kanalda hem aerodinamik gürültü hem de sürtünme kaybı üretir; bu yüzden ana kanalda 6-10 m/s, dal kanallarda 3-5 m/s aralığı hedeflenir.",
      category: "Soğutma ve Klima",
    },
    {
      id: 176,
      question:
        "Makine dairesi havalandırma kapaklarının (flap) kapanabilir olması neden zorunludur?",
      options: [
        "Makine dairesini daha hızlı soğutmak için",
        "CO₂ boğma etkisinin sağlanabilmesi için",
        "Kanal gürültüsünü azaltabilmek için",
        "Taze hava debisini artırabilmek için",
      ],
      correctAnswer: 1,
      explanation:
        "Sabit CO₂ sistemi mahaldeki oksijeni seyrelterek söndürür; kapaklar ve fanlar kapatılmazsa gaz kaçar ve boğma konsantrasyonu sağlanamaz.",
      category: "Soğutma ve Klima",
    },
  ],
};
