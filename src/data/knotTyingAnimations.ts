// Definitions for the step-by-step knot-tying animations shown inside the
// Gemicilik (Seamanship) lessons. This file holds the pedagogical metadata
// (Turkish names, usage, the staged captions) plus a reference to the visual
// media for each knot.
//
// Media lives under /public/knots/<id>/ — see /public/knots/README.md for the
// folder/naming convention and how to drop in real rope photos or GIFs.

export interface KnotStep {
  title: string;
  description: string;
}

/**
 * Visual media for a knot.
 *
 * - `frames`: an ordered list of still images (the "Animated Knots" style).
 *   The player steps through them; ideally one frame per `step`.
 * - `gif`: a single animated GIF/WebP that loops on its own.
 *
 * `attribution` is shown in a small footer when the asset requires credit
 * (e.g. CC BY-SA images). Leave undefined for own/placeholder assets.
 */
export type KnotMedia =
  | { kind: "frames"; frames: string[]; attribution?: string }
  | { kind: "gif"; src: string; poster?: string; attribution?: string };

export interface KnotTyingDef {
  id: string;
  name: string;
  nameEn: string;
  difficulty: "Kolay" | "Orta" | "Zor";
  use: string;
  strengthLoss?: string;
  media: KnotMedia;
  steps: KnotStep[];
}

// Helper: build frame paths for a knot's photo sequence.
// frame-1.jpg, frame-2.jpg, ... under /public/knots/<id>/ (see README).
const frames = (id: string, count: number): string[] =>
  Array.from({ length: count }, (_, i) => `/knots/${id}/frame-${i + 1}.jpg`);

// Helper: repeat a single composite image once per step, so the player steps
// through the captions while showing the same all-in-one diagram/photo.
const composite = (id: string, steps: number): string[] =>
  Array.from({ length: steps }, () => `/knots/${id}/frame-1.jpg`);

