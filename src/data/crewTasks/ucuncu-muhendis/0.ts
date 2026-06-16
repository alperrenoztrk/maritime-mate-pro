import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Makine vardiyası ve parametre izleme",
  roleSlug: "ucuncu-muhendis",
  taskIndex: 0,
  estimatedPages: 25,
  intro: `Üçüncü/Dördüncü Mühendis, makine dairesi vardiyasının (engine room watch) sahadaki gözü ve elidir. Ana makine, jeneratör (auxiliary engine), kazan, hava kompresörleri ve servis pompalarının çalışma parametrelerini düzenli aralıklarla izler; sıcaklık, basınç, seviye, devir ve alarm durumlarını kayıt altına alır. Anormal eğilimleri erken yakalar, derhal İkinci Mühendis veya nöbetçi Baş Mühendise raporlar ve vardiya teslim-devir prosedürünü eksiksiz uygular. Bu bölüm, STCW kapsamındaki makine vardiyası standardını ve günlük parametre izleme metodolojisini adım adım açıklar.`,
  sources: [
    "STCW Code Section A-VIII/2 Part 4-2 — Principles to be observed in keeping an engineering watch",
    "SOLAS Chapter II-1 Part C — Machinery Installations",
    "ISM Code — Shipboard Operations and Maintenance",
    "MARPOL Annex I — Oil Record Book Part I (Machinery Space)",
    "MARPOL Annex VI — Engine fuel/emission monitoring",
    "Class Society Rules (DNV/LR/ABS) — Machinery Surveys",
    "MAN B&W / Wärtsilä Engine Operation Manual",
    "IMO Resolution A.1047(27) — Principles of Minimum Safe Manning",
  ],
  chapters: [
    {
      heading: "1. Vardiya Devir-Teslim ve Hazırlık",
      lead: `Vardiyanın güvenliği, devir-teslim anındaki bilgi aktarımının eksiksizliğine bağlıdır. STCW A-VIII/2, devralan mühendisin makinelerin durumundan tam haberdar olmadan vardiyayı almamasını şart koşar.`,
      sections: [
        {
          subheading: "1.1 Devir öncesi durum değerlendirmesi",
          paragraphs: [
            `Vardiyayı devralan Üçüncü/Dördüncü Mühendis, makine kontrol odasına (ECR) varır varmaz bir tur (round) atmadan vardiyayı teslim almaz. Devreden mühendisten ana makine yükü ve devri (rpm), devreye girmiş/çıkmış jeneratörler, servis tank seviyeleri, çalışan pompa konfigürasyonu, beklemedeki (standby) ekipmanın durumu ve son 4 saatte gerçekleşen alarm/olaylar sözlü olarak aktarılır.`,
            `Devralan mühendis; manuel/UMS modu, devam eden bakım işleri, izole edilmiş (LOTO uygulanmış) ekipman, bekleyen iş emirleri ve köprüüstü (bridge) talepleri (örn. yaklaşan manevra, stand-by main engine talebi) konusunda bilgilendirilir. Bu bilgiler doğrulanmadan teslim alınmaz.`,
          ],
          bullets: [
            `Ana makine yükü, rpm, scavenge/exhaust sıcaklıkları`,
            `Çalışan jeneratör sayısı, yük paylaşımı (load sharing), frekans/voltaj`,
            `Servis ve settling tank seviyeleri, beklenen tüketim`,
            `Bilge seviyeleri, OWS durumu, ICCP/MGPS durumu`,
            `Devam eden bakım, izole ekipman ve bekleyen alarmlar`,
          ],
        },
        {
          subheading: "1.2 Devir kaydı ve sorumluluğun başlaması",
          paragraphs: [
            `Devir tamamlandığında engine room logbook'a devir saati, devreden ve devralan mühendis isimleri yazılır. Bu andan itibaren makine dairesi güvenliğinin sorumluluğu devralan mühendise geçer. Şüphe veya belirsizlik varsa devralan mühendis teslim almayı geciktirir ve İkinci Mühendisi bilgilendirir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "STCW A-VIII/2 — Taking over the watch",
              text: `Devralan mühendis, makinelerin ve sistemlerin durumundan tatmin olmadan vardiyayı devralmaz. Eğer bir manevra veya operasyon devam ediyorsa, devir o operasyon tamamlanana kadar ertelenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Düzenli Makine Turu (Engine Room Rounds)",
      sections: [
        {
          subheading: "2.1 Tur metodolojisi ve sıklığı",
          paragraphs: [
            `Manlı (manned) makine dairesinde tur tipik olarak saatte bir veya en geç iki saatte bir atılır; UMS modunda gündüz kontrolü + alarm bazlı müdahale uygulanır. Tur, sistematik bir güzergâh izler: ana makine platformu, jeneratör flatı, kazan ve FO ünitesi, purifier room, pompa flatı, separatör/OWS bölgesi, shaft tunnel ve steering gear.`,
            `Mühendis sadece göstergelere bakmaz; beş duyusunu kullanır. Anormal ses (knocking, kavitasyon, rulman uğultusu), titreşim, yağ/su/yakıt kaçağı, koku (yanık izolasyon, hot bearing), ısı (sıcak nokta) ve sızıntı izleri tespit edilir. Termometre/IR tabanca ile şüpheli noktalar ölçülür.`,
          ],
          bullets: [
            `Görsel: kaçak, sızıntı, gevşek bağlantı, ısı izi, gauge sapması`,
            `İşitsel: knocking, sürtünme, kavitasyon, hava kaçağı tıslaması`,
            `Dokunsal/IR: rulman, kaplin, exhaust manifold yüzey sıcaklığı`,
            `Koku: yanık yağ, izolasyon, brülör eksik yanması`,
          ],
        },
        {
          subheading: "2.2 Eğilim (trend) izleme ve erken uyarı",
          paragraphs: [
            `Tek bir okuma değil, zaman içindeki eğilim önemlidir. Bir silindirin exhaust sıcaklığının diğerlerine göre yavaşça yükselmesi yakıt valfi/injektör sorununa; jacket cooling water sıcaklığının kademeli artışı tıkalı kı’ler veya termostat sorununa; LO basıncının yavaş düşüşü filtre tıkanmasına veya pompa aşınmasına işaret eder.`,
            `Üçüncü/Dördüncü Mühendis bu eğilimleri logbook'taki ardışık kayıtlardan ve alarm/monitoring sistemi trend ekranlarından takip eder. Eğilim limitlere yaklaşırken erken müdahale, ani trip ve büyük arızadan korur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Deviation alarm vs. trend",
              text: `Setpoint alarmı çalmadan önce parametre çoktan sapmaya başlamıştır. İyi bir vardiya mühendisi alarmı bekleyenden değil, eğilimi okuyandan olur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Ana Makine Parametreleri",
      sections: [
        {
          subheading: "3.1 Silindir bazlı performans",
          paragraphs: [
            `Her silindir için exhaust gas temperature, peak pressure (Pmax) ve compression pressure izlenir. Silindirler arası exhaust sıcaklık farkının normalde ±%5 (yaklaşık 30-50°C) bandını aşmaması beklenir. Aşırı yüksek bir silindir aşırı yakıt/geç yanma, düşük silindir ise injektör arızası veya yakıt valfi sıkışmasına işaret edebilir.`,
            `Scavenge air pressure, turbocharger rpm ve scavenge sıcaklığı turboşarjer ve hava sisteminin sağlığını gösterir. Scavenge box sıcaklığında ani yükseliş, scavenge fire (yağ birikimi tutuşması) habercisidir ve derhal müdahale gerektirir.`,
          ],
          table: {
            caption: `Tipik 2-Stroke Ana Makine İzleme Parametreleri (kılavuz aralıklar)`,
            headers: ["Parametre", "Normal Aralık", "Alarm Eğilimi", "Aksiyon"],
            rows: [
              ["Exhaust gas (her silindir)", "320 - 420°C", "Diğerlerinden +40°C", "Injektör/yakıt valfi kontrolü"],
              ["Jacket CW out", "75 - 85°C", ">90°C", "Cooler/termostat/akış kontrolü"],
              ["Piston CO (yağ) out", "45 - 55°C", ">60°C", "Akış ve telltale kontrolü"],
              ["LO inlet basınç", "1.8 - 3.0 bar", "<1.5 bar", "Filtre/pompa, yük düşür"],
              ["Scavenge air basınç", "Yüke bağlı", "Ani düşüş", "T/C ve hava yolu kontrolü"],
            ],
          },
        },
        {
          subheading: "3.2 Soğutma ve yağlama sistemleri",
          paragraphs: [
            `Jacket cooling water, piston cooling oil, ve cylinder lube oil dozajı (feed rate) izlenir. Modern makinelerde cylinder oil feed, yakıt sülfür içeriğine göre ayarlanır; düşük sülfürlü yakıtta yüksek BN yağ aşırı dozajı kalıntı (deposit) bırakır, yüksek sülfürlü yakıtta düşük dozaj korozyona yol açar.`,
            `Main bearing, crankpin ve thrust bearing sıcaklıkları ile sump LO seviyesi gözlenir. Crankcase oil mist detector (OMD) çalışır durumda olmalıdır; yüksek oil mist alarmı yaklaşan bir crankcase explosion uyarısıdır ve makine derhal slow/stop edilir, crankcase yeterince soğumadan açılmaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Crankcase explosion riski",
              text: `OMD high mist veya hot spot alarmında kapağı asla hemen açma. Makineyi durdur, yeterince soğut (en az 20-30 dk), ardından dikkatle havalandır. Sıcak crankcase'e oksijen girişi ikincil (daha şiddetli) patlama yaratır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Jeneratör ve Elektrik İzleme",
      sections: [
        {
          subheading: "4.1 Auxiliary engine ve elektrik tablosu",
          paragraphs: [
            `Devredeki jeneratörlerin yükü, exhaust sıcaklıkları, LO basıncı, jacket water sıcaklığı ve yakıt tüketimi izlenir. Paralel çalışan jeneratörlerde load sharing dengeli olmalı; bir setin diğerinden belirgin fazla yük çekmesi governor/AVR ayar sorununa işaret eder.`,
            `Ana switchboard'da bus bar voltajı (örn. 440V), frekans (60 Hz veya 50 Hz), megger/insulation durumu ve önemli tüketicilerin akımı gözlenir. Beklemedeki jeneratörün auto-start devrede olduğu doğrulanır; ani yük artışında veya bir setin tripinde otomatik devreye girmesi blackout'u önler.`,
          ],
          bullets: [
            `Yük (kW), akım (A), voltaj, frekans, güç faktörü`,
            `Standby gen auto-start ve preferential trip ayarları`,
            `Shaft generator / PTO durumu (varsa)`,
            `Emergency generator otomatik start hazırlığı`,
          ],
        },
        {
          subheading: "4.2 Blackout önleme ve recovery hazırlığı",
          paragraphs: [
            `Vardiya mühendisi olası blackout senaryosuna hazırdır: emergency generator'ın otomatik devreye girip girmediği, dead-ship başlatma için yeterli starting air olup olmadığı ve ana makine emergency stop sonrası restart prosedürü bilinir. Manevra veya kısıtlı su yollarında ikinci jeneratör devreye alınarak yedek (redundancy) sağlanır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Manevra öncesi yük yönetimi",
              text: `Dar suya veya manevraya girmeden önce ikinci jeneratörün devreye alınması standarttır. Tek jeneratörle ani bow thruster yükü, frekans çökmesine ve blackout'a yol açabilir; bu da kritik anda dümen/sevk kaybı demektir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Kazan, Kompresör ve Pompalar",
      sections: [
        {
          subheading: "5.1 Kazan ve buhar sistemi",
          paragraphs: [
            `Auxiliary/exhaust gas boiler için buhar basıncı, su seviyesi (gauge glass + remote), feed water sıcaklığı ve brülör durumu izlenir. Su seviyesi en kritik parametredir; low-low level durumunda kazan ateşi otomatik keser (flame failure/low water cut-off). Köpürme (priming/foaming) ve cascade tank kontaminasyonuna karşı dikkatli olunur.`,
            `Exhaust gas economiser'da soot fire riski izlenir; bekleme/düşük yük periyodunda kurum birikimi tutuşabilir. Düzenli soot blowing ve outlet gas sıcaklığı takibi yapılır.`,
          ],
        },
        {
          subheading: "5.2 Hava kompresörleri ve pompalar",
          paragraphs: [
            `Starting air kompresörleri ve servis hava kompresörünün delivery basıncı, sıcaklık ve yağ seviyesi izlenir; main air receiver basıncı (tipik 25-30 bar) ana makine start kabiliyeti için kritiktir. Otomatik drain çalışmazsa receiver'lar manuel boşaltılır (su birikmesi açılma sayısını düşürür).`,
            `Ballast, bilge, transfer, FO/LO servis pompalarının discharge basıncı, sızdırmazlık (gland/seal), titreşim ve yatak sıcaklığı kontrol edilir. Beklemedeki pompaların auto-start devrede olduğu doğrulanır.`,
          ],
          table: {
            caption: `Yardımcı Sistem İzleme Noktaları`,
            headers: ["Ekipman", "Ana Parametre", "Tipik Değer", "Erken Uyarı"],
            rows: [
              ["Main air receiver", "Basınç", "25 - 30 bar", "Yavaş düşüş = kaçak"],
              ["Aux boiler", "Su seviyesi", "Normal band", "Salınım = priming"],
              ["Sea water cooling", "Basınç/Sıcaklık", "Yüke bağlı", "Düşük basınç = filtre/MGPS"],
              ["FO service pump", "Discharge", "8 - 10 bar", "Düşük = filtre/aşınma"],
            ],
          },
        },
      ],
    },
    {
      heading: "6. Soğutma Suyu ve Yakıt Sistemi İzleme",
      sections: [
        {
          subheading: "6.1 Deniz suyu ve merkezi soğutma",
          paragraphs: [
            `Sea water inlet basıncı ve coolerların giriş/çıkış sıcaklık farkı izlenir; sea chest tıkanması veya MGPS arızası central cooler verimini düşürür. Central fresh water cooling sistemde expansion tank seviyesi ve sistem basıncı kontrol edilir; düşüş bir kaçağı, artış gaz/buhar girişini gösterir.`,
          ],
        },
        {
          subheading: "6.2 Yakıt sistemi ve MARPOL Annex VI",
          paragraphs: [
            `FO settling/service tank seviyeleri, viskozite kontrol ünitesi (heater outlet viskozitesi), FO booster basıncı ve filtre ΔP izlenir. ECA bölgesine girişte düşük sülfürlü yakıta geçiş (changeover) zamanlaması ve sıcaklık değişim hızı kontrol edilir; ani sıcaklık değişimi yakıt pompalarında sıkışmaya yol açar.`,
            `MARPOL Annex VI kapsamında kullanılan yakıtın sülfür içeriği (BDN), flowmeter okumaları ve gerekli kayıtlar tutulur. Üçüncü/Dördüncü Mühendis changeover işlemini logbook'a saat ve pozisyon ile kaydeder.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex VI — Sülfür limiti",
              text: `Global limit %0.50 m/m, ECA içinde %0.10 m/m'dir. ECA'ya giriş öncesi yakıt değişimi tamamlanmalı, BDN ve changeover kaydı tutulmalıdır. PSC bu kayıtları denetler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Alarm Yönetimi ve Anormal Durumlar",
      sections: [
        {
          subheading: "7.1 Alarm önceliklendirme",
          paragraphs: [
            `Alarm çaldığında mühendis önce alarmı tanır (acknowledge), sebebini araştırır, ardından gerekirse müdahale eder — kör bir şekilde reset etmez. Kritik alarmlar (LO low pressure, jacket water high temp, oil mist high, bilge high level) ana makine slowdown/shutdown tetikleyebilir; bu durumda köprüüstü derhal bilgilendirilir.`,
            `Birden çok alarm aynı anda çalarsa kök neden aranır; örneğin blackout sonrası onlarca alarm tek bir elektrik kaybından kaynaklanabilir. Mühendis paniğe değil, sistematik teşhise yönelir.`,
          ],
        },
        {
          subheading: "7.2 Raporlama zinciri",
          paragraphs: [
            `Anormal her durum derhal İkinci Mühendis veya nöbetçi Baş Mühendise raporlanır. Üçüncü/Dördüncü Mühendis yetki sınırını bilir: kendi başına müdahale edebileceği işler ile üst onayı/desteği gereken işler ayrılır. Tereddütte üst mühendis çağrılır — bu zayıflık değil, doğru pratiktir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Köprüüstü ile koordinasyon",
              text: `Sevki etkileyen herhangi bir durumda (slowdown, shutdown, dümen sorunu) köprüüstü ANINDA bilgilendirilmelidir. Köprü, manevra payı ve trafik durumuna göre karar verecektir; gecikme çatışma/karaya oturma riski yaratır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Logbook ve Kayıt Disiplini",
      sections: [
        {
          subheading: "8.1 Engine room logbook ve parametre kaydı",
          paragraphs: [
            `Saatlik/vardiya bazlı parametreler engine room logbook'a ve elektronik kayıt sistemine işlenir: ana makine yük/rpm, exhaust sıcaklıkları, soğutma değerleri, jeneratör yükleri, tank seviyeleri, bunker/günlük tüketim ve gerçekleşen olaylar. Kayıtlar okunaklı, gerçek ve zamanında olmalıdır; sahte/geriye dönük kayıt ciddi disiplin ihlalidir.`,
            `Oil Record Book (Part I) kapsamına giren işlemler (bilge transfer, OWS deşarjı, sludge transfer, yakıt aktarımı) ayrıca ORB'ye işlenir. Bu kayıtlar PSC ve mahkemelerde delil niteliği taşır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex I — Oil Record Book",
              text: `Makine dairesi yağ işlemleri ORB Part I'e gecikmeksizin ve doğru kaydedilir. ORB'de tutarsızlık veya magic pipe şüphesi, ağır cezalar ve hapis cezalarıyla sonuçlanmış vakalar doğurmuştur.`,
            },
          ],
        },
        {
          subheading: "8.2 Tüketim ve performans takibi",
          paragraphs: [
            `Günlük yakıt/yağ tüketimi, sefer raporları (noon report) için temel veridir. Beklenen tüketimden sapma, makine performans düşüşü veya ölçüm/kaçak sorununa işaret edebilir. EEXI/CII performans takibi açısından bu veriler kritiktir.`,
          ],
        },
      ],
    },
    {
      heading: "9. Manevra ve Liman Vardiyası",
      sections: [
        {
          subheading: "9.1 Stand-by (manevra) vardiyası",
          paragraphs: [
            `Manevra öncesi "stand-by main engine" talebinde makine manevra moduna alınır: ikinci jeneratör devrede, starting air receiver dolu, FO ısıtması uygun, control test (ahead/astern) yapılmış ve telgraf testi tamamlanmış olur. Üçüncü/Dördüncü Mühendis manevra boyunca telgraf komutlarını ve makine cevabını yakından izler.`,
            `Manevra sırasında ani komut değişiklikleri, çok sayıda start/stop ve crash astern manevralarına hazır olunur; starting air tüketimi ve scavenge sıcaklığı yakından gözlenir.`,
          ],
        },
        {
          subheading: "9.2 Liman vardiyası",
          paragraphs: [
            `Limanda ana makine durur ancak jeneratör, kazan, soğutma, bunkering ve kargo (tankerlerde pompa) operasyonları sürer. Bunkering sırasında mühendis tank seviyelerini, kaçakları ve overflow alarmını izler; deniz kirliliğine karşı SOPEP ekipmanı hazırdır.`,
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Vardiya kontrol listesi",
          bullets: [
            `Devir-teslim eksiksiz yapıldı mı, logbook'a kaydedildi mi?`,
            `Düzenli tur atıldı mı; kaçak/ısı/ses/titreşim kontrol edildi mi?`,
            `Ana makine silindir sıcaklıkları dengeli, LO/JCW normalde mi?`,
            `Jeneratör load sharing dengeli, standby auto-start devrede mi?`,
            `Kazan su seviyesi, hava receiver basıncı, pompa basınçları normal mi?`,
            `Yakıt changeover (ECA) ve BDN/ORB kayıtları güncel mi?`,
            `Alarmlar acknowledge edilip kök neden araştırıldı mı?`,
            `Anormal durumlar üst mühendise raporlandı, köprü bilgilendirildi mi?`,
          ],
          paragraphs: [
            `Makine vardiyası, görünmeyen bir başarı sanatıdır: iyi tutulan bir vardiyada hiçbir şey olmaz çünkü mühendis sorunları daha alarm çalmadan yakalamış, eğilimleri okumuş ve zamanında müdahale etmiştir. Üçüncü/Dördüncü Mühendis'in disiplinli turu, dürüst kaydı ve doğru raporlama refleksi, makine dairesinin ilk savunma hattıdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
