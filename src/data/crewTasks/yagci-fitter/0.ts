import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Makine vardiyası ve parametre kontrolü (Yağcı)",
  roleSlug: "yagci-fitter",
  taskIndex: 0,
  estimatedPages: 25,
  intro: `Yağcı (Oiler / Motorman), makine dairesinin "gözü, kulağı ve eli" olarak vardiya boyunca düzenli fiziksel turlar atar; sıcaklık, basınç, seviye, ses ve titreşim parametrelerini insan duyularıyla ve enstrümanlarla doğrular. Bu görev; ana makine, yardımcı dizel jeneratörler, kazan, separatörler, pompalar ve soğutma devrelerinin sağlığını anlık olarak izlemeyi, yağlama noktalarını kontrol etmeyi, sızıntı/anormalliği erken yakalamayı ve makine logbook'una doğru veri kaydetmeyi kapsar. Bu bölüm, Yağcı'nın bir UMS (Unmanned Machinery Space) veya manned makine dairesinde takip etmesi gereken tur metodolojisini, parametre limitlerini ve alarm tepkisini adım adım açıklar.`,
  sources: [
    "SOLAS Chapter II-1 — Machinery Installations",
    "STCW Code Section A-VIII/2 (Watchkeeping Arrangements and Principles)",
    "STCW Code Section A-III/4 (Ratings Forming Part of an Engineering Watch)",
    "ISM Code (International Safety Management Code)",
    "MARPOL Annex I — Oil Record Book ve makine dairesi kayıtları",
    "Class Society Rules (DNV, ABS, Lloyd's Register — UMS notation)",
    "MAN B&W / Wärtsilä Engine Operating Manuals",
    "ICS Engine-Room Procedures Guide",
    "MEPC Guidelines — Energy Efficiency (EEXI/CII) izleme",
  ],
  chapters: [
    {
      heading: "1. Makine Vardiyasının Temel İlkeleri",
      lead: `Vardiya, geminin kalbinin kesintisiz izlenmesidir. Yağcı bu izlemenin saha ayağıdır; nöbetçi mühendisin (Duty Engineer) kontrol odasındaki ekranda göremediği yağ damlasını, ısınan rulmanı veya gevşeyen cıvatayı bizzat fark eder.`,
      sections: [
        {
          subheading: "1.1 Vardiya devir-teslim (handover)",
          paragraphs: [
            `Her vardiya, bir önceki vardiyadan resmi devir-teslimle başlar. Yağcı, devralırken makinelerin durumunu, devam eden işleri, alarm geçmişini, beklenen manevra/operasyonları ve özellikle "dikkat edilmesi gereken noktaları" sözlü ve yazılı olarak alır. Devir-teslim, STCW A-VIII/2 gereği eksiksiz olmalı; şüpheli bir durumda devralan personel makineleri bizzat kontrol etmeden vardiyayı kabul etmez.`,
            `Devir-teslimde standby jeneratör durumu, devrede olan separatör, kazan basıncı, sintine ve sludge tank seviyeleri, devam eden bunker/transfer işlemleri ve PMS (Planlı Bakım Sistemi) kapsamında o vardiyada yapılacak işler netleştirilir. Yağcı, bu bilgileri kendi tur planına dahil eder.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "STCW A-VIII/2 — Devir-teslim",
              text: `Vardiyayı devralan personel, geminin ve makinelerin durumundan tatmin olmadan vardiyayı kabul edemez. Devreden personel, devralan kişi görevini etkin biçimde yerine getirebilecek durumda olduğundan emin olmadan görevi bırakamaz.`,
            },
          ],
        },
        {
          subheading: "1.2 UMS ve manned vardiya farkı",
          paragraphs: [
            `Modern gemilerin çoğu UMS (Unmanned Machinery Space) sertifikalıdır; gece makine dairesi insansız bırakılır, alarmlar köprüüstüne ve nöbetçi mühendisin kamarasına yönlendirilir. Ancak manevra, liman operasyonu, dar su yolu geçişi ve kritik bakım sırasında makine dairesi "manned" hale getirilir ve Yağcı sürekli sahada bulunur.`,
            `UMS modunda dahi günde en az bir kez (genelde sabah) detaylı tur (engine room round) yapılır. Dead Man Alarm (Engineer's Alarm) sistemi, makine dairesinde yalnız çalışan personelin belirli aralıklarla resetlemediği takdirde alarm verir; bu, baygınlık/kaza durumunda hayat kurtarır.`,
          ],
          bullets: [
            `UMS modu: gece insansız, alarm köprüüstüne yönlenir`,
            `Manned modu: manevra, liman, kritik bakım, kötü hava`,
            `Dead Man Alarm: yalnız çalışmada güvenlik ağı`,
            `Günlük detaylı tur her koşulda zorunlu`,
          ],
        },
      ],
    },
    {
      heading: "2. Makine Dairesi Turu (Engine Room Round) Metodolojisi",
      sections: [
        {
          subheading: "2.1 Sistematik tur güzergahı",
          paragraphs: [
            `Yağcı, turunu rastgele değil sabit bir güzergah üzerinden yapar; böylece hiçbir ekipman atlanmaz. Genel yaklaşım yukarıdan aşağıya ve baştan kıça doğru sistematiktir: önce üst platformlar (purifier room, hava kompresörleri, kazan), sonra orta platform (jeneratörler, ana makine üst kısmı), en sonda tank top seviyesi (ana makine alt kısmı, sintine, pompalar, şaft yatağı).`,
            `Her durakta beş duyu kullanılır: göz (sızıntı, seviye, renk), kulak (anormal ses, vuruntu), dokunma (yatak/gövde sıcaklığı — sırtın elle hissedilebilir sınırı ~60°C), koku (yanık yağ, elektrik, egzoz) ve titreşim hissi. Bu duyusal kontrol, hiçbir sensörün yakalayamayacağı erken belirtileri yakalar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Sabit güzergah disiplini",
              text: `Her zaman aynı sırayla tur atın. Beyin "alışkanlık haritası" oluşturur; bir cıvata gevşediğinde, bir flanş terlediğinde veya bir ses değiştiğinde fark normalden hemen göze çarpar. Rastgele turlar bu erken uyarı yeteneğini öldürür.`,
            },
          ],
        },
        {
          subheading: "2.2 Tur sırasında kayıt ve raporlama",
          paragraphs: [
            `Yağcı tur sırasında portatif sıcaklık ölçer (infrared thermometer), el feneri ve kayıt defteri/tablet taşır. Kritik noktalarda (egzoz sıcaklıkları, yatak sıcaklıkları, soğutma suyu out sıcaklığı) okunan değerler not edilir ve önceki turla karşılaştırılır. Trend, anlık değerden daha önemlidir; yavaş yavaş yükselen bir sıcaklık, henüz alarm eşiğine ulaşmadan arızanın habercisidir.`,
            `Herhangi bir anormallik (yeni sızıntı, ses değişimi, titreşim, gevşek bağlantı, dökülmüş yağ) derhal nöbetçi mühendise raporlanır. Yağcı kendi başına müdahale etmez; yetki sınırını bilir. Ancak acil bir tehlike (yangın başlangıcı, yüksek basınçlı buhar/yağ fışkırması) görürse önce güvenliği sağlar ve alarmı verir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Sıcaklık Parametrelerinin İzlenmesi",
      sections: [
        {
          subheading: "3.1 Ana makine ve yardımcı makine sıcaklıkları",
          paragraphs: [
            `Ana makinede her silindir için egzoz gazı sıcaklığı kritik bir göstergedir. Silindirler arası sıcaklık dengesizliği (deviation), yakıt enjektör arızasını, yanma sorununu veya egzoz valfi kaçağını işaret eder. Yatak sıcaklıkları (main bearing, crankpin, crosshead), soğutma suyu giriş/çıkış sıcaklıkları ve yağlama yağı sıcaklığı her turda izlenir.`,
            `Yardımcı dizel jeneratörlerde yük dağılımına bağlı olarak egzoz sıcaklıkları, ceket suyu (jacket water) ve yağ sıcaklığı takip edilir. Aşırı yüklenen veya soğutması yetersiz bir jeneratör, harbour/sea değişimlerinde devre dışı kalabilir; bu da blackout riskidir.`,
          ],
          table: {
            caption: `Tipik Makine Dairesi Sıcaklık Aralıkları (Kılavuz Değerler)`,
            headers: ["Parametre", "Normal Aralık", "Yüksek Alarm", "Aksiyon"],
            rows: [
              ["ME egzoz (silindir)", "320 - 420 °C", ">450 °C", "Mühendise bildir, dengesizliği kontrol et"],
              ["ME yatak (main bearing)", "45 - 65 °C", ">75 °C", "Acil bildir, hız düşürme olası"],
              ["Jacket cooling water out", "75 - 85 °C", ">90 °C", "Soğutma debisi/termostat kontrolü"],
              ["LO sump / inlet", "40 - 50 °C", ">60 °C", "Cooler ve viskozite kontrolü"],
              ["Egzoz turbo giriş", "400 - 500 °C", "Üretici limiti", "Turbo performans kontrolü"],
            ],
          },
        },
        {
          subheading: "3.2 Yardımcı sistemler ve soğutma devreleri",
          paragraphs: [
            `Merkezi soğutma sistemi (central cooling) ile çalışan gemilerde sea water cooling (düşük sıcaklık devresi) ve fresh water cooling (yüksek/düşük sıcaklık devreleri) ayrı izlenir. Plate cooler giriş-çıkış sıcaklık farkı, ısı transfer verimini gösterir; fark düşüyorsa cooler tıkanıyor veya kirleniyor demektir.`,
            `Tropik sularda deniz suyu sıcaklığı 32°C'yi aştığında soğutma marjı daralır; bu koşullarda Yağcı soğutma çıkış sıcaklıklarını daha sık kontrol eder. Sea chest filtre tıkanması (özellikle deniz canlısı/yosun yoğun bölgelerde) ani sıcaklık artışına yol açar ve high-low sea chest geçişi gerektirir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Sıcak yüzey teması",
              text: `Egzoz manifoldu, türbin gövdesi, buhar hatları ve egzoz boruları 200°C üzerine çıkabilir. Çıplak el temasından kaçının, izolasyonu hasarlı noktaları (jacketing eksik bölgeleri) mühendise bildirin — yağ sızıntısı sıcak yüzeyle buluşursa makine dairesi yangınının (en yaygın yangın türü) ana sebebidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Basınç Parametrelerinin İzlenmesi",
      sections: [
        {
          subheading: "4.1 Yağ, yakıt ve hava basınçları",
          paragraphs: [
            `Yağlama yağı basıncı (LO pressure), makinenin can damarıdır; düşük yağ basıncı saniyeler içinde yatak hasarına yol açar. Ana makine ve jeneratör inlet yağ basınçları her turda doğrulanır. Yakıt besleme basıncı (FO supply/booster pressure), enjeksiyon kalitesini etkiler; viskozite kontrol ünitesiyle (viscotherm) birlikte izlenir.`,
            `Çalışma havası (control air, ~7 bar) ve start havası (starting air, ~25-30 bar) basınçları kritiktir. Start havası düşükse makine kalkamaz; bu yüzden hava kompresörleri ve hava tüplerinin (air bottles) basıncı sürekli izlenir. Hava tüplerinden günlük drenaj (drain) yapılarak yoğuşma suyu boşaltılır.`,
          ],
          table: {
            caption: `Kritik Basınç Değerleri (Tipik)`,
            headers: ["Sistem", "Normal Basınç", "Düşük Alarm", "Önem"],
            rows: [
              ["ME LO inlet", "2.0 - 3.5 bar", "<1.5 bar", "Kritik — yatak hasarı"],
              ["FO booster", "7 - 10 bar", "Üretici limiti", "Enjeksiyon kalitesi"],
              ["Starting air", "25 - 30 bar", "<18 bar", "Start kabiliyeti"],
              ["Control air", "6 - 8 bar", "<5.5 bar", "Otomasyon/valf kontrolü"],
              ["Jacket water", "2 - 4 bar", "Üretici limiti", "Soğutma sirkülasyonu"],
            ],
          },
        },
        {
          subheading: "4.2 Diferansiyel basınç (filtre tıkanması)",
          paragraphs: [
            `Yağ, yakıt ve hava filtrelerinde diferansiyel basınç göstergesi (DP gauge), filtrenin ne kadar tıkandığını gösterir. DP yükseldiğinde filtre temizlenir veya değiştirilir; otomatik geri yıkamalı (auto-backwash) filtrelerde backflush sıklığı izlenir. Yüksek DP'yi göz ardı etmek, filtre by-pass'ının açılmasına ve kirli yakıtın/yağın makineye gitmesine yol açar.`,
            `Yağcı, filtre değişim sırasında ana hattı kesmeden duplex filtre kolunu çevirir (changeover); böylece makine kesintisiz çalışır. Değiştirilen filtre içeriği (metal parçacık, kömür benzeri kalıntı) gözlemlenir ve anormallik mühendise raporlanır — yataktan gelen metal talaşı erken arıza işaretidir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Seviye Kontrolleri",
      sections: [
        {
          subheading: "5.1 Tank ve karter seviyeleri",
          paragraphs: [
            `Yağcı her turda günlük servis tanklarının (FO/DO settling ve service tank), yağlama yağı sump/storage tanklarının, sintine ve sludge tankının seviyelerini kontrol eder. Karter (sump) yağ seviyesindeki ani düşüş yağ kaçağını, ani yükseliş ise yakıt veya su karışmasını (sump dilution) gösterir — ikincisi crankcase explosion riskinin habercisidir.`,
            `Sludge ve atık yağ tankı seviyeleri MARPOL Annex I açısından kritiktir; tank dolduğunda yağcı mühendise haber verir, sahil tesisine teslim (shore disposal) veya incineration planlanır. Tank seviyeleri sahte gösterilemez; PSC ve ORB (Oil Record Book) denetimleri seviye tutarlılığını sorgular.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Karter yağına su/yakıt karışması",
              text: `Sump yağ seviyesinin açıklanamayan yükselişi acil durumdur. Su (jacket cooling kaçağı) veya yakıt (enjektör/pompa kaçağı) karışması, yağlama özelliğini bozar ve crankcase oil mist oluşumuyla patlamaya zemin hazırlar. Oil Mist Detector (OMD) alarmı asla göz ardı edilmez.`,
            },
          ],
        },
        {
          subheading: "5.2 Genleşme tankları ve gözlem camları",
          paragraphs: [
            `Soğutma sistemi genleşme tankı (expansion tank) seviyesi izlenir; sürekli düşüş soğutma devresinde kaçak demektir. Gözlem camları (sight glasses) — özellikle dönüş yağ hatlarındaki — yağ akışının ve renginin kontrolünde kullanılır; köpüklü veya bulanık yağ su karışmasını işaret eder.`,
          ],
        },
      ],
    },
    {
      heading: "6. Ses, Titreşim ve Anormallik Tespiti",
      sections: [
        {
          subheading: "6.1 Dönen ekipmanda ses/titreşim",
          paragraphs: [
            `Pompalar, fanlar, kompresörler ve separatörler kararlı bir ses ve titreşim imzasına sahiptir. Bu imzanın değişmesi (yeni bir uğultu, vuruntu, çığlık benzeri ses) rulman aşınması, balanssızlık, kavitasyon veya gevşek bağlantı işaretidir. Yağcı, deneyimiyle "normalin sesini" tanır ve sapmayı erken yakalar.`,
            `Kavitasyon (pompa emişinde basınç düşmesi nedeniyle buhar kabarcığı oluşması) tipik çakıl/çağıltı sesi verir ve pompa çarkını hızla aşındırır. Emiş filtresi tıkanması veya tank seviyesi düşüklüğü yaygın nedenidir; Yağcı sesi tanıyıp mühendise bildirir.`,
          ],
          bullets: [
            `Rulman uğultusu/çığlığı → aşınma veya yağsızlık`,
            `Periyodik vuruntu → balanssızlık veya gevşek cıvata`,
            `Çakıl sesi → kavitasyon (emiş sorunu)`,
            `Metalik sürtünme → hizalama (alignment) bozukluğu`,
          ],
        },
        {
          subheading: "6.2 Ana makinede vuruntu ve duman",
          paragraphs: [
            `Ana makinede yeni bir vuruntu (knocking) sesi, enjeksiyon zamanlaması, yanma anomalisi veya yatak boşluğu sorununu gösterebilir; derhal mühendise bildirilir. Egzoz bacasından çıkan dumanın rengi de bilgi verir: siyah duman (eksik yanma/aşırı yük), mavi duman (yağ yakma), beyaz duman (su/yakıt sorunu veya soğuk yanma).`,
            `Scavenge space (süpürme havası bölgesi) yangını, iki zamanlı büyük makinelerde gizli ama tehlikeli bir olaydır; bölgesel sıcaklık artışı ve duman ile kendini belli eder. Yağcı, scavenge drain'lerden gelen birikinti ve sıcaklığı izleyerek erken belirtiyi yakalayabilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — Erken titreşim tespiti",
              text: `Bir Yağcı, rutin turunda deniz suyu pompasında alışılmadık bir uğultu fark eder ve mühendise bildirir. Yapılan kontrolde rulmanın aşınmaya başladığı görülür; pompa standby'a alınıp planlı değiştirilir. Tespit edilmeseydi pompa seyirde sıkışacak, soğutma kaybı ana makine yavaşlamasına yol açacaktı.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Yağlama Noktalarının Kontrolü",
      sections: [
        {
          subheading: "7.1 Otomatik ve manuel yağlama",
          paragraphs: [
            `Büyük iki zamanlı makinelerde silindir yağlama (cylinder lubrication), elektronik kontrollü yağlayıcılar (alpha lubricator) ile yükle orantılı olarak yapılır; feed rate (g/kWh) izlenir. Yağcı, yağlayıcı pompaların çalıştığını, yağ tankının dolu olduğunu ve no-flow alarmının olmadığını doğrular.`,
            `Manuel yağlama noktaları (greasing points) — fan yatakları, valf milleri, kapı menteşeleri, vinç/winch yatakları — PMS programına göre gres tabancasıyla yağlanır. Aşırı yağlama da en az eksik yağlama kadar zararlıdır (keçe zorlanması, kir yapışması). Yağcı doğru gres tipini (sıcaklık/uygulamaya göre) kullanır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Doğru yağ, doğru nokta",
              text: `Yağ ve gres tipini asla karıştırmayın. Yüksek sıcaklık yatakları için yüksek-sıcaklık gres, su altı/nemli noktalar için su-dirençli gres kullanılır. Yanlış yağ seçimi, doğru programda yağlamadan daha çok hasar verir. Şüphede kalırsanız makine kılavuzuna ve LO chart'a bakın.`,
            },
          ],
        },
        {
          subheading: "7.2 Yağ kalitesinin gözlemi",
          paragraphs: [
            `Yağcı, sirkülasyon yağının renk, koku ve görünümünü gözlemler. Koyulaşma, yanık koku veya köpük su/kontaminasyon işaretidir. Periyodik yağ numuneleri (LO sampling) alınır ve laboratuvar analizine gönderilir; viskozite, su içeriği, TBN (Total Base Number) ve metal içeriği değerlendirilir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sızıntı Tespiti ve Raporlama",
      sections: [
        {
          subheading: "8.1 Yağ, yakıt ve su sızıntıları",
          paragraphs: [
            `Sızıntı tespiti, Yağcı'nın en kritik görevlerinden biridir. Flanş terlemeleri, pompa salmastra (gland) kaçakları, valf bonnet sızıntıları, boru çatlakları ve gövde çatlakları tur sırasında aranır. Yeni bir sızıntı tespit edildiğinde kaynak, miktar ve risk (sıcak yüzeye yakınlık) mühendise bildirilir.`,
            `Yüksek basınçlı yakıt borularında (HP fuel pipe) sızıntı, çift cidarlı boru (double-walled / sheathed pipe) sistemiyle hapsedilir; bu sistemin leak alarmı asla devre dışı bırakılmaz. SOLAS II-2 gereği, sıcak yüzeylere giden yakıt/yağ hatlarının ekranlanması (shielding) zorunludur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-2 — Yangın önleme",
              text: `Yüksek sıcaklık yüzeyleri (>220°C) ile yanıcı sıvı temasını önlemek için yakıt/yağ hatları ekranlı olmalı, izolasyon yağ geçirmez olmalıdır. Makine dairesi yangınlarının çoğunluğu yağ sızıntısının sıcak yüzeye temasından kaynaklanır.`,
            },
          ],
        },
        {
          subheading: "8.2 Drip tray ve save-all yönetimi",
          paragraphs: [
            `Sızıntıların toplandığı drip tray ve save-all tepsileri düzenli boşaltılır ve temiz tutulur; biriken yağ kayma riski ve yangın yükü oluşturur. Yağcı, bu birikintilerin nereden geldiğini izleyerek gizli/yavaş sızıntıları teşhis eder. Boşaltma daima sludge/atık yağ tankına yapılır, asla sintineye karıştırılmaz.`,
          ],
        },
      ],
    },
    {
      heading: "9. Logbook Kaydı ve Alarm Tepkisi",
      sections: [
        {
          subheading: "9.1 Makine logbook'una veri kaydı",
          paragraphs: [
            `Vardiya verileri makine logbook'una (engine room log) düzenli aralıklarla kaydedilir: ana makine devir/yük, jeneratör yükleri, sıcaklık-basınç okumaları, yakıt/yağ tüketimleri, tank seviyeleri ve dikkat çeken olaylar. Bu kayıtlar hem operasyonel takip hem de PSC/class/sigorta denetimleri için resmi delildir.`,
            `Kayıtlar dürüst ve zamanında tutulur; sonradan toplu doldurma (pencil whipping) yasaktır ve denetimde tespit edilirse ciddi yaptırım getirir. Modern gemilerde alarm ve veri kaydı otomasyonla (AMS) yapılsa da, manuel doğrulama ve imza sorumluluğu devam eder.`,
          ],
        },
        {
          subheading: "9.2 Alarm durumunda tepki",
          paragraphs: [
            `Bir alarm çaldığında Yağcı önce alarmın türünü tanır (sensör arızası mı, gerçek arıza mı), ardından derhal nöbetçi mühendise haber verir. Yetki sınırı içinde basit aksiyonları (filtre changeover, drenaj, standby pompa devreye alma — eğitimli ve yetkilendirilmişse) yapabilir; ancak kritik müdahaleler mühendis talimatıyla yürütülür.`,
            `Slowdown veya shutdown gibi otomatik koruma (safety trip) devreye girerse Yağcı sahada gözlem yapar ve mühendise gerçek zamanlı bilgi aktarır. Acil shutdown butonlarının ve quick-closing valve'lerin yeri ezbere bilinir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Alarmı susturmak çözüm değildir",
              text: `Bir alarmı acknowledge etmek (susturmak) onu çözmez. Tekrarlayan veya açıklanamayan alarmlar daima mühendise bildirilir. Alarm sensörünü "arızalı" diye devre dışı bırakmak, gerçek bir arızanın gözden kaçmasına ve felakete yol açabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Yağcı'nın vardiya checklist'i",
          bullets: [
            `Vardiya devir-teslim eksiksiz alındı mı, devam eden işler not edildi mi?`,
            `Sistematik tur güzergahı tamamlandı mı, hiçbir ekipman atlandı mı?`,
            `Sıcaklık-basınç-seviye değerleri okundu ve önceki turla karşılaştırıldı mı?`,
            `Yağlama noktaları ve silindir yağlama doğrulandı mı?`,
            `Yeni sızıntı/anormal ses/titreşim var mı, mühendise bildirildi mi?`,
            `Drip tray, save-all ve sintine durumu kontrol edildi mi?`,
            `Sludge/atık yağ tank seviyeleri MARPOL açısından izlendi mi?`,
            `Logbook verileri zamanında ve dürüst kaydedildi mi?`,
            `Dead Man Alarm devrede mi (yalnız çalışmada)?`,
            `Alarm geçmişi gözden geçirildi, tekrarlayan alarm var mı?`,
          ],
          paragraphs: [
            `Yağcı'nın değeri, otomasyonun göremediğini görmesinde yatar. Disiplinli turlar, beş duyunun bilinçli kullanımı, trend takibi ve zamanında raporlama; makine dairesinin küçük bir arızadan büyük bir kazaya dönüşmesini önleyen ilk savunma hattıdır. İyi bir Yağcı, bir sorunu daha alarm çalmadan fark eden kişidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
