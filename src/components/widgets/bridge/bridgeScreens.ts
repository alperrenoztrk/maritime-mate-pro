import { hashSeed, mulberry32 } from "@/components/stability/sim/proceduralTextures";
import { compassName, douglasLabel } from "./marineConditions";
import { fmt, RPM_AT_SERVICE, type BridgeTelemetry } from "./bridgeTelemetry";

/**
 * Köprüüstü cihazlarının ekranları — hepsi tuvale, çalışma anında çiziliyor.
 *
 * Paketlenmiş görsel yok: sahnenin geri kalanıyla aynı çevrimdışı sözleşmesi
 * geçerli (bkz. bridgeTextures.ts). Buradaki fark, bu tuvallerin CANLI olması
 * — her çizim BridgeTelemetry'nin o andaki hâlini okuyor, dolayısıyla radar
 * dönüyor, ECDIS'teki gemi rotada ilerliyor, iskandil izi kayıyor.
 *
 * Her çizim işlevi (g, W, H, t) alıyor ve tuvali baştan boyuyor; durum
 * tutmuyorlar. Tazeleme sıklığını LiveScreen belirliyor: radar 12/sn,
 * telsizler 0.5/sn — hepsini 60/sn çizmenin ne anlamı ne de bütçesi var.
 */

const UI = {
  bg: "#05090f",
  panel: "#0a141d",
  edge: "rgba(126,196,235,.26)",
  text: "#d5e9f6",
  dim: "rgba(190,216,232,.58)",
  faint: "rgba(190,216,232,.3)",
  accent: "#4fd1ff",
  green: "#3ce08a",
  amber: "#ffb020",
  red: "#ff5a5a",
  mono: "'Courier New', ui-monospace, monospace",
  sans: "Helvetica, Arial, sans-serif",
};

export type ScreenDraw = (
  g: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: BridgeTelemetry,
) => void;

/* ─── ortak parçalar ─── */

interface TextOpts {
  size?: number;
  color?: string;
  font?: string;
  align?: CanvasTextAlign;
  bold?: boolean;
  baseline?: CanvasTextBaseline;
}

function say(g: CanvasRenderingContext2D, s: string, x: number, y: number, o: TextOpts = {}) {
  g.font = `${o.bold ? "bold " : ""}${o.size ?? 16}px ${o.font ?? UI.mono}`;
  g.fillStyle = o.color ?? UI.text;
  g.textAlign = o.align ?? "left";
  g.textBaseline = o.baseline ?? "alphabetic";
  g.fillText(s, x, y);
  g.textAlign = "left";
  g.textBaseline = "alphabetic";
}

/** Cihaz gövdesi: koyu zemin, üstte adı ve durumu olan bir şerit. */
function chassis(
  g: CanvasRenderingContext2D,
  w: number,
  h: number,
  title: string,
  right?: string,
  rightColor = UI.green,
): number {
  g.fillStyle = UI.bg;
  g.fillRect(0, 0, w, h);
  const bar = Math.max(22, h * 0.11);
  g.fillStyle = "rgba(16,32,46,.95)";
  g.fillRect(0, 0, w, bar);
  g.strokeStyle = UI.edge;
  g.lineWidth = 1;
  g.beginPath();
  g.moveTo(0, bar + 0.5);
  g.lineTo(w, bar + 0.5);
  g.stroke();
  say(g, title, w * 0.025, bar * 0.72, { size: bar * 0.62, bold: true, color: UI.accent });
  if (right) {
    say(g, right, w * 0.975, bar * 0.72, { size: bar * 0.58, color: rightColor, align: "right" });
  }
  return bar;
}

/** Etiket + büyük okuma — conning ve otopilot bunlarla kuruluyor. */
function readout(
  g: CanvasRenderingContext2D,
  label: string,
  value: string,
  x: number,
  y: number,
  size: number,
  color = UI.text,
  unit?: string,
) {
  say(g, label, x, y, { size: size * 0.38, color: UI.dim, font: UI.sans });
  say(g, value, x, y + size * 1.02, { size, color, bold: true });
  if (unit) {
    g.font = `bold ${size}px ${UI.mono}`;
    const width = g.measureText(value).width;
    say(g, unit, x + width + size * 0.14, y + size * 1.02, { size: size * 0.4, color: UI.dim, font: UI.sans });
  }
}

function box(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill = UI.panel) {
  g.fillStyle = fill;
  g.fillRect(x, y, w, h);
  g.strokeStyle = UI.edge;
  g.lineWidth = 1;
  g.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
}

/* ─── radar / ARPA ─── */

/**
 * Radar/ARPA — klasik gemi radarı sunumu.
 *
 * Görünüm gerçek bir köprüüstü radarından alındı: siyah zemin, mavi PPI
 * diski, sarı kara yankıları, çevresinde yeşil çerçeveli kutular ve sağda
 * seçili hedefin ARPA çözümü. Fotoğraf DOKU OLARAK GÖMÜLMEDİ — sahnenin
 * çevrimdışı sözleşmesi gereği (bkz. bridgeTextures.ts) her yüzey çalışma
 * anında tuvale çiziliyor; burada da taklit edilen düzenin kendisi, sayılar
 * ise seferin canlı verisi.
 *
 * Tarama 24 devir/dakika. Hedefler BridgeTelemetry'den geliyor, yani ECDIS'in
 * AIS listesiyle aynı gemiler; CPA/TCPA bağıl hareket üçgeninden çıkıyor,
 * BCR/BCT ise hedefin pruvamızı kestiği an ve mesafe.
 */

/** Radarın kendi renk takımı — köprüüstünün geri kalanından bağımsız. */
const RAD = {
  bg: "#000000",
  sea: "#1616cf",
  land: "#e6e600",
  echo: "#f2f24a",
  ring: "rgba(255,255,255,.55)",
  scale: "#c9d4dd",
  green: "#25e05a",
  greenDim: "rgba(37,224,90,.55)",
  red: "#ff3b30",
  mono: "'Courier New', ui-monospace, monospace",
};

/** Yeşil çerçeveli kutu — radarın bütün düğmeleri ve okumaları bunlar. */
function radarCell(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  text: string,
  size: number,
  opts: { color?: string; align?: CanvasTextAlign; border?: boolean; fill?: string; bold?: boolean } = {},
) {
  if (opts.fill) {
    g.fillStyle = opts.fill;
    g.fillRect(x, y, w, h);
  }
  if (opts.border !== false) {
    g.strokeStyle = opts.color ?? RAD.green;
    g.lineWidth = 1.2;
    g.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  }
  const align = opts.align ?? "center";
  const tx = align === "left" ? x + w * 0.08 : align === "right" ? x + w * 0.92 : x + w / 2;
  say(g, text, tx, y + h / 2 + size * 0.36, {
    size,
    color: opts.color ?? RAD.green,
    font: RAD.mono,
    align,
    bold: opts.bold ?? true,
  });
}

/**
 * Kara yankısı: limana yaklaşırken PPI'nin kenarlarına giren sarı kütleler.
 *
 * Rota kimliğinden tohumlanıyor, yani aynı seferde hep aynı kıyı çizgisi
 * görünüyor; gemi ilerledikçe kütleler merkeze doğru büyüyor.
 */
