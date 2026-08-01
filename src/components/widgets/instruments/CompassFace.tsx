import { memo } from "react";

/**
 * Fotoğraftaki Askania pusulasının kartı — canlı olarak yeniden çizilir.
 *
 * Fotoğrafın kartı sabit bir yöne donmuş; üstüne rüzgâr oku konsaydı kart da o
 * yöne bakıyor görünürdü. Bu yüzden kart örtülüp aynı malzemeyle (yıllanmış
 * kâğıt, siyah baskı, dış taksimat halkası, ortada pivot ve iki perçin)
 * yeniden çiziliyor: kuzey yukarıda sabit, üstünde dönen tek şey rüzgâr oku.
 *
 * viewBox 0 0 200 200 — kart merkezi (100,100), yarıçap 100.
 */

const C = 100;
const rad = (deg: number) => ((deg - 90) * Math.PI) / 180;
const px = (deg: number, r: number) => C + r * Math.cos(rad(deg));
const py = (deg: number, r: number) => C + r * Math.sin(rad(deg));
const pt = (deg: number, r: number) => `${px(deg, r).toFixed(2)} ${py(deg, r).toFixed(2)}`;

const INK = "#2a251c";
const PAPER = "#f4eeda";

/** Kerteriz harfleri (0°'den itibaren 30°'lik adımlarda hangi konumda ne yazacağı). */
const CARDINAL: Record<number, string> = { 0: "K", 90: "D", 180: "G", 270: "B" };

/** Gül yaprağı: bir yarısı koyu bir yarısı açık — kartın kabartma etkisi. */
function petal(deg: number, outer: number, inner: number, half: number, key: string) {
  return (
    <g key={key}>
      <path d={`M ${pt(deg, outer)} L ${pt(deg - half, inner)} L ${pt(deg, inner - 4)} Z`} fill={INK} />
      <path
        d={`M ${pt(deg, outer)} L ${pt(deg + half, inner)} L ${pt(deg, inner - 4)} Z`}
        fill={PAPER}
        stroke={INK}
        strokeWidth={0.6}
        strokeLinejoin="round"
      />
    </g>
  );
}

const CardBody = memo(function CardBody() {
  const ticks = [];
  for (let deg = 0; deg < 360; deg += 2) {
    const major = deg % 10 === 0;
    const mid = deg % 5 === 0;
    ticks.push(
      <line
        key={deg}
        x1={px(deg, major ? 84 : mid ? 88 : 91)}
        y1={py(deg, major ? 84 : mid ? 88 : 91)}
        x2={px(deg, 96)}
        y2={py(deg, 96)}
        stroke={INK}
        strokeWidth={major ? 1.5 : mid ? 0.9 : 0.55}
      />,
    );
  }

  const labels = [];
  for (let deg = 0; deg < 360; deg += 30) {
    const cardinal = CARDINAL[deg];
    const x = px(deg, 72);
    const y = py(deg, 72);
    labels.push(
      <text
        key={deg}
        x={x}
        y={y}
        dy="0.34em"
        fill={INK}
        fontSize={cardinal ? 16 : 12}
        fontWeight={700}
        fontFamily={cardinal ? "Georgia, 'Times New Roman', serif" : "'Helvetica Neue', Arial, sans-serif"}
        textAnchor="middle"
        transform={`rotate(${deg} ${x} ${y})`}
      >
        {cardinal ?? String(deg / 10).padStart(2, "0")}
      </text>,
    );
  }

  return (
    <g>
      {/* Yıllanmış kâğıt kart: leke + gözenek */}
      <circle cx={C} cy={C} r={100} fill="url(#iwd-card)" />
      <circle cx={C} cy={C} r={100} filter="url(#iwd-stain)" opacity={0.55} style={{ mixBlendMode: "multiply" }} />
      <circle cx={C} cy={C} r={100} filter="url(#iwd-grain)" opacity={0.18} style={{ mixBlendMode: "multiply" }} />

      {/* Dış taksimat halkası */}
      <circle cx={C} cy={C} r={96.4} fill="none" stroke={INK} strokeWidth={0.9} />
      <circle cx={C} cy={C} r={83} fill="none" stroke={INK} strokeWidth={0.5} opacity={0.5} />
      {ticks}
      {labels}

      {/* Pusula gülü: dört ana yaprak uzun, ara yapraklar kısa */}
      {[45, 135, 225, 315].map((d) => petal(d, 50, 20, 8, `i${d}`))}
      {[0, 90, 180, 270].map((d) => petal(d, 62, 20, 9, `c${d}`))}

      {/* Kuzey yaprağının ucundaki kırmızı işaret */}
      <path d={`M ${pt(0, 62)} L ${pt(-9, 42)} L ${pt(0, 46)} Z`} fill="#9d2b23" />

      {/* Kartın perçinleri — fotoğraftaki kartta da var */}
      <circle cx={C} cy={70} r={2.6} fill="rgba(30,26,18,.5)" />
      <circle cx={C} cy={130} r={2.6} fill="rgba(30,26,18,.5)" />
    </g>
  );
});

