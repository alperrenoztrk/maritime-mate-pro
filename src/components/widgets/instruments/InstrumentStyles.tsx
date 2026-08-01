/**
 * Fotoğraf tabanlı enstrüman widget'larının ortak CSS'i (`iw-` prefix).
 * HomeWidgetGrid tarafından bir kez render edilir; bileşenler yalnızca sınıfları kullanır.
 *
 * Kural: gövde artık gradyanla çizilmiyor — fotoğraf veriyor. CSS'in işi
 * yalnızca (1) fotoğrafı kutuya kırpmak, (2) okuma yüzeyini örtüp yeniden
 * çizmek, (3) yazıyı her fotoğrafın üstünde okunur tutmak. Konum/ölçü
 * değerleri bileşenlerden inline gelir (bkz. overlayGeometry.ts).
 */
export function InstrumentStyles() {
  return (
    <style>{`
      /* ── Kasa: fotoğrafı kırpan kutu ── */
      .iw-device{
        position: relative;
        isolation: isolate;
        overflow: hidden;
        align-self: start;
        border-radius: 14px;
        border: 1px solid rgba(202,160,68,.34);
        background: #14100c;
        box-shadow:
          0 2px 4px rgba(0,0,0,.45),
          0 10px 22px rgba(0,0,0,.5);
      }
      .iw-small{ grid-column: span 1; }
      .iw-medium{ grid-column: span 2; }

      .iw-photo{
        position: absolute;
        z-index: 0;
        max-width: none;
        object-fit: fill;
        user-select: none;
        pointer-events: none;
      }
      /* Fotoğraf gelmezse okumalar yine de okunur kalsın. */
      .iw-device--fallback{
        background: linear-gradient(160deg, #2a211a 0%, #16100b 100%);
      }

      /* ── Üst şerit: pirinç plaka + eylem ── */
      .iw-top{
        position: absolute;
        z-index: 6;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 6px;
        padding: 7px 8px 14px;
        background: linear-gradient(180deg, rgba(6,4,2,.78) 0%, rgba(6,4,2,.42) 55%, transparent 100%);
        pointer-events: none;
      }
      .iw-top > *{ pointer-events: auto; }

      .iw-plate{
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 9px;
        font-weight: 600;
        line-height: 1.1;
        letter-spacing: .12em;
        color: #3a2b10;
        text-transform: uppercase;
        text-align: center;
        padding: 3px 10px;
        border-radius: 3px;
        max-width: 100%;
        text-shadow: 0 1px 0 rgba(255,255,255,.42);
        background:
          radial-gradient(circle 1.6px at 4.5px 50%, #6b4e16 0 58%, rgba(0,0,0,.4) 66%, transparent 74%),
          radial-gradient(circle 1.6px at calc(100% - 4.5px) 50%, #6b4e16 0 58%, rgba(0,0,0,.4) 66%, transparent 74%),
          linear-gradient(180deg, #f6e3a0 0%, #dfba63 52%, #caa044 100%);
        box-shadow: inset 0 1px 1px rgba(255,255,255,.55), inset 0 -1px 1px rgba(0,0,0,.35), 0 1px 3px rgba(0,0,0,.6);
      }

      /* ── Alt şerit: okumalar. Fotoğraf ne olursa olsun kontrast burada. ── */
      .iw-readout{
        position: absolute;
        z-index: 6;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1px;
        padding: 14px 8px 7px;
        background: linear-gradient(0deg, rgba(6,4,2,.9) 0%, rgba(6,4,2,.66) 48%, transparent 100%);
      }
      /* İki okumayı yan yana koyan satır (doğuş/batış gibi). */
      .iw-split{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-end;
        padding-inline: 10px;
      }
      .iw-readout-cell{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1px;
      }

      .iw-digital{
        font-family: Georgia, 'Times New Roman', serif;
        font-variant-numeric: tabular-nums;
        font-size: 15px;
        font-weight: 700;
        color: #f6e3a0;
        text-shadow: 0 1px 2px rgba(0,0,0,.85);
        letter-spacing: .08em;
        line-height: 1;
      }
      .iw-sub{
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 8px;
        color: #d8cba6;
        text-shadow: 0 1px 2px rgba(0,0,0,.85);
        letter-spacing: .08em;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.2;
      }
      .iw-engraved{
        font-family: Georgia, 'Times New Roman', serif;
        color: #e2d3a8;
        text-shadow: 0 1px 2px rgba(0,0,0,.8);
        letter-spacing: .1em;
      }

      /* ── Kadran yüzeyi: fotoğraftaki donmuş ibreleri örter ── */
      .iw-face{
        position: absolute;
        z-index: 2;
        border-radius: 50%;
        transform-style: preserve-3d;
        background:
          radial-gradient(circle at 40% 32%, #fdf6e0 0%, #f8eed4 55%, #ecd9ae 100%);
        box-shadow:
          inset 0 0 0 1px rgba(74,49,19,.4),
          inset 0 3px 9px rgba(90,60,20,.32),
          0 0 7px 4px rgba(20,12,4,.28);
      }
      /*
        Taksimat halkası + kubbe cam yansıması — fotoğrafın camını taklit eder.
        Sıralama önemli: opak iç disk konik gradyanın ÜSTÜNDE durur, yoksa
        taksimat çizgileri merkeze kadar uzayıp pasta dilimine döner.
      */
      .iw-face::after{
        content: "";
        position: absolute;
        inset: 0;
        /* Kadran zemininin üstünde ama rakam/ibre/göbeğin altında kalmalı. */
        z-index: 1;
        border-radius: 50%;
        pointer-events: none;
        background:
          radial-gradient(circle at 68% 82%, rgba(255,255,255,.16) 0 8%, transparent 26%),
          linear-gradient(148deg, rgba(255,255,255,.34) 6%, rgba(255,255,255,.09) 24%, transparent 44%),
          radial-gradient(circle, #f8eed4 0 84%, transparent 85%),
          repeating-conic-gradient(from -0.75deg, #4a3113 0 1.5deg, transparent 1.5deg 30deg);
      }
      /* GMT: koyu arduvaz kadran */
      .iw-face--gmt{
        background: radial-gradient(circle at 40% 32%, #2e3f52 0%, #22303f 55%, #17222e 100%);
        box-shadow:
          inset 0 0 0 1px rgba(218,165,32,.45),
          inset 0 3px 9px rgba(0,0,0,.5),
          0 0 7px 4px rgba(6,10,16,.36);
      }
      .iw-face--gmt::after{
        background:
          radial-gradient(circle at 68% 82%, rgba(255,255,255,.1) 0 8%, transparent 26%),
          linear-gradient(148deg, rgba(255,255,255,.26) 6%, rgba(255,255,255,.07) 24%, transparent 44%),
          radial-gradient(circle, #22303f 0 84%, transparent 85%),
          repeating-conic-gradient(from -0.75deg, #f2d98a 0 1.5deg, transparent 1.5deg 30deg);
      }
      /* Pusula kartı: krem zemin + artı tel, taksimat 15°'de bir (daha ince) */
      .iw-face--card::after{
        background:
          radial-gradient(circle at 68% 82%, rgba(255,255,255,.16) 0 8%, transparent 26%),
          linear-gradient(148deg, rgba(255,255,255,.34) 6%, rgba(255,255,255,.09) 24%, transparent 44%),
          linear-gradient(0deg, transparent calc(50% - .5px), rgba(74,49,19,.26) 50%, transparent calc(50% + .5px)),
          linear-gradient(90deg, transparent calc(50% - .5px), rgba(74,49,19,.26) 50%, transparent calc(50% + .5px)),
          radial-gradient(circle, #f8eed4 0 86%, transparent 87%),
          repeating-conic-gradient(from -0.5deg, #4a3113 0 1deg, transparent 1deg 15deg);
      }

      /* Roma rakamları / kerteriz harfleri */
      .iw-nu{
        position: absolute;
        z-index: 3;
        font-family: Georgia, 'Times New Roman', serif;
        font-size: clamp(7px, 2.4vw, 10px);
        font-weight: 700;
        color: #4a3113;
        line-height: 1;
      }
      .iw-face--gmt .iw-nu{ color: #f2d98a; }
      .iw-nu--t{ top: 11%; left: 50%; transform: translateX(-50%); }
      .iw-nu--r{ right: 12%; top: 50%; transform: translateY(-50%); }
      .iw-nu--b{ bottom: 11%; left: 50%; transform: translateX(-50%); }
      .iw-nu--l{ left: 12%; top: 50%; transform: translateY(-50%); }

      /* İbreler — transition yok: 1 Hz atlama gerçek kronometre tiki */
      .iw-hand{
        position: absolute;
        left: 50%;
        bottom: 50%;
        transform-origin: 50% 100%;
        border-radius: 99px;
        z-index: 4;
        filter: drop-shadow(0 1px 1px rgba(0,0,0,.4));
      }
      .iw-hand--hour{ width: 4px; height: 24%; background: #3f2a0e; }
      .iw-hand--min{ width: 3px; height: 33%; background: #3f2a0e; }
      .iw-hand--sec{ width: 1.5px; height: 38%; background: #8f1f1f; }
      .iw-face--gmt .iw-hand--hour, .iw-face--gmt .iw-hand--min{ background: #f2d98a; }
      .iw-cap{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 9px;
        height: 9px;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background: radial-gradient(circle at 35% 30%, #f2d98a, #7a5c1a 80%);
        box-shadow: 0 1px 2px rgba(0,0,0,.45);
        z-index: 5;
      }
      .iw-needle{
        position: absolute;
        left: 50%;
        top: 14%;
        width: 3px;
        height: 72%;
        transform-origin: 50% 50%;
        border-radius: 99px;
        background: linear-gradient(180deg, #8f1f1f 0 50%, #384355 50%);
        filter: drop-shadow(0 1px 1px rgba(0,0,0,.4));
        z-index: 4;
      }

      /* ── LCD: fotoğraftaki ekranın üstüne canlı fosfor ── */
      .iw-screen{
        position: absolute;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1px;
        padding: 6px 8px;
        border-radius: 3px;
        background: #0c1a10;
        box-shadow:
          inset 0 0 12px rgba(0,0,0,.8),
          inset 0 0 30px rgba(125,255,160,.06),
          0 0 0 1px rgba(0,0,0,.65);
        font-family: ui-monospace, SFMono-Regular, Menlo, 'Courier New', monospace;
        color: #7dffa0;
        text-shadow: 0 0 4px rgba(125,255,160,.45);
        /* Ekran fotoğrafın çerçevesi kadar dar; DMS satırı taşmasın. */
        font-size: 9px;
        line-height: 1.5;
        overflow: hidden;
      }
      /* Ekran camı: tarama satırları + köşegen parlama */
      .iw-screen::after{
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(112deg, rgba(255,255,255,.12) 0%, rgba(255,255,255,.03) 22%, transparent 38%),
          repeating-linear-gradient(180deg, rgba(0,0,0,.16) 0 1px, transparent 1px 3px);
      }
      .iw-lcd-dim{ opacity: .62; font-size: 7px; }
      .iw-lcd-row{
        display: flex;
        justify-content: space-between;
        gap: 8px;
        white-space: nowrap;
      }
      .iw-lcd-label{ overflow: hidden; text-overflow: ellipsis; }
      .iw-lcd-amber{ color: #ffd27d; text-shadow: 0 0 4px rgba(255,210,125,.4); }

      .iw-btn{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        border-radius: 50%;
        color: #f2d98a;
        background:
          radial-gradient(circle at 32% 26%, rgba(255,255,255,.2) 0 12%, transparent 34%),
          radial-gradient(circle at 35% 30%, #4a3b2c, #241a10);
        border: 1px solid rgba(202,160,68,.5);
        box-shadow: 0 1px 3px rgba(0,0,0,.6), inset 0 1px 0 rgba(242,217,138,.15);
        transition: transform .12s ease;
      }
      .iw-btn:active{ transform: scale(.9); }

      /* ── Termometre: fotoğrafın kılcalını örten cam tüp ── */
      .iw-tube{
        position: absolute;
        z-index: 2;
        border-radius: 3px;
        background:
          linear-gradient(90deg, transparent 10%, rgba(255,255,255,.4) 26%, transparent 46%),
          linear-gradient(90deg, rgba(206,204,198,.92), rgba(186,184,177,.88) 42%, rgba(150,148,142,.9));
        box-shadow: inset 0 0 3px rgba(0,0,0,.35), 0 0 3px rgba(0,0,0,.25);
      }
      .iw-mercury{
        position: absolute;
        left: 0;
        right: 0;
        border-radius: 2px 2px 0 0;
        background: linear-gradient(180deg, #d34040, #8f1f1f);
        box-shadow: inset -1px 0 1px rgba(0,0,0,.3);
      }

      /* ── Lombar camı: güneş yayının çizildiği daire ── */
      .iw-glass{
        position: absolute;
        z-index: 2;
        border-radius: 50%;
        overflow: hidden;
        background: radial-gradient(circle at 50% 78%, rgba(10,22,34,.34) 0%, rgba(10,22,34,.06) 62%, transparent 100%);
      }
      .iw-glass svg{ display: block; width: 100%; height: 100%; }
    `}</style>
  );
}
