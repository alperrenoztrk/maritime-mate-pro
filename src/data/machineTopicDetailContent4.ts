import type { MachineSubTopicContent } from "./machineTopicDetailContent";

type ContentMap = Record<string, Record<string, MachineSubTopicContent>>;

const content4: ContentMap = {
  // ═══════════════════════════════════════════════════════════════
  // TERMODİNAMİK — Eksik alt başlıklar
  // ═══════════════════════════════════════════════════════════════
  thermodynamics: {
    "İzotermik süreç": {
      title: "İzotermik Süreç",
      introduction: "İzotermik süreç, sıcaklığın sabit kaldığı termodinamik hal değişimidir. İdeal gaz için iç enerji değişmez ve verilen ısı tamamen işe dönüşür.",
      sections: [
        { heading: "Tanım ve Koşul", paragraphs: ["İzotermik süreçte T = sabit olduğundan ideal gazda iç enerji değişimi sıfırdır (ΔU = 0). Birinci yasa gereği Q = W olur; sisteme verilen ısının tamamı iş olarak çevreye aktarılır.", "Pratikte bu süreç çok yavaş gerçekleştirilmelidir ki sistem çevresiyle ısıl dengeyi sürekli koruyabilsin. Gemi sistemlerinde izotermik kompresyon, ara soğutmalı çok kademeli kompresörlerde yaklaşık olarak sağlanır."] },
        { heading: "P-V İlişkisi", paragraphs: ["İdeal gaz için izotermik süreçte Boyle-Mariotte yasası geçerlidir."], formula: { expression: "P₁V₁ = P₂V₂ = sabit", variables: ["P: Basınç (Pa)", "V: Hacim (m³)"] } },
        { heading: "İş Hesabı", paragraphs: [], formula: { expression: "W = P₁V₁ · ln(V₂/V₁) = mRT · ln(V₂/V₁)", variables: ["W: Yapılan iş (J)", "m: Kütle (kg)", "R: Gaz sabiti (J/kg·K)", "T: Mutlak sıcaklık (K)"] }, example: { problem: "0.5 kg hava 300 K'de 1 bar'dan 5 bar'a izotermik olarak sıkıştırılıyor. Yapılan işi bulunuz. (Rhava = 287 J/kg·K)", steps: ["V₂/V₁ = P₁/P₂ = 1/5 = 0.2", "W = mRT · ln(V₂/V₁)", "W = 0.5 × 287 × 300 × ln(0.2)", "W = 43050 × (−1.6094)", "W = −69 284 J ≈ −69.3 kJ"], result: "Sıkıştırma işi 69.3 kJ'dür (negatif işaret sisteme iş yapıldığını gösterir)." } }
      ],
      keyPoints: ["İzotermik süreçte ΔU = 0, Q = W.", "P-V diyagramında hiperbol eğrisi çizer.", "Ara soğutmalı kompresörlerde izotermik sıkıştırmaya yaklaşılır."]
    },
    "İzobarik süreç": {
      title: "İzobarik Süreç",
      introduction: "İzobarik süreç, basıncın sabit kaldığı termodinamik hal değişimidir. Kazan ve ısı eşanjörlerindeki ısı transferi yaklaşık olarak izobarik kabul edilir.",
      sections: [
        { heading: "Tanım", paragraphs: ["Sabit basınçta gazın ısıtılması veya soğutulması izobarik süreçtir. Bu süreçte hacim ve sıcaklık birlikte değişir. Charles yasası geçerlidir."], formula: { expression: "V₁/T₁ = V₂/T₂  (P = sabit)", variables: [] } },
        { heading: "İş ve Isı", paragraphs: [], formula: { expression: "W = P·(V₂ − V₁) = mR(T₂ − T₁)\nQ = m·cp·(T₂ − T₁)", variables: ["cp: Sabit basınçtaki özgül ısı (J/kg·K)"] }, example: { problem: "2 kg hava sabit basınçta 300 K'den 600 K'e ısıtılıyor. cp = 1005 J/kg·K, R = 287 J/kg·K. Isı ve iş miktarını bulunuz.", steps: ["Q = m·cp·ΔT = 2 × 1005 × 300 = 603 000 J = 603 kJ", "W = mRΔT = 2 × 287 × 300 = 172 200 J = 172.2 kJ", "ΔU = Q − W = 603 − 172.2 = 430.8 kJ"], result: "Verilen ısı 603 kJ, yapılan iş 172.2 kJ, iç enerji artışı 430.8 kJ'dür." } }
      ],
      keyPoints: ["İzobarik süreçte iş P·ΔV kadardır.", "Verilen ısının bir kısmı iş, kalanı iç enerji artışı olur.", "Diesel çevriminde yanma izobarik olarak modellenir."]
    },
    "İzokorik süreç": {
      title: "İzokorik Süreç",
      introduction: "İzokorik (izometrik) süreç, hacmin sabit kaldığı termodinamik hal değişimidir. Rijit kaplarda ısıtma veya soğutma bu sürece örnektir.",
      sections: [
        { heading: "Tanım ve İlişki", paragraphs: ["Sabit hacimde W = 0 olduğundan, birinci yasa Q = ΔU olur. Sisteme verilen ısının tamamı iç enerjiye dönüşür."], formula: { expression: "Q = m·cv·(T₂ − T₁) = ΔU\nP₁/T₁ = P₂/T₂  (V = sabit)", variables: ["cv: Sabit hacimdeki özgül ısı (J/kg·K)"] }, example: { problem: "Kapalı bir tanktaki 3 kg hava 400 K'den 700 K'e ısıtılıyor. cv = 718 J/kg·K. Gereken ısıyı bulunuz.", steps: ["Q = m·cv·ΔT = 3 × 718 × (700−400)", "Q = 3 × 718 × 300 = 646 200 J = 646.2 kJ"], result: "Gereken ısı miktarı 646.2 kJ'dür. İş yapılmadığından tamamı iç enerji artışıdır." } }
      ],
      keyPoints: ["İzokorik süreçte W = 0, Q = ΔU.", "P-V diyagramında dikey çizgi olarak gösterilir.", "Otto çevriminde yanma ve ısı atma izokorikas olarak modellenir."]
    },
    "Adyabatik (izentropik) süreç": {
      title: "Adyabatik (İzentropik) Süreç",
      introduction: "Adyabatik süreçte sistem ile çevresi arasında ısı transferi olmaz (Q = 0). Tersinir adyabatik süreç aynı zamanda izentropik süreçtir ve entropi değişmez.",
      sections: [
        { heading: "P-V ve T-V İlişkileri", paragraphs: ["Adyabatik süreçte Q = 0 olduğundan W = −ΔU olur. Sıkıştırmada sıcaklık artar, genleşmede azalır."], formula: { expression: "P₁V₁ᵞ = P₂V₂ᵞ\nT₁V₁ᵞ⁻¹ = T₂V₂ᵞ⁻¹\nT₂/T₁ = (P₂/P₁)^((γ-1)/γ)", variables: ["γ = cp/cv (ısı kapasiteleri oranı)", "Hava için γ ≈ 1.4"] } },
        { heading: "İş Hesabı", paragraphs: [], formula: { expression: "W = (P₁V₁ − P₂V₂) / (γ − 1) = mR(T₁ − T₂) / (γ − 1)", variables: [] }, example: { problem: "Bir dizel motorda hava 1 bar, 300 K'den sıkıştırma oranı 18:1 ile adyabatik olarak sıkıştırılıyor. Sıkıştırma sonu sıcaklığını bulunuz. (γ = 1.4)", steps: ["T₂ = T₁ × (V₁/V₂)^(γ−1)", "T₂ = 300 × (18)^(1.4−1)", "T₂ = 300 × 18^0.4", "18^0.4 = e^(0.4 × ln18) = e^(0.4 × 2.89) = e^1.157 = 3.18", "T₂ = 300 × 3.18 = 953 K ≈ 680°C"], result: "Sıkıştırma sonu sıcaklığı 953 K (680°C) olup, dizel yakıtın tutuşma sıcaklığının üzerindedir." } }
      ],
      keyPoints: ["Adyabatik sıkıştırmada sıcaklık yükselir — dizel tutuşma prensibi.", "Turboşarjer kompresörü yaklaşık adyabatik çalışır.", "γ değeri gazın cinsine bağlıdır (hava: 1.4, egzoz gazı: ~1.35)."]
    },
    "Politropik süreç ve n üssü": {
      title: "Politropik Süreç ve n Üssü",
      introduction: "Politropik süreç, gerçek kompresör ve genleşme makinesi davranışını idealize süreçlerden daha iyi temsil eden genel hal değişim modelidir. Süreç, PVⁿ = sabit bağıntısıyla ifade edilir ve n üssü ısı alışverişi ile iç tersinmezliklerin birleşik etkisini tek parametrede toplar.",
      sections: [
        {
          heading: "Politropik Modelin Fiziksel Anlamı",
          paragraphs: [
            "Politropik üs n, süreç sırasında çevreyle ısı alışverişi seviyesini ve makine içi kayıpları temsil eden ampirik bir parametredir. Bu nedenle n, sadece teorik bir sayı değil, aynı zamanda ekipman performans göstergesidir.",
            "Kompresörlerde n değeri genellikle 1 ile γ arasındadır; ara soğutma arttıkça n değeri 1'e yaklaşır. Türbinlerde ise genleşmenin gerçek karakterine bağlı olarak efektif üs farklılaşır ve izentropik verimle birlikte değerlendirilir."
          ],
          formula: { expression: "PVⁿ = sabit", variables: ["n: Politropik üs", "n = 1 → izotermik, n = γ → izentropik"] },
          table: { headers: ["n Değeri", "Süreç Tipi", "Mühendislik Yorumu"], rows: [["n = 0", "İzobarik", "Geniş ısı alışverişi, basınç sabit"], ["n = 1", "İzotermik", "Maksimum soğutmalı ideal sıkıştırma"], ["1 < n < γ", "Gerçek sıkıştırma", "Deniz kompresörleri için tipik bölge"], ["n = γ", "İzentropik", "Isı transferi yok, tersinir limit"], ["n → ∞", "İzokorik", "Hacim değişimi ihmal edilebilir"]] }
        },
        {
          heading: "Sıcaklık ve İş Bağıntıları",
          paragraphs: [
            "Politropik bağıntıdan türetilen sıcaklık oranı, saha hesaplarında kompresör çıkış sıcaklığını öngörmek için kullanılır. Bu hesap, yağlama koşulları, soğutucu verimi ve çevre sıcaklığı ile birlikte yorumlanmalıdır.",
            "Birim kütle başına politropik iş hesabı, motor yardımcı sistemlerinin güç tüketim analizinde kritik öneme sahiptir."
          ],
          formula: {
            expression: "T₂/T₁ = (P₂/P₁)^((n-1)/n)\nw = (n/(n-1)) · R · (T₂ - T₁)",
            variables: ["w: Birim kütle başına iş (kJ/kg)", "R: Gaz sabiti (kJ/kg·K)"]
          }
        },
        {
          heading: "Sayısal Örnek ve Operasyon Yorumu",
          paragraphs: ["Aynı basınç oranında n değerinin artması çıkış sıcaklığını yükseltir; bu durum valf, segman ve yağ filmi için ek termal yük oluşturur."],
          example: { problem: "Bir kompresörde hava n = 1.3 politropik üssüyle 1 bar'dan 8 bar'a sıkıştırılıyor. Giriş sıcaklığı 25°C ise çıkış sıcaklığını bulunuz.", steps: ["T₂ = T₁ × (P₂/P₁)^((n-1)/n)", "T₂ = 298 × (8)^((1.3-1)/1.3)", "T₂ = 298 × 8^0.2308", "8^0.2308 = 1.616", "T₂ = 298 × 1.616 = 482 K = 209°C"], result: "Politropik sıkıştırma sonrası sıcaklık 209°C bulunur. Bu değer ara soğutma yetersizse yağ karbonlaşması riski yaratabilir; bakım planında soğutucu performansı izlenmelidir." }
        }
      ],
      keyPoints: ["Politropik model, gerçek makine davranışını ideal süreçlerden daha iyi temsil eder.", "n değeri saha verisiyle kalibre edilmelidir; tek başına teorik kabul edilmemelidir.", "Kompresör çıkış sıcaklığı ve özgül güç tüketimi n değerine yüksek duyarlıdır."]
    },
    "Otto çevrimi (benzinli motor)": {
      title: "Otto Çevrimi (Benzinli Motor)",
      introduction: "Otto çevrimi, kıvılcım ateşlemeli motorların teorik performans sınırını veren temel çevrimdir. Denizcilikte ana tahrikte sınırlı kullanılsa da yardımcı jeneratörler, küçük servis motorları ve eğitim amaçlı termodinamik analizlerde kritik referanstır.",
      sections: [
        { heading: "Çevrim Aşamaları ve P-V Yorumu", paragraphs: ["1→2 adyabatik sıkıştırmada basınç ve sıcaklık hızla yükselir; vuruntu sınırına yaklaşım bu bölgede belirlenir.", "2→3 sabit hacimde ısı alımı ideal bir varsayımdır; gerçek motorda yanma sonlu sürede olduğu için basınç tepe değeri krank açısına bağlıdır.", "3→4 adyabatik genleşme iş üreten stroktur; çevrim net işinin büyük kısmı bu bölgede oluşur.", "4→1 sabit hacimde ısı atımı, egzoz ve soğutma kayıplarının ideal temsili olarak kabul edilir."], diagram: { src: "/diagrams/machine/pv-diyagrami.svg", alt: "Otto çevrimi P-V diyagramı", caption: "Şekil: Otto çevriminin dört aşaması (P-V)" } },
        { heading: "Termal Verim ve Sıkıştırma Oranı Etkisi", paragraphs: ["Otto çevrimi verimi teorik olarak yalnızca sıkıştırma oranı ve γ değerine bağlıdır. Bu durum tasarımcıya açık bir mesaj verir: uygun yakıtla daha yüksek sıkıştırma oranı daha yüksek verim üretir.", "Ancak pratikte vuruntu (knock), malzeme sıcaklık sınırları ve NOx oluşumu sıkıştırma oranını sınırlayan temel faktörlerdir."], formula: { expression: "ηOtto = 1 − (1/r)^(γ−1)", variables: ["r: Sıkıştırma oranı (V₁/V₂)", "γ: Özgül ısı oranı"] } },
        { heading: "Sayısal Örnek ve Gerçek Motor Sapmaları", paragraphs: ["İdeal hesap sonucu her zaman gerçek motor veriminden yüksektir; farkın nedeni ısı kayıpları, sürtünme, eksik yanma ve pompalama işidir."], example: { problem: "Sıkıştırma oranı r = 10 olan bir Otto çevriminin termal verimini bulunuz. (γ = 1.4)", steps: ["η = 1 − (1/10)^(1.4−1)", "η = 1 − (0.1)^0.4", "0.1^0.4 = 0.398", "η = 1 − 0.398 = 0.602"], result: "İdeal Otto verimi %60.2 bulunur. Gerçek makinede etkin verim tipik olarak %25-35 bandındadır; kalan enerji egzoz, soğutma ve mekanik kayıplarla dağılır." } }
      ],
      keyPoints: ["Otto çevrimi teorik sınırı verir; gerçek motor tasarımı bu sınıra yaklaşma problemidir.", "Sıkıştırma oranı artışı verimi yükseltir ancak vuruntu ve emisyon limitleriyle dengelenmelidir.", "Denizcilikte eğitim, küçük yardımcı makineler ve kıyas analizlerinde temel referans çevrimdir."]
    },
    "Sabathe (ikili) çevrimi": {
      title: "Sabathe (İkili) Çevrimi",
      introduction: "Sabathe (dual/ikili) çevrimi, gerçek dizel motor yanmasını tek bir ideal süreçle temsil etmenin yetersiz kaldığı durumlar için geliştirilmiş karma bir modeldir. Isı eklemesinin bir bölümünü sabit hacimde, kalan bölümünü sabit basınçta kabul ederek hem tepe basıncı hem de enjeksiyon süresinin çevrim verimine etkisini aynı anda değerlendirme imkânı sağlar.",
      sections: [
        {
          heading: "Neden Sabathe Modeli Kullanılır?",
          paragraphs: [
            "Gerçek deniz dizel motorlarında yanma, krank açısı boyunca sonlu bir zaman aralığına yayılır. Bu nedenle yanmanın tamamını yalnızca sabit basınç (Diesel çevrimi) veya yalnızca sabit hacim (Otto çevrimi) kabul etmek, özellikle orta-yük bölgelerinde anlamlı hata üretir.",
            "Sabathe çevrimi, hızlı ön-karışım yanmasını sabit hacim, difüzyon kontrollü geç yanmayı sabit basınç kısmıyla modelleyerek indike basınç eğrisine daha yakın bir teorik çerçeve verir."
          ]
        },
        {
          heading: "Çevrim Aşamaları",
          paragraphs: [
            "1→2: Adyabatik sıkıştırma ile hava sıcaklığı yükselir ve yakıtın kendiliğinden tutuşması için uygun ortam oluşur.",
            "2→3: Sabit hacimde ısı alımı (ani yanma fazı). Bu kısım tepe basıncı belirler ve mekanik yükleri doğrudan etkiler.",
            "3→4: Sabit basınçta ısı alımı (enjeksiyonun devam ettiği kontrollü yanma). Kesme oranı bu kısımda tanımlanır.",
            "4→5: Adyabatik genleşme ile faydalı iş üretilir.",
            "5→1: Sabit hacimde ısı atımı, egzoz ve soğutma kayıplarının ideal karşılığıdır."
          ],
          diagram: { src: "/diagrams/machine/pv-diyagrami.svg", alt: "Sabathe (ikili) çevrimi P-V", caption: "Şekil: Sabathe çevriminin sabit hacim + sabit basınç ısı alımı" }
        },
        {
          heading: "Verim Parametreleri ve Tasarım Etkisi",
          paragraphs: [
            "Sabathe çevriminde termal verim; sıkıştırma oranı (r), basınç artış oranı (α) ve kesme oranı (ρ) parametrelerine bağlıdır. α büyüdükçe erken yanma etkisi artar; ρ büyüdükçe sabit basınçta ısı ekleme süresi uzar.",
            "Aynı maksimum silindir basıncı sınırı altında, enjeksiyon zamanlamasının optimize edilmesiyle Sabathe çevrimi daha yüksek net iş sağlayabilir. Bu nedenle common-rail motorlarda çoklu enjeksiyon stratejileri çevrim yaklaşımını pratikte şekillendirir."
          ],
          formula: {
            expression: "η = 1 − (1/r^(γ-1)) × [(αρ^γ − 1) / (α−1 + α·γ·(ρ−1))]",
            variables: [
              "r: Sıkıştırma oranı",
              "α: Basınç artış oranı (P₃/P₂)",
              "ρ: Kesme oranı (V₄/V₃)",
              "γ: Özgül ısı oranı"
            ]
          }
        },
        {
          heading: "Operasyonel Yorum",
          paragraphs: [
            "Tepe basıncın aşırı yükselmesi piston pimleri, biyel ve ana yataklar üzerinde darbe yükünü artırır. Buna karşılık yanmanın fazla gecikmesi özgül yakıt tüketimini ve egzoz sıcaklığını yükseltir.",
            "Makine zabiti açısından hedef; yakıt ekonomisi, NOx limiti ve mekanik güvenilirlik arasında denge kurmaktır. Silindir basıncı trendleri, Pmax, dP/dθ ve egzoz sıcaklığı birlikte değerlendirilmelidir."
          ]
        }
      ],
      keyPoints: [
        "Sabathe çevrimi, gerçek deniz dizellerini Otto ve Diesel çevrimlerinden daha gerçekçi temsil eder.",
        "Enjeksiyon stratejisi (pilot-ana-son) çevrimin α ve ρ parametrelerini fiilen değiştirir.",
        "Verim artışı hedeflenirken Pmax ve emisyon sınırları birlikte yönetilmelidir."
      ]
    },
    "Rankine çevrimi (buhar türbini)": {
      title: "Rankine Çevrimi (Buhar Türbini)",
      introduction: "Rankine çevrimi, buhar üretimi-temini-genleşmesi-yoğunlaşması adımlarından oluşan kapalı bir güç çevrimidir. Denizcilikte klasik buhar tahrik sistemleri dışında, güncel olarak egzoz gazı ekonomizeri destekli turbo-jeneratör ve atık ısı geri kazanım (WHRS) mimarilerinin temel termodinamik omurgasını oluşturur.",
      sections: [
        {
          heading: "Çevrim Bileşenleri ve Enerji Akışı",
          paragraphs: [
            "Pompa: Kondenser çıkışındaki doymuş/sübsoğutulmuş suyu kazan basıncına yükseltir. Pompa işi nispeten küçük olsa da yüksek basınç çevrimlerinde ihmal edilmemelidir.",
            "Kazan/Ekonomizer: Besi suyu ısıtılır, buharlaştırılır ve gerekiyorsa kızdırılır. Deniz uygulamasında ısı kaynağı çoğunlukla ana makine egzozudur.",
            "Türbin: Buhar entalpisi şaft işine dönüştürülür. Elde edilen mekanik güç jeneratöre aktarılır.",
            "Kondenser: Türbin çıkış buharı yoğuşturularak çevrim kapatılır; düşük kondenser basıncı çevrim verimini artırır ancak soğutma suyu koşullarına bağlıdır."
          ],
          diagram: { src: "/diagrams/machine/rankine-cevrimi.svg", alt: "Rankine çevrimi T-s diyagramı", caption: "Şekil: Rankine çevriminin T-s diyagramı (pompa, kazan, türbin, kondenser)" }
        },
        {
          heading: "h-s Diyagramı ile Performans Yorumu",
          paragraphs: [
            "İdeal Rankine çevriminde türbin ve pompa izentropik kabul edilir. Gerçekte türbin izentropik verimi ve nem oranı, özellikle düşük yükte, elde edilen net işi belirgin biçimde etkiler.",
            "Türbin çıkışında nem oranının artması son kademelerde erozyon riski yaratır; bu nedenle kızdırma (superheat) ve gerektiğinde yeniden kızdırma (reheat) uygulamaları kullanılır."
          ],
          formula: {
            expression: "wt = h₃ − h₄\nwp = h₂ − h₁\nqin = h₃ − h₂\nηth = (wt − wp) / qin",
            variables: [
              "h: Özgül entalpi (kJ/kg)",
              "wt: Türbin özgül işi",
              "wp: Pompa özgül işi"
            ]
          }
        },
        {
          heading: "Sayısal Örnek (Basitleştirilmiş)",
          paragraphs: ["Aşağıdaki örnek, yardımcı turbo-jeneratör seviyesinde hızlı bir ön fizibilite hesabı mantığını gösterir."],
          example: {
            problem: "Bir Rankine çevriminde h₃=3230 kJ/kg, h₄=2550 kJ/kg, h₂=220 kJ/kg, h₁=200 kJ/kg değerleri ölçülüyor. Çevrim verimini bulunuz.",
            steps: [
              "wt = h₃ − h₄ = 3230 − 2550 = 680 kJ/kg",
              "wp = h₂ − h₁ = 220 − 200 = 20 kJ/kg",
              "wnet = 680 − 20 = 660 kJ/kg",
              "qin = h₃ − h₂ = 3230 − 220 = 3010 kJ/kg",
              "ηth = 660 / 3010 = 0.219 = %21.9"
            ],
            result: "İdealize edilmiş çevrim verimi yaklaşık %21.9 bulunur. Egzoz ısısı kaynaklı WHRS uygulamalarında bu değer ekonomik kazanım için çoğu durumda yeterlidir çünkü yakıt girdisi 'atık ısı'dır."
          }
        },
        {
          heading: "Deniz Uygulamasında İyileştirme Noktaları",
          paragraphs: [
            "Kondenser vakumunun korunması, tüp kirlenmesinin kontrolü ve non-condensable gazların uzaklaştırılması çevrim verimine doğrudan etki eder.",
            "Besi suyu ön ısıtma (regeneratif ısıtma), deaeratör kontrolü ve blöf optimizasyonu hem termal verim hem ekipman ömrü açısından kritik iyileştirme alanlarıdır."
          ]
        }
      ],
      keyPoints: [
        "Rankine çevrimi deniz WHRS/turbo-jeneratör tasarımının temelidir.",
        "Kondenser basıncı ve türbin izentropik verimi, net güçte en etkili iki parametredir.",
        "h-s diyagramı üzerinden izleme, arıza teşhisini (nem artışı, vakum kaybı) hızlandırır."
      ]
    },
    "Brayton çevrimi (gaz türbini)": {
      title: "Brayton Çevrimi (Gaz Türbini)",
      introduction: "Brayton çevrimi, sürekli akışlı güç üretiminin temel modelidir ve kompresör-yanma odası-türbin üçlüsü üzerinden çalışır. Denizcilikte yüksek güç/ağırlık oranı ve hızlı yük alma kabiliyeti nedeniyle hızlı askeri gemiler, bazı LNG uygulamaları ve kombine çevrim (COGAS/COGES) sistemlerinde önem kazanır.",
      sections: [
        {
          heading: "Temel Süreçler ve Gerçek Sistem Sapmaları",
          paragraphs: [
            "1→2 izentropik sıkıştırma varsayımı pratikte kompresör verimi ile sınırlıdır; gerçek sıkıştırma için daha fazla iş gerekir.",
            "2→3 sabit basınçta ısı ekleme sırasında yanma odası basınç kayıpları oluşur. Bu kayıp, çevrim net işini doğrudan azaltır.",
            "3→4 türbinde genleşme ile güç üretilir; türbinin bir kısmı kompresörü sürmek için harcanır, kalan kısım faydalı şaft gücüdür.",
            "4→1 çevrim kapanışı ideal modelde çevreye ısı atımıdır; gerçek makinede egzoz ısısı WHRS ile geri kazanılabilir."
          ],
          diagram: { src: "/diagrams/machine/brayton-cevrimi.svg", alt: "Brayton çevrimi P-v diyagramı", caption: "Şekil: Brayton çevrimi — kompresör, yanma odası, türbin" }
        },
        {
          heading: "Verim, Basınç Oranı ve Özgül İş",
          paragraphs: [
            "İdeal Brayton verimi basınç oranı arttıkça yükselir; ancak çok yüksek basınç oranlarında kompresör işi büyür ve malzeme sıcaklık limitleri devreye girer.",
            "Gerçek tasarımda optimum nokta; kompresör harcaması, türbin giriş sıcaklığı (TIT) limiti, soğutma havası ihtiyacı ve emisyon hedefleri birlikte değerlendirilerek bulunur."
          ],
          formula: {
            expression: "ηBrayton = 1 − (1/rp)^((γ−1)/γ)\nBack Work Ratio = wc / wt",
            variables: [
              "rp: Kompresör basınç oranı",
              "wc: Kompresör işi",
              "wt: Türbin işi"
            ]
          }
        },
        {
          heading: "Sayısal Örnek",
          paragraphs: ["İdeal bir ön hesapla verim seviyesi görülebilir; gerçek sistemde kompresör/türbin verimleri ayrıca uygulanmalıdır."],
          example: {
            problem: "Basınç oranı 12 ve γ=1.4 için ideal Brayton çevrimi verimini hesaplayınız.",
            steps: [
              "η = 1 − (1/12)^((1.4−1)/1.4)",
              "η = 1 − (1/12)^0.2857",
              "12^0.2857 ≈ 2.034",
              "η = 1 − 1/2.034 = 0.508"
            ],
            result: "İdeal çevrim verimi yaklaşık %50.8 bulunur. Gerçek deniz gaz türbinlerinde ekipman verimleri ve yanma odası kayıpları nedeniyle tipik değer %30-40 bandındadır."
          }
        },
        {
          heading: "Deniz Uygulaması ve Kombine Çevrim",
          paragraphs: [
            "Gaz türbini egzozu 450-550°C seviyelerinde olduğundan, bu ısı HRSG üzerinden Rankine alt çevrimine verilerek COGAS/COGES sisteminde toplam verim anlamlı biçimde artırılır.",
            "Kısmi yükte verim düşüşü gaz türbinlerinin zayıf noktasıdır; bu nedenle hibrit konfigürasyonlarda yük paylaşımı dizel-jeneratörlerle optimize edilir."
          ]
        }
      ],
      keyPoints: [
        "Brayton çevrimi yüksek güç yoğunluğu sağlar ancak kısmi yük verimi sınırlıdır.",
        "Basınç oranı ve türbin giriş sıcaklığı temel performans sürücüleridir.",
        "Atık ısı geri kazanımı (COGAS/COGES) olmadan egzoz enerjisinin büyük kısmı kaybedilir."
      ]
    },
    "Ters çevrimler: soğutma ve ısı pompası": {
      title: "Ters Çevrimler: Soğutma ve Isı Pompası",
      introduction: "Ters çevrimler, ısının doğal akış yönüne karşı düşük sıcaklık seviyesinden yüksek sıcaklık seviyesine taşınmasını sağlar ve bunun için dışarıdan iş girdisi gerekir. Gemilerde klima, soğuk depo, provizyon odası ve bazı proses ısıtma uygulamalarında bu çevrimler kritik önemdedir.",
      sections: [
        {
          heading: "Buhar Sıkıştırmalı Soğutma Çevrimi Bileşenleri",
          paragraphs: [
            "Kompresör: Düşük basınçlı buharı sıkıştırır; çevrimin ana güç tüketicisidir.",
            "Kondenser: Akışkan ısı vererek yoğuşur; deniz suyu soğutmalı kondensörler gemilerde yaygındır.",
            "Genleşme elemanı: Basınç düşürerek akışkanı evaporatör şartlarına taşır.",
            "Evaporatör: Korunacak hacimden ısı çekilerek soğutma etkisi oluşturulur."
          ]
        },
        {
          heading: "COP Kavramı ve Enerji Yorumu",
          paragraphs: [
            "Soğutma çevriminde performans metriği COP_refrigeration = QL/Wnet olarak tanımlanır. Isı pompasında ise amaç ısıtmadır ve COPheatpump = QH/Wnet olur.",
            "COP değerinin 1'den büyük olması termodinamiğe aykırı değildir; çünkü cihaz ısıyı 'üretmez', düşük sıcaklıktan çekip yüksek sıcaklığa taşır."
          ],
          formula: {
            expression: "COPsoğutma = QL / Wnet\nCOPısı pompası = QH / Wnet = COPsoğutma + 1",
            variables: [
              "QL: Düşük sıcaklık tarafında çekilen ısı",
              "QH: Yüksek sıcaklık tarafına verilen ısı",
              "Wnet: Kompresör net işi"
            ]
          }
        },
        {
          heading: "Sayısal Örnek",
          paragraphs: ["Gemi provizyon soğutma sisteminde kompresör gücünün izlenmesi, COP trendinin bozulmasını erken yakalamak için temel göstergedir."],
          example: {
            problem: "Evaporatörden 50 kW ısı çeken bir soğutma sisteminde kompresör gücü 15 kW ise soğutma ve ısı pompası COP değerlerini bulunuz.",
            steps: [
              "COPsoğutma = QL / W = 50 / 15 = 3.33",
              "QH = QL + W = 50 + 15 = 65 kW",
              "COPısı pompası = QH / W = 65 / 15 = 4.33"
            ],
            result: "Soğutma COP'u 3.33, ısı pompası COP'u 4.33 bulunur. Aynı cihaz farklı amaçla kullanıldığında performans tanımı değişse de enerji dengesi aynıdır."
          }
        },
        {
          heading: "Saha Problemleri ve Verim Düşüş Nedenleri",
          paragraphs: [
            "Kondenser kirlenmesi, hava/gaz varlığı ve yetersiz deniz suyu debisi kondenser basıncını artırır; kompresör işi yükselir ve COP düşer.",
            "Evaporatör buzlanması, genleşme valfi ayarsızlığı ve soğutucu kaçakları soğutma kapasitesini azaltır. Trend izleme için emme-basma basınçları, süperheat ve subcooling değerleri birlikte kaydedilmelidir."
          ]
        }
      ],
      keyPoints: [
        "Ters çevrimlerde amaç ısıyı taşımaktır; COP verimden farklı bir performans ölçütüdür.",
        "Kondenser/evaporatör ısı transfer koşulları bozulduğunda COP hızlı düşer.",
        "Gemide enerji yönetimi için soğutma sistemlerinde düzenli COP trend analizi yapılmalıdır."
      ]
    },
    "Fourier iletim yasası": {
      title: "Fourier İletim Yasası",
      introduction: "Fourier yasası, kondüksiyon (iletim) yoluyla ısı transferinin temel denklemini tanımlar. Isı akısı, sıcaklık gradyanıyla doğru orantılıdır.",
      sections: [
        { heading: "Temel Denklem", paragraphs: ["Isı, yüksek sıcaklıktan düşük sıcaklığa doğru iletilir. Bir boyutlu kararlı iletim için:"], formula: { expression: "Q̇ = −k·A·(dT/dx)\nDüz duvar için: Q̇ = k·A·(T₁−T₂)/L", variables: ["Q̇: Isı akısı (W)", "k: Isıl iletkenlik katsayısı (W/m·K)", "A: Isı transfer alanı (m²)", "L: Duvar kalınlığı (m)"] }, example: { problem: "Bir çelik kazan duvarı 25 mm kalınlığında, iç yüzey sıcaklığı 300°C, dış yüzey sıcaklığı 280°C ve alan 2 m²'dir. kçelik = 50 W/m·K. Isı akısını bulunuz.", steps: ["Q̇ = k·A·ΔT/L", "Q̇ = 50 × 2 × (300−280) / 0.025", "Q̇ = 50 × 2 × 20 / 0.025 = 80 000 W = 80 kW"], result: "Duvardan geçen ısı akısı 80 kW'tır." } }
      ],
      keyPoints: ["k değeri malzemeye bağlıdır: bakır ~385, çelik ~50, yalıtım ~0.04 W/m·K.", "Yalıtım malzemeleri düşük k değerine sahiptir.", "Boru ve tank yalıtım kalınlığı bu denklemle hesaplanır."]
    },
    "Çok katmanlı duvar ve silindirik iletim": {
      title: "Çok Katmanlı Duvar ve Silindirik İletim",
      introduction: "Gemi yapılarında ve makine bileşenlerinde ısı transferi genellikle farklı malzeme katmanlarından veya silindirik geometrilerden gerçekleşir.",
      sections: [
        { heading: "Çok Katmanlı Düz Duvar", paragraphs: ["Her katman bir ısıl dirence karşılık gelir. Toplam ısıl direnç, seri bağlı dirençler gibi toplanır."], formula: { expression: "Q̇ = (T₁ − Tn) / Σ(Lᵢ/kᵢ·A)", variables: ["Lᵢ: i. katman kalınlığı", "kᵢ: i. katman iletkenlik katsayısı"] } },
        { heading: "Silindirik İletim", paragraphs: ["Borularda ve silindir gömleğinde radyal yönde ısı transferi logaritmik ilişkiyle hesaplanır."], formula: { expression: "Q̇ = 2πkL(T₁−T₂) / ln(r₂/r₁)", variables: ["r₁, r₂: İç ve dış yarıçap", "L: Silindir uzunluğu"] } }
      ],
      keyPoints: ["Isıl direnç kavramı elektrik direnç analojisiyle kullanılır.", "Boru yalıtımında kritik yarıçap kavramı önemlidir.", "Silindir gömleği ısı transferi silindirik iletim denklemleriyle hesaplanır."]
    },
    "Newton soğuma yasası (taşınım)": {
      title: "Newton Soğuma Yasası (Taşınım)",
      introduction: "Newton soğuma yasası, bir yüzey ile çevresindeki akışkan arasındaki konvektif ısı transferini tanımlar.",
      sections: [
        { heading: "Temel Denklem", paragraphs: [], formula: { expression: "Q̇ = h·A·(Ts − T∞)", variables: ["h: Taşınım ısı transfer katsayısı (W/m²·K)", "Ts: Yüzey sıcaklığı", "T_∞: Akışkan sıcaklığı", "A: Isı transfer alanı"] } },
        { heading: "h Değerleri", paragraphs: [], table: { headers: ["Taşınım Tipi", "h (W/m²·K)"], rows: [["Doğal taşınım (hava)", "5-25"], ["Zorlanmış taşınım (hava)", "25-250"], ["Doğal taşınım (su)", "100-900"], ["Zorlanmış taşınım (su)", "250-12000"], ["Kaynama/yoğunlaşma", "2500-100000"]] } }
      ],
      keyPoints: ["h değeri akış rejimi, geometri ve akışkan özelliklerine bağlıdır.", "Gemi eşanjörlerinde zorlanmış taşınım hakimdir.", "Kaynama ve yoğunlaşma en yüksek h değerlerini verir."]
    },
    "Stefan–Boltzmann ışınım yasası": {
      title: "Stefan–Boltzmann Işınım Yasası",
      introduction: "Her cisim sıcaklığına bağlı olarak elektromanyetik dalga yayar. Işınım yoluyla ısı transferi, yüksek sıcaklıklarda baskın mekanizmadır.",
      sections: [
        { heading: "Temel Denklem", paragraphs: [], formula: { expression: "Q̇ = ε·σ·A·(Ts⁴ − Tçevre⁴)", variables: ["ε: Yüzey yayma katsayısı (0-1)", "σ: Stefan-Boltzmann sabiti = 5.67×10⁻⁸ W/m²·K⁴", "T: Mutlak sıcaklık (K)"] }, example: { problem: "Bir egzoz borusunun dış yüzey sıcaklığı 350°C, çevre sıcaklığı 40°C, ε = 0.8, yüzey alanı 3 m². Işınım ısı kaybını bulunuz.", steps: ["Ts = 350 + 273 = 623 K, Tçevre = 40 + 273 = 313 K", "Q̇ = 0.8 × 5.67×10⁻⁸ × 3 × (623⁴ − 313⁴)", "623⁴ = 1.506×10¹¹, 313⁴ = 9.596×10⁹", "Q̇ = 0.8 × 5.67×10⁻⁸ × 3 × (1.506×10¹¹ − 9.596×10⁹)", "Q̇ = 1.361×10⁻⁷ × 1.410×10¹¹ = 19 187 W ≈ 19.2 kW"], result: "Egzoz borusundan ışınım ısı kaybı yaklaşık 19.2 kW'tır." } }
      ],
      keyPoints: ["Işınım T⁴'e bağlı olduğundan yüksek sıcaklıklarda çok etkilidir.", "Kazan ve egzoz sistemlerinde ışınım ısı kaybı önemlidir.", "Parlak metalik yüzeyler düşük ε değerine sahiptir (ε ≈ 0.05-0.2)."]
    },
    "Toplam ısı geçiş katsayısı (U)": {
      title: "Toplam Isı Geçiş Katsayısı (U)",
      introduction: "Toplam ısı geçiş katsayısı, iletim, taşınım ve (gerektiğinde) ışınım dirençlerinin birleşik etkisini tek bir katsayıda özetler.",
      sections: [
        { heading: "Düz Duvar İçin U Değeri", paragraphs: [], formula: { expression: "1/U = 1/h₁ + L/k + 1/h₂\nQ̇ = U·A·ΔT", variables: ["h₁, h₂: İç ve dış taşınım katsayıları", "L/k: İletim direnci"] }, example: { problem: "Bir ısı eşanjörünün çelik boru duvarı: hiç = 5000 W/m²·K, hdış = 3000 W/m²·K, L = 3 mm, k = 50 W/m·K. U değerini bulunuz.", steps: ["1/U = 1/5000 + 0.003/50 + 1/3000", "1/U = 0.0002 + 0.00006 + 0.000333", "1/U = 0.000593", "U = 1686 W/m²·K"], result: "Toplam ısı geçiş katsayısı U = 1686 W/m²·K." } }
      ],
      keyPoints: ["En küçük h değeri (veya en büyük direnç) U'yu belirler.", "Fouling (kirlenme) U değerini önemli ölçüde düşürür.", "Isı eşanjör performans izlemesinde U değeri temel göstergedir."]
    },
    "Paralel akış ve ters akış düzenlemeleri": {
      title: "Paralel Akış ve Ters Akış Düzenlemeleri",
      introduction: "Isı eşanjörlerinde sıcak ve soğuk akışkanların göreceli akış yönü, ısı transfer performansını doğrudan etkiler.",
      sections: [
        { heading: "Paralel Akış", paragraphs: ["Her iki akışkan aynı yönde akar. Girişteki sıcaklık farkı maksimumdur ve çıkışa doğru azalır. Soğuk akışkan çıkış sıcaklığı sıcak akışkan çıkış sıcaklığını geçemez."] },
        { heading: "Ters Akış", paragraphs: ["Akışkanlar zıt yönlerde akar. Sıcaklık farkı eşanjör boyunca daha düzgün dağılır. Soğuk akışkan çıkış sıcaklığı, sıcak akışkan çıkış sıcaklığını geçebilir.", "Aynı ısı transfer alanı için ters akış düzeni daha fazla ısı aktarır. Bu nedenle gemi eşanjörlerinde ters akış tercih edilir."] }
      ],
      keyPoints: ["Ters akış, aynı koşullarda paralel akıştan daha verimlidir.", "Ters akışta LMTD değeri daha yüksektir.", "Gemi yağ soğutucuları ve yakıt ısıtıcıları genellikle ters akışlıdır."]
    },
    "LMTD (logaritmik ortalama sıcaklık farkı)": {
      title: "LMTD (Logaritmik Ortalama Sıcaklık Farkı)",
      introduction: "LMTD, ısı eşanjör hesaplarında kullanılan ortalama sıcaklık farkıdır. Eşanjör boyunca değişen sıcaklık farkını tek bir değerle ifade eder.",
      sections: [
        { heading: "Formül", paragraphs: [], formula: { expression: "LMTD = (ΔT₁ − ΔT₂) / ln(ΔT₁/ΔT₂)\nQ̇ = U · A · LMTD", variables: ["ΔT₁: Bir uçtaki sıcaklık farkı", "ΔT₂: Diğer uçtaki sıcaklık farkı"] }, example: { problem: "Bir yağ soğutucusunda (ters akış): Yağ 80→60°C, soğutma suyu 35→50°C. LMTD'yi bulunuz.", steps: ["ΔT₁ = 80 − 50 = 30°C (sıcak giriş − soğuk çıkış)", "ΔT₂ = 60 − 35 = 25°C (sıcak çıkış − soğuk giriş)", "LMTD = (30 − 25) / ln(30/25)", "LMTD = 5 / ln(1.2) = 5 / 0.1823 = 27.4°C"], result: "LMTD = 27.4°C." } }
      ],
      keyPoints: ["ΔT₁ = ΔT₂ ise LMTD = ΔT₁ = ΔT₂ (aritmetik ortalama).", "LMTD düştüğünde eşanjör yüzey alanı artırılmalıdır.", "Fouling nedeniyle U düşer ve aynı performans için LMTD artmalıdır."]
    },
    "Plakalı ısı eşanjörleri": {
      title: "Plakalı Isı Eşanjörleri",
      introduction: "Plakalı ısı eşanjörleri, ince oluklu metal plakalar arasında oluşan kanallardan akışkanların geçmesiyle ısı transferi sağlayan kompakt cihazlardır.",
      sections: [
        { heading: "Yapı ve Çalışma", paragraphs: ["İnce paslanmaz çelik plakalar (0.5-1.0 mm) titanyum veya EPDM contalarla sızdırmaz olarak birleştirilir. Sıcak ve soğuk akışkanlar alternatif kanallardan geçer.", "Oluklu (chevron/herringbone) desen türbülanslı akış yaratır ve ısı transfer katsayısını artırır. U değeri kabuk-boru eşanjörlerin 3-5 katı olabilir."] },
        { heading: "Avantaj ve Dezavantajlar", paragraphs: [], table: { headers: ["Avantaj", "Dezavantaj"], rows: [["Yüksek U değeri (3000-7000 W/m²·K)", "Basınç limiti (~25 bar)"], ["Kompakt boyut", "Sıcaklık limiti (~150°C contalarla)"], ["Kolay söküm ve temizlik", "Conta bozulma riski"], ["Esnek kapasite (plaka ekleme)", "Yüksek viskoziteli akışkanlara sınırlı uygunluk"]] } }
      ],
      keyPoints: ["Gemi merkezi soğutma suyu eşanjörlerinde yaygındır.", "Kaynaklanmış plakalı eşanjörler daha yüksek basınç ve sıcaklığa dayanır.", "Periyodik contalar değişimi gerekir."]
    },
    "Kabuk–boru (shell & tube) eşanjörler": {
      title: "Kabuk–Boru (Shell & Tube) Eşanjörler",
      introduction: "Kabuk-boru eşanjör, denizcilik endüstrisinde en geleneksel ve yaygın ısı eşanjör tipidir. Dayanıklılığı ve geniş çalışma aralığı ile tercih edilir.",
      sections: [
        { heading: "Yapı", paragraphs: ["Bir dış kabuk (shell) içinde çok sayıda ince boru (tube) bulunur. Bir akışkan borulardan, diğeri kabuktan akar. Ayırma plakaları (baffle) kabuk tarafındaki akışı yönlendirir ve türbülans yaratır."] },
        { heading: "Gemi Uygulamaları", paragraphs: [], table: { headers: ["Uygulama", "Boru Tarafı", "Kabuk Tarafı"], rows: [["Yağ soğutucu", "Deniz suyu", "Yağlama yağı"], ["Yakıt ısıtıcı", "Buhar", "Yakıt (HFO)"], ["Tatlı su soğutucu", "Deniz suyu", "Tatlı su"], ["Kondenser", "Deniz suyu", "Soğutucu akışkan"]] } }
      ],
      keyPoints: ["Deniz suyu korozyonu nedeniyle borular genellikle Cu-Ni alaşımdır.", "Boru demeti çekilebilir olmalıdır (cleaning access).", "Anotik koruma ile korozyon önlenir."]
    },
    "Fouling ve temizlik etkileri": {
      title: "Fouling ve Temizlik Etkileri",
      introduction: "Fouling, ısı eşanjör yüzeylerinde biyolojik, kimyasal veya mekanik birikintilerin oluşmasıdır. Isı transfer performansını ciddi ölçüde düşürür.",
      sections: [
        { heading: "Fouling Tipleri", paragraphs: [], table: { headers: ["Tip", "Neden", "Etkilenen Sistem"], rows: [["Biyolojik", "Deniz organizmaları", "Deniz suyu eşanjörleri"], ["Kimyasal", "Korozyon ürünleri, kireç", "Kazan, soğutma suyu"], ["Partiküler", "Çamur, tortu", "Yakıt ısıtıcıları"], ["Kristalizasyon", "Tuz çökelmesi", "Evaporatörler"]] } },
        { heading: "Etki ve Hesap", paragraphs: ["Fouling direnci (Rf) toplam ısıl dirence eklenir."], formula: { expression: "1/Ukirli = 1/Utemiz + Rf", variables: ["Rf: Fouling direnci (m²·K/W)", "Tipik değerler: 0.0001-0.001 m²·K/W"] } }
      ],
      keyPoints: ["Fouling izleme: ΔT artışı veya U değeri düşüşü ile takip edilir.", "Kimyasal temizlik (CIP) veya mekanik temizlik uygulanır.", "TEMA standartları fouling direnci tasarım değerlerini belirler."]
    },
    "Egzoz gazı ekonomizeri": {
      title: "Egzoz Gazı Ekonomizeri",
      introduction: "Egzoz gazı ekonomizeri, ana makine egzoz gazlarındaki atık ısıyı kullanarak buhar üreten veya suyu ön ısıtan bir ısı geri kazanım cihazıdır.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Ana makine egzoz gazı sıcaklığı türboşarjer çıkışında yaklaşık 200-350°C'dir. Ekonomizer bu ısıyı kullanarak kazandan bağımsız buhar üretir.", "Üretilen buhar gemi ısıtma ihtiyaçları (yakıt ısıtma, yaşam mahalli ısıtma, tatlı su üretimi) için kullanılır. Tam yükte yardımcı kazanın devre dışı kalmasını sağlayabilir."] },
        { heading: "Güvenlik", paragraphs: ["Ekonomizer yangını en kritik risktir. Is (soot) birikimi ve düşük yük çalışma yangın riskini artırır.", "Soot blowing periyodik olarak yapılmalıdır. Egzoz gazı sıcaklık izlemesi kritiktir."] }
      ],
      keyPoints: ["Ekonomizer, yakıt tasarrufuna doğrudan katkı sağlar.", "Düşük yüklerde by-pass edilmelidir (is birikimi riski).", "Soot fire belirtileri: anormal sıcaklık artışı, duman rengi değişimi."]
    },
    "Doğal ve zorlanmış taşınım": {
      title: "Doğal ve Zorlanmış Taşınım",
      introduction: "Taşınım (konveksiyon), akışkan hareketi sayesinde ısı transferi gerçekleşmesidir. Akışkan hareketinin kaynağına göre doğal veya zorlanmış olarak sınıflandırılır.",
      sections: [
        { heading: "Doğal Taşınım", paragraphs: ["Sıcaklık farkından kaynaklanan yoğunluk farklılıklarının oluşturduğu kaldırma kuvvetiyle akışkan hareketi sağlanır. Pompa veya fan gerekmez.", "Gemi uygulamaları: kazan doğal sirkülasyonu, yaşam mahalli radyatörleri, tank ısıtma serpantinleri."] },
        { heading: "Zorlanmış Taşınım", paragraphs: ["Pompa, fan veya kompresör gibi harici bir mekanizma akışkanı hareket ettirir. Isı transfer katsayısı doğal taşınımdan çok daha yüksektir.", "Gemi uygulamaları: merkezi soğutma suyu sistemi, klima fan-coil üniteleri, yağ ve yakıt ısıtıcıları."] }
      ],
      keyPoints: ["Zorlanmış taşınımda h değeri doğal taşınımın 10-100 katı olabilir.", "Doğal taşınım hesaplarında Grashof ve Rayleigh sayıları kullanılır.", "Zorlanmış taşınımda Nusselt ve Reynolds sayıları belirleyicidir."]
    },
    "Eşanjör verim hesapları": {
      title: "Eşanjör Verim Hesapları",
      introduction: "Isı eşanjör verimi (etkinliği), gerçekleşen ısı transferinin teorik maksimuma oranıdır.",
      sections: [
        { heading: "ε-NTU Yöntemi", paragraphs: ["LMTD yönteminin alternatifi olan ε-NTU yöntemi, çıkış sıcaklıklarının bilinmediği durumlarda kullanılır."], formula: { expression: "ε = Qgerçek / Qmaks\nQmaks = Cmin × (Th,giriş − Tc,giriş)\nNTU = U·A / Cmin", variables: ["Cmin: Minimum ısı kapasitesi akışı (W/K)", "C = ṁ·cp"] } }
      ],
      keyPoints: ["ε = 1 mümkün değildir; pratikte %60-90 arasındadır.", "NTU arttıkça etkinlik artar ancak azalan verimle.", "Eşanjör performans düşüşü fouling'in göstergesidir."]
    },
    "Atık ısı geri kazanım sistemi (WHRS)": {
      title: "Atık Isı Geri Kazanım Sistemi (WHRS)",
      introduction: "WHRS, ana makine egzoz gazı ve şarj havası soğutmasından elde edilen atık ısıyı elektrik enerjisine veya yararlı ısıya dönüştüren entegre sistemdir.",
      sections: [
        { heading: "Sistem Bileşenleri", paragraphs: ["Egzoz gazı ekonomizeri: Buhar üretir.", "Buhar türbini: Üretilen buharla elektrik üretir.", "Güç türbini: Egzoz gazı enerjisini doğrudan mekanik güce çevirir.", "Kombine sistem: Hem buhar türbini hem güç türbini birlikte kullanılır."] },
        { heading: "Enerji Kazanımı", paragraphs: [], table: { headers: ["WHRS Konfigürasyonu", "Yakıt Tasarrufu"], rows: [["Sadece güç türbini", "%3-5"], ["Sadece buhar türbini", "%5-8"], ["Kombine (ST+PT)", "%8-11"], ["Kombine + termoelektrik", "%10-14"]] } }
      ],
      keyPoints: ["WHRS, EEDI/CII uyumunda önemli bir araçtır.", "Yatırım maliyeti yüksektir ancak uzun vadede geri döner.", "Ana makinenin yük profiline göre boyutlandırılmalıdır."]
    },
    "Buhar jeneratörü ve türbin entegrasyonu": {
      title: "Buhar Jeneratörü ve Türbin Entegrasyonu",
      introduction: "Gemi enerji sistemlerinde buhar jeneratörü (kazan) ile türbin entegrasyonu, atık ısı geri kazanımı ve yüksek verimli enerji üretimi sağlar.",
      sections: [
        { heading: "Buhar Türbin Tahrik", paragraphs: ["LNG taşıyıcılarında buhar türbin tahrik sistemi, kaynamış LNG'yi (BOG) yakıt olarak kullanır. Kazan-türbin-kondenser-pompa döngüsü Rankine çevrimini oluşturur.", "Modern LNG gemilerinde DFDE (Dual Fuel Diesel Electric) veya ME-GI/X-DF motorlar buhar türbin sisteminin yerini almaktadır."] },
        { heading: "Kojenerasyon", paragraphs: ["Egzoz gazı ekonomizerinden üretilen buhar, hem ısıtma hem de türbin tahrikli jeneratörde elektrik üretimi için kullanılır. Bu çift amaçlı kullanım kojenerasyon olarak adlandırılır."] }
      ],
      keyPoints: ["Buhar türbin verimi düşüktür (%30-35) ancak düşük kaliteli yakıt kullanabilir.", "Modern gemilerde buhar türbin tahrik sistemi azalmaktadır.", "WHRS kapsamında buhar türbin-jeneratör yaygınlaşmaktadır."]
    },
    "Kojenerasyon uygulamaları": {
      title: "Kojenerasyon Uygulamaları",
      introduction: "Kojenerasyon, bir enerji kaynağından eş zamanlı olarak hem elektrik hem ısı üretimidir. Toplam enerji verimi %80-90'a ulaşabilir.",
      sections: [
        { heading: "Gemi Kojenerasyon Sistemi", paragraphs: ["Ana makine egzoz ısısı → ekonomizer → buhar üretimi → ısıtma + türbin jeneratör.", "Silindir soğutma suyu ısısı → tatlı su üretimi (evaporatör).", "Şarj havası soğutma ısısı → ön ısıtma (yakıt, kazan besleme suyu)."] },
        { heading: "Verim Karşılaştırma", paragraphs: [], table: { headers: ["Sistem", "Elektrik Verimi", "Toplam Verim"], rows: [["Sadece dizel motor", "%45-50", "%45-50"], ["Motor + ekonomizer", "%45-50", "%55-65"], ["Motor + WHRS (tam)", "%48-55", "%65-80"]] } }
      ],
      keyPoints: ["Kojenerasyon, yakıt tüketimini azaltarak CII performansını iyileştirir.", "En verimli sonuç tam yükte elde edilir.", "Isı ve elektrik talebinin dengeli olması gerekir."]
    },
    "Enerji dönüşüm verimi ve kayıp analizi": {
      title: "Enerji Dönüşüm Verimi ve Kayıp Analizi",
      introduction: "Gemi enerji sistemlerinde yakıtın kimyasal enerjisinin faydalı işe dönüşüm verimi ve kayıp kaynaklarının analizi, verimlilik iyileştirmesinin temelidir.",
      sections: [
        { heading: "Enerji Akış Diyagramı (Sankey)", paragraphs: ["Ana dizel motorda yakıt enerjisinin dağılımı:"], table: { headers: ["Enerji Kalemi", "Oran"], rows: [["Faydalı iş (şaft gücü)", "%48-52"], ["Egzoz gazı ısısı", "%25-30"], ["Soğutma suyu ısısı", "%10-15"], ["Yağlama yağı ısısı", "%3-5"], ["Işınım ve diğer kayıplar", "%3-5"]] } },
        { heading: "Kayıp Azaltma Stratejileri", paragraphs: ["Egzoz ısısı: Ekonomizer, WHRS.", "Soğutma suyu ısısı: Evaporatör, ön ısıtma.", "Mekanik kayıplar: Yağlama optimizasyonu, sürtünme azaltma.", "Yanma kayıpları: Enjeksiyon optimizasyonu, hava fazlalığı kontrolü."] }
      ],
      keyPoints: ["Modern büyük dizel motorların termal verimi %50'yi aşabilir.", "WHRS ile toplam verim %55-60'a yükseltilebilir.", "Exerji analizi, kayıpların kalitesini de değerlendirir."]
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // DENİZ DİZEL MAKİNELERİ — Eksik alt başlıklar
  // ═══════════════════════════════════════════════════════════════
  "diesel-engines": {
    "Dizel çevrimi ve sıkıştırma ile ateşleme": {
      title: "Dizel Çevrimi ve Sıkıştırma ile Ateşleme",
      introduction: "Dizel motorlar, havanın yüksek sıkıştırma oranıyla ısıtılması ve yakıtın bu sıcak havaya püskürtülmesiyle ateşleme sağlayan içten yanmalı motorlardır.",
      sections: [
        { heading: "Sıkıştırma ile Ateşleme Prensibi", paragraphs: ["Dizel motorlarda sıkıştırma oranı 12:1 ile 24:1 arasındadır. Hava sıkıştırma sonunda 600-900°C'ye ulaşır ki bu değer dizel yakıtın tutuşma noktasının (250-350°C) çok üzerindedir.", "Yakıt, sıkıştırma strokunu sonunda yüksek basınçla (300-2000 bar) enjekte edilir ve sıcak hava ile temas ettiğinde kendiliğinden tutuşur."] },
        { heading: "İdeal Dizel Çevrimi", paragraphs: ["1→2: Adyabatik sıkıştırma.", "2→3: Sabit basınçta ısı alımı (yakıt enjeksiyonu süresi boyunca).", "3→4: Adyabatik genleşme.", "4→1: Sabit hacimde ısı atımı."], formula: { expression: "ηDiesel = 1 − (1/r^(γ-1)) × [(ρ^γ − 1) / (γ(ρ − 1))]", variables: ["r: Sıkıştırma oranı", "ρ: Kesme oranı (V₃/V₂)", "γ: Özgül ısı oranı"] } }
      ],
      keyPoints: ["Yüksek sıkıştırma oranı = yüksek verim.", "Gerçek dizel motorlar Sabathe çevrimine daha yakındır.", "İki zamanlı büyük deniz motorlarında sıkıştırma oranı yaklaşık 12-16 arasındadır."]
    },
    "İki zamanlı motor çalışma prensibi": {
      title: "İki Zamanlı Motor Çalışma Prensibi",
      introduction: "İki zamanlı dizel motor, krank milinin her devrinde bir güç stroku üretir. Büyük deniz ana motorlarının çoğu iki zamanlıdır.",
      sections: [
        { heading: "Çalışma Döngüsü", paragraphs: ["Yukarı Strok: Piston yukarı hareket ederken portlar kapanır, gaz sıkıştırılır. ÜÖN civarında yakıt enjekte edilir.", "Aşağı Strok: Yanma genleşme yaratır (iş üretimi). Piston aşağı indiğinde egzoz valfi açılır (blowdown). Ardından süpürme portları açılır, taze hava silindir içine dolar ve kalan egzoz gazlarını süpürür."] },
        { heading: "Uniflow Süpürme", paragraphs: ["Modern iki zamanlı motorlar uniflow (tek yönlü) süpürme kullanır. Taze hava silindir alt portlarından girer, egzoz gazı üstteki egzoz valfinden çıkar. Bu düzen en etkin süpürmeyi sağlar."], table: { headers: ["Özellik", "İki Zamanlı", "Dört Zamanlı"], rows: [["Güç stroku", "Her devir", "Her 2 devirde bir"], ["Yapı", "Crosshead", "Trunk piston"], ["Devir", "80-120 rpm", "400-1000 rpm"], ["Verim", "%48-52", "%42-48"], ["Kullanım", "Ana makine", "Yardımcı makine"]] } }
      ],
      keyPoints: ["İki zamanlı motor düşük devir ve yüksek verim sağlar.", "Direkt tahrik ile pervaneye bağlanır (redüktör gereksiz).", "Süpürme havası turboşarjer ve yardımcı üfleyici ile sağlanır."]
    },
    "Dört zamanlı motor çalışma prensibi": {
      title: "Dört Zamanlı Motor Çalışma Prensibi",
      introduction: "Dört zamanlı dizel motor, krank milinin iki tam devrinde bir güç stroku üretir. Gemi yardımcı motorlarında ve bazı orta hızlı ana motorlarda kullanılır.",
      sections: [
        { heading: "Dört Strok", paragraphs: ["1. Emme: Piston aşağı, emme supabı açık. Silindir taze hava ile dolar.", "2. Sıkıştırma: Piston yukarı, tüm supaplar kapalı. Hava sıkıştırılır (~35-40 bar, ~550-700°C).", "3. Yanma-Genleşme: ÜÖN civarında yakıt enjeksiyonu, yanma ve genleşme. İş üretilir.", "4. Egzoz: Piston yukarı, egzoz supabı açık. Yanmış gazlar dışarı atılır."] },
        { heading: "Supap Mekanizması", paragraphs: ["Dört zamanlı motorlarda emme ve egzoz supapları kam mili tarafından tahrik edilir. Kam mili krank milinin yarı hızında döner. Supap zamanlaması motor performansı için kritiktir."] }
      ],
      keyPoints: ["Dört zamanlı motor, iki zamanlıya göre daha kompakt ve hafiftir.", "Gemi jeneratörleri ve orta hızlı motorlar (MAN, Wärtsilä) bu tiptedir.", "Trunk piston tasarımı nedeniyle karter yağlama gerektirir."]
    },
    "Düşük, orta ve yüksek devirli motorlar": {
      title: "Düşük, Orta ve Yüksek Devirli Motorlar",
      introduction: "Deniz dizel motorları çalışma devirlerine göre sınıflandırılır. Devir aralığı motor boyutu, verim ve kullanım amacıyla doğrudan ilişkilidir.",
      sections: [
        { heading: "Sınıflandırma", paragraphs: [], table: { headers: ["Sınıf", "Devir (rpm)", "Güç Aralığı", "Kullanım", "Tip"], rows: [["Düşük devirli", "80-200", "5000-80000 kW", "Ana makine (direkt)", "İki zamanlı crosshead"], ["Orta devirli", "300-1000", "1000-25000 kW", "Ana/Yardımcı", "Dört zamanlı trunk piston"], ["Yüksek devirli", "1000-3000", "100-5000 kW", "Yardımcı/küçük gemi", "Dört zamanlı"]] } },
        { heading: "Seçim Kriterleri", paragraphs: ["Düşük devirli motorlar en yüksek verimi ve en düşük SFOC'u sağlar. Büyük konteyner, tanker ve dökme yük gemilerinde tercih edilir.", "Orta devirli motorlar esneklik ve kompaktlık avantajı sunar. Redüktör veya elektrik tahrikle pervaneye bağlanır."] }
      ],
      keyPoints: ["Düşük devirli motorlar verimi %50'yi aşabilir.", "Strok/çap oranı düşük devirli motorlarda 3-4:1 arasındadır.", "Devir azaldıkça motor boyutu ve ağırlığı artar."]
    },
    "Crosshead ve trunk piston motor farkları": {
      title: "Crosshead ve Trunk Piston Motor Farkları",
      introduction: "Deniz dizel motorlarının iki temel yapısal tipi crosshead ve trunk piston motorlardır. Bu ayrım, motor boyutu, yağlama sistemi ve bakım prosedürlerini belirler.",
      sections: [
        { heading: "Crosshead Motor", paragraphs: ["Piston ile biyel kolu arasında crosshead (çapraz kafa) mekanizması bulunur. Piston çubuğu (piston rod) crosshead'e rijit bağlıdır.", "Yanma odası ile karter tamamen ayrıdır. Bu sayede silindir yağlaması ve karter yağlaması bağımsızdır."] },
        { heading: "Trunk Piston Motor", paragraphs: ["Piston doğrudan biyel koluna bağlıdır. Piston aynı zamanda çapraz kuvvetleri taşır.", "Yanma odası ile karter arasında doğrudan bağlantı vardır. Silindir yağı ve karter yağı aynı sistemdir."], table: { headers: ["Özellik", "Crosshead", "Trunk Piston"], rows: [["Strok/çap oranı", "3-4.5:1", "1-1.5:1"], ["Silindir yağlaması", "Bağımsız (gözetimli)", "Karter yağıyla ortak"], ["Bakım", "Piston alttan çıkarılabilir", "Silindir kapağından"], ["Karter güvenliği", "Yüksek (ayrı)", "Dikkat gerektirir"], ["Devir", "80-200 rpm", "300-1000 rpm"]] } }
      ],
      keyPoints: ["Crosshead motorlarda düşük kaliteli silindir yağı kullanılabilir (yüksek BN).", "Trunk piston motorlarda karter patlaması riski daha yüksektir.", "Büyük iki zamanlı motorlar crosshead, yardımcı motorlar trunk piston tipindedir."]
    },
    "Silindir kapağı (cylinder head)": {
      title: "Silindir Kapağı (Cylinder Head)",
      introduction: "Silindir kapağı, yanma odasını üstten kapatan ve çeşitli bileşenleri barındıran kritik bir motor parçasıdır.",
      sections: [
        { heading: "Görevleri ve Bileşenleri", paragraphs: ["Silindir kapağı üzerinde egzoz valfi, yakıt enjektörü, emniyet valfi, indikatör vanası ve soğutma suyu kanalları bulunur.", "İki zamanlı motorlarda emme supabı yoktur (süpürme portları silindir gömleğinde). Dört zamanlı motorlarda hem emme hem egzoz supapları kapak üzerindedir."] },
        { heading: "Malzeme ve Soğutma", paragraphs: ["Yüksek mekanik ve termal gerilmelere dayanmalıdır. Genellikle yüksek mukavemetli dökme demirden üretilir.", "Soğutma suyu kanalları özellikle egzoz valfi etrafında yoğundur. Yetersiz soğutma termal çatlaklara yol açar."] }
      ],
      keyPoints: ["Silindir kapağı revizyonu büyük bakım işlerinin başında gelir.", "Termal çatlak en yaygın arıza tipidir.", "Hidrolik germe (hydraulic jack) ile sıkılır."]
    },
    "Silindir gömleği (liner) ve aşınma": {
      title: "Silindir Gömleği (Liner) ve Aşınma",
      introduction: "Silindir gömleği, pistonun içinde hareket ettiği değiştirilebilir silindirik parçadır. Aşınma yönetimi motor ömrü için kritiktir.",
      sections: [
        { heading: "Yapı ve Malzeme", paragraphs: ["Silindir gömleği yüksek mukavemetli perlitik dökme demirden üretilir. İç yüzey honlanarak optimum yağ tutma deseni oluşturulur.", "Yaş tip gömlek: Dış yüzey doğrudan soğutma suyuyla temas eder. Kuru tip gömlek: Blok içinde oturur."] },
        { heading: "Aşınma Tipleri", paragraphs: [], table: { headers: ["Aşınma Tipi", "Neden", "Bölge"], rows: [["Korozif aşınma", "Kükürt asidi (H₂SO₄) yoğunlaşması", "Alt bölge (liner cold corrosion)"], ["Abrazif aşınma", "Katalizör ince tanecikleri (Al+Si)", "Üst bölge"], ["Adhezif aşınma", "Yetersiz yağlama", "Genel"], ["Erozif aşınma", "Yüksek basınçlı gaz kaçağı", "Üst ölü nokta civarı"]] } },
        { heading: "Ölçüm ve Limitler", paragraphs: ["Liner çapı iç mikrometre ile ölçülür. Ovalite ve koniklik hesaplanır. Üretici tarafından belirlenen aşınma limitine ulaşıldığında değiştirilir.", "Tipik aşınma hızı: 0.05-0.10 mm/1000 saat (iyi durumda)."] }
      ],
      keyPoints: ["Silindir yağ BN değeri yakıtın kükürt oranına göre seçilir.", "Liner sıcaklığı 180°C'nin altına düşmemelidir (asit yoğunlaşma).", "Honlama deseni yağ filminin oluşmasını sağlar."]
    },
    "Piston ve segman tasarımı": {
      title: "Piston ve Segman Tasarımı",
      introduction: "Piston, yanma basıncını krank miline ileten ana bileşendir. Segmanlar gaz sızdırmazlığı ve yağ kontrolü sağlar.",
      sections: [
        { heading: "Piston Yapısı", paragraphs: ["İki zamanlı crosshead motorlarda piston taç (crown) ve etek (skirt) olarak iki parçadır. Taç yüksek alaşımlı çelikten, etek dökme demirdendir.", "Piston tacı yoğun soğutma gerektirir. Soğutma ortamı: yağlama yağı veya su (eski motorlarda)."] },
        { heading: "Segman Tipleri", paragraphs: [], table: { headers: ["Segman", "Görev", "Profil"], rows: [["Sıkıştırma segmanı", "Gaz sızdırmazlığı", "Dikdörtgen / CPR"], ["Kazıyıcı segman", "Yağ kontrolü", "Konik kenar"], ["Yağ segmanı", "Fazla yağı kazıma", "Çift dudaklı"]] } },
        { heading: "Aşınma Göstergeleri", paragraphs: ["Segman boşluk (gap) ölçümü: butt gap ve side clearance. Aşınmış segmanlar yağ tüketimi artışı, kompresyon kaybı ve egzoz dumanı artışına neden olur."] }
      ],
      keyPoints: ["Piston taç sıcaklığı 400-450°C'yi aşmamalıdır.", "Segman rotasyonu eşit aşınma sağlamak için gereklidir.", "CPR (Controlled Pressure Relief) segman blowby'ı azaltır."]
    },
    "Biyel kolu ve krank mili": {
      title: "Biyel Kolu ve Krank Mili",
      introduction: "Biyel kolu pistonun doğrusal hareketini krank milinin dönme hareketine çevirir. Krank mili motorun en kritik ve maliyetli parçasıdır.",
      sections: [
        { heading: "Biyel Kolu", paragraphs: ["Dövme çelikten üretilir. Büyük uç (big end) krank pinine, küçük uç (small end / crosshead pinine) bağlanır.", "Büyük uç yatağı ikiye bölünmüştür ve yataklama boşluğu (bearing clearance) hassas ayarlanır."] },
        { heading: "Krank Mili", paragraphs: ["Dövme veya döküm yöntemiyle üretilir. Krank pinleri, ana muyluları ve krank kollarından oluşur.", "Krank mili hizalaması deflection ölçümüyle kontrol edilir. Yatak aşınması veya gövde deformasyonu hizalamayı bozar."] }
      ],
      keyPoints: ["Deflection ölçümü her bakım döneminde yapılmalıdır.", "Krank mili kırılması en felaket arızadır.", "Büyük uç yatağı hasar göstergeleri: sıcaklık artışı, metal parçacıkları."]
    },
    "Mekanik yakıt enjeksiyon sistemi": {
      title: "Mekanik Yakıt Enjeksiyon Sistemi",
      introduction: "Geleneksel mekanik enjeksiyon sistemi, kam mili tahrikli yakıt pompası ve mekanik enjektörden oluşur. Enjeksiyon basıncı kam profili ve pompa tasarımıyla belirlenir.",
      sections: [
        { heading: "Sistem Bileşenleri", paragraphs: ["Yakıt pompası: Kam mili tahrikli plunger tip. Plunger'ın helisel oluğu (helix) yakıt miktarını kontrol eder.", "Yüksek basınç borusu: Pompa ile enjektör arasındaki bağlantı.", "Enjektör (injector): Nozzle iğnesi basınçla kalkar ve yakıt atomize edilir."] },
        { heading: "Enjeksiyon Zamanlaması", paragraphs: ["Yakıt enjeksiyonu ÜÖN'den 10-20° krank açısı önce başlar. VIT (Variable Injection Timing) ile düşük yüklerde zamanlamayı ilerleterek yanma kalitesi korunur."] }
      ],
      keyPoints: ["Mekanik sistem basit ve güvenilirdir.", "Enjeksiyon basıncı 300-600 bar arasındadır.", "Modern motorlarda yerini common rail sisteme bırakmaktadır."]
    },
    "Common rail enjeksiyon sistemi": {
      title: "Common Rail Enjeksiyon Sistemi",
      introduction: "Common rail (ortak boru) enjeksiyon sistemi, yakıtı sürekli yüksek basınçta tutan bir akümülatör borusu ve elektronik kontrollü enjektörlerden oluşur.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Yüksek basınç pompaları yakıtı ortak boru (rail) içinde 800-1000 bar'da (bazı sistemlerde 2000 bar) tutar. Enjeksiyon zamanlaması ve süresi elektronik kontrol ünitesi (ECU) tarafından belirlenir.", "Her silindir için bağımsız enjeksiyon kontrolü mümkündür. Pilot enjeksiyon, ana enjeksiyon ve post enjeksiyon yapılabilir."] },
        { heading: "Avantajlar", paragraphs: [], table: { headers: ["Avantaj", "Açıklama"], rows: [["Düşük NOx emisyonu", "Pilot enjeksiyon basınç artış hızını azaltır"], ["Düşük SFOC", "Optimum enjeksiyon zamanlaması"], ["Esneklik", "Her yükte bağımsız optimizasyon"], ["Düşük titreşim", "Kam mili tahrik kuvvetleri ortadan kalkar"], ["Çoklu yakıt", "LNG, metanol uyumlu varyantlar"]] } }
      ],
      keyPoints: ["MAN ME-C ve Wärtsilä RT-flex motorlar common rail kullanır.", "Elektronik arıza durumunda mekanik yedek gerekir.", "Yüksek basınçlı yakıt sızıntısı ciddi güvenlik riskidir."]
    },
    "Yanma aşamaları ve gecikme süresi": {
      title: "Yanma Aşamaları ve Gecikme Süresi",
      introduction: "Dizel motorlarda yanma dört belirgin aşamada gerçekleşir. Yanma kalitesi motor performansını, emisyonları ve mekanik gerilmeleri doğrudan etkiler.",
      sections: [
        { heading: "Dört Yanma Aşaması", paragraphs: ["1. Tutuşma gecikmesi (ignition delay): Yakıt enjeksiyonu başlar ancak tutuşma henüz gerçekleşmez. Fiziksel (atomizasyon, buharlaşma, karışma) ve kimyasal (ön reaksiyonlar) süreçleri kapsar. Süre: 1-3 ms.", "2. Kontrolsüz yanma (premixed combustion): Gecikme süresinde biriken yakıt aniden tutuşur. Basınç artış hızı yüksektir (diesel knock).", "3. Kontrollü yanma (diffusion combustion): Yakıt enjekte edildikçe yanar. Daha düzgün basınç artışı.", "4. Son yanma (late combustion): Enjeksiyon bittikten sonra kalan yakıtın yanması. Verim kaybı ve egzoz sıcaklığı artışına neden olur."] }
      ],
      keyPoints: ["Uzun gecikme süresi → sert yanma → yüksek mekanik stres.", "Düşük setan sayılı yakıtlar gecikme süresini uzatır.", "Pilot enjeksiyon gecikme süresinin etkilerini azaltır."]
    },
    "İndike güç (indicated power) hesabı": {
      title: "İndike Güç (Indicated Power) Hesabı",
      introduction: "İndike güç, silindir içinde gaz basıncının pistona yaptığı iş sonucu üretilen güçtür. İndikatör diyagramından hesaplanır.",
      sections: [
        { heading: "Hesap Formülü", paragraphs: [], formula: { expression: "Pᵢ = (Pm × A × L × n × k) / 60", variables: ["Pᵢ: İndike güç (W)", "Pm: Ortalama indike basınç — MEP (Pa)", "A: Piston alanı (m²)", "L: Strok (m)", "n: Devir sayısı (rpm)", "k: İki zamanlı için 1, dört zamanlı için 1/2"] }, example: { problem: "Bir 6 silindirli dört zamanlı motor: bore = 400 mm, strok = 540 mm, MEP = 20 bar, n = 600 rpm. Toplam indike gücü bulunuz.", steps: ["A = π/4 × 0.4² = 0.1257 m²", "Bir silindir: Pᵢ = (20×10⁵ × 0.1257 × 0.54 × 600 × 0.5) / 60", "Pᵢ = (20×10⁵ × 0.1257 × 0.54 × 300) / 60", "Pᵢ = 680 000 W = 680 kW (bir silindir)", "Toplam = 6 × 680 = 4080 kW"], result: "Motorun toplam indike gücü 4080 kW'tır." } }
      ],
      keyPoints: ["MEP, indikatör diyagramının alanından hesaplanır.", "İndike güç, fren gücünden her zaman büyüktür.", "Silindir dengesizliği indike güç farklarından anlaşılır."]
    },
    "Fren gücü (brake power) ve mekanik verim": {
      title: "Fren Gücü (Brake Power) ve Mekanik Verim",
      introduction: "Fren gücü, krank milinden fiilen alınabilen güçtür. İndike güçten mekanik kayıpların çıkarılmasıyla bulunur.",
      sections: [
        { heading: "Formüller", paragraphs: [], formula: { expression: "Pb = 2π × n × T / 60\nηmek = Pb / Pi\nPsürtünme = Pi − Pb", variables: ["Pb: Fren gücü (W)", "n: Devir (rpm)", "T: Tork (N·m)", "ηmek: Mekanik verim (0.85-0.95)"] }, example: { problem: "Bir motorun indike gücü 5000 kW ve mekanik verimi %90 ise fren gücü ve sürtünme gücünü bulunuz.", steps: ["Pb = ηmek × Pi = 0.90 × 5000 = 4500 kW", "Psürtünme = Pi − Pb = 5000 − 4500 = 500 kW"], result: "Fren gücü 4500 kW, sürtünme kayıpları 500 kW'tır." } }
      ],
      keyPoints: ["Mekanik verim motorun bakım durumunu gösterir.", "Sürtünme kayıpları: yatak sürtünmesi, pompa tahrik, segman sürtünmesi.", "Torsionmeter ile şaft gücü ölçülerek fren gücü belirlenir."]
    },
    "Özgül yakıt tüketimi (SFOC)": {
      title: "Özgül Yakıt Tüketimi (SFOC)",
      introduction: "SFOC (Specific Fuel Oil Consumption), motorun birim güç ve birim zamanda tükettiği yakıt miktarıdır. Motor veriminin temel göstergesidir.",
      sections: [
        { heading: "Formül ve Birim", paragraphs: [], formula: { expression: "SFOC = (ṁyakıt × 10⁶) / Pb  [g/kWh]", variables: ["ṁyakıt: Yakıt tüketimi (ton/saat veya kg/s)", "Pb: Fren gücü (kW)"] }, example: { problem: "Bir motor 12500 kW güç üretirken saatte 2.5 ton HFO tüketiyor. SFOC'u bulunuz.", steps: ["ṁyakıt = 2500 kg/h", "SFOC = 2500000 g / 12500 kW = 200 g/kWh"], result: "SFOC = 200 g/kWh. Modern büyük iki zamanlı motorlar için referans değer 155-175 g/kWh arasındadır." } },
        { heading: "SFOC'u Etkileyen Faktörler", paragraphs: [], table: { headers: ["Faktör", "SFOC Etkisi"], rows: [["Yük oranı (%75-85 optimum)", "Minimum SFOC"], ["Enjeksiyon zamanlaması", "±2-5 g/kWh"], ["Turboşarjer kirlilik", "+3-8 g/kWh"], ["Şarj havası sıcaklığı artışı", "+0.5 g/kWh / °C"], ["Düşük kaliteli yakıt", "+2-5 g/kWh"]] } }
      ],
      keyPoints: ["SFOC trendi motor sağlığının en iyi göstergesidir.", "ISO düzeltme faktörleri (LCV, ortam koşulları) uygulanmalıdır.", "Modern motorlarda SFOC 155 g/kWh'nin altına inebilir."]
    },
    "Turboşarjer çalışma prensibi": {
      title: "Turboşarjer Çalışma Prensibi",
      introduction: "Turboşarjer, egzoz gazı enerjisiyle dönen türbin tarafından tahrik edilen kompresörle emme havasını sıkıştıran cihaz olup motor gücünü ve verimini artırır.",
      sections: [
        { heading: "Çalışma Mekanizması", paragraphs: ["Egzoz gazları yüksek hızda türbin kanatlarına çarpar ve rotoru döndürür. Aynı şaft üzerindeki kompresör çarkı emme havasını sıkıştırır.", "Turboşarjer devri 10 000-40 000 rpm arasındadır. Radyal veya aksiyel türbin tipi kullanılır."] },
        { heading: "Verimlilik", paragraphs: ["Modern turboşarjerlerin toplam verimi %65-72 arasındadır. Türbin verimi × kompresör verimi × mekanik verim = toplam verim."], formula: { expression: "Pkompresör = ṁhava × cp × T₁ × [(P₂/P₁)^((γ-1)/γ) − 1] / ηkompresör", variables: ["ṁhava: Hava kütlesel debisi (kg/s)", "P₂/P₁: Basınç oranı (tipik 2.5-4.5)"] } }
      ],
      keyPoints: ["Turboşarjer arızası motor gücünü dramatik düşürür.", "Surging: Kompresör kararsız çalışma — basınç oranı çok yüksek, debi çok düşük.", "Su yıkama ile türbin ve kompresör temizliği yapılır."]
    },
    "Performans izleme ve trend analizi": {
      title: "Performans İzleme ve Trend Analizi",
      introduction: "Motor performans izleme, parametrelerin düzenli kaydedilmesi ve trendlerinin analiz edilerek erken arıza tespiti ve verim optimizasyonu yapılmasıdır.",
      sections: [
        { heading: "İzlenen Parametreler", paragraphs: [], table: { headers: ["Parametre", "Normal Sapma", "Olası Neden"], rows: [["Egzoz sıcaklığı", ">50°C sapma", "Enjektör arızası, valf kaçağı"], ["Pmax", ">5 bar sapma", "Enjeksiyon zamanlaması, sıkıştırma kaybı"], ["SFOC artışı", ">5%", "Turboşarjer kirlilik, enjektör"], ["Turboşarjer devri", "Düşüş", "Türbin kirlilik, hava filtresi"], ["Soğutma suyu ΔT", "Artış", "Fouling, debi düşüşü"]] } },
        { heading: "Trend Analizi", paragraphs: ["Performans verileri referans koşullara (ISO) düzeltilerek karşılaştırılır. Kademeli bozulma bakım planlamasını, ani değişim ise arıza teşhisini tetikler."] }
      ],
      keyPoints: ["Performans izleme kestirimci bakımın temelidir.", "En az haftada bir tüm silindir verileri kaydedilmelidir.", "Yazılım tabanlı izleme sistemleri (CoCoS, DNS) yaygınlaşmaktadır."]
    },
    "Enjektör (nozzle) tipleri ve püskürtme": {
      title: "Enjektör (Nozzle) Tipleri ve Püskürtme",
      introduction: "Yakıt enjektörü, yüksek basınçlı yakıtı silindir içine ince damlacıklar halinde püskürten hassas bileşendir. Atomizasyon kalitesi yanma verimini doğrudan etkiler.",
      sections: [
        { heading: "Nozzle Tipleri", paragraphs: [], table: { headers: ["Tip", "Özellik", "Kullanım"], rows: [["Çok delikli (multi-hole)", "4-10 delik, iyi atomizasyon", "Büyük motorlar"], ["Pintle (iğneli)", "Tek delik, kendi kendine temizleme", "Küçük motorlar"], ["Slide type", "Değişken enjeksiyon profili", "Elektronik kontrollü motorlar"]] } },
        { heading: "Atomizasyon Parametreleri", paragraphs: ["Damlacık boyutu enjeksiyon basıncı, delik çapı ve yakıt viskozitesine bağlıdır. İnce damlacıklar daha hızlı buharlaşır ve daha iyi karışım sağlar.", "Enjektör açma basıncı periyodik olarak test edilmelidir. Düşük açma basıncı kötü atomizasyona, yüksek basınç enjeksiyon gecikmesine neden olur."] }
      ],
      keyPoints: ["Enjektör testi: pop test ile açma basıncı ve sprey kalıbı kontrol edilir.", "Arızalı enjektör belirtileri: yüksek egzoz sıcaklığı, duman, SFOC artışı.", "Nozzle delikleri aşındığında yakıt miktarı artar ve sprey bozulur."]
    },
    "Anormal yanma: knocking ve misfiring": {
      title: "Anormal Yanma: Knocking ve Misfiring",
      introduction: "Dizel motorlarda anormal yanma, mekanik hasar, verim kaybı ve emisyon artışına neden olur. Başlıca iki formu diesel knock ve misfiring'dir.",
      sections: [
        { heading: "Diesel Knock", paragraphs: ["Uzun tutuşma gecikmesi sonucu biriken yakıtın ani tutuşmasıyla oluşan yüksek basınç artış hızıdır (dp/dθ). Metalik vuruntu sesi duyulur.", "Nedenleri: Düşük setan sayılı yakıt, düşük sıkıştırma sıcaklığı, erken enjeksiyon zamanlaması, soğuk motor çalıştırma."] },
        { heading: "Misfiring", paragraphs: ["Bir veya daha fazla silindirde yanmanın gerçekleşmemesidir. Motor düzensiz çalışır.", "Nedenleri: Arızalı enjektör, yakıt pompası arızası, düşük sıkıştırma basıncı, hava girişi yakıt hattında."] }
      ],
      keyPoints: ["Knock, yüksek mekanik stres ve yatak hasarına yol açabilir.", "Misfire, yanmamış yakıtın egzoz sistemine geçmesine (karter patlaması riski) neden olabilir.", "İndikatör diyagramı analizi her iki problemi de teşhis eder."]
    },
    "İndikatör diyagramı ve P-V analizi": {
      title: "İndikatör Diyagramı ve P-V Analizi",
      introduction: "İndikatör diyagramı, silindir içi basıncın krank açısına veya piston konumuna göre değişimini gösteren grafiktir. Motor teşhisinin en önemli aracıdır.",
      sections: [
        { heading: "Diyagram Tipleri", paragraphs: ["Güç kartı (power card): P-V diyagramı. Alanı indike güçle orantılıdır.", "Basınç-krank açısı diyagramı (draw card): P-θ grafiği. Enjeksiyon zamanlaması, basınç artış hızı ve maksimum basıncı gösterir.", "Hafif yay diyagramı (light spring diagram): Düşük basınç bölgesini (süpürme/gaz değişimi) gösterir."] },
        { heading: "Teşhis Örüntüleri", paragraphs: [], table: { headers: ["Diyagram Bulgusu", "Olası Neden"], rows: [["Pmax düşük", "Sıkıştırma kaybı, geç enjeksiyon"], ["Pmax yüksek", "Erken enjeksiyon, yüksek miktarda yakıt"], ["Yüksek dp/dθ", "Uzun gecikme, kötü atomizasyon"], ["Geç basınç tepe noktası", "Geç enjeksiyon, zayıf atomizasyon"], ["Genleşme eğrisi düşük", "Egzoz valfi kaçağı, geç yanma"]] } }
      ],
      keyPoints: ["Modern motorlarda elektronik indikatör (PMI) kullanılır.", "Tüm silindirlerin diyagramları karşılaştırmalı analiz edilmelidir.", "İndikatör diyagramı MEP hesabının temelidir."]
    },
    "Süpürme (scavenging) tipleri: uniflow, loop": {
      title: "Süpürme (Scavenging) Tipleri",
      introduction: "İki zamanlı dizel motorlarda süpürme, yanmış gazların silindirden atılması ve taze hava ile doldurulması sürecidir.",
      sections: [
        { heading: "Süpürme Tipleri", paragraphs: [], table: { headers: ["Tip", "Hava Girişi", "Egzoz Çıkışı", "Verim"], rows: [["Uniflow (tek yönlü)", "Alt portlar", "Üst egzoz valfi", "En yüksek (%90+)"], ["Loop (döngüsel)", "Alt portlar (bir taraf)", "Üst portlar (karşı taraf)", "Orta (%80-85)"], ["Cross (çapraz)", "Bir taraf portlar", "Karşı taraf portlar", "Düşük (%70-75)"]] } },
        { heading: "Uniflow Süpürme Detayları", paragraphs: ["Modern büyük iki zamanlı motorlarda (MAN B&W, WinGD) yalnızca uniflow süpürme kullanılır. Taze hava alttan yukarı doğru akar ve egzoz gazını üstten atar.", "Süpürme havası debisi yanma için gerekli hava miktarının 1.5-1.8 katıdır (scavenge ratio). Fazla hava silindir soğutmasına da katkı sağlar."] }
      ],
      keyPoints: ["Uniflow süpürme en yüksek süpürme verimini sağlar.", "Süpürme havası basıncı: 0.2-0.4 bar (gauge).", "Scavenge fire (süpürme yangını) risk yönetimi kritiktir."]
    },
    "Şarj havası soğutucusu": {
      title: "Şarj Havası Soğutucusu",
      introduction: "Turboşarjerden çıkan sıkıştırılmış hava yüksek sıcaklıktadır. Şarj havası soğutucusu (intercooler/aftercooler) bu havayı soğutarak hava yoğunluğunu artırır.",
      sections: [
        { heading: "Amaç ve Etki", paragraphs: ["Sıkıştırma sonrası hava sıcaklığı 150-200°C olabilir. Soğutucu bu sıcaklığı 35-50°C'ye düşürür.", "Soğutulmuş havanın yoğunluğu artar → silindire daha fazla hava girer → daha fazla yakıt yakılabilir → motor gücü artar.", "Ayrıca düşük sıcaklık termal gerilmeleri azaltır ve NOx emisyonunu düşürür."] },
        { heading: "Yapı", paragraphs: ["Genellikle finned tube (kanatlı boru) tipinde olup deniz suyu veya merkezi soğutma suyu ile soğutulur. Büyük motorlarda iki kademeli soğutma kullanılabilir."] }
      ],
      keyPoints: ["Şarj havası soğutucusu kirliği motor performansını doğrudan düşürür.", "Hava tarafı (fin) ve su tarafı (tube) periyodik temizlik gerektirir.", "Soğutucu çıkışındaki hava sıcaklığı sürekli izlenmelidir."]
    },
    "Silindir performans dengesizliği": {
      title: "Silindir Performans Dengesizliği",
      introduction: "Çok silindirli motorlarda silindirler arasındaki performans farklılıkları, mekanik stres, titreşim ve verim kaybına neden olur.",
      sections: [
        { heading: "Dengesizlik Göstergeleri", paragraphs: [], table: { headers: ["Parametre", "Kabul Sınırı", "Düzeltme"], rows: [["Pmax farkı", "±3-5 bar", "Enjeksiyon zamanlaması ayarı"], ["Egzoz sıcaklık farkı", "±30-50°C", "Enjektör kontrolü, yakıt miktarı"], ["Kompresyon basıncı farkı", "±2-3 bar", "Segman/valf kontrolü"], ["MEP farkı", "±3%", "Yakıt pompası ayarı"]] } },
        { heading: "Dengeleme Prosedürü", paragraphs: ["1. Tüm silindirlerin indikatör diyagramları alınır.", "2. Pmax ve Pcomp değerleri karşılaştırılır.", "3. Gerekli ayarlar yapılır (VIT, yakıt rack, egzoz valfi).", "4. Ayar sonrası tekrar ölçüm yapılarak doğrulanır."] }
      ],
      keyPoints: ["Dengesizlik titreşimi artırır ve yatak ömrünü kısaltır.", "Düzenli indikatör testi dengesizliği erken tespit eder.", "Elektronik kontrollü motorlarda (ME, RT-flex) otomatik dengeleme yapılır."]
    },
    "Yatak (bearing) tipleri ve ölçüm": {
      title: "Yatak (Bearing) Tipleri ve Ölçüm",
      introduction: "Motor yatakları, dönen veya sallanan parçaları destekleyen ve sürtünmeyi azaltan kritik elemanlardır.",
      sections: [
        { heading: "Yatak Tipleri", paragraphs: [], table: { headers: ["Yatak", "Konum", "Malzeme"], rows: [["Ana yatak (main bearing)", "Krank mili ana muylu", "Üç metal: çelik+bronz+beyaz metal"], ["Krank pini yatağı (crankpin)", "Biyel büyük ucu", "Üç metal"], ["Crosshead yatağı", "Crosshead pini", "Beyaz metal üzeri"], ["Kamçı yatağı (thrust bearing)", "Krank mili aks yönü", "Tilting pad"]] } },
        { heading: "Yatak Boşluk Ölçümü", paragraphs: ["Yatak boşluğu (clearance) lead wire, plastigage veya feeler gauge ile ölçülür. Boşluk üretici spesifikasyonlarına uygun olmalıdır.", "Tipik boşluk: shaft çapının 0.001-0.002 katı (ana yatak)."] }
      ],
      keyPoints: ["Beyaz metal (Babbitt) düşük sürtünme katsayısı ve iyi gömme özelliğine sahiptir.", "Yatak sıcaklığı sürekli izlenmelidir (alarm: 65-75°C).", "Aşırı boşluk yağ basıncı düşüşüne, yetersiz boşluk ısınmaya neden olur."]
    },
    "Supap mekanizması ve zamanlaması": {
      title: "Supap Mekanizması ve Zamanlaması",
      introduction: "Supap mekanizması, silindir içine hava girişi ve egzoz gazı çıkışını kontrol eden sistemdir. Doğru zamanlama motor performansı için kritiktir.",
      sections: [
        { heading: "Mekanizma Bileşenleri", paragraphs: ["Kam mili → kam takipçisi (follower) → itiş çubuğu (push rod) → rocker arm → supap. Yay kuvveti supabı kapalı tutar.", "İki zamanlı motorlarda yalnızca egzoz supabı bulunur. Dört zamanlı motorlarda emme ve egzoz supapları vardır."] },
        { heading: "Supap Zamanlama Diyagramı", paragraphs: ["Supaplar tam olarak ÜÖN veya AÖN'de açılıp kapanmaz. Erken açma ve geç kapama uygulanır."], table: { headers: ["Olay", "Dört Zamanlı Tipik", "Amaç"], rows: [["Emme açılır", "ÜÖN'den 10-20° önce", "Hava dolumunu erken başlatma"], ["Emme kapanır", "AÖN'den 25-40° sonra", "Hava inertisinden yararlanma"], ["Egzoz açılır", "AÖN'den 40-60° önce", "Silindir basıncını düşürme (blowdown)"], ["Egzoz kapanır", "ÜÖN'den 10-20° sonra", "Egzoz gazı tahliyesini tamamlama"]] } }
      ],
      keyPoints: ["Supap boşluğu (tappet clearance) düzenli kontrol edilmelidir.", "Yanlış supap zamanlaması güç kaybı ve aşırı ısınmaya neden olur.", "Hidrolik supap tahriği (ME motorları) mekanik kam yerine kullanılır."]
    },
    "VIT (Variable Injection Timing)": {
      title: "VIT (Variable Injection Timing)",
      introduction: "VIT, yakıt enjeksiyon zamanlamasını motor yüküne göre otomatik olarak ayarlayan mekanizmadır. Düşük ve kısmi yüklerde yanma verimini optimize eder.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Düşük yüklerde sıkıştırma sonu sıcaklığı ve basıncı düşer. VIT, enjeksiyon zamanlamasını ilerletir (advance) böylece yanma ÜÖN civarında gerçekleşir.", "Yüksek yüklerde enjeksiyon zamanlaması geri alınarak (retard) Pmax limitinin aşılması önlenir."] },
        { heading: "Mekanik ve Elektronik VIT", paragraphs: ["Mekanik VIT: Yakıt pompasının kam takipçisi konumunu ayarlayan pnömatik veya hidrolik mekanizma.", "Elektronik VIT (ME motorları): ECU tarafından kontrol edilen enjeksiyon zamanlaması. Her silindir için bağımsız ayar yapılabilir."] }
      ],
      keyPoints: ["VIT, kısmi yükte SFOC'u 3-5 g/kWh düşürebilir.", "Pmax limitinin korunması mekanik güvenlik açısından kritiktir.", "VIT arızası yüksek termal gerilme ve performans kaybına yol açar."]
    },
    "Turboşarj surging": {
      title: "Turboşarj Surging",
      introduction: "Surging, turboşarjer kompresöründe oluşan aerodinamik kararsızlıktır. Hava debisi düşerken basınç oranı yüksek kaldığında akış ters döner.",
      sections: [
        { heading: "Surging Mekanizması", paragraphs: ["Kompresör haritasında surge line'ın soluna geçildiğinde akış periyodik olarak ileri-geri salınır. Güçlü titreşim, gürültü ve sıcaklık artışı meydana gelir.", "Nedenleri: Ani yük değişimi, kirli hava filtresi, kirli kompresör, egzoz gaz kaçağı, süpürme havası sızıntısı."] },
        { heading: "Önleme ve Müdahale", paragraphs: ["Önleme: Hava filtresi ve kompresör temizliği, düzgün yük değişimi.", "Müdahale: Yükü azalt, turboşarj hava filtresi kontrol et, surging devam ederse by-pass valfini aç."] }
      ],
      keyPoints: ["Surging, turboşarjer yatak ve kanat hasarına yol açabilir.", "Ani yük artışı veya bir silindir misfiring surging tetikleyebilir.", "Kompresör su yıkama periyodik surging riskini azaltır."]
    },
    "Egzoz sıcaklık sapmaları": {
      title: "Egzoz Sıcaklık Sapmaları",
      introduction: "Silindir egzoz sıcaklıkları motor teşhisinde en sık kullanılan parametredir. Normalden sapma spesifik arızalara işaret eder.",
      sections: [
        { heading: "Teşhis Tablosu", paragraphs: [], table: { headers: ["Sapma", "Olası Neden", "Kontrol"], rows: [["Bir silindir yüksek", "Arızalı enjektör, egzoz valfi kaçağı", "Enjektör testi, valf taşlama"], ["Bir silindir düşük", "Yakıt pompası arızası, boş silindir", "Pompa kontrolü, rack pozisyonu"], ["Tüm silindirler yüksek", "Turboşarjer kirlilik, yüksek yük", "Turboşarjer temizliği"], ["Tüm silindirler düşük", "Yüksek süpürme havası, düşük yük", "Normal olabilir"], ["Dalgalı sıcaklık", "Dengesiz yanma, hava sızıntısı", "Enjektör, yakıt kalitesi"]] } }
      ],
      keyPoints: ["Egzoz sıcaklık trendi performans izlemenin temel aracıdır.", "Yüksek egzoz sıcaklığı turbin kanat hasarına yol açabilir.", "Sıcaklık sensörü kalibrasyonu da kontrol edilmelidir."]
    },
    "Silindir yağlama sistemi sorunları": {
      title: "Silindir Yağlama Sistemi Sorunları",
      introduction: "İki zamanlı crosshead motorlarda silindir yağlaması bağımsız bir sistemle yapılır. Yağ miktarı, kalitesi ve dağılımı liner ömrünü belirler.",
      sections: [
        { heading: "Yağlama Sistemi", paragraphs: ["Silindir yağı, liner duvarındaki yağlama noktalarından (quill) dozajlanarak verilir. Modern alfa yağlama sistemleri (SIP, CLU) piston hareketi ile senkronize enjeksiyon yapar.", "Yağ BN (Base Number) değeri yakıt kükürt oranına göre seçilir. Yüksek kükürtlü yakıtta yüksek BN (70-100), düşük kükürtlü yakıtta düşük BN (25-40) kullanılır."] },
        { heading: "Sorunlar", paragraphs: [], table: { headers: ["Sorun", "Neden", "Sonuç"], rows: [["Yetersiz yağlama", "Düşük feed rate, tıkalı quill", "Hızlı aşınma, scuffing"], ["Aşırı yağlama", "Yüksek feed rate", "Yanma odası birikinti, port tıkanması"], ["Yanlış BN seçimi", "Yakıt-yağ uyumsuzluğu", "Korozif aşınma veya kireçlenme"], ["Yağ dağılım bozukluğu", "Hasarlı quill, piston ring", "Lokal aşınma"]] } }
      ],
      keyPoints: ["Feed rate optimizasyonu aşınma ve maliyet dengesi gerektirir.", "Drain oil analizi (scrapedown oil) liner durumunu gösterir.", "Yakıt değişiminde BN geçişi kademeli yapılmalıdır."]
    },
    "Liner ve piston aşınması": {
      title: "Liner ve Piston Aşınması",
      introduction: "Liner ve piston aşınması motor ömrünü belirleyen en kritik faktördür. Doğru yağlama, yakıt kalitesi ve çalışma koşulları aşınmayı kontrol eder.",
      sections: [
        { heading: "Aşınma Mekanizmaları", paragraphs: ["Korozif aşınma: Yakıttaki kükürt yanma sonucu SO₃'e okside olur ve su buharıyla birleşerek sülfürik asit (H₂SO₄) oluşturur. Liner sıcaklığı asit çiy noktasının (140-170°C) altına düştüğünde korozyon başlar.", "Abrazif aşınma: Yakıttaki katalizör kalıntıları (Al+Si) ve yanma artıkları liner yüzeyini aşındırır.", "Adhezif aşınma (scuffing): Yağ filmi koptuğunda metal-metal teması oluşur. Ani ve ciddi hasar verir."] },
        { heading: "Aşınma İzleme", paragraphs: ["Liner çap ölçümü mikrometre ile yapılır. Aşınma hızı mm/1000 saat olarak ifade edilir. İyi koşullarda 0.03-0.05 mm/1000 saat kabul edilir."] }
      ],
      keyPoints: ["VLSFO kullanımında cold corrosion riski artmıştır.", "Liner sıcaklık yönetimi (soğutma suyu sıcaklığı) korozyon kontrolünde kritiktir.", "Scrapedown yağ analizi: Fe (aşınma), Ca (yağ kalıntısı), S (asit korozyonu) izlenir."]
    },
    "Yatak arızaları ve sıcaklık kontrolü": {
      title: "Yatak Arızaları ve Sıcaklık Kontrolü",
      introduction: "Motor yataklarının arızası, krank mili hasarı ve motor toplam kaybına yol açabilecek ciddi bir durumdur. Sıcaklık izleme en önemli erken uyarı yöntemidir.",
      sections: [
        { heading: "Arıza Nedenleri", paragraphs: [], table: { headers: ["Neden", "Mekanizma"], rows: [["Yağ basıncı düşüşü", "Yetersiz yağ filmi → metal teması"], ["Yağ kirlilik", "Su karışımı, parçacıklar"], ["Aşırı yük", "Yatak kapasitesini aşan kuvvetler"], ["Misalignment", "Eşit olmayan yük dağılımı"], ["Yatak boşluk hatası", "Çok sıkı veya çok gevşek montaj"]] } },
        { heading: "Sıcaklık İzleme", paragraphs: ["Her ana yatak ve krank pin yatağında sıcaklık sensörü bulunur. Normal çalışma sıcaklığı: 50-65°C.", "Alarm: 70-75°C, Slowdown: 80°C, Shutdown: 85°C (üretici değerlerine göre değişir).", "Oil mist detector (yağ bulutu algılayıcı) karter patlaması öncesi aşırı ısınmayı tespit eder."] }
      ],
      keyPoints: ["Yatak sıcaklık trendi en güvenilir arıza göstergesidir.", "Karter patlaması yatak arızasının en tehlikeli sonucudur.", "Deflection ölçümü yatak aşınmasını dolaylı olarak gösterir."]
    },
    "Bedplate ve frame yapısı": {
      title: "Bedplate ve Frame Yapısı",
      introduction: "Bedplate (taban plakası) ve frame (gövde/kolon) motor bloğunun yapısal iskeletini oluşturur. Tüm mekanik yükleri taşır ve gemi yapısına iletir.",
      sections: [
        { heading: "Bedplate", paragraphs: ["Motor alt yapısını oluşturur. Ana yataklar bedplate üzerindedir. Kaynaklı çelik veya döküm konstrüksiyondur.", "Cross girder (çapraz kiriş) ve longitudinal girder (boyuna kiriş) yapısal bütünlüğü sağlar. Ana yatak bölmelerinde (bearing pocket) hassas işlenmiş yüzeyler bulunur."] },
        { heading: "Frame (A-Frame)", paragraphs: ["Bedplate üzerine oturan A şeklinde kolonlardır. Crosshead kılavuzlarını taşır. Her silindir için bir frame bulunur.", "Frame, silindir bloğu ve bedplate arasında cıvatalarla gerilmiş bir yapı oluşturur (tie rod sistemi)."] }
      ],
      keyPoints: ["Tie rod ön gerilimi motorun yapısal bütünlüğü için kritiktir.", "Bedplate çatlağı motor toplam kaybına neden olabilir.", "Chock (mesnet) bozulması motor hizalamasını bozar."]
    },
    "Yük dengeleme (load balancing)": {
      title: "Yük Dengeleme (Load Balancing)",
      introduction: "Çok silindirli motorlarda her silindirin eşit güç üretmesi, dengeli çalışma ve uzun ömür için esastır.",
      sections: [
        { heading: "Dengeleme Yöntemi", paragraphs: ["Her silindirin indike gücü indikatör diyagramından hesaplanır. Ortalamadan sapan silindirler için yakıt miktarı (fuel rack) ayarlanır.", "Elektronik kontrollü motorlarda (ME) ECU otomatik yük dengeleme yapar. Her silindirin fuel index'i bağımsız ayarlanır."] },
        { heading: "Kontrol Parametreleri", paragraphs: ["Pmax eşitleme: Enjeksiyon zamanlaması ile.", "MEP eşitleme: Yakıt miktarı ile.", "Her iki ayar birbirini etkiler; iteratif yaklaşım gerekir."] }
      ],
      keyPoints: ["Yük dengesizliği torsiyonel titreşimi artırır.", "Düzenli indikatör testleri yük dengelemenin ön koşuludur.", "Otomatik yük dengeleme sistemi bakım süresini kısaltır."]
    },
    "Turboşarj yardımcı üfleyici (auxiliary blower)": {
      title: "Turboşarj Yardımcı Üfleyici (Auxiliary Blower)",
      introduction: "Düşük yüklerde ve motor çalıştırmada turboşarjer yeterli hava basıncı sağlayamaz. Yardımcı üfleyiciler bu durumda süpürme havası temin eder.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Elektrik motorlu santrifüj fan tipi üfleyicilerdir. Süpürme havası manifolduna bağlıdır.", "Motor yükü %25-35'in altında olduğunda otomatik olarak devreye girer. Yük artıp turboşarjer yeterli basıncı sağladığında devreden çıkar.", "Non-return valve (çek valf) turboşarjer basıncının üfleyiciyi ters çevirmesini önler."] }
      ],
      keyPoints: ["Üfleyici arızası düşük yükte çalışmayı imkansız kılar.", "Genellikle iki üfleyici bulunur (yedeklilik).", "Motor çalıştırmadan önce üfleyiciler devreye alınmalıdır."]
    },
    "Ortalama efektif basınç (MEP)": {
      title: "Ortalama Efektif Basınç (MEP)",
      introduction: "MEP, silindir hacmi boyunca sabit uygulandığında aynı işi üretecek sanal basınçtır. Motor performans karşılaştırmasının temel parametresidir.",
      sections: [
        { heading: "Tanım ve Hesap", paragraphs: [], formula: { expression: "MEP = W / Vstrok\nMEP = (P × 60) / (Vstrok × n × k)", variables: ["W: Bir çevrimde yapılan iş (J)", "Vstrok: Piston süpürme hacmi (m³)", "P: Güç (W)", "n: Devir (rpm)", "k: 1 (iki zamanlı) veya 0.5 (dört zamanlı)"] }, example: { problem: "Bir silindir 800 kW indike güç üretirken bore = 500 mm, strok = 2000 mm, n = 100 rpm (iki zamanlı). İndike MEP nedir?", steps: ["Vstrok = π/4 × 0.5² × 2.0 = 0.3927 m³", "MEP = (800000 × 60) / (0.3927 × 100 × 1)", "MEP = 48000000 / 39.27 = 1 222 000 Pa ≈ 12.2 bar"], result: "İndike MEP = 12.2 bar. Tipik değer büyük iki zamanlı motorlar için 18-21 bar arasındadır." } }
      ],
      keyPoints: ["IMEP: İndike güçten, BMEP: Fren gücünden hesaplanır.", "Yüksek MEP, motorun kompakt ve verimli olduğunu gösterir.", "MEP artışı turboşarj teknolojisi ile sınırlıdır."]
    },
    "Ana motor ve yardımcı motor ayrımı": {
      title: "Ana Motor ve Yardımcı Motor Ayrımı",
      introduction: "Gemi makine dairesinde ana motor (main engine) ve yardımcı motorlar (auxiliary engines) farklı görev ve özelliklere sahiptir.",
      sections: [
        { heading: "Karşılaştırma", paragraphs: [], table: { headers: ["Özellik", "Ana Motor", "Yardımcı Motor"], rows: [["Görev", "Pervane tahrik", "Elektrik üretimi"], ["Tip", "İki zamanlı (büyük gemi)", "Dört zamanlı"], ["Devir", "80-120 rpm", "720-900 rpm"], ["Yakıt", "HFO/VLSFO", "HFO/MDO"], ["Güç", "5000-80000 kW", "500-5000 kW"], ["Adet", "1 (genellikle)", "3-4 + acil jeneratör"], ["Çalışma", "Sürekli", "Yük durumuna göre"]] } }
      ],
      keyPoints: ["Ana motor genellikle direkt tahriklidir (pervane).", "Yardımcı motorlar jeneratör tahrik eder.", "Acil jeneratör SOLAS gereği makine dairesi dışındadır."]
    },
    "Türbin ve kompresör karakteristikleri": {
      title: "Türbin ve Kompresör Karakteristikleri",
      introduction: "Turboşarjerin türbin ve kompresör bileşenlerinin performans karakteristikleri, motor ile uyumlu çalışma için kritiktir.",
      sections: [
        { heading: "Kompresör Haritası", paragraphs: ["Kompresör haritası basınç oranı-debi grafiğidir. Surge line (solda), choke line (sağda) ve verim adaları içerir.", "Motor çalışma noktası surge line'dan yeterli uzaklıkta (surge margin) olmalıdır."] },
        { heading: "Türbin", paragraphs: ["Radyal türbin: Kompakt, küçük turboşarjerlerde kullanılır. Gaz dıştan içe doğru akar.", "Aksiyel türbin: Yüksek verimli, büyük turboşarjerlerde kullanılır. Gaz eksen doğrultusunda akar.", "Türbin nozzle ring tipi (sabit veya değişken kanatlı) performansı etkiler."] }
      ],
      keyPoints: ["Turboşarjer-motor eşleşmesi (matching) tasarım aşamasında yapılır.", "Motor modifikasyonu turboşarjer uyumunu bozabilir.", "VTA (Variable Turbine Area) düşük yükte verimlilik sağlar."]
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // GEMİ ELEKTRİK SİSTEMLERİ — Eksik alt başlıklar
  // ═══════════════════════════════════════════════════════════════
  electrical: {
    "Senkron jeneratör çalışma prensibi": {
      title: "Senkron Jeneratör Çalışma Prensibi",
      introduction: "Senkron jeneratör, manyetik alan içinde dönen veya sabit sargılarla elektrik enerjisi üreten makinedir. Gemi elektrik üretiminin temel elemanıdır.",
      sections: [
        { heading: "Çalışma Mekanizması", paragraphs: ["Rotor (dönen alan) dizel motor tarafından tahrik edilir ve DC uyarma akımıyla manyetik alan oluşturur. Stator sargıları bu dönen alanda EMK (elektromotor kuvvet) üretir.", "Üretilen gerilimin frekansı rotor hızına bağlıdır."], formula: { expression: "f = (n × p) / 60", variables: ["f: Frekans (Hz)", "n: Devir (rpm)", "p: Kutup çifti sayısı"] }, example: { problem: "4 kutuplu (p=2) bir jeneratör 60 Hz üretmek için kaç rpm'de dönmelidir?", steps: ["n = (60 × f) / p = (60 × 60) / 2 = 1800 rpm"], result: "Jeneratör 1800 rpm'de dönmelidir." } },
        { heading: "Gemi Uygulaması", paragraphs: ["Gemi jeneratörleri genellikle 440V veya 6600V, 60 Hz (veya 50 Hz) üretir. 4 kutuplu jeneratörler 1800 rpm'de (60 Hz) veya 1500 rpm'de (50 Hz) çalışır."] }
      ],
      keyPoints: ["Uyarma akımı kesilirse jeneratör gerilim üretemez.", "Yük altında güç faktörü gerilimi etkiler.", "Jeneratör korumaları: aşırı akım, ters güç, aşırı gerilim."]
    },
    "Gerilim regülasyonu (AVR)": {
      title: "Gerilim Regülasyonu (AVR)",
      introduction: "AVR (Automatic Voltage Regulator), jeneratör çıkış gerilimini yük değişimlerine rağmen sabit tutan otomatik kontrol cihazıdır.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["AVR, stator çıkış gerilimini ölçer ve referans değerle karşılaştırır. Sapma durumunda rotor uyarma akımını artırır veya azaltır.", "Yük artışında gerilim düşerse AVR uyarma akımını artırır → manyetik alan güçlenir → gerilim normale döner."] },
        { heading: "AVR Ayarları", paragraphs: [], table: { headers: ["Parametre", "Açıklama", "Tipik Değer"], rows: [["Droop", "Yük paylaşımı için gerilim düşüşü", "%2.5-5"], ["Statik hassasiyet", "Kararlı hal gerilim sapması", "±0.5-1%"], ["Geçici sapma", "Ani yük atma/alma gerilim sapması", "±10-15%"], ["Geri dönüş süresi", "Gerilimin normale dönme süresi", "0.5-3 s"]] } }
      ],
      keyPoints: ["AVR arızası jeneratör gerilim kaybına yol açar.", "Paralel çalışmada droop ayarı reaktif güç paylaşımını belirler.", "Modern AVR'ler dijital (mikroprosesör tabanlı) kontrol kullanır."]
    },
    "Frekans ve yük kontrolü": {
      title: "Frekans ve Yük Kontrolü",
      introduction: "Gemi elektrik sisteminde frekans, jeneratörü tahrik eden dizel motorun hızıyla kontrol edilir. Yük değişimleri frekansı etkiler.",
      sections: [
        { heading: "Governor (Hız Regülatörü)", paragraphs: ["Governor, motor hızını sabit tutarak frekansı kontrol eder. Yük artışında yakıt miktarını artırır, yük azalmasında azaltır.", "Elektronik governor (EG) mekanik tiplere göre daha hassas ve hızlı tepki verir."], formula: { expression: "Droop (%) = [(fboş − ftam yük) / fnominal] × 100", variables: ["Tipik droop: %3-5"] } },
        { heading: "İzochronous ve Droop Kontrol", paragraphs: ["İzochronous: Frekans tüm yüklerde sabit. Tek jeneratör çalışmasında kullanılır.", "Droop: Yük arttıkça frekans düşer. Paralel çalışmada yük paylaşımı için gereklidir."] }
      ],
      keyPoints: ["Frekans sapması hassas ekipmanları (navigasyon, otomasyon) etkiler.", "Blackout sonrası frekans stabilizasyonu kritik prosedürdür.", "Paralel jeneratörlerde eşit droop ayarı eşit yük paylaşımı sağlar."]
    },
    "Paralel jeneratör bağlama": {
      title: "Paralel Jeneratör Bağlama",
      introduction: "Paralel bağlama (synchronizing), çalışan bir jeneratöre ikinci bir jeneratörü bağlayarak güç kapasitesini artırma işlemidir.",
      sections: [
        { heading: "Senkronizasyon Koşulları", paragraphs: ["1. Gerilim eşitliği (±5%)", "2. Frekans eşitliği (±0.5 Hz)", "3. Faz sırası aynı olmalı", "4. Faz açısı sıfır olmalı (synchroscope tam 12 pozisyonunda)"] },
        { heading: "Prosedür", paragraphs: ["1. Bağlanacak jeneratörü çalıştır ve nominal devire getir.", "2. AVR ile gerilimi baraya eşitle.", "3. Governor ile frekansı eşitle (synchroscope yavaş saat yönünde dönmeli).", "4. Synchroscope tam 12'de iken kesiciyi kapat.", "5. Yük paylaşımını kontrol et."] }
      ],
      keyPoints: ["Yanlış senkronizasyon jeneratör ve barayı ciddi hasar verebilir.", "Otomatik senkronizasyon cihazı insan hatasını ortadan kaldırır.", "Faz sırası hatası kesinlikle yapılmamalıdır (kalıcı hasar)."]
    },
    "Güç yönetim sistemi (PMS)": {
      title: "Güç Yönetim Sistemi (PMS)",
      introduction: "PMS, gemi elektrik yükünü izleyen ve jeneratörlerin otomatik başlatma, durdurma, senkronizasyon ve yük paylaşımını yöneten merkezi kontrol sistemidir.",
      sections: [
        { heading: "Fonksiyonlar", paragraphs: ["Otomatik başlatma: Yük artışında yedek jeneratörü çalıştırır ve senkronize eder.", "Otomatik durdurma: Yük azaldığında fazla jeneratörü devreden çıkarır.", "Tercihli açma (preferential trip): Aşırı yük durumunda kritik olmayan tüketicileri devreden çıkarır.", "Yük ramplama: Yeni bağlanan jeneratöre yükü kademeli aktarır."] },
        { heading: "Korunma Katmanları", paragraphs: [], table: { headers: ["Korunma", "Amaç", "Aksiyon"], rows: [["Preferential trip", "Jeneratör aşırı yüklenmesini önleme", "Kritik olmayan yükleri at"], ["Heavy consumer interlock", "Büyük motor çalıştırmada yük kontrolü", "Yeterli kapasite yoksa izin verme"], ["Blackout recovery", "Güç kaybı sonrası otomatik geri kazanım", "Jeneratör başlat, yükleri kademeli bağla"]] } }
      ],
      keyPoints: ["PMS, UMS (insansız makine dairesi) çalışmasının ön koşuludur.", "Manuel override her zaman mümkün olmalıdır.", "PMS yazılım güncelleme ve parametre ayarı uzman gerektirir."]
    },
    "Ana dağıtım panosu (MSB)": {
      title: "Ana Dağıtım Panosu (MSB)",
      introduction: "MSB (Main Switchboard), gemi elektrik sisteminin merkezi dağıtım noktasıdır. Jeneratörlerden gelen güç MSB üzerinden tüm tüketicilere dağıtılır.",
      sections: [
        { heading: "Yapı ve Bileşenler", paragraphs: ["MSB, hava kesiciler (ACB), bara sistemi, ölçü aletleri (voltmetre, ampermetre, wattmetre, frekans), synchroscope, koruma röleleri ve kontrol panellerinden oluşur.", "Bara sistemi bakır veya alüminyum iletkenlerden yapılır. Tek bara veya bölünmüş bara (split bus) düzeni kullanılır."] },
        { heading: "SOLAS Gereklilikleri", paragraphs: ["MSB makine dairesi üst platformda konumlandırılır. Yangın ve su hasarından korunmalıdır.", "Ana yangın pompası MSB'den bağımsız beslenmelidir."] }
      ],
      keyPoints: ["MSB önünde yalıtıcı paspas ve yangın söndürücü bulunmalıdır.", "Bara gerilimi sürekli izlenir.", "Toprak kaçağı izleme (insulation monitoring) MSB'ye entegredir."]
    },
    "Topraklama sistemleri (izole nötr)": {
      title: "Topraklama Sistemleri (İzole Nötr)",
      introduction: "Gemi elektrik sistemleri genellikle izole nötr (IT) sistemi olarak tasarlanır. Tek toprak kaçağında sistem çalışmaya devam eder.",
      sections: [
        { heading: "İzole Nötr (IT) Sistem", paragraphs: ["Jeneratör nötr noktası gövdeye doğrudan bağlanmaz. Tek fazlı toprak kaçağında devre tamamlanmadığından akım akmaz ve sistem çalışmaya devam eder.", "Bu özellik denizde operasyonel sürekliliği sağlar. Ancak ikinci bir toprak kaçağı kısa devreye neden olur."] },
        { heading: "Toprak Kaçağı Tespiti", paragraphs: ["Insulation monitoring device (IMD) sürekli olarak hat-gövde arası izolasyon direncini ölçer. Düşük izolasyon alarm verir.", "Megger testi ile hat bazında izolasyon direnci ölçülür ve arızalı devre bulunur."] }
      ],
      keyPoints: ["Tek toprak kaçağı alarm → çalışma devam eder → en kısa sürede bulunmalıdır.", "İkinci toprak kaçağı → kısa devre → devre kesici açar.", "Islak ortamlar (makine dairesi, güverte) toprak kaçağına en yatkın bölgelerdir."]
    },
    "Üç fazlı asenkron motor": {
      title: "Üç Fazlı Asenkron Motor",
      introduction: "Asenkron (indüksiyon) motor, gemi elektrik sistemlerinde en yaygın kullanılan motor tipidir. Pompa, fan, kompresör ve vinç tahriklerinde kullanılır.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Stator sargılarına üç fazlı AC uygulandığında dönen manyetik alan oluşur. Bu alan rotor iletkenlerinde EMK indükler ve akım üretir. Akım taşıyan rotor iletkenleri manyetik alanda kuvvete maruz kalarak döner.", "Rotor hızı senkron hızdan her zaman düşüktür. Bu fark 'kayma' (slip) olarak adlandırılır."], formula: { expression: "ns = 120f / p\ns = (ns − nr) / ns × 100%", variables: ["ns: Senkron hız (rpm)", "nr: Rotor hızı", "p: Kutup sayısı", "s: Kayma (tipik %2-5)"] } }
      ],
      keyPoints: ["Sincap kafes rotor en yaygın tiptir (basit, sağlam, ucuz).", "Yol alma akımı nominal akımın 5-8 katı olabilir.", "Dönme yönü, herhangi iki fazın yer değiştirilmesiyle tersine çevrilir."]
    },
    "Motor yol verme yöntemleri (DOL, Y-Δ, VFD)": {
      title: "Motor Yol Verme Yöntemleri",
      introduction: "Büyük motorların doğrudan şebekeye bağlanması yüksek başlangıç akımı çeker ve gerilim düşüşüne neden olur. Çeşitli yol verme yöntemleri bu sorunu çözer.",
      sections: [
        { heading: "Yöntemler", paragraphs: [], table: { headers: ["Yöntem", "Başlangıç Akımı", "Başlangıç Torku", "Kullanım"], rows: [["DOL (Direct On Line)", "6-8 × In", "%100", "Küçük motorlar (<15 kW)"], ["Y-Δ (Star-Delta)", "2-3 × In", "%33", "Pompa, fan (düşük tork)"], ["Soft Starter", "2-4 × In (ayarlanabilir)", "%20-100 (ayarlanabilir)", "Orta büyüklük motorlar"], ["VFD", "~In", "%100+", "Tüm boyutlar, değişken hız"]] } },
        { heading: "VFD (Variable Frequency Drive)", paragraphs: ["Frekans dönüştürücü (VFD), motor hızını beslenme frekansını değiştirerek kontrol eder. V/f oranı sabit tutularak motor manyetik akısı korunur.", "Enerji tasarrufu sağlar (özellikle pompa ve fanlarda). Kübik yük karakteristiğinde %20 hız düşüşü ~%50 güç tasarrufu sağlar."] }
      ],
      keyPoints: ["Y-Δ geçiş anında kısa süreli tork kesintisi olur.", "VFD harmonik bozulmaya neden olabilir (filtre gerekir).", "SOLAS gereği bazı kritik pompalar DOL yol verme ile çalışmalıdır."]
    },
    "Aşırı akım koruma (devre kesici)": {
      title: "Aşırı Akım Koruma (Devre Kesici)",
      introduction: "Devre kesiciler (circuit breaker), aşırı akım ve kısa devre durumlarında devreyi otomatik olarak açarak ekipman ve kabloları koruyan güvenlik cihazlarıdır.",
      sections: [
        { heading: "Devre Kesici Tipleri", paragraphs: [], table: { headers: ["Tip", "Kesme Ortamı", "Kullanım"], rows: [["ACB (Air Circuit Breaker)", "Hava", "MSB, jeneratör (440V)"], ["MCCB (Molded Case CB)", "Plastik muhafaza", "Dağıtım panoları"], ["MCB (Miniature CB)", "Plastik", "Küçük yükler"], ["VCB (Vacuum CB)", "Vakum", "Yüksek gerilim (6.6 kV)"]] } },
        { heading: "Koruma Ayarları", paragraphs: ["Uzun zamanlı aşırı akım (overload): Termal veya elektronik trip. 10-30 sn gecikme.", "Kısa zamanlı aşırı akım (short time): Selektif koruma için. 0.1-0.5 sn gecikme.", "Anlık (instantaneous): Kısa devre koruma. Gecikme yok."] }
      ],
      keyPoints: ["Selektif koruma: Arızaya en yakın kesici açmalıdır.", "Devre kesici trip'ten sonra arıza giderilmeden tekrar kapatılmamalıdır.", "Periyodik bakım: Kontak temizliği, trip testi, yalıtım kontrolü."]
    },
    "Ters güç koruma (reverse power)": {
      title: "Ters Güç Koruma (Reverse Power)",
      introduction: "Ters güç koruma rölesi, jeneratörün motor olarak çalışmasını (baradan güç çekmesini) önler. Paralel çalışan jeneratörlerde kritik güvenlik fonksiyonudur.",
      sections: [
        { heading: "Ters Güç Durumu", paragraphs: ["Jeneratörü tahrik eden dizel motor durduğunda veya yakıt kesildiğinde, jeneratör baradan güç alarak motor gibi dönmeye devam eder.", "Bu durum dizel motora mekanik hasar verebilir (tersten dönme, yağlama yetersizliği). Ters güç rölesi bunu algılayarak jeneratör kesicisini açar."] },
        { heading: "Ayar Değerleri", paragraphs: ["Ters güç trip eşiği: Nominal gücün %2-6'sı (dizel motor tipine göre).", "Gecikme süresi: 5-10 saniye (geçici ters güç akışını engellemek için)."] }
      ],
      keyPoints: ["Ters güç koruması SOLAS gereği zorunludur.", "Dizel motor trip'ten önce ters güç rölesi devreye girmelidir.", "Ayar değeri dizel motor üreticisi tavsiyesine göre yapılır."]
    },
    "Tercihli açma (preferential trip)": {
      title: "Tercihli Açma (Preferential Trip)",
      introduction: "Tercihli açma, jeneratör aşırı yüklendiğinde kritik olmayan tüketicileri otomatik olarak devreden çıkararak jeneratörü ve kritik yükleri koruyan sistemdir.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Jeneratör yükü belirli bir eşiği aştığında (tipik %90-110) PMS veya tercihli açma rölesi devreye girer.", "Öncelik sırasına göre kritik olmayan yükler (klima, galley, provizyon soğutma) kesilir.", "Kritik yükler (dümen, navigasyon, yangın pompası, acil aydınlatma) asla kesilmez."] },
        { heading: "Öncelik Kademeleri", paragraphs: [], table: { headers: ["Kademe", "Yükler", "Trip Eşiği"], rows: [["1. kademe", "Klima, galley", "%95-100"], ["2. kademe", "Provizyon, çamaşırhane", "%100-105"], ["3. kademe", "Yük vinçleri, balast", "%105-110"]] } }
      ],
      keyPoints: ["Tercihli açma blackout'u önlemenin son savunma hattıdır.", "Yük geri bağlama manuel veya otomatik yapılabilir.", "SOLAS gereği belirli kritik yükler hiçbir durumda kesilmemelidir."]
    },
    "İnsülasyon direnci ölçümü ve izleme": {
      title: "İnsülasyon Direnci Ölçümü ve İzleme",
      introduction: "İnsülasyon direnci, elektrik iletkenlerinin gövde veya toprak ile arasındaki yalıtım kalitesini gösteren ölçümdür.",
      sections: [
        { heading: "Megger Testi", paragraphs: ["Megger (insulation resistance tester), DC test gerilimi (500V, 1000V veya 2500V) uygulayarak iletken-gövde arası direnci ölçer.", "Minimum kabul değeri: 1 MΩ (genel kural). Motor ve jeneratörlerde sıcaklık düzeltmesi uygulanır."], formula: { expression: "Rmin = (Un / 1000) + 1  [MΩ]  (genel kural)", variables: ["Un: Nominal gerilim (V)"] } },
        { heading: "Sürekli İzleme", paragraphs: ["Insulation monitoring device (IMD) bara-gövde arası izolasyon direncini sürekli ölçer. Değer eşiğin altına düştüğünde alarm verir.", "IT (izole nötr) sistemde tek toprak kaçağı alarm, ikinci kaçak trip yapar."] }
      ],
      keyPoints: ["Islak ortamda izolasyon direnci düşer (nem emilimi).", "Motor çalıştırma öncesi megger testi rutin uygulamadır.", "Düşük izolasyon direnci yangın ve elektrik çarpması riskini artırır."]
    },
    "Shore connection (kıyı bağlantısı)": {
      title: "Shore Connection (Kıyı Bağlantısı)",
      introduction: "Shore connection, geminin limanda kendi jeneratörlerini çalıştırmak yerine kıyıdan elektrik almasını sağlayan sistemdir.",
      sections: [
        { heading: "Sistem Yapısı", paragraphs: ["Kıyı elektriği özel bir bağlantı panosu (shore connection panel) üzerinden gemiye bağlanır. Gerilim, frekans ve faz sırası uyumluluğu sağlanmalıdır.", "Geminin çalışma gerilimi ile kıyı gerilimi farklıysa trafo kullanılır."] },
        { heading: "Cold Ironing / OPS", paragraphs: ["Onshore Power Supply (OPS) veya cold ironing, geminin limanda kıyı elektriğiyle çalışmasıdır. Jeneratörler durdurularak egzoz emisyonları sıfırlanır.", "AB limanlarında OPS zorunluluğu giderek yaygınlaşmaktadır."], table: { headers: ["Parametre", "Tipik Değer"], rows: [["Gerilim", "440V veya 6.6/11 kV"], ["Frekans", "50 Hz veya 60 Hz"], ["IEC standardı", "IEC/ISO 80005"]] } }
      ],
      keyPoints: ["Shore connection öncesi faz sırası kontrol edilmelidir.", "Bağlantı/çıkış sırası prosedürü takip edilmelidir.", "OPS, liman emisyon düzenlemelerine uyum sağlar."]
    },
    "Kısa devre koruma": {
      title: "Kısa Devre Koruma",
      introduction: "Kısa devre, elektrik devresinde düşük empedanslı bir yol oluşmasıdır. Çok yüksek akımlar akar ve ciddi hasar riski vardır.",
      sections: [
        { heading: "Kısa Devre Akımı", paragraphs: ["Kısa devre akımı nominal akımın 10-50 katına ulaşabilir. Termal ve mekanik etkileri yıkıcıdır.", "Kısa devre akımı hesabı: Jeneratör empedansı, kablo empedansı ve trafo empedansı dikkate alınır."] },
        { heading: "Koruma Elemanları", paragraphs: [], table: { headers: ["Eleman", "Kesme Hızı", "Kullanım"], rows: [["HRC sigorta", "Çok hızlı (<5 ms)", "Motor koruması, dağıtım"], ["Devre kesici (instantaneous)", "Hızlı (20-50 ms)", "MSB, panel"], ["Current limiting reactor", "Sürekli", "Kısa devre akımını sınırlama"]] } }
      ],
      keyPoints: ["Selektivite: En yakın koruma elemanı ilk açmalıdır.", "Kısa devre akımı hesabı pano ve kablo tasarımının temelidir.", "6.6 kV sistemlerde kısa devre akımı çok yüksek olabilir (VCB gerektirir)."]
    },
    "Toprak kaçağı koruma": {
      title: "Toprak Kaçağı Koruma",
      introduction: "Toprak kaçağı, elektrik akımının normal yol yerine gövde veya toprak üzerinden akmasıdır. Elektrik çarpması ve yangın riski oluşturur.",
      sections: [
        { heading: "IT Sistemde Toprak Kaçağı", paragraphs: ["İzole nötr sistemde tek toprak kaçağında akım devresi tamamlanmaz (kapasitif akım hariç). Sistem çalışmaya devam eder ancak alarm verilir.", "İkinci toprak kaçağı farklı bir fazda oluşursa faz-faz kısa devresi meydana gelir ve koruma devreye girer."] },
        { heading: "Tespit ve İzole Etme", paragraphs: ["1. IMD alarmı alındığında etkilenen faz belirlenir.", "2. Sırasıyla devre kesiciler açılarak arızalı devre bulunur.", "3. Arızalı ekipman izole edilir ve onarım yapılır.", "4. Megger testi ile izolasyon doğrulanır."] }
      ],
      keyPoints: ["Islak bölgelerde (makine dairesi, güverte) toprak kaçağı sıktır.", "Toprak kaçağı algılama gecikmesi ikinci kaçak riskini artırır.", "Periyodik izolasyon ölçümü önleyici bakımın parçasıdır."]
    },
    "DC motor tipleri ve uygulamaları": {
      title: "DC Motor Tipleri ve Uygulamaları",
      introduction: "DC motorlar, gemilerde hız kontrolü gereken uygulamalarda kullanılmıştır. VFD teknolojisiyle AC motorlar DC motorların yerini almaktadır.",
      sections: [
        { heading: "DC Motor Tipleri", paragraphs: [], table: { headers: ["Tip", "Bağlantı", "Özellik", "Kullanım"], rows: [["Seri uyarmalı", "Alan sargısı yükle seri", "Yüksek kalkış torku", "Vinç, ırgat"], ["Şönt uyarmalı", "Alan sargısı yükle paralel", "Sabit hız", "Pompa, fan"], ["Kompound", "Seri + şönt", "Karma özellik", "Genel amaç"]] } },
        { heading: "Gemi Uygulamaları", paragraphs: ["Eski gemilerde Ward-Leonard sistemi ile ana motor hız kontrolü DC motorlarla yapılırdı. Modern gemilerde VFD kontrollü AC motorlar bu sistemi tamamen devralmıştır."] }
      ],
      keyPoints: ["DC motorun en büyük dezavantajı komütatör ve fırça bakımıdır.", "VFD teknolojisi DC motorlara olan ihtiyacı büyük ölçüde ortadan kaldırmıştır.", "Bazı eski gemilerde hâlâ DC motor bulunabilir."]
    },
    "Frekans dönüştürücü (VFD) kontrolü": {
      title: "Frekans Dönüştürücü (VFD) Kontrolü",
      introduction: "VFD (Variable Frequency Drive), AC motorun hızını beslenme frekansını ve gerilimini değiştirerek kontrol eden güç elektroniği cihazıdır.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["AC → Doğrultucu (rectifier) → DC → İnvertör → Değişken frekanslı AC.", "V/f oranı sabit tutularak motor manyetik akısı ve tork karakteristiği korunur.", "PWM (Pulse Width Modulation) tekniği ile sinüsoidal dalga formu üretilir."] },
        { heading: "Gemi Uygulamaları", paragraphs: [], table: { headers: ["Uygulama", "Tasarruf", "Neden"], rows: [["Soğutma suyu pompası", "%30-50", "Değişken debi ihtiyacı"], ["Makine dairesi fan", "%20-40", "Değişken havalandırma"], ["Balast pompası", "%15-25", "Değişken debi/basınç"], ["Bow thruster", "%10-20", "Manevra optimizasyonu"]] } }
      ],
      keyPoints: ["VFD ile %20 hız düşüşü pompalarda ~%50 güç tasarrufu sağlar.", "Harmonik bozulma filtreler veya multi-pulse doğrultucu ile azaltılır.", "VFD arızası durumunda bypass (DOL) çalışma imkanı olmalıdır."]
    },
    "Seyir fenerleri (navigation lights)": {
      title: "Seyir Fenerleri (Navigation Lights)",
      introduction: "Seyir fenerleri, geminin konumunu, yönünü ve durumunu diğer deniz araçlarına bildiren zorunlu aydınlatma düzenidir.",
      sections: [
        { heading: "Temel Seyir Fenerleri", paragraphs: [], table: { headers: ["Fener", "Renk", "Görüş Açısı", "Menzil"], rows: [["Sancak (starboard)", "Yeşil", "112.5°", "3 nm"], ["İskele (port)", "Kırmızı", "112.5°", "3 nm"], ["Pruva beyaz (masthead)", "Beyaz", "225°", "6 nm (>50m)"], ["Kıç beyaz (stern)", "Beyaz", "135°", "3 nm"], ["Çıpa feneri (anchor)", "Beyaz", "360°", "3 nm"]] } },
        { heading: "Elektrik Beslemesi", paragraphs: ["Seyir fenerleri acil dağıtım panosundan (ESB) beslenir. Güç kaybında akü sistemi otomatik devreye girer.", "Fener izleme paneli (navigation light panel) her fenerin çalışma durumunu köprüüstünde gösterir. Fener arızası sesli ve görsel alarm verir."] }
      ],
      keyPoints: ["COLREG kural 20-31 seyir feneri kurallarını belirler.", "LED seyir fenerleri enerji tasarrufu ve uzun ömür sağlar.", "Fener arızası GMDSS ile bildirilmelidir."]
    },
    "Akü tipleri ve şarj sistemleri": {
      title: "Akü Tipleri ve Şarj Sistemleri",
      introduction: "Gemi akü sistemleri acil güç kaynağı, UPS besleme ve motor çalıştırma (starting battery) amaçlı kullanılır.",
      sections: [
        { heading: "Akü Tipleri", paragraphs: [], table: { headers: ["Tip", "Gerilim/Hücre", "Avantaj", "Kullanım"], rows: [["Kurşun-asit", "2V", "Ucuz, güvenilir", "Acil aydınlatma, UPS"], ["Nikel-kadmiyum (NiCd)", "1.2V", "Dayanıklı, düşük bakım", "Motor çalıştırma"], ["Lityum-iyon (Li-ion)", "3.6-3.7V", "Yüksek enerji yoğunluğu", "Hibrit gemiler"]] } },
        { heading: "Şarj Sistemleri", paragraphs: ["Float şarj: Akü sürekli düşük akımla şarjda tutulur. Kendiliğinden boşalmayı önler.", "Boost şarj: Yüksek akımla hızlı şarj. Derin deşarj sonrası uygulanır.", "Akü kapasitesi Ah (amper-saat) birimiyle ifade edilir. SOLAS gereği acil akü kapasitesi 18-36 saat arası olmalıdır."] }
      ],
      keyPoints: ["Akü odası havalandırması zorunludur (hidrojen gazı riski).", "Kurşun-asit akülerde elektrolit seviyesi kontrol edilmelidir.", "Li-ion akülerde BMS (Battery Management System) güvenlik için zorunludur."]
    },
    "Acil aydınlatma sistemi": {
      title: "Acil Aydınlatma Sistemi",
      introduction: "Acil aydınlatma, ana güç kaybında toplanma istasyonları, tahliye yolları ve kritik alanlarda aydınlatma sağlayan güvenlik sistemidir.",
      sections: [
        { heading: "Sistem Yapısı", paragraphs: ["Acil jeneratör veya akü sistemi tarafından beslenir. Ana güç kaybında otomatik devreye girer.", "Acil aydınlatma güzergahı: Köprüüstü, makine dairesi, tahliye yolları, muster station, can kurtarma botu alanları."] },
        { heading: "SOLAS Gereklilikleri", paragraphs: ["Ana güç kaybında acil aydınlatma otomatik olarak devreye girmelidir.", "Akü destekli acil aydınlatma en az 3 saat sürekli çalışmalıdır.", "Geçiş süresi (switchover) 3 saniyeyi geçmemelidir."] }
      ],
      keyPoints: ["Periyodik test: Haftalık fonksiyon testi, yıllık kapasite testi.", "Self-contained emergency luminaire: Dahili akülü acil armatür.", "Fosforlu/fotolüminesans işaretler tahliye yollarını gösterir."]
    },
    "Motor koruma ve bakım": {
      title: "Motor Koruma ve Bakım",
      introduction: "Elektrik motorlarının korunması ve bakımı, gemi elektrik sisteminin güvenilir çalışması için kritiktir.",
      sections: [
        { heading: "Koruma Elemanları", paragraphs: [], table: { headers: ["Koruma", "Tehlike", "Cihaz"], rows: [["Aşırı akım", "Mekanik yüklenme", "Termik röle / MCCB"], ["Kısa devre", "Yalıtım arızası", "HRC sigorta / MCCB"], ["Faz kaybı", "Asimetrik çalışma", "Faz koruma rölesi"], ["Toprak kaçağı", "Yalıtım bozulması", "Kaçak akım rölesi"], ["Termik koruma", "Aşırı ısınma", "PTC/PT100 sensör"]] } },
        { heading: "Bakım İşleri", paragraphs: ["Periyodik: İzolasyon direnci ölçümü, yatak greslemesi, terminal sıkılık kontrolü, fan temizliği.", "Yıllık: Stator ve rotor muayenesi, yatak değişimi (gerekirse), sargı temizliği ve vernik.", "Motor titreşim ölçümü yatak durumunu gösterir."] }
      ],
      keyPoints: ["Motor arıza nedenlerinin %40'ı yatak, %30'u sargı, %20'si harici sorunlardır.", "Islak ortamda çalışan motorlarda space heater (ısıtıcı) kullanılır.", "Motor nameplate verileri koruma ayarının temelidir."]
    },
    "Patlama korumalı (Ex-proof) ekipman": {
      title: "Patlama Korumalı (Ex-proof) Ekipman",
      introduction: "Patlayıcı atmosfer oluşabilecek bölgelerde (yakıt tankı üstü, pompa dairesi, boya deposu) kullanılan elektrikli ekipmanların özel koruma tiplerine sahip olması zorunludur.",
      sections: [
        { heading: "Koruma Tipleri", paragraphs: [], table: { headers: ["Kod", "Tip", "Prensip"], rows: [["Ex d", "Alev sızdırmaz", "Patlama muhafaza içinde kalır"], ["Ex e", "Artırılmış güvenlik", "Kıvılcım oluşumu önlenir"], ["Ex i", "Kendinden güvenli", "Enerji tutuşma için yetersiz"], ["Ex p", "Basınçlandırılmış", "Temiz hava ile pozitif basınç"], ["Ex n", "Kıvılcımsız", "Normal çalışmada kıvılcım yok"]] } },
        { heading: "Bölge Sınıflandırma", paragraphs: ["Zone 0: Patlayıcı atmosfer sürekli mevcut.", "Zone 1: Normal çalışmada ara sıra patlayıcı atmosfer.", "Zone 2: Anormal koşullarda kısa süreli patlayıcı atmosfer."] }
      ],
      keyPoints: ["Ex-proof ekipman sertifikası (ATEX, IECEx) zorunludur.", "Ex-proof ekipman üzerinde izinsiz modifikasyon yapılmamalıdır.", "Tanker gemilerinde güverte ve pompa dairesi Ex bölgesidir."]
    },
    "UPS (kesintisiz güç kaynağı)": {
      title: "UPS (Kesintisiz Güç Kaynağı)",
      introduction: "UPS, güç kesintisinde kritik ekipmanların kesintisiz çalışmasını sağlayan akü destekli güç kaynağıdır.",
      sections: [
        { heading: "UPS Tipi ve Kullanım", paragraphs: ["Online (çift dönüşümlü) UPS: Sürekli akü-invertör üzerinden besleme. Sıfır geçiş süresi.", "Standby UPS: Normal durumda şebeke direkt, kesintide akü devreye girer (2-10 ms geçiş)."], table: { headers: ["Beslenen Ekipman", "UPS Tipi", "Kapasite"], rows: [["Navigasyon cihazları", "Online", "3-10 kVA"], ["GMDSS", "Online", "1-5 kVA"], ["Yangın alarm sistemi", "Standby", "1-3 kVA"], ["Makine otomasyon", "Online", "5-20 kVA"]] } }
      ],
      keyPoints: ["UPS akü kapasitesi en az 30 dakika olmalıdır.", "Akü sıcaklığı ömrü etkiler (her 10°C artış ömrü yarılar).", "Periyodik yük testi ile UPS performansı doğrulanmalıdır."]
    },
    "Kablo tipleri ve boyutlandırma": {
      title: "Kablo Tipleri ve Boyutlandırma",
      introduction: "Gemi kablolama sistemi, elektrik enerjisinin güvenli ve verimli dağıtımını sağlar. Denizcilik koşullarına uygun özel kablo tipleri kullanılır.",
      sections: [
        { heading: "Kablo Tipleri", paragraphs: [], table: { headers: ["Tip", "Özellik", "Kullanım"], rows: [["XLPE/SWA", "Çapraz bağlı polietilen, çelik zırh", "Güç kabloları"], ["EPR/CSP", "Etilen propilen kauçuk", "Yüksek sıcaklık bölgeleri"], ["LSZH", "Düşük duman, halojen free", "Yaşam mahalleri"], ["Mineral yalıtımlı (MI)", "Yangına dayanıklı", "Acil sistemler, yangın pompaları"]] } },
        { heading: "Boyutlandırma", paragraphs: ["Kablo kesiti seçiminde: Akım taşıma kapasitesi, gerilim düşüşü (%6 limit), kısa devre dayanımı dikkate alınır.", "Gruplandırma ve ortam sıcaklığı düzeltme faktörleri uygulanır."] }
      ],
      keyPoints: ["Gemi kabloları IEC 60092 standardına uygun olmalıdır.", "Kablo geçişleri yangın bölmelerinde A-sınıfı sızdırmazlık gerektirir.", "Kablo bükme yarıçapı kablo çapının en az 6 katı olmalıdır."]
    },
    "440V ve 6.6kV sistemler": {
      title: "440V ve 6.6kV Sistemler",
      introduction: "Gemi elektrik sistemleri güç kapasitesine göre düşük gerilim (440V) veya yüksek gerilim (6.6 kV veya 11 kV) olarak tasarlanır.",
      sections: [
        { heading: "Karşılaştırma", paragraphs: [], table: { headers: ["Özellik", "440V Sistem", "6.6kV Sistem"], rows: [["Gemi tipi", "Genel kargo, tanker", "Büyük konteyner, LNG, cruise"], ["Güç kapasitesi", "<5 MW", ">5 MW"], ["Kablo boyutu", "Büyük kesit", "Küçük kesit (düşük akım)"], ["Güvenlik", "Standart", "Yüksek (daha tehlikeli)"], ["Koruma", "ACB, MCCB", "VCB, differential relay"], ["Personel yetkinliği", "Standart", "Yüksek gerilim eğitimi"]] } }
      ],
      keyPoints: ["6.6 kV sistemlerde çalışma özel eğitim ve yetki gerektirir.", "Yüksek gerilim bölümüne girilmeden önce izolasyon ve topraklama zorunludur.", "Trafo ile 6.6 kV → 440V dönüşüm yapılır."]
    },
    "Acil dağıtım panosu (ESB)": {
      title: "Acil Dağıtım Panosu (ESB)",
      introduction: "ESB (Emergency Switchboard), acil jeneratör veya akü sisteminden beslenen ve kritik yüklere güç dağıtan ayrı bir panodur.",
      sections: [
        { heading: "Beslenen Kritik Yükler", paragraphs: [], table: { headers: ["Yük", "Zorunluluk"], rows: [["Seyir fenerleri", "SOLAS"], ["GMDSS haberleşme", "SOLAS"], ["Acil yangın pompası", "SOLAS"], ["Dümen makinesi", "SOLAS"], ["Acil aydınlatma", "SOLAS"], ["Genel alarm sistemi", "SOLAS"], ["Yangın algılama", "SOLAS"]] } },
        { heading: "Konumlandırma", paragraphs: ["ESB, makine dairesinin üzerinde ve ana yangın sınırının ötesinde konumlandırılmalıdır. Acil jeneratörle birlikte bulunur."] }
      ],
      keyPoints: ["ESB'den MSB'ye interlock bağlantısı bulunur.", "Ana güç geri geldiğinde yük transferi kontrollü yapılmalıdır.", "ESB periyodik olarak test edilmelidir."]
    },
  },
};

export default content4;
