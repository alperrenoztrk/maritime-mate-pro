/**
 * Lesson Topic Enhancements
 *
 * Personel modülündeki "Detaylı Anlatım" kalitesini konu anlatımlarına
 * taşıyan ek içerik tabakası. `LessonTopicDetailPage` mevcut TopicSection
 * şemasını bozmadan, bu dosyadaki zengin içerikleri (kavramsal derinlik,
 * adım-adım çözüm, sayısal worked example, yaygın hatalar, kritik uyarılar)
 * sayfanın altına ek bölümler olarak render eder.
 *
 * Anahtar formatı: `${categoryId}|${topicTitle}` — categoryId değerleri
 * `LessonTopicDetailPage` ile aynıdır (navigation, meteorology, communication).
 *
 * Tüm içerik elle ve formül-doğruluk öncelikli yazılmıştır; mevcut hesaplama
 * araçlarındaki bağıntılarla birebir uyumludur (mem://technical/
 * calculation-formula-synchronization, mem://technical/compass-mnemonic-cdmvt).
 */

export type EnhancementStep = {
  title: string;
  description: string;
};

export type EnhancementGiven = {
  label: string;
  value: string;
};

export type EnhancementSolutionLine = {
  step: string;
  expression?: string;
  result?: string;
};

export type EnhancementExample = {
  scenario: string;
  given: EnhancementGiven[];
  solution: EnhancementSolutionLine[];
  answer: string;
  note?: string;
};

export type LessonTopicEnhancement = {
  /** Personel intro muadili — kavramın "neden / nasıl / pratik" anlatımı. */
  deepDive?: string;
  /** Çekirdek formül veya bağıntı (vurgu kartı). */
  coreFormula?: { text: string; description?: string };
  /** Hesaplamanın sıralı adımları (accordion). */
  steps?: EnhancementStep[];
  /** Tamamen çözülmüş sayısal örnekler. */
  workedExamples?: EnhancementExample[];
  /** En sık yapılan hatalar. */
  commonMistakes?: string[];
  /** Deniz pratiğinden kritik uyarılar. */
  criticalNotes?: string[];
};

