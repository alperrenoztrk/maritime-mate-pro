import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { claimBackNavigation } from "@/lib/navigationHierarchy";

type BackButtonProps = {
  /**
   * The logical parent route this page belongs to.
   * The button always navigates here using REPLACE (not push) so the
   * current entry is swapped out instead of stacking. This keeps the
   * browser/native history short and predictable: the user gets a
   * single, predictable jump back to the parent regardless of how
   * they reached the current page, and the device's hardware back
   * button never re-enters the page they just left.
   *
   * Reference implementation: `src/pages/ShipOperationsDetail.tsx`.
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
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!claimBackNavigation()) return;
    // REPLACE (not push) so we don't extend the history stack.
    // Without this, repeatedly tapping back would walk through every
    // intermediate "parent" entry instead of going up the hierarchy.
    navigate(to, { replace: true });
  };

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={ariaLabel}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 text-xs font-semibold text-foreground shadow-sm transition hover:border-primary/40 hover:bg-card",
          className,
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        {label ?? "Geri"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/30 bg-card/60 text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
    >
      <ArrowLeft className="h-4 w-4" />
    </button>
  );
}

export default BackButton;
