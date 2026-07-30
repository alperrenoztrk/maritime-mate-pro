/**
 * SVG metin yerleşim kontrolü.
 *
 * Diyagram SVG'lerindeki <text> etiketleri elle konumlandırılmıştır; metin
 * çevrildiğinde genişlik değişir ve etiketler tuvalden/panelden taşabilir ya
 * da birbiriyle çakışabilir. Bu kontrol, Liberation Sans (Arial ile metrik
 * olarak birebir) advance genişliklerini TTF'den okuyup her <text> düğümünün
 * kapladığı yatay aralığı hesaplar ve şunları doğrular:
 *
 *   A. viewBox içinde kalma
 *   B. saran panel <rect> içinde kalma
 *   C. aynı ata <g> ve aynı taban çizgisindeki kardeşlerle çakışmama
 *   D. kalan Türkçe metin olmaması
 *   E. src/assets ve public/diagrams altındaki kopya çiftlerinin eşit kalması
 *
 * A-C için mutlak değil *baseline-diff* modu kullanılır: depoda çeviriden önce
 * de taşan dosyalar var, bu yüzden yalnızca YENİ ihlaller hata sayılır.
 *
 * İhlaller metin İÇERİĞİYLE değil, düğümün YUVARLANMIŞ KONUMUYLA anahtarlanır —
 * aksi halde bir etiketi çevirmek, geometrisi hiç değişmemiş mevcut bir ihlali
 * "yeni" gösterirdi. Baseline, çeviri öncesi durumu yansıtması için varsayılan
 * olarak `origin/main` ref'inden okunur.
 *
 * Baseline'ı yenilemek için:
 *   node scripts/check-svg-text-fit.mjs --write-baseline [<git-ref>]
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const BASELINE_PATH = path.join(root, "scripts/svg-text-fit-baseline.json");

// ─── TTF advance genişlik okuyucu ────────────────────────────────────────────
// head (unitsPerEm), hhea (numberOfHMetrics), hmtx (advanceWidth), cmap
// (format 4 karakter -> glyph) tablolarını okur. Harici bağımlılık yok.
const FONT_DIR = "/usr/share/fonts/truetype/liberation";

const parseFont = (file) => {
  const b = fs.readFileSync(file);
  const numTables = b.readUInt16BE(4);
  const tables = {};
  for (let i = 0; i < numTables; i++) {
    const o = 12 + i * 16;
    tables[b.toString("ascii", o, o + 4)] = {
      offset: b.readUInt32BE(o + 8),
      length: b.readUInt32BE(o + 12),
    };
  }
  const unitsPerEm = b.readUInt16BE(tables.head.offset + 18);
  const numberOfHMetrics = b.readUInt16BE(tables.hhea.offset + 34);

  const advances = [];
  for (let i = 0; i < numberOfHMetrics; i++) {
    advances.push(b.readUInt16BE(tables.hmtx.offset + i * 4));
  }

  // cmap: Unicode (platform 3 encoding 1 veya 0) format 4 alt tablosu
  const cmapOffset = tables.cmap.offset;
  const numSubtables = b.readUInt16BE(cmapOffset + 2);
  let best = null;
  for (let i = 0; i < numSubtables; i++) {
    const rec = cmapOffset + 4 + i * 8;
    const platform = b.readUInt16BE(rec);
    const encoding = b.readUInt16BE(rec + 2);
    const offset = cmapOffset + b.readUInt32BE(rec + 4);
    if (platform === 3 && (encoding === 1 || encoding === 10)) best = offset;
    else if (best === null && platform === 0) best = offset;
  }
  const map = new Map();
  if (best !== null && b.readUInt16BE(best) === 4) {
    const segCountX2 = b.readUInt16BE(best + 6);
    const segCount = segCountX2 / 2;
    const endO = best + 14;
    const startO = endO + segCountX2 + 2;
    const deltaO = startO + segCountX2;
    const rangeO = deltaO + segCountX2;
    for (let s = 0; s < segCount; s++) {
      const end = b.readUInt16BE(endO + s * 2);
      const start = b.readUInt16BE(startO + s * 2);
      const delta = b.readInt16BE(deltaO + s * 2);
      const rangeOffset = b.readUInt16BE(rangeO + s * 2);
      if (start === 0xffff) continue;
      for (let c = start; c <= end && c !== 0x10000; c++) {
        let g;
        if (rangeOffset === 0) {
          g = (c + delta) & 0xffff;
        } else {
          const gi = rangeO + s * 2 + rangeOffset + (c - start) * 2;
          if (gi + 1 >= b.length) continue;
          g = b.readUInt16BE(gi);
          if (g !== 0) g = (g + delta) & 0xffff;
        }
        if (g !== 0) map.set(c, g);
      }
    }
  }
  return { unitsPerEm, advances, map };
};

const fonts = {
  regular: parseFont(path.join(FONT_DIR, "LiberationSans-Regular.ttf")),
  bold: parseFont(path.join(FONT_DIR, "LiberationSans-Bold.ttf")),
};

/** Bir dizenin em cinsinden genişliği. Fontta olmayan glifler için '?' payı. */
const emWidth = (text, bold) => {
  const f = bold ? fonts.bold : fonts.regular;
  const fallback = f.map.get(0x3f) ?? 0;
  let total = 0;
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    const g = f.map.get(cp) ?? fallback;
    total += f.advances[g] ?? f.advances[f.advances.length - 1];
  }
  return total / f.unitsPerEm;
};

