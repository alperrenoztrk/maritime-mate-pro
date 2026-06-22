import type { LessonFlow } from "./types";

/**
 * Stabilite — Duolingo tarzı rehberli akış içeriği (beta).
 *
 * topicKey = "stability". İçerik `stabilityTopicsContent.ts`'ten gelir ve
 * `betaLessons.mapStabilityTopic` ile normalize edilir: her alt konunun ana
 * anlatımı `sub.title` başlıklı tek bölüm; formül/örnekler `Formül n` /
 * `Çözümlü Örnek n` (tek ise numarasız) başlıklı ek bölümler olur.
 * `sectionTitles`/`sectionRef` bu normalize başlıklarla birebir eşleşir.
 */

const STB = "Stabilite";

export const stabilityLessonFlows: LessonFlow[] = [
  {
    topicKey: "stability",
    topicTitle: "2.5. Metasentrik Nokta ve Metasentrik Yükseklik",
    blocks: [{ sectionTitles: ["2.5. Metasentrik Nokta ve Metasentrik Yükseklik"] }],
    questions: [
      {
        id: 1,
        sectionRef: "2.5. Metasentrik Nokta ve Metasentrik Yükseklik",
        category: STB,
        question: "Metasentrik nokta (M) nasıl tanımlanır?",
        options: [
          "Küçük yatmada kaldırma kuvveti doğrultularının kesişim noktası",
          "Ağırlık merkezi",
          "Omurga noktası",
          "Su hattı orta noktası",
        ],
        correctAnswer: 0,
        explanation: "Gemi küçük açıyla yatınca kaldırma kuvveti doğrultusu, başlangıç doğrultusuyla M noktasında kesişir (ilk/küçük açı stabilitesi).",
      },
      {
        id: 2,
        sectionRef: "2.5. Metasentrik Nokta ve Metasentrik Yükseklik",
        category: STB,
        question: "Metasentrik yükseklik hangi bağıntıyla bulunur ve pozitifse ne anlama gelir?",
        options: [
          "GM = KM − KG; pozitifse M, G'nin üzerindedir → gemi stabildir",
          "GM = KG − KM; pozitifse instabil",
          "GM = KB + BM; pozitifse nötr",
          "GM = I/∇; her zaman sabit",
        ],
        correctAnswer: 0,
        explanation: "GM = KM − KG. GM>0 ise M, G'nin üzerindedir ve gemi stabildir; GM=0 nötr, GM<0 instabildir.",
      },
      {
        id: 3,
        sectionRef: "2.5. Metasentrik Nokta ve Metasentrik Yükseklik",
        category: STB,
        question: "Metasentrik yarıçap BM hangi bağıntıyla ifade edilir?",
        options: [
          "BM = I / ∇ (su hattı alanı 2. momenti / deplasman hacmi)",
          "BM = KM + KG",
          "BM = GZ × sinθ",
          "BM = Δ × GZ",
        ],
        correctAnswer: 0,
        explanation: "BM = I/∇; geniş su hattına sahip gemilerde I büyür, BM ve dolayısıyla GM artar.",
      },
    ],
  },
  {
    topicKey: "stability",
    topicTitle: "2.6. Dikey Mesafeler: KG, KB, BM, KM ve GM",
    blocks: [
      { sectionTitles: ["2.6. Dikey Mesafeler: KG, KB, BM, KM ve GM"] },
      { sectionTitles: ["Formül 1", "Formül 2", "Formül 3", "Çözümlü Örnek 1", "Çözümlü Örnek 2"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "2.6. Dikey Mesafeler: KG, KB, BM, KM ve GM",
        category: STB,
        question: "Stabilitedeki tüm dikey mesafeler hangi referanstan ölçülür?",
        options: ["Omurga (Keel, K)", "Su hattı", "Güverte", "Ağırlık merkezi"],
        correctAnswer: 0,
        explanation: "Tüm dikey mesafeler (KG, KB, BM, KM) omurgadan (K) ölçülür; bu standart karşılaştırma sağlar.",
      },
      {
        id: 2,
        sectionRef: "2.6. Dikey Mesafeler: KG, KB, BM, KM ve GM",
        category: STB,
        question: "KM ve KG yükleme ile nasıl değişir?",
        options: [
          "KM (aynı draft için) sabittir; KG yükleme ile değişir",
          "İkisi de sabittir",
          "KM değişir, KG sabittir",
          "İkisi de yüklemeyle aynı oranda artar",
        ],
        correctAnswer: 0,
        explanation: "KM gövde formuna/drafta bağlı, aynı draft için sabittir; KG yükleme durumuna göre değişir. GM = KM − KG.",
      },
      {
        id: 3,
        sectionRef: "Çözümlü Örnek 1",
        category: STB,
        question: "KB=4.2 m, BM=5.8 m, KG=7.5 m ise GM kaçtır?",
        options: ["2.5 m", "10.0 m", "1.3 m", "−2.5 m"],
        correctAnswer: 0,
        explanation: "KM = KB + BM = 4.2 + 5.8 = 10.0 m; GM = KM − KG = 10.0 − 7.5 = 2.5 m (iyi stabilite).",
      },
      {
        id: 4,
        sectionRef: "Çözümlü Örnek 2",
        category: STB,
        question: "KM = 8.5 m ve minimum GM = 0.50 m ise izin verilen maksimum KG nedir?",
        options: ["8.0 m", "9.0 m", "0.50 m", "4.25 m"],
        correctAnswer: 0,
        explanation: "KG_max = KM − GM_min = 8.5 − 0.50 = 8.0 m.",
      },
    ],
  },
  {
    topicKey: "stability",
    topicTitle: "2.7. Doğrultma Kolu (GZ)",
    blocks: [{ sectionTitles: ["2.7. Doğrultma Kolu (GZ)"] }],
    questions: [
      {
        id: 1,
        sectionRef: "2.7. Doğrultma Kolu (GZ)",
        category: STB,
        question: "Doğrultma kolu (GZ) nedir?",
        options: [
          "Ağırlık ve kaldırma kuvveti doğrultuları arasındaki yatay mesafe",
          "Omurga ile metasanter arası mesafe",
          "Ağırlık merkezinin yüksekliği",
          "Su hattı genişliği",
        ],
        correctAnswer: 0,
        explanation: "GZ, yatmış gemide ağırlık ve kaldırma kuvveti doğrultuları arasındaki yatay mesafedir; doğrultma momentinin temelidir.",
      },
      {
        id: 2,
        sectionRef: "2.7. Doğrultma Kolu (GZ)",
        category: STB,
        question: "Küçük yatma açılarında GZ hangi bağıntıyla bulunur?",
        options: [
          "GZ = GM × sin θ (yaklaşık 7–10°'ye kadar geçerli)",
          "GZ = KM − KG",
          "GZ = Δ × GM",
          "GZ = I / ∇",
        ],
        correctAnswer: 0,
        explanation: "Küçük açılarda GZ = GM·sinθ; ~7–10° ötesinde kaldırma merkezi hareketi doğrusallıktan çıkar ve bu yaklaşım geçersizleşir.",
      },
      {
        id: 3,
        sectionRef: "2.7. Doğrultma Kolu (GZ)",
        category: STB,
        question: "Doğrultma momenti nasıl hesaplanır?",
        options: [
          "Doğrultma Momenti = Deplasman × GZ",
          "Doğrultma Momenti = GM × KG",
          "Doğrultma Momenti = GZ / Δ",
          "Doğrultma Momenti = KM + KB",
        ],
        correctAnswer: 0,
        explanation: "Doğrultma Momenti = Deplasman × GZ; aynı GZ'de deplasmanı büyük geminin doğrultma momenti daha büyüktür.",
      },
    ],
  },
  {
    topicKey: "stability",
    topicTitle: "4.3. GM'in Fiziksel Yorumu ve Stabilite Durumları",
    blocks: [{ sectionTitles: ["4.3. GM'in Fiziksel Yorumu ve Stabilite Durumları"] }],
    questions: [
      {
        id: 1,
        sectionRef: "4.3. GM'in Fiziksel Yorumu ve Stabilite Durumları",
        category: STB,
        question: "Pozitif GM (GM > 0) durumunda ne olur?",
        options: [
          "Geri döndürücü (righting) moment oluşur; dış etki kalkınca gemi dik konuma döner",
          "Gemi daha fazla yatar ve devrilir",
          "Gemi rastgele açıda kalır",
          "Hiçbir moment oluşmaz",
        ],
        correctAnswer: 0,
        explanation: "GM>0'da G, M'nin altındadır; yatınca righting moment oluşur ve gemi dik konuma döner (normal/güvenli durum).",
      },
      {
        id: 2,
        sectionRef: "4.3. GM'in Fiziksel Yorumu ve Stabilite Durumları",
        category: STB,
        question: "Negatif GM (GM < 0) neyi gösterir?",
        options: [
          "İnstabil durum; devirici (heeling) moment, yüksek devrilme riski",
          "En güvenli durum",
          "Nötr denge",
          "Sert gemi",
        ],
        correctAnswer: 0,
        explanation: "GM<0'da G, M'nin üzerindedir; yatınca devirici moment oluşur, gemi daha fazla yatar (çok tehlikeli).",
      },
      {
        id: 3,
        sectionRef: "4.3. GM'in Fiziksel Yorumu ve Stabilite Durumları",
        category: STB,
        question: "'Loll' durumu nedir?",
        options: [
          "Negatif GM'li geminin belirli bir açıda (loll açısı) geçici dengeye gelmesi — çok tehlikeli",
          "Geminin tam dik durması",
          "Pozitif GM'nin en güvenli hâli",
          "Trim durumu",
        ],
        correctAnswer: 0,
        explanation: "Loll, negatif GM'li geminin bir açıda geçici dengeye gelmesidir; ani hareket/ek yük devrilmeye yol açabilir.",
      },
    ],
  },
  {
    topicKey: "stability",
    topicTitle: "7.1. Serbest Yüzey Etkisinin Tanımı",
    blocks: [
      { sectionTitles: ["7.1. Serbest Yüzey Etkisinin Tanımı"] },
      { sectionTitles: ["Formül 1", "Formül 2", "Formül 3", "Formül 4", "Çözümlü Örnek"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "7.1. Serbest Yüzey Etkisinin Tanımı",
        category: STB,
        question: "Serbest yüzey etkisi (FSE) nedir?",
        options: [
          "Kısmen dolu tanktaki sıvının yatınca yana akıp G'yi kaydırması ve doğrultucu momenti azaltması",
          "Tam dolu tankın stabiliteyi artırması",
          "Geminin trimini düzeltmesi",
          "Deplasmanın artması",
        ],
        correctAnswer: 0,
        explanation: "Kısmen dolu tankta gemi yatınca sıvı yana akar, G yatılan tarafa kayar, GZ ve doğrultucu moment azalır.",
      },
      {
        id: 2,
        sectionRef: "7.1. Serbest Yüzey Etkisinin Tanımı",
        category: STB,
        question: "Serbest yüzey etkisinin kritik özelliği nedir?",
        options: [
          "Tankın doluluk oranından (yaklaşık) bağımsızdır; %10 da %90 dolu da etki benzerdir",
          "Yalnızca tank tam doluyken oluşur",
          "Yalnızca boş tankta oluşur",
          "Doluluk arttıkça doğrusal azalır",
        ],
        correctAnswer: 0,
        explanation: "FSE yaklaşık olarak doluluk oranından bağımsızdır; bu nedenle kısmen dolu her tank risk taşır.",
      },
      {
        id: 3,
        sectionRef: "Çözümlü Örnek",
        category: STB,
        question: "20×10 m tank (deniz suyu), Δ=15000 t, GM=1.5 m. GM_eff yaklaşık kaçtır?",
        options: ["1.386 m", "1.5 m", "0.114 m", "1.708 m"],
        correctAnswer: 0,
        explanation: "i = 20×10³/12 = 1666.7 m⁴; FSM = 1.025×1666.7 = 1708.3 t·m; GG₁ = 1708.3/15000 = 0.114 m; GM_eff = 1.5 − 0.114 = 1.386 m.",
      },
    ],
  },
  {
    topicKey: "stability",
    topicTitle: "7.2. Serbest Yüzeyin GM'ye Etkisi",
    blocks: [
      { sectionTitles: ["7.2. Serbest Yüzeyin GM'ye Etkisi"] },
      { sectionTitles: ["Formül 1", "Formül 2", "Çözümlü Örnek"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "7.2. Serbest Yüzeyin GM'ye Etkisi",
        category: STB,
        question: "Efektif GM hangi bağıntıyla bulunur?",
        options: [
          "GM_eff = GM_solid − ΣFSM/Δ (daima GM_solid'den küçük)",
          "GM_eff = GM_solid + ΣFSM/Δ",
          "GM_eff = GM_solid × Δ",
          "GM_eff = ΣFSM",
        ],
        correctAnswer: 0,
        explanation: "Serbest yüzey G'yi sanal olarak GG₁=ΣFSM/Δ kadar yükseltir; GM_eff = GM_solid − ΣFSM/Δ, her zaman daha küçüktür.",
      },
      {
        id: 2,
        sectionRef: "Çözümlü Örnek",
        category: STB,
        question: "GM_solid=1.20 m, Δ=12000 t, ΣFSM=1800 t·m ise GM_eff kaçtır?",
        options: ["1.05 m", "1.20 m", "0.15 m", "1.35 m"],
        correctAnswer: 0,
        explanation: "GG₁ = 1800/12000 = 0.15 m; GM_eff = 1.20 − 0.15 = 1.05 m.",
      },
    ],
  },
  {
    topicKey: "stability",
    topicTitle: "7.3. Free Surface Moment (FSM)",
    blocks: [
      { sectionTitles: ["7.3. Free Surface Moment (FSM)"] },
      { sectionTitles: ["Formül 1", "Formül 2", "Formül 3", "Çözümlü Örnek"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "7.3. Free Surface Moment (FSM)",
        category: STB,
        question: "FSM ve dikdörtgen tankın atalet momenti nasıl hesaplanır?",
        options: [
          "FSM = ρₜ × i, dikdörtgen i = l × b³ / 12",
          "FSM = Δ × GM, i = l × b",
          "FSM = GZ × sinθ",
          "FSM = KM − KG",
        ],
        correctAnswer: 0,
        explanation: "FSM = ρₜ × i; dikdörtgen tankta i = l·b³/12 (l boy, b en).",
      },
      {
        id: 2,
        sectionRef: "7.3. Free Surface Moment (FSM)",
        category: STB,
        question: "Atalet momentinde genişlik (b) neden küp olarak girer ve sonucu nedir?",
        options: [
          "i ∝ b³ olduğundan geniş tanklarda FSM çok hızlı büyür, dar tanklarda dramatik azalır",
          "b² olduğundan etki azdır",
          "b doğrusal girer, etki sabittir",
          "b hiç etkilemez",
        ],
        correctAnswer: 0,
        explanation: "i = l·b³/12 olduğundan FSM genişliğin küpüyle artar; bu yüzden geniş tanklar (ve boyuna bölmeler) FSE açısından kritiktir.",
      },
      {
        id: 3,
        sectionRef: "Çözümlü Örnek",
        category: STB,
        question: "l=18 m, b=9 m, deniz suyu (ρ=1.025) için FSM yaklaşık kaçtır?",
        options: ["1120.8 t·m", "729 t·m", "1093.5 t·m", "162 t·m"],
        correctAnswer: 0,
        explanation: "i = 18×9³/12 = 1093.5 m⁴; FSM = 1.025×1093.5 = 1120.8 t·m.",
      },
    ],
  },
];
