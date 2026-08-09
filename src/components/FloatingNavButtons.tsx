import { ChevronLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { findParentPath } from "@/hooks/useNavigationHierarchy";
import { hapticSelection } from "@/services/haptics";
import { requestLocalBack } from "@/lib/localBack";

/**
 * Persistent hierarchy control for inner routes.
 *
 * The old control disappeared while scrolling and changed width, which made
 * navigation feel like a floating web action. This version stays in a stable
 * safe-area position, uses the same adaptive material as the tab bar, and
 * keeps the existing logical parent mapping that Android hardware-back relies
 * on. The route itself animates independently, so the control is always ready.
 */
export function FloatingNavButtons() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  if (pathname === "/" || pathname.startsWith("/auth") || pathname === "/reset-password") {
    return null;
  }

  const parent = search ? pathname : findParentPath(pathname);

  return (
    <div
      className="pointer-events-none fixed left-[max(0.75rem,env(safe-area-inset-left))] z-40"
      style={{ top: "max(0.65rem, env(safe-area-inset-top))" }}
    >
      <motion.button
        key={pathname}
        type="button"
        initial={reduceMotion ? false : { opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        onClick={() => {
          hapticSelection();
          if (!requestLocalBack()) navigate(parent, { replace: true });
        }}
        aria-label="Geri"
        className="ios-glass ios-pressable pointer-events-auto flex min-h-11 items-center gap-0.5 rounded-full px-3 text-[0.9375rem] font-semibold text-foreground"
      >
        <ChevronLeft className="h-5 w-5 shrink-0 text-primary" strokeWidth={2.4} />
        <span data-translatable>Geri</span>
      </motion.button>
    </div>
  );
}