// ─── SVG ayrıştırma ──────────────────────────────────────────────────────────
const decodeEntities = (s) =>
  s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");

const attrs = (tag) => {
  const out = {};
  for (const m of tag.matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)) out[m[1]] = m[2];
  return out;
};

/**
 * <style> bloklarındaki basit sınıf seçicilerini toplar. CSS `font:` kısayolu
 * font-size ve font-weight taşıdığı için açılır. NOT: gerçek tarayıcıda
 * <style> kuralı presentation attribute'unu YENER — burada da öyle yapılır.
 */
const parseStyles = (svg) => {
  const rules = new Map();
  for (const block of svg.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
    for (const r of block[1].matchAll(/\.([\w-]+)\s*\{([^}]*)\}/g)) {
      const [, cls, body] = r;
      const decl = rules.get(cls) ?? {};
      const shorthand = body.match(/(?:^|;)\s*font\s*:\s*([^;]+)/);
      if (shorthand) {
        const v = shorthand[1];
        const size = v.match(/(\d+(?:\.\d+)?)px/);
        if (size) decl.fontSize = parseFloat(size[1]);
        const w = v.match(/\b(bold|[6-9]00)\b/);
        if (w) decl.bold = true;
      }
      const size = body.match(/(?:^|;)\s*font-size\s*:\s*(\d+(?:\.\d+)?)px/);
      if (size) decl.fontSize = parseFloat(size[1]);
      const weight = body.match(/(?:^|;)\s*font-weight\s*:\s*(\w+)/);
      if (weight) decl.bold = /bold|[6-9]00/.test(weight[1]);
      const anchor = body.match(/(?:^|;)\s*text-anchor\s*:\s*(\w+)/);
      if (anchor) decl.anchor = anchor[1];
      rules.set(cls, decl);
    }
  }
  return rules;
};

const applyTransform = (state, transform) => {
  if (!transform) return state;
  let { tx, ty, scale, rotated } = state;
  for (const m of transform.matchAll(/(translate|scale|rotate)\s*\(([^)]*)\)/g)) {
    const nums = m[2].trim().split(/[\s,]+/).map(Number);
    if (m[1] === "translate") {
      tx += (nums[0] || 0) * scale;
      ty += (nums[1] || 0) * scale;
    } else if (m[1] === "scale") {
      scale *= nums[0] || 1;
    } else if (m[1] === "rotate") {
      // ±90°'ye yakın dönme genişliği Y eksenine taşır.
      if (Math.abs(Math.abs(nums[0] || 0) - 90) < 15) rotated = true;
    }
  }
  return { tx, ty, scale, rotated };
};

/**
 * SVG'yi düz tarayarak <text> düğümlerinin ölçülmüş yatay aralığını,
 * <rect> panellerini ve ata <g> yolunu çıkarır.
 */
