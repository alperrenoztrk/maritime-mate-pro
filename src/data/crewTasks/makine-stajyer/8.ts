import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Acil sistemler (emergency systems) ve test eğitimi",
  roleSlug: "makine-stajyer",
  taskIndex: 8,
  estimatedPages: 26,
  intro: `Makine stajyeri, gemideki acil sistemlerin (emergency systems) işleyişini ve test prosedürlerini gözlemci olarak öğrenmek zorundadır. Bu sistemler; emergency generator (acil jeneratör), emergency fire pump (acil yangın pompası), emergency air compressor (acil hava kompresörü) ve emergency steering gear (acil dümen sistemi) testlerini kapsar. Stajyer ayrıca quick closing valve (hızlı kapama valfi), emergency stop ve ventilation flap'lerin remote (uzaktan) operasyon prensiplerini, ve blackout recovery (kararma sonrası toparlanma) prosedürünün adım adım izlenmesini öğrenir. Bu sistemler, normal güç ve kontrol kaybedildiğinde geminin emniyetini koruyan son savunma hattıdır. Bu bölüm, her sistemin işlevini, test mantığını ve mevzuat gerekliliğini açıklar.`,
  sources: [
    "SOLAS Chapter II-1 — Emergency source of electrical power",
    "SOLAS Chapter II-2 — Fire pumps (emergency fire pump dahil)",
    "SOLAS Regulation II-1/29 — Steering gear (emergency steering dahil)",
    "SOLAS Regulation II-2/4 — Quick closing valves ve remote shut-off",
    "FSS Code — Fire Safety Systems Code",
    "ISM Code — Element 8 (Emergency Preparedness) ve test/drill kayıtları",
    "IMO Model Course 7.04 — Officer in charge of an engineering watch",
    "Sınıf kuruluşu (Class) kuralları — emergency systems survey gereklilikleri",
  ],
  chapters: [
    {
      heading: "1. Acil Sistemlerin Mantığı ve Önemi",
      lead: `Acil sistemler, "her şey ters gittiğinde" devreye giren son savunma hattıdır. Asla denenmezse, gerektiğinde çalışmayabilir.`,
      sections: [
        {
          subheading: "1.1 Neden bağımsız acil sistemler",
          paragraphs: [
            `Geminin ana güç ve kontrol sistemleri arızalandığında — blackout, yangın, su basması — emniyeti korumak için bağımsız, kendi güç kaynağına sahip acil sistemler gerekir. Bunlar ana sistemden ayrı konumlandırılır (genelde ana güverte üstünde, su geçirmez bölmede) ve ana güç olmadan çalışabilir. Amaç, en kötü senaryoda bile temel emniyet fonksiyonlarını sürdürmektir.`,
            `Acil sistemler yalnızca var olmakla yetmez; düzenli test edilip bakımları yapılarak "her an çalışmaya hazır" tutulmalıdır. Test edilmeyen bir acil jeneratör veya yangın pompası, gerçek acil durumda çalışmama riski taşır. Bu yüzden mevzuat, bu sistemlerin periyodik testini zorunlu kılar; stajyer bu testleri gözlemleyerek öğrenir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-1 — Acil güç kaynağı",
              text: `Gemi, ana güç kaybında emniyet için kritik yükleri (acil aydınlatma, dümen, haberleşme, yangın pompası, su geçirmez kapılar) besleyebilen bağımsız bir acil elektrik güç kaynağı bulundurmalıdır. Bu kaynak periyodik test edilir.`,
            },
          ],
        },
        {
          subheading: "1.2 Stajyerin gözlemci rolü",
          paragraphs: [
            `Stajyer, acil sistem testlerine gözlemci olarak katılır; sistemi başlatmaz veya bağımsız müdahale etmez, ancak test prosedürünü, sistemin tepkisini ve başarı kriterlerini dikkatle izler. "Bu sistem ne zaman, neden ve nasıl devreye giriyor?" sorusunun yanıtını her testte pekiştirir.`,
            `Stajyer için acil sistem testleri çok değerli öğrenme fırsatlarıdır: normal işletmede görülmeyen senaryolar (güç kaybı, otomatik devreye girme) kontrollü koşullarda gözlemlenir. Stajyer her testi TRB'ye işler ve gözlemlerini eğitmen mühendisle tartışır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Emergency Generator (Acil Jeneratör)",
      sections: [
        {
          subheading: "2.1 İşlev ve otomatik devreye girme",
          paragraphs: [
            `Emergency generator, ana güç (main generators) kaybedildiğinde otomatik devreye girerek emergency switchboard üzerinden kritik yükleri besler: acil aydınlatma, seyir fenerleri, dümen (steering gear), haberleşme (GMDSS), yangın algılama, su geçirmez kapılar ve emergency fire pump. Genellikle ana güverte üstünde, kendi yakıt tankı ve marş sistemiyle bulunur.`,
            `Blackout olduğunda emergency generator otomatik olarak (auto-start) çalışır ve genelde 45 saniye içinde yük alacak duruma gelir (SOLAS gerekliliği). Marş kaynağı bağımsızdır (akü veya basınçlı hava). Stajyer, auto-start testini gözlemleyerek sistemin güç kaybını nasıl algıladığını ve devreye girdiğini öğrenir.`,
          ],
          table: {
            caption: `Emergency Generator Kritik Yükleri (Örnek)`,
            headers: ["Yük", "İşlev", "Önem"],
            rows: [
              ["Acil aydınlatma", "Kaçış/çalışma alanları", "Tahliye emniyeti"],
              ["Steering gear", "Dümen kontrolü", "Manevra/çatışma önleme"],
              ["GMDSS/haberleşme", "Acil iletişim", "Yardım çağırma"],
              ["Emergency fire pump", "Yangın suyu", "Yangınla mücadele"],
              ["Watertight doors", "Su geçirmez kapılar", "Su basması kontrolü"],
            ],
          },
        },
        {
          subheading: "2.2 Test prosedürü ve gözlem noktaları",
          paragraphs: [
            `Emergency generator testi, hem manuel start (haftalık deneme) hem de auto-start (güç kaybı simülasyonu) içerir. Test sırasında; marş başarısı, çalışma süresine ulaşma, voltaj/frekans stabilitesi, emergency switchboard'a yük aktarımı ve yakıt/yağ durumu gözlemlenir. Test sonrası sistem tekrar standby moduna alınır.`,
            `Stajyer, testte özellikle "süre" boyutuna dikkat eder: jeneratör ne kadar hızlı yük alabilir durumuna geldi? Auto-start güç kaybını doğru algıladı mı? Yakıt tankı yeterli mi (genelde belirli süre çalışacak kapasitede tutulur)? Bu gözlemler, gerçek acil durumda sistemin güvenilirliğinin göstergesidir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Acil jeneratör testi 'formalite' değildir",
              text: `Haftalık emergency generator testi rutin görünse de, gerçek blackout anında çalışacak tek sistem odur. Stajyer testi dikkatle izlemeli; marş gecikmesi, yük alamama veya yakıt eksikliği gibi anormaller gerçek acil durumda ölümcül olabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Emergency Fire Pump (Acil Yangın Pompası)",
      sections: [
        {
          subheading: "3.1 İşlev ve bağımsızlık",
          paragraphs: [
            `Emergency fire pump, ana yangın pompaları çalışamadığında (örneğin makine dairesi yangını ana pompaları devre dışı bıraktığında) yangın söndürme suyu sağlar. Bu yüzden makine dairesinin dışında, ayrı bir bölmede konumlandırılır ve kendi bağımsız güç kaynağına (emergency generator beslemeli motor veya bağımsız dizel) sahiptir.`,
            `Pompanın bağımsız konumu kritiktir: makine dairesi yangınında ana pompalar erişilemez olabilir; emergency fire pump bu senaryoda yangın hattına basınç sağlamayı sürdürür. SOLAS, pompanın kapasitesini ve belirli yangın muslukla­rında minimum basınç sağlamasını şart koşar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-2 — Acil yangın pompası",
              text: `Gemi, ana yangın pompalarından bağımsız ve onların devre dışı kaldığı durumda dahi çalışabilen bir acil yangın pompası bulundurmalıdır; pompa makine dairesi dışında, kendi güç kaynağıyla konumlandırılır.`,
            },
          ],
        },
        {
          subheading: "3.2 Test ve priming gözlemi",
          paragraphs: [
            `Emergency fire pump testi; pompanın çalıştırılması, priming (yabancı pompalarda emiş hattının doldurulması), yangın hattına basınç sağlama ve uzak yangın muslukla­rında basınç doğrulamasını içerir. Self-priming özelliği veya priming sisteminin çalışması, pompanın su emebilmesi için kritiktir; priming başarısızlığı pompayı işe yaramaz kılar.`,
            `Stajyer, testte pompanın ne kadar sürede basınç sağladığını ve uzaktan başlatma (remote start) mekanizmasını gözlemler. Çoğu gemide pompa, makine dairesi dışından uzaktan başlatılabilir; bu, yangında makine dairesine girmeden müdahaleyi mümkün kılar. Stajyer bu remote start noktasının yerini öğrenir.`,
          ],
          bullets: [
            `Pompa start ve priming başarısı`,
            `Yangın hattı basıncı (uzak musluklarda doğrulama)`,
            `Remote start mekanizması ve yeri`,
            `Bağımsız güç kaynağının çalışması`,
            `Test sonrası standby'a alma`,
          ],
        },
      ],
    },
    {
      heading: "4. Emergency Air Compressor ve Emergency Steering Gear",
      sections: [
        {
          subheading: "4.1 Emergency air compressor",
          paragraphs: [
            `Ana makinenin başlatılması (start) genellikle basınçlı hava ile yapılır; bu hava, hava şişelerinde (air receivers) depolanır ve ana hava kompresörleriyle doldurulur. Emergency air compressor, ana kompresörler çalışamadığında (blackout gibi) ana makineyi yeniden başlatmaya yetecek havayı sağlayacak bağımsız kapasitedir; bazı gemilerde bağımsız dizel veya emergency güç beslemeli olabilir.`,
            `Stajyer, blackout recovery'de emergency air compressor'ın rolünü öğrenir: ana makineyi başlatmak için yeterli start havası olmalıdır. Hava şişesi basıncının belirli seviyede tutulması ve emergency kompresörün çalışırlığı, kararma sonrası toparlanmanın ön koşuludur. Test, kompresörün basınç sağlama yeteneğini doğrular.`,
          ],
        },
        {
          subheading: "4.2 Emergency steering gear",
          paragraphs: [
            `Dümen sistemi (steering gear), geminin manevra ve çatışma önleme yeteneğinin temelidir; bu yüzden yedekli (redundant) tasarlanır. Ana steering gear arızalanırsa veya güç kaybedilirse, emergency steering moduna geçilir: ikinci hidrolik pompa devreye alınır veya steering gear room'dan lokal/manuel kontrol uygulanır. Köprü ile steering gear room arasında haberleşme (telefon) ve dümen açısı göstergesi bulunur.`,
            `Stajyer, emergency steering tatbikatını gözlemler: köprüden steering gear room'a kontrol nasıl devredilir, lokal kontrol nasıl yapılır, haberleşme nasıl sağlanır. SOLAS, emergency steering drill'in düzenli yapılmasını şart koşar; gerçek bir dümen arızası anında ekip provalı olmalıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-1/29 & V — Steering gear",
              text: `Steering gear yedekli olmalı ve emergency steering drill'leri düzenli yapılmalıdır (genelde 3 ayda bir, ana ve yardımcı steering gear ile manevra ve haberleşme provası dahil). Stajyer bu drilleri gözlemler ve TRB'ye işler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Quick Closing Valve, Emergency Stop ve Ventilation Flap",
      lead: `Bu remote (uzaktan) sistemler, yangın anında makine dairesine girmeden yakıtı, ekipmanı ve havayı kontrol etmeyi sağlar.`,
      sections: [
        {
          subheading: "5.1 Quick closing valve (hızlı kapama valfi)",
          paragraphs: [
            `Quick closing valve, yakıt/yağ tanklarının çıkışına yerleştirilen ve uzaktan (genelde makine dairesi dışından, bir kontrol kabininden) kapatılabilen valflerdir. Bir makine dairesi yangınında, bu valfler uzaktan kapatılarak yangına yakıt beslemesi kesilir; bu, yangının büyümesini önlemenin en kritik adımlarındandır.`,
            `Valfler genelde yay veya pnömatik/hidrolik mekanizmayla, uzak bir noktadaki kol veya buton ile kapatılır. Stajyer, hangi tankların quick closing valve'i olduğunu, uzaktan kapama noktasının yerini ve kapama sonrası yakıt beslemesinin nasıl kesildiğini öğrenir. Bu valflerin periyodik test edilmesi (gerçekten kapanıyor mu) önemlidir.`,
          ],
          table: {
            caption: `Remote Emergency Kontrolleri ve İşlevleri`,
            headers: ["Kontrol", "İşlev", "Yangında rolü"],
            rows: [
              ["Quick closing valve", "Tank çıkış valfi uzaktan kapama", "Yakıt beslemesini kes"],
              ["Emergency stop", "Pompa/fan/separatör durdurma", "Yakıt/yağ transferini durdur"],
              ["Ventilation flap", "Hava giriş/çıkış kapama", "Oksijeni kes (smothering)"],
              ["Fuel pump trip", "Yakıt pompası durdurma", "Beslemeyi tamamen kes"],
            ],
          },
        },
        {
          subheading: "5.2 Emergency stop ve ventilation flap remote operasyonu",
          paragraphs: [
            `Emergency stop butonları, makine dairesi dışından yakıt pompalarını, separatörleri, fanları ve diğer kritik ekipmanı uzaktan durdurur. Bu, yangında ortama yakıt/yağ beslemesini ve hava sirkülasyonunu durdurarak müdahaleyi mümkün kılar. Ventilation flap'ler (havalandırma kapakları) ise uzaktan kapatılarak makine dairesine hava (oksijen) girişi kesilir.`,
            `Fixed smothering system (CO2 veya benzeri) devreye alınmadan önce, ventilation flap'ler kapatılmalı ve fanlar durdurulmalıdır; aksi halde söndürücü gaz dışarı atılır ve yangın söndürülemez. Stajyer, bu remote kontrollerin yangın söndürme zincirindeki sırasını öğrenir: yakıt kes → ekipman durdur → havalandırma kapat → personel say → fixed system release.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Fixed system öncesi personel sayımı",
              text: `Makine dairesine fixed smothering system (CO2 vb.) salınmadan önce mutlaka personel sayımı yapılır; içeride kalan biri varsa gaz salınımı ölümcüldür. Ventilation flap kapatma ve fan durdurma da release öncesi zorunlu adımlardır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Blackout Recovery Prosedürü",
      sections: [
        {
          subheading: "6.1 Blackout'un anatomisi ve ilk adımlar",
          paragraphs: [
            `Blackout, tüm ana jeneratörlerin güç kaybetmesiyle geminin elektriksiz ve hareketsiz kalmasıdır. Nedenleri; jeneratör trip (aşırı yük, arıza), yakıt kesintisi, otomasyon hatası veya ana switchboard sorunu olabilir. Blackout anında emergency generator otomatik devreye girer ve kritik yükleri besler; recovery süreci hemen başlar.`,
            `Recovery'nin ilk adımı nedeni hızlıca teşhis etmektir: hangi jeneratör neden trip etti? Sonra bir jeneratör manuel/otomatik başlatılır, ana switchboard'a alınır ve kademeli olarak yük yüklenir (önce kritik, sonra ağır tüketiciler). Aceleyle tüm yükü aynı anda almak yeni bir trip'e (kaskat blackout) yol açabilir.`,
          ],
          bullets: [
            `Emergency generator devreye girdi mi (kritik yükler besleniyor mu)?`,
            `Blackout nedeni teşhis edildi mi?`,
            `Bir jeneratör başlatılıp switchboard'a alındı mı?`,
            `Yük kademeli (önce kritik) alındı mı?`,
            `Ana makine için start havası yeterli mi?`,
            `Ana makine yeniden başlatıldı, köprü bilgilendirildi mi?`,
          ],
        },
        {
          subheading: "6.2 Manevrada blackout ve stajyerin öğrenimi",
          paragraphs: [
            `Blackout, özellikle dar suda veya manevra sırasında en tehlikelidir; gemi hızla manevra ve dümen yeteneğini kaybeder, çatma/karaya oturma riski doğar. Bu yüzden manevra öncesi makine dairesi standby'a alınır (ekstra jeneratör paralelde) ve recovery hızı kritiktir. Köprü ile makine arasında anlık koordinasyon esastır.`,
            `Stajyer, blackout recovery tatbikatını veya gerçek gözlemini büyük bir öğrenme fırsatı olarak değerlendirir: güç sisteminin önceliklendirilmesi, jeneratör paralelleme, start havasının rolü ve ekip iletişimi birkaç dakikada yoğun biçimde sergilenir. Stajyer her adımı izler, sorularını biriktirir ve eğitmen mühendisle tartışır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Provalı recovery hayat kurtarır",
              text: `Dar bir boğazda transit sırasında bir gemide blackout olur. Standby jeneratör zaten paraleldedir; ekip provalı olduğu için saniyeler içinde gücü toparlar ve dümen kontrolü kesilmez. Bu, blackout recovery'nin neden tatbikatla pekiştirildiğinin kanıtıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Test Kayıtları, Bakım ve Mevzuat",
      sections: [
        {
          subheading: "7.1 Test/drill kayıtlarının önemi",
          paragraphs: [
            `Acil sistem testleri ve tatbikatları, ISM ve SOLAS gereği kayıt altına alınır. Test tarihi, sonucu, bulunan anormaller ve düzeltici aksiyonlar belgelenir. Bu kayıtlar, PSC ve sınıf denetiminde sistemin düzenli test edildiğinin kanıtıdır. Test edilmediği belgelenen bir sistem, denetimde ciddi bulgu oluşturur.`,
            `Stajyer, test kayıtlarının nasıl tutulduğunu öğrenir ve katıldığı her testi/tatbikatı TRB'sine işler. Bu, hem mevzuat disiplinini hem de TRB yetkinlik kanıtını besler. Kayıt, "sistem var" demekle yetinmeyip "sistem test edildi ve çalışıyor" demenin tek yoludur.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "İlgili görev: Emniyet prosedürleri",
              text: `Acil sistem testleri, "Emniyet prosedürlerini öğrenme" bölümündeki acil durum prosedürleriyle (yangın, blackout, flooding) doğrudan ilişkilidir. İki bölüm birlikte acil hazırlık resmini tamamlar.`,
            },
          ],
        },
        {
          subheading: "7.2 Acil sistemlerin bakım hazırlığı",
          paragraphs: [
            `Acil sistemler, "her an çalışmaya hazır" olmalıdır; bu, düzenli bakım gerektirir. Emergency generator yakıt/yağ seviyesi ve aküsü, fire pump priming sistemi, hava kompresörü ve quick closing valve mekanizmaları periyodik kontrol edilir. PMS, bu bakımları planlı iş emirleriyle yönetir.`,
            `Stajyer, acil sistemlerin bakımına gözetimli katılarak hem sistemi tanır hem de "neden bu bakım kritik" sorusunu kavrar: bakımsız bir acil sistem, gerçek acil durumda çalışmama riski taşır ki bu, sistemin hiç olmamasından bile tehlikelidir (yanlış güvenlik hissi). Hazır tutulan acil sistem, geminin sigortasıdır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Stajyerin acil sistemler kontrol listesi",
          bullets: [
            `Emergency generator auto-start ve yük aktarımını gözlemledim mi?`,
            `Emergency fire pump priming ve basınç sağlamayı izledim mi?`,
            `Emergency air compressor'ın blackout'taki rolünü öğrendim mi?`,
            `Emergency steering gear devri ve haberleşmesini gözlemledim mi?`,
            `Quick closing valve ve emergency stop noktalarının yerini biliyor muyum?`,
            `Ventilation flap kapama ve fixed system release sırasını kavradım mı?`,
            `Blackout recovery adımlarını (teşhis-start-kademeli yük) izledim mi?`,
            `Tüm test/tatbikatları TRB'ye işledim mi?`,
          ],
          paragraphs: [
            `Acil sistemler, geminin "en kötü gün" hazırlığıdır; normal işletmede görünmez kalır ama bir kriz anında geminin ve mürettebatın hayatta kalmasını belirler. Emergency generator, fire pump, air compressor ve steering gear; quick closing valve ve remote kontroller; blackout recovery — hepsi düzenli test edilmedikçe güvenilir değildir. Stajyer, bu testleri gözlemleyerek "sistem nasıl çalışır ve gerçekten çalışır mı" sorusunu birlikte öğrenir. Bugün gözlemci olarak kavranan acil sistem mantığı, yarın bir krizi yönetecek mühendisin soğukkanlılığının ve hazırlığının temelini oluşturur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
