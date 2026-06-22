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
];
