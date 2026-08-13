import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Makine dairesi emniyet yönetimi",
  roleSlug: "bas-muhendis",
  taskIndex: 3,
  estimatedPages: 25,
  intro: `Makine dairesi, geminin en yüksek yangın yükü, en yoğun sıcak yüzey ve en çok kapalı alan riskini barındıran bölümüdür. Baş Mühendis, yangın algılama, sabit söndürme (CO2, water mist), bilge alarm ve acil kapatma (emergency shutdown) sistemlerinin sürekli çalışır durumda tutulmasından; hot work, enclosed space entry ve LOTO (Lock Out Tag Out) prosedürlerinin denetiminden; emergency generator ve emergency fire pump'ın düzenli testinden sorumludur. Bu bölüm, makine dairesi emniyet bariyerlerini, test rejimini ve acil müdahale organizasyonunu detaylandırır.`,
  sources: [
    "SOLAS Chapter II-2 (Fire Protection, Detection and Extinction)",
    "FSS Code (International Code for Fire Safety Systems)",
    "ISM Code (International Safety Management Code)",
    "SOLAS III/19.3.3 & III/19.3.6 — Enclosed space entry & rescue drills",
    "OCIMF / ISGOTT — Hot Work & Permit-to-Work Guidelines",
    "SOLAS II-1 Reg. 43-44 — Emergency power & generator",
    "IMO MSC.1/Circ.1432 — Maintenance & inspection of fire-protection systems",
  ],
  chapters: [
    {
      heading: "1. Makine Dairesi Risk Profili ve Emniyet Bariyerleri",
      lead: `Makine dairesindeki kazalar nadiren tek bir nedenden olur; genelde birkaç bariyerin aynı anda devre dışı kalmasıyla (Swiss cheese model) gerçekleşir.`,
      sections: [
        {
          subheading: "1.1 Başlıca tehlike kaynakları",
          paragraphs: [
            `Makine dairesinde yangının üç temel bileşeni bir aradadır: yakıt (yağ/yakıt sızıntısı), oksijen (zorlanmış havalandırma) ve tutuşturucu sıcak yüzey (egzoz manifold ~400°C, türbin gövdesi, buhar boruları). Yüksek basınçlı yakıt hattının (HP fuel line) çatlağından sıcak yüzeye püsküren yakıt, dakikalar içinde major yangına dönüşür.`,
            `Diğer riskler: kapalı alan (boş tank, kazan, krank karteri) içinde oksijen yetersizliği veya toksik gaz (H2S, CO), elektrik panolarında ark/yangın, dönen ekipmanda mekanik yakalanma ve yüksek gürültü/sıcaklık. Baş Mühendis bu risklerin her birine karşı katmanlı bariyer (önleme, algılama, sınırlama, müdahale) kurar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-2 Reg. 4 — Probability of ignition",
              text: `Yüksek basınçlı yakıt boruları çift cidarlı (jacketed) olmalı; sıcak yüzeyler ≥220°C ise yalıtılmalı ve yakıt sızıntısının sıcak yüzeye temasını engelleyecek koruma sağlanmalıdır. Bu, en yaygın makine dairesi yangın senaryosunu önler.`,
            },
          ],
        },
        {
          subheading: "1.2 Yangın bölme ve sınırlama",
          paragraphs: [
            `Makine dairesi A-class divisions (A-60/A-30/A-0) ile çevrilidir. Fire dampers, skylight ve ventilasyon kapatma (quick-closing) düzenekleri, yangın anında havayı kesip yangını boğmak içindir. Quick-closing valves (yakıt/yağ tank çıkışları) makine dairesi dışından (remote, genelde fire control station) kapatılabilir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Yangın Algılama Sistemleri",
      sections: [
        {
          subheading: "2.1 Detektör tipleri ve kapsam",
          table: {
            caption: `Makine dairesi yangın algılama elemanları`,
            headers: ["Tip", "Algıladığı", "Tipik konum", "Test sıklığı"],
            rows: [
              ["Heat detector", "Sıcaklık artışı/rate", "Makine üstü, tank top", "Periyodik (PMS)"],
              ["Smoke detector", "Duman partikülü", "Üst güverte, kontrol odası", "Periyodik"],
              ["Flame detector (IR/UV)", "Alev radyasyonu", "Boiler, purifier room", "Periyodik"],
              ["Sample extraction", "Hava örnekleme duman", "Kargo/makine alanları", "Fonksiyon testi"],
              ["Manual call point", "İnsan tetiği", "Çıkışlar, kaçış yolları", "Drill ile"],
            ],
          },
          paragraphs: [
            `Detektörler fire detection panel'e (genelde köprüüstü ve ECR'de tekrar göstergeli) bağlıdır. Sahte alarm (false alarm) yönetimi önemlidir: tekrarlayan sahte alarm, personeli alarma duyarsızlaştırır (alarm fatigue). Kirli detektör, buhar/yağ buğusu ve titreşim sahte alarm nedenidir; düzenli temizlik ve kalibrasyon yapılır.`,
          ],
        },
        {
          subheading: "2.2 Bilge ve seviye alarmları",
          paragraphs: [
            `Bilge high-level alarm, makine dairesi su basmasının (flooding — sea water pipe leak, cooler tube rupture, sea chest valf arızası) erken uyarısıdır. Engine room bilge well ve şaft tüneli seviyesi izlenir. Alarm test edilir ve PMS kaydına işlenir; çalışmayan bilge alarm PSC için ciddi bir bulgudur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Sessiz su basması",
              text: `Sea water cooling tube rupture veya sea chest sızıntısı saatte tonlarca su alabilir. Bilge alarm devre dışıysa veya susturulmuşsa, su basması fark edilmeden makineyi ve elektrik panolarını tehdit eder. Bilge alarmı asla kalıcı olarak override edilmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Sabit Söndürme Sistemleri",
      sections: [
        {
          subheading: "3.1 CO2 total flooding sistemi",
          paragraphs: [
            `CO2 sistemi, makine dairesini tamamen kaplayarak oksijeni boğar (genelde %34+ konsantrasyon hedefi). Boşaltım öncesi: personel tahliyesi (head count!), ventilasyon kapatma, quick-closing valf kapatma, makine durdurma sıralaması ve kapı/damper kapatılır. CO2 release iki aşamalı (pilot + main) ve kasıtlı gecikmeli (pre-discharge alarm) tasarlanır.`,
            `CO2 sistemi yıllık serbest olmayan testlerle (boşaltma hattı blow-through, alarm testi, time-delay testi) kontrol edilir; silindir tartımı (weight/level check) ve hortum hidrostatik testi periyodiktir. Sistem manuel ve hatalı boşaltıma karşı kilitli kabin (CO2 room) içinde tutulur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "CO2 fatal risk — head count",
              text: `CO2 boşaltımı kapalı hacimde insanı saniyeler içinde öldürür. Boşaltım öncesi tam personel sayımı (head count) ve görsel boşluk doğrulaması ZORUNLUDUR. Geçmişte head count atlandığı için makine dairesinde personel kaybedilen ölümlü kazalar olmuştur.`,
            },
          ],
        },
        {
          subheading: "3.2 Water mist / local application ve sprinkler",
          paragraphs: [
            `Modern gemilerde high-pressure water mist sistemi (HI-FOG vb.) total flooding alternatifi veya tamamlayıcısıdır; çok küçük su damlacıkları hem soğutma hem oksijen seyreltme sağlar, CO2'den daha güvenlidir (personel tahliyesi gerektirmez). Local application water spray, ana makine üstü, purifier ve boiler gibi yüksek riskli noktaları hedefler.`,
            `Fixed foam (boiler/oil-fired alanlar) ve portable extinguisher (CO2, foam, dry powder) ile katmanlı koruma sağlanır. Fire main + emergency fire pump suyu, hydrant ve nozzle ile her zaman hazır olmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Acil Güç ve Acil Pompalar",
      sections: [
        {
          subheading: "4.1 Emergency generator",
          paragraphs: [
            `Emergency generator, ana güç kaybında (black-out) SOLAS II-1 Reg. 43 kapsamında otomatik devreye girer ve emergency switchboard üzerinden hayati servisleri (acil aydınlatma, navigation, GMDSS, steering, fire pump, watertight door) besler. Otomatik başlatma 45 saniye içinde tamamlanmalıdır.`,
            `Emergency generator haftalık çalıştırma testi (genelde yükte) ve aylık black-out simülasyonu yapılır; yakıt tankı dolu, batarya şarjlı, başlatma havası/sistem hazır tutulur. Test kayıtları PSC ve klas için kanıttır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-1 Reg. 43-44",
              text: `Emergency power kaynağı makine dairesi dışında, A-class bölme ile ayrılmış ve en üst sürekli güverte üzerinde konumlanmalıdır. 18-36 saat (gemi tipine göre) süre boyunca hayati servisleri besleyebilmelidir.`,
            },
          ],
        },
        {
          subheading: "4.2 Emergency fire pump",
          paragraphs: [
            `Emergency fire pump, makine dairesi yangınında (ana fire pump devre dışı kalabilir) bağımsız güç kaynağı (emergency generator veya ayrı dizel) ile çalışır ve fire main'e basınç sağlar. Makine dairesi dışında, bağımsız sea suction ile konumlanır. Haftalık test edilir; priming, basınç ve debi doğrulanır.`,
          ],
        },
      ],
    },
    {
      heading: "5. İzin Sistemleri: Hot Work ve Permit-to-Work",
      sections: [
        {
          subheading: "5.1 Hot work izin prosedürü",
          paragraphs: [
            `Kaynak, taşlama, kesme gibi sıcak işler, makine dairesinde major yangın kaynağıdır. Hot work permit; gas-free ölçümü (LEL %0, çevre yanıcılardan arındırma), yangın nöbetçisi (fire watch), söndürücü hazır, çevre yakıt/yağ izolasyonu ve Kaptan + Baş Mühendis onayını gerektirir. İş bitiminde ve sonrası 1 saat fire watch sürdürülür.`,
            `Tank/kapalı alan içinde hot work için ek hot work + enclosed space çift izin gerekir. Spark ve sıcak metal damlasının alt katmanlara düşmesi (örn. bilge yağına) gözetilir; alt alanlar da temizlenir ve örtülür.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: İzole edilmemiş hot work",
              text: `Bir gemide bilge alanı yakınında kaynak yapılırken sıcak metal damlası altta biriken yağ-su karışımına düştü ve yangın çıktı. Ders: hot work öncesi alt alanlar mutlaka temizlenir, ateşe dayanıklı örtü serilir ve fire watch yalnız üst noktada değil, damla yolu boyunca tutulur.`,
            },
          ],
        },
        {
          subheading: "5.2 LOTO (Lock Out Tag Out)",
          paragraphs: [
            `Dönen veya enerjili ekipman üzerinde bakım yapılırken LOTO ile enerji kaynağı (elektrik, hidrolik, pnömatik, buhar) fiziksel olarak kilitlenir ve etiketlenir. Yetkisiz devreye almayı önler. Her kilit benzersizdir ve yalnız işi yapan kişi açabilir. Starting air, ana makine turning sırasında en kritik LOTO noktasıdır.`,
          ],
          table: {
            caption: `LOTO uygulanması gereken tipik enerji kaynakları`,
            headers: ["Enerji türü", "İzolasyon noktası", "Risk"],
            rows: [
              ["Elektrik", "Breaker/isolator kilit", "Elektrik çarpması"],
              ["Starting air", "Air supply valf kilit", "Ana makine ani dönmesi"],
              ["Hidrolik", "Pump stop + bleed", "Basınçlı akışkan/hareket"],
              ["Buhar", "Stop valf + drain", "Yanık / basınç"],
              ["Mekanik", "Turning gear engage", "Beklenmedik dönme"],
            ],
          },
        },
      ],
    },
    {
      heading: "6. Kapalı Alan (Enclosed Space) Yönetimi",
      sections: [
        {
          subheading: "6.1 Giriş izni ve atmosfer testi",
          paragraphs: [
            `Boş yakıt tankı, kazan, krank karteri, sintine kuyusu, kofferdam gibi kapalı alanlara giriş enclosed space entry permit ile yapılır. Giriş öncesi atmosfer ölçülür: O2 %20.9, LEL %0, toksik gazlar (H2S, CO) güvenli sınırda. Sürekli havalandırma, standby personel (gözcü), haberleşme ve rescue plan zorunludur.`,
            `SOLAS III/19.3.3 gereği enclosed space entry ve rescue drill en az 2 ayda bir yapılmalıdır; tatbikatın planlanması ve içeriği III/19.3.6 ile IMO Res. A.1050(27) tavsiyelerine dayanır. Kapalı alan kazaları genellikle "kurtarmaya koşan ikinci kişi" ölümleriyle çoğalır; bu yüzden gözcü asla içeri girmez, alarm verir ve donanımlı rescue ekibini bekler.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Çoklu ölüm zinciri",
              text: `Kapalı alan kazalarının büyük kısmı, bilinçsiz düşen ilk kişiyi kurtarmaya hazırlıksız atlayan kurtarıcıların da kaybedilmesiyle olur. Kural: gaz ölçümü olmadan, SCBA ve rescue ekipmanı hazır olmadan ASLA içeri girilmez.`,
            },
          ],
        },
        {
          subheading: "6.2 Krank karteri açma güvenliği",
          paragraphs: [
            `Oil mist alarmı veya sıcak yatak sonrası krank karteri açma özel risk taşır: ani hava girişi (oksijen), sıcak yüzey ve atomize yağ buharı krankcase explosion'ı tetikleyebilir. Bu yüzden makine durdurulduktan sonra en az 15-30 dakika soğuma beklenir, karter kapakları yavaş ve yandan açılır, hiç kimse açılan kapak hizasında durmaz.`,
          ],
        },
      ],
    },
    {
      heading: "7. Acil Kapatma ve İzolasyon Sistemleri",
      sections: [
        {
          subheading: "7.1 Emergency shutdown ve remote stop",
          paragraphs: [
            `Makine dairesi dışından (köprü/fire station) tetiklenebilen acil durdurma: yakıt/yağ transfer pompaları remote stop, separator/booster pompa stop, ventilation fan stop ve quick-closing valve. Bu düzenekler yangının yakıt beslemesini keser. Tüm remote stop'lar periyodik test edilir ve etiketlemesi net olmalıdır.`,
            `Skylight, fire damper ve ventilation kapatma düzenekleri yangın anında dumanı/havayı sınırlamak içindir. Bu mekanik düzeneklerin paslanmadan, sıkışmadan çalışması düzenli yağlama ve fonksiyon testi ile sağlanır.`,
          ],
        },
        {
          subheading: "7.2 Quick-closing valve testi",
          paragraphs: [
            `Yakıt/yağ tankı çıkışlarındaki quick-closing valves, yangında remote olarak kapatılarak yangının yakıt kaynağı kesilir. Bunlar periyodik test edilir; yaylı/pnömatik tetik mekanizması ve valf hareketi doğrulanır. Sıkışmış (kapanmayan) bir QCV, yangın anında felaket anlamına gelir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Tatbikat, Eğitim ve Belgeleme",
      sections: [
        {
          subheading: "8.1 Drill rejimi",
          paragraphs: [
            `ISM Code ve SOLAS gereği düzenli tatbikatlar: fire drill (aylık), abandon ship, enclosed space entry & rescue (2 ayda bir), black-out / emergency generator (aylık), steering gear failure ve oil spill (SOPEP). Baş Mühendis, makine dairesi senaryolarının gerçekçi ve değişken olmasını sağlar; her drill sonrası debrief ve iyileştirme kaydı tutulur.`,
          ],
        },
        {
          subheading: "8.2 Emniyet ekipmanı bakım kaydı",
          paragraphs: [
            `MSC.1/Circ.1432 kapsamında tüm yangın koruma ekipmanı (detektör, CO2, fire pump, portable extinguisher, BA seti, fire damper) bir bakım/test takvimine bağlanır ve PMS'e işlenir. Bu kayıtlar klas annual survey ve PSC denetiminde birincil kanıttır; eksik kayıt deficiency'dir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "ISM Code madde 7 & 8",
              text: `Şirket, kritik operasyonlar için prosedürler (madde 7) ve acil durumlara hazırlık (madde 8) oluşturmak zorundadır. Makine dairesi emniyet prosedürleri ve tatbikat kayıtları, SMS denetiminin odak noktalarındandır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Pratik Kontrol Listesi ve Sonuç",
      sections: [
        {
          subheading: "9.1 Baş Mühendis emniyet kontrol listesi",
          bullets: [
            `Yangın detektörleri çalışır, panel arızasız, sahte alarm yönetiliyor mu?`,
            `CO2/water mist sistemi test edildi; silindir ağırlığı/seviyesi tam mı?`,
            `Bilge high-level alarm aktif ve test edildi mi?`,
            `Emergency generator haftalık testi yapıldı, otomatik start çalışıyor mu?`,
            `Emergency fire pump test edildi, basınç/debi sağlanıyor mu?`,
            `Quick-closing valve ve remote stop'lar test edildi mi?`,
            `Hot work / enclosed space / LOTO izin sistemi uygulanıyor mu?`,
            `Atmosfer ölçüm cihazları kalibre, BA setleri dolu mu?`,
            `Drill takvimi (fire, black-out, enclosed space) güncel mi?`,
            `Tüm emniyet ekipmanı bakım kaydı PMS'te güncel mi?`,
          ],
          paragraphs: [
            `Makine dairesi emniyeti, tek bir ekipmanın değil; önleme, algılama, sınırlama ve müdahale bariyerlerinin sürekli sağlamlığının yönetimidir. Baş Mühendis'in görevi, bu bariyerlerin hiçbirinin "geçici olarak" devre dışı kalmamasını ve her birinin kanıtlanabilir şekilde test edilmiş olmasını güvence altına almaktır. Emniyette kestirme yol, er ya da geç ödenen bir bedeldir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