export const lessonTopicEnhancements: Record<string, LessonTopicEnhancement> = {
  // ──────────────────────────────────────────────────────────────────────
  // SEYİR — Düzlem Seyir (Plane Sailing)
  // ──────────────────────────────────────────────────────────────────────
  "navigation|Düzlem seyir": {
    deepDive:
      "Düzlem seyir (plane sailing), kısa mesafelerde Dünya yüzeyinin düz kabul edilebileceği varsayımına dayanan en temel seyir hesaplama yöntemidir. Bu yaklaşımda meridyenler birbirine paralel, boylam dakikaları sabit uzunlukta kabul edilir ve seyir; dik kenarları DLat (enlem farkı, kuzey–güney bileşeni) ve Dep (departure, doğu–batı bileşeni), hipotenüsü ise toplam mesafe (Dist) olan bir dik üçgen olarak çözülür. Düzlem seyir, yalnızca ~600 dm'e (yaklaşık 600 nm'lik bacaklarda dahi enlem farkı 4–5°'yi aşmadıkça) ve orta enlemlerde kullanılır; uzun doğu–batı bacaklarında veya yüksek enlemlerde Mercator/orta enlem seyrine geçilmelidir.",
    coreFormula: {
      text: "DLat = Dist · cos C    |    Dep = Dist · sin C    |    DLong = Dep / cos(Lm)",
      description:
        "C = hakiki rota (kuzeyden saat yönü, 000°–360°). Lm = ortalama enlem. Sonuç DLat ve DLong dakika (′) cinsindendir; 1° = 60′.",
    },
    steps: [
      {
        title: "1. Hakiki rotayı dik üçgen mantığına göre yorumla",
        description:
          "Rotayı 000°–360° arasında ifade et. cos C enlem (kuzey/güney) bileşenini, sin C boylam (doğu/batı) bileşenini verir. Rota 0–90° arası kuzey-doğu, 90–180° güney-doğu, 180–270° güney-batı, 270–360° kuzey-batı kadrandadır; işaretleri buna göre yorumla.",
      },
      {
        title: "2. DLat'ı dakika cinsinden hesapla",
        description:
          "DLat (′) = Dist (nm) × cos C. Dist'i deniz mili ver, sonuç doğrudan enlem dakikası çıkar (çünkü 1′ enlem = 1 nm).",
      },
      {
        title: "3. Departure'ı hesapla",
        description:
          "Dep (nm) = Dist × sin C. Departure, geminin doğu–batı doğrultusunda kat ettiği fiziksel mesafedir; boylam dakikası değildir.",
      },
      {
        title: "4. Ortalama enlem (Lm) bul ve DLong'a çevir",
        description:
          "Lm = (Lat₁ + Lat₂) / 2. DLong (′) = Dep / cos(Lm). Bu adım, boylam dakikasının enlemle birlikte küçülmesini telafi eder.",
      },
      {
        title: "5. Varış mevkiini topla",
        description:
          "Lat₂ = Lat₁ ± DLat (kuzey rotada +, güney rotada −). Long₂ = Long₁ ± DLong (doğu rotada +, batı rotada −). 60′ → 1° dönüşümünü unutma.",
      },
    ],
    workedExamples: [
      {
        scenario:
          "Bir gemi 36°20′ N – 028°10′ E mevkiinden hakiki rota 070° ile 120 deniz mili seyrediyor. Varış mevkiini bul.",
        given: [
          { label: "Başlangıç enlem (Lat₁)", value: "36°20′ N" },
          { label: "Başlangıç boylam (Long₁)", value: "028°10′ E" },
          { label: "Hakiki rota (C)", value: "070°" },
          { label: "Mesafe (Dist)", value: "120 nm" },
        ],
        solution: [
          {
            step: "DLat = Dist · cos C",
            expression: "120 × cos 70° = 120 × 0.3420",
            result: "41.04′ N ≈ 0°41.0′ N",
          },
          {
            step: "Dep = Dist · sin C",
            expression: "120 × sin 70° = 120 × 0.9397",
            result: "112.76 nm (E)",
          },
          {
            step: "Lat₂ = Lat₁ + DLat",
            expression: "36°20.0′ + 0°41.0′",
            result: "37°01.0′ N",
          },
          {
            step: "Ortalama enlem Lm",
            expression: "(36°20′ + 37°01′) / 2",
            result: "36°40.5′",
          },
          {
            step: "DLong = Dep / cos Lm",
            expression: "112.76 / cos 36°40.5′ = 112.76 / 0.8021",
            result: "140.6′ E ≈ 2°20.6′ E",
          },
          {
            step: "Long₂ = Long₁ + DLong",
            expression: "028°10.0′ + 2°20.6′",
            result: "030°30.6′ E",
          },
        ],
        answer: "Varış mevkii: 37°01.0′ N – 030°30.6′ E",
        note:
          "Enlem farkı sadece 0°41′ olduğundan düzlem seyir kabulü emniyetli; Mercator ile fark 0.1 nm'in altındadır.",
      },
      {
        scenario:
          "Gemi 25 knot hızla 195° hakiki rotada 4 saat ilerlemiş, başlangıç mevkii 41°00′ N – 010°00′ W. Mevcut mevki?",
        given: [
          { label: "Hız", value: "25 kn" },
          { label: "Süre", value: "4 saat" },
          { label: "Mesafe", value: "25 × 4 = 100 nm" },
          { label: "Hakiki rota", value: "195°" },
          { label: "Lat₁ / Long₁", value: "41°00′ N – 010°00′ W" },
        ],
        solution: [
          {
            step: "DLat = 100 · cos 195°",
            expression: "100 × (−0.9659)",
            result: "−96.59′ → 96.6′ S",
          },
          {
            step: "Dep = 100 · sin 195°",
            expression: "100 × (−0.2588)",
            result: "−25.88 nm → 25.9 nm W",
          },
          {
            step: "Lat₂ = 41°00′ − 1°36.6′",
            result: "39°23.4′ N",
          },
          {
            step: "Lm = (41°00 + 39°23.4)/2",
            result: "40°11.7′",
          },
          {
            step: "DLong = 25.9 / cos 40°11.7′",
            expression: "25.9 / 0.7637",
            result: "33.9′ W",
          },
          {
            step: "Long₂ = 010°00′ + 33.9′ W",
            result: "010°33.9′ W",
          },
        ],
        answer: "Mevcut mevki: 39°23.4′ N – 010°33.9′ W",
      },
    ],
    commonMistakes: [
      "DLong yerine Dep'i doğrudan boylam farkı olarak kullanmak — Dep deniz mili, DLong dakikadır; aralarındaki dönüşüm cos(Lm) içerir.",
      "cos/sin atamasını ters yapmak: kuzey–güney bileşeni cos, doğu–batı bileşeni sin'dir.",
      "Yüksek enlemlerde (≥ 60°) düzlem seyir kullanmak; cos(Lm) küçüldükçe hata hızla büyür.",
      "Rota işaretini (E/W, N/S) kadrana göre belirlemeyi unutmak.",
    ],
    criticalNotes: [
      "60 nm'den uzun veya 4°'den fazla enlem farkı içeren bacaklarda Mercator seyrine geçin.",
      "Düzlem seyir sonucu yalnızca ölü hesap (DR) için kabul edilebilir; mevki tayini gerektiğinde GPS/celestial fix ile doğrulayın.",
      "Rota planında her bacak için Lm'i tek tek hesaplayın; tüm rotada tek bir Lm kullanmak hata büyütür.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // SEYİR — Mercator / Merkator Seyri
  // ──────────────────────────────────────────────────────────────────────
  "navigation|Mercator seyri": {
    deepDive:
      "Mercator seyri, Mercator projeksiyonunun matematiksel yapısını kullanan sabit rota (loksodrom) seyir yöntemidir. Düzlem seyirin enlem büyüdükçe ürettiği hatayı, boylam dakikalarını 'meridional parts' (MP — büyütülmüş enlem) cinsinden ifade ederek tamamen ortadan kaldırır. Mercator projeksiyonunda meridyenler paralel, enlem aralıkları kutuplara doğru orantılı şekilde gerilir; bu sayede sabit rota harita üzerinde düz bir çizgi olur ve rota açısı pergelle direkt ölçülebilir. Uzun doğu–batı bacaklarında, yüksek enlemlerde ve okyanus geçişlerinde standart yöntemdir.",
    coreFormula: {
      text: "tan C = DLong / DMP    |    Dist = DLat / cos C",
      description:
        "DMP = MP₂ − MP₁ (meridional parts farkı, almanak/Norie tablosundan). DLong dakikadır. C hakiki rotadır.",
    },
    steps: [
      {
        title: "1. DLat ve DLong'u dakika cinsinden hesapla",
        description:
          "DLat = Lat₂ − Lat₁, DLong = Long₂ − Long₁ (her ikisi de dakikaya çevrilir; aynı yarımkürede iseler fark, farklı yarımkürelerde ise toplam).",
      },
      {
        title: "2. Meridional parts (MP) değerlerini bul",
        description:
          "MP, Norie's Nautical Tables veya Bowditch'ten her enleme karşılık okunur. MP = 7915.7045 · log₁₀ tan(45° + Lat/2) − 23.0133 · sin(Lat) formülünden de hesaplanabilir (WGS-84 küre yaklaşımı).",
      },
      {
        title: "3. DMP ve rotayı hesapla",
        description:
          "DMP = MP₂ − MP₁ (aynı yarımkürede fark, farklı yarımkürede toplam). tan C = DLong / DMP. C kadranını DLat ve DLong işaretlerinden belirle (N/S × E/W).",
      },
      {
        title: "4. Mesafeyi DLat üzerinden çöz",
        description:
          "Dist = DLat (nm) / cos C. DLat'ı dakika olarak verdiğin için Dist doğrudan deniz mili çıkar. Alternatif: Dist = DLong / sin C (sıfıra yakın paydadan kaçınmak için DLat'lı form tercih edilir).",
      },
    ],
    workedExamples: [
      {
        scenario:
          "Las Palmas (28°08′ N – 015°25′ W) ile Bridgetown (13°06′ N – 059°37′ W) arasındaki rhumb line rota ve mesafesini bul.",
        given: [
          { label: "Başlangıç", value: "28°08′ N – 015°25′ W" },
          { label: "Varış", value: "13°06′ N – 059°37′ W" },
          { label: "DLat", value: "15°02′ S = 902′ S" },
          { label: "DLong", value: "44°12′ W = 2652′ W" },
        ],
        solution: [
          {
            step: "MP(28°08′ N) ≈ 1747.3",
            result: "Norie tablosu",
          },
          {
            step: "MP(13°06′ N) ≈ 789.1",
            result: "Norie tablosu",
          },
          {
            step: "DMP = MP₁ − MP₂ (G yönde)",
            expression: "1747.3 − 789.1",
            result: "958.2 (S)",
          },
          {
            step: "tan C = DLong / DMP",
            expression: "2652 / 958.2 = 2.7677",
            result: "C = S 70°08′ W",
          },
          {
            step: "Hakiki rota (000°–360°)",
            expression: "180° + 70°08′",
            result: "250°08′ T",
          },
          {
            step: "Dist = DLat / cos C",
            expression: "902 / cos 70°08′ = 902 / 0.3403",
            result: "2650.6 nm",
          },
        ],
        answer: "Rhumb line rota: 250° T  |  Mesafe: ≈ 2651 nm",
        note:
          "Aynı bacak büyük daire ile yaklaşık 2624 nm'dir; ~27 nm fark Mercator/loksodrom tercihinin yakıt maliyetini belirler.",
      },
      {
        scenario:
          "DR mevkii 50°15′ N – 008°20′ W'den 40°30′ N – 040°15′ W'ye seyir planı yapılıyor.",
        given: [
          { label: "DLat", value: "9°45′ S = 585′ S" },
          { label: "DLong", value: "31°55′ W = 1915′ W" },
          { label: "MP(50°15′ N)", value: "3489.9" },
          { label: "MP(40°30′ N)", value: "2641.0" },
        ],
        solution: [
          {
            step: "DMP",
            expression: "3489.9 − 2641.0",
            result: "848.9 (S)",
          },
          {
            step: "tan C = 1915 / 848.9",
            result: "2.2559 → C = S 66°06′ W",
          },
          {
            step: "Hakiki rota",
            result: "180° + 66°06′ = 246° T",
          },
          {
            step: "Dist = 585 / cos 66°06′",
            expression: "585 / 0.4051",
            result: "1444 nm",
          },
        ],
        answer: "Rota: 246° T  |  Mesafe: 1444 nm (rhumb line)",
      },
    ],
    commonMistakes: [
      "DLat ve DLong'u derece olarak bırakıp dakikaya çevirmemek; tüm Mercator hesabı dakika tabanlıdır.",
      "Aynı yarımküredeki enlemler için MP'leri toplamak (çıkartılmalı), farklı yarımküreler için çıkarmak (toplanmalı).",
      "C'yi kadran formundan (N/S xx° E/W) hakiki rotaya çevirmeyi unutmak.",
      "Boylam farkını 180°'yi aştıktan sonra 360°'den çıkarmayı atlamak (en kısa yönü seçmek için).",
    ],
    criticalNotes: [
      "Mercator yalnızca loksodrom (sabit rota) mesafesini verir; büyük daireden farkı uzun bacaklarda 100+ nm'i bulabilir.",
      "Çok yüksek enlemlerde (≥ 80°) Mercator dahi kullanışsız hâle gelir; polar veya gnomonic projeksiyona geçilir.",
      "MP değerleri WGS-84 elipsoidi için küçük düzeltme içerir; hassas hesaplarda küre yerine elipsoit MP'leri kullanın.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // SEYİR — Büyük Daire ve Loksodrom
  // ──────────────────────────────────────────────────────────────────────
  "navigation|Büyük daire kavramı": {
    deepDive:
      "Büyük daire (great circle), Dünya merkezinden geçen bir düzlemin küre yüzeyiyle oluşturduğu çemberdir ve iki nokta arasındaki en kısa mesafeyi verir. Loksodrom (rhumb line) ise tüm meridyenleri aynı açıyla kesen sabit rota eğrisidir; Mercator haritada düz çizgi, küre üzerinde ise kutba sarmal yaklaşan logaritmik spiraldir. Büyük daire mesafesi her zaman loksodrom mesafesinden kısa veya ona eşittir (sadece ekvator boyunca ve aynı meridyen üzerinde eşittir). Pratikte composite great circle veya büyük dairenin loksodromik segmentlerine bölünmesi (waypoint'lerle) tercih edilir; çünkü saf büyük daire her noktada rota değişimi gerektirir.",
    coreFormula: {
      text: "cos D = sin Lat₁ · sin Lat₂ + cos Lat₁ · cos Lat₂ · cos DLong",
      description:
        "D (derece) küresel mesafe; nm'e çevirmek için D° × 60. Başlangıç rotası: cos C = (sin Lat₂ − sin Lat₁ · cos D) / (cos Lat₁ · sin D).",
    },
    steps: [
      {
        title: "1. DLong'u doğru yönde belirle",
        description:
          "Aynı yarımkürede DLong = Long₂ − Long₁. Farklı yarımkürede toplam alınır. 180°'yi aşarsa 360° − DLong kullanılır (en kısa yön).",
      },
      {
        title: "2. Küresel mesafeyi hesapla",
        description:
          "cos D = sin Lat₁ sin Lat₂ + cos Lat₁ cos Lat₂ cos DLong. D'yi derece olarak bul, sonra dakikaya çevir (1° = 60 nm). Hassasiyet için haversine formülü kullanılabilir.",
      },
      {
        title: "3. Başlangıç rotasını çöz",
        description:
          "cos C = (sin Lat₂ − sin Lat₁ cos D) / (cos Lat₁ sin D). C'nin işareti DLong yönünden (E pozitif, W negatif) okunur.",
      },
      {
        title: "4. Vertex (en yüksek enlem) ve waypoint planla",
        description:
          "cos Lv = cos Lat₁ · sin C (Napier kuralı). Vertex'in boylamını bulup büyük daireyi 5°–10°'lik DLong dilimlerine böl; her bölmede rhumb line ile seyret. Bu, composite GC yöntemidir.",
      },
    ],
    workedExamples: [
      {
        scenario:
          "Cape Town (33°55′ S – 018°25′ E) ile Perth (32°03′ S – 115°44′ E) arası büyük daire mesafesi ve başlangıç rotası.",
        given: [
          { label: "Lat₁", value: "33°55′ S = −33.917°" },
          { label: "Lat₂", value: "32°03′ S = −32.050°" },
          { label: "DLong", value: "97°19′ E = +97.317°" },
        ],
        solution: [
          {
            step: "cos D = sin Lat₁ · sin Lat₂ + cos Lat₁ · cos Lat₂ · cos DLong",
            expression:
              "(−0.5582)(−0.5300) + (0.8297)(0.8480)(−0.1280)",
            result: "0.2959 − 0.0901 = 0.2058",
          },
          {
            step: "D = acos(0.2058)",
            result: "78.12° = 4687.1 nm",
          },
          {
            step: "cos C = (sin Lat₂ − sin Lat₁ · cos D) / (cos Lat₁ · sin D)",
            expression:
              "(−0.5300 − (−0.5582)(0.2058)) / (0.8297 × 0.9786)",
            result: "(−0.4151) / 0.8120 = −0.5113",
          },
          {
            step: "C = acos(−0.5113) = 120.75°",
            result: "DLong > 0 olduğu için doğuya: 120.75° → S 59°15′ E",
          },
          {
            step: "Hakiki rota",
            result: "180° − 59°15′ = 120°45′ T → ≈ 121° T",
          },
        ],
        answer: "Büyük daire: 4687 nm, başlangıç rotası 121° T",
        note:
          "Aynı bacak loksodrom ile ≈ 4946 nm; büyük daire ~259 nm (≈ 11 saat @ 24 kn) tasarruf sağlar.",
      },
    ],
    commonMistakes: [
      "Lat ve Long işaretlerini ihmal etmek (S, W negatif).",
      "acos sonucunu radyan olarak bırakıp 60 ile çarpmak; sonuç DERECE olmalı, sonra ×60 nm.",
      "Başlangıç rotasını tek noktada hesaplayıp tüm seyirde sabit varsaymak — büyük dairede her noktada rota değişir.",
      "DLong > 180° iken 360° − DLong'a çevirmeyi unutmak (yanlış yönde dolaşım).",
    ],
    criticalNotes: [
      "Saf büyük daire, yüksek enlemlere girebilir (vertex enlemi); buz, fırtına bölgesi veya kara teması açısından composite GC ile sınırlandırın.",
      "Modern ECDIS otomatik büyük daire çizer; ancak rota onayında vertex enlemini ve waypoint güvenliğini elle teyit edin.",
      "Atlantik gibi orta enlem geçişlerinde tasarruf < %1; Pasifik veya Hint Okyanusu gibi uzun geçişlerde %5–8'e ulaşır.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // SEYİR — Pusula Düzeltmeleri (CDMVT)
  // ──────────────────────────────────────────────────────────────────────
  "navigation|Pusula düzeltme": {
    deepDive:
      "Pusula düzeltme, pusuladan okunan rota ile gerçekte takip edilen hakiki rota arasındaki dönüşümdür. Manyetik pusulada iki hata bileşeni vardır: variation (V) — Dünya manyetik alanı ile coğrafi kuzey arasındaki açı (harita üzerinde compass rose'da gösterilir, yıllık değişimi vardır); ve deviation (D) — gemiye özgü manyetik alanın (çelik gövde, makineler) pusula iğnesini saptırması (deviation kartından, baş yönüne göre okunur). Bu iki düzeltme CDMVT mnemonic kuralıyla işlenir: Compass → Deviation → Magnetic → Variation → True. Doğu (E) hataları toplanır, batı (W) hataları çıkarılır (Compass → True yönünde).",
    coreFormula: {
      text: "True = Compass + (Dev E) + (Var E)    |    Compass = True − (Var E) − (Dev E)",
      description:
        "CDMVT — Compass → Deviation → Magnetic → Variation → True. East (E) hataları + ile, West (W) hataları − ile uygulanır.",
    },
    steps: [
      {
        title: "1. Compass (pusula) rotasını oku",
        description:
          "Manyetik pusuladan baş yönü olarak okunan değer. 000°–360° aralığında ifade et.",
      },
      {
        title: "2. Deviation'ı kartından bul",
        description:
          "Geminin deviation tablosundan, pusula baş yönüne karşılık gelen deviation'ı oku. E (doğu) → +, W (batı) → −. Magnetic = Compass + Dev.",
      },
      {
        title: "3. Variation'ı haritadan al",
        description:
          "Seyredilen bölgenin compass rose veya isogon hattından variation'ı oku. Yıllık değişimi (annual change) ile bugüne güncelle. True = Magnetic + Var (E pozitif).",
      },
      {
        title: "4. Ters yönde çalış (rota planı)",
        description:
          "Hakiki rotadan pusula rotasına geçerken işaretler ters döner: Compass = True − Var − Dev. Plan yapılırken her zaman Magnetic'i de ara değer olarak yaz.",
      },
    ],
    workedExamples: [
      {
        scenario:
          "Compass rotası 085°, Variation 4° W, Deviation +2° E. Hakiki rota nedir?",
        given: [
          { label: "Compass", value: "085°" },
          { label: "Deviation", value: "2° E (+)" },
          { label: "Variation", value: "4° W (−)" },
        ],
        solution: [
          {
            step: "Magnetic = Compass + Dev",
            expression: "085° + 2°",
            result: "087° M",
          },
          {
            step: "True = Magnetic + Var",
            expression: "087° + (−4°)",
            result: "083° T",
          },
        ],
        answer: "Hakiki rota: 083° T",
      },
      {
        scenario:
          "Plan: hakiki rota 270° T, bölgede Variation 6° E, baş yönü için Deviation 3° W. Pusulada ne okumalı?",
        given: [
          { label: "True", value: "270°" },
          { label: "Variation", value: "6° E (+)" },
          { label: "Deviation", value: "3° W (−)" },
        ],
        solution: [
          {
            step: "Magnetic = True − Var",
            expression: "270° − 6°",
            result: "264° M",
          },
          {
            step: "Compass = Magnetic − Dev",
            expression: "264° − (−3°)",
            result: "267° C",
          },
        ],
        answer: "Pusulada 267° tutmalı.",
        note:
          "Kontrol için CDMVT ileri yön: 267 + (−3) + 6 = 270 ✓",
      },
      {
        scenario:
          "Compass 358°, Deviation 5° E, Variation 7° W. Hakiki rota?",
        given: [
          { label: "Compass", value: "358°" },
          { label: "Dev", value: "+5°" },
          { label: "Var", value: "−7°" },
        ],
        solution: [
          {
            step: "Mag = 358 + 5",
            result: "003° M",
          },
          {
            step: "True = 003 − 7",
            result: "356° T",
          },
        ],
        answer: "True 356° T (360° eklenmesine gerek yok; sonuç zaten 0–360 içinde).",
      },
    ],
    commonMistakes: [
      "E/W işaretini yön yerine harf olarak bırakıp toplama/çıkarmayı karıştırmak.",
      "Compass → True ile True → Compass yönünde aynı işaretleri kullanmak (yön değişince işaretler döner).",
      "Deviation'ı pusula baş yönü yerine hakiki başa göre okumak (her zaman compass heading'e göre okunur).",
      "Variation'ın yıllık değişimini hesaba katmadan eski haritadaki değeri kullanmak.",
      "Sonuç 360°'yi aştığında −360°, negatif çıktığında +360° uygulamayı unutmak.",
    ],
    criticalNotes: [
      "Mnemonic: 'Can Dead Men Vote Twice At Elections' — Compass + Dev = Magnetic, +Var = True, East is least (W çıkar), East adds when going to True.",
      "Yıllık deviation swing/check zorunluluğu — kart eskidikçe hata büyür.",
      "Gyro pusula kullanılıyorsa gyro error tek bir düzeltme olarak uygulanır (E +, W −); CDMVT manyetik içindir.",
      "Demir yükü, ambardaki vinç pozisyonu veya elektrikli ekipman değişikliği deviation'ı geçici olarak değiştirebilir; uzun seyirde periyodik azimut kontrolü yapın.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // METEOROLOJİ — Gerçek Rüzgâr / Görünen Rüzgâr
  // ──────────────────────────────────────────────────────────────────────
  "meteorology|Gerçek rüzgar ve görünen rüzgar": {
    deepDive:
      "Gemide anemometre tarafından ölçülen rüzgâr, geminin kendi hızının da etkisini içeren görünen rüzgârdır (Apparent Wind, AW). Operasyonel limitler — pilot transferi, helikopter operasyonu, tanker manifold çalışması, palamar manevrası — gerçek rüzgâra (True Wind, TW) göre belirlenir. İki büyüklük arasındaki ilişki vektörel olarak çözülür: TW = AW − Vship (vektörler). Sabit hızda doğrusal seyirde, kosinüs teoremiyle skaler bir formüle indirgenebilir.",
    coreFormula: {
      text: "TW² = AW² + V² − 2·AW·V·cos(α)",
      description:
        "TW = gerçek rüzgâr hızı, AW = görünen rüzgâr hızı, V = gemi hızı, α = görünen rüzgârın geminin başına göre relatif yönü (relative bearing, 0°–180°). α = 0° → tam karşıdan, α = 180° → tam arkadan.",
    },
    steps: [
      {
        title: "1. Veri topla",
        description:
          "Görünen rüzgâr hızı (AW, knot), görünen rüzgâr relatif yönü (α, °), geminin SOG'unu (V, knot) ve başını (heading) topla. AW yönü gemi başına göre değil hakiki kuzeye göre verilmişse, önce α = AW_bearing − heading hesapla.",
      },
      {
        title: "2. Vektör üçgenini kur",
        description:
          "Bir kenarı AW (görünen rüzgârın geliş yönüne ters, çünkü 'wind from' kullanılır), diğer kenarı V (gemi hareket yönü) olan üçgenin üçüncü kenarı TW'dir. Açı = α (relatif yön).",
      },
      {
        title: "3. Kosinüs teoremi ile TW hızını çöz",
        description:
          "TW = √(AW² + V² − 2·AW·V·cos α). cos α'nın işareti α < 90° iken +, > 90° iken − çıkar; bu hesaplamayı otomatik tutar.",
      },
      {
        title: "4. Gerçek rüzgârın yönünü bul",
        description:
          "sin β / AW = sin α / TW (sinüs teoremi) → β = asin(AW · sin α / TW). Hakiki yön = heading + (180° − β) (rüzgâr 'from' tanımı için). ECDIS/anemometre ekranındaki TW yönüyle kontrol et.",
      },
    ],
    workedExamples: [
      {
        scenario:
          "Gemi 14 knot SOG ile 090° T başıyla seyrediyor. Anemometre 25 knot AW, relatif yön 040° (sancak omuzdan) gösteriyor. Gerçek rüzgâr hızı?",
        given: [
          { label: "AW", value: "25 kn" },
          { label: "V", value: "14 kn" },
          { label: "α (relatif yön)", value: "040°" },
        ],
        solution: [
          {
            step: "TW² = AW² + V² − 2·AW·V·cos α",
            expression: "25² + 14² − 2·25·14·cos 40°",
            result: "625 + 196 − 700 × 0.7660 = 821 − 536.2",
          },
          {
            step: "TW² = 284.8",
            result: "TW = √284.8 ≈ 16.9 kn",
          },
          {
            step: "β = asin(AW·sin α / TW)",
            expression: "asin(25 × 0.6428 / 16.9) = asin(0.9509)",
            result: "β ≈ 71.9°",
          },
          {
            step: "Gerçek rüzgâr yönü (from)",
            expression: "heading 090° + (180° − 71.9°) = 090° + 108.1°",
            result: "TW yön ≈ 198° T (yaklaşık güneyden)",
          },
        ],
        answer: "Gerçek rüzgâr ≈ 17 kn, yön ≈ 198° T",
        note:
          "Beaufort 5 (taze rüzgâr) bandında; pilot transferi limitini doğrulayın.",
      },
      {
        scenario:
          "Gemi tam pruvadan (α = 0°) 30 kn görünen rüzgâra karşı 12 kn ile gidiyor. Gerçek rüzgâr?",
        given: [
          { label: "AW", value: "30 kn" },
          { label: "V", value: "12 kn" },
          { label: "α", value: "0° (tam pruvadan)" },
        ],
        solution: [
          {
            step: "cos 0° = 1, formül lineer hâle gelir",
            expression: "TW = AW − V",
            result: "TW = 30 − 12 = 18 kn",
          },
        ],
        answer: "Gerçek rüzgâr 18 kn, gemi başına karşıdan.",
      },
      {
        scenario:
          "Gemi tam kıçtan (α = 180°) rüzgâr alıyor; AW = 8 kn, V = 18 kn.",
        given: [
          { label: "AW", value: "8 kn" },
          { label: "V", value: "18 kn" },
          { label: "α", value: "180°" },
        ],
        solution: [
          {
            step: "cos 180° = −1",
            expression: "TW = AW + V (vektörler aynı doğrultuda)",
            result: "TW = 8 + 18 = 26 kn",
          },
        ],
        answer: "Gerçek rüzgâr 26 kn — anemometre değerinin 3 katından fazla!",
        note:
          "Kıçtan rüzgârda görünen rüzgârın aldatıcılığının tipik örneği: güverte operasyon kararını TW üzerinden verin.",
      },
    ],
    commonMistakes: [
      "Anemometredeki AW değerini doğrudan operasyon limiti olarak kullanmak — özellikle kıçtan rüzgârda ciddi underestimation.",
      "α açısını hakiki rota değil pusula başına göre okumayı atlamak.",
      "cos α'nın işaretini elle ayarlamaya çalışmak; kosinüs teoremi işareti otomatik halleder.",
      "Heading değişirken AW yönünün de değişeceğini unutmak (sadece hız değil, yön de relatif).",
    ],
    criticalNotes: [
      "MOB veya kurtarma manevrasında, hızı düşürmeden alınan AW gerçeği maskeler; durdurmadan önce TW'yi mutlaka hesapla.",
      "Helikopter operasyonu için relatif rüzgâr yönü ve hızı kritiktir; TW'ye göre uçuş güvertesi rüzgâr zarfı planlanır.",
      "Anemometre kalibrasyonu için: gemi durdururken ölçülen AW = TW olmalıdır; sapma varsa servise verin.",
    ],
  },
};

/**
 * Alias eşlemesi: konu başlığı veri dosyalarında farklı yazılmış olabilir
 * (örn. "Düzlem seyirin sınırları" → "Düzlem seyir" enhancement'ına bağlanır).
 * Aynı enhancement bloğunun birden fazla benzer konuda görünmesini sağlar.
 */
const topicAliases: Record<string, string> = {
  "navigation|Düzlem seyirin sınırları": "navigation|Düzlem seyir",
  "navigation|Düzlem seyir varsayımı": "navigation|Düzlem seyir",
  "navigation|Mercator projeksiyonu": "navigation|Mercator seyri",
  "navigation|Mercator – rhumb line ilişkisi": "navigation|Mercator seyri",
  "navigation|Büyük Daire ve Rhumb Line Seyri": "navigation|Büyük daire kavramı",
  "navigation|Büyük daire geometrisi": "navigation|Büyük daire kavramı",
  "navigation|Büyük daire başlangıç kursu": "navigation|Büyük daire kavramı",
  "navigation|Büyük daire mesafesi": "navigation|Büyük daire kavramı",
  "navigation|Manyetik pusula deviasyonu ve tashihi": "navigation|Pusula düzeltme",
};

export const getLessonTopicEnhancement = (
  categoryId: string | undefined,
  topicTitle: string | undefined,
): LessonTopicEnhancement | undefined => {
  if (!categoryId || !topicTitle) return undefined;
  const key = `${categoryId}|${topicTitle}`;
  const resolved = topicAliases[key] ?? key;
  return lessonTopicEnhancements[resolved];
};
