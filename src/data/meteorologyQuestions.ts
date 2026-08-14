import type { QuizQuestion } from "@/types/quiz";
import { meteorologyQuestionsExtended } from "@/data/meteorologyQuestionsExtended";
import { meteorologyQuestionsTopicFill } from "@/data/meteorologyQuestionsTopicFill";

const baseMeteorologyQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Beaufort 8 (Gale) rüzgârının yaklaşık hız aralığı nedir?",
    options: ["17-21 knot", "28-33 knot", "34-40 knot", "45-52 knot"],
    correctAnswer: 2,
    explanation: "Beaufort 8 = Gale: yaklaşık 34–40 kn aralığı.",
    category: "Beaufort"
  },
  {
    id: 2,
    question: "Kumulonimbus (Cb) bulutu genellikle hangi hava olayının habercisidir?",
    options: ["Sakin ve durgun hava koşulu", "Yer seviyesinde yoğun sis", "Fırtına ve sağanak yağış", "Hafif esen düzenli rüzgâr"],
    correctAnswer: 2,
    explanation: "Cb dikey gelişimli fırtına bulutudur; şiddetli sağanak, yıldırım, squall görülebilir.",
    category: "Bulutlar"
  },
  {
    id: 3,
    question: "Coriolis kuvveti Kuzey yarımkürede hareket eden hava kütlelerini hangi yöne saptırır?",
    options: ["Sola", "Sağa", "Yukarı", "Aşağı"],
    correctAnswer: 1,
    explanation: "Kuzey yarımkürede hareket sağa sapar; bu yüzden alçak basınçlar saat yönünün tersine döner.",
    category: "Dinamik"
  },
  {
    id: 4,
    question: "Deniz suyunun açık okyanuslarda ortalama tuzluluğu yaklaşık kaç promildir (‰)?",
    options: ["15‰", "25‰", "35‰", "45‰"],
    correctAnswer: 2,
    explanation: "Açık okyanuslarda ortalama tuzluluk ~35‰ kabul edilir.",
    category: "Oşinografi"
  },
  {
    id: 5,
    question: "NAVTEX uluslararası yayın için en yaygın hangi frekansta çalışır?",
    options: ["VHF bandında (156 MHz)", "MF bandında (518 kHz)", "HF bandında (8 MHz)", "UHF bandında (450 MHz)"],
    correctAnswer: 1,
    explanation: "NAVTEX: 518 kHz (international) ve 490 kHz (local) MF yayınları.",
    category: "GMDSS/Met"
  },
  {
    id: 6,
    question: "Sis oluşumu riski, çiğ noktası ile hava sıcaklığı farkı hangi değerin altına indiğinde artar?",
    options: ["< 2.5°C", "< 5°C", "< 10°C", "< 15°C"],
    correctAnswer: 0,
    explanation: "Sıcaklık çiğ noktasına yaklaştıkça bağıl nem artar; fark ~2–3°C altına indiğinde sis riski yüksektir.",
    category: "Sis"
  },
  {
    id: 7,
    question: "Derin su dalga boyu yaklaşık formülü L ≈ 1.56 × T² (m) ise T=10 s için L kaç metredir?",
    options: ["78 m", "100 m", "156 m", "200 m"],
    correctAnswer: 2,
    explanation: "L ≈ 1.56×100 = 156 m.",
    category: "Dalgalar"
  },
  {
    id: 8,
    question: "Kuzey yarımkürede alçak basınç merkezi çevresinde rüzgâr nasıl döner?",
    options: ["Saat yönünde", "Saat yönünün tersine", "Merkezden dışarı doğru", "Tamamen doğrusal"],
    correctAnswer: 1,
    explanation: "Alçak basınçta rüzgâr merkeze doğru ve saat yönünün tersine spiral yapar (KH).",
    category: "Basınç Sistemleri"
  },
  {
    id: 9,
    question: "İzobarlar (isobars) üzerinde değerler birbirine yaklaştıkça genellikle ne artar?",
    options: ["Rüzgâr şiddeti", "Görüş mesafesi", "Deniz suyu tuzluluğu", "Hava sıcaklığı"],
    correctAnswer: 0,
    explanation: "Basınç gradyanı büyüdükçe rüzgâr artar; izobar aralığı daralır.",
    category: "Basınç Sistemleri"
  },
  {
    id: 10,
    question: "Tropikal siklonlar genellikle deniz yüzeyi sıcaklığı kaç °C ve üzerindeyken güçlenir?",
    options: ["18°C", "22°C", "26.5°C", "30°C"],
    correctAnswer: 2,
    explanation: "Genel eşik SST ≈ 26.5°C olarak kabul edilir.",
    category: "Tropikal Meteoroloji"
  },
  {
    id: 11,
    question: "Tropikal siklonun 'eye' bölgesi genellikle nasıldır?",
    options: ["En şiddetli rüzgâr ve yağış", "Sakin/az bulutlu", "Yoğun sis", "Sürekli dolu yağışı"],
    correctAnswer: 1,
    explanation: "Eye nispeten sakin ve açık; en şiddetli koşullar eyewall bölgesindedir.",
    category: "Tropikal Meteoroloji"
  },
  {
    id: 12,
    question: "Soğuk cephe geçişinde aşağıdakilerden hangisi daha olasıdır?",
    options: ["Sıcaklığın belirgin artması", "Uzun süreli hafif yağmur", "Kısa sağanak ve ani rüzgâr", "Rüzgârın tamamen kesilmesi"],
    correctAnswer: 2,
    explanation: "Soğuk cephe: dar bantta konvektif yağış, squall, sıcaklık düşüşü.",
    category: "Cepheler"
  },
  {
    id: 13,
    question: "Sıcak cephe yaklaşırken tipik bulut sıralaması hangisidir?",
    options: ["Cb → Cu → Sc", "Ci → Cs → As → Ns", "St → Sc → Cu", "Ac → Ci → Cb"],
    correctAnswer: 1,
    explanation: "Sıcak cephelerde üst seviye Ci/Cs ile başlar, As/Ns ile yağış gelir.",
    category: "Cepheler"
  },
  {
    id: 14,
    question: "Duman/sis ayrımında, sisin temel özelliği hangisidir?",
    options: ["Yoğuşmayla su damlacığı içerir", "Yalnızca gündüz saatlerinde oluşur", "Her zaman kuru yapıda olur", "Yalnızca kirli havada oluşur"],
    correctAnswer: 0,
    explanation: "Sis, havadaki su buharının yoğuşmasıyla oluşan çok küçük su damlacıklarıdır.",
    category: "Sis"
  },
  {
    id: 15,
    question: "Bora rüzgârı aşağıdaki özelliklerden hangisiyle bilinir?",
    options: ["Sıcak, nemli ve yumuşak", "Sürekli esen hafif deniz meltemi", "Soğuk, kuru ve ani şiddetli", "Tropikal kökenli fırtına"],
    correctAnswer: 2,
    explanation: "Bora: özellikle Adriyatik'te görülen katabatik, soğuk ve çok şiddetli rüzgâr.",
    category: "Yerel Rüzgarlar"
  },
  {
    id: 16,
    question: "Mistral rüzgârı en çok hangi bölgede bilinir?",
    options: ["Kızıldeniz ve çevresi", "Biskay Körfezi çevresi", "Güney Fransa/Rhone Vadisi", "Karadeniz kıyı şeridi"],
    correctAnswer: 2,
    explanation: "Mistral: Rhone vadisinden Akdeniz'e esen soğuk, kuru rüzgâr.",
    category: "Yerel Rüzgarlar"
  },
  {
    id: 17,
    question: "Deniz seviyesinde standart atmosfer basıncı yaklaşık kaç hPa'dır?",
    options: ["1000 hPa", "1013 hPa", "1025 hPa", "1050 hPa"],
    correctAnswer: 1,
    explanation: "Standart basınç ~1013.25 hPa kabul edilir.",
    category: "Temel"
  },
  {
    id: 18,
    question: "Bağıl nem %100'e yaklaştığında aşağıdakilerden hangisi beklenir?",
    options: ["Buharlaşma hızlanır", "Yoğuşma/sis/bulut olasılığı artar", "Basınç her zaman artar", "Rüzgâr her zaman kesilir"],
    correctAnswer: 1,
    explanation: "%100'e yaklaştıkça hava doygunluğa yaklaşır; yoğuşma başlar.",
    category: "Nem"
  },
  {
    id: 19,
    question: "Tropikal siklonlardan kaçınmada en temel ilke hangisidir?",
    options: ["Merkeze doğru yaklaşmak", "Hızı artırıp merkeze girmek", "Güvenli sektörden uzaklaşmak", "Rüzgâr yönünü göz ardı etmek"],
    correctAnswer: 2,
    explanation: "Storm avoidance: safe/dangerous semicircle analizi yapıp merkezi mümkün olan en büyük mesafede tutmak esastır.",
    category: "Storm Avoidance"
  },
  {
    id: 20,
    question: "Kuzey yarımkürede, sırtınızı rüzgâra verdiğinizde alçak basınç yaklaşık hangi tarafta kalır? (Buys Ballot)",
    options: ["Sağda", "Solda", "Önünüzde", "Arkanızda"],
    correctAnswer: 1,
    explanation: "KH'de rüzgârı arkaya alınca alçak basınç solda kalır.",
    category: "Basınç Sistemleri"
  },
  {
    id: 21,
    question: "METAR raporlarında 'CAVOK' ne anlama gelir?",
    options: ["Görüş ve bulut şartları iyi", "Şiddetli fırtına uyarısı", "Yoğun sis uyarısı var", "Buzlanma riski yüksek"],
    correctAnswer: 0,
    explanation: "CAVOK: Ceiling And Visibility OK (görüş ≥ 10 km, belirgin bulut yok vb.).",
    category: "Met Raporları"
  },
  {
    id: 22,
    question: "Dalga periyodu artarsa, derin suda dalga boyu nasıl değişir?",
    options: ["Bir miktar azalır", "Belirgin artar", "Hiç değişmez", "Rastgele değişir"],
    correctAnswer: 1,
    explanation: "Derin suda L ∝ T²; periyot artışı dalga boyunu büyütür.",
    category: "Dalgalar"
  },
  {
    id: 23,
    question: "Deniz üzerinde oluşan adveksiyon sisi en sık hangi durumda görülür?",
    options: ["Soğuk hava sıcak su üzerine geldiğinde", "Sıcak nemli hava soğuk su üzerinde", "Yalnızca dağ yamaçlarında", "Yalnızca gece saatlerinde"],
    correctAnswer: 1,
    explanation: "Sıcak-nemli hava soğuk yüzeye taşınınca (adveksiyon) hızla doygunluğa ulaşıp sis oluşur.",
    category: "Sis"
  },
  {
    id: 24,
    question: "Rüzgâr şiddeti çok artmadan önce barometrede hızlı düşüş gözleniyorsa bu genellikle neye işaret eder?",
    options: ["Yüksek basınç sırtı geliyor", "Yaklaşan alçak basınç/cephe", "Kesin olarak sis oluşacak", "Gelgit değişimi yaklaşıyor"],
    correctAnswer: 1,
    explanation: "Hızlı basınç düşüşü genellikle yaklaşan alçak basınç/cephe sistemidir.",
    category: "Basınç Sistemleri"
  },
  {
    id: 25,
    question: "Denizcilikte 'swell' için en doğru tanım hangisidir?",
    options: ["Yerel rüzgârın kısa dalgası", "Uzak fırtınadan uzun dalga", "Gelgit kaynaklı akıntı", "Yüzen buz parçaları"],
    correctAnswer: 1,
    explanation: "Swell: uzak fırtınaların ürettiği, uzun periyotlu düzenli dalga sistemidir.",
    category: "Dalgalar"
  },
  {
    id: 26,
    question: "Sinoptik haritada izobarların çok sık (birbirine yakın) çizildiği bölge neyi gösterir?",
    options: [
      "Zayıf rüzgâr ve sakin deniz",
      "Güçlü gradyan ve kuvvetli rüzgâr",
      "Yoğun sis bölgesi oluşumu",
      "Tamamen sakin deniz durumu"
    ],
    correctAnswer: 1,
    explanation: "Sık izobarlar büyük basınç gradyanı demektir; gradyan ne kadar büyükse rüzgâr o kadar şiddetlidir.",
    category: "Sinoptik Harita"
  },
  {
    id: 27,
    question: "Buys Ballot yasası Güney yarımkürede nasıl uygulanır?",
    options: [
      "Sırtı rüzgâra verince alçak solda",
      "Yüzü rüzgâra dönünce alçak solda",
      "Alçak basınç her zaman öndedir",
      "Yasa güney yarımkürede geçersiz"
    ],
    correctAnswer: 1,
    explanation: "GH'de Coriolis ters yönlüdür; sırtınızı rüzgâra verdiğinizde alçak basınç sağ tarafta kalır (KH'nin tersi).",
    category: "Sinoptik Harita"
  },
  {
    id: 28,
    question: "Sinoptik haritada 'ridge' (sırt) terimi neyi ifade eder?",
    options: [
      "Alçak basıncın uzantısıdır",
      "Yüksek basınç uzantısı; açık hava",
      "Cephe çizgisini göstermektedir",
      "İzoterm çizgisini gösterir"
    ],
    correctAnswer: 1,
    explanation: "Ridge, yüksek basınç alanının dışarı doğru uzantısıdır ve genellikle stabil, açık hava ile ilişkilidir.",
    category: "Sinoptik Harita"
  },
  {
    id: 29,
    question: "Sinoptik haritada 'trough' (oluk/çukur) neyi gösterir?",
    options: [
      "Yüksek basınç sırtını gösterir",
      "Alçak basınç uzantısı; yağışlı",
      "Sabit basınç hattını gösterir",
      "Sakin deniz alanını gösterir"
    ],
    correctAnswer: 1,
    explanation: "Trough, alçak basıncın dışa uzantısıdır; bozuk, bulutlu, yağışlı hava ve rüzgâr değişimleriyle ilişkilidir.",
    category: "Sinoptik Harita"
  },
  {
    id: 30,
    question: "Beaufort skalasında 12. kuvvet neyi ifade eder?",
    options: [
      "Kuvvetli esinti (force 6)",
      "Fırtına/storm (force 10)",
      "Orkan/hurricane (≥64 kn)",
      "Sakin/calm (force 0)"
    ],
    correctAnswer: 2,
    explanation: "Beaufort 12 = Hurricane force; rüzgâr 64 knot ve üzeridir.",
    category: "Beaufort"
  },
  {
    id: 31,
    question: "Beaufort 0 (Calm) hangi deniz durumunu tanımlar?",
    options: [
      "Ayna gibi deniz, <1 knot",
      "Küçük dalgalar, 4-6 knot",
      "Köpüklü tepeler, 20 knot",
      "Kırılan dalgalar, 30 knot"
    ],
    correctAnswer: 0,
    explanation: "Beaufort 0: rüzgâr 1 knot'tan az; deniz ayna gibidir.",
    category: "Beaufort"
  },
  {
    id: 32,
    question: "Sirrus (Ci) bulutları aşağıdakilerden hangisiyle tanımlanır?",
    options: [
      "Alçak seviye yağmur bulutu",
      "Dikey gelişen fırtına bulutu",
      "Yüksek seviye ince buz bulutu",
      "Yer seviyesindeki sis tabakası"
    ],
    correctAnswer: 2,
    explanation: "Sirrus, yüksek troposferde buz kristallerinden oluşan ince beyaz lifli bulutlardır; sıklıkla cephe yaklaşımının ilk işaretidir.",
    category: "Bulutlar"
  },
  {
    id: 33,
    question: "Stratus (St) bulutu tipik olarak hangi havayla ilişkilidir?",
    options: [
      "Düşük gri örtü; çiseleme",
      "Şiddetli gök gürültülü fırtına",
      "Açık ve güneşli sakin hava",
      "Dolu fırtınası ve şimşek"
    ],
    correctAnswer: 0,
    explanation: "Stratus alçak, gri tabaka bulutudur; çiseleme ve azalan görüşle ilişkilidir.",
    category: "Bulutlar"
  },
  {
    id: 34,
    question: "Bulut yükseklik sınıflandırmasında 'alto' öneki hangi seviyeyi belirtir?",
    options: [
      "Alçak seviye bulutları",
      "Orta seviye (2-7 km) bulutlar",
      "Yüksek seviye bulutları",
      "Yer seviyesi sis tabakası"
    ],
    correctAnswer: 1,
    explanation: "Altocumulus ve altostratus orta seviye (genelde 2–7 km) bulutlarıdır.",
    category: "Bulutlar"
  },
  {
    id: 35,
    question: "Oklüzyon (occluded) cephesi nasıl oluşur?",
    options: [
      "İki yüksek basınç alanının birleşmesiyle",
      "Soğuk cephenin sıcağa yetişmesiyle",
      "Sıcak cephenin yok olmasıyla",
      "Yalnızca tropik bölgelerde"
    ],
    correctAnswer: 1,
    explanation: "Soğuk cephe sıcak cepheye yetişir, sıcak sektör yerden kaldırılır ve oklüzyon cephesi oluşur.",
    category: "Cepheler"
  },
  {
    id: 36,
    question: "Soğuk cephe geçtikten sonra rüzgâr yönü Kuzey yarımkürede tipik olarak nasıl değişir?",
    options: [
      "Geri döner (backing) yönünde",
      "Tamamen kesilir ve durur",
      "Saat yönünde döner (veering)",
      "Hiçbir şekilde değişmez"
    ],
    correctAnswer: 2,
    explanation: "KH'de soğuk cephe geçişinde rüzgâr genellikle veer eder (saat yönünde), basınç yükselir ve hava temizlenir.",
    category: "Cepheler"
  },
  {
    id: 37,
    question: "Sıcak cephenin eğimi (slope) soğuk cepheye göre nasıldır?",
    options: [
      "Daha yatık; yağış bandı geniş",
      "Daha dik bir eğim açısına sahiptir",
      "Tamamen dikey konumdadır",
      "Soğuk cepheyle aynıdır"
    ],
    correctAnswer: 0,
    explanation: "Sıcak cephe yatık eğimlidir; geniş ve uzun süreli tabaka bulutu/yağış üretir. Soğuk cephe diktir ve dar konvektif yağış verir.",
    category: "Cepheler"
  },
  {
    id: 38,
    question: "Radyasyon (yer) sisi tipik olarak hangi koşulda oluşur?",
    options: [
      "Açık, sakin gecede karada",
      "Rüzgârlı ve bulutlu gecelerde",
      "Öğle vakti güçlü güneşte",
      "Fırtına sırasında denizde"
    ],
    correctAnswer: 0,
    explanation: "Radyasyon sisi açık, sakin gecelerde karada yüzey soğumasıyla oluşur; gündüz ısınınca dağılır. Denizde nadirdir.",
    category: "Sis"
  },
  {
    id: 39,
    question: "Buharlaşma (steam/arctic sea smoke) sisi nasıl oluşur?",
    options: [
      "Çok soğuk hava sıcak su üstünde",
      "Sıcak hava soğuk su üstüne gelince",
      "Yağmurdan hemen sonra",
      "Yüksek basınç altında"
    ],
    correctAnswer: 0,
    explanation: "Soğuk hava sıcak su üstüne gelince su yüzeyinden buharlaşan nem hemen yoğuşur; 'sea smoke' (deniz dumanı) oluşur.",
    category: "Sis"
  },
  {
    id: 40,
    question: "Tropikal dönen fırtınada (TRS) 'tehlikeli yarım daire' (dangerous semicircle) Kuzey yarımkürede neresidir?",
    options: [
      "İlerleme yönüne göre sol taraf",
      "İlerleme yönüne göre sağ taraf",
      "Fırtınanın tam merkezi",
      "Fırtınanın arka tarafı"
    ],
    correctAnswer: 1,
    explanation: "KH'de fırtınanın hareket yönüne göre sağ yarım dairede rüzgâr hızı ve ilerleme hızı toplandığından en tehlikeli bölgedir.",
    category: "Tropikal Fırtına"
  },
  {
    id: 41,
    question: "Kuzey yarımkürede tehlikeli yarım dairede bulunan bir gemi için klasik kaçınma manevrası nedir?",
    options: [
      "Rüzgârı kıçtan alıp merkeze gitmek",
      "Sancak baş omuzlukta tutup kaçmak",
      "Demir atıp fırtınayı beklemek",
      "Rüzgâra doğru dönüş yapmak"
    ],
    correctAnswer: 1,
    explanation: "KH tehlikeli yarım dairede gemi rüzgârı sancak baş omuzluğunda tutup hız yaparak fırtına izinden çıkmaya çalışır.",
    category: "Tropikal Fırtına"
  },
  {
    id: 42,
    question: "Barometrede sürekli ve belirgin düşüşle birlikte uzun periyotlu swell gelmesi okyanusta neyin habercisi olabilir?",
    options: [
      "Sakin hava koşulları geliyor",
      "Yaklaşan tropikal dönen fırtına",
      "Yoğun sis oluşacağını",
      "Yüksek basınç yaklaşıyor"
    ],
    correctAnswer: 1,
    explanation: "Olağandışı uzun periyotlu swell ve düşen basınç, ufuktaki bir TRS'nin erken işaretleri olabilir.",
    category: "Tropikal Fırtına"
  },
  {
    id: 43,
    question: "Kuzey Atlantik ve Kuzey Pasifik'te tropikal dönen fırtınalara verilen yaygın adlar nelerdir?",
    options: [
      "Sırasıyla hurricane ve typhoon",
      "İkisinde de cyclone",
      "Sırasıyla typhoon ve hurricane",
      "İkisinde de willy-willy"
    ],
    correctAnswer: 0,
    explanation: "Kuzey Atlantik/Doğu Pasifik'te 'hurricane', Kuzeybatı Pasifik'te 'typhoon' adı kullanılır.",
    category: "Tropikal Fırtına"
  },
  {
    id: 44,
    question: "Hava routeing (weather routeing) servislerinin temel amacı nedir?",
    options: [
      "Yakıt fiyatını belirlemek",
      "Uğranacak varış limanını belirleyip seçmek",
      "En güvenli, verimli rotayı önermek",
      "Mürettebat vardiya planı yapmak"
    ],
    correctAnswer: 2,
    explanation: "Weather routeing, meteoroloji tahminlerini kullanarak en uygun rotayı önerir; güvenlik, zaman ve yakıt optimizasyonu sağlar.",
    category: "Hava Routeing"
  },
  {
    id: 45,
    question: "Swell ile rüzgâr (sea) dalgaları arasındaki temel fark nedir?",
    options: [
      "Swell yerelde oluşur, sea uzaktan gelir",
      "Sea yerel kısa, swell uzun periyot",
      "İkisi tamamen aynı olgudur",
      "Swell yalnızca sığ suda olur"
    ],
    correctAnswer: 1,
    explanation: "Sea, mevcut yerel rüzgârın ürettiği kısa ve düzensiz dalgalardır; swell ise alandan uzaklaşmış, uzun ve düzenli dalgalardır.",
    category: "Dalgalar"
  },
  {
    id: 46,
    question: "Dalga oluşumunda 'fetch' (kabarma mesafesi) neyi ifade eder?",
    options: [
      "Rüzgârın estiği açık su boyu",
      "Oluşan dalga yüksekliği",
      "Dalganın salınım periyodu",
      "Bölgedeki su derinliği"
    ],
    correctAnswer: 0,
    explanation: "Fetch, rüzgârın kesintisiz estiği mesafedir; fetch, rüzgâr hızı ve süresi arttıkça dalga yüksekliği büyür.",
    category: "Dalgalar"
  },
  {
    id: 47,
    question: "Anemometre hangi büyüklüğü ölçer?",
    options: ["Hava basıncını", "Bağıl nemi", "Rüzgâr hızını", "Hava sıcaklığını"],
    correctAnswer: 2,
    explanation: "Anemometre rüzgâr hızını (ve genellikle yönünü) ölçen alettir.",
    category: "Ölçüm"
  },
  {
    id: 48,
    question: "Geostrofik rüzgâr (geostrophic wind) hangi iki kuvvetin dengesiyle açıklanır?",
    options: [
      "Basınç gradyanı ve Coriolis",
      "Sürtünme ve yerçekimi",
      "Gelgit ve rüzgâr kuvveti",
      "Yalnızca Coriolis kuvvetinin etkisi"
    ],
    correctAnswer: 0,
    explanation: "Yüksek atmosferde sürtünmenin ihmal edildiği yerde rüzgâr, basınç gradyan kuvveti ve Coriolis dengesinde izobarlara paralel eser.",
    category: "Dinamik"
  },
  {
    id: 49,
    question: "Yüzey rüzgârı, sürtünme nedeniyle geostrofik rüzgâra göre izobarlara göre nasıl davranır?",
    options: [
      "İzobarları keserek alçağa eser",
      "İzobarlara tam dik eser",
      "İzobarlara tam paralel eser",
      "Hiçbir şekilde değişmez"
    ],
    correctAnswer: 0,
    explanation: "Yüzeyde sürtünme rüzgârı yavaşlatır ve alçak basınca doğru izobarları belirli bir açıyla kesmesine yol açar.",
    category: "Dinamik"
  },
  {
    id: 50,
    question: "Denizcilikte 'significant wave height' (belirgin dalga yüksekliği, Hs) ne anlama gelir?",
    options: [
      "En yüksek tek dalganın boyu",
      "Tüm dalgaların ortalaması",
      "En yüksek 1/3'ün ortalaması",
      "En düşük dalganın boyu"
    ],
    correctAnswer: 2,
    explanation: "Hs, gözlenen dalgaların en yüksek 1/3'ünün ortalama yüksekliğidir; deneyimli gözlemcinin tahminine yakındır.",
    category: "Dalgalar"
  },
  {
    id: 51,
    question: "Sinoptik haritada cephe sembollerinde sıcak cephe nasıl gösterilir?",
    options: [
      "Kırmızı yarım dairelerle",
      "Mavi üçgenlerle gösterilir",
      "Mor karışık sembollerle",
      "Kesik çizgiyle gösterilir"
    ],
    correctAnswer: 0,
    explanation: "Sıcak cephe kırmızı yarım dairelerle, soğuk cephe mavi üçgenlerle, oklüzyon mor (üçgen+yarım daire) ile gösterilir.",
    category: "Sinoptik Harita"
  }
];

export const meteorologyQuestions: QuizQuestion[] = [
  ...baseMeteorologyQuestions,
  ...meteorologyQuestionsExtended,
  ...meteorologyQuestionsTopicFill,
];

