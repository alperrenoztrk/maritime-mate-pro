/**
 * Lombardan görünen ışığın hesabı — güneşin gün içindeki yerinden gökyüzü
 * rengini, güneş kursunun konumunu ve gecenin koyuluğunu çıkarır.
 *
 * Çizim tarafı için bkz. PortholeSky.tsx; burada yalnızca sayılar var.
 */

/** Fotoğraftaki gerçek deniz ufku (cam kutusunun 0-100 ölçeğinde). */
export const HORIZON = 52;
/** Güneşin izlediği yayın yarıçapı. */
export const ARC_R = 42;

export interface SkyLook {
  /** Güneşin cam kutusundaki yeri (0-100); ufkun altındaysa null. */
  sun: { x: number; y: number } | null;
  /** Yükseklik benzeri değer: +1 tepe, 0 ufuk, negatif gece. */
  elevation: number;
  topColor: string;
  bottomColor: string;
  tintAlpha: number;
  blend: "multiply" | "soft-light";
  sunColor: string;
  glowColor: string;
  /** 0 gündüz, 1 tam karanlık — yıldızların görünürlüğü buradan. */
  night: number;
}

interface Keyframe {
  e: number;
  top: string;
  bottom: string;
  alpha: number;
  blend: "multiply" | "soft-light";
}

/** Yükseklik → ışık anahtar kareleri; aradaki değerler karıştırılır. */
const KEYS: Keyframe[] = [
  { e: -0.34, top: "#04091a", bottom: "#0a1832", alpha: 0.82, blend: "multiply" },
  { e: -0.1, top: "#1d2547", bottom: "#6b4762", alpha: 0.66, blend: "multiply" },
  { e: 0.04, top: "#e8763a", bottom: "#ffc98a", alpha: 0.5, blend: "soft-light" },
  { e: 0.3, top: "#9dc3ea", bottom: "#f6ecd6", alpha: 0.3, blend: "soft-light" },
  { e: 1, top: "#7fb2e8", bottom: "#f2f8fd", alpha: 0.24, blend: "soft-light" },
];

const hex = (c: string) => [
  parseInt(c.slice(1, 3), 16),
  parseInt(c.slice(3, 5), 16),
  parseInt(c.slice(5, 7), 16),
];

const mix = (a: string, b: string, t: number) => {
  const [r1, g1, b1] = hex(a);
  const [r2, g2, b2] = hex(b);
  const p = (x: number, y: number) => Math.round(x + (y - x) * t);
  return `rgb(${p(r1, r2)}, ${p(g1, g2)}, ${p(b1, b2)})`;
};

/**
 * Gün ilerlemesinden (0 doğuş, 1 batış; aralık dışı = gece) ışık tablosu.
 * Yükseklik sinüs eğrisiyle yaklaşıklanır — gerçek güneş yüksekliği de gün
 * boyunca böyle davranır.
 */
export function skyLook(progress: number | null): SkyLook | null {
  if (progress === null || Number.isNaN(progress)) return null;
  const p = Math.min(1.35, Math.max(-0.35, progress));
  const elevation = Math.sin(Math.PI * p);

  let i = 0;
  while (i < KEYS.length - 2 && elevation > KEYS[i + 1].e) i++;
  const a = KEYS[i];
  const b = KEYS[i + 1];
  const t = Math.min(1, Math.max(0, (elevation - a.e) / (b.e - a.e)));
  const near = t < 0.5 ? a : b;

  const angle = Math.PI * (1 - Math.min(1, Math.max(0, p)));
  const sun =
    elevation > -0.02
      ? { x: 50 + ARC_R * Math.cos(angle), y: HORIZON - ARC_R * Math.sin(angle) }
      : null;

  const warm = Math.min(1, Math.max(0, 1 - elevation * 2.6));
  return {
    sun,
    elevation,
    topColor: mix(a.top, b.top, t),
    bottomColor: mix(a.bottom, b.bottom, t),
    tintAlpha: a.alpha + (b.alpha - a.alpha) * t,
    blend: near.blend,
    sunColor: mix("#ffe07d", "#ff8a34", warm),
    glowColor: mix("#ffeeb8", "#ff7a2e", warm),
    night: Math.min(1, Math.max(0, -elevation * 3)),
  };
}
