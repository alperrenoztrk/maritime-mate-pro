import type { MachineSubTopicContent } from "./machineTopicDetailContent";

type ContentMap = Record<string, Record<string, MachineSubTopicContent>>;

const content6: ContentMap = {
  // ═══════════════════════════════════════════════════════════════
  // YAKIT TEKNOLOJİSİ — Eksik alt başlıklar
  // ═══════════════════════════════════════════════════════════════
  "fuel-technology": {
    "MGO ve MDO ayrımı": {
      title: "MGO ve MDO Ayrımı",
      introduction: "Marine Gas Oil (MGO) ve Marine Diesel Oil (MDO), distile deniz yakıtlarıdır. Her ikisi de düşük viskoziteli, temiz yakıtlardır ancak üretim süreçleri ve kalite parametreleri farklılık gösterir.",
      sections: [
        { heading: "Tanımlar", paragraphs: ["MGO (DMA sınıfı): Tamamen distile edilmiş, berrak ve parlak görünümlü yakıttır. Viskozitesi 40°C'de 2.0–6.0 cSt aralığındadır. Isıtma gerektirmez; doğrudan enjeksiyon sistemine verilebilir.", "MDO (DMB sınıfı): Distile yakıta az miktarda kalıntı yakıt karıştırılmış ürünlerdir. Viskozitesi 40°C'de 11.0 cSt'ye kadar çıkabilir. Hafif ısıtma gerektirebilir."], table: { headers: ["Parametre", "MGO (DMA)", "MDO (DMB)"], rows: [["Viskozite (40°C)", "2.0–6.0 cSt", "≤ 11.0 cSt"], ["Yoğunluk (15°C)", "≤ 890 kg/m³", "≤ 900 kg/m³"], ["Kükürt", "≤ 0.10% (ECA)", "≤ 1.50%"], ["Görünüm", "Berrak, parlak", "Bulanık olabilir"], ["Isıtma ihtiyacı", "Hayır", "Hafif"]] } },
        { heading: "Kullanım Alanları", paragraphs: ["MGO: ECA bölgelerinde ana yakıt, acil jeneratör yakıtı, yardımcı kazan pilot yakıtı. Limanda bekleme sırasında tercih edilir.", "MDO: ECA dışı bölgelerde ekonomik distile seçenek; bazı yardımcı motorlarda sürekli yakıt olarak kullanılır."] }
      ],
      keyPoints: ["ISO 8217 standardında MGO = DMA, MDO = DMB sınıfıdır.", "ECA bölgelerinde %0.10 kükürt limiti MGO kullanımını zorunlu kılar.", "MDO'dan MGO'ya geçişte yakıt sistemi yıkaması gerekebilir."]
    },
    "LNG yakıt kullanımı": {
      title: "LNG Yakıt Kullanımı",
      introduction: "Sıvılaştırılmış doğal gaz (LNG), −162°C'de depolanan ve çevresel düzenlemeler nedeniyle denizcilik sektöründe hızla yaygınlaşan alternatif bir yakıttır.",
      sections: [
        { heading: "LNG'nin Yakıt Olarak Özellikleri", paragraphs: ["LNG, ağırlıklı olarak metan (CH₄, %85-95) içerir. Kaynama noktası −162°C'dir ve atmosferik basınçta sıvı halde depolanır. Hacimsel enerji yoğunluğu HFO'nun yaklaşık %60'ı kadardır; bu nedenle daha büyük yakıt tankları gerektirir.", "SOx emisyonu sıfıra yakındır; NOx emisyonu Tier III seviyesini ek arıtma olmadan karşılayabilir (düşük basınçlı gaz motorlarında). PM emisyonu ihmal edilebilir düzeydedir."] },
        { heading: "Yakıt Gaz Tedarik Sistemi (FGSS)", paragraphs: ["LNG tankından buharlaştırıcıya (vaporizer), ardından basınç regülatörü üzerinden motora gaz beslenir. Düşük basınçlı sistemlerde 5-8 bar, yüksek basınçlı sistemlerde 300 bar civarında gaz basıncı kullanılır.", "Güvenlik zonları IGF Code (International Code of Safety for Ships Using Gases or Other Low-flashpoint Fuels) ile belirlenmiştir."], table: { headers: ["Sistem", "Basınç", "Motor Tipi", "Metan Kayması"], rows: [["Düşük basınçlı", "5-8 bar", "4 zamanlı Otto", "Yüksek (%2-4)"], ["Yüksek basınçlı", "~300 bar", "2 zamanlı Diesel", "Çok düşük (<0.1%)"]] } }
      ],
      keyPoints: ["LNG kullanımı SOx ve PM emisyonlarını neredeyse tamamen ortadan kaldırır.", "Metan kayması (methane slip) düşük basınçlı sistemlerde önemli bir GHG sorunudur.", "IGF Code yakıt gaz sisteminin tasarım ve operasyonunu düzenler."]
    },
    "Metanol ve amonyak yakıtlar": {
      title: "Metanol ve Amonyak Yakıtlar",
      introduction: "Metanol (CH₃OH) ve amonyak (NH₃), denizcilik sektörünün dekarbonizasyon hedefleri doğrultusunda geliştirilen gelecek nesil alternatif yakıtlardır.",
      sections: [
        { heading: "Metanol", paragraphs: ["Metanol, oda sıcaklığında sıvı halde depolanabilir. Flash point'i 12°C ile düşüktür; bu nedenle özel güvenlik önlemleri gerektirir. MAN B&W ME-LGIM ve Wärtsilä 32 Methanol motorları ticari kullanımdadır.", "SOx emisyonu sıfır, NOx emisyonu düşüktür. Biyolojik olarak parçalanabilir; deniz çevresine etkisi düşüktür. Enerji yoğunluğu HFO'nun yaklaşık yarısıdır."] },
        { heading: "Amonyak", paragraphs: ["Amonyak, −33°C'de veya 10 bar basınçta sıvı olarak depolanır. Karbon içermez; yanma ürünü N₂ ve H₂O'dur. Enerji yoğunluğu HFO'nun yaklaşık %40'ı kadardır.", "Toksik bir gazdır; sızıntı durumunda ciddi sağlık riski oluşturur. Yanma hızı düşüktür ve pilot yakıt (MGO veya H₂) gerektirir. N₂O (azot monoksit) oluşum riski mevcuttur."], table: { headers: ["Parametre", "Metanol", "Amonyak", "HFO"], rows: [["Enerji yoğunluğu (MJ/kg)", "19.9", "18.6", "40.5"], ["Flash point", "12°C", "132°C", ">60°C"], ["Karbon içeriği", "Var (CH₃OH)", "Yok (NH₃)", "Var"], ["Depolama", "Oda sıcaklığı, sıvı", "-33°C veya 10 bar", "Isıtılmış tanklar"], ["Toksisite", "Düşük-orta", "Yüksek", "Düşük"]] } }
      ],
      keyPoints: ["Metanol, mevcut altyapıya en kolay adapte edilebilen alternatif yakıttır.", "Amonyak karbon-sıfır yakıt olarak uzun vadeli çözüm adayıdır.", "Her iki yakıt da yeşil üretim (yenilenebilir enerji ile) gerektirir."]
    },
    "Yoğunluk ve API gravity": {
      title: "Yoğunluk ve API Gravity",
      introduction: "Yakıt yoğunluğu, yakıt miktarının hesaplanması, separatör ayarı ve yanma kalitesinin değerlendirilmesi için temel parametredir.",
      sections: [
        { heading: "Yoğunluk Ölçümü", paragraphs: ["Deniz yakıtlarında yoğunluk 15°C referans sıcaklıkta kg/m³ cinsinden ifade edilir. Ölçüm hidrometre veya dijital yoğunluk ölçer ile yapılır.", "HFO yoğunluğu tipik olarak 960-991 kg/m³, MGO yoğunluğu 830-890 kg/m³ aralığındadır."], formula: { expression: "ρ₁₅ = ρ_t + k × (t − 15)", variables: ["ρ₁₅: 15°C'deki yoğunluk (kg/m³)", "ρ_t: Ölçüm sıcaklığındaki yoğunluk", "k: Sıcaklık düzeltme katsayısı (ASTM tabloları)", "t: Ölçüm sıcaklığı (°C)"] } },
        { heading: "API Gravity", paragraphs: ["API gravity, Amerikan Petrol Enstitüsü tarafından tanımlanan ters yoğunluk ölçeğidir. Hafif yakıtlar yüksek API değerine sahiptir."], formula: { expression: "API = (141.5 / SG₆₀°F) − 131.5", variables: ["SG₆₀°F: 60°F'deki (15.56°C) spesifik gravity"] }, example: { problem: "Yoğunluğu 15°C'de 960 kg/m³ olan bir HFO'nun API gravity değerini hesaplayınız.", steps: ["SG = 960 / 999.1 = 0.9609", "API = 141.5 / 0.9609 − 131.5", "API = 147.3 − 131.5 = 15.8"], result: "API gravity değeri 15.8'dir (ağır yakıt)." } }
      ],
      keyPoints: ["Yoğunluk > 991 kg/m³ olan yakıtlar standart separatörlerle arıtılamaz.", "Bunker miktarı hesabında yoğunluk ve sıcaklık düzeltmesi zorunludur.", "API < 10 olan yakıtlar suda batar."]
    },
    "Pour point ve cloud point": {
      title: "Pour Point ve Cloud Point",
      introduction: "Pour point ve cloud point, yakıtın düşük sıcaklıklardaki akışkanlık davranışını belirleyen kritik parametrelerdir.",
      sections: [
        { heading: "Tanımlar", paragraphs: ["Cloud point: Yakıtın soğutulması sırasında parafin kristallerinin oluşmaya başladığı ve yakıtın bulanıklaştığı sıcaklıktır. Bu sıcaklığın altında filtre tıkanması başlar.", "Pour point: Yakıtın akışkanlığını yitirdiği ve artık dökülmediği en düşük sıcaklıktır. Cloud point'ten 6-10°C düşüktür."] },
        { heading: "Operasyonel Önemi", paragraphs: ["Yakıt depolama ve transfer sıcaklığı pour point'in en az 10°C üzerinde tutulmalıdır. Tankta donmuş yakıt akışı engeller ve pompalar kavitasyon yapar.", "MGO'nun pour point'i genellikle −6°C ile +6°C, HFO'nun pour point'i +15°C ile +30°C arasındadır."], table: { headers: ["Yakıt", "Tipik Pour Point", "Min. Tank Sıcaklığı"], rows: [["HFO (RMG 380)", "+24°C", "+34°C"], ["VLSFO", "+6 ile +30°C", "+16 ile +40°C"], ["MGO (DMA)", "−6°C", "+4°C"]] } }
      ],
      keyPoints: ["VLSFO'ların pour point'i geniş aralıkta değişir; her partide kontrol gerekir.", "Yakıt değiştirmede (fuel changeover) pour point dikkate alınmalıdır.", "Pour point depressant katkı maddeleri akışkanlığı iyileştirebilir."]
    },
    "Flash point ve tutuşma noktası": {
      title: "Flash Point ve Tutuşma Noktası",
      introduction: "Flash point, yakıt buharının bir kıvılcımla kısa süreli alev oluşturduğu en düşük sıcaklıktır. Güvenlik açısından kritik bir parametredir.",
      sections: [
        { heading: "Flash Point", paragraphs: ["SOLAS gereği gemi yakıt tanklarındaki yakıtın flash point'i en az 60°C olmalıdır. Bu kural MGO, HFO ve VLSFO dahil tüm yakıtlar için geçerlidir.", "Kapalı kap (Pensky-Martens) yöntemiyle ölçülür. Düşük flash point'li yakıt yangın ve patlama riski oluşturur."] },
        { heading: "Tutuşma ve Ateşleme Noktaları", paragraphs: ["Fire point (tutuşma noktası): Yakıt buharının sürekli yanmayı sürdürdüğü sıcaklıktır. Flash point'ten 5-10°C yüksektir.", "Auto-ignition temperature (kendiliğinden tutuşma sıcaklığı): Dış ateşleme kaynağı olmadan kendiliğinden yanmanın başladığı sıcaklıktır. HFO için yaklaşık 250-300°C'dir."], table: { headers: ["Parametre", "HFO", "MGO", "Metanol", "LNG"], rows: [["Flash point", ">60°C", ">60°C", "12°C", "−175°C"], ["Fire point", ">70°C", ">70°C", "~16°C", "−170°C"], ["Auto-ignition", "250-300°C", "~250°C", "464°C", "540°C"]] } }
      ],
      keyPoints: ["Flash point < 60°C olan yakıt gemiye alınamaz (SOLAS).", "Yakıt ısıtma sıcaklığı flash point'in altında tutulmalıdır.", "LNG ve metanol düşük flash point nedeniyle özel güvenlik gereklilikleri taşır."]
    },
    "CCAI ve CII (yakıt kalite indeksleri)": {
      title: "CCAI ve CII (Yakıt Kalite İndeksleri)",
      introduction: "CCAI (Calculated Carbon Aromaticity Index) ve CII (Calculated Ignition Index), kalıntı yakıtların ateşleme kalitesini değerlendirmek için kullanılan hesaplanmış indekslerdir.",
      sections: [
        { heading: "CCAI Hesabı", paragraphs: ["CCAI, yakıtın yoğunluğu ve viskozitesinden hesaplanan ve ateşleme kalitesini gösteren boyutsuz bir sayıdır. Düşük CCAI değeri iyi ateşleme kalitesine işaret eder."], formula: { expression: "CCAI = ρ₁₅ − 81 − 141 × log₁₀(log₁₀(ν₅₀ + 0.85))", variables: ["ρ₁₅: 15°C'deki yoğunluk (kg/m³)", "ν₅₀: 50°C'deki kinematik viskozite (cSt)"] }, example: { problem: "Yoğunluğu 975 kg/m³, 50°C viskozitesi 350 cSt olan bir HFO'nun CCAI değerini hesaplayınız.", steps: ["log₁₀(350 + 0.85) = log₁₀(350.85) = 2.545", "log₁₀(2.545) = 0.4057", "CCAI = 975 − 81 − 141 × 0.4057", "CCAI = 975 − 81 − 57.2 = 836.8"], result: "CCAI = 837. Bu değer kabul edilebilir sınırdadır (< 870)." } },
        { heading: "Değerlendirme", paragraphs: [], table: { headers: ["CCAI Değeri", "Ateşleme Kalitesi", "Yorum"], rows: [["< 830", "İyi", "Normal çalışma"], ["830-860", "Kabul edilebilir", "İzleme gerekli"], ["860-870", "Zayıf", "Motor ayarı gerekebilir"], ["> 870", "Kötü", "Ateşleme problemleri beklenir"]] } }
      ],
      keyPoints: ["CCAI > 870 olan yakıtlar ateşleme gecikmesi ve düzensiz yanmaya neden olur.", "ISO 8217 standardında CCAI limiti 870'tir.", "Düşük yüklerde yüksek CCAI'li yakıt sorun çıkarma olasılığı artar."]
    },
    "Katalizör incelikleri (Al+Si)": {
      title: "Katalizör İncelikleri (Al+Si)",
      introduction: "Alüminyum ve silikon (Al+Si) kalıntıları, rafineri işlemlerinden (özellikle FCC – Fluid Catalytic Cracking) kaynaklanan sert abrazif parçacıklardır.",
      sections: [
        { heading: "Cat Fines Sorunu", paragraphs: ["FCC ünitesinden gelen katalizör parçacıkları (cat fines) 1-20 μm boyutundadır ve Mohs sertlik skalasında 6-7 değerine sahiptir (çelikten sert). Bu parçacıklar yakıt enjektör nozülleri, pompa plunjer yüzeyleri, silindir gömlekleri ve piston segmanlarında hızlı abrazif aşınmaya neden olur.", "ISO 8217 standardı Al+Si toplamını maksimum 60 ppm olarak sınırlar. Motor üreticileri ise motora giren yakıtta 15 ppm altını hedefler."] },
        { heading: "Arıtma Yöntemleri", paragraphs: ["Separatör (purifier): En etkili yöntemdir; 98°C'de çalışma ve düşük akış hızı cat fines uzaklaştırma verimini artırır.", "Settling: 24-48 saat bekleme ile büyük parçacıklar dibe çöker.", "Filtrasyon: Son aşama olarak otomatik geri yıkamalı filtreler (10-25 μm) kullanılır."], table: { headers: ["Aşama", "Hedef Al+Si", "Yöntem"], rows: [["Settling tank çıkışı", "< 30 ppm", "Yerçekimi ile çökelme"], ["Separatör çıkışı", "< 15 ppm", "Santrifüj arıtma"], ["Motor girişi", "< 15 ppm", "Filtre (10 μm)"]] } }
      ],
      keyPoints: ["Cat fines hasarı silindir gömleği, piston ve enjektörde ciddi aşınmaya yol açar.", "Separatör akış hızının düşürülmesi cat fines uzaklaştırma verimini artırır.", "Yüksek cat fines içerikli yakıt alındığında ek settling süresi planlanmalıdır."]
    },
    "Su ve sediment oranı": {
      title: "Su ve Sediment Oranı",
      introduction: "Yakıttaki su ve sediment, yanma kalitesini düşüren, ekipman aşınmasını artıran ve korozyon oluşturan istenmeyen bileşenlerdir.",
      sections: [
        { heading: "Su İçeriği", paragraphs: ["ISO 8217 standardı kalıntı yakıtlarda maksimum %0.50 su içeriğine izin verir. Yüksek su içeriği enjeksiyon basıncında dalgalanmalara, yanma gecikmesine ve silindir gömleğinde korozyona neden olur.", "Su, Karl Fischer titrasyon yöntemiyle hassas olarak ölçülür. Gemide basit su testi kitleri (water finding paste) de kullanılır."] },
        { heading: "Sediment", paragraphs: ["Toplam sediment (TSP – Total Sediment Potential) standardı max %0.10'dur. Sediment; oksitlenmiş asfaltenler, parafin kristalleri, kum ve metal parçacıklarını kapsar.", "Yüksek sediment filtre tıkanmasına ve purifier verimsizliğine yol açar. Uyumsuz (incompatible) yakıtların karıştırılması sediment oluşumunu hızlandırır."] }
      ],
      keyPoints: ["Bunker numunesi analizi su ve sediment seviyelerini belirler.", "Settling tank dip drenajı düzenli olarak yapılmalıdır.", "Yakıt uyumsuzluk testi (spot test) yeni yakıt alımı öncesinde önerilir."]
    },
    "Yakıt ısıtma ve viskozite kontrolü": {
      title: "Yakıt Isıtma ve Viskozite Kontrolü",
      introduction: "Kalıntı yakıtların motorlara uygun viskozitede ulaşması için çok aşamalı ısıtma ve otomatik viskozite kontrolü uygulanır.",
      sections: [
        { heading: "Isıtma Aşamaları", paragraphs: ["Depolama tankı: Pour point üzerinde tutulur (tipik 40-50°C).", "Settling tank: 60-70°C'de bekleme ile su ve sediment çökeltme.", "Purifier öncesi: 95-98°C'ye ısıtma (optimum santrifüj ayırma için).", "Motor öncesi: Hedef viskoziteye (10-15 cSt) ulaşmak için son ısıtma (130-150°C)."] },
        { heading: "Viskometre Kontrolü", paragraphs: ["Servis tankı ile motor arasına yerleştirilen online viskometre, yakıt viskozitesini sürekli ölçer ve buhar ısıtıcıyı otomatik kontrol eder. Viskozite set değerinden sapma halinde alarm verilir.", "Viskozite-sıcaklık ilişkisi her yakıt partisi için farklı olabilir; yeni yakıtta kalibrasyon kontrolü yapılmalıdır."] }
      ],
      keyPoints: ["Aşırı ısıtma yakıtın termal çatlamasına (cracking) neden olur.", "Yetersiz ısıtma kötü atomizasyon ve eksik yanmaya yol açar.", "Buhar ısıtıcılarında sızıntı kontrolü önemlidir (yakıta su karışması)."]
    },
    "Purifier ile arıtma": {
      title: "Purifier ile Yakıt Arıtma",
      introduction: "Santrifüj purifier, yakıttaki su, cat fines ve diğer katı parçacıkları yoğunluk farkından yararlanarak ayıran kritik arıtma ekipmanıdır.",
      sections: [
        { heading: "Purifier Operasyonu", paragraphs: ["Yakıt 95-98°C'ye ısıtılarak viskozitesi düşürülür ve purifier'a beslenir. Düşük akış hızı ayırma verimini artırır; motor üreticileri nominal kapasitesinin %60-70'inde çalışmayı önerir.", "Gravity disc (dam ring), yakıt-su ayrışma sınırını belirler. Yakıt yoğunluğuna göre doğru gravity disc seçimi zorunludur; yanlış seçim yakıt kaybına veya yetersiz su ayırımına neden olur."] },
        { heading: "Purifier – Clarifier Düzeni", paragraphs: ["Seri düzende ilk aşamada purifier (su + katı ayırma), ikinci aşamada clarifier (sadece katı ayırma) çalıştırılır. Paralel düzende iki purifier eşzamanlı çalışır ve toplam kapasite artırılır.", "Modern ALCAP (Alfa Laval) ve EPC-50/60 (Mitsubishi) sistemleri gravity disc gerektirmez; otomatik faz algılama ile çalışır."] }
      ],
      keyPoints: ["Purifier'a giren yakıt sıcaklığı HFO için 98°C, VLSFO için 85-90°C olmalıdır.", "Otomatik desludge aralığı yakıt kalitesine göre ayarlanmalıdır.", "Bowl açılma/kapanma sırasında yakıt besleme kesilmelidir."]
    },
    "Homojenizerler": {
      title: "Homojenizerler",
      introduction: "Homojenizer, yakıttaki su damlacıklarını ve asfalten yığınlarını mekanik olarak parçalayarak homojen bir emülsiyon oluşturan cihazdır.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Yüksek basınçlı (100-400 bar) bir pompa yakıtı dar bir aralıktan (homojenizasyon valfi) geçirir. Ani basınç düşüşü ve kesme kuvvetleri, su damlacıklarını 1-5 μm boyutuna indirir. Bu küçük su damlacıkları yanma odasında hızla buharlaşarak yanma verimini artırır.", "Homojenizer, purifier'dan sonra ve motor öncesinde konumlandırılır. Sıcaklık genellikle 130-150°C'dir."] },
        { heading: "Faydaları", paragraphs: [], bulletPoints: ["Yanma verimini artırır ve egzoz emisyonlarını azaltır.", "Cat fines'ı kısmen parçalar ve aşınma etkisini azaltır.", "Yakıt karışımlarının stabilitesini iyileştirir.", "Enjektör nozül tıkanma riskini azaltır."] }
      ],
      keyPoints: ["Homojenizer su ayırma cihazı değildir; purifier'ın yerini almaz.", "Bazı motor üreticileri HFO kullanan motorlarda homojenizer önermektedir.", "Yüksek su içerikli yakıtta homojenizer kullanımı silindir korozyonunu artırabilir."]
    },
    "Yakıt değiştirme (fuel changeover) prosedürü": {
      title: "Yakıt Değiştirme (Fuel Changeover) Prosedürü",
      introduction: "ECA bölgelerine girişte veya çıkışta HFO/VLSFO'dan MGO'ya (veya tersine) geçiş, motor güvenliği için kontrollü bir prosedür gerektirir.",
      sections: [
        { heading: "HFO → MGO Geçişi", paragraphs: ["1. Yakıt sıcaklığını kademeli olarak düşür (termal şok önleme).", "2. Servis tankını MGO'ya geçir.", "3. Karışma tankı veya üç yollu valf ile kademeli geçiş sağla.", "4. Viskometre okumalarını izle; viskozite düştükçe ısıtıcıyı kapat.", "5. Geçiş tamamlandığında yakıt sıcaklığı, basıncı ve viskozitesini kaydet.", "6. Geçiş zamanını, pozisyonu ve yakıt türünü log book'a işle."] },
        { heading: "Dikkat Edilecek Noktalar", paragraphs: ["Hızlı sıcaklık değişimi yakıt pompası ve enjeksiyon sistemi contalarına zarar verebilir. Sıcaklık değişimi saatte maksimum 2°C/dakika olmalıdır.", "MGO'nun yağlama özelliği HFO'dan düşüktür; bazı motorlarda yağlama katkısı gerekebilir.", "MARPOL gereği changeover prosedürü ve kaydı zorunludur."] }
      ],
      keyPoints: ["Yakıt değiştirme ECA sınırından yeterli süre önce başlatılmalıdır.", "Ani sıcaklık değişimi fuel pump seizure'a neden olabilir.", "Changeover kaydı PSC denetiminde kontrol edilir."]
    },
    "Bunker planlama ve sipariş": {
      title: "Bunker Planlama ve Sipariş",
      introduction: "Bunker planlaması, seyir süresince yeterli yakıt bulunmasını ve maliyetin optimize edilmesini sağlayan operasyonel süreçtir.",
      sections: [
        { heading: "Planlama Aşamaları", paragraphs: ["1. Seyir planına göre yakıt tüketimi hesapla (SFOC × güç × süre).", "2. Limanda bekleme süresi için yardımcı motor ve kazan tüketimini ekle.", "3. Emniyet marjı ekle (genellikle %10-15).", "4. Mevcut tank miktarlarını çıkar; alınması gereken net miktarı belirle.", "5. Bunker tedarikçisi seçimi: fiyat, kalite, lojistik ve kredi koşulları.", "6. Sipariş: miktar, kalite (ISO 8217 sınıfı), teslimat zamanı ve yeri."] },
        { heading: "Maliyet Optimizasyonu", paragraphs: ["Farklı limanlardaki yakıt fiyatları önemli ölçüde değişebilir. Bunker planlama yazılımları rota, hız ve fiyat verilerini kullanarak optimum bunker stratejisi önerir.", "Kontrat bazlı alımlar genellikle spot piyasa alımlarından daha ekonomiktir."] }
      ],
      keyPoints: ["ROB (Remaining on Board) miktarı doğru hesaplanmalıdır.", "Minimum tank miktarı (safety stock) her zaman korunmalıdır.", "ECA geçişlerinde MGO/VLSFO ihtiyacı ayrıca planlanmalıdır."]
    },
    "Bunker miktarı ölçüm yöntemleri": {
      title: "Bunker Miktarı Ölçüm Yöntemleri",
      introduction: "Bunker miktarının doğru ölçülmesi, ticari anlaşmazlıkların önlenmesi ve yakıt yönetiminin etkinliği açısından kritiktir.",
      sections: [
        { heading: "Ölçüm Yöntemleri", paragraphs: [], table: { headers: ["Yöntem", "Doğruluk", "Kullanım"], rows: [["Tank sounding (dip çubuğu)", "±1-2%", "Gemi tankları (önce/sonra)"], ["Flowmetre (Coriolis)", "±0.1-0.5%", "Barge veya hat üzerinde"], ["Ullage (boşluk ölçümü)", "±1-2%", "Gemi tankları"], ["Barge tank ölçümü", "±0.5-1%", "Barge survey"]] } },
        { heading: "Hacim-Kütle Dönüşümü", paragraphs: ["Ölçülen hacim, yakıtın ölçüm sıcaklığındaki yoğunluğu ile çarpılarak kütleye (metrik ton) dönüştürülür. Sıcaklık düzeltmesi ASTM/IP tablolarına göre yapılır."], formula: { expression: "Kütle (mt) = Hacim (m³) × ρ_t (kg/m³) / 1000", variables: ["ρ_t: Ölçüm sıcaklığındaki yoğunluk"] } }
      ],
      keyPoints: ["Gemi ve barge ölçümleri arasındaki fark %0.5'i aşmamalıdır.", "Coriolis flowmetre en doğru yöntemdir.", "Trim ve list düzeltmeleri sounding hesaplarında uygulanmalıdır."]
    },
    "Yakıt numunesi alma prosedürü": {
      title: "Yakıt Numunesi Alma Prosedürü",
      introduction: "MARPOL Annex VI gereği her bunker operasyonunda temsili numune alınmalı ve en az 12 ay saklanmalıdır.",
      sections: [
        { heading: "Numune Alma", paragraphs: ["Numune, yakıt manifoldu veya transfer hattındaki numune valfinden sürekli damlatma (drip sampling) veya otomatik numune alıcı ile alınır. Tek noktadan alınan grab sample yetersiz kabul edilir.", "En az üç numune şişesi doldurulur: biri gemi, biri barge/tedarikçi, biri bağımsız laboratuvar analizi için. Her şişe etiketlenir ve mühürlenir."] },
        { heading: "Analiz Parametreleri", paragraphs: ["Laboratuvar analizi: viskozite, yoğunluk, kükürt, su, sediment, ash, Al+Si (cat fines), vanadyum, CCAI, flash point, pour point.", "Sonuçlar BDN ve ISO 8217 limitleriyle karşılaştırılır. Off-spec sonuç durumunda bayrak devletine bildirilir."] }
      ],
      keyPoints: ["Numune mühürü bozulmamış olarak saklanmalıdır.", "MARPOL numune noktası manifold bağlantı flanşından önce olmalıdır.", "Analiz sonuçları separatör ve motor ayarları için referanstır."]
    },
    "Bunker uyuşmazlık yönetimi": {
      title: "Bunker Uyuşmazlık Yönetimi",
      introduction: "Miktar veya kalite uyuşmazlıkları bunker operasyonlarının en sık karşılaşılan sorunlarıdır. Sistematik kayıt ve itiraz süreci gerektirir.",
      sections: [
        { heading: "Miktar Uyuşmazlığı", paragraphs: ["Gemi tank ölçümleri ile BDN miktarı arasındaki fark %0.5'i aşarsa uyuşmazlık (dispute) bildirilir. BDN'ye itiraz notu düşülür ('received under protest').", "Bağımsız surveyor (bunker surveyor) atanarak her iki tarafın ölçümleri doğrulanır. Sıcaklık düzeltmesi, tank kalibrasyon tabloları ve trim/list etkileri kontrol edilir."] },
        { heading: "Kalite Uyuşmazlığı", paragraphs: ["Laboratuvar analizi ISO 8217 limitlerini aştığında tedarikçiye bildirilir ve off-spec claim açılır. Özellikle yüksek cat fines, aşırı su, düşük flash point veya yüksek kükürt durumlarında motor güvenliği önceliklidir.", "Off-spec yakıt kullanılmak zorunda kalınırsa: purifier akış hızını düşür, filtrasyon artır, motor parametrelerini sıkı izle."] }
      ],
      keyPoints: ["BDN üzerindeki itiraz notu yasal koruma sağlar.", "Mühürlü numune anlaşmazlık çözümünde delil niteliğindedir.", "P&I kulübü uyuşmazlık sürecinde danışılmalıdır."]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // BAKIM VE TUTUM — Eksik alt başlıklar
  // ═══════════════════════════════════════════════════════════════
  maintenance: {
    "Durum bazlı bakım (condition-based)": {
      title: "Durum Bazlı Bakım (Condition-Based Maintenance)",
      introduction: "Durum bazlı bakım, ekipmanın gerçek durumuna göre bakım zamanlaması yapan bir stratejidir. Planlı bakımın zamana bağlı yaklaşımından farklı olarak ölçüm verilerine dayanır.",
      sections: [
        { heading: "Prensipler", paragraphs: ["Ekipmanın titreşim, sıcaklık, basınç, yağ kalitesi gibi parametreleri düzenli olarak ölçülür. Bu ölçümler trend olarak izlenir ve belirlenen eşik değerlerinin aşılması durumunda bakım planlanır.", "Avantajı: Gereksiz bakım (over-maintenance) önlenir ve ekipman ömrü uzar. Dezavantajı: İzleme ekipmanı yatırımı ve uzman personel gerektirir."] },
        { heading: "Uygulama Örnekleri", paragraphs: [], table: { headers: ["Ekipman", "İzlenen Parametre", "Eşik Örneği"], rows: [["Ana motor", "Egzoz sıcaklığı trendi", "Nominal ±25°C sapma"], ["Turboşarj", "Titreşim amplitüdü", "ISO 10816 sınıfları"], ["Yataklar", "Yağ analizi metal parçacıkları", "Fe > 100 ppm"], ["Pompalar", "Performans düşüşü (H-Q)", "%15 kapasite kaybı"], ["Isı eşanjörleri", "Yaklaşma sıcaklığı", "Nominal değerin 2 katı"]] } }
      ],
      keyPoints: ["CBM, planlı bakım ve kestirimci bakım arasında bir köprüdür.", "Online ve offline izleme yöntemleri birlikte kullanılır.", "IMO ve klas kuruluşları CBM yaklaşımını desteklemektedir."]
    },
    "Güvenilirlik merkezli bakım (RCM)": {
      title: "Güvenilirlik Merkezli Bakım (RCM)",
      introduction: "RCM (Reliability-Centered Maintenance), ekipmanın fonksiyonlarını ve potansiyel arıza modlarını sistematik olarak analiz ederek en uygun bakım stratejisini belirleyen metodolojdir.",
      sections: [
        { heading: "RCM Analiz Süreci", paragraphs: ["1. Ekipmanın fonksiyonlarını tanımla.", "2. Fonksiyonel arızaları belirle.", "3. Her arızanın nedenlerini (failure modes) listele.", "4. Her arıza modunun etkilerini analiz et (FMEA).", "5. Arızanın sonuçlarını değerlendir (güvenlik, çevre, operasyonel, ekonomik).", "6. Uygun bakım görevini seç (CBM, planlı, arıza sonrası, tasarım değişikliği)."] },
        { heading: "RCM Karar Mantığı", paragraphs: ["Güvenlik ve çevre etkisi olan arızalar: Kesinlikle önleyici veya kestirimci bakım.", "Operasyonel etkili arızalar: Maliyet-fayda analizine göre bakım seçimi.", "Gizli arızalar (hidden failures): Periyodik fonksiyon testi (örn: emniyet supabı testi)."] }
      ],
      keyPoints: ["RCM, kritik ekipmana odaklanarak bakım kaynaklarını optimize eder.", "FMEA (Failure Mode and Effects Analysis) RCM'in temel aracıdır.", "Klas kuruluşları RCM bazlı bakım planlarını kabul etmektedir."]
    },
    "PMS yazılımı ve iş emri yönetimi": {
      title: "PMS Yazılımı ve İş Emri Yönetimi",
      introduction: "Planlı Bakım Sistemi (PMS) yazılımı, gemideki tüm ekipmanların bakım takibini dijital olarak yöneten bilgisayar destekli sistemdir.",
      sections: [
        { heading: "Yazılım Fonksiyonları", paragraphs: ["Ekipman ağacı: Tüm makine ve alt bileşenler hiyerarşik yapıda kayıtlıdır.", "İş emri yönetimi: Bakım planına göre otomatik iş emri oluşturma, atama, tamamlama ve onay.", "Bakım geçmişi: Her ekipman için yapılan tüm bakımlar, değiştirilen parçalar ve ölçüm değerleri kayıt altındadır.", "Yedek parça stok yönetimi: Minimum stok seviyesi uyarısı, sipariş takibi."] },
        { heading: "Klas Gerekliliklerine Uyum", paragraphs: ["Klas kuruluşları onaylı PMS kullanımını teşvik eder. Bazı survey'ler PMS kayıtlarına dayanarak uzatılabilir veya ertelenebilir (credit sistemi).", "AMOS, Star IPS, Bass Net ve TM Master yaygın kullanılan denizcilik PMS yazılımlarıdır."] }
      ],
      keyPoints: ["PMS kayıtları klas survey'inde sunulması gereken temel dokümanlardır.", "İş emri kapatma onayı sorumlu mühendis tarafından yapılmalıdır.", "Dijital PMS, kağıt bazlı sistemlere göre daha güvenilir ve izlenebilirdir."]
    },
    "Bakım aralıkları ve çalışma saatleri": {
      title: "Bakım Aralıkları ve Çalışma Saatleri",
      introduction: "Motor ve yardımcı ekipman bakım aralıkları, üretici tavsiyeleri ve klas kuruluşu gereklilikleri doğrultusunda belirlenir.",
      sections: [
        { heading: "Tipik Bakım Aralıkları", paragraphs: [], table: { headers: ["Bakım İşi", "Aralık (saat)", "Açıklama"], rows: [["Yağ filtresi değişimi", "250-500", "Çalışma saatine göre"], ["Enjektör bakımı", "4000-8000", "Nozül kontrolü ve test"], ["Silindir kapağı revizyonu", "8000-16000", "Supap, oturma yüzeyi"], ["Piston çıkarma", "16000-24000", "Segman, crown kontrolü"], ["Turboşarj revizyonu", "8000-16000", "Yatak ve kanat kontrolü"], ["Krank deflection ölçümü", "4000-8000", "Yatak durumu izleme"], ["Ana yatak muayenesi", "16000-32000", "Beyaz metal kontrolü"]] } },
        { heading: "Çalışma Saati Takibi", paragraphs: ["Her motorun running hour sayacı bulunur. PMS yazılımı çalışma saatlerini otomatik takip eder ve bakım eşiği yaklaştığında uyarı verir.", "Klas survey takvimi genellikle 5 yıllık döngüdedir (annual, intermediate, special survey)."] }
      ],
      keyPoints: ["Üretici tavsiyesi, klas gerekliliklerinden daha sık bakım önerebilir.", "Ağır çalışma koşulları (düşük kaliteli yakıt, yüksek yük) bakım aralıklarını kısaltır.", "Running hour bazlı bakım ile takvim bazlı bakım birlikte değerlendirilmelidir."]
    },
    "Klas gereklilikleri ve survey takvimi": {
      title: "Klas Gereklilikleri ve Survey Takvimi",
      introduction: "Sınıflama kuruluşları (Lloyd's, DNV, Bureau Veritas, ClassNK vb.), geminin yapısal ve mekanik bütünlüğünü periyodik survey'lerle doğrular.",
      sections: [
        { heading: "Survey Tipleri", paragraphs: [], table: { headers: ["Survey", "Aralık", "Kapsam"], rows: [["Annual Survey", "Her yıl", "Genel durum kontrolü, güvenlik ekipmanları"], ["Intermediate Survey", "2.5 yıl", "Genişletilmiş kontrol, tank muayenesi"], ["Special Survey (Class Renewal)", "5 yıl", "Kapsamlı muayene, kalınlık ölçümü"], ["Bottom Survey (Dry Dock)", "5 yıl (alt su)", "Tekne, pervane, dümen, deniz valfleri"], ["Boiler Survey", "2.5-5 yıl", "İç ve dış muayene, güvenlik valfleri"], ["Tailshaft Survey", "5 yıl", "Şaft çekme ve muayene"]] } },
        { heading: "Continuous Survey (CMS)", paragraphs: ["Sürekli makine survey sistemi, 5 yıllık döngüde makine bileşenlerinin parça parça survey edilmesine imkân tanır. Her yıl toplam kalemlerin %20'si kontrol edilir. Bu sayede uzun süreli kuru havuz gereksinimi azaltılır."] }
      ],
      keyPoints: ["Survey'in zamanında yapılmaması sınıf askıya alınmasına yol açar.", "Sınıf askıya alınan gemi sigorta kapsamı dışında kalabilir.", "PMS kayıtları survey sürecini destekler ve hızlandırır."]
    },
    "Kritik ekipman tanımlaması": {
      title: "Kritik Ekipman Tanımlaması",
      introduction: "Kritik ekipman, arızalanması halinde gemi güvenliğini, çevreyi veya operasyonel sürekliliği doğrudan tehlikeye atan makinelerdir.",
      sections: [
        { heading: "Kritik Ekipman Listesi", paragraphs: ["ISM Code gereği her geminin kritik ekipman listesi bulunmalıdır. Bu liste risk değerlendirmesine dayanarak hazırlanır."], bulletPoints: ["Ana motor ve tahrik sistemi", "Dümen makinesi", "Jeneratörler (ana ve acil)", "Yangın pompası ve sabit söndürme sistemi", "Balast ve sintine pompaları", "Seyir ve iletişim cihazları (GMDSS)", "Emniyet supapları ve hızlı kapatma valfleri", "Başlatma havası sistemi"] },
        { heading: "Bakım Önceliği", paragraphs: ["Kritik ekipman bakımı öncelikli olarak planlanır ve yedek parça stoklanır. Arıza durumunda acil onarım prosedürleri önceden belirlenmiş olmalıdır.", "Klas kuruluşları kritik ekipman için condition monitoring veya enhanced preventive maintenance isteyebilir."] }
      ],
      keyPoints: ["Kritik ekipman listesi ISM doküman sisteminin parçasıdır.", "Her kritik ekipman için yedek parça ve acil onarım planı bulunmalıdır.", "Risk matrisi (olasılık × şiddet) kritiklik derecesini belirler."]
    },
    "Yedek parça envanteri ve min-max seviye": {
      title: "Yedek Parça Envanteri ve Min-Max Seviye",
      introduction: "Gemide taşınan yedek parça stoğu, beklenmedik arızalarda müdahale kapasitesini belirleyen operasyonel bir gerekliliktir.",
      sections: [
        { heading: "Stok Yönetimi", paragraphs: ["Min-max stok sistemi: Her yedek parça için minimum (sipariş tetikleme) ve maksimum (depolama kapasitesi) stok seviyeleri belirlenir. Stok minimum seviyeye düştüğünde sipariş oluşturulur.", "Kritik yedek parçalar (piston, silindir kapağı, segman, yatak, enjektör nozül) klas kuruluşu tarafından minimum adetleri belirlenmiş olabilir."] },
        { heading: "Klas Gereklilikleri", paragraphs: ["Klas kuruluşları belirli yedek parçaların gemide bulundurulmasını zorunlu kılar. Eksik yedek parça, survey'de koşullu onay (condition of class) konulmasına neden olabilir."], table: { headers: ["Yedek Parça", "Min. Adet (Tipik)"], rows: [["Silindir kapağı (komple)", "1 adet"], ["Piston (taç + segman)", "1 set"], ["Enjektör nozül", "2 set"], ["Egzoz supabı", "2 adet"], ["Ana yatak (1/2 set)", "1 set"], ["Turboşarj yatak seti", "1 set"]] } }
      ],
      keyPoints: ["PMS yazılımı yedek parça stokunu otomatik izler.", "Uzun seyirlerde ek yedek parça tedariki planlanmalıdır.", "Kullanım süresi sınırlı (shelf life) parçalar periyodik kontrole tabidir."]
    },
    "Piston ve segman değişimi": {
      title: "Piston ve Segman Değişimi",
      introduction: "Piston ve segman değişimi, ana motor bakımının en kapsamlı işlerinden biridir. Silindir performansını doğrudan etkiler.",
      sections: [
        { heading: "Söküm ve Kontrol", paragraphs: ["1. Silindiri izole et ve güvenlik önlemlerini al.", "2. Silindir kapağını sök.", "3. Pistonu özel alet ile (piston pulling device) yukarı çek.", "4. Segmanları çıkar ve ağız boşluğunu (butt gap) ölç.", "5. Piston tacını (crown) çatlak kontrolüne al (PT veya MPI).", "6. Soğutma kanallarını temizle ve basınç testine tabi tut.", "7. Piston skirt (etek) ovalitesini ve aşınmasını ölç."] },
        { heading: "Segman Değerlendirmesi", paragraphs: ["Segman ağız boşluğu: Yeni segmanda üretici tarafından belirlenen nominal değerdedir. Aşınma ile boşluk artar; limit aşılırsa yeni segmanla değiştirilir.", "Segman yüzey durumu: Çizikler, karbonlanma ve kırılma kontrol edilir. Segman kanalındaki radyal boşluk da ölçülmelidir."], table: { headers: ["Ölçüm", "Kontrol Yöntemi", "Limit Aşımı Sonucu"], rows: [["Butt gap", "Feeler gauge", "Blow-by artışı"], ["Radyal boşluk", "Feeler gauge", "Gaz kaçağı"], ["Crown çatlak", "PT/MPI", "Piston değişimi"], ["Soğutma kanalı", "Basınç testi", "Crown değişimi"]] } }
      ],
      keyPoints: ["Segman değişiminde segmanlar stagger (kademeli) pozisyonda yerleştirilir.", "Piston tacı sıcaklık kayıtları aşırı termal yükü gösterebilir.", "Piston çıkarma işlemi en az iki kişi ile yapılmalıdır."]
    },
    "Liner muayene ve ölçüm": {
      title: "Liner Muayene ve Ölçüm",
      introduction: "Silindir gömleği (liner) ölçümü, aşınma durumunun değerlendirilmesi ve yenileme zamanlamasının belirlenmesi için düzenli olarak yapılır.",
      sections: [
        { heading: "Ölçüm Yöntemi", paragraphs: ["Bore gauge (iç çap ölçer) kullanılarak liner iç çapı farklı yükseklik ve yönlerde ölçülür. Ölçüm genellikle 4 yükseklikte (TDC bölgesi, port bölgesi, orta, alt) ve 2 yönde (fore-aft, port-starboard) yapılır.", "Aşınma = Ölçülen çap − Nominal çap. Ovalizasyon = Aynı yükseklikteki iki yöndeki ölçüm farkı."] },
        { heading: "Aşınma Değerlendirmesi", paragraphs: ["Normal aşınma hızı: 0.02-0.10 mm/1000 çalışma saati. Aşınma limiti genellikle nominal çapın %0.5-1.0'idir.", "Clover-leafing (yonca yaprağı aşınması): Süpürme portları arasında düzensiz aşınma paterni. Anti-polishing ring ile önlenebilir."], table: { headers: ["Aşınma Durumu", "Aşınma Hızı", "Aksiyon"], rows: [["Normal", "< 0.05 mm/1000h", "İzleme devam"], ["Yüksek", "0.05-0.10 mm/1000h", "Silindir yağı ayarla"], ["Aşırı", "> 0.10 mm/1000h", "Liner değişimi planla"], ["Limit", "Nominal + %0.8-1.0", "Liner değiştir"]] } }
      ],
      keyPoints: ["TDC (üst ölü nokta) bölgesi en yüksek aşınma alanıdır.", "Korozif aşınma düşük TBN'li silindir yağı kullanımından kaynaklanır.", "Liner ölçüm sonuçları PMS'e kayıt edilmelidir."]
    },
    "Supap taşlama ve ayar": {
      title: "Supap Taşlama ve Ayar",
      introduction: "Egzoz supabı oturma yüzeyinin bakımı, gaz sızdırmazlığının sağlanması ve yanma kalitesinin korunması için periyodik olarak yapılır.",
      sections: [
        { heading: "Taşlama İşlemi", paragraphs: ["1. Supabı sökerek oturma yüzeyini incele (çukurcuk, yanma izi, erozyon).", "2. Kaba taşlama: 80-120 grit macun ile ilk düzeltme.", "3. İnce taşlama: 200-400 grit macun ile yüzey bitirme.", "4. Temas kontrolü: Prusya mavisi (Prussian blue) ile temas şeridi genişliğini kontrol et.", "5. Sızdırmazlık testi: Gazyağı testi ile sızdırmazlığı doğrula."] },
        { heading: "Supap Ayarı", paragraphs: ["Supap açılma/kapanma zamanlaması kam mili profiline göre ayarlanır. Elektronik kontrollü motorlarda (ME tipi) zamanlama yazılımla optimize edilir.", "Supap boşluğu (tappet clearance) feeler gauge ile ölçülür ve üretici spesifikasyonuna göre ayarlanır."] }
      ],
      keyPoints: ["Oturma yüzeyindeki taşlama macunu artığı tamamen temizlenmelidir.", "Supap döndürücü (rotator) eşit aşınma sağlar; döndürmeyenler daha hızlı hasar görür.", "Stellit kaplı supap oturma yüzeyleri daha uzun ömürlüdür."]
    },
    "Enjektör test ve bakım": {
      title: "Enjektör Test ve Bakım",
      introduction: "Yakıt enjektörü (nozül), yüksek basınçlı yakıtı silindir içine ince damlacıklar halinde püskürten hassas bir bileşendir.",
      sections: [
        { heading: "Enjektör Testi", paragraphs: ["Test tezgahında (injector test bench) aşağıdaki parametreler kontrol edilir:", "1. Açma basıncı (opening pressure): Üretici değerine uygun olmalı (tipik 250-350 bar).", "2. Püskürtme kalitesi: İnce, homojen ve simetrik koni şeklinde olmalı.", "3. Sızdırmazlık: Açma basıncının %80'inde 10 saniye damlama olmamalı.", "4. Nozül delik kontrolü: Tıkalı delik tespit edilirse ultrasonik temizleme veya nozül değişimi yapılır."] },
        { heading: "Bakım", paragraphs: ["Nozül karbon birikintileri tel fırça veya ultrasonik temizleme ile giderilir. Nozül iğne (needle) ve gövde çiftler halinde değiştirilir; karıştırılamaz.", "Enjektör O-ring ve bakır conta her sökümde yenilenir."] }
      ],
      keyPoints: ["Açma basıncı düşmüş enjektör kötü atomizasyon ve silindir hasarına neden olur.", "Her enjektör test sonucu kayıt altına alınmalıdır.", "Common rail sistemde enjektör testi özel test ekipmanı gerektirir."]
    },
    "Görsel muayene prosedürleri": {
      title: "Görsel Muayene Prosedürleri",
      introduction: "Görsel muayene (Visual Inspection, VT), en temel ve yaygın tahribatsız muayene yöntemidir. Korozyon, çatlak, deformasyon ve bağlantı gevşekliklerinin tespitinde ilk adımdır.",
      sections: [
        { heading: "Muayene Yöntemi", paragraphs: ["Doğrudan görsel muayene: Çıplak gözle veya büyüteçle yapılır. Yeterli aydınlatma (min 500 lux), temiz yüzey ve uygun mesafe gerektirir.", "Dolaylı görsel muayene: Endoskop (borescope) ile erişilemeyen bölgeler incelenir. Silindir iç yüzeyi, kazan boruları ve krank kutusu bu yöntemle kontrol edilir."] },
        { heading: "Kontrol Noktaları", paragraphs: [], bulletPoints: ["Yüzey çatlakları ve korozyon izleri", "Kaynak dikişi düzensizlikleri", "Cıvata ve somun gevşekliği", "Conta ve O-ring durumu", "Boya ve kaplama hasarı", "Sızıntı izleri (yağ, su, yakıt, hava)"] }
      ],
      keyPoints: ["Görsel muayene her bakım işinin başlangıç noktasıdır.", "Borescope ile piston, silindir ve supap kontrolü söküm yapmadan yapılabilir.", "Şüpheli bulgular ileri NDT yöntemleriyle doğrulanmalıdır."]
    },
    "Manyetik parçacık muayenesi (MT)": {
      title: "Manyetik Parçacık Muayenesi (MT / MPI)",
      introduction: "Manyetik parçacık muayenesi, ferromanyetik malzemelerdeki yüzey ve yüzeye yakın çatlakları tespit eden tahribatsız muayene yöntemidir.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Parça manyetize edilir (elektromıknatıs, yoke veya akım ile). Çatlak bölgesinde manyetik alan kaçağı oluşur ve bu kaçak bölgesine serpilen manyetik parçacıklar (demir tozu) birikerek çatlağı görünür kılar.", "Kuru veya yaş (sıvı içinde süspansiyon) parçacık uygulanabilir. Floresan parçacıklar UV ışığı altında daha hassas sonuç verir."] },
        { heading: "Uygulama Alanları", paragraphs: [], bulletPoints: ["Krank mili fillet bölgesi çatlak kontrolü", "Biyel kolu gövdesi muayenesi", "Şaft ve pin muayenesi", "Kaynak dikişi kontrolü", "Dişli çark diş dibi kontrolü"] }
      ],
      keyPoints: ["Yalnızca ferromanyetik malzemelerde (çelik, dökme demir) uygulanır.", "Manyetik alan çatlağa dik olmalıdır; en az iki yönde manyetizasyon yapılır.", "Muayene sonrası demagnetizasyon (manyetik alan giderme) yapılmalıdır."]
    },
    "Sıvı penetrant muayenesi (PT)": {
      title: "Sıvı Penetrant Muayenesi (PT / DPT)",
      introduction: "Sıvı penetrant muayenesi, tüm metalik ve metalik olmayan malzemelerde yüzey çatlaklarını tespit eden tahribatsız muayene yöntemidir.",
      sections: [
        { heading: "Uygulama Adımları", paragraphs: ["1. Yüzey temizliği: Yüzey yağ, kir ve boyadan arındırılır (temizleyici sprey).", "2. Penetrant uygulama: Kırmızı renkli sıvı penetrant yüzeye püskürtülür veya sürülür.", "3. Bekleme süresi (dwell time): 5-20 dakika (penetrantın çatlağa nüfuz etmesi için).", "4. Fazla penetrantın temizlenmesi: Yüzeyden fazla penetrant silinerek veya yıkanarak uzaklaştırılır.", "5. Geliştirici (developer) uygulama: Beyaz toz veya sprey uygulanır; çatlaktaki penetrant emilerek kırmızı iz oluşturur.", "6. Değerlendirme: Çatlak belirtisi kırmızı çizgi olarak görülür."] },
        { heading: "Gemi Uygulamaları", paragraphs: ["Silindir kapağı çatlak kontrolü, supap oturma yüzeyleri, kaynak dikişleri, pervane kanat yüzeyleri ve boru bağlantı noktaları PT ile kontrol edilir."] }
      ],
      keyPoints: ["PT tüm malzemelerde uygulanabilir (MPI sadece ferromanyetik).", "Yalnızca yüzeye açık çatlakları tespit eder.", "Yüzey temizliği sonucun güvenilirliği için kritiktir."]
    },
    "Yağ analizi ve durum izleme": {
      title: "Yağ Analizi ve Durum İzleme",
      introduction: "Yağ analizi, motor ve makine yağlarının kimyasal ve fiziksel özelliklerini inceleyerek ekipman durumu hakkında bilgi sağlayan kestirimci bakım aracıdır.",
      sections: [
        { heading: "Analiz Parametreleri", paragraphs: [], table: { headers: ["Parametre", "Ölçüm Yöntemi", "Gösterge"], rows: [["Viskozite", "Viskozimetre", "Yakıt seyreltmesi veya oksidasyon"], ["TBN (Bazik sayı)", "Titrasyon", "Nötralizasyon kapasitesi"], ["TAN (Asit sayı)", "Titrasyon", "Oksidasyon seviyesi"], ["Su içeriği", "Karl Fischer", "Soğutma suyu sızıntısı"], ["Metal parçacıklar (Fe, Cu, Pb, Sn)", "Spektrometri", "Aşınma kaynağı tespiti"], ["Partikül sayımı", "ISO 4406", "Kirlilik seviyesi"], ["Flash point", "Cleveland/Pensky", "Yakıt seyreltmesi"]] } },
        { heading: "Yorumlama", paragraphs: ["Yüksek Fe: Silindir, piston veya dişli aşınması.", "Yüksek Cu: Yatak aşınması (CuPb yataklar).", "Yüksek Na: Deniz suyu sızıntısı.", "Düşük TBN: Silindir yağında asit nötralizasyon kapasitesinin tükenmesi."] }
      ],
      keyPoints: ["Yağ numunesi doğru noktadan ve motor çalışırken alınmalıdır.", "Trend analizi tek ölçümden daha değerlidir.", "Silindir yağı ve sistem yağı ayrı ayrı analiz edilmelidir."]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // MAKİNE DAİRESİ GÜVENLİĞİ — Eksik alt başlıklar
  // ═══════════════════════════════════════════════════════════════
  "engine-room-safety": {
    "İşitme koruması (gürültü maruziyeti)": {
      title: "İşitme Koruması ve Gürültü Maruziyeti",
      introduction: "Makine dairesi, gemideki en gürültülü çalışma alanıdır. Uzun süreli gürültü maruziyeti kalıcı işitme kaybına neden olur.",
      sections: [
        { heading: "Gürültü Seviyeleri", paragraphs: ["Makine dairesinde gürültü seviyesi tipik olarak 90-110 dB(A) arasındadır. IMO Resolution A.468(XII) gürültü sınırlarını belirler: makine dairesi sürekli çalışma alanları max 110 dB(A), kontrol odası max 75 dB(A)."], table: { headers: ["Alan", "Maks. Gürültü", "Maruziyet Süresi"], rows: [["Makine dairesi (genel)", "110 dB(A)", "Kısa süreli"], ["Kontrol odası", "75 dB(A)", "Sürekli"], ["85 dB(A) üzeri", "—", "İşitme koruması zorunlu"], ["90 dB(A) üzeri", "—", "Maks. 2 saat/gün"]] } },
        { heading: "Koruma Yöntemleri", paragraphs: [], bulletPoints: ["Kulak tıkacı (foam ear plug): 15-30 dB azaltma.", "Kulaklık (ear muff): 20-35 dB azaltma.", "Elektronik aktif gürültü önleyici: Değişken gürültü ortamlarında.", "Mühendislik önlemleri: Titreşim yalıtımı, ses yalıtım panelleri, susturucular."] }
      ],
      keyPoints: ["85 dB(A) üzerinde işitme koruması kullanımı zorunludur.", "Gürültü ölçümü periyodik olarak yapılmalı ve kayıt altına alınmalıdır.", "Kalıcı işitme kaybı geri dönüşümsüzdür."]
    },
    "Göz ve yüz koruması": {
      title: "Göz ve Yüz Koruması",
      introduction: "Makine dairesinde taşlama, kaynak, kimyasal madde kullanımı ve yüksek basınçlı sıvı sızıntıları göz ve yüz yaralanma riski oluşturur.",
      sections: [
        { heading: "Koruma Ekipmanları", paragraphs: [], table: { headers: ["Ekipman", "Kullanım Alanı", "Standart"], rows: [["Güvenlik gözlüğü", "Genel makine çalışması", "EN 166"], ["Splash-proof gözlük", "Kimyasal madde kullanımı", "EN 166 (sıçrama koruma)"], ["Kaynak maskesi (otomatik)", "Elektrik ve gaz kaynağı", "EN 175, DIN 4-13"], ["Yüz siperi (face shield)", "Taşlama, torna, basınçlı yıkama", "EN 166"], ["UV koruyucu gözlük", "Kaynak çevresi", "DIN 1.7-3"]] } },
        { heading: "Acil Göz Yıkama", paragraphs: ["Kimyasal sıçraması durumunda en az 15 dakika temiz su ile göz yıkaması yapılmalıdır. Makine dairesinde acil göz yıkama istasyonu bulunmalıdır."] }
      ],
      keyPoints: ["Kaynak arkına korumasız bakılması retina yanığına neden olur.", "Basınçlı sıvı sızıntısı (yağ, yakıt) cilt altı enjeksiyonu yapabilir.", "KKD seçimi risk değerlendirmesine göre yapılmalıdır."]
    },
    "Koruyucu giysi ve eldiven": {
      title: "Koruyucu Giysi ve Eldiven",
      introduction: "Makine dairesinde çalışanlar sıcak yüzeyler, kimyasallar, dönen parçalar ve keskin kenarlar gibi tehlikelere maruz kalır.",
      sections: [
        { heading: "Giysi Türleri", paragraphs: ["Tulum (overall): Pamuk veya pamuk-polyester karışım, vücudu kapatan tek parça iş giysisi. Dönen parçalara takılmayı önlemek için dar kesim olmalıdır.", "Isı dayanımlı giysi: Kazan bakımı, sıcak iş ve kaynak operasyonlarında kullanılır.", "Kimyasal dayanımlı önlük: Asit, baz ve solvent kullanımında."] },
        { heading: "Eldiven Seçimi", paragraphs: [], table: { headers: ["Eldiven Tipi", "Kullanım", "Koruma"], rows: [["Deri (genel)", "Mekanik iş, taşıma", "Kesik, sürtünme"], ["Isıya dayanıklı", "Sıcak parça tutma", "250°C'ye kadar"], ["Nitril/neopren", "Kimyasal madde", "Asit, solvent"], ["Yağa dayanıklı (NBR)", "Yağlı ortam", "Mineral yağ, yakıt"], ["Kesilmez (Kevlar)", "Keskin kenar", "Bıçak, tel"]] } }
      ],
      keyPoints: ["Gevşek giysi dönen parçalara takılma riski oluşturur.", "Eldiven iç yüzeyi kuru tutulmalıdır (kavrama gücü).", "Kimyasal kullanımında eldiven geçirgenlik süresi kontrol edilmelidir."]
    },
    "Güvenlik ayakkabısı standartları": {
      title: "Güvenlik Ayakkabısı Standartları",
      introduction: "Makine dairesinde düşen cisimler, kaygan zeminler ve sıcak yüzeyler ayak yaralanma riskini yüksek tutar.",
      sections: [
        { heading: "Sınıflandırma", paragraphs: [], table: { headers: ["Sınıf", "Özellik", "Uygulama"], rows: [["S1", "Çelik burun, antistatik, enerji emici topuk", "Kuru ortam"], ["S2", "S1 + su geçirmezlik", "Nemli ortam"], ["S3", "S2 + delinmeye dayanıklı taban", "Makine dairesi (standart)"], ["S5", "S3 + çizme tipi (su geçirmez)", "Sintine, ıslak zemin"]] } },
        { heading: "Makine Dairesi Gereklilikleri", paragraphs: ["Çelik burunlu veya kompozit burunlu (200 J darbe dayanımı) olmalıdır. Taban yağa, yakıta ve kayganığa dayanıklı olmalıdır. Antistatik özellik statik elektrik boşalımını önler."] }
      ],
      keyPoints: ["S3 sınıfı makine dairesi çalışanları için minimum standarttır.", "Hasarlı güvenlik ayakkabısı derhal değiştirilmelidir.", "Çizme tipi ayakkabı ıslak alanlarda tercih edilir."]
    },
    "Yangın üçgeni ve yangın sınıfları": {
      title: "Yangın Üçgeni ve Yangın Sınıfları",
      introduction: "Yangının oluşabilmesi için üç unsurun bir arada bulunması gerekir: ısı, yakıt (yanıcı madde) ve oksijen. Bu üçlüye yangın üçgeni denir.",
      sections: [
        { heading: "Yangın Üçgeni", paragraphs: ["Herhangi bir unsurun kaldırılması yangını söndürür: soğutma (ısı giderme), boğma (oksijen kesme), yakıtı ayırma. Zincir reaksiyonunun kesilmesi (kuru kimyevi toz) dördüncü söndürme mekanizmasıdır."] },
        { heading: "Yangın Sınıfları", paragraphs: [], table: { headers: ["Sınıf", "Yanıcı Madde", "Söndürme Yöntemi", "Makine Dairesi Örneği"], rows: [["A", "Katı (odun, bez, kağıt)", "Su, köpük", "Yağlı paçavra, yalıtım"], ["B", "Sıvı (yağ, yakıt, boya)", "Köpük, CO₂, toz", "Yakıt sızıntısı, yağ"], ["C", "Gaz (LNG, propan)", "Kuru toz, CO₂", "LNG kaçağı"], ["D", "Metal (alüminyum, magnezyum)", "Özel toz", "Alüminyum talaş"], ["E (elektrik)", "Elektrikli ekipman", "CO₂, kuru toz", "Pano, kablo yangını"]] } }
      ],
      keyPoints: ["Makine dairesi yangınları çoğunlukla B sınıfıdır (yakıt/yağ sızıntısı).", "Sıcak yüzeye yakıt sızıntısı en yaygın makine dairesi yangın nedenidir.", "Yangın önleme, söndürmeden her zaman daha etkilidir."]
    },
    "Makine dairesi sabit söndürme (CO₂, FM200)": {
      title: "Makine Dairesi Sabit Söndürme Sistemi",
      introduction: "Makine dairesinde kontrol altına alınamayan yangınlarda sabit söndürme sistemi devreye alınır. CO₂ ve FM200 (HFC-227ea) en yaygın ajanlardır.",
      sections: [
        { heading: "CO₂ Sistemi", paragraphs: ["CO₂, havadaki oksijen konsantrasyonunu %21'den %15'in altına düşürerek yangını boğar. Makine dairesi hacminin %40'ı kadar CO₂ gerekir.", "Tehlikeleri: CO₂ insan için öldürücüdür (%5 konsantrasyonda bilinç kaybı). Boşaltma öncesi tüm personelin tahliye edildiği doğrulanmalıdır.", "İki aşamalı boşaltma: Önce alarm (sesli + görsel), 60 saniye gecikme, ardından CO₂ boşaltma."] },
        { heading: "FM200 Sistemi", paragraphs: ["FM200 (HFC-227ea), kimyasal zincir reaksiyonunu keserek söndürür. CO₂'ye göre daha az konsantrasyonda etkilidir (%7-9). İnsan üzerindeki toksik etkisi düşüktür.", "Dezavantajı: GWP değeri yüksektir (3220); Kigali Protokolü ile kademeli olarak kısıtlanmaktadır."] }
      ],
      keyPoints: ["CO₂ boşaltma öncesi personel tahliyesi hayati önemdedir.", "Sabit söndürme sistemi altı ayda bir kontrol, yıllık bakım gerektirir.", "Boşaltma sonrası makine dairesine girilmeden havalandırma yapılmalıdır."]
    },
    "Yangın algılama sistemi": {
      title: "Yangın Algılama Sistemi",
      introduction: "Yangın algılama sistemi, yangını erken aşamada tespit ederek alarm veren ve müdahale süresini kısaltan kritik güvenlik sistemidir.",
      sections: [
        { heading: "Algılama Yöntemleri", paragraphs: [], table: { headers: ["Dedektör Tipi", "Algılama Prensibi", "Uygulama"], rows: [["Duman dedektörü (optik)", "Işık saçılması", "Yaşam alanları, kontrol odası"], ["Duman dedektörü (iyonizasyon)", "İyon akımı değişimi", "Genel alanlar"], ["Sıcaklık dedektörü (sabit)", "Eşik sıcaklık aşımı", "Makine dairesi, mutfak"], ["Sıcaklık dedektörü (hız artışı)", "Hızlı sıcaklık artışı", "Makine dairesi"], ["Alev dedektörü (UV/IR)", "Alev radyasyonu", "Makine dairesi, yük alanı"]] } },
        { heading: "Sistem Yapısı", paragraphs: ["Dedektörler bölge (zone) bazlı köprüüstü yangın alarm paneline bağlıdır. Alarm durumunda bölge ve konum gösterilir. UMS gemilerinde alarm yaşam alanlarına uzatılır."] }
      ],
      keyPoints: ["SOLAS gereği tüm gemilerde yangın algılama sistemi zorunludur.", "Dedektörler periyodik olarak test edilmelidir.", "Yanlış alarm (false alarm) oranını azaltmak için düzenli bakım yapılmalıdır."]
    },
    "Hızlı kapatma vanası (quick closing valve)": {
      title: "Hızlı Kapatma Vanası (Quick Closing Valve)",
      introduction: "Hızlı kapatma vanaları, yangın durumunda yakıt ve yağ tanklarının acil olarak izole edilmesini sağlayan güvenlik elemanlarıdır.",
      sections: [
        { heading: "Sistem Yapısı", paragraphs: ["Her yakıt ve yağ tankı çıkışında hızlı kapatma vanası bulunur. Vanalar pnömatik veya mekanik (tel çekme) olarak makine dairesi dışından (genellikle A sınıfı güverte seviyesinden) uzaktan kapatılabilir.", "SOLAS Reg. II-2/4 gereği yakıt tankları, yağlama yağı tankları ve hidrolik yağ tanklarında hızlı kapatma vanası zorunludur."] },
        { heading: "Operasyon ve Test", paragraphs: ["Haftalık: Uzaktan kapama mekanizmasının çalışma testi.", "Aylık: Vanaların tam kapanma doğrulaması.", "Yangın tatbikatında: Tüm hızlı kapatma vanalarının kapatılma prosedürü tatbik edilmelidir."] }
      ],
      keyPoints: ["Yangında ilk yapılacak iş yakıt beslemeyi kesmektir.", "Vana teli veya pnömatik hattın serbest hareketi düzenli kontrol edilmelidir.", "Vana kapandıktan sonra elle (lokal) açılmalıdır (uzaktan açılamaz)."]
    },
    "Yangın tatbikatı ve muster": {
      title: "Yangın Tatbikatı ve Muster",
      introduction: "Düzenli yangın tatbikatları, mürettebatın gerçek yangın durumunda hızlı ve etkin müdahale yapabilmesini sağlar.",
      sections: [
        { heading: "SOLAS Gereklilikleri", paragraphs: ["Yangın tatbikatı ayda en az bir kez yapılmalıdır. Gemi personelinin %25'inden fazlası değişmişse, geminin limandan ayrılmasından itibaren 24 saat içinde tatbikat yapılmalıdır.", "Tatbikat senaryosu: yangın alarm verilmesi, muster istasyonlarında toplanma, yangın ekibinin teçhizat kuşanması, hortum serilmesi, sabit söndürme sistemi simülasyonu, yaralı tahliyesi."] },
        { heading: "Yangın Ekibi Görevleri", paragraphs: [], bulletPoints: ["Ekip lideri: Koordinasyon ve talimat.", "Nozülcü: Hortum ile müdahale.", "Yedek nozülcü: Destek ve hortum taşıma.", "Hava tüpü operatörü: SCBA ile kapalı alana giriş.", "Sınır soğutma: Yangının yayılmasını önleme.", "İlk yardım ekibi: Yaralı bakımı ve tahliye."] }
      ],
      keyPoints: ["Her mürettebat üyesi muster istasyonunu ve görevini bilmelidir.", "Tatbikat sonrası değerlendirme (debriefing) yapılmalıdır.", "Tatbikat kaydı resmi log book'a işlenmelidir."]
    },
    "Kapalı alan tanımı ve tehlikeler": {
      title: "Kapalı Alan Tanımı ve Tehlikeler",
      introduction: "Kapalı alan (enclosed space), sınırlı giriş-çıkışa sahip, sürekli çalışma için tasarlanmamış ve tehlikeli atmosfer oluşma riski taşıyan bölgelerdir.",
      sections: [
        { heading: "Gemideki Kapalı Alanlar", paragraphs: [], bulletPoints: ["Balast tankları", "Yakıt tankları ve void space'ler", "Kargo tankları", "Zincir dolabı (chain locker)", "Krank kutusu (crankcase)", "Kazan iç kısmı", "Boru tünelleri", "Çift dip (double bottom) tankları"] },
        { heading: "Tehlikeler", paragraphs: [], table: { headers: ["Tehlike", "Neden", "Sonuç"], rows: [["Oksijen yetersizliği", "Paslanma, biyolojik ayrışma", "Bayılma, ölüm (O₂ < %16)"], ["Toksik gaz", "H₂S, CO, yakıt buharı", "Zehirlenme, ölüm"], ["Patlayıcı atmosfer", "Yakıt buharı, metan", "Patlama (LEL aşımı)"], ["Düşme", "Dar merdiven, ıslak zemin", "Ciddi yaralanma"]] } }
      ],
      keyPoints: ["Kapalı alana giriş yalnızca PTW (Permit to Work) ile yapılmalıdır.", "Oksijen seviyesi %20.9 altındaysa giriş yapılmamalıdır.", "Son 10 yılda kapalı alan kazaları denizcilik ölümlerinin önemli bir bölümünü oluşturmuştur."]
    },
    "Atmosfer testi (O₂, LEL, H₂S)": {
      title: "Atmosfer Testi",
      introduction: "Kapalı alana giriş öncesinde atmosfer testleri yapılarak ortamın güvenli olduğu doğrulanmalıdır.",
      sections: [
        { heading: "Test Parametreleri", paragraphs: [], table: { headers: ["Parametre", "Güvenli Sınır", "Ölçüm Cihazı"], rows: [["Oksijen (O₂)", "%20.9 (min %19.5)", "Elektrokimyasal sensör"], ["Alt patlama sınırı (LEL)", "< %1 (tüm gazlar)", "Katalitik sensör"], ["H₂S", "< 10 ppm (TWA)", "Elektrokimyasal sensör"], ["CO", "< 25 ppm (TWA)", "Elektrokimyasal sensör"]] } },
        { heading: "Test Prosedürü", paragraphs: ["1. Gaz ölçüm cihazını kalibre et veya kalibrasyon tarihini doğrula.", "2. Kapalı alanın farklı seviyelerinde (üst, orta, alt) ölçüm yap.", "3. Sonuçları Kapalı Alan Giriş İzni formuna kaydet.", "4. Giriş sırasında sürekli izleme yapılmalıdır (portatif veya kişisel dedektör)."] }
      ],
      keyPoints: ["Ölçüm yapılmadan kapalı alana giriş kesinlikle yasaktır.", "Cihaz kalibrasyonu düzenli olarak yapılmalıdır.", "Ortam koşulları değişebilir; sürekli izleme zorunludur."]
    },
    "Giriş izin sistemi (PTW)": {
      title: "Giriş İzin Sistemi (Permit to Work)",
      introduction: "İş izin sistemi (PTW), tehlikeli işlerin güvenli koşullarda yapılmasını garanti eden yazılı yetkilendirme prosedürüdür.",
      sections: [
        { heading: "PTW Gerektiren İşler", paragraphs: [], bulletPoints: ["Kapalı alan girişi", "Sıcak iş (kaynak, kesme, taşlama)", "Yüksekte çalışma", "Elektrik işleri (izolasyon gerektiren)", "Basınçlı sistem açma", "Asbest içeren alanda çalışma"] },
        { heading: "PTW Süreci", paragraphs: ["1. İş tanımı ve risk değerlendirmesi yapılır.", "2. Gerekli güvenlik önlemleri belirlenir (izolasyon, havalandırma, KKD, gözetim).", "3. Yetkili kişi (responsible officer) izni imzalar.", "4. İş tamamlandığında alan kontrol edilir ve izin kapatılır.", "5. PTW kopyası belirli süre saklanır."] }
      ],
      keyPoints: ["PTW olmadan tehlikeli iş başlatılmamalıdır.", "İzin süresinin aşılması durumunda yenileme gerekir.", "ISM Code kapsamında PTW prosedürü SMS'in parçasıdır."]
    },
    "Havalandırma gereklilikleri": {
      title: "Havalandırma Gereklilikleri",
      introduction: "Makine dairesi ve kapalı alanlarda yeterli havalandırma, çalışanların güvenliği ve ekipmanların verimli çalışması için zorunludur.",
      sections: [
        { heading: "Makine Dairesi Havalandırma", paragraphs: ["Makine dairesi havalandırma sistemi, motorların yanma havası ihtiyacını, ısı atımını ve çalışma ortamının konforunu sağlar. Aksiyel ve santrifüj fanlar ile taze hava emilir ve sıcak hava egzoz edilir.", "SOLAS gereği makine dairesi sıcaklığı dış ortam sıcaklığının 15°C üzerini geçmemelidir."] },
        { heading: "Kapalı Alan Havalandırma", paragraphs: ["Kapalı alana giriş öncesinde mekanik havalandırma ile alan en az hacminin 10 katı taze hava ile değiştirilmelidir.", "Havalandırma girişte ve çalışma süresince kesintisiz devam etmelidir. Fan arızasında çalışma durdurulmalıdır."] }
      ],
      keyPoints: ["Havalandırma fanı çalışmadan kapalı alana giriş yapılmamalıdır.", "Hava girişi ve çıkışı birbirinden uzak noktalarda olmalıdır.", "İnert ortamların havalandırılması özel prosedür gerektirir."]
    },
    "Kurtarma prosedürü ve ekipman": {
      title: "Kurtarma Prosedürü ve Ekipman",
      introduction: "Kapalı alanda bayılan veya yaralanan kişinin kurtarılması, önceden hazırlanmış ve tatbik edilmiş bir kurtarma planı gerektirir.",
      sections: [
        { heading: "Kurtarma Ekipmanları", paragraphs: [], bulletPoints: ["SCBA (Self-Contained Breathing Apparatus): Bağımsız solunum cihazı.", "EEBD (Emergency Escape Breathing Device): Kaçış solunum cihazı.", "Kurtarma halatı (rescue line) ve emniyet kemeri.", "Tripod ve vinç sistemi (dikey kurtarma için).", "Sedye (Neil Robertson tipi).", "İlk yardım çantası ve oksijen ünitesi."] },
        { heading: "Kurtarma Prosedürü", paragraphs: ["1. Alarm ver ve kurtarma ekibini çağır.", "2. Kesinlikle eğitimsiz ve donanımsız olarak kapalı alana girme.", "3. SCBA kuşan ve emniyet halatı bağla.", "4. Havalandırmayı artır.", "5. Kazazedeyi güvenli bölgeye taşı.", "6. İlk yardım uygula ve tıbbi destek iste."] }
      ],
      keyPoints: ["İkincil kazazede olma riski çok yüksektir; eğitimsiz giriş yapılmamalıdır.", "SCBA hava kapasitesi giriş süresini sınırlar (tipik 30-45 dakika).", "Kurtarma tatbikatı düzenli olarak yapılmalıdır."]
    },
    "Asbest ve yasaklı malzemeler": {
      title: "Asbest ve Yasaklı Malzemeler",
      introduction: "Asbest, bir zamanlar ısı yalıtımında yaygın kullanılan ancak kanser yapıcı (karsinojen) etkisi nedeniyle yasaklanmış bir malzemedir.",
      sections: [
        { heading: "Asbest Tehlikesi", paragraphs: ["Asbest lifleri solunduğunda akciğerlerde birikerek asbetoz, akciğer kanseri ve mezotelyoma gibi ölümcül hastalıklara neden olur. Etkiler 10-40 yıl sonra ortaya çıkabilir.", "IMO MSC.1/Circ.1374 gereği 2011'den sonra inşa edilen gemilerde asbest kullanımı tamamen yasaklanmıştır. Eski gemilerde mevcut asbestli malzemeler envantere alınmalıdır."] },
        { heading: "Asbest Yönetimi", paragraphs: ["Asbestli malzeme sağlam ve bozulmamış durumdaysa yerinde bırakılabilir (encapsulation). Bozulmuş asbestli malzeme yetkili personel tarafından özel KKD ile sökülerek kapalı torbalarda uzaklaştırılır.", "IHM (Inventory of Hazardous Materials) gemideki tüm tehlikeli malzemeleri listeler. Hong Kong Sözleşmesi ve EU Ship Recycling Regulation IHM'i zorunlu kılar."] }
      ],
      keyPoints: ["Asbestli malzemeye dokunmadan önce uzman görüşü alınmalıdır.", "Asbest lifi serbestleştiren herhangi bir çalışma özel prosedür gerektirir.", "IHM belgesi geminin ömrü boyunca güncellenmeli ve saklanmalıdır."]
    },
    "Kimyasal depolama kuralları": {
      title: "Kimyasal Depolama Kuralları",
      introduction: "Gemide kullanılan kimyasalların güvenli depolanması, sızıntı, yangın ve sağlık risklerinin önlenmesi için kritiktir.",
      sections: [
        { heading: "Temel Kurallar", paragraphs: [], bulletPoints: ["Uyumsuz kimyasallar ayrı bölmelerde depolanmalıdır (asitler ve bazlar ayrı).", "Kimyasallar etiketli, sağlam ve uygun kaplarda saklanmalıdır.", "Depolama alanında havalandırma, sızıntı paletleri ve döküntü seti bulunmalıdır.", "MSDS erişilebilir olmalı ve personel bilgilendirilmelidir.", "Alev alıcı kimyasallar ısı kaynaklarından ve güneş ışığından uzak tutulmalıdır.", "Depolama alanında sigara ve açık alev yasaktır."] },
        { heading: "GHS Piktogramları", paragraphs: ["Küresel Uyumlaştırılmış Sistem (GHS) ile tüm tehlikeli kimyasallar standart sembollerle etiketlenir: alev, patlama, korozyon, toksisite, ünlem işareti, çevre tehlikesi vb."] }
      ],
      keyPoints: ["Uyumsuz kimyasalların karışması yangın veya patlama riski oluşturur.", "Döküntü seti (spill kit) kimyasal depolama alanına yakın olmalıdır.", "Kimyasal envanter düzenli güncellenmelidir."]
    },
    "Basınçlı gaz tüpü güvenliği": {
      title: "Basınçlı Gaz Tüpü Güvenliği",
      introduction: "Kaynak gazları (oksijen, asetilen), soğutucu gazlar ve kalibrasyon gazları basınçlı tüplerde saklanır. Yanlış kullanım patlama riski oluşturur.",
      sections: [
        { heading: "Güvenlik Kuralları", paragraphs: [], bulletPoints: ["Tüpler düşey pozisyonda, bağlı (zincirleme veya kelepçe) olarak depolanmalıdır.", "Oksijen ve asetilen tüpleri birbirinden en az 6 metre uzakta veya ateşe dayanıklı duvarla ayrılmış olmalıdır.", "Tüp vanası kullanılmadığında kapalı ve koruyucu kapak takılı olmalıdır.", "Tüpler ısı kaynaklarından ve güneş ışığından korunmalıdır.", "Renk kodlaması: Oksijen (beyaz/mavi), Asetilen (kırmızı/bordo), CO₂ (gri), Azot (siyah)."] },
        { heading: "Taşıma ve Kullanım", paragraphs: ["Tüpler yuvarlanarak veya sürüklenerek taşınmamalıdır; uygun el arabası kullanılmalıdır. Tüp vanası yavaşça açılmalıdır. Geri tepme valfi (flashback arrestor) oksijen ve yakıcı gaz hatlarında zorunludur."] }
      ],
      keyPoints: ["Basınçlı gaz tüpleri darbe ve düşmelere karşı korunmalıdır.", "Sızıntı tespitinde sabunlu su çözeltisi kullanılır.", "Periyodik hidrostatik test (5-10 yıl) zorunludur."]
    },
    "ISM Code gereklilikleri": {
      title: "ISM Code Gereklilikleri",
      introduction: "ISM Code (International Safety Management Code), gemilerin güvenli yönetimi ve çevre kirliliğinin önlenmesi için zorunlu bir uluslararası standarttır.",
      sections: [
        { heading: "ISM Code Yapısı", paragraphs: ["ISM Code, gemi işletmecisinin (Company) ve geminin güvenlik yönetim sistemini (SMS – Safety Management System) oluşturmasını ve sürdürmesini zorunlu kılar.", "Temel unsurlar: güvenlik ve çevre politikası, sorumluluk ve yetki tanımları, Designated Person Ashore (DPA) atanması, acil duruma hazırlıklılık, kaza/olay raporlama, bakım prosedürleri, dokümantasyon ve iç denetim."] },
        { heading: "Sertifikalar", paragraphs: [], table: { headers: ["Sertifika", "Verilen", "Geçerlilik"], rows: [["DOC (Document of Compliance)", "Şirket", "5 yıl (yıllık doğrulama)"], ["SMC (Safety Management Certificate)", "Gemi", "5 yıl (ara doğrulama)"]] } }
      ],
      keyPoints: ["ISM Code SOLAS Chapter IX ile zorunlu kılınmıştır.", "DPA, şirket ile gemi arasında güvenlik köprüsüdür.", "SMS'in etkin uygulanmaması gemi alıkonulmasına neden olabilir."]
    },
    "Risk değerlendirme (Risk Assessment)": {
      title: "Risk Değerlendirme (Risk Assessment)",
      introduction: "Risk değerlendirme, işe başlamadan önce olası tehlikelerin belirlenmesi ve kontrol önlemlerinin planlanması sürecidir.",
      sections: [
        { heading: "Risk Değerlendirme Süreci", paragraphs: ["1. Tehlikeleri belirle: İş adımlarını analiz ederek olası tehlikeleri listele.", "2. Risk seviyesini değerlendir: Olasılık × Şiddet = Risk skoru.", "3. Kontrol önlemlerini belirle: Eliminasyon, ikame, mühendislik kontrolü, idari kontrol, KKD.", "4. Artık riski değerlendir: Önlemlerden sonra kalan risk kabul edilebilir mi?", "5. Kayıt ve iletişim: Risk değerlendirmesini belgele ve ilgili personele bildir."] },
        { heading: "Risk Matrisi", paragraphs: [], table: { headers: ["Olasılık \\ Şiddet", "Düşük", "Orta", "Yüksek", "Çok Yüksek"], rows: [["Olası", "Orta", "Yüksek", "Çok Yüksek", "Kabul Edilemez"], ["Muhtemel", "Düşük", "Orta", "Yüksek", "Çok Yüksek"], ["Nadir", "Düşük", "Düşük", "Orta", "Yüksek"], ["Çok nadir", "Düşük", "Düşük", "Düşük", "Orta"]] } }
      ],
      keyPoints: ["Risk değerlendirmesi her iş için yapılmalıdır.", "ALARP (As Low As Reasonably Practicable) prensibi uygulanır.", "Dinamik risk değerlendirmesi değişen koşullara göre güncellenir."]
    },
    "İş izin sistemi (Permit to Work)": {
      title: "İş İzin Sistemi (Permit to Work)",
      introduction: "İş izin sistemi, yüksek riskli faaliyetlerin kontrollü koşullarda yürütülmesini sağlayan resmi yetkilendirme mekanizmasıdır.",
      sections: [
        { heading: "İzin Türleri", paragraphs: [], table: { headers: ["İzin Türü", "Uygulama", "Ek Gereklilik"], rows: [["Sıcak iş izni", "Kaynak, kesme, taşlama", "Yangın gözcüsü, söndürücü"], ["Kapalı alan giriş izni", "Tank, void space girişi", "Atmosfer testi, gözetim"], ["Elektrik çalışma izni", "Pano, kablo bakımı", "İzolasyon, LOTO"], ["Yüksekte çalışma izni", "İskele, çatı çalışması", "Emniyet kemeri, ağ"]] } },
        { heading: "LOTO (Lock Out / Tag Out)", paragraphs: ["Bakım yapılan ekipmanın kazara çalıştırılmasını önleyen fiziksel kilitleme ve etiketleme sistemidir. Kilit yalnızca takan kişi tarafından çıkarılabilir. Enerji kaynağının izolasyonu: elektrik, hidrolik, pnömatik, termal."] }
      ],
      keyPoints: ["İzin, yetkili kişi tarafından imzalanmadan iş başlatılamaz.", "İzin süresi dolduğunda iş durdurulmalı ve izin yenilenmelidir.", "LOTO uygulanmadan bakım yapılması ölümcül kazalara neden olabilir."]
    },
    "Kaza raporlama ve kök neden analizi": {
      title: "Kaza Raporlama ve Kök Neden Analizi",
      introduction: "Her kaza ve olay, tekrarının önlenmesi için sistematik olarak raporlanmalı ve analiz edilmelidir.",
      sections: [
        { heading: "Raporlama Süreci", paragraphs: ["1. İlk müdahale ve acil tedavi.", "2. Olay yerinin güvenceye alınması ve delillerin korunması.", "3. İlk rapor: ne, nerede, ne zaman, kim, nasıl.", "4. Kaptan/Baş mühendise bildirim, şirkete (DPA) rapor.", "5. Bayrak devletine bildirim (ciddi kazalarda zorunlu)."] },
        { heading: "Kök Neden Analizi", paragraphs: ["5 Neden (5 Why): 'Neden oldu?' sorusunu tekrarlayarak yüzeysel nedenlerden kök nedene ulaşma.", "Balık kılçığı diyagramı (Ishikawa): İnsan, makine, malzeme, yöntem, çevre kategorilerinde nedenleri sınıflandırma.", "Kök neden genellikle prosedür eksikliği, eğitim yetersizliği veya sistem tasarım hatası gibi sistemik sorunlardır."] }
      ],
      keyPoints: ["Near-miss raporlaması kaza önlemenin en etkin aracıdır.", "Suçlama kültürü raporlamayı engeller; adil kültür (just culture) desteklenmelidir.", "Düzeltici ve önleyici aksiyonlar (CAPA) izlenmelidir."]
    },
    "Toolbox meeting ve güvenlik brifingi": {
      title: "Toolbox Meeting ve Güvenlik Brifingi",
      introduction: "Toolbox meeting, iş öncesinde yapılan kısa güvenlik toplantısıdır. Ekibin tehlikeleri, kontrol önlemlerini ve acil durum prosedürlerini gözden geçirmesini sağlar.",
      sections: [
        { heading: "Toolbox Meeting İçeriği", paragraphs: [], bulletPoints: ["Yapılacak işin tanımı ve kapsamı", "Risk değerlendirmesinin paylaşılması", "Gerekli KKD'nin belirlenmesi", "İş izni (PTW) kontrolü", "Acil durum prosedürünün hatırlatılması", "İletişim düzeninin belirlenmesi", "Soruların yanıtlanması ve onay"] },
        { heading: "Güvenlik Brifingi", paragraphs: ["Vardiya başlangıcında veya operasyonel değişikliklerde kısa güvenlik brifingi yapılır. İçerik: güncel tehlikeler, devam eden bakım işleri, hava/deniz durumu etkileri, özel dikkat gerektiren konular."] }
      ],
      keyPoints: ["Toolbox meeting 5-15 dakika sürer ve kayıt altına alınır.", "Tüm katılımcılar imza ile katılımı teyit eder.", "Etkin toolbox meeting kaza oranını önemli ölçüde azaltır."]
    },
    "Near-miss raporlama": {
      title: "Near-Miss Raporlama",
      introduction: "Near-miss, yaralanma veya hasarla sonuçlanmayan ancak potansiyel olarak sonuçlanabilecek olan istenmeyen olaydır.",
      sections: [
        { heading: "Önemi", paragraphs: ["Heinrich piramidine göre her ciddi kaza öncesinde yaklaşık 300 near-miss yaşanır. Near-miss raporlaması, kaza gerçekleşmeden önce tehlikelerin tespit edilmesini ve önlem alınmasını sağlar.", "Etkili near-miss raporlama sistemi güvenlik kültürünün olgunluk göstergesidir."] },
        { heading: "Raporlama Sistemi", paragraphs: ["Near-miss raporları anonim veya isim belirtilerek yapılabilir. Rapor; olayın tanımı, yeri, zamanı, olası sonuçları ve önerilen önlemleri içerir.", "Raporlar DPA tarafından analiz edilir ve tüm filodaki gemilere güvenlik bülteni olarak dağıtılır."] }
      ],
      keyPoints: ["Near-miss raporlayan kişi cezalandırılmamalıdır.", "Yüksek near-miss raporlama oranı iyi bir güvenlik kültürü göstergesidir.", "ISM Code kapsamında near-miss raporlama prosedürü olmalıdır."]
    },
    "Biyolojik tehlikeler ve önlemler": {
      title: "Biyolojik Tehlikeler ve Önlemler",
      introduction: "Gemi ortamında çeşitli biyolojik tehlikeler sağlık riski oluşturabilir. Tropikal bölgelerde bu riskler artar.",
      sections: [
        { heading: "Biyolojik Tehlike Kaynakları", paragraphs: [], bulletPoints: ["Legionella bakterisi: Soğutma kuleleri ve klima sistemlerinde ürer; Legionella hastalığına neden olur.", "Pis su ve atık su: Hepatit, kolera gibi bulaşıcı hastalıklar.", "Kemirgenler ve böcekler: Hıfzıssıhha riski ve gıda kontaminasyonu.", "Küf: Nemli alanlarda oluşan küf sporları solunum yolu hastalıklarına neden olur.", "Kan ve vücut sıvıları: İlk yardımda bulaşıcı hastalık riski."] },
        { heading: "Önlemler", paragraphs: ["Su sistemi bakımı (Legionella kontrolü için 60°C üzeri sıcaklık veya klorlama). Kişisel hijyen ve el yıkama. Biyolojik tehlike içeren alanlarda uygun KKD (eldiven, maske). İlk yardımda tek kullanımlık eldiven kullanımı."] }
      ],
      keyPoints: ["Legionella riski düzenli su sistemi bakımı ile kontrol altına alınır.", "Tropikal limanlardan gelen haşereler fumigasyon gerektirebilir.", "IHR (International Health Regulations) gereği gemi sağlık sertifikası zorunludur."]
    }
  }
};

export default content6;
