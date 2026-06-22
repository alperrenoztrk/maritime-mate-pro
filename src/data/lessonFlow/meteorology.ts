import type { LessonFlow } from "./types";

/**
 * Meteoroloji — Duolingo tarzı rehberli akış içeriği (beta).
 *
 * `sectionTitles` ve `sectionRef`, `meteorologyTopicContents.ts` içindeki
 * gerçek `TopicSection.title` değerleriyle birebir eşleşir. Anlatım metni
 * oradan read-only okunur; burada yalnızca recap soruları elle yazılmıştır.
 */

const MET = "Meteoroloji";

export const meteorologyLessonFlows: LessonFlow[] = [
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "meteorology",
    topicTitle: "Beaufort skalası uygulamaları",
    blocks: [
      { sectionTitles: ["Skalanın Yapısı"] },
      { sectionTitles: ["Deniz Durumu (Sea State) ile İlişki", "Köprüüstü Kullanımı"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Skalanın Yapısı",
        category: MET,
        question: "Beaufort skalası kaç kademeden oluşur?",
        options: ["0–12 arası, 13 kademe", "1–10 arası, 10 kademe", "0–9 arası, 10 kademe", "1–12 arası, 12 kademe"],
        correctAnswer: 0,
        explanation: "Skala 0 (sakin) ile 12 (kasırga) arasında 13 kademedir.",
      },
      {
        id: 2,
        sectionRef: "Skalanın Yapısı",
        category: MET,
        question: "Beaufort Force 12 hangi koşulu ifade eder?",
        options: ["Kasırga (hurricane)", "Sakin (calm)", "Hafif meltem", "Fırtınamsı rüzgâr"],
        correctAnswer: 0,
        explanation: "Force 0 sakin, Force 12 kasırga koşuludur; her kademe bir rüzgâr hızı aralığına karşılık gelir.",
      },
      {
        id: 3,
        sectionRef: "Deniz Durumu (Sea State) ile İlişki",
        category: MET,
        question: "Beaufort skalası tek başına neden dalga yüksekliğini vermez?",
        options: [
          "Dalga yüksekliği ayrıca esme süresine (duration) ve fetch'e bağlı olduğundan",
          "Skala yalnızca sıcaklığı ölçtüğünden",
          "Dalga yüksekliği rüzgârdan tamamen bağımsız olduğundan",
          "Skala yalnızca gece geçerli olduğundan",
        ],
        correctAnswer: 0,
        explanation:
          "Beaufort doğrudan rüzgâr hızını sınıflar; dalga yüksekliği ise rüzgârın süresine ve fetch'e de bağlıdır.",
      },
      {
        id: 4,
        sectionRef: "Köprüüstü Kullanımı",
        category: MET,
        question: "Güverte operasyon limitleri (kreyn, pilot transferi) genellikle neye göre tanımlanır?",
        options: ["Beaufort kademesine", "Sadece sıcaklığa", "Gemi hızına", "Barometre markasına"],
        correctAnswer: 0,
        explanation: "Operasyon limitleri çoğunlukla Beaufort kademesine referansla belirlenir; bu yüzden tutarlı gözlem önemlidir.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "meteorology",
    topicTitle: "Tehlikeli/seyir yapılabilir yarım daire",
    blocks: [
      { sectionTitles: ["Yarım Daire Tanımı"] },
      { sectionTitles: ["Konum Belirleme Yöntemleri", "Kaçınma Stratejisi"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Yarım Daire Tanımı",
        category: MET,
        question: "Kuzey Yarım Küre'de tropikal siklonun hareket yönünün SAĞ tarafı nedir?",
        options: ["Tehlikeli yarım daire", "Seyir yapılabilir yarım daire", "Gözün merkezi", "Soğuk sektör"],
        correctAnswer: 0,
        explanation:
          "Kuzey YK'de hareket yönünün sağı tehlikeli, solu seyir yapılabilir yarım dairedir (Güney YK'de tersi).",
      },
      {
        id: 2,
        sectionRef: "Yarım Daire Tanımı",
        category: MET,
        question: "Tehlikeli yarım dairede toplam rüzgâr neden daha şiddetlidir?",
        options: [
          "Siklonun ilerleme (translasyon) hızı dönel rüzgâra eklendiği için",
          "Rüzgâr tamamen durduğu için",
          "Basınç yükseldiği için",
          "Dönel rüzgâr translasyondan çıkarıldığı için",
        ],
        correctAnswer: 0,
        explanation:
          "Tehlikeli yarım dairede translasyon hızı dönel rüzgâra EKLENİR; ayrıca gemi siklonun yoluna sürüklenir.",
      },
      {
        id: 3,
        sectionRef: "Konum Belirleme Yöntemleri",
        category: MET,
        question: "Kuzey YK'de rüzgâr yönü saat yönünde (veering) dönüyorsa gemi neredededir?",
        options: ["Tehlikeli yarım dairede", "Seyir yapılabilir yarım dairede", "Tam merkezde", "Siklondan tamamen uzakta"],
        correctAnswer: 0,
        explanation: "Kuzey YK'de rüzgâr veering (saat yönü) ise tehlikeli, backing (saat tersi) ise seyir yapılabilir yarım dairededir.",
      },
      {
        id: 4,
        sectionRef: "Konum Belirleme Yöntemleri",
        category: MET,
        question: "Buys Ballot kuralına göre (Kuzey YK) rüzgâra sırtını dönen gözlemcide alçak basınç merkezi nerededir?",
        options: ["Solunda", "Sağında", "Tam arkasında", "Tam önünde"],
        correctAnswer: 0,
        explanation: "Kuzey YK'de rüzgâra sırtını döndüğünde alçak basınç merkezi yaklaşık solunda kalır.",
      },
      {
        id: 5,
        sectionRef: "Kaçınma Stratejisi",
        category: MET,
        question: "Tehlikeli yarım dairedeki bir gemi nasıl kaçınmalıdır?",
        options: [
          "Rüzgârı sancak baş omuzluğuna alarak siklondan uzaklaşmalı",
          "Rüzgârı kıçtan alıp siklonun önüne geçmeli",
          "Rotayı koruyup beklemeli",
          "Doğrudan göze yönelmeli",
        ],
        correctAnswer: 0,
        explanation:
          "Tehlikeli yarım dairede rüzgâr sancak baş omuzluğuna alınarak uzaklaşılır; erken karar manevra alanını genişletir.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "meteorology",
    topicTitle: "Dalga yüksekliği ve periyot",
    blocks: [
      { sectionTitles: ["Tanımlar"] },
      { sectionTitles: ["Gemi Hareketlerine Etkisi", "Operasyonel Değerlendirme"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Tanımlar",
        category: MET,
        question: "Anlamlı dalga yüksekliği (Hs) nedir?",
        options: [
          "En yüksek dalgaların üçte birinin ortalaması",
          "Tüm dalgaların ortalaması",
          "Gözlenen en yüksek tek dalga",
          "Dalga çukuru derinliği",
        ],
        correctAnswer: 0,
        explanation: "Hs (H₁/₃), gözlenen en yüksek dalgaların üçte birinin ortalamasıdır; deniz durumu standardıdır.",
      },
      {
        id: 2,
        sectionRef: "Tanımlar",
        category: MET,
        question: "Dalga periyodu (T) neyi ifade eder?",
        options: [
          "Ardışık iki dalga tepesinin aynı noktadan geçme süresi (saniye)",
          "Dalga tepesi ile çukuru arası dikey mesafe",
          "Rüzgârın esme süresi",
          "Dalganın katettiği toplam mesafe",
        ],
        correctAnswer: 0,
        explanation: "Periyot, ardışık iki tepe arasındaki süredir (s); dalgaboyu ve hız periyottan türetilir.",
      },
      {
        id: 3,
        sectionRef: "Gemi Hareketlerine Etkisi",
        category: MET,
        question: "Tehlikeli parametrik/senkron yalpa ne zaman gelişir?",
        options: [
          "Geminin doğal yalpa periyodu ile dalga karşılaşma periyodu örtüştüğünde",
          "Deniz tamamen sakin olduğunda",
          "Gemi limanda bağlıyken",
          "Rüzgâr hiç olmadığında",
        ],
        correctAnswer: 0,
        explanation:
          "Doğal yalpa periyodu ile karşılaşma periyodu örtüşünce rezonans (senkron/parametrik yalpa) gelişir; stabilite kaybına gidebilir.",
      },
      {
        id: 4,
        sectionRef: "Operasyonel Değerlendirme",
        category: MET,
        question: "Quartering sea (dalga açısı 120°–150°) koşulunda hangi risk artar?",
        options: ["Broaching (yan dönme) riski", "Buzlanma riski", "Sis riski", "Çatışma riski"],
        correctAnswer: 0,
        explanation: "Quartering sea'de broaching riski artar; gerekirse rota/hız değişikliğiyle karşılaşma periyodu kontrol edilir.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "meteorology",
    topicTitle: "Cephe tipleri ve geçiş etkileri",
    blocks: [
      { sectionTitles: ["Soğuk Cephe", "Sıcak Cephe"] },
      { sectionTitles: ["Oklüde Cephe ve Stasyoner Cephe", "Operasyonel Karar ve Hazırlık"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Soğuk Cephe",
        category: MET,
        question: "Soğuk cephe geçişinin tipik özelliği nedir?",
        options: [
          "Hızlı, şiddetli ve dar bantlı; geçiş sonrası basınç yükselir, sıcaklık düşer",
          "Yavaş ve günlerce süren hafif yağış",
          "Hiç rüzgâr değişimi olmaması",
          "Sıcaklığın geçişle birlikte yükselmesi",
        ],
        correctAnswer: 0,
        explanation:
          "Soğuk cephe dar/dik yapıdadır; dar bantta şiddetli yağış ve gust verir, geçiş sonrası basınç yükselir ve sıcaklık düşer.",
      },
      {
        id: 2,
        sectionRef: "Sıcak Cephe",
        category: MET,
        question: "Sıcak cephenin denizci için en kritik riski nedir?",
        options: [
          "Düşük görüş (adveksiyon sisi) ve yaygın sürekli yağış",
          "Ani buzlanma",
          "Rüzgârın tamamen durması",
          "Basıncın hızla yükselmesi",
        ],
        correctAnswer: 0,
        explanation:
          "Sıcak cephe yavaş ilerler, geniş alanda sürekli yağış verir; en kritik risk düşük görüş ve adveksiyon sisi oluşumudur.",
      },
      {
        id: 3,
        sectionRef: "Oklüde Cephe ve Stasyoner Cephe",
        category: MET,
        question: "Oklüzyon nasıl oluşur?",
        options: [
          "Soğuk cephenin sıcak cepheye yetişip sıcak sektörü yüzeyden koparmasıyla",
          "İki sıcak kütlenin birleşmesiyle",
          "Cephenin tamamen kaybolmasıyla",
          "Sadece karada basınç düşmesiyle",
        ],
        correctAnswer: 0,
        explanation:
          "Oklüzyon, soğuk cephenin sıcak cepheye yetişmesiyle oluşur ve karmaşık (hem soğuk hem sıcak cephe) koşullar üretir.",
      },
      {
        id: 4,
        sectionRef: "Operasyonel Karar ve Hazırlık",
        category: MET,
        question: "Cephe geçişine hazırlık ne zaman başlamalıdır?",
        options: [
          "Tahmini geçişten en az 2 saat önce",
          "Cephe geçtikten sonra",
          "Yalnızca yağış başlayınca",
          "Hazırlık gerekmez",
        ],
        correctAnswer: 0,
        explanation:
          "Hazırlık en az 2 saat önce başlar: güverte emniyeti artırılır, rüzgâr şifti değerlendirilir, görüş düşecekse Kural 19 prosedürleri hazırlanır.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "meteorology",
    topicTitle: "Sis oluşum türleri",
    blocks: [
      { sectionTitles: ["Adveksiyon Sisi", "Radyasyon Sisi"] },
      { sectionTitles: ["Buharlaşma Sisi ve Diğer Türler", "Köprüüstü Tedbirleri"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Adveksiyon Sisi",
        category: MET,
        question: "Adveksiyon sisi nasıl oluşur ve önemi nedir?",
        options: [
          "Sıcak nemli havanın soğuk yüzey üzerinden geçmesiyle; en yaygın deniz sisi, günlerce sürebilir",
          "Gece yüzeyin soğumasıyla; sadece karada",
          "Soğuk havanın sıcak su üzerinden geçmesiyle; çok kısa sürer",
          "Yağışın buharlaşmasıyla; yalnızca tropiklerde",
        ],
        correctAnswer: 0,
        explanation:
          "Adveksiyon sisi sıcak/nemli havanın soğuk yüzey üzerinden hareketiyle oluşur; denizde en yaygın türdür ve günlerce sürebilir.",
      },
      {
        id: 2,
        sectionRef: "Radyasyon Sisi",
        category: MET,
        question: "Radyasyon sisi hakkında doğru olan hangisidir?",
        options: [
          "Gece yüzey soğumasıyla oluşur, karasal kökenlidir ve güneşle birkaç saatte çözülür",
          "Açık denizde günlerce sürer",
          "Soğuk hava-sıcak su etkileşiminden doğar",
          "Yalnızca fırtınada oluşur",
        ],
        correctAnswer: 0,
        explanation:
          "Radyasyon sisi sakin açık gecelerde yüzey radyasyonla soğuyunca oluşur; karasaldır, liman/kıyıyı etkiler, güneşle 2–4 saatte çözülür.",
      },
      {
        id: 3,
        sectionRef: "Buharlaşma Sisi ve Diğer Türler",
        category: MET,
        question: "Buharlaşma sisi (sea smoke) hangi koşulda oluşur?",
        options: [
          "Soğuk havanın sıcak su yüzeyi üzerinden geçmesiyle",
          "Sıcak havanın soğuk yüzey üzerinden geçmesiyle",
          "Gece yüzey soğumasıyla",
          "Yüksek basınç merkezinde",
        ],
        correctAnswer: 0,
        explanation:
          "Buharlaşma sisi (steam fog/sea smoke), soğuk havanın sıcak su üzerinden geçip nemin hızla yoğuşmasıyla oluşur; Arktik/kış aylarında sık görülür.",
      },
      {
        id: 4,
        sectionRef: "Köprüüstü Tedbirleri",
        category: MET,
        question: "Sis tedbirleri ne zaman başlatılmalıdır?",
        options: [
          "Görüş fiilen düşmeden önce, meteorolojik göstergeler (SST–çiğ noktası farkı) sis işaret ettiğinde",
          "Ancak görüş sıfırlandıktan sonra",
          "Yalnızca gündüz",
          "Liman dışında hiç gerekmez",
        ],
        correctAnswer: 0,
        explanation:
          "Tedbirler proaktiftir: SST ile hava sıcaklığı/çiğ noktası farkı izlenir, sis beklenince Kural 19 prosedürleri (emniyetli hız, ses işareti, ek gözcü) görüş düşmeden başlatılır.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "meteorology",
    topicTitle: "Gerçek rüzgar ve görünen rüzgar",
    blocks: [
      { sectionTitles: ["Tanımlar ve Vektörel İlişki"] },
      { sectionTitles: ["Operasyonel Önem", "Hesaplama ve Doğrulama"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Tanımlar ve Vektörel İlişki",
        category: MET,
        question: "Gemideki anemometre hangi rüzgârı ölçer?",
        options: [
          "Görünen rüzgârı (apparent) — gemi hareketi + gerçek rüzgâr bileşeni",
          "Daima gerçek rüzgârı",
          "Yalnızca rüzgâr yönünü",
          "Sadece gerçek rüzgâr hızını",
        ],
        correctAnswer: 0,
        explanation:
          "Anemometre görünen rüzgârı (AW) ölçer; bu, geminin hareket vektörü ile gerçek rüzgârın (TW) bileşimidir.",
      },
      {
        id: 2,
        sectionRef: "Operasyonel Önem",
        category: MET,
        question: "Rüzgâr arkadan eserken gerçek rüzgâr ile görünen rüzgâr ilişkisi nasıldır?",
        options: [
          "Gerçek rüzgâr, görünenden önemli ölçüde YÜKSEK olabilir",
          "Gerçek rüzgâr daima görünene eşittir",
          "Gerçek rüzgâr daima sıfırdır",
          "Görünen rüzgâr daima daha yüksektir",
        ],
        correctAnswer: 0,
        explanation:
          "Rüzgâr arkadan eserken görünen rüzgâr düşük okunur; gerçek rüzgâr çok daha yüksek olabilir, bu da rüzgâr momentini küçümsemeye yol açar.",
      },
      {
        id: 3,
        sectionRef: "Operasyonel Önem",
        category: MET,
        question: "Pilot/helikopter operasyon limitleri hangi rüzgâra göre belirlenir?",
        options: ["Gerçek rüzgâra (true wind)", "Görünen rüzgâra", "Pusula rüzgârına", "Tahmin bültenine"],
        correctAnswer: 0,
        explanation: "Operasyon limitleri gerçek rüzgâra göre tanımlanır; görünen rüzgârın doğrudan kullanımı yanıltıcıdır.",
      },
      {
        id: 4,
        sectionRef: "Hesaplama ve Doğrulama",
        category: MET,
        question: "Anemometre kalibrasyonu en kolay ne zaman kontrol edilir?",
        options: [
          "Gemi duruyor veya çok düşük hızdayken (ölçülen ≈ gerçek rüzgâr)",
          "Tam yolda seyrederken",
          "Fırtına ortasında",
          "Yalnızca limanda bağlıyken bile imkânsızdır",
        ],
        correctAnswer: 0,
        explanation:
          "Çok düşük hızda/dururken ölçülen rüzgâr gerçek rüzgâra çok yakındır; bu durum kalibrasyon kontrolü için kullanılır.",
      },
    ],
  },
  {
    topicKey: "meteorology",
    topicTitle: "Basınç merkezleri (alçak/yüksek)",
    blocks: [
      { sectionTitles: ["Alçak Basınç Merkezleri (Siklon / Depresyon)", "Yüksek Basınç Merkezleri (Antisiklon)"] },
      { sectionTitles: ["Barometre Trend Analizi ve Operasyonel Karar"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Alçak Basınç Merkezleri (Siklon / Depresyon)",
        category: MET,
        question: "Kuzey yarım kürede alçak basınç merkezi etrafında rüzgâr hangi yönde döner?",
        options: [
          "Saatin tersi yönünde (siklonik)",
          "Saat yönünde (antisiklonik)",
          "Daima kuzeyden güneye",
          "Hiç dönmez, düz eser",
        ],
        correctAnswer: 0,
        explanation: "KYK'de alçak basınç etrafında rüzgâr saatin tersi (siklonik) döner; alçakta hava yükselir, bulut/yağış oluşur.",
      },
      {
        id: 2,
        sectionRef: "Yüksek Basınç Merkezleri (Antisiklon)",
        category: MET,
        question: "Yüksek basınç (antisiklon) merkezinde genellikle hangi hava koşulu görülür?",
        options: [
          "İnen hava, bulutların çözülmesi, genelde açık/sakin hava",
          "Sürekli şiddetli yağış",
          "Yükselen hava ve kümülonimbus",
          "Her zaman fırtına",
        ],
        correctAnswer: 0,
        explanation: "Yüksekte hava iner ve ısınır, bulut çözülür; ancak kenar gradyanları güçlü rüzgâr ve radyasyon sisi riski taşır.",
      },
      {
        id: 3,
        sectionRef: "Barometre Trend Analizi ve Operasyonel Karar",
        category: MET,
        question: "Köprüüstünde basınç değerlendirmesinde asıl önemli olan nedir?",
        options: [
          "3-saatlik trend eğrisi (anlık değer değil)",
          "Yalnızca tek anlık okuma",
          "Barometrenin rengi",
          "Sadece gece ölçümleri",
        ],
        correctAnswer: 0,
        explanation: "Saatte ≥1 hPa düşüş yaklaşan güçlü alçak/cepheyi işaret eder; trend vardiya devrinde aktarılmalıdır.",
      },
    ],
  },
  {
    topicKey: "meteorology",
    topicTitle: "İzobar yapısı ve gradyan",
    blocks: [
      { sectionTitles: ["İzobar Kavramı ve Çizim Mantığı"] },
      { sectionTitles: ["Basınç Gradyanı ve Rüzgâr İlişkisi", "Operasyonel Uygulama"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "İzobar Kavramı ve Çizim Mantığı",
        category: MET,
        question: "İzobarlar synoptik haritada genellikle kaç hPa aralıklarla çizilir?",
        options: ["4 hPa", "1 hPa", "10 hPa", "25 hPa"],
        correctAnswer: 0,
        explanation: "İzobarlar tipik olarak 4 hPa aralıklarla (1000, 1004, 1008...) çizilir; kapalı eğriler basınç merkezini tanımlar.",
      },
      {
        id: 2,
        sectionRef: "Basınç Gradyanı ve Rüzgâr İlişkisi",
        category: MET,
        question: "İki izobar arasındaki mesafe kısaldığında ne olur?",
        options: [
          "Basınç gradyanı büyür, rüzgâr hızı artar",
          "Rüzgâr hızı azalır",
          "Basınç gradyanı küçülür",
          "Hiçbir değişiklik olmaz",
        ],
        correctAnswer: 0,
        explanation: "Sıkışık izobar = güçlü gradyan = yüksek rüzgâr. Yüzey sürtünmesi gerçek rüzgârı geostrofikten %20-30 azaltır.",
      },
      {
        id: 3,
        sectionRef: "Operasyonel Uygulama",
        category: MET,
        question: "İzobar gradyanından okunan rüzgâr tahminine neden gust payı eklenir?",
        options: [
          "Gust faktörü ortalama rüzgârın 1.3-1.5 katına ulaşabildiğinden",
          "Gust her zaman ortalamadan düşük olduğundan",
          "Gust yalnızca karada görüldüğünden",
          "Gust basınçtan bağımsız olduğundan",
        ],
        correctAnswer: 0,
        explanation: "Ani sağanak rüzgâr (gust) ortalamanın 1.3-1.5 katına çıkabilir; operasyonel emniyet için pay eklenir.",
      },
    ],
  },
  {
    topicKey: "meteorology",
    topicTitle: "Hava kütleleri ve kaynak bölgeler",
    blocks: [
      { sectionTitles: ["Hava Kütlesi Sınıflandırması"] },
      { sectionTitles: ["Kütle Dönüşümü ve Stabilite Etkisi", "Köprüüstü Uygulaması"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Hava Kütlesi Sınıflandırması",
        category: MET,
        question: "Hava kütleleri hangi iki eksende sınıflandırılır?",
        options: [
          "Kaynak enlemi (kutupsal/tropikal) ve kaynak yüzeyi (denizel/karasal)",
          "Sıcaklık ve renk",
          "Hız ve yön",
          "Basınç ve nem yalnızca",
        ],
        correctAnswer: 0,
        explanation: "Enlem (P/T) ve yüzey (m/c) ekseninden cP, mP, cT, mT tipleri çıkar; ayrıca Arktik (A) ve Ekvatoral (E).",
      },
      {
        id: 2,
        sectionRef: "Kütle Dönüşümü ve Stabilite Etkisi",
        category: MET,
        question: "Sıcak bir hava kütlesi soğuk deniz yüzeyi üzerinden geçtiğinde ne oluşur?",
        options: [
          "Alttan soğur, stabil tabaka, stratus ve adveksiyon sisi (görüş düşer)",
          "Konvektif instabilite ve kümülüs",
          "Sağanak yağış ve iyi görüş",
          "Hiçbir değişiklik",
        ],
        correctAnswer: 0,
        explanation: "Sıcak kütle soğuk deniz üzerinde alttan soğur → stabil stratus/adveksiyon sisi → görüş dramatik düşer.",
      },
      {
        id: 3,
        sectionRef: "Köprüüstü Uygulaması",
        category: MET,
        question: "mT (denizel tropikal) kütlede başlıca hangi risk için hazırlık yapılır?",
        options: [
          "Adveksiyon sisi (görüş prosedürleri)",
          "Aşırı kuru hava",
          "Buzlanma",
          "Yüksek basınç fırtınası",
        ],
        correctAnswer: 0,
        explanation: "Sıcak-nemli mT kütlede adveksiyon sisi riski yüksektir; cP kütlede ise güçlü konvektif rüzgâr beklenir.",
      },
    ],
  },
];
