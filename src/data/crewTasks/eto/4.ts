import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Acil güç kaynakları ve UPS sistemleri",
  roleSlug: "eto",
  taskIndex: 4,
  estimatedPages: 25,
  intro: `Acil güç kaynakları, gemi normal elektrik üretimini kaybettiğinde (blackout) seyir, dümen, yangın söndürme ve haberleşme gibi yaşamsal sistemlerin kesintisiz beslenmesini garanti eder. Elektro-Teknik Zabit (ETO); emergency generator'ın otomatik start/stop güvenilirliğinden, emergency switchboard ve transitional batarya sistemlerinden, gemideki tüm UPS ünitelerinden ve GMDSS/navigation light/emergency lighting gibi zorunlu tüketicilerin acil beslemesinden sorumludur. Bu bölüm, SOLAS gereksinimleri çerçevesinde acil güç zincirinin test, bakım ve arıza yönetimini somut prosedürler ve değerlerle adım adım anlatır.`,
  sources: [
    "SOLAS Chapter II-1 Part D — Reg. 42, 43, 44 (Emergency source of electrical power)",
    "SOLAS Chapter IV — Radiocommunications (GMDSS reserve source of energy)",
    "STCW Code A-III/6 — Electro-technical officer competence table",
    "IEC 60092-201/202 — Electrical Installations in Ships (system design)",
    "IEC 62040 — Uninterruptible Power Systems (UPS) standardı",
    "IACS UR E / sınıf kuralları (DNV, LR, ABS Part 4 — emergency systems)",
    "LSA Code & FSS Code — acil aydınlatma ve yangın sistemleri beslemesi",
    "Reeds Marine Electrical Technology / Ship Electrical Systems — D. T. Hall",
  ],
  chapters: [
    {
      heading: "1. Acil Güç Mimarisi ve Yasal Çerçeve",
      lead: `Acil güç sistemi, ana güç sisteminden bağımsız, ayrı bir yangın bölgesinde konumlanan ve otomatik devreye giren bir güvenlik katmanıdır. ETO bu katmanın mevzuat gereksinimlerini ve fiziksel topolojisini eksiksiz bilmelidir.`,
      sections: [
        {
          subheading: "1.1 Emergency generator ve emergency switchboard yerleşimi",
          paragraphs: [
            `Emergency generator, en üst sürekli güverte üzerinde ve ana makine dairesinin yangın sınırları dışında, ayrı bir kompartımanda bulunur. Kendi yakıt tankı, soğutma ve start sistemiyle ana güçten tamamen bağımsızdır. Emergency switchboard, normal şartlarda bus-tie breaker üzerinden ana baradan beslenir; blackout anında bu bağlantı açılır ve emergency generator devreye girer.`,
            `ETO, single-line diagram üzerinden hangi tüketicilerin emergency switchboard'a bağlı olduğunu (seyir fenerleri, acil aydınlatma, GMDSS, fire pump, steering gear, watertight kapı kontrolleri, genel alarm) ve hangilerinin transitional batarya tarafından köprülendiğini bilmelidir. Bu harita, arıza anında doğru önceliklendirme için kritiktir.`,
          ],
          bullets: [
            `Emergency generator: ayrı kompartıman, bağımsız yakıt/soğutma/start`,
            `Emergency switchboard: bus-tie ile ana baraya bağlı, blackout'ta ayrılır`,
            `Transitional source (batarya/UPS): 45 sn geçiş boşluğunu köprüler`,
            `Zorunlu tüketiciler: seyir fenerleri, GMDSS, fire pump, steering, alarm`,
          ],
        },
        {
          subheading: "1.2 SOLAS besleme süreleri ve otomatik devreye girme",
          paragraphs: [
            `Emergency generator, ana güç kaybından sonra otomatik start etmeli ve emergency bara'yı en geç 45 saniye içinde beslemelidir. Bu geçiş süresince transitional acil güç kaynağı (akümülatör) zorunlu yükleri kesintisiz besler. Besleme süresi yolcu gemilerinde 36 saat, kargo gemilerinde 18 saattir.`,
            `ETO, emergency generator'ın start güvenilirliğini garanti etmekle yükümlüdür: start bataryalarının şarj durumu, start havası (varsa), yakıt seviyesi ve otomatik start panelinin sağlığı haftalık test ile doğrulanır. Otomatik start denemesi başarısız olursa manuel start ve elle bara enerjilendirme yedek olarak hazır tutulur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-1 Reg. 43-44",
              text: `Acil güç kaynağı, ana güç kaybından sonra otomatik devreye girmeli; geçiş süresi 45 saniyeyi aşmamalıdır. Yolcu gemilerinde 36 saat, kargo gemilerinde 18 saat zorunlu tüketiciler beslenmelidir. Transitional kaynak, geçiş boşluğunu kesintisiz köprülemekle yükümlüdür.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Emergency Generator Otomatik Start/Stop Testi",
      sections: [
        {
          subheading: "2.1 Haftalık ve aylık test prosedürü",
          paragraphs: [
            `ETO, emergency generator'ı her hafta test eder. Standart test makinenin start güvenilirliğini ve yükte çalışma kabiliyetini doğrular. Aylık (veya sınıf gereği daha sık) testte ise blackout simülasyonu yapılır: ana bara enerjisi kesilir (veya sense kablosu aç), generator'ın 45 saniye içinde otomatik start ettiği ve emergency bara'yı beslediği kronometre ile ölçülür.`,
            `Test sonuçları (start süresi, gerilim/frekans toparlanması, yük altında davranış) makine jurnaline ve PMS log'una kaydedilir. ETO, soğuk start kabiliyetini değerlendirmek için makineyi yağ ısıtıcısı (jacket heater) devrede ve devre dışı şartlarda da test eder; soğuk makinede start süresi uzayabilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yükte test ihmal edilmemeli",
              text: `Emergency generator'ı yalnızca rölantide çalıştırmak yeterli değildir. Düzenli aralıklarla gerçek/yapay yük altında test edilmeli ki underloading kaynaklı wet stacking (yanmamış yakıt birikimi) ve egzoz fouling önlensin. PSC kontrolünde yük testi kayıtları istenir.`,
            },
          ],
        },
        {
          subheading: "2.2 Start bataryası ve start sistemi bakımı",
          paragraphs: [
            `Emergency generator genellikle elektrik start (batarya) ve/veya basınçlı hava start ile donatılır; çift sistem güvenilirlik sağlar. ETO, start bataryalarının terminal voltajını, elektrolit seviyesini (vented tip), şarj durumunu ve şarj cihazının (battery charger) çıkışını düzenli kontrol eder. Zayıf start bataryası, blackout anında start başarısızlığının en sık nedenidir.`,
            `Start denemesi limiti (genellikle 3 ardışık deneme) ve denemeler arası bekleme süresi panelde ayarlıdır. ETO, bu setpoint'leri ve start havası basıncını (varsa) kontrol eder; basınçlı hava sisteminde drain ve nem kontrolü ihmal edilirse start valfleri sıkışabilir.`,
          ],
          table: {
            caption: `Emergency Generator Test ve Bakım Çizelgesi`,
            headers: ["Periyot", "İşlem", "Kabul Kriteri"],
            rows: [
              ["Haftalık", "Start + yükte çalışma testi", "Sorunsuz start, kararlı gerilim/frekans"],
              ["Aylık", "Blackout simülasyonu (auto start)", "≤45 sn içinde bara beslemesi"],
              ["Aylık", "Start bataryası voltaj/elektrolit", "Nominal voltaj, doğru elektrolit seviyesi"],
              ["Yıllık", "Tam yük dayanım testi", "Süreli tam yükte kararlı çalışma"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Emergency Switchboard Bakımı",
      sections: [
        {
          subheading: "3.1 Bus-tie breaker ve otomatik transfer mantığı",
          paragraphs: [
            `Emergency switchboard'un kalbi, ana baraya bağlanan bus-tie breaker ile emergency generator breaker arasındaki interlock mantığıdır. Blackout algılandığında bus-tie açılır, generator start eder ve generator breaker kapanır. ETO, bu transfer sekansını test ederek interlock'un her iki breaker'ın aynı anda kapalı kalmasını (geri besleme riski) engellediğini doğrular.`,
            `ETO, emergency switchboard içindeki koruma cihazlarını (MCCB'ler, sigortalar), busbar bağlantılarını ve gösterge enstrümanlarını periyodik kontrol eder. Termal kamera ile gevşek bağlantı taraması ve insulation ölçümü, panonun güvenilirliğini garanti altına alır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Geri besleme (back-feeding) tehlikesi",
              text: `Emergency generator çalışırken ana güç restore edilirse, interlock arızalı ise emergency bara üzerinden ana baraya geri besleme oluşabilir; bu senkronize olmayan paralel demektir ve ağır hasar verir. Transfer interlock'u her yıllık testte doğrulanmalıdır.`,
            },
          ],
        },
        {
          subheading: "3.2 Zorunlu tüketicilerin doğrulanması",
          paragraphs: [
            `ETO, emergency switchboard'a bağlı olması gereken her tüketicinin gerçekten oradan beslendiğini fiziksel olarak doğrular: seyir fenerleri, acil aydınlatma, GMDSS, emergency fire pump, steering gear (en az bir ünite), genel alarm, watertight kapı kontrolleri ve sintine alarmları. Bağlantı haritası, sınıf onaylı listeyle karşılaştırılır.`,
          ],
        },
      ],
    },
    {
      heading: "4. UPS Sistemleri — Topoloji ve Çalışma Modları",
      sections: [
        {
          subheading: "4.1 UPS tipleri ve gemideki uygulamalar",
          paragraphs: [
            `Gemide UPS'ler kritik tüketicilere kesintisiz, temiz güç sağlar: ECDIS, radar, GMDSS konsolu, otomasyon/IAS sunucuları, cargo control ve VDR. Online (double-conversion) UPS, yükü sürekli inverter üzerinden besler ve şebeke kesilince geçişsiz devam eder; line-interactive UPS ise küçük geçiş süreli daha basit uygulamalarda kullanılır.`,
            `ETO, her UPS'in beslediği yükü, batarya otonomi süresini (genellikle 30 dk veya sınıf gereği daha fazla) ve bypass kabiliyetini bilmelidir. Kritik seyir/haberleşme ekipmanları için sınıf, minimum otonomi süresi ve UPS sağlığının periyodik testini şart koşar.`,
          ],
          table: {
            caption: `UPS Tipleri ve Tipik Gemi Uygulamaları`,
            headers: ["UPS Tipi", "Geçiş Süresi", "Tipik Uygulama"],
            rows: [
              ["Online (double-conversion)", "Sıfır (kesintisiz)", "ECDIS, IAS, GMDSS, VDR"],
              ["Line-interactive", "2-4 ms", "Ofis IT, küçük konsollar"],
              ["Standby (offline)", "5-10 ms", "Kritik olmayan yardımcı yükler"],
            ],
          },
        },
        {
          subheading: "4.2 Bypass operasyonu — bakım için güvenli geçiş",
          paragraphs: [
            `UPS bakımı veya batarya değişimi için yük kesintiye uğramadan UPS'in static/manual bypass'a alınması gerekir. ETO, doğru sekansı uygular: önce yükü static bypass'a transfer eder, ardından maintenance (manual) bypass switch'i kapatır ve UPS'i izole eder. Yanlış sekans yükün anlık enerji kaybına yol açabilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Bypass sekansına dikkat",
              text: `Maintenance bypass'a geçmeden önce UPS çıkışı ile bypass kaynağının senkron olduğundan emin olun. Senkron olmayan transfer, hassas yüklerde resetlere ve güç darbesine yol açar. Üretici sekans talimatına BİREBİR uyulmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. UPS Batarya Condition Monitoring",
      sections: [
        {
          subheading: "5.1 Batarya sağlık testi ve kapasite ölçümü",
          paragraphs: [
            `UPS bataryaları (genellikle VRLA tip) zaman içinde kapasite kaybeder; ETO, periyodik discharge test ile gerçek otonomi süresini doğrular. Batarya bloklarının terminal voltajı, iç direnci (impedance test) ve sıcaklığı ölçülür; tek bir zayıf hücre tüm string'in performansını düşürür. İç direnç referans değerin %25-50 üzerine çıkan bloklar değiştirilir.`,
            `ETO, batarya değişim tarihini ve seri ömrünü (tipik VRLA için 4-7 yıl) takip eder. Aşırı sıcaklık (battery room/UPS dolabı) ömrü ciddi kısaltır: 25°C üzeri her 8-10°C ömrü yarıya indirir. Soğutma ve havalandırma bu nedenle kritiktir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "İç direnç trendi izleyin",
              text: `Tek seferlik impedance ölçümü yerine periyodik trend takibi yapın. İç dirençteki kademeli artış, kapasite çökmeden önce zayıf hücreyi erken haber verir. Bu, gerçek discharge testine göre yüke risk vermeyen erken uyarıdır.`,
            },
          ],
        },
        {
          subheading: "5.2 Inverter ve şarj devresi bakımı",
          paragraphs: [
            `UPS inverter'ı, DC bataryayı temiz AC'ye çevirir; ETO, inverter çıkış dalga formunu, çıkış gerilim/frekansını ve soğutma fanlarını kontrol eder. Tıkalı fan veya tozlu soğutma kanalları aşırı ısınma ve kapasitör ömrü kaybına yol açar. DC bus kapasitörleri ve filtre elemanları periyodik kontrol edilir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Emergency Lighting ve Navigation Light Panel",
      sections: [
        {
          subheading: "6.1 Acil aydınlatma sistemi",
          paragraphs: [
            `Acil aydınlatma, blackout anında kaçış yolları, makine dairesi, can sallarına iniş bölgeleri ve önemli alanları aydınlatır. Emergency switchboard'tan beslenen merkezi sistem ve/veya kendi self-contained bataryalı armatürler kullanılır. ETO, self-contained armatürlerin batarya sağlığını ve şebeke kesilince otomatik yanmalarını periyodik test eder.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "LSA/FSS Code — acil aydınlatma",
              text: `Kaçış yolları ve toplanma istasyonları, acil güç ile yeterli süre aydınlatılmalıdır. Self-contained acil aydınlatma armatürlerinin bataryaları, belirlenen otonomi süresini sağlamalı ve düzenli test edilmelidir.`,
            },
          ],
        },
        {
          subheading: "6.2 Navigation light panel ve GMDSS batarya sistemi",
          paragraphs: [
            `Navigation light panel (seyir feneri panosu), her fener için çift besleme (ana + emergency), açık/kapalı izleme ve fener arızası (lamp failure) alarmı sağlar. ETO, her fenerin iki bağımsız kaynaktan beslendiğini, yedek lambaların hazır olduğunu ve fener arıza alarmının çalıştığını doğrular.`,
            `GMDSS reserve source of energy (batarya), ana ve acil güç kaybında GMDSS ekipmanını SOLAS gereği en az 1 saat (emergency generator varsa) veya 6 saat (yoksa) beslemelidir. ETO, GMDSS bataryalarının spesifik gravitesini (vented tip), terminal voltajını ve şarj cihazının çıkışını günlük/haftalık kontrol eder ve yıllık discharge testini yapar.`,
          ],
          table: {
            caption: `Acil/Yedek Besleme Süreleri — Özet`,
            headers: ["Sistem", "Min. Besleme Süresi", "Referans"],
            rows: [
              ["Emergency generator (kargo)", "18 saat", "SOLAS II-1 Reg. 43"],
              ["Emergency generator (yolcu)", "36 saat", "SOLAS II-1 Reg. 42"],
              ["GMDSS reserve (em. gen var)", "1 saat", "SOLAS IV Reg. 13"],
              ["GMDSS reserve (em. gen yok)", "6 saat", "SOLAS IV Reg. 13"],
              ["Transitional batarya", "30 dk (tipik)", "SOLAS II-1"],
            ],
          },
        },
      ],
    },
    {
      heading: "7. Arıza Senaryoları ve Vaka Dersleri",
      sections: [
        {
          subheading: "7.1 Otomatik start başarısızlığı",
          paragraphs: [
            `Emergency generator'ın blackout anında start edememesi en kritik senaryodur. Nedenler: zayıf/boş start bataryası, yakıt eksikliği veya hava, soğuk makine, start panel arızası veya solenoid sıkışması. ETO, manuel start ve elle bara enerjilendirme prosedürünü bilmeli ve kök nedeni gidermelidir. Düzenli haftalık test bu riski büyük ölçüde azaltır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Boş start bataryası kaynaklı gecikme",
              text: `Bir gemide blackout sırasında emergency generator iki başarısız denemeden sonra 90 saniyede ancak start oldu. İnceleme, battery charger'ın haftalardır arızalı olduğunu ve start bataryasının kademeli boşaldığını gösterdi. Ders: battery charger çıkışı haftalık test rutinine dahil edilmelidir.`,
            },
          ],
        },
        {
          subheading: "7.2 UPS batarya çökmesi ve yanlış bypass",
          paragraphs: [
            `Yaşlanmış UPS bataryası, şebeke kesilince beklenen otonomiyi sağlayamaz ve kritik yük (ECDIS, IAS) anında düşer. Ayrıca yanlış bypass sekansı bakım sırasında yük kaybına yol açabilir. ETO, periyodik kapasite testi ve doğru bypass disiplini ile bu riskleri yönetir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Acil güç ve UPS kontrol listesi",
          bullets: [
            `Emergency generator haftalık start + yük testi yapıldı, kayıtlı mı?`,
            `Blackout simülasyonunda otomatik start ≤45 sn içinde gerçekleşti mi?`,
            `Start bataryası voltajı, elektrolit seviyesi ve charger çıkışı normal mi?`,
            `Bus-tie/emergency breaker transfer interlock'u doğrulandı mı?`,
            `Tüm zorunlu tüketiciler emergency switchboard'tan besleniyor mu?`,
            `UPS bataryaları kapasite/impedance testinden geçti mi?`,
            `UPS bypass sekansı denendi, inverter ve fanlar sağlıklı mı?`,
            `Acil aydınlatma armatürleri otomatik yanıyor, bataryalar dolu mu?`,
            `Navigation light panel çift besleme ve arıza alarmı çalışıyor mu?`,
            `GMDSS reserve batarya SG/voltaj ve discharge testi tamam mı?`,
          ],
          paragraphs: [
            `Acil güç sistemi, gemi en savunmasız anında devreye giren son güvenlik ağıdır; bu nedenle "test edildi ama hiç ihtiyaç duyulmadı" durumu başarının ölçüsüdür. ETO'nun disiplinli haftalık testi, batarya sağlığını trend olarak izlemesi ve transfer mantığını yıllık doğrulaması, kritik bir blackout anında bu ağın sessizce ve güvenilir biçimde gerilmesini sağlar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
