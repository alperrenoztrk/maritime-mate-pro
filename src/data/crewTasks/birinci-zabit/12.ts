import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Cargo Securing Manual (CSM) ve lashing denetimi",
  roleSlug: "birinci-zabit",
  taskIndex: 12,
  estimatedPages: 25,
  intro: `IMO Resolution A.714(17) ve Code of Safe Practice for Cargo Stowage and Securing (CSS Code) kapsamında onaylanmış Cargo Securing Manual'in (CSM) gemideki tek uygulayıcısı Birinci Zabit'tir. Her sefer öncesi lashing ekipmanının (twistlock, lashing rod, turnbuckle, D-ring, wire/chain) uygunluğu, SWL etiketleri ve aşınma durumu kontrol edilir. Konteyner gemilerinde stack weight ve corner casting load limitleri, bulker'da grain/concentrate stabilitesi, RoRo'da decking ve lashing point sayısı CSM'e göre doğrulanır. Yetersiz lashing, yük/container kaybının başlıca nedenidir. Bu bölüm, Birinci Zabit'in CSM uygulaması ve lashing denetim metodolojisini açıklar.`,
  sources: [
    "IMO Resolution A.714(17) — Code of Safe Practice for Cargo Stowage and Securing",
    "CSS Code & Annex 13 — Methods to Assess Securing Arrangements",
    "SOLAS Chapter VI/5 & VII — Stowage and Securing",
    "IMO MSC.1/Circ.1353 (Rev.) — Guidelines for CSM Preparation",
    "Cargo Securing Manual (ship-specific, class approved)",
    "Lashing@Sea / TT Club Container Loss Studies",
    "ISO 3874 — Container Handling and Securing",
    "Thomas' Stowage and Cargo Work for Tomorrow's Mariners",
  ],
  chapters: [
    {
      heading: "1. CSM'in Hukuki Temeli ve Kapsamı",
      lead: `Cargo Securing Manual, geminin yük emniyetine dair klas onaylı tek bağlayıcı dokümandır.`,
      sections: [
        {
          subheading: "1.1 CSM'in zorunluluğu ve içeriği",
          paragraphs: [
            `SOLAS VI/5.6 ve VII, standart konteyner dışındaki tüm yüklerin gemiye özgü, idare/klas onaylı bir Cargo Securing Manual'e göre istiflenip bağlanmasını zorunlu kılar. CSM; geminin lashing ekipmanı envanterini, her ekipmanın MSL (Maximum Securing Load) değerini, onaylı lashing pattern'leri, securing device yerleşim planlarını ve hesap yöntemlerini içerir. MSC.1/Circ.1353 hazırlık kılavuzudur.`,
            `CSM gemiye özeldir; başka geminin manuali kullanılamaz. Birinci Zabit, CSM'in güncel, onaylı ve gemide bulunduğundan emin olur; ekipman değişikliği olursa manuel revize edilir. CSM'e uyulmaması hem PSC bulgusu hem de kaza durumunda hukuki sorumluluk doğurur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS VI/VII & A.714(17)",
              text: `Standart olmayan yükler, klas onaylı CSM olmadan taşınamaz. CSM, lashing ekipmanı MSL'leri, pattern'ler ve hesap yöntemlerini içerir. Manuel gemiye özgü olmalı ve gemide bulundurulmalıdır.`,
            },
          ],
        },
        {
          subheading: "1.2 MSL, CS ve emniyet katsayıları",
          paragraphs: [
            `MSL (Maximum Securing Load), bir lashing ekipmanının emniyetle taşıyabileceği maksimum yüktür ve genelde ekipmanın breaking load'unun bir oranı olarak tanımlanır (örn. wire için BL'nin %80'i, web lashing için %50'si). Hesaplarda ayrıca emniyet katsayısı (safety factor) uygulanarak CS (Calculated Strength) elde edilir; CSS Code Annex 13 bu hesabı standartlaştırır.`,
            `Birinci Zabit, kullanılan her ekipmanın MSL'sini bilir ve lashing düzeninin yeterliliğini bu değerlere göre değerlendirir. Yanlış MSL varsayımı, yetersiz lashing'e ve yük kaybına yol açar.`,
          ],
          table: {
            caption: `Tipik Lashing Ekipmanı MSL Oranları (CSS Code Annex 13, Özet)`,
            headers: ["Ekipman", "MSL (Breaking Load'a oranla)", "Not"],
            rows: [
              ["Shackle, ring, deck eye (çelik)", "%50 BL", "Yorulma payı"],
              ["Fiber rope", "%33 BL", "Düşük, elastik"],
              ["Web lashing", "%50 BL", "Tek kullanım sonrası kontrol"],
              ["Wire rope", "%80 BL", "Yüksek mukavemet"],
              ["Chain", "%50 BL", "RoRo/heavy cargo"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Lashing Ekipmanı Denetimi",
      sections: [
        {
          subheading: "2.1 Sefer öncesi ekipman kontrolü",
          paragraphs: [
            `Her sefer öncesi Birinci Zabit, lashing ekipmanını (twistlock, lashing rod, turnbuckle, bottle screw, D-ring, wire/chain, shackle) tek tek kontrol eder: aşınma, çatlak, deformasyon, korozyon ve diş hasarı aranır. SWL etiketleri okunaklı olmalıdır; etiketsiz veya hasarlı ekipman kullanımdan çıkarılır. Aşınmış twistlock, container yığınını tutamayıp kaybına neden olur.`,
            `Ekipman envanteri CSM'e göre tam olmalıdır; eksik/yetersiz lashing gear ile yola çıkılmaz. Birinci Zabit, yedek ekipman stoğunu ve depolama düzenini (lashing bin) denetler.`,
          ],
          bullets: [
            `Twistlock: yay, kilit mekanizması, aşınma kontrolü`,
            `Lashing rod/turnbuckle: diş, deformasyon, korozyon`,
            `Wire/chain: kopuk tel, çatlak, paslanma`,
            `Shackle/D-ring: deformasyon, çatlak, pim durumu`,
            `SWL etiketleri okunaklı ve envanter tam mı?`,
          ],
        },
        {
          subheading: "2.2 Ekipman bakımı ve değişim kriteri",
          paragraphs: [
            `Lashing ekipmanı düzenli bakım gerektirir: yağlama (turnbuckle dişleri), korozyon temizliği ve hasarlı parçaların değişimi. Değişim kriteri (örn. wire'da belirli sayıda kopuk tel, web lashing'de kesik/UV hasarı) CSM/üretici talimatına göre uygulanır. Birinci Zabit bakım kayıtlarını PMS ile entegre tutar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Aşınmış lashing = container kaybı",
              text: `Aşınmış, korozyonlu veya hasarlı lashing ekipmanı, ağır havada gerçek MSL'sinin çok altında kopar. TT Club ve Lashing@Sea çalışmaları, container kayıplarının önemli bir kısmını ekipman durumu ve yanlış lashing pattern'e bağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Konteyner Gemilerinde Lashing",
      sections: [
        {
          subheading: "3.1 Stack weight ve corner casting limitleri",
          paragraphs: [
            `Konteyner istif emniyeti, stack weight (yığın ağırlığı) ve corner casting load limitlerine dayanır. CSM ve lashing software (örn. lashing computer), her bay-row-tier için izin verilen maksimum yükü gösterir. Ağır konteyneri yüksek tier'a koymak, altındaki corner casting ve lashing'i aşırı yükler. Birinci Zabit, planın bu limitlere uyduğunu doğrular.`,
            `Hatch cover üstü (on-deck) istif, hold içi (in-hold) istiften farklı lashing gerektirir; rüzgar ve dalga yükü on-deck'te çok daha yüksektir. Tier sınırı aşıldığında tek lashing yetmez; double lashing veya lashing bridge devreye girer.`,
          ],
        },
        {
          subheading: "3.2 Lashing pattern ve software kullanımı",
          paragraphs: [
            `Twistlock + lashing rod + turnbuckle kombinasyonu standart pattern'dir. Lashing software, GM, hız ve rotaya göre dinamik kuvvetleri hesaplar ve her yığının emniyetli olup olmadığını gösterir; alarm verirse stowage revize edilir. Birinci Zabit, software çıktısını saklar (PSC/vetting sorabilir) ve fiili lashing'in pattern'e uyduğunu denetler.`,
            `Parametric rolling, container yükünü katlayan en tehlikeli durumdur. ONE Apus (2020, 1816 container kaybı) ve Maersk Essen (2021) gibi büyük kayıplar; lashing tightness, yetersiz pattern ve weather routing ihmalinin birleşiminden kaynaklandı.`,
          ],
          callouts: [
            {
              type: "example",
              title: "ONE Apus (2020)",
              text: `Pasifik'te ağır parametric rolling sonucu 1816 konteyner kayboldu. Soruşturma; lashing tightness eksikliği, pattern'in ekstrem koşullara yetersizliği ve hava rotasının dikkate alınmamasını başlıca neden gösterdi. CSM uygulaması ve weather routing kritiktir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Bulk Carrier'da Yük Emniyeti",
      sections: [
        {
          subheading: "4.1 Grain stability ve shifting önlemi",
          paragraphs: [
            `Tahıl (grain) yükü serbest yüzey gibi davranır; gemi yalpaladığında kayarak (grain shift) tehlikeli liste yaratır. International Grain Code, grain heeling moment hesabını ve gerekli önlemleri (trimming, bundling, saucer, overstowing, feeders) zorunlu kılar. Birinci Zabit grain loading stability hesabını yapar/kontrol eder ve NCB onayını sağlar.`,
            `Konsantre (concentrate) ve ince taneli yüklerde de kayma ve sıvılaşma (liquefaction) riski vardır; IMSBC Code Group A kuralları uygulanır. Yük yüzeyinin trim'i ve hold doluluk seviyesi shifting riskini belirler.`,
          ],
        },
        {
          subheading: "4.2 Çelik, kütük ve breakbulk lashing",
          paragraphs: [
            `Çelik bobin (steel coil), levha, kütük (logs) ve breakbulk yükler özel lashing gerektirir. Steel coil'ler kama (wedge/chock) ve lashing ile kaymaya karşı sabitlenir; yanlış lashing hold içinde ölümcül kaymaya yol açar. Birinci Zabit, CSS Code ve CSM'e göre her yük tipi için doğru pattern'i uygular.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Steel coil dikkati",
              text: `Steel coil yükünde her bobin chock ve lashing ile eksenel ve yanal kaymaya karşı sabitlenmelidir. Tek bir gevşek bobin, ağır havada zincirleme kaymaya ve gövde hasarına yol açabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. RoRo ve Araç Lashing",
      sections: [
        {
          subheading: "5.1 Decking ve lashing point sayısı",
          paragraphs: [
            `RoRo gemilerinde araç ve trailer'lar, deck pad-eye/D-ring'lere web veya chain lashing ile bağlanır. CSM, araç tipine ve ağırlığına göre minimum lashing point sayısını ve açısını belirler; ağır self-propelled unit'ler en az dört noktadan, ağırlık ve ivmeye göre daha fazla noktadan bağlanır. Lashing açısı (dikey/yatay bileşen) emniyeti doğrudan etkiler.`,
            `Deck dayanımı (decking strength) ve lashing point yoğunluğu CSM'e göre doğrulanır. Aşırı yük veya yetersiz lashing point, ağır havada araç kaymasına ve deck hasarına neden olur.`,
          ],
        },
        {
          subheading: "5.2 Heavy lift ve project cargo",
          paragraphs: [
            `Transformatör, jeneratör, vinç gövdesi gibi heavy lift/project cargo için detaylı lashing planı ve mühendislik hesabı yapılır (genelde shipper + Birinci Zabit koordinasyonu). Plan, Kaptan ve klas onayı gerektirir. Ağırlık merkezi, lashing açıları ve deck reaksiyon kuvvetleri hesaplanır; yanlış hesap hem yükü hem gemiyi tehlikeye atar.`,
          ],
        },
      ],
    },
    {
      heading: "6. CSS Code Annex 13 Hesap Yöntemi",
      sections: [
        {
          subheading: "6.1 Kuvvet dengesi ve hesap mantığı",
          paragraphs: [
            `CSS Code Annex 13, standart olmayan yükler için pratik hesap yöntemi sunar: yüke etki eden transverse (yanal), longitudinal (boyuna) ve vertical (dikey) ivme kuvvetleri, geminin boyutu ve deniz koşuluna göre hesaplanır. Bu kuvvetlerin lashing düzeni tarafından (sürtünme + lashing CS) karşılandığı matematiksel olarak gösterilir.`,
            `Sürtünme katsayısı (yük-güverte arası, örn. çelik-ahşap 0.3, çelik-çelik 0.1) hesabı etkiler; ıslak veya yağlı yüzey sürtünmeyi düşürür. Birinci Zabit, "balance of forces" ve "balance of moments" kriterlerinin sağlandığını doğrular; aksi halde lashing eklenir.`,
          ],
          table: {
            caption: `Tipik Sürtünme Katsayıları (Annex 13, μ)`,
            headers: ["Temas Yüzeyi", "μ (kuru)", "Not"],
            rows: [
              ["Ahşap - ahşap", "0.4", "Yüksek tutuş"],
              ["Çelik - ahşap (dunnage)", "0.3", "Yaygın breakbulk"],
              ["Çelik - çelik", "0.1", "Düşük, ek lashing gerekir"],
              ["Çelik - kauçuk", "0.6", "Anti-slip mat"],
            ],
          },
        },
        {
          subheading: "6.2 Anti-slip ve dunnage kullanımı",
          paragraphs: [
            `Sürtünmeyi artırmak için anti-slip mat (kauçuk ped) ve uygun dunnage (ahşap kerestelik) kullanılır; bu, gereken lashing sayısını azaltabilir. Birinci Zabit, yük-güverte arasına doğru malzeme yerleştirilmesini denetler. Hesap, sürtünmenin tek başına yeterli sayılmadığını varsayar; lashing daima esastır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Sefer Boyunca İzleme ve Kayıt",
      sections: [
        {
          subheading: "7.1 Lashing tightness ve sefer içi kontrol",
          paragraphs: [
            `Lashing zamanla gevşeyebilir (settling, vibrasyon, sıcaklık değişimi). Birinci Zabit, güvenli koşullarda lashing tightness kontrolü ve yeniden sıkma yapılmasını planlar. Ağır hava öncesi lashing yeniden değerlendirilir ve sıkılır; deniz tutması başladıktan sonra güvertede çalışmak tehlikelidir, bu yüzden kontroller önceden tamamlanır.`,
          ],
        },
        {
          subheading: "7.2 Kayıt ve denetim hazırlığı",
          paragraphs: [
            `Lashing planı, software çıktısı, ekipman inspeksiyon kayıtları ve tightness kontrolleri dokümante edilir. Bu kayıtlar PSC, vetting ve kaza soruşturmasında istenir. Container kaybı veya yük hasarı durumunda, CSM uygulamasının doğru yapıldığını gösteren kayıtlar şirketin tek savunmasıdır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Kayıt = hukuki koruma",
              text: `Bir yük kaybı sonrası soruşturmada, lashing planına ve CSM'e uyulduğunu gösteren kayıtlar (software çıktısı, ekipman inspeksiyonu, tightness kontrolü) gemi/şirket için belirleyici kanıttır. Kayıtsız doğru iş, yapılmamış sayılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Birinci Zabit'in lashing checklist'i",
          bullets: [
            `CSM güncel, onaylı ve gemide mevcut mu?`,
            `Lashing ekipmanı sefer öncesi kontrol edildi, SWL etiketleri okunaklı mı?`,
            `Aşınmış/hasarlı ekipman kullanımdan çıkarıldı mı?`,
            `Container stack weight ve corner casting limitleri aşılmadı mı?`,
            `Lashing software çıktısı alarm vermiyor ve saklandı mı?`,
            `Grain/concentrate stability ve shifting önlemleri uygulandı mı?`,
            `RoRo/araç lashing point sayısı ve açısı CSM'e uygun mu?`,
            `Heavy lift için onaylı lashing planı var mı?`,
            `Annex 13 kuvvet dengesi sağlanıyor mu, anti-slip/dunnage doğru mu?`,
            `Tightness kontrolleri ve tüm kayıtlar dokümante edildi mi?`,
          ],
          paragraphs: [
            `Cargo Securing Manual, kâğıt üzerinde değil sahada uygulanan bir disiplindir. Birinci Zabit'in başarısı; ekipmanı titizlikle denetlemek, lashing'i doğru hesapla ve doğru pattern'le uygulamak, sefer boyunca izlemek ve her şeyi kayda geçirmektir. Yetersiz lashing milyonlarca dolarlık yük kaybına ve insan ölümüne yol açar; doğru lashing ise görünmez ama hayat kurtaran bir başarıdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
