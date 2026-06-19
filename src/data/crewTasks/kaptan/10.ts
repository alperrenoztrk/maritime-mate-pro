import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "MLC 2006 kapsamında mürettebat hakları ve refah yönetimi",
  roleSlug: "kaptan",
  taskIndex: 10,
  estimatedPages: 27,
  intro: `Maritime Labour Convention (MLC) 2006 — "denizcilerin haklar beyannamesi" olarak anılır — gemide çalışma ve yaşama koşullarının asgari standartlarını belirler ve bu standartların gemideki uygulanmasından kaptan birincil derecede sorumludur. MLC; istihdam sözleşmesi (SEA), çalışma/dinlenme saatleri (ILO 180 / STCW uyumlu), maaşların zamanında ödenmesi, barınma-yiyecek-sıhhi tesisat standartları, sağlık ve refah, gemi-içi şikâyet prosedürü ve 2014 değişiklikleriyle gelen repatriation/terk finansal güvencesini kapsar. PSC denetiminde MLC uygunluğu doğrudan sorgulanır; rest hours ihlalleri ve ödenmemiş maaşlar gemi tutmaya (detention) yol açabilir. Bu bölüm, kaptanın MLC'nin beş Title'ını sahada nasıl yöneteceğini, DMLC Part I/II ilişkisini ve PSC karşısındaki kanıt yükümlülüğünü somut prosedürlerle ele alır.`,
  sources: [
    "Maritime Labour Convention (MLC) 2006 — Titles 1-5",
    "MLC 2006 — 2014 Amendments (Financial Security: Repatriation & Abandonment)",
    "ILO Convention No. 180 — Seafarers' Hours of Work and Manning",
    "STCW 2010 Section A-VIII/1 — Fitness for Duty / Rest Hours",
    "IMO/ILO Guidelines on Fatigue (MSC.1/Circ.1598)",
    "WHO International Medical Guide for Ships (3rd Edition)",
    "Paris MoU / Tokyo MoU — MLC Inspection Guidance",
    "ILO Guidelines for Flag State / Port State Inspections under MLC",
  ],
  chapters: [
    {
      heading: "1. MLC 2006'nın Yapısı ve Kaptanın Sorumluluğu",
      lead: `MLC, dört bölgeden oluşan bir yapı üzerine kuruludur: Articles, Regulations, Code Part A (zorunlu Standartlar) ve Code Part B (rehber Guidelines). Kaptan, bu yapının gemideki uygulayıcısıdır.`,
      sections: [
        {
          subheading: "1.1 Beş Title ve mantığı",
          paragraphs: [
            `MLC içeriği beş Title altında düzenlenir: Title 1 — gemide çalışmanın asgari şartları (asgari yaş, sağlık sertifikası, eğitim, işe alım); Title 2 — istihdam koşulları (SEA, ücret, çalışma/dinlenme, izin, repatriation, gemi kaybında tazminat, manning, kariyer); Title 3 — barınma, dinlenme tesisleri, yiyecek ve catering; Title 4 — sağlık koruması, tıbbi bakım, refah ve sosyal güvenlik; Title 5 — uygunluk ve uygulama (DMLC, sörvey, şikâyet, PSC). Kaptan, beş Title'ın her birinde "saha amiri" konumundadır.`,
            `Kaptanın rolü, standartları yalnızca "bilmek" değil, gemide fiilen uygulanmasını sağlamak, kanıtlamak ve sapmaları düzeltmektir. MLC'nin felsefesi "denizciye insan onuruna yakışır çalışma ve yaşam koşulu" olduğundan, kaptanın liderlik tarzı doğrudan bu hakların gerçekleşip gerçekleşmediğini belirler.`,
          ],
          table: {
            caption: `MLC 2006 — Beş Title ve Kaptanın Ana Görevi`,
            headers: ["Title", "Konu", "Kaptanın Ana Görevi"],
            rows: [
              ["Title 1", "Çalışmanın asgari şartları", "Yaş, medikal, sertifika kontrolü"],
              ["Title 2", "İstihdam koşulları", "SEA, rest hours, ücret, repatriation"],
              ["Title 3", "Barınma & yiyecek", "Kamara, hijyen, mönü, su denetimi"],
              ["Title 4", "Sağlık & refah", "Tıbbi bakım, ilaç dolabı, refah erişimi"],
              ["Title 5", "Uygunluk & uygulama", "DMLC, şikâyet, PSC, kayıt"],
            ],
          },
        },
        {
          subheading: "1.2 DMLC Part I ve Part II ilişkisi",
          paragraphs: [
            `Her MLC kapsamındaki gemi, Maritime Labour Certificate (MLC sertifikası) ve buna ekli Declaration of Maritime Labour Compliance (DMLC) taşır. DMLC Part I, bayrak devleti tarafından düzenlenir ve ulusal mevzuatın ilgili gereklerini özetler. DMLC Part II ise armatör tarafından hazırlanır ve Part I'deki her madde için gemide uygulanan somut önlemleri açıklar; bayrak devleti onaylar.`,
            `Kaptan, DMLC Part II'yi günlük yönetimin "kullanma kılavuzu" gibi kullanır: hangi konuda hangi prosedürün, hangi formun, hangi sıklıkta uygulanacağı oradadır. PSC denetçisi, gemide gözlemlediği uygulama ile DMLC Part II beyanı arasında çelişki ararsa, bu "non-conformity" sayılır. Sertifika geçerli olsa bile fiili ihlal varsa gemi tutulabilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC Title 5 — Sertifika ve DMLC",
              text: `500 GT ve üzeri, uluslararası sefer yapan gemiler geçerli Maritime Labour Certificate ve DMLC (Part I bayrak devleti, Part II armatör) taşımak zorundadır. Bu belgeler köprüüstünde/ilan tahtasında görünür yerde bulundurulur ve denizcilerin erişimine açık olur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Title 1: Çalışmanın Asgari Şartları",
      sections: [
        {
          subheading: "2.1 Asgari yaş, medikal ve sertifika",
          paragraphs: [
            `MLC, gemide çalışmak için asgari yaşı 16 olarak belirler; 18 yaş altı denizciler için gece çalışması ve tehlikeli işlerde kısıtlamalar vardır. Her denizci, geçerli bir medikal fitness sertifikası (genelde 2 yıl geçerli, 18 yaş altı 1 yıl) taşımak zorundadır; renk görme gerektiren işler için ayrı süre geçerlidir. Kaptan, gemiye katılan her denizcinin medikal ve STCW sertifikalarının geçerliliğini bizzat doğrular.`,
            `Süresi dolmuş medikal veya eksik STCW sertifikası, hem MLC hem STCW ihlalidir ve PSC detention sebebidir. Kaptan, crew change planlamasında sertifika sürelerini takip eder; bir denizcinin sertifikası sefer sırasında dolacaksa önceden yenileme/değişim koordine edilir.`,
          ],
        },
        {
          subheading: "2.2 İşe alım ve yerleştirme (recruitment & placement)",
          paragraphs: [
            `MLC, denizcilerin ücretsiz işe alınmasını güvence altına alır: denizciden iş bulma karşılığı ücret alınamaz (manning agency komisyonu denizciye yüklenemez). Lisanslı/denetlenen recruitment & placement service kullanımı esastır. Kaptan, gemiye gelen denizcilerin yasal ve şeffaf süreçle istihdam edildiğini, "borç esareti" (debt bondage) benzeri durumlarla gelmediğini gözlemler.`,
            `Modern slavery ve insan kaçakçılığı riski denizcilikte gerçektir; ücretsiz işe alım ilkesinin ihlali bunun ilk işaretidir. Kaptan, şüpheli durumda DPA ve CSO ile koordine olur; denizcinin pasaportunun rızası dışında alıkonması (passport retention) MLC ve insan hakları ihlalidir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Title 2: İstihdam Koşulları ve SEA",
      lead: `Title 2, kaptanın günlük olarak en çok temas ettiği alandır: sözleşme, ücret, çalışma-dinlenme ve repatriation.`,
      sections: [
        {
          subheading: "3.1 Seafarers' Employment Agreement (SEA)",
          paragraphs: [
            `Her denizci, imzalı bir Seafarers' Employment Agreement (SEA) taşımak zorundadır; bir nüshası denizcide, bir nüshası gemide bulunur. SEA; tarafların kimliği, başlangıç tarihi ve süre, görev, ücret, çalışma saatleri, yıllık izin, repatriation hakları, sağlık-sosyal güvenlik ve fesih şartlarını içerir. Kaptan, gemideki her denizcinin SEA'sının mevcut, okunabilir ve geçerli olduğunu doğrular; PSC bunu ilk isteyen belgelerdendir.`,
            `Toplu iş sözleşmesi (CBA, örn. ITF/IBF kapsamı) varsa, SEA buna atıf yapar ve CBA gemide bulundurulur. Kaptan, SEA ile fiili uygulama (ücret, görev, çalışma saati) arasında tutarlılık sağlar; denizci SEA'da yazandan farklı bir görevde çalıştırılıyorsa veya ücreti eksikse bu MLC ihlalidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC Standard A2.1 — SEA",
              text: `Her denizci, kendisi ve armatör tarafından imzalanmış, insan onuruna yakışır çalışma/yaşam koşulları sağlayan açık bir istihdam sözleşmesine (SEA) sahip olmalıdır. Denizci, sözleşmeyi imzalamadan önce inceleme ve danışma fırsatına sahip olmalıdır.`,
            },
          ],
        },
        {
          subheading: "3.2 Çalışma ve dinlenme saatleri (rest hours)",
          paragraphs: [
            `MLC ve STCW A-VIII/1, dinlenme saatleri için iki alternatif limit sunar. En az dinlenme: herhangi bir 24 saatlik dönemde minimum 10 saat, herhangi bir 7 günlük dönemde minimum 77 saat dinlenme. Dinlenme en fazla iki parçaya bölünebilir; parçalardan biri en az 6 saat kesintisiz olmalı ve ardışık dinlenme parçaları arası en fazla 14 saat olmalıdır. Alternatif olarak ILO 180 maks. çalışma limiti (24 saatte maks. 14, 7 günde maks. 72) uygulanabilir; bayrak devleti hangisini seçtiğini DMLC'de belirtir.`,
            `Kaptan, vardiya planını (watch system) bu limitler ışığında kurar ve rest hours kayıtlarını günlük tutturur. Liman operasyonu, drill, PSC/vetting ve acil durumların rest hours'ı bozma riski yüksektir. Yorgunluk (fatigue), MAIB raporlarında kaza sebeplerinin başında gelir; kaptan, "kâğıt üzerinde uyumlu ama gerçekte yorgun" bir mürettebat yaratmamak için planlamayı dürüst yapar.`,
          ],
          table: {
            caption: `Rest Hours — STCW/MLC Limit Karşılaştırması`,
            headers: ["Parametre", "Min. Dinlenme Modeli", "Maks. Çalışma Modeli (ILO 180)"],
            rows: [
              ["24 saatte", "Min. 10 saat dinlenme", "Maks. 14 saat çalışma"],
              ["7 günde", "Min. 77 saat dinlenme", "Maks. 72 saat çalışma"],
              ["Bölünme", "En fazla 2 parça", "—"],
              ["Kesintisiz blok", "Bir parça ≥ 6 saat", "—"],
              ["Parçalar arası", "Maks. 14 saat", "—"],
            ],
          },
        },
        {
          subheading: "3.3 Ücretin zamanında ödenmesi",
          paragraphs: [
            `MLC, ücretin düzenli (en az ayda bir) ve eksiksiz ödenmesini güvence altına alır; denizciye aylık hesap dökümü (wage account / payslip) verilir ve denizci ailesine para gönderme (allotment) imkânı sağlanır. Kaptan, gemideki ücret ödemelerinin SEA/CBA'ya uygun, zamanında ve belgeli yapıldığını izler; ödeme gecikmesi denizci için en somut ve hızlı şikâyet konusudur.`,
            `Ödenmemiş maaş (wages outstanding), PSC tarafından ciddi MLC ihlali sayılır ve geminin tutulmasına yol açabilir; ITF ise limanlarda ödenmemiş maaş için gemiyi denetler ve gerekirse tutuklatır (arrest). Kaptan, ödeme sorununu fark ettiğinde derhal DPA'ya bildirir; armatörün finansal sıkıntısı denizcinin maaşını geciktiremez, bu durum "abandonment" riskinin erken işaretidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ödenmemiş maaş = detention + arrest riski",
              text: `Maaş gecikmesi MLC'nin en sert yaptırım uygulanan alanıdır. PSC detention, ITF gemi tutması (ship arrest) ve charterer'in itibar/vetting cezası bir arada gelebilir. Kaptan, gecikmeyi gizlemez; belgeler ve DPA'ya derhal eskale eder.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Title 2 (devam): Repatriation ve Finansal Güvence",
      sections: [
        {
          subheading: "4.1 Repatriation hakkı",
          paragraphs: [
            `MLC, denizcinin belirli durumlarda ücretsiz olarak ülkesine (veya kararlaştırılan yere) gönderilme (repatriation) hakkını güvence altına alır: SEA süresinin dolması, hastalık/yaralanma, gemi kaybı, armatör veya denizcinin SEA'yı haklı feshi, denizcinin savaş bölgesine gönderilmesi vb. Maksimum hizmet süresi (genelde 11 ay sonra repatriation hakkı doğar) bayrak mevzuatınca belirlenir. Repatriation masraflarını denizciden tahsil etmek (önceden kesinti yapmak) yasaktır; ancak denizcinin ağır kusuru istisnadır.`,
            `Kaptan, repatriation hakkı doğan denizci için acente ve şirketle koordine olur; uçak bileti, vize, transit ve ücret hesaplaşması düzenlenir. COVID-19 döneminde yüz binlerce denizci "crew change crisis" nedeniyle gemilerde mahsur kaldı; bu, MLC'nin repatriation maddesinin küresel ölçekte test edildiği bir dönem oldu ve IMO/ILO ortak bildirimleriyle denizcilerin "key worker" statüsü vurgulandı.`,
          ],
        },
        {
          subheading: "4.2 2014 değişiklikleri: terk (abandonment) ve finansal güvence",
          paragraphs: [
            `MLC 2014 değişiklikleri (2017'de yürürlüğe girdi) iki yeni zorunlu finansal güvence getirdi: (1) denizcinin terk edilmesi (abandonment) durumunda repatriation, ödenmemiş maaş ve temel ihtiyaçları karşılayan sigorta/güvence; (2) iş kazası, hastalık veya ölümden doğan sözleşmesel tazminat için finansal güvence. Geminin, bu güvenceyi kanıtlayan sertifikaları (genelde P&I Club'tan) taşıması ve görünür yerde asması zorunludur.`,
            `Abandonment, armatörün denizciyle bağı koparması (repatriation masrafını karşılamaması, en az 2 ay maaş ödememesi veya denizciyi terk etmesi) olarak tanımlanır. Kaptan, gemide abandonment riski belirdiğinde (maaş gecikmesi, ikmal kesilmesi, şirketin sessizleşmesi) bunu erken tespit eder ve denizcileri finansal güvence sertifikasındaki sigortacıya başvuru hakkından haberdar eder; ILO bu vakaları kamuya açık bir veritabanında izler.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — terk edilen mürettebat",
              text: `Her yıl onlarca gemi mürettebatı, armatörün iflası veya kayboluşu nedeniyle aylarca limanda maaşsız, yiyeceksiz mahsur kalır. 2017 sonrası MLC finansal güvence sayesinde sigortacı; repatriation, 4 aya kadar maaş ve temel ihtiyaçları karşılar. Kaptanın rolü: durumu belgelemek, denizcileri haklarından haberdar etmek ve ILO/flag/ITF kanalını açmaktır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Title 3: Barınma, Yiyecek ve Hijyen",
      sections: [
        {
          subheading: "5.1 Barınma ve dinlenme tesisleri standartları",
          paragraphs: [
            `MLC Title 3, kamara büyüklüğü, havalandırma/iklimlendirme, aydınlatma, gürültü-titreşim limitleri, yatak, sıhhi tesisat (tuvalet/duş oranı), çamaşırhane, hastane/revir ve dinlenme/eğlence (recreation) alanları için somut standartlar belirler. Bu standartlar büyük ölçüde geminin inşa/yenileme aşamasında karşılanır, ancak kaptan bunların korunmasından (bakım, temizlik, fonksiyon) sorumludur. Klimanın çalışmaması, gürültünün limit üstü olması veya tuvalet/duş sayısının yetersizliği yaşanabilir bir refah sorunudur.`,
            `Kaptan, periyodik konaklama denetimi (accommodation inspection) yapar; MLC bu denetimin sıklıkla (genelde en az haftada bir, çoğu SMS'te düzenli) yapılmasını ve kayda geçmesini öngörür. Denetim; temizlik, çalışan tesisat, böcek/kemirgen kontrolü, çamaşırhane ve revir durumunu kapsar. Bulgular düzeltici faaliyetle kapatılır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC Regulation 3.1 — Accommodation",
              text: `Armatör, denizcilere insan onuruna yakışır barınma ve dinlenme tesisleri sağlamak zorundadır. Yetkili merci, denetimlerin gemiye ilk kayıt ve sonra düzenli aralıklarla yapılmasını sağlar; kaptan veya görevlendirdiği zabit, konaklamanın temiz, yaşanabilir ve iyi bakımlı tutulmasını denetler.`,
            },
          ],
        },
        {
          subheading: "5.2 Yiyecek, içme suyu ve catering",
          paragraphs: [
            `MLC, denizcilere ücretsiz, yeterli miktarda, besleyici ve kültürel/dini çeşitliliği gözeten yiyecek ve içme suyu sağlanmasını güvence altına alır. Catering personeli (aşçı) eğitimli ve 18 yaş üstü olmalı; 10'dan fazla mürettebatı olan gemide kalifiye gemi aşçısı (certified ship's cook) bulunması istenir. Kaptan, mönü çeşitliliğini, porsiyon yeterliliğini, gıda stoğunu, soğuk zincir ve depolama hijyenini denetler.`,
            `İçme suyu kalitesi (potability) sağlık açısından kritiktir; tank kloru, periyodik su testi ve hidrofor sistemi temizliği takip edilir. Mutfak hijyeni HACCP prensipleriyle yönetilir: çapraz bulaşma önleme, sıcaklık kontrolü (soğutucu < 4°C, dondurucu < -18°C), tarih takibi ve personel hijyeni. Gıda kaynaklı toplu hastalık (gastroenteritis) bir gemide operasyonu felç edebilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Mönü + stok = moral",
              text: `Uzun seferlerde yiyecek kalitesi mürettebat moralinin en somut göstergesidir. Kaptan, victualling bütçesini "kısılacak masraf" değil "operasyonel emniyet yatırımı" olarak görür. Düzenli mönü çeşitliliği ve dini/kültürel tercihlere saygı, gemi içi gerilimi azaltan en ucuz araçtır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Title 4: Sağlık, Tıbbi Bakım ve Refah",
      sections: [
        {
          subheading: "6.1 Gemide tıbbi bakım ve ilaç dolabı",
          paragraphs: [
            `MLC, denizcilere karadakine eşdeğer, mümkün olduğunca ücretsiz tıbbi bakım sağlamayı amaçlar. Gemide medical chest (ilaç dolabı), tıbbi rehber (WHO International Medical Guide for Ships veya muadili) ve telsiz/uydu üzerinden tıbbi tavsiye (TMAS — Telemedical Maritime Assistance Service) erişimi bulunur. 100+ kişilik veya 3+ gün uluslararası sefer yapan yolcu gemilerinde doktor bulundurulur; diğer gemilerde tıbbi bakımdan sorumlu zabit (genelde kaptan veya 2. Zabit, STCW medical care eğitimli) görevlidir.`,
            `Kaptan, ilaç dolabının envanterini, son kullanma tarihlerini ve narkotik kayıtlarını denetler; eksik/dolmuş ilaçlar limanda yenilenir. Ciddi vakada TMAS ile konsültasyon yapılır ve gerekirse MEDEVAC (helikopter veya sapma ile en yakın limana yönelme) düzenlenir; bu karar kaptanın overriding authority alanındadır ve ticari kayba rağmen alınır.`,
          ],
        },
        {
          subheading: "6.2 Refah (welfare), sosyal güvenlik ve internet erişimi",
          paragraphs: [
            `Title 4, denizcilerin karada ve gemide refah olanaklarına (seamen's clubs, recreation, iletişim) erişimini destekler; armatör ve liman devletleri welfare facility sağlamaya teşvik edilir. Modern dönemde gemide internet/iletişim erişimi (aileyle bağ) zihinsel sağlığın temel bileşeni haline geldi; 2022 sonrası bazı bayraklar ve CBA'lar makul internet erişimini standart olarak ekledi. Kaptan, shore leave (kıyı izni) hakkının makul biçimde kullanılmasını destekler; ISPS/operasyonel kısıtlar dışında kıyı izninin engellenmesi refah ihlalidir.`,
            `Zihinsel sağlık ve denizci intiharı, sektörün ciddi gündemidir; izolasyon, yorgunluk ve aileyle iletişim eksikliği başlıca risklerdir. Kaptan, mürettebatın psikolojik durumunu gözlemler, açık bir iletişim ortamı kurar ve gerekirse şirketin EAP (Employee Assistance Program) / kriz hattını devreye sokar. Sosyal güvenlik (sağlık, malullük, yaşlılık) koruması da MLC kapsamındadır ve genelde bayrak/menşe devleti üzerinden yürür.`,
          ],
        },
      ],
    },
    {
      heading: "7. Title 5: Şikâyet Prosedürü, Disiplin ve Ayrımcılık",
      lead: `Bu bölüm, kaptanın "adil ve şeffaf bir gemi" yönetmesinin MLC zeminidir.`,
      sections: [
        {
          subheading: "7.1 Gemi-içi şikâyet prosedürü (on-board complaint procedure)",
          paragraphs: [
            `MLC, her gemide adil, etkili ve hızlı bir gemi-içi şikâyet prosedürü bulundurulmasını zorunlu kılar. Denizci, şikâyetini önce en yakın amirine, çözülmezse kademe kademe kaptana ve gerekirse karadaki yetkiliye (DPA / şirket / bayrak devleti / liman devleti yetkilisi) iletme hakkına sahiptir. Prosedür yazılı olarak her denizciye verilir (SEA ile birlikte) ve denizcinin şikâyet nedeniyle mağdur edilmesi (victimisation) kesinlikle yasaktır.`,
            `Kaptan, şikâyetleri kayda geçirir, tarafsız ve zamanında ele alır; denizcinin bir refakatçi/temsilci ile başvurma hakkını korur. Prosedürde bayrak devleti irtibat bilgisi ve liman devleti yetkilisinin bilgisi yer alır; PSC, şikâyetin bu son kademeleri içerip içermediğini kontrol eder. İyi yönetilen şikâyet prosedürü, küçük sorunların büyük krize (ITF müdahalesi, PSC detention) dönüşmesini engeller.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC Regulation 5.1.5 — On-board Complaint Procedures",
              text: `Her gemide, denizcilerin MLC ihlali iddialarını adil, etkili ve hızlı biçimde ele alan gemi-içi şikâyet prosedürü bulunmalıdır. Şikâyette bulunan denizcinin mağdur edilmesi (taciz/cezalandırma) yasaktır; denizci doğrudan kaptana ve harici yetkili mercilere başvurma hakkını saklı tutar.`,
            },
          ],
        },
        {
          subheading: "7.2 Disiplin işlemleri ve adil süreç",
          paragraphs: [
            `Gemide disiplin, keyfi değil belgeli ve adil bir süreçle yürür. Kaptan; uyarı, kayıt, SEA/CBA'da tanımlı yaptırımlar ve ağır durumda repatriation/fesih süreçlerini ölçülülük ilkesiyle uygular. Denizcinin savunma hakkı, sürecin yazılı kaydı ve tanık ifadeleri önemlidir. Aşırı veya keyfi disiplin, hem MLC ihlali hem de ileride iş hukuku davası kaynağıdır.`,
            `Alkol/uyuşturucu politikası (drug & alcohol policy) emniyet kritiktir ve genelde sıfır tolerans ya da düşük limit (ör. 0.05 BAC veya altı) üzerinedir; ihlali ağır disiplin gerektirir. Kaptan, rastgele ve nedene dayalı testleri SMS'e uygun, gizlilik ve onurla yürütür. Disiplin ile zorbalık (bullying) arasındaki çizgiyi korumak kaptanın liderlik sorumluluğudur.`,
          ],
        },
        {
          subheading: "7.3 Ayrımcılık, taciz ve zorbalık yasağı",
          paragraphs: [
            `MLC ve ILO ilkeleri; ırk, renk, cinsiyet, din, siyasi görüş, ulusal/sosyal köken temelli ayrımcılığı yasaklar. 2016 sonrası gelişen rehberler (ICS/ITF Guidance on Eliminating Harassment & Bullying) gemide taciz ve zorbalığın önlenmesini açıkça ele alır. Çok uluslu mürettebatlarda kültürel duyarlılık, ortak dil (çalışma dili) disiplini ve eşit muamele kaptanın günlük yönetiminin parçasıdır.`,
            `Kaptan, taciz/zorbalık iddialarını ciddiye alır, gizlilikle ve adil biçimde soruşturur; mağduru koruyup misillemeyi engeller. Kadın denizcilerin artan varlığıyla cinsel taciz ve güvenli ortam konusu öne çıktı; pek çok şirket artık net "zero tolerance" politikası ve raporlama kanalı (gemi dışı, anonim hat dahil) sağlar. İyi bir refah yönetimi, sorunların gizlenmediği güvenli bir iklim kurmaktan geçer.`,
          ],
        },
      ],
    },
    {
      heading: "8. PSC ve Flag State Denetiminde MLC",
      sections: [
        {
          subheading: "8.1 PSC'nin MLC kontrol başlıkları",
          paragraphs: [
            `PSC denetçisi MLC açısından 14 başlığı kontrol eder: asgari yaş, medikal sertifika, denizcilerin yeterliği, SEA, lisanslı recruitment, çalışma/dinlenme saatleri, manning, barınma, eğlence tesisleri, yiyecek/catering, sağlık-emniyet ve kaza önleme, gemide tıbbi bakım, gemi-içi şikâyet prosedürü, ücret ödemesi. "Clear grounds" (denizci şikâyeti, görünür ihlal, geçersiz belge) varsa detaylı denetim yapılır. Rest hours kayıt tutarsızlığı, ödenmemiş maaş ve geçersiz SEA en sık tespit edilen ihlallerdir.`,
            `Kaptan, denetim öncesi kendi MLC dosyasını (sertifika, DMLC I/II, SEA örnekleri, rest hours kayıtları, payroll, accommodation inspection kayıtları, şikâyet prosedürü) hazır tutar. Tutarlı ve dürüst kayıt, denetimi hızlandırır; çelişkili veya eksik kayıt detention riski yaratır. Düzeltilebilir bulgular limanda kapatılır; ciddi/tekrarlayan ihlal gemiyi tutturur.`,
          ],
          table: {
            caption: `Sık Görülen MLC Bulguları ve Sonuçları`,
            headers: ["Bulgu", "Tipik Kök Neden", "Olası Sonuç"],
            rows: [
              ["Rest hours ihlali", "Yetersiz manning, aşırı liman işi", "Deficiency / detention"],
              ["Ödenmemiş maaş", "Armatör finansal sıkıntısı", "Detention + ITF arrest"],
              ["Geçersiz/eksik SEA", "Sözleşme güncellenmemiş", "Deficiency"],
              ["Dolmuş medikal sertifika", "Crew change planlanmamış", "Detention"],
              ["Kötü barınma/hijyen", "Bakım ihmali", "Deficiency / detention"],
              ["Şikâyet prosedürü yok", "Belge gemide eksik", "Deficiency"],
            ],
          },
        },
        {
          subheading: "8.2 Kaptanın kanıt yükü ve kayıt disiplini",
          paragraphs: [
            `MLC'de kaptanın savunması "kayıt"tır. Rest hours çizelgeleri günlük tutulur ve denizci tarafından onaylanır; geriye dönük doldurmak (back-filling) tespit edildiğinde tüm kayıtların güvenilirliği çöker. Accommodation inspection, su testi, ilaç dolabı envanteri, payroll ve şikâyet kayıtları tarih ve imzayla saklanır. Bu kayıtlar hem PSC hem flag state hem de ileride iş hukuku davası için kanıttır.`,
            `Kaptan, kendi "Master's Review" (ISM) sürecine MLC uygunluğunu da dahil eder; tespit edilen eksiklikleri ve düzeltici faaliyetleri DPA'ya raporlar. MLC, ISM ile entegre yönetildiğinde sürdürülebilir olur; iki sistemi ayrı tutmak çift kayıt ve boşluk yaratır.`,
          ],
        },
      ],
    },
    {
      heading: "9. Yorgunluk Yönetimi ve İnsan Faktörü",
      sections: [
        {
          subheading: "9.1 Fatigue: kâğıt uyumu vs gerçek dinlenme",
          paragraphs: [
            `Yorgunluk, denizcilik kazalarının en yaygın insan faktörü kök nedenidir (Exxon Valdez, Cosco Busan ve sayısız oturma/çatışmada tespit edilmiştir). MSC.1/Circ.1598 (Guidelines on Fatigue), uyku borcu, sirkadiyen ritim, monotonluk ve iş yükü gibi faktörleri ele alır. Kaptanın en kritik sorumluluğu, rest hours'ın "kâğıt üzerinde uyumlu görünmesi" ile "denizcinin gerçekten dinlenmiş olması" arasındaki farkı kapatmaktır.`,
            `Yetersiz manning (eksik personel) yorgunluğun yapısal nedenidir; kaptan, manning'in operasyona yetmediğini tespit ederse bunu DPA'ya raporlar ("under-manning" emniyet ve MLC sorunudur). Yoğun liman rotasyonu, sık PSC/vetting, drill ve acil durumlar rest hours'ı baskılar; kaptan, planlamayı bu gerçekliğe göre yapar ve gerekirse operasyonu yavaşlatma kararını overriding authority ile alır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Sahte rest hours kaydı tuzağı",
              text: `Manning yetersizken rest hours'ı "uyumlu göstermek" için sahte kayıt tutmak, kaptanı çift riske sokar: hem MLC ihlalini gizler hem de kaza halinde sahte belge suçu doğar. Doğru yol, gerçeği kaydedip yetersizliği DPA'ya eskale etmektir; sorumluluk armatörün manning kararındadır.`,
            },
          ],
        },
        {
          subheading: "9.2 Çok uluslu mürettebat ve kültürel yönetim",
          paragraphs: [
            `Modern gemilerde mürettebat çoğunlukla çok uluslu ve çok kültürlüdür (Filipinli, Hintli, Ukraynalı, Çinli, Endonezyalı vb.). Kaptanın refah yönetimi; ortak çalışma dilinde (genelde İngilizce) net iletişim, dini/kültürel uygulamalara saygı (mönü, ibadet zamanı, bayramlar), eşit muamele ve gruplaşma/dışlamayı önlemeyi kapsar. Kültürel duyarlılık, gemi içi gerilimi azaltan ve emniyet kültürünü güçlendiren bir liderlik becerisidir.`,
            `Dil bariyeri, emniyet brifinglerinde ve acil durumda ciddi risktir; kaptan, kritik talimatların herkesçe anlaşıldığını teyit eder, gerekirse görsel/çoklu dilde materyal kullanır. Refah ve emniyet, çok uluslu bir ekipte birbirini besler: değer gördüğünü hisseden mürettebat daha güvenli çalışır.`,
          ],
        },
      ],
    },
    {
      heading: "10. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Kaptanın MLC refah yönetimi checklist'i",
          bullets: [
            `Geçerli MLC Certificate + DMLC Part I/II gemide, görünür ve fiili uygulamayla tutarlı mı?`,
            `Her denizcinin imzalı SEA'sı (ve varsa CBA) gemide ve denizcide mevcut mu?`,
            `Rest hours kayıtları günlük, dürüst ve denizci onaylı mı? (back-filling YOK)`,
            `Maaşlar SEA/CBA'ya uygun, zamanında ve payslip ile belgeli ödeniyor mu?`,
            `Medikal ve STCW sertifikaları geçerli mi? Crew change ile süre takibi yapılıyor mu?`,
            `Repatriation ve abandonment finansal güvence sertifikaları gemide ve asılı mı?`,
            `Accommodation inspection düzenli yapılıp kayda geçiyor mu? Klima/hijyen/su çalışıyor mu?`,
            `Yiyecek yeterli, çeşitli, hijyenik mi? İçme suyu test ediliyor mu? Aşçı kalifiye mi?`,
            `İlaç dolabı envanter/SKT güncel mi? TMAS ve MEDEVAC prosedürü hazır mı?`,
            `Gemi-içi şikâyet prosedürü yazılı, herkese dağıtık ve harici irtibatları içeriyor mu?`,
            `Disiplin adil ve belgeli mi? Ayrımcılık/taciz/zorbalık önleme politikası uygulanıyor mu?`,
            `Manning operasyona yeterli mi? Yetersizse DPA'ya raporlandı mı?`,
          ],
          paragraphs: [
            `MLC 2006, kaptanın "iyi niyetle" değil "belgeyle" yönetmesi gereken bir alandır: rest hours kaydından maaş bordrosuna, accommodation inspection'dan şikâyet prosedürüne kadar her hak, bir kayıtla görünür olmalıdır. Ancak MLC'nin asıl ruhu kâğıtta değil, gemideki insanlardadır; uyumlu kayıtlar tutup yorgun, ödenmemiş ve değersiz hisseden bir mürettebat yaratmak, hem MLC'nin amacına aykırıdır hem de er ya da geç emniyet kazasına dönüşür. Bilge kaptan, mürettebatının haklarını korurken aynı zamanda en güçlü emniyet yatırımını yaptığını bilir: dinlenmiş, ödenmiş, sağlıklı ve onuru korunan bir mürettebat, denizdeki en güvenilir savunma hattıdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