function radarLandEcho(
  g: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  R: number,
  shore: number,
  seed: number,
  ahead: boolean,
) {
  if (shore <= 0.02) return;
  const rnd = mulberry32(seed);
  g.fillStyle = RAD.land;
  // İki kıyı kütlesi: baş tarafın iki omzunda, kanal ağzı gibi.
  for (const side of [-1, 1] as const) {
    const base = (ahead ? 0 : Math.PI) + side * (0.55 + rnd() * 0.25);
    const spread = 0.5 + rnd() * 0.35;
    g.beginPath();
    for (let i = 0; i <= 26; i++) {
      const u = i / 26;
      const a = base + (u - 0.5) * spread * 2;
      const wobble = 0.72 + Math.sin(u * 9 + seed) * 0.11 + Math.sin(u * 21 + side) * 0.06;
      const r = R * wobble * (1 - shore * 0.34);
      const x = cx + Math.sin(a) * r;
      const y = cy - Math.cos(a) * r;
      if (i === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    }
    // Dış kenardan kapat: kara PPI'nin kenarına kadar uzanır.
    for (let i = 26; i >= 0; i--) {
      const u = i / 26;
      const a = base + (u - 0.5) * spread * 2;
      g.lineTo(cx + Math.sin(a) * R, cy - Math.cos(a) * R);
    }
    g.closePath();
    g.fill();
  }
}

export const drawRadar: ScreenDraw = (g, w, h, t) => {
  g.fillStyle = RAD.bg;
  g.fillRect(0, 0, w, h);

  // PPI merkezden biraz iskelede: sağ sütun bilgi yoğun, sol sütun düğme.
  // Yarıçap 0.42h — köşeler yeşil kutulara kalsın, daire onlara değmesin.
  const cx = w * 0.40;
  const cy = h * 0.5;
  const R = h * 0.42;
  const rangeNm = 6;
  const rings = 4;
  const u = h * 0.026; // ölçü birimi: bütün yazılar ve kutular buna oranlı

  /* — PPI diski — */
  g.fillStyle = RAD.sea;
  g.beginPath();
  g.arc(cx, cy, R, 0, Math.PI * 2);
  g.fill();

  const shore = Math.max(0, 1 - Math.min(t.voyage.progress, 1 - t.voyage.progress) / 0.1);
  radarLandEcho(g, cx, cy, R, shore, hashSeed(t.voyage.route.id), t.voyage.progress > 0.5);

  // Mesafe halkaları
  g.strokeStyle = RAD.ring;
  g.lineWidth = 1.1;
  for (let i = 1; i <= rings; i++) {
    g.beginPath();
    g.arc(cx, cy, (R / rings) * i, 0, Math.PI * 2);
    g.stroke();
  }

  // Pusula taksimatı ve rakamlar — diskin dışında, gerçek kuzeye göre.
  // Sunum rota yukarı (C UP) olduğu için kuzey rota kadar geri döner.
  const upDeg = t.voyage.cogDeg;
  for (let a = 0; a < 360; a += 5) {
    const rel = ((a - upDeg) * Math.PI) / 180;
    const major = a % 10 === 0;
    const tick = major ? R * 0.045 : R * 0.022;
    g.strokeStyle = RAD.scale;
    g.lineWidth = major ? 1.4 : 1;
    g.beginPath();
    g.moveTo(cx + Math.sin(rel) * R, cy - Math.cos(rel) * R);
    g.lineTo(cx + Math.sin(rel) * (R + tick), cy - Math.cos(rel) * (R + tick));
    g.stroke();
    if (a % 10 === 0) {
      say(g, String(a).padStart(3, "0"), cx + Math.sin(rel) * (R + u * 2.6), cy - Math.cos(rel) * (R + u * 2.6) + u * 0.3, {
        size: u * 0.72,
        color: RAD.scale,
        font: RAD.mono,
        align: "center",
      });
    }
  }

  /* — hedefler — */
  let selected = t.traffic[0];
  for (const target of t.traffic) {
    if (target.rangeNm > rangeNm) continue;
    if (!selected || target.cpaNm < selected.cpaNm) selected = target;
  }

  for (const target of t.traffic) {
    if (target.rangeNm > rangeNm) continue;
    const a = (target.relBearingDeg * Math.PI) / 180;
    const r = (target.rangeNm / rangeNm) * R;
    const x = cx + Math.sin(a) * r;
    const y = cy - Math.cos(a) * r;
    const isSelected = target === selected;

    // Ham eko: radar yankısı önce sarı bir leke.
    g.fillStyle = RAD.echo;
    g.beginPath();
    g.ellipse(x, y, R * 0.014, R * 0.009, a, 0, Math.PI * 2);
    g.fill();

    // ARPA üçgeni ve gerçek hareket vektörü (3 dakikalık yol).
    const color = isSelected ? RAD.red : "#ffffff";
    g.strokeStyle = color;
    g.lineWidth = 1.6;
    const s = R * 0.022;
    g.beginPath();
    g.moveTo(x, y - s);
    g.lineTo(x + s * 0.9, y + s * 0.7);
    g.lineTo(x - s * 0.9, y + s * 0.7);
    g.closePath();
    g.stroke();

    const c = ((target.courseDeg - upDeg) * Math.PI) / 180;
    const vScale = ((3 / 60) / rangeNm) * R; // 3 dakika
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + Math.sin(c) * target.speedKt * vScale, y - Math.cos(c) * target.speedKt * vScale);
    g.stroke();

    if (isSelected) {
      say(g, "1", x + s * 1.4, y + s * 1.6, { size: u * 0.8, color: RAD.red, font: RAD.mono, bold: true });
    }
  }

  /* — tarama süpürgesi, baş hattı ve kendi gemimiz — */
  const sweep = ((t.nowMs % 2500) / 2500) * Math.PI * 2;
  if (g.createConicGradient) {
    const cone = g.createConicGradient(sweep - Math.PI / 2, cx, cy);
    cone.addColorStop(0, "rgba(255,255,255,.20)");
    cone.addColorStop(0.1, "rgba(255,255,255,0)");
    cone.addColorStop(1, "rgba(255,255,255,0)");
    g.save();
    g.beginPath();
    g.arc(cx, cy, R, 0, Math.PI * 2);
    g.clip();
    g.fillStyle = cone;
    g.fillRect(cx - R, cy - R, R * 2, R * 2);
    g.restore();
  }
  g.strokeStyle = "#ffffff";
  g.lineWidth = 1.6;
  g.beginPath();
  g.moveTo(cx, cy);
  g.lineTo(cx, cy - R);
  g.stroke();
  g.fillStyle = "#ffffff";
  g.beginPath();
  g.arc(cx, cy, R * 0.012, 0, Math.PI * 2);
  g.fill();

  /* — sol sütun — */
  const lx = w * 0.012;
  const lw = w * 0.115;
  radarCell(g, lx + lw * 0.15, h * 0.012, lw * 0.85, u * 1.5, "RANGE", u * 0.85, { border: false });
  radarCell(g, lx + lw * 0.15, h * 0.012 + u * 1.5, lw * 0.85, u * 2.1, `${rangeNm} NM`, u * 1.35);
  radarCell(g, lx + lw, h * 0.012, lw * 0.28, u * 1.7, "+", u * 1.2);
  radarCell(g, lx + lw, h * 0.012 + u * 1.9, lw * 0.28, u * 1.7, "−", u * 1.2);
  radarCell(g, lx + lw * 0.15, h * 0.012 + u * 3.6, lw * 1.13, u * 1.5, `RR  ${(rangeNm / rings).toFixed(1)} NM`, u * 0.78);

  const btn = (y: number, text: string, color = RAD.green) =>
    radarCell(g, lx, y, lw * 0.95, u * 1.6, text, u * 0.82, { color });
  btn(h * 0.135, "TX  A (S)");
  btn(h * 0.2, "MASTER");
  btn(h * 0.265, "STBY");
  btn(h * 0.33, "SP");

  radarCell(g, lx, h * 0.73, lw * 0.5, u * 1.5, "HL", u * 0.82);
  btn(h * 0.795, "ENH OFF");
  radarCell(g, lx, h * 0.855, lw * 0.72, u * 1.4, "GAIN", u * 0.75, { fill: "rgba(37,224,90,.14)" });
  radarCell(g, lx + lw * 0.78, h * 0.855, lw * 0.5, u * 2.9, "MAN", u * 0.8);
  radarCell(g, lx, h * 0.905, lw * 0.72, u * 1.4, "RAIN", u * 0.75);
  radarCell(g, lx, h * 0.945, lw * 0.72, u * 1.4, "SEA", u * 0.75);

  /* — sağ sütun — */
  const rx = w * 0.70;
  const rw = w * 0.29;
  const col = rw / 3;
  radarCell(g, rx, h * 0.012, col * 0.9, u * 1.7, "RM(R)", u * 0.85);
  radarCell(g, rx + col * 1.0, h * 0.012, col * 0.75, u * 1.7, "HDG", u * 0.85);
  radarCell(g, rx + col * 1.8, h * 0.012, col * 1.2, u * 1.7, fmt.deg(t.voyage.cogDeg, 1), u * 1.0);
  radarCell(g, rx, h * 0.012 + u * 1.9, col * 0.9, u * 1.7, "C UP", u * 0.85);
  radarCell(g, rx + col * 1.0, h * 0.012 + u * 1.9, col * 0.75, u * 1.7, "STW", u * 0.85);
  radarCell(g, rx + col * 1.8, h * 0.012 + u * 1.9, col * 0.75, u * 1.7, t.voyage.sogKt.toFixed(1), u * 1.0);
  radarCell(g, rx + col * 2.6, h * 0.012 + u * 1.9, col * 0.4, u * 1.7, "KT", u * 0.7);
  radarCell(g, rx + col * 2.6, h * 0.012, col * 0.4, u * 1.7, "LOG W", u * 0.6);

  let ry = h * 0.012 + u * 4.1;
  radarCell(g, rx, ry, rw * 0.62, u * 1.6, "T VECTORS", u * 0.82, { color: RAD.red, fill: "#000" });
  radarCell(g, rx + rw * 0.62, ry, rw * 0.38, u * 1.6, "3.0 MIN", u * 0.82, { color: RAD.red });
  ry += u * 1.7;
  radarCell(g, rx, ry, rw * 0.62, u * 1.5, "TRAILS", u * 0.78);
  radarCell(g, rx + rw * 0.62, ry, rw * 0.38, u * 1.5, "OFF", u * 0.78);

  ry += u * 2.0;
  const ebl = [
    ["ERBL 1", `${fmt.deg(t.voyage.bearingToWptDeg, 1)} T`, true],
    ["VRM 1 OFF", `${(rangeNm / 2).toFixed(2)} NM`, false],
    ["EBL 2", "OFF", false],
    ["VRM 2", "OFF", false],
  ] as const;
  ebl.forEach(([label, value, active], i) => {
    const yy = ry + i * u * 1.5;
    radarCell(g, rx, yy, rw * 0.55, u * 1.45, label, u * 0.75);
    radarCell(g, rx + rw * 0.55, yy, rw * 0.45, u * 1.45, value, u * 0.75, {
      color: active ? "#000000" : RAD.green,
      fill: active ? "#ffffff" : undefined,
    });
  });

  ry += u * 6.6;
  const danger = selected && selected.cpaNm < 0.5 && selected.tcpaMin > 0 && selected.tcpaMin < 30;
  radarCell(g, rx, ry, rw, u * 1.8, "CPA-TCPA  1", u * 0.95, {
    color: danger ? RAD.red : RAD.greenDim,
    fill: danger && Math.floor(t.nowMs / 600) % 2 === 0 ? "rgba(255,59,48,.18)" : undefined,
  });

  /* — seçili hedefin ARPA çözümü — */
  ry += u * 2.2;
  const boxH = u * 11.4;
  g.strokeStyle = RAD.green;
  g.lineWidth = 1.2;
  g.strokeRect(rx + 0.5, ry + 0.5, rw - 1, boxH - 1);
  say(g, "TARGET (1)", rx + rw / 2, ry + u * 1.5, {
    size: u * 0.95,
    color: RAD.green,
    font: RAD.mono,
    align: "center",
    bold: true,
  });

  const trueBrg = ((selected?.relBearingDeg ?? 0) + t.voyage.cogDeg) % 360;
  // Pruva kesme: hedefin bizim rota hattımızı kestiği an ve o andaki mesafe.
  const bow = bowCrossing(selected, t.voyage.cogDeg, t.voyage.sogKt);
  const rows: Array<[string, string, string]> = [
    ["RANGE", (selected?.rangeNm ?? 0).toFixed(1), "NM"],
    ["T BRG", trueBrg.toFixed(1), "°"],
    ["CPA", (selected?.cpaNm ?? 0).toFixed(1), "NM"],
    ["TCPA", (selected?.tcpaMin ?? 0).toFixed(1), "MIN"],
    ["CSE", fmt.deg(selected?.courseDeg ?? 0, 1).replace("°", ""), "°"],
    ["STW", (selected?.speedKt ?? 0).toFixed(1), "KT"],
    ["BCR", bow.rangeNm.toFixed(1), "NM"],
    ["BCT", bow.minutes.toFixed(1), "MIN"],
  ];
  rows.forEach(([label, value, unit], i) => {
    const yy = ry + u * 2.9 + i * u * 1.05;
    say(g, label, rx + rw * 0.06, yy, { size: u * 0.82, color: RAD.green, font: RAD.mono, bold: true });
    say(g, value, rx + rw * 0.68, yy, { size: u * 0.82, color: RAD.green, font: RAD.mono, align: "right", bold: true });
    say(g, unit, rx + rw * 0.74, yy, { size: u * 0.82, color: RAD.green, font: RAD.mono, bold: true });
  });

  /* — rüzgâr ve derinlik — */
  ry += boxH + u * 0.6;
  const windH = u * 4.4;
  g.strokeRect(rx + 0.5, ry + 0.5, rw - 1, windH - 1);
  say(g, "WIND AND DEPTH", rx + rw / 2, ry + u * 1.35, {
    size: u * 0.85,
    color: RAD.green,
    font: RAD.mono,
    align: "center",
    bold: true,
  });
  const wind: Array<[string, string, string]> = [
    ["REL WIND", t.apparentWindKt.toFixed(1), "KT"],
    ["", fmt.deg(t.apparentWindDeg, 1).replace("°", ""), "°R"],
    ["DEPTH", t.depthM.toFixed(1), "M"],
  ];
  wind.forEach(([label, value, unit], i) => {
    const yy = ry + u * 2.5 + i * u * 0.95;
    if (label) say(g, label, rx + rw * 0.06, yy, { size: u * 0.78, color: RAD.green, font: RAD.mono, bold: true });
    say(g, value, rx + rw * 0.72, yy, { size: u * 0.78, color: RAD.green, font: RAD.mono, align: "right", bold: true });
    say(g, unit, rx + rw * 0.78, yy, { size: u * 0.78, color: RAD.green, font: RAD.mono, bold: true });
  });

  /* — düğme ızgarası ve saat — */
  ry += windH + u * 0.8;
  const grid = ["AZ", "PI", "TOOLS", "ARPA", "SYSTEM", "NAV", "TRIAL", "MAPS", "BRILL"];
  grid.forEach((text, i) => {
    const gx = rx + (i % 3) * (rw / 3);
    const gy = ry + Math.floor(i / 3) * u * 1.7;
    radarCell(g, gx + 1, gy, rw / 3 - 2, u * 1.55, text, u * 0.78);
  });

  radarCell(g, cx + R * 0.55, h - u * 4.6, w * 0.09, u * 1.6, "CENTRE", u * 0.78);
  say(
    g,
    `${fmt.hhmm(t.voyage.shipTime)}:${String(t.voyage.shipTime.getUTCSeconds()).padStart(2, "0")}  ${String(
      t.voyage.shipTime.getUTCDate(),
    ).padStart(2, "0")}/${String(t.voyage.shipTime.getUTCMonth() + 1).padStart(2, "0")}/${t.voyage.shipTime.getUTCFullYear()}`,
    w * 0.99,
    h - u * 0.9,
    { size: u * 0.85, color: RAD.green, font: RAD.mono, align: "right", bold: true },
  );
};

