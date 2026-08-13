import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "ISM/ISPS sisteminin gemideki uygulanması",
  roleSlug: "kaptan",
  taskIndex: 1,
  estimatedPages: 27,
  intro: `ISM Code (International Safety Management Code), güvenli gemi işletiminin sistematik çerçevesidir ve kaptan bu çerçevenin gemideki tek nihai uygulayıcısıdır. SMS (Safety Management System) prosedürleri, risk değerlendirmeleri, near-miss raporları, iç denetim bulguları ve düzeltici aksiyonların tamamı kaptanın gözetimindedir. ISPS Code kapsamında ise gemi güvenlik planının (SSP) uygulanması, güvenlik seviyesi (MARSEC) değişikliklerinin yönetilmesi ve SSO/CSO/PFSO ile koordinasyon kaptanın sorumluluğundadır. Bu bölüm, ISM ve ISPS sistemlerinin gemideki günlük uygulanmasını; DOC/SMC sertifikasyonundan major non-conformity yönetimine, MARSEC seviye geçişlerinden SSAS aktivasyonuna kadar somut prosedürlerle ele alır.`,
  sources: [
    "ISM Code (IMO Resolution A.741(18) ve MSC değişiklikleri; SOLAS Chapter IX)",
    "ISPS Code (SOLAS Chapter XI-2; IMO 2002 Diplomatic Conference)",
    "SOLAS Chapter XI-1 — Special Measures to Enhance Maritime Safety",
    "IMO Resolution A.1118(30) — Survey Guidelines under HSSC",
    "MSC/Circ.1059 & MSC-MEPC.7/Circ.7 — Guidance on Near-Miss Reporting",
    "IMO MSC.1/Circ.1525 — Guidance on Ship Security Alert Systems (SSAS)",
    "ISO 9001 / TMSA 3 (Tanker Management and Self Assessment)",
    "Guidelines on the IMO ISM Code (Witherby / ICS)",
  ],
  chapters: [
    {
      heading: "1. ISM Code: Yapı ve Sertifikasyon Mimarisi",
      lead: `ISM Code, SOLAS Chapter IX altında zorunlu hale gelmiş ve geminin güvenli işletiminin "yazılı, denetlenebilir ve sürekli iyileşen" bir sisteme bağlanmasını sağlamıştır. Kaptan bu sistemin gemi ayağındaki tepe noktasıdır.`,
      sections: [
        {
          subheading: "1.1 ISM Code'un 16 fonksiyonel maddesi",
          paragraphs: [
            `ISM Code 16 madde üzerine kuruludur; bunlar şirket politikası (madde 2), şirket sorumlulukları (madde 3), Designated Person Ashore — DPA (madde 4), kaptanın sorumluluk ve yetkisi (madde 5), kaynaklar ve personel (madde 6), gemi operasyonları için plan geliştirme (madde 7), acil durum hazırlığı (madde 8), uygunsuzluk/kaza/tehlikeli olay raporlama (madde 9), bakım (madde 10), dokümantasyon (madde 11) ve şirket doğrulama/gözden geçirme/değerlendirme (madde 12) gibi başlıkları kapsar. Kaptan için madde 5 (Master's Responsibility and Authority) ve madde 9 (raporlama) günlük pratiğin omurgasıdır.`,
            `Madde 5, şirket SMS'inde kaptanın görevlerinin açıkça tanımlanmasını, kaptana SMS'i sahada uygulama ve sapmaları şirkete raporlama yetkisi verilmesini ve "overriding authority"nin yazılı olarak teyit edilmesini şart koşar. Yani şirket, kaptana emniyet ve çevre korumayı her türlü ticari değerlendirmenin üzerinde tutma yetkisini açıkça vermek zorundadır. Bu yazılı teyit, iç ve dış denetimlerde aranan ilk kanıtlardandır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Code 5.2 — Overriding Authority",
              text: `Şirket, SMS içinde kaptanın emniyet ve kirliliğin önlenmesi konusunda gerekli her kararı alma ve gerektiğinde şirketten yardım isteme yetkisine sahip olduğunu açıkça belirtmek zorundadır. Bu yetki hiçbir ticari baskı tarafından sınırlandırılamaz.`,
            },
          ],
        },
        {
          subheading: "1.2 DOC ve SMC: İki sertifikanın ayrımı",
          paragraphs: [
            `Document of Compliance (DOC) şirkete verilir ve şirketin işlettiği gemi tiplerini (bulk, oil tanker, chemical tanker, gas carrier, container, passenger vb.) kapsar. Safety Management Certificate (SMC) ise gemiye verilir ve geminin şirket SMS'ine uygun işletildiğini gösterir. Geminin DOC'un kopyasını taşıması zorunludur; çünkü SMC ancak geçerli bir DOC'a dayanır. Kaptan, DOC üzerinde geminin tipinin listelenmiş olduğunu mutlaka doğrular; aksi halde SMC geçersiz sayılabilir.`,
            `DOC 5 yıl geçerlidir ve yıllık doğrulamaya (annual verification, ±3 ay penceresi) tabidir. SMC de 5 yıl geçerlidir ancak ara doğrulama (intermediate verification) DOC'taki 2. ve 3. yıldönümleri arasında yapılır. Kaptan bu pencereleri takip eder; sertifika doğrulama gecikmesi PSC (Port State Control) denetiminde detention sebebidir. Geçici sertifikalar (Interim DOC/SMC) yeni gemi teslimi veya şirket değişimi gibi durumlarda 6 ay (uzatmayla 12 ay) süreyle verilir.`,
          ],
          table: {
            caption: `ISM Sertifikaları — Geçerlilik ve Doğrulama Takvimi`,
            headers: ["Sertifika", "Kime", "Geçerlilik", "Doğrulama", "Pencere"],
            rows: [
              ["DOC", "Şirket", "5 yıl", "Yıllık (annual)", "Yıldönümü ±3 ay"],
              ["SMC", "Gemi", "5 yıl", "Ara (intermediate)", "2.-3. yıl arası"],
              ["Interim DOC", "Yeni şirket", "12 ay (max)", "—", "İlk teslim"],
              ["Interim SMC", "Yeni gemi", "6 ay (+6)", "—", "Devreye alma"],
            ],
          },
        },
        {
          subheading: "1.3 SMS'in gemideki yansıması — el kitabı ve prosedürler",
          paragraphs: [
            `SMS, gemide somut olarak bir dizi el kitabı, kontrol listesi, form ve kayıt olarak yaşar: Safety Management Manual, kritik operasyon prosedürleri (enclosed space entry, hot work, mooring, bunkering, navigation), risk değerlendirme şablonları, permit-to-work sistemi ve kayıt arşivi. Kaptanın görevi bu dokümanların gemideki en güncel revizyonda olduğunu (controlled document register), eski revizyonların kullanımdan kaldırıldığını ve mürettebatın ilgili prosedürlere erişebildiğini teyit etmektir.`,
            `Kaptan, gemiye yeni katılan her personel için familiarization (alıştırma) sürecinin SMS'e uygun yürütüldüğünü denetler; bu, ISM madde 6'nın doğrudan gereğidir. Familiarization tamamlanmadan kişi vardiyaya veya kritik operasyona atanamaz. Bu kontrol, özellikle yüksek mürettebat sirkülasyonu olan gemilerde PSC ve vetting denetiminin sık baktığı bir alandır.`,
          ],
        },
      ],
    },
    {
      heading: "2. SMS'in Sahada İşletilmesi: Risk, MOC ve Permit Sistemi",
      sections: [
        {
          subheading: "2.1 Risk değerlendirmesi (risk assessment) kültürü",
          paragraphs: [
            `Modern SMS, "her kritik ve rutin dışı operasyon öncesi yazılı risk değerlendirmesi" prensibine dayanır. Yaygın metodoloji 5x5 risk matrisidir: olasılık (1-5) çarpı şiddet (1-5) eşittir risk skoru. Yüksek skorlu (genelde >12) işler ya iptal edilir ya da ek bariyerlerle (kontrol önlemi) kabul edilebilir seviyeye indirilir. Kaptan, risk değerlendirme ekibinin doğru kişilerden oluştuğunu (işi fiilen yapacak kişiler dahil) ve "as low as reasonably practicable — ALARP" prensibinin gözetildiğini denetler.`,
            `Dinamik risk değerlendirmesi (dynamic risk assessment) ise sahada koşullar değiştiğinde (hava kötüleşti, ekipman arızalandı, ekip yoruldu) işin anında yeniden değerlendirilmesidir. Toolbox talk (iş öncesi kısa brifing) bunun pratik aracıdır. Kaptan, "stop work authority"nin (işi durdurma yetkisi) tüm mürettebata tanındığını ve bu yetkiyi kullanan kişinin cezalandırılmayacağını açıkça kuran bir adil kültür (just culture) inşa eder.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Toolbox talk pratiği",
              text: `Etkili bir toolbox talk 5 dakikadan kısadır: ne yapılacak, kim ne yapacak, en büyük 3 risk, acil durumda ne yapılır. Soyut "dikkatli olun" yerine somut "valf X kapalı olduğunu teyit et" tarzı talimat verilir.`,
            },
          ],
        },
        {
          subheading: "2.2 Management of Change (MOC)",
          paragraphs: [
            `Management of Change (Değişim Yönetimi), gemideki herhangi bir kalıcı veya geçici değişikliğin (ekipman, prosedür, personel kompozisyonu, yazılım, yapısal) kontrollü biçimde değerlendirilmesini sağlar. Örneğin bir kritik vananın tipi değiştirilecekse, bir prosedür bypass edilecekse veya tecrübeli bir zabit yerine yeni biri geçecekse MOC süreci tetiklenir. Amaç, "küçük görünen" bir değişikliğin gizli riskler doğurmasını engellemektir.`,
            `MOC formu; değişikliğin tanımı, gerekçesi, risk değerlendirmesi, gerekli onaylar (kaptan ve genelde şirket/DPA), uygulama adımları ve değişiklik sonrası gözden geçirmeyi içerir. TMSA 3 (tankerler için OCIMF self-assessment) MOC'u açıkça bir performans göstergesi olarak ölçer. Kaptan, geçici bir çözümün (örn. arızalı ekipman için workaround) kalıcı bir norm haline gelmesini MOC disipliniyle önler.`,
          ],
        },
        {
          subheading: "2.3 Permit-to-Work ve kritik operasyonlar",
          paragraphs: [
            `Permit-to-Work (PTW) sistemi; enclosed space entry, hot work (kaynak/taşlama), aloft work (yüksekte çalışma), overboard work, elektrik izolasyonu (LOTO — lock out tag out) gibi yüksek riskli işlerde zorunludur. İzin, işi yetkilendiren (genelde kaptan veya görevlendirdiği zabit), işi yapan ve doğrulayan kişilerin imzasını taşır; geçerlilik süresi sınırlıdır ve iş bitince kapatılır.`,
            `Enclosed space entry, denizcilikteki ölümcül kazaların başında gelir. SOLAS III/19.3.3, giriş veya kurtarma görevi bulunan personel için en az iki ayda bir enclosed space entry ve rescue drill'i zorunlu kılar. PTW öncesi atmosfer ölçümü (O2 %20.9, LEL %0, H2S/CO toleranslarda) yapılır, sürekli havalandırma sağlanır, standby personel ve resüsitasyon ekipmanı hazır tutulur. Kaptan, "test edilmeden hiçbir kapalı alana girilmez" kuralını taviz vermeden uygular.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kapalı alan — kurtarmaya koşma refleksi",
              text: `Kapalı alan ölümlerinin büyük kısmı, ilk kurbanı kurtarmaya plansızca atlayan ikinci ve üçüncü kişilerdir. PTW ve rescue plan olmadan kurtarmaya girilmez; bu, drill'lerde en çok vurgulanan davranıştır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. İç Denetim, Uygunsuzluk ve Düzeltici Aksiyon",
      lead: `ISM'in "kendi kendini düzelten sistem" olma özelliği, iç denetimler ve uygunsuzluk yönetimiyle hayata geçer. Kaptan hem denetlenen hem de gemi içi denetim kültürünün sahibidir.`,
      sections: [
        {
          subheading: "3.1 İç denetimler (internal audits)",
          paragraphs: [
            `ISM madde 12, şirketin SMS'i en az yılda bir kez iç denetimle doğrulamasını şart koşar. Bu denetimler, denetlenecek alandan bağımsız (eğitimli) iç denetçilerce yapılır. Kaptan, gemi tarafında denetim için kayıtların hazır, prosedürlerin uygulanmış ve ekibin sorulara cevap verebilir olmasını sağlar. İç denetim, "ceza" değil "iyileştirme" aracı olarak konumlandırılmalıdır; aksi halde bulgular gizlenir ve sistem kör kalır.`,
            `Denetim bulguları üç kategoriye ayrılır: gözlem (observation), uygunsuzluk (non-conformity — NC) ve majör uygunsuzluk (major non-conformity — Major NC). Her bulgu için kök neden analizi (root cause analysis — örn. 5 Why, fishbone diyagramı) yapılır ve düzeltici aksiyon (corrective action) ile önleyici aksiyon (preventive action) tanımlanır. Yüzeysel "personel uyarıldı" tipi kapatmalar, denetçi tarafından reddedilir.`,
          ],
        },
        {
          subheading: "3.2 NC ve Major NC ayrımı",
          paragraphs: [
            `Uygunsuzluk (NC), SMS'in bir gerekliliğinin yerine getirilmediği gözlenen durumdur (örn. bir drill kaydının eksik olması). Majör uygunsuzluk ise emniyete veya çevreye ciddi tehdit oluşturan, sistematik bir başarısızlığa işaret eden veya birden çok küçük NC'nin bir araya gelmesiyle oluşan ağır bulgudur (örn. acil durum ekipmanının çalışmaması, kritik prosedürün hiç uygulanmaması). Major NC, DOC veya SMC'nin geçerliliğini doğrudan tehlikeye atar.`,
            `Major NC, denetim bitmeden veya çok kısa sürede kapatılmak zorundadır; aksi halde sertifika askıya alınabilir ve gemi seferden men edilebilir. Kaptan, major NC durumunda derhal DPA'yı bilgilendirir, geçici (immediate containment) önlemi alır ve kalıcı düzeltici aksiyon planını belirlenen süre içinde uygular. PSC denetiminde ISM ile ilgili ciddi bir bulgu, "ISM-related detention" olarak işaretlenir ve şirketin tüm filosuna ek denetim baskısı getirir.`,
          ],
          table: {
            caption: `Bulgu Tipleri ve Yönetimi`,
            headers: ["Bulgu", "Tanım", "Kapatma Süresi", "Sertifika Etkisi"],
            rows: [
              ["Observation", "İyileştirme fırsatı", "Sonraki denetime kadar", "Yok"],
              ["NC", "SMS gerekliliği karşılanmamış", "Genelde 3 ay", "Düzeltilmezse risk"],
              ["Major NC", "Ciddi/sistematik başarısızlık", "Acil / çok kısa", "DOC/SMC askıya alma"],
            ],
          },
        },
        {
          subheading: "3.3 Near-miss ve düzeltici aksiyon döngüsü",
          paragraphs: [
            `Near-miss (ramak kala olay), bir kazaya yol açabilecekken sonuç doğurmadan atlatılan olaydır. MSC-MEPC.7/Circ.7 near-miss raporlamasını teşvik eder; çünkü her ciddi kazanın altında onlarca near-miss ve yüzlerce güvensiz davranış yatar (Heinrich/Bird piramidi). Kaptan, mürettebatı near-miss bildirmeye teşvik eden, suçlamayan bir ortam kurar; yüksek near-miss raporu sayısı kötü değil, aksine sağlıklı bir güvenlik kültürünün işaretidir.`,
            `Düzeltici aksiyon döngüsü PDCA (Plan-Do-Check-Act) mantığıyla çalışır: olay bildirilir, kök neden bulunur, aksiyon tanımlanır, uygulanır ve etkinliği doğrulanır (effectiveness check). Etkinlik doğrulaması atlanırsa aynı olay tekrar eder. Kaptan, kapatılan aksiyonların gerçekten sorunu çözüp çözmediğini takip eden kişidir; bu takip kaydı (tracking log) denetimlerde incelenir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — Herald of Free Enterprise (1987)",
              text: `Baş kapısı açık halde sefere çıkan ro-ro feribot devrildi, 193 kişi öldü. Soruşturma, bireysel hatadan çok şirketin sistematik yönetim zafiyetini (kim kapıyı kontrol edecek belirsizdi) ortaya koydu ve modern ISM Code'un doğmasına doğrudan zemin hazırladı. Ders: emniyet, kişiye değil sisteme bağlanmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Acil Durum Hazırlığı ve Drill Yönetimi (ISM Madde 8)",
      sections: [
        {
          subheading: "4.1 Acil durum senaryoları ve müdahale planları",
          paragraphs: [
            `ISM madde 8, şirketin olası acil durumları (yangın, çatışma, karaya oturma, su alma, kirlilik, adam denize düşme, terkleştirme, grav arıza, güvenlik olayı vb.) tanımlamasını ve her biri için müdahale planı hazırlamasını şart koşar. Bu planlar gemide Emergency Response / Contingency Manual olarak bulunur ve kaptanın günlük olarak erişebileceği, ezbere bildiği belgelerdir. Her planda komuta yapısı, roller, iletişim akışı ve ilk müdahale adımları net olmalıdır.`,
            `Kaptan, müster listesinin (muster list — SOLAS III/8) güncel olduğunu, her mürettebat üyesinin acil durumdaki görevini (yangın ekibi, kurtarma ekibi, ilk yardım, can salı hazırlığı) bildiğini ve ekipman atamalarının (telsiz, EEBD, hortum) doğru olduğunu teyit eder. Mürettebat değiştiğinde müster listesi derhal güncellenir.`,
          ],
        },
        {
          subheading: "4.2 Drill ve eğitim frekansları",
          paragraphs: [
            `SOLAS, belirli drill'leri zorunlu frekanslarda yapmayı emreder: abandon ship ve fire drill her ay (SOLAS III/19.3.2); yolcu gemilerinde her hafta (SOLAS III/30.2). Gemiye katılan personele can kurtarma ve yangın donanımı eğitimi en geç iki hafta içinde verilir (SOLAS III/19.4.1). Enclosed space entry/rescue drill en az 2 ayda bir (III/19.3.3), can filikası suya indirme + manevra en az 3 ayda bir (III/19.3.4.3), kurtarma botu (rescue boat) suya indirme mümkün olduğu ölçüde aylık ve her hâlükârda en az 3 ayda bir (III/19.3.4.4) yapılır. Kaptan bu takvimi planlar ve drill'lerin "kağıt üzerinde" değil gerçekçi yapılmasını sağlar.`,
            `Drill kalitesi, kaptanın imzasını taşır. Etkili bir drill; gerçekçi senaryo, beklenmedik komplikasyon (örn. "bu can salı arızalı, alternatif kullan"), sürelerin ölçülmesi ve sonrasında debrief (değerlendirme) içerir. Drill kayıtlarına "what went well / what to improve" yazılır ve eksiklikler düzeltici aksiyona dönüştürülür. PSC denetçisi, kaydı görmenin ötesinde "şunu göster" diyerek gerçek yetkinlik test edebilir.`,
          ],
          table: {
            caption: `Zorunlu Drill Frekansları (SOLAS III/19, kargo gemisi)`,
            headers: ["Drill", "Frekans", "Referans"],
            rows: [
              ["Abandon ship", "Her ay", "SOLAS III/19.3.2"],
              ["Fire drill", "Her ay", "SOLAS III/19.3.2"],
              ["Enclosed space entry & rescue", "En az 2 ayda bir", "SOLAS III/19.3.3"],
              ["Filika suya indirme + manevra", "En az 3 ayda bir", "SOLAS III/19.3.4.3"],
              ["Rescue boat launch", "Mümkünse aylık, en az 3 ayda bir", "SOLAS III/19.3.4.4"],
              ["Yeni personele LSA/FFE eğitimi", "Katıldıktan en geç 2 hafta içinde", "SOLAS III/19.4.1"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. ISPS Code: Güvenlik Yönetiminin Çerçevesi",
      lead: `11 Eylül sonrası kabul edilen ISPS Code, SOLAS Chapter XI-2 altında gemi ve liman tesisi güvenliğini sistematik bir çerçeveye oturtur. Kaptan, geminin güvenlik (security) zincirinin gemideki nihai sorumlusudur.`,
      sections: [
        {
          subheading: "5.1 ISPS Part A ve Part B; rollerin dağılımı",
          paragraphs: [
            `ISPS Code iki bölümden oluşur: Part A zorunlu gereklilikleri, Part B ise rehber niteliğindeki tavsiyeleri içerir (ancak birçok bayrak devleti Part B'yi de zorunlu kılar). Sistemin temel aktörleri: CSO (Company Security Officer — şirket güvenlik zabiti, karada), SSO (Ship Security Officer — gemi güvenlik zabiti, genelde bir güverte zabiti) ve PFSO (Port Facility Security Officer — liman tesisi güvenlik zabiti). Kaptan, SSO'nun amiri ve geminin genel güvenliğinin nihai sorumlusudur.`,
            `Kritik bir prensip: ISPS, kaptanın emniyet ve güvenlik kararlarındaki üstünlüğünü teyit eder. SOLAS XI-2/8, güvenlik ile emniyet çatışırsa kaptanın emniyeti önceliklendirme yetkisine sahip olduğunu açıkça düzenler. Yani bir güvenlik talebi (örn. belirli bir aramayı yapma) geminin emniyetini tehlikeye atarsa, kaptan reddedebilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS XI-2/8 — Master's Discretion for Ship Safety and Security",
              text: `Kaptanın, gemi emniyeti ve güvenliği için gerekli kararları alma yetkisi hiçbir şirket, charterer veya başka bir kişi tarafından kısıtlanamaz. Emniyet ve güvenlik gerekleri çatıştığında kaptan emniyeti önceliklendirebilir.`,
            },
          ],
        },
        {
          subheading: "5.2 Ship Security Plan (SSP) ve gizliliği",
          paragraphs: [
            `Ship Security Plan (SSP), her gemi için Ship Security Assessment'a (SSA) dayanılarak hazırlanan, bayrak devleti (veya yetkili RSO) onaylı bir belgedir. SSP; erişim kontrolü, kısıtlı bölgeler, güvenlik ekipmanı, güvenlik seviyelerine göre alınacak önlemler, SSAS prosedürü ve güvenlik olaylarına müdahaleyi tanımlar. SSP gizli bir belgedir; PSC denetçisi dahi belirli bölümlerini göremez (sadece belirli operasyonel maddeler gösterilebilir).`,
            `Kaptan ve SSO, SSP'nin güncel, manipülasyona karşı korunmuş (elektronikse yetkilendirilmiş erişim) ve gemideki güvenlik ekipmanının (CCTV, aydınlatma, erişim bariyerleri, metal dedektörü) çalışır durumda olduğunu sağlar. Continuous Synopsis Record (CSR — SOLAS XI-1/5) ise geminin "kimlik geçmişini" (bayrak, isim, sahip, ISM/ISPS sertifika geçmişi) tutar ve gemide bulundurulur.`,
          ],
        },
      ],
    },
    {
      heading: "6. MARSEC Seviyeleri ve Declaration of Security",
      sections: [
        {
          subheading: "6.1 Güvenlik seviyeleri 1, 2, 3",
          paragraphs: [
            `ISPS üç güvenlik seviyesi tanımlar. Seviye 1 (normal): asgari koruyucu önlemler her zaman uygulanır. Seviye 2 (yükseltilmiş): artan tehdit nedeniyle belirli bir süre ek koruyucu önlemler alınır. Seviye 3 (istisnai): bir güvenlik olayı olası veya yakın iken, sınırlı bir süre için spesifik koruyucu önlemler uygulanır. Güvenlik seviyesini bayrak devleti veya liman devleti otoriteleri belirler; gemi, bulunduğu limanın seviyesi ile kendi bayrağının belirlediği seviyenin yükseğini uygular.`,
            `Seviye yükseldiğinde kaptan ve SSO, SSP'de o seviye için tanımlı önlemleri devreye sokar: erişim noktalarının azaltılması, kimlik kontrolünün sıkılaştırılması, bagaj/yük aramalarının artırılması, devriyelerin sıklaştırılması, deniz tarafı gözetimin (anti-piracy/anti-stowaway watch) yoğunlaştırılması. Seviye değişimleri ve uygulanan önlemler kayıt altına alınır; bu kayıtlar liman otoritesine ve şirkete raporlanır.`,
          ],
          table: {
            caption: `MARSEC Güvenlik Seviyeleri ve Tipik Önlemler`,
            headers: ["Seviye", "Anlam", "Erişim Kontrolü", "Arama / Devriye"],
            rows: [
              ["Seviye 1", "Normal", "Standart kimlik kontrolü, gangway watch", "Rutin"],
              ["Seviye 2", "Yükseltilmiş tehdit", "Ek bariyer, refakatli erişim", "Artırılmış, rastgele arama"],
              ["Seviye 3", "Olay olası/yakın", "Erişim minimum, tam arama", "Sürekli, otorite koordinasyonu"],
            ],
          },
        },
        {
          subheading: "6.2 Declaration of Security (DoS)",
          paragraphs: [
            `Declaration of Security (DoS), gemi ile liman tesisi (veya başka bir gemi) arasında güvenlik sorumluluklarının paylaşımını yazılı olarak teyit eden bir belgedir. DoS, özellikle güvenlik seviyeleri farklı olduğunda, gemi ISPS uygulamayan bir tesise yanaştığında, yüksek riskli bir operasyonda (örn. STS — ship-to-ship transfer) veya bir güvenlik olayı sonrasında talep edilir. SSO veya kaptan, gerektiğinde DoS talep etme yetkisine sahiptir.`,
            `DoS; her tarafın hangi güvenlik önlemini üstlendiğini (erişim kontrolü, yük denetimi, devriye vb.), geçerlilik süresini ve imza yetkililerini içerir. Kaptan, ISPS uygulamayan veya zayıf uygulayan bir tesiste, DoS ile sorumluluk sınırlarını netleştirir ve gemi tarafında ek önlemler alır. DoS kayıtları geminin asgari belirli süre saklaması gereken güvenlik kayıtları arasındadır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "DoS ne zaman istenir?",
              text: `Genel kural: geminin güvenlik seviyesi limanınkinden yüksekse, liman ISPS kapsamı dışındaysa, ya da geçmiş bir güvenlik olayı varsa DoS düzenle. Tereddütte kalınırsa DoS talep etmek her zaman daha güvenlidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. SSAS, Korsanlık ve Güvenlik Olaylarına Müdahale",
      sections: [
        {
          subheading: "7.1 Ship Security Alert System (SSAS)",
          paragraphs: [
            `Ship Security Alert System (SSAS), SOLAS XI-2/6 gereği belirli gemilerde zorunludur. SSAS, bir güvenlik tehdidi (korsanlık, terör, kaçırma) anında, gemide alarm çalmadan ve civardaki gemilere belli etmeden, doğrudan şirket güvenlik irtibatına ve/veya bayrak devleti yetkilisine sessiz alarm gönderen bir sistemdir. En az iki aktivasyon noktası vardır; biri köprüüstünde, diğeri gizli bir konumda. Yanlış alarmları önlemek için aktivasyon noktaları korumalıdır.`,
            `Kaptan ve SSO, SSAS test prosedürünü (genelde yetkililerle önceden koordineli) bilir ve sistemi periyodik test eder. Yanlışlıkla tetiklenen bir SSAS alarmı derhal ilgili merkezlere bildirilerek iptal edilmelidir; aksi halde gereksiz arama-kurtarma veya askeri müdahale tetiklenebilir. SSAS mesajı geminin kimliğini, pozisyonunu ve güvenlik tehdidi durumunu içerir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "SSAS — sessiz alarmdır",
              text: `SSAS aktivasyonu gemide görünür/sesli alarm vermez; amaç saldırgana belli etmeden yardım çağırmaktır. Bu nedenle yanlış basıldığında fark edilmez ve büyük müdahale zincirini tetikler. Aktivasyon noktaları net işaretlenmeli ve sadece yetkili kişilerce bilinmelidir.`,
            },
          ],
        },
        {
          subheading: "7.2 Korsanlık ve BMP — yüksek riskli bölge geçişleri",
          paragraphs: [
            `Korsanlık/armed robbery riski olan bölgelerde (Aden Körfezi, Gine Körfezi, Singapur Boğazı yaklaşmaları vb.) BMP (Best Management Practices, güncel sürüm BMP5) uygulanır. Hazırlık; UKMTO ve MSCHOA'ya kayıt/raporlama, hız ve freeboard'un maksimuma çıkarılması, fiziksel sertleştirme (dikenli tel, su perdeleri, erişim kapatma), gelişmiş gözcü düzeni ve bir citadel (sığınak) hazırlığını kapsar. Kaptan, bölgeye girmeden önce risk değerlendirmesini günceller ve ekibi brifler.`,
            `Citadel, mürettebatın saldırı anında çekildiği, dışarıdan girilemeyen, haberleşme imkânı olan korunaklı bir bölgedir. Citadel prensibi şudur: tüm mürettebat sayım yapılarak içeride olmadan ve dışarıyla güvenli haberleşme kurulmadan askeri kurtarma başlatılamaz. Silahlı özel güvenlik (PCASP) bulundurulması bayrak ve liman devleti iznine, şirket politikasına ve sıkı kullanım kurallarına (rules for the use of force) tabidir; kaptan bu çerçevenin gemideki uygulayıcısıdır.`,
          ],
        },
        {
          subheading: "7.3 Güvenlik olayı raporlama ve kayıt",
          paragraphs: [
            `Bir güvenlik olayı (yetkisiz erişim girişimi, şüpheli paket/kişi, bomb ihbarı, kaçak yolcu, saldırı) durumunda kaptan; SSP'deki müdahale adımlarını uygular, CSO ve PFSO ile koordine olur, ilgili devlet otoritelerine (bayrak/liman) ve gerektiğinde SSAS ile bildirim yapar. Olay sonrasında detaylı kayıt tutulur ve kök neden değerlendirilir; tekrarlanmaması için SSP veya prosedürler güncellenebilir (ISM ile ISPS burada birleşir).`,
            `Kaptan, ISPS güvenlik kayıtlarını (güvenlik seviyesi değişimleri, DoS belgeleri, güvenlik drilleri ve tatbikatları, ekipman testleri, olay raporları) belirlenen asgari süre boyunca saklar ve PSC/güvenlik denetimlerinde sunabilir durumda tutar. Güvenlik drilleri en az 3 ayda bir, daha kapsamlı tatbikatlar (exercises, şirket/PFSO katılımıyla) yılda en az bir kez yapılır.`,
          ],
        },
      ],
    },
    {
      heading: "8. ISM ve ISPS'in Bütünleşik İşletilmesi",
      sections: [
        {
          subheading: "8.1 Tek bir yönetim sistemi olarak entegrasyon",
          paragraphs: [
            `ISM (safety) ve ISPS (security) farklı sözleşmelerden doğsa da gemide tek bir bütünleşik yönetim sistemi olarak işletilmelidir. Risk değerlendirme metodolojisi, doküman kontrolü, denetim mantığı, düzeltici aksiyon döngüsü ve kayıt disiplini her ikisinde de aynıdır. Birçok şirket bu iki sistemi (bazen MLC ve çevre yönetimi ISO 14001 ile birlikte) tek bir entegre yönetim el kitabı altında toplar. Kaptan, bu sistemlerin ayrı silolar değil tek bir disiplin olarak çalışmasını sağlar.`,
            `Pratikte bir olay hem emniyet hem güvenlik boyutu taşıyabilir: örneğin yetkisiz bir kişinin makine dairesine girmesi hem güvenlik ihlali hem de emniyet riskidir. Kaptan, raporlama akışını ve müdahaleyi her iki açıdan da yönetir. Yıllık yönetim gözden geçirmesi (management review), her iki sistemin performans göstergelerini (KPI: NC sayısı, drill kalitesi, near-miss oranı, güvenlik olayı sayısı) birlikte değerlendirir.`,
          ],
        },
        {
          subheading: "8.2 DPA ve CSO ile iletişim",
          paragraphs: [
            `DPA (Designated Person Ashore), ISM madde 4 gereği kaptan ile şirketin en üst yönetimi arasında doğrudan bir bağdır. Kaptan, emniyet veya çevre konusunda bir endişe olduğunda hiyerarşiyi atlayarak doğrudan DPA'ya erişebilir; bu erişim hiçbir koşulda engellenemez. Benzer şekilde CSO, güvenlik konularında kaptanın karadaki muhatabıdır. Kaptan, bu iki kanalın açık, hızlı ve kayıtlı işlediğini güvence altına alır.`,
            `Master's Review (kaptanın SMS değerlendirmesi), kaptanın gemideki sistemin etkinliğine dair periyodik geri bildirimidir ve yönetim gözden geçirmesinin kritik girdisidir. Kaptan burada "kağıtta var ama sahada işlemiyor" türü açıkları dürüstçe rapor eder; bu dürüstlük, sistemin gerçekten iyileşmesinin tek yoludur. Saha gerçekliğini gizleyen bir Master's Review, en tehlikeli yönetim hatalarından biridir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — ISM denetiminin caydırıcı gücü",
              text: `Bir şirkette tekrar eden mooring yaralanmaları, iç denetimlerde "snap-back zone" işaretlemelerinin silikleştiği ve toolbox talk'ların yapılmadığı şeklinde bir sistem açığına bağlandı. Kök neden bireysel dikkatsizlik değil, eğitim ve doküman kontrolü zafiyetiydi; düzeltici aksiyon filo geneline uygulandı ve olaylar belirgin biçimde azaldı.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. PSC, Vetting ve ISM/ISPS Uyumunun Dış Doğrulaması",
      sections: [
        {
          subheading: "9.1 PSC denetiminde ISM/ISPS",
          paragraphs: [
            `Port State Control (Paris MOU, Tokyo MOU, USCG vb.) denetçisi, geminin ISM ve ISPS uyumunu hem belge hem de saha üzerinden test eder. ISM açısından: sertifikaların geçerliliği, drill kayıtları, ekipman bakım kayıtları, açık NC olup olmadığı; ISPS açısından: ISSC (International Ship Security Certificate) geçerliliği, gangway watch ve erişim kontrolü, güvenlik kaydı, CSR mevcudiyeti incelenir. "Clear grounds" varsa daha detaylı denetim açılır.`,
            `Kaptan, denetim öncesi bir self-assessment (PSC öz değerlendirme) yaparak sık görülen detention kalemlerini (LSA/FSS ekipman arızaları, eksik kayıt, çalışmayan acil ekipman, güvenlik açığı) önceden kapatır. ISM ile ilgili ciddi sistemik bulgu, geminin tutulmasına ve şirketin "targeted" (hedeflenmiş) statüye düşmesine yol açar; bu, filonun tamamına ek denetim yükü getirir.`,
          ],
        },
        {
          subheading: "9.2 Vetting ve TMSA",
          paragraphs: [
            `Tankerlerde OCIMF SIRE 2.0 vetting denetimleri ve şirket düzeyinde TMSA 3 öz değerlendirmesi, ISM/ISPS'in ticari hayatta fiilen zorunlu hale gelmiş uzantılarıdır. Bir tanker, geçerli sertifikalarına rağmen kötü bir SIRE raporu nedeniyle yük bulamayabilir. Kaptan; SIRE soru bankasına hâkim olur, gemideki kayıt ve uygulamaların TMSA elementleriyle (örn. MOC, risk yönetimi, navigation safety) uyumlu olmasını sağlar.`,
            `Kuru yük tarafında RightShip değerlendirmesi benzer bir kapı bekçiliği işlevi görür. Kaptanın günlük disiplini (kayıtların güncelliği, ekipmanın çalışırlığı, ekibin yetkinliği) bu dış denetimlerde doğrudan filonun ticari rekabet gücüne yansır. Yani ISM/ISPS yalnızca yasal değil, ticari bir hayatta kalma meselesidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS XI-1/5 — Continuous Synopsis Record (CSR)",
              text: `Her gemi, bayrak değişimi, isim değişimi, ISM/ISPS sertifika geçmişi gibi bilgileri içeren güncel bir CSR taşımak zorundadır. CSR gemiyle birlikte seyahat eder ve denetimde sunulur; geçmişteki tüm değişiklik kayıtları korunur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Kaptanın ISM/ISPS günlük ve periyodik checklist'i",
          bullets: [
            `DOC kopyası gemide ve gemi tipi DOC'ta listeli mi? SMC/ISSC geçerli ve doğrulama penceresi takipte mi?`,
            `SMS dokümanları en güncel revizyonda mı, eski revizyonlar kaldırıldı mı (controlled document register)?`,
            `Yeni katılan personelin familiarization ve 24 saat brifingi tamamlandı mı?`,
            `Aylık fire ve abandon ship drill'leri ile 2 aylık enclosed space drill kayıtları güncel ve gerçekçi mi?`,
            `Permit-to-work ve risk assessment'lar kritik işler için dosyalanıyor mu (enclosed space, hot work, aloft)?`,
            `Açık NC / Major NC var mı, düzeltici aksiyonlar süresi içinde ve etkinlik doğrulamasıyla kapatıldı mı?`,
            `Near-miss raporlama aktif mi, suçlamayan kültür sürüyor mu?`,
            `MOC süreci kalıcı/geçici değişiklikler için işletildi mi?`,
            `SSP güncel ve gizliliği korunmuş mu? Güvenlik ekipmanı (CCTV, aydınlatma, erişim) çalışıyor mu?`,
            `Güncel MARSEC seviyesi doğru uygulanıyor mu, gerekli yerde DoS düzenlendi mi?`,
            `SSAS test edildi mi, aktivasyon noktaları ve prosedür biliniyor mu?`,
            `HRA geçişi için BMP5 hazırlığı (UKMTO/MSCHOA kaydı, citadel, sertleştirme) yapıldı mı?`,
            `CSR güncel mi, güvenlik ve ISM kayıtları asgari saklama süresince arşivde mi?`,
            `Master's Review dürüstçe hazırlandı, DPA/CSO iletişim kanalları açık mı?`,
          ],
          paragraphs: [
            `ISM ve ISPS, denetimde "kağıt göstermek" için değil; gemide bir kaza veya güvenlik olayı olduğunda mürettebatı, gemiyi ve çevreyi koruyan canlı bir sistem olarak yaşar. Bu sistemin gücü, kaptanın onu bir bürokratik yük olarak değil, kararlarını destekleyen bir disiplin ve adil kültür olarak sahiplenmesinden gelir. Sertifikalar duvarda asılı kalabilir; ama ISM/ISPS'i gerçekten çalıştıran şey, kaptanın her gün kurduğu raporlama dürüstlüğü, doküman disiplini ve "stop work" cesaretini ödüllendiren kültürdür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
