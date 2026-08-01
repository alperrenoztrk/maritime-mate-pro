import { memo } from "react";

/**
 * Fotoğraftaki gemi kronometresinin kadranı — canlı olarak yeniden çizilir.
 *
 * Neden yeniden çiziliyor: fotoğraftaki ibreler donmuş durumda; canlı ibreleri
 * üstüne koymak iki takım ibre demek olurdu. Bu yüzden kadran örtülüyor. Örten
 * yüzey fotoğraftakinin ÖLÇÜLMÜŞ düzenini birebir taşır (dakika halkası, 12
 * Roma rakamı, 12'de yardımcı kadran, 6'da saniye kadranı, ortada kitabe), yani
 * göz için fotoğrafın devamıdır.
 *
 * Koordinatlar: viewBox 0 0 200 200, kadran merkezi (100,100), yarıçap 100.
 * Ölçüler fotoğraftan alındı (kadran R=230 px):
 *   dakika halkası  0.90–0.97 R   Roma rakamları  0.79 R
 *   yardımcı kadran 0.46 R uzakta, 0.27 R yarıçap
 */

const C = 100;
const ROMAN = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

const rad = (deg: number) => ((deg - 90) * Math.PI) / 180;
const px = (deg: number, r: number) => C + r * Math.cos(rad(deg));
const py = (deg: number, r: number) => C + r * Math.sin(rad(deg));

interface Palette {
  face: string;
  vignette: string;
  ink: string;
  inkSoft: string;
  hand: string;
  handEdge: string;
  seconds: string;
  subFace: string;
  glare: string;
}

const IVORY: Palette = {
  face: "url(#iwd-enamel)",
  vignette: "url(#iwd-dialvignette)",
  ink: "#241f18",
  inkSoft: "#5d5344",
  hand: "url(#iwd-gold)",
  handEdge: "#4a3a12",
  seconds: "url(#iwd-blued)",
  subFace: "rgba(120,104,72,.07)",
  glare: "url(#iwd-glare)",
};

const SLATE: Palette = {
  face: "url(#iwd-slate)",
  vignette: "url(#iwd-slatevignette)",
  ink: "#efe4c4",
  inkSoft: "#9fb0c2",
  hand: "url(#iwd-gold)",
  handEdge: "#2b2208",
  seconds: "#c4453c",
  subFace: "rgba(255,255,255,.05)",
  glare: "url(#iwd-glareSoft)",
};

/** Akrep/yelkovan: mızrak uçlu klasik "spade" biçimi, uç yukarı bakar. */
function spadePath(tip: number, waist: number, bulge: number, half: number, tail: number): string {
  const w = half;
  return [
    `M ${C} ${C - tip}`,
    `C ${C - w * 0.7} ${C - tip + 6}, ${C - w * 1.9} ${C - bulge - 6}, ${C - w * 2.1} ${C - bulge}`,
    `C ${C - w * 2.3} ${C - bulge + 7}, ${C - w * 1.1} ${C - waist + 2}, ${C - w} ${C - waist}`,
    `L ${C - w} ${C + tail}`,
    `L ${C + w} ${C + tail}`,
    `L ${C + w} ${C - waist}`,
    `C ${C + w * 1.1} ${C - waist + 2}, ${C + w * 2.3} ${C - bulge + 7}, ${C + w * 2.1} ${C - bulge}`,
    `C ${C + w * 1.9} ${C - bulge - 6}, ${C + w * 0.7} ${C - tip + 6}, ${C} ${C - tip}`,
    "Z",
  ].join(" ");
}

const HOUR_PATH = spadePath(52, 34, 44, 2.0, 11);
const MINUTE_PATH = spadePath(84, 56, 70, 1.7, 13);

