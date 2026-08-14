import type { QuizQuestion } from "@/types/quiz";

/**
 * Konu doldurma bankası 11 — akışkanlar mekaniği konu bankasında konu başına
 * en az 8 soru hedefini tutturmak için yazılan ek sorular.
 *
 * `exerciseQuestionDistribution.ts` soruları konu başlıklarıyla sözcük örtüşmesine
 * göre eşlediğinden her soru hedeflediği konunun kendi terminolojisini kullanır;
 * aksi hâlde benzerlik puanı soruyu komşu konuya taşır. Birbirine yakın konular
 * (basınç birimleri/mutlak-manometrik, Darcy-Weisbach/Moody, seri-paralel boru/
 * seri-paralel pompa) bilinçli olarak ayrı sözcük dağarcığıyla yazılmıştır.
 *
 * Numaralandırma taban + devam + vaka bankalarının ardından sürer (155'ten
 * başlar); `machineQuizDataIndex.ts` bankaları slug bazında bu sırayla birleştirir.
 */
export const machineQuizQuestionsTopicFill11: Record<string, QuizQuestion[]> = {
  "fluid-mechanics": [
    {
      id: 155,
      question: "Basıncın SI birimi hangisidir?",
      options: [
        "Paskal (N/m²) birimidir",
        "Newton (N) birimidir",
        "Joule (J) birimidir",
        "Watt (W) birimidir",
      ],
      correctAnswer: 0,
      explanation:
        "Basınç birim alana düşen kuvvettir ve SI birimi paskaldır; 1 Pa = 1 N/m². Uygulamada bar (10⁵ Pa) ve psi de yaygın kullanılır.",
      category: "Akışkanlar",
    },
    {
      id: 156,
      question: "1 bar kaç paskala eşittir?",
      options: [
        "1.000 paskala eşittir",
        "100.000 paskala eşittir",
        "10 paskala eşittir",
        "1.000.000 paskala eşittir",
      ],
      correctAnswer: 1,
      explanation:
        "1 bar = 100.000 Pa = 100 kPa'dır ve deniz seviyesindeki atmosfer basıncına çok yakındır; bu yüzden pratik hesaplarda tercih edilir.",
      category: "Akışkanlar",
    },
    {
      id: 157,
      question: "Basınç ile kuvvet arasındaki ilişki nasıldır?",
      options: [
        "Basınç kuvvet ile alanın çarpımıdır",
        "Basınç yalnızca kuvvete eşit sayılır",
        "Basınç kuvvetin alana bölümüdür",
        "Basınç yalnızca alana eşit sayılır",
      ],
      correctAnswer: 2,
      explanation:
        "p = F/A bağıntısı geçerlidir; aynı kuvvet küçük alana uygulandığında basınç büyür. Hidrolik sistemlerin çalışma ilkesi bu bağıntıya dayanır.",
      category: "Akışkanlar",
    },
    {
      id: 158,
      question: "Durgun sıvıda hidrostatik basınç derinlikle nasıl değişir?",
      options: [
        "Derinlikle azalarak değişmektedir",
        "Derinlikten bağımsız sabit kalır",
        "Yalnızca kabın şekline bağlıdır",
        "Derinlikle doğrusal olarak artar",
      ],
      correctAnswer: 3,
      explanation:
        "p = ρgh bağıntısı gereği basınç, sıvı yoğunluğu ve derinlikle doğru orantılı artar; kabın biçimi ve toplam hacmi bu değeri değiştirmez.",
      category: "Akışkanlar",
    },
    {
      id: 159,
      question: "Manometrik (gauge) basınç neye göre ölçülür?",
      options: [
        "Yerel atmosfer basıncına göre ölçülür",
        "Yalnızca mutlak sıfıra göre ölçülür",
        "Yalnızca deniz seviyesine göre ölçülür",
        "Yalnızca sıvı yoğunluğuna göre ölçülür",
      ],
      correctAnswer: 0,
      explanation:
        "Manometreler atmosferi sıfır kabul eder; okunan değer gauge basınçtır. Mutlak basınç, gauge değere yerel atmosfer basıncı eklenerek bulunur.",
      category: "Akışkanlar",
    },
    {
      id: 160,
      question: "Mutlak basınç nasıl hesaplanır?",
      options: [
        "Gauge basınçtan atmosfer çıkarılarak",
        "Gauge basınca atmosfer eklenerek",
        "Yalnızca gauge basıncın yarısı alınarak",
        "Yalnızca atmosfer basıncı alınarak",
      ],
      correctAnswer: 1,
      explanation:
        "Mutlak basınç, gauge basınç ile atmosfer basıncının toplamıdır; vakum bölgesinde gauge değer negatif olur ve mutlak basınç atmosferin altına iner.",
      category: "Akışkanlar",
    },
    {
      id: 161,
      question: "Vakum basıncı hangi aralıkta bulunur?",
      options: [
        "Atmosferin üzerindeki bölgede bulunur",
        "Yalnızca mutlak sıfırın altında bulunur",
        "Sıfır ile atmosfer basıncı arasında",
        "Yalnızca deniz seviyesinde bulunur",
      ],
      correctAnswer: 2,
      explanation:
        "Vakum, mutlak basıncın atmosferin altında ama mutlak sıfırın üstünde olduğu bölgedir; kondenser ve evaporatör bu bölgede çalışır.",
      category: "Akışkanlar",
    },
    {
      id: 162,
      question: "Mutlak basınç neden bazı hesaplarda zorunludur?",
      options: [
        "Yalnızca ölçüm kolaylığı sağladığı için",
        "Yalnızca daha küçük sayı verdiği için",
        "Yalnızca manometre gerektirmediği için",
        "Gaz yasaları mutlak değer istediği için",
      ],
      correctAnswer: 3,
      explanation:
        "İdeal gaz denklemi ve termodinamik çevrim hesapları mutlak basınç ve mutlak sıcaklık ister; gauge değer kullanılırsa sonuç sistematik olarak yanlış çıkar.",
      category: "Akışkanlar",
    },
    {
      id: 163,
      question: "Pascal prensibi neyi ifade eder?",
      options: [
        "Basınç kapalı sıvıda her yöne iletilir",
        "Yalnızca basıncın derinlikle arttığını",
        "Yalnızca sıvının sıkışmaz olduğunu",
        "Yalnızca sıvının viskoz olduğunu",
      ],
      correctAnswer: 0,
      explanation:
        "Kapalı bir kaptaki sıvıya uygulanan basınç değişimi, sıvının her noktasına ve kabın her yüzeyine azalmadan iletilir; hidrolik pres bu ilkeyle çalışır.",
      category: "Akışkanlar",
    },
    {
      id: 164,
      question: "Hidrolik krikoda küçük kuvvetle büyük yük nasıl kaldırılır?",
      options: [
        "Yalnızca sıvının ısıtılması yoluyla",
        "Piston alanları farklı seçilerek",
        "Yalnızca pompanın hızlandırılmasıyla",
        "Yalnızca boru çapı büyütülerek",
      ],
      correctAnswer: 1,
      explanation:
        "Basınç her iki pistonda eşit olduğundan kuvvet alanla orantılıdır; büyük pistonda üretilen kuvvet alan oranı kadar büyür, buna karşılık strok aynı oranda kısalır.",
      category: "Akışkanlar",
    },
    {
      id: 165,
      question: "Düz bir yüzeye etkiyen bileşke basınç kuvveti nasıl bulunur?",
      options: [
        "Yalnızca yüzey alanı ile bulunur",
        "Yalnızca en büyük basınçla bulunur",
        "Ağırlık merkezindeki basınç ile alan çarpımı",
        "Yalnızca sıvı hacmi ile bulunur",
      ],
      correctAnswer: 2,
      explanation:
        "Bileşke kuvvet, yüzeyin ağırlık merkezindeki basıncın yüzey alanıyla çarpımına eşittir; kuvvetin uygulama noktası ise ağırlık merkezinden biraz daha derindedir.",
      category: "Akışkanlar",
    },
    {
      id: 166,
      question: "Basınç merkezi (center of pressure) nerede bulunur?",
      options: [
        "Her zaman yüzeyin tam ortasındadır",
        "Her zaman yüzeyin üst kenarındadır",
        "Her zaman sıvı yüzeyinin üstündedir",
        "Ağırlık merkezinden daha derindedir",
      ],
      correctAnswer: 3,
      explanation:
        "Basınç derinlikle arttığından bileşke kuvvet alt bölgeye kayar; bu yüzden basınç merkezi daima yüzeyin ağırlık merkezinden daha aşağıda bulunur.",
      category: "Akışkanlar",
    },
    {
      id: 167,
      question: "Eğri yüzeye etkiyen basınç kuvveti nasıl çözümlenir?",
      options: [
        "Yatay ve düşey bileşenlere ayrılarak",
        "Yalnızca yüzey alanı hesaplanarak",
        "Yalnızca yüzey boyu ölçülerek",
        "Yalnızca sıvı sıcaklığı ölçülerek",
      ],
      correctAnswer: 0,
      explanation:
        "Yatay bileşen, yüzeyin düşey izdüşümüne etkiyen kuvvete eşittir; düşey bileşen ise yüzeyin üzerindeki gerçek veya sanal sıvı ağırlığına eşittir.",
      category: "Akışkanlar",
    },
    {
      id: 168,
      question: "Tank perdesine etkiyen basınç kuvveti hangi durumda büyür?",
      options: [
        "Yalnızca tank boyu kısaldıkça büyür",
        "Sıvı derinliği ve yoğunluğu arttıkça",
        "Yalnızca tank rengi koyulaştıkça büyür",
        "Yalnızca dış hava sıcaklığı arttıkça",
      ],
      correctAnswer: 1,
      explanation:
        "Kuvvet yoğunluk, yerçekimi ve derinliğin karesiyle büyür; bu yüzden derin tanklarda perde kalınlığı ve takviye düzeni derinliğe göre boyutlandırılır.",
      category: "Akışkanlar",
    },
    {
      id: 169,
      question: "Arşimet ilkesine göre yüzdürme kuvveti neye eşittir?",
      options: [
        "Yalnızca cismin kendi ağırlığına",
        "Yalnızca cismin yüzey alanına",
        "Taşırılan sıvının ağırlığına eşittir",
        "Yalnızca cismin sıcaklığına eşittir",
      ],
      correctAnswer: 2,
      explanation:
        "Sıvıya batan cisme, yer değiştirdiği sıvının ağırlığı kadar yukarı yönlü kuvvet etkir; gemi de deplasmanı kadar suyu taşırarak yüzer.",
      category: "Akışkanlar",
    },
    {
      id: 170,
      question: "Bir cismin sıvıda yüzmesi hangi koşulda gerçekleşir?",
      options: [
        "Yalnızca cisim küçük olduğunda yüzer",
        "Yalnızca cisim boyandığında yüzer",
        "Yalnızca sıvı sıcak olduğunda yüzer",
        "Ortalama yoğunluğu sıvıdan küçükse",
      ],
      correctAnswer: 3,
      explanation:
        "Cismin ortalama yoğunluğu sıvınınkinden küçükse yüzdürme kuvveti ağırlığı aşar ve cisim yüzer; çelik gemi de içindeki boşluk sayesinde bu koşulu sağlar.",
      category: "Akışkanlar",
    },
    {
      id: 171,
      question: "Gemi tatlı sudan tuzlu suya geçince ne olur?",
      options: [
        "Su çekimi (draft) bir miktar azalır",
        "Su çekimi bir miktar artmaktadır",
        "Deplasman kendiliğinden artmaktadır",
        "Ağırlık kendiliğinden azalmaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "Tuzlu su daha yoğun olduğundan aynı ağırlığı taşımak için daha az hacim yeterlidir; gemi biraz yükselir. Bu fark tatlı su payı ile hesaplanır.",
      category: "Akışkanlar",
    },
    {
      id: 172,
      question: "Yüzen bir cisimde yüzdürme kuvveti neye eşittir?",
      options: [
        "Yalnızca cismin hacmine eşittir",
        "Cismin toplam ağırlığına eşittir",
        "Yalnızca cismin yüzey alanına eşit",
        "Yalnızca sıvının hacmine eşittir",
      ],
      correctAnswer: 1,
      explanation:
        "Dengede yüzen cisimde yukarı yönlü yüzdürme kuvveti ile aşağı yönlü ağırlık eşittir; bu yüzden geminin deplasmanı toplam ağırlığına eşit olur.",
      category: "Akışkanlar",
    },
    {
      id: 173,
      question: "Akım çizgisi (streamline) neyi gösterir?",
      options: [
        "Yalnızca borunun iç yüzeyini gösterir",
        "Yalnızca basınç dağılımını gösterir",
        "Hız vektörüne teğet olan eğriyi",
        "Yalnızca sıcaklık dağılımını gösterir",
      ],
      correctAnswer: 2,
      explanation:
        "Akım çizgisi her noktada hız vektörüne teğettir; kararlı akışta akışkan parçacığı bu çizgiyi izler ve çizgiler birbirini kesmez.",
      category: "Akışkanlar",
    },
    {
      id: 174,
      question: "Kararlı (steady) akış ne demektir?",
      options: [
        "Yalnızca akışın laminer olması demektir",
        "Yalnızca hızın çok yüksek olması demek",
        "Yalnızca akışın türbülanslı olması demek",
        "Değerlerin zamanla değişmemesi demek",
      ],
      correctAnswer: 3,
      explanation:
        "Kararlı akışta belirli bir noktadaki hız, basınç ve yoğunluk zamanla değişmez; değerler noktadan noktaya değişebilir ama aynı noktada sabit kalır.",
      category: "Akışkanlar",
    },
    {
      id: 175,
      question: "Laminer akışın belirgin özelliği nedir?",
      options: [
        "Tabakaların karışmadan kayması",
        "Yalnızca çok yüksek hızda oluşması",
        "Yalnızca gazlarda görülebilmesi",
        "Yalnızca geniş borularda oluşması",
      ],
      correctAnswer: 0,
      explanation:
        "Laminer akışta akışkan katmanları birbirine karışmadan düzgün biçimde kayar; hız profili parabolik olur ve enerji kaybı hızla doğru orantılı kalır.",
      category: "Akışkanlar",
    },
    {
      id: 176,
      question: "Reynolds sayısı hangi iki etkinin oranıdır?",
      options: [
        "Basınç ile sıcaklık etkilerinin oranı",
        "Atalet ile viskoz kuvvetlerin oranı",
        "Ağırlık ile kaldırma kuvveti oranı",
        "Debi ile boru uzunluğunun oranı",
      ],
      correctAnswer: 1,
      explanation:
        "Reynolds sayısı atalet kuvvetlerinin viskoz kuvvetlere oranını verir; boru akışında 2300'ün altı laminer, 4000'in üstü türbülanslı kabul edilir.",
      category: "Akışkanlar",
    },
    {
      id: 177,
      question: "Süreklilik denklemi neyi ifade eder?",
      options: [
        "Yalnızca basıncın sabit kaldığını",
        "Yalnızca hızın sabit kaldığını",
        "Kütle debisinin korunduğunu ifade eder",
        "Yalnızca sıcaklığın korunduğunu",
      ],
      correctAnswer: 2,
      explanation:
        "Kararlı akışta bir kesitten giren kütle debisi çıkanla eşittir; sıkışmaz akışkanda A₁v₁ = A₂v₂ biçimini alır ve kesit daralınca hız artar.",
      category: "Akışkanlar",
    },
    {
      id: 178,
      question: "Süreklilik gereği boru kesiti yarıya inerse hız nasıl değişir?",
      options: [
        "Hız yarıya inmektedir",
        "Hız değişmeden kalır",
        "Hız dörtte bire iner",
        "Hız iki katına çıkar",
      ],
      correctAnswer: 3,
      explanation:
        "Sıkışmaz akışkanda debi sabittir; alan yarıya inince hız iki katına çıkar. Bu artış aynı zamanda statik basıncın düşmesine yol açar.",
      category: "Akışkanlar",
    },
    {
      id: 179,
      question: "Süreklilik denklemi hangi varsayıma dayanır?",
      options: [
        "Kütlenin korunumu ilkesine dayanır",
        "Yalnızca enerjinin korunumu ilkesine",
        "Yalnızca momentumun korunumu ilkesine",
        "Yalnızca entropi artışı ilkesine dayanır",
      ],
      correctAnswer: 0,
      explanation:
        "Denklem doğrudan kütlenin korunumundan çıkar; kontrol hacmine giren ve çıkan kütle debileri kararlı akışta birbirine eşit olmak zorundadır.",
      category: "Akışkanlar",
    },
    {
      id: 180,
      question: "Bernoulli denklemi hangi üç terimi toplar?",
      options: [
        "Yalnızca basınç ve sıcaklık terimini",
        "Basınç, hız ve yükseklik terimlerini",
        "Yalnızca debi ve viskozite terimini",
        "Yalnızca kütle ve hacim terimini",
      ],
      correctAnswer: 1,
      explanation:
        "Sürtünmesiz ve sıkışmaz akışta basınç, hız ve yükseklik yüklerinin toplamı akım çizgisi boyunca sabittir; her terim metre cinsinden enerji verir.",
      category: "Akışkanlar",
    },
    {
      id: 181,
      question: "Venturi borusunda daralan kesitte ne olur?",
      options: [
        "Hız düşer ve basınç yükselir",
        "Hem hız hem basınç yükselir",
        "Hız artar ve basınç düşer",
        "Hem hız hem basınç düşmektedir",
      ],
      correctAnswer: 2,
      explanation:
        "Süreklilik gereği daralan kesitte hız artar; Bernoulli gereği artan hız basınç enerjisinden karşılanır ve statik basınç düşer. Debimetreler bu farkı ölçer.",
      category: "Akışkanlar",
    },
    {
      id: 182,
      question: "Gerçek akışta enerji denklemine hangi terim eklenir?",
      options: [
        "Yalnızca sıcaklık artışı terimi eklenir",
        "Yalnızca yoğunluk değişimi terimi",
        "Yalnızca debi değişimi terimi eklenir",
        "Sürtünme kayıp yükü terimi eklenir",
      ],
      correctAnswer: 3,
      explanation:
        "Gerçek akışkanda viskoz sürtünme enerji kaybı yaratır; denkleme kayıp yükü terimi eklenir ve pompa varsa pompa yükü de enerji girdisi olarak yazılır.",
      category: "Akışkanlar",
    },
    {
      id: 183,
      question: "Momentum denklemi hangi hesapta kullanılır?",
      options: [
        "Akışkanın yapıya uyguladığı kuvvette",
        "Yalnızca sıvı sıcaklığı hesabında",
        "Yalnızca sıvı yoğunluğu hesabında",
        "Yalnızca boru uzunluğu hesabında",
      ],
      correctAnswer: 0,
      explanation:
        "Dirsek, redüksiyon ve nozul gibi elemanlarda akışın yön veya hız değiştirmesi tepki kuvveti doğurur; bu kuvvet momentum denklemiyle hesaplanır.",
      category: "Akışkanlar",
    },
    {
      id: 184,
      question: "Darcy-Weisbach denkleminde hangi terimler çarpılır?",
      options: [
        "Yalnızca borunun boyu ile borunun rengi değeri",
        "Sürtünme katsayısı, boy-çap oranı ve hız yükü",
        "Yalnızca pompa devri ile debi değerinin kendisi",
        "Yalnızca akışkan sıcaklığı ile basınç değeri",
      ],
      correctAnswer: 1,
      explanation:
        "Kayıp yükü, sürtünme katsayısı ile boy-çap oranının ve hız yükünün çarpımına eşittir; katsayı Moody diyagramından, hız yükü ise akış hızından bulunur.",
      category: "Akışkanlar",
    },
    {
      id: 185,
      question: "Darcy-Weisbach kaybı hız değişimine nasıl tepki verir?",
      options: [
        "Hızdan bağımsız sabit kalmaktadır",
        "Hız ile ters orantılı azalmaktadır",
        "Hızın karesiyle orantılı artmaktadır",
        "Hızın kareköküyle orantılı artar",
      ],
      correctAnswer: 2,
      explanation:
        "Denklemde hız karesi bulunduğundan hız iki katına çıkarsa kayıp dört katına çıkar; bu yüzden boru çapı küçük seçilirse pompa enerjisi hızla büyür.",
      category: "Akışkanlar",
    },
    {
      id: 186,
      question: "Moody diyagramı hangi iki değişkeni girdi alır?",
      options: [
        "Yalnızca boru boyu ve sıcaklığı",
        "Yalnızca debi ve boru malzemesi",
        "Yalnızca basınç ve yoğunluk değeri",
        "Reynolds sayısı ve bağıl pürüzlülük",
      ],
      correctAnswer: 3,
      explanation:
        "Yatay eksende Reynolds sayısı, eğri ailesinde bağıl pürüzlülük bulunur; kesişim noktası sürtünme katsayısını verir.",
      category: "Akışkanlar",
    },
    {
      id: 187,
      question: "Tam türbülanslı bölgede sürtünme katsayısı nasıl davranır?",
      options: [
        "Yalnızca pürüzlülüğe bağlı kalır",
        "Yalnızca Reynolds sayısına bağlıdır",
        "Yalnızca sıcaklığa bağlı kalmaktadır",
        "Yalnızca boru boyuna bağlı kalmakta",
      ],
      correctAnswer: 0,
      explanation:
        "Yüksek Reynolds bölgesinde eğriler yatay hâle gelir; katsayı artık Reynolds sayısından bağımsızdır ve yalnızca bağıl pürüzlülük tarafından belirlenir.",
      category: "Akışkanlar",
    },
    {
      id: 188,
      question: "Laminer bölgede sürtünme katsayısı nasıl bulunur?",
      options: [
        "Yalnızca deneysel ölçümle bulunur",
        "f = 64/Re bağıntısıyla bulunur",
        "Yalnızca pürüzlülükle bulunmaktadır",
        "Yalnızca boru çapıyla bulunmaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "Laminer akışta katsayı yalnızca Reynolds sayısına bağlıdır ve doğrudan hesaplanır; pürüzlülüğün etkisi bu bölgede yok sayılır.",
      category: "Akışkanlar",
    },
    {
      id: 189,
      question: "Boru çapı seçilirken hangi denge kurulur?",
      options: [
        "Yalnızca boru rengi ile maliyet dengesi",
        "Yalnızca boru boyu ile ağırlık dengesi",
        "Yatırım maliyeti ile kayıp enerji dengesi",
        "Yalnızca vana sayısı ile bakım dengesi",
      ],
      correctAnswer: 2,
      explanation:
        "Büyük çap ilk yatırımı artırır ama sürtünme kaybını ve pompa enerjisini düşürür; ekonomik çap bu iki maliyetin toplamını en aza indiren değerdir.",
      category: "Akışkanlar",
    },
    {
      id: 190,
      question: "Deniz suyu hatlarında akış hızı neden sınırlandırılır?",
      options: [
        "Yalnızca gürültüyü azaltmak amacıyla",
        "Yalnızca pompa devrini düşürmek için",
        "Yalnızca boru boyunu kısaltmak için",
        "Erozyon ve korozyonu sınırlamak için",
      ],
      correctAnswer: 3,
      explanation:
        "Yüksek hız, özellikle bakır alaşımı borularda koruyucu oksit tabakasını sıyırıp erozyon korozyonuna yol açar; bu yüzden malzemeye göre üst hız sınırı verilir.",
      category: "Akışkanlar",
    },
    {
      id: 191,
      question: "Debi, hız ve kesit alanı arasındaki bağıntı nedir?",
      options: [
        "Debi hız ile alanın çarpımıdır",
        "Debi hızın alana bölümüdür",
        "Debi yalnızca alana eşittir",
        "Debi yalnızca hıza eşittir",
      ],
      correctAnswer: 0,
      explanation:
        "Debi, hız ile kesit alanının çarpımıdır; bilinen debi ve seçilen hız sınırından gereken kesit alanı ve oradan boru iç çapı hesaplanır.",
      category: "Akışkanlar",
    },
    {
      id: 192,
      question: "Lokal (minör) kayıplar nerede oluşur?",
      options: [
        "Yalnızca düz boru boyunca oluşur",
        "Dirsek, vana ve kesit değişiminde",
        "Yalnızca pompanın içinde oluşmakta",
        "Yalnızca tank içinde oluşmaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "Akışın yön veya kesit değiştirdiği her elemanda girdap oluşur ve enerji kaybolur; kayıp bir katsayı ile hız yükünün çarpımı olarak hesaplanır.",
      category: "Akışkanlar",
    },
    {
      id: 193,
      question: "Lokal kayıp hesabında eşdeğer boy yöntemi nedir?",
      options: [
        "Yalnızca vananın boyunu ölçmektir",
        "Yalnızca boru boyunu kısaltmaktır",
        "Elemanı eşdeğer düz boruyla değiştirmek",
        "Yalnızca dirsek sayısını saymaktır",
      ],
      correctAnswer: 2,
      explanation:
        "Her eleman, aynı kaybı yaratacak uzunlukta düz boru olarak ifade edilir; toplam eşdeğer boy sürtünme denkleminde tek seferde kullanılır.",
      category: "Akışkanlar",
    },
    {
      id: 194,
      question: "Kısmen kapalı bir kelebek vana hatta ne yaratır?",
      options: [
        "Yalnızca debinin kendiliğinden artması",
        "Yalnızca basıncın kendiliğinden artması",
        "Yalnızca sıcaklığın kendiliğinden düşmesi",
        "Büyük yerel kayıp ve kavitasyon riski",
      ],
      correctAnswer: 3,
      explanation:
        "Daralan geçitte hız çok yükselir, basınç yerel olarak buhar basıncının altına inebilir; kavitasyon kabarcıkları vana gövdesini ve boruyu aşındırır.",
      category: "Akışkanlar",
    },
    {
      id: 195,
      question: "Seri bağlı borularda hangi büyüklük ortaktır?",
      options: [
        "Her borudan geçen debi ortaktır",
        "Yalnızca boru çapları ortaktır",
        "Yalnızca boru boyları ortaktır",
        "Yalnızca yük kayıpları ortaktır",
      ],
      correctAnswer: 0,
      explanation:
        "Seri bağlantıda akışkan tüm borulardan sırayla geçer; debi aynı kalır, toplam yük kaybı her borunun kaybının toplamına eşit olur.",
      category: "Akışkanlar",
    },
    {
      id: 196,
      question: "Paralel bağlı borularda hangi büyüklük ortaktır?",
      options: [
        "Yalnızca debiler ortak kalmaktadır",
        "Uçlar arası yük kaybı ortaktır",
        "Yalnızca boru boyları ortak kalır",
        "Yalnızca boru çapları ortak kalır",
      ],
      correctAnswer: 1,
      explanation:
        "Paralel kollar aynı iki nokta arasına bağlıdır; her kolun yük kaybı eşittir. Toplam debi kolların debilerinin toplamıdır ve düşük dirençli kol daha çok akıtır.",
      category: "Akışkanlar",
    },
    {
      id: 197,
      question: "Bir boru hattına paralel ikinci hat eklenirse ne olur?",
      options: [
        "Yalnızca toplam direnç artmaktadır",
        "Yalnızca debi kendiliğinden azalır",
        "Toplam direnç düşer, debi artabilir",
        "Yalnızca basınç kendiliğinden artar",
      ],
      correctAnswer: 2,
      explanation:
        "Paralel kol eklemek toplam akış kesitini büyütür ve eşdeğer direnci düşürür; aynı pompa ile daha yüksek debi geçebilir veya aynı debi daha az kayıpla akar.",
      category: "Akışkanlar",
    },
    {
      id: 198,
      question: "Seri hatta çapı en küçük olan boru neyi belirler?",
      options: [
        "Yalnızca hattın toplam boyunu belirler",
        "Yalnızca hattın malzemesini belirler",
        "Yalnızca hattın rengini belirlemektedir",
        "Kaybın büyük bölümünü belirlemektedir",
      ],
      correctAnswer: 3,
      explanation:
        "Kayıp çapın beşinci kuvvetiyle ters orantılıdır; seri hatta en dar kesit toplam direnci baskın biçimde belirler ve darboğaz oluşturur.",
      category: "Akışkanlar",
    },
    {
      id: 199,
      question: "Boru hattı tasarımında genleşme payı neden bırakılır?",
      options: [
        "Sıcaklık değişimi boyu değiştirdiği için",
        "Yalnızca montajı kolaylaştırmak için",
        "Yalnızca maliyeti düşürebilmek için",
        "Yalnızca boya işini kolaylaştırmak için",
      ],
      correctAnswer: 0,
      explanation:
        "Isınan boru uzar; sabit mesnetlenmiş hatta bu uzama büyük gerilme yaratır. Kompansatör, U bükümü ve kayar mesnetler bu hareketi karşılar.",
      category: "Akışkanlar",
    },
    {
      id: 200,
      question: "Boru hattında hava kilidi (air lock) nasıl önlenir?",
      options: [
        "Yalnızca hat basıncı düşürülerek",
        "Yüksek noktalara purjör konarak",
        "Yalnızca boru çapı küçültülerek",
        "Yalnızca akış hızı düşürülerek",
      ],
      correctAnswer: 1,
      explanation:
        "Hatta biriken hava akışı keser; tepe noktalara otomatik veya elle havalık konur. Alçak noktalara ise drenaj vanası konarak yoğuşan sıvı alınır.",
      category: "Akışkanlar",
    },
    {
      id: 201,
      question: "Boru desteklerinin aralığı neye göre belirlenir?",
      options: [
        "Yalnızca borunun rengine göre belirlenir",
        "Yalnızca borunun boyuna göre belirlenir",
        "Çap, malzeme ve dolu ağırlığa göre",
        "Yalnızca ortam sıcaklığına göre belirlenir",
      ],
      correctAnswer: 2,
      explanation:
        "Destek aralığı, borunun dolu hâldeki ağırlığı altında izin verilen sehim ve gerilmeyi aşmayacak biçimde seçilir; titreşim ve gemi hareketleri de hesaba katılır.",
      category: "Akışkanlar",
    },
    {
      id: 202,
      question: "Santrifüj pompada enerji akışkana nasıl verilir?",
      options: [
        "Yalnızca pistonun ittirmesiyle verilir",
        "Yalnızca vananın kısılmasıyla verilir",
        "Yalnızca borunun daralmasıyla verilir",
        "Dönen çarkın hız kazandırmasıyla",
      ],
      correctAnswer: 3,
      explanation:
        "Çark akışkana kinetik enerji kazandırır; salyangoz gövde ve difüzör bu hızı yavaşlatarak basınç enerjisine çevirir.",
      category: "Akışkanlar",
    },
    {
      id: 203,
      question: "Santrifüj pompaya yol vermeden önce ne yapılmalıdır?",
      options: [
        "Gövde ve emiş hattı su ile doldurulur",
        "Yalnızca basma vanası tam açılır",
        "Yalnızca çark elle döndürülmektedir",
        "Yalnızca salmastra sıkılmaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "Santrifüj pompa kendinden emişli değildir; hava dolu çark basınç üretemez ve kuru çalışma salmastra ile yatağı yakar. Bu yüzden önce doldurma yapılır.",
      category: "Akışkanlar",
    },
    {
      id: 204,
      question: "Santrifüj pompada basma vanası kısılırsa ne olur?",
      options: [
        "Yalnızca debi ve güç birlikte artar",
        "Debi düşer, basma yüksekliği artar",
        "Yalnızca pompanın devri yükselmekte",
        "Yalnızca emiş basıncı yükselmektedir",
      ],
      correctAnswer: 1,
      explanation:
        "Sistem direnci arttığından çalışma noktası eğri üzerinde sola kayar; debi azalır ve üretilen yük yükselir. Kapalı vanada uzun süre çalışmak sıvıyı ısıtır.",
      category: "Akışkanlar",
    },
    {
      id: 205,
      question: "Santrifüj pompadaki aşınma halkası ne işe yarar?",
      options: [
        "Yalnızca çarkın ağırlığını taşımaktadır",
        "Yalnızca pompanın devrini düşürmektedir",
        "İç kaçağı sınırlayıp verimi korur",
        "Yalnızca salmastrayı soğutmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "Basma tarafından emiş tarafına dönen iç kaçak verimi düşürür; aşınma halkası bu boşluğu daraltır ve aşındığında kolayca değiştirilebilen bir sarf parçasıdır.",
      category: "Akışkanlar",
    },
    {
      id: 206,
      question: "Pompa H-Q karakteristik eğrisi neyi gösterir?",
      options: [
        "Yalnızca pompanın ağırlığını gösterir",
        "Yalnızca pompanın fiyatını göstermekte",
        "Yalnızca borunun çapını göstermektedir",
        "Debiye karşı üretilen basma yüksekliği",
      ],
      correctAnswer: 3,
      explanation:
        "Eğri sabit devirde her debide üretilen yükü verir; genelde debi arttıkça yük düşer. Aynı grafikte verim ve güç eğrileri de gösterilir.",
      category: "Akışkanlar",
    },
    {
      id: 207,
      question: "Pompa devri değişince karakteristik eğri nasıl kayar?",
      options: [
        "Benzerlik yasalarına göre kaymaktadır",
        "Yalnızca sabit kalıp hiç kaymamaktadır",
        "Yalnızca dikey eksende kaymaktadır",
        "Yalnızca yatay eksende kaymaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "Benzerlik yasaları gereği debi devirle, yük devrin karesiyle, güç ise devrin küpüyle değişir; bu yüzden küçük bir devir düşüşü büyük enerji kazandırır.",
      category: "Akışkanlar",
    },
    {
      id: 208,
      question: "Sistem eğrisi neyi gösterir?",
      options: [
        "Yalnızca pompanın ürettiği yükü",
        "Debiye karşı gereken toplam yükü",
        "Yalnızca borunun malzemesini",
        "Yalnızca pompanın verimini",
      ],
      correctAnswer: 1,
      explanation:
        "Sistem eğrisi statik yükseklik ile debiye bağlı sürtünme kaybının toplamıdır; statik bileşen sabit, sürtünme bileşeni debinin karesiyle büyür.",
      category: "Akışkanlar",
    },
    {
      id: 209,
      question: "Çalışma noktası nasıl belirlenir?",
      options: [
        "Yalnızca pompa eğrisinin tepesinde",
        "Yalnızca sistem eğrisinin başında",
        "İki eğrinin kesiştiği noktada belirlenir",
        "Yalnızca verim eğrisinin sonunda",
      ],
      correctAnswer: 2,
      explanation:
        "Pompanın ürettiği yük ile sistemin istediği yük yalnızca kesişim noktasında eşitlenir; pompa kararlı olarak bu debide ve bu yükte çalışır.",
      category: "Akışkanlar",
    },
    {
      id: 210,
      question: "Filtre tıkanınca çalışma noktası nereye kayar?",
      options: [
        "Yalnızca aynı noktada kalmaktadır",
        "Yalnızca sağa doğru kaymaktadır",
        "Yalnızca aşağı doğru kaymaktadır",
        "Sola ve yukarı doğru kaymaktadır",
      ],
      correctAnswer: 3,
      explanation:
        "Artan direnç sistem eğrisini dikleştirir; kesişim daha düşük debide ve daha yüksek yükte oluşur. Pompa verimi düşer ve enerji boşa harcanır.",
      category: "Akışkanlar",
    },
    {
      id: 211,
      question: "NPSH available (mevcut) neyi ifade eder?",
      options: [
        "Emişte buharlaşma üstündeki net yük",
        "Yalnızca pompanın ürettiği basma yükü",
        "Yalnızca borunun toplam uzunluğu",
        "Yalnızca akışkanın toplam hacmi",
      ],
      correctAnswer: 0,
      explanation:
        "Mevcut NPSH; emiş yüzeyindeki mutlak basınç, statik yükseklik ve kayıplar hesaba katıldıktan sonra akışkanın buhar basıncının ne kadar üstünde kaldığını gösterir.",
      category: "Akışkanlar",
    },
    {
      id: 212,
      question: "Pompada kavitasyonu önlemek için hangi koşul sağlanmalıdır?",
      options: [
        "NPSHa değeri NPSHr altında kalmalı",
        "NPSHa değeri NPSHr üstünde olmalı",
        "Yalnızca pompa devri artırılmalıdır",
        "Yalnızca basma vanası kısılmalıdır",
      ],
      correctAnswer: 1,
      explanation:
        "Mevcut NPSH, pompanın istediği NPSH değerinin belirli bir emniyet payıyla üstünde olmalıdır; aksi hâlde çark girişinde buhar kabarcığı oluşur ve erozyon başlar.",
      category: "Akışkanlar",
    },
    {
      id: 213,
      question: "Pozitif deplasmanlı pompanın santrifüjden farkı nedir?",
      options: [
        "Yalnızca daha küçük boyutlu olması",
        "Yalnızca daha ucuz üretilmesi durumu",
        "Debinin basınçtan az etkilenmesi",
        "Yalnızca doldurma gerektirmesi durumu",
      ],
      correctAnswer: 2,
      explanation:
        "Her çevrimde sabit bir hacim taşındığından debi neredeyse yalnızca devre bağlıdır; basınç yükselse bile debi çok az düşer, buna karşılık basınç sınırsız yükselebilir.",
      category: "Akışkanlar",
    },
    {
      id: 214,
      question: "Pozitif deplasmanlı pompada basma hattı kapatılırsa ne olur?",
      options: [
        "Yalnızca debi kendiliğinden sıfırlanır",
        "Yalnızca pompa devri kendiliğinden düşer",
        "Yalnızca akışkan sıcaklığı düşmektedir",
        "Basınç yükselip hasar veya patlama olur",
      ],
      correctAnswer: 3,
      explanation:
        "Pompa hacmi zorla ittiğinden kapalı hatta basınç hızla yükselir; bu yüzden basma tarafında mutlaka emniyet valfi veya baypas bulunur.",
      category: "Akışkanlar",
    },
    {
      id: 215,
      question: "Vidalı pompanın tipik kullanım alanı nedir?",
      options: [
        "Viskoz yağ ve yakıt transferi",
        "Yalnızca deniz suyu soğutma devresi",
        "Yalnızca yangın söndürme devresi",
        "Yalnızca balast basma devresi",
      ],
      correctAnswer: 0,
      explanation:
        "Vidalı pompa darbesiz ve sessiz akış verir, yüksek viskoziteyi rahat taşır; bu yüzden yakıt besleme, yağlama ve kargo yağı transferinde tercih edilir.",
      category: "Akışkanlar",
    },
    {
      id: 216,
      question: "Dişli pompanın çalışma ilkesi nedir?",
      options: [
        "Yalnızca merkezkaç kuvvetiyle basar",
        "Diş boşluklarında sıvı taşıyıp basar",
        "Yalnızca vakum yaratarak emmektedir",
        "Yalnızca piston hareketiyle basmakta",
      ],
      correctAnswer: 1,
      explanation:
        "Birbirine geçen iki dişli, diş boşluklarında sıvıyı emişten basmaya taşır; kavramada dişler kapanınca sıvı basma tarafına itilir ve geri dönüş engellenir.",
      category: "Akışkanlar",
    },
    {
      id: 217,
      question: "Pompa seçiminde ilk belirlenen iki büyüklük nedir?",
      options: [
        "Yalnızca pompa markası ve fiyatı",
        "Yalnızca motor rengi ve ağırlığı",
        "Gereken debi ve toplam basma yükü",
        "Yalnızca salmastra tipi ve boyutu",
      ],
      correctAnswer: 2,
      explanation:
        "Önce sistemin istediği debi ve toplam yük hesaplanır; ardından bu noktayı en yüksek verimle karşılayan pompa eğrisi ve çark çapı seçilir.",
      category: "Akışkanlar",
    },
    {
      id: 218,
      question: "Pompanın gereğinden büyük boyutlandırılması ne yaratır?",
      options: [
        "Yalnızca daha uzun ömür sağlamaktadır",
        "Yalnızca daha az enerji tüketilmektedir",
        "Yalnızca daha sessiz çalışma sağlamakta",
        "Düşük verim ve gereksiz enerji tüketimi",
      ],
      correctAnswer: 3,
      explanation:
        "Fazla büyük pompa çalışma noktasını en iyi verim noktasının uzağına taşır; kısma ile debi ayarlamak enerjiyi ısıya çevirir, titreşim ve yatak aşınması artar.",
      category: "Akışkanlar",
    },
    {
      id: 219,
      question: "Pompa seçiminde en iyi verim noktası (BEP) neden önemlidir?",
      options: [
        "Titreşim ve aşınma burada en azdır",
        "Yalnızca satın alma bedeli en düşüktür",
        "Yalnızca pompa ağırlığı en düşüktür",
        "Yalnızca montajı burada en kolaydır",
      ],
      correctAnswer: 0,
      explanation:
        "Bu noktanın dışında çalışan çarkta akış ayrılır, radyal yük ve titreşim büyür; mekanik salmastra ile yatak ömrü kısalır. Seçim bu noktanın yakınını hedefler.",
      category: "Akışkanlar",
    },
    {
      id: 220,
      question: "Pompa motor gücü hesaplanırken hangi terim bölendir?",
      options: [
        "Yalnızca akışkanın yoğunluk değeri",
        "Pompa ve motor verimi bölen olur",
        "Yalnızca borunun çapı bölen olur",
        "Yalnızca akışkanın sıcaklık değeri",
      ],
      correctAnswer: 1,
      explanation:
        "Hidrolik güç yoğunluk, yerçekimi, debi ve yük çarpımıyla bulunur; mil gücü bu değerin pompa verimine, elektrik gücü ayrıca motor verimine bölünmesiyle elde edilir.",
      category: "Akışkanlar",
    },
    {
      id: 221,
      question: "İki pompa paralel çalıştırıldığında ne artar?",
      options: [
        "Yalnızca üretilen basma yüksekliği",
        "Yalnızca pompaların devir sayısı",
        "Aynı yükte toplam debi artmaktadır",
        "Yalnızca emiş basıncı artmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "Paralel bağlantıda debiler toplanır, yük ortak kalır; ancak sistem eğrisi dik ise ikinci pompanın kattığı debi beklenenden az olur.",
      category: "Akışkanlar",
    },
    {
      id: 222,
      question: "İki pompa seri çalıştırıldığında ne artar?",
      options: [
        "Yalnızca toplam debi artmaktadır",
        "Yalnızca emiş kapasitesi artmaktadır",
        "Yalnızca pompaların verimi artmakta",
        "Aynı debide toplam yük artmaktadır",
      ],
      correctAnswer: 3,
      explanation:
        "Seri bağlantıda ilk pompanın çıkışı ikincinin girişine verilir; yükler toplanır, debi ortak kalır. Yüksek basma gerektiren hatlarda bu düzen kullanılır.",
      category: "Akışkanlar",
    },
    {
      id: 223,
      question: "Paralel çalışan pompalardan biri durursa ne olur?",
      options: [
        "Kalan pompanın debisi bir miktar artar",
        "Yalnızca kalan pompanın devri düşer",
        "Yalnızca sistem basıncı iki katına çıkar",
        "Yalnızca emiş basıncı sıfıra inmektedir",
      ],
      correctAnswer: 0,
      explanation:
        "Toplam debi düştüğü için sistem direnci azalır ve çalışma noktası sağa kayar; kalan pompa daha yüksek debide çalışır ve motor akımı yükselebilir.",
      category: "Akışkanlar",
    },
    {
      id: 224,
      question: "Paralel çalışacak pompalarda hangi koşul aranır?",
      options: [
        "Yalnızca aynı markadan olmaları",
        "Benzer basma yükü eğrisine sahip olmaları",
        "Yalnızca aynı renkte olmaları koşulu",
        "Yalnızca aynı yılda üretilmiş olmaları",
      ],
      correctAnswer: 1,
      explanation:
        "Eğrileri farklı pompalarda zayıf olan yüke karşı akıtamaz ve sıfır debide çalışıp ısınır; bu yüzden kapalı vana yükleri birbirine yakın olmalıdır.",
      category: "Akışkanlar",
    },
    {
      id: 225,
      question: "Balast boru sisteminde halka (ring) hat düzeni ne sağlar?",
      options: [
        "Yalnızca boru maliyetini düşürmektedir",
        "Yalnızca pompa sayısını artırmaktadır",
        "Her tanka iki yönden erişim sağlar",
        "Yalnızca tank sayısını artırmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "Halka hat, bir bölümü arızalansa bile tanklara alternatif yoldan ulaşmayı sağlar; bu yedeklilik balast alma ve basma esnekliğini artırır.",
      category: "Akışkanlar",
    },
    {
      id: 226,
      question: "Balast pompasının emiş tarafında ne bulunur?",
      options: [
        "Yalnızca bir adet manometre bulunur",
        "Yalnızca bir adet ısıtıcı bulunur",
        "Yalnızca bir adet debimetre bulunur",
        "Süzgeç ve emiş vanası bulunmaktadır",
      ],
      correctAnswer: 3,
      explanation:
        "Tank dibindeki çamur ve katı parçacıklar süzgeçle tutulur; emiş vanası tankı izole eder. Süzgeç tıkanırsa emiş vakumu artar ve pompa kavitasyon yapar.",
      category: "Akışkanlar",
    },
    {
      id: 227,
      question: "Balast tankı boşaltılırken hangi sorun görülebilir?",
      options: [
        "Seviye düşünce emişin havayı kapması",
        "Yalnızca tank basıncının yükselmesi",
        "Yalnızca suyun ısınmaya başlaması",
        "Yalnızca borunun kendiliğinden dolması",
      ],
      correctAnswer: 0,
      explanation:
        "Tank dibine yaklaşınca girdap oluşur ve pompa hava kapar; kalan miktar eğitici veya sıyırma hattıyla alınır.",
      category: "Akışkanlar",
    },
    {
      id: 228,
      question: "Balast hattında havalandırma boruları neden gereklidir?",
      options: [
        "Yalnızca tank içini soğutmak içindir",
        "Doldurma ve boşaltmada basıncı dengeler",
        "Yalnızca tankı temizlemek içindir",
        "Yalnızca tank boyasını korumak içindir",
      ],
      correctAnswer: 1,
      explanation:
        "Tank dolarken içerideki havanın çıkması, boşalırken hava girmesi gerekir; havalık kesitleri yetersizse tank vakum veya aşırı basınçla deforme olur.",
      category: "Akışkanlar",
    },
    {
      id: 229,
      question: "Sintine boru sisteminin temel görevi nedir?",
      options: [
        "Yalnızca tanklara balast almaktır",
        "Yalnızca yakıt transferi yapmaktır",
        "Mahallerde biriken suyu tahliye etmek",
        "Yalnızca yangın söndürmeyi sağlamak",
      ],
      correctAnswer: 2,
      explanation:
        "Sintine hattı makine dairesi, ambar ve tünel gibi mahallerde biriken suyu emip sintine tankına veya yağ-su ayırıcıya gönderir; su alma durumunda da kullanılır.",
      category: "Akışkanlar",
    },
    {
      id: 230,
      question: "Sintine emiş ağızlarında hangi düzenek bulunur?",
      options: [
        "Yalnızca bir adet ısıtıcı bulunmakta",
        "Yalnızca bir adet debimetre bulunur",
        "Yalnızca bir adet manometre bulunur",
        "Sepet süzgeç ve çek valf bulunur",
      ],
      correctAnswer: 3,
      explanation:
        "Kaba katıları tutan sepet süzgeç emişi korur; çek valf ise pompa durduğunda suyun mahalle geri dönmesini engeller. Süzgeçler düzenli temizlenir.",
      category: "Akışkanlar",
    },
    {
      id: 231,
      question: "Acil sintine emişi (emergency bilge suction) hangi pompaya bağlanır?",
      options: [
        "En büyük kapasiteli deniz suyu pompasına",
        "Yalnızca yakıt transfer pompasına bağlanır",
        "Yalnızca içme suyu pompasına bağlanır",
        "Yalnızca yağlama pompasına bağlanır",
      ],
      correctAnswer: 0,
      explanation:
        "SOLAS, makine dairesinde en büyük bağımsız deniz suyu pompasına doğrudan ve büyük çaplı bir acil sintine emişi bağlanmasını ister; ağız süzgeçsiz ve yüksekte olur.",
      category: "Akışkanlar",
    },
    {
      id: 232,
      question: "Sintine suyu doğrudan denize neden basılamaz?",
      options: [
        "Yalnızca pompa kapasitesi yetmediği için",
        "Yağ içerdiği ve MARPOL sınırladığı için",
        "Yalnızca boru çapı küçük olduğu için",
        "Yalnızca deniz suyu soğuk olduğu için",
      ],
      correctAnswer: 1,
      explanation:
        "Makine dairesi sintinesi yağ içerir; MARPOL Ek I gereği ancak 15 ppm altına indirildikten sonra ve gemi yol alırken deşarj edilebilir.",
      category: "Akışkanlar",
    },
    {
      id: 233,
      question: "Merkezi soğutma suyu sisteminin klasik sisteme üstünlüğü nedir?",
      options: [
        "Yalnızca pompa sayısını artırması",
        "Yalnızca daha ucuz kurulması durumu",
        "Deniz suyunun az ekipmana girmesi",
        "Yalnızca daha az yer kaplaması durumu",
      ],
      correctAnswer: 2,
      explanation:
        "Merkezi sistemde deniz suyu yalnızca merkezi soğutucuya girer; makinelerin tamamı korozyona uğramayan tatlı su devresiyle soğutulur, bakım maliyeti düşer.",
      category: "Akışkanlar",
    },
    {
      id: 234,
      question: "Yüksek sıcaklık (HT) soğutma devresi hangi ekipmanı soğutur?",
      options: [
        "Yalnızca yağlama yağı soğutucusunu",
        "Yalnızca hava soğutucusunu soğutur",
        "Yalnızca jeneratörleri soğutmaktadır",
        "Ana makine silindir ceketlerini soğutur",
      ],
      correctAnswer: 3,
      explanation:
        "HT devresi ceket suyunu 80-90 °C dolayında tutar; LT devresi ise yağ soğutucusu, hava soğutucusu ve yardımcı makineleri daha düşük sıcaklıkta soğutur.",
      category: "Akışkanlar",
    },
    {
      id: 235,
      question: "Soğutma suyu devresinde genleşme tankının işlevi nedir?",
      options: [
        "Hacim değişimini karşılayıp hava atmak",
        "Yalnızca suyu ısıtmakla görevlidir",
        "Yalnızca suyu filtrelemekle görevlidir",
        "Yalnızca pompayı soğutmakla görevlidir",
      ],
      correctAnswer: 0,
      explanation:
        "Isınan suyun genleşmesini karşılar, devrede statik basınç kurar ve biriken havayı atmosfere verir; seviye düşüşü devrede kaçak olduğunun ilk göstergesidir.",
      category: "Akışkanlar",
    },
    {
      id: 236,
      question: "Tatlı su soğutma devresine neden kimyasal katkı eklenir?",
      options: [
        "Yalnızca suyun rengini değiştirmek için",
        "Korozyon ve kireçlenmeyi önlemek için",
        "Yalnızca suyun sıcaklığını düşürmek için",
        "Yalnızca suyun debisini artırmak için",
      ],
      correctAnswer: 1,
      explanation:
        "Nitrit esaslı inhibitörler metal yüzeyde koruyucu film oluşturur; ayrıca pH ve sertlik düzenli ölçülerek kireç ile kavitasyon erozyonu önlenir.",
      category: "Akışkanlar",
    },
    {
      id: 237,
      question: "Yakıt transfer hattı hangi işi yapar?",
      options: [
        "Yalnızca yakıtı motora püskürtmektedir",
        "Yalnızca yakıtı ısıtmakla görevlidir",
        "Depo tankları arasında yakıt aktarır",
        "Yalnızca yakıtı filtrelemekle görevlidir",
      ],
      correctAnswer: 2,
      explanation:
        "Transfer pompası bunker tanklarından settling tanka yakıt basar; hat ayrıca tanklar arası aktarma ve trim düzeltme amacıyla da kullanılır.",
      category: "Akışkanlar",
    },
    {
      id: 238,
      question: "Yakıt servis hattında besleme (booster) devresinin görevi nedir?",
      options: [
        "Yalnızca yakıtı tanka geri döndürmek",
        "Yalnızca yakıtı soğutmakla görevlidir",
        "Yalnızca yakıtı ölçmekle görevlidir",
        "Basınçlı ve sıcak yakıtı motora vermek",
      ],
      correctAnswer: 3,
      explanation:
        "Besleme devresi yakıtı basınç altında tutup ısıtıcı ve viskozimetreden geçirerek enjeksiyon pompalarına verir; basınç, sıcak yakıtın hatta buharlaşmasını engeller.",
      category: "Akışkanlar",
    },
    {
      id: 239,
      question: "Yakıt hatlarında çift cidarlı boru neden kullanılır?",
      options: [
        "Kaçağın sıcak yüzeye ulaşmasını önler",
        "Yalnızca yakıt debisini artırmak içindir",
        "Yalnızca boru ağırlığını azaltmak içindir",
        "Yalnızca yakıt sıcaklığını düşürmek için",
      ],
      correctAnswer: 0,
      explanation:
        "SOLAS, yüksek basınçlı yakıt hatlarında dış kılıf ve kaçak toplama düzeni ister; sızan yakıt kılıf içinde kalır, alarm verir ve sıcak yüzeye püskürmez.",
      category: "Akışkanlar",
    },
    {
      id: 240,
      question: "Yakıt tanklarındaki hızlı kapatma vanası ne zaman kullanılır?",
      options: [
        "Yalnızca bakım sırasında kullanılır",
        "Yangın veya acil durumda kullanılır",
        "Yalnızca bunker alırken kullanılır",
        "Yalnızca liman girişinde kullanılır",
      ],
      correctAnswer: 1,
      explanation:
        "Makine dairesi dışındaki uzaktan kumanda noktasından açılan vanalar tank çıkışını keser; besleme kesilmeden yangın kalıcı olarak söndürülemez.",
      category: "Akışkanlar",
    },
    {
      id: 241,
      question: "Kelebek vananın tipik üstünlüğü nedir?",
      options: [
        "Yalnızca hiç sızdırmaması durumu",
        "Yalnızca çok yüksek basınca dayanması",
        "Az yer kaplaması ve hızlı açılması",
        "Yalnızca çok düşük maliyetli olması",
      ],
      correctAnswer: 2,
      explanation:
        "Çeyrek tur ile tam açılır, kısa gövdesi sayesinde büyük çaplı hatlarda az yer kaplar; buna karşılık kısmi açıklıkta akışı kısarken kavitasyon riski taşır.",
      category: "Akışkanlar",
    },
    {
      id: 242,
      question: "Küresel (globe) vana hangi işe uygundur?",
      options: [
        "Yalnızca tam açık ve tam kapalı işe",
        "Yalnızca çok büyük çaplı hatlara",
        "Yalnızca gaz hatlarına uygundur",
        "Akış miktarını ayarlamaya uygundur",
      ],
      correctAnswer: 3,
      explanation:
        "Diskin oturma yüzeyine dik hareketi ince ayara elverişlidir; buna karşılık kıvrımlı akış yolu yüksek yerel kayıp yaratır, bu yüzden büyük hatlarda tercih edilmez.",
      category: "Akışkanlar",
    },
    {
      id: 243,
      question: "Çek (non-return) valfin işlevi nedir?",
      options: [
        "Akışın ters yöne dönmesini engellemek",
        "Yalnızca akış debisini ölçmektir",
        "Yalnızca basıncı düşürmek görevidir",
        "Yalnızca akışkanı ısıtmak görevidir",
      ],
      correctAnswer: 0,
      explanation:
        "Valf yalnızca tek yönde açılır; pompa durduğunda geri akışı ve su darbesini engeller. Paralel çalışan pompalarda birbirine geri basmayı da önler.",
      category: "Akışkanlar",
    },
    {
      id: 244,
      question: "Valf seçiminde hangi ölçüt belirleyicidir?",
      options: [
        "Yalnızca valfin dış boyası ve rengi",
        "Akışkan, basınç, sıcaklık ve görev",
        "Yalnızca valfin üretim yılı bilgisi",
        "Yalnızca valfin ağırlık değeri bilgisi",
      ],
      correctAnswer: 1,
      explanation:
        "Akışkanın türü, çalışma basıncı ve sıcaklığı, valfin görevi ve gövde ile oturma malzemesi uyumu birlikte değerlendirilerek seçim yapılır.",
      category: "Akışkanlar",
    },
    {
      id: 245,
      question: "Deniz suyu hatlarında hangi boru malzemesi yaygın kullanılır?",
      options: [
        "Yalnızca karbon çeliği kullanılmaktadır",
        "Yalnızca dökme demir kullanılmaktadır",
        "Bakır-nikel alaşımı kullanılmaktadır",
        "Yalnızca alüminyum kullanılmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "Bakır-nikel alaşımı deniz suyu korozyonuna ve biyolojik tutunmaya dirençlidir; galvanizli çelik ve kaplamalı borular da kullanılır ancak ömürleri daha kısadır.",
      category: "Akışkanlar",
    },
    {
      id: 246,
      question: "Boru standardında anma çapı (DN) neyi ifade eder?",
      options: [
        "Yalnızca borunun dış çapını ifade eder",
        "Yalnızca borunun et kalınlığını ifade eder",
        "Yalnızca borunun uzunluğunu ifade eder",
        "Standart bir boyut gösterge sayısıdır",
      ],
      correctAnswer: 3,
      explanation:
        "DN milimetre cinsinden yaklaşık bir gösterge değeridir ve gerçek iç veya dış çapa birebir eşit değildir; gerçek ölçüler standart tablosundan okunur.",
      category: "Akışkanlar",
    },
    {
      id: 247,
      question: "Boru standardında anma basıncı (PN) neyi gösterir?",
      options: [
        "İzin verilen çalışma basıncı sınıfını",
        "Yalnızca borunun ağırlık değerini",
        "Yalnızca borunun renk kodu değerini",
        "Yalnızca borunun üretim yılı bilgisini",
      ],
      correctAnswer: 0,
      explanation:
        "PN, bar cinsinden referans basınç sınıfını verir; izin verilen gerçek basınç sıcaklıkla düşer, bu yüzden malzeme ve sıcaklık tablosuyla birlikte değerlendirilir.",
      category: "Akışkanlar",
    },
    {
      id: 248,
      question: "Farklı metallerin bir arada kullanıldığı hatta hangi risk doğar?",
      options: [
        "Yalnızca borunun sesinin değişmesi",
        "Galvanik korozyonun hızlanma riski",
        "Yalnızca akış debisinin artma riski",
        "Yalnızca boyanın kabarma riski",
      ],
      correctAnswer: 1,
      explanation:
        "Elektrolit içinde temas eden farklı metallerden aktif olanı hızla aşınır; yalıtkan conta ve flanş takımı ile bağlantı ayrılır veya kurban anot kullanılır.",
      category: "Akışkanlar",
    },
  ],
};
