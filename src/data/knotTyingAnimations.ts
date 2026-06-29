// Definitions for the maritime-knot reference shown on the "Gemici Bağları"
// page (src/pages/SailorKnots.tsx). This is the single source of truth for the
// knots taught in the app — names (Turkish + English), category, difficulty,
// usage, strength loss and the step-by-step instructions, plus a reference to
// the visual media for each knot.
//
// Media lives under /public/knots/<id>/ — see /public/knots/README.md for the
// folder/naming convention and how to drop in real rope photos or GIFs.
//
// Auditing note: only knots whose real photos genuinely match the described
// technique use `kind: "frames"`. Knots without a verified matching photo use
// `kind: "none"`, which renders a clean branded placeholder next to the
// (correct) textual steps — we never show a misleading image.

export interface KnotStep {
  title: string;
  description: string;
}

/**
 * Visual media for a knot.
 *
 * - `frames`: an ordered list of still photos that genuinely show this knot
 *   being tied; the card shows them as a numbered gallery.
 * - `gif`: a single animated GIF/WebP that loops on its own.
 * - `none`: no verified imagery — render the branded placeholder.
 *
 * `attribution` is shown in a small footer when the asset requires credit
 * (e.g. CC BY-SA images).
 */
export type KnotMedia =
  | { kind: "frames"; frames: string[]; attribution?: string }
  | { kind: "gif"; src: string; poster?: string; attribution?: string }
  | { kind: "none" };

export type KnotCategory = "durdurucu" | "ilmek" | "bag" | "ekleme";

export interface KnotTyingDef {
  id: string;
  name: string;
  nameEn: string;
  category: KnotCategory;
  difficulty: "Kolay" | "Orta" | "Zor";
  use: string;
  strengthLoss?: string;
  media: KnotMedia;
  steps: KnotStep[];
}

export const KNOT_CATEGORY_ORDER: KnotCategory[] = ["durdurucu", "ilmek", "bag", "ekleme"];

export const KNOT_CATEGORY_LABELS: Record<KnotCategory, { title: string; subtitle: string }> = {
  durdurucu: {
    title: "Durdurucu ve Bağlama Düğümleri",
    subtitle: "Halat ucunu durdurur veya iki ucu birbirine bağlar",
  },
  ilmek: {
    title: "İlmekler (Loops)",
    subtitle: "Halatın ucunda veya ortasında kaymayan sabit bir ilmek oluşturur",
  },
  bag: {
    title: "Bağlar (Hitches)",
    subtitle: "Halatı bir nesneye (baba, ring, çubuk, koç boynuzu) bağlar",
  },
  ekleme: {
    title: "Eklemeler (Bends)",
    subtitle: "İki ayrı halatı uç uca birleştirir",
  },
};

// Helper: build frame paths for a knot's verified photo sequence.
// frame-1.jpg, frame-2.jpg, ... under /public/knots/<id>/ (see README).
const frames = (id: string, count: number): string[] =>
  Array.from({ length: count }, (_, i) => `/knots/${id}/frame-${i + 1}.jpg`);

