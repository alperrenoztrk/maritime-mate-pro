import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Uyuşturucu ve alkol (Drug & Alcohol) politikasının uygulanması",
  roleSlug: "kaptan",
  taskIndex: 13,
  estimatedPages: 25,
  intro: `ISM Code ve çoğu şirketin Safety Management System (SMS) dokümantasyonu, gemide sıfır toleranslı bir Drug & Alcohol (D&A) politikasının uygulanmasını zorunlu kılar. Kaptanın bu alandaki sorumluluğu; yeni katılan personelin pre-employment ve sign-on D&A testinin yaptırılması, rastgele (random/unannounced) test programının sahada koordinasyonu, pozitif sonuç durumunda kişinin görevden alınması ve şirkete derhal bildirim yapılmasını kapsar. Ayrıca USCG, Paris MOU ve diğer liman devleti kontrol (PSC) otoritelerinin giderek yaygınlaşan D&A denetimlerine her an hazır olunması da kaptanın görevidir. Bu bölüm, politikayı soyut bir "sıfır tolerans" sloganı olarak değil; testin teknik prosedürü, chain of custody, BAC/cut-off değerleri, pozitif sonuç yönetimi ve hukuki sonuçları bağlamında somut olarak ele alır.`,
  sources: [
    "ISM Code (IMO Resolution A.741(18) ve değişiklikleri) — Madde 6 ve 7",
    "STCW 2010 (Manila Amendments) Reg. VIII/1 ve Code Section B-VIII/1",
    "MLC 2006 — Title 3 ve Title 4 (sağlık koruma ve mürettebat refahı)",
    "OCIMF — Guidelines for the Control of Drugs and Alcohol Onboard Ship (3rd Edition)",
    "ILO/ICS Drug and Alcohol Programmes — Guidelines",
    "46 CFR Part 16 ve 33 CFR Part 95 (USCG Chemical Testing / Alcohol)",
    "Paris MOU & USCG Port State Control Annual Reports",
    "Company SMS — Drug & Alcohol Policy ve Master's Standing Orders",
  ],
  chapters: [
    {
      heading: "1. Hukuki ve Yönetsel Çerçeve",
      lead: `D&A politikası tek bir sözleşmeden değil; ISM'in emniyetli operasyon yükümlülüğü, STCW'nin fitness-for-duty kuralı, MLC'nin sağlık koruması ve şirket SMS'inin sıfır tolerans hükümlerinin birleşiminden doğar.`,
      sections: [
        {
          subheading: "1.1 ISM Code ve SMS zorunluluğu",
          paragraphs: [
            `ISM Code, şirketten emniyetli işletim için "safe practices" ve "safe working environment" tesis etmesini ister (Madde 1.2.2). Uyuşturucu ve alkolün etkisi altındaki bir personel, hem kendisi hem de gemi için doğrudan bir tehlikedir; bu nedenle hemen her şirketin SMS'i içinde ayrı bir Drug & Alcohol Policy bulunur. Kaptan, bu politikanın gemide fiilen uygulanmasından sorumlu olan "person in charge"dır; ISM Madde 5 kapsamında SMS'i sahada uygulamak ve sapmaları DPA'ya raporlamakla yükümlüdür.`,
            `Politika tipik olarak "zero tolerance" prensibi üzerine kuruludur: gemide uyuşturucu madde bulundurmak, kullanmak veya etkisi altında görev yapmak kesin olarak yasaktır ve genellikle anında işten çıkarma (summary dismissal) ile sonuçlanır. Alkol için çoğu modern şirket "dry ship" (tamamen kuru gemi, 0.00 BAC) ya da OCIMF tavsiyesiyle uyumlu üst sınır uygular. Kaptan, gemiye yeni katılan her personelin bu politikayı imzalı olarak okuduğunu (familiarisation) teyit eder.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Code — Madde 6.2 ve 6.3",
              text: `Şirket, geminin emniyetli işletimi için her geminin yeterli ve nitelikli personelle donatılmasını ve personelin görevleriyle tanıştırılmasını (familiarisation) sağlar. D&A familiarisation, bu yükümlülüğün ayrılmaz parçasıdır ve kayıt altına alınmalıdır.`,
            },
          ],
        },
        {
          subheading: "1.2 STCW fitness-for-duty ve alkol limiti",
          paragraphs: [
            `STCW 2010 Manila değişiklikleri, vardiya tutan personelin "fit for duty" olmasını açıkça düzenler. Section B-VIII/1, idarelere ve şirketlere bir alkol limiti belirlemelerini tavsiye eder ve bu sınırı kandaki alkol konsantrasyonu (BAC) için 0.05% (0.5 g/L) veya nefesteki alkol için 0.25 mg/L olarak önerir; bazı görevler için daha düşük bir limit beklenir. Birçok ticari işletici bunu daha da sıkılaştırarak 0.04% (OCIMF üst sınırı) ya da gemi içinde 0.00% uygular.`,
            `STCW ayrıca alkol ve uyuşturucu kötüye kullanımının önlenmesini "fatigue" yönetimiyle birlikte fitness-for-duty başlığı altında değerlendirir. Vardiyaya çıkmadan önce alkol tüketimi için tipik bir kural, vardiya başından geriye doğru en az 4 saatlik bir abstinence (içki içmeme) penceresidir; ancak dry ship politikalarında bu tartışma konusu bile olmaz çünkü gemide alkol bulundurmak yasaktır.`,
          ],
          table: {
            caption: `Tipik Alkol Limiti Referansları (kıyas amaçlı)`,
            headers: ["Referans / Otorite", "Kan (BAC)", "Nefes", "Not"],
            rows: [
              ["STCW B-VIII/1 (tavsiye)", "0.05%", "0.25 mg/L", "Minimum tavsiye"],
              ["OCIMF tavsiyesi", "0.04%", "0.20 mg/L", "Tanker sektörü yaygın"],
              ["USCG (33 CFR 95)", "0.04%", "—", "Detention/ceza eşiği"],
              ["Dry ship (şirket)", "0.00%", "0.00 mg/L", "Gemide alkol yasak"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Politikanın Kapsamı ve Sıfır Tolerans İlkesi",
      sections: [
        {
          subheading: "2.1 Yasaklı maddeler ve kapsam",
          paragraphs: [
            `D&A politikası yalnızca alkolü değil; başta esrar (THC), kokain, amfetamin/metamfetamin, opiatlar (morfin, kodein, eroin), benzodiazepinler ve sentetik maddeleri (NPS — new psychoactive substances) kapsar. Reçeteli ilaçlar da kapsam dışında değildir: performansı, uyanıklığı veya muhakemeyi etkileyebilecek reçeteli ilaç kullanan personel, bunu kaptana ve gemi doktoruna/şirket sağlık birimine beyan etmek zorundadır. Bu beyan kayıt altına alınır ve gerekirse görev kısıtlaması uygulanır.`,
            `Politikanın kapsamı tüm mürettebat, kaptan dahil her rütbe ve ayrıca gemiye çıkan müteahhit (contractor), tamirci ve riding squad personelini içerir. Kaptanın kendisi de sıfır tolerans politikasının dışında değildir; örnek davranış (lead by example) ilkesi, kaptanın hem politikayı uygulayan hem de ona uyan kişi olmasını gerektirir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Reçeteli ilaç tuzağı",
              text: `Bazı reçeteli ilaçlar (kodein içeren öksürük şurupları, bazı ağrı kesiciler) standart immunoassay testlerinde opiat pozitifi verebilir. Personelin reçetesini önceden beyan etmesi, MRO (Medical Review Officer) değerlendirmesinde "legitimate medical explanation" olarak kabul edilebilir. Beyan edilmemiş reçete, pozitif sonucun savunmasını zorlaştırır.`,
            },
          ],
        },
        {
          subheading: "2.2 Gemide alkol bulundurma ve kontrol",
          paragraphs: [
            `Dry ship politikası uygulayan şirketlerde gemiye alkol getirmek, bulundurmak ve tüketmek yasaktır; bond store'da alkol bulunmaz veya kilit altında mühürlü tutulur. Kaptan, periyodik kamara ve ortak alan aramaları (cabin search) için SMS'te tanımlı yetkiye sahiptir; bu aramalar mahremiyet ilkesine saygı göstererek, tercihen personelin huzurunda ve tanıkla yapılır.`,
            `Sınırlı alkole izin veren şirketlerde (ör. belirli günlerde, kontrollü miktarda) kaptan, alkol stoğunun kaydını tutar ve liman/seyir kritik dönemlerinde (manevra, dar boğaz, kargo operasyonu) tüketimi tamamen yasaklayabilir. Her hâlükârda alkolün vardiya performansını etkilememesi temel kuraldır; şüphe halinde kaptan test (for-cause testing) isteyebilir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Test Türleri ve Tetikleyiciler",
      lead: `D&A test programı dört temel tetikleyici üzerine kuruludur: pre-employment/sign-on, random, for-cause (reasonable suspicion) ve post-incident.`,
      sections: [
        {
          subheading: "3.1 Pre-employment ve sign-on testleri",
          paragraphs: [
            `Pre-employment test, personel gemiye katılmadan önce (genelde manning agency veya klinik tarafından) yapılır ve negatif sonuç sign-on şartıdır. Sign-on/joining test ise gemiye katılırken veya katılımdan kısa süre sonra yapılan ve "temiz başlangıç" sağlayan testtir. Kaptan, yeni katılan her personelin geçerli ve negatif bir D&A test belgesiyle geldiğini doğrular; belge yoksa veya şüpheliyse onboard test yaptırır.`,
            `Bu testler genellikle idrar (urine) bazlı multi-panel immunoassay test kitleriyle yapılır; gemide bu kitler bulundurulur. Pozitif bir ön sonuç (presumptive positive) çıkması halinde örnek mühürlenir ve doğrulama (confirmation) için akredite bir laboratuvara (GC-MS/LC-MS yöntemi) gönderilir. Ön test sonucu tek başına kesin değildir; bu nedenle chain of custody ve laboratuvar doğrulaması kritiktir.`,
          ],
        },
        {
          subheading: "3.2 Random (rastgele) test programı",
          paragraphs: [
            `Random testing, programın caydırıcılığının kalbidir; çünkü ne zaman test edileceğini kimse önceden bilemez. Şirket SMS'i genellikle yıllık bir hedef oran belirler (ör. mürettebatın en az %25'inin yılda bir kez random teste tabi tutulması; bazı tanker şirketleri daha yüksek oran ister). Kaptan, seçim sürecinin gerçekten rastgele ve önyargısız olmasını sağlar — örneğin numaralandırılmış liste + rastgele sayı, mühürlü kapsül çekimi veya şirketin merkezi yazılımıyla seçim.`,
            `Random test "unannounced" (habersiz) olmalıdır; seçilen kişiye, bildirimle örnek verme arasında uzun süre tanınmaması esastır (genelde örnek verme süreci derhal başlar). Kaptan, test gününü ve seçim metodunu kayıt altına alır; PSC veya vetting denetiminde random programının kanıtı (kayıtlar, seçim metodu, sonuçlar) istenebilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Tarafsız seçim ipucu",
              text: `Seçimin "rastgeleliğini" kanıtlayabilmek için yöntemi yazılı tanımlayın: ör. mürettebat listesi alfabetik numaralandırılır, gemi dışı bir kaynaktan (şirket yazılımı/online RNG) gelen numaralar seçilir. Kaptanın "gözüne kestirdiğini" seçmesi, ayrımcılık ve taciz iddialarına kapı aralar.`,
            },
          ],
        },
        {
          subheading: "3.3 For-cause ve post-incident testleri",
          paragraphs: [
            `For-cause (reasonable suspicion / for-cause) testi, bir personelin davranışı, konuşması, kokusu veya performansı makul bir şüphe yarattığında uygulanır. Şüphe gözlemi mümkünse iki kişi (kaptan + bir zabit) tarafından kayıt altına alınır; subjektif "hoşuma gitmiyor" değil, somut belirtiler (dengesiz yürüme, peltek konuşma, alkol kokusu, kızarmış gözler) yazılır. For-cause testi reddetmek, çoğu SMS'te pozitif sonuçla aynı disiplin sonucunu doğurur.`,
            `Post-incident (serious marine incident sonrası) test, çatışma, oturma, yangın, ciddi yaralanma/ölüm veya önemli kirlilik gibi olaylardan sonra ilgili personele uygulanır. USCG sularında 46 CFR 4.06 kapsamında "serious marine incident" sonrası alkol testi 2 saat, uyuşturucu testi 32 saat içinde yapılmalıdır; bu zaman pencerelerinin kaçırılması ayrı bir ihlal sayılır. Kaptan, post-incident testin lojistiğini (test kiti, tanık, kayıt) acil durum yönetiminin parçası olarak önceden planlar.`,
          ],
          table: {
            caption: `Test Türleri — Tetikleyici ve Zamanlama Özeti`,
            headers: ["Test türü", "Tetikleyici", "Tipik zamanlama"],
            rows: [
              ["Pre-employment", "İşe alım", "Gemiye katılmadan önce"],
              ["Sign-on / joining", "Gemiye katılım", "Katılımda / kısa süre sonra"],
              ["Random", "Habersiz seçim", "Yıl boyunca, periyodik"],
              ["For-cause", "Makul şüphe", "Şüphe anında, derhal"],
              ["Post-incident", "Ciddi deniz olayı", "Alkol ≤2 sa, uyuşturucu ≤32 sa (USCG)"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Test Prosedürü ve Chain of Custody",
      sections: [
        {
          subheading: "4.1 Breathalyser (nefes alkol) testi",
          paragraphs: [
            `Alkol testi gemide genellikle kalibre edilmiş bir breathalyser (nefes alkol ölçer) ile yapılır. Cihazın kalibrasyon tarihi geçerli olmalı; üreticinin belirttiği kalibrasyon aralığına (tipik 6-12 ay) uyulmalıdır. Test öncesi kişinin en az 15-20 dakika ağzına bir şey almamış olması (ağız içi alkol/yiyecek kontaminasyonunu önlemek için) beklenir; pozitif çıkarsa kısa bir bekleme sonrası ikinci ölçüm yapılır.`,
            `Sonuç ekran değeri olarak kaydedilir ve test edilen kişiye gösterilir. Kaptan, cihazın seri numarası, kalibrasyon tarihi, ölçüm zamanı ve sonucu içeren bir formu tutar. Breathalyser sonuçları anlık ve geri dönüşsüz delil olduğundan, cihazın bakımı ve yedek ağızlıkların (tek kullanımlık) stoğu kaptanın sorumluluğundadır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kalibrasyonsuz cihaz delil olmaz",
              text: `Kalibrasyonu geçmiş bir breathalyser ile alınan sonuç hukuken zayıftır ve bir personelin işten çıkarılmasının dayanağı yapılırsa şirket aleyhine tazminat doğurabilir. Cihaz kalibrasyon sertifikasını gemide bulundurun ve süresini PMS/checklist ile takip edin.`,
            },
          ],
        },
        {
          subheading: "4.2 İdrar testi, doğrulama ve cut-off değerleri",
          paragraphs: [
            `Uyuşturucu testi gemide multi-panel idrar test kiti ile başlar (presumptive screen). Kit, belirli cut-off değerlerinin üzerindeki madde varlığını gösterir. Presumptive positive çıkan örnek, split-sample mantığıyla mühürlenir ve akredite bir laboratuvarda GC-MS veya LC-MS/MS ile doğrulanır. Sadece laboratuvar tarafından doğrulanmış ("confirmed positive") sonuç, kesin pozitif kabul edilir.`,
            `Cut-off değerleri madde başına farklıdır ve referans olarak SAMHSA/uluslararası standartlara dayanır. Örneğin kabaca: amfetaminler ~500 ng/mL (confirm 250), kokain metaboliti ~150 ng/mL (confirm 100), opiatlar ~2000 ng/mL, esrar (THC-COOH) ~50 ng/mL (confirm 15), fensiklidin ~25 ng/mL. Bu değerler, çevresel/pasif maruziyetle gerçek kullanım arasında ayrım yapmak için belirlenmiştir; bu nedenle "yanlışlıkla maruz kaldım" savunmaları genelde cut-off mantığıyla çürütülür.`,
          ],
          table: {
            caption: `Tipik İdrar Tarama / Doğrulama Cut-off Değerleri (referans)`,
            headers: ["Madde", "Tarama (ng/mL)", "Doğrulama (ng/mL)", "Tipik tespit penceresi"],
            rows: [
              ["Esrar (THC-COOH)", "50", "15", "Günler-haftalar (kronik)"],
              ["Kokain metaboliti", "150", "100", "2-4 gün"],
              ["Amfetamin/Metamfetamin", "500", "250", "2-4 gün"],
              ["Opiatlar (morfin)", "2000", "2000", "1-3 gün"],
              ["Fensiklidin (PCP)", "25", "25", "Günler"],
            ],
          },
        },
        {
          subheading: "4.3 Chain of custody (delil zinciri)",
          paragraphs: [
            `Chain of custody (CoC), örneğin alınmasından laboratuvar sonucuna kadar her temas noktasının kayıt altına alındığı zincirdir ve testin hukuki geçerliliğinin temelidir. Örnek, test edilen kişinin huzurunda toplanır; idrar örneğinde sıcaklık kontrolü (32-38°C) yapılarak "ikame" (substitution) ve "seyreltme" (dilution) önlenir. Örnek mühürlenir, mühür üzerine kişi ve tanık imza atar, CoC formu örnekle birlikte hareket eder.`,
            `CoC'deki bir kopukluk (mühürsüz örnek, eksik imza, takip edilemeyen saklama) pozitif sonucu hukuken savunulamaz hale getirir. Bu nedenle kaptan, örnek alımını tarafsız bir tanıkla yürütür ve formdaki her alanı eksiksiz doldurur. Örneklerin gemide bekletilmesi gerekiyorsa kilitli ve sıcaklık koşullarına uygun saklanır; ilk uygun limanda kuryeyle laboratuvara gönderilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — kopuk delil zinciri",
              text: `Bir tanker mürettebatı pozitif idrar sonucu sonrası işten çıkarıldı; ancak dava sürecinde örneğin mühür numarasının CoC formuyla uyuşmadığı ortaya çıktı. Sonuç delil olarak kabul edilmedi ve şirket haksız fesih nedeniyle tazminat ödedi. Ders: pozitif sonuç kadar, o sonuca giden zincirin kusursuzluğu da önemlidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Pozitif Sonuç Yönetimi ve Disiplin",
      sections: [
        {
          subheading: "5.1 Doğrulanmış pozitif sonrası adımlar",
          paragraphs: [
            `Doğrulanmış pozitif sonuçta kaptanın ilk önceliği emniyettir: ilgili personel derhal emniyet-kritik görevlerden (vardiya, manevra, kargo operasyonu) alınır. Ardından şirkete (DPA / crew/HR departmanı) derhal bildirim yapılır; çoğu SMS, pozitif sonucu "non-conformity / reportable event" olarak sınıflar. Karar süreci tek başına kaptana bırakılmaz; şirket disiplin prosedürü ve hukuk birimi devreye girer.`,
            `Çoğu zero-tolerance politikasında doğrulanmış pozitif, summary dismissal ve ilk uygun limanda sign-off ile sonuçlanır. Repatriation (memlekete gönderme) MLC kapsamında düzenlenir; ancak sözleşme ve politika, pozitif sonuç halinde repatriation masraflarının personele yansıtılabileceğini öngörebilir. Kaptan, tüm sürecin belgelendiğinden ve personelin haklarının (örneğin doğrulama testi talep etme) ihlal edilmediğinden emin olur.`,
          ],
        },
        {
          subheading: "5.2 Belgeleme, gizlilik ve adil süreç",
          paragraphs: [
            `D&A test sonuçları hassas kişisel ve tıbbi veridir; gizlilik (confidentiality) ilkesine uyulur. Sonuçlar "bilmesi gerekenler" (kaptan, ilgili kişi, şirket yetkilisi) dışında paylaşılmaz; gemide dedikodu veya damgalama önlenir. Kaptan, sürecin tarafsız ve insan onuruna saygılı yürütülmesinden sorumludur; aksi davranış hem MLC'nin "fair treatment" beklentisine hem de hukuki riske aykırıdır.`,
            `Adil süreç (due process), pozitif sonucun otomatik mahkûmiyet değil, doğrulama ve değerlendirme hakkıyla birlikte uygulanması demektir. MRO incelemesi, reçeteli ilaç beyanı, split-sample ile yeniden test imkânı bu sürecin parçalarıdır. Kaptan tüm adımları (gözlem, test, sonuç, görevden alma, bildirim, sign-off) zaman damgalı ve imzalı olarak dosyalar; bu dosya ileride doğacak iş hukuku ihtilaflarında belirleyicidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 — Adil muamele",
              text: `MLC 2006, denizcilerin onurlu ve adil koşullarda çalışmasını öngörür. D&A süreci, sıfır tolerans uygulanırken bile gizlilik, kayıt ve adil değerlendirme ilkelerine uygun yürütülmelidir; aksi durum hem hukuki hem itibari risk doğurur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Liman Devleti (PSC) ve Vetting D&A Denetimleri",
      sections: [
        {
          subheading: "6.1 USCG ve Paris MOU yaklaşımı",
          paragraphs: [
            `USCG, kendi sularında 46 CFR Part 16 (chemical testing) ve 33 CFR Part 95 (alkol) kapsamında D&A programlarını denetler ve gerektiğinde gemiye çıkıp test/programı inceler. ABD bayraklı veya ABD sularında çalışan gemilerde MEC (Marine Employer) programı, random oranları ve kayıtları belirleyici olabilir. USCG denetiminde program kayıtlarının eksikliği, ciddi bulgu ve operasyonel kontrol (operational control) ile sonuçlanabilir.`,
            `Paris MOU ve diğer MOU rejimlerinde D&A doğrudan ayrı bir denetim alanı olmasa da; fitness-for-duty, rest hours ve ISM uygulaması kapsamında dolaylı olarak değerlendirilir. PSC zabiti, gemide yürürlükte bir D&A politikası, familiarisation kayıtları ve test kayıtları görmek ister. "Clear grounds" oluşursa daha derin inceleme yapılabilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "PSC hazırlık dosyası",
              text: `Köprüüstü/kaptan kamarasında erişilebilir bir D&A dosyası bulundurun: imzalı politika, familiarisation kayıtları, random seçim metodu ve kayıtları, test kitleri ve breathalyser kalibrasyon sertifikası, son testlerin (anonimleştirilmiş) özeti. Hazır bir dosya, denetimi dakikalarla sınırlar.`,
            },
          ],
        },
        {
          subheading: "6.2 OCIMF/vetting ve tanker sektörü beklentileri",
          paragraphs: [
            `Tanker sektöründe OCIMF SIRE/VIQ denetimleri D&A programını ayrıntılı sorgular: yazılı politika var mı, sınır değerler tanımlı mı, random oranı yeterli mi, kayıtlar tutuluyor mu, breathalyser kalibre mi. Vetting'de zayıf bir D&A programı, geminin charter uygunluğunu doğrudan etkiler; bu da kaptanın programı sadece "uyum" için değil, ticari sürdürülebilirlik için de titizlikle yürütmesini gerektirir.`,
            `Kaptan, vetting öncesi bir iç denetimle (self-assessment) programın boşluklarını kapatır: süresi geçmiş kalibrasyon, eksik familiarisation imzası, kayıtsız random testler en sık görülen bulgulardır. Bu hazırlık, denetim günü stresini ve gözlem (observation) sayısını ciddi ölçüde azaltır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Eğitim, Önleme ve Mürettebat Refahı",
      sections: [
        {
          subheading: "7.1 Bilinçlendirme ve önleme programları",
          paragraphs: [
            `Etkili bir D&A politikası yalnızca test ve cezadan ibaret değildir; önleme (prevention) ve eğitim de kapsar. Kaptan, periyodik safety meeting'lerde D&A risklerini, politika kapsamını ve testin nasıl işlediğini anlatır. Personelin politikayı "yakalama tuzağı" değil, herkesin emniyetini koruyan bir çerçeve olarak görmesi, programın gönüllü kabulünü artırır.`,
            `MLC 2006'nın mürettebat refahı (welfare) vurgusu, alkol/uyuşturucu bağımlılığını disiplin sorununun yanı sıra bir sağlık sorunu olarak da ele almayı teşvik eder. Bazı şirketler "self-referral" (kendi rızasıyla yardım isteme) imkânı tanır: personel henüz pozitif test çıkmadan yardım isterse rehabilitasyona yönlendirilir. Kaptan, böyle bir kanalın varlığını ve gizliliğini destekler.`,
          ],
        },
        {
          subheading: "7.2 Yorgunluk, izolasyon ve riskli ortam",
          paragraphs: [
            `Gemide uzun seferler, izolasyon, monotonluk ve yorgunluk; alkol/uyuşturucuya kaçış riskini artıran faktörlerdir. Kaptan, bu ortamsal riskleri yöneterek (sosyal etkinlikler, iletişim imkânı, makul dinlenme) dolaylı önlem alır. D&A politikası ile fatigue yönetimi (rest hours) birbirini tamamlar; ikisi de fitness-for-duty başlığının parçasıdır.`,
            `İçki sorunu olan bir personelin tespiti çoğu zaman ani değil, kademeli belirtilerle (geç kalma, performans düşüşü, sosyal çekilme) gelir. Kaptanın gözlem yeteneği, for-cause testten önce sorunu erken yakalamasını sağlar. Erken müdahale, hem o kişinin hem de geminin emniyeti için en etkili savunmadır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Kayıt, Raporlama ve Şirket Koordinasyonu",
      sections: [
        {
          subheading: "8.1 Tutulması gereken kayıtlar",
          paragraphs: [
            `Kaptan, D&A programının tüm ayak izini kayıt altında tutar: imzalı politika ve familiarisation formları, random test seçim metodu ve sonuçları, for-cause/post-incident test gözlem raporları, breathalyser kalibrasyon belgeleri, test kiti stok ve son kullanma tarihi kayıtları, pozitif sonuçlara ilişkin yazışmalar. Bu kayıtlar hem iç denetim hem de PSC/vetting için hazır olmalıdır.`,
            `Kayıtların gizliliği ve saklama süresi şirket prosedürüne uyar; kişisel veri olduğundan erişim sınırlanır. Sonuç özetleri (kaç test, kaç pozitif) anonimleştirilerek raporlanabilir; ancak bireysel sonuçlar yalnızca yetkili kişilerle paylaşılır.`,
          ],
        },
        {
          subheading: "8.2 Olay bildirimi ve DPA ile iletişim",
          paragraphs: [
            `Pozitif sonuç, for-cause test kararı veya politika ihlali, ISM kapsamında DPA'ya zamanında bildirilir. Bildirimde olayın özeti, alınan acil önlem (görevden alma), test detayları ve önerilen aksiyon yer alır. DPA ve şirket HR/hukuk birimi, sign-off ve repatriation lojistiğini, yedek personel teminini ve hukuki adımları koordine eder.`,
            `Kaptan, bu sürecin "tek karar verici" değil "saha yöneticisi ve raporlayıcı" olduğunu bilir. Emniyet kararı (görevden alma) anında kaptana aittir; ancak istihdam sonlandırma ve hukuki muhataplık şirketle ortak yürür. Bu netlik, hem kaptanı korur hem de personelin haklarının korunmasını sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "9. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Kaptanın D&A kontrol listesi",
          bullets: [
            `Şirket D&A politikası gemide yürürlükte ve tüm personel imzalı familiarisation aldı mı?`,
            `Yeni katılan herkes geçerli ve negatif pre-employment/sign-on test belgesiyle mi geldi?`,
            `Random test programı yıllık hedefe uygun, seçim metodu tarafsız ve kayıtlı mı?`,
            `Breathalyser kalibrasyonu geçerli mi; test kitleri stokta ve son kullanma tarihi uygun mu?`,
            `Chain of custody formları ve örnek mühürleri eksiksiz, tanıklı dolduruluyor mu?`,
            `For-cause / post-incident test prosedürü ve USCG zaman pencereleri biliniyor mu?`,
            `Pozitif sonuçta görevden alma + DPA bildirimi + gizlilik akışı tanımlı mı?`,
            `PSC/vetting için hazır bir D&A dosyası erişilebilir mi?`,
            `Reçeteli ilaç beyan mekanizması ve self-referral kanalı personele duyuruldu mu?`,
          ],
          paragraphs: [
            `D&A politikasının uygulanmasında kaptanın başarısı, "hiç pozitif çıkmaması" değil; programın tutarlı, tarafsız, belgelenebilir ve insan onuruna saygılı işlemesidir. Sıfır tolerans güçlü bir caydırıcıdır; ancak gücü, uygulamanın hukuki kusursuzluğundan ve mürettebatın bu çerçeveye duyduğu güvenden gelir. İyi yönetilen bir D&A programı, bir gün bir kazayı önleyecek olan görünmez savunma hattıdır; kötü yönetilen bir program ise hem emniyeti hem de şirketi hukuki olarak savunmasız bırakır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
