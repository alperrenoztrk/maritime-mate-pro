import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Motor kontrol ve güç elektroniği",
  roleSlug: "eto",
  taskIndex: 5,
  estimatedPages: 26,
  intro: `Gemideki yüzlerce elektrik motoru (pompalar, fanlar, kompresörler, vinçler, separatörler) farklı yöntemlerle yol verilir ve kontrol edilir. Elektro-Teknik Zabit (ETO); DOL, yıldız-üçgen, soft starter ve VFD starter'ların bakımından, kontaktör/röle ve overload korumalarından, güç elektroniği (VFD) parametre ve donanım sağlığından ve motor yalıtım/vibrasyon izlemesinden sorumludur. Bu bölüm, motor kontrol devrelerinin ve güç elektroniğinin güvenli, verimli ve güvenilir işletimi için gereken bakım metodolojisini somut değerler ve test prosedürleriyle anlatır.`,
  sources: [
    "STCW Code A-III/6 — Electro-technical officer competence table",
    "IEC 60092-301/350 — Electrical Installations in Ships (starters, cables)",
    "IEC 60034 — Rotating Electrical Machines (motor standardı)",
    "IEEE 43 — Recommended Practice for Insulation Resistance Testing",
    "ISO 20816 / ISO 10816 — Mechanical vibration evaluation",
    "IACS UR E / sınıf kuralları (DNV, LR, ABS Part 4 — motor & VFD)",
    "MARPOL Annex VI / EEXI-CII — enerji verimliliği bağlamı",
    "Reeds Marine Electrical Technology / motor üreticisi bakım el kitapları",
  ],
  chapters: [
    {
      heading: "1. Motor Kontrol Yöntemleri ve Seçim Mantığı",
      lead: `Bir motora yol verme yöntemi; motorun gücüne, mekanik yükün karakterine ve şebekenin start akımına dayanma kapasitesine göre seçilir. ETO her yöntemin avantaj/dezavantajını ve bakım gereksinimlerini bilmelidir.`,
      sections: [
        {
          subheading: "1.1 DOL, yıldız-üçgen, soft starter ve VFD karşılaştırması",
          paragraphs: [
            `Direct-on-line (DOL) yol verme en basitidir ancak motor nominal akımının 6-8 katı start akımı çeker; bu nedenle küçük motorlarda (genellikle <15-22 kW) kullanılır. Yıldız-üçgen (star-delta) start akımını yaklaşık 1/3'e düşürür ve orta güçteki motorlarda yaygındır; ancak yıldızdan üçgene geçişte tork ve akım darbesi oluşur.`,
            `Soft starter, tristör (SCR) ile gerilimi kademeli yükselterek yumuşak start sağlar ve mekanik şoku azaltır. VFD (Variable Frequency Drive) ise frekansı ve gerilimi birlikte değiştirerek hem yumuşak start hem de hız kontrolü sunar; pompa ve fanlarda affinity yasası gereği önemli enerji tasarrufu sağlar. ETO, doğru starter tipinin seçildiğini ve her birinin bakımının yapıldığını doğrular.`,
          ],
          table: {
            caption: `Motor Yol Verme Yöntemleri — Karşılaştırma`,
            headers: ["Yöntem", "Start Akımı", "Hız Kontrolü", "Tipik Uygulama"],
            rows: [
              ["DOL", "6-8 × In", "Yok", "Küçük pompa/fan (<22 kW)"],
              ["Yıldız-üçgen", "~2-3 × In", "Yok", "Orta güç pompa/kompresör"],
              ["Soft starter", "2-4 × In (ayarlı)", "Sadece start", "Büyük fan/pompa"],
              ["VFD", "~1 × In", "Tam (0-100%)", "Değişken yük pompa/fan/vinç"],
            ],
          },
        },
        {
          subheading: "1.2 Motor starter panosu yapısı",
          paragraphs: [
            `Motor Control Center (MCC), bir geminin tüm motor starter'larını barındıran modüler panodur. Her starter modülü; ana şalter/sigorta, kontaktör(ler), termik aşırı yük (overload) rölesi, kontrol trafosu ve gösterge/buton içerir. ETO, MCC'nin termal sağlığını, kontaktör durumunu ve kontrol devresi bütünlüğünü periyodik kontrol eder.`,
          ],
        },
      ],
    },
    {
      heading: "2. Kontaktör ve Röle Bakımı",
      sections: [
        {
          subheading: "2.1 Kontaktör kontak aşınması ve bakımı",
          paragraphs: [
            `Kontaktör, motoru şebekeye bağlayan elektromekanik anahtardır; her açma-kapama kontaklarda ark ve aşınma yaratır. ETO, kontak yüzeylerinin aşınma, çukurlaşma (pitting) ve aşırı ısınma belirtilerini kontrol eder. Yanmış veya kaynamış (welded) kontaklar motorun kontrolsüz çalışmasına yol açabileceğinden derhal değiştirilir.`,
            `Kontaktör bobini (coil) gerilimi ve çekme/bırakma davranışı kontrol edilir; titreşimli (chattering) kontaktör, düşük kontrol gerilimi veya kirli kontak işaretidir. ETO, mekanik kilitlerin (özellikle reversing ve yıldız-üçgen uygulamalarında iki kontaktörün aynı anda çekmesini önleyen interlock) sağlamlığını test eder.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Welded (kaynamış) kontak tehlikesi",
              text: `Aşırı start akımı veya ark, kontaktör kontaklarını birbirine kaynatabilir; bu durumda motor stop komutuna rağmen çalışmaya devam eder. Kaynamış kontak tespit edilen kontaktör derhal değiştirilmeli, izolasyon ve LOTO uygulanmalıdır.`,
            },
          ],
        },
        {
          subheading: "2.2 Kontrol röleleri ve zaman röleleri",
          paragraphs: [
            `Kontrol devresindeki yardımcı röleler ve zaman röleleri (özellikle yıldız-üçgen geçiş zamanlaması), start sekansının doğru çalışmasını sağlar. ETO, zaman rölesi ayarının (star-delta geçiş tipik 5-15 sn) doğru olduğunu ve röle kontaklarının temiz olduğunu doğrular. Yanlış zamanlama, geçişte aşırı akım darbesi yaratır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Aşırı Yük (Overload) Koruması ve Ayarları",
      sections: [
        {
          subheading: "3.1 Termik overload rölesi ayarı",
          paragraphs: [
            `Termik overload rölesi, motoru aşırı akımdan (mekanik tıkanma, faz kaybı, aşırı yük) korur. ETO, rölenin akım setpoint'ini motorun nominal (FLA - Full Load Ampere) değerine göre ayarlar; tipik olarak FLA'nın %105-115'i. Çok düşük ayar gereksiz trip, çok yüksek ayar motor yanması demektir.`,
            `Modern elektronik overload röleleri ek koruma sağlar: faz kaybı (single phasing), faz dengesizliği, toprak kaçağı ve thermistor (PTC) girişi ile motor sargı sıcaklığı izleme. ETO, bu fonksiyonların aktif olduğunu ve trip class'ın (genellikle Class 10 veya 20) motor karakterine uygun olduğunu doğrular.`,
          ],
          table: {
            caption: `Overload Rölesi Trip Class ve Tipik Ayarlar`,
            headers: ["Parametre", "Tipik Değer", "Not"],
            rows: [
              ["Akım setpoint", "%105-115 FLA", "Motor etiketine göre"],
              ["Trip class", "Class 10 / 20", "Start süresine göre"],
              ["Faz dengesizlik trip", "%40-50 fark", "Single phasing koruması"],
              ["Reset modu", "Manuel (tercihen)", "Tekrar start'ı önler"],
            ],
          },
        },
        {
          subheading: "3.2 Faz kaybı ve dengesizlik koruması",
          paragraphs: [
            `Bir fazın kaybolması (single phasing), kalan iki fazda aşırı akıma ve hızlı motor yanmasına yol açar. ETO, faz kaybı korumasının aktif olduğunu ve faz dengesizliğinin (akımlar arası fark) izlendiğini doğrular. Üç fazlı motorlarda %5 gerilim dengesizliği, akımda yaklaşık %30 dengesizliğe ve aşırı ısınmaya yol açar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Manuel reset tercih edin",
              text: `Kritik olmayan motorlarda overload sonrası otomatik reset yerine manuel reset ayarlayın. Otomatik reset, kök neden giderilmeden motorun tekrar tekrar start olmasına ve nihayetinde yanmasına yol açabilir. Manuel reset, arızanın araştırılmasını zorunlu kılar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. VFD (Variable Frequency Drive) Çalışma Prensibi",
      sections: [
        {
          subheading: "4.1 Doğrultucu-DC bus-inverter yapısı",
          paragraphs: [
            `VFD üç ana katmandan oluşur: doğrultucu (rectifier) AC'yi DC'ye çevirir, DC bus kapasitör bankı bu DC'yi düzleştirir/depolar, inverter (IGBT) ise PWM ile istenen frekans ve gerilimde AC üretir. Motor hızı, frekansla orantılı (n = 120f/p) ayarlanır. V/f oranı sabit tutularak motor manyetik akısı korunur.`,
            `VFD'ler harmonik akım üretir ve bu, şebeke güç kalitesini etkiler. ETO, büyük VFD'lerde harmonik azaltıcı önlemleri (line reactor, 12/18-puls doğrultucu, active front-end) bilmeli ve filtre elemanlarını kontrol etmelidir. Ayrıca VFD çıkışındaki yüksek dV/dt motor yalıtımını ve rulmanları (bearing current) yorabilir; çıkış reaktörü veya dV/dt filtre kullanılır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Affinity yasası ve enerji tasarrufu",
              text: `Santrifüj pompa/fanlarda güç, hızın küpüyle orantılıdır (P ∝ n³). VFD ile hızı %80'e düşürmek gücü yaklaşık %50'ye indirir. Bu, MARPOL Annex VI EEXI/CII kapsamında önemli yakıt ve emisyon tasarrufu sağlar.`,
            },
          ],
        },
        {
          subheading: "4.2 Parametre kontrolü ve yedekleme",
          paragraphs: [
            `VFD'nin doğru çalışması, doğru parametre setine bağlıdır: motor nameplate değerleri (gerilim, akım, frekans, güç), ramp-up/down süreleri, akım/tork limitleri, minimum/maksimum frekans ve koruma ayarları. ETO, devreye alımda parametreleri kaydeder ve düzenli yedekler; arıza sonrası kart değişiminde bu yedek hızlı restorasyon sağlar.`,
            `ETO, VFD fault log'unu düzenli inceler: overcurrent, overvoltage (DC bus), undervoltage, overtemperature, ground fault ve motor overload trip'leri kök neden analizi için değerlidir. Tekrarlayan bir hata kodu, gelişen bir donanım sorununun erken işaretidir.`,
          ],
        },
      ],
    },
    {
      heading: "5. VFD Donanım Bakımı",
      sections: [
        {
          subheading: "5.1 Soğutma fanı ve sıcaklık yönetimi",
          paragraphs: [
            `VFD'ler önemli ölçüde ısı üretir; soğutma fanları ve heat sink'in temiz olması ömür için kritiktir. ETO, soğutma fanlarının dönüşünü, hava giriş filtrelerinin temizliğini ve heat sink üzerindeki toz/tuz birikimini periyodik kontrol eder. Tıkalı soğutma, IGBT ve kapasitör sıcaklığını yükseltir ve erken arızaya yol açar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "DC bus kapasitör enerjisi",
              text: `VFD enerjisi kesildikten sonra bile DC bus kapasitörlerinde tehlikeli gerilim kalır. Bakım öncesi LOTO uygulanmalı, üreticinin belirttiği boşalma süresi (tipik 5-15 dk) beklenmeli ve voltage detector ile DC bus terminallerinde ölü olduğu teyit edilmelidir.`,
            },
          ],
        },
        {
          subheading: "5.2 DC bus kapasitör sağlığı (capacitor condition)",
          paragraphs: [
            `Elektrolitik DC bus kapasitörleri, VFD'nin en sınırlı ömürlü bileşenidir (tipik 5-10 yıl, sıcaklığa bağlı). Yaşlanma ESR (Equivalent Series Resistance) artışı ve kapasite düşüşü olarak görülür; şişme, sızıntı veya basınç ventili açılması fiziksel arıza belirtisidir. ETO, uzun süre depoda kalan VFD'lerde kapasitörleri yeniden formlamayı (reforming) bilir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Motor Yalıtım Testi (Megger)",
      sections: [
        {
          subheading: "6.1 İzolasyon direnci ölçümü ve değerlendirme",
          paragraphs: [
            `Motor sargı yalıtımı, nem, sıcaklık ve yaşlanma ile bozulur. ETO, motoru izole edip 500 V (LV motor) megger ile sargı-toprak izolasyon direncini (IR) ölçer. IEEE 43'e göre minimum kabul edilebilir IR, sargı gerilimine bağlıdır; pratikte 1 MΩ + nominal kV başına 1 MΩ pratik bir alt sınırdır, ancak trend daha önemlidir.`,
            `Polarization Index (PI = 10 dakika IR / 1 dakika IR) yalıtımın temizlik ve kuruluğunu gösterir; PI < 1 ıslak/kirli yalıtım, PI > 2 sağlıklı yalıtım işaretidir. ETO, ölçümü sıcaklığa göre düzeltir (40°C referans) ve trend kaydı tutar. Düşük değerler space heater ile kurutma gerektirir.`,
          ],
          table: {
            caption: `Motor Yalıtım Testi — Değerlendirme Kriterleri`,
            headers: ["Ölçüm", "İyi", "Şüpheli", "Aksiyon"],
            rows: [
              ["IR (1 dk, 40°C)", "> 100 MΩ", "1-10 MΩ", "Kurut/temizle/araştır"],
              ["Polarization Index", "> 2.0", "1.0-2.0", "Kurutma değerlendir"],
              ["Trend", "Stabil", "Düşüyor", "Sıklığı artır"],
            ],
          },
        },
        {
          subheading: "6.2 Sargı kurutma ve nem yönetimi",
          paragraphs: [
            `Düşük IR ölçülen motorlar space heater devreye alınarak veya harici sıcak hava ile kurutulur. ETO, bekleme motorlarında space heater'ların çalıştığını doğrular; durmuş bir motorun sargısı nem çeker. Kurutma sırasında IR periyodik ölçülür ve değer stabilize olana kadar devam edilir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Vibrasyon İzleme ve Mekanik Sağlık",
      sections: [
        {
          subheading: "7.1 Vibrasyon ölçümü ve değerlendirme",
          paragraphs: [
            `Aşırı motor titreşimi; rulman aşınması, dengesizlik (unbalance), eksenel kaçıklık (misalignment) veya gevşeklik işaretidir. ETO, vibration analyzer ile yatak noktalarında RMS hız (mm/s) ölçer ve ISO 20816 sınırlarıyla karşılaştırır. Spektrum analizi, frekans bileşenlerinden arıza tipini (1× devir = unbalance, 2× = misalignment, yüksek frekans = bearing) ayırt eder.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Rulman arızasının erken tespiti",
              text: `Bir balast pompası motorunda yüksek frekans titreşim bileşeni (bearing defect frekansı) tespit edildi. Planlı bir bakım penceresinde rulman değiştirilince, sefer ortasında ani bir motor arızası ve operasyon kaybı önlendi. Ders: trend takibi, plansız arızayı planlı bakıma dönüştürür.`,
            },
          ],
        },
        {
          subheading: "7.2 Bearing current ve VFD beslemeli motorlar",
          paragraphs: [
            `VFD beslemeli motorlarda yüksek frekanslı common-mode gerilim, mil-toprak arasında parazitik akım (bearing current) yaratır ve rulman yüzeyinde fluting (oyuklanma) hasarına yol açar. ETO, bu motorlarda shaft grounding ring veya yalıtımlı rulman uygulamasının varlığını ve sağlığını kontrol eder.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Motor kontrol ve güç elektroniği kontrol listesi",
          bullets: [
            `Kontaktör kontakları aşınma/kaynama açısından kontrol edildi mi?`,
            `Star-delta/reversing interlock ve zaman röleleri çalışıyor mu?`,
            `Overload setpoint motor FLA'sına göre doğru ayarlı mı?`,
            `Faz kaybı/dengesizlik koruması aktif mi?`,
            `VFD parametreleri yedeklendi, fault log incelendi mi?`,
            `VFD soğutma fanı/filtre temiz, kapasitör sağlığı kontrol edildi mi?`,
            `Kritik motorların megger (IR/PI) değerleri kayıtlı ve trend stabil mi?`,
            `Bekleme motorlarında space heater çalışıyor mu?`,
            `Vibrasyon ölçümleri ISO sınırları içinde, trend takipte mi?`,
            `VFD beslemeli motorlarda shaft grounding/yalıtımlı rulman sağlam mı?`,
          ],
          paragraphs: [
            `Motor kontrol ve güç elektroniği bakımı, görünmez ama sürekli bir disiplin gerektirir: doğru ayarlanmış bir overload rölesi bir motoru yanmaktan kurtarırken, düzenli megger ve vibrasyon trendi plansız arızayı planlı bakıma çevirir. ETO'nun bu alandaki ustalığı, geminin yüzlerce dönen ekipmanını sessizce çalışır tutmakla ve enerji verimliliğine somut katkı sağlamakla ölçülür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
