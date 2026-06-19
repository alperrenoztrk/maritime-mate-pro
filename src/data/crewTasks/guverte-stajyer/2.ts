import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Güverte operasyonlarına katılım",
  roleSlug: "guverte-stajyer",
  taskIndex: 2,
  estimatedPages: 26,
  intro: `Güverte Stajyeri (Deck Cadet); bağlama, demir, yük operasyonları ve günlük güverte bakım işlerine gözlem ve destek düzeyinde katılarak pratik gemicilik (seamanship) becerilerini kazanır. Bu görev, halat ve tel kullanımı, vinç/ırgat operasyonu, güverte ekipmanlarının işleyişi ve yüksek riskli işlerin emniyetli yürütülmesi gibi temel yetkinlikleri kapsar. Stajyer bu işlere asla bağımsız sorumlu olarak değil, bir güverte zabiti veya deneyimli tayfanın doğrudan gözetiminde katılır. Bölüm; STCW Tablo A-II/1 operasyonel seviye gemicilik yetkinliklerini, snap-back zone ve enclosed space gibi kritik can güvenliği konularını ve TRB'ye işlenecek pratik kanıtları ayrıntılandırır.`,
  sources: [
    "STCW Convention & Code — Table A-II/1 (Operational level — cargo handling, seamanship)",
    "SOLAS Chapter VI — Carriage of Cargoes and Oil Fuels",
    "Code of Safe Working Practices for Merchant Seafarers (COSWP)",
    "OCIMF — Mooring Equipment Guidelines (MEG4)",
    "IMO Resolution A.1050(27) — Revised recommendations for entering enclosed spaces",
    "ISM Code — Safety Management System & risk assessment",
    "ILO/MLC 2006 — Health and safety protection and accident prevention",
    "Nicholls's Seamanship and Nautical Knowledge",
  ],
  chapters: [
    {
      heading: "1. Güverte Operasyonlarında Stajyerin Rolü ve Emniyet Çerçevesi",
      lead: `Güverte, geminin en çok kaza yaşanan çalışma alanlarından biridir; stajyer buraya öğrenmek için çıkar, ama her adımda gözetim ve risk farkındalığı şarttır.`,
      sections: [
        {
          subheading: "1.1 Gözlem ve destek düzeyinde katılım",
          paragraphs: [
            `Stajyer, güverte operasyonlarına bağımsız bir görevli olarak değil, gözetim altında destek ve eğitim amacıyla katılır. Her işe başlamadan önce sorumlu zabit veya bosun (lostromo) tarafından görev brifingi (toolbox talk) verilir; stajyer bu brifingde rolünü, durma noktalarını ve acil durum çıkışını öğrenir. Anlamadığı hiçbir komutu uygulamaz; tereddüt halinde soru sorar.`,
            `Stajyer, kişisel koruyucu donanımı (PPE) eksiksiz kullanır: emniyet baretleri, çelik burunlu bot, eldiven, koruyucu gözlük ve gerektiğinde can yeleği/emniyet kemeri. Borda dışı ve yüksekte çalışmalarda emniyet kemeri ve cankurtaran halatı (lifeline) zorunludur. Görev sırasında dikkat dağıtacak davranışlardan kaçınılır; güverte operasyonunda bir anlık dalgınlık ciddi yaralanmaya yol açabilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yüksek riskli iş = mutlaka gözetim",
              text: `Halat altında çalışma (snap-back zone), kapalı mahal girişi, yüksekte ve borda dışı çalışma, ağır kaldırma operasyonları stajyer tarafından asla tek başına yapılmaz. Bu işler iş izni (PTW) ve risk değerlendirmesi olmadan başlatılmaz.`,
            },
          ],
        },
        {
          subheading: "1.2 Risk değerlendirmesi ve iş izni (PTW) ile bağ",
          paragraphs: [
            `Her güverte operasyonu öncesinde, ISM/SMS gereği bir risk değerlendirmesi yapılır; stajyer bu sürece katılarak tehlikeleri (hazard) ve alınan önlemleri tanımayı öğrenir. Sıcak iş (hot work), kapalı mahal, yüksekte çalışma ve borda dışı çalışma gibi işler için ayrıca Permit to Work (PTW) düzenlenir. Stajyer, PTW'nin neden gerekli olduğunu, hangi imzaların alındığını ve izin süresinin neden sınırlı olduğunu gözlemler.`,
            `Stajyer, "stop work authority" (işi durdurma yetkisi) kavramını öğrenir: gemideki her çalışan, emniyetsiz gördüğü bir işi durdurabilir ve bunu yaptığı için cezalandırılamaz. Stajyer de bir tehlike fark ettiğinde sesini yükseltmekten çekinmemelidir; bu, zayıflık değil profesyonelliktir.`,
          ],
          table: {
            caption: `Güverte Operasyonları Risk Matrisi (Eğitim Özeti)`,
            headers: ["Operasyon", "Başlıca Tehlike", "Temel Önlem"],
            rows: [
              ["Bağlama/çözme", "Snap-back, ezilme", "Snap-back zone'dan uzak durma"],
              ["Demir operasyonu", "Zincir/ırgat kapma", "Eli/ayağı zincirden uzak tutma"],
              ["Yük operasyonu", "Düşen yük, kapma", "Yük altında durmama"],
              ["Yüksekte çalışma", "Düşme", "Emniyet kemeri + lifeline"],
              ["Kapalı mahal", "Oksijen eksikliği/gaz", "Gaz ölçümü + PTW + gözcü"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Halat ve Tel Kullanımı (Seamanship Temelleri)",
      sections: [
        {
          subheading: "2.1 Halat tipleri, bakımı ve emniyetli kullanımı",
          paragraphs: [
            `Stajyer; doğal lif halatlar, sentetik halatlar (polipropilen, polyester, naylon, HMPE) ve çelik tel halatların (wire rope) özelliklerini öğrenir. Her malzemenin farklı uzama, yüzme ve kopma davranışı vardır; örneğin naylon yüksek uzama nedeniyle koptuğunda tehlikeli geri tepme (snap-back) yapar, HMPE ise düşük uzamalı ve yüksek mukavemetlidir. Stajyer, halatların güneş, aşınma, kimyasal ve ezilmeden nasıl korunduğunu ve düzenli muayene gereğini kavrar.`,
            `Stajyer, temel denizci bağlarını (bowline/izbarço, clove hitch/kazık bağı, reef knot/camadan bağı, figure-of-eight) ve eklerini (splice) uygulamayı öğrenir. Halatların bita, koç boynuzu ve fairlead üzerinde nasıl volta edildiğini, ırgat/vinç başında nasıl kontrollü salındığını (slack/heave) pratik eder. Hasarlı bir halatın (kesik, ezik, içten çürük) servisten alınması gerektiğini öğrenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Snap-back zone — ölümcül bölge",
              text: `Gergin bir halatın kopması veya birden boşalması durumunda, halat kamçı gibi geri savrularak insanı öldürebilir. Stajyer, bita ve fairlead etrafındaki snap-back zone'larını tanır ve bu bölgelerde asla durmaz. MEG4, tek bir "güvenli bölge" yerine dinamik risk farkındalığını vurgular.`,
            },
          ],
        },
        {
          subheading: "2.2 Bağlama ekipmanı: vinç, ırgat ve aksesuarlar",
          paragraphs: [
            `Stajyer; mooring winch (bağlama vinci), windlass (demir ırgatı), capstan, warping drum, stopper (tonoz/zincir stoper) ve roller fairlead gibi ekipmanların işlevini öğrenir. Halatın drum üzerine kaç sarımla alınacağı, render etme (kontrollü kaçırma) ve brake (fren) kullanımı kritik becerilerdir. Stajyer, ekipmanın yağlama, fren testi ve render edilmiş fren kapasitesi (rendered brake capacity) kavramlarını gözlemler.`,
            `Stajyer, bağlama düzeninin (mooring pattern) nasıl planlandığını öğrenir: baş ve kıç halatlar (head/stern lines), açmazlar (springs) ve breast line'ların işlevleri farklıdır. İyi dengelenmiş bir bağlama, geminin rıhtım boyunca kaymasını ve dalga/akıntı/rüzgâr etkisiyle hareketini önler. Tüm bağlama hatlarının eşit gerginlikte olması (load sharing) yük dağılımı için önemlidir.`,
          ],
          table: {
            caption: `Bağlama Halatlarının İşlevleri`,
            headers: ["Hat", "Konumu", "Önlediği Hareket"],
            rows: [
              ["Head line", "Baştan ileri", "Geriye kayma"],
              ["Stern line", "Kıçtan geri", "İleriye kayma"],
              ["Forward spring", "Baştan geri", "İleriye kayma"],
              ["Aft spring", "Kıçtan ileri", "Geriye kayma"],
              ["Breast line", "Bordadan dik", "Rıhtımdan uzaklaşma"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Bağlama ve Çözme Operasyonları",
      sections: [
        {
          subheading: "3.1 İstasyon hazırlığı ve haberleşme",
          paragraphs: [
            `Bağlama/çözme manevralarında stajyer, baş veya kıç istasyonda sorumlu zabitin (mooring officer) yanında görev alır. Köprüüstü ile istasyon arasındaki telsiz haberleşmesinin (UHF) net ve closed-loop olması esastır: "Heave away on the head line" → tekrar → uygulama. Stajyer, heaving line (savlo), messenger line ve halat verme/alma sırasının nasıl yönetildiğini öğrenir.`,
            `Stajyer, halat verilirken eldeki gerginliği kontrol etmeyi, "make fast" (volta et) ve "let go" (koy ver) komutlarını ayırt etmeyi öğrenir. Operasyon boyunca güvertede kimsenin bita ile fairlead arasında veya halat altında durmadığından emin olunur. Gece operasyonlarında yeterli aydınlatma ve görüş sağlanır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Elleri ve ayakları takip et",
              text: `Bağlama kazalarının çoğu el ve ayak ezilmesidir. Halatın gerileceği yönü düşün, asla bir bita ile gergin halat arasında durma ve halat üzerine basma. "Bir el gemi için, bir el kendin için" prensibini hatırla.`,
            },
          ],
        },
        {
          subheading: "3.2 Çözme (unmooring) ve rıhtımdan ayrılma",
          paragraphs: [
            `Çözme sırasında halatlar köprüüstünün talimatıyla belirli bir sırayla bırakılır; genellikle önce gergin olmayan hatlar, en son "last line" çözülür. Stajyer, rıhtımdaki personel (linesman) ile koordinasyonu, halatın suya/pervaneye kaçmaması için zamanlamayı gözlemler. Single-up (tek hatta inme) ve let-go komutlarının manevra ile senkronizasyonu kritiktir.`,
            `Stajyer, çözme sonrası halatların temiz biçimde toplanması, kurutulması ve uygun şekilde istif edilmesini (coiling/faking) öğrenir. Islak ve kirli halatların çürümesini önlemek için bakım, gemicilik disiplininin parçasıdır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Demir Operasyonları",
      sections: [
        {
          subheading: "4.1 Demir donanımı ve terminoloji",
          paragraphs: [
            `Stajyer; demir (anchor), zincir (chain cable), kilit (shackle), kilit işaretleri (shackle marks), windlass, zincir stoperi (devil's claw/bow stopper), hawse pipe ve chain locker gibi parçaları ve "shackle" (yaklaşık 27.5 m / 15 kulaç) uzunluk birimini öğrenir. Zincir uzunluğu kilit sayısıyla ifade edilir ve renk/tel işaretleriyle takip edilir.`,
            `Stajyer, demirleme için gereken zincir miktarının su derinliği, deniz tabanı türü, rüzgâr ve akıntıya göre belirlendiğini öğrenir; tipik bir başlangıç kuralı su derinliğinin 4-6 katı zincir vermektir, ancak bu koşullara göre değişir. Demir tutuşunun (holding) izlenmesi ve sürüklenme (dragging) tespiti köprüüstü-baş istasyon koordinasyonuyla yapılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Demir ırgatı ölümcül olabilir",
              text: `Çalışan windlass ve hareketli zincir, eli/kolu/ayağı bir anda kapabilir. Stajyer asla zincir, gypsy ve stoper bölgesine elini sokmaz; demir bırakılırken sıçrayan pas ve çamura karşı gözlük takar ve güvenli mesafede durur.`,
            },
          ],
        },
        {
          subheading: "4.2 Demir atma, vira etme ve demir nöbeti",
          paragraphs: [
            `Demir atma (let go) ve toplama (heave up / weigh anchor) operasyonlarında stajyer, baş istasyonda zincir yönünü (which way is the cable leading), gerginliğini (up and down, brought up) ve kilit sayısını köprüüstüne raporlamayı öğrenir. "Anchor aweigh" (demir tabandan ayrıldı) ve "anchor home/clear" gibi terimlerin manevra açısından önemini kavrar.`,
            `Demirde yatarken stajyer, anchor watch (demir nöbeti) sırasında sürüklenmenin nasıl izlendiğini öğrenir: GPS anchor alarm, ECDIS anchor watch, görsel transit kerterizleri ve zincir gerginliği gözlemi. Hava bozduğunda makine standby'a alınır ve gerekirse ikinci demir veya zincir ilave edilir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Yük Operasyonlarına Katılım",
      sections: [
        {
          subheading: "5.1 Yük operasyonunun gözlemi ve güverte rolü",
          paragraphs: [
            `Stajyer, gemi tipine göre yük operasyonlarını gözlemler: kuru yük/dökme yükte ambar kapakları (hatch covers), vinç/grab kullanımı; konteyner gemisinde lashing/twistlock; tankerde manifold, kargo hortumu/kol ve ISGOTT prosedürleri. Her yük tipinin kendine özgü riskleri ve emniyet kuralları vardır; stajyer önce gözlemleyerek operasyonun mantığını kavrar.`,
            `Stajyer, yük planının (cargo/stowage plan) nasıl uygulandığını, yük sırasının (loading sequence) stabilite ve mukavemetle ilişkisini ve güverte ekibinin köprüüstü/yük kontrol odasıyla nasıl haberleştiğini gözlemler. Yükleme/boşaltma sırasında draft, list ve trim değişimlerinin sürekli izlendiğini öğrenir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS VI ve emniyetli yük elleçleme",
              text: `SOLAS Bölüm VI, yükün emniyetli istif, bağlama (securing) ve taşınmasını zorunlu kılar. Dökme yüklerde IMSBC Code, tehlikeli yüklerde IMDG Code geçerlidir. Stajyer, yanlış istiflenen veya bağlanan yükün geminin stabilitesini ve mürettebatın hayatını tehlikeye attığını öğrenir.`,
            },
          ],
        },
        {
          subheading: "5.2 Vinç ve kaldırma ekipmanı operasyonu",
          paragraphs: [
            `Stajyer, gemi vinçlerinin (derrick/crane) SWL (Safe Working Load) sınırlarını, sapanların (sling), kilitlerin ve kaldırma aksesuarlarının periyodik muayene ve sertifikasyonunu öğrenir. Hiçbir kaldırma ekipmanı SWL'nin üzerinde yüklenmez ve hiç kimse asılı yükün altında durmaz. İşaretçi (banksman/signaller) ile vinç operatörü arasındaki el işaretleri ve haberleşme standarttır.`,
            `Stajyer, kaldırma kayıtlarının (Register of Lifting Appliances) ve test sertifikalarının tutulduğunu, ekipmanın renk kodlu muayene işaretleriyle takip edildiğini gözlemler. Hasarlı bir sapan veya kilit derhal servisten alınır ve etiketlenir (tag-out).`,
          ],
        },
      ],
    },
    {
      heading: "6. Güverte Bakım İşleri",
      sections: [
        {
          subheading: "6.1 Pas tutma, boya ve yüzey hazırlığı",
          paragraphs: [
            `Güverte bakımının büyük kısmı korozyonla mücadeledir. Stajyer; pas sökme (chipping/needle gun), yüzey hazırlığı, astar (primer) ve son kat boya uygulamasının sırasını öğrenir. Doğru yüzey hazırlığı yapılmadan atılan boya kısa sürede dökülür; bu yüzden temizlik ve kuruluk önemlidir. Toz, gürültü ve kimyasal maruziyete karşı PPE (toz maskesi, kulaklık, gözlük, eldiven) kullanılır.`,
            `Stajyer, boya ve solventlerin tehlikeli madde olduğunu, MSDS/SDS bilgilerine göre saklandığını ve havalandırma olmadan kapalı alanda kullanılmadığını öğrenir. Kullanılmış boya, solvent ve paçavraların MARPOL Annex V kapsamında özel atık olarak yönetildiğini kavrar.`,
          ],
        },
        {
          subheading: "6.2 Greasing, sıkma ve genel bakım planı (PMS)",
          paragraphs: [
            `Stajyer; güverte ekipmanlarının yağlanması (greasing), cıvata-somun sıkma, conta değişimi ve drenaj/freeing port kontrolü gibi rutin bakımları öğrenir. Bu işler genellikle Planlı Bakım Sistemi (PMS) içinde tanımlıdır; stajyer her bakımın bir nedeni ve periyodu olduğunu kavrar. Ambar kapakları, kapaklar (watertight doors) ve havalandırma menfezlerinin sızdırmazlığı, geminin su geçirmez bütünlüğü için kritiktir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi: İhmal edilen freeing port",
              text: `Tıkalı freeing port (su tahliye lumbarı) ve drenajlar, güverteye binen suyun birikmesine (water on deck) ve serbest yüzey etkisiyle stabilite kaybına yol açabilir. Ders: Rutin görünen bakım, ağır havada geminin emniyetini doğrudan etkiler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Kapalı Mahal (Enclosed Space) ve Yüksek Riskli İşler",
      sections: [
        {
          subheading: "7.1 Kapalı mahal giriş prosedürü",
          paragraphs: [
            `Kapalı/kapalı mahaller (ambarlar, balast tankları, kofferdamlar, zincirlik, boş tanklar) denizcilikteki en ölümcül kaza nedenlerinden biridir; oksijen eksikliği, zehirli veya parlayıcı gaz ölümle sonuçlanabilir. Stajyer, kapalı mahalle ASLA izinsiz, gaz ölçümü yapılmadan ve gözcü olmadan girilmediğini öğrenir. Giriş öncesi havalandırma, gaz ölçümü (oksijen %20.9, toksik ve patlayıcı gaz sınırları) ve PTW zorunludur.`,
            `Stajyer, IMO Resolution A.1050(27) çerçevesinde giriş izni, sürekli haberleşme, kurtarma teçhizatı (resüsitatör, EEBD, vinç/üçayak) ve gözcünün rolünü öğrenir. En tehlikeli senaryolardan biri, içeri düşen arkadaşını kurtarmaya tedbirsizce giren ikinci kişinin de ölmesidir; bu yüzden kurtarma planı önceden hazırdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kapalı mahal: önce dur, ölç, izin al",
              text: `Görünüşte tehlikesiz bir tankın atmosferi öldürücü olabilir. Gaz ölçümü olmadan, gözcü ve kurtarma planı olmadan, geçerli iş izni olmadan hiçbir kapalı mahalle girilmez. Stajyer bu kurala istisnasız uyar; bir baş eğip bakmak bile ölümcül olabilir.`,
            },
          ],
        },
        {
          subheading: "7.2 Sıcak iş, yüksekte ve borda dışı çalışma",
          paragraphs: [
            `Sıcak iş (kaynak, taşlama, kesme) yangın ve patlama riski taşır; gaz-free sertifikası, yangın gözcüsü ve PTW gerektirir. Yüksekte ve borda dışı çalışmada emniyet kemeri, lifeline, iskele/sepet güvenliği ve düşen alet riski yönetilir. Stajyer bu işlere ancak gözetim altında ve uygun teçhizatla katılır; deniz halinde borda dışı çalışma yapılmaz.`,
          ],
        },
      ],
    },
    {
      heading: "8. Güverte Ekipmanlarının İşleyişinin Öğrenilmesi",
      sections: [
        {
          subheading: "8.1 Sistematik ekipman tanıma",
          paragraphs: [
            `Stajyer, güverte ekipmanlarını sistematik olarak öğrenir: bağlama/demir ırgatları, vinçler, ambar kapağı hidroliği, dümen donanımının güverte bağlantıları, su geçirmez kapılar, freeing port'lar ve güverte drenaj sistemi. Her ekipmanın çalışma prensibini, kontrol noktalarını ve arıza belirtilerini öğrenmek, ileride zabit olarak sorun teşhisinin temelidir.`,
            `Stajyer, ekipmanların hidrolik/elektrik/pnömatik güç kaynaklarını ve acil durdurma (emergency stop) noktalarını öğrenir. Bir ekipmanın olağandışı ses, sızıntı veya ısınma gibi belirtilerini fark edip rapor etmeyi alışkanlık haline getirir.`,
          ],
          table: {
            caption: `Temel Güverte Ekipmanları ve İşlevleri`,
            headers: ["Ekipman", "İşlev", "Kritik Kontrol"],
            rows: [
              ["Mooring winch", "Halat alma/render", "Fren kapasitesi, yağlama"],
              ["Windlass", "Demir vira/fundo", "Stoper, fren, gypsy"],
              ["Deck crane", "Yük kaldırma", "SWL, sapan muayenesi"],
              ["Hatch cover", "Ambar sızdırmazlığı", "Conta, kilit, drenaj"],
              ["Watertight door", "Su geçirmezlik", "Conta, kapanma testi"],
            ],
          },
        },
        {
          subheading: "8.2 Hava durumu ve deniz halinin güverte işlerine etkisi",
          paragraphs: [
            `Stajyer, güverte işlerinin hava ve deniz haline bağlı olduğunu öğrenir: ağır havada borda dışı ve yüksekte çalışma durdurulur, güverteye su binme riski olduğunda personel açık güverteye çıkmaz. Ambar kapaklarının ve havalandırmaların ağır hava öncesi kapatılması (battening down) geminin su geçirmezliği için kritiktir. Stajyer, hava raporu ve kaptanın talimatı doğrultusunda iş planının nasıl değiştiğini gözlemler.`,
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Güverte operasyonları stajyer kontrol listesi",
          bullets: [
            `Görev öncesi toolbox talk ve risk değerlendirmesine katıldım mı?`,
            `PPE eksiksiz ve doğru kullanıldı mı?`,
            `Snap-back zone ve halat altı bölgelerinden uzak duruldu mu?`,
            `Bağlama/çözme komutları closed-loop olarak takip edildi mi?`,
            `Demir operasyonunda ırgat/zincir bölgesinden uzak durdum mu?`,
            `Yük operasyonunda asılı yük altında durulmadı mı?`,
            `Kapalı mahal kuralları (gaz ölçümü/PTW/gözcü) içselleştirildi mi?`,
            `Vinç SWL ve sapan muayenesi gözlemlendi mi?`,
            `Bir tehlike görüldüğünde "stop work" refleksi gösterildi mi?`,
            `Yapılan pratikler eğitmen imzasıyla TRB'ye işlendi mi?`,
          ],
          paragraphs: [
            `Güverte operasyonlarına katılım, stajyerin teorik bilgisini gerçek gemiciliğe dönüştürdüğü en somut alandır. Halat ucu, demir zinciri ve vinç başındaki her dakika, hem beceri hem de hayati emniyet refleksleri kazandırır. Stajyerin görevi; gözetimi asla terk etmemek, riski sürekli okumak ve öğrendiğini titizlikle TRB'ye kaydetmektir. Güvertede edinilen disiplin, geleceğin güverte zabitinin emniyet kültürünün temelini oluşturur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
