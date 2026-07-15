import type { CSSProperties } from "react";
import { bookVolumes, type BookVolumeId } from "@/data/bookContents";

interface BookVolumeLibraryProps {
  onSelect: (volumeId: BookVolumeId) => void;
  compact?: boolean;
  pendingVolumeId?: BookVolumeId | null;
}

/**
 * The library lives outside the reading surface, so selecting a cover is an
 * intentional action while pages inside each volume remain button-free.
 */
export function BookVolumeLibrary({
  onSelect,
  compact = false,
  pendingVolumeId = null,
}: BookVolumeLibraryProps) {
  return (
    <section className={`bvl-library ${compact ? "bvl-library--compact" : ""}`} aria-label="Mariner's Book ciltleri">
      <header className="bvl-header">
        <span className="bvl-kicker notranslate" translate="no" lang="en">MARINER&rsquo;S BOOK</span>
        <h1>Denizcilik Kütüphanesi</h1>
        <p>Okumak istediğiniz cildi seçin.</p>
      </header>

      <div className="bvl-shelf">
        {bookVolumes.map((volume) => {
          const style = {
            "--bvl-cover": volume.cover,
            "--bvl-cover-deep": volume.coverDeep,
            "--bvl-accent": volume.accent,
          } as CSSProperties;
          const pending = pendingVolumeId === volume.id;
          return (
            <button
              key={volume.id}
              type="button"
              className="bvl-volume"
              style={style}
              onClick={() => onSelect(volume.id)}
              aria-label={`${volume.numeral}: ${volume.title} kitabını aç`}
              aria-busy={pending}
              disabled={Boolean(pendingVolumeId)}
            >
              <span className="bvl-pages" aria-hidden="true" />
              <span className="bvl-cover">
                <span className="bvl-corner bvl-corner--tl" aria-hidden="true" />
                <span className="bvl-corner bvl-corner--br" aria-hidden="true" />
                <span className="bvl-number">{volume.numeral}</span>
                <span className="bvl-mark" aria-hidden="true">⚓</span>
                <span className="bvl-title">{volume.title}</span>
                <span className="bvl-rule" aria-hidden="true" />
                <span className="bvl-subtitle">{volume.subtitle}</span>
                {pending && <span className="bvl-opening">Açılıyor…</span>}
              </span>
              <span className="bvl-description">{volume.description}</span>
            </button>
          );
        })}
      </div>
      <div className="bvl-shelf-edge" aria-hidden="true" />

      <style>{`
        .bvl-library{
          position:relative; width:min(96vw,980px); min-height:100svh; margin:0 auto;
          padding:max(1rem,env(safe-area-inset-top)) 10px max(1rem,env(safe-area-inset-bottom));
          display:flex; flex-direction:column; justify-content:center; color:#f8f2df;
          background:radial-gradient(ellipse at 50% 10%,rgba(64,169,207,.18),transparent 50%);
        }
        .bvl-library--compact{ width:min(96vw,900px); min-height:0; padding:4px 0 8px; background:transparent; }
        .bvl-header{ text-align:center; margin-bottom:clamp(12px,2vw,24px); text-shadow:0 2px 14px rgba(0,0,0,.55); }
        .bvl-header h1{ margin:3px 0 2px; font:700 clamp(1.05rem,2.5vw,1.6rem)/1.2 Georgia,'Times New Roman',serif; letter-spacing:.04em; }
        .bvl-header p{ margin:0; color:rgba(255,255,255,.72); font-size:clamp(.7rem,1.5vw,.88rem); }
        .bvl-kicker{ color:#e4c56e; font:700 clamp(.52rem,1vw,.67rem) Georgia,'Times New Roman',serif; letter-spacing:.3em; text-indent:.3em; }
        .bvl-library--compact .bvl-header{ margin-bottom:9px; }
        .bvl-library--compact .bvl-header h1{ font-size:clamp(.92rem,2.2vw,1.2rem); }
        .bvl-shelf{
          display:flex; align-items:flex-end; gap:clamp(9px,1.6vw,17px); width:100%;
          padding:8px 8px 16px; overflow-x:auto; overscroll-behavior-inline:contain;
          scroll-snap-type:x mandatory; scrollbar-width:thin; scrollbar-color:rgba(228,197,110,.45) transparent;
        }
        .bvl-volume{
          position:relative; flex:0 0 clamp(104px,15vw,132px); width:clamp(104px,15vw,132px);
          display:flex; flex-direction:column; align-items:center; padding:0; border:0; color:inherit;
          background:transparent; scroll-snap-align:center; perspective:900px; text-align:center; cursor:pointer;
        }
        .bvl-volume:disabled{ cursor:wait; }
        .bvl-cover{
          position:relative; z-index:2; width:100%; aspect-ratio:2/3; padding:13% 9% 10%;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          overflow:hidden; border:1px solid color-mix(in srgb,var(--bvl-accent) 58%,#6f4d17);
          border-radius:3px 8px 8px 3px; transform:rotateY(-7deg); transform-origin:left center;
          background:
            radial-gradient(120% 90% at 50% 35%,transparent 45%,rgba(0,0,0,.46)),
            repeating-linear-gradient(115deg,rgba(255,255,255,.025) 0 2px,transparent 2px 7px),
            linear-gradient(145deg,color-mix(in srgb,var(--bvl-cover) 88%,white),var(--bvl-cover) 48%,var(--bvl-cover-deep));
          box-shadow:inset 9px 0 13px rgba(0,0,0,.25),inset 0 0 18px rgba(0,0,0,.35),5px 9px 17px rgba(0,0,0,.45);
          transition:transform .25s ease,filter .25s ease;
        }
        .bvl-volume:hover .bvl-cover,.bvl-volume:focus-visible .bvl-cover{ transform:rotateY(0) translateY(-5px); filter:brightness(1.08); }
        .bvl-volume:active .bvl-cover{ transform:rotateY(-2deg) translateY(-1px) scale(.98); }
        .bvl-volume:focus-visible{ outline:2px solid var(--bvl-accent); outline-offset:5px; border-radius:5px; }
        .bvl-pages{
          position:absolute; z-index:1; top:2%; right:-4px; width:9px; height:68%;
          border-radius:0 4px 4px 0; transform:translateY(0);
          background:repeating-linear-gradient(90deg,#f1e5c8 0 1.5px,#cbb781 1.5px 3px);
          box-shadow:4px 7px 9px rgba(0,0,0,.28);
        }
        .bvl-number{ color:color-mix(in srgb,var(--bvl-accent) 84%,#f0d174); font:700 .54rem Georgia,serif; letter-spacing:.16em; }
        .bvl-mark{ margin:7% 0 4%; color:var(--bvl-accent); font-size:clamp(1.15rem,3vw,1.75rem); filter:drop-shadow(0 0 5px color-mix(in srgb,var(--bvl-accent) 55%,transparent)); }
        .bvl-title{ color:#f2d98a; font:700 clamp(.58rem,1.4vw,.78rem)/1.24 Georgia,'Times New Roman',serif; letter-spacing:.035em; text-wrap:balance; }
        .bvl-rule{ width:36%; height:1px; margin:8% 0 6%; background:linear-gradient(90deg,transparent,var(--bvl-accent),transparent); }
        .bvl-subtitle{ color:color-mix(in srgb,var(--bvl-accent) 78%,#f8e2a1); font:600 clamp(.38rem,.85vw,.5rem)/1.3 Georgia,serif; letter-spacing:.08em; text-transform:uppercase; }
        .bvl-opening{ position:absolute; inset:auto 7% 7%; color:#fff6d6; font-size:.52rem; letter-spacing:.08em; }
        .bvl-corner{ position:absolute; width:20px; height:20px; border-color:color-mix(in srgb,var(--bvl-accent) 62%,#d6af4b); opacity:.65; }
        .bvl-corner--tl{ top:7px; left:8px; border-top:1px solid; border-left:1px solid; }
        .bvl-corner--br{ right:8px; bottom:7px; border-right:1px solid; border-bottom:1px solid; }
        .bvl-description{ width:100%; min-height:2.7em; margin-top:10px; color:rgba(255,255,255,.68); font-size:clamp(.54rem,.9vw,.66rem); line-height:1.32; }
        .bvl-library--compact .bvl-description{ display:none; }
        .bvl-shelf-edge{ height:12px; margin:-12px 2px 0; border-radius:2px 2px 8px 8px; background:linear-gradient(180deg,#7b4d26,#3c2111 72%,#1d0e08); box-shadow:0 10px 18px rgba(0,0,0,.5),inset 0 2px 1px rgba(255,214,148,.18); }
        @media(max-width:560px){
          .bvl-shelf{ gap:12px; padding-inline:max(14px,calc((100vw - 250px)/2)); }
          .bvl-volume{ flex-basis:112px; width:112px; }
          .bvl-library--compact .bvl-header p{ display:none; }
        }
        @media(prefers-reduced-motion:reduce){ .bvl-cover{ transition:none!important; } }
      `}</style>
    </section>
  );
}
