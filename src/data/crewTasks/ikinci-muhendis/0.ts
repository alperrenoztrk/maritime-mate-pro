import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Ana makine günlük operasyonu ve performans izleme",
  roleSlug: "ikinci-muhendis",
  taskIndex: 0,
  estimatedPages: 26,
  intro: `İkinci Mühendis (Second Engineer / 2nd Engineer), makine dairesinin operasyonel başı olarak ana makinenin günlük çalışmasından, performansının izlenmesinden ve anormalliklerin erken tespitinden birinci derecede sorumludur. Bu sorumluluk; günlük log alma, sıcaklık/basınç/devir/yakıt parametrelerinin değerlendirilmesi, indicator diagram ve PMI (Pressure Measurement Indicator) ölçümleri, cylinder drain oil ve scrape-down analizi, scavenge inspection organizasyonu ve performance monitoring kayıtlarının Baş Mühendise raporlanmasını kapsar. Bu bölüm, İkinci Mühendisin ana makine performans yönetiminde izlemesi gereken metodolojiyi adım adım açıklar.`,
  sources: [
    "MARPOL Annex VI — Prevention of Air Pollution from Ships",
    "SOLAS Chapter II-1 Part C — Machinery Installations",
    "STCW Code Section A-III/2 — Chief Engineer & Second Engineer competence",
    "ISM Code — Safety Management System / Planned Maintenance",
    "MAN Energy Solutions — Operation Manual (MC/ME Engines)",
    "WinGD / Wärtsilä Engine Operating Instructions",
    "MEPC.1/Circ.795 — Unified interpretations to MARPOL Annex VI",
    "CIMAC Recommendations — Engine condition monitoring",
    "IACS UR M — Machinery requirements",
  ],
  chapters: [
    {
      heading: "1. Günlük Operasyon Düzeni ve Log Yönetimi",
      lead: `Ana makine performans izlemesinin temeli, disiplinli ve tutarlı veri toplamadır. İkinci Mühendis, ham veriden trend çıkarabilen kişidir.`,
      sections: [
        {
          subheading: "1.1 Engine room log book ve otomatik data logger",
          paragraphs: [
            `Köprü ve makine dairesi arasında "Unmanned Machinery Space (UMS)" notasyonlu gemilerde dahi günlük noon report ve 4 saatlik log kaydı standarttır. İkinci Mühendis, vardiya mühendislerinin aldığı manuel logları (exhaust gas temperature her silindir, scavenge air pressure, jacket cooling water inlet/outlet, LO inlet temp/press, fuel rack/index, turbocharger rpm) gözden geçirir ve otomatik data logger (alarm monitoring system) verisiyle çapraz kontrol eder.`,
            `Modern gemilerde Kongsberg, Praxis veya Lyngsø gibi alarm/monitoring sistemleri tüm parametreleri saniyelik toplar. İkinci Mühendis bu verinin trend ekranlarını günlük inceler; mutlak değerden çok "değişim hızına" (rate of change) odaklanır. Örneğin tek bir silindirin exhaust temp'inin 20-30°C yükselmesi, mutlak değer hâlâ limit içinde olsa bile bir yakıt valfi (fuel injector) arızasının habercisidir.`,
          ],
          bullets: [
            `Her silindir exhaust gas outlet temp ve sapma (deviation from mean)`,
            `Scavenge air pressure ve scavenge air temp (cooler sonrası)`,
            `T/C rpm, T/C inlet/outlet exhaust temp`,
            `Jacket cooling water in/out, LO main inlet temp & press`,
            `Fuel oil viscosity, temp, FO rack/index, fuel pump timing`,
            `Shaft rpm, torque/power (torsionmeter varsa), slip`,
          ],
        },
        {
          subheading: "1.2 Noon report ve performans göstergeleri",
          paragraphs: [
            `Noon report; mil/gün, ortalama hız, ME/AE/boiler FO ve DO tüketimi, LO tüketimi, slip yüzdesi ve hava/deniz koşullarını içerir. İkinci Mühendis, specific fuel oil consumption (SFOC, g/kWh) hesabını yapar ve shop-test/sea-trial referans eğrisiyle kıyaslar. SFOC'taki kalıcı artış; fouling, enjeksiyon bozukluğu, T/C verim kaybı veya governor sapmasına işaret eder.`,
            `Slip (apparent slip), pervane ile gemi hareketi arasındaki teorik farktır; aşırı pozitif slip hull/propeller fouling veya ağır hava, negatif slip ise akıntı/itki etkisidir. Trend grafikleri ile hull cleaning ve propeller polishing kararları için Baş Mühendise teknik gerekçe sunulur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Trend > anlık değer",
              text: `Tek bir log değeri yanıltıcı olabilir. Performans yönetimi, aynı yük ve aynı koşuldaki değerlerin haftalık/aylık trendiyle yapılır. Düzeltilmiş (ISO 3046 ambient correction) değerler kullanılmazsa sıcak/soğuk hava karşılaştırmaları hatalı sonuç verir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Sıcaklık ve Basınç Parametrelerinin Değerlendirilmesi",
      sections: [
        {
          subheading: "2.1 Exhaust gas temperature analizi",
          paragraphs: [
            `Her silindirin egzoz sıcaklığı, o silindirin yük dağılımının doğrudan göstergesidir. Tüm silindirler arasındaki sapma genelde ±%5 (yaklaşık ±15-20°C) içinde tutulur. Bir silindirin yüksek olması; geç yanma, sızdıran egzoz valfi veya fuel index dengesizliği; düşük olması ise düşük kompresyon, atlama yapan enjektör veya yakıt pompası kaçağı anlamına gelebilir.`,
            `T/C öncesi (before turbine) ve sonrası (after turbine) egzoz sıcaklıkları, turbocharger verimini gösterir. After-turbine temp'in yükselmesi T/C kirlenmesini (nozzle ring/turbine fouling) işaret eder ve su yıkaması (turbine/compressor water washing) gerektirebilir.`,
          ],
          table: {
            caption: `Tipik 2-stroke ana makine egzoz/scavenge parametreleri (kılavuz değerler, %100 MCR civarı)`,
            headers: ["Parametre", "Normal Aralık", "Alarm Eşiği", "Olası Arıza"],
            rows: [
              ["Egzoz outlet (silindir)", "350-430°C", ">450°C", "Geç yanma / valf sızıntısı"],
              ["Silindirler arası sapma", "< ±%5", "> ±%8", "Fuel index / enjektör"],
              ["Scavenge air temp (cooler sonrası)", "40-55°C", ">60°C", "Cooler fouling / az su"],
              ["Jacket CW outlet", "80-90°C", ">95°C", "Az debi / hava kilidi"],
              ["LO inlet (bearing)", "40-50°C", ">55°C", "Cooler / pompa sorunu"],
            ],
          },
        },
        {
          subheading: "2.2 Basınç parametreleri ve kaçak tespiti",
          paragraphs: [
            `Scavenge air pressure (boost pressure), motorun "nefes alma" kapasitesini gösterir; düşüş hava soğutucu kirlenmesi, T/C arızası veya hava emiş filtresi tıkanmasına işaret eder. Pmax (maksimum yanma basıncı) ve Pcomp (kompresyon basıncı) değerleri indicator/PMI cihazıyla ölçülür ve denge bu iki değerin tüm silindirlerde eşit olmasıyla sağlanır.`,
            `LO ana hat basıncı, ana yatak ve crosshead yağlamasının teminatıdır; ani düşüş alarm ve gerekirse slow-down/shut-down tetikler. İkinci Mühendis, basınç düşüş alarmlarının kök nedenini (filtre tıkanması, pompa aşınması, by-pass açık kalması) belirler ve geçici müdahale yerine kalıcı çözüm üretir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "LO basınç düşüşü = acil",
              text: `Ana yağ basıncının ani düşüşü, dakikalar içinde yatak hasarına ve seizure'a yol açar. Otomatik slow-down/shut-down devre dışı bırakılmamalı; manuel müdahale gerektiğinde önce Baş Mühendis ve köprü bilgilendirilir, makine güvenli devreye alınır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Indicator Diagram ve PMI Ölçümleri",
      sections: [
        {
          subheading: "3.1 Mekanik indicator ve elektronik PMI",
          paragraphs: [
            `Indicator diagram (PV diyagramı), silindir basıncının krank açısına göre değişimini gösterir ve yanma kalitesinin en doğru kanıtıdır. Geleneksel mekanik indicator yerine günümüzde elektronik PMI (Pressure Measurement Indicator) veya kalıcı cylinder pressure sensörleri kullanılır. İkinci Mühendis bu ölçümleri belirli aralıklarla (genelde haftalık/iki haftalık veya port stay'de) alır.`,
            `Diyagramdan Pmax, Pcomp, mean indicated pressure (Pi), indicated power ve yanma açısı (timing) çıkarılır. Pmax-Pcomp farkı yakıt enjeksiyon zamanlamasının göstergesidir; geç enjeksiyon Pmax'ı düşürür ve egzoz sıcaklığını yükseltir, erken enjeksiyon ise Pmax'ı tehlikeli biçimde yükselterek mekanik aşırı yüke yol açar.`,
          ],
        },
        {
          subheading: "3.2 Power balance ve düzeltme",
          paragraphs: [
            `Silindirler arası güç dengesi (power balancing); fuel index/VIT (Variable Injection Timing) ayarı ile yapılır. Elektronik kontrollü ME/RT-flex motorlarda bu denge ECU tarafından otomatik tutulurken, mekanik MC motorlarda İkinci Mühendis fuel pump rack ayarı ve shim ile manuel düzeltir.`,
            `Dengesizlik kalıcı ise neden enjektör, yakıt pompası plunger/barrel aşınması veya suction/puncture valf arızası olabilir. İkinci Mühendis, ölçüm sonuçlarını PMS'e işler, gerekiyorsa ilgili fuel valfi overhaul iş emrini açar ve sonucu yeni diyagramla doğrular.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Tek silindir yüksek Pmax",
              text: `Bir konteyner gemisinde 5 nolu silindir Pmax'ı 15 bar yüksek ölçüldü; neden erken enjeksiyon yapan aşınmış bir yakıt pompası kam takipçisi idi. Erken müdahale piston crown ve liner çatlağını önledi. PMI ölçümü olmasaydı ancak büyük hasar sonrası fark edilirdi.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Cylinder Drain Oil ve Scrape-Down Analizi",
      sections: [
        {
          subheading: "4.1 Numune alımı ve sahada hızlı test",
          paragraphs: [
            `Scavenge drain (cylinder drain oil) numunesi, silindir astarının ve segman bölgesinin sağlığını gösteren en pratik araçtır. İkinci Mühendis, her silindirden ayrı numune alınmasını organize eder ve sahada Fe (demir) içeriği için hızlı test (örn. magnetic chip / colorimetric kit) yaptırır.`,
            `Yüksek Fe içeriği (genelde >200 ppm bir uyarı, >400 ppm ciddi) astarda corrosive veya adhesive wear, scuffing başlangıcı demektir. Drain oil'in BN (Base Number) reserve değeri ise asit nötralizasyon kapasitesini gösterir; düşük BN, yakıt sülfürüne karşı yetersiz yağlama ve cold corrosion riski anlamına gelir.`,
          ],
        },
        {
          subheading: "4.2 Laboratuvar analizi ve karar verme",
          paragraphs: [
            `Periyodik olarak numuneler shore laboratuvarına gönderilir (spektrometrik element analizi, BN, viskozite, su, kontaminasyon). Sonuçlar trend tablosuna işlenir. Fe trendindeki ani sıçrama, ilgili silindirde scavenge port inspection ve gerekirse cylinder oil feed rate artışını tetikler.`,
            `İkinci Mühendis, bu veriyi cylinder oil tüketimi (g/kWh feed rate) optimizasyonuyla birlikte değerlendirir. Düşük sülfürlü yakıta geçişte (MARPOL Annex VI VLSFO/MGO) düşük BN'li silindir yağına geçiş gerekir; yanlış BN seçimi ya cold corrosion ya da deposit/blow-by sorunlarına yol açar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex VI — yakıt sülfürü ve yağ uyumu",
              text: `2020 global sülfür sınırı %0.50, ECA bölgelerinde %0.10'dur. Yakıt sülfürüne uygun BN'li cylinder oil seçimi (örn. BN40-BN100 aralığı) motor üreticisi tablosuna göre yapılır; uyumsuzluk astarda korozyon veya deposit ile sonuçlanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Scavenge ve Under-Piston İnceleme Organizasyonu",
      sections: [
        {
          subheading: "5.1 Scavenge port inspection programı",
          paragraphs: [
            `Belirli çalışma saatlerinde (tipik 500-1000 saat) scavenge port inspection yapılır. İkinci Mühendis bu işi planlar, enclosed space entry permit prosedürüne uygun gaz ölçümü ve emniyetli kilitlemeyi (turning gear engaged, starting air kapalı) sağlar. İnceleme; piston crown ve segman bölgesi karbon birikimi, segman serbestliği/kırıkları, astar yüzeyi (glazing, scuffing, vertical scratch) ve cylinder cover alt yüzeyini kapsar.`,
            `Bulgular fotoğraflanır ve raporlanır. Glazing (parlak ayna yüzey) yağ filmini bozar ve segman conformability'sini düşürür; scuffing (boyuna çizik/yanma izi) ise ilerlerse seizure'a gider. İkinci Mühendis, erken belirtide feed rate ayarı, running-in prosedürü veya astar honlama kararını Baş Mühendise önerir.`,
          ],
        },
        {
          subheading: "5.2 Scavenge fire riski ve önleme",
          paragraphs: [
            `Scavenge box içinde biriken yanmamış yakıt ve yağ, sıcak gaz blow-by ile tutuşarak scavenge fire çıkarabilir. Belirtiler; ilgili silindir egzoz/scavenge sıcaklık artışı, T/C surging, boya kabarması ve yük düşmesidir. İkinci Mühendis, düzenli scavenge drain temizliği ve under-piston bölge bakımıyla bu riski yönetir.`,
            `Scavenge fire tespitinde yük derhal düşürülür, ilgili silindir yakıtı kesilir, scavenge drain kapatılır ve fixed smothering (CO2/steam) hazır tutulur. Crankcase ile bağlantı (relief valve) nedeniyle crankcase explosion'a sıçramaması için ek dikkat gerekir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Enclosed space entry",
              text: `Scavenge box ve under-piston bölge kapalı alandır. Giriş öncesi O2/LEL/CO ölçümü, turning gear devrede, starting air izolasyonu, standby personel ve permit zorunludur (SOLAS III/19 enclosed space drill ile pekiştirilir).`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Turbocharger ve Hava/Egzoz Sistemi İzleme",
      sections: [
        {
          subheading: "6.1 T/C performans takibi ve water washing",
          paragraphs: [
            `Turbocharger rpm, before/after turbine sıcaklığı ve scavenge basıncı birlikte değerlendirilerek T/C verimi izlenir. Compressor tarafı kirlenirse boost düşer ve SFOC yükselir; bu yüzden compressor-side water washing (genelde günlük/iki günlük) ve turbine-side dry/water washing programlanır.`,
            `İkinci Mühendis, T/C surging (ani hava geri tepmesi sesi ve titreşim) durumunu ciddiye alır; surging ağır hava, ani yük değişimi, kirli turbine veya tek silindir arızasından kaynaklanabilir ve T/C kanatlarına mekanik hasar verir.`,
          ],
        },
        {
          subheading: "6.2 Air cooler ve hava emiş sistemi",
          paragraphs: [
            `Scavenge air cooler (charge air cooler) performansı; hava giriş/çıkış sıcaklığı ve su tarafı diferansiyel basınçla izlenir. Air-side fouling boost'u düşürür, water-side fouling soğutmayı bozar. Cooler sonrası su damlası tutucu (water mist catcher) tıkanması ya da kondens drain'in açık kalmaması silindire su girişine yol açar.`,
            `Hava emiş filtreleri ve engine room ventilasyonu da performansı etkiler; yüksek emiş sıcaklığı (sıcak iklim) ambient correction ile değerlendirilmezse yanlış teşhise yol açar.`,
          ],
        },
      ],
    },
    {
      heading: "7. Yakıt Sistemi ve Performans İlişkisi",
      sections: [
        {
          subheading: "7.1 Yakıt kalitesi, viskozite ve enjeksiyon",
          paragraphs: [
            `Ana makine performansı doğrudan yakıt kalitesine bağlıdır. İkinci Mühendis, viscotherm/heater ile enjeksiyon viskozitesini (tipik 10-15 cSt) sabit tutar; düşük viskozite kötü atomizasyon ve pompa aşınması, yüksek viskozite zayıf enjeksiyon ve karbonlaşma yapar.`,
            `Bunker analiz raporu (CCAI, density, sülfür, su, kül, kat. fines/Al+Si) değerlendirilir. Yüksek cat-fines (alüminyum+silikon) astar ve enjeksiyon ekipmanını aşındırır; settling/service tank ve purifier performansı bu yüzden kritiktir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Cat-fines kontrolü",
              text: `ISO 8217 sınırı Al+Si için bunker'da genelde max 60 mg/kg olsa da, motor girişinde 10-15 mg/kg altına düşürülmesi hedeflenir. Purifier debisini düşürmek (uzun tutma süresi) ve doğru gravity disc seçimi cat-fines giderimini iyileştirir.`,
            },
          ],
        },
        {
          subheading: "7.2 Fuel changeover ve düşük sülfürlü yakıt",
          paragraphs: [
            `ECA giriş/çıkışında HFO↔MGO/VLSFO changeover, yavaş ve kontrollü (termal şok ve viskozite kaybını önlemek için) yapılır. İkinci Mühendis, changeover sırasında yakıt pompası ve enjektör kaçaklarını izler; düşük viskoziteli yakıtta pompa içi kaçak artar ve fuel index yükselir.`,
            `Bu geçişler performans loglarında geçici sapmalar yaratır; İkinci Mühendis bu sapmaları yakıt türüyle etiketleyerek trend yorumunun bozulmamasını sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "8. MARPOL Annex VI Uyumu ve Enerji Verimliliği",
      sections: [
        {
          subheading: "8.1 EEXI, CII ve performans bağlantısı",
          paragraphs: [
            `MARPOL Annex VI kapsamında EEXI (Energy Efficiency Existing Ship Index) ve yıllık CII (Carbon Intensity Indicator) derecelendirmesi yürürlüktedir. İkinci Mühendisin tuttuğu performans verisi (SFOC, hız-güç eğrisi, fouling trendleri), geminin CII derecesini doğrudan etkiler ve SEEMP Part III aksiyonlarının (hull cleaning, derating, trim optimizasyonu) gerekçesini oluşturur.`,
            `NOx Technical Code kapsamında Tier II/III uyumu; enjeksiyon zamanlaması, EGR/SCR sistemleri ve engine group parametrelerinin EIAPP/Technical File'a uygun tutulmasını gerektirir. İkinci Mühendis, ayar değişikliklerinin onaylı sınırlar içinde kalmasını ve Record Book of Engine Parameters'ın güncel olmasını gözetir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "NOx Technical File",
              text: `Motor ayarları (timing, fuel cam, enjektör tipi) EIAPP sertifikasının ekindeki onaylı aralıkta kalmalıdır. Onaysız değişiklik PSC ve flag denetiminde non-conformity yaratır ve EIAPP'i geçersiz kılabilir.`,
            },
          ],
        },
        {
          subheading: "8.2 Performans verisinin raporlanması",
          paragraphs: [
            `İkinci Mühendis, periyodik performance report'u Baş Mühendise ve şirket teknik birimine (superintendent) sunar. Şirketlerin çoğunda CASPER, Marorka, Eniram benzeri shore-based performance monitoring platformları kullanılır; gemiden gelen veri burada filo geneliyle kıyaslanır.`,
            `Anormal trendler (SFOC artışı, T/C verim kaybı, artan Fe içeriği), erken bakım planına dönüştürülerek beklenmedik arıza (breakdown) ve charter party off-hire riski azaltılır.`,
          ],
        },
      ],
    },
    {
      heading: "9. Anormallik Yönetimi ve Raporlama",
      sections: [
        {
          subheading: "9.1 Erken uyarı ve kök neden analizi",
          paragraphs: [
            `İkinci Mühendis, anormal bir parametreyi tek başına yorumlamaz; ilişkili parametrelerle (örn. yüksek egzoz + düşük Pmax + yüksek Fe) bir arada değerlendirir ve olası kök neden hipotezini test eder. Bu yaklaşım, parça değiştir-bak (parts swapping) gibi maliyetli ve riskli yöntemleri önler.`,
            `Bulgular, derecelendirilmiş (bilgi / izle / acil müdahale) biçimde Baş Mühendise raporlanır. Acil durumlarda (LO basınç düşüşü, oil mist alarmı, scavenge fire) önce makine güvenli devreye alınır, köprü bilgilendirilir ve sonra teşhise geçilir.`,
          ],
        },
        {
          subheading: "9.2 Kayıt disiplini ve devir teslim",
          paragraphs: [
            `Tüm ölçümler, ayarlar ve müdahaleler PMS ve engine log'a işlenir. Bu kayıtlar; klas survey, PSC, flag ve P&I denetimlerinde geminin "due diligence" kanıtıdır. Eksik kayıt, sigorta ve sorumluluk davalarında geminin aleyhine yorumlanır.`,
            `Vardiya devir tesliminde açık işler, izlenen anormallikler ve geçici düzenlemeler (temporary repair) yazılı aktarılır; bu süreklilik, performans yönetiminin kişiye bağlı kalmamasını sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 İkinci Mühendisin günlük performans checklist'i",
          bullets: [
            `Tüm silindir egzoz sıcaklıkları ve sapma normal mi?`,
            `Scavenge basıncı/sıcaklığı ve T/C rpm referans trendde mi?`,
            `Jacket CW ve LO sıcaklık/basınç değerleri limit içinde mi?`,
            `SFOC ve slip trendi referans eğriye göre değerlendirildi mi?`,
            `PMI/indicator ölçümleri zamanında alındı, power balance korunuyor mu?`,
            `Cylinder drain Fe ve BN trendi izleniyor mu, analiz numunesi gönderildi mi?`,
            `Scavenge inspection programı güncel, son bulgular raporlandı mı?`,
            `Cat-fines/yakıt kalitesi ve changeover etkileri etiketlendi mi?`,
            `NOx Technical File ve Annex VI parametreleri onaylı aralıkta mı?`,
            `Anormallikler derecelendirilip Baş Mühendise raporlandı mı?`,
          ],
          paragraphs: [
            `İkinci Mühendisin ana makine performans yönetimindeki başarısı, "her şey yolunda giderken" görünmez kalan ama bir arıza geldiğinde geminin sefer emniyetini ve ticari sürekliliğini koruyan disiplinli ölçümden, trend okumadan ve erken müdahaleden gelir. İyi tutulmuş bir performans defteri, hem mekanik bir felaketi önler hem de geminin MARPOL Annex VI uyumunu ve charterer güvenini sürdürür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
