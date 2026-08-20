/**
 * Fotoğraf tabanlı enstrüman widget'Common CSS of'i (`iw-` prefix).
 * HomeWidgetGrid tarafından bir kez render edilir; bileşenler yalnızca sınıfları kullanır.
 *
 * İş bölümü: gövdeyi FOTOĞRAF verir, okuma yüzeyini SVG çizer (bkz.
 * ChronometerFace / WindDialFace / PortholeSky), CSS ise ikisini aynı ışığa
 * oturtur — fotoğrafı kutuya kırpar, üstüne ortak bir vinyet/parlama geçirir,
 * pirinç plakayı ve alt okuma şeridini kabartır. Konum/ölçü değerleri
 * bileşenlerden inline gelir (bkz. overlayGeometry.ts).
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
          0 10px 22px rgba(0,0,0,.5),
          inset 0 1px 0 rgba(255,232,170,.14);
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

      /*
        Ortak ışık: altı fotoğraf altı ayrı stüdyoda çekildi. Hepsinin üstünden
        aynı vinyet ve aynı köşegen parlama geçince tek bir dolabın içindeki
        enstrümanlar gibi dururlar. Canlı yüzeylerin (z-index 2) altında kalır.
      */
      .iw-grade{
        position: absolute;
        z-index: 1;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(128deg, rgba(255,244,214,.14) 0%, rgba(255,244,214,.03) 26%, transparent 46%),
          radial-gradient(120% 110% at 34% 26%, rgba(255,236,196,.1) 0%, transparent 58%),
          radial-gradient(130% 120% at 50% 52%, transparent 46%, rgba(10,6,2,.34) 84%, rgba(6,3,1,.6) 100%);
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
        background: linear-gradient(180deg, rgba(6,4,2,.7) 0%, rgba(6,4,2,.34) 55%, transparent 100%);
        pointer-events: none;
      }
      .iw-top > *{ pointer-events: auto; }

      /* Pirinç künye: fırçalanmış yüzey, iki vida, kazınmış harfler. */
      .iw-plate{
        position: relative;
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 9px;
        font-weight: 600;
        line-height: 1.1;
        letter-spacing: .12em;
        color: #3a2b10;
        text-transform: uppercase;
        text-align: center;
        padding: 3px 11px;
        border-radius: 3px;
        max-width: 100%;
        text-shadow: 0 1px 0 rgba(255,255,255,.5), 0 -1px 0 rgba(0,0,0,.22);
        background:
          radial-gradient(circle 1.7px at 5px 50%, #6b4e16 0 52%, rgba(0,0,0,.45) 62%, transparent 72%),
          radial-gradient(circle 1.7px at calc(100% - 5px) 50%, #6b4e16 0 52%, rgba(0,0,0,.45) 62%, transparent 72%),
          repeating-linear-gradient(94deg, rgba(255,255,255,.09) 0 1px, rgba(120,88,24,.05) 1px 3px),
          linear-gradient(180deg, #f8e7ab 0%, #dfba63 48%, #b98f34 100%);
        box-shadow:
          inset 0 1px 1px rgba(255,255,255,.6),
          inset 0 -1px 1px rgba(0,0,0,.4),
          0 1px 3px rgba(0,0,0,.6);
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
        padding: 15px 8px 7px;
        background: linear-gradient(0deg, rgba(5,3,1,.92) 0%, rgba(5,3,1,.68) 46%, transparent 100%);
      }
      /* Şeridi kasaya bağlayan pirinç kılcal çizgi. */
      .iw-readout::before{
        content: "";
        position: absolute;
        left: 10%;
        right: 10%;
        top: 12px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(226,190,110,.4) 22%, rgba(226,190,110,.4) 78%, transparent);
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
        color: #f7e6ac;
        text-shadow: 0 1px 2px rgba(0,0,0,.9), 0 0 10px rgba(226,180,90,.28);
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

      /* ── Kadran: fotoğraftaki donmuş kadranı canlı SVG yüzey örter ──
         Kutu yalnızca daireyi konumlandırır; bütün çizim SVG'de. Gölge,
         yüzeyi fotoğrafın camının altına oturtur. */
      .iw-dial{
        position: absolute;
        z-index: 2;
        border-radius: 50%;
        box-shadow:
          0 0 5px 2px rgba(16,10,3,.4),
          inset 0 1px 3px rgba(0,0,0,.3);
      }
      .iw-svg{
        display: block;
        width: 100%;
        height: 100%;
        /* Yüzey içindeki karışım modları fotoğrafa taşmasın. */
        isolation: isolate;
      }

      /* ── LCD: fotoğraftaki renkli ekranın üstüne canlı sayfa ──
         SGN-500'ün ekranı beyaz zeminli renkli bir LCD; düzen cihazınkini
         izler: sarı başlık şeridi, kutulanmış küçük alanlar, ortada iri mevki
         satırları. Alan adları küçük ve gri, değerler kalın siyah. */
      .iw-screen{
        position: absolute;
        z-index: 2;
        display: flex;
        flex-direction: column;
        border-radius: 2px;
        overflow: hidden;
        background: linear-gradient(180deg, #f4f4f0 0%, #e2e4de 100%);
        box-shadow:
          0 0 0 1px rgba(0,0,0,.7),
          inset 0 0 10px rgba(20,30,20,.16);
        font-family: ui-monospace, SFMono-Regular, Menlo, 'Courier New', monospace;
        color: #16191c;
        line-height: 1.2;
      }
      /* Ekran camı: piksel ızgarası, tarama satırları, köşegen parlama */
      .iw-screen::after{
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(112deg, rgba(255,255,255,.4) 0%, rgba(255,255,255,.08) 20%, transparent 38%),
          repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 1px, transparent 1px 2px),
          repeating-linear-gradient(180deg, rgba(0,0,0,.07) 0 1px, transparent 1px 3px);
      }

      /* Başlık şeridi: fotoğrafta pusula bandının bulunduğu sarı kuşak. */
      .iw-lcd-bar{
        display: flex;
        justify-content: space-between;
        gap: 6px;
        padding: 1px 4px;
        font-size: 6.5px;
        font-weight: 700;
        letter-spacing: .08em;
        color: #3c3308;
        background: linear-gradient(180deg, #e8ca45 0%, #cdac2c 100%);
        border-bottom: 1px solid rgba(0,0,0,.5);
      }
      .iw-lcd-place{
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* Alan satırı: cihazdaki gibi üç eşit kutu, aralarında ince ayırıcı. */
      .iw-lcd-cells{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        border-bottom: 1px solid rgba(0,0,0,.35);
      }
      .iw-lcd-cells:last-child{ border-bottom: 0; border-top: 1px solid rgba(0,0,0,.35); }
      .iw-lcd-cell{
        display: flex;
        flex-direction: column;
        min-width: 0;
        padding: 0 3px 1px;
        border-right: 1px solid rgba(0,0,0,.3);
      }
      .iw-lcd-cell:last-child{ border-right: 0; }
      .iw-lcd-key{
        margin: 0 -3px 1px;
        padding: 0 3px;
        font-size: 5.2px;
        letter-spacing: .1em;
        color: #5c6167;
        background: rgba(15,25,35,.08);
      }
      .iw-lcd-val{
        font-size: 9px;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .iw-lcd-small{ font-size: 7.5px; }
      .iw-lcd-warn{ color: #a3520f; }

      /* Mevki: ekranın ortasını kaplayan iki iri satır. */
      .iw-lcd-fix{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1px;
        padding: 1px 5px;
        min-height: 0;
      }
      .iw-lcd-coord{
        font-size: 12.8px;
        font-weight: 700;
        letter-spacing: -.03em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

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

      /* ── Termometre: fotoğrafın kılcalını örten cam kılcal ──
         Tüp saydam: fotoğrafın basılı taksimatı arkasından görünür, yalnızca
         kılcalın kendisi yeniden boyanır. */
      .iw-tube{
        position: absolute;
        z-index: 2;
        border-radius: 2px;
        /* Neredeyse saydam: fotoğrafın basılı taksimatı arkadan okunmaya devam
           etsin, yalnızca kılcalın camı yeniden ışıklansın. */
        background:
          linear-gradient(90deg,
            rgba(255,255,255,.3) 0%,
            rgba(255,255,255,.34) 20%,
            rgba(148,156,154,.12) 54%,
            rgba(72,78,76,.22) 100%);
        box-shadow: inset 0 0 2px rgba(0,0,0,.3);
      }
      .iw-mercury{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        /* Silindir: sol kenarda ışık, sağ kenarda gölge. */
        background:
          linear-gradient(90deg, #5d0f0f 0%, #a9231d 24%, #e0685c 39%, #a81f19 62%, #4d0c0c 100%);
        box-shadow:
          0 0 5px rgba(150,26,20,.5),
          inset 0 -8px 8px rgba(0,0,0,.22);
      }
      /* Menisküs: sıvının ucundaki kubbe. */
      .iw-mercury::after{
        content: "";
        position: absolute;
        left: -4%;
        right: -4%;
        top: -2px;
        height: 3.6px;
        border-radius: 50%;
        background: radial-gradient(ellipse at 32% 26%, #e8867a 0%, #b32a22 52%, #6d1210 100%);
      }

      /* ── Lombar camı ── */
      .iw-glass{
        position: absolute;
        z-index: 2;
        border-radius: 50%;
        overflow: hidden;
      }
      /* Güneşin camın dışına, madeni çerçeveye vuran ışığı. */
      .iw-spill{
        position: absolute;
        z-index: 3;
        width: 62%;
        aspect-ratio: 1;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: screen;
        filter: blur(6px);
      }
    `}</style>
  );
}
