import type { QuizQuestion } from "@/types/quiz";

export const safetyQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "SOLAS'a göre yolcu gemilerinde haftalık olarak yapılması zorunlu tatbikatlar hangileridir?",
    options: ["Yalnızca yangın tatbikatı", "Yalnızca can salı tatbikatı", "Gemiyi terk (abandon ship) ve yangın tatbikatı", "ISPS güvenlik tatbikatı"],
    correctAnswer: 2,
    explanation: "SOLAS III/19.3.2: yolcu gemilerinde her hafta bir gemiyi terk (abandon ship) tatbikatı ve bir yangın tatbikatı yapılmalıdır. Ayrıca yeni binen yolcular için kalkıştan önceki 24 saat içinde toplanma (muster) düzenlenir.",
    category: "SOLAS/LSA"
  },
  {
    id: 2,
    question: "ISM Kodu kapsamında DPA (Designated Person Ashore) kim tarafından atanır?",
    options: ["Kaptan", "Şirket yönetimi", "Baş mühendis", "Liman otoritesi"],
    correctAnswer: 1,
    explanation: "DPA şirket tarafından atanır ve gemi-kıyı arasında emniyet bağlantısını sağlar.",
    category: "ISM"
  },
  {
    id: 3,
    question: "ISPS Kodu kaç güvenlik seviyesi tanımlar?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    explanation: "ISPS: 3 güvenlik seviyesi (1/2/3).",
    category: "ISPS"
  },
  {
    id: 4,
    question: "Makine dairesinde sabit köpük sistemleri için tipik uygulama hızı hangi değere yakındır?",
    options: ["2.5 L/m²/dk", "4.0 L/m²/dk", "6.5 L/m²/dk", "10.0 L/m²/dk"],
    correctAnswer: 2,
    explanation: "Makine dairesi köpük sistemlerinde yaygın referans değer 6.5 L/m²/dk'dır.",
    category: "FFA"
  },
  {
    id: 5,
    question: "EPIRB genellikle hangi koşulda otomatik olarak aktive olur?",
    options: ["Yangın alarmıyla", "HRU ile 1–4 m derinlikte serbest kalınca", "Kaptan emriyle", "Makine arızasında"],
    correctAnswer: 1,
    explanation: "Hidrostatik serbest bırakma (HRU) EPIRB'i 1–4 m derinlikte serbest bırakır; cihaz suyla temasla aktive olur.",
    category: "GMDSS"
  },
  {
    id: 6,
    question: "Risk matrisinde skor 15 ve üzeri genellikle hangi risk kategorisine girer?",
    options: ["Düşük", "Orta", "Yüksek", "Kabul edilebilir"],
    correctAnswer: 2,
    explanation: "Birçok SMS matrisinde 15–25 aralığı 'yüksek risk' olarak tanımlanır.",
    category: "SMS"
  },
  {
    id: 7,
    question: "Hot Work (Sıcak İş) izni hangi işler için gereklidir?",
    options: ["Temizlik işleri", "Kaynak/kesme/taşlama", "Boya işleri", "Elektrik ölçüm işleri"],
    correctAnswer: 1,
    explanation: "Isı ve kıvılcım üreten tüm işler Hot Work kapsamındadır.",
    category: "PTW"
  },
  {
    id: 8,
    question: "Can sallarının servis aralığı en fazla ne kadardır?",
    options: ["6 ay", "12 ay", "18 ay", "24 ay"],
    correctAnswer: 1,
    explanation: "Liferaft bakımı genellikle en geç 12 ayda bir yetkili istasyonda yapılır.",
    category: "SOLAS/LSA"
  },
  {
    id: 9,
    question: "Enclosed space entry için en kritik ölçümlerden biri hangisidir?",
    options: ["Deniz suyu tuzluluğu", "O2 ve LEL (patlayıcı) ölçümü", "Barometre", "Rüzgâr yönü"],
    correctAnswer: 1,
    explanation: "Kapalı mahallerde oksijen eksikliği ve patlayıcı/toksik gaz riski vardır; ölçüm şarttır.",
    category: "PTW"
  },
  {
    id: 10,
    question: "Yangın sınıflarında 'Class B' neyi ifade eder?",
    options: ["Katı maddeler", "Yanıcı sıvılar", "Metal yangınları", "Elektrik yangınları"],
    correctAnswer: 1,
    explanation: "Class B: flammable liquids (benzin, solvent vb.).",
    category: "FFA"
  },
  {
    id: 11,
    question: "CO2 sabit yangın söndürme sistemini devreye almadan önce en kritik adım hangisidir?",
    options: ["Kapıları açmak", "Personeli tahliye edip mahalı kapatmak", "Havalandırmayı artırmak", "Yangına su vermek"],
    correctAnswer: 1,
    explanation: "CO2 boğucu etkili gazdır; personel tahliyesi + mahal sızdırmazlığı şarttır.",
    category: "FFA"
  },
  {
    id: 12,
    question: "Can yeleğinde (lifejacket) temel amaç hangisidir?",
    options: ["Isıyı artırmak", "Kişiyi su üstünde ve yüzü yukarıda tutmak", "Hızlandırmak", "Sadece görünürlük"],
    correctAnswer: 1,
    explanation: "Lifejacket, bilinç kaybında bile kişiyi yüzü yukarı pozisyona getirip afloat tutmayı hedefler.",
    category: "SOLAS/LSA"
  },
  {
    id: 13,
    question: "SART (Search and Rescue Transponder) temel olarak hangi cihazla etkileşir?",
    options: ["GPS", "Radar", "Echosounder", "AIS"],
    correctAnswer: 1,
    explanation: "SART, X-band radar sinyaline cevap vererek ekran üzerinde işaretler üretir.",
    category: "GMDSS"
  },
  {
    id: 14,
    question: "Bir iş kazasında 'near miss' neyi ifade eder?",
    options: ["Kesin yaralanma", "Yaralanma/hasar olmadan atlatılan olay", "Planlı tatbikat", "Yetkisiz giriş"],
    correctAnswer: 1,
    explanation: "Near miss, kaza olabilirdi ama zarar oluşmadan atlatıldı; raporlama ile önlem geliştirilir.",
    category: "SMS"
  },
  {
    id: 15,
    question: "PPE hiyerarşisinde (kontrol önlemleri) en etkili yaklaşım hangisidir?",
    options: ["Sadece PPE kullanmak", "Tehlikeyi ortadan kaldırmak (elimination)", "Uyarı levhası", "Eldiven takmak"],
    correctAnswer: 1,
    explanation: "Kontrol hiyerarşisinde elimination/substitution en üsttedir; PPE en son bariyerdir.",
    category: "İş Güvenliği"
  },
  {
    id: 16,
    question: "Muster list (alarm rol listesi) neyi düzenler?",
    options: ["Kargo planını", "Acil durum görev dağılımını", "Yakıt tüketimini", "Radar ayarlarını"],
    correctAnswer: 1,
    explanation: "Muster list, acil durumda herkesin görevini ve toplanma yerini tanımlar.",
    category: "SOLAS/LSA"
  },
  {
    id: 17,
    question: "Foam (köpük) özellikle hangi yangınlarda etkilidir?",
    options: ["Metal", "Yanıcı sıvı", "Kağıt/odun", "Elektrik panosu"],
    correctAnswer: 1,
    explanation: "Köpük, Class B'de yüzeyi örter ve buharlaşmayı/oksijen temasını azaltır.",
    category: "FFA"
  },
  {
    id: 18,
    question: "Lifeboat/liferaft 'embarkation' sırasında en kritik risklerden biri hangisidir?",
    options: ["Güneş yanığı", "Düşme ve sıkışma", "Uyku", "Yüksek tuzluluk"],
    correctAnswer: 1,
    explanation: "Embarkation, düşme/sıkışma ve kontrolsüz hareket riskleri taşır; talimatlara uyulmalı.",
    category: "SOLAS/LSA"
  },
  {
    id: 19,
    question: "Gemi üzerinde 'lock-out/tag-out' (LOTO) sistemi neyi hedefler?",
    options: ["Güverteyi boyamak", "Enerji izolasyonu ile kazara çalıştırmayı önlemek", "GPS güncellemek", "Kargo ısıtmak"],
    correctAnswer: 1,
    explanation: "LOTO, bakım/onarımda ekipman enerjisinin izole edilmesini ve yanlışlıkla devreye alınmamasını sağlar.",
    category: "İş Güvenliği"
  },
  {
    id: 20,
    question: "SOLAS'ta yangın kapılarının (fire doors) temel amacı hangisidir?",
    options: ["Hava sirkülasyonu", "Yangın ve dumanın yayılımını sınırlamak", "Dekorasyon", "Ses yalıtımı"],
    correctAnswer: 1,
    explanation: "Fire doors, bölmeler arası yangın/duman geçişini geciktirir ve kaçış için zaman kazandırır.",
    category: "SOLAS/FFA"
  },
  {
    id: 21,
    question: "Bir yangın alarmında, dumanı tahliye etmek için kontrolsüz kapı açmak neden risklidir?",
    options: ["Risk değildir", "Oksijen sağlayarak yangını büyütebilir", "Suyu artırır", "Sesi azaltır"],
    correctAnswer: 1,
    explanation: "Kapı açmak hava/oksijen sağlayıp 'flashover/backdraft' riskini artırabilir.",
    category: "FFA"
  },
  {
    id: 22,
    question: "İlk yardımda ciddi kanamada en doğru ilk müdahale hangisidir?",
    options: ["Yarayı yıkamak", "Doğrudan basınç uygulamak", "Bandajı gevşek bırakmak", "Kişiyi yürütmek"],
    correctAnswer: 1,
    explanation: "Masif kanamada doğrudan basınç, yükseltme ve gerekiyorsa turnike prosedürü uygulanır.",
    category: "İlk Yardım"
  },
  {
    id: 23,
    question: "Gemi üzerinde 'safety induction' (oryantasyon) en çok neyi sağlar?",
    options: ["Daha hızlı internet", "Temel emniyet kuralları ve prosedürlere aşinalık", "Yakıt tasarrufu", "Harita düzeltmesi"],
    correctAnswer: 1,
    explanation: "Yeni katılan personelin acil durumlar, PPE, PTW, toplanma yerleri gibi kritik konuları öğrenmesini sağlar.",
    category: "SMS"
  },
  {
    id: 24,
    question: "SCBA (self-contained breathing apparatus) en çok hangi durumda gereklidir?",
    options: ["Açık güvertede", "Dumanlı/oksijeni belirsiz ortamda", "Kamarada", "Köprüüstünde"],
    correctAnswer: 1,
    explanation: "Duman/oksijen eksikliği/toksik gaz ihtimali olan alanlarda SCBA şarttır.",
    category: "PPE"
  },
  {
    id: 25,
    question: "Güvertede kayma/düşmeyi azaltmak için en temel önlem hangisidir?",
    options: ["Koşmak", "Housekeeping ve uygun ayakkabı", "Işıkları kapatmak", "Rüzgârı ölçmek"],
    correctAnswer: 1,
    explanation: "Düzenli güverte, döküntülerin temizlenmesi ve uygun ayakkabı kayma/düşmeyi ciddi azaltır.",
    category: "İş Güvenliği"
  },
  {
    id: 26,
    question: "SOLAS'a göre yük gemilerinde gemiyi terk (abandon ship) ve yangın tatbikatları hangi sıklıkta yapılmalıdır?",
    options: ["Haftada bir", "Ayda bir", "Üç ayda bir", "Yılda bir"],
    correctAnswer: 1,
    explanation: "SOLAS III/19.3.2: yük gemilerinde her bir gemiyi terk ve yangın tatbikatı ayda en az bir kez yapılır. Mürettebatın %25'inden fazlası değiştiyse kalkıştan sonraki 24 saat içinde tatbikat yapılır.",
    category: "SOLAS/LSA"
  },
  {
    id: 27,
    question: "SOLAS'a göre can filikalarının (lifeboat) suya indirilerek yapılan tatbikatı hangi azami aralıkta gerçekleştirilmelidir?",
    options: ["1 ay", "3 ay", "6 ay", "12 ay"],
    correctAnswer: 1,
    explanation: "SOLAS III/19.3.3.3: her can filikası mümkünse her ay yüzdürülmeli ve manevra yaptırılmalıdır; ancak en az 3 ayda bir indirilip suda kullanılmalıdır.",
    category: "SOLAS/LSA"
  },
  {
    id: 28,
    question: "Yangın üçgeni (fire triangle) hangi üç bileşenden oluşur?",
    options: ["Yakıt, oksijen, su", "Yakıt, oksijen, ısı", "Isı, duman, basınç", "Oksijen, ısı, karbondioksit"],
    correctAnswer: 1,
    explanation: "Yangın için yakıt, oksijen ve ısı (tutuşma kaynağı) gereklidir. Söndürme bu bileşenlerden en az birini ortadan kaldırarak yapılır.",
    category: "FFA"
  },
  {
    id: 29,
    question: "Yangın sınıflarında 'Class A' neyi ifade eder?",
    options: ["Yanıcı sıvılar", "Katı yanıcı maddeler (odun, kağıt, kumaş)", "Yanıcı gazlar", "Metal yangınları"],
    correctAnswer: 1,
    explanation: "Class A: kül bırakan katı yanıcı maddeler (odun, kağıt, tekstil). Su ve köpük ile söndürülür.",
    category: "FFA"
  },
  {
    id: 30,
    question: "Yangın sınıflarında 'Class D' hangi yangınları kapsar?",
    options: ["Elektrik yangınları", "Yanıcı metaller (sodyum, magnezyum)", "Mutfak yağ yangınları", "Gaz yangınları"],
    correctAnswer: 1,
    explanation: "Class D: yanıcı metal yangınları (magnezyum, sodyum, alüminyum tozu). Özel kuru toz söndürücü gerekir; su tehlikelidir.",
    category: "FFA"
  },
  {
    id: 31,
    question: "Immersion suit (dalış/hayatta kalma elbisesi) temel olarak hangi tehlikeye karşı koruma sağlar?",
    options: ["Yangın", "Hipotermi (soğuk su)", "Boğulma sesi", "Güneş yanığı"],
    correctAnswer: 1,
    explanation: "Immersion suit, soğuk suda vücut ısı kaybını yavaşlatarak hipotermi riskini azaltır (SOLAS III/32 ve LSA Code).",
    category: "SOLAS/LSA"
  },
  {
    id: 32,
    question: "Bir kişi denize düştüğünde (Man Overboard) köprüüstünde atılması gereken ilk manevra eylemlerinden biri hangisidir?",
    options: ["Makineyi durdurmak", "Dümeni MOB tarafına basıp can simidi/MOB işareti atmak", "Demir atmak", "Telsizi kapatmak"],
    correctAnswer: 1,
    explanation: "MOB anında dümen kazazedenin düştüğü tarafa basılır (pervaneyi uzaklaştırmak için), can simidi/duman işareti atılır ve gözcü atanır.",
    category: "MOB"
  },
  {
    id: 33,
    question: "Williamson dönüşü (Williamson turn) hangi durumda tercih edilir?",
    options: ["Yüksek hızda seyirde", "Denize adam düştüğünde, özellikle düşme anı belirsizse veya gece/sis koşulunda", "Demirleme manevrasında", "Yanaşma manevrasında"],
    correctAnswer: 1,
    explanation: "Williamson dönüşü gemiyi ters rotaya, yani izi (track) üzerine getirir; MOB pozisyonu belirsiz olduğunda veya görüş kısıtlıyken etkilidir.",
    category: "MOB"
  },
  {
    id: 34,
    question: "Lifebuoy (can simidi) sayısı ve donanımı SOLAS'a göre nasıl olmalıdır? Köprüüstü kanatlarındaki simitlerde hangisi bulunur?",
    options: ["Sadece ışık", "Otomatik ışık ve duman işareti (self-igniting light + smoke signal)", "Sadece halat", "Hiçbir donanım"],
    correctAnswer: 1,
    explanation: "SOLAS III/7.1: köprüüstü kanatlarındaki en az iki can simidi hem otomatik ışık hem de kendiliğinden duman çıkaran işaretle ve hızlı bırakma düzeniyle donatılır.",
    category: "SOLAS/LSA"
  },
  {
    id: 35,
    question: "Pyrotechnic (işaret fişeği) türlerinden 'rocket parachute flare' hangi renkte yanar ve ne süre görünür kalır?",
    options: ["Yeşil, 10 sn", "Kırmızı, yaklaşık 40 saniye paraşütle iner", "Beyaz, 5 sn", "Mavi, 2 dk"],
    correctAnswer: 1,
    explanation: "LSA Code: paraşütlü işaret fişeği kırmızı yanar, en az 240 m yükseğe çıkar ve paraşütle en az 40 saniye süreyle yanarak iner.",
    category: "SOLAS/LSA"
  },
  {
    id: 36,
    question: "ISM Kodunun (International Safety Management) temel amacı hangisidir?",
    options: ["Yakıt tasarrufu", "Denizde emniyetli işletim ve kirliliğin önlenmesi için yönetim sistemi kurmak", "Kargo hızını artırmak", "Liman ücretlerini düşürmek"],
    correctAnswer: 1,
    explanation: "ISM Kodu (SOLAS Bölüm IX), emniyetli gemi işletimi ve deniz kirliliğinin önlenmesi için Emniyetli Yönetim Sistemi (SMS) kurulmasını zorunlu kılar.",
    category: "ISM"
  },
  {
    id: 37,
    question: "ISM Kodu kapsamında gemide bulunması gereken temel doküman hangisidir?",
    options: ["Sadece B/L", "Safety Management Certificate (SMC) ve şirkette DOC", "Sadece sigorta poliçesi", "Sadece yük manifestosu"],
    correctAnswer: 1,
    explanation: "Şirkete Document of Compliance (DOC), gemiye ise Safety Management Certificate (SMC) düzenlenir; ISM uyumunun kanıtıdır.",
    category: "ISM"
  },
  {
    id: 38,
    question: "ISPS Kodu kapsamında gemide güvenlikten sorumlu görevli kimdir?",
    options: ["Baş mühendis", "Ship Security Officer (SSO)", "Lostromo", "Aşçı"],
    correctAnswer: 1,
    explanation: "ISPS: gemi güvenlik planının uygulanmasından Ship Security Officer (SSO) sorumludur; kıyıda CSO, limanda PFSO bulunur.",
    category: "ISPS"
  },
  {
    id: 39,
    question: "ISPS güvenlik seviyesi 2 (Security Level 2) neyi ifade eder?",
    options: ["Normal/rutin durum", "Yükselmiş risk; ek koruyucu önlemler bir süre uygulanır", "Olası/yakın tehdit; en yüksek önlemler", "Güvenlik yok"],
    correctAnswer: 1,
    explanation: "Seviye 1 normal, Seviye 2 güvenlik olayı riskinin arttığı ve ek tedbirlerin alındığı, Seviye 3 ise olayın olası/yakın olduğu en yüksek seviyedir.",
    category: "ISPS"
  },
  {
    id: 40,
    question: "Sabit CO2 sistemi bir mahale boşaltıldıktan sonra mahale yeniden girişte en kritik kural hangisidir?",
    options: ["Hemen girmek", "Yeterli havalandırma ve gaz ölçümü yapılmadan, SCBA olmadan girmemek", "Sadece ışıkları açmak", "Kapıyı kapalı tutmak"],
    correctAnswer: 1,
    explanation: "CO2 oksijeni uzaklaştırır ve boğucudur. Yangın söndükten sonra mahal iyice havalandırılmadan ve atmosfer kontrol edilmeden, SCBA olmadan girilmez.",
    category: "FFA"
  },
  {
    id: 41,
    question: "Sprinkler sisteminde algılayıcı bulbların farklı renkleri neyi gösterir?",
    options: ["Üreticiyi", "Aktivasyon sıcaklığını", "Su basıncını", "Boru çapını"],
    correctAnswer: 1,
    explanation: "Cam bulb renkleri (örn. kırmızı 68°C, sarı 79°C, yeşil 93°C) sprinkler kafasının patlayıp suyu boşaltacağı sıcaklığı belirtir.",
    category: "FFA"
  },
  {
    id: 42,
    question: "Fireman's outfit (yangıncı teçhizatı) içinde aşağıdakilerden hangisi bulunur?",
    options: ["Sadece eldiven", "Koruyucu giysi, çizme, eldiven, baret, emniyet lambası, balta ve SCBA", "Sadece can yeleği", "Sadece düdük"],
    correctAnswer: 1,
    explanation: "SOLAS II-2/10 ve FSS Code: yangıncı teçhizatı koruyucu kıyafet, bot, eldiven, baret, emniyet lambası, yangıncı baltası ve solunum cihazından (SCBA) oluşur.",
    category: "FFA"
  },
  {
    id: 43,
    question: "EEBD (Emergency Escape Breathing Device) ne amaçla kullanılır?",
    options: ["Yangınla mücadele", "Dumanlı ortamdan kaçış için kısa süreli solunum (yaklaşık 10-15 dk)", "Dalış", "Kargo gazı ölçümü"],
    correctAnswer: 1,
    explanation: "EEBD yalnızca tehlikeli atmosferden kaçış içindir; en az 10 dakika kullanım süresi sağlar. Yangınla mücadele veya kapalı mahalle giriş için kullanılmaz.",
    category: "FFA"
  },
  {
    id: 44,
    question: "GMDSS'te DSC (Digital Selective Calling) ile gönderilen tehlike çağrısının ardından telsiz haberleşmesi (distress traffic) tipik olarak hangi kanalda yapılır?",
    options: ["VHF Kanal 16 / 2182 kHz", "VHF Kanal 6", "VHF Kanal 13", "VHF Kanal 70"],
    correctAnswer: 0,
    explanation: "VHF Kanal 70 DSC uyarısı içindir; sesli tehlike trafiği VHF Kanal 16 (156.8 MHz) veya MF'te 2182 kHz üzerinden yürütülür.",
    category: "GMDSS"
  },
  {
    id: 45,
    question: "Free-fall (serbest düşmeli) can filikalarında temel avantaj nedir?",
    options: ["Daha ucuz olması", "Gemiden hızlı ve güvenilir ayrılma; vinç/halat arızasından bağımsız iniş", "Daha az yer kaplaması", "Sadece görünürlük"],
    correctAnswer: 1,
    explanation: "Serbest düşmeli filika kıçtan suya bırakılır; davit/vinç bağımlılığı olmadan hızla gemiden uzaklaşır, özellikle tankerlerde tercih edilir.",
    category: "SOLAS/LSA"
  },
  {
    id: 46,
    question: "Risk değerlendirmesinde (risk assessment) risk skoru genellikle nasıl hesaplanır?",
    options: ["Olasılık + Şiddet", "Olasılık × Şiddet (sonuç)", "Sadece şiddet", "Maliyet × Süre"],
    correctAnswer: 1,
    explanation: "Risk genellikle olayın olma olasılığı (probability) ile sonucun şiddetinin (severity) çarpımı olarak değerlendirilir.",
    category: "SMS"
  },
  {
    id: 47,
    question: "Kapalı mahalle (enclosed space) girişte güvenli kabul edilen minimum oksijen seviyesi yaklaşık kaçtır?",
    options: ["%15", "%18", "%20.9 (normal atmosfer)", "%25"],
    correctAnswer: 2,
    explanation: "Güvenli giriş için atmosfer hacimce yaklaşık %20.9 oksijen içermelidir (normal atmosfer). Düşük oksijen (örn. <%19.5) tehlikelidir; IMO Resolution A.1050(27).",
    category: "PTW"
  },
  {
    id: 48,
    question: "MARPOL kapsamında değil ama emniyet kapsamında: yağmurda/buzlu güvertede çalışan personel için 'permit to work' yanında en kritik unsur hangisidir?",
    options: ["Hava durumu raporu", "Tehlike değerlendirmesi, uygun PPE ve gerektiğinde emniyet kemeri/harness", "Yüksek hız", "Telsiz susturma"],
    correctAnswer: 1,
    explanation: "Yüksekte/açık güvertede çalışmada düşme önleme (fall protection), uygun PPE ve risk değerlendirmesi esastır; emniyet kemeri/harness sabit bir noktaya bağlanır.",
    category: "İş Güvenliği"
  },
  {
    id: 49,
    question: "Davit ile indirilen can filikalarında 'on-load release gear' bakımı neden kritiktir?",
    options: ["Estetik için", "Yük altında kazara açılma kazalarını önlemek için", "Boya korumak için", "Hız için"],
    correctAnswer: 1,
    explanation: "On-load release mekanizmasının hatalı bakımı/kullanımı, filika asılıyken kazara serbest kalmasına ve ölümcül kazalara yol açabilir; SOLAS III/1.5 ve MSC.1/Circ.1392 sıkı kontrol ister.",
    category: "SOLAS/LSA"
  },
  {
    id: 50,
    question: "Hidrostatik serbest bırakma ünitesi (HRU) bağlı bir can salının (liferaft), gemi battığında otomatik yüzeye çıkması için 'weak link' (zayıf halka) ne işe yarar?",
    options: ["Salı gemiye sabit tutmak", "Salı şişirip belirli bir gerilimde kopanarak gemiden ayırmak", "Salı ağırlaştırmak", "Işık vermek"],
    correctAnswer: 1,
    explanation: "Weak link, salın painter halatını gemiye bağlı tutar; sal şişer, gemi batıp belirli yük aşılınca zayıf halka kopar ve sal yüzeyde serbest kalır.",
    category: "SOLAS/LSA"
  },
  {
    id: 51,
    question: "SOLAS II-2'ye göre bir geminin yangın kontrol planlarının (fire control plan) bir kopyası nerede bulundurulmalıdır?",
    options: ["Sadece kaptan kamarasında", "Güverte üzerinde, su geçirmez bir muhafaza içinde, dışarıdan gelen itfaiye için", "Makine kontrol odasında", "Köprüüstü çekmecesinde gizli"],
    correctAnswer: 1,
    explanation: "SOLAS II-2/15.2.4: yangın kontrol planlarının bir nüshası, sürekli güverte üzerinde su geçirmez bir kapta, kıyıdan gelen itfaiye personelinin ulaşabilmesi için bulundurulur.",
    category: "SOLAS/FFA"
  },
  {
    id: 52,
    question: "Yangın söndürmede 'cooling' (soğutma) yöntemi yangın üçgeninin hangi bileşenini hedef alır?",
    options: ["Yakıt", "Oksijen", "Isı", "Zincirleme reaksiyon"],
    correctAnswer: 2,
    explanation: "Su ile soğutma, yanan maddeyi tutuşma sıcaklığının altına indirir; bu yöntem yangın üçgeninin ısı bileşenini ortadan kaldırır.",
    category: "FFA"
  },
  {
    id: 53,
    question: "Yangın sınıflarında 'Class C' uluslararası (IMO/Avrupa) sınıflandırmaya göre neyi ifade eder?",
    options: ["Yanıcı katılar", "Yanıcı gazlar", "Elektrik yangınları", "Mutfak yağları"],
    correctAnswer: 1,
    explanation: "Avrupa/IMO sınıflandırmasında Class C yanıcı gazları (propan, bütan, doğal gaz vb.) ifade eder. (NFPA sisteminde Class C elektriktir; bu farka dikkat edilmelidir.)",
    category: "FFA"
  },
  {
    id: 54,
    question: "Mutfak fritöz/yağ yangınları (cooking oils/fats) hangi yangın sınıfına girer?",
    options: ["Class A", "Class B", "Class F (veya K)", "Class D"],
    correctAnswer: 2,
    explanation: "Pişirme yağ ve katı yağları Class F (Avrupa) / Class K (ABD) sınıfındadır; wet chemical söndürücü kullanılır, su kullanılmaz.",
    category: "FFA"
  },
  {
    id: 55,
    question: "SOLAS'a göre acil yangın pompasının (emergency fire pump) ana yangın pompasından temel farkı nedir?",
    options: ["Daha büyük olması", "Ana makine dairesi dışında, bağımsız güç kaynağıyla çalışması", "Sadece limanda kullanılması", "Tatlı su basması"],
    correctAnswer: 1,
    explanation: "Acil yangın pompası, ana makine dairesindeki yangın bu daireyi kullanılmaz kılsa bile su sağlayabilmek için makine dairesi dışına, ayrı bir güç kaynağıyla yerleştirilir (SOLAS II-2/10).",
    category: "FFA"
  },
  {
    id: 56,
    question: "Uluslararası kıyı bağlantısı (International Shore Connection) ne işe yarar?",
    options: ["Elektrik almak", "Kıyıdan veya başka gemiden yangın suyu hattına bağlanmak", "Yakıt almak", "Balast basmak"],
    correctAnswer: 1,
    explanation: "International Shore Connection, geminin yangın ana hattının kıyı tesisinin veya başka bir geminin su kaynağına bağlanmasını sağlayan standart flanştır (SOLAS II-2/10.2.1.7).",
    category: "FFA"
  },
  {
    id: 57,
    question: "Kuru kimyevi toz (dry powder) söndürücü hangi yangınlarda kullanılmamalıdır (etkinlik/temizlik açısından sakıncalı)?",
    options: ["Sıvı yakıt", "Gaz yangını", "Hassas elektronik ekipmanlar (kalıntı bırakır)", "Çöp yangını"],
    correctAnswer: 2,
    explanation: "Kuru kimyevi toz aşındırıcı/iletken olabilen kalıntı bırakır ve hassas elektronik/elektrik ekipmanına zarar verir; bu tür yerlerde CO2 tercih edilir.",
    category: "FFA"
  },
  {
    id: 58,
    question: "SOLAS III/19'a göre her mürettebat üyesinin can salı/filika tatbikatlarına en geç ne kadar süre içinde katılmış olması gerekir?",
    options: ["Gemiye katıldıktan sonraki ilk hafta", "Gemiye katıldıktan sonraki ilk ay", "İlk üç ay", "İlk altı ay"],
    correctAnswer: 1,
    explanation: "SOLAS III/19.3.2: bir mürettebat üyesi son tatbikata katılmamışsa, gemiye katılmasını izleyen 24 saat içinde gemiyle tanıştırılmalı ve tatbikatlara katılmalıdır; her üye ayda bir tatbikata katılır.",
    category: "SOLAS/LSA"
  },
  {
    id: 59,
    question: "Can filikası motoru, soğuk havalarda dahil olmak üzere ne kadar süre çalışabilecek yakıta sahip olmalı ve hangi hızı sağlamalıdır?",
    options: ["6 saat / 3 knot", "24 saat / en az 6 knot (tam yükle sakin suda)", "12 saat / 4 knot", "48 saat / 10 knot"],
    correctAnswer: 1,
    explanation: "LSA Code 4.4: can filikası motoru en az 24 saat çalışacak yakıta sahip olmalı ve tam yüklü filikayı sakin suda en az 6 knot hızla yürütebilmelidir.",
    category: "SOLAS/LSA"
  },
  {
    id: 60,
    question: "Quick Closing Valve (hızlı kapama valfi) yakıt/yağ tanklarında hangi acil durumda kullanılır?",
    options: ["Yakıt almak için", "Makine dairesi yangınında uzaktan yakıt beslemesini kesmek için", "Tank temizlemek için", "Balast basmak için"],
    correctAnswer: 1,
    explanation: "Hızlı kapama valfleri, makine dairesi yangınında yakıt/yağ tanklarından beslemeyi makine dairesi dışından uzaktan kapatarak yangına yakıt gitmesini engeller (SOLAS II-2).",
    category: "FFA"
  },
  {
    id: 61,
    question: "Çift gaz tüplü olmayan bir SCBA'da hava şişesinin tipik nominal kullanım süresi yaklaşık ne kadardır?",
    options: ["5 dakika", "30 dakika (tipik 1200 L / 6 L 200 bar tüp)", "2 saat", "10 saat"],
    correctAnswer: 1,
    explanation: "Tipik yangıncı SCBA tüpü yaklaşık 1200 litre hava içerir ve normal nefes alımıyla yaklaşık 30 dakika kullanım sağlar; ağır eforla bu süre kısalır.",
    category: "PPE"
  },
  {
    id: 62,
    question: "Acil durumda 'General Emergency Alarm' sinyali nasıldır?",
    options: ["Bir uzun düdük", "Yedi veya daha fazla kısa ardından bir uzun düdük/zil", "İki kısa düdük", "Sürekli ışık"],
    correctAnswer: 1,
    explanation: "Genel acil durum alarmı, gemi düdüğü/zili ile en az yedi kısa ve ardından bir uzun ses olarak verilir (SOLAS III/6.4.2).",
    category: "SOLAS/LSA"
  },
  {
    id: 63,
    question: "Hidrostatik serbest bırakma ünitesinin (HRU) genel değiştirme/servis aralığı tipik olarak nedir?",
    options: ["Her sefer", "Üreticiye göre genellikle 2 yılda bir (disposable tipte)", "10 yıl", "Hiç değişmez"],
    correctAnswer: 1,
    explanation: "Çoğu tek kullanımlık (disposable) HRU üreticileri 2 yılda bir değiştirilmesini ister; üzerinde son kullanma tarihi yazar.",
    category: "SOLAS/LSA"
  },
  {
    id: 64,
    question: "İki kişiyle gerçekleştirilen kapalı mahal kurtarma operasyonunda dışarıda bekleyen kişinin (standby man) görevi nedir?",
    options: ["Mahale girip yardım etmek", "Girişte kalıp iletişimi sürdürmek ve gerektiğinde alarm vermek/yardım çağırmak", "Kapıyı kapatmak", "Pompa çalıştırmak"],
    correctAnswer: 1,
    explanation: "Standby man giriş ağzında kalır; içerideki kişiyle sürekli iletişim kurar, acil durumda alarm verir ve eğitimli kurtarma ekibini çağırır, kendisi içeri dalmaz.",
    category: "PTW"
  },
  {
    id: 65,
    question: "ISPS Kodunda 'Declaration of Security' (DoS) ne zaman düzenlenir?",
    options: ["Her yük operasyonunda", "Gemi-liman veya gemi-gemi etkileşiminde güvenlik sorumluluklarının paylaşılması gerektiğinde", "Sadece seviye 3'te", "Hiçbir zaman"],
    correctAnswer: 1,
    explanation: "DoS, gemi ile liman tesisi (veya başka gemi) arasında güvenlik önlemleri ve sorumlulukların açıkça belirlenmesi gerektiğinde, özellikle farklı güvenlik seviyeleri veya yüksek risk durumunda düzenlenir.",
    category: "ISPS"
  },
  {
    id: 66,
    question: "ISM Kodu kapsamında 'non-conformity' (uygunsuzluk) nedir?",
    options: ["Kaza", "Belirlenmiş bir gereğin karşılanmadığını gösteren gözlemlenen durum", "Yangın tatbikatı", "Liman denetimi"],
    correctAnswer: 1,
    explanation: "ISM 1.1.9: uygunsuzluk, belirtilen bir gerekliliğin yerine getirilmediğine dair objektif kanıtla saptanan durumdur; 'major non-conformity' ise ciddi tehdit oluşturan sapmadır.",
    category: "ISM"
  },
  {
    id: 67,
    question: "Boğulan/solunumu duran bir kazazedede CPR sırasında önerilen göğüs kompresyon hızı yetişkinde kaçtır?",
    options: ["Dakikada 40-60", "Dakikada 100-120", "Dakikada 150-180", "Dakikada 30"],
    correctAnswer: 1,
    explanation: "Güncel ilk yardım (ILCOR/AHA) kılavuzları yetişkinde dakikada 100-120 kompresyon ve yaklaşık 5-6 cm derinlik önerir; 30 kompresyon : 2 soluk oranı uygulanır.",
    category: "İlk Yardım"
  },
  {
    id: 68,
    question: "Hipotermi geçirmiş bir kazazedeye yapılmaması gereken müdahale hangisidir?",
    options: ["Islak giysileri çıkarıp kuru/sıcak örtmek", "Sert biçimde ovalamak ve alkol vermek", "Yatay tutmak", "Tıbbi yardım çağırmak"],
    correctAnswer: 1,
    explanation: "Hipotermide sert ovma ve alkol verme tehlikelidir; soğuk kan ani dolaşıma karışıp kalp ritmini bozabilir (afterdrop). Kazazede nazikçe, kademeli olarak ısıtılır.",
    category: "İlk Yardım"
  },
  {
    id: 69,
    question: "Lifeboat davit fren testi ve halat (fall) yenilenmesi konusunda doğru olan hangisidir?",
    options: ["Halatlar hiç değişmez", "Halatlar gerektiğinde, en geç 5 yılda bir uçtan uca çevrilir/yenilenir", "Frenler test edilmez", "Sadece kuru dokta kontrol edilir"],
    correctAnswer: 1,
    explanation: "SOLAS III/20.4: filika halatları (falls) bozulduğunda veya en geç 5 yılda bir ters çevrilir; yıpranma durumunda yenilenir. Davit frenleri düzenli test edilir.",
    category: "SOLAS/LSA"
  },
  {
    id: 70,
    question: "Yangınla mücadelede 'boundary cooling' (sınır soğutma) ne amaçla yapılır?",
    options: ["Yangını söndürmek", "Yangının komşu bölmelere yayılmasını engellemek için bitişik bölme yüzeylerini soğutmak", "Dumanı atmak", "Su biriktirmek"],
    correctAnswer: 1,
    explanation: "Boundary cooling, yanan mahalle bitişik perde/güverte yüzeylerine su tutarak ısı iletimini ve yangının komşu bölmelere sıçramasını önler.",
    category: "FFA"
  },
  {
    id: 71,
    question: "Köprüüstünde 'abandon ship' kararını kim verir?",
    options: ["Lostromo", "Sadece kaptan (master)", "Baş mühendis", "DPA"],
    correctAnswer: 1,
    explanation: "Gemiyi terk etme kararı yalnızca kaptana aittir; erken terk genellikle daha tehlikelidir çünkü gemi en iyi can salıdır prensibi geçerlidir.",
    category: "Abandon Ship"
  },
  {
    id: 72,
    question: "Can salına bindikten sonra hayatta kalmada öncelik sıralamasında ('protection-location-water-food') ilk öncelik genellikle hangisidir?",
    options: ["Yiyecek", "Korunma (hipotermi/güneşten korunma) ve salın güvenliği", "Balık tutmak", "Yüzmek"],
    correctAnswer: 1,
    explanation: "Hayatta kalma sıralaması Protection-Location-Water-Food'dur; önce çevre/hipotermiden korunma ve sal emniyeti (sea anchor, kapama), sonra konum bildirme gelir.",
    category: "Abandon Ship"
  },
  {
    id: 73,
    question: "Lifejacket üzerindeki ışık (lifejacket light) SOLAS'a göre ne özellikte olmalıdır?",
    options: ["Renkli yanıp sönen", "En az 8 saat süreyle yanan beyaz ışık", "Sadece 1 saat", "Kırmızı sürekli"],
    correctAnswer: 1,
    explanation: "LSA Code 2.2.3: can yeleği ışığı en az 0.75 cd şiddetinde, en az 8 saat süreyle çalışan beyaz ışık olmalıdır; otomatik ışıklar yanıp sönebilir.",
    category: "SOLAS/LSA"
  },
  {
    id: 74,
    question: "Tankerlerde 'Inert Gas System (IGS)' temel emniyet amacı nedir?",
    options: ["Kargoyu ısıtmak", "Tank atmosferindeki oksijeni düşürerek patlayıcı ortam oluşmasını önlemek", "Kargo pompalamak", "Tankı yıkamak"],
    correctAnswer: 1,
    explanation: "IGS, kargo tanklarına oksijeni %8'in (genellikle ≤%5) altına düşüren inert gaz basarak yanma için gerekli oksijen oranının altına iner ve patlama riskini ortadan kaldırır (SOLAS II-2).",
    category: "FFA"
  },
  {
    id: 75,
    question: "MOB durumunda 'Anderson turn' (single turn) hangi durumda en uygundur?",
    options: ["MOB pozisyonu belirsizken", "Adamın düştüğü hemen fark edildiğinde, en hızlı geri dönüş gerektiğinde", "Dar sularda demirlerken", "Sisli havada izi takip ederken"],
    correctAnswer: 1,
    explanation: "Anderson (tek) dönüş en hızlı geri dönüş manevrasıdır ve düşme anının hemen fark edildiği, manevra alanının yeterli olduğu durumlarda kullanılır; ancak yaklaşma hassasiyeti düşüktür.",
    category: "MOB"
  }
];

