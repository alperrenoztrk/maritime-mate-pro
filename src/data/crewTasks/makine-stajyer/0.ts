import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Makine vardiyasına eğitim amaçlı katılım",
  roleSlug: "makine-stajyer",
  taskIndex: 0,
  estimatedPages: 25,
  intro: `Makine stajyeri (Engine Cadet), STCW Bölüm A-III/1 yeterlilik alanlarını gemide pratik olarak kazanmak üzere vardiya mühendisinin (Engineer Officer of the Watch — EOOW) doğrudan gözetiminde makine dairesi nöbetine katılır. Bu katılım; parametre okuma, log defterine kayıt, sıvı seviyesi kontrolü, alarm tanıma, engine room round (makine turu) rutini ve takım çalışmasını kapsar. Stajyerin bağımsız karar alma veya bağımsız vardiya tutma yetkisi yoktur; her müdahale, her switching ve her olağandışı durum EOOW onayı ile yapılır. Bu bölüm, stajyerin gözetimli vardiya katılımında izlemesi gereken metodolojiyi, mevzuat çerçevesini ve emniyet sınırlarını adım adım açıklar.`,
  sources: [
    "STCW Convention & Code — Chapter III, Table A-III/1 (Engine watchkeeping competences)",
    "STCW Code Section A-VIII/2 Part 3-2 — Watchkeeping principles, Engine Department",
    "ISM Code — International Safety Management Code",
    "SOLAS Chapter II-1 — Machinery Installations",
    "MARPOL Annex I — Oil Record Book Part I requirements",
    "IMO Model Course 7.04 — Officer in charge of an engineering watch",
    "Engine Room Resource Management (ERRM) — best practice guidelines",
    "Reeds Engineering Knowledge for Marine Engineers",
  ],
  chapters: [
    {
      heading: "1. Gözetimli Vardiya Kavramı ve Stajyerin Konumu",
      lead: `Makine stajyeri vardiyaya bir karar verici olarak değil, eğitim alan bir gözlemci-uygulayıcı olarak katılır. Yetki sınırlarının net anlaşılması emniyetin temelidir.`,
      sections: [
        {
          subheading: "1.1 Stajyerin yetki ve sorumluluk sınırı",
          paragraphs: [
            `Stajyer, STCW A-III/1 yeterlilik kazanma yolculuğunda olan bir aday mühendistir; ancak vardiyanın yasal sorumluluğu daima görevdeki EOOW üzerindedir. Stajyer hiçbir koşulda bağımsız olarak makine başlatma/durdurma, valf switching, breaker kapatma veya alarm reset işlemi yapamaz. Her eylemden önce EOOW'a niyetini bildirir, onay alır ve eylemi gözetim altında yürütür.`,
            `Bu prensip "challenge and response" (sor-cevapla) kültürünün parçasıdır. Stajyerin bir anormallik fark etmesi durumunda hemen EOOW'a raporlaması beklenir; küçük görünen bir gözlem (örneğin bir flanştaki sızıntı veya bearing sıcaklığındaki yükselme) önemli bir arızanın erken belirtisi olabilir. Stajyerin susması değil, raporlaması istenir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "STCW A-VIII/2 — Watchkeeping arrangements",
              text: `Vardiyanın yapısı ve personelin yeterliliği, geminin durumuna ve tehlikelerine uygun olmalıdır. Eğitim alan personel, görevdeki mühendisin yasal sorumluluğunu üstlenmiş sayılmaz; gözetimsiz vardiya tutamaz.`,
            },
          ],
        },
        {
          subheading: "1.2 UMS / Attended Machinery Space farkı",
          paragraphs: [
            `Modern gemilerin çoğu UMS (Unattended Machinery Space) sertifikalıdır; makine dairesi gece dönemlerinde insansız kalabilir ve alarmlar köprüüstüne ve duty engineer'ın kabinine yönlendirilir. Stajyer, hem attended (insanlı) hem unattended dönemde makine dairesinin nasıl izlendiğini öğrenir.`,
            `Attended dönemde fiziksel turlar ve sürekli gözlem esastır. UMS dönemde ise dead man alarm (engineer's call / personnel alarm) sistemi devreye girer; makine dairesine giren personel belirli aralıklarla butona basarak hayatta olduğunu bildirir. Stajyer bu sisteme aşina olmalı ve giriş-çıkış prosedürünü öğrenmelidir.`,
          ],
          table: {
            caption: `Attended ve UMS Vardiya Modlarının Karşılaştırması`,
            headers: ["Özellik", "Attended (insanlı)", "UMS (insansız)"],
            rows: [
              ["İzleme", "Sürekli fiziksel mevcudiyet", "Alarm yönlendirme + periyodik tur"],
              ["Tur sıklığı", "Vardiya boyunca sürekli", "En az günde bir, alarm üzerine"],
              ["Dead man alarm", "Genelde devre dışı", "Aktif (giriş yapan personel için)"],
              ["Alarm hedefi", "Kontrol odası paneli", "Köprü + duty eng. kabini"],
              ["Stajyer rolü", "Gözetimli tur + log", "Duty eng. ile tur eşliği"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Vardiya Devir-Teslimi (Handover)",
      sections: [
        {
          subheading: "2.1 Devir-teslim sırasında dikkat edilecekler",
          paragraphs: [
            `Vardiya devri, EOOW'lar arasında yapılan resmi bir bilgi aktarımıdır. Stajyer bu süreci dikkatle izleyerek hangi bilgilerin kritik olduğunu öğrenir: çalışan makinelerin durumu, devam eden bakım işleri, izole edilmiş ekipmanlar (LOTO altındaki), tank seviyeleri, devam eden transferler (yakıt, balast, bilge) ve bekleyen alarmlar.`,
            `STCW, gelen mühendisin vardiyayı devralmadan önce ekipmanın durumu, devam eden operasyonlar ve potansiyel tehlikeler hakkında tam bilgi sahibi olmasını şart koşar. Devralan mühendis, kendisini fiziksel ve zihinsel olarak görev yapamaz durumda hissederse vardiyayı devralmaz. Stajyer, bu standardın profesyonel disiplinini gözlemleyerek içselleştirir.`,
          ],
          bullets: [
            `Çalışan/standby makine ve jeneratör durumu`,
            `Devam eden transferler (FO/DO, LO, balast, bilge)`,
            `İzole/LOTO altındaki ekipman ve permit'ler`,
            `Bekleyen veya overridden (bypass) alarmlar`,
            `Tank seviyeleri ve bunker durumu`,
            `Köprüüstünden gelen talepler (manevra, hız değişimi)`,
          ],
        },
        {
          subheading: "2.2 Vardiya defterine (Engine Log) kayıt mantığı",
          paragraphs: [
            `Engine Log Book, makine dairesinin yasal hafızasıdır. Saatlik parametreler (RPM, exhaust gas temp, scavenge air pressure, jacket cooling temp, LO pressure, FO temp/viscosity), tank seviyeleri ve önemli olaylar kayıt altına alınır. Stajyer önce gözetim altında okuma yapar, sonra EOOW kontrolünde kaydı kendisi tutmaya başlar.`,
            `Kayıtlar gerçek, zamanında ve düzeltilmemiş (sahte veri yok) olmalıdır. Bir parametre limit dışına çıktıysa hem değer hem alınan aksiyon yazılır. Bu kayıtlar Port State Control (PSC) denetiminde, sigorta soruşturmasında ve kaza incelemesinde delil değeri taşır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Sahte kayıt yasaktır",
              text: `Engine log veya Oil Record Book'a gerçeği yansıtmayan kayıt girmek (örneğin alarmı görmezden gelmek, sahte parametre yazmak) hem ISM ihlali hem de ciddi hukuki suçtur. Magic pipe vakalarında şirketlere ve mürettebata milyonlarca dolar ceza ve hapis cezası verilmiştir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Makine Turu (Engine Room Round) Rutini",
      lead: `Makine turu, vardiyanın kalbidir. Stajyer, sistematik bir tur rutinini ezbere değil mantığıyla öğrenmelidir.`,
      sections: [
        {
          subheading: "3.1 Sistematik tur güzergâhı",
          paragraphs: [
            `Tur, genellikle yukarıdan aşağıya veya bir sistemden diğerine mantıksal sırayla yapılır: ana makine ve çevresi, jeneratörler, kazan, purifier room, pompa platformları, separator/clarifier, hava kompresörleri, soğutma sistemleri, steering gear room ve bilge well'ler. Stajyer tur sırasında "bak, dinle, kokla, dokun" (gözle, sesle, kokuyla, sıcaklıkla) dört duyusunu kullanmayı öğrenir.`,
            `Gözle: sızıntı, gevşek bağlantı, anormal seviye, titreşim. Dinle: olağandışı vuruntu, kavitasyon, sürtünme sesi. Kokla: yanık izolasyon, yağ/yakıt buharı, egzoz kaçağı. Dokun (dikkatle): bearing housing sıcaklığı, boru sıcaklık farkı. Bu his temelli teşhis, panel değerlerinin yakalayamadığı erken arızaları ortaya çıkarır.`,
          ],
          table: {
            caption: `Makine Turunda Tipik Kontrol Noktaları`,
            headers: ["İstasyon", "Bakılan", "Tipik anormallik"],
            rows: [
              ["Ana makine", "Egzoz sıcaklık dengesi, LO sızıntı", "Silindir dengesizliği, sızıntı"],
              ["Jeneratör", "Yük, sıcaklık, titreşim", "Aşırı yük, bearing ısınması"],
              ["Purifier", "Su atışı, gravity disc, vibrasyon", "Yağ kaçağı, dengesizlik"],
              ["Bilge well", "Seviye, su rengi/yağ filmi", "Sızıntı, yağlı su birikimi"],
              ["Hava kompresörü", "Basınç, sıcaklık, drain", "Yetersiz basınç, su birikimi"],
              ["Steering gear", "Hidrolik seviye, sızıntı", "Yağ kaçağı, gürültü"],
            ],
          },
        },
        {
          subheading: "3.2 Bilge ve sintine yönetimi gözlemi",
          paragraphs: [
            `Bilge well seviyeleri turun kritik bir parçasıdır. Yükselen bir bilge seviyesi gizli bir sızıntının (deniz suyu, cooling water, FO/LO) işareti olabilir. Stajyer, bilge alarm sistemini, Oily Water Separator (OWS) ve 15 ppm bilge alarm/oil content monitor mantığını öğrenir; ancak bilge boşaltma asla stajyerin bağımsız yetkisinde değildir.`,
            `MARPOL Annex I, makine dairesi sintine suyunun ancak 15 ppm altında ve OWS üzerinden denize basılabileceğini şart koşar. Her bilge transferi Oil Record Book Part I'e kaydedilir. Stajyer bu kayıt mantığını öğrenir; usulsüz bilge boşaltma (magic pipe) en ağır cezalandırılan deniz suçlarındandır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Bir tur asla aceleye getirilmez",
              text: `Deneyimli mühendisler bir turu "5 dakikada gezmek" yerine her istasyonda durup gözlemler. Stajyer, hızlı geçmek yerine her ekipmanın "normal" halini öğrenmeli ki "anormal" hali fark edebilsin. Normalin bilgisi, anormalin teşhisidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Parametre Okuma ve Yorumlama",
      sections: [
        {
          subheading: "4.1 Ana makine parametreleri",
          paragraphs: [
            `Stajyer, ana makinenin temel parametrelerini ve normal aralıklarını öğrenir: her silindirin egzoz gaz sıcaklığı (cylinder exhaust deviation), scavenge air pressure, turbocharger RPM, jacket cooling water inlet/outlet, piston cooling oil outlet, LO inlet pressure/temp ve fuel oil viscosity/temp. Bu değerler birbirleriyle ilişkilidir; tek bir değer değil trend yorumlanır.`,
            `Örneğin bir silindirin egzoz sıcaklığı diğerlerinden belirgin sapma gösteriyorsa (deviation), o silindirde yanma sorunu, enjektör arızası veya fuel index dengesizliği olabilir. Stajyer bu korelasyonları öğrenerek panel değerlerinin altındaki fiziksel anlamı kavrar.`,
          ],
        },
        {
          subheading: "4.2 Yardımcı sistem parametreleri ve trend takibi",
          paragraphs: [
            `Jeneratör yükü, kazan buhar basıncı, hava şişesi basıncı, soğutma suyu sıcaklıkları, sea water cooling sistemi diferansiyel basıncı (filtre tıkanması göstergesi) düzenli okunur. Modern gemilerde Alarm and Monitoring System (AMS) bu değerleri sürekli loglar; stajyer trend ekranlarını okumayı öğrenir.`,
            `Trend analizi proaktif bakımın temelidir: yavaşça yükselen bir bearing sıcaklığı, kademeli düşen bir LO basıncı veya artan bir diferansiyel basınç, ani arızadan günler önce uyarı verir. Stajyer "şu an limit içinde" demek yerine "hangi yönde gidiyor" sorusunu sormayı öğrenir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Sapan egzoz sıcaklığı",
              text: `Bir stajyer turda 3 No'lu silindirin egzoz sıcaklığının diğerlerinden 40°C yüksek olduğunu fark eder ve EOOW'a raporlar. İnceleme sonucu fuel injector iğnesinin sızdırdığı, atomizasyonun bozulduğu tespit edilir. Erken müdahale, piston/liner hasarını önler. Stajyerin gözlemi para ve emniyet kazandırır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Alarm Tanıma ve Tepki",
      sections: [
        {
          subheading: "5.1 Alarm hiyerarşisi ve önceliklendirme",
          paragraphs: [
            `Makine dairesi alarmları kademelidir: önce uyarı (alarm), sonra slow-down (otomatik yavaşlama) ve en sonunda shut-down (otomatik durdurma). Kritik alarmlar (LO low pressure, jacket water high temp, scavenge fire, overspeed) makineyi korumak için otomatik müdahale tetikler. Stajyer her alarmın anlamını ve tetiklediği aksiyonu öğrenir.`,
            `Bir alarm çaldığında stajyer paniğe kapılmadan: alarmı okur, EOOW'a bildirir, ilgili parametreyi panelden ve sahadan doğrular. Alarmı bağımsız olarak susturmaz/reset etmez. Çoklu alarm durumunda (alarm flooding) en kritik olanı tespit etmek ve kök nedeni bulmak EOOW'un işidir; stajyer destek verir.`,
          ],
          table: {
            caption: `Kritik Makine Alarmları ve Otomatik Tepki`,
            headers: ["Alarm", "Olası neden", "Otomatik tepki"],
            rows: [
              ["LO low pressure", "Pompa/filtre/sızıntı", "Slow-down → shut-down"],
              ["Jacket water high temp", "Soğutma yetersizliği", "Slow-down"],
              ["Scavenge fire", "Birikmiş yağ tutuşması", "Alarm + yük düşürme"],
              ["Overspeed", "Governor/yük kaybı", "Shut-down"],
              ["Oil mist (crankcase)", "Bearing aşırı ısınma", "Slow-down/shut-down"],
            ],
          },
        },
        {
          subheading: "5.2 Crankcase oil mist ve scavenge fire bilinci",
          paragraphs: [
            `Oil Mist Detector (OMD) alarmı, krank kasası içinde bir bearing'in aşırı ısınıp yağ buharı (mist) oluşturduğunu gösterir; bu bir krank kasası patlaması (crankcase explosion) habercisidir. Bu alarmda krank kasası kapakları kesinlikle açılmaz; makine soğuyana kadar (genelde 20-30 dk) beklenir. Stajyer bu ölümcül riski mutlaka bilmelidir.`,
            `Scavenge fire ise scavenge boşluğunda biriken yağın tutuşmasıdır; egzoz sıcaklığı yükselir, yük düşürülür ve fixed smothering sistemi (buhar/CO2) hazır tutulur. Bu olaylar stajyerin "neden krank kasası alarmında bekliyoruz?" sorusunu temellendirmesi gereken kritik emniyet dersleridir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Crankcase explosion riski",
              text: `Oil mist alarmından sonra krank kasasını açmak ölümcül olabilir: kapağı açmak temiz hava sağlar ve sıcak buharın tutuşmasıyla ikincil (daha şiddetli) patlama oluşur. Reading 1947 ve sonraki birçok kazada mürettebat hayatını kaybetmiştir. Kural: bekle, soğut, sonra aç.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Engine Room Resource Management (ERRM)",
      sections: [
        {
          subheading: "6.1 Takım çalışması ve iletişim",
          paragraphs: [
            `ERRM, köprüüstündeki BRM'in (Bridge Resource Management) makine dairesi karşılığıdır. Açık iletişim, görev paylaşımı, durum farkındalığı (situational awareness) ve hata zincirinin kırılması prensiplerine dayanır. Stajyer takımın en küçük üyesidir ama "speak up" (sesini çıkar) kültürünün önemli bir parçasıdır.`,
            `Closed-loop communication (kapalı döngü iletişim) esastır: bir talimat verildiğinde alıcı tekrarlar (read-back), gönderen doğrular. "2 No'lu jeneratörü standby'a al" talimatı, "2 No'lu jeneratör standby, anlaşıldı" şeklinde teyit edilir. Bu, yanlış anlamadan doğan kazaları önler.`,
          ],
        },
        {
          subheading: "6.2 Köprüüstü-makine koordinasyonu",
          paragraphs: [
            `Manevra durumlarında (liman giriş-çıkış, dar su yolu) makine dairesi standby moduna geçer: ekstra jeneratör paralelde, ana makine UMS'den manuel kontrole alınır, EOOW kontrol odasında hazır bekler. Telegraph emirleri, bridge'den gelen hız talepleri ve "stand by engines / finished with engines" komutları arasındaki koordinasyonu stajyer gözlemler.`,
            `Stajyer, makine ile köprü arasındaki kritik bağı (engine telegraph, engineer's call, talkback sistemi) öğrenir. Manevra sırasında ani bir tam tornistan (crash astern) talebi geldiğinde makinenin nasıl yanıt verdiğini ve ekibin nasıl hazırlandığını gözlemlemek değerli bir eğitim fırsatıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Stajyer için manevra altın değerindedir",
              text: `Liman manevraları, kısa sürede yoğun öğrenme sağlar: paralel çalışma, ani yük değişimleri, standby ekipman yönetimi. Stajyer manevralarda gözünü açık tutmalı, sorular biriktirmeli ve manevra sonrası EOOW'a yöneltmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Seviye Kontrolü ve Transferler",
      sections: [
        {
          subheading: "7.1 Tank seviyeleri ve sounding",
          paragraphs: [
            `Stajyer; FO settling/service tank, DO tank, LO sump, fresh water, sea water expansion ve bilge holding tank seviyelerini hem uzaktan (remote level gauge) hem manuel (sounding pipe + tape) okumayı öğrenir. Manuel sounding, otomatik seviye göstergesi arızalandığında veya doğrulama gerektiğinde hayati öneme sahiptir.`,
            `Tank seviyelerinin doğru takibi, makinenin yakıt/yağ beslemesinin kesintisiz olmasını ve overflow/spillage'ın önlenmesini sağlar. Stajyer, bir service tank seviyesinin neden belirli aralıkta tutulduğunu (settling süresi, water drain ihtiyacı) öğrenir.`,
          ],
        },
        {
          subheading: "7.2 Transfer operasyonlarında gözetimli katılım",
          paragraphs: [
            `FO/DO iç transfer, LO yenileme ve fresh water transferleri stajyerin gözetimli katıldığı operasyonlardır. Transfer öncesi valf alignment doğrulanır, overflow tank seviyesi kontrol edilir, transfer süresince seviye sürekli izlenir. Hatalı valf hattı veya kontrolsüz transfer overflow ve kirlilik riski yaratır.`,
            `Stajyer her transferde "kaynaktan hedefe" tam hattı (line-up) zihninde kurmayı öğrenir: hangi valf açık, hangi pompa çalışıyor, hangi tank doluyor. Bu disiplin, ileride bağımsız mühendis olduğunda yanlış transfer hatalarını önleyecek temel beceridir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex I — Transfer kayıtları",
              text: `Yakıt/yağ içeren tüm transfer ve bilge işlemleri Oil Record Book Part I'e zamanında ve doğru kaydedilir. Stajyer kayıt mantığını öğrenir; ancak ORB imzalama yetkisi sorumlu mühendise aittir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Emniyet Davranışı ve PPE",
      sections: [
        {
          subheading: "8.1 Makine dairesinde kişisel emniyet",
          paragraphs: [
            `Makine dairesi yüksek gürültü, sıcak yüzeyler, dönen ekipman ve kayma riski içeren bir ortamdır. Stajyer; emniyet ayakkabısı, baret, kulaklık (90 dB üstü zonlarda zorunlu), iş tulumu ve gerektiğinde göz/yüz koruması kullanır. Bol giysi, takı ve gevşek saç dönen parçalar için ölümcül risktir.`,
            `Sıcak yüzeylere (egzoz manifoldu, buhar hattı) çıplak temas, dönen şaft/kaplin yakınında durma ve yağlı zeminde dikkatsiz hareket kaza nedenleridir. Stajyer "üç nokta teması" (three points of contact) ile merdiven kullanımı, doğru kaldırma tekniği ve acil durdurma butonlarının yerlerini öğrenir.`,
          ],
          bullets: [
            `90 dB üzeri bölgelerde kulak koruması zorunlu`,
            `Dönen ekipman muhafazaları yerinde olmadan çalışma yapılmaz`,
            `Sıcak yüzeylere temas için ısı dirençli eldiven`,
            `Merdivenlerde üç nokta teması kuralı`,
            `Acil durdurma (emergency stop) ve çıkış yolları bilinmeli`,
          ],
        },
        {
          subheading: "8.2 Kapalı alan ve tehlikeli iş bilinci",
          paragraphs: [
            `Stajyer, tank/sintine/cofferdam gibi kapalı alanlara giriş izninin (enclosed space entry permit) ve atmosfer ölçümünün (O2, LEL, H2S, CO) önemini öğrenir. İzinsiz kapalı alan girişi denizdeki en ölümcül kaza türlerindendir. Stajyer hiçbir koşulda izinsiz ve gözetimsiz kapalı alana girmez.`,
            `Aynı şekilde sıcak iş (hot work — kaynak, taşlama) ve elektrik kilitleme (LOTO) prosedürlerinin amacını öğrenir. Bu prosedürler ileriki bölümlerde detaylandırılır; vardiya katılımında stajyer bunların vardiya emniyetiyle bağını gözlemler.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kapalı alan = ölüm riski",
              text: `Kapalı alan ölümlerinin çoğunda kurtarmaya giren ikinci ve üçüncü kişiler de ölmektedir. Stajyer asla "hızlıca bir bakayım" diyerek izinsiz kapalı alana girmez ve düşen birini görse bile önce alarm verir, gözetimsiz kurtarmaya atlamaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. TRB ile Vardiya Katılımının Bağlanması",
      sections: [
        {
          subheading: "9.1 Vardiya görevlerinin TRB'ye işlenmesi",
          paragraphs: [
            `Her vardiya katılımı, Training Record Book'taki (TRB) ilgili yetkinlik alanına işlenir: "engineering watch keeping", "monitor machinery performance", "maintain safe engineering watch". Stajyer, gözetimli olarak yaptığı her görevi (log tutma, tur, transfer, alarm tepkisi gözlemi) TRB'ye kaydeder ve eğitmen mühendise imzalatır.`,
            `TRB'nin tamamlanması, OOW (Engine) yeterlilik sınavına girebilmenin yasal ön koşuludur. Bu nedenle stajyer, vardiya katılımını sadece "saat doldurma" olarak değil, somut yetkinlik kanıtı biriktirme süreci olarak görmelidir.`,
          ],
        },
        {
          subheading: "9.2 Geri bildirim ve değerlendirme döngüsü",
          paragraphs: [
            `Eğitmen mühendis, stajyerin gözlem keskinliğini, prosedüre uyumunu ve emniyet bilincini düzenli değerlendirir. Stajyer aktif geri bildirim istemeli: "Bu turda neyi gözden kaçırdım?", "Bu alarmda doğru tepki verdim mi?". Bu döngü, gözetimli katılımdan bağımsız yetkinliğe geçişin temelidir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "İlgili görev: TRB yönetimi",
              text: `Vardiya katılımının kayıt ve onay süreci için "Training Record Book (TRB) yönetimi" bölümüne bakınız. TRB'siz biriken vardiya saatleri yetkinlik kanıtı olarak değerlendirilmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Stajyerin vardiya kontrol listesi",
          bullets: [
            `Vardiya devrini dinledim, devam eden iş ve izolasyonları anladım mı?`,
            `Engine log'u zamanında ve doğru tuttum, EOOW kontrol etti mi?`,
            `Makine turunu sistematik yaptım (gör-dinle-kokla-dokun)?`,
            `Bilge well seviyelerini kontrol ettim, anormallik raporladım mı?`,
            `Parametreleri trend olarak yorumladım, sapma var mı?`,
            `Alarm çaldığında EOOW'a bildirdim, bağımsız reset yapmadım?`,
            `PPE eksiksiz, çıkış yolları ve emergency stop yerleri biliniyor mu?`,
            `Bu vardiyanın görevlerini TRB'ye işledim ve imzalattım mı?`,
          ],
          paragraphs: [
            `Makine stajyerinin vardiya katılımındaki başarısı, hızlı hareket etmekten değil, doğru gözlemlemekten, zamanında raporlamaktan ve yetki sınırına saygı göstermekten gelir. Bugün gözetim altında öğrenilen disiplin, yarın bağımsız vardiya tutacak mühendisin emniyet kültürünün temelini oluşturur. İyi bir stajyer, "normal" olanı o kadar iyi öğrenir ki "anormal" olanı herkesten önce fark eder.`,
          ],
        },
      ],
    },
  ],
};

export default content;
