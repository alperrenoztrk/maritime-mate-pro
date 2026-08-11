import type { TopicDetailContent } from "@/data/navigationTopicContents";

/**
 * Gemicilik — "Dersler Beta" okunabilir konu anlatımı.
 *
 * İçerik klasik gemicilik bilgisine ve ilgili standartlara dayanır (SOLAS,
 * STCW, COLREG, Load Line, ISGOTT/OCIMF mooring kılavuzları). `TopicSection.title`
 * değerleri lessonFlow/seamanship.ts içindeki `sectionRef`/`sectionTitles` ile eşleşir.
 */
// Ders görselleri — depoda hâlihazırda bulunan varlıklar.
import tugImage from "@/assets/lessons/tug-assisting.jpg";
import pilotLadderImage from "@/assets/lessons/pilot-ladder.jpg";
import knotsImage from "@/assets/seamanship/knots-display.jpg";
import hatchCoversImage from "@/assets/seamanship/hatch-covers.jpg";
import bridgeWatchImage from "@/assets/seamanship/bridge-watch.jpg";
import wireRopeImage from "@/assets/seamanship/wire-rope.jpg";

export const seamanshipTopicContents: Record<string, TopicDetailContent> = {
  "Halatlar, Knot ve Bağlama Teknikleri": {
    title: "Halatlar, Knot ve Bağlama Teknikleri",
    introduction:
      "Halat işçiliği (marlinspike seamanship), gemiciliğin temelidir. Doğru halat seçimi, doğru düğüm (knot) ve dikiş (splice), hem operasyonel verimi hem can güvenliğini belirler. Halatın malzemesi, dayanımı ve bakımı; bağlama, yedekleme ve yük operasyonlarında kritik rol oynar.",
    sections: [
      {
        title: "Halat Türleri ve Özellikleri",
        content:
          "Halatlar doğal lif (manila, sisal — günümüzde nadir), sentetik lif (polyamid/naylon, polyester, polipropilen, yüksek modüllü HMPE/Dyneema) ve çelik tel (wire rope) olarak ayrılır. Naylon yüksek mukavemetli ve elastiktir (şok yükü emer) ancak kopunca tehlikeli geri tepme (snap-back) yapar; polyester daha az uzar; polipropilen hafif ve yüzer ama UV'ye duyarlıdır; HMPE çok yüksek mukavemetli ve hafiftir. Çelik halatlar yüksek yük ve düşük uzama gerektiren yerlerde (vinç, yedekleme) kullanılır. Her halatın kopma yükü (breaking load) ve güvenli çalışma yükü (SWL) bilinir ve aşılmaz.",
        image: knotsImage,
        imageAlt: "Common seamanship knots made up on display",
      },
      {
        title: "Temel Düğümler (Knots)",
        content:
          "Birkaç temel düğüm her gemicinin bilmesi gerekendir. İzbarço (bowman's knot / bowline): halatın ucunda sabit, sıkışmayan bir göz oluşturur; can kurtarma ve bağlamada yaygındır. Camadan bağı (reef knot): iki eşit halatı geçici bağlar; yüke gelince sıkışıp çözülmesi gerektiğinde kullanılır (yük taşıyan kritik bağlantılarda güvenilmez). Kropi/sekiz bağı (figure-eight): halat ucunun blok/halkalardan kaçmasını önler. Volta ve kazık bağı (round turn and two half hitches, clove hitch): halatı bir babaya/direğe geçici bağlamak için kullanılır. Doğru düğüm, yük altında tutmalı ve gerektiğinde kolayca çözülebilmelidir.",
      },
      {
        title: "Dikişler (Splices) ve Sonlandırma",
        content:
          "Dikiş (splice), halat tellerini birbirine örerek kalıcı bir göz (eye splice) veya iki halatı birleştiren (short/long splice) bağlantı oluşturur. Eye splice, bir babaya veya halkaya geçirilecek kalıcı göz için kullanılır ve düğüme göre halat mukavemetinin daha büyük bölümünü korur. Halat uçları çözülmeye karşı dikiş, bant veya whipping (ince ip sarımı) ile sonlandırılır. Sentetik halatlarda uç eritilerek de mühürlenebilir, ancak bu tek başına yeterli sonlandırma değildir.",
      },
      {
        title: "Halat Bakımı ve Emniyet",
        content:
          "Halatlar düzenli kontrol edilir: aşınma, kesik, lif kopması, içte hasar (çelik halatta tel kopması/korozyon), UV bozulması ve aşırı uzama. Hasarlı halat kullanımdan çıkarılır. Halatlar kuru, havalandırılan ve kimyasal/keskin yüzeylerden uzak yerde saklanır; çelik halatlar yağlanır. Yük altındaki halattan kaçınılır; özellikle gergin halatın kopma hattı (snap-back zone) tehlikelidir. Eldiven kullanımı, halatı elden kaydırmamak ve gergin halat üzerinde durmamak temel emniyet kurallarıdır.",
      },
    ],
    keyPoints: [
      "Halatlar doğal/sentetik lif ve çelik tel olarak ayrılır; naylon elastiktir ama snap-back yapar.",
      "Temel düğümler: izbarço (sabit göz), camadan, sekiz, volta/kazık bağı.",
      "Eye splice kalıcı göz için kullanılır ve düğüme göre daha fazla mukavemet korur.",
      "Hasarlı halat çıkarılır; gergin halatın snap-back hattında durulmaz.",
    ],
  },

  "Demir ve Demirleme": {
    title: "Demir ve Demirleme",
    introduction:
      "Demirleme (anchoring), gemiyi belirli bir mevkide güvenle tutmak için demir ve zincirin deniz dibine yük aktarmasıdır. Doğru yer seçimi, yeterli kaloma (zincir boyu) ve zeminin tutuş kalitesi, geminin sürüklenmeden (dragging) durmasını sağlar. Demir donanımının bakımı ve manevra disiplini hem emniyet hem operasyonel güvenilirlik için kritiktir.",
    sections: [
      {
        title: "Demir Donanımı ve Türleri",
        content:
          "Demir donanımı; demir (anchor), zincir (chain cable), ırgat (windlass), zincirlik (chain locker) ve loça/kovan (hawse pipe) ile stoperlerden oluşur. Yaygın demir tipi, stoksuz (stockless) demirdir; tırnakları (flukes) zemine gömülerek tutar. Zincir, baklalar hâlinde 'kilit' (shackle/shot — genellikle 27.5 m) uzunluklarına bölünür ve renk işaretleriyle salınan miktar izlenir. Demirin tutuş gücü ağırlığından çok zincirin dipte yatay yatması ve demirin zemine gömülmesiyle sağlanır.",
        image: "/diagrams/seamanship/demir-tipleri.svg",
        imageAlt: "Types of anchor used at sea",
      },
      {
        title: "Kaloma (Scope) ve Tutuş",
        content:
          "Demirin tutması, yeterli kaloma (salınan zincir boyu / su derinliği oranı) ile sağlanır. Zincirin önemli bir bölümünün dipte yatay yatması, demir tırnaklarına yukarı değil yatay çekme uygulayarak tutuşu artırır. Genel pratik kural, normal koşullarda derinliğin yaklaşık 5–6 katı, ağır havada 8–10 katı veya daha fazla zincir salınmasıdır. Yetersiz kaloma demirin tarama (dragging) riskini artırır. Zemin türü de önemlidir: çamur/kil iyi tutar, kaya ve sert kum zayıf tutabilir veya demiri takabilir.",
        formula: {
          text: "Kaloma ≈ 5–6 × derinlik (normal), 8–10 × derinlik (ağır hava)",
          description: "Salınan zincir boyunun su derinliğine tipik oranı (zemin/koşula göre değişir)",
        },
      },
      {
        title: "Demirleme Manevrası",
        content:
          "Demirleme öncesi yer seçilir: yeterli derinlik, iyi tutuş zemini, yeterli salınım alanı (swinging room), trafik ve diğer demirli gemilerden uzaklık. Yaklaşım genellikle akıntı/rüzgâra karşı ve düşük hızla yapılır; gemi durdurulup hafif tornistan verilerek zincirin demir üzerine yığılmadan açılması sağlanır. Demir bırakılır, zincir kontrollü salınır ve gemi gerilince demirin tuttuğu (brought up) doğrulanır. Köprüüstü ile baş üstü (forecastle) arasında net haberleşme (kaç kilit suda, zincirin yönü/gerginliği) esastır.",
      },
      {
        title: "Tarama (Dragging) ve İzleme",
        content:
          "Demirli gemi sürekli izlenir: GPS demirleme alarmı, kerteriz/mesafe (transit, radar range) ve görsel referanslarla geminin mevkisi kontrol edilir. Sürüklenme belirtileri: zincirin sürekli gergin/titreşimli olması, geminin referanslara göre kayması, demir alarmının çalması. Tarama tespit edilirse makine hazır edilir, gerekirse kaloma artırılır, ikinci demir atılır veya yeniden demirleme/seyir yapılır. Ağır hava beklendiğinde önceden kaloma artırılır ve makine 'stand-by' tutulur.",
      },
    ],
    keyPoints: [
      "Tutuş, demirin ağırlığından çok zincirin dipte yatay yatmasıyla sağlanır.",
      "Kaloma ≈ 5–6× derinlik (normal), 8–10× (ağır hava); yetersiz kaloma dragging riskidir.",
      "Yer seçimi: derinlik, tutuş zemini, swinging room ve trafik; yaklaşım rüzgâr/akıntıya karşı.",
      "Demirli gemi sürekli izlenir; tarama tespitinde makine hazır edilir, kaloma artırılır.",
    ],
  },

  "Bağlama (Mooring) Operasyonları": {
    title: "Bağlama (Mooring) Operasyonları",
    introduction:
      "Bağlama (mooring), gemiyi rıhtıma veya şamandıraya halatlarla emniyetle sabitlemektir. Doğru halat düzeni, gergi yönetimi ve emniyet disiplini hem geminin yerinde kalmasını hem personelin güvenliğini sağlar. Mooring operasyonları, güvertedeki en sık ciddi yaralanma kaynaklarından biridir.",
    sections: [
      {
        title: "Bağlama Halatları ve Düzeni",
        content:
          "Standart bağlama düzeni farklı görevdeki halatlardan oluşur. Baş ve kıç açmazları (head/stern lines) gemiyi rıhtıma çeker; spring halatlar (baş ve kıç spring) geminin boyuna (ileri-geri) hareketini engeller; breast halatlar gemiyi rıhtıma dik tutar. İyi bir düzen, halatları mümkün olduğunca uzun ve simetrik yerleştirir; uzun halat aynı geminin hareketinde daha az gerilim değişimi yaşar. Aynı serviste farklı malzemeden halat karıştırmak (örn. naylon + HMPE) yükü eşit paylaşmadığından önerilmez.",
        image: "/diagrams/seamanship/palamar-duzeni.svg",
        imageAlt: "Standard mooring line arrangement alongside a berth",
      },
      {
        title: "Irgat, Vinç ve Gergi Yönetimi",
        content:
          "Bağlama halatları ırgat/vinç (mooring winch) ve babalar (bitt/bollard) yardımıyla gerilir ve sabitlenir. Vinç tamburuna sarılan halat, fren (brake) ile tutulur; frenin tutma kapasitesi halatın kopma yükünden düşük ayarlanır ki aşırı yükte halat kopmadan önce fren kayarak yükü sınırlasın. Otomatik gergi (auto-tension) modunda dikkatli olunur; gelgit ve yük değişimiyle halatlar düzenli kontrol edilip ayarlanır. Halat babaya 'figure-of-eight' ile volta edilir ve emniyete alınır.",
      },
      {
        title: "Snap-back Bölgeleri ve Emniyet",
        content:
          "Gergin bir halat koptuğunda, depoladığı elastik enerjiyi aniden boşaltarak kırbaç gibi geri savrulur (snap-back); bu, ölümcül yaralanmaların başlıca nedenidir. Halatın olası geri tepme hattı 'snap-back zone' olarak değerlendirilir ve personel bu hatlardan uzak durur. Modern yaklaşım, sabit 'snap-back zone' boyamak yerine tüm güverteyi potansiyel tehlikeli kabul edip dinamik risk değerlendirmesi yapmaktır. Halat altında/üstünde durmamak, gergin halata yaklaşmamak ve net iletişim temel kurallardır.",
      },
      {
        title: "Operasyon Planı ve İletişim",
        content:
          "Bağlama/çözme operasyonu öncesi toolbox toplantısı yapılır: görev dağılımı, halat sırası, tehlikeler ve iletişim yöntemi belirlenir. Köprüüstü, baş ve kıç istasyonları arasında net telsiz haberleşmesi (standart komutlar: 'heave', 'slack', 'hold', 'make fast') kullanılır. Yeterli ve dinlenmiş personel, uygun KKD ve iyi aydınlatma sağlanır. Rüzgâr, akıntı ve gelgit dikkate alınır; römorkör kullanılıyorsa onunla koordinasyon kurulur. Operasyon sonrası halatlar kontrol edilip emniyete alınır.",
      },
    ],
    keyPoints: [
      "Düzen: head/stern lines (çeker), spring (boyuna hareket), breast (dik tutar); halatlar uzun ve simetrik.",
      "Vinç freni halat kopma yükünün altında tutar; halat babaya figure-of-eight ile volta edilir.",
      "Snap-back ölümcüldür; tüm güverte potansiyel tehlikeli kabul edilip gergin halattan uzak durulur.",
      "Operasyon öncesi toolbox + net telsiz komutları (heave/slack/hold/make fast) kullanılır.",
    ],
  },

  "Yedekleme (Towing) Operasyonları": {
    title: "Yedekleme (Towing) Operasyonları",
    introduction:
      "Yedekleme (towing), bir geminin başka bir gemiyi/yapıyı halatla çekmesidir: römorkör yardımı, arızalı gemiyi çekme veya acil durumda kurtarma (emergency towing) bağlamında uygulanır. Doğru donanım, bağlantı ve manevra, hem yedekleyen hem yedeklenen geminin güvenliğini belirler.",
    sections: [
      {
        title: "Römorkör Yardımı ve Bağlanma",
        content:
          "Liman manevralarında römorkörler gemiye iter (push) veya çeker (pull). Bağlantı, geminin yedek halatı (gemi tarafından verilen) veya römorkörün kendi halatı ile yapılır; bağlantı noktası uygun mukavemette baba/fairlead olmalıdır. Komut zinciri nettir: kılavuz kaptan (pilot) römorköre talimat verir, gemi köprüüstü koordine eder. Römorkörün gemiye fazla yaklaşması, baş/kıç dalgası ve etkileşim (interaction) nedeniyle tehlikelidir; girrt (girting/capsizing) riskine karşı römorkör daima kaçış serbestliğini korur.",
        image: tugImage,
        imageAlt: "Tug towing a ship through a port",
      },
      {
        title: "Yedek Donanımı ve Bağlantı",
        content:
          "Açık deniz/uzun yedeklemede yedek donanımı; ana yedek halatı (tow line — genellikle çelik veya yüksek mukavemetli sentetik), zincir parçası (chafe/grip için), şok yükünü emen bir bölüm ve emniyet/yedek (back-up) bağlantısından oluşur. Bağlantı noktaları (towing bracket, bitt) yeterli mukavemette olmalı, sürtünmeye karşı korunmalıdır. Yedek halatının suya değen bir bölümünün (catenary — sarkma) bulunması, dalga ve hareketten doğan şok yükünü emer ve ani kopmayı önler.",
      },
      {
        title: "Yedekleme Manevrası ve Yük Yönetimi",
        content:
          "Yedeklemede ani gergi ve şok yükünden kaçınılır: yük kademeli olarak uygulanır, hız ve rota yumuşak değiştirilir. Yedek halatındaki gerilim, geminin/yedeklenenin hareketleri ve dalga ile sürekli değişir; ani yön değişimleri yan yük (side load) yaratıp bağlantıyı zorlar. Yedeklenen gemi dümeniyle salınımı (yawing) kontrol etmeye çalışır. Tüm operasyon boyunca bağlantı noktaları, sürtünme bölgeleri ve halat gerilimi izlenir; acil ayırma (emergency release) imkânı hazır tutulur.",
      },
      {
        title: "Acil Yedekleme (Emergency Towing)",
        content:
          "Makinesi/dümeni devre dışı kalan bir gemi yedeğe alınmaya hazır olmalıdır. Birçok gemide (özellikle tankerlerde) hazır kurulu acil yedekleme düzeni (Emergency Towing Arrangement, ETA) bulunur: baş ve kıçta hızlı bağlanabilen güçlü bağlantı noktaları, ön hazırlıklı halat/zincir ve mesafe halatı (messenger/pick-up line). Acil durumda zaman kısıtlı ve koşullar kötü olabileceğinden, donanımın hazır ve mürettebatın eğitimli olması hayati önemdedir. Mesafe halatı ve şamandıra, kurtarıcı geminin bağlantıyı hızlı almasını sağlar.",
      },
    ],
    keyPoints: [
      "Römorkör iter veya çeker; girting riskine karşı kaçış serbestliğini korur, köprüüstü koordine eder.",
      "Tow line düzeni şok emen bir bölüm (catenary/zincir) ve emniyet bağlantısı içerir.",
      "Yük kademeli uygulanır; ani gergi/yön değişimi şok ve yan yük yaratır.",
      "Tankerlerde hazır kurulu Emergency Towing Arrangement (ETA) ve eğitimli ekip bulunur.",
    ],
  },

  "Güverte Bakımı ve Korozyon Kontrolü": {
    title: "Güverte Bakımı ve Korozyon Kontrolü",
    introduction:
      "Deniz ortamı çelik tekne için sürekli bir korozyon tehdididir. Düzenli güverte bakımı — yüzey hazırlığı, boyama ve katodik koruma — geminin yapısal bütünlüğünü ve değerini korur. İyi planlanmış bakım, hem emniyet hem maliyet açısından kritiktir ve planlı bakım sisteminin (PMS) parçasıdır.",
    sections: [
      {
        title: "Korozyon Mekanizması",
        content:
          "Çeliğin korozyonu (paslanma), demirin su ve oksijen varlığında elektrokimyasal olarak oksitlenmesidir; deniz suyundaki tuz, elektrolit görevi görerek süreci hızlandırır. Galvanik korozyon, farklı metallerin elektrolit içinde temasında daha aktif (anot) metalin hızla aşınmasıyla oluşur. Çentik/oyuk korozyonu (pitting), kaplama hasarlı noktalarda yoğunlaşır. En çok etkilenen bölgeler: su hattı, balast tankları, güverte birikinti alanları ve farklı metallerin birleştiği yerlerdir.",
        image: wireRopeImage,
        imageAlt: "Steel wire rope on its drum, a typical deck maintenance item",
      },
      {
        title: "Yüzey Hazırlığı ve Boyama",
        content:
          "Boyanın tutması, yüzey hazırlığının kalitesine bağlıdır. Pas ve eski boya; raspa (chipping), tel fırça, taşlama veya kumlama (grit blasting) ile temizlenir; yüzey kuru, yağsız ve tuzdan arındırılmış olmalıdır. Ardından kat kat boya uygulanır: astar (primer — yapışma ve korozyon önleme), ara kat ve son kat (UV/aşınma direnci). Her boyanın belirli kuruma süresi, sıcaklık ve nem koşulu vardır; bunlara uyulmazsa boya tutmaz. Su altı bölgesi ayrıca anti-fouling ile kaplanır.",
      },
      {
        title: "Katodik Koruma",
        content:
          "Su altı çelik yüzeyleri katodik korumayla korunur. İki yöntem vardır: feda anot (sacrificial anode) yönteminde, çinko/alüminyum gibi daha aktif metaller tekneye bağlanır ve çelik yerine kendileri aşınır. Empoze akım (Impressed Current Cathodic Protection, ICCP) yönteminde ise dışarıdan kontrollü bir akım uygulanarak çelik katodik (korunan) hâle getirilir. Anotlar düzenli kontrol edilir ve tükenince yenilenir; ICCP sistemi izlenir. Doğru çalışmayan katodik koruma, tekne ve özellikle balast tanklarında hızlı korozyona yol açar.",
      },
      {
        title: "Planlı Bakım ve Kayıt",
        content:
          "Güverte bakımı, planlı bakım sistemi (Planned Maintenance System, PMS) kapsamında programlanır: hangi alanın ne zaman raspalanıp boyanacağı, anotların ne zaman kontrol edileceği ve tank muayeneleri kaydedilir. Boya stoğu, KKD ve ekipman (raspa makinesi, fırça, püskürtme) hazır tutulur. Yüksekte ve bordada çalışma iş izni gerektirir; sıcak iş (taşlama) yangın izni alır. Balast/kapalı tank bakımı kapalı mahal prosedürüne tabidir. Bakım kayıtları, klas sörveyleri ve geminin durumunun izlenmesi için temeldir.",
      },
    ],
    keyPoints: [
      "Korozyon elektrokimyasaldır; tuzlu su hızlandırır, farklı metaller galvanik korozyon yaratır.",
      "İyi boyama iyi yüzey hazırlığı ister: temizlik + astar/ara/son kat, doğru kuruma koşulları.",
      "Katodik koruma: feda anot (çinko/alüminyum) veya ICCP; anotlar kontrol edilip yenilenir.",
      "Bakım PMS'te programlanır; yüksekte/sıcak iş izinli, tank bakımı kapalı mahal prosedürlüdür.",
    ],
  },

  "Kapaklar, Su Geçmezlik ve Açıklıklar": {
    title: "Kapaklar, Su Geçmezlik ve Açıklıklar",
    introduction:
      "Geminin yüzerliği ve hasar dayanımı, tekne açıklıklarının (ambar kapakları, kapılar, menholler, havalandırmalar) su geçirmezliğine bağlıdır. SOLAS ve Load Line sözleşmesi, su geçmezlik bütünlüğünü (watertight/weathertight integrity) ve emniyetli yük sınırını düzenler. İyi bakımlı kapaklar, su girişini ve dolayısıyla batma/stabilite kaybını önler.",
    sections: [
      {
        title: "Su Geçmezlik vs. Hava Koşullarına Dayanıklılık",
        content:
          "İki kavram ayrılır. Watertight (su geçirmez) bölmeler ve kapılar, belirli su basıncına karşı her iki yönde su geçişini önler; hasarlı stabilitede bölmelemeyi sağlar (örn. tekne içi su geçmez kapılar). Weathertight (hava koşullarına dayanıklı) açıklıklar ise normal deniz koşullarında üstten gelen suyun geçişini önler ancak basınç altında değil (örn. ambar kapakları, güverte kapıları). Hangi açıklığın hangi standartta olması gerektiği konumuna ve işlevine göre belirlenir.",
        image: hatchCoversImage,
        imageAlt: "Weathertight hatch covers closed over a hold",
      },
      {
        title: "Ambar Kapakları (Hatch Covers)",
        content:
          "Dökme yük ve genel kargo gemilerinde ambar kapakları, deniz suyunun ambara girmesini önleyen en büyük weathertight açıklıktır. Modern kapaklar genellikle katlanır veya kayar çelik panellerdir; sızdırmazlık, çevredeki lastik conta (rubber gasket) ile karşı yüzeydeki bıçak (compression bar) arasındaki temas ve kapama düzenekleriyle (cleats/wedges) sağlanır. Conta hasarı, paslı oturma yüzeyi ve drenaj kanallarının tıkanması su girişine yol açar. Kapak su geçmezliği, hortum testi veya ultrasonik sızdırmazlık testiyle kontrol edilir.",
      },
      {
        title: "Yükleme Sınırı (Load Line / Plimsoll)",
        content:
          "Load Line (Uluslararası Yükleme Sınırı Sözleşmesi), geminin emniyetle batabileceği maksimum draftı belirler ve bordadaki yükleme sınırı markası (Plimsoll mark) ile gösterilir. Marka, farklı bölge ve mevsimler için çizgiler içerir: yaz (S), kış (W), kış Kuzey Atlantik (WNA), tropik (T), tatlı su (F) ve tropik tatlı su (TF). Bu sınır, yeterli fribord (freeboard — su hattı ile güverte arası yükseklik) ve dolayısıyla rezerv yüzerlik ve stabilite bırakır. Markanın suya gömülmesini sağlayacak şekilde aşırı yükleme yasaktır ve PSC tarafından denetlenir.",
      },
      {
        title: "Açıklıkların Bakımı ve Denetimi",
        content:
          "Tüm tekne açıklıkları düzenli kontrol edilir: su geçmez kapıların contaları, kapama düzenekleri ve uzaktan kapatma; havalandırma başlıkları ve hava firar borularının (air pipe) otomatik kapama düzenekleri; iskandil ve dolum borularının kapakları; freeing port'ların (güverteye binen suyun tahliyesi) açık çalışması. Ağır hava öncesi tüm açıklıklar 'sea-secure' hâle getirilir. Su geçmez kapıların seyir sırasındaki konumu (açık/kapalı) kurallara ve kaptanın talimatına göre yönetilir; gereksiz açık kapı hasar durumunda su yayılımını hızlandırır.",
      },
    ],
    keyPoints: [
      "Watertight basınca karşı her iki yönde, weathertight üstten gelen suya karşı korur.",
      "Ambar kapakları conta+compression bar+cleat ile sızdırmaz; conta/drenaj bakımı kritiktir.",
      "Load Line (Plimsoll) markası emniyetli max draftı ve yeterli fribordu belirler; aşırı yük yasaktır.",
      "Açıklıklar düzenli kontrol edilir ve ağır hava öncesi sea-secure yapılır.",
    ],
  },

  "Pilot Transferi ve Pilot Merdiveni": {
    title: "Pilot Transferi ve Pilot Merdiveni",
    introduction:
      "Kılavuz kaptanın (pilot) gemiye binip inmesi, denizcilikteki en riskli rutin operasyonlardan biridir; düşme ve boğulma kazaları yaşanmıştır. SOLAS Bölüm V ve ilgili IMO kuralları, pilot transfer donanımının (pilot ladder, combination arrangement) tasarımını, kurulumunu ve gözetimini katı biçimde düzenler.",
    sections: [
      {
        title: "Pilot Merdiveni (Pilot Ladder) Gereklilikleri",
        content:
          "Pilot merdiveni, belirli standartlara uygun basamaklar (ahşap/uygun malzeme, yatay, kaymaz), yan halatlar ve yayılma çıtaları (spreaders) içerir. Merdiven sağlam, hasarsız ve doğru kurulmuş olmalı; basamaklar eşit aralıklı ve yatay olmalıdır. Merdiven gemiye, onaylı sağlam bağlantı noktalarından emniyete alınır; geçici/uygunsuz bağlama (örn. yalnızca halatla babaya) kabul edilmez. Tek pilot merdiveni ile çıkış mesafesi sınırlıdır; daha yüksek fribordda kombinasyon düzeni gerekir.",
        image: pilotLadderImage,
        imageAlt: "Pilot ladder rigged over the ship's side",
      },
      {
        title: "Kombinasyon Düzeni (Pilot/Accommodation Ladder)",
        content:
          "Su hattından güverteye dikey mesafe belirli bir sınırı (yaklaşık 9 m) aştığında, pilot merdiveni tek başına yeterli değildir; bir borda merdiveni (accommodation ladder) ile birleştirilmiş 'kombinasyon düzeni' kullanılır. Pilot, önce pilot merdiveninden borda merdiveninin platformuna çıkar, oradan güverteye ulaşır. Düzenleme; merdivenlerin hizası, platform emniyeti ve geçiş noktasının güvenli olmasını gerektirir. Borda merdiveni gemiden uzağa eğimli ve alt platform yatay olmalıdır.",
      },
      {
        title: "Yardımcı Donanım ve Gözetim",
        content:
          "Pilot transferinde yardımcı donanım hazır bulunur: en az bir adet ışıklı ve halatlı can simidi, can halatı (man-rope — pilot isterse), yeterli aydınlatma (gece), ve transfer noktasına yakın bir kapı/geçiş. Operasyon, sorumlu bir zabit tarafından telsizle köprüüstüyle irtibatlı şekilde gözetlenir; pilot güverteye güvenle ulaşana kadar yalnız bırakılmaz. Pilot kapısı (shell door) kullanılıyorsa eşik ve geçiş emniyeti sağlanır.",
      },
      {
        title: "Manevra, Kontrol ve Emniyet",
        content:
          "Transfer sırasında gemi, pilot teknesi için zayıf bir su (lee) oluşturacak şekilde manevra eder ve uygun hızda seyreder; ani hareket ve aşırı yalpa tehlikelidir. Pilot merdiveni kullanım öncesi ve sonrası kontrol edilir; her transfer öncesi sorumlu zabit donanımın doğru kurulduğunu doğrular. Kazaların çoğu hasarlı/yanlış kurulu merdiven, yetersiz aydınlatma veya gözetimsizlikten kaynaklandığından, kontrol listesi ve disiplinli uygulama hayati önemdedir.",
      },
    ],
    keyPoints: [
      "Pilot merdiveni standart basamak/yan halat/spreader içerir ve onaylı noktadan emniyete alınır.",
      "Fribord ~9 m'yi aşınca pilot + borda merdiveni 'kombinasyon düzeni' kullanılır.",
      "Işıklı can simidi, man-rope, aydınlatma hazır; transfer sorumlu zabitçe gözetlenir.",
      "Gemi pilot teknesine lee oluşturur; her transfer öncesi donanım kontrol edilir.",
    ],
  },

  "Köprüüstü Vardiyası ve Gözcülük": {
    title: "Köprüüstü Vardiyası ve Gözcülük",
    introduction:
      "Emniyetli seyrin temeli, iyi tutulan bir köprüüstü vardiyasıdır. STCW ve COLREG Kural 5, her an uygun bir gözcülük (lookout) tutulmasını ve durumun sürekli değerlendirilmesini zorunlu kılar. Vardiya zabiti, geminin emniyetinden o vardiyada doğrudan sorumludur.",
    sections: [
      {
        title: "Gözcülük (Lookout) — COLREG Kural 5",
        content:
          "COLREG Kural 5, her geminin görme, işitme ve mevcut tüm uygun araçlarla (radar, ARPA, AIS, dürbün) sürekli ve uygun bir gözcülük tutmasını ister. Amaç, durumu ve çatışma riskini tam değerlendirmektir. Gözcülük yalnızca radar ekranına bakmak değil, görsel ve işitsel uyanıklığı da kapsar. Gece veya kısıtlı görüşte ayrı bir gözcü (dedicated lookout) atanır; vardiya zabiti tek başına gözcü görevini yalnızca gündüz, uygun koşullarda ve geçici olarak üstlenebilir.",
        image: bridgeWatchImage,
        imageAlt: "Officer of the watch keeping a lookout from the bridge",
      },
      {
        title: "Vardiya Devir-Teslimi ve Sorumluluk",
        content:
          "Vardiya devir-teslimi (handover) net ve eksiksiz yapılır: mevki, rota, hız, trafik durumu, hava, seyir planı, özel talimatlar ve kaptanın çağrılma (call) koşulları devralan zabite aktarılır. Devralan zabit, durumu kendisi doğrulamadan vardiyayı kabul etmez; manevra anında devir yapılmaz. Vardiya zabiti, kaptan köprüüstündeyken bile (kaptan açıkça komutu devralmadıkça) seyirden sorumlu olmaya devam eder. Şüphe ve kritik durumda kaptanı çağırmak bir zayıflık değil, doğru uygulamadır.",
      },
      {
        title: "Yorgunluk ve Dinlenme Süresi",
        content:
          "Yorgunluk, insan hatasının ve seyir kazalarının başlıca nedenlerindendir. STCW, asgari dinlenme sürelerini belirler: herhangi bir 24 saatlik dilimde en az 10 saat, herhangi bir 7 günlük dilimde en az 77 saat dinlenme; dinlenme en fazla iki bölüme ayrılabilir ve bir bölüm en az 6 saat kesintisiz olmalıdır. Bu süreler, vardiya tutan personelin uyanık kalmasını güvence altına alır. Dinlenme kayıtları tutulur ve PSC tarafından denetlenebilir.",
        formula: {
          text: "Dinlenme: ≥10 saat/24 saat ve ≥77 saat/7 gün",
          description: "STCW asgari dinlenme süresi; en fazla 2 bölüm, biri ≥6 saat kesintisiz",
        },
      },
      {
        title: "BRM ve Durumsal Farkındalık",
        content:
          "Köprüüstü Kaynak Yönetimi (Bridge Resource Management, BRM), köprüüstündeki tüm kaynakların (insan, ekipman, bilgi) etkin kullanımıdır. İyi BRM; net görev dağılımı, açık iletişim, çapraz kontrol (cross-check), karar ve hatanın paylaşılarak yakalanmasını içerir. Durumsal farkındalık (situational awareness) — geminin çevresini, trafiği, tehlikeleri ve planı doğru algılamak — kaybedildiğinde kazalar olur. Otomasyona aşırı güven (örn. yalnızca ECDIS/otopilot) ve tek kişiye bağımlılık, durumsal farkındalığı zayıflatır.",
      },
    ],
    keyPoints: [
      "COLREG Kural 5: görsel, işitsel ve tüm araçlarla (radar/ARPA/AIS) sürekli uygun gözcülük.",
      "Devir-teslimde mevki/rota/trafik/talimatlar aktarılır; devralan doğrulamadan kabul etmez.",
      "STCW dinlenme: ≥10 saat/24 saat, ≥77 saat/7 gün; yorgunluk kazaların başlıca nedeni.",
      "İyi BRM ve durumsal farkındalık esastır; otomasyona aşırı güven tehlikelidir.",
    ],
  },

  "Manevra ve Gemi Hareketi": {
    title: "Manevra ve Gemi Hareketi",
    introduction:
      "Gemi manevrası (shiphandling), geminin dümen, makine ve dış kuvvetler (rüzgâr, akıntı, sığ su) altındaki hareketini öngörüp kontrol etmektir. Büyük gemiler yavaş tepki verir ve durması uzun mesafe alır; bu nedenle manevra, fiziksel etkileri önceden hesaba katmayı gerektirir.",
    sections: [
      {
        title: "Dönme Dairesi ve Pivot Noktası",
        content:
          "Gemi dümen kırdığında bir dönme dairesi (turning circle) çizer; bunun büyüklüğü 'tactical diameter' ve 'advance/transfer' ile tanımlanır. Gemi, etrafında döndüğü görünür bir nokta olan pivot noktası (pivot point) etrafında döner; ileri yolda pivot noktası baştan yaklaşık geminin boyunun 1/4'ü kadar geride, tornistanda ise kıça yakın olur. Pivot noktasının yeri, dümen ve römorkör kuvvetlerinin yaratacağı dönme momentini belirler; manevra kararları buna göre verilir.",
        image: "/diagrams/seamanship/donme-dairesi.svg",
        imageAlt: "Turning circle with advance, transfer and tactical diameter",
      },
      {
        title: "Durma Mesafesi ve Atalet",
        content:
          "Büyük bir geminin kinetik enerjisi yüksektir; makine stop veya tornistan verildiğinde gemi hemen durmaz, uzun bir 'stopping distance' boyunca ilerler. Acil durma (crash stop) manevrasında bile yüklü büyük gemi kilometrelerce yol alabilir. Bu atalet, çatışmadan kaçınma ve liman yaklaşımında erken ve kademeli hız azaltmayı zorunlu kılar. Emniyetli hız (COLREG Kural 6), geminin durma kabiliyetini ve koşulları dikkate alır.",
      },
      {
        title: "Sığ Su Etkisi: Squat ve Tabana Yaklaşma",
        content:
          "Sığ suda, geminin altından geçen suyun hızlanması basıncı düşürür ve gemi suya gömülerek draftı artar; bu olaya 'squat' denir. Squat, hızın karesiyle hızla artar; bu nedenle sığ suda hız azaltmak squat'ı önemli ölçüde düşürür. Aşırı squat, geminin tabana değmesine (grounding) veya manevra kabiliyetinin bozulmasına yol açar. Yeterli altta su payı (Under Keel Clearance, UKC) planlanır ve sığ/dar sularda hız düşürülür.",
        formula: {
          text: "Squat ∝ V² (hızla orantılı artar)",
          description: "Sığ suda gemi draftındaki artış hızın karesiyle büyür; hız azaltmak squat'ı düşürür",
        },
      },
      {
        title: "Etkileşim: Banka ve Gemi-Gemi Etkisi",
        content:
          "Dar kanallarda ve yakın geçişlerde basınç alanları etkileşim (interaction) yaratır. Banka etkisinde (bank effect), gemi bir kıyıya yaklaştığında baş kıyıdan itilirken kıç kıyıya çekilir (bank cushion ve bank suction), bu da geminin sapmasına neden olur. Gemi-gemi etkileşiminde, yakın geçen veya yanaşan iki gemi arasındaki basınç alanları çekme/itme kuvvetleri ve dönme momentleri yaratır; özellikle yüksek hızda ve sığ suda tehlikelidir. Bu etkiler hız azaltarak, mesafe koruyarak ve önceden dümen düzeltmesiyle yönetilir.",
      },
    ],
    keyPoints: [
      "Gemi pivot noktası etrafında döner; ileri yolda baştan ~L/4 geride, tornistanda kıça yakın.",
      "Büyük gemi yüksek ataletlidir; durma mesafesi uzundur, hız erken ve kademeli azaltılır.",
      "Squat hızın karesiyle artar; sığ suda hız azaltmak ve yeterli UKC planlamak gerekir.",
      "Banka ve gemi-gemi etkileşimi sapma/çekme yaratır; hız ve mesafe ile yönetilir.",
    ],
  },
};
