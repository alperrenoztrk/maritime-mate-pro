import type { QuizQuestion } from "@/types/quiz";

/**
 * Konu doldurma bankası 14 — termodinamik konu bankasında konu başına en az 8
 * soru hedefini tutturmak için yazılan ek sorular.
 *
 * `exerciseQuestionDistribution.ts` soruları konu başlıklarıyla sözcük örtüşmesine
 * göre eşlediğinden her soru hedeflediği konunun kendi terminolojisini kullanır;
 * aksi hâlde benzerlik puanı soruyu komşu konuya taşır. Birbirine yakın konular
 * (izotermik/izobarik/izokorik/adyabatik/politropik süreçler, Fourier iletimi ile
 * çok katmanlı duvar, LMTD ile eşanjör verimi) ayrı sözcüklerle yazılmıştır.
 *
 * Numaralandırma taban + devam + vaka bankalarının ardından sürer (155'ten
 * başlar); `machineQuizDataIndex.ts` bankaları slug bazında bu sırayla birleştirir.
 */
export const machineQuizQuestionsTopicFill14: Record<string, QuizQuestion[]> = {
  thermodynamics: [
    {
      id: 155,
      question: "Termodinamikte kapalı sistem nasıl tanımlanır?",
      options: [
        "Kütle geçmeyen, enerji geçebilen sistem",
        "Hem kütle hem enerji geçen sistemdir",
        "Ne kütle ne enerji geçen sistemdir",
        "Yalnızca kütle geçen bir sistemdir",
      ],
      correctAnswer: 0,
      explanation:
        "Kapalı sistemde sınırdan kütle geçmez ama ısı ve iş geçebilir; piston-silindir düzeneği tipik örnektir.",
      category: "Termodinamik",
    },
    {
      id: 156,
      question: "Açık sistem (kontrol hacmi) neyi ifade eder?",
      options: [
        "Yalnızca yalıtılmış bir hacmi ifade eder",
        "Sınırından kütle akışı olan sistemi",
        "Yalnızca sabit hacimli sistemi ifade eder",
        "Yalnızca sabit basınçlı sistemi ifade eder",
      ],
      correctAnswer: 1,
      explanation:
        "Türbin, kompresör ve eşanjör gibi cihazlarda akışkan sürekli girip çıkar; bu düzenekler kontrol hacmi olarak çözümlenir.",
      category: "Termodinamik",
    },
    {
      id: 157,
      question: "Yalıtılmış (izole) sistem hangi özelliği taşır?",
      options: [
        "Yalnızca ısı geçişine izin vermektedir",
        "Yalnızca iş geçişine izin vermektedir",
        "Çevresiyle kütle ve enerji alışverişi yok",
        "Yalnızca kütle geçişine izin vermektedir",
      ],
      correctAnswer: 2,
      explanation:
        "Yalıtılmış sistemde sınırdan ne kütle ne ısı ne de iş geçer; toplam enerjisi sabit kalır.",
      category: "Termodinamik",
    },
    {
      id: 158,
      question: "Termodinamik sistemin sınırı neyi belirler?",
      options: [
        "Yalnızca sistemin sıcaklığını belirler",
        "Yalnızca sistemin basıncını belirler",
        "Yalnızca sistemin kütlesini belirler",
        "Sistem ile çevrenin ayrıldığı yüzeyi",
      ],
      correctAnswer: 3,
      explanation:
        "Sınır gerçek veya hayalî olabilir, sabit veya hareketli olabilir; enerji ve kütle geçişleri bu yüzeyden hesaplanır.",
      category: "Termodinamik",
    },
    {
      id: 159,
      question: "Adyabatik sınır hangi geçişi engeller?",
      options: [
        "Isı geçişini tümüyle engellemektedir",
        "Yalnızca iş geçişini engellemektedir",
        "Yalnızca kütle geçişini engellemektedir",
        "Yalnızca basınç geçişini engellemektedir",
      ],
      correctAnswer: 0,
      explanation:
        "Adyabatik sınırdan ısı geçmez; sistem yalnızca iş yoluyla enerji alışverişi yapabilir.",
      category: "Termodinamik",
    },
    {
      id: 160,
      question: "Hal büyüklüklerinden hangisi şiddet (intensive) özelliğidir?",
      options: [
        "Toplam hacim şiddet özelliğidir",
        "Sıcaklık şiddet özelliği taşımaktadır",
        "Toplam kütle şiddet özelliğidir",
        "Toplam enerji şiddet özelliğidir",
      ],
      correctAnswer: 1,
      explanation:
        "Şiddet özellikleri kütleden bağımsızdır; sıcaklık, basınç ve özgül hacim bu gruba girer.",
      category: "Termodinamik",
    },
    {
      id: 161,
      question: "Özgül hacim neyi ifade eder?",
      options: [
        "Yalnızca toplam hacmin kendisini",
        "Yalnızca toplam kütlenin kendisini",
        "Birim kütlenin kapladığı hacmi",
        "Yalnızca basıncın hacme oranını",
      ],
      correctAnswer: 2,
      explanation:
        "Özgül hacim, toplam hacmin kütleye bölünmesiyle bulunur ve yoğunluğun tersidir.",
      category: "Termodinamik",
    },
    {
      id: 162,
      question: "Termodinamik denge hâli neyi gerektirir?",
      options: [
        "Yalnızca basıncın değişmesini gerektirir",
        "Yalnızca sıcaklığın yükselmesini gerektirir",
        "Yalnızca hacmin büyümesini gerektirir",
        "Hal büyüklüklerinin sabit kalmasını",
      ],
      correctAnswer: 3,
      explanation:
        "Dengede sistemin her noktasında sıcaklık, basınç ve bileşim aynıdır ve zamanla değişmez.",
      category: "Termodinamik",
    },
    {
      id: 163,
      question: "İç enerji neyi kapsar?",
      options: [
        "Moleküllerin toplam mikroskobik enerjisini",
        "Yalnızca sistemin konum enerjisini",
        "Yalnızca sistemin kinetik enerjisini",
        "Yalnızca sisteme verilen işi kapsar",
      ],
      correctAnswer: 0,
      explanation:
        "İç enerji, moleküllerin öteleme, dönme, titreşim ve moleküller arası bağ enerjilerinin toplamıdır.",
      category: "Termodinamik",
    },
    {
      id: 164,
      question: "Entalpi nasıl tanımlanır?",
      options: [
        "Yalnızca iç enerjinin kendisi olarak",
        "İç enerji ile basınç-hacim çarpımı toplamı",
        "Yalnızca basınç ile hacim çarpımı olarak",
        "Yalnızca entropi ile sıcaklık çarpımı",
      ],
      correctAnswer: 1,
      explanation:
        "Entalpi h = u + pv biçiminde tanımlanır; akışlı sistemlerde akış işi bu terimle birlikte hesaba katılır.",
      category: "Termodinamik",
    },
    {
      id: 165,
      question: "Sabit basınçtaki özgül ısı (Cp) neyi verir?",
      options: [
        "Yalnızca hacim değişimini vermektedir",
        "Yalnızca entropi değişimini vermektedir",
        "Sabit basınçta entalpi değişimini",
        "Yalnızca basınç değişimini vermektedir",
      ],
      correctAnswer: 2,
      explanation:
        "Sabit basınçta birim kütleyi bir derece ısıtmak için gereken ısı Cp ile verilir ve entalpi değişimine eşittir.",
      category: "Termodinamik",
    },
    {
      id: 166,
      question: "Cp neden Cv değerinden büyüktür?",
      options: [
        "Yalnızca ölçüm hatası nedeniyle büyüktür",
        "Yalnızca sıcaklık farkı nedeniyle büyüktür",
        "Yalnızca kütle farkı nedeniyle büyüktür",
        "Genleşme işi de karşılanması gerektiği için",
      ],
      correctAnswer: 3,
      explanation:
        "Sabit basınçta ısıtılan gaz genleşerek iş yapar; verilen ısının bir bölümü bu işe gittiğinden Cp daha büyüktür.",
      category: "Termodinamik",
    },
    {
      id: 167,
      question: "İdeal gazda Cp ile Cv arasındaki fark neye eşittir?",
      options: [
        "Gaz sabiti R değerine eşittir",
        "Yalnızca sıcaklık değerine eşittir",
        "Yalnızca basınç değerine eşittir",
        "Yalnızca hacim değerine eşittir",
      ],
      correctAnswer: 0,
      explanation:
        "İdeal gaz için Cp − Cv = R bağıntısı geçerlidir; bu ilişki gaz tablolarının türetilmesinde kullanılır.",
      category: "Termodinamik",
    },
    {
      id: 168,
      question: "Özgül ısı oranı (k veya γ) nasıl bulunur?",
      options: [
        "Yalnızca Cp ile Cv toplamı olarak",
        "Cp değerinin Cv değerine oranı olarak",
        "Yalnızca Cv değerinin karesi olarak",
        "Yalnızca R değerinin karesi olarak",
      ],
      correctAnswer: 1,
      explanation:
        "k = Cp/Cv oranıdır; hava için yaklaşık 1,4'tür ve izentropik süreç bağıntılarında üs olarak kullanılır.",
      category: "Termodinamik",
    },
    {
      id: 169,
      question: "Termodinamiğin sıfırıncı yasası neyi ifade eder?",
      options: [
        "Yalnızca enerjinin korunduğunu ifade eder",
        "Yalnızca entropinin arttığını ifade eder",
        "Isıl dengenin geçişken olduğunu ifade eder",
        "Yalnızca mutlak sıfırın erişilemezliğini",
      ],
      correctAnswer: 2,
      explanation:
        "İki sistem üçüncü bir sistemle ayrı ayrı ısıl dengedeyse birbirleriyle de dengededir; sıcaklık ölçümü bu ilkeye dayanır.",
      category: "Termodinamik",
    },
    {
      id: 170,
      question: "Sıfırıncı yasa hangi ölçümün temelini oluşturur?",
      options: [
        "Yalnızca basınç ölçümünün temelini",
        "Yalnızca hacim ölçümünün temelini",
        "Yalnızca kütle ölçümünün temelini",
        "Sıcaklık ölçümünün temelini oluşturur",
      ],
      correctAnswer: 3,
      explanation:
        "Termometre, ölçülen cisimle ısıl dengeye gelir ve kendi göstergesi cismin sıcaklığını verir; bu geçerlilik sıfırıncı yasadan gelir.",
      category: "Termodinamik",
    },
    {
      id: 171,
      question: "Isıl denge hangi koşulda sağlanmış sayılır?",
      options: [
        "Sıcaklıklar eşitlenip ısı akışı durunca",
        "Yalnızca basınçlar eşitlenince sağlanır",
        "Yalnızca hacimler eşitlenince sağlanır",
        "Yalnızca kütleler eşitlenince sağlanır",
      ],
      correctAnswer: 0,
      explanation:
        "Temas hâlindeki iki cisim arasında sıcaklık farkı kalmayınca net ısı akışı sıfırlanır ve ısıl denge kurulur.",
      category: "Termodinamik",
    },
    {
      id: 172,
      question: "Mutlak sıcaklık ölçeği hangi noktadan başlar?",
      options: [
        "Yalnızca suyun donma noktasından başlar",
        "Moleküler hareketin durduğu noktadan",
        "Yalnızca suyun kaynama noktasından",
        "Yalnızca oda sıcaklığından başlamaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "Kelvin ölçeği mutlak sıfırdan başlar; bu nokta -273,15 °C'ye karşılık gelir ve gaz yasalarında zorunlu referanstır.",
      category: "Termodinamik",
    },
    {
      id: 173,
      question: "Termometre seçilirken hangi özellik aranır?",
      options: [
        "Yalnızca termometrenin rengi aranmaktadır",
        "Yalnızca termometrenin ağırlığı aranır",
        "Ölçülen cisme göre küçük ısıl kütle",
        "Yalnızca termometrenin boyu aranmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "Termometrenin ısıl kütlesi büyükse ölçtüğü ortamın sıcaklığını değiştirir; küçük kütle ölçüm sapmasını azaltır.",
      category: "Termodinamik",
    },
    {
      id: 174,
      question: "Sıcaklık farkı ısı akışında hangi rolü oynar?",
      options: [
        "Yalnızca akışın hızını yavaşlatır",
        "Yalnızca akışın yönünü tersine çevirir",
        "Yalnızca akışı tümüyle durdurmaktadır",
        "Akışın itici gücünü oluşturmaktadır",
      ],
      correctAnswer: 3,
      explanation:
        "Isı daima yüksek sıcaklıktan düşüğe akar; sıcaklık farkı bu akışın itici gücüdür ve fark sıfırlanınca akış durur.",
      category: "Termodinamik",
    },
    {
      id: 175,
      question: "Termodinamiğin birinci yasası hangi büyüklüğü korur?",
      options: [
        "Toplam enerjiyi korumaktadır",
        "Yalnızca toplam entropiyi korumaktadır",
        "Yalnızca toplam basıncı korumaktadır",
        "Yalnızca toplam hacmi korumaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "Enerji yoktan var edilemez ve yok edilemez; yalnızca biçim değiştirir. Sisteme giren ısı, yapılan iş ve iç enerji değişimi arasında denge kurulur.",
      category: "Termodinamik",
    },
    {
      id: 176,
      question: "Kapalı sistemde birinci yasa nasıl yazılır?",
      options: [
        "Yalnızca iş sıfıra eşit yazılmaktadır",
        "Isı eksi iş, iç enerji değişimine eşittir",
        "Yalnızca ısı sıfıra eşit yazılmaktadır",
        "Yalnızca entropi sıfıra eşit yazılır",
      ],
      correctAnswer: 1,
      explanation:
        "Q − W = ΔU bağıntısı geçerlidir; sisteme giren ısı pozitif, sistemin yaptığı iş pozitif kabul edilir.",
      category: "Termodinamik",
    },
    {
      id: 177,
      question: "Birinci yasada işaret kabulü nasıldır?",
      options: [
        "Yalnızca tüm terimler negatif alınır",
        "Yalnızca tüm terimler pozitif alınır",
        "Giren ısı ve yapılan iş pozitif alınır",
        "Yalnızca işaretler rastgele seçilir",
      ],
      correctAnswer: 2,
      explanation:
        "Yaygın kabulde sisteme giren ısı ve sistemin çevreye yaptığı iş pozitiftir; ters yönler negatif işaretle yazılır.",
      category: "Termodinamik",
    },
    {
      id: 178,
      question: "Bir çevrim tamamlandığında iç enerji değişimi ne olur?",
      options: [
        "Yalnızca sürekli artmaya devam eder",
        "Yalnızca sürekli azalmaya devam eder",
        "Yalnızca sıcaklığa eşit hâle gelir",
        "Sıfıra eşit olur, başlangıç hâline dönülür",
      ],
      correctAnswer: 3,
      explanation:
        "Hal büyüklüğü olan iç enerji başlangıç hâline dönünce aynı değeri alır; çevrimde net ısı net işe eşit olur.",
      category: "Termodinamik",
    },
    {
      id: 179,
      question: "Birinci yasa hangi makinenin olanaksızlığını gösterir?",
      options: [
        "Birinci tip devridaim makinesinin",
        "Yalnızca ikinci tip devridaim makinesinin",
        "Yalnızca buhar türbininin olanaksızlığını",
        "Yalnızca gaz türbininin olanaksızlığını",
      ],
      correctAnswer: 0,
      explanation:
        "Enerji girdisi olmadan sürekli iş üreten makine birinci yasaya aykırıdır; enerjinin korunumu bunu olanaksız kılar.",
      category: "Termodinamik",
    },
    {
      id: 180,
      question: "Sürekli akışlı açık sistemde enerji dengesi neyi içerir?",
      options: [
        "Yalnızca iç enerji terimini içermektedir",
        "Entalpi, kinetik ve konum enerjisini",
        "Yalnızca kinetik enerji terimini içerir",
        "Yalnızca konum enerjisi terimini içerir",
      ],
      correctAnswer: 1,
      explanation:
        "Kontrol hacmine giren ve çıkan akışın entalpisi, hız ve yükseklik terimleriyle birlikte ısı ve mil işine bağlanır.",
      category: "Termodinamik",
    },
    {
      id: 181,
      question: "Türbinde enerji dengesi nasıl basitleştirilir?",
      options: [
        "Yalnızca iş sıfır kabul edilerek",
        "Yalnızca entalpi sabit kabul edilerek",
        "Isı kaybı ihmal edilip adyabatik alınarak",
        "Yalnızca kütle debisi sıfır alınarak",
      ],
      correctAnswer: 2,
      explanation:
        "İyi yalıtılmış türbinde ısı kaybı küçüktür; üretilen iş giriş ile çıkış entalpisi farkına eşit alınır.",
      category: "Termodinamik",
    },
    {
      id: 182,
      question: "Kısılma (throttling) sürecinde hangi büyüklük korunur?",
      options: [
        "Yalnızca basınç korunmaktadır",
        "Yalnızca hacim korunmaktadır",
        "Yalnızca entropi korunmaktadır",
        "Entalpi yaklaşık olarak korunur",
      ],
      correctAnswer: 3,
      explanation:
        "Vana veya kılcal borudan geçişte iş ve ısı ihmal edilir; giriş ile çıkış entalpisi eşit kabul edilir, basınç ise düşer.",
      category: "Termodinamik",
    },
    {
      id: 183,
      question: "Kompresörde enerji dengesi neyi verir?",
      options: [
        "Harcanan işi entalpi artışı olarak verir",
        "Yalnızca ısı kaybını doğrudan vermektedir",
        "Yalnızca hacim değişimini vermektedir",
        "Yalnızca entropi azalışını vermektedir",
      ],
      correctAnswer: 0,
      explanation:
        "Adyabatik kabul edilen kompresörde harcanan mil işi, akışkanın entalpisindeki artışa eşittir.",
      category: "Termodinamik",
    },
    {
      id: 184,
      question: "Isı eşanjöründe enerji dengesi nasıl kurulur?",
      options: [
        "Yalnızca basınçlar eşitlenerek kurulur",
        "Bir akışkanın verdiği ısı diğerinin aldığına eşitlenir",
        "Yalnızca debiler eşitlenerek kurulur",
        "Yalnızca sıcaklıklar eşitlenerek kurulur",
      ],
      correctAnswer: 1,
      explanation:
        "Dış ortama kayıp ihmal edilirse sıcak akışkanın kaybettiği ısı, soğuk akışkanın kazandığı ısıya eşit alınır.",
      category: "Termodinamik",
    },
    {
      id: 185,
      question: "Kelvin-Planck ifadesi neyi söyler?",
      options: [
        "Yalnızca enerjinin korunduğunu söyler",
        "Yalnızca entropinin sabit kaldığını söyler",
        "Tek kaynaktan sürekli iş üretilemeyeceğini",
        "Yalnızca ısının kendiliğinden aktığını",
      ],
      correctAnswer: 2,
      explanation:
        "Bir ısı makinesi tek bir ısı kaynağından aldığı ısının tamamını sürekli olarak işe çeviremez; mutlaka bir soğuk kaynağa ısı atmalıdır.",
      category: "Termodinamik",
    },
    {
      id: 186,
      question: "Clausius ifadesi neyi söyler?",
      options: [
        "Yalnızca işin ısıya çevrilebildiğini söyler",
        "Yalnızca entropinin azaldığını söylemektedir",
        "Yalnızca enerjinin yok olduğunu söylemektedir",
        "Isının kendiliğinden soğuktan sıcağa akmadığını",
      ],
      correctAnswer: 3,
      explanation:
        "Isı, dışarıdan iş verilmedikçe düşük sıcaklıktan yükseğe akmaz; soğutma çevrimi bu yüzden kompresör işi gerektirir.",
      category: "Termodinamik",
    },
    {
      id: 187,
      question: "İkinci yasa hangi makinenin olanaksızlığını gösterir?",
      options: [
        "İkinci tip devridaim makinesinin",
        "Yalnızca birinci tip devridaim makinesinin",
        "Yalnızca dizel motorun olanaksızlığını",
        "Yalnızca buhar kazanının olanaksızlığını",
      ],
      correctAnswer: 0,
      explanation:
        "Aldığı ısının tamamını işe çeviren makine ikinci yasaya aykırıdır; enerji korunsa bile böyle bir çevrim gerçekleşemez.",
      category: "Termodinamik",
    },
    {
      id: 188,
      question: "İkinci yasa süreçlere hangi kısıtı getirir?",
      options: [
        "Yalnızca enerjinin korunmasını zorunlu kılar",
        "Süreçlerin belirli bir yönde ilerlemesini",
        "Yalnızca basıncın sabit kalmasını zorunlu kılar",
        "Yalnızca hacmin büyümesini zorunlu kılar",
      ],
      correctAnswer: 1,
      explanation:
        "Birinci yasa yön belirtmez; ikinci yasa doğal süreçlerin hangi yönde kendiliğinden ilerleyeceğini ortaya koyar.",
      category: "Termodinamik",
    },
    {
      id: 189,
      question: "Entropi kavramı fiziksel olarak neyi ölçer?",
      options: [
        "Yalnızca sistemin toplam kütlesini ölçer",
        "Yalnızca sistemin toplam hacmini ölçer",
        "Düzensizliği ve enerji yayılımını ölçer",
        "Yalnızca sistemin toplam basıncını ölçer",
      ],
      correctAnswer: 2,
      explanation:
        "Entropi, enerjinin ne kadar dağılmış ve iş üretmek için ne kadar elverişsiz hâle geldiğini nicelendirir.",
      category: "Termodinamik",
    },
    {
      id: 190,
      question: "Tersinir süreçte entropi değişimi nasıl hesaplanır?",
      options: [
        "Yalnızca basıncın hacme bölümüyle",
        "Yalnızca kütlenin hacme bölümüyle",
        "Yalnızca işin sıcaklığa bölümüyle",
        "Isının mutlak sıcaklığa bölümüyle",
      ],
      correctAnswer: 3,
      explanation:
        "Tersinir süreçte dS = δQ/T bağıntısı geçerlidir; sıcaklık mutlak ölçekte alınmak zorundadır.",
      category: "Termodinamik",
    },
    {
      id: 191,
      question: "Yalıtılmış sistemde entropi nasıl davranır?",
      options: [
        "Azalmaz, tersinmezlikte artmaktadır",
        "Yalnızca her koşulda azalmaktadır",
        "Yalnızca her koşulda sabit kalmaktadır",
        "Yalnızca sıcaklıkla ters orantılı azalır",
      ],
      correctAnswer: 0,
      explanation:
        "Yalıtılmış sistemde entropi tersinir süreçte sabit kalır, gerçek yani tersinmez süreçte ise artar; hiçbir koşulda azalmaz.",
      category: "Termodinamik",
    },
    {
      id: 192,
      question: "İzentropik süreç ne anlama gelir?",
      options: [
        "Yalnızca sabit basınçlı süreç anlamındadır",
        "Entropisi sabit kalan tersinir adyabatik süreç",
        "Yalnızca sabit hacimli süreç anlamındadır",
        "Yalnızca sabit sıcaklıklı süreç anlamındadır",
      ],
      correctAnswer: 1,
      explanation:
        "Isı geçişi olmayan ve tersinir kabul edilen süreçte entropi değişmez; türbin ve kompresör ideal davranışı böyle modellenir.",
      category: "Termodinamik",
    },
    {
      id: 193,
      question: "Tersinir süreç nasıl tanımlanır?",
      options: [
        "Yalnızca çok hızlı gerçekleşen süreçtir",
        "Yalnızca ısı geçişi olmayan süreçtir",
        "İz bırakmadan geri döndürülebilen süreç",
        "Yalnızca sabit basınçta olan süreçtir",
      ],
      correctAnswer: 2,
      explanation:
        "Tersinir süreçte hem sistem hem çevre hiçbir kalıcı değişiklik kalmadan başlangıç hâline döndürülebilir; kuramsal bir sınır durumdur.",
      category: "Termodinamik",
    },
    {
      id: 194,
      question: "Gerçek süreçleri tersinmez yapan başlıca etken nedir?",
      options: [
        "Yalnızca basıncın çok yüksek olması",
        "Yalnızca hacmin çok büyük olması",
        "Yalnızca kütlenin çok küçük olması",
        "Sürtünme ve sonlu sıcaklık farkı",
      ],
      correctAnswer: 3,
      explanation:
        "Sürtünme, sonlu sıcaklık farkıyla ısı geçişi, karışma ve ani genleşme entropi üretir ve süreci tersinmez kılar.",
      category: "Termodinamik",
    },
    {
      id: 195,
      question: "Tersinmezlik makinenin verimini nasıl etkiler?",
      options: [
        "Gerçek verimi kuramsal değerin altına indirir",
        "Yalnızca verimi kuramsal değerin üstüne çıkarır",
        "Yalnızca verimi hiç etkilememektedir",
        "Yalnızca verimi iki katına çıkarmaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "Her tersinmezlik iş üretme kapasitesinden kayıp demektir; gerçek çevrim verimi daima aynı sınırlar arasındaki tersinir çevrimin altındadır.",
      category: "Termodinamik",
    },
    {
      id: 196,
      question: "Yarı-durgun (quasi-static) süreç ne demektir?",
      options: [
        "Yalnızca çok hızlı ilerleyen süreç demektir",
        "Her an dengeye çok yakın ilerleyen süreç",
        "Yalnızca hiç iş üretmeyen süreç demektir",
        "Yalnızca hiç ısı almayan süreç demektir",
      ],
      correctAnswer: 1,
      explanation:
        "Süreç yeterince yavaş ilerlerse sistem her aşamada dengeye çok yakın kalır; bu varsayım hal değişimini diyagramda çizmeyi olanaklı kılar.",
      category: "Termodinamik",
    },
    {
      id: 197,
      question: "Exerji kavramı neyi ifade eder?",
      options: [
        "Yalnızca sistemin toplam ısısını ifade eder",
        "Yalnızca sistemin toplam kütlesini ifade eder",
        "Enerjinin işe çevrilebilen bölümünü",
        "Yalnızca sistemin toplam hacmini ifade eder",
      ],
      correctAnswer: 2,
      explanation:
        "Exerji, belirli bir çevre hâline göre bir enerji akışından en çok ne kadar iş elde edilebileceğini verir.",
      category: "Termodinamik",
    },
    {
      id: 198,
      question: "Anerji neyi ifade eder?",
      options: [
        "Yalnızca sistemin kinetik enerjisini ifade eder",
        "Yalnızca sistemin konum enerjisini ifade eder",
        "Yalnızca sistemin basınç enerjisini ifade eder",
        "Enerjinin işe çevrilemeyen bölümünü",
      ],
      correctAnswer: 3,
      explanation:
        "Toplam enerji exerji ile anerjinin toplamıdır; anerji çevre sıcaklığında dengeye gelmiş, iş üretemeyen bölümdür.",
      category: "Termodinamik",
    },
    {
      id: 199,
      question: "Exerji analizinin enerji analizine üstünlüğü nedir?",
      options: [
        "Kaybın nerede oluştuğunu niteliğiyle gösterir",
        "Yalnızca daha kolay hesaplanabilmesidir",
        "Yalnızca daha az veri gerektirmesidir",
        "Yalnızca daha hızlı sonuç vermesidir",
      ],
      correctAnswer: 0,
      explanation:
        "Enerji analizi miktarı korur ama nitelik kaybını göstermez; exerji analizi hangi bileşende ne kadar iş potansiyeli yitirildiğini ortaya koyar.",
      category: "Termodinamik",
    },
    {
      id: 200,
      question: "Çevre sıcaklığındaki bir ısı kaynağının exerjisi nedir?",
      options: [
        "Yalnızca toplam enerjisine eşittir",
        "Sıfırdır, iş üretmek için kullanılamaz",
        "Yalnızca enerjinin yarısına eşittir",
        "Yalnızca enerjinin iki katına eşittir",
      ],
      correctAnswer: 1,
      explanation:
        "İş üretmek için sıcaklık farkı gerekir; çevre sıcaklığındaki ısı kaynağı ile çevre arasında fark olmadığından exerjisi sıfırdır.",
      category: "Termodinamik",
    },
    {
      id: 201,
      question: "Yüksek sıcaklıktaki egzoz gazının exerjisi nasıldır?",
      options: [
        "Yalnızca her koşulda sıfır kabul edilir",
        "Yalnızca soğuk sudan daha düşüktür",
        "Aynı enerjideki ılık sudan daha yüksektir",
        "Yalnızca enerjisiyle her zaman eşittir",
      ],
      correctAnswer: 2,
      explanation:
        "Exerji sıcaklık farkıyla büyür; aynı enerji miktarı yüksek sıcaklıkta çok daha fazla iş potansiyeli taşır. Atık ısı geri kazanımı bu yüzden egzoza yönelir.",
      category: "Termodinamik",
    },
    {
      id: 202,
      question: "Exerji yıkımı (destruction) neye eşittir?",
      options: [
        "Yalnızca toplam ısı girdisine eşittir",
        "Yalnızca toplam iş çıktısına eşittir",
        "Yalnızca toplam kütle debisine eşittir",
        "Çevre sıcaklığı ile entropi üretimi çarpımına",
      ],
      correctAnswer: 3,
      explanation:
        "Gouy-Stodola bağıntısı gereği yıkılan exerji, çevre mutlak sıcaklığı ile üretilen entropinin çarpımına eşittir.",
      category: "Termodinamik",
    },
    {
      id: 203,
      question: "İdeal gaz denklemi hangi biçimde yazılır?",
      options: [
        "Basınç çarpı hacim eşittir kütle çarpı R çarpı T",
        "Yalnızca basınç eşittir hacim bölü sıcaklık",
        "Yalnızca hacim eşittir kütle çarpı basınç",
        "Yalnızca sıcaklık eşittir basınç artı hacim",
      ],
      correctAnswer: 0,
      explanation:
        "PV = mRT bağıntısında sıcaklık mutlak ölçekte, R ise o gaza özgü gaz sabitidir.",
      category: "Termodinamik",
    },
    {
      id: 204,
      question: "İdeal gaz varsayımı hangi koşulda iyi çalışır?",
      options: [
        "Yalnızca çok yüksek basınçta iyi çalışır",
        "Düşük basınç ve yüksek sıcaklıkta",
        "Yalnızca yoğuşma noktası yakınında",
        "Yalnızca sıvı fazda iyi çalışmaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "Moleküller arası kuvvetler ve molekül hacmi ihmal edilebildiğinde varsayım geçerlidir; yoğuşmaya yakın hâllerde sapma büyür.",
      category: "Termodinamik",
    },
    {
      id: 205,
      question: "Gaz sabiti R neye bağlıdır?",
      options: [
        "Yalnızca gazın sıcaklığına bağlıdır",
        "Yalnızca gazın basıncına bağlıdır",
        "Gazın molekül ağırlığına bağlıdır",
        "Yalnızca gazın hacmine bağlıdır",
      ],
      correctAnswer: 2,
      explanation:
        "Özgül gaz sabiti, evrensel gaz sabitinin gazın molekül ağırlığına bölünmesiyle bulunur; hava için yaklaşık 287 J/kgK'dir.",
      category: "Termodinamik",
    },
    {
      id: 206,
      question: "Sabit kütlede basınç iki katına çıkarken sıcaklık sabitse hacim ne olur?",
      options: [
        "İki katına çıkmaktadır",
        "Değişmeden kalmaktadır",
        "Dört katına çıkmaktadır",
        "Yarıya inmiş olmaktadır",
      ],
      correctAnswer: 3,
      explanation:
        "Sabit sıcaklıkta basınç ile hacim ters orantılıdır; basınç iki katına çıkarsa hacim yarıya iner.",
      category: "Termodinamik",
    },
    {
      id: 207,
      question: "Gerçek gaz davranışı hangi denklemle daha iyi tanımlanır?",
      options: [
        "Van der Waals gibi düzeltmeli denklemlerle",
        "Yalnızca ideal gaz denklemiyle tanımlanır",
        "Yalnızca süreklilik denklemiyle tanımlanır",
        "Yalnızca Bernoulli denklemiyle tanımlanır",
      ],
      correctAnswer: 0,
      explanation:
        "Van der Waals ve benzeri denklemler molekül hacmi ile çekim kuvvetlerini düzeltme terimleriyle hesaba katar.",
      category: "Termodinamik",
    },
    {
      id: 208,
      question: "İzotermik süreçte hangi büyüklük sabit kalır?",
      options: [
        "Yalnızca basınç sabit kalmaktadır",
        "Sıcaklık sabit kalmaktadır",
        "Yalnızca hacim sabit kalmaktadır",
        "Yalnızca entropi sabit kalmaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "İzotermik süreçte sıcaklık değişmez; ideal gazda iç enerji de sabit kalır ve verilen ısının tamamı işe dönüşür.",
      category: "Termodinamik",
    },
    {
      id: 209,
      question: "İdeal gazda izotermik genleşmede iç enerji nasıl değişir?",
      options: [
        "Yalnızca belirgin biçimde artmaktadır",
        "Yalnızca belirgin biçimde azalmaktadır",
        "Değişmeden sabit kalmaktadır",
        "Yalnızca iki katına çıkmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "İdeal gazın iç enerjisi yalnızca sıcaklığa bağlıdır; sıcaklık değişmediğinden iç enerji de değişmez.",
      category: "Termodinamik",
    },
    {
      id: 210,
      question: "İzotermik süreçte P-V diyagramında eğri nasıldır?",
      options: [
        "Yalnızca yatay bir doğru biçimindedir",
        "Yalnızca düşey bir doğru biçimindedir",
        "Yalnızca eğik bir doğru biçimindedir",
        "Hiperbol biçiminde bir eğridir",
      ],
      correctAnswer: 3,
      explanation:
        "Basınç ile hacmin çarpımı sabit olduğundan eğri hiperbol biçimini alır; adyabatik eğri ise daha diktir.",
      category: "Termodinamik",
    },
    {
      id: 211,
      question: "İzotermik süreç gerçekte neden zor sağlanır?",
      options: [
        "Sıcaklığı sabit tutacak ısı geçişi çok yavaş olmalı",
        "Yalnızca basıncı ölçmek zor olduğu için",
        "Yalnızca hacmi ölçmek zor olduğu için",
        "Yalnızca kütleyi ölçmek zor olduğu için",
      ],
      correctAnswer: 0,
      explanation:
        "Sıcaklığın sabit kalması için üretilen veya çekilen ısının anında dengelenmesi gerekir; bu ancak çok yavaş süreçlerde yaklaşık sağlanır.",
      category: "Termodinamik",
    },
    {
      id: 212,
      question: "İzotermik sıkıştırma kompresörde neden istenir?",
      options: [
        "Yalnızca kompresörü ısıtmak istendiği için",
        "Harcanan işin en az olduğu süreç olduğu için",
        "Yalnızca debiyi artırmak istendiği için",
        "Yalnızca yağ tüketimini artırmak için",
      ],
      correctAnswer: 1,
      explanation:
        "Aynı basınç oranı için en az iş izotermik sıkıştırmada harcanır; çok kademeli sıkıştırma ve ara soğutma bu ideale yaklaşmayı amaçlar.",
      category: "Termodinamik",
    },
    {
      id: 213,
      question: "İzobarik süreçte hangi büyüklük sabit kalır?",
      options: [
        "Yalnızca sıcaklık sabit kalmaktadır",
        "Yalnızca hacim sabit kalmaktadır",
        "Basınç sabit kalmaktadır",
        "Yalnızca entropi sabit kalmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "İzobarik süreçte basınç değişmez; kazanda buhar üretimi ve eşanjörde ısıtma yaklaşık olarak bu süreçle modellenir.",
      category: "Termodinamik",
    },
    {
      id: 214,
      question: "İzobarik süreçte verilen ısı neye eşittir?",
      options: [
        "Yalnızca iç enerji değişimine eşittir",
        "Yalnızca yapılan işe eşittir",
        "Yalnızca entropi değişimine eşittir",
        "Entalpi değişimine eşit olmaktadır",
      ],
      correctAnswer: 3,
      explanation:
        "Sabit basınçta ısı, entalpi değişimine eşittir; bu yüzden Cp değeri doğrudan entalpi hesabında kullanılır.",
      category: "Termodinamik",
    },
    {
      id: 215,
      question: "İzobarik genleşmede yapılan iş nasıl bulunur?",
      options: [
        "Basınç ile hacim değişiminin çarpımıyla",
        "Yalnızca sıcaklık değişimiyle bulunur",
        "Yalnızca kütle değişimiyle bulunmaktadır",
        "Yalnızca entropi değişimiyle bulunur",
      ],
      correctAnswer: 0,
      explanation:
        "Sabit basınçta iş, basınç ile hacim değişiminin çarpımıdır ve P-V diyagramında dikdörtgen alanına karşılık gelir.",
      category: "Termodinamik",
    },
    {
      id: 216,
      question: "P-V diyagramında izobarik süreç nasıl görünür?",
      options: [
        "Yalnızca düşey bir doğru olarak görünür",
        "Yatay bir doğru olarak görünmektedir",
        "Yalnızca hiperbol olarak görünmektedir",
        "Yalnızca dik parabol olarak görünür",
      ],
      correctAnswer: 1,
      explanation:
        "Basınç sabit olduğundan çizgi yatay uzanır; altında kalan alan süreçte yapılan işi verir.",
      category: "Termodinamik",
    },
    {
      id: 217,
      question: "Gemide izobarik süreç hangi cihazda görülür?",
      options: [
        "Yalnızca kapalı bir tankın ısınmasında",
        "Yalnızca türbinin genleşmesinde",
        "Kazanda buhar üretimi sırasında",
        "Yalnızca kompresörün sıkıştırmasında",
      ],
      correctAnswer: 2,
      explanation:
        "Kazanda su sabit basınçta ısıtılıp buharlaştırılır; basınç düşürücü ve eşanjörler de yaklaşık sabit basınçta çalışır.",
      category: "Termodinamik",
    },
    {
      id: 218,
      question: "İzokorik süreçte hangi büyüklük sabit kalır?",
      options: [
        "Yalnızca basınç sabit kalmaktadır",
        "Yalnızca sıcaklık sabit kalmaktadır",
        "Yalnızca entalpi sabit kalmaktadır",
        "Hacim sabit kalmaktadır",
      ],
      correctAnswer: 3,
      explanation:
        "İzokorik süreçte hacim değişmez; kapalı bir tankın ısıtılması bu sürecin tipik örneğidir.",
      category: "Termodinamik",
    },
    {
      id: 219,
      question: "İzokorik süreçte yapılan iş ne kadardır?",
      options: [
        "Sıfırdır, hacim değişmediği için iş yoktur",
        "Yalnızca basınçla doğru orantılıdır",
        "Yalnızca sıcaklıkla doğru orantılıdır",
        "Yalnızca kütleyle doğru orantılıdır",
      ],
      correctAnswer: 0,
      explanation:
        "Genleşme işi hacim değişimine bağlıdır; hacim sabit kalınca sınır işi sıfır olur ve verilen ısının tamamı iç enerjiye gider.",
      category: "Termodinamik",
    },
    {
      id: 220,
      question: "İzokorik süreçte verilen ısı neye eşittir?",
      options: [
        "Yalnızca entalpi değişimine eşittir",
        "İç enerji değişimine eşit olmaktadır",
        "Yalnızca yapılan işe eşit olmaktadır",
        "Yalnızca entropi değişimine eşittir",
      ],
      correctAnswer: 1,
      explanation:
        "Sabit hacimde ısı doğrudan iç enerjiyi değiştirir; hesapta Cv değeri kullanılır.",
      category: "Termodinamik",
    },
    {
      id: 221,
      question: "Kapalı bir tank ısıtılırsa basınç nasıl değişir?",
      options: [
        "Yalnızca sabit kalmaya devam eder",
        "Yalnızca sürekli düşmeye başlamaktadır",
        "Sıcaklıkla birlikte yükselmektedir",
        "Yalnızca yarıya inmeye başlamaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "Sabit hacimde basınç mutlak sıcaklıkla doğru orantılıdır; bu yüzden kapalı kaplarda ısıtma emniyet valfi olmadan tehlikelidir.",
      category: "Termodinamik",
    },
    {
      id: 222,
      question: "P-V diyagramında izokorik süreç nasıl görünür?",
      options: [
        "Yalnızca yatay bir doğru olarak görünür",
        "Yalnızca hiperbol olarak görünmektedir",
        "Yalnızca eğik bir doğru olarak görünür",
        "Düşey bir doğru olarak görünmektedir",
      ],
      correctAnswer: 3,
      explanation:
        "Hacim sabit olduğundan çizgi düşey uzanır; altında alan kalmadığından süreçte iş üretilmez.",
      category: "Termodinamik",
    },
    {
      id: 223,
      question: "Adyabatik süreç nasıl tanımlanır?",
      options: [
        "Isı geçişi olmayan süreç olarak tanımlanır",
        "Yalnızca sıcaklığı sabit olan süreç olarak",
        "Yalnızca basıncı sabit olan süreç olarak",
        "Yalnızca hacmi sabit olan süreç olarak",
      ],
      correctAnswer: 0,
      explanation:
        "Adyabatik süreçte sistem ile çevre arasında ısı alışverişi olmaz; enerji değişimi yalnızca iş yoluyla gerçekleşir.",
      category: "Termodinamik",
    },
    {
      id: 224,
      question: "Adyabatik sıkıştırmada sıcaklık nasıl değişir?",
      options: [
        "Sabit kalmaktadır",
        "Yükselmektedir",
        "Belirgin düşmektedir",
        "Yarıya inmektedir",
      ],
      correctAnswer: 1,
      explanation:
        "Dışarı ısı verilmediğinden yapılan sıkıştırma işinin tamamı iç enerjiye gider ve sıcaklık yükselir; dizel motorun ateşleme ilkesi budur.",
      category: "Termodinamik",
    },
    {
      id: 225,
      question: "İzentropik süreçte hangi bağıntı geçerlidir?",
      options: [
        "Yalnızca basınç çarpı hacim sabit kalır",
        "Yalnızca sıcaklık çarpı hacim sabit kalır",
        "Basınç çarpı hacmin k üssü sabit kalır",
        "Yalnızca basınç bölü sıcaklık sabit kalır",
      ],
      correctAnswer: 2,
      explanation:
        "Tersinir adyabatik süreçte P·V^k değeri sabittir; k özgül ısı oranıdır ve hava için yaklaşık 1,4 alınır.",
      category: "Termodinamik",
    },
    {
      id: 226,
      question: "Adyabatik eğri izotermik eğriden neden diktir?",
      options: [
        "Yalnızca ölçek farkından dolayı diktir",
        "Yalnızca çizim hatasından dolayı diktir",
        "Yalnızca kütle farkından dolayı diktir",
        "Sıcaklık da değiştiği için basınç daha hızlı düşer",
      ],
      correctAnswer: 3,
      explanation:
        "Adyabatik genleşmede hem hacim büyür hem sıcaklık düşer; iki etki birlikte basıncı izotermik duruma göre daha hızlı düşürür.",
      category: "Termodinamik",
    },
    {
      id: 227,
      question: "Gerçek türbinde izentropik verim neyi karşılaştırır?",
      options: [
        "Gerçek iş ile izentropik işi karşılaştırır",
        "Yalnızca giriş ile çıkış basıncını karşılaştırır",
        "Yalnızca giriş ile çıkış debisini karşılaştırır",
        "Yalnızca giriş ile çıkış kütlesini karşılaştırır",
      ],
      correctAnswer: 0,
      explanation:
        "İzentropik verim, gerçekte elde edilen işin aynı basınç aralığındaki ideal izentropik işe oranıdır; tersinmezlikler bu oranı düşürür.",
      category: "Termodinamik",
    },
    {
      id: 228,
      question: "Politropik süreç hangi bağıntıyla tanımlanır?",
      options: [
        "Yalnızca basınç bölü hacim sabit bağıntısıyla",
        "Basınç çarpı hacmin n üssü sabit bağıntısıyla",
        "Yalnızca sıcaklık çarpı basınç sabit bağıntısıyla",
        "Yalnızca hacim bölü kütle sabit bağıntısıyla",
      ],
      correctAnswer: 1,
      explanation:
        "P·V^n = sabit bağıntısında n politropik üstür; gerçek sıkıştırma ve genleşme süreçleri bu genel biçimle tanımlanır.",
      category: "Termodinamik",
    },
    {
      id: 229,
      question: "Politropik üs n = 1 olduğunda süreç hangisidir?",
      options: [
        "Yalnızca izokorik süreç olmaktadır",
        "Yalnızca izobarik süreç olmaktadır",
        "İzotermik süreç olmaktadır",
        "Yalnızca izentropik süreç olmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "n = 1 için P·V sabit olur ve ideal gazda bu izotermik süreci verir.",
      category: "Termodinamik",
    },
    {
      id: 230,
      question: "Politropik üs n = 0 olduğunda süreç hangisidir?",
      options: [
        "Yalnızca izokorik süreç olmaktadır",
        "Yalnızca izentropik süreç olmaktadır",
        "Yalnızca izotermik süreç olmaktadır",
        "İzobarik süreç olmaktadır",
      ],
      correctAnswer: 3,
      explanation:
        "n = 0 için basınç sabit kalır; bu da izobarik süreçtir. n sonsuza giderken süreç izokorik olur.",
      category: "Termodinamik",
    },
    {
      id: 231,
      question: "Gerçek kompresörde politropik üs hangi aralıkta olur?",
      options: [
        "Bir ile özgül ısı oranı arasında olur",
        "Yalnızca sıfırın altında olmaktadır",
        "Yalnızca daima sıfıra eşit olmaktadır",
        "Yalnızca daima ondan büyük olmaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "Bir miktar soğutma yapılan gerçek sıkıştırmada üs izotermik ile izentropik değerler arasında kalır; soğutma arttıkça bire yaklaşır.",
      category: "Termodinamik",
    },
    {
      id: 232,
      question: "Politropik üs neden ölçümle belirlenir?",
      options: [
        "Yalnızca hesabı kolaylaştırmak amacıyla",
        "Gerçek ısı geçişi ve sürtünmeyi yansıttığı için",
        "Yalnızca ölçüm cihazı gerektiği için",
        "Yalnızca standartlar zorunlu kıldığı için",
      ],
      correctAnswer: 1,
      explanation:
        "Gerçek süreçte ısı geçişi ve sürtünme birlikte etkilidir; üs, ölçülen basınç ve hacim değerlerinden geriye doğru hesaplanır.",
      category: "Termodinamik",
    },
    {
      id: 233,
      question: "Carnot çevriminin verimi neye bağlıdır?",
      options: [
        "Yalnızca kullanılan akışkanın cinsine",
        "Yalnızca çevrimin hızına bağlıdır",
        "Sıcak ve soğuk kaynak mutlak sıcaklıklarına",
        "Yalnızca makinenin boyutuna bağlıdır",
      ],
      correctAnswer: 2,
      explanation:
        "Carnot verimi 1 − Tsoğuk/Tsıcak bağıntısıyla bulunur; akışkanın türü ve makine büyüklüğü sonucu değiştirmez.",
      category: "Termodinamik",
    },
    {
      id: 234,
      question: "Carnot çevrimi hangi dört süreçten oluşur?",
      options: [
        "Yalnızca dört adet izobarik süreçten",
        "Yalnızca dört adet izokorik süreçten",
        "Yalnızca dört adet adyabatik süreçten",
        "İki izotermik ve iki izentropik süreçten",
      ],
      correctAnswer: 3,
      explanation:
        "Çevrimde sıcak kaynaktan izotermik ısı alma, izentropik genleşme, soğuk kaynağa izotermik ısı atma ve izentropik sıkıştırma yer alır.",
      category: "Termodinamik",
    },
    {
      id: 235,
      question: "Carnot verimi neden gerçekte elde edilemez?",
      options: [
        "Tersinir süreçler gerçekte sağlanamadığı için",
        "Yalnızca ölçüm cihazları yetersiz olduğu için",
        "Yalnızca yakıt pahalı olduğu için elde edilemez",
        "Yalnızca makineler küçük olduğu için",
      ],
      correctAnswer: 0,
      explanation:
        "Sürtünme ve sonlu sıcaklık farkıyla ısı geçişi kaçınılmazdır; bu tersinmezlikler gerçek verimi Carnot sınırının altında tutar.",
      category: "Termodinamik",
    },
    {
      id: 236,
      question: "Otto çevriminde ısı girişi nasıl gerçekleşir?",
      options: [
        "Yalnızca sabit basınçta gerçekleşmektedir",
        "Sabit hacimde gerçekleşmektedir",
        "Yalnızca sabit sıcaklıkta gerçekleşmektedir",
        "Yalnızca sabit entropide gerçekleşmektedir",
      ],
      correctAnswer: 1,
      explanation:
        "İdeal Otto çevriminde yanma çok hızlı kabul edilir ve piston hareket etmeden, yani sabit hacimde gerçekleşir.",
      category: "Termodinamik",
    },
    {
      id: 237,
      question: "Otto çevriminin verimi neye bağlıdır?",
      options: [
        "Yalnızca motorun devir sayısına bağlıdır",
        "Yalnızca motorun silindir sayısına bağlıdır",
        "Sıkıştırma oranı ve özgül ısı oranına",
        "Yalnızca yakıtın fiyatına bağlı kalmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "Verim yalnızca sıkıştırma oranı ile özgül ısı oranına bağlıdır; sıkıştırma oranı büyüdükçe kuramsal verim yükselir.",
      category: "Termodinamik",
    },
    {
      id: 238,
      question: "Benzinli motorda sıkıştırma oranı neden sınırlıdır?",
      options: [
        "Yalnızca motor ağırlığı sınırladığı için",
        "Yalnızca yakıt fiyatı sınırladığı için",
        "Yalnızca üretim maliyeti sınırladığı için",
        "Kendiliğinden tutuşma (vuruntu) riski nedeniyle",
      ],
      correctAnswer: 3,
      explanation:
        "Yüksek sıkıştırmada hava-yakıt karışımı buji ateşlemeden önce kendiliğinden tutuşur; oktan sayısı bu sınırı belirler.",
      category: "Termodinamik",
    },
    {
      id: 239,
      question: "Diesel çevriminde ısı girişi nasıl kabul edilir?",
      options: [
        "Sabit basınçta gerçekleştiği kabul edilir",
        "Yalnızca sabit hacimde kabul edilmektedir",
        "Yalnızca sabit sıcaklıkta kabul edilmektedir",
        "Yalnızca sabit entropide kabul edilmektedir",
      ],
      correctAnswer: 0,
      explanation:
        "Yakıt piston aşağı inerken kademeli püskürtüldüğünden yanma sabit basınçta kabul edilir; kesme oranı bu sürecin uzunluğunu belirler.",
      category: "Termodinamik",
    },
    {
      id: 240,
      question: "Diesel çevriminde kesme oranı (cut-off ratio) neyi gösterir?",
      options: [
        "Yalnızca sıkıştırma oranının kendisini",
        "Yanma boyunca hacmin büyüme oranını",
        "Yalnızca egzoz basıncının oranını",
        "Yalnızca soğutma suyu debisi oranını",
      ],
      correctAnswer: 1,
      explanation:
        "Kesme oranı, sabit basınçta yanma süresince hacmin kaç kat büyüdüğünü verir; büyüdükçe kuramsal verim bir miktar düşer.",
      category: "Termodinamik",
    },
    {
      id: 241,
      question: "Sabathe (ikili) çevrim neyi birleştirir?",
      options: [
        "Yalnızca iki adet izotermik süreci birleştirir",
        "Yalnızca iki adet adyabatik süreci birleştirir",
        "Sabit hacim ve sabit basınçta ısı girişini",
        "Yalnızca iki adet izokorik süreci birleştirir",
      ],
      correctAnswer: 2,
      explanation:
        "Gerçek dizel motorda yanmanın bir bölümü hemen hemen sabit hacimde, kalanı sabit basınçta olur; Sabathe çevrimi bu ikisini birleştirir.",
      category: "Termodinamik",
    },
    {
      id: 242,
      question: "Sabathe çevrimi gerçek motora neden daha yakındır?",
      options: [
        "Yalnızca daha kolay hesaplandığı için yakındır",
        "Yalnızca daha az parametre içerdiği için",
        "Yalnızca daha eski bir model olduğu için",
        "Yanmanın iki aşamalı seyrini yansıttığı için",
      ],
      correctAnswer: 3,
      explanation:
        "Tutuşma gecikmesi sonrası ani yanma sabit hacme, kalan kontrollü yanma sabit basınca karşılık gelir; karma çevrim bu davranışı yakalar.",
      category: "Termodinamik",
    },
    {
      id: 243,
      question: "Sabathe çevriminde basınç oranı terimi neyi gösterir?",
      options: [
        "Sabit hacimli yanmadaki basınç artışını",
        "Yalnızca egzoz basıncının artışını gösterir",
        "Yalnızca emme basıncının artışını gösterir",
        "Yalnızca soğutma basıncının artışını gösterir",
      ],
      correctAnswer: 0,
      explanation:
        "Basınç oranı, sabit hacimde gerçekleşen yanma bölümünde basıncın kaç kat yükseldiğini verir ve verim bağıntısına doğrudan girer.",
      category: "Termodinamik",
    },
    {
      id: 244,
      question: "Sabathe çevrimi hangi iki çevrimin sınır durumudur?",
      options: [
        "Yalnızca Carnot ve Rankine çevrimlerinin",
        "Otto ve Diesel çevrimlerinin sınır durumudur",
        "Yalnızca Brayton ve Rankine çevrimlerinin",
        "Yalnızca Carnot ve Brayton çevrimlerinin",
      ],
      correctAnswer: 1,
      explanation:
        "Kesme oranı bire indiğinde çevrim Otto'ya, basınç oranı bire indiğinde Diesel'e dönüşür; Sabathe ikisini kapsayan genel biçimdir.",
      category: "Termodinamik",
    },
    {
      id: 245,
      question: "Sabathe çevriminin verimi neye bağlıdır?",
      options: [
        "Yalnızca motorun devir sayısına bağlıdır",
        "Yalnızca yakıtın kükürt oranına bağlıdır",
        "Sıkıştırma, basınç ve kesme oranlarına",
        "Yalnızca soğutma suyu sıcaklığına bağlıdır",
      ],
      correctAnswer: 2,
      explanation:
        "Verim bağıntısı sıkıştırma oranı, sabit hacimli yanma basınç oranı ve sabit basınçlı yanma kesme oranını birlikte içerir.",
      category: "Termodinamik",
    },
    {
      id: 246,
      question: "Brayton çevrimi hangi dört süreçten oluşur?",
      options: [
        "Yalnızca dört adet izotermik süreçten oluşur",
        "Yalnızca dört adet izokorik süreçten oluşur",
        "Yalnızca dört adet izentropik süreçten oluşur",
        "İki izentropik ve iki izobarik süreçten",
      ],
      correctAnswer: 3,
      explanation:
        "Gaz türbini çevriminde izentropik sıkıştırma, sabit basınçta ısı girişi, izentropik genleşme ve sabit basınçta ısı atma birbirini izler.",
      category: "Termodinamik",
    },
    {
      id: 247,
      question: "Brayton çevriminin verimi neye bağlıdır?",
      options: [
        "Kompresör basınç oranına bağlıdır",
        "Yalnızca türbin ağırlığına bağlı kalmaktadır",
        "Yalnızca yakıt fiyatına bağlı kalmaktadır",
        "Yalnızca çevrim süresine bağlı kalmaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "İdeal Brayton veriminde belirleyici değişken basınç oranıdır; oran büyüdükçe verim yükselir ama malzeme sıcaklık sınırı bunu kısıtlar.",
      category: "Termodinamik",
    },
    {
      id: 248,
      question: "Gaz türbininde rejeneratör ne sağlar?",
      options: [
        "Yalnızca türbin devrini yükseltmektedir",
        "Egzoz ısısıyla sıkıştırılan havayı ön ısıtır",
        "Yalnızca kompresör basıncını düşürmektedir",
        "Yalnızca yakıt pompasını soğutmaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "Türbin çıkışındaki sıcak gaz, yanma odasına giden havayı ısıtır; böylece aynı sıcaklığa çıkmak için daha az yakıt gerekir ve verim artar.",
      category: "Termodinamik",
    },
    {
      id: 249,
      question: "Gaz türbininin dizel motora göre üstünlüğü nedir?",
      options: [
        "Yalnızca daha yüksek termik verim vermesi",
        "Yalnızca daha ucuz yakıt kullanabilmesi",
        "Güç yoğunluğunun çok yüksek olması",
        "Yalnızca daha az bakım gerektirmesi",
      ],
      correctAnswer: 2,
      explanation:
        "Aynı ağırlıkta çok daha yüksek güç verir ve hızlı yük alır; buna karşılık kısmi yükte verimi düşüktür ve damıtık yakıt ister.",
      category: "Termodinamik",
    },
    {
      id: 250,
      question: "Kombine çevrim (COGAS) neyi birleştirir?",
      options: [
        "Yalnızca iki adet gaz türbinini birleştirir",
        "Yalnızca iki adet dizel motoru birleştirir",
        "Yalnızca iki adet buhar kazanını birleştirir",
        "Gaz türbini ile buhar çevrimini birleştirir",
      ],
      correctAnswer: 3,
      explanation:
        "Gaz türbini egzozunun ısısı atık ısı kazanında buhar üretir; buhar türbini ek güç sağlar ve toplam verim belirgin yükselir.",
      category: "Termodinamik",
    },
    {
      id: 251,
      question: "Ters çevrimde performans katsayısı (COP) neyi verir?",
      options: [
        "Sağlanan etkinin harcanan işe oranını",
        "Yalnızca harcanan işin sağlanan etkiye oranı",
        "Yalnızca giriş ile çıkış basıncının oranını",
        "Yalnızca giriş ile çıkış debisinin oranını",
      ],
      correctAnswer: 0,
      explanation:
        "Soğutmada çekilen ısının, ısı pompasında verilen ısının kompresör işine oranıdır; birden büyük olması ikinci yasaya aykırı değildir.",
      category: "Termodinamik",
    },
    {
      id: 252,
      question: "Fourier iletim yasası neyi verir?",
      options: [
        "Yalnızca taşınımla geçen ısıyı vermektedir",
        "İletimle geçen ısıyı sıcaklık gradyanından",
        "Yalnızca ışınımla geçen ısıyı vermektedir",
        "Yalnızca yoğuşmayla geçen ısıyı vermektedir",
      ],
      correctAnswer: 1,
      explanation:
        "İletimle geçen ısı, iletim katsayısı, kesit alanı ve sıcaklık gradyanının çarpımıyla bulunur; ısı daima düşen sıcaklık yönünde akar.",
      category: "Termodinamik",
    },
    {
      id: 253,
      question: "Isı iletim katsayısı (k) neyi gösterir?",
      options: [
        "Yalnızca malzemenin yoğunluğunu gösterir",
        "Yalnızca malzemenin ağırlığını gösterir",
        "Malzemenin ısıyı iletme yeteneğini",
        "Yalnızca malzemenin rengini göstermektedir",
      ],
      correctAnswer: 2,
      explanation:
        "Yüksek k değeri iyi iletken demektir; bakır ve alüminyum yüksek, yalıtım malzemeleri ise çok düşük k değerine sahiptir.",
      category: "Termodinamik",
    },
    {
      id: 254,
      question: "Düz bir duvarda iletim direnci nasıl bulunur?",
      options: [
        "Yalnızca alanın kalınlığa bölümüyle bulunur",
        "Yalnızca kalınlığın alana çarpımıyla bulunur",
        "Yalnızca iletim katsayısının karesiyle",
        "Kalınlığın iletim katsayısı ile alana bölümüyle",
      ],
      correctAnswer: 3,
      explanation:
        "İletim direnci L/(k·A) biçimindedir; kalınlık arttıkça direnç büyür, iletkenlik ve alan arttıkça küçülür.",
      category: "Termodinamik",
    },
    {
      id: 255,
      question: "Isı akısı (heat flux) neyi ifade eder?",
      options: [
        "Birim alandan geçen ısı gücünü ifade eder",
        "Yalnızca toplam ısı miktarını ifade eder",
        "Yalnızca toplam sıcaklık farkını ifade eder",
        "Yalnızca toplam kütle debisini ifade eder",
      ],
      correctAnswer: 0,
      explanation:
        "Isı akısı, birim yüzeyden birim zamanda geçen ısıyı verir ve W/m² biriminde ifade edilir.",
      category: "Termodinamik",
    },
    {
      id: 256,
      question: "İletimde sıcaklık dağılımı düz duvarda nasıldır?",
      options: [
        "Yalnızca parabolik biçimde değişmektedir",
        "Kararlı hâlde doğrusal olarak değişir",
        "Yalnızca üstel biçimde değişmektedir",
        "Yalnızca sabit kalmaya devam etmektedir",
      ],
      correctAnswer: 1,
      explanation:
        "İç ısı üretimi yoksa ve iletkenlik sabitse kararlı hâlde sıcaklık kalınlık boyunca doğrusal düşer.",
      category: "Termodinamik",
    },
    {
      id: 257,
      question: "Çok katmanlı duvarda toplam direnç nasıl bulunur?",
      options: [
        "Yalnızca en büyük direnç seçilerek bulunur",
        "Yalnızca dirençlerin çarpımıyla bulunur",
        "Katman dirençlerinin toplanmasıyla bulunur",
        "Yalnızca dirençlerin ortalamasıyla bulunur",
      ],
      correctAnswer: 2,
      explanation:
        "Katmanlar seri bağlı dirençler gibi davranır; toplam direnç tek tek dirençlerin toplamıdır ve ısı akısı her katmanda aynıdır.",
      category: "Termodinamik",
    },
    {
      id: 258,
      question: "Çok katmanlı duvarda en büyük sıcaklık düşüşü nerede olur?",
      options: [
        "Yalnızca en ince katmanda oluşmaktadır",
        "Yalnızca en kalın katmanda oluşmaktadır",
        "Yalnızca en dıştaki katmanda oluşmaktadır",
        "Direnci en yüksek olan katmanda oluşur",
      ],
      correctAnswer: 3,
      explanation:
        "Aynı ısı akısı altında sıcaklık düşüşü dirençle orantılıdır; yalıtım katmanı en büyük direnci taşıdığı için düşüşün çoğu orada olur.",
      category: "Termodinamik",
    },
    {
      id: 259,
      question: "Silindirik boru duvarında iletim direnci neye bağlıdır?",
      options: [
        "Dış ile iç yarıçapın logaritmik oranına",
        "Yalnızca borunun uzunluğuna bağlıdır",
        "Yalnızca borunun ağırlığına bağlıdır",
        "Yalnızca borunun rengine bağlı kalmaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "Silindirik geometride alan yarıçapla büyüdüğünden direnç logaritmik bir ifadeye dönüşür; düz duvar bağıntısı doğrudan kullanılamaz.",
      category: "Termodinamik",
    },
    {
      id: 260,
      question: "Newton soğuma yasası neyi tanımlar?",
      options: [
        "Yalnızca iletimle geçen ısıyı tanımlar",
        "Taşınımla geçen ısıyı sıcaklık farkından",
        "Yalnızca ışınımla geçen ısıyı tanımlar",
        "Yalnızca donmayla geçen ısıyı tanımlar",
      ],
      correctAnswer: 1,
      explanation:
        "Taşınımla geçen ısı; taşınım katsayısı, yüzey alanı ve yüzey ile akışkan arasındaki sıcaklık farkının çarpımına eşittir.",
      category: "Termodinamik",
    },
    {
      id: 261,
      question: "Taşınım katsayısı (h) neye bağlıdır?",
      options: [
        "Yalnızca yüzeyin rengine bağlı kalmaktadır",
        "Yalnızca yüzeyin ağırlığına bağlı kalmakta",
        "Akışkan cinsi, hız ve akış rejimine",
        "Yalnızca yüzeyin kalınlığına bağlı kalmakta",
      ],
      correctAnswer: 2,
      explanation:
        "Taşınım katsayısı malzeme özelliği değildir; akışkanın türü, hızı, akış rejimi ve yüzey geometrisiyle birlikte değişir.",
      category: "Termodinamik",
    },
    {
      id: 262,
      question: "Taşınım direnci nasıl ifade edilir?",
      options: [
        "Yalnızca alan ile katsayının çarpımı olarak",
        "Yalnızca katsayının karesi olarak ifade edilir",
        "Yalnızca alanın karesi olarak ifade edilir",
        "Bir bölü taşınım katsayısı çarpı alan olarak",
      ],
      correctAnswer: 3,
      explanation:
        "Taşınım direnci 1/(h·A) biçimindedir; katsayı veya alan büyüdükçe direnç küçülür ve ısı geçişi kolaylaşır.",
      category: "Termodinamik",
    },
    {
      id: 263,
      question: "Kaynama sırasında taşınım katsayısı nasıl davranır?",
      options: [
        "Tek fazlı akışa göre çok yüksek olur",
        "Yalnızca tek fazlı akışa göre çok düşük olur",
        "Yalnızca tek fazlı akışla aynı kalmaktadır",
        "Yalnızca tümüyle sıfıra inmektedir",
      ],
      correctAnswer: 0,
      explanation:
        "Faz değişiminde kabarcık oluşumu ve karışım ısı geçişini büyük ölçüde artırır; bu yüzden evaporatör ve kondenser kompakt tasarlanabilir.",
      category: "Termodinamik",
    },
    {
      id: 264,
      question: "Kanatçık (fin) kullanmanın amacı nedir?",
      options: [
        "Yalnızca yüzeyi süslemek amacı taşımaktadır",
        "Isı geçiş yüzey alanını büyütmektir",
        "Yalnızca yüzeyi soğutmak amacı taşımaktadır",
        "Yalnızca yüzeyi ağırlaştırmak amacındadır",
      ],
      correctAnswer: 1,
      explanation:
        "Taşınım katsayısı düşük olan tarafa kanatçık eklenerek alan büyütülür; hava soğutmalı eşanjörlerde bu yöntem yaygındır.",
      category: "Termodinamik",
    },
    {
      id: 265,
      question: "Doğal taşınımda akış neyle oluşur?",
      options: [
        "Yalnızca pompanın bastığı basınçla oluşur",
        "Yalnızca fanın ürettiği debiyle oluşur",
        "Yoğunluk farkının yarattığı kaldırma ile",
        "Yalnızca dışarıdan verilen işle oluşmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "Isınan akışkanın yoğunluğu düşer ve yükselir; soğuk akışkan yerini alır. Bu kendiliğinden dolaşım doğal taşınımı oluşturur.",
      category: "Termodinamik",
    },
    {
      id: 266,
      question: "Zorlanmış taşınım doğal taşınımdan hangi yönüyle ayrılır?",
      options: [
        "Yalnızca daha düşük katsayı vermesiyle",
        "Yalnızca yalnızca gazlarda görülmesiyle",
        "Yalnızca yalnızca sıvılarda görülmesiyle",
        "Akışın pompa veya fanla sağlanmasıyla",
      ],
      correctAnswer: 3,
      explanation:
        "Zorlanmış taşınımda akış dışarıdan sağlanır; hız yükseldiği için taşınım katsayısı doğal taşınıma göre çok daha büyüktür.",
      category: "Termodinamik",
    },
    {
      id: 267,
      question: "Zorlanmış taşınımda hız artışı ısı geçişini nasıl etkiler?",
      options: [
        "Artırır, ancak basınç kaybı da büyür",
        "Yalnızca azaltır ve basınç kaybı düşer",
        "Yalnızca hiç etkilemeden aynı bırakır",
        "Yalnızca ısı geçişini tümüyle durdurur",
      ],
      correctAnswer: 0,
      explanation:
        "Hız arttıkça sınır tabakası incelir ve taşınım katsayısı yükselir; buna karşılık pompa gücü ve sürtünme kaybı hızın karesiyle artar.",
      category: "Termodinamik",
    },
    {
      id: 268,
      question: "Sınır tabakasının ısı geçişindeki rolü nedir?",
      options: [
        "Yalnızca ısı geçişini tümüyle engellemektir",
        "Ana direnci oluşturan ince akışkan katmanıdır",
        "Yalnızca ısı geçişini iki katına çıkarmaktır",
        "Yalnızca akışın yönünü belirlemek rolüdür",
      ],
      correctAnswer: 1,
      explanation:
        "Yüzeye yapışan ince akışkan katmanı içinde ısı iletimle geçer; taşınım direncinin büyük bölümü bu tabakadan kaynaklanır.",
      category: "Termodinamik",
    },
    {
      id: 269,
      question: "Türbülanslı akış ısı geçişini neden artırır?",
      options: [
        "Yalnızca sıcaklığı doğrudan yükselttiği için",
        "Yalnızca basıncı doğrudan yükselttiği için",
        "Karışım sınır tabakasını inceltip yeniledği için",
        "Yalnızca debiyi doğrudan azalttığı için",
      ],
      correctAnswer: 2,
      explanation:
        "Türbülans akışkanı sürekli karıştırır ve sıcak ile soğuk kütleleri yer değiştirir; sınır tabakası incelir ve taşınım katsayısı büyür.",
      category: "Termodinamik",
    },
    {
      id: 270,
      question: "Stefan-Boltzmann yasası neyi verir?",
      options: [
        "Yalnızca iletimle geçen ısıyı vermektedir",
        "Yalnızca taşınımla geçen ısıyı vermektedir",
        "Yalnızca yoğuşmayla geçen ısıyı vermektedir",
        "Işınımla yayılan gücü sıcaklığın dördüncü kuvvetiyle",
      ],
      correctAnswer: 3,
      explanation:
        "Yayılan ışınım gücü, yayıcılık, Stefan-Boltzmann sabiti, alan ve mutlak sıcaklığın dördüncü kuvvetinin çarpımıyla bulunur.",
      category: "Termodinamik",
    },
    {
      id: 271,
      question: "Yayıcılık (emissivity) neyi ifade eder?",
      options: [
        "Yüzeyin siyah cisme göre ışıma oranını",
        "Yalnızca yüzeyin kalınlık değerini ifade eder",
        "Yalnızca yüzeyin ağırlık değerini ifade eder",
        "Yalnızca yüzeyin sertlik değerini ifade eder",
      ],
      correctAnswer: 0,
      explanation:
        "Yayıcılık sıfır ile bir arasında bir orandır; ideal siyah cisimde bir, parlak metal yüzeylerde ise çok düşüktür.",
      category: "Termodinamik",
    },
    {
      id: 272,
      question: "Işınımla ısı geçişi hangi ortamı gerektirir?",
      options: [
        "Yalnızca sıvı bir ortam gerektirmektedir",
        "Hiçbir ortam gerektirmez, boşlukta da olur",
        "Yalnızca katı bir ortam gerektirmektedir",
        "Yalnızca gaz bir ortam gerektirmektedir",
      ],
      correctAnswer: 1,
      explanation:
        "Elektromanyetik dalgalarla taşındığından ışınım boşlukta da gerçekleşir; güneş enerjisi dünyaya bu yolla ulaşır.",
      category: "Termodinamik",
    },
    {
      id: 273,
      question: "Işınımın toplam ısı geçişindeki payı ne zaman büyür?",
      options: [
        "Yalnızca yüzey soğuk olduğunda büyümektedir",
        "Yalnızca akış hızı arttığında büyümektedir",
        "Yüzey sıcaklığı çok yükseldiğinde büyür",
        "Yalnızca yüzey alanı küçüldüğünde büyümektedir",
      ],
      correctAnswer: 2,
      explanation:
        "Işınım sıcaklığın dördüncü kuvvetiyle arttığından yüksek sıcaklıkta baskın hâle gelir; kazan ve incinerator hesaplarında ihmal edilemez.",
      category: "Termodinamik",
    },
    {
      id: 274,
      question: "Parlak alüminyum folyo yalıtımda neden kullanılır?",
      options: [
        "Yalnızca iletimi tümüyle durdurduğu için",
        "Yalnızca taşınımı tümüyle durdurduğu için",
        "Yalnızca ucuz bir malzeme olduğu için",
        "Düşük yayıcılığı ışınımı azalttığı için",
      ],
      correctAnswer: 3,
      explanation:
        "Parlak yüzeyin yayıcılığı çok düşüktür; ışınımla ısı kaybını belirgin azaltır ve boru ile kazan yalıtımında dış kaplama olarak kullanılır.",
      category: "Termodinamik",
    },
    {
      id: 275,
      question: "Toplam ısı geçiş katsayısı (U) neyi birleştirir?",
      options: [
        "İletim ve iki taraftaki taşınım dirençlerini",
        "Yalnızca iki adet iletim direncini birleştirir",
        "Yalnızca iki adet ışınım direncini birleştirir",
        "Yalnızca iki adet kütle direncini birleştirir",
      ],
      correctAnswer: 0,
      explanation:
        "U değeri, sıcak taraf taşınımı, duvar iletimi, kirlilik dirençleri ve soğuk taraf taşınımının seri toplamının tersidir.",
      category: "Termodinamik",
    },
    {
      id: 276,
      question: "U değerini artırmanın en etkili yolu hangisidir?",
      options: [
        "Yalnızca duvar kalınlığını artırmaktır",
        "En büyük direnci olan tarafı iyileştirmek",
        "Yalnızca eşanjörü boyamaktan geçmektedir",
        "Yalnızca sıcaklık farkını düşürmektir",
      ],
      correctAnswer: 1,
      explanation:
        "Seri dirençlerde toplamı en büyük direnç belirler; hangi taraf baskınsa oradaki hız veya alanı artırmak en çok kazanç sağlar.",
      category: "Termodinamik",
    },
    {
      id: 277,
      question: "Toplam ısı geçişi denklemi hangi biçimdedir?",
      options: [
        "Yalnızca U bölü A çarpı sıcaklık farkıdır",
        "Yalnızca U artı A artı sıcaklık farkıdır",
        "U çarpı A çarpı ortalama sıcaklık farkıdır",
        "Yalnızca U çarpı sıcaklık farkının karesidir",
      ],
      correctAnswer: 2,
      explanation:
        "Isı gücü, toplam katsayı, yüzey alanı ve uygun ortalama sıcaklık farkının çarpımına eşittir; eşanjör boyutlandırması bu denkleme dayanır.",
      category: "Termodinamik",
    },
    {
      id: 278,
      question: "U değeri hangi yüzeye göre tanımlanmalıdır?",
      options: [
        "Yalnızca her zaman iç yüzeye göre tanımlanır",
        "Yalnızca her zaman dış yüzeye göre tanımlanır",
        "Yalnızca yüzeyden bağımsız olarak tanımlanır",
        "Hesapta hangi alan alındıysa ona göre",
      ],
      correctAnswer: 3,
      explanation:
        "Silindirik geometride iç ve dış alan farklıdır; U değeri hangi alana göre tanımlandıysa hesapta aynı alan kullanılmalıdır.",
      category: "Termodinamik",
    },
    {
      id: 279,
      question: "Kirlilik direnci U değerini nasıl etkiler?",
      options: [
        "Toplam direnci büyütüp U değerini düşürür",
        "Yalnızca U değerini belirgin yükseltmektedir",
        "Yalnızca U değerini hiç etkilememektedir",
        "Yalnızca U değerini iki katına çıkarmaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "Yüzeyde biriken kireç, biyofilm veya kurum ek bir direnç katmanı yaratır; tasarımda buna karşılık bir kirlilik payı bırakılır.",
      category: "Termodinamik",
    },
    {
      id: 280,
      question: "Paralel akışlı eşanjörde akışkanlar nasıl ilerler?",
      options: [
        "Yalnızca birbirine dik yönde ilerlemektedir",
        "İkisi de aynı yönde ilerlemektedir",
        "Yalnızca zıt yönlerde ilerlemektedir",
        "Yalnızca dairesel yönde ilerlemektedir",
      ],
      correctAnswer: 1,
      explanation:
        "Paralel akışta iki akışkan aynı uçtan girer ve aynı yönde ilerler; sıcaklık farkı girişte en büyük, çıkışta en küçüktür.",
      category: "Termodinamik",
    },
    {
      id: 281,
      question: "Ters akışlı eşanjörün paralel akışa üstünlüğü nedir?",
      options: [
        "Yalnızca daha kolay imal edilebilmesidir",
        "Yalnızca daha ucuz olması durumudur",
        "Daha büyük ortalama sıcaklık farkı vermesi",
        "Yalnızca daha az yer kaplaması durumudur",
      ],
      correctAnswer: 2,
      explanation:
        "Ters akışta sıcaklık farkı boyunca daha düzgün kalır; aynı yüzeyle daha çok ısı geçer ve soğuk akışkan çıkışı daha yükseğe çıkabilir.",
      category: "Termodinamik",
    },
    {
      id: 282,
      question: "Ters akışlı eşanjörde soğuk akışkan çıkışı ne olabilir?",
      options: [
        "Yalnızca sıcak akışkan çıkışına eşit kalır",
        "Yalnızca sıcak akışkan girişini aşabilir",
        "Yalnızca hiçbir zaman ısınamamaktadır",
        "Sıcak akışkan çıkışından daha sıcak olabilir",
      ],
      correctAnswer: 3,
      explanation:
        "Ters akışta soğuk akışkan, sıcak akışkanın çıkış sıcaklığının üstüne çıkabilir; paralel akışta bu kuramsal olarak olanaksızdır.",
      category: "Termodinamik",
    },
    {
      id: 283,
      question: "Çapraz akışlı eşanjör nerede yaygın kullanılır?",
      options: [
        "Hava soğutmalı radyatör ve soğutucularda",
        "Yalnızca buhar kazanlarının içerisinde",
        "Yalnızca yakıt tanklarının içerisinde",
        "Yalnızca balast tanklarının içerisinde",
      ],
      correctAnswer: 0,
      explanation:
        "Bir akışkan boru içinde, diğeri boruların dışında dik yönde akar; şarj havası soğutucusu ve radyatörler bu düzendedir.",
      category: "Termodinamik",
    },
    {
      id: 284,
      question: "LMTD (logaritmik ortalama sıcaklık farkı) neden kullanılır?",
      options: [
        "Yalnızca hesabı zorlaştırmak amacıyla kullanılır",
        "Fark boyunca değiştiği için doğru ortalama verir",
        "Yalnızca standartlar zorunlu kıldığı için",
        "Yalnızca basıncı hesaplamak için kullanılır",
      ],
      correctAnswer: 1,
      explanation:
        "Sıcaklık farkı eşanjör boyunca üstel biçimde değişir; aritmetik ortalama hata verir, logaritmik ortalama doğru sonucu sağlar.",
      category: "Termodinamik",
    },
    {
      id: 285,
      question: "LMTD hesabında hangi iki değer kullanılır?",
      options: [
        "Yalnızca iki akışkanın debileri kullanılır",
        "Yalnızca iki akışkanın basınçları kullanılır",
        "İki uçtaki sıcaklık farkları kullanılır",
        "Yalnızca iki akışkanın yoğunlukları kullanılır",
      ],
      correctAnswer: 2,
      explanation:
        "Eşanjörün iki ucundaki sıcaklık farkları alınır; farkların oranının logaritması bölene, farkı ise bölünene girer.",
      category: "Termodinamik",
    },
    {
      id: 286,
      question: "İki uçtaki sıcaklık farkı eşitse LMTD ne olur?",
      options: [
        "Yalnızca sıfıra eşit olmaktadır",
        "Yalnızca sonsuza gitmektedir",
        "Yalnızca farkın iki katı olmaktadır",
        "Aynı farkın kendisine eşit olmaktadır",
      ],
      correctAnswer: 3,
      explanation:
        "İki uçtaki fark eşit olduğunda logaritmik ortalama da aynı değere eşitlenir; bu, sıcaklık farkının sabit kaldığı özel durumdur.",
      category: "Termodinamik",
    },
    {
      id: 287,
      question: "Çok geçişli eşanjörde LMTD nasıl düzeltilir?",
      options: [
        "F düzeltme faktörüyle çarpılarak düzeltilir",
        "Yalnızca ikiye bölünerek düzeltilmektedir",
        "Yalnızca karesi alınarak düzeltilmektedir",
        "Yalnızca sabit bir sayı eklenerek düzeltilir",
      ],
      correctAnswer: 0,
      explanation:
        "Akış düzeni saf ters akıştan saparsa LMTD bire eşit veya daha küçük bir F faktörüyle çarpılır; faktör grafiklerden okunur.",
      category: "Termodinamik",
    },
    {
      id: 288,
      question: "LMTD yöntemi hangi durumda doğrudan uygulanır?",
      options: [
        "Yalnızca çıkış sıcaklıkları bilinmediğinde",
        "Giriş ve çıkış sıcaklıkları biliniyorsa",
        "Yalnızca debiler bilinmediğinde uygulanır",
        "Yalnızca basınçlar bilinmediğinde uygulanır",
      ],
      correctAnswer: 1,
      explanation:
        "Dört sıcaklık biliniyorsa LMTD doğrudan hesaplanır; çıkışlar bilinmiyorsa etkinlik-NTU yöntemi tercih edilir.",
      category: "Termodinamik",
    },
    {
      id: 289,
      question: "Plakalı ısı eşanjörünün temel üstünlüğü nedir?",
      options: [
        "Yalnızca çok yüksek basınca dayanması",
        "Yalnızca hiç bakım gerektirmemesi",
        "Küçük hacimde çok büyük yüzey alanı",
        "Yalnızca kirlenmeye tümüyle dirençli olması",
      ],
      correctAnswer: 2,
      explanation:
        "Oluklu ince plakalar hem alanı büyütür hem türbülansı erken başlatır; aynı görev için kabuk-borudan çok daha küçük hacim yeter.",
      category: "Termodinamik",
    },
    {
      id: 290,
      question: "Plakalı eşanjörde kapasite nasıl artırılır?",
      options: [
        "Yalnızca gövde çapı büyütülerek artırılır",
        "Yalnızca boru sayısı artırılarak sağlanır",
        "Yalnızca akış hızı düşürülerek sağlanır",
        "Plaka eklenerek kolayca artırılabilir",
      ],
      correctAnswer: 3,
      explanation:
        "Sıkma cıvataları gevşetilip paketin arasına yeni plakalar eklenebilir; bu esneklik kabuk-boru tipinde bulunmaz.",
      category: "Termodinamik",
    },
    {
      id: 291,
      question: "Plakalı eşanjörde contaların işlevi nedir?",
      options: [
        "İki akışkanı ayırıp kanalları yönlendirmek",
        "Yalnızca plakaları ağırlaştırmak işlevidir",
        "Yalnızca plakaları boyamak işlevi görmektedir",
        "Yalnızca plakaları ısıtmak işlevi görmektedir",
      ],
      correctAnswer: 0,
      explanation:
        "Contalar hem sızdırmazlığı sağlar hem her akışkanı kendi kanal grubuna yönlendirir; malzemesi sıcaklık ve akışkana göre seçilir.",
      category: "Termodinamik",
    },
    {
      id: 292,
      question: "Plakalı eşanjörün sınırlaması nedir?",
      options: [
        "Yalnızca çok büyük yer kaplaması durumudur",
        "Basınç ve sıcaklık sınırının görece düşüklüğü",
        "Yalnızca temizlenememesi durumudur",
        "Yalnızca kapasitesinin artırılamaması durumu",
      ],
      correctAnswer: 1,
      explanation:
        "Contalı tiplerde çalışma basıncı ve sıcaklığı conta malzemesiyle sınırlıdır; yüksek değerlerde kaynaklı veya lehimli tipler gerekir.",
      category: "Termodinamik",
    },
    {
      id: 293,
      question: "Kabuk-boru eşanjöründe deniz suyu hangi tarafta akıtılır?",
      options: [
        "Yalnızca her zaman kabuk tarafında akıtılır",
        "Yalnızca akışkan cinsinden bağımsız seçilir",
        "Genelde temizlenebilir olan boru tarafında",
        "Yalnızca her zaman ceket tarafında akıtılır",
      ],
      correctAnswer: 2,
      explanation:
        "Kirletici akışkan boru içine alınır; borular fırçayla veya kimyasal olarak kolayca temizlenebilir, kabuk tarafı ise zordur.",
      category: "Termodinamik",
    },
    {
      id: 294,
      question: "Kabuk tarafındaki bölme levhalarının (baffle) işlevi nedir?",
      options: [
        "Yalnızca gövdeyi ağırlaştırmak işlevidir",
        "Yalnızca boruları boyamak işlevi görmektedir",
        "Yalnızca akışı yavaşlatmak işlevi görmektedir",
        "Akışı yönlendirip türbülansı artırmaktır",
      ],
      correctAnswer: 3,
      explanation:
        "Baffle'lar akışkanı borulara dik yönde zikzak çizdirir; taşınım katsayısı yükselir ve borular titreşime karşı desteklenir.",
      category: "Termodinamik",
    },
    {
      id: 295,
      question: "Kabuk-boru eşanjöründe genleşme derzi neden bulunur?",
      options: [
        "Boru ile gövde arasındaki ısıl farkı karşılamak",
        "Yalnızca gövde ağırlığını azaltmak amacıyla",
        "Yalnızca akış hızını artırmak amacıyla",
        "Yalnızca boruları boyamak amacıyla bulunur",
      ],
      correctAnswer: 0,
      explanation:
        "Borular ile gövde farklı sıcaklıkta çalıştığından farklı uzar; genleşme derzi veya yüzen başlık bu farkı karşılayarak gerilmeyi önler.",
      category: "Termodinamik",
    },
    {
      id: 296,
      question: "Kabuk-boru eşanjöründe boruların anot ile korunması neyi sağlar?",
      options: [
        "Yalnızca boruların rengini korumayı sağlar",
        "Galvanik korozyondan korunmayı sağlar",
        "Yalnızca boruların ağırlığını azaltmayı",
        "Yalnızca boruların boyunu uzatmayı sağlar",
      ],
      correctAnswer: 1,
      explanation:
        "Deniz suyu tarafına konan çinko anotlar kendini feda ederek boru ve boru levhasını korur; anotlar düzenli kontrol edilip yenilenir.",
      category: "Termodinamik",
    },
    {
      id: 297,
      question: "Eşanjörde fouling (kirlenme) neye yol açar?",
      options: [
        "Yalnızca basınç kaybının azalmasına yol açar",
        "Yalnızca ısı geçişinin artmasına yol açar",
        "Isı geçişinin düşüp basınç kaybının artmasına",
        "Yalnızca akış debisinin artmasına yol açar",
      ],
      correctAnswer: 2,
      explanation:
        "Yüzeydeki birikinti ek direnç yaratır ve kesiti daraltır; hem ısı geçişi düşer hem pompa gücü artar.",
      category: "Termodinamik",
    },
    {
      id: 298,
      question: "Deniz suyu tarafında kirlenmenin başlıca nedeni nedir?",
      options: [
        "Yalnızca yağ birikmesi başlıca nedendir",
        "Yalnızca kurum birikmesi başlıca nedendir",
        "Yalnızca boya dökülmesi başlıca nedendir",
        "Deniz canlıları, çamur ve kireç birikimi",
      ],
      correctAnswer: 3,
      explanation:
        "Midye, yosun ve askıda katı maddeler boru içini daraltır; sıcak yüzeylerde ayrıca kireç çökelmesi görülür.",
      category: "Termodinamik",
    },
    {
      id: 299,
      question: "Kirlenmenin fark edildiği en pratik gösterge nedir?",
      options: [
        "Çıkış sıcaklığı ve basınç kaybındaki sapma",
        "Yalnızca eşanjörün dış rengindeki değişim",
        "Yalnızca eşanjörün ağırlığındaki değişim",
        "Yalnızca eşanjörün sesindeki değişim",
      ],
      correctAnswer: 0,
      explanation:
        "Aynı debide soğutma performansının düşmesi ve fark basıncının yükselmesi kirlenmenin ilk göstergesidir; trend kaydı bunu erken yakalar.",
      category: "Termodinamik",
    },
    {
      id: 300,
      question: "Eşanjör temizliğinde kimyasal yöntem ne zaman seçilir?",
      options: [
        "Yalnızca yumuşak çamur birikiminde seçilir",
        "Kireç ve sert birikinti oluştuğunda seçilir",
        "Yalnızca eşanjör yeni takıldığında seçilir",
        "Yalnızca contalar değiştirildiğinde seçilir",
      ],
      correctAnswer: 1,
      explanation:
        "Mekanik temizlik sert kireci alamaz; uygun asidik çözelti devrede dolaştırılır, ardından nötrleme ve durulama yapılır.",
      category: "Termodinamik",
    },
    {
      id: 301,
      question: "Kirlenmeyi önlemede en etkili işletme önlemi nedir?",
      options: [
        "Yalnızca eşanjörü sık sık boyamaktır",
        "Yalnızca debiyi olabildiğince düşürmektir",
        "Uygun akış hızı ve düzenli filtre bakımı",
        "Yalnızca sıcaklığı olabildiğince yükseltmektir",
      ],
      correctAnswer: 2,
      explanation:
        "Yeterli hız birikintinin tutunmasını engeller; deniz suyu filtresi ve sepet süzgeçlerin düzenli temizliği ise kaba kirliliği baştan alır.",
      category: "Termodinamik",
    },
    {
      id: 302,
      question: "Eşanjör etkinliği (effectiveness) nasıl tanımlanır?",
      options: [
        "Yalnızca çıkış ile giriş basıncının oranı olarak",
        "Yalnızca iki debinin birbirine oranı olarak",
        "Yalnızca iki alanın birbirine oranı olarak",
        "Gerçek ısı geçişinin en büyük olası değere oranı",
      ],
      correctAnswer: 3,
      explanation:
        "Etkinlik, gerçekte aktarılan ısının sonsuz yüzeyle aktarılabilecek en büyük ısıya oranıdır ve sıfır ile bir arasında değer alır.",
      category: "Termodinamik",
    },
    {
      id: 303,
      question: "NTU (transfer birimi sayısı) neyi ifade eder?",
      options: [
        "Eşanjörün ısıl büyüklüğünü ifade eder",
        "Yalnızca eşanjörün fiziksel ağırlığını",
        "Yalnızca eşanjörün üretim yılını ifade eder",
        "Yalnızca eşanjörün rengini ifade etmektedir",
      ],
      correctAnswer: 0,
      explanation:
        "NTU, toplam ısı geçiş katsayısı ile alanın çarpımının en küçük ısıl kapasite debisine oranıdır; büyüdükçe etkinlik artar ama doyuma gider.",
      category: "Termodinamik",
    },
    {
      id: 304,
      question: "Etkinlik-NTU yöntemi hangi durumda tercih edilir?",
      options: [
        "Yalnızca dört sıcaklık da bilindiğinde",
        "Çıkış sıcaklıkları bilinmediğinde tercih edilir",
        "Yalnızca debiler bilinmediğinde tercih edilir",
        "Yalnızca basınçlar bilinmediğinde tercih edilir",
      ],
      correctAnswer: 1,
      explanation:
        "Çıkış sıcaklıkları bilinmiyorsa LMTD yöntemi deneme-yanılma gerektirir; etkinlik-NTU yöntemi sonucu doğrudan verir.",
      category: "Termodinamik",
    },
    {
      id: 305,
      question: "Isıl kapasite debisi neyi ifade eder?",
      options: [
        "Yalnızca kütle debisinin kendisini ifade eder",
        "Yalnızca özgül ısının kendisini ifade eder",
        "Kütle debisi ile özgül ısının çarpımını",
        "Yalnızca sıcaklık farkının kendisini ifade eder",
      ],
      correctAnswer: 2,
      explanation:
        "Isıl kapasite debisi, akışkanın birim sıcaklık değişimi için taşıdığı ısı gücünü verir; küçük olan taraf eşanjörün sınırını belirler.",
      category: "Termodinamik",
    },
    {
      id: 306,
      question: "Eşanjör alanını iki katına çıkarmak etkinliği nasıl değiştirir?",
      options: [
        "Yalnızca etkinliği de iki katına çıkarır",
        "Yalnızca etkinliği yarıya indirmektedir",
        "Yalnızca etkinliği hiç değiştirmemektedir",
        "Artırır ama giderek azalan kazançla artırır",
      ],
      correctAnswer: 3,
      explanation:
        "Etkinlik NTU ile üstel biçimde bire yaklaşır; belirli bir noktadan sonra alan büyütmek kayda değer kazanç sağlamaz.",
      category: "Termodinamik",
    },
    {
      id: 307,
      question: "Egzoz gazı ekonomizerinde su dolaşımı neden sürekli tutulur?",
      options: [
        "Kuru nokta ve aşırı ısınmayı önlemek için",
        "Yalnızca pompayı ısıtabilmek amacıyladır",
        "Yalnızca buhar basıncını düşürmek içindir",
        "Yalnızca gürültüyü azaltmak amacıyladır",
      ],
      correctAnswer: 0,
      explanation:
        "Dolaşım kesilirse borudaki su buharlaşıp kuru bölge oluşur; boru aşırı ısınır ve kurum tutuşması riski doğar.",
      category: "Termodinamik",
    },
    {
      id: 308,
      question: "Ekonomizerde asit çiy noktası neden gözetilir?",
      options: [
        "Yalnızca buhar debisini artırmak amacıyla",
        "Yüzey soğursa kükürt asidi yoğuşacağı için",
        "Yalnızca gaz hızını yükseltmek amacıyla",
        "Yalnızca boru rengini korumak amacıyla",
      ],
      correctAnswer: 1,
      explanation:
        "Boru yüzeyi asit çiy noktasının altına inerse sülfürik asit yoğuşur ve hızlı düşük sıcaklık korozyonu başlar; besleme suyu sıcaklığı buna göre seçilir.",
      category: "Termodinamik",
    },
    {
      id: 309,
      question: "Atık ısı geri kazanım sistemi (WHRS) neyi hedefler?",
      options: [
        "Yalnızca egzoz gürültüsünü azaltmayı hedefler",
        "Yalnızca egzoz basıncını yükseltmeyi hedefler",
        "Atık ısıdan ek güç veya buhar üretmeyi",
        "Yalnızca egzoz gazını soğutmayı hedeflemektedir",
      ],
      correctAnswer: 2,
      explanation:
        "Egzoz ve süpürme havası ısısı geri kazanılarak buhar üretilir; bu buharla türbin çevrilerek elektrik veya ek sevk gücü elde edilir.",
      category: "Termodinamik",
    },
    {
      id: 310,
      question: "WHRS'de güç türbini (power turbine) ne yapar?",
      options: [
        "Yalnızca egzoz gazını filtrelemektedir",
        "Yalnızca yakıtı ısıtmakla görevlidir",
        "Yalnızca soğutma suyunu basmaktadır",
        "Egzoz gazının bir bölümüyle güç üretir",
      ],
      correctAnswer: 3,
      explanation:
        "Turboşarjere gitmeyen egzoz akımının bir bölümü ayrı bir türbine yönlendirilir; bu türbin jeneratör veya şaft üzerinden güç katar.",
      category: "Termodinamik",
    },
    {
      id: 311,
      question: "WHRS'nin toplam verime katkısı hangi mertebededir?",
      options: [
        "Birkaç yüzde puan mertebesindedir",
        "Yalnızca yüzde ellinin üzerindedir",
        "Yalnızca binde bir mertebesindedir",
        "Yalnızca yüzde yetmişin üzerindedir",
      ],
      correctAnswer: 0,
      explanation:
        "Tipik uygulamalarda sistem toplam sevk gücünün yüzde birkaçı kadar ek güç sağlar; büyük konteyner gemilerinde bu kayda değer bir yakıt kazancıdır.",
      category: "Termodinamik",
    },
    {
      id: 312,
      question: "WHRS kurulumunda hangi kısıt gözetilir?",
      options: [
        "Yalnızca geminin bayrak devleti kısıtı",
        "Egzoz sıcaklığının asit noktası üstünde kalması",
        "Yalnızca mürettebat sayısının artması kısıtı",
        "Yalnızca liman ücretlerinin yükselmesi kısıtı",
      ],
      correctAnswer: 1,
      explanation:
        "Isı fazla çekilirse baca gazı sıcaklığı asit çiy noktasının altına iner ve korozyon başlar; geri kazanım bu sınır gözetilerek boyutlandırılır.",
      category: "Termodinamik",
    },
    {
      id: 313,
      question: "Buhar jeneratörü ile türbin entegrasyonunda hangi düzen kurulur?",
      options: [
        "Yalnızca türbin doğrudan pervaneye bağlanır",
        "Yalnızca türbin doğrudan kazana bağlanır",
        "Üretilen buhar türbini besleyip jeneratör döndürür",
        "Yalnızca türbin doğrudan yakıt pompasına bağlanır",
      ],
      correctAnswer: 2,
      explanation:
        "Atık ısı kazanında üretilen buhar türbine verilir; türbin genelde bir jeneratörü döndürür, kondenserden çıkan yoğuşuk yeniden kazana basılır.",
      category: "Termodinamik",
    },
    {
      id: 314,
      question: "Buhar türbini çıkışındaki kondenserin görevi nedir?",
      options: [
        "Buharı yoğuşturup vakumu korumaktır",
        "Yalnızca buharı ısıtmakla görevlidir",
        "Yalnızca buharı sıkıştırmakla görevlidir",
        "Yalnızca buharı filtrelemekle görevlidir",
      ],
      correctAnswer: 0,
      explanation:
        "Kondenser buharı yoğuşturarak türbin çıkışında düşük basınç yaratır; bu vakum türbinde elde edilen entalpi düşüşünü ve verimi büyütür.",
      category: "Termodinamik",
    },
    {
      id: 315,
      question: "Türbine giren buharın kuru doymuş olması neden istenir?",
      options: [
        "Yalnızca buhar debisini artırmak istendiği için",
        "Kanat erozyonunu önlemek istendiği için",
        "Yalnızca kazan basıncını düşürmek için",
        "Yalnızca yakıt tüketimini artırmak için",
      ],
      correctAnswer: 1,
      explanation:
        "Islak buhardaki su damlacıkları yüksek hızda kanatları döver ve erozyon yaratır; kızdırıcı kullanılarak buhar kuru tutulur.",
      category: "Termodinamik",
    },
    {
      id: 316,
      question: "Buhar sisteminde yoğuşuk (condensate) neden geri kazanılır?",
      options: [
        "Yalnızca depo alanı kazanmak amacıyladır",
        "Yalnızca boru boyunu kısaltmak amacıyladır",
        "Arıtılmış sıcak suyu yeniden kullanmak için",
        "Yalnızca kazanı soğutmak amacıyla yapılır",
      ],
      correctAnswer: 2,
      explanation:
        "Yoğuşuk hem arıtılmış hem sıcaktır; geri kazanımı besleme suyu hazırlama maliyetini ve kazanda harcanan yakıtı düşürür.",
      category: "Termodinamik",
    },
    {
      id: 317,
      question: "Buhar türbini devreye alınırken neden yavaş ısıtılır?",
      options: [
        "Yalnızca gürültüyü azaltabilmek amacıyla",
        "Yalnızca yakıt tasarrufu sağlamak amacıyla",
        "Yalnızca alarmları test edebilmek amacıyla",
        "Termal genleşme farkını dengelemek için",
      ],
      correctAnswer: 3,
      explanation:
        "Rotor ile gövde farklı hızda ısınır; hızlı ısıtmada açıklıklar kapanıp sürtme oluşur. Bu yüzden ısıtma ve devir yükseltme kademeli yapılır.",
      category: "Termodinamik",
    },
    {
      id: 318,
      question: "Kojenerasyon uygulaması neyi ifade eder?",
      options: [
        "Aynı yakıttan hem güç hem ısı üretmeyi",
        "Yalnızca iki ayrı yakıt kullanmayı ifade eder",
        "Yalnızca iki ayrı motor çalıştırmayı ifade eder",
        "Yalnızca iki ayrı jeneratör kurmayı ifade eder",
      ],
      correctAnswer: 0,
      explanation:
        "Kojenerasyonda elektrik üretilirken açığa çıkan atık ısı ısıtma ve proses için kullanılır; toplam yakıt kullanım verimi belirgin yükselir.",
      category: "Termodinamik",
    },
    {
      id: 319,
      question: "Gemide kojenerasyonun en yaygın biçimi hangisidir?",
      options: [
        "Yalnızca rüzgâr türbini kurulumu biçimidir",
        "Jeneratör egzozundan buhar üretilmesi",
        "Yalnızca güneş paneli kurulumu biçimidir",
        "Yalnızca akü grubu kurulumu biçimidir",
      ],
      correctAnswer: 1,
      explanation:
        "Yardımcı motorların egzozuna yerleştirilen kazan, limanda ve seyirde ısıtma buharını üretir; böylece yardımcı kazan yakıtı harcanmaz.",
      category: "Termodinamik",
    },
    {
      id: 320,
      question: "Kojenerasyonda toplam verim neden yüksek çıkar?",
      options: [
        "Yalnızca daha pahalı yakıt kullanıldığı için",
        "Yalnızca daha büyük makine seçildiği için",
        "Atık ısı da yararlı çıktı sayıldığı için",
        "Yalnızca daha az bakım yapıldığı için",
      ],
      correctAnswer: 2,
      explanation:
        "Yalnız elektrik üreten sistemde atık ısı kayıptır; kojenerasyonda bu ısı kullanıldığından yakıt enerjisinin çok büyük bölümü değerlendirilir.",
      category: "Termodinamik",
    },
    {
      id: 321,
      question: "Kojenerasyon planlanırken hangi denge kurulur?",
      options: [
        "Yalnızca yakıt fiyatı ile liman ücreti dengesi",
        "Yalnızca mürettebat ile vardiya dengesi",
        "Yalnızca gemi hızı ile sefer süresi dengesi",
        "Elektrik ihtiyacı ile ısı ihtiyacı dengesi",
      ],
      correctAnswer: 3,
      explanation:
        "Üretilen ısı kullanılamıyorsa kazanç oluşmaz; sistem, gemide gerçekten tüketilen buhar ve elektrik profiline göre boyutlandırılır.",
      category: "Termodinamik",
    },
    {
      id: 322,
      question: "Trijenerasyon kojenerasyondan hangi yönüyle ayrılır?",
      options: [
        "Soğutma üretimini de kapsamasıyla ayrılır",
        "Yalnızca daha az yakıt kullanmasıyla ayrılır",
        "Yalnızca daha küçük olmasıyla ayrılmaktadır",
        "Yalnızca daha ucuz olmasıyla ayrılmaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "Atık ısının bir bölümü absorpsiyonlu soğutma grubunu besler; sistem aynı yakıttan elektrik, ısı ve soğutma birlikte üretir.",
      category: "Termodinamik",
    },
    {
      id: 323,
      question: "Enerji dönüşüm verimi nasıl tanımlanır?",
      options: [
        "Yalnızca girdi enerjinin toplam değeri olarak",
        "Yararlı çıktının toplam girdiye oranı olarak",
        "Yalnızca kayıpların toplam değeri olarak",
        "Yalnızca çıktının kayba oranı olarak",
      ],
      correctAnswer: 1,
      explanation:
        "Verim, elde edilen yararlı enerjinin harcanan enerjiye bölünmesiyle bulunur; her dönüşüm basamağında bir miktar kayıp kaçınılmazdır.",
      category: "Termodinamik",
    },
    {
      id: 324,
      question: "Dizel ana makinede enerjinin en büyük kayıp kalemi hangisidir?",
      options: [
        "Yalnızca yatak sürtünmesi kaybıdır",
        "Yalnızca radyasyon kaybıdır",
        "Egzoz ve soğutma suyu ile giden ısıdır",
        "Yalnızca yağlama pompası kaybıdır",
      ],
      correctAnswer: 2,
      explanation:
        "Yakıt enerjisinin yaklaşık yarısı egzoz gazı ve soğutma suyuyla dışarı atılır; şafta ulaşan pay büyük deniz dizellerinde yüzde elli dolayındadır.",
      category: "Termodinamik",
    },
    {
      id: 325,
      question: "Seri dönüşümlerde toplam verim nasıl bulunur?",
      options: [
        "Yalnızca verimlerin toplanmasıyla bulunur",
        "Yalnızca en büyük verim seçilerek bulunur",
        "Yalnızca verimlerin ortalamasıyla bulunur",
        "Verimlerin çarpılmasıyla bulunmaktadır",
      ],
      correctAnswer: 3,
      explanation:
        "Her basamağın verimi bir öncekinin çıktısına uygulanır; toplam verim tek tek verimlerin çarpımıdır ve daima en küçüğünden de düşüktür.",
      category: "Termodinamik",
    },
    {
      id: 326,
      question: "Kayıp analizinde Sankey diyagramı ne sağlar?",
      options: [
        "Enerji akışını ve kayıpları görsel gösterir",
        "Yalnızca basınç dağılımını görsel gösterir",
        "Yalnızca sıcaklık dağılımını görsel gösterir",
        "Yalnızca kütle dağılımını görsel gösterir",
      ],
      correctAnswer: 0,
      explanation:
        "Ok kalınlıkları enerji miktarıyla orantılıdır; hangi kalemin ne kadar büyük olduğu tek bakışta görülür ve iyileştirme önceliği belirlenir.",
      category: "Termodinamik",
    },
    {
      id: 327,
      question: "Enerji verimliliği çalışmasında ilk adım nedir?",
      options: [
        "Yalnızca yeni ekipman satın almaktır",
        "Mevcut durumu ölçüp temel çizgi kurmak",
        "Yalnızca personel sayısını artırmaktır",
        "Yalnızca sefer sayısını azaltmaktır",
      ],
      correctAnswer: 1,
      explanation:
        "Ölçülmeyen iyileştirilemez; önce tüketim ve kayıplar ölçülüp bir temel çizgi kurulur, sonra önlemlerin etkisi bu çizgiye göre değerlendirilir.",
      category: "Termodinamik",
    },
    {
      id: 328,
      question: "İkinci yasa verimi neyi karşılaştırır?",
      options: [
        "Yalnızca girdi ile çıktı kütlesini karşılaştırır",
        "Yalnızca girdi ile çıktı hacmini karşılaştırır",
        "Gerçek performansı tersinir sınırla karşılaştırır",
        "Yalnızca girdi ile çıktı debisini karşılaştırır",
      ],
      correctAnswer: 2,
      explanation:
        "Birinci yasa verimi enerji miktarını, ikinci yasa verimi ise aynı koşullarda kuramsal olarak ulaşılabilecek en iyi performansa yakınlığı ölçer.",
      category: "Termodinamik",
    },
  ],
};