const parseSvg = (svg) => {
  const rootTag = svg.match(/<svg[^>]*>/)[0];
  const rootAttrs = attrs(rootTag);
  const vb = (rootAttrs.viewBox || "0 0 0 0").trim().split(/[\s,]+/).map(Number);
  const [vbX, vbY, vbW, vbH] = vb;
  const styles = parseStyles(svg);

  const texts = [];
  const rects = [];
  let state = { tx: 0, ty: 0, scale: 1, rotated: false };
  const stack = [];
  const gPath = [];
  let gCounter = 0;

  const tagRe = /<(\/?)([\w:-]+)([^>]*?)(\/?)>|<!--[\s\S]*?-->/g;
  let m;
  while ((m = tagRe.exec(svg))) {
    if (m[0].startsWith("<!--")) continue;
    const [, closing, name, rawAttrs, selfClose] = m;

    if (closing) {
      if (name === "g") {
        state = stack.pop() ?? state;
        gPath.pop();
      }
      continue;
    }

    const a = attrs(rawAttrs);

    if (name === "g" && !selfClose) {
      stack.push(state);
      state = applyTransform(state, a.transform);
      gPath.push(`g${gCounter++}`);
      // <g> düzeyindeki metin öznitelikleri mirasa girer. <g class="sm"> gibi
      // ata SINIFLARI da miras alınmalı — bu dosyalarda yaygın bir kalıp ve
      // atlanırsa metin varsayılan 16px ile ölçülüp hayalet taşma üretir.
      const gCls = (a.class || "").split(/\s+/).filter(Boolean);
      const gDecl = gCls.reduce((acc, c) => ({ ...acc, ...(styles.get(c) ?? {}) }), {});
      state = {
        ...state,
        gFontSize:
          gDecl.fontSize ??
          (a["font-size"] ? parseFloat(a["font-size"]) : undefined) ??
          state.gFontSize,
        gAnchor: gDecl.anchor ?? a["text-anchor"] ?? state.gAnchor,
        gBold:
          gDecl.bold ??
          (a["font-weight"] ? /bold|[6-9]00/.test(a["font-weight"]) : undefined) ??
          state.gBold,
      };
      continue;
    }

    if (name === "rect") {
      const w = parseFloat(a.width);
      const h = parseFloat(a.height);
      if (Number.isFinite(w) && Number.isFinite(h)) {
        const local = applyTransform(state, a.transform);
        rects.push({
          x: local.tx + (parseFloat(a.x) || 0) * local.scale,
          y: local.ty + (parseFloat(a.y) || 0) * local.scale,
          w: w * local.scale,
          h: h * local.scale,
        });
      }
      continue;
    }

    if (name === "text") {
      // <text> gövdesini al (tagRe'yi ileri sarmadan)
      const bodyStart = m.index + m[0].length;
      const close = svg.indexOf("</text>", bodyStart);
      if (close === -1) continue;
      const raw = svg.slice(bodyStart, close);
      const content = decodeEntities(raw.replace(/<[^>]*>/g, "")).trim();
      if (!content) continue;

      const local = applyTransform(state, a.transform);
      const cls = (a.class || "").split(/\s+/).filter(Boolean);
      const clsDecl = cls.reduce(
        (acc, c) => ({ ...acc, ...(styles.get(c) ?? {}) }),
        {},
      );

      // Öncelik: CSS sınıfı > eleman özniteliği > <g> mirası > 16px varsayılan
      const fontSize =
        clsDecl.fontSize ??
        (a["font-size"] ? parseFloat(a["font-size"]) : undefined) ??
        state.gFontSize ??
        16;
      const bold =
        clsDecl.bold ??
        (a["font-weight"] ? /bold|[6-9]00/.test(a["font-weight"]) : undefined) ??
        state.gBold ??
        false;
      const anchor =
        clsDecl.anchor ?? a["text-anchor"] ?? state.gAnchor ?? "start";

      const width = emWidth(content, bold) * fontSize * local.scale;
      const x = local.tx + (parseFloat(a.x) || 0) * local.scale;
      const y = local.ty + (parseFloat(a.y) || 0) * local.scale;
      const left =
        anchor === "middle" ? x - width / 2 : anchor === "end" ? x - width : x;

      texts.push({
        content,
        anchorX: x,
        left,
        right: left + width,
        y,
        width,
        fontSize,
        rotated: local.rotated,
        gPath: gPath.join("/"),
      });
    }
  }

  return { vbX, vbY, vbW, vbH, texts, rects };
};

// ─── İhlal toplama ───────────────────────────────────────────────────────────
const PANEL_PAD = 6;
const EPS = 0.5;

