import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Seyir planlamasına destek",
  roleSlug: "guverte-stajyer",
  taskIndex: 1,
  estimatedPages: 25,
  intro: `Güverte Stajyeri (Deck Cadet), seyir planlaması (passage planning) sürecine İkinci Zabit'in (genellikle navigasyon zabiti) gözetiminde destek vererek harita düzeltmeleri, NAVTEX/Notice to Mariners takibi, waypoint hesaplama ve UKC (Under Keel Clearance) kontrolü gibi temel seyir hazırlığı becerilerini kazanır. Bu destek faaliyeti, stajyere SOLAS Bölüm V ve IMO A.893(21) ile çerçevelenen "Appraisal–Planning–Execution–Monitoring" dört aşamalı seyir planlama metodolojisini gerçek ortamda öğretir. Stajyer bağımsız plan onaylama yetkisine sahip değildir; hazırladığı her şey İkinci Zabit ve Kaptan tarafından kontrol edilir. Bu bölüm, stajyerin seyir planlamasına nasıl katkı vereceğini, hangi kaynakları kullanacağını ve hangi hataları önlemesi gerektiğini ayrıntılı olarak açıklar.`,
  sources: [
    "SOLAS Chapter V — Safety of Navigation (Regulation 34 — Voyage planning)",
    "IMO Resolution A.893(21) — Guidelines for Voyage Planning",
    "STCW Convention & Code — Table A-II/1 (Plan and conduct a passage)",
    "IMO Model Course 7.03 — Officer in Charge of a Navigational Watch",
    "Admiralty Notices to Mariners (Weekly Editions) & NP Catalogue",
    "Bridge Procedures Guide (ICS — International Chamber of Shipping)",
    "IHO S-52 / S-57 / S-63 — ECDIS chart standards",
    "Admiralty Manual of Navigation (BR 45) / The Mariner's Handbook (NP100)",
  ],
  chapters: [
    {
      heading: "1. Seyir Planlamasının Temelleri ve Stajyerin Rolü",
      lead: `Seyir planlaması, geminin rıhtımdan rıhtıma (berth to berth) emniyetli, ekonomik ve mevzuata uygun rotasının önceden tasarlanmasıdır; stajyer bu sürece destek vererek planlama disiplinini öğrenir.`,
      sections: [
        {
          subheading: "1.1 Dört aşamalı metodoloji (APEM)",
          paragraphs: [
            `Modern seyir planlaması IMO A.893(21) ile dört aşamada tanımlanır: Appraisal (değerlendirme), Planning (planlama), Execution (icra) ve Monitoring (izleme). Appraisal aşamasında tüm ilgili bilgi toplanır; Planning aşamasında ayrıntılı rota çizilir; Execution geminin planı uygulamasıdır; Monitoring ise plana uyumun sürekli kontrolüdür. Stajyer özellikle ilk iki aşamada (appraisal ve planning) İkinci Zabit'e veri toplayarak ve ön çizim yaparak destek olur.`,
            `Stajyer, seyir planının "berth to berth" yani rıhtımdan rıhtıma yapılması gerektiğini kavrar; planlama yalnızca açık denizi değil, pilot sahasını, demir yerini, manevra alanını ve yanaşma rıhtımını da kapsar. Plan, geminin draftı, manevra kabiliyeti, hava tahmini ve ECDIS/kağıt harita kapsamı dikkate alınarak hazırlanır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/34 — Safe navigation and avoidance of dangerous situations",
              text: `Sefere çıkmadan önce, planlanan sefer için niyet edilen rota; uygun haritalar ve yayınlar kullanılarak planlanmalı, tüm seyir tehlikeleri, hava durumu, gemi manevra kabiliyeti ve çevresel kısıtlamalar göz önünde bulundurulmalıdır.`,
            },
          ],
        },
        {
          subheading: "1.2 Stajyerin destek görevinin sınırları",
          paragraphs: [
            `Stajyer; harita düzeltmelerini yapar, NAVTEX/NtM kayıtlarını işler, mesafe ve rota hesaplarını taslak olarak çıkarır ve UKC tablolarını hazırlar. Ancak bu çalışmaların tümü İkinci Zabit tarafından kontrol edilir ve nihai plan Kaptan tarafından onaylanır. Stajyer, planlama sürecinde yaptığı her işin "bağımsız bir profesyonelin değil, eğitilen bir öğrencinin" çalışması olduğunu unutmaz.`,
            `Stajyer, planlama sırasında karşılaştığı belirsizlikleri (örneğin bir NtM'in haritaya nasıl işleneceği, bir waypoint'in dönüş yarıçapı) çekinmeden İkinci Zabit'e sormalıdır. Yanlış işlenen tek bir düzeltme veya gözden kaçan bir tehlike, gerçek bir seyir riskine dönüşebilir; bu yüzden "emin değilsem sorarım" disiplini hayati önemdedir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Appraisal: Bilgi Toplama ve Kaynaklar",
      sections: [
        {
          subheading: "2.1 Seyir yayınları ve harita kataloğu",
          paragraphs: [
            `Appraisal aşamasında stajyer, gerekli tüm seyir yayınlarının güncel ve gemide mevcut olduğunu kontrol etmeye yardım eder: ilgili haritalar (paper/ENC), Sailing Directions (Pilot Books), List of Lights, List of Radio Signals, Tide Tables, Tidal Stream Atlas, Ocean Passages for the World ve Routeing Charts. Hangi haritaların gerektiği, Admiralty NP Catalogue veya ECDIS chart catalogue üzerinden belirlenir.`,
            `Stajyer, açık deniz geçişleri için "great circle" (büyük daire) ve "rhumb line" rotalarının farkını öğrenir; uzun mesafelerde büyük daire daha kısadır ama her segmentte rota değişimi gerektirir. Ocean Passages for the World ve climatological routeing charts, mevsimsel rüzgar, akıntı, buz sınırı ve tropik fırtına bölgeleri hakkında bilgi verir; stajyer bunları okumayı öğrenir.`,
          ],
          table: {
            caption: `Temel Seyir Yayınları ve İçerikleri (Appraisal Kaynakları)`,
            headers: ["Yayın", "İçerik", "Planlamadaki Kullanımı"],
            rows: [
              ["Sailing Directions (Pilot)", "Kıyı tarifi, liman bilgisi", "Yaklaşma ve tehlike değerlendirme"],
              ["List of Lights (NP74-84)", "Fener karakteristikleri", "Gece seyri ve fix planlaması"],
              ["Tide Tables (NP201-204)", "Gelgit yüksekliği/zamanı", "UKC ve squat hesabı"],
              ["Tidal Stream Atlas", "Akıntı yön/hızı", "ETA ve set/drift düzeltmesi"],
              ["Ocean Passages / Routeing", "Mevsimsel okyanus verisi", "Açık deniz rota seçimi"],
              ["The Mariner's Handbook (NP100)", "Genel seyir bilgisi", "Buz, hava, genel kurallar"],
            ],
          },
        },
        {
          subheading: "2.2 Hava, akıntı ve kısıtlamaların değerlendirilmesi",
          paragraphs: [
            `Stajyer, hava tahmini kaynaklarını (NAVTEX hava bültenleri, weather routing servisi, GMDSS MSI) takip etmeyi ve mevsimsel tehlikeleri (tropik siklon sezonu, buz sınırı, sis bölgeleri) plana yansıtmayı öğrenir. Akıntı ve gelgit, özellikle dar geçitlerde ve liman yaklaşmalarında geçiş zamanlamasını belirler; "tidal window" hesabı stajyerin öğrenmesi gereken kritik bir beceridir.`,
            `Stajyer ayrıca yasal ve fiziksel kısıtlamaları değerlendirmeye yardım eder: TSS (Traffic Separation Schemes), ECA (Emission Control Areas), VTS raporlama hatları, askeri/balıkçılık bölgeleri, derinlik kısıtlamaları ve kanal/boğaz pilotaj zorunlulukları. Bu bilgiler appraisal aşamasında derlenir ve planning aşamasında rotaya işlenir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "No-go area mantığı",
              text: `Appraisal sırasında geminin draftı + UKC payına göre güvenli olmayan tüm sahalar "no-go area" olarak işaretlenir. ECDIS'te bu alanlar görsel olarak belirtilir; stajyer bu alanların rotadan yeterince uzak tutulduğunu doğrulamayı öğrenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Harita Düzeltmeleri ve Notice to Mariners",
      sections: [
        {
          subheading: "3.1 Admiralty Notices to Mariners (NtM) ile düzeltme",
          paragraphs: [
            `Kağıt haritalar, haftalık yayımlanan Admiralty Notices to Mariners ile güncel tutulur. Stajyer, NtM'lerin nasıl okunacağını, hangi haritayı etkilediğini ve düzeltmenin haritaya nasıl işleneceğini (mor mürekkep ile, NtM numarası kenara yazılarak) öğrenir. T&P (Temporary & Preliminary) notices ayrı bir defterde tutulur ve geçici değişiklikleri (örneğin bir fenerin geçici olarak çalışmaması) bildirir.`,
            `Her haritanın sol alt köşesindeki "Small Corrections" satırına işlenen son NtM numarası, haritanın hangi tarihe kadar güncel olduğunu gösterir. Stajyer, bir haritayı seyir için kullanmadan önce bu satırı kontrol etmeyi ve eksik düzeltmeleri tamamlamayı öğrenir. Block correction (tracing) ile yapılan büyük değişikliklerde tracing'in haritaya hizalı yapıştırılması gerektiğini kavrar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Güncellenmemiş harita ile seyir yapılamaz",
              text: `Eksik veya gecikmiş harita düzeltmesi, kaldırılmış bir tehlikeye güvenmek veya yeni bir sığlığı görmemek anlamına gelebilir. Stajyer, düzeltmeleri asla "sonra yaparım" diye ertelememeli; PSC ve kaza soruşturmacıları correction log'unu kontrol eder.`,
            },
          ],
        },
        {
          subheading: "3.2 ENC güncellemeleri ve ECDIS üzerinde düzeltme",
          paragraphs: [
            `ECDIS kullanan gemilerde ENC (Electronic Navigational Chart) güncellemeleri, haftalık update CD/DVD veya online servis (örn. AVCS) ile yapılır. Stajyer, ENC update yükleme sürecini, base/permit yönetimini ve update durumunun (chart status) nasıl doğrulandığını gözlemler. Elektronik güncelleme manuel düzeltmeden hızlı olsa da, update'in başarıyla yüklendiğinin teyidi atlanmamalıdır.`,
            `Stajyer, kağıt ve elektronik harita düzeltme kayıtlarının (Chart Correction Log — NP133A veya elektronik eşdeğeri) titizlikle tutulduğunu öğrenir. Bu kayıt, hangi haritanın hangi NtM'e kadar güncel olduğunun resmi ispatıdır ve denetimlerde sıkça kontrol edilir.`,
          ],
          table: {
            caption: `Kağıt vs. ECDIS Harita Düzeltme Karşılaştırması`,
            headers: ["Unsur", "Kağıt Harita", "ECDIS (ENC)"],
            rows: [
              ["Düzeltme kaynağı", "Weekly NtM", "Weekly ENC update"],
              ["Uygulama", "Manuel (mor mürekkep)", "Otomatik yükleme"],
              ["Kayıt", "NP133A correction log", "Elektronik update log"],
              ["Teyit", "Small corrections satırı", "Chart status / catalogue"],
              ["T&P notices", "Ayrı NP133B defteri", "ENC içinde veya ek bilgi"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. NAVTEX, MSI ve Seyir Uyarılarının Takibi",
      sections: [
        {
          subheading: "4.1 NAVTEX sisteminin işleyişi",
          paragraphs: [
            `NAVTEX (Navigational Telex), GMDSS kapsamında 518 kHz (uluslararası İngilizce), 490 kHz (ulusal dil) ve 4209.5 kHz frekanslarında MSI (Maritime Safety Information) yayını yapan otomatik bir sistemdir. Stajyer, NAVTEX mesajlarının B1-B4 karakter kodlamasını öğrenir: B1 istasyon kimliği, B2 mesaj tipi (A=navigational warning, B=meteorological warning, D=SAR vb.), B3-B4 mesaj sıra numarası.`,
            `Stajyer, A, B ve D tipi mesajların (seyir uyarıları, hava uyarıları, SAR) cihazda asla kapatılamayacağını öğrenir; bu mesajlar emniyet açısından kritiktir. Gelen mesajların gözden geçirilip ilgili olanların plana veya haritaya yansıtılması (örneğin geçici bir engel, batık veya tatbikat sahası) stajyerin destek verdiği rutinlerdendir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "GMDSS — MSI yayını",
              text: `NAVTEX, NAVAREA/METAREA uyarıları ve EGC (Enhanced Group Call / SafetyNET) yoluyla yayılan MSI; seyir uyarılarını, hava tahminlerini ve SAR bilgilerini içerir. Bu bilginin takibi vardiya görevinin ayrılmaz parçasıdır.`,
            },
          ],
        },
        {
          subheading: "4.2 NAVAREA uyarıları ve seyir defterine işleme",
          paragraphs: [
            `Dünya, MSI yayını için 21 NAVAREA/METAREA bölgesine ayrılmıştır; her bölgenin sorumlu koordinatör ülkesi vardır. Açık deniz seyirlerinde NAVTEX menzili dışına çıkıldığında, MSI Inmarsat-C SafetyNET (EGC) üzerinden alınır. Stajyer, hangi bölgede hangi yöntemle uyarı alındığını ve geçilen bölgelere göre alıcı ayarının nasıl yapıldığını öğrenir.`,
            `Stajyer, alınan ve işlenen seyir uyarılarının kayıt altına alındığını gözlemler. İlgili uyarılar passage plan'a not edilir, gereken haritaya işlenir ve süresi dolan uyarılar arşivlenir. Bu disiplin, planlama ile gerçek zamanlı bilgi akışının senkron tutulmasını sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "5. Waypoint Hesaplama ve Rota Tasarımı",
      sections: [
        {
          subheading: "5.1 Waypoint, leg ve rota parametreleri",
          paragraphs: [
            `Rota, ardışık waypoint'ler (dönüş noktaları) ve bunları birleştiren leg'lerden (rota bacakları) oluşur. Stajyer, her leg için rota (course), mesafe (distance), planlanan hız (speed) ve tahmini geçiş süresini hesaplamayı öğrenir. Toplam mesafe ve ortalama hızdan ETA (Estimated Time of Arrival) hesabı, charterer raporlaması ve gelgit penceresi için kritiktir.`,
            `Stajyer, waypoint'lerin güvenli yerlere konumlandırılması gerektiğini öğrenir: dönüşler tehlikelerden uzakta, yeterli su derinliğinde ve gemi dönüş yarıçapına (turning circle / wheel-over point) uygun planlanır. Wheel-over point, dümenin kırılması gereken nokta olup waypoint'in kendisinden önce gelir; bu, geminin dönüş çapı dikkate alınarak hesaplanır.`,
          ],
          table: {
            caption: `Örnek Leg Tablosu (Eğitim Amaçlı Format)`,
            headers: ["WP", "Rota (T)", "Mesafe (NM)", "XTD (NM)", "Min UKC"],
            rows: [
              ["WP01 → WP02", "095°", "42.0", "0.5", "Açık deniz"],
              ["WP02 → WP03", "130°", "18.5", "0.3", "20 m"],
              ["WP03 → WP04", "078°", "6.2", "0.1", "Pilotaj"],
              ["WP04 → Pilot", "045°", "3.0", "0.05", "Dikkatli"],
            ],
          },
        },
        {
          subheading: "5.2 XTD, parallel index ve emniyet payları",
          paragraphs: [
            `Her leg için XTD (Cross-Track Distance / cross-track limit), geminin rotadan ne kadar sapabileceğinin sınırıdır; ECDIS bu limit aşıldığında alarm verir. Stajyer, dar sularda XTD'nin küçük (örn. 0.1 NM), açık denizde daha geniş tutulduğunu öğrenir. XTD, no-go area'lara çarpmadan rota etrafında güvenli bir koridor tanımlar.`,
            `Stajyer, kıyı seyrinde radar ile rota izleme için parallel indexing tekniğini ve clearing bearing/clearing range kavramlarını planlama aşamasında nasıl hazırlandığını öğrenir. Bu yardımcı çizgiler, gemi planlanan rotadan saptığında bunun hızlı fark edilmesini sağlar ve monitoring aşamasının temelini oluşturur.`,
          ],
        },
      ],
    },
    {
      heading: "6. UKC (Under Keel Clearance) ve Squat Hesabı",
      sections: [
        {
          subheading: "6.1 UKC bileşenleri ve şirket politikası",
          paragraphs: [
            `UKC (Under Keel Clearance), geminin omurgası ile deniz tabanı arasındaki net mesafedir. Stajyer, UKC hesabının bileşenlerini öğrenir: charted depth (harita derinliği), gelgit yüksekliği, geminin static draft'ı, squat (hareketten kaynaklı çökme), heel/list etkisi ve dalga payı (wave allowance). Şirket SMS'i genellikle minimum bir UKC payı (örn. açık denizde draftın %10'u, kanalda belirli bir metre) tanımlar.`,
            `Stajyer, charted depth'in chart datum'a (genellikle LAT — Lowest Astronomical Tide) göre verildiğini ve gerçek su derinliği için o anki gelgit yüksekliğinin eklenmesi gerektiğini kavrar. Gelgit yüksekliği Tide Tables'tan, ara zamanlar için "rule of twelfths" veya cebirsel interpolasyon ile bulunur. Stajyer bu hesabı pratik olarak yapmayı öğrenir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi: yetersiz UKC ve karaya oturma",
              text: `Birçok sığ su karaya oturma olayında ortak neden, squat'ın küçümsenmesi veya gelgit penceresinin yanlış hesaplanmasıdır. Ders: UKC hesabı kağıt üzerinde net yapılmalı, squat hız arttıkça hızla büyüdüğü için kritik geçişlerde hız sınırlandırılmalıdır.`,
            },
          ],
        },
        {
          subheading: "6.2 Squat olgusu ve hesabı",
          paragraphs: [
            `Squat, geminin hareket halinde sular altında oluşturduğu basınç düşmesi nedeniyle daha derine batması ve trimini değiştirmesidir. Squat, hız karesiyle orantılı olarak artar ve özellikle sığ su (shallow water) ile dar kanallarda (blockage factor) belirgin hale gelir. Stajyer, ampirik squat formüllerini (örn. Barrass formülü) ve blok katsayısı (Cb) ile ilişkisini öğrenir.`,
            `Stajyer, squat'ın geminin baş veya kıç tarafından daha fazla olabileceğini (genellikle yüksek Cb'li dolu gemilerde baştan) ve bu nedenle en sığ noktada en düşük UKC noktasının hesaba katılması gerektiğini öğrenir. Squat'ı azaltmanın en pratik yolu hızı düşürmektir; bu, sığ su geçişlerinde temel emniyet tedbiridir.`,
          ],
          table: {
            caption: `UKC Hesabı İçin Tipik Bileşenler (Kavramsal)`,
            headers: ["Bileşen", "Etki Yönü", "Kaynak / Belirleme"],
            rows: [
              ["Charted depth", "Artırır", "Harita (chart datum/LAT)"],
              ["Tide height", "Artırır", "Tide Tables / interpolasyon"],
              ["Static draft", "Azaltır", "Draft survey / load condition"],
              ["Squat", "Azaltır", "Hıza bağlı, formül ile"],
              ["Heel / list", "Azaltır", "Stabilite durumu"],
              ["Şirket UKC payı", "Emniyet rezervi", "SMS politikası"],
            ],
          },
        },
      ],
    },
    {
      heading: "7. Harita Okuma ve Sembol Bilgisi",
      sections: [
        {
          subheading: "7.1 Chart 5011 ve sembol kütüphanesi",
          paragraphs: [
            `Stajyer, INT/Admiralty harita sembollerini açıklayan "Chart 5011 — Symbols and Abbreviations Used on Admiralty Charts" yayınını kullanmayı öğrenir. Derinlik rakamları, alçak su hattı (drying height, altı çizili sayı), batıklar (wreck sembolleri ve dangerous/non-dangerous ayrımı), kayalıklar, şamandıralar (IALA buoyage A/B bölgeleri), fener karakteristikleri ve tehlike sembolleri bu kaynaktan öğrenilir.`,
            `Stajyer, IALA buoyage sistemindeki A ve B bölgeleri arasındaki temel farkı (lateral işaretlerde kırmızı/yeşil tarafın ters olması) kavrar. Lateral, kardinal, izole tehlike, emniyetli su ve özel işaret şamandıralarının anlamlarını ve ışık karakteristiklerini ezberlemek, hem planlama hem de vardiya için temel bir yetkinliktir.`,
          ],
        },
        {
          subheading: "7.2 ECDIS sembolleri ve SCAMIN",
          paragraphs: [
            `ECDIS'te ENC sembolleri IHO S-52 standardına göre gösterilir; stajyer base/standard/all display modlarının farkını ve SCAMIN (Scale Minimum) özelliğinin bazı nesneleri belirli ölçeklerde gizleyebileceğini öğrenir. Önemli nesnelerin ölçek seçimi nedeniyle gözden kaçmaması için uygun display ayarı kritiktir.`,
            `Stajyer, ECDIS üzerinde overscale (haritayı kendi ölçeğinden fazla yakınlaştırma) ve underscale uyarılarının anlamını kavrar. Overscale'de gösterilen bilgi yanıltıcı olabilir; bu nedenle her zaman uygun ölçekli (compilation scale'e en yakın) ENC kullanılmalıdır. Bu farkındalık, plan kontrolünün önemli bir parçasıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Chart 5011 her zaman el altında olsun",
              text: `Bir sembolün anlamından emin değilsen tahmin etme; Chart 5011'e bak. Yanlış yorumlanan bir batık veya drying height sembolü, planlamada ciddi bir tehlikenin atlanmasına yol açabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Planın Belgelenmesi ve Onay Süreci",
      sections: [
        {
          subheading: "8.1 Passage plan formu ve eklenecek bilgiler",
          paragraphs: [
            `Tamamlanan passage plan, gemi formatına uygun bir forma işlenir: waypoint listesi, leg parametreleri, no-go area'lar, raporlama noktaları (VTS/coast guard), pilot boarding pozisyonu, demir yeri, UKC kritik noktaları, abort point ve contingency (alternatif) planlar. Stajyer, planın "berth to berth" eksiksiz olmasını ve hiçbir aşamanın boş bırakılmamasını öğrenir.`,
            `Stajyer, plana eklenmesi gereken contingency unsurlarını öğrenir: abort point (geri dönülemez noktaya gelmeden önce manevradan vazgeçilebilecek son nokta), emergency anchorage (acil demir yeri), no-go area'lara karşı emniyet hatları ve makine arızası/seyir kaybı durumunda izlenecek prosedür. Bu unsurlar, planın yalnızca "ideal durum" için değil, sorunlu durumlar için de hazırlandığını gösterir.`,
          ],
        },
        {
          subheading: "8.2 İkinci Zabit kontrolü ve Kaptan onayı",
          paragraphs: [
            `Hazırlanan plan önce İkinci Zabit tarafından gözden geçirilir; stajyerin hesapları, harita düzeltmeleri ve waypoint'leri kontrol edilir. Ardından plan Kaptan'a sunulur; Kaptan planı onaylayana kadar plan "taslak" statüsündedir. Tüm köprüüstü ekibi (bridge team), seferden önce plan üzerinden brifing yapar; stajyer bu brifinge katılarak planın bütününü kavrar.`,
            `Stajyer, planın yalnızca bir kağıt çalışması olmadığını, geminin tüm köprüüstü ekibinin paylaştığı bir "ortak zihinsel model" olduğunu öğrenir. Plan, monitoring aşamasında sürekli referans alınır; gerçek koşullar planı geçersiz kılarsa (hava, trafik, arıza), plan kontrollü biçimde revize edilir ve revizyon kaydedilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "STCW A-II/1 — Plan and conduct a passage",
              text: `Operasyonel seviyedeki seyir zabiti, bir geçişi planlama ve gemiyi bu plana göre yönetme yetkinliğine sahip olmalıdır. Stajyer, bu yetkinliğin temelini planlama desteğine katılarak ve her aşamayı TRB'ye işleyerek atar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Seyir planlaması destek kontrol listesi",
          bullets: [
            `Gerekli tüm harita ve seyir yayınları güncel ve mevcut mu?`,
            `Tüm haritalar son NtM'e kadar düzeltildi ve correction log işlendi mi?`,
            `NAVTEX/MSI mesajları takip edilip ilgili olanlar plana yansıtıldı mı?`,
            `Waypoint, leg, course, distance ve ETA hesapları yapıldı mı?`,
            `XTD ve no-go area'lar her leg için tanımlandı mı?`,
            `UKC ve squat kritik noktalar için hesaplandı mı?`,
            `Wheel-over point'ler gemi dönüş çapına göre belirlendi mi?`,
            `Abort point, emergency anchorage ve contingency planları eklendi mi?`,
            `Plan İkinci Zabit'çe kontrol, Kaptan'ca onaylandı mı?`,
            `Tüm destek çalışmaları ve öğrenilen beceriler TRB'ye işlendi mi?`,
          ],
          paragraphs: [
            `Seyir planlamasına destek, güverte stajyerinin geleceğin navigasyon zabitine dönüşme yolundaki en kıymetli eğitim alanlarından biridir. Stajyer burada yalnızca harita düzeltmeyi veya waypoint hesaplamayı değil, "berth to berth" bütüncül düşünmeyi, tehlikeyi önceden görmeyi ve disiplinli belgelemeyi öğrenir. Bu sürecin sonunda elde edilen plan, geminin emniyetli seyrinin yazılı garantisidir; stajyerin bu garantinin oluşumuna katkı vermesi, hem teknik hem de mesleki olgunluğunun göstergesidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
