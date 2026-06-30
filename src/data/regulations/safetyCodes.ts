import type { RegulationItem } from "./types";

export const safetyCodes: RegulationItem[] = [
  {
    slug: "ism-code",
    label: "ISM Code – Uluslararası Emniyet Yönetimi",
    category: "Emniyet Kodları",
    overview: "Gemi ve şirket düzeyinde emniyet yönetim sistemi (SMS) kurulması, uygulanması ve sürekli iyileştirilmesi için çerçeve sağlar.",
    history: "1987 Herald of Free Enterprise faciasından sonra geliştirilen ISM Code, 1993'te kabul edilmiş ve SOLAS Chapter IX olarak 1998'de zorunlu hale gelmiştir. 2002'de revize edilerek dokümantasyon ve yönetim gözden geçirmesi güçlendirilmiştir. 2021'de siber güvenlik gereklilikleri SMS kapsamına eklenmiştir.",
    applicability: [
      "500 GT ve üzeri uluslararası sefer yapan tüm kargo gemileri",
      "Tüm yolcu gemileri (boyut sınırı yok)",
      "Mobil açık deniz sondaj üniteleri",
      "Gemiyi işleten şirket (shore-based) ve geminin kendisi",
    ],
    essentials: [
      "Emniyet ve çevre koruma politikası oluşturma",
      "Şirket ve gemi sorumlulukları: Designated Person Ashore (DPA) atanması",
      "Acil durum hazırlığı, tatbikatlar ve müdahale planları",
      "İç ve dış denetimler (internal/external audit) – yıllık ve 5 yıllık döngü",
      "Uygunsuzluk (non-conformity), kaza ve olayların raporlanması ve analizi",
      "Gemi ve teçhizat bakım sistemi (Planned Maintenance System – PMS)",
      "Dokümantasyon kontrol sistemi",
      "Management Review ve sürekli iyileştirme döngüsü",
      "Siber güvenlik risk yönetiminin SMS'e entegrasyonu (MSC-FAL.1/Circ.3)",
    ],
    actions: [
      "SMS prosedürlerini güncel tut ve mürettebata eğit",
      "Acil durum tatbikatlarını düzenli yap ve kaydet",
      "İç denetimleri planla ve uygunsuzlukları kapat",
      "DOC ve SMC sertifikalarını güncel tut",
      "DPA ile düzenli iletişim ve raporlama sağla",
      "Near-miss (ramak kala) raporlarını teşvik et ve analiz et",
      "Siber güvenlik risk değerlendirmesini SMS'e dahil et",
    ],
    amendments: [
      { year: "2002", description: "Revize ISM Code – doküman kontrolü ve yönetim gözden geçirmesi güçlendirildi" },
      { year: "2010", description: "Siber güvenlik risk yönetiminin SMS'e entegrasyonu tartışmaları başladı" },
      { year: "2021", description: "MSC.428(98) – siber güvenliğin SMS'e dahil edilmesi zorunluluğu (ilk yenileme denetiminde)" },
    ],
    keyArticles: [
      { id: "Madde 1", title: "Genel", summary: "ISM Code'un amacı: denizde emniyeti sağlamak, insan yaralanmasını ve can kaybını önlemek, çevreyi korumak." },
      { id: "Madde 2", title: "Tanımlar", summary: "Şirket, DPA, SMS ve ilgili terimlerin tanımları." },
      { id: "Madde 3-4", title: "DPA ve Sorumluluklar", summary: "Designated Person Ashore, şirket ve kaptan sorumlulukları." },
      { id: "Madde 5", title: "Kaptan Yetkisi", summary: "Kaptanın emniyet ve çevre koruma konusundaki bağımsız karar yetkisi." },
      { id: "Madde 6", title: "Kaynaklar ve Personel", summary: "Mürettebat yetkinliği, eğitim ve kaynak tahsisi gereklilikleri." },
      { id: "Madde 7", title: "Gemi İçi Operasyon Planları", summary: "Kritik gemici operasyonları için prosedür, plan ve talimatlar." },
      { id: "Madde 8", title: "Acil Durum Hazırlığı", summary: "Acil durum tanımlama, müdahale planları ve tatbikatlar." },
      { id: "Madde 9", title: "Raporlama ve Analiz", summary: "Uygunsuzluk, kaza ve tehlikeli durumların raporlanması ve analizi." },
      { id: "Madde 10", title: "Bakım", summary: "Gemi ve teçhizat bakım sistemi (PMS) gereklilikleri." },
      { id: "Madde 11-12", title: "Dokümantasyon ve Denetim", summary: "Doküman kontrolü, iç denetim ve yönetim gözden geçirmesi." },
      { id: "Madde 13", title: "Sertifikasyon", summary: "DOC (şirket) ve SMC (gemi) sertifika düzenleme, doğrulama ve geçerlilik kuralları." },
    ],
    penalties: [
      "DOC veya SMC sertifikası eksikliğinde geminin seferden alıkonması",
      "Ciddi SMS ihlallerinde sertifika askıya alınması veya iptali",
      "Kaza soruşturmalarında SMS eksikliklerinin tespitinde hukuki sorumluluk",
      "Major non-conformity kapatılmadığında sertifika askıya alınması",
    ],
    detailedSections: [
      {
        heading: "Donanımdan kültüre: emniyetin yönetilmesi",
        body:
          "ISM Code, denizcilik emniyetinde bir paradigma değişimini temsil eder. Kendinden önceki sözleşmeler gemiye 'ne kadar ekipman, hangi yapı' sorusunu sorarken ISM 'bu sistem nasıl yönetiliyor, kim sorumlu, hata olunca ne öğreniliyor' sorusunu sorar. Herald of Free Enterprise faciasının ardından, kazaların kök nedeninin çoğu zaman donanım değil zayıf organizasyon ve belirsiz sorumluluk olduğu kabul edildi. ISM bu boşluğu, her şirketin yazılı bir Emniyet Yönetim Sistemi (SMS) kurmasını zorunlu kılarak doldurur. SMS, emniyet politikasından kritik operasyon talimatlarına kadar her şeyin belgelendiği, denetlendiği ve sürekli iyileştirildiği yaşayan bir çerçevedir.",
      },
      {
        heading: "Kıyı-gemi köprüsü: DPA ve kaptan yetkisi",
        body:
          "ISM'in en özgün katkılarından biri, gemi ile şirket merkezi arasında doğrudan bir emniyet hattı kurmasıdır. Her şirket bir Designated Person Ashore (DPA) atar; bu kişi, hiyerarşik engellere takılmadan en üst yönetime erişebilen, emniyet ve çevre konularını izleyen bağımsız bir bağdır. Buna karşılık Madde 5, kaptanın emniyet ve çevre koruma konusunda nihai ve bağımsız karar yetkisini (override authority) açıkça güvence altına alır: ticari baskı ne olursa olsun kaptan emniyet için gerekli kararı alabilir. Bu iki düzenleme birlikte, emniyet kararlarının ne kıyıdaki ticari kaygıya ne de gemideki yalnızlığa kurban edilmemesini sağlar.",
      },
      {
        heading: "Sürekli iyileştirme döngüsü",
        body:
          "SMS statik bir el kitabı değil, bir öğrenme makinesidir. Uygunsuzluklar (non-conformity), kazalar ve ramak kala (near-miss) olayları raporlanır, analiz edilir ve düzeltici aksiyonlarla kapatılır. İç denetimler sistemin kâğıt üstünde değil gerçekte işlediğini doğrular; yönetim gözden geçirmesi (management review) bulguları stratejik kararlara dönüştürür. Planlı Bakım Sistemi (PMS) ekipman güvenilirliğini, doküman kontrolü ise herkesin güncel prosedürle çalışmasını sağlar. 2021 sonrası siber güvenlik risk yönetimi de SMS'e entegre edilmiş, böylece dijital tehditler de emniyet yönetiminin parçası olmuştur.",
      },
      {
        heading: "Belgelendirme ve denetim sonuçları",
        body:
          "ISM uyumu iki sertifikayla kanıtlanır: şirkete verilen Document of Compliance (DOC) ve her gemiye verilen Safety Management Certificate (SMC). Bu sertifikalar dış denetimlerle (audit) doğrulanır ve beş yıllık döngüde yenilenir. Denetimde tespit edilen büyük uygunsuzluk (major non-conformity) kapatılmazsa sertifika askıya alınabilir ve gemi sefere çıkamaz. Kaza soruşturmalarında SMS eksiklikleri tespit edilirse şirketin hukuki sorumluluğu doğar. Bu yönüyle ISM, SOLAS Chapter IX olarak zorunlu olmasının ötesinde, modern gemi işletmeciliğinin organizasyonel omurgasıdır.",
      },
      {
        heading: "Madde 1-3: amaçlar, politika ve şirket sorumluluğu",
        body:
          "ISM Code'un ilk maddeleri, sistemin zeminini döşer. Madde 1, kodun amacını net biçimde tanımlar: denizde emniyeti sağlamak, can kaybı ve yaralanmaları önlemek ve çevreye (özellikle deniz çevresine) zarar vermekten kaçınmak; bunun için her şirketin emniyet hedefleri belirlemesini ister. Madde 2, şirketin yazılı bir emniyet ve çevre koruma politikası oluşturmasını ve bunu organizasyonun her seviyesinde uygulamasını şart koşar. Madde 3, 'şirket' kavramını tanımlar ve kritik bir gerçeği vurgular: ISM yalnızca gemiyi değil, onu işleten kıyı organizasyonunu da kapsar. Geminin sahibi ile işleteni farklıysa, gemiyi fiilen yöneten taraf ISM yükümlülüklerini üstlenir ve bunu bayrak devletine bildirir. Böylece emniyet sorumluluğu belirsiz bırakılmaz, somut bir tüzel kişiye bağlanır.",
      },
      {
        heading: "Madde 4-5: Atanmış Kişi (DPA) ve kaptan yetkisi",
        body:
          "Bu iki madde, ISM'in en özgün düzenlemeleridir. Madde 4, en az bir Designated Person Ashore (DPA) atanmasını zorunlu kılar: bu kişi, gemi ile şirketin en üst yönetimi arasında doğrudan, hiyerarşik engellere takılmayan bir emniyet bağıdır; her geminin emniyet ve çevre koruma operasyonunu izler ve gerektiğinde yeterli kaynağın sağlanmasını talep eder. Madde 5, kaptanın rolünü ve özellikle 'üst yetki'sini (overriding authority) tanımlar: kaptan, emniyet ve kirlilik önleme konusunda ticari veya başka hiçbir baskıya tabi olmaksızın nihai karar verme yetkisine sahiptir ve şirket bu yetkiyi açıkça yazılı olarak desteklemek zorundadır. Bu iki madde birlikte, emniyet kararlarının ne kıyıdaki kâr kaygısına ne de gemideki yalnızlığa kurban edilmesini engeller.",
      },
      {
        heading: "Madde 6-8: kaynaklar, gemi operasyonları ve acil duruma hazırlık",
        body:
          "Madde 6, kaynak ve personel yönetimini düzenler: kaptanın gerekli niteliklere sahip olması, mürettebatın yeterli ve sertifikalı olması, yeni personele tanıtım (familiarization) eğitimi verilmesi ve herkesin SMS'i anlayabileceği bir dilde bilgilendirilmesi zorunludur. Madde 7, gemideki kritik operasyonlar için yazılı plan ve talimatlar hazırlanmasını ister; örneğin kapalı mahal girişi, sıcak çalışma, yük operasyonları, köprüüstü ve makine vardiyası gibi yüksek riskli işler önceden tanımlanmış prosedürlere bağlanır. Madde 8, acil duruma hazırlığı kapsar: olası acil durumlar (yangın, çatışma, su alma, kirlilik, adam denize, terk gemi) tanımlanır, müdahale planları yazılır ve düzenli tatbikatlarla denenir; ayrıca kıyı organizasyonunun bir acil durumda gemiye nasıl destek vereceği önceden planlanır.",
      },
      {
        heading: "Madde 9-10: raporlama, analiz ve bakım",
        body:
          "Madde 9, ISM'i bir öğrenme sistemine dönüştüren maddedir: uygunsuzluklar (non-conformity), kazalar ve tehlikeli durumlar (ramak kala – near miss) raporlanır, kök neden analizine tabi tutulur ve düzeltici aksiyonlarla kapatılır. Bu kültür, suçlama yerine öğrenmeye dayanır; near-miss raporlamasının teşvik edilmesi, küçük işaretlerin büyük kazalara dönüşmeden yakalanmasını sağlar. Madde 10, gemi ve teçhizatın bakımını düzenler: bir Planlı Bakım Sistemi (PMS) kurulur, kurallara uygunluk düzenli denetimlerle sağlanır ve özellikle aniden arızalanması tehlikeli sonuç doğurabilecek 'kritik ekipman' belirlenip bu ekipmanın güvenilirliğini artıracak özel önlemler (test, yedeklilik) alınır. Böylece bakım, reaktif bir tamir faaliyeti olmaktan çıkıp önleyici bir emniyet aracına dönüşür.",
      },
      {
        heading: "Madde 11-13: dokümantasyon, denetim ve sertifikasyon",
        body:
          "Son maddeler, sistemin belgelenmesini ve doğrulanmasını ele alır. Madde 11, doküman kontrolünü düzenler: geçerli belgelerin ilgili tüm yerlerde bulunması, güncel olmayan belgelerin kaldırılması ve değişikliklerin gözden geçirilip onaylanması gerekir. Madde 12, şirketin kendi sistemini iç denetimlerle (en az yılda bir) doğrulamasını, bulguları yönetime raporlamasını ve düzenli yönetim gözden geçirmesi (management review) yapmasını ister; bu, sürekli iyileştirme döngüsünü tamamlar. Madde 13, sertifikasyonu tanımlar: şirkete dış denetim sonrası Document of Compliance (DOC), her gemiye ise Safety Management Certificate (SMC) verilir; bunlar beş yıllık döngüde ara doğrulamalarla yenilenir. Kapatılmayan bir büyük uygunsuzluk (major non-conformity) sertifikanın askıya alınmasına ve geminin sefer yapamamasına yol açabilir. 2021 sonrası siber risk yönetimi de bu sisteme entegre edilerek dijital tehditler emniyet yönetiminin parçası olmuştur.",
      },
    ],
    relatedSlugs: ["solas", "smc", "isps-code"],
    resources: [{ label: "IMO ISM Code", href: "https://www.imo.org/en/OurWork/HumanElement/Pages/ISMCode.aspx" }],
  },
  {
    slug: "isps-code",
    label: "ISPS Code – Gemi ve Liman Tesisi Güvenliği",
    category: "Emniyet Kodları",
    overview: "Deniz güvenliği tehditlerine karşı gemi ve liman tesislerinin korunması için risk değerlendirmesi, güvenlik planları ve prosedürler belirler.",
    history: "11 Eylül 2001 saldırıları sonrasında IMO hızla harekete geçmiş ve ISPS Code 2002'de kabul edilerek 2004'te yürürlüğe girmiştir. SOLAS Chapter XI-2 olarak entegre edilmiş olan kod, Part A (zorunlu) ve Part B (tavsiye – çoğu ülke tarafından zorunlu uygulanan) olmak üzere iki bölümden oluşur.",
    applicability: [
      "500 GT ve üzeri uluslararası sefer yapan tüm gemiler",
      "Uluslararası sefer yapan gemilere hizmet veren liman tesisleri",
      "Mobil açık deniz sondaj üniteleri",
    ],
    essentials: [
      "Gemi Güvenlik Planı (SSP) ve güvenlik seviyeleri (1-2-3)",
      "Gemi Güvenlik Görevlisi (SSO) ve Şirket Güvenlik Görevlisi (CSO)",
      "Güvenlik ekipmanları: CCTV, alarm, erişim kontrol, aydınlatma",
      "Güvenlik tatbikatları ve denetimler – her 3 ayda tatbikat, yılda 1 tatbikat (tam)",
      "Liman Tesisi Güvenlik Planı (PFSP) ve Liman Güvenlik Görevlisi (PFSO)",
      "DoS (Declaration of Security) – gemi-liman arayüzü güvenlik bildirimi",
      "SSA (Ship Security Assessment) – tehdit ve zafiyet değerlendirmesi",
      "CSR (Continuous Synopsis Record) – geminin güvenlik geçmişi kaydı",
    ],
    actions: [
      "SSP'yi güncel tut ve mürettebata eğit",
      "Güvenlik seviyesi değişimlerinde prosedürleri uygula",
      "Güvenlik ekipmanlarını düzenli test et",
      "ISSC sertifikasını güncel tut",
      "DoS gerekliliklerini liman ile koordine et",
      "Stowaway (kaçak yolcu) arama prosedürlerini güvenlik planına entegre et",
    ],
    amendments: [
      { year: "2004", description: "ISPS Code yürürlüğe girişi" },
      { year: "2012", description: "Güvenlik tatbikatı gerekliliklerinin güncellenmesi" },
      { year: "2021", description: "Siber güvenlik tehditlerine karşı SSA'nın genişletilmesi" },
    ],
    keyArticles: [
      { id: "Part A-7", title: "Gemi Güvenlik Planı (SSP)", summary: "SSP'nin hazırlanması, onayı ve uygulanması gereklilikleri." },
      { id: "Part A-8", title: "Gemi Güvenlik Görevlisi (SSO)", summary: "SSO atanması, eğitimi ve sorumlulukları." },
      { id: "Part A-9", title: "Güvenlik Seviyeleri", summary: "Seviye 1 (normal), Seviye 2 (yüksek tehdit), Seviye 3 (olağanüstü) tanımları ve prosedürleri." },
      { id: "Part A-11", title: "Şirket Güvenlik Görevlisi (CSO)", summary: "CSO atanması, yetkileri ve sorumlulukları." },
      { id: "Part A-14", title: "Liman Tesisi Güvenliği", summary: "PFSP hazırlama, PFSO atama ve liman güvenlik önlemleri." },
      { id: "Part B", title: "Tavsiye Niteliğinde Kılavuz", summary: "Part A'nın uygulanmasına ilişkin detaylı kılavuzlar (çoğu devlet tarafından zorunlu uygulanır)." },
    ],
    penalties: [
      "ISSC sertifikası eksik veya geçersiz gemilerin alıkonması",
      "SSP ihlallerinde bayrak devleti yaptırımları",
      "Güvenlik seviyesi 3'te uyumsuzluk durumunda geminin limana giriş yasağı",
      "Güvenlik ihlali sonrası operasyonel kontrol kaybında cezai sorumluluk",
    ],
    detailedSections: [
      {
        heading: "11 Eylül sonrası deniz güvenliği",
        body:
          "ISPS Code, emniyet (safety – kazalardan korunma) ile güvenlik (security – kasıtlı saldırılardan korunma) arasındaki ayrımı denizcilik mevzuatına netçe taşıyan ilk büyük düzenlemedir. 11 Eylül 2001 saldırılarının ardından, ticari gemilerin ve limanların bir terör aracı veya hedefi olabileceği endişesiyle hızla geliştirilmiştir. SOLAS Chapter XI-2'ye bağlı olarak çalışır ve risk temelli bir yaklaşım benimser: önce tehdit ve zafiyetler değerlendirilir (SSA), sonra bunlara karşı somut önlemler bir plana (SSP) bağlanır. Kod, gemiyi izole bir birim olarak değil, liman tesisleriyle birlikte bir güvenlik sistemi olarak ele alır.",
      },
      {
        heading: "Güvenlik organizasyonu: SSO, CSO, PFSO",
        body:
          "ISPS, güvenliği belirli kişilere atanmış sorumluluklarla somutlaştırır. Gemide Ship Security Officer (SSO) güvenlik planının uygulanmasından sorumludur; kıyıda Company Security Officer (CSO) şirket düzeyinde koordinasyonu sağlar; liman tarafında ise Port Facility Security Officer (PFSO) tesis güvenliğini yönetir. Bu üçlü, gemi-liman arayüzünde güvenliğin kesintisiz olmasını sağlar. Gemi ile liman arasındaki sorumlulukların netleştirilmesi gerektiğinde bir Declaration of Security (DoS) imzalanır. Geminin güvenlik geçmişi ise Continuous Synopsis Record (CSR) ile izlenir.",
      },
      {
        heading: "Üç güvenlik seviyesi ve uygulanışı",
        body:
          "ISPS'in operasyonel kalbi üç kademeli güvenlik seviyesi sistemidir. Seviye 1 normal koşulları temsil eder ve sürekli uygulanan asgari önlemleri (erişim kontrolü, kimlik denetimi, devriye) içerir. Seviye 2, somut bir tehdit istihbaratı olduğunda devreye girer ve ek önlemleri (artırılmış arama, sınırlı erişim noktaları) zorunlu kılar. Seviye 3, bir güvenlik olayının olası veya yakın olduğu olağanüstü durumlarda uygulanır ve genellikle yetkili makamlarla koordineli özel önlemler gerektirir. Güvenlik seviyesini bayrak veya liman devleti belirler; gemi bu değişimlere planında tanımlı prosedürlerle anında uyum sağlamak zorundadır.",
      },
      {
        heading: "Belgelendirme ve uyum",
        body:
          "Geminin ISPS uyumu, International Ship Security Certificate (ISSC) ile belgelenir; bu sertifika olmadan veya geçersizken gemi alıkonabilir ve limana giriş reddedilebilir. Güvenlik tatbikatları (her üç ayda bir tatbikat, yılda bir kapsamlı egzersiz) planın işlerliğini doğrular. CCTV, alarm, erişim kontrolü ve aydınlatma gibi güvenlik ekipmanları düzenli test edilir. ISPS, ISM Code ile yakın akrabadır: her ikisi de yazılı plan, atanmış sorumlu, tatbikat ve denetim mantığıyla çalışır; biri emniyeti, diğeri güvenliği yönetir ve birlikte geminin organizasyonel savunma katmanını oluşturur.",
      },
      {
        heading: "SSA – Gemi Güvenlik Değerlendirmesi (derinlemesine)",
        body:
          "ISPS uyumu bir değerlendirmeyle başlar: Ship Security Assessment (SSA), geminin maruz kalabileceği tehditleri ve bunlara karşı zafiyetlerini sistematik olarak analiz eder. CSO (Şirket Güvenlik Görevlisi) sorumluluğunda yürütülen bu çalışma; kritik ekipman ve alanları (köprüüstü, makine dairesi, kargo kontrol, erişim noktaları) belirler, olası tehdit senaryolarını (yetkisiz giriş, kaçak yolcu, sabotaj, silah/patlayıcı kaçakçılığı, geminin silah olarak kullanılması) değerlendirir ve mevcut önlemlerdeki boşlukları ortaya koyar. SSA, geminin güvenlik planının temelini oluşturur; iyi yapılmamış bir değerlendirme, üzerine kurulan tüm planı temelsiz bırakır. Bu yüzden SSA, somut bir saha incelemesi ve risk analizini birleştiren disiplinli bir süreçtir.",
      },
      {
        heading: "SSP – Gemi Güvenlik Planı (derinlemesine)",
        body:
          "Ship Security Plan (SSP), SSA'nın bulgularını somut prosedürlere çeviren ve bayrak devletince (veya yetkili RSO) onaylanan gizli bir belgedir. Plan; her güvenlik seviyesi için erişim kontrolünü, kısıtlı bölgelerin (restricted areas) tanımını ve korunmasını, kargo ile gemi kumanyasının elleçlenmesindeki güvenlik önlemlerini, güvenlik ekipmanının kullanımını, tehdit ve güvenlik ihlallerine müdahaleyi, tahliye prosedürlerini ve eğitim/tatbikat programını içerir. SSP'nin gizliliği esastır: yetkisiz kişilerin erişimine kapalıdır, çünkü plan aynı zamanda geminin zayıf noktalarını da gösterir. Plan değiştiğinde onay yenilenir; gemide her zaman onaylı ve güncel bir nüsha bulundurulur ve mürettebat planın kendisini ilgilendiren kısımlarını bilir.",
      },
      {
        heading: "Güvenlik organizasyonu, erişim kontrolü ve kısıtlı bölgeler",
        body:
          "ISPS, güvenliği atanmış sorumluluklar ve günlük uygulamalarla somutlaştırır. Gemide SSO planın uygulanmasından, kıyıda CSO şirket düzeyindeki koordinasyondan, liman tarafında PFSO tesis güvenliğinden sorumludur; bu üçlü, gemi-liman arayüzünde güvenliğin kesintisiz olmasını sağlar. Günlük operasyonda erişim kontrolü merkezdedir: gemiye binen herkesin kimliği doğrulanır, ziyaretçiler ve yükleniciler kaydedilir, gangway sürekli gözetlenir. Kısıtlı bölgeler (köprüüstü, makine dairesi, telsiz odası, kargo kontrol) yetkisiz erişime kapatılır ve işaretlenir. Güvenlik ekipmanları – gizli alarm sistemi (SSAS), AIS, CCTV, aydınlatma ve erişim kontrol donanımı – düzenli test edilir. SSAS özellikle kritiktir: bir saldırı anında gemiyi uyarmadan, sessizce kıyıdaki yetkilileri haberdar eder.",
      },
      {
        heading: "DoS, CSR, tatbikatlar ve denetim",
        body:
          "ISPS'in işleyişini birkaç araç tamamlar. Declaration of Security (DoS), gemi ile bir liman tesisi (veya başka bir gemi) arasında güvenlik sorumluluklarının netleştirilmesi gerektiğinde – örneğin taraflardan biri daha yüksek güvenlik seviyesindeyse – imzalanan bir mutabakattır. Continuous Synopsis Record (CSR), geminin bayrak, isim, sahip ve sınıf geçmişini izleyerek kimlik sürekliliğini sağlar ve ISSC ile birlikte gemide bulundurulur. Planın kâğıt üstünde kalmaması için düzenli tatbikatlar (drills – tipik olarak üç ayda bir) ve daha kapsamlı egzersizler (exercises – yılda bir) yapılır. Sistem, periyodik iç ve dış doğrulamalarla denetlenir ve uyum International Ship Security Certificate (ISSC) ile belgelenir. ISSC veya SSP eksikliği PSC'de alıkoymaya, güvenlik ihlalleri ise limana kabul edilmemeye yol açabilir; ISPS bu yönüyle ISM Code'un emniyet (safety) yönetimiyle simetrik bir güvenlik (security) yönetim sistemidir.",
      },
    ],
    relatedSlugs: ["solas", "issc", "ism-code"],
    resources: [{ label: "IMO ISPS Code", href: "https://www.imo.org/en/OurWork/Security/Pages/ISPS-Code.aspx" }],
  },
  {
    slug: "imsbc-code",
    label: "IMSBC Code – Dökme Katı Yük Kuralları",
    category: "Emniyet Kodları",
    overview: "Dökme katı yükün güvenli taşınması için sınıflandırma, istif, trimming ve özel önlemler belirler; liquefy olabilen ve kimyasal tehlike taşıyan yükleri kapsar.",
    history: "Önceden BC Code olarak bilinen düzenleme, 2008'de IMSBC Code olarak revize edilmiş ve 2011'de SOLAS Chapter VI kapsamında zorunlu hale getirilmiştir. Her 2 yılda güncellenen kod, 350'den fazla yük profilini ve taşıma koşullarını detaylı bir şekilde listeler.",
    applicability: [
      "Dökme katı yük taşıyan tüm gemiler (uluslararası sefer)",
      "Bir geminin herhangi bir bölmesine dökme olarak yüklenen katı yükler",
      "Tahıl hariç (Grain Code ayrı düzenlenir)",
    ],
    essentials: [
      "Yük grupları: A (liquefy), B (kimyasal tehlike), C (diğer), A&B (her iki özellik)",
      "Nem limiti ve TML (Transportable Moisture Limit) – FMP'nin %90'ı",
      "Can/should test: yükün sıvılaşma eğiliminin pratik testi",
      "Trimming gereklilikleri ve istif faktörü",
      "Özel önlemler: havalandırma, gaz ölçümü, yangın riski, reaktivite",
      "Yük bilgi formu (cargo declaration) zorunluluğu",
      "Section 4: laboratuvar test prosedürleri (Proctor/Fagerberg, flow table)",
      "Section 5: trimming prosedürleri ve stabilite etkileri",
    ],
    actions: [
      "Yük bildirimini (cargo declaration) kontrol et ve TML belgelerini doğrula",
      "Can/should test veya nem testi sonuçlarını incele",
      "Ambar havalandırmasını ve gaz ölçümlerini düzenli yap",
      "Trimming gerekliliklerine uy ve kaydet",
      "Yükleme sırasında yükün görsel durumunu izle (nem belirtileri)",
      "Bağımsız surveyor ile nem testi doğrulaması yaptır (Group A yükler)",
    ],
    amendments: [
      { year: "2011", description: "IMSBC Code zorunlu hale geldi (BC Code'un yerini aldı)" },
      { year: "2013", description: "Amendment 01 – yeni yük profilleri eklendi" },
      { year: "2017", description: "Amendment 04 – bauxite taşımacılığında ek önlemler" },
      { year: "2019", description: "Amendment 05 – bauxite ve nikel cevheri için özel hükümler ve test prosedürleri" },
      { year: "2023", description: "Amendment 07 – güncellenmiş yük profilleri ve laboratuvar test yöntemleri" },
    ],
    keyArticles: [
      { id: "Section 1-3", title: "Genel, Sınıflandırma ve Güvenlik", summary: "Yük grupları, tanımlar ve genel güvenlik önlemleri." },
      { id: "Section 4", title: "Yük Değerlendirmesi", summary: "Laboratuvar test prosedürleri, TML belirleme ve nem ölçümü." },
      { id: "Section 7", title: "Yapısal Güvenlik", summary: "Yükleme oranları, yapısal stres sınırlamaları ve ambar koruması." },
      { id: "Section 8-9", title: "Yük Profilleri", summary: "Her bir dökme yük için detaylı taşıma koşulları, tehlikeler ve önlemler." },
    ],
    penalties: [
      "TML aşımı ile yükleme yapılması durumunda geminin seferden alıkonması",
      "Yük sıvılaşması nedeniyle meydana gelen kazalarda cezai ve hukuki sorumluluk",
      "Cargo declaration eksikliğinde PSC denetim eksikliği",
      "Group A yükte nem testi yapılmadan yükleme kabul edilmez",
    ],
    detailedSections: [
      {
        heading: "Görünmeyen tehlike: sıvılaşma",
        body:
          "IMSBC Code'un varlık nedeni, dökme katı yüklerin masum görünümünün ardındaki ölümcül risklerdir. En kritik tehlike sıvılaşmadır (liquefaction): nem içeren ince taneli yükler (nikel cevheri, boksit, bazı konsantreler) geminin titreşimi ve hareketiyle aniden sıvı gibi davranmaya başlayabilir. Bu durumda yük ambar içinde kayar, geminin meyil dengesini bozar ve dakikalar içinde alabora olmaya yol açabilir. Kod, yükleri tehlike özelliklerine göre üç gruba ayırır: Grup A sıvılaşabilen yükler, Grup B kimyasal tehlike (yangın, zehirli gaz, oksijen tüketimi) taşıyanlar, Grup C ise her iki riski de taşımayanlardır.",
      },
      {
        heading: "Nem limiti ve test rejimi",
        body:
          "Grup A yükleri için kodun en önemli sayısal kavramı Transportable Moisture Limit'tir (TML): yükün güvenle taşınabileceği azami nem oranı, tipik olarak akış nem noktasının (FMP) %90'ı olarak belirlenir. Yükün gerçek nem oranı bu sınırın altında olmalıdır. Bunu doğrulamak için laboratuvar testleri (Proctor/Fagerberg, flow table) ve sahada hızlı bir 'can/should test' kullanılır. Yükleyici, gemiye TML ve gerçek nem değerlerini içeren bir yük bilgi formu (cargo declaration) vermek zorundadır; bu belge olmadan veya nem testi yapılmadan Grup A yük kabul edilmemelidir.",
      },
      {
        heading: "İstif, trimming ve operasyonel önlemler",
        body:
          "Kod yalnızca sıvılaşmayı değil, her yükün kendine özgü taşıma koşullarını da düzenler: 350'den fazla yük için ayrı profiller, istif faktörleri, havalandırma ihtiyaçları, yangın ve reaktivite önlemlerini listeler. Trimming (yükün ambar içinde düzgün yayılması) hem stabilite hem yapısal yük dağılımı için kritiktir. Bazı yükler kapalı havalandırma ister (oksijenle reaksiyona girmemesi için), bazıları ise zehirli/yanıcı gaz biriktirebileceği için sürekli havalandırma ve gaz ölçümü gerektirir. Mürettebat yükleme sırasında yükün görsel durumunu (nem belirtileri, su sızması) izler ve şüphe halinde operasyonu durdurur. Tahıl bu koddan ayrıdır ve ayrı Grain Code ile düzenlenir.",
      },
      {
        heading: "Üç yük grubunun derinlemesine mantığı",
        body:
          "IMSBC Code'un tüm sınıflandırması üç grup etrafında kurulur ve her grup farklı bir tehlike felsefesini temsil eder. Grup A, nem içerdiğinde sıvılaşabilen (liquefaction) yüklerdir; ana risk dengenin aniden kaybıdır. Grup B, kimyasal tehlike taşıyan yüklerdir; bunlar yangın çıkarabilir, oksijeni tüketerek ambarı boğucu hale getirebilir, zehirli veya yanıcı gaz yayabilir ya da su/havayla tehlikeli reaksiyona girebilir. Grup C, ne sıvılaşan ne de kimyasal tehlike taşıyan, görece zararsız yüklerdir (ancak bunlar bile yapısal aşırı yükleme ve toz gibi riskler taşıyabilir). Bazı yükler hem A hem B özelliği gösterir (A&B). Bir yükün hangi grupta olduğunu bilmek, alınacak tüm önlemleri (havalandırma açık mı kapalı mı, gaz ölçümü gerekli mi, nem testi şart mı) belirler; bu yüzden yükleme öncesi grup teyidi kritik ilk adımdır.",
      },
      {
        heading: "TML, akış nem noktası ve test yöntemleri",
        body:
          "Grup A yüklerinin güvenli taşınması, nem kontrolüne dayanır. Yükün gerçek nem oranı, Taşınabilir Nem Limiti'nin (TML) altında olmalıdır; TML genellikle akış nem noktasının (Flow Moisture Point – FMP) %90'ı olarak belirlenir. FMP, yükün katı davranıştan akışkan davranışa geçtiği nem eşiğidir. Bu değerleri belirlemek için akredite laboratuvar testleri kullanılır: Proctor/Fagerberg testi, flow table testi ve penetrasyon testi gibi yöntemler farklı yük tipleri için uygundur. Sahada hızlı bir ön kontrol olarak 'can test' (numuneyi bir kaba koyup tokmaklama) uygulanabilir, ancak laboratuvar testinin yerini tutmaz. Yükleyici, gemiye TML ve gerçek nem değerlerini içeren imzalı bir yük bilgi formu (cargo declaration) vermek zorundadır ve bu belge ile testler en fazla belirli gün öncesine ait olmalıdır; aksi halde yük reddedilir.",
      },
      {
        heading: "Grup B kimyasal tehlikeleri (derinlemesine)",
        body:
          "Grup B yükleri çok çeşitli kimyasal riskler taşır ve her biri farklı önlem gerektirir. Bazı yükler (örneğin doğrudan indirgenmiş demir – DRI) havayla ve özellikle suyla temas ettiğinde ısınır ve hidrojen açığa çıkararak patlama riski yaratır; bunlar inert atmosfer ve sıkı sızdırmazlık ister. Kömür gibi yükler hem kendiliğinden ısınma (self-heating) hem metan yayma riski taşır; bu yüzden yüzey havalandırması, sıcaklık ve gaz (metan, CO) izlemesi gerekir, ancak derin havalandırma ısınmayı körükleyebileceği için dengeli yapılır. Sülfür ve bazı konsantreler toz patlaması veya korozyon riski taşır. Oksijen tüketen yükler (bazı tarımsal ürünler, metal konsantreleri) ambarı insan için ölümcül hale getirebilir; bu nedenle kapalı mahal giriş prosedürleri ve gaz ölçümü hayatidir. Her yükün profilinde bu tehlikeler ve karşı önlemler tek tek listelenir.",
      },
      {
        heading: "Yük profilleri, BLU Code ve trimming",
        body:
          "IMSBC Code'un pratik omurgası, 350'den fazla dökme yük için ayrı ayrı hazırlanmış yük profilleridir (schedules). Her profil; yükün tanımını, grubunu, istif faktörünü, taşıma sırasındaki tehlikelerini, havalandırma ve gaz ölçüm gerekliliklerini, yükleme/boşaltma önlemlerini ve acil durum prosedürlerini içerir. Listelenmeyen yeni bir yük taşınacaksa, yetkili idarelerden geçici taşıma izni alınması gerekir. Trimming (yükün ambar içinde düzgün yayılması) hem stabilite hem yapısal yük dağılımı açısından zorunludur; özellikle sıvılaşabilen yüklerde ve yapısal stresi önlemek için kritiktir. Yükleme operasyonu, gemi ile terminal arasındaki iletişimi ve yükleme planını standartlaştıran BLU Code ile koordine edilir; dengesiz veya çok hızlı yükleme gövdeye zararlı eğilme/burulma gerilmesi bindirebilir, bu yüzden yükleme sırası ve oranı yükleme bilgisayarıyla izlenir.",
      },
      {
        heading: "Operasyonel uygulama ve diğer kodlarla ilişki",
        body:
          "IMSBC uyumu, bir dizi günlük disiplinden oluşur: yük bilgi formunun ve TML belgelerinin doğrulanması, şüpheli Grup A yüklerinde bağımsız sörveyörle nem testi yaptırılması, yükleme sırasında yükün görsel durumunun (nem belirtileri, su sızması) izlenmesi, ambar havalandırmasının yük profiline göre açık veya kapalı tutulması ve gerektiğinde düzenli gaz ölçümü. Tüm bunlar kaza önlemenin yanı sıra hukuki sorumluluğun da temelidir: TML aşımıyla yükleme yapmak alıkoyma ve kazada cezai sorumluluk doğurur. IMSBC Code, kapsamı bakımından komşu kodlardan ayrılır: tahıl, sıvılaşma yerine kayma riski taşıdığı için ayrı Grain Code ile; ambalajlı tehlikeli maddeler ise IMDG Code ile düzenlenir. Böylece dökme katı yük, kendi özel kuralları olan ayrı bir disiplin oluşturur.",
      },
    ],
    relatedSlugs: ["solas", "bc-code", "css-code"],
    resources: [{ label: "IMO IMSBC Code", href: "https://www.imo.org/en/Publications/Pages/IMSBC-Code.aspx" }],
  },
  {
    slug: "imdg-code",
    label: "IMDG Code – Tehlikeli Madde Taşımacılığı",
    category: "Emniyet Kodları",
    overview: "Tehlikeli maddelerin deniz yoluyla taşınmasında sınıflandırma, ambalajlama, işaretleme, belgelendirme ve ayrım kurallarını düzenler.",
    history: "İlk olarak 1965'te tavsiye niteliğinde yayımlanan IMDG Code, 2004'ten itibaren SOLAS Chapter VII kapsamında zorunlu hale gelmiştir. Her 2 yılda güncellenir; güncel baskı Amendment 42-24'tür. 3.500'den fazla tehlikeli madde listelenmiştir.",
    applicability: [
      "Ambalajlı tehlikeli madde taşıyan tüm gemiler",
      "Konteynerlerde, araçlarda ve portatif tanklarda taşınan tehlikeli yükler",
      "Limited quantities ve excepted quantities kuralları dahil",
    ],
    essentials: [
      "9 tehlike sınıfı: 1-Patlayıcı, 2-Gaz, 3-Yanıcı Sıvı, 4-Yanıcı Katı, 5-Oksitleyici, 6-Toksik, 7-Radyoaktif, 8-Korozif, 9-Çeşitli",
      "UN numaraları ve uygun taşıma adı (Proper Shipping Name – PSN)",
      "Ambalajlama: packing group I (yüksek tehlike), II (orta), III (düşük)",
      "İşaretleme, etiketleme ve placard gereklilikleri",
      "Ayrım (segregation) gereklilikleri – segregation table ve özel hükümler",
      "Belgelendirme: DG manifest, container/vehicle packing certificate, multimodal DG form",
      "Acil durum prosedürleri: EmS (Emergency Schedules) ve MFAG (Medical First Aid Guide)",
      "CTU Code: konteyner/araç paketleme ve güvenlik gereklilikleri",
    ],
    actions: [
      "DG manifest ve packing certificate'ı kontrol et",
      "Ayrım kurallarına göre istif planı yap",
      "Acil durum prosedürlerini (EmS) hazır bulundur",
      "Mürettebata tehlikeli madde eğitimi ver (STCW ve IMDG gerekliliklerine uygun)",
      "Konteyner/araç dış görünümünü hasar ve sızıntı açısından kontrol et",
      "DG listesini köprüüstü ve makine dairesinde erişilebilir tut",
    ],
    amendments: [
      { year: "2004", description: "IMDG Code zorunlu hale geldi (SOLAS Chapter VII)" },
      { year: "2014", description: "Amendment 37-14: CTU Code entegrasyonu ve ambalaj güçlendirme" },
      { year: "2020", description: "Amendment 40-20: lityum pil taşımacılığı gerekliliklerinin güncellenmesi" },
      { year: "2024", description: "Amendment 42-24: güncellenmiş madde listeleri ve special provisions" },
    ],
    keyArticles: [
      { id: "Part 1", title: "Genel Hükümler", summary: "Tanımlar, eğitim, uygulama, güvenlik ve raporlama gereklilikleri." },
      { id: "Part 2", title: "Sınıflandırma", summary: "9 tehlike sınıfının detaylı tanımları ve alt sınıflandırmalar." },
      { id: "Part 3", title: "Tehlikeli Madde Listesi", summary: "UN numarasına göre sıralanmış madde listeleri ve özel hükümler." },
      { id: "Part 5", title: "Gönderme Prosedürleri", summary: "İşaretleme, etiketleme, placard ve belgelendirme gereklilikleri." },
      { id: "Part 7", title: "Taşıma Operasyonları", summary: "Yükleme, istif, ayrım ve güvenlik gereklilikleri." },
    ],
    penalties: [
      "Tehlikeli madde taşıma ihlallerinde ağır para cezaları",
      "Yanlış beyan ve gizleme durumunda cezai kovuşturma",
      "Ayrım kuralı ihlalinde geminin alıkonması",
      "Kaza sonucu tehlikeli madde sızıntısında çevre ve sorumluluk tazminatı",
    ],
    detailedSections: [
      {
        heading: "Tehlikeli yükü ortak bir dile çevirmek",
        body:
          "IMDG Code, deniz yoluyla taşınan binlerce tehlikeli maddeyi tek bir uluslararası sistemle yönetilebilir kılar. Her maddeye bir UN numarası ve standart bir Uygun Taşıma Adı (PSN) atanır; böylece bir kimyasalın ticari adı ne olursa olsun, dünyanın her limanında aynı şekilde tanınır ve aynı kurallara tabi olur. Kodun temel mantığı, tehlikeyi önce sınıflandırmak, sonra bu sınıfa uygun ambalaj, işaret, belge ve istif kurallarını uygulamaktır. Bu standartlaşma, farklı diller ve mevzuatlar arasında taşınan tehlikeli yüklerin kazalara yol açmadan elleçlenmesini sağlar.",
      },
      {
        heading: "Dokuz tehlike sınıfı ve ambalaj grupları",
        body:
          "Maddeler taşıdıkları başlıca riske göre dokuz sınıfa ayrılır: patlayıcılar (1), gazlar (2), yanıcı sıvılar (3), yanıcı katılar (4), oksitleyiciler (5), zehirli ve bulaşıcı maddeler (6), radyoaktifler (7), korozifler (8) ve diğer tehlikeli maddeler (9). Bu sınıflar tehlikenin türünü gösterirken, ambalaj grupları (I yüksek, II orta, III düşük tehlike) tehlikenin derecesini gösterir ve gereken ambalaj dayanımını belirler. Sınıf ve ambalaj grubu birlikte, bir maddenin nasıl paketleneceğini, etiketleneceğini ve ne kadar dikkatle elleçleneceğini tanımlar.",
      },
      {
        heading: "Ayrım (segregation) ve istif kuralları",
        body:
          "IMDG'nin en hayati operasyonel bölümü ayrım (segregation) kurallarıdır: birbiriyle tehlikeli reaksiyona girebilecek maddeler (örneğin asitlerle siyanürler, oksitleyicilerle yanıcılar) belirli mesafelerde veya ayrı bölmelerde taşınmak zorundadır. Ayrım tablosu ve özel hükümler, hangi maddelerin yan yana, hangilerinin ayrı tutulacağını belirler. İstif planı bu kurallara göre yapılır; güverte altı/üstü, ısı kaynaklarından uzaklık ve havalandırma da dikkate alınır. Yanlış bir ayrım, tek başına zararsız iki yükün birleşerek yangın veya zehirli gaz üretmesine yol açabilir.",
      },
      {
        heading: "Belgelendirme ve acil durum hazırlığı",
        body:
          "Her tehlikeli yük sevkiyatı eksiksiz belgelenmek zorundadır: DG manifest, konteyner/araç paketleme sertifikası ve çok modlu tehlikeli madde formu yükün ne olduğunu, nasıl paketlendiğini ve nerede istiflendiğini gösterir. Kaza anına hazırlık için iki kılavuz hayati önemdedir: EmS (Emergency Schedules) yangın ve dökülme durumunda yapılacakları, MFAG (Medical First Aid Guide) ise maruz kalan kişiye uygulanacak ilk yardımı tanımlar. Konteyner ve araçların güvenli paketlenmesi CTU Code ile düzenlenir. Bu belge ve kılavuzlar köprüüstü ile makine dairesinde erişilebilir tutulur, mürettebata düzenli tehlikeli madde eğitimi verilir.",
      },
    ],
    relatedSlugs: ["solas", "marpol"],
    resources: [{ label: "IMO IMDG Code", href: "https://www.imo.org/en/Publications/Pages/IMDG-Code.aspx" }],
  },
  {
    slug: "igs-code",
    label: "IGS Code – Inert Gaz Sistemleri",
    category: "Emniyet Kodları",
    overview: "Tanker gemilerinde kargo tanklarının inert gaz ile korunması için sistem tasarımı, işletme ve bakım standartlarını belirler.",
    history: "1970'lerdeki büyük tanker patlamalarından (Mactra 1969, Marpessa 1969, Kong Haakon VII 1978) sonra geliştirilmiş olan inert gaz sistemi gereklilikleri, SOLAS Chapter II-2'ye entegre edilmiştir. IGS Code bu sistemlerin tasarım ve işletme detaylarını düzenler.",
    applicability: [
      "20.000 DWT ve üzeri ham petrol tankerleri (tüm kargo tankları)",
      "8.000 DWT ve üzeri ürün tankerleri (COW yapanlar zorunlu, diğerleri bayrak devletine bağlı)",
      "Kimyasal tankerlerde IBC Code referanslı uygulamalar",
      "Kombine taşıyıcılar (OBO) petrol yükü taşırken",
    ],
    essentials: [
      "Oksijen seviyesi: max. %8 (IG supply), %5 (yükleme/boşaltma başlamadan önce)",
      "IG üretimi: flue gas sistemi (kazan veya bağımsız yakıcı) veya azot jeneratörü",
      "Sistem bileşenleri: scrubber (gaz yıkama), blower (fan), deck seal (wet/dry/semi-dry)",
      "İzleme ve alarm sistemleri: O₂ analizörü, basınç sensörleri, yüksek/düşük basınç alarmı",
      "Deck water seal ve non-return düzenekleri – gaz geri kaçışının önlenmesi",
      "Purging, inerting ve gas-freeing prosedürleri",
      "Individual tank inerting ve regülasyon gereklilikleri",
    ],
    actions: [
      "IG sistemi performansını sürekli izle (O₂ seviyesi, basınç)",
      "Oksijen seviyesini düzenli ölç ve kaydet",
      "Scrubber ve blower bakımlarını zamanında yap",
      "Deck seal su seviyesini kontrol et",
      "Yedek O₂ analizörü sensörlerini hazır bulundur",
      "Non-return valve ve P/V breaker fonksiyon testlerini düzenli yap",
    ],
    amendments: [
      { year: "2000", description: "Azot jeneratör sistemlerinin alternatif IG kaynağı olarak kabulü" },
      { year: "2016", description: "Revize performans standartları ve alarm gereklilikleri" },
    ],
    keyArticles: [
      { id: "Chapter 2-3", title: "Sistem Tasarımı", summary: "IG üretim, dağıtım ve kontrol sistemi tasarım gereklilikleri." },
      { id: "Chapter 4", title: "Emniyet Cihazları", summary: "Deck seal, non-return valve, P/V breaker ve alarm sistemleri." },
      { id: "Chapter 5", title: "İzleme ve Kontrol", summary: "O₂ izleme, basınç kontrolü ve kayıt gereklilikleri." },
    ],
    penalties: [
      "IG sistemi çalışmıyorken kargo operasyonu yapılması yasaktır – alıkoyma sebebi",
      "IG sistemi arızasında kargo operasyonunun durdurulması zorunludur",
      "Vetting denetimlerinde IG sistemi eksiklikleri ticari red sebebidir",
    ],
    detailedSections: [
      {
        heading: "Yangın üçgenini kırmak: neden inert gaz",
        body:
          "Bir tankerde en büyük tehlike, boşaltma sonrası kargo tanklarında kalan yanıcı hidrokarbon buharlarının havayla karışarak patlayıcı bir atmosfer oluşturmasıdır. Yanma için gereken üç unsur (yakıt, oksijen, ateş kaynağı) bir arada olduğunda en küçük bir kıvılcım felakete yol açabilir; 1969-1978 arasındaki büyük tanker patlamaları bunu acı biçimde göstermiştir. İnert gaz sistemi bu üçgeni oksijeni hedef alarak kırar: tank atmosferindeki oksijen seviyesini yanmanın imkânsız hale geldiği düzeye (genel kural olarak %8'in, kritik operasyonlarda %5'in altına) indirir. Böylece tankta yanıcı buhar bulunsa bile tutuşma gerçekleşemez.",
      },
      {
        heading: "Sistem bileşenleri ve inert gaz kaynağı",
        body:
          "İnert gaz iki yoldan üretilir: ya kazan veya bağımsız bir yakıcının baca gazından (flue gas, düşük oksijenli) ya da bir azot jeneratöründen. Baca gazı önce bir scrubber'da yıkanarak kükürt ve kurum partiküllerinden arındırılır, sonra bloweler (fanlar) ile tanklara basılır. Sistemin geri kaçışı önleyen kritik bir emniyet katmanı vardır: deck water seal ve non-return düzenekleri, tanktaki yanıcı gazın makine dairesine geri dönmesini engeller; P/V breaker tankı aşırı basınç ve vakumdan korur. Oksijen analizörleri ve basınç sensörleri sistemi sürekli izler ve sınır aşımında alarm verir.",
      },
      {
        heading: "Operasyonel prosedürler ve uyum",
        body:
          "İnert gaz yalnızca bir donanım değil, bir dizi prosedürdür: purging (tankı inert gazla süpürme), inerting (oksijeni düşürme) ve gas-freeing (insan girişi için tankı havalandırma) farklı amaçlarla, sıkı sırayla uygulanır. Yükleme/boşaltma boyunca tank her zaman pozitif basınçta ve düşük oksijende tutulur. Mürettebat oksijen seviyesini düzenli ölçer ve kaydeder, scrubber/blower bakımını yapar, deck seal su seviyesini kontrol eder. İnert gaz sistemi çalışmazken kargo operasyonu yapmak kesinlikle yasaktır ve bu durum PSC alıkoyma ile vetting (SIRE) denetimlerinde ticari red sebebidir.",
      },
    ],
    relatedSlugs: ["solas", "ics-code"],
    resources: [{ label: "IMO IGS Code", href: "https://www.imo.org/en/OurWork/Safety/Pages/IGS-Code.aspx" }],
  },
  {
    slug: "igf-code",
    label: "IGF Code – Gaz Yakıtlı Gemiler",
    category: "Emniyet Kodları",
    overview: "LNG ve diğer düşük parlama noktalı gazlarla çalışan gemilerin tasarım, inşa ve işletme güvenliği için risk tabanlı yaklaşım ve teknik standartlar sağlar.",
    history: "Gemilerde alternatif yakıt kullanımının artmasıyla 2015'te kabul edilen IGF Code, 2017'de yürürlüğe girmiştir. Şu anda öncelikle LNG yakıtını kapsar; metanol ve diğer yakıtlar için geçici kılavuzlar (MSC.1/Circ.1621) mevcuttur. Amonyak yakıt kılavuzları hazırlanmaktadır.",
    applicability: [
      "Düşük parlama noktalı gaz yakıt kullanan tüm gemiler (500 GT üzeri, uluslararası sefer)",
      "LNG-fuelled gemiler (birincil kapsam)",
      "Metanol ve etanol yakıtlı gemiler (MSC.1/Circ.1621 geçici kılavuzu)",
      "Gelecekte amonyak, hidrojen ve diğer alternatif yakıtlar",
    ],
    essentials: [
      "Risk değerlendirmesi ve alternatif tasarım onayı (HAZID, HAZOP)",
      "Yakıt tankı, boru hattı ve bunkering düzenleri – çift bariyer ilkesi",
      "Gaz algılama, havalandırma ve acil durum sistemleri",
      "ESD (Emergency Shutdown) sistemi gereklilikleri",
      "Mürettebat eğitimi: STCW A-V/3 uyumlu gaz yakıt eğitimi",
      "Bunkering operasyon prosedürleri ve safety checklist",
      "Makine dairesi düzenlemesi: gaz güvenli ve gaz tehlikeli alanlar",
    ],
    actions: [
      "Gaz algılama sistemlerini günlük test et",
      "Bunkering prosedürlerini checklist ile uygula",
      "Acil durum tatbikatlarını düzenli yap (gaz sızıntısı senaryoları dahil)",
      "Mürettebata gaz yakıt güvenliği eğitimi ver",
      "ESD sistemini periyodik test et",
      "Gas-safe ve gas-dangerous space sınıflandırmasını doğrula",
    ],
    amendments: [
      { year: "2017", description: "IGF Code yürürlüğe girişi" },
      { year: "2020", description: "Metanol yakıt için geçici kılavuz (MSC.1/Circ.1621)" },
      { year: "2024", description: "Amonyak yakıt kılavuzu taslağı tartışmaları" },
    ],
    keyArticles: [
      { id: "Part A", title: "Genel", summary: "Hedefler, fonksiyonel gereklilikler ve risk değerlendirmesi çerçevesi." },
      { id: "Part A-1", title: "LNG Yakıt", summary: "LNG yakıtlı gemiler için detaylı teknik gereklilikler." },
      { id: "Chapter 6", title: "Yakıt Boru Hatları", summary: "Boru sistemi tasarımı, malzeme ve koruma gereklilikleri." },
      { id: "Chapter 9", title: "Gaz Algılama", summary: "Gaz algılama sistemi tasarımı, yerleşimi ve alarm seviyeleri." },
      { id: "Chapter 11", title: "Yangın Güvenliği", summary: "Gaz yakıtlı gemilere özgü yangın güvenlik önlemleri." },
    ],
    penalties: [
      "IGF Code gerekliliklerini karşılamayan gemiye sertifika düzenlenmez",
      "Gaz sızıntısı tespit sisteminde arıza durumunda seferin durdurulması",
      "PSC denetiminde IGF Code ihlali tespitinde alıkoyma",
    ],
    detailedSections: [
      {
        heading: "Alternatif yakıt çağının emniyet çerçevesi",
        body:
          "IGF Code, gemilerin geleneksel fuel oil yerine LNG ve diğer düşük parlama noktalı yakıtlara geçişiyle ortaya çıkan yeni riskleri yönetmek için kurulmuştur. Bu yakıtların çevresel avantajı vardır ancak emniyet açısından zorludur: gaz halinde sızdığında hızla yayılır, çok düşük sıcaklıkta depolanır ve dar bir aralıkta patlayıcı karışım oluşturur. Kodun ayırt edici yaklaşımı, her ayrıntıyı önceden yazmak yerine risk temelli (goal-based) olmasıdır: tasarımcı, sistemin güvenliğini HAZID/HAZOP gibi yapılandırılmış risk analizleriyle kanıtlamak ve idare/klas onayını almak zorundadır. Bu esneklik, henüz olgunlaşmamış yakıt teknolojilerinin güvenle gelişmesine olanak tanır.",
      },
      {
        heading: "Çift bariyer ilkesi ve gaz güvenliği",
        body:
          "IGF'nin temel mühendislik felsefesi 'çift bariyer'dir: yakıtın tutulduğu her noktada, tek bir arıza durumunda bile gazın insanların bulunduğu alanlara ulaşmaması için iki bağımsız koruma katmanı bulunur. Yakıt tankları, boru hatları ve bağlantılar bu mantıkla tasarlanır; çift cidarlı borular, gaz sızıntısını yakalayıp güvenli biçimde dışarı atan havalandırılmış mahfazalar kullanılır. Makine dairesi 'gaz güvenli' ve 'gaz tehlikeli' bölgelere ayrılır; elektrikli ekipman bu sınıflandırmaya uygun seçilir. Gaz algılama sistemleri sürekli izler ve eşik aşımında otomatik acil kapatma (ESD) devreye girerek yakıt akışını anında keser.",
      },
      {
        heading: "Bunkering, eğitim ve uyum",
        body:
          "Gaz yakıt almak (bunkering), konvansiyonel yakıt almaktan çok daha riskli ve prosedürel bir operasyondur; her adım bir kontrol listesiyle yürütülür, sızıntı ve statik elektrik önlemleri alınır, acil ayrılma düzenekleri hazır tutulur. Mürettebatın STCW A-V/3 kapsamında özel gaz yakıt eğitimi alması zorunludur, çünkü bu sistemleri güvenle işletmek özel bilgi gerektirir. Gaz sızıntısı senaryoları düzenli tatbik edilir, ESD ve gaz algılama sistemleri periyodik test edilir. IGF gerekliliklerini karşılamayan gemiye sertifika verilmez; algılama sisteminin arızası seferin durdurulmasını gerektirir. Kod şu an ağırlıkla LNG'yi kapsasa da metanol ve amonyak gibi yakıtlar için kılavuzlarla genişlemektedir.",
      },
    ],
    relatedSlugs: ["solas", "stcw", "igc-code"],
    resources: [{ label: "IMO IGF Code", href: "https://www.imo.org/en/OurWork/Safety/Pages/IGF-Code.aspx" }],
  },
  {
    slug: "bc-code",
    label: "BC Code – Dökme Yük Gemileri Güvenliği",
    category: "Emniyet Kodları",
    overview: "Dökme yük gemilerinin yapısal güvenliği, yükleme/boşaltma prosedürleri ve stabilite için ek gereklilikler belirler.",
    history: "1990'lardaki dökme yük gemisi kayıpları (Derbyshire 1980, MV Flare 1998) SOLAS Chapter XII'nin 1997'de eklenmesini ve BC Code'un güçlendirilmesini sağlamıştır. 2011'de IMSBC Code yürürlüğe girince BC Code dökme yük gemisi yapısal gerekliliklerine odaklanmıştır.",
    applicability: [
      "150 metre ve üzeri dökme yük gemileri (SOLAS Chapter XII)",
      "Tüm dökme yük gemileri (genel SOLAS gereklilikleri)",
      "Ore carrier ve combination carrier dahil",
    ],
    essentials: [
      "Yapısal dayanım ve yükleme sınırlamaları",
      "Loading instrument ve stress monitoring (yapısal stres hesaplama)",
      "Ambar erişimi ve havalandırma",
      "Yükleme/boşaltma planı ve onayı – gemi-terminal arayüzü",
      "SOLAS Chapter XII ek gereklilikleri: çift cidar, su seviye alarm, pompaj kapasitesi",
      "Su geçirmez ambar kapakları ve hava deliklerinin denetimi",
      "Yükleme oranı sınırlamaları ve yapısal stres izleme",
    ],
    actions: [
      "Loading instrument ile stres değerlerini izle ve limitleri aşma",
      "Yükleme planını kaptan ve terminal ile onayla (BLU Code uyumu)",
      "Ambar havalandırmasını düzenli kontrol et",
      "Yapısal hasarları düzenli denetle ve raporla",
      "Ambar kapağı su geçirmezlik testlerini periyodik yap (hose test veya ultrasonic)",
    ],
    amendments: [
      { year: "1997", description: "SOLAS Chapter XII eklenmesi – 150m+ dökme yük gemileri için ek gereklilikler" },
      { year: "2004", description: "BLU Code (Code of Practice for Loading and Unloading of Bulk Carriers) kabulü" },
      { year: "2012", description: "Yapısal muayene ve bakım gerekliliklerinin güncellenmesi" },
    ],
    keyArticles: [
      { id: "SOLAS XII/4", title: "Hasar Stabilite", summary: "Dökme yük gemilerinde hasar stabilite gereklilikleri ve survival kriterleri." },
      { id: "SOLAS XII/6", title: "Yapısal Dayanım", summary: "Hold flooding sonrası yapısal dayanım ve yükleme limitleri." },
      { id: "SOLAS XII/12", title: "Su Seviye Alarm", summary: "Cargo hold su girişi algılama ve alarm sistemi gereklilikleri." },
      { id: "BLU Code", title: "Yükleme/Boşaltma", summary: "Gemi-terminal iletişimi, yükleme planı ve güvenlik prosedürleri." },
    ],
    penalties: [
      "Loading instrument çalışmıyorken yükleme yapılması PSC alıkoyma sebebi",
      "Yapısal hasarın raporlanmaması klas askıya alınması sebebi",
      "Ambar kapağı su geçirmezlik ihlali PSC detention sebebi",
    ],
    detailedSections: [
      {
        heading: "Neden dökme yük gemileri özel ilgi gerektirir",
        body:
          "Dökme yük gemileri, denizdeki en yüksek kayıp oranına sahip gemi tiplerinden biri olmuştur. Derbyshire ve benzeri kayıplarda görülen örüntü ürkütücüydü: gemiler çoğu zaman bir tehlike çağrısı bile yapamadan, çok kısa sürede battı. Nedeni, ağır ve yoğun yüklerin ambar yapısını zorlaması, bir ambarın su almasının hızla yapısal çöküşe ve batmaya yol açmasıydı. Bu kayıplar SOLAS Chapter XII'nin eklenmesini ve dökme yük gemilerine özel ek yapısal ve operasyonel gerekliliklerin getirilmesini sağladı. BC Code ve onu izleyen düzenlemeler, bu gemilerin hem yapısal dayanımını hem de yükleme operasyonlarını sıkı kurallara bağlar.",
      },
      {
        heading: "Yapısal dayanım ve hasar sonrası hayatta kalma",
        body:
          "Chapter XII'nin özü, bir ambarın su alması durumunda geminin yine de yüzer kalabilmesini sağlamaktır. 150 m üzeri gemiler için hasar stabilite ve yapısal dayanım kriterleri tanımlanır: en öndeki ambar su alsa bile geminin batmaması, perdelerin ve çift cidar yapılarının bu yükü taşıyabilmesi beklenir. Her ambara su seviyesi algılama ve alarm sistemi konur, böylece sessiz bir su girişi erkenden fark edilir. Çift cidar düzenlemeleri ve güçlendirilmiş perde yapıları, tek noktadan başlayan bir hasarın domino etkisiyle tüm gemiyi batırmasını önler.",
      },
      {
        heading: "Yükleme operasyonu ve BLU Code",
        body:
          "Dökme yük gemilerinde tehlike yalnızca denizde değil, limanda yükleme/boşaltma sırasında da vardır: dengesiz veya çok hızlı yükleme, gövdeye aşırı eğilme ve burulma gerilmesi bindirerek yapısal hasara yol açabilir. Bu yüzden her yükleme bir loading instrument (yükleme bilgisayarı) ile izlenir ve hesaplanan gerilme limitleri asla aşılmaz. BLU Code, gemi ile terminal arasındaki iletişimi, üzerinde mutabık kalınan bir yükleme planını ve güvenlik prosedürlerini standartlaştırır; yükleme sırası, oranı ve denge gözetilerek gövde dengeli yüklenir. Loading instrument çalışmazken yükleme yapmak PSC alıkoyma sebebidir.",
      },
    ],
    relatedSlugs: ["solas", "imsbc-code", "esp"],
    resources: [{ label: "IMO BC Code", href: "https://www.imo.org/en/OurWork/Safety/Pages/BulkCarriers.aspx" }],
  },
  {
    slug: "ics-code",
    label: "IBC Code – Kimyasal Tankerler",
    category: "Emniyet Kodları",
    overview: "Kimyasal tanker gemilerinin tasarım, inşa ve tehlikeli kimyasal madde taşımacılığı için güvenlik standartlarını düzenler.",
    history: "IBC Code (International Code for the Construction and Equipment of Ships Carrying Dangerous Chemicals in Bulk) 1986'da SOLAS Chapter VII ve MARPOL Ek II kapsamında zorunlu hale gelmiştir. 2007'de kapsamlı revizyon yapılarak NLS sınıflandırması güncellenmiştir. 1986 öncesi gemiler için BCH Code uygulanır.",
    applicability: [
      "1986 sonrası inşa edilen tüm kimyasal tankerler",
      "1986 öncesi gemiler için BCH Code uygulanır",
      "NLS (Noxious Liquid Substances) dökme olarak taşıyan gemiler",
    ],
    essentials: [
      "Gemi tipi: 1, 2, 3 (tehlike seviyesine göre – Tip 1 en tehlikeli yükler, max. 1250 m³ tank)",
      "Kargo tank malzemesi ve kaplama gereklilikleri (stainless steel, zinc silicate, epoxy)",
      "Kargo transfer, havalandırma ve gas freeing prosedürleri",
      "P&A Manual (Procedures and Arrangements Manual) ve cargo compatibility",
      "Chapter 17 ve 18 yük listeleri – minimum taşıma gereklilikleri ve özel koşullar",
      "Elektrikli ekipman gereklilikleri (hazardous area classification)",
      "Kargo ısıtma/soğutma ve sıcaklık kontrol gereklilikleri",
    ],
    actions: [
      "P&A Manual'i güncel tut ve mürettebata eğit",
      "Cargo compatibility kontrolü yap (incompatible yükler ayrı tank, ayrı boru sistemi)",
      "Tank kaplama durumunu düzenli denetle",
      "Gas freeing prosedürlerini uygula ve atmosfer testlerini kaydet",
      "Prewash gerekliliklerini MARPOL Ek II'ye göre uygula",
      "Cargo Record Book'u eksiksiz doldur",
    ],
    amendments: [
      { year: "1986", description: "IBC Code zorunlu hale geldi" },
      { year: "2007", description: "Revize IBC Code – NLS sınıflandırması ve Chapter 17/18 güncellemeleri" },
      { year: "2012", description: "MSC kararları ile tank kaplama ve malzeme gerekliliklerinin güncellenmesi" },
      { year: "2019", description: "Yeni kimyasal maddelerin Chapter 17 listesine eklenmesi" },
    ],
    keyArticles: [
      { id: "Chapter 2", title: "Gemi Hayatta Kalması", summary: "Gemi tipi gereklilikleri, hasar stabilite ve bölmeleme." },
      { id: "Chapter 5", title: "Kargo Transfer", summary: "Yükleme/boşaltma boru sistemleri, manifold ve güvenlik önlemleri." },
      { id: "Chapter 15", title: "Özel Gereklilikler", summary: "Belirli kargolar için ek güvenlik önlemleri ve operasyonel kısıtlamalar." },
      { id: "Chapter 17", title: "Ürün Listesi", summary: "Minimum taşıma gereklilikleri, tank tipi ve özel koşullar listesi." },
    ],
    penalties: [
      "IBC Code uyumsuzluğunda kargo operasyonunun durdurulması ve alıkoyma",
      "Prewash ihlalinde MARPOL Ek II kapsamında ceza",
      "Cargo compatibility ihlali kazaya yol açtığında cezai sorumluluk",
    ],
    detailedSections: [
      {
        heading: "Kimyasal tankerin tasarım mantığı",
        body:
          "IBC Code, dökme tehlikeli kimyasal taşıyan gemileri yükün yarattığı riske göre tasarlama prensibine dayanır. Mantık şudur: taşınan madde ne kadar tehlikeliyse (zehirlilik, yanıcılık, çevreye zarar), geminin hayatta kalma kabiliyeti o kadar yüksek olmalıdır. Bu nedenle gemiler Tip 1, 2 ve 3 olarak sınıflandırılır; Tip 1 en tehlikeli yükleri taşır ve en sıkı bölmeleme, hasar stabilite ve tank yerleşim gerekliliklerine tabidir (tankları gövde dışına en uzak, hacimleri sınırlı). Böylece bir çarpışma veya karaya oturmada en tehlikeli yükün çevreye ve gemiye verebileceği zarar en aza indirilir.",
      },
      {
        heading: "Tank malzemesi, uyumluluk ve transfer",
        body:
          "Kimyasalların büyük kısmı taşındıkları tankla veya birbirleriyle reaksiyona girebilir; bu yüzden IBC Code malzeme ve uyumluluğa özel önem verir. Tanklar yükün kimyasına göre paslanmaz çelik veya özel kaplamalarla (zinc silicate, epoxy) korunur. P&A Manual (Procedures and Arrangements Manual), her yükün hangi tankta, hangi boru sistemiyle taşınacağını ve yükleme/boşaltma sonrası tank temizleme ile kalıntı yönetimini tanımlar. Birbiriyle uyumsuz yükler ayrı tanklarda ve ayrı boru sistemlerinde tutulur. Kargo ısıtma/soğutma ve sıcaklık kontrolü, bazı maddelerin donmasını veya tehlikeli biçimde ısınmasını önler.",
      },
      {
        heading: "Ürün listeleri ve çifte rejim",
        body:
          "Kodun pratik kalbi Chapter 17 ve 18'deki ürün listeleridir: her kimyasal için asgari gemi tipi, tank gereklilikleri, özel önlemler ve operasyonel kısıtlamalar tek tek belirtilir; bir gemi yalnızca sertifikasında (Certificate of Fitness) izin verilen ürünleri taşıyabilir. IBC Code aynı zamanda iki sözleşmeyi birden hizalar: emniyet açısından SOLAS Chapter VII, çevre açısından MARPOL Ek II. Bu yüzden tank yıkama, ön yıkama (prewash) ve kalıntı deşarjı hem emniyet hem kirlilik kurallarına tabidir. 1986 öncesi gemiler benzer ama daha eski bir rejim olan BCH Code kapsamındadır.",
      },
    ],
    relatedSlugs: ["marpol", "igs-code"],
    resources: [{ label: "IMO IBC Code", href: "https://www.imo.org/en/Publications/Pages/IBC-Code.aspx" }],
  },
  {
    slug: "igc-code",
    label: "IGC Code – Gaz Tankerleri",
    category: "Emniyet Kodları",
    overview: "Sıvılaştırılmış gaz (LNG, LPG vb.) taşıyan tankerlerin tasarım, inşa ve işletme güvenliği için kapsamlı teknik standartlar sağlar.",
    history: "1986'da SOLAS Chapter VII kapsamında zorunlu kılınan IGC Code, sıvılaştırılmış gaz taşımacılığının özel risklerini ele alır. 2016 revize baskısı (MSC.370(93)) güncel standarttır ve özellikle risk değerlendirmesi ve alternatif tasarım yaklaşımlarını güçlendirmiştir.",
    applicability: [
      "LNG, LPG, etilen, amonyak ve diğer sıvılaştırılmış gazları dökme olarak taşıyan gemiler",
      "2016 sonrası inşa edilen gemiler için revize IGC Code zorunlu",
      "1986-2016 arası gemiler için orijinal IGC Code (grandfathering ilkesi)",
    ],
    essentials: [
      "Tank tipi: bağımsız (A, B, C tipi), membran (GTT Mark III, NO96), integral, yarı-membran",
      "Kargo sıcaklık ve basınç kontrol sistemleri (reliquefaction, boil-off management)",
      "Gaz algılama, havalandırma ve acil durum prosedürleri",
      "Mürettebat eğitimi: STCW A-V/1-2 gaz tanker endorsement",
      "İkincil bariyer gereklilikleri ve kargo hold space izleme",
      "ESD (Emergency Shutdown) ve ERS (Emergency Release System) gereklilikleri",
      "Boil-off gaz (BOG) yönetimi: re-liquefaction veya yakıt olarak kullanım",
    ],
    actions: [
      "Kargo sıcaklık ve basıncını sürekli izle",
      "Gaz algılama sistemlerini günlük test et",
      "Acil durum prosedürlerini düzenli tatbikat et (gaz sızıntısı, yangın)",
      "Tank muayene ve bakımlarını zamanında yap",
      "İkincil bariyer alan (interbarrier space) sıcaklık ve gaz izlemesini doğrula",
      "Boil-off gaz yönetim prosedürlerini uygula",
    ],
    amendments: [
      { year: "1986", description: "IGC Code zorunlu hale geldi (SOLAS Chapter VII)" },
      { year: "1994", description: "Etilen taşımacılığı gerekliliklerinin güncellenmesi" },
      { year: "2016", description: "Revize IGC Code (MSC.370(93)) – risk değerlendirmesi ve alternatif tasarım yaklaşımı" },
    ],
    keyArticles: [
      { id: "Chapter 4", title: "Tank Tipleri", summary: "Bağımsız (A, B, C), membran ve integral tank tasarım gereklilikleri." },
      { id: "Chapter 5", title: "Süreç Basınç Kapları", summary: "Basınç kapları ve ısı değiştiricileri tasarım standartları." },
      { id: "Chapter 8", title: "Kontrol ve İzleme", summary: "Kargo izleme, alarm ve acil kapatma sistemleri." },
      { id: "Chapter 11", title: "Yangın Güvenliği", summary: "Gaz tankerlerine özgü yangın güvenlik gereklilikleri ve söndürme sistemleri." },
      { id: "Chapter 19", title: "Ürün Listesi", summary: "Taşınabilir gazların listesi ve minimum taşıma gereklilikleri." },
    ],
    penalties: [
      "IGC Code uyumsuzluğunda sertifika düzenlenmez/askıya alınır",
      "Gaz algılama sistemi arızasında kargo operasyonunun durdurulması",
      "Vetting denetimlerinde (SIRE) ciddi bulgu durumunda ticari red",
    ],
    detailedSections: [
      {
        heading: "Sıvılaştırılmış gaz taşımacılığının özel riskleri",
        body:
          "IGC Code, LNG, LPG, etilen ve amonyak gibi sıvılaştırılmış gazları taşıyan tankerlerin kendine özgü tehlikelerini yönetir. Bu yükler ya çok düşük sıcaklıkta (kriyojenik, LNG için yaklaşık -163°C) ya da yüksek basınç altında sıvı halde tutulur; sızdıklarında hızla genleşip yanıcı veya zehirli bulutlar oluşturabilir, aşırı soğuklarıyla çelik gövdeyi kırılganlaştırabilir. Kod, bu gemileri en üst düzey teknik standartlarla tasarlar ve gaz tankerlerini denizdeki en sofistike ve en sıkı denetlenen gemiler haline getirir. Temel amaç, kargonun her koşulda kontrol altında ve insanın bulunduğu alanlardan izole tutulmasıdır.",
      },
      {
        heading: "Tank tipleri ve ikincil bariyer",
        body:
          "IGC'nin teknik kalbi kargo tankı tasarımıdır. Tanklar bağımsız (A, B, C tipi), membran veya integral olabilir; her tip farklı bir basınç/sıcaklık ve sızıntı yönetimi felsefesine dayanır. Kritik kavram ikincil bariyerdir: birincil tank sızdırırsa, soğuk sıvının gemi gövdesine ulaşıp onu kırılganlaştırmasını önleyecek ikinci bir koruma katmanı bulunur. Bariyerler arası boşluk (interbarrier space) sürekli sıcaklık ve gaz açısından izlenir, böylece en küçük bir sızıntı erkenden tespit edilir. Membran tankların (GTT Mark III, NO96) tasarımı bu çift koruma ilkesinin en gelişmiş örneğidir.",
      },
      {
        heading: "Boil-off, ESD ve mürettebat yetkinliği",
        body:
          "Kriyojenik kargo sürekli az miktarda buharlaşır; bu boil-off gazının (BOG) yönetimi IGC operasyonunun ayrılmaz parçasıdır: gaz ya yeniden sıvılaştırılır (reliquefaction) ya da geminin yakıtı olarak kullanılır, böylece tank basıncı güvenli aralıkta tutulur. Acil durumlar için Emergency Shutdown (ESD) ve Emergency Release System (ERS) kargo transferini saniyeler içinde güvenle durdurur ve ayırır. Bu sistemlerin karmaşıklığı nedeniyle mürettebatın STCW gaz tanker endorsement'ı (A-V/1-2) ile özel olarak eğitilmesi zorunludur. Gaz algılama, basınç ve sıcaklık sürekli izlenir; sistemde ciddi arıza kargo operasyonunu durdurur ve vetting denetimlerinde ticari sonuç doğurur.",
      },
      {
        heading: "Tank tipleri ve malzeme seçiminin derinlemesine mantığı",
        body:
          "IGC Code, kargo tanklarını taşıdıkları basınç/sıcaklık rejimine ve sızıntı yönetimi felsefesine göre sınıflandırır. Bağımsız tanklar üç alt tiptedir: Tip C, basınç kabı olarak tasarlanır ve genellikle ikincil bariyer gerektirmez (LPG ve etilen gemilerinde yaygın); Tip A ve B daha düşük basınçlı, daha büyük hacimli, kriyojenik yükler için uygundur ve ikincil bariyer gerektirir (Tip B kısmi, Tip A tam ikincil bariyer). Membran tanklar (GTT Mark III, NO96), gemi gövdesi tarafından desteklenen ince bir bariyer ve yalıtım katmanları sistemidir ve büyük LNG taşıyıcılarında standarttır. Malzeme seçimi kriyojenik koşullarda kritiktir: sıradan çelik aşırı soğukta kırılganlaşır, bu yüzden kargoyla temas eden yüzeylerde özel düşük sıcaklık çelikleri, nikel alaşımları veya paslanmaz çelik kullanılır. Tank tipi, geminin tüm hasar stabilite ve yerleşim tasarımını da belirler.",
      },
      {
        heading: "İkincil bariyer ve sızıntı izleme",
        body:
          "IGC'nin temel emniyet ilkesi, soğuk kargonun hiçbir koşulda gemi gövdesine ulaşmamasıdır; çünkü kriyojenik bir sızıntı çeliği anında kırılganlaştırıp yapısal çöküşe yol açabilir. Bu yüzden birincil tankın sızdırması halinde devreye giren bir ikincil bariyer öngörülür ve bu bariyer, belirli bir süre boyunca sızan sıvıyı güvenle tutabilmelidir. Birincil ve ikincil bariyer arasındaki boşluk (interbarrier space) ile çevredeki mahaller sürekli sıcaklık ve gaz açısından izlenir; ani bir sıcaklık düşüşü veya gaz tespiti, en küçük bir sızıntıyı erkenden haber verir. Bu izleme ağı, kargo kontrol sisteminin ayrılmaz parçasıdır ve mürettebata bir sorunu felakete dönüşmeden müdahale etme imkânı tanır.",
      },
      {
        heading: "Kargo kontrolü, ESD ve emniyet sistemleri",
        body:
          "Gaz tankerlerinde kargo, kapsamlı bir enstrümantasyon ağıyla yönetilir: tank seviyesi, basınç ve sıcaklık sürekli ölçülür; aşırı dolum (overfill) alarmları ve bağımsız yüksek seviye kesme sistemleri vardır. Acil durumda transferi saniyeler içinde güvenle durduran Emergency Shutdown (ESD) sistemi ve gemi ile terminali fiziksel olarak ayıran Emergency Release System (ERS) zorunludur; bunlar yanlış manevra, yangın veya kopma durumunda büyük bir gaz salımını önler. Gaz algılama sistemleri kapalı mahallerde ve tehlikeli bölgelerde sızıntıyı sürekli izler; belirlenen eşik aşıldığında alarm ve otomatik önlemler devreye girer. Elektrikli ekipman, tehlikeli bölge sınıflandırmasına uygun (ex-proof) seçilir; havalandırma sistemleri yanıcı gaz birikmesini önler.",
      },
      {
        heading: "Boil-off yönetimi, yangın güvenliği ve ürün listesi",
        body:
          "Kriyojenik kargo sürekli az miktarda buharlaşır; bu boil-off gazının (BOG) yönetimi IGC operasyonunun ayrılmaz parçasıdır. Gaz ya yeniden sıvılaştırılır (reliquefaction – özellikle LPG'de), ya geminin yakıtı olarak kullanılır, ya da kontrollü biçimde yakılır; amaç tank basıncını her zaman güvenli aralıkta tutmaktır. Yangın güvenliği gaz tankerlerine özgüdür: güverte ve kritik alanlar su püskürtme (water spray) sistemiyle soğutulur, kuru kimyasal (dry chemical powder) söndürme sistemleri yangına müdahale eder ve kargo bölgesi yaşam mahallerinden yalıtılır. Personel koruması için göz/yüz koruyucular, koruyucu giysi ve solunum cihazları bulundurulur. Kodun Chapter 19'u, taşınabilen tüm gazları listeler ve her ürün için asgari tank tipi, malzeme, sıcaklık/basınç koşulları ve özel önlemleri belirtir; bir gemi yalnızca Certificate of Fitness'inde izin verilen ürünleri taşıyabilir.",
      },
    ],
    relatedSlugs: ["solas", "igf-code", "igs-code"],
    resources: [{ label: "IMO IGC Code", href: "https://www.imo.org/en/Publications/Pages/IGC-Code.aspx" }],
  },
  {
    slug: "lsa-code",
    label: "LSA Code – Can Kurtarma Araçları",
    category: "Emniyet Kodları",
    overview: "Can filikaları, can salları, kişisel can kurtarma teçhizatı ve indirme düzeneklerinin tasarım, performans ve test standartlarını belirler.",
    history: "LSA Code (Life-Saving Appliances Code), SOLAS Chapter III'ün teknik detaylarını içerir. 1996'da kabul edilmiş ve düzenli olarak MSC sirkülerleri ile güncellenmiştir. Can kurtarma araçlarının tasarım ve performans standardı olarak tüm gemi inşa ve donatım süreçlerine referans oluşturur.",
    applicability: [
      "SOLAS kapsamındaki tüm gemiler",
      "Can kurtarma teçhizatı üreticileri",
      "Bayrak devleti ve klas kuruluşu onay süreçleri",
    ],
    essentials: [
      "Can filikası tipleri: totally enclosed (TELB), partially enclosed, freefall, fire-protected (FPLB)",
      "Can salı: SOLAS pack A ve B, throw-overboard ve davit-launched",
      "Kişisel teçhizat: can yeleği (275N, 150N, 100N, 50N), can simidi, dalma elbisesi (immersion suit), termal koruyucu (TPA)",
      "İndirme/kurtarma (davit) düzenekleri: gravity, stored energy, hydraulic; ve bakım/test aralıkları",
      "MES (Marine Evacuation System) gereklilikleri (yolcu gemileri)",
      "MOB (Man Overboard) kurtarma düzenekleri ve prosedürleri",
      "Servis gereklilikleri: can salı servisi (yıllık), can filika motoru servisi, davit yük testi (5 yıl)",
      "HRU (Hydrostatic Release Unit) gereklilikleri ve değişim aralıkları",
    ],
    actions: [
      "Can kurtarma araçlarının periyodik servis ve yıllık muayenelerini planla",
      "Dalma elbisesi ve can yeleği sayılarını manifesto ile eşleştir",
      "Davit ve vinç yük testlerini 5 yıllık döngüde tamamla",
      "Haftalık can filika motoru çalıştırma testini kaydet",
      "Can salı HRU değişim tarihlerini izle",
      "Can kurtarma tatbikatlarını SOLAS gerekliliklerine uygun yap (aylık)",
    ],
    amendments: [
      { year: "2006", description: "MSC.218(82) – can filika on-load release hook güvenlik iyileştirmesi" },
      { year: "2011", description: "MSC.320(89) – can filika servis ve bakım gereklilikleri güncellendi" },
      { year: "2014", description: "MSC.368(93) – davit-launched life raft bakım aralıkları" },
      { year: "2020", description: "MSC.481(102) – can yeleği performans ve işaretleme standartları güncellendi" },
    ],
    keyArticles: [
      { id: "Chapter I", title: "Genel", summary: "Tanımlar, malzeme standartları ve genel tasarım gereklilikleri." },
      { id: "Chapter II", title: "Kişisel Can Kurtarma Teçhizatı", summary: "Can yeleği, can simidi, dalma elbisesi, termal koruyucu standartları." },
      { id: "Chapter III", title: "Görsel İşaretler", summary: "Paraşüt fişeği, el fişeği ve duman sinyali gereklilikleri." },
      { id: "Chapter IV", title: "Survival Craft", summary: "Can filikası ve can salı tasarım, performans ve teçhizat standartları." },
      { id: "Chapter V", title: "Kurtarma Botu", summary: "Rescue boat tasarım ve performans gereklilikleri." },
      { id: "Chapter VI", title: "İndirme ve Bindirme", summary: "Davit, vinç ve MES tasarım ve test standartları." },
    ],
    penalties: [
      "Can kurtarma teçhizatı eksikliğinde geminin alıkonması",
      "Servis süresi geçmiş teçhizat için PSC eksikliği",
      "On-load release hook güvenlik iyileştirmesi yapılmamış davit için alıkoyma",
    ],
    detailedSections: [
      {
        heading: "Son savunma hattı: hayatta kalma donanımı",
        body:
          "LSA Code, SOLAS Chapter III'ün soyut gerekliliklerini ölçülebilir tasarım ve performans standartlarına çevirir. Mantığı, geminin terk edilmesi gibi en kötü senaryoda bile insanların hayatta kalmasını sağlayacak donanımın güvenilir, test edilmiş ve her an kullanıma hazır olmasıdır. Kod, bir can yeleğinin kaç Newton kaldırma kuvveti vereceğinden, bir can filikasının hangi sıcaklık ve deniz koşullarında işlev göreceğine kadar her ayrıntıyı standardize eder. Böylece dünyanın neresinde üretilirse üretilsin, bir can kurtarma aracının asgari bir performansı garanti edilir.",
      },
      {
        heading: "Survival craft ve kişisel teçhizat",
        body:
          "Donanım iki ana grupta toplanır. Survival craft, kazazedeleri sudan uzak tutan araçlardır: tamamen kapalı can filikaları (TELB), serbest düşüşlü filikalar (freefall), yangına karşı korumalı tipler ve can salları (atılabilir veya matafora ile indirilen). Kişisel teçhizat ise bireyi korur: farklı kaldırma sınıflarında can yelekleri, can simitleri, soğuk suda hipotermiyi geciktiren dalma elbiseleri (immersion suit) ve termal koruyucular (TPA). Yolcu gemilerinde hızlı toplu tahliye için Marine Evacuation System (MES) kullanılır. Her donanımın sayısı gemideki kişi sayısıyla eşleşmek zorundadır.",
      },
      {
        heading: "İndirme düzenekleri, bakım ve test",
        body:
          "Bir can filikasının kendisi kadar onu güvenle suya indiren matafora (davit) düzeneği de kritiktir; geçmişte pek çok kaza, indirme sırasında kancanın (on-load release hook) erken açılmasından kaynaklanmıştır, bu yüzden kod bu mekanizmaların güvenliğini özellikle sıkılaştırmıştır. LSA donanımı ancak düzenli bakım ve testle güvenilir kalır: can salları yıllıkservise gönderilir, filika motorları haftalık çalıştırılır, matafora ve vinçler beş yıllık yük testinden geçer, hidrostatik serbest bırakma üniteleri (HRU) zamanında değiştirilir. Bu bakım döngüsü ihmal edilirse PSC eksiklikleri ve alıkoyma doğar; donanım kâğıt üstünde var olsa bile gerçekte işlevsiz kalabilir.",
      },
    ],
    relatedSlugs: ["solas", "safety-equipment-cert"],
    resources: [{ label: "LSA Code", href: "https://www.imo.org/en/OurWork/Safety/Pages/LifeSavingAppliances.aspx" }],
  },
  {
    slug: "fss-code",
    label: "FSS Code – Yangın Güvenlik Sistemleri",
    category: "Emniyet Kodları",
    overview: "Sabit yangın söndürme, algılama ve alarm sistemlerinin tasarım, kurulum, test ve bakım standartlarını düzenler.",
    history: "FSS Code (Fire Safety Systems Code), SOLAS Chapter II-2'nin teknik detaylarını içerir. 2001'de kabul edilmiş ve çeşitli MSC kararları ile güncellenmiştir. Yangın güvenlik sistemlerinin tasarım ve performans standardı olarak tüm gemi tiplerinde referans alınır.",
    applicability: [
      "SOLAS kapsamındaki tüm gemiler",
      "Yangın güvenlik sistemi tasarımcıları ve üreticileri",
      "Klas kuruluşu onay ve survey süreçleri",
    ],
    essentials: [
      "Sabit CO₂ söndürme sistemi: toplam/lokal flooding, alarm, zaman gecikmesi gereklilikleri",
      "Sabit köpük söndürme: makine dairesi, kargo alanları ve güverte köpük monitörleri",
      "Su sisi (water mist) ve yağmurlama (sprinkler) sistemleri",
      "Otomatik ve manuel yangın algılama/alarm düzenleri – zone ve loop yapısı",
      "Sistem test, bakım ve yedek parça gereklilikleri",
      "Yangın kapıları, damper ve yangın bütünlüğü sınıfları: A-60, A-30, A-15, A-0, B-15, B-0",
      "Sabit aerosol söndürme sistemleri (yeni teknoloji)",
      "İtfaiyeci teçhizatı: SCBA (breathing apparatus), itfaiyeci elbisesi, yaşam hattı",
    ],
    actions: [
      "CO₂ sistemi ağırlık kontrolünü yıllık olarak yap ve kaydet",
      "Algılama ve alarm panellerini haftalık fonksiyon testiyle doğrula",
      "Söndürme ajanı miktarı ve şarj durumunu izle",
      "Yangın kapısı ve damper fonksiyon testlerini aylık yap",
      "Taşınabilir ve sabit söndürücülerin servis tarihlerini takip et",
      "SCBA hava tüplerini periyodik test et ve yedek tüpleri hazır bulundur",
    ],
    amendments: [
      { year: "2010", description: "MSC.292(87) – sprinkler ve su sisi sistemlerinin güncellenmesi" },
      { year: "2012", description: "MSC.327(90) – itfaiyeci teçhizatı performans standartları" },
      { year: "2016", description: "MSC.403(96) – yangın algılama sistemi test prosedürleri güncellendi" },
    ],
    keyArticles: [
      { id: "Chapter 2-3", title: "Yangın Ana Hattı ve Taşınabilir Söndürücüler", summary: "Yangın suyu ana hattı, hidrant ve taşınabilir söndürücü gereklilikleri." },
      { id: "Chapter 5", title: "Sabit CO₂ Sistemi", summary: "CO₂ söndürme sistemi tasarım, hesaplama ve alarm gereklilikleri." },
      { id: "Chapter 7", title: "Sprinkler Sistemi", summary: "Otomatik sprinkler tasarım, kapasite ve test gereklilikleri." },
      { id: "Chapter 9", title: "Yangın Algılama ve Alarm", summary: "Algılama panelleri, dedektör tipleri ve zone düzenleme kuralları." },
      { id: "Chapter 14", title: "Sabit Köpük Sistemi", summary: "Makine dairesi ve kargo alanları köpük söndürme sistemleri." },
    ],
    penalties: [
      "Yangın güvenlik sistemlerinde ciddi eksiklikte geminin alıkonması",
      "CO₂ sistemi şarj eksikliğinde sertifika askıya alınması",
      "Yangın kapısı ve damper test eksikliğinde PSC eksikliği",
    ],
    detailedSections: [
      {
        heading: "Yangınla mücadelenin teknik standardı",
        body:
          "FSS Code, SOLAS Chapter II-2'nin 'yangınla nasıl savaşılır' sorusuna verdiği teknik cevaptır. Gemideki bir yangın, karadan yardım gelmesi imkânsız olduğu için ilk dakikalardan itibaren gemi kaynaklarıyla kontrol altına alınmak zorundadır; bu yüzden söndürme, algılama ve alarm sistemlerinin tasarımı, performansı ve hazır bulunma durumu hayati önemdedir. Kod, her sistemin nasıl boyutlandırılacağını, nereye yerleştirileceğini, nasıl test edileceğini ve bakımının nasıl yapılacağını standartlaştırır. Böylece geminin pasif koruması (yapısal yangın bölmeleri) ile aktif koruması (söndürme sistemleri) birbirini tamamlayan bir savunma kurar.",
      },
      {
        heading: "Söndürme, algılama ve alarm sistemleri",
        body:
          "FSS Code çeşitli söndürme yöntemlerini farklı mahaller için düzenler: makine dairesi gibi yüksek riskli kapalı alanlar için sabit CO₂ veya köpük sistemleri (boğma prensibi), yaşam mahalleri için otomatik sprinkler ve su sisi sistemleri, kargo alanları için güverte köpük monitörleri kullanılır. CO₂ gibi boğucu sistemlerde, insanların tahliyesi için sesli/görsel uyarı ve zaman gecikmesi zorunludur. Algılama tarafında duman ve ısı dedektörleri zonlar ve loop'lar halinde düzenlenir; bir yangının yeri köprüüstündeki panelden anında görülebilir. Manuel alarm noktaları, otomatik sistem yetişmeden insan müdahalesini başlatır.",
      },
      {
        heading: "Yangın bütünlüğü, teçhizat ve bakım",
        body:
          "Aktif söndürme kadar yangının yayılmasını sınırlamak da önemlidir. Yangın kapıları, damperler ve bölme sınıfları (A-60'tan A-0'a, B-15, B-0) bir mahalde çıkan yangının belirli süre boyunca komşu mahallere geçmesini engeller; bu sayede tahliye ve müdahale için zaman kazanılır. İtfaiyeci teçhizatı (SCBA solunum cihazı, ısıya dayanıklı elbise, yaşam hattı) ekibin yangına yaklaşabilmesini sağlar. Tüm bu sistemler ancak düzenli testle güvenilir kalır: CO₂ tüplerinin ağırlık kontrolü, alarm panellerinin haftalık testi, yangın kapısı ve damper fonksiyon kontrolleri, SCBA tüplerinin basınç testleri ihmal edilemez. Şarjı eksik bir CO₂ sistemi veya test edilmemiş bir alarm, PSC denetiminde ciddi eksiklik ve alıkoyma doğurur.",
      },
    ],
    relatedSlugs: ["solas", "safety-equipment-cert", "safety-construction-cert"],
    resources: [{ label: "FSS Code", href: "https://www.imo.org/en/OurWork/Safety/Pages/FireProtection.aspx" }],
  },
  {
    slug: "css-code",
    label: "CSS Code – Yüklerin Bağlanması",
    category: "Emniyet Kodları",
    overview: "Kargonun güvenli istiflenmesi, sabitlenmesi ve lashing düzenlemelerinin genel ilkelerini belirler; Cargo Securing Manual referansıdır.",
    history: "CSS Code (Code of Safe Practice for Cargo Stowage and Securing) ilk olarak IMO Assembly Resolution A.714(17) ile kabul edilmiştir. 2002'de MSC/Circ.1026 ile güncellenen ek standartlar, lashing kuvvet hesaplamaları ve konteyner bağlama detaylarını içerir. SOLAS Chapter VI ve VII'ye referans oluşturur.",
    applicability: [
      "Dökme olmayan yük taşıyan tüm gemiler",
      "Konteyner, araç, ağır yük, kereste ve proje kargoları",
      "Ro-Ro gemileri dahil",
    ],
    essentials: [
      "Cargo Securing Manual (CSM) gereklilikleri – gemi tipine ve yük türüne özgü",
      "Lashing malzeme standartları ve MSL (Maximum Securing Load) hesapları",
      "Konteyner bağlama düzenleri: twistlock, bridge fitting, lashing bar, stacking cone",
      "Araç bağlama: chain lashing, webbing strap, wheel chock gereklilikleri",
      "Kuvvet hesaplamaları: rüzgar, dalga ve geminin hareketi etkisi",
      "Acceleration ve tip-over/sliding analizi (Ek 13 hesaplama yöntemi)",
      "Ağır yük bağlama: özel analiz ve klas onayı gerekliliği",
    ],
    actions: [
      "CSM prosedürlerini yükleme planıyla eşleştir",
      "Lashing ekipmanının bakım ve muayene kayıtlarını tut",
      "Kötü hava koşullarında ek bağlama önlemlerini uygula",
      "Hasarlı lashing ekipmanını kullanım dışı bırak ve yenile",
      "Yükleme sırasında lashing düzenini fotoğrafla belgele",
      "Seyir sırasında lashing kontrolünü periyodik yap (özellikle ağır havada)",
    ],
    amendments: [
      { year: "2002", description: "MSC/Circ.1026 – lashing kuvvet hesaplama yöntemlerinin güncellenmesi" },
      { year: "2010", description: "CTU Code ile koordinasyon ve konteyner paketleme standartları" },
      { year: "2015", description: "Ağır yük bağlama için ek kılavuzlar ve hesaplama araçları" },
    ],
    keyArticles: [
      { id: "Ek 1", title: "Güvenli İstifleme İlkeleri", summary: "Yük yerleştirme, istif ve genel bağlama prensipleri." },
      { id: "Ek 12", title: "Konteyner Bağlama", summary: "Konteyner gemilerinde istif ve bağlama düzenleri." },
      { id: "Ek 13", title: "Kuvvet Hesaplama Yöntemi", summary: "Lashing kuvveti hesaplama formülleri, sürtünme katsayıları ve güvenlik faktörleri." },
      { id: "Ek 14", title: "Araç Bağlama", summary: "Ro-Ro gemilerinde araç bağlama gereklilikleri ve lashing düzenleri." },
    ],
    penalties: [
      "CSM eksikliği veya uygulanmaması PSC eksikliği sebebi",
      "Lashing yetersizliği nedeniyle kargo kayması ve geminin alıkonması",
      "Kargo hasar tazminat davaları ve P&I sorumluluk",
    ],
    detailedSections: [
      {
        heading: "Hareketli denizde yükü yerinde tutmak",
        body:
          "CSS Code, denizin asla durağan olmadığı gerçeğinden doğar. Gemi yalpalar, baş-kıç vurur, savrulur; bu hareketler yükün üzerine geminin kendi ağırlığının katları kadar atalet kuvveti bindirir. Yeterince sabitlenmemiş bir yük kayar, devrilir veya denize düşer; bu hem mürettebat için ölümcül hem de geminin stabilitesi için yıkıcı olabilir. Kod, yükün güvenli istiflenmesi ve bağlanması (lashing) için genel ilkeleri ve hesaplama yöntemlerini belirler. Her gemi, kendi tipine ve taşıdığı yük türlerine özgü bir Cargo Securing Manual (CSM) taşımak ve uygulamak zorundadır.",
      },
      {
        heading: "Kuvvet hesabı ve bağlama ekipmanı",
        body:
          "Doğru bağlama bir tahmin işi değil, mühendislik hesabıdır. Kodun Ek 13'ü, yüke etki eden boyuna, enine ve düşey kuvvetleri (geminin ivmesi, rüzgâr ve dalga etkisiyle) hesaplamayı ve bunlara karşı koyacak bağlama düzenini tasarlamayı öğretir. Her bağlama elemanının bir Maximum Securing Load (MSL) değeri vardır ve toplam bağlama kapasitesi beklenen kuvvetleri güvenlik payıyla aşmalıdır. Konteynerler twistlock, köprü bağlantısı ve lashing bar'larla; araçlar zincir lashing, web kayış ve takoz'larla sabitlenir. Hasarlı veya aşınmış ekipman kullanım dışı bırakılır, çünkü zincirin en zayıf halkası tüm sistemi belirler.",
      },
      {
        heading: "Operasyonel uygulama ve sorumluluk",
        body:
          "CSS uyumu kâğıt üstünde bitmez; yükleme sırasında bağlama düzeni CSM ile eşleştirilir, fotoğraflarla belgelenir ve seyir boyunca özellikle kötü havada periyodik kontrol edilir. Ağır hava beklendiğinde ek bağlama önlemleri alınır. Ağır ve proje yüklerinin bağlanması özel analiz ve klas onayı gerektirir. Bağlama yetersizliği yalnızca emniyet sorunu değil, ticari ve hukuki bir risktir: kargo kayması PSC alıkoymasına, kargo hasarı P&I sorumluluğuna ve tazminat davalarına yol açar. Kod, Ro-Ro araçlarından konteyner istiflerine kadar her yük tipi için bu disiplini zorunlu kılar.",
      },
    ],
    relatedSlugs: ["solas", "imsbc-code"],
    resources: [{ label: "CSS Code rehberi", href: "https://www.imo.org/en/OurWork/Safety/Pages/CSS-Code.aspx" }],
  },
  {
    slug: "grain-code",
    label: "Grain Code – Tahıl Taşıma Kuralları",
    category: "Emniyet Kodları",
    overview: "Dökme tahıl taşımacılığında stabilite hesapları, serbest yüzey etkisi ve istif gerekliliklerini düzenler.",
    history: "SOLAS Chapter VI ile referanslanan International Grain Code, tahıl yükünün kaymasından kaynaklanan stabilite tehlikelerini ele alır. 1991'de kabul edilen mevcut versiyonu, tahılın serbest yüzey etkisini minimize etmek için hesaplama yöntemleri ve istif gereklilikleri belirler. Document of Authorization belgesi geminin tahıl taşıma yetkinliğini onaylar.",
    applicability: [
      "Dökme tahıl taşıyan tüm gemiler (uluslararası sefer)",
      "Tahıl tanımı: buğday, mısır, arpa, çavdar, pirinç, yulaf ve benzeri",
      "Partially filled (kısmen dolu) ve filled (tam dolu) ambar koşulları",
    ],
    essentials: [
      "Tahıl kaymaya karşı stabilite kriterleri: θ < 12° (veya güverte kenarı batma açısı), residual dinamik stabilite ≥ 0.075 m-rad",
      "Serbest yüzey düzeltmesi ve heeling moment hesabı – volumetrik kaydırma yöntemi",
      "Feeding ve overstowing gereklilikleri – boşluk oranı sınırlaması",
      "Tahıl loading booklet ve Document of Authorization",
      "Shifting board ve longitudinal division kullanımı",
      "Strapping ve bundling yöntemleri (tahıl kaymasını önleme)",
      "Tahıl stabilite hesaplarında GM minimum gereklilikleri",
    ],
    actions: [
      "Grain stability hesaplamalarını yükleme öncesi doğrula",
      "Document of Authorization belgesi geçerliliğini kontrol et",
      "Feeding düzenlemelerini ambar koşullarına göre planla",
      "Trimming'i mümkün olduğunca düzgün yap (kısmen dolu ambar riski)",
      "Ambar havalandırmasını tahıl nemlenme riskine göre kontrol et",
      "Loading booklet hesaplamalarını bağımsız olarak doğrula",
    ],
    amendments: [
      { year: "1991", description: "Mevcut International Grain Code kabulü (A.264(VIII) yerine)" },
      { year: "2009", description: "MSC.23(59) – tahıl stabilite hesaplama yöntemi güncellemeleri" },
    ],
    keyArticles: [
      { id: "Part A", title: "Genel Gereklilikler", summary: "Tanımlar, uygulama kapsamı, trimming ve feeding gereklilikleri." },
      { id: "Part B", title: "Stabilite Hesabı", summary: "Volumetrik heeling moment, stabilite kriterleri ve hesaplama yöntemleri." },
      { id: "Part C", title: "Document of Authorization", summary: "Geminin tahıl taşıma yetkinlik belgesi düzenleme ve geçerlilik koşulları." },
    ],
    penalties: [
      "Document of Authorization eksik gemilerin tahıl yüklemesi yapamaması",
      "Tahıl stabilite kriterlerini karşılamayan yükleme planlarının reddedilmesi",
      "Tahıl kayması nedeniyle oluşan kazalarda cezai sorumluluk",
    ],
    detailedSections: [
      {
        heading: "Tahılın akışkan davranışı ve stabilite riski",
        body:
          "Grain Code, dökme tahılın kendine özgü bir tehlikesini ele alır: tahıl, akışkan bir madde gibi davranır ve gemi meyil yaptığında ambar içinde bir tarafa kayar. Yüklemeden sonra tahıl bir miktar oturur ve üstte boşluk bırakır; gemi yalpaladığında bu boşluğa doğru kayan tahıl, ağırlık merkezini bir tarafa taşır ve geminin o tarafa kalıcı bir meyil almasına yol açar. Bu meyil dengeyi bozar ve üst üste binen yalpalarda alabora riskine kadar gidebilir. Kod, bu kayma momentini hesaplamayı ve geminin yine de yeterli stabiliteye sahip olmasını güvence altına almayı amaçlar.",
      },
      {
        heading: "Stabilite kriterleri ve hesaplama",
        body:
          "Kodun teknik özü, tahıl kaymasından doğan meyil momentinin (heeling moment) hesaplanması ve buna karşı geminin stabilite rezervinin yeterli olduğunun kanıtlanmasıdır. Belirli sayısal eşikler vardır: kaymadan doğan meyil açısı belirli bir sınırı (yaklaşık 12° veya güverte kenarının suya girme açısı, hangisi küçükse) aşmamalı ve kalan dinamik stabilite alanı asgari bir değerin (0,075 m·rad) altına düşmemelidir. Hesap, kısmen dolu ve tam dolu ambarlar için farklı boşluk varsayımlarıyla yapılır. Gemi, bu hesapları içeren onaylı bir grain loading booklet ve tahıl taşıma yetkinliğini gösteren Document of Authorization taşımak zorundadır.",
      },
      {
        heading: "Kaymayı önleyen fiziksel önlemler",
        body:
          "Hesabın yanı sıra fiziksel önlemler de tahıl kaymasını azaltır. Ambar ortasına yerleştirilen boyuna bölmeler (shifting board / longitudinal division) tahılın bir taraftan diğerine geçmesini engeller. Üst yüzeyin düzgün trim edilmesi ve boşlukların doldurulması (feeding, overstowing) kayma momentini azaltır; ağ ve bağlama (strapping, bundling) yöntemleriyle üst tabaka sabitlenir. Yükleme öncesi stabilite hesabı doğrulanmadan ve Document of Authorization geçerli olmadan tahıl yüklemesi yapılamaz. Bu yönüyle Grain Code, IMSBC Code'dan ayrı tutulan ancak onunla aynı 'dökme yükü kontrol altında tutma' felsefesini paylaşan özel bir rejimdir.",
      },
    ],
    relatedSlugs: ["solas", "imsbc-code"],
    resources: [{ label: "Grain Code", href: "https://www.imo.org/en/OurWork/Safety/Pages/Grain.aspx" }],
  },
  {
    slug: "iamsar",
    label: "IAMSAR – Arama Kurtarma Rehberi",
    category: "Emniyet Kodları",
    overview: "IMO/ICAO ortak arama kurtarma operasyon rehberi; arama şekilleri, koordinasyon ve gemiden yapılacak yardım prosedürlerini içerir.",
    history: "IAMSAR (International Aeronautical and Maritime Search and Rescue Manual), IMO ve ICAO tarafından ortaklaşa yayımlanan 3 ciltlik bir rehberdir. İlk olarak 1998'de MERSAR ve IMOSAR rehberlerinin birleştirilmesiyle oluşturulmuştur. Her 3 yılda güncellenir.",
    applicability: [
      "Tüm devlet SAR servisleri ve MRCC/RCC'ler",
      "Tüm ticaret gemileri (SOLAS V/33.1 kapsamında SAR yükümlülüğü)",
      "Havacılık ve denizcilik SAR operasyonlarında koordinasyon birimi olarak kullanılır",
    ],
    essentials: [
      "Cilt I: Organizasyon ve Yönetim – SAR servisleri kurulumu, SRR belirleme",
      "Cilt II: Misyon Koordinasyonu – MRCC/RCC operasyonları, kaynak yönetimi, plan hazırlama",
      "Cilt III: Mobil Vasıtalar – gemi kaptanı sorumlulukları, arama ve kurtarma prosedürleri",
      "Arama şekilleri: expanding square, sector search, parallel track, creeping line ahead",
      "OSC (On-Scene Coordinator) görev ve sorumlulukları",
      "MERSAR tablosu: sinyal ve haberleşme kodları",
      "MOB manevraları: Williamson turn, Anderson turn, Scharnow turn",
      "Datum hesaplama: akıntı ve rüzgar etkisiyle olası konum tahmini",
    ],
    actions: [
      "IAMSAR Cilt III'ü köprüüstünde erişilebilir tut ve güncel versiyonu doğrula",
      "SAR haberleşme formatlarını GMDSS tatbikatlarına entegre et",
      "Arama şekillerini harita üzerinde mürettebatla prova et",
      "MOB manevralarını (Williamson, Anderson, Scharnow) düzenli tatbikat et",
      "Datum hesaplama yöntemlerini seyir ekibine öğret",
    ],
    amendments: [
      { year: "1998", description: "IAMSAR Manual ilk baskısı (MERSAR ve IMOSAR birleştirmesi)" },
      { year: "2010", description: "Toplu kurtarma operasyonları ve büyük ölçekli göç olayları prosedürleri" },
      { year: "2016", description: "Güncellenmiş arama şekilleri ve dijital araçlar entegrasyonu" },
      { year: "2022", description: "AIS-SART ve PLB (Personal Locator Beacon) entegrasyonu" },
    ],
    keyArticles: [
      { id: "Cilt I", title: "Organizasyon ve Yönetim", summary: "SAR sisteminin kurulması, SRR tanımlama ve uluslararası işbirliği çerçevesi." },
      { id: "Cilt II", title: "Misyon Koordinasyonu", summary: "RCC/MRCC operasyonları, arama planlaması ve kaynak tahsisi." },
      { id: "Cilt III Ch.1", title: "Genel Prosedürler", summary: "Gemi kaptanının SAR durumunda sorumlulukları ve başlangıç eylemleri." },
      { id: "Cilt III Ch.3", title: "Arama Şekilleri", summary: "Expanding square, sector, parallel track ve creeping line arama modelleri." },
      { id: "Cilt III Ch.4", title: "Kurtarma", summary: "Kurtarma operasyonları, hayatta kalan bakımı ve tıbbi yardım prosedürleri." },
    ],
    penalties: [
      "SAR durumunda kaptanın yardım yükümlülüğünü yerine getirmemesi cezai suç",
      "SOLAS V/33.1 ihlalinde bayrak devleti soruşturması",
    ],
    detailedSections: [
      {
        heading: "SAR sözleşmesinin uygulama el kitabı",
        body:
          "IAMSAR, SAR Sözleşmesinin soyut yükümlülüklerini sahada uygulanabilir prosedürlere çeviren ortak IMO/ICAO rehberidir. 'Aeronautical and Maritime' adındaki ikilik anlamlıdır: arama kurtarma operasyonları çoğu zaman hem hava hem deniz vasıtalarını içerir ve bu rehber ikisini ortak bir dilde koordine eder. Üç ciltten oluşur ve her cilt farklı bir aktöre hitap eder: Cilt I devletlere ve sistem kurucularına, Cilt II kurtarma koordinasyon merkezlerine, Cilt III ise doğrudan olay yerindeki gemilere ve hava araçlarına yöneliktir. Bu yüzden bir ticaret gemisi için en kritik olan Cilt III'tür.",
      },
      {
        heading: "Arama şekilleri ve datum hesabı",
        body:
          "Denizde bir kişiyi veya cismi bulmak rastgele dolaşmakla değil, sistematik arama şekilleriyle yapılır. IAMSAR; genişleyen kare (expanding square), sektör araması (sector search), paralel tarama (parallel track) ve sürünen hat (creeping line) gibi standart modelleri tanımlar; her biri farklı belirsizlik ve alan koşuluna uygundur. Aramanın başlangıç noktası 'datum' ise sabit değildir: kazazede veya cismin akıntı ve rüzgârla sürüklendiği dikkate alınarak olası güncel konum hesaplanır. Olay yerinde birden fazla vasıta varsa bir On-Scene Coordinator (OSC) atanır ve aramayı koordine eder.",
      },
      {
        heading: "Gemiden yapılacak ilk müdahale",
        body:
          "Bir tehlike çağrısına en hızlı yanıtı genellikle yakındaki ticaret gemisi verir; bu yüzden IAMSAR Cilt III köprüüstünde erişilebilir tutulur. Adam denize düştüğünde kullanılan standart dönüş manevraları (Williamson, Anderson, Scharnow) hem kazazedeye geri dönmeyi hem de onu kaybetmemeyi sağlar; her birinin farklı görüş ve zaman koşullarına uygunluğu vardır ve düzenli tatbik edilmelidir. Rehber ayrıca SAR haberleşme formatlarını GMDSS ile, AIS-SART ve PLB gibi modern konum cihazlarını arama planıyla entegre eder. Kaptanın tehlikedeki kişilere yardım yükümlülüğü SOLAS V/33 ile bağlayıcıdır; IAMSAR bu yükümlülüğün nasıl etkili biçimde yerine getirileceğinin pratik rehberidir.",
      },
    ],
    relatedSlugs: ["sar-convention", "solas"],
    resources: [{ label: "IAMSAR bilgi", href: "https://www.imo.org/en/OurWork/Safety/Pages/IAMSARManual.aspx" }],
  },
  {
    slug: "isgott",
    label: "ISGOTT – Petrol Tankeri ve Terminal Emniyet Rehberi",
    category: "Emniyet Kodları",
    overview:
      "Petrol ve ürün tankerleri ile bunlara hizmet veren terminallerde güvenli operasyonun endüstri standardı kabul edilen rehberi; gemi-sahil arayüzü, statik elektrik, gaz tehlikeleri, kargo/bunker operasyonları ve yangın önlemeyi kapsar.",
    history:
      "ISGOTT (International Safety Guide for Oil Tankers and Terminals), OCIMF (Oil Companies International Marine Forum), ICS (International Chamber of Shipping) ve IAPH (International Association of Ports and Harbors) tarafından ortaklaşa yayımlanır. Kökeni 1970'lerdeki Tanker Safety Guide ve terminal güvenlik kılavuzlarının birleştirilmesine dayanır. Zorunlu bir IMO sözleşmesi değil, fakat fiilen küresel standart kabul edilen bir endüstri rehberidir; SOLAS, MARPOL ve IGS Code gibi düzenlemeleri pratik operasyona çevirir. En güncel baskı, 2020'de yayımlanan 6. Edisyon'dur (ISGOTT 6); insan faktörü, gemi-sahil iletişimi ve güncellenmiş Ship-Shore Safety Checklist (SSSCL) yaklaşımıyla öne çıkar.",
    applicability: [
      "Ham petrol ve petrol ürünleri taşıyan tüm tankerler",
      "Tankerlere hizmet veren petrol terminalleri ve iskeleler",
      "Bunker barçları ve bunkering operasyonları (transfer güvenlik prensipleri)",
      "Gemi-sahil ve gemi-gemi (STS) transfer operasyonları",
      "Vetting (SIRE) denetimlerinde fiili referans standardı",
    ],
    essentials: [
      "Gemi-sahil arayüzü (ship-shore interface) güvenliği ve Ship-Shore Safety Checklist (SSSCL)",
      "Statik elektrik tehlikeleri ve kontrolü (bonding, yükleme hızı sınırları, splash filling önlenmesi)",
      "Petrol buharı/gaz tehlikeleri: parlama noktası, LEL/UEL, flammable range, gas freeing ve tank atmosferi yönetimi",
      "İnert gaz sistemi ile entegrasyon (oksijen < %8, pozitif basınç)",
      "Kapalı/sınırlı mahal girişi (enclosed space entry) prosedürleri ve atmosfer testi",
      "Sıcak çalışma (hot work) izin sistemi ve güvenli iş izinleri (work permit)",
      "Kargo operasyonları: pre-transfer toplantısı, debi (rate) ve maksimum basınç, topping-up, ESD (Emergency Shut Down)",
      "Bunkering güvenliği ve dökülme (spill) önleme – SOPEP ile bağ",
      "Halatlama/bağlama (mooring) emniyeti, snap-back zonları ve halat yönetimi",
      "Yangın önleme, elektrik güvenliği ve manifold/hortum bağlantı güvenliği",
    ],
    actions: [
      "Berthing sonrası Ship-Shore Safety Checklist'i terminal ile birlikte doldur ve her vardiya teyit et",
      "Transfer öncesi pre-transfer toplantısı yap: başlangıç/maks debi, topping-up debisi, haberleşme, ESD sinyali, max basınç",
      "Tank atmosferini ve inert gaz oksijen seviyesini sürekli izle ve kaydet",
      "Statik elektrik önlemlerini uygula: başlangıçta düşük debi, splash filling'den kaçınma, bonding",
      "Kapalı mahal girişinde atmosfer testi (O₂, hidrokarbon, toksik gaz) yap ve giriş iznini düzenle",
      "Sıcak çalışma için risk değerlendirmesi ve work permit sistemi uygula",
      "Manifold ve hortum bağlantılarında kaçak/overflow izlemesini sürekli yap; tek damla dökülmede SOPEP'i devreye al",
      "Mooring sırasında snap-back zonlarını işaretle ve personeli bu bölgelerden uzak tut",
    ],
    amendments: [
      { year: "1978", description: "İlk ISGOTT baskısı – Tanker Safety Guide ve terminal kılavuzlarının birleştirilmesi" },
      { year: "2006", description: "ISGOTT 5. Edisyon yayımlandı" },
      { year: "2020", description: "ISGOTT 6. Edisyon – insan faktörü, gemi-sahil iletişimi ve yeni Ship-Shore Safety Checklist yaklaşımı" },
      { year: "2024", description: "Ek kılavuzlar: alternatif yakıt ve dekarbonizasyon kaynaklı operasyonel riskler tartışmaları" },
    ],
    keyArticles: [
      { id: "Bölüm 1-2", title: "Genel Bilgiler ve Petrol Tehlikeleri", summary: "Petrol/buhar özellikleri, parlama noktası, flammable range, statik elektrik ve toksisite temelleri." },
      { id: "Bölüm 4-7", title: "Gemi ve Terminal Emniyeti", summary: "Atmosfer kontrolü, inert gaz, kapalı mahal girişi, sıcak çalışma ve elektrik güvenliği." },
      { id: "Bölüm 11-13", title: "Kargo ve Bunker Operasyonları", summary: "Yükleme/boşaltma planlaması, debi/basınç kontrolü, ESD ve bunkering güvenliği." },
      { id: "Ship-Shore Safety Checklist", title: "Gemi-Sahil Güvenlik Kontrol Listesi", summary: "Transfer öncesi ve sırasında gemi ile terminal arasında mutabık kalınan güvenlik koşullarının teyidi." },
    ],
    penalties: [
      "ISGOTT bir endüstri rehberi olduğundan doğrudan yasal ceza içermez; ancak fiili standart olduğu için uyumsuzluk ciddi sonuçlar doğurur",
      "Vetting (SIRE) denetiminde ISGOTT uygulamalarına uymama olumsuz gözlem ve ticari red sebebidir",
      "Terminallerin ISGOTT checklist'i tamamlanmadan transfere izin vermemesi (operasyon durur)",
      "ISGOTT prosedürlerinin ihmali kaynaklı yangın/patlama veya dökülmede cezai ve hukuki sorumluluk (SOLAS/MARPOL kapsamında)",
    ],
    detailedSections: [
      {
        heading: "Neden ISGOTT: regülasyonu operasyona çeviren rehber",
        body:
          "ISGOTT, zorunlu bir sözleşme değil, ama petrol tankeri ve terminal dünyasında fiilen uyulması beklenen 'altın standart'tır. SOLAS, MARPOL ve IGS Code gibi düzenlemeler ne yapılması gerektiğini söyler; ISGOTT ise bunu sahada nasıl güvenle yapacağını adım adım anlatır. Tankerlerde tehlike eşsiz biçimde yüksektir: yük hem yanıcı hem zehirli hem çevreye zararlıdır, operasyonun büyük kısmı gemi ile sahilin (veya başka bir geminin) ortak sorumluluğunda yürür ve tek bir hata felakete dönüşebilir. ISGOTT bu ortak sorumluluğu standartlaştırır; OCIMF, ICS ve IAPH'ın birlikte yayımlaması, hem gemi hem terminal tarafının aynı dili konuşmasını sağlar. Bu yüzden vetting denetimlerinde ISGOTT uygulamaları fiili referans olarak aranır.",
      },
      {
        heading: "Gemi-sahil arayüzü ve Ship-Shore Safety Checklist",
        body:
          "ISGOTT'un kalbi, gemi ile terminal arasındaki kritik arayüzün yönetimidir. Bir transfere başlamadan önce taraflar bir pre-transfer (pre-cargo) toplantısı yapar: başlangıç ve maksimum debi (pumping rate), topping-up sırasındaki düşük debi, kullanılacak haberleşme yöntemi (VHF kanalı ve yedeği), acil durdurma (ESD) sinyali, izin verilen maksimum manifold basıncı ve haberleşme kesilirse uygulanacak prosedür netleştirilir. Tüm güvenlik koşulları, gemi ve terminal temsilcisinin birlikte doldurup imzaladığı Ship-Shore Safety Checklist (SSSCL) ile teyit edilir. ISGOTT 6, bu listeyi bir 'kutu doldurma' formalitesi olmaktan çıkarıp, her maddenin gerçekten doğrulandığı ve belirli aralıklarla yeniden teyit edildiği bir süreç olarak yeniden tasarlamıştır.",
      },
      {
        heading: "Statik elektrik, gaz tehlikeleri ve tank atmosferi",
        body:
          "Petrol operasyonlarında tutuşma kaynaklarının en sinsisi statik elektriktir. Yüksek hızlı yükleme, sıçratmalı doldurma (splash filling) ve filtre/karışım gibi süreçler statik yük biriktirir; ISGOTT bu yüzden başlangıçta düşük debi, sıçramanın önlenmesi, ekipmanın topraklanması (bonding) ve belirli bekleme süreleri gibi önlemleri tanımlar. Gaz tehlikesi ise yük buharının havayla karışımının yanıcı aralıkta (LEL ile UEL arasında) olmasından doğar. ISGOTT, tank atmosferini bu tehlikeli aralığın dışında tutmayı hedefler: en yaygın yöntem, inert gaz sistemiyle oksijeni yanmanın imkânsız olduğu seviyenin (genel kural %8) altına indirmek ve tankı pozitif basınçta tutmaktır. Petrol buharının aynı zamanda zehirli olduğu (özellikle H₂S ve benzen içeren yükler) ve oksijeni tükettiği de sürekli akılda tutulur.",
      },
      {
        heading: "Kapalı mahal girişi ve sıcak çalışma izinleri",
        body:
          "Tankerlerdeki ölümlü kazaların önemli bölümü kapalı/sınırlı mahallere (enclosed space) hazırlıksız girişten kaynaklanır; bu mahaller oksijensiz, zehirli veya yanıcı bir atmosfere sahip olabilir ve hiçbir uyarı vermez. ISGOTT, girişten önce atmosferin test edilmesini (yeterli oksijen, hidrokarbon ve toksik gazların güvenli sınırın altında olması), girişin yazılı bir izinle (entry permit) yapılmasını, sürekli havalandırma ve gözcü bulundurulmasını şart koşar. Benzer biçimde, kıvılcım veya ısı üreten her sıcak çalışma (hot work – kaynak, taşlama) ciddi bir tutuşma riskidir; ISGOTT bunu risk değerlendirmesine dayalı bir iş izni (work permit) sistemine bağlar: çalışma alanının gaz-free olması, yakındaki tankların durumu ve yangın söndürme hazırlığı önceden doğrulanır. Bu izin sistemleri, geminin ISM/SMS prosedürleriyle bütünleşir.",
      },
      {
        heading: "Kargo/bunker operasyonu, halatlama ve dökülme önleme",
        body:
          "Transfer sırasında ISGOTT, sürekli izleme kültürünü zorunlu kılar: manifold ve hortum bağlantılarında kaçak, taşma (overflow) ve damlama anbean gözlenir; debi ve basınç sınırların içinde tutulur; topping-up (tankı doldurmanın son aşaması) en dikkatli evredir ve düşük debiyle yapılır. Acil durumda transferi saniyeler içinde durduran ESD sistemi her zaman hazırdır. Tek damla petrolün denize dökülmesi bile SOPEP'i devreye sokar ve terminal/liman otoritesi anında bilgilendirilir. Bunkering de aynı prensiplere tabidir ve bunker güvenlik kontrol listesiyle yürütülür. Halatlama (mooring) ise ayrı bir fiziksel tehlikedir: gerilen bir halatın kopması, 'snap-back' bölgesinde duran personel için ölümcüldür; ISGOTT bu bölgelerin tanımlanmasını, işaretlenmesini ve halat yönetiminin güvenli yapılmasını düzenler. Böylece ISGOTT, tankerin yanaşmasından ayrılmasına kadar tüm operasyonel zinciri tek bir güvenlik çerçevesinde toplar.",
      },
    ],
    relatedSlugs: ["igs-code", "solas", "marpol", "ics-code", "vetting"],
    resources: [{ label: "OCIMF ISGOTT", href: "https://www.ocimf.org/publications/books/isgott-6" }],
  },
];
