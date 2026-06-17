import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Bağlama ve manevra operasyonları",
  roleSlug: "ustagemici",
  taskIndex: 1,
  estimatedPages: 26,
  intro: `Usta Gemici (Able Seaman / AB), yanaşma, kalkma ve demir operasyonlarında baş veya kıç istasyonunun sahadaki temel uygulayıcısıdır; halat/tel kullanımı, winch (ırgat) operasyonu, heaving line (atma halatı) atışı, bollard/bitt bağlama ve tug (römorkör) bağlama-çözme işlerini bizzat yürütür. Bu operasyonlar gemicilik kazalarının en sık ve en ölümcül olanlarını barındırır; özellikle snap-back zone (halatın kopunca savrulduğu bölge), winch kapma ve ezme yaralanmaları her yıl can almaya devam etmektedir. Bu bölüm; mooring (bağlama) düzeninin mantığını, halat/tel davranışını, winch ve bollard tekniklerini, heaving line ve tug operasyonunu, komut disiplinini ve güvenli çalışma alanı yönetimini saha gözüyle adım adım açıklar.`,
  sources: [
    "Code of Safe Working Practices for Merchant Seafarers (COSWP) — Bölüm 26 Mooring Operations",
    "OCIMF Mooring Equipment Guidelines (MEG4)",
    "SOLAS Chapter II-1 Reg. 3-8 — Towing and Mooring Equipment",
    "STCW Code Section A-VI/1 — Safety familiarisation and basic training",
    "ISGOTT 6 (mooring sırasında tanker güvenliği bölümleri)",
    "MAIB / TAIB mooring kaza raporları (snap-back ve winch yaralanmaları)",
    "ICS Bridge Procedures Guide — manevra ve istasyon iletişimi",
    "ILO MLC 2006 — çalışma güvenliği ve sağlık hükümleri",
  ],
  chapters: [
    {
      heading: "1. Mooring Operasyonunun Mantığı ve İstasyon Düzeni",
      lead: `Bağlama, gemiyi rıhtıma sabitleyen halat ağıdır; her halatın bir işlevi vardır ve AB'nin hangi halatı, ne zaman, hangi sırayla aldığını/verdiğini bilmesi operasyonun güvenliğini belirler.`,
      sections: [
        {
          subheading: "1.1 Halat tipleri ve işlevleri (head, breast, spring)",
          paragraphs: [
            `Standart mooring düzeninde her halatın görevi farklıdır. Head line (baş halatı) ve stern line (kıç halatı) gemiyi rıhtıma yaklaştırıp ileri-geri kaymayı sınırlar; breast line (apiko/dik halat) gemiyi rıhtıma dik tutarak bordo açılmasını engeller; spring (açmaz/spring) halatları ise gemiyi boylamasına (öne-arkaya) kaymaya karşı kilitler. Tipik bir gemi 3+2+1 veya benzeri bir kombinasyonda baş ve kıçta dağıtılmış halat alır.`,
            `AB, manevra planında kendi istasyonunun (baş/kıç) hangi halatları, hangi sırayla göndereceğini reisten (bosun) ve istasyon zabitinden öğrenir. Yanlış sırada halat vermek (örn. spring'i geç vermek) gemiyi kaydırabilir; bu yüzden komut beklenir, kendi kafasına göre halat verilmez.`,
            `Halatlar bollard'a (rıhtım babası) "eye" (kasa/göz) ile geçirilir; aynı bollard'da birden çok geminin halatı varsa "dip the eye" tekniği uygulanır: sonra gelen geminin kasası, önceki geminin kasasının altından geçirilerek her gemi kendi halatını bağımsız çözebilir.`,
          ],
          bullets: [
            `Head/Stern line: ileri-geri kaymayı sınırlar`,
            `Breast line: bordoyu rıhtıma dik tutar`,
            `Spring: boylamasına kaymayı kilitler`,
            `Sıra ve komut zabitten gelir; AB kendi kararıyla halat vermez`,
          ],
        },
        {
          subheading: "1.2 İstasyon iletişimi ve standart komutlar",
          paragraphs: [
            `Baş ve kıç istasyonları köprüüstüyle telsizle (VHF/UHF portable) bağlantılıdır. Standart komutlar tek anlamlıdır: "Send the head line ashore" (baş halatını karaya gönder), "Heave on the spring" (spring'i vira et / sık), "Slack away the breast" (apikoyu boşalt/laçka et), "Make fast" (volta et / bağla), "Hold on" (tut, kaçırma), "Let go" (koy ver / fora). AB komutu duyduğunda doğru halat üzerinde doğru aksiyonu alır.`,
            `Mesafe ve durum köprüüstüne sürekli raporlanır: "Two shackles to go", "All gone forward" (baştaki tüm halatlar çözüldü), "Made fast forward" (baş bağlandı). Bu geri bildirim olmadan köprüüstü manevrayı kör yürütür; AB'nin net ve zamanında raporlaması manevranın gözüdür.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Tek dil — standart terim",
              text: `Mooring komutlarında "heave / slack / hold / make fast / let go" terimleri uluslararası standarttır. Çok uluslu ekipte herkes aynı terimi aynı anlamda kullanır; "biraz al, biraz ver" gibi belirsiz ifadeler kaza üretir. AB bu terimleri ezbere ve refleks düzeyinde uygulamalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Snap-Back ve Tehlikeli Bölge Yönetimi",
      sections: [
        {
          subheading: "2.1 Snap-back zone nedir, neden öldürür?",
          paragraphs: [
            `Gerilim altındaki bir halat veya tel koptuğunda, depoladığı elastik enerjiyi kamçı gibi geri savurarak boşaltır; bu savrulma bölgesine snap-back zone denir. Sentetik halatlar (özellikle naylon) yüksek esneklik nedeniyle çok daha tehlikeli savrulur; kopan uç saniyenin altında insan vücudunu parçalayacak hızda hareket eder. Bu nedenle mooring yaralanmalarının büyük kısmı ölümcül veya uzuv kayıplıdır.`,
            `Snap-back bölgesi sadece halatın doğrultusu değil; halatın bollard, fairlead (kılavuz makara) veya pedestal üzerinden büküldüğü her noktada savrulma yönü değişebilir. MEG4, "tüm güverte gerilim altında potansiyel snap-back bölgesidir" yaklaşımını benimser; eski "boyalı snap-back zone çizgisi" tek başına güvenli kabul edilmez.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Asla gergin halatın doğrultusunda durma",
              text: `Gerilim altındaki halatın/telin uzun ekseninde ve büküldüğü makaraların önünde-arkasında durmak ölümcüldür. AB her zaman halatın savrulma bölgesinin DIŞINDA, kaçış yolu açık bir konumda durur. "Bir saniyelik" duruş bile kopma anına denk gelirse hayata mal olur.`,
            },
          ],
        },
        {
          subheading: "2.2 Güvenli duruş, kaçış yolu ve ayak konumu",
          paragraphs: [
            `AB, halat alırken/verirken ayağını asla halat kangalının (coil) içine veya altından geçen halatın üstüne koymaz; halat ani gerilince ayak kapılır ve sürüklenir. Eller bollard turlarından, fairlead ağzından ve winch tamburundan uzak tutulur; "nip point" (sıkışma noktası) parmak ve el kayıplarının başlıca sebebidir.`,
            `Çalışma alanında daima açık bir kaçış yolu (escape route) planlanır; halat gerildiğinde nereye sıçranacağı önceden bilinir. Kalabalık, kaygan veya engelli güverte snap-back kaçışını imkânsızlaştırır; bu yüzden 3.1'de anlatılan güverte hazırlığı kritiktir.`,
          ],
          table: {
            caption: `Mooring İstasyonunda Başlıca Tehlike Noktaları`,
            headers: ["Tehlike", "Mekanizma", "Korunma"],
            rows: [
              ["Snap-back", "Kopan halatın savrulması", "Savrulma bölgesi dışında dur"],
              ["Nip point", "Tamburda el/parmak sıkışması", "Eli tambura yaklaştırma"],
              ["Riding turn", "Tamburda turların binmesi", "Düzgün sar, gerginken müdahale etme"],
              ["Ayak kapılması", "Kangal/halat üstüne basma", "Halattan ve kangaldan uzak dur"],
              ["Düşme", "Kaygan/dağınık güverte", "Düzenli, açık çalışma alanı"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Çalışma Alanı Hazırlığı ve PPE",
      sections: [
        {
          subheading: "3.1 İstasyon hazırlığı ve risk değerlendirmesi",
          paragraphs: [
            `Manevra öncesi AB, istasyonunu hazırlar: halatlar fora edilir, kangallar düzgün serilir, fairlead'ler temizlenir, atma halatı (heaving line) hazır tutulur, winch test edilir ve fren durumu kontrol edilir. Güverte; yağ, su, pas ve engellerden arındırılır çünkü mooring sırasında hızlı hareket gerekir.`,
            `İşe başlamadan toolbox talk / risk assessment yapılır: hangi halatların hangi sırada gideceği, snap-back bölgeleri, rüzgâr/akıntı durumu ve görev dağılımı konuşulur. AB, kendi rolünü ve "dur" sinyalini net bilir; belirsizlik varsa sorar.`,
          ],
          bullets: [
            `Halatlar fora, kangallar düzgün serili`,
            `Fairlead ve makaralar temiz, dönüyor`,
            `Heaving line hazır, ucu ağırlıklı (monkey fist)`,
            `Winch test edildi, fren tutuyor`,
            `Toolbox talk yapıldı, roller net`,
          ],
        },
        {
          subheading: "3.2 Kişisel koruyucu donanım (PPE)",
          paragraphs: [
            `Mooring istasyonunda zorunlu PPE: baret, çelik burunlu emniyet ayakkabısı, mooring eldiveni (kavrama sağlayan ama makaraya kapılmayacak tip), iş tulumu ve gece operasyonunda reflektörlü yelek. Eldiven seçimi önemlidir; bol/yırtık eldiven tambura kapılma riskini artırır.`,
            `Gece veya kötü görüş koşulunda istasyon aydınlatması yeterli olmalı, ama köprüüstünün görüşünü bozmayacak şekilde yönlendirilmelidir. AB telsizini ve düdüğünü hazır bulundurur; gürültülü ortamda el işaretleri de kullanılabilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Eldiven tambura kapılma kapısıdır",
              text: `Halat tamburda dönerken eldivenli el tambura çok yaklaşırsa eldiven kapılır ve el içeri çekilir. Kural: tambur dönerken el daima güvenli mesafede; halatı tambura "besleyen" el, dönen yüzeyden uzakta tutulur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Winch (Irgat) Operasyonu",
      sections: [
        {
          subheading: "4.1 Vira, laçka ve fren kullanımı",
          paragraphs: [
            `Winch ile halat virası (heaving) yaparken AB, tambura yeterli tur (genelde 3-4 tur) sarar ve kuyruk ucundan kontrollü gerginlik uygular. Aşırı tur veya gevşek besleme "riding turn" (turların üst üste binmesi) yaratır; bu, halatın tamburda kilitlenmesine ve kontrol kaybına yol açar. Riding turn oluşursa halat gerginken müdahale edilmez; gerilim alınana kadar beklenir.`,
            `Brake (fren) ayarı kritiktir: MEG4'e göre winch freni, halatın MBL'sinin (Minimum Breaking Load) belirli bir yüzdesinde "render" edecek (kayarak gerilimi boşaltacak) şekilde ayarlanır; böylece aşırı gerilimde halat kopmadan fren kayar. AB, fren tutturma (rendering) testi ve doğru fren basıncını reisin talimatıyla uygular.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MEG4 — Brake rendering",
              text: `OCIMF MEG4, mooring winch frenlerinin tasarım gerilimi aşıldığında kontrollü kaymasını (rendering) önerir; bu, halatın kopup snap-back yapması yerine güvenli şekilde gevşemesini sağlar. Fren ayarı ve periyodik test bu güvenliğin temelidir.`,
            },
          ],
        },
        {
          subheading: "4.2 Self-tensioning winch ve riskleri",
          paragraphs: [
            `Bazı gemilerde otomatik gerginlik ayarlı (self-tensioning / auto-tension) winch'ler vardır; gemi hareket ettikçe halatı otomatik vira/laçka ederek sabit gerilim tutar. Ancak bu mod, ani yük artışında halatı aşırı zorlayabilir veya beklenmedik vira yaparak güvertede halatı hareketlendirebilir. Yanaşmada genelde auto-tension kapatılır, manuel kontrol tercih edilir.`,
            `AB, winch panelindeki mod (manuel/auto), tambur (drum) ile warp end (kabestan başı) seçimi ve acil durdurma butonunu bilir. Tambura sarılı halatla aynı anda warp end'de iş yapılmaz; mekanik karışıklık tehlikelidir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Heaving Line ve Bollard Bağlama Tekniği",
      sections: [
        {
          subheading: "5.1 Heaving line (atma halatı) atışı",
          paragraphs: [
            `Mooring halatı doğrudan rıhtıma uzanamayacak kadar ağır olduğundan, önce ince bir atma halatı (heaving line) atılır; ucundaki ağırlık (monkey's fist) sayesinde karaya ulaşır ve karadaki mooring ekibi bu ipi çekerek ana halatın kasasını rıhtıma alır. AB, atma halatını düzgün kangallar halinde toplar, yarısını atış eline alır, hedefe ve rüzgâra göre nişan alıp atar.`,
            `Monkey's fist içine asla metal/ağır cisim konulmaz; bu, karadaki kişiyi ağır yaralayabilir. MEG4 ve COSWP, atma halatı ağırlığının yumuşak ve sınırlı kütlede olmasını ister. Atış yapılırken rıhtımdaki kişilerin uyarılması ("heads up — line coming over") iyi pratiktir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Monkey's fist'e ağırlık koyma",
              text: `Atma halatı ucuna cıvata, somun gibi metal koymak, karaya isabet eden kişide ölümcül yaralanmaya yol açabilir. Ağırlık yumuşak ve hafif olmalı; rıhtımdaki ekip atıştan önce uyarılmalıdır.`,
            },
          ],
        },
        {
          subheading: "5.2 Bollard'a volta etme ve figure-of-eight",
          paragraphs: [
            `Halat bollard'a (bitt) sabitlenirken "figure-of-eight" (sekiz çizerek) turlar atılır; bu, gerilimi dağıtır ve gerektiğinde halatı kontrollü laçka etme imkânı verir. Son tur olarak güvenli "locking turn" atılabilir ama auto-tension veya sık ayar gereken halatlarda kilitleme yapılmaz; çünkü hızlı gevşetme gerekebilir.`,
            `AB, "make fast" komutunda halatı doğru gerginlikte volta eder; "single up" komutunda ise kalkış öncesi fazla halatları teker teker çözerek minimuma indirir. Çözme sırasında hangi halatın gerilimde olduğu sürekli izlenir; gergin halat asla elle çözülmeye çalışılmaz, önce winch ile gerilim alınır.`,
          ],
          table: {
            caption: `Temel Mooring Komutları ve AB Aksiyonu`,
            headers: ["Komut", "Anlamı", "AB Aksiyonu"],
            rows: [
              ["Send ashore", "Karaya gönder", "Heaving line at, halatı ver"],
              ["Make fast", "Bağla / volta et", "Figure-of-eight ile bollard'a sabitle"],
              ["Heave", "Vira / sık", "Winch ile gerginliği artır"],
              ["Slack away", "Laçka / boşalt", "Kontrollü gevşet"],
              ["Hold on", "Tut, kaçırma", "Gerginliği koru, fren tut"],
              ["Single up", "Tekle", "Fazla halatları çöz, mini düzene in"],
              ["Let go", "Fora / koy ver", "Halatı tamamen çöz, içeri al"],
            ],
          },
        },
      ],
    },
    {
      heading: "6. Tug (Römorkör) Operasyonları",
      sections: [
        {
          subheading: "6.1 Tug halatı alma ve bağlama",
          paragraphs: [
            `Yanaşma/kalkmada römorkörler gemiye iter veya çeker. Tug bağlamada genelde römorkörün messenger (ince halat) ile gönderdiği tug line gemiye alınır ve uygun bollard veya tug bitt'e/panama leadine sabitlenir. AB, tug halatını alırken halatın hangi makaradan geçeceğini ve hangi babaya volta edileceğini reisten öğrenir; yanlış lead, halatı gemi yapısına sürter ve keser.`,
            `Tug operasyonu sırasında gemi ile römorkör arasındaki halat ani gerilebilir; bu da bir snap-back kaynağıdır. AB, tug halatının doğrultusundan uzak durur ve römorkörün "ileri/geri" çekiş yönünü dikkate alır. Köprüüstü-römorkör koordinasyonu pilot/kaptan eliyle yürür; AB sahada güvenli bağ ve çözmeden sorumludur.`,
          ],
        },
        {
          subheading: "6.2 Tug çözme ve girtalin",
          paragraphs: [
            `Manevra bitince tug çözülür. Gergin tug halatı asla elle çözülmez; köprüüstünden römorköre "ease the line" iletilir, gerilim alınınca AB halatı kontrollü çözer ve römorköre iade eder. Quick-release (hızlı çözme) düzeneği varsa AB bunun kullanımını ve hangi durumda devreye alınacağını bilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Tug halatı gerginken çözme denemesi",
              text: `Çeşitli kazalarda AB, hâlâ çekiş yapan römorkörün halatını erken çözmeye çalışmış; halat aniden kurtulup savrulmuş veya gemi kontrolden çıkmıştır. Ders: tug halatı yalnızca gerilim alındıktan ve komut geldikten sonra çözülür; "az kaldı" diye erken müdahale edilmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Demir (Anchor) Operasyonları",
      sections: [
        {
          subheading: "7.1 Demir atma ve vira",
          paragraphs: [
            `Demir atmada AB, baş istasyonunda windlass (demir ırgatı) operasyonuna ve kilit (shackle) sayımına destek verir. Köprüüstü "let go" dediğinde demir bırakılır, zincir kilitleri (her kilit ~27.5 m) sayılarak verilen kilit kadar zincir laçka edilir ve istasyon "two shackles in the water" gibi rapor verir. Brake ve bow stopper (zincir tutucu) kullanımı, AB'nin bildiği temel windlass becerileridir.`,
            `Vira (heave anchor) sırasında zincirin gerginliği, yönü ("up and down" — dik geldi, "anchor aweigh" — demir dipten ayrıldı) ve çamur durumu raporlanır. Zincir aşırı gergin veya windlass zorlanıyorsa derhal bildirilir; köprüüstü gemiyi zincir üstüne sürerek yükü azaltabilir.`,
          ],
          table: {
            caption: `Demir İstasyonu Standart Raporları`,
            headers: ["Rapor", "Anlamı"],
            rows: [
              ["Brought up", "Demir tuttu, gemi sabit"],
              ["Two shackles in the water", "İki kilit zincir suda"],
              ["Up and down", "Zincir dikine geldi"],
              ["Anchor aweigh", "Demir dipten ayrıldı"],
              ["Clear anchor", "Demir temiz (zincir dolanmamış)"],
              ["Foul anchor", "Demir/zincir dolanmış"],
            ],
          },
        },
        {
          subheading: "7.2 Windlass ve zincir güvenliği",
          paragraphs: [
            `Windlass çalışırken AB, zincir hareketinin ve gypsy (zincir dişlisi) bölgesinin uzağında durur; kopan veya kapan zincir ölümcüldür. Demir verilirken oluşan toz, kıvılcım ve gürültü için gözlük ve kulaklık tavsiye edilir. Bow stopper olmadan uzun süre demirde durulmaz; tüm yük sadece windlass freninde kalmamalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Ekipman Bakımı ve Kontrol",
      sections: [
        {
          subheading: "8.1 Halat ve tel muayenesi",
          paragraphs: [
            `Mooring güvenliği büyük ölçüde ekipman durumuna bağlıdır. AB, halatlarda aşınma, kesik, glazing (ısıdan parlama), iç lif bozulması ve teller de tel kopması/kuş kafesi (birdcaging), pas, gevşeme açısından düzenli kontrol eder. Hasarlı halat/tel raporlanır ve servisten çekilir; "biraz daha dayanır" mantığı snap-back kazası üretir.`,
            `MEG4, halatların bir Line Management Plan ile takip edilmesini (retirement kriteri, kullanım kaydı) önerir. AB, halatın hangi istasyonda ve ne kadar kullanıldığını kayıt altına alınmasına yardımcı olur; uçların periyodik "end-for-end" değişimi aşınmayı dengeler.`,
          ],
        },
        {
          subheading: "8.2 Winch, fairlead ve stopper bakımı",
          paragraphs: [
            `Fairlead ve roller'lar serbest dönmeli; sıkışmış makara halatı sürter ve keser. Stopper (volta zinciri/halatı), bollard kaynakları ve panama leadleri çatlak/aşınma için kontrol edilir. Winch freni periyodik test edilir ve greasing (gresleme) programına göre yağlanır. Bu bakımlar 3 numaralı görev kapsamındaki güverte bakımıyla iç içedir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Stopper doğru malzeme olmalı",
              text: `Halat stopper'ı (volta) doğru malzemeden olmalı: sentetik halat için sentetik stopper, tel için zincir stopper kullanılır. Yanlış stopper kayar veya keser; halat winch'ten bollard'a aktarılırken bu kritik bir ara güvenlik adımıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Tipik Hatalar ve Vaka Dersleri",
      sections: [
        {
          subheading: "9.1 Snap-back ve duruş hataları",
          paragraphs: [
            `Mooring ölümlerinin büyük kısmı, AB'nin gergin halatın savrulma bölgesinde durmasından kaynaklanır. Bazı vakalarda kişi doğru bölgede başlamış ama halat fairlead üzerinden büküldüğü için savrulma yönü değişmiştir. Ders: tek bir "güvenli çizgi"ye güvenme; tüm gerilim altındaki güverteyi tehlikeli kabul et ve kaçış yolunu açık tut.`,
            `Diğer sık hata, çalışma alanının dağınık/kaygan olması ve kaçışın imkânsızlaşmasıdır. Halat kangallarının ayak altına serilmesi, yağ/su birikintisi ve aşırı kalabalık istasyon kazayı büyütür.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Fairlead'in değiştirdiği savrulma yönü",
              text: `Bir tankerde mooring sırasında kopan halat, herkesin "güvenli" sandığı bölgeye savruldu çünkü halat bir panama leadinden geçerken doğrultu değiştiriyordu. Sonuç ölümcül oldu. MEG4 sonrası yaklaşım: snap-back bölgesini tek çizgiyle değil, halatın tüm büküm noktalarına göre değerlendir.`,
            },
          ],
        },
        {
          subheading: "9.2 İletişim ve sıra hataları",
          paragraphs: [
            `Komut beklemeden halat verme/çözme, yanlış halatı vira etme veya raporlamayı geciktirme manevrayı bozar. "Single up" sırasında hangi halatın hâlâ yük taşıdığını bilmeden çözmeye kalkmak tehlikelidir. AB, her zaman komutu duyduğunu teyit eder ve yaptığını raporlar; sessizlik köprüüstünü kör bırakır.`,
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Mooring istasyonu checklist'i",
          bullets: [
            `Toolbox talk yapıldı mı, rolüm ve halat sırası net mi?`,
            `İstasyon temiz, halatlar fora, fairlead'ler dönüyor mu?`,
            `PPE tam mı (baret, çelik burun, mooring eldiveni, yelek)?`,
            `Snap-back bölgelerini biliyor, kaçış yolum açık mı?`,
            `Heaving line hazır, monkey's fist ağırlıksız/yumuşak mı?`,
            `Winch test edildi, fren doğru ayarda mı (rendering)?`,
            `Komutu teyit edip yaptığımı raporluyor muyum?`,
            `Gergin halatı elle çözmüyor, önce gerilimi alıyor muyum?`,
            `Hasarlı halat/tel raporlandı, servisten çekildi mi?`,
          ],
          paragraphs: [
            `Bağlama ve manevra, Usta Gemici'nin en görünür ama en tehlikeli görevidir. Doğru sırayla verilen bir halat, doğru ayarlı bir winch freni ve savrulma bölgesinin dışında duran disiplinli bir gemici; bunların her biri bir uzvu, bir hayatı kurtarır. Mooring rutindir ama rutinin içindeki dikkatsizlik ölümcüldür; AB her manevrayı ilk gün gibi ciddiye almalıdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