const violationsFor = (file, svg) => {
  const { vbX, vbY, vbW, vbH, texts, rects } = parseSvg(svg);
  if (!vbW || !vbH) return [];
  const out = [];
  const canvasArea = vbW * vbH;

  // İhlal anahtarı düğümün konumundan türetilir, metninden DEĞİL — böylece bir
  // etiketi çevirmek geometrisi değişmemiş mevcut ihlali "yeni" göstermez.
  const at = (t) => `${t.anchorX.toFixed(0)},${t.y.toFixed(0)}`;
  const add = (key, detail) => out.push({ key, detail });

  for (const t of texts) {
    if (t.rotated) {
      // Döndürülmüş etiketlerde genişlik Y eksenine düşer.
      if (t.width > vbH - PANEL_PAD) {
        add(
          `rot@${at(t)}`,
          `${t.content} :: rotated label ${t.width.toFixed(1)}px > canvas height ${vbH}`,
        );
      }
      continue;
    }

    // A. viewBox içinde kalma
    if (t.left < vbX - EPS) {
      add(`vbL@${at(t)}`, `${t.content} :: overflows left by ${(vbX - t.left).toFixed(1)}px`);
    } else if (t.right > vbX + vbW + EPS) {
      add(
        `vbR@${at(t)}`,
        `${t.content} :: overflows right by ${(t.right - vbX - vbW).toFixed(1)}px`,
      );
    }

    // B. saran panel <rect> içinde kalma (tam-tuval arka plan rect'i hariç).
    // Panel, metnin BAŞLANGIÇ noktasını içeren en küçük rect'tir; metnin kendi
    // genişliğine göre seçilmez, aksi halde uzayan bir metin sessizce daha
    // geniş bir panele "terfi" edip ihlali gizler.
    let panel = null;
    for (const r of rects) {
      if (r.w * r.h > canvasArea * 0.97) continue;
      if (
        t.anchorX >= r.x &&
        t.anchorX <= r.x + r.w &&
        t.y >= r.y &&
        t.y <= r.y + r.h
      ) {
        if (!panel || r.w * r.h < panel.w * panel.h) panel = r;
      }
    }
    if (panel) {
      if (t.left < panel.x + PANEL_PAD - EPS || t.right > panel.x + panel.w - PANEL_PAD + EPS) {
        add(
          `panel@${at(t)}`,
          `${t.content} :: escapes panel [${panel.x.toFixed(0)}..${(panel.x + panel.w).toFixed(0)}]`,
        );
      }
    }
  }

  // C. aynı ata <g> + aynı taban çizgisindeki kardeşlerle çakışma
  const rows = new Map();
  for (const t of texts) {
    if (t.rotated) continue;
    const key = `${t.gPath}@${Math.round(t.y / 4)}`;
    if (!rows.has(key)) rows.set(key, []);
    rows.get(key).push(t);
  }
  for (const group of rows.values()) {
    if (group.length < 2) continue;
    const sorted = [...group].sort((a, b) => a.left - b.left);
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i].left < sorted[i - 1].right - EPS) {
        add(
          `collide@${at(sorted[i - 1])}|${at(sorted[i])}`,
          `${sorted[i - 1].content} | ${sorted[i].content} :: same-row collision`,
        );
      }
    }
  }

  return out;
};

// ─── Dosya toplama ───────────────────────────────────────────────────────────
const walk = (dir, acc = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith(".svg")) acc.push(path.relative(root, p));
  }
  return acc;
};

const svgFiles = [...walk(path.join(root, "src/assets")), ...walk(path.join(root, "public"))].sort();

const current = {};
for (const rel of svgFiles) {
  const svg = fs.readFileSync(path.join(root, rel), "utf8");
  const v = violationsFor(rel, svg);
  if (v.length) current[rel] = v;
}

// --write-baseline: çeviri öncesi durumu yansıtması için dosyalar varsayılan
// olarak `origin/main` ref'inden okunur, çalışma kopyasından değil.
if (process.argv.includes("--write-baseline")) {
  const refArg = process.argv[process.argv.indexOf("--write-baseline") + 1];
  const ref = refArg && !refArg.startsWith("--") ? refArg : "origin/main";
  const baseline = {};
  let missing = 0;
  for (const rel of svgFiles) {
    let svg;
    try {
      svg = execFileSync("git", ["show", `${ref}:${rel}`], {
        encoding: "utf8",
        maxBuffer: 32 * 1024 * 1024,
      });
    } catch {
      missing++;
      continue; // ref'te olmayan dosya (yeni eklenmiş) — baseline'ı yok
    }
    const v = violationsFor(rel, svg);
    if (v.length) baseline[rel] = v.map((x) => x.key);
  }
  fs.writeFileSync(BASELINE_PATH, `${JSON.stringify(baseline, null, 2)}\n`);
  const total = Object.values(baseline).reduce((n, v) => n + v.length, 0);
  console.log(
    `Baseline written from ${ref}: ${Object.keys(baseline).length} files, ` +
      `${total} pre-existing violations${missing ? `, ${missing} file(s) absent in ref` : ""}.`,
  );
  process.exit(0);
}

