import { useRef } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Splash ekranındaki kitabın kapalı hâli — ana sayfada içindekilere açılan widget.
 * CSS sınıfları `hb-` prefix'lidir: splash'in global `.book*` kuralları React mount
 * olduktan sonra bir süre daha DOM'da kaldığından adlar çakışmamalıdır.
 */
export function BookLauncher() {
  const navigate = useNavigate();
  const bookRef = useRef<HTMLDivElement>(null);
  const openingRef = useRef(false);

  const handleOpen = () => {
    if (openingRef.current) return;
    openingRef.current = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !bookRef.current) {
      navigate("/book");
      return;
    }
    bookRef.current.classList.add("hb-opening");
    window.setTimeout(() => navigate("/book"), 260);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Kitabı aç — İçindekiler"
        className="hb-press outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70 rounded-lg"
      >
        <div className="hb-scene">
          <div ref={bookRef} className="hb-book">
            <div className="hb-pages" aria-hidden="true" />
            <div className="hb-cover">
              <div className="hb-trim">
                {[0, 90, 180, 270].map((r) => (
                  <svg
                    key={r}
                    className="hb-corner"
                    style={{ transform: `rotate(${r}deg)` }}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 2 H14 M2 2 V14 M4 4 q8 0 8 8"
                      fill="none"
                      stroke="#caa044"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                ))}
                <div className="hb-emblem">
                  <svg
                    viewBox="0 0 64 64"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                    fill="none"
                    stroke="#daa520"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="32" cy="32" r="20" />
                    <circle cx="32" cy="32" r="6" />
                    <line x1="32" y1="4" x2="32" y2="16" />
                    <line x1="32" y1="48" x2="32" y2="60" />
                    <line x1="4" y1="32" x2="16" y2="32" />
                    <line x1="48" y1="32" x2="60" y2="32" />
                    <line x1="12" y1="12" x2="20" y2="20" />
                    <line x1="44" y1="44" x2="52" y2="52" />
                    <line x1="52" y1="12" x2="44" y2="20" />
                    <line x1="20" y1="44" x2="12" y2="52" />
                  </svg>
                </div>
                <div className="hb-plate">
                  <div className="hb-title notranslate" translate="no" lang="en">
                    MARINER&rsquo;S
                    <br />
                    BOOK
                  </div>
                </div>
                <div className="hb-rule" />
                <div className="hb-sub notranslate" translate="no" lang="en">
                  Interactive Maritime Learning
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <span className="text-[13px] font-medium tracking-wide text-white/85 drop-shadow-md">
        İçindekiler
      </span>

      <style>{`
        .hb-press{ transition: transform .15s ease; }
        .hb-press:active{ transform: scale(.96); }
        .hb-scene{
          width: min(52vw, 220px);
          aspect-ratio: 2/3;
          perspective: 1200px;
          perspective-origin: 50% 50%;
        }
        .hb-book{
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transform: rotateY(-8deg) rotateX(2deg);
          animation: hb-float 4.5s ease-in-out infinite alternate;
          filter: drop-shadow(0 18px 26px rgba(0,0,0,.5));
        }
        /* Sağda görünen kapalı sayfa kenarları (splash .book-body::after'dan) —
           sararmış üst/alt kenarlarla */
        .hb-pages{
          position: absolute;
          inset: 1.5% 0 1.5% auto;
          width: 5%;
          border-radius: 0 4px 4px 0;
          background:
            linear-gradient(180deg, rgba(120,80,20,.18), transparent 22% 78%, rgba(120,80,20,.24)),
            repeating-linear-gradient(90deg, #f0e3c2 0 1.6px, #d5c194 1.6px 3.2px);
          transform: translateZ(-2px);
        }
        /* Eskitilmiş deri: köşe aşınması + deri tahılı + vinyet + koyulaştırılmış lacivert */
        .hb-cover{
          position: absolute;
          inset: 0 2.5% 0 0;
          transform-origin: left center;
          border-radius: 3px 7px 7px 3px;
          overflow: hidden;
          background:
            radial-gradient(60% 45% at 0% 0%, rgba(140,100,40,.16), transparent 70%),
            radial-gradient(60% 45% at 100% 100%, rgba(140,100,40,.14), transparent 70%),
            radial-gradient(130% 110% at 50% 38%, transparent 52%, rgba(0,0,0,.42) 100%),
            repeating-linear-gradient(115deg, rgba(255,255,255,.02) 0 2px, transparent 2px 6px),
            repeating-linear-gradient(24deg, rgba(255,255,255,.02) 0 2px, transparent 2px 7px),
            linear-gradient(140deg, #0f3668 0%, #0a274f 46%, #05172f 100%);
          border: 1px solid rgba(202,160,68,.45);
          box-shadow: inset 0 0 26px rgba(0,0,0,.45), 0 8px 22px rgba(0,0,0,.5);
          transition: transform .28s cubic-bezier(.72,.04,.22,1);
        }
        .hb-cover::before{
          content: "";
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 8%;
          background: linear-gradient(90deg, rgba(0,0,0,.5), transparent);
          border-right: 1px solid rgba(218,165,32,.22);
        }
        .hb-opening .hb-cover{ transform: rotateY(-26deg); }
        .hb-trim{
          position: absolute;
          inset: 6.5%;
          border: 1.5px solid rgba(202,160,68,.55);
          border-radius: 3px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: clamp(4px, 1.4vh, 9px);
          padding: 8% 6%;
          box-shadow: inset 0 1px 0 rgba(0,0,0,.35), 0 1px 0 rgba(255,255,255,.05);
        }
        .hb-corner{
          position: absolute;
          width: 14%;
          aspect-ratio: 1;
          opacity: .8;
          pointer-events: none;
        }
        .hb-corner:nth-of-type(1){ top: 2.5%; left: 2%; }
        .hb-corner:nth-of-type(2){ top: 2.5%; right: 2%; }
        .hb-corner:nth-of-type(3){ bottom: 2.5%; right: 2%; }
        .hb-corner:nth-of-type(4){ bottom: 2.5%; left: 2%; }
        .hb-plate{
          background: linear-gradient(180deg, rgba(0,0,0,.28), rgba(0,0,0,.12));
          border: 1px solid rgba(202,160,68,.5);
          box-shadow: inset 0 0 0 2px rgba(0,0,0,.25), inset 0 0 0 3px rgba(202,160,68,.25);
          padding: 6% 9%;
          border-radius: 2px;
        }
        .hb-trim::after{
          content: "";
          position: absolute;
          inset: 2.5%;
          border: 1px solid rgba(218,165,32,.28);
          border-radius: 2px;
        }
        .hb-emblem{
          width: 38%;
          aspect-ratio: 1;
          filter: drop-shadow(0 0 6px rgba(218,165,32,.5));
          animation: hb-emblem-glow 1.8s ease-in-out infinite alternate;
        }
        .hb-emblem svg{ display: block; }
        .hb-title{
          font-family: Georgia, 'Times New Roman', serif;
          font-weight: 700;
          text-align: center;
          letter-spacing: .14em;
          line-height: 1.45;
          font-size: clamp(.72rem, 4vw, 1.05rem);
          color: #d9b258;
          background: linear-gradient(180deg, #f2d98a 0%, #caa044 60%, #f2d98a 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hb-rule{
          width: 36%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(218,165,32,.75), transparent);
        }
        .hb-sub{
          font-weight: 500;
          letter-spacing: .18em;
          font-size: clamp(5px, 1.7vw, 8px);
          color: rgba(232,205,130,.72);
          text-transform: uppercase;
          text-align: center;
        }
        @keyframes hb-float{
          from{ transform: rotateY(-8deg) rotateX(2deg) translateY(0); }
          to{ transform: rotateY(-6deg) rotateX(1deg) translateY(-6px); }
        }
        @keyframes hb-emblem-glow{
          from{ filter: drop-shadow(0 0 4px rgba(218,165,32,.4)); }
          to{ filter: drop-shadow(0 0 10px rgba(218,165,32,.75)); }
        }
        @media (prefers-reduced-motion: reduce){
          .hb-book, .hb-emblem{ animation: none !important; }
        }
      `}</style>
    </div>
  );
}
