import type { QuizQuestion } from "@/types/quiz";

/**
 * Konu doldurma bankası 9 — gemi elektrik konu bankasında konu başına en az
 * 8 soru hedefini tutturmak için yazılan ek sorular.
 *
 * `exerciseQuestionDistribution.ts` soruları konu başlıklarıyla sözcük örtüşmesine
 * göre eşlediğinden her soru hedeflediği konunun kendi terminolojisini kullanır;
 * aksi hâlde benzerlik puanı soruyu komşu konuya taşır. Birbirine yakın konular
 * (aşırı akım/kısa devre koruma, izole nötr/toprak kaçağı, gerilim seviyeleri/
 * yüksek gerilim emniyeti) bilinçli olarak ayrı sözcük dağarcığıyla yazılmıştır.
 *
 * Numaralandırma taban + devam + vaka bankalarının ardından sürer (155'ten
 * başlar); `machineQuizDataIndex.ts` bankaları slug bazında bu sırayla birleştirir.
 */
export const machineQuizQuestionsTopicFill9: Record<string, QuizQuestion[]> = {
  electrical: [
    {
      id: 155,
      question: "Senkron jeneratörde gerilim hangi olayla üretilir?",
      options: [
        "Dönen manyetik alanın stator sargısını kesmesi",
        "Yalnızca yakıtın kimyasal tepkimeye girmesiyle",
        "Yalnızca yatak sürtünmesinin ısı üretmesi",
        "Yalnızca soğutma suyunun buharlaşması",
      ],
      correctAnswer: 0,
      explanation:
        "Uyartım akımıyla mıknatıslanan rotor döndükçe alan çizgileri stator sargılarını keser ve indüksiyonla üç fazlı gerilim üretir.",
      category: "Gemi Elektrik",
    },
    {
      id: 156,
      question: "Senkron jeneratörün rotorunda hangi akım dolaşır?",
      options: [
        "Üç fazlı alternatif akım dolaşır",
        "Doğru akım (uyartım akımı) dolaşır",
        "Yalnızca kaçak akım dolaşmaktadır",
        "Hiçbir akım dolaşmamaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "Rotor sargısı doğru akımla beslenir ve sabit kutuplu bir mıknatıs gibi davranır; bu akım fırçalı veya fırçasız uyartım düzeneğinden sağlanır.",
      category: "Gemi Elektrik",
    },
    {
      id: 157,
      question: "Fırçasız (brushless) uyartımın üstünlüğü nedir?",
      options: [
        "Yalnızca üretim maliyetini düşürmesi",
        "Yalnızca gerilimi kendiliğinden artırması",
        "Fırça bakımı ve kıvılcımı ortadan kaldırması",
        "Yalnızca frekansı kendiliğinden sabitlemesi",
      ],
      correctAnswer: 2,
      explanation:
        "Uyartım gücü döner diyot köprüsüyle rotor üzerinde doğrultulur; fırça ve bilezik olmadığından aşınma, karbon tozu ve kıvılcım riski ortadan kalkar.",
      category: "Gemi Elektrik",
    },
    {
      id: 158,
      question: "Otomatik gerilim regülatörü (AVR) neyi denetler?",
      options: [
        "Yalnızca jeneratörün devir sayısı değerini",
        "Yalnızca yakıt pompası indeksini",
        "Yalnızca soğutma suyu debisini",
        "Uyartım akımını ayarlayıp gerilimi tutar",
      ],
      correctAnswer: 3,
      explanation:
        "AVR çıkış gerilimini ölçer ve uyartım akımını değiştirerek yük değişse de gerilimi ayarlanan değerde tutar; frekansı ise regülatör (governor) denetler.",
      category: "Gemi Elektrik",
    },
    {
      id: 159,
      question: "Paralel çalışan jeneratörlerde AVR hangi paylaşımı düzenler?",
      options: [
        "Reaktif güç (kVAr) paylaşımını düzenler",
        "Yalnızca aktif güç paylaşımını düzenler",
        "Yalnızca yakıt tüketimi paylaşımını",
        "Yalnızca soğutma suyu paylaşımını",
      ],
      correctAnswer: 0,
      explanation:
        "Uyartım farkı reaktif yük dağılımını belirler; daha çok uyartılan makine daha çok kVAr üstlenir. Aktif güç paylaşımı ise governor droop ayarıyla yapılır.",
      category: "Gemi Elektrik",
    },
    {
      id: 160,
      question: "AVR arızalandığında ilk gözlenen belirti nedir?",
      options: [
        "Yalnızca frekansın sabit kalması",
        "Gerilimin dalgalanıp sapma yapması",
        "Yalnızca yakıt tüketiminin düşmesi",
        "Yalnızca yağ basıncının yükselmesi",
      ],
      correctAnswer: 1,
      explanation:
        "Uyartım denetimi kaybolunca gerilim yük değişimlerinde salınır veya sınırın dışına çıkar; aşırı gerilim tüketicileri yakar, düşük gerilim motorları zorlar.",
      category: "Gemi Elektrik",
    },
    {
      id: 161,
      question: "Governor droop ayarı paralel çalışmada ne sağlar?",
      options: [
        "Yalnızca gerilimin sabit kalmasını sağlar",
        "Yalnızca uyartım akımını sabitlemesini",
        "Aktif yükün makineler arasında paylaşımı",
        "Yalnızca yakıt kalitesini düzeltmesini",
      ],
      correctAnswer: 2,
      explanation:
        "Droop, yük arttıkça devrin bir miktar düşmesine izin verir; aynı eğriye sahip makineler yükü oranlı paylaşır. Isochronous çalışmada paylaşım ayrı bir hat üzerinden yapılır.",
      category: "Gemi Elektrik",
    },
    {
      id: 162,
      question: "Paralel bağlamada faz sırası yanlışken şalter kapatılırsa ne olur?",
      options: [
        "Yalnızca frekans bir miktar düşer",
        "Yalnızca gerilim bir miktar düşer",
        "Yalnızca uyartım akımı yükselir",
        "Şiddetli akım darbesi ve hasar doğar",
      ],
      correctAnswer: 3,
      explanation:
        "Faz sırası ters olduğunda gelen makine bara ile karşı fazda birleşir; kısa devreye yakın bir akım akar, mil ve kaplin burulma darbesiyle hasar görür.",
      category: "Gemi Elektrik",
    },
    {
      id: 163,
      question: "Güç yönetim sistemi (PMS) temel olarak neyi yapar?",
      options: [
        "Jeneratörleri yüke göre devreye alıp çıkarır",
        "Yalnızca yakıt tüketimini kaydetmektedir",
        "Yalnızca kablo kesitlerini hesaplayıp raporlar",
        "Yalnızca aydınlatmayı otomatik açmaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "PMS bara yükünü sürekli izler; yük yükselince bekleyen jeneratörü otomatik yol verip senkronlar, yük düşünce fazlasını yükten alıp durdurur.",
      category: "Gemi Elektrik",
    },
    {
      id: 164,
      question: "PMS'in kara başlatma (blackout recovery) işlevi nedir?",
      options: [
        "Yalnızca alarm listesini sıfırlamasıdır",
        "Güç kaybında jeneratörü otomatik başlatmak",
        "Yalnızca yakıt valflerini kapatmasıdır",
        "Yalnızca kayıtları arşive taşımasıdır",
      ],
      correctAnswer: 1,
      explanation:
        "Bara gerilimi kaybolunca PMS bir jeneratörü otomatik yol verip panoya alır ve önceden tanımlı öncelik sırasına göre tüketicileri kademeli devreye sokar.",
      category: "Gemi Elektrik",
    },
    {
      id: 165,
      question: "PMS'te büyük tüketici isteği (heavy consumer request) neyi sağlar?",
      options: [
        "Yalnızca tüketicinin kalıcı kilitlenmesini",
        "Yalnızca alarm sesinin susturulmasını",
        "Büyük yük öncesi yeterli gücün hazırlanması",
        "Yalnızca yakıt debisinin artırılmasını",
      ],
      correctAnswer: 2,
      explanation:
        "Bow thruster gibi büyük bir tüketici çalışmadan önce PMS'e istek gönderir; yeterli yedek güç yoksa PMS ek jeneratör devreye alır ve ancak sonra izin verir.",
      category: "Gemi Elektrik",
    },
    {
      id: 166,
      question: "Kıyı bağlantısı (shore connection) kullanılmadan önce ne doğrulanır?",
      options: [
        "Yalnızca kablo renginin uygunluğu",
        "Yalnızca bağlantı kablosunun uzunluk yeterliği",
        "Yalnızca panonun boya durumu",
        "Gerilim, frekans ve faz sırası uygunluğu",
      ],
      correctAnswer: 3,
      explanation:
        "Kıyı şebekesinin gerilimi ve frekansı gemi sistemine uymalı, faz sırası doğrulanmalıdır; ters faz sırası pompa ve fanların ters yönde dönmesine yol açar.",
      category: "Gemi Elektrik",
    },
    {
      id: 167,
      question: "Kıyı bağlantı panosunda hangi gösterge zorunludur?",
      options: [
        "Faz sırası göstergesi bulunmalıdır",
        "Yalnızca sıcaklık göstergesi olmalı",
        "Yalnızca yakıt göstergesi olmalıdır",
        "Yalnızca su seviye göstergesi olmalı",
      ],
      correctAnswer: 0,
      explanation:
        "Klas kuralları kıyı bağlantı panosunda faz sırasını doğrulayan bir düzenek, gerilim göstergesi ve bağlantının kesildiğini gösteren uyarı bulunmasını ister.",
      category: "Gemi Elektrik",
    },
    {
      id: 168,
      question: "Limanda kıyı elektriği kullanmanın çevresel yararı nedir?",
      options: [
        "Yalnızca gemi gürültüsünü artırması",
        "Rıhtımda egzoz emisyonunun kesilmesi",
        "Yalnızca balast suyunu arıtması",
        "Yalnızca sintine üretimini artırması",
      ],
      correctAnswer: 1,
      explanation:
        "Jeneratörler durdurulduğu için rıhtımda NOx, SOx, partikül madde ve CO₂ salımı ile gürültü ortadan kalkar; bu yüzden birçok liman kıyı elektriğini zorunlu kılar.",
      category: "Gemi Elektrik",
    },
    {
      id: 169,
      question: "Ana dağıtım panosunun (MSB) işlevi nedir?",
      options: [
        "Yalnızca akü şarj devrelerini denetlemektedir",
        "Yalnızca aydınlatmayı beslemektedir",
        "Üretilen gücü tüketici gruplarına dağıtmak",
        "Yalnızca yakıt pompasını beslemektedir",
      ],
      correctAnswer: 2,
      explanation:
        "Jeneratörler ana panodaki baraya bağlanır; buradan motor grupları, trafolar ve alt panolar korumalı çıkışlarla beslenir. Pano gemi elektrik sisteminin merkezidir.",
      category: "Gemi Elektrik",
    },
    {
      id: 170,
      question: "Ana pano önünde yalıtkan paspas bulundurulmasının nedeni nedir?",
      options: [
        "Yalnızca panonun tozdan korunması",
        "Yalnızca zeminin çizilmemesi içindir",
        "Yalnızca panonun boyasını korumak",
        "Çarpılma akım yolunu kesmek içindir",
      ],
      correctAnswer: 3,
      explanation:
        "Yalıtkan paspas, personelin gövde ile güverte arasında akım yolu oluşturmasını engeller; kuru, hasarsız ve uygun gerilim sınıfında olması düzenli kontrol edilir.",
      category: "Gemi Elektrik",
    },
    {
      id: 171,
      question: "Ana panoda bara bağlantılarının sıcaklığı neden izlenir?",
      options: [
        "Gevşek bağlantı ısınıp yangın çıkarabilir",
        "Yalnızca panonun ağırlığını hesaplamak için",
        "Yalnızca gerilimi yükseltebilmek amacıyla",
        "Yalnızca frekansı sabitleyebilmek amacıyla",
      ],
      correctAnswer: 0,
      explanation:
        "Gevşeyen veya oksitlenen bağlantıda direnç artar, nokta ısınması oluşur ve zamanla ark ile yangın doğar; termal kamera taraması bunu erken yakalar.",
      category: "Gemi Elektrik",
    },
    {
      id: 172,
      question: "Acil dağıtım panosu (ESB) hangi kaynaktan beslenir?",
      options: [
        "Yalnızca ana panodan beslenmektedir",
        "Normalde ana panodan, kesintide acilden",
        "Yalnızca akü grubundan beslenmektedir",
        "Yalnızca kıyı bağlantısından beslenir",
      ],
      correctAnswer: 1,
      explanation:
        "Normal işletmede acil pano ana panodan beslenir; ana güç kaybolunca besleme otomatik olarak acil jeneratöre geçer ve acil yükler kesintiye uğramaz.",
      category: "Gemi Elektrik",
    },
    {
      id: 173,
      question: "Acil panodan beslenen tüketiciler hangileridir?",
      options: [
        "Yalnızca kamaralardaki klima üniteleri grubu",
        "Yalnızca yük vinçleri ve ırgat",
        "Acil aydınlatma, telsiz, yangın pompası",
        "Yalnızca mutfak ekipmanları grubu",
      ],
      correctAnswer: 2,
      explanation:
        "SOLAS acil panodan seyir fenerleri, acil aydınlatma, telsiz, yangın algılama, acil yangın pompası ve dümen donanımı gibi can emniyeti yüklerinin beslenmesini ister.",
      category: "Gemi Elektrik",
    },
    {
      id: 174,
      question: "Acil panonun ana panodan ayrı tutulmasının nedeni nedir?",
      options: [
        "Yalnızca kablo maliyetini düşürmek için",
        "Yalnızca panonun daha küçük olması için",
        "Yalnızca bakımı kolaylaştırmak amacıyla",
        "Ana pano su alsa da çalışır kalması için",
      ],
      correctAnswer: 3,
      explanation:
        "Acil pano ve jeneratör makine dairesi dışında, en üst sürekli güvertenin üzerinde bulunur; ana panoyu etkileyen yangın veya su basması acil sistemi devre dışı bırakmaz.",
      category: "Gemi Elektrik",
    },
    {
      id: 175,
      question: "Gemi kablolarında hangi özellik zorunlu olarak aranır?",
      options: [
        "Alev yayılımına dayanıklı olması",
        "Yalnızca kablonun renkli olması",
        "Yalnızca kablonun ucuz olması",
        "Yalnızca kablonun esnek olması",
      ],
      correctAnswer: 0,
      explanation:
        "Gemi kabloları alev yayılımını sınırlayan tipte olmalı, kritik devrelerde yangına dayanıklı kablo kullanılmalıdır; ayrıca nem, yağ ve tuz sisine dayanıklılık aranır.",
      category: "Gemi Elektrik",
    },
    {
      id: 176,
      question: "Kablo kesiti seçilirken hangi iki ölçüt birlikte gözetilir?",
      options: [
        "Yalnızca kablonun rengi ve uzunluğu değeri",
        "Akım taşıma kapasitesi ve gerilim düşümü",
        "Yalnızca kablonun markası ve satın alma fiyatı",
        "Yalnızca kablonun ağırlığı ve dış çapı",
      ],
      correctAnswer: 1,
      explanation:
        "Kesit hem sürekli akımı ısınmadan taşımalı hem de hat sonundaki gerilim düşümünü sınır içinde tutmalıdır; uzun hatlarda ikinci ölçüt belirleyici olur.",
      category: "Gemi Elektrik",
    },
    {
      id: 177,
      question: "Kablo döşemesinde bükülme yarıçapı neden önemlidir?",
      options: [
        "Yalnızca görünümü düzgün kılmak için",
        "Yalnızca kablo boyunu kısaltmak için",
        "Yalıtım ve iletken zarar görmemesi için",
        "Yalnızca kablo rengini korumak için",
      ],
      correctAnswer: 2,
      explanation:
        "Aşırı sıkı büküm yalıtımı inceltir, ekranı ve iletken tellerini zorlar; üretici en küçük bükülme yarıçapını kablo çapının katı olarak verir ve bu değere uyulur.",
      category: "Gemi Elektrik",
    },
    {
      id: 178,
      question: "Gemilerde izole nötr topraklama sisteminin temel üstünlüğü nedir?",
      options: [
        "Yalnızca kablo maliyetini düşürmesi",
        "Yalnızca gerilimi yükseltebilmesi",
        "Yalnızca jeneratör verimini artırması",
        "Tek toprak kaçağında beslemenin sürmesi",
      ],
      correctAnswer: 3,
      explanation:
        "Nötr toprağa bağlı olmadığından ilk toprak kaçağı devreyi açtırmaz; kritik tüketiciler çalışmaya devam eder ve arıza gemi seyir hâlindeyken aranabilir.",
      category: "Gemi Elektrik",
    },
    {
      id: 179,
      question: "İzole nötr sistemde ikinci bir toprak kaçağı ne yaratır?",
      options: [
        "İki nokta arasında kısa devre oluşur",
        "Yalnızca gerilim bir miktar düşer",
        "Yalnızca frekans bir miktar düşer",
        "Hiçbir değişiklik oluşmamaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "Farklı fazlarda oluşan ikinci kaçak, toprak üzerinden faz-faz kısa devresi yaratır; bu yüzden ilk kaçak alarmı ciddiye alınıp kaynağı hemen aranmalıdır.",
      category: "Gemi Elektrik",
    },
    {
      id: 180,
      question: "İnsülasyon (yalıtım) direnci hangi cihazla ölçülür?",
      options: [
        "Ampermetre ile doğrudan ölçülür",
        "Megger (yalıtım ölçer) ile ölçülür",
        "Takometre ile doğrudan ölçülür",
        "Manometre ile doğrudan ölçülür",
      ],
      correctAnswer: 1,
      explanation:
        "Megger, devreye yüksek doğru gerilim uygulayıp geçen sızıntı akımından direnci hesaplar; ölçüm öncesi devre gerilimsiz bırakılır ve kondansatörler boşaltılır.",
      category: "Gemi Elektrik",
    },
    {
      id: 181,
      question: "440 V bir devrede kabul edilebilir yalıtım direnci alt sınırı nedir?",
      options: [
        "Yaklaşık 1 kilohm dolayında olmalı",
        "Yaklaşık 10 kilohm dolayında olmalı",
        "En az 1 megaohm dolayında olmalı",
        "Yaklaşık 100 ohm dolayında olmalı",
      ],
      correctAnswer: 2,
      explanation:
        "Genel uygulamada çalışma gerilimi başına 1000 ohm ölçüt alınır; 440 V devrede pratik alt sınır 1 megaohm kabul edilir, düşen değer nem veya yalıtım bozulmasını gösterir.",
      category: "Gemi Elektrik",
    },
    {
      id: 182,
      question: "Büyük gemilerde 6,6 kV dağıtım neden tercih edilir?",
      options: [
        "Yalnızca kablo renklerini basitleştirmek için",
        "Yalnızca jeneratör devrini düşürmek için",
        "Yalnızca panonun küçülmesi amacıyla",
        "Aynı güçte akımı ve kayıpları düşürmek",
      ],
      correctAnswer: 3,
      explanation:
        "Güç sabitken gerilim yükseldikçe akım düşer; kablo kesitleri küçülür, hat kayıpları ve gerilim düşümü azalır. Bu yüzden büyük gemilerde yüksek gerilim seçilir.",
      category: "Gemi Elektrik",
    },
    {
      id: 183,
      question: "6,6 kV sistemden 440 V tüketicilere geçiş nasıl yapılır?",
      options: [
        "Güç transformatörü üzerinden yapılır",
        "Yalnızca doğrultucu üzerinden yapılır",
        "Yalnızca direnç kullanılarak yapılır",
        "Yalnızca kablo kesiti büyütülerek yapılır",
      ],
      correctAnswer: 0,
      explanation:
        "Yüksek gerilim barası güç transformatörleriyle 440 V alçak gerilim barasına indirilir; aydınlatma ve küçük tüketiciler ise ayrıca 230 V trafo üzerinden beslenir.",
      category: "Gemi Elektrik",
    },
    {
      id: 184,
      question: "440 V ile 230 V sistemler arasındaki bağlantı nasıl kurulur?",
      options: [
        "Yalnızca doğrudan bağlantı ile kurulur",
        "Alçaltıcı transformatör ile kurulmaktadır",
        "Yalnızca frekans değiştirilerek kurulur",
        "Yalnızca kablo uzatılarak kurulmaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "Aydınlatma ve priz devreleri 440/230 V alçaltıcı transformatörlerle beslenir; bu trafolar ayrıca galvanik ayırma sağlayarak arıza yayılmasını sınırlar.",
      category: "Gemi Elektrik",
    },
    {
      id: 185,
      question: "Yüksek gerilim ekipmanında çalışmadan önce hangi sıra izlenir?",
      options: [
        "Yalnızca panonun kapağı açılır",
        "Yalnızca pano üstüne uyarı levhası asılır",
        "Kes, kilitle, boşalt, topraklama uygula",
        "Yalnızca eldiven giyilip başlanır",
      ],
      correctAnswer: 2,
      explanation:
        "Gerilim kesilir, ayırıcı kilitlenip etiketlenir, kapasitif yükler boşaltılır, gerilimsizlik doğrulanır ve ancak sonra topraklama çubuğu bağlanarak çalışma başlar.",
      category: "Gemi Elektrik",
    },
    {
      id: 186,
      question: "Ark parlaması (arc flash) hangi tehlikeyi yaratır?",
      options: [
        "Yalnızca hafif bir gürültü yaratır",
        "Yalnızca sigortanın atmasına yol açar",
        "Yalnızca panonun boyasını bozar",
        "Yoğun ısı, basınç dalgası ve körlük",
      ],
      correctAnswer: 3,
      explanation:
        "Ark; binlerce dereceye çıkan ısı, erimiş metal saçılması, basınç dalgası ve göz kamaştırıcı parlama üretir. Ağır yanık ve kalıcı görme kaybı riski taşır.",
      category: "Gemi Elektrik",
    },
    {
      id: 187,
      question: "Ark parlamasına karşı hangi koruyucu donanım kullanılır?",
      options: [
        "Ark dayanımlı giysi ve yüz siperi",
        "Yalnızca pamuklu standart tulum",
        "Yalnızca ince lateks eldiven takımı",
        "Yalnızca toz maskesi ve gözlük",
      ],
      correctAnswer: 0,
      explanation:
        "Hesaplanan riske uygun ark dayanımlı giysi, yüz siperi, yalıtkan eldiven ve baret kullanılır; sentetik iç giysi erimeyi artırdığı için yasaklanır.",
      category: "Gemi Elektrik",
    },
    {
      id: 188,
      question: "Devre kesicinin termik açma elemanı neyi algılar?",
      options: [
        "Yalnızca ani kısa devre akımını algılar",
        "Uzun süreli aşırı yük akımını algılar",
        "Yalnızca toprak kaçağı akımını algılar",
        "Yalnızca gerilim düşmesini algılamakta",
      ],
      correctAnswer: 1,
      explanation:
        "Bimetal eleman akımın ısıtma etkisiyle bükülür ve gecikmeli açma yapar; bu gecikme motor kalkış akımının gereksiz açmaya yol açmasını önler.",
      category: "Gemi Elektrik",
    },
    {
      id: 189,
      question: "Devre kesicinin zaman-akım eğrisi neyi gösterir?",
      options: [
        "Yalnızca kesicinin fiziksel boyutunu",
        "Yalnızca kesicinin üretim yılını",
        "Akım düzeyine göre açma süresini",
        "Yalnızca kesicinin ağırlık değerini",
      ],
      correctAnswer: 2,
      explanation:
        "Eğri her akım değerinde kesicinin ne kadar sürede açacağını verir; seçicilik ayarı bu eğrilerin üst üste binmemesi sağlanarak yapılır.",
      category: "Gemi Elektrik",
    },
    {
      id: 190,
      question: "Aşırı akım korumasında seçicilik (selectivity) ilkesi ne demektir?",
      options: [
        "Tüm kesicilerin aynı anda birlikte açması demek",
        "Yalnızca ana kesicinin açması demektir",
        "Hiçbir kesicinin açmaması demektir",
        "Yalnızca arızaya en yakın kesicinin açması",
      ],
      correctAnswer: 3,
      explanation:
        "Arıza akımı yalnızca hatalı devreyi besleyen kesiciyi açtırmalıdır; üst kademedeki kesici kapalı kalır ve sağlam tüketiciler beslenmeye devam eder.",
      category: "Gemi Elektrik",
    },
    {
      id: 191,
      question: "Kısa devre akımının en belirgin özelliği nedir?",
      options: [
        "Çok büyük ve çok hızlı yükselmesi",
        "Yavaş ve kademeli yükselmesidir",
        "Anma akımının altında kalmasıdır",
        "Yalnızca gerilimi yükseltmesidir",
      ],
      correctAnswer: 0,
      explanation:
        "Empedans neredeyse sıfıra indiğinden akım milisaniyeler içinde anma değerinin onlarca katına çıkar; koruma bu yüzden gecikmesiz manyetik açma yapmak zorundadır.",
      category: "Gemi Elektrik",
    },
    {
      id: 192,
      question: "Kesme kapasitesi (breaking capacity) neyi ifade eder?",
      options: [
        "Yalnızca kesicinin anma çalışma akımı değerini",
        "Güvenle kesebileceği en büyük arıza akımı",
        "Yalnızca kesicinin çalışma gerilimini",
        "Yalnızca kesicinin açma süresi değerini",
      ],
      correctAnswer: 1,
      explanation:
        "Kesici, bulunduğu noktadaki olası en büyük kısa devre akımını hasar görmeden kesebilmelidir; yetersiz kesme kapasitesi kesicinin patlamasıyla sonuçlanır.",
      category: "Gemi Elektrik",
    },
    {
      id: 193,
      question: "Kısa devre korumada sigortanın kesiciye göre üstünlüğü nedir?",
      options: [
        "Yalnızca kolayca yeniden kurulabilmesi",
        "Yalnızca ayarlanabilir olması durumu",
        "Akımı tepe değerine varmadan sınırlaması",
        "Yalnızca daha uzun süre dayanabilmesi",
      ],
      correctAnswer: 2,
      explanation:
        "Akım sınırlayıcı sigorta, kısa devre akımı tepe değerine ulaşmadan eriyip devreyi keser; kablo ve ekipmanın maruz kaldığı termal ve dinamik zorlama böylece küçük kalır.",
      category: "Gemi Elektrik",
    },
    {
      id: 194,
      question: "Ters güç (reverse power) rölesi neyi algılar?",
      options: [
        "Yalnızca bara geriliminin düşmesini algılamaktadır",
        "Yalnızca frekans yükselmesini algılamakta",
        "Yalnızca toprak kaçağını algılamaktadır",
        "Jeneratörün baradan güç çekmeye başlaması",
      ],
      correctAnswer: 3,
      explanation:
        "Yakıt kesildiğinde veya tahrik kaybolduğunda jeneratör motor gibi davranıp baradan güç çeker; röle bu yön değişimini algılayıp makineyi baradan ayırır.",
      category: "Gemi Elektrik",
    },
    {
      id: 195,
      question: "Ters güç korumasının devreye girmemesi hangi hasara yol açar?",
      options: [
        "Tahrik makinesinin motor gibi sürülmesi",
        "Yalnızca gerilimin kalıcı yükselmesi",
        "Yalnızca frekansın kalıcı yükselmesi",
        "Yalnızca uyartım akımının sıfırlanması",
      ],
      correctAnswer: 0,
      explanation:
        "Yanma olmadan döndürülen dizel makine yağlanma ve soğutma açısından zorlanır; ayrıca sağlam jeneratörler bu kaybı karşılamak zorunda kalıp aşırı yüklenir.",
      category: "Gemi Elektrik",
    },
    {
      id: 196,
      question: "Ters güç rölesinin ayar değeri nasıl seçilir?",
      options: [
        "Yalnızca anma akımının iki katı olarak",
        "Anma gücünün küçük bir yüzdesi olarak",
        "Yalnızca anma geriliminin yarısı olarak",
        "Yalnızca anma frekansının iki katı olarak",
      ],
      correctAnswer: 1,
      explanation:
        "Ayar tipik olarak anma gücünün %2-15 aralığındadır; dizel makinelerde alt uç, buhar türbinlerinde üst uç kullanılır. Kısa bir zaman gecikmesi geçici salınımları eler.",
      category: "Gemi Elektrik",
    },
    {
      id: 197,
      question: "Tercihli açma (preferential trip) ne zaman devreye girer?",
      options: [
        "Yalnızca gerilim yükseldiğinde girer",
        "Yalnızca toprak kaçağı olduğunda girer",
        "Bara aşırı yüklenmeye başladığında girer",
        "Yalnızca frekans yükseldiğinde girer",
      ],
      correctAnswer: 2,
      explanation:
        "Yük jeneratör kapasitesini aşmaya başlayınca sistem önceden belirlenmiş önemsiz tüketicileri kademeli olarak yükten atar; böylece blackout yerine kısmi kayıp yaşanır.",
      category: "Gemi Elektrik",
    },
    {
      id: 198,
      question: "Tercihli açmada hangi tüketiciler önce yükten atılır?",
      options: [
        "Yalnızca dümen donanımı devreleri",
        "Yalnızca acil yangın pompası devresi",
        "Yalnızca seyir feneri devreleri",
        "Klima ve konfor amaçlı tüketiciler",
      ],
      correctAnswer: 3,
      explanation:
        "Seyir emniyeti ile can emniyetini etkilemeyen yükler ilk sırada atılır; dümen, seyir fenerleri ve yangın pompası hiçbir kademede tercihli açmaya konu edilmez.",
      category: "Gemi Elektrik",
    },
    {
      id: 199,
      question: "Tercihli açma ile blackout arasındaki fark nedir?",
      options: [
        "Tercihli açma kısmi, blackout tam kayıptır",
        "İkisi de gemi genelinde tüm gücün kaybı demektir",
        "Tercihli açma yalnızca limanda görülür",
        "Blackout yalnızca seyirde görülmektedir",
      ],
      correctAnswer: 0,
      explanation:
        "Tercihli açma önlem niteliğindedir ve yalnızca seçilmiş yükleri keser; blackout ise jeneratörlerin tamamının devre dışı kalması ve baranın gerilimsiz olmasıdır.",
      category: "Gemi Elektrik",
    },
    {
      id: 200,
      question: "Toprak kaçağı izleme düzeneği panoda nasıl gösterilir?",
      options: [
        "Yalnızca tek bir dijital sayaç ile",
        "Üç faz lambası ve kaçak göstergesiyle",
        "Yalnızca bir adet sesli korna ile",
        "Yalnızca bir adet ampermetre ile",
      ],
      correctAnswer: 1,
      explanation:
        "Klasik düzende üç faz lambasından kaçak olan fazınki söner, diğer ikisi parlar; modern sistemlerde sürekli ölçen yalıtım izleme cihazı direnç değerini gösterir.",
      category: "Gemi Elektrik",
    },
    {
      id: 201,
      question: "Toprak kaçağı alarmı geldiğinde arıza nasıl aranır?",
      options: [
        "Yalnızca ana kesici açılıp beklenir",
        "Yalnızca alarm susturulup geçilir",
        "Devreler tek tek ayrılarak taranır",
        "Yalnızca jeneratör değiştirilir",
      ],
      correctAnswer: 2,
      explanation:
        "Alt devreler sırayla ayrılır; gösterge normale döndüğünde son ayrılan devre suçludur. Arama planlı yapılır ve kritik tüketiciler önceden köprüüstüne bildirilir.",
      category: "Gemi Elektrik",
    },
    {
      id: 202,
      question: "Toprak kaçağının en yaygın fiziksel nedeni nedir?",
      options: [
        "Yalnızca kablonun uzun olmasıdır",
        "Yalnızca frekansın düşük olmasıdır",
        "Yalnızca gerilimin yüksek olmasıdır",
        "Nem ve yalıtımın bozulmuş olması",
      ],
      correctAnswer: 3,
      explanation:
        "Yoğuşma, deniz suyu sızıntısı, yaşlanmış yalıtım ve ezilmiş kablo en sık nedenlerdir; ıslanan motorlar kurutulup megger ile ölçülmeden devreye alınmaz.",
      category: "Gemi Elektrik",
    },
    {
      id: 203,
      question: "Üç fazlı asenkron motorda kayma (slip) nedir?",
      options: [
        "Senkron devir ile rotor devri farkı",
        "Yalnızca yatak boşluğunun değeri",
        "Yalnızca gerilim düşümünün oranı",
        "Yalnızca akımın gecikme açısıdır",
      ],
      correctAnswer: 0,
      explanation:
        "Rotor, stator alanından biraz yavaş döner; bu fark olmadan rotorda gerilim indüklenmez ve moment üretilemez. Tam yükte kayma tipik olarak %2-5 dolayındadır.",
      category: "Gemi Elektrik",
    },
    {
      id: 204,
      question: "Sincap kafesli rotorun yapısı nasıldır?",
      options: [
        "Sargıları dışarı fırçayla bağlanır",
        "Kısa devre halkalı çubuklardan oluşur",
        "Kalıcı mıknatıslardan oluşmaktadır",
        "Yalnızca yalıtkan malzemeden yapılır",
      ],
      correctAnswer: 1,
      explanation:
        "Rotor oluklarına yerleştirilen alüminyum veya bakır çubuklar iki uçtaki halkalarla kısa devre edilir; fırça ve bilezik bulunmadığından bakım ihtiyacı çok düşüktür.",
      category: "Gemi Elektrik",
    },
    {
      id: 205,
      question: "Asenkron motorun devri hangi bağıntıyla belirlenir?",
      options: [
        "Yalnızca uygulanan gerilim değeriyle",
        "Yalnızca motorun anma gücü değeriyle",
        "Frekans ve kutup sayısıyla belirlenir",
        "Yalnızca yatak sıcaklığı değeriyle",
      ],
      correctAnswer: 2,
      explanation:
        "Senkron devir n = 120f/p bağıntısıyla bulunur; gerçek devir bundan kayma kadar düşüktür. Gerilim değişimi devri değil momenti ve akımı etkiler.",
      category: "Gemi Elektrik",
    },
    {
      id: 206,
      question: "Doğrudan yol vermede (DOL) kalkış akımı ne olur?",
      options: [
        "Anma akımının yarısı kadar olur",
        "Anma akımına eşit değerde olur",
        "Anma akımının onda biri olur",
        "Anma akımının 6-8 katına çıkar",
      ],
      correctAnswer: 3,
      explanation:
        "Kalkış anında rotor durduğundan kayma birdir ve motor kısa devre gibi davranır; bu yüzden akım anma değerinin katlarına çıkar ve şebekede gerilim çökmesi yaratabilir.",
      category: "Gemi Elektrik",
    },
    {
      id: 207,
      question: "Yıldız-üçgen yol vermede kalkış akımı nasıl değişir?",
      options: [
        "Doğrudan yol vermenin üçte birine iner",
        "Doğrudan yol vermenin iki katına çıkar",
        "Doğrudan yol verme ile aynı düzeyde kalır",
        "Kalkış akımı tümüyle sıfıra inmektedir",
      ],
      correctAnswer: 0,
      explanation:
        "Yıldız bağlantıda sargı gerilimi düştüğü için hem akım hem moment yaklaşık üçte bire iner; bu yüzden yöntem yalnızca yüksüz veya hafif yükte kalkan motorlarda kullanılır.",
      category: "Gemi Elektrik",
    },
    {
      id: 208,
      question: "VFD ile yol vermenin diğer yöntemlere göre üstünlüğü nedir?",
      options: [
        "Yalnızca daha ucuz bir çözüm olması",
        "Akımı sınırlayıp momenti korumasıdır",
        "Yalnızca hiç harmonik üretmemesidir",
        "Yalnızca hiç soğutma gerektirmemesi",
      ],
      correctAnswer: 1,
      explanation:
        "Frekans ve gerilim birlikte yükseltilerek motor düşük akımla tam momentle kalkar; kalkış süresi ve rampası ayarlanabildiğinden mekanik zorlanma en aza iner.",
      category: "Gemi Elektrik",
    },
    {
      id: 209,
      question: "Seri sargılı DC motorun belirgin özelliği nedir?",
      options: [
        "Yalnızca sabit devirde çalışabilmesi",
        "Yalnızca yüksüz çalışabilmesi durumu",
        "Kalkışta yüksek moment üretebilmesi",
        "Yalnızca alternatif akımla çalışması",
      ],
      correctAnswer: 2,
      explanation:
        "Uyartım sargısı endüvi ile seri olduğundan akım arttıkça alan da güçlenir ve kalkış momenti yüksek olur. Buna karşılık yüksüz kaldığında devri tehlikeli biçimde yükselir.",
      category: "Gemi Elektrik",
    },
    {
      id: 210,
      question: "Şönt sargılı DC motorun tipik kullanım nedeni nedir?",
      options: [
        "Yalnızca çok yüksek kalkış momenti",
        "Yalnızca hiç bakım gerektirmemesi",
        "Yalnızca alternatif akımla çalışması",
        "Yük değişse de devrin kararlı kalması",
      ],
      correctAnswer: 3,
      explanation:
        "Uyartım sargısı endüviye paralel olduğundan alan yükten bağımsızdır; devir yük değişimlerinde küçük bir sapmayla kararlı kalır, bu yüzden sabit hız istenen işlerde kullanılır.",
      category: "Gemi Elektrik",
    },
    {
      id: 211,
      question: "DC motorda komütatör ve fırçalar hangi bakımı gerektirir?",
      options: [
        "Aşınma ve kıvılcım kontrolü gerektirir",
        "Yalnızca boya yenilenmesi gerektirir",
        "Yalnızca gres eklenmesi gerektirir",
        "Yalnızca etiket değişimi gerektirir",
      ],
      correctAnswer: 0,
      explanation:
        "Fırça boyu, yay baskısı, komütatör yüzeyinin düzgünlüğü ve dilimler arası yalıtım düzenli kontrol edilir; aşırı kıvılcım yanlış fırça konumu veya kirli yüzey işaretidir.",
      category: "Gemi Elektrik",
    },
    {
      id: 212,
      question: "Frekans dönüştürücüde V/f oranının sabit tutulmasının nedeni nedir?",
      options: [
        "Yalnızca harmonikleri azaltabilmek için",
        "Manyetik akıyı ve momenti korumak için",
        "Yalnızca soğutmayı kolaylaştırmak için",
        "Yalnızca kabloyu koruyabilmek amacıyla",
      ],
      correctAnswer: 1,
      explanation:
        "Akı, gerilimin frekansa oranıyla belirlenir; oran sabit tutulmazsa düşük frekansta akı doyar ve motor aşırı ısınır, yüksek frekansta ise moment düşer.",
      category: "Gemi Elektrik",
    },
    {
      id: 213,
      question: "Motor termik korumasının görevi nedir?",
      options: [
        "Yalnızca kısa devreyi kesmesidir",
        "Yalnızca gerilimi sabitlemesidir",
        "Aşırı yükte sargıyı yanmadan korumak",
        "Yalnızca frekansı sabitlemesidir",
      ],
      correctAnswer: 2,
      explanation:
        "Termik röle akımın ısıtma etkisini taklit eder ve sargı sıcaklığı sınırı aşmadan devreyi keser; ayar akımı motorun etiket akımına göre yapılır.",
      category: "Gemi Elektrik",
    },
    {
      id: 214,
      question: "Uzun süre durmuş bir motor devreye alınmadan önce ne yapılır?",
      options: [
        "Yalnızca yataklarına gres basılması yeterlidir",
        "Yalnızca gövde boyasının yenilenmesi yeterlidir",
        "Yalnızca etiket bilgilerinin okunması yeterlidir",
        "Yalıtım direnci ölçülüp gerekiyorsa kurutulur",
      ],
      correctAnswer: 3,
      explanation:
        "Duran motorda sargılar nem çeker; ölçüm sınırın altındaysa motor ısıtıcı veya düşük gerilimle kurutulur. Ayrıca yataklar elle çevrilerek serbestliği doğrulanır.",
      category: "Gemi Elektrik",
    },
    {
      id: 215,
      question: "Seyir fenerleri panosunda hangi düzenek zorunludur?",
      options: [
        "Fener sönünce uyaran alarm düzeneği",
        "Yalnızca dijital saat düzeneği bulunur",
        "Yalnızca sıcaklık göstergesi bulunur",
        "Yalnızca sesli korna düzeneği bulunur",
      ],
      correctAnswer: 0,
      explanation:
        "Seyir feneri panosu her feneri ayrı devreden besler ve lamba yandığında veya devre koptuğunda sesli ve ışıklı uyarı verir; ayrıca her fener için yedek lamba bulunur.",
      category: "Gemi Elektrik",
    },
    {
      id: 216,
      question: "Seyir fenerleri hangi kaynaklardan beslenir?",
      options: [
        "Yalnızca akü grubundan beslenirler",
        "Ana ve acil panodan çift beslemeli",
        "Yalnızca kıyı bağlantısından beslenir",
        "Yalnızca şaft jeneratöründen beslenir",
      ],
      correctAnswer: 1,
      explanation:
        "SOLAS seyir fenerlerinin ana ve acil kaynaktan ayrı devrelerle beslenmesini ister; kaynak değişimi pano üzerindeki komütatörle yapılır ve köprüüstünden izlenir.",
      category: "Gemi Elektrik",
    },
    {
      id: 217,
      question: "Seyir feneri lambası yanarsa ne yapılır?",
      options: [
        "Yalnızca alarm susturulup beklenir",
        "Yalnızca bir sonraki limanda değişir",
        "Yedek lamba ile hemen değiştirilir",
        "Yalnızca jurnale yazılıp geçilir",
      ],
      correctAnswer: 2,
      explanation:
        "Fener arızası çatışma riski doğuran bir eksikliktir; yedek lamba derhal takılır, değişim jurnale kaydedilir ve pano alarmının normale döndüğü doğrulanır.",
      category: "Gemi Elektrik",
    },
    {
      id: 218,
      question: "Acil aydınlatma hangi kaynaktan beslenir?",
      options: [
        "Yalnızca ana jeneratörden beslenir",
        "Yalnızca kıyı bağlantısından beslenir",
        "Yalnızca şaft jeneratöründen beslenir",
        "Acil jeneratör ve geçici akü kaynağı",
      ],
      correctAnswer: 3,
      explanation:
        "Ana güç kesilince akü grubu aydınlatmayı anında devralır; acil jeneratör devreye girene kadar geçen boşluk böylece kapatılır ve tahliye yolları karanlıkta kalmaz.",
      category: "Gemi Elektrik",
    },
    {
      id: 219,
      question: "Acil aydınlatmanın kapsaması gereken yerler nerelerdir?",
      options: [
        "Kaçış yolları, muster ve can salı alanları",
        "Yalnızca kaptan kamarası ile yemek salonu alanı",
        "Yalnızca mutfak ve kiler bölümü alanı",
        "Yalnızca makine dairesi atölye alanı",
      ],
      correctAnswer: 0,
      explanation:
        "Koridorlar, merdivenler, çıkışlar, toplanma istasyonları, can salı ve filika bölgeleri, makine kontrol odası ile telsiz odası acil aydınlatma kapsamındadır.",
      category: "Gemi Elektrik",
    },
    {
      id: 220,
      question: "Acil aydınlatma sisteminin testi neyi doğrular?",
      options: [
        "Yalnızca armatürlerin boyandığını",
        "Kesintide gereken süre yandığını",
        "Yalnızca lambaların yeni olduğunu",
        "Yalnızca panonun temiz olduğunu",
      ],
      correctAnswer: 1,
      explanation:
        "Besleme kesilerek yapılan test, aydınlatmanın anında devreye girdiğini ve gemi tipine göre öngörülen süre boyunca yanmayı sürdürdüğünü kanıtlar; sonuç kayda geçirilir.",
      category: "Gemi Elektrik",
    },
    {
      id: 221,
      question: "Kurşun asitli akü şarj olurken hangi gaz açığa çıkar?",
      options: [
        "Yalnızca azot gazı açığa çıkmaktadır",
        "Yalnızca karbondioksit açığa çıkar",
        "Hidrojen gazı açığa çıkmaktadır",
        "Yalnızca metan gazı açığa çıkar",
      ],
      correctAnswer: 2,
      explanation:
        "Şarjın son aşamasında suyun ayrışmasıyla hidrojen ve oksijen çıkar; hidrojen havadan hafif olduğu için tavanda birikir ve patlayıcı karışım oluşturur.",
      category: "Gemi Elektrik",
    },
    {
      id: 222,
      question: "Akü odasında hangi düzenek zorunludur?",
      options: [
        "Yalnızca sıcaklık göstergesi bulunur",
        "Yalnızca kapalı bir dolap bulunur",
        "Yalnızca yangın battaniyesi bulunur",
        "Bağımsız havalandırma bulunmalıdır",
      ],
      correctAnswer: 3,
      explanation:
        "Akü odası tavandan bağımsız kanalla havalandırılır; içeride kıvılcım üretebilecek şalter ve armatür bulunmaz, aydınlatma patlama korumalı seçilir.",
      category: "Gemi Elektrik",
    },
    {
      id: 223,
      question: "Bakım gerektirmeyen (VRLA) akünün kurşun asitliye göre farkı nedir?",
      options: [
        "Elektroliti kapalı, su eklenmez yapıda",
        "Yalnızca daha uzun ömürlü olmasıdır",
        "Yalnızca hiç gaz üretmemesi durumu",
        "Yalnızca daha ucuz olması durumudur",
      ],
      correctAnswer: 0,
      explanation:
        "Valf düzenlemeli akülerde elektrolit jel veya cam elyaf içinde tutulur ve üretilen gaz içeride yeniden birleşir; yine de aşırı şarjda gaz atar, havalandırma gerekir.",
      category: "Gemi Elektrik",
    },
    {
      id: 224,
      question: "UPS'in gemideki temel işlevi nedir?",
      options: [
        "Yalnızca çıkış gerilimini yükseltmesidir",
        "Kesintide kritik yükü kesintisiz besler",
        "Yalnızca frekansı düşürmesidir",
        "Yalnızca akü şarjını yapmasıdır",
      ],
      correctAnswer: 1,
      explanation:
        "UPS, ana besleme kesildiğinde akü üzerinden anında devreye girerek seyir cihazları, otomasyon ve haberleşme gibi kesintiye duyarlı yükleri besler.",
      category: "Gemi Elektrik",
    },
    {
      id: 225,
      question: "Online (çift dönüşümlü) UPS nasıl çalışır?",
      options: [
        "Yalnızca kesinti anında devreye girer",
        "Yalnızca gerilimi filtreleyip geçirir",
        "Yükü sürekli invertör üzerinden besler",
        "Yalnızca aküyü şarj etmekle yetinir",
      ],
      correctAnswer: 2,
      explanation:
        "Şebeke önce doğrultulur, sonra invertörle yeniden üretilir; yük hiçbir zaman doğrudan şebekeye bağlı olmadığından geçiş süresi sıfırdır ve dalga biçimi temizdir.",
      category: "Gemi Elektrik",
    },
    {
      id: 226,
      question: "UPS aküsünün periyodik testinde ne doğrulanır?",
      options: [
        "Yalnızca akünün dış görünümü doğrulanır",
        "Yalnızca akünün üretim tarihi doğrulanır",
        "Yalnızca akünün ağırlığı doğrulanır",
        "Öngörülen süre yükü besleyebildiği",
      ],
      correctAnswer: 3,
      explanation:
        "Besleme kesilip UPS gerçek yükle çalıştırılır ve tasarım süresi boyunca gerilimi koruduğu ölçülür; kapasitesi düşen akü grubu süre dolmadan yenilenir.",
      category: "Gemi Elektrik",
    },
    {
      id: 227,
      question: "Patlama korumalı (Ex-proof) ekipman nerede kullanılır?",
      options: [
        "Yanıcı gaz bulunabilen tehlikeli bölgelerde",
        "Yalnızca köprüüstü konsolu içerisinde",
        "Yalnızca kamara koridorlarında kullanılabilmekte",
        "Yalnızca mutfak bölümünde kullanılmakta",
      ],
      correctAnswer: 0,
      explanation:
        "Kargo pompa dairesi, boya deposu, akü odası ve tanker güvertesi gibi yanıcı buhar bulunabilen bölgelerde yalnızca bölge sınıfına uygun sertifikalı ekipman kullanılır.",
      category: "Gemi Elektrik",
    },
    {
      id: 228,
      question: "Ex d (alev sızdırmaz) koruma türü nasıl çalışır?",
      options: [
        "Yalnızca ekipmanı tümüyle soğutarak",
        "Patlamayı gövde içinde hapsederek",
        "Yalnızca gazı ekipmandan uzaklaştırarak",
        "Yalnızca akımı tümüyle keserek çalışır",
      ],
      correctAnswer: 1,
      explanation:
        "Gövde içeride oluşabilecek patlamaya dayanır ve alevin dar geçitlerden soğuyarak dışarı çıkmasını engeller; bu yüzden kapak yüzeyleri ve cıvata sayısı değiştirilmez.",
      category: "Gemi Elektrik",
    },
    {
      id: 229,
      question: "Ex sertifikalı bir armatürün onarımında hangi kural geçerlidir?",
      options: [
        "Yalnızca en yakın parça takılabilir",
        "Yalnızca yerli parça kullanılabilir",
        "Orijinal parça ve conta kullanılmalı",
        "Yalnızca cam yüzey değiştirilebilir",
      ],
      correctAnswer: 2,
      explanation:
        "Conta, cam, cıvata ve kablo rakoru dâhil her parça sertifikaya uygun orijinal olmalıdır; tek bir uygunsuz parça koruma sınıfını ve sertifikanın geçerliliğini bitirir.",
      category: "Gemi Elektrik",
    },
    {
      id: 230,
      question: "Lityum iyon bataryada termal kaçak (thermal runaway) nedir?",
      options: [
        "Yalnızca akünün yavaşça boşalmasıdır",
        "Yalnızca şarj süresinin uzamasıdır",
        "Yalnızca kapasitenin azalmasıdır",
        "Isının kendi kendini besleyerek artması",
      ],
      correctAnswer: 3,
      explanation:
        "Bir hücrede başlayan aşırı ısınma kimyasal ayrışmayı hızlandırır, açığa çıkan ısı komşu hücreleri tetikler ve zincirleme yayılır; süreç dışarıdan soğutulmadan durmaz.",
      category: "Gemi Elektrik",
    },
    {
      id: 231,
      question: "Batarya enerji depolamada termal kaçağı başlatan en yaygın etken nedir?",
      options: [
        "Aşırı şarj, iç kısa devre veya darbe",
        "Yalnızca bataryanın boş bırakılması",
        "Yalnızca ortam sıcaklığının düşmesi",
        "Yalnızca kablo renginin değişmesi",
      ],
      correctAnswer: 0,
      explanation:
        "Aşırı şarj, hücre içi kısa devre, mekanik darbe ve üretim kusuru başlıca tetikleyicilerdir; batarya yönetim sistemi bu koşulları izleyip hücreyi devreden ayırır.",
      category: "Gemi Elektrik",
    },
    {
      id: 232,
      question: "Batarya odasında termal kaçağa karşı hangi önlem alınır?",
      options: [
        "Yalnızca oda kapısı kilitlenmektedir",
        "Sıcaklık izleme, ayırma ve havalandırma",
        "Yalnızca oda aydınlatması artırılır",
        "Yalnızca oda zemini boyanmaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "Hücre bazında sıcaklık ve gerilim izlenir, modüller yangına dayanıklı bölmelerle ayrılır, gaz algılama ile zorlamalı havalandırma kurulur ve uygun söndürme sistemi bulunur.",
      category: "Gemi Elektrik",
    },
  ],
};
