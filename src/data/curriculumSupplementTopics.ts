import type { CurriculumLevel } from "@/data/curriculumHierarchy";

export interface CurriculumSupplementSection {
  title: string;
  content: string;
  bulletPoints?: string[];
}

export interface CurriculumSupplementTopic {
  id: string;
  category: string;
  moduleId: string;
  title: string;
  sourceTitle: string;
  level: CurriculumLevel;
  introduction: string;
  sections: CurriculumSupplementSection[];
  keyPoints: string[];
}

/**
 * Yeni bir ders veya modül oluşturmaz. Konuları yalnızca mevcut Güverte ve
 * Makine modüllerinin içine ekler.
 */
export const curriculumSupplementTopics: CurriculumSupplementTopic[] = [
  {
    id: "communication-iamsar-sar-coordination",
    category: "communication",
    moduleId: "com-distress",
    title: "IAMSAR ve Arama Kurtarma Koordinasyonu",
    sourceTitle: "IAMSAR ve Arama Kurtarma Koordinasyonu",
    level: "advanced",
    introduction:
      "Arama-kurtarma olayında başarı; ilk ihbarın doğru alınmasına, arama alanının sistematik kurulmasına, görevlerin açık paylaşılmasına ve haberleşmenin kesintisiz sürdürülmesine bağlıdır. Gemi, olay yerine ilk ulaşan unsur olduğunda kendi emniyetini koruyarak IAMSAR prensipleri ve kaptanın talimatları doğrultusunda koordineli hareket eder.",
    sections: [
      {
        title: "İlk İhbar ve İlk Değerlendirme",
        content:
          "Distress mesajı veya MOB ihbarı alındığında zaman, mevki, kişi/gemi tanımı, hava-deniz durumu, akıntı, görüş, mevcut yardım unsurları ve son temas bilgisi kaydedilir. Kaptan derhal çağrılır; MRCC/RCC ve ilgili sahil istasyonu ile temas kurulur. Rota değişikliği, sürat, yakıt, draft, manevra alanı ve kendi gemisinin kurtarma kapasitesi birlikte değerlendirilir.",
      },
      {
        title: "Olay Yeri Koordinasyonu",
        content:
          "Olay yerinde On-Scene Coordinator görevi verildiğinde katılan unsurların çağrı işaretleri, kabiliyetleri, tahsis edilen sektörleri, haberleşme kanalları ve rapor aralıkları açıkça belirlenir. Emirler kapalı döngü haberleşmeyle teyit edilir. Koordinasyon görevi verilmemişse gemi, MRCC/RCC veya atanmış koordinatörün planına uyar ve bağımsız, çelişkili arama hareketi yapmaz.",
      },
      {
        title: "Arama Alanı ve Arama Düzenleri",
        content:
          "Datum; son bilinen mevki, geçen süre, rüzgâr, akıntı, leeway ve hedefin sürüklenmesi dikkate alınarak güncellenir. Expanding square, sector search, parallel track ve creeping line gibi düzenler hedef türü, görüş, arama birimi sayısı ve alan büyüklüğüne göre seçilir. Course, leg length, track spacing ve arama sürati başlamadan önce tüm birimlere bildirilir.",
      },
      {
        title: "Haberleşme ve Durum Raporu",
        content:
          "SITREP; zaman, güncel datum, taranan alan, görüş, bulunan izler, kurtarılan/kayıp kişi sayısı, gemilerin durumu ve ihtiyaçları içerir. VHF çalışma kanalı ile distress kanalının görevleri ayrılır; kritik mesajlar read-back ile doğrulanır. Haberleşme kaybı halinde önceden belirlenen zaman ve hareket planı uygulanır.",
      },
      {
        title: "Kurtarma ve Olay Sonrası",
        content:
          "Kurtarma yaklaşımında pervane, emiş, borda yüksekliği, deniz durumu ve kazazedenin hipotermi riski dikkate alınır. Rescue boat, pilot ladder, scrambling net, lifebuoy veya uygun diğer donanım gemi planına göre hazırlanır. Kurtarma sonrası tıbbi ilk yardım, kişi sayımı, delil ve kayıtların korunması, MRCC/RCC güncellemesi ve ayrıntılı log kaydı tamamlanır.",
      },
    ],
    keyPoints: [
      "Kaptan ve MRCC/RCC erken bilgilendirilir; zaman ve mevki kayıt altına alınır.",
      "Arama düzeni datum, drift, görüş ve mevcut birimlere göre seçilir.",
      "Koordinasyon görevleri, sektörler ve haberleşme planı kapalı döngüyle teyit edilir.",
      "Kurtarma sonrası tıbbi müdahale, raporlama ve kayıt süreci tamamlanır.",
    ],
  },
  {
    id: "safety-violence-harassment-prevention",
    category: "safety",
    moduleId: "safety-occupational",
    title: "İş Emniyetinde Şiddet, Taciz ve Zorbalığın Önlenmesi",
    sourceTitle: "İş Emniyetinde Şiddet, Taciz ve Zorbalığın Önlenmesi",
    level: "operational",
    introduction:
      "Gemide şiddet, taciz, cinsel taciz, zorbalık ve misilleme yalnız personel ilişkisi sorunu değildir; dikkat, karar verme, yorgunluk, takım çalışması ve emniyet raporlamasını doğrudan bozan bir iş emniyeti riskidir. Her personel güvenli müdahale, bildirim ve destek yollarını bilmelidir.",
    sections: [
      {
        title: "Uygunsuz Davranışın Tanınması",
        content:
          "Fiziksel saldırı, tehdit, aşağılayıcı tekrarlar, dışlama, yetkinin kötüye kullanılması, istenmeyen cinsel davranış, cinsel içerikli söz veya görüntü, takip ve raporlama sonrası misilleme kabul edilemez davranışlardır. Davranışın şaka olarak sunulması etkisini ortadan kaldırmaz. Tek olay ciddi olabilir; bazı davranışlar ise tekrarlandığında zorbalık niteliği kazanır.",
      },
      {
        title: "Acil Güvenlik ve İlk Müdahale",
        content:
          "Yakın tehlike varsa kişi olay yerinden güvenli alana alınır, nöbetçi zabit veya kaptan bilgilendirilir ve gerektiğinde tıbbi yardım sağlanır. Müdahale eden personel fiziksel çatışmayı büyütmez; yalnız güvenliyse davranışı durdurur, destek çağırır ve tanıkların ayrılmadan belirlenmesini sağlar. Cinsel saldırı iddiasında kişinin güvenliği, mahremiyeti ve tıbbi ihtiyaçları önceliklidir.",
      },
      {
        title: "Bildirim, Kayıt ve Gizlilik",
        content:
          "Bildirim şirketin SMS/şikâyet prosedüründeki güvenilir kanallardan yapılır. Tarih, saat, yer, davranış, kullanılan ifadeler, tanıklar ve ilk alınan tedbirler olgusal biçimde kaydedilir. Dedikodu yayılmaz; bilgi yalnız görev gereği erişmesi gereken kişilerle paylaşılır. Kayıtlar değiştirilmez ve elektronik deliller korunur.",
      },
      {
        title: "Misillemenin Önlenmesi ve Psikolojik Güvenlik",
        content:
          "Şikâyet eden, tanıklık yapan veya soruşturmaya katılan kişiye vardiya, görev, değerlendirme ya da sosyal baskı yoluyla misilleme yapılmamalıdır. Personelin emniyet endişesini rütbe baskısı olmadan söyleyebilmesi psikolojik güvenliğin temelidir. Asertif iletişim ve stop-work authority, emniyetsiz davranışın erken durdurulmasını sağlar.",
      },
      {
        title: "Sorumluluk ve Olay Sonrası Destek",
        content:
          "Kaptan ve şirket; tarafsız inceleme, geçici koruyucu tedbir, tıbbi/psikolojik destek, çalışma düzeninin güvenliği ve gerekli resmi bildirimleri koordine eder. Mürettebat kendi soruşturmasını yürütmez veya tarafları yüzleştirmeye zorlamaz. Olaydan çıkarılan dersler kişileri teşhir etmeden eğitim ve risk kontrolüne dönüştürülür.",
      },
    ],
    keyPoints: [
      "Şiddet ve taciz iş emniyeti, takım çalışması ve raporlama kültürünü bozar.",
      "Yakın tehlikede önce güvenlik ve tıbbi ihtiyaçlar ele alınır.",
      "Bildirim olgusal, gizli ve şirket prosedürüne uygun yapılır.",
      "Misilleme kabul edilemez; güvenli konuşma ve asertif müdahale desteklenir.",
    ],
  },
  {
    id: "cargo-lost-containers-danger-message",
    category: "cargo",
    moduleId: "cargo-documents",
    title: "Konteyner Kaybı, Tehlike Mesajı ve Olay Belgeleri",
    sourceTitle: "Konteyner Kaybı, Tehlike Mesajı ve Olay Belgeleri",
    level: "advanced",
    introduction:
      "Denize konteyner kaybı; seyir tehlikesi, yük hasarı, kirlilik ve hukuki sorumluluk doğurur. İlk amaç geminin emniyetini sağlamak, tehlikeyi çevredeki gemilere ve yetkili makamlara gecikmeden bildirmek ve olayın teknik-ticari delillerini korumaktır.",
    sections: [
      {
        title: "İlk Operasyonel Tedbirler",
        content:
          "Kaptan çağrılır; geminin mevkii, rota ve sürati doğrulanır. İlave kayıp, lashing arızası, güverte hasarı, personel tehlikesi ve tehlikeli yük riski değerlendirilir. Güverteye çıkış yalnız risk değerlendirmesi, uygun KKD ve emniyetli hava-deniz şartlarında yapılır. Gerekirse sürat/rota değiştirilir ve hasarlı istif alanı izole edilir.",
      },
      {
        title: "Tehlike Mesajı ve Resmî Bildirim",
        content:
          "Kayıp, çevredeki gemiler için seyir tehlikesi oluşturabileceğinden uygun urgency/safety haberleşmesi yapılır; en yakın kıyı devleti ve bayrak/şirket bildirim zinciri uygulanır. Mesajda gemi kimliği, olay zamanı ve mevkii, kayıp veya sürüklenen konteynerlerin bilinen sayısı, yükün tehlikeli olup olmadığı, hava-deniz durumu ve geminin aldığı tedbirler açıkça belirtilir. Kesin olmayan bilgiler yaklaşık olarak işaretlenir ve yeni bilgi geldikçe güncellenir.",
      },
      {
        title: "Yük ve Lashing Kontrolü",
        content:
          "Cargo Securing Manual, bay plan, lashing plan, twistlock/turnbuckle kayıtları ve yükleme terminali bilgileri incelenir. Komşu istiflerde gevşeme, deformasyon, container corner casting hasarı ve güverte/lashing bridge yapısal etkileri kontrol edilir. Emniyetsiz istife müdahale için gemi hareketi, rüzgâr ve çalışma yüksekliği riski ayrıca değerlendirilir.",
      },
      {
        title: "Delil ve Olay Belgeleri",
        content:
          "Deck logbook, weather log, course/speed kayıtları, ECDIS track, VDR verisi, fotoğraf/video, bay plan, manifest, DG declaration, lashing sertifikaları, terminal tally ve ilgili e-postalar korunur. Fotoğraflar zaman ve konumla ilişkilendirilir. Bilinmeyen neden hakkında kesin hüküm kurulmaz; gözlem ile yorum birbirinden ayrılır.",
      },
      {
        title: "Ticari ve Teknik Takip",
        content:
          "Şirket, charterer, klas, P&I ve ilgili makamlarla gemi prosedürüne göre iletişim kurulur. Letter of Protest veya olay bildirimi gerçekler, zaman çizelgesi ve alınan tedbirler üzerinden hazırlanır; yetkisiz kusur kabulü yapılmaz. Kalan yükün emniyeti, liman seçimi, survey ve düzeltici lashing planı kaptan ve şirket tarafından koordine edilir.",
      },
    ],
    keyPoints: [
      "Önce gemi ve personel emniyeti sağlanır; hasarlı istife kontrolsüz yaklaşılmaz.",
      "Tehlike mesajı ve kıyı/bayrak bildirimleri gecikmeden yapılır.",
      "VDR, ECDIS, log, bay plan ve lashing delilleri korunur.",
      "Olay raporu gözlem ile yorumu ayırır ve yetkisiz kusur kabulünden kaçınır.",
    ],
  },
  {
    id: "machine-fuel-alternative-fuel-safety",
    category: "machine-fuel-technology",
    moduleId: "machine-fuel-technology-deniz-yakit-turleri",
    title: "Alternatif Yakıtların Operasyonel Emniyeti",
    sourceTitle: "Alternatif Yakıtların Operasyonel Emniyeti",
    level: "advanced",
    introduction:
      "LNG, metanol, amonyak, hidrojen ve diğer düşük parlama noktalı yakıtlar; toksisite, kriyojenik sıcaklık, görünmez alev, hızlı yayılma, basınç ve farklı havalandırma gereksinimleri nedeniyle konvansiyonel yakıttan farklı kontrol bariyerleri ister. Operasyon yalnız geminin onaylı yakıt sistemi, üretici talimatı, risk değerlendirmesi ve yetkin personelle yürütülür.",
    sections: [
      {
        title: "Yakıt Tehlikelerinin Ayrıştırılması",
        content:
          "LNG kriyojenik yanık ve gaz bulutu, metanol düşük görünürlüklü alev ve toksisite, amonyak yüksek toksisite ve korozif maruziyet, hidrojen ise çok düşük tutuşturma enerjisi ve geniş yanıcılık aralığı riski taşır. Her yakıt için uygun gaz dedektörü, alarm set değeri, PPE, kaçış ve ilk yardım düzeni farklıdır; tek bir genel gaz prosedürü yeterli değildir.",
      },
      {
        title: "Yakıt Hazırlama ve Gaz Güvenli Durum",
        content:
          "Fuel supply system, double-wall piping, ventilation, gas detection, ESD, purge ve inertleme sırası onaylı prosedüre göre doğrulanır. Hat açılmadan önce yanlış vana dizilimi, körleme, drenaj, sızıntı testi ve interlock durumu kontrol edilir. Bakım öncesi yakıt izolasyonu, basınç düşürme, purge ve gas-free doğrulaması kayıt altına alınır.",
      },
      {
        title: "Bunkering ve Acil Durdurma",
        content:
          "Ship-shore checklist, haberleşme, transfer hızı, tank basıncı/sıcaklığı, drip tray, scupper, yangın hazırlığı ve exclusion zone transfer öncesi teyit edilir. ESD bağlantısı ve manuel durdurma yetkisi iki tarafta anlaşılır. Sızıntı, gaz alarmı, haberleşme kaybı, beklenmeyen basınç artışı veya hortum hareketinde transfer durdurulur ve alan güvenli hale getirilir.",
      },
      {
        title: "Maruziyet ve Yangın Müdahalesi",
        content:
          "Personel rüzgâr üstüne çekilir, uygun gaz ölçümü ve solunum koruması olmadan alana girilmez. Amonyak veya metanol maruziyetinde ürün SDS'i ve gemi tıbbi prosedürü izlenir. Gaz yangınında yakıt kaynağı kesilmeden alevin söndürülmesi yanmamış gaz bulutu oluşturabilir; müdahale geminin özel yangın planı ve komuta zinciriyle yürütülür.",
      },
    ],
    keyPoints: [
      "Her alternatif yakıtın toksisite, yanıcılık ve sıcaklık tehlikesi ayrıdır.",
      "Gaz algılama, havalandırma, ESD, purge ve inertleme temel bariyerlerdir.",
      "Bunkering, gemi-kara checklist ve ortak durdurma kriterleriyle yürütülür.",
      "Müdahale yalnız yakıta özgü plan ve yetkin personelle yapılır.",
    ],
  },
  {
    id: "machine-electrical-high-voltage-safety",
    category: "machine-electrical",
    moduleId: "machine-electrical-elektrik-dagitim-sistemi",
    title: "Yüksek Gerilim İzolasyonu ve Ark Parlaması Emniyeti",
    sourceTitle: "Yüksek Gerilim İzolasyonu ve Ark Parlaması Emniyeti",
    level: "advanced",
    introduction:
      "Yüksek gerilim sisteminde yanlış manevra; elektrik çarpması, ark parlaması, yangın, ağır yanık ve tam blackout ile sonuçlanabilir. İş yalnız yetkilendirilmiş personel, onaylı switching programı, elektriksel iş izni ve doğrulanmış izolasyonla yapılır.",
    sections: [
      {
        title: "Yetkilendirme ve Switching Programı",
        content:
          "Tek hat şeması, besleme kaynakları, bus-tie konumu, geri besleme ihtimali ve kritik tüketiciler belirlenir. Manevra sırası yazılı hazırlanır; yapan ve kontrol eden kişi ayrılır. Köprüüstü ve ilgili departmanlara güç kesintisi etkisi bildirilir. Sözlü hafızaya dayanarak yüksek gerilim manevrası yapılmaz.",
      },
      {
        title: "İzolasyon, LOTO ve Gerilimsizlik Doğrulaması",
        content:
          "Devre kesici açılır, rack-out/ayırma uygulanır, tüm olası enerji kaynakları kilitlenip etiketlenir. Uygun ve test edilmiş gerilim dedektörüyle önce cihazın çalıştığı bilinen kaynakta test, sonra devrede gerilimsizlik kontrolü, ardından tekrar bilinen kaynakta test yapılır. Gerekli yerlerde topraklama uygulanır ve çalışma sınırı fiziksel olarak belirlenir.",
      },
      {
        title: "Ark Parlaması ve PPE",
        content:
          "Ark parlaması; kısa devre akımının havadan atlamasıyla yoğun ısı, basınç dalgası ve erimiş metal üretir. Kapak açık çalışma yalnız zorunlu ve onaylıysa yapılır. Risk değerlendirmesine uygun ark dayanımlı giysi, yüz siperi, izole eldiven, izole paspas ve uygun alet kullanılır; stand-off mesafesi korunur.",
      },
      {
        title: "Enerjilendirme ve İşin Kapatılması",
        content:
          "Alet, geçici topraklama, personel ve yabancı cisim kontrol edilir; koruma röleleri ve interlocklar doğrulanır. LOTO yalnız takan kişi veya şirket prosedüründeki kontrollü süreçle kaldırılır. Enerjilendirme sonrası gerilim, akım, izolasyon alarmı, faz sırası ve bağlı ekipman davranışı izlenir; iş izni kapatılır.",
      },
    ],
    keyPoints: [
      "Yüksek gerilim işi yazılı switching programı ve yetkilendirme gerektirir.",
      "Gerilimsizlik, uygun cihazla test–ölç–test yöntemiyle doğrulanır.",
      "Ark parlaması için sınır, PPE ve kapalı pano çalışma prensibi uygulanır.",
      "Enerjilendirme öncesi personel, alet, topraklama ve koruma kontrolleri tamamlanır.",
    ],
  },
  {
    id: "machine-electrical-battery-thermal-runaway",
    category: "machine-electrical",
    moduleId: "machine-electrical-aydinlatma-ve-aku-sistemleri",
    title: "Batarya Enerji Depolama ve Termal Kaçak",
    sourceTitle: "Batarya Enerji Depolama ve Termal Kaçak",
    level: "advanced",
    introduction:
      "Lityum-iyon batarya sistemleri yüksek enerji yoğunluğu ve hızlı güç desteği sağlar; ancak hücre hasarı, aşırı şarj, iç kısa devre veya yetersiz soğutma termal kaçak ve toksik/yanıcı gaz oluşumuna yol açabilir. Batarya odası veya konteyneri bağımsız izleme ve acil durum mantığıyla işletilir.",
    sections: [
      {
        title: "BMS ve Normal Operasyon",
        content:
          "Battery Management System hücre gerilimi, sıcaklık, state of charge, izolasyon ve dengesizliği izler. Alarm limitleri üretici değerlerine göre korunur; alarm bypass edilmez. Soğutma, havalandırma, yangın algılama, gaz algılama ve acil durdurma fonksiyonları vardiya kontrollerine dahil edilir.",
      },
      {
        title: "Termal Kaçak Belirtileri",
        content:
          "Hızlı sıcaklık artışı, hücreler arası sıcaklık farkı, şişme, koku, sis/duman, tıslama, izolasyon alarmı ve beklenmeyen gerilim değişimi erken işaretlerdir. Kapı kontrolsüz açılmaz; oksijen girişi ve personel maruziyeti riski değerlendirilir. Sistem uzaktan izlenir ve komuta zinciri derhal bilgilendirilir.",
      },
      {
        title: "İzolasyon ve Yangın Müdahalesi",
        content:
          "Etkilenen string/rack üretici prosedürüne göre elektriksel olarak izole edilir; fakat bataryanın iç enerjisinin devam ettiği kabul edilir. Sabit söndürme ve soğutma stratejisi geminin onaylı yangın planına göre uygulanır. Yeniden tutuşma riski nedeniyle sıcaklık ve gazlar uzun süre izlenir; alana yalnız uygun PPE ve gaz ölçümüyle girilir.",
      },
      {
        title: "Hasarlı Batarya ve Olay Sonrası",
        content:
          "Hasarlı modül elle taşınmaz veya rastgele suya bırakılmaz. Üretici, şirket ve klas talimatı alınır; karantina, soğutma ve limanda teslim planı hazırlanır. BMS trendleri, alarm geçmişi, yük profili, soğutma durumu ve müdahale zaman çizelgesi korunur.",
      },
    ],
    keyPoints: [
      "BMS, soğutma, havalandırma ve gaz algılama birlikte izlenir.",
      "Termal kaçak erken belirtileri görüldüğünde alan kontrolsüz açılmaz.",
      "Elektrik izolasyonu bataryanın iç enerjisini ortadan kaldırmaz.",
      "Yeniden tutuşma riski nedeniyle uzun süreli izleme ve üretici koordinasyonu gerekir.",
    ],
  },
  {
    id: "machine-automation-ot-cybersecurity",
    category: "machine-automation",
    moduleId: "machine-automation-plc-ve-otomasyon-sistemleri",
    title: "Makine Otomasyonu ve OT Siber Güvenliği",
    sourceTitle: "Makine Otomasyonu ve OT Siber Güvenliği",
    level: "advanced",
    introduction:
      "PLC, IAS, alarm sistemi, güç yönetimi, uzaktan servis bağlantısı ve sensör ağları fiziksel makineyi yöneten operasyonel teknoloji sistemleridir. Siber olay yanlış alarm, kontrol kaybı, koruma fonksiyonunun bozulması veya blackout gibi fiziksel sonuca dönüşebilir.",
    sections: [
      {
        title: "IT ve OT Ayrımı",
        content:
          "Ofis ağı ile makine kontrol ağı aynı risk ve güncelleme yaklaşımıyla yönetilmez. OT sisteminde emniyet, süreklilik ve deterministik çalışma önceliklidir. Ağ segmentasyonu, firewall kuralları, yalnız gerekli protokol/portlar ve kontrollü veri geçişi uygulanır. Ortak, varsayılan veya üretici tarafından bırakılmış parolalar değiştirilir.",
      },
      {
        title: "Servis Laptopu, USB ve Uzaktan Erişim",
        content:
          "Taşınabilir medya yalnız onaylı cihazda taranır ve iş emriyle kullanılır. Servis laptopunun kimliği, yazılım sürümü ve bağlandığı port kaydedilir. Uzaktan erişim süreli, şirket onaylı ve gözetimli açılır; iş bitince kapatılır. Üretici hesabı veya modem sürekli açık bırakılmaz.",
      },
      {
        title: "Anomali Tanıma ve Güvenli Yedek İşletme",
        content:
          "Birbiriyle uyumsuz sensörler, toplu alarm kaybı, beklenmeyen set değeri değişimi, PLC yeniden başlama, saat kayması veya yetkisiz kullanıcı kaydı siber/teknik anomali göstergesi olabilir. Personel rastgele reset atmaz; fiziksel göstergelerle doğrular, güvenli manuel/yedek kontrole geçer ve etkilenen bağlantıyı prosedüre göre izole eder.",
      },
      {
        title: "Delil Koruma ve Geri Yükleme",
        content:
          "Alarm/event logları, kullanıcı kayıtları, ekran görüntüleri, ağ ve PLC saatleri korunur. Yazılım veya firmware geri yüklemesi yalnız doğrulanmış yedek, değişiklik kaydı ve geri dönüş planıyla yapılır. Operasyon ortasında kontrolsüz patch uygulanmaz; fonksiyon testi ve alarm/interlock doğrulaması tamamlanır.",
      },
    ],
    keyPoints: [
      "OT olayı fiziksel makine ve güç emniyetini etkileyebilir.",
      "USB, servis laptopu ve uzaktan erişim yetkili ve kayıtlı olmalıdır.",
      "Anomalide fiziksel değerlerle doğrulama ve güvenli yedek işletme uygulanır.",
      "Loglar korunur; geri yükleme doğrulanmış yedek ve test planıyla yapılır.",
    ],
  },
  {
    id: "machine-erm-psychological-safety",
    category: "machine-erm",
    moduleId: "machine-erm-liderlik-ve-iletisim",
    title: "Psikolojik Güvenlik, Şiddet ve Tacize Müdahale",
    sourceTitle: "Psikolojik Güvenlik, Şiddet ve Tacize Müdahale",
    level: "operational",
    introduction:
      "Makine dairesinde rütbe baskısı, zorbalık, taciz ve misilleme; personelin alarmı, hatayı veya emniyetsiz durumu söylemesini engeller. ERM, yalnız teknik kaynak paylaşımı değil, herkesin emniyet kaygısını açıkça ifade edebildiği profesyonel çalışma ortamıdır.",
    sections: [
      {
        title: "Otorite Gradyanı ve Konuşma Hakkı",
        content:
          "Alt rütbedeki personel gözlediği tehlikeyi durdurabilmeli ve üst zabit sorgulamayı saygısızlık olarak görmemelidir. Challenge-and-response, two-challenge rule ve stop-work authority şirket prosedürüne göre uygulanır. Kritik uyarı belirsiz imayla değil; durum, risk ve önerilen eylemle ifade edilir.",
      },
      {
        title: "Şiddet, Taciz ve Zorbalık Durumunda Müdahale",
        content:
          "Yakın tehlikede kişi güvenli alana alınır ve nöbetçi mühendis/başmühendis/kaptan bilgilendirilir. Tanık güvenliyse davranışı durdurabilir, destek çağırabilir ve olgusal kayıt tutabilir. Şikâyet eden kişiyle zorla yüzleştirme yapılmaz; gizlilik ve şirket bildirim kanalları korunur.",
      },
      {
        title: "Misillemesiz Raporlama ve Takım Performansı",
        content:
          "Hata, near-miss veya davranış bildirimi yapan personele görev, vardiya veya değerlendirme yoluyla misilleme yapılmamalıdır. Debrief kişiyi suçlamak yerine bariyerlerin neden çalışmadığını inceler. Teknik kararlar rütbeden bağımsız kanıt, trend ve risk üzerinden değerlendirilir.",
      },
      {
        title: "Liderin Sorumluluğu",
        content:
          "Başmühendis ve vardiya mühendisleri profesyonel dil, dengeli iş yükü, dinlenme hakkı ve adil görev dağılımını gözetir. Bildirilen olaylar küçümsenmez; geçici koruyucu tedbir, şirket desteği, tıbbi/psikolojik yardım ve tarafsız inceleme koordine edilir.",
      },
    ],
    keyPoints: [
      "Psikolojik güvenlik, teknik hataların erken bildirilmesini sağlar.",
      "Otorite gradyanı emniyet uyarısını susturmamalıdır.",
      "Şiddet ve taciz bildirimi gizli, olgusal ve misillemesiz yürütülür.",
      "Liderlik; adil iş yükü, profesyonel dil ve güvenli raporlama ortamı gerektirir.",
    ],
  },
  {
    id: "machine-maintenance-drydock-survey",
    category: "machine-maintenance",
    moduleId: "machine-maintenance-planli-bakim-sistemi-pms",
    title: "Havuzlama ve Teknik Survey Hazırlığı",
    sourceTitle: "Havuzlama ve Teknik Survey Hazırlığı",
    level: "advanced",
    introduction:
      "Dry-dock hazırlığı; yalnız bakım listesi oluşturmak değil, izolasyon sınırlarını, klas kapsamını, yedek parça ve ölçüm planını, taşeron emniyetini ve yeniden devreye alma testlerini önceden yönetmektir. Eksik hazırlık havuz süresini, maliyeti ve yeniden hizmete dönüş riskini büyütür.",
    sections: [
      {
        title: "İş Kapsamı ve Survey Planı",
        content:
          "PMS overdue işleri, klas recommendations/conditions, statutory survey maddeleri, arıza trendleri, yağ ve titreşim analizleri birlikte gözden geçirilir. Sea chest, overboard valve, stern tube, propeller, rudder, shaft seal, tanklar ve kritik makineler için ölçüm, muayene ve kabul kriterleri belirlenir. İş paketi sorumlu kişi, malzeme, süre ve test gereksinimiyle hazırlanır.",
      },
      {
        title: "İzolasyon ve Havuz Emniyeti",
        content:
          "Sea inlet/outlet, tank, yakıt, hava, elektrik ve hidrolik enerji izolasyonları LOTO planına işlenir. Docking plan, tank durumu, draft/trim ve stabilite bilgileri tersane ile paylaşılır. Kapalı mahal, sıcak çalışma, kaldırma ve borda dışı işler için permit ve ortak acil durum düzeni kurulur.",
      },
      {
        title: "Ölçüm, Muayene ve Değişiklik Kontrolü",
        content:
          "Krank deflection, shaft wear-down, bearing clearance, rudder clearance, propeller hasarı, NDT ve kalınlık ölçümleri kalibre cihaz ve izlenebilir formla kaydedilir. Plan dışı bulgu için teknik değerlendirme, klas/şirket onayı, maliyet ve süre etkisi alınmadan kalıcı değişiklik yapılmaz. As-built çizim ve yedek parça bilgileri güncellenir.",
      },
      {
        title: "Yeniden Devreye Alma ve Deniz Tecrübesi",
        content:
          "Kör, geçici bağlantı, alet ve personel kontrolü tamamlanır; vanalar sistem şemasına göre dizilir. Basınç/sızıntı testleri, alarm/interlock, emergency trip, steering gear, jeneratör yük paylaşımı ve ana makine fonksiyonları kademeli doğrulanır. Sea trial sırasında sıcaklık, basınç, titreşim, yatak durumu ve yakıt tüketim trendi kaydedilir; açık maddeler handover listesine alınır.",
      },
    ],
    keyPoints: [
      "Dry-dock iş paketi PMS, klas, trend ve arıza geçmişini birlikte kullanır.",
      "Tüm enerji ve deniz bağlantıları yazılı izolasyon planına bağlanır.",
      "Ölçümler izlenebilir kayıtla ve kabul kriteriyle değerlendirilir.",
      "Hizmete dönüş kademeli test, sea trial ve açık madde takibi gerektirir.",
    ],
  },
];

export const getCurriculumSupplementTopics = (category?: string) =>
  category
    ? curriculumSupplementTopics.filter((topic) => topic.category === category)
    : curriculumSupplementTopics;

export const getCurriculumSupplementTopic = (category?: string, titleOrId?: string) => {
  if (!category || !titleOrId) return undefined;
  return curriculumSupplementTopics.find(
    (topic) =>
      topic.category === category &&
      (topic.id === titleOrId || topic.title === titleOrId || topic.sourceTitle === titleOrId),
  );
};

export const getCurriculumSupplementTopicById = (topicId?: string) =>
  topicId ? curriculumSupplementTopics.find((topic) => topic.id === topicId) : undefined;
