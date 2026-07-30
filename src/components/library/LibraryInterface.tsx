import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";

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
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 py-8 pb-24 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]"
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
      <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
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
          <span className="text-lg font-bold leading-tight">{title}</span>
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

export function LibraryBookCard({
  title,
  icon: Icon,
  accent,
  to,
  image,
  badge,
}: {
  title: string;
  icon: LucideIcon;
  accent: string;
  to: string;
  image?: string;
  badge?: string | number;
}) {
  return (
    <Link
      to={to}
      className="group relative aspect-[3/4] min-h-60 overflow-hidden rounded-l-md rounded-r-3xl border border-white/20 shadow-lg transition duration-300 hover:-translate-y-1 hover:rotate-[0.4deg] hover:shadow-2xl"
    >
      {image ? (
        <img src={image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
      )}
      {image && <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-80 mix-blend-multiply`} />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-white/10" />
      <div className="absolute inset-y-0 left-0 w-4 border-r border-white/15 bg-black/25 shadow-[4px_0_12px_rgba(0,0,0,0.18)]" />
      <div className="absolute inset-y-3 right-0 w-1.5 rounded-l-full bg-white/35" />
      <div className="absolute inset-x-5 bottom-1 h-1 rounded-full bg-white/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_42%)]" />

      <div className="relative flex h-full flex-col p-5 pl-7 text-white">
        <span className="flex items-start justify-between gap-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <Icon className="h-5 w-5" />
          </span>
          {badge !== undefined && (
            <span className="rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
              {badge}
            </span>
          )}
        </span>
        <div className="mt-auto flex items-end justify-between gap-3 pb-2">
          <h2 className="text-base font-bold leading-snug sm:text-lg">{title}</h2>
          <ChevronRight className="h-5 w-5 shrink-0 opacity-80 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
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
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow`}>
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
