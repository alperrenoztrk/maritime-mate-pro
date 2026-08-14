import type { QuizQuestion } from "@/types/quiz";

/**
 * Konu doldurma bankası 10 — makine dairesi çevre mevzuatı konu bankasında
 * konu başına en az 8 soru hedefini tutturmak için yazılan ek sorular.
 *
 * `exerciseQuestionDistribution.ts` soruları konu başlıklarıyla sözcük örtüşmesine
 * göre eşlediğinden her soru hedeflediği konunun kendi terminolojisini kullanır;
 * aksi hâlde benzerlik puanı soruyu komşu konuya taşır. MARPOL eklerinin genel
 * tanıtımı ile aynı ekin ayrıntı konuları bilinçli olarak ayrı sözcüklerle yazıldı.
 *
 * Numaralandırma taban + devam + vaka bankalarının ardından sürer (155'ten
 * başlar); `machineQuizDataIndex.ts` bankaları slug bazında bu sırayla birleştirir.
 */
export const machineQuizQuestionsTopicFill10: Record<string, QuizQuestion[]> = {
  "environment-machine": [
    {
      id: 155,
      question: "MARPOL sözleşmesi hangi olayın ardından hazırlanmıştır?",
      options: [
        "Büyük tanker kazalarının ardından",
        "Yalnızca bir liman grevi ardından",
        "Yalnızca bir savaş sonrası dönemde",
        "Yalnızca bir ticaret anlaşması sonrası",
      ],
      correctAnswer: 0,
      explanation:
        "Büyük petrol kirliliği kazaları uluslararası düzenleme ihtiyacını doğurdu; MARPOL 1973'te kabul edildi ve 1978 protokolüyle birleştirilerek yürürlüğe girdi.",
      category: "Çevre",
    },
    {
      id: 156,
      question: "MARPOL kaç ekten (annex) oluşur?",
      options: [
        "Üç ekten oluşmaktadır",
        "Altı ekten oluşmaktadır",
        "On ekten oluşmaktadır",
        "Bir ekten oluşmaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "MARPOL altı ek içerir: petrol, zararlı sıvı maddeler, ambalajlı zararlı maddeler, pis su, çöp ve hava kirliliği. Ek VI 1997 protokolüyle eklenmiştir.",
      category: "Çevre",
    },
    {
      id: 157,
      question: "MARPOL eklerinden hangileri tüm taraf devletler için zorunludur?",
      options: [
        "Yalnızca Ek IV ve Ek V zorunludur",
        "Yalnızca Ek VI zorunlu tutulmuştur",
        "Ek I ve Ek II zorunlu tutulmuştur",
        "Hiçbir ek zorunlu tutulmamıştır",
      ],
      correctAnswer: 2,
      explanation:
        "Ek I ve Ek II sözleşmeye taraf olmanın koşuludur; diğer ekler isteğe bağlı kabul edilir, ancak bugün büyük çoğunluk tüm ekleri onaylamış durumdadır.",
      category: "Çevre",
    },
    {
      id: 158,
      question: "MARPOL Ek I hangi konuyu düzenler?",
      options: [
        "Ambalajlı zararlı madde taşımacılığını",
        "Gemi kaynaklı çöp yönetimi kurallarını",
        "Gemiden salınan egzoz emisyonlarını",
        "Petrol ve petrol karışımı deşarjını",
      ],
      correctAnswer: 3,
      explanation:
        "Ek I; makine dairesi sintinesi, kargo tankı yıkama suyu ve slop dâhil petrol içeren her deşarjın koşullarını, gerekli ekipmanı ve kayıt düzenini belirler.",
      category: "Çevre",
    },
    {
      id: 159,
      question: "MARPOL Ek I kapsamında hangi belge gemide bulundurulur?",
      options: [
        "IOPP sertifikası bulundurulmalıdır",
        "Yalnızca tonaj belgesi bulundurulur",
        "Yalnızca yükleme sınırı belgesi",
        "Yalnızca telsiz emniyet belgesi",
      ],
      correctAnswer: 0,
      explanation:
        "Uluslararası Petrol Kirliliğini Önleme sertifikası, gemideki ayırıcı, izleme ve tank düzeninin Ek I gereklerine uygun olduğunu belgeler ve sörveylerle yenilenir.",
      category: "Çevre",
    },
    {
      id: 160,
      question: "Ek I'e göre 400 GT üstü gemilerde hangi ekipman aranır?",
      options: [
        "Yalnızca bir adet sintine pompası",
        "15 ppm yağ-su ayırıcı düzeneği",
        "Yalnızca bir adet slop tankı",
        "Yalnızca bir adet çöp öğütücü",
      ],
      correctAnswer: 1,
      explanation:
        "400 GT ve üzeri her gemide 15 ppm sınırını sağlayan yağ-su ayırıcı, 15 ppm alarmı ve sınır aşıldığında deşarjı durduran otomatik kapatma düzeneği bulunmalıdır.",
      category: "Çevre",
    },
    {
      id: 161,
      question: "MARPOL Ek II hangi yükleri kapsar?",
      options: [
        "Yalnızca ambalajlı kuru yükleri kapsar",
        "Yalnızca konteyner içindeki yükleri",
        "Dökme taşınan zararlı sıvı maddeleri",
        "Yalnızca canlı hayvan taşımalarını",
      ],
      correctAnswer: 2,
      explanation:
        "Ek II, kimyasal tankerlerle dökme taşınan zararlı sıvı maddelerin deşarj koşullarını, tank yıkama ve ön yıkama kurallarını düzenler.",
      category: "Çevre",
    },
    {
      id: 162,
      question: "Ek II kapsamındaki maddeler kaç kategoriye ayrılır?",
      options: [
        "İki kategoriye ayrılmaktadır",
        "Altı kategoriye ayrılmaktadır",
        "On kategoriye ayrılmaktadır",
        "Dört kategoriye ayrılmaktadır",
      ],
      correctAnswer: 3,
      explanation:
        "Maddeler deniz çevresine verdikleri zarara göre X, Y, Z ve OS olmak üzere dört kategoriye ayrılır; X en zararlı olan ve deşarjı yasak olan gruptur.",
      category: "Çevre",
    },
    {
      id: 163,
      question: "Ek II kapsamında gemide hangi defter tutulur?",
      options: [
        "Kargo kayıt defteri tutulmaktadır",
        "Yalnızca yağ kayıt defteri tutulur",
        "Yalnızca çöp kayıt defteri tutulur",
        "Yalnızca balast kayıt defteri tutulur",
      ],
      correctAnswer: 0,
      explanation:
        "Kimyasal tankerlerde Kargo Kayıt Defteri tutulur; yükleme, boşaltma, tank yıkama, ön yıkama ve deşarj işlemleri tarih ve konumla kaydedilir.",
      category: "Çevre",
    },
    {
      id: 164,
      question: "MARPOL Ek III hangi taşımayı düzenler?",
      options: [
        "Yalnızca dökme sıvı kimyasalları",
        "Ambalaj içinde taşınan zararlı maddeleri",
        "Yalnızca dökme kuru yükleri düzenler",
        "Yalnızca petrol ürünü taşımalarını",
      ],
      correctAnswer: 1,
      explanation:
        "Ek III; koli, konteyner, tank konteyner ve portatif tanklarda taşınan deniz kirletici maddelerin ambalajlanma, işaretleme, belgeleme ve istif kurallarını verir.",
      category: "Çevre",
    },
    {
      id: 165,
      question: "Ek III kapsamındaki ambalajlı yüklerde hangi işaret aranır?",
      options: [
        "Yalnızca üretici firma logosu ve adresi",
        "Yalnızca varış limanı etiketi bilgisi",
        "Deniz kirletici (marine pollutant) işareti",
        "Yalnızca yükün brüt ağırlık etiketi",
      ],
      correctAnswer: 2,
      explanation:
        "Deniz kirletici olarak sınıflandırılan maddeler IMDG Kod uyarınca özel işaret taşır; ayrıca UN numarası ve uygun sevkiyat adı ambalaj üzerinde bulunur.",
      category: "Çevre",
    },
    {
      id: 166,
      question: "Ek III kapsamında gemiye hangi belge verilir?",
      options: [
        "Yalnızca tonaj ölçüm belgesi verilir",
        "Yalnızca klas sertifikası verilmektedir",
        "Yalnızca yükleme sınırı belgesi verilir",
        "Tehlikeli yük manifestosu verilmektedir",
      ],
      correctAnswer: 3,
      explanation:
        "Tehlikeli yük manifestosu veya istif planı, taşınan her maddenin sınıfını, UN numarasını ve gemideki yerini gösterir; acil müdahale bu belgeye göre planlanır.",
      category: "Çevre",
    },
    {
      id: 167,
      question: "MARPOL Ek IV'e göre işlenmemiş pis su nereye deşarj edilebilir?",
      options: [
        "En yakın karadan 12 milden uzakta",
        "Yalnızca liman içinde deşarj edilir",
        "Yalnızca demirdeyken deşarj edilir",
        "Her koşulda serbestçe deşarj edilir",
      ],
      correctAnswer: 0,
      explanation:
        "Öğütülmemiş ve dezenfekte edilmemiş pis su, en yakın karadan en az 12 mil açıkta ve gemi yol alırken orta hızda boşaltılabilir.",
      category: "Çevre",
    },
    {
      id: 168,
      question: "Onaylı arıtma tesisinden geçen pis su için sınır nedir?",
      options: [
        "Yalnızca 12 mil dışında deşarj edilir",
        "Kurallara uygunsa kıyıya yakın deşarj",
        "Yalnızca 50 mil dışında deşarj edilir",
        "Hiçbir koşulda deşarj edilemez",
      ],
      correctAnswer: 1,
      explanation:
        "Tip onaylı arıtma tesisi kullanılıyor ve çıkış suyu görünür yüzen katı ile renk değişimi yaratmıyorsa deşarj mesafe sınırı olmaksızın yapılabilir.",
      category: "Çevre",
    },
    {
      id: 169,
      question: "MARPOL Ek IV kapsamında hangi sertifika aranır?",
      options: [
        "Yalnızca IOPP sertifikası aranır",
        "Yalnızca IAPP sertifikası aranır",
        "ISPP sertifikası aranmaktadır",
        "Yalnızca tonaj belgesi aranır",
      ],
      correctAnswer: 2,
      explanation:
        "Uluslararası Pis Su Kirliliğini Önleme sertifikası, 400 GT üstü veya on beş kişiden fazla taşıyan gemilerde arıtma tesisi ve tank düzeninin uygunluğunu belgeler.",
      category: "Çevre",
    },
    {
      id: 170,
      question: "MARPOL Ek V'e göre plastik atık için kural nedir?",
      options: [
        "Kıyıdan 12 mil ötede atılabilir",
        "Öğütülürse denize atılabilmektedir",
        "Yalnızca özel alanlarda yasaktır",
        "Her koşulda denize atılması yasaktır",
      ],
      correctAnswer: 3,
      explanation:
        "Plastik, karışık plastik içeren atık ve sentetik halat hiçbir bölgede denize atılamaz; tümü gemide biriktirilip liman atık alım tesisine teslim edilir.",
      category: "Çevre",
    },
    {
      id: 171,
      question: "Öğütülmüş gıda atığı özel alan dışında nereden itibaren atılabilir?",
      options: [
        "En yakın karadan 3 mil ötesinden",
        "En yakın karadan 50 mil ötesinden",
        "Yalnızca liman sınırı içinden",
        "Yalnızca 200 mil ötesinden",
      ],
      correctAnswer: 0,
      explanation:
        "25 mm elekten geçecek biçimde öğütülmüş gıda atığı özel alan dışında karadan en az 3 mil, öğütülmemişi ise en az 12 mil açıkta atılabilir.",
      category: "Çevre",
    },
    {
      id: 172,
      question: "MARPOL Ek V kapsamında hangi levha gemide asılı bulunur?",
      options: [
        "Yalnızca yangın planı levhası asılır",
        "Çöp deşarj kurallarını gösteren levha",
        "Yalnızca can salı planı levhası asılır",
        "Yalnızca balast planı levhası asılır",
      ],
      correctAnswer: 1,
      explanation:
        "Mürettebat ve yolcuların gördüğü yerlerde çöp deşarj gerekliliklerini anlatan levhalar bulunur; 100 GT üstü gemilerde ayrıca plan ve kayıt defteri aranır.",
      category: "Çevre",
    },
    {
      id: 173,
      question: "MARPOL Ek VI hangi kirleticileri düzenler?",
      options: [
        "Yalnızca sintine ve slop deşarjını",
        "Yalnızca balast suyu tahliyesini",
        "SOx, NOx ve ozon incelten maddeleri",
        "Yalnızca gemi çöpü yönetimini",
      ],
      correctAnswer: 2,
      explanation:
        "Ek VI; kükürt oksitleri, azot oksitleri, ozon incelten maddeler, uçucu organik bileşikler, gemide yakma ve enerji verimliliği kurallarını kapsar.",
      category: "Çevre",
    },
    {
      id: 174,
      question: "MARPOL Ek VI kapsamında hangi sertifika düzenlenir?",
      options: [
        "Yalnızca ISPP sertifikası düzenlenir",
        "Yalnızca IOPP sertifikası düzenlenir",
        "Yalnızca tonaj belgesi düzenlenmekte",
        "IAPP sertifikası düzenlenmektedir",
      ],
      correctAnswer: 3,
      explanation:
        "Uluslararası Hava Kirliliğini Önleme sertifikası, makinelerin NOx uygunluğunu, yakıt sistemini ve ozon incelten madde envanterini belgeler.",
      category: "Çevre",
    },
    {
      id: 175,
      question: "MARPOL Ek VI gemide yakma (incineration) için ne der?",
      options: [
        "Bazı atıkların yakılmasını yasaklar",
        "Her atığın yakılmasına izin verir",
        "Yalnızca limanda yakmaya izin verir",
        "Yakma konusunda hiç kural içermez",
      ],
      correctAnswer: 0,
      explanation:
        "Kargo artığı, PCB içeren atık, ağır metal içeren atık ve halojenli bileşikler gemide yakılamaz; ayrıca liman ve iç sularda yakma yasaktır.",
      category: "Çevre",
    },
    {
      id: 176,
      question: "Yağ-su ayırıcı çıkışında 15 ppm alarmı ne yapar?",
      options: [
        "Yalnızca sesli uyarı verip geçer",
        "Deşarjı durdurup sintineye geri döndürür",
        "Yalnızca kaydı deftere yazdırmaktadır",
        "Yalnızca pompanın devrini artırmakta",
      ],
      correctAnswer: 1,
      explanation:
        "Sınır aşılınca izleme cihazı alarm verir ve üç yollu valfi otomatik çevirerek çıkışı sintine veya slop tankına döndürür; deşarj ancak değer düşünce sürer.",
      category: "Çevre",
    },
    {
      id: 177,
      question: "Yağ-su ayırıcının ilk kademesi hangi ilkeyle çalışır?",
      options: [
        "Yalnızca kimyasal çöktürme ile çalışır",
        "Yalnızca elektroliz yoluyla çalışmakta",
        "Yoğunluk farkıyla yerçekimsel ayırma",
        "Yalnızca ultraviyole ışınla çalışmakta",
      ],
      correctAnswer: 2,
      explanation:
        "İlk kademe yağın sudan hafif olmasından yararlanıp yerçekimiyle ayırır; ikinci kademe koalesans filtresi veya membran ile kalan ince emülsiyonu tutar.",
      category: "Çevre",
    },
    {
      id: 178,
      question: "Yağ deşarj izleme sistemi (ODMCS) hangi gemilerde aranır?",
      options: [
        "Yalnızca yolcu gemilerinde aranır",
        "Yalnızca balıkçı teknelerinde aranır",
        "Yalnızca römorkörlerde aranmaktadır",
        "150 GT üstü petrol tankerlerinde aranır",
      ],
      correctAnswer: 3,
      explanation:
        "150 GT ve üzeri petrol tankerlerinde, kargo bölgesinden yapılan deşarjı sürekli ölçen ve kayıt altına alan bir izleme ve kontrol sistemi zorunludur.",
      category: "Çevre",
    },
    {
      id: 179,
      question: "ODMCS hangi büyüklükleri kaydeder?",
      options: [
        "Yağ oranı, debi, hız ve konum bilgisi",
        "Yalnızca mürettebat sayısı bilgisi",
        "Yalnızca makine devri bilgisi",
        "Yalnızca hava sıcaklığı bilgisi",
      ],
      correctAnswer: 0,
      explanation:
        "Sistem anlık yağ derişimini, deşarj debisini, gemi hızını, tarihi ve konumu kaydeder; kayıtlar en az üç yıl gemide saklanır ve denetimde istenir.",
      category: "Çevre",
    },
    {
      id: 180,
      question: "ODMCS arızalandığında ne yapılır?",
      options: [
        "Deşarj sürdürülüp sonra kaydedilir",
        "Deşarj durdurulup kayda geçirilir",
        "Yalnızca alarm devre dışı bırakılır",
        "Yalnızca debi yarıya düşürülmektedir",
      ],
      correctAnswer: 1,
      explanation:
        "İzleme sistemi çalışmıyorken kargo bölgesinden deşarj yapılamaz; arıza Yağ Kayıt Defterine işlenir ve en kısa sürede onarılıp idareye bildirilir.",
      category: "Çevre",
    },
    {
      id: 181,
      question: "Yağ Kayıt Defteri Bölüm I hangi işlemleri kapsar?",
      options: [
        "Yalnızca kargo yükleme işlemlerini",
        "Yalnızca balast alma işlemlerini",
        "Makine dairesi işlemlerini kapsar",
        "Yalnızca çöp teslim işlemlerini",
      ],
      correctAnswer: 2,
      explanation:
        "Bölüm I; sintine transferi, çamur bertarafı, yakıt alımı ve yağ-su ayırıcı kullanımı gibi makine dairesi işlemlerini kaydeder. Bölüm II tanker kargo işlemleri içindir.",
      category: "Çevre",
    },
    {
      id: 182,
      question: "Yağ Kayıt Defterindeki kayıt kim tarafından imzalanır?",
      options: [
        "Yalnızca liman devleti denetçisi tarafından",
        "Yalnızca acente temsilcisi tarafından",
        "Yalnızca klas sörveyörü tarafından",
        "İşlemi yapan zabit ve kaptan tarafından",
      ],
      correctAnswer: 3,
      explanation:
        "Her işlem tamamlandığında sorumlu zabit imzalar; tamamlanan her sayfa ayrıca kaptan tarafından imzalanır. Defter son kayıttan sonra üç yıl gemide saklanır.",
      category: "Çevre",
    },
    {
      id: 183,
      question: "Yağ Kayıt Defterinde hatalı bir kayıt nasıl düzeltilir?",
      options: [
        "Üzeri çizilip paraflanarak düzeltilir",
        "Yalnızca silinip yeniden yazılmaktadır",
        "Yalnızca sayfa yırtılıp atılmaktadır",
        "Yalnızca daksil ile kapatılmaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "Yanlış kayıt okunabilir kalacak biçimde tek çizgiyle çizilir, doğrusu yazılır ve paraflanır; silme, sayfa çıkarma veya kapatma sahtecilik sayılır.",
      category: "Çevre",
    },
    {
      id: 184,
      question: "Slop tankın işlevi nedir?",
      options: [
        "Yalnızca temiz balast depolamaktır",
        "Yağlı yıkama suyunu biriktirmektir",
        "Yalnızca içme suyu depolamaktır",
        "Yalnızca yakıt depolamak içindir",
      ],
      correctAnswer: 1,
      explanation:
        "Tank yıkama suyu ve yağlı kalıntılar slop tankında toplanır; burada çökeltilerek ayrışan su alt kısımdan izleme sistemi denetiminde deşarj edilebilir.",
      category: "Çevre",
    },
    {
      id: 185,
      question: "Slop tankta load on top yöntemi neyi anlatır?",
      options: [
        "Yalnızca tankın tümüyle boşaltılmasını",
        "Yalnızca tankın deniz suyuyla doldurulması",
        "Kalan yağ üstüne yeni kargo yüklenmesi",
        "Yalnızca tankın havalandırılmasını",
      ],
      correctAnswer: 2,
      explanation:
        "Çökeltme sonrası ayrılan su denize verilir, kalan yağ tankta bırakılır ve üzerine yeni kargo yüklenir; böylece yağ denize atılmadan yükle birlikte teslim edilir.",
      category: "Çevre",
    },
    {
      id: 186,
      question: "Slop tankında ayrım yüzeyi (interface) nasıl belirlenir?",
      options: [
        "Yalnızca tank sıcaklığı ölçülerek",
        "Yalnızca tank basıncı ölçülerek",
        "Yalnızca tank rengine bakılarak",
        "Ara yüzey dedektörü ile ölçülerek",
      ],
      correctAnswer: 3,
      explanation:
        "Taşınabilir ara yüzey dedektörü yağ ile su arasındaki sınırın derinliğini verir; deşarj yalnızca bu sınırın altındaki sudan ve izleme denetiminde yapılır.",
      category: "Çevre",
    },
    {
      id: 187,
      question: "MARPOL özel deniz alanı (special area) ne demektir?",
      options: [
        "Daha sıkı deşarj kuralı geçerli bölge",
        "Yalnızca seyre kapalı olan bölge",
        "Yalnızca demirlemeye açık bölge",
        "Yalnızca balıkçılığa ayrılmış bölge",
      ],
      correctAnswer: 0,
      explanation:
        "Oşinografik ve ekolojik özellikleri nedeniyle kirlilikten daha çok etkilenen denizlerde deşarj kuralları sıkılaştırılır; Akdeniz, Karadeniz ve Baltık bunlara örnektir.",
      category: "Çevre",
    },
    {
      id: 188,
      question: "Özel deniz alanlarında makine dairesi sintinesi için kural nedir?",
      options: [
        "Hiçbir sınır uygulanmamaktadır",
        "15 ppm sınırı ve ek koşullar geçerli",
        "Yalnızca 100 ppm sınırı geçerlidir",
        "Sınırsız deşarj serbest bırakılmıştır",
      ],
      correctAnswer: 1,
      explanation:
        "Özel alanlarda da 15 ppm sınırı geçerlidir; ayrıca gemi yol alıyor olmalı ve deşarj işlem sırasında sürekli izlenmelidir. Bazı alanlarda ek kısıtlar bulunur.",
      category: "Çevre",
    },
    {
      id: 189,
      question: "Özel alan ilan edilen bölgeye giriş nasıl anlaşılır?",
      options: [
        "Yalnızca liman devletinin telsiz anonsuyla",
        "Yalnızca gemi radarının uyarısıyla",
        "Seyir yayınları ve haritalardan izlenerek",
        "Yalnızca acentenin bilgilendirmesiyle",
      ],
      correctAnswer: 2,
      explanation:
        "Özel alan sınırları seyir haritalarında ve denizcilere ilanlarda gösterilir; köprüüstü sefer planında giriş-çıkış saatlerini belirler ve makine dairesine bildirir.",
      category: "Çevre",
    },
    {
      id: 190,
      question: "Küresel kükürt sınırı hangi tarihte %0,50'ye indirilmiştir?",
      options: [
        "1 Ocak 2010 tarihinde inmiştir",
        "1 Ocak 2015 tarihinde inmiştir",
        "1 Ocak 2025 tarihinde inmiştir",
        "1 Ocak 2020 tarihinde inmiştir",
      ],
      correctAnswer: 3,
      explanation:
        "Küresel sınır 1 Ocak 2020'de kütlece %3,50'den %0,50'ye indirildi; emisyon kontrol alanlarındaki %0,10 sınırı ise 2015'ten beri uygulanıyor.",
      category: "Çevre",
    },
    {
      id: 191,
      question: "ECA bölgelerinde geçerli kükürt limiti nedir?",
      options: [
        "Kütlece %0,10 sınırı geçerlidir",
        "Kütlece %0,50 sınırı geçerlidir",
        "Kütlece %1,50 sınırı geçerlidir",
        "Kütlece %3,50 sınırı geçerlidir",
      ],
      correctAnswer: 0,
      explanation:
        "Kuzey Amerika, Baltık, Kuzey Denizi ve ABD Karayipleri gibi emisyon kontrol alanlarında yakıt kükürdü kütlece %0,10'u aşamaz.",
      category: "Çevre",
    },
    {
      id: 192,
      question: "Kükürt limitine uygun yakıt bulunamadığında gemi ne yapar?",
      options: [
        "Yalnızca yüksek kükürtlü yakıt yakar",
        "FONAR raporu düzenleyip bildirir",
        "Yalnızca seferi tümüyle iptal eder",
        "Yalnızca limanda beklemeyi sürdürür",
      ],
      correctAnswer: 1,
      explanation:
        "Yakıt Bulunamadı Raporu, tedarik girişimlerini belgeleyerek bayrak devletine ve varış limanına bildirilir; rapor tek başına muafiyet sağlamaz, kanıt niteliğindedir.",
      category: "Çevre",
    },
    {
      id: 193,
      question: "Egzoz gazı yıkama sistemi (scrubber) nasıl çalışır?",
      options: [
        "Yalnızca gazı soğutup bacadan atar",
        "Yalnızca gazı filtreden geçirmektedir",
        "Gazı su ile yıkayıp kükürdü tutar",
        "Yalnızca gazı yeniden yakmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "Egzoz gazı yıkama kulesinde su püskürtülür; kükürt dioksit suda çözünüp sülfat olarak tutulur ve gaz düşük SOx içerikle bacadan çıkar.",
      category: "Çevre",
    },
    {
      id: 194,
      question: "Açık devre (open loop) scrubber hangi suyu kullanır?",
      options: [
        "Yalnızca damıtılmış tatlı suyu kullanır",
        "Yalnızca kimyasal katkılı suyu kullanır",
        "Yalnızca kazan besleme suyunu kullanır",
        "Doğrudan deniz suyunu kullanmaktadır",
      ],
      correctAnswer: 3,
      explanation:
        "Açık devrede deniz suyunun doğal alkalinitesi asidi nötrler ve yıkama suyu izlenerek denize verilir; kapalı devrede ise tatlı su ve kostik katkı kullanılır.",
      category: "Çevre",
    },
    {
      id: 195,
      question: "Scrubber kullanımında hangi kısıt gündeme gelmiştir?",
      options: [
        "Bazı limanlarda yıkama suyu yasağı",
        "Yalnızca yakıt fiyatının yükselmesi",
        "Yalnızca mürettebat sayısı artışı",
        "Yalnızca gemi hızının düşürülmesi",
      ],
      correctAnswer: 0,
      explanation:
        "Bir dizi liman ve kıyı devleti açık devre yıkama suyunun kendi sularına deşarjını yasaklamıştır; bu bölgelerde kapalı devreye geçilir veya uyumlu yakıt yakılır.",
      category: "Çevre",
    },
    {
      id: 196,
      question: "NOx Tier III standardı nerede uygulanır?",
      options: [
        "Yalnızca tüm dünya denizlerinde",
        "NOx emisyon kontrol alanlarında",
        "Yalnızca liman sınırları içinde",
        "Yalnızca kutup bölgelerinde",
      ],
      correctAnswer: 1,
      explanation:
        "Tier III, belirlenmiş NOx emisyon kontrol alanlarında ve 2016 sonrası inşa gemilerde geçerlidir; alan dışında aynı makine Tier II sınırına göre çalışabilir.",
      category: "Çevre",
    },
    {
      id: 197,
      question: "NOx Tier sınırları hangi büyüklüğe göre değişir?",
      options: [
        "Yalnızca geminin tonaj değerine göre",
        "Yalnızca yakıtın kükürt oranına göre",
        "Motorun anma devir sayısına göre",
        "Yalnızca geminin sefer bölgesine göre",
      ],
      correctAnswer: 2,
      explanation:
        "Sınır değerler g/kWh cinsinden verilir ve motorun anma devrine bağlı bir eğri izler; düşük devirli büyük dizellerde sınır yüksek devirlilere göre daha gevşektir.",
      category: "Çevre",
    },
    {
      id: 198,
      question: "SCR sisteminde hangi kimyasal kullanılır?",
      options: [
        "Yalnızca sülfürik asit kullanılmaktadır",
        "Yalnızca sodyum hidroksit kullanılır",
        "Yalnızca hidroklorik asit kullanılır",
        "Üre veya amonyak çözeltisi kullanılır",
      ],
      correctAnswer: 3,
      explanation:
        "Egzoz akışına püskürtülen üre çözeltisi ısıyla amonyağa dönüşür; katalizör yüzeyinde azot oksitleriyle tepkimeye girip zararsız azot ve su buharı oluşturur.",
      category: "Çevre",
    },
    {
      id: 199,
      question: "SCR reaktörünün çalışması için hangi koşul gerekir?",
      options: [
        "Egzoz sıcaklığının yeterli olması",
        "Yalnızca gemi hızının yüksek olması",
        "Yalnızca yakıtın damıtık olması",
        "Yalnızca deniz suyunun soğuk olması",
      ],
      correctAnswer: 0,
      explanation:
        "Katalizör tipik olarak 300 °C üzerinde etkin çalışır; düşük yükte sıcaklık düşerse dönüşüm verimi azalır ve amonyum sülfat birikip katalizörü tıkayabilir.",
      category: "Çevre",
    },
    {
      id: 200,
      question: "SCR sisteminde amonyak kaçağı (ammonia slip) nedir?",
      options: [
        "Yalnızca üre tankındaki sızıntıdır",
        "Tepkimeye girmeyen amonyağın çıkması",
        "Yalnızca katalizörün aşınmasıdır",
        "Yalnızca egzoz basıncının artmasıdır",
      ],
      correctAnswer: 1,
      explanation:
        "Aşırı dozaj veya düşük sıcaklıkta tepkimeye girmeyen amonyak bacadan çıkar; bu hem kirletici hem verim kaybıdır, dozaj sürekli geri beslemeli denetlenir.",
      category: "Çevre",
    },
    {
      id: 201,
      question: "EGR sistemi NOx oluşumunu nasıl azaltır?",
      options: [
        "Yalnızca yakıt basıncını yükselterek",
        "Yalnızca yakıt debisini artırarak",
        "Yanma sıcaklığını düşürerek azaltır",
        "Yalnızca hava debisini yükselterek",
      ],
      correctAnswer: 2,
      explanation:
        "Egzoz gazının bir bölümü silindire geri gönderilir; ortamdaki oksijen oranı ve özgül ısı değişerek tepe yanma sıcaklığı düşer ve azot oksit oluşumu azalır.",
      category: "Çevre",
    },
    {
      id: 202,
      question: "EGR sisteminde geri gönderilen gaz neden temizlenir?",
      options: [
        "Yalnızca gazın rengini açmak içindir",
        "Yalnızca gazın hacmini artırmak için",
        "Yalnızca gazın basıncını artırmak için",
        "Kurum ve kükürtün motoru aşındırması",
      ],
      correctAnswer: 3,
      explanation:
        "Geri gönderilen gaz yıkayıcıdan geçirilerek kurum ve kükürt bileşiklerinden arındırılır; aksi hâlde silindir, segman ve yağ hızla aşınır, asidik korozyon oluşur.",
      category: "Çevre",
    },
    {
      id: 203,
      question: "EGR ile SCR arasındaki temel fark nedir?",
      options: [
        "EGR yanma içinde, SCR egzozda çalışır",
        "İkisi de yalnızca egzozda çalışmakta",
        "İkisi de yalnızca yanma içinde çalışır",
        "EGR yalnızca kükürt oksitini azaltır",
      ],
      correctAnswer: 0,
      explanation:
        "EGR azot oksidin oluşmasını yanma sırasında engeller; SCR ise oluşan azot oksidi egzozda katalizörle indirger. İkisi farklı noktalarda ve farklı ilkelerle çalışır.",
      category: "Çevre",
    },
    {
      id: 204,
      question: "EEDI hangi gemilere uygulanır?",
      options: [
        "Yalnızca mevcut tüm gemilere uygulanır",
        "Yeni inşa edilen gemilere uygulanır",
        "Yalnızca yolcu gemilerine uygulanır",
        "Yalnızca 2010 öncesi gemilere uygulanır",
      ],
      correctAnswer: 1,
      explanation:
        "Enerji Verimliliği Tasarım İndeksi yeni inşa gemiler için hesaplanır ve dönem dönem sıkılaşan referans çizgisinin altında kalması gerekir.",
      category: "Çevre",
    },
    {
      id: 205,
      question: "EEXI ile EEDI arasındaki temel fark nedir?",
      options: [
        "İkisi de yalnızca yeni gemilere uygulanır",
        "EEXI yalnızca yolcu gemisi için hesaplanır",
        "EEXI mevcut gemiler için hesaplanır",
        "EEDI yalnızca sefer bazında hesaplanır",
      ],
      correctAnswer: 2,
      explanation:
        "EEDI yeni inşa, EEXI ise mevcut filo içindir; her ikisi de tasarım temelli indekslerdir ve geminin işletme performansını değil teorik verimliliğini ölçer.",
      category: "Çevre",
    },
    {
      id: 206,
      question: "CII göstergesi hangi veriyle hesaplanır?",
      options: [
        "Yalnızca geminin tasarım hızı verisiyle",
        "Yalnızca geminin tonaj bilgisi verisiyle",
        "Yalnızca mürettebat sayısı verisiyle",
        "Yıllık yakıt tüketimi ve mesafe verisiyle",
      ],
      correctAnswer: 3,
      explanation:
        "Yıllık yakıt tüketiminden hesaplanan CO₂ salımı, deadweight ile katedilen mesafenin çarpımına bölünerek taşıma işi başına karbon yoğunluğu bulunur.",
      category: "Çevre",
    },
    {
      id: 207,
      question: "CII derecelendirmesinde kaç kademe vardır?",
      options: [
        "A'dan E'ye beş kademe bulunur",
        "Yalnızca üç kademe bulunmaktadır",
        "Yalnızca iki kademe bulunmaktadır",
        "Yalnızca on kademe bulunmaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "A en iyi, E en kötü performansı gösterir; sınır değerler her yıl sıkılaştığı için aynı performansla çalışan gemi zamanla daha düşük dereceye düşer.",
      category: "Çevre",
    },
    {
      id: 208,
      question: "CII derecesi kötüleşen gemi ne yapmalıdır?",
      options: [
        "Yalnızca sefer sayısını azaltmalıdır",
        "Düzeltici eylem planı hazırlamalıdır",
        "Yalnızca bayrak değiştirmelidir",
        "Yalnızca klas kuruluşu değiştirmeli",
      ],
      correctAnswer: 1,
      explanation:
        "Üç yıl üst üste D veya bir yıl E alan gemi, SEEMP Bölüm III'e onaylı bir düzeltici eylem planı ekler; plan olmadan Uygunluk Beyanı yenilenmez.",
      category: "Çevre",
    },
    {
      id: 209,
      question: "Balast Su Yönetimi Sözleşmesi neyi önlemeyi amaçlar?",
      options: [
        "Yalnızca petrol kirliliğini önlemeyi",
        "Yalnızca hava kirliliğini önlemeyi",
        "İstilacı türlerin taşınmasını önlemeyi",
        "Yalnızca çöp kirliliğini önlemeyi",
      ],
      correctAnswer: 2,
      explanation:
        "Balast suyuyla taşınan yabancı organizmalar yeni ortamda yerel türleri baskılayıp ekosistemi bozar; sözleşme bu biyolojik kirlenmeyi sınırlamayı hedefler.",
      category: "Çevre",
    },
    {
      id: 210,
      question: "BWM Sözleşmesi kapsamında gemide hangi belge aranır?",
      options: [
        "Yalnızca IOPP sertifikası aranmaktadır",
        "Yalnızca IAPP sertifikası aranmaktadır",
        "Yalnızca ISPP sertifikası aranmaktadır",
        "Uluslararası Balast Su Yönetimi Belgesi",
      ],
      correctAnswer: 3,
      explanation:
        "Belge, gemideki balast su yönetim planının ve arıtma sisteminin sözleşmeye uygunluğunu gösterir; ayrıca balast su kayıt defteri bulundurulur.",
      category: "Çevre",
    },
    {
      id: 211,
      question: "Balast su yönetim planı neyi tanımlar?",
      options: [
        "Yöntem, sorumlular ve emniyet önlemleri",
        "Yalnızca kargo istif düzenini tanımlar",
        "Yalnızca yakıt tüketim planını tanımlar",
        "Yalnızca vardiya çizelgesini tanımlar",
      ],
      correctAnswer: 0,
      explanation:
        "Plan; kullanılacak yöntemi, tank sıralamasını, tortu yönetimini, görevli personeli, kayıt düzenini ve işlem sırasındaki dayanım ile stabilite sınırlarını içerir.",
      category: "Çevre",
    },
    {
      id: 212,
      question: "D-1 standardı hangi yöntemi tanımlar?",
      options: [
        "Yalnızca balast suyunun arıtılmasını",
        "Balast suyunun açık denizde değişimini",
        "Yalnızca balast suyunun ısıtılmasını",
        "Yalnızca balast suyunun filtrelenmesini",
      ],
      correctAnswer: 1,
      explanation:
        "D-1 değişim standardıdır; balast suyu açık denizde en az %95 hacimsel değişim sağlanacak biçimde yenilenir. Yerini kademeli olarak D-2 arıtma standardına bırakmıştır.",
      category: "Çevre",
    },
    {
      id: 213,
      question: "D-2 standardı neyi sınırlar?",
      options: [
        "Yalnızca balast suyunun tuzluluğunu",
        "Yalnızca balast suyunun sıcaklığını",
        "Deşarj edilen sudaki canlı organizmayı",
        "Yalnızca balast suyunun bulanıklığını",
      ],
      correctAnswer: 2,
      explanation:
        "D-2; boyut sınıflarına göre metreküpte ve mililitrede izin verilen canlı organizma sayısı ile gösterge bakterileri için üst sınırlar tanımlar.",
      category: "Çevre",
    },
    {
      id: 214,
      question: "D-1'den D-2'ye geçiş takvimi neye bağlanmıştır?",
      options: [
        "Yalnızca geminin bayrak devletine",
        "Yalnızca geminin tonaj değerine",
        "Yalnızca geminin sefer bölgesine",
        "IOPP yenileme sörveyi takvimine",
      ],
      correctAnswer: 3,
      explanation:
        "Mevcut gemiler için geçiş tarihi, sözleşmenin yürürlüğe girmesinden sonraki ilk IOPP yenileme sörveyine bağlanmıştır; 2024 sonrası tüm gemiler D-2'ye tabidir.",
      category: "Çevre",
    },
    {
      id: 215,
      question: "Balast su arıtma sistemi (BWTS) genelde kaç aşamalıdır?",
      options: [
        "Filtrasyon ve dezenfeksiyon olmak üzere iki",
        "Yalnızca tek aşamalı olarak çalışmaktadır",
        "Yalnızca beş aşamalı olarak çalışmaktadır",
        "Yalnızca yedi aşamalı olarak çalışmaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "İlk aşamada filtre büyük parçacıkları ve tortuyu tutar; ikinci aşamada ultraviyole, elektroliz veya kimyasal ile kalan organizmalar etkisiz hâle getirilir.",
      category: "Çevre",
    },
    {
      id: 216,
      question: "BWTS onayında hangi belge aranır?",
      options: [
        "Yalnızca üretici garanti belgesi aranır",
        "IMO tip onay sertifikası aranmaktadır",
        "Yalnızca liman devleti izni aranmakta",
        "Yalnızca sigorta poliçesi aranmaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "Sistem IMO tip onayına sahip olmalı, ayrıca ABD sularına giren gemilerde USCG tip onayı da aranır; onaylar sistemin test edilmiş etkinliğini belgeler.",
      category: "Çevre",
    },
    {
      id: 217,
      question: "Ultraviyole ile balast suyu arıtmanın çalışma ilkesi nedir?",
      options: [
        "Yalnızca organizmaları süzüp tutması",
        "Yalnızca suyu ısıtarak öldürmektedir",
        "Organizmanın DNA'sını bozup üremeyi engellemesi",
        "Yalnızca suya klor eklemesi ilkesidir",
      ],
      correctAnswer: 2,
      explanation:
        "Ultraviyole ışık hücre DNA'sına zarar vererek organizmanın çoğalmasını engeller; yöntem kimyasal kalıntı bırakmaz ancak bulanık suda etkinliği düşer.",
      category: "Çevre",
    },
    {
      id: 218,
      question: "Elektroliz yöntemiyle balast suyu arıtma nasıl çalışır?",
      options: [
        "Yalnızca suyu filtreden geçirmektedir",
        "Yalnızca suyu vakumda kaynatmaktadır",
        "Yalnızca suya ultraviyole uygulamakta",
        "Deniz suyundan aktif klor üretmektedir",
      ],
      correctAnswer: 3,
      explanation:
        "Deniz suyundaki klorür iyonları elektroliz hücresinde aktif klora dönüşür ve organizmaları etkisiz kılar; deşarj öncesi kalıntı klor nötrleştirilir.",
      category: "Çevre",
    },
    {
      id: 219,
      question: "Filtrasyon aşamasının balast su arıtmadaki rolü nedir?",
      options: [
        "Büyük organizma ve tortuyu tutmaktır",
        "Yalnızca suyun tuzunu almaktadır",
        "Yalnızca suyu ısıtmaktan ibarettir",
        "Yalnızca suyu klorlamaktan ibarettir",
      ],
      correctAnswer: 0,
      explanation:
        "Genelde 40-50 mikron gözenekli otomatik geri yıkamalı filtre kullanılır; tutulan tortu alındığı bölgeye geri verilir ve ikinci aşamanın yükü azalır.",
      category: "Çevre",
    },
    {
      id: 220,
      question: "Balast su değişimi hangi bölgede yapılmalıdır?",
      options: [
        "Yalnızca liman sınırı içinde yapılır",
        "Karadan 200 mil, 200 m derinlikte",
        "Yalnızca demir yerinde yapılmaktadır",
        "Yalnızca kanal geçişinde yapılmakta",
      ],
      correctAnswer: 1,
      explanation:
        "Kural, karadan en az 200 mil açıkta ve en az 200 metre derinlikte değişimi ister; mümkün değilse en az 50 mil ve 200 metre koşulu uygulanabilir.",
      category: "Çevre",
    },
    {
      id: 221,
      question: "Balast değişiminde sıralı (sequential) yöntem nedir?",
      options: [
        "Yalnızca tanka sürekli su basılmasıdır",
        "Yalnızca tankın havalandırılmasıdır",
        "Tankın boşaltılıp yeniden doldurulması",
        "Yalnızca tankın ısıtılmasıdır",
      ],
      correctAnswer: 2,
      explanation:
        "Sıralı yöntemde tank tümüyle boşaltılıp yeniden doldurulur; bu sırada gemi stabilitesi, tekne dayanımı ve baş omuz vurma riski dikkatle izlenmelidir.",
      category: "Çevre",
    },
    {
      id: 222,
      question: "Balast su değişimi sırasında hangi risk gözetilir?",
      options: [
        "Yalnızca yakıt tüketiminin artması",
        "Yalnızca seyir süresinin uzaması",
        "Yalnızca mürettebat yorgunluğu",
        "Stabilite ve tekne dayanımı sınırları",
      ],
      correctAnswer: 3,
      explanation:
        "Boşalan tanklar serbest yüzey etkisi, azalan metasantr yüksekliği ve artan burulma ile eğilme momenti yaratır; işlem yükleme bilgisayarıyla önceden doğrulanır.",
      category: "Çevre",
    },
    {
      id: 223,
      question: "Balast su kayıt defterine hangi işlemler yazılır?",
      options: [
        "Alma, değişim, deşarj ve arıtma işlemleri",
        "Yalnızca yakıt alma işlemleri yazılır",
        "Yalnızca çöp teslim işlemleri yazılır",
        "Yalnızca kargo yükleme işlemi yazılır",
      ],
      correctAnswer: 0,
      explanation:
        "Balast alma, tank içi transfer, değişim, arıtma sistemi kullanımı, deşarj ve kazara boşalma tarih, konum ve miktarla birlikte kaydedilir.",
      category: "Çevre",
    },
    {
      id: 224,
      question: "Balast su kayıt defteri ne kadar süre saklanır?",
      options: [
        "Yalnızca bir ay boyunca saklanır",
        "Son kayıttan sonra iki yıl saklanır",
        "Yalnızca bir hafta boyunca saklanır",
        "Yalnızca sefer süresince saklanır",
      ],
      correctAnswer: 1,
      explanation:
        "Defter son kayıttan itibaren iki yıl gemide bulundurulur, ardından üç yıl daha şirket tarafından saklanır; kayıtlar liman devleti denetiminde incelenir.",
      category: "Çevre",
    },
    {
      id: 225,
      question: "Arıtma sistemi arızalandığında balast kaydı nasıl tutulur?",
      options: [
        "Yalnızca arıza sonrası kayıt yazılmaz",
        "Yalnızca sözlü olarak bildirilmektedir",
        "Arıza ve alınan önlem deftere işlenir",
        "Yalnızca klas kuruluşuna bildirilir",
      ],
      correctAnswer: 2,
      explanation:
        "Arızanın niteliği, süresi ve bu sırada uygulanan alternatif yönetim yöntemi deftere yazılır; durum bayrak devletine ve varış limanına önceden bildirilir.",
      category: "Çevre",
    },
    {
      id: 226,
      question: "Çöp yönetim planı hangi dilde hazırlanır?",
      options: [
        "Yalnızca bayrak devletinin dilinde",
        "Yalnızca liman devletinin dilinde",
        "Yalnızca İngilizce olarak hazırlanır",
        "Mürettebatın çalışma dilinde hazırlanır",
      ],
      correctAnswer: 3,
      explanation:
        "Plan gemide fiilen kullanılan çalışma dilinde yazılır; çalışma dili İngilizce, Fransızca veya İspanyolca değilse bu dillerden birine çeviri de eklenir.",
      category: "Çevre",
    },
    {
      id: 227,
      question: "Çöp yönetim planı neyi içerir?",
      options: [
        "Toplama, ayırma, işleme ve teslim düzeni",
        "Yalnızca yakıt tüketim hedeflerini",
        "Yalnızca vardiya çizelgesi düzenini",
        "Yalnızca kargo istif planı düzenini",
      ],
      correctAnswer: 0,
      explanation:
        "Plan; çöpün toplanması, türlerine ayrılması, gemide işlenmesi ve depolanması ile liman tesisine teslim düzenini ve sorumlu kişileri tanımlar.",
      category: "Çevre",
    },
    {
      id: 228,
      question: "Çöp yönetiminde atanan sorumlu kişi ne yapar?",
      options: [
        "Yalnızca çöp poşetlerini dağıtmaktadır",
        "Planın uygulanmasını izleyip kaydeder",
        "Yalnızca liman acentesini aramaktadır",
        "Yalnızca çöp fırınını çalıştırmaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "Atanan kişi ayırma düzeninin işlediğini denetler, kayıt defterini tutar, teslim makbuzlarını arşivler ve mürettebatı düzenli olarak bilgilendirir.",
      category: "Çevre",
    },
    {
      id: 229,
      question: "MARPOL Ek V'te çöp kaç kategoriye ayrılır?",
      options: [
        "Yalnızca iki kategoriye ayrılmaktadır",
        "Yalnızca üç kategoriye ayrılmaktadır",
        "Plastik dâhil dokuz kategoriye ayrılır",
        "Yalnızca yirmi kategoriye ayrılmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "Kategoriler plastik, gıda atığı, yemek yağı, kül, işletme atığı, kargo artığı, hayvan leşi, balıkçılık takımı ve elektronik atık olarak ayrılır.",
      category: "Çevre",
    },
    {
      id: 230,
      question: "Çöp kayıt defterine hangi bilgiler yazılır?",
      options: [
        "Yalnızca çöp poşeti sayısı yazılır",
        "Yalnızca gemi personeli adı yazılır",
        "Yalnızca hava koşulları yazılmakta",
        "Tarih, konum, kategori ve miktar",
      ],
      correctAnswer: 3,
      explanation:
        "Her deşarj, yakma veya liman tesisine teslim işleminde tarih, saat, gemi konumu, çöp kategorisi ve tahminî hacim kaydedilir ve sorumlu zabit imzalar.",
      category: "Çevre",
    },
    {
      id: 231,
      question: "Liman tesisine teslim edilen çöp için ne alınır?",
      options: [
        "Atık teslim makbuzu alınmaktadır",
        "Yalnızca sözlü onay alınmaktadır",
        "Yalnızca acente notu alınmaktadır",
        "Yalnızca fotoğraf çekilmektedir",
      ],
      correctAnswer: 0,
      explanation:
        "Tesis tarafından düzenlenen makbuz teslim edilen kategorileri ve miktarları gösterir; makbuz çöp kayıt defterine eklenir ve iki yıl gemide saklanır.",
      category: "Çevre",
    },
    {
      id: 232,
      question: "Gemi incineratörü hangi bölgede çalıştırılamaz?",
      options: [
        "Yalnızca açık okyanus bölgesinde",
        "Liman ve iç sular ile bazı özel alanlarda",
        "Yalnızca kutup bölgelerinde çalışamaz",
        "Yalnızca gece saatlerinde çalışamaz",
      ],
      correctAnswer: 1,
      explanation:
        "MARPOL Ek VI liman, iç sular ve bazı özel alanlarda gemide yakmayı yasaklar; ayrıca yakma yalnızca onaylı tip incinerator ile ve kayıt tutularak yapılır.",
      category: "Çevre",
    },
    {
      id: 233,
      question: "İncineratörde hangi atık yakılamaz?",
      options: [
        "Yalnızca yağlı bez parçaları yakılamaz",
        "Yalnızca kâğıt ambalajlar yakılamaz",
        "PCB ve ağır metal içeren atık yakılamaz",
        "Yalnızca gıda atıkları yakılamaz",
      ],
      correctAnswer: 2,
      explanation:
        "Kargo artığı, PCB, halojenli bileşikler ve ağır metal içeren atıklar ile Ek I, II ve III kapsamındaki maddeler gemide yakılamaz; liman tesisine teslim edilir.",
      category: "Çevre",
    },
    {
      id: 234,
      question: "İncineratör yanma odası sıcaklığı neden izlenir?",
      options: [
        "Yalnızca yakıt tüketimini ölçmek için",
        "Yalnızca bacayı temiz tutmak için",
        "Yalnızca gürültüyü azaltmak için",
        "Tam yanmanın sağlandığını doğrulamak",
      ],
      correctAnswer: 3,
      explanation:
        "Onaylı tip incineratörlerde yanma odası sıcaklığı belirlenen alt sınırın üzerinde tutulmalıdır; düşük sıcaklık eksik yanma, is ve zararlı bileşik salımı demektir.",
      category: "Çevre",
    },
    {
      id: 235,
      question: "Biyolojik pis su arıtma tesisi hangi ilkeyle çalışır?",
      options: [
        "Aerobik bakterilerin organik yükü parçalaması",
        "Yalnızca suyun ısıtılıp buharlaştırılması",
        "Yalnızca suyun ince filtreden geçirilmesi",
        "Yalnızca suya kimyasal katkı eklenmesi",
      ],
      correctAnswer: 0,
      explanation:
        "Havalandırma bölmesinde üflenen hava aerobik bakterileri besler; bakteriler organik maddeyi parçalar, çökeltme bölmesinde çamur ayrılır ve çıkış suyu dezenfekte edilir.",
      category: "Çevre",
    },
    {
      id: 236,
      question: "Pis su arıtma tesisine hangi maddelerin girmesi engellenir?",
      options: [
        "Yalnızca sıcak su girmesi engellenir",
        "Deterjan, kimyasal ve yağ girmesi",
        "Yalnızca soğuk su girmesi engellenir",
        "Yalnızca tatlı su girmesi engellenir",
      ],
      correctAnswer: 1,
      explanation:
        "Güçlü deterjan, dezenfektan, boya ve yağ bakterileri öldürerek tesisi devre dışı bırakır; bu yüzden makine dairesi ve kimyasal kaynaklı akışlar tesise bağlanmaz.",
      category: "Çevre",
    },
    {
      id: 237,
      question: "Pis su arıtma tesisi çıkış suyu hangi ölçütle izlenir?",
      options: [
        "Yalnızca suyun sıcaklık değeriyle",
        "Yalnızca suyun tuzluluk değeriyle",
        "Askıda katı, BOİ ve koliform sayısı",
        "Yalnızca suyun bulanıklık değeriyle",
      ],
      correctAnswer: 2,
      explanation:
        "IMO ölçütleri askıda katı madde, biyokimyasal oksijen ihtiyacı ve termotolerant koliform sayısı için üst sınır verir; tesis bunları sağlayacak biçimde tip onaylıdır.",
      category: "Çevre",
    },
    {
      id: 238,
      question: "Liman atık alım tesisi kullanılmadan önce ne yapılır?",
      options: [
        "Yalnızca atık denize boşaltılmaktadır",
        "Yalnızca atık yakılıp küle çevrilir",
        "Yalnızca atık ambara istiflenmektedir",
        "Önceden bildirim yapılıp randevu alınır",
      ],
      correctAnswer: 3,
      explanation:
        "Gemi, teslim edeceği atık türlerini ve miktarlarını limana önceden bildirir; tesis kapasitesine göre randevu verilir ve teslim sonrası makbuz düzenlenir.",
      category: "Çevre",
    },
    {
      id: 239,
      question: "Liman tesisinin atığı kabul etmemesi durumunda ne yapılır?",
      options: [
        "Yetersizlik raporu doldurulup bildirilir",
        "Yalnızca atık denize boşaltılmaktadır",
        "Yalnızca atık yakılarak yok edilmekte",
        "Yalnızca kayıt tutulmadan geçilmekte",
      ],
      correctAnswer: 0,
      explanation:
        "IMO'nun öngördüğü tesis yetersizliği bildirim formu doldurulup bayrak devletine ve IMO'ya iletilir; atık gemide tutulmaya devam edilir, denize verilmez.",
      category: "Çevre",
    },
    {
      id: 240,
      question: "Liman atık teslim makbuzu neden saklanır?",
      options: [
        "Yalnızca muhasebe kaydı için saklanır",
        "Denetimde uyumun kanıtı olduğu için",
        "Yalnızca acente talebi olduğu için",
        "Yalnızca sigorta talebi olduğu için",
      ],
      correctAnswer: 1,
      explanation:
        "Makbuz, atığın usulüne uygun teslim edildiğini gösteren tek belgedir; çöp ve yağ kayıt defterlerine iliştirilir ve liman devleti denetiminde ilk istenen kanıttır.",
      category: "Çevre",
    },
  ],
};
