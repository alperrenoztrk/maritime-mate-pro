import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ChevronRight, Search, XCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AppSymbol } from "@/components/ui/AppSymbol";
import { hapticImpact, hapticSelection } from "@/lib/haptics";
import { accentGradient, accentTone } from "./libraryAccent";
import { hasHierarchicalBack } from "@/lib/appNavigation";


type LibraryPageShellProps = {
  title: string;
  children: ReactNode;
  icon?: LucideIcon;
  backHref?: string;
  onBack?: () => void;
  backLabel?: string;
  maxWidth?: string;
  headerAside?: ReactNode;
};

export function LibraryPageShell({
  title,
  children,
  backHref,
  onBack,
  backLabel = "come back",
  maxWidth = "max-w-6xl",
  headerAside,
}: LibraryPageShellProps) {
  const { pathname } = useLocation();
  const rootSpacing = hasHierarchicalBack(pathname)
    ? "pt-3"
    : "pt-[calc(var(--safe-top)+1.5rem)]";
  // No navigational back control here: the app has one global back affordance
  // (AppNavBar + edge swipe). `backHref` is accepted and ignored so callers
  // don't have to change. `onBack` is NOT navigation — it unwinds in-page
  // state (e.g. leaving a category) — so it still gets a control.
  const backControl = !backHref && onBack ? (
    <button
      type="button"
      onClick={() => {
        hapticSelection();
        onBack?.();
      }}
      aria-label={backLabel}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-primary transition-colors duration-control hover:bg-primary/10 active:bg-primary/15"
    >
      <AppSymbol name="arrow.left" fallback={ArrowLeft} className="h-5 w-5" />
    </button>
  ) : null;

  return (
    <div
      className={`relative min-h-[100svh] px-[max(1rem,var(--safe-left))] pb-8 ${rootSpacing} sm:px-[max(1.25rem,var(--safe-left))]`}
    >
      <div className={`relative mx-auto flex ${maxWidth} flex-col gap-5 sm:gap-6`}>
        <header className="flex min-h-11 items-center gap-3 pb-1">
          {backControl}
          <div className="flex min-w-0 flex-1 items-center">
            <h1 data-page-title className="library-page-title min-w-0 font-bold leading-[1.08] tracking-[-0.035em] text-foreground">{title}</h1>
          </div>
          {headerAside}
        </header>

        {children}
      </div>
    </div>
  );
}

export function LibraryEntryCard({
  title,
  icon: Icon,
  accent,
  to,
  onClick,
  badge,
}: {
  title: string;
  icon: LucideIcon;
  accent: string;
  to?: string;
  onClick?: () => void;
  badge?: string | number;
}) {
  const className =
    "ios-list-row surface-2 group flex min-h-[4.75rem] w-full items-center rounded-xl border px-4 py-3 text-left transition-[background-color,border-color,transform] duration-control ease-out-ios hover:border-primary/20 active:scale-[0.985]";
  const content = (
    <span className="library-entry-content flex w-full items-center gap-3">
      <span
        className="library-symbol-tile flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.625rem]"
        style={accentTone(accent)}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="library-entry-text min-w-0 flex-1">
        <span className="block whitespace-pre-line text-base font-semibold leading-snug text-foreground">{title}</span>
      </span>

      {badge !== undefined && (
        <span className="library-entry-badge rounded-full bg-muted px-2.5 py-1 text-caption font-semibold text-muted-foreground">
          {badge}
        </span>
      )}
      <AppSymbol name="chevron.right" fallback={ChevronRight} className="library-row-chevron h-5 w-5 shrink-0 text-muted-foreground" />
    </span>
  );

  return to ? (
    <Link to={to} className={className} onClick={() => hapticImpact("light")}>
      {content}
    </Link>
  ) : (
    <button
      type="button"
      onClick={() => {
        hapticSelection();
        onClick?.();
      }}
      className={className}
    >
      {content}
    </button>
  );
}

