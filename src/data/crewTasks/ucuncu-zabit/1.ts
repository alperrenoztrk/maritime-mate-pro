import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "FFE kontrolü, bakım takibi ve kayıt",
  roleSlug: "ucuncu-zabit",
  taskIndex: 1,
  estimatedPages: 25,
  intro: `Üçüncü Zabit / Safety Officer, geminin yangınla mücadele teçhizatının (FFE — Fire-Fighting Equipment) sağlam, çalışır ve kullanılabilir olmasından sorumludur. Bu paket; portatif yangın tüpleri, hortumlar, nozzle'lar, hydrant'lar, SCBA, EEBD, fireman's outfit, sabit CO2/köpük/su sis sistemleri, yangın alarm sistemi, fire detection ve fire control plan'ı kapsar. Yangın ekipmanının değeri üç ayaktan oluşur: "orada durmak" (mevcudiyet), "çalışır olmak" (fonksiyon) ve "insanın onu kullanabilmesi" (yetkinlik). Son ayak ancak düzenli drill ve familiarization ile sağlanır.`,
  sources: [
    "SOLAS Chapter II-2 — Fire protection, detection and extinction",
    "FSS Code (International Code for Fire Safety Systems, Res. MSC.98(73))",
    "FTP Code (Fire Test Procedures Code)",
    "IMO Res. A.951(23) — Improved guidelines for marine portable fire extinguishers",
    "MSC.1/Circ.1432 — Maintenance & inspection of fire protection systems",
    "MSC.1/Circ.1318 — Maintenance & testing of CO2 fixed fire-extinguishing systems",
    "MSC.1/Circ.850 — Maintenance & inspection of fire-extinguishing systems",
    "Company SMS / PMS — FFE modülü",
  ],
  chapters: [
    {
      heading: "1. FFE Sisteminin Bütünü ve Sorumluluk",
      lead: `Yangın güvenliği bir tek ekipman değil, birbirini tamamlayan bir sistemdir: önleme, algılama, sınırlama ve söndürme.`,
      sections: [
        {
          subheading: "1.1 FFE envanteri ve fire control plan",
          paragraphs: [
            `Safety Officer, geminin fire control plan'ını (SOLAS II-2/15.2.4 gereği köprüüstü, makine ve şişe odası girişinde + dış mahfazada bulunur) ezbere bilmeli; her yangın istasyonunun, sabit sistemin, detection zone'unun, fire damper ve ventilation stop'unun yerini tanımalıdır. FFE envanteri Record of Equipment (Form E) ile karşılaştırılarak doğrulanır.`,
            `Sistem dört katmandan oluşur: passive protection (A/B class divisions, fire doors), detection (smoke/heat/flame detectors), containment (fire dampers, watertight/fire doors, ventilation shutdown) ve extinction (portable + fixed systems). Safety Officer her katmanın hazır olmasını izler.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-2/14 — Operational readiness & maintenance",
              text: `Tüm yangın güvenlik sistemleri her zaman çalışır ve kullanıma hazır olmalı; bakım MSC.1/Circ.1432 rehberine ve üretici talimatına göre yapılıp kayıt altına alınmalıdır.`,
            },
          ],
        },
        {
          subheading: "1.2 Kayıt ve PMS entegrasyonu",
          paragraphs: [
            `Her FFE kalemi PMS'te bir job ile izlenir: aylık tüp kontrolü, üç aylık hortum/nozzle, yıllık SCBA servis, beş yıllık tüp hydro-test gibi. Tüm kontroller, bakımlar ve refill'ler tarih + sorumlu + bulgu ile kaydedilir. Kaydı olmayan bakım, denetimde "yapılmamış" sayılır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Portatif Yangın Tüpleri",
      sections: [
        {
          subheading: "2.1 Tüp tipleri ve yerleşimi",
          paragraphs: [
            `Gemide su, köpük (foam), kuru kimyevi toz (dry powder) ve CO2 tipli portatif tüpler bulunur; yangın sınıfına göre (A-katı, B-sıvı, C-elektrik, D-metal, F-yağ) uygun tüp belirli istasyonlara yerleştirilir. Makine dairesinde köpük + CO2, mutfakta foam/wet chemical, akomodasyonda su/CO2 tipik dağılımdır. Res. A.951(23) yerleşim ve sayı rehberidir.`,
            `Safety Officer, her tüpün dolu (tartı/manometre), mühürlü (safety pin + tamper seal), erişilebilir, doğru sınıf ve son kullanma/servis tarihinin geçerli olduğunu kontrol eder. Tüp bracket'i sağlam, içerik basıncı yeşil bantta olmalıdır.`,
          ],
          table: {
            caption: `Portatif Tüp Kontrol Periyotları`,
            headers: ["Kontrol", "Periyot", "İşlem"],
            rows: [
              ["Görsel + basınç + seal", "Aylık", "Safety Officer kontrol + kayıt"],
              ["Tartım (CO2/dry powder)", "Yıllık", "Ağırlık kaybı %10'u geçerse refill"],
              ["İçerik yenileme (refill)", "Üreticiye göre", "Yetkili servis"],
              ["Hydrostatic test (gövde)", "~5/10 yıl", "Basınç testi sertifikası"],
            ],
          },
          callouts: [
            {
              type: "tip",
              title: "İki spare zorunluluğu",
              text: `SOLAS, aynı tip ve kapasitedeki portatif tüplerin %100'ünün (her tip için en az bir, toplamda gemi gereksinimine göre) yedek olarak bulundurulmasını öngörür. Boşalan tüp anında yedekle değiştirilir.`,
            },
          ],
        },
        {
          subheading: "2.2 Refill, hydro-test ve değişim",
          paragraphs: [
            `Boşalan veya kullanılan her tüp derhal refill edilir; aynı anda yedek tüp istasyona asılır. CO2 ve dry powder tüpleri yıllık tartılır; %10'dan fazla ağırlık kaybı refill gerektirir. Gövde, üretici/flag gerekliliğine göre 5–10 yılda bir hydrostatic test'e tabidir. Tüm işlemler tarih damgalı etiketle ve kayıtla belgelenir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Hortumlar, Hydrant'lar ve Yangın Pompaları",
      sections: [
        {
          subheading: "3.1 Fire main, hydrant ve hortum",
          paragraphs: [
            `Fire main hattı, ana ve emergency fire pump ile basınçlandırılır; her hydrant'tan en az iki jet su sağlanabilmelidir. Safety Officer; hydrant valf gland'larının sızdırmazlığını, hortumların (coupling, lining, çatlak) durumunu, nozzle'ların (jet/spray dual-purpose) fonksiyonunu ve hose box erişilebilirliğini periyodik kontrol eder.`,
            `Emergency fire pump, ana pompadan bağımsız bir mahalde, ayrı güç kaynağıyla çalışır; haftalık/aylık çalıştırma testi yapılır ve basınç doğrulanır. İnternational shore connection (gemiden gemiye/limana su bağlantısı) köprüüstü yakınında erişilebilir tutulur.`,
          ],
          bullets: [
            `Hydrant valf sızdırmazlığı ve serbest açılma`,
            `Hortum coupling çatlağı, lining yırtığı, basınç testi`,
            `Nozzle jet/spray geçişi ve shut-off fonksiyonu`,
            `Ana + emergency fire pump basınç ve start testi`,
            `International shore connection mevcudiyeti`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: çatlak hortum coupling",
              text: `Bir denetimde makine dairesi hose box'ındaki hortum coupling'inin çatlak olduğu görüldü; basınç altında bağlantı kopabilir, yangında jet kaybı yaşanırdı. Bulgu defect olarak açıldı, hortum yedekle değiştirildi. Ders: görsel kontrol coupling/lining'i de kapsamalıdır.`,
            },
          ],
        },
        {
          subheading: "3.2 Basınç ve debi testi",
          paragraphs: [
            `Safety Officer, periyodik olarak en uzak iki hydrant'tan eşzamanlı jet alarak fire main basıncının yeterli olduğunu doğrular. Emergency fire pump izole edilip ayrı test edilir. Bu testler logbook'a basınç değeri ve tarih ile kaydedilir.`,
          ],
        },
      ],
    },
    {
      heading: "4. SCBA ve EEBD",
      sections: [
        {
          subheading: "4.1 SCBA (Self-Contained Breathing Apparatus)",
          paragraphs: [
            `SCBA, fireman's outfit'in parçasıdır; yangın ekibinin dumanlı/zehirli atmosferde çalışmasını sağlar. Safety Officer; tüp basıncını (genelde dolu ~300 bar), düşük basınç düdüğünü (whistle ~50-55 bar), maske sızdırmazlığını, demand valve fonksiyonunu ve harness durumunu kontrol eder. Her kullanım sonrası tüp refill edilir.`,
            `SCBA tüpleri belirli aralıklarla hydrostatic test'e tabidir (kompozit ~5 yıl, çelik ~10 yıl — üretici/flag belirler). Gemide en az iki yedek dolu tüp veya kompresör bulunmalıdır. Maske ve regülatör yıllık yetkili servise gönderilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Low-pressure whistle çalışmıyorsa",
              text: `SCBA low-pressure warning whistle çalışmıyorsa, kullanıcı havasının bittiğini fark etmeden tehlikeli bölgede kalabilir. Bu, doğrudan "out of service" işaretlenmesi ve acil onarım gerektiren bir defect'tir.`,
            },
          ],
        },
        {
          subheading: "4.2 EEBD (Emergency Escape Breathing Device)",
          paragraphs: [
            `EEBD, yangın/duman durumunda kaçış için ~10-15 dakikalık hava sağlayan tek kullanımlık kaçış cihazıdır; SCBA'nın aksine yangın söndürme için kullanılmaz. Akomodasyon ve makine dairesi kaçış yollarında, fire control plan'da işaretli sayıda bulunur. SOLAS II-2/13 minimum sayıları belirler.`,
            `Safety Officer; her EEBD'nin mühürünün (seal) sağlam, basınç göstergesinin yeşil bantta, son kullanma tarihinin geçerli ve cihazın kaçış yolunda görünür/erişilir olduğunu kontrol eder. Mührü kırık EEBD test edilmiş kabul edilir ve servise gönderilir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Fireman's Outfit ve Kişisel Teçhizat",
      sections: [
        {
          subheading: "5.1 Fireman's outfit bileşenleri",
          paragraphs: [
            `Fireman's outfit; alev geçirmez koruyucu giysi, çizme/eldiven, kask, safety lamp (en az 3 saat), fire axe ve SCBA'dan oluşur. Gemi tipine göre en az iki set bulunur. Safety Officer her setin tamlığını, lamp battery durumunu ve giysinin sağlamlığını denetler.`,
            `Yangına müdahale eden ekibin lifeline ve fireproof lifeline ile donatılması, low-location lighting ve haberleşme (intrinsically safe portable VHF) ile desteklenmesi gerekir. Eksik veya hasarlı bir bileşen, tüm outfit'i kullanılamaz hale getirir.`,
          ],
          table: {
            caption: `Fireman's Outfit Kontrol Listesi`,
            headers: ["Bileşen", "Kontrol", "Periyot"],
            rows: [
              ["Koruyucu giysi/eldiven/çizme", "Bütünlük, alev direnci", "Aylık"],
              ["Kask + safety lamp", "Lamp 3+ saat, battery", "Aylık"],
              ["SCBA", "Basınç, whistle, maske", "Aylık + sonrası refill"],
              ["Fire axe + lifeline", "Durum, bağlantı", "Aylık"],
            ],
          },
        },
        {
          subheading: "5.2 Familiarization ve yetkinlik",
          paragraphs: [
            `Ekipmanın çalışması yeterli değildir; ekip onu hızlı ve doğru kullanabilmelidir. Safety Officer, yeni gelen personele SCBA donning, EEBD aktivasyonu, hortum yerleştirme ve fire alarm noktalarını gösterir; fire drill'lerde bu becerileri gözlemler ve eksikleri eğitime dönüştürür.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Drill = canlı bakım",
              text: `Fire drill, ekipmanın gerçek koşulda fonksiyonunu test eden en iyi yöntemdir. SCBA donning süresi, hortum yerleştirme hızı ve alarm yanıtı drill'de ölçülür; çıkan eksikler hem eğitim hem PMS aksiyonu üretir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Sabit Sistemler: CO2, Köpük, Detection",
      sections: [
        {
          subheading: "6.1 Fixed CO2 / köpük / water-mist sistemleri",
          paragraphs: [
            `Makine dairesi ve kargo mahalleri için fixed CO2 (veya köpük/water-mist/aerosol) sistemleri bulunur. Safety Officer; şişe basınçlarını, release manifold mühürlerini, alarm-before-release sistemini, ventilation/fuel shut-off interlock'larını ve şişe odası girişindeki uyarıları kontrol eder. CO2 release öncesi mutlaka tahliye + alarm + ventilation stop sıralaması işler.`,
            `Fixed CO2 sistemi MSC.1/Circ.1318'e göre yıllık, iki yıllık ve on yıllık bakımlara tabidir: yıllık görsel ve alarm testi, iki yıllık hortum/manifold kontrolü, on yıllık şişe hydro-test. Bu servisler yetkili firma tarafından yapılır ve sertifikalandırılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "CO2 — insan güvenliği",
              text: `CO2 sistemi insan için boğucudur. Yanlış/erken release ölümcül olabilir. Şişe odasına giriş ve test sırasında release line güvenlik prosedürü (pin/blank) uygulanır; bölge boşaltılmadan ve alarm çalmadan deşarj yapılmaz.`,
            },
          ],
        },
        {
          subheading: "6.2 Fire detection ve alarm sistemi",
          paragraphs: [
            `Smoke, heat ve flame dedektörleri zone bazında izlenir; köprüüstü panelinde alarm ve fault gösterilir. Safety Officer, periyodik olarak seçili dedektörleri test smoke/heat ile test eder, manual call point'leri (MCP) ve general alarm'ı çalıştırır. Devre dışı bırakılan (isolated) zone'lar logbook'a yazılır ve takip edilir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Denetim ve Kayıt Bütünlüğü",
      sections: [
        {
          subheading: "7.1 PSC/survey'de FFE",
          paragraphs: [
            `FFE, PSC'de en sık deficiency çıkan alanlardandır: expired/discharged tüp, çalışmayan emergency fire pump, eksik SCBA tüpü, kırık EEBD mührü, bloke yangın istasyonu ve "kayıt-fizik" tutarsızlığı tipik bulgulardır. Safety Officer, bu kalemleri proaktif takip ederek ve kayıtları kesintisiz tutarak denetime hazır girer.`,
            `Denetçi sıklıkla bir crew üyesine "Show me how you start the emergency fire pump" veya "Don this SCBA" der. Bu yüzden FFE yetkinliği yalnızca ekipmanla değil, eğitimle de ölçülür; familiarization kayıtları hazır olmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Pratik Kontrol Listesi ve Kapanış",
      sections: [
        {
          subheading: "8.1 Safety Officer FFE kontrol listesi",
          bullets: [
            `Portatif tüpler: dolu, mühürlü, doğru sınıf, expiry/servis geçerli, yedek mevcut mu?`,
            `Hortum/hydrant/nozzle: çatlak yok, basınç var, jet/spray çalışıyor mu?`,
            `Ana + emergency fire pump: start ve basınç testi yapıldı mı?`,
            `SCBA: basınç dolu, whistle çalışıyor, yedek tüp var mı?`,
            `EEBD: mühür sağlam, expiry geçerli, kaçış yolunda görünür mü?`,
            `Fireman's outfit: tüm bileşenler tam, lamp çalışıyor mu?`,
            `Fixed CO2/köpük: basınç, alarm-before-release, interlock, servis tarihi tamam mı?`,
            `Detection/alarm: zone testleri, MCP, general alarm çalışıyor mu, isolated zone kaydı var mı?`,
          ],
          paragraphs: [
            `Yangın ekipmanı, kullanılmadığı sürece görünmez kalan bir sigortadır; ama gerçek bir yangında geminin ve mürettebatın hayatta kalması doğrudan bu ekipmanın çalışırlığına ve ekibin onu kullanabilmesine bağlıdır. Safety Officer'ın görevi, "orada durmak"tan "çalışır ve kullanılabilir olmak"a kadar uzanan bu zinciri her gün ayakta tutmaktır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
