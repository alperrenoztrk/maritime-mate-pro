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
      <div className="flex min-w-0 items-center">
        <h1
          data-page-title
          className={cn(
            isCompact ? "text-xl" : "text-[2.125rem] sm:text-4xl",
            "min-w-0 text-balance font-bold leading-[1.08] tracking-[-0.035em] text-foreground",
          )}
        >
          {title}
        </h1>
      </div>

      {actions ? <div className="flex min-h-11 shrink-0 items-center">{actions}</div> : null}
    </div>
  );
}
