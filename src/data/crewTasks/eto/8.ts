import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Soğutma ve iklimlendirme sistemleri (HVAC/reefer) bakımı",
  roleSlug: "eto",
  taskIndex: 8,
  estimatedPages: 25,
  intro: `Gemideki soğutma ve iklimlendirme sistemleri; gıda muhafazası (provision plant), mahal konforu (HVAC), makine dairesi havalandırması ve reefer kargo soğutması için kritiktir. Elektro-Teknik Zabit (ETO); soğutma kompresörleri, kondenser, evaporatör ve kontrol panellerinin elektriksel bakımından, termostat/solenoid valf ve defrost devrelerinden, alarm sistemlerinden ve reefer konteyner monitöründen sorumludur. Bu bölüm, Montreal Protokolü ve F-gaz mevzuatı çerçevesinde HVAC/reefer sistemlerinin güvenli, verimli ve uyumlu işletimini somut prosedürlerle anlatır.`,
  sources: [
    "STCW Code A-III/6 — Electro-technical officer competence table",
    "Montreal Protokolü — ozon tabakasını incelten maddelerin kontrolü",
    "F-gaz Regülasyonu (EU 517/2014) — florlu sera gazları ve kaçak kontrolü",
    "Kigali Değişikliği — HFC azaltım takvimi",
    "IEC 60092-301 — Electrical Installations in Ships (motor & control)",
    "IACS UR ve sınıf kuralları (refrigeration & HVAC sistemleri)",
    "SOLAS / FSS Code — havalandırma ve yangın damper bağlamı",
    "Üretici (OEM) reefer/HVAC bakım el kitapları",
  ],
  chapters: [
    {
      heading: "1. Gemi Soğutma Sistemleri ve ETO'nun Rolü",
      lead: `Soğutma çevrimi mekanik bir sistem olsa da, kontrolü ve güvenilirliği büyük ölçüde elektriksel/elektronik bileşenlere dayanır. ETO bu bileşenlerin sağlığından ve sistemin yasal uyumundan sorumludur.`,
      sections: [
        {
          subheading: "1.1 Soğutma çevrimi ve ana bileşenler",
          paragraphs: [
            `Mekanik soğutma çevrimi dört temel bileşene dayanır: kompresör (gazı sıkıştırır), kondenser (ısıyı dışarı atar, gazı sıvılaştırır), genleşme valfi (basıncı düşürür) ve evaporatör (ısıyı emer, soğutmayı sağlar). ETO, bu çevrimin elektriksel kontrolünü (kompresör motoru, fan motorları, valf solenoidleri, sensörler) ve emniyetini yönetir.`,
            `Gemide tipik soğutma uygulamaları: provision plant (kumanya soğuk hava depoları), mahal klimaları (accommodation HVAC), makine dairesi/kontrol odası havalandırması ve reefer gemilerde kargo soğutması. ETO, her sistemin set sıcaklıklarını, alarm sınırlarını ve kontrol mantığını bilmelidir.`,
          ],
          bullets: [
            `Kompresör: gaz sıkıştırma, elektrik motoru tahrikli`,
            `Kondenser: deniz suyu/hava soğutmalı, ısı atımı`,
            `Genleşme valfi (TEV/elektronik): basınç düşürme`,
            `Evaporatör: soğutma yükü, fan ve defrost devreli`,
            `Kontrol paneli: termostat, solenoid, alarm, koruma`,
          ],
        },
        {
          subheading: "1.2 Mevzuat çerçevesi — refrigerant kontrolü",
          paragraphs: [
            `Soğutucu akışkanlar (refrigerant) çevre düzenlemelerine tabidir. Montreal Protokolü CFC/HCFC gibi ozon delici maddeleri aşamalı yasaklamış, F-gaz regülasyonu ve Kigali değişikliği yüksek küresel ısınma potansiyelli HFC'leri azaltmaktadır. ETO, gemideki refrigerant tiplerini, kaçak kayıtlarını ve dolum işlemlerinin lisanslı kişilerce yapıldığını yasal zorunluluk olarak takip eder.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Montreal Protokolü & F-gaz",
              text: `Refrigerant kaçaklarının kayıt altına alınması ve dolum/onarım işlemlerinin lisanslı (sertifikalı) teknisyenlerce yapılması yasal zorunluluktur. Refrigerant atmosfere kasıtlı salınamaz; geri kazanım (recovery) ekipmanı kullanılmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Kompresör Elektriksel Bakımı",
      sections: [
        {
          subheading: "2.1 Kompresör motoru ve elektrik parametreleri",
          paragraphs: [
            `Soğutma kompresörü motoru, sistemin en yüksek elektrik yüküdür. ETO, motor akımını (üç faz dengesi), gerilimini ve çalışma sıcaklığını izler; dengesiz akım faz sorunu veya mekanik problemi işaret eder. Hermetik/yarı-hermetik kompresörlerde motor soğutması refrigerant gazıyla yapıldığından düşük şarj motoru aşırı ısıtabilir.`,
            `ETO, kompresör motorunun yalıtım direncini (megger) periyodik ölçer; hermetik kompresörlerde refrigerant ile temas eden sargı yalıtımının bozulması asit oluşumu ve sistem kontaminasyonuna yol açar. Motor koruma röleleri (overload, faz kaybı, motor sıcaklık termistörü) doğru ayarlanır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Akım dengesi sürekli izlenmeli",
              text: `Kompresör motorunda fazlar arası akım dengesizliği %10'u aşarsa derhal araştırılmalıdır; neden gevşek terminal, kontaktör arızası veya besleme dengesizliği olabilir. Dengesizlik, ölçülmeyen bir motor yanmasının habercisidir.`,
            },
          ],
        },
        {
          subheading: "2.2 Basınç emniyet ve kontrol presostatları",
          paragraphs: [
            `Kompresör, yüksek basınç (HP) ve düşük basınç (LP) presostatları ile korunur. HP cut-out, kondenser tıkanması veya yetersiz soğutma suyu nedeniyle aşırı basınçta kompresörü durdurur; LP cut-out, düşük şarj veya tıkalı filtrede çalıştırmayı engeller. ETO, bu presostatların setpoint'lerini ve doğru tripped davranışını periyodik test eder.`,
            `Yağ basınç emniyet presostatı (oil pressure differential), kompresör yağlamasının yeterliliğini izler; yetersiz yağ basıncında kompresörü durdurur. ETO bu emniyetin gecikme süresini ve trip değerini kontrol eder; devre dışı bir yağ emniyeti kompresörün sıkışmasına yol açabilir.`,
          ],
          table: {
            caption: `Kompresör Emniyet Cihazları — Tipik Fonksiyonlar`,
            headers: ["Cihaz", "Koruma", "Aksiyon"],
            rows: [
              ["HP cut-out", "Aşırı basma basıncı", "Kompresör stop (manuel reset)"],
              ["LP cut-out", "Düşük emme basıncı", "Kompresör stop / pump-down"],
              ["Oil pressure", "Yetersiz yağlama", "Stop + gecikme rölesi"],
              ["Motor overload", "Aşırı akım", "Stop (manuel reset)"],
              ["Motor termistör (PTC)", "Sargı aşırı sıcaklığı", "Stop"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Kondenser ve Evaporatör Bakımı",
      sections: [
        {
          subheading: "3.1 Kondenser — fan ve soğutma suyu kontrolü",
          paragraphs: [
            `Kondenser, deniz suyu (shell&tube) veya hava (fan) ile soğutulur. ETO, hava soğutmalı kondenser fan motorlarının çalışmasını, deniz suyu soğutmalı sistemde ise soğutma suyu sirkülasyon pompasının ve akış izlemenin sağlığını kontrol eder. Yetersiz soğutma, yüksek basma basıncına ve HP trip'lere yol açar.`,
          ],
        },
        {
          subheading: "3.2 Evaporatör fanı ve defrost sistemi",
          paragraphs: [
            `Evaporatör yüzeyinde nem yoğuşur ve düşük sıcaklıkta karlanma (frost) oluşur; bu, ısı transferini düşürür. ETO, defrost sisteminin (elektrikli ısıtıcı, sıcak gaz veya off-cycle) doğru çalıştığını, defrost zamanlayıcısı/termostatının ayarlı olduğunu ve defrost ısıtıcı devrelerinin yalıtımını kontrol eder. Arızalı defrost, evaporatörü buz bloğuna dönüştürür ve soğutmayı durdurur.`,
            `ETO, evaporatör fan motorlarının çalışmasını ve defrost termination termostatının doğru sonlandırdığını doğrular. Uzun veya eksik defrost; aşırı buzlanma, su taşması veya gereksiz enerji tüketimi yaratır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Arızalı defrost termostatı",
              text: `Bir provision deposunda evaporatör tamamen buzla kaplandı ve sıcaklık alarmı verdi. İnceleme, defrost termination termostatının arızalı olduğunu ve defrost ısıtıcının yeterince çalışmadığını gösterdi. Ders: defrost devreleri ve termostatları periyodik test edilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Kontrol Panelleri, Termostat ve Solenoid Valfler",
      sections: [
        {
          subheading: "4.1 Sıcaklık kontrolü ve termostat bakımı",
          paragraphs: [
            `Her soğutma mahalli, set sıcaklığını koruyan bir termostat (mekanik veya elektronik) ile kontrol edilir. ETO, termostat doğruluğunu kalibre bir referans termometre ile karşılaştırır; sapan termostat ya gereksiz soğutma (enerji israfı) ya da yetersiz soğutma (gıda bozulması) yaratır. Elektronik kontrolörlerde sensör (PT100/NTC) ve parametre ayarları kontrol edilir.`,
          ],
        },
        {
          subheading: "4.2 Solenoid valfler ve pump-down kontrolü",
          paragraphs: [
            `Solenoid valfler, refrigerant akışını elektriksel olarak açıp kapatır; liquid line solenoid, termostat memnun olunca kapanır ve sistem pump-down ile kompresörü güvenli durdurur. ETO, solenoid bobinlerinin sağlığını, valf açma/kapama sesini ve sızdırmazlığını kontrol eder. Yapışık (stuck) bir solenoid, kontrolün kaybına ve kompresör kısa devrimine (short cycling) yol açar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Short cycling'i izleyin",
              text: `Kompresörün sık sık start/stop yapması (short cycling); yapışık solenoid, yanlış presostat ayarı veya düşük şarj işaretidir. Aşırı start/stop hem motoru hem de kontaktörü yorar; kök neden derhal araştırılmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Refrigerant İzleme ve Kaçak Yönetimi",
      sections: [
        {
          subheading: "5.1 Basınç değerleri ve şarj durumu izleme",
          paragraphs: [
            `ETO, sistemin emme (suction) ve basma (discharge) basınçlarını izler; bunlar şarj durumu ve sistem sağlığı hakkında bilgi verir. Düşük emme basıncı düşük şarj veya tıkanma, yüksek basma basıncı kondenser sorunu işaret eder. Sight glass'ta kabarcık görünmesi düşük şarj veya nem (kurutucu doygunluğu) belirtisidir.`,
          ],
        },
        {
          subheading: "5.2 Kaçak tespiti ve yasal kayıt",
          paragraphs: [
            `Refrigerant kaçağı hem performans kaybı hem de çevre/yasal sorundur. ETO, elektronik kaçak dedektörü veya köpük testi ile kaçak noktalarını bulur ve kaçak/dolum kayıtlarını mevzuat gereği tutar. Dolum ve onarım, lisanslı teknisyen ve geri kazanım ekipmanıyla yapılır; refrigerant atmosfere salınmaz.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Kaçak kayıt zorunluluğu",
              text: `Belirli miktar üzeri refrigerant içeren sistemlerde periyodik kaçak kontrolü ve kaçak/ilave kayıtlarının tutulması yasal zorunluluktur. Bu kayıtlar denetimlerde talep edilir; refrigerant geri kazanımı ve lisanslı işlem esastır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Reefer Kargo Soğutma Sistemleri",
      sections: [
        {
          subheading: "6.1 Reefer konteyner monitörü ve besleme",
          paragraphs: [
            `Reefer (refrigerated) konteynerler, gemi şebekesinden (genellikle 440 V 60 Hz) reefer soketlerinden beslenir ve her birinin kendi soğutma ünitesi vardır. ETO, reefer soket panellerinin sağlığını, besleme güvenilirliğini ve her konteynerin set/gerçek sıcaklığının merkezi monitör sisteminden izlenmesini sağlar. Sıcaklık sapması alarmı, hassas kargoda derhal müdahale gerektirir.`,
            `ETO, reefer plug'lardaki bağlantı bütünlüğünü ve korozyonu kontrol eder; deniz ortamında gevşek/korozyonlu soket arıza ve ısınma yaratır. Reefer yükünün toplam elektrik talebi PMS güç dengesine dahil edilir; çok sayıda reefer, generator yükünü önemli ölçüde artırır.`,
          ],
          table: {
            caption: `Reefer İzleme — Tipik Parametreler`,
            headers: ["Parametre", "İzleme", "Alarm Durumu"],
            rows: [
              ["Set vs gerçek sıcaklık", "Sürekli (merkezi monitör)", "Sapma > eşik"],
              ["Besleme gerilimi", "Soket bazında", "Gerilim yok / dengesiz"],
              ["Defrost durumu", "Periyodik", "Uzun/başarısız defrost"],
              ["Toplam reefer yükü", "PMS güç dengesi", "Generator aşırı yük riski"],
            ],
          },
        },
        {
          subheading: "6.2 Arıza müdahalesi ve önceliklendirme",
          paragraphs: [
            `Bir reefer ünitesi arızalandığında ETO, alarm önceliğini değerlendirir (kargonun hassasiyeti), besleme/soket sorununu ekarte eder ve gerekirse ünite içi arızayı (kompresör, fan, kontrol) teşhis eder. Kritik kargoda yedek soket/konteynere transfer veya hızlı onarım gerekir; her olay kaydedilir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Alarm Devreleri ve Enerji Verimliliği",
      sections: [
        {
          subheading: "7.1 Sıcaklık ve sistem alarmları",
          paragraphs: [
            `Soğutma sistemleri, yüksek/düşük sıcaklık, basınç ve kompresör arıza alarmlarıyla donatılır; bu alarmlar köprü/kontrol odasına gönderilir. ETO, alarm devrelerinin ve sensörlerinin doğru çalıştığını, alarm setpoint'lerinin uygun olduğunu ve alarmın gerçekten ulaştığını (test ederek) doğrular. Susturulmuş veya köprülenmiş alarm, kargo/gıda kaybına yol açabilir.`,
          ],
        },
        {
          subheading: "7.2 HVAC enerji verimliliği",
          paragraphs: [
            `HVAC ve soğutma, gemi elektrik yükünün önemli bir kısmıdır. ETO; kompresör ve fanları VFD ile yük takipli çalıştırarak, kondenseri temiz tutarak (kötü ısı transferi enerjiyi artırır) ve set sıcaklıkları gereksiz düşük tutmayarak enerji tüketimini optimize eder. Bu, MARPOL Annex VI EEXI/CII verimlilik hedeflerine katkı sağlar.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Temiz kondenser = düşük enerji",
              text: `Kirli/tıkalı bir kondenser, basma basıncını yükselterek kompresörün daha fazla güç çekmesine yol açar. Düzenli kondenser temizliği hem güvenilirlik hem de enerji verimliliği açısından önemli bir ETO bakım kalemidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 HVAC/reefer bakım kontrol listesi",
          bullets: [
            `Kompresör motor akım dengesi ve yalıtımı (megger) kontrol edildi mi?`,
            `HP/LP/oil pressure presostatları test edildi, setpoint'ler doğru mu?`,
            `Kondenser fan/soğutma suyu ve temizliği kontrol edildi mi?`,
            `Evaporatör fanı ve defrost sistemi/termostatı çalışıyor mu?`,
            `Termostatlar referansla karşılaştırıldı, sensörler doğru mu?`,
            `Solenoid valfler açıp kapatıyor, short cycling var mı?`,
            `Emme/basma basınçları ve şarj durumu normal mi, sight glass temiz mi?`,
            `Refrigerant kaçak kontrolü yapıldı, kayıtlar güncel mi?`,
            `Reefer soketleri, sıcaklık monitörü ve alarmları çalışıyor mu?`,
            `Sıcaklık/sistem alarmları köprüye ulaşıyor mu, köprüleme yok mu?`,
          ],
          paragraphs: [
            `Soğutma ve iklimlendirme bakımı, gıda güvenliğinden kargo değerine ve mürettebat konforuna kadar geniş bir etki alanına sahiptir. ETO'nun bu sistemlerdeki başarısı; kompresörün güvenilir çalışması, alarmların gerçekten korumacı olması, refrigerant kaçaklarının yasal disiplinle yönetilmesi ve enerjinin israf edilmemesiyle ölçülür. Görünmeyen ama sürekli çalışan bu çevrimler, ETO'nun titiz bakımı sayesinde gemiyi sessizce serin tutar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
