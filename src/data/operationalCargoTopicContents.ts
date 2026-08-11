import type { TopicDetailContent } from "@/data/navigationTopicContents";

/** Tanker, özel yük, cargo-care ve liman belge operasyonları. */
// Ders görselleri — depoda hâlihazırda bulunan varlıklar.
import lngCarrierImage from "@/assets/lessons/lng-carrier.jpg";
import tankerShipImage from "@/assets/ships/tanker-ship.jpg";
import roroShipImage from "@/assets/ships/roro-ship.jpg";
import hatchCoversImage from "@/assets/seamanship/hatch-covers.jpg";

export const operationalCargoTopicContents: Record<string, TopicDetailContent> = {
  "Petrol Tankeri Yük Operasyonları": {
    title: "Petrol Tankeri Yük Operasyonları",
    introduction:
      "Petrol tankerinde yük operasyonu; yük planı, hat dizilimi, inert gaz, statik elektrik, manifold emniyeti, tank atmosferi ve gemi-kara koordinasyonunun birlikte yönetilmesini gerektirir. Her işlem gemiye özel Cargo Operations Manual, ISGOTT prensipleri ve terminal anlaşmasına göre yürütülür.",
    sections: [
      {
        title: "Yükleme Öncesi Plan ve Ship/Shore Toplantısı",
        content:
          "Yük cinsi, miktar, yoğunluk, sıcaklık, flash point, tank dağılımı, maksimum yükleme oranı, topping-off sırası, trim/stabilite, stress ve draft limitleri planlanır. Ship/Shore Safety Checklist karşılıklı tamamlanır; acil durdurma işareti, haberleşme kanalı, ESD düzeni, manifold basıncı, vapour return, tank havalandırması ve döküntü müdahalesi teyit edilir. Operasyon başlamadan önce tüm kritik valfler ikinci kişiyle çapraz kontrol edilir.",
        image: tankerShipImage,
        imageAlt: "Oil tanker during cargo operations",
      },
      {
        title: "Line-up, Manifold ve Basınç Kontrolü",
        content:
          "Cargo line-up, doğru tank ve doğru manifold arasında kesintisiz yol oluşturacak şekilde hazırlanır. Sea valve, crossover ve stripping bağlantılarının yanlış açılması ciddi kirlilik veya tank karışmasına yol açabilir. Başlangıç düşük hızda yapılır; doğru tanka giriş, manifold sızıntısı ve tank seviye artışı doğrulanmadan tam rate'e çıkılmaz. Manifold watch sürekli tutulur; drip tray, scupper plug ve SOPEP ekipmanı hazırdır.",
        bulletPoints: [
          "Valf pozisyonu yalnız uzaktan göstergeye değil yerel kontrole de dayanır.",
          "Manifold bağlantıları, blank/flange, reducer ve boltlar uygun ratingde olmalıdır.",
          "Basınç artışı valf kapatma sırası ve shore pump davranışıyla birlikte yönetilir.",
          "Emergency shutdown yöntemi tüm taraflarca önceden anlaşılır.",
        ],
      },
      {
        title: "Inert Gas System ve Tank Atmosferi",
        content:
          "Yük tankı atmosferi şirket ve gemi limitlerinde inert tutulur; oksijen oranı, deck main basıncı, scrubber/seal durumu ve alarm/tripler izlenir. Pozitif basınç hava girişini önler. IGS arızası yük operasyonunu doğrudan etkiler; operasyon, approved procedure ve kaptan/terminal kararı olmadan sürdürülmez. Tank içine hava verilmesi veya inert gaz-hava karışımının flammable range'den geçişi kontrollü gas-freeing/purging sırasıyla yapılır.",
      },
      {
        title: "Statik Elektrik ve Closed Operations",
        content:
          "Düşük iletkenlikli ürünlerde başlangıç yükleme hızı, serbest düşüş, splash filling, metal ekipman indirme ve bekleme süreleri statik elektrik riskine göre sınırlandırılır. Ullage ve sampling mümkün olduğunca closed system ile yapılır. Tank atmosferine iletken olmayan halatla veya uygun olmayan taşınabilir ekipmanla giriş yapılmaz. Bonding/earthing uygulamaları gemi-terminal prosedürüne göre yürütülür.",
      },
      {
        title: "Topping-off, Discharge ve Stripping",
        content:
          "Topping-off sırasında tank başına rate düşürülür, bağımsız high-level alarm ve level gauge karşılaştırılır, sorumlu zabit tank değişimlerini doğrudan yönetir. Discharge planında pompa sırası, back pressure, tank suction kaybı, stripping, trim ve tank vakumu izlenir. Pompa kavitasyonu ve aşırı vakum önlenir; terminalle rate değişiklikleri kapalı döngü teyitle yapılır.",
      },
      {
        title: "Tank Cleaning, COW ve Slop Yönetimi",
        content:
          "Tank cleaning planı ürün özellikleri, sonraki yük, kaplama, MARPOL ve personel maruziyetine göre hazırlanır. Crude Oil Washing yalnız onaylı COW Manual, inert atmosfer ve eğitimli ekip ile yapılır. Wash water/slop tank dağılımı, interface ve settling takip edilir; denize tahliye yalnız ODME ve yasal şartlarla mümkündür. Tank girişinden önce gas-freeing, havalandırma ve enclosed-space prosedürü tamamlanır.",
      },
    ],
    keyPoints: [
      "Tanker operasyonu ship/shore ortak plan ve doğrulanmış line-up ile başlar.",
      "IGS ve tank basıncı operasyonun temel emniyet bariyeridir.",
      "Statik elektrik riski başlangıç rate'i ve tank içi ölçüm yöntemlerini belirler.",
      "Topping-off ve stripping en yoğun insan takibi gerektiren aşamalardır.",
    ],
  },

  "Kimyasal Tanker Yük Operasyonları": {
    title: "Kimyasal Tanker Yük Operasyonları",
    introduction:
      "Kimyasal tanker operasyonunda ürünün toksisitesi, reaktivitesi, inhibitör ihtiyacı, tank kaplama uyumu ve önceki yük kalıntıları birlikte değerlendirilir. Yanlış tank veya hat seçimi yalnız kargo hasarı değil, zehirli gaz, polimerizasyon, yangın ve ciddi çevre olayı yaratabilir.",
    sections: [
      {
        title: "Ürün Bilgisi ve Uyumluluk",
        content:
          "IBC Code, SDS, Certificate of Fitness, P&A Manual ve charterer talimatından ürünün kategori, toksisite, flash point, vapour pressure, reaktivite, ısıtma, inertleme, inhibitör ve özel ekipman şartları doğrulanır. Tank coating compatibility listesi kontrol edilir. Birbirine reaktif ürünler yalnız tankta değil; ortak hat, vent, slop ve tank cleaning sistemlerinde de ayrılır.",
        image: tankerShipImage,
        imageAlt: "Tanker of the type used for chemical cargoes",
      },
      {
        title: "Segregation ve Dedicated Systems",
        content:
          "Valf segregasyonu tek başına yeterli olmayabilir; spool piece sökme, double valve segregation, blanking veya dedicated line/pump gerekebilir. Crossoverlar, drainler, stripping ve vapour return bağlantıları plan üzerinde işaretlenir. Numune ve doküman zinciri ürün karışması iddiasında kritik delildir.",
      },
      {
        title: "Toksik Buhar, PPE ve Kapalı Operasyon",
        content:
          "Toksik ürünlerde closed loading/sampling, uygun filtreli respiratör veya SCBA, kimyasal elbise, göz duşu ve dekontaminasyon hazırlığı gerekir. Personel maruziyet limitleri, rüzgâr yönü ve gaz dedektörü sensör uyumu kontrol edilir. Uygun olmayan sensör tehlikeli sıfır okuması verebilir; cihaz ürün gazına göre seçilir ve bump/calibration durumu doğrulanır.",
      },
      {
        title: "Isıtma, İnhibitör ve Reaktivite Yönetimi",
        content:
          "Bazı ürünler minimum sıcaklıkta akışkan kalmalı, bazıları aşırı ısıda bozulur veya polimerize olur. Heating coil sıcaklığı ve rate'i kargo talimatına göre sınırlanır. İnhibitörlü ürünlerde sertifika, inhibitör konsantrasyonu, oksijen gereksinimi ve geçerlilik süresi izlenir. Reaktif ürünlerde su, pas, önceki yük ve temizlik kimyasalı kontaminasyonu önlenir.",
      },
      {
        title: "Prewash, Stripping ve P&A Manual",
        content:
          "Kategori X ve belirli yüksek viskoziteli/solidifying Y ürünlerinde zorunlu prewash uygulanabilir. Stripping performansı, tank bottom residue ve shore reception düzeni P&A Manual'a göre yürütülür. Surveyor onayı gereken işlemlerde tank/hat sırası ve wash water miktarı kayıt altına alınır; Cargo Record Book doğru kodlarla doldurulur.",
      },
      {
        title: "Tank Cleaning Matrix ve Duvar Yıkama Testi",
        content:
          "Sonraki yükün saflık şartına göre tank cleaning matrix kullanılır; su, deterjan, solvent, recirculation ve ventilation sırası coating limitlerini aşmayacak şekilde planlanır. Wall wash testleri klorür, hidrokarbon, permanganate time veya ürün özel kriterlerini doğrulayabilir. Test sonucu uygun değilse yük almadan önce ek temizlik yapılır.",
      },
    ],
    keyPoints: [
      "Kimyasal ürün, tank coating ve önceki yük birlikte değerlendirilir.",
      "Segregation ortak hat, vent ve slop bağlantılarını da kapsar.",
      "Gaz ölçüm cihazı hedef kimyasala uygun olmalıdır.",
      "Prewash ve tank cleaning işlemleri P&A Manual'a göre kaydedilir.",
    ],
  },

  "LPG ve LNG Yük Operasyonları": {
    title: "LPG ve LNG Yük Operasyonları",
    introduction:
      "Sıvılaştırılmış gaz yükleri düşük sıcaklık, yüksek buhar basıncı ve hızlı faz değişimi nedeniyle özel risk taşır. Operasyon; containment sistemi, cooldown, vapour balance, ESD, basınç-sıcaklık kontrolü ve gaz algılama sistemlerinin bütünlüğüne dayanır.",
    sections: [
      {
        title: "Containment ve Yük Özellikleri",
        content:
          "Independent tank, membrane veya diğer containment sisteminin tasarım basıncı/sıcaklık limitleri bilinmelidir. LNG kriyojenik sıcaklıkta, LPG ise ürüne göre basınçlı veya soğutulmuş taşınabilir. Malzeme kırılganlığı, yoğunluk, rollover, boil-off gas ve sıvı genleşmesi operasyon planında dikkate alınır.",
        image: lngCarrierImage,
        imageAlt: "LNG carrier with spherical containment tanks",
      },
      {
        title: "Cooldown ve Gassing-up",
        content:
          "Sıcak tank/hatlara kriyojenik sıvı hızlı verilirse termal şok ve aşırı stres oluşur. Cooldown kontrollü rate ve sıcaklık farkı limitleriyle yapılır. Hava bulunan sisteme doğrudan yanıcı gaz verilmez; inerting ve gassing-up sırası ile flammable range kontrollü geçilir. Oksijen ve hidrokarbon ölçümleri kritik geçiş noktalarında alınır.",
      },
      {
        title: "Vapour Return, Compressor ve Basınç Kontrolü",
        content:
          "Yükleme sırasında yer değiştiren buhar shore vapour return veya gemi sistemleriyle yönetilir. Cargo compressor, reliquefaction ve boil-off gas tüketimi tank basıncını limitte tutar. Valf kapatma, rate değişimi veya sıcak ürün karışması ani basınç artışı yaratabilir. Tank relief sistemleri asla izole edilmez.",
      },
      {
        title: "ESD ve Ship-Shore Link",
        content:
          "Emergency Shutdown sistemi gemi ve terminal arasında ortak test edilir. ESD-1 genellikle sıvı/buhar akışını durdurur; ESD-2 veya emergency release coupling bağlantıyı ayırabilir. Aktivasyon nedenleri, kapanma süresi, surge riski ve yeniden başlatma yetkisi önceden anlaşılır. Manifold bölgesi sürekli gözetlenir.",
      },
      {
        title: "Gaz Kaçağı ve Kriyojenik Maruziyet",
        content:
          "Gaz dedektörleri, ventilation ve water curtain/deluge sistemleri çalışır tutulur. LNG buharı başlangıçta soğuk ve ağır davranabilir; LPG çoğunlukla alçak bölgelerde birikir. Ateşleme kaynakları kontrol edilir. Kriyojenik sıvı ciltte ciddi soğuk yanığı ve normal karbon çelikte kırılganlık yaratır; uygun PPE ve dökülme yönlendirmesi gerekir.",
      },
    ],
    keyPoints: [
      "Cooldown termal şoku önleyen kontrollü operasyondur.",
      "Tank basıncı vapour return, compressor ve BOG yönetimiyle korunur.",
      "ESD gemi-terminal ortak sistemidir ve operasyon öncesi test edilir.",
      "Gaz kaçağında hem yanıcılık hem boğucu/kriyojenik risk değerlendirilir.",
    ],
  },

  "Cargo Care, Terleme ve Ambar Havalandırması": {
    title: "Cargo Care, Terleme ve Ambar Havalandırması",
    introduction:
      "Yük teslim alındığı durumla teslim edilmelidir. Cargo care; sıcaklık, nem, çiğ noktası, havalandırma, ambar sızdırmazlığı, sintine ve yükün özel hassasiyetlerinin sefer boyunca izlenmesini kapsar.",
    sections: [
      {
        title: "Cargo Sweat ve Ship Sweat",
        content:
          "Cargo sweat, sıcak nemli hava soğuk yük yüzeyine temas ettiğinde yük üzerinde yoğuşmadır. Ship sweat ise sıcak nemli hava soğuk gemi sacına temas ettiğinde iç yüzeyde oluşup yüke damlar. Risk, dış hava ve ambar havasının dew point değerleri ile yük/sac sıcaklığı karşılaştırılarak değerlendirilir. Yanlış havalandırma hasarı artırabilir.",
        image: hatchCoversImage,
        imageAlt: "Closed hatch covers over a cargo hold that must be ventilated",
      },
      {
        title: "Dew Point ve 3-Degree Rule",
        content:
          "Dew point rule yaklaşımında dış havanın çiğ noktası ambar havasından düşükse havalandırma genellikle uygundur. 3-degree rule özellikle ölçüm imkânı sınırlı olduğunda kullanılır: dış hava sıcaklığı yükleme limanındaki yük sıcaklığından en az yaklaşık 3°C düşükse havalandırma değerlendirilir. Her iki kural yük cinsi, rota ve şirket talimatıyla birlikte kullanılmalıdır; mutlak otomatik karar değildir.",
        formula: {
          text: "Ventilation candidate: outside dew point < hold dew point | 3°C rule: outside air ≤ cargo loading temperature − 3°C",
          description: "Yağmur, deniz spreyi, sis ve fumigation şartları ayrıca kontrol edilir.",
        },
      },
      {
        title: "Ambar Hazırlığı ve Bilge Kontrolü",
        content:
          "Önceki yük artığı, koku, pas, boya pulları, yağ, haşere ve nem yeni yükü kontamine edebilir. Hold cleanliness standardı yük/charterer şartına göre grain clean, hospital clean veya normal clean olabilir. Bilge welller temiz, strainer ve non-return düzeni çalışır, sounding pipe erişilebilir olmalıdır. Bilge suyu yükle kontamine ise otomatik denize basılmaz.",
      },
      {
        title: "Fumigation ve Atmosfer Riski",
        content:
          "Fumigant gazları yaşam mahalline, duct ve ortak hacimlere sızabilir. Fumigation planı, yetkili fumigator sertifikası, gaz ölçümü, warning notice, ilaç konumu ve ventilasyon/tahliye şartlarını içerir. Fumigated hold'e enclosed-space prosedürü olmadan girilmez; fosfin gibi gazlar uygun sensörle ölçülür.",
      },
      {
        title: "Reefer ve Sıcaklık Hassas Yükler",
        content:
          "Reefer konteynerlerde set point, supply/return air, alarm, power connection ve kayıt sistemi kontrol edilir. Sadece display değerine değil fiziksel fiş, cable ve havalandırma açıklıklarına bakılır. Atmosphere-controlled yüklerde O2/CO2 ayarları ve kapı açma riski izlenir. Arıza ve sıcaklık sapması derhâl kayıt ve bildirim gerektirir.",
      },
    ],
    keyPoints: [
      "Havalandırma kararı dış/ambar dew point ve yük sıcaklığına dayanır.",
      "Yanlış havalandırma cargo veya ship sweat yaratabilir.",
      "Hold cleanliness ve bilge durumu yük kabulünden önce belgelenir.",
      "Fumigated yükte gaz ölçümü ve erişim kontrolü zorunludur.",
    ],
  },

  "Çelik, Kereste, Ağır Yük ve Ro-Ro Operasyonları": {
    title: "Çelik, Kereste, Ağır Yük ve Ro-Ro Operasyonları",
    introduction:
      "Özel yükler standart genel yük yaklaşımıyla emniyetli taşınamaz. Yoğun noktasal yük, kayma, yuvarlanma, yüksek ağırlık merkezi, rüzgâr alanı ve araç yakıtı gibi riskler yük tipine özgü plan ve bağlama gerektirir.",
    sections: [
      {
        title: "Steel Coil ve Çelik Yükler",
        content:
          "Coiller güçlü dunnage/cradle üzerine eye-to-sky veya eye-to-side planına göre istiflenir; tank top point load ve sıra geometrisi kontrol edilir. Coillerin yuvarlanma yönüne karşı chocking ve lashing uygulanır. Islak çelikte pas iddiası sık olduğundan yük öncesi durum, yağmur, ambar dryness ve rust scale fotoğraflanır; mate's receipt'e doğru remark yazılır.",
        image: roroShipImage,
        imageAlt: "Ro-Ro vessel used for rolling and heavy cargo",
      },
      {
        title: "Timber Deck Cargo",
        content:
          "Güverte kerestesi görüş, stabilite, rüzgâr alanı, freeing port ve erişimi etkiler. Timber Deck Cargo Code ve gemi manualına göre stanchion, wire/chain lashing, uprights ve walkway düzenlenir. Su emme ağırlığı ve yük oturması nedeniyle bağlar seyirde yeniden gerilir. Load line ve timber freeboard şartları kontrol edilir.",
      },
      {
        title: "Heavy Lift ve Project Cargo",
        content:
          "Kaldırma planı yük ağırlığı, COG, lifting points, crane outreach, tandem lift, dynamic factor ve güverte point load hesabını içerir. Rigging arrangement onaylanır; test sertifikaları ve SWL doğrulanır. Yük havadayken gemi listi ve GM etkisi hesaplanır. Tag line, exclusion zone ve tek komuta eden banksman kullanılır.",
      },
      {
        title: "Ro-Ro Araç ve Trailer Bağlama",
        content:
          "Araçlar assigned lane ve deck strength limitlerine göre yerleştirilir; park freni, teker takozu, lashing point ve uygun bağ sayısı kullanılır. Semi-trailer trestle üzerine alınır. Yakıt sızıntısı, elektrikli araç batarya hasarı, ventilation, fire patrol ve kapalı güverte gaz riski izlenir. Ramp/door kapanması ve watertight/weathertight bütünlük departure öncesi doğrulanır.",
      },
    ],
    keyPoints: [
      "Özel yükte point load ve yük COG'si gemi planıyla doğrulanır.",
      "Steel coil yuvarlanma yönüne karşı chocking ve lashing ister.",
      "Heavy lift sırasında asılı yük gemi stabilitesini doğrudan etkiler.",
      "Ro-Ro'da araç bağlama, ventilation ve ramp/door bütünlüğü birlikte kontrol edilir.",
    ],
  },

  "Liman Yük Belgeleri, Protesto ve Hasar Yönetimi": {
    title: "Liman Yük Belgeleri, Protesto ve Hasar Yönetimi",
    introduction:
      "Yük operasyonunun hukuki sonucu çoğu zaman gemide tutulan kayıtlara bağlıdır. Zabit; gerçeği tarafsız kaydetmeli, yanlış clean belge baskısına direnç göstermeli ve hasarı zamanında protesto ederek delili korumalıdır.",
    sections: [
      {
        title: "Mate's Receipt ve Bill of Lading Remarks",
        image: "/diagrams/cargo/liman-belgeleri.svg",
        imageAlt: "Order of the port cargo documents and when to issue a letter of protest",
        content:
          "Mate's Receipt yükün gemiye alındığı görünür durum ve miktar için ilk gemi belgesidir. Islak, paslı, yırtık, eksik, açık paketli veya sayımı belirsiz yük doğru ve somut ifadeyle remarked edilir. Belirsiz genel ifadeler veya kanıtlanamayan suçlayıcı dil kullanılmaz. Clean B/L verilmesi için remark silme baskısı kaptan/şirket/P&I'ye bildirilir; yetkisiz Letter of Indemnity kabul edilmez.",
      },
      {
        title: "Statement of Facts ve Time Sheet",
        content:
          "Pilot on board, all fast, gangway down, NOR, loading start/stop, weather stoppage, breakdown, shifting, completion ve document delivery saatleri kaynağıyla birlikte kaydedilir. SOF tarafsız kronolojidir; laytime yorumunu zabit tek başına yapmaz. Terminal veya acente belgesindeki yanlış zaman imzalanmadan önce düzeltilir ya da uygun protesto notu eklenir.",
      },
      {
        title: "Letter of Protest",
        content:
          "Kötü hava beklemesi, düşük yükleme hızı, shore ekipman arızası, draft farkı, yük hasarı, stevedore damage, uygunsuz yük veya gecikme gibi durumda protesto gecikmeden verilir. Mektup tarih-saat, olay, gözlenen gerçek, geminin aldığı tedbir ve hakların saklı tutulduğunu içerir. Karşı taraf imzalamazsa teslim girişimi, e-posta ve tanık kaydı korunur.",
      },
      {
        title: "Stevedore ve Cargo Damage Report",
        content:
          "Hasar alanı güvenli hale getirilir, operasyon gerekirse durdurulur, fotoğraf/video, ölçü, ekipman kimliği, tanık ve zaman kaydedilir. Stevedore temsilcisi çağrılır ve joint inspection talep edilir. Geçici onarım kalıcı kabul anlamına gelmez. Hatch cover, railing, tank top, crane ve shell hasarı klas/şirket değerlendirmesine gidebilir.",
      },
      {
        title: "Tally, Draft Survey ve Miktar Farkı",
        content:
          "Shore scale, tally, ullage veya draft survey sonuçları farklı olabilir. Ölçüm yöntemi, su yoğunluğu, tank sounding, deductibles, trim ve okuma koşulları belgelenir. Şüpheli miktar için surveyor çağrılır ve protesto verilir. Zabit kesin bilmediği shore figure'ü doğrulayan imza atmaz.",
      },
      {
        title: "Delil Zinciri ve P&I Bildirimi",
        content:
          "Orijinal belgeler, e-postalar, fotoğraflar, numuneler, seal numaraları ve survey raporları düzenli dosyalanır. Numune zincirinde kim aldı, ne zaman, nereden, hangi seal ile saklandı bilgisi bulunur. Büyük talep ihtimalinde P&I correspondent veya surveyor erken çağrılır; gemi personeli sorumluluk kabul eden beyan vermez.",
      },
    ],
    keyPoints: [
      "Belge gerçeği yansıtmalı; ticari baskı kayıtları değiştirmemelidir.",
      "SOF kronoloji, Letter of Protest hakların korunması aracıdır.",
      "Hasarda fotoğraf, ölçü, tanık ve joint inspection delil temelidir.",
      "Numune ve doküman zinciri P&I savunmasının önemli parçasıdır.",
    ],
  },
};
