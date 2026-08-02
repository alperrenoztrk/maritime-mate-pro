import { memo } from "react";

/**
 * Fotoğraftaki Seiko köprüüstü saatinin kadranı — canlı olarak yeniden çizilir.
 *
 * Neden yeniden çiziliyor: fotoğraftaki ibreler donmuş durumda; canlı ibreleri
 * üstüne koymak iki takım ibre demek olurdu. Bu yüzden kadran örtülüyor. Örten
 * yüzey fotoğraftakinin ÖLÇÜLMÜŞ düzenini taşır (dakika halkası, kalın Arap
 * rakamları, çeyreklerde üçgen işaretler, tek merkezî kırmızı saniye ibresi),
 * yani göz için fotoğrafın devamıdır.
 *
 * Koordinatlar: viewBox 0 0 200 200, kadran merkezi (100,100), yarıçap 100.
 * Ölçüler fotoğraftan alındı (kadran R=148 px):
 *   dakika halkası 0.86–0.955 R   rakamlar 0.68 R   marka satırı 0.42 R
 */

const C = 100;
const NUMERALS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const NUMERAL_FONT = "'Arial Black', 'Helvetica Neue', Helvetica, Arial, sans-serif";

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
  glare: string;
}

const IVORY: Palette = {
  face: "url(#iwd-enamel)",
  vignette: "url(#iwd-dialvignette)",
  ink: "#1b1a16",
  inkSoft: "#514a3c",
  hand: "#191a1c",
  handEdge: "#0a0a0b",
  seconds: "#c4271d",
  glare: "url(#iwd-glare)",
};

const SLATE: Palette = {
  face: "url(#iwd-slate)",
  vignette: "url(#iwd-slatevignette)",
  ink: "#efe4c4",
  inkSoft: "#9fb0c2",
  hand: "url(#iwd-steel)",
  handEdge: "#2b3542",
  seconds: "#e0564b",
  glare: "url(#iwd-glareSoft)",
};

/**
 * Akrep/yelkovan: tabana yakın yerde en geniş, uca doğru incelen düz bıçak —
 * fotoğraftaki ibrelerin biçimi. `tail` ucun karşısındaki küçük denge ağırlığı.
 */
function bladePath(len: number, halfBase: number, tail: number): string {
  const hb = halfBase;
  return [
    `M ${C} ${C - len}`,
    `L ${C + hb} ${C - len * 0.24}`,
    `L ${C + hb * 0.42} ${C + 5}`,
    `L ${C + hb * 0.62} ${C + 5}`,
    `L ${C} ${C + tail}`,
    `L ${C - hb * 0.62} ${C + 5}`,
    `L ${C - hb * 0.42} ${C + 5}`,
    `L ${C - hb} ${C - len * 0.24}`,
    "Z",
  ].join(" ");
}

const HOUR_PATH = bladePath(54, 5.4, 10);
const MINUTE_PATH = bladePath(83, 4.6, 10);