export const KNOT_TYING_ANIMATIONS: KnotTyingDef[] = [
  // ── Durdurucu ve bağlama düğümleri ───────────────────────────────────────
  {
    id: "figure-eight",
    name: "Sekizli Düğüm",
    nameEn: "Figure-of-Eight",
    category: "durdurucu",
    difficulty: "Kolay",
    use: "Halatın ucuna atılan durdurucu (stopper) düğümdür; halatın bloktan, makaradan veya kilometreden kaçmasını önler. Düğümler arasında en az dayanım kaybına yol açar ve yük altında bile kolay çözülür.",
    strengthLoss: "~%25 dayanım kaybı",
    media: {
      kind: "frames",
      frames: frames("figure-eight", 1),
      attribution: "„Der Barbar\" — CC BY-SA 4.0, Wikimedia Commons",
    },
    steps: [
      { title: "1 · İlmek oluştur", description: "Çalışan uçla beden halatının (standing part) üzerinde bir ilmek oluşturun." },
      { title: "2 · Ucu arkadan dolayın", description: "Çalışan ucu bedenin arkasından dolayarak '8' şeklini başlatın." },
      { title: "3 · İlmekten geçirip çekin", description: "Ucu ilk ilmeğin içinden geçirip her iki taraftan çekerek sekizi sıkın." },
    ],
  },
  {
    id: "reef-knot",
    name: "Yassı Düğüm (Camadan)",
    nameEn: "Reef / Square Knot",
    category: "durdurucu",
    difficulty: "Kolay",
    use: "Aynı çaptaki iki halat ucunu birbirine bağlar (binding/bağlama düğümü). Yelken ve branda toplamada yaygındır. Farklı çaplarda kayabileceği için yük taşıyan eklerde güvenilir değildir.",
    strengthLoss: "~%55 dayanım kaybı",
    media: {
      kind: "frames",
      frames: frames("reef-knot", 1),
      attribution: "USCG PTC Developer — CC BY-SA 4.0, Wikimedia Commons",
    },
    steps: [
      { title: "1 · Sol ucu sağ ucun üzerinden", description: "Sol ucu sağ ucun üzerinden alıp altından geçirin (sol-sağ)." },
      { title: "2 · Sağ ucu sol ucun üzerinden", description: "Şimdi sağ ucu sol ucun üzerinden alıp altından geçirin (sağ-sol)." },
      { title: "3 · İki çifti çekip sıkın", description: "Her iki ucu birden çekin; yatık, simetrik bir düğüm oluşur. Uçlar bedenle aynı tarafta çıkmalıdır." },
    ],
  },

  // ── İlmekler (loops) ─────────────────────────────────────────────────────
  {
    id: "bowline",
    name: "İzbarço Bağı",
    nameEn: "Bowline",
    category: "ilmek",
    difficulty: "Orta",
    use: "Halatın ucunda yük altında sıkışmayan, kolayca çözülebilen sabit bir ilmek oluşturur. Can kurtarma, palamar geçirme ve genel amaçlı kullanımda en önemli denizcilik düğümüdür.",
    strengthLoss: "~%40 dayanım kaybı",
    media: {
      kind: "frames",
      frames: frames("bowline", 5),
      attribution: "Patricio Lorente — CC BY-SA 2.5, Wikimedia Commons",
    },
    steps: [
      { title: "1 · Beden üzerinde küçük ilmek", description: "Bedeni (standing part) serili tutun ve üzerinde küçük bir ilmek (tavşan deliği) oluşturun; çalışan uç üstte kalsın." },
      { title: "2 · Delikten yukarı çıkın", description: "Çalışan ucu (tavşan) deliğin içinden aşağıdan yukarıya doğru geçirin." },
      { title: "3 · Bedenin arkasından dolayın", description: "Ucu beden halatının (ağaç) arkasından dolayın." },
      { title: "4 · Delikten geri sokun", description: "Ucu tekrar aynı delikten aşağı doğru geçirin." },
      { title: "5 · Çekip sıkın", description: "Bedeni ve oluşan ilmeği ters yönde çekerek düğümü sıkın; ilmek istenen boyutta sabitlenir." },
    ],
  },
  {
    id: "bowline-on-bight",
    name: "Çifte İzbarço",
    nameEn: "Bowline on a Bight",
    category: "ilmek",
    difficulty: "Zor",
    use: "Halatın ucuna erişmeden, ortasında iki adet kaymayan ilmek oluşturur. Yükü iki bacağa paylaştırmada ve acil oturak (bosun's chair) olarak kullanılır.",
    media: { kind: "none" },
    steps: [
      { title: "1 · Katlı uçla ilmek", description: "Halatı ikiye katlayın (bight) ve katlı kısımla bedende küçük bir ilmek oluşturun." },
      { title: "2 · Katlı ucu delikten geçirin", description: "Katlı ucu (bight) bu ilmeğin içinden geçirin." },
      { title: "3 · İki bacağın etrafından açın", description: "Katlı ucu açıp düğümün her iki ana bacağının etrafından aşırın." },
      { title: "4 · Çekip sabitleyin", description: "Bedeni çekerek yan yana iki kaymayan ilmeği sabitleyin." },
    ],
  },

  // ── Bağlar (hitches) ──────────────────────────────────────────────────────
  {
    id: "clove-hitch",
    name: "Kazık Bağı (Volta)",
    nameEn: "Clove Hitch",
    category: "bag",
    difficulty: "Kolay",
    use: "Halatı bir babaya, baraya, çubuğa veya küpeşteye geçici olarak bağlamak için kullanılır. Tek başına güvenilir değildir; uçlar serbest kalırsa çözülebilir, bu yüzden ek emniyet voltalarıyla desteklenir.",
    media: {
      kind: "frames",
      frames: frames("clove-hitch", 1),
      attribution: "USCG (PTC Developer) — CC0, Wikimedia Commons",
    },
    steps: [
      { title: "1 · İlk volta", description: "Halatı direğin/çubuğun etrafından bir kez dolayın." },
      { title: "2 · Çaprazlayıp ikinci volta", description: "İlk dönüşün üzerinden çaprazlayarak ikinci voltayı atın." },
      { title: "3 · Ucu altından geçirip sıkın", description: "Çalışan ucu son dönüşün altından geçirip her iki yönden çekerek kilitleyin." },
    ],
  },
  {
    id: "two-half-hitches",
    name: "İki Yarım Anele",
    nameEn: "Two Half Hitches",
    category: "bag",
    difficulty: "Kolay",
    use: "Halatı bir ringe, baraya veya babaya bağlamanın hızlı yoludur. Çalışan uç, beden halatının etrafına aynı yönde atılan iki yarım anele ile kilitlenir.",
    media: {
      kind: "frames",
      frames: frames("two-half-hitches", 1),
      attribution: "USCG PTC Developer — CC BY-SA 4.0, Wikimedia Commons",
    },
    steps: [
      { title: "1 · Nesnenin etrafından geçirin", description: "Halatı ringin/baranın etrafından geçirin." },
      { title: "2 · Birinci yarım anele", description: "Çalışan ucu beden halatının etrafından dolayıp oluşan ilmeğin içinden geçirin." },
      { title: "3 · İkinci yarım anele", description: "Aynı yönde ikinci yarım aneleyi atın (iki anele aynı yönlü olmalı)." },
      { title: "4 · Bedene yaslayıp sıkın", description: "İki aneleyi birbirine ve bedene yaslayarak çekip sıkın." },
    ],
  },
  {
    id: "round-turn-two-half-hitches",
    name: "Camadan Voltası",
    nameEn: "Round Turn & Two Half Hitches",
    category: "bag",
    difficulty: "Orta",
    use: "Bir halatı baraya, ringe veya babaya emniyetle bağlar. Tam tur (round turn) yükü taşır ve sürtünmeyle tutar; iki yarım anele (half hitch) düğümü kilitler. Yük altında bağlama/çözme yapılabilir.",
    media: {
      kind: "frames",
      frames: frames("round-turn-two-half-hitches", 3),
      attribution: "„Der Barbar\" — CC BY 4.0, Wikimedia Commons",
    },
    steps: [
      { title: "1 · Tam tur (round turn)", description: "Halatı baranın/ringin etrafından iki kez dolayın; bu tam tur yükü taşır." },
      { title: "2 · Birinci yarım anele", description: "Çalışan ucu beden halatının etrafından dolayarak ilk yarım aneleyi atın." },
      { title: "3 · İkinci yarım anele", description: "Aynı yönde ikinci yarım aneleyi atıp çekerek kilitleyin." },
    ],
  },
  {
    id: "rolling-hitch",
    name: "Gronof Bağı",
    nameEn: "Rolling Hitch",
    category: "bag",
    difficulty: "Orta",
    use: "Bir halatı, başka bir gergin halata veya çubuğa, ekseni boyunca kaymayacak şekilde bağlar. Gergin bir halattaki yükü geçici olarak almak (stopper) için kullanılır.",
    steps: [
      { title: "1 · Yük yönüne iki dönüş", description: "Çalışan ucu yük yönüne doğru ana halatın etrafından iki kez dolayın; her dönüş bir öncekinin üzerine biner." },
      { title: "2 · Üçüncü dönüşü ters yana", description: "Üçüncü dönüşü yük yönünün ters tarafına, ilk iki dönüşün dışına çaprazlayarak atın." },
      { title: "3 · Altından geçirip sıkın", description: "Ucu bu son dönüşün altından geçirip çekerek sıkın; yük çekildiğinde dönüşler kilitlenir." },
    ],
    media: {
      kind: "frames",
      frames: frames("rolling-hitch", 1),
      attribution: "USCG PTC Developer — CC BY-SA 4.0, Wikimedia Commons",
    },
  },
  {
    id: "cleat-hitch",
    name: "Koç Boynuzuna Volta",
    nameEn: "Cleat Hitch",
    category: "bag",
    difficulty: "Kolay",
    use: "Palamar, şamandıra veya yat halatını güverte koç boynuzuna (cleat) emniyetle bağlar. Yük altında sıkıca tutar, gerektiğinde hızlıca çözülür.",
    media: {
      kind: "frames",
      frames: frames("cleat-hitch", 1),
      attribution: "Markus Bärlocher — Public Domain, Wikimedia Commons",
    },
    steps: [
      { title: "1 · Uzak boynuzdan tam tur", description: "Halatı önce koç boynuzunun uzak (karşı) boynuzundan dolayarak tam bir tur atın." },
      { title: "2 · Sekiz şeklinde sarımlar", description: "Halatı boynuzların üzerine '8' şeklinde çapraz sarımlar atın." },
      { title: "3 · Kilit volta ile sabitle", description: "Son sarımda ters bir ilmek (kilit volta) atarak ucu kilitleyin; uç boynuzdan sarkmasın." },
    ],
  },
  {
    id: "anchor-bend",
    name: "Demir Bağı",
    nameEn: "Anchor (Fisherman's) Bend",
    category: "bag",
    difficulty: "Orta",
    use: "Halatı demir bedenine (anchor) veya ringe güvenle bağlar. Islanınca ve yük altında sıkışmaz; sarsıntılı yüke dayanıklıdır.",
    media: {
      kind: "frames",
      frames: frames("anchor-bend", 1),
      attribution: "Chris 73 — CC BY-SA 3.0, Wikimedia Commons",
    },
    steps: [
      { title: "1 · Ringden iki kez geçir", description: "Halatı ring/demir içinden iki kez geçirerek bir tam tur (round turn) oluşturun; turu gevşek bırakın." },
      { title: "2 · İlk aneleyi turun içinden", description: "Çalışan ucu beden halatının etrafından dolayıp az önce oluşan turların içinden geçirin." },
      { title: "3 · İkinci yarım anele + emniyet", description: "Beden üzerine bir yarım anele daha atarak kilitleyin; ucu ince halatla bedene sürce (seizing) yaparak emniyete alın." },
    ],
  },

  // ── Eklemeler (bends) ─────────────────────────────────────────────────────
  {
    id: "sheet-bend",
    name: "Kıstırma Düğümü",
    nameEn: "Sheet Bend",
    category: "ekleme",
    difficulty: "Orta",
    use: "Farklı çaptaki iki halatı birleştirir. Kalın halatla bir gözcük (bight) yapılır, ince halat içinden geçirilip kıstırılır. Yük altında uçlar gergin kalmalıdır.",
    strengthLoss: "~%45 dayanım kaybı",
    media: {
      kind: "frames",
      frames: frames("sheet-bend", 4),
      attribution: "„Der Barbar\" — CC BY-SA 4.0, Wikimedia Commons",
    },
    steps: [
      { title: "1 · Kalın halatla gözcük", description: "Kalın halatla bir gözcük (bight) oluşturun." },
      { title: "2 · İnce halatı içinden geçirin", description: "İnce halatı gözcüğün içinden aşağıdan yukarı geçirin." },
      { title: "3 · İki bacağın arkasından dolayın", description: "İnce halatı gözcüğün iki bacağının arkasından dolayın." },
      { title: "4 · Kendi altına kıstırıp çekin", description: "Ucu kendi beden halatının altına kıstırıp çekin; iki uç aynı tarafta çıkmalıdır." },
    ],
  },
  {
    id: "double-sheet-bend",
    name: "Çifte Kıstırma",
    nameEn: "Double Sheet Bend",
    category: "ekleme",
    difficulty: "Orta",
    use: "Çapları çok farklı veya kaygan iki halatı birleştirir. Tek kıstırmanın daha güvenli hâlidir; ikinci dönüş kavramayı artırır.",
    strengthLoss: "~%45 dayanım kaybı",
    media: {
      kind: "frames",
      frames: frames("double-sheet-bend", 1),
      attribution: "USCG PTC Developer — CC0, Wikimedia Commons",
    },
    steps: [
      { title: "1 · Kalın halatla gözcük", description: "Kalın halatla bir gözcük (bight) oluşturun." },
      { title: "2 · İnce halatı geçirip dolayın", description: "İnce halatı gözcüğün içinden geçirip iki bacağın arkasından dolayın ve kendi bedeninin altına kıstırın." },
      { title: "3 · İkinci dönüşü atın", description: "İnce halatla gözcüğün etrafına ikinci bir dönüş daha atın." },
      { title: "4 · Tekrar kıstırıp çekin", description: "Ucu yine kendi bedeninin altına kıstırıp her iki halatı çekerek sıkın." },
    ],
  },
  {
    id: "carrick-bend",
    name: "Kropi Bağı",
    nameEn: "Carrick Bend",
    category: "ekleme",
    difficulty: "Zor",
    use: "Kalın palamar ve yedek halatlarını birleştirir. Yük altında sıkışmaz, ıslanınca bile kolay çözülür ve düz oturduğu için makara/bloktan geçebilir.",
    media: {
      kind: "frames",
      frames: frames("carrick-bend", 1),
      attribution: "USCG PTC Developer — CC BY-SA 4.0, Wikimedia Commons",
    },
    steps: [
      { title: "1 · İlk halatla ilmek", description: "Bir halatla bir ilmek (gözcük) oluşturun; çalışan uç beden halatının üstünde kalsın." },
      { title: "2 · İkinci halatı altından getirin", description: "İkinci halatı ilk ilmeğin altından getirin." },
      { title: "3 · Örgü desenini dokuyun", description: "İkinci halatı ilmeğin kenarlarının altından-üstünden (over-under) geçirerek simetrik örgü desenini oluşturun." },
      { title: "4 · İki bedeni çekin", description: "Her iki beden halatını çekin; düğüm kare/örgü şekline oturarak sıkışır." },
    ],
  },
];

export const KNOT_TYING_BY_ID: Record<string, KnotTyingDef> = Object.fromEntries(
  KNOT_TYING_ANIMATIONS.map((k) => [k.id, k]),
);
