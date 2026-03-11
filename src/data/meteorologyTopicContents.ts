import type { TopicDetailContent } from "@/data/navigationTopicContents";

type MeteorologyContentSeed = {
  operationalImportance: string;
  theory: string[];
  bridgePractice: string[];
  risks: string[];
  summary: string[];
};

const createMeteorologyContent = (title: string, seed: MeteorologyContentSeed): TopicDetailContent => ({
  title,
  introduction: seed.operationalImportance,
  sections: [
    {
      title: "Giriş (kavramın denizdeki operasyonel önemi)",
      content: seed.operationalImportance,
    },
    {
      title: "Temel teori",
      content: seed.theory.join("\n\n"),
      bulletPoints: seed.theory,
    },
    {
      title: "Köprüüstü uygulaması",
      content: seed.bridgePractice.join("\n\n"),
      bulletPoints: seed.bridgePractice,
    },
    {
      title: "Hata/risk noktaları",
      content: seed.risks.join("\n\n"),
      bulletPoints: seed.risks,
    },
    {
      title: "Kısa özet maddeleri",
      content: seed.summary.join("\n"),
      bulletPoints: seed.summary,
    },
  ],
  keyPoints: seed.summary,
});

const meteorologySeeds: Record<string, MeteorologyContentSeed> = {
  "Basınç merkezleri (alçak/yüksek)": {
    operationalImportance: "Alçak ve yüksek basınç merkezlerini doğru okumak, rota üzerindeki rüzgâr şiddeti, deniz durumu ve emniyetli hız kararları için kritiktir.",
    theory: [
      "Alçak basınçta hava yükselir, bulutlanma ve yağış eğilimi artar.",
      "Yüksek basınçta hava alçalır, genelde daha sakin ve açık hava beklenir.",
      "Basınç farkı arttıkça rüzgâr üretme potansiyeli yükselir."
    ],
    bridgePractice: [
      "Synoptik haritada merkezlerin konumu rota planına işlenir.",
      "Barometre trendi vardiya devrinde kayıt altına alınır.",
      "Alçak merkez yaklaşırken hız ve rota emniyet payı artırılır."
    ],
    risks: [
      "Tek bir anlık basınç değerine bakıp eğilimi göz ardı etmek.",
      "Basınç merkezinin hareket yönünü hesaba katmamak.",
      "Köprüüstü-kaptan iletişiminde gecikme nedeniyle geç manevra."
    ],
    summary: ["Basınç merkezi + trend birlikte değerlendirilir.", "Alçak basınç yaklaşımı erken tedbir gerektirir.", "Barometre kayıt disiplini operasyonel emniyettir."]
  },
  "İzobar yapısı ve gradyan": {
    operationalImportance: "İzobar sıklaşması güçlü rüzgâr ve zor deniz ihtimalini gösterir; bu bilgi rota optimizasyonunda doğrudan kullanılır.",
    theory: ["İzobarlar eş basınç eğrileridir.", "İzobarlar arası mesafe azaldıkça basınç gradyanı büyür.", "Yüksek gradyan daha yüksek rüzgâr hızlarıyla ilişkilidir."],
    bridgePractice: ["Harita üzerinde sık izobarlı zonlar riskli sektör olarak işaretlenir.", "ETA ve yakıt hesabı olumsuz hava payı ile revize edilir.", "Pilot transfer veya dar su geçiş saatleri gradyana göre güncellenir."],
    risks: ["Model çözünürlüğünü dikkate almadan yerel etkileri atlamak.", "Sadece ortalama rüzgâra bakıp gust etkisini ihmal etmek.", "Yetersiz hız azaltımı nedeniyle yapısal yük artışı."],
    summary: ["Sık izobar = artan rüzgâr riski.", "Gradyan analizi rota-zaman kararını değiştirir.", "Yerel etkilerle birlikte okunmalıdır."]
  },
  "Hava kütleleri ve kaynak bölgeler": {
    operationalImportance: "Hava kütlesinin kaynağını bilmek, beklenen sıcaklık, nem, görüş ve deniz durumu değişimlerini önceden tahmin etmeyi sağlar.",
    theory: ["Hava kütleleri kaynak bölgelerine göre denizel/karasal ve kutupsal/tropikal sınıflanır.", "Sıcaklık ve nem özellikleri taşındıkları rota boyunca dönüşür.", "Kütleler arası sınırlar cephe oluşumuna zemin hazırlar."],
    bridgePractice: ["Sefer öncesi baskın hava kütlesi rota brifingine eklenir.", "Nemli sıcak kütlede sis ve düşük görüş ihtimali takip edilir.", "Soğuk kütle geçişinde güverte emniyet tedbirleri artırılır."],
    risks: ["Kaynak bölge etkisini mevsimsel değişimden bağımsız düşünmek.", "Geçiş zonlarında ani görüş düşüşüne hazırlıksız yakalanmak.", "Nem/sıcaklık etkisini personel güvenliğine yansıtmamak."],
    summary: ["Kaynak bölge hava karakterini belirler.", "Kütle değişimi operasyonel risk değişimidir.", "Vardiya planı meteorolojik geçişe göre uyarlanır."]
  },
  "Cephe tipleri ve geçiş etkileri": {
    operationalImportance: "Cephe geçişleri ani rüzgâr, yağış ve görüş değişimi yaratabildiği için köprüüstünde erken uyarı ve hazırlık zorunludur.",
    theory: ["Soğuk cephe hızlı, keskin ve konvektif hava olayları üretebilir.", "Sıcak cephe daha yaygın bulutlanma ve süreğen yağışla ilerler.", "Oklüde cephe karmaşık hava koşulları üretir."],
    bridgePractice: ["Cephe ETA’sı rota çizelgesine yazılır.", "Geçiş öncesi dış operasyonlar ve güverte işleri yeniden planlanır.", "Radar/yağış hücresi takibiyle manevra payı artırılır."],
    risks: ["Cepheyi yalnızca yağış olarak algılayıp rüzgâr şiftini ihmal etmek.", "Cephe hızı yanlış tahmini nedeniyle geç pozisyon almak.", "Kısıtlı görüş prosedürlerini geç devreye almak."],
    summary: ["Cephe geçişi çok parametreli risk üretir.", "Zamanlama ve hazırlık kritik önemdedir.", "Rüzgâr şifti manevra kararını doğrudan etkiler."]
  },
  "Gerçek rüzgar ve görünen rüzgar": {
    operationalImportance: "Gerçek ve görünen rüzgâr ayrımı yapılmadan rota, hız ve güverte operasyonu kararları hatalı olur.",
    theory: ["Görünen rüzgâr gemi hareketi ile gerçek rüzgârın vektörel birleşimidir.", "Hız artışı görünen rüzgâr açısını başa taşır.", "Gerçek rüzgâr deniz durumunu öngörmede ana değişkendir."],
    bridgePractice: ["Anemometre verisi STW/SOG ile birlikte yorumlanır.", "Rüzgâr dönüşümlerinde ECDIS/meteorolojik overlay kontrol edilir.", "Liman yaklaşımında gerçek rüzgâr limitleri esas alınır."],
    risks: ["Anlık görünen rüzgârı gerçek kabul etmek.", "Akıntı etkisini vektör hesabına katmamak.", "Yüksek freeboard’da rüzgâr momentini küçümsemek."],
    summary: ["Görünen ≠ gerçek rüzgâr.", "Vektörel değerlendirme şarttır.", "Operasyon limitleri gerçek rüzgâra göre alınır."]
  },
  "Beaufort skalası uygulamaları": {
    operationalImportance: "Beaufort skalası, enstrüman arızası veya sınırlı veri anında deniz durumunu standart dille ifade etmeyi sağlar.",
    theory: ["Skala rüzgâr hızı ile deniz yüzeyi belirtilerini eşleştirir.", "Operasyonel raporlama ve forecast karşılaştırmasında ortak referanstır.", "Dalga gelişimi fetch ve süreye bağlı olarak değişir."],
    bridgePractice: ["Vardiya kayıtlarında Beaufort seviyesi standart formatta girilir.", "Pilotaj ve güverte işleri için limit tabloları ile çaprazlanır.", "Master’a gönderilen hava raporunda görsel gözlem desteklenir."],
    risks: ["Gece/yağışta görsel işaretleri yanlış değerlendirmek.", "Skalayı dalga yüksekliği yerine tek başına kullanmak.", "Raporlama tutarsızlığı nedeniyle trend takibini bozmak."],
    summary: ["Beaufort ortak operasyon dilidir.", "Gözlem + enstrüman birlikte kullanılmalıdır.", "Trend takibi için tutarlı kayıt gerekir."]
  },
  "Dalga yüksekliği ve periyot": {
    operationalImportance: "Dalga yüksekliği ve periyot, gemi hareketleri, slamming ve yapısal yük risklerinin yönetiminde temel parametrelerdir.",
    theory: ["Significant wave height (Hs) deniz durumunu temsil eder.", "Kısa periyotlu dalgalar sert hareket, uzun periyotlu swell farklı salınım üretir.", "Dalga yönü-gemi baş açısı hareket karakterini belirler."],
    bridgePractice: ["Hava rotalama kararlarında Hs ve periyot birlikte değerlendirilir.", "Baş-kıç dalga açıları değiştirilerek konfor ve emniyet optimize edilir.", "Yük emniyeti kontrolleri beklenen hareketlere göre sıklaştırılır."],
    risks: ["Sadece dalga yüksekliğine bakıp periyodu ihmal etmek.", "Quartering sea koşullarında yalpa riskini küçümsemek.", "Slamming belirtilerine rağmen hız düşürmemek."],
    summary: ["Hs + periyot birlikte okunur.", "Dalga açısı manevra kararını belirler.", "Yapısal yük yönetimi hız/rota ile yapılır."]
  },
  "Swell ve wind sea ayrımı": {
    operationalImportance: "Swell ve wind sea ayrımı, gemi hareketlerinin kaynağını anlamayı ve doğru rota-hız düzeltmesini mümkün kılar.",
    theory: ["Wind sea yerel rüzgârla oluşur, daha düzensiz ve kısa periyotlu olabilir.", "Swell uzak kaynaklı, daha düzenli ve uzun periyotlu dalgadır.", "Aynı anda birden fazla swell bileşeni görülebilir."],
    bridgePractice: ["Dalga gözlemiyle hava raporu uyuşmazlığı kontrol edilir.", "Uzaktan gelen swell için erken rota optimizasyonu yapılır.", "Liman yaklaşımında swell etkili yalpa dönemleri hesaba katılır."],
    risks: ["Yerel rüzgâr sakin diye dalga riskinin bittiğini varsaymak.", "Çapraz swell etkisini yakıt optimizasyonunda göz ardı etmek.", "Mooring sırasında swell kaynaklı dinamik yükleri hafife almak."],
    summary: ["Swell uzak kaynaklı olabilir.", "Yerel rüzgâr tek belirleyici değildir.", "Operasyon planı dalga tipine göre uyarlanır."]
  },
  "Siklon yapısı ve gelişim evreleri": {
    operationalImportance: "Tropikal siklonun evresini doğru sınıflamak, kaçınma stratejisi ve emniyet mesafesi belirlemede hayati önem taşır.",
    theory: ["Siklon; düşük basınç merkezi, eyewall ve spiral yağış bantlarından oluşur.", "Tropikal depresyon-storm-cyclone evrelerinde rüzgâr ve deniz şiddeti artar.", "Sıcak deniz yüzeyi ve düşük rüzgâr kesmesi gelişimi destekler."],
    bridgePractice: ["JTWC/NOAA bültenleri vardiya brifingine entegre edilir.", "Tahmini track ve uncertainty cone rota üzerinde gösterilir.", "Kaçınma mesafesi şirket prosedürüne göre artırılır."],
    risks: ["Tek model çıktısına aşırı güvenmek.", "Siklon hız/rota değişimini güncellememek.", "Yalancı sakinlik döneminde tedbirleri gevşetmek."],
    summary: ["Evre arttıkça operasyonel risk katlanır.", "Track belirsizliği kararın merkezindedir.", "Sürekli güncelleme zorunludur."]
  },
  "Tehlikeli/seyir yapılabilir yarım daire": {
    operationalImportance: "Siklonun tehlikeli ve seyir yapılabilir yarım dairesini bilmek, doğru kaçınma yönünü seçerek hasar riskini azaltır.",
    theory: ["Yarım daire sınıflaması siklon hareket yönüne göre belirlenir.", "Tehlikeli yarım dairede translasyon ve dönel rüzgâr etkileri birleşebilir.", "Seyir yapılabilir yarım daire nispeten daha yönetilebilir koşul sunar."],
    bridgePractice: ["Siklon yönü düzenli güncellenerek yarım daire yeniden değerlendirilir.", "Manevra planı köprüüstü ekipleriyle adım adım paylaşılır.", "Makine hazır bulunuşluğu kaçınma manevrası için yükseltilir."],
    risks: ["Eski siklon raporuyla yarım daireyi yanlış belirlemek.", "Rüzgâr yön değişimini geç fark etmek.", "Manevra kararını geciktirmek."],
    summary: ["Yarım daire analizi dinamik yapılmalıdır.", "Tehlikeli yarım dairede maruziyet azaltılır.", "Kaçınma için erken ve kararlı hareket gerekir."]
  },
  "Barometre ve rüzgarla konum tayini": {
    operationalImportance: "Barometre eğilimi ve rüzgâr değişimi, siklon/cepheye göre nispi konum değerlendirmesinde pratik bir erken uyarı aracıdır.",
    theory: ["Hızlı basınç düşüşü kötüleşen hava koşullarını işaret eder.", "Rüzgâr yön ve şiddet değişimi sistemin hangi sektöründe olunduğunu gösterir.", "Trend analizi tek ölçümden daha anlamlıdır."],
    bridgePractice: ["Saatlik basınç-rüzgâr grafiği tutulur.", "Kaptan brifinglerinde trend sapmaları özellikle raporlanır.", "Elde edilen bulgular resmi meteorolojik bültenlerle karşılaştırılır."],
    risks: ["Cihaz kalibrasyon sorunlarını fark etmemek.", "Kısa süreli dalgalanmayı trend sanmak.", "Yerel squall etkisini sistemsel değişimle karıştırmak."],
    summary: ["Trend, anlık değerden daha değerlidir.", "Barometre-rüzgâr birlikte yorumlanmalıdır.", "Kalibrasyon ve kayıt disiplini esastır."]
  },
  "Kaçınma manevrası prensipleri": {
    operationalImportance: "Doğru kaçınma manevrası, ekstrem hava içinde emniyetli mesafe yaratır ve gemi/ekip hasarını önler.",
    theory: ["Manevra prensipleri sistemin yönü, hızı ve yarım daire konumuna bağlıdır.", "Amaç; en kötü deniz/rüzgâr sektöründen hızlıca uzaklaşmaktır.", "Hız azaltma ve baş açısı optimizasyonu birlikte kullanılır."],
    bridgePractice: ["Manevra alternatifleri BRM prensibiyle değerlendirilir.", "Makine, güverte ve acil durum ekipleri önceden hazırlanır.", "Karar sonrası performans radar/AIS/GPS ile sürekli teyit edilir."],
    risks: ["Geç manevra nedeniyle sistem içine daha fazla girmek.", "Tek taktikte ısrar edip duruma uyum sağlayamamak.", "Ekip koordinasyon eksikliği."],
    summary: ["Erken kaçınma en etkili savunmadır.", "Manevra dinamik biçimde güncellenmelidir.", "BRM koordinasyonu başarının anahtarıdır."]
  },
  "Sis oluşum türleri": {
    operationalImportance: "Sis türünü tanımak, süresi ve yoğunluğu hakkında daha iyi öngörü sağlayarak seyir emniyetini artırır.",
    theory: ["Adveksiyon, radyasyon, buharlaşma ve orografik sis temel türlerdir.", "Her türün oluşumu sıcaklık-nem-rüzgâr kombinasyonuna bağlıdır.", "Deniz yüzeyi sıcaklığı sis oluşumunda belirleyici olabilir."],
    bridgePractice: ["SST ve hava sıcaklığı farkı düzenli izlenir.", "Görüş düşüş trendinde COLREG kısıtlı görüş prosedürleri hazırlanır.", "Sis düdüğü/radar nöbeti emniyet seviyesine göre artırılır."],
    risks: ["Sis bankalarının yerel ve ani gelişimini hafife almak.", "Radar ayarlarını sis koşuluna göre optimize etmemek.", "Vardiya artırımı yapmadan standart seyri sürdürmek."],
    summary: ["Sis türü, süre/şiddet tahminine yardım eder.", "Erken prosedür aktivasyonu kritik önemdedir.", "Sensör + görsel gözlem birlikte kullanılır."]
  },
  "Görüş sınıflandırması": {
    operationalImportance: "Görüş sınıfını doğru belirlemek, hız seçimi ve çatışma riski yönetiminde standart karar üretir.",
    theory: ["Görüş mesafesi meteorolojik ve operasyonel olarak farklı eşiklerle sınıflanır.", "Kısıtlı görüş, COLREG’e göre özel yükümlülükler doğurur.", "Algılanan görüş, ışık ve yağışa bağlı yanıltıcı olabilir."],
    bridgePractice: ["Vardiya zabiti periyodik görüş tahmini ve kayıt yapar.", "Hız, trafik yoğunluğu ve görüş birlikte değerlendirilir.", "Ek gözcü ve radar plotting sıklığı artırılır."],
    risks: ["Subjektif tahmini tek kaynak kabul etmek.", "Seyir ışıkları algısını gerçek mesafe ile karıştırmak.", "Köprüüstü kaynak yönetiminde görev dağılımını net yapmamak."],
    summary: ["Görüş sınıfı operasyon kararını belirler.", "Kayıt ve raporlama standardı önemlidir.", "Kısıtlı görüşte hız ve gözcü disiplini şarttır."]
  },
  "Kısıtlı görüşte seyir kuralları": {
    operationalImportance: "Kısıtlı görüşte COLREG uyumu, çatışma riskini düşürmenin temel hukuki ve operasyonel gereğidir.",
    theory: ["Kural 19 başta olmak üzere ses işaretleri ve emniyetli hız prensibi uygulanır.", "Radar tespiti var diye görsel teyit zorunluluğu tamamen ortadan kalkmaz.", "TCPA/CPA değerleri belirsizlik payıyla yorumlanmalıdır."],
    bridgePractice: ["Emniyetli hız yeniden hesaplanır ve kayda girilir.", "ARPA target trendleri sık aralıklarla doğrulanır.", "Gerekirse makine hazırda tutulur ve erken çağrı yapılır."],
    risks: ["Aşırı güvenle yüksek hız sürdürmek.", "Tek sensöre bağımlı karar vermek.", "Ses işareti prosedürlerini ihmal etmek."],
    summary: ["Kısıtlı görüşte emniyetli hız esastır.", "COLREG uygulaması tavizsiz olmalıdır.", "Çoklu sensör doğrulaması gerekir."]
  },
  "Radar ve ses işaretleri": {
    operationalImportance: "Radar ve ses işaretlerinin birlikte kullanımı, düşük görüşte hedef farkındalığını ve hukuki uyumu artırır.",
    theory: ["Radar tespit menzili hava/deniz clutter ayarlarına bağlıdır.", "Ses işaretleri COLREG’de gemi tipine ve harekete göre tanımlıdır.", "Radar kör sektörleri ve zayıf yankılar operasyonel boşluk yaratır."],
    bridgePractice: ["Radar tuning ve gain deniz durumuna göre optimize edilir.", "Ses işaretleri belirlenen periyotla uygulanır.", "AIS bilgisi radar izleri ile çapraz doğrulanır."],
    risks: ["Yanlış radar ayarı nedeniyle hedef kaçırmak.", "Ses işaretini gecikmeli vermek.", "AIS yoksa hedef yok varsayımı yapmak."],
    summary: ["Radar ve ses işaretleri birlikte düşünülür.", "Ayar disiplini temas kalitesini belirler.", "Çapraz doğrulama çatışma riskini düşürür."]
  },
  "Küresel akıntı sistemleri": {
    operationalImportance: "Küresel akıntıların bilinmesi, uzun seferlerde ETA, yakıt tüketimi ve emniyetli rota seçiminde stratejik avantaj sağlar.",
    theory: ["Büyük ölçekli akıntılar rüzgâr, coriolis ve havza geometrisiyle oluşur.", "Sıcak/soğuk akıntılar yerel hava ve sis riskini etkiler.", "Mevsimsel/iklimsel değişimler akıntı gücünü değiştirebilir."],
    bridgePractice: ["Rota planında ana akıntı kuşakları dikkate alınır.", "SOG sapmaları akıntı analiziyle doğrulanır.", "Yakıt optimizasyonunda karşı/yardımcı akıntı senaryoları hesaplanır."],
    risks: ["Klimatolojik veriyi güncel durum yerine kullanmak.", "Akıntı değişimlerini periyodik güncellememek.", "Dar boğaz geçişlerinde lokal etkileri ihmal etmek."],
    summary: ["Akıntı stratejik rota parametresidir.", "Güncel veri ile takip edilmelidir.", "ETA ve yakıt üzerinde doğrudan etkilidir."]
  },
  "Set ve drift değerlendirmesi": {
    operationalImportance: "Set ve drift analizi, planlanan rota ile gerçek iz arasındaki farkı yöneterek emniyetli seyri sağlar.",
    theory: ["Set akıntı yönü, drift akıntı hızıdır.", "COG-Heading ve SOG-STW farkları akıntı bilgisini verir.", "Vektörel çözümleme rota düzeltmesinin temelidir."],
    bridgePractice: ["Periyodik fix ile akıntı vektörü güncellenir.", "CTS hesaplarına set-drift etkisi eklenir.", "Pilotaj sularında sapma limitleri sıkı tutulur."],
    risks: ["Yetersiz fix sıklığı nedeniyle gecikmeli düzeltme.", "Leeway ve akıntıyı birbirine karıştırmak.", "Ekipler arası farklı referans hız kullanımı."],
    summary: ["Set-drift düzenli güncellenmelidir.", "CTS hesaplarında vektör yaklaşımı şarttır.", "Fix disiplini emniyetin temelidir."]
  },
  "Akıntının ETA ve yakıta etkisi": {
    operationalImportance: "Akıntı etkisinin doğru hesaplanması, teslim programı ve bunker yönetiminde maliyet ve güvenlik dengesini korur.",
    theory: ["Karşı akıntı efektif hızı düşürür, ETA’yı uzatır ve tüketimi artırır.", "Yardımcı akıntı tersi etkiyle operasyonel avantaj sağlar.", "Akıntı değişkenliği tek bir sabit değerle temsil edilemez."],
    bridgePractice: ["Sefer planı farklı akıntı senaryolarıyla hazırlanır.", "Günlük noon report’ta akıntı etkisi ayrı raporlanır.", "Gerekirse hız profili ve makine yükü yeniden optimize edilir."],
    risks: ["Akıntıyı ihmal ederek agresif ETA taahhüdü vermek.", "Yakıt emniyet payını yetersiz bırakmak.", "Liman slot planına gecikmeyi geç bildirmek."],
    summary: ["Akıntı ETA ve tüketimi birlikte etkiler.", "Senaryo bazlı planlama gereklidir.", "Emniyet payı operasyonel riski azaltır."]
  },
  "Mevsimsel akıntı değişimleri": {
    operationalImportance: "Mevsimsel akıntı değişimleri bilinmeden yapılan rota planı, beklenmeyen sapmalar ve performans kaybı yaratabilir.",
    theory: ["Monsoon ve bölgesel rüzgâr rejimleri akıntı yön/hızını değiştirebilir.", "Mevsimsel yüzey sıcaklığı değişimleri akıntı yapısını etkiler.", "Klimatolojik ortalamalar anlık koşullardan sapabilir."],
    bridgePractice: ["Sefer mevsimine uygun pilot chart ve güncel akıntı verisi birlikte kullanılır.", "Geçiş öncesi bölgesel uyarılar kontrol edilir.", "ETA revizyonları erken bildirilir."],
    risks: ["Geçmiş sefer tecrübesini güncel koşul yerine koymak.", "Monsoon dönüş dönemlerinde belirsizliği küçümsemek.", "Operasyon planını sabit tutmak."],
    summary: ["Mevsimsellik akıntıyı ciddi değiştirir.", "Güncel veri + klimatoloji birlikte okunur.", "Esnek planlama gerekir."]
  },
  "Synoptik harita sembolleri": {
    operationalImportance: "Synoptik sembolleri hızlı okumak, sınırlı zamanda doğru hava resmi çıkarıp köprüüstü karar kalitesini artırır.",
    theory: ["İzobar, cephe, basınç merkezi ve rüzgâr barb sembolleri temel veri katmanıdır.", "Sembol standardı farklı kaynaklarda küçük değişiklikler gösterebilir.", "Doğru yorum için harita zamanı (UTC) kritik bilgidir."],
    bridgePractice: ["Harita zamanı gemi saatiyle eşleştirilir.", "Rota üzerindeki kritik semboller vardiya notlarına aktarılır.", "Birden fazla kaynak haritası çapraz kontrol edilir."],
    risks: ["UTC farkını yanlış okuyup geçersiz değerlendirme yapmak.", "Sembol efsanesini kontrol etmeden yorumlamak.", "Eski harita ile karar vermek."],
    summary: ["Sembol okuma hız-kalite dengesini sağlar.", "UTC ve güncellik doğrulaması şarttır.", "Çapraz kaynak kullanımı hatayı azaltır."]
  },
  "Cephe analizi ve hareket tahmini": {
    operationalImportance: "Cephe hareket tahmini, rota üzerinde ne zaman hangi hava riskinin karşılanacağını belirleyerek operasyon hazırlığını güçlendirir.",
    theory: ["Cephe hızı, yönü ve derinliği hava değişiminin şiddetini etkiler.", "Soğuk cephe genelde daha hızlı ilerler.", "Üst seviye akışlar yüzey cephesinin evrimini yönlendirebilir."],
    bridgePractice: ["Ardışık haritalarla cephe hızı hesaplanır.", "Kritik geçiş saatleri operasyon planına işlenir.", "Mooring/cargo gibi faaliyetler cephe zamanına göre düzenlenir."],
    risks: ["Lineer hareket varsayıp ivmelenmeyi atlamak.", "Yerel topografik etkileri dikkate almamak.", "Planı tek bir tahmine kilitlemek."],
    summary: ["Cephe zamanı operasyon takvimini değiştirir.", "Ardışık harita analizi yapılmalıdır.", "Plan B senaryosu hazır tutulmalıdır."]
  },
  "Rüzgar/deniz tahmini çıkarımı": {
    operationalImportance: "Haritadan rüzgâr ve deniz tahmini çıkarabilmek, veri kesintilerinde bile emniyetli karar alma sürekliliği sağlar.",
    theory: ["Basınç gradyanı ve izobar yönelimi rüzgâr alanını işaret eder.", "Rüzgâr süresi/fetch deniz gelişimini belirler.", "Yerel etkiler teorik değeri değiştirebilir."],
    bridgePractice: ["Tahmin çıktıları gözlemle karşılaştırılıp kalibre edilir.", "Rota segmentlerine göre deniz durumu notu hazırlanır.", "Kritik eşikler aşıldığında köprüüstü alarm kriterleri uygulanır."],
    risks: ["Model verisini sorgusuz kabul etmek.", "Fetch etkisini ihmal ederek dalga tahminini küçümsemek.", "Gözlem sapmalarını raporlamamak."],
    summary: ["Harita yorumu yedek karar yeteneğidir.", "Gözlem-tahmin karşılaştırması yapılmalıdır.", "Eşik bazlı aksiyon planı riski azaltır."]
  },
  "Rota üzerinde risk işaretleme": {
    operationalImportance: "Meteorolojik risklerin rota üzerinde görsel işaretlenmesi, ekip içinde ortak durum farkındalığı ve hızlı aksiyon üretir.",
    theory: ["Risk matrisi; olasılık ve etki değerlendirmesi ile oluşturulur.", "Zaman-mekân bağlı risk işaretleme, statik rapordan daha etkilidir.", "Dinamik risk haritası BRM iletişimini kolaylaştırır."],
    bridgePractice: ["ECDIS veya plan paftasında riskli segmentler renk kodlanır.", "Her segment için tetikleyici limitler tanımlanır.", "Vardiya devirlerinde risk haritası üzerinden brifing yapılır."],
    risks: ["Aşırı genel risk tanımı nedeniyle uygulanamaz plan.", "Risk işaretini güncellememek.", "Tetikleyici limitleri ekiple paylaşmamak."],
    summary: ["Risk görselleştirmesi karar hızını artırır.", "Segment bazlı limitler net olmalıdır.", "Sürekli güncelleme BRM etkinliğini artırır."]
  }
};

export const meteorologyTopicContents: Record<string, TopicDetailContent> = Object.fromEntries(
  Object.entries(meteorologySeeds).map(([title, seed]) => [title, createMeteorologyContent(title, seed)])
);
