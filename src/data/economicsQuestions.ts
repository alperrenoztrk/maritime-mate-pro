import type { QuizQuestion } from "@/types/quiz";

export const economicsQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Voyage charter (sefer çarteri) nedir?",
    options: [
      "Geminin belirli bir süre için kiralanması",
      "Geminin belirli bir yük için belirli limanlar arasında bir sefer için kiralanması",
      "Geminin teknesinin çıplak kiralanması",
      "Geminin satılması"
    ],
    correctAnswer: 1,
    explanation: "Voyage charter'da gemi, belirli bir yükü bir limandan diğerine taşımak üzere tek (veya belirli) sefer için kiralanır; navlun genellikle ton başına ödenir.",
    category: "Çarter Türleri"
  },
  {
    id: 2,
    question: "Time charter (zaman çarteri) nedir?",
    options: [
      "Geminin tek sefer için kiralanması",
      "Geminin belirli bir süre için kiralanması; ticari yönetim kiracıda, teknik yönetim donatandadır",
      "Geminin tüm yönetimiyle çıplak kiralanması",
      "Geminin liman içinde kiralanması"
    ],
    correctAnswer: 1,
    explanation: "Time charter'da gemi belirli bir süre kiralanır; donatan teknik işletmeyi (mürettebat, bakım) üstlenir, kiracı ticari kullanım ve yakıt/liman masraflarını öder.",
    category: "Çarter Türleri"
  },
  {
    id: 3,
    question: "Bareboat (çıplak gemi) çarterinde ne olur?",
    options: [
      "Donatan mürettebatı sağlar",
      "Kiracı gemiyi mürettebat, bakım ve işletme dahil tam kontrolüne alır",
      "Sadece tek sefer kiralanır",
      "Navlun ton başına ödenir"
    ],
    correctAnswer: 1,
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
      "Yük manifestosu",
      "Geminin yükleme/boşaltmaya hazır olduğunu bildiren ihbar",
      "Navlun faturası",
      "Sefer planı"
    ],
    correctAnswer: 1,
    explanation: "NOR, geminin her bakımdan yükleme veya boşaltmaya hazır olduğunu kiracıya/acenteye bildiren resmi ihbardır; laytime'ın başlamasını tetikler.",
    category: "Laytime/NOR"
  },
  {
    id: 6,
    question: "Laytime nedir?",
    options: [
      "Geminin denizde geçirdiği süre",
      "Yükleme ve boşaltma için çarter sözleşmesinde kiracıya tanınan süre",
      "Bakım süresi",
      "Navlun ödeme süresi"
    ],
    correctAnswer: 1,
    explanation: "Laytime, navlun karşılığında yükleme/boşaltma için kiracıya tanınan, çarter partide belirlenmiş zaman dilimidir.",
    category: "Laytime/NOR"
  },
  {
    id: 7,
    question: "Laytime 4 gün olarak kararlaştırıldı; fiili yükleme 6.5 gün sürdü. Demurrage oranı $12,000/gün ise ödenecek demurrage nedir?",
    options: ["$18,000", "$30,000", "$48,000", "$78,000"],
    correctAnswer: 1,
    explanation: "Demurrage = (fiili süre − laytime) × oran = (6.5 − 4) × $12,000 = 2.5 × 12,000 = $30,000. Demurrage, laytime aşımının günlük tazminatıdır. (Trap: tüm süreyi 6.5×12,000=78,000 saymak.)",
    category: "Laytime/NOR"
  },
  {
    id: 8,
    question: "Laytime 5 gün; işlem 3.5 günde bitti. Demurrage oranı $16,000/gün ve despatch bunun yarısı ise donatanın ödeyeceği despatch nedir?",
    options: ["$8,000", "$12,000", "$16,000", "$24,000"],
    correctAnswer: 1,
    explanation: "Tasarruf = 5 − 3.5 = 1.5 gün. Despatch oranı = demurrage/2 = $8,000/gün. Despatch = 1.5 × 8,000 = $12,000. Despatch, laytime'dan erken bitirmenin primidir. (Trap: demurrage oranını 16,000 kullanmak → 24,000.)",
    category: "Laytime/NOR"
  },
  {
    id: 9,
    question: "Demurrage hakkında doğru olan ifade hangisidir?",
    options: [
      "Demurrage başladıktan sonra hafta sonu/tatil istisnaları uygulanmaz ('once on demurrage, always on demurrage')",
      "Demurrage hafta sonları durur",
      "Demurrage navluna dahildir",
      "Demurrage sadece yüklemede ödenir"
    ],
    correctAnswer: 0,
    explanation: "'Once on demurrage, always on demurrage' ilkesine göre, demurrage başladıktan sonra laytime istisnaları (tatil, kötü hava vb.) genellikle işlemez.",
    category: "Laytime/NOR"
  },
  {
    id: 10,
    question: "Charter Party (çarter parti) nedir?",
    options: [
      "Gemi sigorta poliçesi",
      "Donatan ile kiracı arasındaki gemi kira/taşıma sözleşmesi",
      "Yük teslim belgesi",
      "Liman tarifesi"
    ],
    correctAnswer: 1,
    explanation: "Charter Party, geminin tamamının veya bir kısmının kiralanmasına ilişkin donatan ile kiracı arasındaki sözleşmedir.",
    category: "Çarter Parti Maddeleri"
  },
  {
    id: 11,
    question: "50,000 ton yük $20/ton navlunla taşınıyor. %2.5 adres + %1.25 broker komisyonu düşülürse donatanın net navlunu nedir?",
    options: ["$1,000,000", "$981,250", "$962,500", "$925,000"],
    correctAnswer: 2,
    explanation: "Brüt navlun = 50,000 × $20 = $1,000,000. Toplam komisyon = %2.5 + %1.25 = %3.75 → $37,500. Net = 1,000,000 − 37,500 = $962,500. (Trap: komisyonu düşmemek → $1,000,000.)",
    category: "Navlun/TCE"
  },
  {
    id: 12,
    question: "Bir sefer $600,000 navlun getiriyor; sefer masrafları (yakıt+liman+kanal) $180,000 ve sefer 20 gün sürüyor. TCE (günlük net) yaklaşık nedir?",
    options: ["$9,000/gün", "$21,000/gün", "$30,000/gün", "$39,000/gün"],
    correctAnswer: 1,
    explanation: "TCE = (sefer geliri − sefer masrafları) ÷ sefer günü = (600,000 − 180,000) ÷ 20 = 420,000 ÷ 20 = $21,000/gün; time charter hire ile kıyaslanır. (Trap: masrafları düşmeyip 600,000/20 = 30,000 bulmak.)",
    category: "Navlun/TCE"
  },
  {
    id: 13,
    question: "Incoterms 2020 neyi düzenler?",
    options: [
      "Gemi inşa standartlarını",
      "Uluslararası ticarette alıcı-satıcı arasında masraf, risk ve teslim sorumluluklarını",
      "Denizcilik sigortasını",
      "Liman güvenliğini"
    ],
    correctAnswer: 1,
    explanation: "Incoterms 2020 (ICC), uluslararası mal satışında masrafların, risklerin ve teslim yükümlülüklerinin alıcı ile satıcı arasında nasıl paylaşıldığını standartlaştırır.",
    category: "Incoterms 2020"
  },
  {
    id: 14,
    question: "FOB (Free On Board) Incoterms terimi ne anlama gelir?",
    options: [
      "Satıcı malı varış limanına kadar taşır",
      "Satıcı malı yükleme limanında gemiye yüklediğinde risk alıcıya geçer",
      "Alıcı malı fabrikadan teslim alır",
      "Satıcı tüm taşıma ve sigortayı üstlenir"
    ],
    correctAnswer: 1,
    explanation: "FOB'de satıcı malı yükleme limanında gemiye yükler; bu noktadan itibaren masraf ve risk alıcıya geçer. FOB yalnızca deniz/iç su taşımasında kullanılır.",
    category: "Incoterms 2020"
  },
  {
    id: 15,
    question: "CIF (Cost, Insurance and Freight) teriminde satıcı neyi üstlenir?",
    options: [
      "Sadece malın bedelini",
      "Varış limanına kadar navlun ve asgari sigortayı; ancak risk yükleme limanında gemiye yüklemede geçer",
      "Hiçbir taşıma masrafını",
      "Varış ülkesindeki gümrüğü"
    ],
    correctAnswer: 1,
    explanation: "CIF'te satıcı varış limanına kadar navlunu ve sigortayı öder; ancak hasar riski mal gemiye yüklendiğinde alıcıya geçer. Yalnızca deniz/iç su taşımasında kullanılır.",
    category: "Incoterms 2020"
  },
  {
    id: 16,
    question: "EXW (Ex Works) teriminde satıcının sorumluluğu nedir?",
    options: [
      "Malı varış limanına teslim eder",
      "Malı kendi tesisinde alıcının emrine hazır eder; tüm taşıma riski alıcıdadır",
      "Tüm navlunu öder",
      "Sigortayı sağlar"
    ],
    correctAnswer: 1,
    explanation: "EXW, satıcı için en az yükümlü terimdir; satıcı malı kendi tesisinde hazır eder, bundan sonraki tüm masraf ve risk alıcıya aittir.",
    category: "Incoterms 2020"
  },
  {
    id: 17,
    question: "DDP (Delivered Duty Paid) teriminde satıcı neye kadar sorumludur?",
    options: [
      "Yükleme limanına kadar",
      "Varış ülkesindeki gümrük ve ithalat vergileri dahil belirtilen yere teslime kadar",
      "Sadece fabrika çıkışına kadar",
      "Sadece gemiye yüklemeye kadar"
    ],
    correctAnswer: 1,
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
      "Sadece makbuz",
      "Yük makbuzu, taşıma sözleşmesinin delili ve kıymetli evrak (mülkiyet belgesi)",
      "Sadece sigorta poliçesi",
      "Sadece gümrük beyannamesi"
    ],
    correctAnswer: 1,
    explanation: "Konişmento üç işlev görür: yükün teslim alındığına dair makbuz, taşıma sözleşmesinin delili ve malın mülkiyetini temsil eden kıymetli evrak.",
    category: "Konişmento/Hague-Visby"
  },
  {
    id: 20,
    question: "Hague-Visby Kuralları neyi düzenler?",
    options: [
      "Çarter parti hükümlerini",
      "Konişmento kapsamında taşıyanın sorumluluk ve yükümlülüklerini",
      "Gemi finansmanını",
      "Liman ücretlerini"
    ],
    correctAnswer: 1,
    explanation: "Hague-Visby Kuralları, konişmento ile yapılan deniz taşımalarında taşıyanın asgari sorumluluklarını ve sorumluluk sınırlarını belirler.",
    category: "Konişmento/Hague-Visby"
  },
  {
    id: 21,
    question: "'Clean' bir konişmento ne anlama gelir?",
    options: [
      "Navlunun ödendiği",
      "Yükün görünür hasar/eksiklik şerhi olmadan iyi durumda teslim alındığı",
      "Yükün sigortalı olduğu",
      "Geminin temiz olduğu"
    ],
    correctAnswer: 1,
    explanation: "'Clean' konişmento, yükün görünür kusur ya da eksiklik şerhi (clause) olmaksızın iyi durumda teslim alındığını gösterir; aksi 'claused/dirty' B/L'dir.",
    category: "Konişmento/Hague-Visby"
  },
  {
    id: 22,
    question: "'Freight prepaid' ifadesi konişmentoda ne anlama gelir?",
    options: [
      "Navlun varışta ödenecek",
      "Navlun yükleme sırasında peşin ödenmiştir",
      "Navlun ödenmeyecek",
      "Navlun sigortaya dahildir"
    ],
    correctAnswer: 1,
    explanation: "'Freight prepaid', navlunun gönderici tarafından önceden ödendiğini gösterir; 'freight collect' ise varışta alıcı tarafından ödeneceğini belirtir.",
    category: "Navlun/TCE"
  },
  {
    id: 23,
    question: "Bunker terimi denizcilikte neyi ifade eder?",
    options: [
      "Yük ambarını",
      "Geminin yakıtını (ör. HFO, MGO)",
      "Demir donanımını",
      "Balast suyunu"
    ],
    correctAnswer: 1,
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
      "Yakıt ve liman masrafları",
      "Mürettebat, bakım-onarım, kumanya, yağ, sigorta ve idari masraflar",
      "Sadece navlun",
      "Sadece yük elleçleme"
    ],
    correctAnswer: 1,
    explanation: "İşletme (running/OPEX) masrafları mürettebat, bakım, kumanya/stok, yağlar, sigorta ve genel idari giderleri kapsar; yakıt ve liman masrafları ise sefer masraflarıdır.",
    category: "Gemi Maliyetleri"
  },
  {
    id: 27,
    question: "Sefer masrafları (voyage costs) hangilerini içerir?",
    options: [
      "Mürettebat maaşı ve bakım",
      "Yakıt, liman/kanal ücretleri ve acente masrafları",
      "Sigorta primleri",
      "Sermaye geri ödemesi"
    ],
    correctAnswer: 1,
    explanation: "Sefer masrafları belirli bir sefere bağlı değişken giderlerdir: yakıt (bunker), liman ve kanal ücretleri, kılavuzluk, römorkaj ve acente masrafları.",
    category: "Gemi Maliyetleri"
  },
  {
    id: 28,
    question: "Sermaye maliyeti (capital costs) gemi işletmesinde neyi ifade eder?",
    options: [
      "Yakıt giderini",
      "Geminin satın alınması/finansmanı ile ilgili kredi geri ödemesi ve faiz gibi giderleri",
      "Liman ücretini",
      "Mürettebat maaşını"
    ],
    correctAnswer: 1,
    explanation: "Sermaye maliyetleri, geminin alımının finansmanına bağlı kredi anapara, faiz ve amortisman gibi giderlerdir.",
    category: "Gemi Maliyetleri"
  },
  {
    id: 29,
    question: "P&I (Protection and Indemnity) sigortası temel olarak neyi kapsar?",
    options: [
      "Geminin fiziksel teknesi ve makineleri",
      "Üçüncü şahıslara karşı sorumluluklar (yük hasarı, çevre kirliliği, mürettebat yaralanması vb.)",
      "Navlun kaybı",
      "Yakıt fiyat riski"
    ],
    correctAnswer: 1,
    explanation: "P&I sigortası, donatanın üçüncü taraflara karşı sorumluluklarını (yük hasarı, kirlilik, çatma sorumluluğunun bir kısmı, personel zararları) karşılar.",
    category: "Sigorta (P&I/H&M)"
  },
  {
    id: 30,
    question: "H&M (Hull and Machinery) sigortası neyi kapsar?",
    options: [
      "Üçüncü şahıs sorumluluklarını",
      "Geminin teknesi ve makinelerinin fiziksel hasarını",
      "Yük sigortasını",
      "Mürettebat maaşını"
    ],
    correctAnswer: 1,
    explanation: "H&M sigortası, geminin teknesi ve makinelerinin çatma, oturma, yangın gibi rizikolardan kaynaklanan fiziksel hasarını karşılar.",
    category: "Sigorta (P&I/H&M)"
  },
  {
    id: 31,
    question: "P&I sigortası genellikle hangi yapı tarafından sağlanır?",
    options: [
      "Ticari sigorta şirketleri tek başına",
      "Karşılıklı yardımlaşma esasına dayanan P&I Kulüpleri (mutual clubs)",
      "Devlet",
      "Sınıf kuruluşları"
    ],
    correctAnswer: 1,
    explanation: "P&I sigortası, üyelerinin karşılıklı (mutual) esasla risk paylaştığı P&I Kulüpleri (örneğin International Group üyeleri) tarafından sağlanır.",
    category: "Sigorta (P&I/H&M)"
  },
  {
    id: 32,
    question: "Genel avaryada $600,000'lık fedakârlık yapıldı. Kurtarılan toplam değer $30M (gemi $20M + yük $10M) ise yük ilgililerinin katkı payı nedir?",
    options: ["$100,000", "$200,000", "$300,000", "$400,000"],
    correctAnswer: 1,
    explanation: "Genel avarya katkısı, kurtarılan değer oranında paylaşılır (York-Antwerp Kuralları): yük payı = (10M ÷ 30M) × 600,000 = 1/3 × 600,000 = $200,000. Gemi 2/3 yani $400,000 öder. (Trap: gemi payını yükle karıştırmak.)",
    category: "Sigorta (P&I/H&M)"
  },
  {
    id: 33,
    question: "Ship finance'te 'mortgage' (ipotek) ne işe yarar?",
    options: [
      "Yakıt teminatı",
      "Gemiyi krediye karşı teminat olarak gösterme (ayni teminat)",
      "Navlun avansı",
      "Sigorta poliçesi"
    ],
    correctAnswer: 1,
    explanation: "Gemi ipoteği (ship mortgage), donatanın aldığı krediye karşılık gemiyi borç verene (bankaya) teminat olarak göstermesidir.",
    category: "Gemi Finansmanı"
  },
  {
    id: 34,
    question: "Demurrage oranı (rate) ile despatch oranı arasındaki tipik ilişki nedir?",
    options: [
      "Despatch demurrage'ın iki katıdır",
      "Despatch genellikle demurrage oranının yarısıdır",
      "İkisi her zaman eşittir",
      "Despatch demurrage'dan yüksektir"
    ],
    correctAnswer: 1,
    explanation: "Piyasa teamülünde despatch oranı genellikle demurrage oranının yarısı kadardır (half despatch).",
    category: "Laytime/NOR"
  },
  {
    id: 35,
    question: "'Laycan' terimi çarter partide neyi ifade eder?",
    options: [
      "Yükleme süresi",
      "Geminin yükleme limanına varması için tanınan zaman aralığı (layday/cancelling)",
      "Navlun ödeme tarihi",
      "Boşaltma süresi"
    ],
    correctAnswer: 1,
    explanation: "Laycan, geminin yüklemeye hazır olarak limana varması gereken en erken (layday) ve en geç (cancelling) tarih aralığıdır; bu tarihten sonra kiracı sözleşmeyi feshedebilir.",
    category: "Çarter Parti Maddeleri"
  },
  {
    id: 36,
    question: "'WIBON' (Whether In Berth Or Not) maddesi neyle ilgilidir?",
    options: [
      "Navlun hesabı",
      "NOR'un, gemi rıhtıma yanaşmamış olsa bile verilebilmesi",
      "Sigorta kapsamı",
      "Yakıt kalitesi"
    ],
    correctAnswer: 1,
    explanation: "WIBON maddesi, rıhtım dolu olsa bile geminin varış yerine ulaşıp NOR verebilmesine olanak tanır; böylece laytime başlayabilir.",
    category: "Çarter Parti Maddeleri"
  },
  {
    id: 37,
    question: "'Off-hire' (kira dışı) zaman charter'da ne anlama gelir?",
    options: [
      "Kiranın iki katına çıkması",
      "Geminin kiracıya hizmet veremediği sürelerde kira ödemesinin durması",
      "Navlunun artması",
      "Seferin iptali"
    ],
    correctAnswer: 1,
    explanation: "Off-hire, arıza, kuru havuz, eksik mürettebat gibi nedenlerle gemi kiracıya tam hizmet veremediğinde charter hire ödemesinin durduğu süredir.",
    category: "Çarter Parti Maddeleri"
  },
  {
    id: 38,
    question: "FCA (Free Carrier) Incoterms terimi neyi ifade eder?",
    options: [
      "Satıcı malı varış limanına teslim eder",
      "Satıcı malı, alıcının belirlediği taşıyıcıya belirlenen yerde teslim eder",
      "Alıcı malı fabrikadan alır",
      "Satıcı tüm gümrüğü öder"
    ],
    correctAnswer: 1,
    explanation: "FCA'da satıcı, malı ihracat gümrüğünü yapmış olarak alıcının atadığı taşıyıcıya belirlenen yerde teslim eder; her tür taşıma modunda kullanılabilir.",
    category: "Incoterms 2020"
  },
  {
    id: 39,
    question: "CFR (Cost and Freight) ile CIF arasındaki temel fark nedir?",
    options: [
      "CFR'de satıcı sigorta yaptırmaz, CIF'te yaptırır",
      "CFR'de risk alıcıya geçmez",
      "CFR sadece havayolu içindir",
      "CIF'te navlun alıcıya aittir"
    ],
    correctAnswer: 0,
    explanation: "CFR ve CIF benzerdir; her ikisinde de satıcı navlunu öder ancak CIF'te satıcı ayrıca asgari sigortayı da yaptırır, CFR'de yaptırmaz.",
    category: "Incoterms 2020"
  },
  {
    id: 40,
    question: "Hague-Visby Kurallarına göre taşıyanın 'due diligence' (gerekli özen) yükümlülüğü neyi içerir?",
    options: [
      "Navlunu tahsil etmek",
      "Sefer başında gemiyi denize elverişli (seaworthy) hale getirmek için gerekli özeni göstermek",
      "Yükü sigortalamak",
      "Limanı seçmek"
    ],
    correctAnswer: 1,
    explanation: "Hague-Visby uyarınca taşıyan, sefer başlangıcında gemiyi denize ve yüke elverişli kılmak için gerekli özeni (due diligence) göstermekle yükümlüdür.",
    category: "Konişmento/Hague-Visby"
  },
  {
    id: 41,
    question: "Hague-Visby Kurallarında taşıyanın sorumluluk sınırı neye göre belirlenir?",
    options: [
      "Sadece navlun tutarına",
      "Paket/birim başına veya brüt ağırlık (kilogram) başına SDR cinsinden, hangisi yüksekse",
      "Sadece sefer süresine",
      "Mürettebat sayısına"
    ],
    correctAnswer: 1,
    explanation: "Hague-Visby'de sorumluluk, paket/ünite başına 666.67 SDR ya da kilogram başına 2 SDR'den yüksek olanıyla sınırlıdır.",
    category: "Konişmento/Hague-Visby"
  },
  {
    id: 42,
    question: "Time charter'da 'hire' (kira) genellikle nasıl ödenir?",
    options: [
      "Sefer sonunda tek seferde",
      "Genellikle peşin (in advance) ve düzenli aralıklarla (ör. 15 günde bir)",
      "Yük tonajına göre",
      "Varış limanında"
    ],
    correctAnswer: 1,
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
      "Tanker navlunlarını",
      "Kuru dökme yük gemilerinin navlun seviyelerini",
      "Konteyner ücretlerini",
      "Yakıt fiyatlarını"
    ],
    correctAnswer: 1,
    explanation: "BDI, Baltic Exchange tarafından yayınlanan ve kuru dökme yük (Capesize, Panamax, Supramax vb.) navlun seviyelerini gösteren bir endekstir.",
    category: "Navlun/TCE"
  },
  {
    id: 45,
    question: "Bunker fiyat riskine karşı kiracıyı korumak için time charter'da kullanılan mekanizma hangisi olabilir?",
    options: [
      "BAF/bunker ayarlama maddeleri veya bunker hedging",
      "Demurrage",
      "Despatch",
      "Genel avarya"
    ],
    correctAnswer: 0,
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
      "Geminin hurdaya satılması",
      "Geminin satılıp aynı anda bareboat çarterle geri kiralanması yoluyla nakit sağlanması",
      "İki geminin takası",
      "Navlunun peşin alınması"
    ],
    correctAnswer: 1,
    explanation: "Sale and leaseback'te donatan gemiyi bir finansöre satıp aynı gemiyi (genellikle bareboat) geri kiralayarak sermaye serbestleştirir.",
    category: "Gemi Finansmanı"
  },
  {
    id: 48,
    question: "Konişmentoda 'said to contain' (STC) şerhi ne anlama gelir?",
    options: [
      "Taşıyanın yükün içeriğini tam olarak doğruladığı",
      "Konteyner içeriğinin gönderici beyanına dayandığı, taşıyanca doğrulanmadığı",
      "Yükün sigortalı olduğu",
      "Navlunun ödendiği"
    ],
    correctAnswer: 1,
    explanation: "'Said to contain', özellikle konteyner taşımalarında içeriğin gönderici beyanına dayandığını ve taşıyanca tek tek doğrulanmadığını belirtir.",
    category: "Konişmento/Hague-Visby"
  },
  {
    id: 49,
    question: "'Deadfreight' (ölü navlun) nedir?",
    options: [
      "Hasar görmüş yük",
      "Kiracının taahhüt ettiği yükten daha azını yüklemesi durumunda eksik kalan miktar için ödenen navlun",
      "Geri dönüş navlunu",
      "Sigorta tazminatı"
    ],
    correctAnswer: 1,
    explanation: "Deadfreight, kiracının sözleşmede taahhüt ettiği tam yükü sağlayamaması halinde, taşınmayan miktar için donatana ödediği tazminat niteliğinde navlundur.",
    category: "Navlun/TCE"
  },
  {
    id: 50,
    question: "'Address commission' çarter partide neyi ifade eder?",
    options: [
      "Liman ücreti",
      "Kiracıya (veya temsilcisine) navlun/kira üzerinden tanınan komisyon indirimi",
      "Sigorta primi",
      "Yakıt maliyeti"
    ],
    correctAnswer: 1,
    explanation: "Address commission, navlun veya hire üzerinden kiracı lehine yapılan ve fiilen kiracıya iade edilen bir komisyon/indirimdir; brokerage ise brokere ödenir.",
    category: "Çarter Parti Maddeleri"
  },
  {
    id: 51,
    question: "'Demise clause' ve 'Identity of Carrier' maddeleri neyle ilgilidir?",
    options: [
      "Yakıt kalitesi",
      "Konişmento kapsamında gerçek taşıyanın kim olduğunun belirlenmesi",
      "Sigorta limiti",
      "Laytime hesabı"
    ],
    correctAnswer: 1,
    explanation: "Bu maddeler, konişmentoda sorumlu taşıyanın donatan mı yoksa kiracı mı olduğunu belirleyerek yük sahibinin kime başvuracağını netleştirir.",
    category: "Konişmento/Hague-Visby"
  },
  {
    id: 52,
    question: "CIP (Carriage and Insurance Paid To) Incoterms 2020'de sigorta düzeyi açısından CIF'ten nasıl ayrılır?",
    options: [
      "CIP'te sigorta gerekmez",
      "CIP'te satıcı daha geniş (Institute Cargo Clauses A) sigorta yaptırmalıdır",
      "CIP sadece denizde kullanılır",
      "CIP'te risk satıcıda kalır"
    ],
    correctAnswer: 1,
    explanation: "Incoterms 2020'de CIP, satıcının daha geniş kapsamlı (ICC A) sigorta yaptırmasını gerektirirken, CIF asgari (ICC C) sigortayı gerektirir.",
    category: "Incoterms 2020"
  }
];
