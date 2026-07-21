import type { QuizQuestion } from "@/types/quiz";

export const seamanshipQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Su derinliği 24 m ve loçanın su üstü yüksekliği 6 m. 6:1 kaloma (scope) için yaklaşık kaç metre zincir salınmalıdır (1 kilit = 27.5 m)?",
    options: ["144 m (~5 kilit)", "180 m (~6.5 kilit)", "150 m (~5.5 kilit)", "210 m (~7.6 kilit)"],
    correctAnswer: 1,
    explanation: "Kaloma loça–dip mesafesine göre hesaplanır: 24 + 6 = 30 m. 6× kaloma = 6 × 30 = 180 m ≈ 180 ÷ 27.5 ≈ 6.5 kilit. (Trap: yalnız 24 m derinliği alıp 6×24 = 144 bulmak.)",
    category: "Demirleme"
  },
  {
    id: 2,
    question: "COLREG Kural 5 neyi zorunlu kılar?",
    options: ["Güvenli hız", "Uygun gözcülük", "Çatışmadan kaçınma", "Işık gösterme"],
    correctAnswer: 1,
    explanation: "Rule 5: Her zaman uygun gözcülük (look-out).",
    category: "COLREG"
  },
  {
    id: 3,
    question: "ISM Kodunun temel amacı nedir?",
    options: ["Gemi güvenliği sertifikasyonu", "Güvenli gemi işletimi ve kirlilik önleme", "Mürettebat sertifikasyonu", "Kargo güvenliği"],
    correctAnswer: 1,
    explanation: "ISM, emniyetli işletim ve çevre kirliliğinin önlenmesi için yönetim sistemi standartları getirir.",
    category: "ISM/ISPS"
  },
  {
    id: 4,
    question: "ISPS Güvenlik Seviyesi 3 hangi durumda ilan edilir?",
    options: ["Normal işletim; rutin koruyucu önlemler", "Bir güvenlik olayı riskinin arttığı, belirli süreli dönem", "Bir güvenlik olayının muhtemel/yakın olduğu istisnai durum; en yüksek önlemler", "Yalnızca liman devleti denetimi (PSC) sırasında"],
    correctAnswer: 2,
    explanation: "ISPS üç seviye tanımlar; Seviye 3 (istisnai), bir güvenlik olayının muhtemel veya yakın olduğu ve belirli bir hedefe yönelebileceği durumlarda sınırlı süre için ilan edilir ve en yüksek koruyucu önlemleri gerektirir. (Seviye 1 normal, Seviye 2 yükseltilmiş.)",
    category: "ISM/ISPS"
  },
  {
    id: 5,
    question: "Spring halatlar ne için kullanılır?",
    options: ["Geminin ileri-geri hareketini kontrol etmek", "Geminin yükselip alçalmasını sağlamak", "Geminin dönmesini önlemek", "Geminin yan yatmasını önlemek"],
    correctAnswer: 0,
    explanation: "Spring, rıhtım boyunca ileri-geri (surge) hareketi kontrol eder.",
    category: "Palamar"
  },
  {
    id: 6,
    question: "Palamar hatlarında 'snap-back zone' neyi ifade eder?",
    options: ["Halatın suya değdiği bölge", "Halat koparsa geri savrulacağı tehlike alanı", "Halatın yağlanacağı alan", "Halatın bağlanacağı babayı"],
    correctAnswer: 1,
    explanation: "Kopma halinde halat, elastik enerjiyle geri savrulur; bu bölge ölümcül olabilir.",
    category: "Palamar"
  },
  {
    id: 7,
    question: "Bowline (İzbarço) düğümünün en önemli özelliği hangisidir?",
    options: ["Yük altında sıkışıp çözülmez", "Sabit bir göz (ilmek) oluşturur", "Sadece zincirde kullanılır", "Su altında çözülür"],
    correctAnswer: 1,
    explanation: "Bowline güvenilir sabit göz oluşturur; birçok pratik kullanımda tercih edilir.",
    category: "Düğümler"
  },
  {
    id: 8,
    question: "Clove hitch (Kazık bağı) en çok ne için kullanılır?",
    options: ["Sabit göz yapmak", "Bir direğe hızlı geçici bağ", "Zincir kısaltmak", "Çelik halat ek yapmak"],
    correctAnswer: 1,
    explanation: "Direk/boruya hızlı bağ için pratik; sürekli yükte kayabilir, emniyet bağı eklenir.",
    category: "Düğümler"
  },
  {
    id: 9,
    question: "Denizde 'man overboard' durumunda ilk aksiyon hangisidir?",
    options: ["Günlük doldurmak", "Can simidi/ışık duman şamandırası atmak ve alarm vermek", "Hemen limana dönmek", "Makineyi durdurmak"],
    correctAnswer: 1,
    explanation: "İlk hedef: kişiyi işaretlemek ve görünür kılmak (lifebuoy/marking) + alarm/koordinasyon.",
    category: "Acil Durum"
  },
  {
    id: 10,
    question: "Güvertede ağır hava devriyesinde öncelikli kontrol hangisidir?",
    options: ["Kamarot bölümü", "Mutfak", "Ambar kapakları ve güverte ekipman emniyeti", "Ofis evrakı"],
    correctAnswer: 2,
    explanation: "Ambar kapakları, lashings, ventler, güverte ekipmanı heavy weather'da kritik risk oluşturur.",
    category: "Ağır Hava"
  },
  {
    id: 11,
    question: "Çelik halatın (wire) periyodik kontrolünde en kritik bulgulardan biri hangisidir?",
    options: ["Renk değişimi", "Kırık tel sayısı ve bukle/kink", "Sadece yağ seviyesi", "Etiket yazısı"],
    correctAnswer: 1,
    explanation: "Broken wires, kinks, birdcaging gibi deformasyonlar ciddi emniyet riski taşır.",
    category: "Bakım"
  },
  {
    id: 12,
    question: "Gemi yanaşma sırasında römorkör komutu verirken en önemli unsur hangisidir?",
    options: ["Sadece rüzgâr", "Net ve standart iletişim/komut", "Sadece akıntı", "Sadece draft"],
    correctAnswer: 1,
    explanation: "Tug operations'ta yanlış anlaşılma ciddi kaza sebebidir; standard phraseology kritik.",
    category: "Manevra"
  },
  {
    id: 13,
    question: "Kıçtan bağlanmada (stern-to) en önemli risklerden biri hangisidir?",
    options: ["Görüş artışı", "Pervane/rudder hasarı ve kıçın dalga/akıntıyla sürüklenmesi", "Yakıt tasarrufu", "Radar menzil artışı"],
    correctAnswer: 1,
    explanation: "Kıç manevrası dar alanda hassastır; prop/rudder clearance ve çevresel etkiler kritik.",
    category: "Manevra"
  },
  {
    id: 14,
    question: "Denizde çatışma önlemede 'stand-on vessel' için doğru ifade hangisidir?",
    options: ["Her zaman rota/hız değiştirir", "Mümkün olduğunca rota ve hızını muhafaza eder", "Daima iskele tarafına döner", "Hiç manevra yapamaz"],
    correctAnswer: 1,
    explanation: "COLREG: Stand-on, şartlar elverdiğince rota/hızını korur; risk devam ederse manevra yapabilir.",
    category: "COLREG"
  },
  {
    id: 15,
    question: "Bir gemide 'permit to work' sistemi aşağıdakilerden hangisini en çok azaltır?",
    options: ["Yakıt tüketimini", "Kontrolsüz ve riskli iş yapılmasını", "Radar arızasını", "Gelgit hatasını"],
    correctAnswer: 1,
    explanation: "PTW: sıcak iş, enclosed space vb. riskli işlerde prosedür/izolasyon/ölçüm kontrolü sağlar.",
    category: "İş Emniyeti"
  },
  {
    id: 16,
    question: "Enclosed space entry (kapalı mahale giriş) için en kritik ön koşul hangisidir?",
    options: ["Kapıyı açık bırakmak", "Atmosfer ölçümü ve havalandırma", "Telefonla konuşmak", "Sadece aydınlatma"],
    correctAnswer: 1,
    explanation: "O2, LEL, toksik gaz ölçümü + sürekli havalandırma + izin/prosedür hayati önemdedir.",
    category: "İş Emniyeti"
  },
  {
    id: 17,
    question: "Gemide 'toolbox talk' (iş başı konuşması) en iyi ne zaman yapılır?",
    options: ["İş bittikten sonra", "İşe başlamadan hemen önce", "Sadece limanda", "Sadece kaptan isteyince"],
    correctAnswer: 1,
    explanation: "İşe başlamadan önce riskler/roller/iletişim netleştirilir.",
    category: "İş Emniyeti"
  },
  {
    id: 18,
    question: "Demir taraması (dragging anchor) şüphesinde en pratik göstergelerden biri hangisidir?",
    options: ["GPS/ekosounder konumunun sabit kalması", "Kerterizlerin ve GPS pozisyonunun sürüklenmesi", "Deniz suyu tuzluluğu", "Hava sıcaklığı"],
    correctAnswer: 1,
    explanation: "Kerterizler değişiyor ve pozisyon sürükleniyorsa anchor dragging ihtimali artar.",
    category: "Demirleme"
  },
  {
    id: 19,
    question: "Bir halatın SWL/WLL değerleri ile ilgili doğru ifade hangisidir?",
    options: ["WLL her zaman MBL'den büyüktür", "WLL çalışma yük limitidir, MBL kırılma yüküdür", "MBL ile WLL aynıdır", "WLL sadece zincirde kullanılır"],
    correctAnswer: 1,
    explanation: "WLL/SWL güvenli çalışma sınırı; MBL minimum kırılma yüküdür (emniyet katsayısı uygulanır).",
    category: "Palamar"
  },
  {
    id: 20,
    question: "Denizde yangında, 'boundary cooling' (sınır soğutma) temel amacı hangisidir?",
    options: ["Yangını beslemek", "Yangının yayılmasını önlemek", "Sadece dumanı artırmak", "Yakıt tüketimini azaltmak"],
    correctAnswer: 1,
    explanation: "Komşu bölmeleri soğutarak ısı transferiyle yayılımı sınırlandırır.",
    category: "Acil Durum"
  },
  {
    id: 21,
    question: "Güvertede 'lanyard' kullanımının temel amacı hangisidir?",
    options: ["Süslü görünmek", "Aletlerin düşmesini önlemek", "Rüzgârı ölçmek", "Pusula sapmasını ölçmek"],
    correctAnswer: 1,
    explanation: "Tool lanyard, overboard düşüşü ve yaralanma riskini azaltır.",
    category: "İş Emniyeti"
  },
  {
    id: 22,
    question: "Emniyet kemeri/harness için doğru kullanım hangisidir?",
    options: ["Sadece bele bağlamak", "Uygun ankraj noktasına bağlayıp fall-arrest kullanmak", "İple elde tutmak", "Ağır havada hiç kullanmamak"],
    correctAnswer: 1,
    explanation: "Fall-arrest sisteminde sertifikalı ankraj + doğru bağlantı ve kontrol şarttır.",
    category: "İş Emniyeti"
  },
  {
    id: 23,
    question: "Denizde 'heaving line' (atış halatı) en çok hangi amaçla kullanılır?",
    options: ["Yangın söndürmek", "Palamarı iskeleye/rihtıma ulaştırmak", "Radar hedefi işaretlemek", "Gelgit ölçmek"],
    correctAnswer: 1,
    explanation: "Heaving line ile messenger/halat karşı tarafa atılır; ardından asıl palamar alınır.",
    category: "Palamar"
  },
  {
    id: 24,
    question: "Bir palamarın babaya (bitt) düzgün bağlanmasında en önemli ilke hangisidir?",
    options: ["Düğümleri rastgele atmak", "Turns düzgün ve çaprazsız; sürtünme/çakışma olmadan", "Sadece tek tur", "Halatı ıslatmak"],
    correctAnswer: 1,
    explanation: "Düzgün turns ve figure-of-eight bağ, yük altında kaymayı ve hasarı azaltır.",
    category: "Palamar"
  },
  {
    id: 25,
    question: "Gemide 'near miss' raporlamasının temel faydası hangisidir?",
    options: ["Ceza vermek", "Kaza olmadan önce tehlikeyi görüp iyileştirmek", "Sadece evrak artırmak", "Sigorta primini hemen düşürmek"],
    correctAnswer: 1,
    explanation: "Near miss, kök neden analizi ve önleyici aksiyonlar için en değerli girdilerden biridir.",
    category: "SMS"
  },
  {
    id: 26,
    question: "COLREG'e göre dümen komutu 'Hard a starboard' ne demektir?",
    options: ["Dümeni tam iskeleye bas", "Dümeni tam sancağa bas", "Dümeni ortala", "Dümeni serbest bırak"],
    correctAnswer: 1,
    explanation: "Hard a starboard: dümeni sonuna kadar sancağa basmak; gemi sancağa döner.",
    category: "Dümen Komutları"
  },
  {
    id: 27,
    question: "'Midships' dümen komutu ne anlama gelir?",
    options: ["Dümeni tam iskele", "Dümeni tam sancak", "Dümeni orta (sıfır) konuma getir", "Pervaneyi durdur"],
    correctAnswer: 2,
    explanation: "Midships: dümen yelpazesini gemi orta hattına (0°) getirmek.",
    category: "Dümen Komutları"
  },
  {
    id: 28,
    question: "'Steady as she goes' dümen komutu neyi ister?",
    options: ["Mevcut pruva hattını koru", "Hızlandır", "İskele tarafına dön", "Demir at"],
    correctAnswer: 0,
    explanation: "Komut anındaki rotayı (heading) tutmak ve o pruvada sabit gitmek demektir.",
    category: "Dümen Komutları"
  },
  {
    id: 29,
    question: "COLREG Kural 6 neyi düzenler?",
    options: ["Güvenli hız", "Gözcülük", "Dar kanallar", "Işıklar"],
    correctAnswer: 0,
    explanation: "Rule 6: Her gemi her zaman güvenli hızda (safe speed) seyretmelidir.",
    category: "COLREG"
  },
  {
    id: 30,
    question: "COLREG Kural 7 hangi konuyu kapsar?",
    options: ["Manevra ve durma mesafesi", "Çatışma riski (risk of collision)", "Sis işaretleri", "Demirleme ışıkları"],
    correctAnswer: 1,
    explanation: "Rule 7: Çatışma riskinin belirlenmesi; sabit kerteriz + azalan mesafe risk göstergesidir.",
    category: "COLREG"
  },
  {
    id: 31,
    question: "İki güçle yürüyen geminin pruva pruvaya (head-on) karşılaşmasında COLREG Kural 14 ne der?",
    options: ["Her ikisi de iskele tarafına döner", "Her ikisi de sancağa döner", "Biri durur", "Hiçbiri dönmez"],
    correctAnswer: 1,
    explanation: "Rule 14: Head-on durumda her iki gemi sancağa dönerek birbirinin iskelesinden geçer.",
    category: "COLREG"
  },
  {
    id: 32,
    question: "COLREG Kural 13'e göre yetişen (overtaking) gemi için doğru ifade hangisidir?",
    options: ["Yol hakkı yetişende", "Yetişen gemi yol verir ve uzak durur", "İki gemi de yön değiştirir", "Yetişen durmak zorundadır"],
    correctAnswer: 1,
    explanation: "Rule 13: Yetişen gemi, yetişilen gemiden uzak durmakla (give-way) yükümlüdür.",
    category: "COLREG"
  },
  {
    id: 33,
    question: "İki güçle yürüyen gemi çapraz (crossing) durumda iken COLREG Kural 15 ne der?",
    options: ["Diğer gemiyi sancağında gören yol verir", "Diğer gemiyi iskele tarafında gören yol verir", "İkisi de durur", "İkisi de iskele tarafına döner"],
    correctAnswer: 0,
    explanation: "Rule 15: Diğer gemiyi kendi sancak tarafında bulunduran gemi give-way vessel'dır.",
    category: "COLREG"
  },
  {
    id: 34,
    question: "Demir atarken zincir 'brought up' (demir tuttu) durumu nasıl anlaşılır?",
    options: ["Zincir gevşek kalır ve sallanır", "Zincir gerilir sonra düşer/gevşer ve gemi rüzgâra/akıntıya döner", "Zincir kopmuştur", "Pruva suya dalar"],
    correctAnswer: 1,
    explanation: "Zincir gerilip sonra gevşemesi ve geminin demire doğru salması demirin tuttuğunu gösterir.",
    category: "Demirleme"
  },
  {
    id: 35,
    question: "Demir zinciri uzunluğu 'shackle' (kilit) ile ölçülür; 1 shackle kaç fathom/metredir?",
    options: ["10 fathom / ~18,3 m", "15 fathom / ~27,5 m", "20 fathom / ~36,6 m", "25 fathom / ~45,7 m"],
    correctAnswer: 1,
    explanation: "1 shackle = 15 fathom = 27,5 m (genelde 27,5 m kabul edilir).",
    category: "Demirleme"
  },
  {
    id: 36,
    question: "Reef knot (camadan bağı) en uygun hangi amaçla kullanılır?",
    options: ["Sabit göz yapmak", "Eşit kalınlıkta iki ucu birleştirmek (yük altında değil)", "Direğe bağlamak", "Ağır çekme yükü taşımak"],
    correctAnswer: 1,
    explanation: "Reef knot eşit halatları geçici bağlar; sürekli/ağır yükte güvenilir değildir.",
    category: "Düğümler"
  },
  {
    id: 37,
    question: "Sheet bend (anele bağı/dülger bağı) ne için uygundur?",
    options: ["Farklı kalınlıkta iki halatı birleştirmek", "Direğe bağlamak", "Zincir kısaltmak", "Sabit göz yapmak"],
    correctAnswer: 0,
    explanation: "Sheet bend, farklı çap/malzemedeki iki halatı birbirine eklemek için uygundur.",
    category: "Düğümler"
  },
  {
    id: 38,
    question: "Figure-of-eight (sekiz) düğümünün temel amacı nedir?",
    options: ["İki halatı birleştirmek", "Halat ucunun makara/delikten kaçmasını önleyen stopper", "Sabit göz yapmak", "Direğe bağlamak"],
    correctAnswer: 1,
    explanation: "Sekiz düğümü stopper olarak halat ucunun blok/delikten geçmesini engeller.",
    category: "Düğümler"
  },
  {
    id: 39,
    question: "Rounding turn and two half hitches bağı genelde ne için kullanılır?",
    options: ["İki halatı eklemek", "Bir halatı halka/babaya güvenli bağlamak", "Halat kısaltmak", "Stopper yapmak"],
    correctAnswer: 1,
    explanation: "Round turn and two half hitches, yük altında bir nesneye güvenli bağ için yaygındır.",
    category: "Düğümler"
  },
  {
    id: 40,
    question: "SOLAS'a göre kapalı tip can filikası (lifeboat) tatbikatı (drill) ne sıklıkla yapılmalıdır?",
    options: ["Yılda bir", "Ayda bir (abandon ship drill)", "Haftada bir", "Sadece liman denetiminde"],
    correctAnswer: 1,
    explanation: "SOLAS III/19: Abandon ship ve yangın tatbikatları her ay yapılmalıdır; ekip değişimine göre 24 saat içinde.",
    category: "Can Kurtarma"
  },
  {
    id: 41,
    question: "SOLAS'a göre mürettebatın her birinin filikaya binip suya indirilme tatbikatı (lifeboat launch) en az ne sıklıkla yapılmalıdır?",
    options: ["Her ay", "3 ayda bir", "Mümkünse her ay, en az 3 ayda bir suya indirme", "Yılda bir"],
    correctAnswer: 2,
    explanation: "SOLAS III/19.3.3: Her filika 3 ayda bir personelle suya indirilip manevra yaptırılmalıdır.",
    category: "Can Kurtarma"
  },
  {
    id: 42,
    question: "Rescue boat (kurtarma botu) tatbikatı ne sıklıkla yapılmalıdır?",
    options: ["Yılda bir", "Mümkünse her ay, en az 3 ayda bir suya indirilerek", "Haftada bir", "Sadece acil durumda"],
    correctAnswer: 1,
    explanation: "SOLAS gereği rescue boat mümkün olduğunca aylık, en az 3 ayda bir suya indirilerek tatbik edilir.",
    category: "Can Kurtarma"
  },
  {
    id: 43,
    question: "Williamson dönüşü (Williamson turn) hangi durumda tercih edilir?",
    options: ["Yüksek hızda yakıt tasarrufu", "Denize adam düştüğünde (özellikle gece/görüş düşükken) aynı izi geri izlemek", "Demirleme", "Yanaşma"],
    correctAnswer: 1,
    explanation: "Williamson turn, MOB'da geminin kendi su izine dönüp kazazedeye yaklaşmasını sağlar.",
    category: "Acil Durum"
  },
  {
    id: 44,
    question: "Güvertede pas (rust) gidermede 'chipping' sonrası ilk doğru adım hangisidir?",
    options: ["Hemen son kat boya", "Yüzey temizliği/priming (astar) uygulaması", "Yağlamak", "Tuzlu suyla yıkamak"],
    correctAnswer: 1,
    explanation: "Pas temizlendikten sonra yüzey temizlenip astar (primer) atılır; ardından ara/son katlar gelir.",
    category: "Bakım"
  },
  {
    id: 45,
    question: "Sentetik halat (örn. polipropilen) için çelik halata göre doğru ifade hangisidir?",
    options: ["Suda batar", "Daha düşük snap-back enerjisi taşır", "Yüksek elastikiyet nedeniyle koptuğunda tehlikeli geri savrulur", "Hiç bakım gerektirmez"],
    correctAnswer: 2,
    explanation: "Sentetik halatlar yüksek elastikiyet nedeniyle koptuğunda ciddi snap-back riski taşır.",
    category: "Palamar"
  },
  {
    id: 46,
    question: "Watchkeeping (vardiya) sırasında devir teslimde (handover) görevli en kritik kuralı hangisidir?",
    options: ["Vardiyayı hemen devretmek", "Devralan kişi tam durumu (pozisyon, trafik, koşullar) anlamadan vardiyayı devretmemek", "Sadece rota bilgisini vermek", "Devir teslimi günlüğe yazmamak"],
    correctAnswer: 1,
    explanation: "STCW: Devralan zabit durumu tam değerlendirip emin olmadan vardiya devredilmez.",
    category: "Vardiya"
  },
  {
    id: 47,
    question: "STCW dinlenme saatleri kuralına göre 24 saatlik dönemde minimum dinlenme süresi nedir?",
    options: ["6 saat", "8 saat", "10 saat", "12 saat"],
    correctAnswer: 2,
    explanation: "STCW/MLC: Herhangi bir 24 saatte en az 10 saat, 7 günlük dönemde en az 77 saat dinlenme.",
    category: "Vardiya"
  },
  {
    id: 48,
    question: "Köprüüstü vardiyasında 'sole look-out' (tek gözcü) gündüz koşuluyla ilgili doğru ifade hangisidir?",
    options: ["Gece her zaman serbesttir", "Sadece koşullar tam değerlendirildiğinde ve güvenli olduğunda gündüz uygulanabilir", "Hiçbir zaman uygulanamaz", "Sadece kaptan izniyle gece uygulanır"],
    correctAnswer: 1,
    explanation: "STCW: Sole look-out yalnızca durum tam değerlendirilip güvenli olduğunda ve gündüz uygulanabilir.",
    category: "Vardiya"
  },
  {
    id: 49,
    question: "Pilotaj (kılavuz kaptan) gemideyken sorumlulukla ilgili doğru ifade hangisidir?",
    options: ["Tüm sorumluluk pilota geçer", "Kaptan geminin emniyetinden sorumlu olmaya devam eder", "Vardiya zabiti sorumluluğu bırakır", "Pilot köprüden ayrılamaz"],
    correctAnswer: 1,
    explanation: "Pilotun varlığı kaptan ve vardiya ekibinin gemi emniyetinden sorumluluğunu kaldırmaz.",
    category: "Vardiya"
  },
  {
    id: 50,
    question: "Palamar operasyonunda 'make fast' komutu ne demektir?",
    options: ["Halatı boşalt", "Halatı babaya/vince emniyetli şekilde bağla/sabitle", "Halatı denize at", "Vinci durdur"],
    correctAnswer: 1,
    explanation: "Make fast: halatı baba/biti üzerine emniyetli olacak şekilde sabitlemek.",
    category: "Palamar"
  },
  {
    id: 51,
    question: "Palamar terimi 'heave away' ne anlama gelir?",
    options: ["Halatı boşalt", "Vinçle halatı içeri al / gergin hale getir", "Halatı kes", "Demir at"],
    correctAnswer: 1,
    explanation: "Heave away: vinç/ırgat ile halatı sarıp gemiyi rıhtıma çekmek.",
    category: "Palamar"
  },
  {
    id: 52,
    question: "Palamar terimi 'slack away' ne anlama gelir?",
    options: ["Halatı gergin tut", "Halatı kontrollü gevşet", "Halatı çöz ve at", "Vinci kilitle"],
    correctAnswer: 1,
    explanation: "Slack away: halata kontrollü boş vermek (gevşetmek).",
    category: "Palamar"
  },
  {
    id: 53,
    question: "Demir vardiyasında (anchor watch) öncelikli görev nedir?",
    options: ["Boya yapmak", "Demir tutuşunu/pozisyonu izleyip dragging'i erken fark etmek", "Yakıt almak", "Kargo işlemek"],
    correctAnswer: 1,
    explanation: "Anchor watch: pozisyon/kerteriz izleyerek demir taramasını ve trafik/havayı kontrol etmek.",
    category: "Demirleme"
  },
  {
    id: 54,
    question: "COLREG Kural 19 (sınırlı görüşte seyir) için doğru ifade hangisidir?",
    options: ["Stand-on/give-on kuralları aynen uygulanır", "Güvenli hız ve gerekirse durabilecek şekilde dikkatli seyir esastır", "Işıklar kapatılır", "Hız artırılır"],
    correctAnswer: 1,
    explanation: "Rule 19: Sınırlı görüşte güvenli hız, radar kullanımı ve gerekirse rota/hız değişimiyle dikkatli seyir gerekir.",
    category: "COLREG"
  },
  {
    id: 55,
    question: "Pilot çarmıhı (pilot ladder) kullanımıyla ilgili SOLAS gereği doğru olan hangisidir?",
    options: ["İstenen her açıda kurulabilir", "Su hattına 9 m'den fazla yüksekse accommodation/pilot ladder kombinasyonu kullanılır", "Sadece tek basamak yeterlidir", "Aydınlatma gerekmez"],
    correctAnswer: 1,
    explanation: "SOLAS V/23: Tırmanma 9 m'yi aşarsa accommodation ladder ile kombinasyon ve gece aydınlatma zorunludur.",
    category: "Manevra"
  },
  {
    id: 56,
    question: "COLREG Kural 9 (dar kanallar) için doğru ifade hangisidir?",
    options: ["Gemiler kanalın ortasından gider", "Gemiler kanalın sancak (sağ) dış kenarına yakın seyreder", "Gemiler iskele tarafındaki kenardan gider", "Dar kanalda demir atılır"],
    correctAnswer: 1,
    explanation: "Rule 9: Dar kanal/geçitte gemi, güvenli ve uygulanabilir olduğunca kanalın sancak dış kenarına yakın seyreder.",
    category: "COLREG"
  },
  {
    id: 57,
    question: "COLREG Kural 18 önceliklerine göre güçle yürüyen gemi (power-driven) kime yol vermelidir?",
    options: ["Hiç kimseye", "Kontrol kabiliyeti kısıtlı, manevra yeteneği sınırlı, balıkçı ve yelkenli gemilere", "Sadece yelkenliye", "Sadece balıkçıya"],
    correctAnswer: 1,
    explanation: "Rule 18: Power-driven gemi; NUC, RAM, balıkçı ve yelkenli gemilere yol vermekle yükümlüdür.",
    category: "COLREG"
  },
  {
    id: 58,
    question: "COLREG Kural 17 (stand-on) gemi, çatışma yakınsa ne yapabilir?",
    options: ["Hiçbir şey", "Yalnız manevrayla çatışmayı önleyecek aksiyonu alır", "Sadece iskele tarafına döner", "Demir atar"],
    correctAnswer: 1,
    explanation: "Rule 17: Give-way manevra yapmazsa stand-on gemi çatışmayı önlemek için aksiyon alabilir/almalıdır.",
    category: "COLREG"
  },
  {
    id: 59,
    question: "COLREG Kural 8'e göre çatışmadan kaçınma manevrası nasıl olmalıdır?",
    options: ["Küçük ve sık değişimlerle", "Belirgin, zamanında ve iyi denizcilik kurallarına uygun", "Sadece hız değişimiyle", "Son anda ani"],
    correctAnswer: 1,
    explanation: "Rule 8: Manevra erken, belirgin (gözle/radarla fark edilir) ve yeterli olmalıdır.",
    category: "COLREG"
  },
  {
    id: 60,
    question: "Demirlemede 'foul anchor' ne demektir?",
    options: ["Demirin temiz çıkması", "Demire zincir/halat/enkaz dolanması veya demirin takılması", "Demir tutması", "Demir kaybı"],
    correctAnswer: 1,
    explanation: "Foul anchor: demire kendi zinciri, başka zincir veya dipteki cisimlerin dolanması durumudur.",
    category: "Demirleme"
  },
  {
    id: 61,
    question: "İki demirle 'open moor' yapmanın temel amacı nedir?",
    options: ["Daha hızlı kalkış", "Tutuş gücünü artırmak ve salınımı azaltmak", "Yakıt tasarrufu", "Pruvayı serbest bırakmak"],
    correctAnswer: 1,
    explanation: "İki demir kullanımı tutuşu artırır ve geminin salma (yawing) alanını sınırlandırır.",
    category: "Demirleme"
  },
  {
    id: 62,
    question: "Manila/sentetik halat depolamada en doğru yaklaşım hangisidir?",
    options: ["Islak ve güneşte saklamak", "Kuru, havadar, UV ve kimyasaldan korunan yerde saklamak", "Yağ içinde saklamak", "Güverteye serbest bırakmak"],
    correctAnswer: 1,
    explanation: "Halatlar kuru, havadar, UV ve kimyasallardan korunan ortamda saklanmalı; nem ve güneş ömrünü kısaltır.",
    category: "Bakım"
  },
  {
    id: 63,
    question: "Timber hitch (kütük bağı) en uygun ne için kullanılır?",
    options: ["Sabit göz", "Silindirik/uzun nesneyi (kütük, boru) çekmek için bağlamak", "İki halat eklemek", "Stopper"],
    correctAnswer: 1,
    explanation: "Timber hitch, silindirik bir cismi sürükleme/çekme için kavrar; gerginlik altında sıkılaşır.",
    category: "Düğümler"
  },
  {
    id: 64,
    question: "Rolling hitch'in (gergi/işkı bağı) ana avantajı nedir?",
    options: ["Hızlı çözülmesi", "Boyuna (eksenel) yük altında kaymaya direnç göstermesi", "Sadece zincirde çalışması", "Su altında çözülmesi"],
    correctAnswer: 1,
    explanation: "Rolling hitch, başka bir halat veya direk üzerinde eksenel yük altında kaymadan tutunur (örn. gergin halatı tutmak).",
    category: "Düğümler"
  },
  {
    id: 65,
    question: "Lifebuoy (can simidi) ile ilgili SOLAS gereği doğru olan hangisidir?",
    options: ["Hepsi ışıklı olmalı", "En az iki adedinde kendinden ateşli ışık ve duman şamandırası bulunmalı", "Sadece bir tane gerekir", "Rengi mavidir"],
    correctAnswer: 1,
    explanation: "SOLAS III: Köprüüstü yakınındaki en az iki can simidi otomatik ışık ve duman sinyaliyle (self-activating) donatılır.",
    category: "Can Kurtarma"
  },
  {
    id: 66,
    question: "Immersion suit (dalgıç/hayatta kalma elbisesi) ile ilgili doğru ifade hangisidir?",
    options: ["Sadece yüzme içindir", "Soğuk suda hipotermiyi geciktirir ve yüzdürme sağlar", "Sadece yangında kullanılır", "Tek beden üretilir"],
    correctAnswer: 1,
    explanation: "Immersion suit soğuk suda ısı kaybını azaltır; SOLAS gereği her kişi için temin edilir (gemi tipine göre).",
    category: "Can Kurtarma"
  },
  {
    id: 67,
    question: "Can salı (liferaft) hidrostatik bırakacı (HRU) ne işe yarar?",
    options: ["Salı sıkıştırır", "Gemi batarken belirli derinlikte salı otomatik serbest bırakır", "Salı şişirir", "Salı ısıtır"],
    correctAnswer: 1,
    explanation: "HRU, gemi battığında (yaklaşık 1,5–4 m) su basıncıyla bağı keser; sal yüzeye çıkıp otomatik şişer.",
    category: "Can Kurtarma"
  },
  {
    id: 68,
    question: "Helm komutu 'Port ten' ne anlama gelir?",
    options: ["Dümeni 10° iskeleye bas", "Dümeni 10° sancağa bas", "Hızı 10 knot yap", "10 derece rota değiştir"],
    correctAnswer: 0,
    explanation: "Port ten: dümeni 10 derece iskele tarafına basmak demektir.",
    category: "Dümen Komutları"
  },
  {
    id: 69,
    question: "Helm komutu 'Ease to five' ne demektir?",
    options: ["Dümen açısını 5°'ye azalt", "Dümeni tam bas", "Hızı 5 knot azalt", "5 derece rota tut"],
    correctAnswer: 0,
    explanation: "Ease to five: mevcut dümen açısını azaltıp 5 dereceye getirmek.",
    category: "Dümen Komutları"
  },
  {
    id: 70,
    question: "Helm komutu 'Meet her' ne için verilir?",
    options: ["Dönüşü hızlandırmak", "Geminin dönüşünü durdurmak/karşılamak için karşı dümen vermek", "Demir atmak", "Hız artırmak"],
    correctAnswer: 1,
    explanation: "Meet her: geminin dönme oranını yavaşlatmak/durdurmak için ters yöne dümen uygulamak.",
    category: "Dümen Komutları"
  },
  {
    id: 71,
    question: "Pervaneli geminin 'transverse thrust' (paddle wheel) etkisi en çok ne zaman belirgindir?",
    options: ["Tam yolda", "Düşük hızda ve özellikle tornistan başlangıcında", "Demirdeyken", "Yelken altında"],
    correctAnswer: 1,
    explanation: "Yanal itki etkisi (özellikle sağ devirli pervanede kıçı iskeleye atar) düşük hız ve tornistanda belirgindir.",
    category: "Manevra"
  },
  {
    id: 72,
    question: "Pivot point (dönme noktası) ileri yolda yaklaşık nerededir?",
    options: ["Kıçta", "Pruvaya yakın (yaklaşık 1/4 boy)", "Tam ortada", "Su altında değil"],
    correctAnswer: 1,
    explanation: "İleri yolda pivot point pruvaya yaklaşık geminin baş tarafından 1/4 boy mesafede oluşur; tornistanda kıça kayar.",
    category: "Manevra"
  },
  {
    id: 73,
    question: "Squat etkisi (squat) ne zaman artar?",
    options: ["Derin suda düşük hızda", "Sığ suda yüksek hızda", "Demirdeyken", "Tornistanda"],
    correctAnswer: 1,
    explanation: "Squat, sığ suda ve yüksek hızda artar; geminin draftı ve trimi değişir, oturma riski doğar.",
    category: "Manevra"
  },
  {
    id: 74,
    question: "Çelik halatta 'birdcaging' (kuş kafesi) neyi gösterir?",
    options: ["Normal yağlama", "Tellerin/demetlerin açılıp deformasyonu, ciddi hasar", "Renk değişimi", "Yeni halat"],
    correctAnswer: 1,
    explanation: "Birdcaging, halatın damarlarının kafes gibi açılmasıdır; halat hasarlıdır ve kullanım dışı bırakılır.",
    category: "Bakım"
  },
  {
    id: 75,
    question: "Cathodic protection (katodik koruma) güvertede/teknede ne işe yarar?",
    options: ["Boya parlaklığı", "Galvanik korozyondan koruma (sakrifisyel anotlar)", "Yakıt tasarrufu", "Pas üretimi"],
    correctAnswer: 1,
    explanation: "Sakrifisyel anotlar (çinko/alüminyum) korozyona kendini feda ederek tekne metalini korur.",
    category: "Bakım"
  },
  {
    id: 76,
    question: "Yüksek basınçlı su jeti/grit blasting öncesi en kritik emniyet adımı nedir?",
    options: ["Müzik açmak", "KKD (gözlük/maske/eldiven) ve çevre güvenliği sağlamak", "Boya seçmek", "Halat almak"],
    correctAnswer: 1,
    explanation: "Yüksek basınç ve toz/partikül ciddi yaralanma yapar; uygun KKD ve alan emniyeti şarttır.",
    category: "İş Emniyeti"
  },
  {
    id: 77,
    question: "Aloft (yüksekte/direkte) çalışmada zorunlu emniyet unsuru hangisidir?",
    options: ["Sadece bot", "Emniyet kemeri/harness, gantline ve düşme koruması", "Sadece eldiven", "Şapka"],
    correctAnswer: 1,
    explanation: "Yüksekte çalışmada harness, ikincil emniyet (lifeline/gantline) ve alttaki alanın kapatılması gerekir.",
    category: "İş Emniyeti"
  },
  {
    id: 78,
    question: "Vardiya devrinde görüş sınırlıyken (sis) devreden zabit en çok neyi vurgulamalı?",
    options: ["Yemek menüsü", "Radar/ARPA hedefleri, ses işaretleri ve güvenli hız durumu", "Boya işleri", "Liman evrakı"],
    correctAnswer: 1,
    explanation: "Sınırlı görüşte trafik (ARPA), ses işaretleri ve güvenli hız kritik bilgilerdir; eksiksiz devredilmeli.",
    category: "Vardiya"
  },
  {
    id: 79,
    question: "BRM (Bridge Resource Management) temel amacı nedir?",
    options: ["Yakıt almak", "Köprüüstü kaynaklarını (insan/ekipman/bilgi) etkin kullanıp hata zincirini kırmak", "Hızı artırmak", "Kargo planı"],
    correctAnswer: 1,
    explanation: "BRM; iletişim, görev paylaşımı ve durumsal farkındalıkla kaza zincirini kırmayı hedefler.",
    category: "Vardiya"
  },
  {
    id: 80,
    question: "Kaptanı çağırma (call the master) kuralı için doğru ifade hangisidir?",
    options: ["Sadece çatışmada", "Şüphe halinde tereddütsüz kaptanı çağırmak esastır", "Hiçbir zaman gece çağrılmaz", "Sadece liman yakınında"],
    correctAnswer: 1,
    explanation: "STCW: Görüş kötüleşmesi, trafik şüphesi, ekipman arızası vb. durumlarda zabit tereddüt etmeden kaptanı çağırır.",
    category: "Vardiya"
  },
  {
    id: 81,
    question: "MOB'da 'Anderson turn' (single turn) ne zaman tercih edilir?",
    options: ["Manevra kabiliyeti yüksek gemilerde, kazazede hemen görülüyorsa en hızlı dönüş", "Sadece geceleyin", "Demirde", "Sis varsa"],
    correctAnswer: 0,
    explanation: "Anderson turn en hızlı dönüştür; kazazede görülüyor ve gemi manevra kabiliyeti yüksekse uygundur.",
    category: "Acil Durum"
  },
  {
    id: 82,
    question: "Palamar operasyonunda 'check the line' komutu ne ister?",
    options: ["Halatı tamamen boşalt", "Halatı kontrollü gerginlikte tutup ani yükü emmek", "Halatı kes", "Halatı denize at"],
    correctAnswer: 1,
    explanation: "Check: halata kontrollü fren uygulayarak ani gerilimi yumuşatmak (sürtünme turuyla).",
    category: "Palamar"
  },
  {
    id: 83,
    question: "Tow (yedekleme) operasyonunda 'gob rope / gog rope' ne işe yarar?",
    options: ["Yedek halatı kısaltmak", "Yedek halatın yanlamasına kaymasını sınırlandırıp girth/devrilme riskini azaltmak", "Demir atmak", "Yakıt almak"],
    correctAnswer: 1,
    explanation: "Gob rope, römorkörde tow halatının kıça doğru hareketini sınırlandırarak girting (yan yatma) riskini azaltır.",
    category: "Manevra"
  },
  {
    id: 84,
    question: "Mooring planında 'fairlead' (kurt ağzı) işlevi nedir?",
    options: ["Halatı kesmek", "Halatı doğru açıyla yönlendirip aşınmayı azaltmak", "Halatı ısıtmak", "Demir tutmak"],
    correctAnswer: 1,
    explanation: "Fairlead/Panama lead halatı uygun açıyla yönlendirir; keskin temas ve aşınmayı önler.",
    category: "Palamar"
  },
  {
    id: 85,
    question: "Rescue boat ile bir kazazedeyi sudan alırken en güvenli yaklaşım hangisidir?",
    options: ["Tam yolda yaklaşmak", "Rüzgâr/akıntı altından yavaş yaklaşıp gemiyi kazazede üstüne sürüklenir konuma getirmek", "Kıçtan dümdüz gitmek", "Pervaneyi kazazedeye yakın çalıştırmak"],
    correctAnswer: 1,
    explanation: "Genelde rüzgâraltından kontrollü yaklaşılır; pervane kazazededen uzak tutulur, sürüklenme kontrol edilir.",
    category: "Can Kurtarma"
  }
];