/** Kadran mobilyası: saniyede bir değişmediği için ibrelerden ayrı tutulur. */
const DialFurniture = memo(function DialFurniture({ p, gmt }: { p: Palette; gmt: boolean }) {
  const minuteTicks = [];
  for (let i = 0; i < 60; i++) {
    const deg = i * 6;
    const hour = i % 5 === 0;
    minuteTicks.push(
      <line
        key={i}
        x1={px(deg, hour ? 88.5 : 90.5)}
        y1={py(deg, hour ? 88.5 : 90.5)}
        x2={px(deg, 96.5)}
        y2={py(deg, 96.5)}
        stroke={p.ink}
        strokeWidth={hour ? 2.1 : 0.75}
        strokeLinecap="butt"
      />,
    );
  }

  return (
    <g>
      {/* Emaye zemin + gözenek */}
      <circle cx={C} cy={C} r={100} fill={p.face} />
      <circle
        cx={C}
        cy={C}
        r={100}
        filter="url(#iwd-grain)"
        opacity={gmt ? 0.16 : 0.24}
        style={{ mixBlendMode: gmt ? "screen" : "multiply" }}
      />

      {/* Dakika halkası */}
      <circle cx={C} cy={C} r={97.4} fill="none" stroke={p.ink} strokeWidth={0.8} />
      <circle cx={C} cy={C} r={87.6} fill="none" stroke={p.ink} strokeWidth={0.55} />
      {minuteTicks}

      {/* Roma rakamları — gerçek kadranda olduğu gibi ışınsal döner */}
      {ROMAN.map((n, i) => {
        const deg = i * 30;
        const x = px(deg, 78);
        const y = py(deg, 78);
        return (
          <text
            key={n}
            x={x}
            y={y}
            dy="0.34em"
            fill={p.ink}
            fontSize={13.4}
            fontFamily="Georgia, 'Times New Roman', serif"
            textAnchor="middle"
            transform={`rotate(${deg} ${x} ${y})`}
          >
            {n}
          </text>
        );
      })}
    </g>
  );
});

/** 24 saat göstergesi (12 yönünde) — gerçek kadranda kurma göstergesinin yeri. */
const DayNightDial = memo(function DayNightDial({ p, gmt }: { p: Palette; gmt: boolean }) {
  const cy = 54;
  const r = 27;
  const ticks = [];
  for (let i = 0; i < 24; i++) {
    const deg = i * 15;
    const major = i % 6 === 0;
    const a = rad(deg);
    ticks.push(
      <line
        key={i}
        x1={C + (r - (major ? 6.5 : 3.2)) * Math.cos(a)}
        y1={cy + (r - (major ? 6.5 : 3.2)) * Math.sin(a)}
        x2={C + (r - 1.4) * Math.cos(a)}
        y2={cy + (r - 1.4) * Math.sin(a)}
        stroke={p.ink}
        strokeWidth={major ? 1.2 : 0.5}
      />,
    );
  }
  return (
    <g>
      <circle cx={C} cy={cy} r={r} fill={p.subFace} stroke={p.ink} strokeWidth={0.6} />
      {/*
        Gece tarafı koyu. Kadranda 24 üstte, 12 altta olduğu için gündüz
        (06→18) alt yarıda kalır; koyu olan üst yarıdır.
      */}
      <path
        d={`M ${C - r} ${cy} A ${r} ${r} 0 0 1 ${C + r} ${cy} Z`}
        fill={gmt ? "rgba(0,0,0,.28)" : "rgba(46,60,82,.1)"}
      />
      <line x1={C - r} y1={cy} x2={C + r} y2={cy} stroke={p.ink} strokeWidth={0.45} opacity={0.5} />
      {ticks}
      <text x={C} y={cy - r + 9.2} fill={p.inkSoft} fontSize={6} fontFamily="Georgia, serif" textAnchor="middle">
        24
      </text>
      <text x={C} y={cy + r - 4.2} fill={p.inkSoft} fontSize={6} fontFamily="Georgia, serif" textAnchor="middle">
        12
      </text>
    </g>
  );
});

/** Saniye kadranı (6 yönünde) — çizgileri sabit, ibresi canlı. */
const SecondsDialFace = memo(function SecondsDialFace({ p }: { p: Palette }) {
  const cy = 146;
  const r = 27;
  const ticks = [];
  for (let i = 0; i < 60; i++) {
    const deg = i * 6;
    const major = i % 5 === 0;
    const a = rad(deg);
    ticks.push(
      <line
        key={i}
        x1={C + (r - (major ? 5.6 : 2.6)) * Math.cos(a)}
        y1={cy + (r - (major ? 5.6 : 2.6)) * Math.sin(a)}
        x2={C + (r - 1.2) * Math.cos(a)}
        y2={cy + (r - 1.2) * Math.sin(a)}
        stroke={p.ink}
        strokeWidth={major ? 1.1 : 0.42}
      />,
    );
  }
  const label = (value: string, deg: number) => (
    <text
      key={value}
      x={C + (r - 10.5) * Math.cos(rad(deg))}
      y={cy + (r - 10.5) * Math.sin(rad(deg))}
      dy="0.34em"
      fill={p.inkSoft}
      fontSize={6.6}
      fontFamily="Georgia, serif"
      textAnchor="middle"
    >
      {value}
    </text>
  );
  return (
    <g>
      <circle cx={C} cy={cy} r={r} fill={p.subFace} stroke={p.ink} strokeWidth={0.6} />
      {ticks}
      {label("60", 0)}
      {label("20", 120)}
      {label("40", 240)}
    </g>
  );
});

