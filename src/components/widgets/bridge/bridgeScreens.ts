import { compassName, douglasLabel } from "./marineConditions";
import { fmt, type BridgeTelemetry } from "./bridgeTelemetry";

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
 * X-bant ARPA: baş yukarı sunum, dönen tarama, iz bırakan hedefler.
 *
 * Tarama 24 devir/dakika — gerçek bir gemi radarının hızı. Hedefler
 * BridgeTelemetry'den geliyor, yani ECDIS'in AIS listesiyle aynı gemiler;
 * CPA/TCPA ile 0.5 milin altına düşen hedef kırmızıya döner ve köşede
 * çatışma uyarısı yanar.
 */
export const drawRadar: ScreenDraw = (g, w, h, t) => {
  const bar = chassis(g, w, h, "RADAR  X-BAND  ARPA", "TX ON");
  const cx = w / 2;
  const cy = bar + (h - bar) / 2;
  const R = Math.min(w, h - bar) * 0.45;
  const rangeNm = 6;

  const glow = g.createRadialGradient(cx, cy, 0, cx, cy, R);
  glow.addColorStop(0, "rgba(22,96,56,.55)");
  glow.addColorStop(1, "rgba(5,26,16,.25)");
  g.fillStyle = glow;
  g.beginPath();
  g.arc(cx, cy, R, 0, Math.PI * 2);
  g.fill();

  // Mesafe halkaları ve pusula taksimatı (baş yukarı → gerçek kuzey işaretli).
  g.strokeStyle = "rgba(80,240,150,.32)";
  g.lineWidth = 1.2;
  for (let i = 1; i <= 4; i++) {
    g.beginPath();
    g.arc(cx, cy, (R / 4) * i, 0, Math.PI * 2);
    g.stroke();
  }
  for (let a = 0; a < 360; a += 10) {
    const rad = (a * Math.PI) / 180;
    const long = a % 30 === 0;
    g.strokeStyle = `rgba(110,255,175,${long ? 0.7 : 0.32})`;
    g.beginPath();
    g.moveTo(cx + Math.sin(rad) * R, cy - Math.cos(rad) * R);
    g.lineTo(cx + Math.sin(rad) * (R - (long ? R * 0.06 : R * 0.03)), cy - Math.cos(rad) * (R - (long ? R * 0.06 : R * 0.03)));
    g.stroke();
  }

  // Kuzey oku: baş yukarı sunumda kuzey rotanın tersi kadar döner.
  const north = (-t.voyage.cogDeg * Math.PI) / 180;
  g.strokeStyle = "rgba(160,255,200,.8)";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(cx + Math.sin(north) * (R - R * 0.1), cy - Math.cos(north) * (R - R * 0.1));
  g.lineTo(cx + Math.sin(north) * R, cy - Math.cos(north) * R);
  g.stroke();
  say(g, "K", cx + Math.sin(north) * (R + R * 0.09), cy - Math.cos(north) * (R + R * 0.09) + 5, {
    size: R * 0.11,
    color: "#9dffc6",
    align: "center",
    bold: true,
  });

  // Kıyı yankısı — limana yaklaşırken kara ekrana girer.
  const shore = Math.max(0, 1 - Math.min(t.voyage.progress, 1 - t.voyage.progress) / 0.09);
  if (shore > 0.02) {
    const ahead = t.voyage.progress > 0.5;
    g.fillStyle = `rgba(120,255,170,${0.16 + shore * 0.45})`;
    for (let i = 0; i < 700; i++) {
      const spread = ((i * 2.399) % 1) * 2 - 1;
      const a = (ahead ? 0 : Math.PI) + spread * 0.9;
      const rr = R * (0.62 + ((i * 0.618) % 1) * 0.36) * (1 - shore * 0.25);
      g.fillRect(cx + Math.sin(a) * rr, cy - Math.cos(a) * rr, 2.5, 2.5);
    }
  }

  // Hedefler: eko + iz + vektör.
  let danger = 0;
  for (const target of t.traffic) {
    if (target.rangeNm > rangeNm) continue;
    const a = (target.relBearingDeg * Math.PI) / 180;
    const r = (target.rangeNm / rangeNm) * R;
    const x = cx + Math.sin(a) * r;
    const y = cy - Math.cos(a) * r;
    const close = target.cpaNm < 0.5 && target.tcpaMin > 0 && target.tcpaMin < 30;
    if (close) danger++;

    g.fillStyle = close ? "rgba(255,110,110,.95)" : "rgba(180,255,205,.95)";
    g.beginPath();
    g.arc(x, y, R * 0.017, 0, Math.PI * 2);
    g.fill();

    // Bağıl hareket vektörü: 6 dakikalık yol.
    const c = ((target.courseDeg - t.voyage.cogDeg) * Math.PI) / 180;
    const vx = Math.sin(c) * target.speedKt;
    const vy = Math.cos(c) * target.speedKt - t.voyage.sogKt;
    const scale = (0.1 / rangeNm) * R;
    g.strokeStyle = close ? "rgba(255,110,110,.8)" : "rgba(180,255,205,.65)";
    g.lineWidth = 1.6;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + vx * scale, y - vy * scale);
    g.stroke();
  }

  // Tarama süpürgesi — 24 d/d.
  const sweep = ((t.nowMs % 2500) / 2500) * Math.PI * 2;
  if (g.createConicGradient) {
    const cone = g.createConicGradient(sweep - Math.PI / 2, cx, cy);
    cone.addColorStop(0, "rgba(90,255,160,.34)");
    cone.addColorStop(0.12, "rgba(90,255,160,0)");
    cone.addColorStop(1, "rgba(90,255,160,0)");
    g.fillStyle = cone;
    g.beginPath();
    g.arc(cx, cy, R, 0, Math.PI * 2);
    g.fill();
  }
  g.strokeStyle = "rgba(170,255,200,.9)";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(cx, cy);
  g.lineTo(cx + Math.sin(sweep) * R, cy - Math.cos(sweep) * R);
  g.stroke();

  // Kendi gemimiz ve baş hattı.
  g.strokeStyle = "rgba(220,255,235,.9)";
  g.lineWidth = 1.6;
  g.beginPath();
  g.moveTo(cx, cy);
  g.lineTo(cx, cy - R);
  g.stroke();

  // Köşe okumaları.
  const s = R * 0.1;
  say(g, `RM(T)  ${rangeNm} NM`, w * 0.03, bar + s * 1.3, { size: s, color: "#9dffc6", bold: true });
  say(g, `HDG ${fmt.deg(t.voyage.cogDeg)}`, w * 0.03, bar + s * 2.6, { size: s * 0.9, color: "#9dffc6" });
  say(g, `SOG ${t.voyage.sogKt.toFixed(1)}`, w * 0.03, bar + s * 3.7, { size: s * 0.9, color: "#9dffc6" });
  say(g, `VRM ${(rangeNm / 2).toFixed(1)}`, w * 0.97, bar + s * 1.3, { size: s * 0.9, color: "#9dffc6", align: "right" });
  say(g, `EBL ${fmt.deg(t.voyage.bearingToWptDeg)}`, w * 0.97, bar + s * 2.4, {
    size: s * 0.9,
    color: "#9dffc6",
    align: "right",
  });
  say(g, `GAIN 72  SEA ${Math.min(9, Math.round(t.marine.douglas))}`, w * 0.97, bar + s * 3.5, {
    size: s * 0.8,
    color: "rgba(157,255,198,.7)",
    align: "right",
  });

  if (danger > 0 && Math.floor(t.nowMs / 600) % 2 === 0) {
    g.fillStyle = "rgba(255,60,60,.9)";
    g.fillRect(w * 0.28, h - s * 2.2, w * 0.44, s * 1.6);
    say(g, `${danger} HEDEF  CPA < 0.5 NM`, w / 2, h - s * 1.05, {
      size: s * 0.85,
      color: "#fff",
      align: "center",
      bold: true,
    });
  }
};

