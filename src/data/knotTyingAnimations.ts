// Definitions for the step-by-step knot-tying animations shown inside the
// Gemicilik (Seamanship) lesson. Geometry comes from the shared knotGeometry
// module; this file adds the pedagogical metadata (Turkish names, usage, the
// staged captions) and assembles the rope strokes for each knot.

import {
  Vec3,
  buildBowlinePoints,
  buildFigureEightPoints,
  buildCloveHitchPoints,
  buildReefRopeA,
  buildReefRopeB,
  buildReefLockOverlay,
  buildSheetBendBight,
  buildSheetBendWorking,
  buildRoundTurnTwoHalfHitches,
} from "@/utils/knotGeometry";

export type RopeRole = "a" | "b";

export interface KnotStroke {
  points: Vec3[];
  role: RopeRole; // colour of this strand
  overlay?: boolean; // drawn on top last, to fake an over/under crossing
}

export interface KnotStep {
  // Cumulative progress (0..1) over the whole reveal at which this caption
  // becomes active.
  at: number;
  title: string;
  description: string;
}

export type KnotObject =
  | { type: "post"; cx: number; halfWidth: number; yTop: number; yBottom: number }
  | { type: "ring"; cx: number; cy: number; r: number };

export interface KnotTyingDef {
  id: string;
  name: string;
  nameEn: string;
  difficulty: "Kolay" | "Orta" | "Zor";
  use: string;
  strengthLoss?: string;
  objects?: KnotObject[];
  strokes: KnotStroke[];
  steps: KnotStep[];
}

