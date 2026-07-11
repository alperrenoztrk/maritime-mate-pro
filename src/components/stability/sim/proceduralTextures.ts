import * as THREE from "three";
import type { ShipType } from "./ShipModel3D";
import { KEEL_Y, WL_Y, DECK_Y, UNITS_PER_METER, texU, texV } from "./hullGeometry";

/**
 * Runtime-generated PBR texture sets — zero bundled image assets, fully
 * offline (Capacitor WebView safe). Every generator is deterministic (seeded
 * PRNG) and cached at module level; call disposeAllShipTextures() on route
 * unmount.
 *
 * Hull textures are painted against the SAME texU/texV mapping the hull
 * geometry uses for its UVs, so the boot-top, draft marks and Plimsoll mark
 * land at physically exact positions on the 3D hull.
 */

export interface PBRSet {
  map: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
  /** Tangent-space normal map derived from the height canvas — preferred over
   *  bumpMap (three r180 derives tangents in-shader, no computeTangents needed). */
  normalMap: THREE.CanvasTexture;
}

interface HullPaint {
  topside: string;
  antifoul: string;
  boot: string;
  light: boolean; // light-colored topside → dark markings
  name: string;
  port: string;
}

const hullPaints: Record<ShipType, HullPaint> = {
  container: { topside: "#8f3b34", antifoul: "#7d2d24", boot: "#20161a", light: false, name: "MARITIME MATE", port: "ISTANBUL" },
  tanker: { topside: "#24313e", antifoul: "#7d2d24", boot: "#151b22", light: false, name: "KARADENIZ STAR", port: "IZMIR" },
  bulk: { topside: "#242e3a", antifoul: "#8a2f26", boot: "#141a21", light: false, name: "ANADOLU TRADER", port: "MERSIN" },
  roro: { topside: "#1f4d80", antifoul: "#7d2d24", boot: "#132030", light: false, name: "MARMARA BRIDGE", port: "AMBARLI" },
  passenger: { topside: "#eef2f6", antifoul: "#8a2f26", boot: "#1c2733", light: true, name: "EGE PRINCESS", port: "KUSADASI" },
};

const deckBase: Record<ShipType, string> = {
  container: "#3d4a5a",
  tanker: "#37523f",
  bulk: "#414b56",
  roro: "#2c3642",
  passenger: "#7d848e",
};

/* ─── infra ─── */

const cache = new Map<string, THREE.Texture[]>();

function remember<T extends THREE.Texture[]>(key: string, make: () => T): T {
  let t = cache.get(key) as T | undefined;
  if (!t) {
    t = make();
    cache.set(key, t);
  }
  return t;
}

export function disposeAllShipTextures(): void {
  cache.forEach((list) => list.forEach((t) => t.dispose()));
  cache.clear();
}

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function makeCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return [c, c.getContext("2d") as CanvasRenderingContext2D];
}

function toTexture(c: HTMLCanvasElement, srgb: boolean): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Derive a tangent-space normal map from a height canvas (red channel),
 *  Sobel-style central differences with clamped edges (non-tiling art). */
function heightCanvasToNormal(heightCanvas: HTMLCanvasElement, strength: number): THREE.CanvasTexture {
  const W = heightCanvas.width;
  const H = heightCanvas.height;
  const src = (heightCanvas.getContext("2d") as CanvasRenderingContext2D).getImageData(0, 0, W, H).data;
  const [nc, n] = makeCanvas(W, H);
  const img = n.createImageData(W, H);
  const hAt = (x: number, y: number) => {
    const cx = Math.min(Math.max(x, 0), W - 1);
    const cy = Math.min(Math.max(y, 0), H - 1);
    return src[(cy * W + cx) * 4] / 255;
  };
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = (hAt(x + 1, y) - hAt(x - 1, y)) * strength;
      const dy = (hAt(x, y + 1) - hAt(x, y - 1)) * strength;
      const inv = 1 / Math.sqrt(dx * dx + dy * dy + 1);
      const i = (y * W + x) * 4;
      img.data[i] = (-dx * inv * 0.5 + 0.5) * 255;
      img.data[i + 1] = (dy * inv * 0.5 + 0.5) * 255;
      img.data[i + 2] = inv * 255;
      img.data[i + 3] = 255;
    }
  }
  n.putImageData(img, 0, 0);
  return toTexture(nc, false);
}

/* ─── hull ─── */

const HULL_W = 1024;
const HULL_H = 512;

const uPix = (u: number) => u * HULL_W;
const vPix = (v: number) => (1 - v) * HULL_H;

/** The hull set carries an extra colour map for the PORT side: identical
 *  weathering/paint, but name and draft-mark text pre-mirrored so it reads
 *  correctly there (hull UVs are shared by both sides). */
export interface HullPBRSet extends PBRSet {
  portMap: THREE.CanvasTexture;
}

