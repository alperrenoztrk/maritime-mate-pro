import type { QuizQuestion } from "@/types/quiz";
import { economicsQuestionsExtended } from "@/data/economicsQuestionsExtended";

/**
 * Şıklar birbirine yakın uzunlukta tutulur ve gerekçe `explanation` alanında
 * kalır: doğru şık gerekçesini de taşıyan tek uzun cümle olduğunda soru bilgi
 * yerine biçim ölçer ("en uzun şıkkı seç"). Çeldiriciler alanda gerçekten
 * karşılığı olan ama bu soruda yanlış olan iddialardır.
 */
const baseEconomicsQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Voyage charter (sefer çarteri) nedir?",
    options: [
      "Belirli bir yükün iki liman arasında tek seferde taşınması",
      "Geminin belirli bir süre boyunca kiracının emrine verilmesi",
      "Geminin mürettebatsız ve donanımsız olarak kiraya verilmesi",
      "Belirli bir hat üzerinde tarifeli servis taahhüdü verilmesi"
    ],
    correctAnswer: 0,
    explanation: "Voyage charter'da gemi, belirli bir yükü bir limandan diğerine taşımak üzere tek (veya belirli) sefer için kiralanır; navlun genellikle ton başına ödenir.",
    category: "Çarter Türleri"
  },
  {
    id: 2,
    question: "Time charter (zaman çarteri) nedir?",
    options: [
      "Geminin tek bir sefer için yük başına navlunla tutulması",
      "Geminin mürettebatı ve sigortası kiracıya geçecek şekilde tutulması",
      "Geminin belirli bir süre için tutulması; teknik yönetim donatanda",
      "Geminin belirli bir hat için konsorsiyum ortaklığına verilmesi"
    ],
    correctAnswer: 2,
    explanation: "Time charter'da gemi belirli bir süre kiralanır; donatan teknik işletmeyi (mürettebat, bakım) üstlenir, kiracı ticari kullanım ve yakıt/liman masraflarını öder.",
    category: "Çarter Türleri"
  },
  {
    id: 3,
    question: "Bareboat (çıplak gemi) çarterinde ne olur?",
    options: [
      "Kiracı gemiyi mürettebat, bakım ve işletme dahil kontrolüne alır",
      "Donatan mürettebatı ve bakımı sağlamayı sürdürür, kiracı yükü verir",
      "Kiracı yalnızca tek sefer için ambar kapasitesini satın alır",
      "Donatan ticari yönetimi alır, kiracı teknik yönetimi üstlenir"
    ],
    correctAnswer: 0,
    explanation: "Bareboat (demise) çarterinde kiracı, gemiyi mürettebatlandırma, bakım ve işletme dahil tam kontrolünü alır; donatan yalnızca gemiyi sağlar.",
    category: "Çarter Türleri"
  },
  {
    id: 4,
    question: "Time charter'da yakıt (bunker) masraflarını kim öder?",
    options: ["Donatan (owner)", "Kiracı (charterer)", "Liman idaresi", "Sigortacı"],
    correctAnswer: 1,
    explanation: "Time charter'da yakıt ve liman/kanal masraflarını kiracı öder; donatan mürettebat, bakım ve sigorta gibi gemi işletme masraflarını üstlenir.",
    category: "Çarter Türleri"
  },
  {
    id: 5,
    question: "NOR (Notice of Readiness) nedir?",
    options: [
      "Yükün manifestoda beyan edilen miktarını doğrulayan resmi belge",
      "Geminin yükleme veya boşaltmaya hazır olduğunu bildiren ihbar",
      "Navlunun tahsil edildiğini gösteren resmi ödeme bildirimi",
      "Sefer planının kiracı tarafından onaylandığını gösteren yazı"
    ],
    correctAnswer: 1,
    explanation: "NOR, geminin her bakımdan yükleme veya boşaltmaya hazır olduğunu kiracıya/acenteye bildiren resmi ihbardır; laytime'ın başlamasını tetikler.",
    category: "Laytime/NOR"
  },
  {
    id: 6,
    question: "Laytime nedir?",
    options: [
      "Geminin iki liman arasında denizde geçirdiği toplam sefer süresi",
      "Planlı bakım için gemiye tanınan yıllık kesinti süresi",
      "Yükleme ve boşaltma için kiracıya tanınan sözleşmesel süre",
      "Navlunun ödenmesi için sözleşmede verilen ödeme süresi"
    ],
    correctAnswer: 2,
    explanation: "Laytime, navlun karşılığında yükleme/boşaltma için kiracıya tanınan, çarter partide belirlenmiş zaman dilimidir.",
    category: "Laytime/NOR"
  },
  {
    id: 7,
    question: "Demurrage nedir?",
    options: [
      "İşlemler erken bittiğinde kiracıya ödenen teşvik primi",
      "Navlun üzerinden kiracı lehine yapılan komisyon indirimi",
      "Rıhtımda bekleyen gemi için limana ödenen bekleme ücreti",
      "Laytime aşıldığında kiracının donatana ödediği tazminat"
    ],
    correctAnswer: 3,
    explanation: "Demurrage, kiracının tanınan laytime'ı aşması durumunda gemiyi bekletmesi nedeniyle donatana ödediği günlük tazminattır.",
    category: "Laytime/NOR"
  },
  {
    id: 8,
    question: "Despatch (despatch money) nedir?",
    options: [
      "Laytime aşıldığında kiracının donatana ödediği gecikme cezası",
      "İşlemler laytime dolmadan bitince donatanın ödediği prim",
      "Navlunun bir kısmının yükleme öncesi peşin olarak alınması",
      "Acentenin sefer başına aldığı hizmet komisyonu bedeli"
    ],
    correctAnswer: 1,
    explanation: "Despatch, kiracı işlemleri laytime dolmadan tamamlarsa donatanın kiracıya ödediği ödüldür; genellikle demurrage oranının yarısıdır.",
    category: "Laytime/NOR"
  },
  {
    id: 9,
    question: "Demurrage hakkında doğru olan ifade hangisidir?",
    options: [
      "Demurrage süresi hafta sonu ve resmi tatillerde işlemez",
      "Demurrage tutarı navlunun içinde peşinen hesaplanmıştır",
      "Demurrage başladıktan sonra laytime istisnaları işlemez",
      "Demurrage yalnızca yükleme limanında talep edilebilir"
    ],
    correctAnswer: 2,
    explanation: "'Once on demurrage, always on demurrage' ilkesine göre, demurrage başladıktan sonra laytime istisnaları (tatil, kötü hava vb.) genellikle işlemez.",
    category: "Laytime/NOR"
  },
  {
    id: 10,
    question: "Charter Party (çarter parti) nedir?",
    options: [
      "Gemi teknesini ve makinelerini kapsayan tekne sigortası poliçesi",
      "Yükün varışta teslim edildiğini gösteren teslim belgesi",
      "Liman hizmet ücretlerini gösteren resmi liman tarifesi",
      "Donatan ile kiracı arasındaki gemi kira/taşıma sözleşmesi"
    ],
    correctAnswer: 3,
    explanation: "Charter Party, geminin tamamının veya bir kısmının kiralanmasına ilişkin donatan ile kiracı arasındaki sözleşmedir.",
    category: "Çarter Parti Maddeleri"
  },
  {
    id: 11,
    question: "Voyage charter'da navlun (freight) genellikle nasıl hesaplanır?",
    options: [
      "Taşınan yük tonajı başına veya götürü (lumpsum) olarak",
      "Sefer süresine bağlı günlük kira oranı üzerinden",
      "Uğranan liman sayısı ve rıhtımda geçen süreye göre",
      "Mürettebat sayısı ve makine gücü esas alınarak"
    ],
    correctAnswer: 0,
    explanation: "Voyage charter'da navlun, taşınan yük tonajı başına (rate per ton) veya tüm sefer için götürü (lumpsum) bedel olarak belirlenir.",
    category: "Navlun/TCE"
  },
  {
    id: 12,
    question: "TCE (Time Charter Equivalent) neyi ölçer?",
    options: [
      "Geminin yaşına göre hesaplanan piyasa değerini",
      "Sefer masrafları düşülmüş günlük net sefer kazancını",
      "Günlük yakıt tüketiminin katedilen sefer mesafesine oranını",
      "Yıllık sigorta priminin gemi değerine oranını"
    ],
    correctAnswer: 1,
    explanation: "TCE, sefer gelirlerinden sefer masrafları (yakıt, liman vb.) düşülüp sefer süresine bölünerek bulunan, time charter hadleriyle kıyaslanabilen günlük net kazançtır.",
    category: "Navlun/TCE"
  },
  {
    id: 13,
    question: "Incoterms 2020 neyi düzenler?",
    options: [
      "Gemi inşa ve klaslama standartlarını belirler",
      "Deniz yükü sigortasının kapsamını standartlaştırır",
      "Alıcı-satıcı arasında masraf, risk ve teslimi düzenler",
      "Liman güvenlik denetimlerinin usulünü düzenler"
    ],
    correctAnswer: 2,
    explanation: "Incoterms 2020 (ICC), uluslararası mal satışında masrafların, risklerin ve teslim yükümlülüklerinin alıcı ile satıcı arasında nasıl paylaşıldığını standartlaştırır.",
    category: "Incoterms 2020"
  },
  {
    id: 14,
    question: "FOB (Free On Board) Incoterms terimi ne anlama gelir?",
    options: [
      "Satıcı malı varış limanına kadar taşımayı üstlenir",
      "Alıcı malı satıcının tesisinden kendi aracıyla alır",
      "Satıcı navlunla birlikte asgari yük sigortasını da yaptırır",
      "Risk, mal yükleme limanında gemiye yüklendiğinde geçer"
    ],
    correctAnswer: 3,
    explanation: "FOB'de satıcı malı yükleme limanında gemiye yükler; bu noktadan itibaren masraf ve risk alıcıya geçer. FOB yalnızca deniz/iç su taşımasında kullanılır.",
    category: "Incoterms 2020"
  },
  {
    id: 15,
    question: "CIF (Cost, Insurance and Freight) teriminde satıcı neyi üstlenir?",
    options: [
      "Navlun ve asgari sigortayı; risk yüklemede alıcıya geçer",
      "Yalnızca malın bedelini; taşıma tümüyle alıcıya aittir",
      "Navlun, sigorta ve varış ülkesindeki ithalat gümrüğünü",
      "Yalnızca ihracat gümrüğünü ve terminale kadar olan taşımayı"
    ],
    correctAnswer: 0,
    explanation: "CIF'te satıcı varış limanına kadar navlunu ve sigortayı öder; ancak hasar riski mal gemiye yüklendiğinde alıcıya geçer. Yalnızca deniz/iç su taşımasında kullanılır.",
    category: "Incoterms 2020"
  },
  {
    id: 16,
    question: "EXW (Ex Works) teriminde satıcının sorumluluğu nedir?",
    options: [
      "Malı varış limanında gemiden boşaltarak teslim eder",
      "Malı kendi tesisinde alıcının emrine hazır bulundurur",
      "Malı ihracat gümrüğünü yaparak taşıyıcıya teslim eder",
      "Malı varış yerine kadar navlunu ödeyerek gönderir"
    ],
    correctAnswer: 1,
    explanation: "EXW, satıcı için en az yükümlü terimdir; satıcı malı kendi tesisinde hazır eder, bundan sonraki tüm masraf ve risk alıcıya aittir.",
    category: "Incoterms 2020"
  },
  {
    id: 17,
    question: "DDP (Delivered Duty Paid) teriminde satıcı neye kadar sorumludur?",
    options: [
      "Malı yükleme limanında gemiye yüklemeye kadar",
      "Malı yalnızca kendi tesisinin çıkışına kadar",
      "İthalat vergileri dahil varıştaki teslim yerine kadar",
      "Malı varış limanı terminaline boşaltmaya kadar"
    ],
    correctAnswer: 2,
    explanation: "DDP, satıcı için en fazla yükümlülüğü içeren terimdir; satıcı ithalat gümrük masrafları dahil malı varış yerine kadar teslim eder.",
    category: "Incoterms 2020"
  },
  {
    id: 18,
    question: "Incoterms 2020'de DAT terimi hangi terimle değiştirilmiştir?",
    options: ["DAP", "DPU", "CIP", "FCA"],
    correctAnswer: 1,
    explanation: "Incoterms 2020'de DAT (Delivered at Terminal), boşaltmanın herhangi bir yerde yapılabileceğini vurgulamak için DPU (Delivered at Place Unloaded) olarak değiştirilmiştir.",
    category: "Incoterms 2020"
  },
  {
    id: 19,
    question: "Konişmento (Bill of Lading) hangi işlevlere sahiptir?",
    options: [
      "Yalnızca yükün teslim alındığını gösteren makbuz",
      "Yalnızca taşıma sözleşmesinin yazılı delili",
      "Yalnızca gümrük beyanına esas alınan resmi belge",
      "Makbuz, sözleşme delili ve mülkiyeti temsil eden evrak"
    ],
    correctAnswer: 3,
    explanation: "Konişmento üç işlev görür: yükün teslim alındığına dair makbuz, taşıma sözleşmesinin delili ve malın mülkiyetini temsil eden kıymetli evrak.",
    category: "Konişmento/Hague-Visby"
  },
  {
    id: 20,
    question: "Hague-Visby Kuralları neyi düzenler?",
    options: [
      "Konişmento kapsamında taşıyanın sorumluluklarını",
      "Çarter parti sözleşmelerinin zorunlu hükümlerini",
      "Gemi finansmanında teminat ve ipotek düzenini",
      "Liman hizmet ücretlerinin üst sınırlarını"
    ],
    correctAnswer: 0,
    explanation: "Hague-Visby Kuralları, konişmento ile yapılan deniz taşımalarında taşıyanın asgari sorumluluklarını ve sorumluluk sınırlarını belirler.",
    category: "Konişmento/Hague-Visby"
  },
  {
    id: 21,
    question: "'Clean' bir konişmento ne anlama gelir?",
    options: [
      "Navlunun tamamının peşin ödendiğini gösterir",
      "Yükün hasar/eksiklik şerhi olmadan alındığını",
      "Yükün taşıma boyunca sigortalı olduğunu gösterir",
      "Ambarların yük öncesi temiz olduğunu gösterir"
    ],
    correctAnswer: 1,
    explanation: "'Clean' konişmento, yükün görünür kusur ya da eksiklik şerhi (clause) olmaksızın iyi durumda teslim alındığını gösterir; aksi 'claused/dirty' B/L'dir.",
    category: "Konişmento/Hague-Visby"
  },
  {
    id: 22,
    question: "'Freight prepaid' ifadesi konişmentoda ne anlama gelir?",
    options: [
      "Navlun varış limanında alıcı tarafından ödenecektir",
      "Navlun yük sigortası primine dahil edilmiştir",
      "Navlun yükleme sırasında peşin olarak ödenmiştir",
      "Navlun demurrage tahakkuk edince mahsup edilecektir"
    ],
    correctAnswer: 2,
    explanation: "'Freight prepaid', navlunun gönderici tarafından önceden ödendiğini gösterir; 'freight collect' ise varışta alıcı tarafından ödeneceğini belirtir.",
    category: "Navlun/TCE"
  },
  {
    id: 23,
    question: "Bunker terimi denizcilikte neyi ifade eder?",
    options: [
      "Yükün taşındığı ambar veya tank hacmini",
      "Demir ve zincir donanımının bulunduğu bölümü",
      "Balast olarak alınan deniz suyu miktarını",
      "Geminin makinelerinde kullanılan yakıtı"
    ],
    correctAnswer: 3,
    explanation: "Bunker, geminin makinelerinde kullanılan yakıtı (HFO, VLSFO, MGO vb.) ifade eder; bunkering ise yakıt ikmali işlemidir.",
    category: "Yakıt/Bunker"
  },
  {
    id: 24,
    question: "IMO 2020 kuralı uyarınca açık denizde kullanılan yakıttaki azami kükürt oranı nedir?",
    options: ["%3.5", "%1.0", "%0.5", "%0.1"],
    correctAnswer: 2,
    explanation: "1 Ocak 2020'den itibaren ECA dışı alanlarda gemi yakıtındaki azami kükürt içeriği kütlece %0.50'ye indirilmiştir (önceki sınır %3.50 idi).",
    category: "Yakıt/Bunker"
  },
  {
    id: 25,
    question: "ECA/SECA bölgelerinde izin verilen azami yakıt kükürt oranı nedir?",
    options: ["%0.10", "%0.50", "%1.50", "%3.50"],
    correctAnswer: 0,
    explanation: "Emisyon Kontrol Alanlarında (ECA/SECA) yakıttaki azami kükürt oranı kütlece %0.10'dur.",
    category: "Yakıt/Bunker"
  },
  {
    id: 26,
    question: "Geminin işletme masrafları (OPEX) hangisini içerir?",
    options: [
      "Mürettebat, bakım, kumanya, yağ, sigorta ve idari gider",
      "Yakıt, liman ve kanal ücretleri ile acente masrafları",
      "Kredi anapara, faiz ve amortisman gibi finansman gideri",
      "Yük elleçleme, istifleme ve terminal hizmet bedelleri"
    ],
    correctAnswer: 0,
    explanation: "İşletme (running/OPEX) masrafları mürettebat, bakım, kumanya/stok, yağlar, sigorta ve genel idari giderleri kapsar; yakıt ve liman masrafları ise sefer masraflarıdır.",
    category: "Gemi Maliyetleri"
  },
  {
    id: 27,
    question: "Sefer masrafları (voyage costs) hangilerini içerir?",
    options: [
      "Mürettebat maaşı, bakım-onarım ve sigorta primleri",
      "Yakıt, liman/kanal ücretleri ve acente masrafları",
      "Kredi geri ödemesi, faiz ve sermaye amortismanı",
      "Kuru havuz, sörvey ve klas belgelendirme giderleri"
    ],
    correctAnswer: 1,
    explanation: "Sefer masrafları belirli bir sefere bağlı değişken giderlerdir: yakıt (bunker), liman ve kanal ücretleri, kılavuzluk, römorkaj ve acente masrafları.",
    category: "Gemi Maliyetleri"
  },
  {
    id: 28,
    question: "Sermaye maliyeti (capital costs) gemi işletmesinde neyi ifade eder?",
    options: [
      "Sefer başına değişen yakıt ve liman giderlerini",
      "Mürettebat maaşı ve kumanya gibi düzenli giderleri",
      "Gemi alımının finansmanına bağlı kredi ve faizi",
      "Yük elleçleme ve terminal kullanım bedellerini"
    ],
    correctAnswer: 2,
    explanation: "Sermaye maliyetleri, geminin alımının finansmanına bağlı kredi anapara, faiz ve amortisman gibi giderlerdir.",
    category: "Gemi Maliyetleri"
  },
  {
    id: 29,
    question: "P&I (Protection and Indemnity) sigortası temel olarak neyi kapsar?",
    options: [
      "Geminin teknesi ve makinelerinin fiziksel hasarını",
      "Navlun kaybını ve sefer gelirindeki azalmayı",
      "Yakıt fiyatı dalgalanmasından doğan zararı",
      "Üçüncü şahıslara karşı doğan sorumlulukları"
    ],
    correctAnswer: 3,
    explanation: "P&I sigortası, donatanın üçüncü taraflara karşı sorumluluklarını (yük hasarı, kirlilik, çatma sorumluluğunun bir kısmı, personel zararları) karşılar.",
    category: "Sigorta (P&I/H&M)"
  },
  {
    id: 30,
    question: "H&M (Hull and Machinery) sigortası neyi kapsar?",
    options: [
      "Geminin teknesi ve makinelerinin fiziksel hasarını",
      "Üçüncü şahıslara karşı doğan sorumlulukları",
      "Yükün taşıma sırasındaki hasar ve kaybını",
      "Mürettebat maaş ve ülkeye iade masraflarını"
    ],
    correctAnswer: 0,
    explanation: "H&M sigortası, geminin teknesi ve makinelerinin çatma, oturma, yangın gibi rizikolardan kaynaklanan fiziksel hasarını karşılar.",
    category: "Sigorta (P&I/H&M)"
  },
  {
    id: 31,
    question: "P&I sigortası genellikle hangi yapı tarafından sağlanır?",
    options: [
      "Ticari sigorta şirketleri tek başına sağlar",
      "Karşılıklı esasa dayanan P&I Kulüpleri sağlar",
      "Bayrak devleti idaresi doğrudan sağlar",
      "Klas kuruluşları sertifikayla birlikte sağlar"
    ],
    correctAnswer: 1,
    explanation: "P&I sigortası, üyelerinin karşılıklı (mutual) esasla risk paylaştığı P&I Kulüpleri (örneğin International Group üyeleri) tarafından sağlanır.",
    category: "Sigorta (P&I/H&M)"
  },
  {
    id: 32,
    question: "Genel avarya (General Average) ilkesi neyi ifade eder?",
    options: [
      "Zararın tümüne yalnızca donatanın katlanmasını",
      "Zararın tümüne yalnızca yük sahibinin katlanmasını",
      "Ortak fedakarlığın menfaat sahiplerince paylaşılmasını",
      "Sigorta priminin sefer sonunda kısmen iadesini"
    ],
    correctAnswer: 2,
    explanation: "Genel avaryada, ortak tehlikeden kurtulmak için kasıtlı yapılan fedakarlık veya olağanüstü masraf, gemi ve yük menfaatleri arasında oranlı paylaşılır (York-Antwerp Kuralları).",
    category: "Sigorta (P&I/H&M)"
  },
  {
    id: 33,
    question: "Ship finance'te 'mortgage' (ipotek) ne işe yarar?",
    options: [
      "Gemiyi krediye karşı ayni teminat olarak göstermek",
      "Yakıt alımı için satıcıya teminat mektubu vermek",
      "Navlunu bankaya temlik ederek avans kullanmak",
      "Sigorta poliçesini lehdar değişikliğiyle devretmek"
    ],
    correctAnswer: 0,
    explanation: "Gemi ipoteği (ship mortgage), donatanın aldığı krediye karşılık gemiyi borç verene (bankaya) teminat olarak göstermesidir.",
    category: "Gemi Finansmanı"
  },
  {
    id: 34,
    question: "Demurrage oranı (rate) ile despatch oranı arasındaki tipik ilişki nedir?",
    options: [
      "Despatch, demurrage oranının iki katıdır",
      "Despatch ile demurrage her zaman eşittir",
      "Despatch, demurrage oranından yüksektir",
      "Despatch, demurrage oranının yarısıdır"
    ],
    correctAnswer: 3,
    explanation: "Piyasa teamülünde despatch oranı genellikle demurrage oranının yarısı kadardır (half despatch).",
    category: "Laytime/NOR"
  },
  {
    id: 35,
    question: "'Laycan' terimi çarter partide neyi ifade eder?",
    options: [
      "Yükleme ve boşaltma için tanınan toplam süre",
      "Geminin limana varması için tanınan tarih aralığı",
      "Navlunun ödenmesi için tanınan son ödeme tarihini",
      "Boşaltma limanında rıhtım tahsisi için sıra"
    ],
    correctAnswer: 1,
    explanation: "Laycan, geminin yüklemeye hazır olarak limana varması gereken en erken (layday) ve en geç (cancelling) tarih aralığıdır; bu tarihten sonra kiracı sözleşmeyi feshedebilir.",
    category: "Çarter Parti Maddeleri"
  },
  {
    id: 36,
    question: "'WIBON' (Whether In Berth Or Not) maddesi neyle ilgilidir?",
    options: [
      "Navlunun götürü mü ton başına mı olduğu",
      "Yakıtın kükürt oranına ilişkin taahhüt",
      "Rıhtıma yanaşmadan da NOR verilebilmesi",
      "Sigorta kapsamının savaş riskini içermesi"
    ],
    correctAnswer: 2,
    explanation: "WIBON maddesi, rıhtım dolu olsa bile geminin varış yerine ulaşıp NOR verebilmesine olanak tanır; böylece laytime başlayabilir.",
    category: "Çarter Parti Maddeleri"
  },
  {
    id: 37,
    question: "'Off-hire' (kira dışı) zaman charter'da ne anlama gelir?",
    options: [
      "Gemi hizmet veremediğinde kira ödemesinin durması",
      "Gemi gecikince kira oranının iki katına çıkması",
      "Navlunun piyasa endeksine göre yükseltilmesi",
      "Seferin kiracının talebiyle tümüyle iptal edilmesi"
    ],
    correctAnswer: 0,
    explanation: "Off-hire, arıza, kuru havuz, eksik mürettebat gibi nedenlerle gemi kiracıya tam hizmet veremediğinde charter hire ödemesinin durduğu süredir.",
    category: "Çarter Parti Maddeleri"
  },
  {
    id: 38,
    question: "FCA (Free Carrier) Incoterms terimi neyi ifade eder?",
    options: [
      "Satıcı malı varış limanında gemiden boşaltarak teslim eder",
      "Satıcı malı alıcının taşıyıcısına belirlenen yerde teslim eder",
      "Alıcı malı satıcının tesisinden kendi aracıyla teslim alır",
      "Satıcı ithalat gümrüğü dahil varış yerinde teslim eder"
    ],
    correctAnswer: 1,
    explanation: "FCA'da satıcı, malı ihracat gümrüğünü yapmış olarak alıcının atadığı taşıyıcıya belirlenen yerde teslim eder; her tür taşıma modunda kullanılabilir.",
    category: "Incoterms 2020"
  },
  {
    id: 39,
    question: "CFR (Cost and Freight) ile CIF arasındaki temel fark nedir?",
    options: [
      "CFR'de risk hiçbir aşamada alıcıya geçmemektedir",
      "CFR yalnızca havayolu taşımasında kullanılabilir",
      "CIF'te navlun varışta alıcı tarafından ödenir",
      "CFR'de satıcı sigorta yaptırmaz, CIF'te yaptırır"
    ],
    correctAnswer: 3,
    explanation: "CFR ve CIF benzerdir; her ikisinde de satıcı navlunu öder ancak CIF'te satıcı ayrıca asgari sigortayı da yaptırır, CFR'de yaptırmaz.",
    category: "Incoterms 2020"
  },
  {
    id: 40,
    question: "Hague-Visby Kurallarına göre taşıyanın 'due diligence' (gerekli özen) yükümlülüğü neyi içerir?",
    options: [
      "Navlunu sefer başlamadan önce peşin tahsil etmek",
      "Yükü tam değeri üzerinden sigortalatmak",
      "Sefer başında gemiyi denize elverişli kılmak",
      "Boşaltma limanını kiracı adına belirlemek"
    ],
    correctAnswer: 2,
    explanation: "Hague-Visby uyarınca taşıyan, sefer başlangıcında gemiyi denize ve yüke elverişli kılmak için gerekli özeni (due diligence) göstermekle yükümlüdür.",
    category: "Konişmento/Hague-Visby"
  },
  {
    id: 41,
    question: "Hague-Visby Kurallarında taşıyanın sorumluluk sınırı neye göre belirlenir?",
    options: [
      "Yalnızca tahsil edilen navlun tutarı kadar",
      "Paket başına veya kilogram başına SDR; yüksek olan",
      "Yalnızca seferin toplam süresine göre oranlı",
      "Gemideki mürettebat sayısıyla çarpılan tutar"
    ],
    correctAnswer: 1,
    explanation: "Hague-Visby'de sorumluluk, paket/ünite başına 666.67 SDR ya da kilogram başına 2 SDR'den yüksek olanıyla sınırlıdır.",
    category: "Konişmento/Hague-Visby"
  },
  {
    id: 42,
    question: "Time charter'da 'hire' (kira) genellikle nasıl ödenir?",
    options: [
      "Sefer sonunda tek kalemde ve gecikmeli olarak",
      "Taşınan yük tonajına göre boşaltmada hesaplanır",
      "Varış limanında acente aracılığıyla nakden",
      "Genellikle peşin ve düzenli aralıklarla ödenir"
    ],
    correctAnswer: 3,
    explanation: "Time charter hire genellikle peşin (in advance) olarak günlük orana göre belirli periyotlarla (örn. 15 günde bir) ödenir.",
    category: "Çarter Türleri"
  },
  {
    id: 43,
    question: "Tanker piyasasında navlun hadleri sıklıkla hangi endeksle ifade edilir?",
    options: ["Baltic Dry Index", "Worldscale", "LIBOR", "Brent"],
    correctAnswer: 1,
    explanation: "Tanker navlunları sıklıkla Worldscale sistemiyle ifade edilir; WS100 referans (flat) hadde, WS değeri bu temelin yüzdesini gösterir.",
    category: "Navlun/TCE"
  },
  {
    id: 44,
    question: "Baltic Dry Index (BDI) neyi ölçer?",
    options: [
      "Kuru dökme yük gemilerinin navlun seviyesini",
      "Ham petrol tankerlerinin navlun seviyesini",
      "Konteyner hatlarında birim taşıma ücretlerini",
      "Bunker yakıt fiyatlarındaki günlük değişimi"
    ],
    correctAnswer: 0,
    explanation: "BDI, Baltic Exchange tarafından yayınlanan ve kuru dökme yük (Capesize, Panamax, Supramax vb.) navlun seviyelerini gösteren bir endekstir.",
    category: "Navlun/TCE"
  },
  {
    id: 45,
    question: "Bunker fiyat riskine karşı kiracıyı korumak için time charter'da kullanılan mekanizma hangisi olabilir?",
    options: [
      "Demurrage oranının sözleşmede sabitlenmesi",
      "Despatch priminin yükleme limanında ödenmesi ve mahsubu",
      "BAF maddeleri veya bunker hedging kullanılması",
      "Genel avarya paylaşımına başvurulması"
    ],
    correctAnswer: 2,
    explanation: "Yakıt fiyat dalgalanmalarına karşı BAF (Bunker Adjustment Factor) maddeleri veya finansal hedging (bunker swap) gibi araçlar kullanılabilir.",
    category: "Yakıt/Bunker"
  },
  {
    id: 46,
    question: "Gemi finansmanında 'LTV' (Loan-to-Value) oranı neyi ifade eder?",
    options: [
      "Navlunun maliyete oranı",
      "Kredi tutarının geminin değerine oranı",
      "Sigorta priminin değere oranı",
      "Yakıt maliyetinin gelire oranı"
    ],
    correctAnswer: 1,
    explanation: "LTV, verilen kredinin geminin piyasa değerine oranıdır; bankalar tipik olarak değerin belirli bir yüzdesine kadar (ör. %60-70) finansman sağlar.",
    category: "Gemi Finansmanı"
  },
  {
    id: 47,
    question: "Gemi finansmanında 'sale and leaseback' nedir?",
    options: [
      "Geminin ömrünü tamamlayıp hurdaya satılması",
      "Geminin satılıp bareboat çarterle geri kiralanması",
      "İki donatanın gemilerini karşılıklı olarak takas etmesi",
      "Navlunun bankaya temlik edilip avans alınması"
    ],
    correctAnswer: 1,
    explanation: "Sale and leaseback'te donatan gemiyi bir finansöre satıp aynı gemiyi (genellikle bareboat) geri kiralayarak sermaye serbestleştirir.",
    category: "Gemi Finansmanı"
  },
  {
    id: 48,
    question: "Konişmentoda 'said to contain' (STC) şerhi ne anlama gelir?",
    options: [
      "Taşıyanın yük içeriğini tek tek doğruladığını",
      "Yükün taşıma boyunca sigortalandığını",
      "İçeriğin gönderici beyanına dayandığını",
      "Navlunun peşin olarak ödendiğini"
    ],
    correctAnswer: 2,
    explanation: "'Said to contain', özellikle konteyner taşımalarında içeriğin gönderici beyanına dayandığını ve taşıyanca tek tek doğrulanmadığını belirtir.",
    category: "Konişmento/Hague-Visby"
  },
  {
    id: 49,
    question: "'Deadfreight' (ölü navlun) nedir?",
    options: [
      "Taahhüt edilenden az yükleme halinde ödenen navlun",
      "Taşıma sırasında hasar gören yükün bedeli",
      "Boş dönüş seferi için alınan telafi navlunu",
      "Sigortadan tahsil edilen yük hasarı tazminatı"
    ],
    correctAnswer: 0,
    explanation: "Deadfreight, kiracının sözleşmede taahhüt ettiği tam yükü sağlayamaması halinde, taşınmayan miktar için donatana ödediği tazminat niteliğinde navlundur.",
    category: "Navlun/TCE"
  },
  {
    id: 50,
    question: "'Address commission' çarter partide neyi ifade eder?",
    options: [
      "Limana ödenen rıhtım ve hizmet ücretlerini",
      "Kiracı lehine navlun/kira üzerinden indirimi",
      "Brokere ödenen aracılık komisyonunun tamamını",
      "Sigortacıya ödenen yıllık prim payını"
    ],
    correctAnswer: 1,
    explanation: "Address commission, navlun veya hire üzerinden kiracı lehine yapılan ve fiilen kiracıya iade edilen bir komisyon/indirimdir; brokerage ise brokere ödenir.",
    category: "Çarter Parti Maddeleri"
  },
  {
    id: 51,
    question: "'Demise clause' ve 'Identity of Carrier' maddeleri neyle ilgilidir?",
    options: [
      "Yakıt kalitesi ve kükürt oranı taahhüdüyle",
      "Sigorta sorumluluk limitinin belirlenmesiyle",
      "Laytime hesabındaki istisna günleriyle",
      "Konişmentoda gerçek taşıyanın kim olduğuyla"
    ],
    correctAnswer: 3,
    explanation: "Bu maddeler, konişmentoda sorumlu taşıyanın donatan mı yoksa kiracı mı olduğunu belirleyerek yük sahibinin kime başvuracağını netleştirir.",
    category: "Konişmento/Hague-Visby"
  },
  {
    id: 52,
    question: "CIP (Carriage and Insurance Paid To) Incoterms 2020'de sigorta düzeyi açısından CIF'ten nasıl ayrılır?",
    options: [
      "CIP'te satıcı daha geniş (ICC A) sigorta yaptırır",
      "CIP'te sigorta yükümlülüğü hiç bulunmamaktadır",
      "CIP yalnızca deniz taşımasında kullanılabilmektedir",
      "CIP'te risk varışa kadar satıcıda kalmaktadır"
    ],
    correctAnswer: 0,
    explanation: "Incoterms 2020'de CIP, satıcının daha geniş kapsamlı (ICC A) sigorta yaptırmasını gerektirirken, CIF asgari (ICC C) sigortayı gerektirir.",
    category: "Incoterms 2020"
  }
];

export const economicsQuestions: QuizQuestion[] = [
  ...baseEconomicsQuestions,
  ...economicsQuestionsExtended,
];
