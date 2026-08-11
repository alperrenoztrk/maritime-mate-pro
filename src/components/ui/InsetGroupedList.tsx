import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function InsetGroupedList({
  children,
  columns = 1,
  className,
  ...props
}: Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children: ReactNode;
  columns?: 1 | 2;
}) {
  return (
    <div
      className={cn(
        "inset-grouped-list",
        columns === 2 && "inset-grouped-list--columns-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default InsetGroupedList;