/**
 * Pruva kesme (bow crossing): hedef rota hattımızı ne zaman, ne mesafede
 * kesiyor. ARPA'nın BCR/BCT satırları bu.
 */
function bowCrossing(
  target: BridgeTelemetry["traffic"][number] | undefined,
  headingDeg: number,
  sogKt: number,
): { rangeNm: number; minutes: number } {
  if (!target) return { rangeNm: 0, minutes: 0 };
  const b = (target.relBearingDeg * Math.PI) / 180;
  const px = Math.sin(b) * target.rangeNm;
  const py = Math.cos(b) * target.rangeNm;
  const c = ((target.courseDeg - headingDeg) * Math.PI) / 180;
  const vx = Math.sin(c) * target.speedKt;
  if (Math.abs(vx) < 1e-4) return { rangeNm: 0, minutes: 0 };
  // Hedefin enine hızıyla merkez hattına gelme süresi.
  const hours = -px / vx;
  if (hours < 0) return { rangeNm: 0, minutes: 0 };
  const vy = Math.cos(c) * target.speedKt;
  return { rangeNm: py + vy * hours - sogKt * hours, minutes: hours * 60 };
}

/* ─── ECDIS ─── */

/**
 * ECDIS — S-52 gündüz renkleriyle elektronik seyir haritası.
 *
 * Üstte menü şeridi, solda harita, sağda GPS/mevki paneli: düzen gerçek bir
 * ECDIS'ten alındı. Renkler de standardın kendisi — derin su beyaz, sığlaştıkça
 * maviye, kara açık kahverengi, planlanan rota macenta.
 *
 * Harita uydurma bir resim değil: voyage.ts'teki dönüş mevkileri enlem/boylam
 * olarak alınıp gemi merkezli bir Merkatör penceresine düşürülüyor, derinlik
 * alanları da rota altındaki iskandilden. Gemi ilerledikçe harita altından
 * kayıyor, geçilen dönüş mevkileri arkada kalıyor, limana yaklaşınca kara
 * pencereye giriyor.
 */

/** S-52 gündüz renk takımı. */
const S52 = {
  depdw: "#ffffff",
  depmd: "#d9edf7",
  depms: "#b5dcef",
  depvs: "#8fc9e8",
  land: "#e5d9a8",
  landf: "#b9d69a",
  chgrd: "#8a9aa6",
  chblk: "#1a1a1a",
  magenta: "#c000c0",
  route: "#d2006e",
  ownship: "#0d0d0d",
  panel: "#e9eef1",
  panelLine: "#9fb0bb",
  bar: "#dcd7c3",
  barActive: "#f0a830",
  text: "#16242e",
};

const ECDIS_TABS = ["Chart", "Route", "Nav data", "AIS", "ARPA", "Radar", "Alarms", "Settings"];

/**
 * Kutuya sığan yazı boyu.
 *
 * Sekme adları sabit puntoyla yazıldığında kutularının dışına taşıyordu
 * ("Large scale" 70 piksellik kutuda 85 piksel yer kaplıyor, komşusunun üstüne
 * biniyordu). Ölçüp küçültmek, adı kısaltmaktan iyi: cihazda ne yazıyorsa o
 * kalıyor.
 */
function fitSize(g: CanvasRenderingContext2D, s: string, maxW: number, size: number, font: string, bold = false): number {
  g.font = `${bold ? "bold " : ""}${size}px ${font}`;
  const w = g.measureText(s).width;
  return w <= maxW ? size : Math.max(size * 0.62, (size * maxW) / w);
}