/* ─── ECDIS ─── */

/**
 * ECDIS: seferin gerçek rotasını çizen elektronik harita.
 *
 * Harita uydurma bir resim değil — voyage.ts'teki dönüş mevkileri enlem/boylam
 * olarak alınıp gemi merkezli bir Merkatör penceresine düşürülüyor. Gemi rotada
 * ilerledikçe harita altından kayıyor, geçilen dönüş mevkileri arkada kalıyor.
 */
export const drawEcdis: ScreenDraw = (g, w, h, t) => {
  const bar = chassis(g, w, h, "ECDIS  ROUTE MONITOR", t.voyage.arrived ? "MOORED" : "UNDER WAY");
  const side = w * 0.31;
  const mapW = w - side;
  const mapH = h - bar;
  const cx = mapW * 0.5;
  const cy = bar + mapH * 0.58;

  g.fillStyle = "#0a2233";
  g.fillRect(0, bar, mapW, mapH);

  // Ölçek: pencerenin yüksekliği rotanın kalan kısmını rahat gösterecek kadar.
  const spanNm = Math.max(6, Math.min(90, t.voyage.passage.totalNm * 0.42));
  const pxPerNm = (mapH * 0.8) / spanNm;
  const latScale = pxPerNm * 60; // 1° enlem = 60 NM
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

  // Pencerenin kapsadığı enlem/boylam aralığı — kontur ve iskandil rakamları
  // bunun içine dağıtılıyor. Mesafeden değil PENCEREDEN türetilmesinin sebebi:
  // ölçek sefere göre değişiyor, sabit bir serpme yarıçapı kısa seferde ekranı
  // taşırır, uzun seferde geminin üstünde bir yığın bırakırdı.
  const latSpanDeg = mapH / latScale;
  const lonSpanDeg = mapW / lonScale;

  g.save();
  g.beginPath();
  g.rect(0, bar, mapW, mapH);
  g.clip();

  // Derinlik konturları — mevkiye bağlı, ekranla birlikte kayıyor.
  g.strokeStyle = "rgba(120,190,225,.32)";
  g.lineWidth = 1.6;
  for (let i = -2; i <= 2; i++) {
    g.beginPath();
    for (let s = 0; s <= 24; s++) {
      const lat = t.voyage.lat + (s / 24 - 0.5) * latSpanDeg * 1.4;
      const lon = t.voyage.lon + i * lonSpanDeg * 0.42 + Math.sin(s * 0.7 + i) * lonSpanDeg * 0.08;
      const [x, y] = project(lat, lon);
      if (s === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    }
    g.stroke();
  }

  // İskandil rakamları.
  g.fillStyle = "rgba(150,205,235,.5)";
  g.font = `${Math.min(mapH * 0.045, mapW * 0.05)}px ${UI.mono}`;
  for (let i = 0; i < 30; i++) {
    const lat = t.voyage.lat + (((i * 0.618) % 1) - 0.5) * latSpanDeg * 1.2;
    const lon = t.voyage.lon + (((i * 0.377) % 1) - 0.5) * lonSpanDeg * 1.2;
    const [x, y] = project(lat, lon);
    g.fillText(String(Math.round(t.depthM * (0.6 + ((i * 0.313) % 1) * 0.9))), x, y);
  }

  // Planlanan rota.
  const wpts = t.voyage.passage.waypoints;
  g.strokeStyle = "#ff5f4d";
  g.lineWidth = 2.6;
  g.setLineDash([12, 7]);
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
    g.strokeStyle = passed ? "rgba(255,95,77,.4)" : "#ff5f4d";
    g.lineWidth = 2;
    g.beginPath();
    g.arc(x, y, mapH * 0.022, 0, Math.PI * 2);
    g.stroke();
    if (!passed && i === t.voyage.legIndex + 1) {
      say(g, `WP${i}`, x + mapH * 0.035, y + mapH * 0.02, { size: mapH * 0.05, color: "#ffb9ae" });
    }
  });

  /*
   * AIS hedefleri — radardaki gemilerin ta kendisi.
   *
   * Küçük ölçekte (uzun sefer, geniş pencere) gösterilmiyorlar: 6 millik bir
   * trafik alanı 90 millik pencerede birkaç pikselе sığar, sekiz üçgen kendi
   * gemimizin üstünde okunmaz bir yıldıza dönüşür. Gerçek ECDIS de belirli bir
   * ölçeğin altında hedef bastırma uygular — burada eşik 24 mil.
   */
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
    g.strokeStyle = target.cpaNm < 0.5 ? UI.red : "rgba(180,255,205,.85)";
    g.lineWidth = 1.8;
    const s = mapH * 0.026;
    g.beginPath();
    g.moveTo(0, -s * 1.5);
    g.lineTo(s, s);
    g.lineTo(-s, s);
    g.closePath();
    g.stroke();
    g.restore();
  }

  // Kendi gemimiz — rota yukarı sunumda hep dik.
  g.strokeStyle = "#39f07a";
  g.lineWidth = 2.6;
  g.beginPath();
  g.moveTo(cx, cy);
  g.lineTo(cx, cy - mapH * 0.22);
  g.stroke();
  g.beginPath();
  g.moveTo(cx - mapH * 0.028, cy + mapH * 0.045);
  g.lineTo(cx, cy - mapH * 0.05);
  g.lineTo(cx + mapH * 0.028, cy + mapH * 0.045);
  g.lineTo(cx, cy + mapH * 0.02);
  g.closePath();
  g.stroke();
  g.restore();

  // Yan bilgi paneli.
  box(g, mapW, bar, side, mapH, "rgba(6,18,28,.92)");
  const px = mapW + side * 0.08;
  let py = bar + mapH * 0.09;
  const line = mapH * 0.088;
  const fs = Math.min(side * 0.115, mapH * 0.062);

  const rows: Array<[string, string, string?]> = [
    ["POSN", fmt.lat(t.voyage.lat)],
    ["", fmt.lon(t.voyage.lon)],
    ["COG / SOG", `${fmt.deg(t.voyage.cogDeg)}  ${t.voyage.sogKt.toFixed(1)}kn`],
    ["NEXT WPT", `WP${t.voyage.legIndex + 1}  ${t.voyage.distanceToWptNm.toFixed(1)}NM`],
    ["XTE", `${Math.abs(t.voyage.xteNm).toFixed(3)} ${t.voyage.xteNm >= 0 ? "STBD" : "PORT"}`,
      Math.abs(t.voyage.xteNm) > 0.05 ? UI.amber : UI.green],
    ["TO GO", `${t.voyage.toGoNm.toFixed(1)} NM`],
    ["ETA", `${fmt.hhmm(t.voyage.eta)} UTC`],
    ["DEPTH", `${t.depthM.toFixed(1)} m`],
  ];
  rows.forEach(([label, value, color]) => {
    if (label) say(g, label, px, py, { size: fs * 0.78, color: UI.faint, font: UI.sans });
    say(g, value, px, py + (label ? fs * 1.05 : 0), { size: fs, color: color ?? UI.text });
    py += label ? line * 1.28 : line * 0.62;
  });

  // Alt şerit: seferin kendisi.
  const stripY = h - mapH * 0.075;
  g.fillStyle = "rgba(6,18,28,.92)";
  g.fillRect(0, stripY, mapW, h - stripY);
  say(
    g,
    `${t.voyage.route.from.name.toUpperCase()} → ${t.voyage.route.to.name.toUpperCase()}`,
    mapW * 0.02,
    h - mapH * 0.022,
    { size: mapH * 0.05, color: UI.accent, bold: true },
  );
  say(
    g,
    `AIS ${aisVisible ? "ON" : "SUPP"} · ${Math.round(t.voyage.progress * 100)}%`,
    mapW * 0.98,
    h - mapH * 0.022,
    { size: mapH * 0.05, color: UI.dim, align: "right" },
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

/**
 * Makine telgrafı: emir ve cevap ibreli klasik kadran.
 *
 * Kademeler gerçek bir telgrafın kademeleri; kırmızı ibre köprüüstünün emri,
 * sarı ibre makine dairesinin cevabı. İkisi arasındaki gecikme kasten var —
 * emir verilir, makine cevaplar.
 */
export const drawTelegraph: ScreenDraw = (g, size, _h, t) => {
  dialBase(g, size, "#161a1e");
  const c = size / 2;
  const R = size * 0.38;

  const orders = ["FULL\nASTERN", "HALF\nASTERN", "SLOW\nASTERN", "D.SLOW\nASTERN", "STOP", "D.SLOW\nAHEAD", "SLOW\nAHEAD", "HALF\nAHEAD", "FULL\nAHEAD"];
  const span = Math.PI * 1.55;
  const angleFor = (i: number) => -Math.PI / 2 - span / 2 + (span * i) / (orders.length - 1);

  orders.forEach((label, i) => {
    const a = angleFor(i);
    g.strokeStyle = i === 4 ? "rgba(255,255,255,.75)" : "rgba(200,220,235,.4)";
    g.lineWidth = size * (i === 4 ? 0.016 : 0.01);
    g.beginPath();
    g.moveTo(c + Math.cos(a) * R, c + Math.sin(a) * R);
    g.lineTo(c + Math.cos(a) * R * 0.86, c + Math.sin(a) * R * 0.86);
    g.stroke();
    label.split("\n").forEach((part, k) => {
      say(g, part, c + Math.cos(a) * R * 0.73, c + Math.sin(a) * R * 0.73 + k * size * 0.045 - size * 0.005, {
        size: size * 0.042,
        color: "rgba(220,235,245,.75)",
        align: "center",
        font: UI.sans,
        bold: true,
      });
    });
  });

  const orderIndex = t.telegraphOrder === "STOP" ? 4 : 8;
  // Cevap ibresi emri bir tık gecikmeyle izliyor.
  const answer = orderIndex + (Math.sin(t.nowMs / 3000) > 0.97 ? -1 : 0);

  const needle = (index: number, color: string, length: number, width: number) => {
    const a = angleFor(index);
    g.strokeStyle = color;
    g.lineWidth = size * width;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(c, c);
    g.lineTo(c + Math.cos(a) * R * length, c + Math.sin(a) * R * length);
    g.stroke();
    g.lineCap = "butt";
  };
  needle(answer, "#ffc93c", 0.72, 0.03);
  needle(orderIndex, "#e0402f", 0.88, 0.022);

  g.fillStyle = "#2a2f34";
  g.beginPath();
  g.arc(c, c, size * 0.045, 0, Math.PI * 2);
  g.fill();

  say(g, "ENGINE ORDER", c, size * 0.86, { size: size * 0.05, color: "rgba(220,235,245,.8)", align: "center", font: UI.sans, bold: true });
  say(g, `${t.shaftRpm.toFixed(0)} RPM`, c, size * 0.92, { size: size * 0.05, color: UI.amber, align: "center" });
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
