import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { hapticImpact } from "@/services/haptics"


const buttonVariants = cva(
  "ios-pressable inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-primary/30 bg-primary text-primary-foreground shadow-[var(--shadow-button)] hover:bg-primary/90",
        destructive:
          "border border-destructive/30 bg-destructive text-destructive-foreground shadow-[var(--shadow-button)] hover:bg-destructive/90",
        outline:
          "border border-border/80 bg-card/80 text-foreground shadow-sm hover:border-primary/40 hover:bg-card",
        secondary:
          "border border-secondary/20 bg-secondary/15 text-foreground hover:bg-secondary/20",
        ghost: "text-foreground hover:bg-muted/70",
        link: "text-primary underline-offset-4 hover:underline",
        primary: "border border-primary/30 bg-primary text-primary-foreground shadow-[var(--shadow-button)] hover:bg-primary/90",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          if (!disabled) hapticImpact()
          onClick?.(event)
        }}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
