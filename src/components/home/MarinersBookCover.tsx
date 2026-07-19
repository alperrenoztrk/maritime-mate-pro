interface MarinersBookCoverProps {
  onOpen: () => void;
  busy?: boolean;
}

/**
 * The single book shown on the home page. Opening it reveals the six
 * collections (Dersler, Alıştırmalar, Gemi Sistemleri, Operasyonlar,
 * Personel, Sözlük) that live inside the Mariner's Book.
 */
export function MarinersBookCover({ onOpen, busy = false }: MarinersBookCoverProps) {
  return (
    <div className="mbc-wrap">
      <button
        type="button"
        className="mbc-book"
        onClick={onOpen}
        aria-label="Mariner's Book kitabını aç"
        aria-busy={busy}
        disabled={busy}
      >
        <span className="mbc-pages" aria-hidden="true" />
        <span className="mbc-cover">
          <span className="mbc-corner mbc-corner--tl" aria-hidden="true" />
          <span className="mbc-corner mbc-corner--tr" aria-hidden="true" />
          <span className="mbc-corner mbc-corner--bl" aria-hidden="true" />
          <span className="mbc-corner mbc-corner--br" aria-hidden="true" />
          <span className="mbc-emblem" aria-hidden="true">⚓</span>
          <span className="mbc-title notranslate" translate="no" lang="en">MARINER'S BOOK</span>
          <span className="mbc-rule" aria-hidden="true" />
          <span className="mbc-subtitle">Denizcilik Kütüphanesi</span>
          {busy && <span className="mbc-opening">Açılıyor…</span>}
        </span>
      </button>
      <span className="mbc-hint">Kütüphaneyi açmak için dokunun</span>

      <style>{`
        .mbc-wrap{ display:flex; flex-direction:column; align-items:center; gap:14px; width:100%; }
        .mbc-book{
          position:relative; display:block; width:clamp(150px,54vw,212px); padding:0; border:0;
          background:transparent; cursor:pointer; perspective:1100px; -webkit-tap-highlight-color:transparent;
        }
        .mbc-book:disabled{ cursor:wait; }
        .mbc-pages{
          position:absolute; z-index:1; top:2.5%; right:-5px; width:11px; height:70%;
          border-radius:0 4px 4px 0; background:repeating-linear-gradient(90deg,#f1e5c8 0 1.5px,#cbb781 1.5px 3px);
          box-shadow:5px 9px 12px rgba(0,0,0,.34);
        }
        .mbc-cover{
          position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; justify-content:center;
          width:100%; aspect-ratio:2/3; padding:16% 12%; overflow:hidden; text-align:center;
          border:1px solid #d4a83d; border-radius:4px 10px 10px 4px;
          transform:rotateY(-8deg); transform-origin:left center;
          background:
            radial-gradient(120% 92% at 50% 34%,transparent 42%,rgba(0,0,0,.5)),
            repeating-linear-gradient(115deg,rgba(255,255,255,.03) 0 2px,transparent 2px 7px),
            linear-gradient(145deg,#1c5c8a,#123f61 46%,#08243c);
          box-shadow:inset 11px 0 15px rgba(0,0,0,.28),inset 0 0 22px rgba(0,0,0,.4),6px 11px 22px rgba(0,0,0,.5);
          transition:transform .28s ease,filter .28s ease;
        }
        .mbc-book:hover .mbc-cover,.mbc-book:focus-visible .mbc-cover{ transform:rotateY(0) translateY(-6px); filter:brightness(1.08); }
        .mbc-book:active .mbc-cover{ transform:rotateY(-3deg) translateY(-1px) scale(.98); }
        .mbc-book:focus-visible{ outline:2px solid #7dd3fc; outline-offset:6px; border-radius:6px; }
        .mbc-emblem{ color:#7dd3fc; font-size:clamp(1.9rem,7vw,2.9rem); filter:drop-shadow(0 0 8px rgba(125,211,252,.5)); }
        .mbc-title{ margin-top:9%; color:#f2d98a; font:700 clamp(.78rem,2.4vw,1.05rem)/1.24 Georgia,'Times New Roman',serif; letter-spacing:.06em; text-wrap:balance; }
        .mbc-rule{ width:44%; height:1px; margin:9% 0 7%; background:linear-gradient(90deg,transparent,#d5ac4e,transparent); }
        .mbc-subtitle{ color:rgba(218,177,76,.82); font:600 clamp(.44rem,1.4vw,.6rem)/1.35 Georgia,serif; letter-spacing:.14em; text-transform:uppercase; }
        .mbc-opening{ position:absolute; inset:auto 0 8%; color:#fff6d6; font-size:.6rem; letter-spacing:.1em; }
        .mbc-corner{ position:absolute; width:22px; height:22px; border-color:rgba(218,177,76,.62); opacity:.72; }
        .mbc-corner--tl{ top:9px; left:10px; border-top:1px solid; border-left:1px solid; }
        .mbc-corner--tr{ top:9px; right:10px; border-top:1px solid; border-right:1px solid; }
        .mbc-corner--bl{ bottom:9px; left:10px; border-bottom:1px solid; border-left:1px solid; }
        .mbc-corner--br{ bottom:9px; right:10px; border-bottom:1px solid; border-right:1px solid; }
        .mbc-hint{ color:rgba(255,255,255,.7); font-size:13px; letter-spacing:.02em; text-shadow:0 1px 6px rgba(0,0,0,.4); }
        @media(prefers-reduced-motion:reduce){ .mbc-cover{ transition:none!important; } }
      `}</style>
    </div>
  );
}
