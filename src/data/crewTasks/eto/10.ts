import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Batarya bankaları ve enerji depolama yönetimi",
  roleSlug: "eto",
  taskIndex: 10,
  estimatedPages: 25,
  intro: `Bataryalar, geminin sessiz ama kritik enerji rezervidir: GMDSS, acil aydınlatma, transitional güç, engine start ve UPS sistemleri bataryalara dayanır. Elektro-Teknik Zabit (ETO); kurşun-asit (vented/VRLA), Ni-Cd ve modern Li-ion batarya banklarının elektrolit/voltaj/spesifik gravite izlemesinden, şarj/deşarj kapasite testinden, batarya odası havalandırması ve hidrojen güvenliğinden, Li-ion sistemlerde thermal runaway izleme ve özel yangın söndürmeden sorumludur. Bu bölüm, batarya yönetimini güvenlik ve güvenilirlik odağıyla somut prosedürlerle anlatır.`,
  sources: [
    "STCW Code A-III/6 — Electro-technical officer competence table",
    "SOLAS Chapter IV — GMDSS reserve source of energy",
    "SOLAS Chapter II-1 — emergency & transitional battery sistemleri",
    "IEC 60092-401/507 — Electrical Installations in Ships (batteries)",
    "IEEE 450 / 1188 / 1106 — battery maintenance & testing (vented/VRLA/NiCd)",
    "IACS / sınıf kuralları — battery rooms, ventilation, Li-ion notations",
    "IEC 62619 / sınıf kılavuzları — marine Li-ion safety",
    "Batarya üreticisi (OEM) bakım el kitapları",
  ],
  chapters: [
    {
      heading: "1. Gemi Batarya Sistemleri ve Görevleri",
      lead: `Her batarya bankının ayrı bir kritik görevi vardır; ETO bu görevleri, kimyaları ve bakım gereksinimlerini ayırt etmelidir.`,
      sections: [
        {
          subheading: "1.1 Batarya uygulamaları ve kimya seçimi",
          paragraphs: [
            `Gemide bataryalar farklı görevlere hizmet eder: GMDSS reserve (haberleşme), emergency/transitional (acil güç köprüleme), engine start (generator/lifeboat), UPS (kritik IT/seyir) ve giderek hibrit/elektrikli tahrik için enerji depolama. Kimya seçimi göreve göre değişir: kurşun-asit (yüksek akım, ekonomik), Ni-Cd (geniş sıcaklık, dayanıklı), Li-ion (yüksek enerji yoğunluğu).`,
            `ETO, her bankın nominal voltajını, kapasitesini (Ah), uygulamasını ve kimyasını bilmelidir; bakım rejimi ve güvenlik tedbirleri kimyaya göre farklılaşır. Vented (sulu) kurşun-asit ve Ni-Cd düzenli su ekleme ve havalandırma gerektirirken, VRLA ve Li-ion bakım açısından farklı yaklaşımlar gerektirir.`,
          ],
          table: {
            caption: `Batarya Kimyaları — Karşılaştırma`,
            headers: ["Kimya", "Avantaj", "Bakım/Risk"],
            rows: [
              ["Vented kurşun-asit", "Yüksek akım, ekonomik", "Su ekleme, H₂ gazı, asit"],
              ["VRLA (kapalı)", "Bakım azlığı", "Sıcaklığa duyarlı, ömür sınırı"],
              ["Ni-Cd", "Dayanıklı, geniş sıcaklık", "Su ekleme, memory etkisi"],
              ["Li-ion", "Yüksek enerji yoğunluğu", "Thermal runaway, özel BMS/yangın"],
            ],
          },
        },
        {
          subheading: "1.2 Yasal besleme gereksinimleri",
          paragraphs: [
            `GMDSS reserve batarya, ana ve acil güç kaybında GMDSS ekipmanını SOLAS gereği (emergency generator varsa 1 saat, yoksa 6 saat) beslemelidir. Transitional acil batarya, emergency generator devreye girene kadar (genellikle 30 dk) zorunlu yükleri köprüler. ETO bu sürelerin gerçek kapasite testiyle doğrulandığından emin olur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS IV — GMDSS reserve",
              text: `GMDSS reserve energy source, ana ve acil güç kaybında GMDSS'i belirlenen süre (em. gen varsa 1 saat, yoksa 6 saat) beslemeli ve bağımsız bir şarj cihazıyla şarj edilmelidir. Kapasitesi yılda en az bir kez gerçek deşarj testiyle doğrulanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Kurşun-Asit Batarya Bakımı (Vented/VRLA)",
      sections: [
        {
          subheading: "2.1 Elektrolit seviyesi ve spesifik gravite",
          paragraphs: [
            `Vented (sulu) kurşun-asit bataryalarda şarj sırasında su elektroliz olur ve seviye düşer. ETO, elektrolit seviyesini periyodik kontrol eder ve yalnızca saf (deiyonize/distile) su ekler; asit eklenmez. Spesifik gravite (SG) hidrometre ile ölçülür: tam dolu hücre ~1.270-1.280, deşarj olmuş ~1.120 civarındadır. SG, şarj durumunun doğrudan göstergesidir.`,
            `ETO, hücreler arası SG farkını izler; büyük fark (örn. >0.030) zayıf veya kısa devre bir hücreyi işaret eder. VRLA bataryalarda elektrolit erişilemez olduğundan SG ölçülemez; bunun yerine terminal voltajı, iç direnç (impedance) ve sıcaklık izlenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Asit ve gaz güvenliği",
              text: `Kurşun-asit bataryalarla çalışırken asit sıçramasına karşı yüz siperi, asit dirençli eldiven ve önlük kullanın; göz duşu/yıkama suyu yakında olmalıdır. Asla asit eklemeyin, yalnızca saf su. Metal takı ve aletlerle terminaller arasında kısa devre yapmaktan kaçının.`,
            },
          ],
        },
        {
          subheading: "2.2 Terminal, bağlantı ve şarj durumu",
          paragraphs: [
            `Batarya terminalleri korozyona (sülfat birikimi) eğilimlidir; ETO terminalleri temiz, sıkı ve koruyucu jelle (petrolatum) korunmuş tutar. Gevşek/korozyonlu bağlantı yüksek direnç, ısınma ve voltaj düşüşü yaratır. Şarj cihazının çıkış voltajı ve akımı, batarya tipine uygun (float/boost/equalize) ve sıcaklık kompanzasyonlu olmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Ni-Cd Batarya Bakımı",
      sections: [
        {
          subheading: "3.1 Ni-Cd karakteristiği ve bakımı",
          paragraphs: [
            `Ni-Cd bataryalar dayanıklıdır, geniş sıcaklık aralığında çalışır ve derin deşarjı kurşun-asitten daha iyi tolere eder; bu yüzden GMDSS ve engine start uygulamalarında tercih edilir. ETO, elektrolit (potasyum hidroksit, KOH alkali) seviyesini saf su ile tamamlar ve hücre voltajlarını izler. KOH alkali olduğundan asit değil, alkali güvenlik tedbirleri gerekir.`,
            `Ni-Cd'de SG, kurşun-asitteki gibi şarj durumunu göstermez; KOH yoğunluğu deşarjla anlamlı değişmez. Bu nedenle şarj durumu voltaj ve kapasite testiyle değerlendirilir. ETO, üreticinin önerdiği periyodik tam şarj/deşarj çevrimi ile kapasiteyi korur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "KOH = alkali, asit değil",
              text: `Ni-Cd elektroliti KOH (potasyum hidroksit) alkalidir; kurşun-asit elektrolitiyle (sülfürik asit) aletler veya kaplar karıştırılmamalıdır. Alkali, asitle nötralizasyonda tehlikeli reaksiyon verir. Ayrı bakım ekipmanı ve uygun KOH dirençli PPE kullanın.`,
            },
          ],
        },
        {
          subheading: "3.2 Kapasite testi ve hücre dengesi",
          paragraphs: [
            `ETO, Ni-Cd bankının kapasitesini periyodik deşarj testiyle doğrular ve hücre voltaj dengesini izler. Zayıf hücreler tüm bankın performansını düşürür; gerekirse hücre değiştirilir. Test sonuçları kaydedilir ve trend takip edilir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Li-ion Sistemleri ve Özel Güvenlik",
      sections: [
        {
          subheading: "4.1 BMS ve thermal runaway izleme",
          paragraphs: [
            `Li-ion bataryalar yüksek enerji yoğunluğu sunar ancak aşırı şarj, aşırı deşarj, fiziksel hasar veya aşırı sıcaklıkta thermal runaway (kontrolsüz ısı/yangın) riski taşır. Bu nedenle Li-ion bankları zorunlu olarak bir Battery Management System (BMS) ile çalışır; BMS hücre voltajı, sıcaklık ve akımı izler, dengeler ve sınır aşımında izolasyon yapar. ETO, BMS alarmlarını ve sağlığını yakından takip eder.`,
            `ETO, Li-ion sistemde hücre sıcaklık sensörlerini, soğutma sistemini ve BMS izolasyon kontaktörlerini periyodik kontrol eder. Şişen, sızan veya anormal ısınan hücre derhal izole edilir. Li-ion bakımı vendor onaylı eğitim ve prosedür gerektirir; gelişigüzel müdahale tehlikelidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Thermal runaway tehlikesi",
              text: `Li-ion thermal runaway, kendi kendini besleyen bir zincirleme ısınmadır ve toksik/yanıcı gaz açığa çıkarır; komşu hücrelere yayılabilir (propagation). Anormal sıcaklık/şişme tespit edilen hücre derhal izole edilmeli, BMS alarmları asla göz ardı edilmemelidir.`,
            },
          ],
        },
        {
          subheading: "4.2 Li-ion yangın söndürme ve müdahale",
          paragraphs: [
            `Li-ion yangınları geleneksel söndürmeye dirençlidir ve büyük miktarda soğutma (su) ile re-ignition (yeniden tutuşma) riski taşır. Gemideki Li-ion enerji depolama sistemleri özel yangın algılama (gaz/ısı), söndürme ve havalandırma düzenekleriyle donatılır. ETO, bu sistemlerin sağlığını ve müdahale prosedürünün ekipçe bilindiğini sağlar.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Marine Li-ion sınıf gereksinimleri",
              text: `Sınıf kuruluşları, gemideki büyük Li-ion sistemleri için özel notation ve gereksinimler (hücre seçimi, BMS, gaz tahliyesi, yangın algılama/söndürme, thermal propagation testi) tanımlar. Bu sistemler vendor + sınıf onaylı tasarım ve eğitim gerektirir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Batarya Odası Havalandırması ve Hidrojen Güvenliği",
      sections: [
        {
          subheading: "5.1 Hidrojen birikimi ve patlama riski",
          paragraphs: [
            `Kurşun-asit ve Ni-Cd bataryalar şarj sırasında hidrojen (H₂) gazı üretir; H₂ havayla %4-75 aralığında patlayıcı karışım oluşturur (alt patlama sınırı LEL %4). Batarya odası, bu gazın birikmemesi için yeterli havalandırmaya (genellikle çatıdan doğal veya cebri) sahip olmalıdır. ETO, havalandırma fanlarının çalıştığını ve menfezlerin tıkalı olmadığını doğrular.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "H₂ — ateşleme kaynağı yasak",
              text: `Batarya odasında ve havalandırma çıkışında ateşleme kaynağı (kıvılcım, açık alev, ark yapan ekipman) kesinlikle bulunamaz; aydınlatma/anahtarlar ex-proof olmalı, "Sigara İçilmez" levhası asılı olmalıdır. Havalandırma arızası, patlayıcı H₂ birikimi anlamına gelir.`,
            },
          ],
        },
        {
          subheading: "5.2 Gaz dedektörü ve ignition-free ekipman",
          paragraphs: [
            `Bazı batarya odalarında H₂ gaz dedektörü bulunur; ETO bunun kalibrasyonunu ve alarmını kontrol eder. Odadaki tüm elektrik ekipmanı (aydınlatma, fan motoru, anahtar) ignition-free / ex-proof tip olmalıdır. ETO, oda bütünlüğünü, havalandırma menfezlerini ve dökülme (asit/elektrolit) toplama düzenini periyodik denetler.`,
          ],
        },
      ],
    },
    {
      heading: "6. Şarj/Deşarj Yönetimi ve Kapasite Testi",
      sections: [
        {
          subheading: "6.1 Şarj cihazı (charger) yönetimi",
          paragraphs: [
            `Batarya şarj cihazı, doğru voltaj/akım profilini (float, boost, equalize) sağlamalı ve sıcaklık kompanzasyonu yapmalıdır. Aşırı şarj aşırı gaz çıkışı, su kaybı ve plaka korozyonuna; yetersiz şarj sülfatlaşma ve kapasite kaybına yol açar. ETO, charger çıkış voltaj/akımını ölçer ve batarya tipine uygunluğunu doğrular.`,
          ],
          table: {
            caption: `Batarya İzleme — Tipik Kontrol Parametreleri`,
            headers: ["Parametre", "Yöntem", "Periyot"],
            rows: [
              ["Terminal voltajı", "Multimetre", "Haftalık"],
              ["Spesifik gravite (vented)", "Hidrometre", "Aylık"],
              ["Elektrolit seviyesi", "Görsel", "Aylık"],
              ["İç direnç (VRLA/impedance)", "Impedance test", "6 aylık"],
              ["Kapasite (deşarj testi)", "Load bank", "Yıllık"],
            ],
          },
        },
        {
          subheading: "6.2 Kapasite (deşarj) testi",
          paragraphs: [
            `Bir bataryanın gerçek kapasitesi ancak deşarj testiyle bilinir; voltaj normal görünse de kapasite çökmüş olabilir. ETO, kritik banklar (GMDSS, emergency) için yıllık load bank deşarj testi yapar ve kapasiteyi nominale göre değerlendirir. Kapasite belirli bir eşiğin (tipik %80) altına düşen banklar değiştirilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Voltajı normal ama kapasitesi bitik batarya",
              text: `Bir GMDSS bankı dinlenme voltajı normal görünüyordu, ancak yıllık deşarj testinde nominal kapasitenin yalnızca %55'ini verdi; yük altında hızla çöktü. Ders: voltaj tek başına yanıltıcıdır, kapasite mutlaka deşarj testiyle doğrulanmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Batarya yönetimi kontrol listesi",
          bullets: [
            `Her bankın voltajı, kimyası ve görevi kayıtlı, izleniyor mu?`,
            `Vented batarya elektrolit seviyesi ve SG kontrol edildi mi (saf su)?`,
            `Terminal bağlantıları temiz, sıkı ve korozyonsuz mu?`,
            `Ni-Cd alkali bakımı ayrı ekipmanla, doğru PPE ile yapıldı mı?`,
            `Li-ion BMS alarmları temiz, sıcaklık/soğutma sağlıklı mı?`,
            `Li-ion özel yangın algılama/söndürme sistemi çalışır durumda mı?`,
            `Batarya odası havalandırması çalışıyor, menfezler açık mı?`,
            `H₂ gaz dedektörü kalibre, ekipman ignition-free/ex-proof mu?`,
            `Charger çıkış voltaj/akım profili batarya tipine uygun mu?`,
            `Kritik banklar (GMDSS/emergency) yıllık deşarj testinden geçti mi?`,
          ],
          paragraphs: [
            `Batarya yönetimi, "iyi görünen ama çökmüş" tuzağına karşı sürekli uyanıklık ister: bir bataryanın gerçek değeri, ihtiyaç anında verebildiği kapasitedir. ETO'nun başarısı; düzenli kapasite testleriyle güvenilirliği kanıtlamak, hidrojen ve Li-ion risklerini güvenlik disipliniyle yönetmek ve kritik bir blackout veya GMDSS anında bu sessiz rezervin gerçekten devrede olmasını sağlamakla ölçülür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
