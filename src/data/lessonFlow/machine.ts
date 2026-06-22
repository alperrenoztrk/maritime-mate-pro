import type { LessonFlow } from "./types";

/**
 * Makine — Duolingo tarzı rehberli akış içeriği (beta).
 *
 * topicKey, calculationCategories id'siyle aynıdır: "machine-<slug>".
 * `sectionTitles` ve `sectionRef`, machineTopicDetailContent içindeki gerçek
 * section `heading` değerleriyle birebir eşleşir (betaLessons bunları
 * BetaSection.title'a indirger). Sorular yalnızca anlatılan içerikten türetildi.
 */

const MAK = "Makine";

export const machineLessonFlows: LessonFlow[] = [
  // ─────────────────────────── Termodinamik ──────────────────────────────
  {
    topicKey: "machine-thermodynamics",
    topicTitle: "Termodinamik sistem ve sınıflandırması",
    blocks: [
      { sectionTitles: ["Sistem, Çevre ve Sınır", "Kapalı Sistem (Kontrol Kütlesi)"] },
      { sectionTitles: ["Açık Sistem (Kontrol Hacmi)", "Yalıtılmış Sistem", "Adyabatik Sistem"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Sistem, Çevre ve Sınır",
        category: MAK,
        question: "Silindir-piston düzeneğinde hareketli sınıra örnek nedir?",
        options: ["Pistonun üst yüzeyi", "Silindir duvarları", "Çevre havası", "Krank mili"],
        correctAnswer: 0,
        explanation: "Pistonun üst yüzeyi hareketli sınırdır; silindir duvarları sabit sınırdır.",
      },
      {
        id: 2,
        sectionRef: "Kapalı Sistem (Kontrol Kütlesi)",
        category: MAK,
        question: "Kapalı sistemde sınırdan ne geçebilir?",
        options: ["Yalnızca enerji (ısı/iş), kütle geçmez", "Hem kütle hem enerji", "Yalnızca kütle", "Ne kütle ne enerji"],
        correctAnswer: 0,
        explanation: "Kapalı sistemde (kontrol kütlesi) kütle geçişi yoktur; yalnızca ısı ve iş geçebilir.",
      },
      {
        id: 3,
        sectionRef: "Açık Sistem (Kontrol Hacmi)",
        category: MAK,
        question: "Aşağıdakilerden hangisi açık sisteme (kontrol hacmi) örnektir?",
        options: ["Gemi türbini / kompresör / ısı eşanjörü", "Mükemmel yalıtılmış termos", "Kapalı silindir-piston", "Evren (kuramsal)"],
        correctAnswer: 0,
        explanation: "Açık sistemde hem kütle hem enerji geçer; türbin, kompresör ve eşanjör tipik örneklerdir.",
      },
      {
        id: 4,
        sectionRef: "Yalıtılmış Sistem",
        category: MAK,
        question: "Yalıtılmış sistem için doğru olan hangisidir?",
        options: [
          "Ne kütle ne enerji geçer; entropisi asla azalmaz",
          "Yalnızca ısı geçer",
          "Yalnızca kütle geçer",
          "Hem kütle hem enerji geçer",
        ],
        correctAnswer: 0,
        explanation: "Yalıtılmış sistemde sınırdan ne kütle ne enerji geçer; ikinci yasaya göre entropisi azalmaz.",
      },
      {
        id: 5,
        sectionRef: "Adyabatik Sistem",
        category: MAK,
        question: "Adyabatik sistem nasıl tanımlanır?",
        options: [
          "Sınırından ısı geçişi olmayan, ancak iş yapabilen sistem",
          "Hiç iş yapmayan sistem",
          "Sürekli ısı alan sistem",
          "Kütle geçişine açık sistem",
        ],
        correctAnswer: 0,
        explanation: "Adyabatik sistemde sınırdan ısı geçişi yoktur; iş yapılabilir (örn. yalıtılmış silindir-piston).",
      },
    ],
  },
  {
    topicKey: "machine-thermodynamics",
    topicTitle: "Hal büyüklükleri: basınç, sıcaklık, hacim",
    blocks: [
      { sectionTitles: ["Basınç"] },
      { sectionTitles: ["Sıcaklık", "Hacim ve Özgül Hacim"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Basınç",
        category: MAK,
        question: "Mutlak basınç hangi bağıntıyla bulunur?",
        options: ["P_abs = P_gauge + P_atm", "P_abs = P_gauge − P_atm", "P_abs = P_atm − P_gauge", "P_abs = P_gauge × P_atm"],
        correctAnswer: 0,
        explanation: "Mutlak basınç = manometrik basınç + atmosfer basıncı (P_atm ≈ 1.013 bar).",
      },
      {
        id: 2,
        sectionRef: "Basınç",
        category: MAK,
        question: "Gösterge 7.5 bar ise mutlak basınç yaklaşık kaçtır?",
        options: ["8.513 bar", "6.487 bar", "7.5 bar", "1.013 bar"],
        correctAnswer: 0,
        explanation: "P_abs = 7.5 + 1.013 = 8.513 bar.",
      },
      {
        id: 3,
        sectionRef: "Sıcaklık",
        category: MAK,
        question: "Termodinamik hesaplarda sıcaklık hangi ölçekte alınmalıdır?",
        options: ["Kelvin (T = t°C + 273.15)", "Celsius", "Fahrenheit", "Farketmez"],
        correctAnswer: 0,
        explanation: "Oran/çarpma içeren formüllerde Kelvin zorunludur; Celsius hatalara yol açar.",
      },
      {
        id: 4,
        sectionRef: "Hacim ve Özgül Hacim",
        category: MAK,
        question: "Özgül hacim (v) hangi bağıntıyla ifade edilir?",
        options: ["v = V/m = 1/ρ", "v = m/V", "v = ρ × V", "v = P/T"],
        correctAnswer: 0,
        explanation: "Özgül hacim birim kütlenin hacmidir ve yoğunluğun tersidir: v = V/m = 1/ρ.",
      },
    ],
  },
  {
    topicKey: "machine-thermodynamics",
    topicTitle: "İç enerji ve entalpi",
    blocks: [
      { sectionTitles: ["İç Enerji (U)"] },
      { sectionTitles: ["Entalpi (H)"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "İç Enerji (U)",
        category: MAK,
        question: "Kapalı sistemde birinci yasa nasıl yazılır?",
        options: ["Q − W = ΔU", "Q + W = ΔU", "ΔU = Q × W", "ΔU = 0 (daima)"],
        correctAnswer: 0,
        explanation: "Q − W = ΔU; Q sisteme verilen ısı, W sistemin yaptığı iştir.",
      },
      {
        id: 2,
        sectionRef: "İç Enerji (U)",
        category: MAK,
        question: "İç enerji değişimi hangi bağıntıyla hesaplanır?",
        options: ["ΔU = m · cv · ΔT", "ΔU = m · cp · ΔT", "ΔU = P · V", "ΔU = m · ΔT / cv"],
        correctAnswer: 0,
        explanation: "ΔU = m·cv·ΔT (sabit hacim özgül ısısı kullanılır).",
      },
      {
        id: 3,
        sectionRef: "Entalpi (H)",
        category: MAK,
        question: "Entalpi nasıl tanımlanır?",
        options: ["H = U + PV", "H = U − PV", "H = P/V", "H = U × T"],
        correctAnswer: 0,
        explanation: "Entalpi, iç enerji ile basınç-hacim çarpımının toplamıdır: H = U + PV.",
      },
      {
        id: 4,
        sectionRef: "Entalpi (H)",
        category: MAK,
        question: "Sabit basınçtaki bir süreçte sisteme verilen ısı neye eşittir?",
        options: ["Entalpi değişimine (ΔH)", "İç enerji değişimine (ΔU)", "Sıfıra", "İş eksi ısıya"],
        correctAnswer: 0,
        explanation: "Sabit basınçta Q = ΔH; bu, kazan/kondensör/eşanjör analizini kolaylaştırır.",
      },
      {
        id: 5,
        sectionRef: "Entalpi (H)",
        category: MAK,
        question: "500 kg/h su 15°C→45°C ısıtılıyor (cp=4.0). Gerekli ısı gücü yaklaşık kaçtır?",
        options: ["16.67 kW", "60 kW", "1.67 kW", "30 kW"],
        correctAnswer: 0,
        explanation: "Q = (500/3600) × 4.0 × 30 = 0.1389 × 120 ≈ 16.67 kW.",
      },
    ],
  },
  {
    topicKey: "machine-thermodynamics",
    topicTitle: "Spesifik ısı kapasiteleri (Cp, Cv)",
    blocks: [
      { sectionTitles: ["Sabit Hacimde Özgül Isı (cv)", "Sabit Basınçta Özgül Isı (cp)"] },
      { sectionTitles: ["Özgül Isılar Arasındaki İlişkiler"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Sabit Hacimde Özgül Isı (cv)",
        category: MAK,
        question: "Sabit hacimde verilen ısı nereye gider?",
        options: [
          "Tamamı iç enerji artışına (genişleme işi yapılamaz)",
          "Tamamı işe",
          "Yarısı işe yarısı ısıya",
          "Çevreye geri verilir",
        ],
        correctAnswer: 0,
        explanation: "Sabit hacimde genişleme işi olmadığından verilen ısının tamamı iç enerjiye dönüşür.",
      },
      {
        id: 2,
        sectionRef: "Sabit Basınçta Özgül Isı (cp)",
        category: MAK,
        question: "Neden cp her zaman cv'den büyüktür?",
        options: [
          "Sabit basınçta sistem genişler ve ek olarak iş yapar",
          "cp daima yarısı kadardır",
          "Sabit basınçta ısı kaybı olur",
          "cv basınçla artar",
        ],
        correctAnswer: 0,
        explanation: "Sabit basınçta verilen ısının bir kısmı genişleme işine gider; bu yüzden cp > cv.",
      },
      {
        id: 3,
        sectionRef: "Özgül Isılar Arasındaki İlişkiler",
        category: MAK,
        question: "İdeal gazlar için cp ve cv arasındaki bağıntı nedir?",
        options: ["cp − cv = R", "cp + cv = R", "cp × cv = R", "cp / cv = R"],
        correctAnswer: 0,
        explanation: "İdeal gazlarda cp − cv = R (özgül gaz sabiti).",
      },
      {
        id: 4,
        sectionRef: "Özgül Isılar Arasındaki İlişkiler",
        category: MAK,
        question: "Özgül ısı oranı γ = cp/cv için hava değeri yaklaşık kaçtır?",
        options: ["1.4", "1.0", "0.7", "2.0"],
        correctAnswer: 0,
        explanation: "Hava için γ ≈ 1.4; adyabatik süreç hesaplarında kritik öneme sahiptir.",
      },
    ],
  },
  {
    topicKey: "machine-thermodynamics",
    topicTitle: "Termodinamiğin sıfırıncı yasası",
    blocks: [
      { sectionTitles: ["Yasa Tanımı"] },
      { sectionTitles: ["Uygulamadaki Önemi"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Yasa Tanımı",
        category: MAK,
        question: "Sıfırıncı yasa neyi ifade eder?",
        options: [
          "A ile C, B ile C termal dengede ise A ile B de termal dengededir",
          "Enerji yoktan var edilemez",
          "Entropi daima artar",
          "Mutlak sıfıra ulaşılamaz",
        ],
        correctAnswer: 0,
        explanation: "Sıfırıncı yasa termal dengenin geçişliliğini ifade eder ve sıcaklık kavramının temelidir.",
      },
      {
        id: 2,
        sectionRef: "Yasa Tanımı",
        category: MAK,
        question: "Termal denge nedir?",
        options: [
          "İki sistem arasında net ısı akışının olmadığı durum (aynı sıcaklık)",
          "Basınçların eşit olması",
          "Hacimlerin eşit olması",
          "Kütlelerin eşit olması",
        ],
        correctAnswer: 0,
        explanation: "Termal dengede iki sistem arasında net ısı akışı yoktur; sıcaklıkları eşittir.",
      },
      {
        id: 3,
        sectionRef: "Uygulamadaki Önemi",
        category: MAK,
        question: "Sıfırıncı yasanın pratik önemi nedir?",
        options: [
          "Termometre ile sıcaklık ölçümünün fiziksel dayanağını sağlar",
          "Yakıt tüketimini hesaplar",
          "Basınç ölçümünü tanımlar",
          "Entropiyi hesaplar",
        ],
        correctAnswer: 0,
        explanation: "Termometre, ölçülen sistemle termal dengeye ulaşınca sistemin sıcaklığını gösterir; tüm sıcaklık sensörleri bu ilkeye dayanır.",
      },
    ],
  },
];
