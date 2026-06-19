import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Elektrik güvenliği ve izolasyon",
  roleSlug: "eto",
  taskIndex: 6,
  estimatedPages: 25,
  intro: `Elektrik çalışmaları, gemideki en yüksek riskli görevlerden biridir; bir hata elektrik çarpması, arc flash veya yangınla sonuçlanabilir. Elektro-Teknik Zabit (ETO); izolasyon (LOTO) prosedürlerinin uygulanmasından, topraklama doğruluğundan, insulation monitoring sistemlerinin yönetiminden, arc flash risk değerlendirmesinden ve özellikle yüksek gerilim (6.6 kV) sistemlerin emniyetli işletiminden sorumludur. Bu bölüm, gemide elektrik güvenliği kültürünü ve teknik tedbirleri somut prosedürlerle, mevzuat referanslarıyla ve vaka dersleriyle adım adım anlatır.`,
  sources: [
    "STCW Code A-III/6 — Electro-technical officer competence (safety functions)",
    "ISM Code — güvenli çalışma uygulamaları ve risk değerlendirmesi",
    "SOLAS Chapter II-1 Part D — Electrical Installations",
    "IEC 60092 — Electrical Installations in Ships (izolasyon sistemi)",
    "IEEE 1584 — Guide for Performing Arc-Flash Hazard Calculations",
    "NFPA 70E — Electrical Safety in the Workplace (referans pratik)",
    "IACS UR E / sınıf kuralları (HV safety, insulation monitoring)",
    "Code of Safe Working Practices for Merchant Seafarers (COSWP)",
  ],
  chapters: [
    {
      heading: "1. Elektriksel Tehlikeler ve Gemi Ortamının Özellikleri",
      lead: `Gemi, dar mahaller, nem, titreşim, sınırlı kaçış yolu ve izole şebeke gibi karaya göre özgün riskler taşır. ETO bu riskleri tanımalı ve tedbirleri buna göre tasarlamalıdır.`,
      sections: [
        {
          subheading: "1.1 Elektrik çarpması ve arc flash riski",
          paragraphs: [
            `Elektrik çarpması, akımın vücuttan geçmesiyle oluşur; gemi ortamındaki nem ve metal yapı toprak temasını artırarak riski yükseltir. 50 mA AC akım kalp fibrilasyonuna yol açabilir; bu nedenle dokunma gerilimi sınırları (genellikle 50 V AC) kritiktir. Arc flash ise kısa devre arkının saniyenin küçük bir kısmında 19.000°C'ye ulaşan plazma ve basınç dalgası yaratmasıdır.`,
            `ETO, her çalışmada gerilim seviyesini, mevcut kısa devre akımını ve mahallin koşullarını değerlendirir. Yüksek enerjili panolarda (main switchboard, HV switchgear) arc flash en ciddi tehlikedir; uygun PPE ve mesafe olmadan enerjili çalışma yapılmaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Enerjili çalışmadan kaçının",
              text: `Temel kural: çalışmadan önce izole et, kilitle, etiketle ve gerilimsizliği teyit et. Enerjili çalışma yalnızca kaçınılmaz, gerekçelendirilmiş ve risk değerlendirmesi yapılmış istisnai durumlarda, uygun PPE ve ikinci bir kişi gözetiminde yapılır.`,
            },
          ],
        },
        {
          subheading: "1.2 İzole (IT) şebeke ve toprak arızası davranışı",
          paragraphs: [
            `Gemi şebekeleri genellikle izole (IT) topraklamalıdır: nötr toprağa bağlı değildir. Bu, ilk toprak arızasında işletimin durmamasını (süreklilik avantajı) sağlar, ancak ikinci bir arıza faz-faz kısa devresine dönüşür. ETO, insulation monitoring device (IMD) ile ilk arızayı tespit eder ve ikinci arıza oluşmadan giderir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "IT şebeke avantaj ve riski",
              text: `İzole şebeke, kritik gemi sistemlerinin ilk toprak arızasında çalışmaya devam etmesini sağlar. Ancak bu bir "boş çek" değildir: ilk arıza derhal araştırılıp giderilmelidir, aksi halde ikinci arıza ciddi kısa devreye yol açar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. İzolasyon Prosedürleri ve LOTO",
      sections: [
        {
          subheading: "2.1 LOTO (Lockout-Tagout) adımları",
          paragraphs: [
            `LOTO, bir ekipmanın enerjisinin güvenli şekilde kesilip kazara yeniden enerjilenmesinin önlenmesidir. ETO, standart sekansı uygular: çalışmayı planla ve bildir, ilgili güç kaynaklarını belirle, anahtarları/breaker'ı aç, fiziksel kilit (lock) tak, uyarı etiketi (tag) as, depolanmış enerjiyi boşalt (kapasitör, motor ataleti) ve son olarak gerilimsizliği ölç.`,
            `Anahtar (kilit) yalnızca işi yapan kişide olmalıdır; "tek kişi-tek kilit" ilkesi geçerlidir. Çoklu çalışan durumunda her kişi kendi kilidini takar (group lockout). ETO, izolasyonun kaldırılmasının da kontrollü olduğunu garanti eder: önce alan kontrolü, sonra etiket/kilit kaldırma, en son enerjilendirme.`,
          ],
          table: {
            caption: `LOTO Adım Sırası`,
            headers: ["Adım", "İşlem", "Doğrulama"],
            rows: [
              ["1", "Planla ve bildir", "Permit to Work açık mı?"],
              ["2", "İzole et (breaker/switch aç)", "Doğru kaynak izole edildi mi?"],
              ["3", "Kilitle (lock)", "Fiziksel kilit takılı mı?"],
              ["4", "Etiketle (tag)", "Uyarı etiketi asılı mı?"],
              ["5", "Depolanmış enerjiyi boşalt", "Kapasitör/mekanik enerji boşaldı mı?"],
              ["6", "Gerilimsizliği ölç", "Voltage detector ile teyit"],
            ],
          },
        },
        {
          subheading: "2.2 Permit to Work ve test cihazı doğrulaması",
          paragraphs: [
            `Yüksek riskli elektrik işlerinde Permit to Work (PTW) sistemi uygulanır: iş tanımı, izolasyon listesi, riskler, PPE ve onay imzaları belgelenir. ETO, gerilimsizliği ölçen voltage detector'ı kullanmadan önce ve sonra bilinen bir kaynakta test eder (prove-test-prove ilkesi); böylece cihazın sağlam olduğu garanti edilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Prove-Test-Prove (Live-Dead-Live)",
              text: `Gerilimsizliği teyit ederken voltage detector'ı önce bilinen canlı bir kaynakta dene (çalışıyor), sonra çalışılacak noktada ölç (ölü), sonra tekrar bilinen canlı kaynakta dene (hâlâ çalışıyor). Bu üç adım, cihazın test sırasında bozulmadığını garanti eder.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Topraklama ve Earthing Kontrolü",
      sections: [
        {
          subheading: "3.1 Koruyucu topraklama (protective earth) sistemi",
          paragraphs: [
            `Gemide gövde (hull), referans toprak görevi görür; tüm metal ekipman gövdeleri koruyucu topraklama (PE) ile bonding edilir. Bu, bir yalıtım arızasında dokunma gerilimini sınırlar. ETO, ekipman topraklama bağlantılarının bütünlüğünü, korozyonu ve gevşekliği periyodik kontrol eder; özellikle taşınabilir cihazların ve geçici bağlantıların topraklaması titizlikle doğrulanır.`,
          ],
        },
        {
          subheading: "3.2 Çalışma topraklaması (working earth)",
          paragraphs: [
            `HV ve yüksek enerjili sistemlerde izolasyondan sonra, kalan/indüklenen gerilime karşı çalışma topraklaması (earthing/grounding) uygulanır. ETO, earthing switch veya portable earthing set ile çalışılacak bölümü kasıtlı olarak topraklar; böylece kazara enerjilenme veya kapasitif/indüktif gerilim çalışan için tehlike oluşturmaz. Earthing, iş bitince son adımda kaldırılır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "HV çalışmada earthing zorunluluğu",
              text: `Yüksek gerilim sistemlerinde izolasyon tek başına yeterli değildir; çalışılacak bölüm açıkça topraklanmalıdır (earth applied). Earthing'in uygulandığı ve kaldırıldığı, switching program/permit üzerinde kayıt altına alınır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Insulation Monitoring (İzolasyon İzleme)",
      sections: [
        {
          subheading: "4.1 IMD çalışması ve alarm yönetimi",
          paragraphs: [
            `Insulation Monitoring Device (IMD), izole şebekede sürekli olarak faz-toprak yalıtım direncini ölçer ve belirlenen eşiğin altına düşünce alarm verir. ETO, IMD alarmını asla göz ardı etmez; bu, gelişen bir toprak arızasının ilk ve tek uyarısı olabilir. Alarm sonrası, branch-by-branch (devre devre) yöntemiyle arızalı tüketici izole edilir.`,
            `ETO, IMD'nin alarm setpoint'ini (tipik olarak birkaç yüz kΩ ile birkaç kΩ aralığında, sistem gerilimine göre) ve test fonksiyonunu düzenli kontrol eder. Bazı modern IMD'ler arızalı devreyi otomatik lokalize edebilir (EDS - insulation fault location), bu arıza arama süresini büyük ölçüde kısaltır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "İlk toprak arızasını geciktirmeyin",
              text: `İzole şebekede ilk toprak arızası işletimi durdurmaz, bu yüzden "sonra bakarım" tuzağına düşülür. Ancak ikinci arıza geldiğinde sonuç faz-faz kısa devresi, breaker trip ve olası blackout'tur. İlk arıza vakit kaybetmeden bulunup giderilmelidir.`,
            },
          ],
        },
        {
          subheading: "4.2 Megger ile periyodik yalıtım ölçümü",
          paragraphs: [
            `IMD sürekli izleme yapsa da, ETO devre/ekipman bazında periyodik megger ölçümleri ile kademeli yalıtım bozulmasını trend olarak takip eder. Ölçümler sıcaklığa göre düzeltilir ve kayıt altına alınır; düşen trend, henüz alarm vermeyen ama gelişmekte olan bir sorunu erken haber verir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Arc Flash Risk Değerlendirmesi",
      sections: [
        {
          subheading: "5.1 Arc flash enerjisi ve sınır mesafeleri",
          paragraphs: [
            `Arc flash, mevcut kısa devre akımı ve arkın temizlenme süresine bağlı olarak büyük termal enerji açığa çıkarır (incident energy, cal/cm²). ETO, IEEE 1584 metodolojisine göre kritik panolarda arc flash enerjisini ve güvenli yaklaşma sınırlarını (arc flash boundary) değerlendirir. Yüksek enerjili panolarda uygun arc-rated PPE seviyesi belirlenir.`,
          ],
          table: {
            caption: `Arc Flash PPE Kategorileri (örnek, IEEE/NFPA 70E referans)`,
            headers: ["Kategori", "Min. Arc Rating", "Tipik PPE"],
            rows: [
              ["1", "4 cal/cm²", "Arc-rated gömlek/pantolon, yüz siperi"],
              ["2", "8 cal/cm²", "Arc-rated kıyafet, balaclava, eldiven"],
              ["3", "25 cal/cm²", "Arc flash suit, hood"],
              ["4", "40 cal/cm²", "Tam arc flash suit, hood, yalıtımlı eldiven"],
            ],
          },
        },
        {
          subheading: "5.2 Enerjiyi azaltma ve etiketleme",
          paragraphs: [
            `Arc flash riskini azaltmak için koruma rölelerinin temizleme süresinin kısaltılması, bakım modunda (maintenance switch) koruma ayarının hızlandırılması ve enerjili çalışmanın elimine edilmesi temel stratejilerdir. ETO, yüksek enerjili panolara arc flash uyarı etiketi (incident energy, boundary, gerekli PPE) asılmasını sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "6. Nemli ve Özel Ortamlarda Elektrik Güvenliği",
      sections: [
        {
          subheading: "6.1 Nemli mahaller, tanklar ve sınırlı alanlar",
          paragraphs: [
            `Makine dairesi sintinesi, tank içleri, kazan dairesi ve dış güverte gibi nemli/iletken ortamlarda elektrik çarpması riski artar. Bu mahallerde düşük gerilimli (örn. 24 V) el lambaları, çift yalıtımlı veya topraklanmış taşınabilir aletler ve gerektiğinde yalıtım trafosu kullanılır. ETO, taşınabilir ekipmanın bu mahallere uygunluğunu doğrular.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Tank/sınırlı alanda güvenli aydınlatma",
              text: `İletken ve dar mahallerde yalnızca düşük gerilim (tipik 24 V SELV) ile beslenen el lambaları kullanın. 230 V taşınabilir aletler bu ortamlarda kullanılmamalı; gerekirse yalıtım trafosu ve RCD ile ek koruma sağlanmalıdır.`,
            },
          ],
        },
        {
          subheading: "6.2 Ex-proof bölgeler ve patlayıcı ortam",
          paragraphs: [
            `Tankerlerde ve gaz tehlikesi olan mahallerde elektrik ekipmanı patlama korumalı (Ex) tip olmalıdır. ETO, Ex ekipmanın bütünlüğünü (flameproof yuva, conta, cıvata tam takımı) korur; bir Ex armatürün açılması veya yanlış onarımı koruma sınıfını geçersiz kılar ve patlama riski yaratır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Yüksek Gerilim (6.6 kV) Özel Güvenlik Prosedürleri",
      sections: [
        {
          subheading: "7.1 HV switching ve yetkilendirme",
          paragraphs: [
            `6.6 kV ve üzeri HV sistemlerde her manevra, yazılı switching program ve Permit to Work ile yapılır. ETO, ilave HV eğitimi belgesine sahip olmalı ve yetkili kişi (authorized person) statüsünde çalışmalıdır. Switching sırası önceden yazılır, ikinci bir kişi tarafından kontrol edilir ve her adım imzalanarak uygulanır.`,
            `İzolasyon, gerilimsizlik teyidi (HV voltage detector ile, prove-test-prove ile), earthing uygulaması ve fiziksel kilitleme zorunlu sekanstır. ETO, HV insulated PPE'yi (Class 2/3 yalıtımlı eldiven, arc flash suit, yalıtımlı paspas) kullanır ve eldivenlerin periyodik basınç testinden geçtiğini doğrular.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "HV çalışma yetkisi ve eğitimi",
              text: `STCW A-III/6, 1000 V üzeri sistemlerde çalışacak ETO için ek HV yetkinliği şart koşar. HV switchgear üzerinde yalnızca yetkilendirilmiş, eğitimli personel; yazılı permit, switching program ve doğrulanmış earthing ile çalışabilir.`,
            },
          ],
        },
        {
          subheading: "7.2 HV PPE ve mesafe disiplini",
          paragraphs: [
            `HV sistemlerde gerilime asgari yaklaşma mesafeleri (approach distance) kesinlikle korunur. Yalıtımlı eldivenler her kullanımdan önce hava sızıntısı (inflation) testiyle kontrol edilir, periyodik dielektrik testten geçirilir ve mekanik koruma için deri üst eldivenle kullanılır. ETO, HV PPE envanterinin sertifika ve test geçerlilik tarihlerini takip eder.`,
          ],
        },
      ],
    },
    {
      heading: "8. Vaka Dersleri ve Olay Analizi",
      sections: [
        {
          subheading: "8.1 Yetersiz izolasyon kaynaklı olay",
          paragraphs: [
            `Pek çok elektrik kazasının kök nedeni eksik veya doğrulanmamış izolasyondur: yanlış breaker'ın açılması, gerilimsizliğin ölçülmemesi veya çoklu beslemenin (örn. UPS, başka bir bara) atlanması. ETO, izolasyon listesinin tüm besleme kaynaklarını kapsadığını ve gerilimsizliğin fiziksel olarak ölçüldüğünü garanti eder.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Atlanan ikinci besleme",
              text: `Bir bakım sırasında pano ana breaker'ı açıldı ama panoyu besleyen bir UPS hattı atlandı; teknisyen gerilimsizliği ölçmeden çalışınca çarpıldı. Ders: izolasyon listesi TÜM besleme kaynaklarını içermeli ve gerilimsizlik her noktada ölçülmelidir.`,
            },
          ],
        },
        {
          subheading: "8.2 Güvenlik kültürü ve raporlama",
          paragraphs: [
            `Elektrik güvenliği, prosedürler kadar kültüre bağlıdır. ETO, ramak kala (near-miss) olaylarının çekincesiz raporlanmasını teşvik eder, toolbox talk'larda elektrik risklerini paylaşır ve genç ekip üyelerine LOTO disiplinini öğretir. Güvenlik, en yetkin kişinin bile kestirme yapmadığı ortamda gerçekleşir.`,
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Elektrik güvenliği kontrol listesi",
          bullets: [
            `Çalışma için Permit to Work açıldı ve izolasyon listesi tüm kaynakları kapsıyor mu?`,
            `LOTO uygulandı: izole, kilit, etiket, depolanmış enerji boşaltıldı mı?`,
            `Gerilimsizlik prove-test-prove ile ölçüldü mü?`,
            `HV çalışmada earthing uygulandı ve kayıt altına alındı mı?`,
            `Topraklama bağlantıları bütün, korozyonsuz ve sıkı mı?`,
            `IMD alarmları temiz, periyodik megger trendi stabil mi?`,
            `Yüksek enerjili panolarda arc flash etiketi ve uygun PPE mevcut mu?`,
            `Nemli/sınırlı alanda düşük gerilimli aydınlatma kullanıldı mı?`,
            `Ex bölgelerde ekipman bütünlüğü korunuyor mu?`,
            `HV PPE (eldiven, suit) sertifika ve test tarihleri geçerli mi?`,
          ],
          paragraphs: [
            `Elektrik güvenliği, ETO'nun pazarlık konusu olmayan birinci önceliğidir. İzole et, kilitle, etiketle, ölç ve gerektiğinde topraklayın disiplini; bir hatanın ölümcül sonuca dönüşmesini engelleyen sade ama hayat kurtaran zincirdir. ETO'nun başarısı, sıfır elektrik kazası ile çalışan bir gemiyle ve bu disiplini tüm ekibe aşılamasıyla ölçülür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