export const drawEcdis: ScreenDraw = (g, w, h, t) => {
  /* — menü şeridi — */
  const barH = h * 0.058;
  g.fillStyle = S52.bar;
  g.fillRect(0, 0, w, barH);
  g.strokeStyle = "#b4ae98";
  g.lineWidth = 1;
  g.beginPath();
  g.moveTo(0, barH - 0.5);
  g.lineTo(w, barH - 0.5);
  g.stroke();

  // Sekmeler soldan, uyarı kutusu sağdan: aradaki boşluk ölçek yazısının.
  const tabW = (w * 0.52) / ECDIS_TABS.length;
  ECDIS_TABS.forEach((label, i) => {
    const x = w * 0.005 + i * tabW;
    // İlk sekme seçili — gerçek cihazda da etkin görünüm vurgulu durur.
    g.fillStyle = i === 0 ? "#ffffff" : "#efeade";
    g.fillRect(x, barH * 0.14, tabW - 2, barH * 0.72);
    g.strokeStyle = i === 0 ? "#6d7c86" : "#a9a390";
    g.strokeRect(x + 0.5, barH * 0.14 + 0.5, tabW - 3, barH * 0.72 - 1);
    say(g, label, x + (tabW - 2) / 2, barH * 0.66, {
      size: fitSize(g, label, tabW - 10, barH * 0.42, UI.sans),
      color: S52.text,
      font: UI.sans,
      align: "center",
    });
  });
  // Uyarı kutusu sağ uçta: gerçek cihazda da turuncu yanar.
  const warnW = w * 0.085;
  const warnX = w - warnW - w * 0.005;
  g.fillStyle = S52.barActive;
  g.fillRect(warnX, barH * 0.14, warnW, barH * 0.72);
  say(g, "Warnings", warnX + warnW / 2, barH * 0.66, {
    size: fitSize(g, "Warnings", warnW - 10, barH * 0.42, UI.sans, true),
    color: "#2b1a00",
    font: UI.sans,
    align: "center",
    bold: true,
  });

  /**
   * Görüş alanı ve ölçek.
   *
   * Aralık seferin boyuyla değil, KIYIYA olan yakınlıkla seçiliyor: açık
   * denizde 24 mil, limana yaklaşırken 8 mil. Eskiden sefer uzunluğunun
   * oranıydı ve 700 millik bir seferde 90 mile çıkıyordu — o aralıkta AIS
   * hedefleri bastırılıyor, ECDIS radarla aynı gemileri göstermiyordu.
   * Gerçekte de seyir hâlindeki bir ECDIS 12–24 mil aralığında tutulur.
   */
  const shore = Math.max(0, 1 - Math.min(t.voyage.progress, 1 - t.voyage.progress) / 0.12);
  const spanNm = 24 - 16 * shore;
  /**
   * Harita ölçeği: gerçek mesafenin ekrandaki mesafeye oranı.
   *
   * Payda EKRANIN FİZİKSEL BOYU olmak zorunda; eskiden piksel sayısına
   * bölünüyordu ve 24 millik bir pencerede "1:8.000" yazıyordu — o ölçek bir
   * liman planının ölçeğidir, 24 mil oraya sığmaz. Cihaz 0.42 m yüksekliğinde
   * bir ECDIS monitörü; pencerenin kapladığı yükseklik onun %80'i.
   */
  const scale = Math.round((spanNm * 1852) / (0.8 * 0.42) / 1000) * 1000;
  say(g, `1:${scale.toLocaleString("tr-TR")}`, warnX - w * 0.012, barH * 0.66, {
    size: barH * 0.44,
    color: S52.text,
    font: UI.sans,
    align: "right",
    bold: true,
  });

  const mapY = barH;
  const side = w * 0.235;
  const mapW = w - side;
  const mapH = h - mapY;
  const cx = mapW * 0.5;
  const cy = mapY + mapH * 0.56;

  const pxPerNm = (mapH * 0.8) / spanNm;
  const latScale = pxPerNm * 60;
  const lonScale = latScale * Math.cos((t.voyage.lat * Math.PI) / 180);
  // Kuzey yukarı değil, ROTA yukarı: köprüüstünden bakışla aynı yön.
  const rot = (-t.voyage.cogDeg * Math.PI) / 180;
  const cos = Math.cos(rot);
  const sin = Math.sin(rot);
  const project = (lat: number, lon: number): [number, number] => {
    const dx = (lon - t.voyage.lon) * lonScale;
    const dy = -(lat - t.voyage.lat) * latScale;
    return [cx + dx * cos - dy * sin, cy + dx * sin + dy * cos];
  };
  const latSpanDeg = mapH / latScale;
  const lonSpanDeg = mapW / lonScale;

  g.save();
  g.beginPath();
  g.rect(0, mapY, mapW, mapH);
  g.clip();

  /* — derinlik alanları — */
  g.fillStyle = S52.depdw;
  g.fillRect(0, mapY, mapW, mapH);

  /**
   * Sığlıklar ROTANIN iki yanında.
   *
   * Ekran rota yukarı olduğu için bantlar doğrudan ekran uzayında, dikey
   * şeritler hâlinde çiziliyor — enlem/boylamda kurulup döndürülselerdi
   * meridyene paralel kalır, batıya giden gemide kıyı ekranı enine keserdi.
   * Kenar dalgalanması gemi ilerledikçe kayıyor: harita altından akıyor.
   *
   * BANTLAR, KONTURLAR VE İSKANDİL RAKAMLARI TEK MODELDEN ÇIKIYOR.
   * Eskiden bantlar ekran uzayında, konturlar ve rakamlar enlem/boylamda
   * üretiliyordu: kontur çizgileri derin suyun ortasından geçiyor, 370 m'lik
   * iskandil rakamları açık mavi sığlığın üstüne düşüyordu. Bir haritada
   * iskandil rakamı hangi derinlik alanının içindeyse onun derinliğini yazar;
   * kontur da o alanın sınırıdır. Aşağıdaki `edgeU`/`depthAtU` ikilisi üçünü
   * de aynı geometriye bağlıyor.
   */
  const seed = hashSeed(t.voyage.route.id);
  const scroll = t.voyage.runNm * 0.35;
  const edge = (i: number, side: number) =>
    Math.sin((i / 17) * 5.5 + scroll + seed * 0.001 + side) * 0.035 +
    Math.sin((i / 17) * 13 - scroll * 0.6 + side * 2) * 0.018;

  /** Kenardan dışarısını dolduran bant; `to` verilmezse ekranın dışına taşar. */
  const band = (from: number, fill: string, to = 1.25) => {
    g.fillStyle = fill;
    for (const dir of [-1, 1] as const) {
      g.beginPath();
      for (let i = 0; i <= 17; i++) {
        const y = mapY + (i / 17) * mapH;
        const x = cx + dir * (from + edge(i, dir)) * mapW * 0.5;
        if (i === 0) g.moveTo(x, y);
        else g.lineTo(x, y);
      }
      g.lineTo(cx + dir * to * mapW * 0.5, mapY + mapH);
      g.lineTo(cx + dir * to * mapW * 0.5, mapY);
      g.closePath();
      g.fill();
    }
  };

  /*
   * Derin suyun yarı genişliği: açık denizde neredeyse bütün ekran, limana
   * yaklaşırken daralan bir kanal. Eskiden açık denizde de 0.34'te kalıyordu,
   * yani ekranın üçte ikisi sığlıktı — Akdeniz'in ortasında iki yandan 18
   * metrelik şelf demek olurdu.
   */
  const n = 0.24 + (1 - shore) * 0.62;
  const hasShore = shore > 0.05;

  /**
   * Derinlik alanları: merkez hattından uzaklık (yarım ekran = 1) → renk ve
   * derinlik. `at`, alanın DIŞ sınırı; en sondaki ekranın dışında kalır, yani
   * sığlık kenara kadar sürer. Eskiden bantlar 0.54'te bitiyordu ve dışarısı
   * yeniden derin su (beyaz) kalıyordu: kıyı şeridi denizin ortasında asılı
   * duruyordu.
   */
  const deep = Math.max(55, t.depthM);
  const areas: Array<{ at: number; m: [number, number] | null; fill: string }> = hasShore
    ? [
        { at: n, m: [deep * 0.9, deep * 1.25], fill: S52.depdw },
        { at: n + 0.1, m: [20, 50], fill: S52.depmd },
        { at: n + 0.18, m: [10, 20], fill: S52.depms },
        { at: n + 0.26, m: [3, 10], fill: S52.depvs },
        { at: 9, m: null, fill: S52.land },
      ]
    : [
        { at: n, m: [deep * 0.9, deep * 1.25], fill: S52.depdw },
        { at: n + 0.1, m: [20, 50], fill: S52.depmd },
        { at: 9, m: [10, 20], fill: S52.depms },
      ];

  for (let i = 1; i < areas.length; i++) band(areas[i - 1].at, areas[i].fill);
  // Kıyı şeridinin yeşil kuşağı — kara kenarındaki bitki örtüsü.
  if (hasShore) band(n + 0.26, S52.landf, n + 0.285);

  /** Ekran y'sindeki dalgalanmayı bant çizimiyle aynı örnekleme ile veriyor. */
  const edgeAtY = (y: number, dir: number) => edge(((y - mapY) / mapH) * 17, dir);
  const depthAtXY = (x: number, y: number): [number, number] | null => {
    const dir = x < cx ? -1 : 1;
    const u = Math.abs(x - cx) / (mapW * 0.5) - edgeAtY(y, dir);
    for (const a of areas) if (u < a.at) return a.m;
    return null;
  };

  /* — derinlik konturları: alanların kendi sınırları — */
  g.lineWidth = 1;
  g.strokeStyle = S52.chgrd;
  for (let i = 1; i < areas.length; i++) {
    for (const dir of [-1, 1] as const) {
      g.beginPath();
      for (let k = 0; k <= 17; k++) {
        const y = mapY + (k / 17) * mapH;
        const x = cx + dir * (areas[i - 1].at + edge(k, dir)) * mapW * 0.5;
        if (k === 0) g.moveTo(x, y);
        else g.lineTo(x, y);
      }
      g.stroke();
    }
  }

  /* — iskandil rakamları: bulunduğu derinlik alanının derinliği — */
  const soundFs = Math.min(mapH * 0.034, mapW * 0.026);
  const rnd = mulberry32(seed);
  for (let i = 0; i < 54; i++) {
    // Ekran uzayında dağınık bir ızgara; kayması haritayla aynı hızda.
    const gx = ((i * 7) % 9) / 8;
    const gy = (Math.floor(i / 9) + ((rnd() * 0.8) % 1)) / 6;
    const x = (gx * 0.94 + 0.03) * mapW + (rnd() - 0.5) * mapW * 0.06;
    const y = mapY + (((gy + scroll * 0.02) % 1) * 0.96 + 0.02) * mapH;
    const jitter = rnd();
    const d = depthAtXY(x, y);
    if (d == null) continue; // karada iskandil olmaz
    // Kendi gemimizin ve alt şeridin üstüne rakam düşmesin.
    if (Math.abs(x - cx) < mapW * 0.06 && y > cy - mapH * 0.3 && y < cy + mapH * 0.06) continue;
    if (y > mapY + mapH * 0.93) continue;
    // Rakam, içinde bulunduğu alanın derinlik aralığından: 10 m konturunun
    // içindeki bir iskandil 20 m yazamaz, o zaten kontura yer değiştirtirdi.
    const value = d[0] + (d[1] - d[0]) * jitter;
    say(g, value < 30 ? value.toFixed(1) : String(Math.round(value)), x, y, {
      size: soundFs,
      color: "#31536b",
      font: UI.sans,
      align: "center",
    });
  }

  /* — enlem/boylam ızgarası — */
  g.strokeStyle = "rgba(80,110,130,.35)";
  g.setLineDash([3, 5]);
  g.lineWidth = 1;
  for (let i = -2; i <= 2; i++) {
    const lat = Math.round(t.voyage.lat * 4) / 4 + i * 0.25;
    g.beginPath();
    const [x0, y0] = project(lat, t.voyage.lon - lonSpanDeg);
    const [x1, y1] = project(lat, t.voyage.lon + lonSpanDeg);
    g.moveTo(x0, y0);
    g.lineTo(x1, y1);
    g.stroke();
    const lon = Math.round(t.voyage.lon * 4) / 4 + i * 0.25;
    g.beginPath();
    const [x2, y2] = project(t.voyage.lat - latSpanDeg, lon);
    const [x3, y3] = project(t.voyage.lat + latSpanDeg, lon);
    g.moveTo(x2, y2);
    g.lineTo(x3, y3);
    g.stroke();
  }
  g.setLineDash([]);

  /* — şamandıralar: kanalın iki yanında, harita ile birlikte kayıyor — */
  if (shore > 0.05) {
    for (let i = 0; i < 9; i++) {
      // Konumları alınan yola bağlı: gemi ilerledikçe şamandıralar geriye akar.
      const frac = ((i / 9 + ((scroll * 0.06) % 1)) % 1);
      const y = mapY + frac * mapH;
      for (const dir of [-1, 1] as const) {
        const x = cx + dir * (n + 0.05) * mapW * 0.5;
        g.fillStyle = dir < 0 ? "#c81e1e" : "#127a2e";
        g.beginPath();
        g.arc(x, y, mapH * 0.009, 0, Math.PI * 2);
        g.fill();
        g.strokeStyle = S52.magenta;
        g.lineWidth = 1;
        g.beginPath();
        g.arc(x, y, mapH * 0.019, 0, Math.PI * 2);
        g.stroke();
      }
    }
  }

  /* — planlanan rota — */
  const wpts = t.voyage.passage.waypoints;
  g.strokeStyle = S52.route;
  g.lineWidth = 2.4;
  g.setLineDash([10, 6]);
  g.beginPath();
  wpts.forEach((p, i) => {
    const [x, y] = project(p.lat, p.lon);
    if (i === 0) g.moveTo(x, y);
    else g.lineTo(x, y);
  });
  g.stroke();
  g.setLineDash([]);

  wpts.forEach((p, i) => {
    const [x, y] = project(p.lat, p.lon);
    const passed = i <= t.voyage.legIndex;
    g.strokeStyle = passed ? "rgba(210,0,110,.35)" : S52.route;
    g.lineWidth = 1.8;
    g.beginPath();
    g.arc(x, y, mapH * 0.02, 0, Math.PI * 2);
    g.stroke();
    if (!passed && i === t.voyage.legIndex + 1) {
      say(g, `WP${i}`, x + mapH * 0.032, y + mapH * 0.018, {
        size: mapH * 0.045,
        color: S52.route,
        font: UI.sans,
        bold: true,
      });
    }
  });

  /* — AIS hedefleri — */
  const aisVisible = spanNm <= 24;
  for (const target of aisVisible ? t.traffic : []) {
    if (target.rangeNm > spanNm * 0.55) continue;
    const b = ((target.relBearingDeg + t.voyage.cogDeg) * Math.PI) / 180;
    const lat = t.voyage.lat + (Math.cos(b) * target.rangeNm) / 60;
    const lon = t.voyage.lon + (Math.sin(b) * target.rangeNm) / 60 / Math.cos((t.voyage.lat * Math.PI) / 180);
    const [x, y] = project(lat, lon);
    const c = ((target.courseDeg - t.voyage.cogDeg) * Math.PI) / 180;
    g.save();
    g.translate(x, y);
    g.rotate(c);
    g.strokeStyle = target.cpaNm < 0.5 ? "#c81e1e" : S52.chblk;
    g.lineWidth = 1.6;
    const s = mapH * 0.024;
    g.beginPath();
    g.moveTo(0, -s * 1.5);
    g.lineTo(s, s);
    g.lineTo(-s, s);
    g.closePath();
    g.stroke();
    g.restore();
  }

  /* — kendi gemimiz: S-52 çift daire + baş hattı + hız vektörü — */
  g.strokeStyle = S52.ownship;
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(cx, cy);
  g.lineTo(cx, cy - mapH * 0.26);
  g.stroke();
  // Hız vektörü üzerinde bir dakikalık işaretler.
  for (let i = 1; i <= 6; i++) {
    const yy = cy - (mapH * 0.26 * i) / 6;
    g.beginPath();
    g.moveTo(cx - mapH * 0.012, yy);
    g.lineTo(cx + mapH * 0.012, yy);
    g.stroke();
  }
  g.beginPath();
  g.arc(cx, cy, mapH * 0.018, 0, Math.PI * 2);
  g.stroke();
  g.beginPath();
  g.arc(cx, cy, mapH * 0.008, 0, Math.PI * 2);
  g.stroke();

  /**
   * Kuzey oku ve sunum kipi.
   *
   * Ekran rota yukarı olduğu için enlem/boylam ızgarası eğik geçiyor; okun
   * gösterdiği yön olmadan bu, bozuk bir harita gibi görünüyordu. Kuzeyin
   * ekrandaki yönü (0,−1) vektörünün rota kadar döndürülmüş hâli.
   */
  const nr = mapH * 0.045;
  const nx = mapW - nr * 2.9;
  const ny = mapY + nr * 2.1;
  // Altında opak bir kutu: iskandil rakamlarının üstüne binmesin.
  g.fillStyle = "rgba(255,255,255,.9)";
  g.fillRect(nx - nr * 1.85, ny - nr * 1.85, nr * 3.7, nr * 4.4);
  g.strokeStyle = S52.panelLine;
  g.lineWidth = 1;
  g.strokeRect(nx - nr * 1.85 + 0.5, ny - nr * 1.85 + 0.5, nr * 3.7 - 1, nr * 4.4 - 1);
  g.strokeStyle = "rgba(30,60,80,.55)";
  g.beginPath();
  g.arc(nx, ny, nr, 0, Math.PI * 2);
  g.stroke();
  g.save();
  g.translate(nx, ny);
  g.rotate(rot);
  g.fillStyle = "#31536b";
  g.beginPath();
  g.moveTo(0, -nr);
  g.lineTo(nr * 0.42, nr * 0.5);
  g.lineTo(0, nr * 0.18);
  g.lineTo(-nr * 0.42, nr * 0.5);
  g.closePath();
  g.fill();
  g.restore();
  // "N" okun ucunda ama dik: dönen bir harf baş yönüne göre ters dururdu.
  say(g, "N", nx + Math.sin(rot) * nr * 1.42, ny - Math.cos(rot) * nr * 1.42 + nr * 0.3, {
    size: nr * 0.85,
    color: "#31536b",
    font: UI.sans,
    align: "center",
    bold: true,
  });
  say(g, "COURSE UP", nx, ny + nr * 2.05, { size: nr * 0.62, color: "#4a5b66", font: UI.sans, align: "center" });

  g.restore();

  /* — sağ panel — */
  g.fillStyle = S52.panel;
  g.fillRect(mapW, mapY, side, mapH);
  g.strokeStyle = S52.panelLine;
  g.lineWidth = 1;
  g.beginPath();
  g.moveTo(mapW + 0.5, mapY);
  g.lineTo(mapW + 0.5, h);
  g.stroke();

  const px = mapW + side * 0.06;
  const pw = side * 0.88;
  /**
   * Panelin satır yüksekliği, sığdığı ölçüde büyük.
   *
   * Aşağıdaki bütün konumlar `fs`'in katı, dolayısıyla panelin toplam boyu da
   * öyle: başlık 2.9 + mevki 3.6 + üç okuma 6.0 + harita künyesi 3.1 + beş
   * sefer satırı 10.75 + alt boşluk 1.15 = 27.5 fs. Eskiden `fs` yalnız panel
   * genişliğinden çıkıyordu ve bu toplam ekranı taşıyordu: DEPTH satırı hiç
   * görünmüyor, ETA alt kenarda kesiliyordu.
   */
  const PANEL_FS_UNITS = 27.5;
  const fs = Math.min(side * 0.11, mapH / PANEL_FS_UNITS);

  // Başlık: kaynak ve otomatik kip.
  g.fillStyle = "#cfe0ea";
  g.fillRect(mapW, mapY, side, fs * 1.7);
  say(g, "GPS (COMP)", px, mapY + fs * 1.15, { size: fs * 0.95, color: S52.text, font: UI.sans, bold: true });
  g.fillStyle = "#ffffff";
  g.fillRect(mapW + side * 0.72, mapY + fs * 0.3, side * 0.24, fs * 1.05);
  g.strokeStyle = S52.panelLine;
  g.strokeRect(mapW + side * 0.72 + 0.5, mapY + fs * 0.3 + 0.5, side * 0.24 - 1, fs * 1.05 - 1);
  say(g, "AUTO", mapW + side * 0.84, mapY + fs * 1.1, {
    size: fs * 0.72,
    color: S52.text,
    font: UI.sans,
    align: "center",
  });

  let py = mapY + fs * 2.9;
  const chip = (color: string, label: string) => {
    g.fillStyle = color;
    g.fillRect(px, py - fs * 0.72, fs * 0.5, fs * 0.5);
    say(g, label, px + fs * 0.8, py, { size: fs * 0.78, color: "#4a5b66", font: UI.sans });
  };

  chip("#2f7d32", "SHIP");
  say(g, fmt.lat(t.voyage.lat), px, py + fs * 1.15, { size: fs, color: S52.text, bold: true });
  say(g, fmt.lon(t.voyage.lon), px, py + fs * 2.3, { size: fs, color: S52.text, bold: true });
  py += fs * 3.6;

  const panelRows: Array<[string, string, string, string?]> = [
    ["#2f7d32", "SOG", `${t.voyage.sogKt.toFixed(1)} kn`],
    ["#2f7d32", "COG", fmt.deg(t.voyage.cogDeg, 1)],
    ["#2f7d32", "HDG", fmt.deg(t.voyage.cogDeg, 1), "Gyro"],
  ];
  panelRows.forEach(([color, label, value, note]) => {
    chip(color, label);
    say(g, value, px + pw, py, { size: fs, color: S52.text, align: "right", bold: true });
    if (note) say(g, note, px + pw, py + fs * 0.95, { size: fs * 0.7, color: "#6b7d88", font: UI.sans, align: "right" });
    py += fs * 2.0;
  });

  g.strokeStyle = S52.panelLine;
  g.beginPath();
  g.moveTo(px, py - fs * 0.6);
  g.lineTo(px + pw, py - fs * 0.6);
  g.stroke();

  say(g, "S57 ENC — WGS 84", px, py + fs * 0.6, { size: fs * 0.78, color: "#4a5b66", font: UI.sans });
  say(g, shore > 0.3 ? "Approach a harbour" : "Coastal / Open sea", px, py + fs * 1.8, {
    size: fs * 0.85,
    color: S52.text,
    font: UI.sans,
  });
  py += fs * 3.1;

  const voyageRows: Array<[string, string, string?]> = [
    ["NEXT WPT", `WP${t.voyage.legIndex + 1}  ${t.voyage.distanceToWptNm.toFixed(1)} NM`],
    [
      "XTE",
      `${Math.abs(t.voyage.xteNm).toFixed(3)} ${t.voyage.xteNm >= 0 ? "STBD" : "PORT"}`,
      Math.abs(t.voyage.xteNm) > 0.05 ? "#b25000" : "#1c6b2e",
    ],
    ["TO GO", `${t.voyage.toGoNm.toFixed(1)} NM`],
    ["ETA", `${fmt.hhmm(t.voyage.eta)} UTC`],
    ["DEPTH", `${t.depthM.toFixed(1)} m`],
  ];
  voyageRows.forEach(([label, value, color]) => {
    say(g, label, px, py, { size: fs * 0.72, color: "#6b7d88", font: UI.sans });
    say(g, value, px, py + fs * 1.0, { size: fs * 0.95, color: color ?? S52.text, bold: true });
    py += fs * 2.15;
  });

  /* — alt şerit: seferin kendisi — */
  const stripY = h - mapH * 0.062;
  g.fillStyle = "#f2f5f7";
  g.fillRect(0, stripY, mapW, h - stripY);
  g.strokeStyle = S52.panelLine;
  g.beginPath();
  g.moveTo(0, stripY + 0.5);
  g.lineTo(mapW, stripY + 0.5);
  g.stroke();
  say(
    g,
    `${t.voyage.route.from.name.toUpperCase()} → ${t.voyage.route.to.name.toUpperCase()}`,
    mapW * 0.015,
    h - mapH * 0.018,
    { size: mapH * 0.042, color: S52.text, font: UI.sans, bold: true },
  );
  say(
    g,
    `AIS ${aisVisible ? "ON" : "SUPP"} · ${t.voyage.arrived ? "MOORED" : "UNDER WAY"} · ${Math.round(
      t.voyage.progress * 100,
    )}%`,
    mapW * 0.985,
    h - mapH * 0.018,
    { size: mapH * 0.042, color: "#4a5b66", font: UI.sans, align: "right" },
  );
};

