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
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "Enlem",
    blocks: [
      {
        sectionTitles: [
          "Enlemin Tanımı ve Geometrik Anlamı",
          "Paraleller ve Enlem Çizgileri",
          "Coğrafi Bölgeler ve Enlem",
        ],
      },
      {
        sectionTitles: ["Enlem Birimleri ve Deniz Mili İlişkisi", "Örnek Konum: New Orleans"],
      },
      {
        sectionTitles: [
          "Enlem Değişimi (DLat) Kavramı",
          "Örnek – Enlem Değişimi Hesabı",
          "Enlemin Göksel Seyirdeki Rolü",
        ],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Enlemin Tanımı ve Geometrik Anlamı",
        category: NAV,
        question: "Enlem neyi ifade eder?",
        options: [
          "Bir noktanın ekvatora olan açısal uzaklığı (kuzey–güney)",
          "Bir noktanın Greenwich'e olan uzaklığı (doğu–batı)",
          "İki liman arası mesafe",
          "Geminin pruva yönü",
        ],
        correctAnswer: 0,
        explanation:
          "Enlem, bir noktanın ekvatora olan açısal uzaklığıdır ve yalnızca kuzey–güney konumunu tanımlar.",
      },
      {
        id: 2,
        sectionRef: "Enlemin Tanımı ve Geometrik Anlamı",
        category: NAV,
        question: "Kuzey Kutbu'nun enlemi kaçtır?",
        options: ["0°", "45°N", "90°N", "180°N"],
        correctAnswer: 2,
        explanation: "Ekvator 0°, Kuzey Kutbu 90°N, Güney Kutbu 90°S'dir.",
      },
      {
        id: 3,
        sectionRef: "Paraleller ve Enlem Çizgileri",
        category: NAV,
        question: "Enlem çizgileri (paraleller) hakkında doğru olan hangisidir?",
        options: [
          "Kutuplarda birleşirler",
          "Birbirini hiç kesmezler",
          "Ekvatoru dik keserler",
          "Hepsi aynı uzunluktadır",
        ],
        correctAnswer: 1,
        explanation:
          "Paraleller ekvatora paralel dairelerdir ve birbirini kesmez; ekvator en büyük paraleldir.",
      },
      {
        id: 4,
        sectionRef: "Coğrafi Bölgeler ve Enlem",
        category: NAV,
        question: "Tropikal bölge hangi enlemler arasındadır?",
        options: ["0° – 23.5°", "23.5° – 66.5°", "66.5° – 90°", "45° – 90°"],
        correctAnswer: 0,
        explanation:
          "Tropikal bölge 23.5°N (Yengeç) ile 23.5°S (Oğlak) dönenceleri arasındadır.",
      },
      {
        id: 5,
        sectionRef: "Enlem Birimleri ve Deniz Mili İlişkisi",
        category: NAV,
        question: "1′ (bir dakika) enlem kaç deniz miline eşittir?",
        options: ["1 deniz mili", "60 deniz mili", "10 deniz mili", "4 deniz mili"],
        correctAnswer: 0,
        explanation:
          "Seyirde 1′ enlem = 1 deniz mili, 1° enlem = 60 deniz mili kabul edilir. Mesafe için enlem ölçeği kullanılır.",
      },
      {
        id: 6,
        sectionRef: "Örnek Konum: New Orleans",
        category: NAV,
        question: "30°N enlemindeki bir nokta ekvatordan kaç deniz mili uzaktadır?",
        options: ["1800 deniz mili", "3600 deniz mili", "300 deniz mili", "600 deniz mili"],
        correctAnswer: 0,
        explanation: "30° × 60 = 1800 deniz mili (ekvatora mesafe).",
      },
      {
        id: 7,
        sectionRef: "Enlem Değişimi (DLat) Kavramı",
        category: NAV,
        question: "Düzlem seyirde enlem değişimi (DLat) hangi bağıntıyla bulunur?",
        options: [
          "DLat = Mesafe × cos(Kurs)",
          "DLat = Mesafe × sin(Kurs)",
          "DLat = Mesafe ÷ cos(Enlem)",
          "DLat = Hız × Zaman",
        ],
        correctAnswer: 0,
        explanation:
          "DLat = Mesafe × cos(Kurs); hareketin kuzey–güney bileşenini verir (kuzey +, güney −).",
      },
      {
        id: 8,
        sectionRef: "Örnek – Enlem Değişimi Hesabı",
        category: NAV,
        question: "120 NM mesafe ve 030° kurs için DLat yaklaşık kaçtır?",
        options: ["103.9′", "60′", "120′", "86.6′"],
        correctAnswer: 0,
        explanation: "DLat = 120 × cos(30°) = 120 × 0.866 ≈ 103.9′ (≈ 1°43.9′).",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "Boylam",
    blocks: [
      {
        sectionTitles: [
          "Boylamın Tanımı ve Geometrik Anlamı",
          "Meridyenlerin Yapısı ve Özellikleri",
          "Dünya Üzerinde Boylam Dağılımı",
        ],
      },
      {
        sectionTitles: ["Boylam ve Zaman Arasındaki Temel İlişki", "Yerel Zaman ve Greenwich Zamanı"],
      },
      {
        sectionTitles: ["Boylam Değişimi ve Departure", "Örnek – Boylam Değişimi Hesabı"],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Boylamın Tanımı ve Geometrik Anlamı",
        category: NAV,
        question: "Boylam neyi ifade eder?",
        options: [
          "Greenwich meridyenine olan açısal uzaklık (doğu–batı)",
          "Ekvatora olan açısal uzaklık (kuzey–güney)",
          "İki gemi arası mesafe",
          "Geminin hızı",
        ],
        correctAnswer: 0,
        explanation:
          "Boylam, bir noktanın Başlangıç (Greenwich) Meridyeni'ne olan açısal uzaklığıdır; doğu–batı konumunu verir.",
      },
      {
        id: 2,
        sectionRef: "Meridyenlerin Yapısı ve Özellikleri",
        category: NAV,
        question: "Meridyenler hakkında doğru olan hangisidir?",
        options: [
          "Kutuplarda birleşirler",
          "Birbirine daima paraleldir",
          "Ekvatora paraleldir",
          "Hepsi farklı uzunluktadır",
        ],
        correctAnswer: 0,
        explanation:
          "Meridyenler kutuptan kutba uzanan, aynı uzunlukta yarım dairelerdir ve kutuplarda birleşir.",
      },
      {
        id: 3,
        sectionRef: "Dünya Üzerinde Boylam Dağılımı",
        category: NAV,
        question: "180° meridyeni hangi çizgiye karşılık gelir?",
        options: [
          "Tarih Değiştirme Çizgisi",
          "Ekvator",
          "Greenwich Meridyeni",
          "Yengeç Dönencesi",
        ],
        correctAnswer: 0,
        explanation: "180° meridyeni Uluslararası Tarih Değiştirme Çizgisi'dir.",
      },
      {
        id: 4,
        sectionRef: "Boylam ve Zaman Arasındaki Temel İlişki",
        category: NAV,
        question: "15° boylam farkı kaç saatlik zaman farkına eşittir?",
        options: ["1 saat", "4 saat", "15 dakika", "24 saat"],
        correctAnswer: 0,
        explanation: "15° = 1 saat, 1° = 4 dakika, 1′ = 4 saniye.",
      },
      {
        id: 5,
        sectionRef: "Yerel Zaman ve Greenwich Zamanı",
        category: NAV,
        question: "Yerel zaman Greenwich zamanından İLERİ ise gözlemci nerededir?",
        options: ["Doğu boylamında", "Batı boylamında", "Ekvatorda", "Greenwich'te"],
        correctAnswer: 0,
        explanation:
          "Yerel zaman ileri ise doğu boylam, geri ise batı boylamdır (Güneş doğuda daha erken doğar).",
      },
      {
        id: 6,
        sectionRef: "Boylam Değişimi ve Departure",
        category: NAV,
        question: "Departure ile boylam değişimi (DLong) arasındaki bağıntı nedir?",
        options: [
          "Departure = DLong × cos(Lat)",
          "Departure = DLong × sin(Lat)",
          "Departure = DLong ÷ cos(Lat)",
          "Departure = DLong × Mesafe",
        ],
        correctAnswer: 0,
        explanation:
          "Departure = DLong × cos(Lat). Meridyenler kutba yaklaştıkça yaklaştığı için boylam farkı doğrudan mesafe değildir.",
      },
      {
        id: 7,
        sectionRef: "Örnek – Boylam Değişimi Hesabı",
        category: NAV,
        question: "Ortalama enlem 40°N ve departure 90 NM (doğuya) için DLong yaklaşık kaçtır?",
        options: ["117.5′", "90′", "69′", "180′"],
        correctAnswer: 0,
        explanation: "DLong = Departure ÷ cos(Lat) = 90 ÷ 0.766 ≈ 117.5′ (≈ 1°57.5′ Doğu).",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "Hakiki kuzey (True)",
    blocks: [
      {
        sectionTitles: [
          "Tanım ve Temel Referans",
          "Sabit ve Evrensel Bir Doğrultu",
          "Meridyenler ve Hakiki Kuzey Doğrultusu",
        ],
      },
      {
        sectionTitles: [
          "Hakiki Yönlerin Ölçümü",
          "Hakiki Rota ve Hakiki Kerteriz",
          "Hakiki Kerteriz Hesap Bağıntısı",
        ],
      },
      {
        sectionTitles: ["Sayısal Örnek", "Ölü Hesap ve Hakiki Kuzey"],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Tanım ve Temel Referans",
        category: NAV,
        question: "Hakiki kuzey (True North) nedir?",
        options: [
          "Dünya'nın dönme ekseninin coğrafi kuzey noktasına yönelen sabit doğrultu",
          "Pusulanın gösterdiği değişken doğrultu",
          "Harita projeksiyonunun şebeke kuzeyi",
          "Rüzgârın geldiği yön",
        ],
        correctAnswer: 0,
        explanation:
          "Hakiki kuzey, coğrafi kuzey kutbuna yönelen, zamanla değişmeyen ve tüm seyir hesaplarına temel olan referanstır.",
      },
      {
        id: 2,
        sectionRef: "Sabit ve Evrensel Bir Doğrultu",
        category: NAV,
        question: "Hakiki kuzeyin en önemli özelliği nedir?",
        options: [
          "Manyetik alandan ve gemi yapısından etkilenmeyen sabit bir referans olması",
          "Her gemide farklı olması",
          "Pruva yönüne göre değişmesi",
          "Yıllık olarak yer değiştirmesi",
        ],
        correctAnswer: 0,
        explanation:
          "Hakiki kuzey manyetik etkilerden bağımsız, tek ve sabit referanstır; bu yüzden uzun seyir ve göksel gözlemde vazgeçilmezdir.",
      },
      {
        id: 3,
        sectionRef: "Meridyenler ve Hakiki Kuzey Doğrultusu",
        category: NAV,
        question: "Harita üzerindeki meridyen çizgileri neyi temsil eder?",
        options: [
          "Hakiki kuzey–güney doğrultusunu",
          "Manyetik kuzeyi",
          "Akıntı yönünü",
          "Rüzgâr doğrultusunu",
        ],
        correctAnswer: 0,
        explanation: "Her dikey meridyen, hakiki kuzey–güney doğrultusunu temsil eder ve yön ölçümünün temelidir.",
      },
      {
        id: 4,
        sectionRef: "Hakiki Kerteriz Hesap Bağıntısı",
        category: NAV,
        question: "Hakiki kerteriz hangi bağıntıyla bulunur?",
        options: [
          "Hakiki Kerteriz = Hakiki Rota + Nispi Kerteriz",
          "Hakiki Kerteriz = Manyetik Rota + Variation",
          "Hakiki Kerteriz = Nispi Kerteriz − Deviation",
          "Hakiki Kerteriz = Pusula Rotası + Deviation",
        ],
        correctAnswer: 0,
        explanation:
          "Hakiki Kerteriz = Hakiki Rota + Nispi Kerteriz (sancak +, iskele −). 360°'yi aşarsa 360° çıkarılır.",
      },
      {
        id: 5,
        sectionRef: "Sayısal Örnek",
        category: NAV,
        question: "Hakiki rota 120°T iken hedef sancaktan nispi 35° görülüyor. Hakiki kerteriz nedir?",
        options: ["155°", "095°", "085°", "120°"],
        correctAnswer: 0,
        explanation: "Sancak pozitiftir: 120° + 035° = 155°.",
      },
      {
        id: 6,
        sectionRef: "Sayısal Örnek",
        category: NAV,
        question: "Aynı rotada (120°T) hedef iskeleden nispi 25° görülürse hakiki kerteriz nedir?",
        options: ["095°", "145°", "155°", "085°"],
        correctAnswer: 0,
        explanation: "İskele negatiftir: 120° − 025° = 095°.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "Manyetik kuzey",
    blocks: [
      {
        sectionTitles: [
          "Tanım ve Temel Referans",
          "Dünya Manyetik Alanı ve Kutup Hareketi",
          "Variation Yönü: Doğu ve Batı",
        ],
      },
      {
        sectionTitles: ["Hakiki–Manyetik Dönüşüm", "Sayısal Örnek"],
      },
      {
        sectionTitles: ["Deviation (Pusula Sapması) ve Tam Pusula Düzeltmesi", "Seyirde Risk ve İhmal"],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Tanım ve Temel Referans",
        category: NAV,
        question: "Manyetik kuzey hakkında doğru olan hangisidir?",
        options: [
          "Pusulanın esas aldığı, zamanla yer değiştiren değişken bir referanstır",
          "Coğrafi kuzeyle aynıdır",
          "Hiç değişmeyen sabit bir doğrultudur",
          "Yalnızca elektronik pusulalarda kullanılır",
        ],
        correctAnswer: 0,
        explanation:
          "Manyetik kuzey, Dünya manyetik alanına bağlı, kutup hareketi nedeniyle yıllar içinde yer değiştiren değişken bir referanstır.",
      },
      {
        id: 2,
        sectionRef: "Variation Yönü: Doğu ve Batı",
        category: NAV,
        question: "Hakiki kuzey ile manyetik kuzey arasındaki açıya ne denir?",
        options: ["Variation", "Deviation", "Leeway", "Drift"],
        correctAnswer: 0,
        explanation:
          "Bu açı variation'dır (manyetik sapma). Manyetik kuzey doğudaysa variation doğu, batıdaysa batıdır.",
      },
      {
        id: 3,
        sectionRef: "Variation Yönü: Doğu ve Batı",
        category: NAV,
        question: "Hesaplarda variation işareti nasıl alınır?",
        options: ["Doğu (+), Batı (−)", "Doğu (−), Batı (+)", "Her ikisi de (+)", "Her ikisi de (−)"],
        correctAnswer: 0,
        explanation: "Doğu değerler pozitif, batı değerler negatif kabul edilir (East +, West −).",
      },
      {
        id: 4,
        sectionRef: "Hakiki–Manyetik Dönüşüm",
        category: NAV,
        question: "Manyetik rotadan hakiki rotaya geçiş bağıntısı nedir?",
        options: [
          "Hakiki Rota = Manyetik Rota + Variation",
          "Hakiki Rota = Manyetik Rota − Nispi Kerteriz",
          "Hakiki Rota = Pusula Rotası + Variation",
          "Hakiki Rota = Manyetik Rota × cos(Lat)",
        ],
        correctAnswer: 0,
        explanation: "Hakiki Rota = Manyetik Rota + Variation (doğu +, batı −).",
      },
      {
        id: 5,
        sectionRef: "Sayısal Örnek",
        category: NAV,
        question: "Variation 7°E ve manyetik rota 110°M ise hakiki rota kaçtır?",
        options: ["117°", "103°", "110°", "124°"],
        correctAnswer: 0,
        explanation: "Doğu variation eklenir: 110° + 7° = 117°. (Batı olsaydı çıkarılırdı.)",
      },
      {
        id: 6,
        sectionRef: "Deviation (Pusula Sapması) ve Tam Pusula Düzeltmesi",
        category: NAV,
        question: "Deviation (pusula sapması) neyden kaynaklanır?",
        options: [
          "Geminin kendi çeliği ve elektrikli ekipmanının yerel manyetik alanından",
          "Dünya'nın dönme ekseninden",
          "Akıntı ve rüzgârdan",
          "Harita projeksiyonundan",
        ],
        correctAnswer: 0,
        explanation:
          "Deviation, pusula kuzeyi ile manyetik kuzey arasındaki açıdır; gemiye özgüdür ve pruva yönüne göre değişir.",
      },
      {
        id: 7,
        sectionRef: "Deviation (Pusula Sapması) ve Tam Pusula Düzeltmesi",
        category: NAV,
        question: "Pusula rotası 100°, deviation 3°W, variation 7°E ise hakiki rota kaçtır?",
        options: ["104°", "110°", "96°", "100°"],
        correctAnswer: 0,
        explanation: "Hakiki Rota = 100° − 3° + 7° = 104° (doğu +, batı −).",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "Rota hız ve mesafe ilişkisi",
    blocks: [
      {
        sectionTitles: [
          "Rota–Hız–Mesafe Üçlüsü",
          "Ölü Hesap Mevkiinin Temeli",
          "Birim Uyumu ve Zaman Üçgeni",
        ],
      },
      {
        sectionTitles: ["Temel Bağıntı", "Sayısal Örnek"],
      },
      {
        sectionTitles: ["Hızın Değişkenliği", "Vektörel Anlam", "Hata Birikimi ve Sapmalar"],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Rota–Hız–Mesafe Üçlüsü",
        category: NAV,
        question: "1 knot kaç deniz mili/saate eşittir?",
        options: ["Saatte 1 deniz mili", "Saatte 1 km", "Saatte 1.85 deniz mili", "Dakikada 1 deniz mili"],
        correctAnswer: 0,
        explanation: "1 knot = saatte 1 deniz mili. Bu birim uyumu seyir hesaplarını basitleştirir.",
      },
      {
        id: 2,
        sectionRef: "Temel Bağıntı",
        category: NAV,
        question: "Mesafe hangi bağıntıyla bulunur?",
        options: ["Mesafe = Hız × Zaman", "Mesafe = Hız ÷ Zaman", "Mesafe = Zaman ÷ Hız", "Mesafe = Hız + Zaman"],
        correctAnswer: 0,
        explanation: "Mesafe = Hız × Zaman; düzlem seyirde en temel bağıntıdır.",
      },
      {
        id: 3,
        sectionRef: "Birim Uyumu ve Zaman Üçgeni",
        category: NAV,
        question: "Geçen süreyi (zaman) bulmak için bağıntı nasıl düzenlenir?",
        options: ["Zaman = Mesafe ÷ Hız", "Zaman = Mesafe × Hız", "Zaman = Hız ÷ Mesafe", "Zaman = Hız × Mesafe"],
        correctAnswer: 0,
        explanation: "Zaman = Mesafe ÷ Hız (temel bağıntının yeniden düzenlenmiş hâli).",
      },
      {
        id: 4,
        sectionRef: "Sayısal Örnek",
        category: NAV,
        question: "14 knot hızla 3.5 saat seyreden gemi kaç deniz mili alır?",
        options: ["49 deniz mili", "70 deniz mili", "35 deniz mili", "56 deniz mili"],
        correctAnswer: 0,
        explanation: "Mesafe = 14 × 3.5 = 49 deniz mili.",
      },
      {
        id: 5,
        sectionRef: "Sayısal Örnek",
        category: NAV,
        question: "14 knot hızla 70 deniz millik mesafe kaç saatte alınır?",
        options: ["5 saat", "4 saat", "6 saat", "10 saat"],
        correctAnswer: 0,
        explanation: "Zaman = 70 ÷ 14 = 5 saat.",
      },
      {
        id: 6,
        sectionRef: "Hata Birikimi ve Sapmalar",
        category: NAV,
        question: "Küçük hız/rota hatalarının uzun seyirdeki etkisi nedir?",
        options: [
          "Zamanla büyük mevki/mesafe sapmasına dönüşür",
          "Hiçbir etkisi olmaz",
          "Sadece liman yaklaşmasında etkilidir",
          "Yalnızca göksel seyirde önemlidir",
        ],
        correctAnswer: 0,
        explanation:
          "Küçük hız hataları ve birkaç derecelik rota hatası, süre uzadıkça büyük mevki sapmalarına dönüşür; bu yüzden sürekli kontrol gerekir.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "Departure (Doğu–batı mesafesi)",
    blocks: [
      {
        sectionTitles: [
          "Departure (Doğu–Batı Mesafesi) Genel Tanım",
          "Departure’ın Tanımı ve Yön İşareti",
        ],
      },
      {
        sectionTitles: [
          "Mesafe ve Kurs Kullanılarak Departure Hesabı",
          "Sayısal Örnek: Mesafe ve Kurs ile Departure",
        ],
      },
      {
        sectionTitles: [
          "DLat ile Departure Arasındaki Geometrik İlişki",
          "Departure’ın Düzlem Seyirde Kullanım Alanı",
        ],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Departure’ın Tanımı ve Yön İşareti",
        category: NAV,
        question: "Departure hangi doğrultudaki mesafedir?",
        options: ["Doğu–batı (yatay)", "Kuzey–güney (düşey)", "Düşey derinlik", "Toplam seyir mesafesi"],
        correctAnswer: 0,
        explanation:
          "Departure, düzlem seyirde doğu–batı doğrultusundaki yatay mesafedir (deniz mili). DLat ise kuzey–güney bileşenidir.",
      },
      {
        id: 2,
        sectionRef: "Departure’ın Tanımı ve Yön İşareti",
        category: NAV,
        question: "Doğuya doğru seyirde departure işareti nasıl alınır?",
        options: ["Pozitif (doğu)", "Negatif (batı)", "Daima sıfır", "Enleme göre değişir"],
        correctAnswer: 0,
        explanation: "Doğu yönlü departure pozitif, batı yönlü negatif kabul edilir; yanlış işaret geometrik hata üretir.",
      },
      {
        id: 3,
        sectionRef: "Mesafe ve Kurs Kullanılarak Departure Hesabı",
        category: NAV,
        question: "Departure hangi bağıntıyla hesaplanır?",
        options: ["Departure = Mesafe × sin Kurs", "Departure = Mesafe × cos Kurs", "Departure = Mesafe ÷ sin Kurs", "Departure = Hız × Zaman"],
        correctAnswer: 0,
        explanation: "Departure = Mesafe × sin(Kurs); DLat = Mesafe × cos(Kurs). Dik üçgenin yatay kenarıdır.",
      },
      {
        id: 4,
        sectionRef: "Sayısal Örnek: Mesafe ve Kurs ile Departure",
        category: NAV,
        question: "40 NM mesafe ve 060° rota için departure yaklaşık kaçtır?",
        options: ["34.6 NM", "20 NM", "40 NM", "60 NM"],
        correctAnswer: 0,
        explanation: "Departure = 40 × sin(60°) = 40 × 0.866 ≈ 34.6 NM doğu.",
      },
      {
        id: 5,
        sectionRef: "DLat ile Departure Arasındaki Geometrik İlişki",
        category: NAV,
        question: "DLat ve departure bilindiğinde kurs hangi bağıntıyla bulunur?",
        options: ["tan Kurs = Departure ÷ DLat", "tan Kurs = DLat ÷ Departure", "cos Kurs = Departure ÷ DLat", "Kurs = Departure × DLat"],
        correctAnswer: 0,
        explanation: "tan(Kurs) = Departure ÷ DLat; dik üçgende yatay/düşey bileşen oranıdır.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "Set ve drift",
    blocks: [
      {
        sectionTitles: ["Set ve Drift Kavramı", "Set ve Drift Kaynakları"],
      },
      {
        sectionTitles: ["Akıntı Vektörü Tanımı"],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Set ve Drift Kavramı",
        category: NAV,
        question: "Set ve drift sırasıyla neyi ifade eder?",
        options: [
          "Set = akıntının yönü, Drift = akıntının hızı",
          "Set = akıntının hızı, Drift = akıntının yönü",
          "Set = rüzgâr yönü, Drift = gemi hızı",
          "Set = gemi rotası, Drift = gemi sürati",
        ],
        correctAnswer: 0,
        explanation: "Set akıntının hakiki yönü (derece), drift ise akıntının hızıdır (knot).",
      },
      {
        id: 2,
        sectionRef: "Set ve Drift Kaynakları",
        category: NAV,
        question: "Akıntı seti neye göre tanımlanır?",
        options: ["Hakiki kuzeye göre", "Geminin pruvasına göre", "Manyetik kuzeye göre", "Rüzgâr yönüne göre"],
        correctAnswer: 0,
        explanation:
          "Set hakiki kuzeye göre tanımlanır ve geminin hangi yöne gittiğinden bağımsızdır.",
      },
      {
        id: 3,
        sectionRef: "Set ve Drift Kaynakları",
        category: NAV,
        question: "Set 135° olan bir akıntı hangi yöne akar?",
        options: ["Güneydoğuya", "Kuzeybatıya", "Güneybatıya", "Kuzeydoğuya"],
        correctAnswer: 0,
        explanation: "135° hakiki = güneydoğu yönü; akıntı su kütlesini güneydoğuya taşır.",
      },
      {
        id: 4,
        sectionRef: "Akıntı Vektörü Tanımı",
        category: NAV,
        question: "Akıntı vektörü hangi iki bilgiyle temsil edilir?",
        options: ["(Set, Drift)", "(COG, SOG)", "(Heading, STW)", "(Variation, Deviation)"],
        correctAnswer: 0,
        explanation: "Akıntı Vektörü = (Set, Drift): set yön, drift hız bilgisidir.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "Akıntı vektörleri",
    blocks: [
      {
        sectionTitles: ["Akıntı Vektörlerinin Görsel Mantığı", "Temel Vektör Eşitliği"],
      },
      {
        sectionTitles: ["Bileşenlere Ayırma", "Bileşenden Büyüklük ve Yön"],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Temel Vektör Eşitliği",
        category: NAV,
        question: "Geminin yer hız vektörü (COG/SOG) nasıl bulunur?",
        options: [
          "Suya göre hız vektörü + akıntı vektörü",
          "Suya göre hız vektörü − rüzgâr vektörü",
          "Akıntı vektörü − suya göre hız vektörü",
          "Heading + Variation",
        ],
        correctAnswer: 0,
        explanation: "Yer Hız Vektörü = Suya Göre Hız Vektörü + Akıntı Vektörü.",
      },
      {
        id: 2,
        sectionRef: "Bileşenlere Ayırma",
        category: NAV,
        question: "Bir vektörün doğu (E) bileşeni nasıl bulunur?",
        options: ["Hız × sin(Yön)", "Hız × cos(Yön)", "Hız ÷ sin(Yön)", "Hız + Yön"],
        correctAnswer: 0,
        explanation: "Doğu bileşeni = Hız × sin(Yön); kuzey bileşeni = Hız × cos(Yön) (hakiki kuzey referansı).",
      },
      {
        id: 3,
        sectionRef: "Bileşenden Büyüklük ve Yön",
        category: NAV,
        question: "N ve E bileşenleri toplandıktan sonra SOG nasıl bulunur?",
        options: ["SOG = √(N² + E²)", "SOG = N + E", "SOG = N × E", "SOG = E ÷ N"],
        correctAnswer: 0,
        explanation: "SOG = √(N² + E²); COG ise tan(COG) = E ÷ N ile bulunur.",
      },
      {
        id: 4,
        sectionRef: "Bileşenden Büyüklük ve Yön",
        category: NAV,
        question: "Yer vektörünün yönü (COG) hangi bağıntıyla bulunur?",
        options: ["tan(COG) = E ÷ N", "tan(COG) = N ÷ E", "cos(COG) = E ÷ N", "COG = N × E"],
        correctAnswer: 0,
        explanation: "tan(COG) = E ÷ N; sonucun çeyreği N ve E işaretlerinden belirlenir.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "Leeway",
    blocks: [
      {
        sectionTitles: ["Detaylı Anlatım"],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Detaylı Anlatım",
        category: NAV,
        question: "Leeway nedir?",
        options: [
          "Rüzgâr etkisiyle dümenlenen rota (CTS) ile gerçek ilerleme (CMG) arasındaki açısal fark",
          "Akıntının gemiyi taşıdığı mesafe",
          "Pusula ile manyetik kuzey arası açı",
          "İki kerteriz arasındaki fark",
        ],
        correctAnswer: 0,
        explanation:
          "Leeway, rüzgârın yanal sürüklemesi sonucu dümenlenen rota ile gerçek ilerleme doğrultusu arasında oluşan açıdır.",
      },
      {
        id: 2,
        sectionRef: "Detaylı Anlatım",
        category: NAV,
        question: "Rüzgâr iskele tarafından gelirse gemi hangi yöne sürüklenir?",
        options: ["Sancağa (rüzgâr altına)", "İskeleye", "İleriye", "Geriye"],
        correctAnswer: 0,
        explanation: "Leeway daima rüzgâr altına doğrudur; rüzgâr iskeleden gelirse gemi sancağa sürüklenir.",
      },
      {
        id: 3,
        sectionRef: "Detaylı Anlatım",
        category: NAV,
        question: "Gerçek ilerleme (CMG) ile dümenlenen rota (CTS) ilişkisi nedir?",
        options: ["CMG = CTS ± Leeway", "CMG = CTS × Leeway", "CMG = CTS + Variation", "CMG = CTS − Drift"],
        correctAnswer: 0,
        explanation: "CMG = CTS ± Leeway. Rüzgâr iskeleden → CTS − L; rüzgâr sancaktan → CTS + L.",
      },
      {
        id: 4,
        sectionRef: "Detaylı Anlatım",
        category: NAV,
        question: "CTS 090°T, rüzgâr iskeleden, leeway 5° ise CMG nedir?",
        options: ["085°T", "095°T", "090°T", "080°T"],
        correctAnswer: 0,
        explanation: "Rüzgâr iskeleden → gemi sancağa kayar → CMG = 090° − 5° = 085°T.",
      },
      {
        id: 5,
        sectionRef: "Detaylı Anlatım",
        category: NAV,
        question: "İstenen CMG 090°T, rüzgâr iskeleden, leeway 5° ise dümenlenecek rota (CTS) nedir?",
        options: ["095°T", "085°T", "090°T", "100°T"],
        correctAnswer: 0,
        explanation: "Sürüklenmeyi telafi için rüzgâr üstüne düzeltilir: CTS = 090° + 5° = 095°T → gemi 090° CMG'ye oturur.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "Öğle mevkii (enlem)",
    blocks: [
      {
        sectionTitles: [
          "Aşama 1: Yerel öğle anının tespiti",
          "Aşama 2: En büyük yükseklikten Ho’nun elde edilmesi",
        ],
      },
      {
        sectionTitles: [
          "Aşama 3: Zenit uzaklığının (Z) kurulması",
          "Aşama 4: Enlemin belirlenmesi (kuzey/güney yorumu)",
        ],
      },
      {
        sectionTitles: ["Örnek Uygulama"],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Aşama 1: Yerel öğle anının tespiti",
        category: NAV,
        question: "Yerel öğle anı nasıl belirlenir?",
        options: [
          "Güneş'in yüksekliğinin en BÜYÜK olduğu an",
          "Saatin tam 12:00 olduğu an",
          "Güneş'in battığı an",
          "Kronometrenin sıfırlandığı an",
        ],
        correctAnswer: 0,
        explanation:
          "Yerel öğle, Güneş'in yüksekliğinin maksimuma ulaştığı (meridyen geçişi) andır; saat bilgisine göre değil.",
      },
      {
        id: 2,
        sectionRef: "Aşama 3: Zenit uzaklığının (Z) kurulması",
        category: NAV,
        question: "Zenit uzaklığı (Z) hangi bağıntıyla bulunur?",
        options: ["Z = 90° − Ho", "Z = Ho − 90°", "Z = 90° + Ho", "Z = Ho ÷ 2"],
        correctAnswer: 0,
        explanation: "Z = 90° − Ho; Ho meridyendeki düzeltilmiş yüksekliktir.",
      },
      {
        id: 3,
        sectionRef: "Aşama 4: Enlemin belirlenmesi (kuzey/güney yorumu)",
        category: NAV,
        question: "Güneş ve gözlemci AYNI yarımkürede ise enlem nasıl bulunur?",
        options: ["φ = Z + δ", "φ = Z − δ", "φ = δ − Z", "φ = 90° − δ"],
        correctAnswer: 0,
        explanation: "Aynı yarımkürede φ = Z + δ; karşı yarımkürede φ = Z − δ (işaret meridyen geçiş yönüne göre).",
      },
      {
        id: 4,
        sectionRef: "Örnek Uygulama",
        category: NAV,
        question: "Ho = 63°20.0′ ölçülürse zenit uzaklığı Z kaçtır?",
        options: ["26°40.0′", "63°20.0′", "36°40.0′", "16°40.0′"],
        correctAnswer: 0,
        explanation: "Z = 90° − 63°20.0′ = 26°40.0′.",
      },
      {
        id: 5,
        sectionRef: "Örnek Uygulama",
        category: NAV,
        question: "Z = 26°40.0′, δ = 18°10.0′N ve Güneş güneyde geçiyorsa enlem nedir?",
        options: ["08°30.0′ N", "44°50.0′ N", "18°10.0′ N", "26°40.0′ N"],
        correctAnswer: 0,
        explanation: "Bu durumda φ = Z − δ = 26°40.0′ − 18°10.0′ = 08°30.0′ N.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "Büyük daire mesafesi",
    blocks: [
      {
        sectionTitles: ["Büyük Daire Mesafesinin Geometrisi", "Merkez Açı Formülü (Küresel Kosinüs)"],
      },
      {
        sectionTitles: ["Merkez Açıdan Mesafeye Geçiş", "Örnek Hesap (Adım Adım)"],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Büyük Daire Mesafesinin Geometrisi",
        category: NAV,
        question: "Büyük daire mesafesi nedir?",
        options: [
          "Küre üzerinde iki nokta arasındaki en kısa yüzey yolu",
          "İki nokta arası sabit kerterizli rota",
          "Haritadaki düz çizgi mesafesi",
          "İki meridyen arası uzaklık",
        ],
        correctAnswer: 0,
        explanation:
          "Büyük daire, küre üzerinde iki mevki arasındaki en kısa yüzey yoludur; Dünya merkezindeki merkez açıyla tanımlanır.",
      },
      {
        id: 2,
        sectionRef: "Merkez Açı Formülü (Küresel Kosinüs)",
        category: NAV,
        question: "Merkez açı (θ) hangi teoremle bulunur?",
        options: [
          "cos θ = sin φ₁·sin φ₂ + cos φ₁·cos φ₂·cos Δλ",
          "θ = Mesafe × sin Kurs",
          "tan θ = Departure ÷ DLat",
          "θ = 90° − Ho",
        ],
        correctAnswer: 0,
        explanation: "Küresel kosinüs teoremi merkez açıyı doğrudan verir; düzlem trigonometrisi yetersizdir.",
      },
      {
        id: 3,
        sectionRef: "Merkez Açıdan Mesafeye Geçiş",
        category: NAV,
        question: "Merkez açı θ'dan büyük daire mesafesi nasıl bulunur?",
        options: ["Mesafe (NM) = θ × 60", "Mesafe = θ ÷ 60", "Mesafe = θ × 6", "Mesafe = θ²"],
        correctAnswer: 0,
        explanation: "1° büyük daire yayı = 60 NM kabulüyle Mesafe = θ(derece) × 60.",
      },
      {
        id: 4,
        sectionRef: "Örnek Hesap (Adım Adım)",
        category: NAV,
        question: "Merkez açı θ ≈ 53.4° bulunduysa büyük daire mesafesi yaklaşık kaçtır?",
        options: ["≈ 3204 NM", "≈ 534 NM", "≈ 890 NM", "≈ 6408 NM"],
        correctAnswer: 0,
        explanation: "53.4 × 60 ≈ 3204 NM (teorik en kısa deniz yolu).",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "12’ler kuralı",
    blocks: [
      {
        sectionTitles: ["12’ler Kuralının Adım Adım Uygulaması"],
      },
      {
        sectionTitles: ["Kural Sınırları ve Ne Zaman Tidal Curve Kullanılmalı"],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "12’ler Kuralının Adım Adım Uygulaması",
        category: NAV,
        question: "12'ler kuralında saatlik değişim oranları nedir?",
        options: ["1 – 2 – 3 – 3 – 2 – 1 (×1/12 Range)", "2 – 2 – 2 – 2 – 2 – 2", "1 – 1 – 1 – 3 – 3 – 3", "3 – 2 – 1 – 1 – 2 – 3"],
        correctAnswer: 0,
        explanation: "Her saatte sırasıyla 1/12, 2/12, 3/12, 3/12, 2/12, 1/12 değişir; toplam 12/12 = tam range.",
      },
      {
        id: 2,
        sectionRef: "12’ler Kuralının Adım Adım Uygulaması",
        category: NAV,
        question: "Height of tide hangi bağıntıyla bulunur?",
        options: [
          "LW yüksekliği + (Kümülatif oran × Range)",
          "HW yüksekliği × Kümülatif oran",
          "Range ÷ 12",
          "LW + HW",
        ],
        correctAnswer: 0,
        explanation: "Height of tide = LW + (kümülatif oran × Range); kümülatif: 1/12, 3/12, 6/12, 9/12, 11/12, 12/12.",
      },
      {
        id: 3,
        sectionRef: "12’ler Kuralının Adım Adım Uygulaması",
        category: NAV,
        question: "LW=0.6 m, HW=5.4 m (Range 4.8 m) için LW'den 3 saat sonraki height of tide kaçtır?",
        options: ["3.0 m", "2.4 m", "4.2 m", "5.4 m"],
        correctAnswer: 0,
        explanation: "0.6 + (6/12 × 4.8) = 0.6 + 2.4 = 3.0 m.",
      },
      {
        id: 4,
        sectionRef: "Kural Sınırları ve Ne Zaman Tidal Curve Kullanılmalı",
        category: NAV,
        question: "12'ler kuralı ne zaman yetersiz kalır ve tidal curve gerekir?",
        options: [
          "Periyot 6 saatten farklıysa, asimetrik gelgitte veya kritik UKC hesabında",
          "Her zaman yeterlidir",
          "Yalnızca gündüz hesaplarında",
          "Yalnızca spring tide'da",
        ],
        correctAnswer: 0,
        explanation:
          "Kural 6 saatlik simetrik döngü varsayar; periyot farklıysa/asimetrikse veya UKC marjı dar ise tidal curve kullanılır.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "Intercept yöntemi",
    blocks: [
      {
        sectionTitles: ["Yöntemin Temel Mantığı", "Adım 1: Varsayılan Mevki (AP) Seçimi"],
      },
      {
        sectionTitles: [
          "Adım 2: GHA, LHA ve Deklinasyon Hesabı",
          "Adım 4: Intercept (a) Hesabı",
          "Adım 5: Toward / Away Kuralı",
        ],
      },
      {
        sectionTitles: ["Adım 6: LOP Çizimi", "Tam Hesap Örneği"],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Yöntemin Temel Mantığı",
        category: NAV,
        question: "Intercept yöntemi temelde hangi soruyu yanıtlar?",
        options: [
          "Varsayılan mevkiye göre gözlenen ve hesaplanan yükseklik arasındaki sapma nedir?",
          "Geminin tam boylamı nedir?",
          "Akıntının seti nedir?",
          "Geminin hızı nedir?",
        ],
        correctAnswer: 0,
        explanation:
          "Yöntem, AP'ye göre Hc ile Ho farkını bularak mevki hattı (LOP) verir; doğrudan mevki vermez.",
      },
      {
        id: 2,
        sectionRef: "Adım 1: Varsayılan Mevki (AP) Seçimi",
        category: NAV,
        question: "Varsayılan mevki (AP) nasıl seçilir?",
        options: [
          "DR mevkiine yakın, tam derece enlem ve tam dakika boylam olarak",
          "Rastgele herhangi bir noktada",
          "Daima ekvatorda",
          "Gök cisminin tam altında",
        ],
        correctAnswer: 0,
        explanation:
          "AP, DR yakınında tam derece değerlerle seçilir (Sight Reduction tabloları tam giriş ister); fark tipik olarak 30–60 NM altında tutulur.",
      },
      {
        id: 3,
        sectionRef: "Adım 4: Intercept (a) Hesabı",
        category: NAV,
        question: "Intercept (a) hangi bağıntıyla bulunur ve birimi nedir?",
        options: ["a = Ho − Hc (1′ = 1 NM)", "a = Hc − Ho (derece)", "a = 90° − Ho", "a = Zn ÷ 2"],
        correctAnswer: 0,
        explanation: "a = Ho − Hc; dakika cinsinden çıkar ve 1′ = 1 NM olarak mesafeye dönüşür.",
      },
      {
        id: 4,
        sectionRef: "Adım 5: Toward / Away Kuralı",
        category: NAV,
        question: "Ho > Hc (a > 0) ise LOP hangi yöne taşınır?",
        options: ["TOWARD (gök cismine doğru)", "AWAY (gök cisminden uzağa)", "Daima kuzeye", "Daima Zn'ye dik geriye"],
        correctAnswer: 0,
        explanation: "Ho > Hc → gemi gök cismine daha yakın → TOWARD. (Hafıza: HoMoTo — Ho More, Toward.)",
      },
      {
        id: 5,
        sectionRef: "Adım 6: LOP Çizimi",
        category: NAV,
        question: "LOP hangi doğrultuda çizilir?",
        options: ["Azimuta dik: Zn ± 90°", "Azimutla aynı: Zn", "Daima 000°–180°", "Rota doğrultusunda"],
        correctAnswer: 0,
        explanation: "LOP daima azimut (Zn) doğrultusuna diktir; intercept mesafesi Zn boyunca taşınır.",
      },
      {
        id: 6,
        sectionRef: "Tam Hesap Örneği",
        category: NAV,
        question: "Örnekte Ho = 41°33.3′, Hc = 41°26.8′ ise intercept nedir?",
        options: ["+6.5′ = 6.5 NM TOWARD", "−6.5′ = 6.5 NM AWAY", "+10′ = 10 NM TOWARD", "0 NM (mevki AP'de)"],
        correctAnswer: 0,
        explanation: "a = 41°33.3′ − 41°26.8′ = +6.5′ → 6.5 NM TOWARD (Ho > Hc).",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "UKC ve squat",
    blocks: [
      {
        sectionTitles: ["Squat Hesabı: Barras Formülü ve Basit Yaklaşım"],
      },
      {
        sectionTitles: ["Squat Yönetimi ve UKC'ye Entegrasyonu"],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Squat Hesabı: Barras Formülü ve Basit Yaklaşım",
        category: NAV,
        question: "Squat nedir?",
        options: [
          "İlerleyen geminin hız nedeniyle normalden fazla suya gömülmesi",
          "Geminin demir taraması",
          "Rüzgârla oluşan yana yatma",
          "Gelgit kaynaklı su yükselmesi",
        ],
        correctAnswer: 0,
        explanation:
          "Squat, hareket halindeki geminin altındaki basıncın azalmasıyla suya normalden fazla gömülmesidir; sığ su ve dar kanalda belirginleşir.",
      },
      {
        id: 2,
        sectionRef: "Squat Hesabı: Barras Formülü ve Basit Yaklaşım",
        category: NAV,
        question: "Barras formülüne göre açık suda squat nasıl hesaplanır?",
        options: ["S = Cb × V² / 100", "S = Cb × V / 100", "S = V² / Cb", "S = Cb + V²"],
        correctAnswer: 0,
        explanation: "Barras: S = Cb × V² / 100 (Cb block katsayısı, V knot). Hız kareyle etkilidir.",
      },
      {
        id: 3,
        sectionRef: "Squat Hesabı: Barras Formülü ve Basit Yaklaşım",
        category: NAV,
        question: "Cb = 0.80 ve V = 8 knot için squat yaklaşık kaçtır?",
        options: ["0.51 m", "0.80 m", "0.10 m", "1.28 m"],
        correctAnswer: 0,
        explanation: "S = 0.80 × 64 / 100 = 0.51 m.",
      },
      {
        id: 4,
        sectionRef: "Squat Yönetimi ve UKC'ye Entegrasyonu",
        category: NAV,
        question: "Hız iki katına çıkarsa squat nasıl değişir?",
        options: ["Yaklaşık dört katına çıkar", "İki katına çıkar", "Yarıya iner", "Değişmez"],
        correctAnswer: 0,
        explanation: "Squat hızın karesiyle orantılıdır; hız 2 katına çıkınca squat ~4 katına çıkar.",
      },
      {
        id: 5,
        sectionRef: "Squat Yönetimi ve UKC'ye Entegrasyonu",
        category: NAV,
        question: "Squat'ı azaltmanın temel yolu nedir?",
        options: ["Hızı azaltmak", "Balast almak", "Dümeni ortalamak", "Trim'i değiştirmek"],
        correctAnswer: 0,
        explanation: "Squat'ı düşürmenin tek pratik yolu hız azaltmadır; dinamik draft = statik draft + squat.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "Bridge Resource Management (BRM)",
    blocks: [
      {
        sectionTitles: ["BRM’nin Temel Bileşenleri: Liderlik, İletişim ve Durumsal Farkındalık"],
      },
      {
        sectionTitles: ["Görev Paylaşımı ve İş Yükü Yönetimi", "Karar Alma Süreçleri ve Hata Yönetimi"],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "BRM’nin Temel Bileşenleri: Liderlik, İletişim ve Durumsal Farkındalık",
        category: NAV,
        question: "Aşırı 'otorite gradyanı' neden tehlikelidir?",
        options: [
          "Ast personelin kritik bilgileri bildirememesine yol açar",
          "Kaptanın yetkisini azaltır",
          "Radar menzilini düşürür",
          "Yakıt tüketimini artırır",
        ],
        correctAnswer: 0,
        explanation:
          "Aşırı otorite farkı, astların kritik uyarıları iletmesini engeller; BRM bu gradyanı yönetmeyi hedefler.",
      },
      {
        id: 2,
        sectionRef: "BRM’nin Temel Bileşenleri: Liderlik, İletişim ve Durumsal Farkındalık",
        category: NAV,
        question: "Kapalı döngü (read-back/hear-back) iletişim nedir?",
        options: [
          "Verilen her talimatın tekrar edilip onaylanması",
          "Sadece VHF ile konuşmak",
          "Talimatları yazılı vermek",
          "Tek kişinin karar vermesi",
        ],
        correctAnswer: 0,
        explanation: "Kapalı döngü iletişimde her talimat tekrar edilip onaylanır; yanlış anlamaları önler.",
      },
      {
        id: 3,
        sectionRef: "BRM’nin Temel Bileşenleri: Liderlik, İletişim ve Durumsal Farkındalık",
        category: NAV,
        question: "'Durumsal farkındalık kaybı' BRM açısından neyi ifade eder?",
        options: [
          "Ekibin ortak zihinsel modelinin bozulması — büyük kazaların yaygın öncüsü",
          "Radarın arızalanması",
          "Geminin demir taraması",
          "Yakıt göstergesinin sıfırlanması",
        ],
        correctAnswer: 0,
        explanation:
          "Durumsal farkındalık, ekibin konum/trafik/hava/plan hakkında ortak modelidir; kaybı büyük kazaların en yaygın öncüsüdür.",
      },
      {
        id: 4,
        sectionRef: "Görev Paylaşımı ve İş Yükü Yönetimi",
        category: NAV,
        question: "Seyir haritasını izleyen subay ile VHF trafiğini takip eden subayın FARKLI kişiler olması neyi önler?",
        options: [
          "Tek nokta arızasını ve tünel vizyonunu",
          "Yakıt tüketimini",
          "Pusula deviasyonunu",
          "Gelgit hatasını",
        ],
        correctAnswer: 0,
        explanation:
          "Görevlerin paylaşılması, tek kişinin aşırı yüklenmesini (tünel vizyonu) ve tek nokta arızasını önler.",
      },
      {
        id: 5,
        sectionRef: "Karar Alma Süreçleri ve Hata Yönetimi",
        category: NAV,
        question: "TEM (Threat and Error Management) modelinin akışı nedir?",
        options: ["Tehdit → Hata → Sonuç yönetimi", "Hata → Tehdit → Karar", "Sonuç → Tehdit → Hata", "Karar → Tehdit → Hata"],
        correctAnswer: 0,
        explanation: "TEM: önce tehdit tespit edilir, hata önlenemezse sonucu yönetilir (emniyetsiz durum önlenir).",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    topicKey: "navigation",
    topicTitle: "Restricted visibility",
    blocks: [
      {
        sectionTitles: [
          "Kural 19: Kapsamı ve Temel Yükümlülükler",
          "Sis Prosedürleri ve GMDSS Yükümlülükleri",
        ],
      },
      {
        sectionTitles: [
          "Radar ARPA Analizi ve Manevra Kısıtlamaları",
          "Kural 19 ile Diğer Kurallar Arasındaki İlişki",
        ],
      },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Kural 19: Kapsamı ve Temel Yükümlülükler",
        category: NAV,
        question: "Kural 19(d)(i)'ye göre, yalnızca radar izine dayanarak baş omuzdan gelen gemiye karşı hangi manevradan kaçınılır?",
        options: ["Rotayı iskeleye almaktan", "Rotayı sancağa almaktan", "Hız azaltmaktan", "Ses işareti vermekten"],
        correctAnswer: 0,
        explanation:
          "Baş omuzdan gelen hedef için iskeleye dönmekten kaçınılır (iki gemi aynı yöne dönebilir); sancağa dönüş veya hız azaltma tercih edilir.",
      },
      {
        id: 2,
        sectionRef: "Kural 19: Kapsamı ve Temel Yükümlülükler",
        category: NAV,
        question: "Kural 19(e): çatışma kaçınılmaz noktaya gelindiğinde ne yapılır?",
        options: [
          "Hız azalt, tam dur veya tornista (astern) ver",
          "Hızlan ve sıyrıl",
          "Rotayı koru",
          "Yalnızca VHF ile anlaş",
        ],
        correctAnswer: 0,
        explanation: "Kural 19(e): hızı asgariye indir, gerekirse tüm yolu kes (dur/astern).",
      },
      {
        id: 3,
        sectionRef: "Sis Prosedürleri ve GMDSS Yükümlülükleri",
        category: NAV,
        question: "Yolda olan motorlu bir gemi kısıtlı görüşte hangi ses işaretini verir (Kural 35a)?",
        options: ["Her 2 dakikada bir uzun düdük", "Her 1 dakikada 5 saniye çan", "2 dakikada 1 uzun + 2 kısa", "Sürekli düdük"],
        correctAnswer: 0,
        explanation: "Yolda motorlu gemi: 2 dakikada bir uzun düdük. (Demirli gemi 1 dakikada çan; NUC/RAM 1 uzun + 2 kısa.)",
      },
      {
        id: 4,
        sectionRef: "Radar ARPA Analizi ve Manevra Kısıtlamaları",
        category: NAV,
        question: "Kısıtlı görüşte çatışma riskini belirlemenin birincil aracı nedir?",
        options: ["ARPA ile CPA/TCPA analizi", "Sadece görsel gözcü", "El feneri işaretleri", "Sadece AIS isimleri"],
        correctAnswer: 0,
        explanation: "ARPA CPA/TCPA analizi temel araçtır; çok hedefte 'seçici manevra' (selective avoidance) uygulanır.",
      },
      {
        id: 5,
        sectionRef: "Kural 19 ile Diğer Kurallar Arasındaki İlişki",
        category: NAV,
        question: "Kural 19 uygulanırken give-way / stand-on ayrımı (Kural 15–17) ne olur?",
        options: ["Uygulanmaz (devre dışıdır)", "Aynen geçerlidir", "Sadece gündüz geçerlidir", "Yalnızca kavşakta geçerlidir"],
        correctAnswer: 0,
        explanation:
          "Görsel temas yokken Kural 19 geçerlidir ve give-way/stand-on ayrımını ortadan kaldırır; görsel temas başlayınca ilgili kurala geçilir.",
      },
    ],
  },
  {
    topicKey: "navigation",
    topicTitle: "Coğrafi koordinat sistemi",
    blocks: [
      { sectionTitles: ["Koordinat Sistemine Genel Bakış", "Paraleller ve Meridyenler"] },
      { sectionTitles: ["Enlem (Latitude) Kavramı", "Enlem Paralelleri"] },
      { sectionTitles: ["Boylam ve Zaman İlişkisi", "Boylamda Mesafe Kavramının Değişmesi"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Paraleller ve Meridyenler",
        category: NAV,
        question: "Meridyenler ve paraleller hakkında hangisi doğrudur?",
        options: [
          "Meridyenler kutuplarda birleşir, paraleller asla kesişmez",
          "Paraleller kutuplarda birleşir",
          "Meridyenlerin hepsi farklı uzunluktadır",
          "Ekvator en küçük paraleldir",
        ],
        correctAnswer: 0,
        explanation: "Tüm meridyenler eşit uzunlukta olup kutuplarda birleşir; paraleller ekvatora paralel dairelerdir ve kesişmez.",
      },
      {
        id: 2,
        sectionRef: "Enlem Paralelleri",
        category: NAV,
        question: "1 dakika (1′) enlem kaç deniz miline karşılık gelir?",
        options: ["1 deniz mili", "60 deniz mili", "4 deniz mili", "15 deniz mili"],
        correctAnswer: 0,
        explanation: "1° enlem = 60 NM, dolayısıyla 1′ enlem = 1 NM; bu yüzden enlem çizgisi doğrudan mesafe ölçeğidir.",
      },
      {
        id: 3,
        sectionRef: "Boylam ve Zaman İlişkisi",
        category: NAV,
        question: "15° boylam farkı kaç saatlik zaman farkına eşittir?",
        options: ["1 saat", "4 dakika", "24 saat", "15 dakika"],
        correctAnswer: 0,
        explanation: "Dünya 24 saatte 360° döner; 15° = 1 saat, 1° = 4 dakika, 1′ = 4 saniye.",
      },
      {
        id: 4,
        sectionRef: "Boylamda Mesafe Kavramının Değişmesi",
        category: NAV,
        question: "Boylam mesafesi (departure) enlemle nasıl ilişkilidir?",
        options: [
          "Departure = DLong × cos(Lat) — enleme doğru azalır",
          "Departure = DLong × sin(Lat)",
          "Boylam mesafesi her enlemde sabittir",
          "Departure = DLong / cos(Lat)",
        ],
        correctAnswer: 0,
        explanation: "Meridyenler kutba doğru yaklaşır; ekvatorda 1° boylam=60 NM, 60° enlemde 30 NM, kutupta 0. Dep = DLong×cos(Lat).",
      },
    ],
  },
  {
    topicKey: "navigation",
    topicTitle: "Zamanla boylam",
    blocks: [
      { sectionTitles: ["Temel İlke: Dünya Dönüşü ve Zaman", "Yerel Zaman ve Greenwich Zamanı"] },
      { sectionTitles: ["Hata Kaynakları ve Uygulama Disiplini", "Örnek Hesap: Zaman Farkından Boylam"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Temel İlke: Dünya Dönüşü ve Zaman",
        category: NAV,
        question: "Boylam zaman farkından nasıl hesaplanır?",
        options: [
          "λ = Δt × 15° (Δt: Greenwich ile yerel zaman farkı)",
          "λ = Δt / 15°",
          "λ = Δt × 60",
          "λ = Δt × cos(enlem)",
        ],
        correctAnswer: 0,
        explanation: "24 saat = 360° olduğundan 1 saat = 15°; boylam = zaman farkı × 15°.",
      },
      {
        id: 2,
        sectionRef: "Yerel Zaman ve Greenwich Zamanı",
        category: NAV,
        question: "Yerel zaman Greenwich'ten ileri ise boylam hangi yöndedir?",
        options: ["Doğu boylamı", "Batı boylamı", "Daima ekvator", "Belirsiz"],
        correctAnswer: 0,
        explanation: "Yerel zaman Greenwich'ten ileriyse doğu, geriyse batı boylamıdır.",
      },
      {
        id: 3,
        sectionRef: "Örnek Hesap: Zaman Farkından Boylam",
        category: NAV,
        question: "Yerel öğle 12:00, kronometre Greenwich 09:40 ise boylam yaklaşık kaçtır?",
        options: ["≈ 35° Doğu", "≈ 35° Batı", "≈ 23° Doğu", "≈ 9.4° Batı"],
        correctAnswer: 0,
        explanation: "Δt = 2 sa 20 dk = 2.333 sa; λ = 2.333 × 15° ≈ 35°; yerel ileri olduğundan Doğu.",
      },
    ],
  },
  {
    topicKey: "navigation",
    topicTitle: "Düzlem seyirin sınırları",
    blocks: [
      { sectionTitles: ["Düzlem Seyirin Sınırlarını Belirleyen Temel Etken", "Boylam Dakikasının Fiziksel Gerçeği"] },
      { sectionTitles: ["Hatanın Mesafeyle Artışı", "Düzlem Seyirin Kullanılabileceği ve Kullanılmaması Gereken Durumlar"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Düzlem Seyirin Sınırlarını Belirleyen Temel Etken",
        category: NAV,
        question: "Düzlem seyirin sınırlarını belirleyen temel etken nedir?",
        options: [
          "Meridyenlerin kutuplara doğru yakınlaşması (boylam dakikası kısalır)",
          "Gemi hızının değişmesi",
          "Pusula sapması",
          "Dalga yüksekliği",
        ],
        correctAnswer: 0,
        explanation: "Düzlem seyir boylam dakikasını sabit varsayar; gerçekte kutuplara doğru kısalır, bu da departure hatası yaratır.",
      },
      {
        id: 2,
        sectionRef: "Boylam Dakikasının Fiziksel Gerçeği",
        category: NAV,
        question: "Boylam dakikasının gerçek uzunluğu neye bağlıdır?",
        options: [
          "İlgili enlemin kosinüsüne (cos enlem)",
          "Sabittir, her yerde 1 NM",
          "Gemi rotasına",
          "Mevsime",
        ],
        correctAnswer: 0,
        explanation: "Enlem dakikası ~1 NM sabit; boylam dakikası ise cos(enlem) ile orantılı kısalır.",
      },
      {
        id: 3,
        sectionRef: "Hatanın Mesafeyle Artışı",
        category: NAV,
        question: "Düzlem seyir yaklaşık kaç deniz miline kadar tercih edilir?",
        options: ["≈ 60 deniz mili", "≈ 600 deniz mili", "≈ 6 deniz mili", "Sınırsız"],
        correctAnswer: 0,
        explanation: "Hata doğu-batı bileşeniyle hızlanarak büyür; ~60 NM'den sonra orta enlem düzeltmesi gerekir.",
      },
    ],
  },
  {
    topicKey: "navigation",
    topicTitle: "Departure – boylam ilişkisi",
    blocks: [
      { sectionTitles: ["Departure’ın Tanımı ve Boylam Değişimi", "Boylam Dakikasının Geometrik Temeli"] },
      { sectionTitles: ["Orta Enlem Üzerinden Kurulan Bağıntı", "Sayısal Uygulama: Departure’dan Boylam Değişimi"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Boylam Dakikasının Geometrik Temeli",
        category: NAV,
        question: "1′ boylam kaç deniz miline karşılık gelir?",
        options: [
          "cos(Enlem) deniz mili",
          "Sabit 1 deniz mili",
          "sin(Enlem) deniz mili",
          "60 deniz mili",
        ],
        correctAnswer: 0,
        explanation: "1′ boylam = cos(enlem) NM; enlem arttıkça boylam dakikası kısalır.",
      },
      {
        id: 2,
        sectionRef: "Orta Enlem Üzerinden Kurulan Bağıntı",
        category: NAV,
        question: "Departure ile DLong arasındaki orta enlem bağıntısı nedir?",
        options: [
          "Departure = DLong × cos(Ortalama Enlem)",
          "Departure = DLong × sin(Ortalama Enlem)",
          "Departure = DLong / cos(Ortalama Enlem)",
          "Departure = DLong + Ortalama Enlem",
        ],
        correctAnswer: 0,
        explanation: "Ortalama enlem = başlangıç ve varış enlemlerinin ortalaması; Departure = DLong × cos(orta enlem).",
      },
      {
        id: 3,
        sectionRef: "Sayısal Uygulama: Departure’dan Boylam Değişimi",
        category: NAV,
        question: "Departure 48 NM doğu, ortalama enlem 35°40′ (cos≈0.812) ise DLong kaçtır?",
        options: ["≈ 59.1′ Doğu", "≈ 39.0′ Doğu", "≈ 48′ Doğu", "≈ 0.812′ Doğu"],
        correctAnswer: 0,
        explanation: "DLong = Departure / cos(orta enlem) = 48 / 0.812 ≈ 59.1′ Doğu.",
      },
    ],
  },
  {
    topicKey: "navigation",
    topicTitle: "İşaret Değişimi (Sign Change)",
    blocks: [
      { sectionTitles: ["Enlem İşaret Kuralı", "Boylam İşaret Kuralı"] },
      { sectionTitles: ["Aynı ve Farklı Yarımküre Mantığı", "Sayısal Örnek"] },
    ],
    questions: [
      {
        id: 1,
        sectionRef: "Enlem İşaret Kuralı",
        category: NAV,
        question: "Enlem ve boylam için işaret kuralı nedir?",
        options: [
          "Kuzey (+), güney (−); doğu (+), batı (−)",
          "Kuzey (−), güney (+); doğu (−), batı (+)",
          "Tüm yönler (+)",
          "İşaret kullanılmaz",
        ],
        correctAnswer: 0,
        explanation: "İşaret yön bilgisidir: kuzey/doğu pozitif, güney/batı negatif; işlemler mutlak değerle yapılıp yön sonradan verilir.",
      },
      {
        id: 2,
        sectionRef: "Aynı ve Farklı Yarımküre Mantığı",
        category: NAV,
        question: "12°N'den 5°S'ye gidildiğinde DLat nedir?",
        options: ["17° Güney", "7° Güney", "17° Kuzey", "7° Kuzey"],
        correctAnswer: 0,
        explanation: "Farklı yarımkürelerde mutlak değerler toplanır: 12+5=17°, varış yönü güney → 17° Güney.",
      },
      {
        id: 3,
        sectionRef: "Sayısal Örnek",
        category: NAV,
        question: "20°E'den 10°W'ye geçişte DLong nedir?",
        options: ["30° Batı", "10° Batı", "30° Doğu", "10° Doğu"],
        correctAnswer: 0,
        explanation: "Farklı taraflarda toplanır: 20+10=30°, varış batı → 30° Batı.",
      },
    ],
  },
];
