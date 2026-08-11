import React from "react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalculationHero } from "@/components/ui/calculation-hero";
import type { LucideIcon } from "lucide-react";

interface CalculationLayoutProps {
  title: string;
  icon?: LucideIcon;
  hero?: {
    title?: string;
    imageSrc: string;
    imageAlt: string;
  };
  actions?: React.ReactNode;
  rightRail?: React.ReactNode;
  below?: React.ReactNode;
  stickyHeader?: boolean;
  maxWidthClassName?: string;
  className?: string;
  children: React.ReactNode;
}

export function CalculationLayout({
  title,
  icon,
  hero,
  actions,
  rightRail,
  below,
  stickyHeader = false,
  maxWidthClassName = "max-w-7xl",
  className,
  children,
}: CalculationLayoutProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden p-4",
        className
      )}
    >
      <div className={cn(maxWidthClassName, "mx-auto space-y-6")}>
        {stickyHeader ? (
          <div className="border-b pb-3">
            <PageHeader
              title={title}
              icon={icon}
              actions={actions}
              variant="compact"
            />
          </div>
        ) : null}

        {hero ? (
          <CalculationHero
            title={hero.title ?? title}
            imageSrc={hero.imageSrc}
            imageAlt={hero.imageAlt}
            hideText
          />
        ) : null}

        {!stickyHeader ? (
          <PageHeader title={title} icon={icon} actions={actions} />
        ) : null}

        {rightRail ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2 space-y-6">{children}</div>
              <aside className="lg:col-span-1">
                <div className="sticky top-4">{rightRail}</div>
              </aside>
            </div>
            {below ? <div className="space-y-6">{below}</div> : null}
          </>
        ) : (
          <div className="space-y-6">
            {children}
            {below}
          </div>
        )}
      </div>
    </div>
  );
}
