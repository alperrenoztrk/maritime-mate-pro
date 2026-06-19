import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Mekanik bakım ve metal işleri (Fitter)",
  roleSlug: "yagci-fitter",
  taskIndex: 1,
  estimatedPages: 26,
  intro: `Fitter (Tornacı/Tesviyeci), makine dairesinin atölye uzmanıdır; mühendislerin iş emirlerini fiziksel parça ve onarıma dönüştürür. Bu görev; valf overhaul, pompa bakımı, conta (gasket) kesimi ve değişimi, boru tesisatı (pipe fitting), flanş bağlantıları, basit kaynak (tack/punto kaynağı), metal kesme ve atölye tezgahlarının (torna, matkap, taşlama) güvenli kullanımını kapsar. Bu bölüm, Fitter'ın bir mekanik onarımı planlamadan tamamlamaya kadar izlemesi gereken metodolojiyi, ölçü/tolerans disiplinini, kaynak emniyetini ve kalite kontrolünü adım adım açıklar.`,
  sources: [
    "SOLAS Chapter II-1 — Machinery Installations",
    "ISM Code — Maintenance of the Ship and Equipment (Element 10)",
    "STCW Code Section A-III/4 (Ratings Forming Part of an Engineering Watch)",
    "Class Society Rules (DNV, ABS, LR) — basınçlı sistem ve kaynak onarımları",
    "Permit to Work (PTW) ve Hot Work prosedürleri — şirket SMS",
    "Marine Engineering Practice (IMarEST yayınları)",
    "Pounder's Marine Diesel Engines and Gas Turbines",
    "Manufacturer Maintenance Manuals (pompa/valf/separatör üreticileri)",
  ],
  chapters: [
    {
      heading: "1. İş Emri ve Bakım Planlaması",
      lead: `Her mekanik iş, bir iş emri (work order) ve risk değerlendirmesiyle başlar. Fitter, mühendisten gelen talimatı, sökme/takma sırasını, gerekli yedek parçayı ve emniyet tedbirlerini netleştirmeden işe başlamaz.`,
      sections: [
        {
          subheading: "1.1 İş emri ve PMS bağlantısı",
          paragraphs: [
            `Mekanik bakımların büyük çoğunluğu PMS (Planlı Bakım Sistemi) üzerinden tetiklenir; valf overhaul, pompa açımı, cooler temizliği gibi işler çalışma saatine veya takvime bağlı planlanır. Fitter, iş emrini okuyup gerekli yedek parça, conta, O-ring, salmastra ve sarf malzemenin stokta olduğunu doğrular; eksikse mühendise bildirir.`,
            `Plansız (arıza kaynaklı) işlerde de aynı disiplin geçerlidir: önce arızanın kök nedeni anlaşılmaya çalışılır, gereksiz parça değişiminden kaçınılır. İş öncesi makinenin/sistemin manuali (üretici teknik kitabı) incelenir; özellikle tork değerleri, tolerans aralıkları ve montaj sırası buradan alınır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "ISM — Bakım kaydı",
              text: `ISM Code Element 10 gereği tüm planlı ve arıza bakımları kayıt altına alınır. Fitter'ın yaptığı işlerin kaydı (değişen parça, ölçülen tolerans, kullanılan tork) PMS'e işlenir; bu kayıtlar class ve PSC denetimlerinde delildir.`,
            },
          ],
        },
        {
          subheading: "1.2 Risk değerlendirmesi ve izolasyon (LOTO)",
          paragraphs: [
            `Hiçbir mekanik iş, ekipman emniyetli hale getirilmeden başlamaz. LOTO (Lock-Out / Tag-Out) ile elektrik beslemesi kesilir, kilitlenir ve etiketlenir; basınçlı sistemler izole edilip basınç boşaltılır (de-pressurize); sıcak sistemler soğutulur; dönen ekipman duruşu doğrulanır. Bu adımlar atlanırsa beklenmedik enerji boşalması ölümcül olabilir.`,
            `Risk değerlendirmesinde sıcak yüzey, basınçlı akışkan, ağır parça düşmesi (sıkışma/ezilme), kıvılcım, kimyasal ve enclosed space riskleri tanımlanır ve azaltma tedbirleri (PPE, vinç/sapan, havalandırma) belirlenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "LOTO atlanamaz",
              text: `Bir pompa/valf üzerinde çalışırken motor yanlışlıkla çalıştırılırsa el/parmak kaybı kaçınılmazdır. LOTO kilidi yalnızca işi yapan kişi tarafından takılır ve çıkarılır. "Sadece bir dakika" mazereti, denizcilik kazalarının en yaygın bahanesidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Valf Overhaul (Açım, Bakım, Montaj)",
      sections: [
        {
          subheading: "2.1 Valf tipleri ve sökme",
          paragraphs: [
            `Gemide globe, gate, butterfly, check (non-return), safety/relief ve quick-closing valve gibi çeşitli valf tipleri bulunur. Overhaul öncesi valf izole edilir ve sistem basınçsız kılınır. Fitter, bonnet civatalarını kademeli (çapraz) gevşeterek söker; iç parçaları (disc, seat, spindle, gland packing) çıkarır ve aşınma/oyulma/erozyon açısından inceler.`,
            `Globe ve gate valflerde sızdırmazlık seat ve disc arasındaki yüzeyle sağlanır. Erozyon/çukurlaşma (pitting) varsa lapping (alıştırma macunuyla taşlama) yapılır; ağır hasarda seat değişimi veya yeni valf gerekir. Quick-closing valve'ler (yakıt tankı hızlı kapama) SOLAS gereği test edilir; arızalı çalışması yangın güvenliği açığıdır.`,
          ],
          table: {
            caption: `Valf Tipleri ve Bakım Odakları`,
            headers: ["Valf Tipi", "Kullanım", "Bakım Odağı"],
            rows: [
              ["Globe", "Debi ayarı, izolasyon", "Disc/seat lapping, gland salmastra"],
              ["Gate", "Tam açık/kapalı izolasyon", "Wedge/seat yüzeyi, spindle"],
              ["Butterfly", "Büyük çaplı su/havalandırma", "Disc keçesi, mil yatağı"],
              ["Check / Non-return", "Geri akış önleme", "Clapper/spring, seat yüzeyi"],
              ["Safety / Relief", "Aşırı basınç koruması", "Set basınç kalibrasyonu, seat"],
            ],
          },
        },
        {
          subheading: "2.2 Lapping, montaj ve test",
          paragraphs: [
            `Lapping işleminde uygun grit (kaba→ince) alıştırma macunu ve dairesel/sekiz hareketleri kullanılır; yüzey eşit ve mat-parlak hale gelene kadar devam edilir. İşlem sonrası tüm macun titizce temizlenir — sistemde kalan aşındırıcı, valfi tekrar hasara uğratır. Yeni salmastra (gland packing) doğru ölçüde kesilip kademeli yerleştirilir, uçları kaydırılarak (staggered) sıralanır.`,
            `Montaj sonrası valf, hidrostatik veya pnömatik test ile sızdırmazlık açısından denenir. Safety/relief valfler set basıncında kalibre edilip mühürlenir (sealed). Tüm civatalar üreticinin tork değerlerinde, çapraz sırada sıkılır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Pompa Bakımı",
      sections: [
        {
          subheading: "3.1 Santrifüj pompa overhaul",
          paragraphs: [
            `Santrifüj pompalarda (deniz suyu, balast, yangın, genel servis) bakım; çark (impeller) aşınması, aşınma halkası (wear ring) boşluğu, mil (shaft) durumu, rulman ve salmastra/mekanik salmastra (mechanical seal) kontrolünü kapsar. Wear ring boşluğu arttığında pompa verimi düşer, recirculation artar; tolerans üretici limitiyle karşılaştırılır.`,
            `Mekanik salmastra hassas bir parçadır; montajında yüzeyler tertemiz ve çizilmemiş olmalı, doğru sıkıştırma uygulanmalıdır. Salmastra (gland packing) tipli pompalarda hafif bir damlama (drip) normaldir ve soğutma sağlar; tamamen sızdırmaz sıkmak salmastrayı yakar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Hizalama (alignment) kritiktir",
              text: `Pompa-motor kaplini yeniden bağlanırken hizalama (dial gauge veya lazerle) kontrol edilir. Yanlış hizalama; rulman ömrünü kısaltır, titreşim ve salmastra kaçağı yaratır. "Gözle yeterli" yaklaşımı erken arızanın ana sebebidir.`,
            },
          ],
        },
        {
          subheading: "3.2 Pozitif deplasmanlı ve özel pompalar",
          paragraphs: [
            `Vidalı (screw), dişli (gear) ve pistonlu pompalar (yakıt, yağlama, hidrolik) için boşluk (clearance) ve aşınma kontrolü farklı kriterlere tabidir. Yakıt transfer ve booster pompalarında iç boşluklar arttığında basınç düşer; emiş/basma valfleri ve emniyet valfi kontrol edilir. Bilge/sintine pompalarında ise priming (emiş havası alma) kabiliyeti ve check valf sızdırmazlığı önemlidir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Conta (Gasket) Kesimi ve Değişimi",
      sections: [
        {
          subheading: "4.1 Conta malzemesi seçimi",
          paragraphs: [
            `Doğru conta seçimi, sızdırmazlığın temelidir. Akışkanın türü (yağ, yakıt, su, buhar, egzoz), sıcaklığı ve basıncı, malzeme ve kalınlığı belirler. Yanlış conta — örneğin buhar hattına düşük sıcaklık conta — kısa sürede deforme olup kaçak yapar. Asbest içermeyen (non-asbestos) malzemeler standarttır; asbest yasaktır.`,
            `Conta, flanş yüzeyine birebir uyacak şekilde kesilir; cıvata delikleri, iç çap ve dış çap doğru işaretlenir. Conta kesim aletleri (gasket cutter, zımba seti) ve şablon kullanılır. Conta iç çapı boru iç çapından küçük olmamalı, akışı daraltmamalıdır.`,
          ],
          table: {
            caption: `Conta Malzemesi Seçim Rehberi (Tipik)`,
            headers: ["Uygulama", "Sıcaklık/Basınç", "Tipik Malzeme"],
            rows: [
              ["Deniz suyu / düşük basınç", "<80°C, düşük", "Non-asbestos fiber, kauçuk"],
              ["Yağ / yakıt hattı", "Orta sıcaklık", "Nitrile / Klingerit tipi"],
              ["Buhar / yüksek sıcaklık", ">200°C", "Grafit / spiral-wound"],
              ["Egzoz flanşı", "Çok yüksek", "Metal/grafit kompozit"],
              ["O-ring (hidrolik)", "Basınca göre", "Nitrile / Viton / EPDM"],
            ],
          },
        },
        {
          subheading: "4.2 Montaj ve sıkma disiplini",
          paragraphs: [
            `Flanş yüzeyleri eski conta kalıntısından, çapaktan ve kirden tamamen temizlenir. Yeni conta kuru veya üreticinin önerdiği yağlamayla yerleştirilir. Cıvatalar daima çapraz (yıldız) sırada ve kademeli torkla sıkılır; tek seferde tam tork uygulamak contayı ezerek kaçağa yol açar. Yüksek basınç/sıcaklık bağlantılarında tork anahtarı zorunludur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Aşırı sıkma da kaçak yapar",
              text: `Cıvatayı "olabildiğince sık" yaklaşımı yanlıştır; aşırı tork contayı ezer, flanşı çarpıtır ve cıvatayı kopma noktasına getirir. Daima üretici tork değerini ve çapraz sıralamayı uygulayın. Sıcak çalışan bağlantılar ilk ısınma sonrası yeniden sıkma (hot torquing) gerektirebilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Boru Tesisatı (Pipe Fitting) ve Flanş Bağlantıları",
      sections: [
        {
          subheading: "5.1 Boru ölçme, kesme ve hazırlık",
          paragraphs: [
            `Boru onarımında doğru ölçü almak işin yarısıdır. Fitter, mevcut hattın güzergahını, çapını, et kalınlığını ve malzemesini (çelik, galvaniz, bakır-nikel, paslanmaz) belirler. Boru, boru kesme makinesi veya taşlama ile kesilir; kesim sonrası ağız raybalanarak (deburring) çapak alınır ve iç akış engeli kaldırılır.`,
            `Kaynaklı bağlantı yapılacaksa kaynak ağzı (bevel) açılır; flanşlı bağlantıda flanş tipi (slip-on, weld-neck) ve basınç sınıfı uyumlu seçilir. Vidalı (threaded) bağlantılarda diş açma (threading) ve uygun keten/teflon bant + macun ile sızdırmazlık sağlanır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Malzeme uyumu",
              text: `Farklı metallerin (örn. çelik-bakır) doğrudan teması galvanik korozyona yol açar. Deniz suyu hatlarında genelde bakır-nikel veya galvaniz; yüksek basınç buhar/yakıtta çelik kullanılır. Onarımda orijinal malzeme spesifikasyonuna uyulur; class onaylı boru sınıfı korunur.`,
            },
          ],
        },
        {
          subheading: "5.2 Flanş bağlantı ve test",
          paragraphs: [
            `Flanş yüzeyleri paralel ve hizalı olmalı; eğri bağlanan flanş cıvataları zorlar ve kaçak yapar. Conta yerleştirildikten sonra cıvatalar çapraz sırada torklanır. Onarılan basınçlı hat, devreye alınmadan önce çalışma basıncının üzerinde hidrostatik teste tabi tutulur ve sızdırmazlık doğrulanır.`,
            `Geçici onarımlarda (acil sızıntı) boru kelepçesi (pipe clamp) veya soğuk onarım kiti kullanılabilir; ancak bu çözümler geçicidir ve ilk fırsatta kalıcı kaynaklı/flanşlı onarımla değiştirilir. Class society, kalıcı onarımları onaylar.`,
          ],
        },
      ],
    },
    {
      heading: "6. Basit Kaynak (Tack/Punto Kaynağı) ve Metal Kesme",
      sections: [
        {
          subheading: "6.1 Ark kaynağı temelleri",
          paragraphs: [
            `Fitter, atölye düzeyinde elektrik ark kaynağı (MMA/stick) ile tack (punto) kaynağı, parça birleştirme ve basit onarım yapar. Doğru elektrot (malzeme ve pozisyona göre), doğru akım ayarı (elektrot çapına göre) ve temiz yüzey (pas/yağ/boya temizlenmiş) kaliteli kaynağın koşullarıdır. Nemli elektrot gözenek (porosity) yaratır; elektrotlar kuru tutulur.`,
            `Basınçlı sistem ve yapısal (structural) kaynaklar yetkili/sertifikalı kaynakçı ve genelde class onayı gerektirir; Fitter bu sınırı bilir ve yetki dışına çıkmaz. Kritik onarımlarda NDT (tahribatsız muayene) ile kaynak kalitesi doğrulanabilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Sıcak çalışma izni zorunlu",
              text: `Makine dairesinde her kaynak/kesme işi Hot Work Permit gerektirir. Gaz ölçümü (LEL), yangın gözcüsü (fire watch), yangın söndürücü hazır bulundurma ve çevredeki yanıcı maddelerin kaldırılması zorunludur. İzinsiz sıcak çalışma, gemideki en yaygın felaket nedenlerinden biridir.`,
            },
          ],
        },
        {
          subheading: "6.2 Oksi-asetilen kesme ve taşlama",
          paragraphs: [
            `Kalın metal kesimi için oksi-asetilen (gaz kesme) veya plazma kesim kullanılır. Tüp basınçları (oksijen/asetilen) ve geri tepme emniyet (flashback arrestor) kontrol edilir; asetilen tüpü daima dik konumda tutulur. Kesim öncesi çevre yangın açısından güvenli kılınır.`,
            `Taşlama (grinding) işlemlerinde doğru disk (kesme diski kesmeye, taşlama diski taşlamaya) kullanılır; disk asla yanlış amaçla kullanılmaz (kesme diskiyle yan taşlama disk patlamasına yol açar). Disk son kullanma tarihi ve çatlak kontrol edilir, koruma siperi (guard) çıkarılmaz.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — Taşlama diski patlaması",
              text: `Bir Fitter, kesme diskiyle yandan taşlama yaparak diski radyal yüke maruz bırakır; disk patlar ve parçalardan biri yüz siperi sayesinde ciddi yaralanmayı önler. Ders: doğru disk, doğru iş; yüz/göz koruması her zaman takılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Atölye Tezgahları: Torna, Matkap, Taşlama",
      sections: [
        {
          subheading: "7.1 Torna tezgahı (lathe) kullanımı",
          paragraphs: [
            `Torna, gemi atölyesinin en kullanışlı makinesidir; mil yatağı işleme, cıvata/saplama imali, conta yüzeyi düzeltme ve aşınmış parça onarımında kullanılır. İş parçası aynaya (chuck) doğru merkezlenir; ayna anahtarı kullanım sonrası daima çıkarılır (içinde unutulan anahtar fırlayarak öldürebilir). Kesme hızı ve ilerleme, malzeme ve kesici uca göre seçilir.`,
            `Dönen tezgahta bol giysi, eldiven, kravat, kolye ve gevşek kol yasaktır; bunlar parçaya kapılırsa kol/parmak kaybına yol açar. Talaş elle değil fırça/kanca ile temizlenir; soğutma sıvısı (cutting fluid) uygulanır.`,
          ],
          table: {
            caption: `Atölye Tezgahları — Temel Emniyet Kuralları`,
            headers: ["Tezgah", "Ana Risk", "Kritik Önlem"],
            rows: [
              ["Torna", "Dolanma, fırlayan parça", "Bol giysi/eldiven yok, ayna anahtarı çıkar"],
              ["Matkap (drill press)", "Parça dönmesi, talaş", "İş parçasını mengeneyle sabitle"],
              ["Bench grinder", "Disk patlaması, kıvılcım", "Tool rest mesafesi ≤3 mm, yüz siperi"],
              ["Açılı taşlama", "Geri tepme, disk kırılması", "Doğru disk, guard, iki elle tut"],
            ],
          },
        },
        {
          subheading: "7.2 Matkap ve taşlama tezgahı",
          paragraphs: [
            `Matkap tezgahında (drill press) iş parçası mutlaka mengene/kelepçe ile sabitlenir; elle tutulan parça matkap kapınca döner ve "el kırbacı" gibi savrularak yaralar. Doğru matkap ucu (HSS, malzemeye uygun), doğru devir ve soğutma kullanılır. Ucu çıkarmak için tezgah durdurulur.`,
            `Sabit taşlama tezgahında (bench grinder) tool rest ile taş arasındaki boşluk ≤3 mm tutulur; aksi halde parça boşluğa sıkışır. Taşın yan yüzünde değil ön yüzünde çalışılır; aşırı ısınan parça soğutulur. Yüz siperi ve gözlük zorunludur.`,
          ],
        },
      ],
    },
    {
      heading: "8. Ölçüm, Tolerans ve Kalite Kontrolü",
      sections: [
        {
          subheading: "8.1 Ölçü aletleri ve tolerans",
          paragraphs: [
            `Mekanik bakımın kalitesi doğru ölçümle başlar. Fitter; kumpas (caliper), mikrometre, feeler gauge (sentil), dial gauge ve bore gauge gibi aletleri ustaca kullanır. Yatak boşlukları (clearance), mil çapı, ovality (oval aşınma) ve düzlemsellik üretici toleranslarıyla karşılaştırılır; sınır dışı parça değiştirilir.`,
            `Ölçü aletleri hassas ekipmandır; düşürmek, paslandırmak veya yanlış saklamak kalibrasyonu bozar. Mikrometre kullanım öncesi sıfırlanır, kullanım sonrası temiz ve yağlı saklanır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "İki kez ölç, bir kez işle",
              text: `Torna veya montajda hatalı ölçüm pahalı bir parçayı hurdaya çevirir. Kritik ölçüleri iki kez doğrulayın; mümkünse farklı aletle teyit edin. Tolerans aralığını üretici manualinden alın, hafızadan tahmin etmeyin.`,
            },
          ],
        },
        {
          subheading: "8.2 Montaj sonrası test ve devreye alma",
          paragraphs: [
            `Onarılan ekipman devreye alınmadan önce test edilir: pompalar sızdırmazlık ve basınç testinden, valfler sızdırmazlıktan, kaynaklı/flanşlı hatlar hidrostatik testten geçirilir. İlk çalıştırmada (commissioning) titreşim, ses, sıcaklık ve kaçak gözlenir; anormallikte derhal durdurulur. Devreye alma mühendis gözetiminde yapılır.`,
            `İş tamamlandığında kullanılan tüm alet, parça ve sarf malzeme kontrol edilir; çalışma alanında unutulan alet (foreign object) dönen ekipmana kapılarak hasar/kaza yaratabilir. Temizlik ve toparlama işin ayrılmaz parçasıdır.`,
          ],
        },
      ],
    },
    {
      heading: "9. Yedek Parça, Alet ve Atölye Düzeni",
      sections: [
        {
          subheading: "9.1 Yedek parça ve alet yönetimi",
          paragraphs: [
            `Fitter, kullandığı yedek parça ve sarf malzemenin stok kaydını günceller; conta levhası, O-ring seti, salmastra, civata/saplama, elektrot, taşlama diski gibi malzemelerin azaldığı mühendise bildirilir. Kritik yedeklerin (class tarafından zorunlu kılınan minimum spare parts) tükenmemesi önemlidir.`,
            `Atölye aletleri temiz, tam ve yerli yerinde tutulur. Hasarlı el aleti (çatlak çekiç sapı, deforme anahtar, izolasyonu bozuk elektrikli el aleti) kullanım dışı bırakılır; kötü alet hem kaza hem kötü iş kaynağıdır.`,
          ],
        },
        {
          subheading: "9.2 Atölye güvenliği ve düzen (housekeeping)",
          paragraphs: [
            `Düzenli atölye güvenli atölyedir. Yağ/talaş zemine birikmez (kayma/yangın riski), gaz tüpleri zincirle sabitlenir, elektrik kabloları takılma yaratmaz, ağır parçalar güvenli istiflenir. Aydınlatma yeterli, havalandırma (kaynak dumanı için) çalışır durumda olmalıdır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "5S ve denizcilik",
              text: `Birçok şirket SMS'i, atölye düzeni için 5S (ayıkla-düzenle-temizle-standartlaştır-sürdür) benzeri prensipleri benimser. Düzenli atölye, kaza oranını düşürür ve iş verimini artırır; denetimlerde de olumlu değerlendirilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Fitter'ın iş kontrol listesi",
          bullets: [
            `İş emri ve üretici manuali okundu, yedek parça/conta hazır mı?`,
            `Risk değerlendirmesi yapıldı, LOTO ve izolasyon uygulandı mı?`,
            `Sıcak çalışma varsa Hot Work Permit + fire watch + gaz ölçümü tamam mı?`,
            `Doğru ölçü aleti kullanıldı, tolerans üretici limitiyle karşılaştırıldı mı?`,
            `Doğru conta/O-ring/salmastra malzemesi seçildi mi?`,
            `Cıvatalar çapraz sırada ve doğru torkla sıkıldı mı?`,
            `Lapping/temizlik sonrası aşındırıcı/kalıntı bırakılmadı mı?`,
            `Montaj sonrası test (basınç/sızdırmazlık/hidrostatik) yapıldı mı?`,
            `Çalışma alanında unutulan alet/parça yok mu (foreign object)?`,
            `İş PMS'e kaydedildi, stok güncellendi, atölye toparlandı mı?`,
          ],
          paragraphs: [
            `Fitter'ın ustalığı; ölçü disiplini, doğru malzeme seçimi, emniyet kurallarına tavizsiz uyum ve temiz işçilikte toplanır. İyi yapılmış bir conta değişimi veya valf overhaul'u görünmez kalır; kötü yapılmış olanı ise kaçak, arıza ve hatta yangınla kendini gösterir. Bu yüzden Fitter için "doğru ve emniyetli" her zaman "hızlı"dan önce gelir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
