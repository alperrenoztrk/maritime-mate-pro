import type { QuizQuestion } from "@/types/quiz";

/**
 * Konu doldurma bankası 13 — dizel motor konu bankasında konu başına en az 8
 * soru hedefini tutturmak için yazılan ek sorular.
 *
 * `exerciseQuestionDistribution.ts` soruları konu başlıklarıyla sözcük örtüşmesine
 * göre eşlediğinden her soru hedeflediği konunun kendi terminolojisini kullanır;
 * aksi hâlde benzerlik puanı soruyu komşu konuya taşır. Birbirine yakın konular
 * (indike güç/fren gücü/MEP, egzoz sıcaklık sapması/silindir dengesizliği,
 * liner aşınması/piston segman tasarımı) ayrı sözcük dağarcığıyla yazılmıştır.
 *
 * Numaralandırma taban + devam + vaka bankalarının ardından sürer (155'ten
 * başlar); `machineQuizDataIndex.ts` bankaları slug bazında bu sırayla birleştirir.
 */
export const machineQuizQuestionsTopicFill13: Record<string, QuizQuestion[]> = {
  "diesel-engines": [
    {
      id: 155,
      question: "Dizel çevriminde ateşleme nasıl gerçekleşir?",
      options: [
        "Sıkışan havanın sıcaklığıyla kendiliğinden",
        "Yalnızca bujiden atlayan kıvılcımla",
        "Yalnızca dışarıdan verilen alevle",
        "Yalnızca elektrikli rezistans teliyle",
      ],
      correctAnswer: 0,
      explanation:
        "Hava yüksek oranda sıkıştırılınca sıcaklığı yakıtın tutuşma sıcaklığının üstüne çıkar; püskürtülen yakıt buji olmadan kendiliğinden tutuşur.",
      category: "Dizel Motor",
    },
    {
      id: 156,
      question: "Dizel motorda sıkıştırma oranı neden yüksek tutulur?",
      options: [
        "Yalnızca motoru hafifletmek amacıyla",
        "Tutuşma sıcaklığına ulaşabilmek için",
        "Yalnızca gürültüyü azaltmak amacıyla",
        "Yalnızca egzozu soğutmak amacıyla",
      ],
      correctAnswer: 1,
      explanation:
        "Dizelde tipik sıkıştırma oranı 12-20 arasındadır; bu oran silindir içi havayı 500-700 °C'ye çıkararak yakıtın kendiliğinden tutuşmasını sağlar.",
      category: "Dizel Motor",
    },
    {
      id: 157,
      question: "Dizel çevriminde ısı girişi ideal olarak nasıl kabul edilir?",
      options: [
        "Yalnızca sabit hacimde kabul edilir",
        "Yalnızca sabit sıcaklıkta kabul edilir",
        "Sabit basınçta ısı girişi kabul edilir",
        "Yalnızca sabit entropide kabul edilir",
      ],
      correctAnswer: 2,
      explanation:
        "İdeal dizel çevriminde yanma sabit basınçta gerçekleşir; Otto çevriminde ise sabit hacimdedir. Gerçek motorlarda ikisinin karışımı olan karma çevrim görülür.",
      category: "Dizel Motor",
    },
    {
      id: 158,
      question: "Dizel motorun benzinli motora göre üstünlüğü nedir?",
      options: [
        "Yalnızca daha hafif olması durumudur",
        "Yalnızca daha sessiz çalışması durumu",
        "Yalnızca daha ucuz üretilmesi durumu",
        "Daha yüksek termik verim sağlaması",
      ],
      correctAnswer: 3,
      explanation:
        "Yüksek sıkıştırma oranı ve fakir karışımla çalışabilmesi sayesinde dizel motorun termik verimi belirgin yüksektir; büyük deniz dizellerinde %50'yi aşar.",
      category: "Dizel Motor",
    },
    {
      id: 159,
      question: "İki zamanlı motorda bir çevrim kaç krank turunda tamamlanır?",
      options: [
        "Bir krank turunda tamamlanmaktadır",
        "İki krank turunda tamamlanmaktadır",
        "Dört krank turunda tamamlanmaktadır",
        "Sekiz krank turunda tamamlanmaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "İki zamanlı motorda emme, sıkıştırma, yanma ve egzoz tek krank turuna sığar; her turda iş üretildiğinden aynı hacimde daha yüksek güç elde edilir.",
      category: "Dizel Motor",
    },
    {
      id: 160,
      question: "İki zamanlı motorda süpürme portları nerede bulunur?",
      options: [
        "Yalnızca silindir kapağının üstünde",
        "Gömleğin alt bölgesindeki delik sırasında",
        "Yalnızca krank karterinin içinde",
        "Yalnızca egzoz manifoldunun içinde",
      ],
      correctAnswer: 1,
      explanation:
        "Piston alt ölü noktaya yaklaşınca gömlek çevresindeki port sırasını açar; basınçlı süpürme havası içeri girip yanmış gazı egzoz valfinden dışarı iter.",
      category: "Dizel Motor",
    },
    {
      id: 161,
      question: "İki zamanlı büyük deniz dizelinin tipik devir aralığı nedir?",
      options: [
        "Yaklaşık 1500-1800 devir dolayındadır",
        "Yaklaşık 600-900 devir dolayındadır",
        "Yaklaşık 70-120 devir dolayındadır",
        "Yaklaşık 3000-4000 devir dolayındadır",
      ],
      correctAnswer: 2,
      explanation:
        "Düşük devirli iki zamanlı motorlar 70-120 devir aralığında çalışır ve pervaneye redüktörsüz doğrudan bağlanır; bu sayede aktarma kaybı ortadan kalkar.",
      category: "Dizel Motor",
    },
    {
      id: 162,
      question: "İki zamanlı motorda silindir yağlaması nasıl yapılır?",
      options: [
        "Yalnızca karterdeki yağ sıçratılarak",
        "Yalnızca yağ banyosunda bekletilerek",
        "Yalnızca gres tabancasıyla elle verilerek",
        "Gömlekteki kanallardan ayrı yağ basılarak",
      ],
      correctAnswer: 3,
      explanation:
        "Silindir yağı, gömlek çevresindeki yağlama noktalarından ölçülü olarak basılır ve tek kullanımlıktır; karter yağıyla karışmadığı için ayrı bir sistem oluşturur.",
      category: "Dizel Motor",
    },
    {
      id: 163,
      question: "Dört zamanlı motorda çevrim kaç krank turunda tamamlanır?",
      options: [
        "İki krank turunda tamamlanmaktadır",
        "Bir krank turunda tamamlanmaktadır",
        "Dört krank turunda tamamlanmaktadır",
        "Yarım krank turunda tamamlanmaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "Emme, sıkıştırma, iş ve egzoz zamanları iki krank turuna yayılır; kam mili bu yüzden krank milinin yarısı hızda döner.",
      category: "Dizel Motor",
    },
    {
      id: 164,
      question: "Dört zamanlı motorda valf bindirmesi (overlap) nedir?",
      options: [
        "Yalnızca iki valfin de kapalı olması",
        "Emme ve egzoz valfinin birlikte açık kalması",
        "Yalnızca egzoz valfinin geç açılması",
        "Yalnızca emme valfinin erken kapanması",
      ],
      correctAnswer: 1,
      explanation:
        "Üst ölü nokta çevresinde iki valf kısa süre birlikte açık kalır; gelen taze hava kalan egzoz gazını süpürür ve silindir ile valfler soğur.",
      category: "Dizel Motor",
    },
    {
      id: 165,
      question: "Dört zamanlı motorun iki zamanlıya göre üstünlüğü nedir?",
      options: [
        "Yalnızca daha yüksek güç yoğunluğu",
        "Yalnızca daha basit yapı sunması",
        "Daha temiz yanma ve düşük yağ tüketimi",
        "Yalnızca daha az parça içermesi durumu",
      ],
      correctAnswer: 2,
      explanation:
        "Ayrı emme ve egzoz zamanları sayesinde gaz değişimi daha eksiksizdir; süpürme kaybı yoktur ve silindir yağı karterden döndüğü için tüketim düşer.",
      category: "Dizel Motor",
    },
    {
      id: 166,
      question: "Dört zamanlı motorda kam mili hangi hızda döner?",
      options: [
        "Krank mili ile aynı hızda döner",
        "Krank milinin iki katı hızda döner",
        "Krank milinin dört katı hızda döner",
        "Krank milinin yarısı hızda döner",
      ],
      correctAnswer: 3,
      explanation:
        "Çevrim iki krank turunda tamamlandığından her valf iki turda bir açılmalıdır; kam mili bu yüzden krank hızının yarısında döner.",
      category: "Dizel Motor",
    },
    {
      id: 167,
      question: "Düşük devirli motorun tipik kullanım yeri neresidir?",
      options: [
        "Doğrudan tahrikli ana makine olarak",
        "Yalnızca acil jeneratör olarak kullanılır",
        "Yalnızca yangın pompası tahriki olarak",
        "Yalnızca filika motoru olarak kullanılır",
      ],
      correctAnswer: 0,
      explanation:
        "Düşük devirli iki zamanlı motorlar pervane devrine yakın çalıştığından redüktör gerekmez; büyük konteyner ve dökme yük gemilerinin ana makinesidir.",
      category: "Dizel Motor",
    },
    {
      id: 168,
      question: "Orta devirli motorun tipik devir aralığı nedir?",
      options: [
        "Yaklaşık 60-100 devir dolayındadır",
        "Yaklaşık 300-1000 devir dolayındadır",
        "Yaklaşık 2000-3000 devir dolayındadır",
        "Yaklaşık 4000-5000 devir dolayındadır",
      ],
      correctAnswer: 1,
      explanation:
        "Orta devirli dört zamanlı motorlar 300-1000 devir aralığında çalışır; jeneratör tahrikinde ve redüktörlü ana makine düzenlerinde yaygın kullanılır.",
      category: "Dizel Motor",
    },
    {
      id: 169,
      question: "Yüksek devirli motorun belirgin özelliği nedir?",
      options: [
        "Yalnızca çok uzun ömürlü olmasıdır",
        "Yalnızca ağır yakıt yakabilmesidir",
        "Küçük hacimde yüksek güç vermesi",
        "Yalnızca çok düşük bakım istemesi",
      ],
      correctAnswer: 2,
      explanation:
        "Devir yükseldikçe aynı silindir hacminden daha fazla güç alınır; buna karşılık parça ömrü kısalır ve genelde yalnızca damıtık yakıt kullanılabilir.",
      category: "Dizel Motor",
    },
    {
      id: 170,
      question: "Devir düştükçe aynı güç için ne değişir?",
      options: [
        "Yalnızca yakıt tüketimi iki katına çıkar",
        "Yalnızca egzoz sıcaklığı sıfıra iner",
        "Yalnızca silindir sayısı kendiliğinden artar",
        "Moment artar ve parçalar büyür",
      ],
      correctAnswer: 3,
      explanation:
        "Güç, moment ile açısal hızın çarpımıdır; devir düşünce aynı gücü vermek için moment büyür ve krank, biyel ile şaft daha büyük boyutlandırılır.",
      category: "Dizel Motor",
    },
    {
      id: 171,
      question: "Crosshead motorun trunk piston motordan farkı nedir?",
      options: [
        "Yan kuvveti kızak üzerinden karşılaması",
        "Yalnızca daha yüksek devirde çalışması",
        "Yalnızca dört zamanlı olarak çalışması",
        "Yalnızca daha küçük boyutlu olması",
      ],
      correctAnswer: 0,
      explanation:
        "Piston kolu ile biyel arasına konan crosshead, biyelin yarattığı yan kuvveti kızağa aktarır; gömlek yalnızca eksenel yük taşır ve aşınma azalır.",
      category: "Dizel Motor",
    },
    {
      id: 172,
      question: "Crosshead motorda karter yağı neden temiz kalır?",
      options: [
        "Yalnızca yağın sürekli değiştirilmesinden",
        "Diyafram silindir bölgesini ayırdığı için",
        "Yalnızca çok soğuk çalıştığı için",
        "Yalnızca filtrenin çok ince olmasından",
      ],
      correctAnswer: 1,
      explanation:
        "Stuffing box ve diyafram, yanma ürünleriyle kirlenen silindir bölgesini karterden ayırır; karter yağı yalnızca yatakları yağladığı için çok daha uzun ömürlüdür.",
      category: "Dizel Motor",
    },
    {
      id: 173,
      question: "Trunk piston motorda yan kuvveti hangi eleman karşılar?",
      options: [
        "Yalnızca krank mili karşılamaktadır",
        "Yalnızca silindir kapağı karşılamaktadır",
        "Piston eteği ve gömlek karşılamaktadır",
        "Yalnızca supap mekanizması karşılamakta",
      ],
      correctAnswer: 2,
      explanation:
        "Biyel doğrudan pistona bağlı olduğundan açısal kuvvet piston eteği üzerinden gömleğe biner; bu yüzden gömlek aşınması crosshead motora göre daha hızlıdır.",
      category: "Dizel Motor",
    },
    {
      id: 174,
      question: "Crosshead yapısı hangi motor tipinde bulunur?",
      options: [
        "Yalnızca yüksek devirli motorlarda",
        "Yalnızca dört zamanlı jeneratörlerde",
        "Yalnızca filika ve cankurtaran motorunda",
        "Düşük devirli iki zamanlı motorlarda",
      ],
      correctAnswer: 3,
      explanation:
        "Uzun stroklu düşük devirli iki zamanlı ana makineler crosshead düzenlidir; orta ve yüksek devirli dört zamanlı motorlar ise trunk piston yapısındadır.",
      category: "Dizel Motor",
    },
    {
      id: 175,
      question: "Ana makine ile yardımcı makine arasındaki temel fark nedir?",
      options: [
        "Ana makine sevk, yardımcı elektrik üretir",
        "Yalnızca ana makine dört zamanlı çalışır",
        "Yalnızca yardımcı makine ağır yakıt yakar",
        "Yalnızca ana makine soğutma suyu kullanır",
      ],
      correctAnswer: 0,
      explanation:
        "Ana makine pervaneyi döndürerek gemiyi ilerletir; yardımcı makineler jeneratörleri tahrik ederek gemi elektrik ihtiyacını karşılar.",
      category: "Dizel Motor",
    },
    {
      id: 176,
      question: "Şaft jeneratörü hangi makineden güç alır?",
      options: [
        "Yalnızca acil jeneratörden güç alır",
        "Ana makine şaft hattından güç alır",
        "Yalnızca yardımcı kazandan güç alır",
        "Yalnızca akü grubundan güç almaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "Şaft jeneratörü ana makinenin şaft hattına bağlanır; seyirde elektrik ana makineden üretildiği için yardımcı motorlar durdurulup yakıt tasarrufu sağlanır.",
      category: "Dizel Motor",
    },
    {
      id: 177,
      question: "Silindir kapağında hangi elemanlar bulunur?",
      options: [
        "Yalnızca krank mili yatakları bulunur",
        "Yalnızca piston segmanları bulunmakta",
        "Enjektör, egzoz valfi ve emniyet valfi",
        "Yalnızca yakıt filtresi bulunmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "Kapak üzerinde yakıt enjektörü, egzoz valfi, yol verme hava valfi, indikatör musluğu ve aşırı basınca karşı emniyet valfi yer alır.",
      category: "Dizel Motor",
    },
    {
      id: 178,
      question: "Silindir kapağı cıvataları nasıl sıkılır?",
      options: [
        "Yalnızca elle rastgele sırayla sıkılır",
        "Yalnızca tek bir cıvatadan başlanarak",
        "Yalnızca en son çevrede sıkılmaktadır",
        "Hidrolik takımla çapraz sırayla sıkılır",
      ],
      correctAnswer: 3,
      explanation:
        "Cıvatalar hidrolik gerdirme takımıyla belirtilen basınçta ve çapraz sırayla sıkılır; böylece kapak conta yüzeyine düzgün baskı uygular ve gaz kaçağı olmaz.",
      category: "Dizel Motor",
    },
    {
      id: 179,
      question: "Silindir gömleğinde aşınma en çok nerede görülür?",
      options: [
        "Üst segmanın döndüğü üst bölgede",
        "Yalnızca gömleğin tam ortasında",
        "Yalnızca gömleğin en alt ucunda",
        "Yalnızca gömleğin dış yüzeyinde",
      ],
      correctAnswer: 0,
      explanation:
        "Üst ölü nokta çevresinde basınç ve sıcaklık en yüksek, yağ filmi ise en incedir; bu bölgede aşınma hızlanır ve zamanla belirgin bir basamak oluşur.",
      category: "Dizel Motor",
    },
    {
      id: 180,
      question: "Gömlek aşınmasını hızlandıran başlıca etken nedir?",
      options: [
        "Yalnızca deniz suyu sıcaklığının düşmesi",
        "Katalitik incelikler ve asidik korozyon",
        "Yalnızca egzoz basıncının yükselmesi",
        "Yalnızca gemi hızının artması durumu",
      ],
      correctAnswer: 1,
      explanation:
        "Yakıttaki sert cat fines yüzeyi çizer; kükürt kaynaklı asit ise ceket suyu sıcaklığı düşükse yoğuşup korozyon yaratır. İkisi birlikte aşınmayı katlar.",
      category: "Dizel Motor",
    },
    {
      id: 181,
      question: "Piston segmanlarının temel görevi nedir?",
      options: [
        "Yalnızca pistonu soğutmak görevidir",
        "Yalnızca pistonu ağırlaştırmak görevidir",
        "Gaz sızdırmazlığı ve yağ sıyırma",
        "Yalnızca pistonu boyamak görevidir",
      ],
      correctAnswer: 2,
      explanation:
        "Üst segmanlar yanma gazının kartere kaçmasını engeller, alttaki yağ segmanı ise fazla yağı sıyırıp kartere döndürür ve ısıyı gömleğe aktarır.",
      category: "Dizel Motor",
    },
    {
      id: 182,
      question: "Segman yanal boşluğu neden ölçülür?",
      options: [
        "Yalnızca segman rengini belirlemek için",
        "Yalnızca segman ağırlığını bulmak için",
        "Yalnızca segman sayısını doğrulamak için",
        "Aşınma ve sıkışma riskini görmek için",
      ],
      correctAnswer: 3,
      explanation:
        "Kanal ve segman aşındıkça boşluk büyür ve segman kanalda çalkalanır; boşluk çok küçükse kurum birikimiyle segman sıkışıp yapışır (ring sticking).",
      category: "Dizel Motor",
    },
    {
      id: 183,
      question: "Biyel kolunun görevi nedir?",
      options: [
        "Doğrusal hareketi dönmeye çevirmek",
        "Yalnızca pistonu soğutmak görevidir",
        "Yalnızca yakıtı püskürtmek görevidir",
        "Yalnızca supapları açmak görevidir",
      ],
      correctAnswer: 0,
      explanation:
        "Biyel, pistonun doğrusal hareketini krank milinin dönme hareketine çevirir; sıkışmada basma, iş zamanında ise büyük eğilme ve burkulma yükü taşır.",
      category: "Dizel Motor",
    },
    {
      id: 184,
      question: "Krank milinde karşı ağırlıkların işlevi nedir?",
      options: [
        "Yalnızca mili ağırlaştırmak işlevidir",
        "Dönen kütle dengesizliğini gidermek",
        "Yalnızca yağ deposu olarak çalışmak",
        "Yalnızca mili soğutmak işlevi görmek",
      ],
      correctAnswer: 1,
      explanation:
        "Kol muylusu ve biyel alt ucunun dönen kütlesi merkezkaç kuvveti yaratır; karşı ağırlıklar bu kuvveti dengeleyerek yatak yükünü ve titreşimi azaltır.",
      category: "Dizel Motor",
    },
    {
      id: 185,
      question: "Yatak tiplerinden ana yatak hangi yükü taşır?",
      options: [
        "Yalnızca eksenel itme yükünü taşır",
        "Yalnızca supap yayı yükünü taşır",
        "Krank milinin radyal yükünü taşır",
        "Yalnızca soğutma suyu yükünü taşır",
      ],
      correctAnswer: 2,
      explanation:
        "Ana yataklar krank milini bedplate üzerinde taşır ve yanma kuvvetinin ürettiği radyal yükü karşılar; eksenel itme ise ayrı bir baskı yatağıyla alınır.",
      category: "Dizel Motor",
    },
    {
      id: 186,
      question: "Yatak boşluğu hangi yöntemle ölçülür?",
      options: [
        "Yalnızca gözle bakılarak ölçülmektedir",
        "Yalnızca yatak tartılarak ölçülmektedir",
        "Yalnızca yatak boyanarak ölçülmektedir",
        "Kurşun tel veya plastigage ile ölçülür",
      ],
      correctAnswer: 3,
      explanation:
        "Kurşun tel veya ezilen plastik şerit kapak sıkılınca deforme olur; kalınlığı ölçülerek gerçek boşluk bulunur ve üretici toleransıyla karşılaştırılır.",
      category: "Dizel Motor",
    },
    {
      id: 187,
      question: "Supap zamanlaması hangi elemanla belirlenir?",
      options: [
        "Kam milindeki kam profili ile belirlenir",
        "Yalnızca yakıt pompası ile belirlenir",
        "Yalnızca turboşarjer ile belirlenmektedir",
        "Yalnızca soğutma suyu ile belirlenmekte",
      ],
      correctAnswer: 0,
      explanation:
        "Kam profili valfin açılma anını, yükselme miktarını ve kapanma anını belirler; elektronik motorlarda bu görev hidrolik aktüatör ve yazılıma devredilmiştir.",
      category: "Dizel Motor",
    },
    {
      id: 188,
      question: "Supap boşluğu neden bırakılır?",
      options: [
        "Yalnızca ses çıkarması istendiği için",
        "Isıl genleşmeye yer bırakmak için",
        "Yalnızca yağ tüketimini artırmak için",
        "Yalnızca montajı kolaylaştırmak için",
      ],
      correctAnswer: 1,
      explanation:
        "Isınan supap sapı uzar; boşluk bırakılmazsa supap tam kapanmaz ve oturma yüzeyi yanar. Boşluk motor soğukken ve belirtilen krank konumunda ayarlanır.",
      category: "Dizel Motor",
    },
    {
      id: 189,
      question: "Bedplate yapısının görevi nedir?",
      options: [
        "Yalnızca yakıt deposu olarak çalışmak",
        "Yalnızca egzoz gazını toplamak görevi",
        "Krank milini taşıyıp yükü tekneye vermek",
        "Yalnızca soğutma suyunu depolamaktır",
      ],
      correctAnswer: 2,
      explanation:
        "Bedplate ana yatak yuvalarını taşır ve yanma kuvvetlerini gemi temeline aktarır; ayrıca karter yağının toplandığı hazneyi oluşturur.",
      category: "Dizel Motor",
    },
    {
      id: 190,
      question: "Tie rod (bağlama çubuğu) hangi işi görür?",
      options: [
        "Yalnızca motoru gemiye bağlamaktadır",
        "Yalnızca egzoz borusunu tutmaktadır",
        "Yalnızca soğutma suyunu taşımaktadır",
        "Bedplate, frame ve bloğu sıkıştırır",
      ],
      correctAnswer: 3,
      explanation:
        "Uzun bağlama çubukları üç ana gövde parçasını ön gerilmeyle birbirine bastırır; böylece yanma kuvveti çekme yerine basma olarak taşınır ve çatlak riski düşer.",
      category: "Dizel Motor",
    },
    {
      id: 191,
      question: "Mekanik yakıt enjeksiyon sisteminde basınç nasıl üretilir?",
      options: [
        "Kam tahrikli plunger ile üretilmektedir",
        "Yalnızca elektrik pompasıyla üretilir",
        "Yalnızca hava basıncıyla üretilmektedir",
        "Yalnızca yerçekimi ile üretilmektedir",
      ],
      correctAnswer: 0,
      explanation:
        "Kam mili yakıt pompasının plunger'ını iterek yakıtı yüksek basınca çıkarır; basınç meme açma değerine ulaşınca enjektör açılır ve püskürtme başlar.",
      category: "Dizel Motor",
    },
    {
      id: 192,
      question: "Mekanik enjeksiyonda yakıt miktarı nasıl ayarlanır?",
      options: [
        "Yalnızca kam profili değiştirilerek",
        "Plunger döndürülüp etkin strok değişerek",
        "Yalnızca meme deliği büyütülerek",
        "Yalnızca yakıt sıcaklığı değiştirilerek",
      ],
      correctAnswer: 1,
      explanation:
        "Regülatörün hareket ettirdiği kremayer plunger'ı döndürür; helis kanalın boşaltma deliğini açtığı an değişince etkin strok ve püskürtülen miktar ayarlanır.",
      category: "Dizel Motor",
    },
    {
      id: 193,
      question: "Common rail sisteminin mekanik enjeksiyona üstünlüğü nedir?",
      options: [
        "Yalnızca daha ucuz olması durumudur",
        "Yalnızca daha az parça içermesi durumu",
        "Basınç ve zamanlamanın devirden bağımsızlığı",
        "Yalnızca yakıt filtresi gerektirmemesi",
      ],
      correctAnswer: 2,
      explanation:
        "Ortak hatta basınç sürekli yüksek tutulur; püskürtme anı, süresi ve basıncı devirden bağımsız seçilebilir. Düşük yükte bile iyi atomizasyon sağlanır.",
      category: "Dizel Motor",
    },
    {
      id: 194,
      question: "Common rail sisteminde çoklu püskürtme ne sağlar?",
      options: [
        "Yalnızca yakıt tüketimini iki katına çıkarır",
        "Yalnızca motorun devrini kendiliğinden artırır",
        "Yalnızca egzoz basıncını kendiliğinden düşürür",
        "Yumuşak yanma ve düşük NOx sağlar",
      ],
      correctAnswer: 3,
      explanation:
        "Ön püskürtme tutuşma gecikmesini kısaltıp basınç yükselme hızını düşürür; ana ve son püskürtmelerle gürültü, NOx ve partikül birlikte azaltılabilir.",
      category: "Dizel Motor",
    },
    {
      id: 195,
      question: "Enjektör memesinin delik sayısı ve çapı neyi belirler?",
      options: [
        "Püskürtme demetinin biçimi ve nüfuziyeti",
        "Yalnızca yakıt tankının hacmini belirler",
        "Yalnızca motorun devir sayısını belirler",
        "Yalnızca soğutma suyu debisini belirler",
      ],
      correctAnswer: 0,
      explanation:
        "Delik sayısı, çapı ve açısı yakıt demetinin yanma odasındaki dağılımını belirler; aşınan delikler demeti bozar, kurumlu yanma ve gömlek aşınması yaratır.",
      category: "Dizel Motor",
    },
    {
      id: 196,
      question: "Enjektör açma basıncı düşerse ne olur?",
      options: [
        "Yalnızca motor devri kendiliğinden artar",
        "Erken ve kötü atomize püskürtme olur",
        "Yalnızca yağ basıncı kendiliğinden artar",
        "Yalnızca soğutma suyu sıcaklığı düşer",
      ],
      correctAnswer: 1,
      explanation:
        "Meme daha düşük basınçta açılır; damlacıklar irileşir, yanma geç ve eksik olur. Egzoz sıcaklığı yükselir, kurum ile piston tepesi birikintisi artar.",
      category: "Dizel Motor",
    },
    {
      id: 197,
      question: "Yanma sürecinin ilk aşaması hangisidir?",
      options: [
        "Yalnızca kontrollü yanma aşamasıdır",
        "Yalnızca son yanma aşamasıdır",
        "Tutuşma gecikmesi aşamasıdır",
        "Yalnızca genleşme aşamasıdır",
      ],
      correctAnswer: 2,
      explanation:
        "Yakıt püskürtüldükten sonra buharlaşıp tutuşana kadar geçen süre tutuşma gecikmesidir; bu sürede biriken yakıt sonraki ani yanmayı belirler.",
      category: "Dizel Motor",
    },
    {
      id: 198,
      question: "Tutuşma gecikmesinin uzaması neye yol açar?",
      options: [
        "Yalnızca egzoz sıcaklığının sıfırlanmasına",
        "Yalnızca yağ basıncının yükselmesine",
        "Yalnızca yakıt tüketiminin yarıya inmesine",
        "Sert yanma ve basınç yükselme hızına",
      ],
      correctAnswer: 3,
      explanation:
        "Gecikme uzarsa silindirde biriken yakıt bir anda tutuşur; basınç çok hızlı yükselir, motor sert çalışır ve yatak ile kapak zorlanır.",
      category: "Dizel Motor",
    },
    {
      id: 199,
      question: "Setan sayısı yakıt için neyi gösterir?",
      options: [
        "Tutuşma kabiliyetini göstermektedir",
        "Yalnızca yakıtın rengini göstermektedir",
        "Yalnızca yakıtın fiyatını göstermektedir",
        "Yalnızca yakıtın hacmini göstermektedir",
      ],
      correctAnswer: 0,
      explanation:
        "Yüksek setan sayısı kısa tutuşma gecikmesi demektir; ağır yakıtlarda bu özellik CCAI indeksiyle dolaylı olarak değerlendirilir.",
      category: "Dizel Motor",
    },
    {
      id: 200,
      question: "Vuruntu (knocking) dizel motorda neyi anlatır?",
      options: [
        "Yalnızca supabın gevşemesini anlatır",
        "Ani basınç artışıyla metalik ses çıkmasını",
        "Yalnızca yağ pompasının durmasını anlatır",
        "Yalnızca turboşarjerin hızlanmasını anlatır",
      ],
      correctAnswer: 1,
      explanation:
        "Uzun tutuşma gecikmesinin ardından biriken yakıtın ani yanması basınç dalgası üretir; metalik ses duyulur ve mekanik zorlanma hızla artar.",
      category: "Dizel Motor",
    },
    {
      id: 201,
      question: "Ateşleme atlaması (misfiring) hangi belirtiyi verir?",
      options: [
        "Yalnızca egzoz basıncının yükselmesi",
        "Yalnızca yağ basıncının yükselmesi",
        "O silindirin egzoz sıcaklığının düşmesi",
        "Yalnızca soğutma suyunun ısınması",
      ],
      correctAnswer: 2,
      explanation:
        "Yanma olmayan silindirin egzoz sıcaklığı belirgin düşer; motor düzensiz çalışır ve diğer silindirler yükü karşılamak için daha çok zorlanır.",
      category: "Dizel Motor",
    },
    {
      id: 202,
      question: "Anormal yanmanın en yaygın nedeni nedir?",
      options: [
        "Yalnızca deniz suyu sıcaklığının düşmesi",
        "Yalnızca gemi hızının artması durumu",
        "Yalnızca yağ seviyesinin yükselmesi",
        "Bozuk enjektör ve kötü yakıt kalitesi",
      ],
      correctAnswer: 3,
      explanation:
        "Damlatan veya tıkalı meme, düşük açma basıncı ve tutuşma kalitesi düşük yakıt anormal yanmanın başlıca nedenleridir; enjektör testi ilk kontrol adımıdır.",
      category: "Dizel Motor",
    },
    {
      id: 203,
      question: "İndikatör diyagramı neyi gösterir?",
      options: [
        "Silindir basıncının krank açısına göre değişimi",
        "Yalnızca yakıt tankının seviye değişimini",
        "Yalnızca soğutma suyu sıcaklık değişimini",
        "Yalnızca egzoz gazının renk değişimini",
      ],
      correctAnswer: 0,
      explanation:
        "Diyagram silindir içi basıncı krank açısına veya hacme karşı çizer; kapalı eğrinin alanı çevrimde üretilen indike işi verir.",
      category: "Dizel Motor",
    },
    {
      id: 204,
      question: "P-V diyagramında kapalı alanın anlamı nedir?",
      options: [
        "Yalnızca yakıt tüketiminin toplamıdır",
        "Çevrim başına üretilen indike iştir",
        "Yalnızca soğutma kaybının toplamıdır",
        "Yalnızca sürtünme kaybının toplamıdır",
      ],
      correctAnswer: 1,
      explanation:
        "Kapalı eğrinin alanı, gazın piston üzerinde yaptığı net işi verir; bu değer strok hacmine bölünerek ortalama indike basınç bulunur.",
      category: "Dizel Motor",
    },
    {
      id: 205,
      question: "Draw card ile power card arasındaki fark nedir?",
      options: [
        "Yalnızca ikisinin ölçekleri farklıdır",
        "Yalnızca ikisi farklı silindirden alınır",
        "Draw card sıkışma ve yanmayı ayrıntılandırır",
        "Yalnızca ikisi farklı yükte alınmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "Power card basıncı hacme karşı çizer ve iş alanını verir; draw card ise krank açısına karşı çizerek enjeksiyon zamanlaması ile yanma seyrini görünür kılar.",
      category: "Dizel Motor",
    },
    {
      id: 206,
      question: "Turboşarjer hangi enerjiyle çalışır?",
      options: [
        "Yalnızca elektrik motorundan aldığı güçle",
        "Yalnızca krank milinden aldığı güçle",
        "Yalnızca yakıt pompasından aldığı güçle",
        "Egzoz gazının taşıdığı atık enerjiyle",
      ],
      correctAnswer: 3,
      explanation:
        "Egzoz gazı türbin çarkını döndürür; aynı mile bağlı kompresör emme havasını sıkıştırır. Böylece atık ısıdan yararlanılıp silindire daha çok hava girer.",
      category: "Dizel Motor",
    },
    {
      id: 207,
      question: "Turboşarjer motora hangi kazancı sağlar?",
      options: [
        "Aynı hacimden daha yüksek güç alınması",
        "Yalnızca motorun sesinin kısılması",
        "Yalnızca yağ tüketiminin artması",
        "Yalnızca motorun ağırlaşması durumu",
      ],
      correctAnswer: 0,
      explanation:
        "Yoğunluğu artan hava daha çok yakıtın yakılmasına izin verir; aynı silindir hacminden alınan güç belirgin yükselir ve özgül yakıt tüketimi düşer.",
      category: "Dizel Motor",
    },
    {
      id: 208,
      question: "Turboşarjer türbin tarafında hangi bakım gerekir?",
      options: [
        "Yalnızca boya yenilenmesi gerekmektedir",
        "Kurum temizliği ve yıkama gerekmektedir",
        "Yalnızca etiket değişimi gerekmektedir",
        "Yalnızca gövde ölçümü gerekmektedir",
      ],
      correctAnswer: 1,
      explanation:
        "Türbin kanatlarında biriken kurum verimi düşürür ve dengesizlik yaratır; su veya kuru granül ile düzenli yıkama yapılır, ayrıca yatak yağlaması izlenir.",
      category: "Dizel Motor",
    },
    {
      id: 209,
      question: "Kompresör karakteristik eğrisinde surge hattı neyi gösterir?",
      options: [
        "Yalnızca en yüksek verim noktasını",
        "Yalnızca en düşük devir noktasını",
        "Yalnızca en yüksek debi noktasını",
        "Kararlı çalışmanın bittiği sınırı",
      ],
      correctAnswer: 3,
      explanation:
        "Bu hattın solunda akış kompresör kanatlarından ayrılır ve geri tepme başlar; çalışma noktası daima surge hattının sağında ve emniyet payı içinde tutulur.",
      category: "Dizel Motor",
    },
    {
      id: 210,
      question: "Türbin ile kompresör arasındaki denge neyi belirler?",
      options: [
        "Şarj basıncını ve hava-yakıt oranını",
        "Yalnızca yağ tankının hacmini belirler",
        "Yalnızca soğutma suyu debisini belirler",
        "Yalnızca egzoz borusunun boyunu belirler",
      ],
      correctAnswer: 0,
      explanation:
        "Türbin nozul alanı ve kompresör çarkı birlikte seçilerek her yükte istenen şarj basıncı sağlanır; denge bozulursa hava fazlalığı ve egzoz sıcaklığı sapar.",
      category: "Dizel Motor",
    },
    {
      id: 211,
      question: "Uniflow süpürmenin belirgin özelliği nedir?",
      options: [
        "Yalnızca havanın geri dönmesi durumu",
        "Havanın tek yönde aşağıdan yukarı akması",
        "Yalnızca egzozun porttan çıkması durumu",
        "Yalnızca süpürmenin kapalı yapılması",
      ],
      correctAnswer: 1,
      explanation:
        "Hava alt portlardan girip kapaktaki egzoz valfinden çıkar; tek yönlü akış sayesinde süpürme verimi yüksektir ve taze hava egzozla karışmadan silindiri doldurur.",
      category: "Dizel Motor",
    },
    {
      id: 212,
      question: "Loop süpürme uniflowdan hangi yönüyle ayrılır?",
      options: [
        "Yalnızca egzoz valfi kullanması durumu",
        "Yalnızca dört zamanlı olması durumu",
        "Havanın gömlekte dönerek çıkması",
        "Yalnızca daha yüksek verim vermesi",
      ],
      correctAnswer: 2,
      explanation:
        "Loop düzeninde hava aynı bölgedeki portlardan girip yukarı çıkar ve dönerek egzoz portuna yönelir; egzoz valfi gerekmez ama süpürme verimi daha düşüktür.",
      category: "Dizel Motor",
    },
    {
      id: 213,
      question: "Süpürme havası basıncının düşmesi neye yol açar?",
      options: [
        "Yalnızca yağ basıncının yükselmesine",
        "Yalnızca soğutma suyunun donmasına",
        "Yalnızca motor devrinin yükselmesine",
        "Eksik yanma ve egzoz sıcaklığı artışına",
      ],
      correctAnswer: 3,
      explanation:
        "Yetersiz hava yakıtın tam yanmasını engeller; egzoz sıcaklığı yükselir, kurum artar ve süpürme kuşağında yangın riski doğar. Neden genelde kirli filtre veya turboşarjerdir.",
      category: "Dizel Motor",
    },
    {
      id: 214,
      question: "Şarj havası soğutucusunun işlevi nedir?",
      options: [
        "Havanın yoğunluğunu artırıp dolgu vermek",
        "Yalnızca havayı filtrelemek işlevidir",
        "Yalnızca havayı ısıtmak işlevi görmektedir",
        "Yalnızca havayı nemlendirmek işlevidir",
      ],
      correctAnswer: 0,
      explanation:
        "Sıkıştırma ile ısınan hava soğutulunca yoğunluğu artar; aynı hacimde daha çok oksijen girer, yanma iyileşir ve NOx oluşumu azalır.",
      category: "Dizel Motor",
    },
    {
      id: 215,
      question: "Şarj havası soğutucusunda yoğuşan su neden alınır?",
      options: [
        "Yalnızca su tasarrufu sağlamak için",
        "Gömlek ve segmanı korumak için",
        "Yalnızca hava debisini artırmak için",
        "Yalnızca gürültüyü azaltmak için",
      ],
      correctAnswer: 1,
      explanation:
        "Nemli hava soğuyunca yoğuşur; silindire giren su yağ filmini yıkar ve korozyon yaratır. Su ayırıcı ile drenaj bu yüzden düzenli kontrol edilir.",
      category: "Dizel Motor",
    },
    {
      id: 216,
      question: "Yardımcı üfleyici (auxiliary blower) ne zaman devreye girer?",
      options: [
        "Yalnızca motor tam yükteyken devreye girer",
        "Yalnızca motor durdurulunca devreye girer",
        "Düşük yükte ve manevrada devreye girer",
        "Yalnızca liman içinde devreye girmektedir",
      ],
      correctAnswer: 2,
      explanation:
        "Düşük yükte egzoz enerjisi turboşarjeri yeterince döndüremez; elektrikli üfleyici süpürme havasını sağlar ve yük yükselince otomatik olarak devreden çıkar.",
      category: "Dizel Motor",
    },
    {
      id: 217,
      question: "Yardımcı üfleyici çalışmazsa hangi sonuç doğar?",
      options: [
        "Yalnızca yağ basıncı kendiliğinden yükselir",
        "Yalnızca soğutma suyu debisi kendiliğinden artar",
        "Yalnızca yakıt tüketimi kendiliğinden yarılanır",
        "Manevrada eksik yanma ve zor kalkış olur",
      ],
      correctAnswer: 3,
      explanation:
        "Süpürme havası yetersiz kalır; motor zor yol alır, siyah duman verir ve süpürme kuşağında kurum birikimiyle yangın riski artar.",
      category: "Dizel Motor",
    },
    {
      id: 218,
      question: "VIT (değişken enjeksiyon zamanlaması) ne sağlar?",
      options: [
        "Kısmi yükte yakıt tüketimini düşürmek",
        "Yalnızca motor devrini kendiliğinden artırmak",
        "Yalnızca egzoz basıncını yükseltmektedir",
        "Yalnızca soğutma suyunu ısıtmaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "Yakıt pompasının avansı yüke göre değiştirilerek kısmi yüklerde de en yüksek yanma basıncına yaklaşılır; özgül yakıt tüketimi geniş yük bandında düşük kalır.",
      category: "Dizel Motor",
    },
    {
      id: 219,
      question: "VIT ayarında maksimum yanma basıncı neden sınırlanır?",
      options: [
        "Yalnızca egzoz rengini korumak amacıyla",
        "Mekanik dayanım sınırını aşmamak için",
        "Yalnızca yakıt sıcaklığını korumak için",
        "Yalnızca gürültüyü azaltmak amacıyla",
      ],
      correctAnswer: 1,
      explanation:
        "Yanma basıncı üreticinin verdiği sınırı aşarsa kapak, cıvata ve yataklar aşırı zorlanır; VIT bu yüzden basıncı sınırın hemen altında tutacak biçimde ayarlanır.",
      category: "Dizel Motor",
    },
    {
      id: 220,
      question: "İndike güç hangi ölçümden hesaplanır?",
      options: [
        "Yalnızca yakıt debisi ölçümünden",
        "Yalnızca egzoz sıcaklığı ölçümünden",
        "İndikatör diyagramının alanından",
        "Yalnızca soğutma suyu ölçümünden",
      ],
      correctAnswer: 2,
      explanation:
        "Diyagramın kapalı alanından ortalama indike basınç bulunur; bu değer strok hacmi, devir ve silindir sayısıyla çarpılarak indike güç hesaplanır.",
      category: "Dizel Motor",
    },
    {
      id: 221,
      question: "İndike güç ile fren gücü arasındaki fark neyi verir?",
      options: [
        "Yalnızca yakıtın kimyasal enerjisini verir",
        "Yalnızca soğutma kaybını vermektedir",
        "Yalnızca egzoz kaybını vermektedir",
        "Sürtünme ve yardımcı tahrik kaybını",
      ],
      correctAnswer: 3,
      explanation:
        "İndike güç silindir içinde üretilen, fren gücü ise şaftta ölçülen güçtür; aradaki fark yatak sürtünmesi ile pompa ve turboşarj yardımcılarının tükettiği güçtür.",
      category: "Dizel Motor",
    },
    {
      id: 222,
      question: "Mekanik verim nasıl tanımlanır?",
      options: [
        "Fren gücünün indike güce oranıdır",
        "Yalnızca indike gücün yakıta oranıdır",
        "Yalnızca devrin momente oranıdır",
        "Yalnızca basıncın hacme oranıdır",
      ],
      correctAnswer: 0,
      explanation:
        "Mekanik verim, şaftta alınabilen gücün silindirde üretilen güce oranıdır; büyük deniz dizellerinde tam yükte %85-92 aralığında kalır ve düşük yükte azalır.",
      category: "Dizel Motor",
    },
    {
      id: 223,
      question: "Fren gücü hangi düzenekle ölçülür?",
      options: [
        "Yalnızca termometre ile ölçülmektedir",
        "Şaft tork ölçer veya dinamometre ile",
        "Yalnızca manometre ile ölçülmektedir",
        "Yalnızca debimetre ile ölçülmektedir",
      ],
      correctAnswer: 1,
      explanation:
        "Torsiyometre şaftın burulma açısını ölçer ve devirle çarparak gücü verir; tezgâh testlerinde ise su veya elektrik dinamometresi kullanılır.",
      category: "Dizel Motor",
    },
    {
      id: 224,
      question: "Ortalama efektif basınç (MEP) neyi ifade eder?",
      options: [
        "Yalnızca en yüksek yanma basıncını",
        "Yalnızca süpürme havası basıncını",
        "Aynı işi verecek sabit eşdeğer basınç",
        "Yalnızca egzoz manifold basıncını",
      ],
      correctAnswer: 2,
      explanation:
        "MEP, çevrimde üretilen işi strok hacmine bölerek elde edilen kuramsal sabit basınçtır; farklı boyuttaki motorların yüklenme düzeyini karşılaştırmayı sağlar.",
      category: "Dizel Motor",
    },
    {
      id: 225,
      question: "MEP değerinin yükselmesi neyi gösterir?",
      options: [
        "Silindirin daha çok yüklendiğini gösterir",
        "Yalnızca devrin düştüğünü göstermektedir",
        "Yalnızca yağ basıncının arttığını gösterir",
        "Yalnızca deniz suyunun soğuduğunu gösterir",
      ],
      correctAnswer: 0,
      explanation:
        "Yüksek MEP o silindirde daha çok yakıt yakıldığı ve daha çok iş üretildiği anlamına gelir; silindirler arası MEP farkı yük dengesizliğinin göstergesidir.",
      category: "Dizel Motor",
    },
    {
      id: 226,
      question: "Özgül yakıt tüketimi (SFOC) hangi birimle verilir?",
      options: [
        "Yalnızca litre başına deniz mili olarak",
        "Kilovatsaat başına gram olarak verilir",
        "Yalnızca saat başına ton olarak verilir",
        "Yalnızca sefer başına varil olarak verilir",
      ],
      correctAnswer: 1,
      explanation:
        "SFOC, üretilen bir kilovatsaat için harcanan yakıtı gram cinsinden verir; modern iki zamanlı ana makinelerde 160-175 g/kWh aralığındadır.",
      category: "Dizel Motor",
    },
    {
      id: 227,
      question: "SFOC karşılaştırması yapılırken hangi düzeltme gerekir?",
      options: [
        "Yalnızca gemi hızına göre düzeltme",
        "Yalnızca sefer süresine göre düzeltme",
        "Yakıtın alt ısıl değerine göre düzeltme",
        "Yalnızca mürettebat sayısına göre düzeltme",
      ],
      correctAnswer: 2,
      explanation:
        "Farklı yakıtların enerji içeriği farklıdır; ölçülen tüketim referans alt ısıl değere göre düzeltilmeden tezgâh testi değeriyle karşılaştırılamaz.",
      category: "Dizel Motor",
    },
    {
      id: 228,
      question: "SFOC değerinin zamanla yükselmesi neyi gösterir?",
      options: [
        "Yalnızca yakıt fiyatının arttığını gösterir",
        "Yalnızca deniz suyunun ısındığını gösterir",
        "Yalnızca mürettebatın değiştiğini gösterir",
        "Motor veriminin düştüğünü göstermektedir",
      ],
      correctAnswer: 3,
      explanation:
        "Aynı güçte daha çok yakıt harcanması enjektör aşınması, turboşarjer kirlenmesi, segman kaçağı veya yanlış zamanlama anlamına gelir; trend izlemeyle erken yakalanır.",
      category: "Dizel Motor",
    },
    {
      id: 229,
      question: "Performans izlemede hangi değerler düzenli kaydedilir?",
      options: [
        "Basınçlar, sıcaklıklar, devir ve yakıt indeksi",
        "Yalnızca gemi konumu ve rota bilgisi",
        "Yalnızca mürettebat vardiya çizelgesi",
        "Yalnızca liman varış saati tahminleri",
      ],
      correctAnswer: 0,
      explanation:
        "Süpürme ve maksimum yanma basıncı, silindir egzoz sıcaklıkları, turboşarjer devri, yakıt indeksi ve ortam koşulları kaydedilir; hepsi referansa göre değerlendirilir.",
      category: "Dizel Motor",
    },
    {
      id: 230,
      question: "Trend analizinin tek seferlik ölçüme üstünlüğü nedir?",
      options: [
        "Yalnızca daha az veri gerektirmesidir",
        "Yavaş bozulmayı erken görebilmesidir",
        "Yalnızca daha ucuz olması durumudur",
        "Yalnızca daha kısa sürmesi durumudur",
      ],
      correctAnswer: 1,
      explanation:
        "Tek ölçüm normal görünse bile aylar içindeki kayma bozulmayı ortaya çıkarır; bakım arıza beklemeden, eğilim sınıra yaklaşınca planlanabilir.",
      category: "Dizel Motor",
    },
    {
      id: 231,
      question: "Performans ölçümleri hangi koşulda alınmalıdır?",
      options: [
        "Yalnızca fırtınalı havada alınmalıdır",
        "Yalnızca manevra sırasında alınmalıdır",
        "Kararlı yük ve benzer koşullarda alınır",
        "Yalnızca makine soğukken alınmalıdır",
      ],
      correctAnswer: 2,
      explanation:
        "Karşılaştırılabilir olması için ölçümler kararlı yükte, benzer draft ve hava koşullarında alınır; ortam sıcaklığı ve deniz suyu sıcaklığı da kaydedilir.",
      category: "Dizel Motor",
    },
    {
      id: 232,
      question: "Yük dengeleme (load balancing) neyi amaçlar?",
      options: [
        "Yalnızca motor devrini yükseltmeyi amaçlar",
        "Yalnızca yakıt tankını doldurmayı amaçlar",
        "Yalnızca egzoz borusunu temizlemeyi amaçlar",
        "Silindirlerin eşit yüklenmesini amaçlar",
      ],
      correctAnswer: 3,
      explanation:
        "Her silindirin yaklaşık aynı gücü üretmesi hedeflenir; aksi hâlde bazı silindirler aşırı yüklenir, egzoz sıcaklığı sapar ve parça ömrü kısalır.",
      category: "Dizel Motor",
    },
    {
      id: 233,
      question: "Yük dengeleme hangi ayarla yapılır?",
      options: [
        "Yakıt pompası indeks ayarı ile yapılır",
        "Yalnızca soğutma suyu debisi ile yapılır",
        "Yalnızca yağ basıncı ayarı ile yapılır",
        "Yalnızca hava filtresi ile yapılmaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "Silindir bazında yakıt pompası indeksi ayarlanarak püskürtülen miktar eşitlenir; ayar sonrası indikatör diyagramı ve egzoz sıcaklıkları yeniden ölçülür.",
      category: "Dizel Motor",
    },
    {
      id: 234,
      question: "Yük dengesizliğinin en görünür belirtisi nedir?",
      options: [
        "Yalnızca yağ renginin koyulaşmasıdır",
        "Silindirler arası egzoz sıcaklık farkıdır",
        "Yalnızca soğutma suyunun azalmasıdır",
        "Yalnızca yakıt tankının boşalmasıdır",
      ],
      correctAnswer: 1,
      explanation:
        "Normalde sıcaklıklar ortalamanın dar bir bandı içinde kalır; belirli bir silindirin sürekli yüksek veya düşük kalması dengesizliğin ilk göstergesidir.",
      category: "Dizel Motor",
    },
    {
      id: 235,
      question: "Silindir performans dengesizliği nasıl doğrulanır?",
      options: [
        "Yalnızca kulakla dinlenerek doğrulanır",
        "Yalnızca yağ analizi ile doğrulanmaktadır",
        "İndikatör ölçümü ve MEP karşılaştırmasıyla",
        "Yalnızca yakıt faturasıyla doğrulanmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "Her silindirden alınan diyagramdan ortalama indike basınç hesaplanır; değerler birbirine ve ortalamaya göre karşılaştırılarak sapan silindir belirlenir.",
      category: "Dizel Motor",
    },
    {
      id: 236,
      question: "Bir silindirin maksimum basıncı düşükse ilk ne kontrol edilir?",
      options: [
        "Yalnızca soğutma suyu genleşme tankı",
        "Yalnızca gemi draft değerleri kontrol edilir",
        "Yalnızca deniz suyu tuzluluğu kontrol edilir",
        "Enjeksiyon zamanlaması ve enjektör durumu",
      ],
      correctAnswer: 3,
      explanation:
        "Geç enjeksiyon, düşük yakıt miktarı veya bozuk meme tepe basıncını düşürür; ayrıca segman ve valf kaçağı da sıkıştırma basıncını azaltır.",
      category: "Dizel Motor",
    },
    {
      id: 237,
      question: "Liner aşınmasının ölçüldüğü standart yöntem nedir?",
      options: [
        "Belirli seviyelerde iki eksende çap ölçümü",
        "Yalnızca gömlek ağırlığının tartılması",
        "Yalnızca gömlek renginin incelenmesi",
        "Yalnızca gömlek boyunun ölçülmesi",
      ],
      correctAnswer: 0,
      explanation:
        "Gömlek üst, orta ve alt bölgelerde birbirine dik iki eksende ölçülür; aşınma oranı ve ovallik üretici sınırıyla karşılaştırılarak değişim zamanı planlanır.",
      category: "Dizel Motor",
    },
    {
      id: 238,
      question: "Gömlek yüzeyinin parlaklaşması (bore polish) neye yol açar?",
      options: [
        "Yalnızca gömlek ömrünü uzatmaktadır",
        "Yağ tutulamayıp tüketimin artmasına",
        "Yalnızca yakıt tüketiminin düşmesine",
        "Yalnızca egzoz sıcaklığının düşmesine",
      ],
      correctAnswer: 1,
      explanation:
        "Honlama izleri silinince yüzey yağ tutamaz; yağ filmi incelir, tüketim artar ve segman kaçağı ile aşınma hızlanır. Çözüm gömleğin yeniden honlanmasıdır.",
      category: "Dizel Motor",
    },
    {
      id: 239,
      question: "Piston tepesinde aşırı kurum birikimi neyi gösterir?",
      options: [
        "Yalnızca yağ basıncının yükseldiğini",
        "Yalnızca soğutma suyunun ısındığını",
        "Eksik yanma veya bozuk enjektörü",
        "Yalnızca motorun yeni olduğunu",
      ],
      correctAnswer: 2,
      explanation:
        "Kötü atomizasyon, yetersiz hava veya aşırı silindir yağı kurum birikimine yol açar; birikinti gömleği çizer ve segman kanallarını tıkayabilir.",
      category: "Dizel Motor",
    },
    {
      id: 240,
      question: "Bir silindirin egzoz sıcaklığı ötekilerden yüksekse olası neden nedir?",
      options: [
        "Yalnızca soğutma suyunun soğuk olması",
        "Yalnızca yağ seviyesinin yüksek olması",
        "Yalnızca gemi hızının düşük olması",
        "Geç yanma veya aşırı yakıt miktarı",
      ],
      correctAnswer: 3,
      explanation:
        "Geç enjeksiyon, sızdıran meme veya yüksek indeks o silindirde yanmayı genleşmeye taşır; egzoz sıcaklığı yükselir ve valf ile turboşarjer zorlanır.",
      category: "Dizel Motor",
    },
    {
      id: 241,
      question: "Tüm silindirlerde egzoz sıcaklığının birlikte yükselmesi neyi düşündürür?",
      options: [
        "Hava beslemesinin genel olarak yetersizliği",
        "Yalnızca tek bir enjektörün bozulduğunu",
        "Yalnızca tek bir supabın sızdırdığını",
        "Yalnızca tek bir segmanın kırıldığını",
      ],
      correctAnswer: 0,
      explanation:
        "Kirli hava filtresi, tıkalı şarj havası soğutucusu veya kirlenmiş turboşarjer tüm silindirlerde hava fazlalığını düşürür; sıcaklıklar topluca yükselir.",
      category: "Dizel Motor",
    },
    {
      id: 242,
      question: "Egzoz sıcaklığı sapmaları değerlendirilirken ne yapılır?",
      options: [
        "Yalnızca en yüksek değer dikkate alınır",
        "Ortalamaya göre sapma bandı incelenir",
        "Yalnızca en düşük değer dikkate alınır",
        "Yalnızca değerlerin toplamı incelenir",
      ],
      correctAnswer: 1,
      explanation:
        "Mutlak değer ortam koşullarıyla değişir; anlamlı olan her silindirin ortalamadan sapmasıdır. Sapma bandı üreticinin verdiği sınırın içinde kalmalıdır.",
      category: "Dizel Motor",
    },
    {
      id: 243,
      question: "Turboşarj surging olayı nasıl fark edilir?",
      options: [
        "Yalnızca yağ basıncının sabitlenmesiyle",
        "Yalnızca egzoz renginin açılmasıyla",
        "Yüksek sesli hava geri tepmesiyle",
        "Yalnızca devrin kendiliğinden artmasıyla",
      ],
      correctAnswer: 2,
      explanation:
        "Kompresörde akış ayrılınca hava periyodik olarak geri teper; gürültülü bir öksürme sesi duyulur, şarj basıncı dalgalanır ve rotor zorlanır.",
      category: "Dizel Motor",
    },
    {
      id: 244,
      question: "Surging riskini artıran işletme koşulu nedir?",
      options: [
        "Yalnızca sakin denizde tam yükte seyir",
        "Yalnızca limanda makine durdurulması",
        "Yalnızca soğuk hava koşullarında seyir",
        "Ağır havada ani yük değişimi ve kirlilik",
      ],
      correctAnswer: 3,
      explanation:
        "Pervanenin sudan çıkması ve hızlı yük değişimi çalışma noktasını surge hattına iter; kirli türbin veya tıkalı hava yolu da bu sınırı yaklaştırır.",
      category: "Dizel Motor",
    },
    {
      id: 245,
      question: "Surging görüldüğünde ilk müdahale nedir?",
      options: [
        "Yükü düşürüp hava yolunu incelemek",
        "Yalnızca devri hızla yükseltmektir",
        "Yalnızca alarmı susturup beklemektir",
        "Yalnızca yağ basıncını yükseltmektir",
      ],
      correctAnswer: 0,
      explanation:
        "Yük kademeli düşürülerek çalışma noktası surge hattından uzaklaştırılır; ardından filtre, şarj havası soğutucusu ve türbin kirliliği kontrol edilir.",
      category: "Dizel Motor",
    },
    {
      id: 246,
      question: "Yatak sıcaklığının yükselmesi hangi arızayı işaret eder?",
      options: [
        "Yalnızca yakıt kalitesinin düştüğünü",
        "Yağ filmi kaybı veya yatak aşınmasını",
        "Yalnızca egzoz basıncının arttığını",
        "Yalnızca deniz suyunun ısındığını",
      ],
      correctAnswer: 1,
      explanation:
        "Düşük yağ debisi, kirli yağ, aşırı boşluk veya hizasızlık yağ filmini inceltir; metal teması başlar, sıcaklık ve yağdaki metal içeriği birlikte yükselir.",
      category: "Dizel Motor",
    },
    {
      id: 247,
      question: "Karter sıcaklık izleme (oil mist detector) neyi önler?",
      options: [
        "Yalnızca yağ tüketiminin artmasını önler",
        "Yalnızca soğutma suyu kaybını önlemektedir",
        "Karter patlamasını erken uyarıyla önler",
        "Yalnızca yakıt kaçağını önlemektedir",
      ],
      correctAnswer: 2,
      explanation:
        "Aşırı ısınan yatak yağı buharlaştırıp yağ sisi oluşturur; dedektör bu sisi algılayıp alarm verir ve motor durdurularak karter patlaması önlenir.",
      category: "Dizel Motor",
    },
    {
      id: 248,
      question: "Sıcak nokta şüphesinde karter kapağı ne zaman açılır?",
      options: [
        "Yalnızca motor çalışırken hemen açılır",
        "Yalnızca alarm gelir gelmez hemen açılır",
        "Yalnızca ilk beş dakika içinde açılır",
        "Motor durdurulup yeterince soğuduktan sonra",
      ],
      correctAnswer: 3,
      explanation:
        "Kapağın erken açılması taze havayı sıcak yağ sisiyle buluşturup ikincil patlama yaratır; en az yirmi dakika beklenir ve önce havalandırma yapılır.",
      category: "Dizel Motor",
    },
    {
      id: 249,
      question: "Silindir yağının temel görevleri nelerdir?",
      options: [
        "Yağlama, sızdırmazlık, soğutma ve nötrleme",
        "Yalnızca gömleği boyamak ve süslemektir",
        "Yalnızca motorun sesini kısmak görevidir",
        "Yalnızca yakıt tüketimini ölçmek görevidir",
      ],
      correctAnswer: 0,
      explanation:
        "Silindir yağı sürtünmeyi azaltır, segman ile gömlek arasında gaz sızdırmazlığı sağlar, ısıyı taşır ve içerdiği baz sayesinde kükürt asidini nötrler.",
      category: "Dizel Motor",
    },
    {
      id: 250,
      question: "Silindir yağının baz sayısı (BN) neye göre seçilir?",
      options: [
        "Yalnızca motorun üretim yılına göre",
        "Yakıtın kükürt oranına göre seçilir",
        "Yalnızca deniz suyu sıcaklığına göre",
        "Yalnızca gemi hızına göre seçilmektedir",
      ],
      correctAnswer: 1,
      explanation:
        "Yüksek kükürtlü yakıtta daha çok asit oluşur ve yüksek BN'li yağ gerekir; düşük kükürtlü yakıtta yüksek BN kullanmak ise kalsiyum birikimi ve kazıma yaratır.",
      category: "Dizel Motor",
    },
    {
      id: 251,
      question: "Silindir yağı besleme oranının düşük olması ne yaratır?",
      options: [
        "Yalnızca yağ maliyetinin yükselmesini",
        "Yalnızca egzoz basıncının düşmesini",
        "Kazıma (scuffing) ve hızlı aşınma",
        "Yalnızca soğutma suyunun ısınmasını",
      ],
      correctAnswer: 2,
      explanation:
        "Yetersiz yağ filmi metal temasına yol açar; gömlek ve segmanda kazıma izleri oluşur, aşınma hızla artar ve güç kaybı görülür.",
      category: "Dizel Motor",
    },
    {
      id: 252,
      question: "Silindir yağı besleme oranı nasıl doğrulanır?",
      options: [
        "Yalnızca yağ faturasına bakılarak",
        "Yalnızca yağ renginin gözlenmesiyle",
        "Yalnızca yağ sıcaklığının ölçülmesiyle",
        "Sıyırma yağı analizi ve tüketim kaydıyla",
      ],
      correctAnswer: 3,
      explanation:
        "Gömlekten alınan sıyırma yağı numunesinde demir içeriği ve kalan baz sayısı ölçülür; sonuç ile günlük tüketim kaydı birlikte değerlendirilip oran ayarlanır.",
      category: "Dizel Motor",
    },
    {
      id: 253,
      question: "Krank mili kol muylusu yatağında aşırı boşluk ne yaratır?",
      options: [
        "Darbeli çalışma ve yağ basıncı düşüşü",
        "Yalnızca motor devrinin yükselmesini",
        "Yalnızca egzoz sıcaklığının düşmesini",
        "Yalnızca yakıt tüketiminin azalmasını",
      ],
      correctAnswer: 0,
      explanation:
        "Büyük boşlukta yağ kolayca kaçar, film taşıyamaz ve her iş zamanında darbe oluşur; sistem yağ basıncı düşer, gürültü ve metal içeriği artar.",
      category: "Dizel Motor",
    },
    {
      id: 254,
      question: "Motor yağında demir içeriğinin yükselmesi neyi gösterir?",
      options: [
        "Yalnızca yağın yeni değiştirildiğini",
        "Gömlek, segman veya yatak aşınmasını",
        "Yalnızca yakıt kalitesinin iyileştiğini",
        "Yalnızca soğutma suyunun karıştığını",
      ],
      correctAnswer: 1,
      explanation:
        "Aşınan demir esaslı yüzeyler yağa parçacık bırakır; düzenli yağ analizi bu artışı erken yakalar ve hangi bileşenin aşındığı element dağılımıyla ayırt edilir.",
      category: "Dizel Motor",
    },
    {
      id: 255,
      question: "Motorun ani durdurulması (shutdown) hangi durumda tetiklenir?",
      options: [
        "Yalnızca yakıt tankı azaldığında tetiklenir",
        "Yalnızca liman girişinde tetiklenmektedir",
        "Aşırı hız veya çok düşük yağ basıncında",
        "Yalnızca gemi hızlandığında tetiklenir",
      ],
      correctAnswer: 2,
      explanation:
        "Aşırı hız, kritik düşük yağ basıncı, yağ sisi alarmı ve çok yüksek ceket suyu sıcaklığı otomatik durdurma sebepleridir; koruma düzenleri düzenli test edilir.",
      category: "Dizel Motor",
    },
    {
      id: 256,
      question: "Slow down (yük düşürme) korumasının amacı nedir?",
      options: [
        "Yalnızca yakıt tüketimini azaltmaktır",
        "Yalnızca gemi hızını artırmak amacıdır",
        "Yalnızca alarm sesini kısmak amacıdır",
        "Durdurmadan hasarı sınırlandırmaktır",
      ],
      correctAnswer: 3,
      explanation:
        "Kritik olmayan sapmalarda motor durdurulmaz, yükü otomatik düşürülür; böylece hem hasar sınırlanır hem gemi manevra kabiliyetini tümüyle yitirmez.",
      category: "Dizel Motor",
    },
    {
      id: 257,
      question: "Dizel motorda kompresyon oranı düşerse ne olur?",
      options: [
        "Tutuşma zorlaşır ve verim düşer",
        "Yalnızca egzoz basıncı yükselmektedir",
        "Yalnızca yağ tüketimi kendiliğinden azalır",
        "Yalnızca motor devri kendiliğinden artar",
      ],
      correctAnswer: 0,
      explanation:
        "Sıkıştırma sonu sıcaklığı düşünce tutuşma gecikir; soğukta yol verme zorlaşır, yanma kötüleşir ve özgül yakıt tüketimi yükselir.",
      category: "Dizel Motor",
    },
    {
      id: 258,
      question: "İki zamanlı motorda süpürme kuşağı yangını neden çıkar?",
      options: [
        "Yalnızca deniz suyunun ısınmasından",
        "Biriken yağ ve kurumun tutuşmasından",
        "Yalnızca yakıt tankının dolmasından",
        "Yalnızca havalandırmanın açılmasından",
      ],
      correctAnswer: 1,
      explanation:
        "Segman kaçağıyla gelen sıcak gaz, süpürme kuşağında biriken yağ ve kurumu tutuşturur; egzoz sıcaklığı ve kuşak sıcaklığı birlikte yükselir.",
      category: "Dizel Motor",
    },
    {
      id: 259,
      question: "Dört zamanlı motorda supap oturma yüzeyi neden yanar?",
      options: [
        "Yalnızca yağ seviyesinin yükselmesinden",
        "Yalnızca soğutma suyunun soğumasından",
        "Tam kapanmayan supaptan gaz kaçmasından",
        "Yalnızca motorun yeni olmasından",
      ],
      correctAnswer: 2,
      explanation:
        "Yetersiz boşluk, kalıntı birikimi veya deforme yuva supabın tam oturmasını engeller; kaçan sıcak gaz dar bölgeden geçerken yüzeyi hızla yakar.",
      category: "Dizel Motor",
    },
    {
      id: 260,
      question: "Krank mili saptırma ölçümü hangi arızayı önceden gösterir?",
      options: [
        "Yalnızca enjektör memesinin tıkanmasını",
        "Yalnızca turboşarjerin kirlenmesini",
        "Yalnızca yakıt filtresinin dolmasını",
        "Ana yatak aşınması ve hizasızlığı",
      ],
      correctAnswer: 3,
      explanation:
        "Kol ağızları arasındaki açılma-kapanma değeri sınırı aşarsa ana yataklardan biri oturmuş veya tekne deformasyonu oluşmuş demektir; erken uyarı sağlar.",
      category: "Dizel Motor",
    },
    {
      id: 261,
      question: "Motor yol vermede hava alamıyorsa ilk ne kontrol edilir?",
      options: [
        "Hava tüpü basıncı ve ana yol verme valfi",
        "Yalnızca yakıt tankının seviyesi kontrol edilir",
        "Yalnızca soğutma suyu sıcaklığı kontrol edilir",
        "Yalnızca egzoz gazının rengi kontrol edilir",
      ],
      correctAnswer: 0,
      explanation:
        "Yetersiz tüp basıncı, kapalı kalan izolasyon valfi veya arızalı ana yol verme valfi en yaygın nedenlerdir; ayrıca turning gear kilidinin ayrıldığı doğrulanır.",
      category: "Dizel Motor",
    },
    {
      id: 262,
      question: "Yol verme havası valfi sızdırırsa ne olur?",
      options: [
        "Yalnızca hava tüpü basıncı yükselmektedir",
        "Hava borusu ısınır ve patlama riski doğar",
        "Yalnızca egzoz sıcaklığı düşmektedir",
        "Yalnızca yağ tüketimi azalmaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "Silindirdeki sıcak gaz hava hattına kaçar; boru ısınır, hattaki yağ buharı tutuşabilir. Bu yüzden alev tutucu ve patlama diski bulunur, boru sıcaklığı izlenir.",
      category: "Dizel Motor",
    },
    {
      id: 263,
      question: "Motor aşırı hız (overspeed) koruması ne yapar?",
      options: [
        "Yalnızca alarm verip kayda geçirir",
        "Yalnızca devri kademeli olarak yükseltir",
        "Yakıtı keserek motoru durdurmaktadır",
        "Yalnızca soğutma suyunu artırmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "Anma devrinin belirli bir yüzdesi aşılınca bağımsız koruma yakıt beslemesini keser; pervanenin sudan çıkması veya yük kaybı bu durumun tipik nedenidir.",
      category: "Dizel Motor",
    },
    {
      id: 264,
      question: "Emniyet valfi silindir kapağında hangi durumda açar?",
      options: [
        "Yalnızca yağ basıncı düştüğünde açmaktadır",
        "Yalnızca soğutma suyu kesildiğinde açar",
        "Yalnızca motor durdurulduğunda açmaktadır",
        "Yanma basıncı sınırı aştığında açmaktadır",
      ],
      correctAnswer: 3,
      explanation:
        "Su kaçağı veya aşırı yakıt nedeniyle basınç sınırı aşarsa valf açıp gazı boşaltır; böylece kapak ve cıvatalar kalıcı hasar görmeden korunur.",
      category: "Dizel Motor",
    },
    {
      id: 265,
      question: "Turning gear takılıyken motor neden çalıştırılamaz?",
      options: [
        "Kilitleme devresi yol vermeyi engeller",
        "Yalnızca yakıt pompası devre dışı kalır",
        "Yalnızca soğutma pompası durdurulur",
        "Yalnızca alarm paneli devre dışı kalır",
      ],
      correctAnswer: 0,
      explanation:
        "Turning gear takılıyken çalışan bir kilit devresi yol verme havasını keser; aksi hâlde dişli takımı ve mil ağır hasar görür.",
      category: "Dizel Motor",
    },
    {
      id: 266,
      question: "İndikatör musluğu açık çevirmenin (blow-through) amacı nedir?",
      options: [
        "Yalnızca silindiri ısıtmak amacıdır",
        "Silindirde biriken sıvıyı dışarı atmak",
        "Yalnızca egzoz gazını ölçmek amacıdır",
        "Yalnızca yağ basıncını yükseltmektir",
      ],
      correctAnswer: 1,
      explanation:
        "Duran motorda silindire su veya yakıt sızmış olabilir; musluklar açıkken döndürülüp hava verilerek sıvı atılır, aksi hâlde hidrolik kilitlenme oluşur.",
      category: "Dizel Motor",
    },
    {
      id: 267,
      question: "Hidrolik kilitlenme (hydraulic lock) neye yol açar?",
      options: [
        "Yalnızca motor devrinin yükselmesine",
        "Yalnızca egzoz sıcaklığının düşmesine",
        "Biyel ve kapakta ağır mekanik hasara",
        "Yalnızca yakıt tüketiminin azalmasına",
      ],
      correctAnswer: 2,
      explanation:
        "Sıkışmayan sıvı piston üst ölü noktaya gelirken basıncı bir anda çok yükseltir; biyel eğilir, kapak cıvataları kopar ve krank hasar görebilir.",
      category: "Dizel Motor",
    },
    {
      id: 268,
      question: "Egzoz valfinin hidrolik açılma düzeneği ne sağlar?",
      options: [
        "Yalnızca valfin ağırlığını artırmaktadır",
        "Yalnızca valfin rengini korumaktadır",
        "Yalnızca valfin boyunu uzatmaktadır",
        "Zamanlamayı esnek ve hassas kılmaktadır",
      ],
      correctAnswer: 3,
      explanation:
        "Kam hareketinin hidrolik olarak iletilmesi uzun mesafede kayıp yaratmaz ve açılma anını yüke göre değiştirmeye izin verir; kapanma hava yayı ile yumuşatılır.",
      category: "Dizel Motor",
    },
    {
      id: 269,
      question: "Egzoz valfinin dönme (rotation) düzeneği neyi sağlar?",
      options: [
        "Oturma yüzeyinin eşit aşınmasını sağlar",
        "Yalnızca valfin sesini kısmayı sağlar",
        "Yalnızca valfin ağırlığını azaltır",
        "Yalnızca valfin boyanmasını sağlar",
      ],
      correctAnswer: 0,
      explanation:
        "Egzoz gazı akımıyla dönen valf her açılışta farklı noktadan oturur; sıcaklık ve aşınma yüzeye eşit dağılır, kalıntı birikimi de sıyrılır.",
      category: "Dizel Motor",
    },
    {
      id: 270,
      question: "Motor soğutma suyu sıcaklığı neden düşük tutulmaz?",
      options: [
        "Yalnızca pompayı korumak amacıyladır",
        "Asit yoğuşup gömleği aşındırdığı için",
        "Yalnızca yakıt tüketimini artırmak için",
        "Yalnızca gürültüyü azaltmak amacıyladır",
      ],
      correctAnswer: 1,
      explanation:
        "Gömlek yüzeyi çiy noktasının altına inerse kükürt asidi yoğuşur ve soğuk korozyon başlar; bu yüzden ceket suyu çıkışı 80-90 °C dolayında tutulur.",
      category: "Dizel Motor",
    },
    {
      id: 271,
      question: "Piston soğutma yağının çıkış sıcaklığı neden izlenir?",
      options: [
        "Yalnızca yağ tüketimini hesaplamak için",
        "Yalnızca pompa devrini ayarlamak için",
        "Soğutma yeterliliğini doğrulamak için",
        "Yalnızca yakıt kalitesini görmek için",
      ],
      correctAnswer: 2,
      explanation:
        "Yükselen çıkış sıcaklığı yetersiz debi veya tıkalı geçit anlamına gelir; piston tacı aşırı ısınır, çatlak ve tepe deformasyonu riski doğar.",
      category: "Dizel Motor",
    },
    {
      id: 272,
      question: "Ceket suyu genleşme tankı seviyesinin düşmesi neyi gösterir?",
      options: [
        "Yalnızca suyun buharlaştığını göstermekte",
        "Yalnızca pompanın hızlandığını göstermekte",
        "Yalnızca termostatın açıldığını göstermekte",
        "Devrede kaçak olduğunu göstermektedir",
      ],
      correctAnswer: 3,
      explanation:
        "Seviye düşüşü gömlek contası, soğutucu veya boru kaçağı anlamına gelir; ayrıca yağa su karışıp karışmadığı ve egzozda buhar olup olmadığı kontrol edilir.",
      category: "Dizel Motor",
    },
    {
      id: 273,
      question: "Motor yağ filtresi fark basıncının artması neyi gösterir?",
      options: [
        "Filtre elemanının tıkandığını göstermekte",
        "Yalnızca yağ sıcaklığının düştüğünü",
        "Yalnızca yağ seviyesinin arttığını",
        "Yalnızca pompanın durduğunu gösterir",
      ],
      correctAnswer: 0,
      explanation:
        "Giriş-çıkış farkı elemandaki birikimle büyür; sınır aşılınca baypas açılır ve filtresiz yağ dolaşır. Bu yüzden fark basıncı alarmı ciddiye alınır.",
      category: "Dizel Motor",
    },
    {
      id: 274,
      question: "Kam mili tahrik zincirinin gerginliği neden kontrol edilir?",
      options: [
        "Yalnızca zincirin rengini korumak için",
        "Zamanlamanın kaymasını önlemek için",
        "Yalnızca zincir ağırlığını ölçmek için",
        "Yalnızca zincirin sesini kısmak için",
      ],
      correctAnswer: 1,
      explanation:
        "Gevşeyen zincir kam milinin krank miline göre konumunu kaydırır; enjeksiyon ve valf zamanlaması bozulur, performans düşer ve mekanik temas riski doğar.",
      category: "Dizel Motor",
    },
    {
      id: 275,
      question: "Yakıt pompası plunger'ının sızdırması ne yaratır?",
      options: [
        "Yalnızca yağ basıncının yükselmesini",
        "Yalnızca soğutma suyunun ısınmasını",
        "Enjeksiyon basıncında ve miktarda düşüş",
        "Yalnızca egzoz gazının renginin açılmasını",
      ],
      correctAnswer: 2,
      explanation:
        "Aşınan plunger ve gömlek arasında yakıt geri kaçar; basınç geç yükselir, püskürtülen miktar azalır ve o silindirin gücü ile egzoz sıcaklığı düşer.",
      category: "Dizel Motor",
    },
    {
      id: 276,
      question: "Yakıt sisteminde havanın kalması hangi belirtiyi verir?",
      options: [
        "Yalnızca yağ basıncının yükselmesini",
        "Yalnızca soğutma suyunun azalmasını",
        "Yalnızca egzoz basıncının artmasını",
        "Düzensiz çalışma ve güç dalgalanması",
      ],
      correctAnswer: 3,
      explanation:
        "Sıkışabilir hava enjeksiyon basıncını düşürür ve püskürtmeyi kesintiye uğratır; motor tekler, devir dalgalanır. Çözüm sistemin havasının alınmasıdır.",
      category: "Dizel Motor",
    },
    {
      id: 277,
      question: "Motor devreye alınırken yük neden kademeli artırılır?",
      options: [
        "Termal gerilmeyi sınırlandırabilmek için",
        "Yalnızca yakıt tasarrufu sağlamak için",
        "Yalnızca gürültüyü azaltabilmek için",
        "Yalnızca alarmları test edebilmek için",
      ],
      correctAnswer: 0,
      explanation:
        "Ani yükleme gömlek, kapak ve piston arasında büyük sıcaklık farkı yaratır; kademeli ısınma termal şoku ve çatlak riskini önler.",
      category: "Dizel Motor",
    },
    {
      id: 278,
      question: "Ön ısıtma (pre-heating) sistemi ne sağlar?",
      options: [
        "Yalnızca yakıt tüketimini iki katına çıkarır",
        "Duran motoru ısıtıp hazır tutmaktadır",
        "Yalnızca egzoz sıcaklığını düşürmektedir",
        "Yalnızca yağ basıncını yükseltmektedir",
      ],
      correctAnswer: 1,
      explanation:
        "Ceket suyu dış kaynakla ısıtılarak motor gövdesi sıcak tutulur; bu sayede ani yol vermede termal şok oluşmaz ve makine hızla yük alabilir.",
      category: "Dizel Motor",
    },
    {
      id: 279,
      question: "Uzun süre düşük yükte çalışmanın sakıncası nedir?",
      options: [
        "Yalnızca motor devrinin yükselmesidir",
        "Yalnızca yağ basıncının yükselmesidir",
        "Kurum birikimi ve kirlenmenin artması",
        "Yalnızca soğutma suyunun donmasıdır",
      ],
      correctAnswer: 2,
      explanation:
        "Düşük yükte sıcaklıklar düşer ve yanma bozulur; turboşarjer, süpürme kuşağı ve ekonomizer kurumla dolar. Bu yüzden düzenli olarak yük yükseltilir.",
      category: "Dizel Motor",
    },
    {
      id: 280,
      question: "Motor durdurulduktan sonra yağ pompası neden bir süre çalışır?",
      options: [
        "Yalnızca yağ tüketimini artırmak amacıyla",
        "Yalnızca yağ seviyesini ölçmek amacıyla",
        "Yalnızca yakıt tasarrufu sağlamak amacıyla",
        "Sıcak yatak ve pistonu soğutmak için",
      ],
      correctAnswer: 3,
      explanation:
        "Durdurma sonrası birikmiş ısı yatak ve piston tacında yükselmeye devam eder; yağ dolaşımı sürdürülerek bu ısı taşınır ve yağın kavrulması engellenir.",
      category: "Dizel Motor",
    },
    {
      id: 281,
      question: "Ana makine geri yol verilirken hangi düzenek değişir?",
      options: [
        "Ters kam konumu ve yol verme sırası",
        "Yalnızca yağ filtresi değiştirilmektedir",
        "Yalnızca soğutma pompası değiştirilir",
        "Yalnızca hava filtresi değiştirilmektedir",
      ],
      correctAnswer: 0,
      explanation:
        "Yakıt ve yol verme hava dağıtımı ters kam veya elektronik zamanlama ile değiştirilir; makine durdurulup ters yönde yol verilerek pervane geri döndürülür.",
      category: "Dizel Motor",
    },
    {
      id: 282,
      question: "Elektronik kontrollü motorda kam mili yerine ne bulunur?",
      options: [
        "Yalnızca daha büyük bir kam mili bulunur",
        "Hidrolik aktüatör ve kontrol yazılımı",
        "Yalnızca mekanik bir regülatör bulunur",
        "Yalnızca ek bir yakıt pompası bulunur",
      ],
      correctAnswer: 1,
      explanation:
        "Sunucu yağ basıncıyla çalışan aktüatörler enjeksiyon ve egzoz valfini sürer; zamanlama yazılımdan yüke göre ayarlandığından geniş bantta verim ve emisyon iyileşir.",
      category: "Dizel Motor",
    },
    {
      id: 283,
      question: "Elektronik motorda sunucu yağ (servo oil) sisteminin görevi nedir?",
      options: [
        "Yalnızca yatakları yağlamak görevidir",
        "Yalnızca pistonu soğutmak görevidir",
        "Aktüatörleri yüksek basınçla sürmek",
        "Yalnızca yakıtı ısıtmak görevi görmektedir",
      ],
      correctAnswer: 2,
      explanation:
        "Yüksek basınçlı yağ pompaları 200-300 bar üretir; bu basınç enjeksiyon ve egzoz valfi aktüatörlerini sürer. Yağ temizliği bu sistemde kritik önemdedir.",
      category: "Dizel Motor",
    },
    {
      id: 284,
      question: "Motorun tezgâh testi (shop test) neyi belgeler?",
      options: [
        "Yalnızca motorun boyandığını belgeler",
        "Yalnızca motorun ağırlığını belgelemekte",
        "Yalnızca motorun rengini belgelemektedir",
        "Anma güçte performans ve referans değerleri",
      ],
      correctAnswer: 3,
      explanation:
        "Üretici tesisinde farklı yüklerde ölçülen basınç, sıcaklık ve tüketim değerleri kaydedilir; gemideki performans izlemesi bu referans değerlerle karşılaştırılır.",
      category: "Dizel Motor",
    },
    {
      id: 285,
      question: "Motorun NOx teknik dosyası neyi içerir?",
      options: [
        "Onaylı ayarlar ve bileşen listesi",
        "Yalnızca motorun satın alma bedeli",
        "Yalnızca motorun taşıma belgeleri",
        "Yalnızca motorun boya renk kodları",
      ],
      correctAnswer: 0,
      explanation:
        "Dosya, NOx sertifikasına esas olan bileşenleri, ayar değerlerini ve izin verilen ayar aralıklarını listeler; bu sınırların dışına çıkan ayar uygunsuzluk sayılır.",
      category: "Dizel Motor",
    },
    {
      id: 286,
      question: "Motor bileşeni değiştirilirken NOx uyumu nasıl korunur?",
      options: [
        "Yalnızca daha ucuz parça seçilerek korunur",
        "Teknik dosyada onaylı parça kullanılarak",
        "Yalnızca parça boyanarak korunmaktadır",
        "Yalnızca parça tartılarak korunmaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "Enjektör, kam ve türbin nozulu gibi parçalar NOx salımını etkiler; yalnızca teknik dosyada tanımlı onaylı tipler kullanılır ve değişim kayda geçirilir.",
      category: "Dizel Motor",
    },
    {
      id: 287,
      question: "Motorun ısı dengesi (heat balance) neyi gösterir?",
      options: [
        "Yalnızca yakıt tankının seviyesini gösterir",
        "Yalnızca gemi hızının değişimini gösterir",
        "Yakıt enerjisinin nereye gittiğini gösterir",
        "Yalnızca mürettebat sayısını göstermektedir",
      ],
      correctAnswer: 2,
      explanation:
        "Yakıtın taşıdığı enerjinin ne kadarının şafta, ne kadarının egzoza, soğutma suyuna ve radyasyona gittiğini yüzde olarak verir; atık ısı geri kazanımı buna dayanır.",
      category: "Dizel Motor",
    },
    {
      id: 288,
      question: "Egzoz gazının taşıdığı atık ısı nerede değerlendirilir?",
      options: [
        "Yalnızca hava filtresinde değerlendirilir",
        "Yalnızca yakıt pompasında değerlendirilir",
        "Yalnızca sintine tankında değerlendirilir",
        "Egzoz gazı ekonomizerinde değerlendirilir",
      ],
      correctAnswer: 3,
      explanation:
        "Bacaya giden sıcak gaz ekonomizerden geçirilerek buhar üretilir; bu buhar ısıtma ve servis ihtiyacını karşılar, büyük gemilerde türbinle elektrik de üretilir.",
      category: "Dizel Motor",
    },
    {
      id: 289,
      question: "Motorun anma sürekli gücü (MCR) neyi ifade eder?",
      options: [
        "Sürekli çalışılabilecek en yüksek güç",
        "Yalnızca kısa süreli aşırı yük gücü",
        "Yalnızca manevrada kullanılan güç",
        "Yalnızca boşta çalışma gücüdür",
      ],
      correctAnswer: 0,
      explanation:
        "MCR, motorun tasarım ömrü boyunca sürekli üretebileceği en yüksek güçtür; işletmede genelde bunun %75-85'i olan servis gücünde çalışılır.",
      category: "Dizel Motor",
    },
    {
      id: 290,
      question: "Pervane yasası (propeller law) neyi anlatır?",
      options: [
        "Yalnızca yakıtın devirle sabit kaldığını",
        "Gücün devrin küpüyle değiştiğini anlatır",
        "Yalnızca momentin devirden bağımsızlığını",
        "Yalnızca basıncın devirle azaldığını anlatır",
      ],
      correctAnswer: 1,
      explanation:
        "Sabit hatveli pervanede moment devrin karesiyle, güç ise küpüyle değişir; motorun yük eğrisi bu yasa üzerinden çizilir ve aşırı yükleme bu eğriyle denetlenir.",
      category: "Dizel Motor",
    },
    {
      id: 291,
      question: "Ağır pervane (heavy propeller) durumu ne demektir?",
      options: [
        "Yalnızca pervanenin ağırlaştığı durumdur",
        "Yalnızca pervanenin küçüldüğü durumdur",
        "Aynı devirde daha çok güç gerekmesi",
        "Yalnızca pervanenin durduğu durumdur",
      ],
      correctAnswer: 2,
      explanation:
        "Gövde kirlenmesi, ağır hava veya sığ su nedeniyle pervane daha çok direnç görür; motor aynı devri tutmak için daha yüksek indekste çalışır ve termik olarak zorlanır.",
      category: "Dizel Motor",
    },
    {
      id: 292,
      question: "Motorun aşırı yüklenmesi hangi göstergeden anlaşılır?",
      options: [
        "Yalnızca yağ seviyesinin düşmesinden",
        "Yalnızca soğutma suyunun azalmasından",
        "Yalnızca yakıt tankının boşalmasından",
        "Yüksek yakıt indeksi ve egzoz sıcaklığı",
      ],
      correctAnswer: 3,
      explanation:
        "Aynı devirde normalin üstünde indeks ve egzoz sıcaklığı termik aşırı yüklenmeyi gösterir; sürdürülürse valf, piston ve turboşarjer ömrü hızla kısalır.",
      category: "Dizel Motor",
    },
    {
      id: 293,
      question: "Motorun titreşim sınırları neden izlenir?",
      options: [
        "Gevşeme ve yorulma hasarını önlemek için",
        "Yalnızca gürültüyü ölçebilmek amacıyladır",
        "Yalnızca yakıt tüketimini ölçmek amacıyla",
        "Yalnızca mürettebat konforu amacıyladır",
      ],
      correctAnswer: 0,
      explanation:
        "Aşırı titreşim cıvata gevşemesi, boru çatlağı ve yatak hasarı üretir; ölçüm noktalarındaki değerler üretici ve klas sınırlarıyla karşılaştırılır.",
      category: "Dizel Motor",
    },
    {
      id: 294,
      question: "Motor temeli cıvatalarının kontrolü neden önemlidir?",
      options: [
        "Yalnızca cıvataların rengini korumak için",
        "Hizanın ve titreşim düzeyinin korunması için",
        "Yalnızca cıvataların ağırlığını ölçmek için",
        "Yalnızca cıvataların sayısını saymak için",
      ],
      correctAnswer: 1,
      explanation:
        "Gevşeyen temel cıvataları motorun kaymasına ve şaft hizasının bozulmasına yol açar; chock oturması ve cıvata ön gerilmesi periyodik olarak denetlenir.",
      category: "Dizel Motor",
    },
    {
      id: 295,
      question: "Motor bakımında açılan parçaların işaretlenmesi neden gerekir?",
      options: [
        "Yalnızca parçaların rengini belirlemek için",
        "Yalnızca parçaların ağırlığını bulmak için",
        "Aynı yerine ve aynı yönde takılabilmesi için",
        "Yalnızca parçaların sayısını saymak için",
      ],
      correctAnswer: 2,
      explanation:
        "Yatak kepleri, biyel ve segmanlar birlikte alıştığından yerleri ve yönleri değişirse temas yüzeyi bozulur; söküm sırasında işaretleme bu hatayı önler.",
      category: "Dizel Motor",
    },
    {
      id: 296,
      question: "Büyük revizyon sonrası motor neden kademeli alıştırılır?",
      options: [
        "Yalnızca yakıt tasarrufu sağlamak amacıyla",
        "Yalnızca alarmları test edebilmek amacıyla",
        "Yalnızca gürültüyü ölçebilmek amacıyla",
        "Yeni yüzeylerin oturmasını sağlamak için",
      ],
      correctAnswer: 3,
      explanation:
        "Yeni segman ve yatak yüzeyleri tam temasa ancak kademeli yüklemeyle ulaşır; erken tam yük kazıma ve aşırı ısınma yaratır. Bu sürede sıcaklıklar sık izlenir.",
      category: "Dizel Motor",
    },
  ],
};
