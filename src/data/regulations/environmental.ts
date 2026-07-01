import type { RegulationItem } from "./types";

export const environmentalRegulations: RegulationItem[] = [
  {
    slug: "eexi",
    label: "EEXI – Enerji Verimliliği Tasarım İndeksi",
    category: "Çevresel Düzenlemeler",
    overview: "Mevcut gemilerin enerji verimliliğini değerlendiren teknik indeks; 2023'ten itibaren zorunlu, geminin CO₂ emisyon performansını ölçer.",
    history: "EEDI (Energy Efficiency Design Index) 2013'te yeni gemiler için zorunlu hale getirilmiştir. EEXI ise EEDI'nin mevcut gemilere uyarlanmış versiyonu olarak MEPC 76'da (2021) kabul edilmiş ve 1 Ocak 2023'te yürürlüğe girmiştir. EEDI Phase 0'dan Phase 3'e kadar kademeli sıkılaştırma uygulanmış olup, Phase 3 (2025) en sıkı gereklilikleri içerir. EEXI ise mevcut gemilerin tek seferde karşılaması gereken sabit bir eşik değeridir.",
    applicability: [
      "400 GT ve üzeri tüm uluslararası sefer yapan gemiler (MARPOL Ek VI Bölüm 4 kapsamında)",
      "Yeni gemiler EEDI'ye, mevcut gemiler (2023 öncesi kontratı olan) EEXI'ye tabi",
      "Konvansiyonel tahrik olmayan gemiler (yelkenli, çekme/itme araçları) muaf tutulabilir",
      "Gemi tipleri: tanker, bulk carrier, konteyner, genel kargo, gaz taşıyıcı, LNG taşıyıcı, RoRo, yolcu, kombine taşıyıcı, reefer",
    ],
    essentials: [
      "EEXI hesaplaması: attained EEXI ≤ required EEXI (gCO₂/ton·mil)",
      "Formül: EEXI = (∑ PME × CFME × SFCME + ∑ PAE × CFAE × SFCAE) / (fi × fc × Capacity × Vref)",
      "Hesaplama parametreleri: motor gücü (PME), SFC (Specific Fuel Consumption), kapasite (DWT veya GT), referans hız (Vref)",
      "Düzeltme faktörleri: fi (kapasite düzeltme), fc (cubic capacity düzeltme), fw (hava koşulu düzeltme)",
      "Teknik iyileştirme seçenekleri: EPL (Engine Power Limitation), SHAPOLI (Shaft Power Limitation), enerji tasarrufu cihazları (ESD – ducts, fins, bulbs)",
      "EEXI Technical File hazırlama ve bayrak devleti/RO onayı",
      "EPL uygulanan gemilerde minimum propulsion power (adverse conditions): geminin emniyetli seyir kapasitesinin korunması zorunlu",
      "İlk survey sonrası sertifikasyon – IAPP sertifikasına EEXI onayı eklenir",
    ],
    actions: [
      "EEXI hesaplamasını klas/bayrak ile doğrula ve attained EEXI değerini belirle",
      "Required EEXI'yi karşılamıyorsa EPL (Engine Power Limitation) veya SHAPOLI uygula",
      "EPL uygulanacaksa minimum propulsion power değerlendirmesini yap (adverse conditions)",
      "EEXI Technical File'ı hazırla ve gemide bulundur",
      "IAPP sertifikasına EEXI onayını eklet (renewal veya intermediate survey'de)",
      "EPL/SHAPOLI override koşullarını (emergency, maneuvering) prosedürlere yaz ve mürettebatı eğit",
      "Enerji tasarrufu cihazlarını (propeller boss cap fins, Mewis duct vb.) değerlendir",
    ],
    amendments: [
      { year: "2011", description: "MEPC 62 – EEDI yeni gemiler için zorunlu kılındı (MARPOL Ek VI Bölüm 4)" },
      { year: "2021", description: "MEPC 76 – EEXI ve CII düzenlemelerinin kabulü" },
      { year: "2022", description: "MEPC 78 – EEXI hesaplama kılavuzlarının finalize edilmesi" },
      { year: "2023", description: "1 Ocak 2023 – EEXI yürürlük tarihi, ilk annual/intermediate/renewal survey'de uyum zorunlu" },
    ],
    keyArticles: [
      { id: "MARPOL Ek VI Kural 23", title: "EEXI Zorunluluğu", summary: "Mevcut gemilerin attained EEXI değerinin required EEXI'yi aşmaması zorunluluğunu belirler." },
      { id: "MARPOL Ek VI Kural 21", title: "Required EEDI/EEXI", summary: "Gemi tipi ve büyüklüğüne göre required EEDI/EEXI referans çizgisi ve azaltma faktörlerini tanımlar." },
      { id: "MEPC.350(78)", title: "EEXI Hesaplama Kılavuzu", summary: "EEXI hesaplama metodolojisi, düzeltme faktörleri ve doğrulama prosedürlerini detaylandırır." },
      { id: "MEPC.351(78)", title: "EPL/SHAPOLI Kılavuzu", summary: "Motor güç kısıtlama ve şaft güç kısıtlama uygulamasına ilişkin teknik kılavuz." },
    ],
    penalties: [
      "EEXI uyumsuzluğunda IAPP sertifikası düzenlenmez veya yenilenmez",
      "Sertifikasız geminin uluslararası sefer yapması yasaktır",
      "PSC denetimlerinde EEXI uyumsuzluğu tespitinde alıkoyma riski",
      "Bayrak devleti tarafından geminin seferden men edilmesi",
    ],
    detailedSections: [
      {
        heading: "Tasarım verimliliğini ölçen sabit eşik",
        body:
          "EEXI, mevcut gemilerin teknik (tasarım) enerji verimliliğini tek bir sayıyla ölçen ve bu sayıyı bir üst sınıra bağlayan bir düzenlemedir. Yeni gemiler için zaten zorunlu olan EEDI'nin mantığını, halihazırda denizde olan filoya uyarlar. Temel fikir basittir: bir gemi taşıdığı her ton yükü her deniz mili boyunca taşırken ne kadar CO₂ üretiyor? Bu oran (gCO₂/ton·mil) hesaplanan 'attained EEXI' değeridir ve gemi tipi/büyüklüğüne göre belirlenmiş 'required EEXI' eşiğini aşmamalıdır. EEXI bir kez sağlanması gereken statik bir eşiktir; geminin yıl içindeki gerçek performansını değil, tasarımının teorik verimliliğini değerlendirir.",
      },
      {
        heading: "Uyumun sağlanması: EPL ve SHAPOLI",
        body:
          "Birçok mevcut gemi, motoru olduğu gibiyken EEXI eşiğini karşılayamaz. En yaygın uyum yöntemi motor gücünü kısıtlamaktır: Engine Power Limitation (EPL) veya Shaft Power Limitation (SHAPOLI) ile geminin azami gücü sınırlandırılır, böylece referans hızı ve emisyonu düşer. Bu pratikte 'yapısal slow steaming'dir. Ancak gücü kısmak bir riski beraberinde getirir: gemi şiddetli hava ve akıntıda (adverse conditions) manevra ve rota tutma kabiliyetini kaybetmemelidir. Bu yüzden EPL uygulanan gemilerde asgari sevk gücü (minimum propulsion power) değerlendirmesi yapılır. Alternatif olarak enerji tasarrufu cihazları (pervane başlık kanatçıkları, akış yönlendirici duct'lar) verimliliği fiziksel olarak artırabilir.",
      },
      {
        heading: "Belgelendirme ve denetim",
        body:
          "EEXI uyumu, hesapları ve uygulanan kısıtlamaları içeren bir EEXI Technical File ile belgelenir ve gemide bulundurulur. Uyum onayı, ilk yıllık/ara/yenileme sörveyinde IAPP sertifikasına işlenir. EPL veya SHAPOLI uygulandıysa, acil durum ve manevra gibi durumlarda güç sınırının geçici aşılmasına izin veren override koşulları prosedürlere yazılır ve mürettebat bu konuda eğitilir. EEXI uyumu sağlanmazsa IAPP sertifikası yenilenmez ve sertifikasız gemi uluslararası sefer yapamaz; PSC denetiminde uyumsuzluk alıkoyma riski doğurur. EEXI, operasyonel performansı ölçen CII ile birlikte MARPOL Ek VI'nın karbon verimliliği rejiminin iki ayağından biridir.",
      },
      {
        heading: "EEXI hesaplamasının derinlemesine mantığı",
        body:
          "EEXI'nin temelinde, geminin teorik karbon verimliliğini ölçen bir formül yatar: payda, ana ve yardımcı makinelerin gücüne, bunların özgül yakıt tüketimine ve yakıtın karbon faktörüne dayanan toplam CO₂ emisyonunu; payda ise geminin taşıma kapasitesi (DWT veya GT) ile referans hızının (Vref) çarpımını temsil eder. Sonuç gCO₂/ton·mil cinsinden 'ulaşılan EEXI'dir ve gemi tipi ile büyüklüğüne göre belirlenmiş 'gerekli EEXI' referans çizgisini aşmamalıdır; bu referans çizgisi EEDI fazlarındaki azaltma faktörlerine dayanır. Hesaba çeşitli düzeltme faktörleri girer: kapasite düzeltmesi (fi), kübik kapasite düzeltmesi (fc) ve buz sınıfı/hava koşulu gibi faktörler. EEXI, geminin gerçek seyir verisini değil, tasarımının teorik verimliliğini değerlendiren tek seferlik sabit bir eşiktir.",
      },
      {
        heading: "Uyum yöntemleri: EPL, SHAPOLI ve enerji tasarrufu cihazları",
        body:
          "Birçok mevcut gemi, makinesi olduğu gibiyken gerekli EEXI'yi karşılayamaz; en yaygın çözüm güç kısıtlamasıdır. Engine Power Limitation (EPL) motor gücünü, Shaft Power Limitation (SHAPOLI) ise şaft gücünü sınırlandırır; her ikisi de referans hızı ve dolayısıyla emisyonu düşürür ve pratikte 'yapısal slow steaming' anlamına gelir. Ancak gücü kısmanın bir riski vardır: gemi şiddetli hava ve akıntıda (adverse conditions) manevra ve rota tutma kabiliyetini kaybetmemelidir; bu yüzden EPL/SHAPOLI uygulanan gemilerde asgari sevk gücü (minimum propulsion power) değerlendirmesi yapılır ve acil durumlar için güç sınırının geçici aşılmasına izin veren override koşulları prosedürlere yazılır. Alternatif olarak enerji tasarrufu cihazları (pervane başlık kanatçıkları, akış yönlendirici duct'lar, hat optimizasyonu) verimliliği fiziksel olarak artırarak güç kısmaya gerek kalmadan uyum sağlayabilir.",
      },
      {
        heading: "Belgelendirme ve EEDI ile ilişki",
        body:
          "EEXI uyumu, hesapları ve uygulanan güç kısıtlamalarını içeren bir EEXI Technical File ile belgelenir ve gemide bulundurulur; uyum onayı ilk yıllık/ara/yenileme sörveyinde IAPP sertifikasına işlenir. EEXI, yeni gemiler için zorunlu olan EEDI'nin mevcut filoya uyarlanmış kardeşidir: EEDI gemi tasarlanırken bir kez hesaplanırken, EEXI hâlihazırda denizde olan gemilere tek seferlik bir eşik olarak uygulanır. İkisi de tasarım (teknik) verimliliğini ölçtüğü için, geminin yıllık operasyonel performansını ölçen CII ile birlikte düşünülmelidir: EEXI 'gemi ne kadar verimli tasarlanmış', CII ise 'gemi gerçekte ne kadar verimli işletiliyor' sorusuna yanıt verir. Uyum sağlanmazsa IAPP sertifikası yenilenmez ve gemi uluslararası sefer yapamaz.",
      },
    ],
    relatedSlugs: ["cii", "marpol", "iapp-cert", "imo-dcs"],
    resources: [{ label: "IMO EEXI rehberi", href: "https://www.imo.org/en/OurWork/Environment/Pages/EEXI.aspx" }],
  },
  {
    slug: "cii",
    label: "CII – Karbon Yoğunluğu Göstergesi",
    category: "Çevresel Düzenlemeler",
    overview: "Geminin yıllık operasyonel karbon verimliliğini ölçen gösterge; A-E arası derecelendirme ile performans izlenir, düşük performans iyileştirme planı gerektirir.",
    history: "CII, EEXI ile birlikte 2021'de MEPC 76'da kabul edilmiş ve 1 Ocak 2023'te yürürlüğe girmiştir. Yıllık operasyonel verilere dayanan bu gösterge, gemilerin gerçek deniz performansını ölçer. EEXI teknik (tasarım) verimliliği ölçerken, CII operasyonel verimliliği ölçer. 2026'da kapsamlı bir framework gözden geçirmesi planlanmaktadır ve CII hesaplama metodolojisinde değişiklikler beklenmektedir.",
    applicability: [
      "5000 GT ve üzeri uluslararası sefer yapan tüm gemiler",
      "IMO DCS kapsamında veri raporlama zorunluluğu olan gemiler",
      "Kapsam dışı: savaş gemileri, balıkçı gemiler, yat ve ahşap gemiler",
    ],
    essentials: [
      "Yıllık CII hesaplaması: AER (Annual Efficiency Ratio) = toplam CO₂ emisyonu / (kapasite × toplam mesafe) → gCO₂/(dwt·mil)",
      "Alternatif CII metrikleri: cgDIST (yolcu gemileri için), EEPI (yolcu gemileri), clDIST",
      "Rating sistemi: A (çok iyi – superior), B (iyi – minor superior), C (orta – moderate), D (kötü – inferior), E (çok kötü – significant inferior)",
      "Yıllık sıkılaşan referans çizgileri: her yıl required CII %2 düşer (2023-2026)",
      "3 yıl üst üste D veya herhangi bir yılda E rating alan gemi için düzeltici eylem planı (corrective action plan) zorunlu",
      "SEEMP Part III: CII yönetim planı, iyileştirme hedefleri ve doğrulama",
      "Operasyonel önlemler: hız optimizasyonu (slow steaming), rota planlaması (weather routing), trim optimizasyonu, hull/propeller temizliği",
      "Voyage adjustment: kurtarma, buz seyri, STS operasyonları gibi durumlar CII hesaplamasından düşülebilir",
    ],
    actions: [
      "Yakıt tüketimi ve mesafe verilerini düzenli ve doğru kaydet (flowmeter veya BDN bazlı)",
      "CII performansını aylık izle ve yıl sonu rating tahmini yap",
      "C rating sınırına yakınsa operasyonel önlemlerle iyileştirme yap",
      "D veya E rating alınırsa SEEMP Part III'te düzeltici eylem planı hazırla ve bayrak devletine sun",
      "Yıllık CII raporunu bayrak devletine sun (takip eden yılın 31 Mart'ına kadar)",
      "Voyage optimization araçlarını aktif kullan: weather routing, trim optimization, just-in-time arrival",
      "Hull ve pervane temizliğini CII performansına etkisi açısından planlı yap",
    ],
    amendments: [
      { year: "2021", description: "MEPC 76 – CII düzenlemesinin kabulü (MARPOL Ek VI)" },
      { year: "2022", description: "MEPC 78 – CII hesaplama kılavuzları, referans çizgileri ve rating sınırları yayımlandı" },
      { year: "2023", description: "1 Ocak 2023 – CII yürürlük tarihi, ilk CII raporlama yılı" },
      { year: "2024", description: "İlk CII rating'lerin belirlenmesi (2023 verilerine dayalı)" },
      { year: "2026", description: "Planlanan kapsamlı CII framework review – metodoloji ve kapsam değişiklikleri bekleniyor" },
    ],
    keyArticles: [
      { id: "MARPOL Ek VI Kural 28", title: "Operasyonel CII", summary: "Gemilerin yıllık operasyonel CII hesaplaması ve rating belirlenmesi zorunluluğunu belirler." },
      { id: "MEPC.352(78)", title: "CII Hesaplama Kılavuzu", summary: "AER ve diğer CII metriklerinin hesaplama metodolojisini detaylandırır." },
      { id: "MEPC.354(78)", title: "CII Rating Kılavuzu", summary: "A-E rating sınırlarının belirlenmesi ve yıllık sıkılaşma oranlarını tanımlar." },
      { id: "MEPC.355(78)", title: "Düzeltici Eylem Planı", summary: "D veya E rating alan gemiler için zorunlu düzeltici eylem planı gerekliliklerini belirler." },
    ],
    penalties: [
      "3 yıl üst üste D veya herhangi bir yılda E rating durumunda zorunlu düzeltici eylem planı",
      "Düzeltici eylem planı sunulmaması durumunda bayrak devleti yaptırımları (sertifika askıya alma)",
      "Ticari etki: charterer'ların düşük CII rating'e sahip gemileri tercih etmemesi, charter oranlarında düşüş",
      "Finansal etki: düşük CII rating'li gemilerin sigorta primlerinde artış riski",
      "PSC denetimlerinde SEEMP Part III eksikliği veya CII uyumsuzluğu tespitinde eksiklik kaydı",
    ],
    detailedSections: [
      {
        heading: "Operasyonel karbon performansının ölçüsü",
        body:
          "CII, EEXI'nin tamamlayıcısıdır: EEXI geminin tasarımının ne kadar verimli olduğunu ölçerken CII, geminin gerçekte denizde nasıl çalıştığını ölçer. Bir yıl boyunca yakılan toplam yakıttan hesaplanan CO₂, taşınan kapasite ve kat edilen mesafeye bölünerek yıllık karbon yoğunluğu (tipik olarak AER – Annual Efficiency Ratio) bulunur. Aynı gemi, hızlı seyrederse, çok beklerse veya boş seyrederse kötü; optimize edilirse iyi CII alır. Böylece CII, kâğıt üstündeki verimliliği değil, kaptanın ve operatörün günlük kararlarının karbon sonucunu görünür kılar.",
      },
      {
        heading: "A-E derecelendirme ve sıkılaşan çizgiler",
        body:
          "Her gemi yıllık performansına göre A'dan E'ye bir derece alır: A en iyi, E en kötü performansı temsil eder; C kabul edilebilir orta seviyedir. Bu derecelendirmenin kritik özelliği referans çizgilerinin her yıl sıkılaşmasıdır: dünkü C performansı, gereken azaltma nedeniyle birkaç yıl sonra D'ye düşebilir, yani gemi sadece aynı kalarak geride kalır. Üst üste üç yıl D veya herhangi bir yıl E alan gemi, zorunlu bir düzeltici eylem planı (corrective action plan) hazırlamak zorundadır. Bu mekanizma, filoyu sürekli iyileşmeye iter.",
      },
      {
        heading: "İyileştirme yöntemleri ve ticari baskı",
        body:
          "CII'yi iyileştirmenin yolları çoğunlukla operasyoneldir: hız optimizasyonu (slow steaming), hava durumuna göre rota planlaması (weather routing), trim optimizasyonu, gövde ve pervane temizliğiyle sürtünmenin azaltılması, limanda gereksiz beklemeyi azaltan 'tam zamanında varış' (just-in-time). Bu çabalar SEEMP Part III adlı yönetim planında belgelenir. CII'nin yaptırımı yalnızca regülatif değil, güçlü biçimde ticaridir: kiracılar (charterer) düşük dereceli gemilerden kaçınır, bu da navlun gelirini ve geminin değerini düşürür; sigorta ve finansman koşulları da dereceden etkilenebilir. CII, IMO DCS verilerine dayanır ve 2026'da metodolojisinin gözden geçirilmesi beklenmektedir.",
      },
      {
        heading: "AER hesaplaması ve metriklerin derinlemesine yapısı",
        body:
          "CII'nin en yaygın metriği AER'dir (Annual Efficiency Ratio): bir takvim yılında yakılan tüm yakıttan hesaplanan toplam CO₂ emisyonunun, geminin taşıma kapasitesi (DWT) ile o yıl kat ettiği toplam mesafenin çarpımına bölünmesiyle bulunur ve gCO₂/(dwt·mil) cinsinden ifade edilir. AER, kapasite olarak fiilen taşınan yükü değil tasarım taşıma kapasitesini kullandığı için, boş veya yarı dolu seyreden gemileri 'cezalandırır' ve bu, metodolojinin tartışılan yönlerinden biridir. Yolcu ve ro-ro gemileri gibi bazı tipler için brüt tonaj veya yolcu/mesafe esaslı alternatif metrikler (cgDIST, clDIST) kullanılır. Hesaba giren veriler IMO DCS kapsamında toplandığı için CII, DCS'nin doğrudan bir çıktısıdır; kurtarma, buz seyri veya STS gibi bazı özel durumlar için sefer düzeltmeleri (voyage adjustment) emisyondan düşülebilir.",
      },
      {
        heading: "A-E derecelendirme ve yıllık sıkılaşan referans çizgileri",
        body:
          "Hesaplanan yıllık CII, gemi tipi ve büyüklüğüne özgü bir referans çizgisiyle karşılaştırılarak A'dan E'ye bir dereceye dönüştürülür: A üstün, B iyi, C orta (kabul edilebilir), D zayıf, E çok zayıf performansı temsil eder. Sistemin kritik dinamiği, gerekli CII (referans çizgisi) değerinin her yıl belirli bir oranda sıkılaşmasıdır; bu, bir geminin bugünkü C performansının birkaç yıl sonra hiçbir şey değişmeden D'ye düşebileceği anlamına gelir. Yaptırım kademelidir: üst üste üç yıl D veya herhangi bir yıl E derecesi alan gemi, SEEMP Part III kapsamında bir düzeltici eylem planı (corrective action plan) hazırlayıp bayrak devletine sunmak zorundadır. Bu mekanizma, filoyu sürekli ve artan biçimde iyileşmeye iter.",
      },
      {
        heading: "İyileştirme yöntemleri, ticari ve finansal etkiler",
        body:
          "CII'yi iyileştirmenin yolları büyük ölçüde operasyoneldir ve doğrudan kaptan/operatör kararlarına bağlıdır: hız optimizasyonu (slow steaming), hava ve akıntıya göre rota planlaması (weather routing), trim optimizasyonu, gövde ve pervane temizliğiyle sürtünmenin azaltılması, limanda gereksiz beklemeyi azaltan 'tam zamanında varış' (just-in-time arrival) ve mümkünse karadan elektrik kullanımı. Bu çabalar SEEMP Part III yönetim planında belgelenir. CII'nin yaptırımı yalnızca regülatif değil, güçlü biçimde ticaridir: kiracılar (charterer) düşük dereceli gemilerden kaçınır, bu da navlun gelirini ve geminin ikinci el değerini düşürür; finansman ve sigorta koşulları da dereceden etkilenebilir; RightShip gibi platformların GHG değerlendirmeleri bu baskıyı pekiştirir. CII metodolojisinin 2026'da kapsamlı biçimde gözden geçirilmesi beklenmektedir.",
      },
    ],
    relatedSlugs: ["eexi", "imo-dcs", "marpol", "ghg-strategy"],
    resources: [{ label: "IMO CII rehberi", href: "https://www.imo.org/en/OurWork/Environment/Pages/CII.aspx" }],
  },
  {
    slug: "eu-ets",
    label: "EU ETS – AB Emisyon Ticaret Sistemi",
    category: "Çevresel Düzenlemeler",
    overview: "AB limanlarına uğrayan gemilerin CO₂ emisyonlarını kapsayan karbon fiyatlandırma mekanizması; 2024'ten itibaren kademeli uygulama başlar.",
    history: "EU ETS 2005'te endüstriyel sektörler için başlatılmış, dünyanın en büyük karbon ticaret sistemidir. Denizcilik sektörü, 'Fit for 55' paketi kapsamında 2024'te sisteme dahil edilmiştir. EU MRV (Monitoring, Reporting and Verification) düzenlemesi 2018'den beri denizcilik emisyon verisi toplamaktadır ve EU ETS'nin altyapısını oluşturmuştur. Sisteme dahil edilen ilk IMO dışı bölgesel düzenlemedir.",
    applicability: [
      "5000 GT ve üzeri yük ve yolcu gemileri",
      "AB limanları arasındaki seferlerin (intra-EU) emisyonlarının %100'ü kapsanır",
      "AB ile AB dışı liman arasındaki seferlerin (extra-EU) emisyonlarının %50'si kapsanır",
      "AB limanında demirde iken (at berth) emisyonların %100'ü kapsanır",
      "Offshore gemiler, 5000 GT altı gemiler ve savaş gemileri kapsam dışı",
      "Buz sınıfı gemiler için geçici muafiyet/indirim uygulanır",
    ],
    essentials: [
      "İzleme, raporlama ve doğrulama (MRV): yıllık emisyon raporu ve bağımsız doğrulama",
      "Emisyon kotası (EUA – EU Allowance) satın alma ve teslim zorunluluğu: 1 EUA = 1 ton CO₂",
      "Kademeli uygulama: %40 (2024), %70 (2025), %100 (2026'dan itibaren)",
      "Sera gazı kapsamı: CO₂ (2024), CH₄ ve N₂O (2026'dan itibaren)",
      "Administrating authority: geminin son 4 yılda en çok uğradığı AB üye devleti",
      "FuelEU Maritime ile paralel uyum gerekliliği (ayrı düzenleme ama aynı kapsam)",
      "Document of Compliance (DoC): yıllık doğrulama sonrası düzenlenen uyum belgesi",
      "EUA fiyatı piyasada belirlenir (2024 ortalaması ~60-80 €/ton CO₂)",
      "Compliance döngüsü: 1 Ocak – 31 Aralık izleme, 31 Mart rapor, 30 Eylül teslim",
    ],
    actions: [
      "MRV izleme planını hazırla ve doğrulayıcı kuruluşa onaylat",
      "Yakıt tüketimi ve emisyon verilerini düzenli kaydet (BDN, flowmeter, tank sounding)",
      "Yıllık emisyon raporunu doğrulayıcı kuruluşa sun ve onay al (31 Mart)",
      "Emisyon kotası (EUA) ihtiyacını hesapla ve temin et (açık artırma veya ikincil piyasa)",
      "EUA teslim tarihine (30 Eylül) uyum sağla",
      "Maliyet etkisini sefer planlamasına ve charter anlaşmalarına entegre et",
      "Administrating authority'yi belirle ve iletişim kur",
    ],
    amendments: [
      { year: "2018", description: "EU MRV düzenlemesi yürürlüğe girdi – emisyon veri toplama başladı" },
      { year: "2023", description: "Denizcilik sektörünün EU ETS'ye dahil edilmesi yasalaştı (Direktif 2023/959)" },
      { year: "2024", description: "1 Ocak 2024 – denizcilik EU ETS uygulaması başladı (%40 kapsam)" },
      { year: "2025", description: "Kapsam %70'e yükseldi" },
      { year: "2026", description: "%100 kapsam + CH₄ ve N₂O dahil edilecek" },
    ],
    keyArticles: [
      { id: "Direktif 2023/959", title: "EU ETS Denizcilik Değişikliği", summary: "Denizcilik sektörünün EU ETS kapsamına alınmasını düzenleyen temel direktif." },
      { id: "MRV Tüzüğü (2015/757)", title: "İzleme ve Raporlama", summary: "Denizcilik emisyonlarının izlenmesi, raporlanması ve doğrulanması kurallarını belirler." },
      { id: "Delegated Act", title: "Uygulama Detayları", summary: "İzleme planı, doğrulama ve kota teslim prosedürlerinin teknik detaylarını düzenler." },
    ],
    penalties: [
      "Kota teslim edilmemesi durumunda eksik kota başına 100 €/ton CO₂ ceza + kota teslim yükümlülüğü devam eder",
      "2 takvim yılından fazla uyumsuzlukta geminin AB limanlarından yasaklanması (expulsion order)",
      "MRV rapor eksikliğinde Document of Compliance düzenlenmez → AB limanlarına giriş engeli",
      "Doğrulama raporundaki tutarsızlıklar için ek denetim ve ceza riski",
      "Administrating authority değişikliğinde geçiş dönemi yükümlülükleri",
    ],
    detailedSections: [
      {
        heading: "Karbona fiyat koyan bölgesel mekanizma",
        body:
          "EU ETS, denizciliğe getirilen ilk büyük karbon fiyatlandırma sistemidir ve IMO dışı, bölgesel bir AB düzenlemesi olması yönüyle özeldir. Mantığı 'kirleten öder' ilkesine dayanır: bir gemi AB kapsamında ürettiği her ton CO₂ için piyasada işlem gören bir emisyon kotası (EUA – EU Allowance) satın alıp teslim etmek zorundadır. Böylece karbon emisyonu artık bedava değil, fiyatı olan bir maliyet kalemine dönüşür ve gemi operatörü emisyonu azaltarak bu maliyetten kaçınmaya teşvik edilir. Sistem 2018'den beri veri toplayan EU MRV altyapısının üzerine kurulmuştur.",
      },
      {
        heading: "Kapsam, kademeli uygulama ve coğrafi sınırlar",
        body:
          "EU ETS denizcilikte kademeli devreye girer: yükümlülük 2024'te emisyonların %40'ını, 2025'te %70'ini, 2026'dan itibaren %100'ünü kapsar; ayrıca 2026'dan sonra CO₂'ye ek olarak metan ve diazot oksit de dahil edilir. Coğrafi kapsam ince ayarlıdır: iki AB limanı arasındaki seferlerin emisyonunun tamamı, bir AB limanı ile AB dışı liman arasındaki seferlerin yarısı, AB limanında demirde geçen sürenin tamamı kapsanır. Bu tasarım, AB'nin yargı yetkisini aşmadan kaçağı (carbon leakage) sınırlamayı amaçlar. Her gemi, son yıllarda en çok uğradığı AB devletini 'yöneten otorite' olarak alır.",
      },
      {
        heading: "Uyum döngüsü ve yaptırımlar",
        body:
          "EU ETS yıllık bir takvimle işler: yıl boyunca emisyon izlenir, takip eden yılın 31 Mart'ına kadar bağımsız doğrulayıcıya onaylatılmış emisyon raporu sunulur ve 30 Eylül'e kadar yeterli sayıda EUA teslim edilir. Bu yükümlülüklerin maliyeti önemlidir ve charter sözleşmelerinde kimin (armatör mi kiracı mı) ödeyeceği açıkça düzenlenmek zorundadır. Yaptırımlar serttir: eksik teslim edilen her ton için ceza ödenir ve kota teslim borcu yine de devam eder; iki yıldan fazla süren uyumsuzluk geminin AB limanlarından men edilmesine (expulsion order) kadar gidebilir. EU ETS, aynı kapsamdaki FuelEU Maritime ile birlikte AB'nin 'Fit for 55' denizcilik ayağını oluşturur.",
      },
      {
        heading: "Yöneten otorite: hangi üye devlete raporlanır",
        body:
          "Her gemi için tek bir AB üye devleti 'administrating authority' (yöneten otorite) olarak atanır ve operasyonel olarak geminin tüm MRV ve EUA yükümlülüklerinin muhatabı bu devlettir. AB bayraklı gemilerde bu doğrudan bayrak devletidir; AB dışı bayraklı gemilerde ise belirleme, geminin önceki dört izleme döneminde en fazla sayıda AB limanına uğradığı üye devlete göre yapılır ve Komisyon tarafından yayımlanan listede ilan edilir. Bir gemi hiç AB limanına uğramamışsa veya veri yetersizse, ilk uğradığı üye devlet o dönem için otorite sayılır. Pratikte bu, armatörün MRV izleme planını onaylatacağı, doğrulayıcı kuruluşu seçeceği ve Document of Compliance'ı alacağı idari muhatabın değişebileceği, dolayısıyla filo yöneticisinin her gemi için hangi otoritenin geçerli olduğunu ve o otoritenin ulusal uygulama pratiklerini (dil, portal, süre toleransları) takip etmesi gerektiği anlamına gelir. Otorite değişikliği söz konusu olduğunda geçiş dönemi boyunca eski ve yeni otoriteye karşı yükümlülükler örtüşebilir.",
      },
      {
        heading: "Maliyetin armatör-kiracı arasında paylaşımı",
        body:
          "EUA maliyetinin kim tarafından üstlenileceği sözleşmesel bir meseledir, çünkü emisyonu fiilen üreten taraf çoğu zaman kotayı temin etme yükümlülüğü taşıyan taraf değildir. Time charter'da gemiyi işleten ve yakıtı seçen kiracı olduğundan, sektör pratiği EUA maliyetinin kiracıya yansıtılması yönündedir; bu, standart charter parti maddelerine eklenen özel EU ETS klozlarıyla sağlanır ve klozlar tipik olarak armatırın kota temin ve teslim sorumluluğunu üstlenmesini, buna karşılık kiracının gerçek emisyona denk gelen EUA maliyetini armatöre geri ödemesini düzenler. Voyage charter'da ise emisyon büyük ölçüde geminin hız ve rota seçimine bağlı olduğundan maliyet genellikle navlun fiyatına dahil edilir. Bu klozlarda kritik detaylar, hangi tarafın emisyon verisini hesaplayacağı, ödeme tetikleyici tarihlerin (31 Mart raporu, 30 Eylül teslimi) sözleşme takvimine nasıl yansıtılacağı ve EUA piyasa fiyatındaki dalgalanmanın hangi tarafa ait olacağıdır.",
      },
      {
        heading: "%100/%50/%0 kapsam kuralının örnekle işleyişi",
        body:
          "Kapsam yüzdesi geminin seyrettiği güzergaha göre değişir ve bunu somutlaştırmak faydalıdır. Rotterdam'dan Hamburg'a (iki AB limanı arası) yapılan bir sefer intra-EU sayılır ve o seferde harcanan yakıttan kaynaklanan emisyonun tamamı (%100) EUA yükümlülüğüne dahildir. Rotterdam'dan New York'a (bir AB limanından AB dışı bir limana) yapılan sefer extra-EU sayılır ve bu seferin emisyonunun yalnızca yarısı (%50) kapsanır; New York'tan Rotterdam'a dönüş seferi de aynı şekilde %50 kapsanır, dönüş seferinin AB dışı limandan başlaması sonucu değiştirmez. Buna karşılık gemi Rotterdam limanında demirli veya yanaşık haldeyken (at berth) tükettiği yakıttan kaynaklanan emisyon, sefer güzergahından bağımsız olarak %100 kapsanır. AB dışı bir limandan başka bir AB dışı limana yapılan sefer ise tamamen kapsam dışıdır (%0), çünkü sefer hiçbir noktada bir AB limanına uğramaz.",
      },
    ],
    relatedSlugs: ["fueleu-maritime", "imo-dcs", "cii"],
    resources: [{ label: "EU ETS denizcilik", href: "https://climate.ec.europa.eu/eu-action/transport/reducing-emissions-shipping-sector_en" }],
  },
  {
    slug: "fueleu-maritime",
    label: "FuelEU Maritime – AB Yakıt Standardı",
    category: "Çevresel Düzenlemeler",
    overview: "AB limanlarına uğrayan gemilerin kullandığı yakıtların sera gazı yoğunluğunu kademeli olarak azaltmayı hedefleyen AB düzenlemesi.",
    history: "EU Green Deal ve Fit for 55 paketinin parçası olarak 2023'te kabul edilen FuelEU Maritime (Tüzük 2023/1805), 1 Ocak 2025'ten itibaren uygulanmaktadır. EU ETS'den farklı olarak karbon fiyatlandırması yerine yakıtın sera gazı yoğunluğuna limit koyar (yakıt standardı yaklaşımı). Bu düzenleme alternatif yakıtlara geçişi hızlandırmayı hedefler ve denizcilik sektöründe ilk Well-to-Wake düzenlemesidir.",
    applicability: [
      "5000 GT ve üzeri yük ve yolcu gemileri (EU ETS ile aynı kapsam)",
      "AB limanları arasında ve AB-üçüncü ülke seferleri",
      "İntra-EU seferlerinde enerji kullanımının %100'ü, ekstra-EU'da %50'si",
      "Konteyner ve yolcu gemileri için ek OPS (Onshore Power Supply) zorunluluğu",
      "Offshore gemiler ve 5000 GT altı gemiler kapsam dışı",
    ],
    essentials: [
      "GHG yoğunluğu limitleri (gCO₂eq/MJ): 2025 referans değerinden %2, 2030'da %6, 2035'te %14.5, 2040'da %31, 2045'te %62, 2050'de %80 azalma",
      "Well-to-Wake yaklaşımı: yakıtın üretiminden (Well) yanmasına (Wake) kadar tüm yaşam döngüsü emisyonları",
      "WtW faktörleri: her yakıt türü için IMO kılavuzlarına dayalı varsayılan GHG yoğunluğu değerleri",
      "Alternatif yakıt kullanımı teşviki: RFNBO (Renewable Fuels of Non-Biological Origin) kullanımına çarpan bonusu",
      "Wind-assist bonus: rüzgâr itme sistemleri kullanan gemilere GHG yoğunluğu hesaplamasında avantaj",
      "OPS zorunluluğu: 2030'dan itibaren konteyner ve yolcu gemileri AB limanlarında limanda liman elektriği kullanacak",
      "Compliance balance: fazla performansın (surplus) bir sonraki yıla devri veya eksik performansın (deficit) borçlanması",
      "Pooling mekanizması: gemiler arası uyum transferi – düşük GHG yoğunluklu gemi, yüksek yoğunluklu gemiye kredi aktarabilir",
    ],
    actions: [
      "Yakıt GHG yoğunluğunu hesapla ve yıllık limitle karşılaştır",
      "Alternatif yakıt temin stratejisini oluştur (LNG, metanol, biyoyakıt, RFNBO)",
      "OPS uyumluluğunu kontrol et (konteyner/yolcu gemileri için 2030 hedefi)",
      "Compliance balance'ı yıl boyunca izle ve deficit riskini erkenden tespit et",
      "Yıllık raporlama ve bağımsız doğrulama prosedürünü uygula",
      "Pooling fırsatlarını değerlendir (filo içi veya filo dışı kredi ticareti)",
      "Verifying body ile iletişim kur ve izleme planını onaylat",
    ],
    amendments: [
      { year: "2023", description: "FuelEU Maritime Tüzüğü (2023/1805) Avrupa Parlamentosu'nca kabul edildi" },
      { year: "2025", description: "1 Ocak 2025 – %2 azalma hedefi ile uygulama başladı" },
      { year: "2030", description: "OPS zorunluluğu başlayacak, azalma hedefi %6'ya yükselecek" },
      { year: "2035", description: "Azalma hedefi %14.5'e çıkacak" },
      { year: "2050", description: "%80 azalma hedefi – denizcilik yakıtlarında köklü dönüşüm" },
    ],
    keyArticles: [
      { id: "Tüzük 2023/1805 Madde 4", title: "GHG Yoğunluğu Limiti", summary: "Gemilerin kullandığı yakıtların yıllık ortalama GHG yoğunluğu sınırını ve kademeli azaltma hedeflerini belirler." },
      { id: "Madde 5", title: "OPS Zorunluluğu", summary: "Konteyner ve yolcu gemilerinin AB limanlarında liman elektriği kullanma zorunluluğunu düzenler." },
      { id: "Madde 20", title: "Compliance ve Pooling", summary: "Compliance balance mekanizması ve gemiler arası pooling kurallarını belirler." },
      { id: "Ek II", title: "WtW Emisyon Faktörleri", summary: "Yakıt türlerine göre Well-to-Wake GHG yoğunluğu varsayılan değerlerini tanımlar." },
    ],
    penalties: [
      "Compliance deficit durumunda ceza: eksik miktar × 2400 €/ton VLSFO eşdeğeri",
      "2 yıl üst üste compliance deficit'te ceza miktarı %10 artırılır",
      "OPS kullanım ihlalinde ayrı ceza mekanizması uygulanır",
      "Uyum belgesi düzenlenmemesi halinde AB limanlarına giriş kısıtlamaları",
      "Raporlama ve doğrulama eksikliklerinde idari yaptırımlar",
    ],
    detailedSections: [
      {
        heading: "Karbon fiyatı yerine yakıt standardı",
        body:
          "FuelEU Maritime, EU ETS ile aynı gemileri hedefler ama farklı bir kaldıraç kullanır. EU ETS emisyona fiyat koyarken FuelEU, geminin kullandığı enerjinin sera gazı yoğunluğuna doğrudan bir üst limit koyar (gCO₂eq/MJ). Yani 'ne kadar kirletirsen öde' yerine 'kullandığın yakıt giderek daha temiz olmak zorunda' der. Bu yaklaşım, operatörleri zamanla daha düşük karbonlu yakıtlara (biyoyakıt, e-yakıtlar, yeşil metanol/amonyak) geçmeye zorlar. İki düzenleme birlikte çalışır: biri fiyat sinyaliyle, diğeri standart zorunluluğuyla aynı dekarbonizasyon hedefine baskı uygular.",
      },
      {
        heading: "Well-to-Wake bakışı ve kademeli azaltma",
        body:
          "FuelEU'nun en ayırt edici yönü Well-to-Wake (kuyudan pervaneye) yaklaşımıdır: yakıtın yalnızca gemide yanarken (Tank-to-Wake) çıkardığı emisyon değil, üretiminden taşınmasına kadar tüm yaşam döngüsü emisyonu hesaba katılır. Bu önemlidir çünkü bir yakıt gemide temiz yansa bile üretiminde çok karbon salınmış olabilir; WtW bakışı bu 'gizli' emisyonu görünür kılar. İzin verilen GHG yoğunluğu 2025'ten 2050'ye kadar giderek sıkılaşır (%2'den başlayıp %80 azalmaya kadar). Yenilenebilir e-yakıtların (RFNBO) kullanımı çarpan bonuslarıyla, rüzgâr destekli sevk sistemleri de avantajlarla ödüllendirilir.",
      },
      {
        heading: "Esneklik mekanizmaları ve OPS",
        body:
          "FuelEU katı bir yıllık limit dayatmak yerine esneklik araçları sunar. Compliance balance ile bir yıl fazladan yapılan iyileştirme (surplus) sonraki yıla devredilebilir veya eksik kalan (deficit) ödünç alınabilir. Pooling mekanizması ise gemiler arası takasa izin verir: çok temiz çalışan bir gemi, fazlasını standardın altında kalan başka bir gemiye kredi olarak aktarabilir; bu özellikle filo yönetiminde güçlü bir araçtır. Ayrı bir zorunluluk olarak, 2030'dan itibaren konteyner ve yolcu gemileri AB limanlarında demirdeyken karadan elektrik (Onshore Power Supply – OPS) kullanmak zorundadır, böylece limanda motor çalıştırma kaynaklı emisyon ve hava kirliliği ortadan kalkar. Deficit durumunda VLSFO eşdeğeri üzerinden hesaplanan cezalar uygulanır.",
      },
      {
        heading: "Yıllık ortalama yoğunluk nasıl hesaplanır",
        body:
          "FuelEU'nun limiti sefer bazlı değil, geminin takvim yılı boyunca kullandığı tüm enerjinin enerji-ağırlıklı ortalaması üzerinden hesaplanır. Yani gemi bir yıl içinde farklı yakıt türleri (VLSFO, LNG, biyoyakıt karışımı) kullanmışsa, her yakıtın toplam enerji tüketimindeki payı, o yakıtın Well-to-Wake GHG yoğunluk değeriyle çarpılır ve tüm katkılar toplanarak geminin o yılki tek bir ortalama gCO₂eq/MJ değeri elde edilir. Bu ortalama, o yıl için geçerli limitle karşılaştırılır. Bu yöntemin pratik sonucu, tek bir seferde temiz yakıt kullanmanın tek başına yeterli olmadığı, asıl önemli olanın yıl boyunca yakıt karışımının toplam ağırlığıdır; bir gemi yılın büyük kısmında konvansiyonel yakıt kullanıp yılın sonunda kısa bir dönem biyoyakıt yakarak limiti sağlamaya çalışamaz, çünkü düşük hacimli temiz yakıt payı yıllık ortalamayı yeterince aşağı çekmez. Bu da armatörü, alternatif yakıt kullanımını sefer bazlı taktik değil filo çapında sürekli bir strateji olarak planlamaya zorlar.",
      },
      {
        heading: "Deficit'in maliyeti ve havuzlamanın ekonomik mantığı",
        body:
          "Bir gemi yıllık limitin üzerinde kalırsa oluşan deficit, VLSFO eşdeğeri enerji miktarı üzerinden sabit bir ceza oranıyla parasallaştırılır ve bu ceza tek seferlik değildir; deficit ödenmezse borç faizlenerek bir sonraki yıla taşınır ve üst üste iki yıl deficit oluşması cezayı daha da ağırlaştırır. Bu maliyet yapısı, filo içinde pooling'in neden çoğu zaman cezayı doğrudan ödemekten daha ucuza geldiğini açıklar: temiz yakıtla (örneğin yüksek oranda biyoyakıt veya metanol) çalışan bir kardeş gemi, standardın oldukça altında kalarak büyük bir surplus üretir; bu surplus'u deficit'i olan gemiye ticari bir anlaşmayla aktarmak, cezanın tam tutarından daha düşük bir bedelle telafi sağlayabilir çünkü pooling fiyatı taraflar arasında serbestçe pazarlığa açıktır ve piyasa cezası tavan fiyat işlevi görür. Sonuç olarak filo yöneticisi için doğru soru 'bu gemi limiti tek başına karşılıyor mu' değil, 'filonun toplam enerji portföyü limiti karşılıyor mu ve fazlalık nasıl en verimli dağıtılır' sorusudur.",
      },
      {
        heading: "EU ETS ile eşzamanlı uyum zorunluluğu",
        body:
          "FuelEU Maritime ve EU ETS aynı gemileri, aynı seferleri ve büyük ölçüde aynı emisyon verisini hedefler, ancak birbirinin yerine geçmez; bir armatör her iki düzenlemeye de bağımsız olarak ve eşzamanlı uymak zorundadır. EU ETS emisyona doğrudan bir fiyat koyduğu için karbon başına maliyet üretirken, FuelEU yakıtın GHG yoğunluğuna bir teknik tavan koyar; bir gemi EUA alıp ETS yükümlülüğünü karşılasa bile FuelEU limitini aşarsa ayrı bir deficit cezasıyla karşılaşır. Bu ikili yapı, tek bir uyum aracının (örneğin biyoyakıt karışımı kullanmanın) her iki düzenlemeyi de aynı anda etkilediği için stratejik önem taşır: biyoyakıt karışımı hem yakılan CO₂'yi (dolayısıyla EUA ihtiyacını) azaltır hem de yakıtın Well-to-Wake yoğunluğunu (dolayısıyla FuelEU uyumunu) iyileştirir. Bu yüzden armatörler tipik olarak iki düzenlemenin maliyetini birlikte modelleyip tek bir yakıt stratejisiyle her ikisini de optimize etmeye çalışır; sadece birine bakan bir strateji diğerinde beklenmedik bir maliyet doğurabilir.",
      },
    ],
    relatedSlugs: ["eu-ets", "ghg-strategy", "imo-2020"],
    resources: [{ label: "FuelEU Maritime", href: "https://climate.ec.europa.eu/eu-action/transport/reducing-emissions-shipping-sector/fueleu-maritime_en" }],
  },
  {
    slug: "imo-dcs",
    label: "IMO DCS – Veri Toplama Sistemi",
    category: "Çevresel Düzenlemeler",
    overview: "5000 GT üzeri gemilerin yakıt tüketimi ve CO₂ emisyon verilerini toplama ve raporlama sistemi; MARPOL Ek VI kapsamında zorunludur.",
    history: "2016'da MEPC 70'de kabul edilen IMO DCS (Data Collection System), MARPOL Ek VI Kural 22A kapsamında 2019'dan itibaren veri toplamaya başlamıştır. CII hesaplamasının temelini oluşturan bu sistem, IMO'nun küresel emisyon envanterinin oluşturulmasını sağlar. EU MRV ile benzer amaçlara hizmet eder ancak global kapsamlıdır. Toplanan veriler anonim olarak IMO GISIS veritabanında yayımlanır.",
    applicability: [
      "5000 GT ve üzeri uluslararası sefer yapan tüm gemiler",
      "MARPOL Ek VI'ya taraf devletlerin bayraklarını taşıyan gemiler",
      "Kapsam dışı: savaş gemileri, balıkçı gemiler, yat ve ahşap gemiler",
    ],
    essentials: [
      "Toplanan veriler: yıllık yakıt tüketimi (yakıt türüne göre ayrı ayrı), toplam mesafe (deniz mili), toplam çalışma saati (hours underway)",
      "Ek veriler: DWT (tasarım draft), GT, EEDI/EEXI değeri, buz sınıfı",
      "SEEMP Part II: DCS veri toplama planı – veri toplama yöntemleri, hesaplama prosedürleri, kalite kontrol",
      "Veri toplama yöntemleri: BDN (Bunker Delivery Note), tank sounding, flowmeter",
      "Raporlama: bayrak devletine veya yetkili RO'ya takvim yılı bitiminden sonra (31 Mart'a kadar)",
      "Doğrulama: bayrak devleti veya yetkili RO tarafından veri doğrulaması ve onay",
      "Statement of Compliance (SoC): doğrulama sonrası düzenlenen uyum beyanı – gemide bulundurulması zorunlu",
      "IMO GISIS veritabanı: anonim küresel veri havuzu",
    ],
    actions: [
      "SEEMP Part II'yi hazırla ve bayrak devleti/RO'ya onaylat",
      "Yakıt tüketimi verilerini düzenli ve doğru kaydet (her yakıt türü ayrı ayrı)",
      "Mesafe ve çalışma saati verilerini GPS/AIS loglarıyla tutarlı tut",
      "Yıllık DCS raporunu hazırla ve 31 Mart'a kadar bayrak devletine/RO'ya sun",
      "Veri kalitesini doğrula ve tutarsızlıkları açıklayıcı notlarla belgele",
      "SoC'yi gemide güncel tut ve PSC/flag denetimlerinde hazır bulundur",
    ],
    amendments: [
      { year: "2016", description: "MEPC 70 – IMO DCS'nin kabulü (MARPOL Ek VI Kural 22A)" },
      { year: "2019", description: "1 Ocak 2019 – ilk veri toplama yılı başladı" },
      { year: "2020", description: "İlk DCS raporlarının sunulması (2019 verileri)" },
      { year: "2022", description: "MEPC 78 – DCS verilerinin CII hesaplamasında kullanımının kesinleşmesi" },
    ],
    keyArticles: [
      { id: "MARPOL Ek VI Kural 22A", title: "Veri Toplama", summary: "5000 GT üzeri gemilerin yakıt tüketimi ve operasyonel verilerinin toplanması zorunluluğunu belirler." },
      { id: "MEPC.278(70)", title: "DCS Değişiklikleri", summary: "MARPOL Ek VI'ya DCS ile ilgili eklenen kuralları içerir." },
      { id: "MEPC.282(70)", title: "DCS Kılavuzu", summary: "Veri toplama ve raporlama prosedürlerinin detaylarını belirler." },
    ],
    penalties: [
      "SoC olmadan uluslararası sefer yapılamaz",
      "Veri raporlama eksikliğinde bayrak devleti tarafından sertifika askıya alma riski",
      "PSC denetimlerinde SoC veya SEEMP Part II eksikliğinde eksiklik kaydı ve potansiyel alıkoyma",
      "CII rating hesaplanamaz → SEEMP Part III uyumsuzluğu",
    ],
    detailedSections: [
      {
        heading: "Karbon yönetiminin veri temeli",
        body:
          "IMO DCS, denizcilik dekarbonizasyonunun görünmeyen ama vazgeçilmez altyapısıdır: 'ölçmediğini yönetemezsin' ilkesini hayata geçirir. 5000 GT üzeri gemiler, yıllık yakıt tüketimlerini her yakıt türü için ayrı ayrı, kat ettikleri toplam mesafeyi ve seyirde geçen toplam saati raporlamak zorundadır. Bu veriler hem IMO'nun küresel emisyon envanterini oluşturmasını sağlar hem de CII derecelendirmesinin doğrudan girdisidir. AB'nin MRV sistemiyle benzer amaca hizmet eder, ancak DCS küresel kapsamlıdır ve toplanan veriler anonimleştirilerek IMO GISIS veritabanında yayımlanır.",
      },
      {
        heading: "Toplama, doğrulama ve belgelendirme",
        body:
          "DCS, bir veri kalite zinciri olarak tasarlanmıştır. Gemi, verilerini nasıl toplayacağını ve hesaplayacağını önceden SEEMP Part II adlı bir planda tanımlar ve bunu bayrak devletine veya yetkili klas kuruluşuna onaylatır. Yakıt tüketimi BDN (Bunker Delivery Note), tank iskandili veya akış ölçerle ölçülür; mesafe ve çalışma saati GPS/AIS loglarıyla tutarlı olmalıdır. Takvim yılı bitiminde veriler 31 Mart'a kadar raporlanır, bağımsızca doğrulanır ve uyum kanıtı olarak bir Statement of Compliance (SoC) düzenlenir. SoC gemide bulundurulmak zorundadır; olmadan uluslararası sefer yapılamaz ve PSC denetiminde eksikliği alıkoymaya kadar gidebilir.",
      },
      {
        heading: "Veri kalitesinin CII derecelendirmesine yansıması",
        body:
          "DCS'in kağıt üzerinde bir raporlama formalitesi gibi görünmesi yanıltıcıdır; toplanan veri, CII derecelendirmesinin hesaplandığı ham girdidir ve veri kalitesindeki her hata doğrudan derecelendirmeye taşınır. Bunker teslimatının hacim veya yoğunluk ölçümünde yapılan bir hata, tank iskandilinin dalgalı denizde yanlış okunması veya bir akış ölçerin zamanla kalibrasyondan kayması (flowmeter drift), gerçekte tüketilenden farklı bir yakıt miktarının rapor edilmesine yol açar; bu fark yıllık CO₂ emisyonu hesabını ve dolayısıyla CII oranını (AER) doğrudan bozar. Sistematik olarak düşük ölçülen yakıt tüketimi geminin performansını gerçekte olduğundan iyi gösterirken, fazla ölçülen tüketim geriye dönük düzeltilmesi güç bir düşük derecelendirmeye yol açabilir. Bu nedenle SEEMP Part II'deki kalite kontrol prosedürleri (ölçüm yöntemlerinin çapraz kontrolü, tutarsızlık notları) süslü bir gereklilik değil, karbon performans rejiminin bütünlüğünü koruyan asıl mekanizmadır; DCS'teki bir ölçüm hatası düzeltilmediği sürece CII zincirinin tüm halkalarına yayılır.",
      },
      {
        heading: "Çalışma saati ile mesafe arasındaki fark",
        body:
          "DCS kapsamında toplanan iki farklı operasyonel gösterge birbirinin yerine geçmez: kat edilen toplam mesafe (deniz mili) ve seyirde geçen toplam saat (hours underway) ayrı ayrı raporlanır çünkü ayrı bilgi taşırlar. Demirde veya limanda uzun süre bekleyen ama az mesafe kat eden bir gemi ile açık denizde sürekli seyreden bir gemi, aynı yakıt tüketimine sahip olsa da tamamen farklı bir operasyonel profil sergiler; sadece mesafeye bakan bir analiz demirde geçen süreyi görmezden gelir, sadece saate bakan bir analiz ise hızın ve rotanın etkisini kaybeder. CII hesaplamasında mesafe, taşıma kapasitesiyle çarpılarak transport work'e dönüştürülür ve emisyon yoğunluğunun paydasını oluşturur; bu yüzden bir geminin demirde bekleme süresi uzadıkça (mesafe artmazken yakıt tüketimi devam ettiğinden) derecelendirmesi kötüleşebilir. Bu ayrım, liman gecikmeleri veya bekleme sürelerinin CII üzerindeki etkisini analiz ederken ve SEEMP Part III'te iyileştirme önlemleri tasarlanırken kritik bir girdidir.",
      },
      {
        heading: "GISIS şeffaflığı ve ticari baskı",
        body:
          "Bayrak devletine veya RO'ya raporlanan DCS verileri, IMO tarafından anonimleştirilerek toplulaştırılmış biçimde IMO GISIS veritabanında yayımlanır; anonimleştirme bireysel geminin kimliğini gizlese de sektör genelinde gemi tipi, boyut ve yaş kategorilerine göre karşılaştırmalı performans tabloları oluşturulmasına imkan verir. Bu küresel şeffaflık, DCS'in salt bir düzenleyici yükümlülük olmaktan çıkıp ticari bir baskı aracına dönüşmesini sağlamıştır: charterer'lar ve kargo sahipleri, kiralayacakları gemiyi seçerken DCS temelli verimlilik göstergelerini (CII derecesi, AER trendleri) sorgulamakta, benzer gemiler arasında düşük karbon yoğunluklu olanı tercih etmekte ve bazı büyük yük sahipleri sözleşmelerine minimum CII derecesi şartı koymaktadır. Böylece bir geminin DCS verisi, sadece bayrak devleti denetiminde değil, serbest piyasada navlun kazanma kabiliyetinde de rol oynayan bir performans kartına dönüşmüştür; kötü veri kalitesi veya düşük derecelendirme ticari olarak da maliyetlidir.",
      },
    ],
    relatedSlugs: ["cii", "eexi", "marpol"],
    resources: [{ label: "IMO DCS", href: "https://www.imo.org/en/OurWork/Environment/Pages/Data-Collection-System.aspx" }],
  },
  {
    slug: "imo-2020",
    label: "IMO 2020 – Kükürt Limiti",
    category: "Çevresel Düzenlemeler",
    overview: "Gemi yakıtlarındaki kükürt içeriğini %0.50 m/m ile sınırlayan küresel düzenleme; ECA bölgelerinde %0.10 m/m limiti geçerlidir.",
    history: "MARPOL Ek VI Kural 14 kapsamındaki küresel kükürt limiti, kademeli olarak düşürülmüştür: %4.50 → %3.50 (2012) → %0.50 (1 Ocak 2020). ECA bölgelerinde: %1.50 → %1.00 (2010) → %0.10 (2015). 2020 değişikliği denizcilik yakıt piyasasını temelden dönüştürmüş, HSFO'dan VLSFO/LSFO'ya geçişi zorunlu kılmıştır. 1 Mart 2020'den itibaren scrubber'sız gemilerde uyumsuz yakıtın bulundurulması da (carriage ban) yasaklanmıştır.",
    applicability: [
      "Tüm gemiler (boyut ve tip sınırı yok – dünya genelinde geçerli)",
      "ECA bölgeleri: Baltık Denizi, Kuzey Denizi, Kuzey Amerika ECA (ABD + Kanada 200 mil), ABD Karayip ECA",
      "Akdeniz ECA: MEPC 82'de (2025) belirlendi, 1 Mayıs 2028'de yürürlüğe girecek",
      "Planlanan Norveç Fiord ECA: NOx ve SOx sınırlı bölge",
    ],
    essentials: [
      "Küresel limit: %0.50 m/m SOx (1 Ocak 2020'den itibaren)",
      "ECA bölgeleri: %0.10 m/m SOx (1 Ocak 2015'ten itibaren)",
      "Uyum seçenekleri: (1) Uyumlu yakıt kullanımı – VLSFO (%0.50), LSFO, MGO/MDO (%0.10), (2) EGCS (Exhaust Gas Cleaning System / scrubber), (3) Alternatif yakıt (LNG, metanol vb.)",
      "EGCS tipleri: open-loop (deniz suyu), closed-loop (NaOH), hybrid",
      "Yakıt numune alma ve saklama: MARPOL representative sample (mühürlü, 12 ay saklanır) + in-use/onboard sample",
      "BDN (Bunker Delivery Note) gereklilikleri: yakıt özellikleri, kükürt içeriği, tedarikçi bilgileri – 3 yıl saklama",
      "Carriage ban: EGCS olmayan gemilerde %0.50 üzeri kükürt içerikli yakıtın bulundurulması yasak (1 Mart 2020)",
      "Fuel Oil Non-Availability Report (FONAR): uyumlu yakıt bulunamadığında bayrak devletine ve liman devletine bildirim",
      "EGCS washwater deşarj kriterleri: pH, PAH, bulanıklık limitleri",
    ],
    actions: [
      "Yakıt kükürt içeriğini BDN ile doğrula ve uyumlu yakıt kullandığını belgele",
      "ECA giriş/çıkışında yakıt değişimini (fuel changeover) prosedüre uygun yap ve ORB'ye kaydet",
      "EGCS kullanımında emisyon verilerini sürekli izle ve washwater kalitesini kontrol et",
      "Yakıt numunelerini mühürlü şekilde 12 ay sakla (MARPOL representative sample)",
      "BDN'leri 3 yıl boyunca gemide sakla ve denetim sırasında ibraz et",
      "Uyumsuz yakıt tespitinde derhal bayrak devletine ve sonraki liman devletine bildir",
      "FONAR prosedürünü mürettebatla gözden geçir ve gerektiğinde uygula",
    ],
    amendments: [
      { year: "2005", description: "MARPOL Ek VI yürürlüğe girdi – ilk küresel SOx düzenlemesi" },
      { year: "2008", description: "MEPC 58 – ECA bölgelerinde %0.10 limiti ve küresel %0.50 hedefi revize edildi" },
      { year: "2012", description: "Küresel limit %4.50'den %3.50'ye düşürüldü" },
      { year: "2015", description: "ECA bölgelerinde %0.10 limiti yürürlüğe girdi" },
      { year: "2020", description: "1 Ocak 2020 – küresel %0.50 limiti yürürlük + 1 Mart carriage ban" },
      { year: "2025", description: "MEPC 82 – Akdeniz SOx ECA bölgesi kabul edildi (yürürlük: 2028)" },
    ],
    keyArticles: [
      { id: "MARPOL Ek VI Kural 14", title: "SOx ve Partikül Madde", summary: "Küresel ve ECA bölgelerindeki yakıt kükürt limitleri ile EGCS alternatifini düzenler." },
      { id: "Kural 18", title: "Yakıt Kalitesi", summary: "BDN gereklilikleri, yakıt numune alma ve saklama prosedürlerini belirler." },
      { id: "MEPC.320(74)", title: "Carriage Ban", summary: "EGCS olmayan gemilerde uyumsuz yakıtın bulundurulmasının yasaklanmasını düzenler." },
      { id: "MEPC.259(68)", title: "EGCS Kılavuzu", summary: "Egzoz gazı temizleme sistemlerinin onayı ve washwater deşarj kriterlerini belirler." },
    ],
    penalties: [
      "Uyumsuz yakıt kullanımında ağır para cezaları (ülkeye göre farklılık gösterir – binlerce dolardan milyonlara)",
      "Geminin alıkonması (detention) ve IAPP sertifikasının askıya alınması",
      "ABD'de APPS kapsamında kasıtlı ihlalde hapis cezası ve çok yüksek para cezaları",
      "Singapur'da ilk ihlalde 10.000 SGD, tekrarında 50.000+ SGD ceza",
      "Carriage ban ihlalinde yakıtın tahliyesi zorunluluğu ve ek cezalar",
    ],
    detailedSections: [
      {
        heading: "Yakıt piyasasını dönüştüren kükürt limiti",
        body:
          "IMO 2020 olarak anılan düzenleme, gemi yakıtındaki kükürt içeriğini küresel ölçekte %3,50'den %0,50'ye düşürerek denizcilik tarihinin en büyük yakıt geçişlerinden birini tetiklemiştir. Amacı insan sağlığı ve çevredir: yakıttaki kükürt yandığında kükürt oksitleri (SOx) ve ince partikül madde oluşturur; bunlar asit yağmuruna, solunum hastalıklarına ve erken ölümlere yol açar. Düzenleme, Emisyon Kontrol Alanlarında (ECA – Baltık, Kuzey Denizi, Kuzey Amerika) zaten yürürlükte olan %0,10 limitinin yanına, dünyanın geri kalanı için %0,50'lik küresel bir tavan koyar. Akdeniz de 2028'de SOx ECA olacaktır.",
      },
      {
        heading: "Üç uyum yolu",
        body:
          "Gemiler limite üç yoldan uyabilir. Birincisi, kükürdü zaten düşük yakıt kullanmaktır: VLSFO (%0,50), LSFO veya ECA için MGO/MDO (%0,10). İkincisi, yüksek kükürtlü ucuz yakıtı kullanmaya devam edip egzozu bir scrubber (EGCS) ile temizlemektir; açık devre, kapalı devre ve hibrit tipleri vardır, ancak yıkama suyu (washwater) deşarjı pH, PAH ve bulanıklık kriterlerine tabidir ve bazı limanlar açık devre deşarjını yasaklar. Üçüncüsü, LNG veya metanol gibi kükürt içermeyen alternatif yakıtlara geçmektir. Her yolun maliyet, yatırım ve operasyonel sonuçları farklıdır.",
      },
      {
        heading: "Carriage ban, numune ve denetim",
        body:
          "Düzenlemenin denetlenebilirliğini güçlendiren kilit hüküm 'carriage ban'dir: scrubber'ı olmayan gemilerin %0,50 üstü kükürtlü yakıtı sadece kullanması değil, gemide bulundurması bile yasaktır; bu, denetimi basitleştirir. Uyum, BDN'ler (3 yıl saklanır) ve mühürlü yakıt numuneleriyle (12 ay saklanır) belgelenir. ECA'ya giriş-çıkışta yakıt değişimi (changeover) prosedüre uygun yapılır ve yağ kayıt defterine (ORB) işlenir. Uyumlu yakıt hiç bulunamazsa FONAR (Fuel Oil Non-Availability Report) ile bayrak ve liman devleti bilgilendirilir. İhlaller ülkeye göre ağır para cezalarına, alıkoymaya ve ABD'de APPS kapsamında hapse kadar varan yaptırımlara yol açar.",
      },
      {
        heading: "ECA sınırında yakıt değişiminin mühendislik gerçeği",
        body:
          "Bir gemi ECA sınırına yaklaştığında yüksek kükürtlü yakıttan düşük kükürtlü yakıta anlık olarak geçemez; changeover, yakıt tipleri arasındaki viskozite ve yoğunluk farkı nedeniyle zamanlaması dikkatle planlanması gereken bir prosedürdür. HSFO tipik olarak yüksek viskozitede olduğundan yakıt hattında ve makinede ısıtılarak taşınır; MGO gibi düşük kükürtlü distilat yakıtlar ise çok daha düşük viskoziteye sahiptir ve aynı sıcaklıkta pompalanırsa yakıt pompalarında yetersiz yağlama nedeniyle aşınmaya yol açabilir. Bu yüzden changeover, ECA sınırına ulaşmadan yeterince önce (mesafeye ve makine tipine göre değişmekle birlikte genellikle saatler öncesinde) başlatılır; yakıt sıcaklığı kademeli düşürülür, yakıt hatları ve filtreler eski yakıttan tamamen arındırılıncaya (purging) kadar sistem izlenir ve geçiş tamamlanana kadar ara ürün oluşumu ve tıkanma riski takip edilir. Değişim ORB'ye zaman, konum ve tank bilgileriyle kaydedilir; erken veya gecikmiş bir changeover, sınırın yanlış tarafında uyumsuz yakıt kullanımına yol açarak carriage ban ihlaline dönüşebilir.",
      },
      {
        heading: "Açık devre scrubber tartışması ve rota kısıtları",
        body:
          "IMO, egzoz gazı temizleme sistemlerini (EGCS) MEPC.259(68) kılavuzu çerçevesinde onaylamış olsa da bu küresel onay, her limanın veya kıyı devletinin açık devre washwater deşarjını kabul edeceği anlamına gelmez. Açık devre scrubber, egzoz gazındaki kükürt bileşiklerini doğrudan deniz suyuyla yıkayıp asitleşmiş, ağır metal ve PAH içeren suyu denize deşarj eder; bu, açık okyanusta seyrelme kapasitesi yüksek olduğunda kabul edilebilir görülse de kapalı liman havzaları, dar boğazlar veya hassas ekosistemlere sahip sularda yerel kirlilik yoğunluğu endişesi yaratır. Bu nedenle bazı ülkeler ve limanlar (kendi karasularında veya liman sınırları içinde) açık devre deşarjını kısmen veya tamamen yasaklamıştır. Sonuç olarak açık devre scrubber'lı bir gemi, seyahat planlamasında hangi limanların veya bölgelerin açık devre deşarjına izin verdiğini önceden kontrol etmek, yasaklı bölgelerde kapalı devre moduna geçmek (hibrit sistemlerde) veya o bölgede uyumlu düşük kükürtlü yakıta dönmek zorundadır; bu da scrubber yatırımının beklenen operasyonel esnekliğini bölgesel kısıtlarla sınırlar.",
      },
      {
        heading: "Denetimin pratikte nasıl işlediği",
        body:
          "PSC ve bayrak devleti denetimi, uyumu tek bir yöntemle değil birden fazla tamamlayıcı teknikle doğrular. Klasik yöntem yakıt numunesi analizidir: MARPOL representative sample teslim alınırken mühürlenir ve şüphe durumunda laboratuvarda kükürt içeriği ölçülür; bunun yanında denetçi gemide bulunan in-use ve onboard numunelerini de karşılaştırabilir. Bunun ötesinde, deniz üzerinde uzaktan tespit teknolojileri giderek yaygınlaşmıştır: bazı liman otoriteleri ve araştırma kurumları, geminin bacasından çıkan egzoz gazını insansız hava araçlarıyla (sniffer drone) örnekleyerek SO₂/CO₂ oranından anlık kükürt içeriğini tahmin eder; bu yöntem gemiyi durdurmadan tarama yapılmasına imkan verir. Ayrıca uydu tabanlı uzaktan algılama, geniş deniz alanlarında egzoz plümü (plume) yoğunluğunu izleyerek şüpheli gemileri işaretleyebilir ve bu bulgular hedefli PSC denetimlerine veya numune talebine yönlendirilebilir. Bu katmanlı yaklaşım, fiziksel numunenin sağladığı kesinlikle uzaktan taramanın sağladığı geniş kapsamı birleştirir.",
      },
    ],
    relatedSlugs: ["marpol", "iapp-cert"],
    resources: [{ label: "IMO 2020 sulphur limit", href: "https://www.imo.org/en/MediaCentre/HotTopics/Pages/Sulphur-2020.aspx" }],
  },
  {
    slug: "polar-code",
    label: "Polar Code – Kutup Suları Kuralları",
    category: "Çevresel Düzenlemeler",
    overview: "Kutup sularında seyreden gemiler için ek emniyet ve çevre koruma gerekliliklerini belirler; buz sınıfı, ekipman ve operasyon planlamasını kapsar.",
    history: "Kutup sularında artan deniz trafiği (Kuzey Deniz Yolu ve Kuzeybatı Geçidi) nedeniyle IMO, kapsamlı bir kutup kodu geliştirmiştir. 2014'te MSC 94 ve MEPC 68'de kabul edilen Polar Code, 1 Ocak 2017'de yürürlüğe girmiştir. SOLAS Chapter XIV (emniyet bölümü) ve MARPOL Ek I, II, IV, V (çevre bölümü) kapsamında zorunlu kılınmıştır. Antarktik bölgede ayrıca Antarctic Treaty System ve IAATO kuralları da geçerlidir.",
    applicability: [
      "Arktik sularda seyreden tüm SOLAS gemileri (belirli alanlar – IMO tarafından tanımlanmış)",
      "Antarktik sularda (60°S'nin güneyindeki tüm sular) seyreden tüm SOLAS gemileri",
      "Balıkçı gemileri ve yat gibi SOLAS dışı gemiler şu an kapsam dışı (ancak kılavuz niteliğinde uygulama teşvik edilir)",
    ],
    essentials: [
      "Polar Ship Certificate (PSC) ve PWOM (Polar Water Operational Manual) zorunluluğu",
      "Gemi kategorizasyonu: Category A (buzda seyir – PC1-5), Category B (ince buzda seyir – PC6-7), Category C (açık sularda seyir – buz takviyesi gerektirmez)",
      "Polar Class (PC1-PC7): IACS UR standardına göre buz sınıfı – yapısal güçlendirme düzeyi",
      "Operasyonel değerlendirme: buz koşullarında güvenli hız, manevra kabiliyeti, kaçış rotası planlaması",
      "Çevresel koruma: HFO (ağır yakıt) yasağı – Arktik'te 1 Temmuz 2024'ten itibaren (muafiyetlerle), Antarktik'te 2011'den beri yasak",
      "Sıfır deşarj bölgeleri: Antarktik'te pişmemiş çöp ve gıda atığı dışında tüm deşarjlar yasak",
      "Ekipman gereklilikleri: buz seyir radarı, düşük sıcaklık dayanımlı can kurtarma teçhizatı, kış hayatta kalma kitleri, group survival equipment",
      "Mürettebat eğitimi: STCW Manila değişiklikleri kapsamında Polar Code endorsement (Basic ve Advanced)",
      "Seyir planlaması: buz raporları, SAR kapsamı, iletişim kısıtlamaları, karanlık dönemler",
    ],
    actions: [
      "Polar Ship Certificate için gemi değerlendirmesini ve klas ile koordinasyonu yap",
      "PWOM'u rotaya özgü buz ve hava koşullarına, SAR koordinasyonuna ve iletişim planına göre hazırla/güncelle",
      "Kutup suları için ek can kurtarma ve hayatta kalma teçhizatını (thermal protective aids, group survival craft) hazır bulundur",
      "Mürettebata STCW Polar Code eğitimi ve sertifikasyonunu tamamlat (Basic/Advanced)",
      "Buz raporlarını (ice charts, ice patrol) seyir planlamasına entegre et",
      "Arktik'te HFO kullanım yasağına uyum sağla (muafiyet varsa belgele)",
      "Antarktik sularında deşarj yasaklarını titizlikle uygula",
    ],
    amendments: [
      { year: "2014", description: "MSC 94 ve MEPC 68 – Polar Code kabul edildi" },
      { year: "2017", description: "1 Ocak 2017 – Polar Code yürürlüğe girdi (SOLAS Chapter XIV + MARPOL)" },
      { year: "2024", description: "1 Temmuz 2024 – Arktik'te HFO kullanım ve taşıma yasağı başladı (muafiyetlerle)" },
    ],
    keyArticles: [
      { id: "SOLAS Chapter XIV", title: "Kutup Sularında Emniyet", summary: "Polar Code'un emniyet bölümünü zorunlu kılar: sertifikasyon, PWOM, yapısal ve operasyonel gereklilikler." },
      { id: "Polar Code Part I-A", title: "Emniyet Gereklilikleri", summary: "Gemi yapısı, stabilite, makine, yangın güvenliği, can kurtarma, seyir ve iletişim gerekliliklerini kapsar." },
      { id: "Polar Code Part II-A", title: "Çevre Koruma", summary: "Kutup sularında petrol, kimyasal, kanalizasyon ve çöp deşarj kurallarını belirler." },
      { id: "MEPC.264(68)", title: "HFO Yasağı Değişikliği", summary: "Arktik sularda ağır yakıt kullanımı ve taşıma yasağını düzenler." },
    ],
    penalties: [
      "Polar Ship Certificate olmadan kutup sularına giriş yasaktır",
      "PWOM eksikliği veya yetersizliğinde PSC/flag state denetimlerinde alıkoyma riski",
      "Antarktik'te çevre ihlallerinde Antarctic Treaty kapsamında ağır yaptırımlar",
      "HFO yasağı ihlalinde bayrak devleti ve kıyı devleti cezaları",
    ],
    detailedSections: [
      {
        heading: "Kutup sularının kendine özgü zorlukları",
        body:
          "Polar Code, buzlu sularda seyrin sıradan denizcilikten kökten farklı olduğu gerçeğinden doğar. Kutup bölgelerinde gemiler buz yükü, aşırı düşük sıcaklıklar, uzun karanlık dönemler, sınırlı haritalama, zayıf haberleşme ve en yakın yardımın günlerce uzakta olabildiği bir izolasyonla karşı karşıyadır. Bir kaza, ılıman sularda yönetilebilir olsa da kutupta ölümcül olabilir. Kod bu yüzden hem emniyeti (SOLAS Chapter XIV) hem çevre korumasını (MARPOL ekleri) tek bir çerçevede birleştirir ve gemileri 'her şey yolundayken' değil, 'en kötü koşulda hayatta kalacak' biçimde donatmayı hedefler.",
      },
      {
        heading: "Gemi kategorileri, buz sınıfı ve PWOM",
        body:
          "Kod, gemileri buzda çalışma kabiliyetine göre kategorize eder: Category A en zorlu buz koşullarında (Polar Class PC1-5), Category B daha ince buzda (PC6-7), Category C ise buz takviyesi gerektirmeyen açık sularda çalışır. Polar Class, geminin gövdesinin ne kadar güçlendirildiğini gösterir. Her gemi iki kritik belge taşır: buzda seyir yetkinliğini gösteren Polar Ship Certificate ve rotaya özgü buz/hava koşullarını, SAR kapsamını, iletişim ve kaçış planını içeren Polar Water Operational Manual (PWOM). PWOM, kaptanın kutupta hangi koşulda nasıl hareket edeceğini önceden tanımlayan operasyonel pusulasıdır.",
      },
      {
        heading: "Çevre koruma, donanım ve eğitim",
        body:
          "Kutup ekosistemleri kırılgan ve yavaş iyileşendir, bu yüzden Polar Code çevre kurallarını sertleştirir: Antarktik'te neredeyse tüm deşarjlar yasaktır ve ağır yakıt (HFO) kullanımı uzun süredir yasaktır; Arktik'te de HFO yasağı muafiyetlerle yürürlüğe girmiştir. Donanım tarafında gemiler buz seyir radarı, düşük sıcaklığa dayanıklı can kurtarma teçhizatı, grup hayatta kalma ekipmanı ve kış sağ kalma kitleri taşımak zorundadır. Mürettebat, STCW kapsamında Temel ve İleri Polar Code eğitimi alır. Buz raporları (ice charts) ve SAR koordinasyonu sefer planlamasına entegre edilir. Sertifika veya PWOM olmadan kutup sularına giriş yasaktır.",
      },
      {
        heading: "Polar Class, buz sınıfı ve yapısal güçlendirme",
        body:
          "Polar Code, gemileri buzla başa çıkma kabiliyetlerine göre yedi Polar Class (PC1-PC7) ile derecelendirir; bu IACS Birleşik Gereklilikleri'ne dayanır. PC1 yıl boyu tüm kutup sularında en kalın çok yıllık buzda çalışabilirken, PC7 yalnızca yazın ince birinci yıl buzunda çalışabilir. Yüksek sınıflar daha kalın gövde sacı, güçlendirilmiş çerçeve yapısı, buz takviyeli pervane ve dümen ile düşük sıcaklığa dayanıklı çelik gerektirir. Bu sınıflandırma, gemi kategorileriyle birleşir: Category A en zorlu koşullarda (PC1-5), Category B daha ince buzda (PC6-7), Category C ise buz takviyesi gerektirmeyen açık sularda çalışır. Bir gemi yalnızca Polar Ship Certificate'ında belirtilen buz ve sıcaklık koşullarında seyredebilir; bu, kaptanın hangi bölgeye hangi koşulda girebileceğini somut olarak sınırlar.",
      },
      {
        heading: "PWOM, operasyonel sınırlar ve seyir planlaması",
        body:
          "Polar Water Operational Manual (PWOM), Polar Code'un operasyonel kalbidir ve geminin kutup sularında nasıl güvenle çalışacağını önceden tanımlar. Manual; geminin buz, sıcaklık ve görüş açısından operasyonel sınırlarını, bu sınırlara ulaşıldığında alınacak önlemleri, buzdan kaçınma ve buzkıran desteği prosedürlerini, SAR koordinasyonunu, iletişim planını ve karanlık dönem ile uzak konum kaynaklı kısıtlamaları kapsar. Seyir planlaması, güncel buz haritalarını (ice charts), buz devriyesi bilgilerini ve hava tahminlerini içerir; çünkü kutupta koşullar hızla değişir ve geri dönüş seçenekleri sınırlıdır. Düşük sıcaklık, ekipmanın (vinçler, valfler, can kurtarma araçları) donmasına yol açabileceği için tüm donanımın çalışma sıcaklığı (polar service temperature) önceden değerlendirilir.",
      },
      {
        heading: "Çevre koruma, can kurtarma ve mürettebat eğitimi",
        body:
          "Kutup ekosistemleri kırılgan ve yavaş iyileşen olduğu için Polar Code çevre kurallarını sertleştirir: Antarktik'te (60°S güneyi) neredeyse tüm deşarjlar yasaktır ve ağır yakıt (HFO) kullanımı uzun süredir yasaktır; Arktik'te de HFO kullanım ve taşıma yasağı muafiyetlerle yürürlüğe girmiştir. Can kurtarma ve hayatta kalma donanımı normal gemilerden farklıdır: aşırı soğuk ve uzun kurtarma sürelerine dayanacak grup hayatta kalma ekipmanı, ek termal koruma ve uzatılmış erzak gerekir, çünkü yardımın ulaşması günler alabilir. Mürettebat, STCW kapsamında Temel ve İleri Polar Code eğitimi alarak buz koşullarında seyir, buz manevrası ve kutup acil durumlarına hazırlanır. Polar Ship Certificate veya PWOM olmadan kutup sularına giriş yasaktır; Antarktik'te çevre ihlalleri Antarctic Treaty kapsamında ağır yaptırımlara tabidir.",
      },
    ],
    relatedSlugs: ["solas", "marpol"],
    resources: [{ label: "Polar Code", href: "https://www.imo.org/en/OurWork/Safety/Pages/polar-code.aspx" }],
  },
  {
    slug: "ghg-strategy",
    label: "IMO GHG Strategy – Sera Gazı Stratejisi",
    category: "Çevresel Düzenlemeler",
    overview: "IMO'nun denizcilik sektöründen kaynaklanan sera gazı emisyonlarını azaltmak için belirlediği hedefler ve uygulama yol haritasını içerir.",
    history: "İlk IMO GHG Stratejisi 2018'de MEPC 72'de kabul edilmiştir. 2023'te MEPC 80'de revize strateji kabul edilerek hedefler önemli ölçüde güçlendirilmiştir: 2050'de net sıfır emisyon hedefi benimsenmiştir. Bu strateji, Paris İklim Anlaşması'nın denizcilik sektörüne yansımasıdır. Denizcilik sektörü küresel CO₂ emisyonlarının yaklaşık %2.5-3'ünden sorumludur. IMO, bu hedeflere ulaşmak için hem teknik (yakıt standardı) hem piyasa tabanlı (karbon vergilendirme) önlemler geliştirmektedir.",
    applicability: [
      "Tüm uluslararası deniz taşımacılığı yapan gemiler (IMO üyesi tüm devletler)",
      "Kısa vadeli önlemler (EEXI, CII): mevcut gemiler",
      "Orta vadeli önlemler (GHG yakıt standardı, MBM): tüm gemiler",
      "Uzun vadeli: sıfır ve sıfıra yakın emisyonlu yakıt ve teknolojiler",
    ],
    essentials: [
      "2050 net sıfır emisyon hedefi (veya bu tarihe yakın – 2008 baz yılına göre)",
      "Ara hedefler: 2030'da %20-30, 2040'da %70-80 azalma (2008 baz yılı, taşıma başına değil toplam)",
      "Kısa vadeli önlemler (uygulamada): EEXI, CII, SEEMP güçlendirmesi",
      "Orta vadeli önlemler (geliştirme aşamasında): IMO GHG Fuel Standard (yakıt bazlı GHG yoğunluğu limiti), Market-Based Measures (MBM)",
      "MBM seçenekleri: (1) GHG levy (sabit ücret/ton CO₂), (2) Feebate (ücret-iade sistemi), (3) Emisyon ticaret sistemi – MEPC 83'te karar hedefleniyor",
      "Alternatif yakıtlar: yeşil amonyak, yeşil metanol, e-LNG, biyoyakıt, hidrojen – her birinin WtW emisyonu ve uygulanabilirliği farklı",
      "Teknoloji yol haritası: karbon yakalama ve depolama (CCS), rüzgâr itme sistemleri (Flettner rotor, kite, sail), pil-hibrit sistemler",
      "IMO GHG Study: sektör emisyonlarının kapsamlı analizi (4. çalışma 2020'de yayımlandı, 5. çalışma hazırlanıyor)",
    ],
    actions: [
      "Filo dekarbonizasyon yol haritasını IMO GHG stratejisiyle hizala",
      "Alternatif yakıt uyumluluğu için teknik fizibilite çalışması yap (dual-fuel, retrofit seçenekleri)",
      "CII ve EEXI performansını GHG hedefleriyle birlikte izle ve raporla",
      "MBM maliyetlerini (potansiyel karbon vergisi/levy) uzun vadeli operasyon ve yatırım planlamasına dahil et",
      "Newbuilding kararlarında 2030-2040 düzenlemelerine hazırlıklı gemi tasarımlarını tercih et",
      "Alternatif yakıt altyapısı ve tedarik zinciri gelişmelerini takip et",
    ],
    amendments: [
      { year: "2018", description: "MEPC 72 – İlk IMO GHG Stratejisi kabul edildi (2050'de %50 azalma hedefi)" },
      { year: "2023", description: "MEPC 80 – Revize strateji: 2050 net sıfır hedefi, güçlendirilmiş ara hedefler" },
      { year: "2025", description: "MEPC 83 – GHG yakıt standardı ve MBM müzakereleri (nihai karar hedefleniyor)" },
      { year: "2027", description: "Orta vadeli önlemlerin (yakıt standardı + MBM) yürürlüğe girmesi hedefleniyor" },
    ],
    keyArticles: [
      { id: "MEPC.377(80)", title: "2023 IMO GHG Stratejisi", summary: "Revize sera gazı azaltma stratejisi: 2050 net sıfır hedefi, ara dönem kontrol noktaları ve uygulama yol haritası." },
      { id: "ISWG-GHG", title: "Intersessional Çalışma Grubu", summary: "GHG yakıt standardı ve piyasa tabanlı önlemlerin teknik detaylarını geliştiren IMO çalışma grubu." },
      { id: "4. IMO GHG Çalışması", title: "Emisyon Envanteri", summary: "2012-2018 dönemi küresel denizcilik emisyonlarının kapsamlı analizi ve projeksiyon senaryoları." },
    ],
    penalties: [
      "GHG stratejisinin kendisi doğrudan ceza mekanizması içermez – uygulamalar EEXI, CII ve gelecekteki MBM ile sağlanır",
      "MBM yürürlüğe girdiğinde karbon maliyeti ödeme zorunluluğu (tahmini 50-150 $/ton CO₂)",
      "GHG yakıt standardı yürürlüğe girdiğinde uyumsuz yakıt kullanımında MARPOL kapsamında yaptırımlar uygulanacak",
    ],
    detailedSections: [
      {
        heading: "Denizciliğin iklim yol haritası",
        body:
          "IMO GHG Stratejisi, tek tek kurallardan çok, denizcilik sektörünün karbonsuzlaşma yönünü ve hızını belirleyen bir çerçevedir. Sektör küresel CO₂'nin yaklaşık %2,5-3'ünden sorumludur ve büyümeye devam etmektedir; bu nedenle Paris Anlaşması hedeflerinin denizcilik karşılığı olarak bu strateji oluşturulmuştur. 2018'deki ilk strateji, 2023'te MEPC 80'de köklü biçimde güçlendirilmiş ve 2050 dolaylarında net sıfır emisyon hedefi benimsenmiştir. Strateji, bağlayıcı tek bir metinden ziyade, somut düzenlemelerin (EEXI, CII ve gelecekteki yakıt standardı/karbon ücreti) türetildiği bir üst çatı işlevi görür.",
      },
      {
        heading: "Kısa, orta ve uzun vadeli önlemler",
        body:
          "Strateji önlemleri zaman ufkuna göre katmanlar. Kısa vadeli önlemler hâlihazırda yürürlüktedir: mevcut filonun verimliliğini ölçen EEXI ve CII ile güçlendirilmiş SEEMP. Orta vadeli önlemler geliştirme aşamasındadır ve iki ayaklıdır: yakıtın sera gazı yoğunluğuna küresel bir limit koyan IMO GHG Fuel Standard ve emisyona fiyat koyan piyasa tabanlı bir önlem (karbon ücreti/levy veya emisyon ticareti). Uzun vadede ise sıfıra yakın emisyonlu yakıtlar ve teknolojiler hedeflenir. 2030 ve 2040 için belirlenen ara kontrol noktaları (örneğin 2030'da toplam emisyonda %20-30 azalma), ilerlemenin ölçülmesini sağlar.",
      },
      {
        heading: "Alternatif yakıtlar ve filo için anlamı",
        body:
          "Net sıfır hedefine yalnızca verimlilikle ulaşılamaz; yakıtın kendisinin değişmesi gerekir. Strateji, yeşil amonyak, yeşil metanol, e-LNG, biyoyakıt ve hidrojen gibi seçenekleri masaya koyar; her birinin Well-to-Wake emisyonu, güvenliği, maliyeti ve altyapı olgunluğu farklıdır. Rüzgâr destekli sevk (Flettner rotor, kite, yelken), pil-hibrit sistemler ve karbon yakalama da yol haritasının parçasıdır. Gemi sahipleri için bunun pratik sonucu, bugün verilen yeni gemi (newbuilding) ve retrofit kararlarının 2030-2040 düzenlemelerine ve gelecekteki karbon maliyetine göre alınması gerektiğidir; çünkü bir gemi 20-25 yıl hizmet verecek ve bu sürede regülasyon kökten değişecektir.",
      },
      {
        heading: "Toplam emisyon hedefinden yoğunluk hedefine geçiş",
        body:
          "2018 stratejisi ile 2023 revizyonu arasındaki en temel kavramsal fark, hedefin nasıl tanımlandığıdır. 2018 metni ağırlıklı olarak karbon yoğunluğu (taşıma başına emisyon) azaltımına odaklanmıştı; bu yaklaşımın açığı, sektör büyüdükçe (daha fazla gemi, daha fazla taşıma işi) yoğunluk iyileşse bile toplam emisyonun mutlak olarak artabilmesiydi – yoğunluk düşerken hacim büyümesi bunu fazlasıyla telafi edebilir. 2023 revizyonu bu açığı kapatarak dile açıkça 'toplam yıllık sera gazı emisyonlarının' 2008 baz yılına göre mutlak olarak azaltılmasını hedef almıştır; bu, sektörün büyümesinden bağımsız olarak gerçek bir emisyon tavanı anlamına gelir. Bu kayış önemlidir çünkü yoğunluk hedefleri tek başına sektörün iklim üzerindeki toplam etkisini garanti altına almaz, mutlak hedefler ise doğrudan atmosfere salınan toplam karbon miktarını sınırlar; bu da EEXI/CII gibi yoğunluk temelli araçların yanına mutlak azaltımı zorlayacak orta vadeli önlemlerin (yakıt standardı, MBM) neden eklendiğini açıklar.",
      },
      {
        heading: "Orta vadeli önlem tartışması: yakıt standardı, levy ve emisyon ticareti",
        body:
          "Orta vadeli önlemler için müzakere edilen üç temel yaklaşımın armatörler için farklı sonuçları vardır. Sabit bir karbon ücreti (GHG levy), her ton emisyon için öngörülebilir, basit ve idari açıdan uygulaması kolay bir maliyet yaratır, ancak gelirin nasıl dağıtılacağı (alternatif yakıt altyapısına mı, gelişmekte olan ülkelere mi) tartışmalıdır ve düz oranlı olduğu için küçük filoların büyük filolarla aynı yükü taşımasına yol açabilir. Emisyon ticareti sistemi (cap-and-trade), toplam emisyona sayısal bir tavan koyup kotaların piyasada alınıp satılmasına izin verir; bu, en ucuz azaltımı yapan tarafın piyasayı yönlendirmesini sağlar ama fiyat oynaklığı ve piyasa manipülasyonu riski taşır. GHG Fuel Standard ise doğrudan yakıtın yoğunluğuna teknik bir limit koyar (FuelEU'ya benzer mantık) ve fiyat sinyali yerine zorunlu bir teknik geçiş dayatır; uzak mesafe, düzensiz trafiğe sahip filolar için esneklik sağlarken alternatif yakıt bulunabilirliği düşük bölgelerde faaliyet gösteren armatörler için operasyonel risk oluşturabilir. IMO'daki müzakereler büyük ölçüde bu üç yaklaşımın hangi kombinasyonda birleştirileceği etrafında şekillenmektedir.",
      },
      {
        heading: "2026'da newbuilding kararına düzenleyici belirsizliğin yansıması",
        body:
          "Bugün bir newbuilding siparişi veren armatör, teslim tarihinden (tipik 2-3 yıl sonra) hizmet ömrünün sonuna (25 yıl sonrasına) kadar hangi mid-term önlemin yürürlükte olacağını kesin olarak bilemez. Bu belirsizliğe karşı yaygınlaşan strateji, tek bir yakıta bağlanmak yerine dual-fuel veya 'fuel-ready' tasarım seçmektir: gemi bugün mevcut ve ekonomik olan bir yakıtla (örneğin LNG veya konvansiyonel yakıt + yüksek biyoyakıt karışım kapasitesi) çalışacak şekilde inşa edilir, ancak makine dairesi, yakıt tankları ve boru hattı düzeni gelecekte metanol veya amonyağa nispeten düşük maliyetle dönüştürülebilecek şekilde tasarlanır. Bu yaklaşımın maliyeti, saf tek-yakıtlı bir gemiye kıyasla daha yüksek ilk yatırımdır, ama karşılığında hangi mid-term önlemin (levy, ETS, yakıt standardı) baskın çıkacağından bağımsız olarak geminin ekonomik ömrü boyunca uyum sağlayabilme kabiliyeti satın alınır. Armatörler ayrıca charter sözleşmelerine düzenleyici değişiklik kloları ekleyerek ve yakıt tedarik zincirindeki altyapı yatırımlarını (liman bunkerlenme kapasitesi) izleyerek bu hedge stratejisini tamamlar.",
      },
    ],
    relatedSlugs: ["eexi", "cii", "fueleu-maritime", "imo-dcs"],
    resources: [{ label: "IMO GHG Strategy", href: "https://www.imo.org/en/OurWork/Environment/Pages/2023-IMO-Strategy-on-Reduction-of-GHG-Emissions-from-Ships.aspx" }],
  },
  {
    slug: "oprc",
    label: "OPRC – Petrol Kirliliğine Hazırlık ve Müdahale",
    category: "Çevresel Düzenlemeler",
    overview: "Denizde petrol sızıntılarına karşı hazırlık, müdahale planları ve uluslararası işbirliği çerçevesini düzenler.",
    history: "1990'da kabul edilen OPRC Sözleşmesi, 1989 Exxon Valdez (Alaska) kazasının ardından acil ihtiyaç olarak hazırlanmış ve 1995'te yürürlüğe girmiştir. 2000'de HNS (Hazardous and Noxious Substances) kapsamını da içeren OPRC-HNS Protokolü eklenmiştir (2007'de yürürlüğe girdi). Sözleşme, ulusal ve uluslararası düzeyde kirlilik müdahale kapasitesinin oluşturulmasını ve sürdürülmesini zorunlu kılar.",
    applicability: [
      "150 GT ve üzeri petrol tankerleri – SOPEP zorunlu",
      "400 GT ve üzeri diğer tüm gemiler – SOPEP zorunlu",
      "Açık deniz (offshore) platformları ve üniteleri",
      "Deniz limanları ve petrol elleçleme tesisleri",
      "OPRC-HNS: kimyasal tankerler ve tehlikeli madde taşıyan gemiler",
    ],
    essentials: [
      "SOPEP (Shipboard Oil Pollution Emergency Plan): gemiye özel petrol kirliliği acil müdahale planı – MARPOL Ek I Kural 37 kapsamında zorunlu",
      "SMPEP (Shipboard Marine Pollution Emergency Plan): SOPEP + OPRC-HNS gerekliliklerini birleştiren entegre plan (MEPC.85(44))",
      "Bildirim yükümlülükleri: kirlilik olayının derhal en yakın kıyı devletine raporlanması (MARPOL Protokol I)",
      "Müdahale ekipmanları ve organizasyon gereklilikleri: sorbent malzeme, bariyer (boom), dispersant, kişisel koruyucu donanım",
      "Ulusal olağanüstü durum planı: her taraf devlet ulusal kirlilik müdahale sistemi kuracak",
      "Uluslararası işbirliği: karşılıklı yardım mekanizmaları, bilgi paylaşımı, ortak tatbikatlar",
      "OPRC-HNS Protokolü: tehlikeli ve zararlı maddeler için ek hazırlık ve müdahale gereklilikleri",
      "Bildirim formatı: kirlilik tipi, miktar tahmini, deniz/hava koşulları, alınan önlemler",
    ],
    actions: [
      "SOPEP/SMPEP planını mürettebatla yılda en az bir kez tatbikat et",
      "Kirlilik müdahale ekipmanlarının (sorbent, boom, dispersant) envanterini periyodik kontrol et ve son kullanma tarihlerini izle",
      "Kirlilik olaylarını MARPOL Protokol I'e göre en yakın kıyı devletine derhal raporla",
      "Mürettebata SOPEP prosedürleri ve kirlilik müdahale eğitimi ver (yılda en az 1 tatbikat)",
      "Kıyı devleti acil müdahale irtibat bilgilerini güncel tut",
      "Tatbikat kayıtlarını dokümante et ve denetim için hazır bulundur",
    ],
    amendments: [
      { year: "1990", description: "OPRC Sözleşmesi kabul edildi" },
      { year: "1995", description: "OPRC Sözleşmesi yürürlüğe girdi" },
      { year: "2000", description: "OPRC-HNS Protokolü kabul edildi (tehlikeli madde kirliliği)" },
      { year: "2007", description: "OPRC-HNS Protokolü yürürlüğe girdi" },
    ],
    keyArticles: [
      { id: "Madde 3", title: "Acil Durum Planları", summary: "Gemilerin, offshore ünitelerin ve limanların kirlilik acil müdahale planı bulundurma zorunluluğu." },
      { id: "Madde 4", title: "Bildirim Prosedürleri", summary: "Kirlilik olaylarının derhal kıyı devletine bildirilme yükümlülüğü ve bildirim formatı." },
      { id: "Madde 6", title: "Ulusal ve Bölgesel Müdahale", summary: "Taraf devletlerin ulusal müdahale sistemi kurma ve bölgesel işbirliği yapma yükümlülüğü." },
      { id: "Madde 7", title: "Uluslararası İşbirliği", summary: "Sınır aşan kirlilik olaylarında karşılıklı yardım ve teknik destek mekanizmaları." },
    ],
    penalties: [
      "SOPEP bulunmaması veya güncel olmaması durumunda PSC denetimlerinde eksiklik ve potansiyel alıkoyma",
      "Bildirim yükümlülüğünün yerine getirilmemesinde kıyı devleti cezaları",
      "Kirlilik olayında yetersiz müdahale durumunda armatör sorumluluğu (CLC/FUND kapsamında)",
      "Kasıtlı veya ihmalden kaynaklanan kirlilikte cezai sorumluluk",
    ],
    detailedSections: [
      {
        heading: "Önlemeden hazırlığa: kirlilikle mücadelenin ikinci ayağı",
        body:
          "MARPOL kirliliği önlemeyi düzenlerken OPRC, önlem yetmediğinde ne yapılacağını düzenler. Exxon Valdez felaketi, bir büyük sızıntıya hazırlıksız yakalanmanın yıkıcı sonuçlarını gösterdi: müdahale ekipmanı, planı ve koordinasyonu olmadığında petrol kıyıları ve ekosistemleri onarılamaz biçimde tahrip eder. OPRC bu yüzden hem gemi hem ulusal düzeyde önceden hazırlık yapmayı zorunlu kılar. Sözleşme, kirliliği bir 'eğer olursa' değil 'olduğunda' meselesi olarak ele alır ve herkesin rolünü önceden tanımlar. 2000 tarihli OPRC-HNS Protokolü kapsamı tehlikeli ve zararlı maddelere de genişletmiştir.",
      },
      {
        heading: "SOPEP/SMPEP ve bildirim zinciri",
        body:
          "OPRC'nin gemi düzeyindeki somut çıktısı, her geminin taşıdığı acil müdahale planıdır: petrol için SOPEP, petrol ve tehlikeli maddeleri birleştiren entegre versiyonu ise SMPEP. Bu planlar, bir sızıntı anında kimin ne yapacağını, hangi vananın kapatılacağını, ekipmanın nerede olduğunu ve kimin aranacağını adım adım tanımlar. Bildirim hayati önemdedir: bir kirlilik olayı derhal en yakın kıyı devletine, standart bir formatta (kirlilik tipi, tahmini miktar, hava/deniz koşulları, alınan önlemler) raporlanmalıdır; erken bildirim, müdahale kaynaklarının zamanında seferber edilmesini sağlar.",
      },
      {
        heading: "Ekipman, tatbikat ve uluslararası işbirliği",
        body:
          "Plan ancak uygulanabilirse anlamlıdır. Gemide sorbent malzeme, bariyer (boom), dispersant ve kişisel koruyucu donanım bulundurulur; bunların envanteri ve son kullanma tarihleri düzenli kontrol edilir. Mürettebat SOPEP prosedürlerini yılda en az bir kez tatbik eder ve bu tatbikatlar belgelenir. Ulusal düzeyde her taraf devlet bir kirlilik müdahale sistemi kurar; büyük olaylarda sınır aşan kirliliğe karşı devletler arası karşılıklı yardım, bilgi paylaşımı ve ortak tatbikat mekanizmaları devreye girer. Böylece OPRC, tek bir geminin müdahale kapasitesini küresel bir hazırlık ağının parçası haline getirir.",
      },
    ],
    relatedSlugs: ["marpol", "iopp-cert"],
    resources: [{ label: "OPRC Convention", href: "https://www.imo.org/en/About/Conventions/Pages/International-Convention-on-Oil-Pollution-Preparedness,-Response-and-Co-Operation-(OPRC).aspx" }],
  },
  {
    slug: "afs",
    label: "AFS Convention – Anti-fouling Sistemleri Sözleşmesi",
    category: "Çevresel Düzenlemeler",
    overview: "Gemilerin su altı boyalarında (anti-fouling) kullanılan zararlı kimyasalların, özellikle TBT (tributyltin) bileşiklerinin yasaklanmasını düzenler.",
    history: "TBT (tributyltin) içeren anti-fouling boyalar, deniz organizmalarına ve ekosisteme ciddi zarar verdiği tespit edildikten sonra IMO, AFS Sözleşmesi'ni 2001'de kabul etmiştir. 1 Ocak 2003'te TBT uygulaması ve 1 Ocak 2008'de TBT bulunduran boyaların tamamen yasaklanması öngörülmüştür. Sözleşme 17 Eylül 2008'de yürürlüğe girmiştir. 2023'te cybutryne de yasaklanan maddeler listesine eklenmiştir.",
    applicability: [
      "400 GT ve üzeri uluslararası sefer yapan tüm gemiler – AFS Certificate veya Declaration zorunlu",
      "400 GT altı gemiler: 24 metre ve üzeri olanlar için AFS Declaration",
      "Tüm gemiler için TBT ve cybutryne içeren anti-fouling boya uygulaması yasaktır",
    ],
    essentials: [
      "TBT (tributyltin) bileşiklerinin anti-fouling boyalarda kullanımının tamamen yasaklanması",
      "Cybutryne yasağı: 1 Ocak 2023'ten itibaren uygulanmaz, 1 Ocak 2026'ya kadar mevcut boyalarda sealant uygulanması veya sökülmesi",
      "AFS Certificate (International Anti-fouling System Certificate): 400 GT üzeri gemiler için zorunlu",
      "AFS Declaration: 24-400 GT arası gemiler için",
      "Survey gerekliliği: ilk sertifikasyon survey'i + gemi su altı boyası değiştirildiğinde veya yenilendiğinde",
      "Ek IV – Yasaklanan ve kontrol edilen anti-fouling bileşikleri listesi",
    ],
    actions: [
      "Gemi su altı boyası seçiminde AFS uyumlu ürün kullan (TBT-free ve cybutryne-free)",
      "AFS Certificate/Declaration'ı gemide güncel tut",
      "Boya değişikliğinde veya havuz döneminde survey planla ve sertifikayı güncelle",
      "Anti-fouling sistem bilgilerini (boya tipi, uygulama tarihi, marka) kayıt altında tut",
      "Cybutryne geçiş süresinde sealant uygulamasını veya boya sökümünü planla (2026'ya kadar)",
    ],
    amendments: [
      { year: "2001", description: "AFS Sözleşmesi kabul edildi" },
      { year: "2003", description: "TBT içeren boya uygulanması yasaklandı" },
      { year: "2008", description: "1 Ocak – TBT içeren boya bulunması yasaklandı; 17 Eylül – sözleşme yürürlüğe girdi" },
      { year: "2021", description: "MEPC 76 – Cybutryne yasağı kabul edildi" },
      { year: "2023", description: "1 Ocak – Cybutryne uygulanması yasaklandı" },
      { year: "2026", description: "1 Ocak – Cybutryne içeren mevcut boyalarda sealant/söküm son tarihi" },
    ],
    keyArticles: [
      { id: "Madde 4", title: "Anti-fouling Sistem Kontrolü", summary: "Yasaklanan ve kontrol edilen anti-fouling sistemlerinin listesini ve uygulama kurallarını belirler." },
      { id: "Ek I", title: "Kontrol Gereklilikleri", summary: "TBT ve diğer zararlı maddelerin yasaklanma koşulları ve geçiş süreleri." },
      { id: "Ek IV", title: "Survey ve Sertifikasyon", summary: "AFS survey gereklilikleri ve sertifika düzenleme prosedürlerini belirler." },
    ],
    penalties: [
      "AFS Certificate/Declaration olmadan uluslararası sefer yapılamaz",
      "PSC denetimlerinde AFS uyumsuzluğu tespitinde eksiklik ve alıkoyma riski",
      "Yasaklı madde içeren boya kullanımında bayrak devleti cezaları",
    ],
    detailedSections: [
      {
        heading: "Gövde boyasının görünmez zararı",
        body:
          "AFS Sözleşmesi, ilk bakışta teknik bir ayrıntı gibi görünen ama ciddi bir çevre sorunu olan gemi su altı boyalarını düzenler. Gemilerin gövdesine deniz canlılarının (midye, yosun, kabuklu) yapışmasını önlemek için anti-fouling boyalar kullanılır; bu boyalar sürtünmeyi azaltarak yakıt tasarrufu sağlar. Ancak geçmişte yaygın kullanılan TBT (tributyltin) bileşikleri suya sızarak hedefin çok ötesinde zarar verdi: deniz salyangozlarında cinsiyet bozulmaları, istiridye kabuklarında deformasyonlar ve ekosistemde geniş tahribat. AFS, bu zararlı biyositleri yasaklayarak boyanın faydasını çevresel maliyetinden ayırmayı amaçlar.",
      },
      {
        heading: "Yasaklı maddeler ve geçiş süreçleri",
        body:
          "Sözleşmenin özü, belirlenen zararlı anti-fouling maddelerinin kademeli olarak yasaklanmasıdır. TBT içeren boyaların önce uygulanması, sonra gemide bulundurulması yasaklanmıştır. Sözleşme statik değildir; yeni kanıtlar ortaya çıktıkça liste genişler: cybutryne (bir başka biyosit) de yasaklı maddeler arasına eklenmiş ve mevcut boyalarda ya üzerinin kapatılması (sealant) ya da sökülmesi için bir geçiş süresi tanınmıştır. Bu yaklaşım, sektöre uyum için makul zaman tanırken zararlı maddelerin denizden tedricen temizlenmesini sağlar.",
      },
      {
        heading: "Belgelendirme ve denetim",
        body:
          "AFS uyumu belge düzeyinde de izlenir. 400 GT ve üzeri uluslararası sefer gemileri Uluslararası Anti-fouling Sistem Sertifikası (AFS Certificate), daha küçük gemiler ise AFS Declaration taşımak zorundadır; bu belgeler kullanılan boyanın tipini, uygulama tarihini ve uyumunu gösterir. Boya değiştirildiğinde veya havuz döneminde (dry-dock) sörvey yapılır ve sertifika güncellenir. Sertifika veya beyan olmadan uluslararası sefer yapılamaz; PSC denetiminde yasaklı madde veya belge uyumsuzluğu tespit edilirse eksiklik kaydı ve alıkoyma riski doğar. Böylece AFS, çevresel bir yasağı denetlenebilir bir uyum yükümlülüğüne dönüştürür.",
      },
    ],
    relatedSlugs: ["marpol", "bwm"],
    resources: [{ label: "AFS Convention", href: "https://www.imo.org/en/OurWork/Environment/Pages/Anti-fouling.aspx" }],
  },
  {
    slug: "bwm",
    label: "BWM Convention – Balast Suyu Yönetimi",
    category: "Çevresel Düzenlemeler",
    overview: "Gemilerin balast suyu ile taşınan istilacı deniz organizmalarının önlenmesi için balast suyu yönetim standartları ve arıtma gerekliliklerini belirler.",
    history: "Balast suyu ile taşınan istilacı türlerin küresel deniz ekosistemlerine verdiği zararın (karides, midye, kolera bakterisi vb.) fark edilmesiyle IMO, BWM Sözleşmesi'ni 2004'te kabul etmiştir. Uzun onay süreci sonrasında 8 Eylül 2017'de yürürlüğe girmiştir. Sözleşme iki temel standart belirler: D-1 (balast suyu değişimi) ve D-2 (arıtma – BWMS). 2024'e kadar tüm gemilerin D-2 standardına geçmesi hedeflenmişken, geçiş süresi gemi yaşı ve sertifika döngüsüne göre uzatılmıştır.",
    applicability: [
      "Balast suyu taşıyan tüm uluslararası sefer yapan gemiler",
      "Yeni gemiler (2017 sonrası keel laying): D-2 standardı zorunlu",
      "Mevcut gemiler: IOPP renewal survey tarihine göre kademeli geçiş (2024 sonrasına kadar)",
      "Bazı bölgelerde yerel düzenlemeler ek gereklilikler içerir (örn. ABD – USCG BWM kuralları)",
    ],
    essentials: [
      "D-1 Standardı (Balast suyu değişimi): açık denizde en az %95 volumetrik değişim veya 3 kez ardışık pompalama – kıyıdan en az 200 mil, derinlik 200 m",
      "D-2 Standardı (Arıtma – BWMS): organizma yoğunluğu limitleri – ≤10 organizma/m³ (≥50μm), ≤10 organizma/ml (10-50μm), koliform ve enterococci limitleri",
      "BWMS (Ballast Water Management System) onayı: G8/MEPC.174(58) kılavuzuna göre tip onayı → 2020'den itibaren BWMS Code (zorunlu) uygulanıyor",
      "BWMS teknolojileri: UV, elektroklorinasyon, ozonlama, filtrasyon + dezenfeksiyon kombinasyonları",
      "BWM Plan: gemiye özel balast suyu yönetim planı – gemide bulundurma zorunlu",
      "Ballast Water Record Book: tüm balast operasyonlarının (alım, deşarj, değişim, arıtma) kaydı",
      "IBWM Certificate: International Ballast Water Management Certificate – 5 yıllık geçerlilik",
      "Sampling ve analiz: liman devleti denetimlerinde balast suyu numune alınabilir (indicative, detailed, detailed analysis)",
    ],
    actions: [
      "D-2 uyumlu BWMS retrofit veya newbuild kurulumunu planla ve uygula",
      "BWMS'nin düzenli bakımını yap ve performans testlerini kaydet",
      "BWM Plan'ı güncel tut ve mürettebatı eğit",
      "Ballast Water Record Book'u eksiksiz ve doğru doldur",
      "Balast suyu operasyonlarını IMO ve yerel düzenlemelere uygun yap",
      "IBWM Certificate'ı güncel tut (yıllık/ara survey + 5 yıllık yenileme)",
      "ABD sularına giriş öncesi USCG BWM kurallarını ayrıca kontrol et",
    ],
    amendments: [
      { year: "2004", description: "BWM Sözleşmesi kabul edildi" },
      { year: "2017", description: "8 Eylül – BWM Sözleşmesi yürürlüğe girdi" },
      { year: "2017", description: "MEPC 71 – Mevcut gemiler için D-2 geçiş takvimi düzenlendi (IOPP renewal'e bağlı)" },
      { year: "2018", description: "BWMS Code kabul edildi – BWMS tip onayı zorunlu standart oldu" },
      { year: "2024", description: "Experience Building Phase (EBP) devam ediyor – commissioning testing uygulaması" },
    ],
    keyArticles: [
      { id: "Kural B-3", title: "Balast Suyu Yönetim Standardı", summary: "Gemilerin D-1 veya D-2 standardına uyum takvimi ve geçiş kurallarını belirler." },
      { id: "Kural D-1", title: "Balast Suyu Değişim Standardı", summary: "Açık denizde volumetrik değişim gereklilikleri: %95 veya 3x ardışık pompalama." },
      { id: "Kural D-2", title: "Balast Suyu Performans Standardı", summary: "Arıtılmış balast suyundaki organizma ve bakteri yoğunluğu limitlerini belirler." },
      { id: "BWMS Code", title: "BWMS Onay Kodu", summary: "Balast suyu arıtma sistemlerinin tip onayı için zorunlu test ve sertifikasyon prosedürlerini düzenler." },
    ],
    penalties: [
      "IBWM Certificate olmadan uluslararası sefer yapılamaz",
      "D-2 uyumsuzluğunda PSC denetimlerinde alıkoyma (detention) riski",
      "Balast suyu deşarj ihlallerinde kıyı devleti cezaları (çevre kirliliği kapsamında)",
      "ABD'de USCG BWM kuralları ihlalinde ek para cezaları ve gemi alıkoyma",
      "Ballast Water Record Book eksikliği veya yanlışlığında PSC eksiklik kaydı",
    ],
    detailedSections: [
      {
        heading: "İstilacı türlere karşı küresel bir savunma",
        body:
          "BWM Sözleşmesi, gemilerin denge için aldığı balast suyuyla bir denizden diğerine taşıdığı organizmaların yarattığı çevresel tehdidi yönetir. Bir bölgede zararsız olan türler, doğal düşmanı olmayan başka bir ekosisteme taşındığında patlama yaparak yerli yaşamı, balıkçılığı ve altyapıyı tahrip edebilir; kolera gibi patojenler bile bu yolla yayılabilir. Sözleşmenin çözümü, balast suyunu deşarjdan önce ya açık denizde değiştirmek (D-1) ya da içindeki canlıları öldürecek/uzaklaştıracak biçimde arıtmak (D-2) zorunluluğudur. 2004'te kabul edilen sözleşme, yeterli onaya ancak 2017'de ulaşarak yürürlüğe girmiştir.",
      },
      {
        heading: "D-2 standardı ve arıtma sistemleri",
        body:
          "Kalıcı çözüm olan D-2 standardı, deşarj edilen balast suyundaki canlı organizma yoğunluğunu çok düşük sayısal limitlere indirir (boyut sınıfına göre metreküp veya mililitre başına izin verilen organizma sayısı, ayrıca koliform/enterokok limitleri). Bunu sağlayan Balast Suyu Arıtma Sistemi (BWMS), tipik olarak filtreleme ve ardından UV, elektroklorinasyon veya ozonlama gibi bir dezenfeksiyon kademesini birleştirir. Sistemin, zorunlu BWMS Code uyarınca tip onaylı olması, kurulumdan sonra commissioning testiyle doğrulanması ve sörveylerle izlenmesi gerekir. Mevcut gemiler IOPP yenileme takvimine bağlı olarak D-1'den D-2'ye kademeli geçmiştir.",
      },
      {
        heading: "Kayıt, sertifika ve ABD farkı",
        body:
          "Operasyonel uyum, her balast alımı, deşarjı, değişimi ve arıtmasının Ballast Water Record Book'a işlenmesini, sistemin düzenli bakımını ve gemiye özel bir BWM Plan'ının uygulanmasını gerektirir. Uyum, beş yıl geçerli IBWM Certificate ile belgelenir; liman devleti denetiminde balast suyundan numune alınıp analiz edilebilir. Kritik bir uyarı ABD'dir: USCG, IMO'dan ayrı ve genellikle daha katı bir tip onay rejimi uygular; bir BWMS IMO onaylı olsa bile ABD'de uyumsuz sayılabilir, bu yüzden ABD'ye uğrayan gemiler her iki onayı da kontrol etmelidir. Sertifika eksikliği veya D-2 uyumsuzluğu PSC denetiminde alıkoymaya yol açabilir.",
      },
      {
        heading: "D-1 ve D-2 standartlarının derinlemesine karşılaştırması",
        body:
          "BWM Sözleşmesi iki standart tanımlar ve sektör birinden diğerine geçmiştir. D-1 (balast suyu değişimi), açık denizde balast hacminin en az %95'inin değiştirilmesini (veya hacmin üç katı pompalanmasını) öngörür; bu, kıyıdan en az 200 mil açıkta ve 200 m derinlikte yapılır. D-1 geçici ve kısmi bir çözümdür: değişim her zaman tam etkili değildir, hava koşullarına bağlıdır ve geminin yapısal güvenliğini zorlayabilir. D-2 (performans standardı) ise kalıcı çözümdür ve deşarj edilen sudaki canlı organizma yoğunluğunu çok düşük sayısal limitlere indirir: ≥50 mikron boyutlu organizmalardan metreküpte en fazla 10, 10-50 mikron arası organizmalardan mililitrede en fazla 10 ve belirli indikatör bakteriler (toksijenik kolera, E. coli, enterokok) için ayrı limitler. Bunu sağlayan bir arıtma sistemi (BWMS) gemiye kurulur.",
      },
      {
        heading: "BWMS teknolojileri ve onay süreci",
        body:
          "Balast Suyu Arıtma Sistemleri tipik olarak iki aşamalı çalışır: önce bir filtre büyük partikülleri ve organizmaları mekanik olarak ayırır, ardından bir dezenfeksiyon kademesi kalan canlıları etkisiz hale getirir. Dezenfeksiyon yöntemleri farklıdır: ultraviyole (UV) ışınlama organizmaların üremesini engeller; elektroklorinasyon ve ozonlama gibi kimyasal yöntemler aktif madde üretir (ancak deşarjda nötralizasyon ve kalıntı kontrolü gerektirir). Her yöntemin avantaj ve sınırları vardır; örneğin UV'nin etkinliği suyun bulanıklığına, kimyasal yöntemlerinki ise su sıcaklığı ve tuzluluğuna bağlıdır. Sistemin, zorunlu BWMS Code uyarınca tip onayı taşıması, kurulumdan sonra commissioning testiyle doğrulanması ve yıllık sörveylerle izlenmesi gerekir; bu testler arıtmanın gerçekten standardı sağladığını kanıtlar.",
      },
      {
        heading: "Kayıt, sertifika, denetim ve ABD farkı",
        body:
          "Operasyonel uyum sürekli bir disiplindir: her balast alımı, deşarjı, değişimi ve arıtması Ballast Water Record Book'a işlenir; gemiye özel bir BWM Plan uygulanır; UV lambaları ve filtreler zamanında değiştirilir, sensörler kalibre edilir ve sediment yönetimi yapılır. Uyum, beş yıl geçerli bir IBWM Certificate ile belgelenir ve yıllık/ara sörveylerle güncel tutulur; liman devleti denetiminde balast suyundan üç kademeli (gösterge, ayrıntılı, laboratuvar) numune alınıp analiz edilebilir. En sık yapılan hata, IMO onayını yeterli sanmaktır: ABD sularına giren gemiler için USCG, IMO'dan bağımsız ve genellikle daha katı bir tip onay rejimi uygular; bir BWMS IMO onaylı olsa bile USCG onaylı değilse ABD'de uyumsuz sayılabilir. Bu yüzden ABD'ye uğrayan gemiler her iki onayı da kontrol etmek zorundadır. Sistemin çalışmaması, kurulu olmaması veya kayıt eksikliği PSC'de alıkoymaya yol açabilir.",
      },
    ],
    relatedSlugs: ["marpol", "uscg"],
    resources: [{ label: "BWM Convention", href: "https://www.imo.org/en/OurWork/Environment/Pages/BallastWaterManagement.aspx" }],
  },
];