/** Kadran mobilyası: saniyede bir değişmediği için ibrelerden ayrı tutulur. */
const DialFurniture = memo(function DialFurniture({ p, gmt }: { p: Palette; gmt: boolean }) {
  const minuteTicks = [];
  for (let i = 0; i < 60; i++) {
    const deg = i * 6;
    minuteTicks.push(
      <line
        key={i}
        x1={px(deg, 87)}
        y1={py(deg, 87)}
        x2={px(deg, 94.6)}
        y2={py(deg, 94.6)}
        stroke={p.ink}
        strokeWidth={i % 5 === 0 ? 2 : 1.4}
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
        opacity={gmt ? 0.16 : 0.22}
        style={{ mixBlendMode: gmt ? "screen" : "multiply" }}
      />

      {/* Dakika halkası: iki ince çember arasına sıralanmış çubuklar */}
      <circle cx={C} cy={C} r={95.5} fill="none" stroke={p.ink} strokeWidth={0.9} />
      <circle cx={C} cy={C} r={86} fill="none" stroke={p.ink} strokeWidth={0.9} />
      {minuteTicks}

      {/* Çeyreklerdeki dolu üçgenler — fotoğrafta halkanın hemen içinde durur */}
      {[0, 90, 180, 270].map((deg) => (
        <path
          key={deg}
          d={`M ${px(deg, 78.5)} ${py(deg, 78.5)} L ${px(deg - 2.6, 84.5)} ${py(deg - 2.6, 84.5)} L ${px(deg + 2.6, 84.5)} ${py(deg + 2.6, 84.5)} Z`}
          fill={p.ink}
        />
      ))}

      {/* Kalın Arap rakamları — fotoğraftaki gibi dik durur, dönmez */}
      {NUMERALS.map((n, i) => {
        const deg = i * 30;
        return (
          <text
            key={n}
            x={px(deg, 68)}
            y={py(deg, 68)}
            dy="0.35em"
            fill={p.ink}
            fontSize={20}
            fontWeight={900}
            fontFamily={NUMERAL_FONT}
            textAnchor="middle"
          >
            {n}
          </text>
        );
      })}
    </g>
  );
});

export interface ChronometerFaceProps {
  hours: number;
  minutes: number;
  seconds: number;
  variant: "local" | "gmt";
  /** Kadrandaki iki basılı satır: üstte 12'nin altına, altta 6'nın üstüne. */
  inscription: [string, string];
}

export function ChronometerFace({ hours, minutes, seconds, variant, inscription }: ChronometerFaceProps) {
  const gmt = variant === "gmt";
  const p = gmt ? SLATE : IVORY;

  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const secondDeg = seconds * 6;

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

        {/* Basılı satırlar — fotoğrafta marka 12'nin, ülke adı 6'nın yanındadır */}
        <text
          x={C}
          y={60}
          fill={p.ink}
          fontSize={5.8}
          fontWeight={700}
          letterSpacing="0.8"
          fontFamily={NUMERAL_FONT}
          textAnchor="middle"
        >
          {inscription[0]}
        </text>
        <text
          x={C}
          y={146}
          fill={p.inkSoft}
          fontSize={4.6}
          letterSpacing="0.5"
          fontFamily={NUMERAL_FONT}
          textAnchor="middle"
        >
          {inscription[1]}
        </text>

        {/* İbrelerin gölgesi — ışık sol üstten geldiği için sağ alta düşer */}
        <g transform="translate(2.2 2.6)" fill="rgba(24,16,4,.34)" filter="url(#iwd-handshadow)">
          {hands}
        </g>
        <g fill={p.hand} stroke={p.handEdge} strokeWidth={0.4} strokeLinejoin="round">
          {hands}
        </g>

        {/*
          Saniye ibresi dikdörtgen olarak çiziliyor: sıfır genişlikli <line>
          üstünde objectBoundingBox gradyanı SVG kuralına göre hiç boyanmaz.
          Fotoğraftaki gibi tek parça, merkezden geçen ince kırmızı ibre.
        */}
        <g transform={`rotate(${secondDeg} ${C} ${C})`}>
          <rect x={C - 0.75} y={C - 88} width={1.5} height={106} rx={0.75} fill={p.seconds} />
          <circle cx={C} cy={C} r={3.1} fill={p.seconds} />
        </g>

        {/* Merkez göbeği: fotoğrafta ibrelerin üstünde küçük çelik bir perçin */}
        <circle cx={C} cy={C} r={3.4} fill="url(#iwd-steel)" stroke={p.handEdge} strokeWidth={0.35} />
        <circle cx={98.8} cy={98.7} r={1.1} fill="rgba(255,255,255,.8)" />

        {/* Kubbe cam: köşegen yansıma + kenar kırılması */}
        <ellipse cx={64} cy={52} rx={62} ry={40} transform="rotate(-34 64 52)" fill={p.glare} opacity={0.5} />
        <ellipse cx={140} cy={158} rx={44} ry={26} transform="rotate(-30 140 158)" fill="url(#iwd-bounce)" opacity={0.5} />
        <circle cx={C} cy={C} r={100} fill={p.vignette} />
      </g>
    </svg>
  );
}