/* ─── conning ekranı ─── */

/**
 * Conning: kaptanın tek bakışta gemiyi okuduğu ekran.
 *
 * Denizin hâli buraya toplanıyor — dalga yüksekliği ve geldiği kerteriz,
 * ölü denizin periyodu, akıntının seti ve rayı, bağıl ve gerçek rüzgâr,
 * geminin o dalgada yaptığı yalpa. Sağdaki pusula gülünde üç ok var: rüzgâr,
 * dalga ve akıntı, hepsi GEMİYE göre — hangisinin nereden geldiği bir bakışta
 * görünsün diye.
 */
export const drawConning: ScreenDraw = (g, w, h, t) => {
  const bar = chassis(g, w, h, "CONNING", `${t.marine.source === "live" ? "LIVE" : "MODEL"} MET`, UI.accent);
  const body = h - bar;

  /*
   * Yerleşim dört şeride bölünmüş ve şeritler ÖLÇÜLEREK ayrılmış: solda iki
   * büyük okuma sütunu, ortada denizin hâli, sağda pusula gülü. Değerler sağa
   * dayalı yazılıyor — "Orta dalgalı" ile "Çok kaba" aynı sütunda buluşuyor,
   * uzun olan komşu sütunun üstüne taşmıyor.
   */
  const bigCol1 = w * 0.035;
  const bigCol2 = w * 0.19;
  const seaLabelX = w * 0.33;
  const seaValueX = w * 0.755;
  const fs = Math.min(body * 0.145, w * 0.062);

  readout(g, "HDG", fmt.deg(t.voyage.cogDeg), bigCol1, bar + body * 0.14, fs);
  readout(g, "SOG", t.voyage.sogKt.toFixed(1), bigCol1, bar + body * 0.55, fs, UI.text, "kn");
  readout(
    g,
    "ROT",
    `${t.rotDegMin >= 0 ? "+" : ""}${t.rotDegMin.toFixed(0)}`,
    bigCol2,
    bar + body * 0.14,
    fs,
    Math.abs(t.rotDegMin) > 10 ? UI.amber : UI.text,
    "°/dk",
  );
  readout(g, "DEPTH", t.depthM.toFixed(0), bigCol2, bar + body * 0.55, fs, UI.text, "m");

  // Deniz durumu sütunu.
  const small = Math.min(body * 0.082, w * 0.034);
  const lines: Array<[string, string, string?]> = [
    ["DENİZ", `${Math.round(t.marine.douglas)} · ${douglasLabel(t.marine.douglas)}`],
    ["DALGA", `${t.marine.waveHeightM.toFixed(1)}m ${t.marine.wavePeriodS.toFixed(0)}s ${compassName(t.marine.waveFromDeg)}`],
    ["ÖLÜ DNZ", `${t.marine.swellHeightM.toFixed(1)}m ${t.marine.swellPeriodS.toFixed(0)}s ${compassName(t.marine.swellFromDeg)}`],
    ["RÜZ (B)", `${t.apparentWindKt.toFixed(0)}kn ${fmt.deg(t.apparentWindDeg)}R`],
    ["RÜZ (G)", `${t.marine.windKt.toFixed(0)}kn ${compassName(t.marine.windFromDeg)} ${t.marine.beaufort}Bf`],
    ["AKINTI", `${t.marine.currentKt.toFixed(1)}kn → ${fmt.deg(t.marine.currentTowardDeg)}`],
    [
      "YALPA/VUR",
      `${t.rollDeg.toFixed(1)}° ${t.pitchDeg.toFixed(1)}° Te${t.encounterPeriodS.toFixed(0)}`,
      t.rollDeg > 12 ? UI.amber : UI.text,
    ],
  ];
  let y = bar + body * 0.13;
  lines.forEach(([label, value, color]) => {
    say(g, label, seaLabelX, y, { size: small * 0.76, color: UI.faint, font: UI.sans });
    say(g, value, seaValueX, y, { size: small, color: color ?? UI.text, align: "right" });
    y += body * 0.125;
  });

  // Pusula gülü: rüzgâr, dalga ve akıntı okları — hepsi gemiye göre.
  const rx = w * 0.885;
  const ry = bar + body * 0.5;
  const rr = Math.min(w * 0.098, body * 0.4);
  g.strokeStyle = UI.edge;
  g.lineWidth = 1.4;
  g.beginPath();
  g.arc(rx, ry, rr, 0, Math.PI * 2);
  g.stroke();
  // Gemi silueti — pruva yukarı.
  g.fillStyle = "rgba(180,220,240,.35)";
  g.beginPath();
  g.moveTo(rx, ry - rr * 0.62);
  g.lineTo(rx + rr * 0.2, ry - rr * 0.1);
  g.lineTo(rx + rr * 0.2, ry + rr * 0.6);
  g.lineTo(rx - rr * 0.2, ry + rr * 0.6);
  g.lineTo(rx - rr * 0.2, ry - rr * 0.1);
  g.closePath();
  g.fill();

  const arrow = (relFromDeg: number, color: string, label: string) => {
    const a = (relFromDeg * Math.PI) / 180;
    const ox = rx + Math.sin(a) * rr;
    const oy = ry - Math.cos(a) * rr;
    const ix = rx + Math.sin(a) * rr * 0.32;
    const iy = ry - Math.cos(a) * rr * 0.32;
    g.strokeStyle = color;
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(ox, oy);
    g.lineTo(ix, iy);
    g.stroke();
    g.fillStyle = color;
    g.beginPath();
    g.arc(ix, iy, rr * 0.09, 0, Math.PI * 2);
    g.fill();
    say(g, label, ox + Math.sin(a) * rr * 0.2, oy - Math.cos(a) * rr * 0.2 + 4, {
      size: rr * 0.24,
      color,
      align: "center",
      font: UI.sans,
      bold: true,
    });
  };
  arrow(t.trueWindRelDeg, UI.amber, "R");
  arrow((t.marine.waveFromDeg - t.voyage.cogDeg + 360) % 360, UI.accent, "D");
  arrow((t.marine.currentTowardDeg - t.voyage.cogDeg + 180 + 360) % 360, UI.green, "A");
};

