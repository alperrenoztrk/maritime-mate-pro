import React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  icon?: LucideIcon;
  iconClassName?: string;
  className?: string;
  actions?: React.ReactNode;
  variant?: "default" | "compact";
}

export function PageHeader({
  title,
  icon: Icon,
  iconClassName,
  className,
  actions,
  variant = "default",
}: PageHeaderProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4",
        isCompact ? "py-1" : "py-2",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        {Icon ? (
          <span
            aria-hidden
            className={cn(
              "surface-2 grid shrink-0 place-items-center rounded-xl border text-primary",
              isCompact ? "h-10 w-10" : "h-11 w-11",
            )}
          >
            <Icon
              className={cn(isCompact ? "h-5 w-5" : "h-6 w-6", iconClassName)}
            />
          </span>
        ) : null}

        <h1
          data-page-title
          className={cn(
            isCompact ? "text-lg" : "text-3xl sm:text-4xl",
            "min-w-0 text-balance font-bold leading-tight tracking-[-0.025em] text-foreground",
          )}
        >
          {title}
        </h1>
      </div>

      {actions ? <div className="flex min-h-11 shrink-0 items-center">{actions}</div> : null}
    </div>
  );
}
