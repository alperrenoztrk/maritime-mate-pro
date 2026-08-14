import type { QuizQuestion } from "@/types/quiz";

/**
 * Konu doldurma bankası 5 — makine dairesi kaynak yönetimi (ERM) konu
 * bankasında konu başına en az 8 soru hedefini tutturmak için yazılan ek
 * sorular.
 *
 * `exerciseQuestionDistribution.ts` soruları konu başlıklarıyla sözcük örtüşmesine
 * göre eşlediğinden her soru hedeflediği konunun kendi terminolojisini kullanır;
 * aksi hâlde benzerlik puanı soruyu komşu konuya taşır.
 *
 * Numaralandırma taban + devam + vaka bankalarının ardından sürer (155'ten
 * başlar); `machineQuizDataIndex.ts` bankaları slug bazında bu sırayla birleştirir.
 */
export const machineQuizQuestionsTopicFill5: Record<string, QuizQuestion[]> = {
  erm: [
    {
      id: 155,
      question: "Makine dairesi kaynak yönetimi (ERM) neyi amaçlar?",
      options: [
        "İnsan ve donanım kaynaklarını etkin kullanmak",
        "Yalnızca makinelerin bakım aralığını uzatmak",
        "Yalnızca yakıt tüketimini düşürebilmek",
        "Yalnızca vardiya sayısını azaltabilmek",
      ],
      correctAnswer: 0,
      explanation:
        "ERM; teknik yeterliliğin yanında iletişim, iş yükü paylaşımı, durumsal farkındalık ve karar verme becerilerini kullanarak eldeki tüm kaynakların emniyetle yönetilmesini hedefler.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 156,
      question: "Deniz kazalarının büyük bölümünde temel neden olarak ne bulunur?",
      options: [
        "Yalnızca malzeme yorulması hatası",
        "İnsan faktörü kaynaklı hatalar",
        "Yalnızca hava koşullarının sertliği",
        "Yalnızca tersane inşa kusurları",
      ],
      correctAnswer: 1,
      explanation:
        "Kaza incelemeleri olayların büyük çoğunluğunda insan faktörünün belirleyici olduğunu gösterir; ERM eğitimi tam da bu payı küçültmek için zorunlu kılınmıştır.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 157,
      question: "ERM'nin teknik eğitimden farkı nedir?",
      options: [
        "Yalnızca makine bilgisini derinleştirmesi",
        "Yalnızca yazılı sınavla ölçülebilmesi",
        "Teknik dışı beceriler üzerine kurulması",
        "Yalnızca zabitleri kapsamına alması",
      ],
      correctAnswer: 2,
      explanation:
        "ERM, teknik bilgiyi değil onu emniyetle kullanmayı sağlayan teknik dışı becerileri geliştirir: iletişim, liderlik, durumsal farkındalık ve karar verme.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 158,
      question: "BRM kavramı ilk olarak hangi alandan uyarlanmıştır?",
      options: [
        "Karayolu taşımacılığı eğitiminden",
        "Tıp alanındaki ameliyat eğitiminden",
        "İnşaat sektörü güvenlik eğitiminden",
        "Havacılıktaki ekip kaynak yönetiminden",
      ],
      correctAnswer: 3,
      explanation:
        "Havacılıkta geliştirilen ekip kaynak yönetimi köprüüstüne BRM olarak uyarlanmış; aynı yaklaşım daha sonra makine dairesi için ERM adıyla düzenlenmiştir.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 159,
      question: "ERM'nin BRM'den ayrıldığı temel nokta nedir?",
      options: [
        "Makine dairesi ortamına uyarlanmış olması",
        "Yalnızca kaptanları kapsıyor olması",
        "İletişim konusunu tümüyle dışlaması",
        "Yalnızca simülatörde uygulanabilmesi",
      ],
      correctAnswer: 0,
      explanation:
        "İki yaklaşım aynı ilkelere dayanır; ERM bunları gürültülü, sıcak ve görüş alanı sınırlı makine dairesi ortamına, vardiya düzenine ve köprüüstüyle koordinasyona uyarlar.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 160,
      question: "STCW'de ERM eğitimi hangi personel için aranır?",
      options: [
        "Yalnızca baş mühendisler için aranır",
        "Makine vardiyası tutan mühendisler için",
        "Yalnızca stajyer mühendisler için aranır",
        "Yalnızca güverte zabitleri için aranır",
      ],
      correctAnswer: 1,
      explanation:
        "Manila değişiklikleriyle ERM, işletme ve yönetim seviyesindeki makine zabitleri için zorunlu yeterlilik hâline gelmiş ve yeterlilik belgesi şartlarına eklenmiştir.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 161,
      question: "Durumsal farkındalığın üç düzeyi hangi sırayla gelişir?",
      options: [
        "Karar, algılama, uygulama sırasıyla",
        "Uygulama, algılama, anlamlandırma ile",
        "Algılama, anlamlandırma, öngörme ile",
        "Öngörme, algılama, anlamlandırma ile",
      ],
      correctAnswer: 2,
      explanation:
        "Önce göstergeler ve ortam algılanır, sonra bu verinin ne anlama geldiği kavranır ve son olarak yakın gelecekte ne olacağı öngörülür; her düzey bir öncekine dayanır.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 162,
      question: "STCW'nin ERM için aradığı yeterlilik alanları nelerdir?",
      options: [
        "Yalnızca yazılı raporlama ve arşivleme",
        "Yalnızca yabancı dil ve telsiz kullanımı",
        "Yalnızca elektrik ve otomasyon bilgisi",
        "Kaynak dağıtımı, karar verme ve iletişim",
      ],
      correctAnswer: 3,
      explanation:
        "STCW; kaynakların dağıtımı ve önceliklendirilmesi, etkin iletişim, kararlılık ve liderlik ile durumsal farkındalığın korunmasını ERM yeterlilik ölçütü sayar.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 163,
      question: "Durumsal liderlik yaklaşımı neyi savunur?",
      options: [
        "Tarzın ekibin olgunluğuna göre değişmesini",
        "Her koşulda emir-komuta tarzının kullanımını",
        "Her koşulda karar yetkisinin devredilmesini",
        "Liderlik tarzının hiç değiştirilmemesini",
      ],
      correctAnswer: 0,
      explanation:
        "Ekibin yetkinliği ve isteği düştükçe daha yönlendirici, yükseldikçe daha destekleyici ve devredici bir tarz uygundur; her duruma uyan tek bir liderlik tarzı yoktur.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 164,
      question: "Acil durumda hangi liderlik tarzı genellikle uygundur?",
      options: [
        "Uzun tartışmaya dayalı katılımcı tarz",
        "Net ve yönlendirici komut veren tarz",
        "Kararı tümüyle ekibe bırakan tarz",
        "Hiç talimat vermeyen serbest tarz",
      ],
      correctAnswer: 1,
      explanation:
        "Zamanın kısıtlı ve riskin yüksek olduğu anlarda net, kısa ve doğrulanan komutlar gerekir; katılımcı tarz ise planlama ve değerlendirme aşamalarında değerlidir.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 165,
      question: "Bir liderin ekipte güven oluşturmasının temel yolu nedir?",
      options: [
        "Hatayı yalnızca kişide aramak",
        "Bilgiyi ekipten saklı tutmak",
        "Sözü ile davranışının tutarlılığı",
        "Her kararı tek başına vermek",
      ],
      correctAnswer: 2,
      explanation:
        "Ekip, söylediğini yapan ve kendi hatasını da kabul eden lidere güvenir; tutarsız davranış raporlamayı azaltır ve sorunların gizlenmesine yol açar.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 166,
      question: "Gürültülü makine dairesinde iletişimde ne yapılır?",
      options: [
        "Yalnızca yüksek sesle bağırılır",
        "Yalnızca el işaretine güvenilir",
        "Yalnızca telsizle konuşulur",
        "Mesaj kısaltılıp geri okutulur",
      ],
      correctAnswer: 3,
      explanation:
        "Gürültü sözcük kaybına yol açar; bu yüzden mesaj kısa ve tek anlamlı tutulur, karşı taraftan geri okuma istenir ve kritik komutlar el işaretiyle desteklenir.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 167,
      question: "Etkin iletişimde aktif dinleme ne anlama gelir?",
      options: [
        "Anlamı doğrulayıp geri bildirim vermek",
        "Karşı tarafın sözünü sürekli kesmek",
        "Yalnızca sessizce başını sallamak",
        "Kendi cevabını hazırlamaya odaklanmak",
      ],
      correctAnswer: 0,
      explanation:
        "Aktif dinleme; konuşana dikkatini vermeyi, anladığını kendi sözcükleriyle özetleyip doğrulamayı ve gerektiğinde soru sormayı içerir. Sessiz onay anlaşıldığının kanıtı değildir.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 168,
      question: "Bir talimat verirken belirsizliği azaltmanın yolu nedir?",
      options: [
        "Talimatı genel ifadelerle vermek",
        "Kim, ne, ne zaman bilgisini vermek",
        "Talimatı yalnızca bir kez söylemek",
        "Talimatı yazılı olarak vermemek",
      ],
      correctAnswer: 1,
      explanation:
        "Talimat kime verildiği, tam olarak ne isteniyor ve ne zaman tamamlanacağı belirtilerek verilir; muhatabı adıyla çağırmak sorumluluğun kimde olduğunu netleştirir.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 169,
      question: "Kapalı döngü iletişim kaç adımdan oluşur?",
      options: [
        "Yalnızca gönderme adımından",
        "Gönderme ve dinleme adımından",
        "Gönderme, geri okuma, onaylama",
        "Gönderme ve arşivleme adımından",
      ],
      correctAnswer: 2,
      explanation:
        "Gönderen mesajı iletir, alan geri okur, gönderen okumanın doğruluğunu onaylar. Üçüncü adım atlanırsa yanlış anlaşılmış bir mesaj doğru sanılarak uygulanır.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 170,
      question: "Kapalı döngü iletişim en çok hangi durumda önemlidir?",
      options: [
        "Yalnızca liman içindeki sohbetlerde",
        "Yalnızca yazılı raporlamalarda",
        "Yalnızca eğitim toplantılarında",
        "Manevra ve acil durum komutlarında",
      ],
      correctAnswer: 3,
      explanation:
        "Manevra, valf kapatma ve devreye alma gibi geri dönüşü zor işlemlerde tek bir yanlış anlama ağır sonuç doğurur; bu yüzden komut mutlaka geri okutulup onaylanır.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 171,
      question: "Geri okuma sırasında hata fark edilirse ne yapılır?",
      options: [
        "Komut düzeltilip yeniden okutulur",
        "Komut olduğu gibi uygulanır",
        "Hata jurnale yazılıp geçilir",
        "Komut tümüyle iptal edilir",
      ],
      correctAnswer: 0,
      explanation:
        "Yanlış geri okuma, mesajın yanlış alındığının kanıtıdır; gönderen düzeltmeyi hemen yapar ve doğru anlaşıldığından emin olana kadar döngüyü yineler.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 172,
      question: "Çok uluslu mürettebatta iletişim riski en çok neden doğar?",
      options: [
        "Yalnızca vardiya saatlerinin farkından",
        "Dil düzeyi ve anlam farklarından",
        "Yalnızca yemek alışkanlıklarından",
        "Yalnızca kamara yerleşiminden",
      ],
      correctAnswer: 1,
      explanation:
        "Ortak dil olan İngilizcede yeterlilik düzeyi kişiden kişiye değişir; deyimler, konuşma hızı ve aksan anlamayı zorlaştırır. Bu yüzden standart denizcilik ifadeleri tercih edilir.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 173,
      question: "Kültürler arası iletişimde evet yanıtı neden yanıltıcı olabilir?",
      options: [
        "Yalnızca dil bilgisi hatası olduğu için",
        "Yalnızca gürültü nedeniyle duyulduğu için",
        "Anlamadan nezaketen verilebildiği için",
        "Yalnızca telsizde bozulduğu için",
      ],
      correctAnswer: 2,
      explanation:
        "Bazı kültürlerde üst konumdaki kişiye anlamadığını söylemek uygunsuz sayılır; bu yüzden onay sözcüğü yerine görevi kendi cümleleriyle anlatması istenir.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 174,
      question: "Çok kültürlü ekipte ortak dil kullanımını kolaylaştıran uygulama nedir?",
      options: [
        "Yerel deyim ve mecazların sıkça kullanılması",
        "Konuşma hızının belirgin biçimde artırılması",
        "Uzun ve iç içe geçmiş cümleler kurulması",
        "Standart denizcilik ifadelerine bağlı kalmak",
      ],
      correctAnswer: 3,
      explanation:
        "IMO Standart Denizcilik Haberleşme İfadeleri anlamı tek olan kalıplar sunar; deyim, mecaz ve karmaşık cümle yapısı ana dili farklı olan ekip üyesinde yanlış anlamaya yol açar.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 175,
      question: "Asertif davranış hangi ikisinin arasında yer alır?",
      options: [
        "Çekingenlik ile saldırganlık arasında",
        "Sessizlik ile kayıt tutmak arasında",
        "Hız ile doğruluk ölçütü arasında",
        "Yazılı ile sözlü iletişim arasında",
      ],
      correctAnswer: 0,
      explanation:
        "Asertif kişi kendi görüşünü açık ve saygılı biçimde söyler; ne susarak riski taşır ne de karşısındakini suçlayarak iletişimi kapatır.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 176,
      question: "Bir astın üstüne endişesini iletmek için kullandığı kalıp nedir?",
      options: [
        "Kararı tümüyle sorgusuz kabul etmek",
        "Endişeyi gözlem ve öneriyle sunmak",
        "Konuyu vardiya sonrasına ertelemek",
        "Sorunu diğer astlara duyurup beklemek",
      ],
      correctAnswer: 1,
      explanation:
        "Gördüğü olguyu, bunun neden endişe verdiğini ve somut bir öneriyi sırayla söylemek etkili bir kalıptır; kişiyi değil durumu konu ettiği için savunmaya yol açmaz.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 177,
      question: "DECIDE modelinin ilk adımı nedir?",
      options: [
        "Seçenekleri karşılaştırıp değerlendirmek",
        "Kararı doğrudan uygulamaya koymak",
        "Değişimi ve sorunu fark etmek",
        "Sonucu gözden geçirip raporlamak",
      ],
      correctAnswer: 2,
      explanation:
        "DECIDE; değişimi fark etme, seçenekleri kestirme, seçim yapma, gerekli adımı belirleme, uygulama ve sonucu değerlendirme adımlarından oluşur. Fark etme olmadan hiçbiri işlemez.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 178,
      question: "Risk değerlendirmesinde risk hangi iki çarpanla ölçülür?",
      options: [
        "Maliyet ile harcanan süre çarpımı",
        "Personel sayısı ile deneyim çarpımı",
        "Ekipman yaşı ile bakım sıklığı çarpımı",
        "Olasılık ile sonucun şiddeti çarpımı",
      ],
      correctAnswer: 3,
      explanation:
        "Risk, olayın gerçekleşme olasılığı ile gerçekleştiğinde doğuracağı sonucun şiddetinin birleşimidir; düşük olasılıklı ama ağır sonuçlu tehlikeler bu yüzden göz ardı edilemez.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 179,
      question: "Risk kontrol önlemleri hangi sıraya göre seçilir?",
      options: [
        "Ortadan kaldırma, azaltma, koruyucu ekipman",
        "Koruyucu ekipman, azaltma, ortadan kaldırma",
        "Azaltma, koruyucu ekipman, ortadan kaldırma",
        "Koruyucu ekipman, ortadan kaldırma, azaltma",
      ],
      correctAnswer: 0,
      explanation:
        "Kontrol hiyerarşisi önce tehlikeyi ortadan kaldırmayı, sonra ikame ve mühendislik önlemlerini, en son kişisel koruyucu donanımı sıralar; koruyucu donanım son savunma hattıdır.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 180,
      question: "Zaman baskısı karar verme üzerinde hangi etkiyi yapar?",
      options: [
        "Seçenek sayısını kendiliğinden artırır",
        "Dikkati daraltıp seçenekleri azaltır",
        "Hata olasılığını kendiliğinden düşürür",
        "Durumsal farkındalığı kendiliğinden artırır",
      ],
      correctAnswer: 1,
      explanation:
        "Baskı altında dikkat alanı daralır ve ilk akla gelen çözüme yönelme eğilimi artar; bu yüzden acil durum prosedürleri önceden öğrenilip tatbik edilir.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 181,
      question: "Zaman kısıtlı durumlarda hataya karşı en etkili önlem nedir?",
      options: [
        "Kararı tek kişiye bırakmak",
        "Kararı süresiz ertelemek",
        "Önceden prova edilmiş prosedür",
        "Karar sırasında not tutmak",
      ],
      correctAnswer: 2,
      explanation:
        "Tatbikatla otomatikleşen adımlar, baskı altında düşünmeye ayrılan süreyi kısaltır; kontrol listeleri ve ezberlenmiş ilk müdahale adımları bu işlevi görür.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 182,
      question: "Kaza incelemelerinde hata zinciri kavramı neyi anlatır?",
      options: [
        "Tek bir kişinin yaptığı büyük hatayı",
        "Yalnızca donanımdaki tasarım kusurunu",
        "Yalnızca hava koşullarının etkisini",
        "Arka arkaya gelen küçük hataların dizisi",
      ],
      correctAnswer: 3,
      explanation:
        "Kazalar genellikle tek bir hatadan değil, her biri tek başına zararsız görünen olayların birikmesinden doğar; zincirin herhangi bir halkasını kırmak kazayı önler.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 183,
      question: "İsviçre peyniri modeli hangi fikri anlatır?",
      options: [
        "Savunma katmanlarındaki delikler hizalanınca",
        "Her hatanın tek bir kişiden kaynaklandığını",
        "Kazaların tümüyle öngörülemez olduğunu",
        "Donanım arızalarının hep aynı anda geldiğini",
      ],
      correctAnswer: 0,
      explanation:
        "Her savunma katmanının zayıflıkları vardır; olay ancak bu zayıflıklar aynı hizaya geldiğinde uçtan uca geçer. Bu yüzden tek bir katmana güvenmek yetmez.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 184,
      question: "Hata zincirini kıran en yaygın uyarı işareti nedir?",
      options: [
        "Ekipman etiketinin okunaksız olması",
        "Belirsizlik ve içe sinmeyen his",
        "Vardiya defterinin dolmuş olması",
        "Deniz suyu sıcaklığının değişmesi",
      ],
      correctAnswer: 1,
      explanation:
        "Plana uymayan bir belirti, cevaplanmamış bir soru veya bir şeyin ters gittiği hissi tipik uyarı işaretleridir; bunları dile getirmek zinciri erken kırar.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 185,
      question: "Yorgunluğun karar verme üzerindeki etkisi nedir?",
      options: [
        "Tepki süresini kısaltıp dikkati artırır",
        "Yalnızca fiziksel gücü etkiler",
        "Dikkati ve risk algısını zayıflatır",
        "Yalnızca uyku düzenini etkiler",
      ],
      correctAnswer: 2,
      explanation:
        "Yorgunluk tepki süresini uzatır, dikkati dağıtır ve riski olduğundan küçük göstermeye yol açar; STCW bu yüzden asgari dinlenme sürelerini bağlayıcı kılar.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 186,
      question: "Bir görev öncesi rol dağılımı neden yapılır?",
      options: [
        "Yalnızca kayıt tutulabilmesi için",
        "Yalnızca fazla mesai hesabı için",
        "Yalnızca eğitim kaydı oluşturmak için",
        "Görevin sahipsiz kalmasını önlemek için",
      ],
      correctAnswer: 3,
      explanation:
        "Kim hangi işi yapacak, kim gözlem yapacak ve kim iletişimi yürütecek önceden belirlenir; belirsiz rol hem işin atlanmasına hem de iki kişinin aynı işi yapmasına yol açar.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 187,
      question: "Etkin bir ekipte üyelerin ortak sahip olması gereken şey nedir?",
      options: [
        "Görevin amacına dair ortak resim",
        "Aynı ülkeden geliyor olmaları",
        "Aynı vardiyada bulunmaları",
        "Aynı kıdemde bulunmaları",
      ],
      correctAnswer: 0,
      explanation:
        "Ortak zihinsel model, herkesin görevin amacını, sırasını ve risk noktalarını aynı biçimde anlaması demektir; bu olmadan koordinasyon tümüyle iletişime bağımlı kalır.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 188,
      question: "İş öncesi brifingde hangi başlıklar ele alınır?",
      options: [
        "Yalnızca işin tahmini süresi bilgisi",
        "Amaç, roller, riskler ve durdurma ölçütü",
        "Yalnızca kullanılacak takımların listesi",
        "Yalnızca ekibin izin planı bilgisi",
      ],
      correctAnswer: 1,
      explanation:
        "Brifing; işin amacını, adımları, kimin ne yapacağını, öngörülen riskleri ve hangi koşulda işin durdurulacağını kapsar. Sorulara açık bitirilmesi anlaşıldığını doğrular.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 189,
      question: "Debrifingin temel amacı nedir?",
      options: [
        "Sorumluyu bulup ceza vermektir",
        "İşin süresini kayda geçirmektir",
        "Neyin iyi gittiğini ve dersi çıkarmak",
        "Yalnızca fazla mesaiyi hesaplamaktır",
      ],
      correctAnswer: 2,
      explanation:
        "Debrifing; planlanan ile gerçekleşeni karşılaştırır, işe yarayanı pekiştirir ve bir sonraki sefer için somut bir iyileştirme belirler. Suçlu arayan debrifing katılımı bitirir.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 190,
      question: "Debrifingin etkili olması için hangi koşul gerekir?",
      options: [
        "Yalnızca üst rütbelilerin konuşması",
        "Yalnızca yazılı form doldurulması",
        "Yalnızca olumlu yönlerin anlatılması",
        "Herkesin çekinmeden konuşabilmesi",
      ],
      correctAnswer: 3,
      explanation:
        "Psikolojik güvenlik olmadan kimse hatasını anlatmaz; oysa öğrenilecek en değerli bilgi tam da orada saklıdır. Bu yüzden debrifing kişiyi değil süreci konu alır.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 191,
      question: "İş yükünün aşırı artması hangi belirtiyle fark edilir?",
      options: [
        "Görevlerin atlanması ve kısayol arama",
        "Kayıtların gereğinden ayrıntılı olması",
        "Ekipman sıcaklıklarının düşmesi",
        "Vardiya sürelerinin kısalması",
      ],
      correctAnswer: 0,
      explanation:
        "Aşırı yüklenen kişi önceliklendirmeyi bırakır, adımları atlar ve doğrulama yapmadan ilerler; ekip bu belirtileri gördüğünde yük yeniden dağıtılmalıdır.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 192,
      question: "İş yükü çok düşük olduğunda ortaya çıkan risk nedir?",
      options: [
        "Görevlerin gereğinden hızlı bitmesi",
        "Dikkatin dağılıp uyanıklığın düşmesi",
        "Kayıtların gereğinden sık tutulması",
        "Ekipmanın gereğinden az yüklenmesi",
      ],
      correctAnswer: 1,
      explanation:
        "Uzun ve olaysız vardiyalarda uyanıklık düşer, alarm ve gösterge değişimleri geç fark edilir; düzenli kontrol turları ve görev rotasyonu bu düşüşü engeller.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 193,
      question: "Yük paylaşımında öncelik belirlemenin ilk ölçütü nedir?",
      options: [
        "İşin ne kadar kolay olduğu ölçütü",
        "İşi kimin daha çok istediği ölçütü",
        "Emniyet ve seyre etkisinin büyüklüğü",
        "İşin ne kadar kısa süreceği ölçütü",
      ],
      correctAnswer: 2,
      explanation:
        "Önce can emniyetini, sonra geminin emniyetini ve çevreyi etkileyen işler yapılır; kolay veya kısa olması bir işi öne almak için geçerli bir gerekçe değildir.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 194,
      question: "Çapraz kontrol (cross-check) uygulaması neyi sağlar?",
      options: [
        "Görevin daha hızlı bitirilmesini",
        "Kayıt sayısının azaltılmasını",
        "Personel sayısının düşürülmesini",
        "Bir kişinin hatasının yakalanmasını",
      ],
      correctAnswer: 3,
      explanation:
        "Kritik bir işlemi ikinci bir kişinin bağımsız doğrulaması, tek kişilik dikkat kaybının sonuca dönüşmesini engeller; valf sıralaması ve devreye alma bunun tipik örnekleridir.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 195,
      question: "Karşılıklı izleme (mutual monitoring) nasıl uygulanır?",
      options: [
        "Ekip üyeleri birbirinin işini gözler",
        "Yalnızca baş mühendis herkesi gözler",
        "Yalnızca kamera kayıtları incelenir",
        "Yalnızca vardiya sonunda kontrol edilir",
      ],
      correctAnswer: 0,
      explanation:
        "Herkes kendi işini yaparken ekip arkadaşının kritik adımlarını da izler ve sapma görürse söyler; bu, hiyerarşiden bağımsız çalışan bir emniyet ağı kurar.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 196,
      question: "Karşılıklı izlemenin işlemesi neye bağlıdır?",
      options: [
        "Yalnızca kıdemli kişinin onayına",
        "Uyarının olumlu karşılanmasına",
        "Yalnızca yazılı prosedür varlığına",
        "Yalnızca ekibin küçük olmasına",
      ],
      correctAnswer: 1,
      explanation:
        "Uyaran kişi savunmayla karşılaşırsa bir daha konuşmaz; teşekkürle karşılanan uyarı ise izlemeyi ekibin doğal alışkanlığı hâline getirir.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 197,
      question: "Yapıcı geri bildirim neye odaklanır?",
      options: [
        "Kişinin karakter özelliklerine",
        "Kişinin geçmiş sicil kaydına",
        "Gözlenen davranış ve etkisine",
        "Kişinin uyruğu ve kıdemine",
      ],
      correctAnswer: 2,
      explanation:
        "Geri bildirim somut bir davranışı, bunun yarattığı etkiyi ve beklenen değişimi anlatır; kişiliğe yönelen eleştiri savunmaya yol açar ve öğrenmeyi durdurur.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 198,
      question: "Geri bildirim ne zaman verildiğinde en etkilidir?",
      options: [
        "Yalnızca yıllık değerlendirmede",
        "Yalnızca kişi işten ayrılırken",
        "Yalnızca resmî toplantılarda",
        "Olaya yakın ve uygun ortamda",
      ],
      correctAnswer: 3,
      explanation:
        "Olay tazeyken verilen geri bildirim akılda kalır; övgü ekibin önünde, düzeltici geri bildirim ise baş başa verildiğinde kabul edilme olasılığı yükselir.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 199,
      question: "Geri bildirim kültürünün kurulduğu nasıl anlaşılır?",
      options: [
        "Astların da üstlere görüş bildirmesi",
        "Hataların hiç konuşulmaz olması",
        "Yalnızca övgünün dile getirilmesi",
        "Raporların tümüyle yazıya dökülmesi",
      ],
      correctAnswer: 0,
      explanation:
        "Tek yönlü akan geri bildirim denetimdir; kültürün kurulduğu, astın da üstün bir davranışını çekinmeden dile getirebildiği ve bunun olumlu karşılandığı yerde anlaşılır.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 200,
      question:
        "Makine dairesi yangını incelemelerinde en sık bulunan kök neden nedir?",
      options: [
        "Yalnızca yangın alarmının arızalı olması",
        "Yalıtımsız sıcak yüzey ve yakıt kaçağı",
        "Yalnızca söndürücü sayısının azlığı",
        "Yalnızca mürettebat sayısının azlığı",
      ],
      correctAnswer: 1,
      explanation:
        "Raporlar tekrar tekrar aynı ikiliyi gösterir: basınçlı yakıt veya yağ hattındaki kaçak ve yalıtımı bozulmuş egzoz yüzeyi. Kaçağın kaynağı çoğunlukla gevşemiş bağlantıdır.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 201,
      question: "Yangın kaza örneklerinden çıkan ortak ERM dersi nedir?",
      options: [
        "Yalnızca daha çok söndürücü koymak",
        "Yalnızca daha sık boya yapmak",
        "Küçük kaçakların ciddiye alınması",
        "Yalnızca yangın dolabı sayısını artırmak",
      ],
      correctAnswer: 2,
      explanation:
        "Kazaların çoğunda kaçak günler önce fark edilmiş ama küçük sayılıp ertelenmiştir; erken raporlama ve geçici çözümü kalıcı sanmama en çok tekrar eden derstir.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 202,
      question: "Blackout incelemelerinde en sık rastlanan tetikleyici nedir?",
      options: [
        "Yalnızca deniz suyu sıcaklığının artışı",
        "Yalnızca jeneratörün yaşının ilerlemesi",
        "Yalnızca köprüüstünün geç haber vermesi",
        "Yetersiz güçle ani yük artışı",
      ],
      correctAnswer: 3,
      explanation:
        "Manevrada thruster ve vinç yükleri tek jeneratörün kapasitesini aşınca koruma açar; kök neden çoğu zaman güç yönetiminin manevra planına dâhil edilmemesidir.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 203,
      question: "Blackout riskini azaltmada ERM açısından ilk adım nedir?",
      options: [
        "Manevra öncesi güç planını paylaşmak",
        "Koruma ayarlarını daha yükseğe çekmek",
        "Alarmları manevra boyunca susturmak",
        "Vardiyadaki personel sayısını azaltmak",
      ],
      correctAnswer: 0,
      explanation:
        "Köprüüstü ile makine dairesi manevranın süresini, beklenen yükleri ve kaç jeneratörün paralelde olacağını önceden konuşur; teknik önlem ancak bu paylaşımdan sonra doğru seçilir.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 204,
      question: "Kapalı alan kazalarında ölümlerin büyük bölümü nasıl gerçekleşir?",
      options: [
        "Yalnızca yüksekten düşme sonucu",
        "Kurtarmaya giren kişilerin de ölmesi",
        "Yalnızca elektrik çarpması sonucu",
        "Yalnızca sıcak çarpması sonucu",
      ],
      correctAnswer: 1,
      explanation:
        "İlk kurbanı görüp içeri koşan arkadaşları da oksijensiz ortamda kalır; bu yüzden kurtarma yalnızca solunum cihazlı ve eğitimli ekiple, dışarıdan gözcü eşliğinde yapılır.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 205,
      question: "Kapalı alana girmeden önce hangi ölçüm sırası uygulanır?",
      options: [
        "Önce zehirli gaz, sonra oksijen ölçülür",
        "Yalnızca sıcaklık ve nem ölçülür",
        "Önce oksijen, sonra parlayıcı ve zehirli gaz",
        "Yalnızca gözle bakılıp karar verilir",
      ],
      correctAnswer: 2,
      explanation:
        "Ölçüm oksijen yüzdesiyle başlar, ardından parlayıcı gaz ve zehirli gaz derişimleri okunur; ölçüm alanın farklı derinliklerinden ve giriş izni süresince yinelenerek yapılır.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 206,
      question: "İletişim kopukluğuna bağlı olaylarda tipik senaryo nedir?",
      options: [
        "Yalnızca telsiz cihazının bozulması",
        "Yalnızca gürültünün çok yüksek olması",
        "Yalnızca ortak dilin bulunmaması",
        "Bir tarafın karşı tarafı bildiğini sanması",
      ],
      correctAnswer: 3,
      explanation:
        "Vardiya devrinde söylenmediği hâlde bilindiği varsayılan bir bilgi, valfin kapalı sanılması veya izole edilmiş bir sistemin çalışır sanılması en sık tekrarlanan kalıptır.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 207,
      question: "Vardiya devir tesliminde iletişim kopukluğunu önleyen uygulama nedir?",
      options: [
        "Açık işlerin listeyle devredilmesi",
        "Devrin sözlü onayla hızlandırılması",
        "Devrin telsizle uzaktan yapılması",
        "Devrin vardiya sonuna bırakılması",
      ],
      correctAnswer: 0,
      explanation:
        "Açık iş emirleri, devre dışı ekipmanlar, geçici düzenlemeler ve dikkat edilecek parametreler yazılı listeyle devredilir; devralan kendi turunu yapmadan devri tamamlamaz.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 208,
      question: "Kaza raporlarından çıkan dersler gemide nasıl kalıcı hâle gelir?",
      options: [
        "Yalnızca ilan panosuna asılarak",
        "Prosedür ve kontrol listesine işlenerek",
        "Yalnızca bir kez toplantıda anlatılarak",
        "Yalnızca şirket arşivine kaldırılarak",
      ],
      correctAnswer: 1,
      explanation:
        "Ders ancak çalışma biçimini değiştirdiğinde öğrenilmiş sayılır; bunun yolu ilgili prosedürü, kontrol listesini veya risk değerlendirmesini güncellemekten geçer.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 209,
      question: "Ramak kala (near miss) bildirimlerinin değeri nedir?",
      options: [
        "Yalnızca istatistik oluşturmaları",
        "Yalnızca sigorta primini düşürmeleri",
        "Kaza olmadan zayıflığı göstermeleri",
        "Yalnızca eğitim süresini kısaltmaları",
      ],
      correctAnswer: 2,
      explanation:
        "Ramak kala olaylar, savunma katmanlarının nerede inceldiğini bedel ödemeden gösterir; bu yüzden cezasız ve kolay bir bildirim düzeni ERM'nin temel taşıdır.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
    {
      id: 210,
      question: "Alınan derslerin etkili olduğu nasıl doğrulanır?",
      options: [
        "Yalnızca bildirim sayısına bakılarak",
        "Yalnızca toplantı sayısına bakılarak",
        "Yalnızca eğitim saatine bakılarak",
        "Aynı olayın tekrarlanıp tekrarlanmadığı",
      ],
      correctAnswer: 3,
      explanation:
        "Güncellenen prosedür sonrasında aynı olayın tekrar etmemesi ve denetimlerde ilgili bulgunun kapanması, dersin gerçekten operasyona yansıdığının ölçülebilir kanıtıdır.",
      category: "Makine Dairesi Kaynak Yönetimi",
    },
  ],
};