const failures = [];

// A-C: yalnızca baseline'da olmayan YENİ ihlaller hata sayılır.
const baseline = fs.existsSync(BASELINE_PATH)
  ? JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"))
  : {};
for (const [file, list] of Object.entries(current)) {
  const known = new Set(baseline[file] ?? []);
  for (const v of list) {
    if (!known.has(v.key)) failures.push(`[fit] ${file}: ${v.detail}`);
  }
}

// D. Kalan Türkçe metin: <text>, <title>, <desc> gövdeleri.
const TURKISH_CHARS = /[ıİşŞğĞçÇöÖüÜâÂîÎû]/;
// Diakritiksiz Türkçe (deniz, mevkii, rota…) sırf karakter taramasıyla
// yakalanmaz, bu yüzden ayrıca bir kelime listesi gerekiyor.
//
// NOT: "her" bilinçli olarak listede yok — İngilizcede de bir kelime ve
// denizcilik İngilizcesinde gemiler için sürekli kullanılıyor ("on her port
// side"), bu yüzden yanlış pozitif üretiyordu. Aynı gerekçeyle "mile", "port"
// gibi ortak yazımlar da listeye alınmadı.
const TURKISH_WORDS = new RegExp(
  "(?:^|[^\\p{L}])(?:" +
    [
      // sık işlev kelimeleri
      "ve", "veya", "için", "ile", "bir", "olan", "arası", "göre", "daha",
      "kadar", "gibi", "değil", "olarak", "sonra", "önce", "bu", "şu",
      // diakritiksiz denizcilik/eğitim terimleri
      "deniz", "denizi", "mili", "mevki", "mevkii", "rota", "rotasi", "gemi",
      "gemisi", "saat", "sabit", "kanal", "harita", "yol", "hat", "kural",
      "sekil", "sekli", "tablo", "ornek", "adim", "yukari", "asagi", "sag",
      "sol", "sistem", "sistemi", "birim", "toplam", "orta", "genel",
    ].join("|") +
    ")(?=[^\\p{L}]|$)",
  "iu",
);
for (const rel of svgFiles) {
  const svg = fs.readFileSync(path.join(root, rel), "utf8");
  for (const m of svg.matchAll(/<(text|title|desc)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    const body = decodeEntities(m[2].replace(/<[^>]*>/g, "")).trim();
    if (!body) continue;
    if (TURKISH_CHARS.test(body)) {
      failures.push(`[tr] ${rel}: Turkish characters in <${m[1]}>: "${body}"`);
    } else if (TURKISH_WORDS.test(body)) {
      failures.push(`[tr] ${rel}: Turkish stopword in <${m[1]}>: "${body}"`);
    }
  }
}

// E. src/assets ve public/diagrams altındaki kopya çiftleri eşit kalmalı.
const DUPLICATE_PAIRS = [
  "compass.svg",
  "ecdis-display.svg",
  "gps-satellites.svg",
  "great-circle-vs-rhumb.svg",
  "iala-lateral-marks.svg",
  "mercator-projection.svg",
  "tide-current.svg",
];
const md5 = (p) => crypto.createHash("md5").update(fs.readFileSync(p)).digest("hex");
for (const name of DUPLICATE_PAIRS) {
  const a = path.join(root, "src/assets/navigation", name);
  const b = path.join(root, "public/diagrams/navigation", name);
  if (!fs.existsSync(a) || !fs.existsSync(b)) {
    failures.push(`[dup] Missing one side of duplicate pair: ${name}`);
  } else if (md5(a) !== md5(b)) {
    failures.push(
      `[dup] ${name} differs between src/assets/navigation and public/diagrams/navigation`,
    );
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  console.error(`\n${failures.length} problem(s) found.`);
  process.exit(1);
}

console.log(
  `SVG text checks passed: ${svgFiles.length} files measured, ${DUPLICATE_PAIRS.length} duplicate pairs in sync, no Turkish text remaining.`,
);
