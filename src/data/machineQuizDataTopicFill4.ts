import type { QuizQuestion } from "@/types/quiz";

/**
 * Konu doldurma bankası 4 — yakıt teknolojisi konu bankasında konu başına en az
 * 8 soru hedefini tutturmak için yazılan ek sorular.
 *
 * `exerciseQuestionDistribution.ts` soruları konu başlıklarıyla sözcük örtüşmesine
 * göre eşlediğinden her soru hedeflediği konunun kendi terminolojisini kullanır;
 * aksi hâlde benzerlik puanı soruyu komşu konuya taşır.
 *
 * Numaralandırma taban + devam + vaka bankalarının ardından sürer (155'ten
 * başlar); `machineQuizDataIndex.ts` bankaları slug bazında bu sırayla birleştirir.
 */
export const machineQuizQuestionsTopicFill4: Record<string, QuizQuestion[]> = {
  "fuel-technology": [
    {
      id: 155,
      question: "HFO'nun ana makinede kullanılmadan önce ısıtılmasının nedeni nedir?",
      options: [
        "Viskoziteyi püskürtme değerine düşürmek",
        "Kükürt oranını kimyasal olarak azaltmak",
        "Yoğunluğu suyunkinin altına indirmek",
        "Parlama noktasını kalıcı yükseltmek",
      ],
      correctAnswer: 0,
      explanation:
        "HFO oda sıcaklığında akmayacak kadar koyudur; enjeksiyon öncesinde ısıtılarak 10-15 cSt aralığına indirilir, aksi hâlde meme atomizasyonu bozulur.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 156,
      question: "VLSFO yakıtların kararlılık (stability) açısından riski nedir?",
      options: [
        "Kükürt oranının seferde yükselmesi",
        "Farklı partilerin karışınca çamurlaşması",
        "Parlama noktasının sıfıra düşmesi",
        "Isıtıldığında katılaşmaya başlaması",
      ],
      correctAnswer: 1,
      explanation:
        "VLSFO harmanları farklı bileşenlerden üretildiği için uyumsuz partiler karıştığında asfalten çökelmesi ve çamurlaşma görülür; bu yüzden farklı bunkerler ayrı tanklarda tutulur.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 157,
      question: "MGO ile MDO arasındaki temel fark nedir?",
      options: [
        "MGO yalnızca kazanlarda kullanılabilir",
        "MDO hiç kükürt içermeyen bir üründür",
        "MDO bir miktar artık yakıt içerir",
        "MGO yalnızca LNG ile harmanlanır",
      ],
      correctAnswer: 2,
      explanation:
        "MGO tümüyle damıtık üründür; MDO ise damıtığa bir miktar artık yakıt karıştırılmış harmandır, bu yüzden viskozitesi ve kalıntı içeriği daha yüksektir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 158,
      question: "MGO kullanımı yakıt sisteminde hangi ek önlemi gerektirir?",
      options: [
        "Yakıtın sürekli ısıtılarak beslenmesini",
        "Separatörün tümüyle devre dışı olmasını",
        "Viskozitenin sürekli yükseltilmesini",
        "Düşük viskozitede yağlamanın korunmasını",
      ],
      correctAnswer: 3,
      explanation:
        "MGO'nun viskozitesi düşük olduğundan yakıt pompası ve enjektör plunger'ları yeterince yağlanamaz; soğutucu ile viskozite üreticinin verdiği alt sınırın üstünde tutulur.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 159,
      question: "ISO 8217 standardı yakıt için neyi tanımlar?",
      options: [
        "Sınıflar ve karşılanması gereken sınır değerler",
        "Yalnızca yakıtın satış fiyatı hesaplama yöntemi",
        "Yalnızca bunker teslim gemisinin tonaj sınırları",
        "Yalnızca liman devletinin denetim sıklığı ölçüsü",
      ],
      correctAnswer: 0,
      explanation:
        "Standart RMG 380 gibi sınıflar tanımlar ve her sınıf için viskozite, yoğunluk, kükürt, su, kül ve katalitik incelik gibi parametrelerin sınır değerlerini verir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 160,
      question: "LNG'nin yakıt olarak kullanılmasının emisyon açısından kazancı nedir?",
      options: [
        "Yalnızca gürültü düzeyini azaltması",
        "SOx'i neredeyse tümüyle ortadan kaldırması",
        "Yalnızca yakıt maliyetini düşürmesi",
        "Balast suyu arıtmasını gereksiz kılması",
      ],
      correctAnswer: 1,
      explanation:
        "LNG kükürt içermediği için SOx salımı yok denecek düzeydedir; NOx ve partikül madde de belirgin azalır, ancak yanmamış metan kaçağı ayrı bir sorundur.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 161,
      question: "LNG yakıt tankları hangi koşulda saklanır?",
      options: [
        "Ortam sıcaklığında ve atmosfer basıncında",
        "Yüksek sıcaklıkta ve düşük basınçta",
        "Yaklaşık -162 °C'de sıvı hâlde",
        "Katı hâlde soğutulmuş bloklar olarak",
      ],
      correctAnswer: 2,
      explanation:
        "Metan atmosfer basıncında -162 °C'de sıvılaşır; hacmi gaz hâline göre yaklaşık 600 kat küçüldüğünden depolama ancak kriyojenik yalıtımlı tanklarla yapılabilir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 162,
      question: "LNG yakıtlı gemilerde methane slip terimi neyi anlatır?",
      options: [
        "Tank yalıtımındaki ısı kaçağı miktarını",
        "Boru hattındaki basınç düşüşü oranını",
        "Yakıt pompasındaki kaçak debisini",
        "Yanmadan egzozdan çıkan metan payını",
      ],
      correctAnswer: 3,
      explanation:
        "Özellikle Otto çevrimli çift yakıtlı motorlarda bir miktar metan yanmadan egzoza geçer; metanın küresel ısınma potansiyeli yüksek olduğundan bu kaçak net kazancı azaltır.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 163,
      question: "Metanolün gemi yakıtı olarak öne çıkan üstünlüğü nedir?",
      options: [
        "Sıvı hâlde ve normal sıcaklıkta taşınması",
        "Enerji yoğunluğunun HFO'dan yüksek olması",
        "Hiçbir emniyet önlemi gerektirmemesi",
        "Mevcut motorlarda değişiklik istememesi",
      ],
      correctAnswer: 0,
      explanation:
        "Metanol atmosfer basıncında ve ortam sıcaklığında sıvıdır; bu yüzden LNG'nin kriyojenik tankları yerine görece basit depolama yeterlidir. Enerji yoğunluğu ise HFO'nun yarısı kadardır.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 164,
      question: "Amonyağın yakıt olarak kullanımında en kritik risk nedir?",
      options: [
        "Yanma sırasında kükürt oksit üretmesi",
        "Zehirli olması ve sızıntıda can riski",
        "Depolama için kriyojenik tank gerekmemesi",
        "Tutuşma sıcaklığının çok düşük olması",
      ],
      correctAnswer: 1,
      explanation:
        "Amonyak karbon içermez ama düşük derişimlerde bile zehirlidir; bu yüzden çift cidarlı borulama, gaz algılama, havalandırma ve su perdesi gibi ek emniyet katmanları zorunludur.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 165,
      question: "Alternatif yakıt kullanan gemilerde IGF Kod neyi düzenler?",
      options: [
        "Yalnızca yakıtın ticari fiyatlandırmasını",
        "Yalnızca mürettebatın izin sürelerini",
        "Parlayıcı yakıtların emniyet gerekliliklerini",
        "Yalnızca liman ücret tarifelerinin yapısını",
      ],
      correctAnswer: 2,
      explanation:
        "IGF Kod, düşük parlama noktalı yakıt kullanan gemilerin tank yerleşimi, çift cidarlı boru, gaz algılama, havalandırma ve personel eğitimi gerekliliklerini belirler.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 166,
      question: "Alternatif yakıt bunkerlemesinde ek olarak ne yapılır?",
      options: [
        "Yalnızca yakıt fiyatının teyit edilmesi",
        "Yalnızca güverte aydınlatmasının açılması",
        "Yalnızca bir kişilik gözcü bulundurulması",
        "Emniyet bölgesi kurulup gaz algılama izlenir",
      ],
      correctAnswer: 3,
      explanation:
        "Bunker manifoldu çevresinde tanımlı bir emniyet bölgesi kurulur, ateş kaynakları yasaklanır, taşınabilir gaz dedektörleri ve acil ayırma bağlantısı hazır tutulur.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 167,
      question: "Yakıtın viskozitesi sıcaklıkla nasıl değişir?",
      options: [
        "Sıcaklık arttıkça viskozite düşer",
        "Sıcaklık arttıkça viskozite artar",
        "Viskozite sıcaklıktan etkilenmez",
        "Viskozite yalnızca basınca bağlıdır",
      ],
      correctAnswer: 0,
      explanation:
        "Viskozite sıcaklıkla üstel biçimde azalır; bu yüzden ısıtıcı çıkışındaki viskozimetre, sıcaklığı sürekli ayarlayarak enjeksiyon viskozitesini sabit tutar.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 168,
      question: "Enjeksiyon öncesi hedeflenen viskozite aralığı hangisidir?",
      options: [
        "Yaklaşık 60-80 cSt aralığı",
        "Yaklaşık 10-15 cSt aralığı",
        "Yaklaşık 180-380 cSt aralığı",
        "Yaklaşık 1-2 cSt aralığı",
      ],
      correctAnswer: 1,
      explanation:
        "Meme çıkışında iyi bir atomizasyon için yakıt genelde 10-15 cSt aralığına getirilir; 380 cSt gibi değerler tank ve besleme sıcaklığındaki değerlerdir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 169,
      question: "Viskozite kontrolörü hangi büyüklüğü değiştirerek çalışır?",
      options: [
        "Yakıt pompasının strok boyunu",
        "Enjektör memesinin delik sayısını",
        "Isıtıcıya giden buhar debisini",
        "Servis tankının seviye ayarını",
      ],
      correctAnswer: 2,
      explanation:
        "Viskozimetre ölçtüğü değeri set değeriyle karşılaştırır ve ısıtıcının buhar veya elektrik girişini ayarlar; böylece yakıt sıcaklığı viskoziteyi hedefte tutacak biçimde değişir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 170,
      question: "Yakıt yoğunluğu bunker miktarı hesabında neden önemlidir?",
      options: [
        "Yalnızca yakıtın rengini belirlediği için",
        "Yalnızca kükürt oranını verdiği için",
        "Yalnızca parlama noktasını verdiği için",
        "Hacmi kütleye çevirmekte kullanıldığı için",
      ],
      correctAnswer: 3,
      explanation:
        "Tanktaki hacim sondajla ölçülür; teslim edilen kütle ancak 15 °C'ye düzeltilmiş yoğunlukla hesaplanır, bu yüzden yoğunluktaki sapma doğrudan miktar uyuşmazlığı yaratır.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 171,
      question: "API gravity değeri yükseldikçe yakıt için ne söylenir?",
      options: [
        "Yoğunluğu düşen daha hafif bir üründür",
        "Yoğunluğu artan daha ağır bir üründür",
        "Kükürt oranı zorunlu olarak yükselir",
        "Parlama noktası zorunlu olarak düşer",
      ],
      correctAnswer: 0,
      explanation:
        "API gravity yoğunlukla ters orantılıdır; yüksek API damıtık ve hafif ürünü, düşük API ise artık ve ağır ürünü gösterir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 172,
      question: "Purifier ayarında yakıt yoğunluğu neden bilinmelidir?",
      options: [
        "Isıtıcı sıcaklığını belirlemek için",
        "Doğru gravity disk seçimi için",
        "Filtre gözenek çapı seçimi için",
        "Tank kaplama tipi seçimi için",
      ],
      correctAnswer: 1,
      explanation:
        "Gravity disk, yakıt-su ayrım yüzeyinin konumunu belirler; yoğunluğa uygun olmayan disk ya suyu yakıta karıştırır ya da yakıtı su tarafına kaçırır.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 173,
      question: "Pour point hangi değeri ifade eder?",
      options: [
        "Yakıtın kendiliğinden tutuştuğu sıcaklık",
        "Yakıtın buhar üretmeye başladığı sıcaklık",
        "Yakıtın akmayı bıraktığı en düşük sıcaklık",
        "Yakıtın suyla karıştığı en düşük sıcaklık",
      ],
      correctAnswer: 2,
      explanation:
        "Pour point, soğutulan yakıt numunesinin artık akmadığı sıcaklıktır; tank ve boru ısıtması bu değerin belirgin üstünde tutulmazsa hat tıkanır.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 174,
      question: "Cloud point pour point'ten hangi yönüyle ayrılır?",
      options: [
        "Daha düşük bir sıcaklıkta gözlenmesi",
        "Yalnızca ağır yakıtlarda ölçülebilmesi",
        "Yalnızca laboratuvarda hesaplanabilmesi",
        "Parafin kristallerinin ilk göründüğü an",
      ],
      correctAnswer: 3,
      explanation:
        "Cloud point, soğuyan yakıtta parafin kristallerinin bulanıklık yapmaya başladığı sıcaklıktır ve pour point'in üstündedir; filtre tıkanması genelde bu noktadan sonra başlar.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 175,
      question: "Soğuk iklimde yakıt hattının tıkanmasını önlemek için ne yapılır?",
      options: [
        "Hat ve tanklar iz ısıtmayla sıcak tutulur",
        "Yakıta doğrudan deniz suyu karıştırılır",
        "Besleme pompası basıncı sıfıra çekilir",
        "Servis tankı havalandırması kapatılır",
      ],
      correctAnswer: 0,
      explanation:
        "Tanklar, emiş hatları ve filtreler buharlı veya elektrikli iz ısıtmayla pour point'in üstünde tutulur; akış kesildiğinde soğuyan hatlar parafinle tıkanır.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 176,
      question: "Gemide kullanılan yakıtlar için asgari parlama noktası kaçtır?",
      options: ["43 °C", "60 °C", "100 °C", "22 °C"],
      correctAnswer: 1,
      explanation:
        "SOLAS, acil jeneratör dışındaki makinelerde kullanılan yakıtlar için parlama noktasını en az 60 °C olarak belirler; bu sınır tank ve hat sıcaklığı planlanırken belirleyicidir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 177,
      question: "Parlama noktası (flash point) hangi olayı tanımlar?",
      options: [
        "Yakıtın sürekli yanmaya başladığı an",
        "Yakıtın akmayı tümüyle kesmesi anı",
        "Buharın alevle bir anlık parladığı an",
        "Yakıtın suyla ayrışmaya başladığı an",
      ],
      correctAnswer: 2,
      explanation:
        "Parlama noktası, yüzeydeki buharın bir ateş kaynağıyla anlık parladığı en düşük sıcaklıktır; yanmanın sürekli hâle geldiği tutuşma noktası ise bundan daha yüksektir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 178,
      question: "Yakıt tankı sıcaklığının parlama noktasına yaklaşması neden tehlikelidir?",
      options: [
        "Yakıtın viskozitesini aşırı yükselttiği için",
        "Yakıtın yoğunluğunu ölçülemez yaptığı için",
        "Yakıtın kükürt oranını yükselttiği için",
        "Tank üstünde yanıcı buhar biriktiği için",
      ],
      correctAnswer: 3,
      explanation:
        "Sıcaklık parlama noktasına yaklaşınca tank üst boşluğunda tutuşabilir buhar-hava karışımı oluşur; bu yüzden ısıtma sıcaklığı parlama noktasının belirli bir pay altında tutulur.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 179,
      question: "CCAI değeri yakıt hakkında neyi öngörür?",
      options: [
        "Tutuşma gecikmesi eğilimini",
        "Su ve tortu oranını doğrudan",
        "Tanktaki hacim değişimini",
        "Kükürt yüzdesini doğrudan",
      ],
      correctAnswer: 0,
      explanation:
        "CCAI, yoğunluk ve viskoziteden hesaplanan bir tutuşma kalitesi göstergesidir; yüksek CCAI tutuşma gecikmesi, sert yanma ve motor vuruntusu riskini işaret eder.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 180,
      question: "CCAI değerinin yüksek çıkması motorda hangi belirtiyi doğurur?",
      options: [
        "Egzoz sıcaklığının kalıcı düşmesi",
        "Sert yanma ve basınç yükselme hızı",
        "Yağ basıncının kendiliğinden artması",
        "Turboşarjer devrinin sabitlenmesi",
      ],
      correctAnswer: 1,
      explanation:
        "Tutuşma gecikmesi uzayınca silindirde biriken yakıt bir anda yanar; basınç yükselme hızı artar, motor sert çalışır ve yatak ile silindir kapağı zorlanır.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 181,
      question: "Katalitik incelikler (cat fines) yakıtta nasıl oluşur?",
      options: [
        "Tankta suyun donmasıyla oluşur",
        "Yakıtın ısıtılmasıyla oluşur",
        "Rafineri kraking sürecinden kalır",
        "Bunker hortumunun aşınmasıyla",
      ],
      correctAnswer: 2,
      explanation:
        "Alüminyum ve silisyum içeren katalizör parçacıkları rafineride katalitik kraking sürecinden artık yakıta karışır; sert ve aşındırıcıdır, ISO 8217 toplam Al+Si sınırını verir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 182,
      question: "Cat fines gemide hangi yolla azaltılır?",
      options: [
        "Yalnızca yakıtın ısıtılmasıyla azalır",
        "Yalnızca katkı maddesi eklenerek azalır",
        "Yalnızca tank havalandırmasıyla azalır",
        "Settling tank drenajı ve separatörle",
      ],
      correctAnswer: 3,
      explanation:
        "Ağır parçacıklar settling tank dibinde toplanır ve düzenli drenajla alınır; kalanı doğru sıcaklık ve düşük debide çalıştırılan separatörle ayrılır, filtre son savunmadır.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 183,
      question: "Settling tankın işlevi nedir?",
      options: [
        "Su ve tortunun çökmesini sağlamak",
        "Yakıtı doğrudan motora beslemek",
        "Yakıtın viskozitesini yükseltmek",
        "Bunker miktarını resmen ölçmek",
      ],
      correctAnswer: 0,
      explanation:
        "Bunkerlenen yakıt settling tankta ısıtılıp bekletilir; ağır su ve tortu dibe çöker ve drenajla alınır, üstteki görece temiz yakıt separatöre gönderilir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 184,
      question: "Servis tankı settling tanktan hangi yönüyle ayrılır?",
      options: [
        "Yalnızca bunkerden dolduruluyor olması",
        "Arıtılmış yakıtı motora hazır tutması",
        "Hiç ısıtma düzeneği bulunmaması",
        "Yalnızca yağ için kullanılabilmesi",
      ],
      correctAnswer: 1,
      explanation:
        "Servis tankı separatörden geçmiş yakıtı barındırır ve besleme pompalarını doğrudan besler; klas kuralları belirli bir çalışma süresine yetecek hacim ve düzenli drenaj ister.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 185,
      question: "Yakıt ısıtıcısında sıcaklığın aşırı yükselmesi ne yaratır?",
      options: [
        "Viskozitenin kalıcı yükselmesini",
        "Kükürt oranının artmasını",
        "Buharlaşma ve pompa kavitasyonu",
        "Yoğunluğun ölçülemez olmasını",
      ],
      correctAnswer: 2,
      explanation:
        "Aşırı ısınan yakıtta hafif bileşenler buharlaşır; besleme hattında gaz kabarcığı oluşur, pompa kavitasyon yapar ve enjeksiyon kesintiye uğrar. Bu yüzden hat basınçlandırılır.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 186,
      question: "Yakıt besleme hattının basınç altında tutulmasının nedeni nedir?",
      options: [
        "Yakıtın viskozitesini düşürmek için",
        "Separatörü devre dışı bırakmak için",
        "Tank seviyesini sabit tutmak için",
        "Sıcak yakıtın buharlaşmasını önlemek",
      ],
      correctAnswer: 3,
      explanation:
        "Basınçlandırılmış besleme devresi, ısıtılmış yakıtın kaynama noktasının üstünde kalmasını sağlar; böylece hatta gaz kabarcığı oluşmaz ve enjeksiyon kararlı kalır.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 187,
      question: "Yakıt ısıtıcısı arızalandığında ilk gözlenen belirti nedir?",
      options: [
        "Viskozite alarmının devreye girmesi",
        "Yağ basıncının aniden yükselmesi",
        "Turboşarjer devrinin sıfırlanması",
        "Sintine seviyesinin hızla artması",
      ],
      correctAnswer: 0,
      explanation:
        "Isıtma kesilince yakıt soğur ve viskozite hızla yükselir; viskozimetre yüksek viskozite alarmı verir, önlem alınmazsa yakıt pompaları zorlanır ve atomizasyon bozulur.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 188,
      question: "Otomatik geri yıkamalı (auto-backflush) filtre nasıl temizlenir?",
      options: [
        "Elemanlar elle sökülüp yıkanarak",
        "Ters akışla kiri boşaltma hattına atarak",
        "Filtre gövdesi ısıtılarak buharlaştırılır",
        "Kimyasal çözücüyle çevrimde bekletilerek",
      ],
      correctAnswer: 1,
      explanation:
        "Fark basıncı eşiği aşınca kontrol ünitesi ilgili bölmeyi ters akışa alır ve tutulan kiri çamur tankına gönderir; işlem sırasında akış diğer bölmelerden sürer.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 189,
      question: "Filtre üzerindeki fark basıncının artması neyi gösterir?",
      options: [
        "Yakıt yoğunluğunun düştüğünü",
        "Besleme pompasının durduğunu",
        "Filtre elemanının tıkandığını",
        "Yakıt sıcaklığının yükseldiğini",
      ],
      correctAnswer: 2,
      explanation:
        "Giriş ile çıkış arasındaki basınç farkı elemandaki birikimle büyür; eşiği aşan fark geri yıkamayı tetikler, sürekli yüksek fark ise yakıt kalitesi sorununa işaret eder.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 190,
      question: "Yakıt homojenizeri hangi işlevi görür?",
      options: [
        "Yakıttaki suyu tümüyle uzaklaştırır",
        "Yakıtın kükürt oranını düşürmektedir",
        "Yakıtı doğrudan silindire püskürtür",
        "Su ve tortuyu ince biçimde dağıtır",
      ],
      correctAnswer: 3,
      explanation:
        "Homojenizer, yakıttaki su damlacıklarını ve çamur parçacıklarını mikron ölçeğine indirip kararlı bir karışım oluşturur; böylece çökelme ve enjeksiyon kesintisi azalır.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 191,
      question: "Homojenizer separatörün yerini neden tutmaz?",
      options: [
        "Suyu ve tortuyu sistemden atmaz",
        "Yalnızca soğuk yakıtta çalışabilir",
        "Yalnızca damıtık yakıtta kullanılır",
        "Yakıtın viskozitesini yükseltmektedir",
      ],
      correctAnswer: 0,
      explanation:
        "Homojenizer yalnızca karışımı incelterek dağıtır; su, katalitik incelikler ve tortu yakıtın içinde kalmaya devam eder. Bunları sistemden çıkaran tek ekipman separatördür.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 192,
      question: "Homojenizer kullanımının çamur yönetimi açısından etkisi nedir?",
      options: [
        "Yakıt tüketimini yarıya indirmesi",
        "Çamur atığının azalması",
        "Kükürt salımının sıfırlanması",
        "Enjektör basıncının yükselmesi",
      ],
      correctAnswer: 1,
      explanation:
        "İnce dağılmış su ve tortu yakıtla birlikte yakıldığından separatörün attığı çamur miktarı azalır; bu bertaraf maliyetini düşürür ancak cat fines aşındırıcılığını ortadan kaldırmaz.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 193,
      question: "ECA'ya girmeden önce yakıt değişimi ne zaman tamamlanmalıdır?",
      options: [
        "Bölgeye girdikten hemen sonra",
        "İlk limana varıldıktan sonra",
        "Bölge sınırına girmeden önce",
        "Bölgeden çıkıldıktan sonra",
      ],
      correctAnswer: 2,
      explanation:
        "MARPOL Ek VI, uyumlu yakıta geçişin ECA sınırından önce tamamlanmasını ve saat, konum ile tank miktarlarının kaydedilmesini ister.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 194,
      question: "Yakıt değişimi sırasında hangi kayıt tutulur?",
      options: [
        "Yalnızca yakıtın satın alma fiyatı",
        "Yalnızca mürettebat vardiya listesi",
        "Yalnızca hava ve deniz koşulları",
        "Saat, konum ve tanklardaki miktar",
      ],
      correctAnswer: 3,
      explanation:
        "Geçişin başlangıç ve bitiş saati, geminin konumu ve her tanktaki uyumlu yakıt miktarı jurnale yazılır; liman devleti denetiminde bu kayıt uyumun kanıtıdır.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 195,
      question: "Bunker planlamasında ilk belirlenen büyüklük nedir?",
      options: [
        "Sefer için gereken yakıt ve emniyet payı",
        "Bunker gemisinin bayrak devleti bilgisi",
        "Liman acentesinin komisyon oranı payı",
        "Yakıt tankının en son boyanma tarihi",
      ],
      correctAnswer: 0,
      explanation:
        "Sefer mesafesi, hız, hava payı ve liman beklemeleri üzerinden tüketim hesaplanır; buna emniyet payı eklenerek sipariş miktarı ve tanklarda kalması gereken boşluk belirlenir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 196,
      question: "Bunker siparişinde yakıt sınıfı neye göre belirtilir?",
      options: [
        "Yalnızca tedarikçinin stok durumuna",
        "ISO 8217 sınıfı ve kükürt sınırına",
        "Yalnızca geminin inşa yılına göre",
        "Yalnızca bir önceki bunker fiyatına",
      ],
      correctAnswer: 1,
      explanation:
        "Sipariş, motorun kabul ettiği ISO 8217 sınıfını ve seferin geçtiği bölgelerin kükürt sınırını açıkça belirtir; belirsiz sipariş uyuşmazlığın ana kaynağıdır.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 197,
      question: "Bunker öncesi tank yerleşimi planlanırken neye dikkat edilir?",
      options: [
        "Yalnızca tankların boya durumuna",
        "Yalnızca tankların inşa yılına",
        "Uyumsuz partilerin karıştırılmamasına",
        "Yalnızca tank kapaklarının rengine",
      ],
      correctAnswer: 2,
      explanation:
        "Farklı kaynaklı VLSFO partileri karıştığında asfalten çökelmesi görülebilir; bu yüzden yeni parti mümkünse boş tanka alınır, karıştırma zorunluysa uyumluluk testi istenir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 198,
      question: "Bunker miktarı gemide hangi yöntemle doğrulanır?",
      options: [
        "Yalnızca tedarikçinin beyanına güvenilir",
        "Yalnızca bunker gemisinin sayacı okunur",
        "Yalnızca teslim notundaki değer yazılır",
        "Tank sondajı öncesi ve sonrası alınır",
      ],
      correctAnswer: 3,
      explanation:
        "Bunker öncesi ve sonrası tüm tanklarda sondaj veya ullage ölçümü yapılır; sıcaklık düzeltmesi ve yoğunlukla kütleye çevrilen fark, teslim edilen gerçek miktarı verir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 199,
      question: "Ullage ölçümü sondaj ölçümünden hangi yönüyle ayrılır?",
      options: [
        "Sıvı üstündeki boş yüksekliği verir",
        "Yalnızca yağ tanklarında kullanılır",
        "Doğrudan kütle değerini vermektedir",
        "Yalnızca boş tanklarda uygulanabilir",
      ],
      correctAnswer: 0,
      explanation:
        "Sondaj sıvı yüksekliğini ölçer, ullage ise tank tavanı ile sıvı yüzeyi arasındaki boşluğu ölçer; ikisi de tank kalibrasyon tablosuyla hacme çevrilir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 200,
      question: "Ölçülen hacmin 15 °C'ye düzeltilmesi neden gerekir?",
      options: [
        "Yalnızca teslim notu formatı istediği için",
        "Yakıt hacmi sıcaklıkla değiştiği için",
        "Yalnızca kükürt hesabı gerektirdiği için",
        "Yalnızca viskozite ölçümü için gerektiğinden",
      ],
      correctAnswer: 1,
      explanation:
        "Sıcak teslim edilen yakıt soğuyunca büzülür; ticari karşılaştırma standart sıcaklıkta yapılır, bu yüzden hacim 15 °C'ye düzeltilip yoğunlukla kütleye çevrilir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 201,
      question: "Bunker Delivery Note gemide ne kadar süreyle saklanır?",
      options: [
        "Yalnızca sefer boyunca saklanır",
        "Yalnızca bir ay boyunca saklanır",
        "Teslimden sonra üç yıl saklanır",
        "Yalnızca bir hafta saklanır",
      ],
      correctAnswer: 2,
      explanation:
        "MARPOL Ek VI, BDN'nin teslim tarihinden itibaren üç yıl gemide bulundurulmasını ve liman devleti denetiminde ibraz edilmesini ister.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 202,
      question: "BDN üzerinde hangi bilgi zorunlu olarak yer alır?",
      options: [
        "Yalnızca tedarikçinin banka bilgileri",
        "Yalnızca geminin bir sonraki limanı",
        "Yalnızca mürettebat sayısı bilgisi",
        "Yakıtın kükürt içeriği ve miktarı",
      ],
      correctAnswer: 3,
      explanation:
        "BDN; geminin adı ve IMO numarasını, teslim limanı ile tarihini, yakıt miktarını, yoğunluğunu, kükürt içeriğini ve tedarikçinin beyan ile imzasını taşır.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 203,
      question: "BDN'deki bilgilerin eksik olması hangi sonucu doğurur?",
      options: [
        "Denetimde uygunsuzluk bulgusu doğurur",
        "Yakıtın kalitesini kendiliğinden artırır",
        "Geminin tonajını yeniden hesaplattırır",
        "Klas sörveyini kendiliğinden erteletir",
      ],
      correctAnswer: 0,
      explanation:
        "Eksik veya tutarsız BDN, MARPOL Ek VI uyumunun kanıtlanamaması demektir; liman devleti denetiminde bulgu yazılır ve gemi tutulmaya kadar giden yaptırımla karşılaşabilir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 204,
      question: "MARPOL Ek VI'ya göre ECA dışındaki küresel kükürt sınırı nedir?",
      options: ["%0,10 kütlece", "%0,50 kütlece", "%1,50 kütlece", "%3,50 kütlece"],
      correctAnswer: 1,
      explanation:
        "2020'den itibaren küresel sınır kütlece %0,50'dir; emisyon kontrol alanlarında sınır %0,10'a iner. Egzoz gazı temizleme sistemi kullanan gemiler eşdeğer uyum sağlayabilir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 205,
      question: "Scrubber kullanan bir gemi yüksek kükürtlü yakıt yakabilir mi?",
      options: [
        "Hayır, hiçbir koşulda yakamaz",
        "Yalnızca liman içinde yakabilir",
        "Evet, onaylı eşdeğer düzenek sayılır",
        "Yalnızca demirde iken yakabilir",
      ],
      correctAnswer: 2,
      explanation:
        "Egzoz gazı temizleme sistemi MARPOL Ek VI kapsamında eşdeğer uyum yöntemi olarak onaylanır; ancak yıkama suyu deşarj kuralları ve bazı limanların yasakları geçerlidir.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 206,
      question: "MARPOL numunesi bunker sırasında nereden alınır?",
      options: [
        "Yalnızca gemi tankının dip vanasından",
        "Yalnızca bunker geminin tankından",
        "Yalnızca servis tankının çıkışından",
        "Geminin bunker manifoldu üzerinden",
      ],
      correctAnswer: 3,
      explanation:
        "MARPOL numunesi, geminin bunker alma manifoldunda sürekli damlatmalı yöntemle transfer boyunca alınır; böylece numune teslim edilen partinin tamamını temsil eder.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 207,
      question: "Alınan numunelerin mühürlenip imzalanmasının amacı nedir?",
      options: [
        "Uyuşmazlıkta kanıt değerini korumak",
        "Numunenin viskozitesini düşürmek",
        "Numunenin sıcaklığını sabit tutmak",
        "Numunenin hacmini büyütebilmek",
      ],
      correctAnswer: 0,
      explanation:
        "Mühür numarası BDN'ye yazılır ve her iki taraf imzalar; mühürsüz veya imzasız numune sonradan itiraz edildiğinde hukuken kanıt olarak kabul edilmez.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 208,
      question: "Teslim edilen miktar ölçümle uyuşmuyorsa ilk ne yapılır?",
      options: [
        "Fark görmezden gelinip BDN imzalanır",
        "Protesto mektubu yazılıp imzalatılır",
        "Fark bir sonraki bunkerden düşülür",
        "Ölçüm tümüyle geçersiz sayılıp atılır",
      ],
      correctAnswer: 1,
      explanation:
        "Miktar veya kalite uyuşmazlığında derhal yazılı protesto düzenlenir, tedarikçiye imzalatılır ve şirkete bildirilir; itiraz kaydı olmadan sonradan ticari talep hakkı doğmaz.",
      category: "Yakıt Teknolojisi",
    },
    {
      id: 209,
      question: "Laboratuvar analizi yakıtı off-spec çıkarırsa ne yapılır?",
      options: [
        "Yakıt hemen denize deşarj edilir",
        "Yakıt diğer tanklarla karıştırılır",
        "Yakıt izole edilip tedarikçiye bildirilir",
        "Yakıt kayıt tutulmadan kullanılır",
      ],
      correctAnswer: 2,
      explanation:
        "Şüpheli parti ayrı tankta izole edilir, mühürlü numuneyle birlikte tedarikçiye ve şirkete bildirilir; kullanılması zorunluysa separatör ve filtre ayarları en sıkı düzeye alınır.",
      category: "Yakıt Teknolojisi",
    },
  ],
};
