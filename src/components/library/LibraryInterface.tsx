import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { accentGradient } from "./libraryAccent";

const highRefreshRateStyles: CSSProperties = {
  ["--frame-rate" as string]: "120",
  ["--animation-duration" as string]: "8.33ms",
  ["--transition-duration" as string]: "16.67ms",
};

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
  const backControl = backHref ? (
    <Link
      to={backHref}
      aria-label={backLabel}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-card/80 text-muted-foreground shadow-sm transition hover:border-primary/40 hover:text-foreground"
    >
      <ArrowLeft className="h-5 w-5" />
    </Link>
  ) : onBack ? (
    <button
      type="button"
      onClick={onBack}
      aria-label={backLabel}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-card/80 text-muted-foreground shadow-sm transition hover:border-primary/40 hover:text-foreground"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  ) : null;

  return (
    <div
      className="relative min-h-[100svh] overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-[max(1rem,env(safe-area-inset-left))] pb-[calc(max(6rem,env(safe-area-inset-bottom))+var(--ad-banner-height,0px))] pt-[max(2rem,env(safe-area-inset-top))] dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]"
      style={highRefreshRateStyles}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-10 top-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className={`relative z-10 mx-auto flex ${maxWidth} flex-col gap-7`}>
        <header className="flex min-h-10 items-center gap-3">
          {backControl}
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {HeaderIcon && <HeaderIcon className="h-6 w-6 shrink-0 text-primary" />}
            <h1 className="min-w-0 text-2xl font-bold leading-tight text-foreground">{title}</h1>
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
    "group relative min-h-44 overflow-hidden rounded-3xl border border-white/20 text-left shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl";
  const content = (
    <>
      <div className={`absolute inset-0 ${accent}`} style={accentGradient("145deg")} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_45%)]" />
      <div className="relative flex h-full min-h-44 flex-col justify-between p-5 text-white">
        <span className="flex items-start justify-between gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <Icon className="h-6 w-6" />
          </span>
          {badge !== undefined && (
            <span className="rounded-full bg-black/20 px-2.5 py-1 text-xs font-semibold backdrop-blur">
              {badge}
            </span>
          )}
        </span>
        <span className="flex items-end justify-between gap-3">
          <span className="whitespace-pre-line text-lg font-bold leading-tight">{title}</span>
          <ChevronRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </>
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
  backgroundImage: "linear-gradient(180deg, #fffaf0 0%, #ffdf9b 48%, #d9a441 100%)",
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
        className="absolute inset-x-[7%] -bottom-1 h-[5%] rounded-[50%] bg-slate-900/45 blur-[7px] transition-all duration-500 group-hover:inset-x-[4%] group-hover:blur-[11px] motion-reduce:transition-none dark:bg-black/75"
      />

      <div
        className={`relative h-full w-full [transform-style:preserve-3d] [transform:rotateY(13deg)] transition-transform duration-500 ease-out motion-reduce:transition-none ${
          muted
            ? ""
            : "group-hover:[transform:rotateY(20deg)_translateY(-6px)] group-focus-visible:[transform:rotateY(20deg)_translateY(-6px)]"
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
          <div className={`absolute inset-0 ${accent}`} style={accentGradient("180deg")} />
          <div className="absolute inset-0" style={spineRound} />
          <div className="absolute inset-0" style={spineBands} />
          <div className={`absolute inset-x-0 top-[9%] h-px ${goldRule}`} />
          <div className={`absolute inset-x-0 bottom-[9%] h-px ${goldRule}`} />
          <div className="absolute inset-x-0 top-0 h-[2px]" style={headband} />
          <div className="absolute inset-x-0 bottom-0 h-[2px]" style={headband} />
        </div>

        {/* Ön kapak. */}
        <div className="absolute inset-0 overflow-hidden rounded-l-[2px] rounded-r-[6px] bg-slate-800 shadow-[0_14px_26px_rgba(15,23,42,0.32)] [transform:translateZ(calc(var(--bk-spine)*0.5))] transition-shadow duration-500 group-hover:shadow-[0_22px_38px_rgba(15,23,42,0.42)] motion-reduce:transition-none">
          <div className={`absolute inset-0 ${accent}`} style={accentGradient("145deg")} />
          {/* Boyanın mat, koyu cilt bezine çekilmesi (parlak plastik görünümü kırar). */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(150deg,rgba(11,15,25,0.46)_0%,rgba(11,15,25,0.12)_40%,rgba(0,0,0,0.4)_100%)]"
          />
          {/* Işık düşüşü: köşeler koyu, üst sol omuzda yumuşak parlama. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(125%_95%_at_50%_45%,transparent_28%,rgba(0,0,0,0.4)_100%),radial-gradient(90%_65%_at_22%_8%,rgba(255,255,255,0.18),transparent_60%)]"
          />
          <div aria-hidden className="absolute inset-0 opacity-45 mix-blend-overlay" style={clothWeave} />

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
          <div aria-hidden className="absolute inset-[7%] rounded-[2px] border border-[#dcbb77]/55" />
          <div aria-hidden className="absolute inset-[9.5%] rounded-[1px] border border-[#dcbb77]/25" />

          {/* Başlık doğrudan cildin üstüne yaldız varakla basılıyor; arkasında
              koyu etiket plakası yok. Açık cilt renklerinde okunurluğu harflerin
              kabartma (gömme baskı) gölgesi sağlıyor. */}
          <div className="absolute inset-x-[11%] top-[21%] flex flex-col items-center gap-2 px-2 text-center">
            <span aria-hidden className={`h-px w-8 ${goldRule}`} />
            <h2
              className={`line-clamp-5 bg-clip-text font-book font-black leading-[1.28] tracking-[0.02em] text-transparent [filter:drop-shadow(0_1px_0_rgba(0,0,0,0.95))_drop-shadow(0_-1px_0_rgba(0,0,0,0.7))_drop-shadow(1px_0_0_rgba(0,0,0,0.8))_drop-shadow(-1px_0_0_rgba(0,0,0,0.8))_drop-shadow(0_0_5px_rgba(0,0,0,0.6))] [hyphens:none] [-webkit-hyphens:none] ${coverTitleSize(title)}`}
              style={goldFoil}
            >
              {title}
            </h2>
            <span aria-hidden className={`h-px w-8 ${goldRule}`} />
          </div>

          {/* Yayıncı amblemi yerine sade bir yaldız eşkenar dörtgen. */}
          <div
            aria-hidden
            className="absolute bottom-[13%] left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border border-[#dcbb77]/60 bg-[#dcbb77]/20"
          />
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
      className="group relative block aspect-[3/4] min-h-60 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
    >
      <LibraryBookCase title={title} accent={accent} />
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
    <div className="relative aspect-[3/4] min-h-60">
      <LibraryBookCase title={title} accent={accent} muted />
      <span className="absolute bottom-[5%] left-1/2 -translate-x-1/2 rounded-full bg-slate-900/75 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
        {note}
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
      className="group flex min-h-16 items-center gap-3 rounded-xl border border-border/40 bg-card/70 px-3 py-2.5 shadow-sm transition hover:border-primary/40 hover:bg-card"
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accent} text-white shadow`}
        style={accentGradient("145deg")}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-foreground">{title}</span>
      {badge !== undefined && (
        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
          {badge}
        </span>
      )}
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
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
        className="h-11 w-full rounded-2xl border border-border/60 bg-card/80 pl-10 pr-4 text-sm text-foreground shadow-sm outline-none backdrop-blur transition placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
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
