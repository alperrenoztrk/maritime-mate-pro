import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, value, onChange, ...props }, ref) => {
    // Sanitize NaN numeric values to empty string so cleared inputs stay blank
    const sanitizedValue =
      typeof value === "number" && !Number.isFinite(value) ? "" : value;

    // Handle comma to period conversion for numeric inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if ((type === "number" || props.inputMode === "numeric" || props.inputMode === "decimal") && e.target.value.includes(',')) {
        const newEvent = {
          ...e,
          target: {
            ...e.target,
            value: e.target.value.replace(',', '.')
          }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(newEvent);
      } else {
        onChange?.(e);
      }
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-[var(--control-height)] w-full rounded-[var(--radius-control)] border border-input/80 bg-card/80 px-[var(--control-padding-x)] py-[var(--control-padding-y)] text-base shadow-sm ring-offset-background transition-[background-color,border-color,box-shadow] duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        value={sanitizedValue}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
