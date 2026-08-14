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
            result: "Since DLong > 0, to the east: 120.75° → S 59°15′ E",
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
          "Görünen rüzgâr hızı (AW, knot), görünen rüzgâr relatif yönü (α, °), geminin SOG'unu (V, knot) ve başını (heading) topla. AW yönü gemi başına göre değil hakiki kuzeye göre verilmişse, önce α = AWbearing − heading hesapla.",
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
            result: "TW direction ≈ 198° T (approximately from south)",
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
            expression: "TW = AW + V (vectors in the same direction)",
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

  // ════════════════════════════════════════════════════════════════════
  // FAZ B — Gelgit / Akıntı / ETA / Termodinamik çevrimler
  // ════════════════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────────────────
  // SEYİR — ETA Hesabı
  // ──────────────────────────────────────────────────────────────────────
  "navigation|ETA": {
    deepDive:
      "ETA (Estimated Time of Arrival), kalan mesafe ile ortalama yer hızının (SOG) oranı kadar süre sonra geminin varış noktasında olacağı tahmini saattir. Doğru ETA, bağlama saati randevusu, pilot/tug ayarlaması, vardiya planı ve yakıt sarfiyatı yönetimi için kritik bir operasyonel girdidir. Akıntı, hava, sığ su (squat), trafik ve hız ayarı dolayısıyla SOG sürekli değişir; bu yüzden ETA dinamik olarak güncellenmeli ve önemli sapmalarda agent/charterer'a 'ETA Update' mesajı geçilmelidir.",
    coreFormula: {
      text: "Süre (sa) = Mesafe (nm) / Hız (kn)    |    ETA = ETD + Toplam Süre",
      description:
        "Bağımsız bacaklar için her bacağı kendi SOG'u ile çöz, sonra topla. UTC ↔ yerel saat dönüşümünü ihmal etme.",
    },
    steps: [
      {
        title: "1. Kalan mesafeyi waypoint bazında çıkar",
        description:
          "Rotayı bacaklara böl (great circle veya rhumb line); her bacak için mesafeyi nm cinsinden topla.",
      },
      {
        title: "2. Her bacak için planlanan SOG'u belirle",
        description:
          "Açık deniz, kıyı yaklaşımı, kanal/pilotage farklı hızlar gerektirir. Akıntı tahminini SOG'a dahil et (CTS hesabıyla).",
      },
      {
        title: "3. Bacak sürelerini hesapla ve topla",
        description:
          "t = d / V. Saat → saat-dakika dönüşümünü yap (0.5 sa = 30 dk).",
      },
      {
        title: "4. ETD + toplam süreyi UTC olarak topla",
        description:
          "Dilim değişimleri (zaman dilimi geçişleri ve DST) varsa ekle/çıkar. Sonuç hem UTC hem yerel saat olarak yaz.",
      },
      {
        title: "5. Geç sapma kontrolü (ETA update)",
        description:
          "Mevcut SOG ile yeniden hesapla; ±15 dk veya şirket SMS'inde belirtilen eşik aşılırsa Master/agent/charterer'a ETA Update gönder.",
      },
    ],
    workedExamples: [
      {
        scenario:
          "Gemi 13:30 UTC'de bir mevkidedir; bağlamaya 186 nm kalmıştır. Planlanan ortalama SOG 12.5 kn. ETA?",
        given: [
          { label: "Saat (UTC)", value: "13:30" },
          { label: "Kalan mesafe", value: "186 nm" },
          { label: "Planlanan SOG", value: "12.5 kn" },
        ],
        solution: [
          {
            step: "Süre = Mesafe / SOG",
            expression: "186 / 12.5",
            result: "14.88 sa = 14 sa 53 dk",
          },
          {
            step: "ETA = 13:30 + 14:53",
            result: "28:23 → next day 04:23 UTC",
          },
        ],
        answer: "ETA ≈ 04:23 UTC (ertesi gün). Yerel saat +3 ise 07:23 LT.",
      },
      {
        scenario:
          "İki bacaklı rota: 80 nm @ 14 kn (açık deniz) + 22 nm @ 8 kn (pilotage). ETD 06:00 UTC.",
        given: [
          { label: "Bacak 1", value: "80 nm @ 14 kn" },
          { label: "Bacak 2", value: "22 nm @ 8 kn" },
          { label: "ETD", value: "06:00 UTC" },
        ],
        solution: [
          { step: "t₁ = 80/14", result: "5.714 sa = 5 sa 43 dk" },
          { step: "t₂ = 22/8", result: "2.750 sa = 2 sa 45 dk" },
          { step: "Toplam", result: "8 sa 28 dk" },
          { step: "ETA", expression: "06:00 + 08:28", result: "14:28 UTC" },
        ],
        answer: "ETA 14:28 UTC. Pilot boarding zamanı bacak 2'nin başlangıcı (11:43 UTC) olarak planla.",
      },
    ],
    commonMistakes: [
      "STW (su üzerinde hız) ile SOG'u (yer üzerinde hız) karıştırmak — ETA daima SOG ile hesaplanır.",
      "Zaman dilimi geçişlerini unutmak (E'den W'ya geçişte saat geri alınır).",
      "Pilotage/kanal bacakları için ortalama SOG yerine seyir SOG'unu kullanmak.",
      "Akıntı/sığ su etkisini SOG'a katmamak.",
    ],
    criticalNotes: [
      "ETA değişimi ±15 dk'yi aşarsa şirket/charterer'a 'ETA Update' geç; demurrage/laytime hesabı bu mesaja bağlıdır.",
      "Tahmini varış saati, NOR (Notice of Readiness) tendering için yasal önem taşır.",
      "Yakıt planlamasında ETA × ortalama sarfiyat = toplam yakıt; %5 emniyet payı bırak.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // SEYİR — Akıntılı Seyir (CTS / Set & Drift)
  // ──────────────────────────────────────────────────────────────────────
  "navigation|Akıntılı seyir hesapları": {
    deepDive:
      "Akıntı, geminin pruvasına bakmaksızın yerden hareketini etkileyen su kütlesi hareketidir. 'Set' akıntının geldiği değil GİTTİĞİ yöndür (000°–360° T); 'Drift' akıntının hızıdır (knot). Akıntı varlığında pruva (heading) ile yer üzerinde gerçek rota (COG/track) farklıdır. CTS (Course To Steer) hesabı, istenen track açısını korumak için pruvanın hangi yöne yönlendirileceğini vektörel olarak bulur. Yöntem: track vektörünü (track açısı, planlanan zamanda alınacak mesafe), akıntı vektörünü (set, drift × zaman) ve gemi su üzerinde hız vektörünü (CTS, STW × zaman) bir vektör üçgeninde çözmektir.",
    coreFormula: {
      text: "Track = Heading + Akıntı (vektörel)    |    STW vektörü ile CTS bulunur",
      description:
        "Çizim: 1) track yönü/uzunluğu çiz, 2) başlangıçtan set yönünde drift×t çiz, 3) bu uçtan track ucuna STW×t uzunluğunda çiz → bu vektörün yönü CTS'dir.",
    },
    steps: [
      {
        title: "1. Akıntı bilgisini topla",
        description:
          "Set (yön, °T) ve Drift (kn) — Atlas of Pilot Charts, Admiralty Tidal Stream Atlas veya gerçek zamanlı oşinografik veriden alınır.",
      },
      {
        title: "2. Track ve süreyi belirle",
        description:
          "Track = istenen yer üzerinde rota (°T). Süre t (sa) = bacak süresi. Bacak mesafesi = track yönünde gidilecek nm.",
      },
      {
        title: "3. Vektör üçgenini çiz (kâğıt / pergel)",
        description:
          "Başlangıç noktasından track açısı yönünde 't' saatte istenen mesafeyi (track vektörü) işaretle. Aynı başlangıçtan set yönünde drift×t kadar çiz; bu noktadan track ucuna birleştirilen vektör, gemi su üzerindeki hareketini gösterir. Bu vektörün açısı CTS, uzunluğu / t = STW'dir.",
      },
      {
        title: "4. Analitik çözüm (sinüs teoremi)",
        description:
          "sin(CTS−Track) / Drift = sin(Set−Track) / STW. CTS − Track = δ (akıntı düzeltmesi). δ = asin((Drift × sin(Set−Track)) / STW). CTS = Track + δ.",
      },
      {
        title: "5. SOG'u bul",
        description:
          "Vektör üçgeninde track vektörünün uzunluğu / t = SOG. Veya: SOG² = STW² + Drift² + 2·STW·Drift·cos(Set−CTS).",
      },
    ],
    workedExamples: [
      {
        scenario:
          "İstenen track 090° T, STW 10 kn. Set 180° T, Drift 2 kn. CTS ve SOG nedir?",
        given: [
          { label: "Track", value: "090° T" },
          { label: "STW", value: "10 kn" },
          { label: "Set", value: "180° T" },
          { label: "Drift", value: "2 kn" },
        ],
        solution: [
          {
            step: "Akıntı–track açı farkı",
            expression: "Set − Track = 180 − 90 = 90°",
            result: "Current is coming from dead starboard abeam",
          },
          {
            step: "δ = asin(Drift × sin(90°) / STW)",
            expression: "asin(2 × 1 / 10) = asin(0.2)",
            result: "δ ≈ 11.5°",
          },
          {
            step: "Akıntı sancağa sürüklüyor → pruva iskeleye düzeltilir",
            expression: "CTS = Track − δ = 090° − 11.5°",
            result: "CTS ≈ 078.5° T",
          },
          {
            step: "SOG (kosinüs teoremi)",
            expression: "√(10² + 2² − 2·10·2·cos(180−11.5))",
            result: "√(100 + 4 + 39.2) ≈ √143.2 ≈ 11.97 ≈ 9.8 kn",
          },
        ],
        answer: "CTS ≈ 079° T  |  SOG ≈ 9.8 kn",
        note: "Akıntı tam yan traverstan olduğu için SOG'u biraz düşürür (geminin enerjisinin bir kısmı drift'i yenmek için harcanır).",
      },
      {
        scenario:
          "Track 045°, STW 12 kn, Set 225° (akıntı gemiye karşı), Drift 1.5 kn.",
        given: [
          { label: "Track", value: "045°" },
          { label: "STW", value: "12 kn" },
          { label: "Set − Track", value: "225 − 45 = 180° (tam karşı)" },
        ],
        solution: [
          {
            step: "δ = asin(1.5·sin 180° / 12)",
            expression: "asin(0)",
            result: "δ = 0° (current directly in the opposite direction)",
          },
          {
            step: "CTS = Track",
            result: "045°",
          },
          {
            step: "SOG = STW − Drift",
            result: "12 − 1.5 = 10.5 kn",
          },
        ],
        answer: "CTS 045°, SOG 10.5 kn. Pruva değişmez, sadece zemin hızı düşer.",
      },
    ],
    commonMistakes: [
      "'Set' yönünü akıntının geldiği yön sanmak — daima gittiği yöndür.",
      "δ düzeltmesini ters işaretle uygulamak: akıntı sancağa sürüklerse pruvayı İSKELEYE çevirirsin (CTS = Track − δ).",
      "STW yerine SOG ile CTS hesaplamak — gemi suya göre hareket eder, akıntı suyu hareket ettirir.",
      "Bacak süresini hesaba katmadan tek vektör üçgeniyle çözmek; ETA için süre kritiktir.",
    ],
    criticalNotes: [
      "Tidal stream'in yönü ve hızı her saat değişebilir; uzun bacaklarda saatlik olarak akıntı vektörünü güncelle.",
      "Sığ sularda akıntı tahmini büyük hata içerebilir; ECDIS overlay'i yerel pilot bilgisiyle teyit et.",
      "Akıntıya karşı seyirde yakıt sarfiyatı artar — yakıt planında bu farkı hesaba kat.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // SEYİR — Gelgit Yüksekliği (Height of Tide)
  // ──────────────────────────────────────────────────────────────────────
  "navigation|Height of tide hesapları": {
    deepDive:
      "Gelgit yüksekliği, herhangi bir anda chart datum (LAT — Lowest Astronomical Tide) seviyesinin üzerindeki su seviyesidir. UKC (Under-Keel Clearance) ve liman yaklaşımı kararları doğrudan bu değere bağlıdır. Hesaplamada iki kaynak kullanılır: (1) Standard Port için Admiralty Tide Tables (ATT) Bölüm I, (2) Secondary Port için Bölüm II düzeltmeleri. İki yöntem yaygındır — 'Rule of Twelfths' (kabaca, yarı diurnal regimler için) ve ATT Tablo III (gerçek interpolasyon).",
    coreFormula: {
      text: "Onikiler Kuralı: 1/12, 2/12, 3/12, 3/12, 2/12, 1/12 (saatlik artış)",
      description:
        "HW–LW farkı (range) 6 eşit saate dağıtılır. Toplam range = HW − LW. Hedef saatteki yükseklik = LW + (Σ payı) × range veya HW − (Σ kalan) × range.",
    },
    steps: [
      {
        title: "1. HW ve LW saat & yüksekliklerini bul",
        description:
          "ATT Bölüm I'den standard port için. Secondary port ise time/height düzeltmelerini (Bölüm II) uygula.",
      },
      {
        title: "2. Range ve duration hesapla",
        description:
          "Range = HW height − LW height. Duration = HW saat − LW saat (yükselen gelgit) veya tersi. ~6 saatlik olduğunu varsay (onikiler kuralı için).",
      },
      {
        title: "3. Hedef saatin LW'ye veya HW'ye göre konumu",
        description:
          "Hedef saat − LW saat = geçen süre (sa, dk). Bu süreyi 6 eşit dilime böl (her dilim ~ duration/6).",
      },
      {
        title: "4. Onikiler kuralıyla payı topla",
        description:
          "1. saat 1/12, 2. saat 2/12, 3. saat 3/12, 4. saat 3/12, 5. saat 2/12, 6. saat 1/12. Hedefe kadar olan dilimlerin paylarını topla (kısmi dilim için orantı).",
      },
      {
        title: "5. Hedef yüksekliği hesapla",
        description:
          "Yükseklik = LW height + (Σ pay / 12) × range. UKC için: Mevcut derinlik = Charted depth + Yükseklik.",
      },
    ],
    workedExamples: [
      {
        scenario:
          "Liverpool için HW 06:30 LT, yükseklik 9.2 m. LW 12:30, yükseklik 1.0 m. 09:30 LT'de gelgit yüksekliği nedir?",
        given: [
          { label: "HW", value: "06:30 / 9.2 m" },
          { label: "LW", value: "12:30 / 1.0 m" },
          { label: "Range", value: "9.2 − 1.0 = 8.2 m (düşen gelgit)" },
          { label: "Duration", value: "6 sa" },
          { label: "Hedef saat", value: "09:30 (HW'den 3 saat sonra)" },
        ],
        solution: [
          {
            step: "HW'den itibaren düşüş payları: 1/12 + 2/12 + 3/12 = 6/12",
            result: "Toplam pay = 6/12 = 0.5",
          },
          {
            step: "Düşüş miktarı",
            expression: "0.5 × 8.2",
            result: "4.1 m",
          },
          {
            step: "Yükseklik = HW − düşüş",
            expression: "9.2 − 4.1",
            result: "5.1 m",
          },
        ],
        answer: "09:30 LT'de gelgit yüksekliği = 5.1 m (chart datum üzerinde).",
        note: "Charted depth 4.0 m bir noktada o anki gerçek derinlik 4.0 + 5.1 = 9.1 m'dir.",
      },
      {
        scenario:
          "LW 02:00 / 0.5 m, HW 08:00 / 5.5 m. Saat 05:00'te yükseklik?",
        given: [
          { label: "Range", value: "5.0 m (yükselen)" },
          { label: "LW + 3 sa", value: "05:00" },
        ],
        solution: [
          {
            step: "LW'den itibaren yükseliş payları: 1/12 + 2/12 + 3/12",
            result: "6/12 = 0.5",
          },
          {
            step: "Yükseliş miktarı",
            expression: "0.5 × 5.0",
            result: "2.5 m",
          },
          {
            step: "Yükseklik = LW + yükseliş",
            result: "0.5 + 2.5 = 3.0 m",
          },
        ],
        answer: "05:00'te yükseklik 3.0 m.",
      },
    ],
    commonMistakes: [
      "Onikiler kuralını duration ≈ 6 sa olmayan rejimlerde kullanmak — diurnal/mixed gelgit bölgelerinde ATT Tablo III gerekir.",
      "Secondary port düzeltmelerini (time/height shift) atlamak.",
      "Saatleri yerel saat ↔ UTC ↔ standart port saat dilimine çevirmeden kullanmak.",
      "Chart datum dışındaki referansları (MSL, MLLW) karıştırmak.",
    ],
    criticalNotes: [
      "UKC kararı için onikiler kuralının ±20 cm hata payı vardır; sığ liman yaklaşımlarında ATT tam interpolasyonu kullan.",
      "Meteorolojik etki (storm surge, atmosferik basınç, rüzgâr) gelgiti ±0.5 m'ye kadar değiştirebilir; tabloyu sahil istasyonu gerçek ölçümüyle teyit et.",
      "Squat ve heel etkilerini ayrı hesapla; gerçek UKC = Charted depth + Tide − Draught − Squat − Heel margin.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // SEYİR — UKC & Gelgit Birleşik Hesabı
  // ──────────────────────────────────────────────────────────────────────
  "navigation|UKC + gelgit hesapları": {
    deepDive:
      "Under-Keel Clearance (UKC), geminin omurgası ile deniz tabanı arasındaki anlık serbest derinliktir. UKC karar süreci dört bileşenin toplamıdır: (1) charted depth, (2) gelgit yüksekliği, (3) eksiltici faktörler (draught, squat, heel, dalga-trough, atmosferik basınç, swell), (4) güvenlik marjı (şirket SMS politikası; tipik %10 draught veya minimum 0.5–1.0 m). IMO MSC.232(82) ve birçok bayrak idaresi minimum UKC politikasını şart koşar. Squat — sığ ve dar sularda hızla artan dinamik çökme — kritik tehlikedir; Barrass formülü pratikte en yaygın kullanılan tahmindir.",
    coreFormula: {
      text: "UKC = Charted depth + Tide − Draught − Squat − Heel − Safety Margin",
      description:
        "Squat (Barrass): δ ≈ Cb · V² / 100 (açık sığ su), δ ≈ Cb · V² × Cs / 100 (kanal/kısıtlı). V = knot, sonuç metre.",
    },
    steps: [
      {
        title: "1. Karar noktasında charted depth'i tespit et",
        description:
          "ECDIS/harita üzerinde geçilecek en sığ noktayı (critical point) seç. Datum altındaki en küçük değer kullanılır.",
      },
      {
        title: "2. O an için gelgit yüksekliğini hesapla",
        description:
          "Onikiler kuralı veya ATT ile karar saatindeki yüksekliği bul. Met düzeltmesi (storm surge, basınç) ekle/çıkar.",
      },
      {
        title: "3. Geminin mevcut draught'unu al",
        description:
          "En derin nokta (maksimum draught) — trim varsa pruva veya kıç en derini hangisiyse o. Saltwater allowance da göz önünde tut.",
      },
      {
        title: "4. Squat'ı hesapla",
        description:
          "Barrass: δ = Cb · V² / 100 (open shallow), δ = Cb · V² × 2 / 100 (canal). Cb tipik bulk/tanker 0.80, container 0.65, ferry 0.55. V = SOG kn.",
      },
      {
        title: "5. Heel ve dalga marjı ekle, son UKC kontrolü",
        description:
          "Heel etkisi ≈ (B/2) · sin θ (B = beam). Dalga trough etkisi ≈ Hs/2. Tüm eksilticilerden sonra kalan UKC, SMS minimumunu (örn. %10 draught) sağlamalı.",
      },
    ],
    workedExamples: [
      {
        scenario:
          "Charted depth 12.0 m. Tide 3.5 m. Draught 11.5 m, Cb = 0.80, SOG 10 kn (kanal). SMS min UKC = %10 draught. Geçit emniyetli mi?",
        given: [
          { label: "Charted depth", value: "12.0 m" },
          { label: "Tide", value: "3.5 m" },
          { label: "Draught", value: "11.5 m" },
          { label: "Cb", value: "0.80 (bulk)" },
          { label: "V", value: "10 kn (kanalda)" },
          { label: "SMS min UKC", value: "%10 × 11.5 = 1.15 m" },
        ],
        solution: [
          {
            step: "Toplam derinlik = Charted + Tide",
            expression: "12.0 + 3.5",
            result: "15.5 m",
          },
          {
            step: "Squat (Barrass kanal): Cb·V²·2 / 100",
            expression: "0.80 × 100 × 2 / 100",
            result: "1.60 m",
          },
          {
            step: "UKC = 15.5 − 11.5 − 1.60 − 0 (heel ihmal)",
            result: "2.40 m",
          },
          {
            step: "SMS karşılaştırma",
            expression: "2.40 m > 1.15 m",
            result: "SAFE ✓",
          },
        ],
        answer: "Geçit emniyetli (UKC 2.4 m > min 1.15 m). Yine de hızı 8 kn'ye düşürmek squat'ı 1.02 m'ye indirir; ek güvenlik.",
      },
      {
        scenario:
          "Aynı bölge, V = 14 kn'ye çıkarılırsa?",
        given: [
          { label: "V", value: "14 kn" },
        ],
        solution: [
          {
            step: "Squat = 0.80 × 14² × 2 / 100",
            expression: "0.80 × 196 × 2 / 100",
            result: "3.14 m",
          },
          {
            step: "UKC = 15.5 − 11.5 − 3.14",
            result: "0.86 m",
          },
          {
            step: "SMS karşılaştırma",
            expression: "0.86 m < 1.15 m",
            result: "UNSAFE ✗",
          },
        ],
        answer: "Hızı düşür veya gelgit penceresini bekle. Squat hıza karesel bağımlıdır; küçük hız artışı büyük UKC kaybıdır.",
      },
    ],
    commonMistakes: [
      "Squat'ı ihmal etmek — 12+ kn hızda büyük gemilerde 1–3 m'i bulur ve karaya oturma ana sebebidir.",
      "Charted depth'i datum dışında ölçeklendirmek (MSL'i CD ile karıştırmak).",
      "Trim varsa ortalama draught yerine en derin uçtaki draught'u kullanmamak.",
      "Atmosferik basınç ve rüzgârın yarattığı 'negative surge'u hesaba katmamak (tipik −0.3 m).",
    ],
    criticalNotes: [
      "MSC.232(82) ECDIS safety contour'unu draught + minimum UKC'ye göre ayarla; otomatik anti-grounding alarmı çalışsın.",
      "Kanal/dar geçişlerde 'bank effect' ve 'ship-to-ship interaction' UKC'yi etkilemez ama manevra güvenliğini ek olarak sınırlar.",
      "Şüpheli durumlarda gelgit penceresini bekle veya pilotage talebi yap; UKC kararı kaptanın 'overriding authority' alanındadır.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // MAKİNE — Carnot Çevrimi
  // ──────────────────────────────────────────────────────────────────────
  "machine|Carnot Çevrimi ve Teorik Verim": {
    deepDive:
      "Carnot çevrimi, iki sabit sıcaklık (TH ve TC) arasında çalışan tüm ısı makinelerinin teorik üst verim sınırını veren ideal tersinir çevrimdir. Dört süreçten oluşur: (1) izotermik genişleme (TH'de ısı alımı QH), (2) adyabatik genişleme (TH→TC), (3) izotermik sıkıştırma (TC'de ısı atımı QC), (4) adyabatik sıkıştırma (TC→TH). Pratikte hiçbir gerçek makine Carnot verimine ulaşamaz; ancak bu, gerçek motorların termik verimini değerlendirmek için bir referans noktasıdır.",
    coreFormula: {
      text: "ηCarnot = 1 − TC / TH    (Mutlak sıcaklık, Kelvin)",
      description:
        "TH: sıcak kaynağın mutlak sıcaklığı (K). TC: soğuk kaynağın (kondenser/çevre) mutlak sıcaklığı (K). Hiçbir gerçek çevrim bu verimi aşamaz (2. yasa).",
    },
    steps: [
      {
        title: "1. Sıcaklıkları Kelvin'e çevir",
        description: "T(K) = T(°C) + 273.15. Carnot formülü mutlak sıcaklık gerektirir; °C ile hesap büyük hata verir.",
      },
      {
        title: "2. Carnot verimini hesapla",
        description: "ηC = 1 − TC/TH. Sonuç ondalıktır; %'ye çevirmek için ×100.",
      },
      {
        title: "3. Gerçek çevrimle karşılaştır",
        description:
          "Reel motor verimi ηreal / ηC oranı 'Carnot relative efficiency' olarak adlandırılır. Tipik deniz dizel motoru için ηreal ≈ %50, ηC ≈ %65 → relative ≈ %77.",
      },
      {
        title: "4. İş ve ısı miktarlarını ilişkilendir",
        description:
          "Wnet = QH − QC. η = Wnet/QH. Carnot için ayrıca QH/QC = TH/TC bağıntısı tersinir özellikten gelir.",
      },
    ],
    workedExamples: [
      {
        scenario:
          "Bir gemi dizel motorunun silindir gaz sıcaklığı 1450°C, egzoz çıkışı 380°C. Carnot teorik verimi nedir?",
        given: [
          { label: "TH", value: "1450°C = 1723.15 K" },
          { label: "TC", value: "380°C = 653.15 K" },
        ],
        solution: [
          {
            step: "ηC = 1 − TC/TH",
            expression: "1 − 653.15 / 1723.15 = 1 − 0.3791",
            result: "0.6209 → %62.1",
          },
          {
            step: "Gerçek motor verimi tipik %48–52",
            result: "Carnot ratio ≈ 0.50 / 0.621 ≈ %80",
          },
        ],
        answer: "Carnot teorik verim ≈ %62.1. Gerçek motor (%50) bunun yaklaşık %80'i kadar performans gösteriyor.",
      },
      {
        scenario:
          "Buhar türbinli sistemde TH = 540°C (kazan), TC = 35°C (kondenser). Carnot verimi?",
        given: [
          { label: "TH", value: "540°C = 813.15 K" },
          { label: "TC", value: "35°C = 308.15 K" },
        ],
        solution: [
          {
            step: "ηC = 1 − 308.15/813.15",
            expression: "1 − 0.3790",
            result: "0.6210 → %62.1",
          },
          {
            step: "Gerçek Rankine çevrimi (~%38)",
            result: "Carnot ratio ≈ 0.61",
          },
        ],
        answer: "Carnot ≈ %62.1; gerçek Rankine ≈ %38 (yeniden ısıtma ve regenerasyonla yükseltilir).",
      },
    ],
    commonMistakes: [
      "Sıcaklıkları Celsius olarak formüle koymak (özellikle düşük TC'de büyük hata).",
      "TH'yi yakıt yanma sıcaklığı sanmak; gerçek silindir tepe sıcaklığı çok daha düşüktür.",
      "Carnot verimini gerçek hedef olarak görmek; ideal sınırdır, ulaşılamaz.",
    ],
    criticalNotes: [
      "TC'yi düşürmek (örn. soğuk deniz suyuyla daha iyi kondenser) ηC'yi TH'yi yükseltmekten daha çok artırır.",
      "Carnot verimi yalnızca ısı makinelerinin ÜST sınırıdır; mekanik kayıplar, sürtünme, yanmama dahil değildir.",
      "2. yasa: η < 1 her zaman; TC = 0 K olmadıkça tüm ısı işe çevrilemez.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // MAKİNE — Diesel Çevrimi
  // ──────────────────────────────────────────────────────────────────────
  "machine|Diesel Çevrimi": {
    deepDive:
      "Diesel çevrimi, sabit basınçta ısı eklenen ideal hava-standart çevrimdir. Dört süreçten oluşur: (1) izentropik sıkıştırma, (2) sabit basınçta ısı ekleme (yakıt enjeksiyonu), (3) izentropik genişleme (iş zamanı), (4) sabit hacimde ısı atımı (egzoz). Modern büyük deniz dizel motorları bu ideal çevrime yakın çalışır; verim sıkıştırma oranı (r) ve cut-off oranı (rc) ile belirlenir.",
    coreFormula: {
      text: "ηDiesel = 1 − (1/r^(k−1)) · ((rc^k − 1) / (k · (rc − 1)))",
      description:
        "r = sıkıştırma oranı (V₁/V₂), rc = cut-off oranı (V₃/V₂, ısı eklemenin sonundaki/başındaki hacim), k = cp/cv (hava için ≈ 1.4).",
    },
    steps: [
      {
        title: "1. Sıkıştırma oranı (r) ve cut-off (rc) belirle",
        description:
          "r = V₁/V₂ (alt ölü nokta / üst ölü nokta hacim). rc = V₃/V₂ — yakıt enjeksiyonu başlangıcı ile bitişi arasındaki hacim oranı. r tipik 14–22, rc tipik 1.5–3.",
      },
      {
        title: "2. k ve diğer sabitleri kontrol et",
        description:
          "Hava için k ≈ 1.4. Gerçek yanma ürünleri için k ≈ 1.35; ideal hava-standart varsayım için 1.4 kullanılır.",
      },
      {
        title: "3. Verim formülünü uygula",
        description:
          "Aşamalı hesap kolaylığı için: A = r^(k−1), B = rc^k − 1, C = k·(rc − 1). η = 1 − B/(A·C).",
      },
      {
        title: "4. Otto ile karşılaştır",
        description:
          "ηOtto = 1 − 1/r^(k−1). Aynı r için ηDiesel < ηOtto (cut-off cezası); ancak Diesel daha yüksek r kullanabildiği için pratik verim daha yüksek.",
      },
    ],
    workedExamples: [
      {
        scenario:
          "İdeal Diesel çevrimi: r = 18, rc = 2.2, k = 1.4. Termik verim?",
        given: [
          { label: "r", value: "18" },
          { label: "rc", value: "2.2" },
          { label: "k", value: "1.4" },
        ],
        solution: [
          {
            step: "r^(k−1) = 18^0.4",
            result: "≈ 3.177",
          },
          {
            step: "rc^k = 2.2^1.4",
            result: "≈ 2.929",
          },
          {
            step: "Pay: rc^k − 1",
            result: "1.929",
          },
          {
            step: "Payda: k·(rc − 1) = 1.4 × 1.2",
            result: "1.68",
          },
          {
            step: "η = 1 − (1.929)/(3.177 × 1.68)",
            expression: "1 − 1.929 / 5.337 = 1 − 0.3614",
            result: "0.6386 → %63.9",
          },
        ],
        answer: "İdeal Diesel verimi ≈ %63.9. Gerçek deniz dizelinde bu %48–52'ye düşer (mekanik kayıplar, yanma süresi, ısı kaybı).",
      },
      {
        scenario:
          "İki zamanlı düşük devirli deniz dizeli: r = 14, rc = 2.0. Verim?",
        given: [
          { label: "r", value: "14" },
          { label: "rc", value: "2.0" },
        ],
        solution: [
          { step: "r^0.4 = 14^0.4", result: "≈ 2.871" },
          { step: "rc^1.4 = 2^1.4", result: "≈ 2.639" },
          { step: "η = 1 − (2.639−1) / (2.871 × 1.4 × 1)", expression: "1 − 1.639 / 4.019", result: "0.5921 → %59.2" },
        ],
        answer: "İdeal η ≈ %59.2.",
      },
    ],
    commonMistakes: [
      "Sıkıştırma oranı r ile basınç oranını karıştırmak (basınç oranı ≈ r^k).",
      "Cut-off'u küçük rc = 1 sanmak (rc = 1 olursa Otto çevrimine indirgenir).",
      "k = 1.4 yerine yanma sonrası gaz değerini (1.30–1.33) kullanıp formülün ideal sürümünü bozmak.",
    ],
    criticalNotes: [
      "Rc arttıkça (uzun yanma) verim DÜŞER; kısa, ani yanma daha verimli.",
      "Sıkıştırma oranı artarsa verim artar ama termal/mekanik stres katlanır — modern motorlar r = 18–22 dengesini tutar.",
      "Gerçek motorda turbocharging, common-rail enjeksiyon ve atık ısı geri kazanımı η'yı %50+ değerine çıkarır.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // MAKİNE — Otto Çevrimi
  // ──────────────────────────────────────────────────────────────────────
  "machine|Otto Çevrimi (Benzinli Motor)": {
    deepDive:
      "Otto çevrimi, sabit hacimde ısı eklenen ideal hava-standart çevrimdir; kıvılcımla ateşlenen (SI) benzinli motorların modelidir. Süreçler: izentropik sıkıştırma → sabit hacim ısı ekleme (kıvılcım) → izentropik genişleme → sabit hacim ısı atımı. Termik verimi sadece sıkıştırma oranına bağlıdır; ancak benzin için vuruntu (knock) sıkıştırma oranını ~10–12 ile sınırlar.",
    coreFormula: {
      text: "ηOtto = 1 − 1 / r^(k−1)",
      description: "r = sıkıştırma oranı, k = cp/cv ≈ 1.4.",
    },
    steps: [
      { title: "1. r'yi belirle", description: "V₁/V₂ — silindir hacmi alt ölü nokta / üst ölü nokta." },
      { title: "2. r^(k−1) hesapla", description: "Cep hesaplayıcısıyla doğrudan ya da log yardımıyla." },
      { title: "3. Verim çıkar", description: "η = 1 − 1/r^(k−1). Sonucu ×100 ile %'ye çevir." },
      { title: "4. Yakıt türü sınırını kontrol et", description: "Benzin için r > 12 vuruntu riski; LPG/CNG için 13–15 mümkün." },
    ],
    workedExamples: [
      {
        scenario: "r = 9, k = 1.4 olan ideal Otto çevriminin verimi?",
        given: [{ label: "r", value: "9" }, { label: "k", value: "1.4" }],
        solution: [
          { step: "r^0.4 = 9^0.4", result: "≈ 2.408" },
          { step: "η = 1 − 1/2.408", expression: "1 − 0.4152", result: "0.5848 → %58.5" },
        ],
        answer: "İdeal Otto η ≈ %58.5. Gerçek benzinli motorda %25–30 (pompa kaybı, ısı kaybı, eksik yanma).",
      },
      {
        scenario: "Yüksek performans yardımcı jeneratör r = 11.",
        given: [{ label: "r", value: "11" }],
        solution: [
          { step: "11^0.4", result: "≈ 2.626" },
          { step: "η = 1 − 1/2.626", result: "≈ 0.619 → %61.9" },
        ],
        answer: "İdeal %61.9.",
      },
    ],
    commonMistakes: [
      "Diesel formülünü Otto yerine kullanmak (Otto'da cut-off yok).",
      "k değerini sıcak yanma ürünleri için düşürmek (ideal hava-standart için 1.4 sabittir).",
      "Sıkıştırma oranını yakıt antiknock indeksiyle dengelemeden artırmak.",
    ],
    criticalNotes: [
      "Aynı r için ηOtto > ηDiesel; ancak Diesel daha yüksek r kullanabildiği için pratikte daha verimli.",
      "Gerçek SI motorda volumetrik verim, ateşleme zamanlaması ve karışım oranı η'yı ideal değerin yarısına indirir.",
      "Deniz uygulamasında benzinli motorlar yangın riski nedeniyle sınırlıdır; ana güç dizel olarak verilir.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // MAKİNE — Rankine Çevrimi
  // ──────────────────────────────────────────────────────────────────────
  "machine|Rankine Çevrimi (Buhar Türbini)": {
    deepDive:
      "Rankine çevrimi, buhar türbin sistemlerinin (LNG carrier'lar, eski steam ship'ler, atık ısı geri kazanım WHRS) temel termodinamik çevrimidir. Süreçler: (1) izentropik pompalama (sıvı), (2) sabit basınçta ısı ekleme (kazanda buhar üretimi), (3) izentropik genişleme (türbinde iş üretimi), (4) sabit basınçta ısı atımı (kondenserde yoğuşma). Verim, türbin giriş sıcaklığı/basıncı yükseldikçe ve kondenser basıncı düştükçe artar; yeniden ısıtma (reheat) ve regenerasyon (feed-water heating) eklenerek %38–42'ye çıkarılır.",
    coreFormula: {
      text: "ηRankine = (WT − WP) / QH ≈ (h₃ − h₄) / (h₃ − h₂)",
      description:
        "h₃: türbin girişi entalpi, h₄: türbin çıkışı, h₂: kazan girişi (pompa sonrası). WP pompa işi genellikle ihmal edilebilir mertebede küçüktür.",
    },
    steps: [
      { title: "1. Türbin giriş ve çıkış basıncını belirle", description: "Kazan basıncı (örn. 60 bar) ve kondenser basıncı (örn. 0.05 bar)." },
      { title: "2. Entalpi değerlerini buhar tablosundan oku", description: "Türbin girişi: yüksek basınç + kızgın buhar (h₃). Türbin çıkışı: kondenser basıncında, izentropik genişlemeyle bulunan x kalitesine göre h₄." },
      { title: "3. Türbin işi ve pompa işini hesapla", description: "WT = h₃ − h₄. WP = vf · (P₂ − P₁) (vf doymuş sıvı özgül hacmi)." },
      { title: "4. Kazan ısısı ve net iş", description: "QH = h₃ − h₂. Wnet = WT − WP. η = Wnet / QH." },
      { title: "5. Reheat/regen iyileştirmeleri", description: "Reheat: türbin orta basıncında buharı kazana geri gönderip yeniden ısıt. Regen: türbinden alınan ekstraksiyon buharıyla besleme suyunu ısıt; η %3–5 artar." },
    ],
    workedExamples: [
      {
        scenario:
          "Basit Rankine: kazan 60 bar / 500°C, kondenser 0.05 bar. h₃ = 3422 kJ/kg, h₄ ≈ 2107 kJ/kg (izentropik), h₂ ≈ 144 kJ/kg.",
        given: [
          { label: "h₃", value: "3422 kJ/kg" },
          { label: "h₄", value: "2107 kJ/kg" },
          { label: "h₂", value: "144 kJ/kg" },
          { label: "WP", value: "≈ 6 kJ/kg (ihmal)" },
        ],
        solution: [
          { step: "WT = h₃ − h₄", expression: "3422 − 2107", result: "1315 kJ/kg" },
          { step: "QH = h₃ − h₂", expression: "3422 − 144", result: "3278 kJ/kg" },
          { step: "η = WT / QH", expression: "1315 / 3278", result: "0.4012 → %40.1" },
        ],
        answer: "Basit Rankine η ≈ %40.1.",
      },
      {
        scenario: "Düşük kondenser basıncının etkisi: kondenser 0.10 bar olsa h₄ ≈ 2200, h₂ ≈ 192.",
        given: [{ label: "Yeni h₄", value: "2200" }, { label: "Yeni h₂", value: "192" }],
        solution: [
          { step: "WT", result: "3422 − 2200 = 1222 kJ/kg" },
          { step: "QH", result: "3422 − 192 = 3230 kJ/kg" },
          { step: "η", expression: "1222 / 3230", result: "0.3784 → %37.8" },
        ],
        answer: "Kondenser basıncını ikiye katlamak verimi %40.1 → %37.8'e düşürür.",
      },
    ],
    commonMistakes: [
      "Pompa işini büyük sanıp türbinden çıkarmak — pompa işi tipik %1–2'dir.",
      "Türbin çıkışında izentropik varsaymadan h₄'ü doğrudan tablodan almak (gerçekte ηturbine düzeltmesi gerekir).",
      "Kondenser sıcaklığını basınç yerine doğrudan kullanmak; doymuş tablo basınç–sıcaklık çiftiyle çalışır.",
    ],
    criticalNotes: [
      "Düşük kondenser basıncı = düşük TC → η artar (Carnot mantığı); soğutma suyu sıcaklığı kritiktir.",
      "Reheat çevrimi türbin son kademe nemlik (x) sorununu hem çözer hem verimi artırır.",
      "WHRS (egzoz gazı kazanı + buhar türbini) deniz dizel sisteminin tepesine bindirilerek genel verim %3–8 yükseltilir.",
    ],
  },

  // ──────────────────────────────────────────────────────────────────────
  // MAKİNE — Brayton Çevrimi
  // ──────────────────────────────────────────────────────────────────────
  "machine|Brayton Çevrimi (Gaz Türbini)": {
    deepDive:
      "Brayton (Joule) çevrimi, gaz türbinli motorların ideal hava-standart çevrimidir. Süreçler: (1) izentropik sıkıştırma (kompresörde), (2) sabit basınçta ısı ekleme (yanma odasında), (3) izentropik genişleme (türbinde), (4) sabit basınçta ısı atımı (egzoz). Hızlı feribot, fast ferry, LNG carrier ve askeri gemilerde tercih edilir. Verim basınç oranına (rp) ve k'ya bağlıdır.",
    coreFormula: {
      text: "ηBrayton = 1 − 1 / rp^((k−1)/k)",
      description: "rp = P₂/P₁ (basınç oranı, kompresör çıkış/giriş), k = 1.4 (hava-standart).",
    },
    steps: [
      { title: "1. Basınç oranı rp belirle", description: "Kompresör girişi (atmosferik) ile yanma odası basıncı oranı. Marine gas turbine rp = 15–25." },
      { title: "2. (k−1)/k üssü hesapla", description: "Hava için (1.4−1)/1.4 ≈ 0.2857." },
      { title: "3. η = 1 − 1/rp^0.2857 uygula", description: "Verim sadece rp'ye bağlı (ideal). Pratikte rp arttıkça türbin giriş sıcaklığı (TIT) sınırı baskılar." },
      { title: "4. Regeneratör ve intercooler iyileştirmeleri", description: "Egzoz ısısıyla yanma havasını ön ısıtmak η'yı %5–8 artırır. Multi-stage kompresyon + intercooler iş tüketimini azaltır." },
    ],
    workedExamples: [
      {
        scenario: "Gas turbine rp = 16, k = 1.4. Verim?",
        given: [{ label: "rp", value: "16" }, { label: "k", value: "1.4" }],
        solution: [
          { step: "16^0.2857", result: "≈ 2.297" },
          { step: "η = 1 − 1/2.297", result: "0.5647 → %56.5" },
        ],
        answer: "İdeal η ≈ %56.5. Gerçek deniz gaz türbini %35–40 (yanma kaybı, kompresör/türbin verimi).",
      },
      {
        scenario: "rp = 25 (modern aero-derivative).",
        given: [{ label: "rp", value: "25" }],
        solution: [
          { step: "25^0.2857", result: "≈ 2.622" },
          { step: "η = 1 − 1/2.622", result: "0.6186 → %61.9" },
        ],
        answer: "İdeal %61.9; aero-derivative türbinler gerçek %42–45'e ulaşır.",
      },
    ],
    commonMistakes: [
      "Basınç oranı yerine basınç farkı kullanmak.",
      "Üs (k−1)/k yerine doğrudan (k−1) yazmak; Brayton ve Otto formüllerini karıştırmak.",
      "Türbin giriş sıcaklığı (TIT) sınırını ihmal edip aşırı yüksek rp seçmek.",
    ],
    criticalNotes: [
      "Aynı rp için Brayton ile Otto formülleri benzer; fark sıkıştırma süreci (Brayton sürekli akış, Otto piston).",
      "Combined cycle: Brayton egzozu + Rankine WHRS sistemi birleşik verim %55+ verir.",
      "Yüksek rp + yüksek TIT, malzeme/soğutma teknolojisiyle dengelenir; aşırı rp turbin kanatları için risklidir.",
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

  // Faz B alias'ları
  "navigation|Akıntı vektörleri": "navigation|Akıntılı seyir hesapları",
  "navigation|Course to Steer (CTS) with Current": "navigation|Akıntılı seyir hesapları",
  "navigation|Akıntının ETA ve yakıta etkisi": "navigation|Akıntılı seyir hesapları",
  "navigation|Set ve drift değerlendirmesi": "navigation|Akıntılı seyir hesapları",
  "navigation|Gelgitin fiziksel mantığı": "navigation|Height of tide hesapları",
  "navigation|Spring tide – Neap tide": "navigation|Height of tide hesapları",
  "navigation|Rota hız ve mesafe ilişkisi": "navigation|ETA",
  "navigation|Zaman – mesafe – hız bağıntısı": "navigation|ETA",
  "machine|Dizel Çevrimi": "machine|Diesel Çevrimi",
  "machine|Dizel çevrimi ve sıkıştırma ile ateşleme": "machine|Diesel Çevrimi",
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
