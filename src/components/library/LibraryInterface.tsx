import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { accentGradient } from "./libraryAccent";


export function LibraryPageShell({
  title,
  children,
  icon: HeaderIcon,
  backHref,
  onBack,
  backLabel = "Geri dön",
  maxWidth = "max-w-6xl",
  headerAside,
}: {
  title: string;
  children: ReactNode;
  icon?: LucideIcon;
  backHref?: string;
  onBack?: () => void;
  backLabel?: string;
  maxWidth?: string;
  headerAside?: ReactNode;
}) {
  // No navigational back control here: the app has one global back affordance
  // (AppNavBar + edge swipe). `backHref` is accepted and ignored so callers
  // don't have to change. `onBack` is NOT navigation — it unwinds in-page
  // state (e.g. leaving a category) — so it still gets a control.
  const backControl = !backHref && onBack ? (
    <button
      type="button"
      onClick={onBack}
      aria-label={backLabel}
      className="surface-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-muted-foreground transition-colors duration-control hover:text-foreground active:bg-primary/10"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  ) : null;

  return (
    <div
      className="relative min-h-[100svh] px-[max(1rem,var(--safe-left))] pb-8 pt-3 sm:px-[max(1.25rem,var(--safe-left))]"
    >
      <div className={`relative mx-auto flex ${maxWidth} flex-col gap-6`}>
        <header className="flex min-h-11 items-center gap-3 pb-1">
          {backControl}
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {HeaderIcon && (
              <span className="surface-2 hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border sm:inline-flex">
                <HeaderIcon className="h-5 w-5 text-primary" />
              </span>
            )}
            <h1 data-page-title className="min-w-0 text-3xl font-bold leading-tight tracking-[-0.025em] text-foreground">{title}</h1>
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
    "surface-2 group flex min-h-[5.75rem] w-full items-center rounded-2xl border p-4 text-left transition-[background-color,border-color,transform] duration-control ease-out-ios hover:border-primary/25 active:scale-[0.985]";
  const content = (
    <span className="flex w-full items-center gap-3">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent} text-white`}
        style={accentGradient("145deg", accent)}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1 whitespace-pre-line text-base font-semibold leading-snug text-foreground">{title}</span>
      {badge !== undefined && (
        <span className="rounded-full bg-muted px-2.5 py-1 text-caption font-semibold text-muted-foreground">
          {badge}
        </span>
      )}
      <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-control group-hover:translate-x-0.5" />
    </span>
  );

  return to ? (
    <Link to={to} className={className}>
      {content}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={className}>
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

/** Kapaktaki başlık kutusu dar. Tire kapalı olduğu için sığmayan kelimeyi tarayıcı
    tiresiz kırar; onu da istemiyoruz. Punto başlığın en uzun kelimesine göre
    seçiliyor, böylece her satır tek parça kelimeyle sütuna sığıyor. */
const coverTitleSize = (title: string) => {
  const longest = Math.max(...title.split(/\s+/).map((word) => word.length), 0);
  if (longest > 18 || title.length > 60) return "text-[0.68rem] sm:text-[0.74rem]";
  if (longest > 15) return "text-[0.78rem] sm:text-[0.84rem]";
  if (longest > 12 || title.length > 44) return "text-[0.9rem] sm:text-[0.95rem]";
  return "text-[1.02rem] sm:text-lg";
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
        <div className="absolute inset-0 overflow-hidden rounded-l-[2px] rounded-r-[6px] bg-slate-800 shadow-[0_10px_22px_rgba(15,23,42,0.28)] [transform:translateZ(calc(var(--bk-spine)*0.5))] transition-shadow duration-sheet group-hover:shadow-[0_15px_28px_rgba(15,23,42,0.36)] motion-reduce:transition-none">
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
          <div className="absolute inset-x-[11%] top-[21%] flex flex-col items-center gap-2 px-2 text-center">
            <span aria-hidden className={`h-px w-8 ${goldRule}`} />
            <h2
              className={`line-clamp-5 bg-clip-text font-book font-bold leading-[1.28] tracking-[0.015em] text-transparent [filter:drop-shadow(0_1px_0_rgba(0,0,0,0.8))_drop-shadow(0_0_4px_rgba(0,0,0,0.45))] [hyphens:none] [-webkit-hyphens:none] ${coverTitleSize(title)}`}
              style={goldFoil}
            >
              {title}
            </h2>
            <span aria-hidden className={`h-px w-8 ${goldRule}`} />
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
      className="surface-2 group flex min-h-[4.5rem] items-center gap-3 rounded-2xl border px-3.5 py-3 transition-[background-color,border-color,transform] duration-control hover:border-primary/25 active:scale-[0.99]"
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accent} text-white`}
        style={accentGradient("145deg", accent)}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-foreground">{title}</span>
      {badge !== undefined && (
        <span className="rounded-full bg-muted px-2 py-0.5 text-micro font-semibold text-muted-foreground">
          {badge}
        </span>
      )}
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-[color,transform] duration-control group-hover:translate-x-0.5 group-hover:text-primary" />
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
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="surface-2 h-11 w-full rounded-xl border pl-10 pr-4 text-sm text-foreground outline-none transition-[border-color,box-shadow] duration-control placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
      />
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
