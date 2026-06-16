import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Emniyet ekipman kontrolleri (LSA/FFE destek)",
  roleSlug: "dorduncu-zabit",
  taskIndex: 1,
  estimatedPages: 24,
  intro: `Dördüncü Zabit, Üçüncü Zabit'in (genellikle gemideki Safety Officer) gözetiminde, can kurtarma (LSA — Life-Saving Appliances) ve yangınla mücadele (FFE — Fire-Fighting Equipment) ekipmanlarının periyodik kontrollerine destek verir. Bu görev; lifejacket ve lifebuoy sayım/kontrolü, yangın dolapları ve hortumları, portatif yangın söndürücüler, muster list uygulamaları ve drill hazırlıklarını kapsar. Bu bölüm, kıdemsiz zabitin emniyet ekipmanlarını mevzuata uygun denetlemesi, kayıt tutması ve eksiklikleri raporlaması için pratik bir rehber sunar.`,
  sources: [
    "SOLAS Chapter II-2 — Fire Protection, Detection and Extinction",
    "SOLAS Chapter III — Life-Saving Appliances and Arrangements",
    "LSA Code (International Life-Saving Appliance Code)",
    "FSS Code (International Code for Fire Safety Systems)",
    "IMO Resolution MSC.402(96) — Maintenance, Testing of LSA",
    "ISM Code — Maintenance of Ship and Equipment (Element 10)",
    "ICS / ISF Onboard Training Record Book",
    "IMO MSC/Circ.1206 — Measures to prevent accidents with lifeboats",
  ],
  chapters: [
    {
      heading: "1. Emniyet Kontrol Sisteminin Çerçevesi",
      lead: `LSA ve FFE kontrolleri rastgele yapılmaz; SOLAS ve şirket SMS (Safety Management System) tarafından belirlenen haftalık, aylık ve yıllık programlara dayanır.`,
      sections: [
        {
          subheading: "1.1 Safety Officer'a destek rolü",
          paragraphs: [
            `Üçüncü Zabit genellikle gemide LSA/FFE'den sorumlu Safety Officer'dır. Dördüncü Zabit bu role asistanlık yaparak hem ekipmanın yerini, miktarını ve durumunu öğrenir hem de kontrol disiplinini içselleştirir. Bu, ileride kendi sorumluluğunda olacak bir görevin pratik eğitimidir.`,
            `Destek görevi pasif değildir: Dördüncü Zabit fiziksel kontrolleri bizzat yapar, sonuçları forma işler, eksik/arızalı ekipmanı işaretler ve düzeltici işlem için rapor hazırlar. SMS gereği her kontrol kayıt altına alınır; kayıtsız yapılan kontrol "yapılmamış" sayılır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Planned Maintenance System (PMS)",
              text: `LSA/FFE kontrolleri gemideki PMS yazılımında zaman ve job kodu olarak tanımlıdır. Dördüncü Zabit, kontrol sonrası ilgili job'ı kapatır ve bulguları sisteme girer. PMS, PSC ve klas denetiminde delil olarak kullanılır.`,
            },
          ],
        },
        {
          subheading: "1.2 Kontrol periyotları",
          paragraphs: [
            `Kontroller haftalık, aylık ve yıllık olarak katmanlıdır. Haftalık kontroller görsel ve hızlıdır; aylık kontroller daha kapsamlıdır; yıllık servisler ise genelde sertifikalı dış firma veya detaylı içsel test gerektirir. Dördüncü Zabit özellikle haftalık ve aylık görsel kontrollerde aktif rol alır.`,
          ],
          table: {
            caption: `LSA/FFE Kontrol Periyotları (SOLAS / SMS Tipik)`,
            headers: ["Ekipman", "Periyot", "Kontrol türü"],
            rows: [
              ["Lifeboat / rescue boat", "Haftalık görsel, aylık çalıştırma", "Görsel + makine"],
              ["Lifejacket / immersion suit", "Aylık görsel", "Sayım + hasar"],
              ["Lifebuoy + light/line", "Aylık görsel", "Yer + bütünlük"],
              ["Portatif yangın söndürücü", "Aylık görsel, yıllık servis", "Basınç + mühür"],
              ["Yangın hortum/dolabı", "Aylık görsel", "Tam takım kontrol"],
              ["EEBD / SCBA", "Aylık görsel", "Basınç + mühür"],
              ["Pyrotechnics (işaret fişeği)", "Aylık görsel", "Son kullanma tarihi"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Lifejacket (Can Yeleği) Kontrolleri",
      sections: [
        {
          subheading: "2.1 Sayım ve dağılım",
          paragraphs: [
            `Gemide SOLAS gereği her kişi için bir adet can yeleği, ayrıca köprüüstü/makine/güverte gibi vardiya istasyonları için ek yelekler ve çocuk yelekleri (yolcu gemilerinde) bulunur. Dördüncü Zabit, kamara, muster station ve istasyonlardaki yelek sayımını yaparak SOLAS gereken miktarla karşılaştırır.`,
            `Her yeleğin üzerinde retro-reflektif bant, düdük, ve gerekli ise yelek ışığı (light) bulunur. Yelek ışığının pili ve su ile aktive olan bileşeni kontrol edilir. Eksik düdük veya bozuk reflektif bant düzeltilmesi gereken bulgudur.`,
          ],
          bullets: [
            `Kişi başı + ek yelek sayısı SOLAS gereğine uygun mu?`,
            `Retro-reflektif bant sağlam ve temiz mi?`,
            `Düdük takılı ve çalışır mı?`,
            `Yelek ışığı pili son kullanma tarihi geçmemiş mi?`,
            `Bağlama kayışları, tokalar ve dikişler sağlam mı?`,
          ],
        },
        {
          subheading: "2.2 Immersion suit ve TPA kontrolü",
          paragraphs: [
            `Soğuk sularda seyreden gemilerde immersion suit (dalış elbisesi) ve TPA (Thermal Protective Aid) bulundurulur. Dördüncü Zabit, suit'lerin fermuarlarını wax ile kayganlaştırır, hava sızdırmazlığını ve kumaş bütünlüğünü kontrol eder. Fermuar tutukluğu acil durumda hayati gecikmeye yol açar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Immersion suit fermuarı",
              text: `Donmuş veya korozyona uğramış fermuar, immersion suit'i acil durumda giyilemez hale getirir. Aylık kontrolde fermuar test edilmeli, paslanan kısımlar temizlenip silikon/wax uygulanmalıdır. Kuru, hızlı giyim 1 dakikanın altında olmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Lifebuoy (Can Simidi) Kontrolleri",
      sections: [
        {
          subheading: "3.1 Sayı, dağılım ve aksesuar kontrolü",
          paragraphs: [
            `Can simitleri gemi boyuna ve tipine göre belirli sayıda, her iki bordada ve kolay erişilir konumlarda bulunur. Bir kısmında self-igniting light (kendiliğinden yanan ışık), bir kısmında smoke signal (duman işareti), bazılarında ise buoyant lifeline (yüzer halat) bulunur. Köprüüstü kanatlarındaki simitler MOB (man overboard) için quick-release düzenektedir.`,
            `Dördüncü Zabit, her simidin yerinde olduğunu, üzerindeki gemi adı/liman yazısının okunaklı olduğunu, ışık/duman aksesuarlarının son kullanma tarihinin geçmediğini ve halatların sağlam/temiz olduğunu kontrol eder.`,
          ],
          table: {
            caption: `Lifebuoy Sayısı (SOLAS III — Gemi Boyuna Göre)`,
            headers: ["Gemi boyu", "Min. lifebuoy", "Light ile", "Smoke + light ile"],
            rows: [
              ["< 100 m", "8", "Yarısı", "Min. 2"],
              ["100-150 m", "10", "Yarısı", "Min. 2"],
              ["150-200 m", "12", "Yarısı", "Min. 2"],
              ["> 200 m", "14", "Yarısı", "Min. 2"],
            ],
          },
        },
        {
          subheading: "3.2 MOB simidi ve quick-release",
          paragraphs: [
            `Köprüüstü kanatlarındaki MOB simitleri, ışık ve duman işaretiyle donatılmıştır; bir tetik mekanizmasıyla anında suya bırakılır. Dördüncü Zabit, quick-release pinin serbest, halatın dolaşıksız ve mekanizmanın takılmadan çalıştığını teyit eder. Kazara serbest kalmayı önleyen emniyet de kontrol edilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "MOB refleksi",
              text: `Adam denize düştüğünde ilk hareket, en yakın MOB simidini atmaktır; bu hem can kurtarır hem de pozisyonu işaretler. Bu nedenle MOB simidinin her an serbest bırakılabilir durumda olması, denetimin en kritik kalemidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Portatif Yangın Söndürücüler",
      sections: [
        {
          subheading: "4.1 Tip, yer ve aylık görsel kontrol",
          paragraphs: [
            `Gemide farklı yangın sınıfları için farklı söndürücüler bulunur: su/köpük (A sınıfı katı), CO2 ve kuru kimyevi toz (B sınıfı sıvı, C sınıfı gaz, elektrik), özel söndürücüler. Her söndürücü yangın planında işaretli konumda, kolay erişilir ve yangın kaynağına uygun tipte yerleştirilir.`,
            `Aylık görsel kontrolde Dördüncü Zabit; manometre basıncını (yeşil bölge), emniyet pimini ve mührünü, hortum/nozzle bütünlüğünü, gövde korozyonunu ve son servis/tartım tarihini kontrol eder. CO2 söndürücüler ayrıca tartılarak gaz kaybı (genelde %10 üzeri kayıpta servis) tespit edilir.`,
          ],
          bullets: [
            `Manometre yeşil bölgede (basınçlı tipler) mi?`,
            `Emniyet pimi ve mühür yerinde mi?`,
            `Son servis ve hidrostatik test tarihi geçerli mi?`,
            `Yer yangın planındaki konuma uygun mu, erişim engelsiz mi?`,
            `Gövde korozyonu, hortum çatlağı, nozzle tıkanıklığı var mı?`,
          ],
        },
        {
          subheading: "4.2 Yangın sınıfı / söndürücü eşleşmesi",
          paragraphs: [
            `Yanlış söndürücü kullanımı yangını büyütebilir; örneğin elektrik (C sınıfı) yangınına su sıkmak ölümcül elektrik çarpmasına yol açar. Dördüncü Zabit, hangi söndürücünün hangi yangın sınıfına uygun olduğunu bilir ve denetimde her mahale doğru tipin yerleştirildiğini doğrular.`,
          ],
          table: {
            caption: `Yangın Sınıfı ve Uygun Söndürücü`,
            headers: ["Sınıf", "Yanan madde", "Uygun söndürücü"],
            rows: [
              ["A", "Katı (ahşap, kağıt)", "Su, köpük, ABC toz"],
              ["B", "Sıvı (yakıt, yağ)", "Köpük, CO2, kuru toz"],
              ["C", "Gaz", "Kuru toz, gaz kesimi"],
              ["Elektrik", "Enerjili ekipman", "CO2, kuru toz (su YASAK)"],
              ["F/K (mutfak)", "Pişirme yağı", "Wet chemical"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. Yangın Dolapları, Hortumlar ve Hidrantlar",
      sections: [
        {
          subheading: "5.1 Fire hose ve nozzle kontrolü",
          paragraphs: [
            `Her yangın dolabında (fire station) hortum, nozzle (jet/sprey ayarlı), coupling ve gerekirse anahtar bulunur. Dördüncü Zabit, hortumun çürümediğini, coupling'lerin sağlam ve sızdırmaz olduğunu, nozzle'ın jet/sprey arasında geçiş yapabildiğini kontrol eder. Hortumlar periyodik olarak basınç testine tabi tutulur.`,
            `Hidrant (fire main bağlantısı) kapakları kolay açılır olmalı, korozyon nedeniyle sıkışmamalıdır. Fire main basıncı ve emergency fire pump çalışması ayrı kontrol kalemidir. Dördüncü Zabit, en uzak hidranttan tatmin edici jet basıncı alınabildiğini doğrulamaya destek verir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-2 — Fire Main",
              text: `Fire main her zaman basınçlı tutulur veya derhal basınçlandırılabilir olmalıdır. İki ayrı yangın pompası ve bir emergency fire pump (makine dairesi yangınında dışarıdan erişilebilen) zorunludur. En uzak iki hidranttan eşzamanlı jet alınabilmelidir.`,
            },
          ],
        },
        {
          subheading: "5.2 Fireman's outfit ve EEBD",
          paragraphs: [
            `Fireman's outfit; koruyucu giysi, çizme/eldiven, kask, emniyet lambası, balta ve SCBA (Self-Contained Breathing Apparatus) içerir. Dördüncü Zabit, SCBA tüp basıncını, maske bütünlüğünü ve yedek tüpleri kontrol eder. EEBD'ler (Emergency Escape Breathing Device) kaçış yollarında, son kullanma tarihi geçmemiş halde bulunmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Muster List ve Drill Hazırlığı",
      sections: [
        {
          subheading: "6.1 Muster list uygulaması",
          paragraphs: [
            `Muster list (toplanma cetveli), her mürettebatın acil durumdaki görevini, toplanma yerini ve alarm sinyallerini tanımlar. Dördüncü Zabit'in de muster list'te tanımlı görevleri vardır (örneğin filika numaralı görevi, yangın ekibi rolü). Bu görevleri ezbere bilmek zorunludur.`,
            `Muster list, kamaralarda, mesa'da ve köprüüstünde görünür yerde asılı tutulur. Dördüncü Zabit, mürettebat değişiminde listenin güncellendiğini, her yeni gemi adamının kendi görevini bildiğini ve kamara kapısı arkasındaki bireysel talimatın doğru olduğunu kontrol etmeye destek verir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS III/8 — Muster List",
              text: `Muster list, ilk yola çıkıştan önce hazırlanmalı ve her mürettebata kendi acil durum görevi bildirilmelidir. Genel acil alarm (7 kısa + 1 uzun düdük) ve abandon ship sinyalleri herkesçe bilinmelidir.`,
            },
          ],
        },
        {
          subheading: "6.2 Drill hazırlığı ve katılım",
          paragraphs: [
            `SOLAS, abandon ship ve yangın drill'lerinin ayda en az bir kez (her gemi adamı için) yapılmasını şart koşar; enclosed space ve diğer drill'ler için ayrı periyotlar vardır. Dördüncü Zabit, drill öncesi ekipmanın hazırlanmasında, drill sırasında aktif rol almasında ve sonrasında drill raporunun yazılmasında görev alır.`,
            `Drill, "kağıt üzerinde" değil gerçekçi yapılır: filika çalıştırma, hortum açma, yangın ekibinin BA ile mahale girişi gibi. Dördüncü Zabit, drill'i bir öğrenme fırsatı olarak görür; gerçek acil durumda refleksleri bu tatbikatlarda şekillenir.`,
          ],
          table: {
            caption: `Zorunlu Drill Periyotları (SOLAS III/19)`,
            headers: ["Drill", "Periyot", "Not"],
            rows: [
              ["Abandon ship", "Aylık", "Yeni mürettebat 24 saat içinde"],
              ["Yangın", "Aylık", "Farklı senaryolar"],
              ["Enclosed space", "2 ayda bir", "Rescue dahil"],
              ["Filika suya indirme", "3 ayda bir", "Mürettebatla denize"],
              ["Rescue boat", "Aylık (mümkünse)", "Suya indirme + manevra"],
            ],
          },
        },
      ],
    },
    {
      heading: "7. Kayıt Tutma ve Raporlama",
      sections: [
        {
          subheading: "7.1 Kontrol kayıtları ve defekt raporlama",
          paragraphs: [
            `Her kontrol, SMS formuna (checklist) işlenir; tarih, kontrolü yapan, bulgular ve düzeltici işlem kaydedilir. Dördüncü Zabit, eksik/arızalı ekipmanı "defect" olarak raporlar; ekipman yedeği takılır veya servise/tedarike alınır. Kontrol tamamlanmasa bile bulunan kusur asla gizlenmez.`,
            `Drill'ler ayrı bir drill record'a (defter) kaydedilir: tarih, senaryo, katılımcı, süre, gözlemler ve iyileştirme önerileri. Bu kayıtlar PSC denetiminde ilk istenen belgelerdendir; eksik veya geç tutulan kayıt detention sebebidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kayıt sahteciliği yasak",
              text: `Yapılmamış bir drill'i "yapıldı" diye, ya da kontrol edilmemiş bir ekipmanı "sağlam" diye kaydetmek ciddi bir ISM ihlalidir ve kaza halinde cezai sorumluluk doğurur. Kayıt dürüstlüğü emniyet kültürünün temelidir.`,
            },
          ],
        },
        {
          subheading: "7.2 PSC ve klas denetimine hazırlık",
          paragraphs: [
            `Port State Control (PSC) denetiminde LSA/FFE en sık kontrol edilen alanlardandır. Dördüncü Zabit, ekipmanın yerinde, çalışır ve kayıtlarının güncel olmasını sağlayarak detention riskini azaltır. Düzenli iç denetim, dış denetimde sürpriz yaşamamanın tek yoludur.`,
          ],
        },
      ],
    },
    {
      heading: "8. Pratik Kontrol Listesi ve Kapanış",
      sections: [
        {
          subheading: "8.1 LSA/FFE haftalık-aylık kontrol özeti",
          bullets: [
            `Lifejacket sayım ve hasar kontrolü yapıldı, ışık/düdük tam mı?`,
            `Lifebuoy yer, aksesuar ve son kullanma tarihleri kontrol edildi mi?`,
            `MOB simidi quick-release serbest ve hazır mı?`,
            `Portatif söndürücü basınç, mühür ve servis tarihleri kontrol edildi mi?`,
            `Yangın hortum/nozzle/coupling ve hidrant erişimi sağlam mı?`,
            `SCBA/EEBD basınç ve son kullanma tarihi uygun mu?`,
            `Muster list güncel ve herkes görevini biliyor mu?`,
            `Drill yapıldı ve drill record'a işlendi mi?`,
            `Tüm bulgular SMS formuna ve PMS'e kaydedildi, defektler raporlandı mı?`,
          ],
          paragraphs: [
            `Emniyet ekipmanları, gemideki herkesin hayatını bir acil durumda kurtaracak son savunma hattıdır. Dördüncü Zabit, bu kontrollerde edindiği titizlik ve sistematik yaklaşımı kariyeri boyunca taşır. "Hiç kullanılmayacak" diye düşünülen ekipman, kullanılması gereken anda mutlaka çalışmalıdır; bu garantiyi sağlayan tek şey düzenli, dürüst ve eksiksiz kontroldür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
