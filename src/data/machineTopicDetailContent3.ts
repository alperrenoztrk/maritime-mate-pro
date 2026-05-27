import type { MachineSubTopicContent } from "./machineTopicDetailContent";

type ContentMap = Record<string, Record<string, MachineSubTopicContent>>;

const content3: ContentMap = {
  // ═══════════════════════════════════════════════════════════════
  // SOĞUTMA VE KLİMA SİSTEMLERİ (Tamamı yeni)
  // ═══════════════════════════════════════════════════════════════
  "cooling-hvac": {
    "Soğutma çevrimi bileşenleri": {
      title: "Soğutma Çevrimi Bileşenleri",
      introduction: "Buhar sıkıştırmalı soğutma çevrimi, gemi soğutma ve klima sistemlerinin temelini oluşturur. Dört ana bileşenden meydana gelir ve termodinamiğin ters çevrim prensibine dayanır.",
      sections: [
        { heading: "Çevrimin Dört Ana Bileşeni", paragraphs: ["Kompresör: Düşük basınçlı soğutucu akışkan gazını yüksek basınca sıkıştırır. Buhar fazındaki akışkana mekanik enerji aktarılır.", "Kondenser: Yüksek basınçlı ve sıcak gaz, deniz suyuyla soğutularak sıvılaştırılır. Akışkan ısısını deniz suyuna verir.", "Genleşme valfi: Yüksek basınçlı sıvı akışkan, düşük basınca kısılarak sıcaklığı düşürülür. Sıvı-buhar karışımı oluşur.", "Evaporatör: Düşük basınçlı akışkan, soğutulacak ortamdan ısı çekerek buharlaşır. Bu bileşen soğutma etkisini sağlar."] },
        { heading: "Çevrim Süreci", paragraphs: ["1→2: Kompresörde izentropik sıkıştırma (düşük basınçlı kuru doymuş buhardan yüksek basınçlı kızgın buhara).", "2→3: Kondenserde izobarik ısı atımı (kızgın buhardan doymuş sıvıya).", "3→4: Genleşme valfinde izoentalpik genleşme (yüksek basınçlı sıvıdan düşük basınçlı yaş buhara).", "4→1: Evaporatörde izobarik ısı alımı (yaş buhardan kuru doymuş buhara)."] }
      ],
      keyPoints: ["Soğutma etkisi evaporatörde gerçekleşir.", "Kondenserde atılan ısı = evaporatörde alınan ısı + kompresör işi.", "Gemi soğutma sistemlerinde deniz suyu kondenser soğutma ortamıdır."]
    },
    "Kompresör tipleri (pistonlu, vidalı)": {
      title: "Kompresör Tipleri",
      introduction: "Soğutma kompresörleri, soğutucu akışkanı düşük basınçtan yüksek basınca sıkıştırarak çevrimi sürdüren ana bileşendir.",
      sections: [
        { heading: "Pistonlu Kompresör", paragraphs: ["Gemi soğutma sistemlerinde en yaygın tiptir. Piston-silindir düzeniyle çalışır. Emme ve basma valfleri akış yönünü kontrol eder.", "Tek kademeli kompresörler düşük basınç oranları için, iki kademeli kompresörler düşük sıcaklık uygulamaları (−35°C ve altı) için kullanılır."] },
        { heading: "Vidalı Kompresör", paragraphs: ["İki helisel rotor (erkek ve dişi) arasında sıkıştırma yapılır. Sürekli ve düzgün basınç sağlar. Yüksek kapasiteli klima ve merkezi soğutma sistemlerinde tercih edilir.", "Kapasite kontrolü sürgü valf (slide valve) ile sürekli ayarlanabilir (%10-100 arası)."], table: { headers: ["Özellik", "Pistonlu", "Vidalı"], rows: [["Kapasite", "Küçük-orta", "Orta-büyük"], ["Verim", "İyi", "Çok iyi"], ["Titreşim", "Yüksek", "Düşük"], ["Bakım", "Valf değişimi", "Rotor boşluk kontrolü"], ["Yağlama", "Karter yağı", "Yağ enjeksiyonlu"], ["Kapasite kontrolü", "Kademeli (silindir devre dışı)", "Sürekli (slide valve)"]] } }
      ],
      keyPoints: ["Pistonlu kompresör gemilerde en yaygın tiptir.", "Vidalı kompresör büyük kapasiteli sistemlerde verimlidir.", "Scroll ve santrifüj kompresörler özel uygulamalarda kullanılır."]
    },
    "Kondenser ve evaporatör": {
      title: "Kondenser ve Evaporatör",
      introduction: "Kondenser ve evaporatör, soğutma çevriminin ısı transfer elemanlarıdır. Kondenser ısıyı atar, evaporatör ısıyı alır.",
      sections: [
        { heading: "Kondenser", paragraphs: ["Gemi soğutma sistemlerinde genellikle kabuk-boru (shell & tube) tip kondenser kullanılır. Soğutucu akışkan kabuk tarafında yoğunlaşırken, deniz suyu borulardan geçer.", "Deniz suyu giriş sıcaklığı kondenserin performansını doğrudan etkiler. Tropikal bölgelerde (32°C) kapasite düşer."] },
        { heading: "Evaporatör", paragraphs: ["Direkt genleşme (DX) tipi evaporatörlerde soğutucu akışkan boruların içinden geçer ve dışarıdaki hava veya sıvıyı soğutur.", "Bir diğer tip, sıvı soğutucu banyosu içinde boruların geçtiği ve soğutulacak sıvının (tuzlu su/brine veya glikol) boruların içinden aktığı shell & tube evaporatördür."], table: { headers: ["Tip", "Kullanım", "Soğutma Ortamı"], rows: [["DX (Direkt genleşme)", "Provizyon soğutma", "Hava"], ["Shell & tube", "Merkezi soğutma", "Brine/Glikol"], ["Plakalı", "Küçük kapasiteler", "Su/Glikol"]] } }
      ],
      keyPoints: ["Kondenserde deniz suyu fouling'i periyodik temizlik gerektirir.", "Evaporatör yüzeyinde buz oluşumu performansı düşürür; defrost gerekir.", "Soğutucu akışkan kaçağı evaporatörde en sık oluşur."]
    },
    "Genleşme valfi (TXV, EEV)": {
      title: "Genleşme Valfi",
      introduction: "Genleşme valfi, yüksek basınçlı sıvı soğutucu akışkanın basıncını ve sıcaklığını düşürerek evaporatöre kontrollü besleme yapan bileşendir.",
      sections: [
        { heading: "Termostatik Genleşme Valfi (TXV)", paragraphs: ["Evaporatör çıkışındaki kızgınlık derecesine (superheat) göre açıklığını ayarlar. Evaporatör çıkışına bağlanan termik ampul, sıcaklık değişimini algılar ve valf memranına basınç uygular.", "Kızgınlık derecesi genellikle 5-8 K olarak ayarlanır. Düşük kızgınlık sıvı dönüşüne, yüksek kızgınlık evaporatör yetersiz kullanımına neden olur."] },
        { heading: "Elektronik Genleşme Valfi (EEV)", paragraphs: ["Step motor veya pulse motor ile tahrik edilen elektronik valf, PID kontrol algoritmasıyla kızgınlık derecesini hassas biçimde kontrol eder.", "TXV'ye göre daha geniş çalışma aralığı ve daha hassas kontrol sağlar. Modern gemi soğutma sistemlerinde giderek yaygınlaşmaktadır."] }
      ],
      keyPoints: ["TXV basit ve güvenilirdir; mekanik olarak çalışır.", "EEV hassas kontrol sağlar ancak elektrik beslemesi gerektirir.", "Kılcal boru (capillary tube) yalnızca küçük kapasiteli ev tipi sistemlerde kullanılır."]
    },
    "Mollier (P-h) diyagramı okuma": {
      title: "Mollier (P-h) Diyagramı Okuma",
      introduction: "Basınç-entalpi (P-h) diyagramı, soğutma çevriminin analiz edilmesinde kullanılan temel termodinamik grafiktir. Her soğutucu akışkanın kendine özgü P-h diyagramı vardır.",
      sections: [
        { heading: "Diyagram Bölgeleri", paragraphs: ["Sol doyma eğrisinin solunda: Alt soğutulmuş (subcooled) sıvı bölgesi.", "İki eğri arasında: Yaş buhar (iki fazlı karışım) bölgesi.", "Sağ doyma eğrisinin sağında: Kızgın (superheated) buhar bölgesi.", "Yatay eksen entalpi (kJ/kg), dikey eksen basınç (bar) veya log(P) gösterir."] },
        { heading: "Çevrim Analizi", paragraphs: ["1→2 (Kompresör): Basınç artar, entalpi artar. Sağa ve yukarı doğru eğri.", "2→3 (Kondenser): Basınç sabit, entalpi azalır. Sola doğru yatay çizgi.", "3→4 (Genleşme): Entalpi sabit, basınç düşer. Aşağı doğru dikey çizgi.", "4→1 (Evaporatör): Basınç sabit, entalpi artar. Sağa doğru yatay çizgi."], formula: { expression: "Soğutma etkisi (q₀) = h₁ − h₄\nKompresör işi (w) = h₂ − h₁\nCOP = q₀ / w = (h₁ − h₄) / (h₂ − h₁)", variables: ["h₁: Evaporatör çıkışı entalpisi", "h₂: Kompresör çıkışı entalpisi", "h₃ = h₄: Kondenser çıkışı entalpisi"] } }
      ],
      keyPoints: ["Soğutma etkisi evaporatördeki entalpi farkıdır.", "Genleşmede entalpi değişmez (izoentalpik).", "P-h diyagramı soğutma sistemi arıza teşhisinde kritik bir araçtır."]
    },
    "COP (Performans Katsayısı) hesabı": {
      title: "COP (Performans Katsayısı) Hesabı",
      introduction: "COP (Coefficient of Performance), soğutma sisteminin verimini ifade eden boyutsuz bir büyüklüktür. Soğutma etkisinin kompresöre verilen iş enerjisine oranıdır.",
      sections: [
        { heading: "COP Hesabı", paragraphs: ["Soğutma COP'u, evaporatörde alınan ısının kompresör tarafından harcanan iş enerjisine oranıdır. Isı pompası COP'u ise kondenserde atılan ısının kompresör işine oranıdır."], formula: { expression: "COP_soğutma = Q_evaporatör / W_kompresör = (h₁ − h₄) / (h₂ − h₁)\nCOP_ısıpompası = COP_soğutma + 1", variables: ["Q_evap: Soğutma kapasitesi (kW)", "W_komp: Kompresör gücü (kW)"] }, example: { problem: "Bir gemi provizyon soğutma sisteminde evaporatörde 50 kW ısı alınıyor ve kompresör 18 kW güç tüketiyor. COP değerini hesaplayınız.", steps: ["COP = Q_evap / W_komp = 50 / 18 = 2.78"], result: "COP = 2.78, yani harcanan her 1 kW elektrik enerjisi karşılığında 2.78 kW soğutma etkisi elde edilmektedir." } }
      ],
      keyPoints: ["Tipik gemi soğutma sistemlerinde COP 2-5 arasındadır.", "COP yükseldikçe sistem daha verimlidir.", "Evaporatör sıcaklığı düştükçe COP düşer."]
    },
    "CFC, HCFC ve HFC soğutucu gazlar": {
      title: "CFC, HCFC ve HFC Soğutucu Gazlar",
      introduction: "Soğutucu akışkanlar, soğutma çevriminde ısı taşıyıcı olarak görev yapan kimyasal maddelerdir. Çevresel etkileri nedeniyle nesiller halinde sınıflandırılır.",
      sections: [
        { heading: "Nesil Sınıflandırması", paragraphs: [], table: { headers: ["Nesil", "Kimyasal", "Örnek", "ODP", "GWP", "Durum"], rows: [["CFC", "Klor-Flor-Karbon", "R-12, R-11", "1.0", "10890", "Yasaklı (1996)"], ["HCFC", "Hidro-Klor-Flor-Karbon", "R-22", "0.055", "1810", "Aşamalı çıkış (2030)"], ["HFC", "Hidro-Flor-Karbon", "R-134a, R-404A", "0", "1430-3922", "Kigali ile sınırlanıyor"], ["HFO", "Hidro-Flor-Olefin", "R-1234yf", "0", "4", "Yeni nesil alternatif"], ["Doğal", "NH₃, CO₂, HC", "R-717, R-744", "0", "0-3", "Artan kullanım"]] } },
        { heading: "Gemi Uygulamaları", paragraphs: ["Mevcut ticari gemilerin çoğunda R-404A (orta/düşük sıcaklık), R-134a (klima) ve R-407C kullanılmaktadır. Yeni inşa gemilerde R-744 (CO₂) ve R-717 (amonyak) kullanımı artmaktadır."] }
      ],
      keyPoints: ["ODP > 0 olan soğutucu gazlar ozon tabakasına zararlıdır.", "GWP sera etkisi potansiyelini gösterir; düşük GWP tercih edilir.", "Gemi soğutucu gaz kayıtları ODS Record Book'a işlenir."]
    },
    "Doğal soğutucu akışkanlar (CO₂, NH₃)": {
      title: "Doğal Soğutucu Akışkanlar",
      introduction: "Doğal soğutucu akışkanlar, çevresel etkileri minimumdur ve sentetik alternatiflere göre termodinamik açıdan avantajlıdır.",
      sections: [
        { heading: "CO₂ (R-744)", paragraphs: ["Transkritik çevrimde çalışır (kritik sıcaklık 31°C, kritik basınç 73.8 bar). Yüksek çalışma basıncı (80-130 bar) nedeniyle özel ekipman gerektirir.", "Gemi soğutma sistemlerinde özellikle balıkçı gemileri ve konteyner gemisi reefer sistemlerinde yaygınlaşmaktadır. Toksik ve yanıcı değildir."] },
        { heading: "Amonyak (R-717)", paragraphs: ["Mükemmel termodinamik özelliklere sahiptir; COP değeri yüksektir. Büyük kapasiteli endüstriyel ve gemi soğutma tesislerinde kullanılır.", "Toksik ve yanıcı olması nedeniyle özel güvenlik önlemleri gerektirir. SOLAS Reg. II-2 kapsamında makine dairesi dışında konumlandırılmalıdır."], table: { headers: ["Özellik", "CO₂ (R-744)", "NH₃ (R-717)"], rows: [["ODP / GWP", "0 / 1", "0 / 0"], ["Toksik", "Hayır (yüksek konsantrasyonda boğucu)", "Evet"], ["Yanıcı", "Hayır", "Evet (hafif)"], ["Çalışma basıncı", "Çok yüksek", "Orta"], ["COP", "İyi", "Çok iyi"], ["Gemi kullanımı", "Artan (reefer)", "Sınırlı (büyük balıkçı)"]] } }
      ],
      keyPoints: ["CO₂ transkritik çevrimde gaz soğutucusu (gas cooler) kullanılır, kondenser değil.", "Amonyak kaçağı algılama sistemi zorunludur.", "Propan (R-290) küçük kapasiteli sistemlerde alternatiftir ancak yanıcıdır."]
    },
    "ODP ve GWP kavramları": {
      title: "ODP ve GWP Kavramları",
      introduction: "Soğutucu akışkanların çevresel etkisi iki ana gösterge ile değerlendirilir: Ozon Tüketme Potansiyeli (ODP) ve Küresel Isınma Potansiyeli (GWP).",
      sections: [
        { heading: "ODP (Ozone Depletion Potential)", paragraphs: ["ODP, bir maddenin ozon tabakasına verdiği zararın R-11 (CFC-11) ile karşılaştırılmasıdır. R-11'in ODP değeri 1.0 olarak referans alınır.", "Klor veya brom atomu içeren maddeler ozon tabakasına zarar verir. HFC ve doğal soğutucu akışkanların ODP değeri sıfırdır."] },
        { heading: "GWP (Global Warming Potential)", paragraphs: ["GWP, bir maddenin 100 yıllık periyotta atmosferde tuttuğu ısının CO₂ ile karşılaştırılmasıdır. CO₂'nin GWP değeri 1'dir.", "Kigali Değişikliği (2016) ile HFC'lerin kullanımı kademeli olarak %80-85 oranında azaltılacaktır."] }
      ],
      keyPoints: ["ODP = 0 olan maddeler ozon tabakasına zarar vermez.", "Düşük GWP'li soğutucu akışkanlara geçiş zorunludur.", "EU F-Gas Regulation, yüksek GWP'li gazların kullanımını sınırlar."]
    },
    "Montreal ve Kigali protokolleri": {
      title: "Montreal ve Kigali Protokolleri",
      introduction: "Montreal Protokolü ozon tabakasını koruyan, Kigali Değişikliği ise küresel ısınmayı azaltmayı hedefleyen uluslararası anlaşmalardır.",
      sections: [
        { heading: "Montreal Protokolü (1987)", paragraphs: ["CFC'lerin 1996'da, HCFC'lerin 2030'a kadar (gelişmiş ülkelerde 2020) kademeli olarak yasaklanmasını öngörür.", "Denizcilik sektöründe R-12 ve R-22 içeren sistemlerin dönüştürülmesi veya değiştirilmesi zorunludur."] },
        { heading: "Kigali Değişikliği (2016)", paragraphs: ["HFC'lerin küresel ısınma etkisini azaltmak amacıyla üretim ve tüketiminin kademeli azaltımını öngörür.", "Gelişmiş ülkeler 2036'ya kadar %85, gelişmekte olan ülkeler 2045-2047'ye kadar %80 azaltım hedefindedir."] }
      ],
      keyPoints: ["Montreal Protokolü çevre tarihinin en başarılı anlaşmasıdır.", "Gemi soğutucu gaz envanterleri bayrak devleti tarafından denetlenir.", "ODS Record Book gemide bulundurulması zorunlu dokümandır."]
    },
    "Soğutucu akışkan şarj ve geri kazanım": {
      title: "Soğutucu Akışkan Şarj ve Geri Kazanım",
      introduction: "Soğutucu akışkan şarjı ve geri kazanımı, çevresel düzenlemelere uygun olarak yapılması gereken teknik bir operasyondur.",
      sections: [
        { heading: "Şarj Prosedürü", paragraphs: ["Sistem vakum altında iken sıvı fazda veya düşük basınç tarafından buhar fazda şarj yapılır. Şarj miktarı üretici tavsiyesine göre belirlenir.", "Aşırı şarj: Yüksek kondenser basıncı, kompresör aşırı yüklenmesi. Yetersiz şarj: Düşük soğutma kapasitesi, kızgınlık artışı."] },
        { heading: "Geri Kazanım", paragraphs: ["Soğutucu akışkan atmosfere salınamaz; onaylı geri kazanım ünitesiyle toplanmalıdır. Toplanan akışkan arıtılarak tekrar kullanılabilir veya imha edilir.", "EU Regulation 517/2014 ve MARPOL kuralları gereği kaçak kontrolü zorunludur."] }
      ],
      keyPoints: ["Soğutucu gazın atmosfere salınması yasaktır.", "Şarj miktarı sight glass ve kızgınlık derecesiyle kontrol edilir.", "Yıllık kaçak kontrolü zorunludur; kaçak oranı %3'ü geçmemelidir."]
    },
    "Provizyon soğuk hane sistemi": {
      title: "Provizyon Soğuk Hane Sistemi",
      introduction: "Gemi provizyon soğutma sistemi, yiyecek ve içeceklerin uygun sıcaklıkta saklanmasını sağlayan zorunlu sistemdir.",
      sections: [
        { heading: "Soğutma Bölmeleri", paragraphs: [], table: { headers: ["Bölme", "Sıcaklık", "Depolanan Ürün"], rows: [["Soğuk oda (chill)", "+2 ila +4°C", "Sebze, meyve, süt ürünleri"], ["Et odası", "−18 ila −25°C", "Et, balık, donmuş gıda"], ["Dondurucu", "−25 ila −30°C", "Uzun süreli depolama"], ["Sebze odası", "+8 ila +12°C", "Patates, soğan"]] } },
        { heading: "Sistem Özellikleri", paragraphs: ["Her bölme bağımsız evaporatör ve termostat ile kontrol edilir. Defrost (buz çözme) zamanlayıcı ile otomatik olarak yapılır.", "Kapılar izoleli ve manyetik contayla donatılmıştır. İç taraftan açılabilen acil çıkış mekanizması ve alarm butonu bulunur."] }
      ],
      keyPoints: ["Soğuk hane sıcaklıkları günlük olarak kaydedilir.", "Kapı sürekli açık kalmayacak şekilde kullanılmalıdır.", "Soğuk hane içinde hapsolma ihtimaline karşı alarm sistemi zorunludur."]
    },
    "Konteyner (reefer) soğutma": {
      title: "Konteyner (Reefer) Soğutma",
      introduction: "Reefer konteynerler, kendi soğutma ünitesine sahip yalıtılmış taşıma birimleridir. Gemi elektrik sistemi üzerinden beslenir.",
      sections: [
        { heading: "Reefer Konteyner Özellikleri", paragraphs: ["Her konteyner kendi kompresörü, kondenseri, evaporatörü ve kontrol ünitesine sahiptir. 440V / 60Hz (veya 380V / 50Hz) gemi prizlerinden beslenir.", "Sıcaklık ayar aralığı genellikle −30°C ile +30°C arasındadır. Taze meyve için +2°C, dondurulmuş ürünler için −18°C tipik ayarlardır."], table: { headers: ["Parametre", "Değer"], rows: [["Güç tüketimi", "4-10 kW/konteyner"], ["Soğutucu akışkan", "R-134a veya R-404A"], ["Hava sirkülasyonu", "Alt girişli, üst çıkışlı"], ["İzolasyon", "Poliüretan köpük, 65-75 mm"]] } },
        { heading: "Gemi Elektrik Yükü", paragraphs: ["Büyük konteyner gemileri 1000+ reefer prizi taşıyabilir. Bu durum jeneratör kapasitesini doğrudan etkiler. Reefer yük planlaması elektrik yük dengeleme açısından kritiktir."] }
      ],
      keyPoints: ["Reefer konteyner arızası yük hasarına ve tazminat talebine neden olur.", "Pre-trip inspection (PTI) yükleme öncesi zorunludur.", "Sıcaklık kayıtları sürekli olarak data logger ile tutulur."]
    },
    "Merkezi soğutma suyu sistemi": {
      title: "Merkezi Soğutma Suyu Sistemi",
      introduction: "Gemilerde merkezi soğutma suyu sistemi, tüm ısı eşanjörlerinin soğutma ihtiyacını karşılayan entegre sistemdir.",
      sections: [
        { heading: "Sistem Yapısı", paragraphs: ["Düşük sıcaklık (LT) devresi: Deniz suyu ile plakalı ısı eşanjöründe soğutulan tatlı su, yardımcı soğutuculara (yağ soğutucu, şarj havası soğutucu, klima kondenseri) dağıtılır. LT devresi sıcaklığı 36°C civarında tutulur.", "Yüksek sıcaklık (HT) devresi: Ana makine silindir kapağı ve liner soğutması. HT devresi sıcaklığı 80-85°C civarındadır. HT devresinden atık ısı, evaporatör veya ısıtma amacıyla kullanılabilir."] },
        { heading: "Avantajlar", paragraphs: ["Deniz suyu ile doğrudan temas eden ekipman sayısı azaltılarak korozyon riski düşürülür. Soğutma suyu kalitesi kimyasal işlem ile kontrol altında tutulur."] }
      ],
      keyPoints: ["Merkezi soğutma deniz suyu borularındaki korozyonu minimize eder.", "Üç yollu termostatik valf ile sıcaklık kontrolü yapılır.", "Soğutma suyu kimyasalları (inhibitör) periyodik olarak kontrol edilir."]
    },
    "Ana makine ve yardımcı soğutma": {
      title: "Ana Makine ve Yardımcı Soğutma",
      introduction: "Ana makine ve yardımcı makinelerin güvenli çalışması için silindir, piston, yağlama yağı ve şarj havasının etkin biçimde soğutulması gerekir.",
      sections: [
        { heading: "Ana Makine Soğutma Devreleri", paragraphs: ["HT devresi: Silindir kapağı, liner ve turboşarj soğutması. Çıkış sıcaklığı 80-85°C.", "LT devresi: Yağlama yağı soğutucusu ve şarj havası soğutucusu. Giriş sıcaklığı 36°C.", "Piston soğutması: Büyük iki zamanlı motorlarda pistonlar yağ veya su ile soğutulur."] },
        { heading: "Yardımcı Makine Soğutma", paragraphs: ["Yardımcı dizel motorlar genellikle kendi HT/LT devresine sahiptir veya merkezi sisteme bağlıdır. Soğutma suyu sıcaklık alarmı ve otomatik yavaşlama/durdurma koruması bulunur."] }
      ],
      keyPoints: ["Soğutma suyu kaybı motor hasarına neden olan en yaygın arızadır.", "HT devresi termostatı çıkış sıcaklığını sabit tutar.", "Şarj havası soğutucusunun tıkanması motor gücünü düşürür."]
    },
    "Soğutma sistemi alarm ve korumaları": {
      title: "Soğutma Sistemi Alarm ve Korumaları",
      introduction: "Soğutma sistemi arızaları yük hasarına veya motor hasarına yol açabilir. Alarm ve otomatik koruma sistemleri güvenliği sağlar.",
      sections: [
        { heading: "Tipik Alarmlar", paragraphs: [], table: { headers: ["Alarm", "Sebep", "Müdahale"], rows: [["Yüksek basma basıncı", "Kirli kondenser, fazla şarj", "Kondenser temizle, şarj kontrol"], ["Düşük emme basıncı", "Yetersiz şarj, TXV arızası", "Kaçak kontrolü, TXV kontrol"], ["Yüksek soğutucu gaz sıcaklığı", "Kompresör sorunu", "Kompresör kontrolü"], ["Düşük yağ basıncı", "Yağ kaçağı, pompa arızası", "Yağ seviye kontrolü"], ["Kompresör trip", "Koruma devreye girdi", "Neden araştırılır"]] } },
        { heading: "Otomatik Korumalar", paragraphs: ["Yüksek basınç kesici (HP cutout): Kompresörü durdurur. Düşük basınç kesici (LP cutout): Kompresörü durdurur. Yağ basınç fark kesici: Yağlama yetersizse kompresörü durdurur. Motor aşırı yük koruma: Kompresör motorunu korur."] }
      ],
      keyPoints: ["HP ve LP cutout ayarları üretici tavsiyesine göre yapılır.", "Koruma devrelerinin bypass edilmesi kesinlikle yasaktır.", "Alarm logları arıza teşhisinde önemli bilgi sağlar."]
    },
    "Klima sistemi bileşenleri": {
      title: "Klima Sistemi Bileşenleri",
      introduction: "Gemi klima sistemi, yaşam ve çalışma alanlarında konforlu sıcaklık ve nem koşulları sağlayan iklimlendirme sistemidir.",
      sections: [
        { heading: "Ana Bileşenler", paragraphs: ["Soğutma ünitesi: Chiller veya DX sistem. Soğutulmuş su (chilled water) veya doğrudan soğutucu akışkan kullanır.", "Hava işleme ünitesi (AHU): Hava filtreleme, soğutma/ısıtma ve nemlendirme/nem alma işlemlerini yapar.", "Kanal sistemi: İşlenmiş havayı kompartımanlara dağıtır.", "Termostat ve kontrol: Her bölgedeki sıcaklık bireysel veya merkezi olarak kontrol edilir.", "Taze hava girişi: IMO/SOLAS kurallarına göre minimum taze hava miktarı sağlanır."] }
      ],
      keyPoints: ["SOLAS gereği köprüüstü ve makine kontrol odası iklimlendirme zorunludur.", "Taze hava oranı kişi başına minimum 30 m³/h olmalıdır.", "Klima sistemi yangın damperleri ile entegre çalışır."]
    },
    "Hava işleme ünitesi (AHU)": {
      title: "Hava İşleme Ünitesi (AHU)",
      introduction: "AHU, klima sisteminin kalbi olup havayı filtreleyerek, soğutarak veya ısıtarak ve nem kontrolü yaparak konfora uygun hale getirir.",
      sections: [
        { heading: "AHU Bileşenleri", paragraphs: ["Filtre bölümü: Toz ve partikül tutma. Genellikle G4-F7 sınıfı filtreler kullanılır.", "Soğutma serpantini: Chilled water veya DX evaporatör ile hava soğutulur.", "Isıtma serpantini: Sıcak su veya buhar ile hava ısıtılır.", "Fan bölümü: Santrifüj fan ile hava kanal sistemine basılır.", "Karışım bölümü: Taze hava ve resirkülasyon havası karıştırılır."] },
        { heading: "Kontrol", paragraphs: ["Çıkış havası sıcaklığı termostatik kontrol valfi veya VFD fan hız kontrolü ile ayarlanır. Resirkülasyon oranı enerji tasarrufu için optimize edilir."] }
      ],
      keyPoints: ["Filtreler periyodik olarak temizlenir veya değiştirilir.", "Soğutma serpantininde yoğuşan su drenaj tavası ile toplanır.", "AHU bakımı iç hava kalitesini doğrudan etkiler."]
    },
    "Soğutma ve ısıtma serpantinleri": {
      title: "Soğutma ve Isıtma Serpantinleri",
      introduction: "Serpantinler, AHU içinde havanın sıcaklığını değiştiren ısı transfer elemanlarıdır.",
      sections: [
        { heading: "Soğutma Serpantini", paragraphs: ["Bakır veya bakır-nikel boru üzerine alüminyum kanatçıklar (fin) monte edilmiştir. İçinden chilled water (6-12°C) veya soğutucu akışkan geçer.", "Hava serpantin üzerinden geçerken soğur ve nem yoğuşması (dehumidification) gerçekleşir. Yoğuşan su drenaj tavasına akar."] },
        { heading: "Isıtma Serpantini", paragraphs: ["Sıcak su (80-90°C) veya düşük basınçlı buhar ile çalışır. Soğuk iklimlerde havanın ısıtılması ve nem kontrolü için kullanılır.", "Buhar serpantinlerinde kondensatör pot (steam trap) ile yoğuşan su toplanır."] }
      ],
      keyPoints: ["Serpantin kanatçıklarının kirlenmesi hava akışını ve ısı transferini düşürür.", "Yoğuşma suyunun drenaj sorunu küf ve bakteri üremesine neden olur.", "Deniz ortamında bakır-nikel serpantinler korozyon direnci sağlar."]
    },
    "Nemlilik kontrolü": {
      title: "Nemlilik Kontrolü",
      introduction: "Bağıl nem kontrolü gemi yaşam alanlarında konfor, kargo alanlarında ise yük koruması açısından kritik öneme sahiptir.",
      sections: [
        { heading: "Nem Alma (Dehumidification)", paragraphs: ["Soğutma serpantini yüzey sıcaklığı çiy noktasının altına düşürüldüğünde havadaki nem yoğuşur. Bu yöntem soğutma ile nem alma (cooling dehumidification) olarak adlandırılır.", "Alternatif olarak absorpsiyonlu (delikant) nem alma sistemleri silika jel veya lityum klorür kullanır."] },
        { heading: "Nemlendirme (Humidification)", paragraphs: ["Kuru iklimlerde hava nemlendirme gerekebilir. Buhar enjeksiyonu veya ultrasonik nemlendirici kullanılır.", "Konfor koşulları için bağıl nem %40-60 arasında tutulmalıdır."] }
      ],
      keyPoints: ["Yüksek nem korozyon ve küf oluşumuna neden olur.", "Düşük nem solunum yolu rahatsızlıklarına yol açar.", "Kargo alanlarında nem kontrolü ter (sweat) oluşumunu önler."]
    },
    "Kanal sistemi tasarımı": {
      title: "Kanal Sistemi Tasarımı",
      introduction: "Kanal sistemi, işlenmiş havayı AHU'dan bölmelere taşıyan ve geri dönüş havasını toplayan boru ağıdır.",
      sections: [
        { heading: "Kanal Tipleri", paragraphs: ["Galvanizli çelik kanallar gemilerde standart malzemedir. Yalıtılmış kanallar yoğuşma ve enerji kaybını önler.", "Basma kanalları AHU'dan bölmelere, emiş kanalları bölmelerden AHU'ya hava taşır. Fleksibıl kanallar terminal bağlantılarında kullanılır."] },
        { heading: "Tasarım Prensipleri", paragraphs: ["Kanal hızı gürültü kontrolü için sınırlandırılır: ana kanalda 6-10 m/s, dal kanallarda 3-5 m/s.", "Basınç düşümü hesabı kanal boyutu belirlemede kritiktir. Eşit sürtünme yöntemi (equal friction method) yaygın kullanılır."] }
      ],
      keyPoints: ["Yangın damperleri kompartıman geçişlerinde zorunludur.", "Kanal yalıtımı enerji kaybını %30'a kadar azaltabilir.", "SOLAS gereği klima kanallarından duman yayılımı önlenmelidir."]
    },
    "Taze hava ve egzoz havalandırma": {
      title: "Taze Hava ve Egzoz Havalandırma",
      introduction: "Gemi havalandırma sistemi, yaşam ve çalışma alanlarına taze hava sağlarken kirli havayı dışarı atar.",
      sections: [
        { heading: "Taze Hava Gereklilikleri", paragraphs: ["IMO/SOLAS kurallarına göre yaşam alanlarında kişi başına minimum 30 m³/h taze hava sağlanmalıdır.", "Makine dairesi havalandırması hem personel sağlığı hem motorların yanma havası ihtiyacı için gereklidir. Aksiyal veya santrifüj fanlar kullanılır."] },
        { heading: "Egzoz Havalandırma", paragraphs: ["Tuvalet, mutfak, atölye ve akü odası gibi bölmeler bağımsız egzoz havalandırma sistemine sahiptir.", "Makine dairesi acil havalandırma kapanması (ventilation flap) yangın durumunda CO₂ söndürme etkinliğini sağlamak için zorunludur."] }
      ],
      keyPoints: ["Makine dairesi havalandırma kapasitesi motor gücüne göre hesaplanır.", "Yangın durumunda tüm havalandırma kapatılabilmelidir.", "Patlama riski olan bölgelerde ex-proof fan kullanılır."]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // GEMİ MAKİNE SİSTEMLERİ (Eksikler)
  // ═══════════════════════════════════════════════════════════════
  "ship-systems": {
    "Dümen kuvveti ve tork hesabı": {
      title: "Dümen Kuvveti ve Tork Hesabı",
      introduction: "Dümen makinesinin boyutlandırılması için dümen paletine etkiyen hidrodinamik kuvvetler ve gerekli tork hesaplanmalıdır.",
      sections: [
        { heading: "Dümen Kuvveti", paragraphs: ["Dümen paletine etkiyen normal kuvvet Joessel formülü ile yaklaşık hesaplanır."], formula: { expression: "F_N = K × A × V² × sin(α)", variables: ["F_N: Normal kuvvet (N)", "K: Katsayı (≈ 580 N·s²/m⁴ tuzlu su için)", "A: Dümen palet alanı (m²)", "V: Gemi hızı (m/s)", "α: Dümen açısı (derece)"] }, example: { problem: "Dümen alanı 12 m², gemi hızı 15 knot ve dümen açısı 35° ise dümen kuvvetini hesaplayınız.", steps: ["V = 15 × 0.5144 = 7.72 m/s", "F_N = 580 × 12 × 7.72² × sin(35°)", "F_N = 580 × 12 × 59.6 × 0.574", "F_N = 238 100 N ≈ 238 kN"], result: "Dümen paletine etkiyen kuvvet yaklaşık 238 kN'dur." } },
        { heading: "Dümen Torku", paragraphs: ["Tork, kuvvetin dümen şaftı eksenine göre momentinden hesaplanır. Dengeli dümen oranı arttıkça gerekli tork azalır."], formula: { expression: "T = F_N × d", variables: ["d: Kuvvet merkezi ile dümen ekseni arası mesafe (m)", "Dengeli dümen: d = A_ön × c_ön − A_arka × c_arka formüyle azaltılır"] } }
      ],
      keyPoints: ["SOLAS gereği dümen makinesi 35° açıda tam tork sağlamalıdır.", "Hız arttıkça dümen kuvveti karesine oranla artar.", "Dönme noktasının arkasındaki alan fazla tork üretir."]
    },
    "Elektro-hidrolik dümen makinesi": {
      title: "Elektro-Hidrolik Dümen Makinesi",
      introduction: "Modern ticari gemilerde dümen makinesi elektro-hidrolik tip olup, elektrik motoruyla tahrik edilen hidrolik pompalar dümen milini döndürür.",
      sections: [
        { heading: "Sistem Bileşenleri", paragraphs: ["Hidrolik güç ünitesi (HPU): Elektrik motoru + hidrolik pompa. Genellikle 2 veya 4 adet pompa bulunur.", "Hidrolik silindir: Çift etkili pistonlu silindir dümen milini (tiller) döndürür. Rapson slide veya rotary vane tip kullanılır.", "Kontrol ünitesi: Köprüüstü dümen kumandası, telemotor (hidrolik veya elektrik sinyal), otomaçya (otopilot) bağlantısı."] },
        { heading: "Çalışma Prensibi", paragraphs: ["Dümen kumandası telemotor aracılığıyla sinyal gönderir. Kontrol valfi sinyale göre hidrolik yağı silindirin ilgili tarafına yönlendirir. Dümen istenilen açıya geldiğinde hunt valfi akışı keser ve dümen sabit kalır."] }
      ],
      keyPoints: ["SOLAS gereği en az 2 bağımsız güç ünitesi bulunmalıdır.", "Dümen 28 saniyede 35° porttan 30° starboard'a dönebilmelidir.", "Yedek pompa arızada otomatik veya manuel devreye girer."]
    },
    "Telemotor sistemi": {
      title: "Telemotor Sistemi",
      introduction: "Telemotor, köprüüstü dümen kumandası ile dümen makinesinin kontrol ünitesi arasındaki sinyal iletim sistemidir.",
      sections: [
        { heading: "Hidrolik Telemotor", paragraphs: ["Köprüüstündeki verici (transmitter) dümen çarkı ile dönen pistonlu pompa, basınçlı yağı borular aracılığıyla dümen makinesindeki alıcıya (receiver) iletir.", "Alıcı, gelen basınç sinyalini kontrol valfine aktarır. Basit, güvenilir ve mekanik bağlantı gereksinimi az olan bir sistemdir."] },
        { heading: "Elektrik Telemotor", paragraphs: ["Modern gemilerde köprüüstü kumandası potansiyometre veya synchro sinyali üretir. Bu sinyal elektrik kablosuyla dümen makinesine iletilir ve elektro-hidrolik servo valf kontrol edilir.", "Otopilot (autopilot) entegrasyonu elektrik telemotor ile daha kolaydır."] }
      ],
      keyPoints: ["Hidrolik telemotor basit ve güvenilir ancak mesafe sınırlıdır.", "Elektrik telemotor uzun mesafe ve otopilot entegrasyonunda avantajlıdır.", "SOLAS gereği bağımsız yedek kumanda sistemi bulunmalıdır."]
    },
    "Dümen testleri ve SOLAS gereklilikleri": {
      title: "Dümen Testleri ve SOLAS Gereklilikleri",
      introduction: "Dümen donanımı geminin en kritik güvenlik ekipmanlarından biridir. SOLAS Chapter II-1 Regulation 29, dümen sistemi gerekliliklerini belirler.",
      sections: [
        { heading: "SOLAS Gereklilikleri", paragraphs: [], bulletPoints: ["Ana dümen makinesi 35° bir taraftan 35° diğer tarafa 28 saniyede dönebilmelidir.", "Yedek dümen makinesi 15° bir taraftan 15° diğer tarafa 60 saniyede dönebilmelidir.", "Dümen makinesi makine dairesinde acil kumandaya sahip olmalıdır.", "Dümen açı göstergesi köprüüstünde bulunmalıdır.", "Ana güç kaybında dümen 45 saniye içinde yedekle çalışabilmelidir."] },
        { heading: "Test Prosedürü", paragraphs: ["Kalkıştan 12 saat önce dümen testleri yapılır: tam açıda sağ-sol hareket, yedek sisteme geçiş, acil kumanda testi, alarm kontrolü, dümen açı gösterge doğrulaması.", "SOLAS gereği dümen testleri seyir jurnalına kaydedilir."] }
      ],
      keyPoints: ["Dümen arızası geminin en tehlikeli acil durumlarından biridir.", "Dar sularda çift pompa çalıştırılması zorunludur.", "Dümen testleri her kalkış öncesi tekrarlanır."]
    },
    "Yedek dümen sistemi": {
      title: "Yedek Dümen Sistemi",
      introduction: "Yedek dümen sistemi, ana dümen makinesinin arızalanması durumunda geminin manevra kabiliyetini sürdürmesini sağlayan zorunlu güvenlik sistemidir.",
      sections: [
        { heading: "Yedek Dümen Alternatifleri", paragraphs: ["Bağımsız ikinci hidrolik güç ünitesi (en yaygın yöntem).", "Manuel el pompası ile dümen çevirme (küçük gemiler).", "Acil tiller (dümen çarkı doğrudan dümen miline bağlantı).", "SOLAS gereği ana güç kaybından sonra 45 saniye içinde yedek dümen devreye girmelidir."] },
        { heading: "Geçiş Prosedürü", paragraphs: ["Ana dümen arızalandığında yedek pompa devreye alınır. Geçiş otomatik veya manuel olabilir.", "El pompası ile çalışma halinde köprüüstü ile makine dairesi arasında sesli iletişim kurulur."] }
      ],
      keyPoints: ["Yedek dümen tatbikatı SOLAS gereği düzenli olarak yapılır.", "Dümen makinesi odasına doğrudan erişim sağlanmalıdır.", "İki adet bağımsız dümen kontrol sistemi olmalıdır."]
    },
    "Pervane verimi ve kavitasyon": {
      title: "Pervane Verimi ve Kavitasyon",
      introduction: "Pervane verimi, itme kuvveti üretmek için harcanan gücün motor gücüne oranıdır. Kavitasyon, pervane performansını ve ömrünü olumsuz etkileyen kritik bir olgudur.",
      sections: [
        { heading: "Pervane Verimi", paragraphs: ["Açık su verimi (η₀), gövde verimi (η_H) ve nispi dönme verimi (η_R) bileşenlerinden oluşan toplam pervane verimi genellikle %55-75 arasındadır."], formula: { expression: "η_D = η₀ × η_H × η_R", variables: ["η₀: Açık su verimi (pervane tek başına)", "η_H: Gövde verimi = (1-t)/(1-w)", "η_R: Nispi dönme verimi (≈ 1.0-1.05)", "t: İtme azaltma faktörü, w: iz faktörü"] } },
        { heading: "Kavitasyon", paragraphs: ["Pervane kanat yüzeyinde basıncın suyun buharlaşma basıncının altına düşmesiyle oluşan buhar kabarcıklarının yüksek basınç bölgesinde çökmesidir.", "Kavitasyon türleri: Kanat ucu (tip), yüzey (sheet), kabarcık (bubble) ve süperkavitasyon. Erozyona, gürültüye ve verim kaybına neden olur."] }
      ],
      keyPoints: ["Pervane yüzeyi düzenli olarak dalış muayenesinde kontrol edilir.", "Kavitasyon izleri parlatma ile giderilebilir.", "Yanlış yükleme (heavy running) kavitasyonu artırır."]
    },
    "Şaft hattı düzeni ve bileşenleri": {
      title: "Şaft Hattı Düzeni ve Bileşenleri",
      introduction: "Şaft hattı, ana makineden pervaneye mekanik gücü ileten ve geminin itme kuvvetini yapıya aktaran sistemdir.",
      sections: [
        { heading: "Bileşenler", paragraphs: ["Krank mili: Motor çıkışı.", "Ara şaft (intermediate shaft): Krank mili ile pervane şaftı arasında güç aktarır.", "İtme yatağı (thrust bearing): Pervane itme kuvvetini gemi yapısına aktarır. Michell tipi kaymalı yatak yaygındır.", "Kıç boru (stern tube): Şaftın gövdeden çıktığı noktada su sızdırmazlığı ve yatak desteği sağlar.", "Pervane şaftı (propeller shaft): Pervaneyi taşıyan son şaft segmentidir.", "Kaplin: Şaft segmentlerini birbirine bağlar; flanşlı veya gömlek tipte olabilir."] },
        { heading: "Yataklar ve İtme Yatağı", paragraphs: ["Ara şaft yatakları (plummer/spring bearing) şaftı düşey yükte destekler; beyaz metal (white metal) kaplı kaymalı yataklardır ve basınçlı yağ filmiyle yağlanır.", "İtme yatağı (thrust block), pervanenin oluşturduğu eksenel itme/çekme kuvvetini gemi gövdesine aktarır. Michell (tilting-pad) tipinde, kendi kendine yönlenen pabuçlar (pad) hidrodinamik yağ filmi oluşturur. İtme pabuçlarının sıcaklığı sürekli izlenir; aşırı ısınma yağ filmi kaybını işaret eder."] },
        { heading: "Kıç Boru Yatağı ve Sızdırmazlık", paragraphs: ["Yağ yağlamalı (oil-lubricated) kıç boru: beyaz metal yatak, iki uçta yağ keçeleri (lip seal, ör. Simplex). Yağ baş tankı (gravity tank) deniz suyu basıncının üzerinde tutularak su girişi önlenir.", "Su yağlamalı (water-lubricated) kıç boru: lignum vitae veya kompozit/sentetik yataklar, deniz suyuyla yağlanıp soğutulur; çevreye yağ kaçağı riski yoktur.", "Keçe sızıntısı izlenir; biyolojik bozunabilir yağ (EAL) kullanımı yaygınlaşmıştır."] },
        { heading: "Hizalama ve Topraklama", paragraphs: ["Şaft hizalaması (alignment) düz çizgi değil, hesaplanmış bir eğri (sag/gap) gerektirir; yanlış hizalama yatak aşınması, titreşim ve krank webi açılmasına (crank web deflection) yol açar.", "Şaft topraklama (earthing/slip ring): dönen şaft ile gövde arasında galvanik potansiyel farkı oluşur; fırça-bilezik düzeneğiyle şaft topraklanarak yatak ve dişli yüzeylerinde elektro-erozyon (electric pitting) önlenir."] }
      ],
      keyPoints: ["Şaft hattı hizalaması (alignment) motor ve pervane ömrü için kritiktir.", "İtme yatağı arızası geminin seyir kabiliyetini kaybetmesine neden olur.", "Şaft muylu (journal) aşınması ve kıç boru klirensi (wear-down) periyodik ölçülür.", "Kıç boru: yağ yağlamalı (keçeli) veya su yağlamalı (lignum vitae/kompozit) olabilir.", "Şaft topraklama bileziği, yatak yüzeylerinde elektro-erozyonu önler."]
    },
    "Stern tube yağlama ve sızdırmazlık": {
      title: "Stern Tube Yağlama ve Sızdırmazlık",
      introduction: "Stern tube (kıç boru), pervane şaftının gemi gövdesinden geçiş noktasında yataklama ve sızdırmazlık sağlayan kritik yapıdır.",
      sections: [
        { heading: "Yağ Yağlamalı Stern Tube", paragraphs: ["Beyaz metal veya polimer (Thordon, Orkot) yatak malzemesi kullanılır. Yatak boşluğu yağ ile doldurulur. Pervane tarafında ve makine dairesi tarafında sızdırmazlık elemanları (lip seal veya face seal) bulunur.", "Stern tube yağı sürekli olarak izlenir; su kontaminasyonu yatak hasarına yol açar. Yağ tankı (header tank) basınç farkı ile deniz suyunun girişi engellenir."] },
        { heading: "Su Yağlamalı Stern Tube", paragraphs: ["Kauçuk (cutless rubber) yatak malzemesi kullanılır. Deniz suyu ile yağlanır. Çevresel açıdan avantajlıdır (yağ sızıntısı riski yok).", "Sızdırmazlık yalnızca makine dairesi tarafında gereklidir."] }
      ],
      keyPoints: ["Yağ yağlamalı sistemlerde yağ-su emülsiyonu yatak arızasının habercisidir.", "Header tank seviyesi sürekli izlenir; seviye düşüşü sızıntı gösterir.", "MARPOL gereği stern tube yağ sızıntısı çevre kirliliği riski oluşturur."]
    },
    "Ara yatak ve trust yatak": {
      title: "Ara Yatak ve Trust Yatak",
      introduction: "Şaft hattındaki ara yataklar şaftın ağırlığını taşırken, trust (itme) yatağı pervane itme kuvvetini gemi yapısına aktarır.",
      sections: [
        { heading: "Ara Yatak (Intermediate Bearing)", paragraphs: ["Uzun şaft hatlarında şaftın kendi ağırlığı altında sarkmasını ve titreşim yapmasını önler. Beyaz metal kaymalı yataklar kullanılır.", "Yatak sıcaklığı sürekli izlenir; 65°C alarm, 75°C durdurma seviyesi tipiktir."] },
        { heading: "Trust (İtme) Yatağı", paragraphs: ["Michell tipi kaymalı yatak en yaygın tiptir. Eğilebilir pad'ler (tilting pads) şaft yüzeyiyle arasında hidrodinamik yağ filmi oluşturur.", "İtme kuvveti bedplate'e ve oradan gemi yapısına aktarılır. Büyük iki zamanlı motorlarda trust yatağı motor bedplate içinde entegredir."] }
      ],
      keyPoints: ["Trust yatak arızası pervane itme kuvvetinin iletilememesine neden olur.", "Yatak boşlukları (clearance) periyodik olarak ölçülür.", "Yağ analizi yatak aşınmasının erken tespitinde kullanılır."]
    },
    "Demir ırgadı (windlass)": {
      title: "Demir Irgadı (Windlass)",
      introduction: "Windlass, demir zincirininin atılması ve toplanması için kullanılan güverte makinesidir. Elektro-hidrolik veya elektrikli olabilir.",
      sections: [
        { heading: "Yapı ve Çalışma", paragraphs: ["Zincir tamburu (wildcat/gypsy): Zincir baklalarına uygun profilde dişlere sahip tambur. Zinciri kavrar ve döndürür.", "Bant freni (band brake): Zinciri tutmak ve kontrollü bırakmak için sürtünmeli fren.", "Kavrama (clutch): Wildcat'i şafta bağlar veya ayırır. Zincirin serbest atılması (free fall) için kavrama açılır.", "Tahrik ünitesi: Elektro-hidrolik motor veya direkt elektrik motoru."] },
        { heading: "Operasyon", paragraphs: ["Demir atma: Kavrama açılarak zincirin ağırlığıyla serbest düşüşü sağlanır. Bant fren ile hız kontrolü yapılır.", "Demir alma: Kavrama kapatılır, motor çalıştırılarak zincir toplanır. Aşırı yük koruması motor burnout'unu önler."] }
      ],
      keyPoints: ["IACS UR A1, zincir ve çıpa boyutlandırma kurallarını belirler.", "Windlass kapasitesi en az 9 m/dk zincir toplayabilmelidir.", "Zincir locker'da zincir ucu (bitter end) acil bırakma mekanizmasıyla bağlıdır."]
    },
    "Yük vinçleri ve kaldırma kapasitesi": {
      title: "Yük Vinçleri ve Kaldırma Kapasitesi",
      introduction: "Gemi yük vinçleri, kargo elleçleme operasyonlarında kullanılan kaldırma ekipmanlarıdır.",
      sections: [
        { heading: "Vinç Tipleri", paragraphs: ["Jib (bom) vinçler: Döner kol üzerinde hareketli halat sistemi. Genel kargo gemilerinde yaygındır.", "Goose-neck vinçler: Tek bom, elektro-hidrolik tahrik. Modern kuru yük gemilerinde standart.", "Gantry (portal) vinçler: Konteyner gemilerinde sahaya monte raylar üzerinde hareket eder. SWL 30-50 ton."], table: { headers: ["Vinç Tipi", "SWL", "Kullanım"], rows: [["Tek bom jib", "5-30 ton", "Genel kargo"], ["İkiz bom (union purchase)", "5-15 ton", "Genel kargo"], ["Elektro-hidrolik", "25-45 ton", "Kuru yük"], ["Gantry crane", "30-50 ton", "Konteyner"]] } }
      ],
      keyPoints: ["SWL (Safe Working Load) asla aşılmamalıdır.", "Vinçler yıllık olarak sertifikalı test ve muayeneye tabi tutulur.", "5 yılda bir yük testi (load test) yapılır (SWL × 1.25)."]
    },
    "Mooring vinçleri ve otomatik gerilim": {
      title: "Mooring Vinçleri ve Otomatik Gerilim",
      introduction: "Mooring vinçleri, geminin rıhtıma bağlanmasında kullanılan ve halatları kontrollü olarak sarıp boşaltan güverte makineleridir.",
      sections: [
        { heading: "Sistem Özellikleri", paragraphs: ["Elektro-hidrolik veya elektrikli tahrik. Çıkrık (warping drum) ve halat tamburu bir arada bulunur.", "Otomatik gerilim (auto-tension) sistemi: Halat gerilimini sabit tutar. Gelgit, yükleme/boşaltma sırasında gemi hareketlerini kompanse eder.", "Bant freni: Halata belirli bir tutma kuvveti uygular. Aşırı yüklenmede kayan fren koruma sağlar."] },
        { heading: "Güvenlik", paragraphs: ["Halat kopma riski 'snap-back zone' olarak işaretlenen tehlikeli bölgelerde ölümcüldür.", "Halatların düzenli muayenesi, aşınma ve kopuk tel kontrolü zorunludur."] }
      ],
      keyPoints: ["Snap-back zone'da durulmaması hayati önem taşır.", "Otomatik gerilim sistemi limanda güvenli bağlamayı sağlar.", "Sentetik ve çelik halatların birlikte kullanımı önerilmez."]
    },
    "Hava kompresörleri (pistonlu, vidalı)": {
      title: "Hava Kompresörleri",
      introduction: "Gemi basınçlı hava sistemi, ana makine başlatma, kontrol havası ve servis havası ihtiyacını karşılar. Pistonlu kompresörler standart tiptir.",
      sections: [
        { heading: "Çok Kademeli Pistonlu Kompresör", paragraphs: ["Ana makine başlatma havası kompresörü genellikle 2 veya 3 kademeli, su soğutmalı, pistonlu tiptir. Çıkış basıncı 25-30 bar.", "Her kademe arasında ara soğutucu (intercooler) ve su ayırıcı (moisture separator) bulunur. Son kademeden sonra son soğutucu (aftercooler) yer alır."] },
        { heading: "Kapasite ve Gereklilikler", paragraphs: ["SOLAS gereği en az 2 adet başlatma havası kompresörü bulunmalıdır. Toplam kapasite, ana makineyi başlatma havası şişelerini 1 saat içinde doldurabilmelidir.", "Başlatma havası şişe kapasitesi ana motoru art arda en az 12 kez çalıştırabilmelidir."] }
      ],
      keyPoints: ["Kompresör emme filtresi temiz tutulmalıdır.", "Otomatik boşaltma (auto-drain) nem birikimini önler.", "Hava şişeleri 5 yılda bir iç muayene ve 10 yılda bir hidrostatik teste tabi tutulur."]
    },
    "Hava tankları ve emniyet düzenlemeleri": {
      title: "Hava Tankları ve Emniyet Düzenlemeleri",
      introduction: "Başlatma havası şişeleri yüksek basınçlı (25-30 bar) basınçlı kaplar olup güvenlik düzenlemeleri kritik öneme sahiptir.",
      sections: [
        { heading: "Tank Gereklilikleri", paragraphs: ["SOLAS gereği en az 2 adet bağımsız başlatma havası şişesi bulunmalıdır. Her biri toplam kapasitenin yarısını sağlamalıdır.", "Emniyet supabı, manometre, drenaj valfi ve izolasyon valfleri standart donanımdır."] },
        { heading: "Muayene Takvimi", paragraphs: [], table: { headers: ["Muayene", "Periyot", "Açıklama"], rows: [["Dış muayene", "Yıllık", "Görsel kontrol, korozyon"], ["İç muayene", "5 yıl", "Temizlik sonrası iç yüzey kontrolü"], ["Hidrostatik test", "10 yıl", "1.5 × çalışma basıncı ile basınç testi"], ["Emniyet supabı", "Yıllık", "Çalışma basıncında açma testi"]] } }
      ],
      keyPoints: ["Şişe içinde nem birikimi korozyona neden olur; düzenli drenaj yapılmalıdır.", "Aşırı korozyonlu şişeler kullanımdan çekilir.", "Emniyet supabı ayarı çalışma basıncının %10 üzerindedir."]
    },
    "Hidrolik pompa tipleri": {
      title: "Hidrolik Pompa Tipleri",
      introduction: "Hidrolik pompalar, mekanik enerjiyi hidrolik basınç enerjisine dönüştürerek güç aktarım sistemlerini besler.",
      sections: [
        { heading: "Pompa Tipleri", paragraphs: [], table: { headers: ["Tip", "Basınç", "Debi", "Kullanım"], rows: [["Dişli pompa", "Max 250 bar", "Sabit", "Dümen, vinç besleme"], ["Paletli pompa", "Max 200 bar", "Sabit/Değişken", "Orta basınç sistemleri"], ["Aksiyel pistonlu", "Max 400 bar", "Değişken", "Dümen, kapak hidrolik"], ["Radyal pistonlu", "Max 700 bar", "Değişken", "Yüksek basınç sistemleri"]] } },
        { heading: "Değişken Deplasanlı Pompalar", paragraphs: ["Swash plate (eğik plaka) açısı değiştirilerek debi 0'dan maksimuma ayarlanabilir. Aynı zamanda akış yönü de terslenebilir. Modern dümen makineleri ve vinçlerde standart kullanımdır."] }
      ],
      keyPoints: ["Dişli pompa basit ve ucuzdur ancak kapasite ayarı yapılamaz.", "Aksiyel pistonlu pompa en yaygın değişken deplasanlı tiptir.", "Pompa arızası çoğunlukla kontamine yağdan kaynaklanır."]
    },
    "Yön kontrol ve basınç kontrol valfleri": {
      title: "Yön Kontrol ve Basınç Kontrol Valfleri",
      introduction: "Hidrolik devre elemanları, akışkan yönünü, basıncını ve debisini kontrol ederek sistem fonksiyonlarını yönetir.",
      sections: [
        { heading: "Yön Kontrol Valfleri", paragraphs: ["Sürgülü (spool) valfler: 2/2, 3/2, 4/2, 4/3 gibi konfigürasyonlarda. Selenoid, hidrolik pilot veya manuel tahrikli.", "Çek valf: Tek yönlü akışa izin verir. Pilot çalışmalı çek valf yük tutma amacıyla kullanılır."] },
        { heading: "Basınç Kontrol Valfleri", paragraphs: ["Relief valf: Sistem basıncını sınırlar; aşırı basınçta akışkanı tanka döndürür.", "Reducing valf: Yüksek basınçlı hattan düşük basınçlı dala kontrollü basınç sağlar.", "Sequence valf: Belirli basınca ulaşılınca ikinci bir devreyi aktive eder."] }
      ],
      keyPoints: ["Relief valf ayarı sistem güvenliği için kritiktir.", "Selenoid valf arızası acil durum prosedürünü tetikleyebilir.", "Valf sızdırmazlığı iç kaçağı (internal leakage) önlemek için önemlidir."]
    },
    "Starting air sistemi": {
      title: "Starting Air Sistemi",
      introduction: "Büyük deniz dizel motorları basınçlı hava ile çalıştırılır. Starting air sistemi, hava şişelerinden motorun silindir başlatma valflerine kontrollü hava iletir.",
      sections: [
        { heading: "Sistem Bileşenleri", paragraphs: ["Hava şişeleri (25-30 bar), ana başlatma valfi (master starting valve), hava distribütörü (starting air distributor), silindir başlatma valfleri, ve kontrol pnömatik devresinden oluşur.", "Hava distribütörü, motor ateşleme sırasına göre doğru silindirlere sırayla hava gönderir. Sadece üst ölü noktaya yakın pistonlara hava verilir."] },
        { heading: "Güvenlik", paragraphs: ["Starting air hattında alev tutucu (flame arrester) bulunur. Sızıntılı başlatma valfi sıcak yanma gazlarının hava hattına kaçmasına ve patlamaya neden olabilir.", "Hava hattındaki emniyet supabı ve patlama diski (bursting disc) aşırı basıncı önler."] }
      ],
      keyPoints: ["Starting air valf sızıntısı çok tehlikelidir; düzenli kontrol şarttır.", "Motor çevrilmeden (turning) başlatma yapılmamalıdır.", "Hava distribütörü zamanlaması motorun ateşleme sırasına uygundur."]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // ERM (Eksikler)
  // ═══════════════════════════════════════════════════════════════
  erm: {
    "BRM'den ERM'ye geçiş": {
      title: "BRM'den ERM'ye Geçiş",
      introduction: "BRM (Bridge Resource Management) 1990'larda köprüüstü operasyonları için geliştirilmiş, ERM ise bu kavramın makine dairesi operasyonlarına uyarlanmış halidir.",
      sections: [
        { heading: "Tarihsel Gelişim", paragraphs: ["Havacılıktaki CRM (Crew Resource Management) konsepti 1980'lerde denizcilik sektörüne BRM olarak uyarlandı. STCW 2010 Manila Değişiklikleri ile ERM makine zabitlerinin zorunlu eğitim müfredatına eklendi.", "ERM, makine dairesinin kendine özgü zorlukları göz önünde bulundurur: yüksek gürültü, sınırlı görüş, karmaşık ekipman, aşırı sıcaklık ve fiziksel yorgunluk."] },
        { heading: "BRM ve ERM Karşılaştırması", paragraphs: [], table: { headers: ["Özellik", "BRM", "ERM"], rows: [["Odak", "Köprüüstü operasyonları", "Makine dairesi operasyonları"], ["Ortam", "Nispeten sakin", "Gürültülü, sıcak, tehlikeli"], ["İletişim", "VHF, radar, AIS", "Sesli, işaret, interkom"], ["Ekip", "2-4 kişi", "1-6 kişi (değişken)"], ["STCW", "A-II/1, II/2", "A-III/1, III/2"]] } }
      ],
      keyPoints: ["ERM eğitimi simülatör ortamında senaryo bazlı yapılır.", "STCW gereği tüm makine zabitlerinin ERM yeterliliği olmalıdır.", "ERM prensipleri günlük operasyonlara entegre edilmelidir."]
    },
    "İnsan faktörü ve hata yönetimi": {
      title: "İnsan Faktörü ve Hata Yönetimi",
      introduction: "Deniz kazalarının %80'inden fazlasında insan faktörü rol oynamaktadır. İnsan hatalarının anlaşılması ve yönetilmesi kazaların önlenmesinde en etkili yaklaşımdır.",
      sections: [
        { heading: "Hata Tipleri", paragraphs: [], table: { headers: ["Hata Tipi", "Tanım", "Örnek"], rows: [["Slip (kayma)", "Doğru niyet, yanlış eylem", "Yanlış valfi çevirmek"], ["Lapse (unutma)", "Doğru niyet, eylem unutulması", "Prosedür adımını atlamak"], ["Mistake (hata)", "Yanlış plan, doğru uygulama", "Yanlış bakım prosedürü seçmek"], ["Violation (ihlal)", "Bilinçli kural ihlali", "PTW almadan sıcak çalışma yapmak"]] } },
        { heading: "Hata Yönetimi", paragraphs: ["James Reason'ın 'Swiss Cheese' modeli: Savunma katmanlarındaki boşlukların hizalanması kazaya yol açar. Her savunma katmanı bir hata yakalama bariyeridir.", "Hata toleranslı sistem tasarımı: Tek bir hata kazaya yol açmamalıdır. Çift kontrol, interlock, alarm ve prosedürler savunma katmanları oluşturur."] }
      ],
      keyPoints: ["İnsanlar hata yapar; önemli olan hataların kazaya dönüşmesini önlemektir.", "Cezalandırıcı kültür hataların gizlenmesine yol açar.", "Adil kültür (just culture) raporlamayı teşvik eder."]
    },
    "Situational awareness (durumsal farkındalık)": {
      title: "Durumsal Farkındalık (Situational Awareness)",
      introduction: "Durumsal farkındalık, çevredeki olayları algılama, anlamlandırma ve gelecekteki durumu öngörme yeteneğidir. Güvenli operasyonun temelini oluşturur.",
      sections: [
        { heading: "Endsley'in Üç Seviyesi", paragraphs: ["Seviye 1 – Algılama: Çevredeki bilgilerin farkında olmak. Motor parametrelerini, alarmları, sesleri fark etmek.", "Seviye 2 – Kavrama: Algılanan bilgilerin ne anlama geldiğini anlamak. Egzoz sıcaklığı artışının enjektör arızasını işaret ettiğini bilmek.", "Seviye 3 – Öngörü: Mevcut durumun gelecekte ne sonuç doğuracağını tahmin etmek. Sıcaklık artışının devam etmesi halinde motor hasarı olacağını öngörmek."] },
        { heading: "SA Kaybının Belirtileri", paragraphs: [], bulletPoints: ["Bilinen bir tehlikeye rağmen hareketsiz kalmak.", "Çelişkili verileri görmezden gelmek.", "Kontrolsüz fixation (tek bir konuya odaklanıp diğerlerini ihmal).", "'Her şey yolunda' şeklinde aşırı güvenli hissetmek.", "Stres veya yorgunluk nedeniyle dikkat dağılması."] }
      ],
      keyPoints: ["SA kaybı kazaların en yaygın nedenlerinden biridir.", "Düzenli round atma ve parametre kontrolü SA'yı sürdürür.", "Takım içi bilgi paylaşımı kolektif SA oluşturur."]
    },
    "STCW ERM gereklilikleri": {
      title: "STCW ERM Gereklilikleri",
      introduction: "STCW 2010 Manila Değişiklikleri, ERM eğitimini tüm makine zabitlerinin zorunlu yeterlilik listesine eklemiştir.",
      sections: [
        { heading: "Yeterlilik Tabloları", paragraphs: ["STCW A-III/1 (vardiya mühendisi) ve A-III/2 (baş mühendis) tablolarında ERM yeterlilikleri tanımlanmıştır."], bulletPoints: ["Kaynak yönetimi ve karar verme prensiplerinin uygulanması.", "Liderlik ve takım çalışması becerilerinin gösterilmesi.", "Durumsal farkındalığın sürdürülmesi.", "İş yükü ve stres yönetimi.", "Etkili iletişim.", "İnsan hatalarının yönetimi ve önlenmesi."] },
        { heading: "Eğitim Yöntemleri", paragraphs: ["Simülatör tabanlı senaryo eğitimleri (blackout, yangın, sızıntı), atölye çalışmaları, vaka analizleri ve debriefing oturumları kullanılır.", "ERM sertifikası genellikle 5 yıl geçerlidir ve yenilenmesi için tazeleme eğitimi gerekir."] }
      ],
      keyPoints: ["ERM yeterliliği olmadan makine zabiti sertifikası alınamaz.", "Eğitim onaylı kuruluşlarda (approved training center) verilmelidir.", "ERM prensipleri günlük operasyonlara uygulanmalıdır."]
    },
    "Liderlik tarzları ve durumsal liderlik": {
      title: "Liderlik Tarzları ve Durumsal Liderlik",
      introduction: "Makine dairesinde etkili liderlik, duruma ve ekip üyelerinin yetkinliğine göre uygun liderlik tarzının benimsenmesini gerektirir.",
      sections: [
        { heading: "Liderlik Tarzları", paragraphs: [], table: { headers: ["Tarz", "Açıklama", "Uygun Durum"], rows: [["Direktif (yönlendirici)", "Doğrudan talimat verir", "Acil durum, deneyimsiz ekip"], ["Koçluk", "Yönlendirir ve açıklar", "Gelişen ekip üyesi"], ["Destekleyici", "Katılımı teşvik eder", "Yetkin ama motivasyon düşük"], ["Delegasyon", "Yetki ve sorumluluk devreder", "Yetkin ve motivasyonu yüksek"]] } },
        { heading: "Makine Dairesinde Uygulama", paragraphs: ["Acil durumlarda direktif liderlik zorunludur; hızlı ve net talimatlar verilir.", "Rutin operasyonlarda katılımcı veya delegasyon tarzı motivasyonu ve öğrenmeyi artırır.", "Baş mühendis, liderlik tarzını duruma ve ekibe göre esnek biçimde uyarlamalıdır."] }
      ],
      keyPoints: ["Tek bir liderlik tarzı her duruma uygun değildir.", "Acil durumlarda kararsız liderlik tehlikelidir.", "Etkili lider hem teknik yetkinliğe hem iletişim becerisine sahiptir."]
    },
    "Etkili iletişim teknikleri": {
      title: "Etkili İletişim Teknikleri",
      introduction: "Makine dairesindeki yüksek gürültü, çok uluslu ekipler ve stresli ortam, iletişim hatalarını artıran faktörlerdir.",
      sections: [
        { heading: "İletişim Prensipleri", paragraphs: ["Açık ve net: Kısa, anlaşılır cümleler kullanılır. Teknik jargon ekip üyelerinin anlayacağı düzeyde olmalıdır.", "Teyit: Alıcı mesajı tekrarlayarak anladığını doğrular (closed-loop communication).", "Zamanında: Kritik bilgi gecikmeden iletilmelidir.", "Uygun kanal: Yüz yüze, interkom, telsiz veya yazılı iletişim duruma göre seçilir."] },
        { heading: "İletişim Engelleri", paragraphs: [], bulletPoints: ["Gürültü: Makine dairesinde 90-110 dBA. Kulak koruyucu iletişimi zorlaştırır.", "Dil bariyeri: Farklı milletten ekip üyeleri. IMO standart denizcilik İngilizcesi kullanılır.", "Otorite gradyanı: Ast personelin üst rütbeliye söz söylemekten çekinmesi.", "Stres ve yorgunluk: Dikkat dağılması ve yanlış anlama."] }
      ],
      keyPoints: ["Kapalı döngü iletişim (closed-loop) yanlış anlamayı önler.", "Asertif davranış hayat kurtarabilir.", "Güvenlik kritik iletişimde standart ifadeler kullanılır."]
    },
    "Kapalı döngü iletişim (closed-loop)": {
      title: "Kapalı Döngü İletişim",
      introduction: "Kapalı döngü iletişim, gönderilen mesajın alıcı tarafından tekrarlanması ve göndericinin teyit etmesiyle tamamlanan yapılandırılmış iletişim yöntemidir.",
      sections: [
        { heading: "Üç Adımlı Süreç", paragraphs: ["1. Gönderici: Mesajı açık ve net biçimde iletir. 'Soğutma suyu pompası 2 numarayı çalıştır.'", "2. Alıcı: Mesajı tekrarlayarak teyit eder. 'Soğutma suyu pompası 2 numarayı çalıştırıyorum.'", "3. Gönderici: Tekrarı doğrular veya düzeltir. 'Doğru, devam et.' veya 'Hayır, 2 numaralı değil, 3 numaralı pompayı çalıştır.'"] },
        { heading: "Önemi", paragraphs: ["Gürültülü makine dairesinde, stres altında ve dil bariyeri olan ortamlarda iletişim hatalarını %70'e kadar azaltır.", "Özellikle acil durumlarda, paralel bağlama ve bakım operasyonlarında kritik öneme sahiptir."] }
      ],
      keyPoints: ["Her güvenlik kritik iletişimde kapalı döngü kullanılmalıdır.", "Sadece 'tamam' demek yeterli değildir; mesaj tekrarlanmalıdır.", "Kapalı döngü iletişim ERM eğitiminin temel konusudur."]
    },
    "DECIDE modeli": {
      title: "DECIDE Modeli",
      introduction: "DECIDE, yapılandırılmış karar verme sürecini altı adımda tanımlayan ve özellikle stres altında sistematik karar almayı sağlayan bir modeldir.",
      sections: [
        { heading: "DECIDE Adımları", paragraphs: [], table: { headers: ["Adım", "İngilizce", "Açıklama"], rows: [["D", "Detect", "Değişikliği veya sorunu tespit et"], ["E", "Estimate", "Durumun ciddiyetini ve etkilerini değerlendir"], ["C", "Choose", "Uygulanacak eylemi seç"], ["I", "Identify", "Seçilen eylemin çözüm yollarını belirle"], ["D", "Do", "Eylemi uygula"], ["E", "Evaluate", "Sonuçları değerlendir, gerekirse tekrarla"]] } },
        { heading: "Uygulama Örneği", paragraphs: ["Senaryo: Egzoz sıcaklığı 3 numaralı silindirde yükseliyor.", "D: 3 no silindir egzoz sıcaklığı 420°C'den 480°C'ye çıktı.", "E: Limit 500°C; neden enjektör arızası, segman kaçağı veya supap sorunu olabilir.", "C: Yükü düşür ve silindiri kontrol et.", "I: Gösterge musluğundan kontrol, yakıt pompası kontrol.", "D: Motor yükü %75'ten %50'ye düşürüldü, enjektör kontrol edildi.", "E: Sıcaklık 440°C'ye indi; enjektör değişimi planlandı."] }
      ],
      keyPoints: ["DECIDE modeli acil ve rutin karar süreçlerinde kullanılabilir.", "Sistematik yaklaşım panik altında hata olasılığını azaltır.", "Değerlendirme adımı geri besleme sağlar ve döngüyü tamamlar."]
    },
    "Stres ve yorgunluk etkisi": {
      title: "Stres ve Yorgunluk Etkisi",
      introduction: "Denizcilik sektörü yorgunluk kaynaklı kazalar açısından yüksek risk taşır. Stres ve yorgunluk karar verme yeteneğini, dikkat süresini ve tepki hızını olumsuz etkiler.",
      sections: [
        { heading: "Yorgunluk Kaynakları", paragraphs: [], bulletPoints: ["Düzensiz vardiya sistemi (4-8 veya 6-6 vardiya)", "Yetersiz uyku süresi ve kalitesi", "Gürültü ve titreşim", "Monoton görevler", "Kişisel sorunlar ve evden uzaklık", "Fiziksel iş yükü"] },
        { heading: "Etkileri", paragraphs: [], table: { headers: ["Etki Alanı", "Belirtiler"], rows: [["Bilişsel", "Yavaş düşünme, karar güçlüğü, unutkanlık"], ["Fiziksel", "Koordinasyon kaybı, yavaş tepki"], ["Duygusal", "Sinirlilik, motivasyon düşüşü"], ["Algısal", "Dikkatsizlik, tunnel vision"]] } },
        { heading: "Önleme", paragraphs: ["MLC (Maritime Labour Convention) gereği minimum dinlenme süreleri: 24 saatte min 10 saat, 7 günde min 77 saat.", "Work/rest saatleri kayıt altına alınır ve PSC tarafından denetlenir."] }
      ],
      keyPoints: ["Yorgunluk alkol sarhoşluğuna benzer performans düşüşüne neden olur.", "24 saat uyanık kalmak %0.10 alkol seviyesine eşdeğer performans kaybı yaratır.", "Yorgunluk yönetimi kurumsal sorumluluktur."]
    },
    "Takım oluşturma ve rol dağılımı": {
      title: "Takım Oluşturma ve Rol Dağılımı",
      introduction: "Etkili makine dairesi operasyonu, iyi organize edilmiş ve roller açıkça tanımlanmış bir ekip çalışması gerektirir.",
      sections: [
        { heading: "Rol Dağılımı", paragraphs: ["Baş mühendis: Makine departmanı lideri, teknik ve yönetsel sorumluluk.", "İkinci mühendis: Ana makine sorumlusu, günlük operasyonları koordine eder.", "Üçüncü mühendis: Yardımcı makineler, jeneratörler ve yakıt sistemi.", "Dördüncü mühendis: Kazanlar, purifier, su arıtma ve stajyer görevleri.", "Motorcu/Yağcı: Bakım işleri, kontrol turları, temizlik."] },
        { heading: "Etkili Takım Özellikleri", paragraphs: [], bulletPoints: ["Ortak amaç ve hedef anlayışı", "Açık iletişim ve geri bildirim", "Karşılıklı güven ve saygı", "Roller ve sorumlulukların net tanımı", "Çapraz kontrol ve karşılıklı destek", "Hata toleransı ve öğrenme kültürü"] }
      ],
      keyPoints: ["İyi bir ekip bireysel yeteneklerin toplamından fazlasını üretir.", "Rol belirsizliği hata ve çatışma kaynağıdır.", "Brifing ve debrifing takım performansını artırır."]
    },
    "Brifing ve debrifing teknikleri": {
      title: "Brifing ve Debrifing Teknikleri",
      introduction: "Brifing (ön bilgilendirme) ve debrifing (sonrası değerlendirme), operasyonel güvenliği artıran yapılandırılmış iletişim araçlarıdır.",
      sections: [
        { heading: "Brifing", paragraphs: ["Operasyon başlamadan önce ekibe verilen bilgilendirmedir. İçerik: yapılacak iş, roller, tehlikeler, önlemler, acil durum planı ve iletişim yöntemi.", "Kısa, net ve interaktif olmalıdır. Ekip üyeleri soru sorabilmeli ve endişelerini dile getirebilmelidir."] },
        { heading: "Debrifing", paragraphs: ["Operasyon sonrası yapılan değerlendirmedir. İyi giden, kötü giden ve iyileştirilebilecek noktalar tartışılır.", "Suçlama değil, öğrenme amaçlıdır. Deneyimler kayıt altına alınarak kurumsal hafıza oluşturulur."] }
      ],
      keyPoints: ["Her kritik operasyon öncesi brifing zorunludur.", "Debrifing en etkili öğrenme araçlarından biridir.", "Toolbox meeting, brifing'in yaygın bir formudur."]
    },
    "Makine dairesi yangın kaza örnekleri": {
      title: "Makine Dairesi Yangın Kaza Örnekleri",
      introduction: "Gerçek kaza analizleri, benzer olayların önlenmesinde en etkili eğitim araçlarındandır. Makine dairesi yangınları gemi kayıplarının önemli bir bölümünü oluşturur.",
      sections: [
        { heading: "Tipik Senaryo: Yakıt Sızıntısı Yangını", paragraphs: ["Yüksek basınçlı yakıt borusu çatlaması veya enjektör bağlantı gevşemesi sonucu HFO sıcak egzoz manifoldu veya turboşarj yüzeyine sıçrar.", "Ateşleme sıcaklığı (≈250°C) HFO'nun tutuşma noktasının üzerinde olduğundan anlık tutuşma gerçekleşir.", "Kök nedenler: Yetersiz yalıtım, gevşemiş bağlantıların kontrol edilmemesi, titreşim kaynaklı yorulma kırılması."] },
        { heading: "Çıkarılan Dersler", paragraphs: [], bulletPoints: ["Yakıt boruları termal kalkan (lagging) ile kaplanmalıdır.", "Boru bağlantıları periyodik olarak sıkılık kontrolüne tabi tutulmalıdır.", "Quick closing valve testleri düzenli yapılmalıdır.", "Yangın algılama sistemi düzgün çalışmalıdır.", "Ekip yangın tatbikatlarına düzenli katılmalıdır."] }
      ],
      keyPoints: ["Yakıt sızıntısı kaynaklı yangınlar makine dairesinde en yaygın yangın türüdür.", "Önleme: İyi bakım, yalıtım ve kontrol.", "Her kaza raporu, benzer olayların önlenmesi için tüm ekiple paylaşılmalıdır."]
    },
    "Blackout senaryoları ve kök nedenler": {
      title: "Blackout Senaryoları ve Kök Nedenler",
      introduction: "Blackout kazaları geminin manevra yeteneğini kaybetmesine ve çarpışma/karaya oturma riskine yol açar. Kök neden analizi tekrar edişi önler.",
      sections: [
        { heading: "Tipik Senaryo", paragraphs: ["Tek jeneratör çalışırken büyük bir elektrik motorunun (bow thruster) devreye alınması aşırı yük oluşturur. Preferential trip sistemi yeterli yükü kesmezse jeneratör aşırı yüklenerek trip eder ve blackout oluşur.", "Kök nedenler: Yetersiz güç yönetimi planlaması, preferential trip ayarlarının hatalı olması, yedek jeneratörün devreye alınmaması."] },
        { heading: "Kök Neden Analizi", paragraphs: ["5-Why yöntemi ile kök nedene ulaşılır:", "Blackout oldu → Jeneratör trip etti → Aşırı yük → Bow thruster devreye alındı → Yedek jeneratör çalıştırılmamıştı → İletişim kopukluğu (köprüüstü-makine dairesi)."], bulletPoints: ["Teknik neden: Yedek jeneratör hazırlanmamıştı.", "Organizasyonel neden: Manevra talebi önceden bildirilmemişti.", "İnsan faktörü: Makine mühendisi durumsal farkındalığını kaybetmişti."] }
      ],
      keyPoints: ["Blackout önlemede güç yönetimi ve iletişim kritiktir.", "Preferential trip ayarları düzenli kontrol edilmelidir.", "Blackout tatbikatları gerçekçi senaryolarla yapılmalıdır."]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // ENERJİ VERİMLİLİĞİ (Eksikler)
  // ═══════════════════════════════════════════════════════════════
  "energy-efficiency": {
    "IMO GHG stratejisi ve hedefler": {
      title: "IMO GHG Stratejisi ve Hedefler",
      introduction: "IMO 2023 Revised GHG Strategy, uluslararası denizcilikten kaynaklanan sera gazı emisyonlarını azaltmaya yönelik küresel çerçeveyi belirler.",
      sections: [
        { heading: "Hedefler", paragraphs: [], table: { headers: ["Hedef", "Yıl", "Açıklama"], rows: [["2008 seviyesine göre %20-30 azaltım", "2030", "Karbon yoğunluğu azaltımı"], ["2008 seviyesine göre %70-80 azaltım", "2040", "Orta vadeli hedef"], ["Net sıfır emisyon", "2050 civarı", "Uzun vadeli hedef"]] } },
        { heading: "Uygulama Araçları", paragraphs: ["EEDI/EEXI: Teknik verimlilik standartları.", "CII: Operasyonel karbon yoğunluğu izleme.", "SEEMP: Enerji verimliliği yönetim planı.", "Alternatif yakıtlar: LNG, metanol, amonyak, hidrojen.", "Karbon fiyatlandırma: IMO düzeyinde tartışılıyor; EU ETS 2024'te başladı."] }
      ],
      keyPoints: ["IMO stratejisi bağlayıcı hedefler içermektedir.", "2050'de net sıfır emisyon sektörü köklü dönüşüme zorlayacaktır.", "Kısa vadede enerji verimliliği ve düşük karbonlu yakıtlar odaktır."]
    },
    "EEDI (Enerji Verimliliği Tasarım İndeksi)": {
      title: "EEDI (Enerji Verimliliği Tasarım İndeksi)",
      introduction: "EEDI, yeni inşa gemilerin tasarım aşamasındaki enerji verimliliğini ölçen zorunlu bir indekstir. Ton-mil başına CO₂ emisyonunu sınırlar.",
      sections: [
        { heading: "EEDI Hesaplama Prensibi", paragraphs: ["EEDI, motorların yakıt tüketiminden kaynaklanan CO₂ emisyonunun taşıma kapasitesi ve referans hıza oranıdır."], formula: { expression: "EEDI = (Σ(CF_j × SFC_j × P_j) × f_w) / (DWT × V_ref)", variables: ["CF_j: Yakıt tipi j karbon dönüşüm faktörü (g CO₂/g yakıt)", "SFC_j: Özgül yakıt tüketimi (g/kWh)", "P_j: Motor gücü (kW)", "f_w: Deniz koşulları düzeltme faktörü", "DWT: Yük kapasitesi (ton)", "V_ref: Referans hız (knot)"] } },
        { heading: "Fazlar ve Azaltım Oranları", paragraphs: [], table: { headers: ["Faz", "Dönem", "Azaltım (referansa göre)"], rows: [["Faz 0", "2013-2015", "Referans çizgisi"], ["Faz 1", "2015-2020", "%10"], ["Faz 2", "2020-2025", "%20"], ["Faz 3", "2025+", "%30-50 (gemi tipine göre)"]] } }
      ],
      keyPoints: ["EEDI yalnızca yeni inşa gemilere uygulanır.", "Düşük EEDI değeri daha verimli gemi tasarımı demektir.", "Faz 3 hedefleri bazı gemi tipleri için ciddi teknoloji değişikliği gerektirir."]
    },
    "EEXI (Mevcut Gemi Enerji Verimliliği İndeksi)": {
      title: "EEXI (Mevcut Gemi Enerji Verimliliği İndeksi)",
      introduction: "EEXI, mevcut gemilerin teknik enerji verimliliğini değerlendiren ve 1 Ocak 2023'ten itibaren zorunlu olan indekstir.",
      sections: [
        { heading: "EEXI Hesaplaması", paragraphs: ["EEXI hesaplaması EEDI formülüne benzer ancak mevcut geminin gerçek motor gücü ve performans verileri kullanılır.", "Hesaplanan EEXI değeri, referans çizgisinin altında olmalıdır. Aksi halde teknik düzeltme yapılmalıdır."] },
        { heading: "Uyum Yöntemleri", paragraphs: [], table: { headers: ["Yöntem", "Açıklama", "Maliyet"], rows: [["Engine Power Limitation (EPL)", "Motor gücünü sınırlandırma", "Düşük"], ["ShaPoLi", "Shaft power limitation", "Düşük"], ["WHRS kurulumu", "Atık ısı geri kazanımı", "Yüksek"], ["Enerji tasarrufu cihazı", "Pervane boss cap fin, duct", "Orta"], ["Yakıt değişikliği", "LNG'ye dönüşüm", "Çok yüksek"]] } }
      ],
      keyPoints: ["EPL/ShaPoLi en yaygın ve ucuz uyum yöntemidir.", "EPL sonrası geminin maksimum hızı düşer.", "EEXI sertifikası klas kuruluşu tarafından düzenlenir."]
    },
    "CII derecelendirme sistemi (A–E)": {
      title: "CII Derecelendirme Sistemi",
      introduction: "CII derecelendirme sistemi, gemilerin yıllık operasyonel karbon yoğunluğunu A'dan E'ye derecelendirir ve düşük performanslı gemilere düzeltici eylem gerektirir.",
      sections: [
        { heading: "Derecelendirme", paragraphs: ["Her gemi tipi için referans çizgisi ve bant sınırları tanımlanır. Geminin yıllık CII değeri bu bantlara göre derecelendirilir.", "Referans çizgisi yıllık yaklaşık %2 oranında düşürülür, bu da her yıl daha sıkı gereksinim anlamına gelir."], table: { headers: ["Derece", "Performans", "Gereksinim"], rows: [["A", "Çok iyi (üst %15)", "Teşvik"], ["B", "İyi (%15-35)", "Yok"], ["C", "Orta (%35-65)", "Yok (minimum kabul)"], ["D", "Kötü (%65-85)", "3 yıl üst üste → düzeltici plan"], ["E", "Çok kötü (alt %15)", "Hemen düzeltici plan"]] } }
      ],
      keyPoints: ["D veya E derecesi ticari itibar ve charter sözleşmelerini olumsuz etkiler.", "CII iyileştirmesi operasyonel optimizasyon ile mümkündür.", "Limanlar ve kargo sahipleri CII derecesini değerlendirmeye başlamıştır."]
    },
    "SEEMP (Gemi Enerji Verimliliği Yönetim Planı)": {
      title: "SEEMP",
      introduction: "SEEMP (Ship Energy Efficiency Management Plan), gemilerin enerji verimliliğini sistematik olarak yönetmek için hazırlanan zorunlu operasyonel plandır.",
      sections: [
        { heading: "SEEMP İçeriği", paragraphs: ["Bölüm I: Enerji verimliliği iyileştirme önlemleri (hız optimizasyonu, trim optimizasyonu, bakım planlaması vb.).", "Bölüm II: Yakıt tüketimi veri toplama ve raporlama planı.", "Bölüm III: CII hedefi ve iyileştirme planı (D veya E dereceli gemiler için zorunlu düzeltici eylem planı)."] },
        { heading: "Uygulama Döngüsü", paragraphs: ["Plan-Do-Check-Act (PDCA) döngüsü izlenir: hedef belirleme, uygulama, izleme/ölçüm ve iyileştirme."] }
      ],
      keyPoints: ["SEEMP gemide bulundurulması zorunlu dokümandır.", "Bölüm III CII düzeltici eylem planı 2023'ten itibaren zorunludur.", "SEEMP şirket ve gemi mürettebatı tarafından birlikte uygulanır."]
    },
    "Trim optimizasyonu": {
      title: "Trim Optimizasyonu",
      introduction: "Geminin boyuna trim durumunun optimize edilmesi, tekne direncini azaltarak yakıt tasarrufu sağlayan en kolay ve ucuz operasyonel yöntemlerden biridir.",
      sections: [
        { heading: "Trim Etkisi", paragraphs: ["Optimum trim genellikle hafif kıç trimi (0.5-1.5 m) olarak belirlenir. Yanlış trim %2-5 oranında yakıt tüketimi artışına neden olabilir.", "Trim optimizasyonu geminin yükleme durumuna, hızına ve deniz koşullarına göre değişir. Model deneyleri veya CFD analizleriyle belirlenen optimum trim tabloları kullanılır."], example: { problem: "Bir konteyner gemisi 16 knot hızda seyrederken günlük yakıt tüketimi düz trimde 55 ton, 1.2 m kıç triminde 52 ton ise yıllık tasarrufu hesaplayınız (yılda 280 seyir günü).", steps: ["Günlük tasarruf = 55 − 52 = 3 ton/gün", "Yıllık tasarruf = 3 × 280 = 840 ton"], result: "Yıllık yaklaşık 840 ton yakıt tasarrufu sağlanır." } }
      ],
      keyPoints: ["Trim optimizasyonu ek yatırım gerektirmeyen en kolay tasarruf yöntemidir.", "Balast operasyonu ile optimum trim korunabilir.", "Trim tablosu veya yazılımı kaptana karar desteği sağlar."]
    },
    "Fouling etkisi ve tekne temizliği": {
      title: "Fouling Etkisi ve Tekne Temizliği",
      introduction: "Deniz organizmaları (biyofouling) gemi teknesine yapışarak yüzey pürüzlülüğünü artırır ve sürtünme direncini %20-40 oranında yükseltebilir.",
      sections: [
        { heading: "Fouling Etkileri", paragraphs: ["Mikro fouling (slime): %1-5 direnç artışı.", "Makro fouling (yosun, midye, deniz lalesi): %10-40 direnç artışı.", "Performans göstergeleri: SFOC artışı, hız düşüşü (sabit güçte) veya güç artışı (sabit hızda)."] },
        { heading: "Önleme ve Temizlik", paragraphs: ["Antifouling boya: Biyosit salınımı ile yapışmayı önler. Self-polishing copolymer (SPC) ve silikon bazlı (foul-release) tipler yaygındır.", "Su altı tekne temizliği: Dalış ekibi veya ROV ile periyodik fırçalama.", "Kuru havuz: Tam tekne temizliği ve boya yenileme (genellikle 5 yılda bir)."] }
      ],
      keyPoints: ["Fouling CII derecesini doğrudan olumsuz etkiler.", "Silikon bazlı boyalar biyosit içermez, çevre dostudur.", "Hız-güç eğrisi takibi fouling seviyesini gösterir."]
    },
    "Atık ısı geri kazanım (WHRS)": {
      title: "Atık Isı Geri Kazanım (WHRS)",
      introduction: "WHRS (Waste Heat Recovery System), ana makine egzoz gazındaki atık ısıyı elektrik veya buhar enerjisine dönüştürerek genel enerji verimliliğini artırır.",
      sections: [
        { heading: "Sistem Konfigürasyonları", paragraphs: ["Egzoz ekonomizeri: Egzoz gazı ısısıyla buhar üretir. En basit WHRS formu.", "Güç türbini: Egzoz gazı enerjisiyle ek güç üretir.", "Buhar türbini: Ekonomizer buharıyla turbo-jeneratör çalıştırılır.", "Kombine sistem: Güç türbini + buhar türbini + ekonomizer."] },
        { heading: "Verim Artışı", paragraphs: ["WHRS ile ana motorun toplam verimi %50'den %55-60'a yükseltilebilir. Elektrik üretiminde %8-12 yakıt tasarrufu mümkündür."], example: { problem: "Ana motor 20 MW güç üretirken egzoz gazı sıcaklığı 260°C'dir. WHRS ile 1.5 MW ek elektrik üretiliyorsa genel verim artışını hesaplayınız.", steps: ["WHRS güç oranı = 1.5/20 × 100 = %7.5"], result: "WHRS, motor gücünün %7.5'i kadar ek güç üretmektedir." } }
      ],
      keyPoints: ["WHRS yatırım maliyeti yüksek ancak geri ödeme süresi 3-5 yıldır.", "EEDI/EEXI hesabında WHRS gücü düşülür.", "Düşük yüklerde WHRS verimi azalır."]
    },
    "IMO DCS (veri toplama sistemi)": {
      title: "IMO DCS (Veri Toplama Sistemi)",
      introduction: "IMO Data Collection System, 5000 GT üzerindeki gemilerin yıllık yakıt tüketimi verilerini IMO'ya raporlamasını zorunlu kılan sistemdir.",
      sections: [
        { heading: "Raporlanan Veriler", paragraphs: [], bulletPoints: ["Gemi tanımlama bilgileri (IMO numarası, gemi tipi, DWT/GT)", "Yıllık toplam yakıt tüketimi (yakıt tipine göre)", "Yıllık toplam kat edilen mesafe (deniz mili)", "Yıllık toplam seyir saati", "DWT veya GT kapasitesi"] },
        { heading: "Süreç", paragraphs: ["Gemi, SEEMP Bölüm II'deki veri toplama planına göre verileri toplar. Yıl sonunda veriler bayrak devleti veya yetkili kuruluşa (RO) sunulur.", "Doğrulama sonrası IMO GISIS veritabanına aktarılır. CII hesaplamasında bu veriler kullanılır."] }
      ],
      keyPoints: ["5000 GT üzeri tüm gemiler için zorunludur (2019'dan itibaren).", "DCS verileri CII hesaplamasının temelini oluşturur.", "Eksik veya hatalı raporlama PSC müdahalesine neden olabilir."]
    },
    "EU MRV regülasyonu": {
      title: "EU MRV Regülasyonu",
      introduction: "EU MRV (Monitoring, Reporting and Verification), AB limanlarına uğrayan 5000 GT üzerindeki gemilerin CO₂ emisyonlarını izlemesini, raporlamasını ve bağımsız olarak doğrulanmasını zorunlu kılar.",
      sections: [
        { heading: "Gereksinimler", paragraphs: ["AB limanları arasında ve AB limanına/limanından yapılan seferlerdeki yakıt tüketimi ve CO₂ emisyonları izlenir.", "Yıllık emisyon raporu akredite bir doğrulayıcı kuruluş tarafından doğrulanır ve THETIS-MRV sistemine yüklenir."] },
        { heading: "EU ETS ile İlişki", paragraphs: ["2024'ten itibaren denizcilik AB ETS (Emisyon Ticaret Sistemi) kapsamına alınmıştır. MRV verileri ETS yükümlülüklerinin temelini oluşturur.", "Gemiler CO₂ emisyonlarının bir kısmı için karbon ücreti ödemek zorundadır: 2024'te %40, 2025'te %70, 2026'da %100."] }
      ],
      keyPoints: ["EU MRV kapsamında doğrulanmış Document of Compliance (DoC) gerekir.", "DoC olmadan AB limanlarına giriş engellenebilir.", "EU ETS maliyeti sefer planlamasını ve yakıt seçimini doğrudan etkiler."]
    },
    "Rota optimizasyonu (weather routing)": {
      title: "Rota Optimizasyonu (Weather Routing)",
      introduction: "Hava durumu ve deniz koşullarına göre optimum rota belirlenmesi, yakıt tasarrufu ve güvenli seyir sağlayan operasyonel enerji verimliliği yöntemidir.",
      sections: [
        { heading: "Prensip", paragraphs: ["En kısa mesafe (great circle) her zaman en ekonomik rota değildir. Şiddetli rüzgâr, dalga ve akıntılar hız kaybına ve yakıt tüketimi artışına neden olur.", "Weather routing servisleri, hava tahminlerini kullanarak minimum yakıt tüketimi veya minimum sefer süresi sağlayan rotayı hesaplar."] },
        { heading: "Tasarruf Potansiyeli", paragraphs: ["Tipik tasarruf: %2-5 yakıt, bazı koşullarda %10'a kadar. Kötü hava koşullarından kaçınma aynı zamanda yük ve gemi hasarını da önler."] }
      ],
      keyPoints: ["Weather routing ek maliyet gerektirmez veya çok düşük maliyetlidir.", "Kaptan nihai rota kararını verir; servis tavsiye niteliğindedir.", "CII iyileştirmesinde etkili bir araçtır."]
    },
    "Değişken frekanslı tahrik (VFD) kullanımı": {
      title: "VFD ile Enerji Tasarrufu",
      introduction: "VFD (Variable Frequency Drive), elektrik motorlarının hızını frekans kontrolü ile ayarlayarak kısmi yüklerde önemli enerji tasarrufu sağlar.",
      sections: [
        { heading: "Tasarruf Prensibi", paragraphs: ["Pompa ve fanların güç tüketimi hızın küpüyle orantılıdır: P ∝ N³. Hızın %20 düşürülmesi güç tüketimini %49 azaltır."], formula: { expression: "P₂/P₁ = (N₂/N₁)³", variables: ["P: Güç (kW)", "N: Devir (rpm)"] }, example: { problem: "Soğutma suyu pompası 30 kW gücünde tam devirde çalışmaktadır. VFD ile %75 hıza düşürülürse güç tüketimi ne olur?", steps: ["P₂ = P₁ × (N₂/N₁)³ = 30 × (0.75)³", "P₂ = 30 × 0.422 = 12.66 kW"], result: "Güç tüketimi 30 kW'tan 12.7 kW'a düşer (%58 tasarruf)." } }
      ],
      keyPoints: ["VFD soğutma suyu, havalandırma ve balast pompalarında en etkilidir.", "Geri ödeme süresi genellikle 1-3 yıldır.", "EEDI/EEXI hesabında VFD kullanımı avantaj sağlar."]
    }
  }
};

export default content3;