export interface ChronometerFaceProps {
  hours: number;
  minutes: number;
  seconds: number;
  variant: "local" | "gmt";
  /** Kadranın ortasındaki kitabe (iki satır). */
  inscription: [string, string];
}

export function ChronometerFace({ hours, minutes, seconds, variant, inscription }: ChronometerFaceProps) {
  const gmt = variant === "gmt";
  const p = gmt ? SLATE : IVORY;

  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const secondDeg = seconds * 6;
  const dayNightDeg = ((hours % 24) + minutes / 60) * 15;

  const hands = (
    <>
      <path d={HOUR_PATH} transform={`rotate(${hourDeg} ${C} ${C})`} />
      <path d={MINUTE_PATH} transform={`rotate(${minuteDeg} ${C} ${C})`} />
    </>
  );

  return (
    <svg className="iw-svg" viewBox="0 0 200 200" role="img" aria-hidden="true" translate="no">
      <defs>
        <clipPath id={gmt ? "iwd-clip-gmt" : "iwd-clip-local"}>
          <circle cx={C} cy={C} r={100} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${gmt ? "iwd-clip-gmt" : "iwd-clip-local"})`}>
        <DialFurniture p={p} gmt={gmt} />
        <DayNightDial p={p} gmt={gmt} />
        <SecondsDialFace p={p} />

        {/* Kitabe — gerçek kadranda olduğu gibi ibrelerin altında kalır */}
        <text
          x={C}
          y={93}
          fill={p.inkSoft}
          fontSize={7.2}
          letterSpacing="0.6"
          fontFamily="Georgia, 'Times New Roman', serif"
          textAnchor="middle"
        >
          {inscription[0]}
        </text>
        <text
          x={C}
          y={104}
          fill={p.inkSoft}
          fontSize={6.2}
          letterSpacing="0.5"
          fontFamily="Georgia, 'Times New Roman', serif"
          textAnchor="middle"
        >
          {inscription[1]}
        </text>

        {/*
          Saniye ve 24 saat ibreleri dikdörtgen/çokgen olarak çiziliyor: sıfır
          genişlikli <line> üstünde objectBoundingBox gradyanı SVG kuralına göre
          hiç boyanmaz, ibre görünmez olurdu.
        */}
        <g transform={`rotate(${secondDeg} ${C} 146)`}>
          <rect x={C - 0.7} y={124.2} width={1.4} height={28.6} rx={0.7} fill={p.seconds} />
          <circle cx={C} cy={146} r={2.1} fill={p.seconds} />
        </g>

        <g transform={`rotate(${dayNightDeg} ${C} 54)`}>
          <path d={`M ${C} 36.4 L ${C + 1.5} 55 L ${C - 1.5} 55 Z`} fill={p.hand} stroke={p.handEdge} strokeWidth={0.25} />
          <circle cx={C} cy={54} r={2.2} fill={p.hand} stroke={p.handEdge} strokeWidth={0.3} />
        </g>

        {/* İbrelerin gölgesi — ışık sol üstten geldiği için sağ alta düşer */}
        <g transform="translate(2.2 2.6)" fill="rgba(24,16,4,.34)" filter="url(#iwd-handshadow)">
          {hands}
        </g>
        <g fill={p.hand} stroke={p.handEdge} strokeWidth={0.45} strokeLinejoin="round">
          {hands}
        </g>

        {/* Merkez göbeği */}
        <circle cx={C} cy={C} r={5.4} fill="url(#iwd-cap)" stroke={p.handEdge} strokeWidth={0.4} />
        <circle cx={98.4} cy={98.2} r={1.5} fill="rgba(255,248,214,.75)" />

        {/* Kubbe cam: köşegen yansıma + kenar kırılması */}
        <ellipse cx={64} cy={52} rx={62} ry={40} transform="rotate(-34 64 52)" fill={p.glare} opacity={0.55} />
        <ellipse cx={140} cy={158} rx={44} ry={26} transform="rotate(-30 140 158)" fill="url(#iwd-bounce)" opacity={0.5} />
        <circle cx={C} cy={C} r={100} fill={p.vignette} />
      </g>
    </svg>
  );
}
