/**
 * Lombardan görünen gökyüzü — güneşin gün içindeki yeri camın ARDINDAKİ ışığı
 * değiştirir, camın üstüne bir çıkartma yapıştırmaz.
 *
 * Fotoğraf puslu, gri bir günde çekilmiş. Günün saatine göre buna bir ışık
 * katmanı bindiriliyor: öğlen serin ve parlak, doğuş/batışta turuncu, gece
 * lacivert. Güneşin kendisi hâlesiyle birlikte çiziliyor, alçaldığında suya
 * ışık yolu düşüyor. Yay ise camın üstüne kazınmış ince bir iz gibi duruyor.
 *
 * viewBox 0 0 100 100 — cam açıklığının kutusu (bkz. PORTHOLE_GLASS).
 * Ufuk çizgisi y=52: fotoğraftaki gerçek deniz ufku (bkz. skyLook.ts).
 */
import { ARC_R, HORIZON, type SkyLook } from "./skyLook";

/** Gece gökyüzüne serpilen sabit yıldızlar (rastgelelik render'lar arası gezmesin). */
const STARS: Array<[number, number, number]> = [
  [18, 14, 0.9],
  [31, 26, 0.6],
  [44, 9, 1],
  [58, 20, 0.7],
  [69, 12, 0.85],
  [79, 27, 0.55],
  [25, 38, 0.5],
  [63, 36, 0.6],
  [86, 18, 0.7],
  [12, 30, 0.6],
];

export function PortholeSky({ look }: { look: SkyLook | null }) {
  return (
    <svg
      className="iw-svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
     
    >
      <defs>
        <linearGradient id="iwd-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={look?.topColor ?? "#ffffff"} />
          <stop offset={`${HORIZON}%`} stopColor={look?.bottomColor ?? "#ffffff"} />
          <stop offset="100%" stopColor={look?.topColor ?? "#ffffff"} stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="iwd-sunglow">
          <stop offset="0%" stopColor={look?.glowColor ?? "#fff"} stopOpacity="0.95" />
          <stop offset="34%" stopColor={look?.glowColor ?? "#fff"} stopOpacity="0.34" />
          <stop offset="100%" stopColor={look?.glowColor ?? "#fff"} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="iwd-sundisc">
          <stop offset="0%" stopColor="#fffef8" />
          <stop offset="34%" stopColor="#fff6cf" />
          <stop offset="72%" stopColor={look?.sunColor ?? "#ffd45e"} />
          <stop offset="90%" stopColor={look?.sunColor ?? "#ffd45e"} stopOpacity="0.85" />
          <stop offset="100%" stopColor={look?.sunColor ?? "#ffd45e"} stopOpacity="0" />
        </radialGradient>
        {/* Camın kendi yansıması: sol üstten inen geniş bir ışık bandı */}
        <linearGradient id="iwd-portglare" x1="0" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,.4)" />
          <stop offset="34%" stopColor="rgba(255,255,255,.08)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {look ? (
        <>
          {/* Gökyüzü ışığı — fotoğrafın detayını silmeden rengini çevirir */}
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="url(#iwd-sky)"
            opacity={look.tintAlpha}
            style={{ mixBlendMode: look.blend }}
          />

          {/* Yıldızlar yalnızca karanlıkta */}
          {look.night > 0.15
            ? STARS.map(([x, y, o]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r={0.55} fill="#eaf2ff" opacity={o * look.night * 0.9} />
              ))
            : null}

          {look.sun ? (
            <>
              <g style={{ mixBlendMode: "screen" }}>
                {/* Hâle */}
                <circle cx={look.sun.x} cy={look.sun.y} r={27} fill="url(#iwd-sunglow)" />
                {/* Alçak güneşin suya düşen ışık yolu */}
                {look.elevation < 0.45 ? (
                  <ellipse
                    cx={look.sun.x}
                    cy={(HORIZON + 100) / 2}
                    rx={4.5 + 6 * (1 - look.elevation)}
                    ry={(100 - HORIZON) / 2}
                    fill="url(#iwd-sunglow)"
                    opacity={0.6 * (1 - Math.max(0, look.elevation) / 0.45)}
                  />
                ) : null}
              </g>
              {/*
                Kursun kendisi normal modda: fotoğraf zaten parlak olduğu için
                "screen" ile çizilen bir güneş beyaz zeminde kaybolurdu.
              */}
              <circle cx={look.sun.x} cy={look.sun.y} r={6.2} fill="url(#iwd-sundisc)" />
            </>
          ) : null}

          {/*
            Günün yayı: cama kazınmış ince iz. Kazıma iki çizgidir — altta
            koyu gölge, üstte ışığı tutan açık iz; tek renk çizgi çıkartma gibi
            durur.
          */}
          <g fill="none" strokeDasharray="1.8 4.2" strokeWidth="0.6" strokeLinecap="round">
            <path
              d={`M ${50 - ARC_R} ${HORIZON + 0.6} A ${ARC_R} ${ARC_R} 0 0 1 ${50 + ARC_R} ${HORIZON + 0.6}`}
              stroke="rgba(18,24,32,.22)"
            />
            <path
              d={`M ${50 - ARC_R} ${HORIZON} A ${ARC_R} ${ARC_R} 0 0 1 ${50 + ARC_R} ${HORIZON}`}
              stroke="rgba(255,252,240,.72)"
            />
          </g>
          <g stroke="rgba(255,252,240,.55)" strokeWidth="0.8" strokeLinecap="round">
            <line x1={50 - ARC_R} y1={HORIZON - 2.6} x2={50 - ARC_R} y2={HORIZON + 2.6} />
            <line x1={50 + ARC_R} y1={HORIZON - 2.6} x2={50 + ARC_R} y2={HORIZON + 2.6} />
          </g>
        </>
      ) : null}

      {/* Cam: yansıma bandı + kenar kırılması (veri olmasa da durur) */}
      <ellipse cx={50} cy={50} rx={50} ry={50} fill="url(#iwd-portglare)" opacity={0.75} />
      <ellipse cx={50} cy={50} rx={50} ry={50} fill="url(#iwd-dialvignette)" opacity={0.85} />
    </svg>
  );
}
