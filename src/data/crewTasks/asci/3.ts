import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Mutfak ve depo düzeni",
  roleSlug: "asci",
  taskIndex: 3,
  estimatedPages: 25,
  intro: `Gemi mutfağının (galley) ve buna bağlı kuru erzak deposu, soğuk hava deposu ve dondurucuların düzenli, temiz ve organize tutulması, gemi aşçısının günlük operasyonel disiplininin omurgasıdır. Düzensiz bir galley sadece verimsizlik değil; aynı zamanda gıda güvenliği, yangın ve haşere riski demektir. Bu bölüm; istasyon bazlı mutfak organizasyonu, depo yerleşim prensipleri (FIFO/raf seviyeleri), temizlik döngüleri, haşere kontrolü (pest management) denetimleri ve depo güvenliği/erişim kontrolünü WHO Guide to Ship Sanitation ve MLC 2006 standartlarıyla uyumlu biçimde adım adım açıklar.`,
  sources: [
    "MLC 2006 — Regulation 3.2 & Standard A3.2 (Food and Catering)",
    "WHO — Guide to Ship Sanitation (3rd Edition)",
    "Codex Alimentarius — General Principles of Food Hygiene (CXC 1-1969)",
    "IHR 2005 — Ship Sanitation Control / Deratting principles",
    "FAO — Manual on the Application of the HACCP System",
    "IMO Resolution A.868(20) — Garbage & galley waste handling",
    "Nautical Institute — Ship Catering Management Best Practice",
  ],
  chapters: [
    {
      heading: "1. Galley Yerleşimi ve İstasyon Mantığı",
      lead: `Verimli ve güvenli bir mutfak, işin akışına göre tasarlanmış istasyonlardan oluşur.`,
      sections: [
        {
          subheading: "1.1 İş akışına göre istasyonlama (work-flow)",
          paragraphs: [
            `Profesyonel galley düzeni "kirli alandan temiz alana" tek yönlü akış prensibine dayanır: teslim alma ve ayıklama → soğuk hazırlık → pişirme → servis → bulaşık. Çapraz akış (örneğin çiğ tavuğun servis tabağının üstünden geçmesi) çapraz bulaşma riski yaratır; bu yüzden aşçı, hazırlık tezgahlarını ve istasyonları bu yönü bozmayacak şekilde sabitler. Gemi mutfağı dar olduğundan her metrekarenin akış mantığına hizmet etmesi gerekir.`,
            `Her istasyonun kendi ekipmanı ve kendi temizlik sorumluluğu vardır: soğuk hazırlık istasyonunda renk-kodlu kesme tahtaları ve bıçaklar, pişirme istasyonunda ocak/fırın/fritöz, servis istasyonunda bain-marie ve sıcak tutucular. Aşçı, mise en place'i bu istasyon mantığına göre kurar; böylece tek/iki kişilik ekip üç öğünü zamanında çıkarabilir.`,
          ],
          bullets: [
            `Tek yönlü akış: teslim al → hazırla → pişir → servis et → yıka`,
            `Renk-kodlu kesme tahtası ve bıçak ayrımı (çapraz bulaşma önleme)`,
            `Her istasyona ait ekipmanın sabit yeri (deniz hareketine karşı kilitli)`,
            `Sıcak ve soğuk hat ayrımı, servis hattının netliği`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Renk kodu standardı",
              text: `Yaygın HACCP renk kodu: kırmızı = çiğ et, mavi = çiğ balık, sarı = pişmiş ürün, yeşil = sebze/meyve, kahverengi = sebze (kök), beyaz = süt/ekmek. Tek bir tahta her şeye kullanılmaz.`,
            },
          ],
        },
        {
          subheading: "1.2 Deniz hareketine karşı emniyet (sea fastening)",
          paragraphs: [
            `Gemi mutfağı karadaki mutfaktan farklı olarak sürekli hareket halindedir; yalpa ve baş-kıç vurma sırasında ağır tencereler, sıcak yağ ve bıçaklar tehlikeye dönüşür. Aşçı, ocak üstü fiddle/rail (kenarlık), tencere kelepçeleri ve kaymaz mat kullanır; raflarda lip (kenar yükseltisi) ve kilitli dolap kapakları zorunludur. Kötü havada fritöz ve büyük su kaynatma işlemleri sınırlandırılır.`,
            `Tüm hareketli ekipman (mikser, dilimleyici, tencereler) kullanılmadığında sabit yerine kilitlenir. Cam ve seramik kaplar yerine kırılmaz/paslanmaz tercih edilir. Bu önlemler hem ekipman hasarını hem de yanık/kesik yaralanmalarını önler.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kötü havada galley",
              text: `Şiddetli yalpada açık sıcak yağ ve kaynar su en yüksek yaralanma riskidir. Köprüüstü kötü hava uyarısı verdiğinde aşçı menüyü basitleştirir, fritözü kapatır ve gevşek eşyayı sabitler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Kuru Erzak Deposu Organizasyonu",
      sections: [
        {
          subheading: "2.1 Raf yerleşimi ve FIFO disiplini",
          paragraphs: [
            `Kuru erzak deposu (dry store) serin, kuru ve iyi havalandırılmış olmalı; ideal sıcaklık 10-21°C, nem %50-60 civarındadır. Ürünler kategoriye göre gruplanır (tahıl/un, konserve, baharat, içecek, temizlik malzemesi ayrı) ve son kullanma tarihine göre FIFO (First In, First Out) ile dizilir: yeni gelen arkaya, eski öne. Aşçı her teslimatta bu rotasyonu uygular; aksi halde arka raflarda tarihi geçmiş ürün birikir.`,
            `Hiçbir ürün doğrudan zemine konmaz; en alt raf zeminden en az 15 cm yukarıda olur (haşere ve nem koruması). Temizlik kimyasalları gıdadan ayrı, kapalı ve etiketli bir alanda tutulur; gıda ile kimyasalın aynı rafı paylaşması yasaktır. Açılmış paketler kapaklı, etiketli kaplara aktarılır.`,
          ],
          table: {
            caption: `Kuru Erzak Depo Yerleşim Prensipleri`,
            headers: ["Konu", "Standart", "Gerekçe"],
            rows: [
              ["Sıcaklık", "10-21°C, kuru", "Bozulma ve böcek üremesini yavaşlatır"],
              ["Zemin mesafesi", "≥15 cm", "Nem ve haşere koruması, temizlik kolaylığı"],
              ["Rotasyon", "FIFO (tarih sırası)", "Tarihi geçmiş ürün birikmesini önler"],
              ["Kimyasal ayrımı", "Gıdadan tamamen ayrı", "Kontaminasyon ve zehirlenme riski"],
              ["Açık paket", "Kapalı/etiketli kap", "Haşere ve nem girişini engeller"],
            ],
          },
        },
        {
          subheading: "2.2 Etiketleme ve stok görünürlüğü",
          paragraphs: [
            `Her kap ve raf, içerik ve açılış/son kullanma tarihiyle etiketlenir. Aşçı, depoyu bir bakışta okunabilir tutarak hem hızlı hazırlık hem de stok sayımını kolaylaştırır. Yüksek devirli ürünler erişilebilir yükseklikte, ağır ürünler alt raflarda (kaldırma güvenliği), nadir kullanılanlar üst raflarda konumlanır.`,
            `Düzenli bir depo, kumanya stok yönetimini (bkz. ilgili görev) doğrudan destekler: görünürlük artar, fire azalır, sipariş doğruluğu yükselir. Düzensiz depo ise hem israfa hem de denetimde uygunsuzluğa yol açar.`,
          ],
        },
      ],
    },
    {
      heading: "3. Soğuk Hava Deposu ve Dondurucu Düzeni",
      sections: [
        {
          subheading: "3.1 Soğutucu (chiller) iç organizasyonu",
          paragraphs: [
            `Soğuk hava deposunda (chiller, hedef 0-4°C) çapraz bulaşmayı önlemek için katı bir dikey hiyerarşi uygulanır: pişmiş/hazır ürünler üst rafta, çiğ balık ortada, çiğ et ve kümes hayvanı en alt rafta (damlama riski en aşağıda). Hiçbir çiğ ürün, altındaki hazır ürünün üstüne damlayacak şekilde konmaz. Sebze/meyve ayrı bölmede tutulur.`,
            `Hava sirkülasyonu için raflar tıka basa doldurulmaz; soğuk havanın dolaşması ürün sıcaklığını homojen tutar. Evaporatör önü ve kapı yakını ısı dalgalanmasına açıktır; en hassas ürünler bu bölgelerden uzağa yerleştirilir. Kapı mümkün olduğunca kısa açık tutulur.`,
          ],
          table: {
            caption: `Soğuk Depo Raf Hiyerarşisi (Çapraz Bulaşma Önleme)`,
            headers: ["Raf Seviyesi", "Ürün", "Neden"],
            rows: [
              ["Üst", "Pişmiş / hazır yemek", "Damlama almaz, en güvenli konum"],
              ["Orta", "Çiğ balık / deniz ürünü", "Et ile karışmaz"],
              ["Alt", "Çiğ kırmızı et, kümes", "Damlama en aşağıya, kimseyi kontamine etmez"],
              ["Ayrı bölme", "Sebze / meyve", "Toprak/koku ile çapraz bulaşma önleme"],
            ],
          },
        },
        {
          subheading: "3.2 Dondurucu (freezer) yerleşimi ve defrost",
          paragraphs: [
            `Dondurucu hedefi -18°C ve altıdır; ürünler kategoriye göre ayrılır ve donma yanığını (freezer burn) önlemek için hava almaz şekilde paketlenir. Aşçı, dondurucuyu tüketim sırasına göre düzenler: çabuk kullanılacaklar erişilebilir, uzun süre kalacaklar arkada. Her paket içerik ve dondurulma tarihiyle etiketlenir; çözülmüş ürün tekrar dondurulmaz.`,
            `Buz birikimi (icing) hem hacmi azaltır hem de soğutma verimini düşürür; periyodik defrost planlanır. Defrost sırasında ürünler geçici olarak bir başka dondurucuya/soğutucuya alınır, soğuk zincir kırılmaz. Kapı contası ve sıcaklık alarmı düzenli kontrol edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Çözülmüş ürünü tekrar dondurma",
              text: `Çözülen et/balık tekrar dondurulmaz; bakteriyel üreme ve doku bozulması olur. Çözülme planı ertesi günün menüsüne göre yapılır, fazlası çözülmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Temizlik Döngüleri ve Programı",
      sections: [
        {
          subheading: "4.1 Günlük / haftalık / dönemsel temizlik",
          paragraphs: [
            `Galley temizliği bir programa bağlanır: günlük (tezgah, ocak yüzeyi, zemin, çöp, lavabo), haftalık (fırın içi, fritöz yağı, davlumbaz filtresi, soğutucu içi), dönemsel (derin temizlik, davlumbaz kanalı yağ alımı, depo komple boşaltıp temizleme). "Clean as you go" (kullandıkça temizle) prensibi, kirlilik birikimini ve haşere cazibesini en aza indirir.`,
            `Her temizlik görevi bir kayıt çizelgesine (cleaning schedule/log) işlenir; bu kayıt MLC ve liman sağlık denetimlerinde (Ship Sanitation) sunulur. Temizlik, doğru kimyasalla doğru seyreltmede yapılır; gıda yüzeyleri için gıda güvenli sanitizer kullanılır ve durulama gerektiriyorsa durulanır.`,
          ],
          table: {
            caption: `Galley Temizlik Sıklık Matrisi`,
            headers: ["Alan", "Sıklık", "Yöntem"],
            rows: [
              ["Tezgah / kesme yüzeyi", "Her kullanım sonrası", "Deterjan + gıda güvenli sanitizer"],
              ["Zemin / lavabo", "Günlük", "Yağ çözücü, dezenfektan"],
              ["Davlumbaz filtresi", "Haftalık", "Yağ çözücü, bulaşık makinesi/elde"],
              ["Fritöz yağı", "Haftalık veya bozulunca", "Süzme/değişim, eski yağ atık kabına"],
              ["Davlumbaz kanalı (duct)", "Dönemsel", "Profesyonel yağ alımı (yangın riski)"],
              ["Depo komple", "Dönemsel", "Boşalt, temizle, FIFO yeniden diz"],
            ],
          },
        },
        {
          subheading: "4.2 Davlumbaz/kanal yağı ve yangın bağlantısı",
          paragraphs: [
            `Davlumbaz (range hood) ve egzoz kanalında biriken yağ, gemi galley yangınlarının başlıca yakıtıdır. Filtre haftalık, kanal ise dönemsel olarak yağdan arındırılır. Bu temizlik sadece hijyen değil, doğrudan bir yangın emniyeti önlemidir (bkz. mutfak yangın emniyeti görevi). Aşçı, davlumbaz fan ve damper bilgisini de tazeler.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "WHO — Guide to Ship Sanitation",
              text: `Rehber, galley ve gıda depo alanlarının yüzeylerinin temiz, hasarsız, kolay temizlenebilir ve haşere geçirmez tutulmasını; temizlik kayıtlarının saklanmasını ister.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Haşere Kontrolü (Pest Management)",
      sections: [
        {
          subheading: "5.1 Entegre haşere yönetimi (IPM) prensibi",
          paragraphs: [
            `Haşere yönetimi öncelikle önlemeye dayanır: gıdaya erişimi kesmek (kapalı kap, dökülen yiyeceğin hemen temizlenmesi), suya erişimi kesmek ve barınma noktalarını yok etmek. Kemirgen (sıçan/fare), hamamböceği, hububat böcekleri (un/tahıl) ve sinekler gemideki başlıca haşerelerdir. Aşçı, düzenli görsel denetimle bulaşmayı erken yakalar: dışkı, kemirme izi, yumurta/larva, koku.`,
            `Liman bağlamasında halatlara rat guard (sıçan siperi) takılır; ambar, depo ve galley'de sticky trap ve bait station belirlenmiş noktalara yerleştirilir. Gemiye gelen kumanya kutuları depoya girmeden böcek/larva açısından kontrol edilir; karton ambalaj uzun süre depoda tutulmaz (hamamböceği yuvası).`,
          ],
          bullets: [
            `Gıdaya, suya ve barınma alanına erişimi kes`,
            `Liman bağlama halatlarında rat guard kurulumu`,
            `Sticky trap / bait station haritası ve düzenli kontrol`,
            `Gelen kumanyayı depo öncesi böcek/larva kontrolü`,
            `Karton ambalajı hızlı bertaraf et (hamamböceği yuvası)`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "IHR 2005 — Ship Sanitation",
              text: `Gemiler, geçerli bir Ship Sanitation Control Exemption/Control Certificate taşımalıdır. Haşere bulaşması liman sağlık otoritesine bildirilir ve gerekiyorsa deratting/disinfestation uygulanır.`,
            },
          ],
        },
        {
          subheading: "5.2 Bulaşma tespiti ve müdahale",
          paragraphs: [
            `Bulaşma belirtisi tespit edilirse aşçı derhal kaptanı bilgilendirir ve etkilenen ürünleri imha eder; bulaşma kaynağı (delik, çatlak, açık kap) tespit edilip kapatılır. Yaygın bulaşmada profesyonel fumigasyon/ULV gerekir ve bu liman sağlık otoritesiyle koordine edilir. Detaylı pest control prosedürü ayrı görevde ele alınır; depo düzeni ise bu işin önleme ayağıdır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Una düşen tahıl böceği",
              text: `Sıcak depoda açık tutulan un çuvalında tahıl biti üredi. Erken denetim olsaydı yakalanırdı; geç fark edildiği için tüm un partisi imha edildi. Ders: açık paket kapalı kaba, depo düzenli denetime.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Depo Güvenliği ve Erişim Kontrolü",
      sections: [
        {
          subheading: "6.1 Erişim kontrolü ve sorumluluk",
          paragraphs: [
            `Kumanya depoları ve soğuk depolar yetkisiz erişime kapalı tutulur; anahtar/erişim aşçı ve chief steward'da olur. Bu hem stok güvenliği (kayıp/fire) hem de gıda güvenliği (kontrolsüz açma-kapama, soğuk zincir kırılması) içindir. Depoya giriş-çıkış bir disipline bağlanır; soğuk depo kapısı uzun açık tutulmaz.`,
          ],
        },
        {
          subheading: "6.2 Soğuk depo içi kişisel güvenlik",
          paragraphs: [
            `Yürünebilir soğuk depo ve dondurucularda (walk-in) içeride kalma riski hayati bir tehlikedir; kapı içeriden açılabilir olmalı, içeride alarm/aydınlatma bulunmalıdır. Aşçı, içeride uzun çalışmada uygun giysi giyer ve mümkünse haber vererek girer. Kapı kilit mekanizması ve iç açma kolu düzenli test edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Walk-in dondurucuda kapana kısılma",
              text: `Dondurucu kapısı içeriden açılamazsa hipotermi/ölüm riski vardır. İç açma kolu ve alarm her zaman çalışır durumda olmalı, asla devre dışı bırakılmamalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Atık Yönetimi ile Düzen İlişkisi",
      sections: [
        {
          subheading: "7.1 Galley çöp ayrımı ve düzeni",
          paragraphs: [
            `Düzenli bir galley, atık ayrımını da kolaylaştırır. Gıda atığı, plastik, cam/metal ve yağ ayrı toplanır; bu hem haşere cazibesini azaltır hem MARPOL Ek V uyumunu sağlar (detaylı bertaraf ayrı görevde). Çöp kapları kapaklı, sızdırmaz ve düzenli boşaltılan olmalıdır; biriken atık hem koku hem böcek demektir.`,
            `Kullanılmış yemeklik yağ ayrı, kapalı kapta biriktirilir ve onaylı sisteme/shore reception facility'ye teslim edilir. Aşçı, atık akışını istasyon mantığına entegre eder; çöp istasyonu temiz alandan ayrı ve servisle çakışmayan bir konumda olur.`,
          ],
        },
        {
          subheading: "7.2 Koku ve hijyen kontrolü",
          paragraphs: [
            `Koku, çoğu zaman bir düzen/temizlik probleminin ilk işaretidir: dolaşmayan çöp, bilge/lavabo tıkanması ya da bozulan ürün. Aşçı kokuyu bir teşhis aracı olarak kullanır; kaynağı bulup giderir. Düzenli boşaltma, kapaklı kap ve günlük zemin temizliği koku ve haşereyi birlikte kontrol altında tutar.`,
          ],
        },
      ],
    },
    {
      heading: "8. Denetim ve Kayıt",
      sections: [
        {
          subheading: "8.1 MLC ve Ship Sanitation denetimi",
          paragraphs: [
            `Galley ve depolar, MLC 2006 müfettişi, liman devlet kontrolü (PSC) ve liman sağlık otoritesi tarafından denetlenir. Denetimde temizlik kayıtları, sıcaklık logları, pest control kayıtları ve Ship Sanitation Control Exemption Certificate sunulur. Düzenli ve kayıtlı bir sistem, denetimi rutin bir doğrulamaya indirger.`,
            `Aşçı, kaptan adına bu alanların sürekli denetime hazır olmasını sağlar; "denetimden önce toparlama" değil, sürekli düzen prensibi esastır. Uygunsuzluk (deficiency), gemiyi tutuklanmaya kadar götürebilecek MLC ihlallerinden biridir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 — Standard A3.2",
              text: `Yemek hazırlık ve depolama alanları hijyenik tutulmalı, düzenli denetlenmeli ve uygunsuzluklar giderilmelidir. Aşçı bu standardın saha uygulayıcısı ve kayıt tutucusudur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Mutfak/depo düzen checklist'i",
          bullets: [
            `İstasyon akışı tek yönlü ve renk kodu uygulanıyor mu?`,
            `Tüm ekipman deniz hareketine karşı sabit/kilitli mi?`,
            `Kuru depo FIFO dizili, zeminden ≥15 cm, kimyasal ayrı mı?`,
            `Soğuk depo raf hiyerarşisi (pişmiş üst, çiğ et alt) doğru mu?`,
            `Dondurucu -18°C, etiketli ve buzlanma kontrol altında mı?`,
            `Günlük/haftalık temizlik yapıldı ve kayda işlendi mi?`,
            `Davlumbaz filtresi/kanalı yağdan arındırıldı mı (yangın)?`,
            `Pest control noktaları (trap/bait/rat guard) kontrol edildi mi?`,
            `Soğuk depo iç açma kolu ve alarm çalışıyor mu?`,
            `Çöp ayrımı, kapaklı kap ve düzenli boşaltma sağlanıyor mu?`,
          ],
          paragraphs: [
            `Mutfak ve depo düzeni, görünürde basit ama sonuçları büyük bir disiplindir: iyi organize edilmiş bir galley daha hızlı, daha güvenli ve daha hijyeniktir; haşereye, yangına ve gıda bozulmasına karşı ilk savunma hattıdır. Aşçının "sürekli düzen" alışkanlığı, hem mürettebat sağlığının hem de denetim uygunluğunun sessiz teminatıdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
