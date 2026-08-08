#!/usr/bin/env node
/**
 * Uluslararası İşaret Kodu (ICS) bayrak ve flamalarının SVG üreticisi.
 *
 * Çıktı: public/flags/*.svg — 26 harf bayrağı, 10 rakam flaması,
 * 3 ikame flaması ve 1 cevap flaması (toplam 40 dosya).
 *
 * Neden üretici script: 40 dosyayı elle yazmak hem hataya açık hem de
 * bakımı imkânsız. Geometri burada TEK yerde tanımlı; bir renk paleti
 * değişikliği tüm seti tutarlı biçimde yeniler.
 *
 * Geometri doğrulaması: her tasarım, Wikimedia Commons üzerindeki ICS
 * çizimlerinin vektör kaynağından okunan koordinatlarla karşılaştırılarak
 * doğrulanmıştır (ör. November'ın 4x4 damasında mavi kare ÜST-MANDAR köşede
 * başlar; Oscar'ın köşegeni sol-üstten sağ-alta iner ve kırmızı üst-sancak
 * üçgenidir). Dosyalar özgün olarak burada çizilir; hiçbir dış dosya
 * kopyalanmaz. Bayrak tasarımlarının kendisi uluslararası bir standarttır.
 *
 * Kullanım: node scripts/generate-signal-flag-svgs.mjs
 */
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "public/flags");

// Denizcilik işaret bayrağı paleti. Saf #f00/#00f yerine hafif kırılmış
// tonlar: hem basılı ICS kartlarına daha yakın hem de koyu temada göz
// yormuyor. Sarı ile turuncunun karışmaması için sarı yüksek doygunlukta.
const C = {
  red: "#D8232A",
  blue: "#0B4EA2",
  yellow: "#FFCC00",
  black: "#1A1A1A",
  white: "#FFFFFF",
};

/** Kare bayrak tuvali. */
const SQ = 600;
/** Sivri (tapered) flama tuvali — rakam flamaları ve cevap flaması. */
const PEN_W = 600;
const PEN_H = 340;
/** Üçgen flama tuvali — ikame flamaları. */
const TRI_W = 600;
const TRI_H = 340;

/** Kare bayrağın dış hattı. */
const squareOutline = `M0,0h${SQ}v${SQ}H0z`;
/** Kırlangıç kuyruklu (swallowtail) bayrağın dış hattı. */
const swallowOutline = `M0,0h${SQ}l-${SQ * 0.25},${SQ / 2}l${SQ * 0.25},${SQ / 2}H0z`;
/** Sivri uçlu flama: mandardan fly'a doğru daralır, uç küt kalır. */
const pennantOutline = `M0,0L${PEN_W},${PEN_H * 0.25}v${PEN_H * 0.5}L0,${PEN_H}z`;
/** Üçgen flama: fly ucunda tek noktada birleşir. */
const triangleOutline = `M0,0L${TRI_W},${TRI_H / 2}L0,${TRI_H}z`;

/**
 * Bir şekli bayrağın dış hattıyla kırpar. clipPath kullanmak, her tasarımın
 * ayrı ayrı kırlangıç/sivri uç geometrisi hesaplamasını gereksiz kılar.
 */
