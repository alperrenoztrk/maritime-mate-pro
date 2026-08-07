/**
 * Gerçek gazete nesnesinin paylaşılan CSS'i (`gz-` prefix).
 * MaritimeNews sayfası, NewsReaderDialog ve ana sayfadaki NewsPanel tarafından
 * render edilir; her yazı kağıdın üzerine "basılı" durur.
 *
 * Doku için harici görsel yok — yalnızca inline SVG data-URI (feTurbulence) +
 * gradyanlar. Yazı tipleri `src/index.css` içinde kendi sunucumuzdan tanımlı
 * (UnifrakturMaguntia / Playfair Display / Old Standard TT), Georgia fallback'li.
 */

/* Büyük ölçekli, bulutumsu renk oynaması — eski kağıdın asıl "eskimiş" katmanı.
   Düşük baseFrequency ile geniş lekeler; alfa turbulence'ın R kanalından
   türetildiği için düzensiz ve tekrarsız görünür. */
const MOTTLE_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='700' height='700'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.009' numOctaves='4' seed='11' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.38 0 0 0 0 0.26 0 0 0 0 0.10 0.95 0 0 0 -0.34'/%3E%3C/filter%3E%3Crect width='700' height='700' filter='url(%23m)'/%3E%3C/svg%3E\")";

/* Kağıt lifi — hafifçe yön almış turbulence. Fazla gerilmiş ve koyu olduğunda
   kağıt değil dokuma kumaş gibi göründüğü için hem anizotropi hem alfa düşük. */
const FIBER_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.62 0.16' numOctaves='3' seed='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.30 0 0 0 0 0.22 0 0 0 0 0.10 0.2 0 0 0 -0.09'/%3E%3C/filter%3E%3Crect width='320' height='320' filter='url(%23f)'/%3E%3C/svg%3E\")";