function paintHullCanvases(
  type: ShipType,
  mirrorText: boolean
): [HTMLCanvasElement, HTMLCanvasElement, HTMLCanvasElement] {
    const paint = hullPaints[type];
    const rnd = mulberry32(hashSeed(`hull-${type}`));

    const [mc, m] = makeCanvas(HULL_W, HULL_H);
    const [bc, b] = makeCanvas(HULL_W, HULL_H);
    const [rc, r] = makeCanvas(HULL_W, HULL_H);

    // draw text mirrored in place when painting the port-side map
    const drawMark = (text: string, x: number, y: number) => {
      if (!mirrorText) {
        m.fillText(text, x, y);
        return;
      }
      m.save();
      m.translate(x, y);
      m.scale(-1, 1);
      m.fillText(text, 0, 0);
      m.restore();
    };

    const yWL = vPix(texV(WL_Y));
    const yBootTop = vPix(texV(WL_Y + 0.045));
    const yBootBot = vPix(texV(WL_Y - 0.03));
    const yDeck = vPix(texV(DECK_Y));

    // 1 — base bands
    m.fillStyle = paint.topside;
    m.fillRect(0, 0, HULL_W, HULL_H);
    m.fillStyle = paint.antifoul;
    m.fillRect(0, yWL, HULL_W, HULL_H - yWL);
    m.fillStyle = paint.boot;
    m.fillRect(0, yBootTop, HULL_W, yBootBot - yBootTop);

    b.fillStyle = "#808080";
    b.fillRect(0, 0, HULL_W, HULL_H);

    r.fillStyle = "#8c8c8c"; // topside paint ≈ 0.55 roughness
    r.fillRect(0, 0, HULL_W, HULL_H);
    r.fillStyle = "#c2c2c2"; // antifouling is rough
    r.fillRect(0, yWL, HULL_W, HULL_H - yWL);
    r.fillStyle = "#9c9c9c";
    r.fillRect(0, yBootTop, HULL_W, yBootBot - yBootTop);

    // 2 — shipyard plating: per-plate tint patchwork + seams
    const plateW = 64;
    const plateH = 40;
    for (let px = 0; px < HULL_W; px += plateW) {
      for (let py = 0; py < HULL_H; py += plateH) {
        const l = rnd();
        m.fillStyle = l > 0.5 ? `rgba(255,255,255,${(l - 0.5) * 0.07})` : `rgba(0,0,0,${(0.5 - l) * 0.09})`;
        m.fillRect(px, py, plateW, plateH);
        // slight per-plate pillowing on the bump map
        const g = b.createRadialGradient(px + plateW / 2, py + plateH / 2, 2, px + plateW / 2, py + plateH / 2, plateW / 2);
        g.addColorStop(0, "rgba(140,140,140,0.5)");
        g.addColorStop(1, "rgba(120,120,120,0.15)");
        b.fillStyle = g;
        b.fillRect(px, py, plateW, plateH);
      }
    }
    m.strokeStyle = "rgba(0,0,0,0.16)";
    b.strokeStyle = "rgba(74,74,74,0.9)";
    m.lineWidth = 1;
    b.lineWidth = 2;
    for (let px = 0; px <= HULL_W; px += plateW) {
      m.beginPath(); m.moveTo(px, 0); m.lineTo(px, HULL_H); m.stroke();
      b.beginPath(); b.moveTo(px, 0); b.lineTo(px, HULL_H); b.stroke();
    }
    for (let py = 0; py <= HULL_H; py += plateH) {
      m.beginPath(); m.moveTo(0, py); m.lineTo(HULL_W, py); m.stroke();
      b.beginPath(); b.moveTo(0, py); b.lineTo(HULL_W, py); b.stroke();
    }

    // 3 — weathering: waterline scum band just above the boot-top
    const scum = m.createLinearGradient(0, yBootTop - 14, 0, yBootTop);
    scum.addColorStop(0, "rgba(96,84,52,0)");
    scum.addColorStop(1, "rgba(96,84,52,0.35)");
    m.fillStyle = scum;
    m.fillRect(0, yBootTop - 14, HULL_W, 14);

    // rust streaks running down from the deck edge (scuppers) + hawse area
    const paintRust = (x: number, y: number, len: number, w: number, alpha: number) => {
      const g = m.createLinearGradient(0, y, 0, y + len);
      g.addColorStop(0, `rgba(122,74,42,${alpha})`);
      g.addColorStop(1, "rgba(122,74,42,0)");
      m.fillStyle = g;
      m.fillRect(x, y, w, len);
      r.fillStyle = "rgba(224,224,224,0.5)";
      r.fillRect(x, y, w, len * 0.7);
    };
    for (let x = 20; x < HULL_W - 20; x += 60 + rnd() * 80) {
      if (rnd() < 0.75) paintRust(x, yDeck + 2, 30 + rnd() * 70, 2 + rnd() * 3, 0.12 + rnd() * 0.16);
    }
    const hawseX = uPix(texU(3.05));
    for (let k = 0; k < 4; k++) paintRust(hawseX + 8 + k * 7 + rnd() * 4, yDeck + 14, 60 + rnd() * 50, 3, 0.2 + rnd() * 0.15);
    // hawsepipe opening
    m.fillStyle = "#0d0f12";
    m.beginPath();
    m.ellipse(hawseX + 16, yDeck + 16, 9, 7, 0, 0, Math.PI * 2);
    m.fill();

    // sparse grime blotches
    for (let k = 0; k < 40; k++) {
      const gx = rnd() * HULL_W;
      const gy = rnd() * HULL_H;
      const gr = 8 + rnd() * 26;
      const g = m.createRadialGradient(gx, gy, 1, gx, gy, gr);
      g.addColorStop(0, `rgba(20,22,26,${0.04 + rnd() * 0.05})`);
      g.addColorStop(1, "rgba(20,22,26,0)");
      m.fillStyle = g;
      m.fillRect(gx - gr, gy - gr, gr * 2, gr * 2);
    }

    // 4 — draft marks (height-honest: 1 m = UNITS_PER_METER, design draft 6.5 m at WL)
    const markInk = paint.light ? "#1c2733" : "#f2f5f8";
    m.fillStyle = markInk;
    m.textAlign = "left";
    m.font = "700 13px Arial, sans-serif";
    const drawDraftColumn = (x: number) => {
      for (let meters = 2; meters <= 12; meters += 2) {
        const y = vPix(texV(KEEL_Y + meters * UNITS_PER_METER));
        if (y < yDeck + 8) continue; // never above deck edge
        drawMark(`${meters}M`, x, y + 4);
        m.fillRect(x - 12, y - 1, 8, 2);
      }
    };
    drawDraftColumn(uPix(texU(3.0)));
    drawDraftColumn(uPix(texU(-3.05)));

    // 5 — Plimsoll mark at midship on the waterline
    const px0 = uPix(texU(0));
    const py0 = yWL - (yWL - yBootTop) / 2 - 6; // ring centre on the load line
    m.strokeStyle = markInk;
    m.lineWidth = 2.5;
    m.beginPath();
    m.arc(px0, py0, 13, 0, Math.PI * 2);
    m.stroke();
    m.beginPath();
    m.moveTo(px0 - 19, py0);
    m.lineTo(px0 + 19, py0);
    m.stroke();
    m.font = "700 10px Arial, sans-serif";
    m.textAlign = "center";
    drawMark("L", px0 - 24, py0 + 3);
    drawMark("R", px0 + 25, py0 + 3);
    // load-line comb forward of the ring
    const combX = px0 + 46;
    m.beginPath();
    m.moveTo(combX, py0 - 22);
    m.lineTo(combX, py0 + 18);
    m.stroke();
    m.lineWidth = 2;
    const combRow = (dy: number, label: string, side: 1 | -1) => {
      m.beginPath();
      m.moveTo(combX, py0 + dy);
      m.lineTo(combX + side * 14, py0 + dy);
      m.stroke();
      drawMark(label, combX + side * 22, py0 + dy + 3);
    };
    combRow(-16, "TF", -1);
    combRow(-8, "F", -1);
    combRow(0, "T", 1);
    combRow(8, "S", 1);
    combRow(16, "W", 1);

    // 6 — name (bow) and name + port of registry (stern)
    m.fillStyle = markInk;
    m.textAlign = "center";
    m.font = "700 24px Arial, sans-serif";
    drawMark(paint.name, uPix(texU(2.2)), vPix(texV(0.3)));
    m.font = "700 15px Arial, sans-serif";
    drawMark(paint.name, uPix(texU(-3.28)), vPix(texV(0.26)));
    m.font = "600 11px Arial, sans-serif";
    drawMark(paint.port, uPix(texU(-3.28)), vPix(texV(0.14)));

    // 7 — baked AO: deck-edge shadow under the sheer strake, extra darkening
    // under the counter stern, and a soft occlusion floor near the keel.
    const edgeAO = m.createLinearGradient(0, yDeck, 0, yDeck + 12);
    edgeAO.addColorStop(0, "rgba(8,10,14,0.28)");
    edgeAO.addColorStop(1, "rgba(8,10,14,0)");
    m.fillStyle = edgeAO;
    m.fillRect(0, yDeck, HULL_W, 12);
    const sternAO = m.createLinearGradient(0, 0, uPix(texU(-2.6)), 0);
    sternAO.addColorStop(0, "rgba(8,10,14,0.22)");
    sternAO.addColorStop(1, "rgba(8,10,14,0)");
    m.fillStyle = sternAO;
    m.fillRect(0, yWL, uPix(texU(-2.6)), HULL_H - yWL);
    const keelAO = m.createLinearGradient(0, vPix(texV(KEEL_Y + 0.14)), 0, HULL_H);
    keelAO.addColorStop(0, "rgba(6,8,10,0)");
    keelAO.addColorStop(1, "rgba(6,8,10,0.3)");
    m.fillStyle = keelAO;
    m.fillRect(0, vPix(texV(KEEL_Y + 0.14)), HULL_W, HULL_H - vPix(texV(KEEL_Y + 0.14)));

    return [mc, bc, rc];
}

