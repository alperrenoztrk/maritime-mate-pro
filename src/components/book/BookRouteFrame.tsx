import { useEffect, type ReactNode } from "react";
import { BookSheet } from "@/components/book/BookSheet";
import { getBookRouteTitle, isBookContentPath } from "@/lib/bookRoutes";

interface BookRouteFrameProps {
  pathname: string;
  children: ReactNode;
}

/**
 * Keeps the physical book mounted while React Router swaps the active leaf.
 * Formulas, calculators, quizzes and long-form details therefore turn into
 * another sheet of the same book instead of opening a detached app screen.
 */
export function BookRouteFrame({ pathname, children }: BookRouteFrameProps) {
  const active = isBookContentPath(pathname);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("book-route-active", active);
    return () => document.body.classList.remove("book-route-active");
  }, [active]);

  if (!active) return <>{children}</>;

  return (
    <BookSheet title={getBookRouteTitle(pathname)} routeFrame>
      {children}
    </BookSheet>
  );
}
