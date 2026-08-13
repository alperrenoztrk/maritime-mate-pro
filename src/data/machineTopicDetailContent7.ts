import type { MachineSubTopicContent } from "./machineTopicDetailContent";

type ContentMap = Record<string, Record<string, MachineSubTopicContent>>;

const content7: ContentMap = {
  // ═══════════════════════════════════════════════════════════════
  // MAKİNE DAİRESİ OPERASYONLARI — Eksik alt başlıklar
  // ═══════════════════════════════════════════════════════════════
  "engine-room-ops": {
    "Yardımcı makine kontrolü": {
      title: "Yardımcı Makine Kontrolü",
      introduction: "Seyir öncesi ve seyir sırasında yardımcı makinelerin kontrol ve izlenmesi, güvenli enerji üretiminin sürekliliği için zorunludur.",
      sections: [
        { heading: "Kontrol Prosedürü", paragraphs: ["Yardımcı dizel jeneratörlerin yağlama yağı seviye ve basıncı, soğutma suyu sıcaklığı ve seviyesi, yakıt sistemi basıncı ve sıcaklığı kontrol edilir.", "Çalışan jeneratörün gerilim, frekans, yük (kW ve kVAr) değerleri ana panoda izlenir. Yedek jeneratörün başlatma havası basıncı ve otomatik devreye girme fonksiyonu doğrulanır."] },
        { heading: "İzleme Parametreleri", paragraphs: [], table: { headers: ["Parametre", "Normal Değer", "Alarm Seviyesi"], rows: [["Yağ basıncı", "3-6 bar", "< 2 bar"], ["Soğutma suyu sıcaklığı", "70-85°C", "> 90°C"], ["Egzoz sıcaklığı", "300-450°C", "> 500°C"], ["Frekans", "60 Hz (veya 50 Hz)", "±5%"], ["Yük", "< %85 MCR", "> %90 MCR"]] } }
      ],
      keyPoints: ["Yedek jeneratör her zaman başlatmaya hazır olmalıdır.", "Paralel çalışan jeneratörlerin yük dengesi izlenmelidir.", "Alarm öncesi trend takibi erken müdahale imkânı sağlar."]
    },
    "Yakıt sistemi hazırlığı": {
      title: "Yakıt Sistemi Hazırlığı",
      introduction: "Seyir öncesi yakıt sistemi hazırlığı, motorlara temiz ve uygun koşullarda yakıt beslenmesini garanti eder.",
      sections: [
        { heading: "Hazırlık Adımları", paragraphs: ["1. Yakıt tank seviyelerini kontrol et (depolama, settling, servis).", "2. Purifier/clarifier çalıştır ve arıtma akışını doğrula.", "3. Yakıt ısıtıcılarını devreye al ve sıcaklığı kontrol et.", "4. Viskometre okumalarını kontrol et.", "5. Yakıt filtrelerinin diferansiyel basıncını kontrol et.", "6. Yakıt besleme ve booster pompa basınçlarını doğrula.", "7. Enjeksiyon sistemi hazırlığını tamamla."] },
        { heading: "Yakıt Geçişi", paragraphs: ["ECA bölgesine giriliyorsa fuel changeover prosedürü zamanında başlatılmalıdır. Changeover süresi yakıt sistemi hacmine ve akış hızına bağlıdır; tipik olarak 1-3 saat sürer."] }
      ],
      keyPoints: ["Servis tankı kapasitesi en az 8 saatlik tüketim karşılamalıdır.", "Purifier bakım durumu seyir öncesi kontrol edilmelidir.", "Yakıt kalite raporu (lab analizi) incelenerek uygun ayarlar yapılmalıdır."]
    },
    "Soğutma ve yağlama kontrolü": {
      title: "Soğutma ve Yağlama Sistemleri Kontrolü",
      introduction: "Ana ve yardımcı motorların soğutma ve yağlama sistemleri, motor güvenilirliğinin temelini oluşturur.",
      sections: [
        { heading: "Soğutma Sistemi", paragraphs: ["HT (yüksek sıcaklık) devresi: Silindir gömleği ve kapak soğutması. Sıcaklık 75-90°C arasında tutulur.", "LT (düşük sıcaklık) devresi: Yağlama yağı soğutucusu ve şarj havası soğutucusu. Deniz suyu ile soğutulur.", "Kontrol: Genleşme tankı seviyesi, pompa basıncı, termometre okumaları, soğutma suyu kimyası."] },
        { heading: "Yağlama Sistemi", paragraphs: ["Ana yağlama yağı sistemi: Karter yağı, ana yataklar, krank pin yatakları, turboşarj yatakları.", "Silindir yağlama sistemi (2 zamanlı): Silindir gömleğine dozajlı yağ beslenmesi; TBN değeri yakıt kükürt içeriğine göre seçilir.", "Kontrol: Yağ basıncı (3-6 bar), sıcaklık (40-55°C), yağ seviyesi, filtre diferansiyel basıncı."] },
        { heading: "Yağlama Yağı Sistemi Mimarisi", paragraphs: ["Islak karter (wet sump): yağ doğrudan karterde toplanır; küçük/orta dört zamanlı motorlarda yaygındır.", "Kuru karter (dry sump): yağ karterden ayrı bir devirdaim (sump) tankına akar; büyük iki zamanlı crosshead motorlarda kullanılır. Yerçekimi (gravity) tankı, pompa arızasında kısa süreli besleme sağlar.", "Devre elemanları sırası: sump tank → ana LO pompası (motor tahrikli + elektrikli yedek) → LO soğutucusu (LT devresiyle) → tam akış (full-flow) filtre → motora dağıtım. Sürekli bir yan akış (bypass) purifier ile yağ temizlenir."] },
        { heading: "Ana Bileşenler", paragraphs: ["LO pompası: dişli/vidalı tip; ana + otomatik devreye giren yedek. Basınç düşüşünde alarm ve düşük basınçta motor trip.", "LO soğutucusu: plakalı/borulu; yağı 40-55°C'de tutar (LT deniz suyu/tatlı su ile).", "Filtre: tam akış otomatik geri yıkamalı (auto-backwash) + manyetik tutucu; diferansiyel basınç tıkanmayı gösterir.", "Purifier (separatör): santrifüj kuvvetiyle su ve katı partikülleri ayırır; doğru gravity disc (dam ring) ve besleme debisi kritiktir."] },
        { heading: "Silindir Yağlaması (2 Zamanlı)", paragraphs: ["Crosshead motorlarda silindir yağı, sistem yağından AYRIDIR ve liner üzerindeki yağlama deliklerinden (quill) dozajlanır. Modern alfa/SIP/CLU yağlayıcıları enjeksiyonu piston hareketiyle senkronize eder.", "Besleme oranı tipik olarak 0.7-1.5 g/kWh aralığındadır; az yağlama mikro tutuşma/aşınma, fazla yağlama kalıntı (deposit) ve maliyet yaratır.", "BN/TBN yakıt kükürtüne göre seçilir: yüksek kükürtlü yakıtta BN 70-100, düşük kükürtlü (VLSFO/MGO) yakıtta BN 15-40. Yanlış TBN korozif veya abrazif aşınmaya yol açar."] },
        { heading: "Karter İzleme ve Patlama Koruması", paragraphs: ["Karter içinde sıcak nokta (hot spot) yağ buharı oluşturur; bu buhar hava ile karışıp tutuşursa karter patlaması olur. Oil Mist Detector (OMD) yağ buharı yoğunluğunu izler ve eşiği aşınca motoru yavaşlatır/durdurur.", "Karter rölyef (kabartma) valfleri patlama basıncını dışarı boşaltır ve geri tepme alevini söndürür. Ana yatak sıcaklıkları izlenir.", "Karter sıcaksa kapak hemen açılmaz (oksijen girişi ikincil patlama yaratır); soğuması beklenir."] },
        { heading: "Yağ Özellikleri ve Kontaminasyon", paragraphs: ["Önemli özellikler: viskozite (SAE/cSt), TBN (asit nötralizasyon kapasitesi), parlama noktası, katkılar (deterjan, dispersan, anti-wear, anti-oksidan).", "Su kontaminasyonu emülsiyon ve korozyon yaratır; yakıt dilüsyonu viskozite ve parlama noktasını düşürür; cat fines ve kurum (soot) abrazif aşınma yapar.", "Düzenli yağ analizi (gemide spot/blotter testi + laboratuvar) viskozite, TBN, su, metal partikül (PQ index) eğilimini izler; sapmalar erken arıza işaretidir."] }
      ],
      keyPoints: ["Soğutma suyu kaçağı motor hasarına neden olur.", "Yağ basıncı kaybı motor acil durdurma sebebidir.", "Soğutma suyu kimyasalları (inhibitör) korozyonu önler.", "Silindir yağı sistemden ayrıdır; BN yakıt kükürtüne göre seçilir (yüksek S → BN70-100, düşük S → BN15-40).", "OMD ve karter rölyef valfleri karter patlamasına karşı temel korumadır; sıcak karter kapağı hemen açılmaz.", "Yağ analizi (viskozite, TBN, su, metal) trend izlemeyle erken arıza tespitini sağlar."]
    },
    "Dümen ve güverte makineleri testi": {
      title: "Dümen ve Güverte Makineleri Testi",
      introduction: "Seyir öncesi dümen makinesi ve güverte makinelerinin testi, SOLAS tarafından zorunlu kılınan güvenlik prosedürüdür.",
      sections: [
        { heading: "Dümen Testi (SOLAS Reg. V/26)", paragraphs: ["1. Ana dümen makinesini çalıştır ve tam açıdan tam açıya (35° iskele → 35° sancak) 28 saniye içinde dönüş kontrolü yap.", "2. Yedek dümen makinesi testi: Çalıştırma ve dümen hareketi doğrulama.", "3. Uzaktan kontrol sistemi (köprüüstü ve acil dümen) testi.", "4. Dümen açı göstergesi senkronizasyon kontrolü.", "5. Telemotor sistemi seviye ve basınç kontrolü."] },
        { heading: "Güverte Makineleri", paragraphs: ["Demir ırgadı: Fren testi, kavrama kontrolü.", "Mooring vinçleri: Çalıştırma ve fren testi.", "Kapak mekanizmaları: Açma/kapama ve sızdırmazlık kontrolü."] }
      ],
      keyPoints: ["Dümen testi her kalkış öncesinde yapılmalıdır.", "Test sonuçları köprüüstü seyir jurnalına kayıt edilir.", "Dümen arızası seyir güvenliğini doğrudan etkiler."]
    },
    "Engine room check list": {
      title: "Engine Room Check List",
      introduction: "Makine dairesi kontrol listesi, seyir öncesi ve sonrası tüm kontrol noktalarının sistematik olarak doğrulanmasını sağlayan güvenlik aracıdır.",
      sections: [
        { heading: "Kalkış Kontrol Listesi", paragraphs: [], bulletPoints: ["Ana makine yağlama, soğutma ve yakıt sistemi hazır", "Yardımcı jeneratörler çalışır durumda", "Dümen makinesi test edildi", "Başlatma havası basıncı yeterli (≥ 18 bar)", "Hızlı kapatma vanaları ve yangın sistemi hazır", "Sintine sistemi kontrol edildi", "Tüm alarmlar test edildi ve aktif", "Turning gear devre dışı bırakıldı", "Silindir yağlama aktif", "Köprüüstüne 'Makine Hazır' bildirildi"] },
        { heading: "Varış Kontrol Listesi", paragraphs: ["Varışta ana makine soğutma süresi beklenir, gerekli izolasyonlar yapılır, kıyı bağlantısı (shore connection) hazırlanır ve liman jeneratör konfigürasyonu ayarlanır."] }
      ],
      keyPoints: ["Kontrol listesi ISM SMS'in operasyonel prosedürler bölümünde yer alır.", "Her madde tamamlandığında işaretlenir ve imzalanır.", "Kontrol listesi atlanması disiplin ve güvenlik ihlali oluşturur."]
    },
    "Periyodik kontrol turları (round)": {
      title: "Periyodik Kontrol Turları (Round)",
      introduction: "Makine dairesi round'u, vardiya nöbetçisinin belirli aralıklarla tüm çalışan ekipmanları yerinde kontrol ettiği izleme faaliyetidir.",
      sections: [
        { heading: "Round Kapsamı", paragraphs: [], bulletPoints: ["Ana motor: Egzoz sıcaklıkları, scavenge basıncı, soğutma/yağlama sıcaklık ve basınçları", "Yardımcı motorlar: Yük, sıcaklık, yağ seviyesi", "Kazanlar: Su seviyesi, basınç, brülör durumu", "Purifier: Çalışma durumu, akış ve sıcaklık", "Kompresörler: Çalışma durumu, hava şişe basıncı", "Pompalar: Basınç, sıcaklık, sızıntı", "Sintine kuyuları: Seviye kontrolü", "Genel: Sızıntı, anormal gürültü, koku, titreşim"] },
        { heading: "Round Sıklığı", paragraphs: ["UMS çalışmada: Round aralığı genellikle 4-6 saattir, dead man alarm sistemi ile desteklenir.", "Nöbetli çalışmada: Her 1-2 saatte round atılır. Kritik durumda daha sık kontrol yapılır."] }
      ],
      keyPoints: ["Round sırasında tüm duyular kullanılmalıdır: görme, işitme, dokunma, koku.", "Bulgular Engine Log Book'a kayıt edilmelidir.", "Anormal bulgu derhal vardiya mühendisine raporlanmalıdır."]
    },
    "Performans parametreleri izleme": {
      title: "Performans Parametreleri İzleme",
      introduction: "Ana motor performansının sürekli izlenmesi, verim düşüşünün erken tespiti ve bakım planlaması için gereklidir.",
      sections: [
        { heading: "İzlenen Parametreler", paragraphs: [], table: { headers: ["Parametre", "Gösterge", "Sapma Anlamı"], rows: [["Egzoz sıcaklığı", "Yanma kalitesi", "Enjektör arızası, aşırı yük"], ["Scavenge basıncı", "Turboşarj verimi", "Filtre tıkanması, turbo fouling"], ["SFOC", "Yakıt verimi", "Yanma bozukluğu, ring aşınması"], ["Pmax / Pcomp", "Yanma basıncı", "Enjeksiyon zamanlaması"], ["Turboşarj devri", "Hava besleme", "Fouling, yatak aşınması"], ["Soğutma suyu ΔT", "Isı transferi", "Fouling, su sızıntısı"]] } },
        { heading: "Trend Analizi", paragraphs: ["Performans parametreleri günlük olarak kaydedilir ve referans değerlerle karşılaştırılır. Kademeli sapma fouling veya aşınmayı, ani sapma ise arızayı gösterir.", "Modern motorlarda elektronik performans izleme sistemi (PMI – Pressure Mean Indication) otomatik analiz sunar."] }
      ],
      keyPoints: ["Performans izleme yakıt maliyetini optimize eder.", "Silindir bazında karşılaştırma dengesizliği tespit eder.", "ISO düzeltmesi referans koşullarda karşılaştırma sağlar."]
    },
    "Günlük kayıt (Engine Log Book)": {
      title: "Günlük Kayıt (Engine Log Book)",
      introduction: "Engine Log Book, makine dairesi operasyonlarının resmi kaydıdır. Tüm çalışma parametreleri, olaylar ve bakım faaliyetleri bu deftere işlenir.",
      sections: [
        { heading: "Kayıt İçeriği", paragraphs: [], bulletPoints: ["Ana motor devri, güç ve yakıt tüketimi", "Yardımcı motor yükleri ve çalışma saatleri", "Tank seviyeleri (yakıt, yağ, tatlı su)", "Sıcaklık ve basınç okumaları", "Alarm ve müdahale kayıtları", "Bakım ve onarım işleri", "Yakıt değiştirme ve bunker operasyonları", "Vardiya devir-teslim notları", "Hava ve deniz durumu (makine perspektifinden)"] },
        { heading: "Yasal Boyutu", paragraphs: ["Engine Log Book resmi bir evrak olup bayrak devleti denetimleri ve PSC kontrollerinde incelenir. Kayıtlar mürekkepli kalemle yazılmalı, silinti ve düzeltmeler çizilerek yapılmalıdır (beyaz bantla kapatma yasaktır)."] }
      ],
      keyPoints: ["Kayıtlar doğru, okunaklı ve zamanında yapılmalıdır.", "Log book sayfaları numaralıdır ve yırtılmamalıdır.", "Dijital log book sistemleri kağıt log book'u destekleyici olarak kullanılabilir."]
    },
    "Alarm yönetimi ve müdahale": {
      title: "Alarm Yönetimi ve Müdahale",
      introduction: "Makine dairesi alarm sistemi, anormal çalışma koşullarını tespit ederek zamanında müdahale edilmesini sağlar.",
      sections: [
        { heading: "Alarm Öncelikleri", paragraphs: [], table: { headers: ["Öncelik", "Tanım", "Müdahale"], rows: [["Kritik (Shutdown)", "Motor/ekipman otomatik durma", "Acil müdahale, neden araştırma"], ["Ciddi (Slowdown)", "Motor yavaşlatma", "Acil kontrol, sebep giderme"], ["Uyarı (Warning)", "Parametre sapması", "Kontrol ve izleme"], ["Bilgi (Status)", "Durum değişikliği", "Kayıt"]] } },
        { heading: "Müdahale Prosedürü", paragraphs: ["1. Alarmı oku ve tanı: Hangi parametre, hangi ekipman?", "2. Alarmı kabul et (acknowledge) – sesli alarmı sustur.", "3. Durumu yerinde kontrol et.", "4. Nedenini araştır ve düzeltici aksiyon al.", "5. Parametreler normale döndüğünde izlemeye devam et.", "6. Olayı Engine Log Book'a kaydet."] }
      ],
      keyPoints: ["Alarm sesi sürekli çalarken köprüüstüne bilgi verilmelidir.", "Alarm flooding (çok sayıda eşzamanlı alarm) durumunda önceliklendirme yapılmalıdır.", "Bypass edilen alarm mutlaka kayıt altına alınmalıdır."]
    },
    "Ana makine hız kontrolü": {
      title: "Ana Makine Hız Kontrolü",
      introduction: "Ana motor hız kontrolü, seyir hızı ve manevra gereksinimlerini karşılamak için motorun devrini ayarlama sürecidir.",
      sections: [
        { heading: "Kontrol Yöntemleri", paragraphs: ["Bridge control: Köprüüstünden makine telgrafı veya elektronik kontrol sistemi ile devir ayarı yapılır. Elektronik governor yakıt enjeksiyon miktarını düzenler.", "Engine room control: Manevra sırasında veya bridge control arızasında makine dairesinden manuel kontrol.", "Governor: Hız düzenleme cihazı; mekanik veya elektronik olabilir. Set devire göre yakıt pompası ayarını otomatik yapar."] },
        { heading: "Yük Programı", paragraphs: ["Motor üreticisi, yükleme ve yük azaltma hızını sınırlandıran yük programı (load program) belirler. Ani yük artışı termal stres ve mekanik hasara neden olabilir.", "Tipik olarak motorun tam yüke çıkması 30-60 dakika sürer. Soğuk motorun ilk devreye alınmasında daha uzun süre gerekir."] }
      ],
      keyPoints: ["Ani hız değişiklikleri motor hasarına neden olabilir.", "Governor hunting (devir salınımı) yakıt sistemi arızasını gösterebilir.", "Deniz durumuna göre ağır hava koşullarında devir azaltılmalıdır."]
    },
    "Acil durma ve geri yol": {
      title: "Acil Durma ve Geri Yol (Crash Stop / Astern)",
      introduction: "Acil durma ve geri yol operasyonları, çarpışma veya karaya oturma riskinde uygulanan kritik manevralarıdır.",
      sections: [
        { heading: "Acil Durma (Crash Stop)", paragraphs: ["Köprüüstünden tam yol ileri → stop komutu verilir. Motor yakıt kesilir ve fren etkisi oluşturulur. Gemi kendi direnci ile yavaşlar.", "Durma mesafesi gemi boyunun 5-15 katı kadardır ve deplasana, hıza ve deniz durumuna bağlıdır."] },
        { heading: "Geri Yol (Astern)", paragraphs: ["Sabit hatveli pervaneli gemilerde motor durdurulur ve geri yöne başlatma havası ile çevirilerek geri devirde çalıştırılır.", "Değişken hatveli pervanede (CPP) motor devri değişmez; pervane kanat açısı geri yöne çevrilerek geri itme kuvveti oluşturulur. Daha hızlı geçiş sağlar.", "İki zamanlı motorlarda geri yol operasyonu kam veya elektronik değişim ile sağlanır (ME motorlarda yazılımla)."] }
      ],
      keyPoints: ["Geri yol operasyonunda turboşarj devri düşer; yardımcı üfleyici devreye girer.", "Crash astern geminin yapısına büyük yük bindirir; gereksiz kullanılmamalıdır.", "Manevra öncesi geri yol testi yapılmalıdır."]
    },
    "Köprüüstü-makine dairesi iletişim": {
      title: "Köprüüstü – Makine Dairesi İletişimi",
      introduction: "Güvenli seyir, köprüüstü ve makine dairesi arasında etkili ve kesintisiz iletişimi gerektirir.",
      sections: [
        { heading: "İletişim Araçları", paragraphs: [], table: { headers: ["Araç", "Kullanım", "Özellik"], rows: [["Makine telgrafı", "Hız komutu", "Mekanik veya elektronik, kayıtlı"], ["Telefon (sesli)", "Sözlü iletişim", "Gürültülü ortamda zor olabilir"], ["İnterkom", "Sürekli hat", "UHF veya kablolu"], ["Bilgisayar/SCADA", "Veri paylaşımı", "Parametre izleme, alarm"], ["El düdüğü/horn", "Acil iletişim", "Geri yol, acil durma"]] } },
        { heading: "İletişim Protokolü", paragraphs: ["Kapalı döngü iletişim (closed-loop communication) uygulanır: komut verilir → alıcı tekrarlar → verici onaylar. Yanlış anlamaların önlenmesi için standart terminoloji kullanılır.", "Manevra sırasında sürekli iletişim hattı açık tutulur. Kritik komutlar Engine Log Book'a kayıt edilir."] }
      ],
      keyPoints: ["Makine telgrafı kaydı yasal delil niteliğindedir.", "Gürültülü ortamda kısa ve net cümleler kullanılmalıdır.", "İletişim arızası derhal yedek sisteme geçilmesini gerektirir."]
    },
    "Makine dairesi yangını": {
      title: "Makine Dairesi Yangını",
      introduction: "Makine dairesi yangını, gemideki en tehlikeli acil durumlardan biridir. Yakıt ve yağ sızıntıları, elektrik arızaları ve sıcak yüzeyler başlıca nedenlerdir.",
      sections: [
        { heading: "Müdahale Prosedürü", paragraphs: ["1. Yangın alarmını çal ve konumu bildir.", "2. İlk müdahale: Portatif söndürücü ile küçük yangını söndürmeye çalış.", "3. Hızlı kapatma vanalarını kapat (yakıt/yağ besleme kes).", "4. Havalandırma fanlarını durdur ve flap'leri kapat.", "5. Yangın kontrol altına alınamazsa: personeli tahliye et.", "6. Sabit söndürme sistemi (CO₂/FM200) devreye alma kararı kaptana aittir.", "7. Soğutma: Sınır bölgelere (boundary cooling) su sık."] },
        { heading: "Yangın Sonrası", paragraphs: ["Sabit söndürme sonrası en az 24 saat makine dairesi kapalı tutulur. Giriş öncesi atmosfer testi yapılır. Hasar tespit ve kök neden analizi gerçekleştirilir."] }
      ],
      keyPoints: ["Sıcak yüzeye yakıt/yağ sızıntısı en yaygın yangın nedenidir.", "Boru bağlantıları ve flanş sızıntıları düzenli kontrol edilmelidir.", "Yağlı paçavra açık alanda bırakılmamalıdır."]
    },
    "Ana makine arızası ile seyir": {
      title: "Ana Makine Arızası ile Seyir",
      introduction: "Ana motorun seyir sırasında arızalanması durumunda gemi güvenliğinin sağlanması için acil prosedürler uygulanır.",
      sections: [
        { heading: "Acil Müdahale", paragraphs: ["1. Köprüüstüne derhal bilgi ver: 'Ana makine devre dışı.'", "2. NUC (Not Under Command) seyir fenerlerini göster.", "3. GMDSS ile deniz trafiğine ve kıyı istasyonlarına bilgi ver.", "4. Demir atma hazırlığı yap (sığ su varsa).", "5. Arıza teşhisi: Acil onarım mümkün mü?"] },
        { heading: "Kısıtlı Güçle Seyir", paragraphs: ["Bazı arızalarda motor kısıtlı güçle (reduced power) çalıştırılabilir: silindir izolasyonu (bir veya birkaç silindir devre dışı), düşük devirde çalışma.", "Dizel-elektrik gemilerde ana tahrik motoru arızası durumunda yardımcı motorlarla elektrik tahrik sağlanabilir."] }
      ],
      keyPoints: ["Ana makine arızası SOLAS gereği bayrak devletine bildirilmelidir.", "Kurtarma (towing) gerekebilir; P&I kulübü bilgilendirilmelidir.", "Arıza sonrası detaylı rapor ve kök neden analizi zorunludur."]
    },
    "Deniz suyu sızıntısı": {
      title: "Deniz Suyu Sızıntısı",
      introduction: "Makine dairesine deniz suyu girişi, gemi stabilitesi ve batabilirliği açısından ciddi tehlike oluşturur.",
      sections: [
        { heading: "Sızıntı Kaynakları", paragraphs: [], bulletPoints: ["Deniz suyu valfleri ve boru bağlantıları", "Stern tube sızdırmazlık arızası", "Soğutma suyu sistemi boru korozyonu", "Deniz suyu sandığı (sea chest) tıkanma sonrası kapak arızası", "Gövde kaynağı/boru geçişi korozyonu"] },
        { heading: "Müdahale Prosedürü", paragraphs: ["1. Sızıntı kaynağını tespit et ve mümkünse izole et (vana kapat).", "2. Sintine pompalarını devreye al.", "3. Köprüüstüne bilgi ver: stabilite etkisi değerlendirilmeli.", "4. Geçici onarım: tahta takoz, çelik yama, epoksi macun, bandaj.", "5. Sızıntı kontrol altına alınamazsa: pompalama kapasitesi yetersizse acil durum ilan et."] }
      ],
      keyPoints: ["Sintine alarmları sürekli izlenmelidir.", "Acil sintine emişi (direct bilge suction) pompalama kapasitesini artırır.", "Sızıntı hızı sintine pompa kapasitesini aşarsa gemi tehlikededir."]
    },
    "Yüksek sıcaklık ve basınç alarmları": {
      title: "Yüksek Sıcaklık ve Basınç Alarmları",
      introduction: "Sıcaklık ve basınç alarm aşımları, mekanik arıza, yanma bozukluğu veya soğutma/yağlama yetersizliğinin göstergesidir.",
      sections: [
        { heading: "Yaygın Alarm Senaryoları", paragraphs: [], table: { headers: ["Alarm", "Olası Neden", "Acil Aksiyon"], rows: [["Egzoz sıcaklığı yüksek", "Enjektör arızası, aşırı yük", "Yük azalt, enjektör kontrol et"], ["Yağ sıcaklığı yüksek", "Soğutucu arızası, yağ seviyesi düşük", "Soğutucu kontrol et, yağ ekle"], ["Soğutma suyu sıcaklığı yüksek", "Pompa arızası, hava kilidi", "Pompa/vana kontrol et"], ["Scavenge sıcaklığı yüksek", "Intercooler tıkanması", "Intercooler temizle"], ["Krank kutusu basıncı yüksek", "Blow-by, sızdırmazlık kaybı", "Motor durdur, crankcase kontrol et"]] } },
        { heading: "Krank Kutusu Patlaması Riski", paragraphs: ["Krank kutusunda yağ buharı birikimi patlama riski oluşturur. Krank kutusu basınç relief valfi bu riski azaltır. Yüksek basınç alarmı motor durdurulmasını gerektirir."] }
      ],
      keyPoints: ["Krank kutusu basınç alarmı motor acil durdurma sebebidir.", "Yüksek egzoz sıcaklığı silindir bazında karşılaştırılarak analiz edilir.", "Alarm tekrarı trend takibi ile değerlendirilmelidir."]
    },
    "Acil jeneratör devreye alma": {
      title: "Acil Jeneratör Devreye Alma",
      introduction: "Ana elektrik güç kaybında acil jeneratör, hayati ekipmanların çalışmasını sağlayan son güvenlik hattıdır.",
      sections: [
        { heading: "Otomatik Devreye Girme", paragraphs: ["Ana bara gerilim kaybını algılayan röle, acil jeneratörün başlatma sinyalini verir. Motor 45 saniye içinde çalışır ve acil baraya yük alır.", "Başlatma yöntemi: Basınçlı hava veya akü (battery start). Bazı gemilerde her ikisi de bulunur."] },
        { heading: "Manuel Devreye Alma", paragraphs: ["1. Acil jeneratör odasına git.", "2. Motor çalıştırma şalterini/düğmesini kullan.", "3. Gerilim ve frekans kontrol et.", "4. Acil bara şalterini kapat.", "5. Kritik yüklerin beslendiğini doğrula."] },
        { heading: "Test Prosedürü", paragraphs: ["SOLAS gereği acil jeneratör haftalık olarak test çalıştırması yapılmalıdır. Otomatik başlatma, yük alma ve alarm fonksiyonları doğrulanmalıdır."] }
      ],
      keyPoints: ["Acil jeneratör yakıtı minimum 18 saat (yolcu gemileri 36 saat) yeterli olmalıdır.", "Acil jeneratör odası makine dairesi yangınından bağımsız erişilebilir olmalıdır.", "Akü şarj durumu düzenli kontrol edilmelidir."]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // ERM — Eksik alt başlıklar
  // ═══════════════════════════════════════════════════════════════
  erm: {
    "BRM'den ERM'ye geçiş": {
      title: "BRM'den ERM'ye Geçiş",
      introduction: "ERM (Engine Resource Management), köprüüstündeki BRM (Bridge Resource Management) kavramının makine dairesine uyarlanmış halidir.",
      sections: [
        { heading: "Tarihsel Gelişim", paragraphs: ["BRM, 1990'lardan itibaren havacılıktaki CRM (Crew Resource Management) modelinden esinlenerek denizcilik köprüüstü operasyonlarına adapte edilmiştir.", "ERM, STCW 2010 Manila Değişiklikleri ile makine zabitleri için zorunlu yetkinlik haline gelmiştir. Makine dairesi ortamının kendine özgü zorlukları (gürültü, sıcaklık, sınırlı personel) ERM'i BRM'den ayrıştırır."] },
        { heading: "ERM'in BRM'den Farkları", paragraphs: [], table: { headers: ["Faktör", "BRM", "ERM"], rows: [["Çalışma ortamı", "Sessiz, geniş görüş", "Gürültülü, sınırlı görüş"], ["Ekip büyüklüğü", "2-4 kişi", "1-3 kişi (UMS'de 0)"], ["İletişim", "Yüz yüze, net", "Gürültü engelli, uzaktan"], ["Karar süresi", "Saniyeler-dakikalar", "Dakikalar-saatler"], ["Otomasyon", "Radar, ECDIS", "AMS, PMS, PLC"]] } }
      ],
      keyPoints: ["ERM, BRM'in tüm prensiplerini makine dairesi koşullarına uyarlar.", "Makine dairesi gürültüsü iletişimi ciddi ölçüde kısıtlar.", "UMS operasyonu ERM zorluk seviyesini artırır."]
    },
    "İnsan faktörü ve hata yönetimi": {
      title: "İnsan Faktörü ve Hata Yönetimi",
      introduction: "Deniz kazalarının %80'inden fazlası insan faktörüne bağlıdır. İnsan hatalarının anlaşılması ve yönetilmesi ERM'in temelini oluşturur.",
      sections: [
        { heading: "Hata Türleri", paragraphs: [], table: { headers: ["Hata Türü", "Tanım", "Örnek"], rows: [["Slip (kayma)", "Doğru niyet, yanlış eylem", "Yanlış vanayı açma"], ["Lapse (unutma)", "Bir adımı atlama", "Kontrol listesinde madde atlama"], ["Mistake (hata)", "Yanlış karar", "Yanlış gravity disc seçimi"], ["Violation (ihlal)", "Bilinçli kural ihlali", "PTW almadan kapalı alana giriş"]] } },
        { heading: "Hata Yönetimi Stratejileri", paragraphs: [], bulletPoints: ["Hata tuzaklarını tanı: yorgunluk, zaman baskısı, aşinalık.", "Çapraz kontrol: İkinci kişi onayı.", "Kontrol listesi kullanımı.", "Prosedür uyumu ve standart operasyonel prosedürler (SOP).", "Açık hata kültürü: Hataları raporlama ve öğrenme."] }
      ],
      keyPoints: ["Hata yapma insan doğasında vardır; hedef hata zincirine müdahale etmektir.", "Reason'ın İsviçre peyniri modeli: Birden fazla savunma katmanı arızalanınca kaza oluşur.", "Just culture hataları cezalandırmadan, ihlalleri cezalandırmayı öngörür."]
    },
    "STCW ERM gereklilikleri": {
      title: "STCW ERM Gereklilikleri",
      introduction: "STCW Convention ve Code, makine zabitleri için ERM yetkinliklerini zorunlu kılar.",
      sections: [
        { heading: "Yetkinlik Gereklilikleri", paragraphs: ["STCW Table A-III/1 ve A-III/2 kapsamında makine zabitleri aşağıdaki ERM yetkinliklerini göstermelidir:", "Makine dairesi kaynaklarının yönetimi, görev dağılımı ve önceliklendirme, etkili iletişim, liderlik ve takım çalışması, durumsal farkındalık, karar verme ve problem çözme."] },
        { heading: "Değerlendirme", paragraphs: ["ERM yetkinliği, onaylı eğitim programları ve simülatör bazlı değerlendirme ile doğrulanır. Bazı bayrak devletleri ayrı ERM sertifikası gerektirir."] }
      ],
      keyPoints: ["2017'den itibaren tüm makine zabitlerinin ERM yetkinliği zorunludur.", "ERM eğitimi hem teorik hem pratik (simülatör) bileşen içerir.", "Yetkinlik yenileme (revalidation) her 5 yılda yapılır."]
    },
    "Liderlik tarzları ve durumsal liderlik": {
      title: "Liderlik Tarzları ve Durumsal Liderlik",
      introduction: "Makine dairesinde etkili liderlik, duruma ve ekip üyelerinin deneyim seviyesine göre uyarlanmalıdır.",
      sections: [
        { heading: "Liderlik Tarzları", paragraphs: [], table: { headers: ["Tarz", "Yaklaşım", "Ne Zaman"], rows: [["Otoriter (Directing)", "Net komut, sıkı kontrol", "Acil durum, deneyimsiz ekip"], ["Koçluk (Coaching)", "Yönlendirme + açıklama", "Öğrenme aşamasında"], ["Destekleyici (Supporting)", "Katılımcı, fikir alışverişi", "Deneyimli ama motivasyon gereken"], ["Delege edici (Delegating)", "Sorumluluk devri", "Yüksek deneyim ve motivasyon"]] } },
        { heading: "Durumsal Liderlik", paragraphs: ["Hersey-Blanchard modeline göre lider, ekip üyesinin olgunluk düzeyine göre tarzını değiştirir. Aynı lider farklı kişilere farklı tarzda yaklaşabilir.", "Acil durumlarda otoriter liderlik; rutin operasyonlarda destekleyici veya delege edici liderlik daha etkilidir."] }
      ],
      keyPoints: ["Tek bir liderlik tarzı her duruma uygun değildir.", "Acil durumlarda net ve kararlı liderlik hayat kurtarır.", "İyi lider ekip üyelerinin gelişimini destekler."]
    },
    "Etkili iletişim teknikleri": {
      title: "Etkili İletişim Teknikleri",
      introduction: "Makine dairesinde gürültü, stres ve kültürel farklılıklar iletişimi zorlaştırır. Yapılandırılmış iletişim teknikleri hata riskini azaltır.",
      sections: [
        { heading: "İletişim İlkeleri", paragraphs: [], bulletPoints: ["Kısa ve net mesajlar kullan.", "Teknik terminolojiyi doğru kullan.", "Kapalı döngü iletişim uygula: Mesaj → Tekrar → Onay.", "Görsel ve işitsel kanalları birlikte kullan (jest + söz).", "Dinleme becerisi: Anladığını teyit et."] },
        { heading: "Gürültülü Ortamda İletişim", paragraphs: ["Yüz yüze iletişimde gürültülü ortamdan uzaklaş veya kulaklıklı interkom kullan. El işaretleri standartlaştırılmalıdır.", "Kritik mesajlarda yazılı iletişim (not defteri, mesaj panosu) destekleyici olarak kullanılır."] }
      ],
      keyPoints: ["İletişim kopukluğu deniz kazalarının en sık rastlanan insan faktörüdür.", "Kapalı döngü iletişim yanlış anlamaları önler.", "Kültürel farklılıklar göz önünde bulundurulmalıdır."]
    },
    "Kapalı döngü iletişim (closed-loop)": {
      title: "Kapalı Döngü İletişim",
      introduction: "Kapalı döngü iletişim, verilen komutun doğru anlaşıldığının karşılıklı teyit ile garanti edildiği iletişim tekniğidir.",
      sections: [
        { heading: "Üç Adım", paragraphs: ["1. Gönderen mesajı verir: 'Yakıt transfer vanasını kapat.'", "2. Alıcı mesajı tekrarlar: 'Yakıt transfer vanasını kapatıyorum.'", "3. Gönderen onaylar: 'Doğru, kapat.'"] },
        { heading: "Uygulama Alanları", paragraphs: ["Manevra komutları, vana operasyonları, elektrik şalter operasyonları, acil durum prosedürleri. Kapalı döngü uygulanmayan iletişimde yanlış vana açma/kapama gibi hatalar yaşanabilir."] }
      ],
      keyPoints: ["Kritik operasyonlarda kapalı döngü iletişim zorunludur.", "Tekrar (read-back) yapılmayan komut onaylanmamış sayılır.", "STCW ERM değerlendirmesinde kapalı döngü iletişim gözlemlenir."]
    },
    "Kültürler arası iletişim": {
      title: "Kültürler Arası İletişim",
      introduction: "Gemilerde farklı kültürlerden mürettebat birlikte çalışır. Kültürel farklılıklar iletişim tarzını, otorite algısını ve çatışma çözümünü etkiler.",
      sections: [
        { heading: "Kültürel Farklılıklar", paragraphs: [], bulletPoints: ["Güç mesafesi (power distance): Yüksek güç mesafesi olan kültürlerde ast, üstünü sorgulamakta çekinir.", "Bireyci/toplulukçu: Bireyci kültürlerde doğrudan iletişim, toplulukçu kültürlerde dolaylı iletişim tercih edilir.", "Belirsizlikten kaçınma: Yüksek olan kültürlerde detaylı talimat ve prosedür beklentisi fazladır.", "Zaman algısı: Monokronik (dakik, plan odaklı) ve polikronik (esnek, ilişki odaklı) yaklaşımlar."] },
        { heading: "Çözüm Stratejileri", paragraphs: ["Ortak çalışma dili olarak İngilizce standart terminoloji kullanılır. Ast personelin soru sorması ve itiraz etmesi teşvik edilir (assertiveness). Kültürel farkındalık eğitimi ERM programının parçasıdır."] }
      ],
      keyPoints: ["Kültürel farklılıklar güvenlik açığına dönüşebilir.", "Ortak dil yeterliliği güvenli operasyonun ön koşuludur.", "Lider, ekip üyelerinin kültürel arka planını anlamalıdır."]
    },
    "Asertif davranış ve otorite gradyanı": {
      title: "Asertif Davranış ve Otorite Gradyanı",
      introduction: "Asertif davranış, kendi fikrini saygılı ancak kararlı bir şekilde ifade etme becerisidir. Otorite gradyanı, hiyerarşik seviyeler arasındaki güç farkını tanımlar.",
      sections: [
        { heading: "Otorite Gradyanı", paragraphs: ["Dik gradyan: Üst düzey kişi baskın, astlar soru soramaz. Tehlike: Üstün hatası düzeltilemez.", "Düz gradyan: Herkes eşit, otorite belirsiz. Tehlike: Karar verme zorlaşır.", "Optimum gradyan: Net liderlik var ancak ekip üyeleri rahatça geri bildirim verebilir."] },
        { heading: "Asertif İtiraz Tekniği", paragraphs: ["PACE modeli:", "P – Probe (sor): 'Bu basınç okumasını kontrol ettiniz mi?'", "A – Alert (uyar): 'Basınç çok yüksek görünüyor.'", "C – Challenge (meydan oku): 'Bu basınçla devam etmek güvenli değil.'", "E – Emergency (acil): 'Basıncı düşürmezseniz motoru durduracağım.'"] }
      ],
      keyPoints: ["Asertif davranış eğitimi ERM'in temel bileşenidir.", "Kaptana/baş mühendise itiraz etmek gerektiğinde PACE modeli kullanılır.", "Otorite gradyanı çok dik olduğunda güvenlik riski artar."]
    },
    "Risk tabanlı karar verme": {
      title: "Risk Tabanlı Karar Verme",
      introduction: "Risk tabanlı karar verme, olası sonuçların olasılık ve şiddetini değerlendirerek en güvenli seçeneği belirleme sürecidir.",
      sections: [
        { heading: "Karar Süreci", paragraphs: ["1. Durumu değerlendir: Ne oluyor? Ne olabilir?", "2. Seçenekleri belirle: Hangi aksiyonlar mümkün?", "3. Risk değerlendir: Her seçeneğin risk düzeyi nedir?", "4. Karar ver: En düşük riskli ve uygulanabilir seçeneği seç.", "5. Uygula ve izle: Sonuçları kontrol et, gerekirse revize et."] },
        { heading: "Risk Toleransı", paragraphs: ["Kabul edilemez risk: İnsan hayatı tehlikede → operasyonu durdur.", "ALARP: Risk makul seviyeye indirildi → devam et, izle.", "Kabul edilebilir risk: Kontrol önlemleri yeterli → normal operasyon."] }
      ],
      keyPoints: ["Zaman baskısı altında bile hızlı risk değerlendirmesi yapılmalıdır.", "Hiçbir ticari baskı insan güvenliğinin önüne geçmemelidir.", "Karar sonrası geri bildirim ve değerlendirme öğrenmeyi sağlar."]
    },
    "Zaman baskısı altında karar": {
      title: "Zaman Baskısı Altında Karar",
      introduction: "Acil operasyonlarda karar kalitesi, bireysel deneyimin ötesinde ekip koordinasyonu, standart iletişim ve önceden hazırlanmış senaryo disiplinine bağlıdır. Zaman baskısı altında yapılan hatalar çoğunlukla teknik bilgi eksikliğinden değil; öncelik karmaşası, bilişsel yük artışı ve teyitsiz komutlardan kaynaklanır.",
      sections: [
        {
          heading: "Olay Bağlamı",
          paragraphs: [
            "Dar boğaz yaklaşmasında makine dairesi, köprüüstünden gelen ardışık 'half ahead - slow ahead' komutlarını uygularken aynı anda jacket cooling suyu düşük basınç alarmı almıştır. Görevli zabit manevraya odaklandığı için alarmı gecikmeli değerlendirmiş, yardımcı pompa devreye alma 90 saniye gecikmiştir.",
            "Aynı zaman diliminde kontrol odasında yalnızca bir zabitin bulunması, alarm paneli takibi ile telegraph komutlarının çakışmasına yol açmış; ekipte ortak durum resmi oluşmadığı için müdahale sırası net belirlenememiştir."
          ]
        },
        {
          heading: "Hatanın Kök Nedeni",
          paragraphs: [
            "Önceliklendirme yapılmadan tek kişiye birden fazla kritik iş yüklenmesi, kısa karar kontrol listesi (time-critical checklist) kullanılmaması ve köprüüstü-makine komut teyidinin atlanması temel kök nedenlerdir.",
            "İkincil kök neden, vardiya öncesi 'yüksek riskli manevra brifingi' yapılmaması ve alarm/komut yoğunluğu için görev ayrımı (alarm officer - telegraph officer) planının tanımlanmamış olmasıdır.",
            "İnsan faktörü açısından bakıldığında, zaman baskısı altında dikkat daralması (tunnel vision) ve doğrulama yanlılığı (ilk varsayıma bağlı kalma) karar kalitesini düşürmüştür."
          ]
        },
        {
          heading: "Önleyici Aksiyon",
          paragraphs: [
            "30-60 saniyelik 'Stop-Think-Act-Review' mini prosedürü manevra esnasında zorunlu hale getirilmeli; alarm geldiğinde ekip önce 'gemi emniyeti - personel emniyeti - ekipman emniyeti' sırasına göre karar vermelidir.",
            "Manevra vardiyasında en az iki kişi aktif tutulmalı: biri telegraph/komut icrası, diğeri alarm ve yardımcı sistem sürekliliği takibi. Bu görev dağılımı vardiya öncesi yazılı kart ile teyit edilmelidir.",
            "Kritik komutlarda kapalı döngü iletişim (komut - tekrar - onay) zorunlu tutulmalı; CCR kayıtları haftalık ERM toplantısında örnek olay olarak gözden geçirilmelidir.",
            "Yüksek riskli liman yaklaşmalarında 'pre-arrival risk trigger list' kullanılmalı (ör. düşük basınç, PMS alarmı, yardımcı pompa unavailable). Trigger gerçekleştiğinde otomatik ilave personel çağrısı prosedürü devreye alınmalıdır."
          ],
          table: {
            headers: ["Zaman Penceresi", "Beklenen Davranış", "Kontrol Noktası"],
            rows: [["İlk 30 sn", "Durumu stabilize et, alarm sınıfını belirle", "Kritik/uyarı ayrımı"], ["30-90 sn", "Görev dağılımını netleştir, komut teyit et", "Read-back tamamlandı mı?"], ["90 sn+", "Düzeltici aksiyonu uygula, trend izle", "Alarm tekrarı var mı?"]]
          }
        },
        {
          heading: "Ders Çıkarımı ve Eğitim Entegrasyonu",
          paragraphs: [
            "Bu vaka, zaman baskısında doğru kararın bireysel hızdan değil ekip disiplininden çıktığını gösterir. Hızlı olmak ile acele etmek farklıdır; hızlı ekipler standart prosedürü atlamayan ekiplerdir.",
            "Benzer olayların tekrarlanmaması için simülatör tatbikatlarında aynı senaryo farklı iş yükü seviyeleriyle çalıştırılmalı; karar süreleri kadar karar doğruluğu da ölçülmelidir."
          ]
        }
      ],
      keyPoints: ["Zaman baskısı altında en büyük risk, öncelik karmaşasıdır.", "Görev ayrımı yapılmamış vardiya, en güçlü teknik ekibi bile kırılgan hale getirir.", "Kapalı döngü iletişim karar hızını değil, karar doğruluğunu artırır.", "Manevra öncesi risk tetikleyici listesi operasyonel dayanıklılığı yükseltir."]
    },
    "Hata zincirleri ve kırma noktaları": {
      title: "Hata Zincirleri ve Kırma Noktaları",
      introduction: "Deniz kazalarının büyük kısmı tekil bir kritik hatadan değil, düşük önemde görülen sapmaların ardışık birikiminden gelişir. ERM perspektifinde amaç, zincirin son halkasında kriz yönetmek değil; ilk halkada sapmayı görüp kırma noktasını işletmektir.",
      sections: [
        {
          heading: "Olay Bağlamı",
          paragraphs: [
            "Gece vardiyasında purifier diferansiyel basınç alarmı 'geçici' görülerek ertelenmiş, aynı vardiyada settling tank su drain kontrolü atlanmıştır. Ertesi gün yakıt viskozitesi hedef aralığın altına inmiş, enjektörlerde düzensiz püskürtme ve egzoz sıcaklık dağılımında dengesizlik görülmüştür.",
            "Takip eden 6 saat içinde ana makinede yük dalgalanması yaşanmış; köprüüstü istenen hızı korumakta zorlanmıştır. Olay teknik arıza gibi görünse de kökünde vardiya disiplini ve alarm yönetimi zaafı vardır."
          ]
        },
        {
          heading: "Hatanın Kök Nedeni",
          paragraphs: [
            "Alarmın erken aşamada 'nuisance alarm' etiketiyle normalize edilmesi, vardiya devir teslim notlarının ölçülebilir veri içermemesi (değer, trend, süre), ve bakım ertelemesinin risk puanına bağlanmaması ana nedenlerdir.",
            "Sistem seviyesinde kök neden, 'tek alarm - tek aksiyon' yaklaşımıdır. Oysa yakıt sistemi olayları çok parametrelidir; purifier DP, viskozite, sıcaklık, enjektör geri kaçak ve egzoz trendi birlikte izlenmelidir.",
            "Organizasyonel açıdan, ertelenen aksiyonların kapanış takibi yapılmadığı için açık riskler vardiyadan vardiyaya taşınmıştır."
          ]
        },
        {
          heading: "Önleyici Aksiyon",
          paragraphs: [
            "Kritik alarm ertelemesi için zabit onayı + yazılı gerekçe + yeniden değerlendirme zamanı zorunlu olmalıdır (ör. 15 dk / 30 dk). Süresi dolan alarm otomatik olarak yeniden kritik seviyeye dönmelidir.",
            "Her vardiya sonunda 'açık risk listesi' güncellenmeli ve devir teslimde üç veri mutlaka aktarılmalıdır: mevcut değer, son 4 saat trendi, beklenen bir sonraki aksiyon.",
            "Purifier alarmı, yakıt viskozitesi, sıcaklık ve enjektör performansı tek bir performans ekranında korele izlenmeli; eşik aşımı durumunda köprüüstüne 'hız etkisi olabilir' bilgilendirmesi yapılmalıdır.",
            "Aylık ERM incelemesinde en az bir 'zincir kırma' vakası seçilip, zincirin hangi halkasında hangi müdahalenin olayı önleyebileceği ekipçe analiz edilmelidir."
          ],
          table: {
            headers: ["Zincir Halkası", "Erken Belirti", "Kırma Noktası", "Sorumlu"],
            rows: [["Alarm normalizasyonu", "Tekrarlayan DP alarmı", "Alarmı ertelemeden önce risk puanla", "Nöbetçi zabit"], ["Vardiya devri", "Eksik not / belirsiz ifade", "Standart devir teslim şablonu", "Devreden ve devralan"], ["Bakım erteleme", "Açık iş emri birikimi", "Tarih-saatli kapanış planı", "2. mühendis"], ["Operasyon etkisi", "Yük dalgalanması", "Köprüüstüne erken bilgilendirme", "Baş mühendis"]]
          }
        },
        {
          heading: "Ders Çıkarımı",
          paragraphs: [
            "Kazayı önleyen unsur çoğu zaman büyük teknik müdahale değil, küçük bir disiplin hareketidir: doğru not, doğru teyit, doğru zamanda escalation.",
            "Hata zinciri yaklaşımı kurum kültürüne yerleştiğinde ekipler 'kim hata yaptı?' sorusundan 'hangi bariyer neden çalışmadı?' sorusuna geçer; bu da sürdürülebilir güvenlik sağlar."
          ]
        }
      ],
      keyPoints: ["Hata zincirleri görünmez değil, izlenmediği için görünmezdir.", "En etkili kırma noktası: standart devir teslim + ölçülebilir notlama.", "Alarm erteleme kontrolsüzse teknik risk hızla operasyonel riske dönüşür.", "Kök neden analizi kişi odaklı değil bariyer odaklı yapılmalıdır."]
    },
    "Stres ve yorgunluk etkisi": {
      title: "Stres ve Yorgunluk Etkisi",
      introduction: "Stres ve yorgunluk, denizci performansını ciddi ölçüde düşüren ve kaza riskini artıran insan faktörleridir.",
      sections: [
        { heading: "Yorgunluk", paragraphs: ["MLC 2006 ve STCW gereği minimum dinlenme süresi: 24 saatte 10 saat (ikiye bölünebilir, biri en az 6 saat), 7 günde 77 saat.", "Yorgunluk etkileri: yavaş reaksiyon, dikkat eksikliği, hatalı karar, mikro uyku. Alkol etkisine benzer: 17 saat uyanık kalma ≈ %0.05 kan alkol seviyesi."] },
        { heading: "Stres Yönetimi", paragraphs: [], bulletPoints: ["Fiziksel stres: Gürültü, sıcaklık, titreşim → KKD ve çevre kontrolü.", "Psikolojik stres: İş yükü, izolasyon, aile özlemi → sosyal destek, iletişim.", "Akut stres (acil durum): Adrenalin etkisi → eğitim ve tatbikat ile yönetim.", "Kronik stres: Uzun süreli → dinlenme, egzersiz, psikolojik destek."] }
      ],
      keyPoints: ["Yorgun personel nöbet tutmamalıdır.", "Vardiya planlaması sirkadiyen ritme uygun yapılmalıdır.", "Yorgunluk bir güvenlik riski olarak rapor edilmelidir."]
    },
    "Takım oluşturma ve rol dağılımı": {
      title: "Takım Oluşturma ve Rol Dağılımı",
      introduction: "Etkili takım çalışması, her üyenin rolünün net olması ve takımın ortak hedefe yönelmesini gerektirir.",
      sections: [
        { heading: "Takım Aşamaları (Tuckman)", paragraphs: ["Forming (oluşum): Tanışma, keşif. Grounding (çatışma): Rol çakışmaları. Norming (normalleşme): Uzlaşma, kurallar. Performing (performans): Verimli çalışma."] },
        { heading: "Makine Dairesi Rol Dağılımı", paragraphs: [], table: { headers: ["Rol", "Sorumluluk"], rows: [["Baş mühendis", "Genel sorumluluk, planlama, klas ilişkileri"], ["2. mühendis", "Ana motor bakımı, günlük operasyon"], ["3. mühendis", "Yardımcı motorlar, jeneratör, elektrik"], ["4. mühendis", "Purifier, kompresör, kazan, evaporatör"], ["Vardiya zabiti", "Nöbet, izleme, alarm müdahale"], ["Usta/Motorman", "Bakım işçiliği, operasyonel destek"]] } }
      ],
      keyPoints: ["Net rol tanımları sorumluluk karışıklığını önler.", "Yeni mürettebat için oryantasyon programı uygulanmalıdır.", "Küçük ekiplerde çoklu görev (multi-tasking) stres yaratabilir."]
    },
    "Brifing ve debrifing teknikleri": {
      title: "Brifing ve Debrifing Teknikleri",
      introduction: "Brifing (ön bilgilendirme) ve debrifing (sonrası değerlendirme), operasyonel güvenliği artıran yapılandırılmış iletişim araçlarıdır.",
      sections: [
        { heading: "Brifing", paragraphs: ["İş öncesi yapılan kısa toplantıdır. İçerik: yapılacak iş, tehlikeler, sorumluluklar, acil durum prosedürü, iletişim düzeni. STICC modeli: Situation (durum), Task (görev), Intent (niyet), Concerns (endişeler), Calibrate (kalibre et/sorular)."] },
        { heading: "Debrifing", paragraphs: ["İş sonrası yapılan değerlendirmedir. Ne iyi gitti? Ne kötü gitti? Ne öğrendik? Gelecek için ne değişmeli? Debrifing suçlama amaçlı değil öğrenme amaçlıdır. Tüm ekip üyelerinin katılımı teşvik edilir."] }
      ],
      keyPoints: ["Brifing 5-10 dakikada tamamlanmalıdır.", "Debrifing bulguları güvenlik yönetim sistemine geri bildirilmelidir.", "Etkili brifing kaza oranını önemli ölçüde azaltır."]
    },
    "Yük paylaşımı (workload management)": {
      title: "Yük Paylaşımı (Workload Management)",
      introduction: "İş yükü yönetimi, mevcut görevlerin ekip kapasitesine göre dağıtılmasını ve aşırı yüklenmenin önlenmesini sağlar.",
      sections: [
        { heading: "İş Yükü Seviyeleri", paragraphs: [], table: { headers: ["Seviye", "Durum", "Risk"], rows: [["Düşük", "Monotonluk, sıkılma", "Dikkat kaybı, complacency"], ["Optimum", "Verimli çalışma", "Düşük risk"], ["Yüksek", "Yoğun çalışma", "Hata artışı, stres"], ["Aşırı", "Kapasiteyi aşma", "Kritik hata, kaza"]] } },
        { heading: "Yönetim Stratejileri", paragraphs: [], bulletPoints: ["Önceliklendirme: Güvenlik kritik görevler önce.", "Delegasyon: Uygun görevleri yetkin personele devret.", "Erteleme: Acil olmayan görevleri planla.", "Destek talebi: Yardım istemek zayıflık değil profesyonelliktir.", "Otomasyon kullanımı: Rutin görevleri otomasyona bırak."] }
      ],
      keyPoints: ["Hem düşük hem aşırı iş yükü güvenlik riskidir.", "Manevra ve acil durumlarda iş yükü zirve yapar.", "İş yükü dağılımı brifingde planlanmalıdır."]
    },
    "Çapraz kontrol ve karşılıklı izleme": {
      title: "Çapraz Kontrol ve Karşılıklı İzleme",
      introduction: "Çapraz kontrol, ekip üyelerinin birbirlerinin eylemlerini izleyerek hataları yakalamasını sağlayan güvenlik mekanizmasıdır.",
      sections: [
        { heading: "Uygulama", paragraphs: ["Bir kişi vana operasyonu yaparken diğeri doğru vanayı açtığını kontrol eder. Elektrik şalter operasyonunda bir kişi okuyor, diğeri çalıştırıyor. Bakım işlerinde torklama ve ölçüm değerleri ikinci kişi tarafından doğrulanır.", "Karşılıklı izleme, birbirini suçlama değil birbirini koruma kültürüdür."] },
        { heading: "Havacılıktan Öğrenilen Dersler", paragraphs: ["Havacılıkta 'sterile cockpit' kuralı kritik operasyonlarda gereksiz konuşmayı yasaklar. Benzer şekilde manevra sırasında makine dairesinde odaklanma korunmalıdır."] }
      ],
      keyPoints: ["İki kişi kontrolü (two-person rule) kritik operasyonlarda uygulanmalıdır.", "Çapraz kontrol güven ortamı gerektirir.", "Hata yakalama oranı çapraz kontrol ile önemli ölçüde artar."]
    },
    "Geri bildirim kültürü": {
      title: "Geri Bildirim Kültürü",
      introduction: "Yapıcı geri bildirim, bireysel ve takım performansının sürekli geliştirilmesi için vazgeçilmez bir iletişim aracıdır.",
      sections: [
        { heading: "Etkili Geri Bildirim", paragraphs: [], bulletPoints: ["Spesifik ol: 'Genel olarak kötü' yerine 'Enjektör testinde basınç okumasını atladın.'", "Zamanında ol: Olay anına yakın ver.", "Davranışa odaklan, kişiliğe değil.", "Olumlu + geliştirici: Sandwich tekniği (iyi → geliştir → iyi).", "Çözüm öner: Problem göstermekle kalma.", "Özel ortamda: Eleştiri özel, övgü herkesin önünde."] },
        { heading: "Geri Bildirim Alma", paragraphs: ["Savunmaya geçme, dinle ve anla. Açıklama iste. Teşekkür et. Geliştirme planı oluştur."] }
      ],
      keyPoints: ["Geri bildirim vermeyen lider, gelişimi engeller.", "Kültürel farklılıklar geri bildirim tarzını etkiler.", "Düzenli geri bildirim güvenlik kültürünün olgunlaşmasını sağlar."]
    },
    "Makine dairesi yangın kaza örnekleri": {
      title: "Makine Dairesi Yangın Kaza Örnekleri",
      introduction: "Gerçek kaza analizleri, benzer olayların tekrarını önlemek için en etkili öğrenme aracıdır.",
      sections: [
        { heading: "Vaka 1: Yakıt Boru Sızıntısı Yangını", paragraphs: ["Konteyner gemisinde yüksek basınçlı yakıt borusundan sızan yakıt, turboşarj gövdesine (500°C) temas ederek tutuşmuştur. Yangın hızla yayılmış, CO₂ sistemi devreye alınmıştır.", "Kök neden: Yakıt boru bağlantı noktasının sıkılma torkunda eksiklik ve periyodik kontrol eksikliği.", "Alınan ders: Yakıt boru bağlantıları periyodik sıkılık kontrolü, sıcak yüzeylerin yalıtımı, sızıntı algılama."] },
        { heading: "Vaka 2: Scavenge Fire", paragraphs: ["Süpürme bölgesinde biriken yağlama yağı ve karbon artıkları, sıcaklık artışıyla tutuşmuştur. Scavenge drain ve manifold bölgelerinde yangın oluşmuştur.", "Kök neden: Silindir yağlama dozajının ayarsız olması ve scavenge drain temizliğinin ihmal edilmesi.", "Alınan ders: Scavenge drain düzenli temizlenmeli, silindir yağ dozajı optimize edilmeli, egzoz sıcaklık trendi izlenmelidir."] }
      ],
      keyPoints: ["Gerçek kaza örnekleri güvenlik bilincini artırır.", "Her kazanın kök neden analizi yapılmalı ve dersler paylaşılmalıdır.", "Sıcak yüzey + yakıt sızıntısı kombinasyonu en sık yangın senaryosudur."]
    },
    "Blackout senaryoları ve kök nedenler": {
      title: "Blackout Senaryoları ve Kök Nedenler",
      introduction: "Blackout olayları, geminin tamamen elektriksiz kalmasına neden olan ve seyir güvenliğini ciddi şekilde tehlikeye atan durumlardır.",
      sections: [
        { heading: "Yaygın Kök Nedenler", paragraphs: [], table: { headers: ["Senaryo", "Kök Neden", "Önlem"], rows: [["Aşırı yük", "Büyük motorun ani yol alması", "PMS yük sıralaması"], ["Yakıt kesintisi", "Yakıt filtre tıkanması, hava girişi", "Filtre bakımı, tank tahliyesi"], ["Governor arızası", "Hız kontrolü kaybı, overspeed", "Periyodik governor testi"], ["Soğutma arızası", "HT sıcaklık aşımı → shutdown", "Soğutma sistemi bakımı"], ["Kısa devre", "Kablo hasarı, nem", "İnsülasyon izleme"]] } },
        { heading: "Blackout Kurtarma", paragraphs: ["Prosedür: Acil jeneratör → neden tespiti → bir jeneratörü başlat → kritik yükleri sırayla al → ana makineyi başlat.", "Blackout tatbikatı SOLAS gereği düzenli olarak yapılmalıdır."] }
      ],
      keyPoints: ["Preferential trip sistemi büyük yükleri keserek blackout'u önler.", "Blackout kurtarma süresi minimum tutulmalıdır.", "Her blackout olayı detaylı rapor ve analiz gerektirir."]
    },
    "Kapalı alan kazaları": {
      title: "Kapalı Alan Kazaları",
      introduction: "Kapalı alan girişleri; oksijen düşüklüğü, toksik gaz ve patlayıcı atmosfer riski nedeniyle denizcilikte en ölümcül operasyonlardan biridir. Bu tür kazalarda ilk hata genellikle görünmezdir: eksik hazırlık, eksik ölçüm veya yanlış güven varsayımı.",
      sections: [
        {
          heading: "Olay Bağlamı",
          paragraphs: [
            "Bilge tankında seviye şamandırası kontrolü için yapılan girişte atmosfer ölçümü yalnızca kapak ağzında yapılmış, tankın alt ve orta seviyeleri test edilmemiştir. İlk personel içeri girdikten birkaç dakika sonra baş dönmesi ve koordinasyon kaybı yaşamıştır.",
            "Kurtarma refleksiyle ikinci personel, tam ekipman ve emniyet hattı olmadan tanka girmiş; olay kısa sürede çift yaralanmalı near-miss'e dönüşmüştür."
          ]
        },
        {
          heading: "Hatanın Kök Nedeni",
          paragraphs: [
            "Permit to Work sürecinin prosedürel bir formaliteye dönüşmesi, çok noktalı atmosfer testinin yapılmaması ve standby personelin rolünün yalnızca 'beklemek' şeklinde yanlış anlaşılması temel kök nedenlerdir.",
            "Ayrıca 'işi hızlı bitirme' baskısı nedeniyle havalandırma süresi kısaltılmış, giriş öncesi toolbox talk yeterli derinlikte yapılmamıştır.",
            "İkincil kök neden, kurtarma planının ekipçe prova edilmemiş olmasıdır; bu nedenle olay anında izinsiz kurtarma davranışı ortaya çıkmıştır."
          ]
        },
        {
          heading: "Önleyici Aksiyon",
          paragraphs: [
            "Kapalı alan girişinde O₂, H₂S, CO ve LEL ölçümü üst-orta-alt seviyede yapılmalı; sonuçlar permit formuna saat/dakika ile kaydedilmelidir. Ölçüm tek seferlik değil, giriş boyunca periyodik devam etmelidir.",
            "Mekanik havalandırma yeterli süre çalıştırılmalı; havalandırma kesildiğinde giriş otomatik olarak askıya alınmalıdır. Giriş yapan personelde kişisel çoklu gaz detektörü sürekli aktif olmalıdır.",
            "Giriş gözcüsü, iletişim hattı ve kurtarma ekipmanı (SCBA, tripod, retrieval line) hazır olmadan giriş başlatılmamalıdır. Kurtarma yalnızca eğitimli ekip tarafından yapılmalı; izinsiz ikinci giriş kesinlikle yasaktır.",
            "SOLAS III/19.3.3 gereği en az iki ayda bir gerçekçi kapalı alan giriş ve kurtarma tatbikatı yapılarak ölçüm, iletişim ve tahliye süreleri raporlanmalıdır."
          ],
          bulletPoints: ["O₂ kabul aralığı: yaklaşık %20.9 (prosedür limitleri esas alınır)", "LEL > limit ise giriş yok", "Standby personel aktif güvenlik bariyeridir, pasif gözlemci değildir", "Permit imzası, saha doğrulaması olmadan geçerli sayılmamalıdır"]
        },
        {
          heading: "Ders Çıkarımı",
          paragraphs: [
            "Kapalı alan olaylarında ikinci kayıp çoğu zaman 'yardım etme refleksi' ile oluşur. Doğru refleks, plansız giriş değil alarm, izolasyon ve eğitimli kurtarma ekibini devreye almaktır.",
            "En güçlü önlem ekipman değil, prosedürü uygulayan ekip davranışıdır. Form doldurmak değil, formun gereğini sahada yaşatmak emniyeti sağlar."
          ]
        }
      ],
      keyPoints: ["Kapalı alan emniyeti üçlü bariyere dayanır: ölçüm, havalandırma, gözcü.", "İzinsiz kurtarma girişi en kritik ikincil ölüm nedenidir.", "Permit to Work, saha doğrulaması olmadan bir kağıttan ibarettir.", "Tatbikat performansı raporlanmayan ekiplerde prosedür sürdürülebilirliği düşer."]
    },
    "İletişim kopukluğuna bağlı olaylar": {
      title: "İletişim Kopukluğuna Bağlı Olaylar",
      introduction: "Makine-köprüüstü iletişimindeki belirsizlikler, teknik arıza olmadan da emniyet olayına neden olabilir. Özellikle manevra, liman operasyonu ve acil durumlarda yanlış anlaşılan tek bir komut dahi ciddi operasyonel sonuçlar doğurur.",
      sections: [
        {
          heading: "Olay Bağlamı",
          paragraphs: [
            "Liman ayrılışında köprüüstü 'stand by engine' komutunu vermiş, makine dairesi bunu 'dead slow ahead'a geçiş hazırlığı olarak yorumlamıştır. Komut tekrar edilmediği için şaft devri beklenenden önce yükselmiş ve palamar operasyonunda risk oluşmuştur.",
            "Olayda ekipman arızası yoktur; hata tamamen komutun anlamı, zamanlaması ve teyidi konusundaki iletişim kopukluğundan kaynaklanmıştır."
          ]
        },
        {
          heading: "Hatanın Kök Nedeni",
          paragraphs: [
            "Standart denizcilik terminolojisi yerine yerel/alışkanlık ifadelerinin kullanılması, read-back/onay döngüsünün atlanması ve manevra öncesi ortak komut sözlüğünün netleştirilmemesi ana kök nedendir.",
            "İkincil olarak, yoğun operasyon anında iletişim kanalına gereksiz trafik girmesi (non-essential talk) kritik komutların anlaşılmasını zorlaştırmıştır."
          ]
        },
        {
          heading: "Önleyici Aksiyon",
          paragraphs: [
            "Manevra evresinde yalnızca standard marine communication phrases kullanılmalı; her komut 'komut - tekrar - onay' döngüsü tamamlanmadan uygulanmamalıdır.",
            "Manevra öncesi 5 dakikalık ortak brifingte kritik komut seti, beklenen sıra ve olası geri alma komutları netleştirilmelidir.",
            "Devir teslimlerde 'kritik beklenen komutlar' listesi zorunlu tutulmalı; köprüüstü-makine ses hattı test çağrısı manevra öncesi checklist maddesi olmalıdır.",
            "İletişim kalitesi aylık olarak near-miss kayıtlarından ölçülmeli; tekrar edilen belirsiz komut kalıpları için hedefli eğitim verilmelidir."
          ],
          table: {
            headers: ["Riskli İfade", "Standart İfade", "Beklenen Teyit"],
            rows: [["Hazır ol", "Stand by engine", "Stand by engine, confirmed"], ["Biraz ver", "Dead slow ahead", "Dead slow ahead, confirmed"], ["Geri al", "Stop engine / Astern command", "Stop/astern, confirmed"]]
          }
        },
        {
          heading: "Ders Çıkarımı",
          paragraphs: [
            "İletişim kopukluğu çoğu zaman rapora 'yanlış anlama' olarak girer; ancak kök neden daima sistemiktir: dil standardı, teyit disiplini ve brifing kalitesi.",
            "İyi iletişim kültürü yalnızca kaza önlemez; operasyon verimini de artırır çünkü ekipler aynı anda aynı durumu görür ve daha az düzeltme manevrası gerekir."
          ]
        }
      ],
      keyPoints: ["Belirsiz komut, gecikmiş veya yanlış aksiyon demektir.", "Kapalı döngü iletişim bir prosedür değil, emniyet bariyeridir.", "Ortak terminoloji çok uluslu ekiplerde kaza frekansını düşürür.", "Manevra öncesi kısa brifing, operasyon sırasında dakika kazandırır."]
    },
    "Derslerin operasyona yansıtılması": {
      title: "Derslerin Operasyona Yansıtılması",
      introduction: "Kaza ve olaylardan çıkarılan dersler, ancak operasyonel prosedürlere ve eğitime yansıtıldığında gerçek değer taşır.",
      sections: [
        { heading: "Ders Çıkarma Süreci", paragraphs: ["1. Olay analizi ve kök neden tespiti.", "2. Düzeltici aksiyonlar belirleme (CAPA).", "3. Prosedür güncelleme (SMS revizyon).", "4. Eğitim ve bilinçlendirme (güvenlik bülteni, toolbox meeting).", "5. Filoya yayma: Benzer gemilerde aynı riskin önlenmesi.", "6. Takip ve doğrulama: Aksiyonların uygulandığını denetle."] },
        { heading: "Güvenlik Bülteni", paragraphs: ["Şirket DPA'sı, meydana gelen olaylardan çıkarılan dersleri tüm filodaki gemilere güvenlik bülteni olarak dağıtır. IMO de MSC/Circ. serisi ile sektörel ders paylaşımı yapar."] }
      ],
      keyPoints: ["Ders çıkarmak sistemik iyileşmenin temelidir.", "Aynı hatanın tekrarlanması yönetim sistemi eksikliğini gösterir.", "Near-miss'lerden çıkarılan dersler en değerli olanlardır."]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // ENERJİ VERİMLİLİĞİ — Eksik alt başlıklar
  // ═══════════════════════════════════════════════════════════════
  "energy-efficiency": {
    "EEDI (Enerji Verimliliği Tasarım İndeksi)": {
      title: "EEDI (Enerji Verimliliği Tasarım İndeksi)",
      introduction: "EEDI, yeni gemiler için tasarım aşamasında birim taşıma işi başına CO₂ emisyonunu sınırlandıran temel IMO göstergesidir. Bu indeks, geminin sadece kâğıt üzerindeki teknik verimini değil; ilerideki operasyonel yakıt ekonomisinin sınırlarını da belirler.",
      sections: [
        {
          heading: "Hesap Mantığı",
          paragraphs: [
            "EEDI, ana ve yardımcı makine kaynaklı CO₂ emisyon katkılarının geminin referans taşıma işi (kapasite × referans hız) ile oranlanması prensibine dayanır. Motor SFOC, yakıt tipi karbon faktörü, shaft jeneratör/yardımcı yük dengesi ve verimlilik teknolojileri sonuca birlikte etki eder.",
            "Temel uygunluk yaklaşımı: Attained EEDI ≤ Required EEDI. Required EEDI değeri gemi tipine ve IMO faz indirgeme katsayısına göre belirlenir; aynı sınıfta iki geminin tasarım farkı bu eşitsizlikte doğrudan görünür."
          ],
          formula: {
            expression: "Attained EEDI = (Toplam CO₂ emisyon terimleri) / (Capacity × Vref)",
            variables: ["Capacity: DWT/GT (gemi tipine göre)", "Vref: referans hız", "CO₂ emisyon terimleri: ana/yardımcı makine ve düzeltme katsayıları"]
          }
        },
        {
          heading: "Pratik Operasyon Bağı",
          paragraphs: [
            "EEDI doğrudan günlük bir operasyon KPI'ı değildir; ancak gövde formu, pervane seçimi, WHRS, air lubrication veya enerji tasarruf cihazı gibi tasarım kararları günlük bunker tüketiminin tabanını belirler.",
            "Operasyonda yüksek sea margin (hedef hız için artan güç ihtiyacı), tasarım varsayımlarından sapmayı gösterir. Bu sapma çoğu zaman fouling, pervane hasarı, yanlış trim veya makine verim kaybı kaynaklıdır ve EEDI'nin pratik etkisini görünür hale getirir.",
            "Sea trial hız-güç eğrisi, gemi yaşam döngüsü boyunca performans benchmark'ı olarak korunmalıdır. Bu referans olmadan CII kötüleşmesinin nedeni doğru ayrıştırılamaz (tasarım mı, operasyon mu, bakım mı)."
          ]
        },
        {
          heading: "Operasyon Ekibine Uygulanabilir Kontrol Listesi",
          paragraphs: [
            "Baş mühendis ve kaptan, en az aylık periyotta hız-güç performansını sea trial baseline ile kıyaslamalı; sapma eşiklerini SMS içine tanımlamalıdır.",
            "Yeni retrofit kararlarında (pre-swirl, propeller boss cap fin vb.) yalnızca yatırım geri dönüşü değil, EEDI/EEXI/CII birlikte değerlendirilmelidir."
          ]
        }
      ],
      keyPoints: ["EEDI tasarım aşamasında belirlenir, etkisi operasyon boyunca sürer.", "Sea trial baseline performans yönetiminin temel veri setidir.", "Tasarım verimliliği kötü bakım ile hızla kaybedilebilir.", "EEDI başarısı, EEXI/CII performansına zemin hazırlar."]
    },
    "EEXI (Mevcut Gemi Enerji Verimliliği İndeksi)": {
      title: "EEXI (Mevcut Gemi Enerji Verimliliği İndeksi)",
      introduction: "EEXI, mevcut gemilerin teknik enerji verimliliğini doğrulayan IMO uyum mekanizmasıdır. Uygulamada çoğu gemi için EEXI uyumu, yalnızca hesap sonucu değil; güç sınırlaması, sefer planı ve bakım stratejisinin birlikte yönetilmesini gerektirir.",
      sections: [
        {
          heading: "Hesap ve Uygunluk",
          paragraphs: [
            "EEXI hesabında geminin MCR değeri, olası EPL/ShaPoLi ayarları, motor SFOC parametreleri ve referans taşıma kapasitesi kullanılır. Uygunluk çoğu zaman güç sınırlaması ile elde edilir.",
            "Attained EEXI ≤ Required EEXI kriteri sağlansa da operasyonel risk analizi yapılmazsa kağıt üzerindeki uyum sahada kırılgan olabilir. Özellikle ağır hava, akıntı ve emniyet manevralarında güç rezervi planlaması kritik hale gelir.",
            "Doğrulama süreci IAPP/IEEC sertifikasyonuna bağlıdır; ancak sürdürülebilir uygunluk için işletme prosedürlerinin (override şartları, kayıt disiplini) net tanımlanması gerekir."
          ],
          formula: {
            expression: "Attained EEXI ≤ Required EEXI",
            variables: ["Attained EEXI: geminin mevcut teknik konfigürasyonuyla hesaplanan değer", "Required EEXI: IMO referans eğrisi ve indirgeme faktörüyle belirlenen sınır"]
          }
        },
        {
          heading: "Pratik Operasyon Bağı",
          paragraphs: [
            "EPL uygulanan bir gemide hız/ETA planlaması eski güç varsayımlarıyla yapılamaz. Kaptan ve baş mühendis ağır hava pencerelerinde güvenli hızın altına düşme riskini rota planı aşamasında modellemelidir.",
            "Makine tarafında turboşarj verimi, enjektör dengesi, hava soğutucu temizliği ve gövde-pervane kondisyonu sınırlı güçte daha kritik hale gelir; küçük verim kaybı bile program sapmasına dönüşebilir.",
            "Acil durum override yetkisi, kriterleri ve kayıt yöntemi önceden tanımlanmalıdır. Aksi halde emniyet için gerekli güç artırımı sonrası uyum tartışması doğabilir."
          ],
          table: {
            headers: ["Operasyon Alanı", "EEXI Sonrası Risk", "Yönetim Yaklaşımı"],
            rows: [["Sefer planı", "ETA sapması", "Hava/akıntı düzeltmeli hız planı"], ["Makine performansı", "Sınırlı güçte hız kaybı", "Önleyici bakım ve trend takibi"], ["Acil durum", "Override belirsizliği", "Yetki matrisi + kayıt disiplini"]]
          }
        },
        {
          heading: "Ders Çıkarımı",
          paragraphs: [
            "EEXI uyumu tek başına teknik bir onay değildir; aynı zamanda 'daha düşük güçte güvenli operasyon' kültürünün kurulmasıdır.",
            "EPL ile uyumlu gemilerde operasyon başarısı, teknik bakım kalitesi ve köprüüstü planlama disiplininin toplamıdır."
          ]
        }
      ],
      keyPoints: ["EEXI kağıt üzerinde değil sahada da yönetilmelidir.", "EPL, sefer planı ve bakım stratejisini doğrudan değiştirir.", "Override prosedürü net değilse emniyet-uyum çatışması doğar.", "Sınırlı güçte operasyon için trend bazlı bakım şarttır."]
    },
    "CII (Karbon Yoğunluğu Göstergesi)": {
      title: "CII (Karbon Yoğunluğu Göstergesi)",
      introduction: "CII, geminin yıllık operasyon verisiyle hesaplanan ve köprüüstü ile makine dairesinin ortak performansını yansıtan dinamik bir göstergedir. EEDI/EEXI'den farklı olarak CII, 'tasarım' değil 'gerçek işletme davranışı' ölçer.",
      sections: [
        {
          heading: "İzleme Mantığı",
          paragraphs: [
            "CII hesaplaması yıllık toplam CO₂ emisyonunun taşıma işine oranlanmasına dayanır. Bu nedenle yalnızca yakıt tüketimi değil; sefer profili, taşınan yük, ballast oranı, bekleme süreleri ve rota kalitesi de sonucu etkiler.",
            "Pratikte en sağlıklı yaklaşım aylık projected CII takibidir. Yıl sonunu beklemek yerine her ay 'gerçekleşen - hedef - yıl sonu projeksiyonu' üçlüsü izlenmeli ve sapma büyümeden aksiyon alınmalıdır.",
            "Noon report, flowmeter, bunker delivery note ve liman operasyon verileri uyumsuzsa CII yönetimi yanıltıcı olur. Bu nedenle veri kalitesi ayrı bir performans metriği olarak takip edilmelidir."
          ],
          formula: {
            expression: "Operational CII = Annual CO₂ / (Capacity × Distance)",
            variables: ["Annual CO₂: yakıt tüketimi × emisyon faktörü", "Capacity: DWT/GT", "Distance: yıllık toplam kat edilen mesafe"]
          }
        },
        {
          heading: "Pratik Operasyon Bağı",
          paragraphs: [
            "CII iyileştirmesi için hız optimizasyonu, trim yönetimi, weather routing, liman bekleme azaltımı, gövde-pervane temizliği ve yardımcı makine yük optimizasyonu birlikte değerlendirilmelidir. Tek başına 'hızı düşür' yaklaşımı ticari ve emniyet etkileri nedeniyle sürdürülebilir olmayabilir.",
            "Sefer bazlı karar seti oluşturulmalıdır: ETA esnekliği varsa ekonomik hız, hava sertleşiyorsa rota revizyonu, liman sıkışıklığında just-in-time arrival, ballast seyirde trim ve yardımcı yük optimizasyonu.",
            "Makine dairesi yakıt kayıtları ile köprüüstü seyir verileri arasında günlük mutabakat yapılmalı; uyumsuzluklar DCS/MRV raporuna yansımadan düzeltilmelidir. Bu disiplin, CII derecesinin güvenilirliğini artırır."
          ],
          table: {
            headers: ["Operasyon Parametresi", "CII Etkisi", "Önerilen Takip"],
            rows: [["Hız profili", "Yüksek", "Haftalık hız-güç analizi"], ["Bekleme süresi", "Yüksek", "JIT arrival planı"], ["Gövde/pervane kondisyonu", "Orta-Yüksek", "Temizlik periyodu + performans trendi"], ["Veri kalitesi", "Yüksek", "Noon report - bunker - flowmeter mutabakatı"]]
          }
        },
        {
          heading: "Ders Çıkarımı",
          paragraphs: [
            "CII yönetimi, tek departman işi değildir; köprüüstü, makine, operasyon planlama ve şirket ofisinin ortak kontrol döngüsüdür.",
            "Aylık projeksiyon, yıl sonu sürprizlerini önleyen en güçlü araçtır. Geciken aksiyonlar aynı yıl içinde telafi edilemeyebilir."
          ]
        }
      ],
      keyPoints: ["CII, gerçek işletme kalitesinin sayısal çıktısıdır.", "Projected CII aylık takip edilmeden etkin yönetim mümkün değildir.", "Veri kalitesi zayıfsa doğru CII kararı alınamaz.", "Köprüüstü-makine-ofis koordinasyonu CII performansının anahtarıdır."]
    },
    "CII derecelendirme sistemi (A–E)": {
      title: "CII Derecelendirme Sistemi (A–E)",
      introduction: "CII (Carbon Intensity Indicator), geminin taşıma kapasitesi başına karbon emisyonunu yıllık olarak değerlendiren ve A'dan E'ye derecelendiren IMO göstergesidir.",
      sections: [
        { heading: "Derecelendirme", paragraphs: [], table: { headers: ["Derece", "Anlam", "Sonuç"], rows: [["A", "Çok iyi", "Teşvik"], ["B", "İyi", "Kabul edilebilir"], ["C", "Orta", "Minimum kabul"], ["D", "Kötü (1 yıl)", "Düzeltici aksiyon planı"], ["E", "Çok kötü", "Acil düzeltici aksiyon"]] } },
        { heading: "Hesaplama", paragraphs: ["CII = (Yıllık toplam CO₂ emisyonu) / (Kapasite × Toplam kat edilen mesafe)"], formula: { expression: "CII = CO₂ (gram) / (DWT × Distance (nm))", variables: ["CO₂: Yıllık yakıt tüketiminden hesaplanan emisyon", "DWT: Geminin taşıma kapasitesi", "Distance: Yıllık toplam seyir mesafesi"] } }
      ],
      keyPoints: ["CII referans değerleri yıldan yıla sıkılaştırılmaktadır.", "3 yıl üst üste D veya E alan gemiler SEEMP düzeltme planı sunmalıdır.", "Operasyonel önlemler (hız, trim, rota) CII'yı doğrudan etkiler."]
    },
    "Hız optimizasyonu (slow steaming)": {
      title: "Hız Optimizasyonu (Slow Steaming)",
      introduction: "Slow steaming, geminin tasarım hızının altında seyir ederek yakıt tüketimini ve emisyonları önemli ölçüde azaltma stratejisidir.",
      sections: [
        { heading: "Fiziksel Temel", paragraphs: ["Yakıt tüketimi gemi hızının yaklaşık küpü ile orantılıdır (P ∝ V³). Bu ilişki nedeniyle hızın %10 düşürülmesi yakıt tüketimini yaklaşık %27 azaltır."], formula: { expression: "P₂/P₁ ≈ (V₂/V₁)³", variables: ["P: Güç (kW)", "V: Hız (knot)"] }, example: { problem: "15 knot'ta 12000 kW güç gerektiren bir geminin 12 knot'ta ihtiyaç duyacağı gücü hesaplayınız.", steps: ["P₂ = P₁ × (V₂/V₁)³", "P₂ = 12000 × (12/15)³", "P₂ = 12000 × 0.512 = 6144 kW"], result: "12 knot'ta gerekli güç 6144 kW'tır (%49 azalma)." } },
        { heading: "Uygulama Zorlukları", paragraphs: [], bulletPoints: ["Motor düşük yükte çalışır; silindir yağlama ve yanma kalitesi optimize edilmelidir.", "Turboşarj veriminin düşmesi; yardımcı üfleyici gerekebilir.", "Sefer süresi uzar; liman planlaması etkilenir.", "Düşük hızda dümen etkinliği azalabilir."] }
      ],
      keyPoints: ["Slow steaming en maliyet-etkin emisyon azaltma yöntemidir.", "Ultra slow steaming (%25-40 yük) özel motor modifikasyonu gerektirebilir.", "CII iyileştirmesi için hız optimizasyonu en etkili araçtır."]
    },
    "Rota optimizasyonu (weather routing)": {
      title: "Rota Optimizasyonu (Weather Routing)",
      introduction: "Weather routing, meteorolojik ve oşinografik verileri kullanarak en güvenli ve yakıt-verimli rotayı belirleme sürecidir.",
      sections: [
        { heading: "Optimizasyon Kriterleri", paragraphs: ["Rota optimizasyonu minimum yakıt tüketimi, minimum seyir süresi veya maksimum güvenlik hedeflerinden birine veya birkaçına göre yapılır.", "Rüzgâr, dalga, akıntı ve görüş koşulları hesaba katılır. Büyük dalgalarda ek direnç (added resistance) yakıt tüketimini %10-30 artırabilir."] },
        { heading: "Weather Routing Servisleri", paragraphs: ["Profesyonel weather routing şirketleri, gemi performans modeli ve meteorolojik tahmin verilerini kullanarak optimum rotayı önerir. Kıyı güvenliği, trafik ayrım düzenleri ve emisyon kontrol bölgeleri de dikkate alınır."] }
      ],
      keyPoints: ["Weather routing tipik olarak %3-5 yakıt tasarrufu sağlar.", "Sezonluk rota planlaması (örn. Kuzey Atlantik) özellikle etkilidir.", "AI tabanlı rota optimizasyonu gelişmekte olan bir alandır."]
    },
    "Fouling etkisi ve tekne temizliği": {
      title: "Fouling Etkisi ve Tekne Temizliği",
      introduction: "Biyolojik fouling (deniz canlılarının gövdeye yapışması), sürtünme direncini artırarak yakıt tüketimini ve emisyonları önemli ölçüde yükseltir.",
      sections: [
        { heading: "Fouling Etkisi", paragraphs: ["Hafif slime tabakası bile sürtünme direncini %7-10 artırabilir. Orta düzeyde fouling %20-30, ağır fouling %40-50 direnç artışına neden olur.", "Fouling aynı zamanda gemi hızını düşürür ve pervane verimini azaltır."] },
        { heading: "Temizlik Yöntemleri", paragraphs: [], table: { headers: ["Yöntem", "Uygulama", "Sıklık"], rows: [["Antifouling boya", "Kuru havuzda uygulama", "Kuru havuz periyodu (2.5-5 yıl)"], ["Dalgıç ile temizlik", "Sualtı gövde temizliği", "6-12 ayda bir"], ["Robotik temizlik", "ROV tabanlı fırçalama", "İhtiyaca göre"], ["Pervane parlatma", "Dalgıç ile pervane yüzeyi", "6-12 ayda bir"]] } }
      ],
      keyPoints: ["Düzenli gövde temizliği CII performansını doğrudan iyileştirir.", "Antifouling boya seçimi operasyon profili ve bölgeye göre yapılmalıdır.", "Fouling verisi performans izleme sistemiyle takip edilmelidir."]
    },
    "Pervane parlatma ve kavitasyon kontrolü": {
      title: "Pervane Parlatma ve Kavitasyon Kontrolü",
      introduction: "Pervane yüzeyinin pürüzsüzlüğü itme verimini doğrudan etkiler. Kavitasyon ise pervane kanatlarında erozyon ve verim kaybına neden olur.",
      sections: [
        { heading: "Pervane Parlatma", paragraphs: ["Deniz canlıları ve korozyon ürünleri pervane yüzey pürüzlülüğünü artırır. Pürüzlü pervane %3-5 daha fazla yakıt tüketir.", "Dalgıç tarafından sualtında özel aletlerle pervane yüzeyi düzeltilir ve parlatılır. Tipik olarak 6-12 ayda bir yapılır."] },
        { heading: "Kavitasyon", paragraphs: ["Pervane kanat yüzeyinde lokal basınç düşüşü sonucu buhar kabarcıkları oluşur ve çökerken yüzeyde erozyon yaratır. Aşırı kavitasyon pervane ömrünü kısaltır ve gürültü/titreşim oluşturur.", "Kavitasyon kontrolü: Uygun pervane tasarımı, doğru hatve ayarı (CPP), temiz gövde ve uygun trim."] }
      ],
      keyPoints: ["Temiz ve düzgün pervane %3-5 yakıt tasarrufu sağlar.", "Kavitasyon erozyonu pervane kanat kenarlarında en belirgindir.", "Pervane hasarı klas kuruluşu muayenesi gerektirebilir."]
    },
    "Yakıt tüketimi izleme ve raporlama": {
      title: "Yakıt Tüketimi İzleme ve Raporlama",
      introduction: "Yakıt tüketiminin sistematik izlenmesi, verimlilik optimizasyonunun ve düzenleyici uyumun temelini oluşturur.",
      sections: [
        { heading: "İzleme Yöntemleri", paragraphs: ["Tank sounding yöntemi: Günlük tank seviye okumaları ile tüketim hesabı. Basit ancak hata payı yüksek (%2-5).", "Flowmetre yöntemi: Yakıt hattına yerleştirilen Coriolis veya ultrasonik flowmetre ile sürekli ölçüm. Doğruluk %0.1-0.5.", "BDN bazlı: Bunker alımı ve ROB farkı ile dönemsel hesap."] },
        { heading: "Raporlama", paragraphs: ["Noon report: Günlük seyir verisi (mesafe, hız, yakıt tüketimi, hava durumu) şirkete raporlanır.", "IMO DCS ve EU MRV kapsamında yıllık yakıt tüketimi ve CO₂ emisyonu raporlanır."] }
      ],
      keyPoints: ["Doğru yakıt ölçümü verimlilik optimizasyonunun ön koşuludur.", "Flowmetre kurulumu başlangıç yatırımı gerektirir ancak uzun vadede tasarruf sağlar.", "Dijital veri toplama manuel raporlamaya göre daha güvenilirdir."]
    },
    "Atık ısı geri kazanım (WHRS)": {
      title: "Atık Isı Geri Kazanım Sistemi (WHRS)",
      introduction: "WHRS, ana motor egzoz gazı ve soğutma suyu atık ısısını kullanarak ek güç üreten ve genel enerji verimini artıran sistemdir.",
      sections: [
        { heading: "Sistem Bileşenleri", paragraphs: ["Egzoz gazı ekonomizeri: Egzoz gazı ısısıyla buhar üretir. Buhar türbini: Üretilen buharla elektrik jeneratörü tahrik eder. Güç türbini: Egzoz gazı doğrudan türbini döndürür (turbocompound).", "Kombine sistem (ST + PT) toplam motorun yakıt enerjisinin %8-11'ini geri kazanabilir."] },
        { heading: "Enerji Akışı", paragraphs: [], table: { headers: ["Kaynak", "Sıcaklık", "Geri Kazanım"], rows: [["Egzoz gazı", "250-350°C", "Buhar türbini / güç türbini"], ["HT soğutma suyu", "80-90°C", "Evaporatör, ısıtma"], ["Yağlama yağı", "40-55°C", "Sınırlı (düşük sıcaklık)"], ["Şarj havası soğutucusu", "150-200°C (giriş)", "Ekonomizer"]] } }
      ],
      keyPoints: ["WHRS, EEDI/EEXI değerini iyileştirir.", "Yatırım maliyeti yüksek ancak büyük gemilerde geri dönüş süresi 3-5 yıldır.", "Düşük yükte WHRS verimi düşer."]
    },
    "Hava yağlama (air lubrication) sistemi": {
      title: "Hava Yağlama (Air Lubrication) Sistemi",
      introduction: "Hava yağlama sistemi, gemi gövdesi altına mikro hava kabarcıkları salarak su-gövde temas sürtünmesini azaltan yenilikçi bir teknolojidir.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Gövde altına yerleştirilen hava dağıtıcılarından düşük basınçlı hava verilir. Oluşan mikro kabarcık tabakası gövde ile su arasında düşük sürtünmeli bir arayüz oluşturur.", "Tipik olarak %5-10 sürtünme direnci azaltması sağlar. Düz tabanlı gemilerde (tanker, bulk carrier) en etkilidir."] },
        { heading: "Sistem Gereksinimleri", paragraphs: ["Kompresör kapasitesi, hava dağıtım boruları, kontrol sistemi ve enerji tüketimi dikkate alınmalıdır. Kompresör enerji tüketimi net tasarruftan düşülmelidir."] }
      ],
      keyPoints: ["Silverstream ve Mitsubishi MALS başlıca ticari sistemlerdir.", "Kısa mesafeli seyirlerde yatırım geri dönüşü uzayabilir.", "EEDI/EEXI hesabında sürtünme azaltma olarak kredi alınabilir."]
    },
    "Rüzgâr destekli itme (rotor sail, wing sail)": {
      title: "Rüzgâr Destekli İtme Sistemleri",
      introduction: "Rüzgâr enerjisini mekanik itme kuvvetine dönüştüren yardımcı tahrik sistemleri, yakıt tasarrufu ve emisyon azaltma sağlar.",
      sections: [
        { heading: "Rotor Sail (Flettner Rotoru)", paragraphs: ["Dikey dönen silindirik yapıdır. Magnus etkisi ile rüzgârdan itme kuvveti üretir. Motorla döndürülen rotor, rüzgâra dik yönde kuvvet oluşturur.", "Tipik olarak %5-20 yakıt tasarrufu sağlar (rota ve rüzgâr koşullarına bağlı). Norsepower ve Anemoi başlıca üreticilerdir."] },
        { heading: "Wing Sail ve Kite", paragraphs: ["Wing sail: Uçak kanadı profilinde rijit yelken. Otomatik açı ayarıyla optimal itme sağlanır.", "Kite: Geminin pruvasından uçurulan büyük uçurtma. Yüksek irtifadaki güçlü rüzgârı yakalar. Airseas (Seawing) ticari uygulaması mevcuttur."], table: { headers: ["Teknoloji", "Tasarruf", "Avantaj", "Dezavantaj"], rows: [["Rotor sail", "%5-20", "Kanıtlanmış, kompakt", "Motor gerektirir, güverte alanı"], ["Wing sail", "%5-15", "Düşük bakım", "Büyük yapı, rüzgâr bağımlı"], ["Kite", "%10-30", "Yüksek irtifa rüzgârı", "Operasyonel karmaşıklık"]] } }
      ],
      keyPoints: ["Rüzgâr destekli sistemler CII performansını önemli ölçüde iyileştirir.", "En etkili kullanım açık deniz ve uygun rüzgâr koşullarındadır.", "EEDI/EEXI hesabında rüzgâr itme kuvveti kredi olarak sayılabilir."]
    },
    "LED aydınlatma dönüşümü": {
      title: "LED Aydınlatma Dönüşümü",
      introduction: "Geleneksel floresan ve akkor lambalardan LED aydınlatmaya geçiş, gemilerde enerji tasarrufu sağlayan basit ve etkili bir verimlilik önlemidir.",
      sections: [
        { heading: "Enerji Tasarrufu", paragraphs: ["LED, floresan lambalara göre %40-60, akkor lambalara göre %80-90 daha az enerji tüketir. Gemi aydınlatması toplam elektrik tüketiminin %5-10'unu oluşturur.", "LED ömrü 50000+ saat ile floresan (10000-15000 saat) ve akkor (1000-2000 saat) lambalardan çok daha uzundur."] },
        { heading: "Uygulama", paragraphs: ["Yaşam alanları, makine dairesi, güverte, yük ambarı ve seyir fenerleri LED'e dönüştürülebilir. Denizcilik sertifikalı (IP65/67, titreşim dayanımlı) LED armatürler kullanılmalıdır."] }
      ],
      keyPoints: ["LED dönüşümü düşük yatırımla hızlı geri dönüş sağlar.", "Daha az ısı üretimi klima yükünü de azaltır.", "Seyir fenerleri dönüşümünde klas ve bayrak devleti onayı gerekir."]
    },
    "Pervane enerji tasarrufu cihazları": {
      title: "Pervane Enerji Tasarrufu Cihazları",
      introduction: "Pervane önüne veya arkasına yerleştirilen hidrodinamik cihazlar, akış düzenini iyileştirerek itme verimini artırır.",
      sections: [
        { heading: "Cihaz Tipleri", paragraphs: [], table: { headers: ["Cihaz", "Konum", "Tasarruf", "Prensip"], rows: [["Pre-swirl stator", "Pervane önü", "%3-5", "Akış yönlendirme"], ["Pre-swirl duct", "Pervane önü", "%3-7", "Kanal + stator"], ["Boss cap fin", "Pervane göbeği", "%1-3", "Hub vortex azaltma"], ["Contra-rotating propeller", "Pervane arkası", "%5-8", "Dönme enerjisi geri kazanım"], ["Mewis duct", "Pervane önü", "%3-6", "Akış hızlandırma"], ["Gate rudder", "Pervane arkası", "%5-8", "Dümen + enerji geri kazanım"]] } },
        { heading: "Seçim Kriterleri", paragraphs: ["Gemi tipi, pervane tasarımı, operasyon profili ve hız aralığı seçimi etkiler. CFD (hesaplamalı akışkanlar dinamiği) simülasyonu ile performans tahmin edilir."] }
      ],
      keyPoints: ["Enerji tasarrufu cihazları EEDI/EEXI hesabında kredi sağlar.", "Retrofitting mevcut gemilere kuru havuzda uygulanabilir.", "Birden fazla cihazın kombinasyonu toplam tasarrufu artırabilir."]
    },
    "IMO DCS (veri toplama sistemi)": {
      title: "IMO DCS (Veri Toplama Sistemi)",
      introduction: "IMO Data Collection System (DCS), 5000 GT ve üzeri gemilerin yakıt tüketimi verilerini yıllık olarak raporlamasını zorunlu kılan sistemdir.",
      sections: [
        { heading: "Gereklilikler", paragraphs: ["MARPOL Annex VI Reg. 22A kapsamında 2019'dan itibaren yürürlüktedir. Gemiler yıllık yakıt tüketimini, seyir mesafesini ve denizde geçirilen saatleri raporlar.", "Veriler bayrak devletine sunulur ve IMO GISIS veritabanında anonimleştirilerek yayınlanır."] },
        { heading: "Raporlama Süreci", paragraphs: ["1. SEEMP Part II'de veri toplama yöntemi tanımlanır.", "2. Yıl boyunca yakıt tüketimi ve seyir verileri toplanır.", "3. Yıl sonunda rapor bayrak devletine sunulur.", "4. Doğrulama sonrası SoC (Statement of Compliance) düzenlenir."] }
      ],
      keyPoints: ["DCS verileri CII hesaplamasının temelini oluşturur.", "Veri doğruluğu denetim ve ceza riski açısından kritiktir.", "BDN ve flowmetre verileri DCS raporlamasında kullanılır."]
    },
    "EU MRV regülasyonu": {
      title: "EU MRV Regülasyonu",
      introduction: "EU MRV (Monitoring, Reporting and Verification), AB limanlarına uğrayan 5000 GT üzeri gemilerin CO₂ emisyonlarını izleme ve raporlama yükümlülüğüdür.",
      sections: [
        { heading: "Kapsam", paragraphs: ["AB limanları arasındaki seferlerde ve AB limanına gelen/giden seferlerin AB liman payında (%50) emisyon raporlaması yapılır.", "IMO DCS'den farklı olarak AB limanlı seferler bazında detaylı raporlama gerektirir."] },
        { heading: "Raporlama", paragraphs: ["Yıllık emisyon raporu akredite doğrulayıcı (verifier) tarafından doğrulanır. Uyumsuzluk durumunda gemi AB limanlarından alıkonulabilir."] }
      ],
      keyPoints: ["EU MRV ve IMO DCS paralel olarak uygulanır.", "2024'ten itibaren EU ETS ile entegre edilmiştir.", "Rapor doğrulaması bağımsız ve akredite kuruluş tarafından yapılır."]
    },
    "EU ETS (emisyon ticaret sistemi)": {
      title: "EU ETS (Emisyon Ticaret Sistemi)",
      introduction: "AB Emisyon Ticaret Sistemi, 2024'ten itibaren denizcilik sektörünü kapsayan ve CO₂ emisyonları için karbon fiyatı uygulayan piyasa mekanizmasıdır.",
      sections: [
        { heading: "Uygulama", paragraphs: ["5000 GT üzeri gemiler, AB limanları arasındaki seferlerin %100'ü ve AB-dışı seferlerin %50'si için emisyon hakkı (allowance) satın almak zorundadır.", "Kademeli geçiş: 2024'te %40, 2025'te %70, 2026'da %100 emisyon karşılığı ödeme."] },
        { heading: "Maliyet Etkisi", paragraphs: ["Karbon fiyatı dalgalanır; 2024 başı itibarıyla yaklaşık 60-90 €/ton CO₂ aralığındadır. Bu fiyat yakıt maliyetine ton başına 180-280 $/ton ek yük getirir (HFO bazında)."], example: { problem: "Yılda 10000 ton HFO tüketen bir gemi, AB seferlerinden 25000 ton CO₂ emisyonu üretiyorsa ve karbon fiyatı 80 €/ton ise yıllık ek maliyeti hesaplayınız (2025, %70 oran).", steps: ["Karşılanacak emisyon = 25000 × 0.70 = 17500 ton CO₂", "Ek maliyet = 17500 × 80 = 1 400 000 €"], result: "Yıllık ek karbon maliyeti 1.4 milyon Euro'dur." } }
      ],
      keyPoints: ["EU ETS denizcilik maliyetlerini önemli ölçüde artırmaktadır.", "Verimlilik önlemleri karbon maliyetini doğrudan azaltır.", "Alternatif yakıtlar (LNG, metanol, amonyak) karbon maliyetini düşürebilir."]
    },
    "Yakıt tüketimi veri doğrulama": {
      title: "Yakıt Tüketimi Veri Doğrulama",
      introduction: "Raporlanan yakıt tüketimi verilerinin doğruluğu, CII derecelendirmesi, EU ETS maliyeti ve düzenleyici uyum açısından kritik önemdedir.",
      sections: [
        { heading: "Doğrulama Yöntemleri", paragraphs: ["BDN doğrulaması: Bunker Delivery Note miktarları ile tank ölçümleri karşılaştırılır.", "Flowmetre kalibrasyonu: Periyodik kalibrasyon sertifikaları kontrol edilir.", "Kütle dengesi: Alınan yakıt − ROB − tüketim = sıfır olmalıdır (tolerans dahilinde).", "Cross-check: SFOC × güç × süre hesabı ile ölçülen tüketim karşılaştırılır."] },
        { heading: "Denetim", paragraphs: ["Bayrak devleti veya akredite doğrulayıcı, DCS ve MRV raporlarını denetler. Uyumsuzluk: eksik veri, tutarsız rakamlar veya belge eksikliği durumunda gemi SoC alamaz."] }
      ],
      keyPoints: ["Veri bütünlüğü güvenilir CII değerlendirmesinin ön koşuludur.", "Dijital veri toplama insan hatasını azaltır.", "Flowmetre arızası durumunda yedek hesap yöntemi belgelenmiş olmalıdır."]
    },
    "Yıllık verimlilik raporu hazırlama": {
      title: "Yıllık Verimlilik Raporu Hazırlama",
      introduction: "SEEMP Part III kapsamında gemi operatörü, yıllık enerji verimliliği raporunu hazırlayarak bayrak devletine sunar.",
      sections: [
        { heading: "Rapor İçeriği", paragraphs: [], bulletPoints: ["Gemi tanımlama bilgileri (IMO no, bayrak, GT, DWT)", "Yıllık toplam yakıt tüketimi (yakıt tipine göre)", "Toplam CO₂ emisyonu", "Toplam seyir mesafesi (deniz mili)", "Denizde geçirilen saat", "Hesaplanan CII değeri ve derecelendirme (A-E)", "Önceki yıllarla karşılaştırma", "Düzeltici aksiyon planı (D veya E ise)"] },
        { heading: "Hazırlama Süreci", paragraphs: ["Takvim yılı bitiminde veriler derlenir, hesaplamalar yapılır ve rapor bayrak devletine sunulur. Doğrulama sonrası SoC (Statement of Compliance) düzenlenir ve gemide bulundurulur."] }
      ],
      keyPoints: ["SoC olmayan gemi liman devleti kontrolünde alıkonulabilir.", "Rapor SEEMP Part III formatına uygun olmalıdır.", "D veya E derecelendirmesinde düzeltici aksiyon planı sunulması zorunludur."]
    }
  }
};

export default content7;