/* İnce kağıt tırtılı — yüksek frekanslı benek. */
const TOOTH_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0.1 0.1 0 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function NewspaperStyles() {
  return (
    <style>{`
      .gz-sheet{
        /* Mürekkep tonları tek yerden */
        --gz-ink: #231c0f;
        --gz-ink-soft: rgba(35,28,15,.76);
        --gz-ink-faint: rgba(35,28,15,.52);
        --gz-rule: rgba(35,28,15,.55);
        /* Dizgi yazı tipleri: logo / başlık / metin */
        --gz-face-mast: 'UnifrakturMaguntia', 'Playfair Display', Georgia, serif;
        --gz-face-display: 'Playfair Display', Georgia, 'Times New Roman', serif;
        --gz-face-text: 'Old Standard TT', Georgia, 'Times New Roman', serif;

        position: relative;
        isolation: isolate;
        color: var(--gz-ink);
        font-family: var(--gz-face-text);
        border-radius: 0;
        /* Mürekkebin kağıda hafifçe yayılması (dot gain) — tüm dizgiye miras kalır */
        text-shadow: 0 0 .4px rgba(35,28,15,.5);
        /* Eski gazete kağıdı: düz krem taban + kenar tanlaması + küf (foxing)
           lekeleri. Dikey gradyan rampası bilerek yok — asıl düzensizliği
           .gz-grain katmanındaki turbulence veriyor. */
        background-color: #ece0c2;
        background-image:
          radial-gradient(circle 9px at 18% 23%, rgba(132,90,36,.16), transparent 70%),
          radial-gradient(circle 5px at 74% 11%, rgba(132,90,36,.15), transparent 72%),
          radial-gradient(circle 13px at 61% 46%, rgba(120,82,32,.10), transparent 75%),
          radial-gradient(circle 7px at 9% 66%, rgba(132,90,36,.15), transparent 70%),
          radial-gradient(circle 4px at 88% 57%, rgba(132,90,36,.18), transparent 68%),
          radial-gradient(circle 11px at 36% 82%, rgba(120,82,32,.12), transparent 74%),
          radial-gradient(circle 6px at 82% 88%, rgba(132,90,36,.15), transparent 70%),
          radial-gradient(circle 8px at 51% 95%, rgba(120,82,32,.11), transparent 72%),
          /* asimetrik iki vinyet — simetrik elips "sahte" duruyordu */
          radial-gradient(140% 92% at 42% 38%, transparent 54%, rgba(112,80,30,.16) 86%, rgba(86,60,22,.30) 100%),
          radial-gradient(92% 130% at 66% 62%, transparent 60%, rgba(104,74,28,.12) 90%, rgba(80,56,20,.22) 100%),
          /* destede üst üste durmuş kağıdın kenar tanlaması */
          linear-gradient(90deg, rgba(104,74,28,.20), transparent 3.5%, transparent 96.5%, rgba(104,74,28,.20)),
          linear-gradient(180deg, rgba(104,74,28,.18), transparent 2.5%, transparent 97.5%, rgba(104,74,28,.22));
        box-shadow:
          inset 0 0 0 1px rgba(120,90,36,.16),
          /* yüzeye değen kağıt: sıkı temas gölgesi, havada süzülmüyor */
          0 1px 2px rgba(0,0,0,.4),
          0 10px 18px -8px rgba(0,0,0,.45);
      }

      /* Kağıt dokusu: lekelenme + lif + tırtıl, üçü de çarpım karışımıyla */
      .gz-grain{
        position: absolute;
        inset: 0;
        z-index: 5;
        pointer-events: none;
        mix-blend-mode: multiply;
        background-image: ${MOTTLE_SVG}, ${FIBER_SVG}, ${TOOTH_SVG};
        background-size: 700px 700px, 320px 320px, 160px 160px;
        opacity: .42;
      }

      /* Arka yüzün mürekkebi — gerçek gazete kağıdı ince olduğu için arka
         sayfanın dizgisi hafifçe vurur. Aynalanmış satırlar + sütun boşlukları. */
      .gz-showthrough{
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        /* Sadece sezilecek kadar: daha koyu olduğunda kağıt değil dokuma görünüyor */
        opacity: .032;
        transform: scaleX(-1);
        background-image: repeating-linear-gradient(
          180deg,
          rgba(60,44,18,.9) 0 1.1px,
          transparent 1.1px 6.5px
        );
        /* Sütun boşlukları — keskin kenar bırakmaması için yumuşak geçişli */
        -webkit-mask-image: repeating-linear-gradient(90deg, #000 0 26%, transparent 31% 33%);
        mask-image: repeating-linear-gradient(90deg, #000 0 26%, transparent 31% 33%);
      }

      /* ── Manşet (masthead) ── */
      .gz-ear{
        font-family: var(--gz-face-text);
        font-size: 7px;
        line-height: 1.4;
        letter-spacing: .06em;
        text-transform: uppercase;
        color: var(--gz-ink-soft);
        border: 1px solid var(--gz-rule);
        padding: 2px 4px;
        text-align: center;
        flex-shrink: 0;
        max-width: 58px;
      }
      .gz-masthead{
        text-align: center;
        font-family: var(--gz-face-mast);
        font-weight: 400;
        /* Kulakların arasına sığmalı: dar ekranda taşmaması için ölçek düşük */
        font-size: clamp(1.2rem, 5.9vw, 3.3rem);
        line-height: 1.02;
        letter-spacing: .012em;
        color: #1d180c;
        /* Klişenin ağır basmış mürekkebi */
        text-shadow: 0 0 .7px rgba(29,24,12,.85), .3px .4px 0 rgba(255,255,255,.22);
        white-space: nowrap;
      }
      .gz-masthead-sub{
        margin-top: 4px;
        text-align: center;
        font-size: 8px;
        font-variant: small-caps;
        letter-spacing: .3em;
        color: var(--gz-ink-soft);
      }
      .gz-rule-double{ border-bottom: 3.5px double var(--gz-ink); opacity: .82; }
      .gz-rule-thick{ border-bottom: 2px solid var(--gz-ink); opacity: .8; }
      .gz-rule-thin{ border-bottom: 1px solid var(--gz-rule); }
      .gz-rule-hair{ border-bottom: 1px solid rgba(35,28,15,.3); }
      .gz-dateline{
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 8px;
        padding: 4px 2px;
        font-size: 8.5px;
        font-variant: small-caps;
        letter-spacing: .1em;
        color: var(--gz-ink-soft);
        white-space: nowrap;
      }
      .gz-dateline > span{ overflow: hidden; text-overflow: ellipsis; }

      /* ── Basılı fotoğraf: yarım ton tramı 45°'ye döndürülmüş ── */
      .gz-photo-wrap{
        position: relative;
        display: block;
        overflow: hidden;
        background: #d5c49c;
        border: 1px solid rgba(35,28,15,.72);
        box-shadow: inset 0 0 0 1px rgba(255,255,255,.26);
      }
      .gz-photo{
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        /* Gazete kağıdının ton aralığı dar ve sıkışıktır: mürekkep emici kağıtta
           tam siyaha inemez, gölgeler çamurlu griye oturur. Bu yüzden kontrast
           artırılmıyor, aksine parlaklık kaldırılıyor — hem daha sahici hem de
           koyu fotoğraflar (gece çekimleri, uydu görüntüleri) okunur kalıyor.
           Üstteki yarım ton katmanı zaten çarpım ile karartıyor.
           blur mürekkep yayılmasını (dot gain) taklit eder. */
        filter: grayscale(1) contrast(1.05) brightness(1.28) sepia(.32) blur(.2px);
      }
      .gz-photo-wrap::after{
        content: "";
        position: absolute;
        /* Döndürülmüş tramın köşeleri boş kalmasın diye kutudan bolca taşırılıyor */
        inset: -80%;
        transform: rotate(45deg);
        pointer-events: none;
        mix-blend-mode: multiply;
        opacity: .36;
        /* İki nokta katmanı, hafif kaydırılmış: baskı kaçıklığı + mürekkep yayılması */
        background-image:
          radial-gradient(circle, rgba(38,30,16,.85) .6px, transparent 1.05px),
          radial-gradient(circle, rgba(38,30,16,.32) .5px, transparent .95px);
        background-size: 3.4px 3.4px, 3.4px 3.4px;
        background-position: 0 0, .8px .55px;
      }
      .gz-photo-wrap::before{
        content: "";
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background: radial-gradient(118% 100% at 50% 44%, transparent 66%, rgba(56,40,16,.22) 100%);
      }
      .gz-caption{
        margin-top: 3px;
        font-size: 8.5px;
        font-style: italic;
        letter-spacing: .03em;
        color: var(--gz-ink-faint);
        line-height: 1.35;
      }

      /* ── Dizgi tipografisi ── */
      .gz-kicker{
        font-family: var(--gz-face-display);
        font-size: 8.5px;
        font-weight: 700;
        letter-spacing: .24em;
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
        font-family: var(--gz-face-display);
        font-weight: 900;
        line-height: 1.05;
        letter-spacing: -.012em;
        color: #1d180c;
        text-wrap: balance;
      }
      /* Manşetin altındaki italik ara başlık */
      .gz-deck{
        font-family: var(--gz-face-display);
        font-style: italic;
        font-weight: 700;
        line-height: 1.28;
        color: var(--gz-ink-soft);
        text-wrap: balance;
      }
      .gz-just{
        text-align: justify;
        hyphens: auto;
        -webkit-hyphens: auto;
        hyphenate-limit-chars: 6 3 3;
        word-break: break-word;
      }
      /* Sütun dizgisi — saç teli sütun cetvelleriyle */
      .gz-cols{
        column-gap: 14px;
        column-rule: 1px solid rgba(35,28,15,.3);
      }
      .gz-cols--2{ columns: 2; }
      .gz-cols--3{ columns: 2; }
      /* Uzun makale gövdesi: dar ekranda tek, geniş ekranda çift sütun */
      .gz-cols--wide{ columns: 1; }
      @media (min-width: 640px){
        /* Geniş ekranda broadsheet dizgisi: sütunlar daralır, satırlar kısalır */
        .gz-cols--2{ columns: 3; }
        .gz-cols--3{ columns: 3; }
        .gz-cols--wide{ columns: 2; }
        .gz-cols{ column-gap: 18px; }
      }
      /* Sütun akışında başlık en altta yalnız kalmasın */
      .gz-cols h3, .gz-cols blockquote, .gz-cols ul{
        break-inside: avoid;
        -webkit-column-break-inside: avoid;
      }
      .gz-cols h3{ break-after: avoid; }
      /* Sütun akışında bölünmemesi gereken haber bloğu */
      .gz-story{
        break-inside: avoid;
        -webkit-column-break-inside: avoid;
        margin-bottom: 11px;
        padding-bottom: 9px;
        border-bottom: 1px solid rgba(35,28,15,.22);
      }
      .gz-story:last-child{ border-bottom: 0; }
      .gz-byline{
        font-size: 8px;
        font-variant: small-caps;
        letter-spacing: .1em;
        color: var(--gz-ink-faint);
        display: flex;
        gap: 5px;
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
      /* Haberin devamı başka sayfada — gerçek gazetenin atlama satırı */
      .gz-jump{
        font-size: 9.5px;
        font-style: italic;
        color: var(--gz-ink-faint);
        letter-spacing: .03em;
        text-align: right;
      }
      /* Gömme büyük harf — makale ilk paragrafı */
      .gz-dropcap::first-letter{
        float: left;
        font-family: var(--gz-face-display);
        font-size: 3.1em;
        line-height: .8;
        font-weight: 900;
        padding: 4px 6px 0 0;
        color: #1d180c;
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
      /* Sayfa altı folyosu */
      .gz-folio{
        display: flex;
        align-items: baseline;
        justify-content: center;
        gap: 10px;
        font-size: 8.5px;
        font-variant: small-caps;
        letter-spacing: .16em;
        color: var(--gz-ink-soft);
      }

      /* Cetvelli departman kutusu — hava durumu, ilan, telgraf haberleri */
      .gz-box{
        border: 1px solid var(--gz-rule);
        padding: 7px 9px 8px;
        box-shadow: inset 0 0 0 3px rgba(35,28,15,.06);
      }
      .gz-box-title{
        font-family: var(--gz-face-display);
        font-size: 9px;
        font-weight: 700;
        letter-spacing: .2em;
        text-transform: uppercase;
        text-align: center;
        color: var(--gz-ink);
        border-bottom: 1px solid var(--gz-rule);
        padding-bottom: 4px;
        margin-bottom: 6px;
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
        border-radius: 0;
        background: linear-gradient(90deg, rgba(35,28,15,.14), rgba(35,28,15,.08) 55%, rgba(35,28,15,.14));
      }

      /* Ekran içinde dokunulabilir makale blokları */
      .gz-tap{
        display: block;
        width: 100%;
        text-align: left;
        color: inherit;
      }
      .gz-tap:active{ background: rgba(35,28,15,.06); }
      .gz-tap:focus-visible{ outline: 2px solid rgba(122,92,26,.7); outline-offset: 2px; }
    `}</style>
  );
}