export function getHullTextures(type: ShipType): HullPBRSet {
  const [map, bumpMap, roughnessMap, normalMap, portMap] = remember(`hull:${type}`, () => {
    const [mc, bc, rc] = paintHullCanvases(type, false);
    const [pc] = paintHullCanvases(type, true); // port side: text pre-mirrored
    return [
      toTexture(mc, true),
      toTexture(bc, false),
      toTexture(rc, false),
      heightCanvasToNormal(bc, 1.6),
      toTexture(pc, true),
    ];
  });
  return { map, bumpMap, roughnessMap, normalMap, portMap } as HullPBRSet;
}

/* ─── deck ─── */

export function getDeckTextures(type: ShipType): PBRSet {
  const [map, bumpMap, roughnessMap, normalMap] = remember(`deck:${type}`, () => {
    const rnd = mulberry32(hashSeed(`deck-${type}`));
    const W = 512;
    const H = 256;
    const [mc, m] = makeCanvas(W, H);
    const [bc, b] = makeCanvas(W, H);
    const [rc, r] = makeCanvas(W, H);

    m.fillStyle = deckBase[type];
    m.fillRect(0, 0, W, H);
    b.fillStyle = "#808080";
    b.fillRect(0, 0, W, H);
    r.fillStyle = "#c8c8c8"; // painted steel deck, rough
    r.fillRect(0, 0, W, H);

    // transverse plate seams + subtle plate tint
    for (let x = 0; x < W; x += 42) {
      const l = rnd();
      m.fillStyle = l > 0.5 ? `rgba(255,255,255,${(l - 0.5) * 0.06})` : `rgba(0,0,0,${(0.5 - l) * 0.08})`;
      m.fillRect(x, 0, 42, H);
      m.strokeStyle = "rgba(0,0,0,0.22)";
      m.lineWidth = 1;
      m.beginPath(); m.moveTo(x, 0); m.lineTo(x, H); m.stroke();
      b.strokeStyle = "rgba(70,70,70,0.9)";
      b.lineWidth = 2;
      b.beginPath(); b.moveTo(x, 0); b.lineTo(x, H); b.stroke();
    }
    // painted safety walkway lanes along each side (v ≈ 0.16 / 0.84)
    const laneInk = type === "passenger" ? "rgba(66,74,84,0.5)" : "rgba(214,220,226,0.4)";
    m.strokeStyle = laneInk;
    m.lineWidth = 3;
    m.setLineDash([26, 14]);
    for (const ly of [H * 0.16, H * 0.84]) {
      m.beginPath(); m.moveTo(0, ly); m.lineTo(W, ly); m.stroke();
    }
    m.setLineDash([]);
    // anti-skid speckle
    for (let k = 0; k < 1800; k++) {
      const a = rnd() * 0.1;
      m.fillStyle = rnd() > 0.5 ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a})`;
      m.fillRect(rnd() * W, rnd() * H, 1.5, 1.5);
    }
    // rust bloom near deck edges (v 0 and 1)
    for (let k = 0; k < 26; k++) {
      const gx = rnd() * W;
      const gy = rnd() > 0.5 ? rnd() * 18 : H - rnd() * 18;
      const gr = 5 + rnd() * 14;
      const g = m.createRadialGradient(gx, gy, 1, gx, gy, gr);
      g.addColorStop(0, `rgba(122,72,40,${0.12 + rnd() * 0.14})`);
      g.addColorStop(1, "rgba(122,72,40,0)");
      m.fillStyle = g;
      m.fillRect(gx - gr, gy - gr, gr * 2, gr * 2);
    }
    // baked AO: bulwark shadow along both deck edges
    for (const [gy0, gy1] of [
      [0, 14],
      [H, H - 14],
    ]) {
      const g = m.createLinearGradient(0, gy0, 0, gy1);
      g.addColorStop(0, "rgba(8,10,14,0.3)");
      g.addColorStop(1, "rgba(8,10,14,0)");
      m.fillStyle = g;
      m.fillRect(0, Math.min(gy0, gy1), W, 14);
    }

    const map = toTexture(mc, true);
    const bumpMap = toTexture(bc, false);
    const roughnessMap = toTexture(rc, false);
    const normalMap = heightCanvasToNormal(bc, 1.4);
    for (const t of [map, bumpMap, roughnessMap, normalMap]) {
      t.wrapS = THREE.RepeatWrapping;
      t.repeat.x = 3;
    }
    return [map, bumpMap, roughnessMap, normalMap];
  });
  return { map, bumpMap, roughnessMap, normalMap } as PBRSet;
}

/* ─── containers ─── */

/** Atlas cells (u0,v0,u1,v1) used by ContainerStacks' per-face UV remap. */
export const CONTAINER_ATLAS = {
  side: [0.01, 0.02, 0.49, 0.98] as const,
  door: [0.51, 0.52, 0.99, 0.98] as const,
  roof: [0.51, 0.02, 0.99, 0.48] as const,
};

export function getContainerTextures(): PBRSet {
  const [map, bumpMap, roughnessMap, normalMap] = remember("container-box", () => {
    const W = 512;
    const H = 256;
    const [mc, m] = makeCanvas(W, H);
    const [bc, b] = makeCanvas(W, H);
    const [rc, r] = makeCanvas(W, H);

    // near-white base so instanceColor tinting works (map × instanceColor)
    m.fillStyle = "#ececec";
    m.fillRect(0, 0, W, H);
    b.fillStyle = "#808080";
    b.fillRect(0, 0, W, H);
    r.fillStyle = "#9c9c9c";
    r.fillRect(0, 0, W, H);

    const rnd = mulberry32(7);

    // ── left half: side-wall corrugation ──
    for (let x = 0; x < 256; x += 10) {
      m.fillStyle = "rgba(0,0,0,0.12)";
      m.fillRect(x, 0, 4, H);
      m.fillStyle = "rgba(255,255,255,0.08)";
      m.fillRect(x + 6, 0, 2, H);
      b.fillStyle = "#5c5c5c";
      b.fillRect(x, 0, 4, H);
      b.fillStyle = "#a4a4a4";
      b.fillRect(x + 4, 0, 4, H);
    }
    m.strokeStyle = "rgba(0,0,0,0.4)";
    m.lineWidth = 5;
    m.strokeRect(2, 2, 252, H - 4);
    // weathering streaks on the side
    for (let k = 0; k < 14; k++) {
      const gx = rnd() * 240;
      m.fillStyle = `rgba(110,70,40,${0.05 + rnd() * 0.1})`;
      m.fillRect(gx, rnd() * H * 0.4, 2 + rnd() * 3, 20 + rnd() * 50);
    }

    // ── right-top: door face (lock rods, hinges, CSC plate) ──
    m.save();
    b.save();
    m.beginPath(); m.rect(256, 0, 256, 128); m.clip();
    b.beginPath(); b.rect(256, 0, 256, 128); b.clip();
    // two door leaves
    m.strokeStyle = "rgba(0,0,0,0.35)";
    m.lineWidth = 3;
    m.beginPath(); m.moveTo(256 + 128, 4); m.lineTo(256 + 128, 124); m.stroke();
    for (const x of [256 + 34, 256 + 74, 256 + 158, 256 + 198]) {
      m.strokeStyle = "rgba(20,20,20,0.55)";
      m.lineWidth = 4;
      m.beginPath(); m.moveTo(x, 6); m.lineTo(x, 122); m.stroke();
      b.strokeStyle = "#b0b0b0";
      b.lineWidth = 4;
      b.beginPath(); b.moveTo(x, 6); b.lineTo(x, 122); b.stroke();
      // handles + keeper brackets
      m.fillStyle = "rgba(20,20,20,0.6)";
      m.fillRect(x - 5, 34, 10, 8);
      m.fillRect(x - 5, 86, 10, 8);
      m.fillRect(x - 2, 58, 16, 5);
    }
    // CSC safety-approval plate
    m.fillStyle = "rgba(210,214,218,0.85)";
    m.fillRect(256 + 104, 96, 48, 24);
    m.strokeStyle = "rgba(40,44,48,0.7)";
    m.lineWidth = 1.5;
    m.strokeRect(256 + 104, 96, 48, 24);
    m.fillStyle = "rgba(40,44,48,0.8)";
    m.font = "700 9px Arial, sans-serif";
    m.textAlign = "center";
    m.fillText("CSC", 256 + 128, 106);
    m.fillText("MAX 30480", 256 + 128, 116);
    m.strokeStyle = "rgba(0,0,0,0.4)";
    m.lineWidth = 5;
    m.strokeRect(258, 2, 252, 124);
    m.restore();
    b.restore();

    // ── right-bottom: roof ribs ──
    m.save();
    b.save();
    m.beginPath(); m.rect(256, 128, 256, 128); m.clip();
    b.beginPath(); b.rect(256, 128, 256, 128); b.clip();
    for (let x = 260; x < 512; x += 14) {
      m.fillStyle = "rgba(0,0,0,0.08)";
      m.fillRect(x, 130, 6, 124);
      b.fillStyle = "#6e6e6e";
      b.fillRect(x, 130, 6, 124);
    }
    // corner castings
    m.fillStyle = "rgba(30,32,36,0.5)";
    for (const [cx, cy] of [
      [260, 132],
      [498, 132],
      [260, 242],
      [498, 242],
    ]) {
      m.fillRect(cx, cy, 10, 10);
    }
    // roof grime pools
    for (let k = 0; k < 10; k++) {
      const gx = 262 + rnd() * 240;
      const gy = 134 + rnd() * 116;
      const gr = 6 + rnd() * 16;
      const g = m.createRadialGradient(gx, gy, 1, gx, gy, gr);
      g.addColorStop(0, `rgba(70,74,66,${0.1 + rnd() * 0.12})`);
      g.addColorStop(1, "rgba(70,74,66,0)");
      m.fillStyle = g;
      m.fillRect(gx - gr, gy - gr, gr * 2, gr * 2);
    }
    m.strokeStyle = "rgba(0,0,0,0.35)";
    m.lineWidth = 5;
    m.strokeRect(258, 130, 252, 124);
    m.restore();
    b.restore();

    return [toTexture(mc, true), toTexture(bc, false), toTexture(rc, false), heightCanvasToNormal(bc, 1.8)];
  });
  return { map, bumpMap, roughnessMap, normalMap } as PBRSet;
}

/* ─── superstructure wall atlas ─── */

export interface SuperstructureTextures {
  map: THREE.CanvasTexture;
  emissiveMap: THREE.CanvasTexture;
  normalMap: THREE.CanvasTexture;
}

export const SS_ATLAS_W = 1024;
export const SS_ATLAS_H = 512;
export const SS_ROW_H = 96;
export const SS_ROWS = 5; // row 0 = bridge glass row, 1..4 accommodation decks
/** One u-repeat of the atlas spans this many world units (window pitch rule). */
export const SS_U_WORLD = 1.05;

/** v-range [v0, v1] of an atlas row, inset to avoid cross-row bleed. */
export function ssRowV(row: number): [number, number] {
  const eps = 3 / SS_ATLAS_H;
  const top = 1 - (row * SS_ROW_H) / SS_ATLAS_H;
  const bot = 1 - ((row + 1) * SS_ROW_H) / SS_ATLAS_H;
  return [bot + eps, top - eps];
}
/** v-range of the plain painted cell (box tops, backs, plinths). */
export function ssPlainV(): [number, number] {
  return [2 / SS_ATLAS_H, (32 - 2) / SS_ATLAS_H];
}

/**
 * 1024×512 wall atlas: 5 deck-level rows (windows, doors, louvres, drip
 * stains) + a plain cell at the bottom. Windows are drawn inset into the
 * height canvas so the derived normal map gives real-looking recesses.
 */
export function getSuperstructureTextures(type: ShipType, wallColor: string): SuperstructureTextures {
  const [map, emissiveMap, normalMap] = remember(`ss:${type}`, () => {
    const W = SS_ATLAS_W;
    const H = SS_ATLAS_H;
    const [mc, m] = makeCanvas(W, H);
    const [hc, h] = makeCanvas(W, H);
    const [ec, e] = makeCanvas(W, H);
    const rnd = mulberry32(hashSeed(`ss-${type}`));

    m.fillStyle = wallColor;
    m.fillRect(0, 0, W, H);
    h.fillStyle = "#808080";
    h.fillRect(0, 0, W, H);
    e.fillStyle = "#000000";
    e.fillRect(0, 0, W, H);

    // vertical panel seams
    for (let x = 0; x <= W; x += 48) {
      m.fillStyle = "rgba(0,0,0,0.06)";
      m.fillRect(x, 0, 1.5, H);
      h.fillStyle = "#6e6e6e";
      h.fillRect(x, 0, 2, H);
    }

    for (let row = 0; row < SS_ROWS; row++) {
      const y0 = row * SS_ROW_H;
      const bridge = row === 0;
      const winW = bridge ? 56 : 32;
      const winH = bridge ? 44 : 30;
      const pitch = bridge ? 72 : 64;
      const wy = y0 + (SS_ROW_H - winH) / 2 - (bridge ? 4 : 2);

      // deck seam at the row bottom
      m.fillStyle = "rgba(0,0,0,0.18)";
      m.fillRect(0, y0 + SS_ROW_H - 2, W, 2);
      h.fillStyle = "#5a5a5a";
      h.fillRect(0, y0 + SS_ROW_H - 3, W, 3);

      for (let x = 12; x + winW < W - 6; x += pitch) {
        // occasionally a weathertight door instead of a window (not on bridge row)
        if (!bridge && rnd() < 0.09) {
          const dw = 30;
          const dh = 58;
          const dx = x + (winW - dw) / 2;
          const dy = y0 + SS_ROW_H - dh - 4;
          m.fillStyle = "rgba(0,0,0,0.12)";
          m.fillRect(dx, dy, dw, dh);
          m.strokeStyle = "rgba(10,12,16,0.5)";
          m.lineWidth = 2;
          m.strokeRect(dx, dy, dw, dh);
          m.fillStyle = "rgba(20,24,30,0.7)";
          m.fillRect(dx + dw - 7, dy + dh / 2 - 4, 4, 9); // handle
          h.fillStyle = "#6a6a6a";
          h.fillRect(dx, dy, dw, dh);
          h.strokeStyle = "#9a9a9a";
          h.lineWidth = 2;
          h.strokeRect(dx + 3, dy + 3, dw - 6, dh - 6); // gasket ridge
          continue;
        }

        // window glass with sky gradient
        const g = m.createLinearGradient(0, wy, 0, wy + winH);
        g.addColorStop(0, "#33465e");
        g.addColorStop(0.5, "#1a2635");
        g.addColorStop(1, "#243a52");
        m.fillStyle = g;
        m.beginPath();
        m.roundRect(x, wy, winW, winH, 3);
        m.fill();
        m.strokeStyle = "rgba(0,0,0,0.4)";
        m.lineWidth = 1.5;
        m.stroke();
        // recess in the height canvas → bevelled inset in the normal map
        h.fillStyle = "#484848";
        h.beginPath();
        h.roundRect(x, wy, winW, winH, 3);
        h.fill();
        h.fillStyle = "#9c9c9c"; // sill lip below
        h.fillRect(x - 1, wy + winH, winW + 2, 3);
        // some windows lit warm (bridge row mostly on)
        if (rnd() < (bridge ? 0.65 : 0.3)) {
          e.fillStyle = `rgba(255,${205 + Math.floor(rnd() * 30)},140,${0.75 + rnd() * 0.25})`;
          e.beginPath();
          e.roundRect(x + 2, wy + 2, winW - 4, winH - 4, 2);
          e.fill();
        }
        // drip stain under the window
        const dg = m.createLinearGradient(0, wy + winH + 2, 0, wy + winH + 16);
        dg.addColorStop(0, "rgba(56,60,64,0.25)");
        dg.addColorStop(1, "rgba(56,60,64,0)");
        m.fillStyle = dg;
        m.fillRect(x + 3, wy + winH + 2, winW - 6, 14);
      }

      // an AC louvre or two on accommodation rows
      if (!bridge) {
        for (let k = 0; k < 2; k++) {
          if (rnd() < 0.55) continue;
          const lx = 30 + rnd() * (W - 100);
          const ly = y0 + 12;
          m.fillStyle = "rgba(0,0,0,0.1)";
          m.fillRect(lx, ly, 44, 16);
          m.strokeStyle = "rgba(20,24,28,0.4)";
          m.lineWidth = 1;
          for (let yy = ly + 3; yy < ly + 16; yy += 3) {
            m.beginPath();
            m.moveTo(lx + 2, yy);
            m.lineTo(lx + 42, yy);
            m.stroke();
          }
          h.fillStyle = "#616161";
          h.fillRect(lx, ly, 44, 16);
        }
      }
    }

    // plain cell (bottom strip): untouched wall paint + a faint weather wash
    const py = SS_ROWS * SS_ROW_H;
    const wash = m.createLinearGradient(0, py, 0, H);
    wash.addColorStop(0, "rgba(90,96,104,0.05)");
    wash.addColorStop(1, "rgba(90,96,104,0.12)");
    m.fillStyle = wash;
    m.fillRect(0, py, W, H - py);

    const mt = toTexture(mc, true);
    const et = toTexture(ec, true);
    const nt = heightCanvasToNormal(hc, 2.2);
    for (const t of [mt, et, nt]) t.wrapS = THREE.RepeatWrapping;
    return [mt, et, nt];
  });
  return { map, emissiveMap, normalMap } as SuperstructureTextures;
}

/* ─── funnel ─── */

const funnelSchemes: Record<ShipType, { base: string; band: string }> = {
  container: { base: "#c0392b", band: "#f5f6f7" },
  tanker: { base: "#2c3a47", band: "#c0392b" },
  bulk: { base: "#c9b58a", band: "#22303e" },
  roro: { base: "#1f4d80", band: "#f5f6f7" },
  passenger: { base: "#f5f6f7", band: "#c0392b" },
};

export function getFunnelTexture(type: ShipType): THREE.CanvasTexture {
  return remember(`funnel:${type}`, () => {
    const W = 256;
    const H = 128;
    const [c, g] = makeCanvas(W, H);
    const scheme = funnelSchemes[type];
    g.fillStyle = scheme.base;
    g.fillRect(0, 0, W, H);
    // black smoke cap
    g.fillStyle = "#14181d";
    g.fillRect(0, 0, W, 16);
    // company band + simple house mark (star)
    g.fillStyle = scheme.band;
    g.fillRect(0, 34, W, 30);
    g.fillStyle = scheme.base;
    g.save();
    g.translate(W / 4, 49);
    g.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      g[i === 0 ? "moveTo" : "lineTo"](Math.cos(a) * 11, Math.sin(a) * 11);
    }
    g.closePath();
    g.fill();
    g.restore();
    // soot streaks from the cap
    const rnd = mulberry32(hashSeed(`funnel-${type}`));
    for (let k = 0; k < 10; k++) {
      const x = rnd() * W;
      const grad = g.createLinearGradient(0, 16, 0, 60);
      grad.addColorStop(0, "rgba(16,18,22,0.35)");
      grad.addColorStop(1, "rgba(16,18,22,0)");
      g.fillStyle = grad;
      g.fillRect(x, 16, 2 + rnd() * 3, 30 + rnd() * 16);
    }
    // exhaust grill band inside the cap
    g.strokeStyle = "rgba(60,64,70,0.8)";
    g.lineWidth = 2;
    for (let x = 4; x < W; x += 10) {
      g.beginPath();
      g.moveTo(x, 3);
      g.lineTo(x, 13);
      g.stroke();
    }
    // service platform shadow ring
    const ring = g.createLinearGradient(0, 78, 0, 92);
    ring.addColorStop(0, "rgba(10,12,16,0.4)");
    ring.addColorStop(1, "rgba(10,12,16,0)");
    g.fillStyle = ring;
    g.fillRect(0, 78, W, 14);
    // access ladder (rails + rungs), once per revolution
    const lx = W * 0.82;
    g.strokeStyle = "rgba(24,28,34,0.75)";
    g.lineWidth = 2;
    g.beginPath(); g.moveTo(lx - 5, 18); g.lineTo(lx - 5, H - 8); g.stroke();
    g.beginPath(); g.moveTo(lx + 5, 18); g.lineTo(lx + 5, H - 8); g.stroke();
    g.lineWidth = 1.5;
    for (let y = 22; y < H - 8; y += 7) {
      g.beginPath(); g.moveTo(lx - 5, y); g.lineTo(lx + 5, y); g.stroke();
    }
    return [toTexture(c, true)];
  })[0] as THREE.CanvasTexture;
}

/* ─── water normal map (tiling) ─── */

export function getWaterNormalTexture(): THREE.CanvasTexture {
  return remember("water-normal", () => {
    const S = 512;
    const rnd = mulberry32(1337);

    // tiling multi-octave value noise heightfield
    const octaves = [8, 16, 32, 64];
    const amps = [1, 0.55, 0.3, 0.16];
    const grids = octaves.map((n) => {
      const g = new Float32Array(n * n);
      for (let i = 0; i < g.length; i++) g[i] = rnd();
      return g;
    });
    const sample = (g: Float32Array, n: number, x: number, y: number) => {
      const fx = (x / S) * n;
      const fy = (y / S) * n;
      const x0 = Math.floor(fx) % n;
      const y0 = Math.floor(fy) % n;
      const x1 = (x0 + 1) % n;
      const y1 = (y0 + 1) % n;
      const tx = fx - Math.floor(fx);
      const ty = fy - Math.floor(fy);
      const sx = tx * tx * (3 - 2 * tx);
      const sy = ty * ty * (3 - 2 * ty);
      const a = g[y0 * n + x0];
      const b2 = g[y0 * n + x1];
      const c2 = g[y1 * n + x0];
      const d = g[y1 * n + x1];
      return a + (b2 - a) * sx + (c2 - a) * sy + (a - b2 - c2 + d) * sx * sy;
    };
    const height = new Float32Array(S * S);
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        let h = 0;
        for (let o = 0; o < octaves.length; o++) h += sample(grids[o], octaves[o], x, y) * amps[o];
        height[y * S + x] = h;
      }
    }
    const [c, g] = makeCanvas(S, S);
    const img = g.createImageData(S, S);
    const strength = 2.2;
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        const xm = (x - 1 + S) % S;
        const xp = (x + 1) % S;
        const ym = (y - 1 + S) % S;
        const yp = (y + 1) % S;
        const dx = (height[y * S + xp] - height[y * S + xm]) * strength;
        const dy = (height[yp * S + x] - height[ym * S + x]) * strength;
        const inv = 1 / Math.sqrt(dx * dx + dy * dy + 1);
        const i = (y * S + x) * 4;
        img.data[i] = (-dx * inv * 0.5 + 0.5) * 255;
        img.data[i + 1] = (-dy * inv * 0.5 + 0.5) * 255;
        img.data[i + 2] = inv * 255;
        img.data[i + 3] = 255;
      }
    }
    g.putImageData(img, 0, 0);
    const t = toTexture(c, false);
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    return [t];
  })[0] as THREE.CanvasTexture;
}

/* ─── foam alpha (tiling) ─── */

export function getFoamAlphaTexture(): THREE.CanvasTexture {
  return remember("foam-alpha", () => {
    const S = 256;
    const [c, g] = makeCanvas(S, S);
    g.fillStyle = "#000000";
    g.fillRect(0, 0, S, S);
    const rnd = mulberry32(4242);
    // layered soft blobs → cloudy foam; drawn wrapped so the tile is seamless
    for (let k = 0; k < 340; k++) {
      const x = rnd() * S;
      const y = rnd() * S;
      const rad = 4 + rnd() * 18;
      const a = 0.1 + rnd() * 0.22;
      for (const ox of [-S, 0, S]) {
        for (const oy of [-S, 0, S]) {
          const grad = g.createRadialGradient(x + ox, y + oy, 0.5, x + ox, y + oy, rad);
          grad.addColorStop(0, `rgba(255,255,255,${a})`);
          grad.addColorStop(1, "rgba(255,255,255,0)");
          g.fillStyle = grad;
          g.fillRect(x + ox - rad, y + oy - rad, rad * 2, rad * 2);
        }
      }
    }
    const t = toTexture(c, false);
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    return [t];
  })[0] as THREE.CanvasTexture;
}

/* ─── wake foam strip (tiling on u; soft v edges baked in) ─── */

export function getWakeStripTexture(): THREE.CanvasTexture {
  return remember("wake-strip", () => {
    const W = 256;
    const H = 64;
    const [c, g] = makeCanvas(W, H);
    g.fillStyle = "#000000";
    g.fillRect(0, 0, W, H);
    const rnd = mulberry32(2024);
    // elongated foam streaks, drawn wrapped on u so the tile is seamless
    for (let k = 0; k < 90; k++) {
      const x = rnd() * W;
      const y = 8 + rnd() * (H - 16);
      const len = 24 + rnd() * 70;
      const th = 1.5 + rnd() * 3.5;
      const a = 0.1 + rnd() * 0.24;
      for (const ox of [-W, 0, W]) {
        const grad = g.createLinearGradient(x + ox, 0, x + ox + len, 0);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.35, `rgba(255,255,255,${a})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        g.fillStyle = grad;
        g.fillRect(x + ox, y - th / 2, len, th);
      }
    }
    // soft edges across the strip (v) so the mesh sides never show a hard line
    for (const [y0, y1] of [
      [0, 14],
      [H, H - 14],
    ]) {
      const grad = g.createLinearGradient(0, y0, 0, y1);
      grad.addColorStop(0, "rgba(0,0,0,1)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = grad;
      g.fillRect(0, Math.min(y0, y1), W, 14);
    }
    const t = toTexture(c, false);
    t.wrapS = THREE.RepeatWrapping;
    return [t];
  })[0] as THREE.CanvasTexture;
}

/* ─── soft shadow blob under the hull ─── */

export function getAOBlobTexture(): THREE.CanvasTexture {
  return remember("ao-blob", () => {
    const S = 128;
    const [c, g] = makeCanvas(S, S);
    const grad = g.createRadialGradient(S / 2, S / 2, 4, S / 2, S / 2, S / 2);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.7, "rgba(255,255,255,0.45)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, S, S);
    return [toTexture(c, false)];
  })[0] as THREE.CanvasTexture;
}
