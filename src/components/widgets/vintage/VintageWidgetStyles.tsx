/**
 * Vintage enstrüman widget'larının ortak CSS'i (`vw-` prefix).
 * HomeWidgetGrid tarafından bir kez render edilir; bileşenler yalnızca sınıfları kullanır.
 * Kural: gradyan + transform + inline SVG data-URI doku (feTurbulence);
 * harici görsel/canvas/backdrop-filter yok. Tüm yazılar nesnenin üzerinde durur
 * (pirinç plaka, kadran, LCD, kazınmış gövde).
 */
export function VintageWidgetStyles() {
  return (
    <style>{`
      /* ── Ortak kasa: bakalit gövde, yivli pirinç vidalar, fırça izi ── */
      .vw-device{
        --vw-noise: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0.12 0.12 0 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
        --vw-wood: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.28 0.02' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0.16 0.16 0 0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23w)'/%3E%3C/svg%3E");
        position: relative;
        isolation: isolate;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        border-radius: 14px;
        padding: 10px;
        border: 1px solid rgba(202,160,68,.4);
        background-image:
          /* Vida yivleri — her vida farklı açıda sıkılmış */
          linear-gradient(48deg, transparent 42%, rgba(18,11,4,.9) 46% 54%, transparent 58%),
          linear-gradient(-27deg, transparent 42%, rgba(18,11,4,.9) 46% 54%, transparent 58%),
          linear-gradient(102deg, transparent 42%, rgba(18,11,4,.9) 46% 54%, transparent 58%),
          linear-gradient(9deg, transparent 42%, rgba(18,11,4,.9) 46% 54%, transparent 58%),
          /* Havşalı pirinç vida başları */
          radial-gradient(circle 3.5px at 11px 11px, #fdf0c0 0%, #caa044 38%, #6b4e16 62%, rgba(0,0,0,.55) 72%, transparent 82%),
          radial-gradient(circle 3.5px at calc(100% - 11px) 11px, #fdf0c0 0%, #caa044 38%, #6b4e16 62%, rgba(0,0,0,.55) 72%, transparent 82%),
          radial-gradient(circle 3.5px at 11px calc(100% - 11px), #fdf0c0 0%, #caa044 38%, #6b4e16 62%, rgba(0,0,0,.55) 72%, transparent 82%),
          radial-gradient(circle 3.5px at calc(100% - 11px) calc(100% - 11px), #fdf0c0 0%, #caa044 38%, #6b4e16 62%, rgba(0,0,0,.55) 72%, transparent 82%),
          /* Üstten vuran ışık + bakalit gövde */
          linear-gradient(115deg, rgba(255,255,255,.07) 0%, transparent 36%),
          linear-gradient(160deg, #2a211a 0%, #16100b 100%);
        background-position:
          7.5px 7.5px,
          calc(100% - 14.5px) 7.5px,
          7.5px calc(100% - 14.5px),
          calc(100% - 14.5px) calc(100% - 14.5px),
          0 0, 0 0, 0 0, 0 0, 0 0, 0 0;
        background-size:
          7px 7px, 7px 7px, 7px 7px, 7px 7px,
          auto, auto, auto, auto, auto, auto;
        background-repeat: no-repeat;
        box-shadow:
          inset 0 1px 0 rgba(242,217,138,.14),
          inset 0 -8px 14px rgba(0,0,0,.38),
          0 2px 4px rgba(0,0,0,.45),
          0 10px 22px rgba(0,0,0,.5);
      }
      /* Yaşlanma patinası — tüm kasaya tanecik serpintisi */
      .vw-device::after{
        content: "";
        position: absolute;
        inset: 0;
        z-index: 7;
        border-radius: inherit;
        pointer-events: none;
        mix-blend-mode: multiply;
        opacity: .4;
        background-image: var(--vw-noise);
      }
      .vw-small{ grid-column: span 1; aspect-ratio: 1 / 1.14; }
      .vw-medium{ grid-column: span 2; min-height: 150px; }

      /* Pirinç kazınmış etiket plakası — perçinli, harfler baskıyla gömme */
      .vw-plate{
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 9px;
        font-weight: 600;
        line-height: 1.1;
        letter-spacing: .12em;
        color: #3a2b10;
        text-transform: uppercase;
        text-align: center;
        padding: 3px 12px;
        border-radius: 3px;
        max-width: 100%;
        text-shadow: 0 1px 0 rgba(255,255,255,.42);
        background:
          radial-gradient(circle 1.6px at 4.5px 50%, #6b4e16 0 58%, rgba(0,0,0,.4) 66%, transparent 74%),
          radial-gradient(circle 1.6px at calc(100% - 4.5px) 50%, #6b4e16 0 58%, rgba(0,0,0,.4) 66%, transparent 74%),
          linear-gradient(180deg, #f6e3a0 0%, #dfba63 52%, #caa044 100%);
        box-shadow: inset 0 1px 1px rgba(255,255,255,.55), inset 0 -1px 1px rgba(0,0,0,.35), 0 1px 2px rgba(0,0,0,.45);
      }
      .vw-engraved{
        font-family: Georgia, 'Times New Roman', serif;
        color: #c9b98f;
        text-shadow: 0 -1px 0 rgba(0,0,0,.7), 0 1px 0 rgba(255,255,255,.06);
        letter-spacing: .1em;
      }

      /* ── Kadran (kronometre + pusula ortak): tornalanmış pirinç bezel ── */
      .vw-dial{
        position: relative;
        width: 72%;
        aspect-ratio: 1;
        border-radius: 50%;
        background:
          radial-gradient(circle at 30% 24%, rgba(255,255,255,.55) 0%, rgba(255,255,255,.14) 16%, transparent 40%),
          conic-gradient(from 205deg, #8a6820, #f6e2a4 70deg, #a8801f 130deg, #f2d98a 200deg, #7a5c1a 280deg, #8a6820 360deg);
        box-shadow:
          0 5px 12px rgba(0,0,0,.55),
          0 1px 2px rgba(0,0,0,.5),
          inset 0 -2px 4px rgba(0,0,0,.4),
          inset 0 1px 1px rgba(255,255,255,.45);
        flex-shrink: 0;
      }
      .vw-dial::before{
        content: "";
        position: absolute;
        inset: 9%;
        border-radius: 50%;
        background: radial-gradient(circle at 40% 32%, #fdf6e0 0%, #f8eed4 55%, #ecd9ae 100%);
        box-shadow: inset 0 0 0 1px rgba(74,49,19,.45), inset 0 3px 7px rgba(90,60,20,.35);
      }
      /* Kadran camı: taksimat halkası + kubbe cam yansıması */
      .vw-dial::after{
        content: "";
        position: absolute;
        inset: 9%;
        border-radius: 50%;
        background:
          radial-gradient(circle at 68% 82%, rgba(255,255,255,.14) 0 8%, transparent 26%),
          linear-gradient(148deg, rgba(255,255,255,.38) 6%, rgba(255,255,255,.1) 24%, transparent 44%),
          radial-gradient(circle, #f8eed4 0 76%, transparent 77%),
          repeating-conic-gradient(from -0.75deg, #4a3113 0 1.5deg, transparent 1.5deg 30deg);
        opacity: .92;
      }
      /* GMT: koyu arduvaz kadran */
      .vw-dial--gmt::before{
        background: radial-gradient(circle at 40% 32%, #2e3f52 0%, #22303f 55%, #17222e 100%);
        box-shadow: inset 0 0 0 1px rgba(218,165,32,.5), inset 0 3px 7px rgba(0,0,0,.55);
      }
      .vw-dial--gmt::after{
        background:
          radial-gradient(circle at 68% 82%, rgba(255,255,255,.1) 0 8%, transparent 26%),
          linear-gradient(148deg, rgba(255,255,255,.3) 6%, rgba(255,255,255,.08) 24%, transparent 44%),
          radial-gradient(circle, #22303f 0 76%, transparent 77%),
          repeating-conic-gradient(from -0.75deg, #f2d98a 0 1.5deg, transparent 1.5deg 30deg);
      }

      /* Roma rakamları / kerteriz harfleri */
      .vw-nu{
        position: absolute;
        z-index: 2;
        font-family: Georgia, 'Times New Roman', serif;
        font-size: clamp(8px, 2.6vw, 11px);
        font-weight: 700;
        color: #4a3113;
        line-height: 1;
      }
      .vw-dial--gmt .vw-nu{ color: #f2d98a; }
      .vw-nu--t{ top: 13%; left: 50%; transform: translateX(-50%); }
      .vw-nu--r{ right: 14%; top: 50%; transform: translateY(-50%); }
      .vw-nu--b{ bottom: 13%; left: 50%; transform: translateX(-50%); }
      .vw-nu--l{ left: 14%; top: 50%; transform: translateY(-50%); }

      /* İbreler — transition yok: 1 Hz atlama gerçek kronometre tiki */
      .vw-hand{
        position: absolute;
        left: 50%;
        bottom: 50%;
        transform-origin: 50% 100%;
        border-radius: 99px;
        z-index: 3;
        filter: drop-shadow(0 1px 1px rgba(0,0,0,.35));
      }
      .vw-hand--hour{ width: 4px; height: 24%; background: #3f2a0e; }
      .vw-hand--min{ width: 3px; height: 33%; background: #3f2a0e; }
      .vw-hand--sec{ width: 1.5px; height: 38%; background: #8f1f1f; }
      .vw-dial--gmt .vw-hand--hour, .vw-dial--gmt .vw-hand--min{ background: #f2d98a; }
      .vw-cap{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 9px;
        height: 9px;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background: radial-gradient(circle at 35% 30%, #f2d98a, #7a5c1a 80%);
        box-shadow: 0 1px 2px rgba(0,0,0,.45);
        z-index: 4;
      }
      .vw-digital{
        font-family: Georgia, 'Times New Roman', serif;
        font-variant-numeric: tabular-nums;
        font-size: 15px;
        font-weight: 700;
        color: #f2d98a;
        text-shadow: 0 1px 1px rgba(0,0,0,.6);
        letter-spacing: .08em;
        line-height: 1;
      }
      .vw-sub{
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 8px;
        color: #c9b98f;
        letter-spacing: .08em;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.2;
      }

      /* ── Pusula ibresi ── */
      .vw-needle{
        position: absolute;
        left: 50%;
        top: 14%;
        width: 3px;
        height: 72%;
        transform-origin: 50% 50%;
        border-radius: 99px;
        background: linear-gradient(180deg, #8f1f1f 0 50%, #384355 50%);
        box-shadow: 0 0 2px rgba(0,0,0,.4);
        filter: drop-shadow(0 1px 1px rgba(0,0,0,.4));
        z-index: 3;
      }
      .vw-crosshair::after{
        background:
          radial-gradient(circle at 68% 82%, rgba(255,255,255,.14) 0 8%, transparent 26%),
          linear-gradient(148deg, rgba(255,255,255,.38) 6%, rgba(255,255,255,.1) 24%, transparent 44%),
          linear-gradient(0deg, transparent calc(50% - .5px), rgba(74,49,19,.25) 50%, transparent calc(50% + .5px)),
          linear-gradient(90deg, transparent calc(50% - .5px), rgba(74,49,19,.25) 50%, transparent calc(50% + .5px)),
          radial-gradient(circle, #f8eed4 0 76%, transparent 77%),
          repeating-conic-gradient(from -0.75deg, #4a3113 0 1.5deg, transparent 1.5deg 30deg);
      }

      /* ── Termometre: damarlı ahşap pano + cam tüp ── */
      .vw-thermo-board{
        flex: 1;
        align-self: stretch;
        display: flex;
        align-items: stretch;
        justify-content: center;
        gap: 7px;
        min-height: 0;
        padding: 8px 10px 12px;
        border-radius: 8px;
        background:
          var(--vw-wood),
          repeating-linear-gradient(93deg, rgba(0,0,0,.09) 0 2px, transparent 2px 7px),
          linear-gradient(160deg, #6b4a26 0%, #4a3113 100%);
        box-shadow: inset 0 2px 4px rgba(0,0,0,.55), inset 0 -1px 0 rgba(255,255,255,.07), inset 0 0 0 1px rgba(202,160,68,.35);
      }
      .vw-thermo-scale{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        padding: 2px 0 10px;
        font-family: Georgia, serif;
        font-size: 8px;
        color: #f2d98a;
        line-height: 1;
      }
      .vw-thermo-ticks{
        width: 5px;
        margin: 4px 0 14px;
        background: repeating-linear-gradient(180deg, rgba(242,217,138,.85) 0 1px, transparent 1px 8px);
      }
      .vw-tube{
        position: relative;
        width: 12px;
        border-radius: 8px 8px 0 0;
        margin-bottom: 12px;
        background:
          linear-gradient(90deg, transparent 12%, rgba(255,255,255,.5) 24%, transparent 42%),
          linear-gradient(90deg, rgba(255,255,255,.28), rgba(255,255,255,.07) 40%, rgba(0,0,0,.3));
        box-shadow: inset 0 0 3px rgba(0,0,0,.45), 0 1px 2px rgba(0,0,0,.3);
      }
      .vw-mercury{
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 6px;
        transform: translateX(-50%);
        border-radius: 4px 4px 0 0;
        background: linear-gradient(180deg, #d34040, #8f1f1f);
      }
      .vw-bulb{
        position: absolute;
        left: 50%;
        bottom: -14px;
        width: 17px;
        height: 17px;
        transform: translateX(-50%);
        border-radius: 50%;
        background:
          radial-gradient(circle at 30% 24%, rgba(255,255,255,.8) 0 10%, transparent 32%),
          radial-gradient(circle at 35% 30%, #e06060, #8f1f1f 75%);
        box-shadow: 0 2px 4px rgba(0,0,0,.5), inset 0 -2px 3px rgba(0,0,0,.3);
      }
      .vw-thermo-read{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2px;
      }

      /* ── GPS alıcısı ── */
      .vw-gps-top{
        align-self: stretch;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .vw-btn{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        color: #f2d98a;
        background:
          radial-gradient(circle at 32% 26%, rgba(255,255,255,.2) 0 12%, transparent 34%),
          radial-gradient(circle at 35% 30%, #4a3b2c, #241a10);
        border: 1px solid rgba(202,160,68,.5);
        box-shadow: 0 1px 2px rgba(0,0,0,.5), inset 0 1px 0 rgba(242,217,138,.15);
        transition: transform .12s ease;
      }
      .vw-btn:active{ transform: scale(.9); }
      .vw-lcd{
        position: relative;
        align-self: stretch;
        flex: 1;
        border-radius: 6px;
        border: 2px solid #000;
        padding: 7px 10px;
        background: #0c1a10;
        box-shadow: inset 0 0 12px rgba(0,0,0,.8), inset 0 0 30px rgba(125,255,160,.06), 0 1px 0 rgba(242,217,138,.1);
        font-family: ui-monospace, SFMono-Regular, Menlo, 'Courier New', monospace;
        color: #7dffa0;
        text-shadow: 0 0 4px rgba(125,255,160,.45);
        font-size: 11px;
        line-height: 1.5;
        overflow: hidden;
      }
      /* LCD camı: tarama satırları + köşegen cam parlaması */
      .vw-lcd::after{
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(112deg, rgba(255,255,255,.12) 0%, rgba(255,255,255,.03) 22%, transparent 38%),
          repeating-linear-gradient(180deg, rgba(0,0,0,.16) 0 1px, transparent 1px 3px);
      }
      .vw-lcd-dim{ opacity: .62; font-size: 9px; }
      .vw-lcd-row{
        display: flex;
        justify-content: space-between;
        gap: 8px;
        white-space: nowrap;
      }
      .vw-lcd-label{ overflow: hidden; text-overflow: ellipsis; }
      .vw-lcd-amber{ color: #ffd27d; text-shadow: 0 0 4px rgba(255,210,125,.4); }

      /* ── Güneş yayı (lombar): cıvatalı pirinç çerçeve + cam ── */
      .vw-porthole{
        position: relative;
        align-self: stretch;
        flex: 1;
        border-radius: 10px;
        padding: 4px;
        background:
          radial-gradient(circle at 26% 18%, rgba(255,255,255,.5) 0 6%, transparent 22%),
          linear-gradient(180deg, #f2d98a, #caa044 55%, #7a5c1a);
        box-shadow: 0 3px 8px rgba(0,0,0,.45), inset 0 -1px 2px rgba(0,0,0,.35);
      }
      .vw-porthole::before{
        content: "";
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        border-radius: inherit;
        background-image:
          radial-gradient(circle 1.7px at 7px 7px, #fdf0c0 0 30%, #6b4e16 45% 64%, transparent 74%),
          radial-gradient(circle 1.7px at calc(100% - 7px) 7px, #fdf0c0 0 30%, #6b4e16 45% 64%, transparent 74%),
          radial-gradient(circle 1.7px at 7px calc(100% - 7px), #fdf0c0 0 30%, #6b4e16 45% 64%, transparent 74%),
          radial-gradient(circle 1.7px at calc(100% - 7px) calc(100% - 7px), #fdf0c0 0 30%, #6b4e16 45% 64%, transparent 74%);
      }
      .vw-porthole-glass{
        height: 100%;
        border-radius: 7px;
        padding: 6px 10px 2px;
        background:
          linear-gradient(150deg, rgba(255,255,255,.4) 4%, rgba(255,255,255,.1) 20%, transparent 38%),
          linear-gradient(180deg, #f8eed4 0%, #e9cf9e 100%);
        box-shadow: inset 0 2px 6px rgba(90,60,20,.35);
      }
      .vw-sun-times{
        align-self: stretch;
        display: flex;
        justify-content: space-between;
        padding: 0 14px;
      }
      .vw-sun-time{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1px;
      }
      .vw-sun-time .vw-digital{ font-size: 13px; }
    `}</style>
  );
}
