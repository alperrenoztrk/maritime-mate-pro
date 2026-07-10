import * as THREE from "three";
import type { ShipType } from "./ShipModel3D";
import { KEEL_Y, WL_Y, DECK_Y, texU, texV } from "./hullGeometry";

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

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(s: string): number {
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

/* ─── hull ─── */

const HULL_W = 1024;
const HULL_H = 512;
/** 1 m of real draft in hull-local units (design draft 6.5 m = keel→WL). */
const METERS_TO_UNITS = (WL_Y - KEEL_Y) / 6.5;

const uPix = (u: number) => u * HULL_W;
const vPix = (v: number) => (1 - v) * HULL_H;

export function getHullTextures(type: ShipType): PBRSet {
  const [map, bumpMap, roughnessMap] = remember(`hull:${type}`, () => {
    const paint = hullPaints[type];
    const rnd = mulberry32(hashSeed(`hull-${type}`));

    const [mc, m] = makeCanvas(HULL_W, HULL_H);
    const [bc, b] = makeCanvas(HULL_W, HULL_H);
    const [rc, r] = makeCanvas(HULL_W, HULL_H);

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

    // 4 — draft marks (height-honest: 1 m = METERS_TO_UNITS, design draft 6.5 m at WL)
    const markInk = paint.light ? "#1c2733" : "#f2f5f8";
    m.fillStyle = markInk;
    m.textAlign = "left";
    m.font = "700 13px Arial, sans-serif";
    const drawDraftColumn = (x: number) => {
      for (let meters = 2; meters <= 12; meters += 2) {
        const y = vPix(texV(KEEL_Y + meters * METERS_TO_UNITS));
        if (y < yDeck + 8) continue; // never above deck edge
        m.fillText(`${meters}M`, x, y + 4);
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
    m.fillText("L", px0 - 24, py0 + 3);
    m.fillText("R", px0 + 25, py0 + 3);
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
      m.fillText(label, combX + side * 22, py0 + dy + 3);
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
    m.fillText(paint.name, uPix(texU(2.2)), vPix(texV(0.3)));
    m.font = "700 15px Arial, sans-serif";
    m.fillText(paint.name, uPix(texU(-3.28)), vPix(texV(0.26)));
    m.font = "600 11px Arial, sans-serif";
    m.fillText(paint.port, uPix(texU(-3.28)), vPix(texV(0.14)));

    return [toTexture(mc, true), toTexture(bc, false), toTexture(rc, false)];
  });
  return { map, bumpMap, roughnessMap } as PBRSet;
}

/* ─── deck ─── */

export function getDeckTextures(type: ShipType): PBRSet {
  const [map, bumpMap, roughnessMap] = remember(`deck:${type}`, () => {
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

    const map = toTexture(mc, true);
    map.wrapS = THREE.RepeatWrapping;
    map.repeat.x = 3;
    const bumpMap = toTexture(bc, false);
    bumpMap.wrapS = THREE.RepeatWrapping;
    bumpMap.repeat.x = 3;
    const roughnessMap = toTexture(rc, false);
    roughnessMap.wrapS = THREE.RepeatWrapping;
    roughnessMap.repeat.x = 3;
    return [map, bumpMap, roughnessMap];
  });
  return { map, bumpMap, roughnessMap } as PBRSet;
}

/* ─── containers ─── */

export function getContainerTextures(): PBRSet {
  const [map, bumpMap, roughnessMap] = remember("container-box", () => {
    const S = 256;
    const [mc, m] = makeCanvas(S, S);
    const [bc, b] = makeCanvas(S, S);
    const [rc, r] = makeCanvas(S, S);

    // near-white base so instanceColor tinting works (map × instanceColor)
    m.fillStyle = "#ececec";
    m.fillRect(0, 0, S, S);
    b.fillStyle = "#808080";
    b.fillRect(0, 0, S, S);
    r.fillStyle = "#9c9c9c";
    r.fillRect(0, 0, S, S);

    // corrugation
    for (let x = 0; x < S; x += 10) {
      m.fillStyle = "rgba(0,0,0,0.10)";
      m.fillRect(x, 0, 4, S);
      b.fillStyle = "#6a6a6a";
      b.fillRect(x, 0, 4, S);
      b.fillStyle = "#969696";
      b.fillRect(x + 4, 0, 3, S);
    }
    // door lock rods + hinges on the right half
    m.strokeStyle = "rgba(20,20,20,0.5)";
    m.lineWidth = 2;
    [168, 190, 214, 236].forEach((x) => {
      m.beginPath(); m.moveTo(x, 8); m.lineTo(x, S - 8); m.stroke();
      m.fillStyle = "rgba(20,20,20,0.55)";
      m.fillRect(x - 4, 30, 8, 10);
      m.fillRect(x - 4, S - 44, 8, 10);
    });
    // frame edges
    m.strokeStyle = "rgba(0,0,0,0.35)";
    m.lineWidth = 6;
    m.strokeRect(3, 3, S - 6, S - 6);
    // weathering
    const rnd = mulberry32(7);
    for (let k = 0; k < 14; k++) {
      const gx = rnd() * S;
      m.fillStyle = `rgba(110,70,40,${0.05 + rnd() * 0.1})`;
      m.fillRect(gx, rnd() * S * 0.5, 2 + rnd() * 3, 20 + rnd() * 40);
    }

    return [toTexture(mc, true), toTexture(bc, false), toTexture(rc, false)];
  });
  return { map, bumpMap, roughnessMap } as PBRSet;
}

/* ─── superstructure window strips ─── */

export interface WindowStrip {
  map: THREE.CanvasTexture;
  emissiveMap: THREE.CanvasTexture;
}

export function getWindowStrip(wallColor: string, kind: "bridge" | "accom" | "pax"): WindowStrip {
  const [map, emissiveMap] = remember(`win:${kind}:${wallColor}`, () => {
    const W = 512;
    const H = 64;
    const [mc, m] = makeCanvas(W, H);
    const [ec, e] = makeCanvas(W, H);

    m.fillStyle = wallColor;
    m.fillRect(0, 0, W, H);
    e.fillStyle = "#000000";
    e.fillRect(0, 0, W, H);

    const rnd = mulberry32(hashSeed(`win-${kind}`));
    const winW = kind === "bridge" ? 40 : 24;
    const gap = kind === "bridge" ? 8 : 12;
    const winH = kind === "bridge" ? 40 : 30;
    const y0 = (H - winH) / 2;
    for (let x = 10; x + winW < W - 6; x += winW + gap) {
      const g = m.createLinearGradient(0, y0, 0, y0 + winH);
      g.addColorStop(0, "#33465e");
      g.addColorStop(0.5, "#1a2635");
      g.addColorStop(1, "#243a52");
      m.fillStyle = g;
      m.beginPath();
      m.roundRect(x, y0, winW, winH, 3);
      m.fill();
      m.strokeStyle = "rgba(0,0,0,0.4)";
      m.lineWidth = 1.5;
      m.stroke();
      if (rnd() < (kind === "bridge" ? 0.65 : 0.3)) {
        e.fillStyle = "#ffd9a0";
        e.beginPath();
        e.roundRect(x + 2, y0 + 2, winW - 4, winH - 4, 2);
        e.fill();
      }
      // grime under each window
      m.fillStyle = "rgba(60,60,64,0.18)";
      m.fillRect(x + 2, y0 + winH + 2, winW - 4, 6);
    }

    const mt = toTexture(mc, true);
    mt.wrapS = THREE.RepeatWrapping;
    const et = toTexture(ec, true);
    et.wrapS = THREE.RepeatWrapping;
    return [mt, et];
  });
  return { map, emissiveMap } as WindowStrip;
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
