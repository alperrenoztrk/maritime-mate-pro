/**
 * Gerçek gazete nesnesinin paylaşılan CSS'i (`gz-` prefix).
 * MaritimeNews sayfası ve NewsReaderDialog tarafından render edilir; her yazı
 * kağıdın üzerine "basılı" durur. Doku için harici görsel yok — yalnızca
 * inline SVG data-URI (feTurbulence) + gradyanlar kullanılır.
 */
export function NewspaperStyles() {
  return (
    <style>{`
      .gz-sheet{
        /* Mürekkep tonları tek yerden */
        --gz-ink: #241d10;
        --gz-ink-soft: rgba(36,29,16,.74);
        --gz-ink-faint: rgba(36,29,16,.5);
        --gz-rule: rgba(36,29,16,.55);
        position: relative;
        isolation: isolate;
        color: var(--gz-ink);
        font-family: Georgia, 'Times New Roman', serif;
        border-radius: 3px;
        /* Sararmış gazete kağıdı: kenarlara doğru koyulaşan sıcak ton + leke bulutları */
        background:
          radial-gradient(70% 26% at 82% 4%, rgba(150,110,44,.10), transparent 70%),
          radial-gradient(46% 20% at 12% 88%, rgba(150,110,44,.12), transparent 72%),
          radial-gradient(130% 105% at 50% 42%, transparent 58%, rgba(126,94,38,.16) 88%, rgba(104,76,28,.24) 100%),
          linear-gradient(180deg, #f3e9cf 0%, #eee1c1 46%, #e6d5ae 100%);
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,.55),
          inset 0 0 0 1px rgba(120,90,36,.18),
          0 2px 5px rgba(0,0,0,.35),
          0 24px 44px -16px rgba(0,0,0,.62);
      }
      /* Kağıt hamuru taneciği — feTurbulence benekleri, çarpım karışımıyla */
      .gz-grain{
        position: absolute;
        inset: 0;
        z-index: 5;
        border-radius: inherit;
        pointer-events: none;
        mix-blend-mode: multiply;
        opacity: .6;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0.1 0.1 0 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
      }
      /* Sağ alt köşe kıvrımı */
      .gz-curl{
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 4;
        width: 64px;
        height: 64px;
        pointer-events: none;
        clip-path: polygon(100% 0, 0 100%, 100% 100%);
        background: linear-gradient(315deg, #c8b58a 0%, #ded0a9 34%, #f4ecd6 47%, rgba(0,0,0,.28) 50%, rgba(0,0,0,.1) 55%, transparent 62%);
        border-bottom-right-radius: 3px;
      }
      /* Gövde içi katlama izi — manşet haberin hemen altına akışta yerleşir */
      .gz-foldline{
        height: 18px;
        margin: 2px 0 6px;
        background:
          linear-gradient(180deg,
            transparent 0%,
            rgba(96,72,30,.12) 34%,
            rgba(96,72,30,.22) 47%,
            rgba(255,255,255,.5) 53%,
            rgba(96,72,30,.14) 66%,
            transparent 100%);
      }

      /* ── Manşet (masthead) ── */
      .gz-ear{
        font-size: 8px;
        line-height: 1.5;
        letter-spacing: .1em;
        text-transform: uppercase;
        color: var(--gz-ink-soft);
        border: 1px solid var(--gz-rule);
        padding: 3px 6px;
        text-align: center;
        max-width: 30%;
      }
      .gz-masthead{
        text-align: center;
        font-weight: 900;
        font-size: clamp(1.65rem, 8.2vw, 3.1rem);
        line-height: .95;
        letter-spacing: .045em;
        color: #201a0e;
        /* Baskı mürekkebi hissi: hafif çift vuruş */
        text-shadow: 0 0 .6px rgba(32,26,14,.8), .4px .6px 0 rgba(255,255,255,.32);
        white-space: nowrap;
      }
      .gz-masthead-sub{
        margin-top: 3px;
        text-align: center;
        font-size: 8.5px;
        font-variant: small-caps;
        letter-spacing: .34em;
        color: var(--gz-ink-soft);
      }
      .gz-rule-double{ border-bottom: 3.5px double var(--gz-ink); opacity: .82; }
      .gz-rule-thick{ border-bottom: 2px solid var(--gz-ink); opacity: .8; }
      .gz-rule-thin{ border-bottom: 1px solid var(--gz-rule); }
      .gz-dateline{
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 8px;
        padding: 4px 2px;
        font-size: 9px;
        font-variant: small-caps;
        letter-spacing: .12em;
        color: var(--gz-ink-soft);
        white-space: nowrap;
      }
      .gz-dateline > span{ overflow: hidden; text-overflow: ellipsis; }

      /* Lastik damga — baskı saati */
      .gz-stamp{
        position: absolute;
        z-index: 6;
        padding: 4px 10px;
        border: 2px solid rgba(154,32,28,.75);
        border-radius: 50% / 46%;
        transform: rotate(-8deg);
        font-size: 9px;
        font-weight: 700;
        letter-spacing: .14em;
        text-transform: uppercase;
        color: rgba(154,32,28,.82);
        mix-blend-mode: multiply;
        pointer-events: none;
        text-align: center;
        line-height: 1.25;
        /* Damganın eksik basılmış köşeleri */
        -webkit-mask-image: radial-gradient(120% 120% at 30% 20%, #000 55%, rgba(0,0,0,.35) 78%, rgba(0,0,0,.7) 100%);
        mask-image: radial-gradient(120% 120% at 30% 20%, #000 55%, rgba(0,0,0,.35) 78%, rgba(0,0,0,.7) 100%);
      }

      /* ── Basılı fotoğraf: sepya + yarım ton tramı + mürekkep çerçevesi ── */
      .gz-photo-wrap{
        position: relative;
        display: block;
        overflow: hidden;
        background: #d8c9a4;
        border: 1px solid rgba(36,29,16,.72);
        box-shadow: inset 0 0 0 1px rgba(255,255,255,.3), 0 1px 0 rgba(255,255,255,.35);
      }
      .gz-photo{
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: grayscale(1) sepia(.34) contrast(1.02) brightness(1.02);
      }
      .gz-photo-wrap::after{
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        mix-blend-mode: multiply;
        opacity: .42;
        background-image: radial-gradient(circle, rgba(40,32,18,.85) .55px, transparent .9px);
        background-size: 2.8px 2.8px;
      }
      .gz-photo-wrap::before{
        content: "";
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background: radial-gradient(118% 100% at 50% 44%, transparent 66%, rgba(56,40,16,.24) 100%);
      }
      .gz-photo-none{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        color: var(--gz-ink-faint);
        background:
          repeating-linear-gradient(45deg, rgba(36,29,16,.05) 0 5px, transparent 5px 10px),
          #e3d4ae;
        font-size: 10px;
        font-variant: small-caps;
        letter-spacing: .12em;
        text-align: center;
        padding: 6px;
      }
      .gz-caption{
        margin-top: 3px;
        font-size: 8.5px;
        font-style: italic;
        letter-spacing: .04em;
        color: var(--gz-ink-faint);
        line-height: 1.35;
      }

      /* ── Dizgi tipografisi ── */
      .gz-kicker{
        font-size: 9px;
        font-weight: 700;
        letter-spacing: .26em;
        text-transform: uppercase;
        color: var(--gz-ink-soft);
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .gz-kicker::before, .gz-kicker::after{
        content: "";
        flex: 1;
        border-bottom: 1px solid var(--gz-rule);
      }
      .gz-headline{
        font-weight: 800;
        line-height: 1.08;
        letter-spacing: -.005em;
        color: #201a0e;
        text-wrap: balance;
      }
      .gz-just{
        text-align: justify;
        hyphens: auto;
        -webkit-hyphens: auto;
        word-break: break-word;
      }
      .gz-byline{
        font-size: 8.5px;
        font-variant: small-caps;
        letter-spacing: .12em;
        color: var(--gz-ink-faint);
        display: flex;
        gap: 6px;
        align-items: baseline;
        min-width: 0;
      }
      .gz-byline .gz-src{
        font-weight: 700;
        color: var(--gz-ink-soft);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .gz-readmore{
        font-size: 9px;
        font-style: italic;
        color: var(--gz-ink-faint);
        letter-spacing: .04em;
      }
      /* Gömme büyük harf — makale ilk paragrafı */
      .gz-dropcap::first-letter{
        float: left;
        font-size: 3.05em;
        line-height: .82;
        font-weight: 700;
        padding: 3px 6px 0 0;
        color: #201a0e;
      }
      .gz-end{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 10px;
        letter-spacing: .3em;
        color: var(--gz-ink-faint);
      }
      .gz-end::before, .gz-end::after{
        content: "";
        width: 46px;
        border-bottom: 1px solid var(--gz-rule);
      }

      /* Basılı uyarı kutusu (hata / özet düştü notu) */
      .gz-notice{
        border: 1px dashed rgba(122,44,18,.55);
        background: rgba(154,74,28,.07);
        color: rgba(96,46,16,.9);
        padding: 7px 10px;
        font-size: 10.5px;
        line-height: 1.45;
        font-style: italic;
      }

      /* Dizgi yükleniyor iskeleti — soluk mürekkep satırları */
      .gz-skel{
        border-radius: 1px;
        background: linear-gradient(90deg, rgba(36,29,16,.14), rgba(36,29,16,.08) 55%, rgba(36,29,16,.14));
      }

      /* Ekran içinde dokunulabilir makale blokları */
      .gz-tap{
        display: block;
        width: 100%;
        text-align: left;
        color: inherit;
        border-radius: 2px;
      }
      .gz-tap:active{ background: rgba(36,29,16,.06); }
      .gz-tap:focus-visible{ outline: 2px solid rgba(122,92,26,.7); outline-offset: 2px; }
    `}</style>
  );
}
