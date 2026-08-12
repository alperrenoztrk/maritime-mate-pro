import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertTriangle, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

/**
 * The three states every data-backed screen needs: loading, empty, failed.
 *
 * The app had none of them shared. `ui/skeleton.tsx` existed with zero
 * imports while fourteen files hand-rolled an `animate-spin` ring, and around
 * fifty-six pages wrote their own one-off "nothing here yet" line. That is
 * why waiting for content looks different on almost every screen.
 *
 * These are deliberately plain: a page passes its own words, the components
 * own the rhythm, spacing and tone.
 */

/** Content-shaped placeholder. Prefer this over a spinner: it holds layout. */
export const AppSkeleton = ({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) => (
  <div className={cn("w-full space-y-3", className)} aria-hidden>
    <Skeleton className="h-24 w-full rounded-2xl" />
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className="h-4 rounded-lg"
        // Ragged widths read as text; identical bars read as a loading bar.
        style={{ width: `${92 - i * 14}%` }}
      />
    ))}
  </div>
);

/** Full-screen route placeholder while a lazy chunk downloads. */
export const RouteSkeleton = () => (
  <div
    className="route-skeleton flex min-h-[100svh] w-full flex-col gap-4 px-4 pt-4"
    role="status"
    aria-label="Loading"
  >
    <Skeleton className="h-7 w-40 rounded-lg" />
    <AppSkeleton lines={4} />
  </div>
);

interface StateProps {
  // ReactNode rather than string: the i18n layer translates by walking the
  // DOM, and several call sites wrap their copy in <span data-translatable>.
  title: ReactNode;
  description?: ReactNode;
  icon?: LucideIcon;
  action?: ReactNode;
  className?: string;
}

/** Nothing to show, and that is not an error. */
export const EmptyState = ({
  title,
  description,
  icon: Icon = Inbox,
  action,
  className,
}: StateProps) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center gap-3 rounded-2xl border px-6 py-12 text-center surface-1",
      className
    )}
  >
    <Icon className="h-8 w-8 text-muted-foreground" strokeWidth={1.6} />
    <p className="text-base font-semibold text-foreground">{title}</p>
    {description && (
      <p className="max-w-sm text-caption text-muted-foreground">{description}</p>
    )}
    {action}
  </div>
);

/** Something failed. Always offer a way forward when one exists. */
export const ErrorState = ({
  title,
  description,
  icon: Icon = AlertTriangle,
  onRetry,
  retryLabel = "Try again",
  className,
}: Omit<StateProps, "action"> & {
  onRetry?: () => void;
  retryLabel?: string;
}) => (
  <div
    role="alert"
    className={cn(
      "flex flex-col items-center justify-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-12 text-center",
      className
    )}
  >
    <Icon className="h-8 w-8 text-destructive" strokeWidth={1.6} />
    <p className="text-base font-semibold text-foreground">{title}</p>
    {description && (
      <p className="max-w-sm text-caption text-muted-foreground">{description}</p>
    )}
    {onRetry && (
      <Button variant="outline" size="sm" onClick={onRetry} className="mt-1">
        {retryLabel}
      </Button>
    )}
  </div>
);
