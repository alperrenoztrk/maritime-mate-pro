import type { TopicDetailContent } from "@/data/navigationTopicContents";

/** Operasyonel emniyet, güvenlik, tıbbi müdahale ve hasar kontrolü içerikleri. */
export const operationalSafetyTopicContents: Record<string, TopicDetailContent> = {
  "Gemide Tıbbi İlk Yardım ve TMAS": {
    title: "Gemide Tıbbi İlk Yardım ve TMAS",
    introduction:
      "Denizde profesyonel sağlık ekibine erişim gecikebilir. İlk müdahalenin amacı tanı koymak değil; yaşamı tehdit eden problemi erken tanımak, hastayı stabilize etmek, tele-tıbbi destek almak ve tahliyeye kadar kötüleşmeyi önlemektir.",
    sections: [
      {
        title: "Olay Yeri Güvenliği ve ABCDE Yaklaşımı",
        content:
          "Kurtarıcı önce yangın, elektrik, gaz, kimyasal veya hareketli ekipman tehlikesini kontrol eder ve uygun KKD kullanır. Hastaya sistematik ABCDE yaklaşımı uygulanır: Airway hava yolu, Breathing solunum, Circulation dolaşım ve ciddi kanama, Disability bilinç/nörolojik durum, Exposure tüm vücut değerlendirmesi ve ısı kaybının önlenmesi. Yaşamı tehdit eden sorun bulunduğu anda müdahale edilir; değerlendirme sonuna kadar beklenmez.",
        bulletPoints: [
          "Bilinç, solunum ve ciddi kanama ilk dakikada değerlendirilir.",
          "Boyun/omurga yaralanması şüphesinde gereksiz hareket ettirme yapılmaz.",
          "Vital bulgular zaman damgasıyla kaydedilir ve değişim trendi izlenir.",
          "İlaç yalnız gemi tıbbi rehberi ve yetkili tıbbi tavsiye doğrultusunda verilir.",
        ],
      },
      {
        title: "CPR, AED ve Hava Yolu Tıkanması",
        content:
          "Tepkisiz ve normal solumayan kişide acil yardım çağrılır, CPR başlatılır ve AED getirilir. Eğitimli personel güncel şirket/ilk yardım protokolündeki kompresyon-solunum oranını uygular; kompresyon kesintileri en aza indirilir. AED sesli talimatları izlenir, şok sırasında kimsenin hastaya temas etmediği teyit edilir. Hava yolu tıkanmasında etkili öksürük teşvik edilir; ağır tıkanmada eğitimli müdahale uygulanır.",
      },
      {
        title: "Kanama, Şok, Yanık ve Travma",
        content:
          "Ciddi dış kanama doğrudan bası, uygun bandaj ve gerekiyorsa eğitimli personelce turnike ile kontrol edilir; turnike zamanı kaydedilir. Şokta hasta yatırılır, sıcak tutulur, gereksiz yiyecek/içecek verilmez ve vital bulgular izlenir. Yanıkta enerji kaynağı kesilir, yapışmış malzeme koparılmaz, uygun süre serin temiz suyla soğutulur ve geniş yanıkta hipotermi önlenir. Kırıklar bulunduğu pozisyonda desteklenir; açık yaralar steril örtülür.",
      },
      {
        title: "Hipotermi, Soğuk Su Şoku ve Isı Hastalıkları",
        content:
          "Sudan alınan kişi yatay ve nazik taşınır; ıslak giysiler kontrollü çıkarılır, gövde yalıtılır ve bilinç/solunum yakından izlenir. Şiddetli hipotermide kaba hareket ölümcül ritim bozukluğu yaratabilir. Isı bitkinliğinde kişi serin yere alınır ve kontrollü sıvı desteği değerlendirilir; bilinç bozukluğu ve çok yüksek vücut ısısı ısı çarpmasıdır ve acil aktif soğutma ile tahliye gerektirir.",
      },
      {
        title: "Kimyasal Maruziyet ve Zehirlenme",
        content:
          "Önce ürün SDS/MSDS bilgisi, maruziyet yolu ve gerekli KKD belirlenir. Göz/deri temasında kontamine giysi çıkarılır ve ürün talimatına uygun uzun süre yıkama yapılır. Gaz maruziyetinde korunmasız kurtarma yapılmaz; temiz havaya çıkarma ancak güvenli solunum donanımıyla gerçekleştirilir. Kusturma veya nötralize etme gibi işlemler tıbbi tavsiye olmadan yapılmaz.",
      },
      {
        title: "TMAS, Radio Medical Advice ve Tahliye",
        content:
          "Telemedical Maritime Assistance Service ile görüşmede gemi kimliği, mevki, rota/ETA, hastanın yaşı-cinsiyeti, olay öyküsü, ABCDE bulguları, vital değerler, bilinen hastalık/alerji/ilaçlar ve yapılan müdahaleler düzenli formatta verilir. Tıbbi talimatlar read-back ile teyit edilir ve yazılı kaydedilir. Helikopter veya bot tahliyesinde güverte hazırlığı, yangın ekibi, haberleşme ve hasta paketleme ilgili prosedüre göre yapılır.",
      },
    ],
    keyPoints: [
      "Önce kurtarıcı ve olay yeri güvenliği sağlanır.",
      "ABCDE değerlendirmesi yaşamı tehdit eden sorunu önceliklendirir.",
      "Vital bulgular ve tüm müdahaleler zaman damgasıyla kaydedilir.",
      "TMAS talimatları read-back ile teyit edilir; tahliye hazırlığı erken başlatılır.",
    ],
  },

  "ISPS, Gemi Güvenliği ve Korsanlık": {
    title: "ISPS, Gemi Güvenliği ve Korsanlık",
    introduction:
      "Maritime security; kaza kaynaklı emniyetten farklı olarak kasıtlı tehditleri yönetir. Gemi güvenliği, Ship Security Plan, erişim kontrolü, restricted area yönetimi, güvenlik seviyeleri ve tehdit halinde komuta zincirinin uygulanmasına dayanır.",
    sections: [
      {
        title: "Security Level 1, 2 ve 3",
        content:
          "Level 1 normal asgari koruma tedbirlerinin sürekli uygulandığı seviyedir. Level 2 artmış riskte ek tedbirler, daha sık devriye, sınırlı giriş noktası ve güçlendirilmiş kontrol gerektirir. Level 3 muhtemel veya yakın tehdide karşı belirli süreyle olağanüstü tedbirlerdir. Seviye değişikliği kaptan/SSO tarafından ekibe duyurulur; Ship Security Plan'daki gemiye özel işlemler uygulanır.",
      },
      {
        title: "SSO, CSO, PFSO ve Declaration of Security",
        content:
          "Ship Security Officer gemide planın uygulanmasını, eğitim/talimleri, kayıtları ve ekipman kontrolünü koordine eder. Company Security Officer şirket desteğini ve risk değerlendirmesini yönetir. Port Facility Security Officer liman tarafıdır. Gemi-liman veya gemi-gemi arayüzünde sorumlulukların ayrıca belirlenmesi gerektiğinde Declaration of Security düzenlenir.",
      },
      {
        title: "Erişim Kontrolü ve Restricted Areas",
        content:
          "Gemiye giriş yalnız belirlenmiş gangway/accommodation ladder noktasından, kimlik ve ziyaret amacı kontrol edilerek yapılır. Ziyaretçi kaydı, refakat, paket/bagaj kontrolü ve geçici kart sistemi uygulanır. Köprüüstü, makine kontrol, dümen dairesi, radyo alanı, ambar/tank erişimi ve güvenlik ekipman alanları restricted area olarak korunur. Yetkisiz kişi görüldüğünde tek başına fiziksel çatışmaya girilmez; köprüüstü ve SSO bilgilendirilir.",
      },
      {
        title: "Stowaway ve Şüpheli Paket",
        content:
          "Stowaway araması risk bazlı ve kayıtlı yürütülür; kişi bulunursa insani muamele, güvenli gözetim, sağlık kontrolü ve şirket/otorite bildirimi yapılır. Şüpheli paket dokunulmadan alan izole edilir, telsiz/elektrik kullanımı gemi prosedürüne göre sınırlandırılır ve yetkili makam talimatı beklenir. Mürettebat kendi başına paketi açmaz veya denize atmaz.",
      },
      {
        title: "Korsanlık, Silahlı Saldırı ve Citadel",
        content:
          "Yüksek riskli bölgede BMP ve şirket risk değerlendirmesine göre gözcülük artırılır, erişim engelleri, aydınlatma, su püskürtme ve güvenli haberleşme hazırlanır. Şüpheli yaklaşımda erken raporlama, alarm ve kaçınma manevrası uygulanır. Citadel kullanımı yalnız gemi planına göre; yeterli haberleşme, su, hava ve personel sayımı sağlanarak yapılır. Mürettebat plansız kahramanlık veya silahlı çatışmaya girmez.",
      },
      {
        title: "SSAS ve Güvenlik Kayıtları",
        content:
          "Ship Security Alert System gizli alarm üretir; yanlış kullanım ciddi sonuç doğurur ve testleri gemi/şirket prosedürüne göre yapılır. Talimler, güvenlik ihlalleri, seviye değişiklikleri, ziyaretçi olayları ve ekipman testleri gizlilik kuralları gözetilerek kayıt altına alınır. Ship Security Plan yetkisiz kişiye gösterilmez.",
      },
    ],
    keyPoints: [
      "Security level değişikliği, gemiye özel ek tedbirleri tetikler.",
      "Erişim kontrolü kayıt, kimlik doğrulama ve refakat üzerine kuruludur.",
      "Stowaway ve şüpheli pakette alan güvenliği ve resmi bildirim esastır.",
      "Korsanlıkta erken tespit, raporlama, kaçınma ve planlı citadel kullanımı uygulanır.",
    ],
  },

  "Denizcilikte Siber Güvenlik": {
    title: "Denizcilikte Siber Güvenlik",
    introduction:
      "ECDIS, GNSS, AIS, yük kontrol, makine otomasyonu ve şirket ağı birbirine bağlı dijital sistemlerdir. Siber olay; yalnız veri kaybı değil, yanlış mevki, kontrol kaybı, operasyon durması ve fiziksel kazaya dönüşebilir.",
    sections: [
      {
        title: "Köprüüstü ve OT Sistemlerinin Riskleri",
        content:
          "Operasyonel teknoloji sistemleri uzun ömürlü, üreticiye özel ve bazen güncel olmayan yazılımlarla çalışır. Yetkisiz USB, zayıf parola, ortak hesap, açık uzaktan erişim ve IT-OT ağlarının kontrolsüz bağlantısı başlıca risklerdir. ECDIS güncellemesi, servis laptopu ve taşınabilir medya yalnız onaylı prosedürle kullanılır.",
      },
      {
        title: "GNSS Spoofing ve Veri Tutarsızlığı",
        content:
          "Spoofing, alıcıya inandırıcı fakat yanlış mevki/zaman verisi üretebilir. Tek bir sensöre güvenilmez; radar kıyı resmi, görsel referans, echo sounder, ikinci GNSS, gyro/manyetik pusula ve DR ile çapraz kontrol yapılır. AIS hedeflerinin topluca kayması veya geminin karada görünmesi sistemik anomali işaretidir.",
      },
      {
        title: "Olay Anında İzolasyon ve İş Sürekliliği",
        content:
          "Şüpheli olayda kullanıcı rastgele dosya silmez veya sistemi fabrika ayarına döndürmez. Etkilenen cihaz/ağ şirket prosedürüne göre izole edilir, ekran ve alarm bilgileri kaydedilir, kaptan/şirket bilgilendirilir ve güvenli manuel/yedek operasyona geçilir. Delil niteliğindeki loglar korunur; üretici veya yetkili siber ekip talimatı beklenir.",
      },
      {
        title: "Günlük Siber Hijyen",
        content:
          "Kişisel cihazların gemi ağına kontrolsüz bağlanmaması, benzersiz parola, ekran kilidi, en az yetki, onaylı yazılım, yedekleme, phishing kontrolü ve servis erişiminin gözetimi temel tedbirlerdir. Kritik güncelleme öncesi yedek ve geri dönüş planı hazırlanır; operasyon ortasında kontrolsüz güncelleme yapılmaz.",
      },
    ],
    keyPoints: [
      "Siber olay fiziksel seyir ve yük emniyetine dönüşebilir.",
      "USB, servis laptopu ve uzaktan erişim kontrollü olmalıdır.",
      "Sensör tutarsızlığı bağımsız seyir yöntemleriyle doğrulanır.",
      "Olayda izolasyon, iş sürekliliği ve delil koruma birlikte yürütülür.",
    ],
  },

  "Çatışma Sonrası Acil Müdahale": {
    title: "Çatışma Sonrası Acil Müdahale",
    introduction:
      "Çatışma sonrası ilk hedef ikinci kazayı önlemek, can güvenliğini sağlamak, su alma ve kirliliği sınırlamak ve geminin durumunu doğru değerlendirmektir. Tarafların hukuki tartışmasından önce operasyonel emniyet gelir.",
    sections: [
      {
        title: "İlk Dakikalar",
        content:
          "Genel alarm verilir, kaptan ve makine dairesi çağrılır, yaralılar ve yangın kontrol edilir. Gemi mevkii, başı, hızı ve trafik durumu belirlenir; gerekiyorsa makine/dümenle ikinci çatışma önlenir. Çarpan gemiler plansız biçimde ayrılmaz; ayrılma su girişini artırabilir. Watertight kapılar ve ilgili açıklıklar kapatılır.",
      },
      {
        title: "Hasar ve Stabilite Değerlendirmesi",
        content:
          "Tüm ilgili tanklar, voidler, ambarlar ve sintineler sounding/uzak seviye ile kontrol edilir. Draft, list ve trim değişimleri kaydedilir. Damage Control Plan ve stabilite bilgisine göre flooding sınırı belirlenir; pompalama veya karşı balast yalnız hesaplanmış etkisi biliniyorsa yapılır. Progressive flooding riski sürekli izlenir.",
      },
      {
        title: "Haberleşme ve Raporlama",
        content:
          "Gerekirse MAYDAY/PAN-PAN ve VTS/MRCC bildirimi yapılır. Karşı gemiyle can güvenliği, hasar ve niyet bilgisi paylaşılır; kusur kabulü veya ticari taahhüt verilmez. Şirket, kıyı devleti, bayrak/klas ve P&I zinciri SMS'e göre bilgilendirilir. VDR save işlemi ve elektronik kayıt koruması yapılır.",
      },
      {
        title: "Delil ve Kayıt Koruma",
        content:
          "Logbook, bell book, radar/ECDIS ekran görüntüleri, AIS verisi, VHF kayıtları, hava ve görünürlük, personel ifadeleri ve fotoğraflar zaman damgasıyla korunur. Sonradan kayıt uydurulmaz veya silinmez. Stevedore/cargo gibi üçüncü taraf hasarları da ayrı raporlanır.",
      },
    ],
    keyPoints: [
      "Plansız ayrılma hasarı büyütebilir.",
      "Sounding, draft/list/trim ve progressive flooding izlenir.",
      "VDR ve tüm seyir delilleri gecikmeden korunur.",
      "Haberleşme emniyet odaklıdır; kusur kabulü yapılmaz.",
    ],
  },

  "Karaya Oturma ve Yeniden Yüzdürme Emniyeti": {
    title: "Karaya Oturma ve Yeniden Yüzdürme Emniyeti",
    introduction:
      "Karaya oturan gemiyi hemen yüzdürmeye çalışmak; tekne hasarını, su almayı ve kirliliği büyütebilir. Önce geminin hangi noktalardan desteklendiği, gelgit, stabilite, yapısal yük ve tank durumu belirlenir.",
    sections: [
      {
        title: "İlk Eylemler",
        content:
          "Makine durdurulur veya kaptan talimatına göre sınırlanır, genel alarm ve gerekli acil çağrı yapılır. Mevki, heading, oturma zamanı ve gelgit safhası kaydedilir. Tüm tank/ambar/void soundingleri, draftlar ve sintineler kontrol edilir. Yakıt transferi, ballast ve pompalama plansız yapılmaz.",
      },
      {
        title: "Ground Reaction ve Stabilite",
        content:
          "Deniz dibi gemi ağırlığının bir kısmını taşıdığında etkin deplasman ve GM davranışı değişir; gelgit düşerken destek kuvveti artabilir. Oturma noktası, tekne gerilmesi, list/trim ve hasarlı tanklar belirlenmeden geri yol verilmez. Loading computer veya kıyı uzmanı ile yeniden yüzdürme durumu hesaplanır.",
      },
      {
        title: "Kirlilik ve Yapısal Kontrol",
        content:
          "Yakıt/yağ tankları, boru hatları ve bunker ventleri kontrol edilir; SOPEP donanımı hazırlanır. Su yüzeyinde sheen, seviye düşüşü ve tank basıncı izlenir. Klas/şirket/salvage ekibi talimatıyla dalgıç veya ROV incelemesi planlanabilir. Çatlak, buckling ve hatch/kapı kapanma bozukluğu tekne gerilmesine işaret edebilir.",
      },
      {
        title: "Refloating Planı",
        content:
          "Plan; gelgit yüksekliği, çekme yönü, römorkör kapasitesi, ballast/yük transferi, yapısal limitler, acil durdurma kriterleri ve yüzdükten sonraki emniyetli mevkii içerir. Yüzdürme sonrası tüm soundingler tekrarlanır, sızıntı ve stabilite kontrol edilir; gemi doğrudan sefere devam etmeyebilir.",
      },
    ],
    keyPoints: [
      "İlk refleks tam yol tornistan olmamalıdır.",
      "Ground reaction stabilite ve tekne yüklerini değiştirir.",
      "Refloating mühendislik, gelgit ve kirlilik planıyla yapılır.",
      "Yüzdükten sonra hasar ve sınıf uygunluğu yeniden değerlendirilir.",
    ],
  },

  "Flooding, Hasar Kontrolü ve Yara Savunma": {
    title: "Flooding, Hasar Kontrolü ve Yara Savunma",
    introduction:
      "Su alma olayında zaman kritiktir. Başarılı yara savunma; kaynağı bulma, su geçmez sınır kurma, giriş hızını azaltma, geminin stabilitesini koruma ve tahliye/terk kararını doğru zamanda verme disiplinidir.",
    sections: [
      {
        title: "Flooding Kaynağının Belirlenmesi",
        content:
          "Yüksek seviye alarmı, sintine pompasının sık çalışması, draft/list değişimi veya kapalı mahalde su sesi ilk işaret olabilir. Güvenli ekip sounding, tank seviye, CCTV ve bölme kontrolüyle kaynağı arar. Kapalı mahal ve elektrik tehlikesi değerlendirilmeden personel gönderilmez.",
      },
      {
        title: "Watertight Boundary ve Progressive Flooding",
        content:
          "Watertight kapılar, menholler, ventilasyon ve boru geçişleri kapatılarak hasarlı bölme izole edilir. Kablo/boru galerileri ve açık kapılar progressive flooding yolu oluşturabilir. Sınırın diğer tarafındaki bulkheadler deformasyon, sızıntı ve sıcaklık açısından izlenir. Gereksiz kapı açılması yasaktır.",
      },
      {
        title: "Plugging, Patching ve Shoring",
        content:
          "Küçük delikler uygun tapa, yumuşak yama, collision mat veya kutu yama ile akış azaltılarak kontrol edilebilir. Bulkhead destekleri (shoring) yalnız doğru yük yolu ve sağlam dayanakla kurulur; kötü yerleştirilmiş destek çökebilir. Dalgıç müdahalesi deniz durumu, emiş ve pervane riski nedeniyle uzman kararı gerektirir.",
      },
      {
        title: "Pompalama, Cross-Flooding ve Stabilite",
        content:
          "Pompa kapasitesi giriş debisinden yüksekse seviye kontrol edilebilir; ancak pompalama hattı ve discharge valfleri doğrulanır. Listeyi düzeltmek için kontrolsüz karşı balast serbest yüzey ve toplam su ağırlığını artırarak gemiyi batırabilir. Cross-flooding yalnız onaylı düzen ve stabilite hesabıyla uygulanır.",
      },
      {
        title: "Terk Kararı ve Sürekli Raporlama",
        content:
          "Flooding hızı, kalan freeboard, stabilite, hava, yardım mesafesi ve yangın/kirlilik riski kaptana düzenli raporlanır. Terk hazırlığı erken yapılır; EPIRB/SART, can kurtarma araçları, kişi sayımı ve distress haberleşmesi hazırlanır. Hazırlık yapmak terk kararı verildiği anlamına gelmez.",
      },
    ],
    keyPoints: [
      "Kaynak bulunurken personel ikinci kazaya maruz bırakılmaz.",
      "Watertight boundary progressive flooding'i durdurmanın temelidir.",
      "Karşı balast ve cross-flooding hesaplanmadan uygulanmaz.",
      "Terk hazırlığı, durum kötüleşmeden önce başlatılır.",
    ],
  },

  "Acil Durum Komuta, Raporlama ve Delil Yönetimi": {
    title: "Acil Durum Komuta, Raporlama ve Delil Yönetimi",
    introduction:
      "Acil durumda teknik müdahale kadar bilgi akışı da kritiktir. Köprüüstü komuta merkezi; olay ekiplerinden doğrulanmış bilgi toplar, öncelikleri belirler, dış haberleşmeyi yürütür ve kararların kaydını tutar.",
    sections: [
      {
        title: "Komuta Zinciri ve Ortak Durum Resmi",
        content:
          "Kaptan komuta eder; köprüüstü, makine kontrol ve olay yeri ekipleri belirlenmiş kanallarda rapor verir. Raporlar kısa ve standarttır: yer, olay, tehlike, personel durumu, yapılan işlem, ihtiyaç. Söylenti ve tahmin doğrulanmış bilgi gibi aktarılmaz. Köprüüstünde olay çizelgesi ve personel sayımı tutulur.",
      },
      {
        title: "Dış Bildirim Önceliği",
        content:
          "Can tehlikesinde GMDSS/MRCC, trafik riski varsa VTS ve yakındaki gemiler, ardından şirket/DPA ve ilgili kıyı-bayrak-klas/P&I makamları SMS'e göre bilgilendirilir. Mesajlarda gemi kimliği, mevki, olay, yardım ihtiyacı, kişi sayısı, kirlilik ve niyet belirtilir. Ticari hassasiyet acil emniyet mesajını geciktirmez.",
      },
      {
        title: "Log, VDR ve Elektronik Delil",
        content:
          "VDR save işlemi, ECDIS voyage data, radar ekran görüntüsü, alarm geçmişi, GMDSS kayıtları, CCTV ve makine trendleri korunur. Kayıtlar sonradan değiştirilmez; düzeltme gerekiyorsa usulüne uygun tek çizgi/ek açıklama ile yapılır. Fotoğraf ve videoların zamanı, konumu ve çeken kişi kaydedilir.",
      },
      {
        title: "İlk Bildirim ve Sonraki İnceleme",
        content:
          "İlk bildirim yalnız doğrulanmış gerçekleri içerir; kök neden aceleyle ilan edilmez. Olay kontrol altına alındıktan sonra ifadeler, kronoloji, ekipman durumu ve prosedür sapmaları toplanır. Amaç kişiyi suçlamak değil; doğrudan, katkı sağlayan ve örgütsel nedenleri belirleyip düzeltici eylem üretmektir.",
      },
    ],
    keyPoints: [
      "Ortak durum resmi kısa, doğrulanmış ve zaman damgalı raporlarla kurulur.",
      "Can ve çevre emniyeti bildirim önceliğidir.",
      "VDR ve elektronik delil erken korunur.",
      "İlk rapor gerçekleri, kök neden incelemesi ise daha sonra yapılan analizi içerir.",
    ],
  },
};