/* ── Ciltli kitap görünümü ────────────────────────────────────────────────────
   Kapak artık düz bir kart değil; gerçek bir cildin geometrisi CSS 3B ile
   kuruluyor: arka kapak, sırt (spine) ve ön kapak ayrı yüzler olarak
   konumlanıyor, kitap Y ekseninde hafifçe döndürüldüğü için sırt soldan
   görünüyor. Tüm dokular gradyandan üretiliyor, ek görsel indirilmiyor. */

/** Bez cilt (buckram) dokusu: ince atkı/çözgü örgüsü. */
const clothWeave: CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(0deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 1px, transparent 1px, transparent 2px)," +
    "repeating-linear-gradient(90deg, rgba(0,0,0,0.14) 0px, rgba(0,0,0,0.14) 1px, transparent 1px, transparent 2px)",
};

/** Sırtın yuvarlaklığı. Yüz kaçış açısında ~5 piksele sıkıştığı için gölgeler
    kasıtlı olarak yumuşak; aksi hâlde cilt rengi tamamen kararıyor. */
const spineRound: CSSProperties = {
  backgroundImage:
    "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.06) 42%, rgba(255,255,255,0.14) 68%, rgba(0,0,0,0.26) 100%)",
};

/** Sırttaki kabartma cilt bantları (raised bands). */
const spineBands: CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(180deg, transparent 0 16.8%, rgba(0,0,0,0.32) 16.8% 17.7%," +
    "rgba(255,255,255,0.16) 17.7% 18.6%, rgba(0,0,0,0.2) 18.6% 19.3%, transparent 19.3% 20%)",
};

/** Şiraze (headband): sırtın baş ve ayak ucundaki dokuma bant. */
const headband: CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(90deg, #e0c088 0 2px, #7a5c33 2px 4px)",
};

/** Yaldız (gold foil) sırt çizgisi. */
const goldRule = "bg-[linear-gradient(90deg,transparent,rgba(233,201,124,0.9),transparent)]";

/** Kapak yazısındaki varak parlaklığı (metne kırpılan metalik gradyan).
    Üst uç krem-beyaza yakın: başlık artık cildin üstüne doğrudan basıldığı için
    sarı/amber ciltlerde luminans farkını bu açıklık sağlıyor. */
const goldFoil: CSSProperties = {
  backgroundImage: "linear-gradient(180deg, #fff8e7 0%, #efd08a 52%, #c9983d 100%)",
};

/** Kapaktaki başlık kutusu dar. Punto, kullanıcının yazı boyutu ayarından (rem)
    bağımsız olsun diye kapağın kendi genişliğine (cqw) göre ölçekleniyor; böylece
    "Communication at Sea" gibi uzun başlıklar her yazı boyutunda çerçeve içinde
    kalır ve kelime ortasından bölünmez. clamp()'in px yedeği, container query
    desteklemeyen tarayıcılarda makul bir taban sağlar. */
const coverTitleSize = (title: string) => {
  const longest = Math.max(...title.split(/\s+/).map((word) => word.length), 0);
  if (longest > 18 || title.length > 60) return "text-[clamp(7px,6.4cqw,15px)]";
  if (longest > 15) return "text-[clamp(8px,7.4cqw,17px)]";
  if (longest > 12 || title.length > 44) return "text-[clamp(9px,8.6cqw,19px)]";
  return "text-[clamp(10px,10cqw,22px)]";
};


