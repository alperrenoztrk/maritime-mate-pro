import { memo } from "react";

/**
 * Fotoğraftaki Koshin rüzgâr yönü göstergesinin yüzü — canlı olarak yeniden
 * çizilir.
 *
 * Fotoğrafın ibresi sabit bir yöne donmuş; üstüne canlı bir ibre konsaydı iki
 * ibre görünürdü. Bu yüzden beyaz yüz örtülüp aynı düzenle yeniden çiziliyor:
 * dışta derece taksimatı, içeride dört ana yön, ortada büyük siyah göbek ve
 * göbekten çıkan tek ibre. Fotoğrafın siyah bezeli, vidaları ve panel yüzeyi
 * olduğu gibi kalır.
 *
 * Gerçek cihaz rüzgârı gemiye göre (FORE/AFTER/LEFT/RIGHT) gösterir; uygulamada
 * elimizdeki veri meteorolojik yön olduğu için ana yönler pusula harfleridir.
 *
 * viewBox 0 0 200 200 — yüz merkezi (100,100), yarıçap 100.
 */

const C = 100;
const INK = "#22211e";
const INK_SOFT = "#6b6862";
const FACE_FONT = "'Arial Black', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const rad = (deg: number) => ((deg - 90) * Math.PI) / 180;
const px = (deg: number, r: number) => C + r * Math.cos(rad(deg));
const py = (deg: number, r: number) => C + r * Math.sin(rad(deg));

/** Ana yönler — gerçek cihazdaki FORE/RIGHT/AFTER/LEFT'in karşılığı. */
const CARDINAL: Record<number, string> = { 0: "N", 90: "E", 180: "S", 270: "W" };

const FaceBody = memo(function FaceBody() {
  const ticks = [];
  for (let deg = 0; deg < 360; deg += 2) {
    const major = deg % 10 === 0;
    const mid = deg % 5 === 0;
    ticks.push(
      <line
        key={deg}
        x1={px(deg, major ? 85 : mid ? 88.5 : 91)}
        y1={py(deg, major ? 85 : mid ? 88.5 : 91)}
        x2={px(deg, 95.5)}
        y2={py(deg, 95.5)}
        stroke={INK}
        strokeWidth={major ? 1.6 : mid ? 0.9 : 0.55}
      />,
    );
  }

  // Taksimat rakamları: gerçek cihazdaki gibi küçük ve ışınsal döner — alt
  // yarıda baş aşağı görünmeleri fotoğraftaki kadranın kendi düzeni.
  const numbers = [];
  for (let deg = 0; deg < 360; deg += 30) {
    const x = px(deg, 76);
    const y = py(deg, 76);
    numbers.push(
      <text
        key={deg}
        x={x}
        y={y}
        dy="0.34em"
        fill={INK_SOFT}
        fontSize={6.2}
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        textAnchor="middle"
        transform={`rotate(${deg} ${x} ${y})`}
      >
        {String(deg).padStart(3, "0")}
      </text>,
    );
  }

  return (
    <g>
      {/* Mat beyaz enstrüman yüzü + gözenek */}
      <circle cx={C} cy={C} r={100} fill="url(#iwd-instrumentface)" />
      <circle cx={C} cy={C} r={100} filter="url(#iwd-grain)" opacity={0.14} style={{ mixBlendMode: "multiply" }} />

      <circle cx={C} cy={C} r={96.2} fill="none" stroke={INK} strokeWidth={0.9} />
      {ticks}
      {numbers}

      {/* Ana yön harfleri — fotoğraftaki yazılar gibi dik ve kalın */}
      {Object.entries(CARDINAL).map(([deg, letter]) => (
        <text
          key={letter}
          x={px(Number(deg), 60)}
          y={py(Number(deg), 60)}
          dy="0.35em"
          fill={INK}
          fontSize={14}
          fontWeight={900}
          fontFamily={FACE_FONT}
          textAnchor="middle"
        >
          {letter}
        </text>
      ))}
      {/* Doğu/batı harflerinin dış yanındaki kısa çizgiler (fotoğrafta da var) */}
      <line x1={26} y1={C} x2={33} y2={C} stroke={INK} strokeWidth={1.4} />
      <line x1={167} y1={C} x2={174} y2={C} stroke={INK} strokeWidth={1.4} />

      <text
        x={C}
        y={76}
        fill={INK}
        fontSize={6.6}
        fontWeight={700}
        letterSpacing="0.4"
        fontFamily={FACE_FONT}
        textAnchor="middle"
      >
        WIND DIRECTION
      </text>

      {/* Göbeğin altına basılı fırıldak silueti — fotoğraftaki oval çizim */}
      <ellipse cx={C} cy={106} rx={11} ry={30} fill="none" stroke={INK_SOFT} strokeWidth={0.7} opacity={0.55} />
      <circle cx={C} cy={128} r={6} fill="none" stroke={INK_SOFT} strokeWidth={0.7} opacity={0.55} />
      <text
        x={C}
        y={121}
        fill={INK_SOFT}
        fontSize={4.6}
        letterSpacing="0.4"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        textAnchor="middle"
      >
        MARINER&apos;S BOOK
      </text>
    </g>
  );
});

export interface WindDialFaceProps {
  /** Rüzgârın GELDİĞİ yön (meteorolojik derece); yoksa ibre çizilmez. */
  directionDeg?: number;
}

export function WindDialFace({ directionDeg }: WindDialFaceProps) {
  const hasDirection = directionDeg !== undefined && !Number.isNaN(directionDeg);

  // Tek ibre: göbekten çıkar, ucu rüzgârın GELDİĞİ yönü gösterir.
  const needle = <path d={`M ${C} 12 L ${C + 3.2} 88 L ${C - 3.2} 88 Z`} />;

  return (
    <svg className="iw-svg" viewBox="0 0 200 200" role="img" aria-hidden="true">
      <defs>
        <clipPath id="iwd-clip-wind">
          <circle cx={C} cy={C} r={100} />
        </clipPath>
      </defs>

      <g clipPath="url(#iwd-clip-wind)">
        <FaceBody />

        {hasDirection ? (
          <>
            <g
              transform={`translate(2.2 2.6) rotate(${directionDeg} ${C} ${C})`}
              fill="rgba(20,20,20,.3)"
              filter="url(#iwd-handshadow)"
            >
              {needle}
            </g>
            <g transform={`rotate(${directionDeg} ${C} ${C})`} fill={INK} strokeLinejoin="round">
              {needle}
            </g>
          </>
        ) : null}

        {/* Büyük mat siyah göbek — fotoğrafta ibrenin çıktığı yer */}
        <circle cx={C} cy={C} r={17} fill="url(#iwd-hub)" />

        {/* Cam: köşegen yansıma + kenar kırılması */}
        <ellipse cx={62} cy={50} rx={64} ry={40} transform="rotate(-34 62 50)" fill="url(#iwd-glare)" opacity={0.28} />
        <ellipse cx={146} cy={156} rx={40} ry={24} transform="rotate(-28 146 156)" fill="url(#iwd-bounce)" opacity={0.45} />
        {/* Nötr kenar gölgesi: yüzün dışı fotoğrafın siyah bezeline karışsın */}
        <circle cx={C} cy={C} r={100} fill="url(#iwd-facevignette)" />
      </g>
    </svg>
  );
}
