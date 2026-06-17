import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Emniyet sistemi testleri",
  roleSlug: "ucuncu-muhendis",
  taskIndex: 3,
  estimatedPages: 25,
  intro: `Üçüncü/Dördüncü Mühendis, makine dairesi emniyet cihazlarının periyodik testlerinden sorumludur: bilge high-level alarm, oil mist detector (OMD), bearing temperature alarm, over-speed trip, LO low-pressure alarm/trip ve FO heater high-temperature alarm bunların başlıcalarıdır. Bu cihazlar, ana makine ve yardımcı makinelerin katastrofik arızalarını (crankcase patlaması, yatak sıkışması, devir kaçağı) önleyen otomatik koruma katmanıdır. Bu bölüm, her bir emniyet cihazının çalışma prensibini, test yöntemini, kabul kriterini ve kayıt disiplinini açıklar.`,
  sources: [
    "SOLAS Chapter II-1 — Machinery & Automation Requirements",
    "Classification Society Rules (Unattended/UMS notation testleri)",
    "IACS UR M67 — Oil Mist Detection (crankcase explosion önleme)",
    "Manufacturer Manuals (Graviner/Schaller OMD, Woodward governor)",
    "ISM Code — Section 10 (Maintenance) & critical equipment testing",
    "MARPOL Annex I — bilge alarm sistemleri",
    "PMS / Safety Test Log & Class survey checklists",
    "Reed's / MAN B&W & Wärtsilä engine safety system manuals",
  ],
  chapters: [
    {
      heading: "1. Makine Dairesi Emniyet Felsefesi: Alarm, Slowdown, Trip",
      lead: `Emniyet cihazları üç kademeli korur: önce alarm (operatörü uyarır), sonra slowdown (otomatik yük/devir azaltma), en sonunda shutdown/trip (makineyi durdurur). Her test, bu zincirin doğru çalıştığını kanıtlamalıdır.`,
      sections: [
        {
          subheading: "1.1 Koruma kademeleri ve override mantığı",
          paragraphs: [
            `Modern ana makinelerde safety system, parametreyi izler ve eşik aşıldığında önce alarm verir, devam ederse slowdown veya shutdown uygular. Bazı tehlikeler (örn. düşük LO basıncı, over-speed) doğrudan trip'e bağlıdır çünkü gecikme makineyi tahrip eder. Belirli durumlarda köprüüstü, manevra emniyeti için shutdown'ı geçici override edebilir (örn. dar suda); ancak bu, riskin bilinçli kabulüdür ve kayıt altına alınır.`,
            `Üçüncü/Dördüncü Mühendis, her cihazın hangi kademeye (alarm/slowdown/shutdown) bağlı olduğunu, setpoint değerini ve test yöntemini bilmek zorundadır. Test sırasında gerçek makineyi durdurmadan, çoğunlukla simülasyon (sensör sinyali taklidi) veya bağımsız test fonksiyonu kullanılır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Klas (Class) ve UMS notasyonu",
              text: `UMS/Unattended notasyonuna sahip gemilerde emniyet ve alarm sistemleri klas tarafından özel olarak survey edilir. Periyodik testler, bu notasyonun korunması için zorunludur ve safety test log'una kaydedilir.`,
            },
          ],
        },
        {
          subheading: "1.2 Test planlaması ve kayıt",
          paragraphs: [
            `Emniyet testleri PMS'te calendar job olarak tanımlıdır (haftalık/aylık/üç aylık). Test öncesi köprüüstü bilgilendirilir (trip testleri için), gerekli izolasyon ve duty engineer hazırlığı yapılır. Test sonucu (setpoint, ölçülen değer, aksiyon süresi, geçti/kaldı) safety test log'una ve PMS'e işlenir; arızalı cihaz derhal raporlanır ve geçici koruma tedbiri alınır.`,
          ],
          table: {
            caption: `Makine emniyet cihazları test periyotları (kılavuz)`,
            headers: ["Cihaz", "Koruma", "Tipik periyot"],
            rows: [
              ["Bilge high-level alarm", "Alarm", "Aylık"],
              ["Oil mist detector (OMD)", "Slowdown/Trip", "Aylık + survey"],
              ["Bearing temp. alarm", "Alarm/Slowdown", "3 aylık"],
              ["Over-speed trip", "Shutdown", "3 aylık / survey"],
              ["LO low-pressure trip", "Alarm + Shutdown", "Aylık"],
              ["FO heater high-temp", "Alarm/cut-off", "Aylık"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Bilge High-Level Alarm Testi",
      sections: [
        {
          subheading: "2.1 Float ve kapasitif switch testi",
          paragraphs: [
            `Bilge well high-level alarmları genellikle float (şamandıra) veya kapasitif seviye switch'leridir. Test, switch'in fiziksel olarak yükseltilmesi (float'ın kaldırılması) veya test butonu ile yapılır; alarmın hem lokal panelde hem köprüüstü/CCR (cargo control / engine control room) tekrar panelinde geldiği doğrulanır. Bağlı bilge pompası otomatik start fonksiyonu da test edilir.`,
            `Bilge alarmları yağ/kir nedeniyle yapışabilir; bu yüzden periyodik temizlik ve fonksiyon testi birlikte yapılır. Çalışmayan bir bilge alarmı, makine dairesinde sessiz su birikimine ve geç fark edilen flooding riskine yol açar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Geç fark edilen bilge artışı",
              text: `Bilge high-level alarmının arızalı olması, küçük bir cooler/SW kaçağının fark edilmeden büyümesine ve makine dairesi su basmasına yol açabilir. Arızalı alarm derhal değiştirilir; geçici olarak sounding sıklığı artırılır.`,
            },
          ],
        },
        {
          subheading: "2.2 MARPOL bağlamı",
          paragraphs: [
            `Bilge seviyesi yönetimi yalnızca emniyet değil, kirlilik önleme açısından da önemlidir. Bilge alarmı, bilge holding tank yönetimini besler; OWS operasyon planlaması bu seviyeye göre yapılır. Test ve bulgular kayıt altına alınır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Oil Mist Detector (OMD) Testi",
      sections: [
        {
          subheading: "3.1 OMD prensibi ve crankcase explosion riski",
          paragraphs: [
            `OMD, ana/yardımcı makine karterindeki yağ buharı (oil mist) yoğunluğunu izler. Aşırı yağ buharı, bir yatak/yüzeyin aşırı ısınarak yağı buharlaştırdığının işaretidir; bu buhar tutuşma sınırına ulaşırsa crankcase explosion (karter patlaması) olur. OMD, mist yoğunluğu eşik üstüne çıkınca slowdown/shutdown tetikler ve büyük felaketi önler (IACS UR M67 zorunluluğu).`,
            `Test, dahili test fonksiyonu (referans/dummy chamber, optik sinyal simülasyonu) ile yapılır; ölçüm odacıklarının (measuring head) ve örnekleme borularının temizliği doğrulanır. Kirli/tıkalı örnekleme yolu yanlış ölçüm verir. Alarm/slowdown sinyalinin köprüüstüne ulaştığı teyit edilir.`,
          ],
          table: {
            caption: `OMD test ve kontrol noktaları`,
            headers: ["Kontrol", "Yöntem", "Kabul"],
            rows: [
              ["Self-test/referans", "Dahili test fonksiyonu", "Alarm tetiklenir"],
              ["Measuring head temizliği", "Optik lens kontrol", "Temiz, kirli değil"],
              ["Örnekleme hattı", "Tıkanıklık/kaçak", "Serbest akış"],
              ["Slowdown/Trip sinyali", "Loop test", "Köprü + ECR'de görünür"],
            ],
          },
        },
        {
          subheading: "3.2 Mist tespitinde aksiyon",
          paragraphs: [
            `OMD alarmı asla "false alarm" varsayılıp susturulmaz. Mist tespitinde makine slowdown/stop edilir, karter kapakları en az 20–30 dakika açılmadan beklenir (sıcak nokta soğusun, ani hava girişi patlamayı tetiklemesin) ve ardından inceleme yapılır. Bu prosedür drill ile pekiştirilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: karter patlaması",
              text: `Tarihsel olarak crankcase explosion'lar, yatak aşırı ısınması sonrası karterin erken açılması veya OMD ihmaliyle yıkıcı sonuçlar doğurmuştur. Ders: OMD alarmında makine durdurulur, karter hemen açılmaz, sıcak nokta soğutulur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Bearing Temperature Alarm Testi",
      sections: [
        {
          subheading: "4.1 Sensör simülasyonu ve trend izleme",
          paragraphs: [
            `Ana yatak, krank yatağı, kam mili yatağı ve turbocharger yataklarında sıcaklık sensörleri (Pt100/termokupl) bulunur. Test, sensör girişine simülasyon değeri uygulanarak (decade box / test resistor) alarm/slowdown setpoint'inin doğru tetiklendiğinin doğrulanmasıyla yapılır. Gerçek işletmede yatak sıcaklığı trend olarak izlenir; yavaş yükselen trend, erken aşınma işaretidir.`,
            `Yatak sıcaklık alarmı, OMD ile birlikte karter güvenliğinin ikinci katmanıdır. Ani sıcaklık sıçraması yağlama kaybı veya metal-metal temasını gösterir; bu durumda yük azaltılır ve inceleme yapılır.`,
          ],
        },
        {
          subheading: "4.2 Kabul kriteri ve raporlama",
          paragraphs: [
            `Test sonucu, setpoint değeri ve tetiklenen kademe (alarm/slowdown) ile kayda geçer. Sensör drift'i (gerçek değerden sapma) tespit edilirse kalibrasyon veya değişim planlanır. Çalışmayan bir yatak sıcaklık alarmı, yataktan gelen mekanik bir arızanın geç fark edilmesine yol açar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Trend > anlık değer",
              text: `Tek bir yüksek okuma sensör arızası olabilir; ama sürekli yükselen bir trend gerçek bir yatak problemidir. Emniyet testleri ile günlük parametre trendi birlikte değerlendirilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Over-Speed Trip Testi",
      sections: [
        {
          subheading: "5.1 Mekanik ve elektronik over-speed koruması",
          paragraphs: [
            `Ana makine ve jeneratörler, devrin tehlikeli seviyeye çıkmasını önleyen over-speed trip ile korunur. Mekanik tip (yay yüklü bolt/flyweight) belirli devirde tetiklenir; elektronik tip pickup sensörü + governor ile çalışır. Over-speed, yük kaybı (örn. jeneratörde breaker açılması, pervaneden su çıkması) veya governor arızasında oluşur ve makineyi parçalayabilir.`,
            `Test, kontrollü şekilde (genelde yüksüz, köprü/şef koordinasyonuyla) devir yükseltilerek veya trip mekanizması elle/test fonksiyonuyla tetiklenerek yapılır. Tetiklenme devri (rpm) ölçülür ve üretici/klas değeriyle karşılaştırılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Over-speed testinde dikkat",
              text: `Gerçek devir yükselterek yapılan over-speed testi riskli bir testtir; köprüüstü onayı, sahanın boşaltılması ve acil durdurma hazırlığı şarttır. Test, üreticinin belirttiği prosedüre birebir uyularak yapılır.`,
            },
          ],
        },
        {
          subheading: "5.2 Governor ve yük yönetimi",
          paragraphs: [
            `Over-speed koruması, governor (devir regülatörü) ile bütünleşiktir. Governor arızası ya hunting (devir salınımı) ya da kontrol kaybıyla over-speed yaratır. Jeneratörlerde load-sharing ve frekans kontrolü governor'a bağlıdır; bu yüzden governor bakımı ve over-speed testi birlikte planlanır.`,
          ],
        },
      ],
    },
    {
      heading: "6. LO Low-Pressure Alarm ve Trip Testi",
      sections: [
        {
          subheading: "6.1 Yağlama kaybı: en kritik koruma",
          paragraphs: [
            `Yağlama yağı (LO) basıncının düşmesi, yatakların yağsız kalması ve dakikalar içinde tahrip olması demektir; bu yüzden LO low-pressure çoğu makinede önce alarm, sonra otomatik shutdown'a bağlıdır. Test, basınç switch/transmitter girişi simüle edilerek veya kontrollü basınç düşürülerek yapılır; alarm ve trip setpoint'lerinin doğru tetiklendiği doğrulanır.`,
            `Aynı test, stand-by LO pompasının otomatik start fonksiyonunu da kapsar: ana LO pompası basıncı düşünce yedek pompa otomatik devreye girmelidir. Bu auto-start özelliği, UMS gemilerde hayati önemdedir.`,
          ],
          table: {
            caption: `Tipik LO koruma kademeleri (kılavuz değerler)`,
            headers: ["Olay", "Aksiyon", "Tipik eşik"],
            rows: [
              ["LO basıncı düşüyor", "Alarm", "~ normal-0.5 bar"],
              ["Stand-by pump start", "Otomatik start", "Alarm eşiğinde"],
              ["LO basıncı kritik", "Slowdown", "Daha düşük eşik"],
              ["LO basıncı çok düşük", "Shutdown/Trip", "En düşük eşik"],
            ],
          },
        },
        {
          subheading: "6.2 Filtre, pompa ve sebep analizi",
          paragraphs: [
            `LO basınç düşüşü; tıkalı filtre (yüksek ΔP), pompa aşınması, hat kaçağı veya emme tarafında hava (low sump) kaynaklı olabilir. Test sonrası gerçek bir alarm geldiğinde sebep filtre ΔP, sump seviyesi ve pompa durumu üzerinden hızlıca daraltılır. LO low-pressure trip asla "rahatsız edici" diye devre dışı bırakılmaz.`,
          ],
        },
      ],
    },
    {
      heading: "7. FO Heater High-Temperature Alarm Testi",
      sections: [
        {
          subheading: "7.1 Yakıt ısıtma kontrolü ve viskozite",
          paragraphs: [
            `Ağır yakıt (HFO), enjeksiyon için uygun viskoziteye getirilmek üzere FO heater'da (buhar/elektrik) ısıtılır. Aşırı ısınma, yakıtın bozulmasına, coking'e ve emniyet riskine yol açar; bu yüzden high-temperature alarm ve gerekirse ısıtıcı cut-off bulunur. Test, sıcaklık sensörü simülasyonu ile alarm/cut-off setpoint'inin doğru çalıştığını doğrular.`,
            `Viskozite kontrol sistemi (viscotherm) heater'ı yakıt viskozitesine göre ayarlar; sensör/kontrol arızası aşırı ısınma veya yetersiz ısıtma yaratır. Elektrikli ısıtıcılarda düşük yakıt akışında kuru ısınma riski vardır; low-flow koruması test edilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Yakıt sıcaklığı ve parlama noktası",
              text: `Yakıt, parlama noktasına (flash point) yakın sıcaklıklara ısıtılmamalıdır; MARPOL/SOLAS gereği gemi yakıtının flash point'i ≥60 °C olmalıdır. Heater high-temp koruması, hem yakıt kalitesini hem yangın emniyetini korur.`,
            },
          ],
        },
        {
          subheading: "7.2 Buhar/elektrik ısıtıcı emniyeti",
          paragraphs: [
            `Buhar ısıtıcılarda kondensat hattındaki yağ izleri (heater iç kaçağı) kontrol edilir; yakıt buhar tarafına kaçarsa kazan/boiler kontaminasyonu olur. Test ve kontroller heater bakımıyla birlikte kaydedilir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Diğer Emniyet Cihazları ve Sistem Bütünlüğü",
      sections: [
        {
          subheading: "8.1 Quick-closing valve, remote stop ve ventilasyon damper",
          paragraphs: [
            `Makine dairesi yangın emniyeti, yakıt/yağ tanklarının quick-closing valve'leri (uzaktan, yangında yakıt akışını kesen), pompaların remote emergency stop'ları ve ventilasyon damper/fan stop fonksiyonlarını içerir. Bu cihazlar periyodik test edilir; yangında fire pump, yakıt kesme ve hava kesmenin tek noktadan çalıştığı doğrulanır. Bunlar SOLAS II-2 kapsamındadır ve PSC denetiminin odağıdır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "SOLAS II-2 — makine dairesi yangın emniyeti",
              text: `Remote shut-off (yakıt/yağ), remote stop (pompa/fan) ve fixed fire extinguishing (CO2/foam/water mist) düzenlemeleri çalışır ve test edilmiş olmalıdır. Quick-closing valve'lerin tümünün test sonucu kaydedilir.`,
            },
          ],
        },
        {
          subheading: "8.2 Alarm sistemi bütünlüğü ve sahte alarm yönetimi",
          paragraphs: [
            `Alarm monitoring system (AMS) düzenli "lamp test" ve sinyal bütünlüğü açısından kontrol edilir. Sık tekrarlayan sahte alarmlar (nuisance alarm) ya susturulup ihmal edilir hale gelir ki bu tehlikelidir, ya da kök sebep (sensör/kablo) giderilir. Doğru yaklaşım, sahte alarmı yok saymak değil kaynağını düzeltmektir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Alarm yorgunluğu (alarm fatigue)",
              text: `Sürekli susturulan veya bypass edilen alarmlar, gerçek bir tehlike geldiğinde fark edilmemesine yol açar. Bypass edilen her alarm kayıt altına alınır, gerekçelendirilir ve ilk fırsatta düzeltilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Emniyet testi kontrol listesi",
          bullets: [
            `Test öncesi köprüüstü/şef bilgilendirildi mi (trip testleri)?`,
            `Bilge high-level alarm lokal + uzak panelde çalışıyor mu?`,
            `OMD self-test, measuring head ve örnekleme hattı temiz mi?`,
            `Bearing temperature alarm setpoint'leri simülasyonla doğrulandı mı?`,
            `Over-speed trip devri ölçüldü, üretici/klas değeriyle uyumlu mu?`,
            `LO low-pressure alarm + trip + stand-by pump auto-start çalışıyor mu?`,
            `FO heater high-temp alarm/cut-off doğru setpoint'te mi?`,
            `Quick-closing valve, remote stop ve ventilasyon damper test edildi mi?`,
            `Tüm sonuçlar safety test log + PMS'e işlendi mi?`,
            `Arızalı cihaz raporlandı ve geçici koruma tedbiri alındı mı?`,
          ],
          paragraphs: [
            `Emniyet sistemi testleri, "her şey yolundayken gereksiz görünen" ama bir gün makineyi, gemiyi ve mürettebatı kurtaran tek katmandır. Üçüncü/Dördüncü Mühendis için ölçüt, testi yapmış olmak değil; cihazın gerçekten doğru setpoint'te ve doğru kademede (alarm/slowdown/trip) çalıştığını kanıtlamış ve kaydetmiş olmaktır. Susturulan bir alarm, ileride yaşanacak bir crankcase patlamasının ya da yatak sıkışmasının davetiyesidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