/* ─── iskandil ─── */

/**
 * Ekosounder: kaydeden iskandil.
 *
 * İz sağdan sola kayıyor (yeni kayıt sağda) — kâğıtlı kayıtçının bıraktığı
 * alışkanlık, dijital cihazlar da böyle çiziyor. Sığ su alarmı ayarlanan
 * derinliğin altına inince kırmızı bant ve yanıp sönen uyarı.
 */
export const drawEchoSounder: ScreenDraw = (g, w, h, t) => {
  const alarmM = 20;
  const shallow = t.depthM < alarmM;
  const bar = chassis(g, w, h, "ECHO SOUNDER", shallow ? "SHALLOW" : "200 kHz", shallow ? UI.red : UI.green);
  const body = h - bar;
  // Sol sütun rakam, sağ taraf iz. Sınır ölçülerek konuldu: 100 metreyi geçen
  // derinlik dört haneye çıkıyor ve dar bir sütunda izin üstüne taşıyordu.
  const plotX = w * 0.42;
  const plotW = w - plotX - w * 0.02;
  const plotY = bar + body * 0.08;
  const plotH = body * 0.84;

  const reading = t.depthM < 100 ? t.depthM.toFixed(1) : t.depthM.toFixed(0);
  readout(
    g,
    "DERİNLİK",
    reading,
    w * 0.04,
    bar + body * 0.2,
    Math.min(body * 0.2, w * 0.115),
    shallow ? UI.red : UI.green,
    "m",
  );
  const note = Math.min(body * 0.095, w * 0.055);
  say(g, `ALARM ${alarmM} m`, w * 0.04, bar + body * 0.62, { size: note, color: UI.dim, font: UI.sans });
  say(g, "DRAFT 6.4 m", w * 0.04, bar + body * 0.76, { size: note, color: UI.dim, font: UI.sans });
  say(g, `KEEL ${Math.max(0, t.depthM - 6.4).toFixed(0)} m`, w * 0.04, bar + body * 0.9, {
    size: note,
    color: shallow ? UI.amber : UI.dim,
    font: UI.sans,
  });

  box(g, plotX, plotY, plotW, plotH, "#04121a");
  const trace = t.depthTrace.length > 1 ? t.depthTrace : [t.depthM, t.depthM];
  const maxD = Math.max(30, ...trace) * 1.15;

  // Derinlik ızgarası.
  g.strokeStyle = "rgba(126,196,235,.16)";
  g.lineWidth = 1;
  for (let i = 1; i < 4; i++) {
    const y = plotY + (plotH * i) / 4;
    g.beginPath();
    g.moveTo(plotX, y);
    g.lineTo(plotX + plotW, y);
    g.stroke();
    say(g, `${Math.round((maxD * i) / 4)}`, plotX + 4, y - 3, { size: body * 0.085, color: UI.faint });
  }

  // Taban: dolgulu iz.
  g.beginPath();
  g.moveTo(plotX, plotY + plotH);
  trace.forEach((d, i) => {
    const x = plotX + (plotW * i) / (trace.length - 1);
    g.lineTo(x, plotY + (d / maxD) * plotH);
  });
  g.lineTo(plotX + plotW, plotY + plotH);
  g.closePath();
  const bed = g.createLinearGradient(0, plotY, 0, plotY + plotH);
  bed.addColorStop(0, "rgba(255,176,32,.85)");
  bed.addColorStop(1, "rgba(150,70,10,.55)");
  g.fillStyle = bed;
  g.fill();

  // Alarm bandı.
  const alarmY = plotY + (alarmM / maxD) * plotH;
  g.strokeStyle = "rgba(255,90,90,.75)";
  g.setLineDash([8, 5]);
  g.lineWidth = 1.6;
  g.beginPath();
  g.moveTo(plotX, alarmY);
  g.lineTo(plotX + plotW, alarmY);
  g.stroke();
  g.setLineDash([]);

  if (shallow && Math.floor(t.nowMs / 500) % 2 === 0) {
    g.fillStyle = "rgba(255,60,60,.85)";
    g.fillRect(plotX, plotY, plotW, body * 0.16);
    say(g, "SIĞ SU ALARMI", plotX + plotW / 2, plotY + body * 0.115, {
      size: body * 0.1,
      color: "#fff",
      align: "center",
      bold: true,
    });
  }
};

/* ─── NAVTEX ─── */

/**
 * NAVTEX alıcısı: 518 kHz, İngilizce uluslararası servis.
 *
 * Mesajlar denizin o anki hâlinden üretiliyor — 34 knotu geçen rüzgârda
 * fırtına uyarısı (WMO eşiği), 25 knot üstünde kuvvetli rüzgâr uyarısı
 * düşüyor, seyredilen alanın adı seferin rotasından geliyor. Uydurma bir
 * metin listesi değil: ekranda ne yazıyorsa camın dışında o var.
 */
export const drawNavtex: ScreenDraw = (g, w, h, t) => {
  const bar = chassis(g, w, h, "NAVTEX  518 kHz", "RX");
  const body = h - bar;
  const fs = body * 0.085;
  const gale = t.marine.windKt >= 34;
  const strong = t.marine.windKt >= 25;

  const station = t.voyage.route.sea.charAt(0);
  const stamp = `${String(t.voyage.shipTime.getUTCDate()).padStart(2, "0")}${fmt.hhmm(t.voyage.shipTime).replace(":", "")}`;

  const messages: Array<[string, string, string]> = [
    gale
      ? ["A", "GALE WARNING", `${Math.round(t.marine.beaufort)} BF ${compassName(t.marine.windFromDeg)}`]
      : strong
        ? ["A", "STRONG WIND WARNING", `${Math.round(t.marine.windKt)} KT ${compassName(t.marine.windFromDeg)}`]
        : ["A", "NAV WARNING", "BUOY UNLIT — POSN UNCERTAIN"],
    ["B", "MET FORECAST", `SEA ${Math.round(t.marine.douglas)} SWELL ${t.marine.swellHeightM.toFixed(1)}M`],
    ["D", "SAR INFO", "NIL"],
    ["E", "MET FORECAST 24H", `${t.marine.pressureHpa.toFixed(0)} hPa`],
  ];

  // Alınan mesaj listesi.
  let y = bar + body * 0.13;
  messages.forEach(([subject, title, detail], i) => {
    const urgent = i === 0 && (gale || strong);
    box(g, w * 0.03, y - fs, w * 0.94, body * 0.145, urgent ? "rgba(60,18,18,.9)" : UI.panel);
    say(g, `${station}${subject}${String(10 + i * 7).padStart(2, "0")}`, w * 0.05, y + fs * 0.15, {
      size: fs,
      color: urgent ? UI.red : UI.accent,
      bold: true,
    });
    say(g, title, w * 0.19, y + fs * 0.15, { size: fs, color: UI.text });
    say(g, `${stamp} UTC`, w * 0.96, y + fs * 0.15, { size: fs * 0.85, color: UI.faint, align: "right" });
    say(g, detail, w * 0.19, y + fs * 1.25, { size: fs * 0.88, color: UI.dim });
    y += body * 0.175;
  });

  // Açık mesajın gövdesi.
  box(g, w * 0.03, y - fs * 0.6, w * 0.94, h - (y - fs * 0.6) - body * 0.05, "rgba(6,18,28,.9)");
  const bodyLines = [
    `ZCZC ${station}A${String(10).padStart(2, "0")}`,
    `${t.voyage.route.sea}`,
    gale ? "GALE WARNING IN FORCE" : strong ? "STRONG WIND WARNING" : "NAVIGATIONAL WARNING",
    `WIND ${compassName(t.marine.windFromDeg)} ${Math.round(t.marine.windKt)} KT GUST ${Math.round(t.marine.gustKt)}`,
    `SEA ${t.marine.waveHeightM.toFixed(1)} M FROM ${compassName(t.marine.waveFromDeg)}`,
    "NNNN",
  ];
  bodyLines.forEach((line, i) => {
    say(g, line, w * 0.055, y + fs * (0.8 + i * 1.22), {
      size: fs * 0.95,
      color: i === 2 && (gale || strong) ? UI.amber : UI.dim,
    });
  });
};

/* ─── Inmarsat-C ─── */

/**
 * Inmarsat-C: EGC/SafetyNET terminali ve mevki raporlayıcı.
 *
 * Gemi mevkiini otomatik raporlar (LRIT/SSAS zorunluluğu), MSI mesajlarını
 * EGC üzerinden alır. Uydu seçimi geminin BOYLAMINDAN çıkıyor — Atlantik,
 * Hint ve Pasifik okyanus bölgeleri gerçek kapsama sınırlarına yakın.
 */
export const drawInmarsatC: ScreenDraw = (g, w, h, t) => {
  const bar = chassis(g, w, h, "INMARSAT-C  MES", "LOGGED IN");
  const body = h - bar;
  const fs = body * 0.095;

  const lon = t.voyage.lon;
  const ocean =
    lon > -55 && lon < 20 ? ["AOR-E", "Atlantik Doğu"] :
    lon >= 20 && lon < 110 ? ["IOR", "Hint Okyanusu"] :
    lon >= 110 || lon < -140 ? ["POR", "Pasifik"] : ["AOR-W", "Atlantik Batı"];

  const rows: Array<[string, string, string?]> = [
    ["OCEAN REGION", `${ocean[0]} — ${ocean[1]}`],
    ["NCS / LES", `044  Burum-NL`],
    ["SIGNAL", `${(38 + (t.nowMs / 9000) % 4).toFixed(0)} dB  BER 0`, UI.green],
    ["POSN REPORT", `${fmt.lat(t.voyage.lat)}  ${fmt.lon(t.voyage.lon)}`],
    ["LAST REPORT", `${fmt.hhmm(t.voyage.shipTime)} UTC  4h aralık`],
    ["DISTRESS", "READY — TEST OK", UI.green],
  ];

  let y = bar + body * 0.16;
  rows.forEach(([label, value, color]) => {
    say(g, label, w * 0.05, y, { size: fs * 0.82, color: UI.faint, font: UI.sans });
    say(g, value, w * 0.05, y + fs * 1.15, { size: fs, color: color ?? UI.text });
    y += body * 0.145;
  });

  // EGC kutusu.
  const egcY = h - body * 0.24;
  box(g, w * 0.03, egcY, w * 0.94, body * 0.2, "rgba(10,28,40,.95)");
  say(g, "EGC / SafetyNET", w * 0.05, egcY + fs, { size: fs * 0.85, color: UI.accent, bold: true });
  say(
    g,
    t.marine.windKt >= 34
      ? `METAREA — GALE WARNING ${compassName(t.marine.windFromDeg)} ${Math.round(t.marine.beaufort)} BF`
      : `METAREA — NAVIGATIONAL WARNING (rutin)`,
    w * 0.05,
    egcY + fs * 2.25,
    { size: fs * 0.9, color: t.marine.windKt >= 34 ? UI.amber : UI.dim },
  );
};

/* ─── Iridium ─── */

