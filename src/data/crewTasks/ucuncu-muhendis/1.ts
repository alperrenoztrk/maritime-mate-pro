import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yardımcı makine ve ekipman bakımı",
  roleSlug: "ucuncu-muhendis",
  taskIndex: 1,
  estimatedPages: 26,
  intro: `Üçüncü/Dördüncü Mühendis (Third/Fourth Engineer), makine dairesindeki yardımcı makinelerin (auxiliary machinery) günlük ve periyodik bakımından doğrudan sorumlu kişidir. Bu kapsam; pompalar (ballast, bilge, transfer, service), kompresörler (starting air, service air), separatörler/purifierler (FO, LO, sludge), kazan (auxiliary boiler) ve basit elektrik/mekanik bakım işlerini içerir. Bu bölüm, valve overhaul, gasket değişimi, bearing kontrolü ve filter temizliği gibi rutin işlerin doğru, planlı (PMS) ve emniyetli yapılmasının metodolojisini adım adım açıklar.`,
  sources: [
    "ISM Code — Section 10 (Maintenance of the Ship and Equipment)",
    "SOLAS Chapter II-1 — Machinery Installations",
    "MARPOL Annex I — Oil Filtering & Separation (15 ppm)",
    "Class Survey Requirements (IACS UR Z; DNV/LR/ABS Machinery Rules)",
    "Manufacturer O&M Manuals (Alfa Laval, Westfalia, Sperre, Hamworthy)",
    "Planned Maintenance System (PMS) — AMOS / TM Master / ShipManager",
    "ICS Bridge Procedures & Engine Room Resource Management (ERM)",
    "Reed's Marine Engineering / Pounder's Marine Diesel Engines",
  ],
  chapters: [
    {
      heading: "1. Yardımcı Makine Bakımının Kapsamı ve PMS Disiplini",
      lead: `Yardımcı makineler, ana makine kadar göz önünde olmasa da geminin günlük yaşanabilirliğini ve operasyonel hazırlığını belirler. Bunların bakımı plansız değil, PMS iş emrine bağlı yürütülür.`,
      sections: [
        {
          subheading: "1.1 Planlı Bakım Sistemi (PMS) ile iş yürütme",
          paragraphs: [
            `Her yardımcı makine için PMS yazılımında (AMOS, TM Master, ShipManager) bir job kalemi tanımlıdır; bu kalem running hour (çalışma saati) veya calendar (takvim) tetiklemesiyle açılır. Üçüncü/Dördüncü Mühendis, açık iş emirlerini vardiya planına göre dağıtır, gerekli yedek parça ve sarf malzemeyi ROB (remaining on board) kontrolü ile teyit eder ve işi tamamladığında counter reading + yapılan işin açıklamasını sisteme kapatır.`,
            `PMS kayıtları yalnızca şirket için değil, klas (class) ve PSC (Port State Control) denetimleri için de delildir. CMS (Continuous Machinery Survey) altında olan ekipmanlarda, mühendis tarafından yapılan açma-kapama (open-up) işleri "crew survey" olarak klasa raporlanabilir; bu yüzden iş öncesi/sonrası fotoğraf, ölçü ve clearance değerleri kayda geçer.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "ISM Code 10.3",
              text: `Şirket, ana makine ve emniyet açısından kritik yardımcı sistemlerin ani arızasında bile emniyetin korunması için "critical equipment" listesi tutmak ve bunlara özel test/yedek düzenlemeleri yapmak zorundadır. Bilge pompası, acil jeneratör, steering gear pompası tipik kritik ekipmandır.`,
            },
          ],
        },
        {
          subheading: "1.2 İş öncesi izolasyon ve risk değerlendirmesi",
          paragraphs: [
            `Hiçbir bakım, ekipman enerjisi izole edilmeden başlamaz. Elektrik motoru tahrikli pompa/kompresör için breaker "OFF + LOTO (Lock Out Tag Out)" yapılır; basınçlı sistemde suction/discharge valfleri kapatılır ve drenaj ile basınç boşaltılır. Sıcak yağ veya buhar hattı içeren işlerde (kazan, FO purifier ısıtıcısı) sistem soğuyana kadar beklenir.`,
            `İş öncesi Risk Assessment (RA) formu doldurulur; permit to work (PTW) gerektiren işlerde (hot work, enclosed space, elektrik) ilgili izin nöbetçi/baş mühendis onayına sunulur. Permit kapatılmadan iş tamamlanmış sayılmaz.`,
          ],
          table: {
            caption: `Yardımcı makine bakım periyotları (tipik kılavuz değerler)`,
            headers: ["Ekipman", "İş", "Periyot", "Kritik kontrol"],
            rows: [
              ["FO/LO purifier", "Bowl açma-temizleme", "1500–2000 h", "Disc seti, gravity disc, sızdırmazlık"],
              ["Air compressor", "Valve plate / ring", "4000–6000 h", "Discharge sıcaklığı, kaçak"],
              ["SW/FW pompa", "Mech. seal / bearing", "8000 h", "Vibrasyon, sızıntı, akım"],
              ["Aux. boiler", "Burner / nozzle temizliği", "500–1000 h", "Flame görüntüsü, atomizasyon"],
              ["Bilge pompa", "Suction valve overhaul", "Yıllık", "Self-priming, NRV oturması"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Pompa Bakımı (Ballast, Bilge, Transfer, Service)",
      sections: [
        {
          subheading: "2.1 Santrifüj pompa: mekanik salmastra ve yatak",
          paragraphs: [
            `Gemideki SW/FW santrifüj pompalarında en sık arızalanan eleman mekanik salmastradır (mechanical seal). Salmastra sızıntısı, kuru çalışma (dry running), kavitasyon veya aşırı eksenel kuvvetten kaynaklanır. Bakımda seal yüzeyleri çizik/aşınma açısından incelenir, O-ring'ler değiştirilir, shaft sleeve ölçülür ve yatak boşluğu (bearing clearance) feeler/dial gauge ile kontrol edilir.`,
            `Pompa motoru ile pompa arasındaki coupling alignment, dial gauge veya laser ile kontrol edilir; misalignment yatak ve seal ömrünü ciddi düşürür. Ölçüm soğuk ve sıcak (operating) durum farkı dikkate alınarak yorumlanır.`,
          ],
          bullets: [
            `Suction strainer/filter ΔP kontrolü ve temizliği`,
            `Mekanik salmastra flush hattı açıklığı`,
            `Yatak greslemesi/yağ seviyesi ve sıcaklığı`,
            `Coupling alignment ve rubber element durumu`,
            `Motor akımı (amperaj) ve titreşim ölçümü`,
          ],
        },
        {
          subheading: "2.2 Bilge ve self-priming pompalar",
          paragraphs: [
            `Bilge sistemi, gemi su altı bütünlüğünün son savunma hattıdır; bu yüzden bilge pompası "critical equipment" sayılır. Self-priming özelliği için air-water separator ve non-return valve (NRV) sızdırmazlığı kritiktir; NRV oturmuyorsa pompa priming yapamaz. Bakımda suction valve overhaul, NRV taşlama ve strainer temizliği yapılır.`,
            `Bilge well high-level alarm switch'leri (float/capacitive) test edilir. MARPOL Annex I gereği bilge suyunun denize verilmesi yalnızca OWS (Oily Water Separator) üzerinden 15 ppm sınırının altında ve OCM (Oil Content Meter) onayıyla yapılır; bilge pompası doğrudan overboard'a basacak şekilde bypass edilemez.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Magic pipe yasağı",
              text: `Bilge/sludge'ı OWS ve OCM'i bypass eden gizli hat ("magic pipe") ile denize basmak MARPOL Annex I'in en ağır ihlalidir. ABD'de ECA kapsamında yüz binlerce/milyonlarca USD ceza ve mühendislere hapis cezası verilmiştir. Üçüncü/Dördüncü Mühendis, böyle bir talimata uymaz ve raporlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Hava Kompresörleri (Starting & Service Air)",
      sections: [
        {
          subheading: "3.1 Valve plate, ring ve kademe basınçları",
          paragraphs: [
            `Ana makine yol verme havası (starting air) tipik olarak 25–30 bar civarındadır ve iki/üç kademeli pistonlu kompresörlerle üretilir. Kompresör verimi, suction/discharge valflerinin (reed/plate valve) sızdırmazlığına bağlıdır. Sızdıran valf, kademe arası basıncı ve discharge sıcaklığını yükseltir; bu da karbon birikimi ve patlama (crankcase/air pipe explosion) riski yaratır.`,
            `Bakımda valf plakaları, yaylar ve segmanlar (piston rings) aşınma açısından incelenir, intercooler/aftercooler temizlenir ve emniyet valfi (relief valve) ayarı doğrulanır. Bullet (air receiver) içi periyodik açılır, drenaj yapılır ve iç korozyon kontrol edilir; air bottle survey klas gereğidir.`,
          ],
          table: {
            caption: `İki kademeli starting air kompresörü tipik değerleri`,
            headers: ["Parametre", "Normal aralık", "Alarm/aksiyon"],
            rows: [
              ["1. kademe discharge sıc.", "120–150 °C", ">170 °C → valf/ring kontrol"],
              ["2. kademe discharge sıc.", "130–160 °C", ">180 °C → cooler/valf"],
              ["Final basınç", "25–30 bar", "Düşükse valf kaçağı"],
              ["LO basıncı", "1.5–3.0 bar", "Düşükse trip"],
              ["Cooling water out", "<45 °C", "Yüksekse cooler tıkalı"],
            ],
          },
        },
        {
          subheading: "3.2 Otomatik drenaj, kurutma ve emniyet",
          paragraphs: [
            `Service air (kontrol/iş havası) genelde 7–8 bar'a düşürülür ve kontrol havası için air dryer'dan geçirilir; nemli hava kontrol valflerini ve pnömatik ekipmanı bozar. Otomatik drenaj valfleri (auto-drain) düzenli test edilir; tıkalı drenaj receiver içinde su biriktirir ve korozyon yaratır.`,
            `Her starting air receiver üzerinde fusible plug ve relief valve bulunur; bunlar overpressure ve aşırı sıcaklığa karşı son emniyettir ve survey kapsamındadır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Crankcase oil mist",
              text: `Kompresör karteri yağında metalik parıltı veya su (emülsiyon) görülürse yatak aşınması veya cooler iç kaçağı şüphesi vardır. Yağ numunesi ve sight glass kontrolü, büyük arızayı erkenden yakalar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Separatör / Purifier Bakımı (FO, LO, Sludge)",
      sections: [
        {
          subheading: "4.1 Bowl açma, disc seti ve gravity disc",
          paragraphs: [
            `Yakıt (FO) ve yağlama yağı (LO) purifierleri, yüksek devirli santrifüj separatörlerdir (örn. Alfa Laval, Westfalia/GEA) ve sudan/çamurdan arındırma için çalışır. Periyodik bakımda bowl sökülür, disc seti (disc stack) çamurdan temizlenir, ana sızdırmazlık (main seal ring) ve operating water valfleri kontrol edilir. Gravity disc seçimi yakıt yoğunluğuna göre yapılır; yanlış gravity disc su kesme hattını (water seal) bozar ve breaking water purifier'ı su basar.`,
            `Bowl montajında işaret hizalaması (matchmark) ve sıkma torku üreticinin değerlerine birebir uyularak yapılır. Hatalı montaj, dengesizlik (vibrasyon), su kaçağı veya patlama riski yaratır. Yüksek devirli bu makinelerde dengesizlik son derece tehlikelidir.`,
          ],
          bullets: [
            `Disc set yıkama ve "drop test" ile sızdırmazlık`,
            `O-ring/main seal ring set değişimi`,
            `Gravity disc tablosundan doğru çap seçimi`,
            `Operating/sealing water solenoid valf temizliği`,
            `Sludge boşaltma (de-sludge) zamanlama ayarı`,
          ],
        },
        {
          subheading: "4.2 Heater, viskozite ve emniyet zinciri",
          paragraphs: [
            `Ağır yakıt (HFO) purifier öncesi buhar/elektrik ısıtıcı ile ~98 °C'ye kadar ısıtılır; doğru ayrışma sıcaklığı viskozite ve yoğunluğa bağlıdır. Heater high temperature alarm ve trip devresi düzenli test edilir; aşırı ısınma yakıtın bozulmasına ve emniyet riskine yol açar.`,
            `Sludge tank seviyesi ve sludge pompası, sludge'ın incinerator veya shore reception'a aktarımı için takip edilir. Oil Record Book (ORB) Part I'de tüm sludge transferleri kayıt altına alınır; bu kayıt MARPOL denetiminin merkezindedir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex I — ORB Part I",
              text: `Separatör çamuru (sludge), bilge/sludge transferleri, incinerator yakımları ve shore'a teslimler Oil Record Book Part I'e zamanında ve doğru kaydedilmek zorundadır. Eksik/sahte ORB, PSC tarafından geminin tutulmasına (detention) yol açar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Yardımcı Kazan (Auxiliary Boiler) Bakımı",
      sections: [
        {
          subheading: "5.1 Burner, nozzle ve yakma kontrolü",
          paragraphs: [
            `Yardımcı kazan, limanda ve düşük yük seyrinde buhar (yakıt ısıtma, ısıtma, servisler) sağlar. En sık bakım burner ünitesindedir: atomizasyon kalitesini belirleyen nozzle/tip temizlenir, elektrotlar ayarlanır, fotoselin (flame eye) camı temizlenir ve hava-yakıt oranı (combustion) flue gas analiziyle kontrol edilir. Kötü atomizasyon kurum (soot) birikimi, baca yangını ve verim düşüşü yaratır.`,
            `Su tarafında ise gauge glass, scum/blowdown valfleri ve su seviye alarmları (low/low-low water level) test edilir. Düşük su seviyesinde brülörün otomatik kesilmesi (flame failure + low water cut-off) hayati emniyet fonksiyonudur.`,
          ],
        },
        {
          subheading: "5.2 Su şartlandırma ve emniyet valfleri",
          paragraphs: [
            `Kazan suyu kimyasal olarak şartlandırılır; klorür, fosfat, alkalinite (pH) ve kondansat hardness testleri düzenli yapılır. Yanlış su kimyası, kazan içi korozyona, scale (kireçlenme) ve carry-over'a yol açar. Test sonuçları water treatment log'una işlenir.`,
            `Emniyet valfleri (safety valve), kazanın aşırı basınca karşı son korumasıdır; ayar basıncı ve kaldırma (lift/easing gear) testi survey kapsamında doğrulanır. Bu valflere yetkisiz müdahale kesinlikle yasaktır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kazan patlaması riski",
              text: `Düşük su seviyesinde brülör çalışmaya devam ederse kazan sacı aşırı ısınır; ani su beslemesi buhar patlamasına yol açabilir. Low water cut-off devre dışı bırakılmaz; gauge glass her vardiya "blow through" ile test edilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Valve Overhaul ve Gasket / Sızdırmazlık İşleri",
      sections: [
        {
          subheading: "6.1 Globe, gate ve non-return valf bakımı",
          paragraphs: [
            `Yardımcı sistem hatlarındaki valfler (globe, gate, butterfly, NRV), sızdırmazlık ve fonksiyon için periyodik overhaul edilir. Globe valfte seat/disc taşlama (lapping/grinding) pastası ile yapılır; gland packing yenilenir, spindle düzgünlüğü kontrol edilir. NRV'lerin doğru yönde monte edildiği ve serbest hareket ettiği test edilir; ters monte NRV felaket sonuç doğurur.`,
            `Sea valve / overboard valve gibi su altı valfleri "critical" sayılır; bunların açma-kapama testi ve sızdırmazlığı dik kunt kayıtlanır. İş, gemi su hattı altında ise dalış veya kuru havuz koşulu gerektirebilir.`,
          ],
        },
        {
          subheading: "6.2 Gasket seçimi ve flanş montajı",
          paragraphs: [
            `Gasket malzemesi akışkan, sıcaklık ve basınca göre seçilir: su/yağ için CNAF (fiber), buhar/yüksek sıcaklık için spiral-wound veya grafit, yakıt için yağa dayanıklı tip. Yanlış gasket malzemesi kaçak, yangın (yakıt/yağ) veya buhar yanığı riski yaratır.`,
            `Flanş montajında cıvatalar çapraz (star pattern) ve kademeli torkla sıkılır; sıcak çalışan hatlarda servis sonrası re-torque yapılır. Asbestli gasket kullanımı yasaktır (MLC/IMO sağlık kuralları); asbest içeren eski conta çıkarılırken solunum koruması ve özel bertaraf uygulanır.`,
          ],
          table: {
            caption: `Akışkana göre gasket seçimi (kılavuz)`,
            headers: ["Akışkan / hat", "Tipik gasket", "Maks. sıcaklık"],
            rows: [
              ["SW / FW", "CNAF fiber", "~150 °C"],
              ["LO / FO", "Yağa dayanıklı NBR/fiber", "~120 °C"],
              ["Buhar / kazan", "Spiral-wound / grafit", ">300 °C"],
              ["Egzoz / yüksek ısı", "Grafit / metal jacketed", ">450 °C"],
            ],
          },
        },
      ],
    },
    {
      heading: "7. Yatak (Bearing) Kontrolü ve Filtre Bakımı",
      sections: [
        {
          subheading: "7.1 Yatak boşluğu, sıcaklık ve titreşim",
          paragraphs: [
            `Yatak arızası, yardımcı makinelerde en sık plansız duruş sebebidir. Rulmanlı yataklarda gürültü/titreşim, kayar yataklarda clearance ve sıcaklık izlenir. Aşınmış yatak boşluğu feeler gauge veya lead wire ("bridge gauge") ile ölçülür; üretici toleransının dışında ise yatak değiştirilir.`,
            `Titreşim ölçümü ve yatak sıcaklığı trend takibi (condition based maintenance), arızayı plansız duruştan önce yakalar. Anormal değer, alignment, dengesizlik veya yağlama yetersizliğine işaret eder.`,
          ],
        },
        {
          subheading: "7.2 Filtre temizliği ve ΔP yönetimi",
          paragraphs: [
            `LO/FO/SW devrelerindeki dubleks (duplex) filtreler ΔP (basınç düşümü) göstergesine göre temizlenir. ΔP yükseldiğinde temiz tarafa geçilir (changeover) ve kirli eleman sökülerek temizlenir; auto-backflush filtrelerde solenoid ve diferansiyel switch kontrol edilir.`,
            `Filtre üzerindeki metalik partiküller (özellikle LO filtresinde) bir yatak/yüzey aşınmasının erken işareti olabilir; bulgu yağ analizi ile birlikte değerlendirilip baş mühendise raporlanır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: FO filtresi ve scavenge yangını",
              text: `Tıkalı bir FO ince filtresi, bypass'a alındığında kirli yakıtın injectorlara ulaşmasına ve kötü yanma + scavenge boşluğunda birikime yol açtı. ΔP alarmının ihmali, makineyi durma noktasına getirdi. Ders: filtre changeover ihmal edilmez, ΔP trendine güvenilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Basit Elektrik / Mekanik Bakım ve Emniyet",
      sections: [
        {
          subheading: "8.1 Motor, megger ve aydınlatma bakımı",
          paragraphs: [
            `Üçüncü/Dördüncü Mühendis, basit elektrik bakımında elektrik mühendisi/ETO ile birlikte çalışır: motor terminal kutusu sıkılığı, megger (insulation resistance) ölçümü, motor yatak greslemesi, kontaktör/aşırı akım rölesi kontrolü ve makine dairesi aydınlatması (özellikle escape route ve acil aydınlatma). Bütün elektrik işi izolasyon ve LOTO ile yapılır.`,
            `Acil jeneratör ve acil yangın pompası gibi kritik elektrikli ekipmanların haftalık testleri kayıtlanır; bunlar PSC ve klas denetiminin ilk baktığı kalemlerdendir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "LOTO ve elektrik emniyeti",
              text: `Tüm enerjili ekipman, üzerinde çalışmadan önce breaker OFF + kilit + etiket (Lock Out Tag Out) ile izole edilir. Çok kişinin çalıştığı işte multi-lock hasp kullanılır. Yalnızca kilidi takan kişi kilidini açar.`,
            },
          ],
        },
        {
          subheading: "8.2 Sıkma torku, hizalama ve iş sonrası teyit",
          paragraphs: [
            `Mekanik montajda üretici tork değerleri, doğru anahtar ve tork wrench ile uygulanır; gözle/hisle sıkma kritik bağlantılarda kabul edilmez. İş tamamlandığında sistem yeniden enerjilendirilir, kaçak testi yapılır ve ilk çalıştırmada parametreler (basınç, sıcaklık, akım, titreşim) izlenir.`,
            `İş sonrası alan temizlenir, sökülen contalar/atık yağ doğru atık akışına ayrılır (MARPOL/garbage management), kullanılan yedek parça PMS'te düşülür ve job kapatılır.`,
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Yardımcı makine bakımı günlük kontrol listesi",
          bullets: [
            `PMS iş emri açık mı, yedek parça ROB teyit edildi mi?`,
            `Ekipman izole edildi mi (LOTO + valf + drenaj + basınç boşaltma)?`,
            `Risk Assessment / Permit to Work tamamlandı mı?`,
            `Purifier bowl matchmark + doğru gravity disc montajlandı mı?`,
            `Kompresör valf/cooler kontrol, receiver drenajı yapıldı mı?`,
            `Kazan low-water cut-off ve emniyet valfi test edildi mi?`,
            `Doğru gasket malzemesi + çapraz tork uygulandı mı?`,
            `Filtre ΔP, yatak clearance ve titreşim trendi kayıtlandı mı?`,
            `İş sonrası kaçak testi + ilk çalıştırma parametreleri izlendi mi?`,
            `Sludge/atık yağ ORB ve garbage record'a işlendi mi?`,
          ],
          paragraphs: [
            `Üçüncü/Dördüncü Mühendis için yardımcı makine bakımının başarısı, ekipmanı "söküp takabilmekten" değil; planlı (PMS), izole (LOTO), ölçülen (clearance/ΔP/titreşim) ve kaydedilen (ORB/PMS) bir disiplinden gelir. Erken yakalanan bir yatak sesi veya bir filtre ΔP'si, denizin ortasında plansız bir blackout veya kirlilik olayını önler.`,
          ],
        },
      ],
    },
  ],
};

export default content;
