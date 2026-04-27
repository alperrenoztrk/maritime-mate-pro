import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  /**
   * The logical parent route this page belongs to.
   * The button always navigates here (never uses browser history),
   * so the user gets a single, predictable jump back to the parent
   * regardless of how they reached the current page.
   *
   * Mirrors the pattern in `ShipOperationsDetail.tsx` which is the
   * reference implementation for the whole app.
   */
  to: string;
  /**
   * Optional label rendered next to the icon.
   * Omit for the icon-only "round" variant used inside page headers.
   */
  label?: string;
  /**
   * Visual variant.
   * - "round": small circular icon-only button (default; matches ShipOperationsDetail)
   * - "pill":  rounded pill with icon + label (used in empty-state screens)
   */
  variant?: "round" | "pill";
  className?: string;
  ariaLabel?: string;
};

export function BackButton({
  to,
  label,
  variant = "round",
  className,
  ariaLabel = "Geri",
}: BackButtonProps) {
  if (variant === "pill") {
    return (
      <Link
        to={to}
        aria-label={ariaLabel}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 text-xs font-semibold text-foreground shadow-sm transition hover:border-primary/40 hover:bg-card",
          className,
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        {label ?? "Geri"}
      </Link>
    );
  }

  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/30 bg-card/60 text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
    >
      <ArrowLeft className="h-4 w-4" />
    </Link>
  );
}

export default BackButton;