/** Iridium Certus: uydu telefonu ve veri terminali; GMDSS ses için hazır. */
export const drawIridium: ScreenDraw = (g, w, h, t) => {
  const bar = chassis(g, w, h, "IRIDIUM CERTUS", "REGISTERED");
  const body = h - bar;
  const fs = body * 0.1;

  // Sinyal çubukları — uydu geçişleriyle yavaşça değişiyor.
  const level = 3 + Math.floor((Math.sin(t.nowMs / 21000) * 0.5 + 0.5) * 2.99);
  const bx = w * 0.06;
  const by = bar + body * 0.34;
  for (let i = 0; i < 5; i++) {
    const bh = body * (0.07 + i * 0.045);
    g.fillStyle = i < level ? UI.green : "rgba(190,216,232,.18)";
    g.fillRect(bx + i * w * 0.045, by - bh, w * 0.032, bh);
  }
  say(g, `${level}/5`, bx + w * 0.245, by, { size: fs * 1.1, color: UI.text, bold: true });
  say(g, "SATELLITE", bx, by + fs * 1.1, { size: fs * 0.75, color: UI.faint, font: UI.sans });

  const rows: Array<[string, string, string?]> = [
    ["VOICE", "GMDSS HAZIR — CH 1", UI.green],
    ["DATA", `${(88 + ((t.nowMs / 4000) % 60)).toFixed(0)} kbps`],
    ["SON ÇAĞRI", `${fmt.hhmm(new Date(t.voyage.shipTime.getTime() - 5400000))} UTC  Şirket`],
    ["MEVKİ", `${fmt.lat(t.voyage.lat)}  ${fmt.lon(t.voyage.lon)}`],
  ];
  let y = bar + body * 0.6;
  rows.forEach(([label, value, color]) => {
    say(g, label, w * 0.06, y, { size: fs * 0.75, color: UI.faint, font: UI.sans });
    say(g, value, w * 0.32, y, { size: fs * 0.92, color: color ?? UI.text });
    y += body * 0.108;
  });
};

/* ─── VHF / DSC ─── */

/** VHF telsiz: CH16 nöbeti, çalışma kanalı ve DSC kontrolörü. */
export const drawVhf: ScreenDraw = (g, w, h, t) => {
  const bar = chassis(g, w, h, "VHF / DSC  GMDSS", "DUAL WATCH");
  const body = h - bar;

  // Kanal 16 her zaman büyük — nöbet kanalı.
  say(g, "16", w * 0.06, bar + body * 0.52, { size: body * 0.46, color: UI.green, bold: true });
  say(g, "DISTRESS / CALLING", w * 0.06, bar + body * 0.66, { size: body * 0.085, color: UI.dim, font: UI.sans });

  // Çalışma kanalı — liman yaklaşmasında değişir.
  const working = t.voyage.progress > 0.9 ? 12 : t.voyage.progress < 0.1 ? 14 : 6;
  say(g, String(working).padStart(2, "0"), w * 0.52, bar + body * 0.46, {
    size: body * 0.32,
    color: UI.accent,
    bold: true,
  });
  say(g, "WORKING", w * 0.52, bar + body * 0.58, { size: body * 0.08, color: UI.dim, font: UI.sans });

  const rows: Array<[string, string]> = [
    ["MMSI", "271000512"],
    ["PWR", "25 W"],
    ["SQL", "4"],
    ["DSC", "TEST OK"],
  ];
  rows.forEach(([label, value], i) => {
    const x = w * (0.06 + i * 0.24);
    say(g, label, x, h - body * 0.19, { size: body * 0.075, color: UI.faint, font: UI.sans });
    say(g, value, x, h - body * 0.07, { size: body * 0.1, color: UI.text });
  });
};

/* ─── otopilot ─── */

/** Otopilot / iz kontrol ünitesi: mod, emredilen rota, dümen sınırı. */
export const drawAutopilot: ScreenDraw = (g, w, h, t) => {
  const bar = chassis(g, w, h, "AUTOPILOT", t.autopilotMode, t.autopilotMode === "TRACK" ? UI.green : UI.amber);
  const body = h - bar;

  readout(g, "SET COURSE", fmt.deg(t.setCourseDeg), w * 0.05, bar + body * 0.2, body * 0.3, UI.green);
  readout(g, "GYRO", fmt.deg(t.voyage.cogDeg), w * 0.53, bar + body * 0.2, body * 0.3);

  const err = Math.abs(t.voyage.xteNm) * 60; // NM → dakika (kabaca sapma ölçüsü)
  say(g, `RUDDER LIMIT 15°   OFF-TRACK ${err.toFixed(1)}′`, w * 0.05, h - body * 0.14, {
    size: body * 0.11,
    color: err > 4 ? UI.amber : UI.dim,
    font: UI.sans,
  });

  // Dümen çubuğu.
  const rx = w * 0.05;
  const rw = w * 0.9;
  const ry = h - body * 0.42;
  const rh = body * 0.16;
  box(g, rx, ry, rw, rh, "rgba(8,20,30,.9)");
  g.fillStyle = t.rudderDeg >= 0 ? UI.green : UI.amber;
  const half = rw / 2;
  const len = (Math.abs(t.rudderDeg) / 15) * half;
  g.fillRect(rx + half + (t.rudderDeg >= 0 ? 0 : -len), ry + 2, len, rh - 4);
  g.strokeStyle = UI.edge;
  g.beginPath();
  g.moveTo(rx + half, ry);
  g.lineTo(rx + half, ry + rh);
  g.stroke();
  say(g, `${Math.abs(t.rudderDeg).toFixed(0)}° ${t.rudderDeg >= 0 ? "STBD" : "PORT"}`, rx + rw / 2, ry - body * 0.03, {
    size: body * 0.1,
    color: UI.text,
    align: "center",
  });
};

/* ─── yuvarlak kadranlar ─── */

