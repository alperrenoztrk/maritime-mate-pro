import type { QuizQuestion } from "@/types/quiz";
import { seamanshipQuestionsExtended } from "@/data/seamanshipQuestionsExtended";

const baseSeamanshipQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Demir zinciri scope oranı (normal koşullarda) genellikle en az kaç olmalıdır?",
    options: ["3:1", "5:1", "7:1", "10:1"],
    correctAnswer: 1,
    explanation: "Normal koşullarda 5:1 (çoğu durumda 5–7:1) yaygın minimum kabul edilir; ağır havada daha fazla gerekir.",
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
    options: ["Gemi güvenlik sertifikalarının düzenlenmesi", "Emniyetli gemi işletimi ve kirliliğin önlenmesi", "Gemi adamı yeterliklerinin belgelendirilmesi", "Yük emniyeti ve istif kurallarının belirlenmesi"],
    correctAnswer: 1,
    explanation: "ISM, emniyetli işletim ve çevre kirliliğinin önlenmesi için yönetim sistemi standartları getirir.",
    category: "ISM/ISPS"
  },
  {
    id: 4,
    question: "ISPS Kodunda kaç güvenlik seviyesi vardır?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    explanation: "Seviye 1 (Normal), 2 (Artırılmış), 3 (Olağanüstü).",
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
    options: ["Halat koparsa savrulacağı tehlike alanı", "Halatın bağlandığı baba ve fırdöndü alanı", "Halatın su yüzeyine değdiği ıslak bölge", "Halatın yağlanması gereken bakım alanı"],
    correctAnswer: 0,
    explanation: "Kopma halinde halat, elastik enerjiyle geri savrulur; bu bölge ölümcül olabilir.",
    category: "Palamar"
  },
  {
    id: 7,
    question: "Bowline (İzbarço) düğümünün en önemli özelliği hangisidir?",
    options: ["Yük altında sıkışıp hiç çözülmez", "Sabit bir göz (ilmek) oluşturur", "Sadece zincirde kullanılır", "Su altında çözülür"],
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
    options: ["Can simidi ve duman şamandırası atıp alarm vermek", "Olayı seyir jurnaline kaydedip vardiyayı bilgilendirmek", "Rotayı en yakın limana çevirip yardım istemek", "Ana makineyi durdurup gemiyi akıntıya bırakmak"],
    correctAnswer: 0,
    explanation: "İlk hedef: kişiyi işaretlemek ve görünür kılmak (lifebuoy/marking) + alarm/koordinasyon.",
    category: "Acil Durum"
  },
  {
    id: 10,
    question: "Güvertede ağır hava devriyesinde öncelikli kontrol hangisidir?",
    options: ["Ambar kapakları ve güverte ekipmanı", "Kamara bölümündeki eşyaların emniyeti", "Mutfak ve kumanya deposunun düzeni", "Köprüüstü evrak ve jurnal düzeni"],
    correctAnswer: 0,
    explanation: "Ambar kapakları, lashings, ventler, güverte ekipmanı heavy weather'da kritik risk oluşturur.",
    category: "Ağır Hava"
  },
  {
    id: 11,
    question: "Çelik halatın (wire) periyodik kontrolünde en kritik bulgulardan biri hangisidir?",
    options: ["Kırık tel sayısı ve bukle (kink) oluşumu", "Halatın dış yüzeyindeki renk değişimi", "Yağlama gresinin tank seviyesi kaydı", "Makara üzerindeki etiket yazısının okunurluğu"],
    correctAnswer: 0,
    explanation: "Broken wires, kinks, birdcaging gibi deformasyonlar ciddi emniyet riski taşır.",
    category: "Bakım"
  },
  {
    id: 12,
    question: "Gemi yanaşma sırasında römorkör komutu verirken en önemli unsur hangisidir?",
    options: ["Net ve standart telsiz komutları", "Yalnızca geminin draft değerleri", "Yalnızca rüzgâr yönü ve şiddeti", "Yalnızca akıntının yön ve hızı"],
    correctAnswer: 0,
    explanation: "Tug operations'ta yanlış anlaşılma ciddi kaza sebebidir; standard phraseology kritik.",
    category: "Manevra"
  },
  {
    id: 13,
    question: "Kıçtan bağlanmada (stern-to) en önemli risklerden biri hangisidir?",
    options: ["Köprüüstünden görüş açısının artması", "Pervane ve dümene hasar, kıçın sürüklenmesi", "Manevrada yakıt tüketiminin azalması", "Radar menzilinin belirgin biçimde artış göstermesi"],
    correctAnswer: 1,
    explanation: "Kıç manevrası dar alanda hassastır; prop/rudder clearance ve çevresel etkiler kritik.",
    category: "Manevra"
  },
  {
    id: 14,
    question: "Denizde çatışma önlemede 'stand-on vessel' için doğru ifade hangisidir?",
    options: ["Şartlar elverdiğince rota ve hızını korur", "Her koşulda rota ve hızını değiştirmek zorundadır", "Daima iskele tarafına dönüş yapar", "Hiçbir koşulda manevra yapamaz"],
    correctAnswer: 0,
    explanation: "COLREG: Stand-on, şartlar elverdiğince rota/hızını korur; risk devam ederse manevra yapabilir.",
    category: "COLREG"
  },
  {
    id: 15,
    question: "Bir gemide 'permit to work' sistemi aşağıdakilerden hangisini en çok azaltır?",
    options: ["Sefer başına yakıt tüketiminin artmasını", "Kontrolsüz ve riskli iş yapılmasını", "Radar ve seyir cihazlarındaki arızaları", "Gelgit hesaplarındaki hata payını"],
    correctAnswer: 1,
    explanation: "PTW: sıcak iş, enclosed space vb. riskli işlerde prosedür/izolasyon/ölçüm kontrolü sağlar.",
    category: "İş Emniyeti"
  },
  {
    id: 16,
    question: "Enclosed space entry (kapalı mahale giriş) için en kritik ön koşul hangisidir?",
    options: ["Atmosfer ölçümü ve havalandırma yapılması", "Taşınabilir aydınlatma temin edilmesi", "Kapının açık bırakılması ve gözcü konması", "Telsizle sürekli iletişim kurulması"],
    correctAnswer: 0,
    explanation: "O2, LEL, toksik gaz ölçümü + sürekli havalandırma + izin/prosedür hayati önemdedir.",
    category: "İş Emniyeti"
  },
  {
    id: 17,
    question: "Gemide 'toolbox talk' (iş başı konuşması) en iyi ne zaman yapılır?",
    options: ["İş bittikten sonra", "İşe başlamadan hemen önce", "Sadece limanda", "Sadece kaptan talep ettiğinde"],
    correctAnswer: 1,
    explanation: "İşe başlamadan önce riskler/roller/iletişim netleştirilir.",
    category: "İş Emniyeti"
  },
  {
    id: 18,
    question: "Demir taraması (dragging anchor) şüphesinde en pratik göstergelerden biri hangisidir?",
    options: ["Kerteriz ve GPS pozisyonunun sürüklenmesi", "GPS ve iskandil değerlerinin sabit kalması", "Deniz suyu tuzluluğunun belirgin değişmesi", "Hava sıcaklığının hızla düşmeye başlaması"],
    correctAnswer: 0,
    explanation: "Kerterizler değişiyor ve pozisyon sürükleniyorsa anchor dragging ihtimali artar.",
    category: "Demirleme"
  },
  {
    id: 19,
    question: "Bir halatın SWL/WLL değerleri ile ilgili doğru ifade hangisidir?",
    options: ["WLL çalışma limiti, MBL kırılma yüküdür", "WLL yalnızca zincir donanımında kullanılır", "WLL her zaman MBL değerinden büyüktür", "MBL ile WLL aynı değeri ifade eder"],
    correctAnswer: 0,
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
    options: ["El aletlerinin düşmesini önlemek", "Personelin görünürlüğünü artırmak", "Rüzgâr hızını yaklaşık ölçmek", "Pusula sapmasını belirlemek"],
    correctAnswer: 0,
    explanation: "Tool lanyard, overboard düşüşü ve yaralanma riskini azaltır.",
    category: "İş Emniyeti"
  },
  {
    id: 22,
    question: "Emniyet kemeri/harness için doğru kullanım hangisidir?",
    options: ["Sertifikalı ankraja bağlanıp emniyet almak", "Ağır havada kemeri hiç kullanmamak", "Kemeri yalnızca bel hizasına bağlayarak çalışmak", "Emniyet ipini elde tutarak ilerlemek"],
    correctAnswer: 0,
    explanation: "Fall-arrest sisteminde sertifikalı ankraj + doğru bağlantı ve kontrol şarttır.",
    category: "İş Emniyeti"
  },
  {
    id: 23,
    question: "Denizde 'heaving line' (atış halatı) en çok hangi amaçla kullanılır?",
    options: ["Palamarı rıhtıma ulaştırmak", "Güvertede yangın hortumunu uzatmak", "Radar hedefini şamandırayla işaretlemek", "Gelgit yüksekliğini iskandille ölçmek"],
    correctAnswer: 0,
    explanation: "Heaving line ile messenger/halat karşı tarafa atılır; ardından asıl palamar alınır.",
    category: "Palamar"
  },
  {
    id: 24,
    question: "Bir palamarın babaya (bitt) düzgün bağlanmasında en önemli ilke hangisidir?",
    options: ["Turları düzgün ve çaprazsız almak", "Düğümleri rastgele bir sırayla atmak", "Yalnızca tek tur alıp bırakmak", "Halatı önceden suyla ıslatmak"],
    correctAnswer: 0,
    explanation: "Düzgün turns ve figure-of-eight bağ, yük altında kaymayı ve hasarı azaltır.",
    category: "Palamar"
  },
  {
    id: 25,
    question: "Gemide 'near miss' raporlamasının temel faydası hangisidir?",
    options: ["Sorumlu personele disiplin cezası verilmesi", "Kaza öncesi tehlikenin görülüp giderilmesi", "Şirket evrak sayısının artırılması", "Sigorta priminin hemen düşürülmesi"],
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
    options: ["Dümeni orta (sıfır) konuma getir", "Pervaneyi durdur ve boşta beklemede kal", "Dümeni tam iskele tarafına bas", "Dümeni tam sancak tarafına bas"],
    correctAnswer: 0,
    explanation: "Midships: dümen yelpazesini gemi orta hattına (0°) getirmek.",
    category: "Dümen Komutları"
  },
  {
    id: 28,
    question: "'Steady as she goes' dümen komutu neyi ister?",
    options: ["Mevcut pruva hattını koru", "Devri artırıp hızı yükselt", "İskele tarafına dönüş yap", "Demir atmaya hazırlan"],
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
    options: ["Çatışma riskinin belirlenmesi", "Manevra ve durma mesafesi bilgileri", "Kısıtlı görüşte ses işaretleri", "Demirde gösterilecek fenerler"],
    correctAnswer: 0,
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
    options: ["Zincir gerilip gevşer, gemi rüzgâra döner", "Zincir sürekli gevşek kalır ve sallanır", "Zincir kopar ve ırgat serbest döner", "Pruva suya dalar ve baş omuzluk suya gömülür"],
    correctAnswer: 0,
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
    options: ["Halat ucunda sabit bir göz meydana getirmek", "Eşit kalınlıkta iki ucu geçici bağlamak", "Halatı direğe veya babaya bağlamak", "Ağır çekme yükünü emniyetle taşımak"],
    correctAnswer: 1,
    explanation: "Reef knot eşit halatları geçici bağlar; sürekli/ağır yükte güvenilir değildir.",
    category: "Düğümler"
  },
  {
    id: 37,
    question: "Sheet bend (anele bağı/dülger bağı) ne için uygundur?",
    options: ["Farklı kalınlıkta iki halatı eklemek", "Halat ucunda sabit göz oluşturmak", "Halatı direğe veya sereye emniyetle bağlamak", "Zincir boyunu geçici kısaltmak"],
    correctAnswer: 0,
    explanation: "Sheet bend, farklı çap/malzemedeki iki halatı birbirine eklemek için uygundur.",
    category: "Düğümler"
  },
  {
    id: 38,
    question: "Figure-of-eight (sekiz) düğümünün temel amacı nedir?",
    options: ["Halatı direğe bağlamak için kullanılır", "Halat ucunun makaradan kaçmasını önler", "İki halatı uç uca eklemek için kullanılır", "Halat ucunda sabit göz oluşturmak için"],
    correctAnswer: 1,
    explanation: "Sekiz düğümü stopper olarak halat ucunun blok/delikten geçmesini engeller.",
    category: "Düğümler"
  },
  {
    id: 39,
    question: "Rounding turn and two half hitches bağı genelde ne için kullanılır?",
    options: ["Halatı halka veya babaya güvenli bağlamak", "İki halatı uç uca ekleyerek uzatmak", "Halat boyunu geçici olarak kısaltmak", "Halat ucuna stopper düğümü atmak"],
    correctAnswer: 0,
    explanation: "Round turn and two half hitches, yük altında bir nesneye güvenli bağ için yaygındır.",
    category: "Düğümler"
  },
  {
    id: 40,
    question: "SOLAS'a göre kapalı tip can filikası (lifeboat) tatbikatı (drill) ne sıklıkla yapılmalıdır?",
    options: ["Yılda bir kez, klas sörveyinde", "Ayda bir kez düzenli olarak", "Haftada bir kez düzenli olarak", "Yalnızca liman devleti denetiminde"],
    correctAnswer: 1,
    explanation: "SOLAS III/19: Abandon ship ve yangın tatbikatları her ay yapılmalıdır; ekip değişimine göre 24 saat içinde.",
    category: "Can Kurtarma"
  },
  {
    id: 41,
    question: "SOLAS'a göre mürettebatın her birinin filikaya binip suya indirilme tatbikatı (lifeboat launch) en az ne sıklıkla yapılmalıdır?",
    options: ["Mümkünse aylık, en az 3 ayda bir", "Yalnızca 6 ayda bir kez yapılarak", "Her ay mutlaka suya indirilerek", "Yalnızca yılda bir kez yapılarak"],
    correctAnswer: 0,
    explanation: "SOLAS III/19.3.3: Her filika 3 ayda bir personelle suya indirilip manevra yaptırılmalıdır.",
    category: "Can Kurtarma"
  },
  {
    id: 42,
    question: "Rescue boat (kurtarma botu) tatbikatı ne sıklıkla yapılmalıdır?",
    options: ["Her hafta güvertede kuru tatbikatla", "Mümkünse aylık, en az 3 ayda bir suya", "Yalnızca gerçek acil durum çıktığında", "Yalnızca yılda bir kez suya indirilerek"],
    correctAnswer: 1,
    explanation: "SOLAS gereği rescue boat mümkün olduğunca aylık, en az 3 ayda bir suya indirilerek tatbik edilir.",
    category: "Can Kurtarma"
  },
  {
    id: 43,
    question: "Williamson dönüşü (Williamson turn) hangi durumda tercih edilir?",
    options: ["Yüksek hızda yakıt tasarrufu sağlamak", "Denize adam düştüğünde su izine dönmek", "Demirleme sahasına yaklaşırken dönüş yapmak", "Rıhtıma yanaşmada kıçı yaklaştırmak"],
    correctAnswer: 1,
    explanation: "Williamson turn, MOB'da geminin kendi su izine dönüp kazazedeye yaklaşmasını sağlar.",
    category: "Acil Durum"
  },
  {
    id: 44,
    question: "Güvertede pas (rust) gidermede 'chipping' sonrası ilk doğru adım hangisidir?",
    options: ["Yüzeyi temizleyip astar (primer) atmak", "Doğrudan son kat boyayı uygulamak", "Yüzeyi gres yağıyla korumaya almak", "Yüzeyi tuzlu deniz suyuyla yıkamak"],
    correctAnswer: 0,
    explanation: "Pas temizlendikten sonra yüzey temizlenip astar (primer) atılır; ardından ara/son katlar gelir.",
    category: "Bakım"
  },
  {
    id: 45,
    question: "Sentetik halat (örn. polipropilen) için çelik halata göre doğru ifade hangisidir?",
    options: ["Çelik halattan düşük snap-back enerjisi taşır", "Yüksek elastikiyet nedeniyle tehlikeli savrulur", "Hiç bakım gerektirmez, kontrolü zorunlu değildir", "Suda batar, bu yüzden pervaneye dolanmaz"],
    correctAnswer: 1,
    explanation: "Sentetik halatlar yüksek elastikiyet nedeniyle koptuğunda ciddi snap-back riski taşır.",
    category: "Palamar"
  },
  {
    id: 46,
    question: "Watchkeeping (vardiya) sırasında devir teslimde (handover) görevli en kritik kuralı hangisidir?",
    options: ["Devralan durumu kavramadan devretmemek", "Vardiyayı hiç beklemeden hemen devretmek", "Yalnızca rota bilgisini aktarmak", "Devri jurnale hiç kaydetmemek"],
    correctAnswer: 0,
    explanation: "STCW: Devralan zabit durumu tam değerlendirip emin olmadan vardiya devredilmez.",
    category: "Vardiya"
  },
  {
    id: 47,
    question: "STCW dinlenme saatleri kuralına göre 24 saatlik dönemde minimum dinlenme süresi nedir?",
    options: ["8 saat", "10 saat", "12 saat", "6 saat"],
    correctAnswer: 1,
    explanation: "STCW/MLC: Herhangi bir 24 saatte en az 10 saat, 7 günlük dönemde en az 77 saat dinlenme.",
    category: "Vardiya"
  },
  {
    id: 48,
    question: "Köprüüstü vardiyasında 'sole look-out' (tek gözcü) gündüz koşuluyla ilgili doğru ifade hangisidir?",
    options: ["Koşullar güvenliyse gündüz uygulanabilir", "Gece vardiyalarında her zaman serbesttir", "Hiçbir koşulda uygulanması mümkün değildir", "Kaptan izniyle gece de uygulanabilir"],
    correctAnswer: 0,
    explanation: "STCW: Sole look-out yalnızca durum tam değerlendirilip güvenli olduğunda ve gündüz uygulanabilir.",
    category: "Vardiya"
  },
  {
    id: 49,
    question: "Pilotaj (kılavuz kaptan) gemideyken sorumlulukla ilgili doğru ifade hangisidir?",
    options: ["Vardiya zabiti sorumluluğunu bırakır", "Kaptan emniyetten sorumlu olmayı sürdürür", "Kılavuz köprüüstünden hiç ayrılamaz", "Tüm sorumluluk kılavuz kaptana geçer"],
    correctAnswer: 1,
    explanation: "Pilotun varlığı kaptan ve vardiya ekibinin gemi emniyetinden sorumluluğunu kaldırmaz.",
    category: "Vardiya"
  },
  {
    id: 50,
    question: "Palamar operasyonunda 'make fast' komutu ne demektir?",
    options: ["Halatı babaya emniyetli biçimde sabitle", "Halatı boşalt ve tamburdan tümüyle salıver", "Halatı keserek denize bırakıp uzaklaş", "Vinci durdurup fren uygula ve bekle"],
    correctAnswer: 0,
    explanation: "Make fast: halatı baba/biti üzerine emniyetli olacak şekilde sabitlemek.",
    category: "Palamar"
  },
  {
    id: 51,
    question: "Palamar terimi 'heave away' ne anlama gelir?",
    options: ["Vinçle halatı içeri al ve ger", "Demir atmaya hazırlan ve bekle", "Halatı boşalt ve gevşek bırak", "Halatı kesip serbest bırak"],
    correctAnswer: 0,
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
    options: ["Yük elleçleme planını takip etmek", "Pozisyonu izleyip demir taramasını fark etmek", "Güvertede boya ve bakım işlerini yürütmek", "Yakıt ikmali planını hazırlayıp uygulamak"],
    correctAnswer: 1,
    explanation: "Anchor watch: pozisyon/kerteriz izleyerek demir taramasını ve trafik/havayı kontrol etmek.",
    category: "Demirleme"
  },
  {
    id: 54,
    question: "COLREG Kural 19 (sınırlı görüşte seyir) için doğru ifade hangisidir?",
    options: ["Güvenli hızda, gerekirse durabilecek şekilde", "Stand-on ve give-way kuralları aynen uygulanır", "Seyir fenerleri kapatılıp radar kullanılır", "Hız artırılarak görüş alanı hızla terk edilir"],
    correctAnswer: 0,
    explanation: "Rule 19: Sınırlı görüşte güvenli hız, radar kullanımı ve gerekirse rota/hız değişimiyle dikkatli seyir gerekir.",
    category: "COLREG"
  },
  {
    id: 55,
    question: "Pilot çarmıhı (pilot ladder) kullanımıyla ilgili SOLAS gereği doğru olan hangisidir?",
    options: ["Gece kullanımında aydınlatma gerekmez", "9 m'yi aşarsa kombinasyon donanımı kullanılır", "İstenen her açı ve yükseklikte kurulabilmektedir", "Tek basamak ve tek el tutamağı yeterlidir"],
    correctAnswer: 1,
    explanation: "SOLAS V/23: Tırmanma 9 m'yi aşarsa accommodation ladder ile kombinasyon ve gece aydınlatma zorunludur.",
    category: "Manevra"
  },
  {
    id: 56,
    question: "COLREG Kural 9 (dar kanallar) için doğru ifade hangisidir?",
    options: ["Kanalın tam ortasından seyredilir", "Kanalın iskele dış kenarına yakın seyredilir", "Kanalın sancak dış kenarına yakın seyredilir", "Kanal içinde demirleyerek sıra beklenir"],
    correctAnswer: 2,
    explanation: "Rule 9: Dar kanal/geçitte gemi, güvenli ve uygulanabilir olduğunca kanalın sancak dış kenarına yakın seyreder.",
    category: "COLREG"
  },
  {
    id: 57,
    question: "COLREG Kural 18 önceliklerine göre güçle yürüyen gemi (power-driven) kime yol vermelidir?",
    options: ["Kısıtlı, sınırlı, balıkçı ve yelkenliye", "Hiçbir gemiye yol verme yükümlülüğü yoktur", "Yalnızca yelkenli gemilere yol verir", "Yalnızca balıkçı gemilerine yol verir"],
    correctAnswer: 0,
    explanation: "Rule 18: Power-driven gemi; NUC, RAM, balıkçı ve yelkenli gemilere yol vermekle yükümlüdür.",
    category: "COLREG"
  },
  {
    id: 58,
    question: "COLREG Kural 17 (stand-on) gemi, çatışma yakınsa ne yapabilir?",
    options: ["Demir atarak yolunu tamamen keser", "Çatışmayı önleyecek aksiyonu kendisi alır", "Hiçbir aksiyon almadan rotasını korumayı sürdürür", "Yalnızca iskele tarafına dönüş yapar"],
    correctAnswer: 1,
    explanation: "Rule 17: Give-way manevra yapmazsa stand-on gemi çatışmayı önlemek için aksiyon alabilir/almalıdır.",
    category: "COLREG"
  },
  {
    id: 59,
    question: "COLREG Kural 8'e göre çatışmadan kaçınma manevrası nasıl olmalıdır?",
    options: ["Belirgin, zamanında ve iyi denizcilikle", "Küçük ve sık rota değişimleriyle yapılır", "Yalnızca hız değişimiyle yapılmalıdır", "Son anda ve ani biçimde yapılmalıdır"],
    correctAnswer: 0,
    explanation: "Rule 8: Manevra erken, belirgin (gözle/radarla fark edilir) ve yeterli olmalıdır.",
    category: "COLREG"
  },
  {
    id: 60,
    question: "Demirlemede 'foul anchor' ne demektir?",
    options: ["Demirin temiz ve serbest biçimde çıkması", "Demirin dibi iyi tutmuş olması", "Demire zincir veya enkaz dolanması", "Demirin zincirle birlikte kaybı"],
    correctAnswer: 2,
    explanation: "Foul anchor: demire kendi zinciri, başka zincir veya dipteki cisimlerin dolanması durumudur.",
    category: "Demirleme"
  },
  {
    id: 61,
    question: "İki demirle 'open moor' yapmanın temel amacı nedir?",
    options: ["Demir kaldırma süresini kısaltmak", "Tutuşu artırıp salınımı azaltmak", "Demirde yakıt tüketimini azaltmak", "Pruvayı tümüyle serbest bırakmak"],
    correctAnswer: 1,
    explanation: "İki demir kullanımı tutuşu artırır ve geminin salma (yawing) alanını sınırlandırır.",
    category: "Demirleme"
  },
  {
    id: 62,
    question: "Manila/sentetik halat depolamada en doğru yaklaşım hangisidir?",
    options: ["Islak ve güneş altında açıkta saklamak", "Yağ dolu varil içinde bekletmek", "Kuru, havadar ve UV'den korunan yerde", "Güvertede serbest yığın hâlinde bırakmak"],
    correctAnswer: 2,
    explanation: "Halatlar kuru, havadar, UV ve kimyasallardan korunan ortamda saklanmalı; nem ve güneş ömrünü kısaltır.",
    category: "Bakım"
  },
  {
    id: 63,
    question: "Timber hitch (kütük bağı) en uygun ne için kullanılır?",
    options: ["Halat ucunda sabit göz oluşturmak", "Silindirik cismi çekmek için kavramak", "İki halatı uç uca ekleyip uzatmak", "Halat ucuna stopper düğümü atmak"],
    correctAnswer: 1,
    explanation: "Timber hitch, silindirik bir cismi sürükleme/çekme için kavrar; gerginlik altında sıkılaşır.",
    category: "Düğümler"
  },
  {
    id: 64,
    question: "Rolling hitch'in (gergi/işkı bağı) ana avantajı nedir?",
    options: ["Su altında kendiliğinden çözülmesi", "Eksenel yük altında kaymaya direnci", "Yük altında bile hızla çözülebilmesi", "Yalnızca zincir üzerinde çalışması"],
    correctAnswer: 1,
    explanation: "Rolling hitch, başka bir halat veya direk üzerinde eksenel yük altında kaymadan tutunur (örn. gergin halatı tutmak).",
    category: "Düğümler"
  },
  {
    id: 65,
    question: "Lifebuoy (can simidi) ile ilgili SOLAS gereği doğru olan hangisidir?",
    options: ["En az ikisinde ışık ve duman bulunmalı", "Tüm can simitleri ışıklı olmak zorundadır", "Gemide tek bir can simidi yeterlidir", "Can simitlerinin rengi mavi olmalıdır"],
    correctAnswer: 0,
    explanation: "SOLAS III: Köprüüstü yakınındaki en az iki can simidi otomatik ışık ve duman sinyaliyle (self-activating) donatılır.",
    category: "Can Kurtarma"
  },
  {
    id: 66,
    question: "Immersion suit (dalgıç/hayatta kalma elbisesi) ile ilgili doğru ifade hangisidir?",
    options: ["Yalnızca yüzme antrenmanı için kullanılır", "Yalnızca yangın müdahalesinde kullanılır", "Hipotermiyi geciktirir ve yüzdürme sağlar", "Tek beden üretilir, herkese aynı gelir"],
    correctAnswer: 2,
    explanation: "Immersion suit soğuk suda ısı kaybını azaltır; SOLAS gereği her kişi için temin edilir (gemi tipine göre).",
    category: "Can Kurtarma"
  },
  {
    id: 67,
    question: "Can salı (liferaft) hidrostatik bırakacı (HRU) ne işe yarar?",
    options: ["Sal içindeki suyu ısıtarak korur", "Batmada salı otomatik serbest bırakır", "Salı kılıf içinde sıkıştırıp sabitler", "Salı basınçlı hava ile şişirir"],
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
    options: ["Dümeni tam basılı konumda tutmaya devam et", "Hızı 5 knot kadar azalt", "Dümen açısını 5 dereceye azalt", "Pruvayı 5 derece sancağa al"],
    correctAnswer: 2,
    explanation: "Ease to five: mevcut dümen açısını azaltıp 5 dereceye getirmek.",
    category: "Dümen Komutları"
  },
  {
    id: 70,
    question: "Helm komutu 'Meet her' ne için verilir?",
    options: ["Dönüşü hızlandırmak için dümen bas", "Dönüşü durdurmak için karşı dümen", "Demir atmaya hazırlanmasını istemek", "Devri artırıp hızı yükseltmesini istemek"],
    correctAnswer: 1,
    explanation: "Meet her: geminin dönme oranını yavaşlatmak/durdurmak için ters yöne dümen uygulamak.",
    category: "Dümen Komutları"
  },
  {
    id: 71,
    question: "Pervaneli geminin 'transverse thrust' (paddle wheel) etkisi en çok ne zaman belirgindir?",
    options: ["Düşük hızda ve tornistan başında", "Tam yolda ve yüksek devirde", "Demirde beklerken ve akıntısız suda", "Yelken altında seyrederken"],
    correctAnswer: 0,
    explanation: "Yanal itki etkisi (özellikle sağ devirli pervanede kıçı iskeleye atar) düşük hız ve tornistanda belirgindir.",
    category: "Manevra"
  },
  {
    id: 72,
    question: "Pivot point (dönme noktası) ileri yolda yaklaşık nerededir?",
    options: ["Kıç omuzlukta, dümen yakınında", "Tam ortada, orta kesitte", "Pruvaya yakın, yaklaşık 1/4 boyda", "Su hattının üzerindeki bir noktada"],
    correctAnswer: 2,
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
    options: ["Normal yağlamanın yüzeye çıkması", "Halatın dış yüzeyinde renk değişimi", "Damarların açılması, ciddi hasar", "Halatın yeni ve kullanılmamış olması"],
    correctAnswer: 2,
    explanation: "Birdcaging, halatın damarlarının kafes gibi açılmasıdır; halat hasarlıdır ve kullanım dışı bırakılır.",
    category: "Bakım"
  },
  {
    id: 75,
    question: "Cathodic protection (katodik koruma) güvertede/teknede ne işe yarar?",
    options: ["Boyanın parlaklığını uzun süre korur", "Sakrifisyel anotlarla korozyonu önler", "Sefer başına yakıt tüketimini azaltır", "Yüzeyde denetimli pas tabakası üretir"],
    correctAnswer: 1,
    explanation: "Sakrifisyel anotlar (çinko/alüminyum) korozyona kendini feda ederek tekne metalini korur.",
    category: "Bakım"
  },
  {
    id: 76,
    question: "Yüksek basınçlı su jeti/grit blasting öncesi en kritik emniyet adımı nedir?",
    options: ["Çalışma alanında müzik yayını açmak", "Son kat boya rengini önceden belirlemek", "KKD kullanıp alan emniyetini sağlamak", "Yedek halat ve makara temin etmek"],
    correctAnswer: 2,
    explanation: "Yüksek basınç ve toz/partikül ciddi yaralanma yapar; uygun KKD ve alan emniyeti şarttır.",
    category: "İş Emniyeti"
  },
  {
    id: 77,
    question: "Aloft (yüksekte/direkte) çalışmada zorunlu emniyet unsuru hangisidir?",
    options: ["Yalnızca baret takmak yeterlidir", "Harness, gantline ve düşme koruması", "Yalnızca çelik burunlu iş botu giymek", "Yalnızca iş eldiveni kullanmak"],
    correctAnswer: 1,
    explanation: "Yüksekte çalışmada harness, ikincil emniyet (lifeline/gantline) ve alttaki alanın kapatılması gerekir.",
    category: "İş Emniyeti"
  },
  {
    id: 78,
    question: "Vardiya devrinde görüş sınırlıyken (sis) devreden zabit en çok neyi vurgulamalı?",
    options: ["ARPA hedefleri, ses işaretleri ve hız", "Gün içindeki kumanya ve yemek düzeni planı", "Güvertedeki boya ve bakım programı", "Limanda hazırlanacak evrak listesi"],
    correctAnswer: 0,
    explanation: "Sınırlı görüşte trafik (ARPA), ses işaretleri ve güvenli hız kritik bilgilerdir; eksiksiz devredilmeli.",
    category: "Vardiya"
  },
  {
    id: 79,
    question: "BRM (Bridge Resource Management) temel amacı nedir?",
    options: ["Yük istif planını köprüden yönetmek", "Kaynakları kullanıp hata zincirini kırmak", "Yakıt ikmalini planlayıp maliyeti düşürmek", "Sefer hızını artırıp süreyi kısaltmak"],
    correctAnswer: 1,
    explanation: "BRM; iletişim, görev paylaşımı ve durumsal farkındalıkla kaza zincirini kırmayı hedefler.",
    category: "Vardiya"
  },
  {
    id: 80,
    question: "Kaptanı çağırma (call the master) kuralı için doğru ifade hangisidir?",
    options: ["Şüphe hâlinde tereddütsüz çağırılır", "Yalnızca çatışma riski varsa çağırılır", "Gece hiçbir koşulda çağrılmaz", "Yalnızca liman yakınında çağırılır"],
    correctAnswer: 0,
    explanation: "STCW: Görüş kötüleşmesi, trafik şüphesi, ekipman arızası vb. durumlarda zabit tereddüt etmeden kaptanı çağırır.",
    category: "Vardiya"
  },
  {
    id: 81,
    question: "MOB'da 'Anderson turn' (single turn) ne zaman tercih edilir?",
    options: ["Yalnızca gece ve görüş kapalı olduğunda", "Yalnızca demirde beklenirken", "Kazazede görülüyorsa en hızlı dönüş", "Yalnızca yoğun sis çökmüş durumda"],
    correctAnswer: 2,
    explanation: "Anderson turn en hızlı dönüştür; kazazede görülüyor ve gemi manevra kabiliyeti yüksekse uygundur.",
    category: "Acil Durum"
  },
  {
    id: 82,
    question: "Palamar operasyonunda 'check the line' komutu ne ister?",
    options: ["Halatı denize atıp bölgeden uzaklaş", "Halatı kontrollü gerginlikte tut", "Halatı tümüyle boşalt ve tamburdan sal", "Halatı keserek tümüyle serbest bırak"],
    correctAnswer: 1,
    explanation: "Check: halata kontrollü fren uygulayarak ani gerilimi yumuşatmak (sürtünme turuyla).",
    category: "Palamar"
  },
  {
    id: 83,
    question: "Tow (yedekleme) operasyonunda 'gob rope / gog rope' ne işe yarar?",
    options: ["Halatın yana kaymasını sınırlandırmak", "Yedek halatın boyunu kısaltmak", "Yedekleme sırasında demir atmak", "Yedek halat üzerinden yakıt hattı geçirmek"],
    correctAnswer: 0,
    explanation: "Gob rope, römorkörde tow halatının kıça doğru hareketini sınırlandırarak girting (yan yatma) riskini azaltır.",
    category: "Manevra"
  },
  {
    id: 84,
    question: "Mooring planında 'fairlead' (kurt ağzı) işlevi nedir?",
    options: ["Halatı gerektiğinde hızla kesmek", "Halatı ısıtıp esnekliğini artırmak", "Halatı doğru açıyla yönlendirmek", "Demirin dibi tutmasını sağlamak"],
    correctAnswer: 2,
    explanation: "Fairlead/Panama lead halatı uygun açıyla yönlendirir; keskin temas ve aşınmayı önler.",
    category: "Palamar"
  },
  {
    id: 85,
    question: "Rescue boat ile bir kazazedeyi sudan alırken en güvenli yaklaşım hangisidir?",
    options: ["Pervaneyi kazazedeye yakın çalıştırmak", "Rüzgâraltından yavaş ve kontrollü yaklaşmak", "Tam yolda hızla yaklaşıp yanına gitmek", "Kıçtan dümdüz yaklaşıp yanında durmak"],
    correctAnswer: 1,
    explanation: "Genelde rüzgâraltından kontrollü yaklaşılır; pervane kazazededen uzak tutulur, sürüklenme kontrol edilir.",
    category: "Can Kurtarma"
  }
];

export const seamanshipQuestions: QuizQuestion[] = [
  ...baseSeamanshipQuestions,
  ...seamanshipQuestionsExtended,
];

