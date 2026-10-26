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
        "flex flex-wrap items-center justify-between gap-x-4 gap-y-2",
        isCompact ? "py-1" : "py-2",
        className
      )}
    >
      <div className="min-w-0 flex-1 basis-52">

        <h1
          data-page-title
          className={cn(
            isCompact ? "text-lg" : "text-2xl sm:text-3xl",
            "min-w-0 break-words text-balance font-bold leading-tight tracking-[-0.025em] text-foreground",
          )}
        >
          {title}
        </h1>
      </div>

      {actions ? <div className="flex min-h-11 shrink-0 items-center">{actions}</div> : null}
    </div>
  );
}
