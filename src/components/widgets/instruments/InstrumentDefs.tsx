/**
 * Enstrüman yüzeylerinin paylaştığı SVG malzeme tanımları.
 *
 * Fotoğrafın üstüne binen canlı katmanın fotoğrafa ait görünmesi için düz renk
 * yetmiyor: emaye kadranın gözeneği, pusula kartının lekelenmiş kâğıdı, akrep
 * ve yelkovanın altın parlaması, kubbe camın yansıması — hepsi burada bir kez
 * tanımlanıp her widget'tan `url(#…)` ile çağrılır.
 *
 * HomeWidgetGrid tarafından bir kez render edilir (InstrumentStyles gibi).
 * Kimlikler `iwd-` önekiyle; başka bir SVG ile çakışmasın.
 */
export function InstrumentDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        {/* ── Dokular ─────────────────────────────────────────────────── */}
        {/* İnce gözenek: emaye/kâğıt yüzeyin mat kırılması. */}
        <filter id="iwd-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="11" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" intercept="0" />
          </feComponentTransfer>
        </filter>
        {/* Geniş lekelenme: yıllanmış pusula kartının nem izleri. */}
        <filter id="iwd-stain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="4" seed="3" stitchTiles="stitch" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 .42  0 0 0 0 .33  0 0 0 0 .16  .9 .5 0 0 -.28"
          />
        </filter>
        {/* İbrelerin kadrana düşen gölgesi. */}
        <filter id="iwd-handshadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
        <filter id="iwd-softglow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>

        {/* ── Emaye kadran (yerel saat) ────────────────────────────────── */}
        <radialGradient id="iwd-enamel" cx="38%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#fdf9ee" />
          <stop offset="58%" stopColor="#f4ecd9" />
          <stop offset="100%" stopColor="#ded0b2" />
        </radialGradient>
        {/* Bezelin kadran kenarına düşürdüğü gölge. */}
        <radialGradient id="iwd-dialvignette" cx="50%" cy="50%" r="50%">
          <stop offset="76%" stopColor="rgba(60,45,20,0)" />
          <stop offset="93%" stopColor="rgba(60,45,20,.16)" />
          <stop offset="100%" stopColor="rgba(46,32,12,.5)" />
        </radialGradient>

        {/* ── Arduvaz kadran (GMT) ─────────────────────────────────────── */}
        <radialGradient id="iwd-slate" cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#2c3948" />
          <stop offset="55%" stopColor="#1e2833" />
          <stop offset="100%" stopColor="#111820" />
        </radialGradient>
        <radialGradient id="iwd-slatevignette" cx="50%" cy="50%" r="50%">
          <stop offset="74%" stopColor="rgba(0,0,0,0)" />
          <stop offset="93%" stopColor="rgba(0,0,0,.28)" />
          <stop offset="100%" stopColor="rgba(0,0,0,.62)" />
        </radialGradient>

        {/* ── Pusula kartı ─────────────────────────────────────────────── */}
        <radialGradient id="iwd-card" cx="42%" cy="34%" r="76%">
          <stop offset="0%" stopColor="#f3ecd6" />
          <stop offset="62%" stopColor="#e6dcbd" />
          <stop offset="100%" stopColor="#cfc199" />
        </radialGradient>

        {/* ── Metaller ─────────────────────────────────────────────────── */}
        {/* Yaldızlı ibre: sol kenar ışık alır, sağ kenar gölgede kalır. */}
        <linearGradient id="iwd-gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6b5219" />
          <stop offset="22%" stopColor="#d9b862" />
          <stop offset="46%" stopColor="#fbeec0" />
          <stop offset="68%" stopColor="#c9a445" />
          <stop offset="100%" stopColor="#7a5c1d" />
        </linearGradient>
        {/* Fırınlanmış çelik (saniye ibresi) */}
        <linearGradient id="iwd-blued" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#16264d" />
          <stop offset="45%" stopColor="#3b5da8" />
          <stop offset="100%" stopColor="#111d3a" />
        </linearGradient>
        <linearGradient id="iwd-steel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6d6f74" />
          <stop offset="40%" stopColor="#e8eaee" />
          <stop offset="100%" stopColor="#7c7f85" />
        </linearGradient>
        <radialGradient id="iwd-cap" cx="34%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#fdf0c4" />
          <stop offset="45%" stopColor="#c9a445" />
          <stop offset="100%" stopColor="#5e4514" />
        </radialGradient>

        {/* ── Cam ──────────────────────────────────────────────────────── */}
        {/* Kubbe camın köşegen yansıması: fotoğraftaki ışıkla aynı yönde. */}
        <linearGradient id="iwd-glare" x1="8%" y1="0%" x2="72%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,.62)" />
          <stop offset="42%" stopColor="rgba(255,255,255,.16)" />
          <stop offset="72%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="iwd-glareSoft" x1="10%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,.34)" />
          <stop offset="46%" stopColor="rgba(255,255,255,.08)" />
          <stop offset="76%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        {/* Camın alt kenarındaki soğuk geri yansıma. */}
        <linearGradient id="iwd-bounce" x1="30%" y1="100%" x2="70%" y2="30%">
          <stop offset="0%" stopColor="rgba(186,214,255,.22)" />
          <stop offset="55%" stopColor="rgba(186,214,255,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
