import type { LessonFlow } from "./types";

/**
 * Seyir (navigation) pilot — Duolingo tarzı rehberli akış içeriği.
 *
 * `sectionTitles` ve `sectionRef` değerleri `navigationTopicContents.ts`
 * içindeki gerçek `TopicSection.title` değerleriyle BİREBİR eşleşir; anlatım
 * metni oradan okunur, burada YALNIZCA recap soruları elle yazılmıştır.
 * Sorular tamamen anlatılan içerikten türetilmiştir (uydurma yok).
 */

const NAV = "Seyir";

export const navigationLessonFlows: LessonFlow[] = [
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "Dünya'nın şekli ve hareketleri",
    blocks: [
      {
        sectionTitles: [
          "Dünya'nın Şekli",
          "Seyir Açısından Önemi",
          "Dünya'nın Coğrafi Eksenleri",
        ],
      },
      {
        sectionTitles: [
          "Dünya'nın Kendi Ekseni Etrafındaki Dönüşü (Rotasyon)",
          "Dünya'nın Güneş Etrafındaki Dönüşü (Revolüsyon)",
          "Eksen Eğikliği (Obliquity)",
        ],
      },
      {
        sectionTitles: [
          "Zaman ve Dünya Hareketleri Arasındaki İlişki",
          "Dünya'nın Şeklinin Seyir Hesaplarına Etkisi",
        ],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Dünya'nın Şekli",
        category: NAV,
        question: "Dünya'nın gerçek geometrik şekli aşağıdakilerden hangisidir?",
        options: [
          "Mükemmel küre",
          "Basık küre (oblate spheroid)",
          "Düz disk",
          "Uzun küre (prolate spheroid)",
        ],
        correctAnswer: 1,
        explanation:
          "Dünya, kendi ekseni etrafındaki dönüşü nedeniyle ekvatorda şişkin, kutuplarda basıktır; bu şekle basık küre (oblate spheroid) denir.",
      },
      {
        id: 2,
        sectionRef: "Dünya'nın Şekli",
        category: NAV,
        question: "Ekvator yarıçapı ile kutup yarıçapı arasındaki ilişki nedir?",
        options: [
          "Ekvator yarıçapı daha büyüktür",
          "Kutup yarıçapı daha büyüktür",
          "İkisi tamamen eşittir",
          "Mevsime göre değişir",
        ],
        correctAnswer: 0,
        explanation:
          "Basık küre yapısı nedeniyle ekvator yarıçapı, kutup yarıçapından daha büyüktür.",
      },
      {
        id: 3,
        sectionRef: "Dünya'nın Coğrafi Eksenleri",
        category: NAV,
        question: "Ekvator, Dünya'yı nasıl ayırır?",
        options: [
          "Doğu ve batı yarımküreye",
          "Kuzey ve güney yarımküreye",
          "İç ve dış bölgeye",
          "Gündüz ve gece bölgesine",
        ],
        correctAnswer: 1,
        explanation:
          "Ekvator, dönme eksenine dik en büyük dairedir ve Dünya'yı kuzey ile güney yarımküreye ayırır; enlem ölçümü ekvatordan başlar.",
      },
      {
        id: 4,
        sectionRef: "Dünya'nın Kendi Ekseni Etrafındaki Dönüşü (Rotasyon)",
        category: NAV,
        question: "Dünya kendi ekseni etrafında hangi yöne döner?",
        options: ["Doğudan batıya", "Batıdan doğuya", "Kuzeyden güneye", "Güneyden kuzeye"],
        correctAnswer: 1,
        explanation:
          "Dünya batıdan doğuya doğru, yaklaşık 24 saatte bir tam tur döner; bu dönüş gece-gündüzü ve zaman kavramını oluşturur.",
      },
      {
        id: 5,
        sectionRef: "Dünya'nın Kendi Ekseni Etrafındaki Dönüşü (Rotasyon)",
        category: NAV,
        question: "Dünya 24 saatte 360° döndüğüne göre 1 saatte kaç derece döner?",
        options: ["15°", "24°", "60°", "4°"],
        correctAnswer: 0,
        explanation:
          "360° ÷ 24 saat = 15°/saat. Bu ilişki (1 saat = 15°) göksel seyirde boylam bulmanın temelidir.",
      },
      {
        id: 6,
        sectionRef: "Dünya'nın Güneş Etrafındaki Dönüşü (Revolüsyon)",
        category: NAV,
        question: "Dünya'nın Güneş etrafındaki bir turu yaklaşık ne kadar sürer?",
        options: ["24 saat", "30 gün", "365 gün 6 saat", "23.5 gün"],
        correctAnswer: 2,
        explanation:
          "Revolüsyon yaklaşık 365 gün 6 saattir; bu hareket ve 23.5° eksen eğikliği mevsimleri oluşturur.",
      },
      {
        id: 7,
        sectionRef: "Eksen Eğikliği (Obliquity)",
        category: NAV,
        question: "Dünya'nın dönme ekseninin yörünge düzlemine olan eğikliği yaklaşık kaç derecedir?",
        options: ["23.5°", "15°", "45°", "66.5°"],
        correctAnswer: 0,
        explanation:
          "Eksen eğikliği yaklaşık 23.5°'dir; ekinoks ve solstis olayları ile Güneş'in deklinasyonu bu eğikliğin sonucudur.",
      },
      {
        id: 8,
        sectionRef: "Zaman ve Dünya Hareketleri Arasındaki İlişki",
        category: NAV,
        question: "1° boylam farkı kaç dakikalık zaman farkına karşılık gelir?",
        options: ["1 dakika", "4 dakika", "15 dakika", "60 dakika"],
        correctAnswer: 1,
        explanation:
          "15° = 1 saat (60 dk) olduğundan 1° = 4 dakikadır. Bu, zaman-boylam hesaplarının temel bağıntısıdır.",
      },
      {
        id: 9,
        sectionRef: "Dünya'nın Şeklinin Seyir Hesaplarına Etkisi",
        category: NAV,
        question: "Düzlem seyir (plane sailing) hangi koşulda geçerlidir?",
        options: [
          "Yalnızca kısa mesafelerde",
          "Her mesafede",
          "Yalnızca kutup bölgelerinde",
          "Yalnızca uzun okyanus geçişlerinde",
        ],
        correctAnswer: 0,
        explanation:
          "Dünya basık küre olduğundan düzlem seyir yalnızca kısa mesafelerde geçerlidir; uzun mesafelerde orta enlem veya büyük daire seyri kullanılır.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "Yön kavramları",
    blocks: [
      {
        sectionTitles: ["Kuzey Türleri", "Pusula Gülü ve Yön Sistemi"],
      },
      {
        sectionTitles: [
          "Hakiki Kerteriz (True Bearing)",
          "Nispi Kerteriz (Relative Bearing)",
          "Hakiki Rota, Hakiki Kerteriz ve Nispi Kerteriz İlişkisi",
        ],
      },
      {
        sectionTitles: [
          "Örnek Hesaplama 1 - Sancak Tarafı",
          "Örnek Hesaplama 2 - İskele Tarafı",
          "Rüzgâr ve Akıntı Etkisi",
          "Ölü Hesap ve Yön",
        ],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Kuzey Türleri",
        category: NAV,
        question: "Pusulanın gösterdiği kuzey hangisidir?",
        options: ["Hakiki Kuzey", "Manyetik Kuzey", "Şebeke (Grid) Kuzeyi", "Coğrafi Kuzey"],
        correctAnswer: 1,
        explanation:
          "Pusula, manyetik kuzey kutbunu (Magnetic North) gösterir. Hakiki kuzey ise coğrafi kuzey kutbunu gösteren referanstır.",
      },
      {
        id: 2,
        sectionRef: "Kuzey Türleri",
        category: NAV,
        question: "Hakiki kuzey ile manyetik kuzey arasındaki açı farkına ne denir?",
        options: ["Deviasyon", "Manyetik sapma (Declination/Variation)", "Leeway", "Drift"],
        correctAnswer: 1,
        explanation:
          "Hakiki kuzey ile manyetik kuzey arasındaki açı farkına manyetik sapma (declination / variation) denir.",
      },
      {
        id: 3,
        sectionRef: "Pusula Gülü ve Yön Sistemi",
        category: NAV,
        question: "Pusula sisteminde Batı yönü kaç derecedir?",
        options: ["090°", "180°", "270°", "360°"],
        correctAnswer: 2,
        explanation:
          "Hakiki kuzey 0°/360°, doğu 90°, güney 180°, batı ise 270° olarak tanımlanır.",
      },
      {
        id: 4,
        sectionRef: "Pusula Gülü ve Yön Sistemi",
        category: NAV,
        question: "Yön değerleri nasıl ifade edilir?",
        options: [
          "0°–180° arası, saat yönünde",
          "0°–360° arası, saat yönünde",
          "0°–90° arası, her iki yönde",
          "−180°–+180° arası",
        ],
        correctAnswer: 1,
        explanation:
          "Yön, bir kuzey referansına göre daima saat yönünde ve 0° ile 360° arasında ifade edilir.",
      },
      {
        id: 5,
        sectionRef: "Nispi Kerteriz (Relative Bearing)",
        category: NAV,
        question: "Pruva (baş) doğrultusundaki bir hedefin nispi kerterizi kaç derecedir?",
        options: ["0°", "90°", "180°", "270°"],
        correctAnswer: 0,
        explanation:
          "Nispi kerteriz gemi pruvası referans alınarak ölçülür; pruva 0°, kıç ise 180° nispi kerterizdir.",
      },
      {
        id: 6,
        sectionRef: "Hakiki Rota, Hakiki Kerteriz ve Nispi Kerteriz İlişkisi",
        category: NAV,
        question: "Hakiki kerteriz hangi bağıntıyla bulunur?",
        options: [
          "Hakiki Kerteriz = Hakiki Rota − Nispi Kerteriz (daima)",
          "Hakiki Kerteriz = Hakiki Rota + Nispi Kerteriz",
          "Hakiki Kerteriz = Nispi Kerteriz − Sapma",
          "Hakiki Kerteriz = Pusula Rotası + Deviasyon",
        ],
        correctAnswer: 1,
        explanation:
          "Hakiki Kerteriz = Hakiki Rota + Nispi Kerteriz. Sonuç 360°'yi aşarsa 360° çıkarılır (sancak +, iskele −).",
      },
      {
        id: 7,
        sectionRef: "Örnek Hesaplama 1 - Sancak Tarafı",
        category: NAV,
        question:
          "Hakiki rota 065°T iken bir fener sancaktan nispi 30° ile görülüyor. Hakiki kerteriz nedir?",
        options: ["035°", "095°", "065°", "125°"],
        correctAnswer: 1,
        explanation:
          "Sancak nispi kerteriz pozitiftir: 065° + 030° = 095°. Fener hakiki kuzeye göre 095° doğrultusundadır.",
      },
      {
        id: 8,
        sectionRef: "Örnek Hesaplama 2 - İskele Tarafı",
        category: NAV,
        question:
          "Hakiki rota 065°T iken fener iskeleden nispi 20° ile görülüyor. Hakiki kerteriz nedir?",
        options: ["085°", "045°", "065°", "025°"],
        correctAnswer: 1,
        explanation:
          "İskele nispi kerteriz negatiftir: 065° − 020° = 045°. Fener hakiki kuzeye göre 045° doğrultusundadır.",
      },
      {
        id: 9,
        sectionRef: "Rüzgâr ve Akıntı Etkisi",
        category: NAV,
        question: "COG (Course Over Ground) neyi ifade eder?",
        options: [
          "Geminin pruva doğrultusu",
          "Geminin zemin üzerindeki gerçek hareket yönü",
          "Rüzgârın geldiği yön",
          "Pusulanın gösterdiği rota",
        ],
        correctAnswer: 1,
        explanation:
          "COG, geminin gerçek zemin üzerindeki hareket yönüdür; heading (pruva) ile arasındaki fark rüzgâr/akıntı kaynaklı drift'tir.",
      },
    ],
  },
];
