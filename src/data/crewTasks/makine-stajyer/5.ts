import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Teknik çizim ve PMS öğrenimi",
  roleSlug: "makine-stajyer",
  taskIndex: 5,
  estimatedPages: 24,
  intro: `Makine stajyeri, gemideki sistemleri anlamak ve bakımı yönetmek için iki temel beceri kazanmalıdır: teknik çizimleri okumak ve Planlı Bakım Sistemi (PMS — Planned Maintenance System) yazılımını kullanmak. Teknik çizimler; piping diagram (boru devre şeması), electrical diagram (elektrik şeması) ve general arrangement (genel yerleşim planı) gibi belgelerle sistemin "haritasını" verir. PMS ise bakım işlerinin planlanması, iş emri (work order) açma/kapatma, yedek parça (spare parts) kodlama ve stok kontrolünün dijital çekirdeğidir. Bu bölüm, çizim okuma metodolojisini, sembolleri ve PMS iş akışını adım adım açıklar.`,
  sources: [
    "ISM Code — Element 10 (Maintenance of the Ship and Equipment)",
    "SOLAS Chapter II-1 — Machinery and electrical installations",
    "Sınıf kuruluşu (Class) kuralları — PMS / Planned Maintenance Scheme onayı",
    "ISO 1219 — Fluid power systems and components, graphic symbols",
    "IEC 60617 — Graphical symbols for diagrams (elektrik sembolleri)",
    "IMO Model Course 7.04 — Officer in charge of an engineering watch",
    "Gemi makine üreticisi (OEM) bakım el kitapları ve teknik çizimleri",
    "Reeds Marine Engineering and Technology serisi",
  ],
  chapters: [
    {
      heading: "1. Teknik Çizimin Önemi ve Türleri",
      lead: `Bir sistemi gerçekten anlamak, onun çizimini okuyabilmekle başlar. Çizim, ekipmanın değil sistemin mantığını gösterir.`,
      sections: [
        {
          subheading: "1.1 Neden teknik çizim okumak gerekir",
          paragraphs: [
            `Bir mühendis, bir sistemi sadece fiziksel olarak görerek tam anlayamaz; boruların nereye gittiğini, hangi valfin neyi izole ettiğini ve sistemin tasarım mantığını ancak çizimden öğrenir. Bir arıza arandığında, bir izolasyon planlandığında veya bir transfer hattı kurulduğunda, çizim mühendisin yol haritasıdır.`,
            `Stajyer, çizim okumayı sistem tanıma ile paralel öğrenir: çizimde gördüğü hattı sahada izler, sahada gördüğü valfi çizimde bulur. Bu "çizim-saha" eşleştirmesi (drawing-to-deck verification), gerçek mühendislik anlayışının temelidir. Ezbere ekipman bilgisi, çizim okuma becerisiyle birleşince sistem hakimiyetine dönüşür.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "İlgili görev: Sistem tanıma",
              text: `Çizim okuma, "Makine sistemlerini tanıma ve öğrenme" bölümüyle birlikte ilerletilmelidir. Çizimde görüleni sahada bulmak, sahada görüleni çizimde bulmak öğrenmeyi pekiştirir.`,
            },
          ],
        },
        {
          subheading: "1.2 Başlıca çizim türleri",
          paragraphs: [
            `Piping diagram (P&ID benzeri boru devre şeması), bir akışkan sisteminin (yakıt, yağ, soğutma suyu, balast, sintine) borularını, valflerini, pompalarını ve enstrümanlarını gösterir. Electrical diagram (tek hat şeması / wiring diagram), güç dağıtımını, switchboard'u, breaker'ları ve motor besleme hatlarını gösterir. General arrangement (GA) ise geminin/makine dairesinin genel yerleşimini verir.`,
            `Bunların yanında capacity plan (tank yerleşimi), fire control plan (yangın planı), ve OEM ekipman çizimleri (kesit görünüşler, montaj çizimleri) bulunur. Stajyer her çizimin hangi soruyu yanıtladığını öğrenir: "akışkan nereye gidiyor?" piping'te, "güç nereden geliyor?" electrical'de, "ekipman nerede?" GA'da yanıtlanır.`,
          ],
          table: {
            caption: `Çizim Türleri ve Kullanım Amaçları`,
            headers: ["Çizim", "Ne gösterir", "Tipik kullanım"],
            rows: [
              ["Piping diagram", "Boru/valf/pompa devresi", "İzolasyon, transfer hattı"],
              ["Electrical diagram", "Güç dağıtımı, devreler", "Arıza arama, izolasyon"],
              ["General arrangement", "Genel yerleşim", "Ekipman/alan lokasyonu"],
              ["Capacity plan", "Tank yerleşim/hacim", "Sounding, stabilite"],
              ["Fire control plan", "Yangın ekipmanı/zon", "Acil durum, denetim"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Piping Diagram (Boru Devre Şeması) Okuma",
      sections: [
        {
          subheading: "2.1 Temel semboller ve okuma yöntemi",
          paragraphs: [
            `Piping diagram standart semboller kullanır: farklı valf türleri (gate, globe, ball, butterfly, non-return/check, relief), pompalar, filtreler, ısı değiştiriciler, tanklar ve enstrümanlar (basınç/sıcaklık göstergeleri). Hatlar genellikle akışkan türüne göre renklendirilir veya etiketlenir (FO, DO, LO, SW, FW, steam, air).`,
            `Çizimi okumak için stajyer "akışı takip etme" yöntemini öğrenir: kaynaktan (tank/pompa) hedefe (ekipman/tank) doğru hattı izler, yol üzerindeki valfleri ve enstrümanları tanımlar. Bir non-return valf akışın tek yönlü olduğunu, bir relief valf aşırı basınç korumasını, bir three-way valf yönlendirmeyi gösterir.`,
          ],
          table: {
            caption: `Yaygın Piping Sembolleri ve İşlevleri`,
            headers: ["Sembol/eleman", "İşlev", "Dikkat"],
            rows: [
              ["Gate valve", "Tam aç/kapa izolasyon", "Kısma için uygun değil"],
              ["Globe valve", "Debi ayarı/kısma", "Yön önemli (akış yönü)"],
              ["Non-return (check)", "Tek yön akış", "Geri akışı engeller"],
              ["Relief valve", "Aşırı basınç koruması", "Ayar basıncı kritik"],
              ["Strainer/filter", "Kirlilik tutma", "Diferansiyel basınç izlenir"],
            ],
          },
        },
        {
          subheading: "2.2 Sistem izolasyonunu çizimden planlama",
          paragraphs: [
            `Bir ekipman üzerinde bakım yapılacaksa, hangi valflerin kapatılacağı çizimden belirlenir. Stajyer, bir pompanın izolasyonu için suction ve discharge valflerini, gerekirse by-pass ve drain'leri çizimde tespit eder. Yanlış valf izolasyonu, izole edildiği sanılan bir hattın hâlâ basınçlı kalmasına ve kazaya yol açabilir.`,
            `Stajyer, çizim üzerinde planladığı izolasyonu sahada doğrular: çizimdeki valf numarası ile saha etiketi eşleşmeli, valf gerçekten kapanmalı ve LOTO uygulanmalıdır. Bu "çizimden plana, plandan sahaya, sahadan doğrulamaya" döngüsü, emniyetli bakımın temelidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlış izolasyon = saklı enerji",
              text: `Çizimden yanlış okunan veya sahada yanlış kapatılan bir valf, izole edildiği sanılan hattı basınçlı/dolu bırakabilir. Bakıma başlamadan önce gerçek izolasyonu (basınç/akış yokluğunu) mutlaka doğrula.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Electrical Diagram (Elektrik Şeması) Okuma",
      sections: [
        {
          subheading: "3.1 Güç dağıtımı ve tek hat şeması",
          paragraphs: [
            `Tek hat şeması (single line diagram), gemi güç sisteminin omurgasını gösterir: jeneratörler, ana switchboard (MSB), bus-tie breaker'lar, transformatörler, emergency switchboard ve dağıtım panoları. Stajyer, gücün jeneratörden başlayıp tüketiciye nasıl ulaştığını ve hangi breaker'ın neyi koruduğunu öğrenir.`,
            `Wiring/motor starter diagram ise bir motorun besleme ve kontrol devresini detaylandırır: kontaktör, overload röle, start/stop butonları, interlock'lar. Stajyer, bir pompanın neden çalışmadığını ararken bu şemayı kullanmayı öğrenir: breaker atmış mı, overload trip etmiş mi, interlock devreyi mi açtı?`,
          ],
          bullets: [
            `Jeneratör ve ana switchboard yapısı`,
            `Bus-tie ve emergency switchboard bağlantısı`,
            `Breaker koruma kademeleri (selectivity)`,
            `Motor starter devresi (kontaktör/overload)`,
            `Interlock ve kontrol mantığı`,
          ],
        },
        {
          subheading: "3.2 Elektrik emniyeti ve izolasyon",
          paragraphs: [
            `Elektrik şeması, izolasyonun nereden yapılacağını gösterir. Bir motora bakım yapılacaksa, ilgili breaker bulunur, açılır, kilitlenir (LOTO) ve voltaj ölçümüyle sıfır enerji doğrulanır. Stajyer, "breaker'ı kapattık" demenin yeterli olmadığını, ölçümle teyidin şart olduğunu öğrenir.`,
            `Stajyer, elektrik işlerinin yetkili elektrik personeli (ETO/Electro-Technical Officer veya yetkili mühendis) gözetiminde yapıldığını ve yüksek gerilim (HV) sistemlerinin özel prosedür gerektirdiğini öğrenir. Stajyer bağımsız elektrik müdahalesi yapmaz.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-1 — Elektrik tesisatı",
              text: `Gemi elektrik sistemleri, güç kaybı durumunda emniyetin korunmasını sağlayacak şekilde tasarlanır (emergency source of power dahil). Stajyer, ana ve acil güç dağıtımının mantığını çizim üzerinden öğrenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. General Arrangement ve Diğer Planlar",
      sections: [
        {
          subheading: "4.1 GA ve makine dairesi yerleşimi",
          paragraphs: [
            `General Arrangement planı, geminin tüm güvertelerinin ve makine dairesinin yerleşimini gösterir. Stajyer, ekipmanların hangi platformda/güvertede olduğunu, kaçış yollarını, kapıları ve geçişleri bu plandan öğrenir. GA, özellikle yeni bir gemiye çıkışta hızlı oryantasyon sağlar.`,
            `Capacity plan ise tankların yerleşimini ve hacimlerini gösterir; sounding ve stabilite hesaplarında kullanılır. Fire control plan, yangın zonlarını, fixed sistemleri, söndürücü yerlerini ve release noktalarını gösterir ve PSC denetiminin önemli bir parçasıdır.`,
          ],
        },
        {
          subheading: "4.2 OEM ekipman çizimleri",
          paragraphs: [
            `Makine üreticisinin (OEM) bakım el kitaplarındaki kesit (sectional) ve montaj (assembly) çizimleri, bir ekipmanın iç yapısını parça parça gösterir. Bir pompa overhaul'unda, bu çizimler parçaların sökme/takma sırasını, tork değerlerini ve parça numaralarını verir.`,
            `Stajyer, OEM çizimlerini bakım işiyle birlikte kullanmayı öğrenir: hangi parça hangi sırayla sökülür, hangi conta nereye gelir, hangi clearance ölçülür. Bu çizimler aynı zamanda yedek parça kodlarını içerir; PMS'te doğru parça siparişi için bu kodlar kritiktir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Çizimsiz overhaul riski",
              text: `Bir pompa, OEM çizimine bakılmadan söküldüğünde montaj sırasında bir ara halka ters takılır ve sızdırma yapar. Çizime başvurularak hata bulunur ve düzeltilir. Ders: bakım, hafızaya değil OEM çizimine dayanmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. PMS — Planlı Bakım Sistemi Temelleri",
      lead: `PMS, geminin bakım hafızası ve takvimidir. Bakımın "ne zaman, neye, nasıl" yapılacağını ve yapıldığını dijital olarak yönetir.`,
      sections: [
        {
          subheading: "5.1 PMS nedir ve neden zorunludur",
          paragraphs: [
            `PMS, gemideki tüm ekipmanların bakım periyotlarını, prosedürlerini ve geçmişini dijital olarak yöneten bir yazılımdır (örnek yaklaşımlar: AMOS, TM Master, ShipManager, BASSnet). Her ekipman için bakım aralıkları (saat veya takvim bazlı) tanımlanır; PMS, zamanı gelen bakımı iş emri (work order) olarak üretir.`,
            `Sınıf kuruluşları (Class), bazı gemiler için "Planned Maintenance Scheme" onaylı PMS'i, geleneksel periyodik survey yerine kabul eder. Bu nedenle PMS sadece bir kolaylık değil, sınıf ve ISM gerekliliğidir. Düzgün işleyen bir PMS, ekipman güvenilirliğini artırır ve plansız arızaları azaltır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Code — Element 10",
              text: `Şirket, gemi ve ekipmanın belirlenen kurallara uygun bakımını sağlamak için prosedürler oluşturmalıdır. Bu, planlı bakımın kayıt altında ve düzenli yapılmasını içerir; PMS bu gerekliliğin dijital aracıdır.`,
            },
          ],
        },
        {
          subheading: "5.2 Bakım türleri ve aralıkları",
          paragraphs: [
            `PMS'te bakım türleri tanımlanır: önleyici (preventive — planlı periyodik), durum bazlı (condition-based — ölçüme göre), ve arıza sonrası (corrective/breakdown). Önleyici bakım, arıza olmadan planlı yapılır; durum bazlı bakım, vibrasyon/yağ analizi gibi göstergelere göre tetiklenir.`,
            `Bakım aralıkları çalışma saati (running hours) veya takvim (calendar) bazlı olabilir. Örneğin bir purifier "her 2000 saatte" veya bir emniyet valfi "yılda bir" bakım ister. PMS, running hours girişiyle veya tarih ilerlemesiyle iş emirlerini otomatik üretir.`,
          ],
          table: {
            caption: `Bakım Türleri ve Tetikleyiciler`,
            headers: ["Bakım türü", "Tetikleyici", "Örnek"],
            rows: [
              ["Önleyici (planlı)", "Saat/takvim", "Purifier 2000h overhaul"],
              ["Durum bazlı", "Ölçüm/analiz", "Vibrasyon artınca bearing"],
              ["Arıza sonrası", "Breakdown", "Plansız pompa arızası"],
              ["Sınıf/sörvey", "Takvim/sertifika", "Emniyet valfi testi (yıllık)"],
            ],
          },
        },
      ],
    },
    {
      heading: "6. İş Emri (Work Order) Akışı",
      sections: [
        {
          subheading: "6.1 İş emri açma ve kapatma",
          paragraphs: [
            `Bir iş emri (work order), PMS'te bir bakım görevini temsil eder: hangi ekipman, hangi iş, hangi prosedür, gereken yedek parça ve süre. PMS planlı işler için otomatik iş emri üretir; plansız bir arıza için ise manuel iş emri açılır. İş emri; planlama, malzeme hazırlığı, uygulama ve kapanış aşamalarından geçer.`,
            `İş bitince iş emri kapatılır (close-out): yapılan iş, harcanan saat, kullanılan parça, ölçümler (clearance, basınç) ve gözlemler kaydedilir. Bu kapanış kaydı, ekipmanın bakım geçmişini oluşturur ve bir sonraki bakımın planlanmasında, ayrıca sınıf denetiminde delil olarak kullanılır.`,
          ],
          bullets: [
            `İş emri açma (otomatik/manuel)`,
            `Yedek parça ve alet rezervasyonu`,
            `Risk değerlendirmesi/permit bağlantısı`,
            `Uygulama ve ölçüm kaydı`,
            `Kapanış: harcanan saat, parça, gözlem`,
          ],
        },
        {
          subheading: "6.2 Stajyerin iş emri deneyimi",
          paragraphs: [
            `Stajyer, gözetimli olarak iş emri okumayı, ilgili prosedürü ve gerekli parçaları PMS'ten bulmayı öğrenir. Bir bakım işine katıldığında, ilgili iş emrini açıp prosedürü takip etmeyi ve iş sonunda kapanış kaydının nasıl tutulduğunu gözlemler. Bu, çizim okuma ve PMS becerisinin bakımla birleştiği noktadır.`,
            `Stajyer, iş emri kapanış kaydının kalitesinin önemini öğrenir: "yapıldı" yazmak yetmez; ölçülen değerler, değişen parçalar ve gözlemler kaydedilmelidir. İyi bir kapanış kaydı, bir sonraki mühendise ekipmanın gerçek durumunu anlatır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Kapanış kaydı bir mektuptur",
              text: `Bir iş emrini kapatırken, kaydı "altı ay sonra bu ekipmana bakacak mühendise yazılmış bir mektup" gibi düşün. Ölçümler, değişen parçalar ve dikkat çeken gözlemler yazılırsa, kayıt gerçek değer taşır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Yedek Parça Kodlama ve Stok Kontrolü",
      sections: [
        {
          subheading: "7.1 Spare parts kodlama mantığı",
          paragraphs: [
            `Her yedek parça, PMS/envanter sisteminde bir kod (part number / IMPA veya OEM kodu) ile tanımlanır. Doğru parça siparişi için bu kod kritiktir; benzer görünen iki parça farklı kodlara sahip olabilir ve yanlış parça siparişi gecikme ve maliyet yaratır. Parça kodu genellikle OEM bakım el kitabından ve ekipman çiziminden bulunur.`,
            `Stok kontrolü, kritik yedek parçaların minimum seviyesinin (minimum stock level) korunmasını sağlar. Bir parça kullanıldığında envanterden düşülür; seviye minimumun altına inince yeniden sipariş tetiklenir. Kritik parçalar (critical spares — emniyet ve ana makine için) her zaman stokta tutulur; sınıf bunların bulundurulmasını isteyebilir.`,
          ],
          table: {
            caption: `Yedek Parça Yönetimi Kavramları`,
            headers: ["Kavram", "Anlam", "Önem"],
            rows: [
              ["Part number", "Parça tanım kodu", "Doğru sipariş"],
              ["Minimum stock", "Asgari stok seviyesi", "Kesintisiz bakım"],
              ["Critical spare", "Emniyet/kritik parça", "Her zaman stokta"],
              ["Requisition", "Sipariş talebi", "Tedarik başlatma"],
              ["ROB (remaining)", "Mevcut stok", "Envanter takibi"],
            ],
          },
        },
        {
          subheading: "7.2 Stajyerin envanter deneyimi",
          paragraphs: [
            `Stajyer, bir bakım işi için doğru parçayı PMS'ten bulmayı, parça kodunu çizim/manuelle eşleştirmeyi ve kullanılan parçanın envanterden düşülmesini öğrenir. Bu disiplin, "raf düzeni" gibi görünse de geminin operasyonel sürekliliğinin temelidir: yanlış kayıt, kritik anda parçanın bulunamamasına yol açar.`,
            `Stajyer ayrıca periyodik stok sayımının (stocktaking) neden yapıldığını öğrenir: fiziksel stok ile sistem kaydının uyuşması gerekir. Uyuşmazlık, ya kayıtların güncellenmediğini ya da bir parçanın kayıtsız kullanıldığını gösterir. Disiplinli kayıt, güvenilir envanterin tek yoludur.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Stajyerin çizim ve PMS kontrol listesi",
          bullets: [
            `Piping diagramda akışı kaynaktan hedefe takip edebiliyor muyum?`,
            `Bir ekipmanın izolasyon valflerini çizimden bulup sahada doğruladım mı?`,
            `Electrical diagramdan bir motorun beslemesini/izolasyonunu okuyabiliyor muyum?`,
            `GA ve fire control plandan ekipman/zon yerlerini bulabiliyor muyum?`,
            `OEM çizimini bakım işiyle birlikte kullandım mı?`,
            `İş emri açma/kapatma akışını gözetimli deneyimledim mi?`,
            `Yedek parça kodunu çizim/manuelle eşleştirip envanteri güncelledim mi?`,
            `Bu çalışmaları TRB'ye ilgili yetkinlik alanına işledim mi?`,
          ],
          paragraphs: [
            `Teknik çizim okuma ve PMS kullanımı, makine stajyerini "ekipman tanıyan" bir gözlemciden "sistem yöneten" bir mühendise dönüştüren iki temel beceridir. Çizim, sistemin mantığını ve emniyetli izolasyonun yolunu gösterir; PMS ise bakımı planlı, kayıtlı ve sürdürülebilir kılar. Stajyer, çizimde gördüğünü sahada bulma, sahada gördüğünü çizimde teyit etme ve her bakımı PMS'te doğru kaydetme disiplinini geliştirdikçe, geminin teknik hafızasının güvenilir bir parçası haline gelir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