export const KNOT_TYING_ANIMATIONS: KnotTyingDef[] = [
  {
    id: "bowline",
    name: "İzbarço Bağı",
    nameEn: "Bowline",
    difficulty: "Orta",
    use: "Halatın ucunda yük altında sıkışmayan, kolayca çözülebilen sabit bir ilmek oluşturur. En önemli denizcilik düğümüdür.",
    strengthLoss: "~%40 dayanım kaybı",
    strokes: [{ points: buildBowlinePoints(), role: "a" }],
    steps: [
      { at: 0, title: "1 · Beden ve ilmek", description: "Bedeni (standing part) serili tutun ve üzerinde küçük bir ilmek (tavşan deliği) oluşturun." },
      { at: 0.45, title: "2 · Delikten yukarı", description: "Çalışan ucu (tavşan) deliğin içinden aşağıdan yukarıya geçirin." },
      { at: 0.72, title: "3 · Bedenin arkasından dolayın", description: "Ucu bedenin arkasından dolayın (ağacın etrafı)." },
      { at: 0.9, title: "4 · Delikten geri sokup sıkın", description: "Ucu tekrar delikten geçirip her iki taraftan çekerek sıkın." },
    ],
  },
  {
    id: "figure-eight",
    name: "Sekizli Düğüm",
    nameEn: "Figure-of-Eight",
    difficulty: "Kolay",
    use: "Halatın bloktan veya makaradan kaçmasını önleyen durdurucu (stopper) düğümdür. Düğümler arasında en az dayanım kaybına yol açar.",
    strengthLoss: "~%25 dayanım kaybı",
    strokes: [{ points: buildFigureEightPoints(), role: "a" }],
    steps: [
      { at: 0, title: "1 · İlk ilmek", description: "Çalışan uçla bedenin üzerinde bir ilmek oluşturun." },
      { at: 0.45, title: "2 · Ucu arkadan dolayın", description: "Ucu bedenin arkasından dolayarak sekiz şeklini başlatın." },
      { at: 0.78, title: "3 · İlmekten geçirip çekin", description: "Ucu ilk ilmeğin içinden geçirip çekerek sekizi tamamlayın." },
    ],
  },
  {
    id: "clove-hitch",
    name: "Kazık Bağı (Volta)",
    nameEn: "Clove Hitch",
    difficulty: "Kolay",
    use: "Halatı bir babaya, baraya veya direğe geçici olarak bağlamak için kullanılır. Tek başına güvenilir değildir; ek emniyet dönüşleriyle desteklenir.",
    objects: [{ type: "post", cx: 0, halfWidth: 2, yTop: 2.6, yBottom: -2.6 }],
    strokes: [{ points: buildCloveHitchPoints(), role: "a" }],
    steps: [
      { at: 0, title: "1 · İlk volta", description: "Halatı direğin etrafından bir kez dolayın." },
      { at: 0.45, title: "2 · Çaprazlayıp ikinci volta", description: "İlk dönüşün üzerinden çaprazlayarak ikinci voltayı atın." },
      { at: 0.82, title: "3 · Ucu altından geçirip sıkın", description: "Ucu son dönüşün altından geçirip çekerek kilitleyin." },
    ],
  },
  {
    id: "reef-knot",
    name: "Yassı Düğüm (Camadan)",
    nameEn: "Reef / Square Knot",
    difficulty: "Kolay",
    use: "Aynı çaptaki iki halat ucunu birleştirir. Yelken/branda toplamada yaygındır. Farklı çaplarda kayabileceği için güvenilir değildir.",
    strengthLoss: "~%55 dayanım kaybı",
    strokes: [
      { points: buildReefRopeA(), role: "a" },
      { points: buildReefRopeB(), role: "b" },
      { points: buildReefLockOverlay(), role: "a", overlay: true },
    ],
    steps: [
      { at: 0, title: "1 · Sol ucu sağ ucun üzerinden", description: "Sol ucu (sarı) sağ ucun üzerinden alıp altından geçirin." },
      { at: 0.4, title: "2 · Sağ ucu sol ucun üzerinden", description: "Sağ ucu (mavi) sol ucun üzerinden alıp altından geçirin." },
      { at: 0.85, title: "3 · İki ucu çekip sıkın", description: "Her iki çifti çekin; yatık, simetrik bir düğüm oluşur." },
    ],
  },
  {
    id: "sheet-bend",
    name: "Kıstırma Düğümü",
    nameEn: "Sheet Bend",
    difficulty: "Orta",
    use: "Farklı çaptaki iki halatı birleştirir. Kalın halatla bir gözcük (bight) yapılır, ince halat içinden geçirilir. Çift kıstırma daha güvenlidir.",
    strengthLoss: "~%45 dayanım kaybı",
    strokes: [
      { points: buildSheetBendBight(), role: "a" },
      { points: buildSheetBendWorking(), role: "b" },
    ],
    steps: [
      { at: 0, title: "1 · Kalın halatla gözcük", description: "Kalın halatla bir gözcük (bight) oluşturun." },
      { at: 0.4, title: "2 · İnce halatı içinden geçirin", description: "İnce halatı gözcüğün içinden aşağıdan yukarı geçirin." },
      { at: 0.66, title: "3 · İki bacağın arkasından dolayın", description: "İnce halatı gözcüğün iki bacağının arkasından dolayın." },
      { at: 0.85, title: "4 · Kendi altına kıstırıp çekin", description: "Ucu kendi beden halatının altına kıstırıp çekin." },
    ],
  },
  {
    id: "round-turn-two-half-hitches",
    name: "Camadan Voltası (Round Turn + 2 Half Hitches)",
    nameEn: "Round Turn & Two Half Hitches",
    difficulty: "Orta",
    use: "Bir halatı baraya, ringe veya babaya emniyetle bağlar. Round turn (tam tur) yükü taşır, iki yarım anele (half hitch) düğümü kilitler.",
    objects: [{ type: "post", cx: -4, halfWidth: 0.95, yTop: 2.2, yBottom: -2.2 }],
    strokes: [{ points: buildRoundTurnTwoHalfHitches(), role: "a" }],
    steps: [
      { at: 0, title: "1 · Tam tur (round turn)", description: "Halatı baranın etrafından iki kez dolayın; bu tur yükü taşır." },
      { at: 0.55, title: "2 · Birinci yarım anele", description: "Ucu beden halatının etrafından bir kez dolayarak ilk yarım aneleyi atın." },
      { at: 0.78, title: "3 · İkinci yarım anele", description: "Aynı yönde ikinci yarım aneleyi atıp çekerek kilitleyin." },
    ],
  },
];

export const KNOT_TYING_BY_ID: Record<string, KnotTyingDef> = Object.fromEntries(
  KNOT_TYING_ANIMATIONS.map((k) => [k.id, k]),
);