export interface CompassFaceProps {
  /** Rüzgârın GELDİĞİ yön (meteorolojik derece); yoksa ok çizilmez. */
  directionDeg?: number;
}

export function CompassFace({ directionDeg }: CompassFaceProps) {
  const hasDirection = directionDeg !== undefined && !Number.isNaN(directionDeg);

  // Rüzgâr fırıldağı: uç rüzgârın GELDİĞİ yöne bakar, kuyruğu karşı yönde
  // tüylenir. Kart sabit olduğu için dönen tek parça budur.
  const vane = (
    <g>
      <path d="M100 12 L107 33 L100 28.5 L93 33 Z" />
      <rect x={98.7} y={27} width={2.6} height={106} rx={1.3} />
      <path d="M100 133 L91.5 150 L100 144.5 L108.5 150 Z" opacity={0.92} />
      <path d="M100 119 L93.5 131 L100 127.5 L106.5 131 Z" opacity={0.72} />
    </g>
  );

  return (
    <svg className="iw-svg" viewBox="0 0 200 200" role="img" aria-hidden="true" translate="no">
      <defs>
        <clipPath id="iwd-clip-card">
          <circle cx={C} cy={C} r={100} />
        </clipPath>
      </defs>

      <g clipPath="url(#iwd-clip-card)">
        <CardBody />

        {hasDirection ? (
          <>
            <g
              transform={`translate(2.4 2.8) rotate(${directionDeg} ${C} ${C})`}
              fill="rgba(20,14,4,.32)"
              filter="url(#iwd-handshadow)"
            >
              {vane}
            </g>
            <g
              transform={`rotate(${directionDeg} ${C} ${C})`}
              fill="url(#iwd-gold)"
              stroke="#4a3a12"
              strokeWidth={0.5}
              strokeLinejoin="round"
            >
              {vane}
            </g>
          </>
        ) : null}

        {/* Pivot göbeği */}
        <circle cx={C} cy={C} r={7} fill="url(#iwd-cap)" stroke="#3d2f0e" strokeWidth={0.5} />
        <circle cx={97.8} cy={97.6} r={2} fill="rgba(255,248,214,.7)" />

        {/* Kubbe cam: köşegen yansıma + kenar kırılması */}
        <ellipse cx={62} cy={50} rx={64} ry={40} transform="rotate(-34 62 50)" fill="url(#iwd-glare)" opacity={0.4} />
        <ellipse cx={146} cy={156} rx={40} ry={24} transform="rotate(-28 146 156)" fill="url(#iwd-bounce)" opacity={0.55} />
        <circle cx={C} cy={C} r={100} fill="url(#iwd-dialvignette)" />
      </g>
    </svg>
  );
}
