import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yakıt ve yağ yönetimi",
  roleSlug: "bas-muhendis",
  taskIndex: 2,
  estimatedPages: 26,
  intro: `Yakıt ve yağ yönetimi, bir geminin işletme maliyetinin %50-70'ini oluşturan tek kalemi yönettiği için Baş Mühendis'in en kritik ekonomik ve teknik sorumluluğudur. Bu görev; bunker planlamasından numune alımına, yakıt kalite kontrolünden (CCAI, density, viscosity, water content) MARPOL Annex VI sülfür uyumluluğuna, ECA changeover prosedürlerinden EEXI/CII performans takibine kadar uzanır. Bu bölüm, modern bir gemide yakıt/yağ zincirinin uçtan uca yönetimini, laboratuvar verilerinin yorumlanmasını ve karar matrisini detaylı olarak ele alır.`,
  sources: [
    "MARPOL Annex VI (Air Pollution Prevention) — Reg. 14 & 18",
    "ISO 8217:2017 — Petroleum products — Fuels (class F) specifications",
    "ISGOTT 6 (International Safety Guide for Oil Tankers and Terminals)",
    "IMO MEPC.1/Circ.795 — Unified Interpretations to MARPOL Annex VI",
    "VPS / FOBAS / DNV Fuel Quality Testing Guidelines",
    "BIMCO Bunker Terms & Standard Bunkering Clauses",
    "CIMAC Fuel Recommendations & Guidelines",
  ],
  chapters: [
    {
      heading: "1. Bunker Planlaması ve Stem Yönetimi",
      lead: `Bunker planlama, sadece "ne kadar yakıt alınacağı" değil; nerede, hangi fiyatla, hangi kalitede ve hangi tank kapasitesiyle alınacağının bütünsel kararıdır.`,
      sections: [
        {
          subheading: "1.1 Sefer bazlı yakıt ihtiyacı hesabı",
          paragraphs: [
            `Baş Mühendis, voyage instruction'a göre toplam yakıt ihtiyacını hesaplar: ana makine sarfı (sea consumption × steaming days), yardımcı makine sarfı (auxiliary load × port + sea days), boiler/inert gas sarfı ve safety margin (genelde %10-15 reserve). ROB (Remaining On Board) ölçümü sounding/ullage ile doğrulanır ve stem miktarı buna göre belirlenir.`,
            `Tank kapasitesi planlaması kritiktir: sülfürü farklı yakıtların (HSFO scrubber'lı gemide, VLSFO, MGO) ayrı tanklarda segregasyonu, comingling (karıştırma) yasağı ve %85 max doldurma kuralı (thermal expansion için ullage payı) gözetilir. Yanlış tank planı, ECA changeover'ı imkânsız hale getirebilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Stem optimizasyonu",
              text: `Liman fiyat farkları (ör. Singapur vs Rotterdam) ve "bunker only" sapma maliyeti birlikte değerlendirilir. Ucuz liman her zaman doğru karar değildir; sapma süresi ve charter party hız taahhüdü hesaba katılır.`,
            },
          ],
        },
        {
          subheading: "1.2 Yakıt türleri ve özellikleri",
          table: {
            caption: `Tipik marine yakıt türleri ve ISO 8217 parametreleri`,
            headers: ["Yakıt", "Viskozite (cSt@50°C)", "Density (kg/m³@15°C)", "Sülfür", "Tipik kullanım"],
            rows: [
              ["HSFO (RMG 380)", "380", "≤991.0", "≤3.50%", "Scrubber'lı gemiler"],
              ["VLSFO", "180-380", "≤991.0", "≤0.50%", "Global cap uyumu"],
              ["ULSFO", "≤180", "≤991.0", "≤0.10%", "ECA bölgesi"],
              ["MGO (DMA)", "2.0-6.0", "≤890.0", "≤0.10%", "ECA / manevra / acil"],
              ["LNG (dual-fuel)", "—", "—", "~0%", "Düşük emisyon gemiler"],
            ],
          },
          paragraphs: [
            `VLSFO'lar 2020 sonrası market'e girmiş "blend" yakıtlardır; stabilite (sediment), uyumluluk (incompatibility/asphaltene çökelmesi) ve cold flow özellikleri (yüksek pour point) açısından klasik HFO'dan daha hassastır. Farklı VLSFO partilerinin comingling'i asphaltene çökelmesine ve filtre tıkanmasına yol açabilir; bu nedenle compatibility test (spot test ASTM D4740) önerilir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Bunker Operasyonu: Emniyetli Yürütme",
      sections: [
        {
          subheading: "2.1 Pre-bunker checklist ve hazırlık",
          paragraphs: [
            `Bunker öncesi Baş Mühendis bir pre-transfer checklist uygular (ISGOTT/SMS bazlı): tüm valf hatları doğrulanır, overflow tank boş, save-all tray ve scuppers tıkalı (kapatılmış), SOPEP ekipmanı hazır, yangın söndürücü mevcut, emergency stop signal belirlenmiş, barj ile haberleşme (VHF/telsiz) test edilmiş olmalıdır. Tüm güverte personeline görev dağılımı yapılır.`,
            `Quantity dispute'ı önlemek için bunkering öncesi ve sonrası her iki taraf tank ölçümleri (joint measurement) yapılır. Barj tank tablosu, trim/list düzeltmesi, sıcaklık-density düzeltmesi (VCF — Volume Correction Factor) ile metric ton'a çevrilir. Aerated fuel (cappuccino effect) ile yapay hacim şişirmesine karşı dikkatli olunur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Cappuccino bunker dolandırıcılığı",
              text: `Barj, yakıta hava enjekte ederek hacmi yapay şişirir; alınan ton kâğıtta yüksek, gerçekte düşüktür. Tank seviyesinin stabilize olmasını bekleyip tekrar ölçüm yaparak ve dispenser temperature/density tutarlılığını izleyerek tespit edilir.`,
            },
          ],
        },
        {
          subheading: "2.2 Numune alımı ve BDN",
          paragraphs: [
            `MARPOL Annex VI Reg. 18, manifold'da continuous drip sample (4-way sampler) alınmasını zorunlu kılar. Numune 4 şişeye bölünür: gemi sakladığı (MARPOL bottle, mühürlü, min 12 ay saklanır), supplier kopyası, lab gönderilen ve liman otoritesi kopyası. Her şişe mühür numarası BDN'ye ve barj kopyasına yazılır; her iki taraf imzalar.`,
            `BDN (Bunker Delivery Note) MARPOL Annex VI Reg. 18.5 gereği en az 3 yıl gemide saklanmalıdır ve şunları içermelidir: gemi adı/IMO no, liman, teslim tarihi, supplier bilgisi, ürün adı, miktar (MT), density@15°C, sülfür içeriği (% m/m) ve supplier'ın MARPOL uyum beyanı.`,
          ],
        },
      ],
    },
    {
      heading: "3. Yakıt Kalite Kontrolü ve Laboratuvar Analizi",
      sections: [
        {
          subheading: "3.1 Kritik parametreler ve yorumlanması",
          table: {
            caption: `Yakıt analizi kritik parametreleri ve risk göstergeleri`,
            headers: ["Parametre", "Normal", "Risk eşiği", "Sorun göstergesi"],
            rows: [
              ["Density @15°C", "≤991 kg/m³", ">991", "Purifier ayırma zorluğu"],
              ["Viscosity @50°C", "Spec içi", "±%10 sapma", "Heating/injection sorunu"],
              ["Water content", "≤0.5% V/V", ">0.5%", "Emülsiyon, korozyon"],
              ["Sulfur", "Sözleşme limiti", ">limit", "MARPOL ihlali"],
              ["Al+Si (catfines)", "≤60 mg/kg", ">60", "Liner/ring abrasif aşınma"],
              ["CCAI", "<870", ">870", "Tutuşma gecikmesi / hard fuel"],
              ["Pour point", "Spec içi", "Yüksek", "Soğukta katılaşma"],
            ],
          },
          paragraphs: [
            `Lab raporu gelene kadar yeni alınan yakıt mümkünse kullanılmaz (settling tank'ta bekletilir). Acil kullanım gerekiyorsa karar Baş Mühendis tarafından kayıt altına alınır. FOBAS/VPS gibi laboratuvarlar 48-72 saat içinde sonuç verir; "off-spec" durumunda supplier'a hemen Letter of Protest gönderilir.`,
          ],
        },
        {
          subheading: "3.2 Catfines (Al+Si) tehlikesi",
          paragraphs: [
            `Catalytic fines (alüminyum + silikon oksit partikülleri), rafineri FCC prosesinden gelen sert, abrasif partiküllerdir. Fuel injection sisteminde ve özellikle liner-piston ring temas yüzeyinde dramatik aşınma yapar. ISO 8217 limiti 60 mg/kg'dır ancak motor girişinde (purifier sonrası) 15 mg/kg altına düşürülmesi tavsiye edilir.`,
            `Catfines yönetimi: settling tank residence time, çift purifier seri (purifier + clarifier) çalıştırma, doğru gravity disc seçimi ve optimum 98°C separation sıcaklığıdır. Yüksek catfines tespit edilirse feed rate düşürülerek separation verimi artırılır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Catfine kaynaklı liner hasarı",
              text: `Bir bulk carrier'da 80 mg/kg catfine'li VLSFO, tek purifier ile işlendi; 1500 çalışma saatinde 3 silindirde liner scuffing ve ring kırılması oluştu. Ders: yüksek catfine'de mutlaka purifier+clarifier seri çalıştırılmalı ve drain oil Si trendi izlenmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Yakıt Arıtma ve Tank Yönetimi",
      sections: [
        {
          subheading: "4.1 Purifier (separator) optimizasyonu",
          paragraphs: [
            `Centrifugal separator HFO/VLSFO için optimum 95-98°C'de çalıştırılır. Density'si yüksek modern yakıtlarda interface (water-oil sınırı) kontrolü zorlaşır; bu yüzden çoğu gemi gravity disc'siz "self-cleaning + density independent" tip separator (Alfa Laval S-separator, GEA) kullanır. Feed rate, separation kalitesini doğrudan etkiler; düşük feed = yüksek ayrım verimi.`,
            `Separator bowl temizliği, sludge boşaltma sıklığı ve heater performansı düzenli izlenir. Su ile çalışan separator'larda (purifier modu) seal water doğru ayarlanmazsa breakthrough (yakıtın su tarafına kaçması) olur. Clarifier modunda (sealsiz) sadece partikül ayrımı yapılır.`,
          ],
        },
        {
          subheading: "4.2 Tank ısıtma ve transfer disiplini",
          paragraphs: [
            `Settling ve service tank'lar yakıt pour point'inin 10-15°C üzerinde tutulur. Storage tank ısıtması, transfer öncesi pompalanabilir viskoziteyi sağlamak içindir. Aşırı ısıtma (>condensation/flashpoint riski) ve tank içinde lokal overheating (coil leak ile su girişi) önlenir.`,
            `Tank sounding/ullage günlük yapılır; ROB tutarlılığı izlenir. Free water (tabanda biriken su) düzenli drain edilir. Tank atmosfer/flashpoint güvenliği için flashpoint ≥60°C kuralı (SOLAS) gözetilir; düşük flashpoint yakıt (örn. yanlışlıkla MGO/HFO comingling sonrası) ciddi yangın riskidir.`,
          ],
        },
      ],
    },
    {
      heading: "5. MARPOL Annex VI — Sülfür Rejimi ve Uyumluluk",
      sections: [
        {
          subheading: "5.1 Global cap ve ECA limitleri",
          paragraphs: [
            `2020 IMO global sulphur cap %0.50 m/m'dir. ECA bölgelerinde (Baltık, Kuzey Denizi, Kuzey Amerika, ABD Karayip) limit %0.10 m/m'dir. Scrubber (EGCS — Exhaust Gas Cleaning System) ile çalışan gemiler HSFO kullanabilir ancak scrubber washwater MARPOL ve liman kurallarına uygun olmalıdır (bazı limanlar open-loop scrubber yasaklamıştır).`,
            `Carriage ban (Reg. 14.3.5) gereği, scrubber'sız gemiler %0.50 üstü yakıtı gemide bulunduramaz bile. PSC, ana makine ve service tank'tan numune alır (in-use ve onboard sample), MARPOL bottle ile karşılaştırır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex VI Reg. 14",
              text: `Kullanılan ve gemide bulundurulan yakıtın sülfür içeriği limitleri aşamaz. Uyumsuzluk gemi tutmaya, yüksek cezaya ve sicil kaydına yol açar. FONAR (Fuel Oil Non-Availability Report), uyumlu yakıt bulunamadığında ilgili otoriteye sunulan istisna belgesidir.`,
            },
          ],
        },
        {
          subheading: "5.2 EEXI ve CII performans takibi",
          paragraphs: [
            `EEXI (Energy Efficiency Existing Ship Index) bir kerelik teknik bir indekstir; geminin tasarım verimliliğini ölçer ve EPL (Engine Power Limitation) gibi önlemlerle uyum sağlanır. CII (Carbon Intensity Indicator) ise operasyonel ve yıllıktır; geminin taşıdığı yük başına emisyonunu (gCO2/dwt·nm) ölçer ve A-E arası rating verir.`,
            `Baş Mühendis, yakıt tüketim verilerini (IMO DCS — Data Collection System) doğru raporlamaktan sorumludur. D rating üst üste 3 yıl veya E rating tek yıl alınırsa SEEMP Part III kapsamında corrective action plan zorunludur. Yakıt seçimi, hız profili ve hull/propeller performansı CII'yi doğrudan etkiler.`,
          ],
        },
      ],
    },
    {
      heading: "6. Yağlama Yağı (Lube Oil) Yönetimi",
      sections: [
        {
          subheading: "6.1 Cylinder oil ve TBN eşleşmesi",
          paragraphs: [
            `Cylinder oil TBN'i (Base Number) yakıt sülfürüne göre seçilir. Yüksek sülfürlü HSFO (scrubber gemisi) için 70-100 TBN; VLSFO için 40-70 TBN; düşük sülfürlü MGO/ULSFO için 25-40 TBN uygundur. Yanlış (düşük) TBN seçimi cold corrosion (sülfürik asit korozyonu); yüksek TBN ise kalsiyum deposit ve bore polishing'e yol açar.`,
            `Modern Alpha Lubricator / SIP (Swirl Injection Principle) sistemleri feed rate'i motor yükü ve sülfüre göre otomatik ayarlar. Feed rate genelde 0.6-1.4 g/kWh; minimum guaranteed feed rate motor üreticisi spesifikasyonuna göre korunur. Scrape-down (drain) oil analizi feed rate optimizasyonunun temelidir.`,
          ],
        },
        {
          subheading: "6.2 System oil (crankcase) ve drain analizi",
          table: {
            caption: `Yağlama yağı analizi alarm trendleri ve nedenleri`,
            headers: ["Gösterge", "Olası neden", "Aksiyon"],
            rows: [
              ["Fe artışı", "Liner/ring/cam aşınması", "İlgili silindir inspect"],
              ["Cu artışı", "Yatak (bearing) aşınması", "Yatak kontrol, alignment"],
              ["Si artışı", "Catfine / kum girişi", "Filtre, purifier kontrol"],
              ["Su içeriği", "Jacket leak / kondenzasyon", "Cooler/seal kontrol"],
              ["TBN düşüşü", "Asidik kontaminasyon", "Yağ değişim / makeup"],
              ["Viskozite artışı", "Oksidasyon / fuel dilution", "Sebep ara, gerekirse değişim"],
            ],
          },
          paragraphs: [
            `System oil aylık/üç-aylık spectroanalysis ile izlenir (Spectro metal, FT-IR oksidasyon, su, TBN, viskozite). Trend grafiği tek ölçümden çok daha değerlidir. Su girişi 0.2% üzerine çıkarsa jacket cooler veya stuffing box sızıntısı şüphelidir; yakıt girişi (fuel dilution) viskoziteyi düşürür ve flashpoint riski yaratır.`,
          ],
        },
      ],
    },
    {
      heading: "7. ECA Changeover Prosedürü",
      sections: [
        {
          subheading: "7.1 Changeover zamanlaması ve hesabı",
          paragraphs: [
            `ECA'ya girişten önce sistemin tamamen düşük sülfürlü yakıta geçmiş olması gerekir. Changeover, fuel system volume (service tank + booster + supply hat + injection) ve dilution oranına bağlı olarak yeterli süre önceden başlatılır. Changeover Calculator, geçiş başlangıç-bitiş zamanını, pozisyonu ve sülfür değerini kaydeder.`,
            `Geçiş kademeli yapılır: viskozite ve sıcaklık farkı (HFO ~130°C, MGO ~40-50°C) nedeniyle ani sıcaklık şoku fuel pump plunger'da seizure ve yakıt kaçaklarına yol açabilir. Cooler (MGO chiller) ile geçiş hızı kontrol edilir; ramp rate genelde 2°C/dk altında tutulur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Fuel pump seizure riski",
              text: `Ani HFO→MGO geçişinde sıcaklık düşüşü ve düşük viskozite, fuel pump plunger-barrel kliransını değiştirir ve sıkışma (seizure) yapabilir. Bu, ECA girişinde ana makine kaybı anlamına gelir. Kademeli, kontrollü changeover ve MGO cooler şarttır.`,
            },
          ],
        },
        {
          subheading: "7.2 Fuel changeover logbook",
          paragraphs: [
            `Her changeover, ayrı bir fuel changeover log'a kaydedilir: tarih/saat, gemi pozisyonu (lat/long), changeover başlangıç ve bitiş zamanı, tank/yakıt türleri, ROB değerleri. Bu kayıt PSC denetiminde MARPOL Annex VI uyumunun birincil kanıtıdır. ECA'ya geçişin tamamlanmadan girilmesi tutma sebebidir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Yakıt Tüketim Raporlaması ve Optimizasyon",
      sections: [
        {
          subheading: "8.1 Noon report ve ROB mutabakatı",
          paragraphs: [
            `Günlük noon report; ana makine/yardımcı/boiler sarfını, steaming saatini, mesafeyi, ortalama hızı, slip ve SFOC'u içerir. ROB by calculation (önceki ROB − tüketim) ile ROB by sounding karşılaştırılır; tutarsızlık (leak, ölçüm hatası, hesaplama hatası veya çalıntı) araştırılır. Tüm değerler şirket performans sistemine işlenir.`,
            `Voyage abstract ve performans raporları, charter party speed/consumption warranty'sinin kontrolünde kullanılır. Off-hire veya speed claim durumlarında bu kayıtlar hukuki delildir; doğruluk hayatidir.`,
          ],
        },
        {
          subheading: "8.2 Yakıt verimliliği önlemleri",
          paragraphs: [
            `Yakıt tasarrufu kaynakları: hull & propeller cleaning (fouling %3-8 kayba yol açar), trim optimization (%2-5), slow steaming, weather routing, otomatik kombustyon ayarı ve waste heat recovery. Baş Mühendis, bu önlemlerin teknik fizibilitesini değerlendirir ve SEEMP kapsamında uygular.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Hull fouling ekonomisi",
              text: `Tropikal sularda 60+ gün durağan kalan bir gemide hull fouling %10'a kadar yakıt artışı yapabilir. Propeller polishing + hull cleaning maliyeti genelde 1-2 hafta içinde yakıt tasarrufuyla amorti olur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Yakıt Kaynaklı Arızalar ve Vaka Dersleri",
      sections: [
        {
          subheading: "9.1 Off-spec yakıt ve uyumsuzluk olayları",
          paragraphs: [
            `2018 Houston ve Singapur'da geniş çaplı kontamine VLSFO partileri (yüksek phenolic/styrene bileşikleri) onlarca gemide fuel pump ve injector seizure'a yol açtı. Standart ISO 8217 testleri bu kontaminasyonu yakalamadı; GC-MS özel analiz gerekti. Ders: kalite şüphesinde standart testin ötesinde forensic analiz istenir.`,
            `Incompatible yakıt comingling, asphaltene flocculation ile yoğun sludge oluşturur; purifier ve filtreyi tıkar, fuel starvation ile blackout yapar. Compatibility spot test ve yeni partileri ayrı tankta tutma temel korunmadır.`,
          ],
        },
        {
          subheading: "9.2 Water ingress ve mikrobiyel kontaminasyon",
          paragraphs: [
            `Tank içine deniz suyu girişi (sounding pipe, vent, coil leak) veya kondenzasyon, hem korozyon hem de MGO'da mikrobiyel büyüme (diesel bug) riski yaratır. Mikrobiyel kontaminasyon filtre tıkanması ve tank tabanı korozyonu yapar; biyosit dozajı ve düzenli su drain ile yönetilir.`,
          ],
        },
      ],
    },
    {
      heading: "10. Pratik Kontrol Listesi ve Sonuç",
      sections: [
        {
          subheading: "10.1 Baş Mühendis yakıt/yağ kontrol listesi",
          bullets: [
            `Stem planı tank kapasitesi ve segregasyon ile uyumlu mu?`,
            `Pre-bunker checklist, SOPEP ekipmanı ve scupper plug hazır mı?`,
            `MARPOL numunesi 4-way sampler ile alındı, mühürlendi mi?`,
            `BDN density/sülfür/miktar doğru ve 3 yıl saklanacak mı?`,
            `Lab analizi geldi mi; catfine/water/sülfür spec içinde mi?`,
            `Cylinder oil TBN kullanılan yakıt sülfürüne uygun mu?`,
            `ECA changeover hesaplandı, log tutuldu, kademeli yapıldı mı?`,
            `Drain/system oil analiz trendleri izleniyor mu?`,
            `Noon report ROB mutabakatı (calc vs sounding) tutuyor mu?`,
            `EEXI/CII ve IMO DCS verileri doğru raporlanıyor mu?`,
          ],
          paragraphs: [
            `Yakıt ve yağ yönetimi, teknik bilgi kadar disiplinli kayıt ve şüpheci kalite kontrolü gerektirir. Baş Mühendis için en güçlü savunma; mühürlü MARPOL numunesi, doğru tutulan BDN ve changeover log'u ile kanıtlanabilir bir uyum zinciridir. Bu disiplin, hem milyonlarca dolarlık makine hasarını hem de PSC tutma ve cezalarını önler.`,
          ],
        },
      ],
    },
  ],
};

export default content;
