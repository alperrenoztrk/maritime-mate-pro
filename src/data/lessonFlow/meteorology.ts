import type { LessonFlow } from "./types";

/**
 * Meteoroloji — Duolingo tarzı rehberli akış içeriği (beta).
 *
 * `sectionTitles` ve `sectionRef`, `meteorologyTopicContents.ts` içindeki
 * gerçek `TopicSection.title` değerleriyle birebir eşleşir. Anlatım metni
 * oradan read-only okunur; burada yalnızca recap soruları elle yazılmıştır.
 */

const MET = "Meteoroloji";

export const meteorologyLessonFlows: LessonFlow[] = [
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "meteorology",
    topicTitle: "Beaufort skalası uygulamaları",
    blocks: [
      { sectionTitles: ["Skalanın Yapısı"] },
      { sectionTitles: ["Deniz Durumu (Sea State) ile İlişki", "Köprüüstü Kullanımı"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Skalanın Yapısı",
        category: MET,
        question: "Beaufort skalası kaç kademeden oluşur?",
        options: ["0–12 arası, 13 kademe", "1–10 arası, 10 kademe", "0–9 arası, 10 kademe", "1–12 arası, 12 kademe"],
        correctAnswer: 0,
        explanation: "Skala 0 (sakin) ile 12 (kasırga) arasında 13 kademedir.",
      },
      {
        id: 2,
        sectionRef: "Skalanın Yapısı",
        category: MET,
        question: "Beaufort Force 12 hangi koşulu ifade eder?",
        options: ["Kasırga (hurricane)", "Sakin (calm)", "Hafif meltem", "Fırtınamsı rüzgâr"],
        correctAnswer: 0,
        explanation: "Force 0 sakin, Force 12 kasırga koşuludur; her kademe bir rüzgâr hızı aralığına karşılık gelir.",
      },
      {
        id: 3,
        sectionRef: "Deniz Durumu (Sea State) ile İlişki",
        category: MET,
        question: "Beaufort skalası tek başına neden dalga yüksekliğini vermez?",
        options: [
          "Dalga yüksekliği ayrıca esme süresine (duration) ve fetch'e bağlı olduğundan",
          "Skala yalnızca sıcaklığı ölçtüğünden",
          "Dalga yüksekliği rüzgârdan tamamen bağımsız olduğundan",
          "Skala yalnızca gece geçerli olduğundan",
        ],
        correctAnswer: 0,
        explanation:
          "Beaufort doğrudan rüzgâr hızını sınıflar; dalga yüksekliği ise rüzgârın süresine ve fetch'e de bağlıdır.",
      },
      {
        id: 4,
        sectionRef: "Köprüüstü Kullanımı",
        category: MET,
        question: "Güverte operasyon limitleri (kreyn, pilot transferi) genellikle neye göre tanımlanır?",
        options: ["Beaufort kademesine", "Sadece sıcaklığa", "Gemi hızına", "Barometre markasına"],
        correctAnswer: 0,
        explanation: "Operasyon limitleri çoğunlukla Beaufort kademesine referansla belirlenir; bu yüzden tutarlı gözlem önemlidir.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "meteorology",
    topicTitle: "Tehlikeli/seyir yapılabilir yarım daire",
    blocks: [
      { sectionTitles: ["Yarım Daire Tanımı"] },
      { sectionTitles: ["Konum Belirleme Yöntemleri", "Kaçınma Stratejisi"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Yarım Daire Tanımı",
        category: MET,
        question: "Kuzey Yarım Küre'de tropikal siklonun hareket yönünün SAĞ tarafı nedir?",
        options: ["Tehlikeli yarım daire", "Seyir yapılabilir yarım daire", "Gözün merkezi", "Soğuk sektör"],
        correctAnswer: 0,
        explanation:
          "Kuzey YK'de hareket yönünün sağı tehlikeli, solu seyir yapılabilir yarım dairedir (Güney YK'de tersi).",
      },
      {
        id: 2,
        sectionRef: "Yarım Daire Tanımı",
        category: MET,
        question: "Tehlikeli yarım dairede toplam rüzgâr neden daha şiddetlidir?",
        options: [
          "Siklonun ilerleme (translasyon) hızı dönel rüzgâra eklendiği için",
          "Rüzgâr tamamen durduğu için",
          "Basınç yükseldiği için",
          "Dönel rüzgâr translasyondan çıkarıldığı için",
        ],
        correctAnswer: 0,
        explanation:
          "Tehlikeli yarım dairede translasyon hızı dönel rüzgâra EKLENİR; ayrıca gemi siklonun yoluna sürüklenir.",
      },
      {
        id: 3,
        sectionRef: "Konum Belirleme Yöntemleri",
        category: MET,
        question: "Kuzey YK'de rüzgâr yönü saat yönünde (veering) dönüyorsa gemi neredededir?",
        options: ["Tehlikeli yarım dairede", "Seyir yapılabilir yarım dairede", "Tam merkezde", "Siklondan tamamen uzakta"],
        correctAnswer: 0,
        explanation: "Kuzey YK'de rüzgâr veering (saat yönü) ise tehlikeli, backing (saat tersi) ise seyir yapılabilir yarım dairededir.",
      },
      {
        id: 4,
        sectionRef: "Konum Belirleme Yöntemleri",
        category: MET,
        question: "Buys Ballot kuralına göre (Kuzey YK) rüzgâra sırtını dönen gözlemcide alçak basınç merkezi nerededir?",
        options: ["Solunda", "Sağında", "Tam arkasında", "Tam önünde"],
        correctAnswer: 0,
        explanation: "Kuzey YK'de rüzgâra sırtını döndüğünde alçak basınç merkezi yaklaşık solunda kalır.",
      },
      {
        id: 5,
        sectionRef: "Kaçınma Stratejisi",
        category: MET,
        question: "Tehlikeli yarım dairedeki bir gemi nasıl kaçınmalıdır?",
        options: [
          "Rüzgârı sancak baş omuzluğuna alarak siklondan uzaklaşmalı",
          "Rüzgârı kıçtan alıp siklonun önüne geçmeli",
          "Rotayı koruyup beklemeli",
          "Doğrudan göze yönelmeli",
        ],
        correctAnswer: 0,
        explanation:
          "Tehlikeli yarım dairede rüzgâr sancak baş omuzluğuna alınarak uzaklaşılır; erken karar manevra alanını genişletir.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "meteorology",
    topicTitle: "Dalga yüksekliği ve periyot",
    blocks: [
      { sectionTitles: ["Tanımlar"] },
      { sectionTitles: ["Gemi Hareketlerine Etkisi", "Operasyonel Değerlendirme"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Tanımlar",
        category: MET,
        question: "Anlamlı dalga yüksekliği (Hs) nedir?",
        options: [
          "En yüksek dalgaların üçte birinin ortalaması",
          "Tüm dalgaların ortalaması",
          "Gözlenen en yüksek tek dalga",
          "Dalga çukuru derinliği",
        ],
        correctAnswer: 0,
        explanation: "Hs (H₁/₃), gözlenen en yüksek dalgaların üçte birinin ortalamasıdır; deniz durumu standardıdır.",
      },
      {
        id: 2,
        sectionRef: "Tanımlar",
        category: MET,
        question: "Dalga periyodu (T) neyi ifade eder?",
        options: [
          "Ardışık iki dalga tepesinin aynı noktadan geçme süresi (saniye)",
          "Dalga tepesi ile çukuru arası dikey mesafe",
          "Rüzgârın esme süresi",
          "Dalganın katettiği toplam mesafe",
        ],
        correctAnswer: 0,
        explanation: "Periyot, ardışık iki tepe arasındaki süredir (s); dalgaboyu ve hız periyottan türetilir.",
      },
      {
        id: 3,
        sectionRef: "Gemi Hareketlerine Etkisi",
        category: MET,
        question: "Tehlikeli parametrik/senkron yalpa ne zaman gelişir?",
        options: [
          "Geminin doğal yalpa periyodu ile dalga karşılaşma periyodu örtüştüğünde",
          "Deniz tamamen sakin olduğunda",
          "Gemi limanda bağlıyken",
          "Rüzgâr hiç olmadığında",
        ],
        correctAnswer: 0,
        explanation:
          "Doğal yalpa periyodu ile karşılaşma periyodu örtüşünce rezonans (senkron/parametrik yalpa) gelişir; stabilite kaybına gidebilir.",
      },
      {
        id: 4,
        sectionRef: "Operasyonel Değerlendirme",
        category: MET,
        question: "Quartering sea (dalga açısı 120°–150°) koşulunda hangi risk artar?",
        options: ["Broaching (yan dönme) riski", "Buzlanma riski", "Sis riski", "Çatışma riski"],
        correctAnswer: 0,
        explanation: "Quartering sea'de broaching riski artar; gerekirse rota/hız değişikliğiyle karşılaşma periyodu kontrol edilir.",
      },
    ],
  },
];