/** Kadran gövdesi: koyu kasa, açık kadran, taksimat. */
function dialBase(g: CanvasRenderingContext2D, size: number, face = "#101418") {
  g.fillStyle = "#0a0d10";
  g.fillRect(0, 0, size, size);
  g.fillStyle = face;
  g.beginPath();
  g.arc(size / 2, size / 2, size * 0.46, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = "rgba(150,180,200,.35)";
  g.lineWidth = size * 0.012;
  g.beginPath();
  g.arc(size / 2, size / 2, size * 0.46, 0, Math.PI * 2);
  g.stroke();
}

/* ─── makine telgrafı ─── */

/**
 * Telgrafın kademeleri — iskeleden sancağa: tam tornistandan tam yola.
 *
 * `frac`, o kademedeki şaft devrinin servis devrine oranı (tornistan eksi):
 * makine dairesinin cevabı buradan okunuyor, ayrı bir uydurma tablodan değil.
 */
export const TELEGRAPH_STEPS = [
  { label: "FULL", side: "ASTERN", frac: -1 },
  { label: "HALF", side: "ASTERN", frac: -0.7 },
  { label: "SLOW", side: "ASTERN", frac: -0.45 },
  { label: "D.SLOW", side: "ASTERN", frac: -0.25 },
  { label: "STOP", side: "", frac: 0 },
  { label: "D.SLOW", side: "AHEAD", frac: 0.25 },
  { label: "SLOW", side: "AHEAD", frac: 0.45 },
  { label: "HALF", side: "AHEAD", frac: 0.7 },
  { label: "FULL", side: "AHEAD", frac: 1 },
] as const;

/** Lambaların dizildiği yay — fotoğraftaki yelpazenin açıklığı. */
export const TELEGRAPH_SPAN = Math.PI * 0.86;

/**
 * KOLUN yolu, lamba yayından dar.
 *
 * Telgrafta emri gösteren şey yanan lambadır; kol, altındaki dişli yatağında
 * kısa bir yol gider — fotoğraftaki dişli yatak da lamba yayının çok altında
 * bir açıyı kaplıyor. Kol lamba yayı kadar yatırılınca "tam yol" emrinde
 * neredeyse yatay duruyor, devrilmiş gibi görünüyordu; gemi seyir hâlinde hep
 * o emirde olduğu için de kadrajda hep öyle kalıyordu.
 */
export const TELEGRAPH_LEVER_SPAN = Math.PI * 0.3;

/** Kademenin dikeyden sapması (radyan) — sancağa, yani yol ileriye doğru artı. */
export function telegraphLean(index: number): number {
  return ((index - 4) / 4) * (TELEGRAPH_SPAN / 2);
}

/** Kolun o kademedeki duruşu: aynı emir, dar yatakta. */
export function telegraphLeverLean(index: number): number {
  return ((index - 4) / 4) * (TELEGRAPH_LEVER_SPAN / 2);
}

/** Köprüüstünün verdiği emrin kademesi; tanınmayan emir STOP sayılır. */
export function telegraphOrderIndex(order: string): number {
  const want = order.trim().toUpperCase().replace("DEAD SLOW", "D.SLOW");
  const i = TELEGRAPH_STEPS.findIndex((s) => `${s.label} ${s.side}`.trim() === want);
  return i < 0 ? 4 : i;
}

/**
 * Makine dairesinin cevabı: şaftın GERÇEKTEN döndüğü devre en yakın kademe.
 *
 * Eskiden cevap ibresi emrin bir eksiğine rastgele zamanlarla atlıyordu; artık
 * telemetrideki devirden çıkıyor, yani limandan kalkarken emir "tam yol"da
 * dururken cevap sırayla yavaş/yarım/tam yolu geçiyor.
 */
export function telegraphAnswerIndex(shaftRpm: number): number {
  const frac = shaftRpm / RPM_AT_SERVICE;
  let best = 4;
  TELEGRAPH_STEPS.forEach((s, i) => {
    if (Math.abs(s.frac - frac) < Math.abs(TELEGRAPH_STEPS[best].frac - frac)) best = i;
  });
  return best;
}

/**
 * Makine telgrafı — yelpaze gövdeli, ışıklı kademe göstergeli tip.
 *
 * Yüz YARIM DAİRE: çizim kare tuvalin ÜST YARISINA yapılıyor, çünkü 3B'deki
 * yarım disk yüzeyi dokunun tam o yarısını alıyor (bkz. LiveScreen → "fan").
 * Merkez, tuvalin ortası; kolun mili de orada.
 *
 * Kademeler bir telgrafta ne ise o: iskele yarısı tornistan (kırmızı), sancak
 * yarısı yol ileri (yeşil), tepesi STOP (kehribar). Emredilen kademenin lambası
 * yanar; makinenin cevabı ayrı bir halka olarak aynı kadranda durur — ikisi
 * ayrışınca (emir verilmiş, makine daha oraya gelmemiş) bir bakışta görünür.
 */
export const drawTelegraph: ScreenDraw = (g, size, _h, t) => {
  const c = size / 2;
  const R = size * 0.5;

  // Gövde rengi: tuvalin tamamı, yarım diskin dışında kalan kısım görünmüyor.
  g.fillStyle = "#2f3438";
  g.fillRect(0, 0, size, size);

  // Yüz: ortadan kenara doğru koyulaşan mat gri.
  const face = g.createRadialGradient(c, c, R * 0.1, c, c, R);
  face.addColorStop(0, "#41474c");
  face.addColorStop(0.72, "#33383d");
  face.addColorStop(1, "#22262a");
  g.fillStyle = face;
  g.beginPath();
  g.arc(c, c, R, Math.PI, Math.PI * 2);
  g.closePath();
  g.fill();

  const angleFor = (i: number) => -Math.PI / 2 + telegraphLean(i);
  const at = (a: number, r: number): [number, number] => [c + Math.cos(a) * R * r, c + Math.sin(a) * R * r];

  /* — dış kuşak: dişli taksimat ve yön yazıları — */
  g.fillStyle = "rgba(12,14,16,.55)";
  g.beginPath();
  g.arc(c, c, R * 0.97, Math.PI, Math.PI * 2);
  g.arc(c, c, R * 0.84, Math.PI * 2, Math.PI, true);
  g.closePath();
  g.fill();

  const halfSpan = TELEGRAPH_SPAN / 2;
  // Yön yazılarının oturduğu yay — taksimat orada kesiliyor ki yazı okunsun.
  const wordAt = (k: number) => -Math.PI / 2 + (k === 0 ? -1 : 1) * halfSpan * 0.62;
  for (let k = -28; k <= 28; k++) {
    const a = -Math.PI / 2 + (k / 28) * halfSpan;
    if (Math.abs(a - wordAt(0)) < 0.16 || Math.abs(a - wordAt(1)) < 0.16) continue;
    const major = k % 7 === 0;
    g.strokeStyle = major ? "rgba(226,236,244,.75)" : "rgba(190,206,218,.34)";
    g.lineWidth = size * (major ? 0.008 : 0.004);
    g.beginPath();
    g.moveTo(...at(a, 0.965));
    g.lineTo(...at(a, major ? 0.868 : 0.905));
    g.stroke();
  }

  ["ASTERN", "AHEAD"].forEach((word, k) => {
    const a = wordAt(k);
    g.save();
    g.translate(...at(a, 0.905));
    // Yay boyunca, tabanı teğet: +π/2 iki yanda da düz okunan yönü veriyor.
    g.rotate(a + Math.PI / 2);
    say(g, word, 0, 0, {
      size: size * 0.036,
      color: "rgba(214,228,238,.72)",
      align: "center",
      font: UI.sans,
      bold: true,
      baseline: "middle",
    });
    g.restore();
  });

  /* — kademeler: lamba + yazı — */
  const order = telegraphOrderIndex(t.telegraphOrder);
  const answer = telegraphAnswerIndex(t.shaftRpm);

  TELEGRAPH_STEPS.forEach((step, i) => {
    const a = angleFor(i);
    const lit = i === order;
    const hue = i === 4 ? "#ffb020" : i < 4 ? "#ff3b30" : "#25d366";

    // Lamba yuvası ve camı.
    const [lx, ly] = at(a, 0.75);
    const lr = size * 0.026;
    g.fillStyle = "#15181b";
    g.beginPath();
    g.arc(lx, ly, lr * 1.5, 0, Math.PI * 2);
    g.fill();
    if (lit) {
      const glow = g.createRadialGradient(lx, ly, 0, lx, ly, lr * 3.4);
      glow.addColorStop(0, hue);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      g.globalAlpha = 0.55;
      g.fillStyle = glow;
      g.beginPath();
      g.arc(lx, ly, lr * 3.4, 0, Math.PI * 2);
      g.fill();
      g.globalAlpha = 1;
    }
    g.fillStyle = lit ? hue : "rgba(255,255,255,.09)";
    g.beginPath();
    g.arc(lx, ly, lr, 0, Math.PI * 2);
    g.fill();
    if (!lit) {
      // Sönük lamba yine de rengini belli eder — kırmızı yarı, yeşil yarı.
      g.globalAlpha = 0.22;
      g.fillStyle = hue;
      g.beginPath();
      g.arc(lx, ly, lr, 0, Math.PI * 2);
      g.fill();
      g.globalAlpha = 1;
    }

    // Makinenin cevabı: emirle aynı kadranda, lambanın çevresindeki halka.
    if (i === answer) {
      g.strokeStyle = "#ffd45e";
      g.lineWidth = size * 0.008;
      g.beginPath();
      g.arc(lx, ly, lr * 2.05, 0, Math.PI * 2);
      g.stroke();
    }

    // Yazı ışın boyunca: tepede dik, uçlara doğru yatıyor (fotoğraftaki gibi).
    g.save();
    g.translate(...at(a, 0.5));
    g.rotate(i < 4 ? a + Math.PI : a);
    say(g, step.label, 0, 0, {
      size: size * (step.label === "STOP" ? 0.05 : 0.042),
      color: lit ? "#ffffff" : "rgba(226,236,244,.68)",
      align: "center",
      font: UI.sans,
      bold: true,
      baseline: "middle",
    });
    g.restore();
  });

  /* — kolun dişli yatağı: milin çevresindeki dar yay — */
  const rackR = R * 0.34;
  const leverHalf = TELEGRAPH_LEVER_SPAN / 2;
  g.strokeStyle = "rgba(10,12,14,.6)";
  g.lineWidth = R * 0.1;
  g.beginPath();
  g.arc(c, c, rackR, -Math.PI / 2 - leverHalf, -Math.PI / 2 + leverHalf);
  g.stroke();
  g.strokeStyle = "rgba(190,206,218,.3)";
  g.lineWidth = size * 0.004;
  for (let k = 0; k <= 8; k++) {
    const a = -Math.PI / 2 - leverHalf + (k / 8) * TELEGRAPH_LEVER_SPAN;
    g.beginPath();
    g.moveTo(...at(a, 0.3));
    g.lineTo(...at(a, 0.385));
    g.stroke();
  }

  /* — kolun mili ve künye — */
  const hub = g.createRadialGradient(c - R * 0.04, c - R * 0.06, R * 0.02, c, c, R * 0.2);
  hub.addColorStop(0, "#4c5257");
  hub.addColorStop(1, "#1b1e21");
  g.fillStyle = hub;
  g.beginPath();
  g.arc(c, c, R * 0.19, Math.PI, Math.PI * 2);
  g.closePath();
  g.fill();

  /*
   * Künye ve devir: yarım diskin iki alt köşesinde, çapa yakın.
   * Köşeye kadar itildiler çünkü uçtaki FULL yazıları da oraya yakın duruyor;
   * kolun altında da kalmıyorlar, kol en fazla ±63° yatıyor.
   */
  say(g, "ENGINE ORDER", c - R * 0.74, c - size * 0.024, {
    size: size * 0.028,
    color: "rgba(200,216,228,.5)",
    align: "center",
    font: UI.sans,
    bold: true,
  });
  say(g, `${Math.abs(t.shaftRpm).toFixed(0)} RPM`, c + R * 0.74, c - size * 0.024, {
    size: size * 0.03,
    color: UI.amber,
    align: "center",
  });
};

/** Cayro tekrarlayıcı: dönen pusula kartı, sabit lubber çizgisi. */
export const drawGyroRepeater: ScreenDraw = (g, size, _h, t) => {
  dialBase(g, size, "#0e1216");
  const c = size / 2;
  const R = size * 0.4;
  const heading = t.voyage.cogDeg;

  g.save();
  g.translate(c, c);
  g.rotate((-heading * Math.PI) / 180);
  for (let a = 0; a < 360; a += 5) {
    const rad = (a * Math.PI) / 180;
    const major = a % 30 === 0;
    g.strokeStyle = major ? "rgba(230,244,252,.9)" : "rgba(200,225,240,.45)";
    g.lineWidth = size * (major ? 0.012 : 0.006);
    g.beginPath();
    g.moveTo(Math.sin(rad) * R, -Math.cos(rad) * R);
    g.lineTo(Math.sin(rad) * (R - size * (major ? 0.055 : 0.03)), -Math.cos(rad) * (R - size * (major ? 0.055 : 0.03)));
    g.stroke();
    if (major) {
      g.save();
      g.translate(Math.sin(rad) * R * 0.76, -Math.cos(rad) * R * 0.76);
      g.rotate(rad);
      say(g, a === 0 ? "K" : String(a / 10).padStart(2, "0"), 0, size * 0.022, {
        size: size * 0.062,
        color: a === 0 ? "#ff6a5a" : "rgba(230,244,252,.85)",
        align: "center",
        bold: true,
      });
      g.restore();
    }
  }
  g.restore();

  // Lubber çizgisi ve dijital okuma.
  g.strokeStyle = "#ffc93c";
  g.lineWidth = size * 0.014;
  g.beginPath();
  g.moveTo(c, c - R - size * 0.03);
  g.lineTo(c, c - R + size * 0.08);
  g.stroke();

  g.fillStyle = "rgba(6,14,20,.9)";
  g.fillRect(c - size * 0.16, c - size * 0.07, size * 0.32, size * 0.14);
  say(g, fmt.deg(heading), c, c + size * 0.035, { size: size * 0.1, color: UI.green, align: "center", bold: true });
  say(g, "GYRO", c, c + size * 0.19, { size: size * 0.05, color: UI.faint, align: "center", font: UI.sans });
};

/** Dümen açısı göstergesi. */
export const drawRudderGauge: ScreenDraw = (g, size, _h, t) => {
  dialBase(g, size, "#e9e6df");
  const c = size / 2;
  const span = Math.PI * 1.05;
  for (let i = 0; i <= 14; i++) {
    const a = -Math.PI / 2 - span / 2 + (span * i) / 14;
    const major = i % 2 === 0;
    g.strokeStyle = "#1b1e22";
    g.lineWidth = size * (major ? 0.014 : 0.008);
    g.beginPath();
    g.moveTo(c + Math.cos(a) * size * 0.36, c + Math.sin(a) * size * 0.36);
    g.lineTo(c + Math.cos(a) * size * (major ? 0.28 : 0.31), c + Math.sin(a) * size * (major ? 0.28 : 0.31));
    g.stroke();
  }
  say(g, "RUDDER", c, size * 0.69, { size: size * 0.078, color: "#1b1e22", align: "center", font: UI.sans, bold: true });
  say(g, "PORT · STBD", c, size * 0.77, { size: size * 0.05, color: "#4a5057", align: "center", font: UI.sans });

  const a = -Math.PI / 2 + (t.rudderDeg / 35) * span;
  g.strokeStyle = "#c0392b";
  g.lineWidth = size * 0.02;
  g.beginPath();
  g.moveTo(c, c);
  g.lineTo(c + Math.cos(a) * size * 0.33, c + Math.sin(a) * size * 0.33);
  g.stroke();
  g.fillStyle = "#2b2f34";
  g.beginPath();
  g.arc(c, c, size * 0.035, 0, Math.PI * 2);
  g.fill();
};

/** Şaft devri göstergesi. */
export const drawRpmGauge: ScreenDraw = (g, size, _h, t) => {
  dialBase(g, size, "#e9e6df");
  const c = size / 2;
  const span = Math.PI * 1.5;
  for (let i = 0; i <= 12; i++) {
    const a = -Math.PI / 2 - span / 2 + (span * i) / 12;
    const major = i % 2 === 0;
    g.strokeStyle = "#1b1e22";
    g.lineWidth = size * (major ? 0.014 : 0.008);
    g.beginPath();
    g.moveTo(c + Math.cos(a) * size * 0.36, c + Math.sin(a) * size * 0.36);
    g.lineTo(c + Math.cos(a) * size * (major ? 0.28 : 0.31), c + Math.sin(a) * size * (major ? 0.28 : 0.31));
    g.stroke();
  }
  say(g, "RPM", c, size * 0.68, { size: size * 0.082, color: "#1b1e22", align: "center", font: UI.sans, bold: true });
  say(g, `${t.shaftRpm.toFixed(0)}`, c, size * 0.79, { size: size * 0.09, color: "#c0392b", align: "center", bold: true });

  const a = -Math.PI / 2 - span / 2 + span * Math.min(1, t.shaftRpm / 140);
  g.strokeStyle = "#1b1e22";
  g.lineWidth = size * 0.02;
  g.beginPath();
  g.moveTo(c, c);
  g.lineTo(c + Math.cos(a) * size * 0.33, c + Math.sin(a) * size * 0.33);
  g.stroke();
  g.fillStyle = "#2b2f34";
  g.beginPath();
  g.arc(c, c, size * 0.035, 0, Math.PI * 2);
  g.fill();
};
