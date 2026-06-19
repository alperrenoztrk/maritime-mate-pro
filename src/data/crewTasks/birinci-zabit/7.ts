import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Bağlama ve manevra operasyonları",
  roleSlug: "birinci-zabit",
  taskIndex: 7,
  estimatedPages: 25,
  intro: `Birinci Zabit, yanaşma, kalkma ve demir operasyonlarında baş üstü (forecastle) veya kıç (poop) istasyonunda güverte ekibini yöneten, Kaptan'ın manevra emirlerini sahada uygulayan kilit kişidir. Bu sorumluluk; mooring plan hazırlığı, halat/tel düzeninin doğru kurulması, snap-back zone'ların belirlenmesi ve personelin güvenli pozisyonlandırılmasını kapsar. Bağlama operasyonları, denizcilikteki en yüksek yaralanma/ölüm istatistiğine sahip işlerden biridir; bu bölüm Birinci Zabit'in manevra emniyetini sağlamak için izlemesi gereken metodolojiyi adım adım açıklar.`,
  sources: [
    "OCIMF Mooring Equipment Guidelines (MEG4)",
    "Code of Safe Working Practices for Merchant Seafarers (COSWP)",
    "SOLAS Chapter II-1 Reg. 3-8 — Towing and Mooring Equipment",
    "ISGOTT 6 — Ship to Ship Transfer Guide (Petroleum)",
    "OCIMF/CDI Ship to Ship Transfer Guide",
    "STCW Code Section A-VIII — Watchkeeping",
    "IMO MSC.1/Circ.1175 — Shipboard Towing and Mooring Equipment",
    "Bridge Procedures Guide (ICS)",
  ],
  chapters: [
    {
      heading: "1. Mooring Plan ve Operasyon Öncesi Hazırlık",
      lead: `Her başarılı manevra, sahaya çıkmadan önce hazırlanan net bir plan ve briefing ile başlar.`,
      sections: [
        {
          subheading: "1.1 Mooring plan'ın hazırlanması",
          paragraphs: [
            `Birinci Zabit, pilot station'a varmadan önce limanın berthing prospektüsüne, rıhtım tipine (fixed jetty, dolphin, finger pier, SBM) ve mevcut bollard düzenine göre mooring plan hazırlar. Plan; head line, breast line, spring ve stern line sayılarını, hangi vinç/ırgatın kullanılacağını ve hangi fairlead'lerden geçirileceğini gösterir. MEG4'e göre simetrik düzen (her yönde dengeli line) ve breast line'ların mümkünse rıhtıma dik (90°) olması esastır.`,
            `Plan, mevcut çevre kuvvetlerine (rüzgar, akıntı, swell, geçen gemi etkisi) göre line sayısının yeterli olup olmadığını değerlendirir. MEG4, her line'ın MBL (Minimum Breaking Load) değerinin ve SDMBL'ye (Ship Design MBL) göre kuvvet dağılımının dokümante edilmesini ister. Mooring line management plan'ı (MLMP) ile uyumlu olunmalıdır.`,
          ],
          bullets: [
            `Rıhtım tipi ve bollard pozisyonları`,
            `Head/stern line, breast line, spring sayısı ve dağılımı`,
            `Kullanılacak vinç/ırgat ve fairlead atamaları`,
            `Tahmini rüzgar/akıntı yükü ve gerekli line kapasitesi`,
            `Tug (römorkör) sayısı ve bağlanma noktaları`,
          ],
        },
        {
          subheading: "1.2 Stations briefing ve görev dağılımı",
          paragraphs: [
            `Manevra öncesi Birinci Zabit, baş üstü ekibine (bosun + güverte tayfaları) toolbox briefing verir: kim winch kullanacak, kim heaving line atacak, kim stopper tutacak, kim haberleşmeyi sağlayacak. Her personel görevini ve kendi snap-back zone'unu bilmelidir. Telsiz kanalı, köprüüstü ile baş/kıç arasında net ve teyitli olmalıdır.`,
            `Personelin PPE'si (kask, eldiven, çelik burunlu bot, can yeleği gerekiyorsa) kontrol edilir. Yorgunluk yönetimi (fatigue) kritiktir; uzun manevralarda STCW dinlenme saatleri ihlal edilmemelidir. Birinci Zabit, ekibin fiziksel hazır olduğundan emin olur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MEG4 — Mooring System Management Plan",
              text: `OCIMF MEG4, her geminin mooring line, tail, ekipman ömrü ve inspeksiyon kayıtlarını içeren bir Mooring System Management Plan (MSMP) ve Line Management Plan (LMP) tutmasını şart koşar. Birinci Zabit bu planların güncelliğinden sorumludur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Halat ve Tel Sistemleri",
      sections: [
        {
          subheading: "2.1 Halat tipleri ve seçimi",
          paragraphs: [
            `Modern gemilerde HMPE (High Modulus Polyethylene — Dyneema/Spectra) ve karışık polyester/polyamid halatlar yaygındır. Steel wire + synthetic tail kombinasyonu özellikle tankerlerde kullanılır. Birinci Zabit, halatın MBL'sinin SDMBL'nin en az %100-105'i aralığında, tail'in ise ana line'dan zayıf (genelde MBL'nin %125-130'u) olmasını doğrular; böylece kopma kontrollü noktada gerçekleşir.`,
            `Halatlar düzenli olarak elden geçirilir: aşınma, çentik, glazing (ısı hasarı), iç lif kırılması ve UV degradasyonu kontrol edilir. MEG4 retirement kriterleri (residual strength %75 altına düşünce değişim) uygulanır. Yıpranmış halat snap-back riskini artırır.`,
          ],
          table: {
            caption: `Yaygın Mooring Line Tipleri ve Özellikleri`,
            headers: ["Tip", "MBL Aralığı (örnek)", "Avantaj", "Dikkat"],
            rows: [
              ["Polyamid (Nylon)", "60-120 t", "Yüksek elastikiyet, şok emer", "Islakken %15 zayıflar, yüksek snap-back"],
              ["Polyester", "70-130 t", "Düşük uzama, dayanıklı", "Ağır, sert"],
              ["HMPE (Dyneema)", "100-300 t", "Hafif, çok yüksek MBL", "Düşük elastik, pahalı, ısıya hassas"],
              ["Steel wire + tail", "80-200 t", "Düşük uzama, tankerde tercih", "Korozyon, ağır, fişek riski"],
            ],
          },
        },
        {
          subheading: "2.2 Winch, ırgat ve stopper kullanımı",
          paragraphs: [
            `Mooring winch'ler brake holding capacity'ye göre ayarlanır; MEG4 brake rendering point'in SDMBL'nin %60'ında (steel için) veya %80'inde (synthetic için) tutulmasını önerir. Brake test (brake holding capacity test) düzenli yapılmalı ve kaydedilmelidir. Aşırı sıkı fren, line kopmasına; gevşek fren, geminin rıhtımdan uzaklaşmasına neden olur.`,
            `Stopper (chain stopper, carpenter stopper veya rope stopper) line'ı winch'ten bollard'a aktarırken yük tutar. Yanlış stopper tekniği (örn. synthetic line üzerinde chain stopper) hayati tehlike yaratır. Birinci Zabit, doğru stopper'ın doğru line'da kullanıldığını denetler. "Self-tailing" winch'lerde line'ın drum üzerinde minimum tur sayısı korunmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Snap-Back Zone ve Personel Emniyeti",
      sections: [
        {
          subheading: "3.1 Snap-back mekanizması ve risk",
          paragraphs: [
            `Bir mooring line gerildiğinde içinde depolanan elastik enerji, line koptuğunda kopma noktasından her iki yöne kamçı (snap-back) hareketiyle boşalır. Nylon gibi yüksek elastik halatlarda bu hareket ölümcül hızdadır. Snap-back, denizcilikte en sık ölümlü kazaların kaynağıdır; çarpan halat anında öldürür.`,
            `MEG4, eski "boyalı snap-back zone" yaklaşımını revize etmiştir: zone'lar artık tek tek çizgilerle değil, "tüm mooring deck'in potansiyel tehlike bölgesi" olarak ele alınır çünkü line geçiş açısı ve fairlead arızasıyla snap-back yönü değişebilir. Birinci Zabit, personeli line gerginken bight (kıvrım) içinde, fairlead hizasında veya line ile bollard arasında durmaktan men eder.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Snap-back — ölümcül risk",
              text: `Gergin bir mooring line'ın hattında, kıvrımında (bight) veya fairlead arkasında ASLA durulmaz. Line'ın kopma anındaki kamçı hareketi saniyenin altında gerçekleşir ve hiçbir reaksiyon süresi tanımaz. "Stand clear of ropes under tension" temel kuraldır.`,
            },
            {
              type: "example",
              title: "Vaka — mooring fatality",
              text: `Bir tankerde berthing sırasında nylon spring line aşırı yüklenip koptu; snap-back yapan halat, fairlead yakınında duran tayfaya çarparak anında öldürdü. Soruşturma: personel pozisyonu, eskimiş halat ve aşırı winch brake ayarını neden gösterdi.`,
            },
          ],
        },
        {
          subheading: "3.2 Güvenli pozisyonlandırma ve haberleşme",
          paragraphs: [
            `Birinci Zabit, ekibi line ile mümkün olduğunca dik açıda ve kaçış yolu açık konumlara yerleştirir. Heaving line atan personel, line yük altına girmeden önce güvenli alana çekilir. Köprüüstü ile "slack away", "heave up", "hold on", "make fast" gibi standart komutlar net telsiz teyidiyle iletilir; belirsizlik kazaya davetiyedir.`,
            `Aynı anda birden fazla winch operasyonu yapılırken Birinci Zabit operasyonu koordine eder, line'ların aynı anda aşırı yüklenmesini önler. Acil durumda "vira/avara dur" (stop) komutu derhal verilir ve tüm hareket durdurulur.`,
          ],
          bullets: [
            `Line hattında ve bight içinde durma yasağı`,
            `Kaçış yolu (escape route) daima açık`,
            `Standart komut + teyit prensibi`,
            `Tek seferde kontrollü line sayısı`,
            `Acil "stop" komutuna herkesin uyması`,
          ],
        },
      ],
    },
    {
      heading: "4. Demirleme (Anchoring) Operasyonları",
      sections: [
        {
          subheading: "4.1 Demir atma prosedürü",
          paragraphs: [
            `Birinci Zabit baş üstünde demirleme istasyonunu yönetir. Su derinliği, dip yapısı (holding ground), akıntı ve gemi tonajına göre kullanılacak kilit sayısı (shackle/shot) Kaptan ile belirlenir; pratik kural olarak kilit sayısı ≈ derinlik(m)/3 + ek pay olarak hesaplanır, ama dip tutuş ve hava şartına göre artırılır. "Let go" mi yoksa "walk back" mi yapılacağı derinliğe bağlıdır; derin sularda (>50 m) windlass ile yavaşça mayna edilir.`,
            `Demir mayna edilirken Birinci Zabit, zincirin yönünü (lead direction), gerginliğini (light/moderate/heavy strain) ve dräggin olup olmadığını köprüüstüne sürekli raporlar. "Brought up" raporu, demirin tuttuğunu ve geminin zincir üzerinde sallandığını teyit eder.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Walk-back vs let-go",
              text: `Sığ ve yumuşak diplerde "let go" (serbest bırakma) hızlıdır ancak derin/sert diplerde windlass ile "walk back" tercih edilir; aksi halde zincir aşırı hızlanır, brake yanar veya bitter end'den kopar.`,
            },
          ],
        },
        {
          subheading: "4.2 Demir nöbeti ve dragging kontrolü",
          paragraphs: [
            `Demirde kalındığında anchor watch tutulur. Birinci Zabit, vardiya zabitinin GPS anchor position, transit bearing ve radar range ile dragging kontrolü yapmasını sağlar. Dragging tespit edilirse ana makine hazır bekletilir, ikinci demir veya windlass müdahalesi planlanır. Ağır hava beklenirse Kaptan'a derhal raporlanır; çoğu zaman demir vira edip açık denize çıkmak en güvenli seçimdir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Römorkör (Tug) Operasyonları",
      sections: [
        {
          subheading: "5.1 Tug bağlama ve koordinasyon",
          paragraphs: [
            `Römorkör yardımlı manevralarda Birinci Zabit, tug line'ının (genelde tug'ın kendi gear'ı veya geminin messenger'ı ile) gemi bitt/fairlead'ine güvenli bağlanmasını denetler. Panama lead, closed chock veya SWL etiketli bollard kullanılır. Tug line'ın geçtiği fairlead'in SWL'i aşılmamalıdır.`,
            `Tug working area da bir snap-back ve sıkışma riski taşır; tug line gerginken personel hattan uzak durur. Köprüüstü, tug master ile pilot üzerinden koordine olur; Birinci Zabit sahadaki bağlama/çözme zamanlamasını yönetir.`,
          ],
        },
        {
          subheading: "5.2 Bitt, fairlead ve SWL sınırları",
          paragraphs: [
            `SOLAS II-1 Reg. 3-8 ve MSC.1/Circ.1175, towing/mooring fitting'lerinin SWL'inin gemide işaretli olmasını ve dokümante edilmesini zorunlu kılar. Birinci Zabit, kullanılan her bitt ve chock'un işaretli SWL'ini bilmeli ve aşmamalıdır. Yanlış chock seçimi (örn. dar açıyla aşırı yük) fitting'i güverteden söker.`,
          ],
        },
      ],
    },
    {
      heading: "6. Ship-to-Ship (STS) Transfer Operasyonları",
      sections: [
        {
          subheading: "6.1 Fender düzeni ve yanaşma",
          paragraphs: [
            `STS transferde Birinci Zabit, OCIMF/ISGOTT STS guide'a göre primary (Yokohama) fender ve secondary fender düzenini denetler. Fender sayısı, gemilerin boyutuna ve maksimum yanaşma hızına göre belirlenir; pozisyonlar parallel body boyunca dengeli dağıtılır. Yanaşma hızı (approach speed) kritik parametredir ve genelde 0.1-0.3 m/s seviyesinde tutulur.`,
            `İki gemi yan yana geldiğinde mooring line düzeni STS'e özgüdür; head/stern/breast/spring line'lar her iki gemi arasında dengeli kurulur. POAC (Person in Overall Advisory Control) genel koordinasyonu yaparken, Birinci Zabit kendi gemisinin saha uygulamasını yönetir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISGOTT / STS Transfer Guide",
              text: `STS operasyonları, JPO (Joint Plan of Operation) ve STS checklist'lerle yürütülür. Hose connection, drip tray, ESD (Emergency Shutdown) sistemi ve continuous bridge-to-bridge haberleşmesi zorunludur.`,
            },
          ],
        },
        {
          subheading: "6.2 Hose bağlantısı ve transfer kontrolü",
          paragraphs: [
            `Cargo/bunker hose bağlantısı, doğru flange, conta ve bolt sayısıyla yapılır; SWL'i bilinen crane/derrick ile kaldırılır. Birinci Zabit, hose'ların gerginlik (tension) ve sürtme (chafing) açısından sürekli izlenmesini, drip tray ve SOPEP gear'ın hazır olmasını sağlar. Transfer sırasında ESD test edilmiş ve fonksiyonel olmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Çevre Şartları ve Operasyon Limitleri",
      sections: [
        {
          subheading: "7.1 Rüzgar, akıntı ve swell etkisi",
          paragraphs: [
            `Birinci Zabit, manevra emniyeti için çevresel limitleri Kaptan/pilot ile değerlendirir. Yüksek freeboard'lu gemiler (container, PCC, boş tanker) rüzgar yüküne çok hassastır; 25-30 knot üzeri yan rüzgarda tug desteği ve ek line gerekir. Akıntı, özellikle nehir limanlarında berthing açısını ve approach planını belirler.`,
            `Swell varlığında mooring line'lar dinamik (ranging) yükler taşır; line surge ve fender çalışması artar. Bu koşulda line'lar sık kontrol edilir, gerektiğinde tension ayarlanır ve operasyon askıya alınabilir.`,
          ],
        },
        {
          subheading: "7.2 Passing ship etkisi ve mooring tension monitoring",
          paragraphs: [
            `Dar kanal limanlarında geçen geminin yarattığı suction/surge, yanaşmış gemiyi ani gerginlik ve line kopmasına maruz bırakabilir. Birinci Zabit, böyle limanlarda ek line ve tension monitoring sistemini (varsa) izler. Otomatik tension monitoring olmayan gemilerde periyodik manuel kontrol yapılır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Kayıt, Vaka Dersleri ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Operasyon kayıtları ve raporlama",
          paragraphs: [
            `Her manevra sonrası mooring düzeni, kullanılan line sayısı, tug bilgisi ve varsa near-miss/olay deck log'a işlenir. Mooring ekipman inspeksiyonları (line, winch brake, fairlead) MSMP kapsamında kaydedilir. Bu kayıtlar PSC ve vetting denetimlerinde sorgulanır.`,
          ],
        },
        {
          subheading: "8.2 Tipik vaka dersi",
          paragraphs: [
            `Bir LNG terminalinde, brake holding capacity test'i ihmal edilmiş bir winch, swell altında line'ı tutamayıp gemiyi rıhtımdan uzaklaştırdı; loading arm hasar gördü ve ESD devreye girdi. Ders: brake test ve MEG4 ekipman bakımı asla atlanmamalıdır; otomasyon insan denetimini ortadan kaldırmaz.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Pre-arrival kontrol",
              text: `Mooring operasyonu öncesi winch hidroliği, brake band durumu, fairlead serbestliği ve heaving line/messenger hazırlığı kontrol edilmelidir. Donuk veya buzlu güvertede ayrıca kayma riski değerlendirilir.`,
            },
          ],
        },
        {
          subheading: "8.3 Birinci Zabit'in manevra checklist'i",
          bullets: [
            `Mooring plan hazır ve ekibe briefing verildi mi?`,
            `PPE tam ve personel snap-back risklerini biliyor mu?`,
            `Halat/tel durumu (aşınma, MBL) ve winch brake ayarı doğrulandı mı?`,
            `Telsiz haberleşmesi köprü-baş-kıç arasında teyitli mi?`,
            `Tug bağlama noktaları ve SWL sınırları biliniyor mu?`,
            `Demirleme için kilit sayısı ve walk-back/let-go kararı verildi mi?`,
            `STS'te fender/hose/ESD düzeni kontrol edildi mi?`,
            `Çevre limitleri (rüzgar/akıntı/swell) değerlendirildi mi?`,
            `Operasyon ve near-miss kayıtları deck log'a işlendi mi?`,
          ],
          paragraphs: [
            `Bağlama ve manevra, sakin görünen ama bir anda ölümcül hale gelebilen operasyonlardır. Birinci Zabit'in başarısı; net plan, disiplinli briefing, doğru ekipman ve "tension altındaki halattan uzak dur" kültürünü ekibe kazandırmaktan geçer.`,
          ],
        },
      ],
    },
  ],
};

export default content;
