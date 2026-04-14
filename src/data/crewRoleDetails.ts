/**
 * Gemi Personeli Detaylı Sorumluluk ve Ekipman Verileri
 * 
 * Her rol için profesyonel gemi pratiğine dayanan kapsamlı içerik.
 * SOLAS, ISM Code, MARPOL, STCW ve LSA/FSS Code referanslarıyla hazırlanmıştır.
 */

export type CrewRoleDetail = {
  slug: string;
  intro: string;
  tasks: { title: string; description: string }[];
  equipment: { title: string; checkpoints: string[] }[];
  coreSummary: string;
  criticalNotes?: string[];
};

export const crewRoleDetails: Record<string, CrewRoleDetail> = {
  // ═══════════════════════════════════════════════════
  // GÜVERTE DEPARTMANI
  // ═══════════════════════════════════════════════════

  "kaptan": {
    slug: "kaptan",
    intro: `Kaptan, geminin en üst amiridir. Sorumluluğu yalnızca "gemiyi yönetmek" değil; seyir, emniyet, yük operasyonları, çevre koruma ve idari-hukuki kararları kapsayan bütüncül bir komutadır. ISM Code uyarınca kaptan, geminin güvenli işletimine ilişkin nihai yetkiye sahiptir ve bu yetki şirket tarafından kısıtlanamaz. SOLAS Chapter V/34 gereğince, kaptanın seyir emniyetine dair kararları mutlak ve bağlayıcıdır.`,
    tasks: [
      {
        title: "Seyir emniyetinin nihai sorumluluğu",
        description: `Kaptan seyir planını onaylar; route, ETA, UKC, weather routing ve kısıtlı sular geçişlerindeki risk değerlendirmesini denetler. Dar boğazlarda, TSS'de veya yoğun trafikte köprüüstünde bizzat bulunur. SOLAS V/34 gereğince kaptanın seyir kararları nihai ve bağlayıcıdır; hiçbir ticari baskı bu kararı geçersiz kılamaz. Passage plan'ın her aşamasını — berth-to-berth mantığıyla — kontrol eder ve kritik noktaları (abort point, contingency anchorage, pilot boarding) bizzat onaylar.`
      },
      {
        title: "ISM/ISPS sisteminin gemideki uygulanması",
        description: `ISM Code, güvenli gemi işletiminin sistematik çerçevesidir ve kaptan bu çerçevenin gemideki tek nihai uygulayıcısıdır. SMS (Safety Management System) prosedürleri, risk değerlendirmeleri, near-miss raporları, iç denetim bulguları ve düzeltici aksiyonların tamamı kaptanın gözetimindedir. ISPS kapsamında ise gemi güvenlik planının (SSP) uygulanması, güvenlik seviyesi değişikliklerinin yönetilmesi ve PFSO/CSO ile koordinasyon kaptanın sorumluluğundadır.`
      },
      {
        title: "Acil durum komutası ve kriz yönetimi",
        description: `Yangın, çatışma, karaya oturma, adam denize düşme veya abandon ship durumlarında kaptan komutayı alır. Emergency response planını devreye sokar, kaynak tahsisini yapar, dışarıyla (kıyı devleti, MRCC, şirket) iletişimi yönetir. Drill'lerin gerçekçi ve düzenli yapılmasını sağlar; sonuçları analiz eder ve eksiklikleri kapatır. Kaptanın karar hızı ve netliği, kriz anında mürettebat ve gemi güvenliğini doğrudan belirler.`
      },
      {
        title: "Yük operasyonlarının gözetimi",
        description: `Yükleme planının onaylanması, stabilite hesaplarının kontrolü, lashing/securing kontrolü ve IMO sınıfı tehlikeli yük prosedürlerinin uygulanmasını denetler. Gemi tipine bağlı olarak (bulk, tanker, container) farklılaşan yük operasyonu risklerini değerlendirir ve gerektiğinde operasyonu durdurma yetkisini kullanır. Kaptan, shipper'ın beyan ettiği yük bilgisinin doğruluğunu sorgular ve VGM, MSDS gibi belgeleri kontrol ettirir.`
      },
      {
        title: "Çevresel uyumluluk ve MARPOL sorumluluğu",
        description: `Gemiden kaynaklanan her türlü deniz kirliliğinin önlenmesinden kaptan birincil derecede sorumludur. MARPOL Ek I–VI kapsamında yağlı su deşarjı, çöp yönetimi, hava emisyonları, balast suyu ve anti-fouling hükümleri kaptanın gözetiminde uygulanır. ORB (Oil Record Book), Garbage Record Book ve Ballast Water Record Book gibi kayıtların doğruluğundan kaptan şahsen sorumludur.`
      },
      {
        title: "Bayrak, klas, PSC ve vetting denetimlerine hazırlık",
        description: `Kaptan tüm denetimlerde geminin birincil muhatabıdır. Sertifika geçerliliklerinin takibi, denetim öncesi eksikliklerin tespiti ve giderilmesi, mürettebatın denetim prosedürlerine hazırlanması kaptanın koordinasyonuyla yapılır. PSC deficiency çıkması durumunda düzeltici aksiyonların planlanması ve şirkete raporlanması yine kaptanın sorumluluğundadır.`
      },
      {
        title: "Kadro yönetimi ve eğitim planlaması",
        description: `Mürettebat yetkinliklerinin değerlendirilmesi, eğitim ihtiyaçlarının belirlenmesi, familiarization süreçlerinin işletilmesi ve performans değerlendirmelerinin yapılması kaptanın yönetim sorumluluğundadır. STCW gerekliliklerine uygun sertifika takibini yapar. Gemide moral, disiplin ve çalışma düzeni kaptanın liderlik kapasitesine doğrudan bağlıdır.`
      },
      {
        title: "Kayıt ve dokümantasyon yönetimi",
        description: `Official log book, deck log book, protest letter, NOR (Notice of Readiness), cargo manifest, crew list, stowaway report ve benzeri resmi belgelerin doğru ve zamanında hazırlanması kaptanın sorumluluğundadır. Hukuki belgelerde kaptanın imzası gemiyi ve şirketi bağlar.`
      },
      {
        title: "Pilot ve kılavuz kaptan koordinasyonu",
        description: `Kılavuz kaptan gemiye çıktığında komuta devredilmez; kaptan kılavuzun tavsiyelerini değerlendirir ve gerektiğinde reddeder. Master-Pilot Exchange (MPX) kartının doldurulmasını sağlar, kılavuzlu seyirde köprüüstünde bulunur ve ekipman durumu ile mürettebat hazırlığını teyit eder.`
      },
      {
        title: "Şirket, charterer ve üçüncü taraf iletişimi",
        description: `DPA (Designated Person Ashore) ile sürekli iletişim, charterer talepleri ile emniyet arasındaki denge, acentelerle koordinasyon ve port authorities ile resmi yazışmalar kaptanın iletişim ağının parçalarıdır. Kaptanın "overriding authority" hakkı, ticari baskıya karşı emniyet kararı almasına imkân tanır.`
      },
      {
        title: "MLC 2006 kapsamında mürettebat hakları ve refah yönetimi",
        description: `Maritime Labour Convention (MLC) 2006, gemide çalışma koşullarının asgari standartlarını belirler ve bu standartların gemideki uygulanmasından kaptan birincil derecede sorumludur. Çalışma ve dinlenme saatlerinin (rest hours) kayıt altına alınması ve ILO 180/MLC gerekliliklerine uygunluğunun sağlanması, mürettebat maaşlarının zamanında ödenmesinin takibi, yaşam koşullarının (yiyecek, barınma, sıhhi tesisat) standartlara uygunluğunun kontrolü kaptanın görevidir. PSC denetiminde MLC compliance doğrudan sorgulanır; rest hours ihlalleri gemi tutmaya yol açabilir. Gemide disiplin işlemleri, şikâyet prosedürleri ve ayrımcılık yasağı da MLC kapsamında kaptanın sorumluluğundadır.`
      },
      {
        title: "Deniz protestu (sea protest) ve noter bildirimi",
        description: `Ağır hava, çatışma, karaya oturma, yük hasarı veya kıyı tesisi hasarı gibi olaylar sonrasında kaptanın noter huzurunda resmi deniz protestu (sea protest / noting protest) yapması hukuki bir zorunluluktur. Bu belge, mürettebatın üzerine yüklenmesi muhtemel sorumlulukları sınırlandırır ve sigorta süreçleri için kritik kanıt oluşturur. Protest hazırlığı, olay günlüğü (log kayıtları), tanık ifadeleri ve zamanında noter başvurusu kaptanın koordinasyonuyla yapılır. P&I Club'ın (koruma ve tazminat sigortası) mümkün olan en kısa sürede bilgilendirilmesi de bu sürecin parçasıdır.`
      },
      {
        title: "Konşimento (Bill of Lading) imza yetkisi ve yük belgeleri",
        description: `Kaptan, yüklenen kargonun taşındığını teyit eden konşimentoyu (Bill of Lading) imzalama yetkisine sahiptir ve bu imza şirketi hukuken bağlar. B/L imzalanmadan önce kaptanın yük miktarı, durumu ve koşulları (apparent order and condition) kontrol ettirmesi zorunludur; şüpheli veya hasarlı yük için "Letter of Protest" düzenlenerek kargo sahibi uyarılır. Mate's Receipt, Cargo Manifest, Notice of Readiness (NOR) ve Statement of Facts gibi diğer yük belgelerini de kaptan onaylar ya da yetkilendirir. B/L'de hata veya sahtecilik, ağır hukuki sorumluluk doğurur.`
      },
      {
        title: "Uyuşturucu ve alkol (Drug & Alcohol) politikasının uygulanması",
        description: `ISM Code ve çoğu şirketin SMS'i kapsamında gemide sıfır toleranslı bir D&A politikası uygulanması zorunludur. Kaptanın sorumluluğu; yeni katılan personelin D&A testinin yaptırılması, rastgele (random) test programının koordinasyonu, pozitif test sonucunda kişinin göreve son verilmesi ve şirkete derhal bildirilmesi, limanlardan kaynaklanan D&A talebi denetimlerine hazır olunmasıdır. USCG, Paris MOU ve diğer liman devleti otoritelerinin D&A denetimleri giderek yaygınlaşmaktadır; hazırlıksız olmak gemi tutulmasına neden olur.`
      }
    ],
    equipment: [
      {
        title: "Tüm gemi sertifika ve belgeleri",
        checkpoints: [
          "Safety Management Certificate (SMC) geçerliliği",
          "International Ship Security Certificate (ISSC)",
          "Document of Compliance (DOC) — şirket tarafından sağlanan",
          "Cargo Ship Safety Equipment Certificate",
          "Cargo Ship Safety Construction Certificate",
          "International Load Line Certificate",
          "IOPP Certificate",
          "Ballast Water Management Certificate",
          "Classification certificates ve condition of class",
          "Minimum safe manning document",
          "Continuous Synopsis Record (CSR)"
        ]
      },
      {
        title: "Köprüüstü seyir ve haberleşme sistemleri (genel gözetim)",
        checkpoints: [
          "ECDIS, radar, AIS, GMDSS çalışır durumda mı",
          "VDR kayıt yapıyor mu",
          "Compass error kabul edilebilir düzeyde mi",
          "LRIT ve AIS aktarım durumu",
          "Köprüüstü acil aydınlatma ve batarya yedekleri"
        ]
      },
      {
        title: "Resmi kayıt defterleri",
        checkpoints: [
          "Official log book güncel mi",
          "Oil Record Book Part I ve Part II",
          "Garbage Record Book",
          "Ballast Water Record Book",
          "Cargo Record Book (tankerler için)",
          "GMDSS log"
        ]
      }
    ],
    coreSummary: "Kaptanın ana sorumluluğu, geminin seyir emniyetini, operasyonel bütünlüğünü, çevresel uyumluluğunu ve mürettebat güvenliğini ISM Code çerçevesinde nihai otorite olarak sürekli sağlamaktır.",
    criticalNotes: [
      "ISM Code 5.2 gereğince kaptanın overriding authority hakkı hiçbir koşulda kısıtlanamaz — ticari baskı, charterer talebi veya şirket direktifi bile kaptanın emniyet kararını geçersiz kılamaz.",
      "Kaptanın seyir planını onaylamadan gemi demir almamalıdır; onaysız kalkan gemi, ISM non-conformity oluşturur.",
      "PSC denetiminde kaptan birincil muhataptır; mürettebatın denetim hazırlığı kaptanın eğitim planlamasının doğrudan sonucudur.",
      "Yaşlı gemilerde (15+ yıl) condition of class notlarının, hull survey bulgularının ve yapısal bütünlük raporlarının sıkı takibi kaptan açısından kritik önem taşır."
    ]
  },

  "birinci-zabit": {
    slug: "birinci-zabit",
    intro: `Birinci Zabit, güverte departmanının operasyonel amiridir. "Yük şefi" rolüyle anılır; yükleme/boşaltma planlamasının, stabilite hesaplarının, güverte bakımının ve emniyet ekipmanlarının fiili sorumlusudur. ISM Code kapsamında genellikle Safety Officer ve çoğu gemide SSO (Ship Security Officer) olarak da görev yapar. Kaptandan sonra gemideki en kıdemli güverte zabiti olarak, kaptanın yokluğunda geminin komutasını üstlenir.`,
    tasks: [
      {
        title: "Yük operasyonlarının planlanması ve yönetimi",
        description: `Yükleme planı hazırlamak, stability/stress hesaplarını kontrol etmek, draft survey yapmak/yaptırmak, lashing/securing planını uygulamak ve cargo manifest ile stowage plan arasındaki tutarlılığı sağlamak Birinci Zabitin birincil görevidir. Yük hasarı, kayması veya deniz kirliliği riski taşıyan her durum Birinci Zabitin sorumluluğundadır. Tehlikeli yüklerde IMDG Code segregation kurallarının uygulanmasını kontrol eder.`
      },
      {
        title: "Stabilite ve trim kontrolü",
        description: `Her yükleme/boşaltma işleminden önce ve sonra stabilite durumunu değerlendirir. GM, trim, bending moment ve shear force değerlerinin sınırlar içinde olduğunu doğrular. Ballast operasyonlarını planlar ve uygular. Stabilite booklet verilerine göre kritik durumları tanır ve gerektiğinde operasyonu durdurur. Ballast Water Management Plan çerçevesinde exchange veya treatment yöntemini uygular.`
      },
      {
        title: "Güverte bakım planlaması (PMS)",
        description: `Planned Maintenance System kapsamında güverte ekipmanlarının bakım takvimini hazırlar, iş emirlerini dağıtır ve tamamlanmasını takip eder. Bakım kalemleri arasında vinçler, mooring winch'ler, halat ve teller, boya işleri, kapak contaları, hatch cover'lar ve güverte makineleri yer alır. Bakımda gecikme, denetimde doğrudan bulgu çıkarır.`
      },
      {
        title: "Emniyet ekipmanlarının yönetimi",
        description: `LSA (can kurtarma) ve FFE (yangınla mücadele) ekipmanlarının envanter kontrolü, bakım takibi, servis tarihlerinin izlenmesi ve kayıtların tutulması. Fiili sorumluluğu bazen 3. veya 4. Zabite devreder ancak nihayetinde tüm emniyet ekipmanlarından Birinci Zabit sorumludur. Drill organizasyonu, muster list güncellemeleri ve familiarization bu paketin parçasıdır.`
      },
      {
        title: "Çalışma izinleri (PTW) ve iş güvenliği",
        description: `Enclosed space entry, hot work, working aloft, working overside gibi yüksek riskli çalışmalar için Permit to Work düzenlenmesi ve sahada kontrol edilmesi. Risk assessment formlarının hazırlanması, toolbox meeting'lerin yapılması ve PPE uyumunun denetlenmesi Birinci Zabitin günlük rutin işlerindendir.`
      },
      {
        title: "ISM Safety Officer görevleri",
        description: `Gemide safety committee toplantılarını organize eder, near-miss raporlarını toplar ve analiz eder, safety observation kartlarını değerlendirir ve düzeltici/önleyici aksiyonları takip eder. ISM internal audit bulgularına cevap hazırlar ve şirket DPA'sına raporlar.`
      },
      {
        title: "Güverte personeli yönetimi",
        description: `Reis (Bosun) ve güverte tayfalarının günlük iş dağılımı, vardiya düzeni, eğitim ihtiyaçları ve performans takibi. Yeni gelen personelin familiarization'ı, güverte departmanı disiplini ve çalışma saatlerinin MLC/ILO kurallarına uygun tutulması.`
      },
      {
        title: "Bağlama ve manevra operasyonları",
        description: `Yanaşma, kalkma ve demir operasyonlarında güverte ekibini yönetir. Mooring plan hazırlar, halat/bağlama düzenini kontrol eder, snap-back zone'ları belirler ve personeli güvenli pozisyonlara yerleştirir. STS (Ship-to-Ship) operasyonlarında fender düzeni ve hose bağlantısı koordinasyonunu yapar.`
      },
      {
        title: "Çevre koruma ve atık yönetimi",
        description: `Garbage management plan'ın uygulanması, bilge/sludge operasyonlarının kontrolü, SOPEP (Shipboard Oil Pollution Emergency Plan) prosedürlerinin hazır tutulması. Güverte bölgelerindeki kirlilik risklerinin kontrolü ve önlenmesi.`
      },
      {
        title: "Denetim ve sörvey hazırlığı",
        description: `PSC, vetting, flag state ve klas denetimlerine güverte departmanı açısından hazırlık yapılması. Emniyet ekipman kayıtları, PMS logları, drill kayıtları, risk assessment arşivi ve çalışma izni dosyalarının denetim formatına uygun tutulması.`
      },
      {
        title: "Ağır hava (heavy weather) hazırlığı ve güverte emniyeti",
        description: `Kötü hava öngörüldüğünde ya da seyir sırasında karşılaşıldığında güverte departmanının hazırlığını koordine etmek Birinci Zabitin sorumluluğudur. Hatch cover'ların sıkıca kapatılması ve cleating kontrolü, güverte üzeri tüm loose ekipmanın bağlanması (lashing), vinç kancalarının güvenceye alınması, gangway ve pilotluk merdiveninin kaldırılması, freeboard scupper ve freeing port'ların serbest olduğunun doğrulanması heavy weather preparation checklist'in temel kalemleridir. Personelin güverte üzerindeki hareketini kısıtlayan emrin verilmesi ve uygulanması da bu görevin parçasıdır. Yük kayması riskine karşı lashing tensioning ve güverte stres hesaplarının ağır hava koşullarında yeniden değerlendirilmesi gerekebilir.`
      },
      {
        title: "Hazırlık bildirisi (NOR) ve yük belgeleri yönetimi",
        description: `Notice of Readiness (NOR), geminin yükleme/boşaltmaya hazır olduğunun charterer veya terminal operatörüne resmi bildirimidir. NOR'un zamanında ve doğru biçimde verilmesi, taşıma sözleşmesi (charter party) kapsamında laycan hesabını doğrudan etkiler; geç verilen NOR demurrage kaybına yol açar. Statement of Facts (SoF), tüm port operasyonunun kayıt altına alındığı zaman çizelgesidir: NOR veriliş, operasyon başlangıç-bitiş, draftlar, vardiya değişimleri. Birinci Zabit bu belgeleri hazırlar ve imzalar. Mate's Receipt düzenleyerek kargo miktarını ve görünür durumunu teyit eder; şüpheli yük için zamanında Letter of Protest yazılmasını koordine eder.`
      }
    ],
    equipment: [
      {
        title: "Yük operasyon ekipmanları",
        checkpoints: [
          "Hatch cover'lar — contalar, cleating, ultrasonic test sonuçları",
          "Crane/derrick — SWL işaretleri, limit switch, wire condition",
          "Cargo securing equipment — lashing bar, turnbuckle, D-ring",
          "Draft marks ve sounding equipment",
          "Cargo hold bilge sistemi ve pompaları"
        ]
      },
      {
        title: "Mooring ve bağlama ekipmanları",
        checkpoints: [
          "Mooring winch'ler — brake test, clutch condition",
          "Halatlar ve teller — aşınma, kink, kesik tel",
          "Heaving line ve messenger line",
          "Bollard ve fairlead condition",
          "Snap-back zone işaretlemeleri",
          "Pilot ladder ve combination ladder"
        ]
      },
      {
        title: "Güverte bakım ekipmanları",
        checkpoints: [
          "Bosun's store — boya, macun, halat, gırgır",
          "Güverte yıkama sistemi",
          "Grease gun ve yağlama ekipmanları",
          "Scaffolding/staging malzemeleri",
          "İskele (gangway) ve accommodation ladder"
        ]
      },
      {
        title: "LSA ve FFE ekipmanları (genel gözetim)",
        checkpoints: [
          "Lifeboat, liferaft, lifebuoy, lifejacket envanter durumu",
          "Fire extinguisher, fire hose, SCBA, EEBD konum ve durumu",
          "Pyrotechnics, EPIRB, SART tarih ve sayı kontrolü",
          "Drill kayıtları ve sonraki drill planı",
          "Muster list güncelliği"
        ]
      }
    ],
    coreSummary: "Birinci Zabitin ana sorumluluğu, yük operasyonlarının emniyetli yürütülmesini, güverte departmanının idari ve teknik yönetimini ve emniyet ekipmanlarının sürekli hazır tutulmasını sağlamaktır.",
    criticalNotes: [
      "Yük kayması veya yapısal hasar, doğrudan Birinci Zabitin lashing/securing ve stabilite kontrolüne bağlıdır — eksik GM veya aşırı free surface, denetimde değil denizde ortaya çıkar.",
      "Hatch cover sızdırmazlık testi (ultrasonic veya hose test) yapılmadan yola çıkmak, yük hasarı ve P&I claim riskini artırır.",
      "Mooring kazaları gemi kazalarının en ölümcül türlerinden biridir; snap-back zone ihlali ile birçok denizci hayatını kaybetmiştir.",
      "Enclosed space entry izni olmadan tank veya kapalı alana giriş, doğrudan ölüm sebebidir — bu konuda sıfır tolerans uygulanmalıdır."
    ]
  },

  "ikinci-zabit": {
    slug: "ikinci-zabit",
    intro: `İkinci Zabit, seyir planlaması ve köprüüstü operasyonlarının birincil sorumlusudur. Haritalar, nautikal yayınlar, seyir cihazları ve GMDSS teçhizatı bu zabitin uhdesindedir. Köprüüstü "seyir zekâsı" olarak çalışır: passage plan hazırlar, meteorolojik değerlendirmeler yapar, ECDIS ve radar bakımlarını takip eder ve vardiya düzeninde aktif köprüüstü nöbeti tutar. STCW Code gereğince GMDSS operatörü sertifikasına sahip olması zorunludur.`,
    tasks: [
      {
        title: "Passage plan hazırlığı (berth-to-berth)",
        description: `Seyir planının appraisal, planning, execution ve monitoring aşamalarını yönetir. Rota seçimi, waypoint belirleme, UKC hesaplamaları, no-go area tespiti, contingency anchorage planlaması ve abort point belirleme bu sürecin parçalarıdır. IMO Guidelines on Voyage Planning (A.893(21)) çerçevesinde çalışır. Kısıtlı sularda, dar kanallarda ve TSS geçişlerinde detaylı plan hazırlar.`
      },
      {
        title: "Harita ve nautikal yayın yönetimi",
        description: `Kâğıt ve elektronik haritaların Notices to Mariners, T&P Notices ve NAVAREA uyarılarına göre düzeltilmesi. ECDIS veritabanı güncelleme prosedürlerinin takibi. Admiralty publications (NP, ATT, tide tables, list of lights vb.) envanterinin güncel tutulması. Folio listelerinin rota bazlı hazırlanması.`
      },
      {
        title: "GMDSS teçhizat sorumluluğu",
        description: `VHF DSC, MF/HF DSC, Inmarsat, NAVTEX, EPIRB, SART ve portable VHF cihazlarının günlük/haftalık/aylık testlerinin yapılması ve kayıt altına alınması. GMDSS log book'un tutulması. Batarya testleri, anten kontrolleri ve yedek parça durumunun izlenmesi. DSC test call prosedürlerinin uygulanması.`
      },
      {
        title: "Meteoroloji takibi ve weather routing",
        description: `Seyir süresince meteorolojik verilerin sürekli değerlendirilmesi: NAVTEX, weather fax, EGC mesajları, synoptic chart analizi. Ağır hava koşullarında rota alternatifi önerilmesi ve heavy weather preparation planının uygulanmasına destek. Tropical storm avoidance prosedürlerinin bilinmesi.`
      },
      {
        title: "Köprüüstü vardiyası (04-08 / 16-20)",
        description: `Bağımsız vardiya tutarak COLREG kurallarına uygun seyir yapar. Trafik değerlendirmesi, radar/ARPA plotting, AIS monitoring ve pozisyon doğrulama (cross-check) rutin işlemlerdir. Kritik durumlarda kaptanı zamanında çağırır. BRM (Bridge Resource Management) prensiplerini uygular.`
      },
      {
        title: "Seyir cihazları bakım ve kalibrasyon takibi",
        description: `Gyro compass error, magnetic compass deviation, speed log calibration, echo sounder kontrolleri ve radar performance monitor (RACON/SART test) kayıtlarının düzenli tutulması. ECDIS, AIS ve VDR'ın düzgün çalıştığının doğrulanması.`
      },
      {
        title: "Chronometer ve zaman yönetimi",
        description: `Gemi kronometresi/saatlerin doğruluğunun takibi, UTC referanslı zaman kontrolü, saat dilimi değişikliklerinin planlanması ve uygulanması.`
      },
      {
        title: "Köprüüstü ekibinin seyir eğitimi",
        description: `BRM tatbikatları, ECDIS familiarization, radar/ARPA eğitimi ve COLREG senaryoları üzerinde köprüüstü ekibinin yetkinliğinin artırılması. Yeni gelen zabit ve stajyerlerin seyir cihazları konusunda eğitilmesi.`
      },
      {
        title: "Revir (sick bay) ve tıbbi malzeme sorumluluğu",
        description: `İkinci Zabit, uluslararası pratikte geminin tıbbi sorumlusu (Medical Officer) olarak görev yapar. SOLAS Chapter III ve MLC 2006 Kural 4.1 gereğince gemide yeterli tıbbi ekipman ve ilaç bulundurulması zorunludur. Tıbbi chest envanterinin güncel tutulması, ilaç ve malzeme son kullanma tarihlerinin kontrolü, medical log book'un tutulması ve limanda ikmal listelerinin hazırlanması bu görevin kapsamındadır. Mürettebat hastalığı veya yaralanması durumunda TMAS (Telemedical Assistance Service) ile iletişim, hasta değerlendirmesi ve gerektiğinde medevac koordinasyonu İkinci Zabit tarafından yürütülür. Medical emergency drill ve ilk yardım tatbikatlarını organize eder.`
      }
    ],
    equipment: [
      {
        title: "Revir ve tıbbi ekipman",
        checkpoints: [
          "Medical chest — ilaç, enjektör, sargı malzemesi envanter ve son kullanma tarihleri",
          "Defibrilatör (AED) — batarya, pad son kullanma tarihi, self-test",
          "Oksijen tüpü ve regülatörü — basınç, maske durumu",
          "Sedye ve hasta taşıma ekipmanı — operasyonel durumu",
          "Medical log book — güncel tutulması",
          "TMAS iletişim prosedürleri ve acil tıp rehberi (IMGS)"
        ]
      },
      {
        title: "Seyir cihazları",
        checkpoints: [
          "ECDIS — yazılım güncelliği, backup system, sensor input kontrolleri",
          "Radar (X-band ve S-band) — tuning, performance monitor test",
          "Gyro compass — error kayıtları, repeater uyumu",
          "Magnetic compass — deviation card güncelliği",
          "Speed log — calibration kayıtları",
          "Echo sounder — drift kontrolü, keel/waterline offset ayarı",
          "AIS — statik/dinamik veri doğruluğu, transmit durumu",
          "GPS (primary ve secondary) — HDOP, satellite count takibi"
        ]
      },
      {
        title: "GMDSS teçhizatı",
        checkpoints: [
          "VHF DSC — Ch 16 ve Ch 70 test",
          "MF/HF DSC — frekans ayarları ve test call",
          "Inmarsat-C veya Fleet — log-on ve mesaj gönderim testi",
          "NAVTEX — her iki alıcı (518 kHz ve 490 kHz) çalışır mı",
          "EPIRB — self-test, HRU tarihi, batarya tarihi",
          "SART / AIS-SART — batarya tarihi, self-test",
          "Portable VHF'ler — batarya şarjı, Ch 16 test",
          "GMDSS batarya sistemi — şarj durumu, kapasite testi"
        ]
      },
      {
        title: "Harita ve yayınlar",
        checkpoints: [
          "Aktif folio haritaları düzeltilmiş mi",
          "ECDIS ENC lisansları geçerli mi",
          "NP yayınları (ATT, NP100, List of Lights vb.) güncel mi",
          "T&P Notice'lar işlenmiş mi",
          "Chart catalogue ve chart index mevcut mu"
        ]
      }
    ],
    coreSummary: "İkinci Zabitin ana sorumluluğu, seyir planlamasını berth-to-berth standardında hazırlamak, harita ve yayınları güncel tutmak, GMDSS teçhizatını çalışır durumda tutmak ve köprüüstü vardiyasını COLREG'e uygun sürdürmektir.",
    criticalNotes: [
      "ECDIS veritabanı güncellenmeden seyir başlatmak, en güncel tehlike bilgisinin olmadan hareket etmek demektir — bu doğrudan grounding veya collision riskidir.",
      "GMDSS teçhizat testi kayıtları tutulmazsa PSC'de 'not properly maintained' bulgusu çıkar.",
      "Passage plan kaptan tarafından onaylanmadan seyir başlatılmamalıdır; onaysız plan ISM non-conformity oluşturur.",
      "Gyro error 1°'nin üzerinde ise compass safe course hatalı olur — bu değer rutin olarak kontrol ve kayıt edilmelidir."
    ]
  },

  "ucuncu-zabit": {
    slug: "ucuncu-zabit",
    intro: `Üçüncü Zabit, birçok gemide Safety Officer olarak atanır ve LSA (Life-Saving Appliances) ile FFE (Fire-Fighting Equipment) sistemlerinin fiili sorumlusudur. Sorumluluğu "ekipmanı tanımak" değil; o ekipmanın her an çalışır durumda olduğunu, kayıtlarının düzgün tutulduğunu, personelin onu kullanabildiğini ve sörvey/PSC karşısında bunun ispatlanabildiğini sağlamaktır. SOLAS Chapter III ve II-2 kapsamında can kurtarma araçları ve yangınla mücadele ekipmanları gemide zorunludur; bunların teknik gerekleri LSA Code ve FSS Code ile belirlenir. ISM Code ise bunların bakım, kayıt ve güvenli işletimini sistematik hale getirmeyi amaçlar.`,
    tasks: [
      {
        title: "LSA kontrolü, bakım takibi ve kayıt",
        description: `Filika, sal, can yeleği, can simidi, pyrotechnics, EPIRB, SART gibi abandon ship ekipmanlarının eksiksiz, sağlam, erişilebilir ve kayıt altına alınmış olmasını sağlamak. Görev sadece "bakıldı" demek değildir; şunları teyit etmek zorunludur: ekipman yerinde mi, mühürleri sağlam mı, expiry date geçmiş mi, serbest erişilebilir mi, servis sertifikası geçerli mi, kayıtlar ile fizikî durum tutarlı mı. En sık hata: ekipman yerinde olur ama kayıtlar eksiktir. PSC bunu yakaladığında "bakım yapılmamış" olarak değerlendirilebilir.`
      },
      {
        title: "FFE kontrolü, bakım takibi ve kayıt",
        description: `Yangın tüpleri, hortumlar, SCBA, EEBD, fireman's outfit, hydrant, nozzle, fixed CO2, alarm sistemi, fire plan — bunların hepsi bu paketin içindedir. Yangın ekipmanının yarısı "orada durmak", yarısı "çalışır olmak", diğer kısmı ise "insanın onu kullanabiliyor olmasıdır." Son kısım drill ve familiarization ile sağlanır.`
      },
      {
        title: "Haftalık ve aylık testlerin yürütülmesi",
        description: `SOLAS III/20 ve ilgili gemi üzeri bakım rehberlerine göre lifeboat, launching appliance ve release gear gibi ekipmanlar için haftalık ve aylık kontrol düzeni bulunur. Pratikte şunları organize eder: haftalık lifeboat inspection, lifeboat engine run, general alarm test, emergency lighting check, selected fire stations check, monthly extinguisher/SCBA/EEBD/inventory control ve expiry list update.`
      },
      {
        title: "Muster list ve emergency station readiness",
        description: `Muster list, kimin hangi acil durumda ne yapacağını belirler. İşletmek görevidir: abandon ship'te kim filika başında, kim portable VHF getiriyor, kim EPIRB/SART alıyor, kim engine room boundary cooling yapıyor, kim injured person party'de. Gemide muster list panoda asılı ama adamlar kendi station'larını bilmiyorsa kâğıt ölüdür.`
      },
      {
        title: "Safety familiarization",
        description: `ISM mantığı gereğince yeni gelen personelin safety familiarization kayıtları güvenli işletimin somut delilidir. Yeni mürettebat üyesinin: can yeleğini nereden alacağını, muster station'ını, fire alarm butonlarını, kaçış yollarını, emergency escape'leri, fire doors/watertight doors kullanımını ve reporting chain'i bilmesi gerekir. Bunları gösterir, imza alır, kayıt tutarsın.`
      },
      {
        title: "Drill hazırlığı, icrası ve kayıtları",
        description: `Drill yapılıp geçilmez. İyi bir Safety Officer drill'i üç aşamada yönetir: öncesi (ekipman hazır mı, personel dağılımı net mi), sırası (doğru prosedür izlendi mi), sonrası (ne hata çıktı, ne düzeltilecek, ne log'a girecek). PSC bazen kayda bakmaz bile; iki kişiye sorar: "Where is your muster station?" "How do you start the rescue boat engine?" Burada ekip değil eğitim patlar.`
      },
      {
        title: "Defect report ve PMS work order takibi",
        description: `Bir ekipman arızalıysa iki seçenek vardır: gizlemek veya raporlamak. Birincisi denetimde yakar, ikincisi korur. Örnekler: SCBA low pressure whistle çalışmıyor, lifeboat battery weak, fire hose coupling cracked, EEBD seal broken, hydrant valve gland leaking. Bunlar defect olarak açılmalı, gerekiyorsa "out of service" işaretlenmeli, telafi tedbiri belirlenmeli.`
      },
      {
        title: "Survey, PSC, flag ve class hazırlığı",
        description: `SOLAS survey belgelerinde geminin LSA ve FFE sistemlerinin uygunluğu aranır. Denetimde beklenen: ekipmanın yerini bilmek, çalıştırabilmek, logbook'u göstermek, expiry ve service date'leri bilmek, arızaları gizlememek ve crew'nun eğitimli olması.`
      },
      {
        title: "Emniyet ekipman stok ve son kullanma tarihi takibi",
        description: `Bu iş küçümsenirse ciddi sonuçlar doğurur. Takip edilecekler: rocket parachute flare, hand flare, buoyant smoke signal, HRU, liferaft service due date, EPIRB battery, SART battery, portable radio battery, immersion suit seam test/inspection date, SCBA cylinder hydro test date. Bunlardan herhangi biri kaçarsa denetimde doğrudan bulgu çıkar.`
      },
      {
        title: "Acil durumda fiilî müdahale rolü",
        description: `Safety Officer sadece "kayıt zabiti" değildir. Yangında, adam denize düştüğünde veya abandon ship'te aktif rolü vardır. Tipik roller: forward fire party leader, boundary cooling coordination, rescue boat preparation, lifeboat embarkation control, head count verification ve distress equipment transfer. Şirket ve station bill'e göre değişir ama prensip budur.`
      },
      {
        title: "Safety housekeeping",
        description: `Küçümsenir ama ciddi bulgu çıkarır: fire locker önü dolu mu, extinguisher önü kapalı mı, escape route üstünde malzeme var mı, lifebuoy ışığı çürümüş mü, liferaft lashings boyalı olduğu için release serbest değil mi, hydrant dolabı pasla kilitlenmiş mi, fire door wedge ile açık tutuluyor mu. Bunlar "ufak kusur" değil; gerçek acilde adam öldürür.`
      },
      {
        title: "ISM Safety Committee ve near-miss yönetimi",
        description: `Birçok şirketin SMS'i gereğince gemide aylık Safety Committee toplantısı düzenlenir. Bu toplantıyı genellikle Üçüncü Zabit/Safety Officer organize eder ve yönetir: gündem hazırlama, katılımcı listesi, near-miss raporlarının değerlendirilmesi, düzeltici/önleyici aksiyon (CAPA) takibi ve toplantı tutanağının DPA'ya iletilmesi. Near-miss raporlama kültürü, "adam korktuğu için bildirmiyor" noktasına çekilmeden canlı tutulmalıdır — her bildirilen near-miss, ileride önlenecek bir kazadır.`
      },
      {
        title: "Uyuşturucu ve alkol testi (Drug & Alcohol testing)",
        description: `Safety Officer sıfatıyla, şirket D&A politikası kapsamında random test programının lojistiğini yürütür: test kitlerin yönetimi, testlerin belirsiz aralıklarla ve kayıt altında uygulanması, pozitif sonuçların kaptan ve şirkete gizlilikle bildirilmesi. Liman devleti veya terminal tarafından talep edilen D&A denetimlerinde süreci koordine eder. Test kitlerinin son kullanma tarihleri, chain of custody (gözetim zinciri) prosedürleri ve imha kayıtları da bu kapsamda tutulur.`
      }
    ],
    equipment: [
      {
        title: "Can filikaları (Lifeboats)",
        checkpoints: [
          "Gövde, canopy, pencere, drain plug sağlam mı",
          "İç envanter tam mı (su, bisküvi, first aid, sea anchor, paddles, bailer vb.)",
          "Engine start oluyor mu, battery condition, fuel level",
          "Cooling water discharge, steering, ahead/astern çalışıyor mu",
          "Launching arrangement — falls condition, sheaves, grease durumu",
          "Gripes/securing arrangement sağlam mı",
          "Hook arrangement ve release gear güvenli mi",
          "Liman/seyir emniyet pimi doğru pozisyonda mı"
        ]
      },
      {
        title: "Kurtarma botu (Rescue boat)",
        checkpoints: [
          "Hızlı şekilde suya indirilebilir mi",
          "Motor güvenilir mi, fuel ve battery durumu",
          "Painter ve recovery düzeni hazır mı",
          "Operasyon sırasında crew eğitimli mi",
          "Ekipman envanteri tam mı"
        ]
      },
      {
        title: "Can salları (Liferafts)",
        checkpoints: [
          "Container condition sağlam mı",
          "Cradle sağlam mı, lashings doğru mu",
          "Painter line doğru bağlanmış mı",
          "Launch path clear mi",
          "Service date geçerli mi",
          "Capacity marking okunuyor mu"
        ]
      },
      {
        title: "HRU (Hydrostatic Release Unit)",
        checkpoints: [
          "Model/type ve expiry date kontrolü",
          "Weak link doğru yerde mi",
          "Painter bağlantısı doğru mu",
          "Lashings HRU sistemine uygun mu"
        ]
      },
      {
        title: "Can simitleri (Lifebuoys)",
        checkpoints: [
          "Doğru sayıda ve tiplerde mi (normal, ışıklı, dumanlı, MOB)",
          "İşaretlemeleri okunuyor mu, retro-reflective tape iyi mi",
          "Line attached olanlar doğru yerde mi",
          "Light çalışıyor mu, smoke expired mı",
          "Bracket'ten rahat çıkıyor mu"
        ]
      },
      {
        title: "Can yelekleri (Lifejackets)",
        checkpoints: [
          "Bulunduğu yerde mi, sayısı yeterli mi",
          "Whistle ve light mevcut ve çalışır mı",
          "Retro tape sağlam mı, donning instructions okunur mu",
          "Dolaplar kilitli değil mi",
          "Bridge ve engine room extra lifejacket'lar yerinde mi"
        ]
      },
      {
        title: "Daldırma kıyafetleri (Immersion suits)",
        checkpoints: [
          "Zippers sağlam mı, seal çatlak mı",
          "Bedenler uygun mu, storage kuru mu",
          "Donning drill yapılabiliyor mu",
          "Periyodik seam/closure testi yapılmış mı"
        ]
      },
      {
        title: "Piroteknik işaretler (Pyrotechnics)",
        checkpoints: [
          "Rocket parachute flare, hand flare, buoyant smoke signal — expiry kontrol",
          "Quantity yeterli mi",
          "Locker condition ve nem/pas/deformasyon kontrolü",
          "Inventory list ile uyum"
        ]
      },
      {
        title: "Halat atma aparatı (Line throwing appliance)",
        checkpoints: [
          "Launcher condition, projectile sayısı",
          "Line durumu, instruction card mevcut mu",
          "Expiry/service date geçerli mi"
        ]
      },
      {
        title: "EPIRB",
        checkpoints: [
          "Bracket sağlam mı, hydrostatic release geçerli mi",
          "Battery expiry, self-test sonucu",
          "Registration/identity marking güncel mi",
          "Free float path engelli mi"
        ]
      },
      {
        title: "SART / AIS-SART",
        checkpoints: [
          "Battery expiry ve self-test",
          "Doğru yerde muhafaza ediliyor mu",
          "Abandon ship planında kim alacak belli mi"
        ]
      },
      {
        title: "Portatif yangın söndürücüler",
        checkpoints: [
          "Correct location ve type/area uyumu",
          "Pressure normal mi, pin & seal sağlam mı",
          "Body corrosion var mı, hose/nozzle tıkalı mı",
          "Servicing due date, weight check (CO2 için tartım)"
        ]
      },
      {
        title: "Yangın hortumları, nozzle ve hydrant'lar",
        checkpoints: [
          "Hose coupling çatlak mı, gasket yerinde mi",
          "Hose düzgün sarılı mı, nozzle çalışır mı",
          "Hydrant valve sıkışmış mı, leak var mı",
          "Station cabinet condition ve erişim serbest mi"
        ]
      },
      {
        title: "İtfaiyeci kıyafetleri (Fireman's outfits)",
        checkpoints: [
          "Tam set mi (kıyafet, boots, gloves, helmet, lamp, axe)",
          "Bedenler uygun mu, lamp çalışıyor mu",
          "Kıyafet yırtık mı, storage düzenli mi"
        ]
      },
      {
        title: "SCBA setleri",
        checkpoints: [
          "Cylinder pressure yeterli mi",
          "Low pressure alarm/whistle çalışıyor mu",
          "Face mask seal sağlam mı, straps ve demand valve",
          "Spare cylinders mevcut mu",
          "Hydro test date geçerli mi, set number tracking"
        ]
      },
      {
        title: "EEBD'ler",
        checkpoints: [
          "Bulunduğu yerde mi, seal bozulmuş mu",
          "Expiry date geçerli mi",
          "Instruction label okunuyor mu, location marking görünür mü"
        ]
      },
      {
        title: "Sabit CO2 sistemi",
        checkpoints: [
          "Release cabinet seal, pilot cylinders",
          "Instruction notice, alarm/pre-discharge warning",
          "Stop valves/selector valves doğru pozisyonda mı",
          "Room locked/controlled access",
          "Cylinders inventory ve weighing/servicing records",
          "Remote shutdown ve ventilation stop prosedürleri uyumlu mu"
        ]
      },
      {
        title: "Yangın algılama ve alarm sistemi",
        checkpoints: [
          "Panel healthy mi, fault var mı",
          "Zone'lar doğru mu, detectors bypass'ta mı",
          "Call points çalışıyor mu",
          "Crew alarm reset/acknowledge biliyor mu"
        ]
      },
      {
        title: "Yangın kapıları, damperler, quick closing valfler",
        checkpoints: [
          "Fire doors self-closing mi, wedge ile açık tutuluyor mu",
          "Remote flaps hareket ediyor mu",
          "Damper handle marking okunuyor mu",
          "Quick closing valve remote pull free mi",
          "Emergency stop düzeni çalışıyor mu"
        ]
      },
      {
        title: "Acil yangın pompası (Emergency fire pump)",
        checkpoints: [
          "Lokal ve remote start çalışıyor mu",
          "Suction condition, priming arrangement",
          "Pressure build-up yeterli mi",
          "Sea suction clear mi, delivery line readiness",
          "Start instructions visible mi"
        ]
      },
      {
        title: "International shore connection",
        checkpoints: [
          "Yerinde mi, cıvata/somun/conta tamam mı",
          "İşaretli mi, erişimi kolay mı"
        ]
      },
      {
        title: "General alarm ve PA sistemi",
        checkpoints: [
          "Bridge'den çalışıyor mu",
          "Accommodation ve engine room'da duyuluyor mu",
          "Emergency power altında da kullanılabiliyor mu"
        ]
      },
      {
        title: "Fire control plan ve emniyet işaretlemeleri",
        checkpoints: [
          "Plan güncel mi, gerçek gemi durumu ile uyumlu mu",
          "Fire stations, dampers, detectors, EEBD, escape routes planda doğru mu",
          "Dışarıdaki weather-tight tüpte kopyası mevcut mu",
          "Signage okunuyor mu, photoluminescent markings eksik mi"
        ]
      }
    ],
    coreSummary: "Üçüncü Zabitin ana emniyet sorumluluğu, geminin LSA ve FFE sistemlerini operasyonel, belgesel ve personel hazırlığı bakımından sürekli hazır tutmaktır.",
    criticalNotes: [
      "Lifeboat falls dıştan iyi görünür ama tel kırıkları başlayabilir — görsel kontrol yetmez, düzenli wire inspection gerekir.",
      "Hook/release mekanizması sertleşmiş olabilir — release gear test'i gerçekçi yapılmalıdır.",
      "Liferaft cradle pas nedeniyle release'i zorlayabilir; liferaft lashings boyalıysa HRU sistemi çalışmayabilir.",
      "EEBD yangın söndürmek için değil, kaçış içindir — crew bunu bilmiyorsa ekipman yanlış kullanılır.",
      "Fixed CO2 sisteminde eksik bilgi, yanlış salım kadar tehlikelidir — remote shutdown ve ventilation stop prosedürleri bilinmelidir.",
      "Fire door wedge ile açık tutulması 'ufak kusur' gibi görünür ama yangında duman yayılmasını engelleyen sistemi devre dışı bırakır.",
      "Hydrant dolabı pasla kilitlenmiş olabilir — yaşlı gemilerde bu çok yaygındır ve acil durumda dakikalar kaybettirir."
    ]
  },

  "dorduncu-zabit": {
    slug: "dorduncu-zabit",
    intro: `Dördüncü Zabit, güverte departmanının en kıdemsiz zabiti olup her gemide bulunması zorunlu değildir; ancak bulunduğu gemilerde köprüüstü vardiyası, emniyet ekipman kontrolleri ve yük operasyonlarına destek görevlerini üstlenir. Eğitim sürecinin tamamlanması ve tecrübe kazanılması açısından kritik bir dönemdir. STCW kapsamında bağımsız vardiya tutabilmek için gerekli yetkinlik sertifikasına sahip olmalıdır.`,
    tasks: [
      {
        title: "Köprüüstü vardiyası (00-04 / 12-16)",
        description: `Kaptan veya C/O gözetiminde bağımsız vardiya tutar. Radar, ECDIS ve ARPA kullanarak trafik değerlendirmesi yapar, pozisyon doğrulaması gerçekleştirir ve logbook kayıtlarını tutar. COLREG'e uygun seyir sürdürür; kritik durumlarda (yakın mesafe, sınırlı görüş, yoğun trafik) üst zabiti derhal çağırır. Vardiya teslim-devir prosedürlerini eksiksiz uygular.`
      },
      {
        title: "Emniyet ekipman kontrolleri (LSA/FFE destek)",
        description: `Üçüncü Zabit'e (Safety Officer) destek olarak lifejacket, lifebuoy, yangın dolapları, hortumlar ve portatif yangın söndürücülerin haftalık görsel kontrollerini yapar. Kontrol sonuçlarını kayıt altına alır, eksik veya arızalı ekipmanı raporlar. Muster list uygulamalarına ve drill hazırlıklarına aktif katılım sağlar.`
      },
      {
        title: "Harita ve yayın düzeltmelerine destek",
        description: `İkinci Zabit gözetiminde Notices to Mariners takibi, harita düzeltmeleri ve ECDIS güncelleme kontrollerine destek verir. T&P Notice'ların işlenmesi, folio listelerinin hazırlanması ve yayın envanterinin güncellenmesi görevlerine katkıda bulunur.`
      },
      {
        title: "Limanda güverte nöbeti (gangway watch)",
        description: `Limanda gemiye giriş-çıkış kontrolü, ISPS güvenlik seviyesi gerekliliklerinin uygulanması, ziyaretçi kaydı, yük operasyonu sırasında güverte gözetimi ve acil duruma hazırlık. Gangway watchman olarak geminin güvenliğinden sorumludur.`
      },
      {
        title: "Yük operasyonlarında destek",
        description: `Birinci Zabit koordinasyonunda yükleme/boşaltma gözetimi, tank sounding'leri, draft okuma ve cargo tally tutma. Hatch cover açma/kapama operasyonlarına katılım ve lashing/securing kontrollerine destek.`
      },
      {
        title: "Bağlama ve manevra operasyonlarına katılım",
        description: `Yanaşma ve kalkma operasyonlarında belirlenen istasyonda (forward veya aft) görev alır. Halat/tel kullanımı, winch operasyonu ve güvenli çalışma pratiklerini öğrenir. Snap-back zone bilinci ve ekip koordinasyonu pratiği kazanır.`
      },
      {
        title: "Sistem ve prosedür öğrenimi",
        description: `Köprüüstü cihazları (ECDIS, radar, AIS, GMDSS), emniyet prosedürleri (ISM, ISPS, SOPEP), yük operasyon prosedürleri ve güverte bakım sistemleri hakkında pratik bilgi kazanır. Training record book'unu güncel tutar.`
      },
      {
        title: "Kayıt ve dokümantasyon desteği",
        description: `Deck logbook girişlerine destek, seyir kayıtlarının düzenlenmesi, emniyet kontrol formlarının doldurulması ve drill raporlarının hazırlanmasına katkı. Doğru kayıt tutma alışkanlığını bu dönemde kazanır.`
      }
    ],
    equipment: [
      {
        title: "Köprüüstü seyir cihazları (kullanım ve öğrenim)",
        checkpoints: [
          "ECDIS — temel operasyon, route monitoring, alarm ayarları",
          "Radar/ARPA — target tracking, guard zone, rain/sea clutter ayarı",
          "AIS — target bilgi okuma, CPA/TCPA değerlendirmesi",
          "Gyro ve magnetic compass — error kontrolü, heading karşılaştırması",
          "VHF — Ch 16 dinleme, trafik iletişimi",
          "Echo sounder ve speed log — okuma ve doğrulama"
        ]
      },
      {
        title: "Haftalık kontrol sorumluluğundaki emniyet ekipmanları",
        checkpoints: [
          "Can yelekleri — konum, sayı, ışık ve düdük kontrolü",
          "Can simitleri — ışık, duman işareti, retro tape durumu",
          "Portatif yangın söndürücüler — basınç, pin/seal, korozyon",
          "Yangın hortum dolapları — hortum, nozzle, hydrant durumu",
          "Kaçış yolu aydınlatması ve işaretlemeleri"
        ]
      }
    ],
    coreSummary: "Dördüncü Zabitin ana görevi, gözetim altında bağımsız vardiya tutarak seyir ve emniyet yetkinliğini geliştirmek, emniyet ekipman kontrollerine destek vermek ve güverte operasyonlarını pratik olarak öğrenmektir.",
    criticalNotes: [
      "En kıdemsiz zabit olarak en önemli beceri 'ne zaman üst zabiti çağıracağını bilmek'tir — geç kalınan bir çağrı, erken yapılan bir çağrıdan çok daha tehlikelidir.",
      "Vardiya teslim-devir sırasında eksik veya yanlış bilgi aktarımı, bir sonraki vardiyada kazaya zemin hazırlar.",
      "Gangway watch sırasında ISPS güvenlik ihlali (yetkisiz giriş, kontrol edilmemiş ziyaretçi) doğrudan ciddi bulgudur.",
      "Training record book güncel tutulmazsa sertifika yenileme sürecinde sorun yaşanır."
    ]
  },

  "reis-bosun": {
    slug: "reis-bosun",
    intro: `Reis (Bosun), güverte tayfalarının doğrudan amiridir ve Birinci Zabit'in sağ koludur. Güverte bakım operasyonlarının sahadaki yürütücüsü, ekip lideri ve pratik bilgi deposudur. Teknik olarak zabit değildir ancak güverte operasyonlarının fiilî yönetimi büyük ölçüde reisin liderliğine bağlıdır. Deneyimli bir reis, güverte departmanının verimliliğini doğrudan belirler.`,
    tasks: [
      {
        title: "Güverte ekibinin günlük yönetimi ve iş dağılımı",
        description: `Birinci Zabit'ten aldığı iş emirlerini güverte tayfalarına dağıtır, işlerin öncelik sırasını belirler ve sahada gözetim yapar. Günlük toolbox meeting'leri yönetir, PPE kontrollerini yapar ve iş güvenliği kurallarına uyumu denetler. Ekibin motivasyonu ve disiplini büyük ölçüde reisin liderlik kalitesine bağlıdır.`
      },
      {
        title: "Güverte bakım operasyonlarının yürütülmesi",
        description: `Koruyucu boya işleri, pas temizliği, chipping/grinding, güverte yıkama, halat/tel bakımı ve değişimi, vinç/winch greasing, hatch cover bakımı ve güverte makine ekipmanlarının rutin bakımı. PMS iş emirlerinin sahada uygulanmasını koordine eder ve tamamlanan işleri raporlar.`
      },
      {
        title: "Bağlama ve manevra operasyonlarında ekip yönetimi",
        description: `Yanaşma/kalkma ve demir operasyonlarında güverte ekibini yönetir. Forward veya aft bağlama istasyonunda operasyonel liderlik yapar. Halat/tel kullanımı, winch operasyonu ve güvenli çalışma pratiklerini tayfalarla birlikte uygular. Snap-back zone disiplinini sağlar.`
      },
      {
        title: "Güverte düzeni ve housekeeping",
        description: `Güverte üzeri genel düzen, temizlik ve güvenlik standartlarının sürdürülmesi. Kaçış yollarının açık tutulması, emniyet ekipman erişiminin engellenmemesi, kayma/düşme risklerinin kontrolü. Limanda ve seyirde güverte alanlarının denetim hazırlığı açısından düzenli tutulması.`
      },
      {
        title: "Yük operasyonlarında güverte desteği",
        description: `Hatch cover açma/kapama, lashing/securing operasyonları, cargo hold temizliği ve hazırlığı. Tank sounding'lerine destek, bilge kontrolü ve güverte üzeri yük emniyeti. Birinci Zabit'in yük operasyonu talimatlarının sahada uygulanması.`
      },
      {
        title: "Bosun's store ve malzeme yönetimi",
        description: `Bosun's store envanterinin takibi: halatlar, teller, boya, macun, temizlik malzemeleri, el aletleri, shackle/turnbuckle ve diğer güverte malzemeleri. İhtiyaç listelerinin hazırlanması ve Birinci Zabit'e iletilmesi. Malzeme israfının önlenmesi.`
      },
      {
        title: "İskele, merdiven ve erişim ekipmanlarının bakımı",
        description: `Pilot ladder, accommodation ladder, gangway, bosun's chair ve güverte erişim ekipmanlarının bakımı, kontrolü ve güvenli kullanımı. SOLAS Chapter V pilot transfer arrangement gerekliliklerine uygun hazırlık.`
      },
      {
        title: "Acemilik eğitimi ve yeni personel desteği",
        description: `Yeni gelen güverte tayfalarına pratik işleri öğretmek, güvenli çalışma alışkanlıklarını kazandırmak ve ekibe entegrasyonlarını sağlamak. Deneyimsiz personelin yüksek riskli işlerde (overside work, working aloft) gözetim altında çalışmasını sağlamak.`
      },
      {
        title: "Demir (anchor) operasyonlarında ekip liderliği",
        description: `Demir tarama ve demir alma operasyonlarında fo'c'sle güvertesindeki ekibi yönetir. Anchor windlass operasyonu, chain stopper kullanımı, demir zincirinin güvenli kontrolü ve kanca işlemlerini koordine eder. Kaptan veya zabitin köprüüstünden verdiği komutları (shackle sayısı, vira/fıra) sahada hayata geçirir. Demir zincirinin durumunu (link aşınması, çatlak, marking) seyir öncesinde kontrol eder; anormal yük ya da titreşimde köprüüstünü uyarır. Demir cezasında (dragging anchor) veya acil demir tarama durumunda sahadaki en kritik kişidir.`
      },
      {
        title: "Kapalı mekan girişi (enclosed space entry) için ekip hazırlığı",
        description: `Cargo hold, ballast tank, void space, cofferdam ve pump room gibi kapalı mekânlara giriş, SOLAS ve ISM Code açısından en yüksek riskli çalışmalar arasındadır. Reis, Birinci Zabitten alınan Enclosed Space Entry Permit'e uygun olarak ekibi hazırlar: standby kişinin atanması, atmosfer ölçüm cihazının (O2, HC, H2S, CO) kullanımı, SCBA veya SAA hazırlığı, kurtarma hattı ve lifeline düzenlemesi. Çalışma süresince dışarıda standby tutar, periyodik kontroller yapar ve iletişimi sürdürür. "Sadece bakayım" refleksiyle kapalı mekâna giren ve kurtarmaya koşan personelin hayatını kaybettiği vakalar sıkça belgelenmiştir.`
      }
    ],
    equipment: [
      {
        title: "Bağlama ve halat ekipmanları",
        checkpoints: [
          "Mooring ropes — aşınma, kink, kopma belirtileri",
          "Steel wire ropes — broken wires, corrosion, lubrication",
          "Heaving lines ve messenger lines — durumu ve hazırlığı",
          "Shackles, thimbles ve connecting hardware",
          "Mooring winch brake band — aşınma kontrolü"
        ]
      },
      {
        title: "Güverte bakım ekipmanları",
        checkpoints: [
          "Boya ve macun stokları — tip, miktar, son kullanma",
          "Chipping hammers, grinders, wire brushes — durumu",
          "Güverte yıkama hortumları ve nozzle'lar",
          "Grease gun ve yağlama malzemeleri",
          "El aletleri — spanners, wrenches, pliers genel durumu"
        ]
      },
      {
        title: "Erişim ve çalışma ekipmanları",
        checkpoints: [
          "Pilot ladder — basamak, halat, spreader durumu, securing",
          "Accommodation ladder — mekanik aksamı, aydınlatma",
          "Gangway — ray, korkuluk, ağ",
          "Bosun's chair ve safety harness — kayış, kanca, kilit",
          "Staging/scaffolding malzemeleri — sağlamlık kontrolü"
        ]
      },
      {
        title: "Demir ve demir donanımı",
        checkpoints: [
          "Anchor chain — link condition, marking",
          "Windlass — brake test, clutch, hydraulic/electric",
          "Chain stopper ve lashing",
          "Anchor ball/light hazırlığı"
        ]
      }
    ],
    coreSummary: "Reisin ana sorumluluğu, güverte bakım ve operasyon işlerinin sahada emniyetli ve verimli şekilde yürütülmesini sağlamak, ekibi yönetmek ve Birinci Zabit'in iş emirlerini pratiğe dönüştürmektir.",
    criticalNotes: [
      "Deneyimli bir reis olmadan güverte operasyonları yavaşlar ve iş güvenliği riski artar — reisin pratik bilgisi zabitin teorik bilgisini tamamlar.",
      "Halat kopması gemi kazalarının en ölümcül türlerindendir; reisin snap-back zone disiplini konusundaki kararlılığı hayat kurtarır.",
      "Pilot ladder kazaları hâlâ yaşanmaktadır — securing arrangement ve basamak kontrolü titizlikle yapılmalıdır.",
      "Bosun's store dağınıklığı, ihtiyaç anında doğru malzemeye ulaşılamaması demektir — düzenli envanter takibi zorunludur."
    ]
  },

  "ustagemici": {
    slug: "ustagemici",
    intro: `Usta Gemici (AB — Able Seaman) ve Gemiciler (OS — Ordinary Seaman), güverte departmanının iş gücünü oluşturur. Seyirde köprüüstü lookout ve dümen nöbeti, limanda bağlama operasyonları, güverte bakım işleri ve yük operasyonlarına destek birincil görevleridir. AB unvanı STCW kapsamında belirli deniz hizmeti süresini ve yetkinlik sınavını gerektirir; OS ise daha deneyimsiz tayfa kategorisidir.`,
    tasks: [
      {
        title: "Seyir vardiyasında lookout ve dümen nöbeti",
        description: `Köprüüstü vardiya düzeninde lookout (gözcü) ve helmsman (dümenci) olarak görev alır. Lookout görevi, çevre gözetimi ve tüm cisimlerin/ışıkların/ses sinyallerinin vardiya zabitine raporlanmasını içerir. Dümen nöbetinde verilen rota komutlarını doğru ve zamanında uygular. COLREG Rule 5 gereğince lookout, uygun görsel ve işitsel gözetimi her koşulda sürdürmelidir.`
      },
      {
        title: "Bağlama ve manevra operasyonları",
        description: `Yanaşma, kalkma ve demir operasyonlarında halat/tel kullanımı, winch operasyonu, heaving line atma ve bollard bağlama işlerini yapar. Reis veya zabitin komutlarını uygular. Snap-back zone'dan uzak durma bilinci ve güvenli çalışma pratiklerini uygular. Tug bağlama/çözme operasyonlarına destek verir.`
      },
      {
        title: "Güverte bakım işleri",
        description: `Boyama, pas temizliği, chipping, grinding, güverte yıkama, halat/tel bakımı ve greasing işlerini yürütür. Reisin yönetiminde günlük bakım programını uygular. İşe başlamadan önce risk assessment ve PPE kontrolü yapar.`
      },
      {
        title: "Yük operasyonlarına destek",
        description: `Hatch cover açma/kapama, lashing/securing, cargo hold temizliği ve hazırlığı işlerine katılır. Tank sounding'leri ve draft okuma işlemlerine destek verir. Güverte üzeri yük emniyetinin sağlanmasına katkıda bulunur.`
      },
      {
        title: "Emniyet ekipmanları ve drill'lere katılım",
        description: `Muster station'da hazır bulunma, tatbikatlarda verilen görevleri yerine getirme (filika ekibi, yangın partisi, boundary cooling vb.). Can yeleği, EEBD kullanımı ve kaçış yollarını bilme. Kendi emniyet ekipmanlarının bakımına destek.`
      },
      {
        title: "İskele ve erişim ekipmanlarının kurulumu",
        description: `Pilot ladder, gangway ve accommodation ladder kurulumu ve toplanmasına destek. Güvenlik ağı, can simidi ve aydınlatma düzeninin hazırlanması. Pilot boarding arrangement'ın SOLAS gerekliliklerine uygun hazırlanmasına yardım.`
      },
      {
        title: "Güverte düzeni ve temizlik",
        description: `Güverte alanlarının temiz, düzenli ve güvenli tutulması. Kaçış yollarının açık tutulması, emniyet ekipmanlarına erişimin engellenmemesi. Drenaj kanallarının, scupper'ların ve freeing port'ların açık tutulması.`
      },
      {
        title: "Kapalı mekan girişlerinde standby ve kurtarma desteği",
        description: `Enclosed space entry operasyonlarında AB, reisten alınan talimata göre dışarıda standby görevi üstlenir. Lifeline tutar, iletişimi sürdürür, atmosfer ölçüm cihazını kullanmayı bilir ve içerideki kişinin rahat bölgeden çıkması durumunda alarm verir. Kurtarma gerekirse içeri girmeden önce SCBA takarak ve ek personel çağırarak hareket eder — "kahraman kurtarma" girişimi, makine dairesi boğulma vakalarının önemli bir kısmında hayatı kurtarmak yerine ikinci kurban yaratmıştır.`
      }
    ],
    equipment: [
      {
        title: "Bağlama ekipmanları (kullanım düzeyinde)",
        checkpoints: [
          "Halatların güvenli kullanımı ve aşınma kontrolü",
          "Winch operasyonu — kumanda, fren, emniyet",
          "Heaving line atma becerisi",
          "Bollard ve fairlead üzerinde güvenli bağlama"
        ]
      },
      {
        title: "Güverte bakım aletleri",
        checkpoints: [
          "Boya fırçası, rulo ve boya kapları",
          "Chipping hammer, scraper, wire brush",
          "Grinder — disk değişimi, güvenlik siperliği",
          "Güverte yıkama ekipmanları"
        ]
      },
      {
        title: "Kişisel emniyet ekipmanları",
        checkpoints: [
          "Can yeleği — konum ve kullanım bilgisi",
          "Hardhat, safety shoes, gloves, goggles",
          "Safety harness — yüksekte çalışma için",
          "EEBD — konum ve donning bilgisi"
        ]
      }
    ],
    coreSummary: "Usta Gemici ve Gemicilerin ana görevi, seyirde lookout/dümen nöbetini sürdürmek, güverte bakım ve bağlama operasyonlarını güvenli şekilde yürütmek ve emniyet tatbikatlarına aktif katılım sağlamaktır.",
    criticalNotes: [
      "Lookout görevinde dikkat dağınıklığı veya raporlama eksikliği, çarpışma riskini doğrudan artırır — bu görev COLREG'in en temel gerekliliklerinden biridir.",
      "Halat/tel operasyonlarında snap-back zone ihlali ölümcül sonuçlara yol açabilir.",
      "PPE kullanmadan çalışmak, en basit işte bile ciddi yaralanma riskini taşır.",
      "AB ile OS arasındaki temel fark deneyim ve yetkinliktir — OS'un yüksek riskli işlerde mutlaka gözetim altında çalışması gerekir."
    ]
  },

  "guverte-stajyer": {
    slug: "guverte-stajyer",
    intro: `Güverte Stajyeri (Deck Cadet), denizcilik eğitiminin deniz stajı bölümünü tamamlamak üzere gemide bulunan aday zabit adayıdır. STCW Code'un öngördüğü deniz hizmet süresini doldurarak Vardiya Zabiti yeterliliğine giden yolda pratik eğitim alır. Stajyer, gemide yetki veya imza sorumluluğu taşımaz; ancak tüm operasyonlara gözlem ve destek düzeyinde katılması beklenir. Training Record Book (TRB) bu sürecin resmi belgesidir.`,
    tasks: [
      {
        title: "Köprüüstü vardiyasına eğitim amaçlı katılım",
        description: `Vardiya zabitinin gözetiminde köprüüstü nöbetine katılır. Radar, ECDIS, AIS kullanımını gözlemler ve pratik yapar. Pozisyon plottlama, trafik değerlendirmesi ve log tutma becerilerini geliştirir. COLREG kurallarını pratik ortamda öğrenir. Bağımsız karar alma yetkisi yoktur; her durumda zabitin onayını alır.`
      },
      {
        title: "Seyir planlamasına destek",
        description: `İkinci Zabit gözetiminde harita düzeltmelerine, passage plan hazırlığına ve NAVTEX/NtM takibine destek verir. Harita okuma, waypoint hesaplama ve UKC kontrolü pratik olarak öğrenilir.`
      },
      {
        title: "Güverte operasyonlarına katılım",
        description: `Bağlama, demir, yük operasyonları ve güverte bakım işlerine gözlem ve destek düzeyinde katılır. Halat kullanımı, vinç operasyonu ve güverte ekipmanlarının işleyişini pratik olarak öğrenir. Yüksek riskli işlerde mutlaka gözetim altında çalışır.`
      },
      {
        title: "Emniyet tatbikatlarına katılım",
        description: `Tüm drill'lerde muster station'da hazır bulunur ve verilen görevleri yerine getirir. Can yeleği giyme, EEBD kullanma, yangın söndürücü kullanma ve kaçış yollarını öğrenir. Tatbikat gözlemlerini TRB'ye kaydeder.`
      },
      {
        title: "Training Record Book (TRB) yönetimi",
        description: `STCW'nin öngördüğü yetkinlik alanlarını kapsayan TRB'yi günlük olarak doldurur. Her görev, gözlem ve eğitim modülü kayıt altına alınır. Eğitmen zabitin imzasını ve değerlendirmesini alır. TRB tamamlanması sertifika sınavına girebilmenin ön koşuludur.`
      },
      {
        title: "ISM ve güvenlik prosedürlerini öğrenme",
        description: `Geminin Safety Management System'ini, risk assessment prosedürlerini, PTW sistemini ve ISPS gerekliliklerini öğrenir. Near-miss raporlama sistemini, safety committee yapısını ve çevresel koruma prosedürlerini tanır.`
      },
      {
        title: "Teknik bilgi ve sistem öğrenimi",
        description: `Gemi sistemleri (ballast, bilge, fire main, steering gear, anchoring), köprüüstü cihazları ve yük operasyon prensiplerini sistematik olarak öğrenir. Kaptan veya zabitler tarafından verilen eğitim modüllerini tamamlar.`
      },
      {
        title: "Deniz hizmet belgesi (Sea Service Certificate) ve sertifika süreci",
        description: `Stajyer, gemide geçirdiği her seyir dönemini resmi Sea Service Certificate (deniz hizmet belgesi) ile belgelemek zorundadır. Bu belge, kaptan tarafından imzalanır ve tarihleri, gemi adını, seyir bölgesini ve görev tanımını içerir. STCW'nin OICNW (Officer in Charge of Navigational Watch) yeterlilik belgesi için gereken 12 aylık deniz hizmetinin ispatında bu belgeler temel kanıttır. Stajyerin kendi sorumluluğu: belgeleri doğru talep etmek, kayıpsız saklamak ve her liman değişiminde yeniden başlatmak. Eksik veya hatalı belgeler ileride sertifika sınavına girebilme hakkını tehlikeye atabilir.`
      }
    ],
    equipment: [
      {
        title: "Öğrenim düzeyinde köprüüstü cihazları",
        checkpoints: [
          "ECDIS — route display, alarm tanıma, layer kontrolü",
          "Radar — temel operasyon, range/bearing ölçümü",
          "Magnetic compass — bearing alma, deviation anlama",
          "VHF — temel iletişim prosedürü",
          "AIS — target bilgi okuma"
        ]
      },
      {
        title: "Kişisel emniyet ekipmanları",
        checkpoints: [
          "Can yeleği — konum, giyme süresi",
          "EEBD — konum ve kullanım prosedürü",
          "PPE — hardhat, safety shoes, gloves, goggles",
          "Safety harness — yüksekte çalışma koşullarında"
        ]
      }
    ],
    coreSummary: "Güverte Stajyerinin ana görevi, gözetim altında tüm güverte operasyonlarını gözlemlemek ve pratik yapmak, TRB'yi eksiksiz doldurmak ve STCW yetkinlik gerekliliklerini karşılayacak deniz hizmeti tecrübesi kazanmaktır.",
    criticalNotes: [
      "Stajyer bağımsız karar alamaz ve imza yetkisi yoktur — her durumda gözetmen zabitin onayı gerekir.",
      "TRB doldurulmazsa veya eksik bırakılırsa staj süresi tanınmayabilir — bu belge kariyer açısından kritiktir.",
      "Stajyerin yüksek riskli işlerde (overside work, enclosed space, mooring) mutlaka gözetim altında olması gerekir.",
      "Gemide geçen süre sadece 'olmak' değil 'öğrenmek' içindir — aktif katılım ve soru sorma teşvik edilmelidir."
    ]
  },

  // ═══════════════════════════════════════════════════
  // MAKİNE DEPARTMANI
  // ═══════════════════════════════════════════════════

  "bas-muhendis": {
    slug: "bas-muhendis",
    intro: `Baş Mühendis (Chief Engineer), makine departmanının en üst amiridir. Ana makine, yardımcı makineler, jeneratörler, kazan, soğutma sistemleri, ballast/bilge pompaları, yakıt/yağ sistemleri, şaft ve pervane dahil tüm teknik sistemlerin operasyonel bütünlüğünden sorumludur. ISM Code kapsamında makine departmanının güvenli işletiminin nihai garantörüdür. Kaptan ile eşdeğer kıdemde olup, teknik konularda bağımsız karar alma yetkisine sahiptir.`,
    tasks: [
      {
        title: "Ana makine ve itki sisteminin sürekli operasyonelliği",
        description: `Ana makinenin güvenilir çalışmasını sağlamak, performans parametrelerini izlemek, yakıt tüketim optimizasyonu yapmak ve kritik arızalarda karar almak. Cylinder liner wear, piston ring condition, turbocharger performance ve exhaust gas analysis gibi performans göstergelerini değerlendirir. Şaft ve pervane sisteminin titreşim analizi ve alignment kontrolünü takip eder.`
      },
      {
        title: "Planned Maintenance System (PMS) yönetimi",
        description: `Tüm makine ekipmanlarının bakım takvimini yönetir, iş emirlerini onaylar, kayıtların doğruluğunu kontrol eder ve bakım performansını izler. PMS'in sadece kâğıt üstünde değil, sahada da gerçekleştiğini denetler. Klas ve bayrak devleti survey'leri için PMS kayıtları birincil kanıttır.`
      },
      {
        title: "Yakıt ve yağ yönetimi",
        description: `Bunker planlaması, yakıt kalite kontrolü (CCAI, density, viscosity, water content), bunker operasyonlarının emniyetli yürütülmesi ve yakıt tüketim raporlaması. MARPOL Ek VI kapsamında sulphur content uyumluluğu, ECA bölgelerinde yakıt değişimi prosedürleri ve EEXI/CII performans takibi.`
      },
      {
        title: "Makine dairesi emniyet yönetimi",
        description: `Makine dairesi yangın algılama, sabit söndürme (CO2, water mist), bilge alarm ve acil kapatma sistemlerinin çalışır durumda tutulması. Hot work izinleri, enclosed space entry prosedürleri ve LOTO (Lock Out Tag Out) uygulamalarının denetimi. Emergency generator ve emergency fire pump'ın düzenli test edilmesi.`
      },
      {
        title: "Çevre koruma ve MARPOL uyumluluğu",
        description: `OWS (Oil Water Separator) ve 15 ppm bilge alarm operasyonları, sludge ve slop tank yönetimi, ORB (Oil Record Book) kayıtlarının doğruluğu. Ballast Water Management System operasyonu. Çöp yönetimi ve atık yağ bertarafı. NOx, SOx ve PM emisyon kontrolleri.`
      },
      {
        title: "Yedek parça ve malzeme yönetimi",
        description: `Kritik yedek parçaların (MARPOL requirement + klas requirement) stok kontrolü, sipariş planlaması ve bütçe yönetimi. İkmal listelerinin hazırlanması ve önceliklendirme. Ekipman servis sertifikalarının takibi.`
      },
      {
        title: "Makine personelinin yönetimi ve eğitimi",
        description: `İkinci Mühendis, Üçüncü/Dördüncü Mühendis, ETO ve makine tayfalarının görev dağılımı, vardiya düzeni, yetkinlik değerlendirmesi ve eğitim planlaması. Familiarization, safety training ve vendor-specific eğitimlerin koordinasyonu.`
      },
      {
        title: "Denetim ve survey hazırlığı",
        description: `Annual survey, intermediate survey ve special survey hazırlıkları. PSC, vetting ve klas denetimlerinde makine departmanı açısından hazırlık. Condition of class notlarının takibi, düzeltici aksiyonların planlanması. Survey öncesi test ve trial planlaması.`
      },
      {
        title: "Teknik raporlama ve şirket iletişimi",
        description: `Günlük/haftalık/aylık teknik raporlar, noon report verileri, voyage abstract, yakıt ve yağ tüketim raporları. Superintendent ile teknik konularda iletişim, arıza raporlaması ve tamir/bakım planlaması koordinasyonu.`
      },
      {
        title: "Acil durumda teknik müdahale",
        description: `Blackout recovery, ana makine arızası, emergency steering, fire in engine room ve flooding senaryolarında karar alma ve müdahale koordinasyonu. Emergency procedures'ın makine ekibine düzenli olarak eğitilmesi ve tatbik edilmesi.`
      },
      {
        title: "ECA bölgelerinde düşük kükürtlü yakıt (LSFO/MGO) geçişi yönetimi",
        description: `MARPOL Ek VI Regulation 14 gereğince ECA (Emission Control Area) bölgelerine giriş ve çıkışlarda yakıt değişimi zorunludur. Baş Mühendis bu geçişin teknik prosedürünü tasarlar ve denetler: geçiş noktasından önce geçişin başlatılması, HFO servis tankından LSFO/MGO servis tankına geçiş, sistem arındırması (purging) süresi hesabı ve kükürt içeriğinin 0.10%'un altına düşürülmesi. Fuel changeover logbook kaydının tutulması, geçiş tamamlanmadan ECA'ya girilmemesi ve acil durum prosedürlerinin (yakıt karışması, viskozite sorunları) hazır tutulması kritik gerekliliklerdir.`
      },
      {
        title: "Baş Mühendis gece talimatları (Chief Engineer night orders)",
        description: `Kaptanın "night orders" pratiğinin makine departmanındaki karşılığıdır. Baş Mühendis, gece vardiyası için beklenebilecek arıza risklerini, kritik parametre eşiklerini, özel bakım görevlerini ve hangi durumlarda uyandırılması gerektiğini yazılı olarak bildirir. Bu uygulama, gece makine dairesini yöneten 3./4. Mühendisin karar yetki sınırlarını netleştirir; gecenin ilerleyen saatlerinde önlenebilir büyük arızaların raporlanmadan büyümesinin önüne geçer.`
      },
      {
        title: "Yağlama yağı analiz programı (LO analysis)",
        description: `Ana makine, jeneratörler ve yardımcı ekipmanlara ait yağlama yağlarının periyodik olarak analiz edilmesi Baş Mühendisin gözetiminde yürütülür. Yağ numuneleri belirlenen aralıklarla alınır, sertifikalı bir laboratuvara gönderilir ve sonuçlar (viskozite, TBN, TAN, metal içerikleri, su kirliliği, soot) değerlendirilir. Anormal bulgu (örneğin yüksek demir ya da bakır içeriği) erken aşamada iç aşınma veya soğutma sistemi arızasına işaret eder. Yağ değişim kararı saat-bazlı rutine değil, analiz sonuçlarına göre verilmesi hem ekipman ömrünü uzatır hem de maliyet etkinliği sağlar. Analiz sonuçları PMS kayıtlarına işlenir ve klas society veya Superintendent talebi halinde sunulur.`
      }
    ],
    equipment: [
      {
        title: "Ana makine ve itki sistemi",
        checkpoints: [
          "Ana makine — performans parametreleri, alarm listesi",
          "Turbocharger — titreşim, surging, bearing temperature",
          "Şaft ve pervane — alignment, seal, stern tube yağlama",
          "Starting air sistemi — kompresör, şişe, dağıtıcı",
          "Fuel injection sistemi — pump timing, injector condition"
        ]
      },
      {
        title: "Yardımcı makineler ve jeneratörler",
        checkpoints: [
          "Diesel generator — yük testi, otomatik devreye girme",
          "Emergency generator — haftalık test, yakıt seviyesi",
          "Air compressors — emniyet valfı, otomatik çalışma",
          "Boiler/economizer — su testi, safety valve, flame failure",
          "Purifier/separator — backwash, sludge, o-ring"
        ]
      },
      {
        title: "Pompa ve boru sistemleri",
        checkpoints: [
          "Ballast pompalar — kapasite, valf sistemi",
          "Bilge pompa ve OWS — 15 ppm alarm, kayıt",
          "FO/DO transfer ve service pompalar",
          "LO pompalar ve sirküle eden sistemler",
          "Fire main pompa — basınç, suction"
        ]
      },
      {
        title: "Makine dairesi emniyet ekipmanları",
        checkpoints: [
          "Fixed CO2/water mist release sistemi",
          "Fire detection panel — zone'lar, fault",
          "Quick closing valves — remote operation",
          "Emergency stop buttons — ana makine, fuel pump, fan",
          "Ventilation flap remote close — çalışırlık testi"
        ]
      }
    ],
    coreSummary: "Baş Mühendisin ana sorumluluğu, geminin tüm teknik sistemlerinin emniyetli, verimli ve çevre mevzuatına uygun şekilde sürekli operasyonel tutulmasını sağlamaktır.",
    criticalNotes: [
      "Ana makine arızası açık denizde geminin manevrabilite kaybı demektir — kritik yedek parça eksikliği bu riski doğrudan artırır.",
      "OWS bypass veya 15 ppm alarm manipülasyonu tespit edildiğinde gemi tutulur ve cezai işlem uygulanır — sıfır tolerans.",
      "Emergency generator ve emergency fire pump test edilmez veya çalışmazsa, acil durumda gemi karanlıkta ve yangın suyu olmadan kalır.",
      "MARPOL Ek VI sulphur uyumluluğu ECA bölgelerinde kritiktir — yanlış yakıt kullanımı ciddi para cezası ve gemi tutulmasına yol açar."
    ]
  },

  "ikinci-muhendis": {
    slug: "ikinci-muhendis",
    intro: `İkinci Mühendis (Second Engineer), makine dairesinin günlük operasyonel yöneticisidir. Baş Mühendisin direktiflerini sahada uygular, vardiya mühendislerini yönetir ve PMS iş emirlerinin fiili yürütücüsüdür. Ana makinenin günlük işletimi, yakıt/yağ transferleri, makine dairesi housekeeping ve personel yönetimi bu zabitin birincil sorumluluk alanıdır. Baş Mühendisten sonra makine departmanının en kıdemli zabiti olarak, yokluğunda departmanın komutasını üstlenir.`,
    tasks: [
      {
        title: "Ana makine günlük operasyonu ve performans izleme",
        description: `Ana makinenin günlük parametrelerini (sıcaklık, basınç, devir, yakıt tüketimi, exhaust temp vb.) izler ve değerlendirir. Performance monitoring kayıtlarını tutar. Abnormal durumları Baş Mühendise raporlar. Cylinder drain oil analizi, scavenge inspection ve indicator diagram alımı gibi periyodik kontrolleri organize eder.`
      },
      {
        title: "PMS iş emirlerinin dağıtımı ve sahada yürütülmesi",
        description: `Baş Mühendisin onayladığı bakım takvimini, vardiya mühendislerine ve tayfalarına iş emirleri olarak dağıtır. İşlerin zamanında ve doğru yapılmasını takip eder, tamamlanan işleri PMS'e kaydeder. Bakım sırasında iş güvenliği kurallarının uygulanmasını denetler.`
      },
      {
        title: "Yakıt ve yağ transfer operasyonları",
        description: `Bunker operasyonlarının emniyetli yürütülmesi: SOPEP prosedürlerinin hazır tutulması, scupper kapatma, drip tray yerleşimi, numune alma, density/temperature kayıtları. FO/DO transfer planlaması, purifier operasyonu ve settling/service tank yönetimi. LO tüketim takibi ve top-up planlaması.`
      },
      {
        title: "Makine dairesi vardiya düzeni ve personel yönetimi",
        description: `Vardiya çizelgesinin hazırlanması, vardiya teslim-devir prosedürlerinin standardize edilmesi ve personelin iş dağılımının yapılması. Overtime kayıtlarının ve çalışma/dinlenme saatlerinin MLC/ILO kurallarına uygun tutulması.`
      },
      {
        title: "Makine dairesi housekeeping ve düzen",
        description: `Makine dairesinin temizlik, düzen ve güvenlik standartlarının sürdürülmesi. Yağ sızıntılarının kontrolü, bilge seviye takibi, aydınlatma kontrolü ve kaçış yollarının açık tutulması. Housekeeping düzeyi denetimde doğrudan değerlendirilen bir kalemdir.`
      },
      {
        title: "Kazan, separatör ve yardımcı sistem bakımları",
        description: `Boiler water treatment, blow-down, safety valve test, flame failure device kontrolü. Purifier overhaul planlaması, backwash sistemi kontrolü. Air compressor valve maintenance, cooler temizliği ve safety device kontrolleri.`
      },
      {
        title: "Bilge, sludge ve çevresel deşarj yönetimi",
        description: `OWS operasyonları, 15 ppm bilge alarm kayıtları, sludge tank yönetimi ve shore reception facility koordinasyonu. ORB (Oil Record Book) Part I kayıtlarının doğru ve güncel tutulması. Çevresel deşarj kurallarına uyumun sağlanması.`
      },
      {
        title: "Makine personeli eğitimi",
        description: `Yeni gelen mühendis ve tayfaların familiarization'ı, makine dairesi emniyet prosedürlerinin eğitimi, vendor-specific ekipman eğitimlerinin koordinasyonu. Emergency procedures (blackout recovery, engine room fire, flooding) tatbikatlarına katılım ve eğitim.`
      },
      {
        title: "Soğutma suyu analizi ve kimyasal dozajlama",
        description: `Ana makine ve jeneratörlerde jacket cooling water (tatlı su soğutma) sisteminin su kalitesinin düzenli analiz edilmesi İkinci Mühendisin sorumluluğundadır. Nitrit, pH, klorür ve toplam sertlik değerleri kriter aralıklarında tutulmazsa corrosion inhibitor etkinliği düşer ve liner/cylinder cover'da korozyon başlar. Soğutma suyu analiz kiti kullanılarak periyodik testler yapılır, sonuçlar log'a kaydedilir ve gerektiğinde inhibitor (DCA/corrosion inhibitor) ilave edilir. Kapsamlı analiz için shore-side test laboratuarına numune gönderilmesi de bu görevin parçasıdır.`
      }
    ],
    equipment: [
      {
        title: "Ana makine komponentleri (günlük izleme)",
        checkpoints: [
          "Cylinder liner ve piston — wear measurement takibi",
          "Exhaust valve — seat condition, rotation indicator",
          "Fuel pump ve injector — timing, spray pattern",
          "Turbocharger — washing schedule, vibration",
          "Scavenge space — cleanliness, fire risk indicator"
        ]
      },
      {
        title: "Yakıt ve yağ sistemleri",
        checkpoints: [
          "FO settling/service tank seviye ve temperature",
          "Purifier — throughput, sludge, alarm durumu",
          "LO sump tank seviyesi ve analiz sonuçları",
          "Transfer pompa ve valf sistemi — leak kontrolü",
          "Bunker bağlantı noktaları ve hose condition"
        ]
      },
      {
        title: "Soğutma ve havalandırma",
        checkpoints: [
          "Central cooling system — temperature, flow",
          "LT/HT cooler — cleaning schedule",
          "Engine room ventilation fans — operation, filter",
          "AC/refrigeration plant — refrigerant level, compressor"
        ]
      }
    ],
    coreSummary: "İkinci Mühendisin ana sorumluluğu, ana makinenin günlük operasyonunu yönetmek, PMS iş emirlerini sahada yürütmek, yakıt/yağ operasyonlarını emniyetli yürütmek ve makine personelini günlük bazda koordine etmektir.",
    criticalNotes: [
      "Ana makine scavenge fire riski, scavenge space temizliğine doğrudan bağlıdır — kirli scavenge space yangın demektir.",
      "Bunker operasyonlarında taşma, deniz kirliliği ve ciddi para cezası anlamına gelir — overflow tank ve alarm sistemi her zaman çalışır olmalıdır.",
      "ORB kayıtlarında tutarsızlık veya eksiklik, PSC'de doğrudan gemi tutulma sebebidir.",
      "Vardiya teslim-devir sırasında eksik bilgi aktarımı, makine dairesinde kaza riskini doğrudan artırır."
    ]
  },

  "ucuncu-muhendis": {
    slug: "ucuncu-muhendis",
    intro: `Üçüncü ve Dördüncü Mühendis, makine dairesinde vardiya tutan mühendislerdir. Yardımcı makineler, kazan, safra (ballast/bilge) sistemleri, separatörler, kompresörler ve pompaların bakımı ile vardiya sırasında tüm makine parametrelerinin izlenmesi birincil görevleridir. STCW Code kapsamında bağımsız makine vardiyası tutabilmek için gerekli yetkinlik sertifikasına sahip olmalıdırlar.`,
    tasks: [
      {
        title: "Makine vardiyası ve parametre izleme",
        description: `Vardiya sırasında ana makine, jeneratör, kazan, kompresör ve pompaların çalışma parametrelerini izler. Sıcaklık, basınç, seviye, devir ve alarm durumlarını düzenli aralıklarla kontrol eder ve logbook'a kaydeder. Anormal durumları derhal İkinci Mühendis'e veya nöbetçi Baş Mühendise raporlar. Vardiya teslim-devir prosedürünü eksiksiz uygular.`
      },
      {
        title: "Yardımcı makine ve ekipman bakımı",
        description: `Pompalar (ballast, bilge, transfer, service), kompresörler (starting air, service air), separatörler (FO, LO, sludge) ve kazanın rutin bakımlarını yürütür. Valve overhaul, gasket değişimi, bearing kontrolü, filter temizliği ve basic elektrik/mekanik bakım işleri günlük rutinin parçasıdır.`
      },
      {
        title: "Safra ve ballast sistemleri operasyonu",
        description: `Ballast tank operasyonları, bilge seviye kontrolü, OWS operasyonu ve tank sounding'leri. Ballast Water Management Plan kapsamında exchange veya treatment prosedürlerinin uygulanmasına destek. Valf sistemi ve pompa işletimi.`
      },
      {
        title: "Emniyet sistemi testleri",
        description: `Makine dairesi emniyet cihazlarının periyodik testleri: bilge high level alarm, oil mist detector, bearing temperature alarm, over-speed trip, LO low pressure alarm, FO heater high temperature alarm. Test sonuçlarını kaydeder ve arızalı cihazları raporlar.`
      },
      {
        title: "Sıcak çalışma ve izole çalışma kurallarına uyum",
        description: `Hot work, grinding, welding gibi sıcak çalışmalarda yangın güvenliği tedbirlerinin alınması. LOTO (Lock Out Tag Out) prosedürlerinin uygulanması. Enclosed space entry izinlerinde atmosfer testlerine destek. Risk assessment formlarının doldurulmasına katkı.`
      },
      {
        title: "Teknik kayıtlar ve sarf malzeme takibi",
        description: `Engine room logbook'un vardiya bazlı güncellenmesi, PMS iş emirlerinin tamamlanma kayıtları ve sarf malzeme (gasket, o-ring, filter, yağ) kullanım raporlaması. Yedek parça ihtiyaçlarının tespiti ve İkinci Mühendise bildirimi.`
      },
      {
        title: "Önleyici bakım ve arıza analizi",
        description: `Düzenli kontroller sırasında erken arıza belirtilerinin tespiti (unusual noise, vibration, leak, temperature deviation). Basit arıza teşhisi ve çözümü. Karmaşık arızalarda üst mühendise detaylı rapor sunumu.`
      },
      {
        title: "UMS (Unmanned Machinery Space) gece hazırlıkları",
        description: `Makine dairesi UMS onaylı gemilerde gece periyodunda düzenli mühendis nöbeti tutulmaz; bunun yerine kapsamlı bir hazırlık yapılır ve otomatik alarm sistemi izler. Bu hazırlık genellikle 3. veya 4. Mühendis tarafından yürütülür: tüm alarm setpoint'lerinin doğrulanması, beklenen sarf miktarlarına göre servis tank seviyelerinin kontrolü, otomatik start/stop sistemlerinin aktif olduğunun doğrulanması, bilge alarm ve high-level switch testleri, güverte ve makine dairesi arasındaki haberleşme kanalının hazır tutulması. UMS periyodunda alarm çalması durumunda kısa sürede makine dairesine inebilecek nöbetçi mühendisin hazır bulunması gerekir.`
      }
    ],
    equipment: [
      {
        title: "Yardımcı makineler",
        checkpoints: [
          "Diesel generator — governor, cooling, lube oil",
          "Air compressor — valve condition, unloader, safety valve",
          "Boiler — water level, pressure, safety valve, burner",
          "Purifier/separator — bowl, disc stack, seal ring"
        ]
      },
      {
        title: "Pompa sistemleri",
        checkpoints: [
          "Ballast pump — suction, delivery, seal",
          "Bilge pump — capacity, valve system, strainer",
          "FO/DO transfer pump — flow, pressure, leak",
          "Cooling water pump — bearing, seal, impeller"
        ]
      },
      {
        title: "Makine dairesi emniyet cihazları",
        checkpoints: [
          "Oil mist detector — alarm test, sensitivity",
          "Bilge high level alarm — float switch test",
          "Bearing temperature sensors — calibration",
          "Over-speed trip device — test prosedürü",
          "Emergency shut-down buttons — lokasyon ve çalışırlık"
        ]
      }
    ],
    coreSummary: "Üçüncü/Dördüncü Mühendisin ana görevi, makine vardiyasını güvenli sürdürmek, yardımcı makine ve ekipmanların bakımını yürütmek ve emniyet cihazlarının çalışır durumda olmasını sağlamaktır.",
    criticalNotes: [
      "Vardiya sırasında oil mist detector alarm'ı ciddiye alınmalıdır — crankcase explosion riski ölümcüldür.",
      "Boiler safety valve sıkışması veya devre dışı bırakılması, kazan patlaması riskini doğrudan oluşturur.",
      "LOTO uygulanmadan bakım çalışması başlatmak, uzuv kaybı veya ölüme yol açabilir.",
      "Bilge seviye izleme ihmal edilirse makine dairesinde flooding riski artar ve geminin stabilitesi tehlikeye girer."
    ]
  },

  "eto": {
    slug: "eto",
    intro: `Elektrik Zabiti (Electro-Technical Officer — ETO), geminin elektrik, elektronik ve otomasyon sistemlerinin bakım ve onarımından sorumlu teknik zabit'tir. STCW 2010 Manila Amendments ile ETO rolü resmi olarak tanınmış ve yetkinlik gereklilikleri belirlenmiştir. Modern gemilerde elektronik sistemlerin karmaşıklığı arttıkça ETO'nun önemi kritik düzeye yükselmiştir. Jeneratörler, güç dağıtım sistemleri, otomasyon, köprüüstü seyir/haberleşme cihazları, yangın algılama ve alarm sistemleri bu zabitin uzmanlık alanındadır.`,
    tasks: [
      {
        title: "Güç üretim ve dağıtım sistemlerinin yönetimi",
        description: `Diesel generator'ların elektriksel bakımı (AVR, excitation, protection relays), main switchboard operasyonu, güç dağıtım panolarının bakımı ve emergency switchboard kontrolü. Load sharing, auto start/stop, preferential trip ayarları ve shore power bağlantı prosedürleri. Güç kalitesi izleme (voltage, frequency, power factor) ve harmonik analizi.`
      },
      {
        title: "Otomasyon ve alarm sistemleri bakımı",
        description: `PLC (Programmable Logic Controller) bakımı, sensor kalibrasyonu, alarm setpoint ayarları ve sistem entegrasyon kontrolü. Makine dairesi unmanned operation (UMS) sisteminin güvenilirliğinin sağlanması. Alarm loglarının analizi ve recurring fault tespiti.`
      },
      {
        title: "Köprüüstü seyir ve haberleşme cihazları bakımı",
        description: `Radar, ECDIS, GPS, echo sounder, speed log, AIS, gyro compass ve VDR'ın elektriksel ve elektronik bakımı. GMDSS teçhizatının (VHF DSC, MF/HF, Inmarsat, NAVTEX) teknik bakımı. Anten sistemleri, kablo bağlantıları ve connector kontrolü.`
      },
      {
        title: "Yangın algılama ve alarm sistemi bakımı",
        description: `Fire detection panel bakımı, smoke/heat detector temizliği ve testi, manual call point kontrolü, alarm sistemi fonksiyon testi. Zone loop kontrolü, fault finding ve spare detector yönetimi. CCTV ve güvenlik sistemi bakımı.`
      },
      {
        title: "Acil güç kaynakları ve UPS sistemleri",
        description: `Emergency generator otomatik start/stop testi, emergency switchboard bakımı. UPS sistemleri — batarya condition monitoring, inverter bakımı, bypass operasyonu. Emergency lighting, GMDSS batarya sistemi ve navigation light panel kontrolleri.`
      },
      {
        title: "Motor kontrol ve güç elektroniği",
        description: `Motor starter bakımı (DOL, star-delta, soft starter, VFD), kontaktör/röle kontrolü, overload ayarları. Variable frequency drive (VFD) bakımı — parametre kontrolü, cooling fan, capacitor condition. Elektrik motoru insulation testi (megger) ve vibration monitoring.`
      },
      {
        title: "Elektrik güvenliği ve izolasyon",
        description: `Elektrik çalışmalarında izolasyon prosedürleri, LOTO uygulamaları, topraklama kontrolü ve insulation monitoring. Arc flash risk değerlendirmesi. Nemli ortamlarda elektrik güvenliği tedbirleri. Yüksek gerilim sistemi olan gemilerde (6.6 kV) özel güvenlik prosedürleri.`
      },
      {
        title: "Yedek parça ve kalibrasyon yönetimi",
        description: `Elektronik yedek parça stok kontrolü (PCB, fuse, relay, sensor, connector), kalibrasyon sertifikalarının takibi ve periyodik kalibrasyon planlaması. Kritik spare parts listesinin (klas requirement) güncel tutulması.`
      },
      {
        title: "Soğutma ve iklimlendirme sistemleri (HVAC/reefer) bakımı",
        description: `ETO, gemideki soğutma kompresörleri, kondenser, evaporatör ve kontrol panellerinin elektriksel bakımından sorumludur. Soğutucu akışkan (refrigerant) basınç değerlerinin izlenmesi, compressor motor elektrik parametrelerinin kontrolü, termostat ve solenoid valf bakımı, defrost sistemi ve alarm devreleri bu kapsamdadır. Reefer cargo taşıyan gemilerde konteyner soğutma sistemlerinin monitörü de ETO uhdesindedir. Montreal Protokolü ve F-gaz regülasyonları kapsamında refrigerant kaçaklarının kayıt altına alınması ve lisanslı teknisyen kullanılması yasal zorunluluktur.`
      },
      {
        title: "VSAT ve uydu haberleşme sistemleri bakımı",
        description: `Modern gemilerde VSAT (Very Small Aperture Terminal) uydu sistemi; operasyonel iletişim, navigasyon veri iletimi, şirket raporlaması ve mürettebat refahı (internet) için kritik öneme sahiptir. ETO; VSAT anteni (anten stabilizasyon sistemi, uydu izleme mekanizması), modem, router ve ağ anahtarlarının bakımından sorumludur. Sistem kesintilerinde arıza teşhisi, servis sağlayıcı ile teknik koordinasyon ve yedek bağlantı (Inmarsat, MF/HF) geçiş prosedürleri de bu kapsamdadır. Ayrıca gemi ağının (LAN/WLAN) yönetimi, IT güvenliği (güvenlik duvarı, erişim kontrolü) ve siber güvenlik politikasının uygulanması ISM Code'un siber risk yönetimi (Resolution MSC-FAL.1/Circ.3) gerekliliklerine göre ETO'nun görev alanındadır.`
      }
    ],
    equipment: [
      {
        title: "Güç üretim ve dağıtım",
        checkpoints: [
          "Main switchboard — bus bar condition, breaker operation",
          "Emergency switchboard — auto transfer test",
          "Shore power panel — interlock, phase sequence",
          "Generator AVR ve excitation sistemi",
          "Power management system — load sharing, preferential trip"
        ]
      },
      {
        title: "Otomasyon ve kontrol",
        checkpoints: [
          "PLC — CPU status, I/O module, program backup",
          "Temperature, pressure, level sensors — calibration",
          "Control valves — positioner, actuator",
          "UMS alarm system — overnight test",
          "Data logger ve trend recording"
        ]
      },
      {
        title: "Seyir ve haberleşme cihazları",
        checkpoints: [
          "Radar — magnetron, bearing accuracy, tuning",
          "ECDIS — display, sensor input, backup",
          "GPS — antenna, receiver, satellite tracking",
          "Gyro compass — follow-up, settling, error",
          "VDR — recording, backup, capsule condition"
        ]
      },
      {
        title: "Aydınlatma ve kablo sistemleri",
        checkpoints: [
          "Navigation lights — lamp test, auto changeover",
          "Emergency lighting — battery, duration",
          "Deck lighting — weather deck, cargo area",
          "Cable tray ve gland condition — watertight integrity",
          "Earthing system — continuity, clamp condition"
        ]
      }
    ],
    coreSummary: "ETO'nun ana sorumluluğu, geminin elektrik, elektronik ve otomasyon sistemlerini güvenli, çalışır ve kalibre durumda sürekli tutmaktır.",
    criticalNotes: [
      "Main switchboard üzerinde çalışma, uygun izolasyon ve LOTO olmadan asla yapılmamalıdır — arc flash yaralanmaları ağır ve ölümcül olabilir.",
      "UMS (Unmanned Machinery Space) alarm sistemi güvenilir değilse gece makine dairesi gözetimsiz kalır — bu doğrudan emniyet riski oluşturur.",
      "Insulation resistance (megger) düşüklüğü erken uyarıdır — ihmal edilirse earth fault, short circuit veya yangın riski oluşur.",
      "Navigation light failure tespit edilmez ve düzeltilmezse COLREG ihlali oluşur ve çarpışma riski artar."
    ]
  },

  "yagci-fitter": {
    slug: "yagci-fitter",
    intro: `Yağcı (Oiler), Fitter ve Silici (Wiper), makine dairesinin iş gücünü oluşturan tayfa kategorileridir. Yağcı, vardiya sırasında yağlama devrelerini kontrol eder ve makine parametrelerini izler. Fitter, mekanik bakım ve metal işlerinde (kaynak, torna, taşlama) uzmanlaşmıştır. Silici, makine dairesi temizliği ve temel bakım işlerinde destek verir. Bu üç pozisyon birlikte makine mühendislerinin sahadaki elleridir.`,
    tasks: [
      {
        title: "Makine vardiyası ve parametre kontrolü (Yağcı)",
        description: `Vardiya sırasında makine dairesinde fiziksel turlar atarak sıcaklık, basınç, seviye ve ses/titreşim kontrolü yapar. Yağlama noktalarını kontrol eder, sızıntıları tespit eder ve raporlar. Makine logbook'a vardiya verilerini kaydeder. Alarm durumunda derhal nöbetçi mühendise haber verir.`
      },
      {
        title: "Mekanik bakım ve metal işleri (Fitter)",
        description: `Valf overhaul, pompa bakımı, gasket kesimi ve değişimi, pipe fitting, flange bağlantı, basit kaynak (tack welding) ve metal kesme işleri. Torna, matkap ve taşlama tezgahı kullanımı. Mühendislerin iş emirlerine göre mekanik tamir ve bakım çalışmaları.`
      },
      {
        title: "Makine dairesi temizliği ve düzeni (Silici)",
        description: `Makine dairesi zemininin, ekipman yüzeylerinin ve bilge alanlarının temizliği. Yağ sızıntılarının toplanması, kayma risklerinin azaltılması. Atık yağ ve sludge yönetimine destek. Temizlik malzemelerinin stok takibi.`
      },
      {
        title: "Filtre ve yağ değişimi işleri",
        description: `FO/LO/air filtrelerinin temizliği veya değişimi, yağ numune alma, yağ seviye kontrolü ve top-up işlemleri. Purifier operasyonuna destek, sludge tank yönetimi ve waste oil toplama.`
      },
      {
        title: "İş güvenliği ve PPE uyumu",
        description: `Makine dairesinde çalışma izni (PTW), risk assessment ve LOTO kurallarına uyum. PPE kullanımı: kulak koruyucu (gürültü), gözlük (kıvılcım), eldiven (sıcak yüzey/kimyasal), güvenlik ayakkabısı. Sıcak çalışmalarda yangın gözcüsü (fire watch) görevi.`
      },
      {
        title: "Acil durumlara katılım",
        description: `Muster station'da hazır bulunma, fire party veya boundary cooling görevlerinde yer alma. Makine dairesi tahliye prosedürlerini bilme. Emergency shut-down butonlarının ve kaçış yollarının konumlarını bilme.`
      },
      {
        title: "Kaldırma ve taşıma ekipmanlarının (rigging/lifting gear) güvenlik kontrolü",
        description: `Fitter, makine dairesindeki chain block'lar, wire sling'ler, tekstil sling'ler, shackle'lar, eye bolt'lar ve overhead crane/monorail gibi kaldırma ekipmanlarının periyodik güvenlik kontrolünü yapar. SWL (Safe Working Load) işaretlerinin okunurluğu, tel sling'lerde broken wire ve kink tespiti, tekstil sling'lerde yırtık, deformasyon ve renk bozulması, shackle pin güvenliği ve zincir bloklarda mekanik çalışırlık bu kontrolün kapsamındadır. Hasarlı veya etiket tarihi geçmiş ekipman derhal hizmet dışına alınmalıdır. Kaldırma ekipmanlarıyla yapılan işlerin log'u tutulur; bakım kayıtları klas society denetiminde sunulabilmelidir.`
      }
    ],
    equipment: [
      {
        title: "Yağlama ve kontrol ekipmanları",
        checkpoints: [
          "Grease gun ve yağlama kapları — doluluğu, tipi",
          "Sıcaklık ölçüm cihazları — infrared, contact",
          "Seviye göstergeleri — sight glass, sounding tape",
          "Basınç göstergeleri — manometre okuması"
        ]
      },
      {
        title: "Mekanik aletler (Fitter)",
        checkpoints: [
          "Pipe wrench, spanner, socket set — durumu",
          "Kaynak makinesi — electrode, shield, güvenlik",
          "Torna ve matkap — operation safety, guard",
          "Grinding machine — disk, guard, PPE"
        ]
      },
      {
        title: "Kişisel emniyet ekipmanları",
        checkpoints: [
          "Ear protection — gürültülü alanlarda",
          "Safety goggles — grinding, welding, chemical",
          "Heat-resistant gloves — sıcak yüzey çalışması",
          "Safety harness — tank içi veya yüksekte çalışma",
          "EEBD — konum ve kullanım bilgisi"
        ]
      }
    ],
    coreSummary: "Yağcı, Fitter ve Silicinin ana görevi, makine dairesinin günlük yağlama, bakım, temizlik ve mekanik işlerini güvenli şekilde yürütmek ve mühendislere sahada destek vermektir.",
    criticalNotes: [
      "Makine dairesinde gürültü seviyesi 90+ dB olabilir — kulak koruyucu kullanılmazsa kalıcı işitme kaybı riski vardır.",
      "Sıcak yüzeyler (exhaust pipe, turbo casing, boiler) kontrolsüz temasta ciddi yanıklara yol açar.",
      "Kaynak ve grinding işlerinde yangın gözcüsü (fire watch) mutlaka atanmalıdır — sıcak kıvılcımlar saatlerce sonra yangın başlatabilir.",
      "Bilge temizliği sırasında OWS yerine doğrudan denize deşarj yapılması MARPOL ihlalidir ve ciddi cezai yaptırım gerektirir."
    ]
  },

  "makine-stajyer": {
    slug: "makine-stajyer",
    intro: `Makine Stajyeri (Engine Cadet), denizcilik eğitiminin deniz stajı bölümünü makine departmanında tamamlamak üzere gemide bulunan aday mühendistir. STCW Code'un öngördüğü deniz hizmet süresini doldurarak Vardiya Mühendisi yeterliliğine giden yolda pratik eğitim alır. Stajyer, gemide yetki veya imza sorumluluğu taşımaz; ancak tüm makine operasyonlarına gözlem ve destek düzeyinde katılması beklenir. Training Record Book (TRB) bu sürecin resmi belgesidir.`,
    tasks: [
      {
        title: "Makine vardiyasına eğitim amaçlı katılım",
        description: `Vardiya mühendisinin gözetiminde makine dairesi nöbetine katılır. Parametre okuma, log tutma, seviye kontrolü ve alarm tanıma becerilerini geliştirir. Makine dairesi tur rutinini öğrenir. Bağımsız karar alma yetkisi yoktur; her durumda mühendisin onayını alır.`
      },
      {
        title: "Bakım çalışmalarına gözlem ve destek",
        description: `Pompa overhaul, valf bakımı, filtre değişimi, gasket kesimi gibi bakım çalışmalarına yardımcı olarak katılır. Ekipman parçalarının isimlerini, işlevlerini ve bakım prosedürlerini öğrenir. El becerisi ve teknik dil kazanır.`
      },
      {
        title: "Makine sistemlerini tanıma ve öğrenme",
        description: `Ana makine, yardımcı makineler, kazan, kompresör, separator, pompa, boru ve valf sistemlerini sistematik olarak öğrenir. Sistem şemalarını (piping diagram) okumayı ve ekipman lokasyonlarını belirlemeyi öğrenir. Her sistemin çalışma prensibini, emniyet cihazlarını ve alarm noktalarını tanır.`
      },
      {
        title: "Training Record Book (TRB) yönetimi",
        description: `STCW'nin öngördüğü yetkinlik alanlarını kapsayan TRB'yi günlük olarak doldurur. Her görev, gözlem ve eğitim modülü kayıt altına alınır. Eğitmen mühendisin imzasını ve değerlendirmesini alır. TRB tamamlanması sertifika sınavına girebilmenin ön koşuludur.`
      },
      {
        title: "Emniyet prosedürlerini öğrenme",
        description: `Makine dairesi emniyet kuralları: LOTO, PTW, enclosed space entry, hot work prosedürleri, PPE kullanımı. Emergency procedures: blackout recovery, engine room fire, flooding. Kaçış yolları ve muster station bilgisi. Tatbikatlara aktif katılım.`
      },
      {
        title: "Teknik çizim ve PMS öğrenimi",
        description: `Teknik çizimlerin (piping diagram, electrical diagram, general arrangement) okunması. PMS yazılımı kullanımı, iş emri açma/kapatma, spare parts kodu ve stok kontrolü mantığının öğrenilmesi.`
      },
      {
        title: "Deniz hizmet belgesi (Sea Service Certificate) ve sertifika süreci",
        description: `Makine stajyeri, gemide geçirdiği her seyir dönemini kaptan tarafından imzalanan resmi Sea Service Certificate ile belgelemek zorundadır. STCW'nin OOW (Officer of the Watch — Machinery) yeterlilik belgesi için gereken deniz hizmeti süresinin ispatında bu belgeler temel kanıttır. Ayrıca Watchkeeping Certificate for Engine Department için STCW tablo A-III/1 kapsamındaki tüm yetkinlik alanlarının TRB'de tamamlanmış ve eğitmen mühendis tarafından onaylanmış olması gerekir. Belgelerin kaybolması, staj süresinin tanınmaması veya sınava girebilme hakkının ertelenmesi anlamına gelebilir.`
      }
    ],
    equipment: [
      {
        title: "Öğrenim düzeyinde makine ekipmanları",
        checkpoints: [
          "Ana makine — genel yapısı, silindir numaralandırma, çalıştırma prosedürü",
          "Jeneratör — start/stop, senkronizasyon paneli (gözlem)",
          "Kazan — su seviyesi, basınç, blow-down prosedürü",
          "Kompresör — start/stop, safety valve",
          "Separator — bowl, disc, seal ring tanıma"
        ]
      },
      {
        title: "Kişisel emniyet ekipmanları",
        checkpoints: [
          "PPE — hardhat, safety shoes, ear protection, goggles, gloves",
          "EEBD — konum ve kullanım prosedürü",
          "Can yeleği — konum ve giyme süresi",
          "Safety harness — tank içi çalışma koşullarında"
        ]
      }
    ],
    coreSummary: "Makine Stajyerinin ana görevi, gözetim altında makine operasyonlarını gözlemlemek ve pratik yapmak, TRB'yi eksiksiz doldurmak ve STCW yetkinlik gerekliliklerini karşılayacak deniz hizmeti tecrübesi kazanmaktır.",
    criticalNotes: [
      "Stajyer bağımsız karar alamaz ve makine operasyonlarında tek başına çalışmamalıdır — mutlaka gözetmen mühendis eşliğinde olmalıdır.",
      "Makine dairesinde gürültü, sıcaklık ve hareketli parçalar sürekli risk oluşturur — PPE kullanımı zorunludur.",
      "TRB doldurulmazsa veya eksik bırakılırsa staj süresi tanınmayabilir — bu belge kariyer açısından kritiktir.",
      "LOTO prosedürünü öğrenmek ve her zaman uygulamak, stajyerin güvenliği için en temel gereksinimdir."
    ]
  },

  // ═══════════════════════════════════════════════════
  // İKMAL / YAŞAM MAHALLİ DEPARTMANI
  // ═══════════════════════════════════════════════════

  "asci": {
    slug: "asci",
    intro: `Aşçı (Cook/Chief Cook), gemide mürettebatın beslenme ihtiyacını karşılayan, gıda güvenliği ve hijyen standartlarını uygulayan ve kumanya yönetimini yürüten personeldir. MLC 2006 (Maritime Labour Convention) Kural 3.2 gereğince gemide yeterli ve kaliteli yemek sağlanması armatörün yükümlülüğüdür ve bu yükümlülüğün gemideki uygulayıcısı aşçıdır. ILO/IMO kapsamında gemide görev yapacak aşçının Ship's Cook Certificate'a sahip olması gerekir.`,
    tasks: [
      {
        title: "Menü planlaması ve yemek hazırlığı",
        description: `Günlük üç ana öğün ve ara öğünlerin planlanması, hazırlanması ve servis edilmesi. Farklı kültürel tercihleri, diyet kısıtlamalarını ve alerjen bilgilerini göz önünde bulundurma. Dengeli beslenme prensiplerine uygun menü oluşturma. Seyir süresi ve kumanya stokuna göre menü adaptasyonu.`
      },
      {
        title: "Gıda güvenliği ve hijyen yönetimi",
        description: `HACCP (Hazard Analysis and Critical Control Points) prensiplerine uygun gıda işleme: soğuk zincir kontrolü, pişirme sıcaklıkları, çapraz bulaşma önleme, temizlik ve dezenfeksiyon. Buzdolabı/dondurucu sıcaklık kayıtları, yüzey temizliği kontrolleri ve kişisel hijyen standartları. Gıda kaynaklı hastalık riski yönetimi.`
      },
      {
        title: "Kumanya stok yönetimi ve sipariş",
        description: `Kuru erzak, soğuk/dondurulmuş gıda, taze sebze/meyve ve temel malzeme stoklarının takibi. Son kullanma tarihi kontrolü, FIFO (First In First Out) uygulaması. İkmal listelerinin hazırlanması, bütçe kontrolü ve liman teslimatlarının kalite kontrolü.`
      },
      {
        title: "Mutfak ve depo düzeni",
        description: `Mutfak (galley), kuru erzak deposu, soğuk hava deposu ve dondurucuların düzenli, temiz ve organize tutulması. Haşere kontrolü (pest management) için düzenli denetim. Depo güvenliği ve erişim kontrolü.`
      },
      {
        title: "Mutfak ekipmanlarının bakımı",
        description: `Fırın, ocak, fritöz, buzdolabı/dondurucu, bulaşık makinesi, et kıyma/dilimleme makineleri ve diğer mutfak ekipmanlarının temizliği, bakımı ve güvenli kullanımı. Arıza raporlaması ve basit bakım işleri.`
      },
      {
        title: "Mutfak yangın emniyeti",
        description: `Galley fire suppression system (genellikle wet chemical) kullanım bilgisi, mutfak tipi yangın söndürücü (Class F/K) konumu ve kullanımı. Yağ yangını müdahale prosedürü. Havalandırma damperlerinin bilgisi. Mutfak fire blanket kullanımı.`
      },
      {
        title: "Atık gıda ve yağ bertarafı",
        description: `MARPOL Ek V kapsamında gıda atıklarının ayrıştırılması ve uygun bertarafı. Kullanılmış yemeklik yağların toplanması ve shore reception facility'ye veya onaylı atık sistemine teslimi. Garbage Record Book'a mutfak atıklarının kaydedilmesine destek.`
      },
      {
        title: "Sağlık ve moral katkısı",
        description: `Mürettebatın beslenme kalitesi doğrudan iş performansı ve morale etki eder. Özel günlerde (doğum günü, bayram, festival) özel menü hazırlama. Mürettebat geri bildirimlerini dikkate alma ve menü çeşitliliğini artırma.`
      }
    ],
    equipment: [
      {
        title: "Mutfak ana ekipmanlar",
        checkpoints: [
          "Fırın ve ocak — gaz/elektrik bağlantı güvenliği, termostat",
          "Buzdolabı ve dondurucu — sıcaklık kaydı, kapı contası",
          "Fritöz — yağ sıcaklık kontrolü, otomatik kapanma",
          "Bulaşık makinesi — su sıcaklığı, deterjan dozlama",
          "Et kıyma/dilimleme makinesi — bıçak/guard güvenliği"
        ]
      },
      {
        title: "Mutfak emniyet ekipmanları",
        checkpoints: [
          "Galley fire suppression system — nozzle, release, service date",
          "Fire blanket — konum ve erişilebilirlik",
          "Class F/K yangın söndürücü — basınç, tarih",
          "First aid kit — yanık malzemesi",
          "Ventilation damper — mutfak yangınında kapatma prosedürü"
        ]
      },
      {
        title: "Hijyen ve depo kontrol",
        checkpoints: [
          "Sıcaklık kayıt cihazları — buzdolabı, dondurucu, kuru depo",
          "Temizlik malzemeleri — deterjan, dezenfektan stoku",
          "Haşere kontrol sistemi — tuzak, kayıt",
          "Kesme tahtaları — renk kodlaması, durum",
          "Kişisel hijyen malzemeleri — eldiven, bone, önlük"
        ]
      }
    ],
    coreSummary: "Aşçının ana sorumluluğu, mürettebatın beslenme ihtiyacını gıda güvenliği ve hijyen standartlarına uygun şekilde karşılamak, kumanya stokunu yönetmek ve mutfak emniyetini sağlamaktır.",
    criticalNotes: [
      "Gıda zehirlenmesi gemide ciddi operasyonel aksamaya yol açar — mürettebatın büyük kısmı hastalanırsa gemi seyir güvenliğini kaybedebilir.",
      "Mutfak yangını gemi yangınlarının yaygın nedenlerinden biridir — yağ yangını suyla söndürülmeye çalışılırsa durum katastrofik hale gelir.",
      "Soğuk zincir kırılması (buzdolabı/dondurucu arızası) tüm stokun kaybı ve sağlık riski demektir.",
      "MLC 2006 gereğince gemi aşçısı sertifikalı olmalıdır — sertifikasız aşçı PSC bulgusu çıkarır."
    ]
  },

  "kamarot": {
    slug: "kamarot",
    intro: `Kamarot (Steward/Mess Attendant), gemide yaşam mahallerinin düzeni, temizliği ve servis hizmetlerinden sorumlu personeldir. Kamaralar, salon, messhall, ofisler ve ortak alanların temizliği, yemek servisi, çamaşır hizmetleri ve kumanya desteği birincil görevleridir. Mürettebatın günlük yaşam konforunun sürdürülmesi kamarotun etkinliğine doğrudan bağlıdır. Bazı gemilerde aşçıya destek olarak mutfak işlerine de katılır.`,
    tasks: [
      {
        title: "Yaşam mahalli temizliği ve düzeni",
        description: `Kamaralar, koridorlar, messhall, dayroom, ofisler ve ortak kullanım alanlarının günlük temizliği. Yatak yapımı, çarşaf/havlu değişimi, çöp toplama ve yüzey temizliği. Temizlik sırasında kaçış yollarının açık tutulması ve emniyet ekipmanlarına erişimin engellenmemesi.`
      },
      {
        title: "Yemek servisi ve salon düzeni",
        description: `Messhall/salon hazırlığı: masa düzeni, servis kapları, çatal/bıçak/kaşık dizimi. Yemek servisi sırasında sıcaklık kontrolü ve hijyen kurallarının uygulanması. Yemek sonrası toplama, temizlik ve salon düzeninin yeniden kurulması.`
      },
      {
        title: "Bulaşık ve mutfak destek işleri",
        description: `Bulaşık yıkama (makine veya el), kap/kacak organizasyonu, mutfak genel temizliğine destek. Aşçının talimatlarına göre basit hazırlık işleri (sebze doğrama, malzeme çıkarma). Servis araçlarının temizlik ve bakımı.`
      },
      {
        title: "Çamaşırhane hizmetleri",
        description: `Mürettebat çamaşırlarının yıkanması, kurutulması ve ütülenmesi (geminin sistemine göre). Çamaşırhane ekipmanlarının temiz tutulması ve basit bakımı. Deterjan ve yumuşatıcı stok takibi.`
      },
      {
        title: "Sarf malzeme stok takibi",
        description: `Temizlik malzemeleri, kâğıt ürünleri (tuvalet kâğıdı, kâğıt havlu), sabun, deterjan ve diğer sarf malzemelerin stok kontrolü. İhtiyaç listelerinin hazırlanması ve ikmal taleplerinin iletilmesi.`
      },
      {
        title: "Hijyen ve sağlık standartlarının korunması",
        description: `Yaşam mahalleri hijyen düzeyinin korunması: banyo/tuvalet temizliği, dezenfeksiyon, çöp yönetimi. Bulaşıcı hastalık riski olan dönemlerde (COVID, norovirus vb.) artırılmış temizlik protokollerinin uygulanması. Pest management'a destek.`
      },
      {
        title: "Emniyet ve acil durum görevleri",
        description: `Muster station'da hazır bulunma ve verilen görevlerin yerine getirilmesi. Yaşam mahalli yangın kapılarının açık tutulmaması, kaçış yollarının engellenmemesi. Can yeleği konumu ve giyme prosedürünü bilme. Yaralı bakım partisinde veya head count'ta destek.`
      },
      {
        title: "Ziyaretçi ve misafir yönetimi desteği",
        description: `Limanda gelen surveyor, PSC inspectors, vetting inspectors ve diğer ziyaretçilere servis. Toplantı odası/salon hazırlığı, ikram hizmeti. İlk izlenim açısından geminin yaşam mahalli düzeninin denetim standartlarına uygun tutulması.`
      },
      {
        title: "Revir (sick bay) temizliği ve tıbbi yardım desteği",
        description: `Gemi reviri MLC 2006 ve SOLAS gerekliliklerine göre her an temiz, düzenli ve kullanıma hazır tutulmalıdır. Kamarot, revirin günlük temizliğini (zemin, yatak, tezgah, aletler) ve sanitasyon kontrolünü yürütür. Denetimde kirli veya düzensiz bir revir doğrudan MLC non-compliance bulgusuna yol açar. Hasta mürettebata yemek, içecek ve temel ihtiyaçları taşıma, hasta odasının havalandırmasını ve konforunu sağlama görevleri de kamarotun sorumluluğundadır. Bulaşıcı hastalık şüphesinde artan dezenfeksiyon protokolleri (özellikle tuvalet ve ortak yüzeyler) kamarot tarafından uygulanır.`
      }
    ],
    equipment: [
      {
        title: "Temizlik ekipmanları",
        checkpoints: [
          "Temizlik malzemeleri — deterjan, dezenfektan, cam temizleyici",
          "Mop, fırça, süpürge — durum ve hijyeni",
          "Elektrikli süpürge — çalışırlık, filtre",
          "Çöp kovaları ve atık ayrıştırma sistemi"
        ]
      },
      {
        title: "Çamaşırhane ekipmanları",
        checkpoints: [
          "Çamaşır makinesi — çalışırlık, su bağlantısı",
          "Kurutma makinesi — çalışırlık, filtre temizliği",
          "Ütü ve ütü masası — güvenli kullanım",
          "Deterjan ve sarf malzeme stoku"
        ]
      },
      {
        title: "Servis ekipmanları",
        checkpoints: [
          "Servis kapları ve tabaklar — durumu ve hijyeni",
          "Çatal/bıçak/kaşık — sayı ve durum",
          "İçecek servisi ekipmanları — bardak, termos",
          "Yemek ısıtma/sıcak tutma ekipmanı"
        ]
      }
    ],
    coreSummary: "Kamarotun ana sorumluluğu, yaşam mahallerinin temizlik, düzen ve hijyen standartlarını sürdürmek, yemek servisini yürütmek ve mürettebatın günlük yaşam konforunu sağlamaktır.",
    criticalNotes: [
      "Yaşam mahalli temizlik düzeyi PSC ve vetting denetimlerinde doğrudan değerlendirilir — pis veya düzensiz yaşam mahalli bulgu çıkarır.",
      "Kayma/düşme kazalarının önemli bir kısmı ıslak veya yağlı zeminden kaynaklanır — temizlik sırasında zemin kuruluğu ve 'wet floor' işareti önemlidir.",
      "Fire door'ların temizlik arabaları veya malzemelerle açık tutulması yangın yayılma riskini artırır.",
      "Mürettebat morali ve verimliliği yaşam koşullarına doğrudan bağlıdır — temiz kamara, düzenli yemek servisi ve hijyenik ortam operasyonel performansı etkiler."
    ]
  }
};
