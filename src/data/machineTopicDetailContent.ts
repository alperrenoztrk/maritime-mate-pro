export interface MachineSubTopicSection {
  heading: string;
  paragraphs: string[];
  formula?: {
    expression: string;
    variables?: string[];
  };
  example?: {
    problem: string;
    steps: string[];
    result: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  bulletPoints?: string[];
  diagram?: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export interface MachineSubTopicContent {
  title: string;
  introduction: string;
  sections: MachineSubTopicSection[];
  keyPoints?: string[];
}

type ContentMap = Record<string, Record<string, MachineSubTopicContent>>;

const content: ContentMap = {
  // ═══════════════════════════════════════════════════════════════
  // TERMODİNAMİK
  // ═══════════════════════════════════════════════════════════════
  thermodynamics: {
    "Termodinamik sistem ve sınıflandırması": {
      title: "Termodinamik Sistem ve Sınıflandırması",
      introduction: "Termodinamik, ısı ve iş arasındaki ilişkiyi inceleyen bilim dalıdır. Herhangi bir termodinamik çözümlemeye başlamadan önce incelenen bölgenin sınırları net biçimde tanımlanmalıdır; bu tanımlama 'sistem' kavramı üzerinden yapılır.",
      sections: [
        {
          heading: "Sistem, Çevre ve Sınır",
          paragraphs: [
            "Termodinamik sistem, incelenmek üzere seçilen ve sınırlarıyla çevresinden ayrılan madde veya uzay bölgesidir. Sistemin dışında kalan her şey çevre (surroundings), sistemi çevreden ayıran yüzey ise sınır (boundary) olarak adlandırılır.",
            "Sınır sabit veya hareketli olabilir. Bir silindirdeki pistonun üst yüzeyi hareketli sınıra örnektir; silindir duvarları ise sabit sınırdır."
          ],
          diagram: { src: "/diagrams/machine/termodinamik-sistem.svg", alt: "Termodinamik Sistem Sınıflandırması - Kapalı, Açık ve Yalıtılmış Sistem", caption: "Şekil: Kapalı, açık ve yalıtılmış sistem karşılaştırması" }
        },
        {
          heading: "Kapalı Sistem (Kontrol Kütlesi)",
          paragraphs: [
            "Kapalı sistemde sınırdan kütle geçişi yoktur; yalnızca enerji (ısı ve iş) geçişi olabilir. Örnek olarak silindir-piston düzeneği verilebilir: piston hareket ederken içerideki gaz kütlesi değişmez, ancak hacim değişimi yoluyla iş yapılır ve ısı alınır veya verilir."
          ]
        },
        {
          heading: "Açık Sistem (Kontrol Hacmi)",
          paragraphs: [
            "Açık sistemde hem kütle hem enerji sınırdan geçebilir. Gemi türbinleri, kompresörler ve ısı eşanjörleri açık sisteme örnektir. Kontrol hacmi olarak da adlandırılır; sınırına kontrol yüzeyi denir.",
            "Süreklilik denklemi gereği, kararlı haldeki açık bir sisteme giren kütle debisi, çıkan kütle debisine eşittir."
          ]
        },
        {
          heading: "Yalıtılmış Sistem",
          paragraphs: [
            "Yalıtılmış sistemde ne kütle ne de enerji sınırdan geçer. Termodinamiğin ikinci yasasına göre yalıtılmış bir sistemin entropisi asla azalmaz. Pratikte tam yalıtılmış bir sistem mevcut değildir, ancak evreni bir yalıtılmış sistem olarak modellemek kuramsal çözümlemelerde yaygındır."
          ]
        },
        {
          heading: "Adyabatik Sistem",
          paragraphs: [
            "Sınırından ısı geçişi olmayan ancak iş yapabilen sistem adyabatik olarak tanımlanır. Mükemmel yalıtılmış bir silindir-piston düzeneği adyabatik kapalı sistem örneğidir."
          ]
        }
      ],
      keyPoints: [
        "Kapalı sistemde kütle geçişi yok, enerji geçişi var.",
        "Açık sistemde hem kütle hem enerji geçişi var.",
        "Yalıtılmış sistemde ne kütle ne enerji geçişi var.",
        "Gemi makinelerinin çoğu açık sistem olarak modellenir."
      ]
    },
    "Hal büyüklükleri: basınç, sıcaklık, hacim": {
      title: "Hal Büyüklükleri: Basınç, Sıcaklık, Hacim",
      introduction: "Bir termodinamik sistemin durumunu belirleyen ölçülebilir nicelikler hal büyüklükleri olarak adlandırılır. Basınç, sıcaklık ve hacim en temel hal büyüklükleridir.",
      sections: [
        {
          heading: "Basınç",
          paragraphs: [
            "Basınç, birim alana etki eden kuvvettir. SI biriminde Pascal (Pa = N/m²) olarak ölçülür. Denizcilik uygulamalarında bar (1 bar = 10⁵ Pa) yaygın olarak kullanılır.",
            "Mutlak basınç (P_abs), sıfır referansına göre ölçülür. Manometrik basınç (P_gauge) atmosfer basıncını referans alır."
          ],
          formula: {
            expression: "P_abs = P_gauge + P_atm",
            variables: [
              "P_abs: Mutlak basınç (bar)",
              "P_gauge: Manometrik basınç (bar)",
              "P_atm: Atmosfer basıncı ≈ 1.01325 bar"
            ]
          },
          example: {
            problem: "Bir basınç göstergesi 7.5 bar gösteriyorsa, mutlak basınç kaçtır?",
            steps: [
              "P_abs = P_gauge + P_atm",
              "P_abs = 7.5 + 1.013 = 8.513 bar"
            ],
            result: "Mutlak basınç 8.513 bar'dır."
          }
        },
        {
          heading: "Sıcaklık",
          paragraphs: [
            "Sıcaklık, bir cismin termal enerji düzeyinin göstergesidir. SI biriminde Kelvin (K) kullanılır; Celsius (°C) ile arasındaki bağıntı T(K) = t(°C) + 273.15 şeklindedir.",
            "Termodinamik hesaplamalarda mutlaka Kelvin ölçeği kullanılmalıdır. Celsius ölçeği ile yapılan hesaplar fark değerlerinde geçerli olsa da, oran veya çarpma içeren formüllerde hatalara neden olur."
          ]
        },
        {
          heading: "Hacim ve Özgül Hacim",
          paragraphs: [
            "Hacim, bir sistemin kapladığı uzay miktarıdır. Özgül hacim (v), birim kütlenin kapladığı hacimdir ve yoğunluğun tersidir."
          ],
          formula: {
            expression: "v = V / m = 1 / ρ",
            variables: [
              "v: Özgül hacim (m³/kg)",
              "V: Toplam hacim (m³)",
              "m: Kütle (kg)",
              "ρ: Yoğunluk (kg/m³)"
            ]
          }
        }
      ],
      keyPoints: [
        "Basınç hesaplarında mutlak ve manometrik ayrımına dikkat edilmelidir.",
        "Termodinamik hesaplarda sıcaklık her zaman Kelvin cinsinden alınır.",
        "Özgül hacim, yoğunluğun tersidir."
      ]
    },
    "İç enerji ve entalpi": {
      title: "İç Enerji ve Entalpi",
      introduction: "İç enerji ve entalpi, termodinamik sistemlerin enerji durumunu tanımlayan iki temel büyüklüktür. Gemi makinelerindeki enerji hesaplarının temeli bu kavramlara dayanır.",
      sections: [
        {
          heading: "İç Enerji (U)",
          paragraphs: [
            "İç enerji, bir sistemin moleküler düzeydeki toplam kinetik ve potansiyel enerjisidir. Sıcaklık arttıkça moleküllerin kinetik enerjisi artar ve dolayısıyla iç enerji yükselir.",
            "Kapalı bir sistemde birinci yasa gereği: Q - W = ΔU şeklinde yazılır; burada Q sisteme verilen ısı, W sistemin yaptığı iştir."
          ],
          formula: {
            expression: "ΔU = m · cv · ΔT",
            variables: [
              "ΔU: İç enerji değişimi (kJ)",
              "m: Kütle (kg)",
              "cv: Sabit hacimde özgül ısı (kJ/kg·K)",
              "ΔT: Sıcaklık değişimi (K)"
            ]
          }
        },
        {
          heading: "Entalpi (H)",
          paragraphs: [
            "Entalpi, iç enerji ile basınç-hacim çarpımının toplamıdır: H = U + PV. Açık sistemlerde akışkanın taşıdığı toplam enerjiyi temsil eder.",
            "Sabit basınçtaki süreçlerde sisteme verilen ısı, entalpi değişimine eşittir. Bu özellik, kazanlar, kondensörler ve ısı eşanjörleri gibi gemi ekipmanlarının analizinde büyük kolaylık sağlar."
          ],
          formula: {
            expression: "ΔH = m · cp · ΔT",
            variables: [
              "ΔH: Entalpi değişimi (kJ)",
              "cp: Sabit basınçta özgül ısı (kJ/kg·K)"
            ]
          },
          example: {
            problem: "Bir ısı eşanjöründe 500 kg/h deniz suyu 15°C'den 45°C'ye ısıtılmaktadır. cp = 4.0 kJ/kg·K ise gerekli ısı gücünü bulunuz.",
            steps: [
              "ΔT = 45 - 15 = 30 K",
              "Q = ṁ · cp · ΔT = (500/3600) · 4.0 · 30",
              "Q = 0.1389 · 4.0 · 30 = 16.67 kW"
            ],
            result: "Gerekli ısı gücü 16.67 kW'tır."
          }
        }
      ],
      keyPoints: [
        "İç enerji kapalı sistem analizlerinde, entalpi açık sistem analizlerinde kullanılır.",
        "Sabit hacimde ısı değişimi = ΔU, sabit basınçta ısı değişimi = ΔH.",
        "cp her zaman cv'den büyüktür çünkü sabit basınçta genişleme işi de yapılır."
      ]
    },
    "Spesifik ısı kapasiteleri (Cp, Cv)": {
      title: "Spesifik Isı Kapasiteleri (Cp ve Cv)",
      introduction: "Bir maddenin birim kütlesinin sıcaklığını 1 K artırmak için gerekli ısı miktarı, özgül (spesifik) ısı kapasitesi olarak tanımlanır. Termodinamikte iki önemli özgül ısı kapasitesi vardır: sabit basınçtaki cp ve sabit hacimdeki cv.",
      sections: [
        {
          heading: "Sabit Hacimde Özgül Isı (cv)",
          paragraphs: [
            "Hacim sabit tutularak birim kütlenin sıcaklığının 1 K artırılması için gerekli ısıdır. Sabit hacimde genişleme işi yapılamadığından verilen ısının tamamı iç enerji artışına dönüşür."
          ]
        },
        {
          heading: "Sabit Basınçta Özgül Isı (cp)",
          paragraphs: [
            "Basınç sabit tutularak birim kütlenin sıcaklığının 1 K artırılması için gerekli ısıdır. Sabit basınçta sistem genişler ve iş yapar; bu nedenle cp değeri her zaman cv'den büyüktür."
          ]
        },
        {
          heading: "Özgül Isılar Arasındaki İlişkiler",
          paragraphs: [
            "İdeal gazlar için iki önemli bağıntı vardır:"
          ],
          formula: {
            expression: "cp − cv = R    ve    γ = cp / cv",
            variables: [
              "R: Özgül gaz sabiti (kJ/kg·K)",
              "γ (kappa): Özgül ısı oranı (hava için γ ≈ 1.4)"
            ]
          },
          table: {
            headers: ["Gaz", "cp (kJ/kg·K)", "cv (kJ/kg·K)", "γ"],
            rows: [
              ["Hava", "1.005", "0.718", "1.4"],
              ["CO₂", "0.846", "0.657", "1.29"],
              ["Egzoz gazı (yaklaşık)", "1.10", "0.83", "1.33"]
            ]
          }
        }
      ],
      keyPoints: [
        "cp − cv = R bağıntısı yalnızca ideal gazlar için geçerlidir.",
        "γ değeri adyabatik süreç hesaplarında kritik öneme sahiptir.",
        "Hava için γ ≈ 1.4 değeri motor performans hesaplarında yaygın olarak kullanılır."
      ]
    },
    "Termodinamiğin sıfırıncı yasası": {
      title: "Termodinamiğin Sıfırıncı Yasası",
      introduction: "Termodinamiğin sıfırıncı yasası, sıcaklık kavramının ve sıcaklık ölçümünün fiziksel temelini oluşturur.",
      sections: [
        {
          heading: "Yasa Tanımı",
          paragraphs: [
            "Eğer A cismi C cismiyle termal dengede ise ve B cismi de C cismiyle termal dengede ise, o zaman A ve B cisimleri de birbirleriyle termal dengededir. Bu ifade termodinamiğin sıfırıncı yasasıdır.",
            "Termal denge, iki sistem arasında net ısı akışının olmadığı durumdur. İki sistem birbirine temas ettirildiğinde aralarında ısı transferi gerçekleşmiyorsa bu sistemler aynı sıcaklıktadır."
          ]
        },
        {
          heading: "Uygulamadaki Önemi",
          paragraphs: [
            "Sıfırıncı yasa, termometre kullanılarak sıcaklık ölçümünün fiziksel dayanağını sağlar. Bir termometre (C cismi), ölçülmek istenen sistemle (A cismi) termal dengeye ulaştığında termometrenin gösterdiği değer, sistemin sıcaklığıdır.",
            "Gemi makine dairesinde kullanılan tüm sıcaklık sensörleri (termokupllar, RTD'ler, kızılötesi termometreler) bu ilkeye dayanarak çalışır."
          ]
        }
      ],
      keyPoints: [
        "Sıfırıncı yasa sıcaklık ölçümünün temelini oluşturur.",
        "Termal denge, net ısı akışının sıfır olduğu durumdur.",
        "Birinci ve ikinci yasadan önce ifade edilmiş olmasına rağmen daha sonra formüle edildiği için 'sıfırıncı' adını almıştır."
      ]
    },
    "Birinci yasa: enerji korunumu": {
      title: "Birinci Yasa: Enerji Korunumu",
      introduction: "Termodinamiğin birinci yasası, enerjinin yoktan var edilemeyeceğini ve var olan enerjinin yok edilemeyeceğini belirtir. Enerji yalnızca bir formdan diğerine dönüştürülebilir.",
      sections: [
        {
          heading: "Kapalı Sistem İçin Birinci Yasa",
          paragraphs: [
            "Kapalı bir sisteme verilen ısı (Q), sistemin yaptığı iş (W) ile iç enerjisindeki değişimin (ΔU) toplamına eşittir."
          ],
          formula: {
            expression: "Q = W + ΔU",
            variables: [
              "Q: Sisteme verilen ısı (kJ), pozitif",
              "W: Sistemin yaptığı iş (kJ), pozitif",
              "ΔU: İç enerji değişimi (kJ)"
            ]
          },
          example: {
            problem: "Bir silindir içindeki gazın iç enerjisi 150 kJ artmıştır. Gaz 200 kJ ısı almış ise, yapılan iş nedir?",
            steps: [
              "Q = W + ΔU",
              "200 = W + 150",
              "W = 200 − 150 = 50 kJ"
            ],
            result: "Gaz 50 kJ iş yapmıştır."
          }
        },
        {
          heading: "Açık Sistem İçin Birinci Yasa (SFEE)",
          paragraphs: [
            "Açık sistemlerde kararlı akış enerji denklemi (Steady Flow Energy Equation – SFEE) kullanılır. Giriş ve çıkıştaki entalpi, kinetik enerji ve potansiyel enerji farkları ile birlikte ısı ve iş terimleri dikkate alınır."
          ],
          formula: {
            expression: "q − w = (h₂ − h₁) + (C₂² − C₁²)/2 + g(z₂ − z₁)",
            variables: [
              "q: Birim kütleye verilen ısı (kJ/kg)",
              "w: Birim kütlenin yaptığı iş (kJ/kg)",
              "h: Özgül entalpi (kJ/kg)",
              "C: Akışkan hızı (m/s)",
              "z: Yükseklik (m)"
            ]
          }
        }
      ],
      keyPoints: [
        "Enerji yoktan var edilemez, var olan enerji yok edilemez.",
        "Kapalı sistemlerde Q = W + ΔU uygulanır.",
        "Açık sistemlerde SFEE denklemi kullanılır.",
        "Gemi makinelerinin büyük çoğunluğu açık sistem olarak analiz edilir."
      ]
    },
    "Açık ve kapalı sistemlerde enerji dengesi": {
      title: "Açık ve Kapalı Sistemlerde Enerji Dengesi",
      introduction: "Gemi makineleri hem kapalı hem açık sistem modelleri ile analiz edilir. Doğru model seçimi, enerji dengesinin doğru kurulmasının ön koşuludur.",
      sections: [
        {
          heading: "Kapalı Sistem Enerji Dengesi",
          paragraphs: [
            "Kapalı sistemde sınırdan kütle geçişi olmadığından enerji dengesi yalnızca ısı ve iş üzerinden kurulur. Silindir-piston düzeneğinde sıkıştırma ve genleşme süreçleri bu modelle çözümlenir."
          ],
          formula: {
            expression: "Q − W = ΔU = m·cv·(T₂ − T₁)",
            variables: []
          }
        },
        {
          heading: "Açık Sistem Enerji Dengesi",
          paragraphs: [
            "Açık sistemlerde giren ve çıkan akışkanın taşıdığı enerji de dengeye katılır. Turboşarjer, kondenser, ekonomizer gibi ekipmanlar sabit akışlı açık sistemlerdir.",
            "Birçok gemi ekipmanında kinetik ve potansiyel enerji değişimleri ihmal edilebilir düzeydedir. Bu durumda denklem Q − W = ṁ·(h₂ − h₁) şekline indirgenir."
          ],
          example: {
            problem: "Bir egzoz gazı ekonomizerine 2 kg/s egzoz gazı 350°C'de girer ve 200°C'de çıkar. Egzoz gazının cp = 1.1 kJ/kg·K ise ekonomizerin ısı gücü nedir?",
            steps: [
              "Q = ṁ · cp · (T₁ − T₂)",
              "Q = 2 × 1.1 × (350 − 200)",
              "Q = 2 × 1.1 × 150 = 330 kW"
            ],
            result: "Ekonomizer 330 kW ısı gücü sağlar."
          }
        }
      ],
      keyPoints: [
        "Model seçimi (kapalı/açık) doğru enerji dengesi için kritiktir.",
        "Açık sistemlerde entalpi farkı esas alınır.",
        "Çoğu gemi ekipmanı sabit akışlı açık sistem olarak modellenir."
      ]
    },
    "İkinci yasa: Kelvin–Planck ve Clausius ifadeleri": {
      title: "İkinci Yasa: Kelvin–Planck ve Clausius İfadeleri",
      introduction: "Birinci yasa enerji miktarının korunumunu garanti eder, ancak süreçlerin hangi yönde gerçekleşeceğini söylemez. İkinci yasa, doğal süreçlerin yönünü ve enerji dönüşümlerindeki sınırlamaları ortaya koyar.",
      sections: [
        {
          heading: "Kelvin–Planck İfadesi",
          paragraphs: [
            "Tek bir ısı kaynağından ısı alarak tamamen işe dönüştüren bir çevrimsel makine yapmak imkânsızdır. Başka bir deyişle, her ısı makinesinin mutlaka bir düşük sıcaklık kaynağına ısı vermesi gerekir.",
            "Bu ifade, hiçbir ısı makinesinin %100 termik verime ulaşamayacağını belirtir. Dizel motorlar, buhar türbinleri ve gaz türbinleri dahil tüm ısı makineleri bu sınırlamaya tabidir."
          ]
        },
        {
          heading: "Clausius İfadesi",
          paragraphs: [
            "Dışarıdan iş verilmeden, düşük sıcaklıktaki bir kaynaktan yüksek sıcaklıktaki bir kaynağa sürekli ısı aktaran bir makine yapmak imkânsızdır.",
            "Bu ifade soğutma makineleri ve ısı pompaları için temel sınırlamayı belirtir: soğutucu veya klima kompresörüne mutlaka dışarıdan enerji (elektrik) verilmelidir."
          ]
        },
        {
          heading: "İki İfadenin Eşdeğerliği",
          paragraphs: [
            "Kelvin–Planck ve Clausius ifadeleri birbirinin eşdeğeridir. Birinin ihlal edildiğini varsaymak, diğerinin de ihlal edildiği sonucuna götürür. Her iki ifade de entropinin doğal süreçlerde artması gerektiği gerçeğiyle doğrudan ilişkilidir."
          ]
        }
      ],
      keyPoints: [
        "Hiçbir ısı makinesi %100 verimle çalışamaz (Kelvin–Planck).",
        "Soğutma işlemi için dışarıdan enerji gereklidir (Clausius).",
        "İki ifade birbirine eşdeğerdir."
      ]
    },
    "Entropi kavramı ve hesabı": {
      title: "Entropi Kavramı ve Hesabı",
      introduction: "Entropi, termodinamik bir sistemin düzensizlik derecesini ölçen hal büyüklüğüdür. İkinci yasanın matematiksel ifadesini sağlar.",
      sections: [
        {
          heading: "Entropi Tanımı",
          paragraphs: [
            "Entropi (S), bir tersinir süreçte sisteme verilen ısının mutlak sıcaklığa oranının integrali olarak tanımlanır. Birim kütleye düşen entropi, özgül entropi (s) olarak gösterilir ve kJ/kg·K birimindedir."
          ],
          formula: {
            expression: "dS = δQ_rev / T",
            variables: [
              "dS: Entropi değişimi (kJ/K)",
              "δQ_rev: Tersinir ısı transferi (kJ)",
              "T: Mutlak sıcaklık (K)"
            ]
          }
        },
        {
          heading: "İdeal Gaz İçin Entropi Değişimi",
          paragraphs: [
            "İdeal gaz kabulüyle iki hal arasındaki entropi değişimi sıcaklık ve hacim veya sıcaklık ve basınç cinsinden ifade edilir."
          ],
          formula: {
            expression: "Δs = cv · ln(T₂/T₁) + R · ln(v₂/v₁)  veya  Δs = cp · ln(T₂/T₁) − R · ln(P₂/P₁)",
            variables: []
          },
          example: {
            problem: "1 kg hava 300 K, 1 bar'dan 600 K, 4 bar'a sıkıştırılmaktadır. Entropi değişimini bulunuz. (cp = 1.005 kJ/kg·K, R = 0.287 kJ/kg·K)",
            steps: [
              "Δs = cp · ln(T₂/T₁) − R · ln(P₂/P₁)",
              "Δs = 1.005 · ln(600/300) − 0.287 · ln(4/1)",
              "Δs = 1.005 · 0.6931 − 0.287 · 1.3863",
              "Δs = 0.6966 − 0.3979 = 0.2987 kJ/kg·K"
            ],
            result: "Entropi değişimi +0.299 kJ/kg·K'dır (entropi artmıştır)."
          }
        }
      ],
      keyPoints: [
        "Yalıtılmış bir sistemde entropi asla azalmaz.",
        "Tersinir süreçlerde entropi değişimi sıfırdır.",
        "Gerçek süreçler tersinmez olduğundan entropi daima artar."
      ]
    },
    "Tersinir ve tersinmez süreçler": {
      title: "Tersinir ve Tersinmez Süreçler",
      introduction: "Tersinirlik kavramı, termodinamik süreçlerin ideallik derecesini değerlendirmek için kullanılır. Gerçek gemi makinelerindeki süreçler her zaman tersinmez olup, tersinir modeller karşılaştırma için referans oluşturur.",
      sections: [
        {
          heading: "Tersinir Süreç",
          paragraphs: [
            "Tersinir süreç, sistem ve çevre birlikte başlangıç durumuna geri döndürülebilen ideal süreçtir. Bu süreçte sürtünme, türbülans, karışma ve sonlu sıcaklık farkıyla ısı transferi gibi tersinmezlik kaynakları yoktur.",
            "Tersinir süreçler doğada mevcut değildir, ancak ideal performans sınırlarını belirlemek için kullanılır."
          ]
        },
        {
          heading: "Tersinmezlik Kaynakları",
          paragraphs: [
            "Gemi makine dairesinde karşılaşılan başlıca tersinmezlik kaynakları: sürtünme (yatak, piston-silindir), sonlu sıcaklık farkıyla ısı transferi (eşanjörler), karışma (yakıt-hava), kısılma (valfler) ve elektrik direncidir."
          ],
          bulletPoints: [
            "Sürtünme: Mekanik enerjiyi ısıya dönüştürür, geri kazanılamaz.",
            "Sonlu ΔT ile ısı transferi: Sıcaklık farkı arttıkça tersinmezlik artar.",
            "Kısılma: Valf veya orifiste basınç düşüşü; entalpi sabit kalır ancak entropi artar.",
            "Karışma: Farklı sıcaklık veya konsantrasyondaki akışkanların karışması."
          ]
        }
      ],
      keyPoints: [
        "Tüm gerçek süreçler tersinmezdir.",
        "Tersinir süreçler ideal referans noktası olarak kullanılır.",
        "Tersinmezlik arttıkça verim düşer, entropi üretimi artar."
      ]
    },
    "Exerji ve anergy kavramları": {
      title: "Exerji ve Anergy Kavramları",
      introduction: "Exerji, bir sistemin çevresiyle dengeye gelene kadar üretebileceği maksimum faydalı iş miktarıdır. Anergy ise işe dönüştürülemeyen enerji bileşenidir.",
      sections: [
        {
          heading: "Exerji Tanımı",
          paragraphs: [
            "Exerji (veya kullanılabilirlik), termodinamik bir sistemin çevre koşullarına (T₀, P₀) tersinir yollarla ulaşana kadar üretebileceği maksimum iştir. Çevreyle denge durumuna ulaşmış bir sistemin exerjisi sıfırdır.",
            "Enerji korunur ancak exerji korunmaz; her gerçek süreçte exerji yıkımı (destruction) oluşur."
          ],
          formula: {
            expression: "Ex = (H − H₀) − T₀(S − S₀)",
            variables: [
              "Ex: Akış exerjisi (kJ)",
              "H, S: Sistemin entalpi ve entropisi",
              "H₀, S₀: Çevre koşullarındaki değerler",
              "T₀: Çevre sıcaklığı (K)"
            ]
          }
        },
        {
          heading: "Gemi Makinelerinde Exerji Analizi",
          paragraphs: [
            "Egzoz gazının yüksek sıcaklığı önemli bir exerji kaynağıdır. Ekonomizer veya WHRS ile bu exerji kısmen geri kazanılır. Denize atılan soğutma suyundaki ısı ise düşük sıcaklık farkı nedeniyle büyük oranda anerjiye karşılık gelir.",
            "Exerji analizi, kayıpların nerede oluştuğunu belirleyerek enerji verimliliği iyileştirmelerinin doğru noktaya yönlendirilmesini sağlar."
          ]
        }
      ],
      keyPoints: [
        "Exerji işe dönüştürülebilir enerji, anergy dönüştürülemeyen enerjidir.",
        "Her gerçek süreçte exerji yıkımı oluşur.",
        "Egzoz gazı exerjisi WHRS ile geri kazanılabilir."
      ]
    },
    "İdeal gaz denklemi (PV = mRT)": {
      title: "İdeal Gaz Denklemi (PV = mRT)",
      introduction: "İdeal gaz denklemi, gaz halindeki maddelerin basınç, hacim, sıcaklık ve kütle arasındaki ilişkiyi tanımlayan temel denklemdir.",
      sections: [
        {
          heading: "Denklem ve Bileşenleri",
          paragraphs: [
            "İdeal gaz denklemi PV = mRT veya Pv = RT şeklinde yazılır. Burada P mutlak basınç, V toplam hacim, m kütle, R özgül gaz sabiti ve T mutlak sıcaklıktır."
          ],
          formula: {
            expression: "PV = mRT",
            variables: [
              "P: Mutlak basınç (kPa)",
              "V: Hacim (m³)",
              "m: Kütle (kg)",
              "R: Özgül gaz sabiti (hava için 0.287 kJ/kg·K)",
              "T: Mutlak sıcaklık (K)"
            ]
          },
          example: {
            problem: "30 bar mutlak basınçta, 500°C sıcaklıkta 0.5 m³ hacimli bir hava tankındaki hava kütlesini bulunuz.",
            steps: [
              "P = 30 bar = 3000 kPa, T = 500 + 273 = 773 K",
              "m = PV / RT = (3000 × 0.5) / (0.287 × 773)",
              "m = 1500 / 221.75 = 6.765 kg"
            ],
            result: "Tanktaki hava kütlesi 6.77 kg'dır."
          }
        },
        {
          heading: "İdeal Gaz Kabulünün Sınırları",
          paragraphs: [
            "İdeal gaz denklemi, düşük basınç ve yüksek sıcaklık koşullarında gerçek gazlara iyi bir yaklaşım sunar. Yüksek basınç veya düşük sıcaklıkta (faz değişimine yakın) sapma artar.",
            "Gemi motorlarında çalışma gazı genellikle yüksek sıcaklıkta olduğundan ideal gaz kabulü mühendislik hesaplarında yeterli doğruluğu sağlar."
          ]
        }
      ],
      keyPoints: [
        "P ve T her zaman mutlak değerlerle kullanılmalıdır.",
        "R değeri gaza özeldir; hava için 0.287 kJ/kg·K.",
        "Yüksek basınçlarda Van der Waals denklemi daha doğru sonuç verir."
      ]
    },
    "Carnot çevrimi ve teorik verim": {
      title: "Carnot Çevrimi ve Teorik Verim",
      introduction: "Carnot çevrimi, belirli iki sıcaklık kaynağı arasında çalışan ısı makineleri için ulaşılabilecek maksimum verimi tanımlar.",
      sections: [
        {
          heading: "Carnot Çevrimi Süreçleri",
          paragraphs: [
            "Carnot çevrimi dört tersinir süreçten oluşur: (1) İzotermik genleşme – yüksek sıcaklık kaynağından ısı alınır; (2) Adyabatik genleşme – sıcaklık düşer; (3) İzotermik sıkıştırma – düşük sıcaklık kaynağına ısı verilir; (4) Adyabatik sıkıştırma – sıcaklık yükselir."
          ],
          diagram: { src: "/diagrams/machine/carnot-cevrimi.svg", alt: "Carnot Çevrimi T-S Diyagramı", caption: "Şekil: Carnot çevrimi T-S diyagramında dört tersinir süreç" }
        },
        {
          heading: "Carnot Verimi",
          paragraphs: [
            "Carnot verimi yalnızca iki kaynak sıcaklığına bağlıdır ve hiçbir gerçek makine bu verimi aşamaz."
          ],
          formula: {
            expression: "η_Carnot = 1 − T_L / T_H",
            variables: [
              "η_Carnot: Carnot verimi",
              "T_L: Düşük sıcaklık kaynağı (K)",
              "T_H: Yüksek sıcaklık kaynağı (K)"
            ]
          },
          example: {
            problem: "Bir deniz dizel motorunda yanma sıcaklığı 1800 K, egzoz sıcaklığı 600 K ise maksimum teorik verim nedir?",
            steps: [
              "η_Carnot = 1 − T_L / T_H",
              "η_Carnot = 1 − 600 / 1800 = 1 − 0.333 = 0.667"
            ],
            result: "Maksimum teorik verim %66.7'dir. Gerçek verim sürtünme ve diğer kayıplar nedeniyle bunun altındadır."
          }
        }
      ],
      keyPoints: [
        "Carnot verimi aşılamaz; gerçek verim her zaman altındadır.",
        "T_H arttıkça veya T_L azaldıkça verim artar.",
        "Deniz motorlarının gerçek verimi genellikle %45-55 aralığındadır."
      ]
    },
    "Diesel çevrimi": {
      title: "Diesel Çevrimi",
      introduction: "Diesel çevrimi, sıkıştırma ile ateşlemeli motorların termodinamik modelidir. Sabit basınçta ısı eklenmesi ile karakterize edilir.",
      sections: [
        {
          heading: "Çevrim Süreçleri",
          paragraphs: [
            "Diesel çevrimi dört süreçten oluşur: (1-2) Adyabatik sıkıştırma; (2-3) Sabit basınçta ısı eklenmesi (yakıt enjeksiyonu ve yanma); (3-4) Adyabatik genleşme; (4-1) Sabit hacimde ısı atımı."
          ]
        },
        {
          heading: "Verim Formülü",
          paragraphs: [
            "Diesel çevrimi verimi, sıkıştırma oranı (r) ve kesme oranına (ρ) bağlıdır."
          ],
          formula: {
            expression: "η = 1 − [1/(r^(γ−1))] × [(ρ^γ − 1) / (γ(ρ − 1))]",
            variables: [
              "r: Sıkıştırma oranı = V₁/V₂",
              "ρ: Kesme oranı (cut-off ratio) = V₃/V₂",
              "γ: Özgül ısı oranı (≈ 1.4)"
            ]
          },
          example: {
            problem: "Sıkıştırma oranı r = 18, kesme oranı ρ = 2.5, γ = 1.4 olan bir diesel çevrimin termik verimini hesaplayınız.",
            steps: [
              "r^(γ−1) = 18^0.4 = 3.178",
              "ρ^γ = 2.5^1.4 = 3.414",
              "η = 1 − [1/3.178] × [(3.414 − 1) / (1.4 × (2.5 − 1))]",
              "η = 1 − 0.3147 × [2.414 / 2.1]",
              "η = 1 − 0.3147 × 1.1495 = 1 − 0.3618 = 0.638"
            ],
            result: "Termik verim %63.8'dir."
          }
        },
        {
          heading: "Gerçek Diesel Motor ile Farklar",
          paragraphs: [
            "Gerçek motorda yanma sabit basınçta gerçekleşmez, ısı kayıpları vardır, gaz özellikleri sıcaklıkla değişir ve sürtünme kayıpları mevcuttur. Bu nedenlerle gerçek verim ideal çevrim veriminin %60-70'i kadardır."
          ]
        }
      ],
      keyPoints: [
        "Sıkıştırma oranı arttıkça verim artar.",
        "Kesme oranı arttıkça verim düşer.",
        "Deniz dizel motorlarının sıkıştırma oranı genellikle 12-20 arasındadır."
      ]
    },
    "Fourier iletim yasası": {
      title: "Fourier İletim Yasası",
      introduction: "Fourier yasası, katı cisimlerde ısı iletiminin temel denklemini tanımlar. Gemi teknesinden, motor silindir duvarlarından ve boru yüzeylerinden gerçekleşen ısı transferi bu yasa ile hesaplanır.",
      sections: [
        {
          heading: "Yasa İfadesi",
          paragraphs: [
            "Fourier yasasına göre birim zamanda iletilen ısı miktarı, sıcaklık gradyanı ve iletim alanıyla doğru orantılı, malzemenin ısıl iletkenliğine bağlıdır."
          ],
          formula: {
            expression: "Q̇ = −k · A · (dT/dx)",
            variables: [
              "Q̇: Isı transfer hızı (W)",
              "k: Isıl iletkenlik katsayısı (W/m·K)",
              "A: İletim alanı (m²)",
              "dT/dx: Sıcaklık gradyanı (K/m)"
            ]
          },
          example: {
            problem: "Bir çelik silindir duvarı 25 mm kalınlığında, iç yüzey 400°C, dış yüzey 150°C'dir. Duvar alanı 0.5 m², k = 45 W/m·K ise ısı transfer hızını bulunuz.",
            steps: [
              "Q̇ = k · A · ΔT / L",
              "Q̇ = 45 × 0.5 × (400 − 150) / 0.025",
              "Q̇ = 45 × 0.5 × 250 / 0.025 = 225000 W"
            ],
            result: "Silindir duvarından geçen ısı akısı 225 kW'tır."
          }
        },
        {
          heading: "Isıl İletkenlik Katsayıları",
          paragraphs: [
            "Malzemenin ısıl iletkenliği, ısı transfer hesaplarının doğruluğunu belirleyen kritik parametredir."
          ],
          table: {
            headers: ["Malzeme", "k (W/m·K)"],
            rows: [
              ["Bakır", "385"],
              ["Çelik", "45-50"],
              ["Paslanmaz çelik", "15-20"],
              ["Asbest (eski yalıtım)", "0.15"],
              ["Taş yünü", "0.04"],
              ["Hava (durgun)", "0.026"]
            ]
          }
        }
      ],
      keyPoints: [
        "Isı akısı sıcaklık farkıyla doğru, kalınlıkla ters orantılıdır.",
        "Metaller iyi iletken, gazlar ve yalıtım malzemeleri kötü iletkendir.",
        "Fouling (kirlenme) katmanları ısıl direnci artırır ve verim düşürür."
      ]
    },
    "LMTD (logaritmik ortalama sıcaklık farkı)": {
      title: "LMTD (Logaritmik Ortalama Sıcaklık Farkı)",
      introduction: "LMTD, ısı eşanjörlerinin performans hesaplarında kullanılan ortalama sıcaklık farkı yöntemidir. Gemi ısı eşanjörlerinin boyutlandırma ve performans analizinde temel parametredir.",
      sections: [
        {
          heading: "LMTD Formülü",
          paragraphs: [
            "Ters akış veya paralel akış düzenlemesindeki bir eşanjörde giriş ve çıkış sıcaklık farklarından LMTD hesaplanır."
          ],
          formula: {
            expression: "LMTD = (ΔT₁ − ΔT₂) / ln(ΔT₁ / ΔT₂)",
            variables: [
              "ΔT₁: Eşanjör bir ucundaki sıcaklık farkı",
              "ΔT₂: Eşanjör diğer ucundaki sıcaklık farkı"
            ]
          },
          example: {
            problem: "Ters akışlı bir yağ soğutucusunda: yağ girişi 75°C, çıkışı 45°C; soğutma suyu girişi 30°C, çıkışı 40°C. LMTD'yi hesaplayınız.",
            steps: [
              "Ters akışta: ΔT₁ = T_yağ,giriş − T_su,çıkış = 75 − 40 = 35°C",
              "ΔT₂ = T_yağ,çıkış − T_su,giriş = 45 − 30 = 15°C",
              "LMTD = (35 − 15) / ln(35/15) = 20 / ln(2.333) = 20 / 0.847 = 23.6°C"
            ],
            result: "LMTD = 23.6°C."
          }
        },
        {
          heading: "Isı Eşanjörü Temel Denklemi",
          paragraphs: [
            "Eşanjörün ısı transfer kapasitesi LMTD kullanılarak hesaplanır."
          ],
          formula: {
            expression: "Q = U · A · LMTD",
            variables: [
              "Q: Isı transfer hızı (W)",
              "U: Toplam ısı geçiş katsayısı (W/m²·K)",
              "A: Isı transfer alanı (m²)"
            ]
          }
        }
      ],
      keyPoints: [
        "Ters akış düzenlemesi paralel akışa göre daha yüksek LMTD verir.",
        "LMTD aritmetik ortalamadan küçüktür; aritmetik ortalama kullanmak hatalı sonuç verir.",
        "Fouling, U değerini düşürerek gerekli alanı artırır."
      ]
    },
    // Remaining thermodynamics sub-topics with fallback
    "İzotermik süreç": { title: "İzotermik Süreç", introduction: "İzotermik süreç, sıcaklığın sabit kaldığı termodinamik hal değişimidir. İdeal gaz için PV = sabit bağıntısı geçerlidir.", sections: [{ heading: "Tanım ve Özellikler", paragraphs: ["İzotermik süreçte sıcaklık sabit olduğundan ideal gaz için iç enerji değişimi sıfırdır. Birinci yasa gereği sisteme verilen ısının tamamı iş olarak çevreye aktarılır: Q = W.", "Boyle yasası (PV = sabit) izotermik sürecin basınç-hacim ilişkisini verir."], formula: { expression: "W = P₁V₁ · ln(V₂/V₁) = mRT · ln(V₂/V₁)", variables: ["W: Yapılan iş (kJ)", "P₁V₁: Başlangıç basınç-hacim çarpımı"] } }, { heading: "Sayısal Örnek", paragraphs: [], example: { problem: "1 kg hava 300 K'de izotermik olarak 1 bar'dan 5 bar'a sıkıştırılıyor. Yapılan işi bulunuz.", steps: ["W = mRT · ln(P₁/P₂) = 1 × 0.287 × 300 × ln(1/5)", "W = 86.1 × (−1.609) = −138.6 kJ"], result: "Sıkıştırma işi 138.6 kJ'dür (negatif işaret sisteme yapılan iş)." } }], keyPoints: ["İzotermik süreçte ΔU = 0, Q = W.", "PV diyagramında hiperbol şeklinde görünür.", "Pratik yaklaşım: çok yavaş ve iyi soğutulan süreçler."] },
    "İzobarik süreç": { title: "İzobarik Süreç", introduction: "İzobarik süreç, basıncın sabit kaldığı hal değişimidir. Kazanlarda buhar üretimi ve dizel motorlarda yakıt yanması (ideal modelde) sabit basınç süreçleridir.", sections: [{ heading: "Tanım ve İş Hesabı", paragraphs: ["Sabit basınçta yapılan iş W = P(V₂ − V₁) = PΔV formülüyle hesaplanır. Verilen ısı ise entalpi değişimine eşittir: Q = ΔH = m·cp·ΔT."], formula: { expression: "W = P · ΔV   ve   Q = m · cp · ΔT", variables: [] }, example: { problem: "2 kg hava sabit 3 bar basınçta 400 K'den 800 K'ye ısıtılıyor. Yapılan iş ve verilen ısıyı bulunuz (cp = 1.005, R = 0.287 kJ/kg·K).", steps: ["Q = m·cp·ΔT = 2 × 1.005 × 400 = 804 kJ", "W = mRΔT = 2 × 0.287 × 400 = 229.6 kJ", "ΔU = Q − W = 804 − 229.6 = 574.4 kJ"], result: "Verilen ısı 804 kJ, yapılan iş 229.6 kJ, iç enerji artışı 574.4 kJ." } }], keyPoints: ["PV diyagramında yatay çizgi.", "Verilen ısı = entalpi değişimi.", "Diesel çevriminde ısı ekleme süreci."] },
    "İzokorik süreç": { title: "İzokorik Süreç", introduction: "İzokorik (izometrik) süreç, hacmin sabit kaldığı hal değişimidir. Kapalı bir kapta gerçekleşen ısıtma veya soğutma bu tür süreçtir.", sections: [{ heading: "Özellikler", paragraphs: ["Sabit hacimde iş yapılamaz (W = 0) çünkü iş = P·ΔV ve ΔV = 0'dır. Verilen ısının tamamı iç enerji değişimine dönüşür: Q = ΔU = m·cv·ΔT.", "Otto çevriminde ısı ekleme ve atma süreçleri izokorik olarak modellenir."], formula: { expression: "Q = ΔU = m · cv · ΔT  (W = 0)", variables: [] }, example: { problem: "Sabit hacimli bir kapta 0.5 kg hava 300 K'den 900 K'ye ısıtılıyor. cv = 0.718 kJ/kg·K ise gerekli ısıyı bulunuz.", steps: ["Q = m·cv·ΔT = 0.5 × 0.718 × (900 − 300)", "Q = 0.5 × 0.718 × 600 = 215.4 kJ"], result: "Gerekli ısı 215.4 kJ'dür." } }], keyPoints: ["PV diyagramında düşey çizgi.", "Yapılan iş sıfır.", "Verilen ısı = iç enerji değişimi."] },
    "Adyabatik (izentropik) süreç": { title: "Adyabatik (İzentropik) Süreç", introduction: "Adyabatik süreçte sistem ve çevre arasında ısı transferi yoktur (Q = 0). Tersinir adyabatik süreç izentropik olarak da adlandırılır.", sections: [{ heading: "Bağıntılar", paragraphs: ["Adyabatik süreçte Q = 0 olduğundan birinci yasa W = −ΔU şeklini alır. İdeal gaz için PV^γ = sabit, TV^(γ−1) = sabit bağıntıları geçerlidir."], formula: { expression: "T₂/T₁ = (V₁/V₂)^(γ−1) = (P₂/P₁)^((γ−1)/γ)", variables: ["γ: Özgül ısı oranı (hava için 1.4)"] }, example: { problem: "Bir turboşarj kompresörüne 25°C, 1 bar'da hava girmektedir. Basınç oranı 3.5, γ = 1.4 ise çıkış sıcaklığını bulunuz.", steps: ["T₂ = T₁ × (P₂/P₁)^((γ−1)/γ)", "T₂ = 298 × (3.5)^(0.4/1.4) = 298 × (3.5)^0.2857", "3.5^0.2857 = 1.426", "T₂ = 298 × 1.426 = 425 K = 152°C"], result: "Kompresör çıkış sıcaklığı idealde 152°C'dir." } }], keyPoints: ["Q = 0, W = −ΔU.", "PV^γ = sabit (izentropik).", "Kompresör ve türbin hesaplarının temelini oluşturur."] },
    "Politropik süreç ve n üssü": { title: "Politropik Süreç ve n Üssü", introduction: "Politropik süreç, PV^n = sabit bağıntısıyla tanımlanan genel hal değişimidir. n üssünün değerine göre tüm temel süreçler politropik sürecin özel halleridir.", sections: [{ heading: "n Üssüne Göre Süreç Tipleri", paragraphs: ["Politropik süreç genel bir modeldir ve n değerine göre farklı süreçleri kapsar."], table: { headers: ["n değeri", "Süreç tipi"], rows: [["n = 0", "İzobarik (sabit basınç)"], ["n = 1", "İzotermik (sabit sıcaklık)"], ["n = γ", "Adyabatik (izentropik)"], ["n = ∞", "İzokorik (sabit hacim)"], ["1 < n < γ", "Gerçek sıkıştırma/genleşme"]] }, formula: { expression: "PV^n = sabit  →  T₂/T₁ = (P₂/P₁)^((n−1)/n)", variables: ["n: Politropik üs (gerçek süreçlerde genellikle 1.2-1.35)"] } }], keyPoints: ["Gerçek motor süreçleri politropik modellenebilir.", "n değeri deneysel olarak belirlenir.", "n = 1.3 değeri motor sıkıştırması için yaygın kabuldür."] },
    "Otto çevrimi (benzinli motor)": { title: "Otto Çevrimi", introduction: "Otto çevrimi, kıvılcım ile ateşlemeli motorların ideal termodinamik modelidir. Sabit hacimde ısı eklenmesi ile karakterize edilir.", sections: [{ heading: "Çevrim ve Verim", paragraphs: ["Otto çevrimi: (1-2) Adyabatik sıkıştırma, (2-3) Sabit hacimde ısı ekleme, (3-4) Adyabatik genleşme, (4-1) Sabit hacimde ısı atımı. Verim yalnızca sıkıştırma oranına bağlıdır."], formula: { expression: "η_Otto = 1 − 1/r^(γ−1)", variables: ["r: Sıkıştırma oranı = V₁/V₂"] }, example: { problem: "Sıkıştırma oranı r = 10, γ = 1.4 olan Otto çevriminin verimini bulunuz.", steps: ["η = 1 − 1/(10)^0.4 = 1 − 1/2.512 = 1 − 0.398 = 0.602"], result: "Termik verim %60.2'dir." } }], keyPoints: ["Sıkıştırma oranı arttıkça verim artar.", "Gerçek benzinli motorlarda knock sınırı r'yi sınırlar.", "Deniz motorlarında Otto çevrimi LNG dual-fuel motorlarda kullanılır."] },
    "Sabathe (ikili) çevrimi": { title: "Sabathe (İkili) Çevrimi", introduction: "Sabathe çevrimi, gerçek dizel motoruna en yakın ideal çevrimdir. Yanma hem sabit hacimde hem sabit basınçta gerçekleşir.", sections: [{ heading: "Çevrim Yapısı", paragraphs: ["Sabathe çevrimi: (1-2) Adyabatik sıkıştırma, (2-3) Sabit hacimde kısmi yanma, (3-4) Sabit basınçta yanma devamı, (4-5) Adyabatik genleşme, (5-1) Sabit hacimde ısı atımı.", "Gerçek dizel motorlarda yakıt enjeksiyonunun başlangıcında hızlı yanma (sabit hacim benzeri) ve ardından kontrollü yanma (sabit basınç benzeri) gerçekleşir."] }], keyPoints: ["Gerçek dizel motoruna en yakın ideal çevrimdir.", "Otto ve diesel çevrimlerinin kombinasyonudur.", "Düşük ve orta devirli deniz dizel motorlarında geçerlidir."] },
    "Rankine çevrimi (buhar türbini)": { title: "Rankine Çevrimi (Buhar Türbini)", introduction: "Rankine çevrimi, buhar güç santrallerinin ve gemi buhar türbinli tahrik sistemlerinin termodinamik modelidir.", sections: [{ heading: "Çevrim Süreçleri", paragraphs: ["(1-2) Pompa ile suyun basınçlanması, (2-3) Kazanda ısıtma ve buharlaştırma, (3-4) Türbinde genleşme ve iş üretimi, (4-1) Kondenserde yoğuşma."], formula: { expression: "η_Rankine = (h₃ − h₄) − (h₂ − h₁) / (h₃ − h₂)", variables: ["h: Çevrimin her noktasındaki özgül entalpi (kJ/kg)"] } }, { heading: "Verim İyileştirme Yöntemleri", paragraphs: ["Kızgın buhar (superheat) kullanımı, tekrar ısıtma (reheat) ve rejeneratif besleme suyu ısıtma verime katkı sağlar. LNG taşıyıcılarda buhar türbini tahrik sistemleri hâlâ kullanılmaktadır."] }], keyPoints: ["Buhar türbin gemileri için temel çevrimdir.", "Kızgın buhar verimi artırır ve türbin kanatlarında erozyon azaltır.", "Modern LNG gemilerinde hâlâ kullanılmaktadır."] },
    "Brayton çevrimi (gaz türbini)": { title: "Brayton Çevrimi (Gaz Türbini)", introduction: "Brayton çevrimi, gaz türbinlerinin termodinamik modelidir. Gemi gaz türbinleri ve COGAS/CODOG tahrik sistemleri bu çevrime dayanır.", sections: [{ heading: "Çevrim ve Verim", paragraphs: ["Brayton çevrimi: (1-2) Kompresörde adyabatik sıkıştırma, (2-3) Yanma odasında sabit basınçta ısı ekleme, (3-4) Türbinde adyabatik genleşme, (4-1) Sabit basınçta ısı atımı (egzoz)."], formula: { expression: "η_Brayton = 1 − 1/(r_p)^((γ−1)/γ)", variables: ["r_p: Basınç oranı = P₂/P₁"] }, example: { problem: "Basınç oranı 15, γ = 1.4 olan bir gaz türbininin ideal verimini bulunuz.", steps: ["η = 1 − 1/(15)^(0.4/1.4) = 1 − 1/(15)^0.2857", "(15)^0.2857 = 2.168", "η = 1 − 0.461 = 0.539"], result: "İdeal Brayton verimi %53.9'dur." } }], keyPoints: ["Basınç oranı arttıkça verim artar.", "Gaz türbinleri hızlı savaş gemilerinde yaygındır.", "CODAG ve CODOG sistemlerinde dizel ile kombine kullanılır."] },
    "Ters çevrimler: soğutma ve ısı pompası": { title: "Ters Çevrimler: Soğutma ve Isı Pompası", introduction: "Ters çevrimler, düşük sıcaklıktan yüksek sıcaklığa ısı aktarmak için dışarıdan iş harcayan sistemlerdir. Gemi soğutma ve klima sistemleri bu prensiple çalışır.", sections: [{ heading: "COP Hesapları", paragraphs: ["Soğutma ve ısı pompası performansı COP (Coefficient of Performance) ile ölçülür."], formula: { expression: "COP_soğutma = Q_L / W = T_L / (T_H − T_L)    [Carnot]", variables: ["COP_ısı pompası = Q_H / W = T_H / (T_H − T_L)    [Carnot]"] }, example: { problem: "Bir provizyon soğutma sistemi −20°C'yi korumakta ve kondenser sıcaklığı 35°C'dir. Carnot COP'unu hesaplayınız.", steps: ["T_L = −20 + 273 = 253 K, T_H = 35 + 273 = 308 K", "COP = T_L / (T_H − T_L) = 253 / (308 − 253) = 253 / 55 = 4.6"], result: "İdeal COP = 4.6. Gerçek COP genellikle 1.5-2.5 arasındadır." } }], keyPoints: ["COP > 1 olabilir (verim ile karıştırılmamalıdır).", "Sıcaklık farkı azaldıkça COP artar.", "Gemi soğutma sistemlerinde gerçek COP 1.5-3.0 arasındadır."] },
    "Newton soğuma yasası (taşınım)": { title: "Newton Soğuma Yasası (Taşınım)", introduction: "Newton soğuma yasası, bir yüzey ile çevresindeki akışkan arasındaki konvektif ısı transferini tanımlar.", sections: [{ heading: "Yasa İfadesi", paragraphs: ["Konvektif ısı transferi, yüzey alanı, sıcaklık farkı ve taşınım katsayısına bağlıdır."], formula: { expression: "Q̇ = h · A · (T_yüzey − T_akışkan)", variables: ["h: Taşınım katsayısı (W/m²·K)", "A: Yüzey alanı (m²)"] }, example: { problem: "Silindir gömleği dış yüzeyi 180°C, soğutma suyu 80°C, h = 5000 W/m²·K, A = 0.3 m² ise ısı transferini bulunuz.", steps: ["Q̇ = h · A · ΔT = 5000 × 0.3 × (180 − 80)", "Q̇ = 5000 × 0.3 × 100 = 150000 W = 150 kW"], result: "Liner'dan soğutma suyuna 150 kW ısı geçer." } }], keyPoints: ["h değeri akışkan hızı, viskozite ve akış rejimine bağlıdır.", "Zorlanmış taşınımda h, doğal taşınıma göre çok daha yüksektir.", "Gemi soğutma sularında h ≈ 3000-8000 W/m²·K aralığındadır."] },
    "Çok katmanlı duvar ve silindirik iletim": { title: "Çok Katmanlı Duvar ve Silindirik İletim", introduction: "Gemi boru hatları ve silindir duvarları birden fazla katmandan oluşur. Her katman farklı ısıl direnç sunar.", sections: [{ heading: "Çok Katmanlı Düz Duvar", paragraphs: ["Seri ısıl direnç kavramı kullanılır: R_toplam = L₁/k₁A + L₂/k₂A + ... ve Q̇ = ΔT_toplam / R_toplam."], formula: { expression: "Q̇ = (T_iç − T_dış) / Σ(L_i / k_i·A)", variables: [] } }, { heading: "Silindirik Duvar (Boru)", paragraphs: ["Silindirik geometride alan değiştiğinden logaritmik ifade kullanılır."], formula: { expression: "Q̇ = 2πkL(T₁ − T₂) / ln(r₂/r₁)", variables: ["r₁, r₂: İç ve dış yarıçap (m)", "L: Boru uzunluğu (m)"] } }], keyPoints: ["Yalıtım katmanı ısıl direnci önemli ölçüde artırır.", "Silindirik iletimde logaritmik formül kullanılır.", "Fouling katmanı ek bir ısıl direnç oluşturur."] },
    "Doğal ve zorlanmış taşınım": { title: "Doğal ve Zorlanmış Taşınım", introduction: "Taşınımla ısı transferi, akışkanın hareket mekanizmasına göre doğal ve zorlanmış olarak sınıflandırılır.", sections: [{ heading: "Doğal Taşınım", paragraphs: ["Yoğunluk farkından kaynaklanan kaldırma kuvvetiyle oluşan akış sonucu gerçekleşir. Makine dairesi havalandırması ve kazan su sirkülasyonu buna örnektir. h değeri genellikle 5-25 W/m²·K aralığındadır."] }, { heading: "Zorlanmış Taşınım", paragraphs: ["Pompa, fan veya kompresör gibi dış bir kuvvetle oluşturulan akışla gerçekleşir. Gemi soğutma sistemleri, eşanjörler ve silindir soğutması zorlanmış taşınıma örnektir. h değeri 100-10000 W/m²·K aralığında olabilir."] }], keyPoints: ["Zorlanmış taşınım doğal taşınıma göre çok daha etkilidir.", "Re ve Nu sayıları taşınım katsayısı hesabında kullanılır.", "Gemi sistemlerinde genellikle zorlanmış taşınım tercih edilir."] },
    "Stefan–Boltzmann ışınım yasası": { title: "Stefan–Boltzmann Işınım Yasası", introduction: "Her cisim sıcaklığına bağlı olarak elektromanyetik dalga biçiminde enerji yayar. Bu enerji yayılımı ışınım olarak adlandırılır.", sections: [{ heading: "Yasa İfadesi", paragraphs: ["Bir kara cismin (ε = 1) birim alandan yaydığı toplam enerji, mutlak sıcaklığın dördüncü kuvvetiyle orantılıdır."], formula: { expression: "Q̇ = ε · σ · A · (T₁⁴ − T₂⁴)", variables: ["ε: Yayma katsayısı (0-1)", "σ: Stefan–Boltzmann sabiti = 5.67 × 10⁻⁸ W/m²·K⁴"] } }], keyPoints: ["Işınım vakumda da gerçekleşir, ortam gerektirmez.", "Yüksek sıcaklıklarda ışınım baskın ısı transfer mekanizması olur.", "Motor egzoz manifoldu ve kazanlarda ışınım önemlidir."] },
    "Toplam ısı geçiş katsayısı (U)": { title: "Toplam Isı Geçiş Katsayısı (U)", introduction: "U değeri, bir ısı eşanjöründe tüm ısıl dirençleri (iç taşınım, duvar iletimi, dış taşınım ve fouling) tek bir katsayıda birleştirir.", sections: [{ heading: "U Hesabı", paragraphs: ["Düz duvar için 1/U = 1/h_iç + L/k + 1/h_dış + R_fouling. Fouling direnci eşanjörün kullanım ömrüne ve temizlik aralıklarına bağlıdır."], formula: { expression: "1/U = 1/h₁ + Σ(L_i/k_i) + 1/h₂ + R_f", variables: ["h₁, h₂: İç ve dış taşınım katsayıları", "R_f: Fouling direnci (m²·K/W)"] } }], keyPoints: ["U değeri tüm dirençlerin toplamının tersidir.", "En yüksek direnç, darboğaz etkisi yaratır.", "Fouling, U'yu %20-50 oranında düşürebilir."] },
    "Paralel akış ve ters akış düzenlemeleri": { title: "Paralel ve Ters Akış Düzenlemeleri", introduction: "Isı eşanjörlerinde sıcak ve soğuk akışkanın akış yönüne göre iki temel düzenleme vardır.", sections: [{ heading: "Karşılaştırma", paragraphs: ["Ters akışta soğuk akışkan, sıcak akışkanın çıkış sıcaklığının üzerine çıkabilir; paralel akışta bu mümkün değildir. Bu nedenle ters akış daha yüksek etkinlik sağlar."], table: { headers: ["Özellik", "Paralel Akış", "Ters Akış"], rows: [["LMTD", "Daha düşük", "Daha yüksek"], ["T_soğuk,çıkış", "< T_sıcak,çıkış", "≤ T_sıcak,giriş"], ["Etkinlik", "Daha düşük", "Daha yüksek"], ["Kullanım", "Sınırlı", "Yaygın"]] } }], keyPoints: ["Ters akış daha az alan gerektirir.", "Gemi eşanjörlerinin çoğu ters akış düzenindedir.", "Çapraz akış, kompakt eşanjörlerde kullanılır."] },
    "Plakalı ısı eşanjörleri": { title: "Plakalı Isı Eşanjörleri", introduction: "Plakalı eşanjörler, oluklu metal plakaların üst üste dizilmesiyle oluşturulur. Gemi uygulamalarında kompakt boyut ve yüksek verim avantajı sağlar.", sections: [{ heading: "Yapı ve Avantajlar", paragraphs: ["Yüksek türbülanslı akış ve geniş ısı transfer alanı sayesinde U değeri kabuk-boru eşanjörlere göre 3-5 kat daha yüksektir. Plaka ekleme/çıkarma ile kapasite ayarlanabilir.", "Dezavantajı yüksek basınç ve sıcaklık sınırlamasıdır (genellikle < 25 bar, < 250°C)."] }], keyPoints: ["Kompakt boyut, yüksek U değeri.", "Sökülebilir plakalı tip bakım kolaylığı sağlar.", "Yağ soğutma, merkezi soğutma ve LT/HT devreleri için idealdir."] },
    "Kabuk–boru (shell & tube) eşanjörler": { title: "Kabuk–Boru Eşanjörler", introduction: "Shell & tube eşanjör, denizcilik endüstrisinde en yaygın kullanılan ısı eşanjör tipidir. Yüksek basınç ve sıcaklığa dayanıklıdır.", sections: [{ heading: "Yapı", paragraphs: ["Bir kabuk (shell) içine yerleştirilmiş boru demeti (tube bundle) üzerinden iki akışkan ayrı ayrı geçirilir. Baffle (şaşırtma) plakaları kabuk tarafında çapraz akış oluşturarak ısı transferini artırır.", "Buhar kondenserler, yağ soğutucular ve yakıt ısıtıcıları bu tipte üretilir."] }], keyPoints: ["Yüksek basınç ve sıcaklık uygulamaları için uygundur.", "Boru demeti temizlik ve muayene için çıkarılabilir.", "TEMA standartlarına göre sınıflandırılır."] },
    "Fouling ve temizlik etkileri": { title: "Fouling ve Temizlik Etkileri", introduction: "Fouling, ısı transfer yüzeylerinde biriken tortunun ısıl direnci artırması ve performansı düşürmesidir.", sections: [{ heading: "Fouling Tipleri", paragraphs: ["Deniz suyu tarafında biyolojik fouling (deniz canlıları) ve mineral çökelme, yağ tarafında karbon ve çamur birikimi, egzoz tarafında kurum ve asit yoğuşması fouling kaynağıdır."], table: { headers: ["Fouling Tipi", "R_f (m²·K/W)"], rows: [["Temiz deniz suyu", "0.00009"], ["Kirli deniz suyu", "0.0003"], ["Motor yağı", "0.0002"], ["Egzoz gazı", "0.002"]] } }], keyPoints: ["Fouling, U değerini önemli ölçüde düşürür.", "Periyodik temizlik enerji verimliliğini korur.", "Tasarımda fouling payı (%15-25) bırakılır."] },
    "Eşanjör verim hesapları": { title: "Eşanjör Verim Hesapları", introduction: "Eşanjör etkinliği (ε), gerçek ısı transferinin maksimum olası ısı transferine oranıdır.", sections: [{ heading: "NTU-Etkinlik Yöntemi", paragraphs: ["Q_max = C_min × (T_h,giriş − T_c,giriş) formülüyle tanımlanır. ε = Q_gerçek / Q_max.", "NTU = UA / C_min olarak hesaplanır. NTU arttıkça etkinlik artar ancak maliyet de artar."], formula: { expression: "ε = Q / Q_max = Q / [C_min × (T_h,in − T_c,in)]", variables: ["C_min: Minimum ısı kapasitesi akışı (kW/K)"] } }], keyPoints: ["ε = 1.0 değerine ulaşmak pratik olarak mümkün değildir.", "Gemi eşanjörlerinde ε genellikle 0.6-0.85 arasındadır.", "NTU yöntemi çıkış sıcaklıkları bilinmediğinde kullanılır."] },
    "Egzoz gazı ekonomizeri": { title: "Egzoz Gazı Ekonomizeri", introduction: "Ekonomizer, ana makine egzoz gazındaki ısıyı kullanarak kazan besleme suyunu ısıtan veya buhar üreten ısı geri kazanım cihazıdır.", sections: [{ heading: "Çalışma Prensibi", paragraphs: ["Egzoz gazı 200-350°C sıcaklıkta ekonomizer borularının üzerinden geçer ve suyu ısıtır. Bu sayede yardımcı kazanın yakıt tüketimi azalır.", "Seyir sırasında ana makine yükü yeterli olduğunda ekonomizer tek başına tüm buhar ihtiyacını karşılayabilir."] }], keyPoints: ["Sülfürik asit yoğuşmasını önlemek için gaz çıkış sıcaklığı > 160°C tutulmalıdır.", "Kurum yangını riski nedeniyle düzenli sus üfleme yapılmalıdır.", "WHRS sisteminin temel bileşenidir."] },
    "Atık ısı geri kazanım sistemi (WHRS)": { title: "Atık Isı Geri Kazanım Sistemi (WHRS)", introduction: "WHRS, egzoz gazı ve soğutma suyu atık ısısından ek güç veya buhar üreten entegre sistemdir.", sections: [{ heading: "Sistem Bileşenleri", paragraphs: ["Tipik bir WHRS: egzoz gazı ekonomizeri, güç türbini, buhar türbin jeneratörü ve/veya organik Rankine çevrimi (ORC) ünitesinden oluşabilir.", "Büyük konteyner gemilerinde WHRS, ana makine gücünün %8-11'i kadar ek elektrik üretebilir."] }], keyPoints: ["Yakıt tasarrufu %3-8 arasında olabilir.", "Yatırım maliyeti yüksek ancak geri dönüş süresi 3-5 yıldır.", "IMO enerji verimliliği hedeflerine katkı sağlar."] },
    "Buhar jeneratörü ve türbin entegrasyonu": { title: "Buhar Jeneratörü ve Türbin Entegrasyonu", introduction: "Gemi enerji sistemlerinde buhar jeneratörü (kazan) ve buhar türbini entegrasyonu, atık ısıdan elektrik üretimi sağlar.", sections: [{ heading: "Entegrasyon Yapısı", paragraphs: ["Egzoz gazı ekonomizerinde üretilen buhar, bir buhar türbin-jeneratör setine yönlendirilerek elektrik üretilir. Bu yapı özellikle büyük iki zamanlı düşük devirli motorlara sahip gemilerde yaygındır."] }], keyPoints: ["Seyir sırasında yardımcı dizel jeneratör ihtiyacını azaltır.", "Buhar basınç ve sıcaklığı türbin verimine doğrudan etki eder.", "Limanda atık ısı yetersiz olduğundan yardımcı kazan devreye girer."] },
    "Kojenerasyon uygulamaları": { title: "Kojenerasyon Uygulamaları", introduction: "Kojenerasyon, tek bir enerji kaynağından aynı anda hem elektrik hem ısı üretilmesidir.", sections: [{ heading: "Gemi Kojenerasyonu", paragraphs: ["Ana makine atık ısısından buhar üretimi ve bu buharın hem ısıtma hem elektrik üretimi için kullanılması kojenerasyon örneğidir. Toplam enerji kullanım verimi %80'in üzerine çıkabilir.", "Soğuk iklimlerde yakıt ısıtma, yaşam mahalli ısıtma ve tatlı su üretimi kojenerasyondan faydalanır."] }], keyPoints: ["Toplam verim %80-90'a ulaşabilir.", "Sadece elektrik üretiminde verim %30-50 arasında kalır.", "Enerji verimliliği düzenlemelerine uyum sağlar."] },
    "Enerji dönüşüm verimi ve kayıp analizi": { title: "Enerji Dönüşüm Verimi ve Kayıp Analizi", introduction: "Gemi enerji sistemlerinde yakıtın kimyasal enerjisinin faydalı işe dönüşüm zincirindeki her aşamada kayıplar oluşur.", sections: [{ heading: "Enerji Akışı ve Kayıplar", paragraphs: ["Tipik bir iki zamanlı deniz dizel motorunda yakıt enerjisinin yaklaşık %50'si şaft gücüne, %25'i egzoz gazına, %15'i soğutma suyuna, %5'i yağlama yağına ve %5'i ışınım ile diğer kayıplara gider."], table: { headers: ["Kayıp Kaynağı", "Oran (%)"], rows: [["Şaft gücü (faydalı)", "48-52"], ["Egzoz gazı", "23-27"], ["Soğutma suyu (HT+LT)", "12-18"], ["Yağlama yağı", "3-5"], ["Işınım ve diğer", "3-5"]] } }], keyPoints: ["En büyük kayıp egzoz gazındadır ve WHRS ile kısmen geri kazanılır.", "HT soğutma suyundan tatlı su üretimi mümkündür.", "Kayıp analizi enerji verimliliği iyileştirmelerine yön verir."] },
  },

  // ═══════════════════════════════════════════════════════════════
  // DENİZ DİZEL MAKİNELERİ
  // ═══════════════════════════════════════════════════════════════
  "diesel-engines": {
    "Dizel çevrimi ve sıkıştırma ile ateşleme": { title: "Dizel Çevrimi ve Sıkıştırma ile Ateşleme", introduction: "Dizel motorlarda yakıt-hava karışımı kıvılcım yerine sıkıştırma sonucu oluşan yüksek sıcaklıkla ateşlenir. Bu prensip Rudolf Diesel tarafından 1893'te patentlenmiştir.", sections: [{ heading: "Sıkıştırma ile Ateşleme Prensibi", paragraphs: ["Emme zamanında silindire yalnızca hava alınır. Sıkıştırma sonunda hava sıcaklığı 700-900°C'ye ulaşır ve bu sıcaklıkta enjekte edilen yakıt kendiliğinden tutuşur.", "Sıkıştırma oranı genellikle 12-20 arasındadır. Yüksek sıkıştırma oranı daha iyi ateşleme güvenilirliği sağlar."], diagram: { src: "/diagrams/machine/pv-diyagrami.svg", alt: "Dizel Çevrimi P-V Diyagramı", caption: "Şekil: Dizel çevrimi basınç-hacim diyagramı" } }], keyPoints: ["Dizel motorlarda bujiye gerek yoktur.", "Sıkıştırma oranı arttıkça termik verim artar.", "Deniz dizel motorları %45-55 termik verime ulaşır."] },
    "İki zamanlı motor çalışma prensibi": { title: "İki Zamanlı Motor Çalışma Prensibi", introduction: "İki zamanlı motorlarda çevrim, krank milinin bir tam dönüşünde (360°) tamamlanır. Büyük deniz ana motorlarının tamamına yakını iki zamanlıdır.", sections: [{ heading: "Çalışma Prensipleri", paragraphs: ["Piston aşağı giderken süpürme portları açılır ve taze hava silindire dolar; aynı zamanda egzoz supapı veya portları yoluyla yanmış gazlar atılır. Piston yukarı giderken sıkıştırma başlar, üst ölü noktaya yakın yakıt enjekte edilir.", "Supap mekanizması sadece egzoz supabıyla sınırlıdır (uniflow tipte). Süpürme havası turboşarj veya yardımcı üfleyicilerle sağlanır."], diagram: { src: "/diagrams/machine/iki-zamanli-dizel.svg", alt: "2 Zamanlı Dizel Motor Çalışma Prensibi", caption: "Şekil: İki zamanlı dizel motor çevrimi (360°)" } }, { heading: "Avantajlar ve Dezavantajlar", paragraphs: [], bulletPoints: ["Avantaj: Düşük devir, yüksek tork, yüksek verim, pervane ile direkt tahrik.", "Avantaj: Daha az hareketli parça (supap mekanizması basit).", "Dezavantaj: Daha büyük ve ağır yapı.", "Dezavantaj: Süpürme havası üretimi için ek enerji gerekir."] }], keyPoints: ["Krank milinin her dönüşünde bir güç zamanı oluşur.", "Büyük konteyner, tanker ve kuru yük gemilerinde tercih edilir.", "MAN B&W ve WinGD (eski Wärtsilä 2-zamanlı) üreticileri baskındır."] },
    "Dört zamanlı motor çalışma prensibi": { title: "Dört Zamanlı Motor Çalışma Prensibi", introduction: "Dört zamanlı motorlarda çevrim, krank milinin iki tam dönüşünde (720°) tamamlanır. Yardımcı dizel jeneratörler ve orta devirli ana motorlar bu tiptedir.", sections: [{ heading: "Dört Zaman", paragraphs: ["(1) Emme: Piston aşağı, emme supabı açık, taze hava silindire dolar. (2) Sıkıştırma: Her iki supap kapalı, hava sıkıştırılır. (3) Yanma-Genleşme: Yakıt enjekte edilir, yanma oluşur, piston güç üretir. (4) Egzoz: Egzoz supabı açılır, yanmış gazlar atılır."], diagram: { src: "/diagrams/machine/dort-zamanli-dizel.svg", alt: "4 Zamanlı Dizel Motor Çevrimi", caption: "Şekil: Dört zamanlı dizel motor çevrimi (720°)" } }, { heading: "Karşılaştırma", paragraphs: [], table: { headers: ["Özellik", "2 Zamanlı", "4 Zamanlı"], rows: [["Devir", "80-120 rpm", "400-1000 rpm"], ["Verim", "%48-52", "%42-48"], ["Tahrik", "Direkt", "Redüktörlü"], ["Ağırlık", "Ağır", "Daha hafif"], ["Kullanım", "Ana motor", "Jeneratör/Orta hızlı ana motor"]] } }], keyPoints: ["Her iki krank dönüşünde bir güç zamanı.", "Yardımcı jeneratörlerin hemen hepsi dört zamanlıdır.", "Wärtsilä, MaK, Caterpillar başlıca üreticilerdir."] },
    "Düşük, orta ve yüksek devirli motorlar": { title: "Düşük, Orta ve Yüksek Devirli Motorlar", introduction: "Deniz dizel motorları devir hızına göre üç kategoride sınıflandırılır.", sections: [{ heading: "Sınıflandırma", paragraphs: [], table: { headers: ["Kategori", "Devir (rpm)", "Tip", "Kullanım"], rows: [["Düşük devirli", "80-120", "2 zamanlı, crosshead", "Ana motor (direkt tahrik)"], ["Orta devirli", "400-1000", "4 zamanlı, trunk piston", "Ana motor (redüktörlü) / Jeneratör"], ["Yüksek devirli", "> 1000", "4 zamanlı", "Küçük jeneratör, bot motoru"]] } }], keyPoints: ["Düşük devirli motorlar en yüksek verime sahiptir.", "Orta devirli motorlar RoRo ve yolcu gemilerinde ana motor olarak kullanılır.", "Yüksek devirli motorlar can kurtarma botları ve küçük teknelerde bulunur."] },
    "Crosshead ve trunk piston motor farkları": { title: "Crosshead ve Trunk Piston Motor Farkları", introduction: "Deniz dizel motorlarında iki temel piston-biyel bağlantı yapısı kullanılır: crosshead ve trunk piston.", sections: [{ heading: "Crosshead Motor", paragraphs: ["Piston ile biyel kolu arasında crosshead (çapraz başlık) bağlantısı vardır. Bu sayede piston ile krank kutusu birbirinden ayrılır; silindir yağlaması ve krank kutusu yağlaması bağımsız olarak yapılır.", "Düşük devirli iki zamanlı motorların tamamı crosshead tipindedir. Piston stroku çok uzundur (1.5-3.5 m)."] }, { heading: "Trunk Piston Motor", paragraphs: ["Biyel kolu doğrudan pistona bağlanır. Silindir ve krank kutusu aynı yağlama yağını paylaşır. Dört zamanlı motorların çoğu bu tiptedir. Daha kompakt yapıdadır."] }], keyPoints: ["Crosshead tipi uzun stroklu iki zamanlı motorlarda kullanılır.", "Trunk piston tipi daha kompakt, daha hafiftir.", "Crosshead tipi ayrı yağlama avantajı sağlar (yağ kontaminasyonu az)."] },
    "Ana motor ve yardımcı motor ayrımı": { title: "Ana Motor ve Yardımcı Motor Ayrımı", introduction: "Gemi tahrik sistemi ana motor (main engine) ve elektrik üreten yardımcı motorlardan (auxiliary engine) oluşur.", sections: [{ heading: "Ana Motor", paragraphs: ["Pervaneyi çevirerek gemiye itme kuvveti sağlar. Düşük devirli iki zamanlı (büyük gemiler) veya orta devirli dört zamanlı (orta boy gemiler) olabilir. Güç aralığı 5000-80000 kW arasındadır."] }, { heading: "Yardımcı Motor", paragraphs: ["Jeneratör tahrik ederek gemi elektrik ihtiyacını karşılar. Dört zamanlı orta veya yüksek devirli motorlardır. Gemide genellikle 3-4 adet bulunur; seyirde 1-2, limanda 2-3 adet çalıştırılır."] }], keyPoints: ["Ana motor geminin tahrik gücünü sağlar.", "Yardımcı motorlar elektrik üretimi için çalışır.", "Acil jeneratör SOLAS gereği ayrı bir bölmede bulunur."] },
    "Silindir kapağı (cylinder head)": { title: "Silindir Kapağı", introduction: "Silindir kapağı, yanma odasının üst sınırını oluşturan ve üzerinde supap, enjektör, indikatör musluğu gibi bileşenlerin bulunduğu kritik parçadır.", sections: [{ heading: "Yapı ve Görevleri", paragraphs: ["Silindir kapağı yüksek basınç (150-200 bar) ve sıcaklığa (400-500°C) dayanmalıdır. Dökme demir veya çelik döküm malzemeden üretilir. İçinde soğutma suyu kanalları bulunur.", "Üzerinde egzoz supabı, yakıt enjektörü, başlatma havası supabı, güvenlik supabı ve indikatör musluğu yer alır."] }], keyPoints: ["Termal gerilmeler çatlak oluşumuna neden olabilir.", "Soğutma suyu sızıntısı sürekli izlenmelidir.", "Kapak sökümü belirli tork değerleriyle yapılmalıdır."] },
    "Silindir gömleği (liner) ve aşınma": { title: "Silindir Gömleği (Liner) ve Aşınma", introduction: "Liner, piston ve segmanların kayarak hareket ettiği silindirik yüzeydir. Aşınma kontrolü motor ömrü ve performansı için kritiktir.", sections: [{ heading: "Aşınma Mekanizmaları", paragraphs: ["Korozif aşınma: Yakıttaki kükürt, yanma sonucu sülfürik asit oluşturur ve liner yüzeyini aşındırır. Doğru TBN'li silindir yağı kullanımıyla kontrol altına alınır.", "Abrazif aşınma: Yakıt ve havadaki partiküller yüzey çizer.", "Adhesif aşınma: Yetersiz yağlama sonucu metal-metal teması oluşur."] }, { heading: "Liner Ölçümü", paragraphs: ["İç çap, bore gauge ile ölçülür. Aşınma limiti genellikle nominal çapın %0.5-1.0'i kadardır. Ovalizasyon ve koniklik (taper) de kontrol edilir."] }], keyPoints: ["Liner aşınma hızı 0.02-0.10 mm/1000 saat aralığında kabul edilir.", "Düşük kükürtlü yakıt kullanımı korozif aşınmayı azaltır.", "Aşırı aşınma blow-by ve güç kaybına neden olur."] },
    "Piston ve segman tasarımı": { title: "Piston ve Segman Tasarımı", introduction: "Piston, yanma gazlarının basıncını biyel kolu aracılığıyla krank miline ileten bileşendir. Segmanlar gaz sızdırmazlığı ve yağ kontrolü sağlar.", sections: [{ heading: "Piston Yapısı", paragraphs: ["Büyük iki zamanlı motorlarda piston genellikle iki parçadan oluşur: yüksek ısıya dayanıklı çelik taç (crown) ve daha hafif etek (skirt). Taç içinde soğutma yağı veya su sirkülasyonu bulunur."] }, { heading: "Segman Tipleri", paragraphs: ["Sıkıştırma segmanları gaz sızdırmazlığı, yağ segmanları liner üzerindeki yağ filminin kontrolünü sağlar. Segman ağız boşluğu (gap) periyodik olarak ölçülür; aşırı artış blow-by'a işaret eder."] }], keyPoints: ["Piston tacı termal yükün en yoğun olduğu noktadır.", "Segman ağız boşluğu (butt clearance) düzenli olarak kontrol edilmelidir.", "Piston soğutması yetersiz olursa çatlak ve yanma (burning) oluşur."] },
    "Biyel kolu ve krank mili": { title: "Biyel Kolu ve Krank Mili", introduction: "Biyel kolu pistonun doğrusal hareketini krank milinin dönme hareketine çevirir. Krank mili motorun ana dönme elemanıdır.", sections: [{ heading: "Biyel Kolu", paragraphs: ["Crosshead motorlarda biyel kolu crosshead piminden krank pinine bağlanır. Trunk piston motorlarda ise piston pimine (gudgeon pin) doğrudan bağlıdır.", "Alt uçta (big end) ve üst uçta (small end) yatak bulunur. Yatak boşlukları periyodik olarak kontrol edilir."] }, { heading: "Krank Mili", paragraphs: ["Krank mili, motorun en ağır ve en pahalı parçasıdır. Dövme çelikten veya yarı-monte (semi-built) olarak üretilir. Krank pini (crankpin), krank muylusu (main journal) ve krank kolu (web) bölümlerinden oluşur.", "Krank mili saptırması (deflection) ölçümü, yatak aşınmasının ve şaft hizalamasının en önemli göstergesidir."] }], keyPoints: ["Deflection ölçümü makine vardiyasının temel kontrollerindendir.", "Limitlerin aşılması motor durdurma gerektiren ciddi bir durumdur.", "Krank mili çatlak kontrolü manyetik parçacık yöntemiyle yapılır."] },
    "Yatak (bearing) tipleri ve ölçüm": { title: "Yatak Tipleri ve Ölçüm", introduction: "Motor yatakları, krank mili ve biyel kolunun dönme hareketini minimum sürtünme ile destekler.", sections: [{ heading: "Yatak Tipleri", paragraphs: ["Ana yataklar (main bearings) krank milinin ana muylularını taşır. Krank pini yatakları (crankpin/big end bearings) biyel kolunun alt ucunda bulunur. Crosshead yatakları crosshead pimini destekler.", "Yatak malzemesi genellikle beyaz metal (tin-based babbitt) veya Al-Sn alaşımıdır."] }, { heading: "Yatak Boşluğu Ölçümü", paragraphs: ["Yatak boşluğu (bearing clearance) kurşun tel (lead wire) veya feeler gauge ile ölçülür. Aşırı boşluk düşük yağ basıncına ve çarpmaya neden olur."] }], keyPoints: ["Yatak sıcaklığı alarm seviyesi genellikle 75-85°C'dir.", "Yatak hasarı beyaz metal parçacıklarından yağ analiziyle tespit edilebilir.", "Overlay, yatak yüzeyindeki ince kaplamayla ilk çalışmada uyum sağlar."] },
    "Supap mekanizması ve zamanlaması": { title: "Supap Mekanizması ve Zamanlaması", introduction: "Egzoz supabı, yanmış gazların silindir dışına atılmasını kontrol eder. Açılma ve kapanma zamanlaması motor performansını doğrudan etkiler.", sections: [{ heading: "Supap Zamanlaması", paragraphs: ["İki zamanlı motorlarda yalnızca egzoz supabı vardır ve hidrolik veya pnömatik olarak tahrik edilir. Dört zamanlı motorlarda emme ve egzoz supapları kam mili (camshaft) aracılığıyla mekanik olarak çalıştırılır.", "Elektronik kontrollü motorlarda (ME tipi) supap zamanlaması yüke göre optimize edilir."] }], keyPoints: ["Supap oturma yüzeyinin bozulması sızdırmazlık kaybına yol açar.", "Supap döndürücü (rotator) eşit aşınma sağlar.", "Supap taşlama (lapping/grinding) bakım prosedürünün önemli parçasıdır."] },
    "Bedplate ve frame yapısı": { title: "Bedplate ve Frame Yapısı", introduction: "Bedplate, motorun tüm ağırlığını ve kuvvetlerini taşıyarak gemi yapısına ileten temel parçadır.", sections: [{ heading: "Yapısal Bileşenler", paragraphs: ["Bedplate (yatak tablası), A-frame (veya column) ve silindir bloğu motorun ana yapısını oluşturur. Bedplate dökme demir veya çelik kaynaklı olarak üretilir.", "A-frame, bedplate ile silindir bloğu arasında bağlantı sağlar ve biyel kolunun hareket alanını çevreler. Ana yataklar bedplate üzerinde bulunur.", "Tüm yapı uzun gerilme cıvataları (tie rod/stay bolt) ile birbirine bağlanarak sıkıştırma altında tutulur."] }], keyPoints: ["Tie rod'lar yapısal bütünlük için kritiktir.", "Bedplate çatlaması gemi sınıflama kuruluşu tarafından özel muayene gerektirir.", "Motor titreşimi yapısal rezonansla artabilir; destekler düzenli kontrol edilir."] },
    "Mekanik yakıt enjeksiyon sistemi": { title: "Mekanik Yakıt Enjeksiyon Sistemi", introduction: "Geleneksel dizel motorlarda yakıt, kam tahrikli yüksek basınç pompası ile enjektöre iletilir ve mekanik olarak püskürtülür.", sections: [{ heading: "Sistem Bileşenleri", paragraphs: ["Kam mili → kam takipçisi → pompa plunjer → yüksek basınç borusu → enjektör nozül zinciri ile çalışır. Plunjer helisinin dönme açısıyla yakıt miktarı ayarlanır.", "Enjeksiyon basıncı 300-1000 bar aralığındadır. Nozül tipi genellikle çok delikli tip olup, delik sayısı ve çapı püskürtme kalitesini belirler."] }], keyPoints: ["Kam zamanlaması motor performansını doğrudan etkiler.", "Enjektör nozül deliklerinin tıkanması yanma kalitesini bozar.", "VIT (Variable Injection Timing) ile verim optimize edilir."] },
    "Common rail enjeksiyon sistemi": { title: "Common Rail Enjeksiyon Sistemi", introduction: "Common rail sisteminde yüksek basınçlı yakıt sürekli olarak ortak bir borudan (rail) tüm enjektörlere beslenir. Enjeksiyon zamanlaması ve miktarı elektronik olarak kontrol edilir.", sections: [{ heading: "Sistem Yapısı", paragraphs: ["Yüksek basınç pompası yakıtı sürekli olarak 800-1000 bar basınçta ortak rail'e basar. Her silindir için bağımsız enjektör, ECU komutuna göre açılır ve kapanır.", "MAN B&W ME-C serisi motorlar common rail enjeksiyon kullanan iki zamanlı motorlardır."], bulletPoints: ["Enjeksiyon basıncı yükten bağımsız olarak yüksek tutulabilir.", "Çoklu enjeksiyon (pilot, main, post injection) mümkündür.", "Daha düşük NOx emisyonu ve pürüzsüz yanma sağlanır.", "Kam mili kaldırılmış olup motor daha kompakttır."] }], keyPoints: ["Common rail, elektronik kontrol ile hassas yakıt dozajı sağlar.", "Düşük yüklerde bile yüksek enjeksiyon basıncı korunur.", "Bakım maliyeti daha yüksek ancak performans avantajı belirgindir."] },
    "Turboşarjer çalışma prensibi": { title: "Turboşarjer Çalışma Prensibi", introduction: "Turboşarjer, egzoz gazı enerjisini kullanarak emme havasını sıkıştıran ve motor gücünü/verimini artıran cihazdır.", sections: [{ heading: "Çalışma Prensibi", paragraphs: ["Egzoz gazları türbin çarkını döndürür, aynı şaft üzerindeki kompresör çarkı emme havasını sıkıştırır. Türbin çark devri 10000-30000 rpm arasındadır.", "Basınç oranı 2.5-4.5 aralığındadır. Sıkıştırılan hava şarj havası soğutucusunda (intercooler) soğutularak yoğunluğu artırılır."] }], keyPoints: ["Turboşarj, motor gücünü %30-50 artırır.", "Surging (pompaj) kararsız çalışma durumudur ve kaçınılmalıdır.", "Türbin tarafı fouling, kompresör tarafı kirlenme performansı düşürür."] },
    "İndike güç (indicated power) hesabı": { title: "İndike Güç Hesabı", introduction: "İndike güç, silindir içinde gaz basıncının pistona yaptığı iş sonucu üretilen güçtür. Motor performansının temel parametresidir.", sections: [{ heading: "Hesap Yöntemi", paragraphs: ["İndikatör diyagramından ortalama indike basınç (MIP) belirlenir. İndike güç aşağıdaki formülle hesaplanır."], formula: { expression: "Pi = (MIP × A × L × N × n) / (60 × k)", variables: ["Pi: İndike güç (kW)", "MIP: Ortalama indike basınç (kPa)", "A: Piston alanı (m²)", "L: Strok (m)", "N: Devir (rpm)", "n: Silindir sayısı", "k: 1 (2 zamanlı), 2 (4 zamanlı)"] }, example: { problem: "6 silindirli iki zamanlı motorun MIP = 1850 kPa, silindir çapı 500 mm, strok 2000 mm, devir 105 rpm ise indike gücü hesaplayınız.", steps: ["A = π/4 × 0.5² = 0.1963 m²", "Pi = (1850 × 0.1963 × 2.0 × 105 × 6) / (60 × 1)", "Pi = (1850 × 0.1963 × 2.0 × 630) / 60", "Pi = 457200 / 60 = 7620 kW" ], result: "İndike güç 7620 kW'tır (yaklaşık 10360 HP)." } }], keyPoints: ["İndike güç, mekanik kayıplar hariç brüt güçtür.", "Fren gücü = İndike güç × Mekanik verim.", "İndikatör diyagramı yanma kalitesinin en önemli göstergesidir."] },
    "Özgül yakıt tüketimi (SFOC)": { title: "Özgül Yakıt Tüketimi (SFOC)", introduction: "SFOC, motor tarafından birim güç üretimi için tüketilen yakıt miktarıdır. Motor veriminin en doğrudan göstergesidir.", sections: [{ heading: "Tanım ve Hesap", paragraphs: [], formula: { expression: "SFOC = (Yakıt tüketimi (g/h)) / (Fren gücü (kW))", variables: ["SFOC birimi: g/kWh"] }, example: { problem: "Bir ana motor 12500 kW fren gücü üretirken saatte 2500 kg HFO tüketiyorsa SFOC değerini hesaplayınız.", steps: ["SFOC = (2500 × 1000 g/h) / 12500 kW", "SFOC = 2500000 / 12500 = 200 g/kWh"], result: "SFOC = 200 g/kWh. Modern düşük devirli motorlarda bu değer 160-175 g/kWh aralığındadır." } }], keyPoints: ["Düşük SFOC yüksek verim demektir.", "SFOC motor yüküne göre değişir; optimum genellikle %75-85 yükte elde edilir.", "ISO düzeltmesi ile referans koşullara dönüştürülür."] },
  },

  // ═══════════════════════════════════════════════════════════════
  // GEMİ ELEKTRİK SİSTEMLERİ
  // ═══════════════════════════════════════════════════════════════
  electrical: {
    "Senkron jeneratör çalışma prensibi": { title: "Senkron Jeneratör Çalışma Prensibi", introduction: "Gemi elektrik üretiminde senkron (senkron tip) AC jeneratörler kullanılır. Dönen alan (rotor) ile sabit sargılar (stator) arasındaki etkileşim elektrik enerjisi üretir.", sections: [{ heading: "Çalışma Prensibi", paragraphs: ["Rotor, DC uyarma akımıyla manyetik alan oluşturur. Dizel motor rotorun dönmesini sağlar. Dönen manyetik alan stator sargılarında EMK indükler.", "Üretilen gerilimin frekansı f = (N × P) / 120 formülüyle belirlenir (N: devir/dk, P: kutup sayısı). 60 Hz sistemde 4 kutuplu jeneratör 1800 rpm'de çalışır."], formula: { expression: "f = (N × P) / 120", variables: ["f: Frekans (Hz)", "N: Devir (rpm)", "P: Kutup sayısı"] } }], keyPoints: ["Gemi jeneratörleri genellikle 60 Hz (bazen 50 Hz) üretir.", "Gerilim AVR ile sabit tutulur, frekans governor ile kontrol edilir.", "Üç fazlı yıldız (star) bağlantı kullanılır."] },
    "Paralel jeneratör bağlama": { title: "Paralel Jeneratör Bağlama", introduction: "Gemi elektrik sisteminde yük artışına göre veya güvenilirlik amacıyla birden fazla jeneratör paralel çalıştırılır.", sections: [{ heading: "Senkronizasyon Koşulları", paragraphs: ["Paralel bağlama için dört koşul karşılanmalıdır: (1) Aynı gerilim genliği, (2) Aynı frekans, (3) Aynı faz sırası, (4) Aynı faz açısı (senkroskop sıfır noktasında).", "Modern gemilerde otomatik senkronizasyon üniteleri bu koşulları sağlar ve devre kesiciyi doğru anda kapatır."] }], keyPoints: ["Yanlış senkronizasyon jeneratöre ve baraya ciddi hasar verebilir.", "Faz sırası hatalıysa paralel bağlama asla yapılmamalıdır.", "Yük paylaşımı droop veya isochronous modda yapılır."] },
    "Ana dağıtım panosu (MSB)": { title: "Ana Dağıtım Panosu (MSB)", introduction: "MSB (Main Switchboard), jeneratörlerden üretilen elektriğin toplanıp tüketicilere dağıtıldığı merkezi panonur.", sections: [{ heading: "Yapı ve Bileşenler", paragraphs: ["MSB genellikle 440V veya 6.6kV bara sisteminden oluşur. Her jeneratör kendi devre kesicisiyle baraya bağlanır. Tüketici devreleri ayrı devre kesicilerle korunur.", "Tercihli açma (preferential trip) sistemi, jeneratör aşırı yüklendiğinde önemsiz yükleri otomatik olarak devreden çıkarır."] }], keyPoints: ["MSB odasına yetkisiz erişim engellenmelidir.", "Bara gerilimi ve izolasyon direnci sürekli izlenir.", "Blackout durumunda otomatik başlatma sekansı devreye girer."] },
    "Üç fazlı asenkron motor": { title: "Üç Fazlı Asenkron Motor", introduction: "Gemi elektrik tüketicilerinin büyük çoğunluğu üç fazlı asenkron (indüksiyon) motorlardır. Pompa, fan, kompresör ve vinç tahriklerinde kullanılır.", sections: [{ heading: "Çalışma Prensibi", paragraphs: ["Stator sargılarına uygulanan üç fazlı gerilim döner manyetik alan oluşturur. Rotor bu alana göre hafif geri kalarak (kayma) döner. Kayma oranı genellikle %2-5 arasındadır."], formula: { expression: "n_s = 120f/P    ve    kayma (s) = (n_s − n_r) / n_s", variables: ["n_s: Senkron devir (rpm)", "n_r: Rotor devri (rpm)", "P: Kutup sayısı", "f: Frekans (Hz)"] }, example: { problem: "4 kutuplu, 60 Hz'lik bir motorun senkron devri ve %3 kayma ile çalışma devri nedir?", steps: ["n_s = 120 × 60 / 4 = 1800 rpm", "n_r = n_s × (1 − s) = 1800 × (1 − 0.03) = 1746 rpm"], result: "Motor 1746 rpm'de çalışır." } }], keyPoints: ["Basit, sağlam ve bakım ihtiyacı azdır.", "Yol verme akımı nominal akımın 5-7 katı olabilir.", "VFD ile hız kontrolü enerji tasarrufu sağlar."] },
    "Motor yol verme yöntemleri (DOL, Y-Δ, VFD)": { title: "Motor Yol Verme Yöntemleri", introduction: "Büyük motorların yol verilmesinde çekilen yüksek akım, jeneratör ve şebeke üzerinde gerilim düşümüne neden olur. Farklı yol verme yöntemleri bu etkiyi azaltır.", sections: [{ heading: "Yöntemler", paragraphs: [], table: { headers: ["Yöntem", "Başlangıç Akımı", "Başlangıç Torku", "Uygulama"], rows: [["DOL (Direkt)", "6-7 × I_n", "%100", "Küçük motorlar (< 15 kW)"], ["Y-Δ", "2-2.5 × I_n", "%33", "Orta boy motorlar"], ["Soft Starter", "2-4 × I_n", "Ayarlanabilir", "Pompa, fan"], ["VFD", "< 1.5 × I_n", "%100+", "Hassas hız kontrolü"]] } }], keyPoints: ["Y-Δ yol verme torku %33'e düşürür; ağır yüklerde uygun olmayabilir.", "VFD frekans kontrolü ile hem yumuşak yol verme hem enerji tasarrufu sağlar.", "Yol verme akımı jeneratör kapasitesine göre sınırlandırılmalıdır."] },
  },

  // ═══════════════════════════════════════════════════════════════
  // GEMİ MAKİNE SİSTEMLERİ
  // ═══════════════════════════════════════════════════════════════
  "ship-systems": {
    "Dümen tipleri (balanced, semi-balanced, unbalanced)": { title: "Dümen Tipleri", introduction: "Dümen, geminin yön değiştirmesini sağlayan kritik ekipmandır. Dönme noktasına göre üç temel tipe ayrılır.", sections: [{ heading: "Sınıflandırma", paragraphs: [], table: { headers: ["Tip", "Yüzde Dengeli", "Tork", "Kullanım"], rows: [["Unbalanced", "0%", "Yüksek", "Küçük tekneler"], ["Semi-balanced", "20-30%", "Orta", "Ticari gemiler (yaygın)"], ["Balanced", "35-40%", "Düşük", "Büyük gemiler"]] } }, { heading: "Yapısal Özellikler", paragraphs: ["Spade (asma) dümen: Alt tarafta yatak yoktur, kendi ağırlığını şaft taşır. Yüksek manevra kapasitesi.", "Horn dümen: Alt yatak desteği vardır, yapısal olarak daha güçlüdür.", "Flap (Becker) dümen: Arka kenarda hareketli kanatçık bulunur, düşük hızda manevra kabiliyetini artırır."] }], keyPoints: ["SOLAS gereği dümen 28 saniyede bir taraftan diğer tarafa (35°-35°) hareket edebilmelidir.", "Dengeli dümen daha az tork gerektirir, makine daha küçük boyutlandırılır.", "Azimuth thruster dümen ihtiyacını ortadan kaldırır."] },
    "Sabit hatveli pervane (FPP)": { title: "Sabit Hatveli Pervane (FPP)", introduction: "FPP'de kanat açısı sabittir. Hız kontrolü motor devir değişikliği ile yapılır.", sections: [{ heading: "Özellikler", paragraphs: ["Daha basit yapı, daha düşük maliyet ve daha az bakım gerektirir. Geri yol için motorun ters yönde dönmesi gerekir.", "Büyük iki zamanlı motorlarla direkt tahrikli gemilerde yaygın olarak kullanılır."] }], keyPoints: ["Basit, güvenilir ve ucuzdur.", "Motor devrinin değiştirilmesi ile hız kontrolü yapılır.", "Geri manevra için motor tersine çevrilmelidir."] },
    "Değişken hatveli pervane (CPP)": { title: "Değişken Hatveli Pervane (CPP)", introduction: "CPP'de kanat açısı (hatve) hidrolik olarak değiştirilebilir. Motor sabit devirde çalışırken pervane hatvesi ile hız ve yön kontrolü yapılır.", sections: [{ heading: "Avantajlar ve Dezavantajlar", paragraphs: [], bulletPoints: ["Avantaj: Motor sabit devirde çalışır – jeneratör şaft ile tahrik edilebilir.", "Avantaj: Hızlı manevra kapasitesi (motor döndürmeye gerek yok).", "Avantaj: Optimum yakıt tüketimi için hatve ayarlanabilir.", "Dezavantaj: Karmaşık hidrolik sistem.", "Dezavantaj: Hub (göbek) daha büyük, verim FPP'den %1-3 daha düşük.", "Dezavantaj: Bakım maliyeti yüksek, sızdırmazlık kritik."] }], keyPoints: ["RoRo, feribot ve offshore gemilerinde yaygındır.", "Pervane hatvesi köprüüstünden kontrol edilir.", "Sıfır hatve = sıfır itme kuvveti (motor çalışırken)."] },
  },

  // ═══════════════════════════════════════════════════════════════
  // ÇEVRE VE MARPOL
  // ═══════════════════════════════════════════════════════════════
  "environment-machine": {
    "Kükürt limitleri (global 0.50%, ECA 0.10%)": { title: "Kükürt Limitleri", introduction: "IMO MARPOL Annex VI, deniz yakıtlarındaki kükürt oranını sınırlar. 1 Ocak 2020'den itibaren küresel limit %0.50'ye düşürülmüştür.", sections: [{ heading: "Mevcut Limitler", paragraphs: [], table: { headers: ["Bölge", "SOx Limiti", "Yürürlük"], rows: [["Küresel", "%0.50 m/m", "2020"], ["ECA (Baltık, Kuzey Denizi, Kuzey Amerika, Karayip ABD)", "%0.10 m/m", "2015"], ["Çin ECA", "%0.50 → 0.10", "Kademeli"]] } }, { heading: "Uyum Yöntemleri", paragraphs: [], bulletPoints: ["VLSFO (%0.50) veya MGO (%0.10) kullanımı.", "Egzoz gazı yıkama (scrubber) sistemi kurulumu.", "LNG veya metanol gibi alternatif yakıt kullanımı."] }], keyPoints: ["Uyumsuzluk geminin alıkonmasına neden olabilir.", "Scrubber kullanıldığında HFO yakılabilir ancak yıkama suyu yönetimi gerekir.", "ECA bölgelerine girişte yakıt değişimi önceden yapılmalıdır."] },
    "EEDI ve EEXI gereklilikleri": { title: "EEDI ve EEXI Gereklilikleri", introduction: "EEDI yeni gemiler için, EEXI mevcut gemiler için enerji verimliliği standartlarını belirler.", sections: [{ heading: "EEDI", paragraphs: ["Energy Efficiency Design Index, yeni inşa gemilerin tasarım aşamasında ton-mil başına CO₂ emisyonunu sınırlar. Faz 0-3 arası kademeli azaltım hedefleri vardır.", "EEDI = (CO₂ emisyon faktörü × SFOC × Motor gücü) / (Kapasite × Referans hız)"] }, { heading: "EEXI", paragraphs: ["Mevcut gemilere uygulanan teknik verimlilik indeksidir. Gerekli EEXI değerini aşan gemiler motor güç sınırlaması (EPL/ShaPoLi) veya enerji tasarrufu teknolojisi uygulamalıdır."] }], keyPoints: ["EEXI 1 Ocak 2023'ten itibaren zorunludur.", "Motor güç sınırlaması en yaygın EEXI uyum yöntemidir.", "CII ile birlikte geminin karbon performansını belirler."] },
  },

  // ═══════════════════════════════════════════════════════════════
  // BAKIM VE TUTUM
  // ═══════════════════════════════════════════════════════════════
  maintenance: {
    "Krank mili saptırma (deflection) ölçümü": { title: "Krank Mili Saptırma (Deflection) Ölçümü", introduction: "Deflection ölçümü, krank milinin bükülme durumunu kontrol ederek yatak aşınması, temeldeki deformasyon veya şaft hizalama bozukluğunu tespit etmeye yarar.", sections: [{ heading: "Ölçüm Yöntemi", paragraphs: ["Krank kolları (web) arasına bir dial gauge (saptırma ölçer / deflection gauge) yerleştirilir. Krank mili yavaşça döndürülerek üst, alt, sağ, sol ve arka olmak üzere 5 pozisyonda okuma alınır.", "Okumaların farkı deflection değerini verir. Pozitif değer açılma (kapak aşınması), negatif değer kapanma anlamına gelir."] }, { heading: "Limit Değerler", paragraphs: ["İzin verilen maksimum deflection değerleri motor üreticisi tarafından belirtilir. Genel kural olarak:"], formula: { expression: "Max deflection ≈ ± L_strok / 20000 ila ± L_strok / 10000", variables: ["L_strok: Piston stroku (mm)"] }, example: { problem: "Strok uzunluğu 2000 mm olan bir motorun izin verilen deflection sınırını hesaplayınız.", steps: ["Max = ±2000/20000 = ±0.10 mm (sıkı limit)", "Max = ±2000/10000 = ±0.20 mm (üretici limiti)"], result: "İzin verilen deflection ±0.10 ile ±0.20 mm arasındadır." } }], keyPoints: ["Deflection ölçümü motorun soğuk ve sıcak halinde ayrı ayrı yapılır.", "Limitlerin aşılması yatak muayenesi ve hizalama kontrolü gerektirir.", "Ölçüm sonuçları makine jurnalına kaydedilir."] },
    "Titreşim analizi": { title: "Titreşim Analizi", introduction: "Titreşim analizi, dönen ekipmanların sağlık durumunu değerlendiren kestirimci bakım tekniğidir.", sections: [{ heading: "Ölçüm Parametreleri", paragraphs: ["Yer değiştirme (displacement), hız (velocity) ve ivme (acceleration) titreşim büyüklükleridir. Düşük frekanslarda yer değiştirme, yüksek frekanslarda ivme baskın göstergedir.", "FFT (Hızlı Fourier Dönüşümü) analizi, titreşim sinyalini frekans bileşenlerine ayırarak arıza kaynağını belirler."] }, { heading: "Tipik Arıza Sinyalleri", paragraphs: [], table: { headers: ["Frekans", "Olası Neden"], rows: [["1× RPM", "Dengesizlik (unbalance)"], ["2× RPM", "Hizalama bozukluğu (misalignment)"], ["Yatak frekansları (BPFI, BPFO)", "Rulman hasarı"], ["Çoklu harmonikler", "Gevşeklik (looseness)"]] } }], keyPoints: ["Trend takibi erken arıza tespiti sağlar.", "ISO 10816 titreşim sınır değerlerini tanımlar.", "Portatif ve online titreşim izleme sistemleri kullanılır."] },
  },

  // ═══════════════════════════════════════════════════════════════
  // ERM
  // ═══════════════════════════════════════════════════════════════
  erm: {
    "ERM nedir ve neden gereklidir": { title: "ERM Nedir ve Neden Gereklidir", introduction: "Engine Resource Management, makine dairesi ekibinin kaynaklarını (insan, zaman, ekipman, bilgi) etkin ve güvenli biçimde yönetmesini sağlayan yapılandırılmış bir yaklaşımdır.", sections: [{ heading: "Tanım", paragraphs: ["ERM, köprüüstündeki BRM'nin (Bridge Resource Management) makine dairesine uyarlanmış versiyonudur. STCW 2010 Manila Değişiklikleri ile zorunlu eğitim müfredatına eklenmiştir.", "Amaç: İnsan hatasını azaltmak, takım çalışmasını güçlendirmek, durumsal farkındalığı artırmak ve güvenli operasyonlar sağlamaktır."] }, { heading: "Neden Gereklidir", paragraphs: ["Deniz kazalarının %80'inden fazlasında insan faktörü rol oynamaktadır. Makine dairesi kazalarının analizi, teknik yetersizlik yerine iletişim kopukluğu, yetersiz planlama ve karar hataları gibi faktörlerin ön plana çıktığını göstermektedir."] }], keyPoints: ["STCW gereği tüm makine zabitlerinin ERM eğitimi alması zorunludur.", "İnsan hatası en büyük kaza nedenidir.", "ERM eğitimi simülatör ortamında senaryo bazlı yapılır."] },
    "PID kontrol algoritması": { title: "PID Kontrol Algoritması", introduction: "PID (Proportional-Integral-Derivative) kontrol, endüstriyel otomasyon ve gemi makine sistemlerinde en yaygın kullanılan geri beslemeli kontrol algoritmasıdır.", sections: [{ heading: "Bileşenler", paragraphs: ["P (Oransal): Hata büyüklüğüyle orantılı çıkış üretir. Hızlı tepki sağlar ancak kalıcı hata bırakır.", "I (İntegral): Hatanın zamanla birikimini hesaplar ve kalıcı hatayı sıfırlar. Aşırı integral salınıma neden olabilir.", "D (Türev): Hatanın değişim hızına göre çıkış üretir. Aşımı (overshoot) azaltır ancak gürültüye duyarlıdır."], formula: { expression: "u(t) = Kp·e(t) + Ki·∫e(t)dt + Kd·de(t)/dt", variables: ["Kp: Oransal kazanç", "Ki: İntegral kazanç", "Kd: Türev kazanç", "e(t): Hata = Set point − Ölçüm değeri"] } }], keyPoints: ["Sıcaklık, basınç, seviye ve hız kontrolünde yaygın kullanılır.", "Parametre ayarı (tuning) sistem performansını belirler.", "Ziegler-Nichols yöntemi yaygın bir tuning tekniğidir."] },
  },

  // ═══════════════════════════════════════════════════════════════
  // ENERJİ VERİMLİLİĞİ
  // ═══════════════════════════════════════════════════════════════
  "energy-efficiency": {
    "CII (Karbon Yoğunluğu Göstergesi)": { title: "CII (Karbon Yoğunluğu Göstergesi)", introduction: "CII, bir geminin yıllık operasyonel karbon yoğunluğunu ölçen ve A'dan E'ye derecelendiren zorunlu göstergedir.", sections: [{ heading: "Hesaplama", paragraphs: ["CII = Yıllık CO₂ emisyonu / (DWT × Mesafe) formülüyle hesaplanır. CO₂ emisyonu yakıt tüketiminden ve karbon dönüşüm faktöründen elde edilir."], formula: { expression: "CII = (Σ(CF_j × FC_j)) / (Kapasite × D)", variables: ["CF_j: j yakıtının karbon dönüşüm faktörü (t CO₂/t yakıt)", "FC_j: j yakıtının yıllık tüketimi (ton)", "Kapasite: DWT (veya GT)", "D: Yıllık kat edilen mesafe (deniz mili)"] } }, { heading: "Derecelendirme", paragraphs: ["Gemiler A (çok iyi), B (iyi), C (orta), D (kötü) veya E (çok kötü) olarak derecelendirilir. Üst üste 3 yıl D veya 1 yıl E alan gemiler düzeltici eylem planı hazırlamalıdır."], table: { headers: ["Derece", "Anlam", "Gerekli Eylem"], rows: [["A", "Çok iyi", "Yok"], ["B", "İyi", "Yok"], ["C", "Kabul edilebilir", "Yok"], ["D", "Kötü", "Düzeltici plan (3 yıl üst üste)"], ["E", "Çok kötü", "Acil düzeltici plan"]] } }], keyPoints: ["CII her yıl daha sıkı hale gelir (referans çizgisi yıllık %2 düşer).", "Slow steaming, trim optimizasyonu ve WHRS CII'yi iyileştirir.", "2024'ten itibaren veriler IMO'ya raporlanmaktadır."] },
    "Hız optimizasyonu (slow steaming)": { title: "Hız Optimizasyonu (Slow Steaming)", introduction: "Gemi hızının düşürülmesi yakıt tüketimini küp oranında azaltır ve en etkili operasyonel enerji tasarrufu yöntemidir.", sections: [{ heading: "Yakıt-Hız İlişkisi", paragraphs: ["Yakıt tüketimi hızın yaklaşık 3. kuvvetiyle orantılıdır: FC ∝ V³. Hızın %10 düşürülmesi yakıt tüketimini yaklaşık %27 azaltır."], formula: { expression: "FC₂/FC₁ ≈ (V₂/V₁)³", variables: [] }, example: { problem: "14 knot'ta günlük yakıt tüketimi 45 ton olan gemi, 12 knot'a düşürülürse tüketimi ne olur?", steps: ["FC₂ = 45 × (12/14)³ = 45 × (0.857)³", "FC₂ = 45 × 0.630 = 28.3 ton/gün"], result: "Hız %14 düşürüldüğünde yakıt tüketimi %37 azalarak 28.3 ton/gün'e düşer." } }], keyPoints: ["Ultra slow steaming tasarım hızının %40-50 altında seyirdir.", "Düşük yükte turboşarj surging riski artabilir.", "Motor üreticisi minimum güvenli yük sınırı belirtir."] },
  },

  // ═══════════════════════════════════════════════════════════════
  // AKIŞKANLAR MEKANİĞİ
  // ═══════════════════════════════════════════════════════════════
  "fluid-mechanics": {
    "Bernoulli denklemi ve uygulamaları": { title: "Bernoulli Denklemi ve Uygulamaları", introduction: "Bernoulli denklemi, ideal akışkanlar için enerji korunumunun akışkan mekaniğine uygulanmış halidir.", sections: [{ heading: "Denklem", paragraphs: ["Sürtünmesiz, sıkıştırılamaz, kararlı akış için bir akım çizgisi boyunca toplam enerji sabittir."], formula: { expression: "P/ρg + V²/2g + z = sabit", variables: ["P: Statik basınç (Pa)", "ρ: Yoğunluk (kg/m³)", "V: Akış hızı (m/s)", "z: Yükseklik (m)", "g: Yerçekimi ivmesi (9.81 m/s²)"] }, example: { problem: "Bir boru hattında 1. noktada basınç 3 bar, hız 2 m/s, yükseklik 5 m; 2. noktada yükseklik 10 m, hız 4 m/s ise 2. noktadaki basıncı bulunuz (ρ = 1000 kg/m³).", steps: ["P₁/ρg + V₁²/2g + z₁ = P₂/ρg + V₂²/2g + z₂", "300000/9810 + 4/19.62 + 5 = P₂/9810 + 16/19.62 + 10", "30.58 + 0.204 + 5 = P₂/9810 + 0.816 + 10", "35.784 = P₂/9810 + 10.816", "P₂/9810 = 24.968 → P₂ = 244936 Pa ≈ 2.45 bar"], result: "2. noktadaki basınç yaklaşık 2.45 bar'dır." } }], keyPoints: ["Gerçek akışlarda sürtünme kayıp terimi eklenir.", "Venturi metre ve pitot tüpü Bernoulli uygulamalarıdır.", "Sıkıştırılabilir akışlarda Bernoulli geçerli değildir."] },
    "Reynolds sayısı": { title: "Reynolds Sayısı", introduction: "Reynolds sayısı, akışın laminer mi türbülanslı mı olduğunu belirleyen boyutsuz parametredir.", sections: [{ heading: "Tanım ve Hesap", paragraphs: ["Reynolds sayısı eylemsizlik kuvvetinin viskoz kuvvete oranıdır."], formula: { expression: "Re = ρVD/μ = VD/ν", variables: ["V: Ortalama akış hızı (m/s)", "D: Boru çapı (m)", "μ: Dinamik viskozite (Pa·s)", "ν: Kinematik viskozite (m²/s)"] } }, { heading: "Kritik Değerler", paragraphs: [], table: { headers: ["Re aralığı", "Akış rejimi"], rows: [["Re < 2300", "Laminer"], ["2300 < Re < 4000", "Geçiş bölgesi"], ["Re > 4000", "Türbülanslı"]] } }], keyPoints: ["Gemi boru sistemlerinde akış genellikle türbülanslıdır.", "Yakıt ve yağ hatlarında düşük hızlarda laminer akış olabilir.", "Re değeri sürtünme katsayısı hesabında kullanılır."] },
    "NPSH kavramı ve kavitasyon": { title: "NPSH Kavramı ve Kavitasyon", introduction: "NPSH (Net Positive Suction Head), pompanın emme tarafında kavitasyon oluşumunu önlemek için gereken minimum basınç yüksekliğidir.", sections: [{ heading: "NPSH Tanımları", paragraphs: ["NPSH_A (Available): Sistemin pompaya sağladığı emme yüksekliği.", "NPSH_R (Required): Pompa üreticisinin kavitasyondan kaçınmak için belirttiği minimum değer.", "Güvenli çalışma koşulu: NPSH_A > NPSH_R + güvenlik payı (genellikle 0.5-1.0 m)."], formula: { expression: "NPSH_A = (P_atm − P_buhar) / ρg + h_statik − h_kayıp", variables: ["P_buhar: Sıvının buhar basıncı (Pa)", "h_statik: Sıvı seviyesi (m)", "h_kayıp: Emme hattı sürtünme kaybı (m)"] } }, { heading: "Kavitasyon", paragraphs: ["Kavitasyon, lokal basıncın sıvının buhar basıncının altına düşmesiyle oluşan buhar kabarcıklarının yüksek basınç bölgesinde çökmesidir. Metal yüzeylerde erozyon, gürültü ve titreşime neden olur."] }], keyPoints: ["Kavitasyon pompa çarkını ciddi şekilde aşındırır.", "Sıvı sıcaklığı arttıkça buhar basıncı artar, NPSH_A düşer.", "Pompa pozisyonu mümkün olduğunca sıvı seviyesinin altında olmalıdır."] },
  },

  // ═══════════════════════════════════════════════════════════════
  // SOĞUTMA VE KLİMA
  // ═══════════════════════════════════════════════════════════════
  "cooling-hvac": {
    "COP (Performans Katsayısı) hesabı": { title: "COP (Performans Katsayısı) Hesabı", introduction: "COP, soğutma veya ısı pompası sisteminin verimini ifade eden boyutsuz büyüklüktür.", sections: [{ heading: "Soğutma COP", paragraphs: ["Soğutma etkisinin kompresör işine oranıdır."], formula: { expression: "COP_soğutma = Q_evaporatör / W_kompresör = (h₁ − h₄) / (h₂ − h₁)", variables: ["h₁: Kompresör girişi (evaporatör çıkışı) entalpisi", "h₂: Kompresör çıkışı entalpisi", "h₄: Genleşme valfi çıkışı entalpisi"] }, example: { problem: "Bir geminin provizyon soğutma sisteminde h₁ = 400 kJ/kg, h₂ = 450 kJ/kg, h₃ = h₄ = 250 kJ/kg ise COP'u hesaplayınız.", steps: ["COP = (h₁ − h₄) / (h₂ − h₁)", "COP = (400 − 250) / (450 − 400) = 150 / 50 = 3.0"], result: "COP = 3.0: 1 kW elektrik ile 3 kW soğutma sağlanır." } }], keyPoints: ["COP > 1 olması normaldir (verimle karıştırılmamalıdır).", "Evaporatör ve kondenser sıcaklıkları COP'u doğrudan etkiler.", "Fouling ve gaz sızıntısı COP'u düşürür."] },
  },

  // ═══════════════════════════════════════════════════════════════
  // OTOMASYON
  // ═══════════════════════════════════════════════════════════════
  automation: {
    "PID kontrol algoritması": { title: "PID Kontrol Algoritması", introduction: "PID (Proportional-Integral-Derivative) kontrol, gemi otomasyon sistemlerinde sıcaklık, basınç, seviye ve hız kontrolünde en yaygın kullanılan algoritmadır.", sections: [{ heading: "Bileşenler", paragraphs: ["P (Oransal): Anlık hataya orantılı çıkış. Hızlı tepki verir ancak kalıcı hata (offset) bırakır.", "I (İntegral): Birikmiş hatayı giderir (offset sıfırlar). Aşırısı salınıma yol açar.", "D (Türev): Hatanın değişim hızına göre tepki. Aşımı azaltır, gürültüye duyarlıdır."], formula: { expression: "u(t) = Kp·e(t) + Ki·∫e(t)dt + Kd·de(t)/dt", variables: ["e(t) = SP − PV (Set Point − Process Value)"] } }], keyPoints: ["Gemi soğutma suyu sıcaklığı, kazan seviyesi ve jeneratör frekansı PID ile kontrol edilir.", "Agresif tuning aşırı aşım ve salınıma neden olur.", "Ziegler-Nichols, Cohen-Coon yaygın tuning yöntemleridir."] },
    "Sıcaklık ölçüm sensörleri (termokuple, RTD)": { title: "Sıcaklık Ölçüm Sensörleri", introduction: "Gemi makine dairesinde sıcaklık ölçümü için termokuple ve RTD (Resistance Temperature Detector) sensörleri kullanılır.", sections: [{ heading: "Termokuple", paragraphs: ["İki farklı metalin birleşim noktasındaki sıcaklık farkına bağlı EMK üretir (Seebeck etkisi). Ucuzdur, geniş sıcaklık aralığında çalışır (−200 ile 1800°C), dayanıklıdır ancak doğruluğu RTD'ye göre düşüktür."], table: { headers: ["Tip", "Metal Çifti", "Aralık (°C)"], rows: [["K", "NiCr – NiAl", "−200 – 1250"], ["J", "Fe – CuNi", "−40 – 750"], ["T", "Cu – CuNi", "−200 – 350"]] } }, { heading: "RTD (Pt100)", paragraphs: ["Platin telin direncinin sıcaklıkla doğrusal olarak değişmesine dayanır. 100Ω'da 0°C referansı alır. Yüksek doğruluk (±0.1°C) sağlar ancak daha pahalıdır ve sıcaklık aralığı daha dardır (−200 – 850°C)."] }], keyPoints: ["Egzoz sıcaklığı ölçümünde K tipi termokuple tercih edilir.", "Soğutma suyu ve yağ sıcaklığında RTD daha doğru sonuç verir.", "Sinyal iletiminde 4-20 mA standart analog çıkış kullanılır."] },
  },

  // ═══════════════════════════════════════════════════════════════
  // MAKİNE ELEMANLARI VE MALZEME BİLGİSİ
  // ═══════════════════════════════════════════════════════════════
  "machine-elements": {
    "Kristal yapılar ve faz diyagramları": {
      title: "Kristal Yapılar ve Faz Diyagramları",
      introduction: "Metallerin mekanik özellikleri büyük ölçüde atomların kristal kafes içindeki düzenlenme biçimine bağlıdır. Faz diyagramları ise alaşımların sıcaklık ve bileşime göre hangi fazda bulunacağını gösterir.",
      sections: [
        { heading: "Temel Kristal Yapılar", paragraphs: ["Metallerde üç temel kristal yapı gözlemlenir: Hacim Merkezli Kübik (HMK/BCC), Yüzey Merkezli Kübik (YMK/FCC) ve Sıkı Paket Hekzagonal (SPH/HCP).", "HMK yapı: α-demir (ferrit), krom, molibden. Sert ve kırılgan. YMK yapı: γ-demir (östenit), bakır, alüminyum, nikel. Sünek ve iyi şekillendirilebilir. SPH yapı: çinko, magnezyum. Sınırlı sürtünme."] },
        { heading: "Demir-Karbon Faz Diyagramı", paragraphs: ["Çelik ve dökme demir metalurjisinin temelini oluşturur. Yatay eksen karbon yüzdesi (%0-6.67), düşey eksen sıcaklıktır.", "Önemli fazlar: Ferrit (α-demir, yumuşak), Östenit (γ-demir, yüksek sıcaklık fazı), Sementit (Fe₃C, sert ve kırılgan), Perlit (ferrit + sementit karışımı)."], table: { headers: ["Faz", "Yapı", "Özellik"], rows: [["Ferrit", "HMK", "Yumuşak, manyetik, max %0.025 C"], ["Östenit", "YMK", "Sünek, amanyetik, max %2.06 C"], ["Sementit", "Ortorombik", "Çok sert, kırılgan, %6.67 C"], ["Perlit", "Lameller", "Ferrit + Sementit, %0.8 C"]] } },
        { heading: "Kritik Sıcaklıklar", paragraphs: ["A₁ (723°C): Ötektoid dönüşüm sıcaklığı. Perlit ↔ östenit dönüşümü. A₃: Hipoötektoid çeliklerde ferrit → östenit tamamlanma sıcaklığı. A_cm: Hiperötektoid çeliklerde sementit çözünme sıcaklığı.", "Isıl işlem (tavlama, sertleştirme, menevişleme) bu kritik sıcaklıklara göre planlanır."] }
      ],
      keyPoints: ["Çelik: %0-2.06 C, dökme demir: %2.06-6.67 C.", "Ötektoid çelik (%0.8 C) tamamen perlit yapıdadır.", "Kristal yapı değişimi (allotropik dönüşüm) ısıl işlemin temelini oluşturur."]
    },
    "Çelik türleri ve alaşım elementleri": {
      title: "Çelik Türleri ve Alaşım Elementleri",
      introduction: "Çelik, demir ile karbonun alaşımıdır. Karbon oranı ve eklenen alaşım elementleri çeliğin mekanik özelliklerini belirler.",
      sections: [
        { heading: "Karbon Çelikleri", paragraphs: ["Düşük karbonlu çelik (%0.05-0.25 C): Kaynak edilebilir, sünek. Gemi saçları, yapısal profiller.", "Orta karbonlu çelik (%0.25-0.60 C): Daha sert, mil ve dişli yapımında.", "Yüksek karbonlu çelik (%0.60-1.40 C): Çok sert, yay ve kesici takımlarda."] },
        { heading: "Alaşım Elementlerinin Etkileri", paragraphs: [], table: { headers: ["Element", "Etki", "Kullanım Alanı"], rows: [["Krom (Cr)", "Korozyon direnci, sertlik", "Paslanmaz çelik (>%12 Cr)"], ["Nikel (Ni)", "Tokluk, korozyon direnci", "Ostenitik paslanmaz çelik"], ["Molibden (Mo)", "Yüksek sıcaklık dayanımı", "Supap çelikleri, kazan boruları"], ["Mangan (Mn)", "Sertlik, aşınma direnci", "Hadfield çeliği (yüksek Mn)"], ["Vanadyum (V)", "İnce tane yapısı, sertlik", "Yüksek mukavemet çelikleri"]] } },
        { heading: "Paslanmaz Çelik Türleri", paragraphs: ["Ostenitik (304, 316): Amanyetik, mükemmel korozyon direnci. Boru hatları, tank iç yüzeyleri.", "Ferritik (430): Manyetik, orta korozyon direnci. Dekoratif uygulamalar.", "Martenzitik (410, 420): Sertleştirilebilir. Supap milleri, pompa şaftları.", "Dubleks: Yüksek mukavemet + korozyon direnci. Denizcilik uygulamaları."] }
      ],
      keyPoints: ["Denizcilik çelikleri genellikle AH, DH, EH, FH sınıflarındadır.", "316L paslanmaz çelik deniz suyu uygulamalarında tercih edilir.", "Alaşım elementleri kaynak kabiliyetini etkileyebilir (karbon eşdeğeri)."]
    },
    "Demir dışı metaller (bakır, alüminyum)": {
      title: "Demir Dışı Metaller",
      introduction: "Gemi yapım ve makine imalatında demir dışı metaller korozyon direnci, hafiflik veya özel fiziksel özellikler gerektiren yerlerde kullanılır.",
      sections: [
        { heading: "Bakır ve Alaşımları", paragraphs: ["Saf bakır: Yüksek elektrik ve ısıl iletkenlik. Elektrik kabloları, ısı eşanjör boruları.", "Pirinç (Cu-Zn): Korozyon direnci, işlenebilirlik. Valf gövdeleri, boru bağlantıları.", "Bronz (Cu-Sn): Yüksek aşınma direnci. Pervane, yatak burçları.", "Cupronickel (Cu-Ni 90/10, 70/30): Mükemmel deniz suyu direnci. Kondenser boruları, boru hatları."] },
        { heading: "Alüminyum ve Alaşımları", paragraphs: ["Denizcilik alüminyum alaşımları: 5083, 5086 (Mg alaşımlı) korozyon direnci yüksektir.", "Kullanım: Üst yapılar, sürat tekneleri, helikopter güvertesi.", "Avantajları: Hafiflik (çeliğin 1/3'ü), korozyon direnci. Dezavantajları: Düşük erime noktası (660°C), yangın riski, galvanik korozyon."] }
      ],
      keyPoints: ["Cupronickel 90/10 deniz suyu borularında standarttır.", "Alüminyum-çelik birleşiminde galvanik korozyon önlemi şarttır.", "Bronz pervaneler kavitasyon erozyonuna karşı dayanıklıdır."]
    },
    "Korozyon direnci ve korozyon tipleri": {
      title: "Korozyon Direnci ve Korozyon Tipleri",
      introduction: "Deniz ortamı korozyon için son derece agresiftir. Metalik yapıların ömrü, korozyon mekanizmalarının anlaşılması ve doğru koruma yöntemlerinin uygulanmasına bağlıdır.",
      sections: [
        { heading: "Korozyon Tipleri", paragraphs: [], table: { headers: ["Tip", "Mekanizma", "Örnek"], rows: [["Üniform (genel)", "Tüm yüzeyde eşit metal kaybı", "Boyasız çelik yüzeyler"], ["Galvanik", "Farklı metallerin teması", "Çelik-bronz bağlantı"], ["Çukurcuk (pitting)", "Lokal korozyon çukurları", "Paslanmaz çelikte klorür etkisi"], ["Erozyon-korozyon", "Akışkan hızı + korozyon", "Boru dirsekleri, pompa çarkları"], ["Gerilme korozyon çatlaması", "Gerilme + korozif ortam", "Kazan boruları, paslanmaz kaynak"], ["Aralık (crevice)", "Dar aralıklarda O₂ tükenmesi", "Flanş yüzeyleri, conta altları"]] } },
        { heading: "Korozyon Koruma Yöntemleri", paragraphs: [], bulletPoints: ["Katodik koruma: Anot yerleştirme (çinko, alüminyum) veya tatbiki akım (ICCP).", "Boya ve kaplama: Primer, antifouling, epoksi kaplama.", "Malzeme seçimi: Korozyon dirençli alaşımlar (CuNi, dubleks çelik).", "Çevre kontrolü: Inhibitör ekleme (soğutma suyu), pH kontrolü."] }
      ],
      keyPoints: ["Galvanik korozyon en yaygın gemi korozyon problemlerinden biridir.", "Anot ömrü periyodik olarak kontrol edilmelidir.", "Antifouling boyalar hem korozyonu hem biyolojik yapışmayı önler."]
    },
    "Isıl işlemler (tavlama, sertleştirme)": {
      title: "Isıl İşlemler",
      introduction: "Isıl işlem, metallerin mekanik özelliklerini kontrollü ısıtma ve soğutma ile değiştirme yöntemidir.",
      sections: [
        { heading: "Temel Isıl İşlem Türleri", paragraphs: [], table: { headers: ["İşlem", "Sıcaklık", "Soğutma", "Amaç"], rows: [["Tam tavlama", "A₃+30°C", "Fırında yavaş", "Yumuşatma, iç gerilim giderme"], ["Normalleştirme", "A₃+50°C", "Havada", "İnce tane yapısı, homojenlik"], ["Su verme (sertleştirme)", "A₃+30°C", "Su/yağda hızlı", "Martenzit oluşumu, maksimum sertlik"], ["Menevişleme", "150-650°C", "Havada", "Sertlik-tokluk dengesi, iç gerilim azaltma"], ["Gerilim giderme tavlaması", "550-650°C", "Yavaş", "Kaynak sonrası iç gerilim giderme"]] } },
        { heading: "Gemi Uygulamaları", paragraphs: ["Kaynak sonrası gerilim giderme tavlaması (PWHT) yüksek mukavemetli çelik birleşimlerde zorunlu olabilir. Supap milleri su verme + menevişleme ile sertleştirilir. Krank mili muylularına yüzey sertleştirme (indüksiyon veya nitrürleme) uygulanır."] }
      ],
      keyPoints: ["Su verme en hızlı soğutmadır ve en sert yapıyı (martenzit) oluşturur.", "Menevişleme her zaman su vermeden sonra yapılır.", "PWHT gerekliliği klas kuruluşu kurallarına göre belirlenir."]
    },
    "Denizcilik çelik standartları": {
      title: "Denizcilik Çelik Standartları",
      introduction: "Gemi yapımında kullanılan çeliklerin mekanik özellikleri ve kimyasal bileşimi uluslararası sınıflama kuruluşları (IACS) tarafından standartlaştırılmıştır.",
      sections: [
        { heading: "IACS Çelik Sınıfları", paragraphs: ["Gemi yapı çelikleri normal mukavemetli (A, B, D, E) ve yüksek mukavemetli (AH, DH, EH, FH) olmak üzere sınıflandırılır. Harfler düşük sıcaklıklarda darbe dayanımını (çentik tokluğu) ifade eder."], table: { headers: ["Sınıf", "Charpy Test Sıcaklığı", "Min. Akma (MPa)"], rows: [["A", "Yok", "235"], ["B", "0°C", "235"], ["D", "−20°C", "235"], ["E", "−40°C", "235"], ["AH32", "Yok", "315"], ["DH36", "−20°C", "355"], ["EH40", "−40°C", "390"]] } },
        { heading: "Seçim Kriterleri", paragraphs: ["Soğuk iklimde çalışan gemilerde D veya E sınıfı çelik kullanılır. Yüksek gerilmeli bölgelerde (makine dairesi temeli, ambar ağzı köşeleri) yüksek mukavemetli çelik tercih edilir."] }
      ],
      keyPoints: ["Her çelik levha üreticinin sertifikası (mill certificate) ile gelir.", "Karbon eşdeğeri (CE) kaynak kabiliyetini belirler; CE < 0.40 iyi kaynaklanabilir.", "Klas kuruluşu surveyörü çelik kalitesini doğrular."]
    },
    "Normal gerilme ve deformasyon": {
      title: "Normal Gerilme ve Deformasyon",
      introduction: "Gerilme, bir cismin birim alanına etki eden iç kuvvettir. Deformasyon ise gerilme sonucu oluşan şekil değişimidir. Mukavemet hesaplarının temelidir.",
      sections: [
        { heading: "Normal Gerilme (σ)", paragraphs: ["Kesit alanına dik etki eden kuvvet, normal gerilme oluşturur. Çekme (+) veya basma (−) olabilir."], formula: { expression: "σ = F / A", variables: ["σ: Normal gerilme (MPa = N/mm²)", "F: Eksenel kuvvet (N)", "A: Kesit alanı (mm²)"] }, example: { problem: "Çapı 50 mm olan bir çelik çubuğa 100 kN çekme kuvveti uygulanmaktadır. Gerilmeyi hesaplayınız.", steps: ["A = π/4 × 50² = 1963.5 mm²", "σ = F/A = 100000 / 1963.5 = 50.9 MPa"], result: "Çekme gerilmesi 50.9 MPa'dır." } },
        { heading: "Birim Uzama (ε)", paragraphs: ["Birim uzama, orijinal boya göre uzama miktarıdır: ε = ΔL / L₀. Boyutsuz bir büyüklüktür, genellikle yüzde (%) olarak ifade edilir."], diagram: { src: "/diagrams/machine/gerilme-gerinim.svg", alt: "Gerilme-Gerinim Diyagramı (Çelik)", caption: "Şekil: Çelik için tipik gerilme-gerinim eğrisi" } }
      ],
      keyPoints: ["Gerilme birimi: 1 MPa = 1 N/mm² = 10⁶ Pa.", "Güvenlik katsayısı ile emniyet gerilmesi belirlenir: σ_izin = σ_akma / n.", "Denizcilik uygulamalarında n = 2-4 arasında seçilir."]
    },
    "Hooke yasası ve elastiklik modülü": {
      title: "Hooke Yasası ve Elastiklik Modülü",
      introduction: "Hooke yasası, elastik bölgede gerilme ile birim uzama arasındaki doğrusal ilişkiyi tanımlar.",
      sections: [
        { heading: "Hooke Yasası", paragraphs: ["Elastik sınır içinde gerilme, birim uzamayla doğru orantılıdır."], formula: { expression: "σ = E × ε", variables: ["E: Elastiklik modülü (Young modülü) (GPa)", "Çelik için E ≈ 200-210 GPa", "Alüminyum için E ≈ 70 GPa", "Bakır için E ≈ 120 GPa"] }, example: { problem: "2 m boyundaki çelik bir çubuk 100 MPa gerilme altında ne kadar uzar? (E = 210 GPa)", steps: ["ε = σ/E = 100/210000 = 4.762 × 10⁻⁴", "ΔL = ε × L₀ = 4.762 × 10⁻⁴ × 2000 mm = 0.952 mm"], result: "Çubuk 0.95 mm uzar." } }
      ],
      keyPoints: ["Elastik sınırın ötesinde Hooke yasası geçerli değildir.", "E değeri malzemeye özgüdür ve sıcaklıkla hafifçe düşer.", "Yüksek E değeri = sert malzeme (az deformasyon)."]
    },
    "Eğilme gerilmesi ve moment hesabı": {
      title: "Eğilme Gerilmesi ve Moment Hesabı",
      introduction: "Eğilme gerilmesi, kirişlere enine yük uygulandığında kesit boyunca oluşan normal gerilmedir. Gemi yapısında omurga, kemere ve borda elemanları eğilme yüküne maruz kalır.",
      sections: [
        { heading: "Eğilme Formülü", paragraphs: ["Eğilme gerilmesi kesit boyunca doğrusal değişir; nötr eksende sıfır, üst ve alt yüzeylerde maksimumdur."], formula: { expression: "σ = M × y / I", variables: ["M: Eğilme momenti (N·mm)", "y: Nötr eksenden uzaklık (mm)", "I: Atalet momenti (mm⁴)"] }, example: { problem: "Dikdörtgen kesitli (60×100 mm) bir kirişe 5 kN·m eğilme momenti uygulanmaktadır. Maksimum eğilme gerilmesini bulunuz.", steps: ["I = bh³/12 = 60 × 100³/12 = 5 × 10⁶ mm⁴", "y_max = 100/2 = 50 mm", "σ = M×y/I = 5×10⁶ × 50 / (5×10⁶) = 50 MPa"], result: "Maksimum eğilme gerilmesi 50 MPa'dır." } }
      ],
      keyPoints: ["Nötr eksende gerilme sıfırdır.", "I değeri büyük olan kesitler eğilmeye daha dayanıklıdır.", "Gemi omurgasının eğilme momenti hogging ve sagging durumlarında hesaplanır."]
    },
    "Burulma gerilmesi": {
      title: "Burulma Gerilmesi",
      introduction: "Burulma, bir mile tork uygulandığında oluşan kayma gerilmesidir. Pervane şaftı, krank mili ve pompa milleri burulma yüküne maruz kalır.",
      sections: [
        { heading: "Burulma Formülü", paragraphs: ["Dairesel kesitli bir milde burulma gerilmesi:"], formula: { expression: "τ = T × r / J", variables: ["τ: Kayma gerilmesi (MPa)", "T: Tork (N·mm)", "r: Yarıçap (mm)", "J: Polar atalet momenti (mm⁴)", "İçi dolu mil: J = πd⁴/32"] }, example: { problem: "Çapı 200 mm olan bir pervane şaftına 150 kN·m tork uygulanmaktadır. Maksimum kayma gerilmesini bulunuz.", steps: ["J = π × 200⁴/32 = 157.08 × 10⁶ mm⁴", "r = 100 mm", "τ = T×r/J = 150×10⁶ × 100 / (157.08×10⁶) = 95.5 MPa"], result: "Maksimum kayma gerilmesi 95.5 MPa'dır." } }
      ],
      keyPoints: ["Gerilme merkezde sıfır, yüzeyde maksimumdur.", "İçi boş miller aynı ağırlıkta daha yüksek tork taşır.", "Pervane şaftı çapı IACS UR M68 kuralına göre hesaplanır."]
    },
    "Mil çapı hesabı (burulma ve eğilme)": {
      title: "Mil Çapı Hesabı",
      introduction: "Şaft tasarımında mil çapı, hem burulma hem eğilme yüklerini güvenle taşıyacak şekilde hesaplanır.",
      sections: [
        { heading: "Bileşik Yükleme", paragraphs: ["Gerçek çalışma koşullarında miller hem eğilme hem burulma yüküne aynı anda maruz kalır. Eşdeğer moment yöntemi veya Von Mises kriteri kullanılır."], formula: { expression: "d ≥ ³√(16/(π×τ_izin) × √(M² + T²))", variables: ["d: Mil çapı (mm)", "M: Eğilme momenti (N·mm)", "T: Tork (N·mm)", "τ_izin: İzin verilen kayma gerilmesi (MPa)"] }, example: { problem: "Bir pompa miline 2 kN·m eğilme momenti ve 5 kN·m tork etki etmektedir. τ_izin = 40 MPa ise gerekli mil çapını hesaplayınız.", steps: ["Te = √(M² + T²) = √(2² + 5²) × 10⁶ = √29 × 10⁶ = 5.385 × 10⁶ N·mm", "d = ³√(16Te/(π×τ)) = ³√(16 × 5.385×10⁶ / (π × 40))", "d = ³√(86.16×10⁶ / 125.66) = ³√(685700) = 88.1 mm"], result: "Minimum mil çapı 88 mm'dir; standart çap olarak 90 mm seçilir." } }
      ],
      keyPoints: ["Mil çapı hesabında dinamik yükler için güvenlik katsayısı eklenir.", "IACS kuralları pervane şaftı minimum çapını belirler.", "Şaft hizalama bozukluğu ek eğilme gerilmesi oluşturur."]
    },
    "Düz dişli hesapları": {
      title: "Düz Dişli Hesapları",
      introduction: "Dişli çarklar, güç ve hareketin iki mil arasında aktarılmasını sağlar. Düz dişliler en basit ve yaygın dişli tipidir.",
      sections: [
        { heading: "Temel Parametreler", paragraphs: [], table: { headers: ["Parametre", "Formül", "Açıklama"], rows: [["Modül (m)", "m = d/z", "Diş büyüklüğü ölçüsü"], ["Bölüm çapı (d)", "d = m × z", "Diş temasının olduğu çap"], ["Diş sayısı (z)", "z = d/m", "Çark üzerindeki diş adedi"], ["Eksen mesafesi (a)", "a = (d₁+d₂)/2", "İki mil merkezi arası"], ["Dişli oranı (i)", "i = z₂/z₁ = n₁/n₂", "Devir oranı"]] } },
        { heading: "Lewis Eğilme Gerilmesi", paragraphs: ["Diş dibi eğilme gerilmesi, dişin kırılma mukavemetini belirler."], formula: { expression: "σ = Ft / (b × m × Y)", variables: ["Ft: Teğetsel kuvvet (N)", "b: Diş genişliği (mm)", "m: Modül (mm)", "Y: Lewis form faktörü"] } }
      ],
      keyPoints: ["Küçük modül = küçük diş, pürüzsüz çalışma ancak düşük yük kapasitesi.", "Redüktör dişli çiftinde küçük dişli (pinion) daha hızlı aşınır.", "Gemi redüktörlerinde helisel dişliler sessiz çalışma sağlar."]
    },
    "Yorulma ömrü ve S-N eğrisi": {
      title: "Yorulma Ömrü ve S-N Eğrisi",
      introduction: "Yorulma, tekrarlı yükleme altında malzemenin statik dayanım sınırının çok altındaki gerilmelerde kırılmasıdır. Deniz makinelerinde pervane şaftı, krank mili ve biyel kolu gibi parçalarda yorulma kritik bir tasarım parametresidir.",
      sections: [
        { heading: "S-N Eğrisi (Wöhler Eğrisi)", paragraphs: ["Gerilme genliği (S) ile kırılmaya kadar çevrim sayısı (N) arasındaki ilişkiyi gösterir. Çelik için genellikle 10⁶-10⁷ çevrimde bir sınır değer (yorulma dayanımı / endurance limit) oluşur.", "Yorulma dayanımı çelikler için çekme dayanımının yaklaşık %40-50'si kadardır."] },
        { heading: "Yorulma Kırılmasını Etkileyen Faktörler", paragraphs: [], bulletPoints: ["Gerilme yoğunlaşması: Çentikler, delikler, keskin köşeler kırılmayı başlatır.", "Yüzey kalitesi: Pürüzlü yüzey yorulma ömrünü kısaltır.", "Boyut etkisi: Büyük parçalarda yorulma dayanımı düşer.", "Korozyon: Deniz ortamında yorulma dayanımı önemli ölçüde azalır (korozyon yorulması).", "Sıcaklık: Yüksek sıcaklık creep ile birleşerek ömrü kısaltır."] }
      ],
      keyPoints: ["Yorulma çatlağı genellikle yüzeyden başlar ve ilerler.", "Krank mili fillet radyüsleri gerilme yoğunlaşmasını azaltmak için kritiktir.", "Pervane şaftı korozyon yorulmasına karşı katodik koruma gerektirir."]
    },
    "Elektrik ark kaynağı (SMAW)": {
      title: "Elektrik Ark Kaynağı (SMAW)",
      introduction: "SMAW (Shielded Metal Arc Welding), örtülü elektrot kullanılarak yapılan en yaygın kaynak yöntemidir. Gemi onarımlarında sıklıkla kullanılır.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Elektrot ile iş parçası arasında oluşan elektrik arkı her iki metali eritir. Elektrot örtüsü erir ve koruyucu gaz ile cüruf oluşturarak kaynak banyosunu atmosferden korur.", "DC veya AC akımla çalışabilir. DC ters polarite (DCEP) daha derin nüfuziyet sağlar."] },
        { heading: "Elektrot Seçimi", paragraphs: [], table: { headers: ["AWS Kodu", "Örtü Tipi", "Pozisyon", "Uygulama"], rows: [["E6010", "Selülozik", "Tüm", "Boru kökü paso, iyi nüfuziyet"], ["E6013", "Rutil", "Tüm", "Genel amaçlı, kolay kullanım"], ["E7018", "Bazik (düşük H₂)", "Tüm", "Yüksek mukavemet, kritik birleşimler"]] } }
      ],
      keyPoints: ["E7018 elektrotu kritik gemi yapısal kaynaklarında tercih edilir.", "Bazik elektrotlar kullanım öncesi kurutma fırınında tutulmalıdır (nem → hidrojen çatlaması).", "Kaynak pozisyonu (düz, yatay, düşey, tavan) elektrot ve parametre seçimini etkiler."]
    },
    "Kaynak hataları ve muayene yöntemleri": {
      title: "Kaynak Hataları ve Muayene Yöntemleri",
      introduction: "Kaynak birleşimlerinin kalitesi gemi yapısal bütünlüğü için kritiktir. Hatalar mekanik dayanımı düşürür ve çatlak başlangıç noktası oluşturabilir.",
      sections: [
        { heading: "Yaygın Kaynak Hataları", paragraphs: [], table: { headers: ["Hata", "Nedeni", "Etkisi"], rows: [["Gözeneklilik (porosity)", "Gaz hapsolması, nemli elektrot", "Dayanım düşüşü"], ["Cüruf kapanması", "Yetersiz cüruf temizliği", "Gerilme yoğunlaşması"], ["Çatlak", "Hızlı soğuma, hidrojen, gerilme", "En tehlikeli hata"], ["Nüfuziyet eksikliği", "Düşük akım, yanlış teknik", "Mekanik dayanım kaybı"], ["Yanma oluğu (undercut)", "Yüksek akım, hızlı ilerleme", "Çentik etkisi"]] } },
        { heading: "NDT Yöntemleri", paragraphs: [], bulletPoints: ["Görsel muayene (VT): İlk ve en temel kontrol.", "Ultrasonik muayene (UT): İç hataları tespit eder, kalınlık ölçümü.", "Radyografik muayene (RT): X-ışını veya gama ışını ile film üzerinde görüntüleme.", "Manyetik parçacık (MT): Yüzey ve yüzeye yakın çatlaklar.", "Sıvı penetrant (PT): Yüzey çatlakları, gözenekler."] }
      ],
      keyPoints: ["Çatlak en tehlikeli kaynak hatası olup her zaman tamir gerektirir.", "Klas kuruluşu kritik birleşimlerde %100 RT veya UT isteyebilir.", "NDT operatörleri sertifikalı (SNT-TC-1A veya ISO 9712) olmalıdır."]
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // YAKIT TEKNOLOJİSİ VE YÖNETİMİ
  // ═══════════════════════════════════════════════════════════════
  "fuel-technology": {
    "HFO (Heavy Fuel Oil) özellikleri": {
      title: "HFO (Heavy Fuel Oil) Özellikleri",
      introduction: "HFO, ham petrolün rafinaj artığından elde edilen, yüksek viskoziteli ve düşük maliyetli deniz yakıtıdır. Büyük deniz dizel motorlarının geleneksel yakıtıdır.",
      sections: [
        { heading: "Fiziksel Özellikler", paragraphs: ["HFO yüksek viskoziteye sahiptir (genellikle 180-380 cSt @ 50°C). Kullanım öncesi 130-150°C'ye ısıtılarak viskozitesi 10-15 cSt'ye düşürülmelidir.", "Yoğunluğu 0.96-0.99 kg/L aralığındadır. Yüksek yoğunluk separatörde su ayrımını zorlaştırır."], table: { headers: ["Parametre", "Tipik Değer", "ISO 8217 Limiti (RMG 380)"], rows: [["Viskozite (50°C)", "300-380 cSt", "Max 380 cSt"], ["Yoğunluk (15°C)", "0.975-0.991 kg/L", "Max 0.991 kg/L"], ["Kükürt", "%1.0-3.5", "Bölgeye göre"], ["Flash point", "> 60°C", "Min 60°C"], ["Su", "%0.2-0.5", "Max 0.5%"], ["Al+Si", "30-60 ppm", "Max 60 ppm"]] } },
        { heading: "HFO Yakıt Hazırlama Sistemi", paragraphs: ["HFO, motorlarda kullanılabilmesi için çok aşamalı bir hazırlama sürecinden geçer. Bu süreç; depolama, çöktürme, arıtma (purifier), servis tankı, ısıtma, viskozite kontrolü ve filtreleme adımlarından oluşur."], diagram: { src: "/diagrams/machine/yakit-sistemi.svg", alt: "HFO Yakıt Sistemi Akış Şeması", caption: "Şekil: HFO yakıt hazırlama süreci – Bunker'dan motora" } },
        { heading: "Kullanım Sorunları", paragraphs: ["Katalizör ince parçacıkları (Al+Si) aşınma yapar; purifier ile uzaklaştırılmalıdır. Asfaltenler yakıt filtrelerini tıkayabilir. Uyumsuz yakıtların karıştırılması sludge oluşumuna neden olur."] }
      ],
      keyPoints: ["2020 sonrası scrubber'sız gemilerde HFO (>%0.50 S) kullanılamaz.", "Yakıt ısıtma sistemi arızası motor durdurma sebebidir.", "HFO depolama sıcaklığı pour point'in üzerinde tutulmalıdır."]
    },
    "VLSFO (Very Low Sulphur Fuel Oil)": {
      title: "VLSFO (Very Low Sulphur Fuel Oil)",
      introduction: "VLSFO, 2020 IMO kükürt düzenlemesi sonrası yaygınlaşan, kükürt oranı %0.50'nin altındaki deniz yakıtıdır.",
      sections: [
        { heading: "Özellikler", paragraphs: ["VLSFO, farklı rafinaj ürünlerinin harmanlanmasıyla üretilir. Viskozitesi HFO'dan düşüktür (genellikle 20-200 cSt @ 50°C). Stabilite ve uyumluluk sorunları HFO'ya göre daha sık görülür.", "Bazı VLSFO'lar parafenik yapıda olup yüksek pour point'e sahiptir; uygun ısıtma gerektirir. Bazıları ise aromatik yapıda olup uyumsuzluk riski taşır."] },
        { heading: "Operasyonel Zorluklar", paragraphs: [], bulletPoints: ["Uyumluluk: Farklı VLSFO partilerinin karıştırılması sludge oluşturabilir (spot test önerilir).", "Cat fines: HFO'ya göre düşük ancak yine de purifier performansı kritiktir.", "Silindir yağı TBN: Düşük kükürtlü yakıtta düşük TBN'li (25-40) silindir yağı kullanılır.", "Viskozite: Geniş aralıkta değişir; viskozimetre ile sürekli izleme önerilir."] }
      ],
      keyPoints: ["VLSFO yakıt uyumluluk testi (spot test) farklı partilerde mutlaka yapılmalıdır.", "Düşük kükürt = düşük TBN silindir yağı gereksinimi.", "Bazı VLSFO'lar düşük viskozitede olduğundan ısıtma gerektirmeyebilir."]
    },
    "MGO ve MDO ayrımı": {
      title: "MGO ve MDO Ayrımı",
      introduction: "MGO (Marine Gas Oil) ve MDO (Marine Diesel Oil) düşük viskoziteli distilat yakıtlardır.",
      sections: [
        { heading: "Karşılaştırma", paragraphs: [], table: { headers: ["Özellik", "MGO (DMA)", "MDO (DMB)"], rows: [["Viskozite (40°C)", "2-6 cSt", "2-11 cSt"], ["Kükürt", "<%0.10", "<%0.50"], ["Artık bileşen", "Yok", "Az miktarda olabilir"], ["Fiyat", "En yüksek", "Orta"], ["Kullanım", "ECA bölgeleri, limanlar", "Genel operasyon"]] } },
        { heading: "Kullanım Alanları", paragraphs: ["ECA bölgelerine girişte MGO'ya geçiş yapılır. Yardımcı dizel jeneratörlerin bir kısmı MGO ile çalıştırılır. Acil jeneratör genellikle MDO veya MGO ile çalışır."] }
      ],
      keyPoints: ["MGO düşük viskozitesi nedeniyle yakıt pompası aşınmasına neden olabilir.", "HFO → MGO geçişinde kademeli sıcaklık düşürme yapılmalıdır.", "MGO düşük sülfür içeriği nedeniyle yağlama kapasitesi zayıftır."]
    },
    "ISO 8217 yakıt standartları": {
      title: "ISO 8217 Yakıt Standartları",
      introduction: "ISO 8217, deniz yakıtlarının kalite parametrelerini tanımlayan uluslararası standarttır.",
      sections: [
        { heading: "Yakıt Sınıflandırması", paragraphs: ["Distilat yakıtlar DMA, DMB, DMC olarak; artık yakıtlar RMA, RMB, RMD, RME, RMG, RMK olarak sınıflandırılır.", "Her sınıf için viskozite, yoğunluk, flash point, su, kükürt, Al+Si, vanadyum gibi parametrelerin limit değerleri belirlenir."] },
        { heading: "Temel Parametre Limitleri (RMG 380)", paragraphs: [], table: { headers: ["Parametre", "Limit"], rows: [["Viskozite (50°C)", "Max 380 cSt"], ["Yoğunluk (15°C)", "Max 991.0 kg/m³"], ["Flash point", "Min 60°C"], ["Pour point (kış/yaz)", "Max 30°C"], ["Su", "Max 0.50% v/v"], ["Al+Si", "Max 60 mg/kg"], ["Vanadyum", "Max 350 mg/kg"], ["Toplam sediment", "Max 0.10% m/m"]] } }
      ],
      keyPoints: ["Bunker alımında ISO 8217 referans alınır.", "BDN (Bunker Delivery Note) yakıtın ISO sınıfını belirtmelidir.", "Uyumsuz yakıt motor hasarına neden olabilir; analiz raporu beklenmeden kullanım risklidir."]
    },
    "Viskozite ve sıcaklık ilişkisi": {
      title: "Viskozite ve Sıcaklık İlişkisi",
      introduction: "Yakıt viskozitesi sıcaklıkla ters orantılı olarak değişir. Doğru enjeksiyon viskozitesi motor performansı için kritiktir.",
      sections: [
        { heading: "Viskozite Kontrolü", paragraphs: ["HFO enjeksiyon viskozitesi genellikle 10-15 cSt olmalıdır. Bu değeri sağlamak için yakıt 130-150°C'ye ısıtılır.", "Viskozimetre (viscotherm) sürekli olarak viskoziteyi ölçer ve ısıtıcı buhar valfini otomatik ayarlar."], formula: { expression: "Enjeksiyon sıcaklığı, yakıtın viskozite-sıcaklık grafiğinden belirlenir", variables: ["Hedef viskozite: 10-15 cSt (motor üreticisi önerisine göre)"] } },
        { heading: "Viskozite Ölçüm Yöntemleri", paragraphs: ["Kinematik viskozite (cSt = mm²/s): Laboratuvarda capillary viskozimetre ile ölçülür.", "Dinamik viskozite (cP = mPa·s): Kinematik viskozite × yoğunluk.", "Gemi üzerinde online viskozimetre sürekli izleme sağlar."] }
      ],
      keyPoints: ["Yetersiz ısıtma: Kötü atomizasyon, eksik yanma, karbon birikimi.", "Aşırı ısıtma: Gaz oluşumu, pompa kavitasyonu riski.", "Yakıt değişimi sırasında viskozite geçişi kademeli yapılmalıdır."]
    },
    "Settling tank ve servis tank": {
      title: "Settling Tank ve Servis Tank",
      introduction: "Yakıt depolama ve arıtma sistemi, yakıtın motorlara temiz ve uygun koşullarda ulaşmasını sağlar.",
      sections: [
        { heading: "Settling Tank", paragraphs: ["Bunker tanklarından alınan yakıt ilk olarak settling tank'a aktarılır. Burada yer çekimi etkisiyle su ve ağır partiküller dibe çöker.", "Sıcaklık HFO için 60-70°C'de tutulur. Bekleme süresi en az 24 saat önerilir. Tank altındaki drain valfinden periyodik olarak su ve sludge boşaltılır."] },
        { heading: "Servis Tank (Day Tank)", paragraphs: ["Purifier çıkışından gelen arıtılmış yakıt servis tankına aktarılır. Motor yakıt sistemi buradan beslenir.", "SOLAS gereği en az 8 saatlik yakıt kapasitesine sahip olmalıdır. Otonom sensörler ile su algılama ve alarm sistemi bulunur."] }
      ],
      keyPoints: ["Settling tank sıcaklığı yakıtın pour point'inin üzerinde tutulmalıdır.", "Servis tank seviyesi düşük alarm seviyesinin altına düşürülmemelidir.", "Tanklar arasında uyumsuz yakıtların karıştırılması önlenmelidir."]
    },
    "Bunker planlama ve sipariş": {
      title: "Bunker Planlama ve Sipariş",
      introduction: "Bunker operasyonu, geminin yakıt ihtiyacının planlanması, siparişi, alımı ve kalite kontrolünü kapsayan kritik bir süreçtir.",
      sections: [
        { heading: "Planlama", paragraphs: ["Sefer planına göre yakıt tüketimi hesaplanır: Tüketim = SFOC × Güç × Süre. Güvenlik payı (%10-15), kötü hava payı ve bekleme süreleri eklenir.", "ECA bölgeleri için düşük kükürtlü yakıt miktarı ayrıca planlanır."], formula: { expression: "Gerekli yakıt (ton) = SFOC (g/kWh) × Güç (kW) × Süre (h) / 10⁶ + Güvenlik payı", variables: [] }, example: { problem: "Ana motor 8000 kW'ta 12 gün seyir edecek, SFOC = 175 g/kWh. %15 güvenlik payı ile gerekli yakıt miktarını hesaplayınız.", steps: ["Süre = 12 × 24 = 288 saat", "Yakıt = 175 × 8000 × 288 / 10⁶ = 403.2 ton", "Güvenlik payı dahil = 403.2 × 1.15 = 463.7 ton"], result: "Yaklaşık 464 ton HFO siparişi verilmelidir." } }
      ],
      keyPoints: ["Bunker miktarı stability hesaplarını etkiler.", "Yakıt alım limanı fiyat, kalite ve lojistik açıdan değerlendirilir.", "Sipariş öncesi mevcut yakıtla uyumluluk kontrol edilmelidir."]
    },
    "Bunker Delivery Note (BDN)": {
      title: "Bunker Delivery Note (BDN)",
      introduction: "BDN, yakıt tedarikçisinin gemiye teslim ettiği yakıtın miktarını, özelliklerini ve MARPOL uyumunu belgeleyen resmi dokümandır.",
      sections: [
        { heading: "BDN İçeriği", paragraphs: ["MARPOL Annex VI Reg. 18 gereği BDN aşağıdaki bilgileri içermelidir:"], bulletPoints: ["Tedarikçi adı ve adresi", "Gemi adı, IMO numarası, bayrak", "Teslim tarihi, limanı ve miktarı", "Yakıt tanımı (ISO 8217 sınıfı)", "Kükürt içeriği (%m/m)", "Yoğunluk (15°C)", "Tedarikçi beyanı (MARPOL Annex VI uyumu)"] },
        { heading: "Saklama ve Kontrol", paragraphs: ["BDN, yakıt numunesiyle birlikte teslim tarihinden itibaren en az 3 yıl gemide saklanmalıdır.", "MARPOL numunesi mühürlü şişede 400 mL olarak alınır ve üzerine gemi/tedarikçi temsilcisi imzası atılır. Port State Control denetimlerinde yakıt numunesi ve BDN kontrol edilir."] }
      ],
      keyPoints: ["BDN olmadan yakıt alımı MARPOL ihlalidir.", "Numune en az 3 yıl saklanır.", "BDN ile analiz raporu arasındaki tutarsızlık raporlanmalıdır."]
    },
    "Yakıt numunesi alma prosedürü": {
      title: "Yakıt Numunesi Alma Prosedürü",
      introduction: "Yakıt numunesi, teslim edilen yakıtın kalitesini doğrulamak ve olası uyuşmazlıklarda kanıt sağlamak amacıyla alınır.",
      sections: [
        { heading: "Numune Tipleri", paragraphs: [], table: { headers: ["Numune Tipi", "Amaç", "Miktar"], rows: [["MARPOL numunesi", "Kükürt doğrulaması (PSC)", "Min 400 mL, mühürlü"], ["Tedarikçi numunesi", "Kalite analizi", "2-5 litre"], ["Gemi numunesi", "Bağımsız analiz", "2-5 litre"], ["Karşılaştırma numunesi", "Uyuşmazlık çözümü", "2-5 litre"]] } },
        { heading: "Alma Yöntemi", paragraphs: ["Numune, manifold hattına bağlı sürekli damlama (drip sampling) yöntemi ile tüm bunker operasyonu boyunca alınmalıdır. Nokta numune (spot sample) yalnızca drip mümkün olmadığında kabul edilir.", "Numune şişesi etiketlenir, her iki taraf (gemi/tedarikçi) imzalar ve mühürlenir."] }
      ],
      keyPoints: ["MARPOL numunesi düzenleyici otorite tarafından talep edilebilir.", "Drip sampling en temsili sonucu verir.", "Numuneler direkt güneş ışığından korunarak saklanır."]
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // MAKİNE DAİRESİ OPERASYONLARI
  // ═══════════════════════════════════════════════════════════════
  "engine-room-ops": {
    "Ana makine seyir hazırlık prosedürü": {
      title: "Ana Makine Seyir Hazırlık Prosedürü",
      introduction: "Ana makinenin seyir için hazırlanması, sistematik kontrol ve testleri içeren kritik bir operasyondur. Yetersiz hazırlık motor arızası veya gecikmeye neden olabilir.",
      sections: [
        { heading: "Hazırlık Adımları", paragraphs: ["Kalkıştan en az 2-4 saat önce hazırlık başlatılır. Süre motor tipine ve boyutuna göre değişir."], bulletPoints: ["Yağlama yağı seviye ve basınç kontrolü; ön yağlama pompası çalıştırılır.", "Soğutma suyu (HT ve LT) seviye kontrolü, pompalar devreye alınır.", "Yakıt sistemi kontrolü: servis tank seviyesi, filtreler, viskozite ayarı.", "Silindir yağlama sistemi çalıştırılır (iki zamanlı motorlarda).", "Turboşarj yardımcı üfleyici (auxiliary blower) devreye alınır.", "Başlatma havası basıncı kontrol edilir (≥ 25 bar).", "Gösterge musluklarından silindirler havalandırılır (turning gear ile).", "Turning gear devreye alınarak motor yavaşça döndürülür (minimum 1 tam tur).", "Turning gear çıkarılır ve interlock kontrol edilir.", "Kontrol sistemi (telegraph, remote/local seçim) test edilir.", "Dümen sistemi ve manevra testi yapılır."] },
        { heading: "Sıcak Bekleme (Stand-by)", paragraphs: ["Köprüüstünden stand-by komutu geldiğinde motor manevra moduna alınır. Telgraf cevapları doğrulanır, motor ileri ve geri yönde deneme çalıştırması yapılır.", "Stand-by süresince tüm parametreler yakından izlenir ve anomaliler raporlanır."] }
      ],
      keyPoints: ["Turning gear çıkarılmadan motor asla çalıştırılmamalıdır.", "Gösterge musluklarından su veya yağ geliyorsa nedeni araştırılmalıdır.", "Hazırlık kontrol listesi (checklist) kullanılmalı ve imzalanmalıdır."]
    },
    "Makine vardiyası devir-teslim": {
      title: "Makine Vardiyası Devir-Teslim",
      introduction: "Makine vardiya devir-teslimi, gelen ve giden vardiya mühendisleri arasında bilgi aktarımını sağlayan yapılandırılmış bir prosedürdür.",
      sections: [
        { heading: "Devir-Teslim İçeriği", paragraphs: ["Giden vardiya mühendisi, gelen vardiyaya aşağıdaki bilgileri aktarır:"], bulletPoints: ["Ana makine ve jeneratörlerin çalışma durumu ve parametreleri.", "Devam eden bakım veya onarım işleri.", "Anormal durumlar, alarm geçmişi ve yapılan müdahaleler.", "Balast, yakıt ve tatlı su transfer operasyonları.", "Köprüüstünden alınan özel talimatlar (hız değişikliği, yakıt değişimi vb.).", "Sonraki limana tahmini varış süresi ve beklenen operasyonlar."] },
        { heading: "Kontrol Turu", paragraphs: ["Gelen vardiyacı, devir-teslim öncesinde veya hemen sonrasında makine dairesinde kapsamlı bir kontrol turu (round) yapmalıdır. Bu turda ekipman sesleri, sıcaklıklar, sızıntılar ve seviyeler kontrol edilir.", "Devir-teslim, Engine Log Book'a kaydedilir ve her iki mühendis tarafından imzalanır."] }
      ],
      keyPoints: ["Devir-teslim asla telefon veya interkom ile yapılmamalıdır.", "Anormal durumlar açık ve net biçimde aktarılmalıdır.", "Gelen vardiyacı bilgi aldığı konuları anladığını teyit etmelidir."]
    },
    "Performans parametreleri izleme": {
      title: "Performans Parametreleri İzleme",
      introduction: "Motor ve ekipman performansının sürekli izlenmesi, erken arıza tespiti ve verimli operasyon için gereklidir.",
      sections: [
        { heading: "İzlenen Parametreler", paragraphs: [], table: { headers: ["Parametre", "Tipik Aralık", "Sapma Anlamı"], rows: [["Egzoz sıcaklığı (silindir başına)", "350-450°C", "Yüksek: enjektör/ring arızası"], ["Süpürme havası basıncı", "1.5-3.5 bar", "Düşük: turboşarj/filtre"], ["Soğutma suyu sıcaklığı (çıkış)", "80-85°C", "Yüksek: termostat/pompa"], ["Yağlama yağı basıncı", "3-5 bar", "Düşük: yatak aşınması/pompa"], ["SFOC", "165-185 g/kWh", "Yüksek: kötü yanma/timing"], ["Turboşarj devri", "Nominal ±5%", "Düşük: fouling/surging"]] } },
        { heading: "Trend Analizi", paragraphs: ["Anlık değerler kadar zaman içindeki trend de önemlidir. Egzoz sıcaklığının haftalık artış trendi yaklaşan enjektör arızasını, SFOC artışı ise verim kaybını gösterir.", "Modern gemilerde performans izleme yazılımları otomatik trend grafikleri oluşturur."] }
      ],
      keyPoints: ["Silindirler arası egzoz sıcaklık farkı 50°C'yi geçmemelidir.", "Performans verileri düzenli olarak kaydedilmeli ve analiz edilmelidir.", "Ani parametre değişiklikleri acil müdahale gerektirebilir."]
    },
    "Blackout ve güç geri kazanımı": {
      title: "Blackout ve Güç Geri Kazanımı",
      introduction: "Blackout, geminin tüm elektrik gücünü kaybetmesi durumudur. Ciddi bir acil durum olup hızlı ve düzenli müdahale gerektirir.",
      sections: [
        { heading: "Blackout Nedenleri", paragraphs: [], bulletPoints: ["Çalışan jeneratörün aşırı yüklenmesi ve trip etmesi.", "Yakıt sistemi arızası (hava girişi, filtre tıkanması).", "Soğutma suyu kaybı → otomatik durdurma.", "Yağlama yağı basınç düşüşü → otomatik durdurma.", "Elektrik arızası (kısa devre, toprak kaçağı).", "Otomasyon sistemi hatası."] },
        { heading: "Güç Geri Kazanım Prosedürü", paragraphs: ["Blackout anında navigasyon ve acil aydınlatma akü beslemeli UPS'ten sağlanır. Dümen sistemi acil güç ile çalışır."], bulletPoints: ["Sakin kal, durumu köprüüstüne bildir.", "Makine dairesine in (karanlıkta acil aydınlatma mevcut).", "Jeneratör trip nedenini araştır ve gider.", "Bir jeneratörü manual olarak başlat ve baraya al.", "Kritik ekipmanları sırasıyla devreye al (dümen pompası, yağlama, soğutma).", "Ana makineyi tekrar çalıştır ve seyir durumuna dön.", "Tüm süreci Engine Log Book'a kaydet."] }
      ],
      keyPoints: ["Blackout tatbikatı SOLAS gereği periyodik olarak yapılmalıdır.", "Acil jeneratör 45 saniye içinde otomatik devreye girmelidir.", "Preferential trip sistemi blackout'u önleyen ilk savunma hattıdır."]
    },
    "Manevra modu geçiş prosedürü": {
      title: "Manevra Modu Geçiş Prosedürü",
      introduction: "Liman yaklaşımı ve dar kanal seyri gibi durumlarda ana makine manevra moduna alınır. Bu modda hız değişiklikleri ve geri yol komutlarına hızlı yanıt verilmesi beklenir.",
      sections: [
        { heading: "Geçiş Prosedürü", paragraphs: [], bulletPoints: ["Köprüüstünden manevra talebi geldiğinde, ikinci jeneratör devreye alınır.", "Yakıt sistemi kontrolü: HFO'dan MDO/MGO'ya geçiş gerekiyorsa başlatılır.", "Yardımcı üfleyiciler (auxiliary blowers) devreye alınır.", "Turning gear interlocking kontrol edilir.", "Başlatma havası basıncı ≥ 25 bar doğrulanır.", "Ana makine slow ahead/astern test edilir.", "Dümen testleri yapılır (hard port, hard starboard).", "Manevra hazır raporu köprüüstüne verilir."] }
      ],
      keyPoints: ["Manevra modunda makine dairesinde sürekli nöbet tutulur.", "MGO'ya geçiş ECA bölgelerine girişte zorunlu olabilir.", "Acil durma ve geri yol zamanları test edilmeli ve kayıt altına alınmalıdır."]
    },
    "Acil durma ve geri yol": {
      title: "Acil Durma ve Geri Yol",
      introduction: "Acil durma (emergency stop) ve acil geri yol (crash astern) komutları çarpışma riski gibi kritik durumlarda verilir.",
      sections: [
        { heading: "Acil Durma", paragraphs: ["Ana makineye yakıt kesilerek motor durdurulur. İki zamanlı motorlarda krank mili kısa sürede durur; dört zamanlı motorlarda atalet nedeniyle biraz daha uzun sürer.", "Acil durma butonu köprüüstü ve makine dairesinde bulunur."] },
        { heading: "Acil Geri Yol (Crash Astern)", paragraphs: ["İki zamanlı motorlarda: Motor durdurulur → starting air ile ters yönde çevrilerek çalıştırılır. Toplam süre 15-30 saniye.", "Dört zamanlı CPP gemilerde: Motor devri sabit, pervane hatvesi negatife çevrilir. Daha hızlı tepki.", "Crash astern sırasında turboşarj devrinin düşmesi nedeniyle yardımcı üfleyiciler otomatik devreye girer."] }
      ],
      keyPoints: ["Crash astern, motor ve şaft hattına büyük mekanik yük bindirir.", "Deniz testlerinde crash astern süresi ölçülür ve kayıt edilir.", "SOLAS gereği pervane tam ileri → tam geri süresi belgelenir."]
    },
    "Makine dairesi yangını": {
      title: "Makine Dairesi Yangını",
      introduction: "Makine dairesi yangını, gemideki en tehlikeli acil durumlardan biridir. Yakıt sızıntısı, yağ buharı ve elektrik arçları en yaygın tutuşma kaynaklarıdır.",
      sections: [
        { heading: "İlk Müdahale", paragraphs: [], bulletPoints: ["Yangın alarmını çal ve köprüüstüne bildir.", "Yangının boyutuna göre portatif söndürücü ile ilk müdahaleyi yap.", "Yakıt hızlı kapama valflerini kapat (quick closing valves).", "Havalandırma fanlarını durdur ve damperleri kapat.", "Yangın kontrolden çıkıyorsa tahliye et ve su geçirmez kapıları kapat."] },
        { heading: "Sabit Söndürme Sistemi", paragraphs: ["Makine dairesi tahliye edildikten ve tüm personel sayıldıktan sonra CO₂ veya FM200 (HFC-227ea) sabit söndürme sistemi devreye alınabilir.", "CO₂ sistemi devreye alınmadan önce: tüm personel dışarıda, tüm kapı ve havalandırma kapalı, uyarı alarmı verilmiş olmalıdır."] }
      ],
      keyPoints: ["Quick closing valve testi periyodik olarak yapılmalıdır.", "CO₂ boşaltma öncesi personel sayımı hayati önem taşır.", "Yakıt sızıntılarının sıcak yüzeylere teması en yaygın yangın nedenidir."]
    },
    "Engine room check list": {
      title: "Engine Room Check List",
      introduction: "Makine dairesi kontrol listeleri, operasyonel güvenliği ve prosedüre uyumu sağlayan standart dokümanlardır.",
      sections: [
        { heading: "Temel Kontrol Listeleri", paragraphs: [], bulletPoints: ["Seyir hazırlık kontrol listesi (Departure Checklist)", "Manevra kontrol listesi", "Makine dairesi terk kontrol listesi (UMS geçiş)", "Acil durum kontrol listeleri (yangın, blackout, su sızıntısı)", "Bunker operasyonu kontrol listesi", "Bakım öncesi güvenlik kontrol listesi (Lock Out/Tag Out)"] },
        { heading: "Kullanım Prensibi", paragraphs: ["Her madde ilgili personel tarafından fiziksel olarak kontrol edilir ve imzalanır. Kontrol listesi prosedürün yerini almaz, prosedürün tamamlandığının kanıtıdır.", "ISM Code, güvenlik kritik operasyonlar için kontrol listesi kullanımını zorunlu kılar."] }
      ],
      keyPoints: ["Kontrol listeleri sadece imzalanmak için değil, gerçekten kontrol yapmak için kullanılır.", "Eksik veya geçiştirilen maddeler ciddi sonuçlara yol açabilir.", "Kontrol listeleri periyodik olarak gözden geçirilir ve güncellenir."]
    },
    "UMS (Unmanned Machinery Space) operasyonu": {
      title: "UMS Operasyonu",
      introduction: "UMS, makine dairesinin belirli saatlerde insansız olarak çalıştırılmasını mümkün kılan otomasyon sistemi ve operasyonel düzenidir.",
      sections: [
        { heading: "UMS Gereklilikleri", paragraphs: [], bulletPoints: ["Alarm ve izleme sistemi: Tüm kritik parametreler izlenir ve alarmlar makine mühendisinin kamarasına ve köprüüstüne iletilir.", "Otomatik yavaşlama ve durdurma: Kritik arızalarda motor otomatik olarak yavaşlar veya durur.", "Yangın algılama ve söndürme: Otomatik algılama, manuel veya otomatik söndürme.", "Çift güç kaynağı: Alarm sisteminin bağımsız güç beslemesi.", "Uzaktan başlatma: Jeneratör uzaktan çalıştırılabilmeli."] },
        { heading: "UMS Geçiş Prosedürü", paragraphs: ["Makine dairesi terk edilmeden önce kapsamlı bir kontrol turu yapılır, tüm sistemler izlenir, alarm sistemi test edilir ve UMS kontrol listesi tamamlanır.", "Nöbetçi mühendis taşınabilir alarm cihazını yanına alır ve çağrılabilir durumda olur."] }
      ],
      keyPoints: ["UMS notasyonu klas kuruluşu tarafından verilir.", "Alarm cihazı 'dead man alarm' (hareketsizlik alarmı) içerir.", "UMS modunda bile makine dairesi düzenli aralıklarla kontrol edilmelidir."]
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // MAKİNE DAİRESİ GÜVENLİĞİ
  // ═══════════════════════════════════════════════════════════════
  "engine-room-safety": {
    "Kişisel koruyucu donanım (KKD) türleri": {
      title: "Kişisel Koruyucu Donanım (KKD) Türleri",
      introduction: "Makine dairesinde çalışan personel, çeşitli fiziksel ve kimyasal tehlikelere maruz kalır. KKD kullanımı son savunma hattıdır.",
      sections: [
        { heading: "KKD Kategorileri", paragraphs: [], table: { headers: ["KKD Tipi", "Koruma Sağladığı Tehlike", "Standart"], rows: [["Baret", "Düşen cisim, çarpma", "EN 397"], ["Kulak koruyucu", "Gürültü (>85 dBA)", "EN 352"], ["Koruyucu gözlük/yüzlük", "Kıvılcım, kimyasal sıçrama", "EN 166"], ["Koruyucu eldiven", "Isı, kimyasal, kesik", "EN 388/407"], ["Güvenlik ayakkabısı", "Düşen cisim, kayma", "EN ISO 20345"], ["Tulum/iş elbisesi", "Isı, kıvılcım, kimyasal", "EN ISO 11612"], ["Güvenlik kemeri", "Yüksekten düşme", "EN 361"]] } },
        { heading: "Makine Dairesi Zorunlu KKD", paragraphs: ["Makine dairesine girerken minimum olarak: baret, koruyucu gözlük, kulak koruyucu, güvenlik ayakkabısı ve uygun iş elbisesi giyilmelidir.", "İşe özel ek KKD (örn. kaynak maskesi, kimyasal eldiven, solunum koruyucu) risk değerlendirmesine göre belirlenir."] }
      ],
      keyPoints: ["KKD son savunma hattıdır; önce mühendislik kontrolü uygulanmalıdır.", "Hasarlı veya süresi dolmuş KKD kullanılmamalıdır.", "KKD kullanımı ISM Code ve şirket SMS prosedürlerince zorunludur."]
    },
    "Yangın üçgeni ve yangın sınıfları": {
      title: "Yangın Üçgeni ve Yangın Sınıfları",
      introduction: "Yangın, yanıcı madde, oksijen ve ısının (tutuşma kaynağı) birleşmesiyle oluşur. Bu üç unsur 'yangın üçgeni' olarak bilinir.",
      sections: [
        { heading: "Yangın Üçgeni", paragraphs: ["Yangın üçgeninin herhangi bir kenarı kaldırılırsa yangın söner: yakıt kesilir (quick closing valve), oksijen kesilir (CO₂, köpük) veya sıcaklık düşürülür (su)."], diagram: { src: "/diagrams/machine/yangin-ucgeni.svg", alt: "Yangın Üçgeni - Isı, Yakıt, Oksijen", caption: "Şekil: Yangın üçgeni – üç unsurun birleşimi" } },
        { heading: "Yangın Sınıfları", paragraphs: [], table: { headers: ["Sınıf", "Yanıcı Madde", "Söndürücü"], rows: [["A", "Katılar (ahşap, kumaş, kağıt)", "Su, köpük"], ["B", "Yanıcı sıvılar (yakıt, yağ, boya)", "Köpük, CO₂, kuru kimyevi toz"], ["C", "Yanıcı gazlar (LPG, LNG)", "Kuru kimyevi toz, CO₂"], ["D", "Yanıcı metaller (alüminyum, magnezyum)", "Özel toz"], ["E/F", "Elektrik ekipmanı / Pişirme yağları", "CO₂ / Islak kimyevi"]] } },
        { heading: "Makine Dairesi Yangın Riskleri", paragraphs: [], bulletPoints: ["Yakıt sızıntısının sıcak yüzeye (egzoz manifoldu, turboşarj) teması.", "Yağlama yağı sızıntısı ve buharlaşması.", "Elektrik kısa devresi veya aşırı ısınma.", "Ekonomizer kurum (soot) yangını.", "Purifier arızası sonucu yağ sıçraması."] }
      ],
      keyPoints: ["Makine dairesi B sınıfı yangın riski en yüksek bölgedir.", "Quick closing valve'lar yangının yakıt kaynağını keser.", "Yalıtım malzemesi yakıta emdirilmişse yangın riski artar."]
    },
    "Makine dairesi sabit söndürme (CO₂, FM200)": {
      title: "Makine Dairesi Sabit Söndürme Sistemleri",
      introduction: "Makine dairesi sabit söndürme sistemi, yangın kontrolden çıktığında devreye alınan son çare söndürme yöntemidir.",
      sections: [
        { heading: "CO₂ Sistemi", paragraphs: ["Yüksek basınçlı CO₂ tüplerinden makine dairesine CO₂ boşaltılarak oksijen konsantrasyonu %21'den %15'in altına düşürülür. Boğucu etkiyle yangın söner.", "Boşaltma öncesi: personel sayımı, havalandırma kapatma, acil kaçış kapıları kapatma, uyarı alarmı verilmesi zorunludur."] },
        { heading: "FM200 (HFC-227ea)", paragraphs: ["CO₂'ye alternatif temiz gaz söndürücüdür. Kimyasal olarak yanma reaksiyonunu keser. İnsan sağlığına CO₂'den daha az zararlıdır ancak yine de tahliye gerektirir.", "Daha hızlı söndürme sağlar ve ekipmana zarar vermez."] },
        { heading: "Devreye Alma Prosedürü", paragraphs: [], bulletPoints: ["Yangın alarmı verilir, köprüüstü bilgilendirilir.", "Makine dairesi TAHLİYE edilir, personel sayılır.", "Havalandırma fanları durdurulur, damperler kapatılır.", "Quick closing valve'lar kapatılır, yakıt pompası durdurulur.", "CO₂ uyarı alarmı verilir (sesli ve ışıklı).", "Kaptan veya sorumlu zabit onay verir.", "CO₂ boşaltma kolu çekilir veya butona basılır.", "Kapılar kapalı tutulur, tekrar giriş yapılmaz."] }
      ],
      keyPoints: ["CO₂ boşaltma öncesi personel sayımı EN KRİTİK adımdır.", "CO₂ ortamına girmek ölümcüldür; SCBA olmadan giriş yapılmamalıdır.", "CO₂ şişeleri periyodik olarak tartılarak kontrol edilir (ağırlık kaybı = sızıntı)."]
    },
    "Kapalı alan tanımı ve tehlikeler": {
      title: "Kapalı Alan Tanımı ve Tehlikeler",
      introduction: "Kapalı (confined/enclosed) alanlar, sınırlı giriş-çıkışı olan ve sürekli insan çalışması için tasarlanmamış mekanlardır. Gemide ölümlü kazaların önemli bir kısmı kapalı alan girişlerinde yaşanır.",
      sections: [
        { heading: "Gemide Kapalı Alanlar", paragraphs: [], bulletPoints: ["Ballast tankları", "Kargo tankları (özellikle tanker)", "Çift dip (double bottom) tankları", "Void alanlar", "Boru tünelleri", "Kazan su bölmesi", "Separator odaları (küçük, havalandırmasız olanlar)"] },
        { heading: "Tehlikeler", paragraphs: [], table: { headers: ["Tehlike", "Kaynak", "Risk"], rows: [["Oksijen eksikliği", "Korozyon (O₂ tüketimi), inert gaz", "Bilinç kaybı, ölüm"], ["Zehirli gaz (H₂S)", "Organik madde çürümesi", "Bilinç kaybı, ölüm"], ["Patlayıcı atmosfer", "Hidrokarbon buharı", "Patlama, yanık"], ["Fiziksel tehlike", "Kayma, düşme, sıkışma", "Yaralanma"]] } },
        { heading: "Güvenli Giriş Prosedürü", paragraphs: [], bulletPoints: ["Risk değerlendirmesi yapılır.", "Giriş izni (Enclosed Space Entry Permit) alınır.", "Alan yeterince havalandırılır (mekanik fan ile).", "Atmosfer testi yapılır: O₂ (%20.9), H₂S (<10 ppm), HC (%LFL<1).", "Giriş boyunca sürekli atmosfer izleme yapılır.", "Dışarıda kurtarma ekibi hazır bekler (en az 2 kişi).", "SCBA ve kurtarma halatı/harness hazır bulundurulur."] }
      ],
      keyPoints: ["Kapalı alana İZİNSİZ giriş ölümcüldür ve kesinlikle yasaktır.", "Arkadaş kurtarmaya çalışırken hayatını kaybetmek en yaygın senaryodur.", "Atmosfer testi giriş öncesi VE giriş süresince yapılmalıdır."]
    },
    "ISM Code gereklilikleri": {
      title: "ISM Code Gereklilikleri",
      introduction: "ISM (International Safety Management) Code, gemilerin güvenli yönetimi ve deniz kirliliğinin önlenmesi için uluslararası standart oluşturur.",
      sections: [
        { heading: "Temel Unsurlar", paragraphs: ["ISM Code, SOLAS Chapter IX'da yer alır. Tüm ticari gemiler ve işletmeleri için zorunludur."], bulletPoints: ["Güvenlik ve çevre koruma politikası", "Şirket sorumluluğu ve yetki tanımları", "Designated Person Ashore (DPA) atanması", "Kaptan'ın yetki ve sorumluluğu", "Kaynakların ve personelin temini", "Gemi operasyonları için planlar ve prosedürler", "Acil durum hazırlığı", "Uygunsuzluk, kaza ve tehlikeli durumların raporlanması", "Bakım prosedürleri", "Dokümantasyon ve kayıt yönetimi", "Şirket doğrulaması, gözden geçirme ve değerlendirme"] },
        { heading: "SMS (Safety Management System)", paragraphs: ["ISM Code kapsamında şirket bir SMS oluşturur. SMS, politikalardan prosedürlere, kontrol listelerinden raporlama formlarına kadar tüm güvenlik dokümanlarını içerir.", "DOC (Document of Compliance) şirkete, SMC (Safety Management Certificate) gemiye verilir."] }
      ],
      keyPoints: ["ISM uyumsuzluğu geminin alıkonmasına neden olabilir.", "DPA, şirket ile gemi arasında güvenlik köprüsü görevindedir.", "Near-miss raporlama kültürü kazaları önlemenin en etkili yoludur."]
    },
    "Risk değerlendirme (Risk Assessment)": {
      title: "Risk Değerlendirme",
      introduction: "Risk değerlendirme, bir işin veya operasyonun tehlikelerini tanımlayarak riskleri derecelendiren ve kontrol önlemleri belirleyen sistematik bir süreçtir.",
      sections: [
        { heading: "Risk Matrisi", paragraphs: ["Risk = Olasılık × Şiddet formülüyle hesaplanır. 5×5 matris yaygın olarak kullanılır."], table: { headers: ["", "Önemsiz (1)", "Küçük (2)", "Orta (3)", "Büyük (4)", "Felaket (5)"], rows: [["Çok olası (5)", "5", "10", "15", "20", "25"], ["Olası (4)", "4", "8", "12", "16", "20"], ["Mümkün (3)", "3", "6", "9", "12", "15"], ["Olası değil (2)", "2", "4", "6", "8", "10"], ["Nadir (1)", "1", "2", "3", "4", "5"]] } },
        { heading: "Kontrol Hiyerarşisi", paragraphs: ["Tehlike kontrol öncelik sırası:"], bulletPoints: ["Eliminasyon: Tehlikeyi tamamen ortadan kaldır.", "Yerine koyma: Daha az tehlikeli alternatif kullan.", "Mühendislik kontrolü: Fiziksel bariyer, koruyucu.", "İdari kontrol: Prosedür, eğitim, işaret, izin sistemi.", "KKD: Son savunma hattı."] }
      ],
      keyPoints: ["Risk değerlendirmesi iş başlamadan ÖNCE yapılır.", "Yüksek riskli işler (15+) ek onay ve önlem gerektirir.", "Risk değerlendirmesi tüm çalışanların katılımıyla yapılmalıdır."]
    },
    "İş izin sistemi (Permit to Work)": {
      title: "İş İzin Sistemi (Permit to Work)",
      introduction: "PTW, yüksek riskli işlerin güvenli biçimde yürütülmesini sağlayan resmi yetkilendirme sistemidir.",
      sections: [
        { heading: "PTW Gerektiren İşler", paragraphs: [], bulletPoints: ["Sıcak çalışma (hot work): Kaynak, kesme, taşlama", "Kapalı alan girişi (enclosed space entry)", "Elektrik üzerinde çalışma (yüksek gerilim)", "Yüksekte çalışma", "Basınçlı ekipman üzerinde çalışma", "Borüstü çalışma (working overside)", "Asbest içeren malzeme ile çalışma"] },
        { heading: "PTW Süreci", paragraphs: [], bulletPoints: ["Risk değerlendirmesi yapılır.", "İzin formu doldurulur: iş tanımı, tehlikeler, önlemler, KKD.", "Yetkili kişi (Chief Engineer veya Master) onaylar.", "İş sahası hazırlanır: izolasyon, kilitleme (LOTO), test.", "İş tamamlandığında alan kontrol edilir ve izin kapatılır.", "İzin formları kayıt altına alınır."] }
      ],
      keyPoints: ["PTW olmadan yüksek riskli iş başlatılmamalıdır.", "İzin belirli süre için geçerlidir; süre aşılırsa yenilenir.", "Lock Out / Tag Out (LOTO) enerji izolasyonunun fiziksel garantisidir."]
    },
    "Yangın algılama sistemi": {
      title: "Yangın Algılama Sistemi",
      introduction: "Makine dairesi yangın algılama sistemi, yangını erken aşamada tespit ederek hızlı müdahale imkânı sağlar.",
      sections: [
        { heading: "Dedektör Tipleri", paragraphs: [], table: { headers: ["Tip", "Algılama Prensibi", "Kullanım Alanı"], rows: [["Duman dedektörü (optik)", "Işık saçılması/zayıflaması", "Yaşam mahalleri, kontrol odası"], ["Duman dedektörü (iyonizasyon)", "İyonizasyon akım değişimi", "Genel alanlar"], ["Isı dedektörü (sabit sıcaklık)", "Belli sıcaklık aşımı (57-77°C)", "Makine dairesi, mutfak"], ["Isı dedektörü (artış hızı)", "Hızlı sıcaklık artışı", "Makine dairesi"], ["Alev dedektörü (UV/IR)", "Ultraviyole/kızılötesi radyasyon", "Makine dairesi, açık alanlar"], ["Manuel ihbar butonu", "Personel aktivasyonu", "Tüm bölgeler"]] } },
        { heading: "Sistem Yapısı", paragraphs: ["Yangın algılama paneli köprüüstünde bulunur ve tüm bölgelerin dedektörlerini izler. Alarm durumunda sesli ve ışıklı uyarı verir.", "Makine dairesinde genellikle ısı dedektörleri ve alev dedektörleri kullanılır. Duman dedektörleri makine dairesinin normal ortamında yanlış alarm verebilir."] }
      ],
      keyPoints: ["Dedektörler periyodik olarak test edilmelidir.", "Yanlış alarm nedeniyle dedektör devre dışı bırakılmamalıdır.", "Yangın algılama sistemi bağımsız güç kaynağına sahip olmalıdır."]
    },
    "MSDS (Güvenlik Bilgi Formu) okuma": {
      title: "MSDS (Güvenlik Bilgi Formu) Okuma",
      introduction: "MSDS (Material Safety Data Sheet) veya SDS, kimyasal maddelerin tehlikelerini, güvenli kullanım koşullarını ve acil durum bilgilerini içeren standart belgedir.",
      sections: [
        { heading: "MSDS Bölümleri (16 Bölüm - GHS)", paragraphs: [], bulletPoints: ["1. Madde/karışım ve şirket tanımı", "2. Tehlike tanımı (GHS piktogramları)", "3. Bileşim/içerik bilgisi", "4. İlk yardım önlemleri", "5. Yangınla mücadele", "6. Kaza sonucu yayılma", "7. Elleçleme ve depolama", "8. Maruziyet kontrolleri / KKD", "9. Fiziksel ve kimyasal özellikler", "10. Stabilite ve reaktivite", "11. Toksikolojik bilgi", "12-16. Çevre, bertaraf, taşıma, mevzuat, diğer"] },
        { heading: "Makine Dairesi Kimyasalları", paragraphs: ["Makine dairesinde yaygın kullanılan kimyasallar: soğutma suyu kimyasalları, kazan su işlem kimyasalları, temizlik solventleri, boya ve tiner, epoksi yapıştırıcılar. Her birinin MSDS'i kolayca erişilebilir yerde bulunmalıdır."] }
      ],
      keyPoints: ["MSDS çalışma alanına yakın ve erişilebilir olmalıdır.", "GHS piktogramları uluslararası olarak standartlaştırılmıştır.", "Kimyasal döküntüsünde MSDS'e göre hareket edilir."]
    },
    "Portatif söndürücü tipleri": {
      title: "Portatif Söndürücü Tipleri",
      introduction: "Portatif yangın söndürücüler, yangınla ilk müdahale için kullanılan taşınabilir ekipmanlardır.",
      sections: [
        { heading: "Söndürücü Tipleri ve Uygunluk", paragraphs: [], table: { headers: ["Söndürücü Tipi", "A Sınıfı", "B Sınıfı", "C Sınıfı", "Elektrik"], rows: [["Su", "✓", "✗", "✗", "✗"], ["Köpük (AFFF)", "✓", "✓", "✗", "✗"], ["CO₂", "✗", "✓", "✓", "✓"], ["Kuru kimyevi toz (ABC)", "✓", "✓", "✓", "✓"]] } },
        { heading: "Kullanım Tekniği (PASS)", paragraphs: [], bulletPoints: ["P – Pull: Pimi çek.", "A – Aim: Nozülü alevlerin tabanına yönelt.", "S – Squeeze: Tetik kolunu sık.", "S – Sweep: Sağa sola süpürme hareketi yap."] }
      ],
      keyPoints: ["CO₂ söndürücü elektrik yangınlarında güvenlidir.", "Kuru toz söndürücü en çok yönlü tiptir ancak ekipmana zarar verebilir.", "Söndürücüler aylık görsel kontrol, yıllık bakım ve 5/10 yıllık hidrostatik teste tabi tutulur."]
    },
  },
};

import content2 from "./machineTopicDetailContent2";
import content3 from "./machineTopicDetailContent3";
import content4 from "./machineTopicDetailContent4";

const allContentMaps = [content, content2, content3, content4];

export function getMachineSubTopicContent(topicSlug: string, subTopicTitle: string): MachineSubTopicContent | null {
  for (const map of allContentMaps) {
    if (map[topicSlug]?.[subTopicTitle]) return map[topicSlug][subTopicTitle];
  }
  return null;
}

export function hasSubTopicContent(topicSlug: string, subTopicTitle: string): boolean {
  for (const map of allContentMaps) {
    if (map[topicSlug]?.[subTopicTitle]) return true;
  }
  return false;
}
