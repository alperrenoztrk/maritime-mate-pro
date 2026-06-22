import type { Scenario } from "./types";

/**
 * Meteoroloji — fırtına/ağır hava karar senaryoları (beta).
 * Atıflar gerçek denizcilik uygulamasına dayanır (Buys Ballot kuralı,
 * tropikal siklon yarım daire teorisi, IMO MSC.1/Circ.1228 ağır hava rehberi).
 */

export const meteorologyScenarios: Scenario[] = [
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "tropical-cyclone-avoidance",
    topicKey: "meteorology",
    title: "Tropikal Siklon Kaçınma (Kuzey Yarım Küre)",
    level: "officer",
    briefing:
      "Kuzey Yarım Küre'de açık denizde seyirdesiniz. Barometre son 3 saatte hızla düşüyor (saatte ~3 hPa), uzun şişen denizler geliyor ve rüzgâr yönü zamanla SAAT YÖNÜNDE (veering) dönüyor. Bir tropikal siklon yaklaşıyor.",
    learningGoals: [
      "Rüzgâr yön değişiminden (veering/backing) yarım daireyi belirlemek",
      "Tehlikeli yarım dairede doğru kaçınma manevrasını seçmek",
      "Erken karar vermenin manevra alanına etkisini kavramak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Kuzey Yarım Küre'de rüzgâr saat yönünde (veering) dönüyor ve barometre hızla düşüyor.",
        question: "Hangi yarım dairedesiniz?",
        choices: [
          {
            text: "Tehlikeli yarım daire",
            outcome: "safe",
            feedback:
              "Doğru. Kuzey YK'de rüzgâr veering (saat yönü) ise gemi tehlikeli yarım dairededir; toplam rüzgâr translasyon + dönel bileşenle artar.",
            source: { code: "Tropikal Siklon Teorisi", detail: "KYK: veering → tehlikeli yarım daire" },
            next: "step2",
          },
          {
            text: "Seyir yapılabilir yarım daire",
            outcome: "danger",
            feedback:
              "Yanlış. Seyir yapılabilir yarım dairede rüzgâr saat tersine (backing) döner. Veering tehlikeli yarım daireyi gösterir.",
            source: { code: "Tropikal Siklon Teorisi", detail: "Backing → seyir yapılabilir" },
            next: "step2",
          },
          {
            text: "Belirsiz; Buys Ballot'a göre merkezi bulayım",
            outcome: "risky",
            feedback:
              "Kısmen doğru yaklaşım. Buys Ballot (KYK: rüzgâra sırtını dön → alçak merkez solda) merkezi bulmaya yarar; ama rüzgârın veering olması zaten tehlikeli yarım daireyi gösteriyor.",
            source: { code: "Buys Ballot Kuralı", detail: "KYK: alçak merkez solda" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "Tehlikeli yarım dairede olduğunuzu belirlediniz.",
        question: "Kaçınma manevrası ne olmalı?",
        choices: [
          {
            text: "Rüzgârı sancak baş omuzluğuna alıp siklondan uzaklaşırım",
            outcome: "safe",
            feedback:
              "Doğru. Tehlikeli yarım dairede rüzgâr sancak baş omuzluğuna alınarak (gemiyi açık tarafa atarak) siklon yolundan uzaklaşılır.",
            source: { code: "Tropikal Siklon Kaçınma", detail: "Tehlikeli yarım daire: rüzgâr sancak baş omuzlukta" },
            next: "step3",
          },
          {
            text: "Rüzgârı kıç omuzluğa alıp siklonun gerisine geçerim",
            outcome: "danger",
            feedback:
              "Bu seyir YAPILABİLİR yarım daire manevrasıdır. Tehlikeli yarım dairede uygulanırsa gemiyi siklonun yoluna sürükler.",
            source: { code: "Tropikal Siklon Kaçınma", detail: "Kıç omuzluk = seyir yapılabilir yarım daire" },
            next: "step3",
          },
          {
            text: "Rotamı korur, sistem geçene kadar beklerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Tehlikeli yarım dairede pasif kalmak gemiyi en şiddetli sektöre ve siklonun yoluna bırakır.",
            source: { code: "Tropikal Siklon Kaçınma", detail: "Pasiflik riski artırır" },
            next: "step3",
          },
        ],
      },
      {
        id: "step3",
        situation: "Manevra yönüne karar verdiniz. Zamanlama kritik.",
        question: "Manevrayı ne zaman uygularsınız?",
        choices: [
          {
            text: "Mümkün olan en erken; yüksek hızla manevra alanını geniş tutarım",
            outcome: "safe",
            feedback:
              "Doğru. Erken karar alan gemi manevra alanını geniş tutar; siklonun öngörülen hız/yönü sürekli güncellenmelidir.",
            source: { code: "Ağır Hava Yönetimi", detail: "Erken manevra = geniş emniyet payı" },
          },
          {
            text: "Durum netleşene kadar beklerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Beklemek manevra alanını daraltır; siklon hızlandığında kaçış penceresi kapanabilir.",
            source: { code: "Ağır Hava Yönetimi", detail: "Gecikme kaçış penceresini kapatır" },
          },
          {
            text: "Doğrudan siklonun gözüne yönelir, geçmesini beklerim",
            outcome: "danger",
            feedback:
              "Çok tehlikeli. Göz çevresindeki duvar bulutu (eyewall) en şiddetli rüzgâr ve denizleri içerir; asla hedeflenmez.",
            source: { code: "Tropikal Siklon Yapısı", detail: "Eyewall en şiddetli bölgedir" },
          },
        ],
      },
    ],
    debrief:
      "Kuzey YK'de rüzgâr VEERING (saat yönü) + barometre hızlı düşüş = TEHLİKELİ yarım daire. Çözüm: rüzgârı SANCAK BAŞ OMUZLUĞUNA alıp erken ve hızlı şekilde siklon yolundan uzaklaşmak. Kıç omuzluk manevrası yalnızca seyir yapılabilir yarım daire içindir. Buys Ballot kuralı (KYK: alçak merkez solda) konumu teyit eder; erken karar manevra alanını belirler.",
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "heavy-weather-rolling",
    topicKey: "meteorology",
    title: "Ağır Hava: Senkron/Parametrik Yalpa Riski",
    level: "officer",
    briefing:
      "Uzun periyotlu (≈14 s) swell altında seyirdesiniz. Dalgalar kıç omuzluktan (quartering sea, ≈135°) geliyor. Gemi giderek artan, geniş açılı yalpalar yapmaya başladı; yalpa periyodu dalga karşılaşma periyoduna yaklaşıyor.",
    learningGoals: [
      "Rezonans (senkron/parametrik) yalpayı tanımak",
      "Karşılaşma periyodunu rota/hız ile değiştirmek",
      "Quartering sea'de broaching riskini yönetmek",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Geminin doğal yalpa periyodu ile dalga karşılaşma periyodu örtüşmeye başladı; yalpa genliği büyüyor.",
        question: "Karşı karşıya olduğunuz temel risk nedir?",
        choices: [
          {
            text: "Rezonans (senkron/parametrik) yalpa ve stabilite kaybı",
            outcome: "safe",
            feedback:
              "Doğru. Doğal yalpa periyodu ile karşılaşma periyodu örtüştüğünde rezonans gelişir; genlik tehlikeli biçimde büyür.",
            source: { code: "Gemi Hareketleri", detail: "Periyot örtüşmesi → rezonans yalpa" },
            next: "step2",
          },
          {
            text: "Önemli bir risk yok, normal deniz hareketi",
            outcome: "danger",
            feedback:
              "Yanlış. Büyüyen genlik ve periyot örtüşmesi rezonansın habercisidir; kargo kayması/stabilite kaybına gidebilir.",
            source: { code: "Gemi Hareketleri", detail: "Genlik artışı uyarı işaretidir" },
            next: "step2",
          },
          {
            text: "Sadece slamming (baş vurması) riski var",
            outcome: "risky",
            feedback:
              "Eksik. Slamming kısa periyotlu baş denizlerinde öne çıkar; buradaki asıl tehlike uzun periyot + quartering sea kaynaklı rezonans/broaching'tir.",
            source: { code: "Gemi Hareketleri", detail: "Senaryo rezonans odaklı" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "Rezonans yalpa gelişiyor. Karşılaşma periyodunu değiştirmeniz gerekiyor.",
        question: "Ne yaparsınız?",
        choices: [
          {
            text: "Rota ve/veya hızı değiştirerek karşılaşma periyodunu rezonanstan uzaklaştırırım",
            outcome: "safe",
            feedback:
              "Doğru. Karşılaşma periyodu dalga yönü, rota ve hızın birlikte fonksiyonudur; rota/hız değişimi rezonanstan çıkmanın temel yoludur.",
            source: { code: "IMO MSC.1/Circ.1228", detail: "Rota/hız ile karşılaşma periyodunu değiştir" },
            next: "step3",
          },
          {
            text: "Rota ve hızı aynen korur, geçmesini beklerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Rezonans koşulu sürerken beklemek genliği büyütür ve stabilite kaybına yaklaştırır.",
            source: { code: "IMO MSC.1/Circ.1228", detail: "Rezonansta bekleme riskli" },
            next: "step3",
          },
          {
            text: "Hızı artırıp dalga yönünde (quartering) sürdürürüm",
            outcome: "danger",
            feedback:
              "Tehlikeli. Quartering sea'de hız artışı broaching ve surf-riding riskini yükseltir; tam tersi gerekir.",
            source: { code: "IMO MSC.1/Circ.1228", detail: "Quartering sea'de yüksek hız riskli" },
            next: "step3",
          },
        ],
      },
      {
        id: "step3",
        situation: "Karşılaşma periyodunu değiştirdiniz. Stabilite payını da güvende tutmalısınız.",
        question: "Ek olarak hangi önlemi alırsınız?",
        choices: [
          {
            text: "Serbest sıvı yüzeylerini azaltır, gerekirse hızı düşürür ve mürettebatı emniyete alırım",
            outcome: "safe",
            feedback:
              "Doğru. Serbest yüzey etkisini azaltmak (tankları press-up/boş tutmak), hız kontrolü ve güverte emniyeti ağır havada stabilite payını korur.",
            source: { code: "Ağır Hava Hazırlığı", detail: "Serbest yüzey + hız + emniyet" },
          },
          {
            text: "Balast tanklarını yarı dolu bırakırım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Yarı dolu tanklar serbest sıvı yüzeyi etkisini artırır ve GM'i düşürerek yalpayı kötüleştirir.",
            source: { code: "Stabilite", detail: "Serbest yüzey etkisi GM'i düşürür" },
          },
          {
            text: "Ağırlıkları güverteye, yukarı alırım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Ağırlığı yukarı almak ağırlık merkezini (G) yükseltir, GM azalır ve stabilite kötüleşir.",
            source: { code: "Stabilite", detail: "G yükselirse GM düşer" },
          },
        ],
      },
    ],
    debrief:
      "Uzun periyotlu quartering sea'de doğal yalpa periyodu karşılaşma periyoduna yaklaşınca REZONANS (senkron/parametrik) yalpa gelişir. Çözüm: ROTA ve/veya HIZ değiştirerek karşılaşma periyodunu rezonanstan uzaklaştırmak (IMO MSC.1/Circ.1228). Quartering sea'de hız artışı broaching riskini büyütür. Ayrıca serbest sıvı yüzeylerini azaltıp ağırlık merkezini düşük tutmak stabilite payını korur.",
  },
];