export const KNOT_TYING_ANIMATIONS: KnotTyingDef[] = [
  {
    id: "bowline",
    name: "İzbarço Bağı",
    nameEn: "Bowline",
    difficulty: "Orta",
    use: "Halatın ucunda yük altında sıkışmayan, kolayca çözülebilen sabit bir ilmek oluşturur. En önemli denizcilik düğümüdür.",
    strengthLoss: "~%40 dayanım kaybı",
    media: {
      kind: "frames",
      frames: frames("bowline", 5),
      attribution: "Patricio Lorente — CC BY-SA 2.5, Wikimedia Commons",
    },
    steps: [
      { title: "1 · Beden ve ilmek", description: "Bedeni (standing part) serili tutun ve üzerinde küçük bir ilmek (tavşan deliği) oluşturun." },
      { title: "2 · Delikten yukarı", description: "Çalışan ucu (tavşan) deliğin içinden aşağıdan yukarıya geçirin." },
      { title: "3 · Bedenin arkasından dolayın", description: "Ucu bedenin arkasından dolayın (ağacın etrafı)." },
      { title: "4 · Delikten geri sokup sıkın", description: "Ucu tekrar delikten geçirip her iki taraftan çekerek sıkın." },
    ],
  },
  {
    id: "figure-eight",
    name: "Sekizli Düğüm",
    nameEn: "Figure-of-Eight",
    difficulty: "Kolay",
    use: "Halatın bloktan veya makaradan kaçmasını önleyen durdurucu (stopper) düğümdür. Düğümler arasında en az dayanım kaybına yol açar.",
    strengthLoss: "~%25 dayanım kaybı",
    media: {
      kind: "frames",
      frames: frames("figure-eight", 5),
      attribution: "Airatique — CC BY-SA 3.0, Wikimedia Commons",
    },
    steps: [
      { title: "1 · İlk ilmek", description: "Çalışan uçla bedenin üzerinde bir ilmek oluşturun." },
      { title: "2 · Ucu arkadan dolayın", description: "Ucu bedenin arkasından dolayarak sekiz şeklini başlatın." },
      { title: "3 · İlmekten geçirip çekin", description: "Ucu ilk ilmeğin içinden geçirip çekerek sekizi tamamlayın." },
    ],
  },
  {
    id: "clove-hitch",
    name: "Kazık Bağı (Volta)",
    nameEn: "Clove Hitch",
    difficulty: "Kolay",
    use: "Halatı bir babaya, baraya veya direğe geçici olarak bağlamak için kullanılır. Tek başına güvenilir değildir; ek emniyet dönüşleriyle desteklenir.",
    media: {
      kind: "frames",
      frames: composite("clove-hitch", 3),
      attribution: "USCG (PTC Developer) — CC0, Wikimedia Commons",
    },
    steps: [
      { title: "1 · İlk volta", description: "Halatı direğin etrafından bir kez dolayın." },
      { title: "2 · Çaprazlayıp ikinci volta", description: "İlk dönüşün üzerinden çaprazlayarak ikinci voltayı atın." },
      { title: "3 · Ucu altından geçirip sıkın", description: "Ucu son dönüşün altından geçirip çekerek kilitleyin." },
    ],
  },
  {
    id: "reef-knot",
    name: "Yassı Düğüm (Camadan)",
    nameEn: "Reef / Square Knot",
    difficulty: "Kolay",
    use: "Aynı çaptaki iki halat ucunu birleştirir. Yelken/branda toplamada yaygındır. Farklı çaplarda kayabileceği için güvenilir değildir.",
    strengthLoss: "~%55 dayanım kaybı",
    media: {
      kind: "frames",
      frames: composite("reef-knot", 3),
      attribution: "USCG PTC Developer — CC BY-SA 4.0, Wikimedia Commons",
    },
    steps: [
      { title: "1 · Sol ucu sağ ucun üzerinden", description: "Sol ucu sağ ucun üzerinden alıp altından geçirin." },
      { title: "2 · Sağ ucu sol ucun üzerinden", description: "Sağ ucu sol ucun üzerinden alıp altından geçirin." },
      { title: "3 · İki ucu çekip sıkın", description: "Her iki çifti çekin; yatık, simetrik bir düğüm oluşur." },
    ],
  },
  {
    id: "sheet-bend",
    name: "Kıstırma Düğümü",
    nameEn: "Sheet Bend",
    difficulty: "Orta",
    use: "Farklı çaptaki iki halatı birleştirir. Kalın halatla bir gözcük (bight) yapılır, ince halat içinden geçirilir. Çift kıstırma daha güvenlidir.",
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
      { title: "4 · Kendi altına kıstırıp çekin", description: "Ucu kendi beden halatının altına kıstırıp çekin." },
    ],
  },
  {
    id: "round-turn-two-half-hitches",
    name: "Camadan Voltası (Round Turn + 2 Half Hitches)",
    nameEn: "Round Turn & Two Half Hitches",
    difficulty: "Orta",
    use: "Bir halatı baraya, ringe veya babaya emniyetle bağlar. Round turn (tam tur) yükü taşır, iki yarım anele (half hitch) düğümü kilitler.",
    media: {
      kind: "frames",
      frames: frames("round-turn-two-half-hitches", 3),
      attribution: "„Der Barbar\" — CC BY 4.0, Wikimedia Commons",
    },
    steps: [
      { title: "1 · Tam tur (round turn)", description: "Halatı baranın etrafından iki kez dolayın; bu tur yükü taşır." },
      { title: "2 · Birinci yarım anele", description: "Ucu beden halatının etrafından bir kez dolayarak ilk yarım aneleyi atın." },
      { title: "3 · İkinci yarım anele", description: "Aynı yönde ikinci yarım aneleyi atıp çekerek kilitleyin." },
    ],
  },
];

export const KNOT_TYING_BY_ID: Record<string, KnotTyingDef> = Object.fromEntries(
  KNOT_TYING_ANIMATIONS.map((k) => [k.id, k]),
);