const wrap = ({ id, title, width, height, outline, body }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="t-${id}">
<title id="t-${id}">${title}</title>
<defs><clipPath id="c-${id}"><path d="${outline}"/></clipPath></defs>
<g clip-path="url(#c-${id})">${body}</g>
<path d="${outline}" fill="none" stroke="#00000055" stroke-width="6"/>
</svg>
`;

const rect = (x, y, w, h, fill) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;
const poly = (points, fill) => `<path d="M${points.map(([x, y]) => `${x},${y}`).join("L")}z" fill="${fill}"/>`;
const circle = (cx, cy, r, fill) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;

/** Yatay bantlar: oranlar toplamı 1 olmalı. */
const hBands = (bands, size = SQ) => {
  let y = 0;
  return bands
    .map(([fill, ratio]) => {
      const h = size * ratio;
      const out = rect(0, y, size, h, fill);
      y += h;
      return out;
    })
    .join("");
};

/** Dikey bantlar. */
const vBands = (bands, size = SQ) => {
  let x = 0;
  return bands
    .map(([fill, ratio]) => {
      const w = size * ratio;
      const out = rect(x, 0, w, size, fill);
      x += w;
      return out;
    })
    .join("");
};

/** Ortalanmış Yunan haçı. */
const cross = (fill, thickness = 0.2, size = SQ) => {
  const t = size * thickness;
  const o = (size - t) / 2;
  return rect(0, o, size, t, fill) + rect(o, 0, t, size, fill);
};

/** Çapraz haç (saltire / X). */
const saltire = (fill, thickness = 0.175, size = SQ) =>
  `<g stroke="${fill}" stroke-width="${size * thickness}"><path d="M0,0L${size},${size}"/><path d="M0,${size}L${size},0"/></g>`;

/** Dörde bölünmüş bayrak: [sol-üst, sağ-üst, sol-alt, sağ-alt]. */
const quarters = ([tl, tr, bl, br], size = SQ) =>
  rect(0, 0, size / 2, size / 2, tl) +
  rect(size / 2, 0, size / 2, size / 2, tr) +
  rect(0, size / 2, size / 2, size / 2, bl) +
  rect(size / 2, size / 2, size / 2, size / 2, br);

/** N x N dama deseni; ilk kare (üst-mandar) `first` rengiyle başlar. */
const checker = (n, first, second, size = SQ) => {
  const cell = size / n;
  let out = rect(0, 0, size, size, second);
  for (let r = 0; r < n; r += 1) {
    for (let c = 0; c < n; c += 1) {
      if ((r + c) % 2 === 0) out += rect(c * cell, r * cell, cell, cell, first);
    }
  }
  return out;
};

// ─── 26 harf bayrağı ─────────────────────────────────────────────────────────
// Her giriş: [dosya adı, İngilizce başlık, gövde, dış hat]
const LETTERS = [
  ["a", "Signal flag Alfa", vBands([[C.white, 0.5], [C.blue, 0.5]]), swallowOutline],
  ["b", "Signal flag Bravo", rect(0, 0, SQ, SQ, C.red), swallowOutline],
  ["c", "Signal flag Charlie", hBands([[C.blue, 0.2], [C.white, 0.2], [C.red, 0.2], [C.white, 0.2], [C.blue, 0.2]]), squareOutline],
  ["d", "Signal flag Delta", hBands([[C.yellow, 0.2], [C.blue, 0.6], [C.yellow, 0.2]]), squareOutline],
  ["e", "Signal flag Echo", hBands([[C.blue, 0.5], [C.red, 0.5]]), squareOutline],
  [
    "f",
    "Signal flag Foxtrot",
    rect(0, 0, SQ, SQ, C.white) + poly([[SQ / 2, 0], [SQ, SQ / 2], [SQ / 2, SQ], [0, SQ / 2]], C.red),
    squareOutline,
  ],
  [
    "g",
    "Signal flag Golf",
    vBands([[C.yellow, 1 / 6], [C.blue, 1 / 6], [C.yellow, 1 / 6], [C.blue, 1 / 6], [C.yellow, 1 / 6], [C.blue, 1 / 6]]),
    squareOutline,
  ],
  ["h", "Signal flag Hotel", vBands([[C.white, 0.5], [C.red, 0.5]]), squareOutline],
  ["i", "Signal flag India", rect(0, 0, SQ, SQ, C.yellow) + circle(SQ / 2, SQ / 2, SQ * 0.25, C.black), squareOutline],
  ["j", "Signal flag Juliett", hBands([[C.blue, 1 / 3], [C.white, 1 / 3], [C.blue, 1 / 3]]), squareOutline],
  ["k", "Signal flag Kilo", vBands([[C.yellow, 0.5], [C.blue, 0.5]]), squareOutline],
  ["l", "Signal flag Lima", quarters([C.yellow, C.black, C.black, C.yellow]), squareOutline],
  ["m", "Signal flag Mike", rect(0, 0, SQ, SQ, C.blue) + saltire(C.white), squareOutline],
  ["n", "Signal flag November", checker(4, C.blue, C.white), squareOutline],
  [
    "o",
    "Signal flag Oscar",
    // Köşegen sol-üstten sağ-alta iner: kırmızı üst-sancak, sarı alt-mandar.
    rect(0, 0, SQ, SQ, C.red) + poly([[0, 0], [0, SQ], [SQ, SQ]], C.yellow),
    squareOutline,
  ],
  [
    "p",
    "Signal flag Papa",
    rect(0, 0, SQ, SQ, C.blue) + rect(SQ / 3, SQ / 3, SQ / 3, SQ / 3, C.white),
    squareOutline,
  ],
  ["q", "Signal flag Quebec", rect(0, 0, SQ, SQ, C.yellow), squareOutline],
  ["r", "Signal flag Romeo", rect(0, 0, SQ, SQ, C.red) + cross(C.yellow), squareOutline],
  [
    "s",
    "Signal flag Sierra",
    rect(0, 0, SQ, SQ, C.white) + rect(SQ / 3, SQ / 3, SQ / 3, SQ / 3, C.blue),
    squareOutline,
  ],
  ["t", "Signal flag Tango", vBands([[C.red, 1 / 3], [C.white, 1 / 3], [C.blue, 1 / 3]]), squareOutline],
  ["u", "Signal flag Uniform", quarters([C.red, C.white, C.white, C.red]), squareOutline],
  ["v", "Signal flag Victor", rect(0, 0, SQ, SQ, C.white) + saltire(C.red), squareOutline],
  [
    "w",
    "Signal flag Whiskey",
    rect(0, 0, SQ, SQ, C.blue) + rect(SQ * 0.2, SQ * 0.2, SQ * 0.6, SQ * 0.6, C.white) + rect(SQ * 0.4, SQ * 0.4, SQ * 0.2, SQ * 0.2, C.red),
    squareOutline,
  ],
  ["x", "Signal flag X-ray", rect(0, 0, SQ, SQ, C.white) + cross(C.blue), squareOutline],
  [
    "y",
    "Signal flag Yankee",
    // Çapraz şeritler (bendy sinister): sol-alttan sağ-üste inen sarı/kırmızı
    // bantlar. 10 bant → 5 sarı şerit, aralarında kırmızı zemin görünür.
    rect(0, 0, SQ, SQ, C.red) +
      `<g stroke="${C.yellow}" stroke-width="${(SQ * Math.SQRT2) / 10}">` +
      Array.from({ length: 5 }, (_, i) => {
        // Şerit merkezleri köşegen boyunca eşit aralıklı; tuval dışına taşan
        // uçları clipPath keser.
        const offset = ((2 * i + 1) * SQ) / 5 - SQ;
        return `<path d="M${offset},${SQ}L${offset + SQ},0"/>`;
      }).join("") +
      `</g>`,
    squareOutline,
  ],
  [
    "z",
    "Signal flag Zulu",
    // Merkezde birleşen dört üçgen: sarı üst, siyah mandar, kırmızı alt, mavi fly.
    poly([[0, 0], [SQ, 0], [SQ / 2, SQ / 2]], C.yellow) +
      poly([[0, 0], [0, SQ], [SQ / 2, SQ / 2]], C.black) +
      poly([[0, SQ], [SQ, SQ], [SQ / 2, SQ / 2]], C.red) +
      poly([[SQ, 0], [SQ, SQ], [SQ / 2, SQ / 2]], C.blue),
    squareOutline,
  ],
];

// ─── 10 rakam flaması ────────────────────────────────────────────────────────
// Sivri flama tuvalinde çizilir; clipPath daralan formu keser.
const pRect = (x, y, w, h, fill) => rect(x, y, w, h, fill);
const pHalfH = (top, bottom) => pRect(0, 0, PEN_W, PEN_H / 2, top) + pRect(0, PEN_H / 2, PEN_W, PEN_H / 2, bottom);
const pHalfV = (hoist, fly) => pRect(0, 0, PEN_W / 2, PEN_H, hoist) + pRect(PEN_W / 2, 0, PEN_W / 2, PEN_H, fly);
const pThirdsV = (a, b, c) =>
  pRect(0, 0, PEN_W / 3, PEN_H, a) + pRect(PEN_W / 3, 0, PEN_W / 3, PEN_H, b) + pRect((PEN_W * 2) / 3, 0, PEN_W / 3, PEN_H, c);
/** Mandara yakın konumlanmış haç (rakam 4 ve 8). */
const pCross = (field, mark) => {
  const cx = PEN_W * 0.28;
  const cy = PEN_H / 2;
  const arm = PEN_H * 0.22;
  const t = PEN_H * 0.22;
  return (
    pRect(0, 0, PEN_W, PEN_H, field) +
    rect(0, cy - t / 2, PEN_W, t, mark) +
    rect(cx - t / 2, cy - arm * 2, t, arm * 4, mark)
  );
};

const NUMERALS = [
  ["0", pThirdsV(C.yellow, C.red, C.yellow), "Numeral pennant zero"],
  ["1", pRect(0, 0, PEN_W, PEN_H, C.white) + circle(PEN_W * 0.22, PEN_H / 2, PEN_H * 0.25, C.red), "Numeral pennant one"],
  ["2", pRect(0, 0, PEN_W, PEN_H, C.blue) + circle(PEN_W * 0.22, PEN_H / 2, PEN_H * 0.25, C.white), "Numeral pennant two"],
  ["3", pThirdsV(C.red, C.white, C.blue), "Numeral pennant three"],
  ["4", pCross(C.red, C.white), "Numeral pennant four"],
  ["5", pHalfV(C.yellow, C.blue), "Numeral pennant five"],
  ["6", pHalfH(C.black, C.white), "Numeral pennant six"],
  ["7", pHalfH(C.yellow, C.red), "Numeral pennant seven"],
  ["8", pCross(C.white, C.red), "Numeral pennant eight"],
  [
    "9",
    // Dörde bölünmüş: beyaz üst-mandar, siyah üst-fly, kırmızı alt-mandar, sarı alt-fly.
    pRect(0, 0, PEN_W / 2, PEN_H / 2, C.white) +
      pRect(PEN_W / 2, 0, PEN_W / 2, PEN_H / 2, C.black) +
      pRect(0, PEN_H / 2, PEN_W / 2, PEN_H / 2, C.red) +
      pRect(PEN_W / 2, PEN_H / 2, PEN_W / 2, PEN_H / 2, C.yellow),
    "Numeral pennant nine",
  ],
];

// ─── İkame flamaları ve cevap flaması ────────────────────────────────────────
const SUBSTITUTES = [
  [
    "sub1",
    "First substitute pennant",
    // Mavi zemin üzerine, fly ucuna değmeyen sarı iç üçgen.
    rect(0, 0, TRI_W, TRI_H, C.blue) + poly([[TRI_W * 0.02, TRI_H * 0.17], [TRI_W * 0.62, TRI_H / 2], [TRI_W * 0.02, TRI_H * 0.83]], C.yellow),
    triangleOutline,
  ],
  [
    "sub2",
    "Second substitute pennant",
    rect(0, 0, TRI_W / 2, TRI_H, C.blue) + rect(TRI_W / 2, 0, TRI_W / 2, TRI_H, C.white),
    triangleOutline,
  ],
  [
    "sub3",
    "Third substitute pennant",
    rect(0, 0, TRI_W, TRI_H, C.white) + rect(0, TRI_H * 0.34, TRI_W, TRI_H * 0.32, C.black),
    triangleOutline,
  ],
  [
    "answer",
    "Answering pennant",
    // Dikey beş şerit: kırmızı / beyaz / kırmızı / beyaz / kırmızı.
    [C.red, C.white, C.red, C.white, C.red]
      .map((fill, i) => rect((PEN_W / 5) * i, 0, PEN_W / 5, PEN_H, fill))
      .join(""),
    pennantOutline,
  ],
];

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let written = 0;

  for (const [id, title, body, outline] of LETTERS) {
    const isSwallow = outline === swallowOutline;
    fs.writeFileSync(
      path.join(OUT_DIR, `${id}.svg`),
      wrap({ id, title, width: SQ, height: SQ, outline: isSwallow ? swallowOutline : squareOutline, body }),
    );
    written += 1;
  }

  for (const [digit, body, title] of NUMERALS) {
    fs.writeFileSync(
      path.join(OUT_DIR, `n${digit}.svg`),
      wrap({ id: `n${digit}`, title, width: PEN_W, height: PEN_H, outline: pennantOutline, body }),
    );
    written += 1;
  }

  for (const [id, title, body, outline] of SUBSTITUTES) {
    fs.writeFileSync(
      path.join(OUT_DIR, `${id}.svg`),
      wrap({ id, title, width: TRI_W, height: TRI_H, outline, body }),
    );
    written += 1;
  }

  console.log(`${written} SVG yazıldı → public/flags/`);
}

main();