function LibraryBookCase({
  title,
  accent,
  muted = false,
}: {
  title: string;
  accent: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`relative h-full w-full [--bk-spine:22px] [perspective:1200px] sm:[--bk-spine:26px] ${
        muted ? "opacity-70 saturate-[0.35]" : ""
      }`}
    >
      {/* Kitabın zemine düşen gölgesi. */}
      <div
        aria-hidden
        className="absolute inset-x-[8%] -bottom-1 h-[4%] rounded-[50%] bg-slate-900/35 blur-[5px] transition-[background-color,color,border-color,box-shadow,opacity,transform,width] duration-sheet group-hover:inset-x-[6%] group-hover:blur-[7px] motion-reduce:transition-none dark:bg-black/65"
      />

      <div
        className={`relative h-full w-full [transform-style:preserve-3d] [transform:rotateY(10deg)] transition-transform duration-sheet ease-out motion-reduce:transition-none ${
          muted
            ? ""
            : "group-hover:[transform:rotateY(15deg)_translateY(-3px)] group-focus-visible:[transform:rotateY(15deg)_translateY(-3px)]"
        }`}
      >
        {/* Arka kapak. */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-r-[5px] bg-[#161d29] [transform:translateZ(calc(var(--bk-spine)*-0.5))]"
        />

        {/* Sırt: kitabın kalınlığını veren sol yüz. */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-[var(--bk-spine)] origin-left overflow-hidden bg-slate-800 [transform:translateZ(calc(var(--bk-spine)*-0.5))_rotateY(-90deg)]"
        >
          <div className={`absolute inset-0 ${accent}`} style={accentGradient("180deg", accent)} />
          <div className="absolute inset-0" style={spineRound} />
          <div className="absolute inset-0" style={spineBands} />
          <div className={`absolute inset-x-0 top-[9%] h-px ${goldRule}`} />
          <div className={`absolute inset-x-0 bottom-[9%] h-px ${goldRule}`} />
          <div className="absolute inset-x-0 top-0 h-[2px]" style={headband} />
          <div className="absolute inset-x-0 bottom-0 h-[2px]" style={headband} />
        </div>

        {/* Ön kapak. */}
        <div className="absolute inset-0 overflow-hidden rounded-l-[2px] rounded-r-[6px] bg-slate-800 shadow-[0_10px_22px_rgba(15,23,42,0.28)] [container-type:inline-size] [transform:translateZ(calc(var(--bk-spine)*0.5))] transition-shadow duration-sheet group-hover:shadow-[0_15px_28px_rgba(15,23,42,0.36)] motion-reduce:transition-none">
          <div className={`absolute inset-0 ${accent}`} style={accentGradient("145deg", accent)} />
          {/* Boyanın mat, koyu cilt bezine çekilmesi (parlak plastik görünümü kırar). */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(150deg,rgba(11,15,25,0.38)_0%,rgba(11,15,25,0.1)_42%,rgba(0,0,0,0.34)_100%)]"
          />
          {/* Işık düşüşü: köşeler koyu, üst sol omuzda yumuşak parlama. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(125%_95%_at_50%_45%,transparent_32%,rgba(0,0,0,0.32)_100%),radial-gradient(90%_65%_at_22%_8%,rgba(255,255,255,0.14),transparent_62%)]"
          />
          <div aria-hidden className="absolute inset-0 opacity-30 mix-blend-overlay" style={clothWeave} />

          {/* Sırt ile kapak arasındaki oluk (groove). */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-[9%] bg-[linear-gradient(90deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.22)_38%,rgba(255,255,255,0.14)_74%,transparent_100%)]"
          />
          {/* Mukavva kapağın kesik kenar payı. */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-[inherit] shadow-[inset_-1px_0_0_rgba(255,255,255,0.24),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(255,255,255,0.14)]"
          />

          {/* Yaldız çerçeve. */}
          <div aria-hidden className="absolute inset-[8%] rounded-[2px] border border-[#dcbb77]/45" />

          {/* Başlık doğrudan cildin üstüne yaldız varakla basılıyor; arkasında
              koyu etiket plakası yok. Açık cilt renklerinde okunurluğu harflerin
              kabartma (gömme baskı) gölgesi sağlıyor. */}
          <div className="absolute inset-x-[11%] top-[21%] flex max-h-[58%] flex-col items-center gap-2 overflow-hidden px-1 text-center">
            <span aria-hidden className={`h-px w-8 shrink-0 ${goldRule}`} />
            <h2
              className={`line-clamp-5 min-w-0 max-w-full bg-clip-text font-book font-bold leading-[1.28] tracking-[0.015em] text-transparent [filter:drop-shadow(0_1px_0_rgba(0,0,0,0.8))_drop-shadow(0_0_4px_rgba(0,0,0,0.45))] [hyphens:none] [-webkit-hyphens:none] [overflow-wrap:normal] [word-break:normal] ${coverTitleSize(title)}`}
              style={goldFoil}
            >
              {title}
            </h2>
            <span aria-hidden className={`h-px w-8 shrink-0 ${goldRule}`} />
          </div>


          <span aria-hidden className={`absolute inset-x-[38%] bottom-[13%] h-px ${goldRule}`} />
        </div>
      </div>
    </div>
  );
}

export function LibraryBookCard({
  title,
  accent,
  to,
}: {
  title: string;
  accent: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      aria-label={title}
      onClick={() => hapticImpact("light")}
      className="group block min-w-0 rounded-xl p-1 outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[3/4] w-full">
        <LibraryBookCase title={title} accent={accent} />
      </div>
      <span className="mt-2 block line-clamp-2 min-h-[2.5rem] px-1 text-center text-sm font-semibold leading-snug text-foreground">
        {title}
      </span>
    </Link>
  );
}

/** Henüz açılmamış bölümler için tıklanamayan, soluk raf kitabı. */
export function LibraryBookPlaceholder({
  title,
  accent,
  note,
}: {
  title: string;
  accent: string;
  note: string;
}) {
  return (
    <div className="min-w-0 rounded-xl p-1">
      <div className="relative aspect-[3/4] w-full">
        <LibraryBookCase title={title} accent={accent} muted />
        <span className="absolute bottom-[5%] left-1/2 -translate-x-1/2 rounded-full bg-slate-900/75 px-2.5 py-1 text-micro font-semibold text-white shadow-sm">
          {note}
        </span>
      </div>
      <span className="mt-2 block line-clamp-2 min-h-[2.5rem] px-1 text-center text-sm font-semibold leading-snug text-muted-foreground">
        {title}
      </span>
    </div>
  );
}

export function LibraryCompactCard({
  title,
  icon: Icon,
  accent,
  to,
  badge,
}: {
  title: string;
  icon: LucideIcon;
  accent: string;
  to: string;
  badge?: string | number;
}) {
  return (
    <Link
      to={to}
      onClick={() => hapticImpact("light")}
      className="ios-list-row library-compact-row surface-2 group flex min-h-[4.25rem] items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-[background-color,border-color,transform] duration-control hover:border-primary/20 active:scale-[0.99]"
    >
      <span
        className="library-symbol-tile flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.625rem]"
        style={accentTone(accent)}
      >
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <span className="library-compact-title min-w-0 flex-1 text-sm font-semibold leading-snug text-foreground">{title}</span>
      {badge !== undefined && (
        <span className="library-compact-badge rounded-full bg-muted px-2 py-0.5 text-micro font-semibold text-muted-foreground">
          {badge}
        </span>
      )}
      <AppSymbol name="chevron.right" fallback={ChevronRight} className="library-row-chevron h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-control group-hover:text-primary" />
    </Link>
  );
}

export function LibrarySearchField({
  value,
  onChange,
  placeholder,
  ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ariaLabel: string;
}) {
  return (
    <div className="library-search-field relative">
      <AppSymbol
        name="magnifyingglass"
        fallback={Search}
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        enterKeyHint="search"
        autoCorrect="off"
        spellCheck={false}
        className={`surface-3 h-11 w-full rounded-xl border pl-10 text-base text-foreground outline-none transition-[border-color,box-shadow] duration-control placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/15 ${value ? "pr-12" : "pr-4"}`}
      />
      {value && (
        <button
          type="button"
          aria-label="Arama metnini temizle"
          onClick={() => {
            hapticSelection();
            onChange("");
          }}
          className="absolute right-0 top-0 inline-flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground transition-colors duration-control hover:text-foreground active:bg-primary/10"
        >
          <AppSymbol name="xmark.circle.fill" fallback={XCircle} className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

export function LibrarySectionHeading({ children, badge }: { children: ReactNode; badge?: string | number }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="min-w-0 flex-1 text-lg font-semibold text-foreground">{children}</h2>
      {badge !== undefined && (
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">{badge}</span>
      )}
    </div>
  );
}
